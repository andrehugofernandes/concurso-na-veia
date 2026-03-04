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
  QUIZ_M1_AFIM,
  QUIZ_M2_QUADRATICA,
  QUIZ_M3_GRAFICOS,
  QUIZ_M4_APLICACOES,
  QUIZ_M5_FINAL,
} from "./data/funcoes-afim-quadratica-quizzes";

// Quizzes importados de ./data/funcoes-afim-quadratica-quizzes.ts
// (37 questões premium estilo CESGRANRIO)

// ── COMPONENT ───────────────────────────────────────────────────────────

export default function AulaFuncoesAfimQuadratica({
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

  const [quizAfim] = useState(() => getRandomQuestions(QUIZ_M1_AFIM, 6));
  const [quizQuadratica] = useState(() =>
    getRandomQuestions(QUIZ_M2_QUADRATICA, 6),
  );
  const [quizGrafico] = useState(() => getRandomQuestions(QUIZ_M3_GRAFICOS, 6));
  const [quizAplicacoes] = useState(() =>
    getRandomQuestions(QUIZ_M4_APLICACOES, 5),
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
    { id: "modulo-1", label: "Módulo 1", titulo: "Função Afim" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Função Quadrática" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Análise Gráfica" },
    { id: "modulo-4", label: "Módulo 4", titulo: "Aplicações" },
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
          titulo="Função Afim (1º Grau)"
          descricao="f(x) = ax + b — a reta e suas propriedades."
          gradiente="bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Coeficientes e Gráfico"
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="A Função Afim"
              icone="📈"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Forma Geral",
                  icone: "🔑",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="p-5 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-center">
                        <p className="text-lg font-bold font-mono">
                          f(x) = ax + b
                        </p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                          <p className="font-bold text-blue-700 dark:text-blue-400">
                            a = coeficiente angular
                          </p>
                          <p className="text-sm">
                            Define a <strong>inclinação</strong> da reta. Se a{" "}
                            {">"} 0, a função é <em>crescente</em>; se a {"<"}{" "}
                            0, é <em>decrescente</em>.
                          </p>
                        </div>
                        <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                          <p className="font-bold text-cyan-700 dark:text-cyan-400">
                            b = coeficiente linear
                          </p>
                          <p className="text-sm">
                            Onde a reta cruza o eixo y. É o valor de f(0).
                          </p>
                        </div>
                      </div>
                      <AlertBox tipo="info" titulo="Contexto Petrobras">
                        Na operação de uma refinaria, funções afins modelam
                        custos operacionais: C(x) = <strong>custo fixo</strong>{" "}
                        + <strong>custo variável × produção</strong>. Exemplo:
                        C(x) = 5.000 + 15x, onde R$ 5.000 é o custo fixo e R$ 15
                        por barril.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Raiz e Interceptos",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A <strong>raiz</strong> (ou zero) da função é o valor de
                        x que faz f(x) = 0. Graficamente, é onde a reta{" "}
                        <strong>cruza o eixo x</strong>.
                      </p>
                      <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                        <p className="font-mono font-bold text-center">
                          ax + b = 0 → x = -b/a
                        </p>
                      </div>
                      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                        <p className="font-bold text-amber-700 dark:text-amber-400">
                          📝 Exemplo Resolvido
                        </p>
                        <p className="mt-1">
                          f(x) = 3x - 6. Raiz: 3x - 6 = 0 → 3x = 6 →{" "}
                          <strong>x = 2</strong>.
                        </p>
                        <p className="text-sm mt-1">
                          A reta cruza o eixo x no ponto (2, 0) e o eixo y em
                          (0, -6).
                        </p>
                      </div>
                      <AlertBox tipo="warning" titulo="⚠️ Pegadinha CESGRANRIO">
                        Cuidado para não confundir a raiz (onde cruza x) com o
                        coeficiente linear (onde cruza y). A banca costuma
                        trocar esses valores nas alternativas!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Retas Paralelas e Perpendiculares",
                  icone: "↗️",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                          <p className="font-bold text-green-700 dark:text-green-400">
                            Paralelas
                          </p>
                          <p className="text-sm">
                            Mesmo coeficiente angular: a₁ = a₂
                          </p>
                          <p className="text-xs mt-1 font-mono">
                            y = 2x + 1 ∥ y = 2x - 3
                          </p>
                        </div>
                        <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                          <p className="font-bold text-red-700 dark:text-red-400">
                            Perpendiculares
                          </p>
                          <p className="text-sm">
                            Produto dos coeficientes = -1: a₁ × a₂ = -1
                          </p>
                          <p className="text-xs mt-1 font-mono">
                            y = 2x + 1 ⊥ y = -½x + 3
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-1" className="mt-16">
            <QuizInterativo
              questoes={quizAfim}
              titulo="Quiz - Função Afim"
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
          titulo="Função Quadrática (2º Grau)"
          descricao="f(x) = ax² + bx + c — a parábola."
          gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Parábola e Vértice"
              variant="emerald"
              className="mb-6"
            />
            <ContentAccordion
              titulo="A Parábola: Forma, Vértice e Concavidade"
              icone="📐"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Forma Geral e Coeficientes",
                  icone: "🔑",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="p-5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center space-y-2">
                        <p className="text-lg font-bold font-mono">
                          f(x) = ax² + bx + c
                        </p>
                        <p className="text-sm">onde a ≠ 0</p>
                      </div>
                      <div className="grid md:grid-cols-3 gap-3">
                        <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center">
                          <p className="font-bold">a</p>
                          <p className="text-xs">
                            Define concavidade e abertura
                          </p>
                        </div>
                        <div className="p-3 bg-teal-500/10 rounded-xl border border-teal-500/20 text-center">
                          <p className="font-bold">b</p>
                          <p className="text-xs">
                            Influencia posição do vértice
                          </p>
                        </div>
                        <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-center">
                          <p className="font-bold">c</p>
                          <p className="text-xs">
                            Onde cruza o eixo y (f(0) = c)
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Vértice da Parábola",
                  icone: "📍",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="p-5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center space-y-1">
                        <p className="font-bold font-mono">x_v = -b / (2a)</p>
                        <p className="font-bold font-mono">
                          y_v = -Δ / (4a) ou f(x_v)
                        </p>
                      </div>
                      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                        <p className="font-bold text-amber-700 dark:text-amber-400">
                          📝 Exemplo Resolvido
                        </p>
                        <p className="mt-1">
                          f(x) = x² - 4x + 3. a=1, b=-4, c=3.
                        </p>
                        <p className="mt-1">
                          x_v = -(-4)/(2×1) = <strong>2</strong>
                        </p>
                        <p>
                          y_v = f(2) = 4 - 8 + 3 = <strong>-1</strong>
                        </p>
                        <p className="mt-1">
                          Vértice: <strong>(2, -1)</strong> — ponto de{" "}
                          <em>mínimo</em> (a {">"} 0).
                        </p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20 text-center">
                          <p className="font-bold text-green-700 dark:text-green-400">
                            a {">"} 0 → MÍNIMO
                          </p>
                          <p className="text-sm mt-1">
                            Concavidade para cima (∪)
                          </p>
                        </div>
                        <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20 text-center">
                          <p className="font-bold text-red-700 dark:text-red-400">
                            a {"<"} 0 → MÁXIMO
                          </p>
                          <p className="text-sm mt-1">
                            Concavidade para baixo (∩)
                          </p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="⚠️ Pegadinha CESGRANRIO">
                        A banca adora perguntar &quot;qual o valor MÁXIMO/MÍNIMO
                        de f(x)?&quot; — a resposta é <strong>y_v</strong>, NÃO
                        x_v! x_v é QUANDO ocorre o máximo/mínimo; y_v é O VALOR
                        máximo/mínimo.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Raízes e Discriminante",
                  icone: "📊",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        As raízes são encontradas por Bhaskara:{" "}
                        <strong>Δ = b² - 4ac</strong>
                      </p>
                      <CardCarousel
                        cards={[
                          {
                            titulo: "Δ > 0",
                            descricao:
                              "2 raízes reais distintas — parábola cruza o eixo x em 2 pontos",
                            icone: "✌️",
                          },
                          {
                            titulo: "Δ = 0",
                            descricao:
                              "1 raiz dupla — parábola tangencia o eixo x (vértice toca)",
                            icone: "1️⃣",
                          },
                          {
                            titulo: "Δ < 0",
                            descricao:
                              "0 raízes reais — parábola não toca o eixo x",
                            icone: "❌",
                          },
                        ]}
                      />
                      <AlertBox tipo="info" titulo="Contexto Petrobras">
                        Funções quadráticas modelam custos, receitas e lucros.
                        Na prova, problemas de otimização (lucro máximo, custo
                        mínimo) sempre usam o vértice da parábola.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-2" className="mt-16">
            <QuizInterativo
              questoes={quizQuadratica}
              titulo="Quiz - Função Quadrática"
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
          titulo="Análise Gráfica"
          descricao="Imagem, sinal e domínio das funções."
          gradiente="bg-gradient-to-br from-amber-600 via-orange-600 to-red-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Estudo do Sinal"
              variant="amber"
              className="mb-6"
            />
            <CardCarousel
              cards={[
                {
                  titulo: "a > 0",
                  descricao: "Parábola para cima (∪). f(x)<0 ENTRE as raízes.",
                  icone: "⬆️",
                },
                {
                  titulo: "a < 0",
                  descricao: "Parábola para baixo (∩). f(x)>0 ENTRE as raízes.",
                  icone: "⬇️",
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-3" className="mt-16">
            <QuizInterativo
              questoes={quizGrafico}
              titulo="Quiz - Análise Gráfica"
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
          titulo="Aplicações Industriais"
          descricao="Lucro, custo e receita modelados por funções."
          gradiente="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Modelagem com Funções"
              variant="violet"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Modelagem com Funções"
              icone="🏭"
              corIndicador="bg-violet-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Lucro, Receita e Custo",
                  icone: "💰",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="p-5 bg-violet-500/10 rounded-xl border border-violet-500/20 text-center space-y-1">
                        <p className="font-bold font-mono">
                          L(x) = R(x) - C(x)
                        </p>
                        <p className="text-sm">Lucro = Receita - Custo</p>
                      </div>
                      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                        <p className="font-bold text-amber-700 dark:text-amber-400">
                          📝 Exemplo Resolvido
                        </p>
                        <p className="mt-1">
                          R(x) = 50x (receita) e C(x) = 2x² + 10x (custo).
                        </p>
                        <p>
                          L(x) = 50x - 2x² - 10x = <strong>-2x² + 40x</strong>
                        </p>
                        <p>
                          Lucro máximo: x_v = -40/(2×(-2)) ={" "}
                          <strong>10 unidades</strong>
                        </p>
                        <p>
                          L(10) = -200 + 400 = <strong>R$ 200</strong>
                        </p>
                      </div>
                      <AlertBox
                        tipo="success"
                        titulo="Break-even (Ponto de Equilíbrio)"
                      >
                        É quando L(x) = 0 (lucro zero). São as raízes da função
                        lucro. <strong>Entre as raízes</strong>, há lucro
                        positivo.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Problemas de Máximo e Mínimo",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Na CESGRANRIO, problemas de otimização pedem: &quot;qual
                        a produção que maximiza o lucro?&quot; ou &quot;qual a
                        quantidade que minimiza o custo?&quot;. A resposta é{" "}
                        <strong>sempre o vértice</strong>.
                      </p>
                      <CardCarousel
                        cards={[
                          {
                            titulo: "Passo 1",
                            descricao:
                              "Monte a função (lucro, custo, área, etc.)",
                            icone: "📝",
                          },
                          {
                            titulo: "Passo 2",
                            descricao: "Identifique a, b e c na forma ax²+bx+c",
                            icone: "🔍",
                          },
                          {
                            titulo: "Passo 3",
                            descricao:
                              "x_v = -b/2a (quando ocorre) e y_v = f(x_v) (o valor)",
                            icone: "📍",
                          },
                          {
                            titulo: "Passo 4",
                            descricao: "Verifique: a<0 → máximo; a>0 → mínimo",
                            icone: "✅",
                          },
                        ]}
                      />
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-4" className="mt-16">
            <QuizInterativo
              questoes={quizAplicacoes}
              titulo="Quiz - Aplicações"
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
          descricao="Questões integrando funções afins e quadráticas."
          gradiente="bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700"
        />
        <div className="space-y-[50px]">
          <section id="quiz-modulo-5" className="mt-16">
            <QuizInterativo
              questoes={quizFinal}
              titulo="Desafio Final - Funções"
              icone="🏆"
              numero={5}
              variant="rose"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
          {completedModules.has("modulo-5") && (
            <div className="mt-16 p-12 bg-gradient-to-br from-blue-600 to-cyan-700 rounded-[2rem] text-white text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="relative z-10 space-y-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-5xl mx-auto backdrop-blur-sm border border-white/30 animate-bounce">
                  📈
                </div>
                <h3 className="text-4xl font-black italic tracking-tighter">
                  FUNÇÕES DOMINADAS!
                </h3>
                <p className="text-xl opacity-90 max-w-xl mx-auto">
                  Afim e Quadrática são pilares da prova. Excelente!
                </p>
              </div>
            </div>
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
