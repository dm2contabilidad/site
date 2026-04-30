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
// RLS enforces the same rule server-side, but we also apply it explicitly
// here so the result is correct under a service-role key (RLS bypassed).
// `now()` is re-evaluated on every call so long-lived processes still see
// the correct boundary.
// ---------------------------------------------------------------------------

function visibilityFilter(): string {
  return `status.eq.published,and(status.eq.scheduled,published_at.lte.${new Date().toISOString()})`;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Returns true if the Supabase client is available. */
export function isBlogBackendReady(): boolean {
  return supabase !== null;
}

/**
 * Pretty-print a Supabase error. The default console.error path serializes
 * PostgrestError as `{}` because its enumerable fields don't survive the
 * console formatter in Next dev. Pulling the relevant fields out by hand
 * gives a readable message + diagnostic code (e.g. PGRST205 = table missing).
 */
function logSupabaseError(scope: string, error: unknown): void {
  const e = error as {
    message?: string;
    code?: string;
    details?: string;
    hint?: string;
  } | null;
  console.error(`[blog/queries] ${scope} error`, {
    message: e?.message,
    code: e?.code,
    details: e?.details,
    hint: e?.hint,
  });
}

/**
 * Resolves a category slug to its UUID. Returns null when not found.
 * Used to filter blog_posts by category_id (filtering on the joined
 * `category.slug` only narrows the relation, not the parent row, so we
 * resolve the id explicitly and filter by FK).
 */
async function resolveCategoryId(
  slug: BlogCategorySlug,
): Promise<string | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('blog_categories')
    .select<string, { id: string }>('id')
    .eq('slug', slug)
    .maybeSingle();
  if (error || !data) return null;
  return data.id;
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

  let categoryId: string | null = null;
  if (categorySlug) {
    categoryId = await resolveCategoryId(categorySlug);
    if (!categoryId) return [];
  }

  let query = supabase
    .from('blog_posts')
    .select<string, PostRowWithRelations>(
      `*, author:authors(*), category:blog_categories(*)`,
    )
    .or(visibilityFilter())
    .order('published_at', { ascending: false, nullsFirst: false })
    .range(offset, offset + limit - 1);

  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }

  const { data, error } = await query;
  if (error) {
    logSupabaseError('getPublishedPosts', error);
    return [];
  }
  return (data ?? []).map(mapPost);
}

/**
 * Count of visible posts, optionally filtered by category. Used by
 * the blog index to compute pagination total. Cheap call: server-side
 * count, no rows transferred.
 */
export async function countPublishedPosts(options?: {
  categorySlug?: BlogCategorySlug;
}): Promise<number> {
  if (!supabase) return 0;

  const { categorySlug } = options ?? {};

  let categoryId: string | null = null;
  if (categorySlug) {
    categoryId = await resolveCategoryId(categorySlug);
    if (!categoryId) return 0;
  }

  let query = supabase
    .from('blog_posts')
    .select('id', { count: 'exact', head: true })
    .or(visibilityFilter());

  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }

  const { count, error } = await query;
  if (error) {
    logSupabaseError('countPublishedPosts', error);
    return 0;
  }
  return count ?? 0;
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
    .or(visibilityFilter())
    .maybeSingle();

  if (error) {
    logSupabaseError('getPostBySlug', error);
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

  // 1. Featured pool
  const { data: featuredRows, error: e1 } = await supabase
    .from('blog_posts')
    .select<string, PostRowWithRelations>(
      `*, author:authors(*), category:blog_categories(*)`,
    )
    .eq('featured_on_home', true)
    .or(visibilityFilter())
    .order('featured_order', { ascending: true, nullsFirst: false })
    .order('published_at', { ascending: false, nullsFirst: false })
    .limit(limit);

  if (e1) {
    logSupabaseError('getFeaturedPosts (featured)', e1);
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
    .or(visibilityFilter())
    .order('published_at', { ascending: false, nullsFirst: false })
    .limit(missing + featured.length); // small overshoot to dedupe

  if (e2) {
    logSupabaseError('getFeaturedPosts (latest)', e2);
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
    logSupabaseError('getPostFaqs', error);
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
    logSupabaseError('getPostRelatedServiceSlugs', error);
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
    logSupabaseError('getActiveCategories', error);
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
    logSupabaseError('getActiveAuthors', error);
    return [];
  }
  return (data ?? []).map(mapAuthor);
}
