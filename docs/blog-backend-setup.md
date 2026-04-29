# DM2 Contabilidade — Blog Backend

Backend editorial del blog. Stack: Vercel + Supabase (Postgres + Storage) +
Cloudflare + GitHub. **Sin WordPress, sin CMS visual, sin panel admin
todavía**.

Este documento explica:

1. Modelo de datos
2. Cómo aplicar las migraciones SQL
3. Reglas de visibilidad (publicado / programado / draft)
4. Storage (`blog-covers`)
5. Helpers de acceso desde el frontend
6. Flujo editorial sugerido
7. Qué falta para construir el frontend del blog

---

## 1. Modelo de datos

5 tablas y 1 vista. Migraciones en
[`docs/supabase-blog-tables.sql`](./supabase-blog-tables.sql) y
[`docs/supabase-blog-storage.sql`](./supabase-blog-storage.sql).

```
authors                 ┌── blog_categories
   │ 1                  │ 1
   │                    │
   ▼ N                  ▼ N
   blog_posts (author_id, category_id)
   │ 1
   │
   ├──► blog_post_faqs (cascade)
   └──► blog_post_related_services (cascade)
```

### `authors`
Identidad técnica del autor. Pensado para schema.org `Person` (E-E-A-T).
Campos relevantes: `slug`, `full_name`, `display_name`, `role_title`,
`bio_short`, `bio_long`, `crc_number`, `email`, `profile_image_url`,
`linkedin_url`, `is_active`.

Seed inicial: **Danilo Brito de Morais** (Responsável Técnico, CRC 2SP039587).

### `blog_categories`
Taxonomía editorial. 7 categorías sembradas:

| slug | name |
|---|---|
| `tributario` | Tributário |
| `fiscal` | Fiscal |
| `abertura-de-empresas` | Abertura de Empresas |
| `departamento-pessoal` | Departamento Pessoal |
| `legislacao` | Legislação |
| `mei-e-pequenas-empresas` | MEI e Pequenas Empresas |
| `gestao-financeira` | Gestão Financeira |

### `blog_posts`
Tabla central. Campos agrupados por propósito:

- **Editorial**: `slug`, `title`, `subtitle`, `excerpt`, `content_html`,
  `content_json`, `cover_image_url`, `cover_image_alt`.
- **Estado**: `status` (draft/scheduled/published/archived), `published_at`.
- **Relaciones**: `author_id` (NOT NULL), `category_id`.
- **SEO clásico**: `seo_title`, `seo_description`, `canonical_url`,
  `og_title`, `og_description`, `og_image_url`, `robots_index`,
  `robots_follow`.
- **SEO semántico / GEO / IA**: `primary_keyword`, `secondary_keywords[]`,
  `search_intent`, `entity_focus`, `local_focus`, `faq_enabled`,
  `is_evergreen`, `last_reviewed_at`, `technical_reviewed_by_author`.
- **Distribución**: `featured_on_home`, `featured_order`, `is_pillar`,
  `read_time_minutes`, `related_service_slug`, `related_specialty_slug`.

### `blog_post_faqs`
FAQs específicas del post. ON DELETE CASCADE. Ordenadas por `sort_order`.
Renderizadas con `FAQSchema` para AI Overviews.

### `blog_post_related_services`
Vínculo M:N hacia los slugs de servicios (`/servicos-contabeis/[slug]`).
Tabla simple porque los servicios son archivos del repo, no una entidad DB.

---

## 2. Aplicar las migraciones

En el **Supabase SQL Editor**, en este orden:

1. `docs/supabase-leads-table.sql` — si todavía no se aplicó (define la
   función `update_updated_at` reutilizada por blog).
2. `docs/supabase-blog-tables.sql` — tablas, índices, triggers, RLS, vista,
   seeds.
3. `docs/supabase-blog-storage.sql` — bucket `blog-covers` y políticas.

Los scripts son **idempotentes**: pueden volver a correrse sin romper datos
existentes (`CREATE ... IF NOT EXISTS`, `ON CONFLICT DO UPDATE`,
`DROP POLICY IF EXISTS` antes de cada `CREATE POLICY`).

Verificación rápida después de aplicar:

```sql
SELECT slug, full_name FROM authors;
SELECT slug, name, sort_order FROM blog_categories ORDER BY sort_order;
SELECT count(*) FROM blog_posts;  -- 0 esperado en instalación limpia
```

---

## 3. Reglas de visibilidad

Un post está públicamente visible **si y sólo si**:

- `status = 'published'`, **o**
- `status = 'scheduled'` AND `published_at <= now()`

Esta regla está aplicada en **dos capas** que se refuerzan:

1. **RLS** (`blog_posts_public_visibility`): el cliente anon nunca puede
   leer drafts ni scheduled futuros. Esto cubre acceso directo al cliente
   Supabase desde el navegador.
2. **Filtro explícito en queries** (`src/lib/blog/queries.ts`): cada
   helper aplica la misma condición vía `.or(...)`. Esto sirve cuando se
   ejecuta con service-role key (RLS bypassed) o desde server actions.

Una **VIEW `published_blog_posts`** queda creada por conveniencia (admins,
herramientas externas), pero el código de la app consulta directamente
`blog_posts` con el filtro explícito.

Resultado: **no hace falta cron job** para "publicar a la hora X". El post
queda invisible hasta que `published_at` pase, y aparece automáticamente
en la próxima request.

---

## 4. Storage — bucket `blog-covers`

- Público en lectura (`storage.objects` policy `blog_covers_public_read`).
- Escritura sólo `authenticated`.
- Tipos permitidos: WebP, JPEG, PNG, AVIF.
- Límite por archivo: 5 MB.

Subida sugerida desde el dashboard de Supabase. URL pública:

```
https://<project-ref>.supabase.co/storage/v1/object/public/blog-covers/<path>
```

Esa URL se guarda en `blog_posts.cover_image_url` y `blog_posts.og_image_url`.

> **Nota**: si el equipo prefiere mantener las imágenes en el repo
> (`/public/images/blog/`) por ahora, esa también es opción válida.
> El bucket está listo para cuando se quiera dejar de versionar binarios.

---

## 5. Helpers de acceso

Implementados en [`src/lib/blog/queries.ts`](../src/lib/blog/queries.ts).
Todos manejan el caso `supabase === null` (ambiente sin credenciales)
devolviendo arrays vacíos / `null` sin lanzar.

| Función | Propósito |
|---|---|
| `getPublishedPosts({ limit, offset, categorySlug })` | Lista posts visibles, newest first. |
| `getPostBySlug(slug)` | Devuelve un post visible o `null`. |
| `getFeaturedPosts(limit = 3)` | Featured + top-up con últimos publicados si faltan. |
| `getPostFaqs(postId)` | FAQs del post, ordenadas. |
| `getPostRelatedServiceSlugs(postId)` | Slugs de servicios relacionados. |
| `getActiveCategories()` | Categorías activas, ordenadas. |
| `getActiveAuthors()` | Autores activos. |
| `isBlogBackendReady()` | `true` si Supabase está configurado. |

Todos joinan `author` y `category` cuando aplica, y devuelven el dominio
camelCase via mappers explícitos (sin acoplar el resto del código a las
columnas snake_case de Postgres).

---

## 6. Flujo editorial sugerido

Mientras no haya panel admin:

1. **Redacción**: un autor escribe el artículo en Markdown / HTML offline.
   Define metadatos (slug, keywords, FAQs, related services).
2. **Carga**: vía Supabase Studio (Table Editor) o vía SQL `INSERT`.
   - Imágenes: subir al bucket `blog-covers` desde el dashboard, copiar URL.
   - Status: `draft` mientras se revisa, `scheduled` con `published_at`
     futura para programar, `published` para publicar inmediato.
3. **Programación**: setear `published_at` al timestamp deseado y
   `status = 'scheduled'`. Aparece automáticamente.
4. **Featured en home**: marcar `featured_on_home = true` y opcionalmente
   `featured_order = 1..N` para fijar el orden.
5. **Revisión periódica**: actualizar `last_reviewed_at` y dejar
   `technical_reviewed_by_author = true` después de revisar normativas.

Cuando crezca el volumen, se puede sumar:

- Una página de admin protegida con Supabase Auth (rol específico).
- Un editor MDX/TipTap que escriba en `content_json` y `content_html`.
- Webhooks Cloudflare → Vercel para revalidación on-publish.

---

## 7. Cómo el frontend debe consumir esto

**Listado del blog** (`/blog`):

```ts
import { getPublishedPosts } from '@/lib/blog/queries';

export default async function BlogPage() {
  const posts = await getPublishedPosts({ limit: 12 });
  return (...);
}
```

**Post individual** (`/blog/[slug]`):

```ts
import { getPostBySlug, getPostFaqs } from '@/lib/blog/queries';
import { notFound } from 'next/navigation';

export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();
  const faqs = post.faqEnabled ? await getPostFaqs(post.id) : [];
  return (...);
}
```

**Home featured** (en `/`):

```ts
import { getFeaturedPosts } from '@/lib/blog/queries';

const posts = await getFeaturedPosts(3);
```

**Generación estática (recomendado)**:

- `/blog` y `/blog/[slug]` se pueden hacer SSG con `generateStaticParams()`.
- Para programación correcta, usar **ISR** con `revalidate` cada N minutos
  (ej. 600 s = 10 min). Posts programados se materializan en el primer
  request después de su `published_at`.
- Alternativa: dejar las páginas dinámicas en server components. Latencia
  marginal, pero el filtro de visibilidad siempre es correcto.

**Schema markup**: cada post tiene los campos para emitir:

- `Article` / `BlogPosting` con `datePublished`, `dateModified`,
  `headline`, `description`, `image`, `author` (Person), `publisher`.
- `FAQPage` desde `blog_post_faqs` cuando `faq_enabled = true`.
- `BreadcrumbList` (Home → Blog → Categoría → Post).

---

## 8. Qué falta para construir el frontend

- [ ] Página `/blog/[slug]` (todavía no existe; `/blog` index sí).
- [ ] Adaptar el `/blog` actual (placeholders) para consumir `getPublishedPosts`.
- [ ] Sección "Conteúdo" del home: cambiar los 3 placeholders por
      `getFeaturedPosts(3)`.
- [ ] `Article`/`BlogPosting` schema en el componente del post.
- [ ] Componentes: `BlogPostCard`, `BlogPostHero`, `BlogPostBody` (renderiza
      `content_html` o `content_json`), `BlogPostMeta` (autor + fecha).
- [ ] Sitemap: incluir `/blog/[slug]` para todos los posts visibles.
- [ ] (Opcional) Renderizado de `content_json` con TipTap o MDX si los
      artículos se editan estructuradamente; HTML directo es válido para
      arrancar.
