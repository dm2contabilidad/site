/** Service interest options for the contact form select field */
export const SERVICE_OPTIONS = [
  { value: '', label: 'Selecione um serviço (opcional)' },
  { value: 'consultoria-contabil', label: 'Consultoria Contábil' },
  { value: 'planejamento-tributario', label: 'Planejamento Tributário' },
  { value: 'gestao-fiscal-e-tributaria', label: 'Gestão Fiscal e Tributária' },
  { value: 'abertura-e-regularizacao-de-empresas', label: 'Abertura e Regularização de Empresas' },
  { value: 'outro', label: 'Outro' },
] as const;

/** Navigation items for header — core services */
export const NAV_SERVICES = [
  { slug: 'consultoria-contabil', label: 'Consultoria Contábil' },
  { slug: 'planejamento-tributario', label: 'Planejamento Tributário' },
  { slug: 'gestao-fiscal-e-tributaria', label: 'Gestão Fiscal e Tributária' },
  { slug: 'abertura-e-regularizacao-de-empresas', label: 'Abertura e Regularização de Empresas' },
] as const;

/**
 * Navigation items for header — specialties (PROVISIONAL).
 * URLs are root-level with full keyword slugs.
 */
export const NAV_NICHES = [
  { href: '/contabilidade-para-advogados', label: 'Contabilidade para Advogados' },
  { href: '/contabilidade-para-profissionais-da-saude', label: 'Contabilidade para Profissionais da Saúde' },
  { href: '/contabilidade-para-negocios-digitais', label: 'Contabilidade para Negócios Digitais' },
] as const;
