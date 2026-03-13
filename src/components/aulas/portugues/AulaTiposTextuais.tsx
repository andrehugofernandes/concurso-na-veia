"use client";

import { useState, useCallback, useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  LuBookOpen,
  LuLayers,
  LuZap,
  LuBrain,
  LuArrowRight,
} from "react-icons/lu";
import {
  QuizQuestion,
  getRandomQuestions,
  AlertBox,
  FlipCard,
  QuizInterativo,
  ModuleBanner,
  StickyModuleNav,
  ModuleSectionHeader,
  ContentAccordion,
  LessonTabs,
  ModuleSummaryCarouselNew,
  MusicPlayerCard,
  AulaProps,
  VideoModal,
  AulaTemplate,
} from "../shared";

import {
  QUIZ_MOD1_POOL,
  QUIZ_MOD2_POOL,
  QUIZ_MOD3_POOL,
  QUIZ_MOD4_POOL,
  QUIZ_MOD5_POOL,
} from "./data/tipos-textuais-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Narrativo & Descritivo" },
  { id: "modulo-2", label: "Módulo 2", title: "Dissertativo" },
  { id: "modulo-3", label: "Módulo 3", title: "Injuntivo & Dialogal" },
  { id: "modulo-4", label: "Módulo 4", title: "Gêneros vs. Tipos" },
  { id: "modulo-5", label: "Módulo 5", title: "Laboratório Técnico" },
  { id: "modulo-6", label: "Módulo 6", title: "Simulado Final" },
] as const;

export default function AulaTiposTextuais({
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
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(),
  );

  const [qMod1, setQMod1] = useState<QuizQuestion[]>([]);
  const [qMod2, setQMod2] = useState<QuizQuestion[]>([]);
  const [qMod3, setQMod3] = useState<QuizQuestion[]>([]);
  const [qMod4, setQMod4] = useState<QuizQuestion[]>([]);
  const [qMod5, setQMod5] = useState<QuizQuestion[]>([]);
  const [qMod6, setQMod6] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    setQMod1(getRandomQuestions(QUIZ_MOD1_POOL, 6));
    setQMod2(getRandomQuestions(QUIZ_MOD2_POOL, 6));
    setQMod3(getRandomQuestions(QUIZ_MOD3_POOL, 6));
    setQMod4(getRandomQuestions(QUIZ_MOD4_POOL, 6));
    setQMod5(getRandomQuestions(QUIZ_MOD5_POOL, 10));
    setQMod6(
      getRandomQuestions(
        [
          ...QUIZ_MOD1_POOL,
          ...QUIZ_MOD2_POOL,
          ...QUIZ_MOD3_POOL,
          ...QUIZ_MOD4_POOL,
          ...QUIZ_MOD5_POOL,
        ],
        20,
      ),
    );
  }, []);

  const isModuleUnlocked = useCallback(
    (index: number) => {
      if (index === 0) return true;
      return completedModules.has(MODULE_DEFS[index - 1].id) || isCompleted;
    },
    [completedModules, isCompleted],
  );

  const handleModuleComplete = useCallback(
    (moduleId: string, score: number) => {
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
          setTimeout(() => setActiveTab(MODULE_DEFS[index + 1].id), 1500);
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          onComplete?.();
        }
      }
    },
    [completedModules, onComplete, onUpdateProgress],
  );

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
      loading={loading}
      xpGanho={xpGanho}
      currentProgress={currentProgress}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
      onComplete={onComplete}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* MÓDULO 1: NARRATIVO & DESCRITIVO */}
        <TabsContent value="modulo-1" className="space-y-[50px]">
          <ModuleBanner
            numero={1}
            titulo="Narrativo & Descritivo"
            descricao="As bases da contação de histórias e da pintura com palavras."
            gradiente="bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-700"
          />
          <div className="space-y-[50px]">
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={1}
                title="Pintura vs. Movimento"
                description="Como diferenciar a descrição da narração."
                variant="indigo"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FlipCard
                  frente={
                    <div className="h-full flex items-center justify-center font-bold text-xl">
                      Narração
                    </div>
                  }
                  verso={
                    <div className="p-4 text-center text-sm">
                      Ações que ocorrem no tempo. Progressão.
                    </div>
                  }
                />
                <FlipCard
                  frente={
                    <div className="h-full flex items-center justify-center font-bold text-xl">
                      Descrição
                    </div>
                  }
                  verso={
                    <div className="p-4 text-center text-sm">
                      Caracterização estática. Pintura de um quadro mental.
                    </div>
                  }
                />
              </div>
            </section>
            <QuizInterativo
              numero={1}
              titulo="Narrativo & Descritivo"
              icone="📖"
              questoes={qMod1}
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
              variant="indigo"
            />
          </div>
        </TabsContent>

        {/* MÓDULO 2: DISSERTATIVO */}
        <TabsContent value="modulo-2" className="space-y-[50px]">
          <ModuleBanner
            numero={2}
            titulo="Tipo Dissertativo"
            descricao="Exposição e Argumentação: O campo de batalha das ideias."
            gradiente="bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-700"
          />
          <div className="space-y-[50px]">
            <QuizInterativo
              numero={2}
              titulo="Dissertativo"
              icone="⚖️"
              questoes={qMod2}
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
              variant="indigo"
            />
          </div>
        </TabsContent>

        {/* MÓDULO 3: INJUNTIVO & DIALOGAL */}
        <TabsContent value="modulo-3" className="space-y-[50px]">
          <ModuleBanner
            numero={3}
            titulo="Injuntivo & Dialogal"
            descricao="Instruções, comandos e a troca de turnos na fala."
            gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700"
          />
          <div className="space-y-[50px]">
            <QuizInterativo
              numero={3}
              titulo="Injuntivo & Dialogal"
              icone="📣"
              questoes={qMod3}
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
              variant="emerald"
            />
          </div>
        </TabsContent>

        {/* MÓDULO 4: GÊNEROS VS TIPOS */}
        <TabsContent value="modulo-4" className="space-y-[50px]">
          <ModuleBanner
            numero={4}
            titulo="Gêneros vs. Tipos"
            descricao="A estrutura (Tipo) encontra a intenção social (Gênero)."
            gradiente="bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700"
          />
          <div className="space-y-[50px]">
            <QuizInterativo
              numero={4}
              titulo="Gêneros vs. Tipos"
              icone="🎭"
              questoes={qMod4}
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
              variant="amber"
            />
          </div>
        </TabsContent>

        {/* MÓDULO 5: LABORATÓRIO */}
        <TabsContent value="modulo-5" className="space-y-[50px]">
          <ModuleBanner
            numero={5}
            titulo="Laboratório Técnico"
            descricao="Análise profunda de fragmentos no estilo Cesgranrio."
            gradiente="bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700"
          />
          <div className="space-y-[50px]">
            <QuizInterativo
              numero={5}
              titulo="Lab. Técnico"
              icone="🔬"
              questoes={qMod5}
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
              variant="rose"
            />
          </div>
        </TabsContent>

        {/* MÓDULO 6: SIMULADO FINAL */}
        <TabsContent value="modulo-6" className="space-y-[50px]">
          <ModuleBanner
            numero={6}
            titulo="Simulado Final"
            descricao="O teste definitivo sobre tipologia e gêneros."
            gradiente="bg-gradient-to-br from-yellow-500 via-amber-500 to-yellow-600"
          />
          <div className="space-y-[50px]">
            <QuizInterativo
              numero={6}
              titulo="Simulado Geral"
              icone="🏆"
              questoes={qMod6}
              onComplete={(score) => handleModuleComplete("modulo-6", score)}
              variant="amber"
            />
          </div>
        </TabsContent>
      </Tabs>
    </AulaTemplate>
  );
}
