import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LuArrowRight } from 'react-icons/lu';
import ScrollAnimatedHeader from './ScrollAnimatedHeader';

const solutions = [
  {
    icon: '📚',
    title: 'Concursos Públicos',
    desc: 'Simulados infinitos baseados no padrão Cesgranrio para Petrobras, Transpetro e BR Distribuidora.',
  },
  {
    icon: '🎓',
    title: 'Onboarding Corporativo',
    desc: 'Treinamentos rápidos e gamificados para novos colaboradores chegarem voando ao dia a dia.',
  },
  {
    icon: '🧠',
    title: 'Desenvolvimento Contínuo',
    desc: 'Trilhas de conhecimento personalizadas por IA para cada perfil e objetivo profissional.',
  },
];

export default function FinalCTASection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 bg-slate-950 rounded-t-[40px] md:rounded-t-[80px]">
      {/* Skin color glow overlay */}
      <div className="absolute inset-0 bg-primary/15 mix-blend-overlay pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollAnimatedHeader
          badgeText="Plataforma Completa"
          badgeColorClass="border-primary/20 bg-primary/10 text-primary"
          titleText={
            <>
              Soluções para todos os <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'var(--primary-gradient)' }}
              >
                objetivos de estudo
              </span>
            </>
          }
          subtitleText="A VAGA EH MINHA tem soluções para todas as suas necessidades de aprendizagem, seja conformidade, integração ou desenvolvimento de competências."
          titleClassName="text-white text-4xl md:text-6xl"
          subtitleClassName="text-slate-400"
          className="mb-16"
        />

        {/* Solution Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {solutions.map((sol, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/10 transition group"
            >
              <span className="text-4xl block mb-4">{sol.icon}</span>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                {sol.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{sol.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <ScrollAnimatedHeader
            badgeText="Acesso Imediato"
            badgeColorClass="border-primary/25 bg-primary/10 text-primary"
            titleText="Pronto para começar sua jornada?"
            titleClassName="text-white text-3xl md:text-5xl font-black"
            className="mb-8"
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-10 py-4 text-primary-foreground hover:text-white font-bold rounded-full text-lg hover:shadow-2xl hover:shadow-primary/30 hover:scale-105 transition-all"
              style={{ backgroundImage: 'var(--primary-gradient)' }}
            >
              Começar Grátis
              <LuArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="px-10 py-4 bg-white/10 border border-white/20 text-white hover:text-white font-bold rounded-full text-lg hover:bg-white/20 transition"
            >
              Já tenho conta
            </Link>
          </div>
          <p className="text-slate-500 text-sm mt-6">
            Sem cartão de crédito · Acesso imediato · Cancele quando quiser
          </p>
        </div>
      </div>
    </section>
  );
}
