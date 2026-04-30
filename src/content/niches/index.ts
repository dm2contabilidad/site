import type { Niche, NicheSlug } from '@/types/niche';

/**
 * Specialty pages — DM2 Contabilidade
 * PROVISIONAL — Director decision (02-abr-2026).
 * URL architecture final: root-level with full keyword slugs.
 */

export const niches: Record<NicheSlug, Niche> = {
  'contabilidade-para-advogados': {
    slug: 'contabilidade-para-advogados',
    title: 'Contabilidade para Advogados',
    metaTitle: 'Contabilidade para Advogados em São Paulo | DM2 Contabilidade',
    metaDescription:
      'Contabilidade especializada para advogados e escritórios de advocacia em São Paulo. Tributação de sociedade de advogados, ISS, regime especial e planejamento fiscal.',
    h1: 'Contabilidade para Advogados em São Paulo',
    intro:
      'A contabilidade para advogados em São Paulo trata da escrituração, apuração de impostos e planejamento tributário de profissionais que atuam como pessoa jurídica, individualmente (SLU) ou em sociedade de advocacia. A tributação da advocacia tem regras específicas: o ISS pode ser recolhido em valor fixo por profissional habilitado, conforme o regime especial previsto na legislação municipal de São Paulo, em vez de incidir sobre o faturamento. O enquadramento no Simples Nacional segue o Anexo IV (sem inclusão da folha no fator R) e exige análise antes da escolha, já que o Lucro Presumido pode ser mais vantajoso dependendo da margem operacional. A retirada de pró-labore exige planejamento para equilibrar carga previdenciária e distribuição de lucros isentos. Aplica-se a advogados autônomos que pretendem abrir PJ, sociedades unipessoais e bancas com vários sócios. A DM2 Contabilidade atua em São Paulo desde 2003 e atende escritórios de advocacia com atenção às particularidades do setor, do ISS fixo à distribuição de lucros isentos de IR.',
    sections: {
      contexto:
        'Escritórios de advocacia e advogados autônomos que atuam como PJ enfrentam uma tributação com regras específicas. O ISS da advocacia, o regime especial de tributação de sociedades unipessoais, a equiparação de serviços para fins de Simples Nacional e as retenções na fonte são temas que um contador generalista nem sempre domina.',
      desafios:
        'Muitos advogados abrem PJ sem orientação adequada e acabam em um regime tributário que cobra mais do que deveria. Outros não aproveitam benefícios legais como a tributação fixa do ISS para sociedades de advogados em São Paulo, ou não fazem o planejamento correto de retirada de pró-labore e distribuição de lucros.',
      solucao:
        'Na DM2 Contabilidade, entendemos a tributação da advocacia porque atendemos advogados e escritórios há anos. Analisamos o cenário de cada profissional, orientamos sobre o melhor enquadramento e cuidamos de toda a rotina contábil e fiscal com atenção às particularidades do setor.',
    },
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
          'Em São Paulo, sociedades de advogados podem recolher ISS em valor fixo por profissional, ao invés de percentual sobre o faturamento. Isso pode representar uma economia significativa, mas depende do enquadramento correto.',
      },
    ],
    relatedServices: ['planejamento-tributario', 'consultoria-contabil'],
    relatedPosts: [],
    priority: 'alta',
  },

  'contabilidade-para-profissionais-da-saude': {
    slug: 'contabilidade-para-profissionais-da-saude',
    title: 'Contabilidade para Profissionais da Saúde',
    metaTitle: 'Contabilidade para Profissionais da Saúde em São Paulo | DM2 Contabilidade',
    metaDescription:
      'Contabilidade para médicos, dentistas e profissionais da saúde em São Paulo. Equiparação hospitalar, Livro Caixa, tributação de PJ médica e planejamento fiscal.',
    h1: 'Contabilidade para Profissionais da Saúde em São Paulo',
    intro:
      'A contabilidade para profissionais da saúde em São Paulo cuida da tributação, escrituração e planejamento fiscal de médicos, dentistas, fisioterapeutas, psicólogos, nutricionistas e outros profissionais que atuam como pessoa jurídica. O setor tem benefícios tributários específicos: a equiparação hospitalar prevista na Lei 9.249/95 reduz a base de cálculo do IRPJ de 32% para 8% e da CSLL de 32% para 12% no Lucro Presumido, quando há prestação de serviços hospitalares ou de auxílio diagnóstico e terapia conforme as resoluções da ANVISA. Para profissionais que ainda atuam como pessoa física, o Livro Caixa permite deduzir despesas profissionais (aluguel de consultório, material, cursos e congressos) da base de cálculo do IRPF. As retenções na fonte feitas por hospitais, clínicas e planos de saúde exigem controle rigoroso para evitar pagamento em duplicidade no encerramento do exercício. A DM2 Contabilidade atua em São Paulo desde 2003 e atende a área da saúde com a precisão técnica que a legislação exige.',
    sections: {
      contexto:
        'A tributação de profissionais da saúde que atuam como PJ é uma das mais complexas do mercado. Médicos que operam como pessoa jurídica podem se beneficiar da equiparação hospitalar, que reduz a base de cálculo do IRPJ e da CSLL de 32% para 8% e 12%, respectivamente. Mas nem todos os contadores sabem aplicar esse benefício corretamente.',
      desafios:
        'Muitos profissionais da saúde pagam mais impostos do que precisam porque não têm orientação sobre equiparação hospitalar, não utilizam o Livro Caixa quando atuam como pessoa física, ou estão em um regime tributário inadequado para o volume de faturamento. Além disso, as retenções na fonte por parte de hospitais e planos de saúde exigem controle rigoroso para evitar pagamento em duplicidade.',
      solucao:
        'A DM2 Contabilidade atende profissionais da saúde em São Paulo com atenção específica para essas particularidades. Analisamos se a equiparação hospitalar se aplica, definimos o melhor regime tributário, controlamos retenções na fonte e cuidamos de toda a rotina contábil com o rigor que a área exige.',
    },
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
    relatedPosts: [],
    priority: 'alta',
  },

  'contabilidade-para-negocios-digitais': {
    slug: 'contabilidade-para-negocios-digitais',
    title: 'Contabilidade para Negócios Digitais',
    metaTitle: 'Contabilidade para Negócios Digitais em São Paulo | DM2 Contabilidade',
    metaDescription:
      'Contabilidade para negócios digitais em São Paulo. Infoprodutores, e-commerce, influenciadores e startups. Tributação de receitas online, abertura de PJ e planejamento fiscal.',
    h1: 'Contabilidade para Negócios Digitais em São Paulo',
    intro:
      'A contabilidade para negócios digitais em São Paulo atende infoprodutores, e-commerces, prestadores de serviços online, influenciadores digitais e startups que faturam por plataformas como Hotmart, Eduzz, Kiwify, Shopee, Mercado Livre, Amazon, YouTube, redes sociais e patrocínios. Cada fonte de receita pode ter tratamento tributário diferente: venda de produto digital, prestação de serviço, royalties, intermediação ou comissão recebida em moeda estrangeira via PayPal, Wise ou conta internacional. Isso afeta diretamente a escolha do CNAE, do regime tributário (Simples Nacional, Lucro Presumido ou Lucro Real) e da forma de emissão da nota fiscal de serviço eletrônica. Quem ultrapassa o limite do MEI (R$ 81.000 por ano) ou do Simples Nacional (R$ 4,8 milhões) precisa planejar a transição com antecedência para não ser desenquadrado de surpresa e cair no Lucro Presumido sem preparação. A DM2 Contabilidade atua em São Paulo desde 2003 e acompanha negócios digitais com a agilidade que o setor exige, sem perder rigor técnico.',
    sections: {
      contexto:
        'O mercado digital cresce rápido e a legislação tributária nem sempre acompanha no mesmo ritmo. Receitas de marketplaces, plataformas de infoprodutos, publicidade online, serviços prestados remotamente. Cada fonte de receita pode ter um tratamento tributário diferente, e o enquadramento errado gera custos desnecessários.',
      desafios:
        'Muitos empreendedores digitais começam como pessoa física ou MEI e rapidamente ultrapassam os limites de faturamento sem planejar a transição. Outros operam com múltiplas fontes de receita (serviços, produtos digitais, publicidade) sem entender como cada uma é tributada. O resultado: imposto pago a mais, obrigações em atraso ou risco fiscal.',
      solucao:
        'A DM2 Contabilidade acompanha negócios digitais em São Paulo com atenção para essas particularidades. Orientamos sobre o melhor tipo societário, definimos o regime tributário adequado para o mix de receitas, e cuidamos da rotina contábil com a agilidade que o setor digital exige.',
    },
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
    relatedPosts: [],
    priority: 'alta',
  },
};

export const nicheList = Object.values(niches);

export function getNiche(slug: NicheSlug): Niche | undefined {
  return niches[slug];
}

export const nicheSlugs = Object.keys(niches) as NicheSlug[];
