'use client';

import { useState } from 'react';
import { motion,  } from 'framer-motion';
import { Linkedin, Mail,  ArrowUpRight, Sparkles } from 'lucide-react';
import { teamMembers } from './data';
import { useScrollAnimation } from './useScrollAnimation';

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('');
}

function EditorialTeamCard({
  member,
  index,
}: {
  member: (typeof teamMembers)[0];
  index: number;
}) {
  const initials = getInitials(member.name);
  const formattedIndex = String(index + 1).padStart(2, '0');
  const visibleSkills = member.skills.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="group relative rounded-xl sm:rounded-2xl bg-white/85 backdrop-blur-xl border border-gray-200/70 p-3.5 sm:p-4.5 shadow-xs hover:shadow-lg hover:border-purple-300 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer hover:-translate-y-0.5"
    >
      {/* Top Editorial Bar: Number Index & Location */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-2.5">
        <span className="text-[11px] sm:text-xs font-mono font-semibold text-gray-400 group-hover:text-purple-600 transition-colors">
          // {formattedIndex}
        </span>
        <span className="text-[10px] sm:text-xs font-medium text-gray-500 bg-gray-100/70 px-2 py-0.5 rounded-full border border-gray-200/50 truncate max-w-[90px] sm:max-w-none">
          {member.location}
        </span>
      </div>

      {/* Avatar & Member Info */}
      <div>
        <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5">
          <div
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-2xs group-hover:scale-105 transition-transform duration-300 flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${member.color}, ${member.color}DD)`,
            }}
          >
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 tracking-tight group-hover:text-purple-700 transition-colors truncate">
              {member.name}
            </h3>
            <p className="text-[10px] sm:text-xs font-semibold text-purple-600 uppercase tracking-wider truncate mt-0.5">
              {member.role}
            </p>
          </div>
        </div>

        {/* Experience & Projects Bar */}
        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-gray-500 font-medium mb-2.5">
          <span>{member.yearsExp}+ Yrs</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>{member.projects} Proj</span>
        </div>

        {/* Skill Badges */}
        <div className="flex flex-wrap items-center gap-1 mb-1">
          {visibleSkills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 text-[9px] sm:text-[10px] font-medium rounded-full bg-gray-50 text-gray-700 border border-gray-200/60"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Editorial Card Footer: Social Connections */}
      <div className="pt-2 mt-3 border-t border-gray-100 flex items-center justify-between">
        <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-gray-400 truncate">
          Specialist
        </span>
        <div className="flex items-center gap-1">
          <button
            className="w-6 h-6 rounded-full bg-gray-50 border border-gray-200/70 flex items-center justify-center text-gray-500 hover:text-purple-600 hover:bg-purple-50 transition-all cursor-pointer"
            aria-label={`${member.name} LinkedIn`}
          >
            <Linkedin size={12} />
          </button>
          <button
            className="w-6 h-6 rounded-full bg-gray-50 border border-gray-200/70 flex items-center justify-center text-gray-500 hover:text-purple-600 hover:bg-purple-50 transition-all cursor-pointer"
            aria-label={`Email ${member.name}`}
          >
            <Mail size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function TeamGrid() {
  const headingRef = useScrollAnimation({ y: 30, blur: 4, duration: 0.7 });
  const [showAll, setShowAll] = useState(false);

  const displayedMembers = showAll ? teamMembers.slice(0, 12) : teamMembers.slice(0, 3);

  return (
    <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden my-4 sm:my-8">
      {/* Soft Ambient Light Blobs */}
      <div className="absolute top-1/4 -left-32 w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] bg-gradient-to-tr from-purple-400/10 via-indigo-300/10 to-pink-300/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 -right-32 w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] bg-gradient-to-bl from-cyan-400/10 via-blue-300/10 to-purple-300/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div ref={headingRef} className="text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50/80 border border-purple-200/50 text-purple-700 text-[10px] sm:text-xs font-medium tracking-wide mb-2.5 shadow-2xs">
          <Sparkles size={12} className="text-purple-600" />
          <span>Editorial Roster // 2026 Edition</span>
        </div>
        <motion.h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-2 sm:mb-3 text-gray-900">
          The <span className="gradient-text">Collective</span> Studio
        </motion.h2>
        <p className="text-gray-500 text-xs sm:text-base max-w-xl mx-auto leading-relaxed px-1 font-normal">
          An elite group of fullstack engineers, design directors, and systems architects crafting world-class digital products.
        </p>
      </div>

      {/* Editorial Grid (3 Primary Cards by Default) */}
      <div
        className={`grid gap-3.5 sm:gap-5 ${
          showAll
            ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto'
        }`}
      >
        {displayedMembers.map((member, index) => (
          <EditorialTeamCard key={member.id} member={member} index={index} />
        ))}
      </div>

      {/* Toggle View Button */}
      <div className="mt-10 text-center">
        <button
          onClick={() => setShowAll(!showAll)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-gray-200/80 text-gray-800 text-xs font-semibold hover:border-purple-300 hover:text-purple-700 hover:shadow-sm transition-all cursor-pointer"
        >
          <span>{showAll ? 'Show Featured Roster' : 'Explore Full Roster'}</span>
          <ArrowUpRight size={13} />
        </button>
      </div>
    </section>
  );
}
