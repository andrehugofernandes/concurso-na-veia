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
      const isMobile = window.innerWidth < 768;
      const offset = isMobile ? 35 : 80;

      // Criamos uma única timeline sincronizada com o scroll da seção
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom', // começa assim que o topo entra no rodapé da tela
          end: 'bottom top',   // termina quando o rodapé sai pelo topo da tela
          scrub: 1.5,          // scrub um pouco mais suave para dar sensação orgânica
        },
      });

      // 1. ANIMAÇÃO DO BADGE: Esquerda (-offset) -> Centro (0) -> Direita (+offset)
      tl.fromTo(
        badgeRef.current,
        { x: -offset, opacity: 0.4 },
        { x: 0, opacity: 1, duration: 1, ease: 'power1.out' },
        0
      )
      // Mantém centralizado por um breve período de rolagem para leitura confortável
      .to(badgeRef.current, { x: 0, opacity: 1, duration: 0.4 }, 1)
      .to(badgeRef.current, { x: offset, opacity: 0.4, duration: 1, ease: 'power1.in' }, 1.4);

      // 2. ANIMAÇÃO DO TÍTULO: Direita (+offset) -> Centro (0) -> Esquerda (-offset)
      tl.fromTo(
        titleRef.current,
        { x: offset, opacity: 0.4 },
        { x: 0, opacity: 1, duration: 1, ease: 'power1.out' },
        0
      )
      // Mantém centralizado pelo mesmo período de leitura
      .to(titleRef.current, { x: 0, opacity: 1, duration: 0.4 }, 1)
      .to(titleRef.current, { x: -offset, opacity: 0.4, duration: 1, ease: 'power1.in' }, 1.4);
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
