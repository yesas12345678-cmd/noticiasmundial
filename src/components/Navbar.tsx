'use client';

import React, { useState, Suspense } from 'react';
import { Menu, X, Trophy, Activity } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function NavbarContent() {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') || 'todos';

  const categories = [
    { id: 'todos', name: 'Todas las Noticias' },
    { id: 'selecciones', name: 'Noticias de Selecciones' },
    { id: 'lesiones', name: 'Lesiones y Convocatorias' },
    { id: 'resultados', name: 'Resultados en Vivo' },
    { id: 'estadisticas', name: 'Estadísticas de Jugadores' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-900 bg-zinc-950/70 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 group-hover:border-emerald-500/50 transition-all duration-300">
                <Trophy className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-mono font-bold tracking-widest text-white leading-none">
                  NOTICIAS
                </span>
                <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-semibold leading-none mt-1">
                  MUNDIAL
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {categories.map((cat) => {
              const href = cat.id === 'todos' ? '/' : `/?category=${cat.id}`;
              const isActive = activeCategory === cat.id;

              return (
                <Link
                  key={cat.id}
                  href={href}
                  className={`relative px-3.5 py-2 rounded-lg text-xs font-mono tracking-wide uppercase font-medium transition-all duration-200 border border-transparent ${
                    isActive
                      ? 'text-emerald-400 bg-emerald-950/30 border-emerald-950/50 shadow-neon-green'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                  }`}
                >
                  {cat.name}
                  {cat.id === 'resultados' && (
                    <span className="ml-2 inline-flex items-center">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                      </span>
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Controls / Info */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-950/20 border border-red-950/40 text-[10px] font-mono font-bold uppercase text-red-400">
              <Activity className="h-3 w-3 animate-pulse" />
              <span>Catar 2026 // LIVE</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex xl:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white transition-all border border-transparent hover:border-zinc-800"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden border-t border-zinc-900 bg-zinc-950 px-4 py-3 space-y-1">
          {categories.map((cat) => {
            const href = cat.id === 'todos' ? '/' : `/?category=${cat.id}`;
            const isActive = activeCategory === cat.id;

            return (
              <Link
                key={cat.id}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-lg text-xs font-mono tracking-wider uppercase transition-all ${
                  isActive
                    ? 'text-emerald-400 bg-emerald-950/20 border-emerald-950/30'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                }`}
              >
                <span>{cat.name}</span>
                {cat.id === 'resultados' && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                )}
              </Link>
            );
          })}
          <div className="pt-2 pb-1 border-t border-zinc-900 mt-2">
            <div className="inline-flex items-center gap-1.5 w-full justify-center px-3 py-2 rounded-lg bg-red-950/20 border border-red-950/40 text-[10px] font-mono font-bold uppercase text-red-400">
              <Activity className="h-3 w-3 animate-pulse" />
              <span>Catar 2026 // LIVE INDEX</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={
      <header className="sticky top-0 z-40 w-full border-b border-zinc-900 bg-zinc-950/70 backdrop-blur-md h-16" />
    }>
      <NavbarContent />
    </Suspense>
  );
}
