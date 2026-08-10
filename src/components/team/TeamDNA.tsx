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
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative rounded-2xl bg-white border border-gray-100 p-5 sm:p-6 hover:shadow-xl hover:shadow-purple-500/5 transition-shadow duration-400"
    >
      {/* Subtle gradient bg on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
        style={{
          background:
            'radial-gradient(ellipse at top left, rgba(108,76,241,0.04), transparent 60%)',
        }}
      />

      <div className="flex items-start gap-4">
        <motion.div
          whileHover={{ y: -3, scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${ACCENT.purple}15, ${ACCENT.blue}15)`,
            color: ACCENT.purple,
          }}
        >
          <IconComponent className="w-5 h-5" />
        </motion.div>

        <div>
          <h4 className="font-bold text-gray-900 text-sm sm:text-base">
            {value.title}
          </h4>
          <p className="mt-1.5 text-gray-500 text-xs sm:text-sm leading-relaxed">
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
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div ref={headingRef} className="text-center mb-14 sm:mb-18">
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
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        {/* Left: Doughnut Chart */}
        <div className="w-full lg:w-5/12">
          <div
            className="gradient-border rounded-3xl bg-white p-6 sm:p-8"
            style={{ position: 'relative' }}
          >
            <DoughnutChart />
          </div>
        </div>

        {/* Right: Core Values */}
        <div className="w-full lg:w-7/12">
          <div className="mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Our Core Values
            </h3>
            <p className="mt-2 text-gray-500 text-sm sm:text-base max-w-lg">
              These aren&apos;t just words on a wall. They shape how we hire,
              build, and grow.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {coreValues.map((value, index) => (
              <ValueCard key={value.title} value={value} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
