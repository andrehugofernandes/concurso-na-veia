import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import HeroCarousel from '../HeroCarousel';
import HomeHeader from './HomeHeader';
import { LuMouse } from 'react-icons/lu';

export default function HomeHero() {
  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="bg-slate-50 dark:bg-primary pt-4 px-4 pb-0">
      {/* Container principal do Hero com bordas arredondadas simulando o frame */}
      <div className="relative h-[calc(100vh-16px)] flex flex-col items-center justify-center overflow-hidden bg-slate-950 rounded-[30px] md:rounded-[40px] shadow-2xl">
        
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/80 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-white/80 text-xs font-bold tracking-widest uppercase">
              Edital 2026 Confirmado
            </span>
          </motion.div>

          {/* Título Principal */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl mx-auto text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.1] mb-8"
          >
            <span 
              className="block bg-clip-text text-transparent pb-2"
              style={{ backgroundImage: "var(--primary-gradient)" }}
            >
              Sua preparação para Concursos Públicos.
            </span>
            <span className="block text-white">
              Potencializada por IA.
            </span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-white/70 leading-relaxed font-medium mb-12"
          >
            Simulados inteligentes baseados no padrão CESGRANRIO. Estude os temas com maior recorrência nas provas e evolua seu desempenho com análise de IA.
          </motion.p>

          {/* Botões CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <Link
              href="/register"
              className="px-8 py-4 text-white hover:text-white font-bold rounded-full hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all text-lg"
              style={{ backgroundImage: "var(--primary-gradient)" }}
            >
              Começar Grátis →
            </Link>
            <a
              href="#cursos"
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:text-white font-semibold rounded-full hover:bg-white/20 transition-all text-lg flex items-center gap-2"
            >
              Explorar Cursos <span className="text-xl">→</span>
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator (Icon Only & Clickable) */}
        <motion.button 
          onClick={scrollToNext}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[60] w-14 h-14 flex items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors cursor-pointer text-white"
          aria-label="Rolar para baixo"
        >
          <LuMouse className="w-6 h-6" />
        </motion.button>
        
        {/* Curved cutout effect for the bottom section (Trusted By) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-11/12 md:w-3/4 max-w-4xl h-12 bg-slate-50 dark:bg-primary rounded-t-[30px] z-[50] flex items-center justify-center">
        </div>
      </div>
    </section>
  );
}
