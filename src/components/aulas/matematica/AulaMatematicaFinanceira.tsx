import { getAllModuleVariants } from "@/lib/moduleColors";
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
  ModuleConsolidation,
} from "../shared";
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

const mv = [undefined, ...getAllModuleVariants()];

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

  const isModuleUnlocked = (_index: number) => true; // ✅ TODOS OS MÓDULOS DESBLOQUEADOS

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
        <ModuleBanner numero={1}
          titulo="Juros Simples: J = C · i · t"
          descricao="Compreenda o regime de capitalização simples, onde os juros incidem sempre sobre o capital inicial — base de descontos e operações de curto prazo."
           variant={mv[1]}/>
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
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm font-mono text-center font-bold">J = C · i · t</p>
                        <div className="grid grid-cols-3 gap-2 text-xs text-center mt-2">
                          <div className="bg-blue-500/10 rounded p-2">
                            <p className="font-bold text-blue-400">C</p>
                            <p>Capital inicial</p>
                          </div>
                          <div className="bg-cyan-500/10 rounded p-2">
                            <p className="font-bold text-cyan-400">i</p>
                            <p>Taxa por período</p>
                          </div>
                          <div className="bg-emerald-500/10 rounded p-2">
                            <p className="font-bold text-emerald-400">t</p>
                            <p>Número de períodos</p>
                          </div>
                        </div>
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
          











<ModuleConsolidation
            index={3}
            variant="indigo"
            video={{
              videoId: "XxrO_yVcrTI",
              title: "Juros Simples: Fórmula J=Cit e Aplicações Práticas",
              duration: "12:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 1",
              tituloAula: "Matemática Financeira",
              materia: "Matemática",
              images: [
                { title: "Fórmula J=C·i·t", type: "diagram", placeholderColor: "bg-indigo-500/20" },
                { title: "Crescimento Linear", type: "gráfico", placeholderColor: "bg-blue-500/20" },
                { title: "Montante M=C+J", type: "fórmula", placeholderColor: "bg-cyan-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Pulo do Gato: Juros Simples vs Compostos",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                    <p className="font-bold text-indigo-700 dark:text-indigo-300 text-sm">Juros Simples = Sempre sobre o capital inicial (LINEAR)</p>
                    <p className="text-xs mt-1">Fórmula: J = C × i × t | M = C(1 + it)</p>
                  </div>
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <p className="font-bold text-blue-700 dark:text-blue-300 text-sm">Crescimento Previsível</p>
                    <p className="text-xs mt-1">→ Proporcional ao tempo | → Reta em gráfico linear</p>
                  </div>
                  <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                    <p className="font-bold text-cyan-700 dark:text-cyan-300 text-sm">Quando Usar</p>
                    <p className="text-xs mt-1">→ Caderneta poupança (antes 2012) | → Desconto comercial</p>
                  </div>
                  <div className="p-3 bg-indigo-500/5 border border-indigo-500/30 rounded-lg">
                    <p className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">Exemplo Prático</p>
                    <p className="text-xs font-mono mt-1">C = R$ 1.000 | i = 5% a.m. | t = 3 meses</p>
                    <p className="text-xs font-mono mt-1">J = 1.000 × 0,05 × 3 = R$ 150</p>
                    <p className="text-xs font-mono mt-1">M = 1.000 + 150 = R$ 1.150</p>
                  </div>
                  <div className="p-3 bg-indigo-500/5 border border-indigo-500/30 rounded-lg">
                    <p className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">Tabela Comparativa: 1000 com 5% a.m.</p>
                    <div className="text-xs font-mono space-y-1 mt-2">
                      <p>Mês 1: J=50, M=1.050</p>
                      <p>Mês 2: J=100, M=1.100</p>
                      <p>Mês 3: J=150, M=1.150</p>
                      <p>Mês 12: J=600, M=1.600</p>
                    </div>
                  </div>
                  <div className="p-3 bg-indigo-500/5 border border-indigo-500/30 rounded-lg">
                    <p className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">Dicas CESGRANRIO</p>
                    <p className="text-xs mt-1">→ Juros Simples aparece em operações de desconto</p>
                    <p className="text-xs mt-1">→ Nunca use fórmula de juros compostos por engano!</p>
                    <p className="text-xs mt-1">→ Percentual deve estar em forma decimal (5% = 0,05)</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Ritmo dos Juros Simples",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM1}
              titulo="QUIZ: Juros Simples"
              icone="💰"
              numero={4}
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
        <ModuleBanner numero={2}
          titulo="Montante em Juros Simples: M = C + J"
          descricao="Calcule o valor total retornado ao final de uma aplicação simples e interprete graficamente o crescimento linear."
           variant={mv[2]}/>
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
          











<ModuleConsolidation
            index={3}
            variant="emerald"
            video={{
              videoId: "kL8nLz8zqWg",
              title: "Montante Simples: Resgate e Capitalização Linear",
              duration: "11:15"
            }}
            resumoVisual={{
              moduloNome: "Módulo 2",
              tituloAula: "Matemática Financeira",
              materia: "Matemática",
              images: [
                { title: "Fórmula M=C(1+it)", type: "diagram", placeholderColor: "bg-emerald-500/20" },
                { title: "Relação C+J", type: "esquema", placeholderColor: "bg-green-500/20" },
                { title: "Resgate Final", type: "aplicação", placeholderColor: "bg-teal-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Pulo do Gato: Montante = Capital + Juros",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                    <p className="font-bold text-emerald-700 dark:text-emerald-300 text-sm">M = C + J = C(1 + it)</p>
                    <p className="text-xs mt-1">Montante é o valor TOTAL no final da aplicação</p>
                  </div>
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="font-bold text-green-700 dark:text-green-300 text-sm">Diferenças Chaves</p>
                    <p className="text-xs mt-1">→ M - C = J | → M &gt; C sempre (ganho positivo)</p>
                  </div>
                  <div className="p-3 bg-teal-500/10 border border-teal-500/20 rounded-lg">
                    <p className="font-bold text-teal-700 dark:text-teal-300 text-sm">Aplicação Petrobras</p>
                    <p className="text-xs mt-1">→ Cálculo de retorno simples | → Investimentos curto prazo</p>
                  </div>
                  <div className="p-3 bg-emerald-500/5 border border-emerald-500/30 rounded-lg">
                    <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">Exemplo Financeiro</p>
                    <p className="text-xs font-mono mt-1">Investimento inicial: R$ 10.000</p>
                    <p className="text-xs font-mono mt-1">Taxa: 2% a.m. por 6 meses</p>
                    <p className="text-xs font-mono mt-1">J = 10.000 × 0,02 × 6 = R$ 1.200</p>
                    <p className="text-xs font-mono mt-1">Resgate: M = R$ 11.200</p>
                  </div>
                  <div className="p-3 bg-emerald-500/5 border border-emerald-500/30 rounded-lg">
                    <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">Decomposição: M = C + J</p>
                    <div className="text-xs font-mono space-y-1 mt-2">
                      <p>C (Capital) = R$ 10.000</p>
                      <p>J (Juros) = R$ 1.200</p>
                      <p>M (Montante) = R$ 11.200</p>
                      <p>Ganho real = 11,2% sobre capital inicial</p>
                    </div>
                  </div>
                  <div className="p-3 bg-emerald-500/5 border border-emerald-500/30 rounded-lg">
                    <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">Operações Inversas</p>
                    <p className="text-xs mt-1">→ M = C + J | C = M - J | J = M - C</p>
                    <p className="text-xs mt-1">→ Útil quando o problema não informa um dos valores</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
              titulo: "Montante Crescendo",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM2}
              titulo="Quiz — Montante em Juros Simples"
              icone="📈"
              numero={4}
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
        <ModuleBanner numero={3}
          titulo="Juros Compostos: Juros sobre Juros"
          descricao="O regime dominante no mercado financeiro: os juros se incorporam ao capital a cada período, gerando crescimento exponencial."
           variant={mv[3]}/>
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
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/20 text-center">
                          <p className="text-xs font-bold text-emerald-400">(1,02)^3</p>
                          <p className="text-lg font-bold">1,0612</p>
                          <p className="text-xs text-muted-foreground">2% a.m. por 3 meses</p>
                        </div>
                        <div className="p-3 bg-blue-500/5 rounded-xl border border-blue-500/20 text-center">
                          <p className="text-xs font-bold text-blue-400">(1,01)^12</p>
                          <p className="text-lg font-bold">1,1268</p>
                          <p className="text-xs text-muted-foreground">1% a.m. por 12 meses</p>
                        </div>
                        <div className="p-3 bg-cyan-500/5 rounded-xl border border-cyan-500/20 text-center">
                          <p className="text-xs font-bold text-cyan-400">(1,10)^3</p>
                          <p className="text-lg font-bold">1,331</p>
                          <p className="text-xs text-muted-foreground">10% a.a. por 3 anos</p>
                        </div>
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
          











<ModuleConsolidation
            index={2}
            variant="cyan"
            video={{
              videoId: "h5FYmYW-I6Y",
              title: "Juros Compostos: Capitalização Exponencial e Poder do Tempo",
              duration: "13:45"
            }}
            resumoVisual={{
              moduloNome: "Módulo 3",
              tituloAula: "Matemática Financeira",
              materia: "Matemática",
              images: [
                { title: "Crescimento Exponencial", type: "diagram", placeholderColor: "bg-cyan-500/20" },
                { title: "Fórmula M=C(1+i)^t", type: "fórmula", placeholderColor: "bg-blue-500/20" },
                { title: "Juros sobre Juros", type: "conceito", placeholderColor: "bg-sky-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Pulo do Gato: Juros Compostos = Explosivo!",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                    <p className="font-bold text-cyan-700 dark:text-cyan-300 text-sm">Juros Compostos (EXPONENCIAL)</p>
                    <p className="text-xs mt-1">M = C·(1+i)^t → Crescimento acelerado!</p>
                  </div>
                  <div className="p-3 bg-sky-500/10 border border-sky-500/20 rounded-lg">
                    <p className="font-bold text-sky-700 dark:text-sky-300 text-sm">Diferença Chave</p>
                    <p className="text-xs mt-1">→ Juros sobre TUDO acumulado | → Multiplica período a período</p>
                  </div>
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <p className="font-bold text-blue-700 dark:text-blue-300 text-sm">Quando Usar</p>
                    <p className="text-xs mt-1">→ Financiamentos | → Poupança/CDB | → Petrobras investe assim!</p>
                  </div>
                  <div className="p-3 bg-cyan-500/5 border border-cyan-500/30 rounded-lg">
                    <p className="font-bold text-cyan-600 dark:text-cyan-400 text-sm">Exemplo Exponencial</p>
                    <p className="text-xs font-mono mt-1">C = R$ 1.000 | i = 10% a.a. | t = 3 anos</p>
                    <p className="text-xs font-mono mt-1">Ano 1: M = 1.000 × 1,10 = R$ 1.100</p>
                    <p className="text-xs font-mono mt-1">Ano 2: M = 1.100 × 1,10 = R$ 1.210</p>
                    <p className="text-xs font-mono mt-1">Ano 3: M = 1.210 × 1,10 = R$ 1.331</p>
                  </div>
                  <div className="p-3 bg-cyan-500/5 border border-cyan-500/30 rounded-lg">
                    <p className="font-bold text-cyan-600 dark:text-cyan-400 text-sm">Comparativo: Simples vs Composto</p>
                    <div className="text-xs font-mono space-y-1 mt-2">
                      <p>Simples (10% a.a.): M = 1.300 (3 anos)</p>
                      <p>Composto (10% a.a.): M = 1.331 (3 anos)</p>
                      <p>Diferença: R$ 31 → Crescente com tempo!</p>
                    </div>
                  </div>
                  <div className="p-3 bg-cyan-500/5 border border-cyan-500/30 rounded-lg">
                    <p className="font-bold text-cyan-600 dark:text-cyan-400 text-sm">Quando Usar Compostos</p>
                    <p className="text-xs mt-1">→ Empréstimos bancários e financiamentos</p>
                    <p className="text-xs mt-1">→ Investimentos de longo prazo (CDB, poupança pós-2012)</p>
                    <p className="text-xs mt-1">→ A maioria das operações financeiras modernas</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
              titulo: "Exponencial Crescendo Rápido",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM3}
              titulo="QUIZ: Juros Compostos"
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
        <ModuleBanner numero={4}
          titulo="Montante Composto: M = C·(1+i)^t"
          descricao="Aplique a fórmula exponencial para calcular montantes, encontrar capitais presentes e determinar prazos em operações de longo prazo."
           variant={mv[4]}/>
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
                      <p>Para calcular o montante, basta aplicar a fórmula com o fator fornecido:</p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm font-mono font-bold text-center">M = C · (1+i)^t</p>
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
          











<ModuleConsolidation
            index={2}
            variant="blue"
            video={{
              videoId: "aX5LZQR-9Qc",
              title: "Montante Composto: Encontrando Capital, Taxa e Tempo",
              duration: "14:20"
            }}
            resumoVisual={{
              moduloNome: "Módulo 4",
              tituloAula: "Matemática Financeira",
              materia: "Matemática",
              images: [
                { title: "Fórmula M=C(1+i)^t", type: "diagram", placeholderColor: "bg-blue-500/20" },
                { title: "Isolamento de Variáveis", type: "técnica", placeholderColor: "bg-indigo-500/20" },
                { title: "Logaritmos para Prazo", type: "método", placeholderColor: "bg-cyan-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Pulo do Gato: Desdobramentos da Fórmula M=C(1+i)^t",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <p className="font-bold text-blue-700 dark:text-blue-300 text-sm">Encontre C, i ou t</p>
                    <p className="text-xs mt-1">Da mesma fórmula, isole cada variável!</p>
                  </div>
                  <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                    <p className="font-bold text-indigo-700 dark:text-indigo-300 text-sm">Para Capital Presente</p>
                    <p className="text-xs font-mono mt-1">C = M / (1+i)^t</p>
                  </div>
                  <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                    <p className="font-bold text-cyan-700 dark:text-cyan-300 text-sm">Para Taxa e Tempo</p>
                    <p className="text-xs font-mono mt-1">i = (M/C)^(1/t) - 1 | t = log(M/C)/log(1+i)</p>
                  </div>
                  <div className="p-3 bg-blue-500/5 border border-blue-500/30 rounded-lg">
                    <p className="font-bold text-blue-600 dark:text-blue-400 text-sm">Exemplo: Encontrar Capital</p>
                    <p className="text-xs font-mono mt-1">Montante futuro: R$ 2.000</p>
                    <p className="text-xs font-mono mt-1">Taxa: 5% a.a. por 10 anos</p>
                    <p className="text-xs font-mono mt-1">C = 2.000 / (1,05)^10 ≈ R$ 1.227,83</p>
                  </div>
                  <div className="p-3 bg-blue-500/5 border border-blue-500/30 rounded-lg">
                    <p className="font-bold text-blue-600 dark:text-blue-400 text-sm">Isolamento de Variáveis (Algébra)</p>
                    <div className="text-xs font-mono space-y-1 mt-2">
                      <p>M = C(1+i)^t</p>
                      <p>log(M/C) = t × log(1+i)</p>
                      <p>t = log(M/C) / log(1+i)</p>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-500/5 border border-blue-500/30 rounded-lg">
                    <p className="font-bold text-blue-600 dark:text-blue-400 text-sm">Aplicação: Quanto Tempo até Dobrar?</p>
                    <p className="text-xs mt-1">Investimento: R$ 1.000 com 10% a.a.</p>
                    <p className="text-xs font-mono mt-1">2.000 = 1.000 × 1,10^t</p>
                    <p className="text-xs font-mono mt-1">t = log(2)/log(1,1) ≈ 7,27 anos</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
              titulo: "Quebra-cabeça Financeiro Resolvido",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM4}
              titulo="Quiz — Montante em Juros Compostos"
              icone="💹"
              numero={3}
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
        <ModuleBanner numero={5}
          titulo="Desconto Simples: Comercial e Racional"
          descricao="Aprenda a calcular o valor presente de títulos (duplicatas, cheques) antecipando seus vencimentos — operação central no dia a dia das empresas."
           variant={mv[5]}/>
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



          <section id="quiz-modulo-5" className="mt-16">
          











<ModuleConsolidation
            index={2}
            variant="amber"
            video={{
              videoId: "S8xPFP1lU4w",
              title: "Desconto Simples: Antecipação de Fluxos e Duplicatas",
              duration: "12:00"
            }}
            resumoVisual={{
              moduloNome: "Módulo 5",
              tituloAula: "Matemática Financeira",
              materia: "Matemática",
              images: [
                { title: "Desconto Comercial (Por Fora)", type: "diagram", placeholderColor: "bg-amber-500/20" },
                { title: "Desconto Racional (Por Dentro)", type: "fórmula", placeholderColor: "bg-yellow-500/20" },
                { title: "Antecipação de Prazos", type: "aplicação", placeholderColor: "bg-orange-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Pulo do Gato: Desconto Comercial vs Racional",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                    <p className="font-bold text-amber-700 dark:text-amber-300 text-sm">Dois Tipos de Desconto</p>
                    <p className="text-xs mt-1">Comercial (maior) vs Racional (menor)</p>
                  </div>
                  <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <p className="font-bold text-yellow-700 dark:text-yellow-300 text-sm">Desconto Comercial (Por Fora)</p>
                    <p className="text-xs font-mono mt-1">PV = FV·(1 - it)</p>
                    <p className="text-xs mt-1">Mais usado, desconta sobre valor futuro</p>
                  </div>
                  <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                    <p className="font-bold text-orange-700 dark:text-orange-300 text-sm">Desconto Racional (Por Dentro)</p>
                    <p className="text-xs font-mono mt-1">PV = FV/(1 + it)</p>
                    <p className="text-xs mt-1">Usa em Petrobras: dividendos, recebíveis!</p>
                  </div>
                  <div className="p-3 bg-amber-500/5 border border-amber-500/30 rounded-lg">
                    <p className="font-bold text-amber-600 dark:text-amber-400 text-sm">Exemplo: Duplicata</p>
                    <p className="text-xs font-mono mt-1">Valor futuro: R$ 5.000 (vence em 60 dias)</p>
                    <p className="text-xs font-mono mt-1">Taxa comercial: 2% a.m.</p>
                    <p className="text-xs font-mono mt-1">Desc.Com: 5.000 × (1 - 0,02×2) = R$ 4.800</p>
                    <p className="text-xs font-mono mt-1">Desc.Rac: 5.000 / (1 + 0,02×2) ≈ R$ 4.807,69</p>
                  </div>
                  <div className="p-3 bg-amber-500/5 border border-amber-500/30 rounded-lg">
                    <p className="font-bold text-amber-600 dark:text-amber-400 text-sm">Diferença de Descontos</p>
                    <div className="text-xs font-mono space-y-1 mt-2">
                      <p>Comercial: D = FV × i × t</p>
                      <p>Racional: D = FV × i × t / (1 + it)</p>
                      <p>Diferença: Comercial &gt; Racional</p>
                      <p>Para Petrobras: geralmente usa racional</p>
                    </div>
                  </div>
                  <div className="p-3 bg-amber-500/5 border border-amber-500/30 rounded-lg">
                    <p className="font-bold text-amber-600 dark:text-amber-400 text-sm">Na Prova CESGRANRIO</p>
                    <p className="text-xs mt-1">→ Identifique qual tipo o problema pede!</p>
                    <p className="text-xs mt-1">→ Termos como "por fora" = comercial</p>
                    <p className="text-xs mt-1">→ Termos como "por dentro" = racional</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
              titulo: "Antecipação Financeira",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM5}
              titulo="QUIZ: Desconto"
              icone="🏦"
              numero={3}
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
        <ModuleBanner numero={6}
          titulo="Equivalência de Capitais"
          descricao="Compare e substitua dívidas transportando capitais para uma mesma data focal — habilidade essencial em renegociações e contratos da Petrobras."
           variant={mv[6]}/>
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



          <section id="quiz-modulo-6" className="mt-16">
          











<ModuleConsolidation
            index={2}
            variant="rose"
            video={{
              videoId: "kGZVW7zDV2Y",
              title: "Equivalência de Capitais: Comparar Fluxos em Datas Diferentes",
              duration: "13:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 6",
              tituloAula: "Matemática Financeira",
              materia: "Matemática",
              images: [
                { title: "Transportar Fluxos no Tempo", type: "diagram", placeholderColor: "bg-rose-500/20" },
                { title: "Comparação de Alternativas", type: "técnica", placeholderColor: "bg-pink-500/20" },
                { title: "Taxa Média Equivalente", type: "cálculo", placeholderColor: "bg-red-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Pulo do Gato: Transportar Valores pela Linha do Tempo",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg">
                    <p className="font-bold text-rose-700 dark:text-rose-300 text-sm">Equivalência = Mesmo Valor em Data-Base</p>
                    <p className="text-xs mt-1">Escolha uma data e compare todos os fluxos ali</p>
                  </div>
                  <div className="p-3 bg-pink-500/10 border border-pink-500/20 rounded-lg">
                    <p className="font-bold text-pink-700 dark:text-pink-300 text-sm">Leve para Frente</p>
                    <p className="text-xs font-mono mt-1">M = C·(1+i)^t (compostos)</p>
                  </div>
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="font-bold text-red-700 dark:text-red-300 text-sm">Traga para Trás</p>
                    <p className="text-xs font-mono mt-1">PV = FV/(1+i)^t (desconto)</p>
                    <p className="text-xs mt-1">Iguale os fluxos e resolva!</p>
                  </div>
                  <div className="p-3 bg-rose-500/5 border border-rose-500/30 rounded-lg">
                    <p className="font-bold text-rose-600 dark:text-rose-400 text-sm">Exemplo: Data-base = Hoje</p>
                    <p className="text-xs font-mono mt-1">Opção A: R$ 1.000 daqui 1 ano</p>
                    <p className="text-xs font-mono mt-1">Opção B: R$ 1.100 daqui 2 anos</p>
                    <p className="text-xs font-mono mt-1">Taxa: 5% a.a. | Hoje = data-base</p>
                    <p className="text-xs font-mono mt-1">A: PV = 1.000/1,05 ≈ R$ 952</p>
                    <p className="text-xs font-mono mt-1">B: PV = 1.100/1,05² ≈ R$ 999 → Opção A vale mais hoje!</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
              titulo: "Viagem Financeira no Tempo",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM6}
              titulo="Quiz — Equivalência de Capitais"
              icone="🔀"
              numero={3}
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
        <ModuleBanner numero={7}
          titulo="Taxa Nominal vs. Taxa Efetiva"
          descricao="Entenda a diferença entre a taxa anunciada e a taxa que realmente incide sobre seu capital — fonte de inúmeras pegadinhas da CESGRANRIO."
           variant={mv[7]}/>
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



          <section id="quiz-modulo-7" className="mt-16">
          











<ModuleConsolidation
            index={2}
            variant="indigo"
            video={{
              videoId: "rHzRFYdT3Kc",
              title: "Taxa Nominal vs Taxa Efetiva: Conversão e Comparação Real",
              duration: "12:45"
            }}
            resumoVisual={{
              moduloNome: "Módulo 7",
              tituloAula: "Matemática Financeira",
              materia: "Matemática",
              images: [
                { title: "Taxa Nominal (Aparente)", type: "diagram", placeholderColor: "bg-indigo-500/20" },
                { title: "Taxa Efetiva (Real)", type: "conceito", placeholderColor: "bg-purple-500/20" },
                { title: "Conversão de Períodos", type: "fórmula", placeholderColor: "bg-violet-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Pulo do Gato: O Que Você VÊ vs O Que Você GANHA",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                    <p className="font-bold text-indigo-700 dark:text-indigo-300 text-sm">Taxa Nominal vs Efetiva</p>
                    <p className="text-xs mt-1">Nominal = o que lê | Efetiva = o que recebe (realidade)</p>
                  </div>
                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <p className="font-bold text-purple-700 dark:text-purple-300 text-sm">Exemplo Prático</p>
                    <p className="text-xs mt-1">i_nom = 12% a.a. (capitalização mensal)</p>
                    <p className="text-xs font-mono mt-1">i_efet = (1 + 0,01)^12 - 1 ≈ 12,68% a.a.</p>
                  </div>
                  <div className="p-3 bg-violet-500/10 border border-violet-500/20 rounded-lg">
                    <p className="font-bold text-violet-700 dark:text-violet-300 text-sm">Na Prova CESGRANRIO</p>
                    <p className="text-xs mt-1">→ Compare sempre pela taxa EFETIVA!</p>
                  </div>
                  <div className="p-3 bg-indigo-500/5 border border-indigo-500/30 rounded-lg">
                    <p className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">Conversão: Nominal → Efetiva</p>
                    <p className="text-xs font-mono mt-1">i_nom = 18% a.a. cap. trimestral</p>
                    <p className="text-xs font-mono mt-1">i_per = 18% / 4 = 4,5% ao trimestre</p>
                    <p className="text-xs font-mono mt-1">i_efet = (1 + 0,045)^4 - 1 ≈ 19,25% a.a.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
              titulo: "Escondido na Letra Pequena",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM7}
              titulo="QUIZ: Taxas Nominal e Efetiva"
              icone="📊"
              numero={3}
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
        <ModuleBanner numero={8}
          titulo="Séries de Pagamento (Anuidades)"
          descricao="Calcule financiamentos, parcelas e valores presentes de fluxos de caixa periódicos — base para contratos de longo prazo e planos de investimento."
           variant={mv[8]}/>
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



          <section id="quiz-modulo-8" className="mt-16">
          











<ModuleConsolidation
            index={2}
            variant="emerald"
            video={{
              videoId: "CXW5V4zDvWY",
              title: "Séries de Pagamento: Anuidades Postecipadas e Antecipadas",
              duration: "14:10"
            }}
            resumoVisual={{
              moduloNome: "Módulo 8",
              tituloAula: "Matemática Financeira",
              materia: "Matemática",
              images: [
                { title: "Anuidades Ordinárias", type: "diagram", placeholderColor: "bg-emerald-500/20" },
                { title: "Anuidades Antecipadas", type: "conceito", placeholderColor: "bg-green-500/20" },
                { title: "Valor Presente/Futuro", type: "fórmula", placeholderColor: "bg-teal-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Pulo do Gato: Financiamento = Série de Parcelas",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                    <p className="font-bold text-emerald-700 dark:text-emerald-300 text-sm">Anuidade = Parcelas Iguais</p>
                    <p className="text-xs mt-1">Mesma prestação ao longo do tempo (financiamento)</p>
                  </div>
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="font-bold text-green-700 dark:text-green-300 text-sm">Postecipada vs Antecipada</p>
                    <p className="text-xs mt-1">→ Postecipada: 1ª parcela no FIM do período</p>
                    <p className="text-xs mt-1">→ Antecipada: 1ª parcela no INÍCIO (à vista)</p>
                  </div>
                  <div className="p-3 bg-teal-500/10 border border-teal-500/20 rounded-lg">
                    <p className="font-bold text-teal-700 dark:text-teal-300 text-sm">Fórmula Postecipada</p>
                    <p className="text-xs font-mono mt-1">VP = PMT × [(1 - (1+i)^-n) / i]</p>
                  </div>
                  <div className="p-3 bg-emerald-500/5 border border-emerald-500/30 rounded-lg">
                    <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">Exemplo: Financiamento de Casa</p>
                    <p className="text-xs font-mono mt-1">Valor: R$ 300.000 | Taxa: 0,5% a.m. | Prazo: 360 meses</p>
                    <p className="text-xs font-mono mt-1">PMT = VP / [(1 - (1+i)^-n) / i]</p>
                    <p className="text-xs font-mono mt-1">PMT ≈ R$ 1.520 (parcela fixa mensal)</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
              titulo: "Parcelas no Ritmo Certo",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM8}
              titulo="Quiz — Séries de Pagamento"
              icone="💳"
              numero={3}
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
        <ModuleBanner numero={9}
          titulo="Aplicações Petrobras: Financiamentos e Contratos"
          descricao="Questões integradas com contexto real da indústria petrolífera: arrendamentos, PLR, financiamentos de equipamentos, debêntures e fundos de renovação."
           variant={mv[9]}/>
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



          <section id="quiz-modulo-9" className="mt-16">
          











<ModuleConsolidation
            index={2}
            variant="cyan"
            video={{
              videoId: "2HYVqU1Kgdg",
              title: "Matemática Financeira em Projetos Petrobras: VPL e TIR",
              duration: "15:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 9",
              tituloAula: "Matemática Financeira",
              materia: "Matemática",
              images: [
                { title: "Fluxo de Caixa (Cash Flow)", type: "diagram", placeholderColor: "bg-cyan-500/20" },
                { title: "VPL - Valor Presente Líquido", type: "conceito", placeholderColor: "bg-sky-500/20" },
                { title: "TIR - Taxa Interna de Retorno", type: "aplicação", placeholderColor: "bg-blue-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Pulo do Gato: Decisão de Investimento em Petrobras",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                    <p className="font-bold text-cyan-700 dark:text-cyan-300 text-sm">Critérios de Decisão</p>
                    <p className="text-xs mt-1">VPL &gt; 0 = Viável | TIR &gt; taxa mín = Rentável</p>
                  </div>
                  <div className="p-3 bg-sky-500/10 border border-sky-500/20 rounded-lg">
                    <p className="font-bold text-sky-700 dark:text-sky-300 text-sm">VPL (Valor Presente Líquido)</p>
                    <p className="text-xs mt-1">Valor Presente de TODOS os fluxos futuros</p>
                    <p className="text-xs mt-1">VPL = Σ(Fluxo_t / (1+i)^t) - Investimento Inicial</p>
                  </div>
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <p className="font-bold text-blue-700 dark:text-blue-300 text-sm">TIR (Taxa Interna de Retorno)</p>
                    <p className="text-xs mt-1">Taxa que torna VPL = 0</p>
                    <p className="text-xs mt-1">Petrobras usa: poços, refinarias, infraestrutura</p>
                  </div>
                  <div className="p-3 bg-cyan-500/5 border border-cyan-500/30 rounded-lg">
                    <p className="font-bold text-cyan-600 dark:text-cyan-400 text-sm">Exemplo: Poço Exploratório</p>
                    <p className="text-xs font-mono mt-1">Investimento: -R$ 50M (ano 0)</p>
                    <p className="text-xs font-mono mt-1">Retornos: +R$ 20M (anos 1-5)</p>
                    <p className="text-xs font-mono mt-1">Taxa desconto: 10% a.a.</p>
                    <p className="text-xs font-mono mt-1">Se VPL &gt; 0 e TIR &gt; 10%, viável!</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
              titulo: "Projeto Petroleum Viável",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM9}
              titulo="QUIZ: Aplicações Petrobras"
              icone="🛢️"
              numero={3}
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
        <ModuleBanner numero={10}
          titulo="Simulado Final CESGRANRIO"
          descricao="Questões integradas no nível e estilo CESGRANRIO, cobrindo todos os tópicos de Matemática Financeira — o teste definitivo antes da prova real."
           variant={mv[10]}/>
        <div className="space-y-[50px]">
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
          











<ModuleConsolidation
            index={2}
            variant="blue"
            video={{
              videoId: "kxJXBg_lRfU",
              title: "Revisão Final: Matemática Financeira Integrada CESGRANRIO",
              duration: "16:00"
            }}
            resumoVisual={{
              moduloNome: "Módulo 10",
              tituloAula: "Matemática Financeira",
              materia: "Matemática",
              images: [
                { title: "Síntese de Conceitos", type: "diagram", placeholderColor: "bg-blue-500/20" },
                { title: "Estratégias de Prova", type: "técnica", placeholderColor: "bg-indigo-500/20" },
                { title: "Casos Integrados", type: "desafio", placeholderColor: "bg-cyan-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Pulo do Gato: Checklist da Prova CESGRANRIO",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <p className="font-bold text-blue-700 dark:text-blue-300 text-sm">Passo 1: IDENTIFICAR</p>
                    <p className="text-xs mt-1">→ Qual regime? (Simples ou Composto?)</p>
                    <p className="text-xs mt-1">→ Qual a taxa? (Nominal ou Efetiva?)</p>
                  </div>
                  <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                    <p className="font-bold text-indigo-700 dark:text-indigo-300 text-sm">Passo 2: VERIFICAR</p>
                    <p className="text-xs mt-1">✓ Leia o enunciado com CUIDADO</p>
                    <p className="text-xs mt-1">✓ Procure por datas múltiplas (equivalência/séries?)</p>
                  </div>
                  <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                    <p className="font-bold text-cyan-700 dark:text-cyan-300 text-sm">Passo 3: CONVERTER</p>
                    <p className="text-xs mt-1">✓ Períodos: transforme TUDO para mesma unidade</p>
                    <p className="text-xs mt-1">✓ Datas: se houver inconsistência, use data-base!</p>
                  </div>
                  <div className="p-3 bg-blue-500/5 border border-blue-500/30 rounded-lg">
                    <p className="font-bold text-blue-600 dark:text-blue-400 text-sm">Passo 4: CALCULAR E VALIDAR</p>
                    <p className="text-xs mt-1">✓ Use a fórmula correta (J=Cit ou M=C(1+i)^t)</p>
                    <p className="text-xs mt-1">✓ Verifique unidades (taxa e tempo compatíveis?)</p>
                    <p className="text-xs mt-1">✓ Resultado faz sentido? (M &gt; C sempre!)</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
              titulo: "Mestre em Finanças - Consolidação Final",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM10}
              titulo="QUIZ: Simulado Final"
              icone="🏆"
              numero={3}
              variant="blue"
              onComplete={(score) => handleModuleComplete("modulo-10", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* Extensões Avançadas - Tópicos Complementares */}
      <section className="mt-24 mb-16 space-y-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-indigo-700 dark:text-indigo-300">
            🚀 Extensões Avançadas em Matemática Financeira
          </h2>

          {/* Tópico 1: Inflação e Taxa Real */}
          <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl border border-amber-200 dark:border-amber-800">
            <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-4">
              📊 Inflação e Taxa Real
            </h3>
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <p><strong>Conceito:</strong> A taxa nominal não reflete o poder de compra real.</p>
              <p><strong>Fórmula de Fisher:</strong> (1 + taxa nominal) = (1 + taxa real) × (1 + inflação)</p>
              <div className="p-3 bg-white dark:bg-gray-900 rounded border-l-4 border-amber-500 mt-3">
                <p className="font-mono text-xs">Taxa Real = [(1 + taxa nominal) / (1 + inflação)] - 1</p>
              </div>
              <p className="mt-3"><strong>Aplicação Petrobras:</strong> Na análise de investimentos em exploração, a taxa real reflete o retorno verdadeiro ajustado pela inflação do custo de equipamentos e mão de obra.</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">💡 Dica: Se inflação &gt; taxa nominal, taxa real é negativa (prejuízo de poder de compra).</p>
            </div>
          </div>

          {/* Tópico 2: Análise de Viabilidade (VPL e TIR) */}
          <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border border-green-200 dark:border-green-800">
            <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-4">
              💰 Análise de Viabilidade (VPL e TIR)
            </h3>
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <p><strong>VPL (Valor Presente Líquido):</strong> Soma dos fluxos descontados a uma taxa de referência.</p>
              <div className="p-3 bg-white dark:bg-gray-900 rounded border-l-4 border-green-500 mt-3 space-y-2">
                <p className="font-mono text-xs">VPL = Σ [FCt / (1 + i)^t] - Investimento Inicial</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Se VPL &gt; 0: projeto viável | Se VPL &lt; 0: projeto inviável</p>
              </div>
              <p className="mt-3"><strong>TIR (Taxa Interna de Retorno):</strong> Taxa que iguala VPL = 0.</p>
              <div className="p-3 bg-white dark:bg-gray-900 rounded border-l-4 border-green-500 mt-3">
                <p className="text-xs">Se TIR &gt; taxa de desconto: projeto viável</p>
              </div>
              <p className="mt-3"><strong>Aplicação Petrobras:</strong> Projetos de exploração são avaliados por VPL e TIR. Um poço precisa de TIR &gt; 15% a.a. para ser viável.</p>
            </div>
          </div>

          {/* Tópico 3: Equivalência de Capitais em Múltiplas Datas */}
          <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
            <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4">
              🔄 Equivalência de Capitais em Múltiplas Datas
            </h3>
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <p><strong>Conceito:</strong> Capitais em datas diferentes são equivalentes se descontados à mesma taxa.</p>
              <div className="p-3 bg-white dark:bg-gray-900 rounded border-l-4 border-blue-500 mt-3">
                <p className="font-mono text-xs">C₀ = C₁/(1+i)¹ = C₂/(1+i)² = ... = Cn/(1+i)ⁿ</p>
              </div>
              <p className="mt-3"><strong>Caso Prático:</strong> Financiamento de R$ 500.000 em 4 parcelas trimestrais (taxa 2% a.t.)</p>
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs space-y-1 mt-3 font-mono">
                <p>T0: Valor atual = 500.000</p>
                <p>T1: Parcela = 500.000 × (1,02 / [1,02⁴-1]/[0,02×1,02⁴]) ≈ 128.500</p>
                <p>T2, T3, T4: Idem</p>
              </div>
              <p className="mt-3"><strong>Aplicação Petrobras:</strong> Análise de múltiplas formas de pagamento de serviços de perfuração (à vista com desconto vs. parcelado).</p>
            </div>
          </div>

          {/* Tópico 4: Depreciação Contábil vs. Financeira */}
          <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl border border-purple-200 dark:border-purple-800">
            <h3 className="text-xl font-bold text-purple-900 dark:text-purple-100 mb-4">
              📉 Depreciação Contábil vs. Financeira
            </h3>
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <p><strong>Depreciação Linear (Contábil):</strong> Valor uniforme a cada período.</p>
              <div className="p-3 bg-white dark:bg-gray-900 rounded border-l-4 border-purple-500 mt-3">
                <p className="font-mono text-xs">Depreciação = (Valor Original - Valor Residual) / Anos</p>
              </div>
              <p className="mt-3"><strong>Depreciação Acelerada (Financeira):</strong> Maior redução nos primeiros anos (método da soma dos dígitos ou redução do saldo).</p>
              <p className="mt-3"><strong>Caso Petrobras:</strong> Plataforma de exploração com custo R$ 50 milhões, vida útil 20 anos.</p>
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs space-y-1 mt-3">
                <p>• Linear: R$ 2,5 mi/ano (se residual = 0)</p>
                <p>• Acelerada (soma dígitos): Ano 1 ≈ R$ 4,76 mi | Ano 20 ≈ R$ 0,24 mi</p>
              </div>
            </div>
          </div>

          {/* Tópico 5: Leasing vs. Compra */}
          <div className="p-6 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 rounded-xl border border-red-200 dark:border-red-800">
            <h3 className="text-xl font-bold text-red-900 dark:text-red-100 mb-4">
              🚗 Decisão: Leasing vs. Compra
            </h3>
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <p><strong>Leasing:</strong> Aluguel com opção de compra ao final do contrato.</p>
              <p><strong>Decisão via VPL:</strong> Compare o custo presente de ambas as alternativas.</p>
              <div className="p-3 bg-white dark:bg-gray-900 rounded border-l-4 border-red-500 mt-3 space-y-2">
                <p className="font-mono text-xs">VPL(Leasing) = Σ [Parcela×(1+i)^-t]</p>
                <p className="font-mono text-xs">VPL(Compra) = Preço - Σ [Depreciação×(1+i)^-t] + Residual×(1+i)^-n</p>
              </div>
              <p className="mt-3"><strong>Aplicação Petrobras:</strong> Equipamentos de sondagem (bombas, compressores) podem ser alugados ou comprados. Leasing oferece flexibilidade; compra oferece propriedade e depreciação fiscal.</p>
            </div>
          </div>

          {/* Tópico 6: Análise de Sensibilidade e Risco */}
          <div className="p-6 bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30 rounded-xl border border-indigo-200 dark:border-indigo-800">
            <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-100 mb-4">
              ⚠️ Análise de Sensibilidade e Risco
            </h3>
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <p><strong>Sensibilidade:</strong> Variação do VPL quando um parâmetro muda.</p>
              <div className="p-3 bg-white dark:bg-gray-900 rounded border-l-4 border-indigo-500 mt-3">
                <p className="text-xs">Se taxa sobe 1%, VPL cai de R$ 1M para R$ 950K (sensibilidade = -50K/0,01 = -5M)</p>
              </div>
              <p className="mt-3"><strong>Análise de Cenários:</strong> Otimista, base, pessimista.</p>
              <p className="mt-3"><strong>Aplicação Petrobras:</strong> Projeto de exploração sensível a preço do petróleo. Se preço ≤ USD 50/bbl, VPL pode ficar negativo.</p>
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs space-y-1 mt-3">
                <p>Cenário Otimista (USD 100/bbl): VPL = +USD 200M</p>
                <p>Cenário Base (USD 70/bbl): VPL = +USD 50M</p>
                <p>Cenário Pessimista (USD 40/bbl): VPL = -USD 100M</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa Mental Visual - Estrutura Geral */}
      <section className="my-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center text-slate-800 dark:text-slate-100">
            🧠 Mapa Mental: Estrutura Completa da Matemática Financeira
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Core Concepts */}
            <div className="p-5 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-lg">
              <h3 className="font-bold text-indigo-900 dark:text-indigo-200 mb-3">📌 Conceitos Fundamentais</h3>
              <ul className="text-xs space-y-2 text-indigo-800 dark:text-indigo-300">
                <li>• Capital (C) = valor inicial</li>
                <li>• Montante (M) = C + Juros</li>
                <li>• Taxa (i) = rentabilidade</li>
                <li>• Tempo (t) = período</li>
                <li>• Juros (J) = M - C</li>
              </ul>
            </div>

            {/* Regimes */}
            <div className="p-5 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 rounded-lg">
              <h3 className="font-bold text-green-900 dark:text-green-200 mb-3">⚡ Regimes de Juros</h3>
              <ul className="text-xs space-y-2 text-green-800 dark:text-green-300">
                <li>• <strong>Simples:</strong> J = Cit</li>
                <li>• <strong>Composto:</strong> M = C(1+i)^t</li>
                <li>• <strong>Contínuo:</strong> M = C·e^(it)</li>
                <li>• <strong>Comparação:</strong> J.C &lt; J.S &lt; J.R (para t &gt; 1)</li>
              </ul>
            </div>

            {/* Operações */}
            <div className="p-5 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-lg">
              <h3 className="font-bold text-blue-900 dark:text-blue-200 mb-3">🔧 Operações Financeiras</h3>
              <ul className="text-xs space-y-2 text-blue-800 dark:text-blue-300">
                <li>• Desconto (antecipação)</li>
                <li>• Equivalência (múltiplas datas)</li>
                <li>• Séries/Anuidades</li>
                <li>• Amortização</li>
                <li>• Conversão de taxas</li>
              </ul>
            </div>

            {/* Taxas */}
            <div className="p-5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg">
              <h3 className="font-bold text-amber-900 dark:text-amber-200 mb-3">📈 Tipos de Taxa</h3>
              <ul className="text-xs space-y-2 text-amber-800 dark:text-amber-300">
                <li>• <strong>Nominal:</strong> taxa contratada</li>
                <li>• <strong>Efetiva:</strong> taxa real</li>
                <li>• <strong>Real:</strong> ajustada inflação</li>
                <li>• <strong>Equivalentes:</strong> mesmo período</li>
              </ul>
            </div>

            {/* Análise */}
            <div className="p-5 bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 rounded-lg">
              <h3 className="font-bold text-cyan-900 dark:text-cyan-200 mb-3">📊 Análise de Investimentos</h3>
              <ul className="text-xs space-y-2 text-cyan-800 dark:text-cyan-300">
                <li>• <strong>VPL:</strong> valor presente líquido</li>
                <li>• <strong>TIR:</strong> taxa interna de retorno</li>
                <li>• <strong>IL:</strong> índice de lucratividade</li>
                <li>• <strong>Payback:</strong> tempo de recuperação</li>
              </ul>
            </div>

            {/* Aplicações */}
            <div className="p-5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-lg">
              <h3 className="font-bold text-rose-900 dark:text-rose-200 mb-3">🏭 Aplicações Práticas</h3>
              <ul className="text-xs space-y-2 text-rose-800 dark:text-rose-300">
                <li>• Financiamentos imobiliários</li>
                <li>• Empréstimos pessoais</li>
                <li>• Investimentos em ações/fundos</li>
                <li>• Projetos de capital (Petrobras)</li>
                <li>• Planos de previdência</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tabela de Comparação - Juros Simples vs Compostos */}
      <section className="my-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-slate-800 dark:text-slate-100">
            📋 Comparação: Juros Simples vs. Compostos
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse border border-gray-300 dark:border-gray-700">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="border border-gray-300 dark:border-gray-700 p-3 text-left">Aspecto</th>
                  <th className="border border-gray-300 dark:border-gray-700 p-3 text-left">Juros Simples</th>
                  <th className="border border-gray-300 dark:border-gray-700 p-3 text-left">Juros Compostos</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-300">
                <tr className="bg-gray-50 dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 p-3 font-semibold">Fórmula</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3"><code>J = Cit</code></td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3"><code>M = C(1+i)^t</code></td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 p-3 font-semibold">Crescimento</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3">Linear (progressão aritmética)</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3">Exponencial (progressão geométrica)</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 p-3 font-semibold">Renda</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3">Depósitos à vista, operações curto prazo</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3">Investimentos, financiamentos, aplicações</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 p-3 font-semibold">Comparação (t &gt; 1)</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3">Rendimento MENOR</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3">Rendimento MAIOR</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 p-3 font-semibold">Exemplo</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3">C=1000, i=10% a.a., t=5a: J=500, M=1500</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3">C=1000, i=10% a.a., t=5a: M=1610,51</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Checklist de Competências */}
      <section className="my-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-slate-800 dark:text-slate-100">
            ✅ Checklist de Competências Desenvolvidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
              <p className="font-semibold text-gray-800 dark:text-gray-100 mb-3">Módulo 1-3: Fundamentos</p>
              <ul className="text-xs space-y-1 text-gray-700 dark:text-gray-300">
                <li>☑ Calcular juros simples e compostos</li>
                <li>☑ Diferenciar regimes de capitalização</li>
                <li>☑ Resolver problemas de montante</li>
              </ul>
            </div>
            <div className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
              <p className="font-semibold text-gray-800 dark:text-gray-100 mb-3">Módulo 4-6: Operações Avançadas</p>
              <ul className="text-xs space-y-1 text-gray-700 dark:text-gray-300">
                <li>☑ Aplicar desconto simples e composto</li>
                <li>☑ Verificar equivalência de capitais</li>
                <li>☑ Converter taxas (nominal/efetiva)</li>
              </ul>
            </div>
            <div className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
              <p className="font-semibold text-gray-800 dark:text-gray-100 mb-3">Módulo 7-8: Séries e Amortização</p>
              <ul className="text-xs space-y-1 text-gray-700 dark:text-gray-300">
                <li>☑ Calcular valor de anuidades</li>
                <li>☑ Montar tabela de amortização</li>
                <li>☑ Aplicar sistemas SAC e Price</li>
              </ul>
            </div>
            <div className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
              <p className="font-semibold text-gray-800 dark:text-gray-100 mb-3">Módulo 9-10: Aplicações Profissionais</p>
              <ul className="text-xs space-y-1 text-gray-700 dark:text-gray-300">
                <li>☑ Analisar viabilidade de projetos (VPL, TIR)</li>
                <li>☑ Resolver casos Petrobras reais</li>
                <li>☑ Dominar prova CESGRANRIO</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Conclusão e Próximos Passos */}
      <section className="mb-12 px-4 md:px-8 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-950 dark:to-gray-950 py-12 rounded-xl">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-100">
            ✨ Parabéns! Você é um Especialista em Matemática Financeira
          </h2>
          <p className="text-center text-gray-700 dark:text-gray-300 text-lg">
            Ao dominar esses conceitos, você está preparado para:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border-l-4 border-indigo-500">
              <p className="font-semibold text-indigo-700 dark:text-indigo-300">💼 Carreiras Financeiras</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Analista de investimentos, gestor de projetos, consultor financeiro</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border-l-4 border-green-500">
              <p className="font-semibold text-green-700 dark:text-green-300">🏭 Engenharia Econômica</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Avaliação de projetos, orçamentação de capital, análise de ROI</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border-l-4 border-blue-500">
              <p className="font-semibold text-blue-700 dark:text-blue-300">🛢️ Indústria de Petróleo</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Avaliação de blocos exploratórios, análise de viabilidade, gestão de carteira</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border-l-4 border-amber-500">
              <p className="font-semibold text-amber-700 dark:text-amber-300">📊 CESGRANRIO/Concursos</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Pronto para questões avançadas de banca em provas oficiais</p>
            </div>
          </div>
          <div className="p-6 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg mt-8">
            <p className="font-semibold text-blue-900 dark:text-blue-100 mb-3">📚 Próximos Passos Recomendados:</p>
            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
              <li>✓ Revisite módulos 9 (Aplicações Petrobras) para casos reais</li>
              <li>✓ Pratique com questões anteriores de CESGRANRIO (2015-2024)</li>
              <li>✓ Estude derivativos e operações de hedge (tema avançado)</li>
              <li>✓ Explore softwares: HP 12C, Excel, Python (numpy/scipy)</li>
              <li>✓ Integre com Estatística e Probabilidade para análise de risco</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Formulário Rápido de Referência */}
      <section className="my-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center text-slate-800 dark:text-slate-100">
            📐 Formulário de Referência Rápida
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Regimes de Capitalização */}
            <div className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-blue-950/40 rounded-lg border border-indigo-200 dark:border-indigo-800">
              <h3 className="font-bold text-indigo-900 dark:text-indigo-200 mb-4 text-lg">📊 Regimes de Capitalização</h3>
              <div className="space-y-4 font-mono text-xs bg-white dark:bg-gray-900 p-4 rounded">
                <div>
                  <p className="font-bold text-gray-800 dark:text-gray-100">Juros Simples:</p>
                  <p className="text-gray-700 dark:text-gray-300">J = C × i × t</p>
                  <p className="text-gray-700 dark:text-gray-300">M = C × (1 + i × t)</p>
                </div>
                <div className="border-t border-gray-300 dark:border-gray-700 pt-3">
                  <p className="font-bold text-gray-800 dark:text-gray-100">Juros Compostos:</p>
                  <p className="text-gray-700 dark:text-gray-300">M = C × (1 + i)^t</p>
                  <p className="text-gray-700 dark:text-gray-300">C = M / (1 + i)^t</p>
                </div>
              </div>
            </div>

            {/* Anuidades e Séries */}
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/40 dark:to-emerald-950/40 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="font-bold text-green-900 dark:text-green-200 mb-4 text-lg">📈 Anuidades (Séries)</h3>
              <div className="space-y-4 font-mono text-xs bg-white dark:bg-gray-900 p-4 rounded">
                <div>
                  <p className="font-bold text-gray-800 dark:text-gray-100">Valor Presente (A):</p>
                  <p className="text-gray-700 dark:text-gray-300">A = PMT × [(1+i)^n - 1] / [i(1+i)^n]</p>
                </div>
                <div className="border-t border-gray-300 dark:border-gray-700 pt-3">
                  <p className="font-bold text-gray-800 dark:text-gray-100">Prestação (PMT):</p>
                  <p className="text-gray-700 dark:text-gray-300">PMT = A × [i(1+i)^n] / [(1+i)^n - 1]</p>
                </div>
              </div>
            </div>

            {/* Desconto */}
            <div className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/40 dark:to-yellow-950/40 rounded-lg border border-amber-200 dark:border-amber-800">
              <h3 className="font-bold text-amber-900 dark:text-amber-200 mb-4 text-lg">💸 Desconto</h3>
              <div className="space-y-4 font-mono text-xs bg-white dark:bg-gray-900 p-4 rounded">
                <div>
                  <p className="font-bold text-gray-800 dark:text-gray-100">Desconto Simples:</p>
                  <p className="text-gray-700 dark:text-gray-300">d = N × i × t</p>
                  <p className="text-gray-700 dark:text-gray-300">A = N × (1 - i × t)</p>
                </div>
                <div className="border-t border-gray-300 dark:border-gray-700 pt-3">
                  <p className="font-bold text-gray-800 dark:text-gray-100">Desconto Composto:</p>
                  <p className="text-gray-700 dark:text-gray-300">A = N / (1 + i)^t</p>
                </div>
              </div>
            </div>

            {/* VPL e TIR */}
            <div className="p-6 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/40 dark:to-blue-950/40 rounded-lg border border-cyan-200 dark:border-cyan-800">
              <h3 className="font-bold text-cyan-900 dark:text-cyan-200 mb-4 text-lg">💼 Análise de Investimentos</h3>
              <div className="space-y-4 font-mono text-xs bg-white dark:bg-gray-900 p-4 rounded">
                <div>
                  <p className="font-bold text-gray-800 dark:text-gray-100">VPL:</p>
                  <p className="text-gray-700 dark:text-gray-300">VPL = Σ [FC_t / (1+i)^t] - I_0</p>
                </div>
                <div className="border-t border-gray-300 dark:border-gray-700 pt-3">
                  <p className="font-bold text-gray-800 dark:text-gray-100">TIR:</p>
                  <p className="text-gray-700 dark:text-gray-300">VPL = 0 → encontre i (TIR)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exemplos Resolvidos */}
      <section className="my-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center text-slate-800 dark:text-slate-100">
            📝 Exemplo Resolvido: Investimento Real
          </h2>

          <div className="p-6 bg-white dark:bg-gray-900 border-l-4 border-indigo-500 rounded-lg">
            <h3 className="font-bold text-lg text-indigo-900 dark:text-indigo-300 mb-4">
              Caso: Exploração de Poço Petrolífero
            </h3>
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <p><strong>Contexto Petrobras:</strong> Investimento inicial de R$ 2 milhões. Fluxos esperados: 800K (Y1), 900K (Y2), 1M (Y3). Taxa mínima atrativa: 15% a.a.</p>
              <p><strong>Cálculo VPL:</strong></p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded font-mono text-xs space-y-2 mt-3">
                <p>VPL = -2.000.000 + 800.000/(1,15)^1 + 900.000/(1,15)^2 + 1.000.000/(1,15)^3</p>
                <p>VPL = -2.000.000 + 695.652 + 679.653 + 657.516</p>
                <p><strong>VPL = R$ 32.821 &gt; 0 ✓ (Projeto viável!)</strong></p>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">💡 O projeto gera valor, aprovação recomendada</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dicas de Prova CESGRANRIO */}
      <section className="my-16 px-4 md:px-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center text-purple-900 dark:text-purple-300">
            🎯 Dicas para Prova CESGRANRIO
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-gray-900 rounded-lg">
              <p className="font-bold text-purple-900 dark:text-purple-300 mb-2">1️⃣ Leia Cuidadosamente</p>
              <p className="text-xs text-gray-700 dark:text-gray-300">Taxa mensal vs anual, capitalização, datas múltiplas</p>
            </div>

            <div className="p-4 bg-white dark:bg-gray-900 rounded-lg">
              <p className="font-bold text-purple-900 dark:text-purple-300 mb-2">2️⃣ Identifique o Tipo</p>
              <p className="text-xs text-gray-700 dark:text-gray-300">Juros, desconto, série, VPL - cada um tem fórmula</p>
            </div>

            <div className="p-4 bg-white dark:bg-gray-900 rounded-lg">
              <p className="font-bold text-purple-900 dark:text-purple-300 mb-2">3️⃣ Converta Unidades</p>
              <p className="text-xs text-gray-700 dark:text-gray-300">Taxa e tempo na mesma unidade</p>
            </div>

            <div className="p-4 bg-white dark:bg-gray-900 rounded-lg">
              <p className="font-bold text-purple-900 dark:text-purple-300 mb-2">4️⃣ Use Decimais</p>
              <p className="text-xs text-gray-700 dark:text-gray-300">Sempre 0,05 em vez de 5%</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-amber-100 dark:bg-amber-950/40 border-l-4 border-amber-500 rounded-lg">
            <p className="font-bold text-amber-900 dark:text-amber-300 mb-2">⚠️ Pegadinhas Comuns:</p>
            <ul className="text-xs text-amber-800 dark:text-amber-200 space-y-1 ml-4">
              <li>• Taxa contratada ≠ taxa efetiva</li>
              <li>• Parcelas postecipadas vs antecipadas</li>
              <li>• Período começa em 0 ou 1?</li>
              <li>• Inflação pode afetar taxa real</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Resumo: O que você aprendeu */}
      <section className="my-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center text-slate-800 dark:text-slate-100">
            📚 Resumo Executivo: Seu Domínio em Matemática Financeira
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-6 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800">
              <p className="text-3xl font-bold text-indigo-700 dark:text-indigo-300 mb-2">10</p>
              <p className="font-semibold text-indigo-900 dark:text-indigo-100">Módulos Completos</p>
              <p className="text-xs text-indigo-700 dark:text-indigo-300 mt-2">Do básico ao avançado</p>
            </div>

            <div className="p-6 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-3xl font-bold text-green-700 dark:text-green-300 mb-2">30+</p>
              <p className="font-semibold text-green-900 dark:text-green-100">Fórmulas Dominadas</p>
              <p className="text-xs text-green-700 dark:text-green-300 mt-2">Juros, séries, VPL, TIR...</p>
            </div>

            <div className="p-6 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-2">∞</p>
              <p className="font-semibold text-blue-900 dark:text-blue-100">Aplicações Práticas</p>
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">Petrobras, financiamentos...</p>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-950 dark:to-gray-950 rounded-lg border border-gray-200 dark:border-gray-800">
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-4">Competências Desenvolvidas:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                <span>Cálculo de juros (simples e compostos)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                <span>Conversão de taxas (nominal/efetiva)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                <span>Análise de desconto simples e composto</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                <span>Equivalência de capitais em múltiplas datas</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                <span>Cálculo de anuidades e séries de pagamento</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                <span>Amortização (SAC, Price) de empréstimos</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                <span>Análise de viabilidade (VPL, TIR, IL)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                <span>Aplicações reais em projetos Petrobras</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Conexão com Outras Disciplinas */}
      <section className="my-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center text-slate-800 dark:text-slate-100">
            🔗 Conexões com Outras Disciplinas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
              <p className="font-bold text-gray-900 dark:text-gray-100 mb-3">📊 Estatística & Probabilidade</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">Análise de risco em investimentos, distribuição de probabilidades de retorno, simulações Monte Carlo para projeção de fluxos</p>
            </div>

            <div className="p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
              <p className="font-bold text-gray-900 dark:text-gray-100 mb-3">📈 Contabilidade</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">Depreciação de ativos, provisão de juros, análise de fluxos de caixa, reconciliação contábil-financeira</p>
            </div>

            <div className="p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
              <p className="font-bold text-gray-900 dark:text-gray-100 mb-3">🏗️ Engenharia Econômica</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">Avaliação de projetos, custo-benefício, análise de alternativas de investimento, payback descontado</p>
            </div>

            <div className="p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
              <p className="font-bold text-gray-900 dark:text-gray-100 mb-3">💼 Administração</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">Gestão de tesouraria, política de dividendos, alavancagem financeira, estrutura de capital</p>
            </div>

            <div className="p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
              <p className="font-bold text-gray-900 dark:text-gray-100 mb-3">💻 Programação</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">Implementação em Excel/VBA, Python (numpy, pandas), C# para sistemas financeiros, APIs de cálculo</p>
            </div>

            <div className="p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
              <p className="font-bold text-gray-900 dark:text-gray-100 mb-3">⚖️ Direito</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">Contratos de financiamento, tributação (IR, IOF), regulamentação do mercado financeiro</p>
            </div>
          </div>
        </div>
      </section>

      {/* Conclusão Final */}
      <section className="my-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-950 dark:to-yellow-950 border-2 border-amber-400 dark:border-amber-600 rounded-xl text-center">
          <p className="text-4xl mb-3">👑 ESPECIALISTA CERTIFICADO 👑</p>
          <p className="text-gray-800 dark:text-gray-200 font-semibold mb-2">
            Domínio Completo em Matemática Financeira
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-400">
            Pronto para CESGRANRIO, análise de projetos e mercado financeiro! 🚀
          </p>
        </div>
      </section>
    </AulaTemplate>
  );
}
