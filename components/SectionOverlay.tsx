'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  ArrowRight,
  Code2,
  Cpu,
  GraduationCap,
  Mail,
  Phone,
  Github,
  Linkedin,
  Copy,
  Check,
  Globe,
  Layers,
  FileText,
  MapPin,
} from 'lucide-react';
import Image from 'next/image';
import {
  PERSONAL_INFO,
  PROJECTS,
  SKILL_CATEGORIES,
} from '@/data/portfolioData';

interface SectionOverlayProps {
  activeSection: number;
  isOrbitMode?: boolean;
  onNavigate: (index: number) => void;
  onOpenProjectModal: (projectId: string) => void;
}

export default function SectionOverlay({
  activeSection,
  isOrbitMode = false,
  onNavigate,
  onOpenProjectModal,
}: SectionOverlayProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  if (isOrbitMode) return null;

  return (
    <div className="relative z-10 w-full min-h-screen pointer-events-none flex flex-col justify-center py-20">
      <AnimatePresence mode="wait">
        {/* ================= SECTION 0: HERO (LEFT-ALIGNED) ================= */}
        {activeSection === 0 && (
          <motion.div
            key="sec-0"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="w-full max-w-xl ml-4 sm:ml-12 lg:ml-20 px-4 pointer-events-auto"
          >
            <div className="p-6 sm:p-9 rounded-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl shadow-black/80 select-none">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono mb-4">
                <span>♊︎ Song Tử · Portfolio cá nhân</span>
              </div>

              {/* Personal Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display mb-2">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-sm sm:text-base font-medium text-zinc-400 mb-5">
                {PERSONAL_INFO.title}
              </p>

              {/* Bio */}
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                {PERSONAL_INFO.bio}
              </p>

              {/* Key Info Points */}
              <div className="grid grid-cols-2 gap-3 mb-6 text-xs text-zinc-300">
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <div className="text-[11px] text-zinc-500">Trường</div>
                  <div className="font-semibold text-zinc-200">ĐH HUTECH (2022–2026)</div>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <div className="text-[11px] text-zinc-500">Dự án tiêu biểu</div>
                  <div className="font-semibold text-zinc-200">DevDes · Loopix · SenseScene</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate(1)}
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-xs flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-md"
                >
                  <span>Xem dự án</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onNavigate(6)}
                  className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 text-xs font-semibold transition-all"
                >
                  Liên hệ
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= SECTION 1: DEVDES (CASTOR) ================= */}
        {activeSection === 1 && (
          <motion.div
            key="sec-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="w-full max-w-xl ml-4 sm:ml-12 lg:ml-20 px-4 pointer-events-auto"
          >
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl shadow-black/80 select-none">
              {/* Star Badge */}
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono bg-white/5 text-zinc-300 border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-pulse"></span>
                  Castor · Dự án 01
                </span>
                <span className="text-zinc-500 font-mono">Website & tư vấn trực tuyến</span>
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mb-1">
                DevDes
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-medium mb-3">
                Dịch vụ web, thư viện giao diện và chat tư vấn
              </p>

              {/* Thumbnail image */}
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 mb-4 pointer-events-none">
                <Image
                  src={PROJECTS[0].image}
                  alt="DevDes"
                  fill
                  className="object-cover pointer-events-none"
                />
              </div>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                {PROJECTS[0].summary}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {['Next.js 16', 'React 19', 'TypeScript', 'MongoDB', 'Chat trực tuyến', 'Xem trên nhiều thiết bị'].map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-md text-[11px] bg-zinc-900/80 border border-zinc-800 text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenProjectModal('devdes')}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Xem chi tiết dự án</span>
                </button>
                <a
                  href="https://www.devdes.click/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <span>Mở website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= SECTION 2: LOOPIX (POLLUX) ================= */}
        {activeSection === 2 && (
          <motion.div
            key="sec-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="w-full max-w-xl ml-4 sm:ml-12 lg:ml-20 px-4 pointer-events-auto"
          >
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl shadow-black/80 select-none">
              {/* Star Badge */}
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono bg-white/5 text-zinc-300 border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-pulse"></span>
                  Pollux · Dự án 02
                </span>
                <span className="text-zinc-500 font-mono">Tour 360°</span>
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mb-1">
                Loopix Studio
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-medium mb-3">
                Tour 360° cho khách sạn và không gian
              </p>

              {/* Thumbnail image */}
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 mb-4 pointer-events-none">
                <Image
                  src={PROJECTS[1].image}
                  alt="Loopix Studio"
                  fill
                  className="object-cover pointer-events-none"
                />
              </div>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                {PROJECTS[1].summary}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {['Next.js 16', 'React 19', 'Virtual Tour 360°', 'API Route Handlers', 'Swiper', 'Docker'].map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-md text-[11px] bg-zinc-900/80 border border-zinc-800 text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenProjectModal('loopix')}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Xem chi tiết dự án</span>
                </button>
                <a
                  href="https://www.loopixstudio.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <span>Mở website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= SECTION 3: SENSE & SCENE (ALHENA) ================= */}
        {activeSection === 3 && (
          <motion.div
            key="sec-3"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="w-full max-w-xl ml-4 sm:ml-12 lg:ml-20 px-4 pointer-events-auto"
          >
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl shadow-black/80 select-none">
              {/* Star Badge */}
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono bg-white/5 text-zinc-300 border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-pulse"></span>
                  Alhena · Dự án 03
                </span>
                <span className="text-zinc-500 font-mono">Studio sáng tạo</span>
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mb-1">
                Sense & Scene Studio
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-medium mb-3">
                Portfolio studio CGI và motion design
              </p>

              {/* Thumbnail image */}
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 mb-4 pointer-events-none">
                <Image
                  src={PROJECTS[2].image}
                  alt="Sense & Scene"
                  fill
                  className="object-cover pointer-events-none"
                />
              </div>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                {PROJECTS[2].summary}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {['Next.js 15', 'GSAP 3', 'ScrollTrigger', '5 ngôn ngữ', 'Nhạc nền', 'Giảm chuyển động'].map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-md text-[11px] bg-zinc-900/80 border border-zinc-800 text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenProjectModal('sense')}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Xem chi tiết dự án</span>
                </button>
                <a
                  href="https://sensescene.studio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <span>Mở website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= SECTION 4: SKILLS (WASAT) ================= */}
        {activeSection === 4 && (
          <motion.div
            key="sec-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="w-full max-w-2xl ml-4 sm:ml-12 lg:ml-20 px-4 pointer-events-auto"
          >
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl shadow-black/80 select-none">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono mb-3">
                <span>Wasat · Kỹ năng</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mb-5">
                Công nghệ mình dùng
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SKILL_CATEGORIES.map((cat) => (
                  <div
                    key={cat.category}
                    className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80"
                  >
                    <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2.5">
                      {cat.category}
                    </h3>
                    <div className="space-y-1.5">
                      {cat.skills.map((s) => (
                        <div key={s.name} className="flex items-baseline justify-between text-xs">
                          <div>
                            <span className="font-semibold text-zinc-200">{s.name}</span>
                            <span className="text-zinc-500 text-[11px] ml-1.5">({s.desc})</span>
                          </div>
                          <span className="text-[10px] text-zinc-500 font-mono shrink-0 ml-2">
                            {s.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= SECTION 5: EDUCATION (MEBSUTA) ================= */}
        {activeSection === 5 && (
          <motion.div
            key="sec-5"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="w-full max-w-xl ml-4 sm:ml-12 lg:ml-20 px-4 pointer-events-auto"
          >
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl shadow-black/80 select-none">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono mb-3">
                <span>Mebsuta · Học vấn</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mb-4">
                Học vấn và hướng đi
              </h2>

              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 mb-5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-bold text-white">
                    {PERSONAL_INFO.school}
                  </h3>
                  <span className="text-[11px] font-mono text-zinc-300 bg-zinc-800 px-2 py-0.5 rounded-full border border-zinc-700">
                    {PERSONAL_INFO.period}
                  </span>
                </div>
                <p className="text-xs text-zinc-300 mb-2">
                  Ngành: <strong>{PERSONAL_INFO.major}</strong>
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Mình đang học CNTT tại HUTECH, đồng thời làm các dự án web full-stack và tự động hóa để áp dụng kiến thức vào thực tế.
                </p>
              </div>

              <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2.5">
                Điều mình muốn học tiếp
              </h4>
              <div className="space-y-2">
                {PERSONAL_INFO.careerGoals.map((goal, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80 text-xs text-zinc-300 flex items-start gap-2.5"
                  >
                    <span className="text-zinc-500 font-mono text-[11px] shrink-0 font-bold">
                      0{idx + 1}.
                    </span>
                    <span>{goal}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= SECTION 6: CONTACT (PROPUS) ================= */}
        {activeSection === 6 && (
          <motion.div
            key="sec-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="w-full max-w-xl ml-4 sm:ml-12 lg:ml-20 px-4 pointer-events-auto"
          >
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl shadow-black/80 select-none">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono mb-3">
                <span>Propus · Liên hệ</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mb-2">
                Trao đổi với mình
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mb-6">
                Mình sẵn sàng trao đổi về công việc phát triển web, tự động hóa hoặc một dự án phù hợp.
              </p>

              <div className="space-y-2.5 mb-5">
                {/* Email */}
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                    <div>
                      <div className="text-[10px] text-zinc-500">Email</div>
                      <a
                        href={`mailto:${PERSONAL_INFO.email}`}
                        className="text-xs font-semibold text-zinc-200 hover:text-white transition-colors"
                      >
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                    title="Sao chép email"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Phone */}
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
                    <div>
                      <div className="text-[10px] text-zinc-500">Điện thoại / Zalo</div>
                      <a
                        href={`tel:${PERSONAL_INFO.phone}`}
                        className="text-xs font-semibold text-zinc-200 hover:text-white transition-colors"
                      >
                        {PERSONAL_INFO.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                    title="Sao chép số điện thoại"
                  >
                    {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all"
                >
                  <Linkedin className="w-3.5 h-3.5 text-zinc-400" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
