import { notFound } from 'next/navigation';
import { createMetadata } from '@/lib/metadata';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { FAQSchema, ServiceSchema } from '@/components/seo/SchemaMarkup';
import { services, serviceSlugs } from '@/content/services';
import type { ServiceSlug } from '@/types/service';

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services[slug as ServiceSlug];
  if (!service) return {};

  return createMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/servicos-contabeis/${slug}`,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services[slug as ServiceSlug];
  if (!service) notFound();

  const relatedServiceData = service.relatedServices
    .map((s) => services[s])
    .filter(Boolean);

  return (
    <>
      <ServiceSchema
        name={service.title}
        description={service.intro}
        serviceType={service.title}
      />
      {service.faqs.length > 0 && <FAQSchema faqs={service.faqs} />}

      <PageHeader
        title={service.h1}
        subtitle={service.intro}
        breadcrumbs={[
          { label: 'Serviços Contábeis', href: '/servicos-contabeis' },
          { label: service.title },
        ]}
      />

      {/* Contexto + Problema */}
      <Section spacing="lg">
        <div className="max-w-3xl">
          <div className="space-y-5 text-neutral-600 leading-relaxed text-[17px]">
            <p>{service.sections.contexto}</p>
            <p>{service.sections.problema}</p>
          </div>
        </div>
      </Section>

      {/* Solução + Diferencial */}
      <Section bg="soft" spacing="default">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <h2
              className="text-2xl md:text-3xl font-bold text-navy-900 mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Como a DM2 Contabilidade trabalha
            </h2>
            <p className="text-neutral-600 leading-relaxed text-[17px]">
              {service.sections.solucao}
            </p>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 border border-neutral-200">
              <div className="w-10 h-0.5 bg-gold-500 mb-4 rounded-full" />
              <h3 className="text-lg font-semibold text-navy-900 mb-3">
                Por que a DM2 Contabilidade
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {service.sections.diferencial}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Processo */}
      {service.processo.length > 0 && (
        <Section spacing="default">
          <h2
            className="text-2xl md:text-3xl font-bold text-navy-900 mb-10"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Como funciona
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.processo.map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span
                  className="shrink-0 w-9 h-9 rounded-full bg-navy-800 text-white flex items-center justify-center text-sm font-bold"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {i + 1}
                </span>
                <p className="text-neutral-700 text-sm leading-relaxed pt-1.5">{step}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* FAQ */}
      {service.faqs.length > 0 && (
        <Section bg="soft" spacing="default">
          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={service.faqs} />
          </div>
        </Section>
      )}

      {/* Serviços relacionados */}
      {relatedServiceData.length > 0 && (
        <Section spacing="default">
          <h2
            className="text-xl font-bold text-navy-900 mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Serviços relacionados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedServiceData.map((related) => (
              <Card key={related.slug} href={`/servicos-contabeis/${related.slug}`}>
                <h3 className="font-semibold text-navy-900 mb-1">{related.title}</h3>
                <p className="text-xs text-neutral-500 line-clamp-2">{related.intro}</p>
              </Card>
            ))}
          </div>
        </Section>
      )}

      <CTAStrip
        title={`Precisa de ${service.title.toLowerCase()}?`}
        subtitle="Fale com a DM2 Contabilidade e descubra como podemos ajudar."
        buttonText="Fale com um contador"
      />
    </>
  );
}
