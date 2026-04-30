import { Button } from '@/components/ui/Button';

interface CTAStripProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  variant?: 'dark' | 'light';
}

export function CTAStrip({
  title,
  subtitle,
  buttonText = 'Fale com a DM2 Contabilidade',
  buttonHref = '/contato',
  variant = 'dark',
}: CTAStripProps) {
  const isDark = variant === 'dark';

  return (
    <section className={isDark ? 'bg-navy-900 relative' : 'bg-neutral-50 border-y border-[color:var(--color-border-soft)]'}>
      {isDark && (
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-60"
        />
      )}
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          <div className="text-center md:text-left max-w-2xl">
            <h2
              className={`text-[1.5rem] sm:text-2xl md:text-3xl font-bold tracking-tight leading-[1.2] md:leading-tight ${isDark ? 'text-white' : 'text-navy-900'}`}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {title}
            </h2>
            {subtitle && (
              <p className={`mt-3 text-base md:text-lg ${isDark ? 'text-white/75' : 'text-neutral-700'}`}>
                {subtitle}
              </p>
            )}
          </div>
          <Button
            href={buttonHref}
            variant="gold"
            size="lg"
            className="shrink-0 w-full sm:w-auto"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </section>
  );
}
