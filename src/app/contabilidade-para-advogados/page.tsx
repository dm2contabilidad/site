import { createMetadata } from '@/lib/metadata';
import { niches } from '@/content/niches';
import { EntityPage } from '@/components/sections/EntityPage';

const niche = niches['contabilidade-para-advogados'];

export const metadata = createMetadata({
  title: niche.metaTitle,
  description: niche.metaDescription,
  path: '/contabilidade-para-advogados',
});

export default function ContabilidadeParaAdvogadosPage() {
  return <EntityPage kind="niche" entity={niche} />;
}
