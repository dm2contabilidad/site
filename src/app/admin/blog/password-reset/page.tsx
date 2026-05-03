import type { Metadata } from 'next';
import { ForgotPasswordForm } from './ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Recuperar acesso · Admin DM2 Contabilidade',
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-sm">
        <h1
          className="text-xl font-bold text-navy-900 mb-1"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Recuperar acesso
        </h1>
        <p className="text-sm text-neutral-600 mb-6">
          Enviaremos um link de redefinição para o e-mail cadastrado do
          responsável administrativo.
        </p>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
