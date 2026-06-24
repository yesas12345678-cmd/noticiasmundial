import React from 'react';

interface FlagIconProps {
  countryCode: string; // e.g. 'ESP', 'GER', 'ARG', 'FRA', 'BRA', 'ENG', 'URU', 'ITA', 'BEL', 'USA', 'JPN', 'CMR', 'MEX', 'POL'
  className?: string;
}

export default function FlagIcon({ countryCode, className = 'h-4 w-6' }: FlagIconProps) {
  const code = countryCode.toUpperCase();

  switch (code) {
    case 'ESP':
      return (
        <svg className={`${className} border border-zinc-900 rounded-sm`} viewBox="0 0 750 500" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#c60b1e" height="500" width="750" />
          <rect fill="#ffc400" height="250" width="750" y="125" />
          <path d="M 125 150 L 125 350 A 50 50 0 0 0 225 350 L 225 150 Z" fill="#c60b1e" opacity="0.3" />
        </svg>
      );
    case 'GER':
      return (
        <svg className={`${className} border border-zinc-900 rounded-sm`} viewBox="0 0 5 3" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#000" height="3" width="5" />
          <rect fill="#D00" height="2" width="5" y="1" />
          <rect fill="#FFCE00" height="1" width="5" y="2" />
        </svg>
      );
    case 'ARG':
      return (
        <svg className={`${className} border border-zinc-900 rounded-sm`} viewBox="0 0 840 540" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#74acdf" height="540" width="840" />
          <rect fill="#fff" height="180" width="840" y="180" />
          <circle cx="420" cy="270" fill="#f9a818" r="40" />
        </svg>
      );
    case 'FRA':
      return (
        <svg className={`${className} border border-zinc-900 rounded-sm`} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#002395" height="2" width="1" />
          <rect fill="#FFF" height="2" width="1" x="1" />
          <rect fill="#ED2939" height="2" width="1" x="2" />
        </svg>
      );
    case 'BRA':
      return (
        <svg className={`${className} border border-zinc-900 rounded-sm`} viewBox="0 0 720 504" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#009c3b" height="504" width="720" />
          <polygon fill="#ffdf00" points="360,36 684,252 360,468 36,252" />
          <circle cx="360" cy="252" fill="#002776" r="100" />
        </svg>
      );
    case 'ENG':
      return (
        <svg className={`${className} border border-zinc-900 rounded-sm`} viewBox="0 0 25 15" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#fff" height="15" width="25" />
          <rect fill="#cf142b" height="15" width="3" x="11" />
          <rect fill="#cf142b" height="3" width="25" y="6" />
        </svg>
      );
    case 'URU':
      return (
        <svg className={`${className} border border-zinc-900 rounded-sm`} viewBox="0 0 9 6" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#fff" height="6" width="9" />
          <rect fill="#0081c8" height="0.67" width="9" y="0" />
          <rect fill="#0081c8" height="0.67" width="9" y="1.33" />
          <rect fill="#0081c8" height="0.67" width="9" y="2.67" />
          <rect fill="#0081c8" height="0.67" width="9" y="4" />
          <rect fill="#0081c8" height="0.67" width="9" y="5.33" />
          <circle cx="1.5" cy="1.5" r="0.5" fill="#fcd116" />
        </svg>
      );
    case 'ITA':
      return (
        <svg className={`${className} border border-zinc-900 rounded-sm`} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#009246" height="2" width="1" />
          <rect fill="#fff" height="2" width="1" x="1" />
          <rect fill="#ce2b37" height="2" width="1" x="2" />
        </svg>
      );
    case 'BEL':
      return (
        <svg className={`${className} border border-zinc-900 rounded-sm`} viewBox="0 0 15 13" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#000" height="13" width="5" />
          <rect fill="#ffd100" height="13" width="5" x="5" />
          <rect fill="#ff0f47" height="13" width="5" x="10" />
        </svg>
      );
    case 'USA':
      return (
        <svg className={`${className} border border-zinc-900 rounded-sm`} viewBox="0 0 19 10" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#bb133e" height="10" width="19" />
          <rect fill="#fff" height="1" width="19" y="1" />
          <rect fill="#fff" height="1" width="19" y="3" />
          <rect fill="#fff" height="1" width="19" y="5" />
          <rect fill="#fff" height="1" width="19" y="7" />
          <rect fill="#fff" height="1" width="19" y="9" />
          <rect fill="#3c3b6e" height="5" width="7.6" />
          <circle cx="2" cy="2.5" r="0.3" fill="#fff" />
          <circle cx="4" cy="2.5" r="0.3" fill="#fff" />
          <circle cx="6" cy="2.5" r="0.3" fill="#fff" />
        </svg>
      );
    case 'JPN':
      return (
        <svg className={`${className} border border-zinc-900 rounded-sm`} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#fff" height="2" width="3" />
          <circle cx="1.5" cy="1" fill="#bc002d" r="0.6" />
        </svg>
      );
    case 'CMR':
      return (
        <svg className={`${className} border border-zinc-900 rounded-sm`} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#007a5e" height="2" width="1" />
          <rect fill="#ce1126" height="2" width="1" x="1" />
          <rect fill="#fcd116" height="2" width="1" x="2" />
          <polygon fill="#fcd116" points="1.5,0.7 1.58,0.95 1.83,0.95 1.63,1.1 1.7,1.35 1.5,1.2 1.3,1.35 1.37,1.1 1.17,0.95 1.42,0.95" />
        </svg>
      );
    case 'MEX':
      return (
        <svg className={`${className} border border-zinc-900 rounded-sm`} viewBox="0 0 7 4" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#006847" height="4" width="2.33" />
          <rect fill="#fff" height="4" width="2.33" x="2.33" />
          <rect fill="#ce1126" height="4" width="2.33" x="4.66" />
          <circle cx="3.5" cy="2" fill="#c39b34" r="0.4" />
        </svg>
      );
    case 'POL':
      return (
        <svg className={`${className} border border-zinc-900 rounded-sm`} viewBox="0 0 8 5" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#fff" height="2.5" width="8" />
          <rect fill="#eb3b5a" height="2.5" width="8" y="2.5" />
        </svg>
      );
    case 'CAN':
      return (
        <svg className={`${className} border border-zinc-900 rounded-sm`} viewBox="0 0 500 250" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#d80621" height="250" width="500" />
          <rect fill="#fff" height="250" width="250" x="125" />
          {/* Simplified Maple Leaf */}
          <path d="M 250,55 L 262,95 L 285,85 L 275,110 L 305,125 L 270,135 L 280,165 L 250,150 L 220,165 L 230,135 L 195,125 L 225,110 L 215,85 L 238,95 Z M 246,150 L 246,190 L 254,190 L 254,150 Z" fill="#d80621" />
        </svg>
      );
    case 'SUI':
      return (
        <svg className={`${className} border border-zinc-900 rounded-sm`} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#d80621" height="100" width="100" />
          <rect fill="#fff" height="60" width="20" x="40" y="20" />
          <rect fill="#fff" height="20" width="60" x="20" y="40" />
        </svg>
      );
    case 'POR':
      return (
        <svg className={`${className} border border-zinc-900 rounded-sm`} viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#d80621" height="400" width="600" />
          <rect fill="#006600" height="400" width="240" />
          <circle cx="240" cy="200" fill="#ffcc00" r="50" opacity="0.8" />
        </svg>
      );
    case 'CZE':
      return (
        <svg className={`${className} border border-zinc-900 rounded-sm`} viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#d80621" height="400" width="600" />
          <rect fill="#fff" height="200" width="600" />
          <polygon fill="#11457e" points="0,0 300,200 0,400" />
        </svg>
      );
    case 'RSA':
      return (
        <svg className={`${className} border border-zinc-900 rounded-sm`} viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#007a3d" height="400" width="600" />
          <polygon fill="#002395" points="0,240 600,240 600,400 0,400" />
          <polygon fill="#e51d2e" points="0,0 600,0 600,160 0,160" />
          <polygon fill="#fff" points="0,0 240,160 240,240 0,400" />
          <polygon fill="#007a3d" points="0,20 210,160 210,240 0,380" />
          <polygon fill="#ffb81c" points="0,60 150,160 150,240 0,340" />
          <polygon fill="#000" points="0,80 120,160 120,240 0,320" />
        </svg>
      );
    case 'KOR':
      return (
        <svg className={`${className} border border-zinc-900 rounded-sm`} viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#fff" height="400" width="600" />
          <circle cx="300" cy="200" fill="#cd2e3a" r="70" />
          <path d="M 300,130 A 35,35 0 0,1 300,200 A 35,35 0 0,0 300,270 A 70,70 0 0,0 300,130 Z" fill="#0047a0" />
          {/* Trigrams (simplified black bars) */}
          <rect fill="#000" height="10" transform="rotate(-33.7, 180, 120)" width="50" x="155" y="115" />
          <rect fill="#000" height="10" transform="rotate(33.7, 420, 120)" width="50" x="395" y="115" />
          <rect fill="#000" height="10" transform="rotate(33.7, 180, 280)" width="50" x="155" y="275" />
          <rect fill="#000" height="10" transform="rotate(-33.7, 420, 280)" width="50" x="395" y="275" />
        </svg>
      );
    case 'BIH':
      return (
        <svg className={`${className} border border-zinc-900 rounded-sm`} viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#002395" height="300" width="600" />
          <polygon fill="#fecb00" points="150,0 450,0 450,300" />
          {/* White stars (simplified) */}
          <circle cx="210" cy="60" fill="#fff" r="6" />
          <circle cx="240" cy="100" fill="#fff" r="6" />
          <circle cx="270" cy="140" fill="#fff" r="6" />
          <circle cx="300" cy="180" fill="#fff" r="6" />
          <circle cx="330" cy="220" fill="#fff" r="6" />
        </svg>
      );
    case 'QAT':
      return (
        <svg className={`${className} border border-zinc-900 rounded-sm`} viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#8a1538" height="240" width="600" />
          <polygon fill="#fff" points="0,0 150,0 170,15 150,30 170,45 150,60 170,75 150,90 170,105 150,120 170,135 150,150 170,165 150,180 170,195 150,210 170,225 150,240 0,240" />
        </svg>
      );
    case 'SCO':
      return (
        <svg className={`${className} border border-zinc-900 rounded-sm`} viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#0065bf" height="300" width="500" />
          <polygon fill="#fff" points="0,0 40,0 500,270 500,300 460,300 0,30" />
          <polygon fill="#fff" points="500,0 460,0 0,270 0,300 40,300 500,30" />
        </svg>
      );
    case 'MAR':
      return (
        <svg className={`${className} border border-zinc-900 rounded-sm`} viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#c1272d" height="400" width="600" />
          {/* Green Pentagram */}
          <polygon fill="none" points="300,140 335,248 245,182 355,182 265,248" stroke="#006233" strokeWidth="12" />
        </svg>
      );
    case 'HAI':
      return (
        <svg className={`${className} border border-zinc-900 rounded-sm`} viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#d80621" height="300" width="500" />
          <rect fill="#00209f" height="150" width="500" />
          {/* Square with palm tree emblem */}
          <rect fill="#fff" height="60" width="70" x="215" y="120" />
          <rect fill="#007a3d" height="10" width="50" x="225" y="160" />
          <line stroke="#8b5a2b" strokeWidth="4" x1="250" x2="250" y1="130" y2="160" />
          <circle cx="250" cy="130" fill="#007a3d" r="8" />
        </svg>
      );
    case 'SWE':
      return (
        <svg className={`${className} border border-zinc-900 rounded-sm`} viewBox="0 0 16 10" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#006aa7" height="10" width="16" />
          <rect fill="#fecc00" height="10" width="2" x="5" />
          <rect fill="#fecc00" height="2" width="16" y="4" />
        </svg>
      );
    case 'NOR':
      return (
        <svg className={`${className} border border-zinc-900 rounded-sm`} viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#cf142b" height="16" width="22" />
          <rect fill="#fff" height="16" width="4" x="6" />
          <rect fill="#fff" height="4" width="22" y="6" />
          <rect fill="#002868" height="16" width="2" x="7" />
          <rect fill="#002868" height="2" width="22" y="7" />
        </svg>
      );
    case 'SEN':
      return (
        <svg className={`${className} border border-zinc-900 rounded-sm`} viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#00853f" height="2" width="1" />
          <rect fill="#fdef42" height="2" width="1" x="1" />
          <rect fill="#e31b23" height="2" width="1" x="2" />
          <polygon fill="#00853f" points="1.5,0.6 1.58,0.85 1.83,0.85 1.63,1.0 1.7,1.25 1.5,1.1 1.3,1.25 1.37,1.0 1.17,0.85 1.42,0.85" />
        </svg>
      );
    default:
      return (
        <svg className={`${className} border border-zinc-900 rounded-sm`} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#27272a" height="10" width="10" />
        </svg>
      );
  }
}
