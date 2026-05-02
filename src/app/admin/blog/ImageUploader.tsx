'use client';

import { useRef, useState, useTransition } from 'react';
import { uploadBlogImageAction } from './upload-action';

/**
 * Cover image uploader for the blog admin.
 *
 * Calls the server action `uploadBlogImageAction`, which writes into
 * the `blog-covers` Supabase Storage bucket via the service-role
 * client. On success the public URL is propagated up via onUploaded
 * so the parent form can persist it into cover_image_url.
 *
 * The current image (if any) is shown as preview; a "Substituir
 * imagem" button reopens the file picker.
 */
export function ImageUploader({
  value,
  onUploaded,
  alt,
  slugHint,
  label = 'Upload de imagem',
}: {
  value: string;
  onUploaded: (url: string) => void;
  alt?: string;
  slugHint?: string;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function pick() {
    inputRef.current?.click();
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    const fd = new FormData();
    fd.set('file', file);
    if (slugHint) fd.set('slugHint', slugHint);
    startTransition(async () => {
      const result = await uploadBlogImageAction(fd);
      if (result.ok && result.url) {
        onUploaded(result.url);
      } else {
        setError(result.error ?? 'Falha no upload.');
      }
      // Reset so the same file can be re-selected if needed.
      if (inputRef.current) inputRef.current.value = '';
    });
  }

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/webp,image/jpeg,image/png,image/avif"
        onChange={onFile}
        className="hidden"
        aria-label={label}
      />

      {value ? (
        <div className="space-y-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt={alt || 'Preview da capa'}
            className="max-h-48 rounded border border-neutral-200 bg-neutral-100"
          />
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={pick}
              disabled={isPending}
              className="px-3 py-1.5 border border-neutral-300 text-sm text-neutral-700 rounded-md hover:bg-neutral-100 disabled:opacity-60"
            >
              {isPending ? 'Enviando…' : 'Substituir imagem'}
            </button>
            <button
              type="button"
              onClick={() => onUploaded('')}
              disabled={isPending}
              className="px-3 py-1.5 border border-neutral-300 text-sm text-neutral-700 rounded-md hover:bg-neutral-100 disabled:opacity-60"
            >
              Remover
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={pick}
          disabled={isPending}
          className="inline-flex items-center gap-2 px-3 py-2 border border-dashed border-neutral-400 text-sm text-neutral-700 rounded-md hover:bg-neutral-100 disabled:opacity-60"
        >
          {isPending ? 'Enviando…' : '+ Selecionar imagem'}
        </button>
      )}

      <div className="text-[11px] text-neutral-500 leading-relaxed space-y-0.5">
        <p>
          <strong className="text-neutral-700">Tamanho recomendado:</strong> 1600 × 900 px ·
          proporção 16:9.
        </p>
        <p>
          <strong className="text-neutral-700">Formatos:</strong> WebP, JPEG, PNG ou AVIF ·
          até 5 MB.
        </p>
        <p>
          Armazenado no Supabase Storage (bucket
          <code className="mx-1 px-1 py-0.5 rounded bg-neutral-100 text-[10px]">blog-covers</code>).
        </p>
      </div>

      {error && (
        <p className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
