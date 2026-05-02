import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/admin/session';
import { requireAdminClient } from '@/lib/supabase-admin';

/**
 * Lightweight admin dashboard.
 *
 * All data is fetched server-side via the service-role client so RLS
 * is bypassed. The dashboard is best-effort: when the leads table is
 * missing, that section degrades to a clear empty state rather than
 * throwing. The blog section relies on tables that always exist once
 * the blog setup ran.
 *
 * Source inference is intentionally simple (no GA4 replacement):
 *   1. utm_source if present
 *   2. gclid → "Google Ads"
 *   3. fbclid → "Meta Ads"
 *   4. referrer hostname when not the site itself
 *   5. otherwise "directo"
 */

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Analytics · Admin · DM2',
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1 };

interface LeadRow {
  id: string;
  created_at: string;
  nome: string | null;
  email: string | null;
  telefone: string | null;
  servico_interesse: string | null;
  origem_pagina: string | null;
  referrer: string | null;
  landing_page: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  gclid: string | null;
  fbclid: string | null;
  status: string | null;
}

interface PostRow {
  id: string;
  slug: string;
  title: string;
  status: 'draft' | 'scheduled' | 'published' | 'archived';
  published_at: string | null;
  updated_at: string;
  featured_on_home: boolean;
  featured_order: number | null;
}

const dateFmt = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});
const dateOnlyFmt = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
});

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '—' : dateFmt.format(d);
}

function within(iso: string, hours: number): boolean {
  const d = new Date(iso).getTime();
  if (Number.isNaN(d)) return false;
  return Date.now() - d <= hours * 3600_000;
}

function inferSource(lead: LeadRow): string {
  if (lead.utm_source) return `UTM · ${lead.utm_source}`;
  if (lead.gclid) return 'Google Ads (gclid)';
  if (lead.fbclid) return 'Meta Ads (fbclid)';
  if (lead.referrer) {
    try {
      const host = new URL(lead.referrer).hostname.replace(/^www\./, '');
      if (host && !host.endsWith('dm2contabilidade.com.br')) {
        if (host.includes('google.')) return 'Google (orgânico/refer)';
        if (host.includes('bing.')) return 'Bing';
        if (host.includes('duckduckgo.')) return 'DuckDuckGo';
        if (host.includes('facebook.') || host.includes('instagram.')) return 'Meta (refer)';
        if (host.includes('linkedin.')) return 'LinkedIn';
        if (host.includes('chat.openai') || host.includes('chatgpt.')) return 'ChatGPT';
        if (host.includes('perplexity.')) return 'Perplexity';
        if (host.includes('claude.')) return 'Claude';
        return host;
      }
    } catch {
      // Bad URL — fall through.
    }
  }
  return 'Directo';
}

function tally<T>(items: T[], key: (t: T) => string | null | undefined): Map<string, number> {
  const m = new Map<string, number>();
  for (const it of items) {
    const k = (key(it) || '—').trim() || '—';
    m.set(k, (m.get(k) ?? 0) + 1);
  }
  return new Map([...m.entries()].sort((a, b) => b[1] - a[1]));
}

async function fetchPosts(client: ReturnType<typeof requireAdminClient>) {
  const { data, error } = await client
    .from('blog_posts')
    .select('id,slug,title,status,published_at,updated_at,featured_on_home,featured_order')
    .order('updated_at', { ascending: false })
    .limit(500);
  if (error) {
    return { rows: [] as PostRow[], error: error.message };
  }
  return { rows: (data ?? []) as PostRow[], error: null };
}

async function fetchLeads(client: ReturnType<typeof requireAdminClient>) {
  // Wide select to power all the breakdowns. 1000 row cap keeps this cheap;
  // the dashboard is for at-a-glance ops, not historical analytics.
  const { data, error } = await client
    .from('leads')
    .select(
      'id,created_at,nome,email,telefone,servico_interesse,origem_pagina,referrer,landing_page,utm_source,utm_medium,utm_campaign,gclid,fbclid,status',
    )
    .order('created_at', { ascending: false })
    .limit(1000);
  if (error) {
    // Detect "table missing" so the UI can point the user to the SQL file
    // rather than show a generic error.
    const code = (error as { code?: string }).code;
    return {
      rows: [] as LeadRow[],
      error: code === 'PGRST205' || error.message.toLowerCase().includes('does not exist')
        ? 'A tabela "leads" não existe. Rode docs/supabase-leads-table.sql.'
        : error.message,
    };
  }
  return { rows: (data ?? []) as LeadRow[], error: null };
}

export default async function AdminAnalyticsPage() {
  if (!(await isAdminAuthenticated())) redirect('/admin/blog/login');

  const client = requireAdminClient();
  const [posts, leads] = await Promise.all([fetchPosts(client), fetchLeads(client)]);

  // Blog metrics
  const byStatus = posts.rows.reduce<Record<string, number>>((acc, p) => {
    acc[p.status] = (acc[p.status] ?? 0) + 1;
    return acc;
  }, {});
  const featuredManual = posts.rows
    .filter((p) => p.featured_on_home)
    .sort((a, b) => (a.featured_order ?? 999) - (b.featured_order ?? 999));
  const recentPublished = posts.rows
    .filter((p) => p.status === 'published')
    .slice(0, 5);
  const upcoming = posts.rows
    .filter((p) => p.status === 'scheduled' && p.published_at)
    .sort((a, b) => (a.published_at ?? '').localeCompare(b.published_at ?? ''));

  // Lead metrics
  const last24 = leads.rows.filter((l) => within(l.created_at, 24));
  const last7 = leads.rows.filter((l) => within(l.created_at, 24 * 7));
  const last30 = leads.rows.filter((l) => within(l.created_at, 24 * 30));
  const withGclid = leads.rows.filter((l) => Boolean(l.gclid));
  const withFbclid = leads.rows.filter((l) => Boolean(l.fbclid));
  const sourceTally = tally(leads.rows, (l) => inferSource(l));
  const utmSourceTally = tally(
    leads.rows.filter((l) => Boolean(l.utm_source)),
    (l) => l.utm_source,
  );
  const landingTally = tally(leads.rows, (l) => l.landing_page || l.origem_pagina);
  const statusTally = tally(leads.rows, (l) => l.status);
  const recentLeads = leads.rows.slice(0, 8);

  // Per-day count (last 14 days) — small textual sparkline.
  const perDay: { date: string; count: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const day = new Date();
    day.setHours(0, 0, 0, 0);
    day.setDate(day.getDate() - i);
    const next = new Date(day);
    next.setDate(next.getDate() + 1);
    const c = leads.rows.filter((l) => {
      const t = new Date(l.created_at).getTime();
      return t >= day.getTime() && t < next.getTime();
    }).length;
    perDay.push({ date: dateOnlyFmt.format(day), count: c });
  }
  const maxPerDay = Math.max(1, ...perDay.map((d) => d.count));

  return (
    <div className="space-y-10">
      <div>
        <h1
          className="text-xl md:text-2xl font-bold text-navy-900"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Analytics
        </h1>
        <p className="text-sm text-neutral-600 mt-1">
          Painel operacional: estado do conteúdo e leads recebidos. Dados ao vivo
          do Supabase. Não substitui GA4 nem Meta Pixel — complementa.
        </p>
      </div>

      {/* Blog */}
      <section className="space-y-5">
        <h2
          className="text-base font-semibold text-navy-900 border-b border-neutral-200 pb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Blog
        </h2>

        {posts.error && (
          <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">
            Erro ao carregar posts: {posts.error}
          </p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat label="Publicados" value={byStatus.published ?? 0} />
          <Stat label="Agendados" value={byStatus.scheduled ?? 0} />
          <Stat label="Rascunhos" value={byStatus.draft ?? 0} />
          <Stat label="Arquivados" value={byStatus.archived ?? 0} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Panel
            title="Featured no home (manual)"
            empty="Nenhum post está fixado manualmente. O home se preenche com os 3 mais recentes."
            items={featuredManual.map((p) => ({
              key: p.id,
              left: (
                <Link href={`/admin/blog/${p.id}`} className="text-navy-900 hover:underline">
                  {p.title}
                </Link>
              ),
              right: (
                <span className="text-xs text-neutral-500">
                  ordem {p.featured_order ?? '—'} · {p.status}
                </span>
              ),
            }))}
          />
          <Panel
            title="Próximos a publicar (scheduled)"
            empty="Nenhum agendamento futuro."
            items={upcoming.map((p) => ({
              key: p.id,
              left: (
                <Link href={`/admin/blog/${p.id}`} className="text-navy-900 hover:underline">
                  {p.title}
                </Link>
              ),
              right: (
                <span className="text-xs text-neutral-500">{formatDate(p.published_at)}</span>
              ),
            }))}
          />
        </div>

        <Panel
          title="Últimos publicados"
          empty="Nenhum post publicado ainda."
          items={recentPublished.map((p) => ({
            key: p.id,
            left: (
              <Link href={`/admin/blog/${p.id}`} className="text-navy-900 hover:underline">
                {p.title}
              </Link>
            ),
            right: (
              <span className="text-xs text-neutral-500">{formatDate(p.published_at)}</span>
            ),
          }))}
        />
      </section>

      {/* Leads */}
      <section className="space-y-5">
        <h2
          className="text-base font-semibold text-navy-900 border-b border-neutral-200 pb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Leads
        </h2>

        {leads.error ? (
          <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2">
            {leads.error}
          </p>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Stat label="Total (últ. 1000)" value={leads.rows.length} />
              <Stat label="Últimas 24 h" value={last24.length} />
              <Stat label="Últimos 7 d" value={last7.length} />
              <Stat label="Últimos 30 d" value={last30.length} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Stat label="Com gclid" value={withGclid.length} />
              <Stat label="Com fbclid" value={withFbclid.length} />
              <Stat
                label="Com UTM"
                value={leads.rows.filter((l) => l.utm_source).length}
              />
              <Stat
                label="Sem origem identificada"
                value={leads.rows.filter((l) => inferSource(l) === 'Directo').length}
              />
            </div>

            <Panel
              title="Atividade — últimos 14 dias"
              empty="Sem leads no período."
              items={
                perDay.every((d) => d.count === 0)
                  ? []
                  : [
                      {
                        key: 'spark',
                        left: (
                          <div className="flex items-end gap-1 h-16 w-full">
                            {perDay.map((d) => (
                              <div
                                key={d.date}
                                className="flex-1 flex flex-col items-center justify-end"
                                title={`${d.date}: ${d.count} lead${d.count === 1 ? '' : 's'}`}
                              >
                                <div
                                  className="w-full bg-navy-900 rounded-sm"
                                  style={{
                                    height: `${(d.count / maxPerDay) * 100}%`,
                                    minHeight: d.count > 0 ? 2 : 0,
                                  }}
                                />
                                <span className="mt-1 text-[9px] text-neutral-400 leading-none">
                                  {d.date.slice(0, 5)}
                                </span>
                              </div>
                            ))}
                          </div>
                        ),
                        right: null,
                      },
                    ]
              }
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <BreakdownPanel title="Por origem inferida" tally={sourceTally} />
              <BreakdownPanel title="Por utm_source" tally={utmSourceTally} />
              <BreakdownPanel title="Por landing page" tally={landingTally} />
              <BreakdownPanel title="Por status interno" tally={statusTally} />
            </div>

            <Panel
              title="Leads recentes"
              empty="Nenhum lead ainda."
              items={recentLeads.map((l) => ({
                key: l.id,
                left: (
                  <div className="min-w-0">
                    <div className="text-sm text-navy-900 truncate">
                      {l.nome ?? '—'}{' '}
                      <span className="text-neutral-500">· {l.email ?? '—'}</span>
                    </div>
                    <div className="text-[11px] text-neutral-500 truncate">
                      {l.servico_interesse ?? 'sem serviço'} · {inferSource(l)} ·{' '}
                      {l.landing_page ?? l.origem_pagina ?? '—'}
                    </div>
                  </div>
                ),
                right: (
                  <span className="text-xs text-neutral-500 whitespace-nowrap">
                    {formatDate(l.created_at)}
                  </span>
                ),
              }))}
            />
          </>
        )}
      </section>

      <p className="text-xs text-neutral-500 pt-4 border-t border-neutral-200">
        Limitações conhecidas: classificação de origem é inferida a partir de
        UTMs, click IDs e referrer. Tráfego sem nenhum desses sinais aparece
        como &quot;Directo&quot;. Sessões via assistentes de IA só são
        detectáveis quando o referrer é preenchido pelo cliente — alguns não
        repassam.
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white border border-neutral-200 rounded-md px-3 py-3">
      <div
        className="text-2xl font-bold text-navy-900 leading-none"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {value}
      </div>
      <div className="text-[11px] uppercase tracking-wide text-neutral-500 mt-1">
        {label}
      </div>
    </div>
  );
}

function Panel({
  title,
  items,
  empty,
}: {
  title: string;
  items: { key: string; left: React.ReactNode; right: React.ReactNode }[];
  empty: string;
}) {
  return (
    <div className="bg-white border border-neutral-200 rounded-md">
      <div className="px-4 py-2.5 border-b border-neutral-200 text-xs font-semibold text-neutral-700 uppercase tracking-wide">
        {title}
      </div>
      {items.length === 0 ? (
        <p className="px-4 py-6 text-sm text-neutral-500">{empty}</p>
      ) : (
        <ul className="divide-y divide-neutral-100">
          {items.map((it) => (
            <li
              key={it.key}
              className="px-4 py-2.5 flex items-start justify-between gap-3 text-sm"
            >
              <div className="min-w-0 flex-1">{it.left}</div>
              {it.right}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function BreakdownPanel({ title, tally }: { title: string; tally: Map<string, number> }) {
  const total = [...tally.values()].reduce((a, b) => a + b, 0);
  const entries = [...tally.entries()].slice(0, 8);
  return (
    <div className="bg-white border border-neutral-200 rounded-md">
      <div className="px-4 py-2.5 border-b border-neutral-200 text-xs font-semibold text-neutral-700 uppercase tracking-wide">
        {title}
      </div>
      {entries.length === 0 ? (
        <p className="px-4 py-6 text-sm text-neutral-500">Sem dados.</p>
      ) : (
        <ul className="divide-y divide-neutral-100">
          {entries.map(([key, count]) => {
            const pct = total > 0 ? Math.round((count / total) * 100) : 0;
            return (
              <li key={key} className="px-4 py-2 text-sm">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="truncate text-neutral-800" title={key}>
                    {key}
                  </span>
                  <span className="text-xs text-neutral-500 whitespace-nowrap">
                    {count} · {pct}%
                  </span>
                </div>
                <div className="mt-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-navy-900 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
