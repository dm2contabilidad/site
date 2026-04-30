# TECHNICAL-ARCHITECTURE-DATA-SECURITY-TRACKING-DM2.md

## Arquitectura Técnica, Datos, Seguridad y Tracking — DM2 Contabilidade

**Versión:** 1.0  
**Fecha:** 02 de abril de 2026  
**Estado:** CONGELADO — base para desarrollo  
**Documentos rectores:** MASTER-PLAN, SITEMAP-ARCHITECTURE, DESIGN-SYSTEM, COPY-SYSTEM  
**Idioma del documento:** Español (comunicación interna)  
**Idioma del sitio final:** Portugués de Brasil

---

## 1. OBJETIVO DE LA FASE

### Por qué congelar arquitectura técnica antes de construir

Sin arquitectura técnica congelada, las decisiones se toman sobre la marcha: el formulario se conecta a lo primero que funciona, el tracking se agrega donde cabe, la seguridad se parchea al final, y la estructura de archivos crece sin criterio hasta que nadie la entiende.

Congelar esta capa garantiza:

- **Stack definido sin ambigüedad.** Cada herramienta tiene un rol claro. No hay solapamiento ni improvisación.
- **Datos con estructura.** La tabla de leads se diseña una vez, con todos los campos necesarios, antes de escribir una sola línea de código.
- **Seguridad desde el día cero.** Headers, validación, anti-bot, RLS — todo está decidido antes del primer deploy.
- **Tracking planificado.** Los eventos se definen antes de construir las páginas, no después de lanzar.
- **Performance como constraint arquitectónico.** Las decisiones de rendering, caching y carga de scripts se toman en la arquitectura, no cuando PageSpeed da rojo.
- **Repositorio profesional.** La estructura de carpetas se define una vez y escala sin refactoring.

---

## 2. STACK FINAL

### Componentes del stack y su rol

| Herramienta | Rol | Por qué fue elegida | Riesgos que evita | Límites |
|---|---|---|---|---|
| **Next.js 14+ (App Router)** | Framework frontend + backend. SSG/SSR. Routing. Server Actions. API Routes. | Framework React de producción más maduro. SSG para performance máxima. Server Actions para formularios sin API separada. App Router para layouts y metadata nativos. | Evita SPAs lentas, frameworks sin SSG, y tener que montar servidor propio. | Requiere Vercel para máximo rendimiento de edge features. Complejidad del App Router requiere disciplina. |
| **Vercel** | Hosting, deploy, edge network, preview deployments, analytics. | Deploy desde GitHub automático. CDN global. Edge functions. Preview por branch. Integración nativa con Next.js. | Evita configurar servidor, CI/CD manual, CDN por separado. | Free tier tiene límites de bandwidth y serverless invocations. Monitorear uso. |
| **GitHub** | Repositorio de código, versionamiento, control de cambios. | Estándar de la industria. Integración directa con Vercel. Pull requests, branches, historial. | Evita código sin versionar, deploys manuales sin revisión. | Ninguno relevante para este proyecto. |
| **Supabase** | Base de datos PostgreSQL. Almacenamiento de leads. RLS. | PostgreSQL real (no NoSQL). API auto-generada. RLS nativo. Dashboard para ver datos. Free tier generoso. | Evita Firebase (NoSQL, vendor lock-in), bases de datos sin RLS, y montar PostgreSQL manual. | Free tier: 500MB DB, 1GB storage, 2 millones de requests/mes. Suficiente para esta fase. |
| **Cloudflare** | DNS, proxy, WAF, DDoS protection, caching, Turnstile, bot protection, SSL/TLS. | Primera línea de defensa. DNS más rápido del mercado. WAF gratuito. Turnstile gratuito y privacy-friendly. | Evita DNS lento, sin WAF, sin protección DDoS, CAPTCHA invasivo (reCAPTCHA). | Compatibilidad Vercel-Cloudflare requiere configuración correcta (proxy mode vs DNS-only). |

### Cómo se integran

```
USUARIO
  │
  ▼
CLOUDFLARE (DNS + proxy + WAF + Turnstile + cache)
  │
  ▼
VERCEL (hosting + edge + SSG/SSR + Server Actions)
  │
  ├── Next.js App (frontend + backend)
  │     ├── Páginas estáticas (SSG)
  │     ├── Server Actions (formularios)
  │     └── API Routes (si se necesitan)
  │
  └── SUPABASE (PostgreSQL)
        ├── Tabla leads
        ├── RLS (Row Level Security)
        └── Edge Functions (email, si se usa)
```

**Flujo de un lead:**
1. Usuario llena formulario en Next.js
2. Cloudflare Turnstile valida que no es bot
3. Server Action valida, sanitiza y procesa
4. Datos se guardan en Supabase (tabla `leads`)
5. Se dispara email de notificación a DM2
6. Se hace redirect a `/obrigado` con evento de conversión
7. GA4 y Meta Pixel registran la conversión

---

## 3. ARQUITECTURA GENERAL DEL PROYECTO

### Capas del sistema

| Capa | Responsabilidad | Tecnología |
|---|---|---|
| **Presentación** | UI, componentes, layouts, páginas | Next.js App Router + React + Tailwind CSS |
| **Contenido** | Textos, datos de servicios, blog, FAQs | Archivos MDX + TypeScript content modules |
| **Lógica de servidor** | Formularios, validación, envío de email | Next.js Server Actions + API Routes |
| **Datos** | Leads, metadata de conversión | Supabase PostgreSQL |
| **SEO** | Metadata, schema, sitemap, robots, llms.txt | Next.js Metadata API + archivos estáticos |
| **Tracking** | Eventos, conversiones, UTMs | GA4 + Meta Pixel + lógica custom |
| **Seguridad** | Headers, WAF, anti-bot, validación | Cloudflare + Next.js middleware + Supabase RLS |
| **Assets** | Imágenes, fuentes, íconos, logo | next/image + font optimization + SVGs |

---

## 4. ESTRUCTURA DE REPOSITORIO

```
dm2-contabilidade/
├── .env.local                          # Variables de entorno (local, no se commitea)
├── .env.example                        # Template de variables (sí se commitea)
├── next.config.ts                      # Configuración de Next.js
├── tailwind.config.ts                  # Configuración de Tailwind
├── tsconfig.json                       # TypeScript strict
├── package.json
│
├── public/
│   ├── favicon.ico
│   ├── robots.txt                      # Generado o estático
│   ├── sitemap.xml                     # Generado por Next.js
│   ├── llms.txt                        # GEO / AI-readiness
│   ├── images/
│   │   ├── logo/                       # Variantes del logo DM2
│   │   ├── og/                         # Open Graph images por página
│   │   └── photos/                     # Fotografías del sitio (Envato)
│   └── fonts/                          # Subsets de fuentes (si self-hosted)
│
├── src/
│   ├── app/                            # App Router (páginas y layouts)
│   │   ├── layout.tsx                  # Root layout (header, footer, fonts, analytics)
│   │   ├── page.tsx                    # Home
│   │   ├── not-found.tsx               # 404
│   │   │
│   │   ├── quem-somos/
│   │   │   └── page.tsx
│   │   │
│   │   ├── servicos/
│   │   │   ├── page.tsx                # Índice de servicios
│   │   │   └── [slug]/
│   │   │       └── page.tsx            # Página individual de servicio
│   │   │
│   │   ├── para/
│   │   │   └── [slug]/
│   │   │       └── page.tsx            # Página individual de nicho
│   │   │
│   │   ├── blog/
│   │   │   ├── page.tsx                # Índice del blog
│   │   │   ├── categoria/
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx        # Índice por categoría
│   │   │   └── [slug]/
│   │   │       └── page.tsx            # Artículo individual
│   │   │
│   │   ├── contato/
│   │   │   └── page.tsx
│   │   │
│   │   ├── obrigado/
│   │   │   └── page.tsx
│   │   │
│   │   ├── privacidade/
│   │   │   └── page.tsx
│   │   │
│   │   ├── termos/
│   │   │   └── page.tsx
│   │   │
│   │   └── api/                        # API Routes (si se necesitan)
│   │       └── contact/
│   │           └── route.ts            # Endpoint de formulario (alternativa a Server Action)
│   │
│   ├── components/                     # Componentes reutilizables
│   │   ├── ui/                         # Primitivos: Button, Input, Badge, Card, etc.
│   │   ├── layout/                     # Header, Footer, Breadcrumbs, Navigation
│   │   ├── sections/                   # Secciones de página: Hero, ServiceBlock, FAQ, CTA, etc.
│   │   ├── forms/                      # ContactForm, LeadForm, etc.
│   │   ├── blog/                       # BlogCard, ArticleLayout, TOC, AuthorBio
│   │   └── seo/                        # SchemaMarkup, BreadcrumbSchema, etc.
│   │
│   ├── content/                        # Contenido estructurado
│   │   ├── services/                   # Datos de cada servicio (TS o MDX)
│   │   ├── niches/                     # Datos de cada nicho
│   │   ├── blog/                       # Artículos del blog (MDX)
│   │   ├── faqs/                       # FAQs por contexto
│   │   └── site.ts                     # Datos globales: NAP, horarios, redes, etc.
│   │
│   ├── lib/                            # Utilidades y lógica compartida
│   │   ├── supabase.ts                 # Cliente Supabase
│   │   ├── analytics.ts                # Helpers de tracking (GA4, Meta)
│   │   ├── utm.ts                      # Captura y persistencia de UTMs
│   │   ├── email.ts                    # Lógica de envío de email
│   │   ├── validation.ts               # Schemas de validación (Zod)
│   │   ├── sanitize.ts                 # Sanitización de inputs
│   │   └── constants.ts                # Constantes del proyecto
│   │
│   ├── styles/                         # Estilos globales
│   │   └── globals.css                 # Tailwind base + custom tokens
│   │
│   └── types/                          # TypeScript types
│       ├── lead.ts                     # Type de lead
│       ├── service.ts                  # Type de servicio
│       ├── blog.ts                     # Type de blog post
│       └── index.ts                    # Re-exports
│
└── docs/                               # Documentación del proyecto
    ├── MASTER-PLAN-DM2-REBUILD.md
    ├── SITEMAP-SEO-GEO-ARCHITECTURE-DM2.md
    ├── DESIGN-SYSTEM-UX-SYSTEM-DM2.md
    ├── COPY-SYSTEM-CONTENT-ARCHITECTURE-DM2.md
    └── TECHNICAL-ARCHITECTURE-DATA-SECURITY-TRACKING-DM2.md
```

### Criterios de organización

- **`app/`** — Solo routing y páginas. Lógica mínima. Las páginas importan componentes y contenido.
- **`components/`** — Dividido por función (ui, layout, sections, forms, blog, seo). Cada componente en su archivo.
- **`content/`** — Todo el contenido del sitio vive aquí. Separado del código. Modificable sin tocar componentes.
- **`lib/`** — Lógica reutilizable. Sin dependencia de React. Funciones puras donde sea posible.
- **`types/`** — TypeScript types compartidos. Un archivo por dominio.
- **`public/`** — Assets estáticos. Imágenes optimizadas. Archivos SEO.
- **`docs/`** — Los documentos rectores del proyecto, accesibles dentro del repo.

---

## 5. ESTRATEGIA DE CONTENIDO TÉCNICO

### Decisión: Contenido híbrido (TypeScript content modules + MDX para blog)

| Tipo de contenido | Formato | Justificación |
|---|---|---|
| **Datos globales del sitio** (NAP, horarios, redes) | TypeScript (`site.ts`) | Tipado fuerte. Se usa en múltiples componentes. Cambio infrecuente. |
| **Servicios** (título, descripción, FAQ, metadata) | TypeScript (`services/`) | Estructura predecible. 8 servicios. Tipado. Se renderizan con un template. |
| **Nichos** (título, contexto, servicios relacionados) | TypeScript (`niches/`) | Misma lógica que servicios. 5 nichos. Estructura predecible. |
| **FAQs** | TypeScript (dentro de servicios/nichos) o archivos separados | Asociadas a su contexto. Tipadas para generar schema automáticamente. |
| **Blog posts** | **MDX** | Contenido largo con formato rico. MDX permite componentes dentro de Markdown. Fácil de escribir y mantener. |
| **Páginas institucionales** (Home, Quem Somos) | Directo en componentes + strings extraídas | Contenido único. No se repite. No se genera dinámicamente. |
| **Legales** (Privacidade, Termos) | MDX o Markdown simple | Texto largo, formato básico, sin componentes. |

### Por qué NO un CMS

- **El sitio tiene ~25 páginas fijas.** No hay cientos de páginas generadas dinámicamente.
- **El equipo que edita es técnico.** Cambios de contenido se hacen en archivos, se commitean en GitHub, se despliegan en Vercel.
- **Un CMS agrega complejidad sin valor.** API calls, latencia, dependencia de un servicio externo, problemas de cache.
- **El blog tiene cadencia baja.** 2-4 artículos por mes no justifica un CMS.
- **MDX es suficiente.** Markdown con componentes React embebidos. Formato legible, versionable, sin vendor lock-in.

### Estructura de un servicio (ejemplo)

```typescript
// src/content/services/planejamento-tributario.ts
export const planejamentoTributario: Service = {
  slug: 'planejamento-tributario',
  title: 'Planejamento Tributário',
  metaTitle: 'Planejamento Tributário em São Paulo | DM2 Contabilidade',
  metaDescription: 'Análise e escolha do regime fiscal mais adequado...',
  h1: 'Planejamento Tributário em São Paulo',
  intro: '...',
  sections: { contexto: '...', problema: '...', solucao: '...', diferencial: '...' },
  processo: ['Análise da situação atual', 'Simulação de regimes', ...],
  faqs: [
    { question: 'Qual a diferença entre Simples Nacional e Lucro Presumido?', answer: '...' },
    ...
  ],
  relatedServices: ['contabilidade-empresarial', 'consultoria-fiscal'],
  relatedNiches: ['advogados', 'medicos'],
  relatedPosts: [], // se llena después
  schema: { type: 'Service', serviceType: 'Planejamento Tributário' },
  priority: 'maxima',
};
```

### Estructura de un blog post (MDX)

```
---
title: "Simples Nacional ou Lucro Presumido: qual escolher em 2026"
slug: "simples-nacional-ou-lucro-presumido-2026"
category: "tributario"
author: "Nome do Autor"
authorRole: "Contador — CRC-SP nº XXXXX"
publishedAt: "2026-04-15"
updatedAt: "2026-04-15"
readingTime: 8
metaTitle: "Simples Nacional ou Lucro Presumido em 2026 | DM2 Blog"
metaDescription: "Compare os dois regimes tributários..."
relatedServices: ["planejamento-tributario"]
relatedNiches: ["prestadores-de-servico"]
---

Contenido en MDX aquí...
```

---

## 6. SUPABASE — PAPEL EN EL PROYECTO

### Uso exacto de Supabase

| Función | Uso | Justificación |
|---|---|---|
| **Base de datos de leads** | SÍ — tabla `leads` | Único uso primario. PostgreSQL para datos estructurados. |
| **Tabla de tracking auxiliar** | NO en esta fase | GA4 y Meta Pixel cubren el tracking. No duplicar datos en Supabase. |
| **Logs de formulario** | SÍ — columnas de metadata en `leads` | El propio registro del lead incluye metadata de origen (UTM, referrer, etc.). No se necesita tabla de logs separada. |
| **Autenticación** | NO en esta fase | No hay área de clientes. No hay login. No hay dashboard. Si se agrega en el futuro (portal de clientes, software propio), se activa Auth. |
| **Storage** | NO en esta fase | Las imágenes son estáticas en `public/`. No hay uploads de usuarios. |
| **Edge Functions** | EVALUAR para email | Si Supabase Edge Functions se usan para disparar email, conviene. Si no, el email se dispara desde Server Actions de Next.js. |
| **Realtime** | NO | No hay funcionalidad en tiempo real. |

### Row Level Security (RLS)

**SÍ, habilitado.** Aunque no hay Auth en esta fase, RLS se configura desde el inicio por principio de defensa en profundidad.

```sql
-- Política: solo INSERT desde la API (anon key)
-- No se puede SELECT, UPDATE ni DELETE con la anon key
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert" ON leads
  FOR INSERT TO anon
  WITH CHECK (true);

-- No hay policy de SELECT para anon = no se puede leer leads desde el frontend
-- Los leads se ven solo desde el dashboard de Supabase o con service_role key
```

**Resultado:** El frontend solo puede INSERTAR leads. No puede leerlos, modificarlos ni eliminarlos. Los leads se administran desde el dashboard de Supabase.

### Acceso desde Next.js

- **Anon key** en el frontend/Server Actions para INSERT de leads.
- **Service role key** NUNCA expuesta al frontend. Solo en funciones de servidor si se necesita leer leads programáticamente.
- Cliente Supabase inicializado en `src/lib/supabase.ts` con la anon key.

---

## 7. ARQUITECTURA DE FORMULARIOS

### Flujo completo

```
USUARIO llena formulario
  │
  ▼
[1] VALIDACIÓN CLIENT-SIDE (Zod + React Hook Form)
  │  Feedback inmediato: campos vacíos, formato incorrecto
  │
  ▼
[2] CLOUDFLARE TURNSTILE (verificación invisible de bot)
  │  Token generado en el cliente
  │
  ▼
[3] SERVER ACTION (Next.js)
  │  ├── Verifica token de Turnstile con API de Cloudflare
  │  ├── Verifica honeypot (campo oculto vacío)
  │  ├── Rate limiting por IP (max 3 envíos / 15 min)
  │  ├── VALIDACIÓN SERVER-SIDE (Zod, misma schema que client)
  │  ├── SANITIZACIÓN (strip HTML, trim, normalizar teléfono)
  │  ├── Captura metadata: UTM, referrer, user-agent, IP hash, página de origen
  │  │
  │  ▼
  │  [4] INSERT en Supabase (tabla leads)
  │  │
  │  ▼
  │  [5] DISPARO de email de notificación a DM2
  │  │
  │  ▼
  │  [6] RETORNO: success → redirect a /obrigado
  │        o error → mensaje de error específico
  │
  ▼
[7] TRACKING: evento form_submit en GA4 + Meta Pixel
    (disparado en /obrigado o en el callback de éxito)
```

### Validación client-side

- **Librería:** Zod para schema de validación + React Hook Form para UX.
- **Feedback:** Inline, debajo de cada campo. Aparece al salir del campo (on blur) y al intentar enviar.
- **Campos validados:** nombre (min 2 chars), email (formato válido), teléfono (formato brasileño: 10-11 dígitos con DDD).

### Validación server-side

- **Misma Zod schema** que client-side. La validación del servidor es la verdad.
- **El servidor nunca confía en el cliente.** Aunque el client valide, el server re-valida todo.
- **Campos sanitizados:** strip de HTML/scripts, trim de espacios, normalización de teléfono (remover caracteres no numéricos).

### Protección anti-spam (capas)

| Capa | Mecanismo | Visibilidad |
|---|---|---|
| 1 | **Cloudflare Turnstile** | Invisible para el usuario (widget managed mode) |
| 2 | **Honeypot field** | Campo oculto con CSS. Si se llena, es bot. |
| 3 | **Rate limiting** | Máximo 3 envíos por IP cada 15 minutos. Implementado en Server Action. |
| 4 | **Validación de formato** | Campos que un bot rellenaría mal (teléfono brasileño, email real). |

### Mensajes de éxito/error

| Situación | Acción |
|---|---|
| Éxito | Redirect a `/obrigado`. Evento de conversión disparado. |
| Error de validación | Mensaje inline por campo. No redirect. |
| Error de Turnstile | "Não foi possível verificar. Tente novamente." |
| Error de rate limit | "Você já enviou uma mensagem recentemente. Tente novamente em alguns minutos." |
| Error de servidor | "Algo deu errado. Tente novamente ou ligue para (11) 2749-7332." |

### Captura de metadata

Con cada lead se captura automáticamente:

| Dato | Fuente |
|---|---|
| `origem_pagina` | `window.location.pathname` al cargar el formulario |
| `referrer` | `document.referrer` (primera visita de la sesión) |
| `utm_source/medium/campaign/content/term` | Query params de la URL, persistidos en sessionStorage |
| `user_agent` | Header `User-Agent` del request (en Server Action) |
| `ip_hash` | SHA-256 del IP del request (LGPD: no almacenar IP raw) |

---

## 8. TABLA DE LEADS

### Definición final

```sql
CREATE TABLE leads (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at      TIMESTAMPTZ DEFAULT now() NOT NULL,

  -- Datos del lead
  nome            TEXT NOT NULL CHECK (char_length(nome) >= 2),
  email           TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  telefone        TEXT NOT NULL CHECK (char_length(telefone) >= 10),
  empresa         TEXT,
  servico_interesse TEXT,
  mensagem        TEXT,

  -- Metadata de origen
  origem_pagina   TEXT,
  referrer        TEXT,
  utm_source      TEXT,
  utm_medium      TEXT,
  utm_campaign    TEXT,
  utm_content     TEXT,
  utm_term        TEXT,
  user_agent      TEXT,
  ip_hash         TEXT,

  -- Estado del lead
  status          TEXT DEFAULT 'novo' CHECK (status IN ('novo', 'contactado', 'qualificado', 'descartado', 'convertido')),
  notas           TEXT,
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- Índices
CREATE INDEX idx_leads_created_at ON leads (created_at DESC);
CREATE INDEX idx_leads_status ON leads (status);
CREATE INDEX idx_leads_email ON leads (email);

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
```

### Campos explicados

| Campo | Tipo | Propósito |
|---|---|---|
| `id` | UUID | Identificador único. Auto-generado. |
| `created_at` | TIMESTAMPTZ | Momento exacto del envío. Con timezone. |
| `nome` | TEXT NOT NULL | Nombre del lead. Min 2 caracteres. |
| `email` | TEXT NOT NULL | Email validado con regex básica. Validación completa en Zod. |
| `telefone` | TEXT NOT NULL | Teléfono con DDD. Min 10 dígitos. |
| `empresa` | TEXT nullable | Nombre de la empresa. Opcional. |
| `servico_interesse` | TEXT nullable | Servicio seleccionado en el formulario. Valores controlados en el frontend. |
| `mensagem` | TEXT nullable | Mensaje libre. Opcional. |
| `origem_pagina` | TEXT | Path de la página donde se envió el formulario. |
| `referrer` | TEXT | Referrer HTTP de la sesión. |
| `utm_*` | TEXT | Parámetros UTM capturados de la URL. |
| `user_agent` | TEXT | User-Agent del navegador. Útil para detectar patrones de spam. |
| `ip_hash` | TEXT | SHA-256 del IP. Para rate limiting y detección de abuso sin violar LGPD. |
| `status` | TEXT | Estado del lead en el funnel: novo → contactado → qualificado → convertido / descartado. |
| `notas` | TEXT | Notas internas del equipo de DM2 sobre el lead. |
| `updated_at` | TIMESTAMPTZ | Última modificación. Auto-actualizado por trigger. |

### Mejoras vs la versión del MASTER-PLAN

- Agregado `utm_term` (parámetro UTM estándar que faltaba)
- Agregado `user_agent` (útil para análisis de spam y segmentación)
- Agregado `notas` (permite al equipo de DM2 documentar seguimiento)
- Agregado `updated_at` con trigger automático
- Agregado CHECK constraints en la base de datos (defensa en profundidad)
- Agregados índices para las consultas más comunes
- Renombrado `pagina_origem` → `origem_pagina` (más natural en PT-BR y consistente)
- Status con valores controlados por CHECK constraint

---

## 9. EMAIL TRANSACCIONAL

### Recomendación: API transaccional dedicada

| Opción | Ventajas | Desventajas | Veredicto |
|---|---|---|---|
| **Resend** | API moderna, simple, plantillas en React, 3000 emails/mes gratis. Integración perfecta con Next.js. | Servicio relativamente nuevo. | **RECOMENDADO** |
| **SendGrid** | Robusto, maduro, alto volumen. | Overkill para el volumen de DM2. Setup más complejo. | Alternativa válida |
| **SMTP del dominio** | Control total. | Configuración compleja. Riesgo de blacklisting. Sin templates. Sin métricas. | NO recomendado |
| **Supabase Edge Functions + SMTP** | Todo en un stack. | Agrega complejidad. Debugging difícil. | NO recomendado |
| **Amazon SES** | Muy barato a escala. | Configuración compleja. No vale la pena para <100 emails/mes. | NO para esta fase |

### Arquitectura de email

```
[Server Action recibe lead]
  │
  ├── INSERT en Supabase ✓
  │
  ├── [EMAIL 1: Notificación a DM2]
  │   To: contato@dm2contabilidade.com.br (o email configurado)
  │   From: noreply@dm2contabilidade.com.br (dominio verificado)
  │   Subject: "Novo lead: {nome} — {servico_interesse || 'Contato geral'}"
  │   Body: Datos del lead + origen + UTMs
  │
  └── [EMAIL 2: Confirmación al usuario] (OPCIONAL — evaluar)
      To: {email del lead}
      From: contato@dm2contabilidade.com.br
      Subject: "Recebemos sua mensagem — DM2 Contabilidade"
      Body: "Obrigado pelo contato. Nossa equipe vai retornar em até X horas úteis."
```

### Protección de reputación del dominio

- Verificar dominio (SPF, DKIM, DMARC) en el servicio de email elegido
- No enviar marketing desde el mismo dominio/canal transaccional
- Rate limitar envío de confirmación al usuario (evitar abuso como herramienta de spam)
- El email de confirmación al usuario es OPCIONAL. Evaluar si aporta valor vs riesgo de abuso.

---

## 10. ANTI-BOT Y CAPTCHA

### Recomendación definitiva: 3 capas

**Capa 1: Cloudflare Turnstile (PRINCIPAL)**

| Aspecto | Detalle |
|---|---|
| **Modo** | Managed (invisible cuando puede, widget cuando necesita verificar) |
| **Integración** | Widget en el formulario (frontend) + verificación del token en Server Action (backend) |
| **Costo** | Gratuito |
| **Privacy** | No usa cookies de tracking. Cumple LGPD/GDPR. |
| **Por qué no reCAPTCHA** | reCAPTCHA v3 envía datos a Google (privacy concern). reCAPTCHA v2 es intrusivo (seleccionar imágenes). Turnstile es de Cloudflare (ya lo usamos) y es privacy-friendly. |

**Capa 2: Honeypot field**

| Aspecto | Detalle |
|---|---|
| **Implementación** | Campo oculto con `position: absolute; opacity: 0; pointer-events: none;`. Nombre genérico (ej: `website`). |
| **Lógica** | Si el campo tiene contenido al enviar → es bot → rechazar silenciosamente (no mostrar error). |
| **Costo** | Cero. Implementación trivial. |

**Capa 3: Rate limiting por IP**

| Aspecto | Detalle |
|---|---|
| **Implementación** | En el Server Action. Usar `ip_hash` para identificar. |
| **Límite** | Máximo 3 envíos por IP cada 15 minutos. |
| **Storage** | In-memory (Map) en desarrollo. En producción: evaluar Vercel KV o Redis si es necesario. Para el volumen de DM2, in-memory en la edge function puede ser suficiente. |
| **Respuesta** | HTTP 429 + mensaje amigable. |

### Por qué 3 capas y no solo 1

- Turnstile bloquea bots automatizados.
- Honeypot atrapa bots simples que llenan todo.
- Rate limiting previene abuso humano o bots que pasan Turnstile.
- Ninguna capa es 100% efectiva sola. Las tres juntas cubren >99% de spam.

---

## 11. SEGURIDAD WEB

### Headers de seguridad

Configurados en `next.config.ts` o en middleware de Next.js:

| Header | Valor | Propósito |
|---|---|---|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` | Forzar HTTPS. |
| `X-Content-Type-Options` | `nosniff` | Prevenir MIME type sniffing. |
| `X-Frame-Options` | `DENY` | Prevenir clickjacking. |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Control de referrer en requests. |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Deshabilitar APIs innecesarias. |
| `Content-Security-Policy` | Ver detalle abajo | Prevenir XSS y carga de recursos no autorizados. |
| `X-DNS-Prefetch-Control` | `on` | Permitir DNS prefetch para performance. |

### Content-Security-Policy (CSP)

```
default-src 'self';
script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net https://challenges.cloudflare.com;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data: https://www.google-analytics.com https://www.facebook.com https://maps.googleapis.com;
connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.facebook.com https://*.supabase.co;
frame-src https://challenges.cloudflare.com https://www.google.com;
```

**Nota:** CSP se ajustará durante desarrollo según los servicios exactos que se integren. Empezar restrictivo y abrir solo lo necesario.

### Protección XSS y sanitización

| Medida | Implementación |
|---|---|
| **React escapa por defecto** | JSX escapa HTML automáticamente. No usar `dangerouslySetInnerHTML` excepto para contenido MDX procesado por el compilador. |
| **Sanitización de inputs** | Antes de guardar en Supabase: strip HTML tags, trim whitespace, normalizar teléfono. Usar librería como `dompurify` solo si se permite rich text (no se espera para formularios). |
| **Validación con Zod** | Schema estricta que rechaza datos inesperados. |
| **Prepared statements** | Supabase client usa prepared statements internamente. No hay SQL injection posible via el SDK. |

### Rate limiting

| Nivel | Implementación | Límite |
|---|---|---|
| **Edge (Cloudflare)** | WAF rules. Rate limiting por IP. | 60 requests/minuto por IP a rutas de formulario. |
| **Application (Server Action)** | Lógica custom en el handler. | 3 envíos de formulario / 15 min por IP. |
| **Database (Supabase)** | No necesario si application level funciona. | — |

### Manejo de secrets

| Principio | Implementación |
|---|---|
| Secrets nunca en código | Todas las keys en variables de entorno. |
| `.env.local` no se commitea | En `.gitignore`. Solo existe localmente. |
| `.env.example` sí se commitea | Template sin valores reales. Documentación de qué variables se necesitan. |
| Vercel Environment Variables | Configuradas en el dashboard de Vercel. Encrypted at rest. |
| Supabase anon key | Pública (diseñada para ser expuesta). Protegida por RLS. |
| Supabase service role key | Privada. Solo en variables de entorno del servidor. NUNCA en el frontend. |

### Hardening general

| Medida | Detalle |
|---|---|
| TypeScript strict | `strict: true` en tsconfig. Previene errores de tipo que pueden llevar a bugs de seguridad. |
| Dependencias | `npm audit` en CI. Renovar dependencias regularmente. No instalar packages innecesarios. |
| No exponer errores internos | Mensajes de error genéricos al usuario. Errores detallados solo en logs del servidor. |
| No exponer email en HTML | Email de contacto ofuscado o solo accesible via formulario. |
| Protección de endpoints | Server Actions protegidas por Turnstile token + honeypot + rate limiting. No API endpoints abiertos sin protección. |

### Prácticas con Supabase

- RLS habilitado en todas las tablas
- Anon key: solo INSERT
- Service role key: solo en servidor
- No exponer la URL de Supabase más de lo necesario (ya es pública, pero no abrir endpoints)
- Dashboard de Supabase protegido con 2FA

### Prácticas con Vercel

- Environment variables encriptadas
- Preview deployments no exponen datos de producción (usar variables separadas por environment)
- No habilitar funciones serverless innecesarias
- Logs disponibles en Vercel dashboard para debugging

### Prácticas con Cloudflare

- WAF en modo activo
- Bot Fight Mode habilitado
- Under Attack Mode disponible (no activar por defecto, solo si hay ataque)
- SSL/TLS en modo Full (strict)
- Always Use HTTPS habilitado

---

## 12. CLOUDFLARE

### Papel exacto

| Función | Uso | Configuración |
|---|---|---|
| **DNS** | SÍ | Cloudflare como DNS autoritativo. Registros A/CNAME apuntando a Vercel. |
| **Proxy** | SÍ (con precaución) | Proxy habilitado para WAF y cache. Pero verificar compatibilidad con Vercel edge. |
| **Cache** | SÍ (assets estáticos) | Caching de imágenes, fuentes, CSS, JS. NO cachear HTML dinámico (Vercel maneja eso). |
| **WAF** | SÍ | Reglas administradas de Cloudflare. Protección contra SQLi, XSS, bots. |
| **Turnstile** | SÍ | CAPTCHA invisible para formularios. Ver sección 10. |
| **Bot Protection** | SÍ | Bot Fight Mode habilitado. Super Bot Fight Mode si plan lo permite. |
| **SSL/TLS** | SÍ | Full (strict). Certificado de origen de Cloudflare en Vercel. |
| **Compresión** | SÍ | Brotli habilitado. Cloudflare comprime automáticamente. |
| **DDoS Protection** | SÍ | Incluido gratis. Automático. |
| **Page Rules** | Mínimas | Solo si se necesitan redirects específicos o cache rules custom. |
| **Workers** | NO en esta fase | No se necesitan. Vercel edge functions cubren las necesidades. |
| **R2 Storage** | NO | Imágenes son estáticas en el repo. No hay uploads. |
| **Images** | NO | Las imágenes se optimizan en build time con next/image. |

### Compatibilidad Cloudflare + Vercel

**Punto crítico:** Cuando Cloudflare está en modo proxy (nube naranja) y Vercel está detrás, hay que configurar correctamente:

1. **SSL:** Cloudflare en modo Full (strict). Certificado de origen de Cloudflare instalado en Vercel (Custom Domain settings).
2. **Cache:** Cloudflare NO debe cachear HTML. Configurar Page Rule: `*.dm2contabilidade.com.br/*` → Cache Level: Bypass para HTML. O confiar en los headers de cache-control que Vercel envía.
3. **Headers:** Verificar que los headers de seguridad de Next.js llegan al usuario (Cloudflare no los debe sobreescribir).
4. **Vercel Edge:** Algunas funciones de Vercel Edge pueden no funcionar correctamente detrás de Cloudflare proxy. Testear en staging.

**Alternativa simplificada:** Cloudflare en DNS-only mode (nube gris) para el dominio principal, usando Vercel para todo el hosting y CDN. Activar proxy solo para subdominios o servicios específicos. Turnstile funciona independiente del modo proxy.

### Qué NO complicar de inicio

- No configurar Workers
- No configurar Cloudflare Pages (se usa Vercel)
- No configurar Access/Zero Trust
- No activar Argo (tiene costo)
- No configurar Load Balancing
- No crear Page Rules complejas — empezar con defaults y ajustar solo si hay problemas

---

## 13. TRACKING COMPLETO

### Herramientas de tracking

| Herramienta | Función | Implementación |
|---|---|---|
| **Google Analytics 4** | Tráfico, comportamiento, conversiones, audiencias | Script de gtag.js cargado de forma diferida (no bloquea rendering) |
| **Google Search Console** | SEO: indexación, keywords, errores | Verificación por DNS TXT record (Cloudflare) o meta tag |
| **Meta Pixel** | Remarketing Meta, audiencias, conversiones de anuncios | Script cargado de forma diferida |

### Implementación técnica de analytics

```typescript
// Carga diferida: analytics no bloquea el rendering
// Scripts de GA4 y Meta Pixel se cargan con next/script strategy="afterInteractive"
// Eventos custom se disparan via funciones helpers en src/lib/analytics.ts
```

**Carga de scripts:**
- `next/script` con `strategy="afterInteractive"` para GA4 y Meta Pixel
- No bloquean LCP ni INP
- Se cargan después del primer render
- Consentimiento: si se requiere banner de cookies por LGPD, los scripts se cargan solo después del consentimiento

### Captación de UTMs

```typescript
// En el root layout o en un hook useEffect del layout principal:
// 1. Leer UTMs de la URL (utm_source, utm_medium, utm_campaign, utm_content, utm_term)
// 2. Guardar en sessionStorage (persisten durante la sesión)
// 3. Al enviar formulario, leer de sessionStorage e incluir en el payload
// 4. También capturar document.referrer en la primera carga
```

### Persistencia de origen

| Dato | Almacenamiento | Duración |
|---|---|---|
| UTMs | sessionStorage | Sesión del navegador |
| Referrer | sessionStorage | Sesión del navegador |
| Página de origen (del formulario) | Capturado al montar el formulario | Momento del envío |

### Eventos que NO vale la pena medir

| Evento descartado | Por qué |
|---|---|
| Click en cada link de navegación | Ruido. El page_view ya muestra el flujo. |
| Hover sobre elementos | Inútil para decisiones de negocio. |
| Tiempo exacto en página | GA4 lo mide automáticamente (engagement time). No duplicar. |
| Scroll 25% | Muy prematuro. No indica interés real. |
| Impresión de cada sección | Demasiado granular. Solo aporta ruido. |
| Clicks en footer | Muy bajo valor analítico. |

---

## 14. MATRIZ DE EVENTOS

| Evento | Nombre técnico | Plataforma | Trigger | Propósito | Prioridad | Observaciones |
|---|---|---|---|---|---|---|
| Visualización de página | `page_view` | GA4 | Automático en cada navegación | Tráfico y flujo | ALTA | GA4 enhanced measurement. No requiere código custom. |
| Inicio de formulario | `form_start` | GA4 | Focus en primer campo del formulario | Medir intención de conversión | MEDIA | Solo dispara 1 vez por sesión por formulario. |
| Envío de formulario | `form_submit` | GA4 + Meta Pixel | Redirect exitoso a /obrigado | Conversión principal | MÁXIMA | Evento de conversión primario. Configurar como goal en GA4. Meta: `Lead` event. |
| Click en CTA principal | `cta_click` | GA4 | Click en botones de CTA (primario/secundario) | Medir engagement con CTAs | MEDIA | Incluir parámetro `cta_text` y `cta_location` (hero, footer, servicio). |
| Click en WhatsApp | `whatsapp_click` | GA4 + Meta Pixel | Click en link/botón de WhatsApp | Conversión secundaria | ALTA | Meta: `Contact` event. Incluir `page_location`. |
| Click en teléfono | `phone_click` | GA4 | Click en link `tel:` | Conversión secundaria | ALTA | Solo se puede medir en mobile (click-to-call). |
| Click en email | `email_click` | GA4 | Click en link `mailto:` | Engagement | BAJA | Solo si hay email visible (protegemos email en la mayoría de páginas). |
| Vista de servicio | `service_view` | GA4 | Page view de `/servicos/[slug]` | Análisis de interés por servicio | MEDIA | Automático via page_view con path. Custom event solo si se necesita el slug como parámetro extra. |
| Lectura de artículo | `blog_read` | GA4 | Scroll >75% en artículo de blog | Medir engagement real con contenido | MEDIA | Diferencia entre "visitó" y "leyó". |
| Scroll profundo | `scroll_depth` | GA4 | Scroll al 50%, 75%, 100% | Engagement general | BAJA | GA4 enhanced measurement cubre esto. Solo configurar si se necesita custom. |
| Conversión (thank you) | `conversion` | GA4 + Meta Pixel | Page view de /obrigado | Tracking de conversión end-to-end | MÁXIMA | GA4: marcar como conversión. Meta: `Lead` + `CompleteRegistration`. |
| Vista de nicho | `niche_view` | GA4 | Page view de `/para/[slug]` | Análisis de interés por segmento | BAJA | Automático via page_view. Custom solo si se necesita análisis específico. |

---

## 15. SEO TÉCNICO IMPLEMENTABLE

### Metadata

| Elemento | Implementación |
|---|---|
| **Title** | Next.js Metadata API (`metadata.title` en cada page.tsx). Template: "[Título de página] \| DM2 Contabilidade". |
| **Description** | `metadata.description` en cada page.tsx. Único por página. 150-160 caracteres. |
| **Canonical** | `metadata.alternates.canonical` en cada página. URL absoluta. |
| **Viewport** | Configurado en root layout. `width=device-width, initial-scale=1`. |
| **Language** | `<html lang="pt-BR">` en root layout. |
| **Charset** | `<meta charset="utf-8">` (Next.js lo maneja automáticamente). |

### Open Graph y Twitter Cards

```typescript
// En cada page.tsx via Metadata API
export const metadata: Metadata = {
  openGraph: {
    title: 'Contabilidade Empresarial em São Paulo | DM2',
    description: '...',
    url: 'https://dm2contabilidade.com.br/servicos/contabilidade-empresarial',
    siteName: 'DM2 Contabilidade',
    locale: 'pt_BR',
    type: 'website', // 'article' para blog
    images: [{ url: '/images/og/contabilidade-empresarial.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '...',
    description: '...',
  },
};
```

### Sitemap

- Generado automáticamente por Next.js (`app/sitemap.ts`)
- Incluye todas las páginas públicas con `lastmod`, `changefreq`, `priority`
- Excluye `/obrigado`, páginas con `noindex`
- Se regenera en cada build/deploy
- URL: `https://dm2contabilidade.com.br/sitemap.xml`

### robots.txt

```
# /public/robots.txt
User-agent: *
Allow: /
Disallow: /obrigado
Disallow: /api/

# AI crawlers - PERMITIDOS
User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

Sitemap: https://dm2contabilidade.com.br/sitemap.xml
```

### llms.txt

Archivo estático en `public/llms.txt`. Contenido definido en SITEMAP-ARCHITECTURE sección 10.

### Schema JSON-LD

- Implementado via componentes React en `src/components/seo/`
- Schema inyectado como `<script type="application/ld+json">` en el `<head>`
- Componentes por tipo: `OrganizationSchema`, `LocalBusinessSchema`, `ServiceSchema`, `ArticleSchema`, `BreadcrumbSchema`, `FAQSchema`
- Datos de schema vienen de los content modules (tipados)

### Breadcrumbs

- Componente visual + schema JSON-LD `BreadcrumbList`
- Generados automáticamente según la ruta (path segments)
- Mapping de segments a títulos legibles (ej: `servicos` → "Serviços", `para` → "Especialidades")
- Schema se genera en el mismo componente

### Redirects

- Definidos en `next.config.ts` via `redirects()`
- Mapeo de URLs antiguas del sitio actual a URLs nuevas (301 permanent)
- Se definirán cuando se tenga la lista completa de URLs actuales con tráfico

---

## 16. PERFORMANCE TÉCNICA

### Estrategia de rendering

| Tipo de página | Rendering | Justificación |
|---|---|---|
| Home | **SSG** (Static Site Generation) | Contenido estático. Cambia raramente. Máxima velocidad. |
| Servicios | **SSG** | 8 páginas estáticas. Contenido predefinido. |
| Nichos | **SSG** | 5 páginas estáticas. |
| Quem Somos | **SSG** | Contenido estático. |
| Contato | **SSG** (formulario es client-side) | Página estática. El formulario se hidrata en el cliente. |
| Blog índice | **SSG** con revalidación (ISR) | Se regenera cuando hay nuevo artículo. `revalidate: 3600` (1 hora). |
| Blog artículo | **SSG** | Cada artículo es estático. Se genera en build time desde MDX. |
| Obrigado | **SSG** | Estático. |
| 404 | **SSG** | Estático. |
| Legales | **SSG** | Estático. |

**Resultado:** Todo el sitio es estático (SSG). No hay SSR en producción. Esto garantiza TTFB mínimo y máximo cache.

### Imágenes

| Regla | Implementación |
|---|---|
| Componente | `next/image` para todas las imágenes. Optimización automática. |
| Formato | WebP automático (Next.js lo convierte). AVIF si el navegador lo soporta. |
| Dimensiones | `width` y `height` explícitos siempre. Previene CLS. |
| Lazy loading | Automático para imágenes below the fold (`loading="lazy"`). |
| Priority | `priority={true}` solo para LCP image (hero image). |
| Sizes | `sizes` attribute para responsive images. Evitar cargar imagen grande en viewport pequeño. |
| Compresión | Quality 80 por defecto (next/image). Ajustar por imagen si es necesario. |
| OG images | Pre-generadas, 1200x630px, optimizadas. En `public/images/og/`. |

### Fuentes

| Regla | Implementación |
|---|---|
| Carga | `next/font/google` para Outfit, Plus Jakarta Sans, Sora. Self-hosted subset para Playfair Display si es necesario. |
| Display | `font-display: swap` en todas. |
| Subset | `latin-ext` (incluye caracteres PT-BR: ã, ç, é, ê, í, ó, ô, ú). |
| Preload | Next.js preloads automáticamente las fuentes cargadas con `next/font`. |
| Máximo primera carga | 4 archivos de fuente. Outfit Regular/Bold + Plus Jakarta Sans Regular/Medium. |
| Sora y Playfair | Carga diferida. No son críticas para el primer render. |

### Scripts de terceros

| Script | Estrategia de carga | Justificación |
|---|---|---|
| GA4 (gtag.js) | `afterInteractive` | No bloquea primer render. Se carga después de hidratación. |
| Meta Pixel | `afterInteractive` | Idem. |
| Cloudflare Turnstile | `lazyOnload` o carga solo en páginas con formulario | Solo necesario donde hay formulario. No cargar globalmente. |
| Google Maps embed | `lazyOnload` solo en `/contato` | Pesado. Solo se carga en la página de contacto, después del primer render. |

### Cache

| Recurso | Cache-Control | Nota |
|---|---|---|
| Páginas HTML (SSG) | `s-maxage=31536000, stale-while-revalidate` | Vercel maneja esto automáticamente para páginas estáticas. |
| Assets estáticos (JS, CSS) | `immutable, max-age=31536000` | Next.js genera hashes en filenames. Cache agresivo. |
| Imágenes optimizadas | `max-age=31536000` | Servidas desde `/_next/image/` con hash. |
| Fuentes | `max-age=31536000, immutable` | Next.js self-hosted fonts con hash. |
| API routes / Server Actions | `no-cache, no-store` | Dinámicos. Sin cache. |

### Cloudflare + Vercel cache

- Cloudflare NO debe cachear HTML dinámico. Vercel controla el cache de páginas.
- Cloudflare SÍ puede cachear assets estáticos (JS, CSS, imágenes en `/public/`).
- Configurar Cloudflare Page Rule si hay conflictos: `dm2contabilidade.com.br/*` → Cache Level: Standard (respeta headers del origin).

### Targets de performance (recordatorio)

| Métrica | Target |
|---|---|
| LCP | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |
| PageSpeed Mobile | 90+ |
| TTFB | < 800ms |
| Page weight | < 500KB (ideal < 300KB) |

---

## 17. BLOG — ARQUITECTURA TÉCNICA

### Estructura de contenido

```
src/content/blog/
├── simples-nacional-ou-lucro-presumido-2026.mdx
├── como-abrir-empresa-sao-paulo.mdx
├── mei-limites-faturamento-2026.mdx
└── ...
```

Cada archivo MDX tiene frontmatter tipado y contenido en Markdown con componentes React opcionales.

### Compilación de MDX

| Opción | Decisión |
|---|---|
| **@next/mdx** | Opción nativa de Next.js. Sencilla pero limitada. |
| **contentlayer** | Descontinuado. No usar. |
| **next-mdx-remote** | Flexible. Permite cargar MDX desde archivos en runtime. |
| **Velite o similar** | Content SDK moderno. Tipado fuerte. |
| **Recomendación** | **next-mdx-remote** con `compileMDX` en Server Components. Probado, flexible, y funciona bien con App Router. Alternativa: evaluar Velite si está maduro al momento de implementar. |

### Categorías

- Las categorías se definen como constantes en TypeScript (`src/content/blog/categories.ts`)
- Cada artículo referencia su categoría por slug en el frontmatter
- Las páginas de categoría (`/blog/categoria/[slug]`) filtran artículos por categoría
- No se necesita base de datos para categorías: son 6 y son estáticas

### Autor y revisor

```typescript
// src/content/blog/authors.ts
export const authors = {
  'nome-do-autor': {
    name: 'Nome do Autor',
    role: 'Contador — CRC-SP nº XXXXX',
    bio: 'Breve bio...',
    avatar: '/images/team/nome.jpg', // cuando esté disponible
  },
};
```

- Cada artículo referencia al autor por slug
- Si hay revisor, se agrega campo `reviewer` en frontmatter
- Los datos de autor se usan para schema `Person` y para el bloque visual de autoría

### Tabla de contenidos (TOC)

- Generada automáticamente a partir de los headings H2/H3 del MDX
- Componente `<TableOfContents>` que parsea headings del contenido compilado
- Sticky sidebar en desktop para artículos largos (>2000 palabras)
- Colapsable en mobile

### Contenido relacionado

- Campo `relatedPosts` en frontmatter: array de slugs
- Si no se especifica, se puede inferir por categoría (artículos de la misma categoría)
- Mostrar máximo 3 artículos relacionados al final

### Performance del blog

- Todos los artículos son SSG (generados en build time)
- Imágenes de portada optimizadas con next/image
- Code splitting: solo cargar componentes MDX que se usan
- Sin JavaScript innecesario: los artículos son principalmente texto renderizado estáticamente

---

## 18. VARIABLES DE ENTORNO Y SECRETOS

### Variables de entorno

| Variable | Tipo | Entorno | Descripción |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Pública | Vercel + local | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Pública | Vercel + local | Anon key de Supabase (segura por RLS) |
| `SUPABASE_SERVICE_ROLE_KEY` | **PRIVADA** | Solo Vercel (server) | Service role key. NUNCA en el frontend. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Pública | Vercel + local | ID de Google Analytics (G-XXXXXXXXXX) |
| `NEXT_PUBLIC_META_PIXEL_ID` | Pública | Vercel + local | ID del Meta Pixel |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Pública | Vercel + local | Site key de Cloudflare Turnstile |
| `TURNSTILE_SECRET_KEY` | **PRIVADA** | Solo Vercel (server) | Secret key de Turnstile para verificación server-side |
| `RESEND_API_KEY` | **PRIVADA** | Solo Vercel (server) | API key del servicio de email |
| `CONTACT_EMAIL` | **PRIVADA** | Solo Vercel (server) | Email de DM2 donde llegan notificaciones de leads |
| `NEXT_PUBLIC_SITE_URL` | Pública | Vercel + local | URL base del sitio (para canonical, OG, schema) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Pública | Vercel + local | Número de WhatsApp de DM2 (formato internacional) |

### Reglas de manejo

1. **Variables `NEXT_PUBLIC_*`** son accesibles en el frontend. Solo poner aquí lo que es seguro exponer.
2. **Variables sin prefijo `NEXT_PUBLIC_`** solo están disponibles en el servidor (Server Actions, API Routes). Nunca se filtran al bundle del cliente.
3. **`.env.local`** — valores reales para desarrollo local. En `.gitignore`. Nunca se commitea.
4. **`.env.example`** — template con nombres de variables sin valores. Se commitea. Sirve de documentación.
5. **Vercel** — variables configuradas en el dashboard. Separadas por environment (Production, Preview, Development).
6. **Rotación** — si una key privada se expone accidentalmente, rotarla inmediatamente en el servicio correspondiente.

### `.env.example`

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_META_PIXEL_ID=

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

# Email
RESEND_API_KEY=
CONTACT_EMAIL=

# Site
NEXT_PUBLIC_SITE_URL=https://dm2contabilidade.com.br
NEXT_PUBLIC_WHATSAPP_NUMBER=
```

---

## 19. FASES DE IMPLEMENTACIÓN TÉCNICA

### Fase T1 — Setup del repositorio y bootstrap

| Tarea | Detalle |
|---|---|
| Crear repo en GitHub | Privado. Nombre: `dm2-contabilidade`. |
| Inicializar Next.js 14+ (App Router) | TypeScript strict. Tailwind CSS. ESLint. |
| Conectar Vercel | Deploy automático desde main. Preview por branch. |
| Configurar `.env.example` y `.env.local` | Template de variables. |
| Configurar Tailwind con design tokens | Colores, tipografía, spacing del design system. |
| Instalar dependencias base | Zod, React Hook Form, next-mdx-remote (o Velite), Supabase client. |
| Configurar ESLint + Prettier | Reglas consistentes. |
| Mover documentos rectores a `docs/` | Los 5 documentos congelados dentro del repo. |

### Fase T2 — Layout y componentes base

| Tarea | Detalle |
|---|---|
| Root layout | HTML lang="pt-BR", fonts, analytics scripts. |
| Header | Logo, navegación, dropdowns, CTA, mobile menu, sticky behavior. |
| Footer | 4 columnas, NAP, redes, copyright. |
| Componentes UI base | Button (4 variantes), Input, Textarea, Select, Badge, Card. |
| Breadcrumbs | Componente visual + schema. Auto-generado por ruta. |
| Página 404 | Diseño custom con navegación. |
| Responsive testing | Verificar en todos los breakpoints. |

### Fase T3 — SEO layer

| Tarea | Detalle |
|---|---|
| Metadata API | Template de metadata por tipo de página. |
| Schema components | Organization, LocalBusiness, WebSite, WebPage, Breadcrumb. |
| `robots.txt` | Estático en public. |
| `sitemap.ts` | Generado automáticamente. |
| `llms.txt` | Estático en public. |
| Open Graph images | Crear OG images por página principal. |
| Security headers | En next.config.ts. CSP, HSTS, X-Frame-Options, etc. |

### Fase T4 — Contenido y routing

| Tarea | Detalle |
|---|---|
| Content modules | `site.ts`, `services/`, `niches/`, types. |
| Routing | Todas las rutas definidas en app/. Dynamic routes para servicios, nichos, blog. |
| Home | Implementar con contenido placeholder o cercano al final. |
| Quem Somos | Implementar con contenido disponible. |
| Servicios (índice + individuales) | Template + datos de cada servicio. |
| Nichos (individuales) | Template + datos de cada nicho. |

### Fase T5 — Formularios y leads

| Tarea | Detalle |
|---|---|
| Crear proyecto Supabase | Tabla `leads` con schema definido. RLS configurado. |
| Formulario de contacto | React Hook Form + Zod + Turnstile. |
| Server Action | Validación, sanitización, Turnstile verify, insert, email. |
| Integración email (Resend) | Verificar dominio. Template de notificación. |
| Honeypot | Campo oculto en formulario. |
| Rate limiting | Lógica en Server Action. |
| Página /obrigado | Con tracking de conversión. |
| Página /contato | Formulario + datos + mapa. |
| Testing end-to-end | Enviar lead de prueba y verificar todo el flujo. |

### Fase T6 — Tracking

| Tarea | Detalle |
|---|---|
| GA4 | Script + configuración de conversiones. |
| Meta Pixel | Script + eventos de conversión. |
| UTM capture | Hook/utilidad para capturar y persistir UTMs. |
| Eventos custom | Implementar eventos de la matriz (form_submit, whatsapp_click, etc.). |
| Verificar conversiones | Testing end-to-end de tracking. |
| Search Console | Verificar propiedad. Submit sitemap. |

### Fase T7 — Blog

| Tarea | Detalle |
|---|---|
| MDX setup | Compilador, componentes custom, tipos. |
| Blog index | Página con filtro de categorías. |
| Blog article template | Layout con TOC, autor, FAQ, relacionados. |
| Categorías | Páginas de categoría. |
| Schema para artículos | BlogPosting, Person, BreadcrumbList. |
| Primeros artículos | 3-5 artículos iniciales. |

### Fase T8 — Cloudflare + hardening

| Tarea | Detalle |
|---|---|
| DNS en Cloudflare | Configurar registros. |
| SSL/TLS | Full (strict). |
| WAF | Reglas administradas activadas. |
| Bot Fight Mode | Habilitado. |
| Cache rules | Verificar que no interfiere con Vercel. |
| Auditoría de seguridad | Headers, CSP, formularios, endpoints. |
| Auditoría de performance | PageSpeed, WebPageTest. |
| Legales | Páginas de Privacidade y Termos. |

### Fase T9 — QA y lanzamiento

| Tarea | Detalle |
|---|---|
| Cross-browser testing | Chrome, Firefox, Safari, Edge. |
| Cross-device testing | Mobile, tablet, desktop. |
| Accesibilidad | Lighthouse, axe. |
| Performance final | PageSpeed 90+ mobile y desktop. |
| Schema validation | Google Rich Results Test en todas las páginas. |
| Links rotos | Verificar todos los enlaces internos y externos. |
| Redirects | Mapear URLs antiguas → nuevas (301). |
| DNS switch | Apuntar dominio a Vercel/Cloudflare. |
| Monitoreo post-launch | Search Console, GA4, formularios. |

---

## 20. DECISIONES ABIERTAS DEL DIRECTOR

### Decisiones técnicas

| Decisión | Impacto | Urgencia |
|---|---|---|
| **Dominio confirmado** | ¿Se mantiene `dm2contabilidade.com.br`? Afecta DNS, SSL, schema, canonical, OG. | CRÍTICA |
| **Acceso a Cloudflare actual** | ¿Quién administra el DNS? ¿Hay cuenta existente? | ALTA |
| **Acceso a Google Analytics / Search Console** | ¿Ya existen cuentas? ¿Se crean nuevas? ¿Quién tiene acceso? | ALTA |
| **Meta Pixel** | ¿Ya existe? ¿ID actual? ¿Se crea nuevo? | MEDIA |
| **Google Maps API key** | ¿Se embebe mapa en /contato? Si sí, se necesita API key de Google Maps. Alternativa: embed iframe (gratis pero menos personalizable). | MEDIA |
| **Servicio de email transaccional** | Confirmación de Resend como opción. ¿O hay preferencia por otro servicio? | ALTA |
| **URLs actuales con tráfico** | Lista de URLs del sitio actual que reciben tráfico orgánico. Necesarias para configurar redirects 301. | ALTA (antes de lanzamiento) |

### Decisiones de datos

| Decisión | Impacto | Urgencia |
|---|---|---|
| **Email de DM2 para notificaciones** | ¿A qué dirección llegan los leads? ¿contato@? ¿personal? ¿múltiples? | ALTA |
| **WhatsApp business número** | Número exacto en formato internacional para CTAs y schema. | ALTA |
| **Redes sociales (URLs)** | Para footer y schema `sameAs`. Solo redes activas. | MEDIA |
| **Datos de equipo** | Nombres, cargos, fotos (si hay). Para Quem Somos y autoría de blog. | ALTA |
| **CRC-SP número** | Para footer, schema, señales de autoridad. | ALTA |
| **Datos de credibilidad** | Clientes, retención, años exactos. Para home. | CRÍTICA |
| **Testimonios reales** | ¿Existen? ¿Se pueden usar? Afecta bloque de prueba social. | MEDIA |

### Decisiones de proceso

| Decisión | Impacto | Urgencia |
|---|---|---|
| **¿Quién escribe los artículos del blog?** | Si es el equipo de DM2 → necesitan guías de escritura. Si somos nosotros → necesitamos datos técnicos del contador. | MEDIA |
| **¿Banner de cookies / LGPD?** | ¿Se implementa banner de consentimiento? Afecta cuándo se cargan scripts de analytics. | MEDIA |
| **¿Formulario simplificado en Home?** | Además del formulario de /contato, ¿hay formulario en la home? ¿Solo nombre + teléfono? | MEDIA |
| **Skills exactos de Claude** | Tabla pendiente desde MASTER-PLAN. Necesarios antes de redactar copy. | ALTA |

---

## NOTAS FINALES

1. **Este documento completa la base documental de la Fase 0.** Con los 5 documentos congelados (MASTER-PLAN, SITEMAP-ARCHITECTURE, DESIGN-SYSTEM, COPY-SYSTEM, TECHNICAL-ARCHITECTURE), la Fase 0 está completa.

2. **Todo el sitio es SSG.** No hay server-side rendering en producción. Esto simplifica la arquitectura y maximiza la performance.

3. **La seguridad tiene 3 capas.** Cloudflare (edge), Next.js (application), Supabase (database). Cada capa se defiende independientemente.

4. **El tracking no bloquea el rendering.** Analytics se carga de forma diferida. La velocidad es prioridad sobre el tracking.

5. **Sin over-engineering.** El sitio tiene ~25 páginas y espera <100 leads/mes. La arquitectura es profesional pero proporcionada al volumen. No se necesita Redis, no se necesita Auth, no se necesita Realtime.

6. **Las decisiones abiertas marcadas como CRÍTICA bloquean el desarrollo.** Resolverlas es el primer paso antes de escribir código.

---

*Documento generado como arquitectura técnica congelada para la reconstrucción de DM2 Contabilidade.*  
*Cualquier modificación debe ser documentada con fecha y justificación.*
