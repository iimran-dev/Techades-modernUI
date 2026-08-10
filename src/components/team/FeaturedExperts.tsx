'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Briefcase, Clock } from 'lucide-react';
import { featuredExperts, GRADIENT, ACCENT } from './data';
import { useScrollAnimation } from './useScrollAnimation';

function DotButton({
  index,
  selectedIndex,
  onClick,
}: {
  index: number;
  selectedIndex: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`transition-all duration-300 rounded-full ${
        index === selectedIndex
          ? 'w-8 h-2.5'
          : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
      }`}
      style={
        index === selectedIndex
          ? { background: GRADIENT.purpleToOrange }
          : undefined
      }
      aria-label={`Go to slide ${index + 1}`}
    />
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const fill = Math.min(Math.max(rating - (star - 1), 0), 1);
        return (
          <div key={star} className="relative w-4 h-4">
            <Star className="w-4 h-4 text-gray-200" strokeWidth={1.5} />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star
                className="w-4 h-4"
                style={{ color: ACCENT.orange }}
                fill={ACCENT.orange}
                strokeWidth={1.5}
              />
            </div>
          </div>
        );
      })}
      <span className="ml-1.5 text-sm font-semibold text-gray-700">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

function FeaturedCard({
  expert,
}: {
  expert: (typeof featuredExperts)[0];
}) {
  const [hovered, setHovered] = useState(false);
  const initials = expert.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <motion.div
      className="min-w-[340px] sm:min-w-[400px] flex-shrink-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="gradient-border overflow-hidden rounded-3xl bg-white p-1">
        <div className="rounded-[22px] overflow-hidden bg-white p-5 sm:p-6">
          <div className="flex gap-5 sm:gap-6">
            {/* Photo */}
            <div className="relative flex-shrink-0 w-[120px] h-[140px] sm:w-[140px] sm:h-[160px] rounded-2xl overflow-hidden">
              <motion.div
                className="absolute inset-0"
                animate={{ scale: hovered ? 1.08 : 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <Image
                  src={expert.image}
                  alt={expert.name}
                  fill
                  className="object-cover"
                  sizes="140px"
                  priority
                />
              </motion.div>
              {/* Fallback initials overlay if image fails */}
              <div
                className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl -z-10"
                style={{ background: GRADIENT.purpleToBlue }}
              >
                {initials}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                  {expert.name}
                </h3>
                <p
                  className="text-sm font-semibold mt-0.5"
                  style={{ color: expert.color }}
                >
                  {expert.role}
                </p>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed line-clamp-2">
                  {expert.bio}
                </p>
              </div>

              {/* Rating */}
              <div className="mt-2">
                <StarRating rating={expert.rating} />
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {expert.yearsExp}+ yrs
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5" />
                  {expert.projects} projects
                </span>
              </div>

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {expert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-2.5 py-1 text-[11px] font-medium rounded-full bg-gray-50 text-gray-600 border border-gray-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedExperts() {
  const headingRef = useScrollAnimation({ y: 40, blur: 4, duration: 0.7 });
  const carouselRef = useScrollAnimation({
    y: 60,
    blur: 6,
    duration: 0.9,
    delay: 0.15,
  });

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    dragFree: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div ref={headingRef} className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          Featured{' '}
          <span className="gradient-text">Experts</span>
        </h2>
        <p className="mt-4 text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          The leadership driving our engineering excellence
        </p>
      </div>

      {/* Carousel Container */}
      <div ref={carouselRef}>
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="flex items-center justify-end gap-2 mb-5">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center transition-all duration-200 hover:border-gray-300 hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-none"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center transition-all duration-200 hover:border-gray-300 hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-none"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Embla Viewport */}
          <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
            <div className="flex gap-6">
              {featuredExperts.map((expert) => (
                <div key={expert.id} className="flex-[0_0_auto]">
                  <FeaturedCard expert={expert} />
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {featuredExperts.map((_, index) => (
              <DotButton
                key={index}
                index={index}
                selectedIndex={selectedIndex}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
