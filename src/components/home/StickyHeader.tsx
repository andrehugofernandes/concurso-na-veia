"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AuthThemeToggle } from "../auth/AuthThemeToggle";
import PetrobrasLogo from "../PetrobrasLogo";
import { LuLayoutGrid, LuX, LuArrowRight } from "react-icons/lu";

const NAV_LINKS = [
  { href: "#cursos", label: "Cursos" },
  { href: "#resultados", label: "Resultados" },
  { href: "#pricing", label: "Planos" },
];

const ALL_LINKS = [
  { href: "#cursos", label: "Cursos" },
  { href: "#demo", label: "Demonstração" },
  { href: "#ia", label: "Professor IA" },
  { href: "#resultados", label: "Resultados" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#pricing", label: "Planos" },
];

export default function StickyHeader() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const heroHeight = window.innerHeight * 0.75;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > heroHeight);
      setIsAtTop(scrollY < 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          key="sticky-header"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 32,
            mass: 0.8,
          }}
          className="fixed top-0 left-0 right-0 z-[100] px-6 pt-2"
        >
          {/* Pill container */}
          <div className="
            max-w-7xl mx-auto
            flex items-center justify-between
            px-6 py-3
            rounded-2xl
            border border-black/8 dark:border-white/10
            bg-white/80 dark:bg-slate-900/80
            backdrop-blur-xl
            shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]
          ">

            {/* LEFT — Logo Icon (Mobile) / Nav Links (Desktop) */}
            <div className="flex items-center gap-2">
              {/* Logo Icon (Mobile Only) */}
              <Link href="/" className="md:hidden relative w-9 h-9 bg-black rounded-md border border-white/5 flex items-center justify-center overflow-hidden shrink-0">
                <div className="absolute inset-0 rounded-md opacity-20 bg-primary" />
                <img 
                  src="/logo-icone.png" 
                  alt="Icon" 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[260%] h-[260%] max-w-none object-contain z-10" 
                />
              </Link>

              {/* Menu Button (Desktop/Tablet Only) */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
              >
                {isMenuOpen ? <LuX className="w-4 h-4" /> : <LuLayoutGrid className="w-4 h-4" />}
                <span className="font-bold">Menu</span>
              </button>
            </div>

          {/* CENTER — Logo real (Desktop Only) */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <PetrobrasLogo variant="default" />
            </motion.div>
          </div>

            {/* RIGHT — Actions (Desktop Only) */}
            <div className="hidden md:flex items-center gap-2">
              <AuthThemeToggle isScrolled={true} />

              <Link
                href="/login"
                className="
                  hidden sm:inline-flex items-center
                  px-4 py-2 rounded-xl text-sm font-semibold
                  text-slate-700 dark:text-slate-200
                  hover:bg-slate-100 dark:hover:bg-white/10
                  transition-all
                "
              >
                Entrar
              </Link>

              <Link
                href="/register"
                className="
                  inline-flex items-center gap-1.5
                  px-4 py-2 rounded-xl text-sm font-black
                  bg-primary text-white hover:text-white
                  hover:shadow-lg hover:shadow-primary/30
                  hover:scale-105
                  transition-all
                "
                style={{ backgroundImage: "var(--primary-gradient)" }}
              >
                Criar Conta
                <LuArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* MOBILE ONLY TOGGLE (Aligned to the right) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? <LuX className="w-5 h-5" /> : <LuLayoutGrid className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile and Desktop dropdown menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="
                  mt-2 max-w-6xl mx-auto
                  bg-white dark:bg-slate-900 rounded-2xl
                  border border-slate-100 dark:border-slate-800
                  shadow-2xl p-4 overflow-hidden
                  md:absolute md:top-full md:left-6 md:w-[320px] md:mt-2 md:mx-0
                "
              >
                <div className="flex flex-col gap-3">
                  {/* Links Grid */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    {ALL_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary rounded-lg transition"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  {/* Theme/Appearance toggle */}
                  <div className="md:hidden border-t border-slate-100 dark:border-slate-800 mt-2 pt-3">
                    <div className="flex items-center justify-between px-2 mb-2">
                      <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Aparência</span>
                      <AuthThemeToggle isScrolled={true} />
                    </div>
                  </div>

                  {/* Mobile action buttons */}
                  <div className="flex flex-col gap-3 mt-1">
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
                      className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-black rounded-xl bg-primary text-white hover:text-white hover:shadow-lg transition-all"
                      style={{ backgroundImage: "var(--primary-gradient)", backgroundColor: "var(--primary)" }}
                    >
                      Criar Conta <LuArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
