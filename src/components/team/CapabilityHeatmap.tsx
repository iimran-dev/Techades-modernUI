'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { capabilityRows, capabilityColumns, ACCENT } from './data';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function getCellColor(value: number): string {
  // 0 = very light, 8 = deep purple/blue
  const colors = [
    'rgba(108, 76, 241, 0.06)',  // 0
    'rgba(108, 76, 241, 0.15)',  // 1
    'rgba(108, 76, 241, 0.25)',  // 2
    'rgba(108, 76, 241, 0.35)',  // 3
    'rgba(108, 76, 241, 0.48)',  // 4
    'rgba(90, 76, 210, 0.58)',   // 5
    'rgba(75, 70, 200, 0.68)',   // 6
    'rgba(63, 140, 255, 0.78)',  // 7
    'rgba(50, 120, 240, 0.90)',  // 8
  ];
  return colors[value] || colors[0];
}

export default function CapabilityHeatmap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!gridRef.current || !sectionRef.current) return;

    const cells = gridRef.current.querySelectorAll('.heatmap-cell');
    gsap.set(cells, { opacity: 0, scaleX: 0 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;
        // Stagger by column: reveal each column's cells together
        gsap.to(cells, {
          opacity: 1,
          scaleX: 1,
          duration: 0.4,
          stagger: {
            each: 0.05,
            from: 'start',
          },
          ease: 'power2.out',
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) st.kill();
      });
    };
  }, []);

  const handleCellHover = (e: React.MouseEvent, value: number) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setTooltip({
      x: rect.left + rect.width / 2,
      y: rect.top,
      text: `${value} Specialist${value !== 1 ? 's' : ''}`,
    });
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-28 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="gradient-text">Capability Heatmap</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Our collective expertise across every level
          </motion.p>
        </div>

        {/* Heatmap Grid */}
        <motion.div
          ref={gridRef}
          className="overflow-x-auto no-scrollbar"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="min-w-[500px]">
            {/* Column Headers */}
            <div className="flex items-center mb-3 pl-28 md:pl-32">
              {capabilityColumns.map((col) => (
                <div key={col} className="flex-1 text-center">
                  <span className="text-xs md:text-sm font-medium text-muted-foreground">
                    {col}
                  </span>
                </div>
              ))}
            </div>

            {/* Rows */}
            <div className="flex flex-col gap-2">
              {capabilityRows.map((row) => (
                <div key={row.skill} className="flex items-center">
                  {/* Row Label */}
                  <div className="w-28 md:w-32 flex-shrink-0 text-right pr-4">
                    <span className="text-sm md:text-base font-medium text-foreground">
                      {row.skill}
                    </span>
                  </div>

                  {/* Cells */}
                  <div className="flex-1 flex gap-1.5">
                    {row.levels.map((value, ci) => (
                      <div
                        key={ci}
                        className="heatmap-cell flex-1 aspect-square rounded-md cursor-pointer transition-all duration-200 hover:scale-110 hover:ring-2 hover:ring-offset-1"
                        style={{
                          background: getCellColor(value),
                          ringColor: ACCENT.purple,
                          minWidth: 0,
                        }}
                        onMouseEnter={(e) => handleCellHover(e, value)}
                        onMouseLeave={() => setTooltip(null)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <span className="text-xs text-muted-foreground mr-2">Less</span>
              {[0, 2, 4, 6, 8].map((v) => (
                <div
                  key={v}
                  className="w-5 h-5 rounded-sm"
                  style={{ background: getCellColor(v) }}
                />
              ))}
              <span className="text-xs text-muted-foreground ml-2">More</span>
            </div>
          </div>
        </motion.div>

        {/* Tooltip */}
        {tooltip && (
          <div
            className="fixed z-50 px-3 py-1.5 rounded-lg glass shadow-lg text-sm font-medium text-foreground pointer-events-none"
            style={{
              left: tooltip.x,
              top: tooltip.y - 40,
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
