'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { capabilityRows, capabilityColumns, ACCENT } from './data';
import { useScrollAnimation } from './useScrollAnimation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function getCellStyle(value: number) {
  if (value >= 7) {
    return {
      background: `linear-gradient(135deg, ${ACCENT.purple}, ${ACCENT.blue})`,
      textColor: 'text-white font-bold',
      shadow: 'shadow-sm shadow-purple-500/20',
    };
  }
  if (value >= 5) {
    return {
      background: 'linear-gradient(135deg, rgba(108, 76, 241, 0.75), rgba(63, 140, 255, 0.65))',
      textColor: 'text-white font-semibold',
      shadow: 'shadow-xs',
    };
  }
  if (value >= 3) {
    return {
      background: 'linear-gradient(135deg, rgba(108, 76, 241, 0.35), rgba(63, 140, 255, 0.25))',
      textColor: 'text-purple-950 font-semibold',
      shadow: 'none',
    };
  }
  return {
    background: 'rgba(108, 76, 241, 0.08)',
    textColor: 'text-purple-800 font-medium',
    shadow: 'none',
  };
}

export default function CapabilityHeatmap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headingRef = useScrollAnimation({ y: 40, blur: 4, duration: 0.7 });
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!gridRef.current || !sectionRef.current) return;

    const cells = gridRef.current.querySelectorAll('.heatmap-cell');
    gsap.set(cells, { opacity: 0, scale: 0.85 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;
        gsap.to(cells, {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          stagger: 0.02,
          ease: 'back.out(1.4)',
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) st.kill();
      });
    };
  }, []);

  const handleCellHover = (e: React.MouseEvent, value: number, skill: string, level: string) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setTooltip({
      x: rect.left + rect.width / 2,
      y: rect.top,
      text: `${skill} • ${level}: ${value} Specialist${value !== 1 ? 's' : ''}`,
    });
  };

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Soft Ambient Light Blobs */}
      <div className="absolute top-1/4 -left-32 w-[400px] h-[400px] bg-purple-200/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 -right-32 w-[400px] h-[400px] bg-blue-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-10 md:mb-14">
          <motion.h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
            Capability <span className="gradient-text">Heatmap</span>
          </motion.h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Our collective engineering depth and talent distribution across skill levels.
          </p>
        </div>

        {/* Heatmap Glass Box */}
        <div className="relative rounded-3xl border border-gray-200/80 bg-white/80 backdrop-blur-xl p-4 sm:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.03)] overflow-hidden">
          {/* Top Sheen Line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none" />

          {/* Grid Container */}
          <div ref={gridRef} className="w-full">
            {/* Column Headers */}
            <div className="flex items-center mb-3 pl-20 sm:pl-28">
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5 w-full">
                {capabilityColumns.map((col) => (
                  <div key={col} className="text-center">
                    <span className="text-[11px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {col}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Matrix Rows */}
            <div className="flex flex-col gap-2">
              {capabilityRows.map((row) => (
                <div key={row.skill} className="flex items-center gap-2 sm:gap-3">
                  {/* Row Label */}
                  <div className="w-20 sm:w-28 flex-shrink-0 text-right pr-1 sm:pr-2">
                    <span className="text-xs sm:text-sm font-semibold text-gray-800 truncate block">
                      {row.skill}
                    </span>
                  </div>

                  {/* Level Cells */}
                  <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5 flex-1">
                    {row.levels.map((value, ci) => {
                      const style = getCellStyle(value);
                      return (
                        <div
                          key={ci}
                          className={`heatmap-cell h-8 sm:h-9 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-md flex items-center justify-center border border-white/60 ${style.textColor} ${style.shadow}`}
                          style={{
                            background: style.background,
                          }}
                          onMouseEnter={(e) => handleCellHover(e, value, row.skill, capabilityColumns[ci])}
                          onMouseLeave={() => setTooltip(null)}
                        >
                          <span className="text-xs sm:text-sm">{value}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Modern Heatmap Spectrum Legend */}
            <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100/80 px-1 sm:px-3 text-xs text-gray-500">
              <span className="font-medium text-[11px] sm:text-xs text-gray-400">Team Density:</span>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-xs">Low (1-2)</span>
                <div className="w-4 h-4 rounded-md bg-[rgba(108,76,241,0.08)] border border-purple-100" />
                <div className="w-4 h-4 rounded-md bg-[rgba(108,76,241,0.35)]" />
                <div className="w-4 h-4 rounded-md bg-[rgba(108,76,241,0.75)]" />
                <div className="w-4 h-4 rounded-md bg-gradient-to-r from-[#6C4CF1] to-[#3F8CFF] shadow-xs" />
                <span className="text-[10px] sm:text-xs">High (7-8+)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hover Tooltip */}
        {tooltip && (
          <div
            className="fixed z-50 px-3 py-1.5 rounded-xl bg-gray-900/90 text-white backdrop-blur-md shadow-xl text-xs font-semibold pointer-events-none"
            style={{
              left: tooltip.x,
              top: tooltip.y - 36,
              transform: 'translateX(-50%)',
            }}
          >
            {tooltip.text}
          </div>
        )}
      </div>
    </section>
  );
}
