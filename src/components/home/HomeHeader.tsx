import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import PetrobrasLogo from '../PetrobrasLogo';
import { LuLayoutGrid, LuX, LuMouse } from 'react-icons/lu';
import { AuthThemeToggle } from '../auth/AuthThemeToggle';

export default function HomeHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const bgColor = "bg-slate-50 dark:bg-primary";

  return (
    <>
      {/* Menu Tab (Top Left) */}
      <div className={`absolute -top-[1px] left-6 md:left-12 ${bgColor} rounded-b-[24px] px-6 py-4 flex items-center gap-3 z-[60]`}>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 text-slate-900 dark:text-white hover:text-primary dark:hover:text-white/80 transition-colors"
        >
          {isMenuOpen ? <LuX className="w-5 h-5" /> : <LuLayoutGrid className="w-5 h-5" />}
          <span className="font-bold">Menu</span>
        </button>
      </div>

      {/* Dropdown Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-6 md:left-12 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-[60] min-w-[200px]"
          >
            <div className="flex flex-col gap-2">
              <Link href="#cursos" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-primary rounded-lg font-medium transition">
                Cursos
              </Link>
              <Link href="#resultados" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-primary rounded-lg font-medium transition">
                Resultados
              </Link>
              <Link href="#pricing" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-primary rounded-lg font-medium transition">
                Planos
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logo Tab (Top Center) - Mais larga e mais alta */}
      <div className={`absolute -top-[1px] left-1/2 -translate-x-1/2 ${bgColor} rounded-b-[32px] px-12 py-5 flex items-center justify-center gap-3 z-[60] min-w-[300px]`}>
        <PetrobrasLogo variant="default" />
      </div>

      {/* Right Actions (Floating in dark area) */}
      <div className="absolute top-6 right-6 md:right-12 flex items-center gap-4 md:gap-6 z-[60]">
        
        {/* Toggle Components (Sol e Paleta) */}
        <AuthThemeToggle isScrolled={false} />

        {/* Botão Entrar Normal */}
        <Link 
          href="/login" 
          className="px-5 py-2 rounded-full border border-white/20 text-white hover:text-white font-bold hover:bg-white/10 transition-colors text-sm"
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
    </>
  );
}
