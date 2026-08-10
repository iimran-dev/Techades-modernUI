'use client';

import { motion } from 'framer-motion';
import { Star, Sparkles, Award, Linkedin, Mail, Quote } from 'lucide-react';
import { featuredExperts } from './data';
import { useScrollAnimation } from './useScrollAnimation';

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('');
}

const founder = featuredExperts[0];
const keyTeam = featuredExperts.slice(1);

export default function FeaturedExperts() {
  const headingRef = useScrollAnimation({ y: 30, blur: 4, duration: 0.7 });

  return (
    <section className="relative py-14 sm:py-24 md:py-28 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Soft Ambient Light Orbs */}
      <div className="absolute top-1/4 -left-32 w-[450px] h-[450px] bg-gradient-to-tr from-purple-400/15 via-indigo-300/10 to-pink-300/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 -right-32 w-[450px] h-[450px] bg-gradient-to-bl from-cyan-400/15 via-blue-300/10 to-purple-300/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <div ref={headingRef} className="text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-50/80 border border-purple-200/50 text-purple-700 text-[11px] sm:text-xs font-medium tracking-wide mb-3 shadow-xs">
          <Sparkles size={13} className="text-purple-600" />
          <span>Executive Leadership</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
          Meet Our <span className="gradient-text">Leadership</span>
        </h2>
        <p className="mt-3 text-gray-500 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
          Driven by vision, technical mastery, and a relentless focus on shipping production-grade software.
        </p>
      </div>

      {/* Large Founder + Executive Team Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
        {/* Left Column: Large Hero Founder Card (Spans 7 cols on Desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 group relative rounded-[2rem] bg-white/85 backdrop-blur-xl border border-gray-200/80 p-6 sm:p-8 md:p-10 shadow-xl hover:shadow-2xl hover:border-purple-300 transition-all duration-500 flex flex-col justify-between overflow-hidden"
        >
          {/* Top Glass Sheen */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-300/50 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Founder Header Row */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                {/* Founder Gradient Avatar Placeholder */}
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-md flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${founder.color}, ${founder.color}AA)`,
                  }}
                >
                  {getInitials(founder.name)}
                </div>

                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-100/70 text-purple-700 text-[11px] font-semibold mb-1">
                    <Award size={12} />
                    <span>Founder & CEO</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                    {founder.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-gray-500">
                    18+ Years Engineering Leadership • 150+ Scale Projects
                  </p>
                </div>
              </div>

              {/* Star Rating Badge */}
              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/70 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                <Star size={16} fill="#F59E0B" className="text-amber-500" />
                <span className="text-sm font-bold text-amber-900">5.0</span>
                <span className="text-xs font-medium text-amber-700">Rating</span>
              </div>
            </div>

            {/* Founder Quote & Bio */}
            <div className="relative my-6 p-5 sm:p-6 rounded-2xl bg-purple-50/40 border border-purple-100/70">
              <Quote size={24} className="text-purple-300 absolute top-4 right-4" />
              <p className="text-gray-700 text-sm sm:text-base font-medium leading-relaxed italic relative z-10">
                "{founder.bio} Building scalable architectures and guiding talented cross-functional teams to redefine digital engineering standards."
              </p>
            </div>

            {/* Core Skills Chips */}
            <div className="flex flex-wrap gap-2 my-6">
              {founder.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs font-semibold rounded-full bg-white border border-gray-200 text-gray-700 shadow-2xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Founder Footer Row: Social Links */}
          <div className="pt-5 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Executive Spotlight
            </span>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors cursor-pointer">
                <Linkedin size={14} />
              </button>
              <button className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors cursor-pointer">
                <Mail size={14} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Stacked Executive Leaders Cards (Spans 5 cols on Desktop) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4 sm:gap-5">
          {keyTeam.map((expert, index) => {
            return (
              <motion.div
                key={expert.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200/80 p-5 shadow-sm hover:shadow-lg hover:border-purple-300 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar Gradient Placeholder */}
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${expert.color}, ${expert.color}AA)`,
                    }}
                  >
                    {getInitials(expert.name)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-base font-bold text-gray-900 group-hover:text-purple-700 transition-colors truncate">
                        {expert.name}
                      </h4>
                      <div className="flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                        <Star size={12} fill="#F59E0B" />
                        <span>{expert.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <p
                      className="text-xs font-semibold mt-0.5 truncate"
                      style={{ color: expert.color }}
                    >
                      {expert.role}
                    </p>

                    <p className="text-xs text-gray-500 mt-1.5 leading-snug line-clamp-2">
                      {expert.bio}
                    </p>

                    <div className="flex items-center gap-2 text-[11px] text-gray-400 font-medium mt-2.5">
                      <span>{expert.yearsExp}+ Yrs Exp</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span>{expert.projects} Projects</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
