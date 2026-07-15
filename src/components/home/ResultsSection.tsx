"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import AnimatedElement from '../ui/AnimatedElement';
import { Users, TrendingUp, Zap, Target, Bot } from 'lucide-react';
import { gsap } from 'gsap';

const stats = [
  {
    icon: Users,
    value: '12K+',
    label: 'Candidatos Beneficiados',
    sub: 'Mais de 12 mil estudantes já aceleraram seus estudos com a nossa plataforma.',
    colorClass: 'bg-green-500/10 text-green-400',
    borderClass: 'border-green-500/15',
    glowClass: 'shadow-green-500/5',
  },
  {
    icon: TrendingUp,
    value: '+98%',
    label: 'Evolução em Simulados',
    sub: 'Aumento médio na pontuação para assinantes que estudam diariamente.',
    colorClass: 'bg-emerald-500/10 text-emerald-400',
    borderClass: 'border-emerald-500/20',
    glowClass: 'shadow-emerald-500/5',
  },
  {
    icon: Zap,
    value: '12x',
    label: 'Criação de Planos',
    sub: 'Rapidez na geração de cronogramas para o edital do concurso.',
    colorClass: 'bg-amber-500/10 text-amber-400',
    borderClass: 'border-amber-500/15',
    glowClass: 'shadow-amber-500/5',
  },
  {
    icon: Target,
    value: '4x',
    label: 'Mais Questões Resolvidas',
    sub: 'Volume de estudos superior comparado à preparação tradicional.',
    colorClass: 'bg-pink-500/10 text-pink-400',
    borderClass: 'border-pink-500/15',
    glowClass: 'shadow-pink-500/5',
  },
  {
    icon: Bot,
    value: '98%',
    label: 'Redução de Burocracia',
    sub: 'Automação inteligente de cronograma, revisões e métricas.',
    colorClass: 'bg-cyan-500/10 text-cyan-400',
    borderClass: 'border-cyan-500/15',
    glowClass: 'shadow-cyan-500/5',
  },
];

const MarqueeRow = ({ items, direction = -1, duration = 30, rowIndex }: { items: any[], direction?: number, duration?: number, rowIndex: number }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const loopRef = useRef<gsap.core.Tween | null>(null);
  const cardAnimsRef = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, items.length);

    const ctx = gsap.context(() => {
      const startX = direction === -1 ? 0 : -33.3333;
      const endX = direction === -1 ? -33.3333 : 0;
      
      gsap.set(trackRef.current, { xPercent: startX });
      const loop = gsap.to(trackRef.current, {
        xPercent: endX,
        ease: 'none',
        repeat: -1,
        duration: duration,
      });
      loopRef.current = loop;

      items.forEach((_, index) => {
        const card = cardRefs.current[index];
        if (!card) return;

        const originalIndex = index % 5;
        const anim = gsap.to(card, {
          scaleX: 1.03,
          scaleY: 0.97,
          x: direction === -1 ? 8 : -8,
          y: 2,
          duration: 1.8 + rowIndex * 0.4,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: originalIndex * 0.3,
        });
        cardAnimsRef.current.push(anim);
      });
    });

    return () => {
      ctx.revert();
      cardAnimsRef.current = [];
    };
  }, [items, direction, duration, rowIndex]);

  return (
    <div
      ref={trackRef}
      className="flex gap-8 w-max select-none pointer-events-none px-6 mb-8 last:mb-0"
    >
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <div key={index} className="flex-shrink-0">
            <div
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`w-[310px] md:w-[340px] p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between h-[200px] md:h-[220px] bg-slate-900/60 ${item.borderClass} text-white ${item.glowClass} shadow-xl`}
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-2xl ${item.colorClass} flex items-center justify-center shrink-0`}>
                    <Icon className="w-6 h-6" strokeWidth={2.5} />
                  </div>
                  <span
                    className="text-3xl md:text-4xl font-black bg-clip-text text-transparent"
                    style={{ backgroundImage: 'var(--primary-gradient)' }}
                  >
                    {item.value}
                  </span>
                </div>
                <h4 className="text-base md:text-lg font-extrabold tracking-tight text-white/95">
                  {item.label}
                </h4>
                <p className="text-xs md:text-sm mt-3 leading-relaxed font-medium text-slate-400">
                  {item.sub}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default function ResultsSection() {
  const row1 = [...stats, ...stats, ...stats];
  
  const stats2 = [...stats].reverse();
  const row2 = [...stats2, ...stats2, ...stats2];

  const stats3 = [stats[2], stats[3], stats[4], stats[0], stats[1]];
  const row3 = [...stats3, ...stats3, ...stats3];

  const stats4 = [stats[4], stats[3], stats[2], stats[1], stats[0]];
  const row4 = [...stats4, ...stats4, ...stats4];

  const stats5 = [stats[1], stats[2], stats[3], stats[4], stats[0]];
  const row5 = [...stats5, ...stats5, ...stats5];

  const stats6 = [...stats2];
  const row6 = [...stats6, ...stats6, ...stats6];

  return (
    <section id="resultados" className="relative min-h-[750px] md:min-h-[900px] bg-slate-950 flex items-center justify-center overflow-hidden border-t border-b border-white/5 py-24 md:py-32">
      {/* 1. Parede de Cards Inclinada no Background (estilo Apple TV) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden opacity-[0.45] pointer-events-none select-none z-0"
      >
        <div className="transform -skew-y-12 scale-[1.45] origin-center py-4 flex flex-col justify-center h-full">
          <MarqueeRow items={row1} direction={-1} duration={32} rowIndex={0} />
          <MarqueeRow items={row2} direction={1} duration={40} rowIndex={1} />
          <MarqueeRow items={row3} direction={-1} duration={28} rowIndex={2} />
          <MarqueeRow items={row4} direction={1} duration={36} rowIndex={3} />
          <MarqueeRow items={row5} direction={-1} duration={30} rowIndex={4} />
          <MarqueeRow items={row6} direction={1} duration={42} rowIndex={5} />
        </div>
      </div>

      {/* 2. Máscaras de Gradiente para dar profundidade e contraste */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/25 to-slate-950 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,#020617_95%)] z-10 pointer-events-none" />

      {/* 3. Conteúdo Principal Sobreposto e Centralizado */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
        {/* Efeito Glow atrás do texto */}
        <div className="absolute inset-0 -m-20 bg-green-500/10 blur-[130px] rounded-full z-0 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
          <AnimatedElement delay={0.1}>
            <span 
              className="px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 font-bold text-xs uppercase tracking-widest mb-8 shadow-lg shadow-primary/10 backdrop-blur-md"
              style={{ color: 'var(--primary-hex, #22c55e)' }}
            >
              A plataforma de estudos com impacto real
            </span>
          </AnimatedElement>
          
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.08] mb-8 drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
            PASSEI NO CONCURSO.AI gera <br className="hidden md:inline" />
            <span 
              className="bg-clip-text text-transparent font-extrabold"
              style={{ backgroundImage: 'var(--primary-gradient)' }}
            >
              resultados extraordinários
            </span> <br className="hidden md:inline" />
            para candidatos
          </h2>
          
          <AnimatedElement delay={0.2}>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 font-medium max-w-2xl leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Estude com Inteligência Artificial (IA) através de simulados avançados que decifram o padrão das principais bancas (CESGRANRIO, Cebraspe, FGV, IBFC). Acompanhe sua evolução e conquiste sua vaga usando cronogramas gerados por Inteligência Artificial (IA).
            </p>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
}
