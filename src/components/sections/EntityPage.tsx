import Link from 'next/link';
import Image from 'next/image';
import { Section } from '@/components/layout/Section';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { FAQSchema, ServiceSchema } from '@/components/seo/SchemaMarkup';
import { services } from '@/content/services';
import { niches } from '@/content/niches';
import { getPostsBySlugs } from '@/lib/blog/queries';
import type { Service } from '@/types/service';
import type { Niche, NicheSlug } from '@/types/niche';
import type { ServiceSlug } from '@/types/service';

type EntityPageProps =
  | { kind: 'service'; entity: Service }
  | { kind: 'niche'; entity: Niche };

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

function formatDate(iso: string | null | undefined): string {
  if (!iso) return '';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : dateFormatter.format(d);
}

export async function EntityPage(props: EntityPageProps) {
  const { kind, entity } = props;

  // Normalize shape across Service and Niche
  const context = entity.sections.contexto;
  const problem =
    kind === 'service' ? entity.sections.problema : entity.sections.desafios;
  const approach = entity.sections.solucao;
  const differential =
    kind === 'service' ? entity.sections.diferencial : entity.diferencial;

  const headings =
    kind === 'service'
      ? {
          contextH2: 'O contexto',
          stakesH2: 'O que está em jogo',
          approachH2: 'Como a DM2 Contabilidade atua',
          processH2: 'Como funciona',
          relatedNichesH2: 'Para quem este serviço faz mais diferença',
        }
      : {
          contextH2: 'Sua realidade',
          stakesH2: 'O que está em jogo',
          approachH2: 'Como a DM2 Contabilidade atende o seu setor',
          processH2: 'Como conduzimos o trabalho',
          relatedNichesH2: '',
        };

  const breadcrumbs =
    kind === 'service'
      ? [
          { label: 'Serviços Contábeis', href: '/servicos-contabeis' },
          { label: entity.title },
        ]
      : [{ label: entity.title }];

  // Resolve related entities
  const relatedServiceData = entity.relatedServices
    .map((s) => services[s])
    .filter(Boolean);
  const relatedNicheData =
    kind === 'service'
      ? entity.relatedNiches
          .map((slug) => niches[slug as NicheSlug])
          .filter(Boolean)
      : [];
  const relatedPosts = await getPostsBySlugs(entity.relatedPosts);

  return (
    <>
      {/* SCHEMA */}
      <ServiceSchema
        name={entity.title}
        description={entity.intro}
        serviceType={entity.title}
      />
      {entity.faqs.length > 0 && <FAQSchema faqs={entity.faqs} />}

      {/* 1 — HERO COMERCIAL */}
      <section className="relative bg-white pt-28 md:pt-32 pb-14 md:pb-20 overflow-hidden">
        {/* sutil acento de profundidad navy a la derecha */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-navy-50/60 to-transparent pointer-events-none"
        />
        <div className="relative max-w-6xl mx-auto px-5 md:px-8">
          <Breadcrumbs items={breadcrumbs} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* COL ESQUERDA — copy + CTA */}
            <div className="lg:col-span-7">
              <p
                className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-gold-600 mb-4"
                style={{ fontFamily: 'var(--font-label)' }}
              >
                {entity.hero.eyebrow}
              </p>
              <h1
                className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.25rem] font-bold text-navy-900 tracking-tight leading-[1.1]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {entity.h1}
              </h1>
              <p className="mt-5 md:mt-6 text-[17px] md:text-lg text-neutral-700 leading-relaxed max-w-2xl">
                {entity.hero.subtitle}
              </p>

              <div className="mt-7 md:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
                <Button href="/contato" variant="gold" size="lg" className="w-full sm:w-auto">
                  {entity.hero.cta.text}
                </Button>
                <p className="text-sm text-neutral-600 leading-snug max-w-xs">
                  {entity.hero.cta.promise}
                </p>
              </div>
            </div>

            {/* COL DIREITA — keyFact card */}
            <aside className="lg:col-span-5 lg:pl-4">
              <div className="relative bg-navy-900 text-white rounded-lg p-7 md:p-8 lg:p-9 overflow-hidden">
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-70"
                />
                <p
                  className="text-[10px] uppercase tracking-[0.22em] text-gold-500 mb-3"
                  style={{ fontFamily: 'var(--font-label)' }}
                >
                  Dado-chave
                </p>
                <p
                  className="text-[2.5rem] md:text-[3rem] font-bold text-white leading-none tracking-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {entity.hero.keyFact.value}
                </p>
                <p className="mt-3 text-sm md:text-[15px] text-white/80 leading-relaxed">
                  {entity.hero.keyFact.label}
                </p>
              </div>
            </aside>
          </div>
        </div>

        {/* gold faixa abajo */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/55 to-transparent"
        />
      </section>

      {/* 2 — INTRO DENSA (citable por IA, propio bloque) */}
      <Section bg="soft" spacing="default">
        <div className="max-w-3xl">
          <p
            className="text-[11px] uppercase tracking-[0.2em] text-gold-600 mb-4"
            style={{ fontFamily: 'var(--font-label)' }}
          >
            Visão geral
          </p>
          <p className="text-neutral-800 leading-relaxed text-[17px] md:text-lg">
            {entity.intro}
          </p>
        </div>
      </Section>

      {/* 3 — CONTEXTO / PROBLEMA (servicio) | REALIDADE / DESAFIOS (nicho) */}
      <Section spacing="default">
        <div className="max-w-3xl">
          <div className="w-10 h-0.5 bg-gold-500 mb-5 rounded-full" />
          <h2
            className="text-2xl md:text-3xl font-bold text-navy-900 mb-6 tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {headings.contextH2}
          </h2>
          <div className="space-y-5 text-neutral-700 leading-relaxed text-[17px]">
            <p>{context}</p>
            <p>{problem}</p>
          </div>
        </div>
      </Section>

      {/* 4 — O QUE ESTÁ EM JOGO (riesgo, sobrio) */}
      <section className="relative bg-navy-900 text-white">
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-60"
        />
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-20">
          <div className="max-w-2xl mb-10 md:mb-12">
            <p
              className="text-[11px] uppercase tracking-[0.22em] text-gold-500 mb-4"
              style={{ fontFamily: 'var(--font-label)' }}
            >
              Riscos concretos
            </p>
            <h2
              className="text-[1.625rem] sm:text-3xl md:text-[2.25rem] font-bold tracking-tight leading-[1.15]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {headings.stakesH2}
            </h2>
            <p className="mt-4 text-white/75 leading-relaxed text-base md:text-[17px]">
              Sem alarmismo. Apenas o que tipicamente acontece quando esta
              frente fica desassistida.
            </p>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {entity.stakes.map((item) => (
              <li
                key={item.label}
                className="relative bg-white/[0.04] border border-white/10 rounded-lg p-6 md:p-7"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-6 left-0 w-[3px] h-10 bg-gold-500 rounded-r"
                />
                <p
                  className="text-base md:text-lg font-semibold text-white leading-snug mb-3 pl-2"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {item.label}
                </p>
                <p className="text-sm md:text-[15px] text-white/75 leading-relaxed pl-2">
                  {item.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5 — COMO A DM2 CONTABILIDADE ATUA */}
      <Section spacing="default">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
          <div className="lg:col-span-3">
            <div className="w-10 h-0.5 bg-gold-500 mb-5 rounded-full" />
            <h2
              className="text-2xl md:text-3xl font-bold text-navy-900 mb-6 tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {headings.approachH2}
            </h2>
            <p className="text-neutral-700 leading-relaxed text-[17px]">
              {approach}
            </p>
          </div>
          <aside className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 md:p-7 border border-[color:var(--color-border-soft)]">
              <p
                className="text-[10px] uppercase tracking-[0.22em] text-gold-600 mb-3"
                style={{ fontFamily: 'var(--font-label)' }}
              >
                Diferencial DM2 Contabilidade
              </p>
              <p className="text-sm md:text-[15px] text-neutral-700 leading-relaxed">
                {differential}
              </p>
            </div>
          </aside>
        </div>
      </Section>

      {/* 6 — COMO FUNCIONA (processo) */}
      {entity.processo.length > 0 && (
        <Section bg="soft" spacing="default">
          <div className="max-w-2xl mb-10 md:mb-12">
            <p
              className="text-[11px] uppercase tracking-[0.2em] text-gold-600 mb-3"
              style={{ fontFamily: 'var(--font-label)' }}
            >
              Processo
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold text-navy-900 tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {headings.processH2}
            </h2>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {entity.processo.map((step, i) => (
              <li
                key={i}
                className="relative bg-white rounded-lg p-6 border border-[color:var(--color-border-soft)]"
              >
                <span
                  className="block text-3xl md:text-[2.25rem] font-bold text-gold-500 mb-3 leading-none tracking-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-sm md:text-[15px] text-neutral-700 leading-relaxed">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {/* 7 — FAQ */}
      {entity.faqs.length > 0 && (
        <Section spacing="default" width="narrow">
          <div className="max-w-2xl mb-8 md:mb-10">
            <p
              className="text-[11px] uppercase tracking-[0.2em] text-gold-600 mb-3"
              style={{ fontFamily: 'var(--font-label)' }}
            >
              Perguntas frequentes
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold text-navy-900 tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {kind === 'service'
                ? `Sobre ${entity.title.toLowerCase()}`
                : 'Sobre o seu setor'}
            </h2>
          </div>
          <FAQAccordion faqs={entity.faqs} />
        </Section>
      )}

      {/* 8 — RELACIONADOS (serviços + especialidades + posts) */}
      {(relatedServiceData.length > 0 ||
        relatedNicheData.length > 0 ||
        relatedPosts.length > 0) && (
        <Section bg="soft" spacing="default">
          <div className="space-y-12 md:space-y-14">
            {relatedServiceData.length > 0 && (
              <div>
                <h2
                  className="text-xl md:text-2xl font-bold text-navy-900 mb-6 tracking-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {kind === 'service'
                    ? 'Serviços relacionados'
                    : 'Serviços que fazem sentido para o seu setor'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  {relatedServiceData.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/servicos-contabeis/${s.slug}`}
                      className="group relative block bg-white rounded-lg p-5 md:p-6 border border-[color:var(--color-border-soft)] hover:border-navy-800 hover:shadow-md transition-all"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute top-5 left-0 w-[3px] h-9 bg-gold-500 rounded-r"
                      />
                      <h3 className="text-base md:text-lg font-semibold text-navy-900 mb-1.5 leading-snug pl-2">
                        {s.title}
                      </h3>
                      <p className="text-xs md:text-sm text-neutral-700 leading-snug pl-2 line-clamp-2">
                        {s.hero.subtitle}
                      </p>
                      <span className="inline-flex items-center gap-1.5 mt-3 text-xs md:text-sm font-semibold text-navy-800 group-hover:text-gold-600 transition-colors pl-2">
                        Conhecer
                        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {kind === 'service' && relatedNicheData.length > 0 && (
              <div>
                <h2
                  className="text-xl md:text-2xl font-bold text-navy-900 mb-6 tracking-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {headings.relatedNichesH2}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  {relatedNicheData.map((n) => (
                    <Link
                      key={n.slug}
                      href={`/${n.slug}`}
                      className="group relative block bg-white rounded-lg p-5 md:p-6 border border-[color:var(--color-border-soft)] hover:border-navy-800 hover:shadow-md transition-all"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute top-5 left-0 w-[3px] h-9 bg-gold-500 rounded-r"
                      />
                      <h3 className="text-base md:text-lg font-semibold text-navy-900 mb-1.5 leading-snug pl-2">
                        {n.title}
                      </h3>
                      <p className="text-xs md:text-sm text-neutral-700 leading-snug pl-2 line-clamp-2">
                        {n.hero.subtitle}
                      </p>
                      <span className="inline-flex items-center gap-1.5 mt-3 text-xs md:text-sm font-semibold text-navy-800 group-hover:text-gold-600 transition-colors pl-2">
                        Conhecer
                        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {relatedPosts.length > 0 && (
              <div>
                <h2
                  className="text-xl md:text-2xl font-bold text-navy-900 mb-6 tracking-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Leia também
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                  {relatedPosts.map((post) => {
                    const date = formatDate(post.publishedAt);
                    const cat = post.category?.name ?? 'Geral';
                    return (
                      <article
                        key={post.id}
                        className="group relative flex flex-col rounded-lg overflow-hidden bg-white border border-[color:var(--color-border-soft)] hover:border-navy-800 hover:shadow-md transition-all"
                      >
                        <div className="relative aspect-[16/10] bg-navy-50 overflow-hidden">
                          {post.coverImageUrl ? (
                            <Image
                              src={post.coverImageUrl}
                              alt={post.coverImageAlt ?? post.title}
                              fill
                              sizes="(min-width: 768px) 33vw, 100vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                          ) : (
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 flex items-center justify-center"
                            >
                              <div className="w-12 h-0.5 bg-gold-500 rounded-full" />
                            </div>
                          )}
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                          <span
                            className="self-start inline-block px-2.5 py-0.5 rounded-sm text-[10px] font-semibold uppercase tracking-wider bg-navy-50 text-navy-800 mb-3"
                            style={{ fontFamily: 'var(--font-label)' }}
                          >
                            {cat}
                          </span>
                          <h3
                            className="text-[17px] font-bold text-navy-900 leading-snug mb-2 group-hover:text-navy-800 transition-colors"
                            style={{ fontFamily: 'var(--font-display)' }}
                          >
                            <Link
                              href={`/blog/${post.slug}`}
                              className="relative after:absolute after:inset-0"
                            >
                              {post.title}
                            </Link>
                          </h3>
                          <p className="text-[13px] text-neutral-700 leading-relaxed flex-grow line-clamp-3">
                            {post.excerpt}
                          </p>
                          {date && (
                            <p className="mt-4 text-xs text-neutral-500">
                              <time dateTime={post.publishedAt ?? undefined}>{date}</time>
                            </p>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </Section>
      )}

      {/* 9 — CTA FINAL com promessa específica */}
      <CTAStrip
        title={entity.finalCta.title}
        subtitle={entity.finalCta.subtitle}
        buttonText={entity.finalCta.buttonText}
      />
    </>
  );
}
