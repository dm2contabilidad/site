import type { SiteConfig } from '@/types/site';

export const siteConfig: SiteConfig = {
  name: 'DM2 Contabilidade',
  url: 'https://dm2contabilidade.com.br',
  foundingYear: 2003,

  nap: {
    name: 'DM2 Contabilidade',
    street: 'Rua Vergueiro, 3086 - Conjunto 24',
    neighborhood: 'Vila Mariana',
    city: 'São Paulo',
    state: 'SP',
    postalCode: '04102-001',
    country: 'BR',
    phone: '(11) 2749-7332',
    phoneInternational: '+55-11-2749-7332',
    email: 'contato@dm2contabilidade.com.br',
  },

  hours: {
    days: 'Segunda a sexta',
    open: '08:30',
    close: '17:30',
  },

  whatsapp: '5511952963163',

  social: {
    instagram: 'https://www.instagram.com/dm2contabilidade/',
    linkedin: 'https://www.linkedin.com/company/dm2-contabilidade?originalSubdomain=br',
  },

  crcSp: '2SP039587',

  // Coordenadas geográficas: NÃO definir até confirmação por geocoding
  // oficial do endereço Rua Vergueiro, 3086, Conjunto 24, Vila Mariana.
  // O bloco `geo` do LocalBusinessSchema só é emitido quando este campo
  // estiver preenchido, evitando broadcast de coordenadas aproximadas.
  // Quando confirmadas, adicionar:
  //   geo: { latitude: -23.XXXXXX, longitude: -46.XXXXXX }
};

/** External client portal URL */
export const CLIENT_PORTAL_URL = 'https://vip.acessorias.com/dm2contabilidade';

/** WhatsApp formatted for display */
export const WHATSAPP_DISPLAY = '(11) 95296-3163';

/**
 * Technical reference for the firm.
 * Danilo is the public technical lead and responsável técnico of the firm.
 * The CRC-SP number belongs to DM2 Contabilidade (the firm), not to Danilo
 * personally — read `siteConfig.crcSp` whenever the CRC is displayed, and
 * always frame it as the firm's registration. Do NOT add a personal `crc`
 * field here; it would invite mis-attribution at call sites.
 */
export const TECHNICAL_REFERENCE = {
  name: 'Danilo Brito de Morais',
  role: 'Responsável Técnico',
};
