'use client';

import React, { useState } from 'react';
import { mockMatches, LiveMatch } from '../data/mockData';
import { Activity, Tv, ChevronRight } from 'lucide-react';
import FlagIcon from './FlagIcon';

export default function LiveResultsWidget() {
  const [selectedMatch, setSelectedMatch] = useState<string | null>(mockMatches[0]?.id || null);

  const activeMatch = mockMatches.find(m => m.id === selectedMatch) || mockMatches[0];

  // Simulating events for selected match to look hyper-detailed
  const matchEventsMap: Record<string, Array<{ min: number; text: string; icon: string }>> = {
    'm1': [
      { min: 34, text: 'Gol - Álvaro Morata (ESP)', icon: '⚽' },
      { min: 56, text: 'Tarjeta Amarilla - Antonio Rüdiger (GER)', icon: '🟨' },
      { min: 67, text: 'Gol - Florian Wirtz (GER)', icon: '⚽' },
      { min: 75, text: 'Gol - Dani Olmo (ESP)', icon: '⚽' },
    ],
    'm2': [
      { min: 8, text: 'Falta sobre Lionel Messi', icon: '⏱️' },
      { min: 10, text: 'Remate desviado - Kylian Mbappé', icon: '👟' },
    ],
    'm3': [
      { min: 12, text: 'Gol - Vinicius Jr (BRA)', icon: '⚽' },
      { min: 25, text: 'Gol - Harry Kane (ENG)', icon: '⚽' },
      { min: 45, text: 'Gol - Rodrygo (BRA)', icon: '⚽' },
      { min: 61, text: 'Gol - Bukayo Saka (ENG)', icon: '⚽' },
      { min: 88, text: 'Gol - Raphinha (BRA)', icon: '⚽' },
    ],
  };

  const getStatusStyle = (status: LiveMatch['status']) => {
    switch (status) {
      case 'LIVE':
        return 'text-red-500 border-red-950 bg-red-950/20';
      case 'FINISHED':
        return 'text-zinc-500 border-zinc-900 bg-zinc-900/20';
      default:
        return 'text-emerald-500 border-emerald-950 bg-emerald-950/20';
    }
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950/40 border border-zinc-900 rounded-2xl overflow-hidden backdrop-blur-md">
      
      {/* Title Bar */}
      <div className="flex items-center justify-between border-b border-zinc-900 px-4 py-3 bg-zinc-950/60">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">
            TRANSMISIÓN EN VIVO // LIVE FEED
          </span>
        </div>
        <Tv className="h-4 w-4 text-zinc-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-zinc-900 flex-grow">
        
        {/* Matches List */}
        <div className="p-3 space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar">
          {mockMatches.map((match) => {
            const isSelected = match.id === selectedMatch;
            return (
              <button
                key={match.id}
                onClick={() => setSelectedMatch(match.id)}
                className={`w-full text-left p-3 rounded-xl border transition-all duration-200 ${
                  isSelected
                    ? 'bg-zinc-900/60 border-emerald-500/40 shadow-md shadow-emerald-500/5'
                    : 'bg-zinc-950/30 border-zinc-900/40 hover:border-zinc-800 hover:bg-zinc-900/20'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[9px] font-mono text-zinc-500 truncate">
                    {match.competition}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full border font-mono text-[8px] font-bold ${getStatusStyle(match.status)}`}>
                    {match.status === 'LIVE' ? `MIN ${match.minute}'` : match.status}
                  </span>
                </div>

                <div className="grid grid-cols-7 items-center gap-1">
                  {/* Home Team */}
                  <div className="col-span-3 flex items-center gap-1.5">
                    <FlagIcon countryCode={match.homeTeam.flag} className="h-3 w-4.5 shrink-0" />
                    <span className="text-xs font-bold text-zinc-300 font-mono tracking-tight">
                      {match.homeTeam.short}
                    </span>
                  </div>

                  {/* Score */}
                  <div className="col-span-1 text-center font-mono font-bold text-sm bg-zinc-900/50 py-0.5 rounded border border-zinc-800 text-white">
                    {match.status === 'UPCOMING' ? '-' : `${match.homeScore} : ${match.awayScore}`}
                  </div>

                  {/* Away Team */}
                  <div className="col-span-3 flex items-center justify-end gap-1.5">
                    <span className="text-xs font-bold text-zinc-300 font-mono tracking-tight">
                      {match.awayTeam.short}
                    </span>
                    <FlagIcon countryCode={match.awayTeam.flag} className="h-3 w-4.5 shrink-0" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Match Live Data Center */}
        <div className="p-4 flex flex-col justify-between bg-zinc-950/20">
          {activeMatch ? (
            <div className="space-y-4 h-full flex flex-col justify-between">
              
              {/* Score display */}
              <div>
                <div className="text-[9px] font-mono text-emerald-500 uppercase tracking-widest mb-1">// ANÁLISIS DE COMBATE</div>
                <div className="flex items-center justify-between gap-4 p-3 bg-zinc-900/40 border border-zinc-850 rounded-xl">
                  <div className="text-center flex-1 flex flex-col items-center">
                    <FlagIcon countryCode={activeMatch.homeTeam.flag} className="h-4.5 w-7 mb-1" />
                    <div className="text-2xl font-bold font-mono text-white mb-0.5">
                      {activeMatch.status === 'UPCOMING' ? '0' : activeMatch.homeScore}
                    </div>
                    <div className="text-[10px] font-mono text-zinc-400 font-bold truncate">
                      {activeMatch.homeTeam.name}
                    </div>
                  </div>
                  <div className="font-mono text-xs text-zinc-650 font-bold bg-zinc-900 border border-zinc-800 px-2 py-1 rounded">
                    VS
                  </div>
                  <div className="text-center flex-1 flex flex-col items-center">
                    <FlagIcon countryCode={activeMatch.awayTeam.flag} className="h-4.5 w-7 mb-1" />
                    <div className="text-2xl font-bold font-mono text-white mb-0.5">
                      {activeMatch.status === 'UPCOMING' ? '0' : activeMatch.awayScore}
                    </div>
                    <div className="text-[10px] font-mono text-zinc-400 font-bold truncate">
                      {activeMatch.awayTeam.name}
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Logs */}
              <div className="flex-grow flex flex-col justify-center py-2">
                <span className="text-[9px] font-mono text-zinc-550 mb-2 block uppercase tracking-wider">// EVENTOS DE PARTIDO</span>
                <div className="space-y-2 overflow-y-auto max-h-[120px] custom-scrollbar pr-1">
                  {activeMatch.status === 'UPCOMING' ? (
                    <div className="text-center py-4 text-xs font-mono text-zinc-500 italic">
                      Transmisión comenzará: {activeMatch.date}
                    </div>
                  ) : (matchEventsMap[activeMatch.id]?.length || 0) > 0 ? (
                    matchEventsMap[activeMatch.id].map((event, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] font-mono bg-zinc-900/25 border border-zinc-900 p-1.5 rounded">
                        <span className="text-emerald-500 font-bold">{event.min}'</span>
                        <span className="text-zinc-500 shrink-0">{event.icon}</span>
                        <span className="text-zinc-300 truncate">{event.text}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-xs font-mono text-zinc-500 italic">
                      Esperando jugadas de peligro...
                    </div>
                  )}
                </div>
              </div>

              {/* Action Call */}
              <div className="border-t border-zinc-900/60 pt-3 flex justify-between items-center text-[10px] font-mono">
                <span className="text-zinc-500 uppercase">Señal limpia 1080p</span>
                <button className="flex items-center gap-1 text-emerald-400 hover:text-emerald-350 transition-colors font-bold uppercase">
                  <span>Minuto a Minuto</span>
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>

            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-zinc-500 text-xs font-mono">
              Seleccione un partido del radar
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
