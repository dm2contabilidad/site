'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_TTL_SECONDS,
  checkLoginRateLimit,
  clearLoginAttempts,
  createSessionToken,
  recordLoginAttempt,
  verifyAdminPassword,
} from '@/lib/admin/auth';
import { isAdminAuthenticated } from '@/lib/admin/session';
import { requireAdminClient } from '@/lib/supabase-admin';
import {
  faqListSchema,
  postFormSchema,
  relatedServicesSchema,
  type FaqInput,
  type PostFormInput,
  type PostStatus,
} from '@/lib/admin/validation';

// ---------------------------------------------------------------------------
// Login / logout
// ---------------------------------------------------------------------------

export interface LoginResult {
  ok: boolean;
  error?: string;
}

export async function loginAction(formData: FormData): Promise<LoginResult> {
  const headersList = await headers();
  const ipKey = (headersList.get('x-forwarded-for')?.split(',')[0]?.trim()
    || headersList.get('x-real-ip')
    || 'unknown');

  const rate = checkLoginRateLimit(ipKey);
  if (!rate.allowed) {
    const minutes = Math.ceil(rate.retryAfterMs / 60_000);
    return {
      ok: false,
      error: `Muitas tentativas. Tente novamente em ${minutes} minuto${minutes > 1 ? 's' : ''}.`,
    };
  }

  const password = String(formData.get('password') || '');
  if (!verifyAdminPassword(password)) {
    recordLoginAttempt(ipKey);
    // Generic error — never reveal whether the password env is missing,
    // wrong format, or just incorrect.
    return { ok: false, error: 'Senha incorreta.' };
  }

  clearLoginAttempts(ipKey);

  // createSessionToken() throws if ADMIN_SESSION_SECRET is missing or too
  // short. Catch and return a generic error — never tell the client whether
  // the failure was config-related or otherwise.
  let token: string;
  try {
    token = createSessionToken();
  } catch {
    return { ok: false, error: 'Configuração de admin incompleta. Contate o suporte.' };
  }

  const store = await cookies();
  store.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/admin',
    maxAge: ADMIN_SESSION_TTL_SECONDS,
  });

  return { ok: true };
}

export async function logoutAction(): Promise<void> {
  const store = await cookies();
  store.delete(ADMIN_COOKIE_NAME);
  redirect('/admin/blog/login');
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function requireAuthenticated(): Promise<void> {
  const ok = await isAdminAuthenticated();
  if (!ok) redirect('/admin/blog/login');
}

function flattenZodErrors(issues: ReadonlyArray<{ path: PropertyKey[]; message: string }>): {
  fieldErrors: Partial<Record<string, string>>;
  formError: string | null;
} {
  const fieldErrors: Record<string, string> = {};
  for (const issue of issues) {
    const key = issue.path.map(String).join('.');
    if (!fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return {
    fieldErrors,
    formError: Object.keys(fieldErrors).length === 0
      ? 'Dados inválidos.'
      : 'Verifique os campos sinalizados.',
  };
}

// snake_case → DB; centralised so all writes are consistent.
function toRow(data: ReturnType<typeof postFormSchema.parse>) {
  return {
    title: data.title,
    slug: data.slug,
    subtitle: data.subtitle,
    excerpt: data.excerpt,
    content_html: data.contentHtml,
    cover_image_url: data.coverImageUrl,
    cover_image_alt: data.coverImageAlt,
    og_image_url: data.ogImageUrl,
    status: data.status,
    published_at: data.publishedAt,
    author_id: data.authorId,
    category_id: data.categoryId,
    seo_title: data.seoTitle,
    seo_description: data.seoDescription,
    canonical_url: data.canonicalUrl,
    og_title: data.ogTitle,
    og_description: data.ogDescription,
    primary_keyword: data.primaryKeyword,
    secondary_keywords: data.secondaryKeywords.length > 0 ? data.secondaryKeywords : null,
    search_intent: data.searchIntent,
    entity_focus: data.entityFocus,
    local_focus: data.localFocus,
    robots_index: data.robotsIndex,
    robots_follow: data.robotsFollow,
    faq_enabled: data.faqEnabled,
    is_evergreen: data.isEvergreen,
    technical_reviewed_by_author: data.technicalReviewedByAuthor,
    is_pillar: data.isPillar,
    last_reviewed_at: data.lastReviewedAt,
    read_time_minutes: data.readTimeMinutes,
    featured_on_home: data.featuredOnHome,
    featured_order: data.featuredOnHome ? data.featuredOrder : null,
    related_service_slug: data.relatedServiceSlug,
    related_specialty_slug: data.relatedSpecialtySlug,
  };
}

function parseJsonArray<T>(raw: FormDataEntryValue | null): T[] {
  if (typeof raw !== 'string' || raw.trim().length === 0) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function extractFormPayload(formData: FormData): PostFormInput {
  const get = (k: string) => {
    const v = formData.get(k);
    return v == null ? '' : String(v);
  };
  return {
    title: get('title'),
    slug: get('slug'),
    subtitle: get('subtitle'),
    excerpt: get('excerpt'),
    contentHtml: get('contentHtml'),
    coverImageUrl: get('coverImageUrl'),
    coverImageAlt: get('coverImageAlt'),
    ogImageUrl: get('ogImageUrl'),
    status: (get('status') || 'draft') as PostStatus,
    publishedAt: get('publishedAt'),
    authorId: get('authorId'),
    categoryId: get('categoryId'),
    seoTitle: get('seoTitle'),
    seoDescription: get('seoDescription'),
    canonicalUrl: get('canonicalUrl'),
    ogTitle: get('ogTitle'),
    ogDescription: get('ogDescription'),
    primaryKeyword: get('primaryKeyword'),
    secondaryKeywords: get('secondaryKeywords'),
    searchIntent: get('searchIntent'),
    entityFocus: get('entityFocus'),
    localFocus: get('localFocus'),
    robotsIndex: formData.get('robotsIndex') === 'on' || formData.get('robotsIndex') === 'true',
    robotsFollow: formData.get('robotsFollow') === 'on' || formData.get('robotsFollow') === 'true',
    faqEnabled: formData.get('faqEnabled') === 'on' || formData.get('faqEnabled') === 'true',
    isEvergreen: formData.get('isEvergreen') === 'on' || formData.get('isEvergreen') === 'true',
    technicalReviewedByAuthor:
      formData.get('technicalReviewedByAuthor') === 'on'
      || formData.get('technicalReviewedByAuthor') === 'true',
    isPillar: formData.get('isPillar') === 'on' || formData.get('isPillar') === 'true',
    lastReviewedAt: get('lastReviewedAt'),
    readTimeMinutes: get('readTimeMinutes'),
    featuredOnHome: formData.get('featuredOnHome') === 'on' || formData.get('featuredOnHome') === 'true',
    featuredOrder: get('featuredOrder'),
    relatedServiceSlug: get('relatedServiceSlug'),
    relatedSpecialtySlug: get('relatedSpecialtySlug'),
  };
}

// ---------------------------------------------------------------------------
// FAQ + related services synchronisation. Both are full-list reconciliations
// per post: we delete existing rows and re-insert. Simpler than a diff and
// the volumes (≤50 FAQs, ≤10 related services) make it cheap.
// ---------------------------------------------------------------------------

async function syncFaqs(postId: string, faqs: FaqInput[]) {
  const client = requireAdminClient();
  const { error: delErr } = await client.from('blog_post_faqs').delete().eq('post_id', postId);
  if (delErr) {
    return { ok: false as const, error: delErr.message };
  }
  if (faqs.length === 0) return { ok: true as const };
  const rows = faqs.map((f, idx) => ({
    post_id: postId,
    question: f.question,
    answer: f.answer,
    sort_order: idx,
  }));
  const { error: insErr } = await client.from('blog_post_faqs').insert(rows);
  if (insErr) return { ok: false as const, error: insErr.message };
  return { ok: true as const };
}

async function syncRelatedServices(postId: string, slugs: string[]) {
  const client = requireAdminClient();
  const { error: delErr } = await client
    .from('blog_post_related_services')
    .delete()
    .eq('post_id', postId);
  if (delErr) return { ok: false as const, error: delErr.message };
  if (slugs.length === 0) return { ok: true as const };
  const rows = slugs.map((slug, idx) => ({
    post_id: postId,
    service_slug: slug,
    sort_order: idx,
  }));
  const { error: insErr } = await client.from('blog_post_related_services').insert(rows);
  if (insErr) return { ok: false as const, error: insErr.message };
  return { ok: true as const };
}

// ---------------------------------------------------------------------------
// Post CRUD
// ---------------------------------------------------------------------------

export interface SaveResult {
  ok: boolean;
  postId?: string;
  formError?: string;
  fieldErrors?: Partial<Record<string, string>>;
}

export async function createPostAction(formData: FormData): Promise<SaveResult> {
  await requireAuthenticated();

  const payload = extractFormPayload(formData);
  const parsed = postFormSchema.safeParse(payload);
  if (!parsed.success) {
    const { fieldErrors, formError } = flattenZodErrors(parsed.error.issues);
    return { ok: false, formError: formError ?? 'Dados inválidos.', fieldErrors };
  }

  const faqs = faqListSchema.safeParse(parseJsonArray(formData.get('faqs')));
  const related = relatedServicesSchema.safeParse(parseJsonArray<string>(formData.get('relatedServices')));
  if (!faqs.success) return { ok: false, formError: 'FAQ inválida.' };
  if (!related.success) return { ok: false, formError: 'Serviços relacionados inválidos.' };

  const client = requireAdminClient();
  const { data, error } = await client
    .from('blog_posts')
    .insert(toRow(parsed.data))
    .select('id')
    .single();

  if (error || !data) {
    const msg = error?.message ?? 'Erro ao criar post.';
    if (msg.includes('blog_posts_slug_key') || msg.toLowerCase().includes('duplicate')) {
      return { ok: false, formError: 'Slug já existe.', fieldErrors: { slug: 'Slug já existe.' } };
    }
    return { ok: false, formError: 'Não foi possível criar o post.' };
  }

  const faqSync = await syncFaqs(data.id, faqs.data);
  if (!faqSync.ok) return { ok: false, postId: data.id, formError: 'Post criado, mas FAQs falharam.' };

  const relSync = await syncRelatedServices(data.id, related.data);
  if (!relSync.ok) return { ok: false, postId: data.id, formError: 'Post criado, mas serviços relacionados falharam.' };

  revalidatePath('/admin/blog');
  revalidatePath('/blog');
  return { ok: true, postId: data.id };
}

export async function updatePostAction(id: string, formData: FormData): Promise<SaveResult> {
  await requireAuthenticated();

  const payload = extractFormPayload(formData);
  const parsed = postFormSchema.safeParse(payload);
  if (!parsed.success) {
    const { fieldErrors, formError } = flattenZodErrors(parsed.error.issues);
    return { ok: false, formError: formError ?? 'Dados inválidos.', fieldErrors };
  }

  const faqs = faqListSchema.safeParse(parseJsonArray(formData.get('faqs')));
  const related = relatedServicesSchema.safeParse(parseJsonArray<string>(formData.get('relatedServices')));
  if (!faqs.success) return { ok: false, formError: 'FAQ inválida.' };
  if (!related.success) return { ok: false, formError: 'Serviços relacionados inválidos.' };

  const client = requireAdminClient();
  const { error } = await client
    .from('blog_posts')
    .update(toRow(parsed.data))
    .eq('id', id);

  if (error) {
    if (error.message.includes('blog_posts_slug_key') || error.message.toLowerCase().includes('duplicate')) {
      return { ok: false, formError: 'Slug já existe.', fieldErrors: { slug: 'Slug já existe.' } };
    }
    return { ok: false, formError: 'Não foi possível atualizar o post.' };
  }

  const faqSync = await syncFaqs(id, faqs.data);
  if (!faqSync.ok) return { ok: false, postId: id, formError: 'Post atualizado, mas FAQs falharam.' };

  const relSync = await syncRelatedServices(id, related.data);
  if (!relSync.ok) return { ok: false, postId: id, formError: 'Post atualizado, mas serviços relacionados falharam.' };

  revalidatePath('/admin/blog');
  revalidatePath(`/admin/blog/${id}`);
  revalidatePath('/blog');
  revalidatePath(`/blog/${parsed.data.slug}`);
  return { ok: true, postId: id };
}

export async function setStatusAction(
  id: string,
  status: PostStatus,
  publishedAt?: string | null,
): Promise<{ ok: boolean; error?: string }> {
  await requireAuthenticated();
  if (!['draft', 'scheduled', 'published', 'archived'].includes(status)) {
    return { ok: false, error: 'Status inválido.' };
  }
  const update: Record<string, unknown> = { status };
  if (status === 'scheduled' || status === 'published') {
    if (!publishedAt) return { ok: false, error: 'Data de publicação obrigatória.' };
    update.published_at = publishedAt;
  }
  if (status === 'published' && !publishedAt) {
    update.published_at = new Date().toISOString();
  }
  const client = requireAdminClient();
  const { error } = await client.from('blog_posts').update(update).eq('id', id);
  if (error) return { ok: false, error: 'Falha ao atualizar status.' };
  revalidatePath('/admin/blog');
  revalidatePath('/blog');
  return { ok: true };
}

export async function deletePostAction(id: string): Promise<{ ok: boolean; error?: string }> {
  await requireAuthenticated();
  const client = requireAdminClient();
  // FAQs and related services cascade via FK ON DELETE CASCADE.
  const { error } = await client.from('blog_posts').delete().eq('id', id);
  if (error) return { ok: false, error: 'Não foi possível excluir o post.' };
  revalidatePath('/admin/blog');
  revalidatePath('/blog');
  return { ok: true };
}
