"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ConcursoNaVeiaLogo from '../ConcursoNaVeiaLogo';
import { LuLayoutGrid, LuX, LuArrowRight } from 'react-icons/lu';
import { AuthThemeToggle } from '../auth/AuthThemeToggle';

export default function HomeHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const bgColor = "bg-slate-50 dark:bg-primary";
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen && 
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('#menu-toggle-desktop, #menu-toggle-mobile')
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <>
      {/* DESKTOP HEADER ELEMENTS */}
      
      {/* Menu Tab (Top Left) */}
      <div 
        className={`hidden md:flex absolute -top-[1px] left-12 ${bgColor} rounded-b-[20px] px-6 items-center gap-3 z-[60]`}
        style={{ height: '68px' }}
      >
        <button 
          id="menu-toggle-desktop"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 text-slate-900 dark:text-primary-foreground hover:text-primary dark:hover:text-primary-foreground/80 transition-colors"
        >
          {isMenuOpen ? <LuX className="w-5 h-5" /> : <LuLayoutGrid className="w-5 h-5" />}
          <span className="font-bold">Menu</span>
        </button>
      </div>
 
      {/* Logo Tab (Top Center) - Exatamente 90px de height garantido via inline style */}
      <div 
        className={`hidden md:flex absolute -top-[1px] left-1/2 -translate-x-1/2 ${bgColor} rounded-b-[28px] px-12 items-center justify-center gap-3 z-[60] min-w-[300px]`}
        style={{ height: '90px' }}
      >
        <ConcursoNaVeiaLogo variant="hero-tab" />
      </div>
 
      {/* Right Actions (Floating in dark area) - Alinhado verticalmente com o cabeçalho de 90px */}
      <div 
        className="hidden md:flex absolute top-0 right-12 items-center gap-6 z-[60]"
        style={{ height: '90px' }}
      >
        <AuthThemeToggle isScrolled={false} />
        <Link 
          href="/login" 
          className="px-5 py-2 rounded-full border border-white/20 text-white/90 hover:text-white hover:bg-white/10 font-bold transition-colors text-sm"
        >
          Entrar
        </Link>
        <Link
          href="/register"
          className="bg-primary text-white hover:text-white px-6 py-2.5 rounded-full text-sm font-black hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all flex items-center gap-2"
          style={{ backgroundImage: "var(--primary-gradient)" }}
        >
          Criar Conta <span>→</span>
        </Link>
      </div>

      {/* MOBILE HEADER ELEMENTS */}
      <div className="md:hidden absolute top-0 left-0 right-0 w-full flex items-center justify-between px-5 py-4 z-[60]">
        {/* Left: Logo Icon */}
        <div className="flex-shrink-0 z-10">
          <ConcursoNaVeiaLogo compact variant="white" hideText />
        </div>
        
        {/* Center: Logo Text */}
        <div className="flex-1 flex justify-center z-0 px-2">
          <ConcursoNaVeiaLogo compact variant="white" hideIcon className="pointer-events-none" />
        </div>
        
        {/* Right: Menu Toggle */}
        <button 
          id="menu-toggle-mobile"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex-shrink-0 flex items-center justify-center w-9 h-9 text-white hover:text-white/80 transition-colors z-10"
          aria-label="Menu"
        >
          {isMenuOpen ? <LuX className="w-6 h-6" /> : <LuLayoutGrid className="w-6 h-6" />}
        </button>
      </div>

      {/* DROPDOWN MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-[72px] md:top-20 left-4 right-4 md:right-auto md:left-12 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-4 z-[60] md:min-w-[320px]"
          >
            <div className="flex flex-col gap-3">
              {/* Links Grid */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <Link href="/#cursos" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary rounded-lg font-medium transition text-sm">
                  Cursos
                </Link>
                <Link href="/#demo" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary rounded-lg font-medium transition text-sm">
                  Demonstração
                </Link>
                <Link href="/#petrolingo" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary rounded-lg font-medium transition text-sm">
                  PetroLingo
                </Link>
                <Link href="/#resultados" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary rounded-lg font-medium transition text-sm">
                  Resultados
                </Link>
                <Link href="/#depoimentos" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary rounded-lg font-medium transition text-sm">
                  Depoimentos
                </Link>
                <Link href="/#pricing" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary rounded-lg font-medium transition text-sm">
                  Planos
                </Link>
              </div>

              {/* Theme/Appearance toggle visible only on mobile dropdown */}
              <div className="md:hidden border-t border-slate-100 dark:border-slate-800 mt-2 pt-3">
                <div className="flex items-center justify-between px-2 mb-2">
                  <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Aparência</span>
                  <AuthThemeToggle isScrolled={true} />
                </div>
              </div>

              {/* Mobile-only menu items */}
              <div className="md:hidden flex flex-col gap-3 mt-1">
                <Link 
                  href="/login" 
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 text-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm"
                >
                  Entrar
                </Link>
                
                <Link
                  href="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 text-center rounded-xl text-white font-black hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                  style={{ backgroundImage: "var(--primary-gradient)", backgroundColor: "var(--primary)" }}
                >
                  Criar Conta <LuArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
