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
  align?: 'center' | 'left';
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
  align = "center",
}: ScrollAnimatedHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const offset = isMobile ? 45 : 120;
      const overshoot = offset * 0.2; // 20% além do alinhamento central (cruzamento)

      // Criamos uma timeline sincronizada com o scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom', // Inicia assim que o topo entra na tela
          end: 'bottom 40%',   // Finaliza e trava o alinhamento no centro bem antes de sair da tela
          scrub: 1.8,          // Scrub elástico suave para amortecer a física do bounce
        },
      });

      // 1. ANIMAÇÃO DO BADGE: Começa na Esquerda (-offset) -> Cruza o centro -> Vai até +overshoot -> Bounce -> Fixa em 0
      tl.fromTo(
        badgeRef.current,
        { x: -offset, opacity: 0 },
        { x: overshoot, opacity: 1, duration: 0.4, ease: 'sine.inOut' }
      )
      // Bounce - Recuo 1 (volta um pouco para trás)
      .to(badgeRef.current, { x: overshoot * 0.25, duration: 0.12, ease: 'sine.inOut' })
      // Bounce - Pico 2 (avança um pouco de volta)
      .to(badgeRef.current, { x: overshoot * 0.5, duration: 0.1, ease: 'sine.inOut' })
      // Estabiliza e trava em 0 (100% alinhado)
      .to(badgeRef.current, { x: 0, duration: 0.1, ease: 'sine.inOut' })
      // Fixação do alinhamento no centro para leitura estável
      .to(badgeRef.current, { x: 0, duration: 0.4 });

      // 2. ANIMAÇÃO DO TÍTULO: Começa na Direita (+offset) -> Cruza o centro -> Vai até -overshoot -> Bounce -> Fixa em 0
      tl.fromTo(
        titleRef.current,
        { x: offset, opacity: 0 },
        { x: -overshoot, opacity: 1, duration: 0.4, ease: 'sine.inOut' },
        0 // Inicia exatamente junto com o badge
      )
      // Bounce - Recuo 1
      .to(titleRef.current, { x: -overshoot * 0.25, duration: 0.12, ease: 'sine.inOut' }, 0.4)
      // Bounce - Pico 2
      .to(titleRef.current, { x: -overshoot * 0.5, duration: 0.1, ease: 'sine.inOut' }, 0.52)
      // Estabiliza e trava em 0 (100% alinhado)
      .to(titleRef.current, { x: 0, duration: 0.1, ease: 'sine.inOut' }, 0.62)
      // Fixação do alinhamento no centro para leitura estável
      .to(titleRef.current, { x: 0, duration: 0.4 }, 0.72);
    });

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`${align === 'left' ? 'text-center lg:text-left max-w-3xl mx-auto lg:mx-0' : 'text-center max-w-3xl mx-auto'} overflow-visible ${className}`}
    >
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
