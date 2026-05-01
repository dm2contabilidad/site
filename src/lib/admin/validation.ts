import { z } from 'zod';
import { serviceSlugs } from '@/content/services';
import type { ServiceSlug } from '@/types/service';

/**
 * Zod schemas for admin write operations.
 *
 * Server-side validation for every CRUD path. Mirrors the database
 * constraints in docs/supabase-blog-tables.sql plus editorial rules
 * (e.g. featured_order required when featured_on_home is true).
 */

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const trimmedString = (max: number) =>
  z
    .string()
    .transform((s) => s.trim())
    .pipe(z.string().max(max));

const optionalText = (max: number) =>
  z
    .union([z.string(), z.null(), z.undefined()])
    .transform((v) => (typeof v === 'string' ? v.trim() : ''))
    .transform((s) => (s.length === 0 ? null : s.slice(0, max)));

const optionalUrl = z
  .union([z.string(), z.null(), z.undefined()])
  .transform((v) => (typeof v === 'string' ? v.trim() : ''))
  .transform((s) => (s.length === 0 ? null : s))
  .refine(
    (v) => v === null || /^https?:\/\//i.test(v),
    'URL deve começar com http:// ou https://',
  );

const optionalIsoDateTime = z
  .union([z.string(), z.null(), z.undefined()])
  .transform((v) => (typeof v === 'string' ? v.trim() : ''))
  .transform((s) => (s.length === 0 ? null : s))
  .refine(
    (v) => v === null || !Number.isNaN(Date.parse(v)),
    'Data inválida',
  );

const stringArrayFromCsv = z
  .union([z.string(), z.null(), z.undefined()])
  .transform((v) => {
    if (typeof v !== 'string') return [] as string[];
    return v
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 25);
  });

export const POST_STATUSES = ['draft', 'scheduled', 'published', 'archived'] as const;
export type PostStatus = (typeof POST_STATUSES)[number];

export const postFormSchema = z
  .object({
    title: trimmedString(200).pipe(z.string().min(3, 'Título obrigatório')),
    slug: trimmedString(200).pipe(
      z.string().min(3, 'Slug obrigatório').regex(slugRegex, 'Slug inválido (apenas a-z, 0-9, hífen)'),
    ),
    subtitle: optionalText(300),
    excerpt: trimmedString(600).pipe(z.string().min(20, 'Excerto deve ter ao menos 20 caracteres')),
    contentHtml: optionalText(200_000),

    coverImageUrl: optionalUrl,
    coverImageAlt: optionalText(200),
    ogImageUrl: optionalUrl,

    status: z.enum(POST_STATUSES),
    publishedAt: optionalIsoDateTime,

    authorId: z.string().uuid('Autor obrigatório'),
    categoryId: z.union([z.string().uuid(), z.literal(''), z.null()]).transform((v) => (v ? v : null)),

    seoTitle: optionalText(120),
    seoDescription: optionalText(300),
    canonicalUrl: optionalUrl,
    ogTitle: optionalText(120),
    ogDescription: optionalText(300),

    primaryKeyword: optionalText(120),
    secondaryKeywords: stringArrayFromCsv,
    searchIntent: optionalText(120),
    entityFocus: optionalText(120),
    localFocus: optionalText(120),

    robotsIndex: z.coerce.boolean(),
    robotsFollow: z.coerce.boolean(),
    faqEnabled: z.coerce.boolean(),
    isEvergreen: z.coerce.boolean(),
    technicalReviewedByAuthor: z.coerce.boolean(),
    isPillar: z.coerce.boolean(),

    lastReviewedAt: optionalIsoDateTime,
    readTimeMinutes: z.coerce
      .number()
      .int()
      .nonnegative()
      .max(180)
      .nullable()
      .or(z.literal('').transform(() => null)),

    featuredOnHome: z.coerce.boolean(),
    featuredOrder: z.coerce
      .number()
      .int()
      .nonnegative()
      .max(999)
      .nullable()
      .or(z.literal('').transform(() => null)),

    relatedServiceSlug: optionalText(120),
    relatedSpecialtySlug: optionalText(120),
  })
  .superRefine((data, ctx) => {
    if (data.status === 'scheduled' || data.status === 'published') {
      if (!data.publishedAt) {
        ctx.addIssue({
          path: ['publishedAt'],
          code: z.ZodIssueCode.custom,
          message: 'Data de publicação obrigatória para scheduled/published',
        });
      }
    }
    if (data.featuredOnHome && data.featuredOrder == null) {
      ctx.addIssue({
        path: ['featuredOrder'],
        code: z.ZodIssueCode.custom,
        message: 'Ordem obrigatória quando o post está marcado como featured',
      });
    }
  });

export type PostFormInput = z.input<typeof postFormSchema>;
export type PostFormData = z.output<typeof postFormSchema>;

// ---------------------------------------------------------------------------
// FAQs and related services — submitted as full lists per post.
// The server diffs these against the existing rows and reconciles.
// ---------------------------------------------------------------------------

export const faqItemSchema = z.object({
  question: trimmedString(300).pipe(z.string().min(3, 'Pergunta muito curta')),
  answer: trimmedString(2000).pipe(z.string().min(3, 'Resposta muito curta')),
});

export const faqListSchema = z.array(faqItemSchema).max(50);
export type FaqInput = z.infer<typeof faqItemSchema>;

const serviceSlugSet = new Set<string>(serviceSlugs);

export const relatedServicesSchema = z
  .array(z.string())
  .max(10)
  .transform((arr) => arr.filter((s) => serviceSlugSet.has(s)) as ServiceSlug[]);
