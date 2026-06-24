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
    default:
      return (
        <svg className={`${className} border border-zinc-900 rounded-sm`} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#27272a" height="10" width="10" />
        </svg>
      );
  }
}
