import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Carlos Silva",
    role: "Aprovado Transpetro 2024",
    content: "A plataforma mudou completamente minha rotina de estudos. Os simulados gerados por IA acertaram em cheio os temas da prova. Senti como se tivesse a prova antes dela acontecer.",
    avatar: "C"
  },
  {
    name: "Amanda Ribeiro",
    role: "Engenheira de Petróleo",
    content: "O que mais me impressionou foi a análise de desempenho. A IA detectou que eu estava errando questões de Administração Financeira e gerou um plano focado nisso. Resultado: aprovada!",
    avatar: "A"
  },
  {
    name: "João Pedro Alves",
    role: "Candidato Petrobras 2025",
    content: "Melhor investimento para concursos. O nível de detalhe da resolução passo a passo de cada questão te ensina muito mais do que só decorar a resposta certa.",
    avatar: "J"
  },
  {
    name: "Mariana Costa",
    role: "Técnica de Operação",
    content: "Eu não tinha muito tempo livre por causa do trabalho. O A VAGA EH MINHA me ajudou a focar só no que a Cesgranrio mais cobra. Eficiência pura.",
    avatar: "M"
  },
  {
    name: "Felipe Mendes",
    role: "Estudante",
    content: "A interface é incrivelmente rápida e o modo escuro me salva nas madrugadas de estudo. Nunca vi um sistema de questões tão inteligente no Brasil.",
    avatar: "F"
  },
  {
    name: "Carolina Souza",
    role: "Analista de Sistemas",
    content: "Como desenvolvedora, sou exigente com tecnologia. A IA dessa plataforma não é só um truque, ela realmente adapta a dificuldade conforme você evolui.",
    avatar: "C"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-muted/20 border-y border-slate-200 dark:border-white/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-bold tracking-wider uppercase"
          >
            Histórias de Sucesso
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tight mb-6"
          >
            Aprovados pelo <span className="text-primary">A VAGA EH MINHA</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400"
          >
            Junte-se a centenas de estudantes que revolucionaram sua forma de estudar e conquistaram suas vagas em concursos de alto nível.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-background/50 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex gap-1 mb-6 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-8 leading-relaxed font-medium">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold text-xl shadow-inner">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{testimonial.name}</h4>
                  <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">{testimonial.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
