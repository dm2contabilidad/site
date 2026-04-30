import type { FAQ } from './faq';
import type { ServiceSlug } from './service';

/**
 * Specialty pages — DM2 Contabilidade
 *
 * URL architecture (Director decision, final):
 *   /contabilidade-para-advogados
 *   /contabilidade-para-profissionais-da-saude
 *   /contabilidade-para-negocios-digitais
 *
 * Each page lives at root level with full keyword slug.
 * No /para/ prefix. No abbreviations.
 */

export type NicheSlug =
  | 'contabilidade-para-advogados'
  | 'contabilidade-para-profissionais-da-saude'
  | 'contabilidade-para-negocios-digitais';

export interface Niche {
  slug: NicheSlug;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  sections: {
    contexto: string;
    desafios: string;
    solucao: string;
  };
  faqs: FAQ[];
  relatedServices: ServiceSlug[];
  relatedPosts: string[];
  priority: 'alta' | 'media';
}
