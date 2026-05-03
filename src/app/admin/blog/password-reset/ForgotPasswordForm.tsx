'use client';

import Link from 'next/link';
import { useState, useTransition } from 'react';
import { requestPasswordResetAction } from './actions';

export function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function onSubmit() {
    setError(null);
    startTransition(async () => {
      const r = await requestPasswordResetAction();
      if (r.ok) {
        setSent(true);
      } else {
        setError(r.error ?? 'Não foi possível enviar a solicitação.');
      }
    });
  }

  if (sent) {
    return (
      <div className="space-y-4">
        <div
          className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-md px-3 py-3"
          role="status"
        >
          Se houver uma conta administrativa configurada, enviamos um link de
          redefinição para o e-mail cadastrado. Verifique a caixa de entrada
          (e o spam) nos próximos minutos. O link é válido por 30 minutos.
        </div>
        <Link
          href="/admin/blog/login"
          className="inline-block text-sm text-navy-900 hover:underline"
        >
          ← Voltar ao login
        </Link>
      </div>
    );
  }

  return (
    <form action={onSubmit} className="space-y-4">
      <p className="text-sm text-neutral-700">
        Por segurança, mostraremos sempre a mesma confirmação genérica — não
        revelamos se há ou não uma conta para o endereço.
      </p>
      {error && (
        <div
          className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2"
          role="alert"
        >
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={isPending}
        className="w-full px-4 py-2 bg-navy-900 text-white text-sm font-semibold rounded-md hover:bg-navy-800 disabled:opacity-60"
      >
        {isPending ? 'Enviando…' : 'Enviar link de redefinição'}
      </button>
      <Link
        href="/admin/blog/login"
        className="inline-block text-sm text-neutral-600 hover:text-navy-900"
      >
        ← Voltar ao login
      </Link>
    </form>
  );
}
