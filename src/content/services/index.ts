import type { Service, ServiceSlug } from '@/types/service';

/**
 * Core services — DM2 Contabilidade
 * Director decision (02-abr-2026): 4 core services confirmed.
 * Route: /servicos-contabeis/[slug]
 */

export const services: Record<ServiceSlug, Service> = {
  'consultoria-contabil': {
    slug: 'consultoria-contabil',
    title: 'Consultoria Contábil',
    metaTitle: 'Consultoria Contábil em São Paulo | DM2 Contabilidade',
    metaDescription:
      'Consultoria contábil em São Paulo para empresas que precisam de orientação estratégica, não só entrega de obrigações. Escritório em Vila Mariana, desde 2003.',
    h1: 'Consultoria Contábil em São Paulo',
    intro:
      'A consultoria contábil é o serviço de acompanhamento mensal que combina escrituração, análise dos números do negócio e orientação técnica para a tomada de decisões empresariais. Diferente da contabilidade tradicional, que se limita a entregar guias e obrigações acessórias, a consultoria atua de forma ativa: revisa o enquadramento tributário (Simples Nacional, Lucro Presumido ou Lucro Real), monitora margem, custos e indicadores do DRE, alerta sobre prazos do SPED Contábil, DCTF, EFD-Contribuições e DIRF, e indica caminhos para reduzir a carga fiscal dentro da lei. Aplica-se a empresas de pequeno e médio porte que precisam usar a contabilidade como ferramenta de gestão, não apenas como obrigação burocrática. A DM2 Contabilidade atua em Vila Mariana, São Paulo, desde 2003, com mais de 22 anos de experiência atendendo empresas em diferentes setores. Cada cliente tem acompanhamento individualizado e relatórios mensais com orientações práticas. Nada é processado em massa.',
    sections: {
      contexto:
        'Muitas empresas tratam a contabilidade como uma obrigação burocrática: entregam documentos todo mês e esperam que tudo esteja em dia. Mas a contabilidade bem feita é uma ferramenta de gestão. Ela mostra o que está funcionando, o que está custando caro e onde estão as oportunidades.',
      problema:
        'Sem orientação contábil ativa, empresas pagam mais impostos do que precisam, perdem prazos que geram multas, e tomam decisões financeiras sem informação suficiente. O contador que só entrega guias não resolve isso.',
      solucao:
        'Na DM2 Contabilidade, cada cliente tem acompanhamento contábil mensal com análise real. Revisamos enquadramento tributário, acompanhamos obrigações acessórias, e orientamos sobre decisões que afetam o caixa, antes que virem problemas.',
      diferencial:
        'Estamos em São Paulo desde 2003. Não somos um escritório que processa documentos em massa. Conhecemos cada cliente pelo nome, entendemos cada operação, e trabalhamos com a atenção que a contabilidade séria exige.',
    },
    processo: [
      'Análise inicial da situação contábil e fiscal da empresa',
      'Definição do enquadramento tributário mais adequado',
      'Escrituração e acompanhamento mensal das obrigações',
      'Relatórios periódicos com orientações práticas',
      'Revisão anual de regime e planejamento para o exercício seguinte',
    ],
    faqs: [
      {
        question: 'Qual a diferença entre consultoria contábil e contabilidade comum?',
        answer:
          'A contabilidade comum se limita a entregar obrigações fiscais. A consultoria contábil analisa a situação da empresa, identifica oportunidades de economia tributária e orienta decisões financeiras com base nos números reais do negócio.',
      },
      {
        question: 'A DM2 Contabilidade atende empresas de qualquer porte?',
        answer:
          'Atendemos empresas de pequeno e médio porte em São Paulo. Nosso foco é em negócios que precisam de atenção individualizada. Não trabalhamos com processamento em massa.',
      },
      {
        question: 'Com que frequência recebo orientações sobre minha empresa?',
        answer:
          'O acompanhamento é mensal. Além da escrituração e entrega de obrigações, enviamos análises e alertas sempre que identificamos algo que merece atenção, como mudanças na legislação, oportunidades de economia ou prazos importantes.',
      },
      {
        question: 'Posso trocar de contador e migrar para a DM2 Contabilidade?',
        answer:
          'Sim. Cuidamos de todo o processo de transição: recebemos a documentação do escritório anterior, fazemos a análise da situação atual e assumimos o acompanhamento sem interrupção.',
      },
    ],
    relatedServices: ['planejamento-tributario', 'gestao-fiscal-e-tributaria'],
    relatedNiches: ['advogados', 'profissionais-da-saude'],
    relatedPosts: [],
    priority: 'maxima',
  },

  'planejamento-tributario': {
    slug: 'planejamento-tributario',
    title: 'Planejamento Tributário',
    metaTitle: 'Planejamento Tributário em São Paulo | DM2 Contabilidade',
    metaDescription:
      'Planejamento tributário em São Paulo. Análise de regime fiscal, simulação de cenários e estratégias legais para reduzir a carga tributária da sua empresa.',
    h1: 'Planejamento Tributário em São Paulo',
    intro:
      'O planejamento tributário é a análise técnica que define qual regime fiscal (Simples Nacional, Lucro Presumido ou Lucro Real) gera a menor carga tributária para uma empresa específica, considerando faturamento anual, atividade exercida, folha de pagamento, fator R e projeção de crescimento para os próximos exercícios. É um procedimento legal, previsto na própria legislação brasileira, que se diferencia da sonegação por usar mecanismos da Lei Complementar 123/2006 e do Decreto 9.580/2018. Aplica-se a empresas que estão definindo o regime na abertura, que ultrapassaram o limite de R$ 4,8 milhões do Simples Nacional, que mantêm o mesmo enquadramento há mais de um ano sem revisão, ou que mudaram a estrutura societária recentemente. A DM2 Contabilidade atua em São Paulo desde 2003 e faz a simulação comparativa com os números reais da empresa antes de qualquer recomendação. Apresentamos os cenários com fundamentação técnica, o empresário decide.',
    sections: {
      contexto:
        'A legislação tributária brasileira é complexa e muda com frequência. Simples Nacional, Lucro Presumido, Lucro Real: cada regime tem regras próprias, alíquotas diferentes e implicações que variam conforme o faturamento, a atividade e a estrutura da empresa.',
      problema:
        'Muitas empresas permanecem no mesmo regime tributário por anos sem revisar se ainda é o mais vantajoso. Outras abrem no Simples Nacional por simplicidade, mesmo quando o Lucro Presumido seria mais econômico. Sem planejamento, a empresa paga mais do que precisa.',
      solucao:
        'Na DM2 Contabilidade, fazemos a simulação comparativa entre regimes, considerando faturamento, folha de pagamento, atividade e projeção de crescimento. Apresentamos os cenários com números claros para que o empresário tome a decisão informada.',
      diferencial:
        'Não oferecemos planejamento tributário genérico. Cada análise é feita com os dados reais da empresa, considerando a legislação atual e as particularidades do setor de atuação.',
    },
    processo: [
      'Levantamento dos dados fiscais e financeiros da empresa',
      'Simulação comparativa entre regimes tributários',
      'Análise de impacto considerando projeção de crescimento',
      'Apresentação dos cenários com recomendação fundamentada',
      'Implementação da mudança, quando aprovada pelo cliente',
    ],
    faqs: [
      {
        question: 'Qual a diferença entre Simples Nacional e Lucro Presumido?',
        answer:
          'O Simples Nacional é um regime simplificado para empresas com faturamento anual de até R$ 4,8 milhões, com alíquota unificada. O Lucro Presumido calcula o imposto sobre uma margem de lucro presumida pela Receita Federal. Dependendo da atividade e do faturamento, um pode ser significativamente mais vantajoso que o outro.',
      },
      {
        question: 'Com que frequência devo revisar meu regime tributário?',
        answer:
          'A revisão deve ser feita ao menos uma vez por ano, preferencialmente antes do início do exercício fiscal. Mudanças no faturamento, na estrutura societária ou na legislação podem tornar outro regime mais adequado.',
      },
      {
        question: 'O planejamento tributário é legal?',
        answer:
          'Sim. O planejamento tributário utiliza mecanismos previstos na própria legislação para otimizar a carga fiscal. É diferente de sonegação, que é ilegal. A DM2 Contabilidade trabalha exclusivamente dentro da lei.',
      },
    ],
    relatedServices: ['consultoria-contabil', 'gestao-fiscal-e-tributaria'],
    relatedNiches: ['advogados', 'profissionais-da-saude', 'negocios-digitais'],
    relatedPosts: [],
    priority: 'maxima',
  },

  'gestao-fiscal-e-tributaria': {
    slug: 'gestao-fiscal-e-tributaria',
    title: 'Gestão Fiscal e Tributária',
    metaTitle: 'Gestão Fiscal e Tributária em São Paulo | DM2 Contabilidade',
    metaDescription:
      'Gestão fiscal e tributária em São Paulo. Acompanhamento de obrigações, análise de notas fiscais, apuração de impostos e conformidade fiscal para empresas.',
    h1: 'Gestão Fiscal e Tributária em São Paulo',
    intro:
      'A gestão fiscal e tributária é o serviço que cuida da rotina mensal de apuração e recolhimento de impostos (ICMS, ISS, PIS, COFINS, IRPJ, CSLL), conferência de notas fiscais emitidas e recebidas, controle de retenções na fonte (IRRF, INSS, ISS retido) e entrega das obrigações acessórias dentro dos prazos legais. Inclui SPED Fiscal, EFD-Contribuições, DCTF, DIRF, DEFIS e demais declarações que variam conforme o regime tributário e a atividade da empresa. A entrega fora do prazo gera multas automáticas que podem chegar a 2% sobre o valor declarado por mês de atraso, com limite de 20%. Erros na classificação fiscal de produtos ou serviços geram autuações com juros e correção monetária. Aplica-se a toda empresa que emite nota fiscal, paga tributos ou tem funcionários registrados. A DM2 Contabilidade atua em São Paulo desde 2003 com calendário fiscal individualizado por cliente e alertas proativos antes de cada vencimento.',
    sections: {
      contexto:
        'Toda empresa que emite nota fiscal, paga impostos ou tem funcionários precisa manter uma rotina fiscal organizada. Isso inclui apuração mensal de ICMS, ISS, PIS, COFINS, retenções na fonte e uma série de obrigações acessórias que mudam conforme o regime e a atividade.',
      problema:
        'Erros na apuração de impostos geram multas. Notas fiscais emitidas com erro geram retrabalho. Obrigações entregues fora do prazo geram penalidades. E tudo isso se acumula quando a gestão fiscal não é acompanhada de perto.',
      solucao:
        'A DM2 Contabilidade cuida de toda a rotina fiscal da sua empresa: da apuração à entrega, da conferência de notas ao acompanhamento de prazos. Você opera, a gente garante que o fiscal está em ordem.',
      diferencial:
        'Não processamos em lote. Cada empresa tem prazos, particularidades e riscos diferentes. Nosso acompanhamento é individualizado e inclui alertas proativos. Não esperamos o problema acontecer.',
    },
    processo: [
      'Mapeamento das obrigações fiscais da empresa',
      'Configuração de calendário fiscal próprio para cada empresa',
      'Apuração mensal de impostos e contribuições',
      'Conferência e orientação sobre emissão de notas fiscais',
      'Entrega de obrigações acessórias nos prazos legais',
    ],
    faqs: [
      {
        question: 'O que são obrigações acessórias?',
        answer:
          'São declarações e relatórios que a empresa precisa entregar ao fisco, além do pagamento dos impostos. Exemplos: SPED Fiscal, EFD-Contribuições, DCTF, DIRF. O não cumprimento gera multas automáticas.',
      },
      {
        question: 'Qual a diferença entre gestão fiscal e planejamento tributário?',
        answer:
          'A gestão fiscal cuida da operação do dia a dia: apurar impostos, entregar obrigações, conferir notas. O planejamento tributário é estratégico: avalia se o regime fiscal é o mais adequado e busca formas legais de reduzir a carga tributária.',
      },
      {
        question: 'A DM2 Contabilidade cuida da emissão de notas fiscais?',
        answer:
          'A emissão é responsabilidade da empresa, mas orientamos sobre a configuração correta (CFOP, CST, alíquotas, retenções). Também conferimos as notas emitidas para evitar erros que gerem problemas fiscais.',
      },
    ],
    relatedServices: ['planejamento-tributario', 'consultoria-contabil'],
    relatedNiches: ['advogados', 'negocios-digitais'],
    relatedPosts: [],
    priority: 'alta',
  },

  'abertura-e-regularizacao-de-empresas': {
    slug: 'abertura-e-regularizacao-de-empresas',
    title: 'Abertura e Regularização de Empresas',
    metaTitle: 'Abertura e Regularização de Empresas em São Paulo | DM2 Contabilidade',
    metaDescription:
      'Abertura e regularização de empresas em São Paulo. Do CNPJ à operação: tipo societário, inscrições, alvarás e regime tributário. Escritório em Vila Mariana.',
    h1: 'Abertura e Regularização de Empresas em São Paulo',
    intro:
      'A abertura de empresas é o processo formal que vai da definição do tipo societário (MEI, ME, LTDA, SLU ou SA) até a emissão do CNPJ, inscrições estadual e municipal, alvará de funcionamento, licença sanitária quando aplicável, e enquadramento no regime tributário (Simples Nacional, Lucro Presumido ou Lucro Real). Em São Paulo, o processo completo costuma levar entre 15 e 45 dias, dependendo da atividade e das licenças exigidas pela prefeitura e órgãos reguladores. A escolha errada de CNAE, tipo societário ou regime fiscal gera tributação acima do necessário, restrições operacionais e dificuldade para mudar depois sem custos. A regularização atende empresas com pendências fiscais, cadastros desatualizados, obrigações em atraso ou alteração de quadro societário. A DM2 Contabilidade atua em São Paulo desde 2003 e analisa o cenário antes de registrar qualquer coisa: orientamos a decisão, escolhemos o CNAE correto e cuidamos de todas as inscrições e licenças necessárias para operar.',
    sections: {
      contexto:
        'Abrir uma empresa em São Paulo envolve decisões que afetam diretamente a tributação, a responsabilidade dos sócios e a operação do negócio. Tipo societário (MEI, ME, LTDA, SLU), regime tributário, atividades no CNAE, inscrições e licenças. Cada escolha tem consequências.',
      problema:
        'Muitos empresários abrem a empresa sem orientação e acabam com um enquadramento errado, um CNAE que limita suas operações, ou um regime tributário que cobra mais do que deveria. Corrigir depois custa tempo e dinheiro.',
      solucao:
        'Na DM2 Contabilidade, analisamos o cenário antes de registrar qualquer coisa. Orientamos sobre o tipo societário mais adequado, escolhemos os CNAEs corretos, definimos o melhor regime tributário e cuidamos de todas as inscrições e licenças necessárias para operar em São Paulo.',
      diferencial:
        'Não apenas abrimos empresas. Orientamos a decisão. A abertura é o primeiro ato de planejamento tributário. Fazemos as duas coisas juntas desde o primeiro dia.',
    },
    processo: [
      'Análise do cenário: atividade, faturamento previsto, sócios',
      'Definição do tipo societário e regime tributário',
      'Registro na Junta Comercial e emissão do CNPJ',
      'Inscrições estadual e municipal, alvarás e licenças',
      'Configuração fiscal e início do acompanhamento contábil',
    ],
    faqs: [
      {
        question: 'Quanto tempo leva para abrir uma empresa em São Paulo?',
        answer:
          'O prazo varia conforme o tipo societário e a atividade. Em geral, o processo completo (CNPJ, inscrições, alvará) leva de 15 a 45 dias. Atividades que exigem licenças especiais podem levar mais.',
      },
      {
        question: 'Qual a diferença entre MEI, ME e LTDA?',
        answer:
          'O MEI é para faturamento de até R$ 81.000/ano, sem sócios e com atividades limitadas. A ME (Microempresa) permite faturamento de até R$ 360.000/ano no Simples Nacional. A LTDA é uma sociedade limitada, adequada para empresas com sócios e sem limite de faturamento no regime.',
      },
      {
        question: 'A DM2 Contabilidade também regulariza empresas com pendências?',
        answer:
          'Sim. Trabalhamos com regularização de empresas que têm pendências fiscais, obrigações em atraso ou cadastro desatualizado. Fazemos o diagnóstico, resolvemos as pendências e colocamos a empresa em dia.',
      },
      {
        question: 'Preciso de contador para abrir empresa?',
        answer:
          'Para MEI, não é obrigatório, mas é recomendado. Para ME, LTDA e qualquer empresa no Simples Nacional, Lucro Presumido ou Lucro Real, o acompanhamento contábil é obrigatório por lei.',
      },
    ],
    relatedServices: ['consultoria-contabil', 'planejamento-tributario'],
    relatedNiches: ['negocios-digitais'],
    relatedPosts: [],
    priority: 'maxima',
  },
};

export const serviceList = Object.values(services);

export function getService(slug: ServiceSlug): Service | undefined {
  return services[slug];
}

export const serviceSlugs = Object.keys(services) as ServiceSlug[];
