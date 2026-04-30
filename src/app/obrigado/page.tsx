import Link from 'next/link';
import { createMetadata } from '@/lib/metadata';
import { Section } from '@/components/layout/Section';
import { ConversionTracker } from './ConversionTracker';

export const metadata = createMetadata({
  title: 'Mensagem enviada',
  description: 'Sua mensagem foi enviada com sucesso.',
  path: '/obrigado',
  noIndex: true,
});

export default function ObrigadoPage() {
  return (
    <Section spacing="lg" className="pt-32 md:pt-40">
      <ConversionTracker />
      <div className="max-w-xl mx-auto text-center">
        <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-success-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <h1
          className="text-3xl font-bold text-navy-900 mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Mensagem enviada
        </h1>
        <p className="text-neutral-600 leading-relaxed mb-2">
          Recebemos sua mensagem. Em breve, um dos nossos contadores vai entrar em contato.
        </p>
        <p className="text-sm text-neutral-500 mb-8">
          Nosso horário de atendimento é de segunda a sexta, das 8h30 às 17h30.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-gold-500 text-navy-900 rounded-md font-semibold hover:bg-gold-400 transition-colors"
          >
            Voltar ao início
          </Link>
          <Link
            href="/blog"
            className="px-6 py-3 border border-neutral-200 text-neutral-700 rounded-md font-medium hover:bg-neutral-50 transition-colors"
          >
            Ler nosso blog
          </Link>
        </div>
      </div>
    </Section>
  );
}
