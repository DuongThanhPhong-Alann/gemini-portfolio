'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  CELESTIAL_CONSTELLATIONS,
  CelestialConstellation,
  CelestialStar,
} from '@/data/celestialConstellations';
import { cosmicAudio } from './SoundEffects';

export interface StarPin {
  id: string;
  name: string;
  label: string;
  x: number;
  y: number;
  visible: boolean;
  sectionIdx: number;
  isProject: boolean;
  color: string;
  isConstellation?: boolean;
  constellationId?: string;
  isConstellationStar?: boolean;
  placement?: 'top' | 'bottom';
}

interface Canvas3DProps {
  activeSectionIndex: number;
  isOrbitMode: boolean;
  activeConstellationId?: string | null;
  onStarClick: (index: number) => void;
  onUpdateStarPins?: (pins: StarPin[]) => void;
  onEnterOrbitMode?: () => void;
  onSelectConstellation?: (id: string | null) => void;
}

// Center offset X: +3.4 so the Gemini Constellation sits on the RIGHT side in Hero view
const CONSTELLATION_OFFSET_X = 3.4;

// The anatomical planetary worlds of the Gemini Constellation (Song Tử)
const GEMINI_PLANETS = [
  // --- TWIN 1: CASTOR (DevDes World - Hành tinh Đại dương & Băng tuyết Lam Ngọc) ---
  {
    id: 'castor',
    name: 'Castor',
    label: 'DevDes',
    pos: new THREE.Vector3(-1.8 + CONSTELLATION_OFFSET_X, 4.5, 0),
    radius: 0.9,
    theme: 'ocean-cyan',
    hasRings: true,
    ringInner: 1.25,
    ringOuter: 1.95,
    ringColor: '#38bdf8',
    atmosphereColor: '#38bdf8',
    major: true,
    sectionIdx: 1,
    isProject: true,
  },
  {
    id: 'c_shoulder',
    name: 'Tau Gem',
    label: '',
    pos: new THREE.Vector3(-2.2 + CONSTELLATION_OFFSET_X, 2.8, -0.2),
    radius: 0.32,
    theme: 'terrestrial-blue',
    hasRings: false,
    atmosphereColor: '#93c5fd',
    major: false,
    sectionIdx: 1,
    isProject: false,
  },
  {
    id: 'c_arm',
    name: 'Hand 1',
    label: '',
    pos: new THREE.Vector3(-0.4 + CONSTELLATION_OFFSET_X, 2.0, 0.1),
    radius: 0.28,
    theme: 'rocky-gray',
    hasRings: false,
    atmosphereColor: '#93c5fd',
    major: false,
    sectionIdx: 1,
    isProject: false,
  },
  {
    id: 'mebsuta',
    name: 'Mebsuta',
    label: 'Học vấn',
    pos: new THREE.Vector3(-2.8 + CONSTELLATION_OFFSET_X, 1.0, -0.4),
    radius: 0.72,
    theme: 'terrestrial-indigo',
    hasRings: false,
    atmosphereColor: '#818cf8',
    major: true,
    sectionIdx: 5,
    isProject: false,
  },
  {
    id: 'c_hip',
    name: 'Nu Gem',
    label: '',
    pos: new THREE.Vector3(-3.2 + CONSTELLATION_OFFSET_X, -0.6, -0.6),
    radius: 0.3,
    theme: 'rocky-gray',
    hasRings: false,
    atmosphereColor: '#a5b4fc',
    major: false,
    sectionIdx: 5,
    isProject: false,
  },
  {
    id: 'c_knee',
    name: 'Tejat Prior',
    label: '',
    pos: new THREE.Vector3(-3.8 + CONSTELLATION_OFFSET_X, -2.5, -0.8),
    radius: 0.32,
    theme: 'rocky-ice',
    hasRings: false,
    atmosphereColor: '#cbd5e1',
    major: false,
    sectionIdx: 6,
    isProject: false,
  },
  {
    id: 'propus',
    name: 'Propus',
    label: 'Liên hệ',
    pos: new THREE.Vector3(-4.2 + CONSTELLATION_OFFSET_X, -4.5, -1.0),
    radius: 0.72,
    theme: 'emerald-aurora',
    hasRings: true,
    ringInner: 1.05,
    ringOuter: 1.55,
    ringColor: '#34d399',
    atmosphereColor: '#34d399',
    major: true,
    sectionIdx: 6,
    isProject: false,
  },

  // --- TWIN 2: POLLUX (Loopix World - Hành tinh Khí khổng lồ Hoàng Kim với Vành đai Thần bí) ---
  {
    id: 'pollux',
    name: 'Pollux',
    label: 'Loopix Studio',
    pos: new THREE.Vector3(1.8 + CONSTELLATION_OFFSET_X, 4.1, -0.1),
    radius: 1.05,
    theme: 'gas-giant-gold',
    hasRings: true,
    ringInner: 1.45,
    ringOuter: 2.35,
    ringColor: '#fbbf24',
    atmosphereColor: '#fbbf24',
    major: true,
    sectionIdx: 2,
    isProject: true,
  },
  {
    id: 'p_shoulder',
    name: 'Kappa Gem',
    label: '',
    pos: new THREE.Vector3(2.0 + CONSTELLATION_OFFSET_X, 2.5, -0.3),
    radius: 0.32,
    theme: 'terrestrial-amber',
    hasRings: false,
    atmosphereColor: '#fde68a',
    major: false,
    sectionIdx: 2,
    isProject: false,
  },
  {
    id: 'p_arm',
    name: 'Hand 2',
    label: '',
    pos: new THREE.Vector3(0.4 + CONSTELLATION_OFFSET_X, 1.9, 0.1),
    radius: 0.28,
    theme: 'rocky-amber',
    hasRings: false,
    atmosphereColor: '#fde68a',
    major: false,
    sectionIdx: 2,
    isProject: false,
  },
  {
    id: 'wasat',
    name: 'Wasat',
    label: 'Kỹ năng',
    pos: new THREE.Vector3(1.2 + CONSTELLATION_OFFSET_X, 0.6, -0.5),
    radius: 0.78,
    theme: 'tech-cobalt',
    hasRings: true,
    ringInner: 1.1,
    ringOuter: 1.6,
    ringColor: '#60a5fa',
    atmosphereColor: '#60a5fa',
    major: true,
    sectionIdx: 4,
    isProject: false,
  },
  {
    id: 'p_hip',
    name: 'Zeta Gem',
    label: '',
    pos: new THREE.Vector3(1.6 + CONSTELLATION_OFFSET_X, -0.8, -0.7),
    radius: 0.3,
    theme: 'rocky-gray',
    hasRings: false,
    atmosphereColor: '#e2e8f0',
    major: false,
    sectionIdx: 4,
    isProject: false,
  },
  {
    id: 'p_knee',
    name: 'Mekbuda',
    label: '',
    pos: new THREE.Vector3(2.2 + CONSTELLATION_OFFSET_X, -2.5, -0.9),
    radius: 0.32,
    theme: 'rocky-violet',
    hasRings: false,
    atmosphereColor: '#fbcfe8',
    major: false,
    sectionIdx: 3,
    isProject: false,
  },
  {
    id: 'alhena',
    name: 'Alhena',
    label: 'Sense & Scene',
    pos: new THREE.Vector3(3.2 + CONSTELLATION_OFFSET_X, -4.5, -1.2),
    radius: 0.88,
    theme: 'exotic-purple',
    hasRings: true,
    ringInner: 1.2,
    ringOuter: 1.85,
    ringColor: '#c084fc',
    atmosphereColor: '#c084fc',
    major: true,
    sectionIdx: 3,
    isProject: true,
  },
];

// Constellation lines linking the planets to form the true anatomical Gemini Twins
const GEMINI_LINES: [number, number][] = [
  // Twin 1 (Castor figure)
  [0, 1], // Castor -> Shoulder
  [1, 2], // Shoulder -> Arm
  [1, 3], // Shoulder -> Mebsuta
  [3, 4], // Mebsuta -> Hip
  [4, 5], // Hip -> Knee
  [5, 6], // Knee -> Propus (Foot)

  // Twin 2 (Pollux figure)
  [7, 8],   // Pollux -> Shoulder
  [8, 9],   // Shoulder -> Arm
  [8, 10],  // Shoulder -> Wasat
  [10, 11], // Wasat -> Hip
  [11, 12], // Hip -> Knee
  [12, 13], // Knee -> Alhena (Foot)

  // Hands & Body Links
  [2, 9],   // Hands clasping in the middle
  [3, 10],  // Mebsuta <-> Wasat (Torso connection)
  [4, 11],  // Hip <-> Hip (Twin bond)
];

// Waypoint cameras for the 7 stages
const WAYPOINTS = [
  // 0: Initial Hero View - Gemini system framed on the right, left open for intro
  { pos: new THREE.Vector3(0, 0, 16.5), target: new THREE.Vector3(1.2, 0, 0) },
  // 1: Castor / DevDes - Close frame on the Cyan Ocean Planet
  { pos: new THREE.Vector3(1.2, 4.5, 5.8), target: new THREE.Vector3(1.6, 4.5, 0) },
  // 2: Pollux / Loopix - Close frame on the Golden Ringed Gas Giant
  { pos: new THREE.Vector3(4.8, 4.1, 6.0), target: new THREE.Vector3(5.2, 4.1, -0.1) },
  // 3: Alhena / Sense & Scene - Close frame on the Exotic Purple World
  { pos: new THREE.Vector3(6.2, -4.5, 5.6), target: new THREE.Vector3(6.6, -4.5, -1.2) },
  // 4: Wasat / Skills - Center Cobalt Planet
  { pos: new THREE.Vector3(4.2, 0.6, 5.5), target: new THREE.Vector3(4.6, 0.6, -0.5) },
  // 5: Mebsuta / Education - Azure Terrestrial Planet
  { pos: new THREE.Vector3(0.2, 1.0, 5.5), target: new THREE.Vector3(0.6, 1.0, -0.4) },
  // 6: Propus / Contact - Emerald Beacon Planet
  { pos: new THREE.Vector3(-1.2, -4.5, 5.4), target: new THREE.Vector3(-0.8, -4.5, -1.0) },
];



function createZodiacLabelTexture(symbol: string, name: string): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, 256, 64);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '600 20px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = 'rgba(186, 230, 253, 0.78)';
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 6;
    ctx.fillText(`${symbol}  ${name}`, 128, 32);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * PROCEDURAL EQUIRECTANGULAR PLANETARY SURFACE TEXTURE GENERATOR
 * Generates photorealistic high-res planetary surfaces:
 * - Continents, mountain ridges, island chains, polar ice caps
 * - Cloud band currents and Jupiter/Saturn style atmospheric storms
 * - High-definition surface roughness & specular details
 */
function createPlanetSurfaceTexture(theme: string): THREE.Texture {
  const width = 512;
  const height = 256;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Texture();

  // Pseudo-random noise helpers
  const hash = (x: number, y: number) => {
    const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
    return s - Math.floor(s);
  };
  const smoothNoise = (x: number, y: number) => {
    const i = Math.floor(x), j = Math.floor(y);
    const fx = x - i, fy = y - j;
    const sx = fx * fx * (3 - 2 * fx);
    const sy = fy * fy * (3 - 2 * fy);
    const n00 = hash(i, j), n10 = hash(i + 1, j);
    const n01 = hash(i, j + 1), n11 = hash(i + 1, j + 1);
    const x1 = n00 * (1 - sx) + n10 * sx;
    const x2 = n01 * (1 - sx) + n11 * sx;
    return x1 * (1 - sy) + x2 * sy;
  };
  const fbm = (x: number, y: number) => {
    let v = 0, a = 0.5, f = 1;
    for (let o = 0; o < 5; o++) {
      v += a * smoothNoise(x * f, y * f);
      f *= 2.05;
      a *= 0.5;
    }
    return v;
  };

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let py = 0; py < height; py++) {
    const v = py / height; // 0 to 1 (North pole to South pole)
    const lat = (v - 0.5) * Math.PI; // -PI/2 to PI/2

    for (let px = 0; px < width; px++) {
      const u = px / width;
      const lon = u * Math.PI * 2;
      const idx = (py * width + px) * 4;

      // 3D coordinates on unit sphere for seamless equirectangular mapping
      const sx = Math.cos(lat) * Math.cos(lon);
      const sy = Math.sin(lat);
      const sz = Math.cos(lat) * Math.sin(lon);

      if (theme === 'ocean-cyan') {
        // Castor: Cyan Ocean Planet with continents, mountain ranges & ice caps
        const n = fbm(sx * 3.5 + 1.2, sy * 3.5 + 4.1);
        const isPolar = Math.abs(sy) > 0.82;

        if (isPolar) {
          // Polar ice cap
          data[idx] = 230; data[idx + 1] = 245; data[idx + 2] = 255;
        } else if (n > 0.54) {
          // Landmass / Mountains
          const elev = (n - 0.54) * 2.2;
          data[idx] = Math.min(255, 15 + elev * 120);
          data[idx + 1] = Math.min(255, 80 + elev * 140);
          data[idx + 2] = Math.min(255, 110 + elev * 120);
        } else if (n > 0.49) {
          // Coastline / Shallow reefs
          data[idx] = 14; data[idx + 1] = 165; data[idx + 2] = 233;
        } else {
          // Deep Abyss Ocean
          const depth = n / 0.49;
          data[idx] = Math.floor(4 + depth * 12);
          data[idx + 1] = Math.floor(24 + depth * 40);
          data[idx + 2] = Math.floor(65 + depth * 90);
        }
      } else if (theme === 'gas-giant-gold') {
        // Pollux: Jupiter/Saturn style Golden Gas Giant with atmospheric bands & Great Storm Oval
        const bandNoise = fbm(sx * 1.5, sy * 12.0);
        const turbulent = fbm(sx * 4.0, sy * 6.0);
        const bandVal = (Math.sin(sy * 28.0 + turbulent * 2.5) * 0.5 + 0.5) * 0.7 + bandNoise * 0.3;

        // Great Golden Storm Oval in southern hemisphere
        const stormDist = Math.hypot(sx - 0.4, sy + 0.35);
        const inStorm = stormDist < 0.22;

        if (inStorm) {
          data[idx] = 254; data[idx + 1] = 240; data[idx + 2] = 138;
        } else {
          data[idx] = Math.floor(217 * bandVal + 38);
          data[idx + 1] = Math.floor(140 * bandVal + 30);
          data[idx + 2] = Math.floor(40 * bandVal + 15);
        }
      } else if (theme === 'exotic-purple') {
        // Alhena: Exotic Violet world with luminescent crystal plains & deep purple seas
        const n = fbm(sx * 3.8 + 2.1, sy * 3.8 + 1.7);
        if (n > 0.53) {
          // Lilac / Amethyst mountains
          const elev = (n - 0.53) * 2.2;
          data[idx] = Math.min(255, 168 + elev * 80);
          data[idx + 1] = Math.min(255, 85 + elev * 70);
          data[idx + 2] = Math.min(255, 247 + elev * 10);
        } else {
          // Deep violet liquid methane seas
          data[idx] = Math.floor(35 + n * 40);
          data[idx + 1] = Math.floor(10 + n * 30);
          data[idx + 2] = Math.floor(85 + n * 80);
        }
      } else if (theme === 'emerald-aurora') {
        // Propus: Emerald world with vibrant green terrain & mineral oceans
        const n = fbm(sx * 3.2, sy * 3.2);
        if (n > 0.52) {
          data[idx] = 16; data[idx + 1] = 185; data[idx + 2] = 129;
        } else {
          data[idx] = 4; data[idx + 1] = 47; data[idx + 2] = 46;
        }
      } else {
        // Tech / Cobalt / Terrestrial planets
        const n = fbm(sx * 3.5, sy * 3.5);
        if (n > 0.52) {
          data[idx] = 59; data[idx + 1] = 130; data[idx + 2] = 246;
        } else {
          data[idx] = 15; data[idx + 1] = 23; data[idx + 2] = 42;
        }
      }

      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * PROCEDURAL FLOATING PLANETARY CLOUD TEXTURE
 * Generates transparent swirling cloud formations (like Earth / Jupiter clouds)
 */
function createPlanetCloudTexture(): THREE.Texture {
  const width = 512;
  const height = 256;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Texture();

  const hash = (x: number, y: number) => {
    const s = Math.sin(x * 131.7 + y * 283.3) * 43758.5453;
    return s - Math.floor(s);
  };
  const smoothNoise = (x: number, y: number) => {
    const i = Math.floor(x), j = Math.floor(y);
    const fx = x - i, fy = y - j;
    const sx = fx * fx * (3 - 2 * fx);
    const sy = fy * fy * (3 - 2 * fy);
    const n00 = hash(i, j), n10 = hash(i + 1, j);
    const n01 = hash(i, j + 1), n11 = hash(i + 1, j + 1);
    const x1 = n00 * (1 - sx) + n10 * sx;
    const x2 = n01 * (1 - sx) + n11 * sx;
    return x1 * (1 - sy) + x2 * sy;
  };
  const fbm = (x: number, y: number) => {
    let v = 0, a = 0.5, f = 1;
    for (let o = 0; o < 4; o++) {
      v += a * smoothNoise(x * f, y * f);
      f *= 2.1;
      a *= 0.5;
    }
    return v;
  };

  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let py = 0; py < height; py++) {
    const lat = (py / height - 0.5) * Math.PI;
    for (let px = 0; px < width; px++) {
      const lon = (px / width) * Math.PI * 2;
      const idx = (py * width + px) * 4;

      const sx = Math.cos(lat) * Math.cos(lon);
      const sy = Math.sin(lat);
      const sz = Math.cos(lat) * Math.sin(lon);

      // Swirling cloud currents
      const swirl = fbm(sx * 5.0 + Math.sin(sy * 8.0) * 0.8, sy * 5.0);
      const alpha = Math.max(0, (swirl - 0.48) * 2.4);

      data[idx] = 255;
      data[idx + 1] = 255;
      data[idx + 2] = 255;
      data[idx + 3] = Math.min(255, Math.floor(alpha * 230));
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * PROCEDURAL PLANETARY RING TEXTURE (Saturn Style Cassini division grooves)
 */
function createPlanetRingTexture(colorHex: string): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Texture();

  const g = ctx.createLinearGradient(0, 0, 512, 0);
  g.addColorStop(0, 'rgba(0,0,0,0)');
  g.addColorStop(0.12, colorHex);
  g.addColorStop(0.35, 'rgba(0,0,0,0.1)'); // Cassini division gap
  g.addColorStop(0.48, colorHex);
  g.addColorStop(0.75, colorHex);
  g.addColorStop(0.92, 'rgba(255,255,255,0.7)');
  g.addColorStop(1, 'rgba(0,0,0,0)');

  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Load mascot texture and remove black background client-side with smooth feathering
 */
function createMascotTexture(url: string, onLoad: (tex: THREE.CanvasTexture) => void) {
  const img = new Image();
  img.src = url;
  img.onload = () => {
    const w = img.naturalWidth || img.width;
    const h = img.naturalHeight || img.height;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(img, 0, 0);
    const imgData = ctx.getImageData(0, 0, w, h);
    const d = imgData.data;
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i];
      const g = d[i + 1];
      const b = d[i + 2];
      const maxVal = Math.max(r, g, b);
      if (maxVal < 14) {
        d[i + 3] = 0;
      } else if (maxVal < 45) {
        d[i + 3] = Math.floor(((maxVal - 14) / 31) * 255);
      }
    }
    ctx.putImageData(imgData, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    onLoad(texture);
  };
}

export default function Canvas3D({
  activeSectionIndex,
  isOrbitMode,
  activeConstellationId,
  onStarClick,
  onUpdateStarPins,
  onEnterOrbitMode,
  onSelectConstellation,
}: Canvas3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const activeSectionRef = useRef(activeSectionIndex);
  activeSectionRef.current = activeSectionIndex;
  const isOrbitModeRef = useRef(isOrbitMode);
  isOrbitModeRef.current = isOrbitMode;
  const activeConstellationIdRef = useRef(activeConstellationId);
  activeConstellationIdRef.current = activeConstellationId;
  const onSelectConstellationRef = useRef(onSelectConstellation);
  onSelectConstellationRef.current = onSelectConstellation;
  const onUpdatePinsRef = useRef(onUpdateStarPins);
  onUpdatePinsRef.current = onUpdateStarPins;
  const onEnterOrbitModeRef = useRef(onEnterOrbitMode);
  onEnterOrbitModeRef.current = onEnterOrbitMode;

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.style.cursor = (isOrbitMode || activeConstellationId) ? 'grab' : 'default';
    }
  }, [isOrbitMode, activeConstellationId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // --- High-Performance WebGL Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1 : 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    // --- Scene & Perspective Camera ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020409, 0.006);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      600
    );
    camera.position.copy(WAYPOINTS[0].pos);

    const currentCamPos = WAYPOINTS[0].pos.clone();
    const currentCamTarget = WAYPOINTS[0].target.clone();
    const targetLook = WAYPOINTS[0].target.clone();

    // --- Dynamic Space Sun Light (Creates realistic Day/Night Terminator Shadows on Planets) ---
    const sunLight = new THREE.DirectionalLight(0xfffaed, 4.2);
    sunLight.position.set(12, 10, 15);
    scene.add(sunLight);
    scene.add(sunLight.target);

    const secondaryStarlight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    secondaryStarlight.position.set(-10, -8, -10);
    scene.add(secondaryStarlight);
    scene.add(secondaryStarlight.target);

    const ambientLight = new THREE.AmbientLight(0x0f172a, 0.9);
    scene.add(ambientLight);

    // --- 1. CLEAN DEEP SPACE AMBIENCE ---
    // Smooth, elegant, non-grainy cosmic backdrop
    const nebulaGeo = new THREE.PlaneGeometry(360, 220);
    const nebulaMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        void main() {
          // Soft, cinematic radial galactic glow without blotchy noise
          float dist = distance(vUv, vec2(0.65, 0.5));
          float glow = clamp(1.0 - dist * 1.4, 0.0, 1.0);
          vec3 deepIndigo = vec3(0.01, 0.03, 0.1);
          vec3 softCyan = vec3(0.02, 0.08, 0.18);
          vec3 col = mix(deepIndigo, softCyan, glow * 0.7);
          gl_FragColor = vec4(col, glow * 0.4);
        }
      `,
    });
    const nebulaMesh = new THREE.Mesh(nebulaGeo, nebulaMat);
    nebulaMesh.position.set(0, 0, -110);
    scene.add(nebulaMesh);

    // --- 2. CRISP, SHARP DISTANT STARS (PINPOINT REALISTIC ASTRONOMY) ---
    const starCount = 3200;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const spectralPalette = [
      new THREE.Color('#93c5fd'), // Blue-white
      new THREE.Color('#ffffff'), // Diamond white
      new THREE.Color('#fef08a'), // Warm yellow
      new THREE.Color('#fbcfe8'), // Soft rose
    ];

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 360;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 250;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 360 - 30;

      const col = spectralPalette[Math.floor(Math.random() * spectralPalette.length)];
      const mag = 0.3 + Math.pow(Math.random(), 3.5) * 0.7;
      starColors[i * 3] = col.r * mag;
      starColors[i * 3 + 1] = col.g * mag;
      starColors[i * 3 + 2] = col.b * mag;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(starGeo, starMaterial);
    scene.add(starField);

    // --- 3. REALISTIC 3D PLANETS & GEMINI SYSTEM ---
    const geminiGroup = new THREE.Group();
    scene.add(geminiGroup);

    // Common cloud texture for terrestrial worlds
    const cloudTexture = createPlanetCloudTexture();
    // Procedural surfaces depend only on theme. Share them across all planets.
    const surfaceTextures = new Map<string, THREE.Texture>();
    const getSurfaceTexture = (theme: string) => {
      let texture = surfaceTextures.get(theme);
      if (!texture) {
        texture = createPlanetSurfaceTexture(theme);
        surfaceTextures.set(theme, texture);
      }
      return texture;
    };

    // Atmosphere Fresnel Glow Shader
    const createAtmosphereMaterial = (colorHex: string, defaultOpacity: number = 0.85) => {
      return new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uColor: { value: new THREE.Color(colorHex) },
          uOpacity: { value: defaultOpacity },
        },
        vertexShader: `
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          uniform float uOpacity;
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
            gl_FragColor = vec4(uColor, intensity * uOpacity);
          }
        `,
      });
    };

    interface PlanetInstance {
      group: THREE.Group;
      surfaceMesh: THREE.Mesh;
      cloudMesh?: THREE.Mesh;
      ringsMesh?: THREE.Mesh;
      planet: typeof GEMINI_PLANETS[0];
    }
    const planetInstances: PlanetInstance[] = [];

    GEMINI_PLANETS.forEach((p) => {
      const pGroup = new THREE.Group();
      pGroup.position.copy(p.pos);
      geminiGroup.add(pGroup);

      // 1. Photorealistic Planet Surface Sphere
      const surfaceTex = getSurfaceTexture(p.theme);
      const surfaceMat = new THREE.MeshStandardMaterial({
        map: surfaceTex,
        roughness: p.theme === 'gas-giant-gold' ? 0.35 : 0.65,
        metalness: 0.1,
      });

      const sphereGeo = new THREE.SphereGeometry(p.radius, 40, 32);
      const surfaceMesh = new THREE.Mesh(sphereGeo, surfaceMat);
      // Slight planetary axial tilt
      surfaceMesh.rotation.z = 0.25;
      surfaceMesh.rotation.x = 0.1;
      pGroup.add(surfaceMesh);

      // 2. Floating Atmospheric Cloud Layer (for terrestrial worlds)
      let cloudMesh: THREE.Mesh | undefined;
      if (p.theme !== 'gas-giant-gold') {
        const cloudMat = new THREE.MeshStandardMaterial({
          map: cloudTexture,
          transparent: true,
          opacity: 0.55,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        cloudMesh = new THREE.Mesh(
          new THREE.SphereGeometry(p.radius * 1.025, 36, 28),
          cloudMat
        );
        pGroup.add(cloudMesh);
      }

      // 3. Atmospheric Fresnel Rim Glow (Glowing horizon seen from space)
      const atmoMat = createAtmosphereMaterial(p.atmosphereColor);
      const atmoMesh = new THREE.Mesh(
        new THREE.SphereGeometry(p.radius * 1.15, 32, 24),
        atmoMat
      );
      pGroup.add(atmoMesh);

      // 4. Planetary Rings (Like Saturn / Exoplanets)
      let ringsMesh: THREE.Mesh | undefined;
      if (p.hasRings && p.ringInner && p.ringOuter) {
        const ringGeo = new THREE.RingGeometry(p.ringInner, p.ringOuter, 64);
        // Correct ring UV mapping for circular texturing
        const pos = ringGeo.attributes.position;
        const uvs = ringGeo.attributes.uv;
        for (let i = 0; i < pos.count; i++) {
          const vx = pos.getX(i);
          const vy = pos.getY(i);
          const dist = Math.hypot(vx, vy);
          const u = (dist - p.ringInner) / (p.ringOuter - p.ringInner);
          uvs.setXY(i, u, 0.5);
        }
        uvs.needsUpdate = true;

        const ringTex = createPlanetRingTexture(p.ringColor || '#ffffff');
        const ringMat = new THREE.MeshStandardMaterial({
          map: ringTex,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.85,
          roughness: 0.4,
        });
        ringsMesh = new THREE.Mesh(ringGeo, ringMat);
        // Tilt the rings naturally
        ringsMesh.rotation.x = Math.PI / 2.3;
        ringsMesh.rotation.y = 0.35;
        pGroup.add(ringsMesh);
      }

      planetInstances.push({
        group: pGroup,
        surfaceMesh,
        cloudMesh,
        ringsMesh,
        planet: p,
      });
    });

    // 5. Constellation Filaments Linking the Planets
    const lineMat = new THREE.MeshBasicMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    GEMINI_LINES.forEach(([a, b]) => {
      const p1 = GEMINI_PLANETS[a].pos;
      const p2 = GEMINI_PLANETS[b].pos;
      const curve = new THREE.LineCurve3(p1, p2);
      const tubeGeo = new THREE.TubeGeometry(curve, 6, 0.015, 6, false);
      const tubeMesh = new THREE.Mesh(tubeGeo, lineMat);
      geminiGroup.add(tubeMesh);
    });

    // Orbit center definition (Gemini center)
    const orbitCenter = new THREE.Vector3(CONSTELLATION_OFFSET_X, 0.2, -0.4);

    // --- 5.2. CELESTIAL CONSTELLATIONS DOME (15 Chòm sao: Lạp Hộ & Xà Phu trên đầu, Tiên Vương & Tiên Hậu phía dưới, 11 Hoàng Đạo) ---
    const distantConstellationsGroup = new THREE.Group();
    scene.add(distantConstellationsGroup);

    interface DistantStarInstance {
      surfaceMesh: THREE.Mesh;
      surfaceMat: THREE.MeshStandardMaterial;
      cloudMesh?: THREE.Mesh;
      cloudMat?: THREE.MeshStandardMaterial;
      atmoMesh: THREE.Mesh;
      atmoMat: THREE.ShaderMaterial;
      ringsMesh?: THREE.Mesh;
      ringMat?: THREE.MeshStandardMaterial;
      star: CelestialStar;
    }

    interface DistantConstellationInstance {
      id: string;
      group: THREE.Group;
      linesMesh: THREE.LineSegments;
      lineMat: THREE.LineBasicMaterial;
      labelSprite: THREE.Sprite;
      labelMat: THREE.SpriteMaterial;
      stars: DistantStarInstance[];
      currentWeight: number;
    }
    const distantConstellationInstances: DistantConstellationInstance[] = [];

    CELESTIAL_CONSTELLATIONS.forEach((c) => {
      const cGroup = new THREE.Group();
      cGroup.position.set(...c.worldPos);
      // Aligned with standard world view plane for crisp, distortion-free close-up framing

      // 1. Constellation Filaments (Faint, ethereal connecting lines)
      const linePts: THREE.Vector3[] = [];
      c.lines.forEach(([i, j]) => {
        if (c.stars[i] && c.stars[j]) {
          linePts.push(new THREE.Vector3(...c.stars[i].offset));
          linePts.push(new THREE.Vector3(...c.stars[j].offset));
        }
      });
      const lineGeo = new THREE.BufferGeometry().setFromPoints(linePts);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x93c5fd,
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending,
      });
      const linesMesh = new THREE.LineSegments(lineGeo, lineMat);
      cGroup.add(linesMesh);

      // 2. Realistic 3D Planetary Worlds (Chất lượng đồ họa chuẩn xác như Song Tử!)
      const cStars: DistantStarInstance[] = [];

      c.stars.forEach((s) => {
        const starGroup = new THREE.Group();
        starGroup.position.set(...s.offset);

        // A. Photorealistic Planet Surface Sphere (Lit naturally by sunLight - Terminator shadows!)
        const starGeo = new THREE.SphereGeometry(s.radius, 24, 16);
        const starTex = getSurfaceTexture(s.theme || 'tech-cobalt');
        const surfaceMat = new THREE.MeshStandardMaterial({
          map: starTex,
          roughness: s.theme === 'gas-giant-gold' ? 0.35 : 0.65,
          metalness: 0.1,
          transparent: true,
          opacity: 0.45,
        });
        const surfaceMesh = new THREE.Mesh(starGeo, surfaceMat);
        surfaceMesh.rotation.z = 0.25;
        surfaceMesh.rotation.x = 0.1;
        starGroup.add(surfaceMesh);

        // B. Floating Atmospheric Cloud Layer (Lớp mây khí quyển chuyển động độc lập!)
        let cloudMesh: THREE.Mesh | undefined;
        let cloudMat: THREE.MeshStandardMaterial | undefined;
        if (s.theme !== 'gas-giant-gold' && s.theme !== 'red-supergiant') {
          cloudMat = new THREE.MeshStandardMaterial({
            map: cloudTexture,
            transparent: true,
            opacity: 0.25,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          });
          cloudMesh = new THREE.Mesh(
            new THREE.SphereGeometry(s.radius * 1.025, 20, 14),
            cloudMat
          );
          starGroup.add(cloudMesh);
        }

        // C. Atmospheric Fresnel Rim Glow (Hào quang khí quyển chân trời!)
        const atmoMat = createAtmosphereMaterial(s.atmosphereColor, 0.35);
        const atmoMesh = new THREE.Mesh(
          new THREE.SphereGeometry(s.radius * 1.15, 20, 14),
          atmoMat
        );
        starGroup.add(atmoMesh);

        // D. Planetary Rings (Vành đai Cassini phân tầng với UV xuyên tâm chuẩn xác!)
        let ringsMesh: THREE.Mesh | undefined;
        let ringMat: THREE.MeshStandardMaterial | undefined;
        if (s.hasRings) {
          const ringInner = s.radius * 1.35;
          const ringOuter = s.radius * 2.15;
          const ringGeo = new THREE.RingGeometry(ringInner, ringOuter, 64);
          const pos = ringGeo.attributes.position;
          const uvs = ringGeo.attributes.uv;
          for (let i = 0; i < pos.count; i++) {
            const vx = pos.getX(i);
            const vy = pos.getY(i);
            const dist = Math.hypot(vx, vy);
            const u = (dist - ringInner) / (ringOuter - ringInner);
            uvs.setXY(i, u, 0.5);
          }
          uvs.needsUpdate = true;

          const ringTex = createPlanetRingTexture(s.ringColor || '#ffffff');
          ringMat = new THREE.MeshStandardMaterial({
            map: ringTex,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.35,
            roughness: 0.4,
          });
          ringsMesh = new THREE.Mesh(ringGeo, ringMat);
          ringsMesh.rotation.x = Math.PI / 2.3;
          ringsMesh.rotation.y = 0.35;
          starGroup.add(ringsMesh);
        }

        cGroup.add(starGroup);

        cStars.push({
          surfaceMesh,
          surfaceMat,
          cloudMesh,
          cloudMat,
          atmoMesh,
          atmoMat,
          ringsMesh,
          ringMat,
          star: s,
        });
      });

      // 3. Floating name label (Nhãn tên lơ lửng tinh tế)
      const labelMat = new THREE.SpriteMaterial({
        map: createZodiacLabelTexture(c.symbol, c.name),
        transparent: true,
        opacity: 0.18,
        depthWrite: false,
        toneMapped: false,
      });
      const labelSprite = new THREE.Sprite(labelMat);
      labelSprite.scale.set(3.2, 0.8, 1.0);
      labelSprite.position.set(0, -3.2, 0);
      cGroup.add(labelSprite);

      distantConstellationsGroup.add(cGroup);

      distantConstellationInstances.push({
        id: c.id,
        group: cGroup,
        linesMesh,
        lineMat,
        labelSprite,
        labelMat,
        stars: cStars,
        currentWeight: 0.28,
      });
    });

    // --- 5.5. CELESTIAL GEMINI MASCOT COMPANION (Linh vật Song Tử) ---
    const mascotGroup = new THREE.Group();
    scene.add(mascotGroup);

    const textureLoader = new THREE.TextureLoader();
    const mascotTexture = textureLoader.load('/assets/mascot.png');
    mascotTexture.colorSpace = THREE.SRGBColorSpace;

    const mascotMat = new THREE.SpriteMaterial({
      map: mascotTexture,
      transparent: true,
      depthWrite: false,
      toneMapped: false, // CRUCIAL: Disables ACES exposure blowout! Eliminates blinding white glare!
      color: new THREE.Color(0.88, 0.90, 0.95), // Soft, balanced lighting so all facial & suit details are crisp
    });

    const mascotSprite = new THREE.Sprite(mascotMat);
    mascotSprite.scale.set(1.4, 1.4, 1.0);
    mascotGroup.add(mascotSprite);

    // Extremely soft starlight aura (reduced from 1.8 to 0.25 to eliminate harsh glare)
    const mascotLight = new THREE.PointLight(0x38bdf8, 0.25, 2.5);
    mascotGroup.add(mascotLight);

    const mascotTargetPos = new THREE.Vector3(2.6, 1.8, 0.5);
    const mascotCurrentPos = new THREE.Vector3(2.6, 1.8, 0.5);
    mascotGroup.position.copy(mascotCurrentPos);

    // --- 6. 360° ORBIT INTERACTION & DRAG CONTROLS ---
    let mouseNDC_X = 0;
    let mouseNDC_Y = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;

    // Spherical orbit parameters around the constellation center
    let orbitTheta = 0.0; // Azimuth angle around Y axis (360 degrees)
    let orbitPhi = Math.PI / 2.3; // Polar elevation angle
    let orbitRadius = 17.0; // Distance to center in orbit mode

    let dragDist = 0;

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      // Allow buttons, links, inputs, and interactive widgets to receive normal clicks
      if (
        target &&
        (target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('[role="button"]'))
      ) {
        return;
      }

      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      dragDist = 0;

      // Prevent native browser text selection highlight
      document.body.style.userSelect = 'none';
      (document.body.style as any).webkitUserSelect = 'none';

      if (canvas) canvas.style.cursor = 'grabbing';
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouseNDC_X = (e.clientX / window.innerWidth) * 2 - 1;
      mouseNDC_Y = -(e.clientY / window.innerHeight) * 2 + 1;

      if (isDragging) {
        const dx = e.clientX - dragStartX;
        const dy = e.clientY - dragStartY;
        dragDist += Math.abs(dx) + Math.abs(dy);

        // If dragged more than 6px and not yet in orbit mode or constellation focus, automatically trigger Orbit Mode!
        if (!isOrbitModeRef.current && !activeConstellationIdRef.current && dragDist > 6 && onEnterOrbitModeRef.current) {
          onEnterOrbitModeRef.current();
        }

        orbitTheta -= dx * 0.006;
        orbitPhi += dy * 0.006;
        // Clamp polar angle so the camera does not flip upside down
        orbitPhi = Math.max(0.1, Math.min(Math.PI - 0.1, orbitPhi));

        dragStartX = e.clientX;
        dragStartY = e.clientY;
      } else if (canvas) {
        // Direct 3D Star Hover Detection
        mouseCoord.x = mouseNDC_X;
        mouseCoord.y = mouseNDC_Y;
        raycaster.setFromCamera(mouseCoord, camera);
        let hasHit = false;
        for (const cInst of distantConstellationInstances) {
          if (raycaster.intersectObjects(cInst.group.children, true).length > 0) {
            hasHit = true;
            break;
          }
        }
        if (!hasHit) {
          for (const pInst of planetInstances) {
            if (raycaster.intersectObjects(pInst.group.children, true).length > 0) {
              hasHit = true;
              break;
            }
          }
        }
        canvas.style.cursor = hasHit
          ? 'pointer'
          : (isOrbitModeRef.current || activeConstellationIdRef.current)
          ? 'grab'
          : 'default';
      }
    };

    const raycaster = new THREE.Raycaster();
    const mouseCoord = new THREE.Vector2();

    const handlePointerUp = (e: PointerEvent) => {
      // If minimal drag distance, this was an intentional 3D star click!
      if (dragDist < 8) {
        mouseCoord.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouseCoord.y = -(e.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouseCoord, camera);

        // 1. Raycast against all distant constellations
        let hitConstellationId: string | null = null;
        for (const cInst of distantConstellationInstances) {
          const hits = raycaster.intersectObjects(cInst.group.children, true);
          if (hits.length > 0) {
            hitConstellationId = cInst.id;
            break;
          }
        }

        if (hitConstellationId && onSelectConstellationRef.current) {
          cosmicAudio.playStarChime(560);
          onSelectConstellationRef.current(hitConstellationId);
          isDragging = false;
          return;
        }

        // 2. Raycast against Gemini major planets
        for (const pInst of planetInstances) {
          const hits = raycaster.intersectObjects(pInst.group.children, true);
          if (hits.length > 0) {
            cosmicAudio.playStarChime(420 + pInst.planet.sectionIdx * 75);
            if (activeConstellationIdRef.current && onSelectConstellationRef.current) {
              onSelectConstellationRef.current(null);
            }
            onStarClick(pInst.planet.sectionIdx);
            isDragging = false;
            return;
          }
        }
      }

      isDragging = false;
      document.body.style.userSelect = '';
      (document.body.style as any).webkitUserSelect = '';
      window.getSelection()?.removeAllRanges();
      if (canvas) canvas.style.cursor = (isOrbitModeRef.current || activeConstellationIdRef.current) ? 'grab' : 'default';
    };

    const handleWheel = (e: WheelEvent) => {
      if (isOrbitModeRef.current || activeConstellationIdRef.current) {
        e.preventDefault();
        orbitRadius = Math.max(7.0, Math.min(38.0, orbitRadius + e.deltaY * 0.02));
      }
    };

    const handleSelectStart = (e: Event) => {
      if (isDragging) e.preventDefault();
    };

    const handleDragStart = (e: Event) => {
      if (isDragging) e.preventDefault();
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('selectstart', handleSelectStart);
    window.addEventListener('dragstart', handleDragStart);
    canvas.addEventListener('wheel', handleWheel, { passive: false });

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, w < 768 ? 1 : 1.5));
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // --- 7. ANIMATION & FLUID CAMERA LOOP ---
    let animId = 0;
    let clock = 0;
    let lastTime = performance.now();
    let wasOrbitMode = false;
    let lastActiveConstellation: string | null | undefined = null;
    const tempVec = new THREE.Vector3();
    const targetPos = new THREE.Vector3();
    const targetLookAt = new THREE.Vector3();
    const targetScaleVec = new THREE.Vector3();
    let lastPinsTime = -Infinity;
    let lastPins: StarPin[] = [];

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const now = performance.now();
      if (document.hidden) {
        lastTime = now;
        return;
      }
      // Avoid rendering at 120/144 Hz on high refresh rate screens.
      if (now - lastTime < 1000 / 60 - 0.5) return;
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      clock += dt;

      // Reset orbit spherical coordinates when switching active constellation
      if (activeConstellationIdRef.current !== lastActiveConstellation) {
        lastActiveConstellation = activeConstellationIdRef.current;
        if (activeConstellationIdRef.current) {
          orbitPhi = Math.PI / 2.0;
          orbitTheta = 0.0;
          orbitRadius = 14.5;
        }
      }


      if (activeConstellationIdRef.current) {
        wasOrbitMode = false;
        // --- DIRECT FLIGHT & 360 ROTATION FOR FOCUSED CELESTIAL CONSTELLATION ---
        const targetConstellation = CELESTIAL_CONSTELLATIONS.find(
          (c) => c.id === activeConstellationIdRef.current
        );
        if (targetConstellation) {
          const cx = targetConstellation.worldPos[0];
          const cy = targetConstellation.worldPos[1];
          const cz = targetConstellation.worldPos[2];

          // Gentle continuous idle rotation when user is not dragging
          if (!isDragging) {
            orbitTheta += dt * 0.035;
          }

          const r = Math.max(8.0, Math.min(28.0, orbitRadius || 14.5));
          const sinP = Math.sin(orbitPhi);
          const cosP = Math.cos(orbitPhi);
          const sinT = Math.sin(orbitTheta);
          const cosT = Math.cos(orbitTheta);

          targetPos.set(
            cx + r * sinP * sinT + mouseNDC_X * 0.35,
            cy + r * cosP + mouseNDC_Y * 0.2,
            cz + r * sinP * cosT
          );
          targetLookAt.set(cx, cy, cz);

          // Mascot companion flies straight and stands beside this constellation's primary star
          const alphaStar = targetConstellation.stars[0];
          mascotTargetPos.set(
            cx + alphaStar.offset[0] + alphaStar.radius + 1.4,
            cy + alphaStar.offset[1] + 0.65,
            cz + alphaStar.offset[2] + 0.85
          );
        }
      } else if (isOrbitModeRef.current) {
        // Smoothly catch current camera angles when entering orbit mode
        if (!wasOrbitMode) {
          const rx = currentCamPos.x - orbitCenter.x;
          const ry = currentCamPos.y - orbitCenter.y;
          const rz = currentCamPos.z - orbitCenter.z;
          const dist = Math.sqrt(rx * rx + ry * ry + rz * rz);
          orbitRadius = Math.max(12.0, Math.min(30.0, dist || 18.0));
          orbitPhi = Math.acos(Math.max(-0.98, Math.min(0.98, ry / (dist || 1))));
          orbitTheta = Math.atan2(rx, rz);
        }
        wasOrbitMode = true;

        // Slow cinematic revolution around the Gemini constellation when idle
        if (!isDragging) {
          orbitTheta += dt * 0.12;
        }

        const sinPhi = Math.sin(orbitPhi);
        const cosPhi = Math.cos(orbitPhi);
        const sinTheta = Math.sin(orbitTheta);
        const cosTheta = Math.cos(orbitTheta);

        targetPos.set(
          orbitCenter.x + orbitRadius * sinPhi * sinTheta,
          orbitCenter.y + orbitRadius * cosPhi,
          orbitCenter.z + orbitRadius * sinPhi * cosTheta
        );
        targetLookAt.copy(orbitCenter);
      } else {
        wasOrbitMode = false;
        // --- DIRECT STRAIGHT-FLIGHT WAYPOINT MODE ---
        // Camera flies in a direct straight line in 3D space to the destination star
        const targetIdx = Math.max(0, Math.min(WAYPOINTS.length - 1, activeSectionRef.current));
        const targetWaypoint = WAYPOINTS[targetIdx];

        targetPos.copy(targetWaypoint.pos);
        targetLookAt.copy(targetWaypoint.target);

        // Add user drag tilt & subtle parallax even in waypoint mode!
        targetPos.x += Math.sin(orbitTheta) * 1.6 + mouseNDC_X * 0.35;
        targetPos.y += (orbitPhi - Math.PI / 2.3) * 1.4 + mouseNDC_Y * 0.2;
      }

      // Exponential damping for silky smooth motion (Zero jitter / lag)
      const factor = 1 - Math.exp(-dt * 3.4);
      currentCamPos.lerp(targetPos, factor);
      currentCamTarget.lerp(targetLookAt, factor);

      camera.position.copy(currentCamPos);
      targetLook.copy(currentCamTarget);
      camera.lookAt(targetLook);

      // Dynamically reposition sunLight and secondaryStarlight to beautifully illuminate the viewed world in 360
      sunLight.position.set(currentCamTarget.x + 14, currentCamTarget.y + 12, currentCamTarget.z + 16);
      sunLight.target.position.copy(currentCamTarget);
      secondaryStarlight.position.set(currentCamTarget.x - 14, currentCamTarget.y - 10, currentCamTarget.z - 14);
      secondaryStarlight.target.position.copy(currentCamTarget);

      // --- ANIMATE CELESTIAL MASCOT (Linh vật Song Tử) ---
      // When at Gemini, stands beside the active planet with clean clearance
      if (!activeConstellationIdRef.current) {
        const activeIdx = Math.max(0, Math.min(WAYPOINTS.length - 1, activeSectionRef.current));
        const targetPlanet = GEMINI_PLANETS.find((p) => p.major && p.sectionIdx === activeIdx);
        if (targetPlanet) {
          const outerBound = targetPlanet.hasRings
            ? (targetPlanet.ringOuter || targetPlanet.radius * 1.8)
            : targetPlanet.radius * 1.35;

          mascotTargetPos.set(
            targetPlanet.pos.x + outerBound + 1.35,
            targetPlanet.pos.y + 0.68,
            targetPlanet.pos.z + 0.85
          );
        } else {
          // Section 0 (Hero view): mascot floats gracefully in the cosmic foreground
          mascotTargetPos.set(2.8, 1.4, 2.8);
        }
      }

      // Direct straight flight to target star/constellation with frame-rate independent easing
      const mascotFactor = 1 - Math.exp(-dt * 3.2);
      mascotCurrentPos.lerp(mascotTargetPos, mascotFactor);

      // Gentle floating / idle bobbing & breathing
      const idleBobY = Math.sin(clock * 2.2) * 0.12;
      const idleBobX = Math.cos(clock * 1.5) * 0.08;
      mascotGroup.position.set(
        mascotCurrentPos.x + idleBobX,
        mascotCurrentPos.y + idleBobY,
        mascotCurrentPos.z
      );

      if (mascotSprite) {
        const breathe = 1.0 + Math.sin(clock * 2.6) * 0.035;
        mascotSprite.scale.set(1.4 * breathe, 1.4 * breathe, 1.0);
      }

      // Planet Axial Rotations (Planets slowly spin on their axes!)
      planetInstances.forEach((inst, i) => {
        inst.surfaceMesh.rotation.y += dt * 0.08;
        if (inst.cloudMesh) {
          inst.cloudMesh.rotation.y += dt * 0.12; // Clouds drift independently
        }
        if (inst.ringsMesh) {
          inst.ringsMesh.rotation.z += dt * 0.02;
        }

        // Slight breathing scale on active planet
        const isCurrent = inst.planet.sectionIdx === activeSectionRef.current;
        const targetScale = isCurrent ? 1.08 : 1.0;
        inst.group.scale.lerp(targetScaleVec.setScalar(targetScale), 0.1);
      });

      // Dynamic Prominence & Smooth Fade for Distant Constellations (Song Tử luôn là tâm điểm!)
      distantConstellationInstances.forEach((cInst) => {
        const isTarget = activeConstellationIdRef.current === cInst.id;
        // Nếu đang ngắm Song Tử: các chòm sao xa làm nền dịu nhẹ (weight = 0.28)
        // Nếu chọn chòm sao này: bừng sáng 100% chi tiết đồ họa (weight = 1.0)
        // Nếu đang chọn chòm sao khác: mờ nhẹ (weight = 0.10)
        const targetWeight = isTarget
          ? 1.0
          : activeConstellationIdRef.current
          ? 0.10
          : 0.28;

        cInst.currentWeight = THREE.MathUtils.lerp(cInst.currentWeight, targetWeight, dt * 3.8);
        const w = cInst.currentWeight;

        // Cập nhật độ sáng đường liên kết sao
        cInst.lineMat.opacity = 0.08 + w * 0.42;

        // Cập nhật nhãn tên 3D
        // Khi đang xem chi tiết một chòm sao bất kỳ (activeConstellationId), ẩn toàn bộ nhãn 3D để tránh chữ đè chữ
        if (activeConstellationIdRef.current) {
          cInst.labelMat.opacity = 0.0;
        } else {
          cInst.labelMat.opacity = 0.12 + w * 0.65;
          const baseScale = 3.2 + w * 1.0;
          cInst.labelSprite.scale.set(baseScale, baseScale * 0.25, 1.0);
        }

        // Tự quay quanh trục và cập nhật độ sáng/mây/vành đai của các hành tinh thành viên
        cInst.stars.forEach((sInst) => {
          sInst.surfaceMesh.rotation.y += dt * 0.08;
          sInst.surfaceMat.opacity = 0.35 + w * 0.65;

          if (sInst.cloudMesh && sInst.cloudMat) {
            sInst.cloudMesh.rotation.y += dt * 0.12;
            sInst.cloudMat.opacity = 0.15 + w * 0.45;
          }

          if (sInst.atmoMat && sInst.atmoMat.uniforms.uOpacity) {
            sInst.atmoMat.uniforms.uOpacity.value = 0.15 + w * 0.7;
          }

          if (sInst.ringsMesh && sInst.ringMat) {
            sInst.ringsMesh.rotation.z += dt * 0.02;
            sInst.ringMat.opacity = 0.2 + w * 0.7;
          }
        });
      });

      renderer.render(scene, camera);

      // Project Celestial & Planet Coordinates to 2D Screen for HTML Pins
      if (onUpdatePinsRef.current && now - lastPinsTime >= 1000 / 30) {
        lastPinsTime = now;
        const w = window.innerWidth;
        const h = window.innerHeight;
        const pins: StarPin[] = [];

        if (activeConstellationIdRef.current) {
          // --- FOCUS MODE: Show individual stars of the active constellation ---
          const cTarget = CELESTIAL_CONSTELLATIONS.find(
            (c) => c.id === activeConstellationIdRef.current
          );
          if (cTarget) {
            cTarget.stars.forEach((s) => {
              tempVec.set(
                cTarget.worldPos[0] + s.offset[0],
                cTarget.worldPos[1] + s.offset[1],
                cTarget.worldPos[2] + s.offset[2]
              );
              tempVec.project(camera);

              const isVisible = tempVec.z < 1.0 && tempVec.z > -1.0;
              const x = (tempVec.x * 0.5 + 0.5) * w;
              const y = (-tempVec.y * 0.5 + 0.5) * h;

              const isBelow =
                s.placement === 'bottom' ||
                s.id === 'alnilam' ||
                s.offset[1] < -1.8;

              pins.push({
                id: s.id,
                name: s.name,
                label: s.title,
                x,
                y,
                visible: isVisible,
                sectionIdx: 0,
                isProject: false,
                color: s.color,
                isConstellationStar: true,
                placement: isBelow ? 'bottom' : 'top',
              });
            });
          }
        } else {
          // --- GEMINI & CELESTIAL DOME VIEW ---
          // 1. Gemini major planets (Song Tử luôn ưu tiên hàng đầu)
          planetInstances.forEach((item) => {
            if (!item.planet.major) return;

            tempVec.copy(item.planet.pos);
            tempVec.project(camera);

            const isVisible = tempVec.z < 1.0 && tempVec.z > -1.0;
            const x = (tempVec.x * 0.5 + 0.5) * w;
            const y = (-tempVec.y * 0.5 + 0.5) * h;

            pins.push({
              id: item.planet.id,
              name: item.planet.name,
              label: item.planet.label,
              x,
              y,
              visible: isVisible,
              sectionIdx: item.planet.sectionIdx,
              isProject: item.planet.isProject,
              color: item.planet.atmosphereColor,
            });
          });

          // 2. Pins for distant celestial constellations
          // Chỉ hiển thị pin các chòm sao xa trong chế độ 360° Orbit hoặc màn hình đầu (Hero) để không che lấp dự án Song Tử
          if (isOrbitModeRef.current || activeSectionRef.current === 0) {
            CELESTIAL_CONSTELLATIONS.forEach((c) => {
              tempVec.set(...c.worldPos);
              tempVec.project(camera);

              const isVisible = tempVec.z < 1.0 && tempVec.z > -1.0;
              const x = (tempVec.x * 0.5 + 0.5) * w;
              const y = (-tempVec.y * 0.5 + 0.5) * h;

              pins.push({
                id: c.id,
                constellationId: c.id,
                name: `${c.symbol} ${c.name}`,
                label: c.latinName,
                x,
                y,
                visible: isVisible,
                sectionIdx: 0,
                isProject: false,
                color: '#38bdf8',
                isConstellation: true,
              });
            });
          }
        }

        const changed = pins.length !== lastPins.length || pins.some((pin, i) => {
          const previous = lastPins[i];
          return !previous || pin.id !== previous.id || pin.visible !== previous.visible ||
            (pin.visible && (Math.abs(pin.x - previous.x) > 0.5 || Math.abs(pin.y - previous.y) > 0.5));
        });
        if (changed) {
          lastPins = pins;
          onUpdatePinsRef.current(pins);
        }
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('selectstart', handleSelectStart);
      window.removeEventListener('dragstart', handleDragStart);
      canvas.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      document.body.style.userSelect = '';
      (document.body.style as any).webkitUserSelect = '';
      // React Strict Mode mounts twice in development. Release shared GPU resources once.
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      const textures = new Set<THREE.Texture>(surfaceTextures.values());
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line ||
            object instanceof THREE.Points || object instanceof THREE.Sprite) {
          if ('geometry' in object) geometries.add(object.geometry);
          const objectMaterials = Array.isArray(object.material) ? object.material : [object.material];
          objectMaterials.forEach((material) => {
            materials.add(material);
            Object.values(material).forEach((value) => {
              if (value instanceof THREE.Texture) textures.add(value);
            });
          });
        }
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      textures.forEach((texture) => texture.dispose());
      surfaceTextures.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-auto z-0 overflow-hidden bg-space-950"
    >
      <canvas ref={canvasRef} className="w-full h-full block touch-none" />
    </div>
  );
}
