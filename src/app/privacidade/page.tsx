import { createMetadata } from '@/lib/metadata';
import { PageHeader } from '@/components/layout/PageHeader';
import { Section } from '@/components/layout/Section';
import { siteConfig } from '@/content/site';

export const metadata = createMetadata({
  title: 'Política de Privacidade',
  description:
    'Política de privacidade da DM2 Contabilidade conforme a Lei Geral de Proteção de Dados (LGPD, Lei 13.709/2018).',
  path: '/privacidade',
});

const lastUpdated = '28 de abril de 2026';

export default function PrivacidadePage() {
  const { name, nap, url } = siteConfig;

  return (
    <>
      <PageHeader
        title="Política de Privacidade"
        subtitle={`Última atualização: ${lastUpdated}`}
        breadcrumbs={[{ label: 'Privacidade' }]}
      />

      <Section spacing="lg" width="narrow">
        <div className="prose prose-neutral max-w-none text-neutral-700 leading-relaxed space-y-8">
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              1. Quem somos
            </h2>
            <p>
              {name} (escritório registrado no CRC-SP sob o número {siteConfig.crcSp}), com sede em {nap.street},{' '}
              {nap.neighborhood}, {nap.city}/{nap.state}, CEP {nap.postalCode}, é
              o controlador dos dados pessoais coletados por meio do site{' '}
              <a href={url} className="text-navy-800 underline">{url}</a>. Esta política
              descreve como coletamos, usamos, armazenamos e protegemos seus dados,
              em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              2. Quais dados coletamos
            </h2>
            <p>
              Coletamos somente os dados estritamente necessários para responder
              ao seu contato e prestar os serviços contratados:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1.5">
              <li>Dados de identificação: nome, e-mail e telefone informados nos formulários do site.</li>
              <li>Dados sobre a sua empresa ou demanda: descrição da necessidade contábil enviada na mensagem.</li>
              <li>Dados de navegação: endereço IP, tipo de navegador, páginas visitadas e fonte de tráfego (UTMs), por meio de cookies e ferramentas de análise como Google Analytics e Meta Pixel.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              3. Para que usamos seus dados (finalidade)
            </h2>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Responder ao contato e enviar a proposta solicitada.</li>
              <li>Prestar os serviços contábeis contratados, quando aplicável.</li>
              <li>Cumprir obrigações legais e regulatórias da atividade contábil.</li>
              <li>Melhorar a experiência de uso do site e medir a efetividade dos canais de comunicação.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              4. Base legal do tratamento
            </h2>
            <p>
              O tratamento dos seus dados pessoais ocorre com base em uma das
              seguintes hipóteses legais previstas no artigo 7º da LGPD:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1.5">
              <li><strong>Consentimento</strong> (art. 7º, I): para receber comunicações ou enviar formulário de contato.</li>
              <li><strong>Execução de contrato</strong> (art. 7º, V): quando os dados são necessários para executar serviço contratado.</li>
              <li><strong>Cumprimento de obrigação legal</strong> (art. 7º, II): para atender exigências da Receita Federal, CRC-SP e demais órgãos.</li>
              <li><strong>Legítimo interesse</strong> (art. 7º, IX): para melhorar o site e a relação com o titular, sempre respeitando seus direitos fundamentais.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              5. Compartilhamento com terceiros
            </h2>
            <p>
              A DM2 Contabilidade não vende, aluga ou cede seus dados a terceiros
              para fins comerciais. Compartilhamos dados apenas com:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1.5">
              <li>Provedores de infraestrutura (hospedagem do site, envio de e-mails transacionais e armazenamento), sob contrato de confidencialidade.</li>
              <li>Órgãos públicos e reguladores, quando exigido por lei.</li>
              <li>Ferramentas de análise (Google Analytics, Meta Pixel) com dados pseudonimizados, para medição agregada.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              6. Por quanto tempo guardamos seus dados
            </h2>
            <p>
              Mantemos os dados de contato pelo tempo necessário para atender à
              finalidade da coleta ou pelo prazo exigido por lei. Dados de
              clientes ativos são mantidos enquanto durar o vínculo contratual e
              pelo período legal de guarda fiscal subsequente (mínimo de 5 anos
              após o término da relação, conforme legislação contábil e tributária).
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              7. Seus direitos como titular
            </h2>
            <p>
              A LGPD garante a você, titular dos dados, os seguintes direitos
              (artigo 18):
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1.5">
              <li>Confirmação da existência de tratamento dos seus dados.</li>
              <li>Acesso aos dados que possuímos sobre você.</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados.</li>
              <li>Anonimização, bloqueio ou eliminação de dados desnecessários.</li>
              <li>Portabilidade dos dados a outro fornecedor de serviço.</li>
              <li>Eliminação dos dados tratados com base no consentimento.</li>
              <li>Informação sobre com quem compartilhamos seus dados.</li>
              <li>Revogação do consentimento a qualquer momento.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              8. Segurança dos dados
            </h2>
            <p>
              Adotamos medidas técnicas e administrativas para proteger seus dados
              contra acessos não autorizados, perda, destruição ou divulgação
              indevida: conexões criptografadas (HTTPS), controle de acesso aos
              sistemas internos, hospedagem em provedores com certificações de
              segurança e proteção contra ataques automatizados (rate limiting e
              verificação anti-bot nos formulários).
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              9. Cookies
            </h2>
            <p>
              Utilizamos cookies essenciais ao funcionamento do site e cookies
              analíticos para entender como ele é utilizado. Você pode desativar
              cookies nas configurações do seu navegador. A desativação de
              cookies essenciais pode comprometer funcionalidades do site.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              10. Como exercer seus direitos ou tirar dúvidas
            </h2>
            <p>
              Para exercer qualquer direito previsto na LGPD ou esclarecer dúvidas
              sobre o tratamento dos seus dados, entre em contato com a DM2
              Contabilidade pelos seguintes canais:
            </p>
            <ul className="list-none pl-0 mt-3 space-y-1.5">
              <li>E-mail: <a href={`mailto:${nap.email}`} className="text-navy-800 underline">{nap.email}</a></li>
              <li>Telefone: <a href={`tel:${nap.phoneInternational}`} className="text-navy-800 underline">{nap.phone}</a></li>
              <li>Endereço: {nap.street}, {nap.neighborhood}, {nap.city}/{nap.state}, CEP {nap.postalCode}</li>
            </ul>
            <p className="mt-3">
              Responderemos sua solicitação no prazo legal de até 15 (quinze) dias.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold text-navy-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              11. Alterações nesta política
            </h2>
            <p>
              Esta política pode ser atualizada periodicamente para refletir
              mudanças na legislação, nas práticas da DM2 Contabilidade ou na
              infraestrutura do site. A data da última atualização é informada no
              topo desta página.
            </p>
          </section>
        </div>
      </Section>
    </>
  );
}
