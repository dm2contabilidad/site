import type { Metadata } from 'next';
import { LoginForm } from './LoginForm';

export const metadata: Metadata = {
  title: 'Acessar admin · DM2 Contabilidade',
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-sm">
        <h1
          className="text-xl font-bold text-navy-900 mb-1"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Acessar painel
        </h1>
        <p className="text-sm text-neutral-600 mb-6">
          Entre com a senha de administrador para gerir o blog.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
