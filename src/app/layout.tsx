import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans, Playfair_Display, Sora } from 'next/font/google';
import Script from 'next/script';
import { defaultMetadata } from '@/lib/metadata';
import { OrganizationSchema } from '@/components/seo/SchemaMarkup';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

// ---------------------------------------------------------------------------
// Fonts — Design System tokens
// ---------------------------------------------------------------------------

const outfit = Outfit({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  weight: ['600', '700'],
  variable: '--font-playfair-display',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-sora',
  display: 'swap',
});

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = defaultMetadata;

export const viewport = {
  themeColor: '#0C152A',
  colorScheme: 'light' as const,
};

// ---------------------------------------------------------------------------
// Analytics IDs
// ---------------------------------------------------------------------------

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

// ---------------------------------------------------------------------------
// Root Layout
// ---------------------------------------------------------------------------

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`
        ${outfit.variable}
        ${plusJakartaSans.variable}
        ${playfairDisplay.variable}
        ${sora.variable}
        h-full antialiased
      `}
    >
      {/*
        suppressHydrationWarning silences the false-positive caused by
        browser extensions (ColorZilla, Grammarly, LastPass, etc.) that
        inject attributes on <body> before React hydrates. Scoped to this
        node only — does not mask real hydration bugs in children.
      */}
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <OrganizationSchema />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-navy-800 focus:text-white focus:rounded-md">
          Ir para o conteúdo
        </a>
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />

        {/* --- Google Analytics 4 --- */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}

        {/* --- Meta Pixel --- */}
        {META_PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
