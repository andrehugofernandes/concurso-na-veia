"use client";

import { useState } from "react";
import { useAulaProgress } from "@/hooks/useAulaProgress";
import { TabsContent } from "@/components/ui/tabs";
import {
  ModuleConsolidation,
  QuizInterativo,
  ModuleBanner,
  AulaProps,
  FlipCard,
  AulaTemplate,
  ModuleSectionHeader,
} from "../shared";
import * as Icons from "react-icons/lu";
import { LuBookOpen, LuCheck } from "react-icons/lu";

import { QUIZ_MODULES } from "./data/logistica-suprimento-quizzes";
import { MODULE_CONTENTS } from "./data/logistica-suprimento-content";

const mv = ["indigo", "emerald", "amber", "rose", "blue", "violet", "slate", "cyan", "indigo", "emerald", "amber"] as const;

export default function AulaLogisticaSuprimento({
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

  const totalModules = 10;
  
  const MODULE_DEFS = Array.from({ length: totalModules }, (_, i) => ({
    id: `modulo-${i + 1}`,
    label: `${i + 1}`,
    title: MODULE_CONTENTS[i + 1]?.title || `Módulo ${i + 1}`,
  }));

  const handleModuleComplete = (moduleId: string, score: number) => {
    updateCompletedModules([...Array.from(completedModules), moduleId]);
    if (completedModules.size >= totalModules) {
      onComplete?.();
    }
  };

  const isModuleUnlocked = (index: number) => {
    if (index === 0) return true;
    const prevModuleId = `modulo-${index}`;
    return completedModules.has(prevModuleId);
  };

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      xpGanho={xpGanho}
      currentProgress={currentProgress}
      titulo={titulo}
      descricao={descricao}
      duracao={duracao}
      materiaNome={materiaNome}
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
      {Array.from({ length: totalModules }, (_, i) => i + 1).map((num) => {
        const quizArray = QUIZ_MODULES[num] || [];
        const moduleContent = MODULE_CONTENTS[num];
        const variantColor = (mv[num] || "indigo") as "indigo" | "emerald" | "amber" | "rose" | "violet" | "cyan" | "blue" | "slate";

        return (
          <TabsContent key={`mod-${num}`} value={`modulo-${num}`} className="space-y-16 outline-none">
            <ModuleBanner
              numero={num}
              titulo={MODULE_DEFS[num - 1].title}
              variant={variantColor}
              descricao={`Aprofundamento conceitual do Módulo ${num}.`}
            />

            <section className="space-y-8">
              <ModuleSectionHeader index="INTRO" title={`Introdução ao Módulo ${num}`} variant={variantColor} />
              
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start my-8">
                <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
                  {moduleContent?.paragraphs?.map((paragraph: any, idx: number) => (
                    <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph.text }} />
                  ))}
                </div>
                <div className="shrink-0 space-y-2 w-full max-w-[320px] mx-auto lg:mx-0">
                  <div 
                    className="cursor-zoom-in hover:scale-[1.02] transition-transform duration-200"
                    onClick={() => setZoomedImage(`/assets/images/suprimento/content/logistica-suprimento/modulo-${num}/m${num}-intro.png`)}
                  >
                    <img
                      src={`/assets/images/suprimento/content/logistica-suprimento/modulo-${num}/m${num}-intro.png`}
                      alt={`Visualização Módulo ${num}`}
                      className="w-full rounded-2xl border border-border/20 shadow-lg"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">Fig {num}. Representação conceitual.</p>
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <ModuleSectionHeader index="FLIP" title="Conceitos Essenciais" variant={variantColor} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {moduleContent?.flipCards?.map((card: any, idx: number) => {
                  const IconComp = (Icons as any)[card.front.icon] || LuBookOpen;
                  return (
                    <FlipCard
                      key={idx}
                      categoria="Conceito"
                      variant={variantColor}
                      frente={
                        <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                          <div className={`p-4 bg-${variantColor}-500/10 rounded-full shadow-inner ring-1 ring-${variantColor}-500/20`}>
                            <IconComp className={`w-12 h-12 text-${variantColor}-500`} />
                          </div>
                          <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                            {card.front.title}
                          </span>
                        </div>
                      }
                      verso={
                        <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                          <div className={`flex items-center gap-2 text-${variantColor}-500 font-bold border-b border-${variantColor}-500/10 pb-3`}>
                            <LuCheck className="w-5 h-5 shrink-0" />
                            <span className="tracking-widest uppercase text-xs">Conceito</span>
                          </div>
                          <p 
                            className="text-sm leading-relaxed text-muted-foreground"
                            dangerouslySetInnerHTML={{ __html: card.back.content }}
                          />
                        </div>
                      }
                    />
                  );
                })}
              </div>
            </section>
            
            {moduleContent && (
              <ModuleConsolidation moduloNumero={1}
                index={num}
                variant={variantColor}
                sinteseEstrategica={moduleContent.consolidation}
                podcast={{
                  aulaId: "logistica-suprimento",
                  aulaTitulo: "Logística",
                  materia: "suprimento",
                  materiaId: "suprimento",
                  moduloNumero: num,
                  moduloTitulo: MODULE_DEFS[num - 1].title,
                  conteudoResumo: "Resumo da aula"
                }}
              />
            )}

            <QuizInterativo
              titulo={`Prática: Módulo ${num}`}
              numero={num}
              questoes={quizArray}
              onComplete={(score) => handleModuleComplete(`modulo-${num}`, score)}
              variant={variantColor}
            />
          </TabsContent>
        );
      })}

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
