import React from 'react';
import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';

export default function TerminosPage() {
  return (
    <div className="flex-grow flex items-center justify-center p-6 md:p-12 max-w-2xl mx-auto">
      <div className="w-full rounded-2xl border border-zinc-900 bg-zinc-950/40 p-8 backdrop-blur-md space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
          <FileText className="h-32 w-32 text-emerald-400" />
        </div>
        
        <div className="space-y-2">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-350 transition-colors uppercase font-bold">
            <ArrowLeft className="h-3 w-3" />
            <span>Volver al Control</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-white uppercase mt-2">
            Términos y Condiciones
          </h1>
          <span className="text-[9px] font-mono text-zinc-500 uppercase block tracking-wider">// PROTOCOLO DE ACCESO AL PORTAL</span>
        </div>

        <div className="space-y-4 text-xs text-zinc-400 leading-relaxed font-sans border-t border-zinc-900/60 pt-4">
          <p>
            Al ingresar y hacer uso del portal interactivo <strong>NOTICIAS MUNDIAL</strong>, usted acepta y se compromete a respetar los siguientes Términos y Condiciones de acceso público e informativo:
          </p>
          <p>
            <strong>1. Uso de la Información:</strong> Todo el material visual, los widgets táctiles, las simulaciones estadísticas y los reportes médicos se proporcionan únicamente para fines de entretenimiento y lectura informativa. Está prohibido el raspado (scraping) automático masivo no autorizado con fines comerciales.
          </p>
          <p>
            <strong>2. Naturaleza no Contractual:</strong> Este sitio web es exclusivamente un blog deportivo. No representamos a marcas comerciales de apuestas, federaciones nacionales de fútbol ni proveemos suscripciones de pago. Las conexiones simuladas en el terminal son componentes de diseño interactivo React.
          </p>
        </div>

        <div className="border-t border-zinc-900/60 pt-4 flex justify-between items-center text-[9px] font-mono text-zinc-650">
          <span>ÚLTIMA REVISIÓN: JUNIO 2026</span>
          <span>ESTADO: VIGENTE</span>
        </div>
      </div>
    </div>
  );
}
