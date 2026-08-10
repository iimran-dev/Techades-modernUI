'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation, useCountUp } from './useScrollAnimation';
import { ArrowUpRight } from 'lucide-react';

const statsData = [
  {
    value: 40,
    suffix: '+',
    title: 'Total Experts',
    desc: 'Fullstack engineers, UI/UX designers & product specialists.',
  },
  {
    value: 12,
    suffix: '+ Yrs',
    title: 'Avg. Experience',
    desc: 'Senior domain leadership delivering high-performance systems.',
  },
  {
    value: 150,
    suffix: '+',
    title: 'Happy Clients',
    desc: 'Trusted by global startups and enterprise leaders.',
  },
  {
    value: 300,
    suffix: '+',
    title: 'Projects Delivered',
    desc: 'Production web apps, scalable backends & brand identities.',
  },
];

function StatMetric({ item }: { item: (typeof statsData)[number] }) {
  const counterRef = useCountUp(item.value, 2);

  return (
    <div className="flex flex-col justify-between">
      <div>
        <div className="flex items-baseline gap-0.5 sm:gap-1 text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          <span ref={counterRef}>0</span>
          <span className="gradient-text">{item.suffix}</span>
        </div>
        <h4 className="text-xs sm:text-sm font-semibold text-slate-200 mt-1.5 sm:mt-2 tracking-tight">
          {item.title}
        </h4>
        <p className="text-[10px] sm:text-xs text-slate-400 font-normal leading-relaxed mt-0.5 sm:mt-1 line-clamp-2">
          {item.desc}
        </p>
      </div>
    </div>
  );
}

export default function StatsSection() {
  const gridRef = useScrollAnimation({
    y: 30,
    opacity: 0,
    blur: 4,
    duration: 0.7,
  });

  return (
    <section className="relative py-8 sm:py-16 md:py-20 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Dark Glass Floating Card Container */}
      <div className="relative rounded-[2rem] sm:rounded-[2.5rem] bg-slate-950/95 backdrop-blur-2xl border border-slate-800/80 p-5 sm:p-8 md:p-10 shadow-2xl shadow-purple-950/20 overflow-hidden">
        {/* Background Ambient Glow Orbs */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header Row: Left Title & Right Action Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-10 pb-6 sm:pb-8 border-b border-slate-800/80 relative z-10">
          <div>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              We only deliver results.
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-normal mt-1">
              Engineered for speed, scalable code architectures, and high conversion.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href="#dna"
              className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-slate-700/80 text-slate-300 text-[11px] sm:text-xs font-semibold hover:bg-slate-900 transition-colors cursor-pointer"
            >
              Our DNA
            </a>
            <a
              href="#contact"
              className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-purple-600 text-white text-[11px] sm:text-xs font-semibold hover:bg-purple-500 shadow-md shadow-purple-500/20 transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>

        {/* Stats Metrics Horizontal Strip */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 relative z-10"
        >
          {statsData.map((item) => (
            <StatMetric key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
