import React from 'react';
import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';

export default function TerminosPage() {
  return (
    <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      <div className="w-full rounded-2xl border border-zinc-900 bg-zinc-950/40 p-8 backdrop-blur-md space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
          <FileText className="h-48 w-48 text-emerald-400" />
        </div>
        
        <div className="space-y-2">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-350 transition-colors uppercase font-bold">
            <ArrowLeft className="h-3 w-3" />
            <span>Volver al Control</span>
          </Link>
          <h1 className="text-3xl font-black tracking-tight text-white uppercase mt-2">
            Términos y Condiciones
          </h1>
          <span className="text-[9px] font-mono text-zinc-550 uppercase block tracking-wider">// REGLAMENTO DE ACCESO Y LEGISLACIÓN DE USO</span>
        </div>

        <div className="space-y-6 text-xs text-zinc-400 leading-relaxed font-sans border-t border-zinc-900/60 pt-6">
          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">1. Aceptación de las Condiciones de Uso</h3>
            <p>
              El acceso, navegación y uso del sitio web Noticias Mundial (https://noticiasmundial.xyz) implica la aceptación tácita e incondicional por parte del usuario de todas las cláusulas contenidas en este documento de Términos y Condiciones. Si no está de acuerdo con estas condiciones, le instamos a abandonar el sitio web de inmediato.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">2. Uso Autorizado y Restricciones</h3>
            <p>
              Este sitio web proporciona contenidos relacionados con el periodismo, análisis tácticos, estadísticas y partes de lesionados de las selecciones de fútbol de cara al torneo mundial del año 2026. El usuario se compromete a hacer un uso lícito y ético del portal, obligándose a:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>No emplear herramientas de extracción o raspado automático masivo de datos (scraping) de nuestros artículos para rellenar bases de datos comerciales ajenas.</li>
              <li>No intentar vulnerar las medidas de seguridad del servidor ni interferir con la entrega de widgets táctiles o el panel administrativo del portal.</li>
              <li>Utilizar los comentarios, widgets e interacciones del portal respetando la legalidad vigente y las normas básicas de convivencia digital.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">3. Limitación de Responsabilidad</h3>
            <p>
              Noticias Mundial declina cualquier responsabilidad derivada de decisiones personales o comerciales (tales como apuestas deportivas, inversiones o pronósticos de torneos) realizadas en base a los análisis y reportes estadísticos publicados en la web. El fútbol es un deporte impredecible y la información proporcionada constituye meras opiniones periodísticas y telemetría analítica basada en datos públicos.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">4. Propiedad Intelectual</h3>
            <p>
              Queda estrictamente prohibida la copia, alteración o distribución comercial de los artículos, códigos de diseño (Tailwind CSS, widgets de React y gráficos SVG) sin previa autorización escrita de la Redacción de Noticias Mundial. Se permite la compartición de artículos en redes sociales y medios digitales siempre que se incluya un hiperenlace visible y directo hacia la página original correspondiente en Noticias Mundial.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">5. Jurisdicción y Legislación Aplicable</h3>
            <p>
              Para la resolución de cualquier conflicto o discrepancia que pudiera surgir en relación con el acceso, uso o interpretación de los contenidos de Noticias Mundial, las partes se someten a la legislación española y a los tribunales de justicia competentes, renunciando a cualquier otro fuero que pudiera corresponderles.
            </p>
          </section>
        </div>

        <div className="border-t border-zinc-900/60 pt-4 flex justify-between items-center text-[9px] font-mono text-zinc-650">
          <span>ÚLTIMA REVISIÓN: JULIO 2026</span>
          <span>ESTADO: VIGENTE / OPERATIVO</span>
        </div>
      </div>
    </div>
  );
}
