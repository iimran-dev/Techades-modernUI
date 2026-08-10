'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Code, GitCommit, Rocket, Video, Coffee, Moon,
  Github, Linkedin, Twitter, Mail, ArrowRight, Sparkles, ShieldCheck, Award, CheckCircle2, BadgeCheck
} from 'lucide-react';
import { useCountUp, useScrollAnimation } from './useScrollAnimation';
import type { LucideIcon } from 'lucide-react';
import { getAssetPath } from '@/utils/basePath';

// Icon Map for Stats
const iconMap: Record<string, LucideIcon> = {
  Code, GitCommit, Rocket, Video, Coffee, Moon,
};

// Enterprise Compliance & Specializations (Replaces fake logos & boxed cards)
const trustBadges = [
  { name: 'Microsoft Enterprise Partner', status: 'Certified Tier', color: '#00A4EF' },
  { name: 'AWS Cloud Solutions Partner', status: 'Select Tier', color: '#FF9900' },
  { name: 'Google Cloud Platform', status: 'Certified Partner', color: '#4285F4' },
  { name: 'ISO 27001 Security Standard', status: 'Audited & Verified', color: '#10B981' },
  { name: 'SOC 2 Type II Compliant', status: 'Audited 2026', color: '#8B5CF6' },
  { name: 'HIPAA & PCI-DSS L1', status: 'Level 1 Compliant', color: '#EC4899' },
  { name: 'Oracle Enterprise Stack', status: 'Certified Specialist', color: '#F80000' },
  { name: 'Scrum Alliance Agile Firm', status: 'Certified Practice', color: '#06B6D4' },
];

// ═══════════════════════════════════════════════════════════
// 1. CERTIFICATIONS & TRUST BADGES (Ecosystem Ribbon)
// ═══════════════════════════════════════════════════════════
export function Certifications() {
  const headingRef = useScrollAnimation({ y: 30, blur: 4 });

  return (
    <section className="relative py-14 sm:py-20 md:py-24 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50/80 border border-purple-200/50 text-purple-700 text-[11px] sm:text-xs font-medium tracking-wide mb-3 shadow-xs">
            <ShieldCheck size={13} className="text-purple-600" />
            <span>Verified Industry Compliance</span>
          </div>
          <motion.h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Standards & <span className="gradient-text">Certifications</span>
          </motion.h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-normal">
            Enterprise-grade security standards and multi-cloud certified engineering practices.
          </p>
        </div>

        {/* Seamless Glass Pill Ribbon (No Box Cards or Logos) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {trustBadges.map((badge, i) => (
            <motion.div
              key={badge.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative rounded-full bg-white/80 backdrop-blur-md border border-gray-200/70 px-4 sm:px-5 py-2.5 shadow-xs hover:shadow-md hover:border-purple-300 transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-xs group-hover:scale-110 transition-transform"
                style={{ background: badge.color }}
              >
                <BadgeCheck size={15} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                  {badge.name}
                </span>
                <span className="text-[10px] font-normal text-gray-400">
                  {badge.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


// ═══════════════════════════════════════════════════════════
// 3. ULTRA MODERN GLASS CTA SECTION
// ═══════════════════════════════════════════════════════════
export function CTASection() {
  return (
    <section className="relative py-14 sm:py-20 md:py-24 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="relative max-w-6xl mx-auto rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#311042] text-white p-8 sm:p-14 md:p-16 overflow-hidden shadow-2xl border border-white/10">
        {/* Soft Background Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Subtle Mesh Overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="ctaGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ctaGrid)" />
        </svg>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-purple-200 text-xs font-medium tracking-wide mb-6 backdrop-blur-md"
          >
            <Sparkles size={13} className="text-purple-300" />
            <span>Scale Your Engineering Today</span>
          </motion.div>

          <motion.h2
            className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Great software is built by the{' '}
            <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
              right collective
            </span>
            .
          </motion.h2>

          <motion.p
            className="text-gray-300 text-sm sm:text-base md:text-lg mb-8 max-w-xl mx-auto font-normal leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Deploy dedicated engineering squads or scale your existing team with top-tier technology experts.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-gray-900 font-semibold text-sm hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2 cursor-pointer">
              <span>Meet Our Experts</span>
              <ArrowRight size={16} />
            </button>
            <button className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/10 border border-white/20 text-white font-medium text-sm hover:bg-white/20 transition-all duration-300 cursor-pointer backdrop-blur-md">
              Start Project Inquiry
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// 4. FOOTER
// ═══════════════════════════════════════════════════════════
const footerColumns = [
  { title: 'Company', links: ['About Us', 'Careers', 'Engineering Blog', 'Press Kit'] },
  { title: 'Services', links: ['Web Architecture', 'DevOps & CI/CD', 'AI & Machine Learning', 'Cloud Infra'] },
  { title: 'Domains', links: ['Fintech', 'Healthcare', 'E-Commerce', 'PropTech'] },
  { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Security Policy', 'Sitemap'] },
];

const socialLinks = [
  { icon: Github, label: 'GitHub' },
  { icon: Linkedin, label: 'LinkedIn' },
  { icon: Twitter, label: 'Twitter' },
  { icon: Mail, label: 'Email' },
];

export function Footer() {
  return (
    <footer className="border-t border-gray-200/70 bg-white/60 backdrop-blur-xl text-gray-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <Image
              src={getAssetPath('/team/techades-logo.png')}
              alt="Techades Logo"
              width={160}
              height={40}
              className="h-8 sm:h-9 w-auto object-contain mb-3"
            />
            <p className="text-gray-500 text-xs sm:text-sm max-w-sm leading-relaxed mb-6 font-normal">
              Building high-performance web platforms, automated CI/CD pipelines, and enterprise-grade software products.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="w-8 h-8 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-200 shadow-xs"
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h4 className="font-semibold text-xs uppercase tracking-wider text-gray-900 mb-3">
                  {col.title}
                </h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-xs text-gray-500 hover:text-purple-600 transition-colors duration-200 block"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-normal">
          <p>&copy; {new Date().getFullYear()} Techades. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-gray-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
