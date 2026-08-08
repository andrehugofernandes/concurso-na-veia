"use client";
import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  QuizInterativo,
  ModuleBanner,
  getRandomQuestions,
  AulaProps,
  ContentAccordion,
  AulaTemplate,
  ModuleSectionHeader,
  ModuleConsolidation,
  FlipCard,
} from "../shared";
import { getModuleVariant } from "@/lib/moduleColors";
import * as Icons from "react-icons/lu";

import { MODULE_CONTENTS } from "./data/engenharia-software-content";

// Quizzes do arquivo de dados (SEPARADO):
import {
  QUIZ_M1_PROCESSOS_MATURIDADE,
  QUIZ_M2_CICLO_VIDA,
  QUIZ_M3_REQUISITOS,
  QUIZ_M4_UML_PATTERNS,
  QUIZ_M5_AGILE_DEVOPS,
  QUIZ_M6_DATABASE_SQL,
  QUIZ_M7_NOSQL_BIGDATA,
  QUIZ_M8_MICROSERVICES,
  QUIZ_M9_SECURITY,
  QUIZ_M10_TESTING_QUALITY,
} from "./data/engenharia-software-quizzes";

export default function AulaEngenhariaSoftware({
  onComplete, isCompleted, loading, xpGanho = 50,
  currentProgress, onUpdateProgress, titulo, descricao, duracao,
  materiaNome, materiaCor, materiaId, prevTopico, nextTopico
}: AulaProps) {
  const STORAGE_KEY_PREFIX = "petrobras_quest_aula_ti_engenharia_software_";

  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}active_tab`);
      return saved || "modulo-1";
    }
    return "modulo-1";
  });

  const [completedModules, setCompletedModules] = useState<Set<string>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}completed_modules`);
      if (saved) {
        try {
          const arr = JSON.parse(saved);
          return new Set(arr);
        } catch (e) {
          return new Set();
        }
      }
    }
    return new Set();
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}active_tab`, activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        `${STORAGE_KEY_PREFIX}completed_modules`,
        JSON.stringify(Array.from(completedModules))
      );
    }
  }, [completedModules]);

  const MODULE_DEFS = [
    { id: "modulo-1", label: "Módulo 1", titulo: "Processos e Maturidade" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Ciclos de Vida" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Engenharia de Requisitos" },
    { id: "modulo-4", label: "Módulo 4", titulo: "Arquitetura e UML" },
    { id: "modulo-5", label: "Módulo 5", titulo: "Agilidade e DevOps" },
    { id: "modulo-6", label: "Módulo 6", titulo: "Bancos de Dados SQL" },
    { id: "modulo-7", label: "Módulo 7", titulo: "NoSQL e Big Data" },
    { id: "modulo-8", label: "Módulo 8", titulo: "Microserviços e Docker" },
    { id: "modulo-9", label: "Módulo 9", titulo: "Segurança de Software" },
    { id: "modulo-10", label: "Módulo 10", titulo: "Testes e Qualidade" },
  ];

  const totalModulos = MODULE_DEFS.length;

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) {
      setCompletedModules(prev => {
        const n = new Set(prev);
        n.add(moduleId);
        return n;
      });
      const idx = MODULE_DEFS.findIndex(m => m.id === moduleId);
      onUpdateProgress?.(Math.round(((idx + 1) / totalModulos) * 100));

      if (idx < totalModulos - 1) {
        setTimeout(() => setActiveTab(MODULE_DEFS[idx + 1].id), 1500);
      }
    }
  };

  useEffect(() => {
    if (currentProgress && currentProgress > 0) {
      const count = Math.floor((currentProgress / 100) * totalModulos);
      const s = new Set<string>();
      for (let i = 1; i <= count; i++) s.add(`modulo-${i}`);
      setCompletedModules(s);
    }
  }, [currentProgress, totalModulos]);

  const quizPools = [
    getRandomQuestions(QUIZ_M1_PROCESSOS_MATURIDADE, 5),
    getRandomQuestions(QUIZ_M2_CICLO_VIDA, 5),
    getRandomQuestions(QUIZ_M3_REQUISITOS, 5),
    getRandomQuestions(QUIZ_M4_UML_PATTERNS, 5),
    getRandomQuestions(QUIZ_M5_AGILE_DEVOPS, 5),
    getRandomQuestions(QUIZ_M6_DATABASE_SQL, 5),
    getRandomQuestions(QUIZ_M7_NOSQL_BIGDATA, 5),
    getRandomQuestions(QUIZ_M8_MICROSERVICES, 5),
    getRandomQuestions(QUIZ_M9_SECURITY, 5),
    getRandomQuestions(QUIZ_M10_TESTING_QUALITY, 5),
  ];

  const mv = Object.fromEntries(
    Array.from({ length: 10 }, (_, i) => [i + 1, getModuleVariant(i + 1)])
  ) as Record<number, ReturnType<typeof getModuleVariant>>;

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      modules={MODULE_DEFS}
      completedModules={completedModules}
      isModuleUnlocked={() => true}
      isCompleted={isCompleted}
      titulo={titulo}
      descricao={descricao}
      duracao={duracao}
      materiaNome={materiaNome}
      materiaCor={materiaCor}
      materiaId={materiaId}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
      currentProgress={currentProgress}
      onComplete={onComplete}
      loading={loading}
      xpGanho={xpGanho}
    >
      {MODULE_DEFS.map((modDef, idx) => {
        const modNum = idx + 1;
        const modData = MODULE_CONTENTS[modNum];
        const quizPool = quizPools[idx];

        if (!modData) return null;

        return (
          <TabsContent key={modDef.id} value={modDef.id} className="mt-0 outline-none space-y-12">
            <ModuleBanner
              numero={modNum}
              titulo={modDef.titulo}
              descricao={`Estudo aprofundado e direcionado para a CESGRANRIO no ${modDef.label}.`}
              variant={mv[modNum]}
            />

            <div className="space-y-12">
              {/* Seções Teóricas */}
              {modData.secoes.map((sec, secIdx) => (
                <section key={secIdx} className="bg-card rounded-2xl border border-border p-6 md:p-10 shadow-sm space-y-6">
                  <ModuleSectionHeader
                    index={sec.index}
                    title={sec.title}
                    variant={mv[modNum]}
                  />

                  {/* Accordions */}
                  {sec.accordions?.map((acc, accIdx) => (
                    <ContentAccordion
                      key={accIdx}
                      titulo={acc.titulo}
                      icone={acc.icone}
                      corIndicador={acc.corIndicador}
                      defaultOpen={acc.defaultOpen ?? true}
                      mode={(acc.mode as "stacked" | "carousel") ?? "stacked"}
                      slides={acc.slides}
                    />
                  ))}

                  {/* FlipCards Premium */}
                  {sec.flipCards && sec.flipCards.length > 0 && (
                    <div className="pt-6 space-y-4">
                      <h4 className="text-xl font-bold text-foreground flex items-center gap-2">
                        <Icons.LuBrain className="w-5 h-5 text-indigo-500 animate-pulse" />
                        Flashcards de Memorização Ativa (FlipCards)
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sec.flipCards.map((card, cardIdx) => {
                          const IconComp = (Icons as any)[card.frontIcon] || Icons.LuBookOpen;
                          return (
                            <FlipCard
                              key={cardIdx}
                              numero={cardIdx + 1}
                              categoria={`Engenharia de Software • ${modDef.label}`}
                              frente={
                                <div className="flex flex-col items-center text-center space-y-3 p-2">
                                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                                    <IconComp className="w-6 h-6 text-indigo-500" />
                                  </div>
                                  <h5 className="font-bold text-lg text-foreground">{card.frontTitle}</h5>
                                </div>
                              }
                              verso={
                                <div className="space-y-3 p-2">
                                  <h5 className="font-bold text-base text-indigo-500 flex items-center gap-2">
                                    <Icons.LuCheck className="w-4 h-4" />
                                    {card.backTitle}
                                  </h5>
                                  <p className="text-sm text-foreground/90 leading-relaxed">
                                    {card.backContent}
                                  </p>
                                </div>
                              }
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}
                </section>
              ))}

              {/* Consolidação Multimídia */}
              {modData.consolidation && (
                <ModuleConsolidation
                  index={modNum}
                  variant={mv[modNum]}
                  resumoVisual={modData.consolidation.resumoVisual ? { ...modData.consolidation.resumoVisual, images: modData.consolidation.resumoVisual.images || [] } : undefined}
                  sinteseEstrategica={modData.consolidation.sinteseEstrategica}
                  podcast={modData.consolidation.podcast}
                />
              )}

              {/* Quiz Interativo */}
              <QuizInterativo
                titulo={`Quiz de Fixação: ${modDef.titulo}`}
                questoes={quizPool}
                onComplete={(score) => handleModuleComplete(modDef.id, score)}
              />
            </div>
          </TabsContent>
        );
      })}
    </AulaTemplate>
  );
}
