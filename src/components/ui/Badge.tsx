type BadgeVariant = 'default' | 'gold' | 'success' | 'error';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-navy-50 text-navy-600',
  gold: 'bg-gold-100 text-gold-700',
  success: 'bg-success-100 text-success-500',
  error: 'bg-error-100 text-error-500',
};

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-block px-3 py-1 rounded-sm
        text-xs font-medium uppercase tracking-wider
        font-[family-name:var(--font-label)]
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
