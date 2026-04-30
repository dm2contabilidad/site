import Link from 'next/link';
import { type ComponentProps } from 'react';

type Variant = 'gold' | 'primary' | 'secondary' | 'ghost' | 'whatsapp';
type Size = 'default' | 'sm' | 'lg';

interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

type ButtonAsButton = ButtonBaseProps &
  ComponentProps<'button'> & { href?: never };
type ButtonAsLink = ButtonBaseProps &
  Omit<ComponentProps<typeof Link>, 'className'> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<Variant, string> = {
  // CTA principal del sitio: brand-gold sobre brand-navy.
  // Hover oscurece el dorado pero mantiene presencia y contraste alto.
  gold:
    'bg-gold-500 text-navy-900 hover:bg-gold-600 hover:text-white active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-navy-900 focus-visible:ring-offset-2',
  // CTA secundario sólido brand-blue
  primary:
    'bg-navy-800 text-white hover:bg-navy-700 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2',
  // Outline brand-blue. Sobre fondo claro: hover llena en navy.
  // Sobre fondo oscuro requiere override className específico (border-white/50 + hover:bg-white/10) para evitar relleno blanco.
  secondary:
    'border border-navy-800 text-navy-800 bg-transparent hover:bg-navy-800 hover:text-white active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-navy-800 focus-visible:ring-offset-2',
  ghost:
    'text-navy-800 hover:text-navy-700 hover:underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-navy-800 focus-visible:ring-offset-2 rounded-sm',
  whatsapp:
    'bg-[#25D366] text-white hover:bg-[#20bd5a] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  default: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-base',
};

export function Button({
  variant = 'primary',
  size = 'default',
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = [
    'inline-flex items-center justify-center gap-2',
    'font-semibold rounded-md',
    'transition-all duration-150',
    'min-h-[44px]',
    'disabled:opacity-50 disabled:pointer-events-none',
    variantStyles[variant],
    sizeStyles[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if ('href' in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return <Link href={href} className={baseClasses} {...rest} />;
  }

  return <button className={baseClasses} {...(props as ButtonAsButton)} />;
}
