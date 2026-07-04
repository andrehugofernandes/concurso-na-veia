"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import HeroCarousel from '../HeroCarousel';
import HomeHeader from './HomeHeader';
import { LuMouse } from 'react-icons/lu';
import AnimatedElement from '../ui/AnimatedElement';

export default function HomeHero() {
  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="bg-slate-100 dark:bg-primary p-4">
      {/* Container principal do Hero com bordas arredondadas simulando o frame */}
      <div className="relative min-h-[calc(100vh-32px)] md:h-[calc(100vh-32px)] flex flex-col items-center justify-start md:justify-center pt-[100px] xs:pt-[115px] md:pt-[140px] lg:pt-[165px] xl:pt-[190px] 2xl:pt-[210px] pb-[100px] xs:pb-[115px] md:pb-[140px] lg:pb-[165px] xl:pb-[190px] 2xl:pb-[210px] overflow-hidden bg-slate-950 rounded-[30px] md:rounded-[40px] shadow-2xl">
        
        {/* Header embutido para fazer o efeito de recortes "cutout" na borda */}
        <HomeHeader />

        {/* Background Carousel com overlay escuro */}
        <div className="absolute inset-0 z-0">
          <HeroCarousel />
          <div className="absolute inset-0 bg-slate-950/40" />
        </div>

        {/* Glow da cor do skin */}
        <div className="absolute inset-0 bg-primary/15 mix-blend-overlay pointer-events-none z-[1]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/20 blur-[120px] pointer-events-none rounded-full z-[1]" />
        
        {/* Grid sutil de textura */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] pointer-events-none z-[1]" />

        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          
          {/* Pill Tag */}
          <AnimatedElement
            delay={0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-3 md:mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/80 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-white/80 text-xs font-bold tracking-widest uppercase">
              Edital 2026 Confirmado
            </span>
          </AnimatedElement>

          {/* Título Principal */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl mx-auto text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.1] mb-4 md:mb-8"
          >
            <span className="block text-white pb-2">
              Sua preparação para <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--primary-gradient)" }}>Concursos Públicos.</span>
            </span>
            <span className="block text-white">
              Potencializada por <span className="text-primary" style={{ color: "var(--primary-hex)" }}>Inteligência Artificial.</span>
            </span>
          </motion.h1>

          {/* Subtítulo */}
          <AnimatedElement
            delay={0.2}
            className="max-w-2xl mx-auto text-base md:text-xl text-white/70 leading-relaxed font-medium mb-5 md:mb-12"
          >
            Simulados inteligentes focados nas principais bancas do país (CESGRANRIO, Cebraspe, FGV, IBFC). Estude os temas com maior recorrência nas provas da Petrobras, Caixa, Correios, INSS, IBGE e evolua seu desempenho com análise de Inteligência Artificial.
          </AnimatedElement>

          {/* Botões CTA */}
          <AnimatedElement
            delay={0.3}
            className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full sm:w-auto px-4 sm:px-0"
          >
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-3.5 md:py-4 text-white hover:text-white font-bold rounded-full hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all text-base md:text-lg text-center"
              style={{ backgroundImage: "var(--primary-gradient)" }}
            >
              Começar Grátis →
            </Link>
            <a
              href="/#cursos"
              className="w-full sm:w-auto px-8 py-3.5 md:py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:text-white font-semibold rounded-full hover:bg-white/20 transition-all text-base md:text-lg flex items-center justify-center gap-2"
            >
              Explorar Cursos <span className="text-xl">→</span>
            </a>
          </AnimatedElement>
        </div>

        {/* Scroll Indicator (Icon Only & Clickable) - Oculto no Mobile */}
        <motion.button 
          onClick={scrollToNext}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-[60] w-14 h-14 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors cursor-pointer text-white"
          aria-label="Rolar para baixo"
        >
          <LuMouse className="w-6 h-6" />
        </motion.button>
        
      </div>
    </section>
  );
}
