import { createMetadata } from '@/lib/metadata';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { ContactForm } from '@/components/forms/ContactForm';
import { LocalBusinessSchema } from '@/components/seo/SchemaMarkup';
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
      <PageHeader
        title="Fale com a DM2 Contabilidade em São Paulo"
        subtitle="Escritório em Vila Mariana. Envie sua mensagem pelo formulário, telefone ou WhatsApp e nossa equipe retorna em breve."
        breadcrumbs={[{ label: 'Contato' }]}
      />

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
