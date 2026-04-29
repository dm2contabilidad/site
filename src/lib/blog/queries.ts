import { supabase } from '@/lib/supabase';
import type {
  Author,
  AuthorRow,
  BlogCategory,
  BlogCategoryRow,
  BlogPost,
  BlogPostFaq,
  BlogPostFaqRow,
  BlogPostRow,
} from '@/types/blog';
import type { BlogCategorySlug } from '@/types/blog';

// ---------------------------------------------------------------------------
// Mappers — snake_case rows → camelCase domain
// ---------------------------------------------------------------------------

function mapAuthor(row: AuthorRow): Author {
  return {
    id: row.id,
    slug: row.slug,
    fullName: row.full_name,
    displayName: row.display_name,
    roleTitle: row.role_title,
    bioShort: row.bio_short,
    bioLong: row.bio_long,
    crcNumber: row.crc_number,
    email: row.email,
    profileImageUrl: row.profile_image_url,
    linkedinUrl: row.linkedin_url,
    isActive: row.is_active,
  };
}

function mapCategory(row: BlogCategoryRow): BlogCategory {
  return {
    id: row.id,
    slug: row.slug as BlogCategorySlug,
    name: row.name,
    description: row.description,
    sortOrder: row.sort_order,
    isActive: row.is_active,
  };
}

type PostRowWithRelations = BlogPostRow & {
  author?: AuthorRow | null;
  category?: BlogCategoryRow | null;
};

function mapPost(row: PostRowWithRelations): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    excerpt: row.excerpt,
    contentHtml: row.content_html,
    contentJson: row.content_json,
    coverImageUrl: row.cover_image_url,
    coverImageAlt: row.cover_image_alt,
    status: row.status,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    authorId: row.author_id,
    categoryId: row.category_id,
    author: row.author ? mapAuthor(row.author) : undefined,
    category: row.category ? mapCategory(row.category) : null,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    canonicalUrl: row.canonical_url,
    ogTitle: row.og_title,
    ogDescription: row.og_description,
    ogImageUrl: row.og_image_url,
    robotsIndex: row.robots_index,
    robotsFollow: row.robots_follow,
    primaryKeyword: row.primary_keyword,
    secondaryKeywords: row.secondary_keywords,
    searchIntent: row.search_intent,
    entityFocus: row.entity_focus,
    localFocus: row.local_focus,
    faqEnabled: row.faq_enabled,
    isEvergreen: row.is_evergreen,
    lastReviewedAt: row.last_reviewed_at,
    technicalReviewedByAuthor: row.technical_reviewed_by_author,
    featuredOnHome: row.featured_on_home,
    featuredOrder: row.featured_order,
    isPillar: row.is_pillar,
    readTimeMinutes: row.read_time_minutes,
    relatedServiceSlug: row.related_service_slug,
    relatedSpecialtySlug: row.related_specialty_slug,
  };
}

function mapFaq(row: BlogPostFaqRow): BlogPostFaq {
  return {
    id: row.id,
    postId: row.post_id,
    question: row.question,
    answer: row.answer,
    sortOrder: row.sort_order,
  };
}

// ---------------------------------------------------------------------------
// Visibility predicate (used by every list/get query).
//
// A post is publicly visible if either:
//   - status = 'published'
//   - status = 'scheduled' AND published_at <= now()
//
// We rely on the same RLS policy server-side, but apply the filter explicitly
// in the query so the client is also correct when called with a service-role
// key (where RLS is bypassed).
// ---------------------------------------------------------------------------

const VISIBILITY_FILTER =
  `or(status.eq.published,and(status.eq.scheduled,published_at.lte.${new Date().toISOString()}))`;

function freshVisibilityFilter(): string {
  // Re-evaluate now() at call time so cached/long-lived processes see the
  // correct boundary on each request.
  return `or(status.eq.published,and(status.eq.scheduled,published_at.lte.${new Date().toISOString()}))`;
}

// Suppress unused-warning for the constant snapshot above (kept for reference).
void VISIBILITY_FILTER;

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Returns true if the Supabase client is available. */
export function isBlogBackendReady(): boolean {
  return supabase !== null;
}

/**
 * List published or already-scheduled posts, newest first.
 * Joins author and category for direct rendering.
 */
export async function getPublishedPosts(options?: {
  limit?: number;
  offset?: number;
  categorySlug?: BlogCategorySlug;
}): Promise<BlogPost[]> {
  if (!supabase) return [];

  const { limit = 12, offset = 0, categorySlug } = options ?? {};

  let query = supabase
    .from('blog_posts')
    .select<string, PostRowWithRelations>(
      `*, author:authors(*), category:blog_categories(*)`,
    )
    .or(
      `status.eq.published,and(status.eq.scheduled,published_at.lte.${new Date().toISOString()})`,
    )
    .order('published_at', { ascending: false, nullsFirst: false })
    .range(offset, offset + limit - 1);

  if (categorySlug) {
    // Filter via joined category slug
    query = query.eq('category.slug', categorySlug);
  }

  const { data, error } = await query;
  if (error) {
    console.error('[blog/queries] getPublishedPosts error', error);
    return [];
  }
  return (data ?? []).map(mapPost);
}

/**
 * Get a single visible post by slug (returns null if not found or not visible).
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('blog_posts')
    .select<string, PostRowWithRelations>(
      `*, author:authors(*), category:blog_categories(*)`,
    )
    .eq('slug', slug)
    .or(freshVisibilityFilter())
    .maybeSingle();

  if (error) {
    console.error('[blog/queries] getPostBySlug error', error);
    return null;
  }
  return data ? mapPost(data) : null;
}

/**
 * Posts to feature on the home page.
 *
 * Order:
 *   1. featured_on_home = true, ordered by featured_order ASC NULLS LAST,
 *      then published_at DESC
 *   2. If fewer than `limit`, fill with the latest published posts that
 *      are not already in the featured set.
 */
export async function getFeaturedPosts(limit = 3): Promise<BlogPost[]> {
  if (!supabase) return [];
  const now = new Date().toISOString();

  // 1. Featured pool
  const { data: featuredRows, error: e1 } = await supabase
    .from('blog_posts')
    .select<string, PostRowWithRelations>(
      `*, author:authors(*), category:blog_categories(*)`,
    )
    .eq('featured_on_home', true)
    .or(`status.eq.published,and(status.eq.scheduled,published_at.lte.${now})`)
    .order('featured_order', { ascending: true, nullsFirst: false })
    .order('published_at', { ascending: false, nullsFirst: false })
    .limit(limit);

  if (e1) {
    console.error('[blog/queries] getFeaturedPosts (featured) error', e1);
    return [];
  }

  const featured = (featuredRows ?? []).map(mapPost);
  if (featured.length >= limit) return featured.slice(0, limit);

  // 2. Top-up with latest visible posts not already featured
  const seen = new Set(featured.map((p) => p.id));
  const missing = limit - featured.length;

  const { data: latestRows, error: e2 } = await supabase
    .from('blog_posts')
    .select<string, PostRowWithRelations>(
      `*, author:authors(*), category:blog_categories(*)`,
    )
    .or(`status.eq.published,and(status.eq.scheduled,published_at.lte.${now})`)
    .order('published_at', { ascending: false, nullsFirst: false })
    .limit(missing + featured.length); // small overshoot to dedupe

  if (e2) {
    console.error('[blog/queries] getFeaturedPosts (latest) error', e2);
    return featured;
  }

  const fallbacks = (latestRows ?? [])
    .map(mapPost)
    .filter((p) => !seen.has(p.id))
    .slice(0, missing);

  return [...featured, ...fallbacks];
}

/**
 * FAQs for a post, ordered by sort_order.
 * RLS guarantees these are only readable when the parent post is visible.
 */
export async function getPostFaqs(postId: string): Promise<BlogPostFaq[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('blog_post_faqs')
    .select<string, BlogPostFaqRow>('*')
    .eq('post_id', postId)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[blog/queries] getPostFaqs error', error);
    return [];
  }
  return (data ?? []).map(mapFaq);
}

/**
 * Service slugs related to a given post.
 * The frontend can resolve these against /content/services to build link cards.
 */
export async function getPostRelatedServiceSlugs(postId: string): Promise<string[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('blog_post_related_services')
    .select<string, { service_slug: string; sort_order: number }>(
      'service_slug, sort_order',
    )
    .eq('post_id', postId)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[blog/queries] getPostRelatedServiceSlugs error', error);
    return [];
  }
  return (data ?? []).map((r) => r.service_slug);
}

/**
 * List active categories ordered by sort_order.
 */
export async function getActiveCategories(): Promise<BlogCategory[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('blog_categories')
    .select<string, BlogCategoryRow>('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('[blog/queries] getActiveCategories error', error);
    return [];
  }
  return (data ?? []).map(mapCategory);
}

/**
 * Active authors. Used for /quem-somos team listing or author pages.
 */
export async function getActiveAuthors(): Promise<Author[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('authors')
    .select<string, AuthorRow>('*')
    .eq('is_active', true)
    .order('full_name', { ascending: true });

  if (error) {
    console.error('[blog/queries] getActiveAuthors error', error);
    return [];
  }
  return (data ?? []).map(mapAuthor);
}
