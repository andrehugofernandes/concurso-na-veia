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
  TabbedContent,
  SectionTitle,
  ComparisonSide,
} from "../shared";

// ── Fallback for React 19 Activity ───────────────────────────────────────
// ── Constants & Data ────────────────────────────────────────────────────

const QUIZ_M1_POOL: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "A crase é a fusão de quais elementos gramaticais?",
    opcoes: [
      { label: "A", valor: 'Preposição "a" + Artigo definido "a"' },
      { label: "B", valor: 'Preposição "a" + Pronome pessoal "ela"' },
      { label: "C", valor: 'Artigo "a" + Verbo haver' },
      { label: "D", valor: 'Preposição "para" + Artigo "a"' },
    ],
    correta: "A",
    explicacao:
      'Crase é a contração da preposição "a" exigida pelo termo regente with o artigo "a" (ou pronomes demonstrativos) do termo regido.',
  },
  {
    id: 2,
    pergunta:
      'Qual a "Regra de Ouro" for identificar a crase diante de palavras femininas?',
    opcoes: [
      {
        label: "A",
        valor: 'Trocar por uma palavra masculina e ver se vira "AO"',
      },
      { label: "B", valor: "Trocar por plural" },
      { label: "C", valor: 'Ver se a palavra termina em "a"' },
      { label: "D", valor: "Sempre usar crase antes de feminino" },
    ],
    correta: "A",
    explicacao:
      'Se ao trocar a palavra feminina por uma masculina (ex: escola -> colégio) a preposição "a" virar "ao" (ex: vou à escola -> vou ao colégio), há crase.',
  },
  {
    id: 3,
    pergunta: 'Complete: "Ele obedeceu ___ regras da empresa."',
    opcoes: [
      { label: "A", valor: "às" },
      { label: "B", valor: "as" },
      { label: "C", valor: "a" },
      { label: "D", valor: "nas" },
    ],
    correta: "A",
    explicacao:
      'Quem obedece, obedece A alguma coisa. "Regras" pede artigo "as". Logo, A + AS = ÀS.',
  },
  {
    id: 4,
    pergunta: 'Na frase "Vou a Bahia", ocorre crase?',
    opcoes: [
      { label: "A", valor: "Sim, sempre" },
      { label: "B", valor: "Não, pois quem vai a Bahia, volta de Bahia" },
      { label: "C", valor: "Sim, pois Bahia é feminino" },
      { label: "D", valor: 'Sim, "Vou à Bahia" porque volto DA Bahia' },
    ],
    correta: "D",
    explicacao:
      'Use o macete: "Quem vai A e volta DA, crase há! Quem vai A e volta DE, crase pra quê?". Volto DA Bahia, logo, vou À Bahia.',
  },
];

const QUIZ_M2_POOL: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "É PROIBIDO usar crase antes de:",
    opcoes: [
      { label: "A", valor: "Palavras femininas" },
      { label: "B", valor: "Verbos" },
      { label: "D", valor: "Horas" },
      { label: "C", valor: "Locuções adverbiais" },
    ],
    correta: "B",
    explicacao:
      'Nunca ocorre crase antes de verbos (ex: a partir, a fazer), pois verbos não admitem artigo feminino "a".',
  },
  {
    id: 2,
    pergunta: "Qual frase está CORRETA quanto ao uso da crase?",
    opcoes: [
      { label: "A", valor: "Referi-me a ela com respeito." },
      { label: "B", valor: "Referi-me à ela com respeito." },
      { label: "C", valor: "Referi-me à Vossa Senhoria." },
      { label: "D", valor: "Dedico isso à você." },
    ],
    correta: "A",
    explicacao:
      "Não se usa crase antes de pronomes pessoais (ela, você) ou de tratamento (Vossa Senhoria), exceto Senhora e Senhorita.",
  },
  {
    id: 3,
    pergunta: 'Em "Estou disposto a ajudar a quem precisa", a frase está:',
    opcoes: [
      { label: "A", valor: "Correta, sem crase" },
      { label: "B", valor: 'Incorreta, falta crase no primeiro "a"' },
      { label: "C", valor: 'Incorreta, falta crase no segundo "a"' },
      { label: "D", valor: "Incorreta, falta crase em ambos" },
    ],
    correta: "A",
    explicacao:
      '"Ajudar" é verbo (sem artigo). "Quem" é pronome indefinido (geralmente rejeita artigo). Logo, apenas preposição "a" nos dois casos.',
  },
  {
    id: 4,
    pergunta: "Ocorre crase facultativa antes de:",
    opcoes: [
      { label: "A", valor: "Verbos no infinitivo" },
      { label: "B", valor: "Palavras masculinas" },
      {
        label: "C",
        valor: "Nomes próprios femininos e Pronomes Possessivos Femininos",
      },
      { label: "D", valor: "Numerais cardinais" },
    ],
    correta: "C",
    explicacao:
      "Antes de nomes de mulheres (ex: à Maria / a Maria) e pronomes possessivos femininos (ex: à minha terra / a minha terra), a crase é opcional.",
  },
];

const QUIZ_M3_POOL: QuizQuestion[] = [
  {
    id: 301,
    pergunta: "Antes de nomes próprios femininos, o uso da crase é:",
    opcoes: [
      { label: "A", valor: "Obrigatório" },
      { label: "B", valor: "Proibido" },
      { label: "C", valor: "Facultativo" },
      { label: "D", valor: "Obrigatório apenas no plural" },
    ],
    correta: "C",
    explicacao:
      "Antes de nomes próprios de pessoas (femininos), a crase é facultativa porque o uso do artigo antes do nome também é opcional.",
  },
  {
    id: 302,
    pergunta: "Em qual das frases abaixo a crase é opcional?",
    opcoes: [
      { label: "A", valor: "Entregou o livro à sua irmã." },
      { label: "B", valor: "Entregou o livro à diretora." },
      { label: "C", valor: "Vou à praia amanhã." },
      { label: "D", valor: "Chegamos às dez horas." },
    ],
    correta: "A",
    explicacao:
      "Antes de pronomes possessivos femininos (sua, minha, tua...), a crase é facultativa.",
  },
];

const QUIZ_M4_POOL: QuizQuestion[] = [
  {
    id: 401,
    pergunta: "Sobre a indicação de horas, assinale a alternativa correta:",
    opcoes: [
      { label: "A", valor: "Chegaremos a uma hora da manhã." },
      { label: "B", valor: "Chegaremos às uma hora da manhã." },
      { label: "C", valor: "Chegaremos à uma hora da manhã." },
      { label: "D", valor: "Chegaremos as uma hora da manhã." },
    ],
    correta: "C",
    explicacao:
      "Em indicações de horas exatas, utiliza-se a crase. Como 'uma' é singular, usa-se 'à'. No plural (duas, três...), usa-se 'às'.",
  },
  {
    id: 402,
    pergunta: "Ocorre crase na palavra 'casa' quando:",
    opcoes: [
      { label: "A", valor: "Significa lar ou residência própria." },
      {
        label: "B",
        valor: "Vem acompanhada de um adjetivo ou locução explicativa.",
      },
      { label: "C", valor: "Sempre que for precedida de preposição." },
      { label: "D", valor: "Nunca ocorre crase com a palavra casa." },
    ],
    correta: "B",
    explicacao:
      "A palavra 'casa' (sentido de lar) só admite crase se estiver especificada (ex: casa da Maria).",
  },
];

const QUIZ_FINAL_POOL: QuizQuestion[] = [
  {
    id: 501,
    pergunta: "Assinale a alternativa que exige crase:",
    opcoes: [
      { label: "A", valor: "Saímos as pressas." },
      { label: "B", valor: "Ficamos cara a cara." },
      { label: "C", valor: "Escrevi a lápis." },
      { label: "D", valor: "Andamos a cavalo." },
    ],
    correta: "A",
    explicacao:
      '"Às pressas" é uma locução adverbial feminina de modo. Locuções femininas levam crase.',
  },
  {
    id: 502,
    pergunta: 'Analise: "Refiro-me àquele rapaz."',
    opcoes: [
      { label: "A", valor: "Errado, aquele é masculino" },
      {
        label: "B",
        valor: 'Certo, fusão da preposição "a" + "a" inicial de "aquele"',
      },
      { label: "C", valor: 'Errado, deveria ser "ao aquele"' },
      {
        label: "D",
        valor: "Errado, pronomes demonstrativos nunca levam crase",
      },
    ],
    correta: "B",
    explicacao:
      'A crase ocorre com o "a" inicial dos pronomes demonstrativos aquele(s), aquela(s), aquilo.',
  },
];

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
          <p className="text-sm text-muted-foreground">
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
          <p className="text-sm text-muted-foreground">
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
          <p className="text-sm text-muted-foreground">
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
          <p className="text-sm text-muted-foreground">
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
          <p className="text-sm text-muted-foreground">
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
    { id: "modulo-1", label: "Módulo 1", title: "Regra Geral" },
    { id: "modulo-2", label: "Módulo 2", title: "Proibições" },
    { id: "modulo-3", label: "Módulo 3", title: "Facultativos" },
    { id: "modulo-4", label: "Módulo 4", title: "Casos Especiais" },
    { id: "modulo-5", label: "Módulo 5", title: "Simulado Final" },
  ] as const;

  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(),
  );
  const [quizM1, setQuizM1] = useState<QuizQuestion[]>([]);
  const [quizM2, setQuizM2] = useState<QuizQuestion[]>([]);
  const [quizM3, setQuizM3] = useState<QuizQuestion[]>([]);
  const [quizM4, setQuizM4] = useState<QuizQuestion[]>([]);
  const [quizFinal, setQuizFinal] = useState<QuizQuestion[]>([]);
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
      setQuizM1(getRandomQuestions(QUIZ_M1_POOL, 8));
      setQuizM2(getRandomQuestions(QUIZ_M2_POOL, 8));
      setQuizM3(getRandomQuestions(QUIZ_M3_POOL, 8));
      setQuizM4(getRandomQuestions(QUIZ_M4_POOL, 8));
      setQuizFinal(getRandomQuestions(QUIZ_FINAL_POOL, 8));
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
            gradiente="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-600"
          />

          {/* SEÇÃO 1: CONCEITUAÇÃO */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              variant="indigo"
              index={1}
              title="Conceituação: O que é a Crase?"
              description="A crase não é um acento, mas sim um fenômeno fonético de fusão."
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
                  <div className="text-xs uppercase tracking-wider font-bold text-muted-foreground">
                    Preposição
                  </div>
                  <div className="text-xs text-muted-foreground/60 mt-1">
                    (Termo Regente pede: Ex: Ir A)
                  </div>
                </div>
                <div className="flex items-center justify-center text-2xl font-bold text-muted-foreground">
                  +
                </div>
                <div className="bg-muted/30 p-6 rounded-xl text-center border border-border/50">
                  <div className="text-4xl font-bold mb-2 text-rose-500">A</div>
                  <div className="text-xs uppercase tracking-wider font-bold text-muted-foreground">
                    Artigo Definido
                  </div>
                  <div className="text-xs text-muted-foreground/60 mt-1">
                    (Termo Regido aceita: Ex: A Praia)
                  </div>
                </div>
                <div className="col-span-1 md:col-span-3 bg-gradient-to-r from-indigo-500/10 to-rose-500/10 p-6 rounded-xl text-center border border-indigo-500/20 flex flex-col items-center justify-center">
                  <div className="text-6xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-rose-600">
                    = À
                  </div>
                  <div className="text-sm font-bold text-foreground">
                    A fusão de preposição + artigo (ou pronome)
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SEÇÃO 2: EXEMPLIFICAÇÃO */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              variant="indigo"
              index={2}
              title="Exemplificação: Na Prática"
              description="Veja como a fusão acontece e interaja com os cards clássicos de substituição."
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
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors cursor-pointer"
              >
                <LuShuffle className="w-3 h-3" />
                Gerar novo exemplo
              </button>
            </div>
          </section>

          {/* SEÇÃO 3: DICAS */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              variant="indigo"
              index={3}
              title="Dicas Infalíveis (Macetes)"
              description="Regra de Ouro e o Macete do Destino para nunca errar a prova."
            />

            <h3 className="text-lg font-bold text-indigo-600 flex items-center gap-2">
              <LuZap /> Macete 1: A Troca Mágica (Feminino para Masculino)
            </h3>
            <p className="text-muted-foreground mb-4">
              Troque a palavra feminina seguinte por um substantivo masculino.
              Se aparecer <strong>"AO"</strong> no masculino,{" "}
              <strong>haverá crase</strong> no feminino. Se aparecer apenas "O"
              ou "A", não haverá crase.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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

            <div className="mt-8 border-t border-border pt-8">
              <h3 className="text-lg font-bold text-indigo-600 flex items-center gap-2 mb-4">
                <LuMapPin /> Macete 2: Lugares e Destinos (Vou a, Volto da)
              </h3>
              <div className="p-6 bg-blue-500/10 rounded-xl border-l-4 border-blue-500">
                <p className="font-medium text-lg text-foreground italic">
                  "Quem vai A e volta DA, crase HÁ. Quem vai A e volta DE, crase
                  pra QUÊ?"
                </p>
                <ul className="mt-4 space-y-3 ms-4 list-disc text-muted-foreground">
                  <li>
                    Vou <strong>à</strong> Bahia (Volto <strong>da</strong>{" "}
                    Bahia) ✅
                  </li>
                  <li>
                    Vou <strong>a</strong> Brasília (Volto <strong>de</strong>{" "}
                    Brasília) ❌
                  </li>
                  <li>
                    Vou <strong>à</strong> Itália (Volto <strong>da</strong>{" "}
                    Itália) ✅
                  </li>
                  <li>
                    Vou <strong>a</strong> Portugal (Volto <strong>de</strong>{" "}
                    Portugal) ❌
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* SEÇÃO 4: EXCEÇÕES */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              variant="indigo"
              index={4}
              title="Exceções no Caso Geral"
              description="Quando a regra dos lugares recebe especificadores, a lógica muda."
            />

            <AlertBox
              tipo="warning"
              titulo="Lugares Especificados: A Regra 'Volto de' cai por terra"
            >
              <p className="text-sm mb-3 text-muted-foreground">
                Se um lugar (que normalmente pediria apenas 'de', sem artigo)
                vier <strong>especificado/determinado</strong>, ele ganha
                artigo, e consequentemente, a crase ocorre!
              </p>
              <div className="space-y-4">
                <div className="bg-background/80 p-4 rounded-lg flex items-start gap-4 shadow-sm border border-border/50">
                  <div className="text-xl mt-1">🌍</div>
                  <div>
                    <p className="font-bold text-foreground">Regra Normal:</p>
                    <p className="text-muted-foreground">
                      Vou <span className="text-red-500 font-bold">a</span> Roma
                      (Volto <strong>de</strong> Roma)
                    </p>
                  </div>
                </div>

                <div className="bg-indigo-500/10 p-4 rounded-lg flex items-start gap-4 shadow-sm border border-indigo-500/20">
                  <div className="text-xl mt-1">🏛️</div>
                  <div>
                    <p className="font-bold text-indigo-700 dark:text-indigo-400">
                      Regra com Especificador (Exceção):
                    </p>
                    <p className="text-muted-foreground">
                      Vou <span className="text-emerald-500 font-bold">à</span>{" "}
                      Roma <strong>dos Césares</strong>.
                    </p>
                    <p className="text-xs text-muted-foreground italic mt-2">
                      Nesse caso, a palavra 'Roma' foi especificada ('dos
                      Césares'), então ela passa a admitir artigo definido 'A' -
                      ocorrendo a crase.
                    </p>
                  </div>
                </div>
              </div>
            </AlertBox>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              variant="indigo"
              index={5}
              title="Resumo do Módulo 1"
              description="Revise os conceitos principais e assista à vídeo-aula."
            />

            <LessonTabs
              tabs={[
                {
                  id: "video",
                  label: "Vídeo Aula",
                  icon:LuPlay,
                  content:(
                    <div className="w-full flex flex-col items-center py-6">
                      <div className="w-full max-w-3xl">
                        <VideoModal
                          videoId="placeholder"
                          title="Crase sem Segredos: A Regra de Ouro"
                          duration="12:30"
                          thumbnail="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1073&auto=format&fit=crop"
                        />
                      </div>
                    </div>
                  ),
                },
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icon:LuBookOpen,
                  content:(
                    <ModuleSummaryCarouselNew
                      tituloAula="Crase"
                      materia="Língua Portuguesa"
                      profissao="Concurso Petrobras"
                      moduloNome="Conceitos Gerais"
                      images={[
                        {
                          title: "Mapa Mental: A + A = À",
                          type: "Mapa Mental",
                          placeholderColor: "bg-rose-900/10",
                        },
                        {
                          title: "Fluxograma: Troca por Masculino",
                          type: "Diagrama",
                          placeholderColor: "bg-blue-900/10",
                        },
                        {
                          title: "Infográfico: Regenta e Regido",
                          type: "Infográfico",
                          placeholderColor: "bg-indigo-900/10",
                        },
                        {
                          title: "Card Resumo: Acento Grave",
                          type: "Card",
                          placeholderColor: "bg-amber-900/10",
                        },
                      ]}
                    />
                  ),
                },
                {
                  id: "visual",
                  label: "Macete Visual",
                  icon:LuImage,
                  content:(
                    <div className="text-center p-8 space-y-6">
                      <h3 className="text-xl font-bold text-foreground">
                        O Macete do "AO"
                      </h3>
                      <div className="text-6xl my-6 animate-pulse">
                        🚻 ➡️ 🚻
                      </div>
                      <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                        "A crase é o espelho do masculino. Se ao trocar a dama
                        pelo cavalheiro o 'A' vira 'AO', o brilho da crase
                        aparece!"
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-left">
                        <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                          <h4 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                            Deu "AO"?
                          </h4>
                          <p className="text-xs text-muted-foreground italic">
                            Fui <strong>ao</strong> clubinho.
                          </p>
                          <p className="text-[10px] mt-2 font-medium text-emerald-700 dark:text-emerald-300">
                            ENTÃO: Fui <strong>à</strong> festinha. ✅
                          </p>
                        </div>
                        <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl">
                          <h4 className="text-sm font-bold text-rose-600 dark:text-rose-400 mb-2">
                            Deu "O"?
                          </h4>
                          <p className="text-xs text-muted-foreground italic">
                            Vi <strong>o</strong> clubinho.
                          </p>
                          <p className="text-[10px] mt-2 font-medium text-rose-700 dark:text-rose-300">
                            ENTÃO: Vi <strong>a</strong> festinha. ❌
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  id: "audio",
                  label: "Áudio Resumo",
                  icon:LuVolume2,
                  content:(
                    <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-rose-500/10 to-orange-500/10 rounded-xl border border-rose-500/20">
                      <div className="w-full max-w-md">
                        <MusicPlayerCard
                          audioUrl="https://cdn.pixabay.com/audio/2022/03/15/audio_c8c8a7343b.mp3"
                          titulo="O Rap da Crase"
                          artista="Prof. Antigravity"
                          capaUrl="https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000&auto=format&fit=crop"
                          lyrics={`
                                                        (Refrão)
                                                        É o A preposição com o A do artigo
                                                        Se os dois se encontram, o acento é amigo!
                                                        No masculino é 'AO', no feminino é craseado
                                                        Se liga no macete, não fica parado!
                                                        
                                                        (Verso)
                                                        Quem vai a e volta da, crase há!
                                                        Quem vai a e volta de, crase pra que?
                                                        Se o verbo é regente e pede o sinal
                                                        Coloca o acento e brilha no final!
                                                        `}
                        />
                      </div>
                    </div>
                  ),
                },
              ]}
              className="border-0 shadow-none p-0 max-w-none bg-transparent mb-0"
            />
          </section>

          <QuizInterativo
            titulo="Conceitos"
            icone="🧠"
            numero={6}
            questoes={quizM1}
            variant="indigo"
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          />
        </div>
      </TabsContent>

      {/* ─── MÓDULO 2: PROIBIÇÕES ─── */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={2}
            titulo="Proibições da Crase"
            descricao="Cenários onde o fenômeno da crase nunca ocorre. Onde o 'A' é apenas preposição."
            gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
          />

          {/* SEÇÃO 1: CONCEITUAÇÃO */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 text-center md:text-left">
            <ModuleSectionHeader
              variant="emerald"
              index={1}
              title="Conceituação: O Mapa das Proibições"
              description="A crase nunca ocorre quando a palavra seguinte não admite artigo feminino ou o 'a' é apenas preposição."
            />
            <p className="text-lg text-muted-foreground leading-relaxed">
              O fenômeno da crase exige <strong>dois elementos</strong>:
              preposição e artigo. Se a palavra regida (a que vem depois do "A")
              não admitir o artigo feminino "a" ou "as", a fusão é impossível. O
              "A" que sobra será obrigatoriamente apenas uma preposição (ou
              apenas um artigo, caso seja sujeito).
            </p>
          </section>

          {/* SEÇÃO 2: EXEMPLIFICAÇÃO */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              variant="emerald"
              index={2}
              title="Exemplificação: Situações de Proibição"
              description="Memorize as top 4 situações onde o uso do acento grave é erro fatal em provas!"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {[
                {
                  title: "Antes de Masculino",
                  desc: "Substantivos masculinos exigem artigo 'o', não 'a'.",
                  example: "Comprar a prazo.",
                },
                {
                  title: "Antes de Verbo",
                  desc: "Verbos não aceitam artigos. O 'a' será só preposição.",
                  example: "A partir de hoje.",
                },
                {
                  title: "Próximo a Pronomes",
                  desc: "Pessoais (ela), demonstrativos (esta), não aceitam artigo feminino.",
                  example: "Referi-me a ela.",
                },
                {
                  title: "Palavras Repetidas",
                  desc: "Expressões formadas por palavras repetidas não levam crase.",
                  example: "Dia a dia.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 p-6 rounded-2xl transition-all"
                >
                  <h4 className="font-bold text-red-600 mb-2 flex items-center gap-2">
                    <LuBan /> {item.title}
                  </h4>
                  <p className="text-sm opacity-80 mb-3">{item.desc}</p>
                  <p className="text-xs font-mono italic text-red-700 bg-red-100 dark:bg-red-900/30 rounded px-3 py-1.5 w-fit">
                    {item.example}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* SEÇÃO 3: DICAS */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 text-center md:text-left">
            <ModuleSectionHeader
              variant="emerald"
              index={3}
              title="Dicas de Ouro: Pegadinhas Clássicas"
              description="Cuidado com a pegadinha clássica do singular e plural na Cesgranrio."
            />
            <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-6 rounded-r-xl">
              <h4 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 mb-3 flex items-center gap-2">
                <LuAlertTriangle size={20} className="text-emerald-600" /> O
                Perigo do "A" Singular + Palavra Plural
              </h4>
              <p className="text-muted-foreground mb-4">
                Se você encontrar um{" "}
                <strong>
                  A isolado (singular) antes de uma palavra no plural
                </strong>
                , a crase é <strong className="text-rose-500">PROIBIDA</strong>.
                O "A" solitário é apenas uma preposição. Para ter crase, a
                preposição precisaria se fundir com o artigo plural "as"
                tornando-se "ÀS".
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="bg-white/50 dark:bg-black/20 p-4 border border-border/50 rounded-xl shadow-sm">
                  <p className="font-bold text-rose-500 flex items-center gap-2">
                    <LuBan size={16} /> ERRADO
                  </p>
                  <p className="font-mono text-sm mt-2">
                    Falava <strong>à pessoas</strong>.
                  </p>
                </div>
                <div className="bg-white/50 dark:bg-black/20 p-4 border border-border/50 rounded-xl shadow-sm">
                  <p className="font-bold text-emerald-500 flex items-center gap-2">
                    <LuCheck size={16} /> CORRETO
                  </p>
                  <p className="font-mono text-sm mt-2">
                    Falava <strong>a pessoas</strong>.<br />
                    Falava <strong>às pessoas</strong>.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SEÇÃO 4: EXCEÇÕES */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 text-center md:text-left">
            <ModuleSectionHeader
              variant="emerald"
              index={4}
              title="Exceções: Crase Antes de Masculino?"
              description="Nas proibições totais, há um único farol de esperança para o acento grave antes do masculino."
            />
            <AlertBox
              tipo="warning"
              titulo="Termos Subentendidos: À moda de / À maneira de"
            >
              <p className="text-sm mb-3">
                Quando a expressão <strong>"à moda de"</strong> ou{" "}
                <strong>"à maneira de"</strong> estiver subentendida, a crase
                ocorre mesmo diante de uma palavra masculina. Isso é muito
                testado em provas!
              </p>
              <ul className="space-y-4 mt-4 text-left">
                <li className="flex items-center gap-3">
                  <div className="bg-amber-500/20 p-2 rounded-lg">
                    <LuCheck className="text-amber-600" />
                  </div>
                  <div>
                    Fez um drible <strong>à</strong> Pelé. <br />
                    <span className="text-muted-foreground font-mono text-xs italic">
                      (Fez um drible à moda de Pelé)
                    </span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-amber-500/20 p-2 rounded-lg">
                    <LuCheck className="text-amber-600" />
                  </div>
                  <div>
                    Comeu um bife <strong>à</strong> Oswaldo Aranha. <br />
                    <span className="text-muted-foreground font-mono text-xs italic">
                      (Bife à maneira de)
                    </span>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-amber-500/20 p-2 rounded-lg">
                    <LuCheck className="text-amber-600" />
                  </div>
                  <div>
                    Usa sapatos <strong>à</strong> Luís XV.
                  </div>
                </li>
              </ul>
            </AlertBox>
          </section>

          <QuizInterativo
            titulo="Proibições"
            icone="🚫"
            numero={5}
            questoes={quizM2}
            variant="emerald"
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          />
        </div>
      </TabsContent>

      {/* ─── MÓDULO 3: FACULTATIVOS ─── */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={3}
            titulo="Crase Facultativa"
            descricao="Situações onde você escolhe usar ou não, sem erro gramatical."
            gradiente="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"
          />

          {/* SEÇÃO 1: CONCEITUAÇÃO */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 text-center md:text-left">
            <ModuleSectionHeader
              variant="violet"
              index={1}
              title="Conceituação: O Que É Ser Facultativo?"
              description="Quando tanto a preposição quanto o artigo são opcionais na construção da frase."
            />
            <p className="text-lg text-muted-foreground leading-relaxed">
              Dizer que a crase é <strong>facultativa</strong> significa que o
              uso do artigo feminino "a" antes daquela palavra é opcional. Como
              a preposição "a" exigida pelo verbo já está lá, se você não usar o
              artigo, não tem fusão (não tem crase). Se decidir usar o artigo,
              acontece a fusão (com crase). Ambas as formas são corretas para a
              banca.
            </p>
          </section>

          {/* SEÇÃO 2: EXEMPLIFICAÇÃO */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              variant="violet"
              index={2}
              title="Exemplificação: O Trio Facultativo"
              description="Existem apenas três casos principais onde a crase é opcional na norma culta."
            />

            <ContentAccordion
              titulo="Onde você manda na Crase"
              corIndicador="bg-violet-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Nomes Próprios Femininos",
                  icone: "👩",
                  conteudo:
                    "O uso de artigo antes de nome próprio para indicar intimidade é opcional. Ex: Entreguei o prêmio a Maria OU Entreguei o prêmio à Maria.",
                },
                {
                  titulo: "Pronomes Possessivos Femininos",
                  icone: "🙋‍♀️",
                  conteudo:
                    "Antes de 'minha', 'tua', 'sua', 'nossa', acompanhando um substantivo. Ex: Referi-me a sua tese OU Referi-me à sua tese.",
                },
                {
                  titulo: "Depois da preposição ATÉ",
                  icone: "🏁",
                  conteudo:
                    "Indicação de limite. A preposição 'a' vira opcional. Ex: Fui caminhar até a praia OU Fui caminhar até à praia.",
                },
              ]}
            />
          </section>

          {/* SEÇÃO 3: DICAS */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 text-center md:text-left">
            <ModuleSectionHeader
              variant="violet"
              index={3}
              title="Dicas de Ouro: Possessivo Oculto"
              description="Cuidado com os pronomes possessivos femininos que não acompanham substantivos explícitos!"
            />

            <div className="bg-violet-500/5 p-6 rounded-2xl border border-violet-500/20">
              <h4 className="font-bold text-violet-700 dark:text-violet-400 text-lg mb-4 flex items-center gap-2">
                <LuAlertTriangle /> Facultativo vs. Obrigatório
              </h4>
              <p className="text-muted-foreground mb-4">
                A crase só é <strong>FACULTATIVA</strong> se o possessivo vier
                acompanhando um substantivo explícito como "sua <u>mãe</u>" (o
                possessivo atua como adjetivo). <br />
                <br />
                Se o possessivo for <em>substantivo</em> (estiver sozinho,
                referindo-se a uma palavra já dita), a crase segue a regra geral
                e muitas vezes passa a ser <strong>OBRIGATÓRIA</strong>.
              </p>

              <div className="bg-background rounded-lg p-4 border border-border">
                <p className="text-sm italic text-muted-foreground mb-2">
                  Exemplo matador em provas da Cesgranrio:
                </p>
                <div className="space-y-4">
                  <p className="font-medium text-foreground text-lg">
                    "Obedeci <strong>à sua</strong> ordem e não{" "}
                    <strong>à minha</strong>."
                  </p>
                  <ul className="text-sm space-y-2 mt-4">
                    <li className="flex items-start gap-2">
                      <LuCheck className="text-emerald-500 mt-1 shrink-0" />
                      <div>
                        O primeiro <span className="font-bold">à sua</span> é{" "}
                        <strong>FACULTATIVO</strong>, pois acompanha a palavra
                        clara "ordem". Poderia ser "a sua".
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <LuCheck className="text-rose-500 mt-1 shrink-0" />
                      <div>
                        O segundo <span className="font-bold">à minha</span> é{" "}
                        <strong>OBRIGATÓRIO</strong>, pois substitui a palavra
                        ordem: "[...] e não à [ordem] minha".
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* SEÇÃO 4: EXCEÇÕES */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 text-center md:text-left">
            <ModuleSectionHeader
              variant="violet"
              index={4}
              title="Exceções Que Caem em Prova"
              description="Quando o facultativo perde o status de opcional e vira erro fatal."
            />

            <div className="grid md:grid-cols-2 gap-6">
              <AlertBox
                tipo="warning"
                titulo="Personalidades e Figuras Históricas"
              >
                <p className="text-sm mb-3 text-muted-foreground">
                  Nomes de personalidades históricas ou religiosas que não
                  admitem intimidade <strong>NÃO ACEITAM ARTIGO</strong>. Logo,
                  a crase é <strong>PROIBIDA</strong>.
                </p>
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2 text-red-700 dark:text-red-400 font-bold">
                    <LuBan /> ERRADO
                  </div>
                  <p className="font-mono text-sm opacity-80 mb-4 line-through">
                    Fez homenagem à Joana d'Arc.
                  </p>

                  <div className="flex items-center gap-2 mb-2 text-emerald-700 dark:text-emerald-400 font-bold">
                    <LuCheck /> CORRETO
                  </div>
                  <p className="font-mono text-sm">
                    Fez homenagem a Joana d'Arc.
                  </p>
                </div>
              </AlertBox>

              <AlertBox tipo="warning" titulo="Especificador no Nome Próprio">
                <p className="text-sm mb-3 text-muted-foreground">
                  Se um nome feminino vier especificado por um adjetivo ou
                  adjunto, o uso do artigo deixa de ser opcional e torna-se{" "}
                  <strong>OBRIGATÓRIO</strong>.
                </p>
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg h-full flex flex-col justify-center">
                  <p className="font-mono text-emerald-700 dark:text-emerald-400 text-sm leading-relaxed">
                    Refiro-me <strong>à Maria do Carmo</strong>.<br />
                    <br />
                    <span className="text-xs italic text-muted-foreground">
                      (Neste caso, a crase deixou de ser facultativa e passou a
                      ser OBRIGATÓRIA devido à especificação).
                    </span>
                  </p>
                </div>
              </AlertBox>
            </div>
          </section>

          <QuizInterativo
            titulo="Facultativos"
            icone="📝"
            numero={5}
            questoes={quizM3}
            variant="violet"
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </div>
      </TabsContent>

      {/* ─── MÓDULO 4: CASOS ESPECIAIS ─── */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={4}
            titulo="Casos Especiais"
            descricao="Horas, pronomes demonstrativos e as palavras Casa, Terra e Distância."
            gradiente="bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700"
          />

          {/* SEÇÃO 1: CONCEITUAÇÃO */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 text-center md:text-left">
            <ModuleSectionHeader
              variant="amber"
              index={1}
              title="Conceituação: O Mundo das Exceções"
              description="Algumas palavras e expressões ignoram a regra geral e possuem suas próprias leis para a ocorrência da crase."
            />
            <p className="text-lg text-muted-foreground leading-relaxed">
              O estudo dos Casos Especiais foca em um pequeno grupo de palavras
              que costuma aparecer frequentemente nas provas: nomes relacionados
              a horas, os pronomes demonstrativos (aquilo, aquela), e o famoso
              trio <strong>CASA, TERRA e DISTÂNCIA</strong>. O examinador sabe
              que essas palavras causam confusão e por isso elas despencam em
              concursos.
            </p>
          </section>

          {/* SEÇÃO 2: EXEMPLIFICAÇÃO */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-10">
            <ModuleSectionHeader
              variant="amber"
              index={2}
              title="Exemplificação: Casa, Terra e Distância"
              description="A regra de ouro aqui é a ESPECIFICAÇÃO. Sem especificador, nada de artigo (e nada de crase)."
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

          {/* SEÇÃO 3: DICAS */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-10">
            <ModuleSectionHeader
              variant="amber"
              index={3}
              title="Dicas de Ouro: Horas e os Pronomes Especiais"
              description="Macetes rápidos para acertar questões sobre tempo e sobre pronomes iniciados em 'A'."
            />
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-amber-500/5 p-6 rounded-2xl border border-amber-500/10 h-full flex flex-col justify-center">
                <h4 className="font-bold text-amber-700 dark:text-amber-400 mb-4 flex items-center gap-2">
                  <LuClock /> Crase antes de Horas Exatas
                </h4>
                <p className="text-sm text-foreground leading-relaxed mb-4">
                  Antes de horas marcadas no relógio, a regra é{" "}
                  <strong>usar a crase</strong>. <br />
                  <span className="italic mt-2 block">
                    "A reunião começa <strong>às</strong> 15h e termina{" "}
                    <strong>às</strong> 17h."
                  </span>
                </p>
                <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded text-xs text-amber-800 dark:text-amber-300 font-medium">
                  Cuidado: Se houver preposições antes (Desde, Até, Após, Para),
                  NÃO há crase. Ex: "Estou aqui <u>desde as</u> 8h".
                </div>
              </div>

              <div className="bg-amber-500/5 p-6 rounded-2xl border border-amber-500/10 h-full flex flex-col justify-center">
                <h4 className="font-bold text-amber-700 dark:text-amber-400 mb-4 flex items-center gap-2">
                  <LuUser /> Pronomes: Aquele / Aquela / Aquilo
                </h4>
                <p className="text-sm text-foreground leading-relaxed mb-4">
                  Esses pronomes já começam com a letra "A". Se o verbo anterior
                  pedir a preposição "A", elas vão colidir e gerar a crase no
                  próprio pronome.
                </p>
                <div className="bg-white/50 dark:bg-black/20 p-3 rounded border border-border/50 text-sm">
                  <p className="text-muted-foreground">
                    Quem entrega, entrega algo <strong>A</strong> alguém.
                  </p>
                  <p className="font-mono mt-2 text-primary">
                    Entreguei a carta <strong>A</strong> +{" "}
                    <strong>Aquela</strong> moça.
                  </p>
                  <p className="font-bold text-emerald-600 mt-1">
                    = Entreguei a carta <strong>Àquela</strong> moça.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SEÇÃO 4: EXCEÇÕES */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 text-center md:text-left">
            <ModuleSectionHeader
              variant="amber"
              index={4}
              title="Exceções Que Derrubam Candidatos"
              description="Quando a banca junta duas regras para confundir você."
            />

            <AlertBox tipo="warning" titulo="O Paralelismo Sintático">
              <p className="text-sm mb-3">
                Quando temos enumerações ou intervalos de horas (De ... a ... /
                Das ... às ...), o Paralelismo Sintático exige que os dois lados
                da balança sejam iguais.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-left">
                <div className="bg-rose-500/5 border-l-4 border-rose-500 p-4 rounded-r-lg">
                  <p className="font-bold text-rose-600 text-sm mb-2">
                    Desequilibrado (Erro)
                  </p>
                  <p className="font-mono text-sm leading-relaxed">
                    A aula vai{" "}
                    <span className="font-bold text-foreground">DE</span> 8h{" "}
                    <span className="font-bold bg-rose-200 dark:bg-rose-900/40 text-rose-700 rounded px-1">
                      às
                    </span>{" "}
                    12h.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 italic">
                    No primeiro lado só tem preposição (De), no segundo tem
                    preposição + artigo (às).
                  </p>
                </div>

                <div className="bg-emerald-500/5 border-l-4 border-emerald-500 p-4 rounded-r-lg">
                  <p className="font-bold text-emerald-600 text-sm mb-2">
                    Equilibrado (Acerto)
                  </p>
                  <p className="font-mono text-sm leading-relaxed">
                    A aula vai{" "}
                    <span className="font-bold text-foreground">DA</span> 1h{" "}
                    <span className="font-bold text-emerald-600">À</span> 5h.{" "}
                    <br />A aula vai{" "}
                    <span className="font-bold text-foreground">DAS</span> 8h{" "}
                    <span className="font-bold text-emerald-600">ÀS</span> 12h.
                    <br />A aula vai{" "}
                    <span className="font-bold text-foreground">
                      DE
                    </span> 8h{" "}
                    <span className="font-bold text-emerald-600">A</span> 12h.
                  </p>
                </div>
              </div>
            </AlertBox>
          </section>

          <QuizInterativo
            titulo="Especiais"
            icone="🎯"
            numero={5}
            questoes={quizM4}
            variant="amber"
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
          />
        </div>
      </TabsContent>

      {/* ─── MÓDULO 5: SIMULADO FINAL ─── */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={5}
            titulo="Domínio do Acento Grave"
            descricao="Consolidação total com desafios do nível da Petrobras."
            gradiente="bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700"
          />

          {/* SEÇÃO 1: CONCEITUAÇÃO (REVISÃO EXPRESS) */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 text-center md:text-left">
            <ModuleSectionHeader
              variant="rose"
              index={1}
              title="Conceituação: O Veredito Final"
              description="Uma revisão relâmpago de tudo o que vimos para você entrar no simulado com confiança total."
            />
            <p className="text-lg text-muted-foreground leading-relaxed">
              Você percorreu o caminho completo: desde a fusão básica (A+A),
              passando pelas barreiras intransponíveis (Proibições), pelos
              caminhos de escolha (Facultativos), e pelas armadilhas ocultas
              (Casos Especiais). Agora, o objetivo é um só:{" "}
              <strong>automação</strong>. Você deve olhar para a frase e o sinal
              de crase deve "brilhar" ou "apagar" instantaneamente em sua mente.
            </p>
          </section>

          {/* SEÇÃO 2: EXEMPLIFICAÇÃO (LABORATÓRIO DE GABARITO) */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-10">
            <ModuleSectionHeader
              variant="rose"
              index={2}
              title="Exemplificação: Desafios Petrobras"
              description="Veja como a banca Cesgranrio costuma misturar os temas em uma única questão."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-2xl">
                <h4 className="font-bold text-emerald-700 dark:text-emerald-400 mb-3 flex items-center gap-2">
                  <LuCheck /> Frase Comum
                </h4>
                <p className="text-sm italic text-foreground">
                  "Fui à praia ontem."
                </p>
                <p className="text-[10px] text-muted-foreground mt-2">
                  Uso básico: Substitua por "Fui ao clube".
                </p>
              </div>
              <div className="bg-rose-500/5 border border-rose-500/20 p-6 rounded-2xl">
                <h4 className="font-bold text-rose-700 dark:text-rose-400 mb-3 flex items-center gap-2">
                  <LuZap /> Desafio de Prova (Pegadinhas)
                </h4>
                <p className="text-sm italic text-foreground leading-relaxed">
                  "Referi-me àquilo que, a distância, parecia ser uma homenagem
                  a Joana d'Arc."
                </p>
                <div className="mt-4 p-3 bg-background/50 rounded-lg text-[10px] space-y-1">
                  <p>
                    • <strong>Àquilo</strong>: Correto (A + Aquilo).
                  </p>
                  <p>
                    • <strong>a distância</strong>: Correto (Indefinida não tem
                    crase).
                  </p>
                  <p>
                    • <strong>a Joana d'Arc</strong>: Correto (Figura histórica
                    não tem crase).
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SEÇÃO 3: DICAS (CHECKLIST DO APROVADO) */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-10">
            <ModuleSectionHeader
              variant="rose"
              index={3}
              title="Dicas de Ouro: O Checklist de 3 Segundos"
              description="Siga este roteiro mental antes de marcar sua alternativa na prova."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Quem rege?",
                  desc: "O termo anterior pede a preposição 'A'?",
                },
                {
                  step: "2",
                  title: "Quem segue?",
                  desc: "A palavra seguinte admite o artigo 'A'?",
                },
                {
                  step: "3",
                  title: "Macete 'AO'?",
                  desc: "Troque pelo masculino. Virou 'AO'? Crave a crase!",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="relative p-6 bg-rose-500/5 border border-rose-500/10 rounded-2xl"
                >
                  <span className="absolute -top-4 -left-4 w-10 h-10 bg-rose-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                    {item.step}
                  </span>
                  <h4 className="font-bold text-rose-700 dark:text-rose-400 mb-2 mt-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SEÇÃO 4: EXCEÇÕES (A ÚLTIMA TRINCHEIRA) */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              variant="rose"
              index={4}
              title="A Última Trincheira"
              description="O detalhe final sobre a palavra 'QUAL' que separa os 90% dos 100%."
            />
            <AlertBox tipo="info" titulo="Crase com Pronomes Relativos">
              <p className="text-sm">
                A crase antes de <strong>"Qual / Quais"</strong> depende
                exclusivamente da regência do verbo que vem depois. Se o verbo
                pedir "A", a crase é obrigatória.
              </p>
              <div className="mt-4 p-4 bg-background rounded-lg border border-border">
                <p className="text-sm">
                  "Esta é a regra <strong>à qual</strong> me referi."
                </p>
                <p className="text-[10px] text-muted-foreground mt-1">
                  (Quem se refere, se refere A algo. Referi-me A + A QUAL = À
                  QUAL).
                </p>
              </div>
            </AlertBox>
          </section>

          {/* REVISÃO MULTIMÍDIA */}
          <section className="bg-card rounded-2xl border border-border p-10 shadow-sm text-center space-y-8">
            <ModuleSectionHeader
              variant="rose"
              index={5}
              title="Recursos Finais de Revisão"
              description="Mapas mentais e áudios para consolidar antes do simulado."
            />

            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Mapa Mental",
                  icon:LuBookOpen,
                  content:(
                    <ModuleSummaryCarouselNew
                      moduloNome="Simulado Final"
                      tituloAula="Crase"
                      materia="Língua Portuguesa"
                      images={[
                        {
                          title: "Crase: O Mapa do Tesouro",
                          type: "Esquema",
                          placeholderColor: "bg-rose-900/10",
                          imageUrl:
                            "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=1000&auto=format&fit=crop",
                        },
                        {
                          title: "Resumo: Proibições",
                          type: "Tabela",
                          placeholderColor: "bg-orange-900/10",
                          imageUrl:
                            "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1000&auto=format&fit=crop",
                        },
                        {
                          title: "Resumo: Facultativos",
                          type: "Dica",
                          placeholderColor: "bg-indigo-900/10",
                          imageUrl:
                            "https://images.unsplash.com/photo-1454165833267-028cc21e78e2?q=80&w=1000&auto=format&fit=crop",
                        },
                      ]}
                    />
                  ),
                },
                {
                  id: "audio",
                  label: "Áudio Resumo",
                  icon:LuMusic,
                  content:(
                    <MusicPlayerCard
                      audioUrl="#"
                      titulo="Fundamentos da Crase"
                      artista="Prof. Antigravity"
                      capaUrl="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1170&auto=format&fit=crop"
                      lyrics={`O acento grave não é brincadeira...\nCom ele você vai pela vida inteira...\nBasta saber se o 'A' é dobrado...\nE o seu sucesso está garantido e selado!\n\nProibido no macho, no verbo e no plural isolado.\nFacultativo na dona, na minha e no até lado a lado.\nNo 'qual' e no 'aquele' o segredo é o regente.\nCrase na hora e no 'à moda' do oriente!`}
                    />
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            titulo="Simulado Final: Crase"
            icone="🏆"
            numero={6}
            questoes={quizFinal}
            variant="rose"
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
          />

          {/* CARD DE CONCLUSÃO MANUAL */}
          <section className="mt-12 mb-8">
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/10 dark:to-rose-900/5 border border-rose-100 dark:border-rose-800/30 rounded-2xl p-10 text-center space-y-6 shadow-sm max-w-4xl mx-auto">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold flex items-center justify-center gap-3 text-foreground">
                  <LuBookOpen className="text-rose-500 text-3xl" /> Conclusão da
                  Aula
                </h3>
                <p className="text-muted-foreground text-lg">
                  Parabéns! Você completou todos os módulos de Crase. Clique
                  abaixo para finalizar.
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
                Concluir Aula de Crase
              </Button>
            </div>
          </section>
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}












