import Link from 'next/link';
import Image from 'next/image';
import { createMetadata } from '@/lib/metadata';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { CredibilityBar } from '@/components/sections/CredibilityBar';
import { CTAStrip } from '@/components/sections/CTAStrip';
import { LocalBusinessSchema, WebSiteSchema } from '@/components/seo/SchemaMarkup';
import { getFeaturedPosts } from '@/lib/blog/queries';
import type { BlogPost } from '@/types/blog';

const featuredDateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

function formatFeaturedDate(iso: string | null | undefined): string {
  if (!iso) return '';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : featuredDateFormatter.format(d);
}

export const metadata = createMetadata({
  title: 'DM2 Contabilidade | Escritório de Contabilidade em São Paulo',
  description:
    'Escritório de contabilidade em São Paulo, Vila Mariana. Consultoria contábil, planejamento tributário, gestão fiscal e abertura de empresas. Desde 2003.',
  path: '/',
  ogImage: '/images/og/home-og-sao-paulo.webp',
});

const protagonistServices = [
  {
    title: 'Consultoria Contábil',
    text: 'Acompanhamento contábil mensal com análise dos números, alertas de prazo e orientação para decisões que afetam o caixa. Leitura ativa da sua empresa, não só entrega de obrigações.',
    href: '/servicos-contabeis/consultoria-contabil',
    includes: [
      'Escrituração contábil e obrigações acessórias',
      'Análise mensal de DRE e indicadores do negócio',
      'Alertas proativos de prazos e mudanças na legislação',
    ],
  },
  {
    title: 'Planejamento Tributário',
    text: 'Simulação comparativa entre Simples Nacional, Lucro Presumido e Lucro Real com os números reais da empresa. Pagar o que é devido, dentro da lei, sem pagar a mais.',
    href: '/servicos-contabeis/planejamento-tributario',
    includes: [
      'Simulação dos 3 regimes com dados da sua empresa',
      'Análise de fator R, folha e atividade exercida',
      'Recomendação fundamentada por escrito',
    ],
  },
];

const supportServices = [
  {
    title: 'Gestão Fiscal e Tributária',
    text: 'Apuração de impostos, conferência de notas e entrega de obrigações acessórias (SPED, DCTF, DIRF) nos prazos.',
    href: '/servicos-contabeis/gestao-fiscal-e-tributaria',
  },
  {
    title: 'Abertura e Regularização',
    text: 'Do CNPJ à operação: tipo societário, CNAE, regime tributário, inscrições e alvarás em São Paulo.',
    href: '/servicos-contabeis/abertura-e-regularizacao-de-empresas',
  },
];

const niches = [
  {
    label: 'Advogados',
    href: '/contabilidade-para-advogados',
    desc: 'Tributação da advocacia tem regras próprias. Sociedades unipessoais, ISS fixo por profissional em São Paulo, Anexo IV do Simples e distribuição de lucros isentos.',
    tags: ['ISS regime especial', 'Anexo IV', 'SLU'],
  },
  {
    label: 'Profissionais da Saúde',
    href: '/contabilidade-para-profissionais-da-saude',
    desc: 'PJ médica com benefício real. Equiparação hospitalar (Lei 9.249/95) reduz IRPJ a 8% e CSLL a 12%, controle de retenções na fonte e Livro Caixa quando aplicável.',
    tags: ['Equiparação hospitalar', 'Lei 9.249/95', 'PJ médica'],
  },
  {
    label: 'Negócios Digitais',
    href: '/contabilidade-para-negocios-digitais',
    desc: 'Infoprodutores, e-commerce e prestadores online. Hotmart, Eduzz, marketplaces e receitas em moeda estrangeira têm regras específicas de tributação e enquadramento.',
    tags: ['Infoprodutos', 'Receita PJ exterior', 'Marketplaces'],
  },
];

export default async function HomePage() {
  const featuredPosts = await getFeaturedPosts(3);

  return (
    <>
      <LocalBusinessSchema />
      <WebSiteSchema />

      {/* ── HERO ── presença institucional, sem decoração de template */}
      <section className="relative min-h-[80vh] md:min-h-[88vh] lg:min-h-[92vh] flex items-end overflow-hidden">
        <Image
          src="/images/photos/sao-paulo-skyline-dm2-contabilidade.webp"
          alt="Vista do skyline de São Paulo com a Ponte Octávio Frias de Oliveira, representando a atuação da DM2 Contabilidade na capital paulista"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/85 to-navy-900/40" />

        <div className="relative z-10 w-full pt-32 sm:pt-36 md:pt-40 pb-16 md:pb-24">
          <div className="max-w-6xl mx-auto px-5 md:px-8">
            <div className="max-w-3xl">
              <p
                className="text-[11px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.25em] text-gold-500 mb-5 md:mb-6"
                style={{ fontFamily: 'var(--font-label)' }}
              >
                Escritório de contabilidade
              </p>
              <h1
                className="text-[2rem] sm:text-[2.625rem] md:text-[3.25rem] lg:text-[3.75rem] font-bold text-white tracking-tight leading-[1.1]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Escritório de contabilidade{' '}
                <span className="text-gold-500">em São Paulo</span>
              </h1>
              <p className="mt-5 md:mt-7 text-base sm:text-lg md:text-xl text-white/85 leading-relaxed max-w-2xl">
                Desde 2003, a DM2 Contabilidade acompanha empresas em São Paulo
                com orientação contábil, tributária e fiscal, com atendimento
                próximo, técnico e sem processamento em massa.
              </p>
              <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  href="/contato"
                  variant="gold"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Fale com um contador
                </Button>
                <Button
                  href="/servicos-contabeis"
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto border-white/50 text-white hover:bg-white/10 hover:border-white"
                >
                  Nossos serviços
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/60 to-transparent z-10" />
      </section>

      {/* ── BARRA DE CREDIBILIDADE ── pulso denso pós-hero */}
      <CredibilityBar
        stats={[
          { value: 'Desde 2003', label: 'Atuação em São Paulo' },
          { value: 'Vila Mariana', label: 'Escritório próprio' },
          { value: 'Consultiva', label: 'Contabilidade orientada' },
          { value: 'Seg a Sex', label: '8h30 às 17h30' },
        ]}
      />

      {/* ── SERVIÇOS CONTÁBEIS ── 4 cards no mesmo sistema visual */}
      <Section spacing="lg">
        <div className="max-w-2xl mb-10 md:mb-14">
          <p
            className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-gold-600 mb-3"
            style={{ fontFamily: 'var(--font-label)' }}
          >
            Serviços contábeis
          </p>
          <h2
            className="text-[1.625rem] sm:text-3xl md:text-[2.5rem] font-bold text-navy-900 tracking-tight leading-[1.15] md:leading-[1.1]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            O que entregamos para empresas em São Paulo
          </h2>
          <p className="mt-4 md:mt-5 text-neutral-700 leading-relaxed text-base md:text-[17px]">
            Quatro frentes que cobrem o ciclo completo: análise consultiva,
            estratégia tributária, rotina fiscal e abertura de empresas.
          </p>
        </div>

        {/* TOP — 2 protagonistas: vertical, densos, com lista 'Inclui' */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-5 md:mb-6">
          {protagonistServices.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group relative flex flex-col bg-white rounded-lg border border-[color:var(--color-border-soft)] p-7 md:p-9 hover:border-navy-800 hover:shadow-[0_8px_28px_-12px_rgba(7,71,93,0.18)] transition-all"
            >
              {/* Acento gold superior */}
              <span
                aria-hidden="true"
                className="absolute top-0 left-7 right-7 md:left-9 md:right-9 h-[3px] bg-gold-500 rounded-full"
              />
              <h3
                className="text-xl md:text-2xl lg:text-[1.625rem] font-bold text-navy-900 leading-tight mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {service.title}
              </h3>
              <p className="text-[15px] md:text-base text-neutral-700 leading-relaxed">
                {service.text}
              </p>

              {/* Lista 'Inclui' — refuerza densidad técnica e GEO */}
              <div className="mt-6 pt-6 border-t border-[color:var(--color-border-soft)]">
                <p
                  className="text-[10px] uppercase tracking-[0.18em] text-gold-600 mb-3 font-semibold"
                  style={{ fontFamily: 'var(--font-label)' }}
                >
                  Inclui
                </p>
                <ul className="space-y-2 text-sm text-neutral-700">
                  {service.includes.map((item) => (
                    <li key={item} className="flex gap-2.5 leading-snug">
                      <span
                        aria-hidden="true"
                        className="shrink-0 mt-[7px] w-1 h-1 rounded-full bg-gold-500"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 group-hover:text-gold-600 transition-colors">
                Conhecer {service.title.toLowerCase()}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
          ))}
        </div>

        {/* BOTTOM — 2 soporte: horizontal, compactos, acento gold lateral (mismo elemento, distinta orientación) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {supportServices.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group relative flex items-start gap-5 bg-white rounded-lg border border-[color:var(--color-border-soft)] p-5 md:p-6 hover:border-navy-800 hover:shadow-[0_8px_28px_-12px_rgba(7,71,93,0.18)] transition-all overflow-hidden"
            >
              {/* Acento gold lateral — mismo lenguaje que el superior, rotado */}
              <span
                aria-hidden="true"
                className="absolute top-5 bottom-5 left-0 w-[3px] bg-gold-500 rounded-full"
              />
              <div className="flex-grow min-w-0 pl-1">
                <h3 className="text-base md:text-lg font-semibold text-navy-900 leading-snug mb-1">
                  {service.title}
                </h3>
                <p className="text-sm text-neutral-700 leading-snug">
                  {service.text}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="shrink-0 mt-1 text-navy-800 group-hover:text-gold-600 transition-all group-hover:translate-x-0.5 text-lg"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* ── MANIFESTO INSTITUCIONAL ── bloco dark navy + foto real do escritório */}
      <section className="relative bg-navy-900 text-white overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-60"
        />
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24 lg:py-28">
          {/* Top row: copy + foto real */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <p
                className="text-[11px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.25em] text-gold-500 mb-5 md:mb-6"
                style={{ fontFamily: 'var(--font-label)' }}
              >
                A diferença que importa
              </p>
              <h2
                className="text-[1.75rem] sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] md:leading-[1.1]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                A maioria dos escritórios processa documentos.{' '}
                <span className="text-gold-500">A DM2 Contabilidade orienta.</span>
              </h2>
              <div className="mt-6 md:mt-8 space-y-4 md:space-y-5 text-white/85 leading-relaxed text-base md:text-[17px] max-w-2xl">
                <p>
                  Revisamos enquadramento tributário, antecipamos mudanças na
                  legislação e avisamos antes que um prazo vire multa. Cada
                  cliente é acompanhado por nome, não por número de processo.
                </p>
                <p>
                  Estamos em Vila Mariana desde 2003. Já passamos por reforma
                  tributária, eSocial, SPED, mudanças no Simples Nacional e
                  diferentes ciclos econômicos. A experiência se traduz em
                  decisões mais informadas para a sua empresa.
                </p>
              </div>
              <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  href="/quem-somos"
                  variant="gold"
                  className="w-full sm:w-auto"
                >
                  Conheça a DM2 Contabilidade
                </Button>
                <Button
                  href="/servicos-contabeis"
                  variant="secondary"
                  className="w-full sm:w-auto border-white/50 text-white hover:bg-white/10 hover:border-white"
                >
                  Ver serviços
                </Button>
              </div>
            </div>

            {/* Imagem ilustrativa — ambiente corporativo, com fade lateral hacia el bloque navy */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[16/10] sm:aspect-[3/2] lg:aspect-[4/5] rounded-lg overflow-hidden">
                <Image
                  src="/images/photos/escritorio-dm2-vila-mariana.webp"
                  alt="Ambiente corporativo de escritório com estações de trabalho e vista para a cidade. Imagem ilustrativa."
                  fill
                  sizes="(min-width: 1024px) 480px, 100vw"
                  quality={82}
                  className="object-cover"
                />
                {/* Tonalização sutil para domar luzes altas e manter coerência cromática */}
                <div aria-hidden="true" className="absolute inset-0 bg-navy-900/15" />
                {/* Fade lateral esquerdo — fusiona la foto con el bloque navy */}
                <div
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-navy-900 via-navy-900/60 to-transparent"
                />
                {/* Fade vertical inferior — fusión con el footer del bloque */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-navy-900/70 to-transparent"
                />
                {/* Línea acento gold inferior */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/70 to-transparent"
                />
              </div>
            </div>
          </div>

          {/* Pilares — fila horizontal con divider sutil arriba */}
          <div className="mt-12 md:mt-20 pt-10 md:pt-12 border-t border-white/10">
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-10">
              {[
                {
                  n: '01',
                  title: 'Atuação consultiva',
                  text: 'A contabilidade serve para orientar decisões, não só cumprir obrigações.',
                },
                {
                  n: '02',
                  title: 'Atenção individualizada',
                  text: 'Cada cliente tem rotina própria. Nada processado em lote, em massa ou por automação cega.',
                },
                {
                  n: '03',
                  title: 'Responsabilidade técnica',
                  text: 'Análise revisada internamente. Em escritório registrado no CRC-SP, sem terceirização técnica.',
                },
              ].map((p) => (
                <li key={p.n} className="flex gap-5">
                  <span
                    className="shrink-0 text-gold-500 text-2xl font-bold tracking-tight pt-0.5"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {p.n}
                  </span>
                  <div>
                    <p className="font-semibold text-white text-base mb-1.5">
                      {p.title}
                    </p>
                    <p className="text-sm text-white/70 leading-relaxed">
                      {p.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── ESPECIALIDADES ── cards com peso real, dados técnicos */}
      <Section spacing="lg">
        <div className="max-w-2xl mb-10 md:mb-14">
          <p
            className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-gold-600 mb-3"
            style={{ fontFamily: 'var(--font-label)' }}
          >
            Especialidades por setor
          </p>
          <h2
            className="text-[1.625rem] sm:text-3xl md:text-[2.5rem] font-bold text-navy-900 tracking-tight leading-[1.15] md:leading-[1.1]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Setores que exigem contador especialista
          </h2>
          <p className="mt-4 md:mt-5 text-neutral-700 leading-relaxed text-base md:text-[17px]">
            Alguns setores têm regras tributárias próprias. Atender bem exige
            conhecimento técnico específico, não generalista.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {niches.map((niche) => (
            <Link
              key={niche.href}
              href={niche.href}
              className="group flex flex-col p-6 md:p-7 rounded-lg border border-[color:var(--color-border-soft)] bg-white hover:border-navy-800 hover:shadow-md transition-all"
            >
              <h3
                className="text-lg md:text-xl font-bold text-navy-900 mb-3 md:mb-4 leading-snug"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Contabilidade para {niche.label}
              </h3>
              <p className="text-sm text-neutral-700 leading-relaxed flex-grow">
                {niche.desc}
              </p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {niche.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-wider px-2 py-1 bg-navy-50 text-navy-800 rounded font-semibold"
                    style={{ fontFamily: 'var(--font-label)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="mt-5 text-sm font-semibold text-navy-800 group-hover:text-gold-600 transition-colors">
                Ver especialidade →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* ── TECNOLOGIA QUE APOIA A ROTINA ── fondo azul-pálido sólido + borde sutil para separar de Especialidades (white) */}
      <section className="relative bg-[#EEF2F6] border-y border-[color:var(--color-border-soft)]">
        <div className="relative max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-5">
            <p
              className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-gold-600 mb-3"
              style={{ fontFamily: 'var(--font-label)' }}
            >
              Portal do cliente
            </p>
            <h2
              className="text-[1.625rem] sm:text-3xl md:text-4xl font-bold text-navy-900 tracking-tight leading-[1.15] md:leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Tecnologia que apoia a rotina dos clientes
            </h2>
            <div className="mt-6 space-y-4 text-neutral-700 leading-relaxed">
              <p>
                Além do acompanhamento contábil e consultivo, a DM2 Contabilidade
                conta com recursos digitais que organizam o dia a dia do cliente:
                acesso a documentos, abertura de solicitações, comunicados e
                acompanhamento de processos em um único lugar.
              </p>
              <p>Não substitui a relação direta com o contador. Apoia.</p>
            </div>
            <ul className="mt-8 space-y-3 text-sm">
              {[
                { label: 'Documentos', desc: 'Gestão Eletrônica de Documentos (GED) com docs por empresa e por entrega.' },
                { label: 'Solicitações', desc: 'Abertura e acompanhamento de pedidos sem precisar de e-mail ou WhatsApp.' },
                { label: 'Processos', desc: 'Visibilidade do andamento de cada trabalho, com etapa e status.' },
              ].map((item) => (
                <li key={item.label} className="flex gap-3">
                  <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-gold-500" aria-hidden="true" />
                  <span className="text-neutral-800">
                    <strong className="text-navy-900 font-semibold">{item.label}.</strong>{' '}
                    <span className="text-neutral-700">{item.desc}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            {/* Vitrina institucional — composição estática, sem rotação nem autoplay */}
            <div
              role="group"
              aria-label="Telas do portal do cliente da DM2 Contabilidade: Dashboard ao centro, Documentos à esquerda, Processos à direita"
              className="relative w-full"
            >
              {/* MOBILE — grid sobrio de 3 telas em escala equivalente */}
              <div className="grid grid-cols-3 gap-3 md:hidden">
                {[
                  {
                    src: '/images/portal/portal-ged.webp',
                    alt: 'Tela de GED com Docs Empresa e Docs Entregas',
                    caption: 'Documentos',
                  },
                  {
                    src: '/images/portal/portal-dashboard.webp',
                    alt: 'Tela de Dashboard com indicadores de solicitações e comunicados',
                    caption: 'Dashboard',
                  },
                  {
                    src: '/images/portal/portal-processos.webp',
                    alt: 'Tela de Processos com andamento de Abertura de Empresa em 30%',
                    caption: 'Processos',
                  },
                ].map((s, i) => (
                  <figure key={s.caption} className="flex flex-col">
                    <div className="relative rounded-xl overflow-hidden bg-white border border-[color:var(--color-border-soft)] shadow-[0_8px_20px_-12px_rgba(7,71,93,0.18)]">
                      <Image
                        src={s.src}
                        alt={s.alt}
                        width={360}
                        height={716}
                        sizes="30vw"
                        loading={i === 1 ? 'eager' : 'lazy'}
                        className="block w-full h-auto"
                      />
                    </div>
                    <figcaption
                      className="mt-2 text-[10px] uppercase tracking-wider text-navy-800 text-center"
                      style={{ fontFamily: 'var(--font-label)' }}
                    >
                      {s.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>

              {/* DESKTOP/TABLET (md+) — vitrina premium: tela central destacada + 2 laterais ligeramente atrás */}
              <div className="hidden md:block relative w-full max-w-xl lg:max-w-2xl mx-auto" style={{ height: 540 }}>
                {/* Sombra base institucional, navy translúcida */}
                <div
                  aria-hidden="true"
                  className="absolute -bottom-2 left-[12%] right-[12%] h-10 bg-navy-900/20 blur-3xl rounded-full"
                />

                {/* Lateral esquerda — Documentos (atrás, levemente abaixo) */}
                <figure className="group/left absolute left-0 top-16 w-[33%] aspect-[360/716] z-0 transition-transform duration-500 ease-out hover:scale-[1.02] hover:z-20">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white border border-[color:var(--color-border-soft)] shadow-[0_12px_28px_-14px_rgba(7,71,93,0.22)] opacity-90 group-hover/left:opacity-100 transition-opacity duration-500">
                    <Image
                      src="/images/portal/portal-ged.webp"
                      alt="Tela de GED (Gestão Eletrônica de Documentos) com pastas Docs Empresa e Docs Entregas"
                      fill
                      sizes="(min-width: 1024px) 220px, 28vw"
                      className="object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                  <figcaption
                    className="mt-3 text-xs uppercase tracking-wider text-neutral-600 text-center"
                    style={{ fontFamily: 'var(--font-label)' }}
                  >
                    Documentos
                  </figcaption>
                </figure>

                {/* Lateral direita — Processos (atrás, levemente abaixo) */}
                <figure className="group/right absolute right-0 top-16 w-[33%] aspect-[360/716] z-0 transition-transform duration-500 ease-out hover:scale-[1.02] hover:z-20">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white border border-[color:var(--color-border-soft)] shadow-[0_12px_28px_-14px_rgba(7,71,93,0.22)] opacity-90 group-hover/right:opacity-100 transition-opacity duration-500">
                    <Image
                      src="/images/portal/portal-processos.webp"
                      alt="Tela de Processos do portal mostrando andamento de Abertura de Empresa em 30%"
                      fill
                      sizes="(min-width: 1024px) 220px, 28vw"
                      className="object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                  <figcaption
                    className="mt-3 text-xs uppercase tracking-wider text-neutral-600 text-center"
                    style={{ fontFamily: 'var(--font-label)' }}
                  >
                    Processos
                  </figcaption>
                </figure>

                {/* Central — Dashboard (frente, dominante) */}
                <figure className="group/center absolute left-1/2 -translate-x-1/2 top-0 w-[42%] aspect-[360/716] z-10 transition-transform duration-500 ease-out hover:scale-[1.015]">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white border border-[color:var(--color-border-soft)] shadow-[0_28px_56px_-22px_rgba(7,71,93,0.32)] transition-shadow duration-500 group-hover/center:shadow-[0_32px_64px_-22px_rgba(7,71,93,0.40)]">
                    <Image
                      src="/images/portal/portal-dashboard.webp"
                      alt="Tela de Dashboard do portal do cliente, com indicadores de solicitações e comunicados"
                      fill
                      sizes="(min-width: 1024px) 290px, 36vw"
                      className="object-cover object-top"
                      loading="eager"
                    />
                  </div>
                  <figcaption
                    className="mt-3 text-xs uppercase tracking-wider text-navy-800 font-semibold text-center"
                    style={{ fontFamily: 'var(--font-label)' }}
                  >
                    Dashboard
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* ── BLOG / CONTEÚDO ── editorial, com peso */}
      <Section spacing="lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-5 md:gap-4">
          <div className="max-w-xl">
            <p
              className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-gold-600 mb-3"
              style={{ fontFamily: 'var(--font-label)' }}
            >
              Conteúdo
            </p>
            <h2
              className="text-[1.625rem] sm:text-3xl md:text-4xl font-bold text-navy-900 tracking-tight leading-[1.15] md:leading-[1.1]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Análises práticas sobre contabilidade e tributação
            </h2>
            <p className="mt-3 md:mt-4 text-neutral-700 leading-relaxed">
              Conteúdo escrito pela equipe da DM2 Contabilidade, sem terceirização
              editorial e sem reciclagem de conteúdo genérico.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-semibold text-navy-800 hover:text-gold-600 transition-colors shrink-0"
          >
            Ver todos os artigos →
          </Link>
        </div>

        {featuredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
            {featuredPosts.map((post: BlogPost, i) => {
              const date = formatFeaturedDate(post.publishedAt);
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
                        priority={i === 0}
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
                  <div className="p-6 flex flex-col flex-grow">
                    <span
                      className="self-start inline-block px-2.5 py-0.5 rounded-sm text-[10px] font-semibold uppercase tracking-wider bg-navy-50 text-navy-800 mb-4"
                      style={{ fontFamily: 'var(--font-label)' }}
                    >
                      {cat}
                    </span>
                    <h3
                      className="text-lg font-bold text-navy-900 leading-snug mb-3 group-hover:text-navy-800 transition-colors"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      <Link
                        href={`/blog/${post.slug}`}
                        className="relative after:absolute after:inset-0"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-neutral-700 leading-relaxed flex-grow line-clamp-3">
                      {post.excerpt}
                    </p>
                    {date && (
                      <p className="mt-5 text-xs text-neutral-500">
                        <time dateTime={post.publishedAt ?? undefined}>{date}</time>
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-neutral-300 bg-white p-10 text-center">
            <p className="text-neutral-700">
              Os artigos editoriais estarão disponíveis em breve.{' '}
              <Link href="/blog" className="text-navy-800 underline hover:text-navy-900">
                Acompanhar o blog
              </Link>
              .
            </p>
          </div>
        )}
      </Section>

      {/* ── CTA FINAL ── fechamento institucional contundente */}
      <CTAStrip
        title="Sua empresa merece um contador presente."
        subtitle="Em São Paulo, com atendimento próximo, técnico e responsável desde 2003."
        buttonText="Fale com a DM2 Contabilidade"
      />
    </>
  );
}
