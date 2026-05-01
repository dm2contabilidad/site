import { notFound, redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/admin/session';
import { requireAdminClient } from '@/lib/supabase-admin';
import { serviceList } from '@/content/services';
import { PostForm, type PostFormValues, type PostFormFaq } from '../PostForm';
import type { PostStatus } from '@/lib/admin/validation';

export const dynamic = 'force-dynamic';

interface PostRow {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  excerpt: string;
  content_html: string | null;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  og_image_url: string | null;
  status: PostStatus;
  published_at: string | null;
  author_id: string;
  category_id: string | null;
  seo_title: string | null;
  seo_description: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  primary_keyword: string | null;
  secondary_keywords: string[] | null;
  search_intent: string | null;
  entity_focus: string | null;
  local_focus: string | null;
  robots_index: boolean;
  robots_follow: boolean;
  faq_enabled: boolean;
  is_evergreen: boolean;
  technical_reviewed_by_author: boolean;
  is_pillar: boolean;
  last_reviewed_at: string | null;
  read_time_minutes: number | null;
  featured_on_home: boolean;
  featured_order: number | null;
  related_service_slug: string | null;
  related_specialty_slug: string | null;
}

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAdminAuthenticated())) redirect('/admin/blog/login');

  const { id } = await params;
  const client = requireAdminClient();

  const [{ data: postData }, { data: authorsData }, { data: categoriesData }, { data: faqsData }, { data: relatedData }] =
    await Promise.all([
      client.from('blog_posts').select('*').eq('id', id).maybeSingle(),
      client.from('authors').select('id,display_name,is_active').order('full_name'),
      client.from('blog_categories').select('id,name,is_active').order('sort_order'),
      client.from('blog_post_faqs').select('question,answer,sort_order').eq('post_id', id).order('sort_order'),
      client.from('blog_post_related_services').select('service_slug,sort_order').eq('post_id', id).order('sort_order'),
    ]);

  if (!postData) notFound();
  const post = postData as PostRow;

  const initial: PostFormValues = {
    title: post.title ?? '',
    slug: post.slug ?? '',
    subtitle: post.subtitle ?? '',
    excerpt: post.excerpt ?? '',
    contentHtml: post.content_html ?? '',
    coverImageUrl: post.cover_image_url ?? '',
    coverImageAlt: post.cover_image_alt ?? '',
    ogImageUrl: post.og_image_url ?? '',
    status: post.status,
    publishedAt: post.published_at ?? '',
    authorId: post.author_id ?? '',
    categoryId: post.category_id ?? '',
    seoTitle: post.seo_title ?? '',
    seoDescription: post.seo_description ?? '',
    canonicalUrl: post.canonical_url ?? '',
    ogTitle: post.og_title ?? '',
    ogDescription: post.og_description ?? '',
    primaryKeyword: post.primary_keyword ?? '',
    secondaryKeywords: (post.secondary_keywords ?? []).join(', '),
    searchIntent: post.search_intent ?? '',
    entityFocus: post.entity_focus ?? '',
    localFocus: post.local_focus ?? '',
    robotsIndex: post.robots_index,
    robotsFollow: post.robots_follow,
    faqEnabled: post.faq_enabled,
    isEvergreen: post.is_evergreen,
    technicalReviewedByAuthor: post.technical_reviewed_by_author,
    isPillar: post.is_pillar,
    lastReviewedAt: post.last_reviewed_at ?? '',
    readTimeMinutes: post.read_time_minutes != null ? String(post.read_time_minutes) : '',
    featuredOnHome: post.featured_on_home,
    featuredOrder: post.featured_order != null ? String(post.featured_order) : '',
    relatedServiceSlug: post.related_service_slug ?? '',
    relatedSpecialtySlug: post.related_specialty_slug ?? '',
  };

  const initialFaqs: PostFormFaq[] = (faqsData ?? []).map((f: { question: string; answer: string }) => ({
    question: f.question,
    answer: f.answer,
  }));

  const initialRelatedServices: string[] = (relatedData ?? []).map(
    (r: { service_slug: string }) => r.service_slug,
  );

  const authors = (authorsData ?? [])
    .filter((a: { is_active: boolean }) => a.is_active)
    .map((a: { id: string; display_name: string }) => ({ id: a.id, displayName: a.display_name }));
  const categories = (categoriesData ?? [])
    .filter((c: { is_active: boolean }) => c.is_active)
    .map((c: { id: string; name: string }) => ({ id: c.id, name: c.name }));
  const serviceOptions = serviceList.map((s) => ({ slug: s.slug, title: s.title }));

  return (
    <PostForm
      mode="edit"
      postId={id}
      initial={initial}
      initialFaqs={initialFaqs}
      initialRelatedServices={initialRelatedServices}
      authors={authors}
      categories={categories}
      serviceOptions={serviceOptions}
    />
  );
}
