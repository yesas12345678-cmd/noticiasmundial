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
          {/* Numeral '2' on top (Y = -180 to -20) */}
          <path
            fillRule="evenodd"
            d="
              M -60,-130
              C -60,-160 -40,-180 -15,-180
              H 15
              C 40,-180 60,-160 60,-130
              V -100
              C 60,-75 35,-60 -10,-60
              H -60
              V -20
              H 60
              V -60
              H 0
              C 20,-60 30,-70 30,-80
              V -130
              C 30,-140 23,-148 15,-148
              H -15
              C -23,-148 -30,-140 -30,-130
              V -120
              H -60
              Z
            "
            fill="#ffffff"
          />

          {/* Numeral '6' on bottom (Y = -10 to 150) */}
          <path
            fillRule="evenodd"
            d="
              M -60,-10
              H -30
              V 50
              C -30,40 -20,30 -10,30
              H 10
              C 20,30 30,40 30,50
              V 90
              C 30,100 20,110 10,110
              H -10
              C -20,110 -30,100 -30,90
              V -10
              H -60
              V 105
              C -60,130 -40,150 -15,150
              H 15
              C 40,150 60,130 60,105
              V 50
              C 60,25 40,5 15,5
              H -15
              C -40,5 -60,25 -60,50
              Z
            "
            fill="#ffffff"
          />

          {/* Gradient definition for the silhouette */}
          <defs>
            <linearGradient id="goldSilhouette" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
          </defs>

          {/* Silhouette backing to create a clean dark outline against the white logo */}
          <g transform="translate(0, -32) scale(1.8)" fill="#09090b" stroke="#09090b" strokeWidth="3" strokeLinejoin="round">
            <path d="M -15,70 H 15 V 73 C 15,78 10,82 0,82 C -10,82 -15,78 -15,73 Z" />
            <path d="M -18,65 H 18 V 70 H -18 Z" />
            <path d="M -16,55 H 16 V 65 H -16 Z" />
            <path d="M -18,50 H 18 V 55 H -18 Z" />
            <path d="M -10,15 C -10,40 -12,45 -14,50 H 14 C 12,45 10,40 10,15 Z" />
            <path d="M -8,15 C -15,10 -20,-5 -15,-20 C -10,-35 0,-40 0,-40 C 0,-40 10,-35 15,-20 C 20,-5 15,10 8,15 Z" />
            <circle cx="0" cy="-22" r="24" />
          </g>

          {/* The Golden World Cup Trophy silhouette, scaled and translated to overlay perfectly */}
          <g transform="translate(0, -32) scale(1.8)" fill="url(#goldSilhouette)">
            <path d="M -15,70 H 15 V 73 C 15,78 10,82 0,82 C -10,82 -15,78 -15,73 Z" />
            <path d="M -18,65 H 18 V 70 H -18 Z" />
            <path d="M -16,55 H 16 V 65 H -16 Z" />
            <path d="M -18,50 H 18 V 55 H -18 Z" />
            <path d="M -10,15 C -10,40 -12,45 -14,50 H 14 C 12,45 10,40 10,15 Z" />
            <path d="M -8,15 C -15,10 -20,-5 -15,-20 C -10,-35 0,-40 0,-40 C 0,-40 10,-35 15,-20 C 20,-5 15,10 8,15 Z" />
            <circle cx="0" cy="-22" r="24" />
          </g>

          {/* FIFA Text Below Trophy (inside the white numeral 6 base) */}
          <text
            x="0"
            y="138"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
            fontWeight="900"
            fontSize="14"
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
