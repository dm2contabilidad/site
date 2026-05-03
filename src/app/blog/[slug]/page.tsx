import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { Section } from '@/components/layout/Section';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import {
  BlogPostingSchema,
  FAQSchema,
} from '@/components/seo/SchemaMarkup';
import {
  getPostBySlug,
  getPostFaqs,
  getPostRelatedServiceSlugs,
  getPublishedPosts,
} from '@/lib/blog/queries';
import { services } from '@/content/services';
import { siteConfig, TECHNICAL_REFERENCE } from '@/content/site';
import type { ServiceSlug } from '@/types/service';

// ISR: HTML cacheado por até 60 s e regenerado em background. Slugs
// que não estavam pré-renderizados no build (ex.: post agendado que
// acabou de virar visível) são gerados on-demand na primeira visita
// e cacheados para os 60 s seguintes. Invalidação manual via
// revalidatePath em src/app/admin/blog/actions.ts.
export const revalidate = 60;

// Pre-render dos posts já publicados no build. Posts criados ou
// agendados depois são gerados on-demand; dynamicParams=true (default)
// permite isso. Reduz drasticamente o TTFB do hot path (artigos
// publicados ficam estáticos como qualquer outra página institucional).
export async function generateStaticParams() {
  // limit alto porque é cheap: só puxa 200 slugs no build, sem joins.
  const posts = await getPublishedPosts({ limit: 200 });
  return posts.map((p) => ({ slug: p.slug }));
}

const longDateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

function formatLongDate(iso: string | null | undefined): string {
  if (!iso) return '';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : longDateFormatter.format(d);
}

function absoluteUrl(path: string | null | undefined): string | undefined {
  if (!path) return undefined;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${siteConfig.url}${path.startsWith('/') ? '' : '/'}${path}`;
}

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return {
      // `absolute` evita que defaultMetadata.title.template duplique
      // o sufixo da marca (que já está incluído em SEO/page titles).
      title: { absolute: 'Artigo não encontrado | DM2 Contabilidade' },
      robots: { index: false, follow: false },
    };
  }

  const url = `${siteConfig.url}/blog/${post.slug}`;
  const title =
    post.seoTitle ?? `${post.title} | ${siteConfig.name}`;
  const description = post.seoDescription ?? post.excerpt;
  const ogImage = absoluteUrl(post.ogImageUrl ?? post.coverImageUrl);

  return {
    // `absolute` impede a duplicação de "| DM2 Contabilidade" via template.
    title: { absolute: title },
    description,
    alternates: { canonical: post.canonicalUrl ?? url },
    robots: {
      index: post.robotsIndex,
      follow: post.robotsFollow,
    },
    openGraph: {
      type: 'article',
      title: post.ogTitle ?? title,
      description: post.ogDescription ?? description,
      url,
      siteName: siteConfig.name,
      locale: 'pt_BR',
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt ?? post.publishedAt ?? undefined,
      authors: [post.author?.fullName ?? TECHNICAL_REFERENCE.name],
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: post.coverImageAlt ?? post.title,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.ogTitle ?? title,
      description: post.ogDescription ?? description,
    },
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const [faqs, relatedServiceSlugs] = await Promise.all([
    post.faqEnabled ? getPostFaqs(post.id) : Promise.resolve([]),
    getPostRelatedServiceSlugs(post.id),
  ]);

  const url = `${siteConfig.url}/blog/${post.slug}`;
  const longDate = formatLongDate(post.publishedAt);
  const author = post.author;
  const authorName = author?.fullName ?? TECHNICAL_REFERENCE.name;
  const authorRole = author?.roleTitle ?? TECHNICAL_REFERENCE.role;
  const authorBio = author?.bioShort;

  // Resolve a single contextual related service (post.relatedServiceSlug
  // takes precedence; otherwise the first from blog_post_related_services).
  const ctxSlug =
    post.relatedServiceSlug ?? relatedServiceSlugs[0] ?? null;
  const ctxService =
    ctxSlug && (services as Record<string, { slug: ServiceSlug; title: string; metaDescription: string }>)[ctxSlug]
      ? services[ctxSlug as ServiceSlug]
      : null;

  const cover = post.coverImageUrl;
  const coverAlt = post.coverImageAlt ?? post.title;
  const ogImageAbs = absoluteUrl(post.ogImageUrl ?? post.coverImageUrl);

  // Breadcrumbs component prepends "Início" and emits BreadcrumbSchema.
  const breadcrumbs = [
    { label: 'Blog', href: '/blog' },
    { label: post.title },
  ];

  return (
    <>
      {/* Schema markup */}
      <BlogPostingSchema
        url={url}
        headline={post.title}
        description={post.seoDescription ?? post.excerpt}
        image={ogImageAbs ?? null}
        datePublished={post.publishedAt ?? post.createdAt}
        dateModified={post.updatedAt ?? post.publishedAt}
        authorName={authorName}
        authorJobTitle={authorRole}
        keywords={post.secondaryKeywords ?? null}
        articleSection={post.category?.name ?? null}
      />
      {faqs.length > 0 && <FAQSchema faqs={faqs} />}

      {/* Editorial header */}
      <header className="bg-neutral-50 pt-28 md:pt-32 pb-10 md:pb-14">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <Breadcrumbs items={breadcrumbs} />

          {post.category && (
            <p
              className="mt-2 text-[11px] sm:text-xs uppercase tracking-[0.2em] text-gold-600"
              style={{ fontFamily: 'var(--font-label)' }}
            >
              {post.category.name}
            </p>
          )}

          <h1
            className="mt-3 text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-navy-900 tracking-tight leading-[1.15]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {post.title}
          </h1>

          {post.subtitle && (
            <p className="mt-4 text-lg text-neutral-700 leading-relaxed">
              {post.subtitle}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-600">
            <span>
              Por <strong className="text-navy-900">{authorName}</strong>
              {authorRole && <span className="text-neutral-500"> · {authorRole}</span>}
            </span>
            {longDate && (
              <>
                <span aria-hidden="true" className="text-neutral-300">·</span>
                <time dateTime={post.publishedAt ?? undefined}>{longDate}</time>
              </>
            )}
            {post.readTimeMinutes && (
              <>
                <span aria-hidden="true" className="text-neutral-300">·</span>
                <span>{post.readTimeMinutes} min de leitura</span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Cover image — alineada al mismo ancho editorial que header y cuerpo (max-w-3xl) */}
      {cover && (
        <div className="bg-neutral-50">
          <div className="max-w-3xl mx-auto px-5 md:px-8 pb-12 md:pb-16">
            <figure className="relative aspect-[16/9] overflow-hidden rounded-lg bg-neutral-100">
              <Image
                src={cover}
                alt={coverAlt}
                fill
                sizes="(min-width: 768px) 48rem, 100vw"
                className="object-cover"
                priority
              />
            </figure>
          </div>
        </div>
      )}

      {/* Body — override apenas do padding-top para reduzir o ar antes do primeiro H2.
          A portada acima mantém seu padding-bottom intacto; o pb default da Section
          também permanece para preservar o ritmo com a próxima seção. */}
      <Section width="narrow" spacing="default" bg="white" className="!pt-6 md:!pt-8">
        {post.contentHtml ? (
          <article
            className="article-body"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        ) : (
          <p className="text-neutral-600 italic">
            Conteúdo deste artigo em preparação.
          </p>
        )}
      </Section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <Section width="narrow" spacing="default" bg="soft">
          <h2
            className="text-2xl md:text-3xl font-bold text-navy-900 tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Perguntas frequentes
          </h2>
          <p className="mt-3 text-sm text-neutral-600">
            Dúvidas que costumam aparecer sobre este tema.
          </p>

          <ul className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <li
                key={faq.id}
                className="rounded-lg border border-neutral-200 bg-white p-5 md:p-6"
              >
                <details className="group">
                  <summary className="flex cursor-pointer items-start justify-between gap-4 list-none [&::-webkit-details-marker]:hidden">
                    <h3 className="text-base md:text-lg font-semibold text-navy-900 leading-snug">
                      {faq.question}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-navy-800 transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <div className="mt-3 text-[0.95rem] text-neutral-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Author block */}
      <Section width="narrow" spacing="default" bg="white">
        <div className="rounded-lg border border-neutral-200 bg-white p-6 md:p-8">
          <div className="flex items-start gap-5 md:gap-6">
            <div className="hidden sm:flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy-900 text-white">
              <span
                className="text-base font-semibold"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                DM
              </span>
            </div>
            <div className="flex-1">
              <p
                className="text-[11px] uppercase tracking-[0.2em] text-gold-600"
                style={{ fontFamily: 'var(--font-label)' }}
              >
                Sobre o autor
              </p>
              <h2
                className="mt-2 text-xl md:text-2xl font-bold text-navy-900 leading-snug"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {authorName}
              </h2>
              <p className="mt-1 text-sm text-neutral-600">
                {authorRole} pela DM2 Contabilidade
              </p>
              {authorBio && (
                <p className="mt-3 text-sm md:text-[0.95rem] text-neutral-700 leading-relaxed">
                  {authorBio}
                </p>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* Related service CTA */}
      {ctxService && (
        <Section width="narrow" spacing="default" bg="soft">
          <div className="rounded-lg border border-neutral-200 bg-white p-6 md:p-8">
            <p
              className="text-[11px] uppercase tracking-[0.2em] text-gold-600"
              style={{ fontFamily: 'var(--font-label)' }}
            >
              Serviço relacionado
            </p>
            <h2
              className="mt-2 text-xl md:text-2xl font-bold text-navy-900 leading-snug"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {ctxService.title}
            </h2>
            <p className="mt-3 text-sm md:text-[0.95rem] text-neutral-700 leading-relaxed">
              {ctxService.metaDescription}
            </p>
            <Link
              href={`/servicos-contabeis/${ctxService.slug}`}
              className="mt-5 inline-flex items-center text-sm font-semibold text-navy-800 hover:text-gold-600 transition-colors"
            >
              Conhecer o serviço →
            </Link>
          </div>
        </Section>
      )}

      {/* Back to blog */}
      <Section width="narrow" spacing="sm" bg="white">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-semibold text-navy-800 hover:text-gold-600 transition-colors"
        >
          ← Voltar para todos os artigos
        </Link>
      </Section>
    </>
  );
}
