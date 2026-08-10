'use client';

import { useState, useCallback, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Mail, ChevronDown, Users } from 'lucide-react';
import { teamMembers, ACCENT } from './data';
import { useScrollAnimation } from './useScrollAnimation';

const INITIAL_COUNT = 8;

const skillBadgeColors = [
  'bg-purple-50 text-purple-700 border-purple-100',
  'bg-blue-50 text-blue-700 border-blue-100',
  'bg-cyan-50 text-cyan-700 border-cyan-100',
  'bg-orange-50 text-orange-700 border-orange-100',
  'bg-emerald-50 text-emerald-700 border-emerald-100',
  'bg-pink-50 text-pink-700 border-pink-100',
];

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('');
}

function TeamCard({
  member,
  index,
}: {
  member: (typeof teamMembers)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({ rotateX: 0, rotateY: 0 });
  const initials = getInitials(member.name);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -8;
    const rotateY = (x - 0.5) * 8;
    setTiltStyle({ rotateX, rotateY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTiltStyle({ rotateX: 0, rotateY: 0 });
  }, []);

  const visibleSkills = member.skills.slice(0, 3);
  const moreCount = member.skills.length - 3;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{
        duration: 0.45,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="gradient-border group relative rounded-2xl bg-white p-4 sm:p-5 cursor-default"
        style={{
          perspective: '800px',
          transform: `rotateX(${tiltStyle.rotateX}deg) rotateY(${tiltStyle.rotateY}deg)`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        {/* Top row: Avatar + Name + Social icons */}
        <div className="flex items-start gap-3.5">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl transition-transform duration-500 group-hover:scale-110 shadow-md"
              style={{
                background: `linear-gradient(135deg, ${member.color}, ${member.color}99)`,
              }}
            >
              {initials}
            </div>
            {/* Subtle ring glow on hover */}
            <div
              className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
              style={{
                background: `radial-gradient(circle, ${member.color}33, transparent 70%)`,
              }}
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-tight truncate">
                  {member.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 truncate">
                  {member.role}
                </p>
              </div>
              {/* Social Icons */}
              <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
                <button
                  className="w-7 h-7 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/30 hover:bg-blue-50 transition-all duration-200"
                  aria-label={`${member.name} LinkedIn`}
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </button>
                <button
                  className="w-7 h-7 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[ACCENT.purple] hover:border-purple-200 hover:bg-purple-50 transition-all duration-200"
                  aria-label={`Email ${member.name}`}
                >
                  <Mail className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Years + Projects */}
        <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
          <span className="font-medium">{member.yearsExp}+ yrs exp</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="font-medium">{member.projects} projects</span>
        </div>

        {/* Skill Badges */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {visibleSkills.map((skill, i) => (
            <span
              key={skill}
              className={`inline-block px-2 py-0.5 text-[10px] sm:text-[11px] font-medium rounded-full border ${skillBadgeColors[i % skillBadgeColors.length]}`}
            >
              {skill}
            </span>
          ))}
          {moreCount > 0 && (
            <span className="inline-block px-2 py-0.5 text-[10px] sm:text-[11px] font-medium rounded-full bg-gray-100 text-gray-500 border border-gray-200">
              +{moreCount} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function TeamGrid() {
  const [expanded, setExpanded] = useState(false);
  const headingRef = useScrollAnimation({ y: 40, blur: 4, duration: 0.7 });
  const gridRef = useScrollAnimation({ y: 50, blur: 4, duration: 0.8, delay: 0.1 });
  const btnRef = useScrollAnimation({ y: 30, opacity: 0, duration: 0.6, delay: 0.25 });

  const visibleMembers = expanded
    ? teamMembers
    : teamMembers.slice(0, INITIAL_COUNT);

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div ref={headingRef} className="text-center mb-12 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 mb-5">
          <Users className="w-4 h-4" style={{ color: ACCENT.purple }} />
          <span className="text-sm font-medium" style={{ color: ACCENT.purple }}>
            40+ Specialists
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          Meet The{' '}
          <span className="gradient-text">Collective</span>
        </h2>
        <p className="mt-4 text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          A diverse team of engineers, designers, and strategists united by
          a passion for building exceptional digital products.
        </p>
      </div>

      {/* Grid */}
      <div ref={gridRef}>
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
          transition={{
            layoutDuration: 0.5,
            staggerChildren: 0.04,
          }}
        >
          <AnimatePresence mode="popLayout">
            {visibleMembers.map((member, index) => (
              <TeamCard
                key={member.id}
                member={member}
                index={expanded && index >= INITIAL_COUNT ? index - INITIAL_COUNT : index}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* View All / Show Less Button */}
      <div ref={btnRef} className="flex justify-center mt-10 sm:mt-12">
        <motion.button
          onClick={toggleExpanded}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-shadow duration-300"
          style={{ background: `linear-gradient(135deg, ${ACCENT.purple}, ${ACCENT.orange})` }}
        >
          {expanded ? 'Show Less' : `View All ${teamMembers.length} Experts`}
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.span>
        </motion.button>
      </div>
    </section>
  );
}
