import Image from 'next/image';
import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { ContactForm } from '@/components/forms/ContactForm';
import {
  BreadcrumbSchema,
  LocalBusinessSchema,
} from '@/components/seo/SchemaMarkup';
import { siteConfig, WHATSAPP_DISPLAY } from '@/content/site';

export const metadata = createMetadata({
  title: 'Contato | DM2 Contabilidade em São Paulo',
  description:
    'Entre em contato com a DM2 Contabilidade em São Paulo. Formulário, telefone e WhatsApp. Atendimento de segunda a sexta, em Vila Mariana.',
  path: '/contato',
});

export default function ContatoPage() {
  const { nap, hours } = siteConfig;

  return (
    <>
      <LocalBusinessSchema />
      <BreadcrumbSchema
        items={[
          { name: 'Início', url: siteConfig.url },
          { name: 'Contato', url: `${siteConfig.url}/contato` },
        ]}
      />

      {/* Hero institucional com imagem de fundo.
          Família visual padrão do sistema (mesma altura, mesmo overlay,
          mesma estrutura): imagem fill + dual overlay navy + breadcrumb
          dark inline ancorado ao topo + texto bottom-anchored + hairline
          gold inferior. H1 e subtítulo preservados. */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden bg-navy-900">
        <Image
          src="/images/photos/contato-dm2-contabilidade.webp"
          alt="DM2 Contabilidade em São Paulo, escritório em Vila Mariana, atendimento contábil para empresas"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-center"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/80 to-navy-900/45"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-navy-900/15"
        />

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
                <li className="font-medium text-white">Contato</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Bloco de texto institucional, alinhado à esquerda e
            centralizado dentro do hero. O pt-24/pt-32 compensa
            opticamente o peso visual do breadcrumb no topo: sem ele, o
            items-center matemático faz o bloco parecer alto demais
            porque a área superior já tem o breadcrumb. */}
        <div className="relative z-10 w-full pt-24 md:pt-32">
          <div className="max-w-6xl mx-auto px-5 md:px-8">
            <div className="max-w-3xl">
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Fale com a DM2 Contabilidade em São Paulo
              </h1>
              <p className="mt-5 md:mt-6 text-base md:text-lg text-white/85 leading-relaxed max-w-2xl">
                Escritório em Vila Mariana. Envie sua mensagem pelo formulário,
                telefone ou WhatsApp e nossa equipe retorna em breve.
              </p>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/60 to-transparent z-10"
        />
      </section>

      <Section spacing="lg">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Formulário funcional */}
          <div className="lg:col-span-3">
            <h2
              className="text-xl font-bold text-navy-900 mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Envie sua mensagem
            </h2>
            <ContactForm />
          </div>

          {/* Dados de contato */}
          <aside className="lg:col-span-2">
            <h2
              className="text-xl font-bold text-navy-900 mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Dados de contato
            </h2>
            <div className="space-y-6 text-sm">
              <div>
                <h3 className="font-semibold text-neutral-800 mb-1">Endereço</h3>
                <address className="not-italic text-neutral-600 leading-relaxed">
                  {nap.street}<br />
                  {nap.neighborhood}, {nap.city}/{nap.state}<br />
                  CEP {nap.postalCode}
                </address>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-800 mb-1">Telefone</h3>
                <a
                  href={`tel:${nap.phoneInternational}`}
                  className="text-navy-600 hover:text-navy-800 transition-colors"
                >
                  {nap.phone}
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-800 mb-1">Horário</h3>
                <p className="text-neutral-600">
                  {hours.days}<br />
                  {hours.open.replace(':', 'h')} às {hours.close.replace(':', 'h')}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-800 mb-1">WhatsApp</h3>
                <p className="text-neutral-600 mb-2">{WHATSAPP_DISPLAY}</p>
                <Button
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  variant="whatsapp"
                  size="sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Fale pelo WhatsApp
                </Button>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-800 mb-1">E-mail</h3>
                <a
                  href={`mailto:${nap.email}`}
                  className="text-navy-600 hover:text-navy-800 transition-colors text-sm"
                >
                  {nap.email}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
