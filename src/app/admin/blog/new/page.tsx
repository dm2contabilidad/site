import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/admin/session';
import { requireAdminClient } from '@/lib/supabase-admin';
import { serviceList } from '@/content/services';
import { PostForm, type PostFormValues } from '../PostForm';

export const dynamic = 'force-dynamic';

const EMPTY: PostFormValues = {
  title: '',
  slug: '',
  subtitle: '',
  excerpt: '',
  contentHtml: '',
  coverImageUrl: '',
  coverImageAlt: '',
  ogImageUrl: '',
  status: 'draft',
  publishedAt: '',
  authorId: '',
  categoryId: '',
  seoTitle: '',
  seoDescription: '',
  canonicalUrl: '',
  ogTitle: '',
  ogDescription: '',
  primaryKeyword: '',
  secondaryKeywords: '',
  searchIntent: '',
  entityFocus: '',
  localFocus: '',
  robotsIndex: true,
  robotsFollow: true,
  faqEnabled: true,
  isEvergreen: false,
  technicalReviewedByAuthor: true,
  isPillar: false,
  lastReviewedAt: '',
  readTimeMinutes: '',
  featuredOnHome: false,
  featuredOrder: '',
  relatedServiceSlug: '',
  relatedSpecialtySlug: '',
};

export default async function NewPostPage() {
  if (!(await isAdminAuthenticated())) redirect('/admin/blog/login');

  const client = requireAdminClient();
  const [{ data: authorsData }, { data: categoriesData }] = await Promise.all([
    client.from('authors').select('id,display_name,is_active').order('full_name'),
    client.from('blog_categories').select('id,name,is_active').order('sort_order'),
  ]);

  const authors = (authorsData ?? [])
    .filter((a: { is_active: boolean }) => a.is_active)
    .map((a: { id: string; display_name: string }) => ({ id: a.id, displayName: a.display_name }));

  const categories = (categoriesData ?? [])
    .filter((c: { is_active: boolean }) => c.is_active)
    .map((c: { id: string; name: string }) => ({ id: c.id, name: c.name }));

  const serviceOptions = serviceList.map((s) => ({ slug: s.slug, title: s.title }));

  // Default to the only active author if there's exactly one — convenience
  // for a single-writer setup.
  const initial: PostFormValues = {
    ...EMPTY,
    authorId: authors.length === 1 ? authors[0].id : '',
  };

  return (
    <PostForm
      mode="create"
      initial={initial}
      initialFaqs={[]}
      initialRelatedServices={[]}
      authors={authors}
      categories={categories}
      serviceOptions={serviceOptions}
    />
  );
}
