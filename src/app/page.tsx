import React from 'react';
import { mockArticles, Article } from '../data/mockData';
import BentoGridWrapper from '../components/BentoGridWrapper';
import { Flame, Cpu, Network } from 'lucide-react';
import Link from 'next/link';
import { pool, initDB } from '@/lib/db';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ category?: string; search?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  // Initialize database schema and seed if empty
  await initDB();

  const resolvedParams = await searchParams;
  const activeCategory = resolvedParams.category || 'todos';
  const searchQuery = resolvedParams.search || '';

  let articles: Article[] = [];
  try {
    const client = await pool.connect();
    try {
      const { rows } = await client.query('SELECT * FROM articles ORDER BY published_at DESC');
      articles = rows.map((row) => ({
        id: row.id,
        title: row.title,
        excerpt: row.excerpt,
        category: row.category as any,
        imageUrl: row.image_url,
        date: row.date,
        readTime: row.read_time,
        trending: row.trending,
        author: row.author,
        likes: row.likes,
        keyword: row.keyword,
        slug: row.slug,
      }));
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Error fetching articles from DB, falling back to mockData:', err);
    articles = mockArticles;
  }

  // Filter articles based on active category and search query
  let filteredArticles = activeCategory === 'todos' 
    ? articles 
    : articles.filter(art => art.category === activeCategory);

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredArticles = filteredArticles.filter(art => 
      art.title.toLowerCase().includes(query) ||
      (art.excerpt && art.excerpt.toLowerCase().includes(query)) ||
      (art.keyword && art.keyword.toLowerCase().includes(query))
    );
  }

  return (
    <div className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
      
      {/* Hero Header Section */}
      <section className="relative rounded-2xl border border-zinc-900 bg-zinc-950/60 p-6 md:p-10 overflow-hidden backdrop-blur-md">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-none">
            Noticias Mundial <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-500">Digital</span>
          </h1>
          
          <p className="text-base text-zinc-300 max-w-2xl leading-relaxed">
            Tu portal de información independiente y análisis internacional en tiempo real. Datos contrastados y cobertura periodística completa.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-6 max-w-xl">
          <form method="GET" action="/" className="flex gap-2">
            {activeCategory !== 'todos' && (
              <input type="hidden" name="category" value={activeCategory} />
            )}
            <div className="relative flex-1">
              <input
                type="text"
                name="search"
                defaultValue={searchQuery}
                placeholder="Escribe para buscar noticias..."
                className="w-full h-11 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-semibold"
              />
            </div>
            <button
              type="submit"
              className="h-11 px-5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Buscar
            </button>
            {searchQuery && (
              <Link
                href={activeCategory !== 'todos' ? `/?category=${activeCategory}` : '/'}
                className="h-11 px-3 rounded-xl border border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:text-white flex items-center justify-center text-sm font-semibold transition-all"
              >
                Limpiar
              </Link>
            )}
          </form>
        </div>

      </section>

      {/* Main Bento Dashboard Grid */}
      <section id="dashboard-bento" className="scroll-mt-20">
        
        {/* Dynamic Category Breadcrumb */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-2">
            <Network className="h-4 w-4 text-purple-500" />
            <h2 className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase">
              {searchQuery 
                ? `BÚSQUEDA: "${searchQuery.toUpperCase()}"` 
                : `VISTA ACTUAL: ${activeCategory === 'todos' ? 'TODAS LAS NOTICIAS' : activeCategory.toUpperCase()}`}
            </h2>
          </div>
          {(activeCategory !== 'todos' || searchQuery) && (
            <Link 
              href="/"
              className="text-[10px] font-mono text-purple-400 hover:text-purple-350 transition-colors uppercase font-bold"
            >
              [ Restablecer Vista ]
            </Link>
          )}
        </div>

        {/* Dynamic Bento grid wrapper with client-side load-more pagination */}
        <BentoGridWrapper articles={filteredArticles} />

      </section>

      {/* Decorative floating radar grid (Visual flair for background) */}
      <div className="relative border border-zinc-900/60 rounded-2xl bg-zinc-950/10 p-6 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293704_1px,transparent_1px),linear-gradient(to_bottom,#1f293704_1px,transparent_1px)] bg-[size:32px_32px] -z-10" />
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">MODO COBERTURA MÁXIMA</span>
          </div>
          <p className="text-xs text-zinc-500 max-w-xl">
            La información expuesta es recopilada, verificada y publicada por agencias y corresponsalías independientes colaboradoras en cinco continentes, garantizando imparcialidad y rapidez.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="text-center bg-zinc-950 border border-zinc-900 p-3 rounded-xl min-w-[80px]">
            <div className="text-lg font-mono font-black text-white leading-none">0.01s</div>
            <span className="text-[8px] font-mono text-zinc-600 block mt-1">LATENCIA FEED</span>
          </div>
          <div className="text-center bg-zinc-950 border border-zinc-900 p-3 rounded-xl min-w-[80px]">
            <div className="text-lg font-mono font-black text-purple-400 leading-none">99.9%</div>
            <span className="text-[8px] font-mono text-zinc-600 block mt-1">RIGOR SEÑAL</span>
          </div>
        </div>
      </div>

    </div>
  );
}
