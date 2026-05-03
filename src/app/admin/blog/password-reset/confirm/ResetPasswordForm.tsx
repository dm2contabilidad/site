'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { resetPasswordAction } from '../actions';

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function onSubmit(formData: FormData) {
    setError(null);
    setFieldError(null);
    formData.set('token', token);
    startTransition(async () => {
      const r = await resetPasswordAction(formData);
      if (r.ok) {
        setDone(true);
        // Redirect to login after a short pause so the success message
        // is visible before the navigation.
        setTimeout(() => router.push('/admin/blog/login'), 1500);
      } else {
        if (r.fieldError) setFieldError(r.fieldError);
        else setError(r.error ?? 'Não foi possível redefinir a senha.');
      }
    });
  }

  if (done) {
    return (
      <div
        className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-md px-3 py-3"
        role="status"
      >
        Senha redefinida com sucesso. Sessões anteriores foram encerradas.
        Redirecionando para o login…
      </div>
    );
  }

  return (
    <form action={onSubmit} className="space-y-4">
      {error && (
        <div
          className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2"
          role="alert"
        >
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">
          Nova senha
        </label>
        <input
          type="password"
          name="password"
          required
          minLength={8}
          autoComplete="new-password"
          className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">
          Confirmar nova senha
        </label>
        <input
          type="password"
          name="confirm"
          required
          minLength={8}
          autoComplete="new-password"
          className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
        />
        {fieldError && (
          <p className="mt-1 text-xs text-red-600">{fieldError}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full px-4 py-2 bg-navy-900 text-white text-sm font-semibold rounded-md hover:bg-navy-800 disabled:opacity-60"
      >
        {isPending ? 'Salvando…' : 'Redefinir senha'}
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
