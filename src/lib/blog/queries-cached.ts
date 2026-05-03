import { unstable_cache } from 'next/cache';
import {
  countPublishedPosts,
  getActiveCategories,
  getFeaturedPosts,
  getPublishedPosts,
} from './queries';
import type { BlogCategorySlug } from '@/types/blog';

/**
 * Cached wrappers around the public blog queries used by /blog.
 *
 * Why this file exists:
 *   /blog reads `searchParams` (page, per_page, categoria), which forces
 *   Next 16 to render it as a dynamic page even with `export const
 *   revalidate = 60`. Without this layer, every request to /blog —
 *   including hits that are semantically identical (same category,
 *   same page, same per_page) — fired four Supabase queries against the
 *   region nearest to the Lambda.
 *
 *   `unstable_cache` decouples query caching from page caching: the
 *   page stays dynamic (so it can keep reading searchParams), but each
 *   underlying query is memoised at the data layer for `TTL` seconds,
 *   keyed by both the explicit `keyParts` and the function arguments.
 *
 * Invalidation:
 *   - Soft: TTL expires every 60 s and the next request regenerates
 *     in background.
 *   - Hard: any admin write calls `revalidateTag('blog')` (see
 *     src/app/admin/blog/actions.ts), so editor changes show up on
 *     the next request, not after the TTL.
 *
 * The `'blog'` tag spans every wrapper here so a single revalidateTag
 * blows the entire blog cache family at once — simpler than tagging
 * per-shape and reasoning about which tag a given write should bump.
 */

const TTL = 60;
const TAGS = ['blog'];

// Active categories rarely change; bumped along with the rest of the
// blog cache via the shared 'blog' tag.
export const getActiveCategoriesCached = unstable_cache(
  async () => getActiveCategories(),
  ['blog:categories:active'],
  { tags: TAGS, revalidate: TTL },
);

// Total count for pagination. Cached per `categorySlug` (or `null` for
// the unfiltered listing).
export const countPublishedPostsCached = unstable_cache(
  async (categorySlug: BlogCategorySlug | undefined) =>
    countPublishedPosts({ categorySlug }),
  ['blog:count'],
  { tags: TAGS, revalidate: TTL },
);

// Featured pool used in the unfiltered first page hero of /blog.
// Hybrid logic (manual featured + autofill latest) lives in
// getFeaturedPosts; we cache the result by `limit` only.
export const getFeaturedPostsCached = unstable_cache(
  async (limit: number) => getFeaturedPosts(limit),
  ['blog:featured'],
  { tags: TAGS, revalidate: TTL },
);

// Paginated list. Cache key includes (limit, offset, categorySlug):
// /blog?page=1, /blog?page=2, /blog?categoria=tributario all get
// distinct entries automatically.
export const getPublishedPostsCached = unstable_cache(
  async (
    limit: number,
    offset: number,
    categorySlug: BlogCategorySlug | undefined,
  ) => getPublishedPosts({ limit, offset, categorySlug }),
  ['blog:posts:list'],
  { tags: TAGS, revalidate: TTL },
);
