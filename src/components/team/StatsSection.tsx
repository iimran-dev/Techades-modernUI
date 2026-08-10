'use client';

import { motion } from 'framer-motion';
import { Users, Award, Handshake, FolderOpen, Globe, Layers, type LucideIcon } from 'lucide-react';
import { stats, ACCENT } from './data';
import { useScrollAnimation, useCountUp } from './useScrollAnimation';

/* ---------- icon map ---------- */
const ICON_MAP: Record<string, LucideIcon> = {
  Users,
  Award,
  Handshake,
  FolderOpen,
  Globe,
  Layers,
};

/* ---------- stat card colors (cycled) ---------- */
const CARD_ACCENTS = [
  { from: ACCENT.purple, to: ACCENT.blue },
  { from: ACCENT.blue, to: ACCENT.cyan },
  { from: ACCENT.cyan, to: ACCENT.orange },
  { from: ACCENT.orange, to: ACCENT.purple },
  { from: ACCENT.purple, to: ACCENT.cyan },
  { from: ACCENT.blue, to: ACCENT.orange },
];

/* ---------- individual stat card ---------- */
function StatCard({
  stat,
  index,
}: {
  stat: (typeof stats)[number];
  index: number;
}) {
  const counterRef = useCountUp(stat.value, 2);
  const Icon = ICON_MAP[stat.icon] ?? Users;
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];

  return (
    <motion.div
      className="gradient-border group relative rounded-3xl bg-white p-6 sm:p-8 shadow-sm transition-shadow duration-300 hover:shadow-xl"
      whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 24 } }}
    >
      {/* Icon badge */}
      <div
        className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-2xl text-white"
        style={{
          background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
          boxShadow: `0 4px 16px ${accent.from}33`,
        }}
      >
        <Icon className="w-5 h-5" />
      </div>

      {/* Value + suffix */}
      <div className="flex items-baseline gap-1">
        <span
          ref={counterRef}
          className="text-3xl sm:text-4xl font-bold text-gray-900 tabular-nums"
        >
          0
        </span>
        <span
          className="text-2xl sm:text-3xl font-bold"
          style={{
            background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {stat.suffix}
        </span>
      </div>

      {/* Label */}
      <p className="mt-1.5 text-sm text-gray-500 font-medium leading-snug">
        {stat.label}
      </p>

      {/* Decorative corner glow on hover */}
      <div
        className="absolute -top-px -right-px w-24 h-24 rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${accent.from}18, transparent 70%)`,
        }}
      />
      <div
        className="absolute -bottom-px -left-px w-24 h-24 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at bottom left, ${accent.to}18, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}

/* ========== Main Section ========== */

export default function StatsSection() {
  const gridRef = useScrollAnimation({
    y: 50,
    opacity: 0,
    blur: 4,
    duration: 0.7,
    stagger: 0.1,
  });

  return (
    <section className="relative py-20 sm:py-28 bg-gradient-to-b from-white to-gray-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase mb-3 gradient-text-warm">
            By The Numbers
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Our Track Record Speaks
          </h2>
        </div>

        {/* Stats grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
