'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight, Clock, Sparkles, FolderOpen, Layers, CheckCircle2, ChevronRight, LayoutGrid, RotateCcw, ExternalLink, Code2, Laptop
} from 'lucide-react';
import { useScrollAnimation } from './useScrollAnimation';

/* Default UI Wireframe Placeholders */
function HeroPlaceholder({ category, title }: { category: string; title: string }) {
  return (
    <div className="relative w-full aspect-16/9 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-950 via-stone-900 to-indigo-950 border border-stone-700/60 shadow-inner flex flex-col justify-between p-4 sm:p-5 select-none group">
      {/* Mock Browser Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <span className="text-[10px] font-mono text-stone-400 bg-white/5 px-2.5 py-0.5 rounded-md border border-white/10">
          https://techades.com/work/{category.toLowerCase().replace(/[^a-z0-9]/g, '-')}
        </span>
      </div>

      {/* Wireframe UI Content Body */}
      <div className="my-auto flex flex-col items-center justify-center text-center p-2">
        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3 shadow-lg group-hover:scale-110 transition-transform">
          <Laptop size={24} />
        </div>
        <h4 className="text-sm sm:text-base font-bold text-white tracking-wider uppercase">
          {title}
        </h4>
        <span className="text-[10px] font-mono text-stone-400 mt-1">
          PROJECT ARCHITECTURE PREVIEW
        </span>
      </div>

      {/* Wireframe UI Footer Bars */}
      <div className="grid grid-cols-3 gap-2">
        <div className="h-2 rounded-full bg-white/10" />
        <div className="h-2 rounded-full bg-purple-500/30" />
        <div className="h-2 rounded-full bg-white/10" />
      </div>
    </div>
  );
}

function ThumbnailPlaceholder({ label }: { label: string }) {
  return (
    <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200 border border-stone-200 flex flex-col items-center justify-center text-stone-400 group-hover:border-purple-300 transition-colors p-2 text-center select-none">
      <Layers size={16} className="mb-1 text-stone-400 group-hover:text-purple-600 transition-colors" />
      <span className="text-[9px] font-mono font-bold tracking-tight uppercase text-stone-500">
        {label}
      </span>
    </div>
  );
}

function TimelinePlaceholder({ isActive, title }: { isActive: boolean; title: string }) {
  return (
    <div className={`relative aspect-3/4 w-full rounded-xl overflow-hidden border p-3 flex flex-col justify-between select-none transition-colors ${
      isActive
        ? 'bg-gradient-to-b from-purple-950 via-stone-900 to-slate-950 border-purple-500/40 text-white'
        : 'bg-gradient-to-b from-stone-100 to-stone-200/90 border-stone-200 text-stone-600'
    }`}>
      <div className="flex items-center justify-between">
        <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-purple-400' : 'bg-stone-300'}`} />
        <span className={`text-[9px] font-mono ${isActive ? 'text-purple-300' : 'text-stone-400'}`}>UI MOCK</span>
      </div>
      <div className="my-auto text-center">
        <FolderOpen size={20} className={`mx-auto mb-1.5 ${isActive ? 'text-purple-400' : 'text-stone-400'}`} />
        <div className={`h-1.5 w-12 mx-auto rounded-full ${isActive ? 'bg-purple-400/40' : 'bg-stone-300'}`} />
      </div>
      <div className="space-y-1">
        <div className={`h-1 rounded-full ${isActive ? 'bg-white/20' : 'bg-stone-300'}`} />
        <div className={`h-1 w-2/3 rounded-full ${isActive ? 'bg-purple-400/30' : 'bg-stone-300'}`} />
      </div>
    </div>
  );
}

const projects = [
  {
    id: '01',
    title: 'APEX FINTECH PLATFORM',
    highlightWord: 'FINTECH',
    year: '2026',
    category: 'Fintech & Payment Engine',
    description: 'High-throughput payment orchestration engine, automated PCI-DSS L1 compliance & AI fraud detection processing $500M+ in real-time volume.',
    tags: ['PCI-DSS L1', 'Open Banking', 'Real-Time Ledger'],
    timeline: '18 Months',
    impact: '$500M+ Volume',
  },
  {
    id: '02',
    title: 'MEDICARE AI TELEHEALTH',
    highlightWord: 'TELEHEALTH',
    year: '2025',
    category: 'Healthcare & AI Diagnostics',
    description: 'HIPAA-compliant video consultation platform, real-time EHR data bridges & IoMT diagnostic telemetry serving over 1.2M+ active patients.',
    tags: ['HIPAA Certified', 'EHR Bridge', 'IoMT Sync'],
    timeline: '12 Months',
    impact: '1.2M+ Patients',
  },
  {
    id: '03',
    title: 'NEXUS HEADLESS STORE',
    highlightWord: 'HEADLESS',
    year: '2025',
    category: 'Omnichannel E-Commerce',
    description: 'Ultra-fast Next.js headless e-commerce architecture featuring AI personalization, instant search & automated multi-warehouse routing.',
    tags: ['Next.js 15', 'Shopify Plus', 'AI Search'],
    timeline: '9 Months',
    impact: '2.5M+ SKUs',
  },
  {
    id: '04',
    title: 'OMNITRACK IOT FLEET',
    highlightWord: 'IOT FLEET',
    year: '2024',
    category: 'Logistics & WMS Telemetry',
    description: 'Real-time GPS fleet tracking, automated route optimization AI & smart warehouse management sync connecting over 120 global hubs.',
    tags: ['IoT Sensors', 'Route AI', 'WMS Sync'],
    timeline: '14 Months',
    impact: '99.4% On-Time',
  },
];

export default function ProjectsShowcase() {
  const headingRef = useScrollAnimation({ y: 30, blur: 4, duration: 0.7 });
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
    setActiveProject(projects[idx]);
  };

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden bg-[#F6F5F2] my-8 sm:my-12 rounded-[2.5rem] border border-stone-200/80 shadow-xs">
      {/* Huge Background Watermark Overlay Text */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[12vw] font-black text-stone-300/20 select-none pointer-events-none tracking-widest uppercase whitespace-nowrap z-0">
        SELECTED WORKS
      </div>
      <div className="absolute bottom-6 right-8 text-[10vw] font-black text-stone-300/15 select-none pointer-events-none tracking-tighter uppercase whitespace-nowrap z-0">
        PROJECTS
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-900 text-white text-[11px] sm:text-xs font-semibold tracking-wider uppercase mb-3 shadow-xs">
            <Sparkles size={12} className="text-amber-400" />
            <span>Featured Portfolio // Architecture & Code</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 uppercase">
            FLAGSHIP <span className="gradient-text">PROJECTS</span>
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto font-normal leading-relaxed">
            Engineering excellence delivered across enterprise fintech, telehealth, headless commerce, and IoT solutions.
          </p>
        </div>

        {/* ============================================================ */}
        {/* TOP EDITORIAL SHOWCASE (3D Angled Layout matching reference image) */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-12">
          {/* Left Column: Techades Portfolio Hero & Action Card (Spans 5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 rounded-3xl bg-white border border-stone-200/90 p-6 sm:p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.06)] relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-purple-300"
          >
            {/* Soft Ambient Light Gradient Accent */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Header Label */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-[11px] font-mono font-bold tracking-widest text-stone-400 uppercase">
                  // PORTFOLIO DIRECTORY
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Huge Bold Title */}
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight leading-none mb-3 uppercase">
                TECHADES <span className="text-purple-600 font-extrabold">ENGINEERING</span>
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-purple-600 uppercase tracking-widest mb-6">
                PRODUCTION-GRADE DIGITAL PRODUCTS
              </p>

              <p className="text-stone-600 text-xs sm:text-sm font-normal leading-relaxed mb-6">
                We design and engineer high-stakes web platforms, real-time microservices, and AI engines tailored to scale seamlessly under heavy enterprise workloads.
              </p>

              {/* Inline Thumbnails Gallery (Default Placeholders) */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {['ARCH', 'UI/UX', 'STACK'].map((label, idx) => (
                  <ThumbnailPlaceholder key={idx} label={label} />
                ))}
              </div>
            </div>

            {/* Action Buttons (Pill buttons matching reference image) */}
            <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-purple-700 transition-colors shadow-xs"
              >
                <span>Get In Touch</span>
                <ArrowUpRight size={14} />
              </a>
              <button
                onClick={() => setSelectedIdx((selectedIdx + 1) % projects.length)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-100 border border-stone-300/80 text-stone-800 text-xs font-semibold hover:bg-white hover:border-purple-300 transition-all cursor-pointer"
              >
                <span>Next Project</span>
                <LayoutGrid size={14} />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Active Project Large Showcase Card (Spans 7 cols - Styled like reference image) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 rounded-3xl bg-white border border-stone-200/90 p-6 sm:p-8 flex flex-col justify-between shadow-[0_25px_60px_rgba(0,0,0,0.07)] relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-purple-300"
          >
            {/* Top Bar: Section tag + Large Number + Year Badge */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-stone-400 uppercase block mb-1">
                  PROJECTS
                </span>
                <span className="text-4xl sm:text-5xl font-mono font-bold text-stone-300 leading-none">
                  {activeProject.id}.
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-stone-400 bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
                / {activeProject.year}
              </span>
            </div>

            {/* Title with Highlight Word */}
            <div className="mb-4">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight uppercase">
                {activeProject.title.replace(activeProject.highlightWord, '')}
                <span className="text-[#FF7A32] font-extrabold"> {activeProject.highlightWord}</span>
              </h3>
              <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider block mt-1">
                {activeProject.category}
              </span>
            </div>

            {/* Main Hero Placeholder */}
            <div className="relative mb-6">
              <HeroPlaceholder category={activeProject.category} title={activeProject.title} />
              <div className="mt-2.5 flex items-center justify-between text-stone-600 text-xs font-medium">
                <span className="px-2.5 py-1 rounded-lg bg-stone-100 border border-stone-200">
                  {activeProject.impact}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-stone-100 border border-stone-200">
                  Timeline: {activeProject.timeline}
                </span>
              </div>
            </div>

            {/* Description Paragraph */}
            <p className="text-stone-600 text-xs sm:text-sm font-medium leading-relaxed mb-6">
              {activeProject.description}
            </p>

            {/* Tag Pills Grid */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-stone-100">
              <div className="flex items-center gap-1.5 flex-wrap">
                {activeProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-xl bg-stone-100 text-stone-800 text-[11px] font-semibold border border-stone-200/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href="#contact"
                className="w-9 h-9 rounded-full bg-stone-900 text-white flex items-center justify-center hover:bg-purple-600 transition-colors shadow-xs flex-shrink-0"
                aria-label="View Project Details"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* ============================================================ */}
        {/* BOTTOM ROW: PROJECTS TIMELINE + TIMESCALES (Exact replica of image) */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Projects Timeline Strip (Spans 8 cols - 3 Tall Vertical Cards) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-8 rounded-3xl bg-white border border-stone-200/90 p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex flex-col justify-between"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-stone-100">
              <div>
                <h4 className="text-base sm:text-lg font-bold text-stone-900 uppercase tracking-tight">
                  PROJECTS TIMELINE
                </h4>
                <span className="text-[11px] text-stone-500 font-medium">Click any project to inspect details</span>
              </div>
              <button
                onClick={() => setSelectedIdx(0)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold hover:bg-stone-200 transition-colors cursor-pointer border border-stone-200"
              >
                <RotateCcw size={13} />
                <span>Reset View</span>
              </button>
            </div>

            {/* 3 Column Interactive Project Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {projects.slice(0, 3).map((proj, idx) => {
                const isActive = selectedIdx === idx;
                return (
                  <motion.div
                    key={proj.id}
                    onClick={() => handleSelect(idx)}
                    whileHover={{ scale: 1.02 }}
                    className={`rounded-2xl border p-3.5 flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                      isActive
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xl'
                        : 'bg-stone-50 text-stone-900 border-stone-200/80 hover:border-purple-300 hover:bg-white'
                    }`}
                  >
                    {/* Top Index & Year */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xl font-mono font-bold ${isActive ? 'text-purple-400' : 'text-stone-300'}`}>
                        {proj.id}.
                      </span>
                      <span className={`text-[10px] font-mono font-medium ${isActive ? 'text-stone-400' : 'text-stone-500'}`}>
                        {proj.year}
                      </span>
                    </div>

                    {/* Tall Vertical Mockup Placeholder */}
                    <div className="mb-3">
                      <TimelinePlaceholder isActive={isActive} title={proj.title} />
                    </div>

                    {/* Card Label */}
                    <div>
                      <h5 className={`text-xs font-bold uppercase tracking-tight line-clamp-1 ${isActive ? 'text-white' : 'text-stone-900'}`}>
                        {proj.title}
                      </h5>
                      <p className={`text-[10px] truncate mt-0.5 ${isActive ? 'text-stone-400' : 'text-stone-500'}`}>
                        {proj.category}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Dark Contrast TIMESCALES Card (Spans 4 cols - Replica of dark timescales card in image) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4 rounded-3xl bg-[#0F172A] text-white border border-slate-800 p-6 sm:p-7 flex flex-col justify-between shadow-2xl relative overflow-hidden"
          >
            {/* Top Orange Accent Line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#FF7A32] to-[#6C4CF1]" />

            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-[#FF7A32]">
                  <Clock size={18} />
                </div>
                <h4 className="text-lg font-bold text-white uppercase tracking-wider">
                  TIMESCALES
                </h4>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                Every project follows strict agile sprint milestones, from initial discovery & architectural design to high-throughput deployment, automated testing, and SLA maintenance.
              </p>

              {/* Progress Milestones Checklist */}
              <div className="space-y-3 mb-6">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#FF7A32]" />
                    <span className="font-semibold text-slate-200">Architecture Phase</span>
                  </div>
                  <span className="text-[11px] text-slate-400">Weeks 1-4</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#00C2FF]" />
                    <span className="font-semibold text-slate-200">Fullstack Sprints</span>
                  </div>
                  <span className="text-[11px] text-slate-400">Weeks 5-16</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-400" />
                    <span className="font-semibold text-slate-200">Audit & Deployment</span>
                  </div>
                  <span className="text-[11px] text-slate-400">Production Ready</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-medium">
              <span>Agile Velocity Engine</span>
              <span className="text-[#FF7A32] font-semibold">100% On-Time Delivery</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

