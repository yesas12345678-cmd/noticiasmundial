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
    const { rows } = await pool.query('SELECT * FROM articles WHERE id = $1', [id]);
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
    selecciones: 'Selecciones',
    lesiones: 'Lesiones & Bajas',
    resultados: 'Resultados',
    estadisticas: 'Estadísticas',
  };

  const categoryColors: Record<string, string> = {
    selecciones: 'text-purple-400 border-purple-950 bg-purple-950/20',
    lesiones: 'text-red-400 border-red-950 bg-red-950/20',
    resultados: 'text-orange-400 border-orange-950 bg-orange-950/20',
    estadisticas: 'text-lime-400 border-lime-950 bg-lime-950/20',
  };

  const catLabel = categoryLabels[article.category] || 'Fútbol';
  const catColor = categoryColors[article.category] || 'text-zinc-400 border-zinc-900 bg-zinc-900/20';

  return (
    <div className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-6">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-mono text-purple-400 hover:text-purple-350 transition-colors uppercase font-bold"
      >
        <ArrowLeft className="h-4 w-4" />
        [ Volver al Panel de Control ]
      </Link>

      <article className="relative rounded-2xl border border-zinc-900 bg-zinc-950/40 p-6 md:p-8 overflow-hidden backdrop-blur-md space-y-6 shadow-2xl">
        {/* Cover image if available */}
        {article.image_url && (
          <div className="relative h-64 md:h-96 w-full rounded-xl overflow-hidden border border-zinc-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.image_url}
              alt={article.title}
              className="h-full w-full object-cover filter brightness-[0.6] saturate-[0.9]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
          </div>
        )}

        {/* Metadata */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full border text-[9px] font-mono font-bold uppercase ${catColor}`}>
              {catLabel}
            </span>
            {article.trending && (
              <span className="px-2 py-0.5 rounded-full border border-red-950 bg-red-950/20 text-red-400 text-[9px] font-mono font-bold uppercase animate-pulse">
                POPULAR
              </span>
            )}
          </div>

          <h1 className="text-xl md:text-3xl font-black tracking-tight text-white uppercase leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500 border-t border-b border-zinc-900/60 py-3">
            {article.author && (
              <span className="font-bold text-zinc-400">POR {article.author.toUpperCase()}</span>
            )}
            {article.date && (
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {article.date.toUpperCase()}
              </span>
            )}
            {article.read_time && <span>{article.read_time.toUpperCase()}</span>}
            {article.likes !== undefined && (
              <span className="flex items-center gap-1 text-zinc-400">
                <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
                {article.likes} LIKES
              </span>
            )}
          </div>
        </div>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-sans font-medium border-l-2 border-purple-500 pl-4 italic bg-zinc-900/20 py-2 pr-2 rounded-r-lg">
            {article.excerpt}
          </p>
        )}

        {/* HTML Content (Light Theme Paper Container for Legibility of Tailwind Slate styling) */}
        {article.content ? (
          <div 
            className="bg-slate-50 text-slate-900 p-5 md:p-8 rounded-xl border border-slate-200 font-sans shadow-inner selection:bg-purple-100"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        ) : (
          <div className="py-12 text-center rounded-xl border border-dashed border-zinc-800 bg-zinc-950/20 text-zinc-500 font-mono text-xs uppercase tracking-wider">
            El contenido de este reporte táctico está siendo generado por el sensor de la inteligencia artificial...
          </div>
        )}
      </article>
    </div>
  );
}
