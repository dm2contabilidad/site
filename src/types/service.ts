import type { FAQ } from './faq';

/**
 * Core services confirmed by Director (02-abr-2026):
 *   - Consultoria Contábil
 *   - Planejamento Tributário
 *   - Gestão Fiscal e Tributária
 *   - Abertura e Regularização de Empresas
 */

export type ServiceSlug =
  | 'consultoria-contabil'
  | 'planejamento-tributario'
  | 'gestao-fiscal-e-tributaria'
  | 'abertura-e-regularizacao-de-empresas';

/**
 * Shared with Niche. Hero block of every entity page (service or specialty).
 * `keyFact` is one factual signal rendered in display type. `cta.promise` is
 * the micro-promise shown under the hero button — never empty, never vague.
 */
export interface PageHero {
  eyebrow: string;
  subtitle: string;
  keyFact: { value: string; label: string };
  cta: { text: string; promise: string };
}

/** "O que está em jogo" — 2-3 sober items with concrete cost. */
export interface StakeItem {
  label: string;
  detail: string;
}

/** Final CTA block. The promise is what the visitor takes from the contact. */
export interface FinalCta {
  title: string;
  subtitle: string;
  buttonText: string;
}

export interface Service {
  slug: ServiceSlug;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  hero: PageHero;
  stakes: StakeItem[];
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
  finalCta: FinalCta;
  priority: 'maxima' | 'alta' | 'media';
}
