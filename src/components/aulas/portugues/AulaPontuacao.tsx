"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect, useCallback } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  FlipCard,
  ContentAccordion,
  CardCarousel,
  QuizInterativo,
  TabbedContent,
  ModuleBanner,
  TimelineItem,
  AlertBox,
  MusicPlayerCard,
  ProgressIndicator,
  QuizQuestion,
  StickyModuleNav,
  ModuleSummaryCarouselNew,
  LessonTabs,
  VideoModal,
  AulaProps,
  AulaTemplate,
  getRandomQuestions,
  ModuleSectionHeader,
} from "../shared";
import {
  LuTriangleAlert as LuAlertTriangle,
  LuCircleCheck as LuCheckCircle,
  LuCircleX as LuXCircle,
  LuQuote,
  LuClock,
  LuBrain,
  LuBookOpen,
  LuCircleAlert as LuAlertCircle,
  LuPenTool,
  LuList,
  LuCirclePlay as LuPlayCircle,
  LuMusic,
  LuCheck,
  LuX,
  LuLockOpen as LuUnlock,
  LuLock,
  LuBan,
  LuGitMerge,
  LuPause,
  LuEye,
  LuLightbulb,
} from "react-icons/lu";

// ── DEFINIÇÃO DOS MÓDULOS ──
const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", titulo: "Fundamentos e Proibições" },
  { id: "modulo-2", label: "Módulo 2", titulo: "Vírgula: Termos da Oração" },
  {
    id: "modulo-3",
    label: "Módulo 3",
    titulo: "Vírgula: Orações e Conjunções",
  },
  { id: "modulo-4", label: "Módulo 4", titulo: "Pontuação Avançada" },
  { id: "modulo-5", label: "Módulo 5", titulo: "Laboratório de Gabarito" },
] as const;

// ── DADOS DO QUIZ POR MÓDULO ──
const QUIZ_M1_POOL: QuizQuestion[] = [
  {
    id: 101,
    pergunta:
      "É permitido separar o Sujeito do Verbo por vírgula na ordem direta?",
    opcoes: [
      { label: "A", valor: "Sempre, para dar ênfase." },
      { label: "B", valor: "Nunca, é erro gramatical grave." },
      { label: "C", valor: "Apenas se o sujeito for longo." },
      { label: "D", valor: "Somente em textos literários." },
    ],
    correta: "B",
    explicacao:
      "Jamais se separa sujeito de verbo ou verbo de complemento na ordem direta com vírgulas.",
  },
  {
    id: 102,
    pergunta: "Na frase 'Estudamos, muito hoje.', a vírgula está:",
    opcoes: [
      { label: "A", valor: "Correta, pois isola o advérbio." },
      {
        label: "B",
        valor: "Incorreta, pois separa o verbo de seu adjunto adverbial curto.",
      },
      { label: "C", valor: "Obrigatória." },
      { label: "D", valor: "Facultativa." },
    ],
    correta: "B",
    explicacao:
      "Não se deve separar o verbo de seus complementos ou adjuntos imediatos com uma única vírgula.",
  },
];

const QUIZ_M2_POOL: QuizQuestion[] = [
  {
    id: 201,
    pergunta: "Qual a função da vírgula na frase: 'João, traga o relatório.'?",
    opcoes: [
      { label: "A", valor: "Isolar um Aposto." },
      { label: "B", valor: "Isolar um Vocativo (Chamamento)." },
      { label: "C", valor: "Separar itens de uma lista." },
      { label: "D", valor: "Indicar elipse do verbo." },
    ],
    correta: "B",
    explicacao: "O vocativo (chamamento) deve SEMPRE ser isolado por vírgula.",
  },
  {
    id: 202,
    pergunta: "Identifique a frase com Aposto corretamente pontuado:",
    opcoes: [
      {
        label: "A",
        valor: "O Rio de Janeiro cidade maravilhosa, recebe turistas.",
      },
      {
        label: "B",
        valor: "O Rio de Janeiro, cidade maravilhosa recebe turistas.",
      },
      {
        label: "C",
        valor: "O Rio de Janeiro, cidade maravilhosa, recebe turistas.",
      },
      {
        label: "D",
        valor: "O Rio de Janeiro cidade maravilhosa recebe, turistas.",
      },
    ],
    correta: "C",
    explicacao: "O aposto explicativo deve vir entre vírgulas.",
  },
];

const QUIZ_M3_POOL: QuizQuestion[] = [
  {
    id: 301,
    pergunta: "A vírgula antes da conjunção 'MAS' é:",
    opcoes: [
      { label: "A", valor: "Facultativa." },
      { label: "B", valor: "Proibida." },
      { label: "C", valor: "Obrigatória (Adversativa)." },
      { label: "D", valor: "Depende do contexto." },
    ],
    correta: "C",
    explicacao:
      "Conjunções adversativas (mas, porém, contudo...) exigem vírgula antes.",
  },
];

const QUIZ_M4_POOL: QuizQuestion[] = [
  {
    id: 401,
    pergunta:
      "Para que servem os DOIS-PONTOS (:) na frase: 'Só desejo uma coisa: paz.'?",
    opcoes: [
      { label: "A", valor: "Indicar uma pausa longa." },
      {
        label: "B",
        valor: "Introduzir um esclarecimento ou aposto enumerativo.",
      },
      { label: "C", valor: "Substituir o ponto final." },
      { label: "D", valor: "Marcar uma pergunta." },
    ],
    correta: "B",
    explicacao: "Os dois-pontos introduzem explicações, enumerações ou falas.",
  },
];

const QUIZ_FINAL_POOL: QuizQuestion[] = [
  {
    id: 501,
    pergunta: "Assinale a alternativa com pontuação IMPECÁVEL:",
    opcoes: [
      { label: "A", valor: "Os alunos, que estudam, passam." },
      { label: "B", valor: "Os alunos que estudam passam." },
      { label: "C", valor: "Ontem à noite, fomos ao cinema." },
      {
        label: "D",
        valor: "Todas as acima podem estar corretas dependendo da intenção.",
      },
    ],
    correta: "D",
    explicacao:
      "A pontuação pode mudar o sentido (Adjetiva Explicativa vs Restritiva) ou ser facultativa (Adjunto Adverbial curto).",
  },
];

export default function AulaPontuacao({
  titulo,
  descricao,
  duracao,
  materiaNome,
  materiaCor,
  materiaId,
  prevTopico,
  nextTopico,
  onComplete,
  isCompleted, // mapped from 'completed' prop if needed
  loading,
  xpGanho = 50,
  currentProgress,
  onUpdateProgress,
}: AulaProps) {
  // Use the props instead of internal useAulaProgress if possible,
  // but keep logical state for local progress if needed.
  // Actually, AulaProps usually comes from the parent (page.tsx).
  const [quizM1, setQuizM1] = useState<QuizQuestion[]>([]);
  const [quizM2, setQuizM2] = useState<QuizQuestion[]>([]);
  const [quizM3, setQuizM3] = useState<QuizQuestion[]>([]);
  const [quizM4, setQuizM4] = useState<QuizQuestion[]>([]);
  const [quizFinal, setQuizFinal] = useState<QuizQuestion[]>([]);
  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(),
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
  }, [currentProgress, hasSyncedInitial, loading]);

  useEffect(() => {
    if (!loading) {
      setQuizM1(getRandomQuestions(QUIZ_M1_POOL, 8));
      setQuizM2(getRandomQuestions(QUIZ_M2_POOL, 8));
      setQuizM3(getRandomQuestions(QUIZ_M3_POOL, 8));
      setQuizM4(getRandomQuestions(QUIZ_M4_POOL, 8));
      setQuizFinal(getRandomQuestions(QUIZ_FINAL_POOL, 8));
    }
  }, [loading]);

  const isModuleUnlocked = useCallback((moduleIndex: number) => {
    return true; // DESBLOQUEADO TEMPORARIAMENTE PARA TESTES
  }, []);

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

      // Se for o último módulo, finaliza aula
      if (index === MODULE_DEFS.length - 1) {
        onComplete?.();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Avança para o próximo
        setActiveTab(MODULE_DEFS[index + 1].id);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
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
      {/* === MÓDULO 1: SINTAXE E FUNDAMENTOS === */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="Sintaxe e Fundamentos"
          descricao="A base de tudo: por que a vírgula não é um respiro?"
          gradiente="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-600"
        />

        {/* 1.1 DESAFIO INICIAL */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            title="Desafio Inicial: Vírgula ou Pausa?"
            description="Clique nos cards para testar seu instinto gramatical."
            variant="indigo"
            className="mb-8"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <p className="text-lg text-foreground leading-relaxed">
                Muitas vezes, a nossa fala nos engana. O cérebro pede uma pausa
                onde a gramática **proíbe** terminantemente uma vírgula.
              </p>
              <AlertBox tipo="warning" titulo="O Grande Perigo">
                Na prova da Petrobras, a banca adora colocar sujeitos longos
                para forçar você a querer "respirar".
              </AlertBox>
            </div>

            <FlipCard
              frente={
                <div className="p-8 flex flex-col items-center justify-center text-center h-full space-y-4">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center text-2xl">
                    ?
                  </div>
                  <p className="font-bold text-lg">
                    "Os novos funcionários da plataforma P-70, chegaram hoje."
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Esta frase está correta?
                  </p>
                </div>
              }
              verso={
                <div className="p-8 flex flex-col items-center justify-center text-center h-full space-y-4 bg-red-50 dark:bg-red-900/20">
                  <LuXCircle className="w-14 h-14 text-red-500" />
                  <h4 className="font-bold text-red-700 dark:text-red-400 text-xl">
                    ERRADO!
                  </h4>
                  <p className="text-sm">
                    Você sentiu vontade de colocar a vírgula por causa do
                    tamanho do sujeito, mas **NÃO SE SEPARA SUJEITO DO VERBO**.
                  </p>
                </div>
              }
            />
          </div>
        </section>

        {/* 1.2 A ORDEM SAGRADA */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={2}
            title="A Ordem Sagrada: S-V-C"
            description="O pilar mestre da sintaxe portuguesa."
            variant="indigo"
            className="mb-8"
          />

          <ContentAccordion
            titulo="Dominando os Elementos Essenciais"
            icone={<LuBrain />}
            corIndicador="bg-blue-500"
            defaultOpen={true}
            slides={[
              {
                titulo: "1️⃣ O SUJEITO (S)",
                icone: "👤",
                conteudo: (
                  <div className="space-y-6">
                    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                      <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center text-sm font-bold">
                          S
                        </span>
                        Quem realiza ou sofre a ação?
                      </h4>
                      <p className="text-muted-foreground">
                        É a peça fundamental. A Cesgranrio costuma "engordar" o
                        sujeito com termos explicativos para confundir você.
                      </p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                      <p className="text-sm font-bold text-blue-800 dark:text-blue-300">
                        💡 Exemplo de Sujeito Longo:
                      </p>
                      <p className="italic text-muted-foreground">
                        "**O plano de expansão das refinarias da região
                        sudeste** [S] foi aprovado."
                      </p>
                      <p className="text-[10px] mt-2 text-red-600 uppercase font-bold">
                        Sem vírgula após o sujeito!
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "2️⃣ O VERBO (V)",
                icone: "⚡",
                conteudo: (
                  <div className="space-y-6">
                    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                      <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center text-sm font-bold">
                          V
                        </span>
                        A Ação/Estado
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        O Verbo é a ponte. Ele conecta quem faz (Sujeito) ao que
                        é feito (Complemento). Jamais quebre essa ponte com uma
                        vírgula "solteira".
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-bl-lg font-bold">
                          PROIBIDO
                        </div>
                        <p className="text-red-800 dark:text-red-300 text-sm">
                          ❌ O gerente, informou os lucros.
                        </p>
                      </div>
                      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-bl-lg font-bold">
                          CORRETO
                        </div>
                        <p className="text-green-800 dark:text-green-300 text-sm">
                          ✅ O gerente informou os lucros.
                        </p>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "3️⃣ O COMPLEMENTO (C)",
                icone: "📦",
                conteudo: (
                  <div className="space-y-6">
                    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                      <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center text-sm font-bold">
                          C
                        </span>
                        O Alvo da Ação
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        São os Objetos Diretos e Indiretos. Eles completam o
                        sentido do verbo. Se você os separa, a frase perde o
                        nexo sintático imediato.
                      </p>
                    </div>
                    <AlertBox tipo="warning" titulo="Regra de Ouro">
                      Não importa o tamanho: S-V-C é um bloco atômico. Não se
                      bombardeia com vírgulas.
                    </AlertBox>
                  </div>
                ),
              },
            ]}
          />
        </section>

        {/* 1.3 QUANDO A ORDEM É QUEBRADA */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={3}
            title="Quando a Ordem Muda"
            description="Entenda a Ordem Inversa e onde as vírgulas começam a nascer."
            variant="indigo"
            className="mb-8"
          />

          <p className="text-lg text-muted-foreground leading-relaxed italic border-l-4 border-indigo-500 pl-6 py-2 bg-indigo-500/5 rounded-r-xl">
            "Na Gramática, a vírgula serve para marcar deslocamentos. Se nada
            mudou de lugar, nada de vírgula."
          </p>

          <CardCarousel
            titulo="Tipos de Deslocamento"
            subtitulo="Arraste para entender como a frase se comporta."
            cards={[
              {
                icone: <LuPlayCircle className="text-xl text-amber-500" />,
                titulo: "Adjunto Deslocado",
                descricao: (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-muted-foreground">
                      Quando o tempo ou lugar vem para a frente da frase.
                    </p>
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                      <p className="text-xs text-amber-700 dark:text-amber-400 font-bold">
                        "Ontem, a produção parou."
                      </p>
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      Aqui a vírgula é facultativa por ser curto, mas
                      recomendada.
                    </p>
                  </div>
                ),
              },
              {
                icone: <LuList className="text-xl text-cyan-500" />,
                titulo: "Complemento Anteposto",
                descricao: (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-muted-foreground">
                      Raro, mas cai na banca! Quando o objeto vem antes de tudo.
                    </p>
                    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
                      <p className="text-xs text-cyan-700 dark:text-cyan-400 font-bold">
                        "Esses lucros, ninguém os viu."
                      </p>
                    </div>
                    <p className="text-[10px] text-muted-foreground italic">
                      Chamado de Objeto Direto Pleonástico.
                    </p>
                  </div>
                ),
              },
              {
                icone: <LuQuote className="text-xl text-purple-500" />,
                titulo: "Termos Intercalados",
                descricao: (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-muted-foreground">
                      Uma barreira consciente colocada no meio do fluxo S-V-C.
                    </p>
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                      <p className="text-xs text-purple-700 dark:text-purple-400 font-bold">
                        "O engenheiro, com certeza, virá."
                      </p>
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      Aqui a vírgula serve para isolar a intrusão.
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        {/* 1.4 MITOS VS VERDADES */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={4}
            title="Mito vs. Verdade"
            description="Extermine os vícios que te fazem errar na prova."
            variant="indigo"
            className="mb-8"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FlipCard
              frente={
                <div className="p-4 text-center h-full flex flex-col justify-center border-2 border-dashed border-red-500/30 rounded-xl">
                  <p className="font-bold text-red-600">Mito 1</p>
                  <p className="text-sm">"Sujeito longo pede vírgula."</p>
                </div>
              }
              verso={
                <div className="p-4 text-center h-full flex flex-col justify-center bg-red-500 text-white rounded-xl">
                  <p className="text-sm font-bold">FALSO!</p>
                  <p className="text-xs">
                    Não importa se o sujeito tem 20 palavras. Sem vírgula entre
                    S e V.
                  </p>
                </div>
              }
            />
            <FlipCard
              frente={
                <div className="p-4 text-center h-full flex flex-col justify-center border-2 border-dashed border-blue-500/30 rounded-xl">
                  <p className="font-bold text-blue-600">Mito 2</p>
                  <p className="text-sm">"Vírgula marca apenas o respiro."</p>
                </div>
              }
              verso={
                <div className="p-4 text-center h-full flex flex-col justify-center bg-blue-600 text-white rounded-xl">
                  <p className="text-sm font-bold">FALSO!</p>
                  <p className="text-xs">
                    Existem milhares de pausas na fala que não levam vírgula na
                    escrita.
                  </p>
                </div>
              }
            />
            <FlipCard
              frente={
                <div className="p-4 text-center h-full flex flex-col justify-center border-2 border-dashed border-green-500/30 rounded-xl">
                  <p className="font-bold text-green-600">Mito 3</p>
                  <p className="text-sm">"Antes do 'E' nunca vai vírgula."</p>
                </div>
              }
              verso={
                <div className="p-4 text-center h-full flex flex-col justify-center bg-green-600 text-white rounded-xl">
                  <p className="text-sm font-bold">DEPENDENTE!</p>
                  <p className="text-xs">
                    Vai vírgula se os sujeitos forem diferentes ou em
                    polissíndeto!
                  </p>
                </div>
              }
            />
          </div>
        </section>

        {/* RESUMO MÓDULO 1 */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={5}
            title="Resumo e Multimídia"
            variant="indigo"
            className="mb-8"
          />
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
                        videoId="dQw4w9WgXcQ"
                        title="Sintaxe e Fundação"
                        duration="10:00"
                        thumbnail="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop"
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
                    moduloNome="Sintaxe e Fundamentos"
                    tituloAula="Pontuação"
                    materia="Língua Portuguesa"
                    images={[
                      {
                        title: "A Ordem Direta (S-V-C)",
                        type: "Mapa Mental",
                        placeholderColor: "bg-indigo-100 dark:bg-indigo-900/30",
                      },
                      {
                        title: "Mito do Respiro",
                        type: "Alerta",
                        placeholderColor: "bg-red-100 dark:bg-red-900/30",
                      },
                      {
                        title: "O Bloco Atômico",
                        type: "Esquema",
                        placeholderColor: "bg-blue-100 dark:bg-blue-900/30",
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
                  <div className="text-center p-8 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl border border-indigo-500/10">
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      A Muralha do Sujeito
                    </h3>
                    <div className="text-7xl my-8 animate-bounce">🏰 🛡️ ❌</div>
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                      "O sujeito pode ser um trem, pode ser um caminhão. Mas
                      separar do verbo? A resposta é NÃO!"
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
                        titulo="Sintaxe de Ouro"
                        artista="Gramática Beat"
                        capaUrl="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop"
                        lyrics="(Verso) S é quem faz, V é a ponte. (Refrão) Não bota a vírgula, não quebra a corrente. S-V-C é o bloco da gente!"
                      />
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </section>

        {/* QUIZ MÓDULO 1 */}
        <section className="mt-8">
          <QuizInterativo
            questoes={quizM1}
            titulo="Quiz de Fixação: Fundamentos"
            numero={6}
            variant="indigo"
            icone="🧠"
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          />
        </section>
      </TabsContent>

      {/* ─── MÓDULO 2: TERMOS DA ORAÇÃO ─── */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={2}
            titulo="Vírgula: Termos da Oração"
            descricao="Aprenda a isolar Vocativos, Apostos e separar Enumerações corretamente."
            gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              variant="emerald"
              index={1}
              title="Vocativo e Aposto"
              description="Dois termos que quase sempre exigem a proteção das vírgulas."
            />

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                <h4 className="font-bold text-emerald-700 mb-2">
                  Vocativo (Chamamento)
                </h4>
                <p className="text-sm opacity-80 mb-4">
                  É a palavra usada para chamar alguém. Sempre isolada!
                </p>
                <p className="text-xs font-mono bg-white/50 p-2 rounded">
                  Ex: Maria, traga o café.
                </p>
              </div>
              <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                <h4 className="font-bold text-emerald-700 mb-2">
                  Aposto Explicativo
                </h4>
                <p className="text-sm opacity-80 mb-4">
                  Explica um termo anterior. Sempre entre vírgulas.
                </p>
                <p className="text-xs font-mono bg-white/50 p-2 rounded">
                  Ex: Pelé, o rei do futebol, partiu.
                </p>
              </div>
            </div>
          </section>

          <QuizInterativo
            titulo="Quiz - Termos da Oração"
            icone="📝"
            numero={2}
            questoes={quizM2}
            variant="emerald"
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          />
        </div>
      </TabsContent>

      {/* ─── MÓDULO 3: ORAÇÕES E CONJUNÇÕES ─── */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={3}
            titulo="Vírgula: Orações e Conjunções"
            descricao="Domine a pontuação em orações adjetivas e antes das conjunções."
            gradiente="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              variant="violet"
              index={1}
              title="O 'Mas' e o 'Que'"
              description="Regras fundamentais para as conjunções que mais caem em prova."
            />

            <ContentAccordion
              titulo="Regras de Ouro"
              corIndicador="bg-violet-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Conjunções Adversativas",
                  icone: "⚖️",
                  conteudo:
                    "Mas, porém, contudo, todavia... Essas conjunções exigem vírgula ANTES.",
                },
                {
                  titulo: "Orações Adjetivas",
                  icone: "🔍",
                  conteudo:
                    "Com vírgula = Explicativa (todos). Sem vírgula = Restritiva (alguns).",
                },
              ]}
            />
          </section>

          <QuizInterativo
            titulo="Quiz - Orações"
            icone="🎯"
            numero={3}
            questoes={quizM3}
            variant="violet"
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </div>
      </TabsContent>

      {/* ─── MÓDULO 4: PONTUAÇÃO AVANÇADA ─── */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={4}
            titulo="Pontuação Avançada"
            descricao="Além da vírgula: Dois-pontos, Ponto e vírgula e Travessões."
            gradiente="bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-10">
            <ModuleSectionHeader
              variant="amber"
              index={1}
              title="Mais que uma Pausa"
              description="Quando usar sinais de pontuação para organizar o pensamento complexo."
            />
            <CardCarousel
              cards={[
                {
                  icone: <LuList className="text-xl text-amber-500" />,
                  titulo: "Dois-pontos (:)",
                  descricao:
                    "Usados para introduzir explicações, enumerações ou citações.",
                },
                {
                  icone: <LuGitMerge className="text-xl text-orange-500" />,
                  titulo: "Ponto e Vírgula (;)",
                  descricao:
                    "Intermediário entre o ponto e a vírgula. Clássico em enumerações longas.",
                },
              ]}
            />
          </section>

          <QuizInterativo
            titulo="Quiz - Sinais Avançados"
            icone="🧪"
            numero={4}
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
            titulo="Laboratório de Gabarito"
            descricao="Desafio final de pontuação com questões integradas."
            gradiente="bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700"
          />

          <section className="bg-card rounded-2xl border border-border p-10 shadow-sm text-center space-y-8">
            <ModuleSectionHeader
              variant="rose"
              index={1}
              title="Revisão Multimídia"
              description="Consolide seu conhecimento para a prova."
            />

            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Mapa Mental",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      moduloNome="Laboratório de Gabarito"
                      tituloAula="Pontuação"
                      materia="Língua Portuguesa"
                      images={[
                        {
                          title: "Vírgula: Proibições",
                          type: "Esquema",
                          placeholderColor: "bg-rose-900/10",
                        },
                        {
                          title: "Sinais de Pontuação",
                          type: "Infográfico",
                          placeholderColor: "bg-rose-900/10",
                        },
                      ]}
                    />
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            titulo="Simulado Final: Pontuação"
            icone="🏆"
            numero={5}
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
                  Parabéns! Você completou todos os módulos de Pontuação.
                </p>
              </div>

              <Button
                size="lg"
                onClick={() => {
                  if (onComplete) onComplete();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white border-0 font-bold text-lg px-10 py-8 rounded-full shadow-xl shadow-rose-500/20 transition-all hover:scale-105"
              >
                Concluir Aula de Pontuação
              </Button>
            </div>
          </section>
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
