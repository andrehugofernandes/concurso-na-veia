import React from 'react';
import { motion } from 'framer-motion';

const logos = [
  { name: 'Cesgranrio', icon: '🏛️' },
  { name: 'PETROBRAS', icon: '⚡' },
  { name: 'Transpetro', icon: '🚢' },
  { name: 'BR Distribuidora', icon: '⛽' },
  { name: 'REPAR', icon: '🔧' },
];

export default function TrustedBySection() {
  return (
    <section className="py-10 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-white/5">
      <div className="container mx-auto px-6 text-center">
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-8">
          Trusted by over <strong className="text-slate-900 dark:text-white">12.000+ candidatos</strong> que já estudaram com a plataforma
        </p>
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
              <span className="text-2xl grayscale hover:grayscale-0 transition">{logo.icon}</span>
              <span className="text-sm font-bold tracking-wide uppercase">{logo.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
