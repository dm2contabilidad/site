interface TrustItem {
  text: string;
  source: string;
}

interface TrustBlockProps {
  title?: string;
  items: TrustItem[];
}

export function TrustBlock({
  title = 'O que nossos clientes dizem',
  items,
}: TrustBlockProps) {
  if (items.length === 0) return null;

  return (
    <div>
      <h2
        className="text-2xl md:text-3xl font-bold text-navy-900 mb-10 text-center"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-neutral-200 rounded-lg p-6 md:p-8"
          >
            <div className="w-8 h-0.5 bg-gold-500 mb-4 rounded-full" aria-hidden="true" />
            <blockquote className="text-neutral-700 leading-relaxed mb-4">
              &ldquo;{item.text}&rdquo;
            </blockquote>
            <cite className="not-italic text-sm font-medium text-neutral-500">
              — {item.source}
            </cite>
          </div>
        ))}
      </div>
    </div>
  );
}
