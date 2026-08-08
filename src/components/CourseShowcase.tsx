"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import AnimatedElement from "./ui/AnimatedElement";
import ScrollAnimatedHeader from "./home/ScrollAnimatedHeader";
import { 
  LuArrowRight,
  LuUsers,
  LuTrendingUp,
  LuClock,
  LuAward,
  LuGraduationCap,
  LuWrench,
  LuSparkles,
  LuBookOpen,
  LuLayers
} from "react-icons/lu";

interface Course {
  id: string;
  name: string;
  slug: string;
  organization: string;
  level: string;
  niveis: string[];
  difficulty: string;
  estimatedHours: number;
  totalMaterias: number;
  totalAulas: number;
  description: string;
  href: string | null;
  color: string;
  logoUrl: string | null;
  statusEdital: string;
  anoEditalBase: string;
}

// Mapeamento de fallback para logos locais oficiais de todos os concursos
const LOCAL_LOGO_MAP: Record<string, string> = {
  petrobras: "/assets/images/logos/petrobras-icon.png",
  caixa: "/assets/images/logos/caixa-economica-federal-icon.png",
  bb: "/assets/images/logos/banco-do-brasil-icon.png",
  "banco-do-brasil": "/assets/images/logos/banco-do-brasil-icon.png",
  correios: "/assets/images/logos/correios-icon.png",
  ibge: "/assets/images/logos/ibge-icon.png",
  inss: "/assets/images/logos/inss-icon.png",
  "ata-mf": "/assets/images/logos/ata-mf/Coat_of_arms_of_Brazil.svg.webp",
  prf: "/assets/images/logos/prf-icon.png",
  "pf-adm": "/assets/images/logos/pf-icon.png",
  tjsp: "/assets/images/logos/tjsp-icon.png",
  "tre-unificado": "/assets/images/logos/tre-icon.png",
};

function CourseIcon({ course }: { course: Course }) {
  const logoSrc = course.logoUrl || LOCAL_LOGO_MAP[course.slug];
  
  if (logoSrc) {
    return (
      <img 
        src={logoSrc} 
        alt={course.name} 
        className="w-full h-full object-contain rounded" 
      />
    );
  }
  
  // Fallback genérico para cursos sem logo
  return (
    <div className={`w-full h-full rounded flex items-center justify-center bg-gradient-to-br ${course.color} text-white font-black text-lg`}>
      {course.name.charAt(0)}
    </div>
  );
}

function LevelBadge({ nivel }: { nivel: string }) {
  const n = nivel.toLowerCase();
  
  if (n.includes("técnico") || n.includes("tecnico")) {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/60 shadow-2xs">
        <LuWrench className="w-3 h-3" />
        Técnico
      </span>
    );
  }
  
  if (n.includes("superior")) {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-cyan-50 text-cyan-700 border border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800/60 shadow-2xs">
        <LuGraduationCap className="w-3 h-3" />
        Superior
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/60 shadow-2xs">
      <LuAward className="w-3 h-3" />
      Médio
    </span>
  );
}

function SkeletonCard() {
  return (
    <div className="relative bg-card border border-border rounded-2xl p-6 h-full flex flex-col shadow-sm overflow-hidden animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <div className="shrink-0 w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-700" />
        <div className="h-7 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
      </div>
      <div className="h-4 w-40 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
      <div className="space-y-2 mb-6">
        <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded" />
        <div className="h-3 w-3/4 bg-slate-200 dark:bg-slate-700 rounded" />
      </div>
      <div className="grid grid-cols-4 gap-2 mb-6 py-4 border-t border-border">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="h-5 w-10 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="h-2 w-8 bg-slate-200 dark:bg-slate-700 rounded" />
          </div>
        ))}
      </div>
      <div className="mt-auto h-11 bg-slate-200 dark:bg-slate-700 rounded-lg" />
    </div>
  );
}

export default function CourseShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Buscar cursos do banco de dados (Conexão Híbrida 100% Real via Supabase)
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setError(false);
        const res = await fetch("/api/cursos/vitrine");
        if (!res.ok) throw new Error("Falha ao buscar cursos");
        const data = await res.json();
        
        const mapped: Course[] = (data.cursos || []).map((c: any) => ({
          id: c.id,
          name: c.nome,
          slug: c.slug,
          organization: c.cargo || c.orgao || "",
          level: c.nivel || "médio",
          niveis: c.niveis || [c.nivel || "médio"],
          difficulty: c.dificuldade || "Médio",
          estimatedHours: c.horas_estimadas || 80,
          totalMaterias: c.total_materias || 6,
          totalAulas: c.total_aulas || 0,
          description: c.descricao || `Prepare-se para o concurso ${c.nome} com conteúdo completo e atualizado.`,
          href: c.href,
          color: c.gradient_color || "from-blue-500 to-blue-700",
          logoUrl: c.logo_url,
          statusEdital: c.status_edital || "PRE_EDITAL",
          anoEditalBase: c.ano_edital_base || "2022",
        }));
        
        setCourses(mapped);
      } catch (err) {
        console.error("[CourseShowcase] Erro ao carregar cursos:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Animação de scroll
  useEffect(() => {
    if (loading || courses.length === 0) return;

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
  }, [loading, courses]);

  return (
    <section id="cursos" className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-[1400px]">
        {/* Header */}
        <ScrollAnimatedHeader
          badgeText="Vitrine de Cursos Oficial 2026"
          badgeColorClass="border-primary/20 bg-primary/5 text-primary"
          titleText={
            <>
              Escolha seu <span className="text-primary">Concurso</span>
            </>
          }
          subtitleText="Explore nossos cursos preparatórios para os principais concursos públicos do Brasil (Nível Médio, Técnico e Superior). Transparência total sobre editais publicados e cursos pré-edital."
          className="mb-16"
        />

        {/* Error State */}
        {error && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl p-6 mb-8 text-center">
            <h3 className="text-red-800 dark:text-red-400 font-bold mb-2">Não foi possível carregar os cursos no momento</h3>
            <p className="text-red-600 dark:text-red-300 text-sm">
              Estamos enfrentando uma instabilidade na conexão com nosso banco de dados. Por favor, tente novamente em alguns instantes.
            </p>
          </div>
        )}

        {/* Courses Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mx-auto"
        >
          {loading ? (
            // Skeleton loading — 6 cards
            [...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))
          ) : !error ? (
            courses.map((course, index) => {
              const isAvailable = !!course.href;
              const hasMultipleLevels = course.niveis.length > 1;
              const isPublicado = course.statusEdital === "EDITAL_PUBLICADO";

              const content = (
                <>
                  {/* Gradient background accent */}
                  <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br ${course.color} opacity-5 rounded-full -mr-16 -mt-16 ${isAvailable ? "group-hover:opacity-10" : ""} transition-opacity`} />

                  {/* Content */}
                  <div className="relative z-10 flex-1 flex flex-col">
                    {/* Logo + Nome do concurso + Tag de Edital Transparente */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3.5">
                        <div className="shrink-0 p-1.5 rounded-xl bg-white dark:bg-slate-800 shadow-xs border border-slate-200/80 dark:border-slate-700/80 w-12 h-12 flex items-center justify-center">
                          <CourseIcon course={course} />
                        </div>
                        <div>
                          <h3 className="text-2xl md:text-3xl leading-tight font-black text-foreground tracking-tight">
                            {course.name}
                          </h3>
                          
                          {/* Badge Transparente de Edital com o Ano Oficial */}
                          <div className="mt-1">
                            {isPublicado ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Edital {course.anoEditalBase} Publicado
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                                <LuSparkles className="w-3 h-3 text-amber-500" />
                                Pré-Edital (Base {course.anoEditalBase})
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cargo / Resumo de Oportunidades */}
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-3 line-clamp-1">
                      {course.organization}
                    </p>

                    {/* Description */}
                    <p className="text-xs text-muted-foreground/80 mb-5 leading-relaxed flex-1">
                      {course.description}
                    </p>

                    {/* Área de Badges de Níveis + Estatísticas Conectadas ao Supabase (Sem Mock) */}
                    <div className="pt-4 border-t border-border mb-6">
                      
                      {/* Grid Inteligente de Métricas (Híbridas / Supabase Real) */}
                      <div className="grid grid-cols-12 gap-2 items-center">
                        {/* Coluna 1: Badges de Nível (Título Nível/Níveis ACIMA dos Badges) */}
                        <div className="col-span-5 flex flex-col justify-center">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1 pl-0.5">
                            {hasMultipleLevels ? "Níveis" : "Nível"}
                          </div>
                          <div className="flex flex-wrap gap-1 items-center">
                            {course.niveis.map((nv, idx) => (
                              <LevelBadge key={idx} nivel={nv} />
                            ))}
                          </div>
                        </div>

                        {/* Colunas de Dados Conectadas ao Supabase: Estimado, Matérias e Aulas */}
                        <div className="col-span-7 grid grid-cols-3 gap-1 divide-x divide-slate-100 dark:divide-slate-800 text-center">
                          <div className="px-1">
                            <div className="text-sm font-bold text-foreground">
                              {course.estimatedHours}h
                            </div>
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">Estimado</div>
                          </div>
                          <div className="px-1">
                            <div className="text-sm font-bold text-foreground">
                              {course.totalMaterias}
                            </div>
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">Matérias</div>
                          </div>
                          <div className="px-1">
                            <div className="text-sm font-bold text-primary">
                              {course.totalAulas > 0 ? `${course.totalAulas}` : "Em Breve"}
                            </div>
                            <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">Aulas</div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* CTA Button */}
                  <div
                    className={`mt-auto relative z-10 w-full py-3.5 px-4 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
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
                  whileHover={isAvailable ? { y: -6, transition: { duration: 0.3 } } : {}}
                  className={`group relative ${!isAvailable ? "opacity-80" : ""}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-300 rounded-3xl ${isAvailable ? "group-hover:opacity-100" : ""}`} />
                  
                  {isAvailable ? (
                    <Link href={course.href!} className="relative bg-card border border-border rounded-3xl p-6 md:p-7 h-full flex flex-col shadow-xs group-hover:shadow-xl transition-all duration-300 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                      {content}
                    </Link>
                  ) : (
                    <div className="relative bg-card border border-border rounded-3xl p-6 md:p-7 h-full flex flex-col shadow-xs transition-all duration-300 overflow-hidden cursor-not-allowed">
                      {content}
                    </div>
                  )}
                </AnimatedElement>
              );
            })
          ) : null}
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
