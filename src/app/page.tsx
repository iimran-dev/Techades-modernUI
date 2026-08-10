'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import SmoothScrollProvider from '@/components/team/SmoothScrollProvider';
import ScrollProgress from '@/components/team/ScrollProgress';
import HeroSection from '@/components/team/HeroSection';
import StatsSection from '@/components/team/StatsSection';
import FeaturedExperts from '@/components/team/FeaturedExperts';
import TeamGrid from '@/components/team/TeamGrid';
import TeamDNA from '@/components/team/TeamDNA';
import WorldMap from '@/components/team/WorldMap';
import CapabilityHeatmap from '@/components/team/CapabilityHeatmap';
import DomainExpertise from '@/components/team/DomainExpertise';
import TechCloud from '@/components/team/TechCloud';
import { Certifications, FunCounter, CTASection, Footer } from '@/components/team/BottomSections';

const navLinks = [
  { label: 'Experts', href: '#experts' },
  { label: 'Team', href: '#team' },
  { label: 'DNA', href: '#dna' },
  { label: 'Global', href: '#global' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Domains', href: '#domains' },
];

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.05)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6C4CF1, #3F8CFF)' }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Techa<span className="gradient-text">des</span>
            </span>
          </motion.div>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors group magnetic-btn"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-6"
                  style={{ background: 'linear-gradient(90deg, #6C4CF1, #3F8CFF)' }}
                />
              </button>
            ))}
          </div>

          {/* CTA button */}
          <div className="hidden lg:block">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-white magnetic-btn"
              style={{ background: 'linear-gradient(135deg, #6C4CF1, #3F8CFF)' }}
            >
              Start Your Project
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  className="block w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                className="w-full mt-2 px-5 py-3 rounded-full text-sm font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #6C4CF1, #3F8CFF)' }}
              >
                Start Your Project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default function TeamPage() {
  return (
    <SmoothScrollProvider>
      <ScrollProgress />
      <Navigation />
      <main>
        <HeroSection />
        <StatsSection />
        <div id="experts">
          <FeaturedExperts />
        </div>
        <div id="team">
          <TeamGrid />
        </div>
        <div id="dna">
          <TeamDNA />
        </div>
        <div id="global">
          <WorldMap />
        </div>
        <div id="capabilities">
          <CapabilityHeatmap />
        </div>
        <div id="domains">
          <DomainExpertise />
        </div>
        <TechCloud />
        <Certifications />
        <FunCounter />
        <CTASection />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
