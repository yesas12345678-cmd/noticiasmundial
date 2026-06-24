'use client';

import React, { useState } from 'react';
import FlagIcon from './FlagIcon';
import { Trophy } from 'lucide-react';

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

const countryNames: Record<string, string> = {
  GER: 'Alemania', SUI: 'Suiza', ESP: 'España', CRO: 'Croacia',
  ENG: 'Inglaterra', SEN: 'Senegal', ARG: 'Argentina', MEX: 'México',
  FRA: 'Francia', BEL: 'Bélgica', POR: 'Portugal', CZE: 'Chequia',
  BRA: 'Brasil', NOR: 'Noruega', CAN: 'Canadá', COL: 'Colombia'
};

export default function TournamentBracket() {
  const [hoveredTeam, setHoveredTeam] = useState<string | null>(null);

  // Real initial teams for the 2026 World Cup Round of 16 (Octavos)
  const leftOctavos: Match[] = [
    {
      id: 'm1',
      teamA: { id: 'GER', name: 'Alemania', flag: 'GER' },
      teamB: { id: 'SUI', name: 'Suiza', flag: 'SUI' },
      details: 'M1 - Azteca',
    },
    {
      id: 'm2',
      teamA: { id: 'ESP', name: 'España', flag: 'ESP' },
      teamB: { id: 'CRO', name: 'Croacia', flag: 'CRO' },
      details: 'M2 - BC Place',
    },
    {
      id: 'm3',
      teamA: { id: 'ENG', name: 'Inglaterra', flag: 'ENG' },
      teamB: { id: 'SEN', name: 'Senegal', flag: 'SEN' },
      details: 'M3 - Hard Rock',
    },
    {
      id: 'm4',
      teamA: { id: 'ARG', name: 'Argentina', flag: 'ARG' },
      teamB: { id: 'MEX', name: 'México', flag: 'MEX' },
      details: 'M4 - MetLife',
    },
  ];

  const leftCuartos: Match[] = [
    {
      id: 'm9',
      teamA: { id: 'TBD_m1', name: 'Ganador M1', flag: 'TBD' },
      teamB: { id: 'TBD_m2', name: 'Ganador M2', flag: 'TBD' },
      details: 'M9 - Gillette',
    },
    {
      id: 'm10',
      teamA: { id: 'TBD_m3', name: 'Ganador M3', flag: 'TBD' },
      teamB: { id: 'TBD_m4', name: 'Ganador M4', flag: 'TBD' },
      details: 'M10 - AT&T',
    },
  ];

  const leftSemifinal: Match = {
    id: 'm13',
    teamA: { id: 'TBD_m9', name: 'Ganador M9', flag: 'TBD' },
    teamB: { id: 'TBD_m10', name: 'Ganador M10', flag: 'TBD' },
    details: 'M13 - Rose Bowl',
  };

  const rightOctavos: Match[] = [
    {
      id: 'm5',
      teamA: { id: 'FRA', name: 'Francia', flag: 'FRA' },
      teamB: { id: 'BEL', name: 'Bélgica', flag: 'BEL' },
      details: 'M5 - Mercedes-Benz',
    },
    {
      id: 'm6',
      teamA: { id: 'POR', name: 'Portugal', flag: 'POR' },
      teamB: { id: 'CZE', name: 'Chequia', flag: 'CZE' },
      details: 'M6 - Lumen Field',
    },
    {
      id: 'm7',
      teamA: { id: 'BRA', name: 'Brasil', flag: 'BRA' },
      teamB: { id: 'NOR', name: 'Noruega', flag: 'NOR' },
      details: 'M7 - SoFi',
    },
    {
      id: 'm8',
      teamA: { id: 'CAN', name: 'Canadá', flag: 'CAN' },
      teamB: { id: 'COL', name: 'Colombia', flag: 'COL' },
      details: 'M8 - Lincoln Financial',
    },
  ];

  const rightCuartos: Match[] = [
    {
      id: 'm11',
      teamA: { id: 'TBD_m5', name: 'Ganador M5', flag: 'TBD' },
      teamB: { id: 'TBD_m6', name: 'Ganador M6', flag: 'TBD' },
      details: 'M11 - NRG',
    },
    {
      id: 'm12',
      teamA: { id: 'TBD_m7', name: 'Ganador M7', flag: 'TBD' },
      teamB: { id: 'TBD_m8', name: 'Ganador M8', flag: 'TBD' },
      details: 'M12 - Levi\'s',
    },
  ];

  const rightSemifinal: Match = {
    id: 'm14',
    teamA: { id: 'TBD_m11', name: 'Ganador M11', flag: 'TBD' },
    teamB: { id: 'TBD_m12', name: 'Ganador M12', flag: 'TBD' },
    details: 'M14 - Hard Rock',
  };

  const finalMatch: Match = {
    id: 'm15',
    teamA: { id: 'TBD_m13', name: 'Ganador M13', flag: 'TBD' },
    teamB: { id: 'TBD_m14', name: 'Ganador M14', flag: 'TBD' },
    details: 'Gran Final - MetLife Stadium',
  };

  // Helper to determine if a match box is on the potential path of the hovered team
  const isMatchOnPath = (matchId: string, teamId: string | null) => {
    if (!teamId) return false;
    
    // Left bracket teams
    if (['GER', 'SUI'].includes(teamId)) {
      return ['m1', 'm9', 'm13', 'm15'].includes(matchId);
    }
    if (['ESP', 'CRO'].includes(teamId)) {
      return ['m2', 'm9', 'm13', 'm15'].includes(matchId);
    }
    if (['ENG', 'SEN'].includes(teamId)) {
      return ['m3', 'm10', 'm13', 'm15'].includes(matchId);
    }
    if (['ARG', 'MEX'].includes(teamId)) {
      return ['m4', 'm10', 'm13', 'm15'].includes(matchId);
    }
    
    // Right bracket teams
    if (['FRA', 'BEL'].includes(teamId)) {
      return ['m5', 'm11', 'm14', 'm15'].includes(matchId);
    }
    if (['POR', 'CZE'].includes(teamId)) {
      return ['m6', 'm11', 'm14', 'm15'].includes(matchId);
    }
    if (['BRA', 'NOR'].includes(teamId)) {
      return ['m7', 'm12', 'm14', 'm15'].includes(matchId);
    }
    if (['CAN', 'COL'].includes(teamId)) {
      return ['m8', 'm12', 'm14', 'm15'].includes(matchId);
    }
    
    return false;
  };

  // Helper to get dynamic team name based on hover
  const getDynamicTeamName = (team: Team, matchId: string, slot: 'teamA' | 'teamB') => {
    if (!hoveredTeam) return team.name;

    if (matchId === 'm9') {
      if (slot === 'teamA' && ['GER', 'SUI'].includes(hoveredTeam)) return `${countryNames[hoveredTeam]}?`;
      if (slot === 'teamB' && ['ESP', 'CRO'].includes(hoveredTeam)) return `${countryNames[hoveredTeam]}?`;
    }
    if (matchId === 'm10') {
      if (slot === 'teamA' && ['ENG', 'SEN'].includes(hoveredTeam)) return `${countryNames[hoveredTeam]}?`;
      if (slot === 'teamB' && ['ARG', 'MEX'].includes(hoveredTeam)) return `${countryNames[hoveredTeam]}?`;
    }
    if (matchId === 'm11') {
      if (slot === 'teamA' && ['FRA', 'BEL'].includes(hoveredTeam)) return `${countryNames[hoveredTeam]}?`;
      if (slot === 'teamB' && ['POR', 'CZE'].includes(hoveredTeam)) return `${countryNames[hoveredTeam]}?`;
    }
    if (matchId === 'm12') {
      if (slot === 'teamA' && ['BRA', 'NOR'].includes(hoveredTeam)) return `${countryNames[hoveredTeam]}?`;
      if (slot === 'teamB' && ['CAN', 'COL'].includes(hoveredTeam)) return `${countryNames[hoveredTeam]}?`;
    }
    if (matchId === 'm13') {
      if (slot === 'teamA' && ['GER', 'SUI', 'ESP', 'CRO'].includes(hoveredTeam)) return `${countryNames[hoveredTeam]}?`;
      if (slot === 'teamB' && ['ENG', 'SEN', 'ARG', 'MEX'].includes(hoveredTeam)) return `${countryNames[hoveredTeam]}?`;
    }
    if (matchId === 'm14') {
      if (slot === 'teamA' && ['FRA', 'BEL', 'POR', 'CZE'].includes(hoveredTeam)) return `${countryNames[hoveredTeam]}?`;
      if (slot === 'teamB' && ['BRA', 'NOR', 'CAN', 'COL'].includes(hoveredTeam)) return `${countryNames[hoveredTeam]}?`;
    }
    if (matchId === 'm15') {
      if (slot === 'teamA' && ['GER', 'SUI', 'ESP', 'CRO', 'ENG', 'SEN', 'ARG', 'MEX'].includes(hoveredTeam)) return `${countryNames[hoveredTeam]}?`;
      if (slot === 'teamB' && ['FRA', 'BEL', 'POR', 'CZE', 'BRA', 'NOR', 'CAN', 'COL'].includes(hoveredTeam)) return `${countryNames[hoveredTeam]}?`;
    }
    
    return team.name;
  };

  // Helper to get dynamic team flag based on hover
  const getDynamicTeamFlag = (team: Team, matchId: string, slot: 'teamA' | 'teamB') => {
    if (!hoveredTeam) return team.flag;

    if (matchId === 'm9') {
      if (slot === 'teamA' && ['GER', 'SUI'].includes(hoveredTeam)) return hoveredTeam;
      if (slot === 'teamB' && ['ESP', 'CRO'].includes(hoveredTeam)) return hoveredTeam;
    }
    if (matchId === 'm10') {
      if (slot === 'teamA' && ['ENG', 'SEN'].includes(hoveredTeam)) return hoveredTeam;
      if (slot === 'teamB' && ['ARG', 'MEX'].includes(hoveredTeam)) return hoveredTeam;
    }
    if (matchId === 'm11') {
      if (slot === 'teamA' && ['FRA', 'BEL'].includes(hoveredTeam)) return hoveredTeam;
      if (slot === 'teamB' && ['POR', 'CZE'].includes(hoveredTeam)) return hoveredTeam;
    }
    if (matchId === 'm12') {
      if (slot === 'teamA' && ['BRA', 'NOR'].includes(hoveredTeam)) return hoveredTeam;
      if (slot === 'teamB' && ['CAN', 'COL'].includes(hoveredTeam)) return hoveredTeam;
    }
    if (matchId === 'm13') {
      if (slot === 'teamA' && ['GER', 'SUI', 'ESP', 'CRO'].includes(hoveredTeam)) return hoveredTeam;
      if (slot === 'teamB' && ['ENG', 'SEN', 'ARG', 'MEX'].includes(hoveredTeam)) return hoveredTeam;
    }
    if (matchId === 'm14') {
      if (slot === 'teamA' && ['FRA', 'BEL', 'POR', 'CZE'].includes(hoveredTeam)) return hoveredTeam;
      if (slot === 'teamB' && ['BRA', 'NOR', 'CAN', 'COL'].includes(hoveredTeam)) return hoveredTeam;
    }
    if (matchId === 'm15') {
      if (slot === 'teamA' && ['GER', 'SUI', 'ESP', 'CRO', 'ENG', 'SEN', 'ARG', 'MEX'].includes(hoveredTeam)) return hoveredTeam;
      if (slot === 'teamB' && ['FRA', 'BEL', 'POR', 'CZE', 'BRA', 'NOR', 'CAN', 'COL'].includes(hoveredTeam)) return hoveredTeam;
    }
    
    return team.flag;
  };

  // Helper to determine highlight styles for match box
  const getMatchHighlightClass = (matchId: string) => {
    if (!hoveredTeam) return 'border-zinc-900 bg-zinc-950/20';
    if (isMatchOnPath(matchId, hoveredTeam)) {
      return 'border-purple-500/60 bg-purple-950/10 text-purple-200 shadow-md shadow-purple-500/5 scale-[1.01]';
    }
    return 'border-zinc-900/40 opacity-30 bg-zinc-950/5 scale-[0.99] filter saturate-[0.5]';
  };

  // Helper to determine highlighting of connector paths
  const getPathClass = (active: boolean) => {
    return `transition-all duration-300 fill-none ${
      active
        ? 'stroke-purple-500 stroke-[2.5px] drop-shadow-[0_0_4px_rgba(168,85,247,0.7)]'
        : 'stroke-zinc-800/40 stroke-[1.5px]'
    }`;
  };

  // Helper to resolve match teams dynamically
  const getResolvedMatchTeams = (match: Match) => {
    const teamAFlag = getDynamicTeamFlag(match.teamA, match.id, 'teamA');
    const teamBFlag = getDynamicTeamFlag(match.teamB, match.id, 'teamB');
    const teamAName = getDynamicTeamName(match.teamA, match.id, 'teamA');
    const teamBName = getDynamicTeamName(match.teamB, match.id, 'teamB');

    // Generate responsive names: if it's TBD, shorten "Ganador" to fit mobile
    let teamAShort = teamAFlag !== 'TBD' ? teamAFlag : teamAName;
    let teamBShort = teamBFlag !== 'TBD' ? teamBFlag : teamBName;
    if (teamAShort.startsWith('Ganador ')) {
      teamAShort = teamAShort.replace('Ganador ', 'G.');
    }
    if (teamBShort.startsWith('Ganador ')) {
      teamBShort = teamBShort.replace('Ganador ', 'G.');
    }

    return {
      teamA: { id: teamAFlag, name: teamAName, short: teamAShort, flag: teamAFlag },
      teamB: { id: teamBFlag, name: teamBName, short: teamBShort, flag: teamBFlag },
    };
  };

  return (
    <div className="relative rounded-2xl border border-zinc-900 bg-zinc-950/40 p-6 backdrop-blur-md space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-purple-400" />
          <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
            Cuadro de Eliminatorias // Simulador Interactivo
          </h3>
        </div>
        <span className="text-[9px] font-mono text-purple-400 bg-purple-950/30 border border-purple-950/60 px-2 py-0.5 rounded-full font-bold animate-pulse">
          SIMULACIÓN: PASA EL CURSOR POR LAS SELECCIONES
        </span>
      </div>

      {/* Main Bracket Container - Scaled to fit on mobile/tablet */}
      <div className="relative w-full overflow-hidden h-[340px] sm:h-[476px] md:h-[680px] select-none">
        <div className="absolute top-0 left-0 origin-top-left scale-[0.5] sm:scale-[0.7] md:scale-100 w-[200%] sm:w-[142%] md:w-full grid grid-cols-7 gap-1 md:gap-4 lg:gap-6 items-center py-6">
          
          {/* COLUMN 1: LEFT OCTAVOS */}
          <div className="relative flex flex-col justify-around h-[680px] pt-8 z-10">
            <div className="absolute top-0 left-0 right-0 text-center">
              <h4 className="font-mono text-[8px] text-purple-400/80 uppercase tracking-widest font-bold">// OCTAVOS DE FINAL</h4>
            </div>
            {leftOctavos.map((match) => {
              const { teamA, teamB } = getResolvedMatchTeams(match);
              return (
                <div key={match.id} className="relative h-[98px] flex flex-col justify-start">
                  {/* Match Box */}
                  <div className={`rounded-xl border divide-y divide-zinc-900/60 overflow-hidden shadow-lg transition-all duration-300 ${getMatchHighlightClass(match.id)}`}>
                    {/* Team A */}
                    <div
                      onMouseEnter={() => setHoveredTeam(teamA.flag !== 'TBD' ? teamA.flag : null)}
                      onMouseLeave={() => setHoveredTeam(null)}
                      className={`flex items-center justify-between p-2.5 transition-all cursor-pointer ${
                        hoveredTeam && (hoveredTeam === teamA.flag)
                          ? 'bg-purple-900/40 text-purple-200 border-l-2 border-purple-500 font-bold'
                          : hoveredTeam && hoveredTeam !== teamA.flag
                          ? 'opacity-30'
                          : 'hover:bg-zinc-900/30'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FlagIcon countryCode={teamA.flag} className="h-3 w-4 md:h-3.5 md:w-5 rounded-sm shrink-0" />
                        <span className="text-[9px] md:text-[11px] font-mono hidden md:inline truncate max-w-[90px]">{teamA.name}</span>
                        <span className="text-[9px] md:text-[11px] font-mono inline md:hidden truncate max-w-[60px]">{teamA.short}</span>
                      </div>
                      <span className="font-mono text-[10px] md:text-xs font-bold text-zinc-500 pr-1">-</span>
                    </div>
                    {/* Team B */}
                    <div
                      onMouseEnter={() => setHoveredTeam(teamB.flag !== 'TBD' ? teamB.flag : null)}
                      onMouseLeave={() => setHoveredTeam(null)}
                      className={`flex items-center justify-between p-2.5 transition-all cursor-pointer ${
                        hoveredTeam && (hoveredTeam === teamB.flag)
                          ? 'bg-purple-900/40 text-purple-200 border-l-2 border-purple-500 font-bold'
                          : hoveredTeam && hoveredTeam !== teamB.flag
                          ? 'opacity-30'
                          : 'hover:bg-zinc-900/30'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FlagIcon countryCode={teamB.flag} className="h-3 w-4 md:h-3.5 md:w-5 rounded-sm shrink-0" />
                        <span className="text-[9px] md:text-[11px] font-mono hidden md:inline truncate max-w-[90px]">{teamB.name}</span>
                        <span className="text-[9px] md:text-[11px] font-mono inline md:hidden truncate max-w-[60px]">{teamB.short}</span>
                      </div>
                      <span className="font-mono text-[10px] md:text-xs font-bold text-zinc-500 pr-1">-</span>
                    </div>
                  </div>
                  <div className="text-[7px] md:text-[8px] font-mono text-zinc-650 text-center mt-1.5 uppercase tracking-wider">{match.details}</div>
                </div>
              );
            })}

            {/* Connecting Lines to Column 2 */}
            <svg className="absolute inset-y-0 right-[-24px] w-[24px] pointer-events-none overflow-visible z-0">
              <path d="M 0,102 L 12,102 L 12,183" className={getPathClass(hoveredTeam === 'GER')} />
              <path d="M 0,264 L 12,264 L 12,183" className={getPathClass(hoveredTeam === 'ESP')} />
              <path d="M 12,183 L 24,183" className={getPathClass(hoveredTeam === 'GER' || hoveredTeam === 'ESP')} />

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
            {leftCuartos.map((match) => {
              const { teamA, teamB } = getResolvedMatchTeams(match);
              return (
                <div key={match.id} className="relative h-[98px] flex flex-col justify-start">
                  <div className={`rounded-xl border divide-y divide-zinc-900/60 overflow-hidden shadow-lg transition-all duration-300 ${getMatchHighlightClass(match.id)}`}>
                    <div
                      onMouseEnter={() => setHoveredTeam(teamA.flag !== 'TBD' ? teamA.flag : null)}
                      onMouseLeave={() => setHoveredTeam(null)}
                      className={`flex items-center justify-between p-2.5 transition-all cursor-pointer ${
                        hoveredTeam && (hoveredTeam === teamA.flag)
                          ? 'bg-purple-900/40 text-purple-200 border-l-2 border-purple-500 font-bold'
                          : hoveredTeam && !isMatchOnPath(match.id, hoveredTeam)
                          ? 'opacity-30'
                          : 'hover:bg-zinc-900/30'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FlagIcon countryCode={teamA.flag} className="h-3 w-4 md:h-3.5 md:w-5 rounded-sm shrink-0" />
                        <span className="text-[9px] md:text-[11px] font-mono hidden md:inline truncate max-w-[90px]">{teamA.name}</span>
                        <span className="text-[9px] md:text-[11px] font-mono inline md:hidden truncate max-w-[60px]">{teamA.short}</span>
                      </div>
                      <span className="font-mono text-[10px] md:text-xs font-bold text-zinc-500 pr-1">-</span>
                    </div>
                    <div
                      onMouseEnter={() => setHoveredTeam(teamB.flag !== 'TBD' ? teamB.flag : null)}
                      onMouseLeave={() => setHoveredTeam(null)}
                      className={`flex items-center justify-between p-2.5 transition-all cursor-pointer ${
                        hoveredTeam && (hoveredTeam === teamB.flag)
                          ? 'bg-purple-900/40 text-purple-200 border-l-2 border-purple-500 font-bold'
                          : hoveredTeam && !isMatchOnPath(match.id, hoveredTeam)
                          ? 'opacity-30'
                          : 'hover:bg-zinc-900/30'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FlagIcon countryCode={teamB.flag} className="h-3 w-4 md:h-3.5 md:w-5 rounded-sm shrink-0" />
                        <span className="text-[9px] md:text-[11px] font-mono hidden md:inline truncate max-w-[90px]">{teamB.name}</span>
                        <span className="text-[9px] md:text-[11px] font-mono inline md:hidden truncate max-w-[60px]">{teamB.short}</span>
                      </div>
                      <span className="font-mono text-[10px] md:text-xs font-bold text-zinc-500 pr-1">-</span>
                    </div>
                  </div>
                  <div className="text-[7px] md:text-[8px] font-mono text-zinc-650 text-center mt-1.5 uppercase tracking-wider">{match.details}</div>
                </div>
              );
            })}

            {/* Connecting Lines to Column 3 */}
            <svg className="absolute inset-y-0 right-[-24px] w-[24px] pointer-events-none overflow-visible z-0">
              <path d="M 0,183 L 12,183 L 12,345" className={getPathClass(['GER', 'SUI', 'ESP', 'CRO'].includes(hoveredTeam || ''))} />
              <path d="M 0,507 L 12,507 L 12,345" className={getPathClass(['ENG', 'SEN', 'ARG', 'MEX'].includes(hoveredTeam || ''))} />
              <path d="M 12,345 L 24,345" className={getPathClass(['GER', 'SUI', 'ESP', 'CRO', 'ENG', 'SEN', 'ARG', 'MEX'].includes(hoveredTeam || ''))} />
            </svg>
          </div>

          {/* COLUMN 3: LEFT SEMIFINAL */}
          <div className="relative flex flex-col justify-around h-[680px] pt-8 z-10">
            <div className="absolute top-0 left-0 right-0 text-center">
              <h4 className="font-mono text-[8px] text-purple-400/80 uppercase tracking-widest font-bold">// SEMIFINAL</h4>
            </div>
            {(() => {
              const { teamA, teamB } = getResolvedMatchTeams(leftSemifinal);
              return (
                <div className="relative h-[98px] flex flex-col justify-start">
                  <div className={`rounded-xl border divide-y divide-zinc-900/60 overflow-hidden shadow-lg transition-all duration-300 ${getMatchHighlightClass(leftSemifinal.id)}`}>
                    <div
                      onMouseEnter={() => setHoveredTeam(teamA.flag !== 'TBD' ? teamA.flag : null)}
                      onMouseLeave={() => setHoveredTeam(null)}
                      className={`flex items-center justify-between p-2.5 transition-all cursor-pointer ${
                        hoveredTeam && (hoveredTeam === teamA.flag)
                          ? 'bg-purple-900/40 text-purple-200 border-l-2 border-purple-500 font-bold'
                          : hoveredTeam && !isMatchOnPath(leftSemifinal.id, hoveredTeam)
                          ? 'opacity-30'
                          : 'hover:bg-zinc-900/30'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FlagIcon countryCode={teamA.flag} className="h-3 w-4 md:h-3.5 md:w-5 rounded-sm shrink-0" />
                        <span className="text-[9px] md:text-[11px] font-mono hidden md:inline truncate max-w-[90px]">{teamA.name}</span>
                        <span className="text-[9px] md:text-[11px] font-mono inline md:hidden truncate max-w-[60px]">{teamA.short}</span>
                      </div>
                      <span className="font-mono text-[10px] md:text-xs font-bold text-zinc-500 pr-1">-</span>
                    </div>
                    <div
                      onMouseEnter={() => setHoveredTeam(teamB.flag !== 'TBD' ? teamB.flag : null)}
                      onMouseLeave={() => setHoveredTeam(null)}
                      className={`flex items-center justify-between p-2.5 transition-all cursor-pointer ${
                        hoveredTeam && (hoveredTeam === teamB.flag)
                          ? 'bg-purple-900/40 text-purple-200 border-l-2 border-purple-500 font-bold'
                          : hoveredTeam && !isMatchOnPath(leftSemifinal.id, hoveredTeam)
                          ? 'opacity-30'
                          : 'hover:bg-zinc-900/30'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FlagIcon countryCode={teamB.flag} className="h-3 w-4 md:h-3.5 md:w-5 rounded-sm shrink-0" />
                        <span className="text-[9px] md:text-[11px] font-mono hidden md:inline truncate max-w-[90px]">{teamB.name}</span>
                        <span className="text-[9px] md:text-[11px] font-mono inline md:hidden truncate max-w-[60px]">{teamB.short}</span>
                      </div>
                      <span className="font-mono text-[10px] md:text-xs font-bold text-zinc-500 pr-1">-</span>
                    </div>
                  </div>
                  <div className="text-[7px] md:text-[8px] font-mono text-zinc-650 text-center mt-1.5 uppercase tracking-wider">{leftSemifinal.details}</div>
                </div>
              );
            })()}

            {/* Connecting Lines to Column 4 */}
            <svg className="absolute inset-y-0 right-[-24px] w-[24px] pointer-events-none overflow-visible z-0">
              <path d="M 0,345 L 24,345" className={getPathClass(['GER', 'SUI', 'ESP', 'CRO', 'ENG', 'SEN', 'ARG', 'MEX'].includes(hoveredTeam || ''))} />
            </svg>
          </div>

          {/* COLUMN 4: PODIUM & GRAND FINAL */}
          <div className="relative flex flex-col justify-center h-[680px] pt-8 z-10">
            <div className="absolute top-0 left-0 right-0 text-center">
              <h4 className="font-mono text-[8px] text-amber-400 uppercase tracking-widest font-bold">// LA GRAN FINAL</h4>
            </div>

            {/* 1. Champion Podium block */}
            <div className="absolute top-[65px] left-1/2 transform -translate-x-1/2 flex flex-col items-center p-4 rounded-xl border border-yellow-500/30 bg-yellow-950/10 shadow-lg shadow-yellow-500/5 w-full max-w-[170px] text-center transition-all duration-300">
              <div className="p-2 bg-yellow-500/10 rounded-full border border-yellow-500/30 text-yellow-400 mb-2">
                <Trophy className="h-6 w-6" />
              </div>
              <span className="text-[8px] font-mono font-bold text-yellow-400 uppercase tracking-widest mb-1">
                CAMPEÓN DEL MUNDO
              </span>
              <div className="flex items-center gap-1.5 justify-center mb-1">
                <FlagIcon countryCode={hoveredTeam || 'TBD'} className="h-3.5 w-5 rounded-sm shadow-sm" />
                <h3 className="text-xs font-mono font-black text-white uppercase truncate max-w-[100px]">
                  {hoveredTeam ? countryNames[hoveredTeam] : 'POR DEFINIR'}
                </h3>
              </div>
              <span className="text-[7px] font-mono text-zinc-500">// MONARCA GLOBAL</span>
            </div>

            {/* 2. Grand Final Match */}
            {(() => {
              const { teamA, teamB } = getResolvedMatchTeams(finalMatch);
              return (
                <div className="relative h-[98px] flex flex-col justify-start w-full max-w-[190px] mx-auto mt-[160px]">
                  <div className={`rounded-xl border border-purple-500/30 divide-y divide-zinc-900/60 overflow-hidden shadow-lg transition-all duration-300 ${getMatchHighlightClass(finalMatch.id)}`}>
                    <div
                      onMouseEnter={() => setHoveredTeam(teamA.flag !== 'TBD' ? teamA.flag : null)}
                      onMouseLeave={() => setHoveredTeam(null)}
                      className={`flex items-center justify-between p-2.5 transition-all cursor-pointer ${
                        hoveredTeam && (hoveredTeam === teamA.flag)
                          ? 'bg-purple-900/40 text-purple-200 border-l-2 border-purple-500 font-bold'
                          : hoveredTeam && !isMatchOnPath(finalMatch.id, hoveredTeam)
                          ? 'opacity-30'
                          : 'hover:bg-zinc-900/30'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FlagIcon countryCode={teamA.flag} className="h-3 w-4 md:h-3.5 md:w-5 rounded-sm shrink-0" />
                        <span className="text-[9px] md:text-[11px] font-mono hidden md:inline truncate max-w-[90px]">{teamA.name}</span>
                        <span className="text-[9px] md:text-[11px] font-mono inline md:hidden truncate max-w-[60px]">{teamA.short}</span>
                      </div>
                      <span className="font-mono text-[10px] md:text-xs font-bold text-zinc-550 pr-1">-</span>
                    </div>
                    <div
                      onMouseEnter={() => setHoveredTeam(teamB.flag !== 'TBD' ? teamB.flag : null)}
                      onMouseLeave={() => setHoveredTeam(null)}
                      className={`flex items-center justify-between p-2.5 transition-all cursor-pointer ${
                        hoveredTeam && (hoveredTeam === teamB.flag)
                          ? 'bg-purple-900/40 text-purple-200 border-l-2 border-purple-500 font-bold'
                          : hoveredTeam && !isMatchOnPath(finalMatch.id, hoveredTeam)
                          ? 'opacity-30'
                          : 'hover:bg-zinc-900/30'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FlagIcon countryCode={teamB.flag} className="h-3 w-4 md:h-3.5 md:w-5 rounded-sm shrink-0" />
                        <span className="text-[9px] md:text-[11px] font-mono hidden md:inline truncate max-w-[90px]">{teamB.name}</span>
                        <span className="text-[9px] md:text-[11px] font-mono inline md:hidden truncate max-w-[60px]">{teamB.short}</span>
                      </div>
                      <span className="font-mono text-[10px] md:text-xs font-bold text-zinc-550 pr-1">-</span>
                    </div>
                  </div>
                  <div className="text-[7px] md:text-[8px] font-mono text-zinc-650 text-center mt-1.5 uppercase tracking-wider">{finalMatch.details}</div>
                </div>
              );
            })()}
          </div>

          {/* COLUMN 5: RIGHT SEMIFINAL */}
          <div className="relative flex flex-col justify-around h-[680px] pt-8 z-10">
            <div className="absolute top-0 left-0 right-0 text-center">
              <h4 className="font-mono text-[8px] text-purple-400/80 uppercase tracking-widest font-bold">// SEMIFINAL</h4>
            </div>
            {(() => {
              const { teamA, teamB } = getResolvedMatchTeams(rightSemifinal);
              return (
                <div className="relative h-[98px] flex flex-col justify-start">
                  <div className={`rounded-xl border divide-y divide-zinc-900/60 overflow-hidden shadow-lg transition-all duration-300 ${getMatchHighlightClass(rightSemifinal.id)}`}>
                    <div
                      onMouseEnter={() => setHoveredTeam(teamA.flag !== 'TBD' ? teamA.flag : null)}
                      onMouseLeave={() => setHoveredTeam(null)}
                      className={`flex items-center justify-between p-2.5 transition-all cursor-pointer ${
                        hoveredTeam && (hoveredTeam === teamA.flag)
                          ? 'bg-purple-900/40 text-purple-200 border-l-2 border-purple-500 font-bold'
                          : hoveredTeam && !isMatchOnPath(rightSemifinal.id, hoveredTeam)
                          ? 'opacity-30'
                          : 'hover:bg-zinc-900/30'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FlagIcon countryCode={teamA.flag} className="h-3 w-4 md:h-3.5 md:w-5 rounded-sm shrink-0" />
                        <span className="text-[9px] md:text-[11px] font-mono hidden md:inline truncate max-w-[90px]">{teamA.name}</span>
                        <span className="text-[9px] md:text-[11px] font-mono inline md:hidden truncate max-w-[60px]">{teamA.short}</span>
                      </div>
                      <span className="font-mono text-[10px] md:text-xs font-bold text-zinc-550 pr-1">-</span>
                    </div>
                    <div
                      onMouseEnter={() => setHoveredTeam(teamB.flag !== 'TBD' ? teamB.flag : null)}
                      onMouseLeave={() => setHoveredTeam(null)}
                      className={`flex items-center justify-between p-2.5 transition-all cursor-pointer ${
                        hoveredTeam && (hoveredTeam === teamB.flag)
                          ? 'bg-purple-900/40 text-purple-200 border-l-2 border-purple-500 font-bold'
                          : hoveredTeam && !isMatchOnPath(rightSemifinal.id, hoveredTeam)
                          ? 'opacity-30'
                          : 'hover:bg-zinc-900/30'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FlagIcon countryCode={teamB.flag} className="h-3 w-4 md:h-3.5 md:w-5 rounded-sm shrink-0" />
                        <span className="text-[9px] md:text-[11px] font-mono hidden md:inline truncate max-w-[90px]">{teamB.name}</span>
                        <span className="text-[9px] md:text-[11px] font-mono inline md:hidden truncate max-w-[60px]">{teamB.short}</span>
                      </div>
                      <span className="font-mono text-[10px] md:text-xs font-bold text-zinc-550 pr-1">-</span>
                    </div>
                  </div>
                  <div className="text-[7px] md:text-[8px] font-mono text-zinc-650 text-center mt-1.5 uppercase tracking-wider">{rightSemifinal.details}</div>
                </div>
              );
            })()}

            {/* Connecting Lines to Column 4 */}
            <svg className="absolute inset-y-0 left-[-24px] w-[24px] pointer-events-none overflow-visible z-0">
              <path d="M 24,345 L 0,345" className={getPathClass(['FRA', 'BEL', 'POR', 'CZE', 'BRA', 'NOR', 'CAN', 'COL'].includes(hoveredTeam || ''))} />
            </svg>
          </div>

          {/* COLUMN 6: RIGHT CUARTOS */}
          <div className="relative flex flex-col justify-around h-[680px] pt-8 z-10">
            <div className="absolute top-0 left-0 right-0 text-center">
              <h4 className="font-mono text-[8px] text-purple-400/80 uppercase tracking-widest font-bold">// CUARTOS DE FINAL</h4>
            </div>
            {rightCuartos.map((match) => {
              const { teamA, teamB } = getResolvedMatchTeams(match);
              return (
                <div key={match.id} className="relative h-[98px] flex flex-col justify-start">
                  <div className={`rounded-xl border divide-y divide-zinc-900/60 overflow-hidden shadow-lg transition-all duration-300 ${getMatchHighlightClass(match.id)}`}>
                    <div
                      onMouseEnter={() => setHoveredTeam(teamA.flag !== 'TBD' ? teamA.flag : null)}
                      onMouseLeave={() => setHoveredTeam(null)}
                      className={`flex items-center justify-between p-2.5 transition-all cursor-pointer ${
                        hoveredTeam && (hoveredTeam === teamA.flag)
                          ? 'bg-purple-900/40 text-purple-200 border-l-2 border-purple-500 font-bold'
                          : hoveredTeam && !isMatchOnPath(match.id, hoveredTeam)
                          ? 'opacity-30'
                          : 'hover:bg-zinc-900/30'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FlagIcon countryCode={teamA.flag} className="h-3 w-4 md:h-3.5 md:w-5 rounded-sm shrink-0" />
                        <span className="text-[9px] md:text-[11px] font-mono hidden md:inline truncate max-w-[90px]">{teamA.name}</span>
                        <span className="text-[9px] md:text-[11px] font-mono inline md:hidden truncate max-w-[60px]">{teamA.short}</span>
                      </div>
                      <span className="font-mono text-[10px] md:text-xs font-bold text-zinc-500 pr-1">-</span>
                    </div>
                    <div
                      onMouseEnter={() => setHoveredTeam(teamB.flag !== 'TBD' ? teamB.flag : null)}
                      onMouseLeave={() => setHoveredTeam(null)}
                      className={`flex items-center justify-between p-2.5 transition-all cursor-pointer ${
                        hoveredTeam && (hoveredTeam === teamB.flag)
                          ? 'bg-purple-900/40 text-purple-200 border-l-2 border-purple-500 font-bold'
                          : hoveredTeam && !isMatchOnPath(match.id, hoveredTeam)
                          ? 'opacity-30'
                          : 'hover:bg-zinc-900/30'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FlagIcon countryCode={teamB.flag} className="h-3 w-4 md:h-3.5 md:w-5 rounded-sm shrink-0" />
                        <span className="text-[9px] md:text-[11px] font-mono hidden md:inline truncate max-w-[90px]">{teamB.name}</span>
                        <span className="text-[9px] md:text-[11px] font-mono inline md:hidden truncate max-w-[60px]">{teamB.short}</span>
                      </div>
                      <span className="font-mono text-[10px] md:text-xs font-bold text-zinc-550 pr-1">-</span>
                    </div>
                  </div>
                  <div className="text-[7px] md:text-[8px] font-mono text-zinc-650 text-center mt-1.5 uppercase tracking-wider">{match.details}</div>
                </div>
              );
            })}

            {/* Connecting Lines to Column 5 */}
            <svg className="absolute inset-y-0 left-[-24px] w-[24px] pointer-events-none overflow-visible z-0">
              <path d="M 24,183 L 12,183 L 12,345" className={getPathClass(['FRA', 'BEL', 'POR', 'CZE'].includes(hoveredTeam || ''))} />
              <path d="M 24,507 L 12,507 L 12,345" className={getPathClass(['BRA', 'NOR', 'CAN', 'COL'].includes(hoveredTeam || ''))} />
              <path d="M 12,345 L 0,345" className={getPathClass(['FRA', 'BEL', 'POR', 'CZE', 'BRA', 'NOR', 'CAN', 'COL'].includes(hoveredTeam || ''))} />
            </svg>
          </div>

          {/* COLUMN 7: RIGHT OCTAVOS */}
          <div className="relative flex flex-col justify-around h-[680px] pt-8 z-10">
            <div className="absolute top-0 left-0 right-0 text-center">
              <h4 className="font-mono text-[8px] text-purple-400/80 uppercase tracking-widest font-bold">// OCTAVOS DE FINAL</h4>
            </div>
            {rightOctavos.map((match) => {
              const { teamA, teamB } = getResolvedMatchTeams(match);
              return (
                <div key={match.id} className="relative h-[98px] flex flex-col justify-start">
                  <div className={`rounded-xl border divide-y divide-zinc-900/60 overflow-hidden shadow-lg transition-all duration-300 ${getMatchHighlightClass(match.id)}`}>
                    <div
                      onMouseEnter={() => setHoveredTeam(teamA.flag !== 'TBD' ? teamA.flag : null)}
                      onMouseLeave={() => setHoveredTeam(null)}
                      className={`flex items-center justify-between p-2.5 transition-all cursor-pointer ${
                        hoveredTeam && (hoveredTeam === teamA.flag)
                          ? 'bg-purple-900/40 text-purple-200 border-l-2 border-purple-500 font-bold'
                          : hoveredTeam && hoveredTeam !== teamA.flag
                          ? 'opacity-30'
                          : 'hover:bg-zinc-900/30'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FlagIcon countryCode={teamA.flag} className="h-3 w-4 md:h-3.5 md:w-5 rounded-sm shrink-0" />
                        <span className="text-[9px] md:text-[11px] font-mono hidden md:inline truncate max-w-[90px]">{teamA.name}</span>
                        <span className="text-[9px] md:text-[11px] font-mono inline md:hidden truncate max-w-[60px]">{teamA.short}</span>
                      </div>
                      <span className="font-mono text-[10px] md:text-xs font-bold text-zinc-500 pr-1">-</span>
                    </div>
                    <div
                      onMouseEnter={() => setHoveredTeam(teamB.flag !== 'TBD' ? teamB.flag : null)}
                      onMouseLeave={() => setHoveredTeam(null)}
                      className={`flex items-center justify-between p-2.5 transition-all cursor-pointer ${
                        hoveredTeam && (hoveredTeam === teamB.flag)
                          ? 'bg-purple-900/40 text-purple-200 border-l-2 border-purple-500 font-bold'
                          : hoveredTeam && hoveredTeam !== teamB.flag
                          ? 'opacity-30'
                          : 'hover:bg-zinc-900/30'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FlagIcon countryCode={teamB.flag} className="h-3 w-4 md:h-3.5 md:w-5 rounded-sm shrink-0" />
                        <span className="text-[9px] md:text-[11px] font-mono hidden md:inline truncate max-w-[90px]">{teamB.name}</span>
                        <span className="text-[9px] md:text-[11px] font-mono inline md:hidden truncate max-w-[60px]">{teamB.short}</span>
                      </div>
                      <span className="font-mono text-[10px] md:text-xs font-bold text-zinc-550 pr-1">-</span>
                    </div>
                  </div>
                  <div className="text-[7px] md:text-[8px] font-mono text-zinc-650 text-center mt-1.5 uppercase tracking-wider">{match.details}</div>
                </div>
              );
            })}

            {/* Connecting Lines to Column 6 */}
            <svg className="absolute inset-y-0 left-[-24px] w-[24px] pointer-events-none overflow-visible z-0">
              <path d="M 24,102 L 12,102 L 12,183" className={getPathClass(hoveredTeam === 'FRA')} />
              <path d="M 24,264 L 12,264 L 12,183" className={getPathClass(hoveredTeam === 'POR')} />
              <path d="M 12,183 L 0,183" className={getPathClass(hoveredTeam === 'FRA' || hoveredTeam === 'POR')} />

              <path d="M 24,426 L 12,426 L 12,507" className={getPathClass(hoveredTeam === 'BRA')} />
              <path d="M 24,588 L 12,588 L 12,507" className={getPathClass(hoveredTeam === 'CAN')} />
              <path d="M 12,507 L 0,507" className={getPathClass(hoveredTeam === 'BRA' || hoveredTeam === 'CAN')} />
            </svg>
          </div>

        </div>
      </div>

      {/* Info Legend */}
      <div className="border-t border-zinc-900 bg-zinc-950/60 p-3 flex justify-between items-center text-[8px] font-mono text-zinc-650">
        <span>* PASA EL CURSOR SOBRE CUALQUIER SELECCIÓN DEL MUNDIAL 2026 PARA SIMULAR SU CAMINO HASTA LA FINAL</span>
        <span>BRACKET INTERACTIVO // SIN MARCADORES SIMULADOS</span>
      </div>
    </div>
  );
}
