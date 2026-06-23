import React from 'react';
import Link from 'next/link';
import { Info, ArrowLeft } from 'lucide-react';

export default function CookiesPage() {
  return (
    <div className="flex-grow flex items-center justify-center p-6 md:p-12 max-w-2xl mx-auto">
      <div className="w-full rounded-2xl border border-zinc-900 bg-zinc-950/40 p-8 backdrop-blur-md space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
          <Info className="h-32 w-32 text-emerald-400" />
        </div>
        
        <div className="space-y-2">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-350 transition-colors uppercase font-bold">
            <ArrowLeft className="h-3 w-3" />
            <span>Volver al Control</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-white uppercase mt-2">
            Políticas de Cookies
          </h1>
          <span className="text-[9px] font-mono text-zinc-500 uppercase block tracking-wider">// RASTREO TÉCNICO DE RED</span>
        </div>

        <div className="space-y-4 text-xs text-zinc-400 leading-relaxed font-sans border-t border-zinc-900/60 pt-4">
          <p>
            Este sitio web utiliza cookies técnicas para mejorar la experiencia del usuario y analizar el rendimiento de la cuadrícula Bento. Al navegar por nuestro portal deportivo de última generación, aceptas el uso de cookies.
          </p>
          <p>
            Las cookies son pequeños fragmentos de datos almacenados en tu navegador que nos ayudan a saber qué categorías visitas con mayor frecuencia, para optimizar el enrutamiento de la caché y acelerar los tiempos de carga en dispositivos móviles y de escritorio.
          </p>
          <p>
            Puedes desactivar las cookies en los ajustes de configuración de tu navegador si prefieres navegar con un perfil totalmente anónimo e indetectable.
          </p>
        </div>

        <div className="border-t border-zinc-900/60 pt-4 flex justify-between items-center text-[9px] font-mono text-zinc-650">
          <span>ÚLTIMA REVISIÓN: JUNIO 2026</span>
          <span>ESTADO: COMPILADO</span>
        </div>
      </div>
    </div>
  );
}
