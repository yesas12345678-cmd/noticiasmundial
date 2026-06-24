'use client';

import React from 'react';

export default function WorldCupBackground() {
  // 16 bands to cover the 1000px width (centered at 500)
  const bandsCount = 16;
  const bandWidth = 32;

  const colors = [
    '#9e81f6', // Light Purple
    '#1a56db', // Royal Blue
    '#e10615', // Orange-Red
    '#f97316', // Orange
    '#84cc16', // Lime-Green
    '#a3e635', // Neon Lime
    '#22d3ee', // Turquoise/Cyan
    '#115e59', // Dark Teal
  ];

  const path2 = "M -60,-130 C -60,-160 -40,-180 -15,-180 H 15 C 40,-180 60,-160 60,-130 V -100 C 60,-75 35,-60 -10,-60 H -60 V -20 H 60 V -60 H 0 C 20,-60 30,-70 30,-80 V -130 C 30,-140 23,-148 15,-148 H -15 C -23,-148 -30,-140 -30,-130 V -120 H -60 Z";

  const path6 = "M -60,-10 H -30 V 50 C -30,40 -20,30 -10,30 H 10 C 20,30 30,40 30,50 V 90 C 30,100 20,110 10,110 H -10 C -20,110 -30,100 -30,90 V -10 H -60 V 105 C -60,130 -40,150 -15,150 H 15 C 40,150 60,130 60,105 V 50 C 60,25 40,5 15,5 H -15 C -40,5 -60,25 -60,50 Z";

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#09090b]">
      {/* Dynamic World Cup 2026 Graphic Pattern */}
      <svg
        className="w-full h-full object-cover opacity-60 filter saturate-[1.2] contrast-[1.1]"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Draw bands from outside to inside (so they overlay correctly) */}
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

              {/* Right Side */}
              {/* Top-Right L-Shape */}
              <path
                d={`M 500,300 H ${500 + offset} V 0`}
                fill="none"
                stroke={color}
                strokeWidth={bandWidth + 1}
              />
              {/* Bottom-Right Curve (mirrors bottom-left, curving down and right) */}
              <path
                d={`M 500,300 Q ${500 + offset},300 ${500 + offset},600`}
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
          {/* Layer 4: Outermost - Purple (#9e81f6) */}
          <g transform="scale(1.8)">
            <path fillRule="evenodd" d={path2} fill="#9e81f6" />
            <path fillRule="evenodd" d={path6} fill="#9e81f6" />
          </g>

          {/* Layer 3: Crimson/Rose (#c21525) */}
          <g transform="scale(1.58)">
            <path fillRule="evenodd" d={path2} fill="#c21525" />
            <path fillRule="evenodd" d={path6} fill="#c21525" />
          </g>

          {/* Layer 2: Bright Red (#e10615) */}
          <g transform="scale(1.38)">
            <path fillRule="evenodd" d={path2} fill="#e10615" />
            <path fillRule="evenodd" d={path6} fill="#e10615" />
          </g>

          {/* Layer 1: Dark Red-Brown (#58050a) */}
          <g transform="scale(1.18)">
            <path fillRule="evenodd" d={path2} fill="#58050a" />
            <path fillRule="evenodd" d={path6} fill="#58050a" />
          </g>

          {/* Layer 0: Innermost - White (#ffffff) */}
          <g transform="scale(1.0)">
            <path fillRule="evenodd" d={path2} fill="#ffffff" />
            <path fillRule="evenodd" d={path6} fill="#ffffff" />
          </g>
        </g>
      </svg>

      {/* Futuristic Dark Radial Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(9,9,11,0.2)_0%,rgba(9,9,11,0.75)_60%,rgba(9,9,11,0.95)_95%)]" />

      {/* Cyberpunk matrix grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px]" />
    </div>
  );
}
