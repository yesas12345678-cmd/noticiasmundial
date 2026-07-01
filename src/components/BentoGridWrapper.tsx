'use client';

import React, { useState } from 'react';
import { Article } from '@/data/mockData';
import BentoGrid from './BentoGrid';
import BentoCard from './BentoCard';
import LiveResultsWidget from './LiveResultsWidget';
import PlayerStatsWidget from './PlayerStatsWidget';
import { ShieldCheck, AlertTriangle, Eye, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface BentoGridWrapperProps {
  articles: Article[];
}

export default function BentoGridWrapper({ articles }: BentoGridWrapperProps) {
  const [visibleCount, setVisibleCount] = useState(12);

  // Group or identify special articles from the loaded list
  const heroArticle = articles.find(art => art.trending) || articles[0];
  const otherArticles = articles.filter(art => art.id !== heroArticle?.id);

  // Slice articles according to pagination (leaving room for hero and widgets)
  // We want to show a total of `visibleCount` elements.
  // The first cards are:
  // 1. Hero card (counts as 1)
  // 2. Live results widget (counts as 1)
  // 3. Player stats widget (counts as 1)
  // 4. Sobre nosotros (counts as 1)
  // So we show up to `visibleCount - 4` news articles from `otherArticles`.
  const displayedNewsCount = Math.max(0, visibleCount - 4);
  const displayedSecondary = otherArticles.slice(0, displayedNewsCount);

  // Check if there are more articles to load
  const hasMore = otherArticles.length > displayedSecondary.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 24);
  };

  return (
    <div className="space-y-8">
      <BentoGrid>
        
        {/* 1. Hero / Main Trending Article Card */}
        {heroArticle && (
          <BentoCard
            title={heroArticle.title}
            excerpt={heroArticle.excerpt}
            category={heroArticle.category}
            imageUrl={heroArticle.imageUrl}
            date={heroArticle.date}
            readTime={heroArticle.readTime}
            trending={heroArticle.trending}
            author={heroArticle.author}
            likes={heroArticle.likes}
            className="md:col-span-2 md:row-span-2"
            href={`/articulo/${heroArticle.slug || heroArticle.id}`}
          />
        )}

        {/* 2. LIVE RESULTS WIDGET (Client-Side Interactivity) */}
        <BentoCard 
          title="Resultados en Vivo" 
          category="resultados" 
          className="md:col-span-2 md:row-span-2"
        >
          <LiveResultsWidget />
        </BentoCard>

        {/* 3. PLAYER STATS WIDGET (Client-Side Interactivity) */}
        <BentoCard 
          title="Estadísticas de Jugadores" 
          category="estadisticas" 
          className="md:col-span-2 md:row-span-3"
        >
          <PlayerStatsWidget />
        </BentoCard>

        {/* 4. Sobre Nosotros (Integrated Bento Block) */}
        <div className="group relative overflow-hidden rounded-2xl border border-purple-900/40 bg-gradient-to-br from-purple-950/20 to-zinc-950/80 p-5 flex flex-col justify-between md:col-span-1 md:row-span-1 shadow-neon-green/5 hover:border-purple-500/40 transition-all duration-300">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <ShieldCheck className="h-24 w-24 text-purple-400" />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-[9px] font-mono font-bold tracking-widest text-purple-400 uppercase">
                SOBRE NOSOTROS
              </span>
            </div>
            <h4 className="text-sm font-bold tracking-tight text-white uppercase">
              La Red Informativa Independiente
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Somos un colectivo global de periodistas y analistas de datos deportivos. No vendemos servicios ni representamos corporaciones. Nuestro único fin es reportar con absoluta libertad e inmediatez las noticias tácticas del Mundial y convocatorias nacionales, apoyados por estadísticas avanzadas.
            </p>
          </div>
          
          <div className="flex items-center justify-between border-t border-purple-950/40 pt-3 mt-4 text-[9px] font-mono text-zinc-500">
            <span>RED DE AUTORES PÚBLICA</span>
            <span className="text-purple-500 font-bold">100% INFORMATIVO</span>
          </div>
        </div>

        {/* 5. Additional Articles (Render dynamically up to visible slice) */}
        {displayedSecondary.map((article, index) => {
          // Asymmetrically size secondary articles for design flow
          const spanClass = index % 3 === 0 
            ? 'md:col-span-2 md:row-span-1' 
            : 'md:col-span-1 md:row-span-1';
            
          return (
            <BentoCard
              key={article.id}
              title={article.title}
              excerpt={article.excerpt}
              category={article.category}
              imageUrl={article.imageUrl}
              date={article.date}
              readTime={article.readTime}
              trending={article.trending}
              author={article.author}
              likes={article.likes}
              className={spanClass}
              href={`/articulo/${article.slug || article.id}`}
            />
          );
        })}

        {/* 6. Tactical Alert / Empty state backup */}
        {articles.length === 0 && (
          <div className="col-span-full py-12 text-center rounded-2xl border border-dashed border-zinc-900 bg-zinc-950/20 flex flex-col items-center justify-center space-y-3">
            <AlertTriangle className="h-8 w-8 text-zinc-650 animate-bounce" />
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
              No se encontraron reportes en esta frecuencia
            </span>
            <Link 
              href="/" 
            className="text-xs font-mono text-purple-400 hover:underline uppercase font-bold"
            >
              Volver a la frecuencia principal
            </Link>
          </div>
        )}

      </BentoGrid>

      {/* Pagination Controls */}
      {hasMore && (
        <div className="flex justify-center pt-4">
          <button
            onClick={handleLoadMore}
            className="px-8 py-3.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-850 hover:border-zinc-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer shadow-lg hover:shadow-purple-500/5 flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4 text-purple-500" />
            <span>Cargar más artículos</span>
          </button>
        </div>
      )}
    </div>
  );
}
