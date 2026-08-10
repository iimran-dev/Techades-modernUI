'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lightbulb, Eye, CheckCircle, Heart } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { teamDNA, coreValues, ACCENT } from './data';
import { useScrollAnimation } from './useScrollAnimation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap = {
  Shield,
  Lightbulb,
  Eye,
  CheckCircle,
  Heart,
} as const;

const TOTAL = teamDNA.reduce((sum, d) => sum + d.value, 0);
const RADIUS = 90;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const STROKE_WIDTH = 28;
const CENTER = 120;
const GAP_ANGLE = 2; // degrees gap between segments

interface SegmentAngles {
  startAngle: number;
  endAngle: number;
  offset: number;
  length: number;
}

function computeSegments(): SegmentAngles[] {
  const totalGap = GAP_ANGLE * teamDNA.length;
  const available = 360 - totalGap;
  let currentAngle = -90; // start from top

  return teamDNA.map((item) => {
    const segmentAngle = (item.value / TOTAL) * available;
    const startAngle = currentAngle + GAP_ANGLE / 2;
    const endAngle = startAngle + segmentAngle;
    currentAngle = endAngle + GAP_ANGLE / 2;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    const length = ((endAngle - startAngle) / 360) * CIRCUMFERENCE;
    const offset = ((360 - startAngle) / 360) * CIRCUMFERENCE;

    return { startAngle, endAngle, offset, length };
  });
}

const segments = computeSegments();

function DoughnutChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<{
    label: string;
    value: number;
    x: number;
    y: number;
  } | null>(null);
  const animated = useRef(false);

  useEffect(() => {
    if (!svgRef.current || animated.current) return;

    const circles = svgRef.current.querySelectorAll('.doughnut-segment');
    gsap.set(circles, {
      strokeDashoffset: CIRCUMFERENCE,
    });

    ScrollTrigger.create({
      trigger: svgRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        if (animated.current) return;
        animated.current = true;
        gsap.to(circles, {
          strokeDashoffset: (i: number) => segments[i].offset,
          duration: 1.4,
          stagger: 0.12,
          ease: 'power3.out',
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === svgRef.current) st.kill();
      });
    };
  }, []);

  const handleMouseEnter = useCallback(
    (index: number, e: React.MouseEvent<SVGCircleElement>) => {
      const svgRect = svgRef.current?.getBoundingClientRect();
      if (!svgRect) return;
      const item = teamDNA[index];
      const seg = segments[index];
      const midAngle = ((seg.startAngle + seg.endAngle) / 2) * (Math.PI / 180);
      const tooltipR = RADIUS + 45;
      const tx = CENTER + tooltipR * Math.cos(midAngle);
      const ty = CENTER + tooltipR * Math.sin(midAngle);
      setTooltip({ label: item.label, value: item.value, x: tx, y: ty });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  return (
    <div className="relative w-full max-w-[320px] sm:max-w-[360px] mx-auto">
      <svg
        ref={svgRef}
        viewBox="0 0 240 240"
        className="w-full h-auto"
        role="img"
        aria-label="Team composition doughnut chart"
      >
        {/* Background track */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke="#f1f1f1"
          strokeWidth={STROKE_WIDTH}
        />

        {/* Segments */}
        {teamDNA.map((item, i) => {
          const seg = segments[i];
          return (
            <motion.circle
              key={item.label}
              className="doughnut-segment"
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill="none"
              stroke={item.color}
              strokeWidth={STROKE_WIDTH}
              strokeDasharray={`${seg.length} ${CIRCUMFERENCE - seg.length}`}
              strokeDashoffset={CIRCUMFERENCE}
              strokeLinecap="round"
              transform={`rotate(${seg.startAngle} ${CENTER} ${CENTER})`}
              onMouseEnter={(e) => handleMouseEnter(i, e as unknown as React.MouseEvent<SVGCircleElement>)}
              onMouseLeave={handleMouseLeave}
              whileHover={{
                strokeWidth: STROKE_WIDTH + 4,
              }}
              style={{ cursor: 'pointer', transition: 'stroke-width 0.2s ease' }}
            />
          );
        })}

        {/* Center Text */}
        <text
          x={CENTER}
          y={CENTER - 8}
          textAnchor="middle"
          className="fill-gray-900 font-bold"
          style={{ fontSize: '20px' }}
        >
          Team DNA
        </text>
        <text
          x={CENTER}
          y={CENTER + 14}
          textAnchor="middle"
          className="fill-gray-400"
          style={{ fontSize: '11px' }}
        >
          {teamDNA.length} disciplines
        </text>

        {/* Tooltip */}
        {tooltip && (
          <g>
            <rect
              x={tooltip.x - 40}
              y={tooltip.y - 22}
              width={80}
              height={36}
              rx={8}
              fill="white"
              stroke="#e5e7eb"
              strokeWidth={1}
              filter="drop-shadow(0 2px 4px rgba(0,0,0,0.08))"
            />
            <text
              x={tooltip.x}
              y={tooltip.y - 5}
              textAnchor="middle"
              className="fill-gray-900 font-semibold"
              style={{ fontSize: '10px' }}
            >
              {tooltip.label}
            </text>
            <text
              x={tooltip.x}
              y={tooltip.y + 9}
              textAnchor="middle"
              className="fill-gray-500"
              style={{ fontSize: '10px' }}
            >
              {tooltip.value}%
            </text>
          </g>
        )}
      </svg>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-6 px-2">
        {teamDNA.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-gray-500 truncate">
              {item.label}{' '}
              <span className="font-semibold text-gray-700">
                {item.value}%
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ValueCard({
  value,
  index,
}: {
  value: (typeof coreValues)[0];
  index: number;
}) {
  const IconComponent = iconMap[value.icon as keyof typeof iconMap];
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200/70 p-3 sm:p-3.5 shadow-xs hover:shadow-lg hover:shadow-purple-500/10 hover:border-purple-200/80 transition-all duration-300 flex-1 flex items-center overflow-hidden"
    >
      {/* Subtle top light sheen */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none" />

      {/* Subtle gradient bg on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top left, rgba(108,76,241,0.06), transparent 60%)',
        }}
      />

      <div className="flex items-center gap-3 w-full">
        <motion.div
          whileHover={{ y: -2, scale: 1.08 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-xs"
          style={{
            background: `linear-gradient(135deg, ${ACCENT.purple}15, ${ACCENT.blue}15)`,
            color: ACCENT.purple,
          }}
        >
          <IconComponent className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </motion.div>

        <div className="min-w-0 flex-1">
          <h4 className="font-bold text-gray-900 text-xs sm:text-sm leading-tight group-hover:text-purple-950 transition-colors">
            {value.title}
          </h4>
          <p className="mt-0.5 text-gray-500 text-[11px] sm:text-xs leading-relaxed line-clamp-2">
            {value.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TeamDNA() {
  const headingRef = useScrollAnimation({ y: 40, blur: 4, duration: 0.7 });

  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Soft Ambient Light Blobs */}
      <div className="absolute top-1/3 -left-32 w-[450px] h-[450px] bg-gradient-to-tr from-purple-400/20 via-indigo-300/15 to-pink-300/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 -right-32 w-[450px] h-[450px] bg-gradient-to-bl from-orange-400/20 via-amber-300/15 to-purple-300/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header */}
      <div ref={headingRef} className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          Our{' '}
          <span className="gradient-text-warm">Team DNA</span>
        </h2>
        <p className="mt-4 text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          A balanced composition of expertise, united by shared values that
          drive every decision we make.
        </p>
      </div>

      {/* Split Layout */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch">
        {/* Left: Doughnut Chart */}
        <div className="w-full lg:w-5/12 flex flex-col">
          <div className="relative rounded-3xl border border-gray-200/80 bg-white/80 backdrop-blur-xl p-6 sm:p-7 shadow-[0_4px_25px_rgba(0,0,0,0.03)] h-full flex flex-col justify-center overflow-hidden">
            {/* Top Glass Sheen Line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none" />

            <DoughnutChart />
          </div>
        </div>

        {/* Right: Core Values */}
        <div className="w-full lg:w-7/12 flex flex-col justify-between">
          <div className="mb-3">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              Our Core Values
            </h3>
            <p className="mt-1 text-gray-500 text-xs sm:text-sm max-w-lg">
              Values that shape how we hire, build, and grow together.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 flex-1 justify-between">
            {coreValues.map((value, index) => (
              <ValueCard key={value.title} value={value} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
