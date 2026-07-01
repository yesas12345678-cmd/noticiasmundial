import React from 'react';
import Link from 'next/link';
import { Info, ArrowLeft } from 'lucide-react';

export default function CookiesPage() {
  return (
    <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      <div className="w-full rounded-2xl border border-zinc-900 bg-zinc-950/40 p-8 backdrop-blur-md space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
          <Info className="h-48 w-48 text-emerald-400" />
        </div>
        
        <div className="space-y-2">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-350 transition-colors uppercase font-bold">
            <ArrowLeft className="h-3 w-3" />
            <span>Volver al Control</span>
          </Link>
          <h1 className="text-3xl font-black tracking-tight text-white uppercase mt-2">
            Política de Cookies
          </h1>
          <span className="text-[9px] font-mono text-zinc-550 uppercase block tracking-wider">// PANEL DE CONTROL DE RASTREO TÉCNICO</span>
        </div>

        <div className="space-y-6 text-xs text-zinc-400 leading-relaxed font-sans border-t border-zinc-900/60 pt-6">
          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">1. ¿Qué son las Cookies?</h3>
            <p>
              Una cookie es un pequeño archivo de texto que un sitio web almacena en su navegador cuando usted lo visita. Su función principal es recordar información sobre su navegación para ofrecerle una experiencia de navegación más rápida y personalizada, y para permitir funcionalidades esenciales del sitio.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">2. Tipos de Cookies que Utilizamos</h3>
            <p>
              En Noticias Mundial clasificamos las cookies en las siguientes categorías en base a su finalidad técnica:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Cookies Técnicas y Necesarias:</strong> Son imprescindibles para que el sitio web funcione correctamente. Permiten la carga dinámica de la cuadrícula Bento de artículos deportivos, el almacenamiento de sus preferencias básicas de filtrado y el mantenimiento de las credenciales de administración seguras del panel de control.
              </li>
              <li>
                <strong>Cookies de Rendimiento y Análisis:</strong> Son aquellas que nos permiten contar las visitas y fuentes de tráfico para medir y mejorar el rendimiento de nuestro portal deportivo. Nos ayudan a saber qué reportes futbolísticos y estadísticas de jugadores son los más populares y cómo se mueven los visitantes por el sitio.
              </li>
              <li>
                <strong>Cookies de Publicidad Comportamental (Terceros):</strong> Son establecidas a través de nuestro sitio por socios publicitarios como Google AdSense. Estas empresas pueden utilizarlas para crear un perfil de sus intereses y mostrarle anuncios relevantes en otros sitios. No almacenan información personal directamente, sino que se basan en la identificación única de su navegador y dispositivo de acceso a Internet.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">3. Gestión e Inhabilitación de Cookies</h3>
            <p>
              Usted tiene el derecho de aceptar, configurar o rechazar el uso de cookies en cualquier momento. Puede cambiar la configuración de su navegador web para bloquear o recibir alertas sobre estas cookies. Tenga en cuenta que si bloquea o elimina todas las cookies, es posible que algunas secciones interactivas de nuestro portal deportivo de última generación no se muestren o funcionen de forma óptima.
            </p>
            <p>
              A continuación, le facilitamos los enlaces a las guías de configuración de cookies para los navegadores más utilizados en sistemas de escritorio y móviles:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Google Chrome:</strong> <a href="https://support.google.com/chrome/answer/95647" className="text-emerald-400 hover:underline" target="_blank" rel="noopener noreferrer">https://support.google.com/chrome/answer/95647</a></li>
              <li><strong>Mozilla Firefox:</strong> <a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" className="text-emerald-400 hover:underline" target="_blank" rel="noopener noreferrer">https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web...</a></li>
              <li><strong>Apple Safari:</strong> <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" className="text-emerald-400 hover:underline" target="_blank" rel="noopener noreferrer">https://support.apple.com/es-es/guide/safari/sfri11471/mac</a></li>
              <li><strong>Microsoft Edge:</strong> <a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-y-administrar-cookies-en-microsoft-edge-168dab11-0753-243d-7c16-ede5947fc64d" className="text-emerald-400 hover:underline" target="_blank" rel="noopener noreferrer">https://support.microsoft.com/es-es/microsoft-edge/...</a></li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">4. Consentimiento y Revocación</h3>
            <p>
              Cuando accede a nuestro sitio por primera vez, se le muestra un banner de consentimiento de cookies que le permite aceptar o gestionar sus preferencias. Puede cambiar de opinión o revocar su consentimiento en cualquier momento eliminando las cookies del sitio almacenadas en su navegador mediante la opción de borrado del historial de navegación.
            </p>
          </section>
        </div>

        <div className="border-t border-zinc-900/60 pt-4 flex justify-between items-center text-[9px] font-mono text-zinc-650">
          <span>ÚLTIMA REVISIÓN: JULIO 2026</span>
          <span>ESTADO: COMPILADO / COMPLIANTE LSSI-CE</span>
        </div>
      </div>
    </div>
  );
}
