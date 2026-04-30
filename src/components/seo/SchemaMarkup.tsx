import { siteConfig } from '@/content/site';

/**
 * JSON-LD Schema components for DM2 Contabilidade.
 * Renders <script type="application/ld+json"> in the document head.
 */

interface SchemaProps {
  schema: Record<string, unknown>;
}

/** Generic JSON-LD renderer */
export function JsonLd({ schema }: SchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** Organization schema — used on every page via root layout */
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo/dm2-logo-horizontal-large.webp`,
    image: `${siteConfig.url}/images/logo/dm2-logo-square.png`,
    foundingDate: String(siteConfig.foundingYear),
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.nap.street,
      addressLocality: siteConfig.nap.city,
      addressRegion: siteConfig.nap.state,
      postalCode: siteConfig.nap.postalCode,
      addressCountry: siteConfig.nap.country,
    },
    telephone: siteConfig.nap.phoneInternational,
    email: siteConfig.nap.email,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: siteConfig.nap.phoneInternational,
        contactType: 'customer service',
        areaServed: 'BR',
        availableLanguage: ['Portuguese'],
        email: siteConfig.nap.email,
      },
    ],
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.linkedin,
    ].filter(Boolean),
  };

  return <JsonLd schema={schema} />;
}

/** AccountingService (LocalBusiness subtype) — used on Home and Contact */
export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AccountingService',
    '@id': `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}/images/logo/dm2-logo-horizontal-large.webp`,
    logo: `${siteConfig.url}/images/logo/dm2-logo-horizontal-large.webp`,
    telephone: siteConfig.nap.phoneInternational,
    email: siteConfig.nap.email,
    foundingDate: String(siteConfig.foundingYear),
    priceRange: '$$',
    // CRC-SP belongs to the firm, not to any individual professional.
    ...(siteConfig.crcSp && {
      identifier: {
        '@type': 'PropertyValue',
        propertyID: 'CRC-SP',
        value: siteConfig.crcSp,
      },
    }),
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.nap.street,
      addressLocality: siteConfig.nap.city,
      addressRegion: siteConfig.nap.state,
      postalCode: siteConfig.nap.postalCode,
      addressCountry: siteConfig.nap.country,
    },
    // GeoCoordinates emitted only when verified coordinates exist in
    // siteConfig.geo. Intentionally omitted while unconfirmed — broadcasting
    // approximate coordinates can hurt local-pack ranking and trust signals.
    ...(siteConfig.geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: siteConfig.geo.latitude,
        longitude: siteConfig.geo.longitude,
      },
    }),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: siteConfig.hours.open,
      closes: siteConfig.hours.close,
    },
    areaServed: {
      '@type': 'City',
      name: 'São Paulo',
    },
  };

  return <JsonLd schema={schema} />;
}

/** WebSite schema — used on Home */
export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
  };

  return <JsonLd schema={schema} />;
}

/** BreadcrumbList schema */
export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url?: string }[];
}) {
  // Schema.org BreadcrumbList: include all items; the leaf may omit `item`
  // (URL) per Google's rich-results spec since it's the current page.
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url }),
    })),
  };

  return <JsonLd schema={schema} />;
}

/** FAQ schema */
export function FAQSchema({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  if (faqs.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return <JsonLd schema={schema} />;
}

/** ItemList schema — for index pages enumerating services or articles */
export function ItemListSchema({
  items,
  itemType = 'Service',
}: {
  items: { name: string; url: string; description?: string }[];
  itemType?: 'Service' | 'Article' | 'Thing';
}) {
  if (items.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': itemType,
        name: item.name,
        url: item.url,
        ...(item.description && { description: item.description }),
      },
    })),
  };

  return <JsonLd schema={schema} />;
}

/**
 * Person schema — used on Quem Somos for the technical lead (Danilo).
 *
 * IMPORTANT: the CRC-SP number is an attribute of DM2 Contabilidade (the
 * firm), not of the individual professional. It is therefore exposed on
 * `worksFor.identifier` (the AccountingService), never on the Person.
 */
export function PersonSchema({
  name,
  jobTitle,
}: {
  name: string;
  jobTitle: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    worksFor: {
      '@type': 'AccountingService',
      name: siteConfig.name,
      url: siteConfig.url,
      ...(siteConfig.crcSp && {
        identifier: {
          '@type': 'PropertyValue',
          propertyID: 'CRC-SP',
          value: siteConfig.crcSp,
        },
      }),
    },
  };

  return <JsonLd schema={schema} />;
}

/**
 * BlogPosting schema — used on /blog/[slug]. Reflects only what is
 * actually visible on the page; no inflated fields.
 */
export function BlogPostingSchema({
  url,
  headline,
  description,
  image,
  datePublished,
  dateModified,
  authorName,
  authorJobTitle,
  keywords,
  articleSection,
}: {
  url: string;
  headline: string;
  description: string;
  image?: string | null;
  datePublished: string;
  dateModified?: string | null;
  authorName: string;
  authorJobTitle?: string;
  keywords?: string[] | null;
  articleSection?: string | null;
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    headline,
    description,
    datePublished,
    dateModified: dateModified ?? datePublished,
    // The author is the individual professional. The CRC-SP is the firm's
    // registration and is exposed on `publisher.identifier` below — never
    // on `author.identifier`, which would mis-attribute the registry.
    author: {
      '@type': 'Person',
      name: authorName,
      ...(authorJobTitle && { jobTitle: authorJobTitle }),
      worksFor: {
        '@type': 'AccountingService',
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/images/logo/dm2-logo-horizontal-large.webp`,
      },
      ...(siteConfig.crcSp && {
        identifier: {
          '@type': 'PropertyValue',
          propertyID: 'CRC-SP',
          value: siteConfig.crcSp,
        },
      }),
    },
    inLanguage: 'pt-BR',
  };

  if (image) {
    schema.image = image;
  }
  if (keywords && keywords.length > 0) {
    schema.keywords = keywords.join(', ');
  }
  if (articleSection) {
    schema.articleSection = articleSection;
  }

  return <JsonLd schema={schema} />;
}

/** Service schema */
export function ServiceSchema({
  name,
  description,
  serviceType,
}: {
  name: string;
  description: string;
  serviceType: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType,
    provider: {
      '@type': 'AccountingService',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      '@type': 'City',
      name: 'São Paulo',
    },
  };

  return <JsonLd schema={schema} />;
}
