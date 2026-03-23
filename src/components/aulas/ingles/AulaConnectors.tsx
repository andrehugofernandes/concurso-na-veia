"use client";

import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  ModuleConsolidation,
  AlertBox,
  QuizInterativo,
  ModuleBanner,
  getRandomQuestions,
  AulaProps,
  AulaTemplate,
} from "../shared";

import { getModuleVariant } from "@/lib/moduleColors";

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
  { id: "modulo-1", label: "Módulo 1", title: "Addition Connectors" },
  { id: "modulo-2", label: "Módulo 2", title: "Contrast Connectors" },
  { id: "modulo-3", label: "Módulo 3", title: "Cause Connectors" },
  { id: "modulo-4", label: "Módulo 4", title: "Effect Connectors" },
  { id: "modulo-5", label: "Módulo 5", title: "Concession" },
  { id: "modulo-6", label: "Módulo 6", title: "Condition & Purpose" },
  { id: "modulo-7", label: "Módulo 7", title: "Sequential Connectors" },
  { id: "modulo-8", label: "Módulo 8", title: "Advanced Academic" },
  { id: "modulo-9", label: "Módulo 9", title: "Technical Reports" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
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
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

  const [quizM1, setQuizM1] = useState<typeof QUIZ_M1_ADDITION>([]);
  const [quizM2, setQuizM2] = useState<typeof QUIZ_M2_CONTRAST>([]);
  const [quizM3, setQuizM3] = useState<typeof QUIZ_M3_CAUSE>([]);
  const [quizM4, setQuizM4] = useState<typeof QUIZ_M4_EFFECT>([]);
  const [quizM5, setQuizM5] = useState<typeof QUIZ_M5_CONCESSION>([]);
  const [quizM6, setQuizM6] = useState<typeof QUIZ_M6_CONDITION_PURPOSE>([]);
  const [quizM7, setQuizM7] = useState<typeof QUIZ_M7_SEQUENTIAL>([]);
  const [quizM8, setQuizM8] = useState<typeof QUIZ_M8_ADVANCED>([]);
  const [quizM9, setQuizM9] = useState<typeof QUIZ_M9_TECHNICAL_REPORTS>([]);
  const [quizFinal, setQuizFinal] = useState<typeof QUIZ_M10_SIMULADO_MESTRE>([]);

  const [showCompletionBadge, setShowCompletionBadge] = useState(false);

  useEffect(() => {
    if (isCompleted) setShowCompletionBadge(true);
  }, [isCompleted]);

  useEffect(() => {
    if (!loading) {
      setQuizM1(getRandomQuestions(QUIZ_M1_ADDITION, 8));
      setQuizM2(getRandomQuestions(QUIZ_M2_CONTRAST, 8));
      setQuizM3(getRandomQuestions(QUIZ_M3_CAUSE, 8));
      setQuizM4(getRandomQuestions(QUIZ_M4_EFFECT, 8));
      setQuizM5(getRandomQuestions(QUIZ_M5_CONCESSION, 8));
      setQuizM6(getRandomQuestions(QUIZ_M6_CONDITION_PURPOSE, 8));
      setQuizM7(getRandomQuestions(QUIZ_M7_SEQUENTIAL, 8));
      setQuizM8(getRandomQuestions(QUIZ_M8_ADVANCED, 8));
      setQuizM9(getRandomQuestions(QUIZ_M9_TECHNICAL_REPORTS, 8));
      setQuizFinal(getRandomQuestions(QUIZ_M10_SIMULADO_MESTRE, 8));
    }
  }, [loading]);

  const handleModuleComplete = (moduleId: string) => {
    const newCompleted = new Set(completedModules);
    newCompleted.add(moduleId);
    setCompletedModules(newCompleted);

    if (newCompleted.size === 10) {
      setTimeout(() => {
        onComplete?.(xpGanho);
        setShowCompletionBadge(true);
      }, 500);
    }
  };

  const mv = Object.fromEntries(
    Array.from({ length: 10 }, (_, i) => [i + 1, getModuleVariant(i + 1)])
  ) as Record<number, ReturnType<typeof getModuleVariant>>;

  return (
    <AulaTemplate
      titulo={titulo}
      descricao={descricao}
      duracao={duracao}
      materiaNome={materiaNome}
      materiaCor={materiaCor}
      materiaId={materiaId}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
      showCompletionBadge={showCompletionBadge}
      completedPercentage={(completedModules.size / 10) * 100}
    >
      {MODULE_DEFS.map((mod, idx) => (
        <TabsContent key={mod.id} value={mod.id} className="space-y-6">
          <ModuleBanner numero={idx + 1} titulo={mod.title} />
          <AlertBox variant="info" title="Em Desenvolvimento">
            Este módulo será implementado em breve.
          </AlertBox>
        </TabsContent>
      ))}
    </AulaTemplate>
  );
}
