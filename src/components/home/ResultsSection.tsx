import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Zap, Target, Bot } from 'lucide-react';
import { gsap } from 'gsap';

const stats = [
  {
    icon: Users,
    value: '12K+',
    label: 'Candidatos Beneficiados',
    sub: 'Mais de 12 mil estudantes já aceleraram seus estudos com a nossa plataforma.',
    colorClass: 'bg-green-500/10 text-green-600 dark:text-green-500',
    isDarkCard: false,
  },
  {
    icon: TrendingUp,
    value: '+98%',
    label: 'Evolução em Simulados',
    sub: 'Aumento médio na pontuação para assinantes que estudam diariamente.',
    colorClass: 'bg-emerald-500/10 text-emerald-500',
    isDarkCard: true,
  },
  {
    icon: Zap,
    value: '12x',
    label: 'Criação de Planos',
    sub: 'Rapidez na geração de cronogramas para o edital do concurso.',
    colorClass: 'bg-amber-500/10 text-amber-500',
    isDarkCard: false,
  },
  {
    icon: Target,
    value: '4x',
    label: 'Mais Questões Resolvidas',
    sub: 'Volume de estudos superior comparado à preparação tradicional.',
    colorClass: 'bg-pink-500/10 text-pink-500',
    isDarkCard: false,
  },
  {
    icon: Bot,
    value: '98%',
    label: 'Redução de Burocracia',
    sub: 'Automação inteligente de cronograma, revisões e métricas.',
    colorClass: 'bg-indigo-500/10 text-indigo-500',
    isDarkCard: false,
  },
];

export default function ResultsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const loopRef = useRef<gsap.core.Tween | null>(null);
  const cardAnimsRef = useRef<gsap.core.Tween[]>([]);

  // Triplicamos os itens para garantir um looping infinito perfeitamente fluido e contínuo
  const duplicatedItems = [...stats, ...stats, ...stats];

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, duplicatedItems.length);

    const ctx = gsap.context(() => {
      // 1. Loop contínuo horizontal de translação
      const loop = gsap.to(trackRef.current, {
        xPercent: -33.3333,
        ease: 'none',
        repeat: -1,
        duration: 22,
      });
      loopRef.current = loop;

      // 2. Movimento orgânico peristáltico tipo "minhoca"
      // Cada card sofre expansão/contração e oscilação de X/Y de forma dessincronizada (staggered)
      // Porém, os clones (itens na mesma posição relativa do loop) têm a mesma fase/delay
      // garantindo que a transição de loop seja 100% imperceptível
      duplicatedItems.forEach((_, index) => {
        const card = cardRefs.current[index];
        if (!card) return;

        const originalIndex = index % stats.length;

        const anim = gsap.to(card, {
          scaleX: 1.07,
          scaleY: 0.94,
          x: 14,
          y: 3,
          duration: 1.6,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: originalIndex * 0.28,
        });
        cardAnimsRef.current.push(anim);
      });
    });

    return () => {
      ctx.revert();
      cardAnimsRef.current = [];
    };
  }, []);

  const handleMouseEnter = () => {
    // Reduz suavemente a velocidade geral para 15% ao passar o mouse
    if (loopRef.current) {
      gsap.to(loopRef.current, { timeScale: 0.15, duration: 0.8, ease: 'power2.out' });
    }
    // Desacelera as animações de minhoca individuais
    cardAnimsRef.current.forEach((anim) => {
      gsap.to(anim, { timeScale: 0.25, duration: 0.8, ease: 'power2.out' });
    });
  };

  const handleMouseLeave = () => {
    // Retorna suavemente à velocidade original
    if (loopRef.current) {
      gsap.to(loopRef.current, { timeScale: 1, duration: 0.8, ease: 'power2.out' });
    }
    cardAnimsRef.current.forEach((anim) => {
      gsap.to(anim, { timeScale: 1, duration: 0.8, ease: 'power2.out' });
    });
  };

  return (
    <section id="resultados" className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden border-t border-slate-200 dark:border-white/5">
      {/* Glowes de background */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full relative z-10">
        {/* Section label */}
        <div className="text-center mb-4 px-6">
          <span
            className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-black tracking-widest uppercase"
            style={{ color: 'var(--primary-hex, #22c55e)' }}
          >
            A plataforma de estudos com impacto real
          </span>
        </div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-4xl md:text-5xl font-black tracking-tight mb-16 max-w-3xl mx-auto px-6 text-slate-900 dark:text-white"
        >
          A VAGA EH MINHA gera{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: 'var(--primary-gradient)' }}
          >
            resultados extraordinários
          </span>{' '}
          para candidatos
        </motion.h2>

        {/* Carrossel Infinito com Efeito Minhoca */}
        <div className="w-full overflow-hidden py-10 relative">
          {/* Degradê de Fade nas Bordas Laterais */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 dark:from-slate-900 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 dark:from-slate-900 to-transparent z-20 pointer-events-none" />

          <div
            ref={trackRef}
            className="flex gap-6 w-max select-none cursor-grab active:cursor-grabbing px-6"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {duplicatedItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className={`flex-shrink-0 w-[300px] md:w-[330px] p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-[210px] ${
                    item.isDarkCard
                      ? 'bg-slate-950 border-white/10 text-white shadow-2xl shadow-emerald-950/20'
                      : 'bg-white dark:bg-background border-slate-200 dark:border-white/10 text-slate-900 dark:text-white shadow-lg'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-4 mb-3">
                      <div className={`w-12 h-12 rounded-xl ${item.colorClass} flex items-center justify-center shrink-0`}>
                        <Icon className="w-6 h-6" strokeWidth={2.5} />
                      </div>
                      <span
                        className="text-3xl font-black bg-clip-text text-transparent"
                        style={{ backgroundImage: 'var(--primary-gradient)' }}
                      >
                        {item.value}
                      </span>
                    </div>
                    <h4 className={`text-sm font-extrabold tracking-tight ${item.isDarkCard ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                      {item.label}
                    </h4>
                    <p className={`text-xs mt-2 leading-relaxed font-medium ${item.isDarkCard ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400'}`}>
                      {item.sub}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
