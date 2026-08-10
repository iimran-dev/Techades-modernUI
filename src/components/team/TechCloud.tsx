'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { techStack, ACCENT } from './data';

// Deterministic expert count per tech
const expertCounts: Record<string, number> = {};
const seed = [8, 12, 15, 9, 7, 10, 11, 13, 14, 8, 9, 12, 13, 7, 8, 6, 7, 10, 9, 8, 11, 7, 10, 9];
techStack.forEach((tech, i) => {
  expertCounts[tech] = seed[i % seed.length];
});

// Larger pills for major technologies
const largeTechs = new Set(['React', 'Node.js', 'Python', 'Next.js', 'AWS', 'TypeScript']);
const mediumTechs = new Set(['Flutter', 'Docker', 'Azure', 'Go', 'Kubernetes', 'GraphQL']);

// Scattered positions as percentage offsets and random-ish float params
const positions = [
  { x: 5, y: 8, delay: 0, dur: 6, dx: 8, dy: -5 },
  { x: 35, y: 3, delay: 0.5, dur: 7, dx: -6, dy: 7 },
  { x: 62, y: 10, delay: 1, dur: 5.5, dx: 5, dy: -8 },
  { x: 85, y: 5, delay: 0.3, dur: 8, dx: -7, dy: 6 },
  { x: 15, y: 28, delay: 1.2, dur: 6.5, dx: 9, dy: -4 },
  { x: 48, y: 25, delay: 0.7, dur: 7.5, dx: -5, dy: 9 },
  { x: 75, y: 30, delay: 0.2, dur: 6, dx: 6, dy: -7 },
  { x: 2, y: 48, delay: 1.5, dur: 8, dx: -8, dy: 5 },
  { x: 30, y: 50, delay: 0.8, dur: 5.5, dx: 7, dy: -6 },
  { x: 58, y: 52, delay: 0.4, dur: 7, dx: -9, dy: 8 },
  { x: 88, y: 45, delay: 1.1, dur: 6.5, dx: 5, dy: -5 },
  { x: 20, y: 72, delay: 0.6, dur: 7.5, dx: -6, dy: 7 },
  { x: 45, y: 75, delay: 1.3, dur: 6, dx: 8, dy: -8 },
  { x: 72, y: 70, delay: 0.9, dur: 8, dx: -7, dy: 6 },
  { x: 5, y: 90, delay: 0.1, dur: 5.5, dx: 9, dy: -5 },
  { x: 38, y: 92, delay: 1.4, dur: 7, dx: -5, dy: -7 },
  { x: 65, y: 88, delay: 0.5, dur: 6.5, dx: 6, dy: 8 },
  { x: 90, y: 85, delay: 0.8, dur: 7.5, dx: -8, dy: -6 },
  { x: 25, y: 15, delay: 1.6, dur: 8, dx: 4, dy: 6 },
  { x: 55, y: 38, delay: 0.3, dur: 6, dx: -6, dy: -5 },
  { x: 80, y: 60, delay: 1, dur: 7, dx: 7, dy: 4 },
  { x: 10, y: 60, delay: 0.7, dur: 5.5, dx: -5, dy: -8 },
  { x: 42, y: 65, delay: 1.2, dur: 6.5, dx: 8, dy: 7 },
  { x: 70, y: 18, delay: 0.4, dur: 7.5, dx: -9, dy: -6 },
];

// Color per tech
const techColors: Record<string, string> = {
  React: '#61DAFB',
  'Next.js': '#000000',
  'Node.js': '#339933',
  PHP: '#777BB4',
  Flutter: '#02569B',
  Azure: '#0078D4',
  Docker: '#2496ED',
  OpenAI: '#412991',
  Python: '#3776AB',
  Laravel: '#FF2D20',
  '.NET': '#512BD4',
  TypeScript: '#3178C6',
  AWS: '#FF9900',
  'Vue.js': '#4FC08D',
  Angular: '#DD0031',
  Swift: '#FA7343',
  Kotlin: '#7F52FF',
  Go: '#00ADD8',
  GraphQL: '#E10098',
  MongoDB: '#47A248',
  PostgreSQL: '#4169E1',
  Redis: '#DC382D',
  Kubernetes: '#326CE5',
  Terraform: '#7B42BC',
};

export default function TechCloud() {
  const [hovered, setHovered] = useState<string | null>(null);

  const pills = useMemo(
    () =>
      techStack.map((tech, i) => {
        const pos = positions[i % positions.length];
        const isLarge = largeTechs.has(tech);
        const isMedium = mediumTechs.has(tech);
        const color = techColors[tech] || ACCENT.purple;

        return { tech, pos, isLarge, isMedium, color, experts: expertCounts[tech] || 8 };
      }),
    []
  );

  return (
    <section className="py-20 md:py-28 px-4 md:px-8">
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
            <span className="gradient-text">Our Technology Arsenal</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Mastery across the modern stack
          </motion.p>
        </div>

        {/* Pills Cloud */}
        <div className="relative min-h-[420px] md:min-h-[500px]">
          {pills.map((pill, i) => (
            <motion.div
              key={pill.tech}
              className="absolute cursor-pointer"
              style={{ left: `${pill.pos.x}%`, top: `${pill.pos.y}%` }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05, type: 'spring', stiffness: 150 }}
              onMouseEnter={() => setHovered(pill.tech)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Floating pill */}
              <div
                className="relative rounded-full border border-slate-200/80 bg-white/90 backdrop-blur-sm shadow-sm flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 transition-all duration-300"
                style={{
                  fontSize: pill.isLarge ? '0.95rem' : pill.isMedium ? '0.85rem' : '0.75rem',
                  fontWeight: pill.isLarge ? 600 : 500,
                  animation: `float-slow ${pill.pos.dur}s ease-in-out ${pill.pos.delay}s infinite`,
                  boxShadow: hovered === pill.tech
                    ? `0 0 20px ${pill.color}40, 0 0 40px ${pill.color}20`
                    : 'none',
                  borderColor: hovered === pill.tech ? pill.color + '60' : undefined,
                }}
              >
                {/* Color dot */}
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: pill.color }}
                />
                <span className="text-foreground whitespace-nowrap">{pill.tech}</span>
              </div>

              {/* Hover tooltip */}
              {hovered === pill.tech && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute z-30 left-1/2 -translate-x-1/2 bottom-full mb-2 px-2.5 py-1 rounded-lg glass shadow-lg text-xs font-medium text-foreground whitespace-nowrap pointer-events-none"
                >
                  {pill.experts} Experts
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 glass border-t-0 border-l-0"
                    style={{ marginTop: -1 }}
                  />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
