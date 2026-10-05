'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import SectionOverlay from '@/components/SectionOverlay';
import ConstellationMap from '@/components/ConstellationMap';
import QuickControls from '@/components/QuickControls';
import ProjectModal from '@/components/ProjectModal';
import StarPinsOverlay from '@/components/StarPinsOverlay';
import OrbitInspector from '@/components/OrbitInspector';
import ConstellationDetailCard from '@/components/ConstellationDetailCard';
import ConstellationSelector from '@/components/ConstellationSelector';
import { StarPin } from '@/components/Canvas3D';
import { CONSTELLATION_NODES } from '@/data/portfolioData';
import { CELESTIAL_CONSTELLATIONS } from '@/data/celestialConstellations';
import { cosmicAudio } from '@/components/SoundEffects';
import { ChevronDown, Orbit, X, BookOpen, Sparkles, ArrowLeft } from 'lucide-react';

// Dynamically import Canvas3D to avoid SSR issues with Three.js / WebGL
const Canvas3D = dynamic(() => import('@/components/Canvas3D'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-space-950 flex flex-col items-center justify-center z-50">
      <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-300 text-2xl animate-pulse mb-3">
        ♊︎
      </div>
      <p className="text-xs font-mono text-slate-400 tracking-wider">
        Đang mở bản đồ Song Tử...
      </p>
    </div>
  ),
});

const TOTAL_SECTIONS = CONSTELLATION_NODES.length; // 7 waypoints (0 to 6)

export default function PortfolioPage() {
  const [currentProgress, setCurrentProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [isOrbitMode, setIsOrbitMode] = useState(false);
  const [isOrbitInspectorOpen, setIsOrbitInspectorOpen] = useState(true);
  const [activeConstellationId, setActiveConstellationId] = useState<string | null>(null);
  const [isConstellationCardOpen, setIsConstellationCardOpen] = useState(true);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [starPins, setStarPins] = useState<StarPin[]>([]);

  const targetProgressRef = useRef(0);
  const isNavigatingRef = useRef(false);

  // Silky Smooth Lerp Engine for Scroll Progress (No Jitter / Zero Lag)
  useEffect(() => {
    let animId = 0;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = (scrollY / maxScroll) * (TOTAL_SECTIONS - 1);
      targetProgressRef.current = progress;
    };

    const updateLoop = () => {
      setCurrentProgress((prev) => {
        const target = targetProgressRef.current;
        const diff = target - prev;
        if (Math.abs(diff) < 0.0008) return target;
        const next = prev + diff * 0.14; // Ultra-smooth exponential easing

        const rounded = Math.round(next);
        setActiveSection((prevSec) => {
          if (prevSec !== rounded && !isNavigatingRef.current) {
            cosmicAudio.playStarChime(380 + rounded * 70);
          }
          return rounded;
        });

        return next;
      });

      animId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    animId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Direct straight flight navigation to target star (No intermediate waypoint whipping!)
  const navigateToSection = useCallback((targetIndex: number) => {
    setActiveConstellationId(null);
    isNavigatingRef.current = true;
    const boundedIndex = Math.max(0, Math.min(TOTAL_SECTIONS - 1, targetIndex));
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const targetY = (boundedIndex / (TOTAL_SECTIONS - 1)) * maxScroll;

    targetProgressRef.current = boundedIndex;
    setCurrentProgress(boundedIndex);
    setActiveSection(boundedIndex);

    // Instant jump scroll without triggering continuous intermediate scroll events
    window.scrollTo({
      top: targetY,
      behavior: 'instant' as ScrollBehavior,
    });

    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 400);
  }, []);

  const handleSelectConstellation = useCallback((id: string | null) => {
    setActiveConstellationId(id);
    if (id) {
      setIsConstellationCardOpen(true);
    }
  }, []);

  const currentConstellation =
    CELESTIAL_CONSTELLATIONS.find((c) => c.id === activeConstellationId) || null;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedProjectId) {
          setSelectedProjectId(null);
          return;
        }
        if (activeConstellationId) {
          setActiveConstellationId(null);
          return;
        }
        if (isOrbitMode) {
          setIsOrbitMode(false);
          return;
        }
      }

      if (selectedProjectId) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        navigateToSection(activeSection + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        navigateToSection(activeSection - 1);
      } else if (['1', '2', '3', '4', '5', '6', '7'].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        navigateToSection(idx);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, selectedProjectId, activeConstellationId, isOrbitMode, navigateToSection]);

  return (
    <main className="relative min-h-screen bg-space-950 text-slate-100 overflow-x-hidden selection:bg-cyan-500/20 selection:text-white">
      {/* 3D WebGL Cosmic Constellation Canvas (Song Tử on Right, Left Open for Content) */}
      <Canvas3D
        currentProgress={currentProgress}
        activeSectionIndex={activeSection}
        isOrbitMode={isOrbitMode}
        activeConstellationId={activeConstellationId}
        onStarClick={(idx) => navigateToSection(idx)}
        onUpdateStarPins={(pins) => setStarPins(pins)}
        onEnterOrbitMode={() => {
          setIsOrbitMode(true);
          setIsOrbitInspectorOpen(true);
        }}
        onSelectConstellation={handleSelectConstellation}
      />

      {/* Floating 2D Star Pins (Only star name & project label, NO heavy floating images) */}
      <StarPinsOverlay
        pins={starPins}
        activeSection={activeSection}
        isOrbitMode={isOrbitMode}
        onNavigate={navigateToSection}
        onOpenProjectModal={(id) => setSelectedProjectId(id)}
        onSelectSection={(idx) => {
          setActiveSection(idx);
          setIsOrbitInspectorOpen(true);
        }}
        onSelectConstellation={handleSelectConstellation}
      />

      {/* Top Floating Navigation Bar */}
      <Navigation
        activeSection={activeSection}
        isOrbitMode={isOrbitMode}
        activeConstellationId={activeConstellationId}
        onNavigate={navigateToSection}
        onToggleOrbitMode={() => {
          if (activeConstellationId) {
            setIsConstellationCardOpen((prev) => !prev);
          } else {
            setIsOrbitMode((prev) => {
              const next = !prev;
              if (next) setIsOrbitInspectorOpen(true);
              return next;
            });
          }
        }}
        onSelectConstellation={handleSelectConstellation}
      />

      {/* Interactive 15 Constellation Selector & Quick Access Bar */}
      <ConstellationSelector
        activeConstellationId={activeConstellationId}
        onSelectConstellation={handleSelectConstellation}
        isOrbitMode={isOrbitMode}
      />

      {/* Interactive Constellation Minimap (Bottom Right, directly above STT stepper) */}
      {!isOrbitMode && !activeConstellationId && (
        <ConstellationMap
          activeSection={activeSection}
          onNavigate={navigateToSection}
        />
      )}

      {/* Quick Flight Controls (Bottom Right) */}
      {!activeConstellationId && (
        <QuickControls
          activeSection={activeSection}
          onNavigate={navigateToSection}
          onOpenProjectModal={(id) => setSelectedProjectId(id)}
        />
      )}

      {/* Floating Detailed Card for Visiting Distant Constellations */}
      <ConstellationDetailCard
        constellation={currentConstellation}
        isOpen={isConstellationCardOpen}
        onToggle360={() => setIsConstellationCardOpen(false)}
        onReturnToGemini={() => setActiveConstellationId(null)}
        onSelectConstellation={handleSelectConstellation}
        allConstellations={CELESTIAL_CONSTELLATIONS}
      />

      {/* 360° Mode Interactive Content Inspector (Xem nội dung dự án, thông tin sao trực tiếp trong chế độ 360°) */}
      {isOrbitMode && !activeConstellationId && (
        <OrbitInspector
          activeSection={activeSection}
          isOpen={isOrbitInspectorOpen}
          onClose={() => setIsOrbitInspectorOpen(false)}
          onOpenProjectModal={(id) => setSelectedProjectId(id)}
          onSelectSection={(idx) => {
            setActiveSection(idx);
            setIsOrbitInspectorOpen(true);
          }}
        />
      )}

      {/* 360° Free Exploration Mode Floating HUD for Song Tử */}
      {isOrbitMode && !activeConstellationId && (
        <div className="fixed bottom-7 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-950/90 border border-cyan-500/40 backdrop-blur-xl shadow-2xl shadow-cyan-500/10">
          <div className="flex items-center gap-2 text-cyan-300 text-xs font-medium">
            <Orbit className="w-4 h-4 animate-spin text-cyan-400" style={{ animationDuration: '6s' }} />
            <span className="font-mono text-[11px] sm:text-xs">
              Kéo để xoay · Cuộn để phóng to
            </span>
          </div>
          {!isOrbitInspectorOpen && (
            <>
              <div className="w-[1px] h-4 bg-slate-700" />
              <button
                onClick={() => setIsOrbitInspectorOpen(true)}
                className="px-2.5 py-1 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-200 text-xs font-mono transition-all flex items-center gap-1.5"
                title="Mở thông tin dự án và ngôi sao"
              >
                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>Xem dự án</span>
              </button>
            </>
          )}
          <div className="w-[1px] h-4 bg-slate-700" />
          <button
            onClick={() => setIsOrbitMode(false)}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 hover:text-white text-xs font-mono transition-all flex items-center gap-1 shrink-0"
          >
            <X className="w-3.5 h-3.5 text-slate-400" />
            <span>Thoát</span>
          </button>
        </div>
      )}

      {/* 360° Free Exploration Mode Floating HUD for Visited Constellation */}
      {activeConstellationId && currentConstellation && (
        <div className="fixed bottom-7 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-950/90 border border-cyan-500/40 backdrop-blur-xl shadow-2xl shadow-cyan-500/10">
          <div className="flex items-center gap-2 text-cyan-300 text-xs font-medium">
            <Orbit className="w-4 h-4 animate-spin text-cyan-400" style={{ animationDuration: '6s' }} />
            <span className="font-mono text-[11px] sm:text-xs">
              Kéo để xoay {currentConstellation.name} · Cuộn để phóng to
            </span>
          </div>

          <div className="w-[1px] h-4 bg-slate-700" />
          <button
            onClick={() => {
              cosmicAudio.playStarChime(isConstellationCardOpen ? 420 : 540);
              setIsConstellationCardOpen((prev) => !prev);
            }}
            className={`px-2.5 py-1 rounded-lg border text-xs font-mono transition-all flex items-center gap-1.5 ${
              isConstellationCardOpen
                ? 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-slate-300'
                : 'bg-cyan-500/20 hover:bg-cyan-500/30 border-cyan-400/60 text-cyan-200 shadow-glow-cyan'
            }`}
            title="Ẩn hoặc mở thông tin chòm sao"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isConstellationCardOpen ? 'Ẩn bảng để ngắm 360°' : 'Xem thông tin'}</span>
          </button>

          <div className="w-[1px] h-4 bg-slate-700" />
          <button
            onClick={() => {
              cosmicAudio.playStarChime(420);
              setActiveConstellationId(null);
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 hover:text-white text-xs font-mono transition-all flex items-center gap-1 shrink-0"
            title="Về Song Tử"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
            <span>Về Song Tử</span>
          </button>
        </div>
      )}

      {/* Scroll indicator for Section 0 */}
      {activeSection === 0 && !isOrbitMode && !activeConstellationId && (
        <div
          onClick={() => navigateToSection(1)}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer animate-bounce pointer-events-auto"
        >
          <span className="text-[10px] font-mono tracking-wider uppercase">
            Cuộn trang để xem từng phần
          </span>
          <ChevronDown className="w-4 h-4 text-cyan-400" />
        </div>
      )}

      {/* 7 Section Overlay Zones matching 7 Waypoints */}
      {!isOrbitMode && !activeConstellationId && (
        <div className="relative z-10 pointer-events-none">
          {Array.from({ length: TOTAL_SECTIONS }).map((_, index) => (
            <section
              key={index}
              id={`section-${index}`}
              className="min-h-screen flex items-center justify-start p-4 sm:p-6 pointer-events-none"
            >
              {activeSection === index && (
                <SectionOverlay
                  activeSection={activeSection}
                  isOrbitMode={isOrbitMode}
                  onNavigate={navigateToSection}
                  onOpenProjectModal={(id) => setSelectedProjectId(id)}
                />
              )}
            </section>
          ))}
        </div>
      )}

      {/* Detailed Project Case Study Modal */}
      <ProjectModal
        projectId={selectedProjectId}
        onClose={() => setSelectedProjectId(null)}
        onSelectProject={(id) => setSelectedProjectId(id)}
      />
    </main>
  );
}
