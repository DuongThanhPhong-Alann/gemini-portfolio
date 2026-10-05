'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowLeft,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Compass,
  Orbit,
} from 'lucide-react';
import {
  CelestialConstellation,
  CelestialStar,
} from '@/data/celestialConstellations';
import { cosmicAudio } from './SoundEffects';

interface ConstellationDetailCardProps {
  constellation: CelestialConstellation | null;
  isOpen?: boolean;
  onToggle360?: () => void;
  onReturnToGemini: () => void;
  onSelectConstellation?: (id: string) => void;
  allConstellations: CelestialConstellation[];
}

export default function ConstellationDetailCard({
  constellation,
  isOpen = true,
  onToggle360,
  onReturnToGemini,
  onSelectConstellation,
  allConstellations,
}: ConstellationDetailCardProps) {
  if (!constellation || !isOpen) return null;

  const currentIndex = allConstellations.findIndex((c) => c.id === constellation.id);
  const prevConstellation =
    currentIndex > 0
      ? allConstellations[currentIndex - 1]
      : allConstellations[allConstellations.length - 1];
  const nextConstellation =
    currentIndex < allConstellations.length - 1
      ? allConstellations[currentIndex + 1]
      : allConstellations[0];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="fixed top-20 right-4 sm:right-8 z-30 w-full max-w-sm sm:max-w-md pointer-events-auto select-none"
      >
        <div className="p-5 rounded-2xl bg-slate-950/92 border border-cyan-500/40 backdrop-blur-2xl shadow-2xl shadow-cyan-950/60 text-slate-100">
          {/* Header Row */}
          <div className="flex items-start justify-between pb-3 mb-3 border-b border-slate-800/80 gap-2">
            <div className="min-w-0 pr-1">
              <div className="flex items-baseline flex-wrap gap-x-2 gap-y-0.5 mb-1">
                <span className="text-lg leading-none">{constellation.symbol}</span>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">
                  {constellation.name}
                </h3>
                <span className="text-xs font-mono text-cyan-300/80 tracking-normal whitespace-nowrap">
                  ({constellation.latinName})
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400">
                <Compass className="w-3 h-3 text-cyan-400 shrink-0" />
                <span>{constellation.regionLabel}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => {
                  cosmicAudio.playStarChime(540);
                  onToggle360?.();
                }}
                className="px-2.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-200 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all shadow-glow-cyan"
                title="Ẩn thông tin để xem 360°"
              >
                <Orbit className="w-3.5 h-3.5 animate-spin text-cyan-300" style={{ animationDuration: '6s' }} />
                <span>Xem 360°</span>
              </button>

              <button
                onClick={onReturnToGemini}
                className="p-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-400 hover:text-white transition-all shrink-0"
                title="Đóng và về Song Tử"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Description & Lore */}
          <div className="space-y-2.5 mb-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              {constellation.description}
            </p>
            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 leading-relaxed italic">
              <span className="text-cyan-300 font-semibold not-italic block mb-0.5">
                ✦ Truyền thuyết:
              </span>
              {constellation.mythology}
            </div>
          </div>

          {/* Major Stars Section */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Các sao nổi bật ({constellation.stars.length})</span>
              </span>
              <span className="text-[10px] text-slate-500">Mô hình 3D</span>
            </div>

            <div className="max-h-48 overflow-y-auto pr-1 space-y-1.5 custom-scrollbar">
              {constellation.stars.map((star: CelestialStar) => (
                <div
                  key={star.id}
                  className="p-2 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex items-start gap-2.5 group"
                >
                  <span
                    className="w-3 h-3 rounded-full shrink-0 mt-0.5"
                    style={{
                      backgroundColor: star.color,
                      boxShadow: `0 0 10px ${star.color}`,
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-200 truncate">
                        {star.name}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 shrink-0">
                        {star.scientificName}
                      </span>
                    </div>
                    <p className="text-[11px] text-cyan-300/80 font-medium">
                      {star.title}
                    </p>
                    <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                      {star.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Controls: Tour Next/Prev Constellation & Return */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
            <button
              onClick={() => {
                cosmicAudio.playStarChime(420);
                onSelectConstellation?.(prevConstellation.id);
              }}
              className="py-1.5 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white text-[11px] font-mono flex items-center gap-1 transition-all"
              title={`Khám phá ${prevConstellation.name}`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{prevConstellation.name}</span>
            </button>

            <button
              onClick={onReturnToGemini}
              className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-glow-cyan"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-950" />
              <span>Về Song Tử</span>
            </button>

            <button
              onClick={() => {
                cosmicAudio.playStarChime(480);
                onSelectConstellation?.(nextConstellation.id);
              }}
              className="py-1.5 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white text-[11px] font-mono flex items-center gap-1 transition-all"
              title={`Khám phá ${nextConstellation.name}`}
            >
              <span className="hidden sm:inline">{nextConstellation.name}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
