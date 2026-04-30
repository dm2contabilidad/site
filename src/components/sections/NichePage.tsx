import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { FAQSchema } from '@/components/seo/SchemaMarkup';
import { services } from '@/content/services';
import { nicheList } from '@/content/niches';
import type { Niche } from '@/types/niche';

interface NichePageProps {
  niche: Niche;
}

export function NichePageContent({ niche }: NichePageProps) {
  const relatedServiceData = niche.relatedServices
    .map((s) => services[s])
    .filter(Boolean);

  const otherNiches = nicheList.filter((n) => n.slug !== niche.slug);

  return (
    <>
      {niche.faqs.length > 0 && <FAQSchema faqs={niche.faqs} />}

      <PageHeader
        title={niche.h1}
        subtitle={niche.intro}
        breadcrumbs={[{ label: niche.title }]}
      />

      <Section spacing="lg">
        <div className="max-w-3xl">
          <div className="w-10 h-0.5 bg-gold-500 mb-5 rounded-full" />
          <h2
            className="text-2xl md:text-3xl font-bold text-navy-900 mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            A realidade contábil do seu setor
          </h2>
          <p className="text-neutral-600 leading-relaxed text-[17px]">
            {niche.sections.contexto}
          </p>
        </div>
      </Section>

      <Section bg="soft" spacing="default">
        <div className="max-w-3xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-navy-900 mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Desafios que você enfrenta
          </h2>
          <p className="text-neutral-600 leading-relaxed text-[17px]">
            {niche.sections.desafios}
          </p>
        </div>
      </Section>

      <Section spacing="default">
        <div className="max-w-3xl">
          <div className="w-10 h-0.5 bg-gold-500 mb-5 rounded-full" />
          <h2
            className="text-2xl md:text-3xl font-bold text-navy-900 mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Como a DM2 Contabilidade atende o seu setor
          </h2>
          <p className="text-neutral-600 leading-relaxed text-[17px]">
            {niche.sections.solucao}
          </p>
        </div>
      </Section>

      {relatedServiceData.length > 0 && (
        <Section bg="soft" spacing="default">
          <h2
            className="text-xl md:text-2xl font-bold text-navy-900 mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Serviços que fazem sentido para você
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedServiceData.map((service) => (
              <Card
                key={service.slug}
                href={`/servicos-contabeis/${service.slug}`}
                className="group"
              >
                <h3 className="font-semibold text-navy-900 mb-1 group-hover:text-navy-800 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-neutral-700 line-clamp-2">
                  {service.intro}
                </p>
                <span className="inline-block mt-3 text-xs font-semibold text-navy-800 group-hover:text-gold-600 transition-colors">
                  Conhecer →
                </span>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {niche.faqs.length > 0 && (
        <Section spacing="default">
          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={niche.faqs} />
          </div>
        </Section>
      )}

      {otherNiches.length > 0 && (
        <Section bg="soft" spacing="default">
          <h2
            className="text-xl md:text-2xl font-bold text-navy-900 mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Outras especialidades da DM2 Contabilidade
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherNiches.map((other) => (
              <Link
                key={other.slug}
                href={`/${other.slug}`}
                className="group block p-5 rounded-lg border border-[color:var(--color-border-soft)] bg-white hover:border-navy-800 hover:shadow-md transition-all"
              >
                <p className="font-semibold text-navy-900 mb-1 group-hover:text-navy-800">
                  {other.title}
                </p>
                <span className="inline-block mt-1 text-xs font-semibold text-navy-800 group-hover:text-gold-600 transition-colors">
                  Conhecer especialidade →
                </span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CTAStrip
        title="Precisa de um contador que entenda o seu setor?"
        subtitle="Fale com a DM2 Contabilidade e veja como atendemos sua área específica."
        buttonText="Fale com um especialista"
      />
    </>
  );
}
