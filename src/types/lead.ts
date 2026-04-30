export type LeadStatus =
  | 'novo'
  | 'contactado'
  | 'qualificado'
  | 'descartado'
  | 'convertido';

export interface Lead {
  id: string;
  created_at: string;
  nome: string;
  email: string;
  telefone: string;
  empresa: string | null;
  servico_interesse: string | null;
  mensagem: string | null;
  origem_pagina: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  user_agent: string | null;
  ip_hash: string | null;
  status: LeadStatus;
  notas: string | null;
  updated_at: string;
}

/** Fields required when inserting a new lead */
export type LeadInsert = Pick<Lead, 'nome' | 'email' | 'telefone'> &
  Partial<
    Pick<
      Lead,
      | 'empresa'
      | 'servico_interesse'
      | 'mensagem'
      | 'origem_pagina'
      | 'referrer'
      | 'utm_source'
      | 'utm_medium'
      | 'utm_campaign'
      | 'utm_content'
      | 'utm_term'
      | 'user_agent'
      | 'ip_hash'
    >
  >;
