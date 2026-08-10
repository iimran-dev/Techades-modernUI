'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import {
  ArrowDown, Sparkles, Layers, Palette, Boxes, Video, FileText,
  Globe, ShoppingBag, Layout, FolderTree, AppWindow, Code2,
  Building2, Webhook, Server, Database, RefreshCw, Rocket,
  Cloud, Workflow, Zap, Terminal, Activity,
  Bot, Cpu, Cog, BarChart3, LineChart, MessageSquare,
  Smartphone, Tablet, ShieldCheck, Search, Lock, Lightbulb
} from 'lucide-react';
import {
  SiFigma, SiReact, SiShopify, SiWordpress, SiGraphql,
  SiNodedotjs, SiPostgresql, SiDocker,
  SiKubernetes, SiVercel, SiTerraform, SiDatadog,
  SiPython, SiFlutter
} from 'react-icons/si';

import { techServices, ACCENT, GRADIENT } from './data';
import type { ServiceOffer } from './data';
import { getAssetPath } from '@/utils/basePath';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------- icon map ---------- */
const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  Palette, Sparkles, Layers, Boxes, Video, FileText,
  Globe, ShoppingBag, Layout, FolderTree, AppWindow, Code2,
  Building2, Webhook, Server, Database, RefreshCw, Rocket,
  Cloud, Workflow, Zap, Terminal, Activity,
  Bot, Cpu, Cog, BarChart3, LineChart, MessageSquare,
  Smartphone, Tablet, ShieldCheck, Search, Lock, Lightbulb,
  SiFigma, SiReact, SiShopify, SiWordpress, SiGraphql,
  SiNodedotjs, SiPostgresql, SiDocker,
  SiKubernetes, SiVercel, SiTerraform, SiDatadog,
  SiPython, SiFlutter
};

function RenderServiceIcon({ iconName, size }: { iconName: string; size: number }) {
  const IconComponent = iconMap[iconName] || Globe;
  return <IconComponent size={size} />;
}

/* ---------- helpers ---------- */

// Deterministic pseudo-random from index
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

/* ---------- ring config ---------- */
const RINGS = [
  { count: 8, radius: 88, size: 42 },   // inner
  { count: 12, radius: 148, size: 38 },  // middle
  { count: 16, radius: 208, size: 36 },  // outer
] as const;

/* ---------- types ---------- */

interface ServicePosition {
  service: ServiceOffer;
  x: number;
  y: number;
  ring: number;
  angle: number;
}

/* ========== Component ========== */

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const ecosystemRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const [hoveredService, setHoveredService] = useState<ServicePosition | null>(null);
  const [tooltipStyle, setTooltipStyle] = useState({ top: 0, left: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });

  /* --- compute service positions (memoised) --- */
  const servicePositions = useMemo<ServicePosition[]>(() => {
    const positions: ServicePosition[] = [];
    let idx = 0;
    RINGS.forEach((ring, ringIdx) => {
      for (let i = 0; i < ring.count && idx < 36; i++, idx++) {
        const angle = (2 * Math.PI * i) / ring.count - Math.PI / 2;
        positions.push({
          service: techServices[idx],
          x: Math.cos(angle) * ring.radius,
          y: Math.sin(angle) * ring.radius,
          ring: ringIdx,
          angle,
        });
      }
    });
    return positions;
  }, []);

  /* --- compute connection lines (nearby across rings) --- */
  const connectionLines = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number; color: string }[] = [];
    const maxDist = 80;
    for (let i = 0; i < servicePositions.length; i++) {
      for (let j = i + 1; j < servicePositions.length; j++) {
        const a = servicePositions[i];
        const b = servicePositions[j];
        // only connect across adjacent rings or same ring neighbours
        if (Math.abs(a.ring - b.ring) > 1) continue;
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          lines.push({
            x1: a.x, y1: a.y,
            x2: b.x, y2: b.y,
            color: a.service.color,
          });
        }
      }
    }
    return lines;
  }, [servicePositions]);

  /* --- particles --- */
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      x: (seededRandom(i * 7 + 3) - 0.5) * 480,
      y: (seededRandom(i * 13 + 7) - 0.5) * 480,
      color: [ACCENT.purple, ACCENT.orange, ACCENT.blue, ACCENT.cyan][i % 4],
      size: 3 + seededRandom(i * 11) * 4,
      delay: seededRandom(i * 5) * 6,
      duration: 6 + seededRandom(i * 3) * 6,
    }));
  }, []);

  /* --- GSAP entrance --- */
  useEffect(() => {
    if (!containerRef.current) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

    const ctx = gsap.context(() => {
      // Left side
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: isMobile ? 0 : -60, y: isMobile ? 30 : 0, filter: 'blur(6px)' },
        {
          opacity: 1,
          x: 0,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
          delay: 0.2,
        }
      );

      // Ecosystem
      gsap.fromTo(
        ecosystemRef.current,
        { opacity: 0, scale: isMobile ? 0.8 : 0.7, filter: 'blur(8px)' },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.4,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  /* --- Mouse & Touch parallax --- */
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ecosystemRef.current) return;
    const rect = ecosystemRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    mouseRef.current = { x: dx, y: dy };
    gsap.to(ecosystemRef.current, {
      x: dx * 12,
      y: dy * 12,
      duration: 0.8,
      ease: 'power2.out',
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    gsap.to(ecosystemRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
    });
  }, []);

  /* --- Service hover & tap --- */
  const handleServiceSelect = useCallback(
    (pos: ServicePosition, e: React.MouseEvent | React.TouchEvent) => {
      setHoveredService((prev) => (prev?.service.id === pos.service.id ? null : pos));
      const targetEl = e.currentTarget as HTMLElement;
      const rect = targetEl.getBoundingClientRect();
      const parentRect = ecosystemRef.current?.getBoundingClientRect();
      if (parentRect) {
        const rawLeft = rect.left - parentRect.left + rect.width / 2;
        // Clamp tooltip position so it stays inside mobile viewport
        const clampedLeft = Math.max(70, Math.min(parentRect.width - 70, rawLeft));
        setTooltipStyle({
          top: Math.max(10, rect.top - parentRect.top - 70),
          left: clampedLeft,
        });
      }
    },
    []
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden py-16 sm:py-20 lg:py-28"
      style={{
        background:
          'radial-gradient(ellipse at 30% 50%, rgba(108,76,241,0.04) 0%, rgba(0,194,255,0.02) 40%, transparent 70%), #fff',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-8">
          {/* ===== LEFT CONTENT ===== */}
          <div
            ref={leftRef}
            className="flex-1 max-w-xl lg:max-w-lg text-center lg:text-left"
          >
            {/* Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.4rem] font-bold leading-[1.15] tracking-tight text-gray-900">
              Transforming Businesses Through{' '}
              <span className="gradient-text">Technology & AI.</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-gray-500 leading-relaxed max-w-md mx-auto lg:mx-0">
              One stop for end-to-end IT services, custom software engineering, cloud architecture, and artificial intelligence solutions.
            </p>

            {/* Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start w-full">
              <motion.a
                href="#capabilities"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-white font-semibold text-sm shadow-lg"
                style={{
                  background: GRADIENT.purpleToOrange,
                  boxShadow:
                    '0 8px 30px rgba(108,76,241,0.3), 0 2px 8px rgba(255,122,50,0.2)',
                }}
              >
                <Sparkles className="w-4 h-4" />
                Explore Services
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm border-2 text-gray-700 hover:text-gray-900 transition-colors"
                style={{
                  borderColor: 'rgba(108,76,241,0.25)',
                  background: 'rgba(108,76,241,0.03)',
                }}
              >
                Start Your Project
                <ArrowDown className="w-4 h-4" />
              </motion.a>
            </div>

            {/* Floating counter badge */}
            <motion.div
              className="mt-8 sm:mt-10 inline-flex items-center gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full glass shadow-md"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span
                className="flex items-center justify-center w-8 sm:w-9 h-8 sm:h-9 rounded-full text-white text-xs font-bold"
                style={{ background: GRADIENT.purpleToBlue }}
              >
                36+
              </span>
              <span className="text-xs sm:text-sm font-medium text-gray-700">
                End-to-End Services
              </span>
              <span className="flex -space-x-2">
                {[ACCENT.purple, ACCENT.orange, ACCENT.cyan, ACCENT.blue].map(
                  (c, i) => (
                    <span
                      key={i}
                      className="w-5 sm:w-6 h-5 sm:h-6 rounded-full border-2 border-white"
                      style={{ background: c }}
                    />
                  )
                )}
              </span>
            </motion.div>
          </div>

          {/* ===== RIGHT – ECOSYSTEM ===== */}
          <div className="flex-1 flex items-center justify-center w-full lg:w-auto mt-4 lg:mt-0">
            <div
              ref={ecosystemRef}
              className="relative w-[340px] h-[340px] xs:w-[380px] xs:h-[380px] sm:w-[440px] sm:h-[440px] md:w-[480px] md:h-[480px] mx-auto flex items-center justify-center"
            >
              {/* Responsive scaling wrapper */}
              <div className="absolute inset-0 scale-[0.7] xs:scale-[0.8] sm:scale-[0.9] md:scale-100 origin-center transition-transform duration-300">
                {/* SVG layer – orbital paths + connection lines */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="-240 -240 480 480"
                  fill="none"
                >
                  {/* Orbital dotted circles */}
                  {RINGS.map((ring, i) => (
                    <circle
                      key={`orbit-${i}`}
                      cx={0}
                      cy={0}
                      r={ring.radius}
                      stroke="rgba(108,76,241,0.12)"
                      strokeWidth={1}
                      strokeDasharray="4 6"
                      style={{
                        animation: `dash-move ${8 + i * 3}s linear infinite`,
                      }}
                    />
                  ))}

                  {/* Connection lines */}
                  {connectionLines.map((line, i) => (
                    <line
                      key={`line-${i}`}
                      x1={line.x1}
                      y1={line.y1}
                      x2={line.x2}
                      y2={line.y2}
                      stroke={line.color}
                      strokeWidth={0.5}
                      opacity={0.15}
                    />
                  ))}
                </svg>

                {/* Center logo with glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center animate-glow bg-white p-2.5 shadow-2xl border border-purple-100/80"
                    style={{
                      boxShadow:
                        '0 0 35px rgba(108,76,241,0.25), 0 0 60px rgba(0,194,255,0.15)',
                    }}
                  >
                    <Image
                      src={getAssetPath('/team/techades-logo.png')}
                      alt="Techades Official Logo"
                      width={64}
                      height={64}
                      className="w-full h-full object-contain"
                      priority
                    />
                  </div>
                </div>

                {/* Floating particles */}
                {particles.map((p, i) => (
                  <div
                    key={`particle-${i}`}
                    className="absolute rounded-full animate-particle"
                    style={{
                      width: p.size,
                      height: p.size,
                      background: p.color,
                      opacity: 0.35,
                      top: `calc(50% + ${p.y}px)`,
                      left: `calc(50% + ${p.x}px)`,
                      animationDelay: `${p.delay}s`,
                      animationDuration: `${p.duration}s`,
                    }}
                  />
                ))}

                {/* Service nodes */}
                {servicePositions.map((pos, i) => {
                  const ring = RINGS[pos.ring];
                  const delay = seededRandom(i * 17) * 5;
                  const duration = 4 + seededRandom(i * 7) * 3;
                  const rotDeg = seededRandom(i * 11) * 6 - 3;
                  const iconSize = Math.round(ring.size * 0.46);
                  const isHovered = hoveredService?.service.id === pos.service.id;

                  return (
                    <div
                      key={pos.service.id}
                      className="absolute z-10 group"
                      style={{
                        width: ring.size,
                        height: ring.size,
                        top: `calc(50% + ${pos.y}px - ${ring.size / 2}px)`,
                        left: `calc(50% + ${pos.x}px - ${ring.size / 2}px)`,
                        animation: `float-slow ${duration}s ease-in-out ${delay}s infinite`,
                      }}
                      onMouseEnter={(e) => handleServiceSelect(pos, e)}
                      onClick={(e) => handleServiceSelect(pos, e)}
                    >
                      {/* Glow ring on hover/tap */}
                      <div
                        className={`absolute -inset-1.5 rounded-full transition-opacity duration-300 ${
                          isHovered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                        style={{
                          background: `radial-gradient(circle, ${pos.service.color}44, transparent 70%)`,
                        }}
                      />

                      {/* Service circle badge with actual Icon/Logo */}
                      <motion.div
                        className="relative w-full h-full rounded-full flex items-center justify-center text-white cursor-pointer select-none"
                        style={{
                          background: `linear-gradient(135deg, ${pos.service.color}, ${pos.service.color}dd)`,
                          transform: `rotate(${rotDeg}deg)`,
                          boxShadow: `0 2px 10px ${pos.service.color}33`,
                        }}
                        whileHover={{
                          scale: 1.35,
                          zIndex: 50,
                          rotate: 0,
                          boxShadow: `0 4px 20px ${pos.service.color}55`,
                        }}
                        whileTap={{ scale: 1.35 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        <RenderServiceIcon iconName={pos.service.icon} size={iconSize} />
                      </motion.div>
                    </div>
                  );
                })}

                {/* Tooltip */}
                {hoveredService && (
                  <div
                    className="absolute z-50 pointer-events-none"
                    style={{
                      top: tooltipStyle.top,
                      left: tooltipStyle.left,
                      transform: 'translateX(-50%)',
                    }}
                  >
                    <div className="px-3 py-2 rounded-2xl bg-gray-900/95 text-white backdrop-blur-xl shadow-2xl border border-white/10 text-center max-w-[220px] sm:max-w-xs whitespace-normal">
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase mb-1">
                        <RenderServiceIcon iconName={hoveredService.service.icon} size={11} />
                        <span>{hoveredService.service.category}</span>
                      </div>
                      <p className="text-[11px] sm:text-xs font-bold text-white tracking-tight leading-snug">
                        {hoveredService.service.name}
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-gray-300 mt-0.5 leading-normal">
                        {hoveredService.service.description}
                      </p>
                    </div>
                    {/* Tooltip arrow */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 top-full w-2.5 h-2.5 rotate-45 bg-gray-900/95 border-r border-b border-white/10 -mt-1"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
