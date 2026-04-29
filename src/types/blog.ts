import type { FAQ } from './faq';

/**
 * Blog domain types — aligned with the Supabase schema in
 * docs/supabase-blog-tables.sql.
 *
 * Database columns are snake_case; we expose camelCase to the rest
 * of the app via mappers in src/lib/blog/queries.ts.
 */

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

export type BlogCategorySlug =
  | 'tributario'
  | 'fiscal'
  | 'abertura-de-empresas'
  | 'departamento-pessoal'
  | 'legislacao'
  | 'mei-e-pequenas-empresas'
  | 'gestao-financeira';

export interface BlogCategory {
  id?: string;
  slug: BlogCategorySlug;
  name: string;
  description?: string | null;
  sortOrder?: number;
  isActive?: boolean;
}

// Backward-compat alias (legacy callsites used `title` instead of `name`)
export interface BlogCategoryLegacy {
  slug: BlogCategorySlug;
  title: string;
  description: string;
}

// ---------------------------------------------------------------------------
// Authors
// ---------------------------------------------------------------------------

export interface Author {
  id?: string;
  slug: string;
  fullName: string;
  displayName: string;
  roleTitle: string;
  bioShort?: string | null;
  bioLong?: string | null;
  crcNumber?: string | null;
  email?: string | null;
  profileImageUrl?: string | null;
  linkedinUrl?: string | null;
  isActive: boolean;
}

// Legacy author shape kept by /content/blog/authors.ts
export interface AuthorLegacy {
  slug: string;
  name: string;
  role: string;
  bio: string;
  avatar?: string;
}

// ---------------------------------------------------------------------------
// Blog post
// ---------------------------------------------------------------------------

export type BlogPostStatus = 'draft' | 'scheduled' | 'published' | 'archived';

export interface BlogPost {
  id: string;

  // Core editorial
  slug: string;
  title: string;
  subtitle?: string | null;
  excerpt: string;
  contentHtml?: string | null;
  contentJson?: Record<string, unknown> | null;
  coverImageUrl?: string | null;
  coverImageAlt?: string | null;

  // Editorial state
  status: BlogPostStatus;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;

  // Relations (foreign keys)
  authorId: string;
  categoryId?: string | null;

  // Joined data (when query expands the FK)
  author?: Author;
  category?: BlogCategory | null;

  // Classic SEO
  seoTitle?: string | null;
  seoDescription?: string | null;
  canonicalUrl?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImageUrl?: string | null;
  robotsIndex: boolean;
  robotsFollow: boolean;

  // Semantic SEO / GEO / AI readiness
  primaryKeyword?: string | null;
  secondaryKeywords?: string[] | null;
  searchIntent?: string | null;
  entityFocus?: string | null;
  localFocus?: string | null;
  faqEnabled: boolean;
  isEvergreen: boolean;
  lastReviewedAt?: string | null;
  technicalReviewedByAuthor: boolean;

  // Distribution / UX
  featuredOnHome: boolean;
  featuredOrder?: number | null;
  isPillar: boolean;
  readTimeMinutes?: number | null;
  relatedServiceSlug?: string | null;
  relatedSpecialtySlug?: string | null;
}

// ---------------------------------------------------------------------------
// Related entities
// ---------------------------------------------------------------------------

export interface BlogPostFaq extends FAQ {
  id: string;
  postId: string;
  sortOrder: number;
}

export interface BlogPostRelatedService {
  id: string;
  postId: string;
  serviceSlug: string;
  sortOrder: number;
}

// ---------------------------------------------------------------------------
// Raw row types (snake_case, as returned by the supabase-js client).
// Used internally by the mappers in src/lib/blog/queries.ts.
// ---------------------------------------------------------------------------

export interface BlogPostRow {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  excerpt: string;
  content_html: string | null;
  content_json: Record<string, unknown> | null;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  status: BlogPostStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  author_id: string;
  category_id: string | null;
  seo_title: string | null;
  seo_description: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image_url: string | null;
  robots_index: boolean;
  robots_follow: boolean;
  primary_keyword: string | null;
  secondary_keywords: string[] | null;
  search_intent: string | null;
  entity_focus: string | null;
  local_focus: string | null;
  faq_enabled: boolean;
  is_evergreen: boolean;
  last_reviewed_at: string | null;
  technical_reviewed_by_author: boolean;
  featured_on_home: boolean;
  featured_order: number | null;
  is_pillar: boolean;
  read_time_minutes: number | null;
  related_service_slug: string | null;
  related_specialty_slug: string | null;
}

export interface AuthorRow {
  id: string;
  slug: string;
  full_name: string;
  display_name: string;
  role_title: string;
  bio_short: string | null;
  bio_long: string | null;
  crc_number: string | null;
  email: string | null;
  profile_image_url: string | null;
  linkedin_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogCategoryRow {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogPostFaqRow {
  id: string;
  post_id: string;
  question: string;
  answer: string;
  sort_order: number;
}
