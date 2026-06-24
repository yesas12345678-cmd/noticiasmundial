'use client';

import React, { useState } from 'react';
import FlagIcon from './FlagIcon';
import { Trophy, Calendar } from 'lucide-react';

interface Team {
  id: string;
  name: string;
  flag: string;
  score?: number;
  winner?: boolean;
}

interface Match {
  id: string;
  teamA: Team;
  teamB: Team;
  details: string;
  nextMatchId?: string;
}

export default function TournamentBracket() {
  const [hoveredTeam, setHoveredTeam] = useState<string | null>(null);

  // Teams data mapping for hover highlighting
  // Left Bracket:
  // Match 1: GER vs SUI -> GER
  // Match 2: ESP vs CRO -> ESP
  // Match 9: GER vs ESP -> ESP
  // Match 3: ENG vs SEN -> ENG
  // Match 4: ARG vs MEX -> ARG
  // Match 10: ENG vs ARG -> ARG
  // Match 13: ESP vs ARG -> ARG
  // Right Bracket:
  // Match 5: FRA vs BEL -> FRA
  // Match 6: POR vs CZE -> POR
  // Match 11: FRA vs POR -> FRA
  // Match 7: BRA vs NOR -> BRA
  // Match 8: CAN vs COL -> CAN
  // Match 12: BRA vs CAN -> BRA
  // Match 14: FRA vs BRA -> BRA
  // Final Match 15: ARG vs BRA -> BRA (Winner)

  const leftOctavos: Match[] = [
    {
      id: 'm1',
      teamA: { id: 'GER', name: 'Alemania', flag: 'GER', score: 2, winner: true },
      teamB: { id: 'SUI', name: 'Suiza', flag: 'SUI', score: 1 },
      details: 'Octavos - Estadio Azteca',
      nextMatchId: 'm9',
    },
    {
      id: 'm2',
      teamA: { id: 'ESP', name: 'España', flag: 'ESP', score: 3, winner: true },
      teamB: { id: 'CRO', name: 'Croacia', flag: 'CRO', score: 2 },
      details: 'Octavos - BC Place',
      nextMatchId: 'm9',
    },
    {
      id: 'm3',
      teamA: { id: 'ENG', name: 'Inglaterra', flag: 'ENG', score: 2, winner: true },
      teamB: { id: 'SEN', name: 'Senegal', flag: 'SEN', score: 0 },
      details: 'Octavos - Hard Rock',
      nextMatchId: 'm10',
    },
    {
      id: 'm4',
      teamA: { id: 'ARG', name: 'Argentina', flag: 'ARG', score: 2, winner: true },
      teamB: { id: 'MEX', name: 'México', flag: 'MEX', score: 1 },
      details: 'Octavos - MetLife',
      nextMatchId: 'm10',
    },
  ];

  const leftCuartos: Match[] = [
    {
      id: 'm9',
      teamA: { id: 'GER', name: 'Alemania', flag: 'GER', score: 1 },
      teamB: { id: 'ESP', name: 'España', flag: 'ESP', score: 2, winner: true },
      details: 'Cuartos - Gillette Stadium',
      nextMatchId: 'm13',
    },
    {
      id: 'm10',
      teamA: { id: 'ENG', name: 'Inglaterra', flag: 'ENG', score: 1 },
      teamB: { id: 'ARG', name: 'Argentina', flag: 'ARG', score: 2, winner: true },
      details: 'Cuartos - AT&T Stadium',
      nextMatchId: 'm13',
    },
  ];

  const leftSemifinal: Match = {
    id: 'm13',
    teamA: { id: 'ESP', name: 'España', flag: 'ESP', score: 1 },
    teamB: { id: 'ARG', name: 'Argentina', flag: 'ARG', score: 2, winner: true },
    details: 'Semifinal - Rose Bowl',
    nextMatchId: 'm15',
  };

  const rightOctavos: Match[] = [
    {
      id: 'm5',
      teamA: { id: 'FRA', name: 'Francia', flag: 'FRA', score: 1, winner: true },
      teamB: { id: 'BEL', name: 'Bélgica', flag: 'BEL', score: 0 },
      details: 'Octavos - Mercedes-Benz',
      nextMatchId: 'm11',
    },
    {
      id: 'm6',
      teamA: { id: 'POR', name: 'Portugal', flag: 'POR', score: 2, winner: true },
      teamB: { id: 'CZE', name: 'Chequia', flag: 'CZE', score: 1 },
      details: 'Octavos - Lumen Field',
      nextMatchId: 'm11',
    },
    {
      id: 'm7',
      teamA: { id: 'BRA', name: 'Brasil', flag: 'BRA', score: 3, winner: true },
      teamB: { id: 'NOR', name: 'Noruega', flag: 'NOR', score: 1 },
      details: 'Octavos - SoFi Stadium',
      nextMatchId: 'm12',
    },
    {
      id: 'm8',
      teamA: { id: 'CAN', name: 'Canadá', flag: 'CAN', score: 2, winner: true },
      teamB: { id: 'COL', name: 'Colombia', flag: 'COL', score: 1 },
      details: 'Octavos - Lincoln Financial',
      nextMatchId: 'm12',
    },
  ];

  const rightCuartos: Match[] = [
    {
      id: 'm11',
      teamA: { id: 'FRA', name: 'Francia', flag: 'FRA', score: 2, winner: true },
      teamB: { id: 'POR', name: 'Portugal', flag: 'POR', score: 1 },
      details: 'Cuartos - NRG Stadium',
      nextMatchId: 'm14',
    },
    {
      id: 'm12',
      teamA: { id: 'BRA', name: 'Brasil', flag: 'BRA', score: 2, winner: true },
      teamB: { id: 'CAN', name: 'Canadá', flag: 'CAN', score: 0 },
      details: 'Cuartos - Levi\'s Stadium',
      nextMatchId: 'm14',
    },
  ];

  const rightSemifinal: Match = {
    id: 'm14',
    teamA: { id: 'FRA', name: 'Francia', flag: 'FRA', score: 2 },
    teamB: { id: 'BRA', name: 'Brasil', flag: 'BRA', score: 3, winner: true },
    details: 'Semifinal - Hard Rock',
    nextMatchId: 'm15',
  };

  const finalMatch: Match = {
    id: 'm15',
    teamA: { id: 'ARG', name: 'Argentina', flag: 'ARG', score: 1 },
    teamB: { id: 'BRA', name: 'Brasil', flag: 'BRA', score: 2, winner: true },
    details: 'Gran Final - MetLife Stadium',
  };

  const championTeam = { id: 'BRA', name: 'Brasil', flag: 'BRA' };

  // Helper to determine highlight styles
  const getHighlightClass = (teamId: string) => {
    if (!hoveredTeam) return 'border-zinc-900 bg-zinc-950/20';
    if (hoveredTeam === teamId) {
      return 'border-purple-500/80 bg-purple-950/30 text-purple-200 shadow-md shadow-purple-500/10 scale-[1.01]';
    }
    return 'border-zinc-900 opacity-40 bg-zinc-950/10 scale-[0.99] filter saturate-[0.5]';
  };

  const getTeamNameClass = (team: Team) => {
    if (team.winner) return 'text-white font-bold';
    return 'text-zinc-400 font-medium';
  };

  // Symmetrical layout columns on Desktop. Scrollbar on small screens.
  const getPathClass = (active: boolean) => {
    return `transition-all duration-300 fill-none ${
      active
        ? 'stroke-purple-500 stroke-[2.5px] drop-shadow-[0_0_4px_rgba(168,85,247,0.7)]'
        : 'stroke-zinc-800/60 stroke-[1.5px]'
    }`;
  };

  return (
    <div className="relative rounded-2xl border border-zinc-900 bg-zinc-950/40 p-6 backdrop-blur-md space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-purple-400" />
          <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
            Cuadro de Eliminatorias // Bracket Final 2026
          </h3>
        </div>
        <span className="text-[9px] font-mono text-purple-400 bg-purple-950/30 border border-purple-950/60 px-2 py-0.5 rounded-full font-bold">
          FASE DE ELIMINACIÓN DIRECTA
        </span>
      </div>

      {/* Main Bracket Container with Horizontal Scroll support */}
      <div className="overflow-x-auto w-full pb-4 custom-scrollbar select-none">
        <div className="min-w-[1280px] grid grid-cols-7 gap-6 items-center relative py-6">
          
          {/* COLUMN 1: LEFT OCTAVOS */}
          <div className="relative flex flex-col justify-around h-[680px] pt-8 z-10">
            <div className="absolute top-0 left-0 right-0 text-center">
              <h4 className="font-mono text-[8px] text-purple-400/80 uppercase tracking-widest font-bold">// OCTAVOS DE FINAL</h4>
            </div>
            {leftOctavos.map((match) => (
              <div key={match.id} className="relative h-[98px] flex flex-col justify-start">
                {/* Match Box */}
                <div className="rounded-xl border bg-zinc-950/40 divide-y divide-zinc-900/60 overflow-hidden shadow-lg transition-all duration-300">
                  {/* Team A */}
                  <div
                    onMouseEnter={() => setHoveredTeam(match.teamA.id)}
                    onMouseLeave={() => setHoveredTeam(null)}
                    className={`flex items-center justify-between p-2.5 transition-all cursor-pointer ${getHighlightClass(match.teamA.id)}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FlagIcon countryCode={match.teamA.flag} className="h-3.5 w-5 rounded-sm" />
                      <span className={`text-[11px] font-mono ${getTeamNameClass(match.teamA)}`}>{match.teamA.name}</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-white pr-1">{match.teamA.score}</span>
                  </div>
                  {/* Team B */}
                  <div
                    onMouseEnter={() => setHoveredTeam(match.teamB.id)}
                    onMouseLeave={() => setHoveredTeam(null)}
                    className={`flex items-center justify-between p-2.5 transition-all cursor-pointer ${getHighlightClass(match.teamB.id)}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FlagIcon countryCode={match.teamB.flag} className="h-3.5 w-5 rounded-sm" />
                      <span className={`text-[11px] font-mono ${getTeamNameClass(match.teamB)}`}>{match.teamB.name}</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-white pr-1">{match.teamB.score}</span>
                  </div>
                </div>
                <div className="text-[8px] font-mono text-zinc-650 text-center mt-1.5 uppercase tracking-wider">{match.details}</div>
              </div>
            ))}

            {/* Connecting Lines to Column 2 */}
            <svg className="absolute inset-y-0 right-[-24px] w-[24px] pointer-events-none overflow-visible z-0">
              {/* Match 1 (winner GER) & Match 2 (winner ESP) to Match 9 (winner ESP) */}
              <path d="M 0,102 L 12,102 L 12,183" className={getPathClass(hoveredTeam === 'GER')} />
              <path d="M 0,264 L 12,264 L 12,183" className={getPathClass(hoveredTeam === 'ESP')} />
              <path d="M 12,183 L 24,183" className={getPathClass(hoveredTeam === 'GER' || hoveredTeam === 'ESP')} />

              {/* Match 3 (winner ENG) & Match 4 (winner ARG) to Match 10 (winner ARG) */}
              <path d="M 0,426 L 12,426 L 12,507" className={getPathClass(hoveredTeam === 'ENG')} />
              <path d="M 0,588 L 12,588 L 12,507" className={getPathClass(hoveredTeam === 'ARG')} />
              <path d="M 12,507 L 24,507" className={getPathClass(hoveredTeam === 'ENG' || hoveredTeam === 'ARG')} />
            </svg>
          </div>

          {/* COLUMN 2: LEFT CUARTOS */}
          <div className="relative flex flex-col justify-around h-[680px] pt-8 z-10">
            <div className="absolute top-0 left-0 right-0 text-center">
              <h4 className="font-mono text-[8px] text-purple-400/80 uppercase tracking-widest font-bold">// CUARTOS DE FINAL</h4>
            </div>
            {leftCuartos.map((match) => (
              <div key={match.id} className="relative h-[98px] flex flex-col justify-start">
                <div className="rounded-xl border bg-zinc-950/40 divide-y divide-zinc-900/60 overflow-hidden shadow-lg transition-all duration-300">
                  <div
                    onMouseEnter={() => setHoveredTeam(match.teamA.id)}
                    onMouseLeave={() => setHoveredTeam(null)}
                    className={`flex items-center justify-between p-2.5 transition-all cursor-pointer ${getHighlightClass(match.teamA.id)}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FlagIcon countryCode={match.teamA.flag} className="h-3.5 w-5 rounded-sm" />
                      <span className={`text-[11px] font-mono ${getTeamNameClass(match.teamA)}`}>{match.teamA.name}</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-white pr-1">{match.teamA.score}</span>
                  </div>
                  <div
                    onMouseEnter={() => setHoveredTeam(match.teamB.id)}
                    onMouseLeave={() => setHoveredTeam(null)}
                    className={`flex items-center justify-between p-2.5 transition-all cursor-pointer ${getHighlightClass(match.teamB.id)}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FlagIcon countryCode={match.teamB.flag} className="h-3.5 w-5 rounded-sm" />
                      <span className={`text-[11px] font-mono ${getTeamNameClass(match.teamB)}`}>{match.teamB.name}</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-white pr-1">{match.teamB.score}</span>
                  </div>
                </div>
                <div className="text-[8px] font-mono text-zinc-650 text-center mt-1.5 uppercase tracking-wider">{match.details}</div>
              </div>
            ))}

            {/* Connecting Lines to Column 3 */}
            <svg className="absolute inset-y-0 right-[-24px] w-[24px] pointer-events-none overflow-visible z-0">
              {/* Match 9 (winner ESP) & Match 10 (winner ARG) to Semifinal L (winner ARG) */}
              <path d="M 0,183 L 12,183 L 12,345" className={getPathClass(hoveredTeam === 'ESP')} />
              <path d="M 0,507 L 12,507 L 12,345" className={getPathClass(hoveredTeam === 'ARG')} />
              <path d="M 12,345 L 24,345" className={getPathClass(hoveredTeam === 'ESP' || hoveredTeam === 'ARG')} />
            </svg>
          </div>

          {/* COLUMN 3: LEFT SEMIFINAL */}
          <div className="relative flex flex-col justify-around h-[680px] pt-8 z-10">
            <div className="absolute top-0 left-0 right-0 text-center">
              <h4 className="font-mono text-[8px] text-purple-400/80 uppercase tracking-widest font-bold">// SEMIFINAL</h4>
            </div>
            <div className="relative h-[98px] flex flex-col justify-start">
              <div className="rounded-xl border bg-zinc-950/40 divide-y divide-zinc-900/60 overflow-hidden shadow-lg transition-all duration-300">
                <div
                  onMouseEnter={() => setHoveredTeam(leftSemifinal.teamA.id)}
                  onMouseLeave={() => setHoveredTeam(null)}
                  className={`flex items-center justify-between p-2.5 transition-all cursor-pointer ${getHighlightClass(leftSemifinal.teamA.id)}`}
                >
                  <div className="flex items-center gap-2.5">
                    <FlagIcon countryCode={leftSemifinal.teamA.flag} className="h-3.5 w-5 rounded-sm" />
                    <span className={`text-[11px] font-mono ${getTeamNameClass(leftSemifinal.teamA)}`}>{leftSemifinal.teamA.name}</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-white pr-1">{leftSemifinal.teamA.score}</span>
                </div>
                <div
                  onMouseEnter={() => setHoveredTeam(leftSemifinal.teamB.id)}
                  onMouseLeave={() => setHoveredTeam(null)}
                  className={`flex items-center justify-between p-2.5 transition-all cursor-pointer ${getHighlightClass(leftSemifinal.teamB.id)}`}
                >
                  <div className="flex items-center gap-2.5">
                    <FlagIcon countryCode={leftSemifinal.teamB.flag} className="h-3.5 w-5 rounded-sm" />
                    <span className={`text-[11px] font-mono ${getTeamNameClass(leftSemifinal.teamB)}`}>{leftSemifinal.teamB.name}</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-white pr-1">{leftSemifinal.teamB.score}</span>
                </div>
              </div>
              <div className="text-[8px] font-mono text-zinc-650 text-center mt-1.5 uppercase tracking-wider">{leftSemifinal.details}</div>
            </div>

            {/* Connecting Lines to Column 4 */}
            <svg className="absolute inset-y-0 right-[-24px] w-[24px] pointer-events-none overflow-visible z-0">
              {/* Semifinal L (winner ARG) to Grand Final */}
              <path d="M 0,345 L 24,345" className={getPathClass(hoveredTeam === 'ARG')} />
            </svg>
          </div>

          {/* COLUMN 4: PODIUM & GRAND FINAL */}
          <div className="relative flex flex-col justify-center h-[680px] pt-8 z-10">
            <div className="absolute top-0 left-0 right-0 text-center">
              <h4 className="font-mono text-[8px] text-amber-400 uppercase tracking-widest font-bold">// LA GRAN FINAL</h4>
            </div>

            {/* 1. Champion Podium block (Positioned absolutely above the centered match) */}
            <div className="absolute top-[65px] left-1/2 transform -translate-x-1/2 flex flex-col items-center p-4 rounded-xl border border-yellow-500/30 bg-yellow-950/10 shadow-lg shadow-yellow-500/5 w-full max-w-[170px] text-center transition-all duration-300">
              <div className="p-2 bg-yellow-500/10 rounded-full border border-yellow-500/30 text-yellow-400 mb-2">
                <Trophy className="h-6 w-6" />
              </div>
              <span className="text-[8px] font-mono font-bold text-yellow-400 uppercase tracking-widest mb-1">
                CAMPEÓN DEL MUNDO
              </span>
              <div className="flex items-center gap-1.5 justify-center mb-1">
                <FlagIcon countryCode={championTeam.flag} className="h-3.5 w-5 rounded-sm shadow-sm" />
                <h3 className="text-xs font-mono font-black text-white uppercase">{championTeam.name}</h3>
              </div>
              <span className="text-[7px] font-mono text-zinc-500">// MONARCA GLOBAL</span>
            </div>

            {/* 2. Grand Final Match (Centered naturally by justify-center) */}
            <div className="relative h-[98px] flex flex-col justify-start w-full max-w-[190px] mx-auto mt-[160px]">
              <div className="rounded-xl border border-purple-500/30 bg-zinc-950/40 divide-y divide-zinc-900/60 overflow-hidden shadow-lg transition-all duration-300">
                <div
                  onMouseEnter={() => setHoveredTeam(finalMatch.teamA.id)}
                  onMouseLeave={() => setHoveredTeam(null)}
                  className={`flex items-center justify-between p-2.5 transition-all cursor-pointer ${getHighlightClass(finalMatch.teamA.id)}`}
                >
                  <div className="flex items-center gap-2.5">
                    <FlagIcon countryCode={finalMatch.teamA.flag} className="h-3.5 w-5 rounded-sm" />
                    <span className={`text-[11px] font-mono ${getTeamNameClass(finalMatch.teamA)}`}>{finalMatch.teamA.name}</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-white pr-1">{finalMatch.teamA.score}</span>
                </div>
                <div
                  onMouseEnter={() => setHoveredTeam(finalMatch.teamB.id)}
                  onMouseLeave={() => setHoveredTeam(null)}
                  className={`flex items-center justify-between p-2.5 transition-all cursor-pointer ${getHighlightClass(finalMatch.teamB.id)}`}
                >
                  <div className="flex items-center gap-2.5">
                    <FlagIcon countryCode={finalMatch.teamB.flag} className="h-3.5 w-5 rounded-sm" />
                    <span className={`text-[11px] font-mono ${getTeamNameClass(finalMatch.teamB)}`}>{finalMatch.teamB.name}</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-white pr-1">{finalMatch.teamB.score}</span>
                </div>
              </div>
              <div className="text-[8px] font-mono text-zinc-650 text-center mt-1.5 uppercase tracking-wider">{finalMatch.details}</div>
            </div>
          </div>

          {/* COLUMN 5: RIGHT SEMIFINAL */}
          <div className="relative flex flex-col justify-around h-[680px] pt-8 z-10">
            <div className="absolute top-0 left-0 right-0 text-center">
              <h4 className="font-mono text-[8px] text-purple-400/80 uppercase tracking-widest font-bold">// SEMIFINAL</h4>
            </div>
            <div className="relative h-[98px] flex flex-col justify-start">
              <div className="rounded-xl border bg-zinc-950/40 divide-y divide-zinc-900/60 overflow-hidden shadow-lg transition-all duration-300">
                <div
                  onMouseEnter={() => setHoveredTeam(rightSemifinal.teamA.id)}
                  onMouseLeave={() => setHoveredTeam(null)}
                  className={`flex items-center justify-between p-2.5 transition-all cursor-pointer ${getHighlightClass(rightSemifinal.teamA.id)}`}
                >
                  <div className="flex items-center gap-2.5">
                    <FlagIcon countryCode={rightSemifinal.teamA.flag} className="h-3.5 w-5 rounded-sm" />
                    <span className={`text-[11px] font-mono ${getTeamNameClass(rightSemifinal.teamA)}`}>{rightSemifinal.teamA.name}</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-white pr-1">{rightSemifinal.teamA.score}</span>
                </div>
                <div
                  onMouseEnter={() => setHoveredTeam(rightSemifinal.teamB.id)}
                  onMouseLeave={() => setHoveredTeam(null)}
                  className={`flex items-center justify-between p-2.5 transition-all cursor-pointer ${getHighlightClass(rightSemifinal.teamB.id)}`}
                >
                  <div className="flex items-center gap-2.5">
                    <FlagIcon countryCode={rightSemifinal.teamB.flag} className="h-3.5 w-5 rounded-sm" />
                    <span className={`text-[11px] font-mono ${getTeamNameClass(rightSemifinal.teamB)}`}>{rightSemifinal.teamB.name}</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-white pr-1">{rightSemifinal.teamB.score}</span>
                </div>
              </div>
              <div className="text-[8px] font-mono text-zinc-650 text-center mt-1.5 uppercase tracking-wider">{rightSemifinal.details}</div>
            </div>

            {/* Connecting Lines to Column 4 */}
            <svg className="absolute inset-y-0 left-[-24px] w-[24px] pointer-events-none overflow-visible z-0">
              {/* Semifinal R (winner BRA) to Grand Final */}
              <path d="M 24,345 L 0,345" className={getPathClass(hoveredTeam === 'BRA')} />
            </svg>
          </div>

          {/* COLUMN 6: RIGHT CUARTOS */}
          <div className="relative flex flex-col justify-around h-[680px] pt-8 z-10">
            <div className="absolute top-0 left-0 right-0 text-center">
              <h4 className="font-mono text-[8px] text-purple-400/80 uppercase tracking-widest font-bold">// CUARTOS DE FINAL</h4>
            </div>
            {rightCuartos.map((match) => (
              <div key={match.id} className="relative h-[98px] flex flex-col justify-start">
                <div className="rounded-xl border bg-zinc-950/40 divide-y divide-zinc-900/60 overflow-hidden shadow-lg transition-all duration-300">
                  <div
                    onMouseEnter={() => setHoveredTeam(match.teamA.id)}
                    onMouseLeave={() => setHoveredTeam(null)}
                    className={`flex items-center justify-between p-2.5 transition-all cursor-pointer ${getHighlightClass(match.teamA.id)}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FlagIcon countryCode={match.teamA.flag} className="h-3.5 w-5 rounded-sm" />
                      <span className={`text-[11px] font-mono ${getTeamNameClass(match.teamA)}`}>{match.teamA.name}</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-white pr-1">{match.teamA.score}</span>
                  </div>
                  <div
                    onMouseEnter={() => setHoveredTeam(match.teamB.id)}
                    onMouseLeave={() => setHoveredTeam(null)}
                    className={`flex items-center justify-between p-2.5 transition-all cursor-pointer ${getHighlightClass(match.teamB.id)}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FlagIcon countryCode={match.teamB.flag} className="h-3.5 w-5 rounded-sm" />
                      <span className={`text-[11px] font-mono ${getTeamNameClass(match.teamB)}`}>{match.teamB.name}</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-white pr-1">{match.teamB.score}</span>
                  </div>
                </div>
                <div className="text-[8px] font-mono text-zinc-650 text-center mt-1.5 uppercase tracking-wider">{match.details}</div>
              </div>
            ))}

            {/* Connecting Lines to Column 5 */}
            <svg className="absolute inset-y-0 left-[-24px] w-[24px] pointer-events-none overflow-visible z-0">
              {/* Match 11 (winner FRA) & Match 12 (winner BRA) to Semifinal R (winner BRA) */}
              <path d="M 24,183 L 12,183 L 12,345" className={getPathClass(hoveredTeam === 'FRA')} />
              <path d="M 24,507 L 12,507 L 12,345" className={getPathClass(hoveredTeam === 'BRA')} />
              <path d="M 12,345 L 0,345" className={getPathClass(hoveredTeam === 'FRA' || hoveredTeam === 'BRA')} />
            </svg>
          </div>

          {/* COLUMN 7: RIGHT OCTAVOS */}
          <div className="relative flex flex-col justify-around h-[680px] pt-8 z-10">
            <div className="absolute top-0 left-0 right-0 text-center">
              <h4 className="font-mono text-[8px] text-purple-400/80 uppercase tracking-widest font-bold">// OCTAVOS DE FINAL</h4>
            </div>
            {rightOctavos.map((match) => (
              <div key={match.id} className="relative h-[98px] flex flex-col justify-start">
                <div className="rounded-xl border bg-zinc-950/40 divide-y divide-zinc-900/60 overflow-hidden shadow-lg transition-all duration-300">
                  <div
                    onMouseEnter={() => setHoveredTeam(match.teamA.id)}
                    onMouseLeave={() => setHoveredTeam(null)}
                    className={`flex items-center justify-between p-2.5 transition-all cursor-pointer ${getHighlightClass(match.teamA.id)}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FlagIcon countryCode={match.teamA.flag} className="h-3.5 w-5 rounded-sm" />
                      <span className={`text-[11px] font-mono ${getTeamNameClass(match.teamA)}`}>{match.teamA.name}</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-white pr-1">{match.teamA.score}</span>
                  </div>
                  <div
                    onMouseEnter={() => setHoveredTeam(match.teamB.id)}
                    onMouseLeave={() => setHoveredTeam(null)}
                    className={`flex items-center justify-between p-2.5 transition-all cursor-pointer ${getHighlightClass(match.teamB.id)}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FlagIcon countryCode={match.teamB.flag} className="h-3.5 w-5 rounded-sm" />
                      <span className={`text-[11px] font-mono ${getTeamNameClass(match.teamB)}`}>{match.teamB.name}</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-white pr-1">{match.teamB.score}</span>
                  </div>
                </div>
                <div className="text-[8px] font-mono text-zinc-650 text-center mt-1.5 uppercase tracking-wider">{match.details}</div>
              </div>
            ))}

            {/* Connecting Lines to Column 6 */}
            <svg className="absolute inset-y-0 left-[-24px] w-[24px] pointer-events-none overflow-visible z-0">
              {/* Match 5 (winner FRA) & Match 6 (winner POR) to Match 11 (winner FRA) */}
              <path d="M 24,102 L 12,102 L 12,183" className={getPathClass(hoveredTeam === 'FRA')} />
              <path d="M 24,264 L 12,264 L 12,183" className={getPathClass(hoveredTeam === 'POR')} />
              <path d="M 12,183 L 0,183" className={getPathClass(hoveredTeam === 'FRA' || hoveredTeam === 'POR')} />

              {/* Match 7 (winner BRA) & Match 8 (winner CAN) to Match 12 (winner BRA) */}
              <path d="M 24,426 L 12,426 L 12,507" className={getPathClass(hoveredTeam === 'BRA')} />
              <path d="M 24,588 L 12,588 L 12,507" className={getPathClass(hoveredTeam === 'CAN')} />
              <path d="M 12,507 L 0,507" className={getPathClass(hoveredTeam === 'BRA' || hoveredTeam === 'CAN')} />
            </svg>
          </div>

        </div>
      </div>

      {/* Info Legend */}
      <div className="border-t border-zinc-900 bg-zinc-950/60 p-3 flex justify-between items-center text-[8px] font-mono text-zinc-650">
        <span>* PASA EL CURSOR SOBRE CUALQUIER SELECCIÓN PARA SEGUIR SU CAMINO EN EL TORNEO</span>
        <span>MUNDIAL 2026 // BRACKET ACTIVO</span>
      </div>
    </div>
  );
}
