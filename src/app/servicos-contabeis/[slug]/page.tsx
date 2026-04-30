import { notFound } from 'next/navigation';
import { createMetadata } from '@/lib/metadata';
import { EntityPage } from '@/components/sections/EntityPage';
import { services, serviceSlugs } from '@/content/services';
import type { ServiceSlug } from '@/types/service';

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services[slug as ServiceSlug];
  if (!service) return {};

  return createMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/servicos-contabeis/${slug}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services[slug as ServiceSlug];
  if (!service) notFound();

  return <EntityPage kind="service" entity={service} />;
}
