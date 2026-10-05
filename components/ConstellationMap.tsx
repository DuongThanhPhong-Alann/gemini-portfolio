'use client';

import React from 'react';
import { CONSTELLATION_NODES } from '@/data/portfolioData';
import { cosmicAudio } from './SoundEffects';

interface ConstellationMapProps {
  activeSection: number;
  onNavigate: (index: number) => void;
}

// 2D SVG coordinates matching the Gemini Constellation anatomical twins
const SVG_NODES = [
  { id: 'hero', x: 100, y: 75, idx: 0, label: 'Song Tử' },
  { id: 'devdes', x: 60, y: 35, idx: 1, label: 'Castor' },
  { id: 'loopix', x: 140, y: 30, idx: 2, label: 'Pollux' },
  { id: 'sense', x: 165, y: 125, idx: 3, label: 'Alhena' },
  { id: 'skills', x: 100, y: 65, idx: 4, label: 'Wasat' },
  { id: 'education', x: 45, y: 70, idx: 5, label: 'Mebsuta' },
  { id: 'contact', x: 55, y: 135, idx: 6, label: 'Propus' },
];

const SVG_LINES = [
  [1, 5], // Castor -> Mebsuta
  [5, 6], // Mebsuta -> Propus
  [2, 4], // Pollux -> Wasat
  [4, 3], // Wasat -> Alhena
  [1, 2], // Castor <-> Pollux (Twins bridge)
  [5, 4], // Mebsuta <-> Wasat (Connecting arms)
];

export default function ConstellationMap({
  activeSection,
  onNavigate,
}: ConstellationMapProps) {
  const currentNode = CONSTELLATION_NODES[activeSection];

  return (
    <div className="fixed bottom-[78px] right-6 z-30 hidden md:block pointer-events-auto select-none">
      <div className="p-3 rounded-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-md shadow-2xl shadow-black/80 transition-all hover:border-white/20">
        <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-zinc-800">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-wider">
              Song Tử
            </span>
          </div>
          <span className="text-[10px] text-zinc-400 font-mono">
            0{activeSection + 1}/07
          </span>
        </div>

        {/* 2D Constellation Schematic */}
        <div className="relative w-44 h-32">
          <svg className="w-full h-full" viewBox="20 15 160 135">
            {/* Background constellation lines */}
            {SVG_LINES.map(([fromIdx, toIdx], i) => {
              const n1 = SVG_NODES.find((n) => n.idx === fromIdx);
              const n2 = SVG_NODES.find((n) => n.idx === toIdx);
              if (!n1 || !n2) return null;
              const isHighlighted =
                activeSection === fromIdx || activeSection === toIdx;
              return (
                <line
                  key={i}
                  x1={n1.x}
                  y1={n1.y}
                  x2={n2.x}
                  y2={n2.y}
                  stroke={isHighlighted ? '#ffffff' : '#52525b'}
                  strokeWidth={isHighlighted ? '1.8' : '1'}
                  strokeDasharray={isHighlighted ? 'none' : '2,2'}
                  opacity={isHighlighted ? 0.9 : 0.45}
                  className="transition-all duration-300"
                />
              );
            })}

            {/* Clickable Star Nodes */}
            {SVG_NODES.filter((n) => n.idx > 0).map((node) => {
              const isActive = activeSection === node.idx;
              return (
                <g
                  key={node.id}
                  className="cursor-pointer group/star"
                  onClick={() => {
                    cosmicAudio.playStarChime(420 + node.idx * 75);
                    onNavigate(node.idx);
                  }}
                >
                  {/* Radar ping when active */}
                  {isActive && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="10"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="1"
                      className="animate-ping opacity-70"
                    />
                  )}
                  {/* Star core */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isActive ? '4.5' : '3.5'}
                    fill={isActive ? '#ffffff' : '#a1a1aa'}
                    className="transition-all duration-200 group-hover/star:fill-white"
                  />
                  {/* Star label */}
                  <text
                    x={node.x}
                    y={node.y + (node.idx === 3 || node.idx === 6 ? 12 : -8)}
                    textAnchor="middle"
                    className={`text-[8px] font-mono select-none pointer-events-none transition-colors ${
                      isActive
                        ? 'fill-white font-semibold'
                        : 'fill-zinc-400 group-hover/star:fill-zinc-200'
                    }`}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Current Destination Name */}
        <div className="mt-1 pt-1.5 border-t border-zinc-800 flex items-center justify-between text-[10px]">
          <span className="text-zinc-500">Đang xem:</span>
          <span className="text-zinc-200 font-medium">
            {currentNode?.starName} ({currentNode?.subtitle})
          </span>
        </div>
      </div>
    </div>
  );
}
