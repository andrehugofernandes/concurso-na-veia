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
  LessonTabs,
  FlipCard,
  ModuleSummaryCarouselNew,
} from "../shared";
import { 
  LuTrendingUp, 
  LuTrendingDown, 
  LuDollarSign, 
  LuPercent, 
  LuCalendar, 
  LuCalculator, 
  LuBookOpen, 
  LuTarget, 
  LuLightbulb 
} from "react-icons/lu";
import {
  QUIZ_M1_JUROS_SIMPLES,
  QUIZ_M2_MONTANTE_SIMPLES,
  QUIZ_M3_JUROS_COMPOSTOS,
  QUIZ_M4_MONTANTE_COMPOSTO,
  QUIZ_M5_DESCONTO,
  QUIZ_M6_EQUIVALENCIA,
  QUIZ_M7_TAXAS,
  QUIZ_M8_SERIES,
  QUIZ_M9_APLICACOES_PETROBRAS,
  QUIZ_M10_SIMULADO,
} from "./data/matematica-financeira-quizzes";

export default function AulaMatematicaFinanceira({
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

  const [quizM1] = useState(() => getRandomQuestions(QUIZ_M1_JUROS_SIMPLES, 6));
  const [quizM2] = useState(() => getRandomQuestions(QUIZ_M2_MONTANTE_SIMPLES, 6));
  const [quizM3] = useState(() => getRandomQuestions(QUIZ_M3_JUROS_COMPOSTOS, 6));
  const [quizM4] = useState(() => getRandomQuestions(QUIZ_M4_MONTANTE_COMPOSTO, 6));
  const [quizM5] = useState(() => getRandomQuestions(QUIZ_M5_DESCONTO, 6));
  const [quizM6] = useState(() => getRandomQuestions(QUIZ_M6_EQUIVALENCIA, 6));
  const [quizM7] = useState(() => getRandomQuestions(QUIZ_M7_TAXAS, 6));
  const [quizM8] = useState(() => getRandomQuestions(QUIZ_M8_SERIES, 6));
  const [quizM9] = useState(() => getRandomQuestions(QUIZ_M9_APLICACOES_PETROBRAS, 6));
  const [quizM10] = useState(() => getRandomQuestions(QUIZ_M10_SIMULADO, 6));

  const isModuleUnlocked = (_index: number) => true;

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) {
      setCompletedModules((prev) => {
        const n = new Set(prev);
        n.add(moduleId);
        return n;
      });
      const modules = Array.from({ length: 10 }, (_, i) => `modulo-${i + 1}`);
      const idx = modules.findIndex((m) => m === moduleId);
      const pct = Math.round(((idx + 1) / 10) * 100);
      onUpdateProgress?.(pct);
      if (idx < 9) setTimeout(() => setActiveTab(`modulo-${idx + 2}`), 1500);
    }
  };

  useEffect(() => {
    if (currentProgress && currentProgress > 0) {
      const count = Math.floor((currentProgress / 100) * 10);
      const s = new Set<string>();
      for (let i = 1; i <= count; i++) s.add(`modulo-${i}`);
      setCompletedModules(s);
    }
  }, [currentProgress]);

  const MODULE_DEFS = [
    { id: "modulo-1", label: "Módulo 1", titulo: "Juros Simples" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Montante Simples" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Juros Compostos" },
    { id: "modulo-4", label: "Módulo 4", titulo: "Montante Composto" },
    { id: "modulo-5", label: "Módulo 5", titulo: "Desconto" },
    { id: "modulo-6", label: "Módulo 6", titulo: "Equivalência de Capitais" },
    { id: "modulo-7", label: "Módulo 7", titulo: "Taxas Nominal e Efetiva" },
    { id: "modulo-8", label: "Módulo 8", titulo: "Séries de Pagamento" },
    { id: "modulo-9", label: "Módulo 9", titulo: "Aplicações Petrobras" },
    { id: "modulo-10", label: "Módulo 10", titulo: "Simulado Final" },
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
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 1: JUROS SIMPLES — CONCEITO E FÓRMULA                     */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="Juros Simples: J = C · i · t"
          descricao="Compreenda o regime de capitalização simples, onde os juros incidem sempre sobre o capital inicial — base de descontos e operações de curto prazo."
          gradiente="bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="A Fórmula dos Juros Simples"
              description="A base de tudo: J = C·i·t. Domine-a e resolva 70% das questões de curto prazo."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Conceito e Derivação"
              icone="💰"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "O que são Juros Simples?",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Em juros simples, os juros incidem <strong>sempre sobre o capital inicial (C)</strong>, independentemente do tempo. O montante cresce de forma <strong>linear</strong>.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <FlipCard
                          frente={
                            <div className="flex flex-col items-center justify-center p-4">
                              <LuTrendingUp className="w-8 h-8 text-blue-500 mb-2" />
                              <span className="text-xl font-bold">J = Cit</span>
                              <span className="text-[10px] text-muted-foreground uppercase mt-1">Gire para ver</span>
                            </div>
                          }
                          verso={
                            <div className="flex flex-col items-center justify-center p-4 text-center">
                              <p className="text-xs font-semibold text-blue-500 mb-1">Juros Simples</p>
                              <p className="text-[10px] text-muted-foreground leading-tight">
                                J: Juros<br/>C: Capital<br/>i: Taxa (%)<br/>t: Tempo
                              </p>
                            </div>
                          }
                        />
                        <FlipCard
                          frente={
                            <div className="flex flex-col items-center justify-center p-4">
                              <LuDollarSign className="w-8 h-8 text-emerald-500 mb-2" />
                              <span className="text-xl font-bold">M = C + J</span>
                              <span className="text-[10px] text-muted-foreground uppercase mt-1">Fórmula do Montante</span>
                            </div>
                          }
                          verso={
                            <div className="flex flex-col items-center justify-center p-4 text-center">
                              <p className="text-xs font-semibold text-emerald-500 mb-1">Montante Final</p>
                              <p className="text-[10px] text-muted-foreground leading-tight">
                                O total acumulado após o período de juros.
                              </p>
                            </div>
                          }
                        />
                        <FlipCard
                          frente={
                            <div className="flex flex-col items-center justify-center p-4">
                              <LuCalculator className="w-8 h-8 text-cyan-500 mb-2" />
                              <span className="text-xl font-bold">M = C(1+it)</span>
                              <span className="text-[10px] text-muted-foreground uppercase mt-1">Forma Direta</span>
                            </div>
                          }
                          verso={
                            <div className="flex flex-col items-center justify-center p-4 text-center">
                              <p className="text-xs font-semibold text-cyan-500 mb-1">Cálculo Direto</p>
                              <p className="text-[10px] text-muted-foreground leading-tight">
                                Útil quando o problema pede o montante sem calcular os juros separadamente.
                              </p>
                            </div>
                          }
                        />
                      </div>
                      <AlertBox tipo="info" titulo="Contextualização Petrobras">
                        A Petrobras aplicou R$ 1.000.000 a 2% ao mês por 6 meses em juros simples. Os juros gerados: J = 1.000.000 × 0,02 × 6 = <strong>R$ 120.000</strong>. O montante final = R$ 1.120.000.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Unidade de Tempo e Taxa",
                  icone: "⏱️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A taxa <strong>i</strong> e o tempo <strong>t</strong> devem estar na <strong>mesma unidade</strong>. Se i é mensal, t deve ser em meses.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-xs font-bold text-emerald-500 mb-2">Correto</p>
                          <p className="text-sm">i = 2% a.m., t = 3 meses</p>
                          <p className="text-sm">J = C × 0,02 × 3</p>
                        </div>
                        <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/20">
                          <p className="text-xs font-bold text-rose-500 mb-2">Errado</p>
                          <p className="text-sm">i = 2% a.m., t = 90 dias</p>
                          <p className="text-sm">Converter: 90 dias ÷ 30 = 3 meses</p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        A banca frequentemente dá a taxa em meses e o tempo em dias (ou vice-versa). <strong>Sempre converta para a mesma unidade antes de calcular.</strong> Confundir unidades é o erro mais comum nas questões de juros simples.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Isolando Variáveis",
                  icone: "🔍",
                  conteudo: (
                    <div className="space-y-4">
                      <p>Da fórmula J = C·i·t, podemos isolar qualquer variável:</p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm font-mono">C = J / (i · t)  — para encontrar o capital</p>
                        <p className="text-sm font-mono">i = J / (C · t)  — para encontrar a taxa</p>
                        <p className="text-sm font-mono">t = J / (C · i)  — para encontrar o tempo</p>
                      </div>
                      <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                        <p className="text-xs font-bold text-cyan-400 mb-2">Exemplo Industrial</p>
                        <p className="text-sm">Uma empresa fornecedora da REPLAN aplicou capital desconhecido a 3% a.m. por 4 meses e obteve J = R$ 24.000.</p>
                        <p className="text-sm font-bold mt-1">C = 24.000 / (0,03 × 4) = 24.000 / 0,12 = <strong>R$ 200.000</strong></p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Comparação: Simples vs. Composto"
              description="Entenda desde já a diferença crítica — a base de muitas pegadinhas da CESGRANRIO."
              variant="emerald"
              className="mb-6"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-blue-500/5 rounded-xl border border-blue-500/20 space-y-3">
                <p className="text-sm font-bold text-blue-400">Juros Simples</p>
                <p className="text-xs text-muted-foreground">Incide sempre sobre o capital inicial</p>
                <div className="bg-blue-500/10 rounded-lg p-3">
                  <p className="text-xs font-mono">C=1.000, i=10%, t=3</p>
                  <p className="text-xs font-mono">Ano 1: J = 100</p>
                  <p className="text-xs font-mono">Ano 2: J = 100</p>
                  <p className="text-xs font-mono">Ano 3: J = 100</p>
                  <p className="text-xs font-mono font-bold">Total J = 300 | M = 1.300</p>
                </div>
              </div>
              <div className="p-5 bg-emerald-500/5 rounded-xl border border-emerald-500/20 space-y-3">
                <p className="text-sm font-bold text-emerald-400">Juros Compostos</p>
                <p className="text-xs text-muted-foreground">Incide sobre o montante acumulado</p>
                <div className="bg-emerald-500/10 rounded-lg p-3">
                  <p className="text-xs font-mono">C=1.000, i=10%, t=3</p>
                  <p className="text-xs font-mono">Ano 1: J = 100 (sobre 1.000)</p>
                  <p className="text-xs font-mono">Ano 2: J = 110 (sobre 1.100)</p>
                  <p className="text-xs font-mono">Ano 3: J = 121 (sobre 1.210)</p>
                  <p className="text-xs font-mono font-bold">Total J = 331 | M = 1.331</p>
                </div>
              </div>
            </div>
            <AlertBox tipo="danger" titulo="Pegadinha Fatal CESGRANRIO">
              Nunca aplique J = C·i·t em um contexto de juros compostos, nem M = C·(1+i)^t em um problema que pede juros simples. Identifique o regime antes de calcular. A banca explora isso sistematicamente.
            </AlertBox>
          </section>

          <section id="quiz-modulo-1" className="mt-16">
            <QuizInterativo
              questoes={quizM1}
              titulo="Quiz — Juros Simples"
              icone="💰"
              numero={1}
              variant="blue"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 2: MONTANTE EM JUROS SIMPLES                              */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <ModuleBanner
          numero={2}
          titulo="Montante em Juros Simples: M = C + J"
          descricao="Calcule o valor total retornado ao final de uma aplicação simples e interprete graficamente o crescimento linear."
          gradiente="bg-gradient-to-br from-cyan-600 via-cyan-700 to-blue-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="M = C(1 + i·t): A Fórmula do Montante"
              description="O montante unifica capital e juros em uma única expressão compacta."
              variant="cyan"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Montante e Suas Aplicações"
              icone="📈"
              corIndicador="bg-cyan-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Derivando a Fórmula",
                  icone: "🧮",
                  conteudo: (
                    <div className="space-y-4">
                      <p>O montante é o capital acrescido dos juros:</p>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm font-mono">M = C + J</p>
                        <p className="text-sm font-mono">M = C + C·i·t</p>
                        <p className="text-sm font-mono font-bold">M = C·(1 + i·t)</p>
                      </div>
                      <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                        <p className="text-xs font-bold text-blue-400 mb-2">Exemplo Petrobras</p>
                        <p className="text-sm">Aplicação de R$ 300.000 a 1,5% a.m. por 8 meses:</p>
                        <p className="text-sm font-bold">M = 300.000 × (1 + 0,015 × 8) = 300.000 × 1,12 = <strong>R$ 336.000</strong></p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Isolando o Capital (Valor Presente)",
                  icone: "🔄",
                  conteudo: (
                    <div className="space-y-4">
                      <p>O capital inicial (Valor Presente) é obtido invertendo a fórmula:</p>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
                        <p className="text-sm font-mono font-bold text-center">C = M / (1 + i·t)</p>
                      </div>
                      <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                        <p className="text-xs font-bold text-emerald-400 mb-2">Aplicação Industrial</p>
                        <p className="text-sm">Um contrato da TRANSPETRO resultou em M = R$ 130.000 após 5 meses a 2% a.m. simples. Capital inicial:</p>
                        <p className="text-sm font-bold">C = 130.000 / (1 + 0,02 × 5) = 130.000 / 1,10 = <strong>R$ 118.182</strong></p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Crescimento Linear vs. Exponencial",
                  icone: "📊",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Em juros simples, M cresce linearmente com t: <strong>M = (C·i)·t + C</strong>. É uma reta com inclinação C·i.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-xs font-bold text-blue-400 mb-2">Simples (reta)</p>
                          <p className="text-xs">t=1: M = 1.000 × 1,10 = 1.100</p>
                          <p className="text-xs">t=2: M = 1.000 × 1,20 = 1.200</p>
                          <p className="text-xs">t=3: M = 1.000 × 1,30 = 1.300</p>
                          <p className="text-xs font-bold mt-1">Incremento: +100 constante</p>
                        </div>
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-xs font-bold text-emerald-400 mb-2">Composto (curva)</p>
                          <p className="text-xs">t=1: M = 1.000 × 1,10 = 1.100</p>
                          <p className="text-xs">t=2: M = 1.000 × 1,21 = 1.210</p>
                          <p className="text-xs">t=3: M = 1.000 × 1,331 = 1.331</p>
                          <p className="text-xs font-bold mt-1">Incremento: crescente</p>
                        </div>
                      </div>
                      <AlertBox tipo="info" titulo="Questão Clássica CESGRANRIO">
                        Questões que descrevem crescimento do montante como "constante por período" indicam <strong>juros simples</strong> (crescimento linear). Crescimento "acelerado" ou "exponencial" indica juros compostos.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Resumo Tático: Montante Simples"
              description="Visão rápida para tomada de decisão."
              variant="cyan"
            />
            <LessonTabs
              tabs={[
                {
                  id: "resumo-m-simples",
                  label: "Fluxo de Caixa",
                  icon: LuLightbulb,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "M = C(1+it)",
                          type: "Fórmula",
                          placeholderColor: "bg-cyan-100 dark:bg-cyan-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Ilustração técnica de um fluxograma financeiro mostrando a entrada do Capital e a saída do Montante com juros acumulados linearmente.
                        },
                      ]}
                      moduloNome="Módulo 2"
                      tituloAula="Matemática Financeira"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Relações Inversas: Desconto Simples"
              description="Calcular o Valor Presente (PV) a partir do Valor Futuro (FV) em juros simples."
              variant="emerald"
              className="mb-6"
            />
            <div className="space-y-4">
              <p className="text-sm">
                Quando precisamos calcular o quanto vale hoje um valor futuro (ex: uma duplicata), usamos a fórmula inversa do montante:
              </p>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 space-y-2">
                <p className="text-sm font-mono text-center">PV = FV / (1 + i·t)  — desconto por dentro (racional)</p>
                <p className="text-sm font-mono text-center">PV = FV × (1 - i·t)  — desconto por fora (comercial)</p>
              </div>
              <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                Há <strong>dois tipos</strong> de desconto simples e a banca cobra a diferença. No desconto comercial (por fora), PV = FV·(1 - i·t). No racional (por dentro), PV = FV/(1 + i·t). O desconto comercial é <strong>sempre maior</strong>. Saiba identificar qual está sendo pedido.
              </AlertBox>
            </div>
          </section>

          <section id="quiz-modulo-2" className="mt-16">
            <QuizInterativo
              questoes={quizM2}
              titulo="Quiz — Montante em Juros Simples"
              icone="📈"
              numero={2}
              variant="cyan"
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 3: JUROS COMPOSTOS — CONCEITO E FÓRMULA                   */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <ModuleBanner
          numero={3}
          titulo="Juros Compostos: Juros sobre Juros"
          descricao="O regime dominante no mercado financeiro: os juros se incorporam ao capital a cada período, gerando crescimento exponencial."
          gradiente="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="O Mecanismo da Capitalização Composta"
              description="Entenda como os juros se acumulam sobre si mesmos a cada período."
              variant="emerald"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Capitalização e Crescimento Exponencial"
              icone="📊"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Como Funciona a Capitalização",
                  icone: "🔄",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Em juros compostos, ao final de cada período, os juros são <strong>adicionados ao capital</strong> e, no próximo período, os juros incidem sobre esse novo total.
                      </p>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 space-y-1">
                        <p className="text-xs font-mono">Período 0: Capital = C</p>
                        <p className="text-xs font-mono">Período 1: Capital = C × (1+i)</p>
                        <p className="text-xs font-mono">Período 2: Capital = C × (1+i) × (1+i) = C × (1+i)²</p>
                        <p className="text-xs font-mono font-bold">Período t: M = C × (1+i)^t</p>
                      </div>
                      <AlertBox tipo="info" titulo="Contexto Petrobras">
                        Um contrato de financiamento de R$ 500.000 a 2% a.m. composto: após 6 meses, M = 500.000 × (1,02)^6. Usando (1,02)^6 = 1,1262: M = <strong>R$ 563.100</strong>. Em juros simples, M = 500.000 × 1,12 = R$ 560.000. A diferença de R$ 3.100 são os "juros sobre juros".
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "O Fator de Capitalização (1+i)^t",
                  icone: "🧮",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        O fator <strong>(1+i)^t</strong> é a chave dos juros compostos. Em provas, ele geralmente é fornecido ou calculável com dados simples.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                        {[
                          { n: "(1,01)^2", v: "1,0201", desc: "1% p/ 2 meses" },
                          { n: "(1,02)^2", v: "1,0404", desc: "2% p/ 2 meses" },
                          { n: "(1,05)^2", v: "1,1025", desc: "5% p/ 2 meses" },
                          { n: "(1,10)^2", v: "1,2100", desc: "10% p/ 2 meses" },
                          { n: "(1,01)^3", v: "1,0303", desc: "1% p/ 3 meses" },
                          { n: "(1,02)^3", v: "1,0612", desc: "2% p/ 3 meses" },
                          { n: "(1,05)^3", v: "1,1576", desc: "5% p/ 3 meses" },
                          { n: "(1,10)^3", v: "1,3310", desc: "10% p/ 3 meses" },
                        ].map((item) => (
                          <FlipCard
                            key={item.n}
                            frente={
                              <div className="flex flex-col items-center justify-center p-2 text-center">
                                <span className="text-lg font-bold text-indigo-500">{item.n}</span>
                                <span className="text-[10px] text-muted-foreground mt-1 uppercase">Fator</span>
                              </div>
                            }
                            verso={
                              <div className="flex flex-col items-center justify-center p-2 text-center text-emerald-500">
                                <span className="text-md font-mono font-bold">{item.v}</span>
                                <span className="text-[10px] text-muted-foreground mt-1 leading-tight">{item.desc}</span>
                              </div>
                            }
                          />
                        ))}
                      </div>
                      <AlertBox tipo="warning" titulo="Dica de Prova">
                        A CESGRANRIO sempre fornece os fatores necessários ou escolhe valores que resultam em números "limpos" (ex: (1,1)^2 = 1,21; (1,2)^2 = 1,44). Desconfie se seus cálculos gerarem números muito quebrados.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Comparação para t < 1 e t > 1",
                  icone: "⚖️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A relação entre juros simples e compostos depende do horizonte de tempo:
                      </p>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm"><strong>t = 1:</strong> J_simples = J_compostos (iguais)</p>
                        <p className="text-sm"><strong>t &gt; 1:</strong> J_compostos &gt; J_simples</p>
                        <p className="text-sm"><strong>t &lt; 1:</strong> J_simples &gt; J_compostos</p>
                      </div>
                      <AlertBox tipo="danger" titulo="Pegadinha da CESGRANRIO">
                        Questões de curto prazo (ex: 15 dias com taxa mensal) usam juros SIMPLES por convenção do mercado. Questões de longo prazo usam COMPOSTOS. A banca cobra essa convenção. Nunca use compostos para frações de período sem verificar o contexto.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-3" className="mt-16">
            <QuizInterativo
              questoes={quizM3}
              titulo="Quiz — Juros Compostos"
              icone="📊"
              numero={3}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 4: MONTANTE EM JUROS COMPOSTOS                            */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner
          numero={4}
          titulo="Montante Composto: M = C·(1+i)^t"
          descricao="Aplique a fórmula exponencial para calcular montantes, encontrar capitais presentes e determinar prazos em operações de longo prazo."
          gradiente="bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Cálculo e Aplicação do Montante Composto"
              description="Da fórmula à prática: financiamentos, investimentos e análise de retorno."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="M = C·(1+i)^t — Uso Completo"
              icone="💹"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Calculando M (Montante Futuro)",
                  icone: "🔮",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <FlipCard
                          frente={
                            <div className="flex flex-col items-center justify-center p-4">
                              <LuTrendingUp className="w-8 h-8 text-indigo-500 mb-2" />
                              <span className="text-xl font-bold">M = C(1+i)^t</span>
                              <span className="text-[10px] text-muted-foreground uppercase mt-1">Montante Composto</span>
                            </div>
                          }
                          verso={
                            <div className="flex flex-col items-center justify-center p-4 text-center">
                              <p className="text-xs font-semibold text-indigo-500 mb-1">Crescimento Exponencial</p>
                              <p className="text-[10px] text-muted-foreground leading-tight">
                                Os juros de cada período são incorporados ao capital para o cálculo do período seguinte.
                              </p>
                            </div>
                          }
                        />
                        <FlipCard
                          frente={
                            <div className="flex flex-col items-center justify-center p-4">
                              <LuTrendingDown className="w-8 h-8 text-rose-500 mb-2" />
                              <span className="text-xl font-bold">C = M / (1+i)^t</span>
                              <span className="text-[10px] text-muted-foreground uppercase mt-1">Valor Presente</span>
                            </div>
                          }
                          verso={
                            <div className="flex flex-col items-center justify-center p-4 text-center">
                              <p className="text-xs font-semibold text-rose-500 mb-1">Descapitalização</p>
                              <p className="text-[10px] text-muted-foreground leading-tight">
                                Traz um valor futuro para a data zero, retirando o efeito dos juros.
                              </p>
                            </div>
                          }
                        />
                      </div>
                      <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                        <p className="text-xs font-bold text-cyan-400 mb-2">Exemplo CESGRANRIO</p>
                        <p className="text-sm">Capital: R$ 200.000 | i = 1% a.m. | t = 6 meses | (1,01)^6 = 1,0615</p>
                        <p className="text-sm font-bold">M = 200.000 × 1,0615 = <strong>R$ 212.300</strong></p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Calculando C (Valor Presente)",
                  icone: "📉",
                  conteudo: (
                    <div className="space-y-4">
                      <p>Para encontrar o capital inicial que gera determinado montante futuro:</p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                        <p className="text-sm font-mono font-bold text-center">C = M / (1+i)^t</p>
                      </div>
                      <p className="text-sm">
                        Este cálculo é chamado de <strong>valor presente</strong> ou <strong>desconto composto</strong>. É usado para avaliar se vale a pena antecipar um pagamento futuro.
                      </p>
                      <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                        <p className="text-xs font-bold text-blue-400 mb-2">Aplicação PETROBRAS</p>
                        <p className="text-sm">Quanto investir hoje a 2% a.m. por 12 meses para obter R$ 268.240? (1,02)^12 = 1,2682</p>
                        <p className="text-sm font-bold">C = 268.240 / 1,2682 = <strong>R$ 211.500</strong></p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "A Regra do 72 — Estimativa de Dobramento",
                  icone: "⚡",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A <strong>Regra do 72</strong> é uma aproximação rápida para estimar em quanto tempo um capital dobra a determinada taxa:
                      </p>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                        <p className="text-sm font-mono font-bold text-center">t ≈ 72 / (i em %)</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/20 text-center">
                          <p className="text-xs font-bold text-emerald-400">i = 1% a.m.</p>
                          <p className="text-sm font-bold">72 meses ≈ 6 anos</p>
                        </div>
                        <div className="p-3 bg-blue-500/5 rounded-xl border border-blue-500/20 text-center">
                          <p className="text-xs font-bold text-blue-400">i = 2% a.m.</p>
                          <p className="text-sm font-bold">36 meses = 3 anos</p>
                        </div>
                        <div className="p-3 bg-cyan-500/5 rounded-xl border border-cyan-500/20 text-center">
                          <p className="text-xs font-bold text-cyan-400">i = 6% a.a.</p>
                          <p className="text-sm font-bold">12 anos</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-4" className="mt-16">
            <QuizInterativo
              questoes={quizM4}
              titulo="Quiz — Montante em Juros Compostos"
              icone="💹"
              numero={4}
              variant="blue"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 5: DESCONTO SIMPLES                                       */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="Desconto Simples: Comercial e Racional"
          descricao="Aprenda a calcular o valor presente de títulos (duplicatas, cheques) antecipando seus vencimentos — operação central no dia a dia das empresas."
          gradiente="bg-gradient-to-br from-cyan-600 via-teal-600 to-emerald-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Dois Tipos de Desconto Simples"
              description="Desconto Comercial (por fora) vs. Desconto Racional (por dentro) — saiba a diferença."
              variant="emerald"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Desconto Comercial e Racional"
              icone="🏦"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Desconto Comercial (Bancário)",
                  icone: "🏛️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        No desconto comercial (mais usado pelos bancos), o desconto incide sobre o <strong>valor nominal (N) — valor futuro</strong> do título:
                      </p>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm font-mono font-bold">Dc = N · d · t</p>
                        <p className="text-sm font-mono">PV = N - Dc = N · (1 - d·t)</p>
                      </div>
                      <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                        <p className="text-xs font-bold text-cyan-400 mb-2">Exemplo Industrial</p>
                        <p className="text-sm">Uma empresa fornecedora da PETROBRAS tem duplicata de R$ 40.000 vencendo em 3 meses. Banco desconta a 3% a.m. comercial:</p>
                        <p className="text-sm">Dc = 40.000 × 0,03 × 3 = R$ 3.600</p>
                        <p className="text-sm font-bold">PV = 40.000 - 3.600 = <strong>R$ 36.400</strong></p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Desconto Racional (Por Dentro)",
                  icone: "🧮",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        No desconto racional, o desconto incide sobre o <strong>valor presente (PV)</strong>. É o "justo" matematicamente:
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm font-mono font-bold">PV = N / (1 + i·t)</p>
                        <p className="text-sm font-mono">Dr = N - PV</p>
                      </div>
                      <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                        <p className="text-xs font-bold text-blue-400 mb-2">Mesmo Exemplo — Racional</p>
                        <p className="text-sm">N = R$ 40.000, i = 3% a.m., t = 3 meses:</p>
                        <p className="text-sm">PV = 40.000 / 1,09 ≈ R$ 36.697</p>
                        <p className="text-sm font-bold">Dr = 40.000 - 36.697 = <strong>R$ 3.303</strong></p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Comparação e Escolha do Devedor",
                  icone: "⚖️",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/20">
                          <p className="text-xs font-bold text-rose-400 mb-2">Desconto Comercial</p>
                          <p className="text-sm">Dc = R$ 3.600</p>
                          <p className="text-sm">PV = R$ 36.400</p>
                          <p className="text-xs text-muted-foreground mt-1">Mais caro para o devedor</p>
                        </div>
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-xs font-bold text-emerald-400 mb-2">Desconto Racional</p>
                          <p className="text-sm">Dr = R$ 3.303</p>
                          <p className="text-sm">PV = R$ 36.697</p>
                          <p className="text-xs text-muted-foreground mt-1">Mais barato para o devedor</p>
                        </div>
                      </div>
                      <AlertBox tipo="danger" titulo="Pegadinha Clássica CESGRANRIO">
                        A banca cobra: "qual desconto é maior?" — sempre o comercial (incide sobre N maior). E "qual PV é maior?" — sempre o racional (desconta menos). Memorize: <strong>Dc &gt; Dr</strong> e <strong>PV_racional &gt; PV_comercial</strong>.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Resumo Estratégico: Desconto"
              description="Diferenças fundamentais entre comercial e racional."
              variant="emerald"
            />
            <LessonTabs
              tabs={[
                {
                  id: "tab-desconto-1",
                  label: "Comparativo",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Comercial (Por Fora)",
                          type: "Esquema",
                          placeholderColor: "bg-rose-100 dark:bg-rose-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Diagrama de desconto comercial: incide sobre o valor NOMINAL. Flecha indicando desconto sobre o valor de face do título.
                        },
                        {
                          title: "Racional (Por Dentro)",
                          type: "Esquema",
                          placeholderColor: "bg-emerald-100 dark:bg-emerald-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Diagrama de desconto racional: incide sobre o valor ATUAL. Flecha indicando juros simples 'descontados' do valor presente.
                        },
                      ]}
                      moduloNome="Módulo 5"
                      tituloAula="Matemática Financeira"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-5" className="mt-16">
            <QuizInterativo
              questoes={quizM5}
              titulo="Quiz — Desconto Simples"
              icone="🏦"
              numero={5}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 6: EQUIVALÊNCIA DE CAPITAIS                               */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <ModuleBanner
          numero={6}
          titulo="Equivalência de Capitais"
          descricao="Compare e substitua dívidas transportando capitais para uma mesma data focal — habilidade essencial em renegociações e contratos da Petrobras."
          gradiente="bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="O Conceito de Data Focal"
              description="Toda comparação de capitais exige uma data de referência comum."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Transportando Capitais no Tempo"
              icone="🔀"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Por que precisamos de Data Focal?",
                  icone: "📅",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Dinheiro tem <strong>valor no tempo</strong>: R$ 100 hoje vale mais que R$ 100 em 1 ano (porque pode ser aplicado e render juros). Por isso, não podemos somar ou comparar capitais em datas diferentes diretamente.
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm font-mono">Para levar ao futuro: × (1+i)^t</p>
                        <p className="text-sm font-mono">Para levar ao passado: ÷ (1+i)^t = × (1+i)^(-t)</p>
                      </div>
                      <AlertBox tipo="info" titulo="Regra de Ouro">
                        Escolha a data focal que facilite os cálculos (geralmente a data do pagamento único proposto ou a data 0). <strong>Todos os capitais devem ser transportados para a mesma data antes de qualquer operação.</strong>
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Substituição de Dívidas",
                  icone: "🔄",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Quando uma empresa da cadeia de fornecimento da Petrobras quer substituir várias dívidas por uma única, usa o princípio de equivalência:
                      </p>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
                        <p className="text-sm font-mono text-center font-bold">Soma dos VP(dívidas antigas) = VP(nova dívida)</p>
                        <p className="text-xs text-center text-muted-foreground mt-1">Na mesma data focal</p>
                      </div>
                      <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                        <p className="text-xs font-bold text-emerald-400 mb-2">Passo a Passo</p>
                        <p className="text-xs">1. Escolha a data focal</p>
                        <p className="text-xs">2. Transporte cada dívida para a data focal</p>
                        <p className="text-xs">3. Some os valores na data focal</p>
                        <p className="text-xs">4. Esse é o valor do pagamento único na data focal</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplo Completo — PETROBRAS",
                  icone: "🏭",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                        <p className="text-xs font-bold text-blue-400 mb-2">Situação</p>
                        <p className="text-sm">A PETROBRAS tem 2 dívidas: R$ 100.000 em 2 meses e R$ 150.000 em 5 meses. Deseja pagar em 3 meses. Taxa: 2% a.m. (1,02)^2 = 1,0404; (1,02)^(-2) ≈ 0,9612</p>
                      </div>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 space-y-1">
                        <p className="text-xs font-bold text-cyan-400">Data focal = mês 3:</p>
                        <p className="text-sm font-mono">R$ 100.000 → mês 3: × 1,02 = R$ 102.000</p>
                        <p className="text-sm font-mono">R$ 150.000 → mês 3: × (1,02)^(-2) = 150.000 × 0,9612 = R$ 144.180</p>
                        <p className="text-sm font-mono font-bold">Pagamento único = 102.000 + 144.180 = R$ 246.180</p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Resumo Estratégico: Equivalência"
              description="Data Focal e Transporte de Valores."
              variant="blue"
            />
            <LessonTabs
              tabs={[
                {
                  id: "tab-equiv-1",
                  label: "Data Focal",
                  icon: LuCalendar,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Transporte no Tempo",
                          type: "Esquema",
                          placeholderColor: "bg-blue-100 dark:bg-blue-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Esquema mostrando uma linha do tempo com capitais sendo movidos para frente (capitalização) e para trás (desconto) até uma data focal centralizada.
                        },
                      ]}
                      moduloNome="Módulo 6"
                      tituloAula="Matemática Financeira"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-6" className="mt-16">
            <QuizInterativo
              questoes={quizM6}
              titulo="Quiz — Equivalência de Capitais"
              icone="🔀"
              numero={6}
              variant="blue"
              onComplete={(score) => handleModuleComplete("modulo-6", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 7: TAXA NOMINAL vs TAXA EFETIVA                           */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <ModuleBanner
          numero={7}
          titulo="Taxa Nominal vs. Taxa Efetiva"
          descricao="Entenda a diferença entre a taxa anunciada e a taxa que realmente incide sobre seu capital — fonte de inúmeras pegadinhas da CESGRANRIO."
          gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Nominal, Efetiva e Equivalente"
              description="Três conceitos que muitos confundem — domine-os e nunca erre esse tipo de questão."
              variant="emerald"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Tipos de Taxas em Matemática Financeira"
              icone="📊"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Taxa Nominal",
                  icone: "🏷️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A taxa <strong>nominal</strong> é a taxa declarada para um período, mas a capitalização ocorre em período diferente (geralmente menor).
                      </p>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                        <p className="text-sm">Exemplo: <strong>"12% ao ano, capitalizado mensalmente"</strong></p>
                        <p className="text-sm mt-2">→ 12% é a taxa nominal anual</p>
                        <p className="text-sm">→ Capitalização: mensal (12 vezes por ano)</p>
                        <p className="text-sm font-bold">→ Taxa mensal efetiva = 12%/12 = 1% a.m.</p>
                      </div>
                      <AlertBox tipo="warning" titulo="Regra da Taxa Nominal">
                        Taxa nominal: divide-se pelo número de capitalizações no período para obter a taxa efetiva do subperíodo. Isso só vale para conversão de nominal para efetiva. Para comparar taxas de períodos diferentes em compostos, use equivalência.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Taxa Efetiva e Taxa Equivalente",
                  icone: "✅",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A taxa <strong>efetiva</strong> é a que realmente incide no período de capitalização. Taxas são <strong>equivalentes</strong> quando geram o mesmo montante no mesmo prazo.
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm font-mono font-bold">Equivalência em juros compostos:</p>
                        <p className="text-sm font-mono">(1 + i_a)^1 = (1 + i_m)^12</p>
                        <p className="text-sm font-mono">i_a = (1 + i_m)^12 - 1</p>
                      </div>
                      <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                        <p className="text-xs font-bold text-cyan-400 mb-2">Exemplo CESGRANRIO</p>
                        <p className="text-sm">Taxa efetiva anual equivalente a 2% a.m.:</p>
                        <p className="text-sm font-bold">i_a = (1,02)^12 - 1 = 1,2682 - 1 = <strong>26,82% a.a.</strong></p>
                        <p className="text-xs text-muted-foreground">Taxa nominal seria: 2% × 12 = 24% a.a. (subestima o custo real)</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Quadro-Resumo para Provas",
                  icone: "📋",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs border-collapse">
                          <thead>
                            <tr className="bg-emerald-500/10">
                              <th className="p-2 text-left border border-border">Conceito</th>
                              <th className="p-2 text-left border border-border">Definição</th>
                              <th className="p-2 text-left border border-border">Fórmula</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="p-2 border border-border font-bold">Nominal</td>
                              <td className="p-2 border border-border">Declarada; capitalização ≠ período</td>
                              <td className="p-2 border border-border font-mono">i_ef = i_nom / n</td>
                            </tr>
                            <tr>
                              <td className="p-2 border border-border font-bold">Efetiva</td>
                              <td className="p-2 border border-border">Real no período de capitalização</td>
                              <td className="p-2 border border-border font-mono">incide diretamente</td>
                            </tr>
                            <tr>
                              <td className="p-2 border border-border font-bold">Equivalente</td>
                              <td className="p-2 border border-border">Mesmo resultado em mesmo prazo</td>
                              <td className="p-2 border border-border font-mono">(1+i_a)^1 = (1+i_m)^12</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <AlertBox tipo="danger" titulo="A Pegadinha Mais Cobrada">
                        Taxa nominal anual ≠ taxa efetiva anual quando a capitalização é mensal, trimestral etc. Exemplo: 12% a.a. nominal cap. mensal → taxa efetiva anual = (1,01)^12 - 1 = 12,68% a.a. A diferença parece pequena mas em grandes capitais é significativa.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Resumo Tático: Taxas"
              description="Nominal, Efetiva e Equivalente."
              variant="emerald"
            />
            <LessonTabs
              tabs={[
                {
                  id: "tab-taxas-1",
                  label: "O Funil de Taxas",
                  icon: LuPercent,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Nominal -> Efetiva",
                          type: "Relação",
                          placeholderColor: "bg-emerald-100 dark:bg-emerald-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Infográfico mostrando o processo de conversão: Taxa Nominal (divisão simples) -> Taxa Efetiva do Período -> Taxa Efetiva Acumulada (Equivalência).
                        },
                      ]}
                      moduloNome="Módulo 7"
                      tituloAula="Matemática Financeira"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-7" className="mt-16">
            <QuizInterativo
              questoes={quizM7}
              titulo="Quiz — Taxas Nominal e Efetiva"
              icone="📊"
              numero={7}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-7", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 8: SÉRIES DE PAGAMENTO                                    */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <ModuleBanner
          numero={8}
          titulo="Séries de Pagamento (Anuidades)"
          descricao="Calcule financiamentos, parcelas e valores presentes de fluxos de caixa periódicos — base para contratos de longo prazo e planos de investimento."
          gradiente="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Anuidades Uniformes: PMT Constante"
              description="A fórmula de parcelas uniformes (PMT) e como interpretar os fatores de anuidade."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Fórmulas de Anuidade"
              icone="💳"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Valor Presente de uma Série",
                  icone: "📉",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        O valor presente (PV) de uma série de n pagamentos iguais PMT é:
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                        <p className="text-sm font-mono font-bold text-center">PV = PMT × [1 - (1+i)^(-n)] / i</p>
                      </div>
                      <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                        <p className="text-xs font-bold text-cyan-400 mb-2">Aplicação Petrobras</p>
                        <p className="text-sm">Contrato de R$ 5.000/mês por 12 meses a 1,5% a.m. (fator = 10,9075):</p>
                        <p className="text-sm font-bold">PV = 5.000 × 10,9075 = <strong>R$ 54.537</strong></p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Calculando a Parcela (PMT)",
                  icone: "🧮",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Para encontrar a parcela, inverta a fórmula do valor presente:
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                        <p className="text-sm font-mono font-bold text-center">PMT = PV × i / [1 - (1+i)^(-n)]</p>
                      </div>
                      <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                        <p className="text-xs font-bold text-emerald-400 mb-2">Financiamento Industrial</p>
                        <p className="text-sm">Equipamento de R$ 180.000, 12 parcelas a 2% a.m. (fator PMT = 0,0946):</p>
                        <p className="text-sm font-bold">PMT = 180.000 × 0,0946 = <strong>R$ 17.028/mês</strong></p>
                        <p className="text-xs text-muted-foreground mt-1">Total pago = 12 × 17.028 = R$ 204.336 (juros = R$ 24.336)</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Valor Futuro de uma Série",
                  icone: "📈",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Para acumular capital fazendo aportes periódicos (fundo de poupança):
                      </p>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
                        <p className="text-sm font-mono font-bold text-center">VF = PMT × [(1+i)^n - 1] / i</p>
                      </div>
                      <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                        <p className="text-xs font-bold text-blue-400 mb-2">Fundo de Renovação</p>
                        <p className="text-sm">Depósito de R$ 2.000/mês por 24 meses a 0,8% a.m. (1,008)^24 = 1,2096:</p>
                        <p className="text-sm font-bold">VF = 2.000 × (1,2096-1)/0,008 = 2.000 × 26,20 = <strong>R$ 52.400</strong></p>
                      </div>
                      <AlertBox tipo="warning" titulo="Série Antecipada vs. Postecipada">
                        Série postecipada: primeiro pagamento no final do período 1 (padrão). Série antecipada: primeiro pagamento imediato (data 0). O VF e PV da série antecipada = VF ou PV postecipada × (1+i).
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Price vs. SAC: Comparação Visual"
              description="A diferença que cai em todas as provas de alto nível."
              variant="blue"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 text-center h-full">
                    <LuCalculator className="w-12 h-12 text-blue-500 mb-4" />
                    <h4 className="text-xl font-bold">Sistema PRICE</h4>
                    <p className="text-sm text-muted-foreground mt-2">Parcelas (PMT) Constantes</p>
                  </div>
                }
                verso={
                  <div className="flex flex-col justify-center p-6 h-full space-y-2">
                    <p className="text-sm font-bold text-blue-500">Características:</p>
                    <ul className="text-xs space-y-1 list-disc list-inside text-muted-foreground">
                      <li>Parcelas iguais do início ao fim.</li>
                      <li>Amortização cresce no tempo.</li>
                      <li>Juros decrescem no tempo.</li>
                      <li>Saldo devedor cai mais devagar no início.</li>
                    </ul>
                  </div>
                }
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 text-center h-full">
                    <LuTrendingDown className="w-12 h-12 text-emerald-500 mb-4" />
                    <h4 className="text-xl font-bold">Sistema SAC</h4>
                    <p className="text-sm text-muted-foreground mt-2">Parcelas Decrescentes</p>
                  </div>
                }
                verso={
                  <div className="flex flex-col justify-center p-6 h-full space-y-2">
                    <p className="text-sm font-bold text-emerald-500">Características:</p>
                    <ul className="text-xs space-y-1 list-disc list-inside text-muted-foreground">
                      <li>Parcelas caem em cada período.</li>
                      <li>Amortização CONSTANTE (PV/n).</li>
                      <li>Juros caem linearmente.</li>
                      <li>Custo total de juros é menor que o Price.</li>
                    </ul>
                  </div>
                }
              />
            </div>
          </section>

          <section id="quiz-modulo-8" className="mt-16">
            <QuizInterativo
              questoes={quizM8}
              titulo="Quiz — Séries de Pagamento"
              icone="💳"
              numero={8}
              variant="blue"
              onComplete={(score) => handleModuleComplete("modulo-8", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 9: APLICAÇÕES PETROBRAS                                   */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <ModuleBanner
          numero={9}
          titulo="Aplicações Petrobras: Financiamentos e Contratos"
          descricao="Questões integradas com contexto real da indústria petrolífera: arrendamentos, PLR, financiamentos de equipamentos, debêntures e fundos de renovação."
          gradiente="bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Matemática Financeira no Setor Petrolífero"
              description="Como os conceitos se aplicam nos processos reais de investimento e financiamento da Petrobras."
              variant="cyan"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Cenários Reais de Aplicação"
              icone="🛢️"
              corIndicador="bg-cyan-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Financiamentos de Equipamentos",
                  icone: "⚙️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Plataformas, refinarias e gasodutos exigem investimentos massivos. A Petrobras usa financiamentos de longo prazo com séries de pagamento uniformes (sistema Price) ou decrescentes (sistema SAC).
                      </p>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm font-bold">Sistema Price (Parcelas Constantes):</p>
                        <p className="text-xs font-mono">PMT = PV × i / [1-(1+i)^(-n)]</p>
                        <p className="text-sm font-bold mt-2">Sistema SAC (Amortização Constante):</p>
                        <p className="text-xs font-mono">Amortização = PV/n (constante)</p>
                        <p className="text-xs font-mono">Juros = saldo devedor × i (decrescente)</p>
                      </div>
                      <AlertBox tipo="info" titulo="CESGRANRIO cobra:">
                        Diferença entre Price e SAC: no Price as parcelas são constantes; no SAC as parcelas decrescem (os juros diminuem à medida que a dívida é amortizada). No SAC, o total pago em juros é menor que no Price.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Arrendamento (Leasing) de Plataformas",
                  icone: "🛳️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        O arrendamento de plataformas offshore envolve contratos de longo prazo com pagamentos periódicos. O VPL (Valor Presente Líquido) determina se vale a pena alugar vs. comprar.
                      </p>
                      <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                        <p className="text-xs font-bold text-blue-400 mb-2">Decisão: Comprar vs. Alugar</p>
                        <p className="text-xs">Comprar: desembolso imediato C₀</p>
                        <p className="text-xs">Alugar: série de pagamentos mensais R por n meses</p>
                        <p className="text-xs mt-2">Comprar vale mais se: C₀ &lt; PV(aluguéis) = R × fator de anuidade</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "PLR e Investimentos dos Colaboradores",
                  icone: "👷",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Colaboradores da Petrobras recebem PLR (Participação nos Lucros e Resultados) e frequentemente precisam calcular o melhor destino financeiro desse recurso.
                      </p>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm font-bold">Comparação de Investimentos:</p>
                        <p className="text-xs">CDB: M = C·(1+i)^t</p>
                        <p className="text-xs">Poupança: taxa menor, sem IR sobre rendimento</p>
                        <p className="text-xs">Tesouro Direto: SELIC + spread, com marcação a mercado</p>
                      </div>
                      <AlertBox tipo="warning" titulo="Questão Típica de Prova">
                        A banca dá PLR de R$ X e pede "qual o montante em Y meses a Z% a.m. compostos?" com o fator fornecido. Aplicação direta: M = X × (1+Z)^Y. Não complique.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Resumo Visual: Casos Petrobras"
              description="Onde o dinheiro circula na indústria."
              variant="cyan"
            />
            <ModuleSummaryCarouselNew
              images={[
                {
                  title: "Investimento Offshore",
                  type: "Cenário",
                  placeholderColor: "bg-cyan-100 dark:bg-cyan-900/30",
                  imageUrl: "/temp-img.png", // PROMPT: Ilustração de uma plataforma de petróleo com fluxos de caixa de investimento e retorno. Legenda "Investimento e Amortização de Longo Prazo".
                },
                {
                  title: "Cadeia de Fornecedores",
                  type: "Cenário",
                  placeholderColor: "bg-blue-100 dark:bg-blue-900/30",
                  imageUrl: "/temp-img.png", // PROMPT: Diagrama mostrando a antecipação de recebíveis e descontos comerciais entre empresas e bancos.
                },
              ]}
              moduloNome="Módulo 9"
              tituloAula="Matemática Financeira"
              materia="Matemática"
            />
          </section>

          <section id="quiz-modulo-9" className="mt-16">
            <QuizInterativo
              questoes={quizM9}
              titulo="Quiz — Aplicações Petrobras"
              icone="🛢️"
              numero={9}
              variant="cyan"
              onComplete={(score) => handleModuleComplete("modulo-9", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 10: SIMULADO CESGRANRIO                                   */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <ModuleBanner
          numero={10}
          titulo="Simulado Final CESGRANRIO"
          descricao="Questões integradas no nível e estilo CESGRANRIO, cobrindo todos os tópicos de Matemática Financeira — o teste definitivo antes da prova real."
          gradiente="bg-gradient-to-br from-blue-700 via-indigo-700 to-blue-900"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Resumo Geral da Disciplina"
              description="Os pilares da Matemática Financeira."
              variant="blue"
              className="mb-6"
            />
            <LessonTabs
              tabs={[
                {
                  id: "tab-simulado-1",
                  label: "Mapa Mental",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Árvore de Decisão",
                          type: "Esquema",
                          placeholderColor: "bg-blue-100 dark:bg-blue-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Mapa mental completo de Matemática Financeira: do Capital inicial ao Montante, passando por Juros, Descontos, Taxas e Séries.
                        },
                      ]}
                      moduloNome="Módulo 10"
                      tituloAula="Matemática Financeira"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>
          {/* O div do banner já envolve tudo abaixo */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Revisão Geral: Os 5 Pilares"
              description="Consolide os conceitos antes de enfrentar o simulado final."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Resumo Completo — Matemática Financeira"
              icone="📚"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Fórmulas Essenciais",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-xs font-bold text-blue-400 mb-1">Juros Simples:</p>
                        <p className="text-sm font-mono">J = C·i·t | M = C(1+i·t)</p>
                        <p className="text-xs font-bold text-emerald-400 mt-2 mb-1">Juros Compostos:</p>
                        <p className="text-sm font-mono">M = C·(1+i)^t</p>
                        <p className="text-xs font-bold text-cyan-400 mt-2 mb-1">Descontos:</p>
                        <p className="text-sm font-mono">Dc = N·d·t | PV_comercial = N(1-d·t)</p>
                        <p className="text-sm font-mono">PV_racional = N/(1+i·t)</p>
                        <p className="text-xs font-bold text-blue-400 mt-2 mb-1">Séries:</p>
                        <p className="text-sm font-mono">PMT = PV·i / [1-(1+i)^(-n)]</p>
                        <p className="text-sm font-mono">PV = PMT·[1-(1+i)^(-n)] / i</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Checklist Anti-Pegadinhas",
                  icone: "✅",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <span className="text-emerald-400 text-sm">✓</span>
                          <p className="text-sm"><strong>Unidades:</strong> taxa e tempo na mesma unidade antes de calcular</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-emerald-400 text-sm">✓</span>
                          <p className="text-sm"><strong>Regime:</strong> identificar se é simples ou composto antes de aplicar a fórmula</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-emerald-400 text-sm">✓</span>
                          <p className="text-sm"><strong>Desconto:</strong> saber se é comercial (Dc {">"} Dr) ou racional (Dr)</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-emerald-400 text-sm">✓</span>
                          <p className="text-sm"><strong>Data focal:</strong> sempre levar todos os capitais para a mesma data</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-emerald-400 text-sm">✓</span>
                          <p className="text-sm"><strong>Nominal vs. Efetiva:</strong> não confundir taxa nominal com efetiva anual</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-emerald-400 text-sm">✓</span>
                          <p className="text-sm"><strong>t = 1:</strong> simples = compostos; t {">"} 1: compostos {">"} simples; t {"<"} 1: simples {">"} compostos</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Estratégia para a Prova CESGRANRIO",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">A CESGRANRIO segue um padrão consistente em Matemática Financeira:</p>
                      <div className="space-y-3">
                        <div className="p-3 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-xs font-bold text-blue-400 mb-1">1. Leia o enunciado identificando:</p>
                          <p className="text-xs">Regime (simples/composto) | Capital | Taxa | Prazo | Pergunta</p>
                        </div>
                        <div className="p-3 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="text-xs font-bold text-cyan-400 mb-1">2. Os fatores geralmente são fornecidos:</p>
                          <p className="text-xs">(1,02)^6 = 1,1262 | (1,01)^12 = 1,1268 etc. Use-os sem hesitar.</p>
                        </div>
                        <div className="p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-xs font-bold text-emerald-400 mb-1">3. Verifique a alternativa:</p>
                          <p className="text-xs">Se o resultado não está entre as opções, releia para ver se confundiu regime, desconto ou unidade.</p>
                        </div>
                      </div>
                      <AlertBox tipo="danger" titulo="A Pegadinha Definitiva">
                        Questões que misturam regimes no mesmo problema: "pagou juros simples por 3 meses, depois aplicou o montante em juros compostos por mais 6 meses". Faça em duas etapas separadas. Nunca misture as fórmulas em um único cálculo.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-10" className="mt-16">
            <QuizInterativo
              questoes={quizM10}
              titulo="Simulado Final CESGRANRIO — Matemática Financeira"
              icone="🏆"
              numero={10}
              variant="blue"
              onComplete={(score) => handleModuleComplete("modulo-10", score)}
            />
          </section>
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
