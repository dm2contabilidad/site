import type { MetadataRoute } from 'next';
import { serviceSlugs } from '@/content/services';
import { nicheSlugs } from '@/content/niches';
import { getPublishedPosts } from '@/lib/blog/queries';

const BASE_URL = 'https://dm2contabilidade.com.br';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  // Core pages
  const corePages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/quem-somos`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/servicos-contabeis`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/contato`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/privacidade`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/termos`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Service pages
  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${BASE_URL}/servicos-contabeis/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // Specialty pages (root-level with full keyword slugs)
  const nichePages: MetadataRoute.Sitemap = nicheSlugs.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Blog posts: only publicly visible (published or scheduled+past).
  // Pull a generous batch; enough for any realistic editorial volume.
  const posts = await getPublishedPosts({ limit: 500 });
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt ?? post.publishedAt ?? now,
    changeFrequency: 'monthly' as const,
    priority: post.isPillar ? 0.8 : 0.6,
  }));

  return [...corePages, ...servicePages, ...nichePages, ...blogPages];
}
