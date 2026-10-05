'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX, Github, Linkedin, Compass, Orbit } from 'lucide-react';
import { PERSONAL_INFO, CONSTELLATION_NODES } from '@/data/portfolioData';
import { cosmicAudio } from './SoundEffects';

interface NavigationProps {
  activeSection: number;
  isOrbitMode: boolean;
  activeConstellationId?: string | null;
  onNavigate: (index: number) => void;
  onToggleOrbitMode: () => void;
  onSelectConstellation?: (id: string | null) => void;
}

export default function Navigation({
  activeSection,
  isOrbitMode,
  activeConstellationId,
  onNavigate,
  onToggleOrbitMode,
  onSelectConstellation,
}: NavigationProps) {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleAudio = () => {
    const newState = cosmicAudio.toggle();
    setAudioEnabled(newState);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 pointer-events-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => onNavigate(0)}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-300 font-bold transition-all group-hover:border-cyan-500/50">
            <span>♊︎</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-wide text-white uppercase font-display group-hover:text-cyan-300 transition-colors">
                {PERSONAL_INFO.name}
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1"></span>
                Open for work
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Web & Full-stack Developer
            </p>
          </div>
        </button>

        {/* Center Quick Star Jump Tabs (Desktop) */}
        {activeConstellationId ? (
          <button
            onClick={() => {
              cosmicAudio.playStarChime(480);
              onSelectConstellation?.(null);
            }}
            className="hidden lg:flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-400 text-cyan-200 text-xs font-mono transition-all shadow-lg shadow-cyan-950/40"
          >
            <span className="text-cyan-400 font-bold">←</span>
            <span>Về lại chòm sao Song Tử</span>
          </button>
        ) : (
          <nav className="hidden lg:flex items-center gap-1 bg-slate-950/80 border border-slate-800 rounded-full px-2.5 py-1 backdrop-blur-md shadow-xl">
            {CONSTELLATION_NODES.map((node, idx) => {
              const isActive = activeSection === idx;
              return (
                <button
                  key={node.id}
                  onClick={() => {
                    cosmicAudio.playStarChime(400 + idx * 70);
                    onNavigate(idx);
                  }}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-slate-800 text-cyan-300 border border-slate-700 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? 'bg-cyan-400' : 'bg-slate-600'
                    }`}
                  />
                  {node.starName}
                </button>
              );
            })}
          </nav>
        )}

        {/* Right Actions: 360 Orbit, Audio, Socials & Mobile Menu Toggle */}
        <div className="flex items-center gap-2">
          {/* 360° Free Exploration Toggle Button */}
          <button
            onClick={() => {
              cosmicAudio.playStarChime(isOrbitMode ? 350 : 540);
              onToggleOrbitMode();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl border backdrop-blur-md transition-all text-xs font-medium ${
              isOrbitMode || activeConstellationId
                ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200 ring-2 ring-cyan-500/40 shadow-lg shadow-cyan-500/10'
                : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-slate-700'
            }`}
            title={activeConstellationId ? 'Ẩn / Mở bảng thông tin để ngắm 360°' : isOrbitMode ? 'Thoát chế độ ngắm 360°' : 'Bật chế độ ngắm chòm sao 360°'}
            aria-label="Toggle 360 Orbit View"
          >
            <Orbit className={`w-4 h-4 ${isOrbitMode || activeConstellationId ? 'animate-spin text-cyan-300' : 'text-slate-400'}`} style={{ animationDuration: '6s' }} />
            <span className="font-mono">
              {activeConstellationId ? 'Ngắm 360°' : isOrbitMode ? 'Thoát 360°' : 'Ngắm 360°'}
            </span>
          </button>

          {/* Audio Chime Synthesizer Toggle */}
          <button
            onClick={handleToggleAudio}
            className={`p-2 rounded-xl border backdrop-blur-md transition-all ${
              audioEnabled
                ? 'bg-cyan-500/20 border-cyan-400/80 text-cyan-300'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title={audioEnabled ? 'Tắt âm thanh tương tác' : 'Bật âm thanh tương tác'}
            aria-label="Toggle Cosmic Audio"
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Social Links */}
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white transition-all hidden sm:flex"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-cyan-300 transition-all hidden sm:flex"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          {/* Mobile Drawer Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-300"
            aria-label="Menu"
          >
            <Compass className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {menuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 backdrop-blur-xl px-4 py-3 space-y-2 shadow-2xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
            <p className="text-[11px] font-mono text-cyan-300 uppercase tracking-wider">
              Chòm sao Song Tử — Điều hướng
            </p>
            <button
              onClick={() => {
                onToggleOrbitMode();
                setMenuOpen(false);
              }}
              className="px-2.5 py-1 rounded-lg bg-cyan-500/20 border border-cyan-400/60 text-cyan-300 text-xs font-mono flex items-center gap-1.5"
            >
              <Orbit className="w-3.5 h-3.5" />
              <span>{isOrbitMode ? 'Thoát 360°' : 'Ngắm 360°'}</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {CONSTELLATION_NODES.map((node, idx) => (
              <button
                key={node.id}
                onClick={() => {
                  cosmicAudio.playStarChime(400 + idx * 70);
                  onNavigate(idx);
                  setMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-all ${
                  activeSection === idx
                    ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div>
                  <span className="font-semibold">{node.starName}</span>
                  <span className="text-slate-400 ml-2 text-[11px]">{node.subtitle}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">0{idx + 1}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
