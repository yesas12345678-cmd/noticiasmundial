import React from 'react';
import Link from 'next/link';
import { Scale, ArrowLeft } from 'lucide-react';

export default function AvisoLegalPage() {
  return (
    <div className="flex-grow flex items-center justify-center p-6 md:p-12 max-w-2xl mx-auto">
      <div className="w-full rounded-2xl border border-zinc-900 bg-zinc-950/40 p-8 backdrop-blur-md space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
          <Scale className="h-32 w-32 text-emerald-400" />
        </div>
        
        <div className="space-y-2">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-350 transition-colors uppercase font-bold">
            <ArrowLeft className="h-3 w-3" />
            <span>Volver al Control</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-white uppercase mt-2">
            Aviso Legal
          </h1>
          <span className="text-[9px] font-mono text-zinc-500 uppercase block tracking-wider">// CLÁUSULA DE EXENCIÓN DE RESPONSABILIDAD</span>
        </div>

        <div className="space-y-4 text-xs text-zinc-400 leading-relaxed font-sans border-t border-zinc-900/60 pt-4">
          <p>
            En cumplimiento de la legislación de servicios de la sociedad de la información, informamos a los usuarios que <strong>NOTICIAS MUNDIAL</strong> es un blog de carácter 100% informativo y libre de transacciones comerciales.
          </p>
          <p>
            <strong>Exención de Responsabilidad:</strong> El contenido provisto en este sitio web es recopilado con propósitos periodísticos y divulgativos generales. No brindamos asesoramiento deportivo, apuestas recomendadas ni representamos de forma oficial a la F.I.F.A. o a federaciones de fútbol locales. Todo el análisis de lesiones y estadísticas se basa en fuentes públicas y deducción analítica.
          </p>
          <p>
            No somos intermediarios ni ofrecemos servicios de consultoría o patrocinio deportivo bajo ningún concepto.
          </p>
        </div>

        <div className="border-t border-zinc-900/60 pt-4 flex justify-between items-center text-[9px] font-mono text-zinc-650">
          <span>ÚLTIMA REVISIÓN: JUNIO 2026</span>
          <span>ESTADO: VÁLIDO</span>
        </div>
      </div>
    </div>
  );
}
