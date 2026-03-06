"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import {
  LuCheck,
  LuTrophy,
  LuTarget,
  LuLayers,
  LuTriangleAlert,
  LuBookOpen,
  LuLock,
  LuArrowRight,
  LuShuffle,
  LuPlay,
  LuImage,
  LuVolume2,
  LuTimer,
  LuArrowLeft,
} from "react-icons/lu";

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
  AulaProps,
  StickyModuleNav,
  AulaTemplate,
  ModuleSectionHeader,
} from "../shared";

import { LuLightbulb } from "react-icons/lu";
import { progressService } from "@/lib/services/progress";

// ── Tipos e Configurações ──────────────────────────────────────────────────

interface Challenge {
  id: number;
  original: string;
  reescrita: string;
  status: "correto" | "errado";
  explicacao: string;
}

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", titulo: "Fundamentos" },
  { id: "modulo-2", label: "Módulo 2", titulo: "Técnicas" },
  { id: "modulo-3", label: "Módulo 3", titulo: "Pontuação e Sentido" },
  { id: "modulo-4", label: "Módulo 4", titulo: "Armadilhas Avançadas" },
  { id: "modulo-5", label: "Módulo 5", titulo: "Laboratório de Gabarito" },
];

const PROGRESS_PER_MODULE = Math.floor(100 / MODULE_DEFS.length);

// ── Questões do Quiz ───────────────────────────────────────────────────────

const QUIZ_M1_POOL: QuizQuestion[] = [
  {
    id: 101,
    pergunta:
      "Segundo a Cesgranrio, o que é essencial para que uma reescritura seja considerada correta?",
    opcoes: [
      {
        label: "A",
        valor:
          "Apenas a manutenção do sentido original, mesmo com erros gramaticais.",
      },
      {
        label: "B",
        valor:
          "Apenas a correção gramatical, mesmo que o sentido seja alterado.",
      },
      {
        label: "C",
        valor:
          "A manutenção do sentido original E a correção gramatical (norma culta).",
      },
      { label: "D", valor: "O uso de palavras difíceis e rebuscadas." },
    ],
    correta: "C",
    explicacao:
      "A reescritura exige o binômio Semântica + Gramática. Não adianta estar gramaticalmente correto se mudou o que o autor disse.",
  },
  {
    id: 102,
    pergunta:
      "A substituição de 'embora' por 'apesar de' exige qual ajuste na oração?",
    opcoes: [
      { label: "A", valor: "Nenhum ajuste, são sinônimos perfeitos." },
      {
        label: "B",
        valor:
          "O verbo deve passar do subjuntivo para o infinitivo (ou substantivação).",
      },
      { label: "C", valor: "O verbo deve passar para o futuro do pretérito." },
      { label: "D", valor: "A frase deve ser colocada entre aspas." },
    ],
    correta: "B",
    explicacao:
      "'Embora' é conjunção (pede verbo conjugado), 'apesar de' é locução prepositiva (pede infinitivo). Ex: Embora chovesse -> Apesar de chover.",
  },
  {
    id: 103,
    pergunta:
      "Identifique a alteração de sentido na reescrita: 'Talvez ele venha' por 'Certamente ele virá'.",
    opcoes: [
      { label: "A", valor: "Nenhuma, ambas expressam futuro." },
      {
        label: "B",
        valor: "Mudança de hipótese/dúvida para certeza/afirmação.",
      },
      { label: "C", valor: "Apenas mudança de tempo verbal." },
      { label: "D", valor: "Mudança de voz passiva para ativa." },
    ],
    correta: "B",
    explicacao:
      "Advérbios de dúvida ('talvez') e de afirmação ('certamente') alteram a modalização da frase, mudando o sentido original.",
  },
  {
    id: 104,
    pergunta:
      "Na reescritura, a omissão de uma vírgula explicativa pode causar:",
    opcoes: [
      { label: "A", valor: "Apenas um erro ortográfico leve." },
      {
        label: "B",
        valor:
          "A transformação de uma explicação em restrição (mudança de sentido).",
      },
      { label: "C", valor: "Melhora na fluidez do texto." },
      {
        label: "D",
        valor: "Nenhuma alteração, a vírgula é sempre facultativa.",
      },
    ],
    correta: "B",
    explicacao:
      "Vírgulas em orações adjetivas definem se o termo é explicativo (com vírgula) ou restritivo (sem vírgula). Retirá-las muda o sentido.",
  },
];

const QUIZ_M2_POOL: QuizQuestion[] = [
  {
    id: 201,
    pergunta:
      "Ao passar 'O técnico avaliou os riscos' para a voz passiva, temos:",
    opcoes: [
      { label: "A", valor: "Os riscos foram avaliados pelo técnico." },
      { label: "B", valor: "Avaliaram-se os riscos pelo técnico." },
      { label: "C", valor: "O técnico fora avaliar os riscos." },
      { label: "D", valor: "Riscos são avaliados pelo técnico." },
    ],
    correta: "A",
    explicacao:
      "Voz ativa (passado) -> Voz passiva analítica (ser no passado + particípio). O objeto direto vira sujeito paciente.",
  },
  {
    id: 202,
    pergunta:
      "Qual conectivo substitui 'Contanto que' mantendo o sentido condicional?",
    opcoes: [
      { label: "A", valor: "Embora" },
      { label: "B", valor: "Desde que" },
      { label: "C", valor: "Visto que" },
      { label: "D", valor: "Todavia" },
    ],
    correta: "B",
    explicacao:
      "'Contanto que' e 'Desde que' são conjunções condicionais. 'Embora' é concessiva, 'Visto que' é causal e 'Todavia' é adversativa.",
  },
  {
    id: 203,
    pergunta:
      "A reescrita 'É necessário que trabalhemos' para 'É necessária a nossa jornada' é um exemplo de:",
    opcoes: [
      { label: "A", valor: "Voz passiva" },
      { label: "B", valor: "Nominalização (oração vira substantivo)" },
      { label: "C", valor: "Discurso indireto" },
      { label: "D", valor: "Pleonasmo" },
    ],
    correta: "B",
    explicacao:
      "Transformar o verbo 'trabalhar' no substantivo 'jornada' (ou trabalho) é o processo de nominalização, comum em reescritas formais.",
  },
  {
    id: 204,
    pergunta:
      "No discurso indireto, a frase 'Eu irei amanhã', disse ele, torna-se:",
    opcoes: [
      { label: "A", valor: "Ele disse que iria no dia seguinte." },
      { label: "B", valor: "Ele disse que eu irei amanhã." },
      { label: "C", valor: "Ele dirá que foi amanhã." },
      { label: "D", valor: "Amanhã ele disse que iria." },
    ],
    correta: "A",
    explicacao:
      "No discurso indireto, a 1ª pessoa vira 3ª, o futuro do presente vira futuro do pretérito e referências temporais ('amanhã') são ajustadas.",
  },
];

const QUIZ_M3_POOL: QuizQuestion[] = [
  {
    id: 301,
    pergunta:
      "Na frase 'Os alunos, que estudaram muito, passaram', as vírgulas indicam que:",
    opcoes: [
      { label: "A", valor: "Apenas alguns alunos passaram (restritiva)." },
      {
        label: "B",
        valor:
          "Todos os alunos estudaram muito e todos passaram (explicativa).",
      },
      { label: "C", valor: "A frase é agramatical." },
      { label: "D", valor: "As vírgulas são facultativas." },
    ],
    correta: "B",
    explicacao:
      "Com vírgulas, a oração é explicativa: TODOS os alunos estudaram. Sem vírgulas, seria restritiva: apenas os que estudaram passaram.",
  },
  {
    id: 302,
    pergunta:
      "A reescrita 'A empresa investiu bastante; todavia, os resultados não vieram' pode ser substituída por:",
    opcoes: [
      {
        label: "A",
        valor:
          "Embora a empresa tenha investido bastante, os resultados não vieram.",
      },
      {
        label: "B",
        valor: "A empresa investiu bastante porque os resultados não vieram.",
      },
      {
        label: "C",
        valor:
          "A empresa investiu bastante, portanto os resultados não vieram.",
      },
      {
        label: "D",
        valor: "A empresa investiu bastante caso os resultados não viessem.",
      },
    ],
    correta: "A",
    explicacao:
      "'Todavia' é adversativo. 'Embora' é concessivo. Ambos expressam oposição entre as ideias, mas com estruturas diferentes (coordenada vs. subordinada).",
  },
  {
    id: 303,
    pergunta:
      "Ao retirar os dois-pontos de 'A empresa trouxe novidades: investimentos em gás e solar', qual reescrita é válida?",
    opcoes: [
      {
        label: "A",
        valor: "A empresa trouxe novidades como investimentos em gás e solar.",
      },
      {
        label: "B",
        valor: "A empresa trouxe novidades, investimentos em gás e solar.",
      },
      {
        label: "C",
        valor: "A empresa trouxe novidades apesar de gás e solar.",
      },
      {
        label: "D",
        valor: "A empresa trouxe novidades, portanto gás e solar.",
      },
    ],
    correta: "A",
    explicacao:
      "Os dois-pontos introduzem uma enumeração ou explicação. 'Como' no sentido de 'tais como' mantém o valor enumerativo.",
  },
  {
    id: 304,
    pergunta:
      "A inserção de vírgula antes de 'e' em 'O engenheiro analisou o projeto e a supervisora aprovou' é:",
    opcoes: [
      { label: "A", valor: "Obrigatória, pois muda o sujeito." },
      { label: "B", valor: "Proibida, pois o 'e' nunca admite vírgula." },
      {
        label: "C",
        valor: "Facultativa, pois o sentido se mantém em ambos os casos.",
      },
      { label: "D", valor: "Obrigatória apenas em textos formais." },
    ],
    correta: "A",
    explicacao:
      "Quando o sujeito muda depois do 'e' (sujeitos diferentes), a vírgula é obrigatória para separar as orações coordenadas com sujeitos distintos.",
  },
];

const QUIZ_M4_POOL: QuizQuestion[] = [
  {
    id: 401,
    pergunta:
      "Na frase 'Ele não fez nada', a reescrita 'Ele fez algo' é considerada:",
    opcoes: [
      {
        label: "A",
        valor: "Correta, pois as duplas negativas se anulam.",
      },
      {
        label: "B",
        valor:
          "Incorreta, pois 'não fez nada' em português é negação reforçada, não anulação.",
      },
      {
        label: "C",
        valor: "Correta apenas no registro informal.",
      },
      {
        label: "D",
        valor: "Depende do contexto e da banca.",
      },
    ],
    correta: "B",
    explicacao:
      "Em português, dupla negação REFORÇA (diferente do inglês). 'Não fez nada' = não fez absolutamente nada. Reescrever como 'fez algo' inverte o sentido.",
  },
  {
    id: 402,
    pergunta:
      "A passagem de 'Os operários devem usar EPIs' para 'É obrigatório o uso de EPIs pelos operários' é:",
    opcoes: [
      {
        label: "A",
        valor:
          "Válida: mantém o sentido de obrigatoriedade e a correção gramatical.",
      },
      {
        label: "B",
        valor: "Inválida: mudou de recomendação para obrigação.",
      },
      {
        label: "C",
        valor: "Inválida: a voz passiva não se aplica.",
      },
      {
        label: "D",
        valor: "Válida apenas se 'devem' significar obrigação.",
      },
    ],
    correta: "A",
    explicacao:
      "O verbo 'dever' no contexto de normas técnicas indica obrigatoriedade. A nominalização ('o uso') mantém o sentido de dever.",
  },
  {
    id: 403,
    pergunta: "Ao trocar 'porque' por 'porquanto', a regra gramatical é:",
    opcoes: [
      {
        label: "A",
        valor: "São sinônimos perfeitos, basta substituir.",
      },
      {
        label: "B",
        valor:
          "'Porquanto' é formal e causal/explicativo como 'porque', mas exige atenção ao registro.",
      },
      {
        label: "C",
        valor: "'Porquanto' é concessivo, não pode substituir 'porque'.",
      },
      {
        label: "D",
        valor: "'Porquanto' é condicional.",
      },
    ],
    correta: "B",
    explicacao:
      "'Porquanto' é uma conjunção causal/explicativa formal equivalente a 'porque', 'visto que'. A substituição é válida com adequação de registro.",
  },
  {
    id: 404,
    pergunta:
      "Qual das reescritas é uma paráfrase válida de 'Caso haja atraso, comunique imediatamente'?",
    opcoes: [
      {
        label: "A",
        valor: "Se houver atraso, comunique imediatamente.",
      },
      {
        label: "B",
        valor: "Quando houver atraso, comunique imediatamente.",
      },
      {
        label: "C",
        valor: "Embora haja atraso, comunique imediatamente.",
      },
      {
        label: "D",
        valor: "Ainda que haja atraso, comunique imediatamente.",
      },
    ],
    correta: "A",
    explicacao:
      "'Caso' e 'Se' são ambos condicionais. B muda para temporal, C e D mudam para concessão — todos alteram o sentido original.",
  },
];

const QUIZ_FINAL_POOL: QuizQuestion[] = [
  {
    id: 301,
    pergunta:
      "A frase 'Não obstante o esforço, falharam' mantém o sentido se reescrita como:",
    opcoes: [
      { label: "A", valor: "Por causa do esforço, falharam." },
      { label: "B", valor: "Apesar do esforço, falharam." },
      { label: "C", valor: "Visto que houve esforço, falharam." },
      { label: "D", valor: "Caso houvesse esforço, falhariam." },
    ],
    correta: "B",
    explicacao:
      "'Não obstante' e 'Apesar de' são marcadores de concessão/oposição. A frase expressa que o esforço não impediu a falha.",
  },
  {
    id: 302,
    pergunta:
      "Qual das reescritas abaixo altera o sentido original de 'Os funcionários, que são dedicados, receberão bônus'?",
    opcoes: [
      { label: "A", valor: "Os dedicados funcionários receberão bônus." },
      {
        label: "B",
        valor:
          "Os funcionários que são dedicados receberão bônus. (sem vírgulas)",
      },
      {
        label: "C",
        valor: "Visto que são dedicados, os funcionários receberão bônus.",
      },
      {
        label: "D",
        valor:
          "Bônus serão recebidos pelos funcionários, os quais são dedicados.",
      },
    ],
    correta: "B",
    explicacao:
      "A versão original diz que TODOS os funcionários são dedicados (explicativa). A versão B diz que APENAS os dedicados recebem (restritiva).",
  },
  {
    id: 303,
    pergunta:
      "Na frase 'Faz dez anos que trabalho aqui', a reescrita gramaticalmente correta é:",
    opcoes: [
      { label: "A", valor: "Fazem dez anos que trabalho aqui." },
      { label: "B", valor: "Há dez anos que trabalho aqui." },
      { label: "C", valor: "A dez anos que trabalho aqui." },
      { label: "D", valor: "Tem dez anos que trabalho aqui." },
    ],
    correta: "B",
    explicacao:
      "Verbo 'fazer' indicando tempo é impessoal (singular). Verbo 'haver' também. 'A' é distância ou tempo futuro. 'Tem' é coloquial.",
  },
  {
    id: 304,
    pergunta:
      "A Cesgranrio costuma trocar 'se' por 'caso'. Qual a regra de ouro para essa reescrita?",
    opcoes: [
      { label: "A", valor: "Nenhuma, basta trocar a palavra." },
      {
        label: "B",
        valor:
          "O 'se' pede futuro do subjuntivo; o 'caso' pede presente do subjuntivo.",
      },
      { label: "C", valor: "O 'caso' exige vírgula obrigatória." },
      { label: "D", valor: "O 'se' só pode ser usado no início da frase." },
    ],
    correta: "B",
    explicacao:
      "Ajuste de modo: Se você VIER (futuro subj.). Caso você VENHA (pres. subj.). A troca direta sem mudar o verbo gera erro gramatical.",
  },
];

const CHALLENGE_POOL: Challenge[] = [
  {
    id: 1,
    original: "Embora fizesse calor, ele usava casaco.",
    reescrita: "Mesmo fazendo calor, ele usava casaco.",
    status: "correto",
    explicacao:
      "Ambas mantêm o sentido concessivo e o ajuste de verbo conjugado para gerúndio (forma nominal) está correto.",
  },
  {
    id: 2,
    original: "Alugam-se casas de veraneio.",
    reescrita: "Aluga-se casas de veraneio.",
    status: "errado",
    explicacao:
      "Erro de Concordância. Em 'Alugam-se casas', 'casas' é o sujeito (Voz Passiva Sintética), logo o verbo deve estar no plural.",
  },
  {
    id: 3,
    original: "A medida que o tempo passa, aprendemos mais.",
    reescrita: "À medida que o tempo passa, aprendemos mais.",
    status: "correto",
    explicacao:
      "A locução conjuntiva proporcional 'À medida que' exige crase obrigatória. A reescrita corrigiu a gramática mantendo o sentido.",
  },
  {
    id: 4,
    original: "Se ele ter sorte, ganhará o prêmio.",
    reescrita: "Se ele tiver sorte, ganhará o prêmio.",
    status: "correto",
    explicacao:
      "A reescrita corrigiu a flexão do verbo 'ter' no futuro do subjuntivo, que é 'tiver' e não 'ter'.",
  },
];

// ── Componente Principal ──────────────────────────────────────────────────

export default function AulaReescritaFrases({
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
  const [quizM1, setQuizM1] = useState<QuizQuestion[]>([]);
  const [quizM2, setQuizM2] = useState<QuizQuestion[]>([]);
  const [quizM3, setQuizM3] = useState<QuizQuestion[]>([]);
  const [quizM4, setQuizM4] = useState<QuizQuestion[]>([]);
  const [quizFinal, setQuizFinal] = useState<QuizQuestion[]>([]);
  const [shuffledChallenges, setShuffledChallenges] = useState<Challenge[]>([]);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [showCompletionBadge, setShowCompletionBadge] = useState(false);

  // Inicialização
  useEffect(() => {
    setQuizM1(getRandomQuestions(QUIZ_M1_POOL, 8));
    setQuizM2(getRandomQuestions(QUIZ_M2_POOL, 8));
    setQuizM3(getRandomQuestions(QUIZ_M3_POOL, 8));
    setQuizM4(getRandomQuestions(QUIZ_M4_POOL, 8));
    setQuizFinal(getRandomQuestions(QUIZ_FINAL_POOL, 8));
    setShuffledChallenges([...CHALLENGE_POOL].sort(() => 0.5 - Math.random()));
  }, []);

  useEffect(() => {
    if ((currentProgress ?? 0) >= 100 || isCompleted)
      setShowCompletionBadge(true);
  }, [currentProgress, isCompleted]);

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
      const newCompleted = new Set(completedModules);
      newCompleted.add(moduleId);
      setCompletedModules(newCompleted);

      const progressPercent = Math.round(
        (newCompleted.size / MODULE_DEFS.length) * 100,
      );

      if (onUpdateProgress) onUpdateProgress(progressPercent);

      // Auto navegação para o próximo módulo
      const index = MODULE_DEFS.findIndex((m) => m.id === moduleId);
      if (index < MODULE_DEFS.length - 1) {
        setTimeout(() => setActiveTab(MODULE_DEFS[index + 1].id), 1500);
      } else {
        setShowCompletionBadge(true);
        if (onComplete) onComplete();
      }
    }
  };

  const isModuleUnlocked = (_index: number) => {
    return true; // TEMPORÁRIO: Desbloqueado para revisão
  };

  const currentChallenge = shuffledChallenges[challengeIndex];

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={(val) => {
        const idx = MODULE_DEFS.findIndex((m) => m.id === val);
        if (isModuleUnlocked(idx)) setActiveTab(val);
      }}
      modules={MODULE_DEFS}
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
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={1}
            titulo="Fundamentos da Reescritura"
            descricao="Entenda como manter o sentido original e a correção gramatical — a base das questões Cesgranrio."
            gradiente="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-600"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="O Binômio de Ouro: Semântica + Gramática"
              variant="indigo"
              className="mb-8"
            />
            <p className="text-lg text-muted-foreground leading-relaxed">
              Para a Cesgranrio, uma reescrita só é considerada válida se ela
              for <strong>fiel ao que o autor disse</strong> e respeitar
              estritamente a <strong>norma culta</strong>. Mudar uma única
              palavra por um sinônimo "quase" igual pode invalidar o item.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AlertBox tipo="info" titulo="Semântica (Sentido)">
                <p className="text-sm mb-2">
                  O exame deve focar na <strong>modalização</strong>: palavras
                  que indicam certeza (deve, certamente) vs hípótese (pode,
                  possivelmente). Trocar uma pela outra é erro comum.
                </p>
                <div className="p-2 bg-blue-500/5 rounded border border-blue-500/10 text-xs">
                  <span className="font-bold text-blue-700 dark:text-blue-400">
                    Ex:
                  </span>{" "}
                  "Ele <u>talvez</u> chegue" &rarr; "Ele <u>com certeza</u>{" "}
                  chegará"{" "}
                  <span className="text-red-500 font-bold">
                    (ERRO: Mudou hipótese por certeza)
                  </span>
                  .
                </div>
              </AlertBox>
              <AlertBox tipo="success" titulo="Gramática (Correção)">
                <p className="text-sm mb-2">
                  Muitas vezes o sentido é mantido, mas a nova frase ignora uma
                  regra de <strong>concordância</strong> ou{" "}
                  <strong>regência</strong>. O erro é gramatical, não semântico.
                </p>
                <div className="p-2 bg-green-500/5 rounded border border-green-500/10 text-xs">
                  <span className="font-bold text-green-700 dark:text-green-400">
                    Ex:
                  </span>{" "}
                  "Fazem anos que não o vejo"{" "}
                  <span className="text-red-500 font-bold">
                    (ERRO de Concordância)
                  </span>
                  . O correto é "<u>Faz</u> anos".
                </div>
              </AlertBox>
            </div>

            <div className="p-6 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-800 space-y-4">
              <h4 className="font-bold text-blue-800 dark:text-blue-300 flex items-center gap-2">
                <LuLightbulb className="w-5 h-5" /> Denotação vs. Conotação
              </h4>
              <p className="text-sm leading-relaxed">
                Fique atento a reescritas que tentam transformar uma linguagem
                figurada (conotativa) em literal (denotativa). Se o sentido for
                preservado, a reescrita é válida.
              </p>
              <div className="p-3 bg-white/50 dark:bg-black/20 rounded-lg text-xs space-y-2">
                <p>
                  <strong>Figurado:</strong> "Sua voz é um bálsamo."
                </p>
                <p>
                  <strong>Literal:</strong> "Sua voz é suave e traz conforto."{" "}
                  <span className="text-emerald-500 font-bold">
                    (VÁLIDO: Sentido mantido)
                  </span>
                </p>
              </div>
            </div>
          </section>

          <ModuleSectionHeader
            index={2}
            title="Tipos de Substituição de Palavras"
            description="Cuidado com sinônimos que dependem do contexto."
            variant="indigo"
            className="mb-8"
          />
          <CardCarousel
            cards={[
              {
                icone: "🔄",
                titulo: "Sinônimos Perfeitos",
                descricao:
                  "Substituição direta: 'Felicidade' por 'Alegria' (na maioria dos contextos).",
                corFundo: "bg-green-500/10",
              },
              {
                icone: "⚠️",
                titulo: "Falsos Sinônimos",
                descricao:
                  "Palavras parecidas mas com carga diferente: 'Gostar' vs. 'Amar'.",
                corFundo: "bg-yellow-500/10",
              },
              {
                icone: "📌",
                titulo: "Sentido do Contexto",
                descricao:
                  "O sentido de uma palavra é determinado pelo que vem antes e depois.",
                corFundo: "bg-blue-500/10",
              },
            ]}
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={3}
              title="Resumo do Módulo 1"
              variant="indigo"
              className="mb-8"
            />

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
                          videoId="dQw4w9WgXcQ"
                          title="Reescrita de Frases: Fundamentos e Sentido"
                          duration="08:45"
                          thumbnail="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1073&auto=format&fit=crop"
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
                      tituloAula="Reescrita de Frases"
                      materia="Língua Portuguesa"
                      profissao="Concurso Petrobras"
                      moduloNome="Fundamentos"
                      images={[
                        {
                          title: "Mapa Mental: Sentido Original",
                          type: "Mapa Mental",
                          placeholderColor: "bg-blue-900/10",
                          imageUrl:
                            "/images/mapa-mental/reescrita_mapa_mental_sentido_1771465579878.png",
                        },
                        {
                          title: "Infográfico: Modalização",
                          type: "Infográfico",
                          placeholderColor: "bg-indigo-900/10",
                          imageUrl:
                            "/images/mapa-mental/reescrita_m1_infografico_1771466182917.png",
                        },
                        {
                          title: "Esquema: Estrutura da Reescrita",
                          type: "Mapa Mental",
                          placeholderColor: "bg-slate-900/10",
                          imageUrl:
                            "/images/mapa-mental/reescrita_m1_mapa_mental_1771466156558.png",
                        },
                        {
                          title: "Dicas de Bechara: Reescrita",
                          type: "Mapa Mental",
                          placeholderColor: "bg-gray-900/10",
                          imageUrl:
                            "/images/mapa-mental/reescrita_bechara_mapa_mental_1_1771465535398.png",
                        },
                        {
                          title: "Mapa Mental: Semântica",
                          type: "Mapa Mental",
                          placeholderColor: "bg-blue-900/10",
                          imageUrl:
                            "/images/mapa-mental/mapa_mental_sentido_1771466121406.png",
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
                    <div className="text-center p-6 space-y-4">
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        O Binômio de Ouro
                      </h3>
                      <div className="text-6xl my-6 animate-pulse">
                        ⚖️ 📜 ⚖️
                      </div>
                      <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                        "Sentido (Semântica) + Correção (Gramática). Se um dos
                        pratos da balança cair, a reescrita é inválida!"
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-left">
                        <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                          <h4 className="text-sm font-bold text-red-600 dark:text-red-400 mb-2">
                            Exemplo ERRADO (Semântica)
                          </h4>
                          <p className="text-xs text-muted-foreground italic">
                            "O governo <u>pretende</u> investir" &rarr; "O
                            governo <u>vai</u> investir".
                          </p>
                          <p className="text-[10px] mt-2 font-medium">
                            Motivo: Pretensão é diferente de ação concreta.
                          </p>
                        </div>
                        <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                          <h4 className="text-sm font-bold text-red-600 dark:text-red-400 mb-2">
                            Exemplo ERRADO (Gramática)
                          </h4>
                          <p className="text-xs text-muted-foreground italic">
                            "Têm pessoas aqui" &rarr; "Há pessoas aqui".
                          </p>
                          <p className="text-[10px] mt-2 font-medium">
                            Motivo: O verbo 'ter' no sentido de 'existir' é erro
                            gramatical na norma culta.
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
                    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl border border-blue-500/20">
                      <div className="w-full max-w-md">
                        <MusicPlayerCard
                          audioUrl="#"
                          titulo="Fundamentos da Reescrita"
                          artista="Prof. Antigravity"
                        />
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM1}
            titulo="Quiz de Fixação - Fundamentos"
            icone="🎯"
            numero={4}
            variant="indigo"
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          />
        </div>
      </TabsContent>

      <TabsContent value="modulo-2" className="space-y-[50px]">
        <div className="space-y-10 animate-in fade-in duration-500">
          <ModuleBanner
            numero={2}
            titulo="Técnicas de Engenharia de Frases"
            descricao="Aprenda as ferramentas para desmontar e reconstruir qualquer frase mantendo a correção total."
            gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Ferramentas de Substituição"
              variant="emerald"
              className="mb-8"
            />
            <p className="text-lg text-muted-foreground leading-relaxed">
              Dominar a engenharia das frases permite que você identifique
              reescritas corretas que parecem "estranhas" mas são
              gramaticalmente perfeitas.
            </p>
            <ContentAccordion
              titulo="Engenharia de Frases: Ferramentas de Elite"
              icone="⚙️"
              slides={[
                {
                  titulo: "Vozes Verbais",
                  icone: "🗣️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A transposição da <strong>Voz Ativa</strong> para a{" "}
                        <strong>Voz Passiva</strong> exige atenção ao verbo
                        auxiliar (SER) + Particípio.
                      </p>
                      <div className="p-4 bg-muted rounded-lg font-mono text-sm space-y-2">
                        <p className="text-red-600 dark:text-red-400">
                          Ativa: "Muitos candidatos realizarão a prova."
                        </p>
                        <p className="text-emerald-600 dark:text-emerald-400">
                          Passiva: "A prova será realizada por muitos
                          candidatos."
                        </p>
                      </div>
                      <AlertBox tipo="warning" titulo="Atenção!">
                        O tempo verbal não pode mudar: 'Realizarão' (Futuro)
                        &rarr; 'Será realizada' (Futuro). Se a reescrita usar
                        'Foi realizada', está errada.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "O Segredo dos Conectivos",
                  icone: "🔗",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Substituir conjunções mantendo o valor semântico
                        (concessão, causa, condição).
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3 bg-indigo-50 dark:bg-indigo-900/10 rounded border border-indigo-100 dark:border-indigo-800">
                          <span className="font-bold block">
                            Embora / Conquanto
                          </span>
                          <span className="text-xs italic">(Concessivos)</span>
                        </div>
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-900/10 rounded border border-emerald-100 dark:border-emerald-800">
                          <span className="font-bold block">Caso / Se</span>
                          <span className="text-xs italic">(Condicionais)</span>
                        </div>
                      </div>
                      <p className="text-sm">
                        Obs: A reescrita de 'Embora' por 'Apesar de' exige que o
                        verbo passe para a forma nominal (infinitivo/gerúndio).
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Nominalização",
                  icone: "📝",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Transformar orações (com verbos) em sintagmas nominais
                        (substantivos).
                      </p>
                      <div className="p-3 bg-muted rounded-lg font-mono text-xs">
                        "É importante que o setor público colabore" <br />
                        &rarr; "É importante a colaboração do setor público".
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Esta técnica reduz o número de orações e aumenta a
                        densidade do texto.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Mecanismos de Realce (Bechara)",
                  icone: "✨",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        O uso do termo <strong>"é que"</strong> (partícula
                        expletiva) serve para dar ênfase sem alterar a análise
                        sintática original.
                      </p>
                      <div className="p-3 bg-blue-50/50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-800 font-mono text-xs">
                        "Nós precisamos de resultados." <br />
                        &rarr; "Nós <strong>é que</strong> precisamos de
                        resultados."
                      </div>
                      <AlertBox tipo="info" titulo="Dica do Mestre">
                        Na reescrita, a inclusão ou retirada da partícula de
                        realce não altera o sentido nem a correção gramatical da
                        frase.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Transposição de Discursos",
                  icone: "💬",
                  conteudo: (
                    <div className="space-y-4">
                      <p>Mudança do Discurso Direto para o Indireto.</p>
                      <div className="p-3 bg-muted rounded-lg space-y-2 text-xs">
                        <p>
                          <strong>Direto:</strong> Ele disse: "Chegarei amanhã".
                        </p>
                        <p>
                          <strong>Indireto:</strong> Ele disse que chegaria no
                          dia seguinte.
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Note a mudança dos tempos verbais (Futuro do Presente
                        &rarr; Futuro do Pretérito) e dos advérbios de tempo.
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Substituição de Conectivos Críticos"
              variant="emerald"
              className="mb-8"
            />
            <AlertBox tipo="warning" titulo="O Caso 'Caso' vs 'Se'">
              A troca de <strong>Se</strong> por <strong>Caso</strong> exige
              mudança no modo verbal. Errar essa troca é fatal na Cesgranrio:
              <br />
              <div className="mt-4 p-4 bg-white/50 dark:bg-black/20 rounded-lg space-y-2">
                <p>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold italic">
                    "Se você ESTUDAR..."
                  </span>{" "}
                  (Futuro Subj.)
                </p>
                <p>
                  <span className="text-rose-600 dark:text-rose-400 font-bold italic">
                    "Caso você ESTUDE..."
                  </span>{" "}
                  (Presente Subj.)
                </p>
              </div>
            </AlertBox>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={3}
              title="Resumo do Módulo 2"
              variant="emerald"
              className="mb-8"
            />

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
                          videoId="dQw4w9WgXcQ"
                          title="Técnicas e Transformações de Frases"
                          duration="12:20"
                          thumbnail="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1170&auto=format&fit=crop"
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
                      tituloAula="Reescrita de Frases"
                      materia="Língua Portuguesa"
                      profissao="Concurso Petrobras"
                      moduloNome="Técnicas e Transformações"
                      images={[
                        {
                          title: "Fluxograma: Transposição de Vozes",
                          type: "Fluxograma",
                          placeholderColor: "bg-purple-100",
                          imageUrl:
                            "/images/mapa-mental/reescrita_vozes_verbo_1771465223676.png",
                        },
                        {
                          title: "Tabela: Equivalência de Conectivos",
                          type: "Tabela",
                          placeholderColor: "bg-emerald-100",
                          imageUrl:
                            "/images/mapa-mental/reescrita_tabela_conectivos_v2_1771465319559.png",
                        },
                        {
                          title: "Fluxograma: Passos da Reescrita",
                          type: "Fluxograma",
                          placeholderColor: "bg-amber-100",
                          imageUrl:
                            "/images/mapa-mental/reescrita_fluxograma_v2_1771465342563.png",
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
                    <div className="text-center p-6 space-y-4">
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        A Regra do "Modo"
                      </h3>
                      <div className="text-6xl my-6 animate-bounce">
                        🔄 ⚠️ 🔄
                      </div>
                      <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                        "Se (Futuro do Subjuntivo) &rarr; Caso (Presente do
                        Subjuntivo). Trocar conectivo sem ajustar o verbo é o
                        erro preferido da banca!"
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-left">
                        <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                          <h4 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                            Reescrita CORRETA
                          </h4>
                          <p className="text-xs text-muted-foreground italic">
                            "<u>Se</u> você <strong>estudar</strong>..." &rarr;
                            "<u>Caso</u> você <strong>estude</strong>
                            ...".
                          </p>
                          <p className="text-[10px] mt-2 font-medium">
                            Ambas expressam a mesma condição com correção
                            gramatical.
                          </p>
                        </div>
                        <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                          <h4 className="text-sm font-bold text-red-600 dark:text-red-400 mb-2">
                            Reescrita ERRADA
                          </h4>
                          <p className="text-xs text-muted-foreground italic">
                            "<u>Se</u> você <strong>estudar</strong>..." &rarr;
                            "<u>Caso</u> você <strong>estudar</strong>
                            ...".
                          </p>
                          <p className="text-[10px] mt-2 font-medium">
                            Motivo: O 'caso' exige o modo subjuntivo no presente
                            ('estude').
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
                    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-xl border border-purple-500/20">
                      <div className="w-full max-w-md">
                        <MusicPlayerCard
                          audioUrl="#"
                          titulo="Técnicas e Conectivos"
                          artista="Prof. Antigravity"
                        />
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM2}
            titulo="Quiz de Fixação - Técnicas"
            icone="🎯"
            numero={4}
            variant="emerald"
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 3: Pontuação e Sentido */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <div className="space-y-10 animate-in fade-in duration-500">
          <ModuleBanner
            numero={3}
            titulo="Pontuação e Sentido na Reescritura"
            descricao="Como a presença ou ausência de uma vírgula pode invalidar completamente uma reescrita."
            gradiente="bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Vírgula que Muda Tudo"
              variant="violet"
              className="mb-8"
            />
            <p className="text-lg text-muted-foreground leading-relaxed">
              O examinador adora testar seu conhecimento sobre orações
              adjetivas. A vírgula determina se você está falando de{" "}
              <strong>todos</strong> ou apenas de <strong>alguns</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <AlertBox tipo="warning" titulo="Explicativa (COM vírgula)">
                <p className="text-sm mb-2">
                  Refere-se à totalidade. Generaliza.
                </p>
                <div className="p-3 bg-muted rounded-lg font-mono text-xs text-foreground italic">
                  "Os servidores, que fizeram curso, foram promovidos."
                </div>
                <p className="text-xs mt-2 font-bold text-center text-violet-600 dark:text-violet-400">
                  (Diz que TODOS os servidores fizeram curso e TODOS foram
                  promovidos)
                </p>
              </AlertBox>

              <AlertBox tipo="info" titulo="Restritiva (SEM vírgula)">
                <p className="text-sm mb-2">Limita o grupo. Especifica.</p>
                <div className="p-3 bg-muted rounded-lg font-mono text-xs text-foreground italic">
                  "Os servidores que fizeram curso foram promovidos."
                </div>
                <p className="text-xs mt-2 font-bold text-center text-blue-600 dark:text-blue-400">
                  (Diz que APENAS os que fizeram curso foram promovidos)
                </p>
              </AlertBox>
            </div>

            <p className="text-sm text-center mt-4 text-rose-500 font-bold bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
              CUIDADO: Tirar a vírgula de uma explicativa e transformar em
              restritiva MUDA COMPLETAMENTE O SENTIDO. É erro fatal em
              reescritura.
            </p>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Resumo do Módulo 3"
              variant="violet"
              className="mb-8"
            />

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
                          videoId="dQw4w9WgXcQ"
                          title="Mágica das Vírgulas na Reescrita"
                          duration="06:20"
                          thumbnail="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1170&auto=format&fit=crop"
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
                      tituloAula="Reescrita de Frases"
                      materia="Língua Portuguesa"
                      profissao="Concurso Petrobras"
                      moduloNome="Pontuação e Sentido"
                      images={[
                        {
                          title: "Meme: A Vírgula Assassina",
                          type: "Meme",
                          placeholderColor: "bg-violet-100",
                          imageUrl: "/images/placeholders/virgula_meme.png",
                        },
                        {
                          title: "Esquema: Pontuação e Sentido",
                          type: "Tabela",
                          placeholderColor: "bg-violet-900/10",
                        },
                      ]}
                    />
                  ),
                },
                {
                  id: "macete",
                  label: "Macete Visual",
                  icon: LuImage,
                  content: (
                    <div className="text-center p-6 space-y-4">
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        O Pulo do Gato: Vírgulas
                      </h3>
                      <div className="text-6xl my-6">🧬 ♒ 🧬</div>
                      <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                        "Com vírgula = Generaliza (Explicativa).
                        <br />
                        Sem vírgula = Especifica (Restritiva)."
                      </p>
                      <div className="p-4 bg-violet-500/5 border border-violet-500/20 rounded-xl mt-4">
                        <p className="text-sm font-bold text-violet-700 dark:text-violet-400">
                          Trocar uma pela outra MUDA O SENTIDO, mas mantém a
                          correção gramatical.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  id: "audio",
                  label: "Áudio Resumo",
                  icon: LuVolume2,
                  content: (
                    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-xl border border-violet-500/20">
                      <div className="w-full max-w-md">
                        <MusicPlayerCard
                          audioUrl="#"
                          titulo="Pílula de Pontuação"
                          artista="Prof. Antigravity"
                        />
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM3}
            titulo="Quiz de Fixação - Pontuação"
            icone="🎯"
            numero={3}
            variant="violet"
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 4: Armadilhas Avançadas */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <div className="space-y-10 animate-in fade-in duration-500">
          <ModuleBanner
            numero={4}
            titulo="Armadilhas Avançadas e Dupla Negação"
            descricao="Negações cruzadas, modalizações sutis e substituições lexicais avançadas."
            gradiente="bg-gradient-to-br from-amber-600 via-orange-600 to-red-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Falsa Lógica da Dupla Negação"
              variant="amber"
              className="mb-8"
            />

            <div className="flex flex-col md:flex-row gap-6 items-center bg-amber-500/5 p-6 rounded-xl border border-amber-500/20">
              <div className="text-6xl">🧮</div>
              <div>
                <p className="text-lg font-medium text-foreground mb-2">
                  Na Matemática: (-) com (-) = (+)
                </p>
                <p className="text-lg font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 p-2 rounded inline-block">
                  No Português: Negação + Negação = NEGAÇÃO REFORÇADA!
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  "Não vi ninguém" manterá o sentido negativo. Não tente
                  reescrever para "Vi alguém" achando que está corrigindo a
                  frase.
                </p>
              </div>
            </div>

            <ModuleSectionHeader
              index={2}
              title="Vocabulário e Registro"
              variant="amber"
              className="mt-8 mb-6"
            />

            <CardCarousel
              cards={[
                {
                  icone: "🎩",
                  titulo: "Informal para Formal",
                  descricao:
                    "A reescrita frequentemente eleva o tom da frase (ex: Pensa-se -> Tem-se em mente).",
                  corFundo: "bg-blue-500/10",
                },
                {
                  icone: "⚖️",
                  titulo: "Nomes Substantivos",
                  descricao:
                    "Ação (Verbo) virando Sujeito/Objeto (Nome). 'O agir precipitado gerou crise'.",
                  corFundo: "bg-emerald-500/10",
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={3}
              title="Resumo do Módulo 4"
              variant="amber"
              className="mb-8"
            />

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
                          videoId="dQw4w9WgXcQ"
                          title="Armadilhas de Sentido na Reescrita"
                          duration="07:45"
                          thumbnail="https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=1171&auto=format&fit=crop"
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
                      tituloAula="Reescrita de Frases"
                      materia="Língua Portuguesa"
                      profissao="Concurso Petrobras"
                      moduloNome="Armadilhas Avançadas"
                      images={[
                        {
                          title: "Quadro Comparativo: Formalidade",
                          type: "Tabela",
                          placeholderColor: "bg-amber-100",
                          imageUrl:
                            "/images/placeholders/formalidade_tabela.png",
                        },
                        {
                          title: "Mapa Mental: Armadilhas",
                          type: "Mapa Mental",
                          placeholderColor: "bg-amber-900/10",
                        },
                      ]}
                    />
                  ),
                },
                {
                  id: "macete",
                  label: "Macete Visual",
                  icon: LuImage,
                  content: (
                    <div className="text-center p-6 space-y-4">
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        Checklist do Olhar Clínico
                      </h3>
                      <div className="text-6xl my-6">🕵️‍♂️ 🔍 🕵️‍♂️</div>
                      <ul className="text-sm text-left space-y-2 max-w-md mx-auto">
                        <li className="flex items-center gap-2">
                          <LuCheck className="text-amber-500" /> Sublinhe o
                          verbo principal.
                        </li>
                        <li className="flex items-center gap-2">
                          <LuCheck className="text-amber-500" /> Circule o
                          conectivo (embora, caso, se).
                        </li>
                        <li className="flex items-center gap-2">
                          <LuCheck className="text-amber-500" /> Verifique se a
                          negação foi mantida.
                        </li>
                      </ul>
                    </div>
                  ),
                },
                {
                  id: "audio",
                  label: "Áudio Resumo",
                  icon: LuVolume2,
                  content: (
                    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-xl border border-amber-500/20">
                      <div className="w-full max-w-md">
                        <MusicPlayerCard
                          audioUrl="#"
                          titulo="Pílula de Armadilhas"
                          artista="Prof. Antigravity"
                        />
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM4}
            titulo="Quiz de Fixação - Armadilhas"
            icone="🎯"
            numero={4}
            variant="amber"
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 5: Laboratório de Gabarito */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <div className="space-y-16 animate-in fade-in duration-500">
          <ModuleBanner
            numero={5}
            titulo="Laboratório de Gabarito: Missão Final"
            descricao="Treine com armadilhas reais da Cesgranrio e realize o simulado final para dominar a reescritura."
            gradiente="bg-gradient-to-br from-rose-600 via-pink-600 to-red-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title={'As "Armadilhas de Reescrita" (Checklist)'}
              variant="rose"
              className="mb-8"
            />
            <div className="space-y-4">
              <div className="p-4 bg-slate-500/5 rounded-xl border-l-4 border-slate-500 flex items-start gap-4">
                <LuTriangleAlert
                  className="text-slate-500 mt-1 shrink-0"
                  size={24}
                />
                <div>
                  <h4 className="font-bold text-slate-700 dark:text-slate-300">
                    Mudança de Ênfase
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Inverter a ordem dos termos (ex: passar o predicativo para o
                    início) pode mudar o que o autor quis destacar.
                  </p>
                </div>
              </div>
              <div className="p-4 bg-red-500/5 rounded-xl border-l-4 border-red-500 flex items-start gap-4">
                <LuTriangleAlert
                  className="text-red-500 mt-1 shrink-0"
                  size={24}
                />
                <div>
                  <h4 className="font-bold text-red-700 dark:text-red-300">
                    Alteração de Tempo Verbal
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Trocar um Pretérito Perfeito (fato concluído) por Imperfeito
                    (fato habitual) muda o sentido temporal.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-12">
            <ModuleSectionHeader
              index={2}
              title="Laboratório de Reescrita"
              description="Identifique cascas de banana e aplique a técnica Certo vs. Errado."
              variant="rose"
              className="mb-8"
            />
            <div className="space-y-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Neste laboratório, vamos focar em{" "}
                <strong>cascas de banana</strong>. O objetivo é identificar o
                detalhe que invalida a reescrita. Use os FlipCards para ver a
                análise técnica.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FlipCard
                  categoria="Vozes Verbais"
                  frente="Ativa: 'A Petrobras investirá em energia limpa.'"
                  verso="Passiva: 'Em energia limpa será investido pela Petrobras.' (INVÁLIDA: O objeto 'em energia limpa' é indireto, não vira sujeito.)"
                />
                <FlipCard
                  categoria="Conectivos"
                  frente="Original: 'Ficou em casa, visto que estava chovendo.'"
                  verso="Reescrita: 'Ficou em casa, conquanto estivesse chovendo.' (INVÁLIDA: Visto que é CAUSA, Conquanto é CONCESSÃO.)"
                />
              </div>

              <hr className="border-border/50" />

              <div className="space-y-6">
                <h4 className="font-bold text-center text-xl">
                  Desafio Certo vs. Errado
                </h4>
                {shuffledChallenges.length > 0 && (
                  <div className="space-y-8">
                    <FlipCard
                      categoria="Reescritura de Frases"
                      numero={challengeIndex + 1}
                      frente={
                        <div className="space-y-4">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                              Frase Original:
                            </span>
                            <p className="italic text-foreground">
                              "{currentChallenge.original}"
                            </p>
                          </div>
                          <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-primary block mb-1">
                              Reescrita Proposta:
                            </span>
                            <p className="font-bold text-foreground">
                              "{currentChallenge.reescrita}"
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground text-center mt-2">
                            A reescrita acima está correta?
                          </p>
                        </div>
                      }
                      verso={
                        <div className="space-y-4">
                          <div
                            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-tighter shadow-lg ${currentChallenge.status === "correto" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}`}
                          >
                            {currentChallenge.status === "correto"
                              ? "✅ GABARITO: CORRETO"
                              : "❌ GABARITO: ERRADO"}
                          </div>
                          <div className="p-4 bg-background/50 rounded-xl border border-border/50 text-sm leading-relaxed italic">
                            {currentChallenge.explicacao}
                          </div>
                        </div>
                      }
                    />
                    <div className="flex justify-center gap-4">
                      <Button
                        variant="outline"
                        onClick={() =>
                          setChallengeIndex(
                            (prev) => (prev + 1) % shuffledChallenges.length,
                          )
                        }
                        className={cn(
                          "rounded-full px-8 py-6 font-bold text-lg shadow-xl hover:scale-105 active:scale-95 transition-all text-foreground",
                          materiaCor.includes("blue")
                            ? "shadow-blue-500/40 border-blue-500/50"
                            : materiaCor.includes("emerald")
                              ? "shadow-emerald-500/40 border-emerald-500/50"
                              : "shadow-indigo-500/40 border-indigo-500/50",
                        )}
                      >
                        <LuShuffle className="mr-2" /> Próximo Desafio
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={3}
              title="Resumo do Módulo 5"
              variant="rose"
              className="mb-8"
            />

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
                          videoId="dQw4w9WgXcQ"
                          title="Checklist do Sucesso na Reescrita"
                          duration="15:00"
                          thumbnail="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1170&auto=format&fit=crop"
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
                      tituloAula="Reescrita de Frases"
                      materia="Língua Portuguesa"
                      profissao="Concurso Petrobras"
                      moduloNome="Prática Elite"
                      images={[
                        {
                          title: "Checklist: Pecados Capitais",
                          type: "Infográfico",
                          placeholderColor: "bg-red-100 dark:bg-red-900/30",
                        },
                        {
                          title: "Mapa Mental: Prática Elite",
                          type: "Mapa Mental",
                          placeholderColor:
                            "bg-orange-100 dark:bg-orange-900/30",
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
                    <div className="text-center p-4">
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        Checklist Fatal
                      </h3>
                      <div className="text-5xl my-4">🎯 📝 🎯</div>
                      <p className="text-muted-foreground">
                        "Sentido? Gramática? Lógica? Pontuação?"
                      </p>
                      <p className="text-sm mt-2 text-muted-foreground">
                        Reveja essa lista antes de marcar qualquer alternativa!
                      </p>
                    </div>
                  ),
                },
                {
                  id: "audio",
                  label: "Áudio Resumo",
                  icon: LuVolume2,
                  content: (
                    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl border border-red-500/20">
                      <div className="w-full max-w-md">
                        <MusicPlayerCard
                          audioUrl="#"
                          titulo="Estratégia Final de Reescrita"
                          artista="Prof. Antigravity"
                        />
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizFinal}
            titulo="Simulado de Finalização - Reescrita"
            icone="🏆"
            numero={4}
            variant="rose"
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
          />

          {showCompletionBadge && isCompleted && (
            <div className="mt-12 p-8 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl flex flex-col items-center justify-center space-y-6 animate-in zoom-in duration-500 shadow-lg shadow-emerald-500/5">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center relative">
                <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping opacity-50"></div>
                <LuTrophy className="w-10 h-10 text-emerald-500 drop-shadow-lg" />
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-2xl font-black text-foreground">
                  Missão Cumprida!
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Você dominou as técnicas de Reescritura de Frases
                  (Cesgranrio). Seu entendimento sobre preservação de sentido e
                  correção gramatical está pronto para o combate.
                </p>
              </div>

              <div className="flex gap-4 p-4 bg-background/50 rounded-xl border border-border/50">
                <div className="flex items-center gap-2">
                  <LuTimer className="text-emerald-500" />
                  <span className="text-sm font-bold text-foreground">
                    {duracao || "1h 30m"}
                  </span>
                </div>
                <div className="w-px bg-border"></div>
                <div className="flex items-center gap-2">
                  <LuTarget className="text-emerald-500" />
                  <span className="text-sm font-bold text-foreground">
                    100% Retenção
                  </span>
                </div>
                <div className="w-px bg-border"></div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                    +{xpGanho || 250} XP
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                {prevTopico && (
                  <Link href={`/aulas/${materiaId}/${prevTopico}`}>
                    <Button
                      variant="outline"
                      className="rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all text-muted-foreground font-medium border-border"
                    >
                      <LuArrowLeft className="mr-2" />
                      Anterior
                    </Button>
                  </Link>
                )}

                {nextTopico ? (
                  <Link href={`/aulas/${materiaId}/${nextTopico}`}>
                    <Button className="rounded-full px-8 py-5 shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all font-bold text-white bg-emerald-500 hover:bg-emerald-600 border border-emerald-400">
                      Próxima Aula
                      <LuArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                ) : (
                  <Link href={`/aulas/${materiaId}`}>
                    <Button className="rounded-full shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all bg-emerald-500 hover:bg-emerald-600 text-white font-bold border border-emerald-400">
                      Voltar para Módulo Base
                      <LuArrowRight className="ml-2" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
