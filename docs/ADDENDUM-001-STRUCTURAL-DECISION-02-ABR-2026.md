# ADDENDUM-001 — Decisión Estructural del Director

**Fecha:** 02 de abril de 2026  
**Tipo:** Decisión del Director — Reestructuración de servicios y nichos  
**Estado:** APLICADO — Código y documentación actualizados

---

## 1. DECISIÓN

El Director ha redefinido la estructura de servicios y especialidades del sitio DM2 Contabilidade.

---

## 2. PÁGINAS ELIMINADAS

Las siguientes páginas quedan **fuera de la arquitectura actual y futura**:

| Página eliminada | Tipo | Motivo |
|---|---|---|
| Migração de MEI para ME | Servicio (del sitio anterior) | No forma parte del rebuild. Decisión del Director. |
| Contabilidade para Empregador Doméstico | Especialidad/Nicho | Eliminada de la arquitectura. Decisión del Director. |

---

## 3. SERVICIOS — NUEVA ARQUITECTURA

La arquitectura de servicios ahora gira **principalmente** alrededor de 4 servicios core:

| Servicio | Slug | Estado |
|---|---|---|
| Consultoria Contábil | `/servicos/consultoria-contabil` | **CONFIRMADO** |
| Planejamento Tributário | `/servicos/planejamento-tributario` | **CONFIRMADO** |
| Gestão Fiscal e Tributária | `/servicos/gestao-fiscal-e-tributaria` | **CONFIRMADO** |
| Abertura e Regularização de Empresas | `/servicos/abertura-e-regularizacao-de-empresas` | **CONFIRMADO** |

### Servicios en espera (no confirmados, no eliminados)

Los siguientes servicios estaban en la arquitectura anterior pero NO fueron mencionados por el Director. Quedan **en espera** — pueden volver en fases futuras si el Director los confirma:

| Servicio en espera | Slug anterior | Estado |
|---|---|---|
| Departamento Pessoal | `departamento-pessoal` | EN ESPERA |
| BPO Financeiro | `bpo-financeiro` | EN ESPERA |
| Imposto de Renda | `imposto-de-renda` | EN ESPERA |
| Contabilidade para MEI | `contabilidade-para-mei` | EN ESPERA |

### Cambios de naming respecto a la arquitectura anterior

| Nombre anterior | Nombre nuevo | Tipo de cambio |
|---|---|---|
| Contabilidade Empresarial | Consultoria Contábil | Renombrado |
| Abertura de Empresas | Abertura e Regularização de Empresas | Ampliado |
| Consultoria Fiscal | (absorbido en Gestão Fiscal e Tributária) | Fusionado |
| Gestão Fiscal e Tributária | Gestão Fiscal e Tributária | Restaurado (antes estaba rechazado) |

---

## 4. ESPECIALIDADES — ESTADO PROVISIONAL

La sección "Especialidades" **se mantiene** como bloque estratégico y elemento de navegación.

### Nichos activos (PROVISIONALES)

| Nicho | Slug | Estado |
|---|---|---|
| Contabilidade para Advogados | `/para/advogados` | PROVISIONAL |
| Contabilidade para Profissionais da Saúde | `/para/profissionais-da-saude` | PROVISIONAL |
| Contabilidade para Negócios Digitais | `/para/negocios-digitais` | PROVISIONAL |

### Nota crítica

> **La lista definitiva de especialidades NO está cerrada.**  
> El Director no ha congelado esta capa.  
> Nuevos nichos pueden agregarse y los actuales pueden cambiar.  
> La arquitectura técnica (dynamic routes `/para/[slug]`) ya soporta esto sin cambios de código.

### Nichos eliminados o no confirmados

| Nicho | Estado |
|---|---|
| Contabilidade para Empregador Doméstico | **ELIMINADO** |
| Contabilidade para Prestadores de Serviço | NO CONFIRMADO (removido de la lista provisional) |
| Comércio e Varejo | Nunca fue incluido |
| Restaurantes e Alimentação | Nunca fue incluido |

### Cambio de naming

| Nombre anterior | Nombre nuevo |
|---|---|
| Médicos (slug: `medicos`) | Profissionais da Saúde (slug: `profissionais-da-saude`) |

---

## 5. ARCHIVOS MODIFICADOS EN EL CÓDIGO

| Archivo | Cambio |
|---|---|
| `src/types/service.ts` | ServiceSlug reducido a 4 slugs. Documentación de servicios en espera. |
| `src/types/niche.ts` | NicheSlug reducido a 3 slugs. `medicos` → `profissionais-da-saude`. Nota de provisionalidad. |
| `src/content/services/index.ts` | Redefinido con 4 servicios. Nombres y slugs actualizados. |
| `src/content/niches/index.ts` | Redefinido con 3 nichos. Rename de médicos a profissionais-da-saude. |
| `src/lib/constants.ts` | NAV_SERVICES y NAV_NICHES actualizados. SERVICE_OPTIONS del formulario actualizado. |
| `src/app/page.tsx` | Home: servicios destacados y nichos actualizados. |
| `public/llms.txt` | Servicios y especialidades actualizados. |

### Archivos que NO requirieron cambios

- `src/app/servicos/[slug]/page.tsx` — Dynamic route, se adapta automáticamente.
- `src/app/para/[slug]/page.tsx` — Dynamic route, se adapta automáticamente.
- `src/app/sitemap.ts` — Lee de `serviceSlugs` y `nicheSlugs`, se adapta automáticamente.
- `src/components/layout/Header.tsx` — Lee de `NAV_SERVICES` y `NAV_NICHES`, se adapta automáticamente.
- `src/components/layout/Footer.tsx` — Idem.

---

## 6. RESULTADO

| Métrica | Antes | Después |
|---|---|---|
| Servicios | 8 | 4 (+ 4 en espera) |
| Nichos | 5 | 3 (provisionales) |
| Páginas SSG totales | 25 | 19 |
| Build | ✅ | ✅ |
| Lint | 0 errores | 0 errores |

---

## 7. DOCUMENTOS RECTORES QUE DEBEN ACTUALIZARSE

Los siguientes documentos congelados contienen información que ahora diverge de la realidad del proyecto. Deben actualizarse cuando se vuelvan a revisar:

| Documento | Secciones afectadas |
|---|---|
| **SITEMAP-SEO-GEO-ARCHITECTURE** | §3 Tabla maestra de páginas, §4 Slugs estratégicos, §5 Arquitectura de servicios, §6 Arquitectura por nichos, §7 Home, §12 Internal linking, §13 Breadcrumbs y navegación, §14 Canibalización, §15 Prioridad de construcción |
| **COPY-SYSTEM-CONTENT-ARCHITECTURE** | §6 Pilares de mensaje (distribución por página), §7 Diferencia entre tipos de página, §10 Páginas de servicio, §11 Páginas por nicho, §14 CTA System |
| **TECHNICAL-ARCHITECTURE** | §8 Tabla de leads (servico_interesse options), §15 SEO técnico (sitemap pages) |
| **DESIGN-SYSTEM-UX-SYSTEM** | §11 Sistema de secciones (home), §12 Home UX structure |
| **MASTER-PLAN** | §7 Arquitectura macro, §8 Estrategia de home, §16 Roadmap (fases 5 y 6) |

> **NOTA:** Los documentos no se modifican todavía. Este addendum sirve como registro de la divergencia. La verdad actual del proyecto está en el **código** y en este addendum. Cuando se revisen los documentos rectores, este addendum guía las correcciones.

---

*Registrado como decisión estructural del proyecto DM2 Contabilidade.*
