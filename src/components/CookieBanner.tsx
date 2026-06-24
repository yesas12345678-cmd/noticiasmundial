'use client';

import React, { useState, useEffect } from 'react';
import { ShieldAlert, Check, X, Info } from 'lucide-react';
import Link from 'next/link';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShowBanner(true);
    } else if (consent === 'accepted') {
      enableCookies();
    } else {
      disableCookies();
    }
  }, []);

  const enableCookies = () => {
    // Save consent
    localStorage.setItem('cookie_consent', 'accepted');
    
    // Set a tracking/analytical cookie as example
    document.cookie = "analytics_consent=true; max-age=31536000; path=/; SameSite=Lax";
    
    // Here we would dynamically initialize Google AdSense / Analytics scripts
    console.log("Cookies habilitadas: Cargando scripts analíticos y publicitarios.");
  };

  const disableCookies = () => {
    // Save rejection
    localStorage.setItem('cookie_consent', 'rejected');
    
    // Explicitly delete tracking/analytical cookies
    document.cookie = "analytics_consent=; max-age=0; path=/;";
    document.cookie = "cookie_consent=; max-age=0; path=/;";
    
    console.log("Cookies rechazadas: Borrando rastros analíticos.");
  };

  const handleAccept = () => {
    enableCookies();
    setShowBanner(false);
  };

  const handleReject = () => {
    disableCookies();
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:max-w-md z-50 animate-fade-in-up">
      <div className="rounded-2xl border border-zinc-900 bg-zinc-950/90 backdrop-blur-md p-5 shadow-2xl space-y-4">
        
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 shrink-0">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-mono font-bold tracking-wider text-white uppercase">
              Consentimiento de Datos
            </h4>
            <p className="text-[11px] text-zinc-400 leading-relaxed mt-1 font-sans">
              Utilizamos cookies técnicas y analíticas para optimizar el rendimiento de la cuadrícula Bento. Al aceptar, permites el análisis de telemetría deportiva.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between gap-3 pt-1 border-t border-zinc-900/60">
          <Link 
            href="/legal/cookies" 
            className="inline-flex items-center gap-1 text-[9px] font-mono text-zinc-650 hover:text-zinc-400 transition-colors uppercase"
          >
            <Info className="h-3 w-3" />
            <span>Ver Políticas</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleReject}
              className="px-3 py-1.5 rounded-lg border border-zinc-900 bg-zinc-900/40 hover:bg-zinc-900 hover:border-zinc-800 text-zinc-400 hover:text-white transition-all font-mono text-[9px] font-bold uppercase cursor-pointer"
            >
              Rechazar
            </button>
            <button
              onClick={handleAccept}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all font-mono text-[9px] font-bold uppercase flex items-center gap-1 cursor-pointer shadow-lg shadow-emerald-500/5"
            >
              <Check className="h-3 w-3" />
              <span>Aceptar</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
