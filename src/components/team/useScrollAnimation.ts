'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useScrollAnimation(options?: {
  y?: number;
  x?: number;
  opacity?: number;
  scale?: number;
  blur?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  trigger?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const {
      y = 60,
      x = 0,
      opacity = 0,
      scale = 1,
      blur = 0,
      duration = 0.8,
      delay = 0,
      stagger = 0,
      trigger = true,
    } = options || {};

    const el = ref.current;

    if (stagger > 0) {
      const children = el.children;
      gsap.set(children, {
        y,
        x,
        opacity,
        scale,
        filter: blur > 0 ? `blur(${blur}px)` : 'none',
      });

      gsap.to(children, {
        y: 0,
        x: 0,
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: trigger
          ? {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          : undefined,
      });
    } else {
      gsap.set(el, {
        y,
        x,
        opacity,
        scale,
        filter: blur > 0 ? `blur(${blur}px)` : 'none',
      });

      gsap.to(el, {
        y: 0,
        x: 0,
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: trigger
          ? {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          : undefined,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [options]);

  return ref;
}

export function useCountUp(
  end: number,
  duration: number = 2,
  triggerStart: string = 'top 85%'
) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;

    const obj = { value: 0 };

    ScrollTrigger.create({
      trigger: ref.current,
      start: triggerStart,
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        gsap.to(obj, {
          value: end,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            if (ref.current) {
              const formatted =
                end >= 1000
                  ? Math.floor(obj.value).toLocaleString()
                  : Math.floor(obj.value).toString();
              ref.current.textContent = formatted;
            }
          },
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === ref.current) st.kill();
      });
    };
  }, [end, duration, triggerStart]);

  return ref;
}
