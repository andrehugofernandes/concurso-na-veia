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

            {/* LEFT — Menu toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="
                  w-9 h-9 rounded-xl flex md:hidden items-center justify-center
                  text-slate-700 dark:text-slate-200
                  hover:bg-slate-100 dark:hover:bg-white/10
                  transition-colors
                "
                aria-label="Menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isMenuOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <LuX className="w-4 h-4" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="open"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <LuLayoutGrid className="w-4 h-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Nav links (desktop) */}
              <nav className="hidden md:flex items-center gap-1 ml-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

          {/* CENTER — Logo real (mesma do estado inicial) */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <PetrobrasLogo variant="default" />
            </motion.div>
          </div>

            {/* RIGHT — Actions */}
            <div className="flex items-center gap-2">
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
          </div>

          {/* Mobile dropdown menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="
                  md:hidden mt-2 max-w-6xl mx-auto
                  bg-white/90 dark:bg-slate-900/90
                  backdrop-blur-xl rounded-2xl
                  border border-black/8 dark:border-white/10
                  shadow-lg overflow-hidden
                "
              >
                <nav className="flex flex-col p-2">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                    >
                      {link.label}
                    </Link>
                  ))}

                  <div className="border-t border-slate-100 dark:border-white/10 mt-2 pt-2">
                    <Link
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                    >
                      Entrar
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="mt-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-black rounded-xl bg-primary text-white hover:text-white hover:shadow-lg transition-all"
                      style={{ backgroundImage: "var(--primary-gradient)" }}
                    >
                      Criar Conta <LuArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
