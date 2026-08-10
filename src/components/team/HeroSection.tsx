'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { teamMembers, ACCENT, GRADIENT } from './data';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------- helpers ---------- */

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts[parts.length > 1 ? 1 : 0]?.[0] ?? '';
  return (first + last).toUpperCase();
}

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

interface AvatarPosition {
  member: (typeof teamMembers)[number];
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
  const [hoveredMember, setHoveredMember] = useState<AvatarPosition | null>(null);
  const [tooltipStyle, setTooltipStyle] = useState({ top: 0, left: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });

  /* --- compute avatar positions (memoised) --- */
  const avatarPositions = useMemo<AvatarPosition[]>(() => {
    const positions: AvatarPosition[] = [];
    let idx = 0;
    RINGS.forEach((ring, ringIdx) => {
      for (let i = 0; i < ring.count && idx < 36; i++, idx++) {
        const angle = (2 * Math.PI * i) / ring.count - Math.PI / 2;
        positions.push({
          member: teamMembers[idx],
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
    for (let i = 0; i < avatarPositions.length; i++) {
      for (let j = i + 1; j < avatarPositions.length; j++) {
        const a = avatarPositions[i];
        const b = avatarPositions[j];
        // only connect across adjacent rings or same ring neighbours
        if (Math.abs(a.ring - b.ring) > 1) continue;
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          lines.push({
            x1: a.x, y1: a.y,
            x2: b.x, y2: b.y,
            color: a.member.color,
          });
        }
      }
    }
    return lines;
  }, [avatarPositions]);

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

    const ctx = gsap.context(() => {
      // Left side
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -60, filter: 'blur(6px)' },
        {
          opacity: 1,
          x: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
          delay: 0.2,
        }
      );

      // Ecosystem
      gsap.fromTo(
        ecosystemRef.current,
        { opacity: 0, scale: 0.7, filter: 'blur(8px)' },
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

  /* --- Mouse parallax --- */
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

  /* --- Avatar hover --- */
  const handleAvatarHover = useCallback(
    (pos: AvatarPosition, e: React.MouseEvent) => {
      setHoveredMember(pos);
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const parentRect = ecosystemRef.current?.getBoundingClientRect();
      if (parentRect) {
        setTooltipStyle({
          top: rect.top - parentRect.top - 50,
          left: rect.left - parentRect.left + rect.width / 2,
        });
      }
    },
    []
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 30% 50%, rgba(108,76,241,0.04) 0%, rgba(0,194,255,0.02) 40%, transparent 70%), #fff',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* ===== LEFT CONTENT ===== */}
          <div
            ref={leftRef}
            className="flex-1 max-w-xl lg:max-w-lg text-center lg:text-left"
          >
            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold leading-[1.12] tracking-tight text-gray-900">
              Great Products Are Built By{' '}
              <span className="gradient-text">Great People.</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg text-gray-500 leading-relaxed max-w-md mx-auto lg:mx-0">
              40+ specialists working together across technologies, industries,
              and locations to build digital products that scale.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <motion.a
                href="#team"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-semibold text-sm shadow-lg"
                style={{
                  background: GRADIENT.purpleToOrange,
                  boxShadow:
                    '0 8px 30px rgba(108,76,241,0.3), 0 2px 8px rgba(255,122,50,0.2)',
                }}
              >
                <Sparkles className="w-4 h-4" />
                Meet Our Experts
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm border-2 text-gray-700 hover:text-gray-900 transition-colors"
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
              className="mt-10 inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass shadow-md"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span
                className="flex items-center justify-center w-9 h-9 rounded-full text-white text-xs font-bold"
                style={{ background: GRADIENT.purpleToBlue }}
              >
                40+
              </span>
              <span className="text-sm font-medium text-gray-700">
                Specialists
              </span>
              <span className="flex -space-x-2">
                {[ACCENT.purple, ACCENT.orange, ACCENT.cyan, ACCENT.blue].map(
                  (c, i) => (
                    <span
                      key={i}
                      className="w-6 h-6 rounded-full border-2 border-white"
                      style={{ background: c }}
                    />
                  )
                )}
              </span>
            </motion.div>
          </div>

          {/* ===== RIGHT – ECOSYSTEM ===== */}
          <div className="flex-1 flex items-center justify-center w-full lg:w-auto">
            <div
              ref={ecosystemRef}
              className="relative"
              style={{ width: 480, height: 480 }}
            >
              {/* Responsive scaling wrapper */}
              <div className="absolute inset-0 scale-[0.55] sm:scale-[0.7] md:scale-[0.85] lg:scale-100 origin-center transition-transform duration-300">
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
                    className="w-20 h-20 rounded-full flex items-center justify-center animate-glow"
                    style={{
                      background: GRADIENT.purpleToBlue,
                      boxShadow:
                        '0 0 30px rgba(108,76,241,0.35), 0 0 60px rgba(0,194,255,0.15)',
                    }}
                  >
                    <Image
                      src="/team/techades-logo.png"
                      alt="Techades"
                      width={48}
                      height={48}
                      className="rounded-full"
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

                {/* Avatar nodes */}
                {avatarPositions.map((pos, i) => {
                  const ring = RINGS[pos.ring];
                  const delay = seededRandom(i * 17) * 5;
                  const duration = 4 + seededRandom(i * 7) * 3;
                  const rotDeg = seededRandom(i * 11) * 6 - 3;

                  return (
                    <div
                      key={pos.member.id}
                      className="absolute z-10 group"
                      style={{
                        width: ring.size,
                        height: ring.size,
                        top: `calc(50% + ${pos.y}px - ${ring.size / 2}px)`,
                        left: `calc(50% + ${pos.x}px - ${ring.size / 2}px)`,
                        animation: `float-slow ${duration}s ease-in-out ${delay}s infinite`,
                      }}
                      onMouseEnter={(e) => handleAvatarHover(pos, e)}
                      onMouseLeave={() => setHoveredMember(null)}
                    >
                      {/* Glow ring on hover */}
                      <div
                        className="absolute -inset-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle, ${pos.member.color}44, transparent 70%)`,
                        }}
                      />

                      {/* Avatar circle */}
                      <motion.div
                        className="relative w-full h-full rounded-full flex items-center justify-center text-white font-bold cursor-pointer select-none"
                        style={{
                          background: `linear-gradient(135deg, ${pos.member.color}, ${pos.member.color}cc)`,
                          fontSize: ring.size * 0.32,
                          transform: `rotate(${rotDeg}deg)`,
                          boxShadow: `0 2px 10px ${pos.member.color}33`,
                        }}
                        whileHover={{
                          scale: 1.35,
                          zIndex: 50,
                          rotate: 0,
                          boxShadow: `0 4px 20px ${pos.member.color}55`,
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        {getInitials(pos.member.name)}
                      </motion.div>
                    </div>
                  );
                })}

                {/* Tooltip */}
                {hoveredMember && (
                  <div
                    className="absolute z-50 pointer-events-none"
                    style={{
                      top: tooltipStyle.top,
                      left: tooltipStyle.left,
                      transform: 'translateX(-50%)',
                    }}
                  >
                    <div className="px-3 py-2 rounded-xl glass shadow-lg text-center whitespace-nowrap">
                      <p className="text-sm font-semibold text-gray-900">
                        {hoveredMember.member.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {hoveredMember.member.role}
                      </p>
                    </div>
                    {/* Tooltip arrow */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 top-full w-2.5 h-2.5 rotate-45 glass shadow-sm -mt-1"
                      style={{ borderTop: 'none', borderRight: 'none' }}
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
