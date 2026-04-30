import type { FAQ } from './faq';

/**
 * Core services confirmed by Director (02-abr-2026):
 *   - Consultoria Contábil
 *   - Planejamento Tributário
 *   - Gestão Fiscal e Tributária
 *   - Abertura e Regularização de Empresas
 *
 * Services removed from architecture:
 *   - Migração de MEI para ME (never included in rebuild)
 *
 * Services on hold (not confirmed, not eliminated):
 *   - Departamento Pessoal
 *   - BPO Financeiro
 *   - Imposto de Renda
 *   - Contabilidade para MEI
 *
 * These may be added back in future phases if the Director confirms them.
 */

export type ServiceSlug =
  | 'consultoria-contabil'
  | 'planejamento-tributario'
  | 'gestao-fiscal-e-tributaria'
  | 'abertura-e-regularizacao-de-empresas';

export interface Service {
  slug: ServiceSlug;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  sections: {
    contexto: string;
    problema: string;
    solucao: string;
    diferencial: string;
  };
  processo: string[];
  faqs: FAQ[];
  relatedServices: ServiceSlug[];
  relatedNiches: string[];
  relatedPosts: string[];
  priority: 'maxima' | 'alta' | 'media';
}
