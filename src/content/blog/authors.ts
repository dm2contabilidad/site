import type { AuthorLegacy } from '@/types/blog';

/**
 * Static author registry — kept for any place still using local data.
 * Source of truth is the Supabase `authors` table
 * (see docs/supabase-blog-tables.sql).
 */
export const authors: Record<string, AuthorLegacy> = {
  'danilo-brito': {
    slug: 'danilo-brito',
    name: 'Danilo Brito de Morais',
    role: 'Responsável Técnico — CRC 2SP039587',
    bio: 'Contador responsável pela DM2 Contabilidade. Atua em São Paulo com foco em consultoria contábil, planejamento tributário e gestão fiscal para empresas.',
  },
};

export function getAuthor(slug: string): AuthorLegacy | undefined {
  return authors[slug];
}
