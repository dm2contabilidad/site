'use server';

import { headers } from 'next/headers';
import { leadSchema, type LeadFormData } from '@/lib/validation';
import { sanitizeText, normalizePhone, hashValue } from '@/lib/sanitize';
import { verifyTurnstileToken } from '@/lib/turnstile';
import { checkRateLimit } from '@/lib/rate-limit';
import { supabase } from '@/lib/supabase';
import { sendLeadNotification } from '@/lib/email';

export interface SubmitResult {
  success: boolean;
  error?: string;
  fieldErrors?: Partial<Record<keyof LeadFormData, string>>;
}

interface SubmitPayload extends LeadFormData {
  turnstileToken: string;
  honeypot: string;
  origem_pagina: string;
  referrer: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
}

export async function submitLead(payload: SubmitPayload): Promise<SubmitResult> {
  // 1. Honeypot check
  if (payload.honeypot) {
    // Bot filled the hidden field — reject silently
    return { success: true }; // fake success so bot doesn't retry
  }

  // 2. Get IP for rate limiting
  const headersList = await headers();
  const forwardedFor = headersList.get('x-forwarded-for');
  const ip = forwardedFor?.split(',')[0]?.trim() || 'unknown';
  const ipHash = await hashValue(ip);

  // 3. Rate limit
  const { allowed, retryAfterMs } = checkRateLimit(ipHash);
  if (!allowed) {
    const minutes = Math.ceil(retryAfterMs / 60000);
    return {
      success: false,
      error: `Você já enviou uma mensagem recentemente. Tente novamente em ${minutes} minuto${minutes > 1 ? 's' : ''}.`,
    };
  }

  // 4. Turnstile verification
  const turnstileValid = await verifyTurnstileToken(payload.turnstileToken);
  if (!turnstileValid) {
    return {
      success: false,
      error: 'Não foi possível verificar que você não é um robô. Tente novamente.',
    };
  }

  // 5. Server-side validation (same schema as client)
  const parsed = leadSchema.safeParse({
    nome: payload.nome,
    email: payload.email,
    telefone: payload.telefone,
    empresa: payload.empresa,
    servico_interesse: payload.servico_interesse,
    mensagem: payload.mensagem,
  });

  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof LeadFormData, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof LeadFormData;
      if (!fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return { success: false, error: 'Verifique os campos e tente novamente.', fieldErrors };
  }

  // 6. Sanitize
  const data = parsed.data;
  const sanitized = {
    nome: sanitizeText(data.nome) || data.nome,
    email: data.email,
    telefone: normalizePhone(data.telefone),
    empresa: sanitizeText(data.empresa || '') || null,
    servico_interesse: sanitizeText(data.servico_interesse || '') || null,
    mensagem: sanitizeText(data.mensagem || '') || null,
    origem_pagina: sanitizeText(payload.origem_pagina) || null,
    referrer: sanitizeText(payload.referrer) || null,
    utm_source: sanitizeText(payload.utm_source) || null,
    utm_medium: sanitizeText(payload.utm_medium) || null,
    utm_campaign: sanitizeText(payload.utm_campaign) || null,
    utm_content: sanitizeText(payload.utm_content) || null,
    utm_term: sanitizeText(payload.utm_term) || null,
    user_agent: headersList.get('user-agent') || null,
    ip_hash: ipHash,
  };

  // 7. Insert into Supabase
  if (supabase) {
    const { error: dbError } = await supabase.from('leads').insert(sanitized);
    if (dbError) {
      console.error('[Lead] Supabase insert failed:', dbError);
      // Don't block the lead — try to send email anyway
    }
  } else {
    console.warn('[Lead] Supabase not configured. Lead not saved to database.');
  }

  // 8. Send notification email
  await sendLeadNotification({
    nome: sanitized.nome,
    email: sanitized.email,
    telefone: data.telefone, // display format, not normalized
    empresa: sanitized.empresa,
    servico_interesse: sanitized.servico_interesse,
    mensagem: sanitized.mensagem,
    origem_pagina: sanitized.origem_pagina,
    utm_source: sanitized.utm_source,
  });

  return { success: true };
}
