import Image from 'next/image';
import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import {
  BreadcrumbSchema,
  FAQSchema,
  ItemListSchema,
} from '@/components/seo/SchemaMarkup';
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
      {/* Hero institucional com imagem de fundo.
          Família visual do home e /quem-somos (imagem + dual overlay navy
          + texto white + accent gold + hairline gold no bottom), com
          identidade própria para a página de serviços:
          - altura padrão da família (70-80vh), alinhada com o hero de
            consultoria-contabil para padronizar a presença visual dos
            heroes do sistema
          - sem eyebrow (a página é o índice em si, o H1 já basta)
          - texto ancorado ao fundo (mesma família) */}
      <BreadcrumbSchema
        items={[
          { name: 'Início', url: siteConfig.url },
          {
            name: 'Serviços Contábeis',
            url: `${siteConfig.url}/servicos-contabeis`,
          },
        ]}
      />
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden bg-navy-900">
        <Image
          src="/images/photos/servicos-contabeis-em-sao-paulo.webp"
          alt="Vista institucional de São Paulo, contexto urbano onde a DM2 Contabilidade atende empresas em serviços contábeis, tributários e fiscais"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Dual overlay: gradiente vertical para legibilidade do texto
            inferior + tinte navy plana para coesão com a paleta. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/80 to-navy-900/45"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-navy-900/15"
        />

        {/* Breadcrumb ancorado ao topo */}
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
                <li className="text-white/40" aria-hidden="true">
                  ›
                </li>
                <li className="font-medium text-white">Serviços Contábeis</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Bloco de texto institucional, ancorado ao fundo */}
        <div className="relative z-10 w-full pb-14 md:pb-20">
          <div className="max-w-6xl mx-auto px-5 md:px-8">
            <div className="max-w-3xl">
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Serviços Contábeis em São Paulo
              </h1>
              <p className="mt-5 md:mt-6 text-base md:text-lg text-white/85 leading-relaxed max-w-2xl">
                Consultoria contábil, planejamento tributário, gestão fiscal e
                abertura de empresas. Cada serviço pensado para resolver
                necessidades reais de empresas paulistanas, com acompanhamento
                individualizado.
              </p>
              <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
                <Button
                  href="/contato"
                  variant="gold"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Entrar em contato
                </Button>
                <p className="text-sm text-white/75 leading-snug max-w-xs">
                  Análise sem custo. Resposta em 24h úteis.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hairline gold inferior — assinatura visual compartilhada */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/60 to-transparent z-10"
        />
      </section>

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

              {/* Dado-chave: valor em display, label embaixo — evita wraps feos */}
              <div className="mt-6 pt-5 border-t border-[color:var(--color-border-soft)]">
                <p
                  className="text-lg md:text-xl font-bold text-navy-900 tracking-tight leading-none mb-1.5 whitespace-nowrap"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {service.hero.keyFact.value}
                </p>
                <p className="text-xs md:text-[13px] text-neutral-600 leading-snug">
                  {service.hero.keyFact.label}
                </p>
              </div>

              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 group-hover:text-gold-600 transition-colors">
                Conhecer {service.title.toLowerCase()}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
          ))}
        </div>
      </Section>


      {/* Como funciona o atendimento.
          Bloco navy: pausa visual forte dentro da página, depois do grid
          claro de cards de serviço. Cards internas em branco para
          legibilidade alta e leitura premium (mesmo padrão visual da
          ficha técnica em /quem-somos), com sombra sutil para elevação
          sobre o navy. */}
      <Section bg="dark" spacing="default">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <div className="w-10 h-0.5 bg-gold-500 mb-5 rounded-full" />
            <h2
              className="text-2xl md:text-3xl font-bold text-white tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Como funciona o atendimento na DM2 Contabilidade
            </h2>
            <p className="mt-3 text-white/80 leading-relaxed max-w-2xl">
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
                className="bg-white rounded-lg p-6 shadow-lg shadow-black/20"
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
        buttonText="Entrar em contato"
      />
    </>
  );
}
