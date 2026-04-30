import { createMetadata } from '@/lib/metadata';
import { niches } from '@/content/niches';
import { EntityPage } from '@/components/sections/EntityPage';

const niche = niches['contabilidade-para-profissionais-da-saude'];

export const metadata = createMetadata({
  title: niche.metaTitle,
  description: niche.metaDescription,
  path: '/contabilidade-para-profissionais-da-saude',
});

export default function ContabilidadeParaProfissionaisDaSaudePage() {
  return <EntityPage kind="niche" entity={niche} />;
}
