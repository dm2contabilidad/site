'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useId, useState, useTransition, type ReactNode } from 'react';
import { POST_STATUSES, type PostStatus } from '@/lib/admin/validation';
import { createPostAction, updatePostAction } from './actions';
import { ImageUploader } from './ImageUploader';

export interface PostFormValues {
  title: string;
  slug: string;
  subtitle: string;
  excerpt: string;
  contentHtml: string;
  coverImageUrl: string;
  coverImageAlt: string;
  ogImageUrl: string;
  status: PostStatus;
  publishedAt: string;
  authorId: string;
  categoryId: string;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string;
  searchIntent: string;
  entityFocus: string;
  localFocus: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
  faqEnabled: boolean;
  isEvergreen: boolean;
  technicalReviewedByAuthor: boolean;
  isPillar: boolean;
  lastReviewedAt: string;
  readTimeMinutes: string;
  featuredOnHome: boolean;
  featuredOrder: string;
  relatedServiceSlug: string;
  relatedSpecialtySlug: string;
}

export interface PostFormFaq {
  question: string;
  answer: string;
}

export interface PostFormProps {
  mode: 'create' | 'edit';
  postId?: string;
  initial: PostFormValues;
  initialFaqs: PostFormFaq[];
  initialRelatedServices: string[];
  authors: { id: string; displayName: string }[];
  categories: { id: string; name: string }[];
  serviceOptions: { slug: string; title: string }[];
}

export function PostForm({
  mode,
  postId,
  initial,
  initialFaqs,
  initialRelatedServices,
  authors,
  categories,
  serviceOptions,
}: PostFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<PostFormValues>(initial);
  const [faqs, setFaqs] = useState<PostFormFaq[]>(initialFaqs);
  const [relatedServices, setRelatedServices] = useState<string[]>(initialRelatedServices);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Auto-clear success banner after 4s on edit (create redirects, so it
  // disappears with the navigation anyway).
  useEffect(() => {
    if (!successMsg) return;
    const t = setTimeout(() => setSuccessMsg(null), 4000);
    return () => clearTimeout(t);
  }, [successMsg]);

  function update<K extends keyof PostFormValues>(key: K, val: PostFormValues[K]) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  function err(key: string) {
    return errors[key];
  }

  function onSubmit(formData: FormData) {
    formData.set('faqs', JSON.stringify(faqs));
    formData.set('relatedServices', JSON.stringify(relatedServices));
    setFormError(null);
    setSuccessMsg(null);
    setErrors({});
    startTransition(async () => {
      const result =
        mode === 'create'
          ? await createPostAction(formData)
          : await updatePostAction(postId!, formData);
      if (result.ok && result.postId) {
        if (mode === 'create') {
          // Show success briefly, then redirect to the edit screen of
          // the new post. The banner survives until the navigation.
          setSuccessMsg('Post criado com sucesso. Redirecionando…');
          setTimeout(() => {
            router.push(`/admin/blog/${result.postId}?created=1`);
          }, 900);
        } else {
          setSuccessMsg('Alterações salvas.');
          router.refresh();
          // Scroll to top so the banner is visible regardless of where the
          // editor was scrolled when the user hit "Salvar".
          if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
      } else {
        setFormError(result.formError ?? 'Não foi possível salvar.');
        setErrors(result.fieldErrors ?? {});
      }
    });
  }

  return (
    <form action={onSubmit} className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1
            className="text-xl md:text-2xl font-bold text-navy-900"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {mode === 'create' ? 'Novo post' : 'Editar post'}
          </h1>
          {mode === 'edit' && (
            <p className="text-sm text-neutral-500 mt-0.5">/{values.slug}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/blog"
            className="px-3 py-2 border border-neutral-300 text-sm text-neutral-700 rounded-md hover:bg-neutral-100"
          >
            Voltar
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 bg-navy-900 text-white text-sm font-semibold rounded-md hover:bg-navy-800 disabled:opacity-60"
          >
            {isPending ? 'Salvando…' : mode === 'create' ? 'Criar post' : 'Salvar alterações'}
          </button>
        </div>
      </div>

      {formError && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2" role="alert">
          {formError}
        </div>
      )}

      {successMsg && (
        <div
          className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-md px-3 py-2 flex items-center gap-2"
          role="status"
        >
          <span aria-hidden="true">✓</span>
          <span>{successMsg}</span>
        </div>
      )}

      <CreatedBanner />


      <Section title="Conteúdo" id="conteudo">
        <Field label="Título" required error={err('title')}>
          <input
            name="title"
            value={values.title}
            onChange={(e) => update('title', e.target.value)}
            required
            className={inputCls}
          />
        </Field>
        <Field
          label="Slug"
          required
          error={err('slug')}
          info="URL pública do post: /blog/<slug>. Use kebab-case, sem acentos. Ex.: 'ibs-cbs-notas-fiscais-2026'. Não altere após publicar — quebra links externos."
        >
          <input
            name="slug"
            value={values.slug}
            onChange={(e) => update('slug', e.target.value)}
            required
            className={inputCls}
            placeholder="ex: ibs-cbs-notas-fiscais-2026"
          />
        </Field>
        <Field label="Subtítulo" error={err('subtitle')}>
          <input
            name="subtitle"
            value={values.subtitle}
            onChange={(e) => update('subtitle', e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field
          label="Excerto"
          required
          error={err('excerpt')}
          info="Resumo curto (1-2 frases). Aparece em listas do blog e é usado como fallback de meta description quando 'SEO description' está vazio."
        >
          <textarea
            name="excerpt"
            value={values.excerpt}
            onChange={(e) => update('excerpt', e.target.value)}
            required
            rows={3}
            className={textareaCls}
          />
        </Field>
        <Field
          label="Conteúdo (HTML)"
          error={err('contentHtml')}
          info="HTML do corpo do artigo. Aceita tags semânticas (h2, h3, p, ul, blockquote, a, strong, em, code). Sanitize de fonte externa antes de colar."
        >
          <textarea
            name="contentHtml"
            value={values.contentHtml}
            onChange={(e) => update('contentHtml', e.target.value)}
            rows={18}
            className={`${textareaCls} font-mono text-xs`}
          />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Tempo de leitura (min)" error={err('readTimeMinutes')}>
            <input
              type="number"
              name="readTimeMinutes"
              min={0}
              max={180}
              value={values.readTimeMinutes}
              onChange={(e) => update('readTimeMinutes', e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="" error={err('isPillar')}>
            <Toggle
              name="isPillar"
              label="Pillar (peça âncora)"
              checked={values.isPillar}
              onChange={(v) => update('isPillar', v)}
              info="Conteúdo âncora: peça longa e abrangente que outros posts orbitam via links internos. Use para temas centrais (ex.: guia completo Simples Nacional)."
            />
          </Field>
        </div>
      </Section>

      <Section title="Publicação" id="publicacao">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Status" required error={err('status')}>
            <select
              name="status"
              value={values.status}
              onChange={(e) => update('status', e.target.value as PostStatus)}
              className={inputCls}
            >
              {POST_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </Field>
          <Field
            label="Data de publicação"
            error={err('publishedAt')}
            info="Obrigatório quando status = 'scheduled' ou 'published'. Para agendar, escolha uma data futura: o post fica invisível até esse horário e aparece automaticamente."
          >
            <input
              type="datetime-local"
              name="publishedAt"
              value={toLocalInput(values.publishedAt)}
              onChange={(e) => update('publishedAt', fromLocalInput(e.target.value))}
              className={inputCls}
            />
          </Field>
          <Field label="Autor" required error={err('authorId')}>
            <select
              name="authorId"
              value={values.authorId}
              onChange={(e) => update('authorId', e.target.value)}
              required
              className={inputCls}
            >
              <option value="">— selecione —</option>
              {authors.map((a) => (
                <option key={a.id} value={a.id}>{a.displayName}</option>
              ))}
            </select>
          </Field>
          <Field label="Categoria" error={err('categoryId')}>
            <select
              name="categoryId"
              value={values.categoryId}
              onChange={(e) => update('categoryId', e.target.value)}
              className={inputCls}
            >
              <option value="">— sem categoria —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Última revisão" error={err('lastReviewedAt')}>
            <input
              type="datetime-local"
              name="lastReviewedAt"
              value={toLocalInput(values.lastReviewedAt)}
              onChange={(e) => update('lastReviewedAt', fromLocalInput(e.target.value))}
              className={inputCls}
            />
          </Field>
          <div className="flex flex-col gap-3 pt-6">
            <Toggle
              name="technicalReviewedByAuthor"
              label="Revisado tecnicamente pelo autor"
              checked={values.technicalReviewedByAuthor}
              onChange={(v) => update('technicalReviewedByAuthor', v)}
            />
            <Toggle
              name="isEvergreen"
              label="Conteúdo evergreen"
              checked={values.isEvergreen}
              onChange={(v) => update('isEvergreen', v)}
              info="Conteúdo atemporal cuja relevância não decai com o tempo (ex.: 'como abrir CNPJ MEI'). Usado para priorizar revisões periódicas em vez de republicações."
            />
          </div>
        </div>
      </Section>

      <Section title="Featured no home" id="featured">
        <p className="text-xs text-neutral-600 -mt-1">
          Lógica híbrida: o home mostra 3 posts. Se você marcar posts como
          featured, eles entram primeiro (ordenados por &quot;Ordem&quot;).
          Os espaços restantes são preenchidos automaticamente com os posts
          publicados mais recentes.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Toggle
            name="featuredOnHome"
            label="Mostrar no home"
            checked={values.featuredOnHome}
            onChange={(v) => update('featuredOnHome', v)}
            info="Marque para fixar este post na home, sem depender da data de publicação. Sem destaques, o home se enche sozinho com os 3 mais recentes."
          />
          <Field
            label="Ordem (menor primeiro)"
            error={err('featuredOrder')}
            info="Define a posição entre os destaques manuais. 0 = primeiro, 1 = segundo, etc. Só faz efeito se 'Mostrar no home' está ativo."
          >
            <input
              type="number"
              name="featuredOrder"
              min={0}
              max={999}
              value={values.featuredOrder}
              onChange={(e) => update('featuredOrder', e.target.value)}
              disabled={!values.featuredOnHome}
              className={inputCls}
            />
          </Field>
        </div>
      </Section>

      <Section title="Imagem" id="imagem">
        <Field
          label="Imagem de capa"
          error={err('coverImageUrl')}
          info="Imagem principal do post. Suba aqui (vai para o Supabase Storage) ou cole uma URL pública abaixo. Aspecto recomendado 16:9, 1600px de largura."
        >
          <ImageUploader
            value={values.coverImageUrl}
            onUploaded={(url) => update('coverImageUrl', url)}
            alt={values.coverImageAlt}
            slugHint={values.slug || 'post'}
            label="Upload da capa"
          />
        </Field>
        <Field
          label="URL da imagem de capa"
          error={err('coverImageUrl')}
          info="Preenchida automaticamente após o upload. Edite manualmente apenas se a imagem já estiver hospedada em outro lugar (ex.: CDN externa permitida em next.config.ts)."
        >
          <input
            name="coverImageUrl"
            type="url"
            value={values.coverImageUrl}
            onChange={(e) => update('coverImageUrl', e.target.value)}
            className={inputCls}
            placeholder="https://…"
          />
        </Field>
        <Field
          label="Texto alternativo da capa"
          error={err('coverImageAlt')}
          info="Descreve a imagem para leitores de tela e quando a imagem não carrega. Seja específico: evite 'imagem' ou 'foto'. Ex.: 'Painel solar em telhado de fábrica em São Paulo'."
        >
          <input
            name="coverImageAlt"
            value={values.coverImageAlt}
            onChange={(e) => update('coverImageAlt', e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field
          label="URL da imagem OG (opcional)"
          error={err('ogImageUrl')}
          info="Imagem usada quando o post é compartilhado em redes sociais (Open Graph / Twitter Card). Se vazio, usa a capa. Aspecto recomendado 1200×630."
        >
          <input
            name="ogImageUrl"
            type="url"
            value={values.ogImageUrl}
            onChange={(e) => update('ogImageUrl', e.target.value)}
            className={inputCls}
            placeholder="Se vazio, usa a capa."
          />
        </Field>
      </Section>

      <Section title="SEO" id="seo">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label="SEO title"
            error={err('seoTitle')}
            info="Título exibido na aba do navegador e nos resultados do Google. Idealmente 50-60 caracteres. Se vazio, usa o título do post."
          >
            <input
              name="seoTitle"
              value={values.seoTitle}
              onChange={(e) => update('seoTitle', e.target.value)}
              className={inputCls}
              placeholder="Se vazio, usa o título"
            />
          </Field>
          <Field
            label="Canonical URL"
            error={err('canonicalUrl')}
            info="URL canônica quando o conteúdo também existe em outro lugar (mídias, repúblicas). Em geral deixe vazio: o sistema usa a URL pública por padrão."
          >
            <input
              type="url"
              name="canonicalUrl"
              value={values.canonicalUrl}
              onChange={(e) => update('canonicalUrl', e.target.value)}
              className={inputCls}
            />
          </Field>
        </div>
        <Field
          label="SEO description"
          error={err('seoDescription')}
          info="Resumo exibido nos resultados do Google abaixo do título. 140-160 caracteres. Se vazio, usa o excerto. Inclua a keyword principal naturalmente."
        >
          <textarea
            name="seoDescription"
            value={values.seoDescription}
            onChange={(e) => update('seoDescription', e.target.value)}
            rows={2}
            className={textareaCls}
          />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="OG title" error={err('ogTitle')}>
            <input
              name="ogTitle"
              value={values.ogTitle}
              onChange={(e) => update('ogTitle', e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="OG description" error={err('ogDescription')}>
            <input
              name="ogDescription"
              value={values.ogDescription}
              onChange={(e) => update('ogDescription', e.target.value)}
              className={inputCls}
            />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label="Primary keyword"
            error={err('primaryKeyword')}
            info="Termo principal que o post quer rankear. Use exatamente como buscado. Ex.: 'contabilidade para advogados em São Paulo'. Apareça no H1, na intro e em ao menos um H2."
          >
            <input
              name="primaryKeyword"
              value={values.primaryKeyword}
              onChange={(e) => update('primaryKeyword', e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field
            label="Secondary keywords (vírgula)"
            error={err('secondaryKeywords')}
            info="Variações e termos relacionados, separados por vírgula. Ex.: 'simples nacional, lucro presumido, escritório de advocacia'. 3-7 itens."
          >
            <input
              name="secondaryKeywords"
              value={values.secondaryKeywords}
              onChange={(e) => update('secondaryKeywords', e.target.value)}
              className={inputCls}
              placeholder="ex: simples nacional, lucro presumido"
            />
          </Field>
          <Field
            label="Search intent"
            error={err('searchIntent')}
            info="Tipo de intenção: informational (quem busca quer aprender), commercial (compara opções), transactional (pronto para contratar) ou navigational (busca a marca)."
          >
            <input
              name="searchIntent"
              value={values.searchIntent}
              onChange={(e) => update('searchIntent', e.target.value)}
              className={inputCls}
              placeholder="informational | commercial | …"
            />
          </Field>
          <Field
            label="Entity focus"
            error={err('entityFocus')}
            info="Entidade principal do post (pessoa, organização, conceito) reconhecível por motores semânticos. Ex.: 'Simples Nacional', 'Receita Federal do Brasil', 'eSocial'."
          >
            <input
              name="entityFocus"
              value={values.entityFocus}
              onChange={(e) => update('entityFocus', e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field
            label="Local focus"
            error={err('localFocus')}
            info="Cidade ou região alvo do conteúdo, usada por SEO local e por IAs para inferir contexto geográfico. Ex.: 'São Paulo', 'Vila Mariana'."
          >
            <input
              name="localFocus"
              value={values.localFocus}
              onChange={(e) => update('localFocus', e.target.value)}
              className={inputCls}
              placeholder="ex: São Paulo"
            />
          </Field>
        </div>
        <div className="flex flex-wrap gap-6 pt-2">
          <Toggle
            name="robotsIndex"
            label="robots: index"
            checked={values.robotsIndex}
            onChange={(v) => update('robotsIndex', v)}
            info="Permite que motores de busca incluam o post no índice. Desmarque para conteúdo interno, em revisão ou duplicado que não deve aparecer no Google."
          />
          <Toggle
            name="robotsFollow"
            label="robots: follow"
            checked={values.robotsFollow}
            onChange={(v) => update('robotsFollow', v)}
            info="Permite que motores de busca sigam os links do post para descobrir outras páginas. Em geral mantenha ativo."
          />
          <Toggle
            name="faqEnabled"
            label="Renderizar FAQ no post"
            checked={values.faqEnabled}
            onChange={(v) => update('faqEnabled', v)}
            info="Quando ativo, as FAQs configuradas abaixo são renderizadas no fim do post e marcadas com schema FAQPage para os Rich Results do Google."
          />
        </div>
      </Section>

      <Section title="FAQs" id="faqs">
        <FaqEditor faqs={faqs} onChange={setFaqs} />
      </Section>

      <Section title="Serviços relacionados" id="related">
        <RelatedServicesEditor
          options={serviceOptions}
          selected={relatedServices}
          onChange={setRelatedServices}
        />
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label="Serviço primário (slug, opcional)"
            error={err('relatedServiceSlug')}
            info="Coluna legacy related_service_slug usada por rich snippets. Mantida para compatibilidade — prefira selecionar acima na lista."
          >
            <input
              name="relatedServiceSlug"
              value={values.relatedServiceSlug}
              onChange={(e) => update('relatedServiceSlug', e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field
            label="Especialidade primária (slug, opcional)"
            error={err('relatedSpecialtySlug')}
            info="Coluna legacy related_specialty_slug. Slugs disponíveis: contabilidade-para-advogados, contabilidade-para-profissionais-da-saude, contabilidade-para-negocios-digitais."
          >
            <input
              name="relatedSpecialtySlug"
              value={values.relatedSpecialtySlug}
              onChange={(e) => update('relatedSpecialtySlug', e.target.value)}
              className={inputCls}
            />
          </Field>
        </div>
      </Section>

      <div className="flex items-center justify-end gap-2 pt-4 border-t border-neutral-200">
        <Link
          href="/admin/blog"
          className="px-3 py-2 border border-neutral-300 text-sm text-neutral-700 rounded-md hover:bg-neutral-100"
        >
          Cancelar
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 bg-navy-900 text-white text-sm font-semibold rounded-md hover:bg-navy-800 disabled:opacity-60"
        >
          {isPending ? 'Salvando…' : mode === 'create' ? 'Criar post' : 'Salvar alterações'}
        </button>
      </div>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const inputCls =
  'w-full px-3 py-2 border border-neutral-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 disabled:bg-neutral-100 disabled:text-neutral-500';
const textareaCls = inputCls;

/**
 * One-shot success banner shown when the editor was reached via
 * ?created=1 — i.e. the user just created a new post and was
 * redirected here. Auto-clears after 5s. The query param is removed
 * from the URL once shown, so a manual refresh doesn't re-trigger it.
 */
function CreatedBanner() {
  const params = useSearchParams();
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (params.get('created') === '1') {
      setShow(true);
      // Strip the param so refreshing or sharing the URL doesn't keep
      // showing the banner.
      const url = new URL(window.location.href);
      url.searchParams.delete('created');
      router.replace(url.pathname + (url.search || ''));
      const t = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(t);
    }
  }, [params, router]);

  if (!show) return null;
  return (
    <div
      className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-md px-3 py-2 flex items-center gap-2"
      role="status"
    >
      <span aria-hidden="true">✓</span>
      <span>Post criado com sucesso. Você está editando agora.</span>
    </div>
  );
}

function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="bg-white border border-neutral-200 rounded-lg p-5 md:p-6 space-y-4">
      <h2
        className="text-base font-semibold text-navy-900"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

/**
 * Inline (i) toggle that reveals a short explanation below the label.
 * Disclosure pattern, no floating tooltip. Used for any field that
 * benefits from extra context without cluttering the form.
 */
function InfoToggle({ label, info }: { label: string; info: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        aria-label={`Ajuda: ${label || 'campo'}`}
        className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full border border-neutral-300 text-[10px] font-semibold text-neutral-500 leading-none align-middle hover:bg-neutral-100 hover:text-navy-900 hover:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
      >
        i
      </button>
      {open && (
        <div
          id={id}
          role="region"
          className="mt-1 mb-1.5 text-xs text-neutral-600 bg-neutral-50 border border-neutral-200 rounded px-2 py-1.5 leading-snug"
        >
          {info}
        </div>
      )}
    </>
  );
}

function Field({
  label,
  required,
  error,
  hint,
  info,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  info?: ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">
          {label}
          {required && <span className="text-red-600"> *</span>}
          {info && <InfoToggle label={label} info={info} />}
        </label>
      )}
      {children}
      {hint && !error && <p className="mt-1 text-xs text-neutral-500">{hint}</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function Toggle({
  name,
  label,
  checked,
  onChange,
  info,
}: {
  name: string;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  info?: ReactNode;
}) {
  return (
    <div className="inline-flex flex-col">
      <label className="inline-flex items-center gap-2 text-sm text-neutral-800 cursor-pointer">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 accent-navy-900"
        />
        <span>{label}</span>
        {info && <InfoToggle label={label} info={info} />}
      </label>
    </div>
  );
}

function FaqEditor({
  faqs,
  onChange,
}: {
  faqs: PostFormFaq[];
  onChange: (next: PostFormFaq[]) => void;
}) {
  function update(idx: number, field: keyof PostFormFaq, value: string) {
    const next = faqs.map((f, i) => (i === idx ? { ...f, [field]: value } : f));
    onChange(next);
  }
  function move(idx: number, dir: -1 | 1) {
    const target = idx + dir;
    if (target < 0 || target >= faqs.length) return;
    const next = faqs.slice();
    [next[idx], next[target]] = [next[target], next[idx]];
    onChange(next);
  }
  function add() {
    onChange([...faqs, { question: '', answer: '' }]);
  }
  function remove(idx: number) {
    onChange(faqs.filter((_, i) => i !== idx));
  }
  return (
    <div className="space-y-3">
      {faqs.length === 0 && (
        <p className="text-sm text-neutral-500">Nenhuma FAQ. Adicione uma abaixo.</p>
      )}
      {faqs.map((f, i) => (
        <div key={i} className="border border-neutral-200 rounded-md p-3 space-y-2 bg-neutral-50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">FAQ #{i + 1}</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className="px-2 py-0.5 text-xs border border-neutral-300 rounded hover:bg-white disabled:opacity-40"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(i, 1)}
                disabled={i === faqs.length - 1}
                className="px-2 py-0.5 text-xs border border-neutral-300 rounded hover:bg-white disabled:opacity-40"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => remove(i)}
                className="px-2 py-0.5 text-xs border border-red-300 text-red-700 rounded hover:bg-red-50"
              >
                Remover
              </button>
            </div>
          </div>
          <input
            value={f.question}
            onChange={(e) => update(i, 'question', e.target.value)}
            placeholder="Pergunta"
            className={inputCls}
          />
          <textarea
            value={f.answer}
            onChange={(e) => update(i, 'answer', e.target.value)}
            placeholder="Resposta"
            rows={3}
            className={textareaCls}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="px-3 py-1.5 border border-neutral-300 text-sm text-neutral-700 rounded-md hover:bg-neutral-100"
      >
        + Adicionar FAQ
      </button>
    </div>
  );
}

function RelatedServicesEditor({
  options,
  selected,
  onChange,
}: {
  options: { slug: string; title: string }[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  function toggle(slug: string) {
    if (selected.includes(slug)) {
      onChange(selected.filter((s) => s !== slug));
    } else {
      onChange([...selected, slug]);
    }
  }
  return (
    <div className="space-y-2">
      {options.length === 0 ? (
        <p className="text-sm text-neutral-500">Nenhum serviço configurado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {options.map((opt) => (
            <label
              key={opt.slug}
              className="flex items-center gap-2 px-3 py-2 border border-neutral-200 rounded-md text-sm hover:bg-neutral-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(opt.slug)}
                onChange={() => toggle(opt.slug)}
                className="h-4 w-4 accent-navy-900"
              />
              <span className="text-neutral-800">{opt.title}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

// Convert an ISO string from DB to <input type="datetime-local"> value.
// HTML expects "YYYY-MM-DDTHH:mm" without timezone — we render as local time.
function toLocalInput(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// Convert <input type="datetime-local"> back to a full ISO string in UTC.
function fromLocalInput(local: string): string {
  if (!local) return '';
  const d = new Date(local);
  if (Number.isNaN(d.getTime())) return '';
  return d.toISOString();
}
