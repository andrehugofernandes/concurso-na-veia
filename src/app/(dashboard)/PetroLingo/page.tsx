"use client";

import { useUserProfile } from "@/hooks/useUserProfile";
import { ModuleBanner } from "@/components/aulas/shared";
import { LuZap, LuLock, LuCrown, LuLanguages, LuCalculator, LuPenTool, LuBrain } from "react-icons/lu";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PetroLingoHub() {
  const { profile, loading } = useUserProfile();
  const router = useRouter();

  // Bloqueio de Plano - Apenas Ouro (ou planos que contenham Ouro em sua lógica)
  // Se estiver carregando, não faz nada ainda.
  // Se não for Ouro, redireciona ou mostra tela de upgrade.
  const userPlan = profile?.plan?.toLowerCase() || "";
  const isOuro = userPlan === "elite-total" || userPlan === "ouro" || profile?.role === "ADMIN";

  useEffect(() => {
    if (!loading && !isOuro) {
      // Opcional: Redirecionar para página de upgrade
      // router.push("/seja-pro");
    }
  }, [loading, isOuro, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!isOuro) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="w-24 h-24 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <LuLock size={48} />
        </div>
        <h1 className="text-4xl font-black mb-4">Acesso Exclusivo</h1>
        <p className="text-xl text-muted-foreground mb-10">
          O <strong>PetroLingo</strong> é uma ferramenta exclusiva para alunos do plano <span className="text-amber-500 font-bold uppercase">Ouro</span>.
        </p>
        <Link 
          href="/seja-pro"
          className="px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl font-black text-xl shadow-xl shadow-amber-500/20 hover:scale-105 transition-all"
        >
          QUERO SER OURO AGORA
        </Link>
      </div>
    );
  }

  const SUBJECTS = [
    {
      id: "ingles",
      title: "PetroLingo Inglês",
      description: "Gramática Instrumental e Interpretação Técnica focada na Cesgranrio.",
      icon: <LuLanguages size={32} />,
      color: "from-blue-500 to-indigo-600",
      link: "/aulas/ingles/petrolingo",
      active: true,
      tag: "Voz Passiva & Linkers"
    },
    {
      id: "portugues",
      title: "PetroLingo Português",
      description: "Domine a norma culta e a interpretação de textos com gamificação.",
      icon: <LuPenTool size={32} />,
      color: "from-emerald-500 to-teal-600",
      link: "#",
      active: false,
      tag: "Em breve"
    },
    {
      id: "matematica",
      title: "PetroLingo Matemática",
      description: "Raciocínio Lógico e cálculos base fundamentais para todos os cargos.",
      icon: <LuCalculator size={32} />,
      color: "from-purple-500 to-pink-600",
      link: "#",
      active: false,
      tag: "Em breve"
    },
    {
      id: "especificas",
      title: "PetroLingo Comuns",
      description: "Conhecimentos transversais: Segurança, Meio Ambiente e Ética.",
      icon: <LuBrain size={32} />,
      color: "from-orange-500 to-red-600",
      link: "#",
      active: false,
      tag: "Em construção"
    }
  ];

  return (
    <div className="pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <ModuleBanner 
          numero={1}
          titulo="PetroLingo Hub"
          descricao="A jornada gamificada definitiva para os conhecimentos básicos e transversais da Petrobras. Escolha sua matéria e comece a pontuar."
          variant="amber"
          gradiente="bg-gradient-to-br from-zinc-900 to-zinc-800 border-2 border-amber-500/20"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SUBJECTS.map((subject, idx) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link 
                href={subject.active ? subject.link : "#"}
                className={`group relative block h-full p-8 rounded-[2rem] border-2 transition-all duration-500 ${
                  subject.active 
                    ? "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10" 
                    : "bg-zinc-50 dark:bg-zinc-950 border-zinc-100 dark:border-zinc-900 opacity-80 cursor-default"
                }`}
              >
                {/* Ícone com background dinâmico */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                  {subject.icon}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">
                      {subject.tag}
                    </span>
                    {subject.active ? (
                      <LuCrown className="text-amber-500 animate-pulse" />
                    ) : (
                      <LuLock className="text-muted-foreground/40" />
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-black tracking-tight group-hover:text-amber-500 transition-colors">
                    {subject.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed font-medium">
                    {subject.description}
                  </p>
                </div>

                {/* Decorative background element */}
                <div className={`absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br ${subject.color} opacity-0 group-hover:opacity-5 blur-2xl transition-opacity`} />
                
                {subject.active && (
                  <div className="mt-8 flex items-center gap-2 text-amber-600 font-bold text-sm">
                    INICIAR JORNADA 
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                )}
                
                {!subject.active && (
                  <div className="mt-8 py-2 px-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg inline-block text-[10px] font-bold text-muted-foreground uppercase">
                    Conteúdo sendo preparado
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Info Box sobre o modo Duolingo */}
        <div className="mt-16 p-8 rounded-3xl bg-zinc-900 border border-zinc-800 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-700">
            <LuZap size={120} />
          </div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-3xl font-black mb-4">A Ciência do Aprendizado Rápido</h4>
              <p className="text-zinc-400 leading-relaxed font-medium">
                Desenvolvemos o <span className="text-amber-500">PetroLingo</span> baseados na repetição espaçada e micro-sessões de estudo. 
                Estudar 10 minutos por dia aqui é mais eficiente do que horas de leitura passiva.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                <div className="p-4 rounded-2xl bg-zinc-800/50 border border-zinc-700 text-center">
                  <div className="text-2xl font-black text-amber-500">+1.5k</div>
                  <div className="text-[10px] uppercase font-bold text-zinc-500">Questões</div>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-800/50 border border-zinc-700 text-center">
                  <div className="text-2xl font-black text-emerald-500">100%</div>
                  <div className="text-[10px] uppercase font-bold text-zinc-500">Gamificado</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
