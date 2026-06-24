'use client';

import React from 'react';

export default function WorldCupBackground() {
  // 16 bands to cover the 1000px width (centered at 500)
  const bandsCount = 16;
  const bandWidth = 32;

  const colors = [
    '#7c3aed', // Purple/Violet
    '#22c55e', // Green
    '#ea580c', // Orange
    '#dc2626', // Red
    '#991b1b', // Dark Red
    '#2563eb', // Blue
    '#c084fc', // Lavender
    '#a3e635', // Lime/Neon Green
  ];

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#09090b]">
      {/* Dynamic World Cup 2026 Graphic Pattern */}
      <svg
        className="w-full h-full object-cover opacity-35 filter saturate-[1.2] contrast-[1.1]"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Draw bands from outside to inside (so they overlay correctly if needed, though they tile mathematically) */}
        {Array.from({ length: bandsCount }).map((_, index) => {
          const i = bandsCount - index; // 16 down to 1
          const offset = i * bandWidth - bandWidth / 2;
          const color = colors[(i - 1) % colors.length];

          return (
            <g key={i}>
              {/* Left Side: Concentric Curves (Bezier Curves) */}
              {/* Top-Left Curve */}
              <path
                d={`M 500,300 Q ${500 - offset},300 ${500 - offset},0`}
                fill="none"
                stroke={color}
                strokeWidth={bandWidth + 1}
              />
              {/* Bottom-Left Curve */}
              <path
                d={`M 500,300 Q ${500 - offset},300 ${500 - offset},600`}
                fill="none"
                stroke={color}
                strokeWidth={bandWidth + 1}
              />

              {/* Right Side: Concentric L-Shapes */}
              {/* Top-Right L-Shape */}
              <path
                d={`M 500,300 H ${500 + offset} V 0`}
                fill="none"
                stroke={color}
                strokeWidth={bandWidth + 1}
              />
              {/* Bottom-Right L-Shape */}
              <path
                d={`M 500,300 H ${500 + offset} V 600`}
                fill="none"
                stroke={color}
                strokeWidth={bandWidth + 1}
              />
            </g>
          );
        })}

        {/* Center Horizon Line Accent */}
        <line x1="0" y1="300" x2="1000" y2="300" stroke="#fff" strokeWidth="2" opacity="0.15" />

        {/* Central FIFA 26 Stacked Logo */}
        <g transform="translate(500, 300)">
          {/* Logo Container Background (the white block "26") */}
          {/* Stylized rounded '2' on top (centered at Y=-90) and '6' on bottom (centered at Y=40) */}
          <path
            d="
              M -65,-155 
              C -65,-175 -50,-190 -25,-190 
              H 25 
              C 50,-190 65,-175 65,-155 
              V -110 
              C 65,-95 50,-80 30,-75 
              V -70 
              C 50,-65 65,-50 65,-30 
              V 30 
              C 65,55 50,70 25,70 
              H -25 
              C -50,70 -65,55 -65,30 
              V -30 
              C -65,-50 -50,-65 -30,-70 
              V -75 
              C -50,-80 -65,-95 -65,-110 
              Z"
            fill="#ffffff"
          />

          {/* Cuts/Negative spaces to form the numbers '2' and '6' */}
          {/* '2' top hole */}
          <path d="M -30,-150 H 30 V -130 H -30 Z" fill="#b91c1c" opacity="0.08" />
          {/* '2' bottom diagonal/horizontal block cut */}
          <path d="M -30,-110 H 10 V -95 H -30 Z" fill="#b91c1c" opacity="0.08" />
          {/* '6' bottom loop hole */}
          <circle cx="0" cy="20" r="25" fill="#b91c1c" opacity="0.08" />

          {/* The Golden World Cup Trophy in the center */}
          <g transform="translate(0, -60) scale(0.95)">
            {/* Base of the trophy */}
            <path d="M -15,70 H 15 V 73 C 15,78 10,82 0,82 C -10,82 -15,78 -15,73 Z" fill="#b59410" />
            <path d="M -18,65 H 18 V 70 H -18 Z" fill="#15803d" /> {/* Green band */}
            <path d="M -16,55 H 16 V 65 H -16 Z" fill="#b59410" />
            <path d="M -18,50 H 18 V 55 H -18 Z" fill="#15803d" /> {/* Green band */}
            
            {/* Stem */}
            <path d="M -10,15 C -10,40 -12,45 -14,50 H 14 C 12,45 10,40 10,15 Z" fill="#d9af14" />
            {/* Stylized figures holding the globe */}
            <path d="M -8,15 C -15,10 -20,-5 -15,-20 C -10,-35 0,-40 0,-40 C 0,-40 10,-35 15,-20 C 20,-5 15,10 8,15 Z" fill="#facc15" />
            
            {/* The Globe on top */}
            <circle cx="0" cy="-22" r="24" fill="#d9af14" />
            {/* Continents details on the globe */}
            <path d="M -15,-30 C -10,-35 -5,-35 -2,-30 C 0,-25 -5,-20 -10,-18 C -15,-16 -18,-20 -15,-30 Z" fill="#b59410" />
            <path d="M 5,-28 C 12,-32 18,-28 15,-20 C 12,-15 8,-12 5,-15 C 2,-18 2,-25 5,-28 Z" fill="#b59410" />
            <path d="M -10,-10 C -5,-12 2,-8 0,-2 C -2,4 -8,2 -10,-10 Z" fill="#b59410" />
            
            {/* Highlights */}
            <circle cx="-8" cy="-28" r="3" fill="#fff" opacity="0.3" />
            <path d="M -4,25 L -6,45 H 6 L 4,25 Z" fill="#fff" opacity="0.25" />
          </g>

          {/* FIFA Text Below Trophy */}
          <text
            x="0"
            y="55"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
            fontWeight="900"
            fontSize="18"
            fill="#000000"
            letterSpacing="1"
          >
            FIFA
          </text>
        </g>
      </svg>

      {/* Futuristic Dark Radial Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(9,9,11,0.2)_0%,rgba(9,9,11,0.75)_60%,rgba(9,9,11,0.95)_95%)]" />

      {/* Cyberpunk matrix grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px]" />
    </div>
  );
}
