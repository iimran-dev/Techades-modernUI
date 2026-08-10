'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { worldLocations, ACCENT } from './data';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Connection lines between India (hub) and each other location
const connections = [
  { from: 'India', to: 'Dubai' },
  { from: 'India', to: 'Qatar' },
  { from: 'India', to: 'Singapore' },
  { from: 'India', to: 'Malaysia' },
  { from: 'India', to: 'UK' },
  { from: 'India', to: 'USA' },
];

function getLocation(name: string) {
  return worldLocations.find((l) => l.name === name)!;
}

export default function WorldMap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate connection lines
    const lines = sectionRef.current.querySelectorAll('.connection-line');
    gsap.set(lines, { strokeDashoffset: 200 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(lines, {
          strokeDashoffset: 0,
          duration: 2,
          stagger: 0.15,
          ease: 'power2.inOut',
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) st.kill();
      });
    };
  }, []);

  // Generate dot grid
  const dots: { cx: number; cy: number }[] = [];
  for (let x = 5; x <= 95; x += 3) {
    for (let y = 5; y <= 90; y += 3) {
      dots.push({ cx: x, cy: y });
    }
  }

  return (
    <section ref={sectionRef} className="py-20 md:py-28 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="gradient-text">Where We Work</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Distributed team, connected globally
          </motion.p>
        </div>

        {/* Map Container */}
        <div className="relative w-full aspect-[2/1] md:aspect-[2.5/1] bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl md:rounded-3xl border border-slate-200/60 overflow-hidden shadow-sm">
          {/* Dot Grid Background */}
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {dots.map((dot, i) => (
              <circle
                key={i}
                cx={dot.cx}
                cy={dot.cy}
                r="0.25"
                fill="#cbd5e1"
                opacity="0.5"
              />
            ))}

            {/* Connection Lines */}
            {connections.map((conn, i) => {
              const from = getLocation(conn.from);
              const to = getLocation(conn.to);
              return (
                <line
                  key={i}
                  className="connection-line"
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={`url(#lineGrad${i % 3})`}
                  strokeWidth="0.3"
                  strokeDasharray="2 2"
                  fill="none"
                  opacity="0.4"
                />
              );
            })}

            {/* Gradient defs */}
            <defs>
              <linearGradient id="lineGrad0" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={ACCENT.purple} />
                <stop offset="100%" stopColor={ACCENT.blue} />
              </linearGradient>
              <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={ACCENT.blue} />
                <stop offset="100%" stopColor={ACCENT.cyan} />
              </linearGradient>
              <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={ACCENT.purple} />
                <stop offset="100%" stopColor={ACCENT.cyan} />
              </linearGradient>
            </defs>
          </svg>

          {/* Location Pins */}
          {worldLocations.map((loc, i) => (
            <motion.div
              key={loc.name}
              className="absolute group"
              style={{
                left: `${loc.x}%`,
                top: `${loc.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                type: 'spring',
                stiffness: 200,
              }}
              onMouseEnter={() => setHoveredPin(loc.name)}
              onMouseLeave={() => setHoveredPin(null)}
            >
              {/* Ripple */}
              <span
                className="absolute inset-0 rounded-full animate-ripple"
                style={{
                  background: ACCENT.purple,
                  width: loc.team > 5 ? 24 : 16,
                  height: loc.team > 5 ? 24 : 16,
                  left: '50%',
                  top: '50%',
                  marginLeft: -(loc.team > 5 ? 12 : 8),
                  marginTop: -(loc.team > 5 ? 12 : 8),
                }}
              />

              {/* Pin dot */}
              <div
                className="relative z-10 rounded-full border-2 border-white shadow-lg cursor-pointer transition-transform hover:scale-125"
                style={{
                  width: loc.team > 5 ? 16 : 10,
                  height: loc.team > 5 ? 16 : 10,
                  background: `linear-gradient(135deg, ${ACCENT.purple}, ${ACCENT.blue})`,
                }}
              />

              {/* Tooltip */}
              {hoveredPin === loc.name && (
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.9 }}
                  className="absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 rounded-xl glass shadow-lg whitespace-nowrap pointer-events-none"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{loc.flag}</span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{loc.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {loc.team} team members
                      </p>
                      <p className="text-[10px] text-muted-foreground/70">Collaborating remotely</p>
                    </div>
                  </div>
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 glass border-t-0 border-l-0"
                    style={{ marginTop: -1 }}
                  />
                </motion.div>
              )}
            </motion.div>
          ))}

          {/* Legend */}
          <div className="absolute bottom-3 right-4 md:bottom-4 md:right-6 glass rounded-lg px-3 py-2 flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: `linear-gradient(135deg, ${ACCENT.purple}, ${ACCENT.blue})` }}
              />
              <span className="text-xs text-muted-foreground hidden sm:inline">Office</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-0.5 border-t-2 border-dashed" style={{ borderColor: ACCENT.purple, opacity: 0.5 }} />
              <span className="text-xs text-muted-foreground hidden sm:inline">Connection</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
