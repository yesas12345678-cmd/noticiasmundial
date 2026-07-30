'use client';

import React from 'react';

export default function WorldCupBackground() {
  // We draw an abstract premium cybernetic network grid representational of a global information flow
  const nodes = [
    { x: 100, y: 150, r: 3 },
    { x: 250, y: 100, r: 2 },
    { x: 400, y: 220, r: 4 },
    { x: 550, y: 80, r: 3 },
    { x: 700, y: 180, r: 2 },
    { x: 880, y: 120, r: 3 },
    { x: 150, y: 450, r: 2.5 },
    { x: 320, y: 380, r: 3 },
    { x: 500, y: 500, r: 2 },
    { x: 680, y: 420, r: 4 },
    { x: 820, y: 480, r: 2.5 },
    { x: 920, y: 350, r: 2 },
  ];

  const connections = [
    { from: 0, to: 1 },
    { from: 0, to: 6 },
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 3 },
    { from: 2, to: 7 },
    { from: 3, to: 4 },
    { from: 3, to: 5 },
    { from: 4, to: 5 },
    { from: 4, to: 9 },
    { from: 5, to: 11 },
    { from: 6, to: 7 },
    { from: 7, to: 8 },
    { from: 8, to: 9 },
    { from: 9, to: 10 },
    { from: 10, to: 11 },
    { from: 2, to: 9 },
    { from: 7, to: 9 },
  ];

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#09090b]">
      {/* Background cyber grid & network lines */}
      <svg
        className="w-full h-full opacity-35 filter saturate-[1.2]"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Connection lines */}
        {connections.map((conn, idx) => {
          const fromNode = nodes[conn.from];
          const toNode = nodes[conn.to];
          return (
            <line
              key={`line-${idx}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="url(#lineGradient)"
              strokeWidth="0.8"
              opacity="0.25"
            />
          );
        })}

        {/* Node points */}
        {nodes.map((node, idx) => (
          <g key={`node-${idx}`}>
            <circle
              cx={node.x}
              cy={node.y}
              r={node.r + 3}
              fill="rgba(147, 51, 234, 0.05)"
            />
            <circle
              cx={node.x}
              cy={node.y}
              r={node.r}
              fill="url(#nodeGradient)"
            />
          </g>
        ))}

        {/* Global network circles representing latitude/longitude lines */}
        <circle cx="500" cy="300" r="280" fill="none" stroke="rgba(147, 51, 234, 0.02)" strokeWidth="1" />
        <circle cx="500" cy="300" r="420" fill="none" stroke="rgba(59, 130, 246, 0.02)" strokeWidth="1" />
        <ellipse cx="500" cy="300" rx="450" ry="180" fill="none" stroke="rgba(147, 51, 234, 0.015)" strokeWidth="1" />
        <ellipse cx="500" cy="300" rx="180" ry="280" fill="none" stroke="rgba(59, 130, 246, 0.015)" strokeWidth="1" />

        {/* Definitions for Gradients */}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9333ea" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
          </linearGradient>
          <radialGradient id="nodeGradient">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="70%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#6366f1" />
          </radialGradient>
        </defs>
      </svg>

      {/* Glowing atmospheric gradient mesh layers */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] rounded-full bg-blue-500/5 blur-[130px] pointer-events-none" />
      <div className="absolute top-[30%] right-[10%] w-[35%] h-[35%] rounded-full bg-emerald-500/3 blur-[110px] pointer-events-none" />

      {/* Dark radial overlay to ensure content readability */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(9,9,11,0.15)_0%,rgba(9,9,11,0.75)_60%,rgba(9,9,11,0.96)_95%)]" />

      {/* Fine-mesh cyber grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:32px_32px]" />
    </div>
  );
}
