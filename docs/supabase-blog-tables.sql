-- =============================================
-- DM2 Contabilidade — Blog Backend
-- Run this script in Supabase SQL Editor (in order, top to bottom).
-- Idempotent: can be re-run safely.
--
-- Creates: authors, blog_categories, blog_posts,
--          blog_post_faqs, blog_post_related_services
-- + indexes, triggers, RLS, helper view, seeds.
-- =============================================


-- =============================================
-- 0. Shared trigger: update updated_at on row change
-- (Already created by leads table; redefined here idempotently)
-- =============================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- =============================================
-- 1. authors
-- =============================================

CREATE TABLE IF NOT EXISTS authors (
  id                    UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug                  TEXT UNIQUE NOT NULL,
  full_name             TEXT NOT NULL,
  display_name          TEXT NOT NULL,
  role_title            TEXT NOT NULL,
  bio_short             TEXT,
  bio_long              TEXT,
  crc_number            TEXT,
  email                 TEXT,
  profile_image_url     TEXT,
  linkedin_url          TEXT,
  is_active             BOOLEAN NOT NULL DEFAULT true,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_authors_slug ON authors (slug);
CREATE INDEX IF NOT EXISTS idx_authors_is_active ON authors (is_active);

DROP TRIGGER IF EXISTS authors_updated_at ON authors;
CREATE TRIGGER authors_updated_at
  BEFORE UPDATE ON authors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- =============================================
-- 2. blog_categories
-- =============================================

CREATE TABLE IF NOT EXISTS blog_categories (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug            TEXT UNIQUE NOT NULL,
  name            TEXT NOT NULL,
  description     TEXT,
  sort_order      INT NOT NULL DEFAULT 0,
  is_active       BOOLEAN NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_blog_categories_slug ON blog_categories (slug);
CREATE INDEX IF NOT EXISTS idx_blog_categories_active_order ON blog_categories (is_active, sort_order);

DROP TRIGGER IF EXISTS blog_categories_updated_at ON blog_categories;
CREATE TRIGGER blog_categories_updated_at
  BEFORE UPDATE ON blog_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- =============================================
-- 3. blog_posts (main editorial table)
-- =============================================

CREATE TABLE IF NOT EXISTS blog_posts (
  id                            UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Core editorial
  slug                          TEXT UNIQUE NOT NULL,
  title                         TEXT NOT NULL,
  subtitle                      TEXT,
  excerpt                       TEXT NOT NULL,
  content_html                  TEXT,
  content_json                  JSONB,
  cover_image_url               TEXT,
  cover_image_alt               TEXT,

  -- Editorial state
  status                        TEXT NOT NULL DEFAULT 'draft'
                                  CHECK (status IN ('draft', 'scheduled', 'published', 'archived')),
  published_at                  TIMESTAMPTZ,
  created_at                    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at                    TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Relations
  author_id                     UUID NOT NULL REFERENCES authors(id) ON DELETE RESTRICT,
  category_id                   UUID REFERENCES blog_categories(id) ON DELETE SET NULL,

  -- Classic SEO
  seo_title                     TEXT,
  seo_description               TEXT,
  canonical_url                 TEXT,
  og_title                      TEXT,
  og_description                TEXT,
  og_image_url                  TEXT,
  robots_index                  BOOLEAN NOT NULL DEFAULT true,
  robots_follow                 BOOLEAN NOT NULL DEFAULT true,

  -- Semantic SEO / GEO / AI readiness
  primary_keyword               TEXT,
  secondary_keywords            TEXT[],
  search_intent                 TEXT,
  entity_focus                  TEXT,
  local_focus                   TEXT,
  faq_enabled                   BOOLEAN NOT NULL DEFAULT true,
  is_evergreen                  BOOLEAN NOT NULL DEFAULT false,
  last_reviewed_at              TIMESTAMPTZ,
  technical_reviewed_by_author  BOOLEAN NOT NULL DEFAULT true,

  -- Distribution / UX
  featured_on_home              BOOLEAN NOT NULL DEFAULT false,
  featured_order                INT,
  is_pillar                     BOOLEAN NOT NULL DEFAULT false,
  read_time_minutes             INT,
  related_service_slug          TEXT,
  related_specialty_slug        TEXT
);

-- Hot indexes for the common queries
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status_pub ON blog_posts (status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts (published_at DESC) WHERE status IN ('published', 'scheduled');
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts (featured_on_home, featured_order ASC NULLS LAST, published_at DESC) WHERE featured_on_home = true;
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts (category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author ON blog_posts (author_id);

DROP TRIGGER IF EXISTS blog_posts_updated_at ON blog_posts;
CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- =============================================
-- 4. blog_post_faqs
-- =============================================

CREATE TABLE IF NOT EXISTS blog_post_faqs (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id         UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  question        TEXT NOT NULL,
  answer          TEXT NOT NULL,
  sort_order      INT NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_blog_post_faqs_post ON blog_post_faqs (post_id, sort_order);

DROP TRIGGER IF EXISTS blog_post_faqs_updated_at ON blog_post_faqs;
CREATE TRIGGER blog_post_faqs_updated_at
  BEFORE UPDATE ON blog_post_faqs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- =============================================
-- 5. blog_post_related_services
-- =============================================

CREATE TABLE IF NOT EXISTS blog_post_related_services (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id         UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  service_slug    TEXT NOT NULL,
  sort_order      INT NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (post_id, service_slug)
);

CREATE INDEX IF NOT EXISTS idx_blog_post_related_services_post ON blog_post_related_services (post_id, sort_order);


-- =============================================
-- 6. Helper view: published_blog_posts
-- Solves the "visible publicly" rule once, instead of repeating in every query.
-- A post is visible if:
--   status = 'published' OR (status = 'scheduled' AND published_at <= now())
-- =============================================

CREATE OR REPLACE VIEW published_blog_posts AS
SELECT *
FROM blog_posts
WHERE
  (status = 'published')
  OR (status = 'scheduled' AND published_at IS NOT NULL AND published_at <= now());


-- =============================================
-- 7. Row Level Security
-- Authenticated users (admins) can write.
-- Anonymous users can read only what is publicly visible.
-- =============================================

-- ----- authors -----
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authors_public_read_active" ON authors;
CREATE POLICY "authors_public_read_active" ON authors
  FOR SELECT TO anon, authenticated
  USING (is_active = true);

DROP POLICY IF EXISTS "authors_authenticated_write" ON authors;
CREATE POLICY "authors_authenticated_write" ON authors
  FOR ALL TO authenticated
  USING (true) WITH CHECK (true);


-- ----- blog_categories -----
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "categories_public_read_active" ON blog_categories;
CREATE POLICY "categories_public_read_active" ON blog_categories
  FOR SELECT TO anon, authenticated
  USING (is_active = true);

DROP POLICY IF EXISTS "categories_authenticated_write" ON blog_categories;
CREATE POLICY "categories_authenticated_write" ON blog_categories
  FOR ALL TO authenticated
  USING (true) WITH CHECK (true);


-- ----- blog_posts -----
-- Conditional public SELECT: visible only if published OR scheduled<=now.
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "blog_posts_public_visibility" ON blog_posts;
CREATE POLICY "blog_posts_public_visibility" ON blog_posts
  FOR SELECT TO anon, authenticated
  USING (
    status = 'published'
    OR (status = 'scheduled' AND published_at IS NOT NULL AND published_at <= now())
  );

DROP POLICY IF EXISTS "blog_posts_authenticated_write" ON blog_posts;
CREATE POLICY "blog_posts_authenticated_write" ON blog_posts
  FOR ALL TO authenticated
  USING (true) WITH CHECK (true);


-- ----- blog_post_faqs -----
-- Public read only if related post is publicly visible.
ALTER TABLE blog_post_faqs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "blog_post_faqs_public_read_via_post" ON blog_post_faqs;
CREATE POLICY "blog_post_faqs_public_read_via_post" ON blog_post_faqs
  FOR SELECT TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM blog_posts bp
      WHERE bp.id = blog_post_faqs.post_id
        AND (
          bp.status = 'published'
          OR (bp.status = 'scheduled' AND bp.published_at IS NOT NULL AND bp.published_at <= now())
        )
    )
  );

DROP POLICY IF EXISTS "blog_post_faqs_authenticated_write" ON blog_post_faqs;
CREATE POLICY "blog_post_faqs_authenticated_write" ON blog_post_faqs
  FOR ALL TO authenticated
  USING (true) WITH CHECK (true);


-- ----- blog_post_related_services -----
ALTER TABLE blog_post_related_services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "blog_post_related_public_read_via_post" ON blog_post_related_services;
CREATE POLICY "blog_post_related_public_read_via_post" ON blog_post_related_services
  FOR SELECT TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM blog_posts bp
      WHERE bp.id = blog_post_related_services.post_id
        AND (
          bp.status = 'published'
          OR (bp.status = 'scheduled' AND bp.published_at IS NOT NULL AND bp.published_at <= now())
        )
    )
  );

DROP POLICY IF EXISTS "blog_post_related_authenticated_write" ON blog_post_related_services;
CREATE POLICY "blog_post_related_authenticated_write" ON blog_post_related_services
  FOR ALL TO authenticated
  USING (true) WITH CHECK (true);


-- =============================================
-- 8. Seeds
-- =============================================

-- Author: Danilo Brito de Morais (Responsável Técnico).
-- NOTE: crc_number is intentionally NULL. The CRC-SP 2SP039587 belongs to
-- DM2 Contabilidade Ltda (the firm), not to the individual professional.
-- The firm's CRC is held in `siteConfig.crcSp` and surfaced as the
-- publisher identifier in BlogPosting JSON-LD. The `crc_number` column
-- on `authors` is kept for forward compatibility but should remain NULL
-- for representantes técnicos who are not registering a personal CRC.
INSERT INTO authors (
  slug, full_name, display_name, role_title, bio_short, crc_number, is_active
) VALUES (
  'danilo-brito',
  'Danilo Brito de Morais',
  'Danilo Brito de Morais',
  'Responsável Técnico',
  'Contador responsável pela DM2 Contabilidade. Atua em São Paulo desde 2003 com foco em consultoria contábil, planejamento tributário e gestão fiscal para empresas de pequeno e médio porte.',
  NULL,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  display_name = EXCLUDED.display_name,
  role_title = EXCLUDED.role_title,
  bio_short = EXCLUDED.bio_short,
  crc_number = EXCLUDED.crc_number,
  is_active = EXCLUDED.is_active,
  updated_at = now();


-- Categories
INSERT INTO blog_categories (slug, name, description, sort_order, is_active) VALUES
  ('tributario',              'Tributário',              'Planejamento tributário, regimes fiscais, obrigações e estratégias de redução legal de impostos.', 10, true),
  ('fiscal',                  'Fiscal',                  'Apuração de impostos, obrigações acessórias, SPED, EFD-Contribuições, DCTF e DIRF.',                20, true),
  ('abertura-de-empresas',    'Abertura de Empresas',    'Guias práticos para abrir e formalizar empresas em São Paulo.',                                     30, true),
  ('departamento-pessoal',    'Departamento Pessoal',    'eSocial, folha de pagamento, férias, rescisão e obrigações acessórias trabalhistas.',                40, true),
  ('legislacao',              'Legislação',              'Atualizações normativas, mudanças tributárias e prazos legais.',                                    50, true),
  ('mei-e-pequenas-empresas', 'MEI e Pequenas Empresas', 'Tudo sobre microempreendedor individual e gestão contábil de pequenas empresas.',                   60, true),
  ('gestao-financeira',       'Gestão Financeira',       'Indicadores, fluxo de caixa, DRE e gestão financeira para empresários.',                            70, true)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active,
  updated_at = now();


-- =============================================
-- Done. Confirm with:
--   SELECT slug, full_name FROM authors;
--   SELECT slug, name, sort_order FROM blog_categories ORDER BY sort_order;
--   SELECT count(*) FROM blog_posts;  -- 0 expected on fresh install
-- =============================================
