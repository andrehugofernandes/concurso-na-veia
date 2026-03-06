"use client";

import { useState, useEffect, useCallback } from "react";
import {
  LuCheck,
  LuTrophy,
  LuTarget,
  LuLayers,
  LuTriangleAlert,
  LuBookOpen,
  LuLock,
  LuArrowRight,
  LuPlay,
  LuImage,
  LuVolume2,
  LuZap,
  LuAnchor,
  LuShieldCheck,
  LuFactory,
  LuBrain,
  LuChevronRight,
  LuMusic,
} from "react-icons/lu";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import {
  AlertBox,
  CardCarousel,
  ContentAccordion,
  ModuleBanner,
  QuizInterativo,
  FlipCard,
  LessonTabs,
  ModuleSummaryCarouselNew,
  MusicPlayerCard,
  VideoModal,
  QuizQuestion,
  getRandomQuestions,
  ProgressIndicator,
  ModuleSectionHeader,
  AulaProps,
  StickyModuleNav,
  AulaTemplate,
} from "../shared";

import { progressService } from "@/lib/services/progress";

// ── Tipos e Configurações ──────────────────────────────────────────────────

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", titulo: "Regência Nominal" },
  { id: "modulo-2", label: "Módulo 2", titulo: "Regência Verbal I" },
  { id: "modulo-3", label: "Módulo 3", titulo: "Regência Verbal II" },
  { id: "modulo-4", label: "Módulo 4", titulo: "Regência e Relativos" },
  { id: "modulo-5", label: "Módulo 5", titulo: "Laboratório de Elite" },
] as const;

const PROGRESS_PER_MODULE = Math.floor(100 / MODULE_DEFS.length);

const Activity = ({
  mode,
  children,
}: {
  mode: "visible" | "hidden";
  children: React.ReactNode;
}) => {
  return (
    <div style={{ display: mode === "hidden" ? "none" : "contents" }}>
      {children}
    </div>
  );
};

// ── Questões do Módulo 1 (Nominal) ────────────────────────────────────────
const QUIZ_M1_POOL: QuizQuestion[] = [
  {
    id: 101,
    pergunta:
      "Na frase 'O técnico é favorável ___ novas normas de segurança', qual preposição completa a regência nominal?",
    opcoes: [
      { label: "A", valor: "com" },
      { label: "B", valor: "às" },
      { label: "C", valor: "nas" },
      { label: "D", valor: "por" },
    ],
    correta: "B",
    explicacao:
      "O nome 'favorável' exige a preposição 'a'. Como 'novas normas' é feminino plural, ocorre a crase.",
  },
  {
    id: 102,
    pergunta: "Qual dos nomes abaixo exige a preposição 'de' em sua regência?",
    opcoes: [
      { label: "A", valor: "Acessível" },
      { label: "B", valor: "Atento" },
      { label: "C", valor: "Passível" },
      { label: "D", valor: "Útil" },
    ],
    correta: "C",
    explicacao: "'Passível' rege a preposição 'de' (ex: Passível de punição).",
  },
];

// ── Questões do Módulo 2 (Verbal I: Assistir, Visar, Aspirar...) ────────────────
const QUIZ_M2_POOL: QuizQuestion[] = [
  {
    id: 201,
    pergunta:
      "Com o sentido de 'pretender, objetivar', qual o padrão de regência do verbo visar?",
    opcoes: [
      { label: "A", valor: "Visar o êxito (Transitivo Direto)." },
      { label: "B", valor: "Visar ao êxito (Transitivo Indireto)." },
      { label: "C", valor: "Visar pelo êxito (Regência com 'por')." },
      { label: "D", valor: "Visar com o êxito (Regência com 'com')." },
    ],
    correta: "B",
    explicacao:
      "Como VTI (Verbo Transitivo Indireto), com o sentido de 'objetivar', o verbo 'visar' exige a preposição 'A'.",
  },
  {
    id: 202,
    pergunta: "Em qual frase o verbo 'Assistir' significa prestar socorro?",
    opcoes: [
      { label: "A", valor: "Assistimos ao jogo no estádio." },
      { label: "B", valor: "O médico assistiu o ferido na ambulância." },
      { label: "C", valor: "Eles assistem em Brasília atualmente." },
      { label: "D", valor: "Assiste ao cidadão o direito de defesa." },
    ],
    correta: "B",
    explicacao:
      "Como VTD (Verbo Transitivo Direto), 'assistir' significa ajudar ou socorrer.",
  },
];

// ── Questões do Módulo 3 (Verbal II: Esquecer, Pagar, Preferir...) ────────────────
const QUIZ_M3_POOL: QuizQuestion[] = [
  {
    id: 301,
    pergunta:
      "Sobre o verbo 'Preferir', assinale a única estrutura aceita pela norma culta:",
    opcoes: [
      { label: "A", valor: "Prefiro mais o turno da manhã do que o da noite." },
      { label: "B", valor: "Prefiro o turno da manhã antes que o da noite." },
      { label: "C", valor: "Prefiro o turno da manhã ao da noite." },
      {
        label: "D",
        valor: "Prefiro mil vezes o turno da manhã do que o da noite.",
      },
    ],
    correta: "C",
    explicacao:
      "O Verbo Transitivo Direto e Indireto 'Preferir' rege a forma 'Preferir algo a outra coisa'.",
  },
  {
    id: 302,
    pergunta:
      "Qual a regência correta dos verbos 'Esquecer' e 'Lembrar' quando pronominais (esquecer-se / lembrar-se)?",
    opcoes: [
      { label: "A", valor: "Esqueci-me o documento." },
      { label: "B", valor: "Lembrei o compromisso." },
      { label: "C", valor: "Esqueci-me do documento." },
      { label: "D", valor: "Lembrei-me o compromisso." },
    ],
    correta: "C",
    explicacao:
      "Quando acompanhados de pronome reflexivo, os verbos 'esquecer' e 'lembrar' exigem a preposição DE.",
  },
];

// ── Questões do Módulo 4 (Regência e Pronome Relativo) ───────────────────
const QUIZ_M4_POOL: QuizQuestion[] = [
  {
    id: 401,
    pergunta:
      "Em qual alternativa o pronome relativo respeita a regência do verbo na oração subordinada?",
    opcoes: [
      { label: "A", valor: "O cargo que aspiros é muito concorrido." },
      { label: "B", valor: "O cargo a que aspiro é muito concorrido." },
      { label: "C", valor: "As normas onde obedecemos são rígidas." },
      { label: "D", valor: "O filme que assistimos foi ótimo." },
    ],
    correta: "B",
    explicacao:
      "O verbo 'aspirar' (desejar) exige a preposição 'A', que deve ser anteposta ao pronome relativo 'que'.",
  },
  {
    id: 402,
    pergunta: "Complete corretamente: 'Este é o projeto ___ confio'.",
    opcoes: [
      { label: "A", valor: "que" },
      { label: "B", valor: "o qual" },
      { label: "C", valor: "em que" },
      { label: "D", valor: "a que" },
    ],
    correta: "C",
    explicacao:
      "Quem confia, confia EM algo. Por isso, a preposição 'em' deve ser usada antes do pronome relativo.",
  },
];

// ── Questões do Módulo 5 (Cesgranrio / Simulado Final) ────────────────────
const QUIZ_FINAL_POOL: QuizQuestion[] = [
  {
    id: 501,
    pergunta:
      "A regência do verbo 'IMPLICAR' com sentido de 'acarretar' foi corretamente empregada em:",
    opcoes: [
      { label: "A", valor: "O erro implicará em punição severa." },
      { label: "B", valor: "A mudança implicará novos custos operacionais." },
      { label: "C", valor: "O atraso implicou na demissão do funcionário." },
      {
        label: "D",
        valor: "Mudar as regras implica aos trabalhadores novos deveres.",
      },
    ],
    correta: "B",
    explicacao:
      "No sentido de 'acarretar', IMPLICAR é Verbo Transitivo Direto (sem preposição).",
  },
  {
    id: 502,
    pergunta:
      "Assinale a alternativa que apresenta erro de regência verbal segundo a norma gramática:",
    opcoes: [
      { label: "A", valor: "Informamos os candidatos da data da prova." },
      { label: "B", valor: "Informamos aos candidatos a data da prova." },
      { label: "C", valor: "Esqueci dos meus livros." },
      { label: "D", valor: "Lembrei o nome do novo supervisor." },
    ],
    correta: "C",
    explicacao:
      "Sem o pronome (esqueci-me), o verbo 'esquecer' deve ser direto (Esqueci os meus livros). 'Esqueci dos' é uma mistura incorreta.",
  },
];

// ── Componente Principal ──────────────────────────────────────────────────

export default function AulaRegencia({
  titulo,
  descricao,
  duracao,
  materiaNome,
  materiaCor,
  materiaId,
  prevTopico,
  nextTopico,
  onUpdateProgress,
  onComplete,
  isCompleted,
  loading,
  xpGanho,
  currentProgress,
}: AulaProps) {
  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(),
  );

  // Pools de questões sorteados
  const [quizM1, setQuizM1] = useState<QuizQuestion[]>([]);
  const [quizM2, setQuizM2] = useState<QuizQuestion[]>([]);
  const [quizM3, setQuizM3] = useState<QuizQuestion[]>([]);
  const [quizM4, setQuizM4] = useState<QuizQuestion[]>([]);
  const [quizFinal, setQuizFinal] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    setQuizM1(getRandomQuestions(QUIZ_M1_POOL, 8));
    setQuizM2(getRandomQuestions(QUIZ_M2_POOL, 8));
    setQuizM3(getRandomQuestions(QUIZ_M3_POOL, 8));
    setQuizM4(getRandomQuestions(QUIZ_M4_POOL, 8));
    setQuizFinal(getRandomQuestions(QUIZ_FINAL_POOL, 8));
  }, []);

  // Sincronizar progresso inicial do estado global (apenas uma vez na carga)
  const [hasSyncedInitial, setHasSyncedInitial] = useState(false);

  useEffect(() => {
    if (
      !hasSyncedInitial &&
      !loading &&
      currentProgress !== undefined &&
      currentProgress > 0
    ) {
      const doneCount = Math.floor(
        (currentProgress / 100) * MODULE_DEFS.length,
      );
      const newDone = new Set<string>();
      for (let i = 0; i < doneCount; i++) {
        newDone.add(MODULE_DEFS[i].id);
      }
      setCompletedModules(newDone);
      setHasSyncedInitial(true);
    } else if (!hasSyncedInitial && !loading && currentProgress === 0) {
      setHasSyncedInitial(true);
    }
  }, [currentProgress, hasSyncedInitial, loading]);

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 70) {
      const newSet = new Set(completedModules).add(moduleId);
      setCompletedModules(newSet);

      const total = MODULE_DEFS.length;
      const done = newSet.size;
      const percent = Math.round((done / total) * 100);

      if (onUpdateProgress) {
        onUpdateProgress(percent);
      }

      const index = MODULE_DEFS.findIndex((m) => m.id === moduleId);
      if (index < MODULE_DEFS.length - 1) {
        setTimeout(() => {
          setActiveTab(MODULE_DEFS[index + 1].id);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 1500);
      } else {
        if (onComplete) onComplete();
      }
    }
  };

  const isModuleUnlocked = (_index: number) => {
    return true; // TEMPORÁRIO: Desbloqueado para revisão
  };

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      modules={Array.from(MODULE_DEFS)}
      completedModules={completedModules}
      isModuleUnlocked={isModuleUnlocked}
      titulo={titulo}
      descricao={descricao}
      duracao={duracao}
      materiaNome={materiaNome}
      materiaCor={materiaCor}
      materiaId={materiaId}
      isCompleted={isCompleted}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
      currentProgress={Math.round(
        (completedModules.size / MODULE_DEFS.length) * 100,
      )}
      onComplete={onComplete}
      loading={loading}
      xpGanho={xpGanho}
    >
      {/* MÓDULO 1: NOMINAL */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={1}
            titulo="Sintaxe da Regência Nominal"
            descricao="Estudo sistemático das relações de subordinação entre nomes (substantivos, adjetivos e advérbios) e seus respectivos complementos, fundamentado na gramática de Bechara."
            gradiente="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-600"
          />

          {/* FUNDAMENTAÇÃO TEÓRICA - CIÊNCIA ANTES DO FLOREIO */}
          <section className="bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 shadow-sm">
            <ModuleSectionHeader
              index={1}
              title="Fundamentos da Sintaxe de Regência"
              description="Entenda o elo de subordinação entre termos regentes e regidos na estrutura da frase."
              variant="indigo"
            />

            <div className="space-y-10">
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400 max-w-4xl">
                A regência estuda as relações em que certas palavras exigem a
                presença de outras para completar sua significação. Esse elo de
                subordinação é o que garante a coesão gramatical da frase.
              </p>

              <div className="space-y-6">
                <h4 className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200 text-xl">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-500 text-white text-sm font-black mr-2">
                    1
                  </span>
                  Anatomia da Regência: O Elo de Ligação
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Veja como o Termo Regente se conecta ao Termo Regido através
                  da preposição, formando uma unidade de sentido indissociável.
                </p>

                <div className="bg-slate-50 dark:bg-slate-900 p-4 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-8">
                  {/* Exemplo 1: Adjetivo */}
                  <div className="flex flex-col md:flex-row items-center gap-4 group">
                    <div className="flex-1 w-full p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm text-center md:text-left">
                      <span className="block text-[10px] uppercase font-black text-indigo-500 mb-1 tracking-widest">
                        Adjetivo (Regente)
                      </span>
                      <span className="text-xl font-bold tracking-tight">
                        O técnico está{" "}
                        <span className="text-indigo-600 underline decoration-2 underline-offset-4">
                          apto
                        </span>
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-1 z-10">
                      <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 border border-slate-300 dark:border-slate-700 shadow-inner group-hover:scale-110 transition-transform">
                        <LuArrowRight
                          className="rotate-90 md:rotate-0"
                          size={20}
                        />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-950 text-[10px] font-black uppercase tracking-tighter shadow-xl">
                        ao
                      </span>
                    </div>

                    <div className="flex-1 w-full p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm text-center md:text-left">
                      <span className="block text-[10px] uppercase font-black text-emerald-500 mb-1 tracking-widest">
                        Termo Regido
                      </span>
                      <span className="text-xl font-bold tracking-tight text-emerald-600">
                        serviço
                      </span>
                    </div>
                  </div>

                  {/* Exemplo 2: Substantivo (Novo) */}
                  <div className="flex flex-col md:flex-row items-center gap-4 group">
                    <div className="flex-1 w-full p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm text-center md:text-left">
                      <span className="block text-[10px] uppercase font-black text-indigo-500 mb-1 tracking-widest">
                        Substantivo (Regente)
                      </span>
                      <span className="text-xl font-bold tracking-tight">
                        Devemos ter{" "}
                        <span className="text-indigo-600 underline decoration-2 underline-offset-4">
                          obediência
                        </span>
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-1 z-10">
                      <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 border border-slate-300 dark:border-slate-700 shadow-inner group-hover:scale-110 transition-transform">
                        <LuArrowRight
                          className="rotate-90 md:rotate-0"
                          size={20}
                        />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-950 text-[10px] font-black uppercase tracking-tighter shadow-xl">
                        às
                      </span>
                    </div>

                    <div className="flex-1 w-full p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm text-center md:text-left">
                      <span className="block text-[10px] uppercase font-black text-emerald-500 mb-1 tracking-widest">
                        Termo Regido
                      </span>
                      <span className="text-xl font-bold tracking-tight text-emerald-600">
                        normas
                      </span>
                    </div>
                  </div>

                  {/* Exemplo 3: Substantivo */}
                  <div className="flex flex-col md:flex-row items-center gap-4 group">
                    <div className="flex-1 w-full p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm text-center md:text-left">
                      <span className="block text-[10px] uppercase font-black text-indigo-500 mb-1 tracking-widest">
                        Substantivo (Regente)
                      </span>
                      <span className="text-xl font-bold tracking-tight">
                        O projeto tem{" "}
                        <span className="text-indigo-600 underline decoration-2 underline-offset-4">
                          vínculo
                        </span>
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-1 z-10">
                      <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 border border-slate-300 dark:border-slate-700 shadow-inner group-hover:scale-110 transition-transform">
                        <LuArrowRight
                          className="rotate-90 md:rotate-0"
                          size={20}
                        />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-950 text-[10px] font-black uppercase tracking-tighter shadow-xl">
                        com
                      </span>
                    </div>

                    <div className="flex-1 w-full p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm text-center md:text-left">
                      <span className="block text-[10px] uppercase font-black text-emerald-500 mb-1 tracking-widest">
                        Termo Regido
                      </span>
                      <span className="text-xl font-bold tracking-tight text-emerald-600">
                        a meta
                      </span>
                    </div>
                  </div>

                  {/* Exemplo 4: Advérbio */}
                  <div className="flex flex-col md:flex-row items-center gap-4 group">
                    <div className="flex-1 w-full p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm text-center md:text-left">
                      <span className="block text-[10px] uppercase font-black text-indigo-500 mb-1 tracking-widest">
                        Advérbio (Regente)
                      </span>
                      <span className="text-xl font-bold tracking-tight">
                        A sonda opera{" "}
                        <span className="text-indigo-600 underline decoration-2 underline-offset-4">
                          longe
                        </span>
                      </span>
                    </div>

                    <div className="flex flex-col items-center gap-1 z-10">
                      <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 border border-slate-300 dark:border-slate-700 shadow-inner group-hover:scale-110 transition-transform">
                        <LuArrowRight
                          className="rotate-90 md:rotate-0"
                          size={20}
                        />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-950 text-[10px] font-black uppercase tracking-tighter shadow-xl">
                        da
                      </span>
                    </div>

                    <div className="flex-1 w-full p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm text-center md:text-left">
                      <span className="block text-[10px] uppercase font-black text-emerald-500 mb-1 tracking-widest">
                        Termo Regido
                      </span>
                      <span className="text-xl font-bold tracking-tight text-emerald-600">
                        plataforma
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* STORYTELLING CONTEXTUALIZADO */}
          <section className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl shadow-sm space-y-8">
            <div className="inline-block px-4 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-widest w-fit">
              Engenharia da Linguagem
            </div>

            <ModuleSectionHeader
              index={2}
              title="A Precisão Semântica na Operação"
              description="Como a regência correta evita ambiguidades críticas em protocolos operacionais."
              variant="indigo"
            />

            <div className="space-y-8">
              <p className="text-lg text-slate-600 dark:text-slate-400 italic leading-relaxed">
                "A teoria gramatical traduz-se em segurança operacional.
                Considere o verbo **Assistir**. Na norma culta, 'assistir ao
                técnico' (indireto) significa observar, enquanto 'assistir o
                técnico' (direto) significa prestar auxílio. Uma ambiguidade
                nesta regência pode comprometer protocolos de emergência."
              </p>

              <ContentAccordion
                titulo="A Força de Atração Nominal"
                corIndicador="bg-indigo-500"
                defaultOpen={true}
                slides={[
                  {
                    titulo: "Conceito do Ímã",
                    icone: "1️⃣",
                    conteudo: (
                      <div className="space-y-4 text-slate-700 dark:text-slate-300">
                        <div className="md:bg-card md:rounded-xl md:border md:border-border md:p-6 md:shadow-sm">
                          <h3 className="font-bold text-lg mb-4">
                            Morfossintaxe da Regência Nominal
                          </h3>
                          <p className="leading-relaxed">
                            A regência nominal estuda o comportamento dos
                            substantivos, adjetivos e advérbios que exigem um
                            complemento (Complemento Nominal). Essa relação é
                            **sempre mediada por uma preposição**.
                          </p>
                          <ul className="mt-4 space-y-2 text-sm">
                            <li>
                              • **Exigência Normativa:** Diferente de alguns
                              verbos, os nomes nunca se ligam diretamente ao seu
                              regido.
                            </li>
                            <li>
                              • **Preposições Frequentes:** *A, de, em, para,
                              com, por*.
                            </li>
                          </ul>
                        </div>
                        <div className="bg-indigo-500/5 rounded-xl border border-indigo-500/10 p-4">
                          <p className="font-bold text-sm mb-2 text-indigo-600 dark:text-indigo-400">
                            Exemplo da Norma Culta:
                          </p>
                          <p className="italic">
                            "A sua atitude foi **passível** (Regente) **de**
                            (Preposição) **crítica** (Regido)."
                          </p>
                        </div>
                      </div>
                    ),
                  },
                  {
                    titulo: "Nomes de Alta Frequência",
                    icone: "2️⃣",
                    conteudo: (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        <div className="p-3 md:p-4 bg-muted/20 rounded-xl border border-border/50">
                          <h4 className="font-bold text-indigo-500 mb-2">
                            Favorável a
                          </h4>
                          <p className="text-sm">
                            "Sou <strong>favorável às</strong> mudanças."
                          </p>
                        </div>
                        <div className="p-3 md:p-4 bg-muted/20 rounded-xl border border-border/50">
                          <h4 className="font-bold text-indigo-500 mb-2">
                            Passível de
                          </h4>
                          <p className="text-sm">
                            "O erro é <strong>passível de</strong> multa."
                          </p>
                        </div>
                        <div className="p-3 md:p-4 bg-muted/20 rounded-xl border border-border/50">
                          <h4 className="font-bold text-indigo-500 mb-2">
                            Aliado a
                          </h4>
                          <p className="text-sm">
                            "O esforço está <strong>aliado à</strong> técnica."
                          </p>
                        </div>
                        <div className="p-3 md:p-4 bg-muted/20 rounded-xl border border-border/50">
                          <h4 className="font-bold text-indigo-500 mb-2">
                            Referente a
                          </h4>
                          <p className="text-sm">
                            "Dados <strong>referentes ao</strong> lucro."
                          </p>
                        </div>
                        <div className="p-3 md:p-4 bg-muted/20 rounded-xl border border-border/50">
                          <h4 className="font-bold text-indigo-500 mb-2">
                            Apto a/para
                          </h4>
                          <p className="text-sm">
                            "Ele está <strong>apto ao</strong> serviço."
                          </p>
                        </div>
                        <div className="p-3 md:p-4 bg-muted/20 rounded-xl border border-border/50">
                          <h4 className="font-bold text-indigo-500 mb-2">
                            Atento a/em
                          </h4>
                          <p className="text-sm">
                            "Fique <strong>atento aos</strong> sinais."
                          </p>
                        </div>
                        <div className="p-3 md:p-4 bg-muted/20 rounded-xl border border-border/50">
                          <h4 className="font-bold text-indigo-500 mb-2">
                            Útil a/para
                          </h4>
                          <p className="text-sm">
                            "O curso será <strong>útil para</strong> você."
                          </p>
                        </div>
                        <div className="p-3 md:p-4 bg-muted/20 rounded-xl border border-border/50">
                          <h4 className="font-bold text-indigo-500 mb-2">
                            Ansioso por/para
                          </h4>
                          <p className="text-sm">
                            "Estou <strong>ansioso pelo</strong> resultado."
                          </p>
                        </div>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Resumo Estratégico"
              description="Recursos visuais e auditivos para fixar os padrões de regência nominal."
              variant="indigo"
            />
            <LessonTabs
              tabs={[
                {
                  id: "video",
                  label: "Vídeo Aula",
                  icon: LuPlay,
                  content: (
                    <VideoModal
                      videoId="dQw4w9WgXcQ"
                      title="Regência Nominal Descomplicada"
                      duration="05:30"
                      thumbnail="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1170&auto=format&fit=crop"
                    />
                  ),
                },
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      tituloAula="Regência"
                      materia="Língua Portuguesa"
                      profissao="Concurso Petrobras"
                      moduloNome="Regência Nominal"
                      images={[
                        {
                          title: "O Ímã Nominal",
                          type: "Infográfico",
                          placeholderColor: "bg-indigo-900/10",
                        },
                        {
                          title: "Lista de Preposições",
                          type: "Tabela",
                          placeholderColor: "bg-slate-900/10",
                        },
                        {
                          title: "Mapa Mental: Nominal",
                          type: "Mapa Mental",
                          placeholderColor: "bg-emerald-900/10",
                        },
                      ]}
                    />
                  ),
                },
                {
                  id: "visual",
                  label: "Macete Visual",
                  icon: LuBrain,
                  content: (
                    <div className="p-8 text-center space-y-6">
                      <div className="text-7xl">🏗️ 🔗</div>
                      <h3 className="text-2xl font-bold">
                        Os Vergalhões da Frase
                      </h3>
                      <p className="text-muted-foreground text-lg italic">
                        "Pense na preposição como o vergalhão que une dois
                        blocos de cimento. Sem a preposição 'a' em 'favorável',
                        os blocos se soltam e a frase desmorona."
                      </p>
                    </div>
                  ),
                },
                {
                  id: "audio",
                  label: "Áudio Resumo",
                  icon: LuMusic,
                  content: (
                    <MusicPlayerCard
                      audioUrl="#"
                      titulo="Regência Nominal: Rap dos Nomes"
                      artista="MC Gramática"
                      capaUrl="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1170&auto=format&fit=crop"
                      lyrics={`Favorável a, passível de...\nSe o nome exige, você tem que saber...\nA preposição é o elo do poder!`}
                    />
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            numero={4}
            titulo="Regência Nominal"
            icone="🎯"
            questoes={quizM1}
            variant="indigo"
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          />
        </div>
      </TabsContent>

      {/* MÓDULO 2: VERBAL GERAL */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={2}
            titulo="Sintaxe da Regência Verbal"
            descricao="Análise da transitividade verbal e da seleção de argumentos preposicionados ou diretos."
            gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
          />

          <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-10">
            <ModuleSectionHeader
              index={1}
              title="Teoria da Transitividade e Regência"
              description="Domine a relação entre o verbo e seus complementos através da análise da transitividade."
              variant="emerald"
            />

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                  <h4 className="font-bold text-lg text-emerald-600 mb-3 flex items-center gap-2">
                    📖 Conceituação
                  </h4>
                  <p className="text-muted-foreground text-sm xl:text-base">
                    A Regência Verbal estuda a ligação estrutural entre os
                    verbos (termos regentes) e seus complementos (termos
                    regidos). A transitividade determina se essa conexão exige
                    ou não uma preposição.
                  </p>
                </div>

                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                  <h4 className="font-bold text-lg text-emerald-600 mb-3 flex items-center gap-2">
                    🎯 Exemplificação
                  </h4>
                  <div className="space-y-3 font-mono text-sm">
                    <p>
                      <strong className="text-emerald-500">
                        VTD (Ligação Direta):
                      </strong>
                      <br /> &quot;Nós avaliamos o risco.&quot;
                    </p>
                    <p>
                      <strong className="text-emerald-500">
                        VTI (Ligação Indireta):
                      </strong>
                      <br /> &quot;Nós precisamos de suporte.&quot;
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-500/5 p-6 rounded-2xl border border-yellow-500/20">
                  <h4 className="font-bold text-lg text-yellow-600 mb-3 flex items-center gap-2">
                    💡 Dicas
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    A preposição funciona como um adaptador de tomada: verbos
                    indiretos não "encaixam" nos substantivos sem ela. Descubra
                    a transitividade sempre fazendo perguntas ao verbo (O QUÊ?
                    vs DE QUÊ?).
                  </p>
                </div>

                <div className="bg-red-500/5 p-6 rounded-2xl border border-red-500/20">
                  <h4 className="font-bold text-lg text-red-600 mb-3 flex items-center gap-2">
                    ⚠️ Exceções
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    A transitividade não é fixa e absoluta! O mesmo verbo (como
                    Aspirar) pode ser Direto ou Indireto caso mude seu sentido
                    semântico. Analise o contexto da frase antes de cravar a
                    regência.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-10">
            <ModuleSectionHeader
              index={2}
              title="A Regência do Verbo Preferir"
              description="Um dos casos particulares mais explorados pela banca Cesgranrio em provas."
              variant="emerald"
            />

            <div className="space-y-8">
              <div className="bg-muted/30 p-6 rounded-2xl border border-border">
                <h3 className="font-bold text-lg mb-4">Padrão Normativo</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Do ponto de vista normativo, o verbo **Preferir** é transitivo
                  direto e indireto. Exige dois complementos (o preferido e o
                  preterido) e seu segundo termo deve ser regido pela preposição
                  **A**.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-500/10 p-5 rounded-xl border border-red-500/20 text-red-700 dark:text-red-400 font-mono text-sm flex items-center gap-3">
                    <span className="text-xl">❌</span>
                    <span>
                      Prefiro café <strong>do que</strong> chá.
                    </span>
                  </div>
                  <div className="bg-emerald-500/10 p-5 rounded-xl border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-mono text-sm flex items-center gap-3">
                    <span className="text-xl">✅</span>
                    <span>
                      Preferir algo <strong>A</strong> outra coisa.
                    </span>
                  </div>
                </div>
              </div>

              <AlertBox
                tipo="warning"
                titulo="Observação Técnica: Analogia da Válvula"
              >
                <div className="flex items-center gap-3">
                  <div className="text-yellow-500 text-2xl">⚡</div>
                  <p className="font-bold">Nota Explicativa:</p>
                </div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Para fins didáticos, pode-se comparar o fluxo gramatical a um
                  sistema hidráulico: Se o fluxo é contínuo, a regência é
                  direta. Se requer um conector articulado (preposição), a
                  regência passa a ser percebida como indireta.
                </p>
              </AlertBox>
            </div>
          </section>

          <QuizInterativo
            numero={3}
            titulo="Cuidado com a Escrita"
            icone="📝"
            questoes={quizM2}
            variant="emerald"
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          />
        </div>
      </TabsContent>

      {/* MÓDULO 3: VERBAL II */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={3}
            titulo="Regência Verbal II: Verbos de Alta Complexidade"
            descricao="Estudo de verbos com particularidades de regência: Preferir, Esquecer, Lembrar, Pagar e Informar."
            gradiente="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"
          />

          <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-10">
            <ModuleSectionHeader
              index={1}
              title="A Regência do Verbo Preferir"
              description="Um dos casos mais explorados pela banca Cesgranrio devido ao erro comum no uso cotidiano."
              variant="violet"
            />

            <div className="space-y-8">
              <div className="bg-muted/30 p-6 rounded-2xl border border-border">
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  O verbo **Preferir** é **Transitivo Direto e Indireto**. Ele
                  exige dois complementos e seu segundo termo deve ser regido
                  pela preposição **A**.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-500/10 p-5 rounded-xl border border-red-500/20 text-red-700 dark:text-red-400 font-mono text-sm flex items-center gap-3">
                    <span className="text-xl">❌</span>
                    <span>
                      Prefiro café <strong>do que</strong> chá.
                    </span>
                  </div>
                  <div className="bg-emerald-500/10 p-5 rounded-xl border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-mono text-sm flex items-center gap-3">
                    <span className="text-xl">✅</span>
                    <span>
                      Prefiro café <strong>a</strong> chá.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Esquecer, Lembrar e Informar"
              description="A influência do pronome na alteração da regência verbal."
              variant="violet"
            />

            <ContentAccordion
              titulo="Verbos Pronominais vs. Não Pronominais"
              corIndicador="bg-violet-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Esquecer e Lembrar",
                  icone: "1️⃣",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="md:bg-card md:rounded-xl md:border md:border-border md:p-6 md:shadow-sm">
                        <p className="leading-relaxed">
                          Se o verbo estiver **sozinho** (não pronominal), é
                          **Transitivo Direto** (sem preposição). Se estiver
                          **com pronome** (pronominal), é **Transitivo
                          Indireto** (com preposição **DE**).
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                        <div className="bg-muted/20 p-4 border border-border/50 rounded-xl">
                          <p className="text-xs font-bold mb-1 text-slate-500">
                            Sem Pronome (Direto):
                          </p>
                          <p className="italic text-sm">
                            "Esqueci <strong>o</strong> livro."
                          </p>
                        </div>
                        <div className="bg-violet-500/5 p-4 border border-violet-500/20 rounded-xl">
                          <p className="text-xs font-bold mb-1 text-violet-600 dark:text-violet-400">
                            Com Pronome (Indireto):
                          </p>
                          <p className="italic text-sm">
                            "Esqueci-me <strong>do</strong> livro."
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Informar e Avisar",
                  icone: "2️⃣",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        Estes verbos admitem duas construções corretas, mas
                        **nunca** as duas preposições ao mesmo tempo:
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          ✅ "Informar <strong>alguém de</strong> algo"
                        </li>
                        <li className="flex items-center gap-2">
                          ✅ "Informar <strong>algo a</strong> alguém"
                        </li>
                        <li className="flex items-center gap-2 text-red-500">
                          ❌ "Informar <strong>a alguém de</strong> algo"
                        </li>
                      </ul>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            numero={3}
            titulo="Regência Verbal (Essenciais)"
            icone="📝"
            questoes={quizM3}
            variant="violet"
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </div>
      </TabsContent>

      {/* MÓDULO 4: REGÊNCIA E PRONOME RELATIVO */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={4}
            titulo="Regência e o Pronome Relativo"
            descricao="O desafio supremo das provas da Cesgranrio: o deslocamento da preposição para antes do relativo."
            gradiente="bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700"
          />

          <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-10">
            <ModuleSectionHeader
              index={1}
              title="A Anteposição da Preposição"
              description="Como identificar quando o pronome relativo deve ser 'preposicionado'."
              variant="amber"
            />

            <div className="space-y-8">
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                Nas questões de nível médio da Petrobras, a banca adora cobrar
                se você sabe colocar a preposição exigida pelo verbo **antes**
                do pronome relativo (*que, qual, quem, onde*).
              </p>

              <div className="bg-amber-500/5 p-6 rounded-2xl border border-amber-500/20 italic">
                <p>"Este é o cargo **a que** aspiro."</p>
                <p className="text-xs mt-2 text-muted-foreground">
                  (Quem aspira, aspira **A**. A preposição 'pula' para antes do
                  'que').
                </p>
              </div>

              <CardCarousel
                titulo="Casos Práticos com Relativos"
                subtitulo="Veja como os verbos projetam suas preposições."
                cards={[
                  {
                    icone: <LuTarget className="text-amber-500" />,
                    titulo: "Assistir (Ver)",
                    descricao:
                      "O filme **a que** assistimos era bom. (Assistir **A**)",
                  },
                  {
                    icone: <LuTarget className="text-amber-500" />,
                    titulo: "Gostar",
                    descricao:
                      "A música **de que** gosto tocou. (Gostar **DE**)",
                  },
                  {
                    icone: <LuTarget className="text-amber-500" />,
                    titulo: "Confiar",
                    descricao:
                      "A pessoa **em quem** confio saiu. (Confiar **EM**)",
                  },
                  {
                    icone: <LuTarget className="text-amber-500" />,
                    titulo: "Obedecer",
                    descricao:
                      "As leis **a que** obedecemos são claras. (Obedecer **A**)",
                  },
                ]}
              />
            </div>
          </section>

          <QuizInterativo
            numero={2}
            titulo="Quiz de Fixação - Regência e Relativos"
            icone="🎯"
            questoes={quizM4}
            variant="amber"
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
          />
        </div>
      </TabsContent>

      {/* MÓDULO 5: LABORATÓRIO DE ELITE */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={5}
            titulo="Laboratório de Elite: Simulado Final"
            descricao="Desafios reais da banca Cesgranrio para consolidação definitiva da regência."
            gradiente="bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700"
          />

          <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-10">
            <ModuleSectionHeader
              index={1}
              title="Resumo Geral da Regência"
              description="Recursos finais para revisão rápida antes da prova."
              variant="rose"
            />

            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Mapa Mental",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      moduloNome="Simulado Final Cesgranrio"
                      tituloAula="Regência Total"
                      materia="Língua Portuguesa"
                      profissao="Técnico Petrobras"
                      images={[
                        {
                          title: "Resumo: Regência Nominal",
                          type: "Esquema",
                          placeholderColor: "bg-rose-900/10",
                        },
                        {
                          title: "Resumo: Regência Verbal",
                          type: "Tabela",
                          placeholderColor: "bg-rose-900/10",
                        },
                        {
                          title: "Cuidado: Pronomes Relativos",
                          type: "Dica",
                          placeholderColor: "bg-rose-900/10",
                        },
                      ]}
                    />
                  ),
                },
                {
                  id: "audio",
                  label: "Fixação Musical",
                  icon: LuMusic,
                  content: (
                    <MusicPlayerCard
                      audioUrl="#"
                      titulo="Gabaritando Regência"
                      artista="Profa. Gramática"
                      capaUrl="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1170&auto=format&fit=crop"
                      lyrics={`Prefiro o estudo ao descanso...\nAspirando à vaga que eu tanto quis...\nObedecendo às regras pra ser feliz!`}
                    />
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            numero={2}
            titulo="Desafio Final Cesgranrio"
            icone="🏆"
            questoes={quizFinal}
            variant="rose"
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
          />

          {/* CARD DE CONCLUSÃO MANUAL */}
          <section className="mt-12 mb-8">
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/10 dark:to-rose-900/5 border border-rose-100 dark:border-rose-800/30 rounded-2xl p-10 text-center space-y-6 shadow-sm max-w-4xl mx-auto">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold flex items-center justify-center gap-3 text-foreground">
                  <LuBookOpen className="text-rose-500 text-3xl" /> Termine a
                  leitura
                </h3>
                <p className="text-muted-foreground text-lg">
                  Marque esta aula como concluída para registrar seu progresso e
                  ganhar XP.
                </p>
              </div>

              <Button
                size="lg"
                onClick={() => {
                  if (onComplete) onComplete();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white border-0 font-bold text-lg px-10 py-8 rounded-full shadow-xl shadow-rose-500/20 hover:shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all"
              >
                Marcar como Concluída
              </Button>
            </div>
          </section>
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
