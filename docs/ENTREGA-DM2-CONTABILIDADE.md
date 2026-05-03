<!--
  NOTA INTERNA (no visible no .docx exportado, no GitHub render, etc.).

  Este documento foi escrito em português brasileiro porque é o
  documento de entrega final destinado ao cliente DM2 Contabilidade
  (Brasil). Não é documentação técnica interna — é a peça que vai
  para a mão do cliente.

  Se for editar conteúdo ou regenerar o .docx, mantenha o português:
    pandoc docs/ENTREGA-DM2-CONTABILIDADE.md \
      -o docs/ENTREGA-DM2-CONTABILIDADE.docx \
      --from=gfm --to=docx --standalone
-->

# Entrega — Site DM2 Contabilidade

Documento de entrega do site institucional reconstruído para a DM2
Contabilidade.

| Item | Valor |
|---|---|
| Cliente | DM2 Contabilidade |
| Domínio canônico | https://dm2contabilidade.com.br |
| Deploy atual (provisório) | https://site-tau-gray-68.vercel.app |
| Repositório | https://github.com/dm2contabilidad/site |
| Backend | Supabase (projeto `zyisowurfrutywmkhiki`) |
| Hospedagem | Vercel |
| Data desta entrega | 03 de maio de 2026 |

---

## 1. Resumo do projeto

### O que é

Site institucional de um escritório de contabilidade fundado em 2003,
na Vila Mariana, em São Paulo. Substitui a versão anterior por uma
arquitetura moderna, otimizada para SEO local, citabilidade por
mecanismos generativos (ChatGPT, Claude, Perplexity, Google AI
Overviews) e captação de leads qualificados.

### Objetivo

- Posicionar a DM2 em buscas por "contabilidade em São Paulo" e
  variações específicas (advogados, profissionais da saúde, negócios
  digitais).
- Ser citado por IAs quando alguém pergunta "qual contador em São Paulo
  para advogados / médicos / negócio digital".
- Captar leads qualificados com atribuição completa (UTMs, click-IDs,
  landing-page) e notificação imediata por e-mail ao time comercial.
- Permitir publicação editorial autônoma do blog a partir de um painel
  próprio, sem depender do time técnico para cada post.

### Escopo

- 12 páginas públicas (institucional + serviços + especialidades + blog
  + contato + páginas legais).
- Blog com 6 artigos editoriais publicados, sistema de FAQs e serviços
  relacionados, suporte para artigos pillar e evergreen.
- Painel administrativo `/admin/blog` com autenticação HMAC, upload
  real de imagens para o Supabase Storage, dashboard de métricas
  operacionais e fluxo completo de recuperação de senha por e-mail.
- Captação de leads via formulário protegido por Cloudflare Turnstile,
  armazenamento no Supabase com RLS, notificação SMTP para o time.
- Schema markup completo: Organization, AccountingService, Service,
  FAQPage, BreadcrumbList, BlogPosting, Person, ItemList.
- Sitemap.xml dinâmico, robots.txt com allow-list para crawlers de IA,
  llms.txt institucional.

### Páginas principais

| Rota | Propósito |
|---|---|
| `/` | Home institucional |
| `/quem-somos` | História + responsável técnico (Danilo Brito de Morais) |
| `/servicos-contabeis` | Hub dos 4 serviços |
| `/servicos-contabeis/{slug}` | Páginas de serviço (4) |
| `/contabilidade-para-advogados` | Especialidade |
| `/contabilidade-para-profissionais-da-saude` | Especialidade |
| `/contabilidade-para-negocios-digitais` | Especialidade |
| `/blog` | Index do blog com filtros por categoria |
| `/blog/{slug}` | Artigo do blog |
| `/contato` | Formulário + dados de contato |
| `/obrigado` | Confirmação após o envio do formulário |
| `/privacidade`, `/termos` | Páginas legais |

---

## 2. Identidade visual

### Marca

DM2 Contabilidade. Logo em SVG (`public/images/logo/dm2-contabilidade.svg`),
usado tanto na navegação quanto em favicons e ativos institucionais.

### Paleta institucional

Três cores de marca, com escalas Tailwind derivadas:

| Token | Hex | Uso |
|---|---|---|
| `brand-navy` | `#0C152A` | Fundos institucionais escuros, headers, footers |
| `brand-blue` | `#07475D` | H2/H3, botão secundário, links |
| `brand-gold` | `#E0B25B` | CTA principal, plecas, acentos |
| `brand-white` | `#FFFFFF` | Texto sobre navy, fundo neutro |

Uso do dourado: com moderação. Plecas verticais no lugar de bullets,
botões primários "Entrar em contato", sublinhados sutis. **Não** é usado
em fundos extensos nem para destacar texto longo.

### Tipografias

Quatro famílias do Google Fonts carregadas via `next/font/google` com
self-hosting automático:

| Família | Uso | Token |
|---|---|---|
| **Outfit** | Texto base (parágrafos, navegação) | `--font-base` |
| **Plus Jakarta Sans** | Texto de apoio | `--font-aux` |
| **Playfair Display** | Display (H1/H2 grandes, hero) | `--font-display` |
| **Sora** | Microcopy / labels | `--font-label` |

### Lógica visual

- **Hero family**: todas as páginas principais compartilham um padrão
  de hero — imagem full-bleed com overlay navy triplo (35/55/80 %),
  breadcrumb absoluto no topo, conteúdo ancorado embaixo ou
  centralizado, hairline dourada inferior, altura `70-80vh`. Isso cria
  coerência imediata sem parecer template.
- **Cards e cartões**: bordas finas navy 200, sombras suaves, hover
  gold 600 sutil. Sem neumorphism, sem glassmorphism.
- **Plecas verticais douradas**: substituem bullets em listas
  editoriais (ex.: perfil de cliente em `/quem-somos`). Dão peso
  editorial sem pesar.

### Tom geral

Sóbrio, institucional, contábil. **Sem** clichês de SaaS
("revolucionamos", "transformamos"), **sem** cara de IA, **sem** copy
hipster. Voz próxima, técnica quando necessário (Simples Nacional, IBS,
CBS, eSocial), sempre profissional.

### Por que essa direção

A DM2 é um escritório de 22 anos, com carteira de empresas médias que
valorizam continuidade e rigor. A identidade reforça esses atributos:
navy profundo + dourado discreto = solidez + valor sem estridência. A
paleta e a tipografia buscam parecer um escritório profissional sênior,
não uma startup.

---

## 3. Arquitetura do site

### Estrutura de páginas

```
/                                 Home institucional
├── /quem-somos                   História + responsável técnico
│
├── /servicos-contabeis           Hub de serviços
│   ├── /consultoria-contabil
│   ├── /planejamento-tributario
│   ├── /gestao-fiscal-e-tributaria
│   └── /abertura-e-regularizacao-de-empresas
│
├── /contabilidade-para-advogados                      Especialidades
├── /contabilidade-para-profissionais-da-saude         (URLs root-level
└── /contabilidade-para-negocios-digitais              para SEO local)
│
├── /blog                         Listagem paginada do blog
│   └── /blog/[slug]              Artigo individual
│   └── /blog/categoria/[slug]    Filtro por categoria
│
├── /contato                      Formulário + dados NAP
├── /obrigado                     Página pós-envio
│
├── /privacidade                  Política de privacidade
└── /termos                       Termos de uso
```

### Admin

```
/admin/blog                       Listagem e gestão de posts
├── /admin/blog/new               Criar post
├── /admin/blog/[id]              Editar post
├── /admin/blog/login             Acesso (sessão HMAC)
├── /admin/blog/password-reset    Solicitar recuperação
│   └── /confirm?token=…          Definir nova senha
└── /admin/analytics              Dashboard operacional
```

### Decisões arquiteturais

- **URLs de especialidades em root-level**
  (`/contabilidade-para-advogados`) em vez de `/para/advogados`.
  Motivo: melhor sinal de keyword no SEO local. As URLs antigas
  redirecionam permanentemente (301) em `next.config.ts`.
- **Hub de serviços** (`/servicos-contabeis`) intermediário, breadcrumb
  com três níveis. As especialidades NÃO têm hub intermediário
  (breadcrumb de 2 níveis).
- **Blog separado** do marketing, com hero e categorias próprias.

---

## 4. Lógica do conteúdo

### H1 / H2 / H3

Cada H1 inclui **keyword principal + geo** (quando aplicável):

| Página | H1 |
|---|---|
| Home | "Contabilidade estratégica em São Paulo" |
| Hub serviços | "Serviços Contábeis em São Paulo" |
| Serviço | "{Serviço} em São Paulo" |
| Especialidade | "Contabilidade para {nicho} em São Paulo" |
| Blog | "Blog de Contabilidade em São Paulo" |
| Contato | "Fale com a DM2 Contabilidade em São Paulo" |
| Quem Somos | "Escritório de contabilidade em São Paulo desde 2003" |

**Uma única H1 por página** (validado em auditoria). H2/H3 estruturam
seções temáticas, não decoração.

### Lógica SEO

- **Title tags**: cada página define seu próprio title via
  `createMetadata` com sufixo de marca explícito. Padrão: `{Pillar} |
  DM2 Contabilidade em São Paulo`.
- **Meta description**: 140-160 caracteres por página, escrita
  manualmente (não gerada).
- **Canonical**: cada página declara sua URL canônica absoluta sobre o
  domínio `dm2contabilidade.com.br`.
- **Open Graph + Twitter Card**: imagem 1200×630, título, descrição e
  URL em cada página. Fallback para `home-og-sao-paulo.webp`.
- **Sitemap**: gerado dinamicamente em `/sitemap.xml`, inclui todas as
  páginas públicas com `lastmod`, `changefreq`, `priority`.
- **Robots**: bloqueia `/admin/`, `/obrigado`, `/api/`. Permite e
  whitelista explicitamente bots de IA (GPTBot, Google-Extended,
  ClaudeBot, PerplexityBot, OAI-SearchBot).

### Lógica GEO (citabilidade por IA)

- **Intros densas autocontidas** (134-167 palavras) em serviços e
  especialidades, escritas para serem citáveis como passagem completa
  por um assistente generativo. Cada intro contém: definição + a quem
  se aplica + o que inclui + dado concreto + diferencial DM2.
- **FAQs com respostas diretas** e dados numéricos (R$ 81.000 limite
  Simples; alíquotas eSocial; Anexo IV; etc.) — formato ideal para AI
  Overviews e citações no Perplexity.
- **llms.txt** institucional em `/llms.txt`: resumo estruturado do
  escritório para assistentes que o preferem.
- **Schema markup**: `Organization`, `AccountingService` (subtipo mais
  preciso que `LocalBusiness` para uma firma contábil), `Service` por
  serviço, `FAQPage`, `BreadcrumbList`, `Person` (Danilo Brito de
  Morais como responsável técnico), `BlogPosting` por artigo,
  `ItemList` no index do blog.

### Featured posts no home (lógica híbrida)

O home mostra sempre **3 posts**. Lógica:

1. **Prioridade 1**: posts com `featured_on_home = true`, ordenados por
   `featured_order ASC` (menor primeiro) e depois por `published_at
   DESC`.
2. **Prioridade 2**: se sobrar slot, é preenchido com os posts
   publicados mais recentes que ainda não estejam destacados.

→ Resultado: o editor pode fixar 0, 1, 2 ou 3 posts manualmente. O home
nunca fica incompleto.

### FAQs

- Editáveis por post a partir do admin (seção "FAQs" do editor).
- Toggle `faq_enabled` controla se aparecem na página pública.
- Quando ativas, são renderizadas no fim do post e o schema `FAQPage`
  é injetado automaticamente para Rich Results.

### Serviços relacionados

- Cada post pode vincular N serviços
  (`blog_post_related_services`).
- Na página do post são renderizados como cards no fim do corpo.
- Nas páginas de serviço/especialidade, são listados os posts mais
  recentes que mencionam aquele serviço (seção "Conteúdos
  relacionados").

---

## 5. Blog e painel administrativo

### Acesso

- URL: `/admin/blog/login`
- Autenticação: senha única (single-tenant) protegida por hash
  `scrypt` na tabela `admin_users`.
- Sessão: cookie HMAC assinado com `ADMIN_SESSION_SECRET`, válida por
  8 horas.
- Bootstrap inicial: no primeiro acesso com a tabela vazia, o sistema
  usa `ADMIN_BLOG_PASSWORD` e `ADMIN_EMAIL` como semente. Depois disso,
  a senha vive apenas no banco.

### Recuperação de senha

1. No login, clique em "Esqueci minha senha".
2. Clique em "Enviar link de redefinição" → um e-mail é enviado para
   `ADMIN_EMAIL` com um link de uso único, válido por 30 minutos.
3. O destinatário abre o link e define uma nova senha.
4. Sessões anteriores caem na hora (campo `sessions_invalidated_at`).

Se em algum momento o fluxo de e-mail não estiver disponível, há um
fallback de emergência: `node scripts/admin-set-password.mjs` (roda
local, gera SQL para colar no Supabase).

### Criar um post

1. `/admin/blog` → clique em "+ Novo post".
2. Preencha os campos obrigatórios (título, slug, excerto, status,
   autor).
3. Faça upload da imagem de capa (drag ou file picker; sobe para o
   Supabase Storage automaticamente e devolve a URL).
4. Status:
   - `draft`: invisível ao público, sem exigir data.
   - `scheduled`: exige data futura, aparece automaticamente quando a
     hora chega.
   - `published`: visível no ato.
   - `archived`: oculto do público mas preservado.
5. Marque `Featured no home` opcionalmente, com sua `Ordem`.
6. Adicione FAQs e serviços relacionados.
7. Clique em "Criar post" → redireciona para a tela de edição com
   banner verde "Post criado com sucesso".

### Editar um post

1. `/admin/blog` → clique no título do post ou em "Editar".
2. Altere o que for preciso.
3. Clique em "Salvar alterações" → banner verde "Alterações salvas",
   scroll automático para o topo.

### Programar publicação

1. Crie/edite um post com `status = scheduled`.
2. Defina `Data de publicação` com um valor futuro.
3. O post aparece automaticamente em `/blog` quando a data chega — sem
   intervenção manual nem redeploy.

### Subir imagem de capa

- Drag-and-drop ou file picker dentro do formulário.
- Tamanho recomendado: **1600 × 900 px**, proporção **16:9**.
- Formatos aceitos: WebP, JPEG, PNG, AVIF. Até **5 MB**.
- Armazenamento: bucket público `blog-covers` no Supabase Storage.
- A URL pública é preenchida automaticamente no campo
  `cover_image_url`.

### Featured

- Toggle `Mostrar no home` por post.
- Campo `Ordem (menor primeiro)`: se houver 2 destaques, o de ordem 0
  vem primeiro.
- Se você não marcar nenhum, o home se autocompleta com os 3 mais
  recentes.
- Se marcar 1 ou 2, o que faltar é preenchido com os mais recentes.

### FAQs

- Seção "FAQs" do formulário.
- Botão "+ Adicionar FAQ" abre input de pergunta + resposta.
- Botões ↑ ↓ para reordenar; "Remover" para apagar.
- Toggle `Renderizar FAQ no post` (seção "SEO") controla se aparecem e
  se o schema FAQPage é emitido.

### Serviços relacionados

- Seção "Serviços relacionados" do formulário.
- Checklist contra os 4 serviços reais do site. Marque os que se
  aplicam.
- Renderizados como cards no fim do post.

### Dashboard `/admin/analytics`

Leitura rápida do estado operacional. Abas:

**Blog:**
- KPIs: publicados / agendados / rascunhos / arquivados.
- Featured manual (lista atual).
- Próximos a publicar (agendados futuros).
- Últimos publicados (5 mais recentes).

**Leads:**
- Totais e janelas: 24 h / 7 d / 30 d.
- Com `gclid`, com `fbclid`, com UTM, sem origem identificada.
- Sparkline de atividade dos últimos 14 dias.
- Breakdowns: por origem inferida, por `utm_source`, por landing page,
  por status interno.
- Tabela dos 8 leads mais recentes.

**Inferência de origem** (heurística transparente):
1. `utm_source` → `UTM · {valor}`
2. `gclid` → "Google Ads (gclid)"
3. `fbclid` → "Meta Ads (fbclid)"
4. `referrer` hostname (Google orgânico, Bing, ChatGPT, Perplexity,
   Claude, LinkedIn, Meta…)
5. Sem sinal → "Direto"

---

## 6. Formulário e captação de leads

### O que o formulário guarda

Campos do usuário:
- `nome`, `email`, `telefone`, `empresa` (opcional),
  `servico_interesse` (select), `mensagem` (opcional).

Atribuição capturada automaticamente (tudo persistido):
- `origem_pagina` — pathname de onde foi enviado.
- `landing_page` — primeira URL visitada na sessão (first-touch).
- `referrer` — `document.referrer` capturado no primeiro hit.
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`,
  `utm_term` — capturados da URL ao entrar no site, persistidos em
  `sessionStorage`.
- `gclid` — Google Ads click ID.
- `fbclid` — Meta (Facebook) click ID.
- `user_agent`, `ip_hash` (SHA-256 do IP, não o IP cru).

### Fluxo

1. Usuário preenche o formulário em `/contato`.
2. Cloudflare Turnstile valida que não é bot.
3. Server action sanitiza, valida com Zod, insere em `leads` (Supabase).
4. Se SMTP estiver configurado, envia e-mail para `MAIL_TO` com todos
   os campos + seção de atribuição completa.
5. Redireciona para `/obrigado`.

### Notificação SMTP

E-mail institucional sóbrio, lista em HTML com duas seções (dados do
lead + atribuição). O assunto inclui nome e serviço: `Novo lead:
{nome} — {serviço}`.

Se o SMTP não estiver configurado, o lead **é salvo do mesmo jeito**
no Supabase e apenas o e-mail é omitido (sem erro para o usuário).

### Leitura de leads

Hoje: dashboard `/admin/analytics` (read-only). O editor do lead
(alterar `status`, adicionar `notas`) **ainda não está implementado**
— é gerido a partir do dashboard do Supabase. Recomendação: se a
operação exigir, adicionar a aba `/admin/leads` editável em uma
iteração futura.

---

## 7. E-mail / SMTP

### Como está preparado

- Cliente: `nodemailer`, transportador lazy memoizado.
- Mitigação de header injection: `sanitizeHeaderValue` strip CR/LF.
- Escape de HTML conservador no body.
- Tratamento de erros: se o SMTP falhar, log local e o fluxo do
  formulário não quebra.

### Variáveis necessárias

| Variável | Exemplo | Comentário |
|---|---|---|
| `SMTP_HOST` | `smtp.gmail.com` ou `smtp.office365.com` | |
| `SMTP_PORT` | `587` ou `465` | |
| `SMTP_SECURE` | `true` para 465, `false` para 587 | |
| `SMTP_USER` | usuário de autenticação | |
| `SMTP_PASS` | senha (nunca commitar) | |
| `MAIL_FROM` | `"DM2 Contabilidade <noreply@dm2contabilidade.com.br>"` | |
| `MAIL_TO` | `contato@dm2contabilidade.com.br` | Destinatário de notificações |

### Estado atual

- **Código**: completamente implementado e testado em build.
- **Ativação em produção**: depende de carregar as 7 variáveis no
  Vercel. Sem elas, o formulário continua funcionando e salvando
  leads, mas não há notificação por e-mail.

### Fluxo de password reset por e-mail

Reutiliza o mesmo SMTP. Se o SMTP não estiver configurado, o fluxo
web mostra "Se houver uma conta, enviamos um link", mas não há
e-mail real. Por isso convém ativar o SMTP antes da entrega final.

---

## 8. Banco de dados

### Tabelas

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
  password_hash (formato scrypt)
  password_updated_at
  sessions_invalidated_at
  created_at, updated_at

admin_password_resets
  id, user_id (FK CASCADE), token_hash (UNIQUE)
  created_at, expires_at, used_at, ip_hash
```

### Relações

```
authors ─< blog_posts >─ blog_categories
                  │
                  ├─< blog_post_faqs
                  └─< blog_post_related_services

admin_users ─< admin_password_resets

leads (sem FK, tabela independente)
```

### Storage

| Bucket | Visibilidade | Limite | MIMEs aceitos |
|---|---|---|---|
| `blog-covers` | público | 5 MB | image/webp, image/jpeg, image/png, image/avif |

### RLS (Row Level Security)

Todas as tabelas têm RLS habilitado.

- **Públicas (SELECT para anon)**: `authors` (apenas ativos),
  `blog_categories` (apenas ativas), `blog_posts` (visibility =
  published ou scheduled <= now), `blog_post_faqs`,
  `blog_post_related_services` (visibilidade herdada do post).
- **Apenas INSERT por anon**: `leads` (formulário público, sem
  SELECT).
- **Sem acesso anon**: `admin_users`, `admin_password_resets`
  (escrita e leitura apenas via `SUPABASE_SERVICE_ROLE_KEY`).

### Scripts SQL

Todos em `docs/`. Idempotentes — seguro reexecutar:

| Arquivo | Cria |
|---|---|
| `supabase-blog-tables.sql` | authors, blog_categories, blog_posts, FAQs, related |
| `supabase-blog-storage.sql` | bucket `blog-covers` + policies |
| `supabase-blog-seed-posts.sql` | seed inicial dos 6 artigos (opcional) |
| `supabase-leads-table.sql` | tabela leads + RLS + ALTER idempotente |
| `supabase-admin-users.sql` | admin_users + admin_password_resets |

---

## 9. Stack e dependências

### Stack principal

| Peça | Versão | Por quê |
|---|---|---|
| Next.js | 16.x | App Router, RSC, Turbopack, server actions |
| React | 19.x | Concurrent rendering |
| TypeScript | 5.x | Strict mode, tipagem em todo o código |
| Tailwind CSS | 4.x | Tokens `@theme inline`, sem config JS |
| Supabase JS | 2.x | Cliente para Postgres + Storage |
| Nodemailer | 8.x | Envio SMTP (leads + password reset) |
| Zod | 4.x | Validação de inputs em server actions |
| React Hook Form | 7.x | Form de contato controlado |

### Dependências secundárias

- `@hookform/resolvers` — bridge Zod ↔ react-hook-form.
- `@types/nodemailer` — tipos.
- `resend` — **legado**, não é usado. Pendente remover (ver
  recomendações).

### Hospedagem

- **Vercel**: build, edge middleware, runtime serverless. Configura
  env vars pelo dashboard. Cada push para `main` dispara deploy.
- **Supabase**: backend único (Postgres + Storage + RLS). Projeto
  `zyisowurfrutywmkhiki`.
- **Cloudflare Turnstile**: validação de bot no formulário.
- **Google Fonts**: self-hosted via `next/font/google` (sem requests
  externos em runtime).

### Performance de build

- Compilação TypeScript: ~2 s.
- Total `next build`: ~10 s.
- 22 rotas (8 estáticas, 14 dinâmicas server-rendered).

---

## 10. Recomendações futuras

### Ativação pendente para produção

1. **Configurar SMTP no Vercel** (7 variáveis). Sem isso, não há
   notificação de leads nem password reset por e-mail.
2. **Configurar Cloudflare Turnstile no Vercel**
   (`NEXT_PUBLIC_TURNSTILE_SITE_KEY` e `TURNSTILE_SECRET_KEY`). Sem
   isso, o formulário rejeita os envios.
3. **Apontar o domínio**: `dm2contabilidade.com.br` deve apontar para
   o deploy do Vercel (DNS + verificação). Hoje o site está em
   `site-tau-gray-68.vercel.app` provisório.
4. **Confirmar que `NEXT_PUBLIC_SITE_URL` no Vercel = domínio final**
   (não `localhost` nem o preview).

### Nice-to-have a futuro (não bloqueantes)

- **Editor de leads no `/admin`**: hoje é gerido pelo dashboard do
  Supabase. Se o time comercial quiser alterar `status` e adicionar
  `notas` pelo painel, adicionar `/admin/leads`.
- **Remover dependência `resend`**: legado, não usada. Tirar de
  `package.json` reduz 6+ MB do install e elimina ruído.
- **Renomear `middleware.ts` → `proxy.ts`**: o Next 16 deprecou a
  convenção `middleware`. Aviso cosmético, não bloqueante. Renomear
  quando for conveniente.
- **Cache do blog**: hoje `/blog` server-renderiza em ~1-3 s no cold
  start. Se o tráfego crescer, reavaliar caching ISR ou tags.
- **Imagens em posts**: hoje sobe-se a capa. O corpo do artigo é HTML
  livre. Se os editores forem colar imagens inline, avaliar uploader
  inline.
- **Páginas de perfil de autor**: as URLs `/blog/autor/{slug}` não
  existem. Se o time for somar autores e quiser dar página a eles,
  adicionar.

### Manutenção

- **Backups**: o Supabase oferece point-in-time recovery (paid tier).
  Se o plano for free, fazer backups manuais periódicos do schema e
  dos dados críticos (`pg_dump` a partir do dashboard).
- **Rotação de segredos**: a rotação de `ADMIN_SESSION_SECRET` é
  opcional, a cada 6-12 meses. Uma rotação invalida todas as sessões
  admin ativas (intencional).
- **Atualizações de dependências**: Next.js minor a cada ~3 meses,
  Tailwind e Supabase trimestrais. Validar build local antes de
  fazer push.
- **Logs**: o Vercel guarda logs de runtime por 30 dias no plano
  free. Se for preciso mais histórico, conectar a Logtail / Datadog.

---

## Anexo — Variáveis de ambiente

Lista completa das variáveis exigidas pelo site. Server-only, salvo
as que começam com `NEXT_PUBLIC_`.

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY            # crítica — server-only

# Site
NEXT_PUBLIC_SITE_URL                 # https://dm2contabilidade.com.br

# Admin
ADMIN_BLOG_PASSWORD                  # apenas seed inicial
ADMIN_EMAIL                          # contato@dm2contabilidade.com.br
ADMIN_SESSION_SECRET                 # 32+ chars random

# SMTP (formulário + password reset)
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

## Anexo — URLs do admin (referência rápida)

| Ação | URL (substituir o domínio) |
|---|---|
| Login | `/admin/blog/login` |
| Listagem de posts | `/admin/blog` |
| Criar post | `/admin/blog/new` |
| Editar post | `/admin/blog/{id}` |
| Recuperar senha | `/admin/blog/password-reset` |
| Definir nova senha (link do e-mail) | `/admin/blog/password-reset/confirm?token=…` |
| Dashboard de métricas | `/admin/analytics` |

---

## Anexo — Como rodar SQL no Supabase

1. Dashboard do projeto → **SQL Editor** → **New query**.
2. Colar o conteúdo do arquivo `.sql` correspondente.
3. Clicar em **Run**.

Se um script já tiver sido rodado e for tentado de novo, todos os
scripts são idempotentes — usam `IF NOT EXISTS` e `ON CONFLICT DO
NOTHING / DO UPDATE`. É seguro reexecutar.

---

*Documento gerado no fechamento da fase de implementação.*
*Qualquer dúvida técnica posterior pode ser consultada nos arquivos
norteadores em `docs/` (MASTER-PLAN, SITEMAP-SEO-GEO-ARCHITECTURE,
DESIGN-SYSTEM-UX-SYSTEM, COPY-SYSTEM-CONTENT-ARCHITECTURE,
TECHNICAL-ARCHITECTURE-DATA-SECURITY-TRACKING).*
