import type { Metadata } from 'next';
import { siteConfig } from '@/content/site';

const SITE_NAME = siteConfig.name;
const SITE_URL = siteConfig.url;

/**
 * Generate page-specific metadata with DM2 defaults.
 * Usage in page.tsx:
 *   export const metadata = createMetadata({ title: '...', description: '...' });
 */
export function createMetadata({
  title,
  description,
  path = '',
  ogImage,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  // Fallback OG points to the existing institutional asset; default.jpg
  // does not exist as a file, so we'd otherwise serve a broken preview.
  const image = ogImage || `${SITE_URL}/images/og/home-og-sao-paulo.webp`;

  return {
    // `absolute` bypasses the title.template defined in defaultMetadata.
    // Page authors already include the brand suffix in their titles
    // (e.g. "Contato | DM2 Contabilidade em São Paulo"); applying the
    // template on top of that produced duplicates like
    // "Contato | DM2 Contabilidade em São Paulo | DM2 Contabilidade".
    title: { absolute: title },
    description,
    ...(noIndex && { robots: { index: false, follow: false } }),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'pt_BR',
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

/** Default metadata for the root layout */
export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Escritório de Contabilidade em São Paulo`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Escritório de contabilidade em São Paulo, Vila Mariana. Contabilidade empresarial, planejamento tributário, abertura de empresas e mais. Desde 2003.',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    siteName: SITE_NAME,
    locale: 'pt_BR',
    type: 'website',
  },
};
