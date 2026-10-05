'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ChevronRight, Compass, ArrowLeft } from 'lucide-react';
import { CELESTIAL_CONSTELLATIONS, CelestialConstellation } from '@/data/celestialConstellations';
import { cosmicAudio } from './SoundEffects';

interface ConstellationSelectorProps {
  activeConstellationId: string | null;
  onSelectConstellation: (id: string | null) => void;
  isOrbitMode: boolean;
}

export default function ConstellationSelector({
  activeConstellationId,
  onSelectConstellation,
  isOrbitMode,
}: ConstellationSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filterRegion, setFilterRegion] = useState<'all' | 'zenith-nadir' | 'zodiac'>('all');

  const filtered = CELESTIAL_CONSTELLATIONS.filter((c) => {
    if (filterRegion === 'zenith-nadir') return c.region === 'zenith' || c.region === 'nadir';
    if (filterRegion === 'zodiac') return c.region === 'zodiac';
    return true;
  });

  const handleSelect = (id: string | null) => {
    cosmicAudio.playStarChime(560);
    onSelectConstellation(id);
    setIsOpen(false);
  };

  const activeConstellation = CELESTIAL_CONSTELLATIONS.find((c) => c.id === activeConstellationId);

  return (
    <>
      {/* 1. Quick Pill Bar (Only in 360° Orbit Mode or when visiting constellations) */}
      {isOrbitMode && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-30 pointer-events-auto max-w-[92vw] sm:max-w-2xl overflow-x-auto no-scrollbar py-1 px-2 flex items-center gap-1.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 backdrop-blur-xl shadow-2xl shadow-cyan-950/20">
          {/* Return to Gemini Pill */}
          <button
            onClick={() => handleSelect(null)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono shrink-0 transition-all flex items-center gap-1.5 border ${
              !activeConstellationId
                ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200 font-bold shadow-sm shadow-cyan-500/20'
                : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
            }`}
          >
            <span>♊</span>
            <span>Song Tử</span>
          </button>

          <div className="w-[1px] h-4 bg-slate-800 shrink-0" />

          {/* 4 Special Constellations: Lạp Hộ, Xà Phu, Tiên Vương, Tiên Hậu */}
          {CELESTIAL_CONSTELLATIONS.slice(0, 4).map((c) => {
            const isSelected = activeConstellationId === c.id;
            return (
              <button
                key={c.id}
                onClick={() => handleSelect(c.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono shrink-0 transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200 font-bold ring-1 ring-cyan-400/50 shadow-sm'
                    : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:text-cyan-200 hover:border-cyan-500/40'
                }`}
              >
                <span>{c.symbol}</span>
                <span>{c.name}</span>
                <span className="text-[10px] text-cyan-400/70">
                  {c.region === 'zenith' ? '↑' : '↓'}
                </span>
              </button>
            );
          })}

          <div className="w-[1px] h-4 bg-slate-800 shrink-0" />

          {/* Open Full 15 Constellation List button */}
          <button
            onClick={() => setIsOpen(true)}
            className="px-2.5 py-1.5 rounded-xl text-xs font-mono shrink-0 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Cả 15 chòm sao ▾</span>
          </button>
        </div>
      )}

      {/* 2. Floating Toggle Button (Top-left area below header for instant access) */}
      <div className="fixed top-20 left-4 sm:left-6 z-30 pointer-events-auto">
        <button
          onClick={() => setIsOpen(true)}
          className={`flex items-center gap-2 px-3 py-2 rounded-2xl border backdrop-blur-xl shadow-xl transition-all text-xs font-mono ${
            activeConstellationId
              ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-cyan-950/40'
              : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 shadow-slate-950/40'
          }`}
          title="Mở danh sách 15 chòm sao"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="font-semibold">
            {activeConstellation ? `${activeConstellation.symbol} ${activeConstellation.name}` : 'Xem 15 chòm sao'}
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/80 text-cyan-400 border border-slate-700">
            Mở bản đồ
          </span>
        </button>
      </div>

      {/* 3. Full Constellation Explorer Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl bg-slate-950/95 border border-cyan-500/40 shadow-2xl shadow-cyan-950/60 overflow-hidden text-slate-100"
            >
              {/* Modal Header */}
              <div className="p-5 pb-3 border-b border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-xl">
                    🔭
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-display">
                      Khám phá chòm sao
                    </h3>
                    <p className="text-xs text-slate-400">
                      Chọn một chòm sao trên bản đồ để xem gần hơn.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Central Gemini Return Button */}
              <div className="px-5 pt-3">
                <button
                  onClick={() => handleSelect(null)}
                  className={`w-full p-3 rounded-2xl border transition-all flex items-center justify-between group ${
                    !activeConstellationId
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                      : 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/50 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">♊︎</span>
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white group-hover:text-cyan-300">
                          Song Tử (Gemini)
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-mono">
                          Portfolio của mình
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Các dự án web và những công nghệ mình sử dụng
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-cyan-400 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* Region Filter Tabs */}
              <div className="px-5 pt-3 flex items-center gap-2">
                <button
                  onClick={() => setFilterRegion('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all border ${
                    filterRegion === 'all'
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Tất cả {CELESTIAL_CONSTELLATIONS.length}
                </button>
                <button
                  onClick={() => setFilterRegion('zenith-nadir')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all border ${
                    filterRegion === 'zenith-nadir'
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Ngoài hoàng đạo (4)
                </button>
                <button
                  onClick={() => setFilterRegion('zodiac')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all border ${
                    filterRegion === 'zodiac'
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  11 cung Hoàng Đạo
                </button>
              </div>

              {/* Constellation Grid List */}
              <div className="p-5 overflow-y-auto space-y-2.5 max-h-[50vh]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {filtered.map((c) => {
                    const isSelected = activeConstellationId === c.id;
                    const regionTag =
                      c.region === 'zenith'
                        ? 'Phía trên Song Tử'
                        : c.region === 'nadir'
                        ? 'Phía dưới Song Tử'
                        : 'Hoàng Đạo';

                    return (
                      <button
                        key={c.id}
                        onClick={() => handleSelect(c.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all flex items-start justify-between group ${
                          isSelected
                            ? 'bg-cyan-950/70 border-cyan-400 text-cyan-100 ring-2 ring-cyan-500/30'
                            : 'bg-slate-900/50 hover:bg-slate-900 border-slate-800/80 hover:border-cyan-500/40 text-slate-300'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl mt-0.5">{c.symbol}</span>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                                {c.name}
                              </span>
                              <span className="text-xs text-slate-400">({c.latinName})</span>
                            </div>
                            <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono mb-1.5">
                              {regionTag}
                            </span>
                            <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                              {c.description}
                            </p>
                          </div>
                        </div>

                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 shrink-0 mt-1 transition-transform group-hover:translate-x-1" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-3 border-t border-slate-800/80 bg-slate-950 text-center">
                <span className="text-xs font-mono text-slate-400">
                  Mẹo: chọn trực tiếp một ngôi sao trên màn hình để đến chòm sao đó.
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
