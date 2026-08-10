'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Palette, CheckCircle2, Layout, Code2, Layers, Sparkles } from 'lucide-react';
import { useScrollAnimation } from './useScrollAnimation';

interface TechItem {
  name: string;
  category: 'Frontend Web' | 'Backend & DB' | 'Graphic & UI/UX' | 'Design Tools';
  color: string;
  experts: number;
}

const techItems: TechItem[] = [
  // Frontend Web Development
  { name: 'React', category: 'Frontend Web', color: '#61DAFB', experts: 18 },
  { name: 'Next.js', category: 'Frontend Web', color: '#000000', experts: 16 },
  { name: 'TypeScript', category: 'Frontend Web', color: '#3178C6', experts: 20 },
  { name: 'Tailwind CSS', category: 'Frontend Web', color: '#06B6D4', experts: 15 },
  { name: 'Vue.js', category: 'Frontend Web', color: '#4FC08D', experts: 9 },
  { name: 'HTML5 & CSS3', category: 'Frontend Web', color: '#E34F26', experts: 18 },

  // Backend & Database
  { name: 'Node.js', category: 'Backend & DB', color: '#339933', experts: 15 },
  { name: 'PostgreSQL', category: 'Backend & DB', color: '#4169E1', experts: 12 },
  { name: 'MongoDB', category: 'Backend & DB', color: '#47A248', experts: 11 },
  { name: 'GraphQL', category: 'Backend & DB', color: '#E10098', experts: 10 },
  { name: 'REST APIs', category: 'Backend & DB', color: '#FF7A32', experts: 16 },
  { name: 'Express.js', category: 'Backend & DB', color: '#64748B', experts: 14 },

  // Graphic & UI/UX Design
  { name: 'UI/UX Design', category: 'Graphic & UI/UX', color: '#F24E1E', experts: 16 },
  { name: 'Brand Identity', category: 'Graphic & UI/UX', color: '#FF7A32', experts: 12 },
  { name: 'Motion Graphics', category: 'Graphic & UI/UX', color: '#9999FF', experts: 10 },
  { name: 'Design Systems', category: 'Graphic & UI/UX', color: '#6C4CF1', experts: 14 },
  { name: '3D & Vector Art', category: 'Graphic & UI/UX', color: '#EC4899', experts: 8 },

  // Design Tools
  { name: 'Figma', category: 'Design Tools', color: '#F24E1E', experts: 17 },
  { name: 'Adobe Illustrator', category: 'Design Tools', color: '#FF9A00', experts: 14 },
  { name: 'Adobe Photoshop', category: 'Design Tools', color: '#31A8FF', experts: 15 },
  { name: 'After Effects', category: 'Design Tools', color: '#9999FF', experts: 9 },
  { name: 'Adobe XD', category: 'Design Tools', color: '#FF61F6', experts: 11 },
  { name: 'Blender 3D', category: 'Design Tools', color: '#EA7600', experts: 7 },
];

const categories = ['All', 'Frontend Web', 'Backend & DB', 'Graphic & UI/UX', 'Design Tools'] as const;

export default function TechCloud() {
  const headingRef = useScrollAnimation({ y: 40, blur: 4, duration: 0.7 });
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Fast memoized filtering
  const filteredTechs = useMemo(() => {
    return selectedCategory === 'All'
      ? techItems
      : techItems.filter((t) => t.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section className="relative py-14 sm:py-24 md:py-28 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Soft Ambient Light Orbs */}
      <div className="absolute top-1/4 -left-32 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-gradient-to-tr from-purple-400/10 via-indigo-300/10 to-pink-300/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 -right-32 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-gradient-to-bl from-cyan-400/10 via-blue-300/10 to-purple-300/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-10 sm:mb-14 md:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-50/80 border border-purple-200/50 text-purple-700 text-[11px] sm:text-xs font-medium tracking-wide mb-3.5 shadow-xs">
            <Sparkles size={13} className="text-purple-600" />
            <span>Fullstack & Creative Capabilities</span>
          </div>
          <motion.h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3 sm:mb-4 text-gray-900">
            Digital Code & <span className="gradient-text">Visual Craft</span>
          </motion.h2>
          <p className="text-gray-500 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-1 font-normal">
            Architecting responsive web applications, high-performance backends, and striking graphic identities.
          </p>
        </div>

        {/* Category Filter Bar */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap mb-8 sm:mb-10 px-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${isActive
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20 scale-105'
                    : 'bg-white/80 backdrop-blur-md border border-gray-200/70 text-gray-600 hover:border-purple-300 hover:text-purple-700'
                  }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Modern Fluid Glass Tag Mesh (Non-Card Layout) */}
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 max-w-5xl mx-auto px-1"
        >
          {filteredTechs.map((tech) => (
            <motion.div
              key={tech.name}
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.2 }}
              className="group relative inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-gray-200/70 shadow-xs hover:shadow-lg hover:border-purple-300 transition-all duration-300 cursor-pointer"
            >
              {/* Brand Color Ambient Spot Glow on Hover */}
              <div
                className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                style={{ background: tech.color }}
              />

              {/* Glowing Brand Indicator Dot */}
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-xs group-hover:scale-125 transition-transform"
                style={{ background: tech.color }}
              />

              {/* Tech Name */}
              <span className="text-xs sm:text-sm font-semibold text-gray-800 tracking-tight group-hover:text-purple-700 transition-colors">
                {tech.name}
              </span>

              {/* Experts Pill */}
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100/90 border border-gray-200/50 text-gray-500 group-hover:bg-purple-50 group-hover:text-purple-600 group-hover:border-purple-200/60 transition-colors">
                {tech.experts} Experts
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
