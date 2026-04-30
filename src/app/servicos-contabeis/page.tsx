import { createMetadata } from '@/lib/metadata';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceList.map((service) => (
            <Card
              key={service.slug}
              href={`/servicos-contabeis/${service.slug}`}
              padding="lg"
              accent
              className="group"
            >
              <h2 className="text-xl font-semibold text-navy-900 mb-3">
                {service.title}
              </h2>
              <p className="text-sm text-neutral-700 leading-relaxed">
                {service.intro.split('. ').slice(0, 2).join('. ')}.
              </p>
              <span className="inline-block mt-4 text-sm font-semibold text-navy-800 group-hover:text-gold-600 transition-colors">
                Conhecer {service.title.toLowerCase()} →
              </span>
            </Card>
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
        subtitle="Conte rapidamente sobre sua empresa. A DM2 Contabilidade indica o caminho sem compromisso."
        buttonText="Fale com a DM2 Contabilidade"
      />
    </>
  );
}
