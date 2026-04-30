import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import type { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
  priority?: boolean;
}

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

function formatDate(iso: string | null | undefined): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return dateFormatter.format(d);
}

export function BlogCard({ post, priority = false }: BlogCardProps) {
  const href = `/blog/${post.slug}`;
  const date = formatDate(post.publishedAt);
  const categoryName = post.category?.name ?? 'Geral';
  const cover = post.coverImageUrl;
  const coverAlt = post.coverImageAlt ?? post.title;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
        {cover ? (
          <Image
            src={cover}
            alt={coverAlt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            priority={priority}
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-100"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <Badge className="mb-3 self-start">{categoryName}</Badge>

        <h3 className="mb-2 text-lg font-semibold leading-snug text-neutral-900 transition-colors group-hover:text-navy-800">
          <Link href={href} className="relative after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>

        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-neutral-600">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center gap-3 text-xs text-neutral-500">
          {date && <time dateTime={post.publishedAt ?? undefined}>{date}</time>}
          {post.readTimeMinutes && (
            <>
              <span aria-hidden="true">·</span>
              <span>{post.readTimeMinutes} min de leitura</span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
