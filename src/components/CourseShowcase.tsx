"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useRef, useEffect } from "react";
import { 
  LuArrowRight,
  LuUsers,
  LuTrendingUp,
  LuClock,
  LuAward
} from "react-icons/lu";

interface Course {
  id: string;
  name: string;
  organization: string;
  level: "médio" | "superior";
  difficulty: "Fácil" | "Médio" | "Difícil";
  estimatedHours: number;
  students: number;
  successRate: string;
  description: string;
  href: string;
  color: string;
  icon: React.ReactNode;
}

const COURSES: Course[] = [
  {
    id: "petrobras",
    name: "Petrobras",
    organization: "Técnico de Operações",
    level: "médio",
    difficulty: "Médio",
    estimatedHours: 120,
    students: 2847,
    successRate: "34%",
    description: "Prepare-se para o concurso de Técnico de Operações da Petrobras com simulados baseados no padrão CESGRANRIO.",
    href: "/cursos/petrobras",
    color: "from-yellow-500 to-orange-600",
    icon: <img src="/assets/images/logos/petrobras-icon.png" alt="Petrobras" className="w-full h-full object-contain rounded" />,
  },
  {
    id: "caixa",
    name: "Caixa Econômica",
    organization: "Técnico Bancário",
    level: "médio",
    difficulty: "Médio",
    estimatedHours: 100,
    students: 1923,
    successRate: "28%",
    description: "Domine as provas de Técnico Bancário da Caixa com foco em Conhecimentos Bancários e Atendimento.",
    href: "/cursos/caixa",
    color: "from-blue-500 to-blue-700",
    icon: <img src="/assets/images/logos/caixa-economica-federal-icon.png" alt="Caixa Econômica" className="w-full h-full object-contain rounded" />,
  },
  {
    id: "bb",
    name: "Banco do Brasil",
    organization: "Escriturário",
    level: "médio",
    difficulty: "Médio",
    estimatedHours: 110,
    students: 3142,
    successRate: "31%",
    description: "Prepare-se para o cargo de Escriturário do Banco do Brasil com questões atualizadas e comentadas.",
    href: "/cursos/banco-brasil",
    color: "from-green-500 to-emerald-600",
    icon: <img src="/assets/images/logos/banco-do-brasil-icon.png" alt="Banco do Brasil" className="w-full h-full object-contain rounded" />,
  },
  {
    id: "correios",
    name: "Correios",
    organization: "Agente de Correios",
    level: "médio",
    difficulty: "Fácil",
    estimatedHours: 80,
    students: 1654,
    successRate: "42%",
    description: "Estude para o concurso de Agente de Correios com simulados ilimitados e aulas ao vivo.",
    href: "/cursos/correios",
    color: "from-yellow-400 to-blue-600",
    icon: <img src="/assets/images/logos/correios-icon.png" alt="Correios" className="w-full h-full object-contain rounded" />,
  },
  {
    id: "ibge",
    name: "IBGE",
    organization: "Recenseador/Agente",
    level: "médio",
    difficulty: "Fácil",
    estimatedHours: 60,
    students: 987,
    successRate: "48%",
    description: "Prepare-se para o IBGE com conteúdo focado em Estatística e Metodologia de Pesquisa.",
    href: "/cursos/ibge",
    color: "from-blue-400 to-indigo-600",
    icon: <img src="/assets/images/logos/ibge-icon.png" alt="IBGE" className="w-full h-full object-contain rounded" />,
  },
  {
    id: "inss",
    name: "INSS",
    organization: "Técnico do Seguro Social",
    level: "médio",
    difficulty: "Médio",
    estimatedHours: 95,
    students: 2156,
    successRate: "35%",
    description: "Domine as legislações e procedimentos do INSS para o cargo de Técnico do Seguro Social.",
    href: "/cursos/inss",
    color: "from-blue-600 to-blue-800",
    icon: <img src="/assets/images/logos/inss-icon.png" alt="INSS" className="w-full h-full object-contain rounded" />,
  },
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export default function CourseShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Aplicar animações GSAP quando o componente montar
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    const cards = containerRef.current?.querySelectorAll("[data-animate]");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="cursos" className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary font-bold text-sm tracking-[0.2em] uppercase mb-4 shadow-sm">
              Vitrine de Cursos
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4 tracking-tight">
              Escolha seu{" "}
              <span className="text-primary">Concurso</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore nossos cursos para os principais concursos públicos de nível médio no Brasil. 
              Cada um com simulados ilimitados, aulas ao vivo e suporte de IA 24h.
            </p>
          </motion.div>
        </div>

        {/* Courses Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {COURSES.map((course, index) => (
            <motion.div
              key={course.id}
              custom={index}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              data-animate
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              
              <Link href={`/register?concurso=${course.id}`} className="relative block bg-card border border-border rounded-2xl p-6 h-full flex flex-col shadow-sm group-hover:shadow-lg transition-all duration-300 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                {/* Gradient background accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${course.color} opacity-5 rounded-full -mr-16 -mt-16 group-hover:opacity-10 transition-opacity`} />

                {/* Content */}
                <div className="relative z-10">
                  {/* Difficulty badge — absolute top-right, não interfere no layout */}
                  <span className={`absolute top-0 right-0 text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl ${
                    course.difficulty === "Fácil"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : course.difficulty === "Médio"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}>
                    {course.difficulty}
                  </span>

                  {/* Logo + Nome do concurso alinhados pixel perfect */}
                  <div className="flex items-center gap-3 mb-3 pr-16">
                    <div className="shrink-0 p-1.5 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 w-12 h-12 flex items-center justify-center">
                      {course.icon}
                    </div>
                    <h3 className="text-[1.45rem] leading-tight font-black text-foreground tracking-tight">
                      {course.name}
                    </h3>
                  </div>

                  {/* Cargo/Organização */}
                  <p className="text-sm text-muted-foreground mb-4">
                    {course.organization}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground/80 mb-6 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-t border-border">
                    <div className="text-center">
                      <div className="text-lg font-bold text-foreground">
                        {course.estimatedHours}h
                      </div>
                      <div className="text-xs text-muted-foreground">Estimado</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-foreground">
                        {course.students}
                      </div>
                      <div className="text-xs text-muted-foreground">Alunos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">
                        {course.successRate}
                      </div>
                      <div className="text-xs text-muted-foreground">Taxa</div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div
                  className="mt-auto relative z-10 w-full py-3 px-4 rounded-lg bg-primary/10 group-hover:bg-primary/20 text-primary font-bold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Começar Curso
                  <LuArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Não encontrou o concurso que procura?
          </p>
          <Link
            href="/contato"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground hover:text-primary-foreground font-bold hover:shadow-lg hover:shadow-primary/30 transition-all transform hover:scale-105"
          >
            Sugerir um Novo Concurso
            <LuArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
