"use client";

import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  AlertBox,
  QuizInterativo,
  ModuleBanner,
  getRandomQuestions,
  AulaProps,
  CardCarousel,
  ContentAccordion,
  AulaTemplate,
  ModuleSectionHeader,
} from "../shared";
import {
  QUIZ_M1_CONCEITOS,
  QUIZ_M2_FRACOES,
  QUIZ_M3_PROBLEMAS,
  QUIZ_M4_INEQUACOES,
  QUIZ_M5_FINAL,
} from "./data/equacoes-1grau-quizzes";

// Quizzes importados de ./data/equacoes-1grau-quizzes.ts
// (36 questões premium estilo CESGRANRIO)

// ── COMPONENT ───────────────────────────────────────────────────────────

export default function AulaEquacoes1Grau({
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

  const [quizConceito] = useState(() =>
    getRandomQuestions(QUIZ_M1_CONCEITOS, 6),
  );
  const [quizProblemas] = useState(() =>
    getRandomQuestions(QUIZ_M3_PROBLEMAS, 6),
  );
  const [quizFracoes] = useState(() => getRandomQuestions(QUIZ_M2_FRACOES, 6));
  const [quizSistemas] = useState(() =>
    getRandomQuestions(QUIZ_M4_INEQUACOES, 5),
  );
  const [quizFinal] = useState(() => getRandomQuestions(QUIZ_M5_FINAL, 5));

  const isModuleUnlocked = (_index: number) => true;

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) {
      setCompletedModules((prev) => {
        const n = new Set(prev);
        n.add(moduleId);
        return n;
      });
      const idx = [
        "modulo-1",
        "modulo-2",
        "modulo-3",
        "modulo-4",
        "modulo-5",
      ].findIndex((m) => m === moduleId);
      const pct = Math.round(((idx + 1) / 5) * 100);
      onUpdateProgress?.(pct);
      if (idx < 4) setTimeout(() => setActiveTab(`modulo-${idx + 2}`), 1500);
    }
  };

  useEffect(() => {
    if (currentProgress && currentProgress > 0) {
      const count = Math.floor((currentProgress / 100) * 5);
      const s = new Set<string>();
      for (let i = 1; i <= count; i++) s.add(`modulo-${i}`);
      setCompletedModules(s);
    }
  }, [currentProgress]);

  const MODULE_DEFS = [
    { id: "modulo-1", label: "Módulo 1", titulo: "Conceitos" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Problemas" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Frações e Parênteses" },
    { id: "modulo-4", label: "Módulo 4", titulo: "Sistemas Lineares" },
    { id: "modulo-5", label: "Módulo 5", titulo: "Desafio Final" },
  ];

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={setActiveTab}
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
      currentProgress={currentProgress}
      onComplete={onComplete}
      loading={loading}
      xpGanho={xpGanho}
    >
      {/* ═══ MÓDULO 1 ═══ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="Fundamentos de Equações"
          descricao="A base: isolar a incógnita e resolver."
          gradiente="bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Equação do 1º Grau"
              description="ax + b = 0"
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Conceito e Resolução"
              icone="⚖️"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "O que é?",
                  icone: "💡",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Uma <strong>equação do 1º grau</strong> é uma igualdade
                        com uma incógnita de expoente 1.
                      </p>
                      <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-center">
                        <p className="text-lg font-mono font-bold">
                          ax + b = 0 → x = -b/a
                        </p>
                      </div>
                      <AlertBox tipo="info" titulo="Princípio da Balança">
                        O que fizer de um lado, faça do outro! Assim a igualdade
                        se mantém.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-1" className="mt-16">
            <QuizInterativo
              questoes={quizConceito}
              titulo="Quiz - Conceitos Básicos"
              icone="🧠"
              numero={1}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 2 ═══ */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <ModuleBanner
          numero={2}
          titulo="Problemas do Cotidiano"
          descricao="Transforme texto em equação."
          gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Técnica de Montagem"
              variant="emerald"
              className="mb-6"
            />
            <AlertBox tipo="success" titulo="Passo a Passo">
              1. Identifique a incógnita (x). 2. Traduza o texto em expressão.
              3. Monte a equação. 4. Resolva isolando x.
            </AlertBox>
          </section>
          <section id="quiz-modulo-2" className="mt-16">
            <QuizInterativo
              questoes={quizProblemas}
              titulo="Quiz - Problemas"
              icone="🧠"
              numero={2}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 3 ═══ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <ModuleBanner
          numero={3}
          titulo="Frações e Parênteses"
          descricao="MMC e distributiva para equações mais complexas."
          gradiente="bg-gradient-to-br from-amber-600 via-orange-600 to-red-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Eliminando Denominadores"
              variant="amber"
              className="mb-6"
            />
            <ContentAccordion
              titulo="MMC e Distributiva"
              icone="🔧"
              corIndicador="bg-amber-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "MMC nos Denominadores",
                  icone: "🔢",
                  conteudo: (
                    <div className="space-y-3">
                      <p>
                        Se a equação tem frações,{" "}
                        <strong>multiplique tudo pelo MMC</strong> dos
                        denominadores para eliminá-los.
                      </p>
                      <AlertBox tipo="warning" titulo="Atenção">
                        Ao distribuir sinal negativo antes de parênteses, TROQUE
                        TODOS os sinais internos!
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-3" className="mt-16">
            <QuizInterativo
              questoes={quizFracoes}
              titulo="Quiz - Frações e Parênteses"
              icone="🧠"
              numero={3}
              variant="amber"
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 4 ═══ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner
          numero={4}
          titulo="Sistemas Lineares 2×2"
          descricao="Duas equações, duas incógnitas."
          gradiente="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Métodos de Resolução"
              variant="violet"
              className="mb-6"
            />
            <CardCarousel
              cards={[
                {
                  titulo: "Substituição",
                  descricao:
                    "Isole uma variável em uma equação e substitua na outra.",
                  icone: "🔄",
                },
                {
                  titulo: "Adição / Eliminação",
                  descricao:
                    "Some ou subtraia as equações para eliminar uma variável.",
                  icone: "➕",
                },
                {
                  titulo: "Classificação",
                  descricao:
                    "SPD (uma solução), SPI (infinitas) ou SI (nenhuma).",
                  icone: "📋",
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-4" className="mt-16">
            <QuizInterativo
              questoes={quizSistemas}
              titulo="Quiz - Sistemas Lineares"
              icone="🔥"
              numero={4}
              variant="violet"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 5 ═══ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="Desafio Final"
          descricao="Reúna tudo o que aprendeu em problemas desafiadores."
          gradiente="bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700"
        />
        <div className="space-y-[50px]">
          <section id="quiz-modulo-5" className="mt-16">
            <QuizInterativo
              questoes={quizFinal}
              titulo="Desafio Final - Equações de 1º Grau"
              icone="🏆"
              numero={5}
              variant="rose"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
          {completedModules.has("modulo-5") && (
            <div className="mt-16 p-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] text-white text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="relative z-10 space-y-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-5xl mx-auto backdrop-blur-sm border border-white/30 animate-bounce">
                  ⚖️
                </div>
                <h3 className="text-4xl font-black italic tracking-tighter">
                  EQUAÇÕES DOMINADAS!
                </h3>
                <p className="text-xl opacity-90 max-w-xl mx-auto">
                  A base de tudo: resolver equações é a ferramenta mais poderosa
                  da Matemática.
                </p>
              </div>
            </div>
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
