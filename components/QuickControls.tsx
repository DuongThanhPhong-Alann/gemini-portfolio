'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { CONSTELLATION_NODES, PROJECTS } from '@/data/portfolioData';
import { cosmicAudio } from './SoundEffects';

interface QuickControlsProps {
  activeSection: number;
  onNavigate: (index: number) => void;
  onOpenProjectModal: (projectId: string) => void;
}

export default function QuickControls({
  activeSection,
  onNavigate,
  onOpenProjectModal,
}: QuickControlsProps) {
  const currentNode = CONSTELLATION_NODES[activeSection];
  const canGoPrev = activeSection > 0;
  const canGoNext = activeSection < CONSTELLATION_NODES.length - 1;

  // Check if current section corresponds to a project
  const currentProject = PROJECTS.find((p) => {
    if (activeSection === 1 && p.id === 'devdes') return true;
    if (activeSection === 2 && p.id === 'loopix') return true;
    if (activeSection === 3 && p.id === 'sense') return true;
    return false;
  });

  const handlePrev = () => {
    if (canGoPrev) {
      cosmicAudio.playStarChime(380 + (activeSection - 1) * 70);
      onNavigate(activeSection - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      cosmicAudio.playStarChime(380 + (activeSection + 1) * 70);
      onNavigate(activeSection + 1);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-30 flex items-center gap-2.5 pointer-events-auto">
      {/* If this star is a project, show Quick Case Study Button */}
      {currentProject && (
        <button
          onClick={() => onOpenProjectModal(currentProject.id)}
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 hover:text-white text-xs font-semibold backdrop-blur-md shadow-lg transition-all"
        >
          <FileText className="w-3.5 h-3.5 text-zinc-400" />
          <span>Chi tiết {currentProject.title}</span>
        </button>
      )}

      {/* Flight Control Cluster */}
      <div className="flex items-center gap-1.5 bg-zinc-950/90 border border-white/10 rounded-2xl p-1.5 backdrop-blur-md shadow-2xl shadow-black/80">
        {/* Prev Button */}
        <button
          onClick={handlePrev}
          disabled={!canGoPrev}
          className={`p-2 rounded-xl border transition-all ${
            canGoPrev
              ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800'
              : 'bg-zinc-950 border-zinc-900 text-zinc-700 cursor-not-allowed'
          }`}
          aria-label="Sao trước"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Current Star Info */}
        <div className="px-2.5 py-0.5 text-center min-w-[100px]">
          <div className="text-[10px] text-zinc-500 font-mono">
            0{activeSection + 1} / 07
          </div>
          <div className="text-xs font-medium text-zinc-200 truncate max-w-[120px]">
            {currentNode?.starName}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={!canGoNext}
          className={`p-2 rounded-xl border transition-all ${
            canGoNext
              ? 'bg-white text-zinc-950 border-white hover:bg-zinc-100 font-bold shadow-sm'
              : 'bg-zinc-950 border-zinc-900 text-zinc-700 cursor-not-allowed'
          }`}
          aria-label="Sao kế tiếp"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
