'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Shield, Scale, Info, Users, FileText, ChevronRight } from 'lucide-react';
import ContactModal from './ContactModal';

export default function Footer() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const currentYear = new Date().getFullYear();

  const legalLinks = [
    { name: 'Políticas de Privacidad', href: '/legal/privacidad', icon: Shield },
    { name: 'Políticas de Cookies', href: '/legal/cookies', icon: Info },
    { name: 'Aviso Legal', href: '/legal/aviso-legal', icon: Scale },
    { name: 'Página de Autores', href: '/legal/autores', icon: Users },
    { name: 'Términos y Condiciones', href: '/legal/terminos', icon: FileText },
  ];

  return (
    <footer className="mt-auto border-t border-zinc-900 bg-zinc-950 text-zinc-400">
      
      {/* Upper Grid Area */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          
          {/* Brand/Niche Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono font-bold tracking-widest text-white text-sm">
                NOTICIAS MUNDIAL
              </span>
            </div>
            <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
              El centro de control informativo independiente más avanzado del fútbol global y selecciones nacionales. Cobertura estadística masiva y reportes de última hora en tiempo real.
            </p>
            <div className="text-[10px] font-mono text-zinc-600 bg-zinc-900/40 border border-zinc-900/60 p-2.5 rounded-lg inline-block">
              // CLASIFICACIÓN DE RED: PÚBLICA e INFORMATIVA
            </div>
          </div>

          {/* Legal Links Column */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-white uppercase">
              Información Legal
            </h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-xs hover:text-white transition-colors"
                  >
                    <link.icon className="h-3.5 w-3.5 text-zinc-600 group-hover:text-emerald-500 transition-colors" />
                    <span>{link.name}</span>
                    <ChevronRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-emerald-500 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Trigger Column */}
          <div className="md:col-span-3 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold tracking-widest text-white uppercase">
                Soporte & Prensa
              </h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                ¿Tienes alguna consulta o reporte de última hora? Nuestro canal de comunicación está disponible.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => setIsContactOpen(true)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-850 hover:border-zinc-700 text-white font-mono text-xs font-bold uppercase tracking-wider py-3 px-4 transition-all duration-200 active:scale-[0.98] cursor-pointer shadow-lg hover:shadow-emerald-500/5"
              >
                <Mail className="h-4 w-4 text-emerald-500" />
                <span>Contacto Directo</span>
              </button>
            </div>
          </div>

        </div>

        {/* Separator */}
        <div className="my-8 border-t border-zinc-900/60" />

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[10px] font-mono text-zinc-600">
            © {currentYear} NOTICIAS MUNDIAL. Todos los derechos reservados.
          </div>
          <div className="text-[10px] font-mono text-zinc-600 flex items-center gap-2">
            <span>TERMINAL V4.1.0-STABLE</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/60 animate-ping" />
          </div>
        </div>
      </div>

      {/* Global Contact Form Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </footer>
  );
}
