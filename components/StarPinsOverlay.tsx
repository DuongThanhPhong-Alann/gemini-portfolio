'use client';

import React, { forwardRef, useImperativeHandle, useState } from 'react';
import type { StarPin } from './Canvas3D';
import { cosmicAudio } from './SoundEffects';

interface StarPinsOverlayProps {
  activeSection: number;
  isOrbitMode?: boolean;
  onNavigate: (index: number) => void;
  onOpenProjectModal?: (id: string) => void;
  onSelectSection?: (index: number) => void;
  onSelectConstellation?: (id: string) => void;
}

export interface StarPinsOverlayHandle {
  updatePins: (pins: StarPin[]) => void;
}

const StarPinsOverlay = forwardRef<StarPinsOverlayHandle, StarPinsOverlayProps>(function StarPinsOverlay({
  activeSection,
  isOrbitMode = false,
  onNavigate,
  onOpenProjectModal,
  onSelectSection,
  onSelectConstellation,
}: StarPinsOverlayProps, ref) {
  const [pins, setPins] = useState<StarPin[]>([]);
  useImperativeHandle(ref, () => ({ updatePins: setPins }), []);
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
              transform: `translate3d(${pin.x}px, ${pin.y}px, 0) ${transform}`,
              opacity,
            }}
            className="absolute top-0 left-0 transition-opacity duration-150 pointer-events-auto hover:!opacity-100 hover:z-30 will-change-transform"
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
                  ? 'px-2 py-0.5 bg-zinc-950/80 hover:bg-zinc-900 border-white/10 hover:border-white/25 text-zinc-300 hover:text-white shadow-black/40'
                  : pin.isConstellationStar
                  ? 'px-2 py-0.5 bg-zinc-950/90 border-white/15 hover:border-white/30 text-zinc-200 hover:text-white'
                  : 'px-2.5 py-1 bg-zinc-950/85 hover:bg-zinc-900 border-white/10 hover:border-white/25 text-zinc-200'
              }`}
            >
              {/* Star Indicator Dot */}
              <span
                className={`rounded-full shrink-0 ${pin.isConstellation || pin.isConstellationStar ? 'w-1.5 h-1.5' : 'w-2 h-2'}`}
                style={{
                  backgroundColor: pin.color,
                  boxShadow: `0 0 5px ${pin.color}70`,
                }}
              />

              {/* Star / Constellation Name */}
              <span
                className={`font-semibold transition-colors ${
                  pin.isConstellation
                    ? 'text-zinc-300 group-hover:text-white text-[10px] sm:text-[11px]'
                    : pin.isConstellationStar
                    ? 'text-zinc-200 group-hover:text-white text-[10px]'
                    : 'text-zinc-200 group-hover:text-white'
                }`}
              >
                {pin.name}
              </span>

              {/* Project / Topic Name: ONLY for Gemini portfolio projects */}
              {pin.label && !pin.isConstellation && !pin.isConstellationStar && (
                <>
                  <span className="text-zinc-600">·</span>
                  <span
                    className={`font-medium transition-colors ${
                      pin.isProject
                        ? 'text-zinc-300 group-hover:text-white'
                        : 'text-zinc-400 group-hover:text-zinc-300'
                    }`}
                  >
                    {pin.label}
                  </span>
                </>
              )}

              {/* Subtitle for Constellation star appears ONLY on hover to prevent overlapping text */}
              {pin.isConstellationStar && pin.label && (
                <span className="hidden group-hover:inline text-[9px] text-zinc-400 ml-0.5 transition-all">
                  · {pin.label}
                </span>
              )}

              {/* Constellation subtle explore arrow */}
              {pin.isConstellation && (
                <span className="text-[10px] text-zinc-500 group-hover:text-zinc-300 ml-0.5 font-sans">
                  ↗
                </span>
              )}

              {/* In 360 mode, show clickable project badge */}
              {isOrbitMode && pin.isProject && (
                <span className="ml-1 text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-zinc-200 border border-white/15 font-mono">
                  Xem ↗
                </span>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
});

export default StarPinsOverlay;
