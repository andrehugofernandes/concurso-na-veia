"use client";
import { useAulaProgress } from "@/hooks/useAulaProgress";
import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  ModuleConsolidation,
  AlertBox,
  QuizInterativo,
  ModuleBanner,
  getRandomQuestions,
  AulaProps,
  FlipCard,
  AulaTemplate,
  ModuleSectionHeader,
} from "../shared";
import { getModuleVariant } from "@/lib/moduleColors";
import {
  LuBookOpen,
  LuMessageSquare,
  LuTarget,
  LuCheck,
  LuLayers,
  LuTriangle
} from "react-icons/lu";

import {
  QUIZ_M1_CONCEITOS,
  QUIZ_M2_FREQUENCIA,
  QUIZ_M3_GRAFICOS,
  QUIZ_M4_MEDIA_SIMPLES,
  QUIZ_M5_MEDIA_PONDERADA,
  QUIZ_M6_MODA,
  QUIZ_M7_MEDIANA,
  QUIZ_M8_VARIANCIA,
  QUIZ_M9_DESVIO_PADRAO,
  QUIZ_M10_SIMULADO,
} from "./data/semantica-quizzes"; // I will create this file later

const mv = Array.from({ length: 11 }, (_, i) => getModuleVariant(i));

export default function AulaSemantica({
  onComplete,
  isCompleted,
  loading,
  xpGanho = 50,
  currentProgress,
  onUpdateProgress,
  titulo,
  descricao,
  duracao,
  materiaNome,
  materiaCor,
  materiaId,
  prevTopico,
  nextTopico,
}: AulaProps) {
  const [activeTab, setActiveTab] = useState("modulo-1");
  const { completedModules: completedModulesList, updateCompletedModules } = useAulaProgress();
  const completedModules = new Set(completedModulesList);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const [quizM1] = useState(() => getRandomQuestions(QUIZ_M1_CONCEITOS, 2));
  const [quizM2] = useState(() => getRandomQuestions(QUIZ_M2_FREQUENCIA, 2));
  const [quizM3] = useState(() => getRandomQuestions(QUIZ_M3_GRAFICOS, 2));
  const [quizM4] = useState(() => getRandomQuestions(QUIZ_M4_MEDIA_SIMPLES, 2));
  const [quizM5] = useState(() => getRandomQuestions(QUIZ_M5_MEDIA_PONDERADA, 2));
  const [quizM6] = useState(() => getRandomQuestions(QUIZ_M6_MODA, 2));
  const [quizM7] = useState(() => getRandomQuestions(QUIZ_M7_MEDIANA, 2));
  const [quizM8] = useState(() => getRandomQuestions(QUIZ_M8_VARIANCIA, 2));
  const [quizM9] = useState(() => getRandomQuestions(QUIZ_M9_DESVIO_PADRAO, 2));
  const [quizM10] = useState(() => getRandomQuestions(QUIZ_M10_SIMULADO, 2));

  const isModuleUnlocked = (_index: number) => true;

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) {
      const nextCompleted = new Set(completedModules);
      nextCompleted.add(moduleId);
      updateCompletedModules(Array.from(nextCompleted));
      const idx = [
        "modulo-1", "modulo-2", "modulo-3", "modulo-4", "modulo-5",
        "modulo-6", "modulo-7", "modulo-8", "modulo-9", "modulo-10",
      ].findIndex((m) => m === moduleId);
      const pct = Math.round(((idx + 1) / 10) * 100);
      onUpdateProgress?.(pct);
      if (idx < 9) setTimeout(() => setActiveTab(`modulo-${idx + 2}`), 1500);
    }
  };

  useEffect(() => {
    if (currentProgress && currentProgress > 0) {
      const count = Math.floor((currentProgress / 100) * 10);
      const s = new Set<string>();
      for (let i = 1; i <= count; i++) s.add(`modulo-${i}`);
      updateCompletedModules(Array.from(s));
    }
  }, [currentProgress]);

  const MODULE_DEFS = [
    { id: "modulo-1", label: "Módulo 1", title: "Sinônimos e Antônimos" },
    { id: "modulo-2", label: "Módulo 2", title: "Homônimos e Parônimos" },
    { id: "modulo-3", label: "Módulo 3", title: "Ambiguidade" },
    { id: "modulo-4", label: "Módulo 4", title: "Polissemia" },
    { id: "modulo-5", label: "Módulo 5", title: "Denotação e Conotação" },
    { id: "modulo-6", label: "Módulo 6", title: "Sentido Figurado" },
    { id: "modulo-7", label: "Módulo 7", title: "Coesão Semântica" },
    { id: "modulo-8", label: "Módulo 8", title: "Variação Linguística" },
    { id: "modulo-9", label: "Módulo 9", title: "Pragmatismo" },
    { id: "modulo-10", label: "Módulo 10", title: "Simulado Final" },
  ];

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      titulo={titulo || "Semântica"}
      descricao={descricao || "Estudo do significado, sentido das palavras e relações contextuais."}
      duracao={duracao || "60 min"}
      materiaNome={materiaNome || "Português"}
      materiaCor={materiaCor || "indigo"}
      materiaId={materiaId || "portugues"}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
      modules={MODULE_DEFS}
      completedModules={completedModules}
      isModuleUnlocked={isModuleUnlocked}
      onComplete={() => onComplete?.()}
      isCompleted={isCompleted}
    >

      {/* ═══ MÓDULO 1: Sinônimos e Antônimos ═══ */}
      <TabsContent value="modulo-1" className="space-y-16 outline-none">
        <ModuleBanner
          numero={1}
          titulo="Sinônimos e Antônimos"
          variant={mv[1]}
          descricao="A relação de identidade e oposição entre os vocábulos."
        />

        <section className="space-y-8">
          <ModuleSectionHeader index="INTRO" title="O Significado em Jogo" variant={mv[1]} />
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start my-8">
              <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">

            <p>
              A <strong>Semântica</strong> é o ramo da linguística que estuda o significado das palavras e a relação de sentido que elas estabelecem dentro de um contexto. Nas provas da Cesgranrio, especialmente para concursos como o da Petrobras, a cobrança não se restringe à decoreba de vocabulário, mas à capacidade do candidato de perceber as nuances de significado exigidas por um texto corporativo, técnico ou literário.
            </p>
            <p>
              Neste primeiro módulo, focamos nas relações de <strong>Sinonímia e Antonímia</strong>. Sinônimos são palavras com significados semelhantes, mas raramente idênticos. O contexto ditará se a substituição de um vocábulo por outro mantém o sentido original. Por exemplo, "belo" e "bonito" são sinônimos, mas a depender da frase, um se encaixa melhor que o outro, fenômeno chamado de sinonímia contextual.
            </p>
            <p>
              Os antônimos, por sua vez, estabelecem relação de oposição. Palavras como "inclusão" e "exclusão" são antônimos absolutos. A banca costuma apresentar reescrituras de frases usando duplas de negação e antônimos para testar se você percebe a manutenção ou alteração do sentido. "Não é feio" não significa, necessariamente, que "é bonito".
            </p>
            <p>
              A estratégia primaz para resolver essas questões é a leitura integral do período. Substituir a palavra em questão pela sugerida e reler toda a frase para aferir a coesão é vital. O sentido original pretendido pelo autor nunca pode ser subvertido. 
            </p>
            <p>
              A Cesgranrio frequentemente usa trechos de crônicas ou textos jornalísticos e pede a substituição de uma palavra sublinhada por um sinônimo sem prejuízo de sentido. Muitas vezes, a alternativa correta é uma palavra que você não usa no dia a dia, mas que o contexto ajuda a decifrar por eliminação.
            </p>
                        </div>
              
              <div className="shrink-0 space-y-2 w-full max-w-[320px] mx-auto lg:mx-0">
                <div 
                  className="cursor-zoom-in hover:scale-[1.02] transition-transform duration-200"
                  onClick={() => setZoomedImage(`/assets/images/portugues/semantica/modulo-1/m1-intro.png`)}
                >
                  <img
                    src={`/assets/images/portugues/semantica/modulo-1/m1-intro.png`}
                    // PROMPT: [MANDATÓRIO] Descreva o que aparecerá na imagem gerada pelo Nano Banana. Estilo Dark Premium, fundo (#0a0f1d), proporção 1:1. NÃO inclua textos em inglês sob nenhuma hipótese. Represente o conceito de O Significado em Jogo.
                    alt="Ilustração do conceito"
                    className="w-full rounded-2xl border border-border/20 shadow-lg"
                  />
                </div>
                <p className="text-sm text-muted-foreground text-center">Fig 1. Representação visual do conceito.</p>
              </div>
            </div>
        </section>

        <section className="space-y-8">
          <ModuleSectionHeader index={1} title="Relações Semânticas" variant={mv[1]} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-indigo-500/10 rounded-full shadow-inner ring-1 ring-indigo-500/20">
                    <LuLayers className="w-12 h-12 text-indigo-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    Sinônimos
                  </span>
                  <span className="text-sm text-indigo-500/80 font-medium">
                    Semelhança Contextual
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-indigo-500 font-bold border-b border-indigo-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Substituição</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Palavras que podem se substituir no contexto sem alterar a ideia e a correção gramatical do texto.
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    ✅ "Intrépido / Corajoso"
                  </p>
                </div>
              }
              categoria="Semântica"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                  <div className="p-4 bg-red-500/10 rounded-full shadow-inner ring-1 ring-red-500/20">
                    <LuMessageSquare className="w-12 h-12 text-red-500" />
                  </div>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                    Antônimos
                  </span>
                  <span className="text-sm text-red-500/80 font-medium">
                    Oposição Direta
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 text-red-500 font-bold border-b border-red-500/10 pb-3">
                    <LuCheck className="w-5 h-5 shrink-0" />
                    <span className="tracking-widest uppercase text-xs">Opostos</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Palavras que apresentam sentido contrário.
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    ✅ "Efêmero / Duradouro"
                  </p>
                </div>
              }
              categoria="Semântica"
            />
          </div>
        </section>

        <ModuleConsolidation moduloNumero={1}
          index={1}
          variant={mv[1]}
          sinteseEstrategica={{ title: "Resumo Estratégico", content: "Sinônimo não é palavra igual, é palavra de sentido semelhante no CONTEXTO da frase lida." }}
          
          podcast={{
              aulaId: "semantica",
              aulaTitulo: "Semantica",
              materia: "Português",
              materiaId: "portugues",
              moduloNumero: 1,
              moduloTitulo: "Módulo 1",
              conteudoResumo: "Resumo do conteúdo focado nos pontos essenciais da aula para a prova CESGRANRIO."
            }}
          />
        <QuizInterativo
          titulo="Prática: Sinônimos e Antônimos"
          numero={1}
          questoes={quizM1}
          onComplete={(score) => handleModuleComplete("modulo-1", score)}
          variant={mv[1]}
        />
      </TabsContent>

      {/* ═══ MÓDULOS 2 ao 10 ═══ */}
      {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
        const quizArray =
          num === 2 ? quizM2 :
          num === 3 ? quizM3 :
          num === 4 ? quizM4 :
          num === 5 ? quizM5 :
          num === 6 ? quizM6 :
          num === 7 ? quizM7 :
          num === 8 ? quizM8 :
          num === 9 ? quizM9 : quizM10;

        return (
          <TabsContent key={`modulo-${num}`} value={`modulo-${num}`} className="space-y-16 outline-none">
            <ModuleBanner
              numero={num}
              titulo={MODULE_DEFS[num - 1].title}
              variant={mv[num]}
              descricao="Treinamento focado em fenômenos semânticos."
            />
            <section className="space-y-8">
              <ModuleSectionHeader index="INTRO" title={`Sobre ${MODULE_DEFS[num - 1].title}`} variant={mv[num]} />
              <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
                <p>Neste módulo, mergulhamos no conceito de {MODULE_DEFS[num - 1].title}.</p>
                <p>Compreender os sentidos plurais da língua é essencial para a Cesgranrio.</p>
                <p>Observe que o contexto é sempre o senhor do significado.</p>
                <p>Leia cada enunciado com calma, desconfiando de alternativas muito restritivas.</p>
                <p>Sempre faça o teste da substituição integral da frase antes de marcar a resposta.</p>
              </div>
            </section>
            
            <ModuleConsolidation moduloNumero={2}
              index={num}
              variant={mv[num]}
              sinteseEstrategica={{ title: "Resumo Estratégico", content: `Nunca analise uma palavra isolada. O segredo de ${MODULE_DEFS[num - 1].title} é o texto.` }}
              
              podcast={{
              aulaId: "semantica",
              aulaTitulo: "Semantica",
              materia: "Português",
              materiaId: "portugues",
              moduloNumero: 1,
              moduloTitulo: "Módulo 1",
              conteudoResumo: "Resumo do conteúdo focado nos pontos essenciais da aula para a prova CESGRANRIO."
            }}
          />
            <QuizInterativo
              titulo={`Prática: Módulo ${num}`}
              numero={num}
              questoes={quizArray}
              onComplete={(score) => handleModuleComplete(`modulo-${num}`, score)}
              variant={mv[num]}
            />
          </TabsContent>
        );
      })}

      {/* Lightbox Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-md cursor-zoom-out p-4 md:p-8"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img
              src={zoomedImage}
              alt="Imagem ampliada"
              className="max-w-full max-h-full object-contain rounded-2xl border border-border/40 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            />
          </div>
        </div>
      )}

    </AulaTemplate>
  );
}
