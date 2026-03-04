"use client";

import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  AlertBox,
  QuizInterativo,
  ModuleBanner,
  getRandomQuestions,
  AulaProps,
  ContentAccordion,
  AulaTemplate,
  ModuleSectionHeader,
} from "../shared";
import {
  QUIZ_M1_POTENCIACAO,
  QUIZ_M2_GRAFICO,
  QUIZ_M3_EQUACOES,
  QUIZ_M4_APLICACOES,
  QUIZ_M5_FINAL,
} from "./data/funcoes-exponenciais-quizzes";

// Quizzes importados de ./data/funcoes-exponenciais-quizzes.ts
// (36 questões premium estilo CESGRANRIO)

// ── COMPONENT ───────────────────────────────────────────────────────────

export default function AulaFuncoesExponenciais({
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
    getRandomQuestions(QUIZ_M1_POTENCIACAO, 6),
  );
  const [quizEquacoes] = useState(() =>
    getRandomQuestions(QUIZ_M3_EQUACOES, 6),
  );
  const [quizAplicacoes] = useState(() =>
    getRandomQuestions(QUIZ_M4_APLICACOES, 5),
  );
  const [quizInequacoes] = useState(() =>
    getRandomQuestions(QUIZ_M2_GRAFICO, 5),
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
      onUpdateProgress?.(Math.round(((idx + 1) / 5) * 100));
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
    { id: "modulo-1", label: "Módulo 1", titulo: "Potenciação" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Equações Exponenciais" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Aplicações" },
    { id: "modulo-4", label: "Módulo 4", titulo: "Inequações" },
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
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="Potenciação e Conceitos"
          descricao="As regras fundamentais de potências."
          gradiente="bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Regras de Potenciação"
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="As 5 Regras de Ouro"
              icone="⚡"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Regras Essenciais",
                  icone: "📜",
                  conteudo: (
                    <div className="space-y-3">
                      <div className="grid gap-2">
                        {[
                          "aᵐ × aⁿ = aᵐ⁺ⁿ",
                          "aᵐ ÷ aⁿ = aᵐ⁻ⁿ",
                          "(aᵐ)ⁿ = aᵐˣⁿ",
                          "a⁻ⁿ = 1/aⁿ",
                          "a⁰ = 1 (a≠0)",
                        ].map((r, i) => (
                          <div
                            key={i}
                            className="p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/20 font-mono text-center"
                          >
                            {r}
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-1" className="mt-16">
            <QuizInterativo
              questoes={quizConceito}
              titulo="Quiz - Potenciação"
              icone="🧠"
              numero={1}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      <TabsContent value="modulo-2" className="space-y-[50px]">
        <ModuleBanner
          numero={2}
          titulo="Equações Exponenciais"
          descricao="Iguale as bases e compare os expoentes."
          gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Método de Resolução"
              variant="emerald"
              className="mb-6"
            />
            <AlertBox tipo="success" titulo="Passo a Passo">
              1. Escreva ambos os lados com a MESMA BASE. 2. Iguale os
              expoentes. 3. Resolva a equação resultante.
            </AlertBox>
          </section>
          <section id="quiz-modulo-2" className="mt-16">
            <QuizInterativo
              questoes={quizEquacoes}
              titulo="Quiz - Equações"
              icone="🧠"
              numero={2}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>
        </div>
      </TabsContent>

      <TabsContent value="modulo-3" className="space-y-[50px]">
        <ModuleBanner
          numero={3}
          titulo="Aplicações: Crescimento e Decaimento"
          descricao="Juros compostos, populações e radioatividade."
          gradiente="bg-gradient-to-br from-amber-600 via-orange-600 to-red-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Modelos Exponenciais"
              variant="amber"
              className="mb-6"
            />
            <AlertBox tipo="info" titulo="Modelo Geral">
              N(t) = N₀ × (1 ± taxa)ᵗ. Crescimento: +. Decaimento: -.
            </AlertBox>
          </section>
          <section id="quiz-modulo-3" className="mt-16">
            <QuizInterativo
              questoes={quizAplicacoes}
              titulo="Quiz - Aplicações"
              icone="🧠"
              numero={3}
              variant="amber"
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>
        </div>
      </TabsContent>

      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner
          numero={4}
          titulo="Inequações Exponenciais"
          descricao="Base > 1 mantém; 0 < base < 1 inverte."
          gradiente="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Regra do Sentido"
              variant="violet"
              className="mb-6"
            />
            <AlertBox tipo="warning" titulo="Atenção!">
              Base &gt; 1: mantém o sentido da desigualdade. Base entre 0 e 1:
              INVERTE o sentido!
            </AlertBox>
          </section>
          <section id="quiz-modulo-4" className="mt-16">
            <QuizInterativo
              questoes={quizInequacoes}
              titulo="Quiz - Inequações"
              icone="🔥"
              numero={4}
              variant="violet"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="Desafio Final"
          descricao="Problemas mistos de exponenciais."
          gradiente="bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700"
        />
        <div className="space-y-[50px]">
          <section id="quiz-modulo-5" className="mt-16">
            <QuizInterativo
              questoes={quizFinal}
              titulo="Desafio Final - Exponenciais"
              icone="🏆"
              numero={5}
              variant="rose"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
          {completedModules.has("modulo-5") && (
            <div className="mt-16 p-12 bg-gradient-to-br from-amber-600 to-orange-700 rounded-[2rem] text-white text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="relative z-10 space-y-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-5xl mx-auto backdrop-blur-sm border border-white/30 animate-bounce">
                  ⚡
                </div>
                <h3 className="text-4xl font-black italic tracking-tighter">
                  EXPONENCIAIS DOMINADAS!
                </h3>
                <p className="text-xl opacity-90 max-w-xl mx-auto">
                  Juros compostos e crescimento população nunca mais serão um
                  mistério.
                </p>
              </div>
            </div>
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
