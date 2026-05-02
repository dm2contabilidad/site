'use server';

import { isAdminAuthenticated } from '@/lib/admin/session';
import { requireAdminClient } from '@/lib/supabase-admin';

/**
 * Cover image upload for the blog admin.
 *
 * Uses the service-role client (bypasses RLS) to write into the
 * `blog-covers` Supabase Storage bucket defined in
 * docs/supabase-blog-storage.sql. The bucket is public, so the public
 * URL can be saved directly into blog_posts.cover_image_url /
 * og_image_url and rendered by next/image (matched by the
 * remotePatterns rule in next.config.ts).
 *
 * Validation mirrors the bucket's allowed_mime_types and
 * file_size_limit so the admin gets a useful error before the upload
 * is rejected by Storage.
 */

const ALLOWED_MIME = new Set([
  'image/webp',
  'image/jpeg',
  'image/png',
  'image/avif',
]);
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB — must match bucket file_size_limit
const BUCKET = 'blog-covers';

export interface UploadResult {
  ok: boolean;
  url?: string;
  path?: string;
  error?: string;
}

function extFromMime(mime: string, fallback: string): string {
  switch (mime) {
    case 'image/webp':
      return 'webp';
    case 'image/jpeg':
      return 'jpg';
    case 'image/png':
      return 'png';
    case 'image/avif':
      return 'avif';
    default:
      return fallback;
  }
}

function safeSlug(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'cover';
}

export async function uploadBlogImageAction(formData: FormData): Promise<UploadResult> {
  if (!(await isAdminAuthenticated())) {
    return { ok: false, error: 'Não autenticado.' };
  }

  const file = formData.get('file');
  if (!(file instanceof File)) {
    return { ok: false, error: 'Arquivo ausente.' };
  }

  if (!ALLOWED_MIME.has(file.type)) {
    return {
      ok: false,
      error: 'Formato não suportado. Use WebP, JPEG, PNG ou AVIF.',
    };
  }

  if (file.size === 0) {
    return { ok: false, error: 'Arquivo vazio.' };
  }

  if (file.size > MAX_BYTES) {
    return { ok: false, error: 'Arquivo maior que 5 MB.' };
  }

  const slugHint = safeSlug(String(formData.get('slugHint') ?? ''));
  const ext = extFromMime(file.type, 'bin');
  // Random suffix avoids collisions and stops the URL from being guessable.
  const random = Math.random().toString(36).slice(2, 8);
  const stamp = Date.now();
  const path = `${slugHint}/${stamp}-${random}.${ext}`;

  let client;
  try {
    client = requireAdminClient();
  } catch {
    return {
      ok: false,
      error: 'Storage indisponível. Verifique SUPABASE_SERVICE_ROLE_KEY.',
    };
  }

  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);

  const { error: uploadError } = await client.storage
    .from(BUCKET)
    .upload(path, bytes, {
      contentType: file.type,
      cacheControl: '31536000',
      upsert: false,
    });

  if (uploadError) {
    if (uploadError.message?.toLowerCase().includes('bucket not found')) {
      return {
        ok: false,
        error:
          'Bucket "blog-covers" não existe. Rode docs/supabase-blog-storage.sql.',
      };
    }
    return {
      ok: false,
      error: `Falha no upload: ${uploadError.message}`,
    };
  }

  const { data } = client.storage.from(BUCKET).getPublicUrl(path);
  if (!data?.publicUrl) {
    return { ok: false, error: 'Upload OK mas URL pública indisponível.' };
  }

  return { ok: true, url: data.publicUrl, path };
}
