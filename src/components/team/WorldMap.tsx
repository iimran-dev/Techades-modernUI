'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from 'react-simple-maps';
import { worldLocations, worldConnections, ACCENT } from './data';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

function getLocation(name: string) {
  return worldLocations.find((l) => l.name === name)!;
}

export default function WorldMap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const lines = sectionRef.current.querySelectorAll('.connection-line');
    gsap.set(lines, { strokeDashoffset: 300 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(lines, {
          strokeDashoffset: 0,
          duration: 2.2,
          stagger: 0.15,
          ease: 'power2.inOut',
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-24 md:py-28 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Soft Ambient Light Orbs */}
      <div className="absolute top-1/4 -left-32 w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] bg-gradient-to-tr from-purple-400/20 via-indigo-300/15 to-pink-300/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 -right-32 w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] bg-gradient-to-bl from-cyan-400/20 via-blue-300/15 to-purple-300/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14 md:mb-16">
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Where We <span className="gradient-text">Work</span>
          </motion.h2>
          <motion.p
            className="text-gray-500 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Global engineering presence connected in real-time across hubs
          </motion.p>
        </div>

        {/* Map Container - Responsive aspect ratio */}
        <div className="relative w-full aspect-[1.4/1] sm:aspect-[2/1] md:aspect-[2.3/1] min-h-[300px] sm:min-h-0 bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-gray-200/80 overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.04)]">
          {/* Top Glass Sheen Line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none z-10" />

          <ComposableMap
            projection="geoEqualEarth"
            projectionConfig={{ scale: 145, center: [20, 10] }}
            className="w-full h-full"
          >
            {/* World Map Countries TopoJSON Geographies */}
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#6C4CF112"
                    stroke="#6C4CF128"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none' },
                      hover: { fill: '#6C4CF125', outline: 'none', transition: 'all 0.3s' },
                      pressed: { outline: 'none' },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* Global Connection Arcs */}
            {worldConnections.map((conn, i) => {
              const from = getLocation(conn.from);
              const to = getLocation(conn.to);
              return (
                <Line
                  key={i}
                  from={from.coordinates}
                  to={to.coordinates}
                  stroke={i % 2 === 0 ? ACCENT.purple : ACCENT.blue}
                  strokeWidth={1.5}
                  strokeDasharray="3 3"
                  strokeLinecap="round"
                  opacity={0.6}
                  className="connection-line"
                />
              );
            })}

            {/* Location Markers */}
            {worldLocations.map((loc) => {
              const isHub = loc.name === 'India';

              // Vertical offset for permanent badge
              let badgeY = 12;
              if (loc.name === 'Qatar' || loc.name === 'Malaysia') {
                badgeY = -28;
              }

              return (
                <Marker key={loc.name} coordinates={loc.coordinates}>
                  <g
                    className="cursor-pointer group"
                    onMouseEnter={() => setHoveredPin(loc.name)}
                    onMouseLeave={() => setHoveredPin(null)}
                  >
                    {/* Pulsing Ripple Circle */}
                    <circle
                      r={isHub ? 12 : 8}
                      fill={isHub ? ACCENT.purple : ACCENT.blue}
                      opacity={0.4}
                      className="animate-ping"
                    />

                    {/* Inner Pin Dot */}
                    <circle
                      r={isHub ? 5.5 : 4}
                      fill={isHub ? ACCENT.purple : ACCENT.blue}
                      stroke="#FFFFFF"
                      strokeWidth={2}
                      className="transition-transform duration-300 group-hover:scale-125 shadow-md"
                    />

                    {/* Permanent Location Badge */}
                    <foreignObject
                      x="-60"
                      y={badgeY}
                      width="120"
                      height="30"
                      style={{ overflow: 'visible' }}
                    >
                      <div className="flex justify-center">
                        <div className="px-1.5 sm:px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-gray-200/80 shadow-xs flex items-center gap-1 text-[9px] sm:text-[10px] font-semibold text-gray-800 whitespace-nowrap pointer-events-none group-hover:bg-white group-hover:scale-105 transition-all">
                          <span>{loc.flag}</span>
                          <span className="hidden xs:inline">{loc.name}</span>
                        </div>
                      </div>
                    </foreignObject>

                    {/* Interactive Hover Card */}
                    {hoveredPin === loc.name && (
                      <foreignObject
                        x="-75"
                        y="-65"
                        width="150"
                        height="55"
                        style={{ overflow: 'visible' }}
                      >
                        <div className="flex justify-center">
                          <motion.div
                            initial={{ opacity: 0, y: 5, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.95 }}
                            className="px-3 py-2 rounded-2xl bg-white/95 backdrop-blur-xl border border-gray-200/90 shadow-xl whitespace-nowrap pointer-events-none"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-lg sm:text-xl">{loc.flag}</span>
                              <div>
                                <div className="flex items-center gap-1">
                                  <p className="text-xs font-bold text-gray-900">{loc.name}</p>
                                  {isHub && (
                                    <span className="px-1.5 py-0.2 text-[8px] font-bold rounded-md bg-purple-100 text-purple-700">
                                      HUB
                                    </span>
                                  )}
                                </div>
                                <p className="text-[10px] sm:text-[11px] font-medium text-gray-600">
                                  {loc.team} Expert{loc.team > 1 ? 's' : ''}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </foreignObject>
                    )}
                  </g>
                </Marker>
              );
            })}
          </ComposableMap>

          {/* Map Legend */}
          <div className="absolute bottom-2.5 right-3 sm:bottom-4 sm:right-6 bg-white/85 backdrop-blur-md border border-gray-200/80 rounded-xl px-2.5 sm:px-3.5 py-1.5 sm:py-2 flex items-center gap-3 sm:gap-4 shadow-xs z-10">
            <div className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border border-white shadow-xs"
                style={{ background: `linear-gradient(135deg, ${ACCENT.purple}, ${ACCENT.orange})` }}
              />
              <span className="text-[10px] sm:text-xs font-medium text-gray-700">Engineering Hub</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div
                className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full border border-white shadow-xs"
                style={{ background: `linear-gradient(135deg, ${ACCENT.blue}, ${ACCENT.cyan})` }}
              />
              <span className="text-[10px] sm:text-xs font-medium text-gray-700">Global Node</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
