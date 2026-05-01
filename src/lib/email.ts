import nodemailer, { type Transporter } from 'nodemailer';

/**
 * SMTP-based lead notification.
 *
 * Credentials are read exclusively from environment variables and never
 * logged. If any required variable is missing, sendLeadNotification logs
 * a generic warning and returns false — the lead has already been
 * persisted in Supabase by the caller, so the user-facing flow is not
 * affected.
 *
 * Required env vars (server-side only — never NEXT_PUBLIC_):
 *   SMTP_HOST    — e.g. smtp.gmail.com
 *   SMTP_PORT    — e.g. 587 (STARTTLS) or 465 (SMTPS)
 *   SMTP_SECURE  — "true" for port 465, "false" for 587 with STARTTLS
 *   SMTP_USER    — SMTP authentication user
 *   SMTP_PASS    — SMTP authentication password (never log, never expose)
 *   MAIL_FROM    — full From header, e.g. "DM2 Contabilidade <noreply@…>"
 *   MAIL_TO      — recipient address for new lead notifications
 */

interface LeadEmailData {
  nome: string;
  email: string;
  telefone: string;
  empresa?: string | null;
  servico_interesse?: string | null;
  mensagem?: string | null;
  origem_pagina?: string | null;
  landing_page?: string | null;
  referrer?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  gclid?: string | null;
  fbclid?: string | null;
}

let cachedTransporter: Transporter | null = null;
let cacheChecked = false;

/**
 * Lazy, memoized transporter. Returns null if any required SMTP variable
 * is missing — never throws at import time, never crashes the form flow
 * if SMTP is not configured yet.
 */
function getTransporter(): Transporter | null {
  if (cacheChecked) return cachedTransporter;
  cacheChecked = true;

  const host = process.env.SMTP_HOST;
  const portRaw = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !portRaw || !user || !pass) {
    return null;
  }

  const port = Number.parseInt(portRaw, 10);
  if (!Number.isFinite(port) || port <= 0 || port > 65535) {
    return null;
  }

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user, pass },
  });
  return cachedTransporter;
}

/**
 * Strip CR/LF and bound the length of any value that is rendered into
 * an email header (Subject, Reply-To). Mitigates header-injection vectors
 * where a hostile string could append fake headers via newline bytes.
 */
function sanitizeHeaderValue(value: string, maxLen = 200): string {
  return value.replace(/[\r\n]+/g, ' ').trim().slice(0, maxLen);
}

/** Conservative HTML escaping for body interpolation. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 16px 8px 0;font-weight:600;color:#0A2E5C;vertical-align:top;white-space:nowrap;">${label}</td>
    <td style="padding:8px 0;color:#333;word-break:break-word;">${value}</td>
  </tr>`;
}

function buildHtmlBody(data: LeadEmailData, sentAt: string): string {
  const optional = (label: string, value: string | null | undefined) =>
    value ? row(label, escapeHtml(value)) : '';

  const safeMailto = encodeURIComponent(data.email);

  return [
    `<h2 style="font-family:sans-serif;color:#0A2E5C;margin:0 0 12px;">Novo lead recebido</h2>`,
    `<table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">`,
    row('Nome', escapeHtml(data.nome)),
    row(
      'E-mail',
      `<a href="mailto:${safeMailto}" style="color:#0A2E5C;">${escapeHtml(data.email)}</a>`,
    ),
    row('Telefone', escapeHtml(data.telefone)),
    optional('Empresa', data.empresa),
    optional('Serviço', data.servico_interesse),
    optional('Mensagem', data.mensagem),
    `</table>`,
    `<hr style="border:none;border-top:1px solid #eee;margin:20px 0;">`,
    `<h3 style="font-family:sans-serif;color:#0A2E5C;font-size:14px;margin:0 0 8px;">Atribuição</h3>`,
    `<table style="border-collapse:collapse;font-family:sans-serif;font-size:13px;color:#555;">`,
    optional('Página de envio', data.origem_pagina),
    optional('Landing page', data.landing_page),
    optional('Referrer', data.referrer),
    optional('utm_source', data.utm_source),
    optional('utm_medium', data.utm_medium),
    optional('utm_campaign', data.utm_campaign),
    optional('utm_content', data.utm_content),
    optional('utm_term', data.utm_term),
    optional('gclid', data.gclid),
    optional('fbclid', data.fbclid),
    row('Enviado em', escapeHtml(sentAt)),
    `</table>`,
  ].join('\n');
}

function buildTextBody(data: LeadEmailData, sentAt: string): string {
  const lines: string[] = [
    'Novo lead recebido',
    '',
    `Nome: ${data.nome}`,
    `E-mail: ${data.email}`,
    `Telefone: ${data.telefone}`,
  ];
  if (data.empresa) lines.push(`Empresa: ${data.empresa}`);
  if (data.servico_interesse) lines.push(`Serviço: ${data.servico_interesse}`);
  if (data.mensagem) {
    lines.push('', 'Mensagem:', data.mensagem);
  }
  lines.push('', '— Atribuição —');
  if (data.origem_pagina) lines.push(`Página de envio: ${data.origem_pagina}`);
  if (data.landing_page) lines.push(`Landing page: ${data.landing_page}`);
  if (data.referrer) lines.push(`Referrer: ${data.referrer}`);
  if (data.utm_source) lines.push(`utm_source: ${data.utm_source}`);
  if (data.utm_medium) lines.push(`utm_medium: ${data.utm_medium}`);
  if (data.utm_campaign) lines.push(`utm_campaign: ${data.utm_campaign}`);
  if (data.utm_content) lines.push(`utm_content: ${data.utm_content}`);
  if (data.utm_term) lines.push(`utm_term: ${data.utm_term}`);
  if (data.gclid) lines.push(`gclid: ${data.gclid}`);
  if (data.fbclid) lines.push(`fbclid: ${data.fbclid}`);
  lines.push(`Enviado em: ${sentAt}`);
  return lines.join('\n');
}

/**
 * Send the lead notification. Always returns a boolean: true if the SMTP
 * transport accepted the message, false if anything was missing or
 * failed. The caller never blocks the form on this result.
 */
export async function sendLeadNotification(data: LeadEmailData): Promise<boolean> {
  const transporter = getTransporter();
  const from = process.env.MAIL_FROM;
  const to = process.env.MAIL_TO;

  if (!transporter || !from || !to) {
    console.warn('[Email] SMTP not fully configured. Lead saved, email skipped.');
    return false;
  }

  const safeName = sanitizeHeaderValue(data.nome);
  const safeReplyTo = sanitizeHeaderValue(data.email);
  const safeServico = data.servico_interesse
    ? sanitizeHeaderValue(data.servico_interesse)
    : null;

  const subject = safeServico
    ? `Novo lead: ${safeName} — ${safeServico}`
    : `Novo lead: ${safeName}`;

  const sentAt = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  });

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: safeReplyTo,
      subject,
      html: buildHtmlBody(data, sentAt),
      text: buildTextBody(data, sentAt),
    });
    return true;
  } catch (err) {
    // Log only the message string — never the full error object, which
    // can include connection settings or auth context.
    const message = err instanceof Error ? err.message : 'unknown error';
    console.error('[Email] Send failed:', message);
    return false;
  }
}
