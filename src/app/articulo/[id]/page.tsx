import React from 'react';
import { pool } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Heart } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface ArticlePageProps {
  params: Promise<{ id: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;

  let article = null;
  try {
    const { rows } = await pool.query('SELECT * FROM articles WHERE id = $1 OR slug = $1', [id]);
    if (rows.length > 0) {
      article = rows[0];
    }
  } catch (err) {
    console.error('Error fetching article:', err);
  }

  if (!article) {
    notFound();
  }

  // Map category to localized labels
  const categoryLabels: Record<string, string> = {
    internacional: 'Internacional',
    economia: 'Economía',
    tecnologia: 'Tecnología',
    cultura: 'Cultura',
    deportes: 'Deportes',
  };

  const categoryColors: Record<string, string> = {
    internacional: 'text-purple-400 border-purple-950 bg-purple-950/20',
    economia: 'text-emerald-400 border-emerald-950 bg-emerald-950/20',
    tecnologia: 'text-blue-400 border-blue-950 bg-blue-950/20',
    cultura: 'text-pink-400 border-pink-950 bg-pink-950/20',
    deportes: 'text-orange-400 border-orange-950 bg-orange-950/20',
  };

  const catLabel = categoryLabels[article.category] || 'Actualidad';
  const catColor = categoryColors[article.category] || 'text-zinc-400 border-zinc-900 bg-zinc-900/20';

  return (
    <div className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-6">
      {/* Back button */}
      <div className="flex">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-850 text-sm text-zinc-300 hover:text-white hover:border-zinc-700 transition-all font-bold shadow-md cursor-pointer active:scale-95"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver a la portada de noticias</span>
        </Link>
      </div>

      <article className="relative rounded-2xl border border-zinc-900 bg-zinc-950/40 p-6 md:p-8 overflow-hidden backdrop-blur-md space-y-6 shadow-2xl">
        {/* Cover image if available */}
        {article.image_url && (
          <div className="relative h-64 md:h-96 w-full rounded-xl overflow-hidden border border-zinc-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.image_url}
              alt={article.title}
              className="h-full w-full object-cover filter brightness-[0.9] saturate-[0.9]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
          </div>
        )}

        {/* Metadata */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full border text-xs font-bold uppercase ${catColor}`}>
              {catLabel}
            </span>
            {article.trending && (
              <span className="px-2.5 py-0.5 rounded-full border border-red-950 bg-red-950/20 text-red-400 text-xs font-bold uppercase animate-pulse">
                POPULAR
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-zinc-450 border-t border-b border-zinc-900/60 py-3">
            {article.author && (
              <span className="font-bold text-zinc-300">Por {article.author}</span>
            )}
            {article.date && (
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {article.date}
              </span>
            )}
            {article.read_time && <span>{article.read_time}</span>}
            {article.likes !== undefined && (
              <span className="flex items-center gap-1 text-zinc-300">
                <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                {article.likes} Me gusta
              </span>
            )}
          </div>
        </div>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-base md:text-lg text-zinc-200 leading-relaxed font-sans font-semibold border-l-3 border-purple-500 pl-4 italic bg-zinc-900/20 py-2.5 pr-2 rounded-r-lg">
            {article.excerpt}
          </p>
        )}

        {/* HTML Content (Light Theme Paper Container for Legibility) */}
        {article.content ? (
          <div 
            className="article-body-content bg-slate-50 text-slate-900 p-6 md:p-10 rounded-xl border border-slate-200 font-sans shadow-inner selection:bg-purple-100"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        ) : (
          <div className="py-12 text-center rounded-xl border border-dashed border-zinc-800 bg-zinc-950/20 text-zinc-400 font-sans text-sm uppercase tracking-wider">
            Generando contenido detallado...
          </div>
        )}
      </article>
    </div>
  );
}
