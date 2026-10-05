'use client';

import React from 'react';
import { StarPin } from './Canvas3D';
import { cosmicAudio } from './SoundEffects';

interface StarPinsOverlayProps {
  pins: StarPin[];
  activeSection: number;
  isOrbitMode?: boolean;
  onNavigate: (index: number) => void;
  onOpenProjectModal?: (id: string) => void;
  onSelectSection?: (index: number) => void;
  onSelectConstellation?: (id: string) => void;
}

export default function StarPinsOverlay({
  pins,
  activeSection,
  isOrbitMode = false,
  onNavigate,
  onOpenProjectModal,
  onSelectSection,
  onSelectConstellation,
}: StarPinsOverlayProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {pins.map((pin) => {
        if (!pin.visible) return null;

        // Distant constellation pins should NEVER clutter the screen when reading projects (sections 1-6)
        if (pin.isConstellation && !isOrbitMode && activeSection !== 0) {
          return null;
        }

        const isActive = activeSection === pin.sectionIdx;
        const isHero = activeSection === 0;

        // Opacity styling: constellation pins are soft and ambient so Gemini is the undisputed hero
        const opacity = pin.isConstellation
          ? isOrbitMode ? 0.75 : 0.45
          : pin.isConstellationStar
          ? 0.95
          : isHero
          ? 0.95
          : isActive
          ? 1.0
          : 0.45;
        const isBottom = pin.placement === 'bottom';
        const transform = isBottom
          ? 'translate(-50%, 65%)'
          : 'translate(-50%, -150%)';

        return (
          <div
            key={pin.id}
            style={{
              left: `${pin.x}px`,
              top: `${pin.y}px`,
              opacity,
              transform,
            }}
            className="absolute transition-all duration-300 pointer-events-auto hover:!opacity-100 hover:z-30"
          >
            <button
              onClick={() => {
                cosmicAudio.playStarChime(420 + (pin.sectionIdx || 0) * 75);
                if (pin.isConstellation && onSelectConstellation) {
                  onSelectConstellation(pin.constellationId || pin.id);
                } else if (pin.isConstellationStar) {
                  // Do nothing or chime on star inspection
                } else if (isOrbitMode) {
                  onSelectSection?.(pin.sectionIdx);
                  if (pin.isProject && onOpenProjectModal) {
                    onOpenProjectModal(pin.id);
                  }
                } else {
                  onNavigate(pin.sectionIdx);
                }
              }}
              className={`group flex items-center gap-1.5 rounded-full border backdrop-blur-md shadow-lg transition-all hover:scale-105 active:scale-95 text-[11px] font-mono ${
                pin.isConstellation
                  ? 'px-2 py-0.5 bg-slate-950/70 hover:bg-slate-900/90 border-slate-700/60 hover:border-cyan-400/70 text-slate-300 hover:text-cyan-200 shadow-cyan-950/20'
                  : pin.isConstellationStar
                  ? 'px-2 py-0.5 bg-slate-950/90 border-blue-400/50 text-slate-200 hover:border-cyan-400'
                  : 'px-2.5 py-1 bg-slate-950/85 hover:bg-slate-900 border-slate-700/80 hover:border-cyan-400/80 text-slate-200'
              }`}
            >
              {/* Star Indicator Dot */}
              <span
                className={`rounded-full shrink-0 ${pin.isConstellation || pin.isConstellationStar ? 'w-1.5 h-1.5' : 'w-2 h-2'}`}
                style={{
                  backgroundColor: pin.color,
                  boxShadow: `0 0 6px ${pin.color}`,
                }}
              />

              {/* Star / Constellation Name */}
              <span
                className={`font-semibold transition-colors ${
                  pin.isConstellation
                    ? 'text-slate-300 group-hover:text-cyan-200 text-[10px] sm:text-[11px]'
                    : pin.isConstellationStar
                    ? 'text-slate-200 group-hover:text-cyan-200 text-[10px]'
                    : 'text-slate-200 group-hover:text-cyan-300'
                }`}
              >
                {pin.name}
              </span>

              {/* Project / Topic Name: ONLY for Gemini portfolio projects */}
              {pin.label && !pin.isConstellation && !pin.isConstellationStar && (
                <>
                  <span className="text-slate-600">·</span>
                  <span
                    className={`font-medium transition-colors ${
                      pin.isProject
                        ? 'text-cyan-300 group-hover:text-cyan-200'
                        : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    {pin.label}
                  </span>
                </>
              )}

              {/* Subtitle for Constellation star appears ONLY on hover to prevent overlapping text */}
              {pin.isConstellationStar && pin.label && (
                <span className="hidden group-hover:inline text-[9px] text-cyan-300/90 ml-0.5 transition-all">
                  · {pin.label}
                </span>
              )}

              {/* Constellation subtle explore arrow */}
              {pin.isConstellation && (
                <span className="text-[10px] text-cyan-400/70 group-hover:text-cyan-300 ml-0.5 font-sans">
                  ↗
                </span>
              )}

              {/* In 360 mode, show clickable project badge */}
              {isOrbitMode && pin.isProject && (
                <span className="ml-1 text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-mono">
                  Xem ↗
                </span>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}
