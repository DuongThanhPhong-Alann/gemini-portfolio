'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Code2,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import Image from 'next/image';
import { PROJECTS } from '@/data/portfolioData';

interface ProjectModalProps {
  projectId: string | null;
  onClose: () => void;
  onSelectProject: (id: string) => void;
}

export default function ProjectModal({
  projectId,
  onClose,
  onSelectProject,
}: ProjectModalProps) {
  const project = PROJECTS.find((p) => p.id === projectId);

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (projectId) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [projectId, onClose]);

  if (!project) return null;

  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto pointer-events-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-4xl max-h-[90vh] my-auto bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
        >
          {/* Header Bar */}
          <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: project.starColor }}
              />
              <div>
                <div className="text-[11px] font-mono text-cyan-300">
                  {project.starName} · {project.starRole}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white font-display">
                  {project.title} — {project.subtitle}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-all"
              >
                <span>Mở website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
            {/* Project Hero Banner / Image */}
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {project.metricsOrHighlights.map((m, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-[10px] text-slate-400 font-mono">{m.label}</div>
                  <div className="text-xs sm:text-sm font-semibold text-cyan-300 truncate">{m.value}</div>
                </div>
              ))}
            </div>

            {/* Summary & Purpose */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
                <h4 className="text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-2">
                  Giới thiệu
                </h4>
                <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">{project.summary}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
                <h4 className="text-xs font-semibold text-purple-300 uppercase tracking-wider mb-2">
                  Mục tiêu
                </h4>
                <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">{project.purpose}</p>
              </div>
            </div>

            {/* Personal Role */}
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-1">
                Phần mình phụ trách
              </h4>
              <p className="text-slate-200 text-xs sm:text-sm">{project.role}</p>
            </div>

            {/* Technology Stack Matrix */}
            <div>
              <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                Công nghệ trong dự án
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.techStack.map((tech, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between"
                  >
                    <div className="font-semibold text-cyan-200 text-xs mb-0.5">
                      {tech.name}
                    </div>
                    <div className="text-[11px] text-slate-400 leading-normal">
                      {tech.role}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features Detailed */}
            <div>
              <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                Tính năng chính
              </h4>
              <div className="space-y-2">
                {project.keyFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/80"
                  >
                    <h5 className="font-semibold text-cyan-300 text-xs mb-1">
                      {feat.title}
                    </h5>
                    <p className="text-slate-300 text-xs leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Highlights */}
            <div>
              <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2.5">
                Một vài chi tiết kỹ thuật
              </h4>
              <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-2">
                {project.technicalHighlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer with Project Switcher */}
          <div className="p-3.5 sm:p-4 border-t border-slate-800 bg-slate-900/80 backdrop-blur-md flex items-center justify-between">
            <button
              onClick={() => onSelectProject(prevProject.id)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{prevProject.title}</span>
            </button>

            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-glow-cyan"
            >
              <span>Mở website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => onSelectProject(nextProject.id)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <span>{nextProject.title}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
