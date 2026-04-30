import Image from 'next/image';
import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { CTAStrip } from '@/components/sections/CTAStrip';
import {
  BreadcrumbSchema,
  LocalBusinessSchema,
  PersonSchema,
} from '@/components/seo/SchemaMarkup';
import {
  CLIENT_PORTAL_URL,
  TECHNICAL_REFERENCE,
  WHATSAPP_DISPLAY,
  siteConfig,
} from '@/content/site';

export const metadata = createMetadata({
  title: 'Quem Somos | DM2 Contabilidade em São Paulo desde 2003',
  description:
    'DM2 Contabilidade Ltda, escritório de contabilidade em Vila Mariana, São Paulo. Em atividade desde 2003, registrada no CRC-SP 2SP039587. Conduzida tecnicamente por Danilo Brito de Morais.',
  path: '/quem-somos',
});

const operatingPrinciples = [
  {
    title: 'Acompanhamento mensal contínuo',
    body: 'Cada empresa tem rotina mensal definida: fechamento contábil, conciliação cruzada entre obrigações federais, estaduais e municipais, e leitura do que mudou na legislação. Sem corrida de fim de mês.',
  },
  {
    title: 'Leitura fiscal e tributária ativa',
    body: 'Apuração e enquadramento são revisados a cada ciclo, e não congelados na abertura. Mudou o faturamento, o CNAE ou a regra do regime, a análise é refeita.',
  },
  {
    title: 'Atendimento próximo, não terceirizado',
    body: 'O contato técnico é direto com o responsável pela conta, não com call center. Decisões importantes têm interlocução com o responsável técnico do escritório.',
  },
  {
    title: 'Sem processamento em massa',
    body: 'A escala da operação é pensada para permitir leitura caso a caso. Cada cliente tem documentos lidos, interpretados e devolvidos com orientação específica.',
  },
];

const services = [
  {
    name: 'Consultoria contábil',
    description: 'Acompanhamento mensal com leitura ativa dos números do negócio.',
    href: '/servicos-contabeis/consultoria-contabil',
  },
  {
    name: 'Planejamento tributário',
    description: 'Revisão de regime e simulação comparada para reduzir carga dentro da lei.',
    href: '/servicos-contabeis/planejamento-tributario',
  },
  {
    name: 'Gestão fiscal e tributária',
    description: 'Apuração e conciliação federal, estadual e municipal mês a mês.',
    href: '/servicos-contabeis/gestao-fiscal-e-tributaria',
  },
  {
    name: 'Abertura e regularização',
    description: 'Da escolha do regime à inscrição estadual e municipal em São Paulo.',
    href: '/servicos-contabeis/abertura-e-regularizacao-de-empresas',
  },
];

export default function QuemSomosPage() {
  const breadcrumbItems = [
    { name: 'Início', url: siteConfig.url },
    { name: 'Quem Somos', url: `${siteConfig.url}/quem-somos` },
  ];

  // Google Maps URLs computados a partir do NAP do siteConfig.
  // Permanecem em sync se o endereço mudar; nenhuma URL hardcoded.
  // - directions: abre Google Maps já com a rota traçada até o destino
  //   (o usuário só precisa do ponto de partida)
  // - place: abre a localização marcada no Google Maps
  const fullAddress = `${siteConfig.nap.street}, ${siteConfig.nap.neighborhood}, ${siteConfig.nap.city} - ${siteConfig.nap.state}, ${siteConfig.nap.postalCode}`;
  const encodedAddress = encodeURIComponent(fullAddress);
  const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
  const mapsPlaceUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  return (
    <>
      <PersonSchema
        name={TECHNICAL_REFERENCE.name}
        jobTitle={TECHNICAL_REFERENCE.role}
      />
      <LocalBusinessSchema />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Hero institucional con foto de la fachada do escritório.
          Família visual do home (imagem + dual overlay navy + texto white
          + accent gold + hairline gold no bottom), com composição própria:
          altura menor (60-70vh em vez de 80-92vh), texto ancorado ao
          fundo, breadcrumb fixo no topo. Diferencia /quem-somos como
          página institucional secundária sem clonar a landing. */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end overflow-hidden bg-navy-900">
        <Image
          src="/images/photos/fachada-predio-dm2-contabilidade.webp"
          alt="Fachada do prédio onde fica o escritório da DM2 Contabilidade, na Rua Vergueiro, 3086, Vila Mariana, São Paulo"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Dual overlay: gradiente vertical para legibilidade do texto inferior
            + tinte navy plana para coesão com a paleta do site. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/80 to-navy-900/45"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-navy-900/15"
        />

        {/* Breadcrumb ancorado ao topo, fora do fluxo do texto principal */}
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
                <li className="font-medium text-white">Quem Somos</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Bloco de texto institucional, ancorado ao fundo */}
        <div className="relative z-10 w-full pb-14 md:pb-20">
          <div className="max-w-6xl mx-auto px-5 md:px-8">
            <div className="max-w-3xl">
              <p
                className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-gold-400 mb-5 md:mb-6"
                style={{ fontFamily: 'var(--font-label)' }}
              >
                Sobre o escritório
              </p>
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Escritório de contabilidade em São Paulo desde 2003
              </h1>
              <p className="mt-5 md:mt-6 text-base md:text-lg text-white/85 leading-relaxed max-w-2xl">
                DM2 Contabilidade Ltda, registrada no CRC-SP sob o número{' '}
                {siteConfig.crcSp}, com sede em Vila Mariana. Conduzida
                tecnicamente por {TECHNICAL_REFERENCE.name}, contador
                responsável.
              </p>
            </div>
          </div>
        </div>

        {/* Hairline gold inferior — assinatura visual compartilhada com o home */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/60 to-transparent z-10"
        />
      </section>

      {/* B — História */}
      <Section spacing="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="max-w-xl">
            <p
              className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-gold-600 mb-4"
              style={{ fontFamily: 'var(--font-label)' }}
            >
              Trajetória
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold text-navy-900 mb-6 leading-snug"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Da DM2 Assessoria Contábil em 2003 à DM2 Contabilidade Ltda em 2010
            </h2>
            <div className="space-y-4 text-neutral-700 leading-relaxed">
              <p>
                A atuação na área contábil começou em 2003, sob o nome
                DM2 Assessoria Contábil. Em 28 de setembro de 2010, a operação
                foi formalizada como DM2 Contabilidade Ltda, a pessoa jurídica
                que opera o escritório hoje, com registro no Conselho Regional
                de Contabilidade de São Paulo sob o número 2SP039587.
              </p>
              <p>
                Entre uma data e outra, o trabalho permaneceu o mesmo:
                acompanhar empresas em São Paulo no que envolve contabilidade,
                tributos e folha. Mudaram a estrutura jurídica, o ambiente
                regulatório e o ferramental técnico. Permaneceu a forma de
                conduzir cada cliente, com leitura caso a caso e responsabilidade
                técnica direta.
              </p>
              <p>
                Em 2026, a DM2 Contabilidade soma mais de duas décadas de
                continuidade operacional em Vila Mariana, com clientes que
                acompanham o escritório há vários ciclos econômicos.
              </p>
            </div>
          </div>
          {/* Foto institucional da fachada do escritório.
              Mesma imagem usada no hero da página, em aspect 4:3 e
              tratamento sobrio (sem overlay) para que aqui funcione como
              registro fotográfico do edifício, complementando o texto da
              trajetória sem competir visualmente. */}
          <figure className="relative aspect-[4/3] overflow-hidden rounded-lg border border-navy-100 bg-navy-50">
            <Image
              src="/images/photos/fachada-predio-dm2-contabilidade.webp"
              alt="Fachada do prédio onde fica o escritório da DM2 Contabilidade, na Rua Vergueiro, 3086, Vila Mariana, São Paulo"
              fill
              quality={85}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
            <figcaption
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-900/80 via-navy-900/40 to-transparent px-5 py-4 text-white"
            >
              <p
                className="text-[10px] uppercase tracking-[0.22em] text-gold-400"
                style={{ fontFamily: 'var(--font-label)' }}
              >
                Escritório DM2 Contabilidade
              </p>
              <p className="mt-0.5 text-sm">
                Rua Vergueiro, Vila Mariana
              </p>
            </figcaption>
          </figure>
        </div>
      </Section>

      {/* C — Condução técnica e responsabilidade do escritório.
          Bloco navy: segundo grande âncora visual da página depois do hero.
          Quebra o ritmo de blocos claros e funciona como peso institucional
          de autoridade técnica. Foco no escritório (sujeito de cada oração);
          Danilo aparece uma única vez no corpo e uma vez na ficha, sempre
          como dado factual, nunca como figura central. */}
      <Section bg="dark" spacing="lg">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 items-start">
          <div className="max-w-xl">
            <p
              className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-gold-400 mb-4"
              style={{ fontFamily: 'var(--font-label)' }}
            >
              Responsabilidade técnica
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold text-white mb-6 leading-snug"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Condução técnica e responsabilidade do escritório
            </h2>
            <div className="space-y-4 text-white/85 leading-relaxed">
              <p>
                A DM2 Contabilidade Ltda opera com condução técnica
                identificável e responsabilidade direta sobre o que entrega.
                Desde a constituição da empresa em 2010, em continuidade ao
                trabalho iniciado em 2003, essa condução permanece clara,
                rastreável e vinculada à rotina contábil, fiscal e tributária
                do escritório. A condução técnica é exercida por{' '}
                {TECHNICAL_REFERENCE.name}.
              </p>
              <p>
                Toda a escrituração, os pareceres tributários e as
                orientações entregues aos clientes passam por revisão técnica
                interna, com sujeição às Normas Brasileiras de Contabilidade,
                às exigências da Receita Federal, da Secretaria da Fazenda
                do Estado de São Paulo e da Prefeitura de São Paulo. A
                análise não é terceirizada.
              </p>
              <p>
                A rastreabilidade faz parte do método de trabalho da DM2
                Contabilidade. Cada cliente sabe quem revisa, quem responde
                e qual estrutura técnica sustenta o que está sendo entregue.
                Em uma área em que a interpretação errada pode gerar risco
                fiscal, multa e retrabalho, isso não é detalhe operacional.
                É parte da responsabilidade do escritório.
              </p>
            </div>
          </div>

          {/* Ficha técnica do escritório.
              Card branca sobre fundo navy: lê como credencial institucional
              "física" elevada acima do bloco. Mantém alta legibilidade
              interna (texto navy/neutral sobre branco) e ganha presença pelo
              contraste com o navy da seção. Sombra sutil reforça a elevação
              sem efeito gritón. */}
          <aside className="bg-white border border-white/10 rounded-lg overflow-hidden shadow-2xl shadow-black/30">
            <div aria-hidden="true" className="h-1 bg-gold-500" />
            <div className="p-6 md:p-7">
              <p
                className="text-[11px] uppercase tracking-[0.22em] text-gold-600 mb-5"
                style={{ fontFamily: 'var(--font-label)' }}
              >
                Ficha técnica do escritório
              </p>
              <dl className="divide-y divide-neutral-200 text-sm">
                <div className="pb-4">
                  <dt
                    className="text-[11px] uppercase tracking-[0.18em] text-neutral-500"
                    style={{ fontFamily: 'var(--font-label)' }}
                  >
                    Escritório
                  </dt>
                  <dd className="mt-1.5 text-navy-900 font-medium">
                    DM2 Contabilidade Ltda
                  </dd>
                  <dd className="text-neutral-600">
                    São Paulo, em atividade desde 2003
                  </dd>
                </div>
                <div className="py-4">
                  <dt
                    className="text-[11px] uppercase tracking-[0.18em] text-neutral-500"
                    style={{ fontFamily: 'var(--font-label)' }}
                  >
                    Condução técnica
                  </dt>
                  <dd className="mt-1.5 text-navy-900 font-medium">
                    {TECHNICAL_REFERENCE.name}
                  </dd>
                  {/* Lowercase "técnico" per editorial spec (descriptive
                      function, not formal job title here). The constant
                      TECHNICAL_REFERENCE.role stays as "Responsável Técnico"
                      for footer/blog/schema usages. */}
                  <dd className="text-neutral-600">
                    Responsável técnico do escritório
                  </dd>
                </div>
                <div className="pt-4">
                  <dt
                    className="text-[11px] uppercase tracking-[0.18em] text-neutral-500"
                    style={{ fontFamily: 'var(--font-label)' }}
                  >
                    Registro
                  </dt>
                  <dd className="mt-1.5 text-navy-900 font-medium">
                    CRC-SP {siteConfig.crcSp}
                  </dd>
                  <dd className="text-neutral-600">
                    Conselho Regional de Contabilidade de São Paulo
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </Section>

      {/* D — Como a DM2 trabalha */}
      <Section spacing="lg">
        <div className="max-w-3xl mb-12">
          <p
            className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-gold-600 mb-4"
            style={{ fontFamily: 'var(--font-label)' }}
          >
            Método
          </p>
          <h2
            className="text-2xl md:text-3xl font-bold text-navy-900 mb-5 leading-snug"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Como a DM2 Contabilidade trabalha no dia a dia
          </h2>
          <p className="text-neutral-700 leading-relaxed">
            A DM2 Contabilidade opera com quatro princípios operacionais que se
            aplicam a todo cliente, independentemente do porte ou do setor. Não
            são valores institucionais. São decisões sobre como o trabalho é
            feito.
          </p>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {operatingPrinciples.map((p, i) => (
            <li
              key={p.title}
              className="rounded-lg border border-neutral-200 bg-white p-6 md:p-7"
            >
              <div className="flex items-start gap-4">
                <span
                  className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full border border-gold-500 text-gold-600 text-sm font-semibold"
                  style={{ fontFamily: 'var(--font-display)' }}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-navy-900 leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[15px] text-neutral-600 leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* E — Perfil de cliente.
          Bloco navy texturizado: imagem em opacidade baixa sobre navy
          sólido como fundo, criando presença e profundidade sem competir
          com o texto. Variação visual em relação à seção C (navy plano):
          aqui o navy ganha textura urbana de São Paulo, reforçando a
          ligação geográfica do escritório sem estilo de banner. */}
      <section className="relative bg-navy-900 text-white overflow-hidden">
        <Image
          src="/images/photos/dm2-contabilidade-em-sao-paulo.webp"
          alt=""
          aria-hidden="true"
          fill
          quality={80}
          sizes="100vw"
          className="object-cover object-center opacity-25"
        />
        {/* Overlay horizontal: 100% navy à esquerda (texto) → 55% navy à
            direita (imagem respira). Garante contraste WCAG AA na coluna
            de texto sem matar a textura no espaço livre da direita. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/90 to-navy-900/55"
        />

        <div className="relative max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <p
              className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-gold-400 mb-4"
              style={{ fontFamily: 'var(--font-label)' }}
            >
              Perfil de cliente
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold text-white mb-6 leading-snug"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Para que tipo de empresa a DM2 Contabilidade faz sentido
            </h2>
            <div className="space-y-4 text-white/85 leading-relaxed">
              <p>
                A DM2 Contabilidade trabalha com empresas de pequeno e médio porte em São Paulo
                que precisam da contabilidade como apoio ativo de gestão, e não
                apenas como obrigação burocrática. O perfil mais comum entre
                clientes inclui:
              </p>
              <ul className="space-y-3 pl-1">
                {[
                  'Empresas no Simples Nacional, Lucro Presumido ou Lucro Real que querem revisar enquadramento e ajustar carga tributária dentro da lei.',
                  'Profissionais liberais regulamentados (advogados, profissionais da saúde, consultores) que operam com sociedade própria.',
                  'Negócios digitais e de serviços B2B que precisam adequar contratos e regime à transição da reforma tributária entre 2026 e 2033.',
                  'Empresas em fase de abertura, regularização ou alteração societária em São Paulo.',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 inline-block w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                A escala atual da operação favorece relações de longo prazo, com
                ciclo mensal estável e atenção real por cliente. Não é um modelo
                voltado para volume nem para o menor preço pontual de mercado. É
                um modelo voltado para leitura técnica e continuidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* F — Estrutura e presença */}
      <Section spacing="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="max-w-xl">
            <p
              className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-gold-600 mb-4"
              style={{ fontFamily: 'var(--font-label)' }}
            >
              Endereço e atendimento
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold text-navy-900 mb-6 leading-snug"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Onde fica a DM2 Contabilidade e como entrar em contato
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-6">
              O escritório fica em Vila Mariana, na Rua Vergueiro, com fácil
              acesso para clientes nas zonas sul, central e oeste de São Paulo.
              Atendimento presencial com agendamento prévio e atendimento
              remoto para todo o estado.
            </p>

            {/* Card institucional NAP — agrupa endereço, atendimento e canais
                em uma unidade visual coesa, em vez de uma lista solta. */}
            <div className="rounded-lg border border-neutral-200 bg-white p-6 md:p-7">
              <dl className="divide-y divide-neutral-200 text-sm">
                <div className="pb-4">
                  <dt
                    className="text-[11px] uppercase tracking-[0.18em] text-neutral-500"
                    style={{ fontFamily: 'var(--font-label)' }}
                  >
                    Endereço
                  </dt>
                  <dd className="text-navy-900 font-medium mt-1.5">
                    Rua Vergueiro, 3086, Conjunto 24
                  </dd>
                  <dd className="text-neutral-600 mt-0.5">
                    Vila Mariana, São Paulo, SP. CEP {siteConfig.nap.postalCode}.
                  </dd>
                </div>
                <div className="py-4">
                  <dt
                    className="text-[11px] uppercase tracking-[0.18em] text-neutral-500"
                    style={{ fontFamily: 'var(--font-label)' }}
                  >
                    Atendimento
                  </dt>
                  <dd className="text-navy-900 font-medium mt-1.5">
                    {siteConfig.hours.days}, das {siteConfig.hours.open} às{' '}
                    {siteConfig.hours.close}
                  </dd>
                </div>
                <div className="py-4 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                  <div>
                    <dt
                      className="text-[11px] uppercase tracking-[0.18em] text-neutral-500"
                      style={{ fontFamily: 'var(--font-label)' }}
                    >
                      Telefone
                    </dt>
                    <dd className="text-navy-900 font-medium mt-1.5">
                      {siteConfig.nap.phone}
                    </dd>
                  </div>
                  <div>
                    <dt
                      className="text-[11px] uppercase tracking-[0.18em] text-neutral-500"
                      style={{ fontFamily: 'var(--font-label)' }}
                    >
                      WhatsApp
                    </dt>
                    <dd className="text-navy-900 font-medium mt-1.5">
                      {WHATSAPP_DISPLAY}
                    </dd>
                  </div>
                </div>
                <div className="py-4">
                  <dt
                    className="text-[11px] uppercase tracking-[0.18em] text-neutral-500"
                    style={{ fontFamily: 'var(--font-label)' }}
                  >
                    Email
                  </dt>
                  <dd className="mt-1.5">
                    <a
                      href={`mailto:${siteConfig.nap.email}`}
                      className="text-navy-900 font-medium hover:text-navy-700 underline underline-offset-2 decoration-gold-400"
                    >
                      {siteConfig.nap.email}
                    </a>
                  </dd>
                </div>
                <div className="pt-4">
                  <dt
                    className="text-[11px] uppercase tracking-[0.18em] text-neutral-500"
                    style={{ fontFamily: 'var(--font-label)' }}
                  >
                    Área de clientes
                  </dt>
                  <dd className="mt-1.5">
                    <a
                      href={CLIENT_PORTAL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-navy-900 font-medium hover:text-navy-700 underline underline-offset-2 decoration-gold-400"
                    >
                      Portal do cliente DM2 Contabilidade
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button href="/contato" variant="primary">
                Falar com a DM2 Contabilidade
              </Button>
              <Button
                href={`https://wa.me/${siteConfig.whatsapp}`}
                variant="secondary"
              >
                WhatsApp
              </Button>
            </div>
          </div>

          {/* Bloco de localização visual.
              Screenshot estático do mapa em /public/images/maps/. Sem
              UI externa, sem controles de zoom, sem atribuição de
              terceiro dentro do bloco — leitura institucional limpa.
              Aspect 7:6 espelha o ratio nativo da imagem (626x542,
              ~1.155); object-cover garante encaixe sem distorção em
              qualquer largura responsiva.

              O schema local (LocalBusinessSchema) continua emitindo o
              bloco `geo` condicionalmente sobre siteConfig.geo, que
              segue vazio até confirmação oficial das coordenadas. */}
          <div className="space-y-4">
            <div className="relative aspect-[7/6] overflow-hidden rounded-lg border border-navy-100 bg-navy-50">
              <Image
                src="/images/maps/dm2-mapa-vila-mariana.png"
                alt="Mapa da localização da DM2 Contabilidade na Rua Vergueiro, 3086, Conjunto 24, Vila Mariana, São Paulo"
                fill
                quality={90}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center"
              />
            </div>

            {/* CTAs de localização — abrem Google Maps em nova aba */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href={mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-navy-800 text-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-navy-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
              >
                Como chegar
                <span aria-hidden="true" className="text-base leading-none">
                  ›
                </span>
              </a>
              <a
                href={mapsPlaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-800 hover:text-navy-900 underline-offset-4 hover:underline decoration-gold-400 transition-colors"
              >
                Abrir no Google Maps
                <span aria-hidden="true" className="text-xs">↗</span>
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* G — Conexão com serviços */}
      <Section bg="soft" spacing="default">
        <div className="max-w-3xl mb-10">
          <p
            className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-gold-600 mb-4"
            style={{ fontFamily: 'var(--font-label)' }}
          >
            Frentes de atuação
          </p>
          <h2
            className="text-2xl md:text-3xl font-bold text-navy-900 mb-5 leading-snug"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Onde a DM2 Contabilidade atua
          </h2>
          <p className="text-neutral-700 leading-relaxed">
            O acompanhamento contábil da DM2 Contabilidade se desdobra em quatro frentes, com
            escopo definido e responsabilidade técnica direta sobre o trabalho
            entregue.
          </p>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="group block rounded-lg border border-neutral-200 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-navy-900 group-hover:text-navy-800">
                      {s.name}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="flex-shrink-0 mt-1 text-gold-600 group-hover:translate-x-0.5 transition-transform"
                  >
                    ›
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CTAStrip
        title="Falar com o responsável técnico"
        subtitle="Atendimento direto, sem intermediário comercial. Em São Paulo, desde 2003."
      />
    </>
  );
}
