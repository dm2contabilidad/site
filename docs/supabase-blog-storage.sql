-- =============================================
-- DM2 Contabilidade — Blog Storage Bucket
-- Run this AFTER supabase-blog-tables.sql
--
-- Creates the 'blog-covers' bucket for featured images,
-- with public read access and authenticated-only writes.
-- Idempotent.
-- =============================================

-- 1. Bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blog-covers',
  'blog-covers',
  true,
  5242880, -- 5 MB per file
  ARRAY['image/webp', 'image/jpeg', 'image/png', 'image/avif']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;


-- 2. RLS policies on storage.objects (already enabled by Supabase)

-- Public read of any object inside this bucket
DROP POLICY IF EXISTS "blog_covers_public_read" ON storage.objects;
CREATE POLICY "blog_covers_public_read" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'blog-covers');

-- Authenticated upload
DROP POLICY IF EXISTS "blog_covers_authenticated_insert" ON storage.objects;
CREATE POLICY "blog_covers_authenticated_insert" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'blog-covers');

-- Authenticated update (replace covers)
DROP POLICY IF EXISTS "blog_covers_authenticated_update" ON storage.objects;
CREATE POLICY "blog_covers_authenticated_update" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'blog-covers')
  WITH CHECK (bucket_id = 'blog-covers');

-- Authenticated delete
DROP POLICY IF EXISTS "blog_covers_authenticated_delete" ON storage.objects;
CREATE POLICY "blog_covers_authenticated_delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'blog-covers');


-- =============================================
-- Usage:
--   Upload via Supabase dashboard or service-role key.
--   Public URL pattern:
--     https://<project-ref>.supabase.co/storage/v1/object/public/blog-covers/<path>
--   Save that URL into blog_posts.cover_image_url and og_image_url.
-- =============================================
