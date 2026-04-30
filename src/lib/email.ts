import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface LeadEmailData {
  nome: string;
  email: string;
  telefone: string;
  empresa?: string | null;
  servico_interesse?: string | null;
  mensagem?: string | null;
  origem_pagina?: string | null;
  utm_source?: string | null;
}

/**
 * Send lead notification email to the DM2 team.
 * Uses LEAD_NOTIFICATION_EMAIL env var as recipient.
 */
export async function sendLeadNotification(data: LeadEmailData): Promise<boolean> {
  const to = process.env.LEAD_NOTIFICATION_EMAIL;

  if (!resend) {
    console.warn('[Email] RESEND_API_KEY not set. Email skipped.');
    return false;
  }

  if (!to) {
    console.warn('[Email] LEAD_NOTIFICATION_EMAIL not set. Email skipped.');
    return false;
  }

  const subject = data.servico_interesse
    ? `Novo lead: ${data.nome} — ${data.servico_interesse}`
    : `Novo lead: ${data.nome}`;

  const body = [
    `<h2>Novo lead recebido</h2>`,
    `<table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">`,
    row('Nome', data.nome),
    row('E-mail', `<a href="mailto:${data.email}">${data.email}</a>`),
    row('Telefone', data.telefone),
    data.empresa ? row('Empresa', data.empresa) : '',
    data.servico_interesse ? row('Serviço', data.servico_interesse) : '',
    data.mensagem ? row('Mensagem', data.mensagem) : '',
    `</table>`,
    `<hr style="border:none;border-top:1px solid #eee;margin:20px 0;">`,
    `<p style="font-size:12px;color:#888;">`,
    data.origem_pagina ? `Página: ${data.origem_pagina}<br>` : '',
    data.utm_source ? `Origem: ${data.utm_source}<br>` : '',
    `Enviado em: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`,
    `</p>`,
  ].join('\n');

  try {
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'DM2 Contabilidade <onboarding@resend.dev>',
      to: [to],
      subject,
      html: body,
    });

    if (error) {
      console.error('[Email] Send failed:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('[Email] Send error:', err);
    return false;
  }
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 16px 8px 0;font-weight:600;color:#0A2E5C;vertical-align:top;">${label}</td>
    <td style="padding:8px 0;color:#333;">${value}</td>
  </tr>`;
}
