# DESIGN-SYSTEM-UX-SYSTEM-DM2.md

## Sistema Visual y de Experiencia — DM2 Contabilidade

**Versión:** 1.0  
**Fecha:** 01 de abril de 2026  
**Estado:** CONGELADO — base para diseño y desarrollo  
**Documentos rectores:** MASTER-PLAN-DM2-REBUILD.md, SITEMAP-SEO-GEO-ARCHITECTURE-DM2.md  
**Idioma del documento:** Español (comunicación interna)  
**Idioma del sitio final:** Portugués de Brasil

---

## 1. OBJETIVO DE LA FASE

### Por qué congelar sistema visual y UX antes de construir

Sin un sistema visual congelado, cada página se diseña por separado. El resultado: inconsistencia, decisiones contradictorias, look de plantilla armada en el momento, y la temida "cara de IA" donde todo parece correcto pero nada parece real.

Congelar esta capa garantiza:

- **Coherencia total.** Todas las páginas se sienten parte del mismo sitio sin ser clones.
- **No hay improvisación visual.** Cada color, tipografía, spacing y componente tiene una razón.
- **Se evita la deriva.** Sin reglas claras, el diseño tiende hacia lo genérico, lo inflado o lo artificial.
- **El desarrollo es directo.** Los desarrolladores no interpretan: implementan tokens definidos.
- **La marca se respeta.** La identidad visual de DM2 se traduce al web de forma deliberada, no aproximada.
- **Se previene el "look de IA".** Las reglas anti-genérico son parte del sistema, no un afterthought.

Este documento responde: **¿Cómo debe verse, sentirse y comportarse cada elemento del sitio?**

---

## 2. TESIS VISUAL DEL SITIO

### Cómo debe sentirse la nueva web de DM2

La web de DM2 debe sentirse como entrar a la oficina de una firma contable que sabe lo que hace: ordenada, profesional, con materiales de calidad, sin ostentación pero sin descuido. Ni fría ni excesivamente cálida. Ni rígida ni informal. Una presencia que transmite que detrás hay personas competentes, organizadas y serias.

**Adjetivos rectores:**

| Adjetivo | Lo que significa en diseño |
|---|---|
| **Institucional premium** | No se ve barato. No se ve improvisado. Cada decisión visual tiene intención. |
| **Sofisticação** | El gold aparece con moderación y propósito, no como decoración. Los detalles son sutiles, no gritados. |
| **Confiança** | El navy transmite estabilidad. Los datos concretos reemplazan las promesas vacías. El sitio se siente sólido, no frágil. |
| **Clareza** | Jerarquía visual evidente. El usuario nunca se pregunta "¿dónde estoy?" ni "¿qué hago ahora?". |
| **Elegância** | White space generoso. Tipografía bien tratada. Composición con ritmo. Sin amontonar. |
| **Autoridade** | El sitio se siente como la presencia digital de una empresa que lleva 22+ años operando, no como alguien que acaba de empezar. |
| **Modernidade controlada** | Tecnología actual sin parecer startup. Diseño contemporáneo sin tendencias efímeras. |
| **Naturalidade** | Nada se siente forzado ni fabricado. Ni el copy, ni los colores, ni la composición. |
| **Precisão** | Alineaciones exactas. Espaciados consistentes. Detalles cuidados. La precisión visual refleja la precisión contable. |

### Lo que este sitio NO es

| NO es | Por qué |
|---|---|
| Un SaaS | No tiene pricing page, no tiene features list, no tiene hero con laptop mockup. |
| Una startup | No busca "disrumpir". Busca transmitir solidez y experiencia real. |
| Una landing de infoproducto | No tiene countdown timers, no tiene testimonios con estrellas infladas, no tiene urgencia artificial. |
| Una plantilla de IA | No tiene gradientes genéricos, no tiene secciones intercambiables, no tiene layouts que podrían pertenecer a cualquier empresa. |
| Una web corporativa vacía | No tiene stock photos genéricos, no tiene frases huecas, no tiene páginas sin contenido real. |

---

## 3. REGLAS ANTI "CARA DE IA"

### Qué es "cara de IA" y por qué evitarla

Un sitio tiene "cara de IA" cuando todo está técnicamente correcto pero se siente fabricado. Cuando cada sección parece salida de un prompt, cuando los layouts son idénticos, cuando el copy es fluido pero vacío, cuando la estructura visual es predecible desde el primer scroll.

### Reglas obligatorias

**Sobre composición y layout:**

1. **No más de 2 secciones consecutivas con el mismo patrón de layout.** Si una sección es grid de 3 columnas, la siguiente no puede serlo también. Variar: texto + imagen, bloque centrado, layout asimétrico, lista con detalle.

2. **No todas las secciones tienen la misma altura visual.** Algunas secciones son compactas (barra de datos, CTA strip). Otras son amplias (hero, diferencial). El ritmo visual necesita variación.

3. **No centrar todo.** El centramiento excesivo es una marca de IA. Alternar entre composiciones centradas, alineadas a la izquierda, y asimétricas según el contenido.

4. **No usar el mismo contenedor en todas las secciones.** Algunas secciones pueden ir a full-width, otras con márgenes amplios, otras con contenedor estrecho para texto largo.

**Sobre elementos visuales:**

5. **Máximo 4 icon-cards por sección.** Si hay que mostrar 8 servicios, no poner 8 icon-cards iguales. Agrupar, jerarquizar, mostrar los principales y enlazar al resto.

6. **No usar íconos genéricos de librería sin contexto.** Los íconos son funcionales, no decorativos. Si un ícono no añade información, no se usa.

7. **No abusar de bordes redondeados excesivos.** Bordes redondeados sutiles sí (4-8px). Bordes ultra-redondeados tipo "pill" en todo = look de plantilla.

8. **No usar gradientes innecesarios.** El gradiente de la marca (gold) tiene usos específicos y contenidos. No aplicar gradientes decorativos a fondos, botones o secciones enteras sin criterio.

**Sobre contenido visual:**

9. **No poner imágenes decorativas que no comunican nada.** Cada imagen debe tener función: mostrar la oficina, ilustrar un concepto, establecer contexto. Si la imagen podría ser de cualquier empresa, no sirve.

10. **No usar ilustraciones abstractas.** Nada de blobs, formas geométricas flotantes, ni ilustraciones de personajes sin rostro. Eso es marca registrada de sitios generados.

11. **No falsear datos.** Si no hay 500 clientes, no poner 500. Si no hay testimonios reales, no inventar nombres. Datos reales o no hay datos.

**Sobre patrones de sección:**

12. **No usar el hero cliché: texto izquierda + imagen derecha + botón.** Variar el hero. Puede ser full-width con fondo, centrado con tipografía fuerte, o asimétrico con un elemento visual propio.

13. **No repetir "título + subtítulo + 3 cards + CTA" como fórmula universal.** Cada sección tiene estructura propia según su función.

14. **No cerrar todas las secciones con el mismo CTA.** Variar: algunas secciones no necesitan CTA. Otras lo integran de forma contextual, no como botón genérico al final.

15. **No usar "Saiba mais" como texto de botón universal.** Cada CTA dice algo específico: "Fale com um contador", "Abra sua empresa", "Veja nossos serviços". Nunca genérico.

---

## 4. SISTEMA VISUAL BASE

### Tono general

El tono visual del sitio es **sobrio-premium**. No es frío ni austero (eso sería un banco). No es cálido ni juguetón (eso sería una startup). Es el punto donde la seriedad profesional se encuentra con la accesibilidad humana.

Referencia mental: el equivalente visual de una sala de reuniones bien diseñada — materiales de calidad, orden, luz natural, sin excesos pero sin carencias.

### Densidad visual

**Media-baja.** El sitio respira. No hay páginas abarrotadas de elementos. Pero tampoco hay vacíos que se sientan como páginas sin terminar.

| Criterio | Nivel |
|---|---|
| Cantidad de elementos por viewport | Moderada (3-5 elementos principales visibles a la vez) |
| Texto por sección | Conciso. Párrafos cortos (3-4 líneas). Listas cuando ayudan. |
| Imágenes por página | Pocas pero con impacto. Mejor 2 buenas que 6 decorativas. |
| Iconografía | Funcional, no decorativa. Solo cuando ayuda a escanear. |

### Uso del espacio en blanco

**Generoso y deliberado.** El white space no es espacio perdido: es parte de la composición.

- **Entre secciones:** Separación amplia (80-120px desktop, 48-64px mobile). Cada sección tiene aire.
- **Dentro de secciones:** Padding interno generoso. Los contenidos no tocan los bordes.
- **Entre elementos:** Espaciado coherente. Los grupos de elementos relacionados están próximos; los grupos distintos están separados.
- **Alrededor de CTAs:** Los botones de acción tienen espacio suficiente para destacar sin gritar.

### Ritmo visual

El scroll del sitio debe sentirse como una conversación bien estructurada, no como un desfile de diapositivas.

- Alternar secciones de **alta intensidad** (hero, diferencial con datos) con secciones de **baja intensidad** (texto limpio, cita, CTA simple).
- Alternar fondos: no todo blanco, no todo navy. Variación sutil: blanco → cream suave → blanco → navy oscuro → blanco.
- Alternar layouts: centrado → asimétrico → lista → centrado.
- Los momentos de pausa visual (spacers, transiciones de fondo) son deliberados.

### Equilibrio elegancia-claridad

La elegancia nunca debe comprometer la claridad. Si un elemento es bonito pero confunde, se cambia. La jerarquía de información siempre gana sobre la estética.

Regla: **Si hay que elegir entre que se vea mejor o que se entienda mejor, siempre gana entender.**

### Sensación general de marca

La persona que visita el sitio debe sentir, sin pensarlo conscientemente: "Esta empresa es organizada, seria y sabe lo que hace. No es pretenciosa ni distante, pero tampoco es informal. Me inspira confianza."

---

## 5. PALETA Y USO DIGITAL

### Adaptación de la identidad visual al entorno web

La paleta ya está definida en el brandbook. Aquí se especifica cómo se aplica en pantalla.

### Colores principales

| Token | Hex | Uso web |
|---|---|---|
| `navy-900` | `#0A1628` | Fondos oscuros premium. Header y footer en modo oscuro. Texto sobre fondos claros cuando se busca máximo peso. |
| `navy-800` | `#0A2E5C` | **Color institucional principal.** Botones primarios. Headers. Barras de navegación. Elementos de máxima importancia. |
| `navy-700` | `#0F3D6E` | Hover de elementos navy-800. Fondos de secciones oscuras intermedias. |
| `navy-600` | `#1A5490` | Links activos. Elementos interactivos en estado activo. CTAs secundarios. |
| `navy-400` | `#3A7CC6` | Íconos funcionales. Badges informativos. Links en texto. |
| `navy-200` | `#8AB4E8` | Fondos de estados hover suaves. Bordes decorativos sutiles en modo oscuro. |
| `navy-100` | `#C5DAF2` | Fondos muy suaves para destacar secciones. Bordes de inputs en foco. |
| `navy-50` | `#E8F0FA` | Fondo alternativo para secciones (alternancia con blanco). Tags y badges suaves. |

### Colores secundarios (gold)

| Token | Hex | Uso web |
|---|---|---|
| `gold-800` | `#6B5010` | Texto gold sobre fondos claros (cuando se necesita gold legible). |
| `gold-700` | `#8B6914` | Acentos de texto premium. Labels de importancia. |
| `gold-600` | `#B8942F` | Bordes y líneas decorativas de acento. |
| `gold-500` | `#C9A84C` | **Color de acento principal.** Detalles premium. Líneas decorativas. Hover de elementos gold. Estrellas de rating si aplica. |
| `gold-400` | `#D4B85C` | Hover suave sobre gold-500. |
| `gold-300` | `#E8D48B` | Acentos suaves. Fondos de badges premium. |
| `gold-200` | `#F0E4B8` | Fondos de highlight muy suave. |
| `gold-100` | `#FAF5E4` | **Cream.** Fondo alternativo cálido para secciones. Fondo de tarjetas premium. |

### Neutrales

| Token | Hex | Uso web |
|---|---|---|
| `neutral-900` | `#1A1A2E` | Texto principal sobre fondos claros. |
| `neutral-800` | `#2A2A3E` | Texto de importancia alta (títulos de cards, labels). |
| `neutral-700` | `#3A3A52` | Texto secundario fuerte. |
| `neutral-600` | `#4A5568` | Texto de cuerpo estándar. |
| `neutral-500` | `#5A6B7F` | Texto de soporte (fechas, metadata, captions). |
| `neutral-400` | `#718096` | Placeholders de inputs. Texto terciario. |
| `neutral-300` | `#8A9BB5` | Bordes de inputs en estado default. Separadores suaves. |
| `neutral-200` | `#C8D3E0` | Bordes de cards. Líneas divisorias. |
| `neutral-100` | `#EEF2F7` | Fondo alternativo neutro (alternancia con blanco). Fondo de inputs. |
| `neutral-50` | `#F7F9FC` | Fondo del body en páginas de contenido largo. |
| `white` | `#FFFFFF` | Fondo principal. Cards sobre fondos de color. |

### Colores semánticos

| Token | Hex | Uso web |
|---|---|---|
| `success-500` | `#2EA043` | Mensajes de éxito. Validación de campos correcta. |
| `success-100` | `#E6F9ED` | Fondo de mensajes de éxito. |
| `error-500` | `#CF222E` | Mensajes de error. Validación de campos incorrecta. |
| `error-100` | `#FDE8E8` | Fondo de mensajes de error. |

### Reglas de uso de color

**Navy:**
- Es el color dominante del sitio. Transmite la autoridad y seriedad de DM2.
- Se usa en header, footer, CTAs principales, títulos importantes y secciones institucionales.
- No abusar de fondos navy full-width en exceso (máximo 2 secciones oscuras por página).

**Gold:**
- Es el color de acento. Se usa con **moderación deliberada**.
- Funciona como un detalle de calidad: una línea decorativa, un borde de highlight, un badge, un separador sutil.
- **No** se usa como color de fondo de secciones enteras (excepto `gold-100` cream como fondo suave).
- **No** se usa como color de texto de párrafo (ilegible y fatigante).
- **No** se aplica a más de 1-2 elementos por viewport simultáneamente.

**Fondos de sección (alternancia):**
- Blanco (`#FFFFFF`) — base
- Neutral-50 (`#F7F9FC`) — alternancia neutra sutil
- Navy-50 (`#E8F0FA`) — alternancia azul muy suave
- Gold-100 (`#FAF5E4`) — alternancia cálida (usar con moderación, máx 1 vez por página)
- Navy-900 (`#0A1628`) — sección oscura de impacto (hero, CTA final, diferencial)

**Contraste obligatorio:**
- Texto sobre fondo claro: mínimo `neutral-600` (#4A5568) para cuerpo, `neutral-900` (#1A1A2E) para títulos.
- Texto sobre fondo navy oscuro: `white` (#FFFFFF) o `gold-100` (#FAF5E4).
- Todos los textos deben cumplir WCAG AA (ratio 4.5:1 para texto normal, 3:1 para texto grande).

**CTAs:**
- Botón primario: fondo `navy-800`, texto `white`. Hover: `navy-700`.
- Botón secundario: borde `navy-800`, texto `navy-800`, fondo transparente. Hover: fondo `navy-50`.
- CTA de WhatsApp: fondo verde WhatsApp (#25D366), texto blanco. Respeta la marca WhatsApp.

---

## 6. SISTEMA TIPOGRÁFICO WEB

### Familias tipográficas

| Familia | Rol | Pesos a cargar | Justificación |
|---|---|---|---|
| **Outfit** | Display / Headlines | 500, 600, 700 | Tipografía de identidad. Geométrica, moderna, limpia. Conecta directamente con el logotipo. |
| **Plus Jakarta Sans** | Body / Contenido | 400, 500, 600 | Legible, profesional, con personalidad sutil. No es aburrida ni excéntrica. |
| **Playfair Display** | Acento serif premium | 600, 700 | Se usa con moderación: un titular editorial, una cita, un dato destacado. Nunca como body text. |
| **Sora** | Labels / UI elements | 400, 500, 600 | Para labels en uppercase, tags, badges, metadata pequeña. Limpia y técnica. |

**Regla de carga:** Máximo 4 archivos de fuente en primera carga (critical). Cargar Playfair y Sora como secondary load. Usar `font-display: swap` en todas. Subset latin-ext para caracteres PT-BR (ã, ç, é, ê, í, ó, ô, ú, etc.).

### Jerarquía tipográfica

| Nivel | Familia | Peso | Tamaño desktop | Tamaño mobile | Line-height | Letter-spacing | Uso |
|---|---|---|---|---|---|---|---|
| **H1** | Outfit | 700 | 48-56px | 32-36px | 1.1 | -0.02em | Título principal de página. Uno por página. Impacto. |
| **H2** | Outfit | 600 | 36-40px | 26-30px | 1.15 | -0.01em | Títulos de sección. Estructura la página. |
| **H3** | Outfit | 600 | 28-32px | 22-24px | 1.2 | 0 | Subtítulos. Títulos de cards. Agrupaciones. |
| **H4** | Plus Jakarta Sans | 600 | 22-24px | 18-20px | 1.25 | 0 | Títulos internos. Labels de importancia. |
| **H5** | Plus Jakarta Sans | 600 | 18-20px | 16-18px | 1.3 | 0 | Subtítulos menores. Títulos de FAQ. |
| **H6** | Sora | 600 | 14-16px | 12-14px | 1.4 | 0.05em | Overlines. Labels de sección. Tags uppercase. |
| **Body** | Plus Jakarta Sans | 400 | 16-18px | 16px | 1.6-1.7 | 0 | Texto de lectura. Párrafos. Descripciones. |
| **Body small** | Plus Jakarta Sans | 400 | 14px | 14px | 1.5 | 0 | Captions. Metadata. Fechas. Legales menores. |
| **Label** | Sora | 500 | 12-13px | 11-12px | 1.3 | 0.08em | Tags. Badges. Categorías. Siempre uppercase. |
| **Accent** | Playfair Display | 600 | Variable | Variable | 1.2 | 0 | Citas editoriales. Dato destacado. Máx 1-2 por página. |

### Criterios de legibilidad

- **Largo de línea máximo:** 70-75 caracteres por línea para body text. Contenedor de texto no mayor a ~720px.
- **Párrafos:** Máximo 4-5 líneas por párrafo. Separación entre párrafos visible (1em-1.5em).
- **Contraste:** Todo texto cumple WCAG AA. Texto de cuerpo sobre fondo claro: mínimo `neutral-600`.
- **No justificar texto.** Siempre alinear a la izquierda (o centrado en secciones de impacto).
- **No usar cursiva como recurso extensivo.** Itálica solo para énfasis puntual, nunca párrafos enteros.
- **No subrayar texto que no sea link.**

### Uso de Playfair Display (reglas específicas)

Playfair Display es la tipografía de lujo. Se usa como un condimento, no como ingrediente principal.

- Máximo 1-2 apariciones por página
- Solo en tamaños grandes (24px+)
- Solo para elementos que necesitan destacar como premium: una cita, un dato de antigüedad ("Desde 2003"), un titular editorial en el blog
- Nunca para body text, descripciones, labels ni CTAs
- Siempre con color navy o gold oscuro, nunca en neutral claro

---

## 7. SISTEMA DE IMAGEN

### Fuente de imágenes

Las imágenes se seleccionan manualmente de **Envato Elements** en alta resolución. No se usan generadores de imagen IA ni stock gratuito de baja calidad.

### Estilo fotográfico

| Criterio | Directriz |
|---|---|
| **Tono** | Cálido-neutro. No frío ni azulado. No saturado. Luz natural o luz de ambiente controlada. |
| **Iluminación** | Preferir luz natural o iluminación de ambiente cálida. No flash directo. No iluminación de estudio agresiva. Sombras suaves, no duras. |
| **Escenarios** | Oficinas reales, espacios de trabajo con personalidad, escritorios con documentos y tecnología, reuniones auténticas, espacios urbanos de São Paulo. |
| **Personas** | Si aparecen: actitud natural, no posada. Trabajando, conversando, pensando. Diversidad brasileña real. Vestimenta profesional pero no rígida (sin corbata necesariamente, sin traje obligatorio). |
| **Textura visual** | Materiales de calidad: madera, vidrio, papel, pantallas. Texturas que transmitan profesionalismo y organización. |
| **Nivel de naturalidad** | ALTO. Las fotos deben parecer momentos reales capturados, no sesiones de fotos armadas. |
| **Paleta fotográfica** | Que los tonos de la fotografía complementen navy y gold. Tonos cálidos de madera y luz natural funcionan bien. Evitar fotos con colores dominantes que compitan (rojos fuertes, verdes neón, etc.). |

### Qué evitar en imágenes

| Prohibido | Por qué |
|---|---|
| Personas estrechando manos | Cliché corporativo #1. Genérico al máximo. |
| Sonrisas exageradas mirando a cámara | Falso. Corporativo vacío. |
| Oficinas fake ultra-modernas vacías | No representan una contabilidade real en Vila Mariana. |
| Gráficos y charts en pantallas de stock | Genéricos y decorativos. Si hay datos, deben ser reales. |
| Personas señalando pantallas/pizarras | Cliché de "equipo trabajando". Se siente fabricado. |
| Fotos con filtros excesivos | Ni vintage ni ultra-procesado. Natural. |
| Ilustraciones abstractas (blobs, formas) | Marca registrada de IA y templates. Prohibido. |
| Fotos aéreas de ciudades genéricas | Si es São Paulo, que se reconozca. Si no, no usar. |
| Edificios de cristal tipo Manhattan | DM2 está en Vila Mariana, no en Wall Street. |
| Montajes con laptop/móvil flotando | Estética de SaaS. No corresponde. |

### Cómo integrar imágenes con la marca

- Las imágenes se tratan con ligero ajuste de tono para que complementen la paleta navy/gold/cream.
- Sobre fondos navy, las imágenes pueden tener overlay sutil (`navy-900` al 40-60%) para mantener legibilidad de texto encima.
- Preferir imágenes horizontales (16:9, 3:2) para banners y secciones. Imágenes verticales o cuadradas para thumbnails de blog y avatares.
- Las imágenes nunca son el protagonista por sí solas: siempre acompañan y refuerzan el mensaje del texto.
- Dimensiones explícitas (`width` / `height`) siempre. WebP como formato principal con fallback a JPEG. Lazy loading para below the fold.

### Fotografía propia (recomendación futura)

Si es posible, realizar una sesión fotográfica profesional de:
- La oficina real de DM2 en Vila Mariana
- El equipo real trabajando
- Detalles del espacio (escritorio, documentos, pantallas con software)

Esto reemplazaría gradualmente las fotos de stock y multiplicaría la autenticidad y el E-E-A-T del sitio.

---

## 8. UX SYSTEM

### Principios de experiencia de usuario

**1. Claridad inmediata**
El usuario sabe en 3 segundos dónde está y qué puede hacer. No hay ambigüedad. Los títulos dicen lo que hay. Los botones dicen lo que hacen. La navegación va donde promete.

**2. Navegación limpia**
Menú principal con 5-6 items máximo. Sin mega-menús monstruosos. Dropdowns contenidos. Mobile con hamburger limpio. Cada item de navegación se justifica.

**3. Lectura fácil**
Párrafos cortos. Listas cuando ayudan. Jerarquía tipográfica clara. Largo de línea controlado. Texto que se puede escanear sin leer todo.

**4. Escaneabilidad**
Cada página puede "leerse" en 10 segundos haciendo scroll rápido. Los títulos cuentan la historia. Los datos destacan. Los CTAs se encuentran sin buscar.

**5. Confianza en cada punto de contacto**
Señales de confianza distribuidas naturalmente: años de experiencia, NAP visible, CRC-SP, datos concretos. No concentradas en un solo lugar.

**6. Equilibrio autoridad-cercanía**
El sitio transmite "somos expertos" sin transmitir "somos inaccesibles". El CTA de WhatsApp humaniza. El tono de copy acerca. La estética eleva sin distanciar.

**7. Sensación de control**
El usuario siempre sabe cómo volver (breadcrumbs, logo → home, nav visible). Nunca se siente atrapado. Los formularios no piden datos innecesarios.

**8. No fatigar visualmente**
Sin parallax agresivo. Sin animaciones que fuerzan atención. Sin autoplay de nada. Sin pop-ups intrusivos. Sin sliders que distraigan. El sitio es cómodo de recorrer.

**9. No saturar al usuario**
Cada página tiene un objetivo principal. No intenta hacer todo a la vez. La home distribuye, no acumula. Las páginas de servicio convierten, no catalogan.

### Accesibilidad

- WCAG 2.1 AA como mínimo en todos los componentes
- Contraste verificado en todas las combinaciones de color/texto
- Focus visible en todos los elementos interactivos (teclado)
- Alt text significativo en todas las imágenes
- Skip-to-content link
- Formularios con labels explícitos (no solo placeholder)
- Roles ARIA donde corresponda
- Navegable 100% por teclado

---

## 9. HEADER / NAVIGATION SYSTEM

### Estructura del header

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo DM2]    Serviços ▾   Especialidades ▾   Quem Somos   Blog    [Contato] btn │
└─────────────────────────────────────────────────────────────┘
```

| Elemento | Especificación |
|---|---|
| **Logo** | Logo DM2 a la izquierda. Enlaza a Home. Versión reducida en scroll (si sticky). |
| **Items de nav** | 5 items visibles: Serviços (dropdown), Especialidades (dropdown), Quem Somos, Blog, Contato (botón CTA). |
| **Contato como botón** | Visualmente diferenciado. Fondo `navy-800`, texto `white`. Es el CTA principal de la nav. |
| **Fondo** | Blanco con borde inferior sutil (`neutral-200`) o transparente sobre hero, transicionando a blanco al hacer scroll. |

### Dropdowns

**Serviços dropdown:**
```
├── Contabilidade Empresarial
├── Planejamento Tributário
├── Departamento Pessoal
├── Abertura de Empresas
├── Consultoria Fiscal
├── BPO Financeiro
├── Imposto de Renda
└── Contabilidade para MEI
     ─────────────────────
     Ver todos os serviços →
```

**Especialidades dropdown:**
```
├── Para Advogados
├── Para Médicos
├── Para Negócios Digitais
├── Para Empregador Doméstico
└── Para Prestadores de Serviço
```

Los dropdowns son limpios, con padding generoso, tipografía clara, sin íconos innecesarios. Aparecen con transición suave (150-200ms), sin delay molesto ni animación excesiva.

### Sticky header

**Sí, sticky**, pero con comportamiento inteligente:
- Al hacer scroll hacia abajo: el header se oculta suavemente (no estorba la lectura).
- Al hacer scroll hacia arriba: el header reaparece (el usuario quiere navegar).
- En la parte superior de la página: visible completo.
- Cuando reaparece: versión compacta (menor altura, logo más pequeño si aplica).

### Comportamiento mobile

```
┌──────────────────────────────┐
│  [Logo DM2]          [☰]    │
└──────────────────────────────┘
```

- Hamburger menu a la derecha.
- Al abrir: panel lateral o fullscreen con items de nav organizados en lista limpia.
- Serviços y Especialidades como acordeones dentro del menú mobile.
- Botón "Contato" destacado al final del menú mobile.
- Botón de WhatsApp fijo en mobile (floating action button, esquina inferior derecha).

### Relación nav con arquitectura

La nav refleja exactamente la arquitectura congelada:
- "Serviços" agrupa los 8 servicios bajo `/servicos/`
- "Especialidades" agrupa los 5 nichos bajo `/para/`
- No se mezclan servicios y nichos en el mismo dropdown (separación conceptual clara, como se definió en la arquitectura)

---

## 10. FOOTER SYSTEM

### Estructura del footer

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                       │
│  COL 1: DM2              COL 2: Serviços       COL 3: Especialidades │
│  ─────────────           ────────────────       ──────────────────── │
│  Breve descripción       Contab. Empresarial    Para Advogados       │
│  (2 líneas máx)          Planej. Tributário     Para Médicos         │
│  NAP completo            Dept. Pessoal          Para Neg. Digitais   │
│  Horário                 Abertura de Empresas   Para Empr. Doméstico │
│  Tel: (11) 2749-7332     Consultoria Fiscal     Para Prest. Serviço  │
│                          BPO Financeiro                              │
│  [Icons redes sociales]  Imposto de Renda       COL 4: Institucional │
│                          Contab. para MEI       ──────────────────── │
│                                                 Quem Somos           │
│                                                 Blog                 │
│                                                 Contato              │
│                                                 Privacidade          │
│                                                 Termos               │
│                                                                       │
│─────────────────────────────────────────────────────────────────────│
│  © 2003-2026 DM2 Contabilidade  •  CRC-SP [nº]  •  Vila Mariana, SP │
└─────────────────────────────────────────────────────────────────────┘
```

### Especificaciones

| Elemento | Detalle |
|---|---|
| **Fondo** | `navy-900` (#0A1628). Footer oscuro premium. |
| **Texto** | `white` para títulos de columna, `neutral-300` para links y datos. |
| **Líneas gold** | Línea decorativa sutil en gold (`gold-500`) como separador superior del footer o underline de títulos de columna. Uso mínimo. |
| **NAP** | Dirección completa, teléfono con link `tel:`, horario. Idéntico al schema y GBP. |
| **Redes sociales** | Íconos discretos. Solo redes que DM2 usa activamente. Sin íconos de redes vacías. |
| **CTA** | No hay CTA agresivo en el footer. El footer es cierre institucional, no zona de venta. La información de contacto ya es suficiente invitación. |
| **Copyright** | "© 2003-2026 DM2 Contabilidade" (mostrando los años de historia). |
| **CRC-SP** | Si está disponible, mostrar número de registro. Señal de autoridad profesional. |
| **Barra inferior** | Barra con copyright, CRC y créditos. Tipografía `body-small`, tono discreto. |

### Footer mobile

- Las 4 columnas se apilan verticalmente.
- COL 1 (DM2 + NAP) siempre visible primero.
- COL 2-4 pueden ser acordeones colapsados (opcional) o listas visibles según longitud.
- Botón de WhatsApp floating sigue visible sobre el footer.

---

## 11. SISTEMA DE SECCIONES

### Catálogo de tipos de sección

Cada tipo de sección tiene un propósito, reglas de uso y variaciones para evitar repetición.

---

**HERO INSTITUCIONAL**

| Atributo | Valor |
|---|---|
| **Función** | Primera impresión. Declara quién es DM2 y qué puede hacer el usuario. |
| **Cuándo usarla** | Solo en Home. Las páginas internas tienen encabezados más contenidos. |
| **Composición** | Full-width. Fondo navy oscuro o imagen con overlay. Título en Outfit 700 grande. Subtítulo en Plus Jakarta Sans. CTA principal. |
| **Variación** | No usar el cliché "texto izquierda + imagen derecha". Preferir: centrado con fondo de ambiente, o asimétrico con elemento visual propio de la marca. |
| **Altura** | 70-85vh en desktop. Suficiente para impactar sin forzar scroll completo. En mobile: auto, adaptado al contenido. |
| **Qué evitar** | Slider/carrusel (nadie pasa del primer slide). Video de fondo (peso innecesario). Animación de texto tipo máquina de escribir. |

---

**ENCABEZADO DE PÁGINA INTERNA**

| Atributo | Valor |
|---|---|
| **Función** | Identificar la página. Establecer contexto rápido. |
| **Cuándo usarla** | Servicios, nichos, quem somos, contato, blog. |
| **Composición** | Más contenido que el hero. Fondo suave (cream, navy-50, o blanco). H1 + breve texto introductorio. Breadcrumb visible. |
| **Variación** | Puede tener una imagen lateral sutil, un ícono de la marca, o solo tipografía sobre fondo limpio. |
| **Altura** | Compacto. 30-40vh máximo. No es un hero, es una introducción. |

---

**BARRA DE CREDIBILIDAD**

| Atributo | Valor |
|---|---|
| **Función** | Establecer confianza con datos concretos. |
| **Cuándo usarla** | Home (justo después del hero). Opcionalmente en Quem Somos. |
| **Composición** | Barra horizontal con 3-4 datos clave. Números grandes (Outfit 700), labels pequeños (Sora uppercase). |
| **Datos sugeridos** | Años de experiencia, cantidad de clientes, porcentaje de retención, tiempo de respuesta. Solo datos reales. |
| **Fondo** | Puede estar sobre el hero (como overlay inferior) o como sección independiente compacta. |
| **Qué evitar** | No inflar números. No inventar datos. Si no hay dato real, no poner el bloque. |

---

**BLOQUE DE SERVICIOS**

| Atributo | Valor |
|---|---|
| **Función** | Mostrar los servicios principales y distribuir tráfico. |
| **Cuándo usarla** | Home (servicios destacados, no todos). Índice `/servicos`. |
| **Composición en Home** | Mostrar 3-4 servicios principales con breve descripción y enlace. No los 8. |
| **Composición en índice** | Mostrar todos los 8, con más detalle. Variación visual (no todos como cards idénticas). |
| **Variación** | Home: layout asimétrico o grid de 2+2. Índice: lista con descripción o grid variado. |
| **Qué evitar** | Grid de 8 icon-cards iguales. Es el patrón más genérico y predecible que existe. |

---

**BLOQUE DE NICHOS / ESPECIALIDADES**

| Atributo | Valor |
|---|---|
| **Función** | Mostrar que DM2 entiende segmentos específicos. Distribuir a páginas de nicho. |
| **Cuándo usarla** | Home (destacados). Nav (dropdown). |
| **Composición** | Diferente del bloque de servicios para no repetir patrón. Puede ser: lista horizontal con nombres, tarjetas con imagen/contexto, o sección con texto + enlaces. |
| **Qué evitar** | Que se vea exactamente igual que el bloque de servicios. Son capas diferentes del sitio. |

---

**BLOQUE DE DIFERENCIAL INSTITUCIONAL**

| Atributo | Valor |
|---|---|
| **Función** | Explicar por qué elegir DM2 y no otra contabilidade. |
| **Cuándo usarla** | Home. Puede adaptarse en Quem Somos. |
| **Composición** | No es una lista de checkmarks genéricos ("✓ Atendimento personalizado"). Es una narrativa con argumentos reales. Puede combinar texto fuerte + dato concreto + imagen. |
| **Variación** | Layout asimétrico: texto largo a un lado, elemento visual (dato destacado en Playfair, imagen de la oficina) al otro. O texto centrado con datos intercalados. |
| **Qué evitar** | Lista de "diferencias" que cualquier empresa contable podría poner. "Experiência", "Compromisso", "Qualidade" sin sustancia. |

---

**BLOQUE DE SOFTWARE/HERRAMIENTA FUTURA**

| Atributo | Valor |
|---|---|
| **Función** | Mencionar de forma sutil que DM2 tiene tecnología propia. |
| **Cuándo usarla** | Home (como bloque contenido entre diferencial y prueba social). |
| **Composición actual** | Bloque compacto. Máximo 2-3 líneas de texto + un visual abstracto (no screenshot inventado). |
| **Cuándo expandir** | Cuando exista información real del software. Entonces puede crecer a sección más robusta o página propia. |
| **Qué evitar** | Inventar features. Poner mockups falsos. Usar estética SaaS. Darle protagonismo excesivo. |

---

**BLOQUE DE PROVA SOCIAL / CONFIANÇA**

| Atributo | Valor |
|---|---|
| **Función** | Terceros validando a DM2. |
| **Cuándo usarla** | Home. Opcionalmente en Contato. |
| **Composición** | Testimonios reales (si existen), logos de asociaciones (CRC-SP, SESCON), certificaciones. |
| **Si no hay testimonios reales** | No inventar. Sustituir con: asociaciones profesionales, años de operación, datos verificables. |
| **Qué evitar** | Testimonios con foto de stock. Estrellas de rating sin fuente. Logos de empresas que no son clientes reales. |

---

**BLOQUE DE BLOG DESTACADO**

| Atributo | Valor |
|---|---|
| **Función** | Mostrar contenido reciente. Demostrar actividad y expertise. Distribuir tráfico al blog. |
| **Cuándo usarla** | Home (parte inferior). |
| **Composición** | 3 artículos recientes. Card con título, categoría (label), fecha, extracto breve. |
| **Qué evitar** | Más de 3 (satura). Mostrar artículos sin fecha (parece abandonado). Cards sin categoría (sin contexto). |

---

**BLOQUE FAQ**

| Atributo | Valor |
|---|---|
| **Función** | Responder preguntas frecuentes. Reforzar citabilidad por IA. SEO de contenido. |
| **Cuándo usarla** | Páginas de servicio (obligatorio). Páginas de nicho (obligatorio). Blog posts (obligatorio). Home (opcional). |
| **Composición** | Acordeón limpio. Pregunta visible, respuesta colapsada. Sin bordes excesivos. Tipografía clara. |
| **Cantidad** | 3-5 preguntas por sección FAQ. No más de 7. |
| **Qué evitar** | FAQs genéricas ("O que é contabilidade?"). Las preguntas deben ser específicas y relevantes. |

---

**BLOQUE DE CTA / CONTATO**

| Atributo | Valor |
|---|---|
| **Función** | Invitar a la acción. Cerrar el argumento de la página. |
| **Cuándo usarla** | Al final de cada página (excepto Contato y Obrigado). |
| **Composición** | Varía según la página. En Home: sección con fondo navy oscuro, título impactante, CTA claro. En servicios: más contenido, con formulario simplificado o enlace a contato. En blog: CTA contextual discreto. |
| **Variación** | No todas las páginas cierran igual. Home: impactante. Servicio: práctico. Blog: natural. |
| **Qué evitar** | Mismo bloque CTA copiado idéntico en todas las páginas. Cada cierre debe sentirse apropiado para su contexto. |

---

### Cómo variar la composición entre páginas

Regla de no repetición: si una página usa "grid 3 columnas" para servicios, la siguiente sección usa otra estructura. El flujo de una página completa debería alternar entre:

- Composición centrada con texto
- Composición asimétrica con imagen + texto
- Lista o grid de elementos
- Datos / barra compacta
- Composición centrada de cierre

No hay dos páginas con exactamente la misma secuencia de bloques. Cada página tiene su narrativa visual propia dentro del sistema.

---

## 12. HOME UX STRUCTURE

### Orden de bloques y lógica narrativa

La home cuenta una historia en scroll. Cada bloque responde a una pregunta del visitante:

| Orden | Bloque | Pregunta que responde | Función |
|---|---|---|---|
| 1 | **Hero institucional** | "¿Quién es esta empresa y qué hace?" | Declarar identidad + CTA principal |
| 2 | **Barra de credibilidad** | "¿Son serios? ¿Cuánta experiencia tienen?" | Establecer confianza con datos |
| 3 | **Servicios destacados** | "¿Qué pueden hacer por mí?" | Mostrar los 3-4 servicios principales |
| 4 | **Diferencial institucional** | "¿Por qué elegirlos a ellos?" | Argumentar la diferencia real |
| 5 | **Especialidades (nichos)** | "¿Entienden mi sector?" | Mostrar que DM2 se especializa |
| 6 | **Software/herramienta** (placeholder) | "¿Tienen tecnología propia?" | Mencionar innovación sin inflar |
| 7 | **Prueba social** | "¿Quién más confía en ellos?" | Testimonios, asociaciones, datos |
| 8 | **Blog destacado** | "¿Saben de lo que hablan?" | Demostrar expertise con contenido |
| 9 | **CTA final** | "¿Cómo los contacto?" | Cierre de conversión |

### Lógica visual

- **Bloques 1-2:** Alta intensidad visual. Hero con fondo oscuro, barra de datos compacta. Impacto inmediato.
- **Bloques 3-4:** Intensidad media. Fondos claros. Contenido sustancial. Lectura cómoda.
- **Bloque 5:** Variación visual (fondo cream o navy-50 para romper monotonía).
- **Bloque 6:** Compacto y contenido. No protagoniza. Fondo neutro.
- **Bloques 7-8:** Intensidad media-baja. Prueba y contenido. Tonos claros.
- **Bloque 9:** Cierre fuerte. Fondo navy oscuro. CTA con contraste.

### Alternancia de fondos sugerida

```
Hero:            navy-900 / imagen con overlay
Credibilidad:    white (o integrada en hero como overlay)
Servicios:       white
Diferencial:     neutral-50 o gold-100
Especialidades:  white
Software:        navy-50
Prueba social:   white
Blog:            neutral-50
CTA final:       navy-900
```

### Cómo evitar sobrecarga

- Máximo 9 bloques en home. Si algo no aporta, se elimina.
- Cada bloque tiene máximo 1 CTA (excepto hero que puede tener primario + secundario).
- No todos los bloques necesitan imagen. Algunos son solo tipografía + datos.
- El scroll total de la home no debería exceder 5-6 viewports en desktop.

### Software/herramienta sin romper el foco

- Ocupa 1 bloque de baja intensidad visual
- Está entre diferencial y prueba social: después de que el usuario ya entiende qué hace DM2 y por qué es diferente
- Máximo 1 título (H2), 2-3 líneas de texto, quizás un visual abstracto de la marca
- No tiene CTA propio en esta fase (no hay a dónde enviar al usuario todavía)
- Cuando haya info real, puede expandirse sin alterar el orden general

---

## 13. PÁGINAS DE SERVICIO — UX STRUCTURE

### Estructura base de una página de servicio premium

Cada página de servicio sigue esta estructura, pero con variaciones en composición para que no se sientan clones.

| Orden | Bloque | Función | Composición |
|---|---|---|---|
| 1 | **Encabezado de servicio** | Identificar el servicio. H1 + contexto breve. Breadcrumb. | Fondo suave. Compacto. |
| 2 | **Dolor / Contexto** | "¿Por qué necesitas esto?" Hablar del problema real que el cliente enfrenta. | Texto centrado o asimétrico con dato/imagen. 2-3 párrafos. |
| 3 | **Solución DM2** | "Así es como lo resolvemos." Explicar qué hace DM2 con este servicio. Específico. | Definición autocontenida (citable por IA) + detalles. |
| 4 | **Diferencial DM2** | "¿Por qué con DM2 y no con cualquier otro?" Lo que hace diferente a DM2 en este servicio. | Breve. 2-3 puntos. No lista de checkmarks genéricos. |
| 5 | **Processo** (opcional) | Paso a paso de cómo funciona. Reduce la incertidumbre. | Lista numerada o timeline visual. 3-5 pasos. |
| 6 | **FAQ** | Preguntas frecuentes del servicio. Citabilidad por IA. | Acordeón. 3-5 preguntas. |
| 7 | **Artículos relacionados** | Enlazar blog posts relevantes. Internal linking. | 2-3 cards de blog. |
| 8 | **CTA de cierre** | "Fale com um contador." Convertir. | Fondo navy o strip compacto. Formulario simplificado o enlace a contato. |

### Variaciones entre servicios

No todas las páginas de servicio necesitan todos los bloques. Por ejemplo:

- **Abertura de Empresas:** Incluye "Processo" con paso a paso claro (el usuario quiere saber cómo funciona).
- **Imposto de Renda:** Puede incluir una tabla con plazos y fechas. Más datos, menos narrativa.
- **BPO Financeiro:** Puede enfatizar el "Diferencial" (por qué tercerizar con DM2 vs hacer internamente).
- **Contabilidade para MEI:** Puede empezar con "dolor" más fuerte (el MEI que no sabe qué obligaciones tiene).

La variación está en la intensidad y énfasis de cada bloque, no en inventar estructuras completamente diferentes.

---

## 14. PÁGINAS DE NICHO — UX STRUCTURE

### Cómo diferenciarse de las páginas de servicio

Las páginas de nicho NO son copias de páginas de servicio con diferente título. Son páginas con un ángulo distinto:

| Página de servicio | Página de nicho |
|---|---|
| "Esto es lo que hacemos" | "Entendemos tu sector" |
| Enfocada en el servicio | Enfocada en el público |
| Describe un proceso | Describe un contexto |
| Keywords de servicio | Keywords de nicho + servicio |

### Estructura base de una página de nicho

| Orden | Bloque | Función | Diferencia vs servicio |
|---|---|---|---|
| 1 | **Encabezado de nicho** | "Contabilidade para [nicho]". H1. Breadcrumb. | H1 habla del público, no del servicio. |
| 2 | **Contexto del nicho** | Los desafíos contables específicos de ese segmento. | No es "dolor genérico". Son problemas reales del nicho: tributación de PJ médica, ISS de escritórios de advocacia, etc. |
| 3 | **Cómo DM2 atiende este nicho** | Qué hace DM2 de diferente para este segmento. | Más específico. Menciona regímenes, obligaciones, y particularidades del nicho. |
| 4 | **Servicios relevantes** | Enlaces a los servicios que este nicho más usa. | No lista todos los servicios. Solo 2-3 más relevantes para ese público. |
| 5 | **Dados e diferenciais do segmento** | Dato concreto sobre el nicho (ej: "médicos podem reduzir até X% pagando como PJ através de equiparação hospitalar"). | Bloque citable por IA. Dato específico del nicho. |
| 6 | **FAQ do segmento** | Preguntas específicas del nicho. | "Qual o melhor regime tributário para médicos?" no es la misma FAQ que la de la página general. |
| 7 | **CTA de cierre** | Adaptado al nicho. | "Fale com um contador especializado em [nicho]" |

### Variaciones visuales respecto a servicios

Para que las páginas de nicho no se sientan iguales a las de servicio:

- **Encabezado:** Puede incluir una imagen contextual del sector (foto de consultorio, oficina de abogados, espacio de trabajo digital).
- **Layout general:** Más narrativo y menos estructurado que la página de servicio. Puede tener secciones de texto más largas intercaladas con datos.
- **Color de acento:** Puede usar gold-100 como fondo de sección para diferenciarse visualmente del patrón de servicios.
- **Tono:** Más directo y personalizado. "Você, advogado..." vs. el tono más institucional de las páginas de servicio.

---

## 15. BLOG UX STRUCTURE

### Portada del blog (`/blog`)

| Elemento | Especificación |
|---|---|
| **Encabezado** | H1: "Blog" o "Conteúdo". Breve texto introductorio. Breadcrumb. |
| **Filtro de categorías** | Barra horizontal con tabs o pills: Todos, Tributário, Dept. Pessoal, Abertura, MEI, Legislação, Gestão Financeira. Activa por defecto: "Todos". |
| **Grid de artículos** | Artículo destacado (más grande) + grid de artículos recientes debajo. No todos del mismo tamaño. |
| **Paginación** | Si >10 artículos por página. Paginación numérica limpia, no "cargar más" infinito. |
| **Sin sidebar** | El blog no tiene sidebar. Layout limpio. Las categorías están en la barra de filtros superior. |

### Tarjetas de artículos (blog cards)

| Elemento | Especificación |
|---|---|
| **Imagen** | Thumbnail horizontal (16:9 o 3:2). Opcional: algunas cards sin imagen para variar. |
| **Categoría** | Label en Sora uppercase. Color `navy-400` o como badge sobre fondo `navy-50`. |
| **Título** | H3 en Outfit 600. Conciso. |
| **Extracto** | 2 líneas máximo en Plus Jakarta Sans 400. |
| **Fecha** | Body small. Color `neutral-500`. |
| **Autor** | Opcional en card (visible siempre en el artículo). Si aparece: nombre + cargo. |
| **Hover** | Elevación sutil (shadow) o desplazamiento mínimo. No cambio de color agresivo. |

### Página de artículo individual

| Orden | Elemento | Especificación |
|---|---|---|
| 1 | **Breadcrumb** | Home > Blog > [Categoría] > [Título] |
| 2 | **Categoría** | Label Sora uppercase. |
| 3 | **H1** | Título del artículo. Outfit 700. Tamaño generoso. |
| 4 | **Metadata** | Autor (nombre + cargo) • Fecha de publicación • Fecha de última actualización • Tiempo de lectura estimado |
| 5 | **Imagen de portada** | Opcional. Si existe: full-width del contenedor. Aspect ratio 16:9 o 2:1. |
| 6 | **Tabla de contenidos** | Si artículo >2000 palabras. Lateral fija (sticky) en desktop. Colapsable en mobile. |
| 7 | **Cuerpo del artículo** | Contenedor estrecho (~720px). Plus Jakarta Sans 400 a 17-18px. Interlineado 1.7. Headings H2/H3 en Outfit. Listas, tablas, datos destacados. |
| 8 | **FAQ** | 3-5 preguntas al final del cuerpo. Acordeón. |
| 9 | **Autor bio** | Bloque con nombre, cargo, mini bio (2-3 líneas). Avatar si disponible. "Revisado por [nombre], [cargo]" si aplica. |
| 10 | **Artículos relacionados** | 3 cards de artículos relacionados. |
| 11 | **CTA contextual** | Discreto. "Precisa de ajuda com [tema]? Fale com a DM2." No intrusivo. |

### Estética editorial

El blog de DM2 debe sentirse como un blog de firma seria, no como un blog de marketing de contenidos genérico.

- Tipografía generosa y legible (17-18px body)
- Contenedor estrecho para lectura cómoda
- Headings con peso visual claro
- Datos y cifras destacados (puede usar Playfair Display para un dato grande)
- Citas o highlights en bloque con borde izquierdo gold
- Tablas limpias y bien formateadas cuando hay datos comparativos
- Sin pop-ups de newsletter. Sin banners intrusivos. Sin distracciones.

---

## 16. CONTACTO UX STRUCTURE

### Estructura de la página

| Orden | Elemento | Función |
|---|---|---|
| 1 | **Encabezado** | H1 + breadcrumb. Breve texto contextual: "Precisa de contabilidade séria? Fale com a gente." |
| 2 | **Layout principal** | Dos columnas: formulario (izq) + datos de contacto (der). En mobile: formulario arriba, datos debajo. |
| 3 | **Formulario** | Ver campos abajo. |
| 4 | **Datos de contacto** | NAP completo, teléfono click-to-call, WhatsApp click-to-chat, horario, mapa embebido de Google. |
| 5 | **Señales de confianza** | Datos debajo del formulario o en la columna de datos: "Atendemos em São Paulo desde 2003", CRC-SP si disponible. |

### Campos del formulario

| Campo | Tipo | Requerido | Justificación |
|---|---|---|---|
| Nome | text | Sí | Identificación básica. |
| E-mail | email | Sí | Canal de contacto principal. |
| Telefone / WhatsApp | tel | Sí | Canal de respuesta rápida. Formato brasileño. |
| Empresa | text | No | Contexto del lead. No obligatorio para no forzar a PF. |
| Assunto / Serviço de interesse | select | No | Ayuda a DM2 a priorizar. Opciones: lista de servicios + "Outro". |
| Mensagem | textarea | No | Espacio libre. No obligatorio para reducir fricción. |
| Honeypot field | hidden | — | Anti-bot invisible. |

### Tono del formulario

- Labels claros en PT-BR natural: "Seu nome", "Seu e-mail", "Telefone com DDD"
- Placeholders útiles (no redundantes con el label): "Ex: (11) 99999-0000"
- Botón de envío: "Enviar mensagem" (no "Submit", no "Enviar", no "Saiba mais")
- Mensaje de éxito: redirect a `/obrigado` con confirmación clara

### Equilibrio conversión-seguridad

- Pocos campos obligatorios (3) = baja fricción
- Sin CAPTCHA visible inicialmente (honeypot + rate limiting)
- Cloudflare Turnstile solo como fallback si hay abuso
- Validación inline (feedback al usuario mientras llena, no solo al enviar)
- Mensajes de error claros y específicos: "Por favor, insira um e-mail válido" (no "Campo inválido")

### Señales de confianza en contacto

- Dirección física visible (demuestra que DM2 existe y tiene oficina real)
- Mapa de Google embebido (confirma ubicación)
- Teléfono con click-to-call
- Horario de atendimento visible
- Sin presión: no hay "Responderemos en 24h" a menos que sea verdad y se cumpla

---

## 17. SISTEMA DE COMPONENTES CONCEPTUAL

### Componentes a desarrollar

Listados por orden de importancia. No se construyen todavía — solo se define qué son, cómo se ven y cuándo se usan.

---

**BUTTONS**

| Variante | Descripción | Uso |
|---|---|---|
| **Primary** | Fondo `navy-800`, texto `white`, border-radius 6px, padding 14px 28px. Hover: `navy-700`. | CTAs principales: "Fale conosco", "Enviar mensagem". |
| **Secondary** | Borde `navy-800`, texto `navy-800`, fondo transparente. Hover: fondo `navy-50`. | CTAs secundarios: "Ver serviços", "Leia mais". |
| **Ghost** | Sin borde ni fondo. Texto `navy-600`. Hover: underline o texto `navy-800`. | Enlaces de navegación dentro de contenido. |
| **WhatsApp** | Fondo #25D366, texto `white`, ícono WhatsApp. | CTA de WhatsApp. |
| **Disabled** | Fondo `neutral-200`, texto `neutral-400`. | Estado deshabilitado de cualquier botón. |

Reglas:
- Todos los botones tienen `min-height: 44px` (accesibilidad mobile tap target).
- Texto de botón siempre específico. Nunca "Saiba mais" genérico.
- Máximo 2 botones visibles simultáneamente (primario + secundario).

---

**CARDS**

| Variante | Descripción | Uso |
|---|---|---|
| **Service card** | Título, breve descripción, enlace. Fondo white sobre sección con fondo sutil. Hover con sombra. | Índice de servicios, servicios en home. |
| **Blog card** | Imagen (opcional), categoría (label), título, extracto, fecha. | Índice de blog, artículos relacionados, blog en home. |
| **Niche card** | Nombre del nicho + breve contexto. Puede tener imagen. | Home, sección de especialidades. |
| **Stat card** | Número grande + label. Para barra de credibilidad si se diseña como cards. | Barra de datos en home. |

Reglas:
- Border-radius consistente: 8px.
- Sombra sutil en hover, no en estado default (excepto si están sobre fondo con color).
- Sin bordes gruesos. Bordes de 1px `neutral-200` como máximo si se necesita definición.

---

**BADGES / LABELS**

| Variante | Descripción | Uso |
|---|---|---|
| **Category badge** | Sora uppercase 12px, padding 4px 12px, fondo `navy-50`, texto `navy-600`. | Categorías de blog en cards y artículos. |
| **Status badge** | Similar pero con colores semánticos (success, error). | Formularios, mensajes de sistema. |

---

**FAQ ACCORDION**

| Especificación | Valor |
|---|---|
| **Pregunta** | Plus Jakarta Sans 600 a 16-18px. Clickable. Ícono de flecha/plus a la derecha. |
| **Respuesta** | Plus Jakarta Sans 400 a 16px. Color `neutral-600`. Padding interno generoso. |
| **Separadores** | Línea sutil `neutral-200` entre items. |
| **Animación** | Expand/collapse suave (200-300ms ease). Sin bounce. |
| **Estado** | Primer item abierto por defecto. Solo uno abierto a la vez (accordion) o todos independientes (evaluar). |

---

**FORMS**

| Especificación | Valor |
|---|---|
| **Input text** | Borde `neutral-300`, border-radius 6px, padding 12px 16px. Fondo `white`. Focus: borde `navy-600`, sombra sutil `navy-100`. |
| **Label** | Plus Jakarta Sans 500 a 14px. Color `neutral-800`. Siempre visible (no solo placeholder). |
| **Placeholder** | Color `neutral-400`. Texto de ayuda, no repetición del label. |
| **Select** | Mismo estilo que input. Flecha personalizada. |
| **Textarea** | Mismo estilo. Min-height 120px. Resize vertical permitido. |
| **Error state** | Borde `error-500`. Mensaje debajo del campo en `error-500`, tamaño `body-small`. |
| **Success state** | Borde `success-500` brevemente. |

---

**BREADCRUMBS**

| Especificación | Valor |
|---|---|
| **Tipografía** | Body small (14px) Plus Jakarta Sans 400. |
| **Color** | `neutral-500` para items anteriores. `neutral-800` para item actual (sin link). |
| **Separador** | `>` o `/` en `neutral-400`. |
| **Posición** | Debajo del header, encima del H1. |

---

**SECTION DIVIDERS**

| Variante | Descripción |
|---|---|
| **Spacing divider** | Sin línea visible. Solo espaciado (80-120px desktop). |
| **Subtle line** | Línea 1px `neutral-200` centrada. Ancho parcial (60% del contenedor). |
| **Gold accent line** | Línea 2px `gold-500`. Muy corta (40-80px). Centrada. Usada con moderación (máx 1-2 por página). |

---

**CTA STRIPS**

| Especificación | Valor |
|---|---|
| **Composición** | Full-width. Fondo `navy-900`. Título en `white` (Outfit 600). CTA button primary invertido (fondo `white`, texto `navy-800`) o CTA gold. |
| **Uso** | Cierre de páginas de servicio, nicho y home. |
| **Variaciones** | Con y sin subtexto. Con formulario inline o solo botón. |

---

**BLOG CONTENT ELEMENTS**

| Elemento | Especificación |
|---|---|
| **Blockquote** | Borde izquierdo 3px `gold-500`. Padding-left 24px. Plus Jakarta Sans 500 italic a 18px. Color `neutral-700`. |
| **Highlighted data** | Número grande en Playfair Display 600. Label en Sora uppercase debajo. Centrado. Para datos importantes dentro de artículos. |
| **Table** | Headers en fondo `navy-50`, texto `navy-800` Sora 500. Celdas en white con bordes `neutral-200`. |
| **Code/legal reference** | Fondo `neutral-100`. Border-radius 4px. Mono font o body-small. Para referencias a legislação. |

---

**TRUST BLOCKS**

| Variante | Descripción |
|---|---|
| **Testimonial** | Cita real + nombre + empresa. Sin foto de stock. Si hay foto real del cliente, usarla. |
| **Association logos** | Logo CRC-SP, SESCON-SP u otras asociaciones. En grayscale sutil con hover a color. |
| **Data point** | Dato grande (Outfit 700) + contexto (Plus Jakarta Sans 400). Ej: "22+ anos de experiência". |

---

## 18. MICROINTERACCIONES Y DETALLE

### Nivel correcto de animación

El sitio debe sentirse **vivo pero no inquieto**. Las microinteracciones son sutiles y funcionales, nunca decorativas o llamativas.

### Hover

| Elemento | Comportamiento hover |
|---|---|
| **Botones** | Cambio de color suave (150ms). Primary: navy-800 → navy-700. Secondary: fondo transparente → navy-50. |
| **Cards** | Elevación sutil (box-shadow aumenta) + leve desplazamiento hacia arriba (2-4px). Transición 200ms. |
| **Links de texto** | Underline aparece o cambia de color (navy-400 → navy-600). |
| **Nav items** | Color de texto cambia sutilmente. Sin background agresivo. |
| **Imágenes en cards** | Ligero zoom (scale 1.02-1.03) dentro del contenedor. Overflow hidden. |

### Motion y transiciones

| Elemento | Comportamiento |
|---|---|
| **Cambio de página** | Sin transición elaborada. Carga directa y rápida. La velocidad es la mejor transición. |
| **Scroll reveals** | Elementos aparecen con fade-in + translate sutil (10-20px desde abajo). Duración 400-500ms. Easing: ease-out. Se activan UNA vez (no cada vez que se scrollea). |
| **Dropdown nav** | Aparece con fade + translate de 8px desde arriba. 150ms. Sin bounce. |
| **Accordion FAQ** | Expand height suave. 200-300ms. Ease-in-out. |
| **Formulario focus** | Borde cambia de color + sombra sutil aparece. 150ms. |
| **Mensajes de éxito/error** | Aparecen con fade-in. 200ms. |

### Lo que NO se usa

| Prohibido | Por qué |
|---|---|
| Parallax scroll | Pesado, distrae, se siente artificioso. |
| Animaciones de números contando | Cliché de dashboard/startup. |
| Texto que aparece letra por letra | "Cara de IA" pura. |
| Partículas, confetti, efectos de cursor | Innecesario. Peso sin propósito. |
| Scroll-jacking (modificar velocidad de scroll) | Frustrante para el usuario. |
| Auto-play de video o audio | Intrusivo. |
| Animaciones en loop | Distraen y consumen recursos. |
| Transiciones de más de 500ms | Se sienten lentas. |
| Elastic/bounce easing | Se siente juguetón. No es el tono de DM2. |

### Feedback visual

| Acción del usuario | Feedback |
|---|---|
| Click en botón | Estado :active momentáneo (scale 0.98, 100ms). Luego la acción. |
| Envío de formulario | Botón cambia a estado loading (texto cambia a "Enviando..." + spinner sutil). Disabled mientras procesa. |
| Error en campo | Borde rojo + mensaje de error aparece con fade-in debajo del campo. |
| Éxito en envío | Redirect a `/obrigado`. No confetti ni animación celebratoria. |
| Copiado de teléfono/email | Tooltip "Copiado!" que desaparece en 2 segundos. |

---

## 19. REGLAS DE CONSISTENCIA

### Cómo las páginas se sienten parte del mismo sistema sin ser clones

**Elementos que se mantienen constantes (cohesión):**

| Elemento | Regla |
|---|---|
| Header y footer | Idénticos en todas las páginas. |
| Paleta de colores | Mismos tokens en todo el sitio. |
| Tipografía | Mismas familias y jerarquía. |
| Spacing system | Mismo sistema de espaciado (múltiplos de 4px o 8px). |
| Border-radius | Consistente: 6-8px para elementos interactivos. |
| Breadcrumbs | Presente en todas las páginas internas. Mismo formato. |
| CTA style | Mismos estilos de botón en todo el sitio. |
| Tono de copy | Misma voz institucional (humana, seria, clara). |

**Elementos que varían deliberadamente (frescura):**

| Elemento | Variación permitida |
|---|---|
| Layout de sección | Cada página combina layouts diferentes (centrado, asimétrico, grid, lista). |
| Fondo de secciones | Alternancia de colores de fondo varía por página. |
| Tipo de hero/encabezado | Home tiene hero full. Servicios tienen encabezado compacto. Nichos pueden tener imagen. Blog tiene encabezado editorial. |
| Número de bloques | Home: 9. Servicio: 7-8. Nicho: 7. Blog article: 10-11. Contacto: 5. |
| Intensidad de CTA | Home: fuerte. Servicio: práctico. Blog: discreto. Contacto: innecesario (ya es la página de conversión). |
| Uso de Playfair Display | Home: en dato destacado. Blog: en cita. Quem Somos: en "Desde 2003". Cada aparición es diferente. |
| Uso de gold | Home: línea decorativa + dato. Servicio: separador sutil. Blog: borde de blockquote. Varía en proporción y forma. |

### Regla de variación controlada

Cada página del sitio comparte el "ADN visual" (colores, tipos, spacing, componentes) pero tiene su propia "personalidad de composición". La persona que navega siente que todo es coherente pero nunca piensa "esta sección la vi igual en la otra página".

Para lograrlo:
- Antes de diseñar una página, revisar las páginas ya diseñadas y evitar replicar la misma secuencia de layouts.
- Cada página tiene al menos 1 composición de sección que no se repite en otras páginas.
- La home es la más rica visualmente. Las páginas internas son más contenidas pero igualmente cuidadas.

---

## 20. DECISIONES ABIERTAS DEL DIRECTOR

Las siguientes decisiones requieren validación antes de avanzar a desarrollo:

### Decisiones visuales

| Decisión pendiente | Impacto | Urgencia |
|---|---|---|
| **¿Fotografía propia o Envato en primera versión?** | Si hay sesión fotográfica disponible, cambia radicalmente la autenticidad del sitio. Si no, Envato bien seleccionado funciona. | MEDIA — se puede lanzar con Envato y reemplazar después. |
| **¿Fotos de equipo real para Quem Somos?** | Afecta E-E-A-T directamente. Fotos reales del equipo son mucho más valiosas que cualquier stock. | ALTA — afecta credibilidad. |
| **¿Logo en header: versión completa o ícono?** | En mobile y sticky header se necesita versión reducida. ¿Existe versión horizontal compacta del logo? | MEDIA |
| **¿Hay redes sociales activas?** | Determina si hay íconos de redes en footer y si se incluyen en schema `sameAs`. No poner íconos de redes vacías o abandonadas. | MEDIA |

### Decisiones de componentes

| Decisión pendiente | Impacto | Urgencia |
|---|---|---|
| **¿Testimonios reales disponibles?** | Si hay testimonios, se activa el bloque de prueba social con citas reales. Si no, se sustituye con señales de confianza alternativas (asociaciones, datos, CRC). | ALTA — cambia la composición de Home y Contato. |
| **¿Google Maps embed o link externo?** | Embed es mejor para UX y SEO local. Pero requiere API key y tiene implicaciones de performance. Link externo es más ligero. | MEDIA |
| **¿Tabla de contenidos en blog: sticky sidebar o colapsable?** | En desktop: sticky sidebar es más funcional. Pero agrega complejidad al layout del blog. | BAJA — se puede iterar después del lanzamiento. |
| **¿WhatsApp floating button en todas las páginas?** | Excelente para conversión en mobile. Pero puede sentirse intrusivo si no se implementa con buen gusto. | ALTA — definir antes de desarrollo de layout. |

### Decisiones de contenido que afectan diseño

| Decisión pendiente | Impacto | Urgencia |
|---|---|---|
| **Datos reales para barra de credibilidad** | Sin datos reales, el bloque no se construye (no inventar). Con datos, es uno de los bloques más valiosos de la home. | ALTA |
| **Contenido del software/herramienta** | Determina el tamaño y estilo del bloque placeholder en home. | BAJA por ahora — placeholder funciona. |
| **¿Cuántos servicios destacar en home?** | 3 o 4. Cambia el layout (3 permite composición más generosa; 4 requiere grid más apretado o 2+2). Recomendación: 3 servicios principales + enlace a ver todos. | MEDIA |

### Skills obligatorios (recordatorio)

La tabla de skills del MASTER-PLAN sigue pendiente de completar. Los skills deben estar definidos antes de que se escriba cualquier copy, CTA o microcopy visible del sitio.

---

## NOTAS FINALES

1. **Este documento complementa y está subordinado al MASTER-PLAN y al SITEMAP-ARCHITECTURE.** No los contradice ni los reemplaza.

2. **El design system no es un template.** Es un conjunto de reglas que permiten diseñar páginas diferentes que se sienten del mismo sitio.

3. **Las reglas anti "cara de IA" son obligatorias.** Cada página se revisa contra estas reglas antes de aprobarse.

4. **El gold se usa con moderación.** Si hay duda sobre si un uso de gold es excesivo, probablemente lo es. Menos es más.

5. **La elegancia está en los detalles, no en la cantidad.** Un sitio de 5 elementos bien ejecutados es más premium que uno de 15 elementos amontonados.

6. **Performance es parte del diseño.** Un sitio bonito que carga en 5 segundos no es un sitio premium. La velocidad es un atributo visual.

---

*Documento generado como sistema visual y de experiencia congelado para la reconstrucción de DM2 Contabilidade.*  
*Cualquier modificación debe ser documentada con fecha y justificación.*
