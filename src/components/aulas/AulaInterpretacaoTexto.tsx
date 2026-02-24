"use client";

import { useState, useEffect, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LuCheck,
  LuBookOpen,
  LuPlay,
  LuPause,
  LuVolume2,
  LuImage,
  LuFileText,
  LuSkipBack,
  LuSkipForward,
  LuRepeat,
  LuShuffle,
  LuHeart,
  LuTrophy,
  LuTarget,
  LuLayers,
  LuLink,
  LuTriangleAlert,
  LuScale,
  LuTrendingUp,
  LuGlobe,
} from "react-icons/lu";

import {
  AlertBox,
  VideoModal,
  ImageCarousel,
  CardCarousel,
  ContentAccordion,
  TimelineItem,
  ComparisonSide,
  ModuleBanner,
  SummaryTabs,
  NanoImagePlaceholder,
  ModuleSummaryCarouselNew,
  MusicPlayerCard,
  LessonTabs,
  QuizInterativo,
  FlipCard,
  QuizQuestion,
  getRandomQuestions,
  ProgressIndicator,
  AulaProps,
  StickyModuleNav,
  ModuleSectionHeader,
} from "./shared";

import { progressService } from "@/lib/services/progress";

// ── Fallback for React 19 Activity ───────────────────────────────────────
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

// ── Constants & Data ────────────────────────────────────────────────────

const QUIZ_M1_POOL: QuizQuestion[] = [
  {
    id: 1,
    pergunta:
      "Segundo a visão de Bechara, qual a diferença fundamental entre compreensão e interpretação?",
    opcoes: [
      { label: "A", valor: "São sinônimos perfeitos" },
      {
        label: "B",
        valor:
          "Compreensão foca no que está escrito; Interpretação no que se conclui",
      },
      {
        label: "C",
        valor: "Interpretação foca na gramática; Compreensão no sentido",
      },
      { label: "D", valor: "Compreensão é para textos literários apenas" },
      {
        label: "E",
        valor:
          "Interpretação foca no que está escrito; Compreensão no que se conclui",
      },
    ],
    correta: "B",
    explicacao:
      "Bechara distingue: Compreensão (Análise do que está explícito) vs. Interpretação (Síntese do que se deduz). Opção E inverte os conceitos.",
  },
  {
    id: 2,
    pergunta:
      "Um texto que apresenta argumentos para convencer o leitor sobre um ponto de vista é tipificado como:",
    opcoes: [
      { label: "A", valor: "Narrativo" },
      { label: "B", valor: "Descritivo" },
      { label: "C", valor: "Dissertativo-Argumentativo" },
      { label: "D", valor: "Injuntivo" },
      { label: "E", valor: "Lírico" },
    ],
    correta: "C",
    explicacao:
      "O texto dissertativo-argumentativo busca defender uma tese através de argumentos lógicos. O lírico foca em sentimentos, não em tese.",
  },
  {
    id: 3,
    pergunta:
      'Ao ler "A Petrobras investe em energias limpas", a afirmação é um dado de:',
    opcoes: [
      { label: "A", valor: "Interpretação" },
      { label: "B", valor: "Compreensão" },
      { label: "C", valor: "Extrapolação" },
      { label: "D", valor: "Opinião" },
      { label: "E", valor: "Contradição" },
    ],
    correta: "B",
    explicacao:
      "É um dado explícito no texto (compreensão). A interpretação exige conclusões fora das linhas literais.",
  },
  {
    id: 4,
    pergunta: "Qual a principal característica do texto INJUNTIVO?",
    opcoes: [
      { label: "A", valor: "Contar uma história" },
      { label: "B", valor: "Descrever uma cena" },
      { label: "C", valor: "Instruir ou dar ordens (ex: manual)" },
      { label: "D", valor: "Expor dados científicos" },
      { label: "E", valor: "Defender um ponto de vista" },
    ],
    correta: "C",
    explicacao:
      "Manuais, receitas e editais são textos injuntivos ou instrucionais. Eles guiam o comportamento do leitor.",
  },
];

const QUIZ_M2_POOL: QuizQuestion[] = [
  {
    id: 1,
    pergunta:
      "Qual o papel fundamental das conjunções (conectivos) na interpretação de texto?",
    opcoes: [
      { label: "A", valor: "Apenas enfeitar o texto" },
      {
        label: "B",
        valor: "Estabelecer relações lógico-semânticas entre as ideias",
      },
      { label: "C", valor: "Substituir os substantivos para evitar repetição" },
      { label: "D", valor: "Indicar apenas o início de novos parágrafos" },
      { label: "E", valor: "Corrigir erros de ortografia" },
    ],
    correta: "B",
    explicacao:
      'Os conectivos são as "dobradiças" do texto, indicando oposição, causa, conclusão, etc.',
  },
  {
    id: 2,
    pergunta:
      'Na frase "Trabalhou muito, ENTRETANTO não foi promovido", o sentido do conectivo é:',
    opcoes: [
      { label: "A", valor: "Adição" },
      { label: "B", valor: "Causa" },
      { label: "C", valor: "Oposição (Adversidade)" },
      { label: "D", valor: "Conclusão" },
      { label: "E", valor: "Explicação" },
    ],
    correta: "C",
    explicacao:
      '"Entretanto" é uma conjunção adversativa, indicando que o resultado foi contrário ao esperado.',
  },
  {
    id: 3,
    pergunta: "Qual conectivo abaixo indica uma CONDIÇÃO?",
    opcoes: [
      { label: "A", valor: "Porque" },
      { label: "B", valor: "Caso" },
      { label: "C", valor: "Portanto" },
      { label: "D", valor: "Embora" },
      { label: "E", valor: "Enquanto" },
    ],
    correta: "B",
    explicacao: '"Caso você estude, passará" — indica uma condição necessária.',
  },
  {
    id: 4,
    pergunta: 'O conectivo "PORQUANTO" geralmente introduz uma:',
    opcoes: [
      { label: "A", valor: "Consequência" },
      { label: "B", valor: "Explicação ou Causa" },
      { label: "C", valor: "Finalidade" },
      { label: "D", valor: "Concessão" },
      { label: "E", valor: "Tempo" },
    ],
    correta: "B",
    explicacao:
      '"Porquanto" equivale a "porque" ou "visto que", sendo explicativo ou causal. Não confundir com conformativo.',
  },
];

const QUIZ_M3_POOL: QuizQuestion[] = [
  {
    id: 1,
    pergunta:
      "Qual técnica de leitura é recomendada para captar a IDEIA GERAL e o tema central do texto rapidamente?",
    opcoes: [
      { label: "A", valor: "Scanning" },
      { label: "B", valor: "Leitura Vertical" },
      { label: "C", valor: "Skimming" },
      { label: "D", valor: "Leitura Minuciosa" },
      { label: "E", valor: "Memorização" },
    ],
    correta: "C",
    explicacao:
      'O Skimming consiste em "deslizar" sobre o texto para captar o sentido global e o tema principal.',
  },
  {
    id: 2,
    pergunta: "O erro de interpretação chamado EXTRAPOLAÇÃO ocorre quando:",
    opcoes: [
      { label: "A", valor: "O leitor foca em apenas um detalhe do texto." },
      {
        label: "B",
        valor:
          "O leitor afirma algo que não está no texto, usando conhecimentos externos.",
      },
      { label: "C", valor: "O leitor nega o que o autor defendeu." },
      { label: "D", valor: "O leitor resume o texto corretamente." },
      { label: "E", valor: "O leitor confunde o autor com o narrador." },
    ],
    correta: "B",
    explicacao:
      "Extrapolar é ir além dos limites do texto, inserindo ideias que o autor não mencionou.",
  },
  {
    id: 3,
    pergunta:
      "Para encontrar uma DATA ou um NOME específico no texto sem ler tudo, utilizamos o:",
    opcoes: [
      { label: "A", valor: "Skimming" },
      { label: "B", valor: "Scanning" },
      { label: "C", valor: "Filtro de Bechara" },
      { label: "D", valor: "Método Indutivo" },
      { label: "E", valor: "Diagramação" },
    ],
    correta: "B",
    explicacao:
      "O Scanning é uma varredura em busca de informações pontuais e específicas.",
  },
  {
    id: 4,
    pergunta:
      "Focar em um detalhe pequeno do texto e ignorar o contexto geral é um erro de:",
    opcoes: [
      { label: "A", valor: "Redução" },
      { label: "B", valor: "Contradição" },
      { label: "C", valor: "Extrapolação" },
      { label: "D", valor: "Síntese" },
      { label: "E", valor: "Elipse" },
    ],
    correta: "A",
    explicacao:
      "A Redução ocorre quando o leitor toma uma parte do texto como se fosse o todo.",
  },
];

const QUIZ_M4_POOL: QuizQuestion[] = [
  {
    id: 1,
    pergunta:
      "A progressão temática de um texto de interpretação ideal na FGV e Cesgranrio garante que:",
    opcoes: [
      { label: "A", valor: "As frases sejam curtas" },
      {
        label: "B",
        valor: "Informações velhas e novas se conectem sem quebra lógica",
      },
      { label: "C", valor: "Haja vocabulário complexo" },
      { label: "D", valor: "O texto não apresente exemplos" },
      { label: "E", valor: "O título seja chamativo" },
    ],
    correta: "B",
    explicacao:
      "A progressão textual perfeita articula o que já foi dito (dado) com informações inéditas (novo).",
  },
  {
    id: 2,
    pergunta: "O que caracteriza a Coerência Externa?",
    opcoes: [
      {
        label: "A",
        valor: "A conexão entre os parágrafos com conectivos adequados",
      },
      { label: "B", valor: "A ausência de contradições internas" },
      {
        label: "C",
        valor: "O respeito à realidade dos fatos e conhecimento de mundo",
      },
      { label: "D", valor: "A presença de sinônimos consistentes" },
      { label: "E", valor: "O uso de aspas em citações" },
    ],
    correta: "C",
    explicacao:
      "Coerência externa diz respeito à verossimilhança do texto e como ele se adeque à realidade do mundo.",
  },
  {
    id: 3,
    pergunta: "Qual o papel da elipse na economia do texto corporativo?",
    opcoes: [
      { label: "A", valor: "Repetir a ideia principal três vezes." },
      {
        label: "B",
        valor: "Omirtir termos que podem ser recuperados pelo contexto.",
      },
      { label: "C", valor: "Evitar o uso de conectivos coordenativos." },
      { label: "D", valor: "Alongar as frases para dar formalidade." },
      { label: "E", valor: "Inserir comentários do autor." },
    ],
    correta: "B",
    explicacao:
      "A elipse elimina elementos gramaticais subentendidos, deixando o texto profissional mais direto.",
  },
  {
    id: 4,
    pergunta:
      "Numa questão de reescritura, ao alterar um pronome relativo, o que deve ser priorizado?",
    opcoes: [
      { label: "A", valor: "A manutenção do número de palavras" },
      { label: "B", valor: "A regência e o sentido original" },
      { label: "C", valor: "A mudança de tempo verbal" },
      { label: "D", valor: "A troca para a voz passiva" },
      { label: "E", valor: "O uso de gírias técnicas" },
    ],
    correta: "B",
    explicacao:
      "Na reescritura de pronomes relativos, a regência atrelada a ele e a semântica são os focos principais.",
  },
];

const QUIZ_M5_POOL: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "Qual a principal diferença entre Tese e Argumento?",
    opcoes: [
      { label: "A", valor: "A tese é um fato; argumento é opinião" },
      {
        label: "B",
        valor:
          "Tese é o ponto de vista central; o argumento é a prova que o sustenta",
      },
      { label: "C", valor: "Ambos são sinônimos perfeitos" },
      { label: "D", valor: "A tese finaliza o texto; o argumento o inicia" },
      { label: "E", valor: "Argumento é o título; tese é o resumo" },
    ],
    correta: "B",
    explicacao:
      'A Tese é o "o quê" eu defendo; os argumentos são os "porquês".',
  },
  {
    id: 2,
    pergunta:
      "Dentre as tipologias textuais, um Relatório corporativo se baseia predominantemente em:",
    opcoes: [
      { label: "A", valor: "Narrativa" },
      { label: "B", valor: "Dissertação Argumentativa e Injunção" },
      { label: "C", valor: "Exposição (Informativa)" },
      { label: "D", valor: "Poesia" },
      { label: "E", valor: "Dramaturgia" },
    ],
    correta: "C",
    explicacao:
      "Documentos técnicos e relatórios têm caráter predominantemente expositivo/informativo.",
  },
  {
    id: 3,
    pergunta: "Quando uma questão pede para inferir algo, ela espera que você:",
    opcoes: [
      { label: "A", valor: "Copie um trecho literal" },
      {
        label: "B",
        valor:
          "Deduza uma informação não declarada, baseada nas pistas lógicas do texto",
      },
      { label: "C", valor: "Expresse sua opinião pessoal sobre a leitura" },
      { label: "D", valor: "Marque a opção que extrapola o texto" },
      { label: "E", valor: "Ignore as entrelinhas" },
    ],
    correta: "B",
    explicacao:
      "A inferência é uma dedução logicamente possível com base no que está escrito.",
  },
  {
    id: 4,
    pergunta:
      'Se o comando da banca disser "No fragmento... a expressão destacada remete a:", a banca está testando:',
    opcoes: [
      { label: "A", valor: "Ortografia" },
      { label: "B", valor: "Coesão referencial (Anafórica ou Catafórica)" },
      { label: "C", valor: "Coerência externa" },
      { label: "D", valor: "Estruturação silábica" },
      { label: "E", valor: "Acentuação gráfica" },
    ],
    correta: "B",
    explicacao:
      "Retomadas textuais referem-se aos mecanismos anafóricos e catafóricos de coesão.",
  },
];

const QUIZ_FINAL_POOL: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "O erro de EXTRAPOLAÇÃO ocorre quando o candidato:",
    opcoes: [
      { label: "A", valor: "Entende menos do que o texto disse" },
      { label: "B", valor: "Traz ideias externas que não estão no texto" },
      { label: "C", valor: "Diz exatamente o oposto do texto" },
      { label: "D", valor: "Resume corretamente o tema" },
      { label: "E", valor: "Identifica o autor corretamente" },
    ],
    correta: "B",
    explicacao:
      "Extrapolar é ir além dos limites do texto, usando conhecimento de mundo onde a banca pediu fidelidade textual.",
  },
  {
    id: 2,
    pergunta: "A REDUÇÃO é um erro de interpretação que consiste em:",
    opcoes: [
      { label: "A", valor: "Escrever nomes em letras minúsculas" },
      {
        label: "B",
        valor: "Dar atenção apenas a um aspecto, ignorando o contexto geral",
      },
      { label: "C", valor: "Aumentar a letra do texto" },
      { label: "D", valor: "Trocar o título do texto" },
      { label: "E", valor: "Omitir a conclusão" },
    ],
    correta: "B",
    explicacao:
      "Reduzir é focar em um detalhe e tratá-lo como se fosse a verdade total do texto.",
  },
  {
    id: 3,
    pergunta:
      'Em questões da Cesgranrio, ao encontrar "CONTRADIZ o texto", o candidato deve buscar:',
    opcoes: [
      { label: "A", valor: "Uma afirmação idêntica" },
      { label: "B", valor: "Uma afirmação que nega o que foi dito no texto" },
      { label: "C", valor: "Uma afirmação que explica o texto" },
      { label: "D", valor: "Um sinônimo" },
      { label: "E", valor: "Uma paráfrase" },
    ],
    correta: "B",
    explicacao:
      "Contradição é a negação direta de uma informação presente na base textual.",
  },
  {
    id: 4,
    pergunta: 'A estratégia de "Leitura Vertical" serve para:',
    opcoes: [
      { label: "A", valor: "Ler de cima para baixo sem parar" },
      {
        label: "B",
        valor: "Identificar palavras-chave e a estrutura do argumento",
      },
      { label: "C", valor: "Contar quantas linhas o texto tem" },
      { label: "D", valor: "Ler apenas o primeiro parágrafo" },
      { label: "E", valor: "Traduzir o texto mentalmente" },
    ],
    correta: "B",
    explicacao:
      'Serve para mapear a "espinha dorsal" do texto antes da leitura minuciosa.',
  },
];

interface Challenge {
  wrong: string;
  correct: string;
  explanation: string;
}

const CHALLENGE_POOL: Challenge[] = [
  {
    wrong:
      "O autor afirma que o pré-sal é a única solução para a crise energética.",
    correct:
      "O autor aponta o pré-sal como uma das alternativas viáveis, citando desafios técnicos.",
    explanation:
      "Cuidado com o erro de EXTRAPOLAÇÃO. Evite termos absolutos como 'única' se o texto for ponderado.",
  },
  {
    wrong: "O texto critica duramente a Petrobras pela falta de investimentos.",
    correct:
      "O texto analisa a oscilação dos investimentos frente ao cenário global de petróleo.",
    explanation:
      "Evite converter uma análise técnica em uma CRÍTICA pessoal. Mantenha a objetividade do texto.",
  },
  {
    wrong:
      "Para o autor, a transição energética é impossível no cenário atual.",
    correct:
      "O autor discute os gargalos logísticos que atrasam a transição energética.",
    explanation:
      "Erro de CONTRADIÇÃO: Discutir dificuldades não é o mesmo que afirmar impossibilidade.",
  },
  {
    wrong: "A energia solar é apresentada como o tema central do artigo.",
    correct:
      "A energia solar é citada como um exemplo de diversificação da matriz brasileira.",
    explanation:
      "Erro de REDUÇÃO: Não confunda um exemplo usado no parágrafo com o tema principal do texto.",
  },
];

// ── Main Component ──────────────────────────────────────────────────────

export default function AulaInterpretacaoTexto({
  onComplete,
  isCompleted,
  loading,
  xpGanho = 50,
  currentProgress,
  onUpdateProgress,
}: AulaProps) {
  const MODULE_DEFS = [
    { id: "modulo-1", label: "Módulo 1", titulo: "Fundamentos e Cognição" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Mecanismos de Coesão" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Estratégias de Elite" },
    { id: "modulo-4", label: "Módulo 4", titulo: "Coerência e Progressão" },
    { id: "modulo-5", label: "Módulo 5", titulo: "Maratona do Gabarito" },
  ];

  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(),
  );
  const [quizM1, setQuizM1] = useState<QuizQuestion[]>([]);
  const [quizM2, setQuizM2] = useState<QuizQuestion[]>([]);
  const [quizM3, setQuizM3] = useState<QuizQuestion[]>([]);
  const [quizM4, setQuizM4] = useState<QuizQuestion[]>([]);
  const [quizM5, setQuizM5] = useState<QuizQuestion[]>([]);
  const [quizFinal, setQuizFinal] = useState<QuizQuestion[]>([]);
  const [shuffledChallenges, setShuffledChallenges] = useState<Challenge[]>([]);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [showCompletionBadge, setShowCompletionBadge] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("aula_interpretacao_progress");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const restoredSet = new Set(parsed.completedModules || []);
        setCompletedModules(restoredSet as Set<string>);
      } catch (e) {
        console.error("Failed to restore", e);
      }
    }

    setQuizM1(getRandomQuestions(QUIZ_M1_POOL, 4));
    setQuizM2(getRandomQuestions(QUIZ_M2_POOL, 4));
    setQuizM3(getRandomQuestions(QUIZ_M3_POOL, 4));
    setQuizM4(getRandomQuestions(QUIZ_M4_POOL, 4));
    setQuizM5(getRandomQuestions(QUIZ_M5_POOL, 4));
    setQuizFinal(getRandomQuestions(QUIZ_FINAL_POOL, 4));
    setShuffledChallenges([...CHALLENGE_POOL].sort(() => 0.5 - Math.random()));

    if (currentProgress >= 100 || isCompleted) setShowCompletionBadge(true);
  }, [isCompleted]);

  const saveProgress = (newSet: Set<string>) => {
    const percent = Math.round((newSet.size / MODULE_DEFS.length) * 100);
    localStorage.setItem(
      "aula_interpretacao_progress",
      JSON.stringify({
        completedModules: Array.from(newSet),
        lastUpdated: new Date().toISOString(),
      }),
    );
    if (onUpdateProgress) onUpdateProgress(percent);
  };

  const handleModuleProgress = (
    moduleId: string,
    index: number,
    score: number,
  ) => {
    if (score >= 70) {
      const newSet = new Set(completedModules);
      newSet.add(moduleId);
      setCompletedModules(newSet);
      saveProgress(newSet);

      if (index < MODULE_DEFS.length - 1) {
        setTimeout(() => {
          setActiveTab(MODULE_DEFS[index + 1].id);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 1500);
      } else {
        setShowCompletionBadge(true);
        if (onComplete) onComplete();
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
    <div className="pb-40 animate-in fade-in duration-500">
      <div className="w-full pt-0">
        <ProgressIndicator />

        {showCompletionBadge && (
          <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center gap-4 shadow-sm mb-6 animate-in slide-in-from-top-4 duration-700">
            <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30">
              <LuCheck size={24} strokeWidth={3} />
            </div>
            <div>
              <h3 className="text-green-800 dark:text-green-300 font-bold text-lg">
                Aula Concluída!
              </h3>
              <p className="text-green-700 dark:text-green-400 text-sm">
                Parabéns! Você dominou as técnicas de Interpretação de Texto.
              </p>
            </div>
          </div>
        )}

        <Tabs
          value={activeTab}
          onValueChange={(val) => {
            const idx = MODULE_DEFS.findIndex((m) => m.id === val);
            if (isModuleUnlocked(idx)) setActiveTab(val);
          }}
          className="w-full"
        >
          <StickyModuleNav
            modules={Array.from(MODULE_DEFS)}
            activeTab={activeTab}
            completedModules={completedModules}
            isModuleUnlocked={isModuleUnlocked}
          />

          {/* ─── MÓDULO 1: FUNDAMENTOS ─── */}
          <TabsContent
            value="modulo-1"
            className="space-y-12 max-w-7xl mx-auto px-6 mt-8"
          >
            <ModuleBanner
              numero={1}
              titulo="Fundamentos e Cognição"
              descricao="A base teórica de Bechara e as tipologias essenciais para a Petrobras."
              gradiente="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700"
            />

            {/* SEÇÃO 1: BECHARA DETALHADO */}
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={1}
                title="Visão de Bechara: O Texto como Unidade de Sentido"
                variant="amber"
              />
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 rounded-xl p-6 md:p-8">
                  <p className="text-muted-foreground text-lg leading-relaxed italic">
                    "O texto não é uma soma de frases, mas um todo coerente."
                  </p>
                  <p className="text-foreground mt-4 font-medium">
                    — Evanildo Bechara
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-indigo-600 font-bold uppercase text-sm tracking-widest px-4 py-1 bg-indigo-50 rounded-full w-fit">
                      <LuTarget /> Análise (Compreensão)
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      É o micro-nível. Você foca nos dados, no vocabulário e na
                      sintaxe. A pergunta de prova será: "O texto afirma...",
                      "Segundo o autor...". Aqui não há espaço para deduções.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-purple-600 font-bold uppercase text-sm tracking-widest px-4 py-1 bg-purple-50 rounded-full w-fit">
                      <LuTrophy /> Síntese (Interpretação)
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      É o macro-nível. Você conecta as partes para entender a
                      intenção por trás das palavras. A pergunta será:
                      "Infere-se que...", "Conclui-se que...". É o diálogo com o
                      implícito.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SEÇÃO 2: TIPOLOGIA TEXTUAL */}
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={2}
                title="Tipologia Textual: Como o Texto se Organiza"
                variant="blue"
              />
              <p className="text-muted-foreground text-lg">
                Identificar o tipo de texto é o primeiro passo para não errar a
                interpretação central.
              </p>

              <div className="w-full">
                <Carousel
                  opts={{ loop: true, align: "start" }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-4 pb-4">
                    <CarouselItem className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                      <FlipCard
                        categoria="Tipologia Textual"
                        frente={
                          <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                            <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                              <LuLayers size={32} />
                            </div>
                            <h3 className="text-xl font-bold">
                              Dissertativo-Argumentativo
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              O queridinho da Cesgranrio
                            </p>
                          </div>
                        }
                        verso={
                          <div className="space-y-4">
                            <p>
                              <strong>Definição:</strong> Expõe um assunto e
                              defende uma opinião (tese) com argumentos.
                            </p>
                            <div className="p-3 bg-background/50 rounded-lg border border-indigo-500/20 text-xs italic">
                              "A exploração do petróleo é vital, embora a
                              transição energética seja urgente. Portanto, o
                              Brasil deve..."
                            </div>
                          </div>
                        }
                      />
                    </CarouselItem>

                    <CarouselItem className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                      <FlipCard
                        categoria="Tipologia Textual"
                        frente={
                          <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                            <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                              <LuBookOpen size={32} />
                            </div>
                            <h3 className="text-xl font-bold">
                              Narrativo e Descritivo
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              O que conta e o que pinta
                            </p>
                          </div>
                        }
                        verso={
                          <div className="space-y-4">
                            <div>
                              <strong className="text-emerald-400">
                                Narrativo:
                              </strong>
                              <p className="text-sm">
                                Foca em ações no tempo (personagens, enredo,
                                evolução temporal).
                              </p>
                            </div>
                            <div className="border-t border-white/10 pt-2">
                              <strong className="text-emerald-400">
                                Descritivo:
                              </strong>
                              <p className="text-sm">
                                Foca em características (pintura com palavras,
                                adjetivação, cena estática).
                              </p>
                            </div>
                          </div>
                        }
                      />
                    </CarouselItem>

                    <CarouselItem className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                      <FlipCard
                        categoria="Tipologia Textual"
                        frente={
                          <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                            <div className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                              <LuFileText size={32} />
                            </div>
                            <h3 className="text-xl font-bold">
                              Injuntivo (Instrucional)
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              O que manda fazer
                            </p>
                          </div>
                        }
                        verso={
                          <div className="space-y-4">
                            <p>
                              <strong>Definição:</strong> Visa orientar o
                              comportamento do leitor. Imperativo e verbos de
                              comando.
                            </p>
                            <ul className="list-disc pl-4 text-sm space-y-1">
                              <li>Manuais técnicos</li>
                              <li>Receitas</li>
                              <li>Editais</li>
                              <li>Normas de Segurança (SMS)</li>
                            </ul>
                          </div>
                        }
                      />
                    </CarouselItem>
                  </CarouselContent>
                  <div className="flex justify-center gap-2 mt-4">
                    <CarouselPrevious className="static translate-y-0 h-10 w-10 border-slate-700 text-slate-400" />
                    <CarouselNext className="static translate-y-0 h-10 w-10 border-slate-700 text-slate-400" />
                  </div>
                </Carousel>
              </div>
            </section>

            {/* SEÇÃO 4: QUIZ M1 */}
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={3}
                title="Quiz de Fixação"
                variant="rose"
              />
              <QuizInterativo
                questoes={quizM1}
                titulo="Quiz de Fixação - Fundamentos e Cognição"
                icone="🎯"
                onComplete={(score) =>
                  handleModuleProgress("modulo-1", 0, score)
                }
              />
            </section>
          </TabsContent>

          {/* ─── MÓDULO 2: COESÃO ─── */}
          <TabsContent
            value="modulo-2"
            className="space-y-12 max-w-7xl mx-auto px-6 mt-12"
          >
            <ModuleBanner
              numero={2}
              titulo="Mecanismos de Coesão"
              descricao="As ferramentas que dão liga ao texto e os conectores lógicos da Cesgranrio."
              gradiente="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800"
            />

            {/* SEÇÃO 1: OS CONECTIVOS */}
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={1}
                title="Os Conectivos: Mapa Lógico"
                variant="amber"
              />
              <div className="space-y-6">
                <AlertBox tipo="info" titulo="O Pulo do Gato">
                  <p>
                    Trocar um "Mas" por um "Embora" muda a estrutura gramatical
                    mas mantém a ideia de oposição. A banca ama isso!
                  </p>
                </AlertBox>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="p-6 border border-border/50 rounded-2xl bg-muted/20 hover:bg-muted/40 transition-all">
                    <h4 className="font-bold mb-3 flex items-center gap-2 text-red-500">
                      <LuLink /> Oposição
                    </h4>
                    <ul className="grid grid-cols-1 gap-1">
                      {["Mas", "Porém", "Contudo", "Todavia", "Entretanto"].map(
                        (c, i) => (
                          <li
                            key={i}
                            className="text-sm text-muted-foreground font-medium"
                          >
                            • {c}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                  <div className="p-6 border border-border/50 rounded-2xl bg-muted/20 hover:bg-muted/40 transition-all">
                    <h4 className="font-bold mb-3 flex items-center gap-2 text-blue-500">
                      <LuLink /> Causa/Explicação
                    </h4>
                    <ul className="grid grid-cols-1 gap-1">
                      {[
                        "Porque",
                        "Já que",
                        "Pois",
                        "Visto que",
                        "Porquanto",
                      ].map((c, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground font-medium"
                        >
                          • {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-6 border border-border/50 rounded-2xl bg-muted/20 hover:bg-muted/40 transition-all">
                    <h4 className="font-bold mb-3 flex items-center gap-2 text-emerald-500">
                      <LuLink /> Concessão
                    </h4>
                    <ul className="grid grid-cols-1 gap-1">
                      {["Embora", "Ainda que", "Apesar de", "Conquanto"].map(
                        (c, i) => (
                          <li
                            key={i}
                            className="text-sm text-muted-foreground font-medium"
                          >
                            • {c}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                  <div className="p-6 border border-border/50 rounded-2xl bg-muted/20 hover:bg-muted/40 transition-all">
                    <h4 className="font-bold mb-3 flex items-center gap-2 text-indigo-500">
                      <LuLink /> Conclusão
                    </h4>
                    <ul className="grid grid-cols-1 gap-1">
                      {["Logo", "Portanto", "Assim", "Por conseguinte"].map(
                        (c, i) => (
                          <li
                            key={i}
                            className="text-sm text-muted-foreground font-medium"
                          >
                            • {c}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                  <div className="p-6 border border-border/50 rounded-2xl bg-muted/20 hover:bg-muted/40 transition-all">
                    <h4 className="font-bold mb-3 flex items-center gap-2 text-orange-500">
                      <LuLink /> Condição
                    </h4>
                    <ul className="grid grid-cols-1 gap-1">
                      {["Se", "Caso", "Contanto que", "Desde que"].map(
                        (c, i) => (
                          <li
                            key={i}
                            className="text-sm text-muted-foreground font-medium"
                          >
                            • {c}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                  <div className="p-6 border border-border/50 rounded-2xl bg-muted/20 hover:bg-muted/40 transition-all">
                    <h4 className="font-bold mb-3 flex items-center gap-2 text-purple-500">
                      <LuLink /> Finalidade
                    </h4>
                    <ul className="grid grid-cols-1 gap-1">
                      {["Para que", "A fim de que", "Com o intuito de"].map(
                        (c, i) => (
                          <li
                            key={i}
                            className="text-sm text-muted-foreground font-medium"
                          >
                            • {c}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* SEÇÃO 2: EXEMPLOS PRÁTICOS */}
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={2}
                title="Substituição na Prática"
                variant="emerald"
              />
              <p className="text-muted-foreground">
                Veja como o sentido se mantém mas a sintaxe se altera:
              </p>
              <CardCarousel
                titulo="Exemplos de Reescrita"
                cards={[
                  {
                    icone: "⚖️",
                    titulo: "Conjunção Coordenada",
                    descricao: (
                      <div className="pb-4">
                        Choveu muito, <b>MAS</b> fomos trabalhar. (Relação de
                        oposição com ênfase no trabalho)
                      </div>
                    ),
                    corFundo: "bg-red-500/10",
                  },
                  {
                    icone: "🧠",
                    titulo: "Conjunção Subordinada",
                    descricao: (
                      <div className="pb-4">
                        <b>EMBORA</b> tenha chovido muito, fomos trabalhar.
                        (Concessão: ênfase no fato de chover, mantendo o
                        sentido)
                      </div>
                    ),
                    corFundo: "bg-emerald-500/10",
                  },
                  {
                    icone: "🔍",
                    titulo: "Causa vs Explicação",
                    descricao: (
                      <div className="pb-4">
                        Faltei <b>PORQUE</b> estava doente (Causa real). Venha,{" "}
                        <b>PORQUE</b> eu mandei (Explicação/Ordem).
                      </div>
                    ),
                    corFundo: "bg-blue-500/10",
                  },
                  {
                    icone: "📈",
                    titulo: "Conectivo Consecutivo",
                    descricao: (
                      <div className="pb-4">
                        Choveu tanto <b>QUE</b> a rua alagou. (Troque por:{" "}
                        <i>de tal sorte que</i>, <i>de modo que</i>)
                      </div>
                    ),
                    corFundo: "bg-purple-500/10",
                  },
                  {
                    icone: "⏳",
                    titulo: "Conectivo Condicional",
                    descricao: (
                      <div className="pb-4">
                        <b>CASO</b> chova, não irei. (Troque por:{" "}
                        <i>desde que</i> + subjuntivo, <i>contanto que</i>)
                      </div>
                    ),
                    corFundo: "bg-orange-500/10",
                  },
                  {
                    icone: "🎯",
                    titulo: "Conectivo Finalidade",
                    descricao: (
                      <div className="pb-4">
                        Estudo <b>PARA QUE</b> passe. (Troque por:{" "}
                        <i>a fim de que</i>, <i>com o intuito de</i>)
                      </div>
                    ),
                    corFundo: "bg-yellow-500/10",
                  },
                ]}
              />
            </section>

            {/* SEÇÃO 3: MULTIMÍDIA */}
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={3}
                title="Resumo e Multimídia"
                variant="indigo"
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
                            videoId="7tU9PzSkaU0"
                            title="Conectivos: A Dobradiça do Texto"
                            duration="12:30"
                            thumbnail="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop"
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
                        images={[
                          {
                            imageUrl:
                              "/images/mapa-mental/inter_m2_conectivos.png",
                            title: "Tabela: Conectivos de Oposição",
                            type: "Tabela",
                            placeholderColor: "bg-red-100 dark:bg-red-900/30",
                          },
                          {
                            imageUrl:
                              "/images/mapa-mental/inter_m2_causais.png",
                            title: "Mapa: Conectivos Causais",
                            type: "Mapa Mental",
                            placeholderColor: "bg-blue-100 dark:bg-blue-900/30",
                          },
                          {
                            imageUrl:
                              "/images/mapa-mental/inter_m2_concessivas.png",
                            title: "Concessivas vs Adversativas",
                            type: "Diferença",
                            placeholderColor:
                              "bg-emerald-100 dark:bg-emerald-900/30",
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
                      <div className="text-center p-8 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl border border-indigo-500/10">
                        <h3 className="text-xl font-bold text-foreground mb-4">
                          A Regra dos 2 Tempos
                        </h3>
                        <div className="text-7xl my-8 animate-pulse">
                          ⏳ ⚖️ 🔗
                        </div>
                        <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                          "Ache o conectivo, identifique o sentido! Mas, Porém,
                          Contudo... No entanto, Entrega a Oposição!"
                        </p>
                      </div>
                    ),
                  },
                  {
                    id: "audio",
                    label: "Áudio Resumo",
                    icon: LuVolume2,
                    content: (
                      <div className="w-full flex justify-center py-4">
                        <div className="w-full max-w-md">
                          <MusicPlayerCard
                            audioUrl="#"
                            titulo="Dobradiça do Texto"
                            artista="Conector Band"
                            capaUrl="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop"
                            lyrics={`(Verso 1)
                                                        O texto é um prédio, as colunas vão subir.
                                                        Sem o conector, o prédio vai cair!
                                                        
                                                        (Refrão)
                                                        Mas, porém, contudo... as pedras do caminho.
                                                        Logo e portanto... o final do pergaminho!`}
                          />
                        </div>
                      </div>
                    ),
                  },
                ]}
              />
            </section>

            {/* SEÇÃO 4: QUIZ M2 */}
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={4}
                title="Quiz de Fixação - Mecanismos de Coesão"
                variant="rose"
              />
              <QuizInterativo
                questoes={quizM2}
                titulo="Quiz de Fixação - Mecanismos de Coesão"
                icone="🎯"
                onComplete={(score) =>
                  handleModuleProgress("modulo-2", 1, score)
                }
              />
            </section>
          </TabsContent>

          {/* ─── MÓDULO 3: ESTRATÉGIAS ─── */}
          <TabsContent
            value="modulo-3"
            className="space-y-12 max-w-7xl mx-auto px-6 mt-12"
          >
            <ModuleBanner
              numero={3}
              titulo="Estratégias de Elite"
              descricao="As 3 grades armadilhas e técnicas de varredura Cesgranrio."
              gradiente="bg-gradient-to-br from-purple-700 to-indigo-900"
            />

            {/* SEÇÃO 1: VARREDURA E MÉTODOS DE LEITURA */}
            <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center text-3xl font-bold text-blue-700 dark:text-blue-400">
                  1
                </span>
                A Varredura Estratégica
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Na prova, o tempo é seu maior inimigo. Técnicas de varredura
                ajudam a mapear o texto antes de mergulhar em seus detalhes,
                preparando o cérebro para buscar a resposta correta no lugar
                certo.
              </p>
              <ContentAccordion
                titulo="Métodos Ágeis de Leitura"
                icone={<LuBookOpen className="text-blue-500" />}
                corIndicador="bg-blue-500"
                slides={[
                  {
                    titulo: "Leitura Vertical",
                    icone: "↕️",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-foreground">
                          A <strong>Leitura Vertical</strong> serve para
                          identificar palavras-chave e a estrutura principal (a
                          "espinha dorsal") do argumento sem ler todas as
                          palavras da linha.
                        </p>
                        <div className="bg-blue-500/10 p-4 border border-blue-500/20 rounded-xl">
                          <p className="font-bold text-sm text-blue-800 dark:text-blue-300">
                            💡 Como fazer:
                          </p>
                          <p className="text-sm text-blue-900/80 dark:text-blue-300 mt-2">
                            Passe o olho rapidamente do topo até a base do
                            texto, focando no centro da mancha de texto,
                            pescando substantivos e verbos fortes.
                          </p>
                        </div>
                      </div>
                    ),
                  },
                  {
                    titulo: "Skimming",
                    icone: "🏄",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-foreground">
                          O <strong>Skimming</strong> ("deslizar" sobre o texto)
                          visa captar a <strong>ideia principal</strong> ou o
                          tema central rapidamente.
                        </p>
                        <div className="bg-indigo-500/10 p-4 border border-indigo-500/20 rounded-xl">
                          <p className="font-bold text-sm text-indigo-800 dark:text-indigo-300">
                            💡 Como fazer:
                          </p>
                          <p className="text-sm text-indigo-900/80 dark:text-indigo-300 mt-2">
                            Leia apenas o título, subtítulos, o primeiro
                            parágrafo e a primeira linha de cada parágrafo
                            subsequente.
                          </p>
                        </div>
                      </div>
                    ),
                  },
                  {
                    titulo: "Scanning",
                    icone: "🔍",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-foreground">
                          O <strong>Scanning</strong> ("escanear" o texto) serve
                          para encontrar uma{" "}
                          <strong>informação específica</strong> previamente
                          solicitada pela questão (uma data, um nome, um valor).
                        </p>
                        <div className="bg-emerald-500/10 p-4 border border-emerald-500/20 rounded-xl">
                          <p className="font-bold text-sm text-emerald-800 dark:text-emerald-300">
                            💡 Como fazer:
                          </p>
                          <p className="text-sm text-emerald-900/80 dark:text-emerald-300 mt-2">
                            Não leia para entender. Aja como um radar procurando
                            aquele termo exato no meio das palavras.
                          </p>
                        </div>
                      </div>
                    ),
                  },
                ]}
              />
            </section>

            {/* SEÇÃO 2: ARMADILHAS */}
            <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="w-14 h-14 rounded-full bg-red-500/20 flex items-center justify-center text-3xl font-bold text-red-700 dark:text-red-400">
                  2
                </span>
                As "Três Portas do Erro" na Interpretação
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-4 right-4 text-red-500/20 group-hover:scale-125 transition-transform duration-500">
                    <LuTriangleAlert size={48} />
                  </div>
                  <h4 className="text-xl font-bold text-red-600 mb-3">
                    Extrapolação
                  </h4>
                  <p className="text-sm text-red-900/70 dark:text-red-300">
                    Quando você traz o "que sabe de casa" para a prova. Se o
                    texto não disse, é falso!
                  </p>
                </div>
                <div className="p-6 bg-orange-500/5 border border-orange-500/20 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-4 right-4 text-orange-500/20 group-hover:scale-125 transition-transform duration-500">
                    <LuPause size={48} />
                  </div>
                  <h4 className="text-xl font-bold text-orange-600 mb-3">
                    Redução
                  </h4>
                  <p className="text-sm text-orange-900/70 dark:text-orange-300">
                    O texto diz algo amplo, e a alternativa foca em apenas um
                    detalhe como se fosse o todo.
                  </p>
                </div>
                <div className="p-6 bg-rose-500/5 border border-rose-500/20 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-4 right-4 text-rose-500/20 group-hover:scale-125 transition-transform duration-500">
                    <LuSkipBack size={48} />
                  </div>
                  <h4 className="text-xl font-bold text-rose-600 mb-3">
                    Contradição
                  </h4>
                  <p className="text-sm text-rose-900/70 dark:text-rose-300">
                    A alternativa afirma o oposto do que o autor defendeu ou
                    sugeriu nas entrelinhas.
                  </p>
                </div>
              </div>
            </section>

            {/* SEÇÃO 3: DESAFIO PRÁTICO */}
            <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="w-14 h-14 rounded-full bg-indigo-500/20 flex items-center justify-center text-3xl font-bold text-indigo-700 dark:text-indigo-400">
                  3
                </span>
                Desafio Prático: Laboratório de Gabarito
              </h2>
              {shuffledChallenges.length > 0 && (
                <div className="space-y-8">
                  <div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
                    key={`challenge-${challengeIndex}`}
                  >
                    <div className="space-y-3">
                      <h4 className="font-bold text-red-500 flex items-center gap-2">
                        ❌ Onde a maioria erra:
                      </h4>
                      <div className="h-full min-h-[180px] p-6 bg-gradient-to-br from-red-50 to-rose-50 border border-red-100 rounded-2xl flex items-center justify-center dark:from-red-900/10 dark:to-rose-900/10">
                        <p className="line-through text-lg text-red-800/70 font-medium decoration-red-500/50">
                          "{shuffledChallenges[challengeIndex].wrong}"
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-bold text-emerald-500 flex items-center gap-2">
                        ✅ Como você vai acertar:
                      </h4>
                      <div className="h-full min-h-[180px] p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl flex flex-col justify-center dark:from-emerald-900/10 dark:to-teal-900/10">
                        <p className="text-lg font-bold text-emerald-800 mb-4 text-center">
                          "{shuffledChallenges[challengeIndex].correct}"
                        </p>
                        <div className="p-4 bg-white/60 rounded-xl border border-emerald-100/50 backdrop-blur-sm flex items-start gap-3 dark:bg-black/20">
                          <span className="text-lg">💡</span>{" "}
                          <p className="text-sm font-medium leading-relaxed text-emerald-700">
                            {shuffledChallenges[challengeIndex].explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center gap-4">
                    <Button
                      variant="outline"
                      onClick={() =>
                        setChallengeIndex(
                          (prev) => (prev + 1) % shuffledChallenges.length,
                        )
                      }
                      className="rounded-full px-8 py-6 font-bold text-lg shadow-xl shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all"
                    >
                      🔄 Próximo Desafio
                    </Button>
                  </div>
                </div>
              )}
            </section>

            {/* SEÇÃO 3: RESUMO E MULTIMÍDIA */}
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={3}
                title="Resumo e Multimídia"
                variant="indigo"
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
                            videoId="B9v8iK4R50U"
                            title="Estratégias para Cesgranrio"
                            duration="18:45"
                            thumbnail="https://images.unsplash.com/photo-1454165833767-027ffea9e77b?q=80&w=1000&auto=format&fit=crop"
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
                        images={[
                          {
                            imageUrl: "/images/mapa-mental/inter_m3_rota.png",
                            title: "A Rota da Varredura",
                            type: "Guia",
                            placeholderColor:
                              "bg-indigo-100 dark:bg-indigo-900/30",
                          },
                          {
                            imageUrl: "/images/mapa-mental/inter_m3_cone.png",
                            title: "O Cone do Contexto",
                            type: "Infográfico",
                            placeholderColor: "bg-blue-100 dark:bg-blue-900/30",
                          },
                          {
                            imageUrl:
                              "/images/mapa-mental/inter_m3_extrapolacao.png",
                            title: "Extrapolação vs Redução",
                            type: "Comparação",
                            placeholderColor: "bg-red-100 dark:bg-red-900/30",
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
                      <div className="text-center p-8 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl border border-indigo-500/10">
                        <h3 className="text-xl font-bold text-foreground mb-4">
                          O Filtro do Gabarito
                        </h3>
                        <div className="text-7xl my-8 animate-spin-slow">
                          💎 🛡️ 🎯
                        </div>
                        <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                          "Nem mais (Extrapolação), nem menos (Redução), nem o
                          oposto (Contradição). Fique na Verdaaaaaade do Texto!"
                        </p>
                      </div>
                    ),
                  },
                  {
                    id: "audio",
                    label: "Áudio Resumo",
                    icon: LuVolume2,
                    content: (
                      <div className="w-full flex justify-center py-4">
                        <div className="w-full max-w-md">
                          <MusicPlayerCard
                            audioUrl="#"
                            titulo="O Filtro Final"
                            artista="Elite Team"
                            capaUrl="https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1000&auto=format&fit=crop"
                            lyrics={`(Refrão)
                                                        Cuidado com a porta, não deixe entrar!
                                                        O erro lá fora quer te derrubar.
                                                        
                                                        (Ponte)
                                                        Extrapolou? Perdeu a questão.
                                                        Reduziu? Caiu no chão.
                                                        Contradisse? Sem perdão!`}
                          />
                        </div>
                      </div>
                    ),
                  },
                ]}
              />
            </section>

            {/* SEÇÃO 4: SIMULADO FINAL M3 */}
            <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
              <ModuleSectionHeader
                index={4}
                title="Quiz de Fixação - Estratégias de Elite"
                variant="amber"
              />
              <QuizInterativo
                questoes={quizM3}
                titulo="Quiz de Fixação - Estratégias de Elite"
                icone="🏆"
                onComplete={(score) =>
                  handleModuleProgress("modulo-3", 2, score)
                }
              />
            </section>
          </TabsContent>

          {/* ─── MÓDULO 4: COERÊNCIA E PROGRESSÃO ─── */}
          <TabsContent
            value="modulo-4"
            className="space-y-12 max-w-7xl mx-auto px-6 mt-12"
          >
            <ModuleBanner
              numero={4}
              titulo="Coerência e Progressão"
              descricao="A fluidez do texto corporativo: amarração de ideias e progressão temática."
              gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
            />

            {/* SEÇÃO 1: COERÊNCIA GLOBAL ACELERADA */}
            <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={1}
                title="Os 3 Policiamentos da Leitura"
                variant="emerald"
              />
              <p className="text-muted-foreground text-lg mb-6">
                Um texto bem desenvolvido na prova discursiva e avaliado nas
                questões de reescritura precisa atender a 3 leis universais da
                coerência:
              </p>
              <div className="space-y-6">
                <ContentAccordion
                  titulo="1. Princípio da Não Contradição"
                  icone={<LuScale className="text-emerald-500" />}
                  corIndicador="bg-emerald-500"
                  slides={[
                    {
                      titulo: "Conceito e Lógica Interna",
                      icone: "⚖️",
                      conteudo: (
                        <div className="grid grid-cols-1 gap-6">
                          <div className="space-y-4">
                            <h4 className="font-bold text-emerald-700 dark:text-emerald-400">
                              O que é?
                            </h4>
                            <p className="text-muted-foreground leading-relaxed">
                              A coerência de um texto depende da harmonia entre
                              suas partes. Um texto não pode afirmar um fato no
                              início e negá-lo ou apresentar uma conclusão que o
                              invalide posteriormente. Bancas como FGV e
                              Cesgranrio exploram isso em questões de
                              substituição de conectivos.
                            </p>
                          </div>
                          <div className="bg-emerald-500/5 p-5 rounded-xl border border-emerald-500/10">
                            <h4 className="font-bold text-emerald-800 dark:text-emerald-300 mb-2">
                              Exemplificação na Reescritura:
                            </h4>
                            <div className="space-y-2 text-sm italic">
                              <p className="text-red-600 dark:text-red-400 line-through">
                                Errado: "A Petrobras aumentou a produção;{" "}
                                <b>porém</b>, os números subiram." (Contradição:
                                'porém' indica oposição onde deveria haver
                                conclusão/causa).
                              </p>
                              <p className="text-emerald-600 dark:text-emerald-400">
                                Correto: "A Petrobras aumentou a produção;{" "}
                                <b>por conseguinte</b>, os números subiram."
                              </p>
                            </div>
                          </div>
                          <div className="bg-amber-500/5 p-4 rounded-xl border border-amber-500/10">
                            <p className="text-amber-800 dark:text-amber-300 text-sm">
                              <span className="font-bold">⚠️ Atenção:</span> A
                              contradição muitas vezes é sutil, escondida em
                              adjetivos ou advérbios que alteram a carga
                              semântica da frase anterior.
                            </p>
                          </div>
                        </div>
                      ),
                    },
                  ]}
                />

                <ContentAccordion
                  titulo="2. Progressão e Continuidade Temática"
                  icone={<LuTrendingUp className="text-blue-500" />}
                  corIndicador="bg-blue-500"
                  slides={[
                    {
                      titulo: "Encadeamento 'Dado-Novo'",
                      icone: "📈",
                      conteudo: (
                        <div className="grid grid-cols-1 gap-6">
                          <div className="space-y-4">
                            <h4 className="font-bold text-blue-700 dark:text-blue-400">
                              Conceituação:
                            </h4>
                            <p className="text-muted-foreground leading-relaxed">
                              Todo texto de elite deve avançar. A continuidade
                              garante que o assunto seja mantido (Coesão
                              Referencial), enquanto a progressão garante que
                              informações novas sejam adicionadas. Se um texto
                              apenas repete o que já foi dito, ele sofre de
                              "paralisia temática".
                            </p>
                          </div>
                          <div className="bg-blue-500/5 p-5 rounded-xl border border-blue-500/10">
                            <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">
                              Dica de Elite:
                            </h4>
                            <p className="text-sm">
                              Mapeie os parágrafos buscando o "fio da meada".
                              Cada parágrafo deve ser uma ponte para o próximo,
                              nunca uma ilha isolada.
                            </p>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-bold">Exceção / Ruptura:</h4>
                            <p className="text-muted-foreground text-sm">
                              A interrupção brusca da progressão só é aceitável
                              em textos literários para causar choque. Em textos
                              técnicos e dissertativos (padrão Petrobras), a
                              ruptura é erro grave de coerência.
                            </p>
                          </div>
                        </div>
                      ),
                    },
                  ]}
                />

                <ContentAccordion
                  titulo="3. Coerência Externa (Mundo Real)"
                  icone={<LuGlobe className="text-purple-500" />}
                  corIndicador="bg-purple-500"
                  slides={[
                    {
                      titulo: "Verossimilhança e Realidade",
                      icone: "🌍",
                      conteudo: (
                        <div className="grid grid-cols-1 gap-6">
                          <div className="space-y-4">
                            <h4 className="font-bold text-purple-700 dark:text-purple-400">
                              O Filtro da Verdade:
                            </h4>
                            <p className="text-muted-foreground leading-relaxed">
                              O texto deve respeitar as leis do mundo real e do
                              conhecimento compartilhado. Bancas costumam
                              colocar distratores (alternativas erradas) que,
                              embora sintaticamente corretos, afirmam absurdos
                              lógicos ou científicos não amparados pelo texto
                              base.
                            </p>
                          </div>
                          <div className="bg-purple-500/10 p-4 rounded-xl border border-purple-500/20 italic text-sm">
                            "O conhecimento de mundo do candidato não deve
                            substituir o texto, mas deve servir como um alerta
                            para detectar incoerências externas grosseiras."
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-bold">Exemplificação:</h4>
                            <p className="text-muted-foreground text-sm">
                              Se o texto discute "combustíveis fósseis" e uma
                              alternativa afirma que eles são "fontes
                              inesgotáveis de energia limpa", há uma quebra de
                              coerência externa com o conhecimento técnico
                              exigido para o cargo.
                            </p>
                          </div>
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
            </section>

            {/* SEÇÃO 2: REESCRITURA */}
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={2}
                title="Anatomia da Reescritura"
                variant="cyan"
              />
              <p className="text-muted-foreground">
                Analise as armadilhas clássicas em que bancas tentam te
                derrubar:
              </p>
              <CardCarousel
                titulo="Armadilhas Comuns"
                cards={[
                  {
                    icone: "🪤",
                    titulo: "Troca de Voz Verbal",
                    descricao: (
                      <div className="pb-4">
                        "A empresa produziu petróleo" = "O petróleo foi
                        produzido pela empresa". A banca erra o{" "}
                        <b>tempo verbal</b> ("foi" em vez de "será").
                      </div>
                    ),
                    corFundo: "bg-indigo-500/10",
                  },
                  {
                    icone: "🔀",
                    titulo: "Inversão de Sintaxe",
                    descricao: (
                      <div className="pb-4">
                        Ao mover um advérbio para o início da frase, a banca
                        pode alterar o sentido se esquecer a vírgula (Ex:
                        "Somente ele veio" vs "Ele veio, somente").
                      </div>
                    ),
                    corFundo: "bg-rose-500/10",
                  },
                  {
                    icone: "🧲",
                    titulo: "Erro de Regência do Relativo",
                    descricao: (
                      <div className="pb-4">
                        "O projeto <b>que</b> a Petrobras investiu" → Falso! O
                        verbo investir exige "em". O correto é "<b>em que</b> a
                        Petrobras investiu".
                      </div>
                    ),
                    corFundo: "bg-blue-500/10",
                  },
                ]}
              />
            </section>

            {/* SEÇÃO 3: RESUMO E MULTIMÍDIA */}
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={3}
                title="Resumo e Multimídia"
                variant="cyan"
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
                            videoId="B9v8iK4R50U"
                            title="Coerência e Progressão Temática"
                            duration="15:20"
                            thumbnail="https://images.unsplash.com/photo-1454165833767-027ffea9e77b?q=80&w=1000&auto=format&fit=crop"
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
                        images={[
                          {
                            imageUrl:
                              "/images/mapa-mental/inter_m4_mapeamento.png",
                            title: "A Progressão Temática",
                            type: "Infográfico",
                            placeholderColor:
                              "bg-emerald-100 dark:bg-emerald-900/30",
                          },
                          {
                            imageUrl:
                              "/images/mapa-mental/inter_m4_reescritura.png",
                            title: "A Balança da Reescritura",
                            type: "Guia",
                            placeholderColor: "bg-cyan-100 dark:bg-cyan-900/30",
                          },
                          {
                            imageUrl: "/images/mapa-mental/inter_m4_elipse.png",
                            title: "A Arte da Elipse",
                            type: "Esquema",
                            placeholderColor:
                              "bg-indigo-100 dark:bg-indigo-900/30",
                          },
                        ]}
                      />
                    ),
                  },
                ]}
              />
            </section>

            {/* SEÇÃO 4: QUIZ FIXAÇÃO M4 */}
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={4}
                title="Quiz - Coerência e Progressão"
                variant="amber"
              />
              <QuizInterativo
                questoes={quizM4}
                titulo="Quiz - Coerência e Progressão"
                icone="🎯"
                onComplete={(score) =>
                  handleModuleProgress("modulo-4", 3, score)
                }
              />
            </section>
          </TabsContent>

          {/* ─── MÓDULO 5: MARATONA DO GABARITO ─── */}
          <TabsContent
            value="modulo-5"
            className="space-y-12 max-w-7xl mx-auto px-6 mt-12"
          >
            <ModuleBanner
              numero={5}
              titulo="Maratona do Gabarito"
              descricao="Revisão final, simulado e consolidação total do seu domínio textual."
              gradiente="bg-gradient-to-br from-orange-600 via-rose-600 to-red-700"
            />

            {/* SEÇÃO 1: A BÚSSOLA FINAL */}
            <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={1}
                title="Os Comandos Perigosos"
                variant="rose"
              />
              <p className="text-muted-foreground text-lg mb-6">
                Fique atento aos "comandos de morte" (expressões no enunciado
                que mudam completamente o que se procura).
              </p>
              <CardCarousel
                itemsPerView={2}
                titulo="Comandos e Seus Significados"
                cards={[
                  {
                    icone: "🔍",
                    titulo: "Infere-se que...",
                    descricao: (
                      <div className="pb-4">
                        Não está escrito. Você vai precisar deduzir uma verdade
                        inquestionável a partir de uma pista do texto.
                      </div>
                    ),
                    corFundo: "bg-amber-500/10",
                  },
                  {
                    icone: "📝",
                    titulo: "O texto tem o propósito de...",
                    descricao: (
                      <div className="pb-4">
                        Busca pela Tese/Intenção principal do autor. Cuidado com
                        alternativas que resumem só *um* parágrafo.
                      </div>
                    ),
                    corFundo: "bg-emerald-500/10",
                  },
                  {
                    icone: "🚫",
                    titulo: "Exceto / Qual não condiz",
                    descricao: (
                      <div className="pb-4">
                        Atenção máxima! A banca quer o Erro (Extrapolação,
                        Contradição ou Redução). Marque com Tinta Vermelha
                        Mental na prova!
                      </div>
                    ),
                    corFundo: "bg-rose-500/10",
                  },
                ]}
              />
            </section>

            {/* SEÇÃO 2: RESUMO E MULTIMÍDIA */}
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={2}
                title="Resumo e Multimídia"
                variant="amber"
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
                            videoId="B9v8iK4R50U"
                            title="Bússola Final e Pegadinhas"
                            duration="22:15"
                            thumbnail="https://images.unsplash.com/photo-1454165833767-027ffea9e77b?q=80&w=1000&auto=format&fit=crop"
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
                        images={[
                          {
                            imageUrl:
                              "/images/mapa-mental/inter_m5_comandos.png",
                            title: "Comandos Perigosos",
                            type: "Guia",
                            placeholderColor: "bg-rose-100 dark:bg-rose-900/30",
                          },
                          {
                            imageUrl: "/images/mapa-mental/inter_m5_tese.png",
                            title: "Tese vs Argumento",
                            type: "Infográfico",
                            placeholderColor:
                              "bg-amber-100 dark:bg-amber-900/30",
                          },
                          {
                            imageUrl:
                              "/images/mapa-mental/inter_m5_inferencia.png",
                            title: "A Fina Arte de Inferir",
                            type: "Dica Prática",
                            placeholderColor:
                              "bg-orange-100 dark:bg-orange-900/30",
                          },
                        ]}
                      />
                    ),
                  },
                ]}
              />
            </section>

            {/* SEÇÃO 3: SIMULADO DEBATIDO M5 */}
            <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
              <ModuleSectionHeader
                index={3}
                title="Simulado Final: Maratona Cesgranrio"
                variant="rose"
              />
              <QuizInterativo
                questoes={quizM5}
                titulo="Simulado Final: Interpretação Total"
                icone="🏆"
                onComplete={(score) =>
                  handleModuleProgress("modulo-5", 4, score)
                }
              />
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
