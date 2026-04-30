import { Breadcrumbs } from './Breadcrumbs';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  bg?: 'white' | 'neutral' | 'cream';
}

const bgStyles = {
  white: 'bg-white',
  neutral: 'bg-neutral-50',
  cream: 'bg-gold-100',
};

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  bg = 'neutral',
}: PageHeaderProps) {
  return (
    <div className={`${bgStyles[bg]} pt-28 md:pt-32 pb-12 md:pb-16`}>
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg text-neutral-600 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
