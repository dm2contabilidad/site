# Entrega — Sitio DM2 Contabilidade

Documento de entrega del sitio institucional reconstruido para DM2
Contabilidade.

| Item | Valor |
|---|---|
| Cliente | DM2 Contabilidade |
| Dominio canónico | https://dm2contabilidade.com.br |
| Deploy actual (provisional) | https://site-tau-gray-68.vercel.app |
| Repositorio | https://github.com/dm2contabilidad/site |
| Backend | Supabase (proyecto `zyisowurfrutywmkhiki`) |
| Hosting | Vercel |
| Fecha de esta entrega | 03 de mayo de 2026 |

---

## 1. Resumen del proyecto

### Qué es

Sitio institucional de un escritorio de contabilidad fundado en 2003 en
Vila Mariana, São Paulo. Reemplaza la versión anterior por una arquitectura
moderna, optimizada para SEO local, citabilidad por motores generativos
(ChatGPT, Claude, Perplexity, Google AI Overviews) y captación de leads
calificados.

### Objetivo

- Posicionar a DM2 en búsquedas de "contabilidade em São Paulo" y
  variantes específicas (advogados, profissionais da saúde, negócios
  digitais).
- Ser citable por IA cuando alguien pregunta "qual contador em São Paulo
  para advogados / médicos / negócio digital".
- Captar leads cualificados con atribución completa (UTMs, click-IDs,
  landing-page) y notificación inmediata por email al equipo comercial.
- Permitir publicación editorial autónoma del blog desde un panel propio,
  sin depender del equipo técnico para cada post.

### Alcance

- 12 páginas públicas (institucional + servicios + especialidades + blog
  + contato + legales).
- Blog con 6 artículos editoriales publicados, sistema de FAQs y
  servicios relacionados, soporte para artículos pillar y evergreen.
- Panel administrativo `/admin/blog` con autenticación HMAC, upload real
  de imágenes a Supabase Storage, dashboard de métricas operativas y
  flow completo de recuperación de contraseña por email.
- Captación de leads vía formulario protegido por Cloudflare Turnstile,
  almacenamiento en Supabase con RLS, notificación SMTP al equipo.
- Schema markup completo: Organization, AccountingService, Service,
  FAQPage, BreadcrumbList, BlogPosting, Person, ItemList.
- Sitemap.xml dinámico, robots.txt con allow-list para crawlers de IA,
  llms.txt institucional.

### Páginas principales

| Ruta | Propósito |
|---|---|
| `/` | Home institucional |
| `/quem-somos` | Historia + responsable técnico (Danilo Brito de Morais) |
| `/servicos-contabeis` | Hub de los 4 servicios |
| `/servicos-contabeis/{slug}` | Páginas de servicio (4) |
| `/contabilidade-para-advogados` | Especialidad |
| `/contabilidade-para-profissionais-da-saude` | Especialidad |
| `/contabilidade-para-negocios-digitais` | Especialidad |
| `/blog` | Index del blog con filtros por categoría |
| `/blog/{slug}` | Artículo del blog |
| `/contato` | Formulario + datos de contacto |
| `/obrigado` | Confirmación post-envío de formulario |
| `/privacidade`, `/termos` | Legales |

---

## 2. Identidad visual

### Marca

DM2 Contabilidade. Logo en SVG (`public/images/logo/dm2-contabilidade.svg`),
sirve tanto en navegación como en favicons y assets institucionales.

### Paleta institucional

Tres colores marca, con escalas Tailwind derivadas:

| Token | Hex | Uso |
|---|---|---|
| `brand-navy` | `#0C152A` | Fondos institucionales oscuros, headers, footers |
| `brand-blue` | `#07475D` | H2/H3, botón secundario, enlaces |
| `brand-gold` | `#E0B25B` | CTA principal, plecas, acentos |
| `brand-white` | `#FFFFFF` | Texto sobre navy, fondo neutro |

Uso del oro: con moderación. Plecas verticales en lugar de bullets,
botones primarios "Entrar em contato", subrayados sutiles. **No** se usa
para fondos extensos ni para resaltar texto largo.

### Tipografías

Cuatro familias Google Fonts cargadas vía `next/font/google` con
self-hosting automático:

| Familia | Uso | Token |
|---|---|---|
| **Outfit** | Texto base (párrafos, navegación) | `--font-base` |
| **Plus Jakarta Sans** | Texto de soporte | `--font-aux` |
| **Playfair Display** | Display (H1/H2 grandes, hero) | `--font-display` |
| **Sora** | Microcopy / labels | `--font-label` |

### Lógica visual

- **Hero family**: todas las páginas principales comparten un patrón de
  hero — imagen full-bleed con overlay navy triple (35/55/80 %),
  breadcrumb absoluto arriba, contenido anclado abajo o centrado, hairline
  oro inferior, altura `70-80vh`. Esto crea coherencia inmediata sin
  parecer una plantilla.
- **Tarjetas y cards**: bordes finos navy 200, sombras suaves, hover
  gold 600 sutil. Sin neumorfismo, sin glassmorphism.
- **Plecas verticales oro**: reemplazan bullets en listas editoriales
  (ej. perfil de cliente en `/quem-somos`). Da peso editorial, no
  pesado.

### Tono general

Sobrio, institucional, contable. **Sin** clichés de SaaS ("revolutionize",
"transformamos"), **sin** cara de IA, **sin** copy hipster. Voz cercana,
técnica cuando hace falta (Simples Nacional, IBS, CBS, eSocial), siempre
profesional.

### Por qué esta dirección

DM2 es un escritorio de 22 años con cartera de empresas medianas que
valoran continuidad y rigor. La identidad refuerza esos atributos: navy
profundo + oro discreto = solidez + valor sin estridencia. La paleta y
tipografía buscan parecer un escritorio profesional senior, no una
startup.

---

## 3. Arquitectura del sitio

### Estructura de páginas

```
/                                 Home institucional
├── /quem-somos                   Historia + responsable técnico
│
├── /servicos-contabeis           Hub de servicios
│   ├── /consultoria-contabil
│   ├── /planejamento-tributario
│   ├── /gestao-fiscal-e-tributaria
│   └── /abertura-e-regularizacao-de-empresas
│
├── /contabilidade-para-advogados                      Especialidades
├── /contabilidade-para-profissionais-da-saude         (URLs root-level
└── /contabilidade-para-negocios-digitais              para SEO local)
│
├── /blog                         Listado paginado del blog
│   └── /blog/[slug]              Artículo individual
│   └── /blog/categoria/[slug]    Filtro por categoría
│
├── /contato                      Formulario + datos NAP
├── /obrigado                     Página post-envío
│
├── /privacidade                  Política de privacidad
└── /termos                       Términos de uso
```

### Admin

```
/admin/blog                       Listado y gestión de posts
├── /admin/blog/new               Crear post
├── /admin/blog/[id]              Editar post
├── /admin/blog/login             Acceso (HMAC session)
├── /admin/blog/password-reset    Solicitar recuperación
│   └── /confirm?token=…          Definir nueva contraseña
└── /admin/analytics              Dashboard operativo
```

### Decisiones arquitectónicas

- **URLs de especialidades root-level** (`/contabilidade-para-advogados`)
  en lugar de `/para/advogados`. Razón: mejor signal de keyword en SEO
  local. Los URLs viejos redirigen permanentemente (301) en
  `next.config.ts`.
- **Hub de servicios** (`/servicos-contabeis`) intermedio, breadcrumb
  con tres niveles. Las especialidades NO tienen hub intermedio
  (breadcrumb de 2 niveles).
- **Blog separado** del marketing, con su propio hero y categorías.

---

## 4. Lógica del contenido

### H1 / H2 / H3

Cada H1 incluye **keyword principal + geo** (cuando aplica):

| Página | H1 |
|---|---|
| Home | "Contabilidade estratégica em São Paulo" |
| Hub serviços | "Serviços Contábeis em São Paulo" |
| Servicio | "{Servicio} em São Paulo" |
| Especialidad | "Contabilidade para {nicho} em São Paulo" |
| Blog | "Blog de Contabilidade em São Paulo" |
| Contato | "Fale com a DM2 Contabilidade em São Paulo" |
| Quem Somos | "Escritório de contabilidade em São Paulo desde 2003" |

**Una sola H1 por página** (validado en auditoría). H2/H3 estructuran
secciones temáticas, no decoración.

### Lógica SEO

- **Title tags**: cada página define su propio title vía `createMetadata`
  con sufijo de marca explícito. Patrón: `{Pillar} | DM2 Contabilidade
  em São Paulo`.
- **Meta description**: 140-160 caracteres por página, escrita
  manualmente (no generada).
- **Canonical**: cada página declara su URL canónica absoluta sobre el
  dominio `dm2contabilidade.com.br`.
- **Open Graph + Twitter Card**: imagen 1200×630, título, descripción
  y URL en cada página. Fallback a `home-og-sao-paulo.webp`.
- **Sitemap**: generado dinámicamente en `/sitemap.xml`, incluye todas
  las páginas públicas con `lastmod`, `changefreq`, `priority`.
- **Robots**: bloquea `/admin/`, `/obrigado`, `/api/`. Permite y
  whitelistea explícitamente bots de IA (GPTBot, Google-Extended,
  ClaudeBot, PerplexityBot, OAI-SearchBot).

### Lógica GEO (citabilidad por IA)

- **Intros densas autocontenidas** (134-167 palabras) en servicios y
  especialidades, escritas para ser citables como pasaje completo por
  un asistente generativo. Cada intro contiene: definición + a quién
  aplica + qué incluye + dato concreto + diferencial DM2.
- **FAQs con respuestas directas** y datos numéricos (R$ 81.000 limite
  Simples; alíquotas eSocial; Anexo IV; etc.) — formato ideal para
  AI Overviews y citas en Perplexity.
- **llms.txt** institucional en `/llms.txt`: resumen estructurado del
  escritorio para asistentes que lo prefieren.
- **Schema markup**: `Organization`, `AccountingService` (subtipo más
  preciso que `LocalBusiness` para una firma contable), `Service` por
  cada servicio, `FAQPage`, `BreadcrumbList`, `Person` (Danilo Brito de
  Morais como responsable técnico), `BlogPosting` por cada artículo,
  `ItemList` en index del blog.

### Featured posts en home (lógica híbrida)

El home muestra siempre **3 posts**. Lógica:

1. **Prioridad 1**: posts con `featured_on_home = true`, ordenados por
   `featured_order ASC` (menor primero) y luego por `published_at DESC`.
2. **Prioridad 2**: si quedan slots, se rellena con los posts publicados
   más recientes que no estén ya destacados.

→ Resultado: el editor puede fijar 0, 1, 2 o 3 posts manualmente. El home
nunca queda incompleto.

### FAQs

- Editables por post desde el admin (sección "FAQs" del editor).
- Toggle `faq_enabled` controla si se renderizan en la página pública.
- Cuando están activas, se renderizan al final del post y se inyecta
  schema `FAQPage` automáticamente para Rich Results.

### Servicios relacionados

- Cada post puede vincular N servicios (`blog_post_related_services`).
- En la página del post se renderizan como cards al final del cuerpo.
- En las páginas de servicio/especialidad, se listan los posts más
  recientes que mencionan ese servicio (sección "Conteúdos relacionados").

---

## 5. Blog y panel administrativo

### Acceso

- URL: `/admin/blog/login`
- Autenticación: contraseña única (single-tenant) protegida por hash
  `scrypt` en la tabla `admin_users`.
- Sesión: cookie HMAC firmada con `ADMIN_SESSION_SECRET`, válida 8 horas.
- Bootstrap inicial: en el primer acceso con la tabla vacía, se usa
  `ADMIN_BLOG_PASSWORD` y `ADMIN_EMAIL` como semilla. Después, la
  contraseña vive solo en DB.

### Recuperación de contraseña

1. En el login, click "Esqueci minha senha".
2. Click en "Enviar link de redefinição" → se envía un email a
   `ADMIN_EMAIL` con un link de un solo uso, válido 30 minutos.
3. El destinatario abre el link, define una nueva contraseña.
4. Sesiones anteriores caen al instante (campo
   `sessions_invalidated_at`).

Si en algún momento el flow de email no está disponible, hay un
fallback de emergencia: `node scripts/admin-set-password.mjs` (corre
local, genera SQL para pegar en Supabase).

### Crear un post

1. `/admin/blog` → click "+ Novo post".
2. Rellenar campos obligatorios (título, slug, excerto, status, autor).
3. Subir imagen de capa (drag o file picker, sube a Supabase Storage
   automáticamente, devuelve URL).
4. Status:
   - `draft`: no visible públicamente, sin fecha requerida.
   - `scheduled`: requiere fecha futura, aparece automáticamente al
     llegar la hora.
   - `published`: visible al instante.
   - `archived`: oculto del público pero conservado.
5. Marcar `Featured no home` opcionalmente, con su `Ordem`.
6. Añadir FAQs y servicios relacionados.
7. Click "Criar post" → redirige a la pantalla de edición con banner
   verde "Post criado com sucesso".

### Editar un post

1. `/admin/blog` → click en el título del post o en "Editar".
2. Modificar lo que haga falta.
3. Click "Salvar alterações" → banner verde "Alterações salvas",
   scroll automático arriba.

### Programar publicación

1. Crear/editar post con `status = scheduled`.
2. Definir `Data de publicação` con un valor futuro.
3. El post aparece automáticamente en `/blog` cuando la fecha llega
   — sin necesidad de intervención manual ni de redeploy.

### Subir imagen de capa

- Drag-and-drop o file picker dentro del formulario.
- Tamaño recomendado: **1600 × 900 px**, proporción **16:9**.
- Formatos aceptados: WebP, JPEG, PNG, AVIF. Hasta **5 MB**.
- Almacenamiento: bucket público `blog-covers` en Supabase Storage.
- La URL pública se rellena automáticamente en el campo
  `cover_image_url`.

### Featured

- Toggle `Mostrar no home` por post.
- Campo `Ordem (menor primeiro)`: si hay 2 destacados, el de orden 0
  va primero.
- Si no marcás ninguno, el home se autocompleta con los 3 más recientes.
- Si marcás 1 o 2, se rellena lo que falta con los más recientes.

### FAQs

- Sección "FAQs" del formulario.
- Botón "+ Adicionar FAQ" abre input de pergunta + resposta.
- Botones ↑ ↓ para reordenar, "Remover" para borrar.
- Toggle `Renderizar FAQ no post` (sección "SEO") controla si se
  muestran y si se emite el schema FAQPage.

### Servicios relacionados

- Sección "Serviços relacionados" del formulario.
- Checklist contra los 4 servicios reales del sitio. Marcás los que
  apliquen.
- Se renderizan como cards al final del post.

### Dashboard `/admin/analytics`

Lectura rápida del estado operativo. Pestañas:

**Blog:**
- KPIs: publicados / agendados / rascunhos / arquivados.
- Featured manual (lista actual).
- Próximos a publicar (programados futuros).
- Últimos publicados (5 más recientes).

**Leads:**
- Totales y ventanas: 24 h / 7 d / 30 d.
- Con `gclid`, con `fbclid`, con UTM, sin origen identificada.
- Sparkline de actividad últimos 14 días.
- Breakdowns: por origen inferida, por `utm_source`, por landing page,
  por status interno.
- Tabla de los 8 leads más recientes.

**Inferencia de origen** (heurística transparente):
1. `utm_source` → `UTM · {valor}`
2. `gclid` → "Google Ads (gclid)"
3. `fbclid` → "Meta Ads (fbclid)"
4. `referrer` hostname (Google orgánico, Bing, ChatGPT, Perplexity,
   Claude, LinkedIn, Meta…)
5. Sin señal → "Directo"

---

## 6. Formulario y captación de leads

### Qué guarda el formulario

Campos del usuario:
- `nome`, `email`, `telefone`, `empresa` (opcional),
  `servico_interesse` (select), `mensagem` (opcional).

Atribución capturada automáticamente (todo persistido):
- `origem_pagina` — pathname desde donde se envió.
- `landing_page` — primera URL visitada en la sesión (first-touch).
- `referrer` — `document.referrer` capturado al primer hit.
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`,
  `utm_term` — capturados de la URL al entrar al sitio, persistidos en
  `sessionStorage`.
- `gclid` — Google Ads click ID.
- `fbclid` — Meta (Facebook) click ID.
- `user_agent`, `ip_hash` (SHA-256 del IP, no IP raw).

### Flujo

1. Usuario llena el form en `/contato`.
2. Cloudflare Turnstile valida que no es bot.
3. Server action sanitiza, valida con Zod, inserta en `leads` (Supabase).
4. Si SMTP está configurado, envía email a `MAIL_TO` con todos los
   campos + sección de atribución completa.
5. Redirect a `/obrigado`.

### Notificación SMTP

Email institucional sobrio, lista en HTML con dos secciones (datos del
lead + atribución). El asunto incluye nombre y servicio:
`Novo lead: {nome} — {serviço}`.

Si el SMTP no está configurado, el lead **se guarda igual** en Supabase
y solo se omite el email (sin error al usuario).

### Lectura de leads

Hoy: dashboard `/admin/analytics` (read-only). El editor del lead (cambiar
`status`, agregar `notas`) **no está implementado** — se gestiona desde
el dashboard de Supabase. Recomendación: si la operativa lo pide,
agregar pestaña `/admin/leads` editable en una iteración futura.

---

## 7. Email / SMTP

### Cómo está preparado

- Cliente: `nodemailer`, transportador lazy memoizado.
- Mitigación de header injection: `sanitizeHeaderValue` strip CR/LF.
- Escape HTML conservador en el body.
- Manejo de errores: si SMTP falla, log local, no se rompe el flujo del
  formulario.

### Variables necesarias

| Variable | Ejemplo | Comentario |
|---|---|---|
| `SMTP_HOST` | `smtp.gmail.com` o `smtp.office365.com` | |
| `SMTP_PORT` | `587` o `465` | |
| `SMTP_SECURE` | `true` para 465, `false` para 587 | |
| `SMTP_USER` | usuario autenticación | |
| `SMTP_PASS` | password (nunca commitear) | |
| `MAIL_FROM` | `"DM2 Contabilidade <noreply@dm2contabilidade.com.br>"` | |
| `MAIL_TO` | `contato@dm2contabilidade.com.br` | Destinatario notificaciones |

### Estado actual

- **Código**: completamente implementado y probado en build.
- **Activación en producción**: depende de cargar las 7 variables
  en Vercel. Sin estas, el formulario sigue funcionando y guardando
  leads, pero no hay notificación por email.

### Flujo de password reset por email

Reutiliza el mismo SMTP. Si SMTP no está configurado, el flow web
muestra "Se houver uma conta, enviamos um link" pero no hay email
real. Por eso conviene activar SMTP antes de la entrega final.

---

## 8. Base de datos

### Tablas

```
authors
  id (UUID, PK)
  slug (UNIQUE)
  full_name, display_name, role_title
  bio_short, bio_long, crc_number, email
  profile_image_url, linkedin_url
  is_active, created_at, updated_at

blog_categories
  id (UUID, PK)
  slug (UNIQUE), name, description, sort_order, is_active
  created_at, updated_at

blog_posts
  id (UUID, PK)
  slug (UNIQUE), title, subtitle, excerpt
  content_html, content_json, cover_image_url, cover_image_alt
  status (draft|scheduled|published|archived)
  published_at, created_at, updated_at
  author_id  → authors(id)        ON DELETE RESTRICT
  category_id → blog_categories(id) ON DELETE SET NULL
  seo_title, seo_description, canonical_url
  og_title, og_description, og_image_url
  robots_index, robots_follow
  primary_keyword, secondary_keywords[], search_intent
  entity_focus, local_focus
  faq_enabled, is_evergreen, last_reviewed_at
  technical_reviewed_by_author
  featured_on_home, featured_order
  is_pillar
  related_service_slug, related_specialty_slug

blog_post_faqs
  id, post_id (FK CASCADE), question, answer, sort_order

blog_post_related_services
  id, post_id (FK CASCADE), service_slug, sort_order

leads
  id, created_at, updated_at, status, notas
  nome, email, telefone, empresa, servico_interesse, mensagem
  origem_pagina, referrer, landing_page
  utm_source, utm_medium, utm_campaign, utm_content, utm_term
  gclid, fbclid
  user_agent, ip_hash

admin_users
  id (UUID, PK)
  email (UNIQUE)
  password_hash (scrypt format)
  password_updated_at
  sessions_invalidated_at
  created_at, updated_at

admin_password_resets
  id, user_id (FK CASCADE), token_hash (UNIQUE)
  created_at, expires_at, used_at, ip_hash
```

### Relaciones

```
authors ─< blog_posts >─ blog_categories
                  │
                  ├─< blog_post_faqs
                  └─< blog_post_related_services

admin_users ─< admin_password_resets

leads (sin FK, tabla independiente)
```

### Storage

| Bucket | Visibilidad | Límite | MIMEs aceptados |
|---|---|---|---|
| `blog-covers` | público | 5 MB | image/webp, image/jpeg, image/png, image/avif |

### RLS (Row Level Security)

Todas las tablas tienen RLS habilitado.

- **Públicas (SELECT para anon)**: `authors` (solo activos),
  `blog_categories` (solo activas), `blog_posts` (visibility =
  published o scheduled <= now), `blog_post_faqs`, `blog_post_related_services`
  (visibility heredada del post).
- **Solo INSERT desde anon**: `leads` (formulario público, sin SELECT).
- **Sin acceso anon**: `admin_users`, `admin_password_resets` (escritura
  y lectura solo via `SUPABASE_SERVICE_ROLE_KEY`).

### Scripts SQL

Todos en `docs/`. Idempotentes — seguro re-ejecutar:

| Archivo | Crea |
|---|---|
| `supabase-blog-tables.sql` | authors, blog_categories, blog_posts, FAQs, related |
| `supabase-blog-storage.sql` | bucket `blog-covers` + policies |
| `supabase-blog-seed-posts.sql` | seed inicial de los 6 artículos (opcional) |
| `supabase-leads-table.sql` | tabla leads + RLS + idempotent ALTER |
| `supabase-admin-users.sql` | admin_users + admin_password_resets |

---

## 9. Stack y dependencias

### Stack principal

| Pieza | Versión | Por qué |
|---|---|---|
| Next.js | 16.x | App Router, RSC, Turbopack, server actions |
| React | 19.x | Concurrent rendering |
| TypeScript | 5.x | Strict mode, tipado en todo el código |
| Tailwind CSS | 4.x | Tokens `@theme inline`, sin config JS |
| Supabase JS | 2.x | Cliente para Postgres + Storage |
| Nodemailer | 8.x | Envío SMTP (leads + password reset) |
| Zod | 4.x | Validación de inputs en server actions |
| React Hook Form | 7.x | Form de contato controlado |

### Dependencias secundarias

- `@hookform/resolvers` — bridge Zod ↔ react-hook-form.
- `@types/nodemailer` — tipos.
- `resend` — **legacy**, no se usa. Pendiente eliminar (ver
  recomendaciones).

### Hosting

- **Vercel**: build, edge middleware, runtime serverless. Configura
  env vars desde el dashboard. Cada push a `main` dispara deploy.
- **Supabase**: backend único (Postgres + Storage + RLS). Proyecto
  `zyisowurfrutywmkhiki`.
- **Cloudflare Turnstile**: validación de bot en el formulario.
- **Google Fonts**: self-hosted vía `next/font/google` (sin requests
  externos en runtime).

### Rendimiento de build

- Compilación TypeScript: ~2 s.
- Total `next build`: ~10 s.
- 23 rutas (8 estáticas, 15 dinámicas server-rendered).

---

## 10. Recomendaciones futuras

### Activación pendiente para producción

1. **Configurar SMTP en Vercel** (7 variables). Sin esto, no hay
   notificación de leads ni password reset por email.
2. **Configurar Cloudflare Turnstile en Vercel**
   (`NEXT_PUBLIC_TURNSTILE_SITE_KEY` y `TURNSTILE_SECRET_KEY`). Sin
   esto, el formulario rechaza envíos.
3. **Apuntar el dominio**: `dm2contabilidade.com.br` debería apuntar
   al deploy de Vercel (DNS + verificación). Hoy el sitio vive en
   `site-tau-gray-68.vercel.app` provisional.
4. **Confirmar que `NEXT_PUBLIC_SITE_URL` en Vercel = dominio final**
   (no `localhost` ni el preview).

### Nice-to-have a futuro (no bloqueantes)

- **Editor de leads en `/admin`**: hoy se gestiona desde Supabase
  dashboard. Si el equipo comercial quiere cambiar `status` y agregar
  `notas` desde el panel, agregar `/admin/leads`.
- **Eliminar dependencia `resend`**: legacy, no usada. Quitar de
  `package.json` reduce 6+ MB del install y elimina ruido.
- **Renombrar `middleware.ts` → `proxy.ts`**: Next 16 deprecó la
  convención `middleware`. Aviso cosmético, no bloqueante. Renombrar
  cuando convenga.
- **Caché del blog**: hoy `/blog` server-renders en ~1-3 s en cold
  start. Si el tráfico crece, revaluar caching ISR o tags.
- **Imágenes en posts**: hoy se sube cover. Cuerpo del artículo es
  HTML libre. Si los editores van a pegar imágenes inline, evaluar
  uploader inline.
- **Author profile pages**: las URLs `/blog/autor/{slug}` no existen.
  Si el equipo va a sumar autores y quiere darles página, agregar.

### Mantenimiento

- **Backups**: Supabase ofrece point-in-time recovery (paid tier). Si
  el plan es free, hacer backups manuales periódicos del schema y
  data crítica (`pg_dump` desde el dashboard).
- **Rotación de secretos**: `ADMIN_SESSION_SECRET` rotación opcional
  cada 6-12 meses. Una rotación invalida todas las sesiones admin
  activas (intencional).
- **Actualizaciones de dependencias**: Next.js minor cada ~3 meses,
  Tailwind y Supabase trimestrales. Validar build local antes de
  pushear.
- **Logs**: Vercel guarda logs de runtime 30 días en plan free. Si se
  necesita más historia, conectar a Logtail / Datadog.

---

## Anexo — Variables de entorno

Lista completa de las variables que necesita el sitio. Server-only
salvo las que comienzan con `NEXT_PUBLIC_`.

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY            # crítico — server-only

# Sitio
NEXT_PUBLIC_SITE_URL                 # https://dm2contabilidade.com.br

# Admin
ADMIN_BLOG_PASSWORD                  # solo seed inicial
ADMIN_EMAIL                          # contato@dm2contabilidade.com.br
ADMIN_SESSION_SECRET                 # 32+ chars random

# SMTP (formulario + password reset)
SMTP_HOST
SMTP_PORT
SMTP_SECURE
SMTP_USER
SMTP_PASS
MAIL_FROM
MAIL_TO

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY
TURNSTILE_SECRET_KEY

# Analytics (opcional)
NEXT_PUBLIC_GA_MEASUREMENT_ID
NEXT_PUBLIC_META_PIXEL_ID
```

---

## Anexo — URLs del admin (referencia rápida)

| Acción | URL (sustituir dominio) |
|---|---|
| Login | `/admin/blog/login` |
| Listado de posts | `/admin/blog` |
| Crear post | `/admin/blog/new` |
| Editar post | `/admin/blog/{id}` |
| Recuperar contraseña | `/admin/blog/password-reset` |
| Definir nueva contraseña (link del email) | `/admin/blog/password-reset/confirm?token=…` |
| Dashboard de métricas | `/admin/analytics` |

---

## Anexo — Cómo correr SQL en Supabase

1. Dashboard del proyecto → **SQL Editor** → **New query**.
2. Pegar el contenido del archivo `.sql` correspondiente.
3. Click **Run**.

Si el script ya se corrió antes y se intenta de nuevo, todos los
scripts son idempotentes — usan `IF NOT EXISTS` y `ON CONFLICT
DO NOTHING / DO UPDATE`. Es seguro re-ejecutar.

---

*Documento generado en el cierre de la fase de implementación.*
*Cualquier duda técnica posterior puede consultarse contra los
archivos rectores en `docs/` (MASTER-PLAN, SITEMAP-SEO-GEO-ARCHITECTURE,
DESIGN-SYSTEM-UX-SYSTEM, COPY-SYSTEM-CONTENT-ARCHITECTURE,
TECHNICAL-ARCHITECTURE-DATA-SECURITY-TRACKING).*
