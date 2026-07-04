"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useRef, useEffect } from "react";
import AnimatedElement from "./ui/AnimatedElement";
import ScrollAnimatedHeader from "./home/ScrollAnimatedHeader";
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
    <section id="cursos" className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <ScrollAnimatedHeader
          badgeText="Vitrine de Cursos"
          badgeColorClass="border-primary/20 bg-primary/5 text-primary"
          titleText={
            <>
              Escolha seu <span className="text-primary">Concurso</span>
            </>
          }
          subtitleText="Explore nossos cursos para os principais concursos públicos de nível médio no Brasil. Cada um com simulados ilimitados, aulas ao vivo e suporte de IA 24h."
          className="mb-16"
        />

        {/* Courses Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {COURSES.map((course, index) => {
            const isAvailable = course.id === "petrobras";
            
            const content = (
              <>
                {/* Gradient background accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${course.color} opacity-5 rounded-full -mr-16 -mt-16 ${isAvailable ? "group-hover:opacity-10" : ""} transition-opacity`} />

                {/* Content */}
                <div className="relative z-10">
                  {/* Logo + Nome do concurso alinhados pixel perfect */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="shrink-0 p-1.5 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 w-12 h-12 flex items-center justify-center">
                      {course.icon}
                    </div>
                    <h3 className="text-2xl md:text-3xl leading-tight font-black text-foreground tracking-tight">
                      {course.name}
                    </h3>
                  </div>

                  {/* Cargo/Organização */}
                  <p className="text-base text-muted-foreground mb-4 font-medium">
                    {course.organization}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground/80 mb-6 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-2 mb-6 py-4 border-t border-border">
                    <div className="text-center flex flex-col items-center justify-center">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                        course.difficulty === "Fácil"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : course.difficulty === "Médio"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}>
                        {course.difficulty}
                      </span>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">Nível</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-foreground">
                        {course.estimatedHours}h
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">Estimado</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-foreground">
                        {course.students}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">Alunos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">
                        {course.successRate}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">Taxa</div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div
                  className={`mt-auto relative z-10 w-full py-3 px-4 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                    isAvailable 
                      ? "bg-primary/10 group-hover:bg-primary/20 text-primary" 
                      : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {isAvailable ? "Começar Curso" : "Em Breve"}
                  {isAvailable && <LuArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </div>
              </>
            );

            return (
              <AnimatedElement
                key={course.id}
                delay={index * 0.1}
                data-animate
                whileHover={isAvailable ? { y: -8, transition: { duration: 0.3 } } : {}}
                className={`group relative ${!isAvailable ? "opacity-80" : ""}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-300 rounded-2xl ${isAvailable ? "group-hover:opacity-100" : ""}`} />
                
                {isAvailable ? (
                  <Link href={course.href} className="relative bg-card border border-border rounded-2xl p-6 h-full flex flex-col shadow-sm group-hover:shadow-lg transition-all duration-300 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                    {content}
                  </Link>
                ) : (
                  <div className="relative bg-card border border-border rounded-2xl p-6 h-full flex flex-col shadow-sm transition-all duration-300 overflow-hidden cursor-not-allowed">
                    {content}
                  </div>
                )}
              </AnimatedElement>
            );
          })}
        </div>

        {/* CTA Section */}
        <AnimatedElement
          delay={0.3}
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
        </AnimatedElement>
      </div>
    </section>
  );
}
