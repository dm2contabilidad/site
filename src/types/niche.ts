import type { FAQ } from './faq';
import type {
  ServiceSlug,
  PageHero,
  HeroImage,
  StakeItem,
  FinalCta,
  ContextPoint,
} from './service';

/**
 * Specialty pages — DM2 Contabilidade
 *
 * URL architecture (Director decision, final):
 *   /contabilidade-para-advogados
 *   /contabilidade-para-profissionais-da-saude
 *   /contabilidade-para-negocios-digitais
 */

export type NicheSlug =
  | 'contabilidade-para-advogados'
  | 'contabilidade-para-profissionais-da-saude'
  | 'contabilidade-para-negocios-digitais';

/**
 * Niche shares the same 9-block page structure as Service. The fields differ
 * in name from Service.sections to reflect the editorial intent of a niche
 * (it speaks to the client, not about the service):
 *   - sections.contexto  → "tu realidad"
 *   - sections.desafios  → "tus desafíos"
 *   - sections.solucao   → "cómo DM2 te atiende"
 * `processo` and `diferencial` mirror Service to allow a single shared
 * EntityPage component, but the copy must speak to the segment, not to a
 * generic visitor.
 */
export interface Niche {
  slug: NicheSlug;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  hero: PageHero;
  heroImage?: HeroImage;
  contextPoints: ContextPoint[];
  stakes: StakeItem[];
  sections: {
    solucao: string;
  };
  diferencial: string;
  processo: string[];
  faqs: FAQ[];
  relatedServices: ServiceSlug[];
  relatedPosts: string[];
  finalCta: FinalCta;
  priority: 'alta' | 'media';
}
