import type { Niche, NicheSlug } from '@/types/niche';

/**
 * Specialty pages — DM2 Contabilidade
 * Director decision (02-abr-2026). URL architecture final: root-level with
 * full keyword slugs.
 *
 * Editorial rule for niches (COPY-SYSTEM §11): the page speaks TO the
 * client, not ABOUT the service. Every intro and contexto opens with
 * "Se você é..." or "Você que..." — never with "A contabilidade para...".
 * The service-style copy lives in services/index.ts.
 */

export const niches: Record<NicheSlug, Niche> = {
  'contabilidade-para-advogados': {
    slug: 'contabilidade-para-advogados',
    title: 'Contabilidade para Advogados',
    metaTitle: 'Contabilidade para Advogados em São Paulo | DM2 Contabilidade',
    metaDescription:
      'Contabilidade para advogados e escritórios em São Paulo. ISS regime especial, Anexo IV do Simples, sociedade unipessoal e distribuição de lucros isentos.',
    h1: 'Contabilidade para Advogados em São Paulo',
    hero: {
      eyebrow: 'Para advogados em São Paulo',
      subtitle:
        'ISS por profissional habilitado, Anexo IV do Simples, distribuição de lucros isenta. A tributação da advocacia tem regras próprias — e precisa de um contador que as conheça.',
      keyFact: {
        value: 'ISS fixo',
        label: 'por profissional habilitado, regime especial municipal de SP',
      },
      cta: {
        text: 'Falar com a DM2 Contabilidade',
        promise: 'Análise da estrutura societária e do regime aplicável em 24h úteis.',
      },
    },
    intro:
      'Se você é advogado em São Paulo e atua como pessoa jurídica — sociedade unipessoal (SLU) ou banca com vários sócios — a tributação do seu escritório tem regras próprias. O ISS pode ser recolhido em valor fixo por profissional habilitado, conforme o regime especial previsto na legislação municipal, em vez de incidir sobre o faturamento. O Simples Nacional aplicado à advocacia segue o Anexo IV, sem inclusão da folha no fator R, e em muitos casos o Lucro Presumido pode ser mais vantajoso dependendo da margem operacional. A retirada de pró-labore precisa ser dimensionada para equilibrar carga previdenciária e distribuição de lucros isentos de Imposto de Renda. A DM2 Contabilidade atende escritórios de advocacia em São Paulo desde 2003, com atenção às particularidades do setor — do enquadramento societário à distribuição de lucros, do ISS fixo às retenções na fonte praticadas por contratantes corporativos.',
    stakes: [
      {
        label: 'PJ aberta como ME genérica em vez de SLU',
        detail:
          'Perde acesso ao regime especial de ISS por profissional em SP e expõe o sócio-único patrimonialmente.',
      },
      {
        label: 'Distribuição de lucros sem suporte contábil',
        detail:
          'Risco de descaracterização pela Receita e tributação como pró-labore (com encargos previdenciários).',
      },
      {
        label: 'Manutenção no Anexo IV sem revisão anual',
        detail:
          'Sem comparativo periódico com Lucro Presumido, escritórios pagam alíquota efetiva acima do necessário.',
      },
    ],
    sections: {
      contexto:
        'Você sabe que escritórios de advocacia e advogados autônomos atuando como PJ enfrentam uma tributação com regras próprias. O ISS da advocacia em São Paulo, o regime especial de tributação de sociedades unipessoais, a equiparação para fins de Simples Nacional pelo Anexo IV e as retenções na fonte praticadas por clientes corporativos são temas que um contador generalista raramente domina.',
      desafios:
        'Muitos advogados abrem PJ sem orientação adequada e acabam em um regime tributário que cobra mais do que deveria. Outros não aproveitam benefícios legais como a tributação fixa do ISS para sociedades de advogados em São Paulo, ou não fazem o planejamento correto da retirada de pró-labore e da distribuição de lucros isentos. O resultado é imposto pago a mais, exposição patrimonial e dificuldade de comprovar receita para crédito ou aquisição de imóveis.',
      solucao:
        'Na DM2 Contabilidade, entendemos a tributação da advocacia porque atendemos advogados e escritórios há anos. Analisamos sua estrutura atual, orientamos sobre o melhor enquadramento societário e tributário, e cuidamos de toda a rotina contábil e fiscal com atenção às particularidades do setor — do regime municipal à conciliação de retenções na fonte.',
    },
    diferencial:
      'Atendemos escritórios de advocacia em São Paulo entendendo o regime especial municipal e a particularidade do Anexo IV. Não aplicamos lógica de comércio em uma atividade intelectual, e não improvisamos sobre o regime de ISS — verificamos caso a caso a aplicabilidade do recolhimento fixo por profissional habilitado.',
    processo: [
      'Diagnóstico da estrutura atual (PF, EI, SLU ou sociedade) e do regime fiscal vigente',
      'Avaliação da aplicabilidade do ISS fixo em SP e do enquadramento no Anexo IV',
      'Definição da retirada de pró-labore e estratégia de distribuição de lucros isentos',
      'Acompanhamento mensal com calendário fiscal próprio e revisão anual de regime',
    ],
    faqs: [
      {
        question: 'Qual o melhor regime tributário para advogados?',
        answer:
          'Depende do faturamento, da estrutura societária e da cidade de atuação. Em geral, o Simples Nacional é vantajoso para faturamentos menores, mas o Lucro Presumido pode ser mais econômico dependendo da margem. A DM2 Contabilidade faz a simulação com os dados reais para recomendar.',
      },
      {
        question: 'Advogado PJ precisa de contador?',
        answer:
          'Sim. Qualquer empresa no Simples Nacional, Lucro Presumido ou Lucro Real tem obrigação de manter escrituração contábil regular, o que exige acompanhamento profissional.',
      },
      {
        question: 'O que é o regime especial de ISS para sociedades de advogados?',
        answer:
          'Em São Paulo, sociedades de advogados podem recolher ISS em valor fixo por profissional habilitado, ao invés de percentual sobre o faturamento. Isso pode representar uma economia significativa, mas depende do enquadramento correto e da formalização adequada do regime.',
      },
    ],
    relatedServices: ['planejamento-tributario', 'consultoria-contabil'],
    relatedPosts: [
      'reforma-tributaria-prestadores-de-servico-sao-paulo',
      'simples-nacional-2027-prazos-opcao-ibs-cbs',
    ],
    finalCta: {
      title: 'Sua banca precisa de contador que entenda advocacia?',
      subtitle:
        'Diagnóstico da estrutura societária e verificação do regime de ISS aplicável ao seu escritório. Resposta em 24h úteis.',
      buttonText: 'Quero conversar',
    },
    priority: 'alta',
  },

  'contabilidade-para-profissionais-da-saude': {
    slug: 'contabilidade-para-profissionais-da-saude',
    title: 'Contabilidade para Profissionais da Saúde',
    metaTitle: 'Contabilidade para Profissionais da Saúde em São Paulo | DM2 Contabilidade',
    metaDescription:
      'Contabilidade para médicos, dentistas e profissionais da saúde em São Paulo. Equiparação hospitalar, Livro Caixa, retenções na fonte e tributação de PJ médica.',
    h1: 'Contabilidade para Profissionais da Saúde em São Paulo',
    hero: {
      eyebrow: 'Para médicos, dentistas e profissionais da saúde',
      subtitle:
        'Equiparação hospitalar, Livro Caixa, controle de retenções de hospitais e planos. PJ médica feita com método — não improvisada.',
      keyFact: {
        value: '8% / 12%',
        label: 'IRPJ e CSLL com equiparação hospitalar (Lei 9.249/95)',
      },
      cta: {
        text: 'Avaliar minha PJ',
        promise: 'Verificamos se a equiparação se aplica ao seu caso em 24h úteis.',
      },
    },
    intro:
      'Se você é médico, dentista, fisioterapeuta, psicólogo ou nutricionista atuando como pessoa jurídica em São Paulo, a sua tributação tem benefícios e armadilhas que um contador generalista raramente domina. A equiparação hospitalar prevista na Lei 9.249/95 reduz a base de cálculo do IRPJ de 32% para 8% e da CSLL de 32% para 12% no Lucro Presumido, quando há prestação de serviços hospitalares ou de auxílio diagnóstico e terapia conforme as resoluções da ANVISA. Para quem ainda atua como pessoa física, o Livro Caixa permite deduzir despesas profissionais (aluguel de consultório, material, cursos e congressos) da base do IRPF. As retenções na fonte feitas por hospitais, clínicas e planos de saúde exigem controle rigoroso para evitar pagamento em duplicidade no encerramento do exercício. A DM2 Contabilidade atende a área da saúde em São Paulo com a precisão técnica que a legislação exige.',
    stakes: [
      {
        label: 'Equiparação hospitalar não aplicada',
        detail:
          'IRPJ calculado sobre 32% do faturamento em vez de 8% — diferença de até 75% no imposto devido por trimestre.',
      },
      {
        label: 'Retenções de hospitais e planos não computadas',
        detail:
          'Você acaba pagando o mesmo tributo duas vezes (na nota e no fechamento) ou perde o crédito no encerramento.',
      },
      {
        label: 'Permanência como PF acima do ponto de virada',
        detail:
          'IR como pessoa física pode chegar a 27,5%, contra alíquota efetiva de ~16% via PJ no Simples bem dimensionada.',
      },
    ],
    sections: {
      contexto:
        'Você sabe que a tributação de quem atua na saúde é uma das mais complexas — e mais cheias de oportunidade — do mercado. Médicos que operam como pessoa jurídica podem se beneficiar da equiparação hospitalar, que reduz a base de cálculo do IRPJ e da CSLL de 32% para 8% e 12%, respectivamente. Mas nem todos os contadores conhecem os requisitos técnicos e a documentação exigida para aplicar esse benefício corretamente.',
      desafios:
        'Muitos profissionais da saúde pagam mais impostos do que precisam porque não têm orientação sobre equiparação hospitalar, não utilizam o Livro Caixa quando atuam como pessoa física, ou estão em um regime tributário inadequado para o volume de faturamento. Além disso, as retenções na fonte por parte de hospitais e planos de saúde exigem controle rigoroso para evitar pagamento em duplicidade.',
      solucao:
        'A DM2 Contabilidade atende profissionais da saúde em São Paulo com atenção específica para essas particularidades. Verificamos tecnicamente se a equiparação hospitalar se aplica ao seu caso, definimos o melhor regime tributário, controlamos retenções na fonte e cuidamos de toda a rotina contábil com o rigor que a área exige.',
    },
    diferencial:
      'A equiparação hospitalar exige verificação técnica caso a caso — não é um carimbo automático. Conhecemos a literatura da Receita Federal e os limites práticos de aplicação para clínicas, consultórios e PJ médica, e preparamos a documentação que sustenta o benefício em uma eventual fiscalização.',
    processo: [
      'Análise da atividade exercida e verificação técnica da equiparação hospitalar',
      'Comparativo PF (Livro Caixa) vs PJ com simulação do regime mais vantajoso',
      'Implementação do controle de retenções na fonte por hospitais, clínicas e planos',
      'Acompanhamento mensal e fechamento anual com aproveitamento integral das retenções',
    ],
    faqs: [
      {
        question: 'O que é equiparação hospitalar para médicos PJ?',
        answer:
          'A equiparação hospitalar permite que empresas médicas que prestam serviços hospitalares ou de auxílio diagnóstico e terapia calculem IRPJ e CSLL sobre uma base reduzida: 8% e 12% do faturamento, ao invés de 32%. É um benefício previsto em lei (Lei 9.249/95) que pode reduzir significativamente a carga tributária.',
      },
      {
        question: 'Médico deve atuar como PF ou PJ?',
        answer:
          'Depende do volume de receitas e da forma de atuação. Para faturamentos acima de R$ 8.000 a R$ 10.000 mensais, a PJ costuma ser mais vantajosa. A DM2 Contabilidade faz a simulação comparativa com os dados reais para recomendar a melhor estrutura.',
      },
      {
        question: 'O que é o Livro Caixa para profissionais da saúde?',
        answer:
          'O Livro Caixa permite que profissionais autônomos (pessoa física) deduzam despesas profissionais da base de cálculo do IRPF. Para médicos que ainda atuam como PF, isso pode representar uma redução importante no imposto de renda.',
      },
      {
        question: 'A DM2 Contabilidade atende dentistas e outros profissionais de saúde?',
        answer:
          'Sim. Atendemos médicos, dentistas, fisioterapeutas, psicólogos e outros profissionais da saúde que atuam como PJ em São Paulo. A lógica tributária é semelhante, com particularidades por atividade.',
      },
    ],
    relatedServices: ['planejamento-tributario', 'consultoria-contabil'],
    relatedPosts: [
      'reforma-tributaria-prestadores-de-servico-sao-paulo',
      'ibs-cbs-notas-fiscais-2026-empresas-sao-paulo',
    ],
    finalCta: {
      title: 'Sua PJ médica está aproveitando a equiparação hospitalar?',
      subtitle:
        'Verificamos tecnicamente se a Lei 9.249/95 se aplica ao seu caso e simulamos o impacto no IRPJ e CSLL. Resposta em 24h úteis.',
      buttonText: 'Quero a verificação',
    },
    priority: 'alta',
  },

  'contabilidade-para-negocios-digitais': {
    slug: 'contabilidade-para-negocios-digitais',
    title: 'Contabilidade para Negócios Digitais',
    metaTitle: 'Contabilidade para Negócios Digitais em São Paulo | DM2 Contabilidade',
    metaDescription:
      'Contabilidade para infoprodutores, e-commerce e prestadores online em São Paulo. Tributação de receitas Hotmart, Eduzz, marketplaces e moeda estrangeira.',
    h1: 'Contabilidade para Negócios Digitais em São Paulo',
    hero: {
      eyebrow: 'Para infoprodutores, e-commerce e prestadores online',
      subtitle:
        'Hotmart, Eduzz, marketplaces e receita em moeda estrangeira. Cada fonte tem regra própria — e a soma define seu regime e seu CNAE.',
      keyFact: {
        value: 'R$ 81.000',
        label: 'limite anual MEI / R$ 4,8 milhões Simples Nacional',
      },
      cta: {
        text: 'Falar com a DM2 Contabilidade',
        promise: 'Mapeamos seu mix de receitas e indicamos o regime certo em 24h úteis.',
      },
    },
    intro:
      'Se você fatura por plataformas como Hotmart, Eduzz, Kiwify, Shopee, Mercado Livre, Amazon, YouTube, redes sociais ou patrocínios — ou se opera um e-commerce próprio ou presta serviços digitais para o exterior — sua contabilidade enfrenta um mix de regras tributárias que mudam conforme cada fonte de receita. Venda de produto digital, prestação de serviço, royalties, intermediação ou comissão recebida em moeda estrangeira via PayPal, Wise ou conta internacional têm tratamentos fiscais distintos. Isso afeta a escolha do CNAE, do regime tributário (Simples Nacional, Lucro Presumido ou Lucro Real) e da emissão da nota fiscal eletrônica de serviço. Quem ultrapassa o limite do MEI (R$ 81.000 por ano) ou do Simples (R$ 4,8 milhões) precisa planejar a transição com antecedência, sob pena de cair no Lucro Presumido sem preparação. A DM2 Contabilidade acompanha negócios digitais em São Paulo com a agilidade que o setor exige, sem perder rigor técnico.',
    stakes: [
      {
        label: 'Receita de marketplace classificada como serviço quando é venda de produto',
        detail:
          'ISS indevido, NF emitida no município errado e risco de autuação por classificação fiscal incorreta.',
      },
      {
        label: 'Receita em moeda estrangeira sem conversão correta',
        detail:
          'Subdeclaração não intencional, risco fiscal e perda da contabilização em câmbio do dia da operação.',
      },
      {
        label: 'Ultrapassagem do limite do Simples sem preparação',
        detail:
          'Enquadramento automático no Lucro Presumido com efeito retroativo no exercício, sem cálculo prévio do impacto.',
      },
    ],
    sections: {
      contexto:
        'Você sabe que o mercado digital cresce rápido e a legislação tributária nem sempre acompanha no mesmo ritmo. Receitas de marketplaces, plataformas de infoprodutos, publicidade online, serviços prestados remotamente, royalties — cada fonte de receita pode ter um tratamento tributário diferente, e o enquadramento errado gera custos desnecessários ou risco fiscal evitável.',
      desafios:
        'Muitos empreendedores digitais começam como pessoa física ou MEI e rapidamente ultrapassam os limites de faturamento sem planejar a transição. Outros operam com múltiplas fontes de receita (serviços, produtos digitais, publicidade) sem entender como cada uma é tributada. O resultado: imposto pago a mais, obrigações em atraso ou risco fiscal acumulado.',
      solucao:
        'A DM2 Contabilidade acompanha negócios digitais em São Paulo com atenção a essas particularidades. Mapeamos seu mix de receitas, definimos o melhor tipo societário, escolhemos os CNAEs compatíveis com cada fonte, e cuidamos da rotina contábil com a agilidade que o setor digital exige.',
    },
    diferencial:
      'O setor digital muda rápido — lançamentos, cohorts, ciclos de marketplace, mudança de regra das plataformas. Acompanhamos com agilidade compatível com essa dinâmica, sem perder rigor de obrigação acessória nem improvisar sobre tributação de receitas internacionais.',
    processo: [
      'Mapeamento do mix de receitas (produto digital, serviço, royalties, comissões internacionais)',
      'Definição do CNAE primário e secundários compatíveis com cada fonte de receita',
      'Escolha do regime tributário considerando projeção de crescimento e limite Simples',
      'Acompanhamento mensal com agilidade compatível com ciclos de venda digital',
    ],
    faqs: [
      {
        question: 'Infoprodutor precisa de CNPJ?',
        answer:
          'Não é obrigatório para começar, mas a partir de certo volume de vendas é muito mais vantajoso operar como PJ. O imposto como pessoa física pode chegar a 27,5%, enquanto como PJ no Simples Nacional a alíquota inicial é significativamente menor.',
      },
      {
        question: 'Como é tributada a receita de marketplace?',
        answer:
          'A receita de vendas em marketplaces (Hotmart, Eduzz, Amazon, Mercado Livre) é tributada conforme o regime da empresa. O importante é classificar corretamente se é venda de produto, prestação de serviço ou intermediação, pois cada uma tem tratamento fiscal diferente.',
      },
      {
        question: 'A DM2 Contabilidade atende empresas que faturam por plataformas internacionais?',
        answer:
          'Sim. Receitas em moeda estrangeira ou de plataformas internacionais têm regras específicas de conversão cambial e tributação. Orientamos sobre o tratamento correto para evitar problemas com a Receita Federal.',
      },
    ],
    relatedServices: ['abertura-e-regularizacao-de-empresas', 'consultoria-contabil'],
    relatedPosts: [
      'abertura-de-empresa-em-sao-paulo-regime-tributario-2026',
      'simples-nacional-2027-prazos-opcao-ibs-cbs',
      'ibs-cbs-notas-fiscais-2026-empresas-sao-paulo',
    ],
    finalCta: {
      title: 'Múltiplas fontes de receita digital, uma só contabilidade técnica.',
      subtitle:
        'Mapeamos seu mix de receitas (Hotmart, marketplaces, exterior) e indicamos por escrito o melhor regime e o CNAE certo. Resposta em 24h úteis.',
      buttonText: 'Quero o mapeamento',
    },
    priority: 'alta',
  },
};

export const nicheList = Object.values(niches);

export function getNiche(slug: NicheSlug): Niche | undefined {
  return niches[slug];
}

export const nicheSlugs = Object.keys(niches) as NicheSlug[];
