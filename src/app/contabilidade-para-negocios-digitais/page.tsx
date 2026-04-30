import { createMetadata } from '@/lib/metadata';
import { niches } from '@/content/niches';
import { EntityPage } from '@/components/sections/EntityPage';

const niche = niches['contabilidade-para-negocios-digitais'];

export const metadata = createMetadata({
  title: niche.metaTitle,
  description: niche.metaDescription,
  path: '/contabilidade-para-negocios-digitais',
});

export default function ContabilidadeParaNegociosDigitaisPage() {
  return <EntityPage kind="niche" entity={niche} />;
}
