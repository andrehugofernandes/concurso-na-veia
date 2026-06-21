import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimatedHeaderProps {
  badgeText: string;
  titleText: React.ReactNode;
  subtitleText?: React.ReactNode;
  badgeColorClass?: string;
  badgeStyle?: React.CSSProperties;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export default function ScrollAnimatedHeader({
  badgeText,
  titleText,
  subtitleText,
  badgeColorClass = "border-primary/20 bg-primary/10 text-primary",
  badgeStyle,
  className = "mb-16",
  titleClassName,
  subtitleClassName,
}: ScrollAnimatedHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Badge desliza suavemente para a direita (eixo X) no scroll
      gsap.fromTo(
        badgeRef.current,
        { x: -30, opacity: 0.8 },
        {
          x: 30,
          opacity: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2, // suavização do movimento com o scroll
          },
        }
      );

      // 2. Título desliza suavemente para a esquerda (eixo X) criando um parallax oposto
      gsap.fromTo(
        titleRef.current,
        { x: 30, opacity: 0.8 },
        {
          x: -30,
          opacity: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`text-center max-w-3xl mx-auto overflow-visible ${className}`}>
      {/* Badge Animado */}
      <div
        ref={badgeRef}
        className={`inline-block mb-4 px-4 py-1.5 rounded-full border text-xs md:text-sm font-black tracking-wider uppercase select-none ${badgeColorClass}`}
        style={badgeStyle}
      >
        {badgeText}
      </div>

      {/* Título Animado */}
      <h2
        ref={titleRef}
        className={`text-3xl md:text-5xl font-black tracking-tight mb-6 leading-tight ${titleClassName || 'text-slate-900 dark:text-white'}`}
      >
        {titleText}
      </h2>

      {/* Subtítulo Estático (para legibilidade) */}
      {subtitleText && (
        <p className={`text-base md:text-lg font-medium leading-relaxed ${subtitleClassName || 'text-slate-500 dark:text-slate-400'}`}>
          {subtitleText}
        </p>
      )}
    </div>
  );
}
