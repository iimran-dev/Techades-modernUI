'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sparkles, Layers, Award } from 'lucide-react';
import SmoothScrollProvider from '@/components/team/SmoothScrollProvider';
import ScrollProgress from '@/components/team/ScrollProgress';
import HeroSection from '@/components/team/HeroSection';
import StatsSection from '@/components/team/StatsSection';
import FeaturedExperts from '@/components/team/FeaturedExperts';
import ProjectsShowcase from '@/components/team/ProjectsShowcase';
import TeamGrid from '@/components/team/TeamGrid';
import TeamDNA from '@/components/team/TeamDNA';
import WorldMap from '@/components/team/WorldMap';
import CapabilityHeatmap from '@/components/team/CapabilityHeatmap';
import DomainExpertise from '@/components/team/DomainExpertise';
import TechCloud from '@/components/team/TechCloud';
import { Certifications, CTASection, Footer } from '@/components/team/BottomSections';
import { getAssetPath } from '@/utils/basePath';

const navLinks = [
  { label: 'Experts', href: '#experts' },
  { label: 'Projects', href: '#projects' },
  { label: 'DNA', href: '#dna' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Domains', href: '#domains' },
  { label: 'Team', href: '#team' },
  { label: 'Tech Stack', href: '#tech' },
  { label: 'Global', href: '#global' },
];

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  /* Scroll spy observer */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Section Observer
    const sectionIds = navLinks.map((l) => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    if (href === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      const yOffset = -85;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 transition-all duration-500"
    >
      <div
        className={`max-w-7xl mx-auto transition-all duration-500 ${scrolled
            ? 'mt-3 py-2 px-4 sm:px-6 rounded-full bg-white/85 backdrop-blur-2xl border border-stone-200/80 shadow-lg shadow-purple-950/5'
            : 'py-4 lg:py-6 bg-transparent'
          }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => handleClick('#top')}
            className="flex items-center gap-2 cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Image
              src={getAssetPath('/team/techades-logo.png')}
              alt="Techades Official Logo"
              width={160}
              height={40}
              className="h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-105"
              priority
            />
          </motion.button>

          {/* Desktop Nav Items with Active Sliding Indicator */}
          <div className="hidden lg:flex items-center gap-1 bg-stone-100/70 p-1 rounded-full border border-stone-200/60 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-full transition-colors cursor-pointer select-none ${isActive ? 'text-white' : 'text-stone-600 hover:text-stone-900'
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 rounded-full shadow-xs"
                      style={{
                        background: 'linear-gradient(135deg, #6C4CF1, #3F8CFF)',
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <motion.button
              onClick={() => handleClick('#contact')}
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold text-white shadow-md cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #6C4CF1, #FF7A32)' }}
            >
              <span>Start Your Project</span>
              <ArrowUpRight size={14} />
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 rounded-full bg-stone-100 text-stone-800 hover:bg-stone-200 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="lg:hidden mt-2 max-w-xl mx-auto rounded-3xl bg-white/95 backdrop-blur-2xl border border-stone-200/80 shadow-2xl p-5 overflow-hidden"
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-3">
              <span className="text-[11px] font-mono font-semibold text-stone-400 uppercase tracking-widest">
                NAVIGATION MENU
              </span>
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-ping" />
            </div>

            <div className="grid grid-cols-2 gap-1.5 mb-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <button
                    key={link.href}
                    onClick={() => handleClick(link.href)}
                    className={`block text-left px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${isActive
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'text-stone-700 hover:bg-stone-100'
                      }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handleClick('#contact')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-bold text-white shadow-md"
              style={{ background: 'linear-gradient(135deg, #6C4CF1, #FF7A32)' }}
            >
              <span>Start Your Project</span>
              <ArrowUpRight size={15} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default function TeamPage() {
  return (
    <SmoothScrollProvider>
      <ScrollProgress />
      <Navigation />
      <main id="top">
        <HeroSection />

        <div id="experts">
          <FeaturedExperts />
        </div>
        <div id="projects">
          <ProjectsShowcase />
        </div>
        <div id="dna">
          <TeamDNA />
        </div>
        <div id="capabilities">
          <CapabilityHeatmap />
        </div>
        <div id="domains">
          <DomainExpertise />
        </div>
        <div id="team">
          <TeamGrid />
        </div>
        <div id="tech">
          <TechCloud />
        </div>
        <StatsSection />
        <div id="global">
          <WorldMap />
        </div>
        <Certifications />
        <div id="contact">
          <CTASection />
        </div>
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
