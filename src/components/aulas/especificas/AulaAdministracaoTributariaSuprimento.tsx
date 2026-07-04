"use client";

import { useState } from "react";
import { useAulaProgress } from "@/hooks/useAulaProgress";
import { TabsContent } from "@/components/ui/tabs";
import {
  ModuleConsolidation,
  QuizInterativo,
  ModuleBanner,
  getRandomQuestions,
  AulaProps,
  FlipCard,
  AulaTemplate,
  ModuleSectionHeader,
} from "../shared";
import { getModuleVariant } from "@/lib/moduleColors";
import { LuBookOpen, LuCheck, LuTarget, LuTriangle, LuLayers, LuMessageSquare } from "react-icons/lu";
import { QUIZ_M1 } from "./data/administracao-tributaria-suprimento-quizzes";
import { QUIZ_M2 } from "./data/administracao-tributaria-suprimento-quizzes";
import { QUIZ_M3 } from "./data/administracao-tributaria-suprimento-quizzes";
import { QUIZ_M4 } from "./data/administracao-tributaria-suprimento-quizzes";
import { QUIZ_M5 } from "./data/administracao-tributaria-suprimento-quizzes";
import { QUIZ_M6 } from "./data/administracao-tributaria-suprimento-quizzes";
import { QUIZ_M7 } from "./data/administracao-tributaria-suprimento-quizzes";
import { QUIZ_M8 } from "./data/administracao-tributaria-suprimento-quizzes";
import { QUIZ_M9 } from "./data/administracao-tributaria-suprimento-quizzes";
import { QUIZ_M10 } from "./data/administracao-tributaria-suprimento-quizzes";

const mv = Array.from({ length: 11 }, (_, i) => getModuleVariant(i));

const MODULE_DEFS = Array.from({ length: 10 }, (_, i) => ({
  id: `modulo-${i + 1}`,
  title: `Tópico ${i + 1}`,
  label: `Tópico ${i + 1}`, icon: LuBookOpen
}));

export default function AulaAdministracaoTributariaSuprimento({
  onComplete,
  isCompleted,
  loading,
  xpGanho = 50,
  currentProgress,
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

  const [quizM1] = useState(() => getRandomQuestions(QUIZ_M1, 2));
  const [quizM2] = useState(() => getRandomQuestions(QUIZ_M2, 2));
  const [quizM3] = useState(() => getRandomQuestions(QUIZ_M3, 2));
  const [quizM4] = useState(() => getRandomQuestions(QUIZ_M4, 2));
  const [quizM5] = useState(() => getRandomQuestions(QUIZ_M5, 2));
  const [quizM6] = useState(() => getRandomQuestions(QUIZ_M6, 2));
  const [quizM7] = useState(() => getRandomQuestions(QUIZ_M7, 2));
  const [quizM8] = useState(() => getRandomQuestions(QUIZ_M8, 2));
  const [quizM9] = useState(() => getRandomQuestions(QUIZ_M9, 2));
  const [quizM10] = useState(() => getRandomQuestions(QUIZ_M10, 2));

  const isModuleUnlocked = (index: number) => true;

  const handleModuleComplete = (moduleId: string, _score?: number) => {
    const nextCompleted = new Set(completedModulesList);
    nextCompleted.add(moduleId);
    updateCompletedModules(Array.from(nextCompleted));
    const modNumber = parseInt(moduleId.split("-")[1]);
    if (modNumber < 10) {
      setActiveTab(`modulo-${modNumber + 1}`);
    } else if (modNumber === 10) {
      onComplete?.();
    }
  };

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      titulo={titulo || "Administração Tributária"}
      descricao={descricao || "Conteúdo completo com metodologia C.E.D.E.A"}
      duracao={duracao || "60 min"}
      materiaNome={materiaNome || "Suprimentos"}
      materiaCor={materiaCor || "indigo"}
      materiaId={materiaId || "suprimento"}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
      modules={MODULE_DEFS}
      completedModules={completedModules}
      isModuleUnlocked={isModuleUnlocked}
      onComplete={() => onComplete?.()}
      isCompleted={isCompleted}
    >

      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
        const quizArray = [quizM1, quizM2, quizM3, quizM4, quizM5, quizM6, quizM7, quizM8, quizM9, quizM10][num - 1];
        return (
          <TabsContent key={`mod-${num}`} value={`modulo-${num}`} className="space-y-16 outline-none">
            <ModuleBanner
              numero={num}
              titulo={MODULE_DEFS[num - 1].title}
              variant={mv[num]}
              descricao={`Aprofundamento conceitual do Módulo ${num}.`}
            />

            <section className="space-y-8">
              <ModuleSectionHeader index="INTRO" title={`Introdução ao Módulo ${num}`} variant={mv[num]} />
              
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start my-8">
                <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
                  <p><strong>Contexto:</strong> Placeholder do parágrafo 1 de 10 (C.E.D.E.A). Texto a ser gerado em breve.</p>
                  <p><strong>Contexto:</strong> Placeholder do parágrafo 2 de 10.</p>
                  <p><strong>Explicação:</strong> Placeholder do parágrafo 3 de 10.</p>
                  <p><strong>Explicação:</strong> Placeholder do parágrafo 4 de 10.</p>
                  <p><strong>Demonstração:</strong> Placeholder do parágrafo 5 de 10.</p>
                  <p><strong>Demonstração:</strong> Placeholder do parágrafo 6 de 10.</p>
                  <p><strong>Expansão:</strong> Placeholder do parágrafo 7 de 10.</p>
                  <p><strong>Expansão:</strong> Placeholder do parágrafo 8 de 10.</p>
                  <p><strong>Aplicação:</strong> Placeholder do parágrafo 9 de 10 (foco CESGRANRIO).</p>
                  <p><strong>Aplicação:</strong> Placeholder do parágrafo 10 de 10.</p>
                </div>
                
                <div className="shrink-0 space-y-2 w-full max-w-[320px] mx-auto lg:mx-0">
                  <div 
                    className="cursor-zoom-in hover:scale-[1.02] transition-transform duration-200"
                    onClick={() => setZoomedImage(`/assets/images/suprimento/administracao-tributaria-suprimento/modulo-${num}/m${num}-intro.png`)}
                  >
                    <img
                      src={`/assets/images/suprimento/administracao-tributaria-suprimento/modulo-${num}/m${num}-intro.png`}
                      // PROMPT: [MANDATÓRIO] Descreva o que aparecerá na imagem gerada pelo Nano Banana. Estilo Dark Premium, fundo (#0a0f1d), proporção 1:1. NÃO inclua textos em inglês sob nenhuma hipótese.
                      alt="Ilustração do conceito"
                      className="w-full rounded-2xl border border-border/20 shadow-lg"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">Fig {num}. Representação visual.</p>
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <ModuleSectionHeader index="FLIP" title="Conceitos Essenciais" variant={mv[num]} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FlipCard
                  categoria="Conceito 1"
                  variant={mv[num]}
                  frente={
                    <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                      <div className={`p-4 bg-${mv[num]}-500/10 rounded-full shadow-inner ring-1 ring-${mv[num]}-500/20`}>
                        <LuCheck className={`w-12 h-12 text-${mv[num]}-500`} />
                      </div>
                      <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                        O que é X?
                      </span>
                    </div>
                  }
                  verso={
                    <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                      <div className={`flex items-center gap-2 text-${mv[num]}-500 font-bold border-b border-${mv[num]}-500/10 pb-3`}>
                        <LuCheck className="w-5 h-5 shrink-0" />
                        <span className="tracking-widest uppercase text-xs">Conceito 1</span>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Definição aprofundada de X, suas causas e efeitos no ambiente.
                      </p>
                    </div>
                  }
                />
                <FlipCard
                  categoria="Conceito 2"
                  variant={mv[num]}
                  frente={
                    <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                      <div className={`p-4 bg-${mv[num]}-500/10 rounded-full shadow-inner ring-1 ring-${mv[num]}-500/20`}>
                        <LuTarget className={`w-12 h-12 text-${mv[num]}-500`} />
                      </div>
                      <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                        O que é Y?
                      </span>
                    </div>
                  }
                  verso={
                    <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                      <div className={`flex items-center gap-2 text-${mv[num]}-500 font-bold border-b border-${mv[num]}-500/10 pb-3`}>
                        <LuCheck className="w-5 h-5 shrink-0" />
                        <span className="tracking-widest uppercase text-xs">Conceito 2</span>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Definição aprofundada de Y, suas causas e efeitos no ambiente.
                      </p>
                    </div>
                  }
                />
                <FlipCard
                  categoria="Conceito 3"
                  variant={mv[num]}
                  frente={
                    <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                      <div className={`p-4 bg-${mv[num]}-500/10 rounded-full shadow-inner ring-1 ring-${mv[num]}-500/20`}>
                        <LuTriangle className={`w-12 h-12 text-${mv[num]}-500`} />
                      </div>
                      <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                        O que é Z?
                      </span>
                    </div>
                  }
                  verso={
                    <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                      <div className={`flex items-center gap-2 text-${mv[num]}-500 font-bold border-b border-${mv[num]}-500/10 pb-3`}>
                        <LuCheck className="w-5 h-5 shrink-0" />
                        <span className="tracking-widest uppercase text-xs">Conceito 3</span>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Definição aprofundada de Z, suas causas e efeitos no ambiente.
                      </p>
                    </div>
                  }
                />
                <FlipCard
                  categoria="Análise 1"
                  variant={mv[num]}
                  frente={
                    <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                      <div className={`p-4 bg-${mv[num]}-500/10 rounded-full shadow-inner ring-1 ring-${mv[num]}-500/20`}>
                        <LuLayers className={`w-12 h-12 text-${mv[num]}-500`} />
                      </div>
                      <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                        Como analisar A?
                      </span>
                    </div>
                  }
                  verso={
                    <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                      <div className={`flex items-center gap-2 text-${mv[num]}-500 font-bold border-b border-${mv[num]}-500/10 pb-3`}>
                        <LuCheck className="w-5 h-5 shrink-0" />
                        <span className="tracking-widest uppercase text-xs">Análise 1</span>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Análise prática e memorização estruturada do conceito A.
                      </p>
                    </div>
                  }
                />
                <FlipCard
                  categoria="Análise 2"
                  variant={mv[num]}
                  frente={
                    <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                      <div className={`p-4 bg-${mv[num]}-500/10 rounded-full shadow-inner ring-1 ring-${mv[num]}-500/20`}>
                        <LuMessageSquare className={`w-12 h-12 text-${mv[num]}-500`} />
                      </div>
                      <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                        Como analisar B?
                      </span>
                    </div>
                  }
                  verso={
                    <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                      <div className={`flex items-center gap-2 text-${mv[num]}-500 font-bold border-b border-${mv[num]}-500/10 pb-3`}>
                        <LuCheck className="w-5 h-5 shrink-0" />
                        <span className="tracking-widest uppercase text-xs">Análise 2</span>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Análise prática e memorização estruturada do conceito B.
                      </p>
                    </div>
                  }
                />
                <FlipCard
                  categoria="Análise 3"
                  variant={mv[num]}
                  frente={
                    <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                      <div className={`p-4 bg-${mv[num]}-500/10 rounded-full shadow-inner ring-1 ring-${mv[num]}-500/20`}>
                        <LuBookOpen className={`w-12 h-12 text-${mv[num]}-500`} />
                      </div>
                      <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                        Como analisar C?
                      </span>
                    </div>
                  }
                  verso={
                    <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                      <div className={`flex items-center gap-2 text-${mv[num]}-500 font-bold border-b border-${mv[num]}-500/10 pb-3`}>
                        <LuCheck className="w-5 h-5 shrink-0" />
                        <span className="tracking-widest uppercase text-xs">Análise 3</span>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Análise prática e memorização estruturada do conceito C.
                      </p>
                    </div>
                  }
                />
              </div>
            </section>
            
            <ModuleConsolidation
              index={num}
              moduloNumero={num}
              variant={mv[num]}
              sinteseEstrategica={{ title: "Resumo Estratégico", content: `Foco total na CESGRANRIO para o módulo ${num}.` }}
              podcast={{
            aulaId: "administracaotributaria",
            aulaTitulo: "Administracao Tributaria",
            materia: "suprimento",
            materiaId: "suprimento",
            moduloNumero: 1,
            moduloTitulo: "Módulo 1",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
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
