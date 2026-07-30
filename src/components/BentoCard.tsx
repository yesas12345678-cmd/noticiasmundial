import React from 'react';
import { Eye, Heart, Clock, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface BentoCardProps {
  title: string;
  excerpt?: string;
  category: 'internacional' | 'economia' | 'tecnologia' | 'cultura' | 'deportes';
  imageUrl?: string;
  date?: string;
  readTime?: string;
  trending?: boolean;
  author?: string;
  likes?: number;
  className?: string; // used for custom col/row spans
  children?: React.ReactNode; // in case we want to embed other widgets
  href?: string;
}

const categoryDetails = {
  internacional: { label: 'Internacional', color: 'text-purple-400 border-purple-950 bg-purple-950/20' },
  economia: { label: 'Economía', color: 'text-emerald-400 border-emerald-950 bg-emerald-950/20' },
  tecnologia: { label: 'Tecnología', color: 'text-blue-400 border-blue-950 bg-blue-950/20' },
  cultura: { label: 'Cultura', color: 'text-pink-400 border-pink-950 bg-pink-950/20' },
  deportes: { label: 'Deportes', color: 'text-orange-400 border-orange-950 bg-orange-950/20' },
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
  href,
}: BentoCardProps) {
  const cat = categoryDetails[category] || { label: 'Fútbol', color: 'text-zinc-400 border-zinc-900 bg-zinc-900/20' };

  const CardContainer = href ? Link : 'div';

  return (
    <CardContainer
      href={href as any}
      className={`group relative overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950/30 backdrop-blur-sm transition-all duration-350 hover:-translate-y-1 hover:border-purple-500/30 hover:bg-zinc-900/20 hover:shadow-2xl hover:shadow-purple-500/5 flex flex-col justify-between ${className} ${href ? 'cursor-pointer select-none' : ''}`}
    >
      
      {/* Brutalist Tech corners (Visible on Hover) */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-purple-500/0 group-hover:border-purple-400/80 transition-all duration-300 pointer-events-none rounded-tl" />
      <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-purple-500/0 group-hover:border-purple-400/80 transition-all duration-300 pointer-events-none rounded-tr" />
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-purple-500/0 group-hover:border-purple-400/80 transition-all duration-300 pointer-events-none rounded-bl" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-purple-500/0 group-hover:border-purple-400/80 transition-all duration-300 pointer-events-none rounded-br" />

      {/* Cyberpunk grid overlay for cards */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:16px_16px] -z-10 pointer-events-none" />

      {/* Background Image with Dark Gradient Overlay */}
      {imageUrl && (
        <div className="absolute inset-0 -z-20 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={title}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 filter brightness-[0.95] saturate-[0.85] contrast-[1.0]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/85 to-transparent" />
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
              <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-semibold uppercase ${cat.color}`}>
                {cat.label}
              </span>
              {trending && (
                <span className="px-2.5 py-0.5 rounded-full border border-red-950 bg-red-950/20 text-red-400 text-[11px] font-semibold uppercase animate-pulse">
                  POPULAR
                </span>
              )}
            </div>
            <div className="rounded-full bg-zinc-900 border border-zinc-800 px-3 py-1 text-xs font-bold text-purple-400 opacity-90 group-hover:opacity-100 group-hover:bg-purple-950/25 group-hover:border-purple-500/40 transition-all duration-300 flex items-center gap-1 cursor-pointer">
              <span>Leer</span>
              <ArrowUpRight className="h-3 w-3" />
            </div>
          </div>

          {/* Core Text (Title and description if provided) */}
          <div className="space-y-2 mt-auto">
            <h4 className="text-base font-bold tracking-tight text-white line-clamp-2 md:text-lg group-hover:text-purple-400 transition-colors leading-tight">
              {title}
            </h4>
            {excerpt && (
              <p className="text-sm text-zinc-300 line-clamp-3 leading-relaxed">
                {excerpt}
              </p>
            )}
          </div>

          {/* Footer Metadata */}
          <div className="flex items-center justify-between border-t border-zinc-900/60 pt-3 text-xs font-bold text-zinc-300">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-purple-400" />
              <span>{date}</span>
            </div>
          </div>

        </div>
      )}

    </CardContainer>
  );
}
