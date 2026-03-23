"use client";

import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  AlertBox,
  ModuleBanner,
  getRandomQuestions,
  AulaProps,
  AulaTemplate,
} from "../shared";

import {
  QUIZ_M1_ADDITION,
  QUIZ_M2_CONTRAST,
  QUIZ_M3_CAUSE,
  QUIZ_M4_EFFECT,
  QUIZ_M5_CONCESSION,
  QUIZ_M6_CONDITION_PURPOSE,
  QUIZ_M7_SEQUENTIAL,
  QUIZ_M8_ADVANCED,
  QUIZ_M9_TECHNICAL_REPORTS,
  QUIZ_M10_SIMULADO_MESTRE,
} from "./data/connectors-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", numero: 1, titulo: "Addition Connectors", descricao: "Furthermore, Moreover, Besides" },
  { id: "modulo-2", numero: 2, titulo: "Contrast Connectors", descricao: "However, Nevertheless, On the other hand" },
  { id: "modulo-3", numero: 3, titulo: "Cause Connectors", descricao: "Because, Since, Due to, Owing to" },
  { id: "modulo-4", numero: 4, titulo: "Effect Connectors", descricao: "Therefore, Thus, Consequently" },
  { id: "modulo-5", numero: 5, titulo: "Concession", descricao: "Although, Despite, While, Even though" },
  { id: "modulo-6", numero: 6, titulo: "Condition & Purpose", descricao: "If, Unless, So that, In order to" },
  { id: "modulo-7", numero: 7, titulo: "Sequential Connectors", descricao: "First, Then, Finally, Subsequently" },
  { id: "modulo-8", numero: 8, titulo: "Advanced Academic", descricao: "Otherwise, Thereby, Insofar as" },
  { id: "modulo-9", numero: 9, titulo: "Technical Reports", descricao: "Connectors in Petrobras Documents" },
  { id: "modulo-10", numero: 10, titulo: "Simulado Mestre", descricao: "Full Practice Test" },
] as const;

export default function AulaConnectors({
  onComplete,
  isCompleted,
  loading,
  xpGanho = 50,
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
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isCompleted) {
      setCompletedModules(new Set(MODULE_DEFS.map(m => m.id)));
    }
  }, [isCompleted]);

  const handleModuleComplete = (moduleId: string) => {
    const newCompleted = new Set(completedModules);
    newCompleted.add(moduleId);
    setCompletedModules(newCompleted);

    if (newCompleted.size === 10) {
      setTimeout(() => {
        onComplete?.(xpGanho);
      }, 500);
    }
  };

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      modules={MODULE_DEFS}
      completedModules={completedModules}
      titulo={titulo}
      descricao={descricao}
      duracao={duracao}
      materiaNome={materiaNome}
      materiaCor={materiaCor}
      materiaId={materiaId}
      isCompleted={isCompleted}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
      onComplete={onComplete}
      loading={loading}
      xpGanho={xpGanho}
    >
      {MODULE_DEFS.map((mod) => (
        <TabsContent key={mod.id} value={mod.id} className="space-y-6">
          <ModuleBanner numero={mod.numero} titulo={mod.titulo} />
          <AlertBox tipo="info" titulo="Em Desenvolvimento">
            Este módulo será implementado em breve.
          </AlertBox>
        </TabsContent>
      ))}
    </AulaTemplate>
  );
}
