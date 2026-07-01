import React from 'react';
import Link from 'next/link';
import { Shield, ArrowLeft } from 'lucide-react';

export default function PrivacidadPage() {
  return (
    <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
      <div className="w-full rounded-2xl border border-zinc-900 bg-zinc-950/40 p-8 backdrop-blur-md space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
          <Shield className="h-48 w-48 text-emerald-400" />
        </div>
        
        <div className="space-y-2">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-350 transition-colors uppercase font-bold">
            <ArrowLeft className="h-3 w-3" />
            <span>Volver al Control</span>
          </Link>
          <h1 className="text-3xl font-black tracking-tight text-white uppercase mt-2">
            Política de Privacidad
          </h1>
          <span className="text-[9px] font-mono text-zinc-550 uppercase block tracking-wider">// REGLAMENTO GENERAL DE PROTECCIÓN DE DATOS (RGPD)</span>
        </div>

        <div className="space-y-6 text-xs text-zinc-400 leading-relaxed font-sans border-t border-zinc-900/60 pt-6">
          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">1. Introducción y Responsable del Tratamiento</h3>
            <p>
              En Noticias Mundial, accesible desde la dirección pública asignada (https://noticiasmundial.xyz), nos comprometemos solemnemente a proteger la privacidad y seguridad de los datos personales de nuestros usuarios. En cumplimiento del Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica de Protección de Datos y Garantía de Derechos Digitales (LOPDGDD), le informamos que el responsable del tratamiento de los datos es la Redacción de Noticias Mundial, con correo de contacto legal: contacto@noticiasmundial.xyz.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">2. Google AdSense y la Cookie DoubleClick DART</h3>
            <p>
              Noticias Mundial utiliza Google AdSense como proveedor de servicios de publicidad de terceros para mostrar anuncios durante su visita.
            </p>
            <p>
              Google, como proveedor asociado, utiliza cookies de publicidad y balizas web para servir anuncios adaptados a las preferencias de los usuarios en base a su historial de navegación en este sitio web y en otros sitios de Internet.
            </p>
            <p>
              El uso de la cookie DoubleClick DART por parte de Google permite el servicio de publicidad personalizada en función de sus visitas. Los usuarios pueden inhabilitar el uso de la cookie de DART accediendo a la política de privacidad de la red de anuncios y contenido de Google en la siguiente dirección: <a href="https://policies.google.com/technologies/ads" className="text-emerald-400 hover:underline" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a>.
            </p>
            <p>
              Asimismo, los usuarios pueden gestionar la inhabilitación de cookies de terceros para publicidad personalizada a través del portal de autorregulación Your Online Choices (<a href="https://www.youronlinechoices.com/es/" className="text-emerald-400 hover:underline" target="_blank" rel="noopener noreferrer">www.youronlinechoices.com</a>) o inhabilitando el uso de cookies de anuncios en la configuración de su navegador web.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">3. Archivos de Registro (Log Files)</h3>
            <p>
              Noticias Mundial sigue un procedimiento estándar de uso de archivos de registro. Estos archivos registran a los visitantes cuando visitan los sitios web. La información recopilada por los archivos de registro incluye direcciones de protocolo de Internet (IP), tipo de navegador, proveedor de servicios de Internet (ISP), fecha y hora de la visita, páginas de referencia/salida y, en ocasiones, el número de clics. Estos datos no están vinculados a ninguna información que sea personalmente identificable y se utilizan únicamente para analizar tendencias, administrar el sitio, rastrear el movimiento de los usuarios y recopilar información demográfica general.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">4. Finalidad del Tratamiento de Datos</h3>
            <p>
              Tratamos los datos recopilados (telemetría básica y cookies técnicas) con las siguientes finalidades:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Garantizar el correcto funcionamiento de los componentes interactivos y widgets táctiles de la interfaz Bento.</li>
              <li>Analizar el rendimiento técnico del servidor, los tiempos de carga y la velocidad de entrega de los artículos deportivos.</li>
              <li>Personalizar y optimizar la experiencia de navegación del usuario recordando sus filtros de categorías preferidos.</li>
              <li>Servir anuncios publicitarios relevantes que ayuden a financiar de forma independiente este portal informativo.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">5. Derechos del Usuario (RGPD)</h3>
            <p>
              De conformidad con las leyes vigentes, usted dispone de los siguientes derechos específicos que puede ejercitar enviando una comunicación escrita a contacto@noticiasmundial.xyz:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Derecho de Acceso:</strong> Solicitar confirmación sobre si estamos tratando sus datos personales y obtener una copia de los mismos.</li>
              <li><strong>Derecho de Rectificación:</strong> Solicitar la corrección de datos inexactos o incompletos.</li>
              <li><strong>Derecho de Supresión (Olvido):</strong> Solicitar la eliminación de sus datos cuando ya no sean necesarios para los fines que fueron recabados.</li>
              <li><strong>Derecho de Oposición:</strong> Oponerse al tratamiento de sus datos con fines publicitarios o de análisis.</li>
              <li><strong>Derecho a la Limitación del Tratamiento:</strong> Solicitar la suspensión temporal del tratamiento de sus datos en los casos previstos por la ley.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">6. Cambios en la Política de Privacidad</h3>
            <p>
              Noticias Mundial se reserva el derecho de actualizar o modificar esta política en cualquier momento para adaptarla a novedades legislativas o requerimientos técnicos de la red de publicidad. Le sugerimos revisar este documento de forma periódica.
            </p>
          </section>
        </div>

        <div className="border-t border-zinc-900/60 pt-4 flex justify-between items-center text-[9px] font-mono text-zinc-650">
          <span>ÚLTIMA REVISIÓN: JULIO 2026</span>
          <span>ESTADO: REGISTRADO / COMPLIANTE RGPD</span>
        </div>
      </div>
    </div>
  );
}
