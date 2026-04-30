# ADDENDUM-002 — Requisito: Área de Clientes + Redes Sociales

**Fecha:** 02 de abril de 2026  
**Tipo:** Requisito funcional fijo del Director  
**Estado:** IMPLEMENTADO

---

## 1. REQUISITO

### Área de Clientes
- **URL:** https://vip.acessorias.com/dm2contabilidade
- **Comportamiento:** `target="_blank"` + `rel="noopener noreferrer"` (nueva pestaña, seguro)
- **Ubicación:** Utility bar superior del header + footer (columna Institucional) + menú mobile
- **Jerarquía UX:** Acceso funcional para clientes actuales. NO compite como CTA principal de captación. "Contato" sigue siendo la CTA comercial principal.

### Redes Sociales Oficiales
- **Instagram:** https://www.instagram.com/dm2contabilidade/
- **LinkedIn:** https://www.linkedin.com/company/dm2-contabilidade?originalSubdomain=br
- **Ubicación:** Utility bar del header + footer (columna DM2)
- **Schema:** Incluidas en `sameAs` del schema Organization

---

## 2. ARCHIVOS MODIFICADOS

| Archivo | Cambio |
|---|---|
| `src/content/site.ts` | Redes sociales reales + constante `CLIENT_PORTAL_URL` |
| `src/components/layout/Header.tsx` | Utility bar con redes + Área de Clientes + menú mobile |
| `src/components/layout/Footer.tsx` | Redes sociales + Área de Clientes en columna Institucional |
| `src/components/seo/SchemaMarkup.tsx` | `sameAs` con Instagram y LinkedIn |

---

## 3. JERARQUÍA DE ACCIONES EN HEADER

```
[Utility bar: navy-900]
  Instagram  LinkedIn                          Área de Clientes →

[Navigation bar: white]
  Logo    Serviços ▾   Especialidades ▾   Quem Somos   Blog    [Contato] btn-primary
```

- La utility bar se oculta suavemente al hacer scroll (no ocupa espacio cuando se navega)
- "Contato" es el CTA principal (botón navy-800)
- "Área de Clientes" es acceso funcional secundario (link discreto, text-xs)

---

*Registrado como requisito funcional fijo del proyecto DM2 Contabilidade.*
