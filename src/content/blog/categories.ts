import type { BlogCategoryLegacy, BlogCategorySlug } from '@/types/blog';

/**
 * Static category list used by the placeholder /blog index until the
 * Supabase-backed query is wired in.
 *
 * The canonical source of truth is the Supabase `blog_categories` table
 * (see docs/supabase-blog-tables.sql). Keep this list in sync.
 */
export const blogCategories: Record<BlogCategorySlug, BlogCategoryLegacy> = {
  tributario: {
    slug: 'tributario',
    title: 'Tributário',
    description:
      'Planejamento tributário, regimes fiscais, obrigações e estratégias de redução legal de impostos.',
  },
  fiscal: {
    slug: 'fiscal',
    title: 'Fiscal',
    description:
      'Apuração de impostos, obrigações acessórias, SPED, EFD-Contribuições, DCTF e DIRF.',
  },
  'abertura-de-empresas': {
    slug: 'abertura-de-empresas',
    title: 'Abertura de Empresas',
    description: 'Guias práticos para abrir e formalizar empresas em São Paulo.',
  },
  'departamento-pessoal': {
    slug: 'departamento-pessoal',
    title: 'Departamento Pessoal',
    description:
      'eSocial, folha de pagamento, férias, rescisão e obrigações acessórias trabalhistas.',
  },
  legislacao: {
    slug: 'legislacao',
    title: 'Legislação',
    description: 'Atualizações normativas, mudanças tributárias e prazos legais.',
  },
  'mei-e-pequenas-empresas': {
    slug: 'mei-e-pequenas-empresas',
    title: 'MEI e Pequenas Empresas',
    description:
      'Tudo sobre microempreendedor individual e gestão contábil de pequenas empresas.',
  },
  'gestao-financeira': {
    slug: 'gestao-financeira',
    title: 'Gestão Financeira',
    description: 'Indicadores, fluxo de caixa, DRE e gestão financeira para empresários.',
  },
};

export const categoryList = Object.values(blogCategories);
