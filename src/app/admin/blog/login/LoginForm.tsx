'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { loginAction } from '../actions';

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function onSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await loginAction(formData);
      if (result.ok) {
        // Hard navigation: ensures the new cookie is sent on the next
        // request and the layout re-renders with the authenticated chrome.
        router.refresh();
        router.push('/admin/blog');
      } else {
        setError(result.error ?? 'Erro ao entrar.');
      }
    });
  }

  return (
    <form action={onSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-neutral-700 mb-1.5"
        >
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          minLength={8}
          className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
          disabled={isPending}
        />
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2" role="alert">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full px-4 py-2 bg-navy-900 text-white text-sm font-semibold rounded-md hover:bg-navy-800 transition-colors disabled:opacity-60"
      >
        {isPending ? 'Entrando…' : 'Entrar'}
      </button>
    </form>
  );
}
