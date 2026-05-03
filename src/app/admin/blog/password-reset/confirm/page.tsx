import type { Metadata } from 'next';
import Link from 'next/link';
import { ResetPasswordForm } from './ResetPasswordForm';

export const metadata: Metadata = {
  title: 'Definir nova senha · Admin DM2 Contabilidade',
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ConfirmResetPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const token = (sp.token ?? '').trim();

  if (!token) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-full max-w-sm space-y-4">
          <h1
            className="text-xl font-bold text-navy-900"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Link inválido
          </h1>
          <p className="text-sm text-neutral-700">
            O link de redefinição não está completo. Solicite um novo na
            página de recuperação.
          </p>
          <Link
            href="/admin/blog/password-reset"
            className="inline-block text-sm text-navy-900 hover:underline"
          >
            Solicitar novo link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-sm">
        <h1
          className="text-xl font-bold text-navy-900 mb-1"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Definir nova senha
        </h1>
        <p className="text-sm text-neutral-600 mb-6">
          Escolha uma senha de ao menos 8 caracteres. Após salvar, todas as
          sessões anteriores serão encerradas automaticamente.
        </p>
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
