import Link from 'next/link';
import { BreadcrumbSchema } from '@/components/seo/SchemaMarkup';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [{ label: 'Início', href: '/' }, ...items];

  // Emit every step in the JSON-LD trail, including the leaf. The leaf is the
  // current page and Google's rich-results spec lets it omit `item` (URL).
  const schemaItems = allItems.map((item) => ({
    name: item.label,
    ...(item.href && { url: `https://dm2contabilidade.com.br${item.href}` }),
  }));

  return (
    <>
      <BreadcrumbSchema items={schemaItems} />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-1.5 text-sm text-neutral-500">
          {allItems.map((item, index) => (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && (
                <span className="text-neutral-300" aria-hidden="true">
                  ›
                </span>
              )}
              {item.href && index < allItems.length - 1 ? (
                <Link
                  href={item.href}
                  className="hover:text-navy-600 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-neutral-800 font-medium">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
