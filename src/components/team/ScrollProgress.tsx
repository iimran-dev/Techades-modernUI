'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;

    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (barRef.current) {
          gsap.set(barRef.current, {
            width: `${self.progress * 100}%`,
          });
        }
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 h-[3px] z-[9999]"
      style={{
        background:
          'linear-gradient(90deg, #6C4CF1 0%, #3F8CFF 35%, #00C2FF 65%, #FF7A32 100%)',
        width: '0%',
        boxShadow:
          '0 0 8px rgba(108,76,241,0.4), 0 0 16px rgba(0,194,255,0.2)',
      }}
      role="progressbar"
      aria-label="Page scroll progress"
    />
  );
}
