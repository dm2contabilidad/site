import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/layout/Section';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { FAQSchema, ItemListSchema } from '@/components/seo/SchemaMarkup';
import { serviceList } from '@/content/services';
import { siteConfig } from '@/content/site';

const indexFaqs = [
  {
    question: 'Como escolher o serviço contábil certo para minha empresa?',
    answer:
      'Depende do estágio do negócio e da rotina atual. Empresas em abertura precisam de Abertura e Regularização. Empresas operando com obrigações em dia se beneficiam mais de Consultoria Contábil mensal. Quem ultrapassou o limite do Simples Nacional ou tem dúvidas sobre regime fiscal precisa de Planejamento Tributário. Em caso de dúvida, fazemos uma análise inicial sem compromisso e indicamos o caminho.',
  },
  {
    question: 'Qual a diferença entre contabilidade comum e consultoria contábil?',
    answer:
      'A contabilidade comum entrega obrigações fiscais e gera as guias mensais. A consultoria contábil faz isso mais a análise dos números, alerta sobre prazos, identifica oportunidades de economia tributária e orienta decisões financeiras. Na DM2 Contabilidade todo cliente recebe acompanhamento consultivo, não apenas processamento de documentos.',
  },
  {
    question: 'A DM2 Contabilidade atende empresas em qualquer cidade do Brasil?',
    answer:
      'Atendemos principalmente empresas em São Paulo, com escritório em Vila Mariana. Trabalhamos também com clientes de outras cidades quando a operação permite atendimento remoto eficaz. O contato inicial define se conseguimos atender com a qualidade que esperamos entregar.',
  },
  {
    question: 'Quanto custa um serviço contábil na DM2 Contabilidade?',
    answer:
      'O valor varia conforme o regime tributário, o volume de notas fiscais, a folha de pagamento e a atividade da empresa. Não trabalhamos com tabela fixa porque cada empresa tem rotina diferente. Após a análise inicial, apresentamos uma proposta com escopo claro e valor mensal definido.',
  },
];

export const metadata = createMetadata({
  title: 'Serviços Contábeis em São Paulo',
  description:
    'Conheça os serviços contábeis da DM2 Contabilidade. Consultoria contábil, planejamento tributário, gestão fiscal e abertura de empresas em São Paulo, Vila Mariana.',
  path: '/servicos-contabeis',
});

export default function ServicosContabeisPage() {
  return (
    <>
      <FAQSchema faqs={indexFaqs} />
      <ItemListSchema
        items={serviceList.map((s) => ({
          name: s.title,
          url: `${siteConfig.url}/servicos-contabeis/${s.slug}`,
          description: s.metaDescription,
        }))}
        itemType="Service"
      />
      <PageHeader
        title="Serviços Contábeis em São Paulo"
        subtitle="Consultoria contábil, planejamento tributário, gestão fiscal e abertura de empresas. Cada serviço pensado para resolver necessidades reais de empresas paulistanas, com acompanhamento individualizado."
        breadcrumbs={[{ label: 'Serviços Contábeis' }]}
      />

      <Section spacing="lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {serviceList.map((service) => (
            <Link
              key={service.slug}
              href={`/servicos-contabeis/${service.slug}`}
              className="group relative flex flex-col bg-white rounded-lg border border-[color:var(--color-border-soft)] p-7 md:p-9 hover:border-navy-800 hover:shadow-[0_8px_28px_-12px_rgba(7,71,93,0.18)] transition-all"
            >
              {/* Acento gold superior */}
              <span
                aria-hidden="true"
                className="absolute top-0 left-7 right-7 md:left-9 md:right-9 h-[3px] bg-gold-500 rounded-full"
              />
              <p
                className="text-[10px] uppercase tracking-[0.22em] text-gold-600 mb-3"
                style={{ fontFamily: 'var(--font-label)' }}
              >
                {service.hero.eyebrow}
              </p>
              <h2
                className="text-xl md:text-[1.5rem] font-bold text-navy-900 leading-tight mb-3"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {service.title}
              </h2>
              <p className="text-[15px] md:text-base text-neutral-700 leading-relaxed">
                {service.hero.subtitle}
              </p>

              {/* Dado-chave em chip */}
              <div className="mt-6 pt-5 border-t border-[color:var(--color-border-soft)] flex items-baseline gap-3">
                <span
                  className="text-lg md:text-xl font-bold text-navy-900 tracking-tight leading-none"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {service.hero.keyFact.value}
                </span>
                <span className="text-xs md:text-[13px] text-neutral-600 leading-snug">
                  {service.hero.keyFact.label}
                </span>
              </div>

              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 group-hover:text-gold-600 transition-colors">
                Conhecer {service.title.toLowerCase()}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
          ))}
        </div>
      </Section>


      {/* Como funciona o atendimento */}
      <Section bg="soft" spacing="default">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <div className="w-10 h-0.5 bg-gold-500 mb-5 rounded-full" />
            <h2
              className="text-2xl md:text-3xl font-bold text-navy-900 tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Como funciona o atendimento na DM2 Contabilidade
            </h2>
            <p className="mt-3 text-neutral-700 leading-relaxed max-w-2xl">
              Três etapas simples antes de qualquer cobrança ou compromisso.
              Conversamos primeiro, analisamos depois, e só fechamos quando faz
              sentido para os dois lados.
            </p>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                n: '01',
                title: 'Contato inicial',
                text: 'Você nos conta brevemente sobre a empresa, o momento atual e a dúvida. Respondemos em até 24h úteis com os próximos passos.',
              },
              {
                n: '02',
                title: 'Análise sem custo',
                text: 'Avaliamos a situação contábil e fiscal atual. Identificamos riscos, oportunidades e o que faz sentido para o seu cenário específico.',
              },
              {
                n: '03',
                title: 'Proposta clara',
                text: 'Apresentamos escopo, prazos e valor mensal. Sem letra miúda, sem fidelidade abusiva. Você decide se quer começar.',
              },
            ].map((step) => (
              <li
                key={step.n}
                className="bg-white rounded-lg p-6 border border-[color:var(--color-border-soft)]"
              >
                <p
                  className="text-3xl font-bold text-gold-500 mb-3"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {step.n}
                </p>
                <h3 className="text-base font-semibold text-navy-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* FAQ general */}
      <Section spacing="lg" width="narrow">
        <FAQAccordion faqs={indexFaqs} title="Perguntas frequentes sobre nossos serviços" />
      </Section>

      <CTAStrip
        title="Não sabe por onde começar?"
        subtitle="Conte rapidamente sobre sua empresa. Indicamos por escrito qual frente faz mais sentido para o seu momento. Resposta em 24h úteis."
        buttonText="Fale com a DM2 Contabilidade"
      />
    </>
  );
}
