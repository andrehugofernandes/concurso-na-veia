import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const logos = [
  { name: 'Petrobras', path: '/assets/images/logos/petrobras-icon.png' },
  { name: 'Caixa Econômica', path: '/assets/images/logos/caixa-economica-federal-icon.png' },
  { name: 'Banco do Brasil', path: '/assets/images/logos/banco-do-brasil-icon.png' },
  { name: 'Correios', path: '/assets/images/logos/correios-icon.png' },
  { name: 'IBGE', path: '/assets/images/logos/ibge-icon.png' },
  { name: 'INSS', path: '/assets/images/logos/inss-icon.png' },
];

export default function TrustedBySection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<gsap.core.Tween | null>(null);

  // Triplicamos os logos para garantir o efeito de marquee infinito contínuo e perfeito
  const duplicatedLogos = [...logos, ...logos, ...logos];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const loop = gsap.to(trackRef.current, {
        xPercent: -33.3333,
        ease: 'none',
        repeat: -1,
        duration: 18,
      });
      loopRef.current = loop;
    });

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    if (loopRef.current) {
      gsap.to(loopRef.current, { timeScale: 0.15, duration: 0.6, ease: 'power2.out' });
    }
  };

  const handleMouseLeave = () => {
    if (loopRef.current) {
      gsap.to(loopRef.current, { timeScale: 1, duration: 0.6, ease: 'power2.out' });
    }
  };

  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-white/5 overflow-hidden relative">
      <div className="w-full text-center">
        {/* Container do Carrossel de Logos */}
        <div className="w-full relative py-2 overflow-hidden">
          {/* Fades laterais para um visual elegante de sumiço gradual */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 dark:from-slate-900 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 dark:from-slate-900 to-transparent z-10 pointer-events-none" />

          <div
            ref={trackRef}
            className="flex items-center gap-12 md:gap-16 w-max select-none cursor-grab active:cursor-grabbing px-6"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {duplicatedLogos.map((logo, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors shrink-0"
              >
                <div className="w-9 h-9 shrink-0 bg-white dark:bg-slate-800 rounded-xl p-1.5 border border-slate-100 dark:border-slate-700 flex items-center justify-center shadow-sm">
                  <img
                    src={logo.path}
                    alt={logo.name}
                    className="w-full h-full object-contain grayscale hover:grayscale-0 transition duration-300"
                  />
                </div>
                <span className="text-xs md:text-sm font-black tracking-widest uppercase">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
