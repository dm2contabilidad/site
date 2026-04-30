import { createMetadata } from '@/lib/metadata';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/layout/Section';
import { siteConfig } from '@/content/site';

export const metadata = createMetadata({
  title: 'Termos de Uso',
  description:
    'Termos de uso do site da DM2 Contabilidade. Regras para acesso, uso e responsabilidades.',
  path: '/termos',
});

const lastUpdated = '28 de abril de 2026';

export default function TermosPage() {
  const { name, nap, url } = siteConfig;

  return (
    <>
      <PageHeader
        title="Termos de Uso"
        subtitle={`Última atualização: ${lastUpdated}`}
        breadcrumbs={[{ label: 'Termos' }]}
      />

      <Section spacing="lg" width="narrow">
        <div className="prose prose-neutral max-w-none text-neutral-700 leading-relaxed space-y-8">
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              1. Aceitação dos termos
            </h2>
            <p>
              Ao acessar e utilizar o site{' '}
              <a href={url} className="text-navy-800 underline">{url}</a>, mantido por{' '}
              {name}, com sede em {nap.street}, {nap.neighborhood}, {nap.city}/{nap.state},
              CEP {nap.postalCode}, registrada no CRC-SP sob o número{' '}
              {siteConfig.crcSp}, você declara estar de acordo com estes Termos de
              Uso. Caso não concorde com qualquer disposição, recomendamos que se
              abstenha de utilizar o site.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              2. Objeto do site
            </h2>
            <p>
              Este site tem caráter informativo e institucional. Apresenta os
              serviços contábeis prestados pela DM2 Contabilidade, conteúdos
              relacionados à área contábil, tributária e fiscal, e disponibiliza
              canais de contato para atendimento. O site não realiza vendas
              automatizadas nem operações financeiras online. A contratação de
              serviços ocorre por meio de proposta comercial específica.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              3. Propriedade intelectual
            </h2>
            <p>
              Todo o conteúdo publicado no site (textos, imagens, logotipos,
              identidade visual, código-fonte e materiais técnicos) é de
              propriedade exclusiva da DM2 Contabilidade ou utilizado mediante
              autorização. É proibida a reprodução, distribuição ou modificação
              do conteúdo sem autorização prévia e por escrito, exceto quando
              expressamente permitido na legislação aplicável (citação com
              indicação da fonte, por exemplo).
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              4. Conteúdo informativo
            </h2>
            <p>
              Os conteúdos publicados no blog e nas páginas de serviço têm
              finalidade informativa e refletem o entendimento da equipe da DM2
              Contabilidade à data de publicação. A legislação tributária e
              contábil brasileira é alterada com frequência. Antes de tomar qualquer
              decisão com base no conteúdo do site, recomendamos consulta a um
              profissional habilitado, considerando a situação específica de cada
              empresa. A DM2 Contabilidade não se responsabiliza por decisões
              tomadas exclusivamente com base na leitura do conteúdo aqui publicado,
              sem consulta técnica individualizada.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              5. Disponibilidade do site
            </h2>
            <p>
              Buscamos manter o site disponível e atualizado, mas não garantimos
              acesso ininterrupto, livre de erros ou imune a interrupções por
              manutenção, atualizações, indisponibilidade do provedor de
              hospedagem ou eventos de força maior. Eventuais interrupções não
              configuram descumprimento contratual.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              6. Responsabilidade do usuário
            </h2>
            <p>
              Ao utilizar os formulários do site, você se compromete a fornecer
              informações verdadeiras, atualizadas e que sejam de sua titularidade
              ou autorização. É vedado o envio de conteúdo ilegal, ofensivo,
              difamatório, que viole direitos de terceiros ou que represente
              tentativa de fraude, automação não autorizada ou ataque ao sistema.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              7. Links externos
            </h2>
            <p>
              O site pode conter links para sites de terceiros (redes sociais,
              área de clientes externa, ferramentas de terceiros). A DM2
              Contabilidade não se responsabiliza pelo conteúdo, pelas políticas
              de privacidade ou pelas práticas desses sites. O acesso ocorre por
              conta e risco do usuário.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              8. Proteção de dados
            </h2>
            <p>
              O tratamento dos dados pessoais coletados pelo site segue a Política
              de Privacidade da DM2 Contabilidade, disponível em{' '}
              <a href="/privacidade" className="text-navy-800 underline">
                {url}/privacidade
              </a>
              , em conformidade com a Lei Geral de Proteção de Dados (Lei nº
              13.709/2018).
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              9. Alterações nestes termos
            </h2>
            <p>
              Estes Termos de Uso podem ser atualizados periodicamente. A data da
              última atualização é informada no topo desta página. O uso
              continuado do site após eventuais alterações representa concordância
              com a versão vigente.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              10. Foro e legislação aplicável
            </h2>
            <p>
              Estes Termos de Uso são regidos pela legislação brasileira. Fica
              eleito o foro da Comarca de São Paulo/SP para dirimir quaisquer
              questões oriundas do uso deste site, com renúncia expressa a
              qualquer outro, por mais privilegiado que seja.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              11. Contato
            </h2>
            <p>
              Dúvidas sobre estes Termos de Uso podem ser encaminhadas para:
            </p>
            <ul className="list-none pl-0 mt-3 space-y-1.5">
              <li>E-mail: <a href={`mailto:${nap.email}`} className="text-navy-800 underline">{nap.email}</a></li>
              <li>Telefone: <a href={`tel:${nap.phoneInternational}`} className="text-navy-800 underline">{nap.phone}</a></li>
              <li>Endereço: {nap.street}, {nap.neighborhood}, {nap.city}/{nap.state}, CEP {nap.postalCode}</li>
            </ul>
          </section>
        </div>
      </Section>
    </>
  );
}
