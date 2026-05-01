import Image from 'next/image';
import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { Section } from '@/components/layout/Section';
import { BlogCard } from '@/components/blog/BlogCard';
import {
  BreadcrumbSchema,
  ItemListSchema,
} from '@/components/seo/SchemaMarkup';
import {
  countPublishedPosts,
  getActiveCategories,
  getFeaturedPosts,
  getPublishedPosts,
} from '@/lib/blog/queries';
import type { BlogCategorySlug, BlogPost } from '@/types/blog';
import { Badge } from '@/components/ui/Badge';
import { siteConfig } from '@/content/site';

export const metadata = createMetadata({
  title: 'Blog de Contabilidade em São Paulo | DM2 Contabilidade',
  description:
    'Artigos sobre contabilidade, tributação, abertura de empresas e gestão financeira. Conteúdo prático e atualizado pela equipe da DM2 Contabilidade em São Paulo.',
  path: '/blog',
});

const PER_PAGE_OPTIONS = [12, 24, 48] as const;
const DEFAULT_PER_PAGE = 12;
type PerPage = (typeof PER_PAGE_OPTIONS)[number];

function isPerPage(n: number): n is PerPage {
  return (PER_PAGE_OPTIONS as readonly number[]).includes(n);
}

function parsePerPage(raw: string | string[] | undefined): PerPage {
  const v = Array.isArray(raw) ? raw[0] : raw;
  if (!v) return DEFAULT_PER_PAGE;
  const n = Number.parseInt(v, 10);
  return isPerPage(n) ? n : DEFAULT_PER_PAGE;
}

function parsePage(raw: string | string[] | undefined): number {
  const v = Array.isArray(raw) ? raw[0] : raw;
  if (!v) return 1;
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) && n >= 1 ? n : 1;
}

function parseCategoria(
  raw: string | string[] | undefined,
  validSlugs: ReadonlySet<string>,
): BlogCategorySlug | undefined {
  const v = Array.isArray(raw) ? raw[0] : raw;
  if (!v || !validSlugs.has(v)) return undefined;
  return v as BlogCategorySlug;
}

function buildHref(opts: {
  categoria?: BlogCategorySlug;
  pagina?: number;
  porPagina?: PerPage;
}): string {
  const sp = new URLSearchParams();
  if (opts.categoria) sp.set('categoria', opts.categoria);
  if (opts.porPagina && opts.porPagina !== DEFAULT_PER_PAGE) {
    sp.set('por_pagina', String(opts.porPagina));
  }
  if (opts.pagina && opts.pagina > 1) {
    sp.set('pagina', String(opts.pagina));
  }
  const qs = sp.toString();
  return qs ? `/blog?${qs}` : '/blog';
}

interface BlogPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const sp = await searchParams;
  const categories = await getActiveCategories();
  const validSlugs = new Set(categories.map((c) => c.slug));

  const categoria = parseCategoria(sp.categoria, validSlugs);
  const porPagina = parsePerPage(sp.por_pagina);
  let pagina = parsePage(sp.pagina);

  const total = await countPublishedPosts({ categorySlug: categoria });
  const totalPages = Math.max(1, Math.ceil(total / porPagina));
  if (pagina > totalPages) pagina = totalPages;

  // Featured row only on the unfiltered first page — keeps the editorial
  // hierarchy meaningful (no featured drift across paginated views).
  const showFeaturedRow = !categoria && pagina === 1;
  const featuredPosts: BlogPost[] = showFeaturedRow
    ? await getFeaturedPosts(2)
    : [];
  const featuredIds = new Set(featuredPosts.map((p) => p.id));

  // Fetch slightly more on page 1 so the grid can drop the featured ids
  // and still fill `porPagina` cards.
  const fetchLimit = showFeaturedRow ? porPagina + featuredPosts.length : porPagina;
  const fetched = await getPublishedPosts({
    limit: fetchLimit,
    offset: (pagina - 1) * porPagina,
    categorySlug: categoria,
  });
  const posts = fetched.filter((p) => !featuredIds.has(p.id)).slice(0, porPagina);

  // For the ItemList schema, enumerate the full visible set (featured + grid).
  const visiblePosts = [...featuredPosts, ...posts];

  const activeCategory = categoria
    ? categories.find((c) => c.slug === categoria)
    : null;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Início', url: siteConfig.url },
          { name: 'Blog', url: `${siteConfig.url}/blog` },
        ]}
      />

      {/* ItemList schema: helps search engines and AI understand the listing
          as an enumerated set of articles, not generic page content. */}
      {visiblePosts.length > 0 && (
        <ItemListSchema
          itemType="Article"
          items={visiblePosts.map((p) => ({
            name: p.title,
            url: `${siteConfig.url}/blog/${p.slug}`,
            description: p.excerpt,
          }))}
        />
      )}

      {/* Editorial hero with Ibirapuera background.
          Padronizado com a família visual dos heroes do sistema (referência:
          consultoria-contabil): altura 70-80vh, breadcrumb ancorado ao topo
          via absolute, conteúdo ancorado ao fundo via flex items-end +
          pb-14/20, mesmas distâncias entre overline / H1 / subtítulo.
          Overlay e imagem mantidos como estavam. */}
      <header className="relative min-h-[70vh] md:min-h-[80vh] flex items-center isolate overflow-hidden bg-navy-900 text-white">
        <Image
          src="/images/blog/blog-header-ibirapuera.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        {/* Dual overlay: dark gradient + navy color tint for legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-navy-900/85 via-navy-900/65 to-navy-900/80"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-navy-900/35"
        />

        {/* Breadcrumb dark inline ancorado ao topo */}
        <div className="absolute top-0 left-0 right-0 z-10 pt-28 md:pt-32">
          <div className="max-w-6xl mx-auto px-5 md:px-8">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-1.5 text-sm text-white/70">
                <li>
                  <Link
                    href="/"
                    className="transition-colors hover:text-white"
                  >
                    Início
                  </Link>
                </li>
                <li className="text-white/40" aria-hidden="true">›</li>
                <li className="font-medium text-white">Blog</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Bloco de texto institucional, alinhado à esquerda e
            centralizado verticalmente dentro do hero. Sem pb — o flex
            items-center do <header> cuida do espaçamento simétrico em
            cima e embaixo. */}
        <div className="relative z-10 w-full">
          <div className="max-w-6xl mx-auto px-5 md:px-8">
            <p
              className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-gold-400 mb-5 md:mb-6"
              style={{ fontFamily: 'var(--font-label)' }}
            >
              Blog DM2 Contabilidade
            </p>

            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] max-w-3xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Blog de Contabilidade
            </h1>

            <p className="mt-5 md:mt-6 text-base md:text-lg text-white/85 leading-relaxed max-w-2xl">
              Análises técnicas e atualizações para empresas em São Paulo.
            </p>
          </div>
        </div>
      </header>

      {/* Featured row — only on the unfiltered first page.
          Two visually larger cards above the filters, so the reader
          meets content first and only then enters category exploration. */}
      {featuredPosts.length > 0 && (
        <Section spacing="default" bg="white">
          <p
            className="mb-6 text-[11px] sm:text-xs uppercase tracking-[0.22em] text-gold-600"
            style={{ fontFamily: 'var(--font-label)' }}
          >
            Em destaque
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {featuredPosts.map((post, idx) => (
              <FeaturedBlogCard
                key={post.id}
                post={post}
                priority={idx < 2}
              />
            ))}
          </div>
        </Section>
      )}

      {/* Filtros de categoría — debajo de los destacados */}
      <Section spacing="sm" bg="soft">
        <nav aria-label="Filtrar por categoria">
          <ul className="flex flex-wrap gap-2">
            <li>
              <Link
                href={buildHref({ porPagina })}
                className={[
                  'inline-block rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                  !categoria
                    ? 'border-navy-900 bg-navy-900 text-white'
                    : 'border-neutral-300 bg-white text-neutral-700 hover:border-navy-400 hover:text-navy-900',
                ].join(' ')}
                aria-current={!categoria ? 'page' : undefined}
              >
                Todos
              </Link>
            </li>
            {categories.map((cat) => {
              const isActive = cat.slug === categoria;
              return (
                <li key={cat.slug}>
                  <Link
                    href={buildHref({ categoria: cat.slug, porPagina })}
                    className={[
                      'inline-block rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'border-navy-900 bg-navy-900 text-white'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:border-navy-300 hover:bg-neutral-50',
                    ].join(' ')}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {cat.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Section>

      {/* Grid de artículos. Cuando ya hay destacados arriba y el grid
          quedaría vacío (caso extremo: todos los posts son featured),
          escondemos completamente esta sección para no mostrar un estado
          vacío engañoso. */}
      {(posts.length > 0 || featuredPosts.length === 0) && (
        <Section spacing="default" bg="soft">
          {posts.length === 0 ? (
            <div className="rounded-lg border border-dashed border-neutral-300 bg-white p-10 text-center">
              <p className="text-neutral-700">
                {activeCategory
                  ? `Ainda não temos artigos publicados na categoria "${activeCategory.name}".`
                  : 'Ainda não há artigos publicados.'}
              </p>
              {activeCategory && (
                <p className="mt-3 text-sm text-neutral-500">
                  <Link
                    href={buildHref({ porPagina })}
                    className="text-navy-800 underline hover:text-navy-900"
                  >
                    Ver todos os artigos
                  </Link>
                </p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, idx) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  priority={pagina === 1 && idx < 3 && featuredPosts.length === 0}
                />
              ))}
            </div>
          )}

        {/* Footer da grilla: paginação + selector por página, no final */}
        {posts.length > 0 && (
          <div className="mt-12 flex flex-col items-center gap-6">
            {totalPages > 1 && (
              <Pagination
                page={pagina}
                totalPages={totalPages}
                buildHref={(p) => buildHref({ categoria, porPagina, pagina: p })}
              />
            )}

            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <span>Por página:</span>
              <ul className="flex items-center gap-1">
                {PER_PAGE_OPTIONS.map((opt) => {
                  const isActive = opt === porPagina;
                  return (
                    <li key={opt}>
                      <Link
                        href={buildHref({ categoria, porPagina: opt })}
                        className={[
                          'inline-block min-w-[2.25rem] rounded-md border px-2 py-1 text-center transition-colors',
                          isActive
                            ? 'border-navy-900 bg-navy-900 font-medium text-white'
                            : 'border-neutral-200 bg-white text-neutral-700 hover:border-navy-300 hover:bg-neutral-50',
                        ].join(' ')}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {opt}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
        </Section>
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// FeaturedBlogCard — larger editorial card for the top featured row.
// Visual differences vs BlogCard:
//   - Image aspect 16:9 (more cinematic) and full-bleed at the top
//   - Title in display font, larger leading
//   - Excerpt without line-clamp on desktop, 4-line clamp on mobile
//   - Slightly more padding and a subtle gold hairline on hover
// ---------------------------------------------------------------------------

const featuredDateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

function formatFeaturedDate(iso: string | null | undefined): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return featuredDateFormatter.format(d);
}

interface FeaturedBlogCardProps {
  post: BlogPost;
  priority?: boolean;
}

function FeaturedBlogCard({ post, priority = false }: FeaturedBlogCardProps) {
  const href = `/blog/${post.slug}`;
  const date = formatFeaturedDate(post.publishedAt);
  const categoryName = post.category?.name ?? 'Geral';
  const cover = post.coverImageUrl;
  const coverAlt = post.coverImageAlt ?? post.title;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-300 hover:shadow-lg">
      <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
        {cover ? (
          <Image
            src={cover}
            alt={coverAlt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            priority={priority}
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-100"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <Badge className="mb-4 self-start">{categoryName}</Badge>

        <h2
          className="mb-3 text-xl md:text-[1.375rem] font-semibold leading-snug text-neutral-900 transition-colors group-hover:text-navy-800"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <Link href={href} className="relative after:absolute after:inset-0">
            {post.title}
          </Link>
        </h2>

        <p className="mb-5 line-clamp-3 text-[15px] leading-relaxed text-neutral-600 md:line-clamp-4">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center gap-3 text-xs text-neutral-500">
          {date && <time dateTime={post.publishedAt ?? undefined}>{date}</time>}
          {post.readTimeMinutes && (
            <>
              <span aria-hidden="true">·</span>
              <span>{post.readTimeMinutes} min de leitura</span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------

interface PaginationProps {
  page: number;
  totalPages: number;
  buildHref: (page: number) => string;
}

function Pagination({ page, totalPages, buildHref }: PaginationProps) {
  const pages = paginationRange(page, totalPages);
  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  return (
    <nav
      aria-label="Paginação"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      <PaginationLink
        href={buildHref(page - 1)}
        disabled={prevDisabled}
        ariaLabel="Página anterior"
      >
        <span aria-hidden="true">‹</span>
        <span className="ml-1 hidden sm:inline">Anterior</span>
      </PaginationLink>

      <ul className="flex items-center gap-1">
        {pages.map((p, i) =>
          p === 'ellipsis' ? (
            <li
              key={`e-${i}`}
              aria-hidden="true"
              className="px-2 text-sm text-neutral-400"
            >
              …
            </li>
          ) : (
            <li key={p}>
              <Link
                href={buildHref(p)}
                aria-current={p === page ? 'page' : undefined}
                className={[
                  'inline-block min-w-[2.5rem] rounded-md border px-3 py-1.5 text-center text-sm transition-colors',
                  p === page
                    ? 'border-navy-900 bg-navy-900 font-medium text-white'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:border-navy-300 hover:bg-neutral-50',
                ].join(' ')}
              >
                {p}
              </Link>
            </li>
          ),
        )}
      </ul>

      <PaginationLink
        href={buildHref(page + 1)}
        disabled={nextDisabled}
        ariaLabel="Próxima página"
      >
        <span className="mr-1 hidden sm:inline">Próxima</span>
        <span aria-hidden="true">›</span>
      </PaginationLink>
    </nav>
  );
}

interface PaginationLinkProps {
  href: string;
  disabled: boolean;
  ariaLabel: string;
  children: React.ReactNode;
}

function PaginationLink({
  href,
  disabled,
  ariaLabel,
  children,
}: PaginationLinkProps) {
  if (disabled) {
    return (
      <span
        aria-disabled="true"
        aria-label={ariaLabel}
        className="inline-flex items-center rounded-md border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-sm text-neutral-400"
      >
        {children}
      </span>
    );
  }
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className="inline-flex items-center rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-700 transition-colors hover:border-navy-300 hover:bg-neutral-50"
    >
      {children}
    </Link>
  );
}

/**
 * Returns a compact list of page numbers with ellipsis markers.
 * Always shows first and last; current ±1; ellipses fill the rest.
 *   1  ·  …  ·  4  5  6  ·  …  ·  20
 */
function paginationRange(
  current: number,
  total: number,
): Array<number | 'ellipsis'> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const out: Array<number | 'ellipsis'> = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) out.push('ellipsis');
  for (let p = start; p <= end; p++) out.push(p);
  if (end < total - 1) out.push('ellipsis');
  out.push(total);
  return out;
}
