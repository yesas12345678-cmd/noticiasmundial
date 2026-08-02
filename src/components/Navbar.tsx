'use client';

import React, { useState, Suspense } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function NavbarContent() {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') || 'todos';
  const [textSize, setTextSize] = useState<'small' | 'medium' | 'large' | 'xlarge'>('medium');

  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      const savedSize = localStorage.getItem('text-size') as 'small' | 'medium' | 'large' | 'xlarge' | null;
      if (savedSize && ['small', 'medium', 'large', 'xlarge'].includes(savedSize)) {
        setTimeout(() => setTextSize(savedSize), 0);
        document.documentElement.setAttribute('data-text-size', savedSize);
      }
    }
  }, []);

  const changeTextSize = (size: 'small' | 'medium' | 'large' | 'xlarge') => {
    setTextSize(size);
    localStorage.setItem('text-size', size);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-text-size', size);
    }
  };

  const categories = [
    { id: 'todos', name: 'Todas' },
    { id: 'internacional', name: 'Internacional' },
    { id: 'economia', name: 'Economía' },
    { id: 'tecnologia', name: 'Tecnología' },
    { id: 'cultura', name: 'Cultura' },
    { id: 'deportes', name: 'Deportes' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
      {/* Accent color bar */}
      <div className="h-[3px] w-full bg-gradient-to-r from-purple-600 via-blue-500 via-emerald-400 via-yellow-450 via-orange-500 to-red-650" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:border-purple-500/50 transition-all duration-300">
                <Globe className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-widest text-white leading-none">
                  NOTICIAS
                </span>
                <span className="text-xs tracking-widest text-purple-400 font-bold leading-none mt-1">
                  MUNDIAL
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1.5">
            {categories.map((cat) => {
              const href = cat.id === 'todos' ? '/' : `/?category=${cat.id}`;
              const isActive = activeCategory === cat.id;

              return (
                <Link
                  key={cat.id}
                  href={href}
                  className={`relative px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 border border-transparent ${
                    isActive
                      ? 'text-purple-400 bg-purple-950/40 border-purple-900/60 shadow shadow-purple-500/10'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-900/60'
                  }`}
                >
                  {cat.name}
                </Link>
              );
            })}
          </nav>

          {/* Controls / Info */}
          <div className="hidden md:flex items-center gap-4">
            {/* Accessibility Font Size Toggle */}
            <div className="flex items-center gap-1 bg-zinc-900/80 border border-zinc-800 p-1 rounded-lg">
              <span className="text-[10px] font-bold text-zinc-500 uppercase px-2">Texto:</span>
              <button
                onClick={() => changeTextSize('small')}
                className={`px-2 py-0.5 rounded text-xs font-bold transition-all ${
                  textSize === 'small' ? 'bg-purple-600 text-white' : 'text-zinc-400 hover:text-white'
                }`}
                title="Letra pequeña"
              >
                A-
              </button>
              <button
                onClick={() => changeTextSize('medium')}
                className={`px-2 py-0.5 rounded text-xs font-bold transition-all ${
                  textSize === 'medium' ? 'bg-purple-600 text-white' : 'text-zinc-400 hover:text-white'
                }`}
                title="Letra normal"
              >
                A
              </button>
              <button
                onClick={() => changeTextSize('large')}
                className={`px-2 py-0.5 rounded text-xs font-bold transition-all ${
                  textSize === 'large' ? 'bg-purple-600 text-white' : 'text-zinc-400 hover:text-white'
                }`}
                title="Letra grande"
              >
                A+
              </button>
              <button
                onClick={() => changeTextSize('xlarge')}
                className={`px-2 py-0.5 rounded text-xs font-bold transition-all ${
                  textSize === 'xlarge' ? 'bg-purple-600 text-white' : 'text-zinc-400 hover:text-white'
                }`}
                title="Letra muy grande"
              >
                A++
              </button>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/20 border border-emerald-950/40 text-xs font-medium text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Actualizado en vivo</span>
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
        <div className="xl:hidden border-t border-zinc-900 bg-zinc-950 px-4 py-3 space-y-2">
          {categories.map((cat) => {
            const href = cat.id === 'todos' ? '/' : `/?category=${cat.id}`;
            const isActive = activeCategory === cat.id;

            return (
              <Link
                key={cat.id}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`w-full text-left flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? 'text-purple-400 bg-purple-950/30 border border-purple-900/40'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-900/50'
                }`}
              >
                <span>{cat.name}</span>
              </Link>
            );
          })}
          
          {/* Mobile Accessibility controls */}
          <div className="flex flex-col gap-2 pt-2 border-t border-zinc-900">
            <div className="flex items-center justify-between bg-zinc-900/80 border border-zinc-800 p-1 rounded-lg">
              <span className="text-[10px] font-bold text-zinc-500 uppercase px-2">Tamaño de Texto:</span>
              <div className="flex gap-1">
                <button
                  onClick={() => changeTextSize('small')}
                  className={`px-2 py-0.5 rounded text-xs font-bold transition-all ${
                    textSize === 'small' ? 'bg-purple-600 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  A-
                </button>
                <button
                  onClick={() => changeTextSize('medium')}
                  className={`px-2 py-0.5 rounded text-xs font-bold transition-all ${
                    textSize === 'medium' ? 'bg-purple-600 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  A
                </button>
                <button
                  onClick={() => changeTextSize('large')}
                  className={`px-2 py-0.5 rounded text-xs font-bold transition-all ${
                    textSize === 'large' ? 'bg-purple-600 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  A+
                </button>
                <button
                  onClick={() => changeTextSize('xlarge')}
                  className={`px-2 py-0.5 rounded text-xs font-bold transition-all ${
                    textSize === 'xlarge' ? 'bg-purple-600 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  A++
                </button>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 w-full justify-center px-3 py-2 rounded-lg bg-emerald-950/20 border border-emerald-950/40 text-xs font-medium text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Actualizado en vivo</span>
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
