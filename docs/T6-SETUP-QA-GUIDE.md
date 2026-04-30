# T6 — Guía de Setup, QA y Testing End-to-End

## Estado: Fase T6 completada (02-abr-2026)

---

## 1. SETUP DE SUPABASE

### Crear proyecto

1. Ir a [supabase.com](https://supabase.com) → New Project
2. Nombre: `dm2-contabilidade`
3. Región: `South America (São Paulo)` si disponible, o la más cercana
4. Generar password segura para la base de datos

### Crear tabla de leads

1. En el Dashboard → SQL Editor
2. Copiar y ejecutar el contenido de `docs/supabase-leads-table.sql`
3. Verificar que la tabla `leads` aparece en Table Editor

### Obtener credenciales

1. Dashboard → Settings → API
2. Copiar:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (solo si se necesita leer leads programáticamente)

### Verificar RLS

1. Dashboard → Authentication → Policies
2. La tabla `leads` debe tener:
   - RLS: **Enabled**
   - Policy: "Allow anonymous insert" (INSERT for anon, WITH CHECK true)
   - **No** debe haber policy de SELECT para anon

### Test rápido de INSERT

En el SQL Editor, ejecutar:
```sql
-- Debería funcionar via la API con anon key
INSERT INTO leads (nome, email, telefone)
VALUES ('Test', 'test@test.com', '11999999999');

-- Verificar
SELECT * FROM leads ORDER BY created_at DESC LIMIT 1;

-- Limpiar
DELETE FROM leads WHERE email = 'test@test.com';
```

---

## 2. SETUP DE RESEND

### Crear cuenta y API key

1. Ir a [resend.com](https://resend.com) → Sign Up
2. Dashboard → API Keys → Create API Key
3. Nombre: `dm2-contabilidade`
4. Permission: `Sending access`
5. Copiar la key → `RESEND_API_KEY`

### Testing (sin dominio verificado)

Para pruebas inmediatas, Resend permite enviar desde `onboarding@resend.dev`:
```env
RESEND_FROM_EMAIL=DM2 Contabilidade <onboarding@resend.dev>
LEAD_NOTIFICATION_EMAIL=mariano.sosa.rogelio@gmail.com
```

Límite: 100 emails/día en el plan free, solo a la dirección del owner de la cuenta.

### Producción (con dominio verificado)

1. Dashboard → Domains → Add Domain
2. Agregar `dm2contabilidade.com.br`
3. Configurar los registros DNS que Resend indica:
   - **SPF**: TXT record
   - **DKIM**: CNAME records
   - **DMARC**: TXT record (recomendado)
4. Esperar verificación (puede tardar hasta 24h)
5. Una vez verificado, cambiar:
```env
RESEND_FROM_EMAIL=DM2 Contabilidade <noreply@dm2contabilidade.com.br>
LEAD_NOTIFICATION_EMAIL=contato@dm2contabilidade.com.br
```

### Test de envío

Después de configurar, enviar un lead de prueba desde el formulario. Verificar:
- El email llega al destinatario
- El subject es correcto: "Novo lead: [Nome] — [Serviço]"
- Los datos del lead se ven correctos en el body
- No cae en spam

---

## 3. SETUP DE CLOUDFLARE TURNSTILE

### Crear widget

1. Ir a [dash.cloudflare.com](https://dash.cloudflare.com) → Turnstile
2. Add Site
3. Site name: `DM2 Contabilidade`
4. Domain: `dm2contabilidade.com.br` (agregar `localhost` para testing)
5. Widget Mode: **Managed** (invisible cuando puede, visible si necesita verificar)
6. Copiar:
   - **Site Key** → `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
   - **Secret Key** → `TURNSTILE_SECRET_KEY`

### Verificar funcionamiento

1. Con las keys configuradas en `.env.local`, reiniciar `npm run dev`
2. Ir a `/contato`
3. El widget de Turnstile debe aparecer (checkbox o invisible)
4. Al enviar el formulario, el token se verifica server-side
5. En la consola del servidor no debe haber errores de `[Turnstile]`

### Testing sin Turnstile

Si no hay keys configuradas:
- El formulario funciona sin captcha (bypass automático en dev)
- Console muestra: `[Turnstile] TURNSTILE_SECRET_KEY not set — skipping verification in development`

---

## 4. VARIABLES DE ENTORNO — RESUMEN

### `.env.local` mínimo para testing

```env
# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Email (testing)
LEAD_NOTIFICATION_EMAIL=mariano.sosa.rogelio@gmail.com
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=DM2 Contabilidade <onboarding@resend.dev>

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxxxx

# Turnstile (opcional para testing)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4xxxxx
TURNSTILE_SECRET_KEY=0x4xxxxx
```

### Variables para producción

| Variable | Testing | Producción |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | `https://dm2contabilidade.com.br` |
| `LEAD_NOTIFICATION_EMAIL` | `mariano.sosa.rogelio@gmail.com` | `contato@dm2contabilidade.com.br` |
| `RESEND_FROM_EMAIL` | `onboarding@resend.dev` | `noreply@dm2contabilidade.com.br` |
| `RESEND_API_KEY` | Key de testing | Key de producción |
| `NEXT_PUBLIC_SUPABASE_URL` | Proyecto de testing | Proyecto de producción |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Key de testing | Key de producción |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Incluir `localhost` | Solo dominio de producción |
| `TURNSTILE_SECRET_KEY` | Key de testing | Key de producción |

---

## 5. CHECKLIST DE PRUEBA END-TO-END

### Pre-requisitos
- [ ] `.env.local` con Supabase URL + anon key
- [ ] `.env.local` con Resend API key + from email + notification email
- [ ] Tabla `leads` creada en Supabase con RLS
- [ ] `npm run dev` corriendo

### Test 1: Validación client-side
- [ ] Ir a `/contato`
- [ ] Intentar enviar formulario vacío → errores inline visibles
- [ ] Escribir email inválido → error "Por favor, insira um e-mail válido"
- [ ] Escribir teléfono corto (5 dígitos) → error "Por favor, insira um telefone com DDD"
- [ ] Escribir solo 1 letra en nome → error "Por favor, insira seu nome"

### Test 2: Envío exitoso
- [ ] Llenar: nome, email, telefone (obligatorios)
- [ ] Opcionalmente: empresa, servico, mensagem
- [ ] Click "Enviar mensagem"
- [ ] Botón muestra "Enviando..."
- [ ] Redirect a `/obrigado`
- [ ] Página muestra "Mensagem enviada"

### Test 3: Supabase
- [ ] Ir a Supabase Dashboard → Table Editor → leads
- [ ] Verificar que el lead aparece con todos los campos
- [ ] Verificar `origem_pagina` = `/contato`
- [ ] Verificar `status` = `novo`
- [ ] Verificar `ip_hash` tiene valor (no es null ni el IP raw)

### Test 4: Email
- [ ] Verificar que llegó email a `mariano.sosa.rogelio@gmail.com`
- [ ] Subject: "Novo lead: [nombre] — [servicio]" o "Novo lead: [nombre]"
- [ ] Body muestra todos los datos del lead
- [ ] No cayó en spam

### Test 5: Rate limiting
- [ ] Enviar 3 leads seguidos (con datos diferentes)
- [ ] El 4to debe mostrar: "Você já enviou uma mensagem recentemente..."
- [ ] Esperar 15 minutos o reiniciar servidor para que se resetee

### Test 6: Honeypot
- [ ] Abrir DevTools → Elements
- [ ] Buscar input `name="website"` (oculto)
- [ ] Darle un valor manualmente
- [ ] Enviar → debe parecer exitoso (fake success) pero NO guardar lead ni enviar email

### Test 7: Página /obrigado
- [ ] Después de submit exitoso, la página muestra confirmación
- [ ] Botón "Voltar ao início" funciona
- [ ] Botón "Ler nosso blog" funciona

### Test 8: Tracking (si GA4 configurado)
- [ ] Abrir DevTools → Network
- [ ] Buscar requests a `google-analytics.com` o `googletagmanager.com`
- [ ] Verificar evento `form_submit` al enviar
- [ ] Verificar evento `conversion` al cargar `/obrigado`

---

## 6. QA DE ESTADOS UX

| Estado | Qué muestra | Tono |
|---|---|---|
| **Vacío** | Labels visibles, placeholders de ejemplo | Claro, orientador |
| **Error de campo** | Mensaje rojo debajo del campo inválido | Directo: "Por favor, insira..." |
| **Enviando** | Botón: "Enviando..." + disabled + opacity reducida | Sin alarma, solo indica proceso |
| **Error de servidor** | Banner rojo encima del botón | Claro con alternativa: "...ou ligue para (11) 2749-7332" |
| **Rate limited** | Banner: "Você já enviou uma mensagem recentemente..." | Amable pero firme |
| **Turnstile pendiente** | "Aguarde a verificação de segurança..." | Informativo |
| **Éxito** | Redirect a /obrigado con check verde | Confirmación clara + próximo paso |

---

## 7. ANÁLISIS DE SEGURIDAD Y ROBUSTEZ

### Lo que está sólido

| Aspecto | Estado | Detalle |
|---|---|---|
| Validación dual | OK | Zod client + server. Misma schema. |
| Sanitización | OK | stripHtml + trim + normalizePhone antes de DB. |
| Honeypot | OK | Campo oculto, reject silencioso (fake success). |
| Turnstile | OK | Server-side verification. Bypass solo en dev sin keys. |
| RLS en Supabase | OK | Solo INSERT desde anon. No SELECT/UPDATE/DELETE. |
| IP hashing | OK | SHA-256. IP raw nunca se guarda (LGPD). |
| Secrets | OK | Keys privadas sin prefijo NEXT_PUBLIC_. No llegan al bundle. |
| Email from | OK | Configurable por env var. Default seguro (onboarding@resend.dev). |

### Deudas técnicas aceptables

| Deuda | Riesgo | Mitigación | Cuándo resolver |
|---|---|---|---|
| **Rate limit in-memory** | Se resetea si el servidor se reinicia (Vercel redeploy) | Turnstile + honeypot cubren la protección. Para DM2 (<100 leads/mes) el riesgo es mínimo. | Si hay abuso real: migrar a Vercel KV o Upstash Redis. |
| **No retry en email** | Si Resend falla, el email se pierde | El lead se guardó en Supabase. Se puede reenviar manualmente. | Si es crítico: agregar cola de retry o webhook de Supabase. |
| **Sin confirmación al usuario** | No se envía email de confirmación al lead | Reduce riesgo de que el formulario sea usado como herramienta de spam. La página /obrigado confirma. | Evaluar después del lanzamiento. |
| **Turnstile token single-use** | Si el usuario falla y reintenta, el token puede expirar | Turnstile se re-renderiza en error, pero no implementamos reset explícito. | Si hay quejas de usuarios reales. |

### No son deudas (decisiones conscientes)

- **Sin CSRF token:** Server Actions de Next.js ya incluyen protección CSRF automática.
- **Sin email de confirmación al lead:** Decisión deliberada para evitar que el formulario sea usado como herramienta de spam (enviar a emails de terceros).
- **Sin logging estructurado:** Console.error/warn es suficiente para el volumen actual. Vercel Dashboard muestra los logs.

---

## 8. TRACKING — VERIFICACIÓN

### Eventos implementados

| Evento | Plataforma | Trigger | Verificado |
|---|---|---|---|
| `form_start` | GA4 | Primer focus en el formulario | En código |
| `form_submit` | GA4 | Submit exitoso (antes de redirect) | En código |
| `conversion` | GA4 | Carga de /obrigado | En código |
| `Lead` | Meta Pixel | Submit exitoso (antes de redirect) | En código |
| `CompleteRegistration` | Meta Pixel | Carga de /obrigado | En código |

### Para verificar tracking real

1. Configurar `NEXT_PUBLIC_GA_MEASUREMENT_ID` en `.env.local`
2. Configurar `NEXT_PUBLIC_META_PIXEL_ID` en `.env.local`
3. Usar [GA4 DebugView](https://analytics.google.com/) para ver eventos en tiempo real
4. Usar [Meta Pixel Helper](https://www.facebook.com/business/help/198406487394386) (extensión Chrome) para verificar pixel

---

## 9. RESUMEN FINAL

### Lo que ya está listo

- [x] Formulario funcional con 6 campos + honeypot
- [x] Validación client-side (Zod + react-hook-form)
- [x] Validación server-side (misma Zod schema)
- [x] Sanitización de inputs
- [x] Protección anti-bot (Turnstile + honeypot + rate limit)
- [x] INSERT en Supabase con RLS
- [x] Email de notificación via Resend
- [x] Captura de UTMs, referrer, user-agent, IP hash
- [x] Tracking GA4 + Meta Pixel
- [x] Redirect a /obrigado con tracking de conversión
- [x] Estados UX (loading, error, success)
- [x] Mensajes en PT-BR
- [x] Accesibilidad (labels, aria-invalid, role=alert)

### Lo que necesita configuración externa

- [ ] Proyecto Supabase creado + tabla + RLS
- [ ] API key de Resend
- [ ] Dominio verificado en Resend (para producción)
- [ ] Widget de Turnstile creado (para producción)
- [ ] GA4 Measurement ID (para tracking real)
- [ ] Meta Pixel ID (para tracking real)

### Recomendación de siguiente fase

**Fase T7: Blog + contenido editorial.** Con el sistema de captación funcional, el siguiente paso es activar el blog (MDX) con los primeros artículos que generen tráfico orgánico y alimenten el funnel de conversión.

Alternativamente, si el objetivo es lanzar antes:
**Fase T8: Hardening + deploy.** Cloudflare DNS, Vercel production, redirects del sitio actual, y monitoreo post-lanzamiento.

---

*Documento generado como guía de setup y QA para la Fase T6 del proyecto DM2 Contabilidade.*
