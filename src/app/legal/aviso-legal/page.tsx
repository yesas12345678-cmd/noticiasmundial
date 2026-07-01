import React from 'react';
import Link from 'next/link';
import { Scale, ArrowLeft } from 'lucide-react';

export default function AvisoLegalPage() {
  return (
    <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      <div className="w-full rounded-2xl border border-zinc-900 bg-zinc-950/40 p-8 backdrop-blur-md space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
          <Scale className="h-48 w-48 text-emerald-400" />
        </div>
        
        <div className="space-y-2">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-350 transition-colors uppercase font-bold">
            <ArrowLeft className="h-3 w-3" />
            <span>Volver al Control</span>
          </Link>
          <h1 className="text-3xl font-black tracking-tight text-white uppercase mt-2">
            Aviso Legal
          </h1>
          <span className="text-[9px] font-mono text-zinc-550 uppercase block tracking-wider">// CUMPLIMIENTO LSSI-CE v3.0</span>
        </div>

        <div className="space-y-6 text-xs text-zinc-400 leading-relaxed font-sans border-t border-zinc-900/60 pt-6">
          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">1. Información General del Sitio</h3>
            <p>
              En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa a los usuarios de los siguientes datos identificativos del titular del sitio web:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Denominación:</strong> Noticias Mundial</li>
              <li><strong>Actividad:</strong> Divulgación de periodismo deportivo y análisis táctico independiente sobre fútbol internacional.</li>
              <li><strong>Correo Electrónico de Contacto:</strong> contacto@noticiasmundial.xyz</li>
              <li><strong>URL de Acceso:</strong> https://noticiasmundial.xyz</li>
            </ul>
            <p>
              El acceso y uso de este sitio web le atribuye la condición de usuario, implicando su aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas en este Aviso Legal.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">2. Condiciones de Uso y Exención de Responsabilidad</h3>
            <p>
              Los contenidos de Noticias Mundial se facilitan con carácter puramente periodístico e informativo de cara a la Copa Mundial 2026.
            </p>
            <p>
              El titular del sitio no asume responsabilidad alguna por las decisiones de los usuarios tomadas en base a las predicciones deportivas, estadísticas avanzadas o informes sobre lesiones musculares y planteles publicados en el portal. No representamos ni tenemos relación oficial alguna con la F.I.F.A. (Fédération Internationale de Football Association) ni con ninguna de sus federaciones asociadas.
            </p>
            <p>
              El titular del sitio web no garantiza la ausencia de interrupciones o errores en el acceso al portal o a su contenido, ni que este se encuentre permanentemente actualizado, aunque realiza sus mejores esfuerzos para evitarlos.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">3. Propiedad Intelectual e Industrial</h3>
            <p>
              Todos los elementos que forman el sitio web (logotipos, iconos vectoriales SVG, widgets interactivos React, estilos visuales en Tailwind y recopilación de reportes periodísticos) son propiedad del titular o dispone de las licencias y autorizaciones necesarias de uso. Queda prohibida la reproducción total o parcial de los contenidos del sitio web sin la autorización expresa del titular o la mención explícita al enlace de origen.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">4. Política de Enlaces (Links)</h3>
            <p>
              Este sitio web puede contener enlaces a otros sitios gestionados por terceros. El titular de Noticias Mundial no ejerce ningún control sobre dichos sitios ni asume responsabilidad por el contenido, políticas de privacidad o prácticas de los mismos.
            </p>
          </section>
        </div>

        <div className="border-t border-zinc-900/60 pt-4 flex justify-between items-center text-[9px] font-mono text-zinc-650">
          <span>ÚLTIMA REVISIÓN: JULIO 2026</span>
          <span>ESTADO: VÁLIDO / CONFORME LSSI-CE</span>
        </div>
      </div>
    </div>
  );
}
