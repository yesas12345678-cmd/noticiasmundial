import React from 'react';
import { Eye, Heart, Clock, ArrowUpRight } from 'lucide-react';

interface BentoCardProps {
  title: string;
  excerpt?: string;
  category: 'selecciones' | 'lesiones' | 'resultados' | 'estadisticas';
  imageUrl?: string;
  date?: string;
  readTime?: string;
  trending?: boolean;
  author?: string;
  likes?: number;
  className?: string; // used for custom col/row spans
  children?: React.ReactNode; // in case we want to embed other widgets (like results/stats) inside cards
}

const categoryDetails = {
  selecciones: { label: 'Selecciones', color: 'text-blue-400 border-blue-950 bg-blue-950/20' },
  lesiones: { label: 'Lesiones & Bajas', color: 'text-red-400 border-red-950 bg-red-950/20' },
  resultados: { label: 'Resultados', color: 'text-amber-400 border-amber-950 bg-amber-950/20' },
  estadisticas: { label: 'Estadísticas', color: 'text-emerald-400 border-emerald-950 bg-emerald-950/20' },
};

export default function BentoCard({
  title,
  excerpt,
  category,
  imageUrl,
  date,
  readTime,
  trending,
  author,
  likes,
  className = '',
  children,
}: BentoCardProps) {
  const cat = categoryDetails[category] || { label: 'Fútbol', color: 'text-zinc-400 border-zinc-900 bg-zinc-900/20' };

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950/30 backdrop-blur-sm transition-all duration-350 hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-zinc-900/20 hover:shadow-2xl hover:shadow-emerald-500/5 flex flex-col justify-between ${className}`}
    >
      
      {/* Brutalist Tech corners (Visible on Hover) */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-emerald-500/0 group-hover:border-emerald-400/80 transition-all duration-300 pointer-events-none rounded-tl" />
      <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-emerald-500/0 group-hover:border-emerald-400/80 transition-all duration-300 pointer-events-none rounded-tr" />
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-emerald-500/0 group-hover:border-emerald-400/80 transition-all duration-300 pointer-events-none rounded-bl" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-emerald-500/0 group-hover:border-emerald-400/80 transition-all duration-300 pointer-events-none rounded-br" />

      {/* Cyberpunk grid overlay for cards */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:16px_16px] -z-10 pointer-events-none" />

      {/* Background Image with Dark Gradient Overlay */}
      {imageUrl && (
        <div className="absolute inset-0 -z-20 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 filter brightness-[0.4] saturate-[0.8] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        </div>
      )}

      {children ? (
        /* Widget/Custom Content Embed */
        <div className="h-full flex flex-col">{children}</div>
      ) : (
        /* Standard Article Card Content */
        <div className="p-5 flex flex-col justify-between h-full space-y-4">
          
          {/* Header row (Category, trending and arrow) */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded-full border text-[9px] font-mono font-bold uppercase ${cat.color}`}>
                {cat.label}
              </span>
              {trending && (
                <span className="px-2 py-0.5 rounded-full border border-red-950 bg-red-950/20 text-red-400 text-[9px] font-mono font-bold uppercase animate-pulse">
                  POPULAR
                </span>
              )}
            </div>
            <div className="rounded-full bg-zinc-900 border border-zinc-800 p-1.5 text-zinc-400 opacity-60 group-hover:opacity-100 group-hover:border-emerald-500/40 group-hover:text-emerald-400 transition-all duration-300">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Core Text (Title and description if provided) */}
          <div className="space-y-2 mt-auto">
            <h4 className="text-sm font-bold tracking-tight text-white line-clamp-2 md:text-base group-hover:text-emerald-400 transition-colors leading-tight">
              {title}
            </h4>
            {excerpt && (
              <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                {excerpt}
              </p>
            )}
          </div>

          {/* Footer Metadata */}
          <div className="flex items-center justify-between border-t border-zinc-900/60 pt-3 text-[10px] font-mono text-zinc-500">
            <div className="flex items-center gap-3">
              {author && <span className="font-bold text-zinc-400">{author}</span>}
              {date && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {date}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              {readTime && <span>{readTime}</span>}
              {likes !== undefined && (
                <span className="flex items-center gap-1 hover:text-red-400 transition-colors cursor-pointer">
                  <Heart className="h-3 w-3 fill-transparent group-hover:fill-transparent" />
                  {likes}
                </span>
              )}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
