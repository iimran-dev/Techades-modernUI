'use client';

import { motion } from 'framer-motion';
import {
  Code, GitCommit, Rocket, Video, Coffee, Moon,
  Github, Linkedin, Twitter, Mail, ArrowRight,
} from 'lucide-react';
import { certifications, funStats, ACCENT, GRADIENT } from './data';
import { useCountUp, useScrollAnimation } from './useScrollAnimation';
import type { LucideIcon } from 'lucide-react';

// ─── ICON MAP ────────────────────────────────────────────
const iconMap: Record<string, LucideIcon> = {
  Code, GitCommit, Rocket, Video, Coffee, Moon,
};

// ═══════════════════════════════════════════════════════════
// 5a. CERTIFICATIONS
// ═══════════════════════════════════════════════════════════
export function Certifications() {
  const ref = useScrollAnimation({ stagger: 0.08, y: 30, blur: 4 });

  return (
    <section className="py-20 md:py-28 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="gradient-text">Certifications & Partnerships</span>
          </motion.h2>
        </div>

        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
          {certifications.map((cert) => (
            <motion.div
              key={cert.name}
              className="relative rounded-2xl bg-white border border-slate-200/60 shadow-sm p-6 md:p-8 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-lg group cursor-pointer"
              whileHover={{ y: -4 }}
            >
              <div
                className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center font-bold text-white text-lg md:text-xl shadow-sm transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${cert.color}, ${cert.color}99)`,
                  boxShadow: `0 4px 20px ${cert.color}30`,
                }}
              >
                {cert.name.charAt(0)}
              </div>
              <span
                className="text-sm md:text-base font-semibold transition-colors duration-300 group-hover:text-foreground"
                style={{ color: cert.color }}
              >
                {cert.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// 5b. FUN IMPACT COUNTER
// ═══════════════════════════════════════════════════════════
function CounterCard({ stat, index }: { stat: typeof funStats[number]; index: number }) {
  const counterRef = useCountUp(stat.value, 2.5);
  const Icon = iconMap[stat.icon] || Code;

  return (
    <motion.div
      className="relative rounded-2xl bg-white border border-slate-200/60 shadow-sm p-5 md:p-6 overflow-hidden transition-shadow hover:shadow-lg"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', stiffness: 120 }}
    >
      {/* Colored left border accent */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1.5 rounded-r-full"
        style={{ background: `linear-gradient(180deg, ${stat.color}, ${stat.color}66)` }}
      />

      <div className="flex items-start gap-4 pl-3">
        <motion.div
          className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${stat.color}12` }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: index * 0.1 + 0.15,
            type: 'spring',
            stiffness: 300,
            damping: 8,
          }}
        >
          <Icon size={20} style={{ color: stat.color }} />
        </motion.div>

        <div className="min-w-0">
          <div className="flex items-baseline gap-1.5">
            <span
              ref={counterRef}
              className="text-2xl md:text-3xl font-bold tabular-nums"
              style={{ color: stat.color }}
            >
              0
            </span>
            <span className="text-lg md:text-xl font-bold text-muted-foreground">
              {stat.suffix}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1 truncate">{stat.label}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function FunCounter() {
  return (
    <section className="py-20 md:py-28 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="gradient-text">Our Impact In Numbers</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            The energy behind every project
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {funStats.map((stat, i) => (
            <CounterCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// 5c. CTA SECTION
// ═══════════════════════════════════════════════════════════
export function CTASection() {
  return (
    <section className="relative py-20 md:py-28 px-4 md:px-8 overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{ background: GRADIENT.purpleToOrange }}
      />

      {/* Network lines pattern SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="ctaGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ctaGrid)" />
      </svg>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <span
          key={i}
          className="absolute w-2 h-2 rounded-full bg-white/20 animate-particle"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${6 + (i % 3) * 2}s`,
          }}
        />
      ))}

      {/* Floating avatar circles */}
      {[...Array(5)].map((_, i) => {
        const colors = [ACCENT.purple, ACCENT.blue, ACCENT.cyan, ACCENT.orange, '#EC4899'];
        const initials = ['AM', 'RK', 'AI', 'PS', 'VD'];
        return (
          <span
            key={`avatar-${i}`}
            className="absolute w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold text-white/60 animate-float"
            style={{
              left: `${8 + i * 22}%`,
              top: `${15 + (i % 2) * 55}%`,
              background: `linear-gradient(135deg, ${colors[i]}, ${colors[(i + 1) % colors.length]}88)`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          >
            {initials[i]}
          </span>
        );
      })}

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.h2
          className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Great software isn&apos;t built by one developer. It&apos;s built by the{' '}
          <span className="underline decoration-white/30 decoration-4 underline-offset-4">
            right collective
          </span>
          .
        </motion.h2>

        <motion.p
          className="text-white/80 text-lg md:text-xl mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Ready to build something extraordinary?
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          {/* Primary button */}
          <button
            className="group relative px-8 py-3.5 rounded-full bg-white text-foreground font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-xl magnetic-btn"
            style={{
              boxShadow: '0 0 20px rgba(255,255,255,0.3)',
            }}
          >
            Meet Experts
            <ArrowRight
              size={18}
              className="inline-block ml-2 transition-transform group-hover:translate-x-1"
            />
          </button>

          {/* Secondary button */}
          <button
            className="group px-8 py-3.5 rounded-full border-2 border-white/40 text-white font-semibold text-base transition-all duration-300 hover:bg-white/15 hover:border-white/70 hover:scale-105 magnetic-btn"
          >
            Start Project
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// 5d. FOOTER
// ═══════════════════════════════════════════════════════════
const footerColumns = [
  {
    title: 'Company',
    links: ['About', 'Careers', 'Blog', 'Press'],
  },
  {
    title: 'Services',
    links: ['Web Development', 'Mobile Apps', 'AI & ML', 'Cloud Solutions'],
  },
  {
    title: 'Industries',
    links: ['Healthcare', 'Fintech', 'Retail', 'Education'],
  },
  {
    title: 'Quick Links',
    links: ['Contact', 'Privacy', 'Terms', 'Sitemap'],
  },
];

const socialLinks = [
  { icon: Github, label: 'GitHub' },
  { icon: Linkedin, label: 'LinkedIn' },
  { icon: Twitter, label: 'Twitter' },
  { icon: Mail, label: 'Email' },
];

export function Footer() {
  return (
    <footer className="relative bg-[#0a0e27] text-white">
      {/* Wave separator */}
      <svg
        className="absolute -top-px w-full"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={ACCENT.purple} />
            <stop offset="50%" stopColor={ACCENT.blue} />
            <stop offset="100%" stopColor={ACCENT.cyan} />
          </linearGradient>
        </defs>
        <path
          d="M0,20 C360,60 720,0 1080,40 C1260,55 1380,25 1440,30 L1440,0 L0,0 Z"
          fill="url(#waveGrad)"
        />
      </svg>

      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-16 pb-8">
        {/* Logo */}
        <div className="mb-12 md:mb-16">
          <motion.span
            className="text-2xl md:text-3xl font-bold"
            style={{
              background: `linear-gradient(135deg, ${ACCENT.purple}, ${ACCENT.cyan})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Techades
          </motion.span>
          <p className="text-white/50 text-sm mt-2 max-w-md">
            Building extraordinary digital experiences with world-class engineering talent.
          </p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-sm uppercase tracking-wider text-white/70 mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="group relative text-sm text-white/50 hover:text-white transition-colors duration-200 inline-block"
                    >
                      {link}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-white/60 transition-all duration-300 group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-12 md:mb-16 max-w-md">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 w-full px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
          />
          <button
            className="w-full sm:w-auto px-6 py-2.5 rounded-full font-medium text-sm text-white transition-all duration-300 hover:scale-105 magnetic-btn"
            style={{ background: GRADIENT.purpleToBlue }}
          >
            Subscribe
          </button>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-4 mb-8">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-all duration-200"
              >
                <Icon size={16} />
              </a>
            );
          })}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6">
          <p className="text-center text-xs text-white/30">
            &copy; {new Date().getFullYear()} Techades. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
