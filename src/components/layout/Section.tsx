type SectionBg = 'white' | 'soft' | 'dark' | 'gold-soft';
type SectionWidth = 'default' | 'narrow' | 'wide' | 'full';
type SectionSpacing = 'default' | 'sm' | 'lg' | 'none';

interface SectionProps {
  children: React.ReactNode;
  bg?: SectionBg;
  width?: SectionWidth;
  spacing?: SectionSpacing;
  className?: string;
  id?: string;
  as?: 'section' | 'div' | 'aside';
}

const bgStyles: Record<SectionBg, string> = {
  white: 'bg-white',
  soft: 'bg-neutral-50',
  dark: 'bg-navy-900 text-white',
  'gold-soft': 'bg-gold-200',
};

const widthStyles: Record<SectionWidth, string> = {
  narrow: 'max-w-3xl',
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
  full: 'max-w-none',
};

const spacingStyles: Record<SectionSpacing, string> = {
  none: '',
  sm: 'py-12 md:py-16',
  default: 'py-16 md:py-24',
  lg: 'py-20 md:py-32',
};

export function Section({
  children,
  bg = 'white',
  width = 'default',
  spacing = 'default',
  className = '',
  id,
  as: Tag = 'section',
}: SectionProps) {
  return (
    <Tag id={id} className={`${bgStyles[bg]} ${spacingStyles[spacing]} ${className}`}>
      <div className={`mx-auto px-5 md:px-8 ${widthStyles[width]}`}>
        {children}
      </div>
    </Tag>
  );
}
