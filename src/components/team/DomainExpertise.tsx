'use client';

import { motion } from 'framer-motion';
import {
  Heart, ShoppingCart, Wallet, Factory, Landmark, HardHat,
  GraduationCap, Building2, Truck, Hotel,
} from 'lucide-react';
import { domains, ACCENT } from './data';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Heart, ShoppingCart, Wallet, Factory, Landmark, HardHat,
  GraduationCap, Building2, Truck, Hotel,
};

export default function DomainExpertise() {
  return (
    <section className="py-20 md:py-28 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="gradient-text">Domain Expertise</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Deep experience across industries
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-5">
          {domains.map((domain, i) => {
            const Icon = iconMap[domain.icon] || Heart;
            return (
              <motion.div
                key={domain.name}
                className="group [perspective:800px] h-40 md:h-44"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front */}
                  <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl bg-white border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center justify-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${ACCENT.purple}12` }}
                    >
                      <Icon size={24} style={{ color: ACCENT.purple }} />
                    </div>
                    <span className="text-sm md:text-base font-semibold text-foreground">
                      {domain.name}
                    </span>
                  </div>

                  {/* Back */}
                  <div
                    className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl p-6 flex flex-col items-center justify-center gap-2"
                    style={{
                      background: `linear-gradient(135deg, ${ACCENT.purple}, ${ACCENT.blue})`,
                    }}
                  >
                    <span className="text-2xl md:text-3xl font-bold text-white">
                      {domain.projects}
                    </span>
                    <span className="text-sm font-medium text-white/80">Projects</span>
                    <div className="w-8 h-px bg-white/30" />
                    <span className="text-xs text-white/70">{domain.experience}</span>
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
