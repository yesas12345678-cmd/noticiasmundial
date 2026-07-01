'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, ArrowLeft, Trophy, Search, Clock, ChevronRight, Loader2 } from 'lucide-react';
import { getArticlesAction, AdminArticle } from '../../admin/actions';

export default function AutoresPage() {
  const [articles, setArticles] = useState<AdminArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      try {
        const data = await getArticlesAction();
        setArticles(data);
      } catch (e) {
        console.error('Error fetching articles for authors page search:', e);
      } finally {
        setIsLoading(false);
      }
    }
    loadArticles();
  }, []);

  const autores = [
    {
      name: 'Mateo Valenzuela',
      role: 'Analista Táctico Principal',
      bio: 'Especialista en esquemas de juego modernos y transiciones de bloque defensivo. Ex-entrenador de divisiones juveniles y entusiasta del big data.',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200', // Professional profile photo
      matches: 17,
    },
    {
      name: 'Sofía Benítez',
      role: 'Corresponsal de Lesiones & Planteles',
      bio: 'Kinesióloga y redactora deportiva. Cubre los partes médicos, tiempos de recuperación física y novedades en los campos de entrenamiento de las selecciones.',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200',
      matches: 17,
    },
    {
      name: 'Diego Rossi',
      role: 'Cronista de Campo y Convocatorias',
      bio: 'Periodista con más de una década cubriendo citas mundialistas e internacionales. Apasionado por las historias humanas del fútbol y selecciones emergentes.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
      matches: 16,
    },
  ];

  // Filter articles based on search query
  const filteredArticles = articles.filter(art => {
    if (!searchQuery) return false; // only show search results if they typed something
    return (
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.keyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="flex-grow py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-8">
      
      {/* Back button and title */}
      <div className="space-y-3">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-350 transition-colors uppercase font-bold">
          <ArrowLeft className="h-3 w-3" />
          <span>Volver al Control</span>
        </Link>
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-emerald-500" />
          <h1 className="text-2xl font-bold tracking-tight text-white uppercase">
            Equipo Editorial y Autores
          </h1>
        </div>
        <span className="text-[9px] font-mono text-zinc-550 uppercase block tracking-wider">// EXPEDIENTES DE REDACCIÓN COMPILADOS</span>
      </div>

      {/* Authors Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-zinc-900/60 pt-6">
        {autores.map((autor) => (
          <div 
            key={autor.name} 
            className="p-5 rounded-xl border border-zinc-900 bg-zinc-950/20 hover:border-zinc-800 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-4">
              
              {/* Profile Image */}
              <div className="relative h-20 w-20 rounded-xl overflow-hidden border border-zinc-850">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={autor.photo} 
                  alt={autor.name}
                  className="h-full w-full object-cover" 
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-wider leading-none">
                    {autor.role}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white tracking-tight leading-tight">
                  {autor.name}
                </h4>
                <p className="text-xs text-zinc-450 leading-relaxed font-sans pt-1">
                  {autor.bio}
                </p>
              </div>

            </div>

            <div className="border-t border-zinc-900/60 pt-3 flex items-center justify-between text-[9px] font-mono text-zinc-650">
              <span className="flex items-center gap-1 font-bold">
                <Trophy className="h-3 w-3 text-zinc-700" />
                {autor.matches} Artículos
              </span>
              <span className="text-emerald-500 font-bold uppercase">ACTIVO</span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Article / Topic Search engine */}
      <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-6 backdrop-blur-md space-y-4">
        <div className="space-y-1">
          <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            Buscador del Archivo Histórico
          </h3>
          <p className="text-[11px] text-zinc-400 font-sans">
            Ingresa términos de búsqueda para localizar análisis de selecciones, lesiones, marcadores y estadísticas.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/40 border border-zinc-850 rounded-xl pl-10 pr-4 py-3.5 text-xs text-white placeholder-zinc-650 focus:outline-none focus:border-emerald-500/50 transition-all font-mono"
            placeholder="Escribe para buscar... ej. España, lesión, táctica"
          />
          <Search className="absolute left-3.5 top-4 h-4 w-4 text-zinc-650" />
        </div>

        {/* Search Results */}
        <div className="space-y-3 pt-2">
          {isLoading ? (
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-550 justify-center py-6">
              <Loader2 className="h-4 w-4 animate-spin text-emerald-500" />
              <span>Buscando en ficheros...</span>
            </div>
          ) : searchQuery ? (
            filteredArticles.length > 0 ? (
              <div className="divide-y divide-zinc-900/50 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                {filteredArticles.map((art) => (
                  <Link
                    key={art.id}
                    href={`/articulo/${art.slug || art.id}`}
                    className="group py-3 flex items-center justify-between hover:bg-zinc-900/10 transition-all px-2 rounded-lg"
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight">
                        {art.title}
                      </div>
                      <div className="flex items-center gap-3 text-[9px] font-mono text-zinc-550">
                        <span className="uppercase text-zinc-450">{art.category}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-2.5 w-2.5" />
                          {art.date}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-emerald-500 transition-all group-hover:translate-x-0.5" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-xs font-mono text-zinc-600 italic">
                Ningún artículo coincide con tu criterio de búsqueda.
              </div>
            )
          ) : (
            <div className="text-center py-8 text-xs font-mono text-zinc-600 italic border border-dashed border-zinc-900/60 rounded-xl bg-zinc-950/20">
              Escribe arriba para consultar la base de datos de artículos.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
