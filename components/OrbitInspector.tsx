'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  FileText,
  X,
  Mail,
  Phone,
  Github,
  Linkedin,
  Sparkles,
  GraduationCap,
  Layers,
  Code2,
} from 'lucide-react';
import {
  PERSONAL_INFO,
  PROJECTS,
  SKILL_CATEGORIES,
  CONSTELLATION_NODES,
} from '@/data/portfolioData';
import { cosmicAudio } from './SoundEffects';

interface OrbitInspectorProps {
  activeSection: number;
  isOpen: boolean;
  onClose: () => void;
  onOpenProjectModal: (id: string) => void;
  onSelectSection: (index: number) => void;
}

export default function OrbitInspector({
  activeSection,
  isOpen,
  onClose,
  onOpenProjectModal,
  onSelectSection,
}: OrbitInspectorProps) {
  if (!isOpen) return null;

  const currentNode = CONSTELLATION_NODES[activeSection] || CONSTELLATION_NODES[0];

  // Match corresponding project if applicable
  const currentProject = PROJECTS.find((p) => {
    if (activeSection === 1 && p.id === 'devdes') return true;
    if (activeSection === 2 && p.id === 'loopix') return true;
    if (activeSection === 3 && p.id === 'sense') return true;
    return false;
  });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -25, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -25, scale: 0.95 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed top-20 left-4 sm:left-8 z-30 w-full max-w-sm sm:max-w-md pointer-events-auto select-none"
      >
        <div className="p-5 rounded-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/80 text-zinc-100">
          {/* Header Row */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/80">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                {currentNode.starName} · {currentNode.subtitle}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
              title="Đóng"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content based on active section */}
          {/* --- CASE 1: PROJECTS (DevDes, Loopix, Sense & Scene) --- */}
          {currentProject && (
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-white font-display">
                    {currentProject.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-medium">
                    {currentProject.subtitle}
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/5 text-zinc-300 border border-white/10 shrink-0">
                  Dự án 0{activeSection}
                </span>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed line-clamp-3">
                {currentProject.summary}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {currentProject.techStack.slice(0, 4).map((t) => (
                  <span
                    key={t.name}
                    className="px-2 py-0.5 rounded-md text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono"
                  >
                    {t.name}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => {
                    cosmicAudio.playStarChime(500);
                    onOpenProjectModal(currentProject.id);
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
                >
                  <FileText className="w-3.5 h-3.5 text-zinc-950" />
                  <span>Xem chi tiết dự án</span>
                </button>
                <a
                  href={currentProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Mở website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* --- CASE 2: HERO / GIỚI THIỆU (Section 0) --- */}
          {activeSection === 0 && (
            <div className="space-y-3">
              <div>
                <h3 className="text-xl font-bold text-white font-display">
                  {PERSONAL_INFO.name}
                </h3>
                <p className="text-xs text-zinc-400 font-medium">
                  {PERSONAL_INFO.title}
                </p>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {PERSONAL_INFO.bio}
              </p>
              <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-[11px] text-zinc-300">
                <span className="text-zinc-200 font-semibold">ĐH HUTECH (2022–2026)</span>
                <p className="text-zinc-400 mt-0.5">Full-stack & IT Automation</p>
              </div>
            </div>
          )}

          {/* --- CASE 3: SKILLS (Section 4 - Wasat) --- */}
          {activeSection === 4 && (
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white font-display">
                Công nghệ mình dùng
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {SKILL_CATEGORIES.map((cat) => (
                  <div key={cat.category} className="p-2 rounded-lg bg-zinc-900/50 border border-zinc-800/80">
                    <span className="text-[10px] font-mono text-zinc-400 font-semibold uppercase">
                      {cat.category}
                    </span>
                    <p className="text-[11px] text-zinc-300 truncate mt-1">
                      {cat.skills.map((s) => s.name).join(', ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- CASE 4: EDUCATION (Section 5 - Mebsuta) --- */}
          {activeSection === 5 && (
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  Học vấn và định hướng
                </h3>
                <p className="text-xs text-zinc-300 font-semibold mt-1">
                  {PERSONAL_INFO.school} ({PERSONAL_INFO.period})
                </p>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Mình học {PERSONAL_INFO.major} tại HUTECH, tập trung vào web full-stack và tự động hóa.
              </p>
            </div>
          )}

          {/* --- CASE 5: CONTACT (Section 6 - Propus) --- */}
          {activeSection === 6 && (
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white font-display">
                Liên hệ
              </h3>
              <div className="space-y-1.5 text-xs text-zinc-300">
                <div className="p-2 rounded-lg bg-zinc-900/50 border border-zinc-800 flex items-center justify-between">
                  <span className="text-zinc-400">Email:</span>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-zinc-200 font-medium hover:underline">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
                <div className="p-2 rounded-lg bg-zinc-900/50 border border-zinc-800 flex items-center justify-between">
                  <span className="text-zinc-400">SĐT:</span>
                  <span className="text-zinc-200 font-mono">{PERSONAL_INFO.phone}</span>
                </div>
              </div>
            </div>
          )}

          {/* Quick Star Switcher inside 360 mode */}
          <div className="mt-4 pt-3 border-t border-zinc-800/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                Chọn một ngôi sao để xem thông tin
              </span>
              <span className="text-[10px] font-mono text-zinc-400">
                0{activeSection + 1}/07
              </span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-1">
              {CONSTELLATION_NODES.map((node, idx) => (
                <button
                  key={node.id}
                  onClick={() => {
                    cosmicAudio.playStarChime(420 + idx * 60);
                    onSelectSection(idx);
                  }}
                  className={`py-1 px-1.5 rounded-lg text-[10px] font-mono text-center transition-all ${
                    activeSection === idx
                      ? 'bg-white text-zinc-950 font-bold shadow-sm'
                      : 'bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                  }`}
                  title={`${node.starName} - ${node.subtitle}`}
                >
                  {node.starName.slice(0, 4)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
