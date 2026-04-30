import Link from 'next/link';

interface CardProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  padding?: 'default' | 'lg' | 'none';
  accent?: boolean;
}

const paddingStyles = {
  none: '',
  default: 'p-6',
  lg: 'p-8',
};

/**
 * Card institucional. Borde sutil, hover eleva el card y refuerza con
 * brand-blue. `accent` agrega una línea fina dorada en el borde superior
 * para destacar tarjetas premium (servicios principales).
 */
export function Card({
  children,
  href,
  className = '',
  padding = 'default',
  accent = false,
}: CardProps) {
  const baseClasses = [
    'relative rounded-lg border bg-white',
    'transition-all duration-200',
    'border-[color:var(--color-border-soft)]',
    href ? 'hover:border-navy-800 hover:shadow-md hover:-translate-y-0.5 cursor-pointer' : '',
    paddingStyles[padding],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {accent && (
        <span
          aria-hidden="true"
          className="absolute top-0 left-6 right-6 h-0.5 bg-gold-500 rounded-full"
        />
      )}
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`block ${baseClasses}`}>
        {content}
      </Link>
    );
  }

  return <div className={baseClasses}>{content}</div>;
}
