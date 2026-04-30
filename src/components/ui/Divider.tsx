type DividerVariant = 'subtle' | 'gold' | 'space';

interface DividerProps {
  variant?: DividerVariant;
  className?: string;
}

export function Divider({ variant = 'subtle', className = '' }: DividerProps) {
  if (variant === 'space') {
    return <div className={`h-20 md:h-28 ${className}`} aria-hidden="true" />;
  }

  if (variant === 'gold') {
    return (
      <div className={`flex justify-center ${className}`} aria-hidden="true">
        <div className="w-12 h-0.5 bg-gold-500 rounded-full" />
      </div>
    );
  }

  return (
    <div className={`flex justify-center ${className}`} aria-hidden="true">
      <div className="w-3/5 h-px bg-neutral-200" />
    </div>
  );
}
