'use client';

import { motion } from 'framer-motion';
import {
  Heart, ShoppingCart, Wallet, Factory, Landmark, HardHat,
  GraduationCap, Building2, Truck, Hotel, ArrowUpRight, Sparkles, ShieldCheck, Zap, CheckCircle2
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useScrollAnimation } from './useScrollAnimation';

const iconMap: Record<string, LucideIcon> = {
  Heart, ShoppingCart, Wallet, Factory, Landmark, HardHat,
  GraduationCap, Building2, Truck, Hotel,
};

export default function DomainExpertise() {
  const headingRef = useScrollAnimation({ y: 40, blur: 4, duration: 0.7 });

  return (
    <section className="relative py-14 sm:py-24 md:py-28 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Outer Soft Light Ambient Accent Orbs */}
      <div className="absolute top-1/4 -left-32 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-gradient-to-tr from-purple-400/10 via-indigo-300/10 to-pink-300/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 -right-32 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-gradient-to-bl from-cyan-400/10 via-blue-300/10 to-purple-300/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Dark Blurred Glass Container Drop for Section Differentiation */}
        <div className="relative rounded-[2.5rem] bg-slate-950/95 backdrop-blur-2xl border border-slate-800/80 p-5 sm:p-8 md:p-12 shadow-2xl shadow-purple-950/20 overflow-hidden">
          {/* Ambient Glowing Color Orbs Inside Dark Backdrop */}
          <div className="absolute -top-32 -left-32 w-[450px] h-[450px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-[450px] h-[450px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

          {/* Header */}
          <div ref={headingRef} className="text-center mb-10 sm:mb-14 md:mb-16 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] sm:text-xs font-medium tracking-wide mb-3.5 shadow-xs">
              <Sparkles size={13} className="text-purple-400" />
              <span>Vertical Specializations</span>
            </div>
            <motion.h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3 sm:mb-4 text-white">
              Domain <span className="gradient-text">Mastery</span>
            </motion.h2>
            <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-1 font-normal">
              Deep domain knowledge combined with enterprise-grade engineering standards across key global industries.
            </p>
          </div>

          {/* High-Design Artistic Bento Grid (High Contrast on Dark Backdrop) */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4.5 relative z-10">
            {/* Card 1: Fintech (Top Wide Cream Hero Tile - Spans 2 Cols) */}
            <motion.div
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              className="md:col-span-2 rounded-3xl bg-[#FAF8F5] border border-stone-200/80 p-6 sm:p-8 flex flex-col justify-between group hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden cursor-pointer"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#064E3B] text-white flex items-center justify-center shadow-xs">
                    <Wallet size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#064E3B] tracking-tight">
                      Fintech Systems
                    </h3>
                    <span className="text-xs text-stone-500 font-medium">10+ Yrs Experience • Primary Core</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#064E3B]/10 text-[#064E3B]">
                  $500M+ Volume
                </span>
              </div>

              <p className="text-stone-700 text-sm sm:text-base font-medium leading-relaxed mb-6">
                High-performance payment gateways, automated PCI-DSS L1 compliance & AI-driven fraud detection engines.
              </p>

              <div className="flex items-center gap-2 flex-wrap text-xs font-semibold">
                <span className="px-3 py-1 rounded-xl bg-white border border-stone-200/70 text-stone-700 shadow-2xs">
                  PCI-DSS L1
                </span>
                <span className="px-3 py-1 rounded-xl bg-white border border-stone-200/70 text-stone-700 shadow-2xs">
                  Open Banking API
                </span>
                <span className="px-3 py-1 rounded-xl bg-[#064E3B] text-white shadow-2xs">
                  Real-Time Ledger
                </span>
              </div>
            </motion.div>

            {/* Card 2: Healthcare (Dark Emerald Accent Tile) */}
            <motion.div
              whileHover={{ scale: 1.035, y: -4 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              className="rounded-3xl bg-[#064E3B] text-white border border-emerald-600/40 p-6 sm:p-7 flex flex-col justify-between group hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-emerald-300">
                    <Heart size={18} />
                  </div>
                  <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300">
                    1.2M+ Patients
                  </span>
                </div>
                <h3 className="text-lg font-bold tracking-tight mb-2 text-white">
                  Healthcare & AI
                </h3>
                <p className="text-emerald-100/80 text-xs leading-relaxed font-normal mb-4">
                  HIPAA-compliant Telehealth platforms, EHR data bridges & IoMT diagnostic sync.
                </p>
              </div>
              <div className="pt-3 border-t border-emerald-700/60 flex items-center justify-between text-xs text-emerald-300 font-medium">
                <span>HIPAA Compliant</span>
                <ArrowUpRight size={15} />
              </div>
            </motion.div>

            {/* Card 3: Retail (Bold Coral Crimson Accent Tile with Inset Pill) */}
            <motion.div
              whileHover={{ scale: 1.035, y: -4 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              className="rounded-3xl bg-[#E11D48] text-white border border-rose-500/40 p-6 flex flex-col justify-between group hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-rose-100">
                    <ShoppingCart size={18} />
                  </div>
                  <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-white/20 text-white">
                    2.5M+ SKUs
                  </span>
                </div>
                <h3 className="text-lg font-bold tracking-tight mb-1 text-white">
                  Headless Retail
                </h3>

                {/* Inset White Pill Card */}
                <div className="mt-3 p-3.5 rounded-2xl bg-white text-rose-900 shadow-sm">
                  <p className="text-xs font-semibold leading-tight">
                    Omnichannel e-commerce & AI-driven customer personalization engines.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between text-xs font-medium text-rose-100">
                <span>Headless Architecture</span>
                <ArrowUpRight size={15} />
              </div>
            </motion.div>

            {/* Card 4: Logistics (Tall Vertical Spotlight Tile - Spans 2 Rows on Desktop) */}
            <motion.div
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              className="md:row-span-2 rounded-3xl bg-[#F0FDF4] border border-emerald-200/80 p-6 sm:p-7 flex flex-col justify-between group hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden cursor-pointer"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#064E3B] text-white flex items-center justify-center mb-5 shadow-xs">
                  <Truck size={20} />
                </div>
                <h3 className="text-xl font-bold text-[#064E3B] tracking-tight mb-2">
                  IoT Logistics & Fleet
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm font-normal leading-relaxed mb-6">
                  Real-time GPS fleet telemetry, automated route AI & warehouse management sync.
                </p>

                {/* Floating Telemetry Status Chips */}
                <div className="space-y-2 mb-6">
                  <div className="p-3 rounded-2xl bg-white border border-emerald-100 shadow-2xs flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-700">On-Time Rate</span>
                    <span className="font-bold text-[#064E3B]">99.4%</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white border border-emerald-100 shadow-2xs flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-700">Fleet Coverage</span>
                    <span className="font-bold text-[#064E3B]">IoT Telemetry</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#064E3B] text-white text-xs font-semibold flex items-center justify-between">
                <span>WMS AI Automation</span>
                <CheckCircle2 size={16} className="text-emerald-300" />
              </div>
            </motion.div>

            {/* Card 5: Real Estate (Compact Minimal Slate Tile) */}
            <motion.div
              whileHover={{ scale: 1.04, y: -4 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              className="rounded-3xl bg-[#FAF8F5] border border-stone-200/80 p-6 flex flex-col justify-between group hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Building2 size={18} />
                </div>
                <span className="text-[11px] font-semibold text-stone-500">
                  $1.5B+ Portfolio
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900 mb-1">
                  PropTech & Real Estate
                </h3>
                <p className="text-xs text-stone-500 font-normal leading-relaxed">
                  Smart portals, automated lease contracts & valuation AI.
                </p>
              </div>
            </motion.div>

            {/* Card 6: Manufacturing (Dark Indigo Industry 4.0 Tile) */}
            <motion.div
              whileHover={{ scale: 1.04, y: -4 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              className="rounded-3xl bg-[#1E1B4B] text-white border border-indigo-700/50 p-6 flex flex-col justify-between group hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 text-indigo-300 flex items-center justify-center">
                  <Factory size={18} />
                </div>
                <span className="text-[11px] font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">
                  +24% Uptime
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  Smart Manufacturing
                </h3>
                <p className="text-xs text-indigo-200/80 font-normal leading-relaxed">
                  Industry 4.0 factory sensors, predictive SCADA maintenance.
                </p>
              </div>
            </motion.div>

            {/* Card 7: Government (Zero-Trust Security Ice Blue Tile) */}
            <motion.div
              whileHover={{ scale: 1.04, y: -4 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              className="rounded-3xl bg-[#F0F9FF] border border-sky-200/80 p-6 flex flex-col justify-between group hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
                  <Landmark size={18} />
                </div>
                <span className="text-[11px] font-semibold text-sky-700 bg-sky-100/70 px-2 py-0.5 rounded-full">
                  5M+ Citizens
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-sky-950 mb-1">
                  e-Governance & Security
                </h3>
                <p className="text-xs text-sky-800/80 font-normal leading-relaxed">
                  FedRAMP portals & zero-trust cloud infrastructure.
                </p>
              </div>
            </motion.div>

            {/* Card 8: Education (Soft Lilac Tile) */}
            <motion.div
              whileHover={{ scale: 1.04, y: -4 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              className="rounded-3xl bg-[#F3E8FF] border border-purple-200/80 p-6 flex flex-col justify-between group hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-purple-200/70 text-purple-800 flex items-center justify-center">
                  <GraduationCap size={18} />
                </div>
                <span className="text-[11px] font-semibold text-purple-700">
                  350K+ Students
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-purple-950 mb-1">
                  EdTech & LMS Platforms
                </h3>
                <p className="text-xs text-purple-800/80 font-normal leading-relaxed">
                  Adaptive AI learning & WebRTC video classrooms.
                </p>
              </div>
            </motion.div>

            {/* Card 9: Construction (BIM 3D Sync Warm Amber Tile) */}
            <motion.div
              whileHover={{ scale: 1.04, y: -4 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              className="rounded-3xl bg-[#FFF7ED] border border-orange-200/80 p-6 flex flex-col justify-between group hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center">
                  <HardHat size={18} />
                </div>
                <span className="text-[11px] font-semibold text-orange-700">
                  120+ Job Sites
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-orange-950 mb-1">
                  Construction & BIM
                </h3>
                <p className="text-xs text-orange-800/80 font-normal leading-relaxed">
                  BIM 3D telemetry & site safety vision AI.
                </p>
              </div>
            </motion.div>

            {/* Card 10: Hospitality (Soft Rose Tile) */}
            <motion.div
              whileHover={{ scale: 1.04, y: -4 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              className="rounded-3xl bg-[#FFF1F2] border border-rose-200/80 p-6 flex flex-col justify-between group hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                  <Hotel size={18} />
                </div>
                <span className="text-[11px] font-semibold text-rose-700">
                  800K+ Guest Stays
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-rose-950 mb-1">
                  Hospitality & PMS
                </h3>
                <p className="text-xs text-rose-800/80 font-normal leading-relaxed">
                  Contactless guest stays & hotel PMS integrations.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
