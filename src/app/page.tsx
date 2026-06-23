import React from 'react';
import { mockArticles, Article } from '../data/mockData';
import BentoGrid from '../components/BentoGrid';
import BentoCard from '../components/BentoCard';
import LiveResultsWidget from '../components/LiveResultsWidget';
import PlayerStatsWidget from '../components/PlayerStatsWidget';
import { Target, AlertTriangle, ShieldCheck, Flame, Cpu, Eye, Network } from 'lucide-react';
import Link from 'next/link';
import { pool, initDB } from '@/lib/db';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  // Initialize database schema and seed if empty
  await initDB();

  const resolvedParams = await searchParams;
  const activeCategory = resolvedParams.category || 'todos';

  let articles: Article[] = [];
  try {
    const client = await pool.connect();
    try {
      const { rows } = await client.query('SELECT * FROM articles ORDER BY id ASC');
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
      }));
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Error fetching articles from DB, falling back to mockData:', err);
    articles = mockArticles;
  }

  // Filter articles based on active category
  const filteredArticles = activeCategory === 'todos' 
    ? articles 
    : articles.filter(art => art.category === activeCategory);

  // Group or identify special articles
  const heroArticle = filteredArticles.find(art => art.trending) || filteredArticles[0];
  const secondaryArticles = filteredArticles.filter(art => art.id !== heroArticle?.id);

  return (
    <div className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
      
      {/* Brutalist Hero / Sports Command Center Header */}
      <section className="relative rounded-2xl border border-zinc-900 bg-zinc-950/40 p-6 md:p-8 overflow-hidden backdrop-blur-md">
        
        {/* Decorative tactical elements */}
        <div className="absolute top-3 left-3 text-[9px] font-mono text-zinc-650 tracking-wider">
          STATUS: ONLINE // SYS_ACTIVE
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-mono text-emerald-500 font-bold">RADAR MUNDIAL</span>
        </div>

        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Cpu className="h-3.5 w-3.5" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
              Centro de Operaciones Informativas
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-none">
            La Pizarra del <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500">Mundial</span> del Futuro
          </h1>
          
          <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
            Bienvenido al portal disruptivo de análisis táctico y reportes del mundial. Datos crudos, estadísticas avanzadas y partes médicos sin filtros. Explora la información en nuestro centro de control bento.
          </p>
        </div>

        {/* Quick category indicators / stat overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-zinc-900/60 text-zinc-400">
          <div className="space-y-1">
            <span className="text-[9px] font-mono text-zinc-650 block uppercase">// CONVOCATORIAS</span>
            <div className="text-xl font-bold font-mono text-white">26 Jugadores</div>
            <span className="text-[8px] font-mono text-zinc-500 block">Nóminas confirmadas</span>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] font-mono text-zinc-650 block uppercase">// REPORTES DE LESIÓN</span>
            <div className="text-xl font-bold font-mono text-red-400">4 Confirmadas</div>
            <span className="text-[8px] font-mono text-red-500/65 block">Riesgo en debut</span>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] font-mono text-zinc-650 block uppercase">// PARTIDOS EN VIVO</span>
            <div className="text-xl font-bold font-mono text-emerald-400">2 Jugándose</div>
            <span className="text-[8px] font-mono text-emerald-500/65 block">Señales satelitales</span>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] font-mono text-zinc-650 block uppercase">// LECTORES ACTIVOS</span>
            <div className="text-xl font-bold font-mono text-white">41.8k / min</div>
            <span className="text-[8px] font-mono text-zinc-500 block">Red global abierta</span>
          </div>
        </div>

      </section>

      {/* Main Bento Dashboard Grid */}
      <section id="dashboard-bento" className="scroll-mt-20">
        
        {/* Dynamic Category Breadcrumb */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-2">
            <Network className="h-4 w-4 text-emerald-500" />
            <h2 className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase">
              VISTA ACTUAL: {activeCategory === 'todos' ? 'TODAS LAS NOTICIAS' : activeCategory.toUpperCase()}
            </h2>
          </div>
          {activeCategory !== 'todos' && (
            <Link 
              href="/"
              className="text-[10px] font-mono text-emerald-400 hover:text-emerald-350 transition-colors uppercase font-bold"
            >
              [ Restablecer Vista ]
            </Link>
          )}
        </div>

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
            className="md:col-span-2 md:row-span-2"
          >
            <PlayerStatsWidget />
          </BentoCard>

          {/* 4. Sobre Nosotros (Integrated Bento Block) */}
          <div className="group relative overflow-hidden rounded-2xl border border-emerald-900/40 bg-gradient-to-br from-emerald-950/20 to-zinc-950/80 p-5 flex flex-col justify-between md:col-span-1 md:row-span-1 shadow-neon-green/5 hover:border-emerald-500/40 transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <ShieldCheck className="h-24 w-24 text-emerald-400" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-mono font-bold tracking-widest text-emerald-400 uppercase">
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
            
            <div className="flex items-center justify-between border-t border-emerald-950/40 pt-3 mt-4 text-[9px] font-mono text-zinc-500">
              <span>RED DE AUTORES PÚBLICA</span>
              <span className="text-emerald-500 font-bold">100% INFORMATIVO</span>
            </div>
          </div>

          {/* 5. Additional Articles (Render dynamically) */}
          {secondaryArticles.map((article, index) => {
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
              />
            );
          })}

          {/* 6. Tactical Alert / Empty state backup */}
          {filteredArticles.length === 0 && (
            <div className="col-span-full py-12 text-center rounded-2xl border border-dashed border-zinc-900 bg-zinc-950/20 flex flex-col items-center justify-center space-y-3">
              <AlertTriangle className="h-8 w-8 text-zinc-650 animate-bounce" />
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                No se encontraron reportes en esta frecuencia
              </span>
              <Link 
                href="/" 
                className="text-xs font-mono text-emerald-400 hover:underline uppercase font-bold"
              >
                Volver a la frecuencia principal
              </Link>
            </div>
          )}

        </BentoGrid>
      </section>

      {/* Decorative floating tactical radar grid (Visual flair for background) */}
      <div className="relative border border-zinc-900/60 rounded-2xl bg-zinc-950/10 p-6 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293704_1px,transparent_1px),linear-gradient(to_bottom,#1f293704_1px,transparent_1px)] bg-[size:32px_32px] -z-10" />
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <Flame className="h-4 w-4 text-emerald-500" />
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">MODO ULTRA ANÁLISIS</span>
          </div>
          <p className="text-xs text-zinc-500 max-w-xl">
            Todos los datos estadísticos son procesados directamente desde los sensores oficiales del campeonato mundial, combinando telemetría de jugadores y reportes médicos certificados en tiempo real.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="text-center bg-zinc-950 border border-zinc-900 p-3 rounded-xl min-w-[80px]">
            <div className="text-lg font-mono font-black text-white leading-none">0.02s</div>
            <span className="text-[8px] font-mono text-zinc-650 block mt-1">LATENCIA DE RED</span>
          </div>
          <div className="text-center bg-zinc-950 border border-zinc-900 p-3 rounded-xl min-w-[80px]">
            <div className="text-lg font-mono font-black text-emerald-400 leading-none">99.8%</div>
            <span className="text-[8px] font-mono text-zinc-650 block mt-1">PRECISIÓN VAR</span>
          </div>
        </div>
      </div>

    </div>
  );
}
