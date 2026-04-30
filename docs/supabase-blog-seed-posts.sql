-- =============================================
-- DM2 Contabilidade — Blog Seed Posts (6 articles)
--
-- Run AFTER supabase-blog-tables.sql.
-- Idempotent:
--   - blog_posts uses ON CONFLICT (slug) DO UPDATE
--   - blog_post_faqs and blog_post_related_services are wiped per post
--     (DELETE WHERE post_id = ...) before INSERT, so the file is the
--     source of truth.
--
-- Convention used in this file:
--   - Body content is in `content_html` (semantic HTML, no styling).
--   - `content_json` is left NULL (reserved for future structured editor).
--   - Dates use America/Sao_Paulo offset (-03:00) explicitly.
--   - Cover/OG images are NULL until the editorial team uploads them
--     to the `blog-covers` bucket; the post is otherwise complete.
-- =============================================

BEGIN;

-- ===============================================================
-- Post 1 — PUBLISHED — IBS e CBS nas notas fiscais em 2026
-- ===============================================================

INSERT INTO blog_posts (
  slug, title, subtitle, excerpt, content_html, content_json,
  cover_image_url, cover_image_alt,
  status, published_at,
  author_id, category_id,
  seo_title, seo_description, canonical_url,
  og_title, og_description, og_image_url,
  robots_index, robots_follow,
  primary_keyword, secondary_keywords, search_intent,
  entity_focus, local_focus,
  faq_enabled, is_evergreen, last_reviewed_at, technical_reviewed_by_author,
  featured_on_home, featured_order, is_pillar,
  read_time_minutes,
  related_service_slug, related_specialty_slug
) VALUES (
  'ibs-cbs-notas-fiscais-2026-empresas-sao-paulo',
  'IBS e CBS nas notas fiscais em 2026: o que já mudou na rotina fiscal das empresas',
  'O ano de teste do IVA dual brasileiro chegou à emissão de NF-e, NFS-e e demais documentos fiscais.',
  'Com a entrada em vigor do IBS e da CBS em 2026, mesmo com alíquotas de teste (0,1% e 0,9%), todas as notas fiscais passam a exigir novos campos. Veja o que muda na rotina fiscal das empresas brasileiras e os pontos críticos para evitar problemas com a Receita.',
  $html$
<p>Em 1º de janeiro de 2026, qualquer empresa brasileira que emite ou recebe nota fiscal passou a operar dentro do novo sistema de tributação sobre o consumo. Entraram em vigor o <strong>IBS</strong> (Imposto sobre Bens e Serviços, de competência compartilhada entre estados e municípios) e a <strong>CBS</strong> (Contribuição sobre Bens e Serviços, federal), formando o IVA dual previsto pela Emenda Constitucional 132/2023 e regulamentado pela Lei Complementar 214/2025.</p>

<p>O ano de 2026 funciona como período de teste. As alíquotas são reduzidas (0,1% de IBS e 0,9% de CBS) e o valor apurado é compensável contra outros tributos. Em termos de caixa, o impacto é próximo de zero. Em termos operacionais, é alto: o leiaute da NF-e mudou, a SEFAZ passou a rejeitar documentos sem os novos campos e a apuração precisa refletir tudo isso na escrituração.</p>

<p>O resumo prático é direto. Se a sua empresa não revisou o ERP, o cadastro de produtos e serviços e a rotina fiscal até este ponto do ano, está acumulando inconsistências silenciosas. Em 2027, quando a CBS entra com alíquota plena e substitui PIS e COFINS, essas inconsistências viram problema de caixa.</p>

<h2>Os novos campos que entraram na NF-e e na NFS-e</h2>

<p>Os documentos fiscais eletrônicos ganharam quatro grupos de informação que antes não existiam. Estão presentes na NF-e (mercadorias), NFC-e (consumidor final), CT-e (transporte) e na NFS-e padrão nacional (em transição nos municípios).</p>

<ul>
<li><strong>Código de classificação tributária do IBS e da CBS</strong> (cClassTrib): identifica como cada item se enquadra no novo sistema, distinguindo regime regular, regimes específicos (combustíveis, sistema financeiro, planos de saúde, operações com imóveis), imune e isento.</li>
<li><strong>Base de cálculo do IBS e da CBS</strong>: informada de forma separada das bases de ICMS, IPI, PIS e COFINS, que continuam coexistindo durante a transição. A nota fiscal em 2026 carrega, na prática, dois sistemas tributários sobrepostos.</li>
<li><strong>Alíquota aplicada ao item</strong>: 0,1% para IBS e 0,9% para CBS no regime regular durante 2026, com percentuais distintos para regimes específicos.</li>
<li><strong>Identificação completa do destinatário</strong>: UF e município ganharam peso tributário imediato. O IBS, diferente do ICMS, é apurado integralmente no destino. Erro no endereço do cliente impacta arrecadação e crédito.</li>
</ul>

<p>Esses campos não são opcionais. A validação acontece no momento da autorização da nota. Documento sem o preenchimento correto retorna erro e a operação não pode ser registrada até o ajuste.</p>

<h2>A lógica da alíquota de teste em 2026</h2>

<p>A redução das alíquotas neste primeiro ano não é um benefício comercial. É um mecanismo técnico para que empresas, sistemas, prefeituras, estados e a própria Receita Federal calibrem a operação do IVA dual antes da entrada em alíquota plena.</p>

<p>O que isso significa na prática:</p>

<ul>
<li>O valor de 0,1% de IBS apurado mensalmente é compensável contra outros tributos federais, conforme regras editadas pelo Comitê Gestor do IBS (CGIBS).</li>
<li>O valor de 0,9% de CBS é compensável contra PIS e COFINS, ainda em vigor durante 2026.</li>
<li>A apuração e o destaque na nota fiscal precisam estar corretos, mesmo que o valor financeiro seja absorvido pela compensação.</li>
<li>Empresas no Simples Nacional têm <a href="/blog/simples-nacional-2027-prazos-opcao-ibs-cbs">regra própria de transição</a>, com possibilidade de destacar IBS e CBS para que o adquirente possa se creditar.</li>
</ul>

<p>O ponto importante é que 2026 é um ano de aprendizado tributário com fatura simbólica. Erros cometidos agora não custam dinheiro este ano, mas se materializam em 2027 em forma de glosas, recolhimentos a maior e perda de crédito legítimo.</p>

<h2>O que pode dar errado já agora</h2>

<p>Mesmo dentro de um período de teste, a operação fiscal real está rodando. Os problemas que mais aparecem nas empresas que passam pelo nosso acompanhamento:</p>

<ul>
<li><strong>Rejeição de NF-e na SEFAZ</strong>. Falta de cClassTrib ou base de IBS/CBS faz a nota retornar com erro. Operação parada, cliente esperando, equipe interrompendo a rotina para corrigir cadastro item por item.</li>
<li><strong>Classificação tributária divergente do CNAE</strong>. O cClassTrib precisa ser compatível com a atividade declarada no cadastro da empresa. Códigos genéricos ou desatualizados resultam em rejeição automática.</li>
<li><strong>Inconsistência entre NF-e e EFD</strong>. O que sai pela nota precisa entrar na EFD ICMS/IPI e na EFD-Contribuições com os mesmos valores. Diferenças disparam alerta no programa Receita Sintonia, com efeito na classificação fiscal da empresa.</li>
<li><strong>Crédito não aproveitado ou tomado a maior</strong>. O adquirente que recebe nota com classificação errada perde o direito de crédito ou se credita em valor incorreto. Em 2026 o impacto é diluído pela compensação; em 2027, vira ajuste obrigatório.</li>
<li><strong>Contratos comerciais sem cláusula de transição</strong>. Acordos de longo prazo assinados sem prever o repasse do IBS e da CBS resultam em margem comprimida quando a alíquota plena entrar em vigor.</li>
</ul>

<h2>O cronograma de transição até 2033</h2>

<p>Para empresários que precisam <a href="/servicos-contabeis/planejamento-tributario">planejar caixa, contratos e investimentos</a>, o calendário oficial é claro:</p>

<ul>
<li><strong>2026</strong>: ano de teste. IBS a 0,1% e CBS a 0,9%, ambos compensáveis.</li>
<li><strong>2027</strong>: extinção de PIS e COFINS. CBS em vigor com alíquota plena. ICMS e ISS começam a ser reduzidos.</li>
<li><strong>2029 a 2032</strong>: redução progressiva de ICMS e ISS na proporção de 10%, 20%, 30% e 40% por ano. IBS é elevado na mesma medida.</li>
<li><strong>2033</strong>: extinção total de ICMS e ISS. IBS em alíquota plena.</li>
</ul>

<p>A alíquota nominal combinada de IBS e CBS em regime pleno está estimada entre 26% e 28%, ainda em definição final pelo Senado Federal. Setores específicos têm percentuais diferenciados, com redução de até 60% para itens essenciais e tratamentos próprios para serviços de saúde, educação, transporte coletivo e atividades agropecuárias.</p>

<h2>O que sua empresa precisa revisar agora</h2>

<p>Sem painel admin nem orientação técnica, a tendência é deixar para 2027. Isso é o erro mais caro. Os passos que recomendamos a clientes em São Paulo, em ordem de prioridade:</p>

<ol>
<li><strong>Atualizar o ERP e o emissor de notas</strong>. Verificar com o fornecedor a versão instalada e confirmar que ela contempla os campos novos da NF-e e da NFS-e padrão nacional. Quem usa sistema próprio precisa adequar o leiaute oficial.</li>
<li><strong>Revisar o cadastro de produtos e serviços</strong>. Cada item precisa ter cClassTrib correto, compatível com o CNAE da empresa e com a tributação prevista para a atividade.</li>
<li><strong>Conciliar mensalmente NF-e, EFD e DCTF</strong>. Diferenças resolvidas dentro do mês de competência são ajuste contábil. Diferenças que se acumulam viram autuação.</li>
<li><strong>Treinar a equipe fiscal na lógica do destino</strong>. O time interno ou o BPO contábil precisa entender que IBS é tributo no destino. Operações interestaduais mudam de forma significativa.</li>
<li><strong>Revisar contratos com vigência além de 2027</strong>. Incluir cláusula de neutralidade fiscal: quem responde pelo aumento de carga, como se calcula o repasse, em qual prazo.</li>
<li><strong>Acompanhar atos do Comitê Gestor do IBS e da Receita Federal</strong>. As regras infralegais continuam sendo publicadas. O que vale em janeiro pode mudar em julho.</li>
</ol>

<h2>Olhando para 2027 sem sustos</h2>

<p>A reforma tributária é a maior mudança na sistemática de impostos sobre consumo no Brasil desde 1988, com efeitos que variam por setor. Para <a href="/blog/reforma-tributaria-prestadores-de-servico-sao-paulo">prestadores de serviço em São Paulo</a>, o impacto é particularmente sensível, dada a transição entre ISS municipal e o IVA dual. Tratar 2026 como ano de calibração técnica, e não como ano sem importância, é a diferença entre uma transição administrativa e um problema de margem que aparece junto com o primeiro mês de CBS plena.</p>

<p>O acompanhamento contábil ativo, com revisão periódica de cadastros, <a href="/servicos-contabeis/gestao-fiscal-e-tributaria">conciliação mensal entre obrigações</a> e leitura interpretada da legislação, é o que evita que a empresa descubra o problema apenas quando ele virar dinheiro. Empresas em São Paulo que estruturam essa rotina agora chegam em 2027 sem ajuste retroativo, sem glosa e sem disputa comercial com cliente ou fornecedor.</p>
$html$,
  NULL,
  '/images/blog/ibs-cbs-notas-fiscais-2026.webp',
  'Imagem editorial sobre IBS e CBS na emissão de notas fiscais a partir de 2026',
  'published',
  '2026-04-08T10:00:00-03:00',
  (SELECT id FROM authors WHERE slug = 'danilo-brito'),
  (SELECT id FROM blog_categories WHERE slug = 'fiscal'),
  'IBS e CBS na nota fiscal em 2026 | DM2 Contabilidade',
  'O que mudou na NF-e e NFS-e com o IBS e a CBS em 2026. Campos novos, alíquotas de teste e pontos de atenção para empresas em São Paulo.',
  NULL,
  'IBS e CBS na nota fiscal em 2026',
  'O que mudou na rotina fiscal com o IVA dual brasileiro e como adequar a emissão de NF-e e NFS-e nas empresas.',
  '/images/blog/ibs-cbs-notas-fiscais-2026.webp',
  true, true,
  'IBS CBS nota fiscal 2026',
  ARRAY['reforma tributária 2026', 'IVA dual Brasil', 'EC 132/2023', 'LC 214/2025', 'NF-e 2026', 'cClassTrib'],
  'informational',
  'DM2 Contabilidade',
  'São Paulo',
  true, false, '2026-04-08T10:00:00-03:00', true,
  true, 1, false,
  9,
  'gestao-fiscal-e-tributaria', NULL
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  excerpt = EXCLUDED.excerpt,
  content_html = EXCLUDED.content_html,
  cover_image_url = EXCLUDED.cover_image_url,
  cover_image_alt = EXCLUDED.cover_image_alt,
  status = EXCLUDED.status,
  published_at = EXCLUDED.published_at,
  author_id = EXCLUDED.author_id,
  category_id = EXCLUDED.category_id,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  og_title = EXCLUDED.og_title,
  og_description = EXCLUDED.og_description,
  og_image_url = EXCLUDED.og_image_url,
  primary_keyword = EXCLUDED.primary_keyword,
  secondary_keywords = EXCLUDED.secondary_keywords,
  search_intent = EXCLUDED.search_intent,
  entity_focus = EXCLUDED.entity_focus,
  local_focus = EXCLUDED.local_focus,
  faq_enabled = EXCLUDED.faq_enabled,
  is_evergreen = EXCLUDED.is_evergreen,
  last_reviewed_at = EXCLUDED.last_reviewed_at,
  technical_reviewed_by_author = EXCLUDED.technical_reviewed_by_author,
  featured_on_home = EXCLUDED.featured_on_home,
  featured_order = EXCLUDED.featured_order,
  read_time_minutes = EXCLUDED.read_time_minutes,
  related_service_slug = EXCLUDED.related_service_slug,
  updated_at = now();

DELETE FROM blog_post_faqs
WHERE post_id = (SELECT id FROM blog_posts WHERE slug = 'ibs-cbs-notas-fiscais-2026-empresas-sao-paulo');

INSERT INTO blog_post_faqs (post_id, question, answer, sort_order) VALUES
  ((SELECT id FROM blog_posts WHERE slug = 'ibs-cbs-notas-fiscais-2026-empresas-sao-paulo'),
   'A alíquota de teste do IBS e da CBS em 2026 gera custo financeiro para a empresa?',
   'Em regra, não. Os 0,1% de IBS e 0,9% de CBS apurados em 2026 são compensáveis contra outros tributos, como PIS e COFINS, dentro das regras de transição da Lei Complementar 214/2025. O impacto financeiro é próximo de zero. O impacto operacional, no preenchimento da NF-e e na escrituração, é alto.',
   1),
  ((SELECT id FROM blog_posts WHERE slug = 'ibs-cbs-notas-fiscais-2026-empresas-sao-paulo'),
   'O que acontece se a empresa não preencher os novos campos da NF-e em 2026?',
   'A nota é rejeitada pela SEFAZ na hora da autorização. Sem os campos de cClassTrib, base e alíquota de IBS e CBS, o documento fiscal não é validado, e a venda não pode ser registrada. Isso paralisa a operação até a correção do cadastro de produtos e do emissor.',
   2),
  ((SELECT id FROM blog_posts WHERE slug = 'ibs-cbs-notas-fiscais-2026-empresas-sao-paulo'),
   'O Simples Nacional também é afetado pela reforma tributária em 2026?',
   'Sim, mas de forma mais branda. As empresas do Simples continuam apurando os tributos pelo regime unificado, com regras específicas de transição que permitem destacar IBS e CBS na nota fiscal para que o adquirente possa se creditar. A escolha entre permanecer no Simples ou migrar para o regime regular passa a depender também desse fator.',
   3),
  ((SELECT id FROM blog_posts WHERE slug = 'ibs-cbs-notas-fiscais-2026-empresas-sao-paulo'),
   'Por que o IBS é considerado um imposto no destino e por que isso muda a forma de calcular?',
   'No ICMS, o tributo é repartido entre origem e destino em vendas interestaduais. No IBS, o imposto pertence integralmente ao estado e ao município de destino. Isso simplifica a apuração, mas exige cadastro correto da localização do destinatário em cada nota fiscal.',
   4),
  ((SELECT id FROM blog_posts WHERE slug = 'ibs-cbs-notas-fiscais-2026-empresas-sao-paulo'),
   'O que a DM2 recomenda para empresas em São Paulo se prepararem para 2027?',
   'Tratar 2026 como ano de ajuste técnico, não como ano de teste sem importância. Validar mensalmente o preenchimento dos novos campos, revisar a classificação fiscal de produtos e serviços, treinar a equipe interna na lógica do destino e revisar contratos comerciais. A diferença entre uma transição tranquila e um problema de caixa em 2027 está nos cadastros que se corrigem agora.',
   5);

DELETE FROM blog_post_related_services
WHERE post_id = (SELECT id FROM blog_posts WHERE slug = 'ibs-cbs-notas-fiscais-2026-empresas-sao-paulo');

INSERT INTO blog_post_related_services (post_id, service_slug, sort_order) VALUES
  ((SELECT id FROM blog_posts WHERE slug = 'ibs-cbs-notas-fiscais-2026-empresas-sao-paulo'), 'gestao-fiscal-e-tributaria', 1),
  ((SELECT id FROM blog_posts WHERE slug = 'ibs-cbs-notas-fiscais-2026-empresas-sao-paulo'), 'planejamento-tributario', 2),
  ((SELECT id FROM blog_posts WHERE slug = 'ibs-cbs-notas-fiscais-2026-empresas-sao-paulo'), 'consultoria-contabil', 3);


-- ===============================================================
-- Post 2 — PUBLISHED — Receita Sintonia em 2026
-- ===============================================================

INSERT INTO blog_posts (
  slug, title, subtitle, excerpt, content_html, content_json,
  cover_image_url, cover_image_alt,
  status, published_at,
  author_id, category_id,
  seo_title, seo_description, canonical_url,
  og_title, og_description, og_image_url,
  robots_index, robots_follow,
  primary_keyword, secondary_keywords, search_intent,
  entity_focus, local_focus,
  faq_enabled, is_evergreen, last_reviewed_at, technical_reviewed_by_author,
  featured_on_home, featured_order, is_pillar,
  read_time_minutes,
  related_service_slug, related_specialty_slug
) VALUES (
  'receita-sintonia-2026-classificacao-fiscal-empresas',
  'Receita Sintonia em 2026: como a nova classificação da Receita afeta sua empresa',
  'O programa de conformidade da Receita Federal entra em ano cheio e passa a influenciar prazos, restituições e fiscalização.',
  'O Receita Sintonia classifica empresas de A+ a D conforme o histórico de cumprimento de obrigações. Em 2026, a nota da empresa começa a ter efeitos práticos visíveis: prioridade em restituições, agilidade em processos e menor exposição à malha. Entenda como funciona.',
  $html$
<p>O <strong>Receita Sintonia</strong> é o programa de classificação de conformidade da Receita Federal, criado pela Portaria RFB 297/2024 e expandido ao longo de 2025. A cada contribuinte, pessoa jurídica ou pessoa física, é atribuída uma nota que vai de <strong>A+</strong> (melhor histórico) a <strong>D</strong> (pior), com base no cumprimento de obrigações tributárias principais e acessórias. A nota é dinâmica e muda conforme o comportamento fiscal recente.</p>

<p>Em 2026, o programa deixou de ter caráter apenas informativo. A faixa em que a sua empresa está hoje começa a determinar prazos de restituição, prioridade em processos administrativos, exposição à malha e até elegibilidade em algumas licitações. Em outras palavras, o Receita Sintonia virou um indicador operacional que qualquer empresa que opera no Brasil precisa monitorar.</p>

<p>Para empresas em São Paulo, o efeito é mais visível porque convivem com três camadas de fisco (federal, estadual e municipal) que cada vez mais cruzam dados entre si. Inconsistência em uma se reflete na nota do outro.</p>

<h2>Como a Receita avalia o contribuinte</h2>

<p>A classificação considera quatro grupos de critérios, com pesos calibrados pela Receita Federal:</p>

<ul>
<li><strong>Cadastro</strong>: situação cadastral ativa, inscrições estaduais e municipais regulares, dados consistentes de CNAE, quadro societário e endereço, ausência de pendências em filiais.</li>
<li><strong>Pagamento</strong>: pontualidade no recolhimento de tributos federais (DARF e DARF Numerado), parcelamentos em dia, ausência de débitos exigíveis em aberto.</li>
<li><strong>Declarações</strong>: entrega no prazo de DCTF/DCTFWeb, EFD-Contribuições, ECF, ECD, DIRF até 2025, eSocial e demais obrigações acessórias federais.</li>
<li><strong>Aderência</strong>: consistência entre o que a empresa declara e o que terceiros declaram. Inclui <a href="/blog/ibs-cbs-notas-fiscais-2026-empresas-sao-paulo">notas fiscais emitidas e recebidas</a> com os campos novos de IBS e CBS, eSocial, e-Financeira, DIMOB e cruzamentos automáticos da malha.</li>
</ul>

<p>A nota é exibida no e-CAC dentro do perfil do contribuinte e pode ser consultada pelo responsável legal com certificado digital ou por procurador eletrônico habilitado. A frequência de atualização é mensal.</p>

<h2>As cinco faixas e o que cada uma significa</h2>

<p>Em ordem decrescente de conformidade, a empresa pode ocupar uma destas posições:</p>

<ul>
<li><strong>A+</strong>: histórico impecável, sem pendências relevantes nos últimos doze meses, com cruzamentos consistentes. Recebe os benefícios máximos do programa.</li>
<li><strong>A</strong>: histórico muito bom, eventualmente com pequenas inconsistências regularizadas no prazo. Tratamento similar ao A+ na maior parte dos casos.</li>
<li><strong>B</strong>: histórico regular, com algumas pendências ou atrasos, mas dentro de padrão administrável. É a faixa em que se encontra a maior parte das empresas brasileiras hoje.</li>
<li><strong>C</strong>: histórico irregular, com pendências recorrentes ou atrasos relevantes. Sinal de alerta. A empresa começa a ter tratamento mais rigoroso da Receita.</li>
<li><strong>D</strong>: histórico crítico. A empresa tem prioridade de fiscalização, restituição represada, dificuldade em obter certidões e maior probabilidade de exigência fiscal.</li>
</ul>

<h2>Os efeitos práticos da nota em 2026</h2>

<p>Os diferenciais por faixa publicados ou em fase de implementação ao longo deste ano incluem:</p>

<ul>
<li><strong>Prioridade em restituições e ressarcimentos</strong>. Empresas em A+ e A têm pedidos processados em prazo menor. Empresas em D vão para o final da fila e enfrentam exigências adicionais.</li>
<li><strong>Tramitação preferencial em processos administrativos</strong>. Retificação de declarações, revisão de débitos e regularização de pendências têm fila própria para contribuintes em conformidade.</li>
<li><strong>Menor exposição à malha automática</strong>. A Receita usa a classificação para priorizar quem fiscalizar primeiro, com base em risco. Quem está em A+ e A é menos selecionado.</li>
<li><strong>Auto-regularização sem auto de infração</strong>. Inconsistências menores detectadas em empresas A+ e A são tratadas em via simplificada, com prazo para correção e sem penalidade imediata.</li>
<li><strong>Critério de desempate em licitações</strong>. Algumas concorrências, especialmente em órgãos federais, passaram a exigir classificação mínima B no Receita Sintonia ou utilizam o programa como critério de pontuação.</li>
<li><strong>Velocidade na emissão de certidões</strong>. Embora as certidões continuem sendo emitidas conforme a legislação própria, o tempo médio é sensivelmente menor para empresas em conformidade.</li>
</ul>

<h2>O que tira pontos sem você perceber</h2>

<p>A maior parte das quedas de faixa não vem de problemas grandes. Vem de pequenos descompassos operacionais que antes eram tratados como deslize aceitável:</p>

<ol>
<li>Atraso na entrega de obrigações acessórias, mesmo de poucos dias.</li>
<li>Pagamento de DARF fora do prazo, ainda que com multa e juros recolhidos corretamente.</li>
<li>Diferenças entre EFD-Contribuições e DCTF que ficam em aberto entre meses.</li>
<li><a href="/blog/esocial-2026-novas-aliquotas-previdenciarias-folha">Diferenças entre eSocial e DCTFWeb</a> na apuração da contribuição previdenciária.</li>
<li>Notas fiscais emitidas pela empresa que não batem com o que o cliente declara como compra (ou vice-versa).</li>
<li>NF-e canceladas fora do prazo regulamentar de 24 horas.</li>
<li>Inscrições secundárias ou filiais com pendências cadastrais ignoradas pela matriz.</li>
<li>Procuradores eletrônicos com poderes vencidos, gerando bloqueio em obrigações.</li>
</ol>

<p>O ponto importante é que erro de digitação, retificação fora de prazo ou esquecimento operacional, que antes custava uma multa simbólica, hoje compromete a nota da empresa. E essa nota define o tratamento que a Receita dá em todos os outros pontos de contato.</p>

<h2>Como subir de faixa de forma sustentável</h2>

<p>O Receita Sintonia premia consistência, não esforço pontual. Subir de B para A, ou de A para A+, exige <a href="/servicos-contabeis/gestao-fiscal-e-tributaria">rotina contábil e fiscal calibrada</a>, não uma corrida de regularização em dezembro. Na nossa experiência com clientes em São Paulo, os pilares que efetivamente movem a nota são:</p>

<ul>
<li><strong>Calendário fiscal antecipado</strong>. Obrigações entregues sempre antes do prazo, com revisão anterior ao envio, e não em cima da hora.</li>
<li><strong>Pagamento de tributos automatizado</strong>. Agendamento bancário com data anterior ao vencimento, eliminando o risco de atraso por falha humana ou indisponibilidade do sistema bancário.</li>
<li><strong>Conciliação cruzada mensal</strong>. Verificação sistemática entre o que se emite (NF-e, NFS-e, eSocial) e o que se declara (EFD, DCTFWeb, ECF). Diferenças resolvidas dentro do mês de competência são ajuste contábil; diferenças que se acumulam viram autuação.</li>
<li><strong>Monitoramento mensal do score no e-CAC</strong>. Quando a classificação cai, a investigação da causa é simples se feita no mês seguinte. Difícil quando se descobre meses depois.</li>
<li><strong>Procuradores eletrônicos atualizados</strong>. Garantir que o contador e demais responsáveis tenham os poderes vigentes e renovação programada.</li>
</ul>

<h2>O caso específico de empresas em São Paulo</h2>

<p>Empresas paulistas operam com camadas adicionais que outras unidades da federação não têm na mesma intensidade. Além das obrigações federais que alimentam o Receita Sintonia diretamente, há o SPED Fiscal estadual (ICMS), a NFS-e municipal (ISS, em transição para o padrão nacional), o Domicílio Eletrônico do Contribuinte estadual (DEC) e o Domicílio Tributário Eletrônico federal (DTE).</p>

<p>A consistência cruzada entre essas obrigações federais, estaduais e municipais é hoje um dos principais pontos de queda na nota. Empresa que apura ICMS de um jeito no SPED estadual e reflete diferente na EFD federal acaba aparecendo como inconsistência no cruzamento automático da Receita.</p>

<h2>Quando a empresa precisa agir e quando o contador resolve</h2>

<p>O Receita Sintonia gerou uma divisão clara entre o que cabe à empresa e o que cabe à contabilidade. Decisões cadastrais (alteração de quadro societário, mudança de endereço, inclusão de CNAE), pagamento dentro do prazo e respostas a notificações são responsabilidade da empresa. Cálculo correto, conciliação entre obrigações, retificação técnica e leitura da nota mensal são responsabilidade do contador.</p>

<p>O ponto que mais aparece em consulta com clientes em São Paulo é o seguinte: a empresa só descobre que caiu de faixa quando precisa de uma certidão urgente, ou quando perde uma licitação por classificação insuficiente. A essa altura, recuperar a nota leva meses. O <a href="/servicos-contabeis/consultoria-contabil">monitoramento mensal</a> antecipa o problema enquanto ele ainda é correção operacional, e não reorganização.</p>

<p>Para clientes da DM2, o acompanhamento do Receita Sintonia faz parte da rotina mensal de fechamento, com conferência da nota antes do encerramento da apuração. Empresas que entram em faixa D enfrentam dificuldade real para sair sem uma reorganização contábil ampla, com custo de tempo e dinheiro que a prevenção evita por completo.</p>
$html$,
  NULL,
  '/images/blog/receita-sintonia-2026.webp',
  'Imagem editorial sobre o programa Receita Sintonia e a classificação fiscal de empresas em 2026',
  'published',
  '2026-04-15T10:00:00-03:00',
  (SELECT id FROM authors WHERE slug = 'danilo-brito'),
  (SELECT id FROM blog_categories WHERE slug = 'tributario'),
  'Receita Sintonia em 2026: o que muda para sua empresa | DM2',
  'Como o Receita Sintonia classifica empresas em 2026 e quais os efeitos práticos da nota A+, A, B, C ou D na rotina fiscal.',
  NULL,
  'Receita Sintonia em 2026',
  'O programa de conformidade da Receita passa a ter efeito prático em restituições, fiscalização e processos administrativos.',
  '/images/blog/receita-sintonia-2026.webp',
  true, true,
  'Receita Sintonia 2026',
  ARRAY['conformidade tributária', 'classificação Receita Federal', 'malha fiscal', 'e-CAC', 'compliance fiscal'],
  'informational',
  'DM2 Contabilidade',
  'São Paulo',
  true, false, '2026-04-15T10:00:00-03:00', true,
  true, 2, false,
  8,
  'planejamento-tributario', NULL
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  excerpt = EXCLUDED.excerpt,
  content_html = EXCLUDED.content_html,
  cover_image_url = EXCLUDED.cover_image_url,
  cover_image_alt = EXCLUDED.cover_image_alt,
  status = EXCLUDED.status,
  published_at = EXCLUDED.published_at,
  author_id = EXCLUDED.author_id,
  category_id = EXCLUDED.category_id,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  og_title = EXCLUDED.og_title,
  og_description = EXCLUDED.og_description,
  og_image_url = EXCLUDED.og_image_url,
  primary_keyword = EXCLUDED.primary_keyword,
  secondary_keywords = EXCLUDED.secondary_keywords,
  search_intent = EXCLUDED.search_intent,
  entity_focus = EXCLUDED.entity_focus,
  local_focus = EXCLUDED.local_focus,
  faq_enabled = EXCLUDED.faq_enabled,
  is_evergreen = EXCLUDED.is_evergreen,
  last_reviewed_at = EXCLUDED.last_reviewed_at,
  technical_reviewed_by_author = EXCLUDED.technical_reviewed_by_author,
  featured_on_home = EXCLUDED.featured_on_home,
  featured_order = EXCLUDED.featured_order,
  read_time_minutes = EXCLUDED.read_time_minutes,
  related_service_slug = EXCLUDED.related_service_slug,
  updated_at = now();

DELETE FROM blog_post_faqs
WHERE post_id = (SELECT id FROM blog_posts WHERE slug = 'receita-sintonia-2026-classificacao-fiscal-empresas');

INSERT INTO blog_post_faqs (post_id, question, answer, sort_order) VALUES
  ((SELECT id FROM blog_posts WHERE slug = 'receita-sintonia-2026-classificacao-fiscal-empresas'),
   'Onde a empresa consulta a classificação do Receita Sintonia?',
   'A classificação fica disponível no portal e-CAC, dentro do perfil do contribuinte. A consulta pode ser feita pelo responsável legal com certificado digital ou por procurador eletrônico habilitado. A nota é atualizada periodicamente pela Receita Federal.',
   1),
  ((SELECT id FROM blog_posts WHERE slug = 'receita-sintonia-2026-classificacao-fiscal-empresas'),
   'O Receita Sintonia substitui o CADIN e a Certidão Negativa de Débitos?',
   'Não. CADIN e CND continuam existindo como instrumentos próprios. O Receita Sintonia é uma camada adicional de avaliação, focada em comportamento fiscal contínuo, e não apenas na existência de débitos em aberto.',
   2),
  ((SELECT id FROM blog_posts WHERE slug = 'receita-sintonia-2026-classificacao-fiscal-empresas'),
   'Empresas do Simples Nacional também são classificadas?',
   'Sim. O programa abrange todas as pessoas jurídicas com obrigações na Receita Federal, inclusive optantes do Simples Nacional. A diferença é que os critérios consideram as obrigações próprias do regime, como o PGDAS-D e a DEFIS.',
   3),
  ((SELECT id FROM blog_posts WHERE slug = 'receita-sintonia-2026-classificacao-fiscal-empresas'),
   'Quanto tempo demora para subir de faixa?',
   'Depende da causa da queda. Atrasos isolados costumam ser absorvidos em três a seis meses de comportamento regular. Inconsistências estruturais (divergências entre obrigações, débitos antigos) exigem ação direta para serem corrigidas e podem levar mais tempo, conforme o ciclo de avaliação da Receita.',
   4),
  ((SELECT id FROM blog_posts WHERE slug = 'receita-sintonia-2026-classificacao-fiscal-empresas'),
   'Como a DM2 acompanha o Receita Sintonia dos clientes?',
   'A consulta da classificação faz parte da rotina mensal de monitoramento contábil. Quando há queda na nota, a equipe identifica a causa imediata (atraso, divergência ou pendência) e propõe a correção dentro do mês seguinte, evitando que o problema se acumule e migre para faixas inferiores.',
   5);

DELETE FROM blog_post_related_services
WHERE post_id = (SELECT id FROM blog_posts WHERE slug = 'receita-sintonia-2026-classificacao-fiscal-empresas');

INSERT INTO blog_post_related_services (post_id, service_slug, sort_order) VALUES
  ((SELECT id FROM blog_posts WHERE slug = 'receita-sintonia-2026-classificacao-fiscal-empresas'), 'planejamento-tributario', 1),
  ((SELECT id FROM blog_posts WHERE slug = 'receita-sintonia-2026-classificacao-fiscal-empresas'), 'gestao-fiscal-e-tributaria', 2),
  ((SELECT id FROM blog_posts WHERE slug = 'receita-sintonia-2026-classificacao-fiscal-empresas'), 'consultoria-contabil', 3);


-- ===============================================================
-- Post 3 — PUBLISHED — Abertura de empresa em São Paulo em 2026
-- ===============================================================

INSERT INTO blog_posts (
  slug, title, subtitle, excerpt, content_html, content_json,
  cover_image_url, cover_image_alt,
  status, published_at,
  author_id, category_id,
  seo_title, seo_description, canonical_url,
  og_title, og_description, og_image_url,
  robots_index, robots_follow,
  primary_keyword, secondary_keywords, search_intent,
  entity_focus, local_focus,
  faq_enabled, is_evergreen, last_reviewed_at, technical_reviewed_by_author,
  featured_on_home, featured_order, is_pillar,
  read_time_minutes,
  related_service_slug, related_specialty_slug
) VALUES (
  'abertura-de-empresa-em-sao-paulo-regime-tributario-2026',
  'Abertura de empresa em São Paulo em 2026: o que revisar antes de escolher o regime tributário',
  'A escolha entre Simples, Presumido e Lucro Real ganhou nova camada com a reforma tributária.',
  'Abrir empresa em São Paulo em 2026 envolve as etapas tradicionais de JUCESP, Receita e Prefeitura, mas a decisão tributária mudou: o IBS e a CBS passaram a influenciar diretamente a escolha do regime. Entenda o que considerar antes de definir o enquadramento.',
  $html$
<p>Abrir uma empresa em São Paulo em 2026 mantém a estrutura administrativa conhecida: Junta Comercial (JUCESP), Receita Federal, Prefeitura, alvará e, conforme a atividade, inscrição estadual e municipal. O que mudou foi o que vem antes do registro: a decisão tributária. A reforma tributária do consumo, em vigor desde janeiro de 2026, transformou a escolha do regime em uma análise mais técnica e menos automática do que costumava ser.</p>

<p>O resumo prático: o caminho de papel é parecido com o de 2025, mas a decisão de fundo (natureza jurídica, CNAE e regime) precisa ser tomada com simulação numérica, e não com regra de bolso. Quem abre empresa em 2026 sem essa simulação está, na maioria dos casos, fixando uma estrutura que vai precisar de alteração contratual e novas taxas em até dois anos.</p>

<p>Este artigo descreve a sequência completa de abertura no contexto atual, com foco no que mais muda de decisão antes mesmo do primeiro protocolo na JUCESP. Empresas com sede em São Paulo capital ou na Grande São Paulo têm camadas próprias (zoneamento, alvará, NFS-e municipal) que entram no roteiro.</p>

<h2>O que mudou na decisão antes mesmo de abrir</h2>

<p>Até 2025, a sequência típica era: escolher tipo societário, registrar, inscrever, optar pelo Simples Nacional como default. Em 2026, essa sequência ainda funciona para muitos casos, mas três pontos passaram a exigir análise técnica desde o primeiro dia:</p>

<ul>
<li>O CNAE define a classificação tributária do IBS e da CBS (cClassTrib) que vai aparecer em cada nota fiscal emitida. CNAE escolhido por aproximação custa caro depois.</li>
<li>O regime tributário não é mais decisão isolada da empresa: depende de quem é o cliente. Vendas para empresas no regime regular criam efeito de crédito que pode tornar o Simples menos competitivo.</li>
<li>O tipo societário interage com regimes específicos do IBS e da CBS para profissões intelectuais (advogados, médicos, contadores, arquitetos, dentistas), com possibilidade de alíquota reduzida em determinadas estruturas.</li>
</ul>

<h2>1. Definir a natureza jurídica</h2>

<p>A primeira definição, antes de qualquer protocolo, é a natureza jurídica. As opções mais usadas em 2026 são:</p>

<ul>
<li><strong>MEI (Microempreendedor Individual)</strong>: faturamento anual até R$ 81.000, atividade autorizada na lista do CGSN, sem sócios. Caminho mais simples, com recolhimento fixo mensal e burocracia reduzida.</li>
<li><strong>EI (Empresário Individual)</strong>: pessoa física que exerce atividade empresarial em nome próprio. Responsabilidade ilimitada: não há separação entre patrimônio pessoal e da empresa.</li>
<li><strong>SLU (Sociedade Limitada Unipessoal)</strong>: pessoa jurídica com um único sócio e separação patrimonial. Substituiu a EIRELI desde 2021 e é hoje a opção mais usada por profissional liberal ou pequeno empresário sem sócio.</li>
<li><strong>LTDA (Sociedade Limitada)</strong>: dois ou mais sócios, com contrato social definindo quotas, administração e responsabilidades. Estrutura padrão para empresa com sócios.</li>
<li><strong>SA (Sociedade Anônima)</strong>: para empresas maiores ou que preveem entrada de investidores. Mais formal, com obrigações próprias de governança.</li>
</ul>

<p>A escolha não é só formal. Define quem responde por dívidas, como o lucro é distribuído e como a empresa pode receber novos sócios ou capital de fora. Para profissão regulamentada, a escolha tem ainda implicação tributária direta no regime específico aplicável.</p>

<h2>2. Definir o CNAE com cuidado real</h2>

<p>O CNAE (Classificação Nacional de Atividades Econômicas) determina vários efeitos em cadeia: tributação, possibilidade de optar pelo Simples, regimes específicos no IBS e na CBS, alíquota de ISS aplicável, exigência de alvarás e licenças, e até a possibilidade de receber benefícios setoriais.</p>

<p>Em 2026, o CNAE ganhou peso adicional porque a classificação tributária do IBS e da CBS (cClassTrib) é vinculada à atividade declarada. Empresas com CNAE secundário mal definido têm a classificação fiscal incorreta, o que afeta diretamente o preenchimento da nota fiscal e o regime aplicável.</p>

<p>O cuidado prático: definir um CNAE principal que reflita o que a empresa efetivamente faz (não o que pretende fazer no longo prazo) e cadastrar todos os CNAEs secundários relevantes desde o início. Adicionar depois é possível, mas implica alteração contratual, novas taxas e, em alguns casos, novo alvará.</p>

<h2>3. Escolher o regime tributário com a reforma em mente</h2>

<p>Os três regimes principais continuam existindo. A novidade em 2026 é que a interação de cada um com o IBS e a CBS muda completamente o cálculo de viabilidade.</p>

<h3>Simples Nacional</h3>

<p>Mantém o recolhimento unificado, com <a href="/blog/simples-nacional-2027-prazos-opcao-ibs-cbs">regra de transição própria</a>. A empresa do Simples passa a poder destacar IBS e CBS na nota fiscal para que o adquirente se credite. Mas o crédito é limitado: corresponde à alíquota efetiva do Simples, não à alíquota cheia do regime regular. Empresas do Simples que vendem para outras empresas (B2B) precisam avaliar se a vantagem do regime unificado compensa a perda de competitividade pelo crédito menor.</p>

<h3>Lucro Presumido</h3>

<p>Continua como opção para empresas com faturamento até R$ 78 milhões por ano. A apuração de IBS e CBS segue o regime regular, com débito sobre vendas e crédito sobre compras. É vantajoso para empresas com margem bruta alta e poucos custos creditáveis (consultoria, serviços profissionais sem insumos relevantes).</p>

<h3>Lucro Real</h3>

<p>Obrigatório para empresas com faturamento acima de R$ 78 milhões e para algumas atividades específicas (instituições financeiras, factoring, securitizadoras). No IBS e na CBS, é o regime em que o sistema de débito e crédito funciona de forma mais completa, com aproveitamento integral de créditos sobre insumos, energia, aluguel e prestadores.</p>

<h2>4. JUCESP, Receita e Prefeitura na prática</h2>

<p>Definidos natureza jurídica, CNAE e regime, o fluxo de registro em São Paulo segue pela plataforma REDESIM, integrada entre os entes:</p>

<ol>
<li><strong>Consulta de viabilidade</strong>. Confirma se o nome empresarial está disponível e se o endereço é elegível para a atividade pretendida (zoneamento e uso do solo, no caso da capital).</li>
<li><strong>Registro do contrato social ou requerimento de empresário</strong> na JUCESP, com pagamento da taxa estadual.</li>
<li><strong>CNPJ</strong> emitido pela Receita Federal, automaticamente após o deferimento da JUCESP.</li>
<li><strong>Inscrição estadual</strong> (SEFAZ-SP), quando a atividade envolve circulação de mercadorias ou demais hipóteses do RICMS.</li>
<li><strong>Inscrição municipal e CCM</strong> (Cadastro de Contribuintes Mobiliários) na Prefeitura de São Paulo, via Sistema Único da Prefeitura (SUP).</li>
<li><strong>Alvará de funcionamento</strong> e licenças específicas conforme atividade: sanitária (Vigilância), ambiental (CETESB), bombeiros (AVCB), publicitária, entre outras.</li>
<li><strong>Opção pelo regime tributário</strong> no Portal do Simples Nacional, dentro do prazo legal: até o último dia útil de janeiro do exercício, para empresas em atividade; até 30 dias após o deferimento da inscrição estadual ou municipal, para empresas novas.</li>
</ol>

<p>O processo, em São Paulo, costuma levar entre 7 e 30 dias úteis com acompanhamento contábil ativo. Atividades que exigem licenças sanitária ou ambiental podem se estender por mais tempo. Sem acompanhamento, é comum o prazo dobrar por exigências da Junta, da Prefeitura ou da SEFAZ.</p>

<h2>5. Os erros mais comuns em 2026 (com solução)</h2>

<p>Mesmo com a digitalização da REDESIM, alguns erros persistem e custam tempo e dinheiro depois:</p>

<ul>
<li><strong>Endereço residencial em zona restrita</strong>. Atividades comerciais têm limitação em zonas estritamente residenciais da capital. A consulta prévia de viabilidade é o que define elegibilidade.</li>
<li><strong>Opção pelo Simples sem simular o regime regular</strong>. Em B2B, o crédito menor pode tornar a permanência no Simples menos vantajosa. Simulação comparada é obrigatória.</li>
<li><strong>CNAEs secundários esquecidos</strong>. Faturar atividade não cadastrada gera autuação e exige alteração contratual. Melhor cadastrar todos os relevantes desde o início.</li>
<li><strong>Operação antes do alvará definitivo</strong>. Em atividades que exigem licença específica (alimentos, saúde, indústria), iniciar antes do alvará gera multa pesada da Vigilância.</li>
<li><strong>DTE não ativado</strong>. O Domicílio Tributário Eletrônico federal precisa ser ativado para receber notificações da Receita. Quem não ativa perde prazos por falta de aviso, não pode alegar desconhecimento e, em poucos meses, vê a empresa cair de faixa no <a href="/blog/receita-sintonia-2026-classificacao-fiscal-empresas">programa Receita Sintonia</a>, com efeitos práticos em fiscalização e restituições.</li>
<li><strong>Pró-labore mal definido</strong>. Sócios que retiram apenas distribuição de lucros, sem pró-labore, ficam sem cobertura previdenciária e podem ser autuados pela RFB. Definir pró-labore correto é parte do desenho inicial.</li>
</ul>

<h2>O que revisar antes de protocolar a abertura</h2>

<p>O bloco prático que recomendamos a quem está abrindo empresa em São Paulo em 2026, antes de qualquer assinatura na JUCESP:</p>

<ol>
<li>Definir natureza jurídica conforme número de sócios, perfil patrimonial e atividade.</li>
<li>Listar todos os CNAEs (principal e secundários) com base na operação real prevista.</li>
<li>Confirmar zoneamento e uso do solo do endereço escolhido.</li>
<li>Simular pelo menos dois regimes tributários (Simples e Presumido) com projeção realista de faturamento e estrutura de custos.</li>
<li>Mapear licenças e alvarás necessários conforme CNAE.</li>
<li>Definir pró-labore inicial e política de distribuição de lucros.</li>
<li>Ativar DTE federal e Domicílio Eletrônico do Contribuinte estadual logo após o CNPJ.</li>
</ol>

<h2>Quando e como o contador deve entrar</h2>

<p>A função técnica do contador na abertura não é só preencher formulários. É consultiva: definir natureza jurídica adequada ao perfil dos sócios, escolher CNAE correto, <a href="/servicos-contabeis/planejamento-tributario">simular regime tributário considerando o cenário pós-reforma</a>, organizar a estrutura para os próximos cinco anos.</p>

<p>Errar na abertura é caro. Mudar de natureza jurídica, alterar contrato social, migrar de regime fora de prazo ou corrigir CNAE depois implica taxas, prazo de espera e, em alguns casos, perda de benefícios fiscais. A DM2 <a href="/servicos-contabeis/abertura-e-regularizacao-de-empresas">acompanha a abertura em São Paulo</a> desde a definição estratégica, com foco em deixar a empresa pronta para operar e crescer sem precisar refazer o desenho fiscal antes de completar dois anos.</p>
$html$,
  NULL,
  '/images/blog/abertura-empresa-sao-paulo-2026.webp',
  'Imagem editorial sobre abertura de empresa em São Paulo e escolha de regime tributário em 2026',
  'published',
  '2026-04-22T10:00:00-03:00',
  (SELECT id FROM authors WHERE slug = 'danilo-brito'),
  (SELECT id FROM blog_categories WHERE slug = 'abertura-de-empresas'),
  'Abertura de empresa em São Paulo em 2026 | DM2 Contabilidade',
  'Como abrir empresa em São Paulo em 2026: natureza jurídica, CNAE, JUCESP, Receita, Prefeitura e o impacto do IBS e da CBS na escolha do regime tributário.',
  NULL,
  'Abertura de empresa em São Paulo em 2026',
  'O passo a passo da abertura considerando reforma tributária, regime e zoneamento em São Paulo.',
  '/images/blog/abertura-empresa-sao-paulo-2026.webp',
  true, true,
  'abrir empresa em São Paulo 2026',
  ARRAY['abertura de empresa', 'JUCESP', 'REDESIM', 'CNAE', 'Simples Nacional 2026', 'Lucro Presumido', 'reforma tributária'],
  'informational',
  'DM2 Contabilidade',
  'São Paulo',
  true, true, '2026-04-22T10:00:00-03:00', true,
  true, 3, false,
  10,
  'abertura-e-regularizacao-de-empresas', NULL
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  excerpt = EXCLUDED.excerpt,
  content_html = EXCLUDED.content_html,
  cover_image_url = EXCLUDED.cover_image_url,
  cover_image_alt = EXCLUDED.cover_image_alt,
  status = EXCLUDED.status,
  published_at = EXCLUDED.published_at,
  author_id = EXCLUDED.author_id,
  category_id = EXCLUDED.category_id,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  og_title = EXCLUDED.og_title,
  og_description = EXCLUDED.og_description,
  og_image_url = EXCLUDED.og_image_url,
  primary_keyword = EXCLUDED.primary_keyword,
  secondary_keywords = EXCLUDED.secondary_keywords,
  search_intent = EXCLUDED.search_intent,
  entity_focus = EXCLUDED.entity_focus,
  local_focus = EXCLUDED.local_focus,
  faq_enabled = EXCLUDED.faq_enabled,
  is_evergreen = EXCLUDED.is_evergreen,
  last_reviewed_at = EXCLUDED.last_reviewed_at,
  technical_reviewed_by_author = EXCLUDED.technical_reviewed_by_author,
  featured_on_home = EXCLUDED.featured_on_home,
  featured_order = EXCLUDED.featured_order,
  read_time_minutes = EXCLUDED.read_time_minutes,
  related_service_slug = EXCLUDED.related_service_slug,
  updated_at = now();

DELETE FROM blog_post_faqs
WHERE post_id = (SELECT id FROM blog_posts WHERE slug = 'abertura-de-empresa-em-sao-paulo-regime-tributario-2026');

INSERT INTO blog_post_faqs (post_id, question, answer, sort_order) VALUES
  ((SELECT id FROM blog_posts WHERE slug = 'abertura-de-empresa-em-sao-paulo-regime-tributario-2026'),
   'Quanto tempo leva para abrir uma empresa em São Paulo em 2026?',
   'Com documentação completa e acompanhamento contábil, o registro na JUCESP costuma ficar pronto em 5 a 10 dias úteis. Inscrições estadual e municipal e alvará variam conforme a atividade. No total, o processo leva de 7 a 30 dias úteis. Atividades que exigem licenças específicas (sanitária, ambiental) podem levar mais tempo.',
   1),
  ((SELECT id FROM blog_posts WHERE slug = 'abertura-de-empresa-em-sao-paulo-regime-tributario-2026'),
   'É possível abrir empresa com endereço residencial em São Paulo?',
   'Sim, em muitos casos, mas depende do zoneamento do imóvel e do CNAE da atividade. Atividades estritamente comerciais ou que envolvem trânsito de clientes não são permitidas em zonas residenciais. A consulta prévia de viabilidade na Prefeitura é o que define se o endereço é elegível.',
   2),
  ((SELECT id FROM blog_posts WHERE slug = 'abertura-de-empresa-em-sao-paulo-regime-tributario-2026'),
   'Vale a pena abrir como MEI em 2026?',
   'O MEI continua sendo a opção mais simples para quem fatura até R$ 81.000 por ano e atua sozinho. Em 2026, a transição da reforma tributária ainda não afeta diretamente o MEI, que continua com recolhimento fixo mensal. A análise vale a pena quando há perspectiva real de crescimento que ultrapasse o limite no curto prazo.',
   3),
  ((SELECT id FROM blog_posts WHERE slug = 'abertura-de-empresa-em-sao-paulo-regime-tributario-2026'),
   'Como o IBS e a CBS afetam a escolha do regime tributário?',
   'Empresas que vendem para outras empresas (B2B) precisam considerar como o adquirente vai se creditar dos tributos. No Simples Nacional, o crédito é menor que no regime regular, o que pode reduzir a competitividade em 2026 e nos anos seguintes. A simulação comparativa entre Simples e Lucro Presumido passou a ser obrigatória em qualquer abertura B2B.',
   4),
  ((SELECT id FROM blog_posts WHERE slug = 'abertura-de-empresa-em-sao-paulo-regime-tributario-2026'),
   'A DM2 acompanha a abertura ou só assume depois que a empresa está aberta?',
   'A DM2 acompanha desde a definição da estrutura, em São Paulo. Isso inclui escolha de natureza jurídica, CNAE, simulação de regime tributário, registro na JUCESP, inscrições e alvará, até a primeira folha e a primeira apuração. O objetivo é abrir certo, e não corrigir depois.',
   5);

DELETE FROM blog_post_related_services
WHERE post_id = (SELECT id FROM blog_posts WHERE slug = 'abertura-de-empresa-em-sao-paulo-regime-tributario-2026');

INSERT INTO blog_post_related_services (post_id, service_slug, sort_order) VALUES
  ((SELECT id FROM blog_posts WHERE slug = 'abertura-de-empresa-em-sao-paulo-regime-tributario-2026'), 'abertura-e-regularizacao-de-empresas', 1),
  ((SELECT id FROM blog_posts WHERE slug = 'abertura-de-empresa-em-sao-paulo-regime-tributario-2026'), 'planejamento-tributario', 2),
  ((SELECT id FROM blog_posts WHERE slug = 'abertura-de-empresa-em-sao-paulo-regime-tributario-2026'), 'consultoria-contabil', 3);


-- ===============================================================
-- Post 4 — PUBLISHED (2026-04-25) — eSocial em 2026
-- ===============================================================

INSERT INTO blog_posts (
  slug, title, subtitle, excerpt, content_html, content_json,
  cover_image_url, cover_image_alt,
  status, published_at,
  author_id, category_id,
  seo_title, seo_description, canonical_url,
  og_title, og_description, og_image_url,
  robots_index, robots_follow,
  primary_keyword, secondary_keywords, search_intent,
  entity_focus, local_focus,
  faq_enabled, is_evergreen, last_reviewed_at, technical_reviewed_by_author,
  featured_on_home, featured_order, is_pillar,
  read_time_minutes,
  related_service_slug, related_specialty_slug
) VALUES (
  'esocial-2026-novas-aliquotas-previdenciarias-folha',
  'eSocial em 2026: novas alíquotas previdenciárias e impactos na folha da empresa',
  'A retomada gradual da contribuição patronal e a integração com o FGTS Digital exigem revisão de processos.',
  'O cronograma de reoneração da folha (Lei 14.973/2024) avança em 2026 e altera o cálculo da contribuição previdenciária para diversas atividades. Junto com a consolidação do FGTS Digital e os ajustes no eSocial, a folha das empresas brasileiras passou por mudanças relevantes neste ano.',
  $html$
<p>O eSocial é a plataforma única de comunicação de obrigações trabalhistas, previdenciárias e fiscais do empregador para o governo federal. Desde a implantação em 2018, vem absorvendo declarações que antes existiam em sistemas separados (GFIP, RAIS, CAGED e DIRF de salários, entre outras). Em 2026, três frentes confluem e mudam, na prática, a rotina de qualquer departamento pessoal.</p>

<p>A primeira é o avanço da reoneração gradual da folha de pagamento, prevista na Lei 14.973/2024. Setores antes contemplados pela desoneração passaram a pagar contribuição patronal mista entre folha e CPRB. A segunda é a consolidação do FGTS Digital como sistema único de recolhimento, alimentado diretamente pelos eventos do eSocial. A terceira é a integração mais estreita entre eSocial, DCTFWeb e FGTS Digital, com cruzamentos automáticos que aparecem no <a href="/blog/receita-sintonia-2026-classificacao-fiscal-empresas">Receita Sintonia</a>.</p>

<p>O resumo prático é direto. A folha de pagamento de 2026 é mais cara para os setores antes desonerados, mais técnica para todos, e mais visível para o fisco. Erros que antes eram absorvidos com multa simbólica hoje afetam custo, conformidade e classificação fiscal.</p>

<h2>O cronograma da reoneração da folha</h2>

<p>A desoneração da folha, criada em 2011 e prorrogada várias vezes, abrangia 17 setores. Permitia a substituição da contribuição previdenciária patronal de 20% sobre a folha pela CPRB (Contribuição Previdenciária sobre a Receita Bruta), com alíquotas entre 1% e 4,5% sobre o faturamento, conforme a atividade.</p>

<p>A Lei 14.973/2024 definiu um cronograma de retomada gradual da contribuição patronal sobre a folha, com ajuste anual:</p>

<ul>
<li><strong>2024</strong>: desoneração mantida em 100% (CPRB integral, sem contribuição sobre a folha).</li>
<li><strong>2025</strong>: contribuição patronal sobre a folha em 5%, com redução proporcional da CPRB.</li>
<li><strong>2026</strong>: contribuição patronal sobre a folha em 10%, com redução proporcional da CPRB.</li>
<li><strong>2027</strong>: contribuição patronal sobre a folha em 20% (regime regular), com extinção definitiva da CPRB.</li>
</ul>

<p>Em 2026, setores antes desonerados passam a pagar uma alíquota mista. A apuração e o recolhimento são feitos via DCTFWeb, alimentada pelos eventos do eSocial. O cálculo correto exige parametrização específica no sistema de folha.</p>

<h2>Setores afetados e quanto pesa em centavos</h2>

<p>Os 17 setores contemplados pela desoneração até 2024 incluem, entre outros, atividades concentradas em São Paulo:</p>

<ul>
<li>Tecnologia da informação e comunicação (TI e TIC).</li>
<li>Call centers e telesserviços.</li>
<li>Construção civil.</li>
<li>Confecção e calçados.</li>
<li>Couro, têxtil e beneficiamento de fibras.</li>
<li>Transporte rodoviário coletivo de passageiros.</li>
<li>Manutenção e reparação de aeronaves.</li>
<li>Comunicação (rádio e televisão).</li>
<li>Hotéis e restaurantes (parcialmente).</li>
<li>Empresas jornalísticas e editoriais.</li>
</ul>

<p>Em 2026, todas essas atividades passaram a ter custo de folha mais alto que em 2025. Para uma empresa que mantinha integralmente o regime de desoneração, a diferença pode chegar a 5% adicionais sobre a folha bruta neste ano. Em uma folha de R$ 200.000 mensais, isso representa R$ 10.000 a mais por mês de contribuição patronal, ou R$ 130.000 ao ano considerando 13º salário.</p>

<p>Para 2027, com a alíquota plena de 20% sobre a folha, o custo adicional dobra novamente. Empresas que não revisaram a precificação dos serviços, sobretudo as que vão sentir simultaneamente o efeito da <a href="/blog/ibs-cbs-notas-fiscais-2026-empresas-sao-paulo">CBS plena substituindo PIS e COFINS</a>, ou não ajustaram contratos de longo prazo, precisam fazer essa conta agora e não no momento da virada.</p>

<h2>FGTS Digital integrado ao eSocial</h2>

<p>O FGTS Digital, sistema unificado da Caixa Econômica Federal, substituiu a sistemática anterior baseada na GFIP e na Conectividade Social/SEFIP. A apuração é feita diretamente a partir dos eventos do eSocial (S-1200 para remunerações ordinárias, S-1202 para servidores estatutários, S-1207 para benefícios previdenciários, S-2299 para desligamento, entre outros). A guia de recolhimento (DAE-FGTS) é gerada automaticamente após o fechamento da folha.</p>

<p>O efeito prático para o empregador:</p>

<ul>
<li>O FGTS deixou de ter um sistema próprio. Virou consequência direta do que se declara no eSocial.</li>
<li>Erros no eSocial impactam diretamente o valor da guia FGTS. Correções fora de prazo geram multa específica do FGTS, separada da multa eventual do eSocial.</li>
<li>O cálculo do FGTS sobre verbas rescisórias passou a ser automático. Menos espaço para erro humano, e também menos espaço para correção retroativa simples sem reabertura formal de eventos.</li>
<li>Pagamentos via PIX direto na guia DAE-FGTS, com confirmação imediata e sem necessidade de homologação posterior.</li>
</ul>

<h2>O que muda na rotina do departamento pessoal</h2>

<p>Quatro pontos práticos da rotina mudaram com a confluência das três frentes em 2026:</p>

<ol>
<li><strong>Cálculo da folha mais técnico</strong>. Empresas em setores antes desonerados precisam calibrar a contribuição patronal entre parcela sobre a folha e parcela CPRB conforme o ano vigente. Erro na proporção gera diferença direta na DCTFWeb e ajuste retroativo na próxima competência.</li>
<li><strong>Conciliação eSocial, DCTFWeb e FGTS Digital obrigatória</strong>. Os três sistemas precisam fechar mês a mês. Diferença em qualquer um cai no Receita Sintonia, na malha previdenciária ou em ambos.</li>
<li><strong>Prazos mais curtos e menos tolerantes</strong>. O fechamento da folha no eSocial (S-1299) deve ocorrer até o dia 15 do mês seguinte ao da competência. Atrasos comprometem recolhimento de contribuição previdenciária e FGTS, com multa e juros automáticos.</li>
<li><strong>Atualização contínua de software de folha</strong>. Sistemas de folha precisam ter as novas alíquotas e novos eventos do eSocial sempre na versão vigente. Empresas que ainda operam com planilhas ou sistemas defasados têm risco operacional alto e exposição direta a autuação.</li>
</ol>

<h2>Conferência e parametrização: o que revisar agora</h2>

<p>O bloco prático que recomendamos a clientes em São Paulo, em ordem de prioridade, para evitar problema em 2026 e preparar a transição para 2027:</p>

<ol>
<li>Revisar a parametrização da folha conforme a alíquota vigente para o setor (folha + CPRB nas proporções atuais).</li>
<li>Confirmar que o software de folha está na versão homologada para o leiaute atual do eSocial.</li>
<li>Estabelecer rotina mensal de conciliação cruzada entre eSocial, DCTFWeb e FGTS Digital, com fechamento antes do prazo legal.</li>
<li>Verificar enquadramentos de atividade preponderante (FAP) e RAT, que afetam o cálculo previdenciário e podem estar desatualizados.</li>
<li>Revisar contratos de prestação de serviços com cessão de mão de obra, especialmente em construção civil e TI, para ajuste de retenções previdenciárias.</li>
<li>Treinar a equipe interna ou validar com o BPO contábil que as novas regras estão aplicadas.</li>
<li>Projetar o impacto de 2027 na folha total e revisar precificação de produtos e serviços com antecedência.</li>
</ol>

<h2>Pontos de atenção para empresas em São Paulo</h2>

<p>Em São Paulo, particularidades regionais somam-se ao quadro federal:</p>

<ul>
<li>Convenções coletivas paulistas costumam ser revisadas entre janeiro e abril. Em 2026, várias incluíram cláusulas relativas à reoneração, com impacto em piso salarial, benefícios e adicionais.</li>
<li>O Programa de Alimentação do Trabalhador (PAT) e o vale-transporte continuam com regras próprias de incidência ou não-incidência previdenciária. Cadastro correto evita autuação.</li>
<li>Empresas com sede em outros estados e funcionários em São Paulo precisam acompanhar o Domicílio Eletrônico do Contribuinte estadual (DEC) e a NFS-e municipal para receber notificações sobre folha de tomadores.</li>
<li>Construção civil em São Paulo tem fiscalização ativa do INSS sobre matrícula CEI/CNO de obras. Erro de matrícula gera lançamento direto da contribuição previdenciária sobre a obra.</li>
</ul>

<h2>Como revisar a folha sem virar bombeiro</h2>

<p>O eSocial em 2026 deixou de ser uma obrigação acessória. Virou o eixo central da relação entre empregador e fisco. O que se declara ali define o que se recolhe em previdência, FGTS e IRRF, e influencia a classificação da empresa no Receita Sintonia. Tratar a folha como <a href="/servicos-contabeis/gestao-fiscal-e-tributaria">rotina técnica</a>, com calendário antecipado, conciliação cruzada e revisão antes do envio, é o que separa empresas regulares daquelas que descobrem o problema em fiscalização ou na malha previdenciária.</p>

<p>Para clientes da DM2 em São Paulo, o departamento pessoal opera com <a href="/servicos-contabeis/consultoria-contabil">calendário próprio integrado</a>: eSocial fechado antes do dia 10 do mês seguinte, DCTFWeb conciliada antes do dia 12, FGTS Digital validado antes do dia 15. Diferenças entre os três sistemas são resolvidas dentro do mês de competência, sem reabertura de eventos e sem ajuste retroativo. É a forma mais barata e mais segura de operar a folha em 2026.</p>
$html$,
  NULL,
  '/images/blog/esocial-2026.webp',
  'Imagem editorial sobre eSocial em 2026 e novas alíquotas previdenciárias na folha de pagamento',
  'published',
  '2026-04-25T10:00:00-03:00',
  (SELECT id FROM authors WHERE slug = 'danilo-brito'),
  (SELECT id FROM blog_categories WHERE slug = 'departamento-pessoal'),
  'eSocial 2026: novas alíquotas e impactos na folha | DM2',
  'Reoneração da folha, FGTS Digital e ajustes no eSocial em 2026. O que muda no cálculo da contribuição previdenciária da sua empresa.',
  NULL,
  'eSocial em 2026',
  'Cronograma de reoneração da folha, FGTS Digital e ajustes no eSocial mudam a rotina do departamento pessoal.',
  '/images/blog/esocial-2026.webp',
  true, true,
  'eSocial 2026 alíquotas',
  ARRAY['reoneração da folha', 'Lei 14.973/2024', 'FGTS Digital', 'DCTFWeb', 'CPRB', 'departamento pessoal 2026'],
  'informational',
  'DM2 Contabilidade',
  'São Paulo',
  true, false, '2026-04-29T10:00:00-03:00', true,
  false, NULL, false,
  9,
  'gestao-fiscal-e-tributaria', NULL
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  excerpt = EXCLUDED.excerpt,
  content_html = EXCLUDED.content_html,
  cover_image_url = EXCLUDED.cover_image_url,
  cover_image_alt = EXCLUDED.cover_image_alt,
  status = EXCLUDED.status,
  published_at = EXCLUDED.published_at,
  author_id = EXCLUDED.author_id,
  category_id = EXCLUDED.category_id,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  og_title = EXCLUDED.og_title,
  og_description = EXCLUDED.og_description,
  og_image_url = EXCLUDED.og_image_url,
  primary_keyword = EXCLUDED.primary_keyword,
  secondary_keywords = EXCLUDED.secondary_keywords,
  search_intent = EXCLUDED.search_intent,
  entity_focus = EXCLUDED.entity_focus,
  local_focus = EXCLUDED.local_focus,
  faq_enabled = EXCLUDED.faq_enabled,
  is_evergreen = EXCLUDED.is_evergreen,
  last_reviewed_at = EXCLUDED.last_reviewed_at,
  technical_reviewed_by_author = EXCLUDED.technical_reviewed_by_author,
  featured_on_home = EXCLUDED.featured_on_home,
  featured_order = EXCLUDED.featured_order,
  read_time_minutes = EXCLUDED.read_time_minutes,
  related_service_slug = EXCLUDED.related_service_slug,
  updated_at = now();

DELETE FROM blog_post_faqs
WHERE post_id = (SELECT id FROM blog_posts WHERE slug = 'esocial-2026-novas-aliquotas-previdenciarias-folha');

INSERT INTO blog_post_faqs (post_id, question, answer, sort_order) VALUES
  ((SELECT id FROM blog_posts WHERE slug = 'esocial-2026-novas-aliquotas-previdenciarias-folha'),
   'Minha empresa está em setor desonerado. O que mudou de 2025 para 2026?',
   'A contribuição previdenciária patronal sobre a folha passou de 5% (regra de 2025) para 10% em 2026, com redução equivalente da CPRB sobre a receita bruta. O cálculo é misto até 2026 e plenamente sobre a folha em 2027, quando a CPRB é extinta.',
   1),
  ((SELECT id FROM blog_posts WHERE slug = 'esocial-2026-novas-aliquotas-previdenciarias-folha'),
   'O FGTS Digital substitui o eSocial?',
   'Não. O FGTS Digital substitui apenas o sistema anterior de recolhimento do FGTS (Conectividade Social/SEFIP). A apuração continua sendo feita a partir dos eventos do eSocial. Os dois sistemas trabalham integrados.',
   2),
  ((SELECT id FROM blog_posts WHERE slug = 'esocial-2026-novas-aliquotas-previdenciarias-folha'),
   'Qual o prazo de fechamento da folha no eSocial?',
   'O evento de fechamento (S-1299) deve ser transmitido até o dia 15 do mês seguinte ao da competência. Após esse prazo, eventos retroativos exigem reabertura da folha (S-1298) e podem gerar multas.',
   3),
  ((SELECT id FROM blog_posts WHERE slug = 'esocial-2026-novas-aliquotas-previdenciarias-folha'),
   'Erro no eSocial pode afetar a classificação no Receita Sintonia?',
   'Sim. Inconsistências entre eSocial, DCTFWeb e FGTS Digital aparecem como divergência no programa de conformidade. Empresas com erro recorrente perdem pontos e descem de faixa, com efeitos práticos em fiscalização e processos administrativos.',
   4),
  ((SELECT id FROM blog_posts WHERE slug = 'esocial-2026-novas-aliquotas-previdenciarias-folha'),
   'Como a DM2 organiza o departamento pessoal dos clientes?',
   'A DM2 trabalha com calendário fiscal próprio do cliente, integrando eSocial, DCTFWeb e FGTS Digital com checagem cruzada mensal. O fechamento ocorre antes do prazo legal, e diferenças entre os sistemas são resolvidas dentro do mês de competência, evitando ajustes retroativos e multas.',
   5);

DELETE FROM blog_post_related_services
WHERE post_id = (SELECT id FROM blog_posts WHERE slug = 'esocial-2026-novas-aliquotas-previdenciarias-folha');

INSERT INTO blog_post_related_services (post_id, service_slug, sort_order) VALUES
  ((SELECT id FROM blog_posts WHERE slug = 'esocial-2026-novas-aliquotas-previdenciarias-folha'), 'gestao-fiscal-e-tributaria', 1),
  ((SELECT id FROM blog_posts WHERE slug = 'esocial-2026-novas-aliquotas-previdenciarias-folha'), 'consultoria-contabil', 2);


-- ===============================================================
-- Post 5 — PUBLISHED (2026-04-27) — Reforma tributária para prestadores de serviço
-- ===============================================================

INSERT INTO blog_posts (
  slug, title, subtitle, excerpt, content_html, content_json,
  cover_image_url, cover_image_alt,
  status, published_at,
  author_id, category_id,
  seo_title, seo_description, canonical_url,
  og_title, og_description, og_image_url,
  robots_index, robots_follow,
  primary_keyword, secondary_keywords, search_intent,
  entity_focus, local_focus,
  faq_enabled, is_evergreen, last_reviewed_at, technical_reviewed_by_author,
  featured_on_home, featured_order, is_pillar,
  read_time_minutes,
  related_service_slug, related_specialty_slug
) VALUES (
  'reforma-tributaria-prestadores-de-servico-sao-paulo',
  'Reforma tributária para prestadores de serviço: o que empresas em São Paulo já precisam revisar',
  'Quem vive de honorários, hora técnica ou contrato de prestação sente o efeito do IBS e da CBS de forma mais direta.',
  'Prestadores de serviço em São Paulo deixam de pagar ISS de 2% a 5% e passam ao regime IBS+CBS, com alíquota nominal estimada entre 26% e 28%. A boa notícia é o crédito sobre insumos. A má é que o impacto líquido depende do perfil de cada empresa. Veja o que revisar agora.',
  $html$
<p>Para o setor de serviços, a reforma tributária do consumo (EC 132/2023, regulamentada pela LC 214/2025) é a mudança mais profunda em décadas. O <a href="/blog/ibs-cbs-notas-fiscais-2026-empresas-sao-paulo">funcionamento técnico do IBS e da CBS na nota fiscal</a> está em vigor desde janeiro de 2026, e o setor de serviços é o que mais muda na transição. Diferente do comércio e da indústria, que já operavam sob a lógica de débito e crédito de ICMS e PIS/COFINS, a maior parte dos prestadores de serviço pagava apenas ISS no município, em alíquotas baixas (2% a 5% em São Paulo capital, conforme atividade), sem direito a crédito sobre insumos.</p>

<p>Em 2027, com a entrada plena da CBS e o início da redução do ISS, e até 2033, com a extinção total do ISS e a vigência plena do IBS, a alíquota nominal sobre serviços passa para a casa dos 26% a 28% combinados. O que parece um aumento brutal é, na prática, um quadro mais nuançado, porque entra o sistema de créditos. O impacto líquido depende do perfil de cada empresa.</p>

<p>O resumo prático: prestadores de serviço em São Paulo precisam refazer simulação tributária, rever contratos de longo prazo e analisar a estrutura societária ainda em 2026. Quem chegar em 2027 sem esse trabalho feito vai descobrir o efeito da reforma na fatura mensal, sem margem para correção rápida.</p>

<h2>Por que serviços são o setor mais impactado</h2>

<p>O motivo é estrutural. O ISS, em São Paulo capital, varia entre 2% (atividades específicas como construção civil) e 5% (a maior parte dos serviços profissionais), com alíquota fixa por profissional habilitado em sociedades uniprofissionais. Como a maior parte dos serviços não tinha PIS e COFINS sobre receita relevante (eram não cumulativos com benefícios setoriais ou regimes especiais), a carga total ficava significativamente menor que a do comércio (cerca de 18% de ICMS) ou da indústria.</p>

<p>A reforma equaliza essa diferença entre setores. Sob IBS+CBS, todos passam a operar com alíquota próxima ao regime regular, com diferença feita pelos regimes específicos previstos para algumas atividades (saúde, educação, cultura, transporte coletivo, profissionais intelectuais regulamentados em estruturas próprias). O efeito líquido sobre cada prestador depende de três variáveis: perfil de cliente, estrutura de custos creditáveis e elegibilidade a regime específico.</p>

<h2>Três perfis distintos de prestador</h2>

<p>Em São Paulo, na nossa experiência com clientes, três perfis aparecem com clareza:</p>

<h3>1. Prestador com poucos insumos creditáveis</h3>

<p>Profissional liberal autônomo (advogado, médico, contador, consultor de gestão), serviços intelectuais cobrados por hora técnica, atividades de natureza personalíssima. Antes pagava ISS de 2% a 5%. Sob IBS+CBS, paga 26% a 28% com pouco a creditar, porque a estrutura de custos é majoritariamente folha de pagamento (não creditável).</p>

<p>Há regimes específicos previstos para alguns desses profissionais em determinadas estruturas societárias (sociedades uniprofissionais, por exemplo), com possibilidade de redução de alíquota. Mas, em regra, é o grupo que mais sente o aumento líquido de carga.</p>

<h3>2. Prestador com insumos relevantes</h3>

<p>Empresas de manutenção, construção civil, tecnologia com infraestrutura, serviços que demandam materiais, subcontratação ou equipamentos. Antes pagavam ISS sem crédito. Sob IBS+CBS, pagam alíquota nominal alta, mas se creditam do tributo embutido em tudo o que compram (insumos, energia, aluguel, equipamentos, prestadores).</p>

<p>Para algumas empresas desse perfil, a carga efetiva fica próxima da anterior. Para outras, especialmente quando os fornecedores estavam no regime regular pagando PIS/COFINS cumulativos, pode até reduzir. Análise caso a caso é obrigatória.</p>

<h3>3. Prestador B2B para clientes no regime regular</h3>

<p>Quem vende para empresa grande no Lucro Real ou Presumido vê o cliente se creditar integralmente do IBS+CBS embutido na nota fiscal. Para o cliente, o efeito final é neutro: o tributo sobe na entrada e cai como crédito na apuração. Para o prestador, o aumento de alíquota nominal não se traduz em perda de competitividade, desde que o preço seja recomposto corretamente nos contratos.</p>

<p>É o perfil que sofre menos com a reforma, mas sofre se entrar em 2027 com contratos de longo prazo assinados sem cláusula de repasse tributário.</p>

<h2>O cronograma de transição entre ISS e IBS</h2>

<p>Em São Paulo capital, antes da reforma, o ISS variava entre 2% e 5% conforme atividade. Algumas atividades tinham alíquota fixa por profissional habilitado em sociedades uniprofissionais, regime que continua em vigor durante toda a transição.</p>

<p>O cronograma combinado de extinção do ISS e entrada do IBS é o seguinte:</p>

<ul>
<li><strong>2026</strong>: ISS integral. IBS a 0,1% (teste).</li>
<li><strong>2027</strong>: ISS integral. CBS plena (substitui PIS e COFINS).</li>
<li><strong>2028</strong>: ISS integral. CBS plena. IBS começa a ser implementado.</li>
<li><strong>2029</strong>: ISS reduzido em 10%. IBS aumentado proporcionalmente.</li>
<li><strong>2030</strong>: ISS reduzido em 20%. IBS aumentado.</li>
<li><strong>2031</strong>: ISS reduzido em 30%. IBS aumentado.</li>
<li><strong>2032</strong>: ISS reduzido em 40%. IBS quase pleno.</li>
<li><strong>2033</strong>: ISS extinto. IBS pleno.</li>
</ul>

<p>Os ajustes mais visíveis na alíquota efetiva começam em 2029. Mas os contratos comerciais assinados agora, com vigência longa, já precisam considerar o cenário pós-2027 de CBS plena substituindo PIS e COFINS.</p>

<h2>Os regimes específicos previstos na LC 214/2025</h2>

<p>A Lei Complementar 214/2025 prevê regimes diferenciados para algumas atividades de serviço, com alíquota reduzida ou regra própria. Entre as mais relevantes para empresas em São Paulo:</p>

<ul>
<li><strong>Profissionais intelectuais regulamentados</strong> que prestam serviços de natureza personalíssima (<a href="/contabilidade-para-advogados">advogados</a>, médicos, dentistas, arquitetos, contadores, engenheiros), em determinadas estruturas societárias, podem ter regime específico com alíquota reduzida em até 30%.</li>
<li><strong>Serviços de saúde</strong>: redução prevista de até 60% sobre a alíquota de referência, conforme regulamentação infralegal.</li>
<li><strong>Serviços de educação</strong>: redução também em torno de 60%, com regras próprias para entidades sem fins lucrativos.</li>
<li><strong>Atividades culturais</strong>: redução prevista, com critério de classificação ainda em consolidação.</li>
<li><strong>Setor financeiro e seguros</strong>: regime próprio, com base de cálculo diferenciada e alíquota específica.</li>
<li><strong>Transporte coletivo de passageiros</strong>: regime específico para preservar a tarifa pública.</li>
</ul>

<p>Cada regime tem regras próprias. Cabe ao contador identificar qual se aplica à atividade do cliente, simular o efeito da alíquota reduzida e avaliar se a empresa não teria vantagem em optar pelo regime regular, com aproveitamento integral de créditos.</p>

<h2>O que prestadores em São Paulo já precisam revisar</h2>

<p>Com base no que acompanhamos com clientes em São Paulo nos últimos meses, há cinco frentes que merecem revisão imediata em 2026:</p>

<ol>
<li><strong>Modelo de contratos</strong>. Cláusulas de reajuste tributário, repasse de variação de alíquota e mecanismo de neutralidade fiscal precisam estar nos contratos novos. Quem assinar contrato de longo prazo em 2026 sem essas cláusulas corre risco direto em 2027.</li>
<li><strong>Cadastro de produtos e serviços</strong>. Cada serviço prestado precisa estar <a href="/servicos-contabeis/gestao-fiscal-e-tributaria">classificado corretamente no cClassTrib</a>. Erro de cadastro afeta o cálculo do tributo e a possibilidade de o cliente se creditar.</li>
<li><strong><a href="/servicos-contabeis/planejamento-tributario">Análise do regime tributário</a></strong>. Empresas no Simples que vendem para o B2B precisam simular se permanecer no regime ainda compensa, dado que o crédito de IBS+CBS que repassam é menor que no regime regular.</li>
<li><strong>Política de preços</strong>. Quem trabalha com preço fechado por serviço (não com hora técnica reajustável) precisa desenhar tabelas de transição, com escalonamento previsto entre 2027 e 2033.</li>
<li><strong>Estrutura societária</strong>. Algumas atividades intelectuais têm regimes específicos com alíquota reduzida em determinadas formas societárias. A escolha do tipo de sociedade passou a ser parte da decisão tributária, não apenas da decisão jurídica ou patrimonial.</li>
</ol>

<h2>Cláusulas contratuais que viraram obrigatórias</h2>

<p>O contrato de prestação de serviços em 2026 não pode mais ser o mesmo de 2024. Independentemente do setor, quatro cláusulas viraram praticamente obrigatórias para qualquer contrato com vigência além de 2027:</p>

<ul>
<li><strong>Cláusula de neutralidade tributária</strong>. Define como será o repasse caso a alíquota efetiva mude durante a vigência do contrato. Sem ela, o prestador absorve o aumento internamente.</li>
<li><strong>Mecanismo de revisão automática</strong>. Estabelece a fórmula de cálculo do reajuste, sem necessidade de renegociação a cada mudança normativa.</li>
<li><strong>Identificação clara do regime tributário do prestador</strong>. Define se o cliente vai ter direito a crédito sobre o serviço (e em que valor), evitando disputa posterior.</li>
<li><strong>Foro e procedimento de revisão</strong>. Onde e como se discute eventual divergência sobre repasse, sem necessidade de ação judicial para questão acessória.</li>
</ul>

<h2>A conversa difícil que evita prejuízo em 2027</h2>

<p>O ano de 2026 é decisivo para o setor de serviços, porque ainda há tempo para ajustar contratos, regime e cadastros antes que a alíquota cheia entre em vigor. A DM2 trabalha com prestadores de serviço em São Paulo desde 2003, e nos últimos meses temos feito, junto com clientes, três rotinas que ajudam:</p>

<ul>
<li>Simulação de carga tributária comparada (<a href="/blog/simples-nacional-2027-prazos-opcao-ibs-cbs">Simples Nacional</a>, Presumido e Real, com IBS+CBS aplicados) para o exercício de 2027 e seguintes.</li>
<li>Revisão de modelos de contrato com inclusão de cláusula de transição tributária.</li>
<li>Análise de elegibilidade a regime específico, conforme a atividade e a estrutura societária.</li>
</ul>

<p>Quem deixar para revisar em 2027, quando a CBS já estiver plena, perde margem de planejamento e precisa renegociar contratos sob pressão. A vantagem de planejar agora é financeira, não apenas operacional. Em São Paulo, é também estratégica: o mercado paulista é o que mais rápido absorve mudanças tributárias, e o prestador que chegar despreparado em 2027 perde projeto para o concorrente que chegou pronto.</p>
$html$,
  NULL,
  '/images/blog/reforma-tributaria-prestadores.webp',
  'Imagem editorial sobre a reforma tributária para prestadores de serviço em São Paulo',
  'published',
  '2026-04-27T10:00:00-03:00',
  (SELECT id FROM authors WHERE slug = 'danilo-brito'),
  (SELECT id FROM blog_categories WHERE slug = 'tributario'),
  'Reforma tributária e prestadores de serviço em SP | DM2',
  'Como a reforma tributária impacta prestadores de serviço em São Paulo: ISS, IBS, CBS, regimes específicos e o que revisar nos contratos.',
  NULL,
  'Reforma tributária para prestadores de serviço',
  'O que muda para empresas de serviço em São Paulo com a transição entre ISS e IBS+CBS.',
  '/images/blog/reforma-tributaria-prestadores.webp',
  true, true,
  'reforma tributária prestadores de serviço São Paulo',
  ARRAY['IBS CBS serviços', 'transição ISS', 'LC 214/2025', 'sociedade uniprofissional', 'planejamento tributário 2027'],
  'informational',
  'DM2 Contabilidade',
  'São Paulo',
  true, false, '2026-04-29T10:00:00-03:00', true,
  false, NULL, false,
  10,
  'planejamento-tributario', NULL
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  excerpt = EXCLUDED.excerpt,
  content_html = EXCLUDED.content_html,
  cover_image_url = EXCLUDED.cover_image_url,
  cover_image_alt = EXCLUDED.cover_image_alt,
  status = EXCLUDED.status,
  published_at = EXCLUDED.published_at,
  author_id = EXCLUDED.author_id,
  category_id = EXCLUDED.category_id,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  og_title = EXCLUDED.og_title,
  og_description = EXCLUDED.og_description,
  og_image_url = EXCLUDED.og_image_url,
  primary_keyword = EXCLUDED.primary_keyword,
  secondary_keywords = EXCLUDED.secondary_keywords,
  search_intent = EXCLUDED.search_intent,
  entity_focus = EXCLUDED.entity_focus,
  local_focus = EXCLUDED.local_focus,
  faq_enabled = EXCLUDED.faq_enabled,
  is_evergreen = EXCLUDED.is_evergreen,
  last_reviewed_at = EXCLUDED.last_reviewed_at,
  technical_reviewed_by_author = EXCLUDED.technical_reviewed_by_author,
  featured_on_home = EXCLUDED.featured_on_home,
  featured_order = EXCLUDED.featured_order,
  read_time_minutes = EXCLUDED.read_time_minutes,
  related_service_slug = EXCLUDED.related_service_slug,
  updated_at = now();

DELETE FROM blog_post_faqs
WHERE post_id = (SELECT id FROM blog_posts WHERE slug = 'reforma-tributaria-prestadores-de-servico-sao-paulo');

INSERT INTO blog_post_faqs (post_id, question, answer, sort_order) VALUES
  ((SELECT id FROM blog_posts WHERE slug = 'reforma-tributaria-prestadores-de-servico-sao-paulo'),
   'Por que prestadores de serviço pagavam menos imposto antes da reforma?',
   'Porque o ISS, em São Paulo capital, varia entre 2% e 5% conforme a atividade, enquanto o ICMS sobre comércio e indústria é tipicamente de 18%. Como a maior parte dos serviços não tinha PIS/COFINS sobre receita (eram não cumulativos com benefícios setoriais), a carga total ficava menor. A reforma equaliza essa diferença entre setores.',
   1),
  ((SELECT id FROM blog_posts WHERE slug = 'reforma-tributaria-prestadores-de-servico-sao-paulo'),
   'Profissional liberal vai pagar mais imposto a partir de 2027?',
   'Em regra, sim, se não houver enquadramento em regime específico. A LC 214/2025 prevê redução de alíquota para algumas profissões intelectuais regulamentadas em determinadas estruturas societárias. A análise é caso a caso e exige simulação por contador.',
   2),
  ((SELECT id FROM blog_posts WHERE slug = 'reforma-tributaria-prestadores-de-servico-sao-paulo'),
   'Faz sentido sair do Simples Nacional em 2027?',
   'Depende. Empresas de serviço B2B, que vendem para clientes no regime regular, podem perder competitividade no Simples porque o crédito que repassam ao cliente é menor. Já empresas B2C ou com faturamento próximo do limite do MEI ou do Simples geralmente continuam mais vantajosas no regime unificado. Simulação é obrigatória.',
   3),
  ((SELECT id FROM blog_posts WHERE slug = 'reforma-tributaria-prestadores-de-servico-sao-paulo'),
   'O que é uma cláusula de transição tributária em contrato de serviço?',
   'É uma cláusula que prevê o reajuste automático do preço (ou do imposto destacado) caso ocorra mudança de alíquota durante a vigência do contrato. Sem ela, contratos de longo prazo correm risco de absorver internamente o aumento da carga, comprimindo a margem do prestador.',
   4),
  ((SELECT id FROM blog_posts WHERE slug = 'reforma-tributaria-prestadores-de-servico-sao-paulo'),
   'A DM2 atende profissionais liberais em São Paulo?',
   'Sim. Atendemos advogados, profissionais da saúde, consultores e empresas de serviço em São Paulo desde 2003. Para esse perfil, fazemos a análise de regime, simulação de carga sob a reforma, revisão da estrutura societária e acompanhamento contábil mensal completo.',
   5);

DELETE FROM blog_post_related_services
WHERE post_id = (SELECT id FROM blog_posts WHERE slug = 'reforma-tributaria-prestadores-de-servico-sao-paulo');

INSERT INTO blog_post_related_services (post_id, service_slug, sort_order) VALUES
  ((SELECT id FROM blog_posts WHERE slug = 'reforma-tributaria-prestadores-de-servico-sao-paulo'), 'planejamento-tributario', 1),
  ((SELECT id FROM blog_posts WHERE slug = 'reforma-tributaria-prestadores-de-servico-sao-paulo'), 'consultoria-contabil', 2),
  ((SELECT id FROM blog_posts WHERE slug = 'reforma-tributaria-prestadores-de-servico-sao-paulo'), 'gestao-fiscal-e-tributaria', 3);


-- ===============================================================
-- Post 6 — PUBLISHED (2026-04-28) — Simples Nacional em 2027
-- ===============================================================

INSERT INTO blog_posts (
  slug, title, subtitle, excerpt, content_html, content_json,
  cover_image_url, cover_image_alt,
  status, published_at,
  author_id, category_id,
  seo_title, seo_description, canonical_url,
  og_title, og_description, og_image_url,
  robots_index, robots_follow,
  primary_keyword, secondary_keywords, search_intent,
  entity_focus, local_focus,
  faq_enabled, is_evergreen, last_reviewed_at, technical_reviewed_by_author,
  featured_on_home, featured_order, is_pillar,
  read_time_minutes,
  related_service_slug, related_specialty_slug
) VALUES (
  'simples-nacional-2027-prazos-opcao-ibs-cbs',
  'Simples Nacional em 2027: os novos prazos para opção e o impacto do IBS e da CBS',
  'A escolha entre permanecer no regime unificado e migrar para o regular ganhou nova camada com a reforma.',
  'O Simples Nacional continua existindo em 2027, mas a relação com o IBS e a CBS muda a equação de viabilidade. Para empresas B2B, em particular, a permanência no regime pode reduzir competitividade. Veja como funciona a opção, os prazos e o que considerar.',
  $html$
<p>O Simples Nacional, criado pela Lei Complementar 123/2006, é o regime tributário unificado para microempresas e empresas de pequeno porte com faturamento anual até R$ 4,8 milhões. Em 2027, com a entrada plena da CBS (substituindo PIS e COFINS) e o início da redução do ICMS e do ISS, o regime permanece em vigor, mas com regras de transição que mudam a equação de viabilidade para parte das empresas que estão hoje enquadradas.</p>

<p>O resumo prático: o Simples não acabou. O que mudou foi a forma como ele se comunica com o resto do sistema tributário. Empresas que vendem para consumidor final (B2C) seguem majoritariamente vantajosas no regime. Empresas que vendem para outras empresas (B2B) precisam refazer a conta, porque o crédito que repassam ao cliente é menor que o de fornecedores no regime regular.</p>

<p>Para empresas em São Paulo, a decisão sobre permanecer no Simples ou migrar para o Lucro Presumido (ou Real) deixou de ser escolha automática. É decisão técnica, com simulação numérica obrigatória, e precisa estar pronta antes do prazo de opção em janeiro de 2027.</p>

<h2>O Simples permanece, mas o cálculo mudou</h2>

<p>A reforma tributária preservou o Simples Nacional como regime opcional. As empresas que se enquadram nos limites e nos critérios da LC 123/2006 continuam podendo optar pelo recolhimento unificado em 2027 e nos anos seguintes. Os limites mantidos são:</p>

<ul>
<li><strong>MEI (Microempreendedor Individual)</strong>: faturamento anual até R$ 81.000, com recolhimento fixo mensal e cobertura previdenciária básica.</li>
<li><strong>ME (Microempresa)</strong>: faturamento anual até R$ 360.000.</li>
<li><strong>EPP (Empresa de Pequeno Porte)</strong>: faturamento anual até R$ 4.800.000.</li>
</ul>

<p>O sublimite estadual de São Paulo permanece em R$ 3.600.000 para fins de ICMS. Empresas paulistas que ultrapassam o sublimite estadual mas continuam dentro do limite federal recolhem ICMS pela sistemática regular, mantendo os demais tributos pelo Simples.</p>

<h2>Como IBS e CBS interagem com o Simples</h2>

<p>A LC 214/2025 introduziu uma regra técnica importante: empresas do Simples passam a poder <a href="/blog/ibs-cbs-notas-fiscais-2026-empresas-sao-paulo">destacar IBS e CBS nas notas fiscais</a> que emitem, para que o adquirente possa se creditar. Essa é a maior diferença prática em relação à sistemática anterior.</p>

<p>O funcionamento técnico:</p>

<ul>
<li>Na sistemática original, o cliente que comprava de empresa do Simples não tinha direito a crédito de PIS, COFINS, ICMS ou IPI sobre essa nota.</li>
<li>Com a regra de transição, o destaque de IBS e CBS na nota fiscal de empresa do Simples permite que o cliente se credite, mas o crédito é limitado ao valor que o Simples efetivamente recolhe (proporcional à alíquota interna do regime, calculada sobre o anexo aplicável).</li>
<li>Esse crédito limitado é menor do que o cliente receberia ao comprar da concorrência no regime regular.</li>
<li>Em transações B2B, isso reduz o atrativo da empresa do Simples como fornecedora, especialmente em mercados onde o cliente compara fornecedores pelo custo líquido depois do crédito.</li>
</ul>

<p>A consequência prática: empresas do Simples que vendem majoritariamente para outras empresas (B2B) precisam analisar se o ganho do regime unificado (alíquota efetiva menor sobre o faturamento) compensa a perda comercial pelo crédito menor repassado ao cliente.</p>

<h2>Prazos de opção e de exclusão</h2>

<p>Os prazos para opção pelo Simples permanecem os definidos pela LC 123/2006, com calendário próprio para 2027:</p>

<ul>
<li><strong>Empresas em atividade</strong>: a opção ou desistência do Simples para o exercício de 2027 deve ser feita até o último dia útil de janeiro de 2027. Após esse prazo, a próxima janela de opção é em janeiro de 2028.</li>
<li><strong><a href="/servicos-contabeis/abertura-e-regularizacao-de-empresas">Empresas em abertura</a></strong>: a opção pode ser feita em até 30 dias do deferimento da inscrição estadual ou municipal (ou da data do CNPJ, se a atividade não exige essas inscrições), respeitado o prazo total de 180 dias contados do CNPJ.</li>
<li><strong>Exclusão por excesso de receita</strong>: empresas que ultrapassam o limite federal de R$ 4,8 milhões em mais de 20% são excluídas a partir do mês seguinte. Quem ultrapassa em até 20% é excluído apenas no exercício seguinte.</li>
<li><strong>Exclusão por débito</strong>: empresas com débitos junto à Receita Federal ou ao FGTS são excluídas, com prazo de regularização normalmente de 30 dias contados da notificação. Não regularizar no prazo confirma a exclusão.</li>
<li><strong>Exclusão por exercício de atividade vedada</strong>: incluir CNAE não permitido no regime resulta em exclusão imediata, com efeitos retroativos ao início da atividade vedada.</li>
</ul>

<h2>Cinco perguntas para decidir entre Simples e regime regular</h2>

<p>A decisão entre permanecer no Simples ou migrar virou análise técnica obrigatória em 2026 e 2027. Cinco perguntas estruturam essa análise:</p>

<ol>
<li><strong>Qual o perfil dos clientes?</strong> B2C (consumidor final) ou B2B (outras empresas)? Empresas B2C continuam, em geral, mais vantajosas no Simples. Empresas B2B precisam simular caso a caso.</li>
<li><strong>Qual a margem operacional?</strong> Margem alta com poucos custos creditáveis tende a manter o Simples como vantagem. Margem baixa com muitos insumos pode favorecer o regime regular, em que o crédito de IBS+CBS é integral.</li>
<li><strong>O cliente B2B exige nota com crédito cheio?</strong> Em alguns setores, grandes clientes passaram a privilegiar fornecedores no regime regular, justamente pelo crédito completo. Perda de cliente é argumento concreto na decisão.</li>
<li><strong>Qual a faixa de faturamento dentro do Simples?</strong> Nos anexos III ou V, com alíquota efetiva alta, a vantagem do regime se reduz e o regular fica competitivo. Nos anexos I e II, o Simples ainda costuma ser melhor.</li>
<li><strong>Qual a estrutura societária?</strong> Sociedades uniprofissionais, atividades intelectuais regulamentadas e setores com regime específico no IBS e na CBS podem alterar completamente a equação. A decisão tributária e a decisão societária se cruzam, e ambas precisam ser consideradas <a href="/blog/abertura-de-empresa-em-sao-paulo-regime-tributario-2026">já no momento de abrir a empresa</a> em São Paulo, sob o novo regime do IBS e da CBS.</li>
</ol>

<p>Sem essas cinco respostas, a decisão é palpite. Com as cinco, a análise vira simulação numérica, que é o que se faz tecnicamente em planejamento tributário sério.</p>

<h2>Casos típicos: B2C, B2B e prestador uniprofissional</h2>

<p>Para tornar a decisão menos abstrata, três casos que aparecem com frequência em São Paulo:</p>

<p><strong>Caso 1: comércio B2C com faturamento de R$ 1,2 milhão.</strong> Loja física ou e-commerce vendendo para consumidor final, anexo I do Simples. O cliente final não se credita de tributo, então a regra de transição do crédito limitado não afeta a competitividade. Permanecer no Simples segue sendo a melhor decisão na maior parte dos casos.</p>

<p><strong>Caso 2: prestador de TI B2B com faturamento de R$ 3,5 milhões.</strong> Vendas para grandes clientes no regime regular. Anexo III ou V do Simples, dependendo do fator R. Aqui a simulação aponta com frequência para o regime regular: o cliente se credita integralmente do IBS+CBS sobre a nota, o que dá ao prestador margem para reajustar preço e ainda ficar competitivo. A migração precisa ser planejada para janeiro.</p>

<p><strong>Caso 3: sociedade uniprofissional de advogados em São Paulo.</strong> Estrutura própria do município, com ISS fixo por profissional habilitado. O regime específico previsto na LC 214/2025 para profissionais intelectuais regulamentados pode preservar parte do benefício, mas exige análise da estrutura societária e do tipo de cliente (pessoa física ou jurídica). Decisão caso a caso, com simulação que considere o regime específico.</p>

<h2>Calendário de planejamento até janeiro de 2027</h2>

<p>Para chegar em janeiro com a decisão correta tomada, o calendário interno recomendado é:</p>

<ol>
<li><strong>Setembro a outubro de 2026</strong>: levantar dados consolidados de faturamento, margem, perfil de cliente (% B2B vs % B2C) e estrutura de custos do ano em curso.</li>
<li><strong>Novembro de 2026</strong>: simulação comparativa entre Simples Nacional, Lucro Presumido e (quando aplicável) Lucro Real, com IBS+CBS aplicados conforme regras de 2027.</li>
<li><strong>Dezembro de 2026</strong>: decisão tomada, com revisão de contratos comerciais para refletir a estrutura escolhida (especialmente cláusulas de repasse tributário).</li>
<li><strong>Primeira quinzena de janeiro de 2027</strong>: execução da opção (ou desistência) no Portal do Simples Nacional, com confirmação da efetivação.</li>
<li><strong>Janeiro a março de 2027</strong>: monitoramento da apuração nos primeiros meses sob a nova estrutura, com ajuste fino de parametrização e cálculo.</li>
</ol>

<h2>O papel do contador na transição</h2>

<p>Em 2027, o trabalho do contador deixa de ser apenas executar a opção do regime no portal do Simples Nacional. Vira análise de cenários: simular a operação anual sob Simples, sob Presumido e (em alguns casos) sob Real, com IBS+CBS aplicados, e comparar carga efetiva, impacto comercial e exigências operacionais de cada regime.</p>

<p>Para clientes da DM2 em São Paulo, essa simulação é parte do <a href="/servicos-contabeis/planejamento-tributario">trabalho de planejamento tributário anual</a>, feito em novembro e dezembro do ano anterior. O objetivo é que a opção em janeiro seja decisão técnica documentada, e não default por omissão. Errar em janeiro custa o ano todo, porque a próxima janela de opção é apenas em 2028.</p>
$html$,
  NULL,
  '/images/blog/simples-nacional-2027.webp',
  'Imagem editorial sobre o Simples Nacional em 2027 e o impacto do IBS e da CBS',
  'published',
  '2026-04-28T10:00:00-03:00',
  (SELECT id FROM authors WHERE slug = 'danilo-brito'),
  (SELECT id FROM blog_categories WHERE slug = 'tributario'),
  'Simples Nacional em 2027: prazos e impacto do IBS e da CBS | DM2',
  'Simples Nacional continua em 2027, mas IBS e CBS mudam a equação. Prazos de opção, regras de transição e como decidir entre permanecer ou migrar.',
  NULL,
  'Simples Nacional em 2027',
  'Os prazos de opção e o impacto do IBS e da CBS para empresas do Simples Nacional a partir de 2027.',
  '/images/blog/simples-nacional-2027.webp',
  true, true,
  'Simples Nacional 2027',
  ARRAY['LC 123/2006', 'IBS CBS Simples', 'opção Simples', 'transição reforma tributária', 'PGDAS-D'],
  'informational',
  'DM2 Contabilidade',
  'São Paulo',
  true, false, '2026-04-29T10:00:00-03:00', true,
  false, NULL, false,
  10,
  'planejamento-tributario', NULL
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  excerpt = EXCLUDED.excerpt,
  content_html = EXCLUDED.content_html,
  cover_image_url = EXCLUDED.cover_image_url,
  cover_image_alt = EXCLUDED.cover_image_alt,
  status = EXCLUDED.status,
  published_at = EXCLUDED.published_at,
  author_id = EXCLUDED.author_id,
  category_id = EXCLUDED.category_id,
  seo_title = EXCLUDED.seo_title,
  seo_description = EXCLUDED.seo_description,
  og_title = EXCLUDED.og_title,
  og_description = EXCLUDED.og_description,
  og_image_url = EXCLUDED.og_image_url,
  primary_keyword = EXCLUDED.primary_keyword,
  secondary_keywords = EXCLUDED.secondary_keywords,
  search_intent = EXCLUDED.search_intent,
  entity_focus = EXCLUDED.entity_focus,
  local_focus = EXCLUDED.local_focus,
  faq_enabled = EXCLUDED.faq_enabled,
  is_evergreen = EXCLUDED.is_evergreen,
  last_reviewed_at = EXCLUDED.last_reviewed_at,
  technical_reviewed_by_author = EXCLUDED.technical_reviewed_by_author,
  featured_on_home = EXCLUDED.featured_on_home,
  featured_order = EXCLUDED.featured_order,
  read_time_minutes = EXCLUDED.read_time_minutes,
  related_service_slug = EXCLUDED.related_service_slug,
  updated_at = now();

DELETE FROM blog_post_faqs
WHERE post_id = (SELECT id FROM blog_posts WHERE slug = 'simples-nacional-2027-prazos-opcao-ibs-cbs');

INSERT INTO blog_post_faqs (post_id, question, answer, sort_order) VALUES
  ((SELECT id FROM blog_posts WHERE slug = 'simples-nacional-2027-prazos-opcao-ibs-cbs'),
   'O Simples Nacional vai acabar com a reforma tributária?',
   'Não. A LC 214/2025 preservou o Simples Nacional como regime opcional para microempresas e empresas de pequeno porte. O que muda são as regras de interação com o IBS e a CBS, e a possibilidade de destacar esses tributos na nota fiscal para que o cliente se credite.',
   1),
  ((SELECT id FROM blog_posts WHERE slug = 'simples-nacional-2027-prazos-opcao-ibs-cbs'),
   'Qual o prazo para optar pelo Simples Nacional em 2027?',
   'Empresas em atividade têm até o último dia útil de janeiro de 2027 (31/01/2027) para optar ou desistir do Simples para esse exercício. Empresas em abertura têm 30 dias após o deferimento da inscrição estadual ou municipal, respeitado o limite de 180 dias da inscrição no CNPJ.',
   2),
  ((SELECT id FROM blog_posts WHERE slug = 'simples-nacional-2027-prazos-opcao-ibs-cbs'),
   'Empresa B2B do Simples perde competitividade em 2027?',
   'Pode perder, dependendo do perfil dos clientes e da margem operacional. Como o crédito de IBS e CBS que a empresa do Simples repassa é menor que o do regime regular, alguns clientes B2B podem preferir fornecedores no regular. A simulação numérica é o que define o impacto exato.',
   3),
  ((SELECT id FROM blog_posts WHERE slug = 'simples-nacional-2027-prazos-opcao-ibs-cbs'),
   'Qual o limite de faturamento do Simples Nacional em 2027?',
   'O limite federal permanece em R$ 4.800.000 por ano. Em São Paulo, o sublimite estadual para fins de ICMS é de R$ 3.600.000. Quem ultrapassa o limite federal em até 20% é excluído apenas no ano seguinte; quem ultrapassa em mais de 20%, no mês seguinte.',
   4),
  ((SELECT id FROM blog_posts WHERE slug = 'simples-nacional-2027-prazos-opcao-ibs-cbs'),
   'Como a DM2 ajuda na decisão entre Simples e Lucro Presumido?',
   'Fazemos a simulação anual em novembro e dezembro do ano anterior, considerando faturamento, margem, perfil de cliente e estrutura societária. A decisão sobre permanecer no Simples ou migrar é apresentada em formato comparativo, com carga efetiva por regime, antes do prazo de opção em janeiro.',
   5);

DELETE FROM blog_post_related_services
WHERE post_id = (SELECT id FROM blog_posts WHERE slug = 'simples-nacional-2027-prazos-opcao-ibs-cbs');

INSERT INTO blog_post_related_services (post_id, service_slug, sort_order) VALUES
  ((SELECT id FROM blog_posts WHERE slug = 'simples-nacional-2027-prazos-opcao-ibs-cbs'), 'planejamento-tributario', 1),
  ((SELECT id FROM blog_posts WHERE slug = 'simples-nacional-2027-prazos-opcao-ibs-cbs'), 'consultoria-contabil', 2),
  ((SELECT id FROM blog_posts WHERE slug = 'simples-nacional-2027-prazos-opcao-ibs-cbs'), 'gestao-fiscal-e-tributaria', 3);


COMMIT;

-- =============================================
-- Verification queries (run after the script):
--
--   SELECT slug, status, published_at, featured_on_home, featured_order
--   FROM blog_posts ORDER BY published_at;
--
--   SELECT bp.slug, count(f.id) AS faq_count
--   FROM blog_posts bp
--   LEFT JOIN blog_post_faqs f ON f.post_id = bp.id
--   GROUP BY bp.slug ORDER BY bp.slug;
--
--   SELECT bp.slug, count(r.id) AS related_count
--   FROM blog_posts bp
--   LEFT JOIN blog_post_related_services r ON r.post_id = bp.id
--   GROUP BY bp.slug ORDER BY bp.slug;
--
--   -- Public visibility (should return only the 3 published, plus
--   -- scheduled posts whose published_at is already in the past):
--   SELECT slug, status, published_at FROM published_blog_posts
--   ORDER BY published_at DESC;
-- =============================================
