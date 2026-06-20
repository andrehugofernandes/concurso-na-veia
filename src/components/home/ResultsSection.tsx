import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  {
    value: '12.000+',
    label: 'Candidatos Ativos',
    sub: 'na plataforma hoje',
    size: 'lg',
    accent: true,
  },
  {
    value: '+98%',
    label: 'Melhora no Desempenho',
    sub: 'dos usuários frequentes em simulados',
    size: 'md',
    accent: false,
  },
  {
    value: '12x',
    label: 'Mais Rápido',
    sub: 'para criar um plano de estudos completo',
    size: 'md',
    accent: false,
  },
  {
    value: '4x',
    label: 'Mais Questões',
    sub: 'resolvidas por semana comparado ao estudo solo',
    size: 'sm',
    accent: false,
  },
  {
    value: '98%',
    label: 'Redução de Tempo',
    sub: 'na administração dos seus estudos com automação IA',
    size: 'sm',
    accent: false,
  },
];

export default function ResultsSection() {
  return (
    <section id="resultados" className="py-24 bg-slate-100 dark:bg-slate-900 relative overflow-hidden border-t border-slate-200 dark:border-white/5">
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section label */}
        <div className="text-center mb-4">
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-black tracking-widest uppercase"
            style={{ color: 'var(--primary-hex, inherit)' }}>
            A plataforma de estudos com impacto real
          </span>
        </div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-4xl md:text-5xl font-black tracking-tight mb-16 max-w-3xl mx-auto"
        >
          A VAGA EH MINHA gera{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: 'var(--primary-gradient)' }}
          >
            resultados extraordinários
          </span>{' '}
          para candidatos, alavancando desempenho e engajamento
        </motion.h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {/* Big left card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className="col-span-2 lg:col-span-1 row-span-2 bg-white dark:bg-background border border-slate-200 dark:border-white/10 rounded-2xl p-8 flex flex-col justify-between shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div>
              <span className="text-2xl mb-4 block">💰</span>
              <h3 className="text-5xl font-black mb-1"
                style={{ backgroundImage: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                12K+
              </h3>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">Candidatos Beneficiados</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Mais de 12 mil estudantes já aceleraram seus estudos com a nossa plataforma.
              </p>
            </div>
          </motion.div>

          {/* Top center card (large %) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="col-span-2 lg:col-span-2 bg-slate-950 dark:bg-slate-900 border border-white/5 rounded-2xl p-8 shadow-xl relative overflow-hidden"
          >
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/30 blur-2xl rounded-full pointer-events-none" />
            <span className="text-2xl block mb-3">📈</span>
            <h3
              className="text-6xl font-black bg-clip-text text-transparent mb-1"
              style={{ backgroundImage: 'var(--primary-gradient)' }}
            >
              +98%
            </h3>
            <p className="text-sm font-bold text-white mt-1">Evolução em Simulados</p>
            <p className="text-xs text-slate-400 mt-2 max-w-xs leading-relaxed">
              De aumento médio na pontuação para assinantes que estudam diariamente.
            </p>
          </motion.div>

          {/* Top right card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="col-span-1 bg-white dark:bg-background border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <span className="text-2xl block mb-2">⚡</span>
            <h3 className="text-4xl font-black"
              style={{ backgroundImage: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              12x
            </h3>
            <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">Criação de Plano Mais Rápida</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Para uma grande agência de concursos.</p>
          </motion.div>

          {/* Bottom right cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="col-span-1 bg-white dark:bg-background border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <span className="text-2xl block mb-2">🎯</span>
            <h3 className="text-4xl font-black"
              style={{ backgroundImage: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              4x
            </h3>
            <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">Mais Questões Resolvidas</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Comparado ao estudo solo sem plataforma.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="col-span-2 bg-white dark:bg-background border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-6"
          >
            <div>
              <span className="text-2xl block mb-2">🤖</span>
              <h3 className="text-4xl font-black"
                style={{ backgroundImage: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                98%
              </h3>
              <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">Redução de Burocracia</p>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed flex-1">
              Nossa IA automatiza cronograma, flashcards e revisão espaçada, para você focar apenas em evoluir.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
