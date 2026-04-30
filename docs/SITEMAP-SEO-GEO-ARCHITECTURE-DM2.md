# SITEMAP-SEO-GEO-ARCHITECTURE-DM2.md

## Arquitectura SEO, GEO y de Información — DM2 Contabilidade

**Versión:** 1.0  
**Fecha:** 01 de abril de 2026  
**Estado:** CONGELADO — base para diseño, desarrollo y contenido  
**Documento rector:** MASTER-PLAN-DM2-REBUILD.md  
**Idioma del documento:** Español (comunicación interna)  
**Idioma del sitio final:** Portugués de Brasil  
**Ubicación de la empresa:** Rua Vergueiro, 3086 - Conjunto 24, Vila Mariana, São Paulo - SP, 04102-001

---

## 1. OBJETIVO DE ESTA FASE

### Por qué congelar arquitectura antes de diseñar o construir

La arquitectura de información, SEO y GEO es el esqueleto del sitio. Si se construye sin ella, se diseñan páginas bonitas que no posicionan, se escribe copy que no tiene destino claro, y se crean URLs que después hay que redirigir.

Congelar esta capa antes de cualquier línea de código garantiza:

- **Cada página tiene un propósito claro.** No hay páginas "por si acaso".
- **No hay canibalización.** Cada URL ataca una intención de búsqueda distinta.
- **El internal linking es deliberado.** La autoridad se distribuye de forma pensada, no accidental.
- **El contenido se planifica para personas y para IA.** Cada página sabe qué debe comunicar, a quién y cómo ser citada.
- **El desarrollo no improvisa.** El equipo sabe exactamente qué construir, en qué orden y con qué schema.
- **Los slugs son definitivos.** No habrá que redirigir después de lanzar.

Esta fase responde a una sola pregunta: **¿Qué páginas existen, por qué existen, y cómo se relacionan entre sí?**

---

## 2. MAPA MAESTRO DEL SITIO

### Visión general por bloques

```
PÁGINAS CORE
├── /                                    → Home
├── /quem-somos                          → Institucional
├── /servicos                            → Índice de servicios
└── /contato                             → Contacto + formulario principal

PÁGINAS DE SERVIÇO
├── /servicos/contabilidade-empresarial
├── /servicos/planejamento-tributario
├── /servicos/departamento-pessoal
├── /servicos/abertura-de-empresas
├── /servicos/consultoria-fiscal
├── /servicos/bpo-financeiro
├── /servicos/imposto-de-renda
└── /servicos/contabilidade-para-mei

PÁGINAS POR NICHO
├── /para/advogados
├── /para/medicos
├── /para/negocios-digitais
├── /para/empregador-domestico
└── /para/prestadores-de-servico

BLOG
├── /blog                                → Índice principal
├── /blog/categoria/[slug]               → Índice por categoría
└── /blog/[slug]                         → Artículos individuales

CONVERSÃO
├── /contato                             → (también es punto de conversión)
└── /obrigado                            → Post-conversión

PÁGINAS LEGAIS
├── /privacidade                         → Política de privacidad (LGPD)
└── /termos                              → Términos de uso

ARCHIVOS TÉCNICOS (sin navegación visible)
├── /sitemap.xml
├── /robots.txt
├── /llms.txt
└── /favicon.ico + manifesto
```

**Total de páginas en lanzamiento:** ~25-28 (sin contar artículos de blog)

---

## 3. TABLA MAESTRA DE PÁGINAS

### Páginas core

| Página | Slug | Tipo | Objetivo principal | Intención de búsqueda | Prio SEO | Prio conversión | Prio GEO/IA | Schema | Enlaces internos estratégicos | Observaciones |
|---|---|---|---|---|---|---|---|---|---|---|
| Home | `/` | Core | Hub de autoridad y conversión | Navegacional + transaccional | ALTA | ALTA | ALTA | Organization, LocalBusiness (AccountingService), WebSite, WebPage | → servicios principales, nichos, blog destacado, contato | Página de mayor autoridad. Distribuye link equity. |
| Quem Somos | `/quem-somos` | Institucional | Establecer confianza y credibilidad | Informacional / navegacional | MEDIA | MEDIA | ALTA | WebPage, AboutPage | → home, contato, servicios principales | Crítica para E-E-A-T. Debe tener datos concretos: fundación 2003, equipo, trayectoria. |
| Índice de Servicios | `/servicos` | Hub | Distribuir autoridad a páginas de servicio | Informacional | ALTA | MEDIA | MEDIA | WebPage, BreadcrumbList | → cada servicio individual, contato | Hub intermedio. No compite con servicios individuales. |
| Contato | `/contato` | Conversión | Captar leads | Transaccional | MEDIA | MÁXIMA | MEDIA | ContactPage, LocalBusiness | → home, servicios, quem-somos | Formulario principal. Mapa embebido. NAP completo. |

### Páginas de servicio

| Página | Slug | Tipo | Objetivo principal | Intención de búsqueda | Prio SEO | Prio conversión | Prio GEO/IA | Schema | Enlaces internos estratégicos | Observaciones |
|---|---|---|---|---|---|---|---|---|---|---|
| Contabilidade Empresarial | `/servicos/contabilidade-empresarial` | Servicio | Posicionar como servicio core + convertir | Transaccional | MÁXIMA | ALTA | ALTA | Service, WebPage, BreadcrumbList | → planejamento-tributario, abertura-de-empresas, nichos relevantes, contato, blog relacionado | Servicio ancla. Keyword principal del negocio. |
| Planejamento Tributário | `/servicos/planejamento-tributario` | Servicio | Posicionar en keyword de alto valor | Informacional-transaccional | MÁXIMA | ALTA | ALTA | Service, WebPage, BreadcrumbList | → consultoria-fiscal, contabilidade-empresarial, nichos, contato | Keyword con intención mixta. Contenido debe educar y convertir. |
| Departamento Pessoal | `/servicos/departamento-pessoal` | Servicio | Captar empresas que necesitan gestión de nómina | Transaccional | ALTA | ALTA | MEDIA | Service, WebPage, BreadcrumbList | → bpo-financeiro, contabilidade-empresarial, contato | Servicio diferenciador. Mencionar eSocial, FGTS, obrigações acessórias. |
| Abertura de Empresas | `/servicos/abertura-de-empresas` | Servicio | Captar emprendedores que están empezando | Transaccional | MÁXIMA | MÁXIMA | ALTA | Service, WebPage, BreadcrumbList | → contabilidade-para-mei, contabilidade-empresarial, contato | Alta intención de conversión. El lead necesita actuar rápido. |
| Consultoria Fiscal | `/servicos/consultoria-fiscal` | Servicio | Posicionar en consultoría tributaria | Informacional-transaccional | ALTA | ALTA | ALTA | Service, WebPage, BreadcrumbList | → planejamento-tributario, contabilidade-empresarial, contato | Riesgo de canibalización con Planejamento Tributário. Diferenciar enfoque. |
| BPO Financeiro | `/servicos/bpo-financeiro` | Servicio | Captar empresas que tercerizan finanzas | Transaccional | MEDIA | ALTA | MEDIA | Service, WebPage, BreadcrumbList | → departamento-pessoal, contabilidade-empresarial, contato | Servicio más operativo. Keyword con menor volumen pero alta conversión. |
| Imposto de Renda | `/servicos/imposto-de-renda` | Servicio | Captar PF y PJ en temporada de IR | Estacional-transaccional | ALTA | MÁXIMA | ALTA | Service, WebPage, BreadcrumbList | → contabilidade-empresarial, contato, blog de IR | Alta estacionalidad (feb-abr). Contenido citable con plazos y valores. |
| Contabilidade para MEI | `/servicos/contabilidade-para-mei` | Servicio | Captar microempreendedores | Transaccional | ALTA | ALTA | ALTA | Service, WebPage, BreadcrumbList | → abertura-de-empresas, contato, blog MEI | Audiencia masiva. Keyword competida. Diferenciarse con contenido específico. |

### Páginas por nicho

| Página | Slug | Tipo | Objetivo principal | Intención de búsqueda | Prio SEO | Prio conversión | Prio GEO/IA | Schema | Enlaces internos estratégicos | Observaciones |
|---|---|---|---|---|---|---|---|---|---|---|
| Contabilidade para Advogados | `/para/advogados` | Nicho | Captar estudios jurídicos | Transaccional | ALTA | ALTA | ALTA | Service, WebPage, BreadcrumbList | → planejamento-tributario, contabilidade-empresarial, contato | Nicho validado. DM2 ya tiene esta página. Keyword con buen volumen. |
| Contabilidade para Médicos | `/para/medicos` | Nicho | Captar profesionales de salud | Transaccional | ALTA | ALTA | ALTA | Service, WebPage, BreadcrumbList | → planejamento-tributario, imposto-de-renda, contato | Nicho premium. PJ médica tiene tributación específica (Livro Caixa, equiparação hospitalar). |
| Contabilidade para Negócios Digitais | `/para/negocios-digitais` | Nicho | Captar empresas digitales, influencers, e-commerce | Transaccional | ALTA | ALTA | MEDIA | Service, WebPage, BreadcrumbList | → abertura-de-empresas, bpo-financeiro, contato | Nicho en crecimiento. Incluir MEI digital, tributação de infoprodutores. |
| Contabilidade para Empregador Doméstico | `/para/empregador-domestico` | Nicho | Captar personas que tienen empleados domésticos | Informacional-transaccional | MEDIA | MEDIA | MEDIA | Service, WebPage, BreadcrumbList | → departamento-pessoal, contato | Nicho específico. Menor volumen pero baja competencia. eSocial doméstico. |
| Contabilidade para Prestadores de Serviço | `/para/prestadores-de-servico` | Nicho | Captar autónomos y prestadores PJ | Transaccional | ALTA | ALTA | MEDIA | Service, WebPage, BreadcrumbList | → abertura-de-empresas, planejamento-tributario, contabilidade-para-mei, contato | Nicho amplio. Diferenciar de MEI (que tiene página propia). |

### Blog

| Página | Slug | Tipo | Objetivo principal | Intención de búsqueda | Prio SEO | Prio conversión | Prio GEO/IA | Schema | Enlaces internos estratégicos | Observaciones |
|---|---|---|---|---|---|---|---|---|---|---|
| Índice del blog | `/blog` | Hub | Organizar y distribuir contenido | Navegacional | MEDIA | BAJA | BAJA | WebPage, BreadcrumbList | → categorías, artículos destacados | No compite por keywords. Distribuye autoridad. |
| Categoría | `/blog/categoria/[slug]` | Índice | Organizar artículos por tema | Navegacional | BAJA | BAJA | BAJA | WebPage, BreadcrumbList | → artículos de la categoría | Puede tener noindex si no hay volumen de búsqueda suficiente. Evaluar caso a caso. |
| Artículo individual | `/blog/[slug]` | Contenido | Posicionar en long-tail, establecer autoridad, ser citado por IA | Informacional | ALTA | MEDIA | MÁXIMA | Article (BlogPosting), Person (autor), BreadcrumbList | → servicios relacionados, otros artículos, contato | Cada artículo es una oportunidad de citación por IA. |

### Conversión y legales

| Página | Slug | Tipo | Objetivo principal | Intención de búsqueda | Prio SEO | Prio conversión | Prio GEO/IA | Schema | Enlaces internos estratégicos | Observaciones |
|---|---|---|---|---|---|---|---|---|---|---|
| Obrigado | `/obrigado` | Conversión | Confirmar envío + tracking + próximo paso | No aplica | NULA (noindex) | POST-CONVERSIÓN | NULA | WebPage | → home, blog, servicios | noindex, nofollow. Trackear como conversión en GA4. |
| Privacidade | `/privacidade` | Legal | Cumplir LGPD | No aplica | NULA | NULA | NULA | WebPage | → home, contato | Obligatoria. LGPD compliance. Lenguaje claro. |
| Termos | `/termos` | Legal | Protección legal | No aplica | NULA | NULA | NULA | WebPage | → home, contato | Obligatoria. |

---

## 4. SLUGS ESTRATÉGICOS

### Criterios de diseño de slugs

Cada slug fue diseñado siguiendo estos principios:

1. **Claridad:** Que cualquier persona entienda de qué trata la página con solo leer la URL.
2. **SEO natural:** Keyword principal integrada sin forzar.
3. **Brevedad:** Lo más corto posible sin perder significado.
4. **Sin ruido:** Sin stop words innecesarias, sin preposiciones redundantes.
5. **PT-BR correcto:** Sin acentos en URL, pero con ortografía lógica.
6. **Consistencia:** Mismo patrón dentro de cada grupo.

### Slugs definitivos por grupo

**Servicios** — patrón: `/servicos/[servicio]`

| Servicio | Slug | Justificación |
|---|---|---|
| Contabilidade Empresarial | `/servicos/contabilidade-empresarial` | Keyword exacta. Clara y directa. |
| Planejamento Tributário | `/servicos/planejamento-tributario` | Keyword exacta sin acento. |
| Departamento Pessoal | `/servicos/departamento-pessoal` | Keyword exacta. Reconocible inmediatamente. |
| Abertura de Empresas | `/servicos/abertura-de-empresas` | Mantiene la preposición porque es parte del término de búsqueda natural. |
| Consultoria Fiscal | `/servicos/consultoria-fiscal` | Corto y directo. "Fiscal" diferencia de "tributário". |
| BPO Financeiro | `/servicos/bpo-financeiro` | Término del mercado. Quien busca BPO sabe qué es. |
| Imposto de Renda | `/servicos/imposto-de-renda` | Keyword exacta. Término masivo. |
| Contabilidade para MEI | `/servicos/contabilidade-para-mei` | Mantiene "para" porque es el patrón de búsqueda real: "contabilidade para MEI". |

**Nichos** — patrón: `/para/[nicho]`

| Nicho | Slug | Justificación |
|---|---|---|
| Advogados | `/para/advogados` | Corto. Sin "contabilidade-para-" (ya está en la ruta padre `/para/`). |
| Médicos | `/para/medicos` | Idem. Limpio y directo. |
| Negócios Digitais | `/para/negocios-digitais` | Abarca e-commerce, infoprodutores, influencers. |
| Empregador Doméstico | `/para/empregador-domestico` | Término exacto que busca este público. |
| Prestadores de Serviço | `/para/prestadores-de-servico` | Mantiene preposición porque es el término natural. |

**Blog** — patrón: `/blog/[slug-descriptivo]`

Los slugs de artículos se definirán al crear cada post. Regla: keyword principal del artículo, sin stop words innecesarias, máximo 5-6 palabras.

Ejemplos de slugs buenos:
- `/blog/como-abrir-empresa-sao-paulo`
- `/blog/mei-limites-faturamento-2026`
- `/blog/planejamento-tributario-lucro-presumido`
- `/blog/esocial-obrigacoes-empregador-domestico`

Ejemplos de slugs a evitar:
- `/blog/tudo-que-voce-precisa-saber-sobre-como-abrir-uma-empresa` (demasiado largo)
- `/blog/post-1` (sin significado)
- `/blog/artigo-sobre-tributacao` (genérico)

**Categorías de blog** — patrón: `/blog/categoria/[slug]`

| Categoría | Slug |
|---|---|
| Tributário | `/blog/categoria/tributario` |
| Departamento Pessoal | `/blog/categoria/departamento-pessoal` |
| Abertura de Empresas | `/blog/categoria/abertura-de-empresas` |
| MEI e Pequenas Empresas | `/blog/categoria/mei-e-pequenas-empresas` |
| Legislação | `/blog/categoria/legislacao` |
| Gestão Financeira | `/blog/categoria/gestao-financeira` |

---

## 5. ARQUITECTURA DE SERVICIOS

### Principio rector

Cada servicio merece página propia **solo si cumple al menos 2 de estas 3 condiciones:**

1. Tiene volumen de búsqueda propio (la gente busca ese servicio específicamente).
2. Tiene intención de conversión diferenciada (el visitante quiere contratar ese servicio en particular).
3. Tiene contenido suficiente para ser una página sustancial (no es una subsección de 2 párrafos).

### Decisiones tomadas

| Servicio | ¿Página propia? | Justificación |
|---|---|---|
| Contabilidade Empresarial | **SÍ** | Servicio core. Keyword principal. Base de toda la operación. |
| Planejamento Tributário | **SÍ** | Alto volumen de búsqueda. Alto valor de conversión. Contenido propio rico. |
| Departamento Pessoal | **SÍ** | Servicio claramente diferenciado. Búsqueda propia. Contenido específico (eSocial, folha, obrigações). |
| Abertura de Empresas | **SÍ** | Altísima intención de conversión. Keyword masiva. El lead necesita actuar. |
| Consultoria Fiscal | **SÍ** | Diferenciado de Planejamento Tributário en enfoque (reactivo vs. estratégico). Ver sección de canibalización. |
| BPO Financeiro | **SÍ** | Servicio operativo diferenciado. Público distinto (empresas que tercerizan). |
| Imposto de Renda | **SÍ** | Keyword masiva estacional. Alta conversión en temporada. Contenido citable. |
| Contabilidade para MEI | **SÍ** | Audiencia masiva. Keyword propia. Necesidades específicas y diferenciadas. |
| Gestão Fiscal e Tributária | **NO — absorber** | Se absorbe en Consultoria Fiscal y Planejamento Tributário. Tener las tres crearía canibalización segura. |
| Contabilidade Digital | **NO — no crear** | No es un servicio diferenciado, es un atributo de cómo opera DM2. Se menciona en Quem Somos y en el hero. |
| Declaração de Renda PF | **NO — absorber** | Se absorbe como sección dentro de Imposto de Renda. No merece URL propia: la búsqueda ya la cubre IR. |

### Cómo evitar canibalización entre servicios

El riesgo principal es entre **Planejamento Tributário** y **Consultoria Fiscal**:

| Planejamento Tributário | Consultoria Fiscal |
|---|---|
| Enfoque **proactivo y estratégico** | Enfoque **reactivo y especializado** |
| "Cómo pagar menos impuestos legalmente" | "Tengo un problema fiscal, necesito orientación" |
| Regímenes (Simples, Lucro Presumido, Lucro Real) | Situaciones puntuales, notificaciones, auditoria, defesa |
| Keyword: "planejamento tributário" | Keyword: "consultoria fiscal", "assessoria fiscal" |
| Para empresas que quieren optimizar | Para empresas que necesitan resolver |

La diferenciación debe estar clara desde el H1, la meta description y los primeros 150 caracteres de cada página.

---

## 6. ARQUITECTURA POR NICHOS

### Principio rector

Una página de nicho merece existir **solo si:**

1. DM2 tiene experiencia real atendiendo ese segmento.
2. El nicho tiene necesidades contables específicas y diferenciadas.
3. Hay volumen de búsqueda suficiente para "contabilidade para [nicho]".
4. El contenido puede ser sustancial sin repetir lo que dicen las páginas de servicio.

### Decisiones tomadas

| Nicho | ¿Página propia? | Justificación |
|---|---|---|
| Advogados | **SÍ** | DM2 ya atiende abogados. Tributação específica de sociedades de advogados. Keyword validada. |
| Médicos / Profissionais da Saúde | **SÍ** | PJ médica tiene tributación propia (equiparação hospitalar, Livro Caixa). Nicho premium de alto valor. |
| Negócios Digitais | **SÍ** | Infoprodutores, e-commerce, SaaS, influencers. Crecimiento acelerado. Tributação de receitas digitais, marketplace, publicidade. |
| Empregador Doméstico | **SÍ** | DM2 ya atiende. Nicho muy específico. eSocial doméstico, FGTS, férias, 13º. Baja competencia. |
| Prestadores de Serviço | **SÍ** | Autónomos y PJ de servicios. Nicho amplio pero con necesidades claras: PJ vs CLT, Simples vs Lucro Presumido. |
| Comércio e Varejo | **NO — no crear ahora** | Validar si DM2 tiene masa crítica de clientes del sector. Si no, no forzar. Puede agregarse después. |
| Restaurantes e Alimentação | **NO — no crear ahora** | Misma lógica. Solo si hay experiencia real comprobable. |
| Startups e Tecnologia | **NO — absorber en Negócios Digitais** | El público de startups tech se solapa con negócios digitais. No justifica URL separada. |
| E-commerce | **NO — absorber en Negócios Digitais** | Misma audiencia, mismos problemas tributarios. Se trata como subsección dentro de negócios digitais. |

### Relación nicho ↔ servicio

Cada página de nicho NO repite los servicios. Explica por qué ese nicho necesita contabilidade especializada y luego enlaza a los servicios relevantes.

| Nicho | Servicios que enlaza |
|---|---|
| Advogados | → Planejamento Tributário, Contabilidade Empresarial, Abertura de Empresas |
| Médicos | → Planejamento Tributário, Imposto de Renda, Contabilidade Empresarial |
| Negócios Digitais | → Abertura de Empresas, BPO Financeiro, Contabilidade para MEI |
| Empregador Doméstico | → Departamento Pessoal |
| Prestadores de Serviço | → Abertura de Empresas, Planejamento Tributário, Contabilidade para MEI |

---

## 7. HOME Y SU PAPEL DENTRO DEL ECOSISTEMA

### Función arquitectónica de la home

La home es el nodo central del sitio. No es una página de contenido profundo: es un hub que **resume, distribuye y convierte.**

| Función | Descripción |
|---|---|
| **Ataca** | Keywords de marca ("DM2 Contabilidade") y keyword institucional ("escritório de contabilidade em São Paulo", "contador em Vila Mariana"). |
| **Resume** | La propuesta de valor, los servicios principales (no todos), la trayectoria, la prueba social. |
| **Distribuye** | Autoridad hacia servicios (los más importantes), nichos (los principales), blog (artículos destacados), y contato. |
| **Convierte** | Formulario simplificado, CTA de WhatsApp, CTA hacia contato. |

### Distribución de link equity desde la home

| Destino | Tipo de enlace | Prioridad |
|---|---|---|
| `/servicos/contabilidade-empresarial` | Bloque de servicios + nav | MÁXIMA |
| `/servicos/planejamento-tributario` | Bloque de servicios + nav | MÁXIMA |
| `/servicos/abertura-de-empresas` | Bloque de servicios + nav | MÁXIMA |
| `/servicos/imposto-de-renda` | Bloque de servicios | ALTA |
| `/para/advogados` | Bloque de nichos o nav | ALTA |
| `/para/medicos` | Bloque de nichos o nav | ALTA |
| `/para/negocios-digitais` | Bloque de nichos o nav | ALTA |
| `/contato` | CTA múltiples + nav | MÁXIMA |
| `/quem-somos` | Nav + diferencial | ALTA |
| `/blog` | Bloque de blog destacado + nav | MEDIA |
| `/servicos` | Nav | MEDIA |

### Bloque de herramienta/software propio (placeholder)

**Estado:** Información aún no disponible.

**Decisión arquitectónica:**
- Se reserva un bloque en la home entre "Diferencial institucional" y "Prueba social"
- No tiene URL propia todavía
- No tiene schema propio todavía
- Se concibe como bloque visual contenido, 1-2 párrafos máximo
- Cuando haya información real, puede evolucionar a:
  - Sección expandida en la home
  - Página dedicada `/tecnologia` o `/plataforma` (a evaluar)
  - Schema SoftwareApplication si corresponde

**Lo que NO se hace:**
- No se inventa funcionalidad
- No se listan features que no existen
- No se usa estética de producto SaaS
- No se le da protagonismo excesivo en esta fase

---

## 8. BLOG ARCHITECTURE

### Papel del blog en el ecosistema

El blog de DM2 tiene tres funciones simultáneas:

1. **Posicionamiento long-tail:** Atacar keywords informacionales que las páginas de servicio no cubren.
2. **Autoridad temática:** Demostrar que DM2 entiende contabilidade en profundidad real.
3. **Citabilidad por IA:** Cada artículo es una oportunidad de ser citado en Google AI Overviews, ChatGPT y Perplexity.

### Categorías aprobadas

| Categoría | Slug | Justificación | Relación con servicios |
|---|---|---|---|
| Tributário | `/blog/categoria/tributario` | Keyword amplia con múltiples subtemas. Planejamento, regimes, obrigações. | → Planejamento Tributário, Consultoria Fiscal |
| Departamento Pessoal | `/blog/categoria/departamento-pessoal` | eSocial, folha, férias, rescisão, obrigações acessórias. Contenido perenne. | → Departamento Pessoal |
| Abertura de Empresas | `/blog/categoria/abertura-de-empresas` | Guías prácticas. Alta búsqueda. Alto valor de conversión. | → Abertura de Empresas, Contabilidade para MEI |
| MEI e Pequenas Empresas | `/blog/categoria/mei-e-pequenas-empresas` | Audiencia masiva. Dudas concretas. Alto potencial de citación por IA. | → Contabilidade para MEI |
| Legislação | `/blog/categoria/legislacao` | Actualizaciones normativas, deadlines, cambios de alícuota. Contenido noticioso y perenne. | → Todos los servicios según tema |
| Gestão Financeira | `/blog/categoria/gestao-financeira` | Consejos financieros para empresarios. Menos técnico, más práctico. | → BPO Financeiro |

### Categorías rechazadas

| Categoría rechazada | Razón |
|---|---|
| "Contabilidade Empresarial" como categoría | Se solapa con Tributário y Gestão Financeira. Los artículos de contabilidade general encajan en las categorías existentes. |
| "Noticias" | Demasiado genérica. Las noticias relevantes son de legislação. El resto no aporta SEO. |
| "Dicas" (tips) | Categoría vacía de significado. Los tips van dentro de la categoría temática correspondiente. |
| "Casos de Sucesso" | No es una categoría de blog. Los testimonios van en la home o en una sección futura de prueba social. |

### Cómo evitar thin content

- **Regla de mínimo:** Cada artículo debe tener al menos 1.200 palabras de contenido sustancial (no relleno).
- **Regla de profundidad:** Si un tema no da para un artículo completo, no se publica como artículo. Se incorpora como sección dentro de otro artículo más amplio.
- **Regla de no duplicación:** Antes de escribir un artículo, verificar que no hay otro artículo o página de servicio que ya cubra esa keyword.
- **Regla de actualización:** Los artículos con datos que cambian (alícuotas, plazos, límites) deben marcarse con fecha de última actualización y revisarse periódicamente.

### Conexiones blog ↔ servicios

Cada artículo debe incluir:
- Al menos 1 enlace contextual a una página de servicio relacionada
- Al menos 1 enlace a otro artículo del blog
- CTA contextual hacia contato (no intrusivo, natural)

### Conexiones blog ↔ nichos

Artículos dirigidos a un nicho específico deben enlazar la página del nicho correspondiente. Ejemplo:
- Artículo "Tributação para médicos PJ" → enlaza `/para/medicos`
- Artículo "eSocial para empregador doméstico" → enlaza `/para/empregador-domestico`

### Cómo apoyar GEO / IA desde el blog

- **Pasajes citables:** Cada artículo debe tener al menos 2 pasajes de 134-167 palabras que un motor de IA pueda extraer y citar directamente. Párrafos autocontenidos con definición + dato + contexto.
- **FAQ al final:** Cada artículo cierra con 3-5 preguntas frecuentes. Respuestas claras, concisas, citables.
- **Headings como preguntas:** Usar H2/H3 en formato de pregunta cuando sea natural: "Qual é o limite de faturamento do MEI em 2026?"
- **Datos concretos:** Alícuotas, plazos, valores, porcentajes. No generalidades.
- **Fuentes:** Citar Receita Federal, legislación, instrucciones normativas cuando aplique.

---

## 9. SEO LOCAL ARCHITECTURE

### Contexto local de DM2

| Dato | Valor |
|---|---|
| **Ciudad:** | São Paulo, SP |
| **Barrio:** | Vila Mariana |
| **Dirección:** | Rua Vergueiro, 3086 - Conjunto 24 |
| **CEP:** | 04102-001 |
| **Teléfono:** | (11) 2749-7332 |
| **Horario:** | Segunda a sexta, 8:30 - 17:30 |
| **Fundación:** | 2003 (22+ años) |

### Score local actual: 38/100

El sitio actual tiene señales locales muy débiles. La reconstrucción debe corregir esto de forma integral.

### Dónde debe aparecer la señal local

| Página | Señal local | Intensidad | Cómo |
|---|---|---|---|
| **Home** | **FUERTE** | ALTA | H1 con "em São Paulo", meta title con ciudad, schema LocalBusiness completo, NAP en footer, mapa embebido o enlace. |
| **Contato** | **FUERTE** | MÁXIMA | NAP completo, mapa embebido de Google, horarios, schema LocalBusiness, click-to-call (tel:), indicaciones. |
| **Quem Somos** | **MODERADA** | MEDIA | Mención natural de Vila Mariana, história en São Paulo, contexto de la región. Sin forzar. |
| **Servicios (cada uno)** | **NATURAL** | MEDIA | Mención de "em São Paulo" en título o primer párrafo cuando sea natural. No en todos los H1 (eso es sobreoptimización). |
| **Nichos (cada uno)** | **NATURAL** | MEDIA-ALTA | "Contabilidade para advogados em São Paulo" es natural y tiene volumen de búsqueda. Incluir cuando el nicho tenga búsqueda local. |
| **Blog** | **SELECTIVA** | BAJA-MEDIA | Solo en artículos con enfoque local ("como abrir empresa em São Paulo"). No forzar en artículos de tema nacional. |
| **Footer (global)** | **PERMANENTE** | ALTA | NAP completo en todas las páginas. Consistente. |

### Cómo usar ciudad y barrio con naturalidad

**São Paulo:**
- Usar en meta titles de páginas principales: "Contabilidade Empresarial em São Paulo | DM2"
- Usar en H1 de home y contato
- Usar en primeros párrafos de servicios cuando sea natural
- Usar en schema como `addressLocality`

**Vila Mariana:**
- Usar en contato (dirección completa)
- Usar en schema como parte de la dirección
- Mencionar naturalmente en Quem Somos (contexto de ubicación)
- NO forzar en cada página — Vila Mariana como barrio tiene poco volumen de búsqueda comparado con São Paulo
- NO crear página dedicada a Vila Mariana (sobreoptimización sin sentido)

**Lo que NO se hace:**
- No repetir "em São Paulo" en cada H1 de servicio (sobreoptimización)
- No crear páginas por barrio ("/contabilidade-em-vila-mariana") — no hay volumen suficiente
- No crear páginas por zona ("/contabilidade-zona-sul") — riesgo de thin content
- No forzar keywords locales en artículos de blog que no lo requieren

### Refuerzo de entidad local

| Acción | Impacto |
|---|---|
| Schema `AccountingService` con `areaServed`: São Paulo | ALTO |
| NAP idéntico en sitio, GBP, y todos los directorios | ALTO |
| Google Map embebido en contato | ALTO |
| Click-to-call con `tel:` protocol | MEDIO |
| Click-to-WhatsApp con tracking | MEDIO |
| Fotos reales de la oficina en Quem Somos y GBP | MEDIO |
| Reviews en Google (estrategia de solicitud) | ALTO |
| Registros en CRC-SP, SESCON-SP | ALTO (entidad) |
| Directorios contables brasileños | MEDIO |

---

## 10. GEO / AI-READINESS ARCHITECTURE

### Qué páginas deben ser más citables

No todas las páginas tienen el mismo potencial de citación por IA. La prioridad es:

| Prioridad | Páginas | Por qué |
|---|---|---|
| **MÁXIMA** | Blog posts | Son las páginas con más potencial de responder preguntas concretas que la gente hace a motores de IA. |
| **ALTA** | Páginas de servicio | Contienen definiciones, procesos, datos específicos que la IA puede citar: "O planejamento tributário é o processo de..." |
| **ALTA** | Páginas de nicho | Responden preguntas tipo: "Qual o melhor regime tributário para médicos?" |
| **MEDIA** | Quem Somos | Establece la entidad. La IA necesita saber quién es DM2 para decidir si la cita. |
| **MEDIA** | Home | Resume la propuesta de valor. Pero la IA rara vez cita homes completas. |
| **BAJA** | Contato, legales, obrigado | No tienen contenido citable. |

### Bloques que ayudan a la IA a entender y citar

| Tipo de bloque | Descripción | Dónde usarlo |
|---|---|---|
| **Definición autocontenida** | Párrafo de 134-167 palabras que define un concepto de forma completa. Empieza con "O [concepto] é..." o "O [servicio] consiste em...". Incluye dato concreto. | Inicio de cada página de servicio. Primeros párrafos de artículos de blog. |
| **Lista estructurada** | Lista numerada o con bullets que responde una pregunta concreta: "O que é necessário para abrir empresa em SP?" → 1, 2, 3, 4, 5. | Dentro de servicios, nichos y blog. |
| **Tabla comparativa** | Tabla que compara opciones: Simples Nacional vs Lucro Presumido vs Lucro Real. Datos concretos: alícuotas, límites, requisitos. | Planejamento Tributário, artículos comparativos. |
| **FAQ con respuestas directas** | Pregunta clara + respuesta en 2-3 oraciones. Sin rodeos. La primera oración debe responder directamente. | Final de cada página de servicio. Final de cada artículo. |
| **Dato con contexto** | Cifra concreta con fuente: "O limite de faturamento do MEI em 2026 é de R$ 81.000 por ano (Lei Complementar 123/2006)." | Distribuidos dentro del contenido natural. |
| **Paso a paso** | Proceso explicado en pasos claros: "Como abrir empresa: Passo 1, Passo 2..." | Servicios prácticos (Abertura, IR, MEI). |

### Estructura que ayuda a cada motor de IA

| Motor | Qué necesita | Cómo lo cubrimos |
|---|---|---|
| **Google AI Overviews** | Pasajes directos que respondan queries. Schema rico. Autoridad de dominio. | Definiciones autocontenidas + schema + E-E-A-T signals. |
| **ChatGPT** | Contenido indexado por Bing/GPTBot. Texto claro y estructurado. Datos con fuente. | Permitir GPTBot en robots.txt. Contenido factual con fuentes. |
| **Perplexity** | Pasajes citables con URL clara. Estructura con headings descriptivos. | Headings-pregunta + párrafos autocontenidos + URLs limpias. |
| **Bing Copilot** | Schema, contenido factual, estructura semántica. | Schema completo + contenido bien estructurado. |

### llms.txt

Archivo en raíz del sitio (`/llms.txt`) con:

```
# DM2 Contabilidade
> Escritório de contabilidade em São Paulo, Vila Mariana. 
> Fundado em 2003. Mais de 22 anos de experiência.

## Serviços
- Contabilidade Empresarial
- Planejamento Tributário
- Departamento Pessoal
- Abertura de Empresas
- Consultoria Fiscal
- BPO Financeiro
- Imposto de Renda
- Contabilidade para MEI

## Especialidades
- Contabilidade para Advogados
- Contabilidade para Médicos
- Contabilidade para Negócios Digitais
- Contabilidade para Empregador Doméstico
- Contabilidade para Prestadores de Serviço

## Contato
- Endereço: Rua Vergueiro, 3086 - Conjunto 24, Vila Mariana, São Paulo - SP, 04102-001
- Telefone: (11) 2749-7332
- Horário: Segunda a sexta, 8:30 às 17:30
- Website: https://dm2contabilidade.com.br

## Links
- [Serviços](/servicos)
- [Quem Somos](/quem-somos)
- [Blog](/blog)
- [Contato](/contato)
```

### robots.txt — crawlers de IA

| Crawler | Decisión | Justificación |
|---|---|---|
| GPTBot | **Permitir** | Queremos ser citados en ChatGPT. |
| OAI-SearchBot | **Permitir** | Complementa GPTBot para búsquedas. |
| ClaudeBot | **Permitir** | Indexación para Claude/Anthropic. |
| PerplexityBot | **Permitir** | Citación en Perplexity. |
| Google-Extended | **Permitir** | AI Overviews de Google. |
| CCBot | **Evaluar** | Common Crawl. Generalmente permitir. |

---

## 11. SCHEMA ARCHITECTURE

### Schema por tipo de página

**NOTA IMPORTANTE:** FAQPage tiene restricciones desde 2023 (solo gobierno y salud generan rich results). Sin embargo, el markup sigue siendo útil para AI-readiness y para que los motores entiendan la estructura FAQ. Se implementa sin esperar rich snippets visuales.

| Página | Schemas a implementar | Notas |
|---|---|---|
| **Home** | `Organization`, `LocalBusiness` (subtipo `AccountingService`), `WebSite` (con `SearchAction` opcional), `WebPage` | `LocalBusiness` debe incluir: name, address (PostalAddress), telephone, openingHours, geo (lat/lng), areaServed, priceRange, image, foundingDate. |
| **Quem Somos** | `WebPage` (subtipo `AboutPage`), `Organization` (referencia), `BreadcrumbList` | Incluir foundingDate: 2003. Si hay equipo visible, considerar `Person` para miembros clave. |
| **Índice de Servicios** | `WebPage`, `BreadcrumbList` | Hub de navegación. No necesita schema de servicio propio. |
| **Página de servicio (cada una)** | `Service`, `WebPage`, `BreadcrumbList`, `FAQPage` (si tiene FAQ) | `Service` con: name, description, provider (ref Organization), areaServed, serviceType. |
| **Página de nicho (cada una)** | `Service` (variante por nicho), `WebPage`, `BreadcrumbList`, `FAQPage` (si tiene FAQ) | `Service` con audience específico. areaServed: São Paulo. |
| **Blog índice** | `WebPage`, `BreadcrumbList` | Solo navegación. |
| **Blog artículo** | `Article` (subtipo `BlogPosting`), `Person` (autor), `BreadcrumbList`, `Organization` (publisher) | `BlogPosting` con: headline, datePublished, dateModified, author (Person con name, jobTitle), publisher (Organization), image, articleBody. |
| **Contato** | `ContactPage`, `LocalBusiness` (referencia o completo), `BreadcrumbList` | Puede incluir `PostalAddress` expandido con directionsUrl. |
| **Obrigado** | `WebPage` | Mínimo. noindex. |
| **Legales** | `WebPage` | Mínimo. |

### Schema global (presente en todas las páginas)

- `Organization` — datos base de DM2 (nombre, logo, URL, sameAs con redes sociales si existen)
- `WebSite` — en home y como referencia global
- `BreadcrumbList` — en todas las páginas internas

### Campos críticos de LocalBusiness/AccountingService

```
{
  "@type": "AccountingService",
  "name": "DM2 Contabilidade",
  "foundingDate": "2003",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rua Vergueiro, 3086 - Conjunto 24",
    "addressLocality": "São Paulo",
    "addressRegion": "SP",
    "postalCode": "04102-001",
    "addressCountry": "BR"
  },
  "telephone": "+55-11-2749-7332",
  "openingHoursSpecification": { ... lunes a viernes 08:30-17:30 ... },
  "geo": { lat/lng de Vila Mariana },
  "areaServed": { "São Paulo" },
  "priceRange": "$$"
}
```

*(No se escribe el JSON-LD completo todavía. Solo se define la arquitectura.)*

---

## 12. INTERNAL LINKING ARCHITECTURE

### Principio rector

El internal linking no es cosmético. Es la forma en que el sitio distribuye autoridad y guía tanto a usuarios como a crawlers. Cada enlace interno debe tener una razón.

### Mapa de enlaces por capa

#### Home → todo el ecosistema

```
HOME
├── → /servicos/contabilidade-empresarial    (bloque servicios + nav)
├── → /servicos/planejamento-tributario      (bloque servicios + nav)
├── → /servicos/abertura-de-empresas         (bloque servicios + nav)
├── → /servicos/imposto-de-renda             (bloque servicios)
├── → /servicos/departamento-pessoal         (nav)
├── → /servicos/consultoria-fiscal           (nav)
├── → /servicos/bpo-financeiro               (nav)
├── → /servicos/contabilidade-para-mei       (nav)
├── → /para/advogados                        (bloque nichos)
├── → /para/medicos                          (bloque nichos)
├── → /para/negocios-digitais                (bloque nichos)
├── → /quem-somos                            (nav + diferencial)
├── → /blog                                  (nav + bloque blog)
├── → /blog/[artículo-1]                     (bloque blog destacado)
├── → /blog/[artículo-2]                     (bloque blog destacado)
├── → /blog/[artículo-3]                     (bloque blog destacado)
└── → /contato                               (CTAs múltiples + nav)
```

#### Servicios → red de contenido

```
SERVICIO (cada página)
├── → /contato                               (CTA principal)
├── → 2-3 servicios relacionados             (enlaces contextuales)
├── → 1-2 nichos relacionados                (enlaces contextuales)
├── → 2-3 artículos de blog relacionados     (sección "Artigos relacionados")
├── → /servicos                              (breadcrumb)
└── → /                                      (breadcrumb)
```

#### Nichos → servicios + contenido

```
NICHO (cada página)
├── → /contato                               (CTA principal)
├── → 2-3 servicios más relevantes para ese nicho (enlaces contextuales)
├── → 1-2 artículos de blog del nicho        (sección "Leia também")
├── → /servicos                              (enlace contextual)
└── → /                                      (breadcrumb)
```

#### Blog → servicios + nichos

```
ARTÍCULO (cada post)
├── → 1 servicio relacionado principal       (enlace contextual en el cuerpo)
├── → 1 nicho relacionado si aplica          (enlace contextual)
├── → 2-3 artículos relacionados             (sección "Leia também")
├── → /contato                               (CTA contextual, no intrusivo)
├── → /blog                                  (breadcrumb)
└── → /                                      (breadcrumb)
```

#### Quem Somos → autoridad y confianza

```
QUEM SOMOS
├── → /contato                               (CTA)
├── → /servicos                              (enlace a servicios)
├── → / (home)                               (breadcrumb)
└── → 1-2 servicios core                     (enlace contextual natural)
```

#### Contato → páginas clave

```
CONTATO
├── → /                                      (breadcrumb)
├── → /servicos                              (para quien llega directo a contacto)
├── → /quem-somos                            (para quien quiere conocer más antes de contactar)
└── → WhatsApp (externo, con tracking)
```

### Reglas de anchor text

- Usar anchor text descriptivo y variado. No "clique aqui" ni "saiba mais".
- Incluir la keyword del destino cuando sea natural: "Conheça nosso serviço de planejamento tributário"
- No sobreoptimizar: no todos los enlaces al mismo destino usan la misma keyword exacta.

---

## 13. BREADCRUMBS Y NAVEGACIÓN

### Breadcrumbs

Presentes en todas las páginas excepto Home. Formato visual y con schema `BreadcrumbList`.

| Página | Breadcrumb |
|---|---|
| Servicio | Home > Serviços > [Nombre del servicio] |
| Nicho | Home > Para [Nicho] |
| Blog índice | Home > Blog |
| Blog categoría | Home > Blog > [Categoría] |
| Blog artículo | Home > Blog > [Categoría] > [Título del artículo] |
| Quem Somos | Home > Quem Somos |
| Contato | Home > Contato |
| Legales | Home > [Privacidade / Termos] |

**Nota sobre nichos:** Los nichos NO viven bajo `/servicos/`. Viven bajo `/para/`. El breadcrumb refleja esto: `Home > Para Advogados`, no `Home > Serviços > Para Advogados`. Son una capa diferente.

### Navegación principal (header)

```
Logo DM2 (→ home)

Nav:
├── Serviços ─────────────── dropdown/mega menu
│   ├── Contabilidade Empresarial
│   ├── Planejamento Tributário
│   ├── Departamento Pessoal
│   ├── Abertura de Empresas
│   ├── Consultoria Fiscal
│   ├── BPO Financeiro
│   ├── Imposto de Renda
│   └── Contabilidade para MEI
├── Especialidades ───────── dropdown
│   ├── Para Advogados
│   ├── Para Médicos
│   ├── Para Negócios Digitais
│   ├── Para Empregador Doméstico
│   └── Para Prestadores de Serviço
├── Quem Somos
├── Blog
└── Contato                  (botón CTA, visualmente diferenciado)
```

**Decisión clave:** Los nichos se agrupan bajo "Especialidades" en la nav, no bajo "Serviços". Esto refuerza la separación conceptual y evita un mega-menú demasiado largo.

### Footer navigation

```
FOOTER

Col 1: DM2 Contabilidade
├── Breve descripción (1-2 líneas)
├── NAP completo
├── Horario
└── Links redes sociales (si existen)

Col 2: Serviços
├── Contabilidade Empresarial
├── Planejamento Tributário
├── Departamento Pessoal
├── Abertura de Empresas
├── Consultoria Fiscal
├── BPO Financeiro
├── Imposto de Renda
└── Contabilidade para MEI

Col 3: Especialidades
├── Para Advogados
├── Para Médicos
├── Para Negócios Digitais
├── Para Empregador Doméstico
└── Para Prestadores de Serviço

Col 4: Institucional
├── Quem Somos
├── Blog
├── Contato
├── Privacidade
└── Termos

Barra inferior:
├── © 2003-2026 DM2 Contabilidade
├── CRC-SP (número si disponible)
└── Créditos del desarrollo (si aplica)
```

### Enlaces contextuales

Además de nav y footer, cada página tiene enlaces contextuales dentro del contenido:

- **"Artigos relacionados"** — en servicios y nichos (3 artículos de blog)
- **"Serviços relacionados"** — en artículos de blog y nichos (2-3 servicios)
- **"Leia também"** — en artículos de blog (2-3 artículos)
- **CTA contextual** — en servicios, nichos y blog ("Fale com um contador" → /contato)

### Navegación de blog

```
Blog índice:
├── Filtro por categoría (tabs o sidebar)
├── Artículos ordenados por fecha (más reciente primero)
├── Paginación (si >10 artículos por página)
└── Sidebar: categorías, artículos populares (opcional, evaluar valor vs. bloat)

Blog artículo:
├── Breadcrumb
├── Autor + fecha
├── Tabla de contenidos (si artículo largo, >2000 palabras)
├── Contenido
├── FAQ
├── Artigos relacionados (3)
├── CTA contextual
└── Navegación anterior/siguiente (opcional)
```

---

## 14. CANIBALIZACIÓN Y RIESGOS

### Riesgos identificados

| Riesgo | Páginas en conflicto | Severidad | Mitigación |
|---|---|---|---|
| **Planejamento Tributário vs Consultoria Fiscal** | `/servicos/planejamento-tributario` vs `/servicos/consultoria-fiscal` | ALTA | Diferenciar enfoque: proactivo/estratégico vs reactivo/especializado. H1, meta description y primeros 200 caracteres deben dejar clara la diferencia. Ver sección 5. |
| **Contabilidade Empresarial vs Contabilidade para MEI** | `/servicos/contabilidade-empresarial` vs `/servicos/contabilidade-para-mei` | MEDIA | MEI es microempreendedor individual. Empresarial es para empresas con estructura (ME, EPP, LTDA, SA). No hay solapamiento real si el contenido es específico. |
| **Contabilidade para MEI vs Abertura de Empresas** | `/servicos/contabilidade-para-mei` vs `/servicos/abertura-de-empresas` | MEDIA | MEI cubre la operación contable continua del microempreendedor. Abertura cubre el proceso de abrir cualquier tipo de empresa. Pueden compartir subtemas (formalização MEI) pero el enfoque es distinto. |
| **Páginas de nicho vs Páginas de servicio** | `/para/advogados` vs `/servicos/contabilidade-empresarial` | BAJA | Las páginas de nicho NO describen servicios. Describen por qué ese nicho necesita contabilidade especializada y enlazan a los servicios. No compiten por las mismas keywords. |
| **Blog vs Servicios** | `/blog/planejamento-tributario-guia` vs `/servicos/planejamento-tributario` | MEDIA | El artículo de blog debe ser informacional puro (guía, explicación). La página de servicio es transaccional (contrate este servicio). Keywords distintas: "o que é planejamento tributário" (blog) vs "planejamento tributário em São Paulo" (servicio). |
| **Blog vs Blog** | Artículos similares sobre temas cercanos | MEDIA | Antes de publicar, verificar que no hay artículo existente con la misma keyword objetivo. Si hay, actualizar el existente en lugar de crear uno nuevo. |

### Riesgos de inflación del sitemap

| Riesgo | Mitigación |
|---|---|
| Crear páginas de nicho sin contenido real | Solo crear nichos donde DM2 tiene experiencia demostrable. Los demás se agregan después. |
| Blog con artículos cortos y superficiales | Mínimo 1.200 palabras. Si no da para eso, no se publica como artículo. |
| Páginas de categoría de blog vacías | Categorías con <3 artículos pueden tener noindex hasta que se acumule contenido. |
| Crear páginas por barrio/zona | NO crear. No hay volumen de búsqueda suficiente y genera thin content. |
| Duplicar servicios con nombres diferentes | Cada URL ataca una intención de búsqueda distinta. Si dos URLs atacan la misma intención, una de las dos sobra. |

---

## 15. PRIORIDAD DE CONSTRUCCIÓN

### Prioridad 1 — Lanzamiento mínimo viable (MVP)

Estas páginas son necesarias para lanzar. Sin ellas, el sitio no funciona.

| Página | Justificación |
|---|---|
| Home | Hub central. Sin ella no hay sitio. |
| Contato | Sin formulario no hay conversión. |
| Obrigado | Tracking de conversión requiere página de agradecimiento. |
| Quem Somos | E-E-A-T. Credibilidad base. |
| Serviços (índice) | Hub de servicios. |
| Contabilidade Empresarial | Servicio core. Keyword #1. |
| Planejamento Tributário | Keyword de alto valor. |
| Abertura de Empresas | Alta conversión. |
| Privacidade | LGPD obligatorio. |
| Termos | Legal obligatorio. |
| 404 | UX y SEO. |
| robots.txt + sitemap.xml | SEO técnico base. |
| llms.txt | GEO base. |

**Total P1:** ~13 páginas + archivos técnicos

### Prioridad 2 — Expansión de servicios y nichos

Estas páginas se construyen inmediatamente después del lanzamiento.

| Página | Justificación |
|---|---|
| Departamento Pessoal | Servicio diferenciado. |
| Consultoria Fiscal | Completa la oferta de servicios. |
| Imposto de Renda | Keyword masiva. Idealmente lanzar antes de temporada IR. |
| BPO Financeiro | Servicio complementario. |
| Contabilidade para MEI | Audiencia masiva. |
| Para Advogados | Nicho validado. |
| Para Médicos | Nicho premium. |
| Para Negócios Digitais | Nicho en crecimiento. |

**Total P2:** ~8 páginas

### Prioridad 3 — Blog, nichos secundarios y expansión

| Página | Justificación |
|---|---|
| Blog (índice + categorías) | Infraestructura de blog. |
| Primeros 5-10 artículos | Contenido inicial. Keywords long-tail. |
| Para Empregador Doméstico | Nicho específico. |
| Para Prestadores de Serviço | Nicho amplio. |
| Artículos adicionales (expansión continua) | Crecimiento orgánico sostenido. |

**Total P3:** ~7-12 páginas + blog continuo

---

## 16. DECISIONES ABIERTAS DEL DIRECTOR

Las siguientes decisiones requieren input del director del proyecto antes de avanzar a diseño o desarrollo:

### Datos y contenido

| Decisión pendiente | Impacto | Urgencia |
|---|---|---|
| **Skills exactos de Claude a usar** | Afecta el flujo de trabajo de todo el contenido | ALTA — necesario antes de escribir cualquier copy |
| **Datos reales de credibilidad** | Cantidad de clientes, porcentaje de retención, datos concretos para la barra de credibilidad de la home | ALTA — necesario para Fase 3 (Home) |
| **Información del software/herramienta propia** | Nombre, funcionalidades, estado de desarrollo | MEDIA — placeholder funciona por ahora |
| **Equipo real de DM2** | Nombres, cargos, fotos del equipo para Quem Somos y autoría de blog | ALTA — necesario para E-E-A-T |
| **Número de CRC-SP** | Registro en el Conselho Regional de Contabilidade | MEDIA — refuerza entidad profesional |
| **Redes sociales de DM2** | ¿Tiene Instagram, LinkedIn, Facebook? URLs exactas para schema `sameAs` | MEDIA |
| **WhatsApp business** | Número exacto de WhatsApp para CTAs | ALTA — necesario para Fase 3 |
| **E-mail de contacto** | Dirección de e-mail para el formulario y schema | ALTA |
| **Testimonios/reviews reales** | ¿Existen? ¿Se pueden usar? ¿Se necesitan pedir? | MEDIA — necesario para prueba social |

### Validación de arquitectura

| Decisión pendiente | Impacto | Urgencia |
|---|---|---|
| **¿DM2 atiende Comércio e Varejo?** | Determina si se crea página de nicho para retail | BAJA |
| **¿DM2 atiende Restaurantes?** | Determina si se crea página de nicho para gastronomía | BAJA |
| **¿Hay otros nichos no listados?** | Podrían existir nichos donde DM2 ya tiene clientes y que no están contemplados | MEDIA |
| **¿El slug `/para/` es correcto?** | Alternativa: `/especialidades/` o `/contabilidade-para/`. `/para/` es más limpio pero menos descriptivo. | MEDIA |
| **¿Contabilidade para PJ Médica merece página separada de Profissionais da Saúde en general?** | Si DM2 atiende dentistas, fisioterapeutas, etc., puede ampliarse. Si solo médicos, se acota. | BAJA |

### Técnicas

| Decisión pendiente | Impacto | Urgencia |
|---|---|---|
| **Dominio definitivo** | ¿Se mantiene `dm2contabilidade.com.br`? ¿Hay otro dominio? | ALTA |
| **Google Business Profile** | ¿Está verificado? ¿Quién tiene acceso? | ALTA — necesario para Fase 10 (SEO Local) |
| **Google Analytics / Search Console** | ¿Ya existen cuentas? ¿Se crean nuevas? | MEDIA |
| **Meta Pixel** | ¿Ya existe? ¿Se crea nuevo? | MEDIA |
| **Redirecciones del sitio actual** | ¿Hay URLs actuales que reciben tráfico y necesitan 301? | ALTA — necesario antes de lanzamiento |
| **Google Maps API key** | Para mapa embebido en contato | BAJA |

---

## NOTAS FINALES

1. **Este documento complementa y está subordinado al MASTER-PLAN-DM2-REBUILD.md.** No lo contradice ni lo reemplaza.

2. **Las decisiones de slugs son definitivas salvo validación del director.** Cambiar slugs después del lanzamiento implica redirecciones.

3. **El sitemap puede crecer pero no inflarse.** Cada nueva URL debe justificarse con los criterios de esta arquitectura.

4. **La canibalización se previene, no se arregla después.** Cada página tiene un territorio claro de keywords.

5. **GEO/IA no es un add-on.** Es parte de la estructura base de cada página desde el diseño del contenido.

---

*Documento generado como arquitectura congelada para la reconstrucción de DM2 Contabilidade.*  
*Cualquier modificación debe ser documentada con fecha y justificación.*
