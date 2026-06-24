'use client';

import React, { useState } from 'react';
import { mockPlayerStats, PlayerStat } from '../data/mockData';
import { Award, TrendingUp } from 'lucide-react';
import FlagIcon from './FlagIcon';

type MetricKey = 'goals' | 'assists';

export default function PlayerStatsWidget() {
  const [activeMetric, setActiveMetric] = useState<MetricKey>('goals');

  const metricTabs: Array<{ id: MetricKey; label: string; icon: React.ComponentType<any> }> = [
    { id: 'goals', label: 'Goles', icon: Award },
    { id: 'assists', label: 'Asistencias', icon: TrendingUp },
  ];

  // Sort players by the selected metric
  const sortedPlayers = [...mockPlayerStats].sort((a, b) => {
    const valA = a.metrics[activeMetric] || 0;
    const valB = b.metrics[activeMetric] || 0;

    // Handle strings like "36.8 km/h" or "48.2 km" or "89.4%"
    const numA = typeof valA === 'string' ? parseFloat(valA) : valA;
    const numB = typeof valB === 'string' ? parseFloat(valB) : valB;

    return (numB as number) - (numA as number);
  });

  const getMetricValue = (player: PlayerStat, metric: MetricKey) => {
    const val = player.metrics[metric];
    if (val === undefined) return 'N/D';
    return val;
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950/40 border border-zinc-900 rounded-2xl overflow-hidden backdrop-blur-md">
      
      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-zinc-900 px-4 py-3 bg-zinc-950/60">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-ping" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">
            MÉTRICAS TÁCTICAS // PLAYER HUD
          </span>
        </div>
        <span className="text-[9px] font-mono text-purple-500 uppercase tracking-widest font-bold">// DATA SENSOR</span>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 border-b border-zinc-900/60 bg-zinc-950/20 p-1 gap-1">
        {metricTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeMetric === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveMetric(tab.id)}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2 px-1 rounded-lg font-mono text-[9px] font-bold uppercase tracking-wider transition-all border ${
                isActive
                  ? 'bg-zinc-900 border-zinc-800 text-purple-400 shadow-inner'
                  : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30'
              }`}
            >
              <Icon className="h-3 w-3 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Players List */}
      <div className="p-4 flex-grow space-y-3 max-h-[380px] overflow-y-auto custom-scrollbar">
        {sortedPlayers.map((player, index) => (
          <div
            key={player.id}
            className="flex items-center justify-between p-2.5 rounded-xl border border-zinc-900/60 bg-zinc-950/30 hover:bg-zinc-900/20 hover:border-zinc-850 transition-all duration-200"
          >
            {/* Left: Rank, flag, details */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-zinc-500 w-4">
                0{index + 1}
              </span>
              <div className="relative flex items-center">
                <FlagIcon countryCode={player.flag} className="h-3.5 w-5 rounded-sm" />
                <span className="absolute -bottom-1 -right-2 text-[7px] font-mono font-bold bg-zinc-900 text-zinc-400 border border-zinc-800 px-0.5 rounded leading-none">
                  {player.position}
                </span>
              </div>
              <div className="ml-1">
                <h5 className="text-xs font-bold text-white tracking-tight leading-none">
                  {player.name}
                </h5>
                <span className="text-[9px] font-mono text-zinc-500 mt-1 block">
                  {player.team}
                </span>
              </div>
            </div>

            {/* Right: Metric Value display with futuristic tag */}
            <div className="text-right">
              <div className="text-sm font-mono font-bold text-white tracking-wider">
                {getMetricValue(player, activeMetric)}
              </div>
              <span className="text-[8px] font-mono font-bold text-purple-500/80 uppercase block mt-0.5">
                // REGISTRO
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Footer Info */}
      <div className="border-t border-zinc-900 bg-zinc-950/60 p-3 flex justify-between items-center text-[8px] font-mono text-zinc-650">
        <span>ACTUALIZADO EN TIEMPO REAL</span>
        <span>SENSORES F.I.F.A. ACTIVOS</span>
      </div>

    </div>
  );
}
