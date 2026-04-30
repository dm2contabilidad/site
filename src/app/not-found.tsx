import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Página não encontrada',
  description: 'A página que você procura não existe ou foi movida.',
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center max-w-md px-6">
        <p
          className="text-6xl font-bold text-[var(--color-navy-800)] mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          404
        </p>
        <h1 className="text-xl font-semibold mb-2">Página não encontrada</h1>
        <p className="text-[var(--color-neutral-600)] mb-8">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-[var(--color-navy-800)] text-white rounded-md font-medium hover:bg-[var(--color-navy-700)] transition-colors"
          >
            Página inicial
          </Link>
          <Link
            href="/servicos-contabeis"
            className="px-6 py-3 border border-[var(--color-navy-800)] text-[var(--color-navy-800)] rounded-md font-medium hover:bg-[var(--color-navy-50)] transition-colors"
          >
            Ver serviços
          </Link>
        </div>
      </div>
    </div>
  );
}
