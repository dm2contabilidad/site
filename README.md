# DM2 Contabilidade — Sitio Institucional

Sitio institucional premium para DM2 Contabilidade, escritório de contabilidade en São Paulo, Vila Mariana.

## Stack

- **Next.js 14+** (App Router) — Framework frontend + backend
- **TypeScript** — Tipado estricto
- **Tailwind CSS v4** — Estilos con design tokens
- **Vercel** — Hosting, deploy, CDN
- **Supabase** — Base de datos PostgreSQL (leads)
- **Cloudflare** — DNS, WAF, Turnstile, cache
- **Resend** — Email transaccional (notificaciones de leads)

## Desarrollo local

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar variables de entorno
cp .env.example .env.local
# Llenar los valores en .env.local

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir http://localhost:3000
```

## Estructura del proyecto

```
src/
├── app/                  # App Router (páginas y layouts)
├── components/           # Componentes reutilizables
│   ├── ui/               #   Primitivos: Button, Input, Badge, Card
│   ├── layout/           #   Header, Footer, Breadcrumbs, Navigation
│   ├── sections/         #   Secciones: Hero, ServiceBlock, FAQ, CTA
│   ├── forms/            #   ContactForm, LeadForm
│   ├── blog/             #   BlogCard, ArticleLayout, TOC, AuthorBio
│   └── seo/              #   SchemaMarkup, BreadcrumbSchema
├── content/              # Contenido estructurado
│   ├── services/         #   Datos tipados de cada servicio
│   ├── niches/           #   Datos tipados de cada nicho
│   ├── blog/             #   Artículos MDX, categorías, autores
│   └── site.ts           #   Config global: NAP, horarios, redes
├── lib/                  # Utilidades y lógica compartida
│   ├── analytics.ts      #   Helpers de tracking (GA4, Meta)
│   ├── constants.ts      #   Navegación, opciones de formulario
│   ├── metadata.ts       #   Helper de metadata para SEO
│   ├── sanitize.ts       #   Sanitización de inputs
│   ├── supabase.ts       #   Cliente Supabase
│   ├── turnstile.ts      #   Verificación Turnstile server-side
│   ├── utm.ts            #   Captura y persistencia de UTMs
│   └── validation.ts     #   Schemas Zod para formularios
├── styles/
│   └── globals.css       #   Tailwind + design tokens DM2
└── types/                # TypeScript types compartidos
```

## Documentación del proyecto

Los documentos rectores están en `docs/`:

1. **MASTER-PLAN** — Visión, objetivos, principios, roadmap
2. **SITEMAP-SEO-GEO-ARCHITECTURE** — Páginas, slugs, SEO, GEO, schema
3. **DESIGN-SYSTEM-UX-SYSTEM** — Visual, tipografía, colores, UX
4. **COPY-SYSTEM-CONTENT-ARCHITECTURE** — Voz, tono, copy, pilares
5. **TECHNICAL-ARCHITECTURE** — Stack, datos, seguridad, tracking

## Scripts

```bash
npm run dev      # Desarrollo local
npm run build    # Build de producción
npm run start    # Servir build de producción
npm run lint     # ESLint
```

## Placeholders

Los datos de negocio pendientes usan el prefijo `TODO_DM2_` o `PLACEHOLDER_`.
