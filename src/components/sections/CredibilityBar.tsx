interface StatItem {
  value: string;
  label: string;
}

interface CredibilityBarProps {
  stats: StatItem[];
}

export function CredibilityBar({ stats }: CredibilityBarProps) {
  return (
    <div className="bg-navy-900 border-y border-gold-500/15">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-7 gap-x-4 md:gap-8 md:divide-x md:divide-white/10">
          {stats.map((stat, index) => (
            <div key={index} className="text-center px-2">
              <p
                className="text-xl sm:text-2xl md:text-3xl font-bold text-gold-500 tracking-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {stat.value}
              </p>
              <p
                className="mt-1.5 text-[11px] sm:text-xs md:text-sm text-white/60 uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-label)' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
