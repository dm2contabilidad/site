import { createMetadata } from '@/lib/metadata';
import { niches } from '@/content/niches';
import { NichePageContent } from '@/components/sections/NichePage';

const niche = niches['contabilidade-para-advogados'];

export const metadata = createMetadata({
  title: niche.metaTitle,
  description: niche.metaDescription,
  path: '/contabilidade-para-advogados',
});

export default function ContabilidadeParaAdvogadosPage() {
  return <NichePageContent niche={niche} />;
}
