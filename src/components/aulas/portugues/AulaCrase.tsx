import { getAllModuleVariants } from "@/lib/moduleColors";
"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LuCirclePlay as LuPlayCircle,
  LuBookOpen,
  LuMusic,
  LuBrain,
  LuTarget,
  LuLayers,
  LuZap,
  LuShieldCheck,
  LuChevronRight,
  LuArrowRight,
  LuCheck,
  LuTriangleAlert as LuAlertTriangle,
  LuClock,
  LuPenTool,
  LuUser,
  LuHeart,
  LuMapPin,
  LuBuilding,
  LuAnchor,
  LuRuler,
  LuBan,
  LuShuffle,
  LuPlay,
  LuImage,
  LuVolume2,
} from "react-icons/lu";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import {
  QuizQuestion,
  getRandomQuestions,
  AlertBox,
  FlipCard,
  QuizInterativo,
  TimelineItem,
  ModuleBanner,
  CardCarousel,
  StickyModuleNav,
  ModuleSectionHeader,
  ContentAccordion,
  LessonTabs,
  ModuleSummaryCarouselNew,
  MusicPlayerCard,
  ProgressIndicator,
  AulaProps,
  VideoModal,
  AulaTemplate,
  ModuleConsolidation,
  TabbedContent,
  SectionTitle,
  ComparisonSide,
} from "../shared";

import {
  QUIZ_M1_CONCEITO,
  QUIZ_M2_TESTE_MASCULINO,
  QUIZ_M3_PROIBIDO_VERBOS,
  QUIZ_M4_PROIBIDO_PRONOMES,
  QUIZ_M5_FACULTATIVO_NOMES,
  QUIZ_M6_FACULTATIVO_POSSESSIVOS,
  QUIZ_M7_HORAS_MEDIDAS,
  QUIZ_M8_CASOS_ESPECIAIS,
  QUIZ_M9_DEMONSTRATIVOS,
  QUIZ_M10_SIMULADO,
} from "./data/crase-quizzes";

// ── Fallback for React 19 Activity ───────────────────────────────────────

interface Challenge {
  wrong: string;
  correct: string;
  explanation: string;
}

const CHALLENGE_POOL: Challenge[] = [
  {
    wrong: "Vou a festa amanhã.",
    correct: "Vou à festa amanhã.",
    explanation:
      "Quem vai, vai A algum lugar. Festa é feminina e admite artigo A. A + A = À.",
  },
  {
    wrong: "Andar à pé faz bem.",
    correct: "Andar a pé faz bem.",
    explanation:
      "Pé é palavra masculina. Não há artigo feminino 'a' antes de masculino. Logo, apenas preposição 'a'.",
  },
  {
    wrong: "O curso começa as 19h.",
    correct: "O curso começa às 19h.",
    explanation:
      "Indicação de horas exatas sempre leva crase (às duas, às dez, à uma).",
  },
  {
    wrong: "Entreguei o relatório a ela.",
    correct: "Entreguei o relatório a ela.",
    explanation:
      "Correto! Não se usa crase antes de pronome pessoal (ela, ele, mim, ti, nós...).",
  },
  {
    wrong: "Estamos a espera de um milagre.",
    correct: "Estamos à espera de um milagre.",
    explanation:
      "Locução prepositiva feminina (à espera de, à procura de, à moda de) sempre leva crase.",
  },
];

const CRASE_CONCEPT_EXAMPLES = [
  {
    id: 1,
    frente: (
      <div className="flex flex-col items-center justify-center h-full text-center gap-4">
        <LuTarget size={48} className="text-rose-500" />
        <div>
          <h3 className="text-xl font-bold mb-2">Vou ___ escola.</h3>
          <p className="text-lg text-muted-foreground">
            Tem crase? Troque 'escola' por 'colégio'.
          </p>
        </div>
      </div>
    ),
    verso: (
      <div className="flex flex-col items-center justify-center h-full text-center gap-4">
        <div className="text-2xl font-bold text-emerald-400">
          Vou AO Colégio
        </div>
        <p>
          Se virou <strong>AO</strong> no masculino,
          <br />
          tem <strong>CRASE (À)</strong> no feminino.
        </p>
        <h3 className="text-xl font-bold mt-2 text-white">Vou À escola.</h3>
      </div>
    ),
  },
  {
    id: 2,
    frente: (
      <div className="flex flex-col items-center justify-center h-full text-center gap-4">
        <LuTarget size={48} className="text-rose-500" />
        <div>
          <h3 className="text-xl font-bold mb-2">Fui ___ praça.</h3>
          <p className="text-lg text-muted-foreground">
            Tem crase? Troque 'praça' por 'parque'.
          </p>
        </div>
      </div>
    ),
    verso: (
      <div className="flex flex-col items-center justify-center h-full text-center gap-4">
        <div className="text-2xl font-bold text-emerald-400">Fui AO Parque</div>
        <p>
          Se virou <strong>AO</strong> no masculino,
          <br />
          tem <strong>CRASE (À)</strong> no feminino.
        </p>
        <h3 className="text-xl font-bold mt-2 text-white">Fui À praça.</h3>
      </div>
    ),
  },
  {
    id: 3,
    frente: (
      <div className="flex flex-col items-center justify-center h-full text-center gap-4">
        <LuTarget size={48} className="text-rose-500" />
        <div>
          <h3 className="text-xl font-bold mb-2">Assisti ___ peça.</h3>
          <p className="text-lg text-muted-foreground">
            Tem crase? Troque 'peça' por 'filme'.
          </p>
        </div>
      </div>
    ),
    verso: (
      <div className="flex flex-col items-center justify-center h-full text-center gap-4">
        <div className="text-2xl font-bold text-emerald-400">
          Assisti AO Filme
        </div>
        <p>
          Se virou <strong>AO</strong> no masculino,
          <br />
          tem <strong>CRASE (À)</strong> no feminino.
        </p>
        <h3 className="text-xl font-bold mt-2 text-white">Assisti À peça.</h3>
      </div>
    ),
  },
  {
    id: 4,
    frente: (
      <div className="flex flex-col items-center justify-center h-full text-center gap-4">
        <LuTarget size={48} className="text-rose-500" />
        <div>
          <h3 className="text-xl font-bold mb-2">Obedeci ___ regra.</h3>
          <p className="text-lg text-muted-foreground">
            Tem crase? Troque 'regra' por 'regulamento'.
          </p>
        </div>
      </div>
    ),
    verso: (
      <div className="flex flex-col items-center justify-center h-full text-center gap-4">
        <div className="text-2xl font-bold text-emerald-400">
          Obedeci AO Regulamento
        </div>
        <p>
          Se virou <strong>AO</strong> no masculino,
          <br />
          tem <strong>CRASE (À)</strong> no feminino.
        </p>
        <h3 className="text-xl font-bold mt-2 text-white">Obedeci À regra.</h3>
      </div>
    ),
  },
  {
    id: 5,
    frente: (
      <div className="flex flex-col items-center justify-center h-full text-center gap-4">
        <LuTarget size={48} className="text-rose-500" />
        <div>
          <h3 className="text-xl font-bold mb-2">Peça ___ diretora.</h3>
          <p className="text-lg text-muted-foreground">
            Tem crase? Troque 'diretora' por 'diretor'.
          </p>
        </div>
      </div>
    ),
    verso: (
      <div className="flex flex-col items-center justify-center h-full text-center gap-4">
        <div className="text-2xl font-bold text-emerald-400">
          Peça AO Diretor
        </div>
        <p>
          Se virou <strong>AO</strong> no masculino,
          <br />
          tem <strong>CRASE (À)</strong> no feminino.
        </p>
        <h3 className="text-xl font-bold mt-2 text-white">Peça À diretora.</h3>
      </div>
    ),
  },
];

// ── Main Component ──────────────────────────────────────────────────────

const mv = [undefined, ...getAllModuleVariants()];

export default function AulaCrase({
  titulo,
  descricao,
  duracao,
  materiaNome,
  materiaCor,
  materiaId,
  prevTopico,
  nextTopico,
  onComplete,
  isCompleted,
  loading,
  xpGanho = 50,
  currentProgress,
  onUpdateProgress,
}: AulaProps) {
  const MODULE_DEFS = [
    { id: "modulo-1", label: "Módulo 1", title: "Conceito e Regra Geral" },
    { id: "modulo-2", label: "Módulo 2", title: "Identificação: Teste do Masculino" },
    { id: "modulo-3", label: "Módulo 3", title: "Casos Proibidos I: Verbos" },
    { id: "modulo-4", label: "Módulo 4", title: "Casos Proibidos II: Pronomes" },
    { id: "modulo-5", label: "Módulo 5", title: "Crase Facultativa com Nomes Próprios" },
    { id: "modulo-6", label: "Módulo 6", title: "Crase Facultativa com Possessivos" },
    { id: "modulo-7", label: "Módulo 7", title: "Casos Especiais I: Horas e Medidas" },
    { id: "modulo-8", label: "Módulo 8", title: "Casos Especiais II: Palavras Especiais" },
    { id: "modulo-9", label: "Módulo 9", title: "Pronomes Demonstrativos" },
    { id: "modulo-10", label: "Módulo 10", title: "Simulado Integrado" },
  ] as const;

  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(),
  );
  const [quizM1, setQuizM1] = useState<QuizQuestion[]>([]);
  const [quizM2, setQuizM2] = useState<QuizQuestion[]>([]);
  const [quizM3, setQuizM3] = useState<QuizQuestion[]>([]);
  const [quizM4, setQuizM4] = useState<QuizQuestion[]>([]);
  const [quizM5, setQuizM5] = useState<QuizQuestion[]>([]);
  const [quizM6, setQuizM6] = useState<QuizQuestion[]>([]);
  const [quizM7, setQuizM7] = useState<QuizQuestion[]>([]);
  const [quizM8, setQuizM8] = useState<QuizQuestion[]>([]);
  const [quizM9, setQuizM9] = useState<QuizQuestion[]>([]);
  const [quizM10, setQuizM10] = useState<QuizQuestion[]>([]);
  const [shuffledChallenges, setShuffledChallenges] = useState<Challenge[]>([]);
  const [challengeIndex, setChallengeIndex] = useState(0);

  const [currentExample, setCurrentExample] = useState(
    CRASE_CONCEPT_EXAMPLES[0],
  );

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

    if (!loading) {
      setQuizM1(getRandomQuestions(QUIZ_M1_CONCEITO, 10));
      setQuizM2(getRandomQuestions(QUIZ_M2_TESTE_MASCULINO, 10));
      setQuizM3(getRandomQuestions(QUIZ_M3_PROIBIDO_VERBOS, 10));
      setQuizM4(getRandomQuestions(QUIZ_M4_PROIBIDO_PRONOMES, 10));
      setQuizM5(getRandomQuestions(QUIZ_M5_FACULTATIVO_NOMES, 10));
      setQuizM6(getRandomQuestions(QUIZ_M6_FACULTATIVO_POSSESSIVOS, 10));
      setQuizM7(getRandomQuestions(QUIZ_M7_HORAS_MEDIDAS, 10));
      setQuizM8(getRandomQuestions(QUIZ_M8_CASOS_ESPECIAIS, 10));
      setQuizM9(getRandomQuestions(QUIZ_M9_DEMONSTRATIVOS, 10));
      setQuizM10(getRandomQuestions(QUIZ_M10_SIMULADO, 10));
      setShuffledChallenges(
        [...CHALLENGE_POOL].sort(() => 0.5 - Math.random()),
      );
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
        onComplete?.();
      }
    }
  };

  const isModuleUnlocked = (_index: number) => {
    return true; // TEMPORÁRIO: Desbloqueado para revisão
  };

  if (loading) return null;

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
      {/* ─── MÓDULO 1: CONCEITO E REGRA GERAL ─── */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={1}
            titulo="Conceito e Regra Geral"
            descricao="A matemática da língua: Preposição A + Artigo A = À."
            variant={mv[1]}
          />

          {/* SEÇÃO 1: CONCEITUAÇÃO */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Conceituação: O que é a Crase?"
              description="A crase não é um acento, mas sim um fenômeno fonético de fusão."
              variant={mv[1]}
            />
            <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
              <p>
                Diferente do que muitos pensam, <strong>Crase</strong> não é o
                nome do acento. Crase (do grego <em>krâsis</em> = mistura) é o
                fenômeno da <strong>fusão de duas vogais idênticas</strong>. O
                acento que usamos para marcar essa fusão é o{" "}
                <strong>acento grave (`)</strong>.
              </p>
              <p>
                No português, a crase ocorre na junção da{" "}
                <strong>preposição "a"</strong> (exigida por um verbo ou nome
                regente) com o <strong>artigo feminino "a"</strong> (que
                acompanha a palavra regida).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <div className="bg-muted/30 p-6 rounded-xl text-center border border-border/50">
                  <div className="text-4xl font-bold mb-2 text-indigo-500">
                    A
                  </div>
                  <div className="text-lg uppercase tracking-wider font-bold text-muted-foreground">
                    Preposição
                  </div>
                  <div className="text-lg text-muted-foreground/60 mt-1">
                    (Termo Regente pede: Ex: Ir A)
                  </div>
                </div>
                <div className="flex items-center justify-center text-2xl font-bold text-muted-foreground">
                  +
                </div>
                <div className="bg-muted/30 p-6 rounded-xl text-center border border-border/50">
                  <div className="text-4xl font-bold mb-2 text-rose-500">A</div>
                  <div className="text-lg uppercase tracking-wider font-bold text-muted-foreground">
                    Artigo Definido
                  </div>
                  <div className="text-lg text-muted-foreground/60 mt-1">
                    (Termo Regido aceita: Ex: A Praia)
                  </div>
                </div>
                <div className="col-span-1 md:col-span-3 bg-gradient-to-r from-indigo-500/10 to-rose-500/10 p-6 rounded-xl text-center border border-indigo-500/20 flex flex-col items-center justify-center">
                  <div className="text-6xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-rose-600">
                    = À
                  </div>
                  <div className="text-lg font-bold text-foreground">
                    A fusão de preposição + artigo (ou pronome)
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SEÇÃO 2: EXEMPLIFICAÇÃO */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Exemplificação: Na Prática"
              description="Veja como a fusão acontece e interaja com os cards clássicos de substituição."
              variant={mv[1]}
            />

            <FlipCard
              frente={currentExample.frente}
              verso={currentExample.verso}
            />
            <div className="text-center mt-4">
              <button
                onClick={() => {
                  const random = Math.floor(
                    Math.random() * CRASE_CONCEPT_EXAMPLES.length,
                  );
                  setCurrentExample(CRASE_CONCEPT_EXAMPLES[random]);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-lg font-medium hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors cursor-pointer"
              >
                <LuShuffle className="w-3 h-3" />
                Gerar novo exemplo
              </button>
            </div>
          </section>

          <ModuleConsolidation
            index={5}
            video={{
              videoId: "placeholder",
              title: "Crase sem Segredos: A Regra de Ouro",
              duration: "12:30",
              thumbnail:
                "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1073&auto=format&fit=crop",
            }}
            resumoVisual={{
              moduloNome: "Módulo 1",
              tituloAula: "Crase",
              materia: "Língua Portuguesa",
              images: [
                {
                  title: "Mapa Mental: A + A = À",
                  type: "Mapa Mental",
                  placeholderColor: "bg-rose-900/10",
                },
              ],
            }}
            audio={{
              audioUrl:
                "https://cdn.pixabay.com/audio/2022/03/15/audio_c8c8a7343b.mp3",
              titulo: "O Rap da Crase",
              artista: "Prof. Antigravity",
              capaUrl:
                "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000",
            }}
            variant={mv[1]}
          />

          <QuizInterativo
            titulo="QUIZ: Módulo Nº 1"
            icone="🧠"
            numero={6}
            questoes={quizM1}
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
            variant={mv[1]}
          />
        </div>
      </TabsContent>

      {/* ─── MÓDULO 2: TESTE DO MASCULINO ─── */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={2}
            titulo="Identificação: Teste do Masculino"
            descricao="O macete mais poderoso para nunca errar a crase novamente."
            variant={mv[2]}
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Conceituação: A Regra de Ouro"
              description="Como trocar uma palavra feminina por masculina para descobrir se há crase."
              variant={mv[2]}
            />
            <p className="text-lg text-muted-foreground leading-relaxed">
              A estratégia mais eficaz para identificar crase é a <strong>Troca Mágica</strong>:
              substitua a palavra feminina por uma correspondente masculina. Se a preposição
              virar "AO" no masculino, há crase no feminino.
            </p>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Exemplificação: Prática do Teste"
              description="Veja exemplos práticos de como aplicar o teste do masculino."
              variant={mv[2]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ComparisonSide
                tipo="correct"
                titulo="Deu AO = Tem Crase"
                items={[
                  "Vou ao parque -> Vou à praça",
                  "Assisti ao show -> Assisti à peça",
                  "Obedeci ao pai -> Obedeci à mãe",
                  "Dirigiu-se ao portão -> Dirigiu-se à porta",
                ]}
              />
              <ComparisonSide
                tipo="incorrect"
                titulo="Deu O ou A = Sem Crase"
                items={[
                  "Visitei o parque -> Visitei a praça",
                  "Comi o bolo -> Comi a torta",
                  "Conheci o aluno -> Conheci a aluna",
                  "Amo o cão -> Amo a gata",
                ]}
              />
            </div>
          </section>

          <ModuleConsolidation
            index={5}
            video={{
              videoId: "placeholder",
              title: "O Macete do AO",
              duration: "08:45",
              thumbnail:
                "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1000&auto=format&fit=crop",
            }}
            variant={mv[2]}
          />

          <QuizInterativo
            titulo="QUIZ: Módulo Nº 2"
            icone="🔍"
            numero={6}
            questoes={quizM2}
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
            variant={mv[2]}
          />
        </div>
      </TabsContent>

      {/* ─── MÓDULO 3: CASOS PROIBIDOS - VERBOS ─── */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={3}
            titulo="Casos Proibidos I: Verbos"
            descricao="Situações onde a crase NUNCA ocorre: verbos não admitem artigo feminino."
            variant={mv[3]}
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Conceituação: Por Que Não Há Crase?"
              description="Entenda o motivo gramatical da proibição."
              variant={mv[3]}
            />
            <p className="text-lg text-muted-foreground leading-relaxed">
              Crase = Preposição + Artigo. Um verbo no infinitivo nunca admite
              o artigo feminino "a". Logo, o "a" antes de um verbo será sempre
              apenas uma preposição, nunca uma crase.
            </p>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Exemplificação: Situações de Proibição"
              description="Veja frases que comprovam essa regra absoluta."
              variant={mv[3]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { ex: "Começou a chover", desc: "Verbo + A = Sem Crase" },
                { ex: "Passou a trabalhar", desc: "Verbo + A = Sem Crase" },
                { ex: "Começou a cantar", desc: "Verbo + A = Sem Crase" },
                { ex: "A partir de hoje", desc: "Verbo + A = Sem Crase" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-red-500/5 border border-red-500/20 p-6 rounded-2xl"
                >
                  <p className="font-mono text-lg text-foreground mb-2">
                    {item.ex}
                  </p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <ModuleConsolidation
            index={5}
            video={{
              videoId: "placeholder",
              title: "Verbos e a Proibição da Crase",
              duration: "10:20",
              thumbnail:
                "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1073&auto=format&fit=crop",
            }}
            variant={mv[3]}
          />

          <QuizInterativo
            titulo="QUIZ: Módulo Nº 3"
            icone="🚫"
            numero={6}
            questoes={quizM3}
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
            variant={mv[3]}
          />
        </div>
      </TabsContent>

      {/* ─── MÓDULO 4: CASOS PROIBIDOS - PRONOMES ─── */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={4}
            titulo="Casos Proibidos II: Pronomes Pessoais"
            descricao="Pronomes pessoais não recebem artigo feminino, logo nunca há crase."
            variant={mv[4]}
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Conceituação: Pronomes e Artigos"
              description="Por que pronomes pessoais impedem a crase."
              variant={mv[4]}
            />
            <p className="text-lg text-muted-foreground leading-relaxed">
              Pronomes pessoais (me, ti, ele, ela, nós, vós, eles, elas) funcionam
              como nomes e jamais recebem artigo. Portanto, não há artigo para
              fundi-se com a preposição, e não há crase.
            </p>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Exemplificação: Pronomes que Bloqueiam Crase"
              description="Conheça todos os casos."
              variant={mv[4]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { ex: "Referi-me a ela", desc: "Pronome pessoal: Sem Crase" },
                { ex: "Apresentei-o a você", desc: "Pronome pessoal: Sem Crase" },
                { ex: "Entreguei a mim", desc: "Pronome pessoal: Sem Crase" },
                { ex: "Falei a ele", desc: "Pronome pessoal: Sem Crase" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-red-500/5 border border-red-500/20 p-6 rounded-2xl"
                >
                  <p className="font-mono text-lg text-foreground mb-2">
                    {item.ex}
                  </p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <ModuleConsolidation
            index={5}
            video={{
              videoId: "placeholder",
              title: "Pronomes Pessoais e Crase",
              duration: "09:15",
              thumbnail:
                "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1000&auto=format&fit=crop",
            }}
            variant={mv[4]}
          />

          <QuizInterativo
            titulo="QUIZ: Módulo Nº 4"
            icone="👤"
            numero={6}
            questoes={quizM4}
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
            variant={mv[4]}
          />
        </div>
      </TabsContent>

      {/* ─── MÓDULO 5: CRASE FACULTATIVA COM NOMES PRÓPRIOS ─── */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={5}
            titulo="Crase Facultativa com Nomes Próprios"
            descricao="Quando você escolhe usar ou não o acento sem erro gramatical."
            variant={mv[5]}
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Conceituação: A Liberdade da Escolha"
              description="Por que a crase é opcional diante de nomes próprios femininos."
              variant={mv[5]}
            />
            <p className="text-lg text-muted-foreground leading-relaxed">
              A crase é facultativa porque o próprio artigo é facultativo.
              Antes de nomes de mulheres, podemos dizer "a Maria" ou "à Maria"
              — ambas as formas são aceitas na norma culta.
            </p>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Exemplificação: Nomes Próprios Femininos"
              description="Veja as duas formas possíveis."
              variant={mv[5]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-2xl">
                <h4 className="font-bold text-emerald-700 mb-3">Com Crase</h4>
                <ul className="space-y-2 text-foreground">
                  <li>Entreguei o prêmio à Maria</li>
                  <li>Refiro-me à Rosa</li>
                  <li>Dedico à Ana</li>
                </ul>
              </div>
              <div className="bg-blue-500/5 border border-blue-500/20 p-6 rounded-2xl">
                <h4 className="font-bold text-blue-700 mb-3">Sem Crase</h4>
                <ul className="space-y-2 text-foreground">
                  <li>Entreguei o prêmio a Maria</li>
                  <li>Refiro-me a Rosa</li>
                  <li>Dedico a Ana</li>
                </ul>
              </div>
            </div>
          </section>

          <ModuleConsolidation
            index={5}
            video={{
              videoId: "placeholder",
              title: "Nomes Próprios e Crase Facultativa",
              duration: "08:30",
              thumbnail:
                "https://images.unsplash.com/photo-1454165833267-028cc21e78e2?q=80&w=1000&auto=format&fit=crop",
            }}
            variant={mv[5]}
          />

          <QuizInterativo
            titulo="QUIZ: Módulo Nº 5"
            icone="👩"
            numero={6}
            questoes={quizM5}
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
            variant={mv[5]}
          />
        </div>
      </TabsContent>

      {/* ─── MÓDULO 6: CRASE FACULTATIVA COM POSSESSIVOS ─── */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={6}
            titulo="Crase Facultativa com Possessivos"
            descricao="Quando o pronome possessivo também dá a opção de crase."
            variant={mv[6]}
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Conceituação: Possessivos Femininos"
              description="A mesma lógica do artigo opcional se aplica aos possessivos."
              variant={mv[6]}
            />
            <p className="text-lg text-muted-foreground leading-relaxed">
              Como o artigo antes do possessivo é opcional ("a minha" ou "minha"),
              a crase também é opcional: "a minha" ou "à minha".
            </p>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Exemplificação: Possessivos em Contexto"
              description="Veja quando é facultativo e quando não é."
              variant={mv[6]}
            />

            <div className="bg-violet-500/5 p-6 rounded-2xl border border-violet-500/20">
              <h4 className="font-bold text-violet-700 mb-4">Facultativo</h4>
              <p className="text-foreground mb-3">
                Quando o possessivo acompanha um substantivo explícito:
              </p>
              <div className="space-y-2 text-foreground">
                <p>"Referi-me a sua opinião" ou "Referi-me à sua opinião"</p>
                <p>"Entreguei a sua carta" ou "Entreguei à sua carta"</p>
              </div>
            </div>

            <div className="bg-rose-500/5 p-6 rounded-2xl border border-rose-500/20">
              <h4 className="font-bold text-rose-700 mb-4">Obrigatório</h4>
              <p className="text-foreground mb-3">
                Quando o possessivo substitui o substantivo (é pronome de verdade):
              </p>
              <div className="space-y-2 text-foreground">
                <p>"Obedeci à sua ordem e não à minha" [não à minha ordem, mas à minha]</p>
              </div>
            </div>
          </section>

          <ModuleConsolidation
            index={5}
            video={{
              videoId: "placeholder",
              title: "Possessivos Femininos e Crase",
              duration: "07:45",
              thumbnail:
                "https://images.unsplash.com/photo-1454165833267-028cc21e78e2?q=80&w=1000&auto=format&fit=crop",
            }}
            variant={mv[6]}
          />

          <QuizInterativo
            titulo="QUIZ: Módulo Nº 6"
            icone="🙋"
            numero={6}
            questoes={quizM6}
            onComplete={(score) => handleModuleComplete("modulo-6", score)}
            variant={mv[6]}
          />
        </div>
      </TabsContent>

      {/* ─── MÓDULO 7: CASOS ESPECIAIS - HORAS E MEDIDAS ─── */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={7}
            titulo="Casos Especiais I: Horas e Medidas"
            descricao="Regras específicas para indicações de tempo e distância."
            variant={mv[7]}
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Conceituação: O Tempo e a Distância"
              description="Como funciona a crase com horas e medidas."
              variant={mv[7]}
            />
            <p className="text-lg text-muted-foreground leading-relaxed">
              Indicações de horas exatas recebem sempre crase:
              "às 14h", "à uma hora". O mesmo ocorre com expressões de medida
              específica: "à distância de 100km".
            </p>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Exemplificação: Horas Exatas"
              description="Veja os padrões de uso."
              variant={mv[7]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-amber-500/5 border border-amber-500/20 p-6 rounded-2xl">
                <h4 className="font-bold text-amber-700 mb-3 flex items-center gap-2">
                  <LuClock /> Horas Exatas
                </h4>
                <ul className="space-y-2 text-foreground">
                  <li>A reunião é <strong>às 14h30</strong></li>
                  <li>Chegue <strong>à uma hora</strong></li>
                  <li>Saio <strong>às três</strong> da tarde</li>
                </ul>
              </div>
              <div className="bg-purple-500/5 border border-purple-500/20 p-6 rounded-2xl">
                <h4 className="font-bold text-purple-700 mb-3 flex items-center gap-2">
                  <LuRuler /> Medidas Específicas
                </h4>
                <ul className="space-y-2 text-foreground">
                  <li>Ficou <strong>à distância de 50m</strong></li>
                  <li>Mora <strong>à beira-mar</strong></li>
                  <li>Está <strong>à altura do joelho</strong></li>
                </ul>
              </div>
            </div>
          </section>

          <ModuleConsolidation
            index={5}
            video={{
              videoId: "placeholder",
              title: "Horas, Medidas e Crase",
              duration: "11:00",
              thumbnail:
                "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1170&auto=format&fit=crop",
            }}
            variant={mv[7]}
          />

          <QuizInterativo
            titulo="QUIZ: Módulo Nº 7"
            icone="🕐"
            numero={6}
            questoes={quizM7}
            onComplete={(score) => handleModuleComplete("modulo-7", score)}
            variant={mv[7]}
          />
        </div>
      </TabsContent>

      {/* ─── MÓDULO 8: CASOS ESPECIAIS - PALAVRAS ESPECIAIS ─── */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={8}
            titulo="Casos Especiais II: Palavras Especiais"
            descricao="Casa, Terra, Distância e as locuções especiais."
            variant={mv[8]}
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Conceituação: A Trindade Especial"
              description="Três palavras que merecematenção especial."
              variant={mv[8]}
            />
            <p className="text-lg text-muted-foreground leading-relaxed">
              As palavras <strong>Casa</strong>, <strong>Terra</strong> e <strong>Distância</strong>
              têm regras próprias que dependem se estão especificadas ou não.
            </p>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Exemplificação: A Regra da Especificação"
              description="Sem especificador, sem crase. Com especificador, com crase."
              variant={mv[8]}
            />

            <CardCarousel
              cards={[
                {
                  icone: <LuBuilding className="text-xl text-teal-600" />,
                  title: "Palavra CASA",
                  descricao:
                    "LAR próprio = sem crase (Fui a casa). Casa ESPECIFICADA = com crase (Fui à casa da vovó).",
                },
                {
                  icone: <LuAnchor className="text-xl text-blue-600" />,
                  title: "Palavra TERRA",
                  descricao:
                    "Oposto de mar/bordo = sem crase (Os marinheiros desceram a terra). Planeta ou especificada = com crase (Voltamos à Terra).",
                },
                {
                  icone: <LuRuler className="text-xl text-purple-600" />,
                  title: "Palavra DISTÂNCIA",
                  descricao:
                    "Distância indefinida = sem crase (Ficou a distância). Distância EXATA = com crase (Ficou à distância de 20 metros).",
                },
              ]}
            />
          </section>

          <ModuleConsolidation
            index={5}
            video={{
              videoId: "placeholder",
              title: "Casa, Terra e Distância",
              duration: "13:15",
              thumbnail:
                "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1170&auto=format&fit=crop",
            }}
            variant={mv[8]}
          />

          <QuizInterativo
            titulo="QUIZ: Módulo Nº 8"
            icone="🏠"
            numero={6}
            questoes={quizM8}
            onComplete={(score) => handleModuleComplete("modulo-8", score)}
            variant={mv[8]}
          />
        </div>
      </TabsContent>

      {/* ─── MÓDULO 9: PRONOMES DEMONSTRATIVOS ─── */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={9}
            titulo="Pronomes Demonstrativos"
            descricao="Àquele, Àquela, Àquilo: fusão com demonstrativos sempre leva crase."
            variant={mv[9]}
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Conceituação: A Colisão de Duas Preposições"
              description="Por que a crase ocorre necessariamente com demonstrativos."
              variant={mv[9]}
            />
            <p className="text-lg text-muted-foreground leading-relaxed">
              Pronomes demonstrativos já começam com a letra "A" (aquele, aquela, aquilo).
              Quando o verbo anterior pede a preposição "A", há uma colisão:
              A (preposição) + Aquele = Àquele.
            </p>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Exemplificação: Demonstrativos em Contexto"
              description="Veja todos os casos de demonstrativos com crase."
              variant={mv[9]}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { dem: "Àquele", base: "Aquele", ex: "Entreguei a carta àquele rapaz" },
                { dem: "Àquela", base: "Aquela", ex: "Refiro-me àquela proposta" },
                { dem: "Àquilo", base: "Aquilo", ex: "Aludi àquilo que dissestes" },
                { dem: "Àqueles", base: "Aqueles", ex: "Dei o documento àqueles alunos" },
                { dem: "Àquelas", base: "Aquelas", ex: "Saudei àquelas senhoras" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-indigo-500/5 border border-indigo-500/20 p-4 rounded-xl"
                >
                  <p className="font-bold text-indigo-700 mb-2">{item.dem}</p>
                  <p className="text-xs text-muted-foreground mb-2">
                    A + {item.base}
                  </p>
                  <p className="text-sm text-foreground">{item.ex}</p>
                </div>
              ))}
            </div>
          </section>

          <ModuleConsolidation
            index={5}
            video={{
              videoId: "placeholder",
              title: "Demonstrativos e a Crase",
              duration: "09:20",
              thumbnail:
                "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1073&auto=format&fit=crop",
            }}
            variant={mv[9]}
          />

          <QuizInterativo
            titulo="QUIZ: Módulo Nº 9"
            icone="📍"
            numero={6}
            questoes={quizM9}
            onComplete={(score) => handleModuleComplete("modulo-9", score)}
            variant={mv[9]}
          />
        </div>
      </TabsContent>

      {/* ─── MÓDULO 10: SIMULADO INTEGRADO ─── */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={10}
            titulo="Simulado Integrado"
            descricao="Consolidação total de todos os conhecimentos com contexto Petrobras."
            variant={mv[10]}
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Revisão Relâmpago: Os 9 Módulos em Uma Página"
              description="O caminho completo da crase em um resumo final."
              variant={mv[10]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  num: "1",
                  titulo: "Conceito",
                  desc: "A + A = À (Preposição + Artigo)",
                },
                {
                  num: "2",
                  titulo: "Teste",
                  desc: "Troque por masculino. Virou AO? Tem crase!",
                },
                {
                  num: "3",
                  titulo: "Proibição",
                  desc: "Nunca antes de verbo",
                },
                {
                  num: "4",
                  titulo: "Pronomes",
                  desc: "Nunca antes de pronome pessoal",
                },
                {
                  num: "5",
                  titulo: "Nomes Próprios",
                  desc: "Facultativo (a ou à)",
                },
                {
                  num: "6",
                  titulo: "Possessivos",
                  desc: "Facultativo (a ou à)",
                },
                {
                  num: "7",
                  titulo: "Horas",
                  desc: "Obrigatório (à uma, às 14h)",
                },
                {
                  num: "8",
                  titulo: "Especiais",
                  desc: "Depende de especificação",
                },
                {
                  num: "9",
                  titulo: "Demonstrativos",
                  desc: "Obrigatório (àquele, àquela)",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-slate-500/10 to-slate-500/5 border border-slate-500/20 p-4 rounded-xl"
                >
                  <span className="inline-block w-8 h-8 bg-gradient-to-br from-indigo-500 to-rose-500 text-white rounded-full flex items-center justify-center font-bold text-sm mb-2">
                    {item.num}
                  </span>
                  <h4 className="font-bold text-foreground mb-1">{item.titulo}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Desafios Petrobras"
              description="Questões que costumam cair em concursos reais."
              variant={mv[10]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AlertBox tipo="info" titulo="Pegadinha 1: Paralelismo">
                <p className="text-foreground mb-2">
                  "A aula vai <strong>DA</strong> uma <strong>À</strong> cinco."
                </p>
                <p className="text-sm text-muted-foreground">
                  DAS...ÀS (equilibrio)
                </p>
              </AlertBox>
              <AlertBox tipo="info" titulo="Pegadinha 2: Especificadores">
                <p className="text-foreground mb-2">
                  "Refiro-me <strong>à Maria do Carmo</strong>."
                </p>
                <p className="text-sm text-muted-foreground">
                  Deixa de ser facultativo (obrigatória aqui)
                </p>
              </AlertBox>
            </div>
          </section>

          <ModuleConsolidation
            index={5}
            video={{
              videoId: "placeholder",
              title: "Simulado Final: Revisão Completa",
              duration: "20:00",
              thumbnail:
                "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=1000&auto=format&fit=crop",
            }}
            variant={mv[10]}
          />

          <QuizInterativo
            titulo="QUIZ: Módulo Nº 10 - Simulado"
            icone="🏆"
            numero={6}
            questoes={quizM10}
            onComplete={(score) => handleModuleComplete("modulo-10", score)}
            variant={mv[10]}
          />

          {/* COMPLETION BANNER */}
          {completedModules.has("modulo-10") && (
            <div className="bg-gradient-to-r from-indigo-900 to-violet-900 rounded-2xl p-12 text-center text-white space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-4xl font-bold">🎓 ESPECIALISTA EM CRASE</h2>
              <p className="text-lg">
                Você domina completamente a crase em português! Está pronto para encarar qualquer texto e prova da Petrobras.
              </p>
              <Button
                size="lg"
                onClick={() => {
                  if (onComplete) onComplete();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-white text-indigo-900 hover:bg-slate-100 font-bold text-lg px-8"
              >
                Finalizar Aula
              </Button>
            </div>
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
