import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },

  // Redirects — old URLs to new architecture
  async redirects() {
    return [
      // Old /para/ specialty routes → root-level keyword URLs
      { source: '/para/advogados', destination: '/contabilidade-para-advogados', permanent: true },
      { source: '/para/profissionais-da-saude', destination: '/contabilidade-para-profissionais-da-saude', permanent: true },
      { source: '/para/negocios-digitais', destination: '/contabilidade-para-negocios-digitais', permanent: true },
      { source: '/para/medicos', destination: '/contabilidade-para-profissionais-da-saude', permanent: true },
      // Old /servicos/ route (if ever indexed)
      { source: '/servicos', destination: '/servicos-contabeis', permanent: true },
      { source: '/servicos/:slug', destination: '/servicos-contabeis/:slug', permanent: true },
    ];
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    // Supabase Storage public URLs for blog covers and other media.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
