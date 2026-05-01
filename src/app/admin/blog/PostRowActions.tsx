'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { deletePostAction, setStatusAction } from './actions';
import type { PostStatus } from '@/lib/admin/validation';

export function PostRowActions({
  id,
  status,
  title,
}: {
  id: string;
  status: PostStatus;
  title: string;
}) {
  const router = useRouter();
  const [busy, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  function changeStatus(next: PostStatus) {
    setOpen(false);
    startTransition(async () => {
      const publishedAt = next === 'published' ? new Date().toISOString() : undefined;
      const result = await setStatusAction(id, next, publishedAt);
      if (!result.ok) alert(result.error ?? 'Erro ao atualizar status.');
      router.refresh();
    });
  }

  function onDelete() {
    setOpen(false);
    if (!confirm(`Excluir definitivamente "${title}"?\n\nEsta ação não pode ser desfeita.`)) {
      return;
    }
    startTransition(async () => {
      const result = await deletePostAction(id);
      if (!result.ok) alert(result.error ?? 'Erro ao excluir post.');
      router.refresh();
    });
  }

  return (
    <div className="relative inline-flex items-center gap-1">
      <Link
        href={`/admin/blog/${id}`}
        className="px-2 py-1 text-xs font-medium border border-neutral-300 rounded hover:bg-neutral-100"
      >
        Editar
      </Link>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={busy}
        aria-haspopup="menu"
        aria-expanded={open}
        className="px-2 py-1 text-xs font-medium border border-neutral-300 rounded hover:bg-neutral-100 disabled:opacity-60"
      >
        Mais ▾
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-1 z-10 min-w-[180px] bg-white border border-neutral-200 rounded-md shadow-lg text-sm overflow-hidden"
          onMouseLeave={() => setOpen(false)}
        >
          {status !== 'published' && (
            <button
              type="button"
              role="menuitem"
              onClick={() => changeStatus('published')}
              className="block w-full text-left px-3 py-2 hover:bg-neutral-50"
            >
              Publicar agora
            </button>
          )}
          {status !== 'draft' && (
            <button
              type="button"
              role="menuitem"
              onClick={() => changeStatus('draft')}
              className="block w-full text-left px-3 py-2 hover:bg-neutral-50"
            >
              Mover para rascunho
            </button>
          )}
          {status !== 'archived' && (
            <button
              type="button"
              role="menuitem"
              onClick={() => changeStatus('archived')}
              className="block w-full text-left px-3 py-2 hover:bg-neutral-50"
            >
              Arquivar
            </button>
          )}
          <div className="border-t border-neutral-200" />
          <button
            type="button"
            role="menuitem"
            onClick={onDelete}
            className="block w-full text-left px-3 py-2 text-red-700 hover:bg-red-50"
          >
            Excluir
          </button>
        </div>
      )}
    </div>
  );
}
