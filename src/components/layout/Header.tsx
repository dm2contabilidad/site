'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { NAV_SERVICES, NAV_NICHES } from '@/lib/constants';
import { siteConfig, CLIENT_PORTAL_URL } from '@/content/site';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [nichesOpen, setNichesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setServicesOpen(false);
        setNichesOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Utility bar — fondo brand-navy, sutil */}
      <div className={`bg-navy-900 transition-all duration-300 ${scrolled ? 'h-0 overflow-hidden opacity-0' : 'h-auto opacity-100'}`}>
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-2 flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-4">
            {siteConfig.social.instagram && (
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-gold-500 transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            )}
            {siteConfig.social.linkedin && (
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-gold-500 transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            )}
          </div>
          <a
            href={CLIENT_PORTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-2 px-4 py-1 text-xs font-semibold text-gold-500 border border-gold-500/40 rounded hover:bg-gold-500 hover:text-navy-900 transition-all uppercase tracking-wider"
            style={{ fontFamily: 'var(--font-label)' }}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0" /></svg>
            Área de Clientes
          </a>
        </div>
      </div>

      {/* Main navigation — fondo blanco premium institucional */}
      <div className={`bg-white border-b border-[color:var(--color-border-soft)] transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}>
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            {/* Logo oficial — horizontal */}
            <Link href="/" className="shrink-0 flex items-center" onClick={closeMobile} aria-label="DM2 Contabilidade · Início">
              <Image
                src="/images/logo/dm2-logo-horizontal.webp"
                alt="DM2 Contabilidade"
                width={720}
                height={132}
                priority
                className="h-9 md:h-10 w-auto"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Principal">
              <Link href="/" className="px-3 py-2 text-sm font-medium text-navy-900 hover:text-navy-800 transition-colors">
                Início
              </Link>
              <Link href="/quem-somos" className="px-3 py-2 text-sm font-medium text-navy-900 hover:text-navy-800 transition-colors">
                Quem Somos
              </Link>

              {/* Serviços Contábeis dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className="px-3 py-2 text-sm font-medium text-navy-900 hover:text-navy-800 transition-colors flex items-center gap-1"
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                >
                  Serviços Contábeis
                  <svg className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {servicesOpen && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="bg-white rounded-lg shadow-xl border border-[color:var(--color-border-soft)] py-2 min-w-[280px]">
                      {NAV_SERVICES.map((item) => (
                        <Link
                          key={item.slug}
                          href={`/servicos-contabeis/${item.slug}`}
                          className="block px-4 py-2.5 text-sm text-navy-900 hover:bg-navy-50 hover:text-navy-800 transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                      <div className="border-t border-[color:var(--color-border-soft)] mt-1 pt-1">
                        <Link
                          href="/servicos-contabeis"
                          className="block px-4 py-2.5 text-sm font-semibold text-navy-800 hover:bg-navy-50 transition-colors"
                        >
                          Ver todos os serviços →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Especialidades dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setNichesOpen(true)}
                onMouseLeave={() => setNichesOpen(false)}
              >
                <button
                  className="px-3 py-2 text-sm font-medium text-navy-900 hover:text-navy-800 transition-colors flex items-center gap-1"
                  aria-expanded={nichesOpen}
                  aria-haspopup="true"
                >
                  Especialidades
                  <svg className={`w-3.5 h-3.5 transition-transform ${nichesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {nichesOpen && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="bg-white rounded-lg shadow-xl border border-[color:var(--color-border-soft)] py-2 min-w-[260px]">
                      {NAV_NICHES.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2.5 text-sm text-navy-900 hover:bg-navy-50 hover:text-navy-800 transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link href="/blog" className="px-3 py-2 text-sm font-medium text-navy-900 hover:text-navy-800 transition-colors">
                Blog
              </Link>

              {/* CTA — gold sobre blanco */}
              <Link
                href="/contato"
                className="ml-4 px-6 py-2.5 text-sm font-semibold bg-gold-500 text-navy-900 rounded-md hover:bg-gold-600 hover:text-white transition-colors"
              >
                Contato
              </Link>
            </nav>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 text-navy-900"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Línea fina dorada inferior */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-50" />

      {/* Mobile menu — fondo blanco */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[calc(4rem+33px)] md:top-[calc(4.5rem+33px)] bg-white z-40 overflow-y-auto">
          <nav className="px-5 py-6 space-y-1" aria-label="Menu mobile">
            <Link href="/" onClick={closeMobile} className="block py-3 text-base font-medium text-navy-900">
              Início
            </Link>
            <Link href="/quem-somos" onClick={closeMobile} className="block py-3 text-base font-medium text-navy-900">
              Quem Somos
            </Link>

            <div>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="w-full flex items-center justify-between py-3 text-base font-medium text-navy-900"
              >
                Serviços Contábeis
                <svg className={`w-4 h-4 text-gold-600 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {servicesOpen && (
                <div className="pl-4 pb-2 space-y-0.5 border-l-2 border-gold-500/30 ml-2">
                  {NAV_SERVICES.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/servicos-contabeis/${item.slug}`}
                      className="block py-2.5 text-sm text-navy-700 hover:text-navy-800"
                      onClick={closeMobile}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div>
              <button
                onClick={() => setNichesOpen(!nichesOpen)}
                className="w-full flex items-center justify-between py-3 text-base font-medium text-navy-900"
              >
                Especialidades
                <svg className={`w-4 h-4 text-gold-600 transition-transform ${nichesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {nichesOpen && (
                <div className="pl-4 pb-2 space-y-0.5 border-l-2 border-gold-500/30 ml-2">
                  {NAV_NICHES.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block py-2.5 text-sm text-navy-700 hover:text-navy-800"
                      onClick={closeMobile}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/blog" onClick={closeMobile} className="block py-3 text-base font-medium text-navy-900">
              Blog
            </Link>

            <div className="pt-6 space-y-3">
              <Link
                href="/contato"
                onClick={closeMobile}
                className="block w-full text-center py-3 bg-gold-500 text-navy-900 rounded-md font-semibold hover:bg-gold-600 hover:text-white transition-colors"
              >
                Fale com a DM2 Contabilidade
              </Link>
              <a
                href={CLIENT_PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 border border-navy-800 text-navy-800 rounded-md text-sm font-medium hover:bg-navy-50 transition-colors"
              >
                Área de Clientes
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
