import Link from 'next/link';
import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/admin/session';
import { requireAdminClient } from '@/lib/supabase-admin';
import { POST_STATUSES, type PostStatus } from '@/lib/admin/validation';
import { PostRowActions } from './PostRowActions';

interface SearchParams {
  status?: string;
  category?: string;
  featured?: string;
  q?: string;
}

interface PostListRow {
  id: string;
  slug: string;
  title: string;
  status: PostStatus;
  featured_on_home: boolean;
  featured_order: number | null;
  published_at: string | null;
  updated_at: string;
  read_time_minutes: number | null;
  author?: { display_name: string | null } | null;
  category?: { slug: string; name: string } | null;
}

const dateFmt = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

function formatDate(iso: string | null | undefined): string {
  if (!iso) return '—';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '—' : dateFmt.format(d);
}

const STATUS_STYLES: Record<PostStatus, string> = {
  draft: 'bg-neutral-100 text-neutral-700 border-neutral-200',
  scheduled: 'bg-amber-50 text-amber-800 border-amber-200',
  published: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  archived: 'bg-neutral-200 text-neutral-700 border-neutral-300',
};

export default async function AdminBlogListPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  if (!(await isAdminAuthenticated())) redirect('/admin/blog/login');

  const sp = await searchParams;
  const statusFilter = POST_STATUSES.includes(sp.status as PostStatus)
    ? (sp.status as PostStatus)
    : undefined;
  const featuredOnly = sp.featured === '1';
  const categoryFilter = sp.category?.trim();
  const q = sp.q?.trim();

  const client = requireAdminClient();

  const [{ data: postsData }, { data: categoriesData }] = await Promise.all([
    (() => {
      let query = client
        .from('blog_posts')
        .select(
          'id,slug,title,status,featured_on_home,featured_order,published_at,updated_at,read_time_minutes,author:authors(display_name),category:blog_categories(slug,name)',
        )
        .order('updated_at', { ascending: false })
        .limit(200);
      if (statusFilter) query = query.eq('status', statusFilter);
      if (featuredOnly) query = query.eq('featured_on_home', true);
      if (q) {
        const safe = q.replace(/[%,]/g, ' ');
        query = query.or(`title.ilike.%${safe}%,slug.ilike.%${safe}%`);
      }
      return query;
    })(),
    client.from('blog_categories').select('slug,name').order('sort_order'),
  ]);

  let posts = ((postsData ?? []) as unknown as PostListRow[]) ?? [];
  if (categoryFilter) {
    posts = posts.filter((p) => p.category?.slug === categoryFilter);
  }

  const categories = (categoriesData ?? []) as { slug: string; name: string }[];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <h1
            className="text-xl md:text-2xl font-bold text-navy-900"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Posts
          </h1>
          <p className="text-sm text-neutral-600 mt-0.5">
            {posts.length} resultado{posts.length === 1 ? '' : 's'}
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center justify-center px-4 py-2 bg-navy-900 text-white text-sm font-semibold rounded-md hover:bg-navy-800 transition-colors"
        >
          + Novo post
        </Link>
      </div>

      <Filters
        status={statusFilter}
        featured={featuredOnly}
        category={categoryFilter}
        q={q}
        categories={categories}
      />

      <div className="overflow-x-auto rounded-md border border-neutral-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50 text-neutral-700">
            <tr className="text-left">
              <th className="px-3 py-2 font-medium">Título</th>
              <th className="px-3 py-2 font-medium">Status</th>
              <th className="px-3 py-2 font-medium hidden md:table-cell">Categoria</th>
              <th className="px-3 py-2 font-medium hidden lg:table-cell">Autor</th>
              <th className="px-3 py-2 font-medium hidden md:table-cell">Featured</th>
              <th className="px-3 py-2 font-medium hidden md:table-cell">Publicado em</th>
              <th className="px-3 py-2 font-medium hidden lg:table-cell">Atualizado</th>
              <th className="px-3 py-2 font-medium hidden lg:table-cell">Leitura</th>
              <th className="px-3 py-2 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {posts.length === 0 && (
              <tr>
                <td colSpan={9} className="px-3 py-8 text-center text-neutral-500">
                  Nenhum post encontrado.
                </td>
              </tr>
            )}
            {posts.map((p) => (
              <tr key={p.id} className="hover:bg-neutral-50">
                <td className="px-3 py-2 align-top">
                  <Link
                    href={`/admin/blog/${p.id}`}
                    className="font-medium text-navy-900 hover:text-navy-700"
                  >
                    {p.title}
                  </Link>
                  <div className="text-xs text-neutral-500 truncate max-w-[28rem]">
                    /{p.slug}
                  </div>
                </td>
                <td className="px-3 py-2 align-top">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${STATUS_STYLES[p.status]}`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-3 py-2 align-top hidden md:table-cell text-neutral-700">
                  {p.category?.name ?? '—'}
                </td>
                <td className="px-3 py-2 align-top hidden lg:table-cell text-neutral-700">
                  {p.author?.display_name ?? '—'}
                </td>
                <td className="px-3 py-2 align-top hidden md:table-cell">
                  {p.featured_on_home ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-gold-100 text-gold-700 border border-gold-200">
                      ★ {p.featured_order ?? '?'}
                    </span>
                  ) : (
                    <span className="text-neutral-400">—</span>
                  )}
                </td>
                <td className="px-3 py-2 align-top hidden md:table-cell text-neutral-700">
                  {formatDate(p.published_at)}
                </td>
                <td className="px-3 py-2 align-top hidden lg:table-cell text-neutral-500">
                  {formatDate(p.updated_at)}
                </td>
                <td className="px-3 py-2 align-top hidden lg:table-cell text-neutral-500">
                  {p.read_time_minutes ? `${p.read_time_minutes} min` : '—'}
                </td>
                <td className="px-3 py-2 align-top text-right">
                  <PostRowActions id={p.id} status={p.status} title={p.title} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Filters({
  status,
  featured,
  category,
  q,
  categories,
}: {
  status: PostStatus | undefined;
  featured: boolean;
  category: string | undefined;
  q: string | undefined;
  categories: { slug: string; name: string }[];
}) {
  return (
    <form
      method="get"
      className="mb-4 flex flex-wrap items-end gap-3 bg-white border border-neutral-200 rounded-md p-3"
    >
      <label className="flex flex-col text-xs text-neutral-600">
        <span className="mb-1">Status</span>
        <select
          name="status"
          defaultValue={status ?? ''}
          className="px-2 py-1.5 border border-neutral-300 rounded text-sm"
        >
          <option value="">Todos</option>
          {POST_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col text-xs text-neutral-600">
        <span className="mb-1">Categoria</span>
        <select
          name="category"
          defaultValue={category ?? ''}
          className="px-2 py-1.5 border border-neutral-300 rounded text-sm"
        >
          <option value="">Todas</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col text-xs text-neutral-600">
        <span className="mb-1">Featured</span>
        <select
          name="featured"
          defaultValue={featured ? '1' : ''}
          className="px-2 py-1.5 border border-neutral-300 rounded text-sm"
        >
          <option value="">Todos</option>
          <option value="1">Apenas featured</option>
        </select>
      </label>
      <label className="flex flex-col text-xs text-neutral-600 flex-1 min-w-[12rem]">
        <span className="mb-1">Buscar</span>
        <input
          name="q"
          type="search"
          defaultValue={q ?? ''}
          placeholder="Título ou slug…"
          className="px-2 py-1.5 border border-neutral-300 rounded text-sm"
        />
      </label>
      <div className="flex gap-2">
        <button
          type="submit"
          className="px-3 py-1.5 bg-navy-900 text-white text-sm font-medium rounded hover:bg-navy-800"
        >
          Filtrar
        </button>
        <Link
          href="/admin/blog"
          className="px-3 py-1.5 border border-neutral-300 text-neutral-700 text-sm rounded hover:bg-neutral-50"
        >
          Limpar
        </Link>
      </div>
    </form>
  );
}
