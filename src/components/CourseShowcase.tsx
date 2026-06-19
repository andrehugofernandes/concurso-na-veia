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
    icon: <LuAward className="w-6 h-6" />,
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
    icon: <LuTrendingUp className="w-6 h-6" />,
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
    icon: <LuUsers className="w-6 h-6" />,
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
    color: "from-red-500 to-red-700",
    icon: <LuClock className="w-6 h-6" />,
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
    color: "from-purple-500 to-indigo-600",
    icon: <LuTrendingUp className="w-6 h-6" />,
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
    color: "from-cyan-500 to-blue-500",
    icon: <LuAward className="w-6 h-6" />,
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
    <section className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
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
            <p className="text-primary font-mono text-sm tracking-[0.3em] uppercase mb-4">
              Vitrine de Cursos
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4 tracking-tight">
              Escolha seu Concurso
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
              
              <div className="relative bg-card border border-border rounded-2xl p-6 h-full flex flex-col shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                {/* Gradient background accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${course.color} opacity-5 rounded-full -mr-16 -mt-16 group-hover:opacity-10 transition-opacity`} />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon and Organization */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${course.color} text-white shadow-md`}>
                      {course.icon}
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      course.difficulty === "Fácil" 
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : course.difficulty === "Médio"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}>
                      {course.difficulty}
                    </span>
                  </div>

                  {/* Course Name */}
                  <h3 className="text-2xl font-bold text-foreground mb-1">
                    {course.name}
                  </h3>
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
                <Link
                  href={course.href}
                  className="mt-auto relative z-10 w-full py-3 px-4 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                >
                  Começar Curso
                  <LuArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
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
