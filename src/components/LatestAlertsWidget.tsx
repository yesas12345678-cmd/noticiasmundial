'use client';

import React, { useState } from 'react';
import { AlertCircle, ChevronRight, Bell, Zap } from 'lucide-react';

interface NewsAlert {
  id: string;
  time: string;
  category: 'urgente' | 'alerta' | 'actualizacion';
  text: string;
  source: string;
}

const INITIAL_ALERTS: NewsAlert[] = [
  { id: 'a1', time: 'Hace 2 min', category: 'urgente', text: 'Seísmo de magnitud 6.2 sacude la costa norte de Japón; sin alerta de tsunami inmediata.', source: 'Sismología Global' },
  { id: 'a2', time: 'Hace 8 min', category: 'alerta', text: 'La Unión Europea abre investigación formal sobre las prácticas de competencia en inteligencia artificial generativa.', source: 'Bruselas Legal' },
  { id: 'a3', time: 'Hace 22 min', category: 'actualizacion', text: 'El crudo de referencia estadounidense cotiza por debajo de los 72 dólares tras el incremento semanal de inventarios.', source: 'Finanzas Feed' },
  { id: 'a4', time: 'Hace 45 min', category: 'urgente', text: 'Cierre parcial de pistas en el aeropuerto Heathrow de Londres debido a densa niebla matinal.', source: 'Control de Vuelos' },
  { id: 'a5', time: 'Hace 1 hora', category: 'actualizacion', text: 'La NASA confirma el despliegue exitoso del parasol térmico del nuevo telescopio espectroscópico espacial.', source: 'Cabo Cañaveral' },
  { id: 'a6', time: 'Hace 2 horas', category: 'alerta', text: 'El IPC de Alemania se modera ligeramente en el último reporte interanual, situándose en el 2.1%.', source: 'Eurostat' },
];

export default function LatestAlertsWidget() {
  const [alerts] = useState<NewsAlert[]>(INITIAL_ALERTS);

  const getCategoryStyles = (category: NewsAlert['category']) => {
    switch (category) {
      case 'urgente':
        return 'text-red-400 border-red-950 bg-red-950/20';
      case 'alerta':
        return 'text-amber-400 border-amber-950 bg-amber-950/20';
      default:
        return 'text-blue-400 border-blue-950 bg-blue-950/20';
    }
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950/40 border border-zinc-900 rounded-2xl overflow-hidden backdrop-blur-md">
      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-zinc-900 px-4 py-3 bg-zinc-950/60">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
          <span className="text-xs font-bold text-zinc-300">
            Últimas Alertas Informativas
          </span>
        </div>
        <Bell className="h-4 w-4 text-zinc-500" />
      </div>

      {/* Alerts List */}
      <div className="p-4 flex-grow space-y-3 max-h-[610px] overflow-y-auto custom-scrollbar">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex flex-col p-3 rounded-xl border border-zinc-900/60 bg-zinc-950/30 hover:bg-zinc-900/20 hover:border-zinc-850 transition-all duration-200"
          >
            {/* Metadata Line */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-full border text-xs font-semibold uppercase ${getCategoryStyles(alert.category)}`}>
                  {alert.category}
                </span>
                <span className="text-xs text-zinc-450 truncate">
                  Fuente: {alert.source}
                </span>
              </div>
              <span className="text-xs text-zinc-500 font-medium shrink-0">
                {alert.time}
              </span>
            </div>

            {/* Alert Headline Text */}
            <p className="text-sm font-sans text-zinc-300 leading-relaxed font-medium">
              {alert.text}
            </p>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="border-t border-zinc-900 bg-zinc-950/60 p-3 flex justify-between items-center text-xs font-medium text-zinc-500">
        <span className="flex items-center gap-1">
          <Zap className="h-2.5 w-2.5 text-amber-500" />
          <span>Centro de noticias</span>
        </span>
        <button className="flex items-center gap-0.5 text-purple-400 hover:text-purple-350 transition-colors font-bold">
          <span>Ver historial</span>
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
