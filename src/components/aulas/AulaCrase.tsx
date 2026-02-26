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
} from "./shared";

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
      'Crase é a contração da preposição "a" exigida pelo termo regente com o artigo "a" (ou pronomes demonstrativos) do termo regido.',
  },
  {
    id: 2,
    pergunta:
      'Qual a "Regra de Ouro" para identificar a crase diante de palavras femininas?',
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
      { label: "C", valor: "Horas" },
      { label: "D", valor: "Locuções adverbiais" },
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

const QUIZ_FINAL_POOL: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "Assinale a alternativa que exige crase:",
    opcoes: [
      { label: "A", valor: "Saímos as pressas." },
      { label: "B", valor: "Ficamos cara a cara." },
      { label: "C", valor: "Escrevi a lápis." },
      { label: "D", valor: "Andamos a cavalo." },
    ],
    correta: "A",
    explicacao:
      '"Às pressas" é uma locução adverbial feminina de modo. Locuções femininas (à noite, à direita, às vezes) levam crase.',
  },
  {
    id: 2,
    pergunta: 'Sobre a palavra "CASA", quando ocorre a crase?',
    opcoes: [
      { label: "A", valor: "Sempre que significar lar" },
      { label: "B", valor: "Nunca ocorre" },
      {
        label: "C",
        valor: 'Apenas quando a palavra "casa" estiver especificada',
      },
      { label: "D", valor: "Apenas no plural" },
    ],
    correta: "C",
    explicacao:
      '"Cheguei a casa" (sem crase, sentido de lar). "Cheguei à casa dos meus pais" (com crase, pois está especificada).',
  },
  {
    id: 3,
    pergunta:
      'Em "Chegamos à uma hora" vs "Daqui a uma hora", qual a diferença?',
    opcoes: [
      { label: "A", valor: "Nenhuma, ambos errados" },
      {
        label: "B",
        valor: "O primeiro indica hora exata (relógio), o segundo tempo futuro",
      },
      {
        label: "C",
        valor: "O primeiro é tempo decorrido, o segundo tempo exato",
      },
      { label: "D", valor: "Ambos deveriam ter crase" },
    ],
    correta: "B",
    explicacao:
      'Indicação de horas exatas leva crase ("Chegamos à uma hora" = 13h ou 01h). Tempo futuro ou distância usa apenas preposição "a" ("Daqui a uma hora").',
  },
  {
    id: 4,
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
      'A crase pode ocorrer com os pronomes demonstrativos Aquele(s), Aquela(s), Aquilo. Se o verbo pede "A" e a palavra seguinte começa com "A", funde-se: Àquele.',
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
    { id: "modulo-1", label: "Módulo 1", titulo: "Conceito e Regra Geral" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Proibições e Facultativos" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Casos Especiais" },
  ];

  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(),
  );
  const [quizM1, setQuizM1] = useState<QuizQuestion[]>([]);
  const [quizM2, setQuizM2] = useState<QuizQuestion[]>([]);
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
      setQuizM1(getRandomQuestions(QUIZ_M1_POOL, 4));
      setQuizM2(getRandomQuestions(QUIZ_M2_POOL, 4));
      setQuizFinal(getRandomQuestions(QUIZ_FINAL_POOL, 4));
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

  const isModuleUnlocked = (index: number) => {
    if (isCompleted) return true;
    if (index === 0) return true;
    return completedModules.has(MODULE_DEFS[index - 1].id);
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
            gradiente="bg-gradient-to-br from-pink-600 via-rose-600 to-red-700"
          />

          {/* SEÇÃO 1: O QUE É CRASE */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-14 h-14 rounded-full bg-pink-500/20 flex items-center justify-center text-3xl font-bold text-pink-700 dark:text-pink-400">
                1
              </span>
              Crase não é acento!
            </h2>
            <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
              <p>
                Muita gente confunde, mas <strong>Crase</strong> é o nome do
                fenômeno de fusão de duas vogais iguais. O acento que marca essa
                fusão chama-se <strong>acento grave (`)</strong>.
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
                    (Exige: Vou A...)
                  </div>
                </div>
                <div className="flex items-center justify-center text-2xl font-bold text-muted-foreground">
                  +
                </div>
                <div className="bg-muted/30 p-6 rounded-xl text-center border border-border/50">
                  <div className="text-4xl font-bold mb-2 text-rose-500">A</div>
                  <div className="text-xs uppercase tracking-wider font-bold text-muted-foreground">
                    Artigo
                  </div>
                  <div className="text-xs text-muted-foreground/60 mt-1">
                    (Admite: ...A praia)
                  </div>
                </div>
                <div className="col-span-1 md:col-span-3 bg-gradient-to-r from-indigo-500/10 to-rose-500/10 p-6 rounded-xl text-center border border-indigo-500/20 flex flex-col items-center justify-center">
                  <div className="text-6xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-rose-600">
                    = À
                  </div>
                  <div className="text-sm font-bold text-foreground">
                    A fusão perfeita!
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SEÇÃO 2: REGRA DE OURO */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-14 h-14 rounded-full bg-indigo-500/20 flex items-center justify-center text-3xl font-bold text-indigo-700 dark:text-indigo-400">
                2
              </span>
              Regra de Ouro: A Troca Mágica
            </h2>
            <p className="text-muted-foreground text-lg">
              Na dúvida se tem crase antes de uma palavra feminina, troque-a por
              uma masculina correspondente.
            </p>

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <ComparisonSide
                tipo="correct"
                titulo="Deu AO = Tem Crase"
                items={[
                  "Vou ao parque -> Vou à praça",
                  "Assisti ao filme -> Assisti à peça",
                  "Obedeci ao pai -> Obedeci à mãe",
                ]}
              />
              <ComparisonSide
                tipo="incorrect"
                titulo="Deu O = Sem Crase"
                items={[
                  "Visitei o parque -> Visitei a praça",
                  "Comi o bolo -> Comi a torta",
                  "Conheci o aluno -> Conheci a aluna",
                ]}
              />
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <h2 className="text-3xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-14 h-14 rounded-full bg-rose-500/20 flex items-center justify-center text-3xl font-bold text-rose-700 dark:text-rose-400">
                3
              </span>
              Resumo do Módulo 1
            </h2>

            <LessonTabs
              tabs={[
                {
                  id: "video",
                  label: "Vídeo Aula",
                  icon: LuPlay,
                  content: (
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
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      tituloAula="Crase"
                      materia="Português"
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
                  icon: LuImage,
                  content: (
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
                  icon: LuVolume2,
                  content: (
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
            titulo="Quiz de Fixação: Conceitos"
            icone="🧠"
            numero={4}
            questoes={quizM1}
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          />
        </div>
      </TabsContent>

      {/* ─── MÓDULO 2: PROIBIÇÕES E FACULTATIVOS ─── */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={2}
            titulo="Proibições e Casos Facultativos"
            descricao="Onde a crase é proibida e onde você escolhe usar."
            gradiente="bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-600"
          />

          {/* SEÇÃO 1: OS PROIBIDOS */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-14 h-14 rounded-full bg-red-500/20 flex items-center justify-center text-3xl font-bold text-red-700 dark:text-red-400">
                1
              </span>
              Mapa das Proibições
            </h2>
            <p className="text-muted-foreground text-lg">
              Nunca use crase nestes casos. É erro fatal!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900 p-6 rounded-xl flex items-start gap-4">
                <LuBan className="text-red-500 mt-1 shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-foreground">
                    Antes de Masculino
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Andar a pé, andar a cavalo, bife a cavalo, escrever a lápis.
                  </p>
                </div>
              </div>
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900 p-6 rounded-xl flex items-start gap-4">
                <LuBan className="text-red-500 mt-1 shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-foreground">Antes de Verbo</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Estou disposto a ajudar, a partir de hoje, a fazer.
                  </p>
                </div>
              </div>
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900 p-6 rounded-xl flex items-start gap-4">
                <LuBan className="text-red-500 mt-1 shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-foreground">
                    Pronomes Pessoais/Tratamento
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Referi-me a ela, pedi a você, falei a Vossa Senhoria.
                    (Exceção: Senhora/Senhorita levam crase).
                  </p>
                </div>
              </div>
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900 p-6 rounded-xl flex items-start gap-4">
                <LuBan className="text-red-500 mt-1 shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-foreground">
                    Palavras Repetidas
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Cara a cara, gota a gota, ponta a ponta.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SEÇÃO 2: OS FACULTATIVOS */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center text-3xl font-bold text-green-700 dark:text-green-400">
                2
              </span>
              Casos Facultativos (Opcionais)
            </h2>
            <p className="text-muted-foreground text-lg">
              Aqui você escolhe. Tanto faz colocar ou não, a gramática aceita
              ambos.
            </p>

            <CardCarousel
              titulo="Casos Facultativos"
              subtitulo="Situações onde você escolhe se usa ou não a crase."
              cards={[
                {
                  icone: <LuUser className="text-xl text-blue-500" />,
                  titulo: "Nomes de Mulheres",
                  descricao: (
                    <div className="space-y-2">
                      <p>
                        Antes de nomes próprios femininos, o artigo "a" é
                        opcional.
                      </p>
                      <div className="text-xs bg-muted p-2 rounded border-l-2 border-blue-400">
                        <p>
                          ✅ Entreguei <strong>a</strong> Joana.
                        </p>
                        <p>
                          ✅ Entreguei <strong>à</strong> Joana.
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Nota: Para figuras públicas ou sem intimidade,
                        prefere-se sem o artigo (logo, sem crase).
                      </p>
                    </div>
                  ),
                  corFundo: "bg-blue-100 dark:bg-blue-900/30",
                },
                {
                  icone: <LuHeart className="text-xl text-pink-500" />,
                  titulo: "Pronomes Possessivos",
                  descricao: (
                    <div className="space-y-2">
                      <p>
                        Antes de pronomes possessivos femininos (minha, tua,
                        sua...), o artigo é facultativo.
                      </p>
                      <div className="text-xs bg-muted p-2 rounded border-l-2 border-pink-400">
                        <p>
                          ✅ Refiro-me <strong>a</strong> minha amiga.
                        </p>
                        <p>
                          ✅ Refiro-me <strong>à</strong> minha amiga.
                        </p>
                      </div>
                    </div>
                  ),
                  corFundo: "bg-pink-100 dark:bg-pink-900/30",
                },
                {
                  icone: <LuArrowRight className="text-xl text-amber-500" />,
                  titulo: "Após 'Até'",
                  descricao: (
                    <div className="space-y-2">
                      <p>
                        Depois da preposição "até", o uso da preposição "a" é
                        opcional.
                      </p>
                      <div className="text-xs bg-muted p-2 rounded border-l-2 border-amber-400">
                        <p>
                          ✅ Fui até <strong>a</strong> praia.
                        </p>
                        <p>
                          ✅ Fui até <strong>à</strong> praia.
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Ambas as formas são aceitas na norma culta.
                      </p>
                    </div>
                  ),
                  corFundo: "bg-amber-100 dark:bg-amber-900/30",
                },
              ]}
            />
          </section>
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-14 h-14 rounded-full bg-amber-500/20 flex items-center justify-center text-3xl font-bold text-amber-700 dark:text-amber-400">
                3
              </span>
              Resumo do Módulo 2
            </h2>

            <LessonTabs
              tabs={[
                {
                  id: "video",
                  label: "Vídeo Aula",
                  icon: LuPlayCircle,
                  content: (
                    <div className="w-full flex flex-col items-center py-6">
                      <div className="w-full max-w-3xl">
                        <VideoModal
                          videoId="placeholder"
                          title="Crase Proibida e Facultativa"
                          duration="09:15"
                          thumbnail="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1074&auto=format&fit=crop"
                        />
                      </div>
                    </div>
                  ),
                },
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      tituloAula="Crase"
                      materia="Português"
                      profissao="Concurso Petrobras"
                      moduloNome="Proibições e Facultativos"
                      images={[
                        {
                          title: "Mapa Mental: Os Proibidos",
                          type: "Mapa Mental",
                          placeholderColor: "bg-red-900/10",
                        },
                        {
                          title: "Diagrama: Casos Facultativos",
                          type: "Diagrama",
                          placeholderColor: "bg-green-900/10",
                        },
                        {
                          title: "Infográfico: Pronomes que Rejeitam",
                          type: "Infográfico",
                          placeholderColor: "bg-amber-900/10",
                        },
                        {
                          title: "Card Resumo: Dica da Senhora",
                          type: "Card",
                          placeholderColor: "bg-blue-900/10",
                        },
                      ]}
                    />
                  ),
                },
                {
                  id: "macete",
                  label: "Macete",
                  icon: LuBrain,
                  content: (
                    <div className="text-center p-8 bg-gradient-to-br from-red-500/5 to-amber-500/5 rounded-2xl border border-red-500/10">
                      <h3 className="text-xl font-bold text-foreground mb-4">
                        O Quadrado Proibido
                      </h3>
                      <div className="text-6xl my-8 animate-bounce">
                        🚫 🏃 🚫
                      </div>
                      <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                        "Crase antes de verbo é erro soberbo! Antes de
                        masculino, é desatino!"
                      </p>
                    </div>
                  ),
                },
                {
                  id: "audio",
                  label: "Áudio Resumo",
                  icon: LuMusic,
                  content: (
                    <div className="w-full flex justify-center py-4">
                      <div className="w-full max-w-md">
                        <MusicPlayerCard
                          audioUrl="#"
                          titulo="As Proibições da Crase"
                          artista="Prof. André"
                          capaUrl="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1074&auto=format&fit=crop"
                          lyrics={`
                                                            (Refrão)
                                                            Antes de homem, nunca vai sinal
                                                            Antes de verbo, é erro fatal
                                                            Se a palavra repete, deixe pra lá
                                                            Crase proibida não pode brilhar!
                                                            `}
                        />
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            titulo="Quiz de Fixação: Proibições"
            icone="🛡️"
            numero={4}
            questoes={quizM2}
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          />
        </div>
      </TabsContent>

      {/* ─── MÓDULO 3: CASOS ESPECIAIS E PRÁTICA ─── */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={3}
            titulo="Casos Especiais e Prática"
            descricao="Horas, Lugares, Casa, Terra e Pronomes Demonstrativos."
            gradiente="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"
          />

          {/* SEÇÃO 1: LUGARES E HORAS */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-14 h-14 rounded-full bg-violet-500/20 flex items-center justify-center text-3xl font-bold text-violet-700 dark:text-violet-400">
                1
              </span>
              Lugares e Horas
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <LuMapPin className="text-violet-500" /> Lugares: O Macete do
                  "Vou A, Volto..."
                </h3>
                <div className="bg-muted p-4 rounded-xl border-l-4 border-violet-500 space-y-2">
                  <p>
                    Quem vai <strong>A</strong> e volta <strong>DA</strong>,
                    crase <strong>HÁ</strong>.
                  </p>
                  <p>
                    Quem vai <strong>A</strong> e volta <strong>DE</strong>,
                    crase <strong>PRA QUÊ?</strong>
                  </p>
                </div>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• Vou à Bahia (Volto da Bahia) ✅</li>
                  <li>• Vou a Roma (Volto de Roma) ❌</li>
                  <li>
                    • Vou à Roma antiga (Volto da Roma antiga - Especificado!)
                    ✅
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <span className="text-lg">Clock</span> Horas
                </h3>
                <p className="text-muted-foreground">
                  Horas exatas (relógio) sempre levam crase.
                </p>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center gap-2 bg-green-500/10 p-2 rounded text-sm">
                    ✅ A reunião é às 14h.
                  </div>
                  <div className="flex items-center gap-2 bg-green-500/10 p-2 rounded text-sm">
                    ✅ Chegamos à uma hora da tarde.
                  </div>
                  <div className="flex items-center gap-2 bg-red-500/10 p-2 rounded text-sm">
                    ❌ Daqui a duas horas (Futuro/Tempo decorrido = sem crase).
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SEÇÃO 2: CASA, TERRA E DISTÂNCIA */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-14 h-14 rounded-full bg-violet-500/20 flex items-center justify-center text-3xl font-bold text-violet-700 dark:text-violet-400">
                2
              </span>
              Caso Especial: Casa, Terra e Distância
            </h2>
            <p className="text-muted-foreground">
              Regra geral: Se não estiver especificado,{" "}
              <strong>não tem crase</strong>. Se especificar,{" "}
              <strong>tem crase</strong>.
            </p>

            <CardCarousel
              titulo="Casos Especiais"
              subtitulo="Detalhes que fazem a diferença em provas."
              cards={[
                {
                  icone: <LuBuilding className="text-xl text-indigo-500" />,
                  titulo: "Casa (Lar)",
                  descricao: (
                    <div className="space-y-2">
                      <p>
                        Se significar "o próprio lar" e não estiver
                        especificada: <strong>Sem Crase</strong> (Casa sem
                        dono).
                      </p>
                      <div className="text-xs bg-muted p-2 rounded border-l-2 border-indigo-400">
                        <p>
                          ❌ Cheguei <strong>a</strong> casa cansado.
                        </p>
                        <p>
                          ✅ Cheguei <strong>à</strong> casa{" "}
                          <em>dos meus pais</em>.
                        </p>
                      </div>
                    </div>
                  ),
                  corFundo: "bg-indigo-100 dark:bg-indigo-900/30",
                },
                {
                  icone: <LuAnchor className="text-xl text-teal-500" />,
                  titulo: "Terra (Chão vs Planeta)",
                  descricao: (
                    <div className="space-y-2">
                      <p>
                        Oposto de bordo (terra firme):{" "}
                        <strong>Sem Crase</strong>. Planeta ou Local Específico:{" "}
                        <strong>Com Crase</strong>.
                      </p>
                      <div className="text-xs bg-muted p-2 rounded border-l-2 border-teal-400">
                        <p>
                          ❌ O marinheiro desceu <strong>a</strong> terra.
                        </p>
                        <p>
                          ✅ Os astronautas voltaram <strong>à</strong> Terra.
                        </p>
                        <p>
                          ✅ Voltei <strong>à</strong> terra <em>onde nasci</em>
                          .
                        </p>
                      </div>
                    </div>
                  ),
                  corFundo: "bg-teal-100 dark:bg-teal-900/30",
                },
                {
                  icone: <LuRuler className="text-xl text-purple-500" />,
                  titulo: "Distância",
                  descricao: (
                    <div className="space-y-2">
                      <p>
                        Distância não especificada: <strong>Sem Crase</strong>.
                        Distância determinada: <strong>Com Crase</strong>.
                      </p>
                      <div className="text-xs bg-muted p-2 rounded border-l-2 border-purple-400">
                        <p>
                          ❌ O leão ficou <strong>a</strong> distância.
                        </p>
                        <p>
                          ✅ O leão ficou <strong>à</strong> distância{" "}
                          <em>de 10 metros</em>.
                        </p>
                      </div>
                    </div>
                  ),
                  corFundo: "bg-purple-100 dark:bg-purple-900/30",
                },
              ]}
            />
            <p className="text-xs text-muted-foreground">
              *Nota: Há divergências entre gramáticos, mas para concursos, a
              regra da especificação prevalece.
            </p>
          </section>

          {/* CARDS COMPARATIVOS FINAIS */}
          <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 rounded-2xl p-8 text-white relative overflow-hidden">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Resumo Final: Crase com Pronomes Demonstrativos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center items-center justify-items-center">
              <div>
                <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2">
                  A + AQUELE
                </div>
                <p className="text-lg">= ÀQUELE</p>
                <p className="text-sm opacity-80 mt-2">
                  Refiro-me àquele rapaz (a + aquele).
                </p>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2">
                  A + AQUILO
                </div>
                <p className="text-lg">= ÀQUILO</p>
                <p className="text-sm opacity-80 mt-2">
                  Não dê importância àquilo (a + aquilo).
                </p>
              </div>
            </div>
          </div>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="w-14 h-14 rounded-full bg-violet-500/20 flex items-center justify-center text-3xl font-bold text-violet-700 dark:text-violet-400">
                3
              </span>
              Resumo do Módulo 3
            </h2>

            <LessonTabs
              tabs={[
                {
                  id: "video",
                  label: "Vídeo Aula",
                  icon: LuPlayCircle,
                  content: (
                    <div className="w-full flex flex-col items-center py-6">
                      <div className="w-full max-w-3xl">
                        <VideoModal
                          videoId="placeholder"
                          title="Casos Especiais: Dona Crase em Detalhes"
                          duration="11:45"
                          thumbnail="https://images.unsplash.com/photo-1544640808-32ca72ac7f37?q=80&w=1074&auto=format&fit=crop"
                        />
                      </div>
                    </div>
                  ),
                },
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      tituloAula="Crase"
                      materia="Português"
                      profissao="Concurso Petrobras"
                      moduloNome="Casos Especiais"
                      images={[
                        {
                          title: "Mapa Mental: Casa e Terra",
                          type: "Mapa Mental",
                          placeholderColor: "bg-violet-900/10",
                        },
                        {
                          title: "Infográfico: Horas Exatas",
                          type: "Infográfico",
                          placeholderColor: "bg-indigo-900/10",
                        },
                        {
                          title: "Diagrama: Àquele e Àquilo",
                          type: "Diagrama",
                          placeholderColor: "bg-purple-900/10",
                        },
                        {
                          title: "Card Resumo: Distância Específica",
                          type: "Card",
                          placeholderColor: "bg-blue-900/10",
                        },
                      ]}
                    />
                  ),
                },
                {
                  id: "macete",
                  label: "Macete",
                  icon: LuBrain,
                  content: (
                    <div className="text-center p-8 bg-gradient-to-br from-violet-500/5 to-purple-500/5 rounded-2xl border border-violet-500/10">
                      <h3 className="text-xl font-bold text-foreground mb-4">
                        O Macete do Lugar
                      </h3>
                      <div className="text-6xl my-8 animate-pulse">
                        🌍 ✈️ 🌍
                      </div>
                      <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                        "Vou A, Volto DA: Crase HÁ! Vou A, Volto DE: Crase PRA
                        QUÊ?"
                      </p>
                    </div>
                  ),
                },
                {
                  id: "audio",
                  label: "Áudio Resumo",
                  icon: LuMusic,
                  content: (
                    <div className="w-full flex justify-center py-4">
                      <div className="w-full max-w-md">
                        <MusicPlayerCard
                          audioUrl="#"
                          titulo="Casos Especiais da Crase"
                          artista="Prof. André"
                          capaUrl="https://images.unsplash.com/photo-1544640808-32ca72ac7f37?q=80&w=1074&auto=format&fit=crop"
                          lyrics={`
                                                            (Refrão)
                                                            Vou a, volto de, pra quê crasear?
                                                            Vou a, volto da, a crase está lá!
                                                            Nas horas exatas, o acento é certeiro
                                                            Domine o detalhe e ganhe o mundo inteiro!
                                                            `}
                        />
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            titulo="Desafio Final: Casos Especiais"
            icone="🏆"
            numero={4}
            questoes={quizFinal}
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}

// ── Shared Components Exports ─────────────────────────────────────────────
// (Assuming shared.tsx exports are used directly)
