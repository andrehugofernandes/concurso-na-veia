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
} from "./shared";

import { progressService } from "@/lib/services/progress";

// ── Tipos e Configurações ──────────────────────────────────────────────────

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", titulo: "Regência Nominal" },
  { id: "modulo-2", label: "Módulo 2", titulo: "Regência Verbal" },
  { id: "modulo-3", label: "Módulo 3", titulo: "Casos Particulares" },
];

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
    explicacao:
      "'Passível' rege a preposição 'de' (ex: Passível de punição). Acessível a, Atento a/em, Útil a/para.",
  },
];

// ── Questões do Módulo 2 (Verbal Geral) ───────────────────────────────────

const QUIZ_M2_POOL: QuizQuestion[] = [
  {
    id: 201,
    pergunta:
      "O verbo 'Preferir' possui uma regência específica muito cobrada. Identifique a alternativa correta:",
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
      "O verbo 'Preferir' rege a estrutura 'preferir algo A outra coisa'. É erro usar 'do que', 'mais' ou 'mil vezes'.",
  },
];

// ── Questões do Módulo 3 (Cesgranrio) ─────────────────────────────────────

const QUIZ_FINAL_POOL: QuizQuestion[] = [
  {
    id: 301,
    pergunta:
      "Segundo a norma culta e a banca Cesgranrio, em qual frase o verbo 'ASSISTIR' está corretamente empregado com sentido de 'ver'?",
    opcoes: [
      {
        label: "A",
        valor: "Todos assistiram o treinamento de combate a incêndio.",
      },
      {
        label: "B",
        valor: "Todos assistiram ao treinamento de combate a incêndio.",
      },
      { label: "C", valor: "O médico assistiu ao paciente com dedicação." },
      { label: "D", valor: "Essa lei assiste o direito de todos." },
    ],
    correta: "B",
    explicacao:
      "Com sentido de 'presenciar/ver', o verbo ASSISTIR é Transitivo Indireto e exige a preposição 'A'.",
  },
  {
    id: 302,
    pergunta:
      "A regência do verbo 'IMPLICAR' com sentido de 'acarretar, resultar em' foi corretamente empregada em:",
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
      "No sentido de 'acarretar/ter como consequência', o verbo IMPLICAR é Transitivo Direto (não exige preposição). A forma 'implicar em' é um erro comum.",
  },
  {
    id: 303,
    pergunta: "Qual opção abaixo apresenta erro de regência?",
    opcoes: [
      { label: "A", valor: "Aspiro a uma vaga na Petrobras." },
      { label: "B", valor: "O presidente visava ao crescimento da empresa." },
      { label: "C", valor: "Prefiro mais a plataforma do que o escritório." },
      { label: "D", valor: "Aspirou o ar poluído do ambiente." },
    ],
    correta: "C",
    explicacao:
      "O verbo 'preferir' rege a forma 'Preferir algo a outra coisa'. É errado o uso de 'mais... do que'. 'Aspirar' e 'Visar' estão corretos em suas duplas regências.",
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
  const [quizFinal, setQuizFinal] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    setQuizM1(getRandomQuestions(QUIZ_M1_POOL, 2));
    setQuizM2(getRandomQuestions(QUIZ_M2_POOL, 1));
    setQuizFinal(getRandomQuestions(QUIZ_FINAL_POOL, 1));
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
                        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
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
                        <div className="bg-indigo-500/5 rounded-xl border border-indigo-500/20 p-4">
                          <p className="font-bold text-sm mb-2                       text-indigo-600 dark:text-indigo-400">
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-card rounded-xl border border-border">
                          <h4 className="font-bold text-indigo-500 mb-2">
                            Favorável a
                          </h4>
                          <p className="text-sm">
                            "Sou <strong>favorável às</strong> mudanças."
                          </p>
                        </div>
                        <div className="p-4 bg-card rounded-xl border border-border">
                          <h4 className="font-bold text-indigo-500 mb-2">
                            Passível de
                          </h4>
                          <p className="text-sm">
                            "O erro é <strong>passível de</strong> multa."
                          </p>
                        </div>
                        <div className="p-4 bg-card rounded-xl border border-border">
                          <h4 className="font-bold text-indigo-500 mb-2">
                            Aliado a
                          </h4>
                          <p className="text-sm">
                            "O esforço está <strong>aliado à</strong> técnica."
                          </p>
                        </div>
                        <div className="p-4 bg-card rounded-xl border border-border">
                          <h4 className="font-bold text-indigo-500 mb-2">
                            Referente a
                          </h4>
                          <p className="text-sm">
                            "Dados <strong>referentes ao</strong> lucro."
                          </p>
                        </div>
                        <div className="p-4 bg-card rounded-xl border border-border">
                          <h4 className="font-bold text-indigo-500 mb-2">
                            Apto a/para
                          </h4>
                          <p className="text-sm">
                            "Ele está <strong>apto ao</strong> serviço."
                          </p>
                        </div>
                        <div className="p-4 bg-card rounded-xl border border-border">
                          <h4 className="font-bold text-indigo-500 mb-2">
                            Atento a/em
                          </h4>
                          <p className="text-sm">
                            "Fique <strong>atento aos</strong> sinais."
                          </p>
                        </div>
                        <div className="p-4 bg-card rounded-xl border border-border">
                          <h4 className="font-bold text-indigo-500 mb-2">
                            Útil a/para
                          </h4>
                          <p className="text-sm">
                            "O curso será <strong>útil para</strong> você."
                          </p>
                        </div>
                        <div className="p-4 bg-card rounded-xl border border-border">
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
                      materia="Português"
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
            titulo="Quiz de Fixação - Regência Nominal"
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
            titulo="Quiz de Fixação - Regência Verbal"
            icone="📝"
            questoes={quizM2}
            variant="emerald"
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          />
        </div>
      </TabsContent>

      {/* MÓDULO 3: CESGRANRIO (CAMPO MINADO) */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={3}
            titulo="Análise de Casos Específicos"
            descricao="Estudo aprofundado de verbos com múltiplos padrões de regência e suas respectivas implicações semânticas."
            gradiente="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"
          />

          <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-10">
            <ModuleSectionHeader
              index={1}
              title="Polissemia de Regência"
              description="Estudo dos verbos que alteram seu sentido conforme a preposição utilizada."
              variant="violet"
            />
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed">
                Certos verbos apresentam alteração de sentido conforme o padrão
                de regência aplicado. A escolha da transitividade (direta ou
                indireta) altera o campo semântico do enunciado, exigindo
                precisão na seleção prepositiva.
              </p>
            </div>

            <CardCarousel
              titulo="Padrões de Verbos Polissêmicos"
              subtitulo="Análise técnica dos sentidos normativos e distinções sintáticas."
              cards={[
                {
                  icone: <LuTarget className="text-slate-500" />,
                  titulo: "Assistir",
                  descricao: (
                    <div className="text-xs space-y-3 font-mono">
                      <p>
                        • **VTI (prep. A):** Presenciar, ver. <br />
                        <span className="text-slate-400">
                          Ex: "Assistir ao treinamento."
                        </span>
                      </p>
                      <p>
                        • **VTD (sem prep.):** Socorrer, ajudar. <br />
                        <span className="text-slate-400">
                          Ex: "Assistir o acidentado."
                        </span>
                      </p>
                      <p>
                        • **VI (prep. EM):** Residir. <br />
                        <span className="text-slate-400">
                          Ex: "Assistir em unidade remota."
                        </span>
                      </p>
                    </div>
                  ),
                },
                {
                  icone: <LuTarget className="text-slate-500" />,
                  titulo: "Aspirar",
                  descricao: (
                    <div className="text-xs space-y-3 font-mono">
                      <p>
                        • **VTD (sem prep.):** Sorver, cheirar. <br />
                        <span className="text-slate-400">
                          Ex: "Aspirar o ar condicionado."
                        </span>
                      </p>
                      <p>
                        • **VTI (prep. A):** Desejar, pretender. <br />
                        <span className="text-slate-400">
                          Ex: "Aspirar ao cargo de gestão."
                        </span>
                      </p>
                    </div>
                  ),
                },
                {
                  icone: <LuTarget className="text-slate-500" />,
                  titulo: "Visar",
                  descricao: (
                    <div className="text-xs space-y-3 font-mono">
                      <p>
                        • **VTD (sem prep.):** Rubricar ou mirar. <br />
                        <span className="text-slate-400">
                          Ex: "Visar o atestado técnico."
                        </span>
                      </p>
                      <p>
                        • **VTI (prep. A):** Objetivar. <br />
                        <span className="text-slate-400">
                          Ex: "Visar à máxima eficiência."
                        </span>
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-slate-50 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800 p-8 md:p-12 rounded-3xl space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Consolidação Normativa"
              description="Quadro sinóptico e notas de atenção para os casos mais complexos de regência verbal."
              variant="violet"
            />
            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Quadro Sinótico",
                  icon: LuBookOpen,
                  content: (
                    <div className="space-y-6">
                      <p className="text-sm italic text-slate-500">
                        Representação visual das principais regências abordadas.
                      </p>
                      <ModuleSummaryCarouselNew
                        tituloAula="Sintaxe de Regência"
                        materia="Gramática Normativa"
                        profissao="Nível Superior/Técnico"
                        moduloNome="Casos Específicos"
                        images={[
                          {
                            title: "Quadro: Verbos Polissêmicos",
                            type: "Tabela",
                            placeholderColor: "bg-slate-900/10",
                          },
                          {
                            title: "Hierarquia Sintática",
                            type: "Infográfico",
                            placeholderColor: "bg-slate-900/10",
                          },
                          {
                            title: "Guia de Regência Nominal",
                            type: "Mapa Mental",
                            placeholderColor: "bg-slate-900/10",
                          },
                        ]}
                      />
                    </div>
                  ),
                },
                {
                  id: "visual",
                  label: "Nota de Atenção",
                  icon: LuZap,
                  content: (
                    <div className="p-8 text-center space-y-6">
                      <div className="text-7xl opacity-20">📖</div>
                      <h3 className="text-2xl font-bold">
                        Observação Gramatical
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                        "A regência não é um conjunto isolado de decoreba, mas a
                        alma da clareza textual. Errar a regência é alterar o
                        que se diz, não apenas como se diz."
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            numero={3}
            titulo="Quiz de Fixação - Regência Verbal"
            icone="🏆"
            questoes={quizFinal}
            variant="violet"
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
