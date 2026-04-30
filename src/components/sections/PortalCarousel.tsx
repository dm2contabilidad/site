'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getReducedMotion() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServer() {
  return false;
}

interface Slide {
  src: string;
  alt: string;
  caption: string;
}

interface PortalCarouselProps {
  slides: Slide[];
  autoplayMs?: number;
  ariaLabel?: string;
}

/**
 * Carrusel premium discreto, sin librerías externas.
 * - Scroll-snap horizontal nativo (swipe mobile, drag desktop opcional)
 * - Autoplay lento con pausa en hover, focus y prefers-reduced-motion
 * - Profundidad sutil: slide ativa = scale 100; vizinhos = scale 90 + opacity 60
 * - Reactivo al scroll del usuario: sincroniza activeIndex via IntersectionObserver
 */
export function PortalCarousel({
  slides,
  autoplayMs = 5500,
  ariaLabel = 'Capturas do portal do cliente',
}: PortalCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Suscripción canónica a prefers-reduced-motion (sin setState en useEffect)
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getReducedMotionServer,
  );

  // Scroll programático al index dado
  const goTo = useCallback((index: number) => {
    const item = itemRefs.current[index];
    const track = trackRef.current;
    if (!item || !track) return;
    const itemCenter = item.offsetLeft + item.offsetWidth / 2;
    const trackCenter = track.offsetWidth / 2;
    track.scrollTo({
      left: itemCenter - trackCenter,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  }, [reducedMotion]);

  // Sincroniza activeIndex con el slide más cercano al centro durante scroll del usuario
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const trackRect = track.getBoundingClientRect();
        const trackCenter = trackRect.left + trackRect.width / 2;
        let closestIndex = 0;
        let closestDistance = Infinity;
        itemRefs.current.forEach((item, i) => {
          if (!item) return;
          const itemRect = item.getBoundingClientRect();
          const itemCenter = itemRect.left + itemRect.width / 2;
          const distance = Math.abs(itemCenter - trackCenter);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = i;
          }
        });
        setActiveIndex(closestIndex);
      }, 80);
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  // Autoplay
  useEffect(() => {
    if (isPaused || reducedMotion) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % slides.length;
        return next;
      });
    }, autoplayMs);
    return () => clearInterval(interval);
  }, [isPaused, reducedMotion, slides.length, autoplayMs]);

  // Cuando activeIndex cambia (por autoplay o click), sincroniza el scroll
  useEffect(() => {
    goTo(activeIndex);
  }, [activeIndex, goTo]);

  return (
    <div
      className="w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div
        ref={trackRef}
        role="region"
        aria-label={ariaLabel}
        aria-roledescription="carousel"
        className="relative flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pt-2 pb-8"
        style={{ scrollbarWidth: 'none' }}
      >
        {/* Spacers virtuales para que primer y último slide puedan centrarse */}
        <div aria-hidden="true" className="shrink-0 w-[10%] sm:w-[20%] lg:w-[8%]" />

        {slides.map((slide, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={slide.caption}
              ref={(el) => { itemRefs.current[i] = el; }}
              className="snap-center shrink-0 w-[72%] sm:w-[42%] md:w-[32%] lg:w-[28%]"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${slides.length}: ${slide.caption}`}
              aria-current={isActive ? 'true' : undefined}
            >
              <figure
                className={`flex flex-col transition-all duration-500 ease-out ${
                  isActive
                    ? 'scale-100 opacity-100'
                    : 'scale-[0.92] opacity-60'
                }`}
              >
                <div
                  className={`relative rounded-2xl overflow-hidden bg-white border transition-shadow duration-500 ${
                    isActive
                      ? 'border-[color:var(--color-border-soft)] shadow-[0_24px_48px_-20px_rgba(7,71,93,0.25)]'
                      : 'border-[color:var(--color-border-soft)] shadow-[0_8px_20px_-12px_rgba(7,71,93,0.15)]'
                  }`}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    width={360}
                    height={716}
                    sizes="(min-width: 1024px) 280px, (min-width: 640px) 38vw, 70vw"
                    className="block w-full h-auto"
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                </div>
                <figcaption
                  className={`mt-4 text-xs uppercase tracking-wider text-center transition-colors duration-300 ${
                    isActive ? 'text-navy-800' : 'text-neutral-500'
                  }`}
                  style={{ fontFamily: 'var(--font-label)' }}
                >
                  {slide.caption}
                </figcaption>
              </figure>
            </div>
          );
        })}

        <div aria-hidden="true" className="shrink-0 w-[10%] sm:w-[20%] lg:w-[8%]" />
      </div>

      {/* Indicadores discretos */}
      <div className="flex justify-center gap-2.5 mt-2" role="tablist" aria-label="Selecionar slide">
        {slides.map((slide, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={slide.caption}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Ir para slide ${i + 1}: ${slide.caption}`}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-800 focus-visible:ring-offset-2 ${
                isActive
                  ? 'w-7 bg-gold-500'
                  : 'w-1.5 bg-navy-200 hover:bg-navy-400'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
