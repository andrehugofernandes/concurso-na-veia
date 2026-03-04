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
  QUIZ_M2_BHASKARA,
  QUIZ_M3_AVANCADAS,
  QUIZ_M4_PROBLEMAS,
  QUIZ_M5_FINAL,
} from "./data/equacoes-2grau-quizzes";

// Quizzes importados de ./data/equacoes-2grau-quizzes.ts
// (36 questões premium estilo CESGRANRIO)

// ── COMPONENT ───────────────────────────────────────────────────────────

export default function AulaEquacoes2Grau({
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

  const [quizBhaskara] = useState(() =>
    getRandomQuestions(QUIZ_M1_CONCEITOS, 6),
  );
  const [quizSomaProd] = useState(() =>
    getRandomQuestions(QUIZ_M2_BHASKARA, 6),
  );
  const [quizProblemas] = useState(() =>
    getRandomQuestions(QUIZ_M3_AVANCADAS, 5),
  );
  const [quizParabola] = useState(() =>
    getRandomQuestions(QUIZ_M4_PROBLEMAS, 5),
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
    { id: "modulo-1", label: "Módulo 1", titulo: "Bhaskara" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Soma e Produto" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Problemas" },
    { id: "modulo-4", label: "Módulo 4", titulo: "Parábola" },
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
          titulo="Fórmula de Bhaskara"
          descricao="A fórmula mais famosa da Matemática: x = (-b ± √Δ) / 2a."
          gradiente="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Discriminante e Raízes"
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Bhaskara Passo a Passo"
              icone="📐"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "A Fórmula",
                  icone: "🔑",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="p-5 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-center space-y-2">
                        <p className="text-lg font-bold font-mono">
                          Δ = b² - 4ac
                        </p>
                        <p className="text-lg font-bold font-mono">
                          x = (-b ± √Δ) / 2a
                        </p>
                      </div>
                      <CardCarousel
                        cards={[
                          {
                            titulo: "Δ > 0",
                            descricao: "Duas raízes reais distintas",
                            icone: "✌️",
                          },
                          {
                            titulo: "Δ = 0",
                            descricao: "Raiz dupla (duas iguais)",
                            icone: "1️⃣",
                          },
                          {
                            titulo: "Δ < 0",
                            descricao: "Sem raízes reais",
                            icone: "❌",
                          },
                        ]}
                      />
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-1" className="mt-16">
            <QuizInterativo
              questoes={quizBhaskara}
              titulo="Quiz - Bhaskara"
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
          titulo="Relações de Girard (Soma e Produto)"
          descricao="Atalho poderoso para encontrar raízes sem Bhaskara."
          gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Soma e Produto"
              variant="emerald"
              className="mb-6"
            />
            <AlertBox tipo="success" titulo="Fórmulas de Girard">
              Soma: S = x₁ + x₂ = -b/a | Produto: P = x₁ × x₂ = c/a
            </AlertBox>
          </section>
          <section id="quiz-modulo-2" className="mt-16">
            <QuizInterativo
              questoes={quizSomaProd}
              titulo="Quiz - Soma e Produto"
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
          titulo="Problemas do 2º Grau"
          descricao="Áreas, lucros e projéteis."
          gradiente="bg-gradient-to-br from-amber-600 via-orange-600 to-red-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Modelagem de Problemas"
              variant="amber"
              className="mb-6"
            />
            <AlertBox tipo="info" titulo="Dica">
              Identifique a grandeza desconhecida, monte a equação e descarte
              raízes que não fazem sentido no contexto (ex: medida negativa).
            </AlertBox>
          </section>
          <section id="quiz-modulo-3" className="mt-16">
            <QuizInterativo
              questoes={quizProblemas}
              titulo="Quiz - Problemas"
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
          titulo="O Gráfico: A Parábola"
          descricao="Concavidade, vértice e interseções."
          gradiente="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Análise Gráfica"
              variant="violet"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Propriedades da Parábola"
              icone="📈"
              corIndicador="bg-violet-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Concavidade",
                  icone: "↕️",
                  conteudo: (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20 text-center">
                        <p className="font-bold text-green-700 dark:text-green-400">
                          a &gt; 0 → Côncava para cima (∪)
                        </p>
                        <p className="text-sm mt-1">
                          Ponto de MÍNIMO no vértice
                        </p>
                      </div>
                      <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20 text-center">
                        <p className="font-bold text-red-700 dark:text-red-400">
                          a &lt; 0 → Côncava para baixo (∩)
                        </p>
                        <p className="text-sm mt-1">
                          Ponto de MÁXIMO no vértice
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-4" className="mt-16">
            <QuizInterativo
              questoes={quizParabola}
              titulo="Quiz - Parábola"
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
          descricao="Problemas integradores de toda a matéria."
          gradiente="bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700"
        />
        <div className="space-y-[50px]">
          <section id="quiz-modulo-5" className="mt-16">
            <QuizInterativo
              questoes={quizFinal}
              titulo="Desafio Final - Equações de 2º Grau"
              icone="🏆"
              numero={5}
              variant="rose"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
          {completedModules.has("modulo-5") && (
            <div className="mt-16 p-12 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2rem] text-white text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="relative z-10 space-y-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-5xl mx-auto backdrop-blur-sm border border-white/30 animate-bounce">
                  📐
                </div>
                <h3 className="text-4xl font-black italic tracking-tighter">
                  BHASKARA DOMINADO!
                </h3>
                <p className="text-xl opacity-90 max-w-xl mx-auto">
                  Equações de 2º grau são um dos temas mais cobrados. Excelente
                  trabalho!
                </p>
              </div>
            </div>
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
