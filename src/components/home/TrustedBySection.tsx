import React from 'react';
import { motion } from 'framer-motion';

const logos = [
  { name: 'Petrobras', path: '/assets/images/logos/petrobras-icon.png' },
  { name: 'Caixa Econômica', path: '/assets/images/logos/caixa-economica-federal-icon.png' },
  { name: 'Banco do Brasil', path: '/assets/images/logos/banco-do-brasil-icon.png' },
  { name: 'Correios', path: '/assets/images/logos/correios-icon.png' },
  { name: 'IBGE', path: '/assets/images/logos/ibge-icon.png' },
  { name: 'INSS', path: '/assets/images/logos/inss-icon.png' },
];

export default function TrustedBySection() {
  return (
    <section className="py-10 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-white/5">
      <div className="container mx-auto px-6 text-center">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos.map((logo, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07 }}
              className="flex items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              <div className="w-8 h-8 shrink-0 bg-white dark:bg-slate-800 rounded-lg p-1 border border-slate-100 dark:border-slate-700 flex items-center justify-center shadow-sm">
                <img 
                  src={logo.path} 
                  alt={logo.name} 
                  className="w-full h-full object-contain grayscale hover:grayscale-0 transition duration-300" 
                />
              </div>
              <span className="text-sm font-bold tracking-wide uppercase">{logo.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
