import React from 'react';
import Link from 'next/link';
import { Users, ArrowLeft, Trophy, Calendar, Eye } from 'lucide-react';

export default function AutoresPage() {
  const autores = [
    {
      name: 'Mateo Valenzuela',
      role: 'Analista Táctico Principal',
      bio: 'Especialista en esquemas de juego modernos y transiciones de bloque defensivo. Ex-entrenador de divisiones juveniles y entusiasta del big data.',
      matches: 142,
    },
    {
      name: 'Sofía Benítez',
      role: 'Corresponsal de Lesiones & Planteles',
      bio: 'Kinesióloga y redactora deportiva. Cubre los partes médicos, tiempos de recuperación física y novedades en los campos de entrenamiento de las selecciones.',
      matches: 98,
    },
    {
      name: 'Diego Rossi',
      role: 'Cronista de Campo y Convocatorias',
      bio: 'Periodista con más de una década cubriendo citas mundialistas e internacionales. Apasionado por las historias humanas del fútbol y selecciones emergentes.',
      matches: 210,
    },
  ];

  return (
    <div className="flex-grow flex items-center justify-center p-6 md:p-12 max-w-4xl mx-auto w-full">
      <div className="w-full rounded-2xl border border-zinc-900 bg-zinc-950/40 p-8 backdrop-blur-md space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
          <Users className="h-32 w-32 text-emerald-400" />
        </div>
        
        <div className="space-y-2">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-350 transition-colors uppercase font-bold">
            <ArrowLeft className="h-3 w-3" />
            <span>Volver al Control</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-white uppercase mt-2">
            Página de Autores
          </h1>
          <span className="text-[9px] font-mono text-zinc-500 uppercase block tracking-wider">// EXPEDIENTES DE REDACCIÓN COMPILADOS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-zinc-900/60 pt-6">
          {autores.map((autor) => (
            <div key={autor.name} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/20 hover:border-zinc-800 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                    {autor.role}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white tracking-tight">
                  {autor.name}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  {autor.bio}
                </p>
              </div>
              <div className="border-t border-zinc-900/60 pt-3 flex items-center justify-between text-[9px] font-mono text-zinc-500">
                <span className="flex items-center gap-1">
                  <Trophy className="h-3 w-3 text-zinc-650" />
                  {autor.matches} Reportes
                </span>
                <span className="text-emerald-500 font-bold">ACTIVO</span>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-zinc-900/60 pt-4 flex justify-between items-center text-[9px] font-mono text-zinc-650">
          <span>ÚLTIMA COMPILACIÓN: JUNIO 2026</span>
          <span>ESTADO: VERIFICADO</span>
        </div>
      </div>
    </div>
  );
}
