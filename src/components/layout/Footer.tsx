import Link from 'next/link';
import { siteConfig, CLIENT_PORTAL_URL, TECHNICAL_REFERENCE } from '@/content/site';
import { NAV_SERVICES, NAV_NICHES } from '@/lib/constants';
import { DynamicYear } from './DynamicYear';

export function Footer() {
  const { nap, hours, foundingYear } = siteConfig;

  return (
    <footer className="bg-navy-900 text-white/80">
      {/* Gold accent line */}
      <div className="h-0.5 bg-gold-500" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-5 md:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1: DM2 + NAP */}
          <div className="sm:col-span-2 lg:col-span-1">
            <p
              className="text-xl font-bold text-white mb-3 tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              DM<span className="text-gold-500">2</span> Contabilidade
            </p>
            <p className="text-sm leading-relaxed mb-4">
              Escritório de contabilidade em São Paulo, Vila Mariana.
              Contabilidade séria desde {foundingYear}.
            </p>
            <address className="not-italic text-sm space-y-1.5 text-white/65">
              <p>{nap.street}</p>
              <p>{nap.neighborhood}, {nap.city}/{nap.state}</p>
              <p>CEP {nap.postalCode}</p>
              <p className="pt-1">
                <a
                  href={`tel:${nap.phoneInternational}`}
                  className="text-white/80 hover:text-gold-500 transition-colors"
                >
                  {nap.phone}
                </a>
              </p>
              <p className="text-white/65">
                {hours.days}, {hours.open.replace(':', 'h')} às {hours.close.replace(':', 'h')}
              </p>
            </address>

            {/* Redes sociais */}
            <div className="flex items-center gap-3 mt-5">
              {siteConfig.social.instagram && (
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-white/65 hover:text-gold-500 transition-colors" aria-label="Instagram da DM2 Contabilidade">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              )}
              {siteConfig.social.linkedin && (
                <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/65 hover:text-gold-500 transition-colors" aria-label="LinkedIn da DM2 Contabilidade">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Serviços */}
          <div>
            <h3 className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-4"
              style={{ fontFamily: 'var(--font-label)' }}
            >
              Serviços
            </h3>
            <ul className="space-y-2.5">
              {NAV_SERVICES.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/servicos-contabeis/${item.slug}`}
                    className="text-sm text-white/65 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Especialidades */}
          <div>
            <h3 className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-4"
              style={{ fontFamily: 'var(--font-label)' }}
            >
              Especialidades
            </h3>
            <ul className="space-y-2.5">
              {NAV_NICHES.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/65 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Institucional */}
          <div>
            <h3 className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-4"
              style={{ fontFamily: 'var(--font-label)' }}
            >
              Institucional
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/quem-somos" className="text-sm text-white/65 hover:text-white transition-colors">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-white/65 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-sm text-white/65 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="text-sm text-white/65 hover:text-white transition-colors">
                  Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="text-sm text-white/65 hover:text-white transition-colors">
                  Termos
                </Link>
              </li>
              <li className="pt-2">
                <a
                  href={CLIENT_PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                  Área de Clientes
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/55">
          <p>© {foundingYear}–<DynamicYear /> DM2 Contabilidade Ltda · CRC-SP {siteConfig.crcSp}</p>
          <p>
            Site construído com IA Claude Code por{' '}
            <a
              href="https://www.instagram.com/marianososaes/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 decoration-white/30 hover:text-white hover:decoration-gold-500 transition-colors"
            >
              Mariano Sosa
            </a>
          </p>
          <p>
            Responsável Técnico: {TECHNICAL_REFERENCE.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
