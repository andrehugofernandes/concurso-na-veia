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
  FlipCard,
  LessonTabs,
  ModuleSummaryCarouselNew,
} from "../shared";
import {
  QUIZ_M1_POLIEDROS,
  QUIZ_M2_PRISMAS,
  QUIZ_M3_PIRAMIDES,
  QUIZ_M4_CILINDRO,
  QUIZ_M5_CONE,
  QUIZ_M6_ESFERA,
  QUIZ_M7_TRONCOS,
  QUIZ_M8_SOLIDOS_COMPOSTOS,
  QUIZ_M9_PETROLEO,
  QUIZ_M10_SIMULADO,
} from "./data/geometria-espacial-quizzes";

export default function AulaGeometriaEspacial({
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

  const [quizM1] = useState(() => getRandomQuestions(QUIZ_M1_POLIEDROS, 6));
  const [quizM2] = useState(() => getRandomQuestions(QUIZ_M2_PRISMAS, 6));
  const [quizM3] = useState(() => getRandomQuestions(QUIZ_M3_PIRAMIDES, 6));
  const [quizM4] = useState(() => getRandomQuestions(QUIZ_M4_CILINDRO, 6));
  const [quizM5] = useState(() => getRandomQuestions(QUIZ_M5_CONE, 6));
  const [quizM6] = useState(() => getRandomQuestions(QUIZ_M6_ESFERA, 6));
  const [quizM7] = useState(() => getRandomQuestions(QUIZ_M7_TRONCOS, 6));
  const [quizM8] = useState(() => getRandomQuestions(QUIZ_M8_SOLIDOS_COMPOSTOS, 6));
  const [quizM9] = useState(() => getRandomQuestions(QUIZ_M9_PETROLEO, 6));
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
    { id: "modulo-1", label: "Módulo 1", titulo: "Poliedros e Euler" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Prismas" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Pirâmides" },
    { id: "modulo-4", label: "Módulo 4", titulo: "Cilindro" },
    { id: "modulo-5", label: "Módulo 5", titulo: "Cone" },
    { id: "modulo-6", label: "Módulo 6", titulo: "Esfera" },
    { id: "modulo-7", label: "Módulo 7", titulo: "Troncos" },
    { id: "modulo-8", label: "Módulo 8", titulo: "Sólidos Compostos" },
    { id: "modulo-9", label: "Módulo 9", titulo: "Tanques e Reservatórios" },
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
      {/* MÓDULO 1: POLIEDROS — VÉRTICES, ARESTAS E FACES                  */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="Poliedros e a Relação de Euler"
          descricao="Identifique vértices, arestas e faces de sólidos geométricos e aplique a relação V − A + F = 2 para resolver questões CESGRANRIO."
          gradiente="bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="O que é um Poliedro?"
              description="Sólidos com faces planas — a base da geometria espacial."
              variant="cyan"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Conceito e Classificação de Poliedros"
              icone="🔷"
              corIndicador="bg-cyan-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Definição de Poliedro",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Um <strong>poliedro</strong> é um sólido geométrico limitado por <strong>faces planas poligonais</strong>. Cada face é um polígono plano, e os poliedros são classificados pelo número de faces.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20 text-center">
                          <p className="text-xs font-bold text-blue-400 mb-2">Vértices (V)</p>
                          <p className="text-sm">Pontos onde 3 ou mais arestas se encontram</p>
                        </div>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20 text-center">
                          <p className="text-xs font-bold text-cyan-400 mb-2">Arestas (A)</p>
                          <p className="text-sm">Segmentos de reta onde duas faces se encontram</p>
                        </div>
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20 text-center">
                          <p className="text-xs font-bold text-emerald-400 mb-2">Faces (F)</p>
                          <p className="text-sm">Polígonos planos que delimitam o sólido</p>
                        </div>
                      </div>
                      <AlertBox tipo="info" titulo="Contexto Petrobras">
                        Estruturas de suporte em plataformas offshore e refinarias utilizam treliças formadas por tetraedros e outros poliedros — sua rigidez estrutural é maximizada pelo formato geométrico.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "A Relação de Euler: V − A + F = 2",
                  icone: "🧮",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        O matemático Leonhard Euler descobriu que em <strong>todo poliedro convexo</strong>, a relação entre vértices, arestas e faces é sempre constante:
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 text-center">
                        <p className="text-2xl font-bold font-mono text-blue-400">V − A + F = 2</p>
                        <p className="text-sm text-muted-foreground mt-2">Característica de Euler para poliedros convexos</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-xs font-bold text-blue-400 mb-2">Cubo</p>
                          <p className="text-sm">V = 8, A = 12, F = 6</p>
                          <p className="text-sm font-bold">8 − 12 + 6 = <span className="text-emerald-400">2 ✓</span></p>
                        </div>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="text-xs font-bold text-cyan-400 mb-2">Tetraedro</p>
                          <p className="text-sm">V = 4, A = 6, F = 4</p>
                          <p className="text-sm font-bold">4 − 6 + 4 = <span className="text-emerald-400">2 ✓</span></p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        A relação de Euler só vale para poliedros <strong>convexos</strong>. Sólidos com buracos (como um toro) têm V − A + F = 0. A banca costuma incluir o toro como distrator!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Os 5 Sólidos de Platão",
                  icone: "⭐",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Os <strong>sólidos platônicos</strong> são os únicos poliedros regulares (todas as faces iguais, todos os ângulos iguais):
                      </p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                          <thead>
                            <tr className="bg-blue-500/10">
                              <th className="p-2 text-left border border-border">Sólido</th>
                              <th className="p-2 text-center border border-border">V</th>
                              <th className="p-2 text-center border border-border">A</th>
                              <th className="p-2 text-center border border-border">F</th>
                              <th className="p-2 text-left border border-border">Face</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="p-2 border border-border">Tetraedro</td>
                              <td className="p-2 text-center border border-border">4</td>
                              <td className="p-2 text-center border border-border">6</td>
                              <td className="p-2 text-center border border-border">4</td>
                              <td className="p-2 border border-border">Triângulo</td>
                            </tr>
                            <tr className="bg-muted/20">
                              <td className="p-2 border border-border">Hexaedro (cubo)</td>
                              <td className="p-2 text-center border border-border">8</td>
                              <td className="p-2 text-center border border-border">12</td>
                              <td className="p-2 text-center border border-border">6</td>
                              <td className="p-2 border border-border">Quadrado</td>
                            </tr>
                            <tr>
                              <td className="p-2 border border-border">Octaedro</td>
                              <td className="p-2 text-center border border-border">6</td>
                              <td className="p-2 text-center border border-border">12</td>
                              <td className="p-2 text-center border border-border">8</td>
                              <td className="p-2 border border-border">Triângulo</td>
                            </tr>
                            <tr className="bg-muted/20">
                              <td className="p-2 border border-border">Dodecaedro</td>
                              <td className="p-2 text-center border border-border">20</td>
                              <td className="p-2 text-center border border-border">30</td>
                              <td className="p-2 text-center border border-border">12</td>
                              <td className="p-2 border border-border">Pentágono</td>
                            </tr>
                            <tr>
                              <td className="p-2 border border-border">Icosaedro</td>
                              <td className="p-2 text-center border border-border">12</td>
                              <td className="p-2 text-center border border-border">30</td>
                              <td className="p-2 text-center border border-border">20</td>
                              <td className="p-2 border border-border">Triângulo</td>
                            </tr>
                          </tbody>
                        </table>
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
              title="Fórmulas para Prismas e Pirâmides"
              description="Conte vértices, arestas e faces de qualquer prisma ou pirâmide usando fórmulas gerais."
              variant="blue"
              className="mb-6"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-blue-500/5 rounded-xl border border-blue-500/20 space-y-3">
                <p className="text-sm font-bold text-blue-400">Prisma de base n-gonal</p>
                <div className="bg-blue-500/10 rounded-lg p-3 space-y-1 font-mono text-sm">
                  <p>V = 2n (vértices)</p>
                  <p>A = 3n (arestas)</p>
                  <p>F = n + 2 (faces)</p>
                </div>
                <p className="text-xs text-muted-foreground">Exemplo: prisma hexagonal → V=12, A=18, F=8</p>
              </div>
              <div className="p-6 bg-cyan-500/5 rounded-xl border border-cyan-500/20 space-y-3">
                <p className="text-sm font-bold text-cyan-400">Pirâmide de base n-gonal</p>
                <div className="bg-cyan-500/10 rounded-lg p-3 space-y-1 font-mono text-sm">
                  <p>V = n + 1 (vértices)</p>
                  <p>A = 2n (arestas)</p>
                  <p>F = n + 1 (faces)</p>
                </div>
                <p className="text-xs text-muted-foreground">Exemplo: pirâmide quadrangular → V=5, A=8, F=5</p>
              </div>
            </div>
          </section>

          <section id="quiz-modulo-1" className="mt-8">
            <QuizInterativo
              questoes={quizM1}
              titulo="Quiz — Poliedros e Relação de Euler"
              icone="🔷"
              numero={1}
              variant="cyan"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 2: PRISMAS — VOLUME E ÁREA TOTAL                          */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <ModuleBanner
          numero={2}
          titulo="Prismas: Volume e Área Total"
          descricao="Calcule volumes e áreas de prismas retos e oblíquos — de containers a dutos industriais da Petrobras."
          gradiente="bg-gradient-to-br from-emerald-600 via-emerald-700 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Volume do Prisma: V = A_base × h"
              description="A fórmula universal que conecta geometria plana com geometria espacial."
              variant="emerald"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Fórmulas de Volume e Área dos Prismas"
              icone="📦"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Volume: A Ideia Fundamental",
                  icone: "🧮",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        O volume de qualquer prisma é simplesmente a <strong>área da base multiplicada pela altura</strong>:
                      </p>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 text-center">
                        <p className="text-2xl font-bold font-mono text-emerald-400">V = A_base × h</p>
                        <p className="text-sm text-muted-foreground mt-2">Válido para qualquer prisma (reto ou oblíquo)</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-xs font-bold text-emerald-400 mb-2">Paralelepípedo</p>
                          <p className="text-sm font-mono">V = a × b × c</p>
                        </div>
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-xs font-bold text-blue-400 mb-2">Prisma Triangular</p>
                          <p className="text-sm font-mono">V = (b × h_b / 2) × H</p>
                        </div>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="text-xs font-bold text-cyan-400 mb-2">Cubo</p>
                          <p className="text-sm font-mono">V = a³</p>
                        </div>
                      </div>
                      <AlertBox tipo="info" titulo="Aplicação na Petrobras">
                        Um tanque prismático retangular 8 m × 6 m × 4 m armazena V = 8 × 6 × 4 = <strong>192 m³</strong> de petróleo, equivalente a aproximadamente 1.208 barris.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Área Total do Prisma",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A área total divide-se em <strong>área lateral</strong> (faces retangulares) e <strong>área das bases</strong>:
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm font-mono font-bold">A_lateral = Perímetro_base × h</p>
                        <p className="text-sm font-mono font-bold">A_total = A_lateral + 2 × A_base</p>
                      </div>
                      <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                        <p className="text-xs font-bold text-emerald-400 mb-2">Exemplo — Container Industrial</p>
                        <p className="text-sm">Dimensões: 12 m × 2,4 m × 2,6 m</p>
                        <p className="text-sm">A_lateral = [2(12+2,4) + 2(2,4+2,6)] × ... (usar fórmula correta)</p>
                        <p className="text-sm">A_total = 2(ab + bc + ca) = 2(28,8 + 6,24 + 31,2) = <strong>132,48 m²</strong></p>
                      </div>
                      <AlertBox tipo="warning" titulo="Atenção">
                        Para um paralelepípedo: A_total = 2(ab + bc + ca). Para outros prismas, some as áreas de todas as faces individualmente.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Diagonal do Cubo e do Paralelepípedo",
                  icone: "📏",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A <strong>diagonal principal</strong> do paralelepípedo conecta vértices opostos e é calculada por dupla aplicação de Pitágoras:
                      </p>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
                        <p className="text-sm font-mono text-center font-bold">d = √(a² + b² + c²)</p>
                        <p className="text-sm text-center text-muted-foreground mt-1">Para o cubo: d = a√3</p>
                      </div>
                      <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                        <p className="text-xs font-bold text-blue-400 mb-2">Passo a passo no cubo de aresta a</p>
                        <p className="text-sm">1. Diagonal da face: d_face = √(a² + a²) = a√2</p>
                        <p className="text-sm">2. Diagonal espacial: d = √[(a√2)² + a²] = √(3a²) = <strong>a√3</strong></p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO — Prisma vs Cubo">
            Quando a questão fala em "bloco retangular" ou "paralelepípedo reto-retângulo", use V = a × b × c. Mas se todos os lados são iguais (cubo), use V = a³. A banca às vezes omite que é um cubo!
          </AlertBox>

          <section id="quiz-modulo-2" className="mt-8">
            <QuizInterativo
              questoes={quizM2}
              titulo="Quiz — Prismas: Volume e Área"
              icone="📦"
              numero={2}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 3: PIRÂMIDES — VOLUME E ÁREA LATERAL                      */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <ModuleBanner
          numero={3}
          titulo="Pirâmides: Volume e Área Lateral"
          descricao="O fator 1/3 que muda tudo. Domine volumes e áreas laterais de pirâmides regulares e aplique em estruturas industriais."
          gradiente="bg-gradient-to-br from-blue-700 via-cyan-600 to-emerald-600"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Volume da Pirâmide: V = (1/3) × A_base × h"
              description="Por que 1/3? Três pirâmides de mesma base e altura formam um prisma."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Fórmulas Essenciais da Pirâmide"
              icone="🔺"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Volume: O Fator 1/3",
                  icone: "🧮",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A pirâmide tem volume <strong>exatamente 1/3</strong> do prisma de mesma base e mesma altura:
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 text-center">
                        <p className="text-2xl font-bold font-mono text-blue-400">V = (1/3) × A_base × h</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-xs font-bold text-blue-400 mb-2">Pirâmide Quadrangular</p>
                          <p className="text-sm font-mono">V = (1/3) × l² × h</p>
                          <p className="text-xs text-muted-foreground mt-1">l = lado da base quadrada</p>
                        </div>
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-xs font-bold text-emerald-400 mb-2">Pirâmide Triangular</p>
                          <p className="text-sm font-mono">V = (1/3) × (b×h_b/2) × h</p>
                          <p className="text-xs text-muted-foreground mt-1">b, h_b = base e altura do triângulo</p>
                        </div>
                      </div>
                      <AlertBox tipo="info" titulo="Contextualização Industrial">
                        Um silo piramidal de base quadrada 6 m × 6 m e altura 4 m armazena V = (1/3) × 36 × 4 = <strong>48 m³</strong> de grãos — equivalente a cerca de 36 toneladas de soja.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Área Lateral da Pirâmide Regular",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A <strong>área lateral</strong> da pirâmide regular é calculada pela apótema lateral (a_l), que é a altura de cada face triangular:
                      </p>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm font-mono font-bold text-center">A_lateral = (Perímetro_base × a_l) / 2</p>
                        <p className="text-sm font-mono font-bold text-center">A_total = A_lateral + A_base</p>
                      </div>
                      <AlertBox tipo="warning" titulo="Não confunda!">
                        <strong>Apótema lateral (a_l)</strong>: altura da face triangular — usada para calcular área lateral.<br/>
                        <strong>Apótema da base (a_b)</strong>: distância do centro da base ao meio de uma aresta — usada para calcular a área de polígonos regulares.<br/>
                        <strong>Altura da pirâmide (h)</strong>: distância do vértice ao centro da base.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Relação entre a_l, h e a_b (Pitágoras)",
                  icone: "📏",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Na pirâmide regular, existe um <strong>triângulo retângulo fundamental</strong>:
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                        <p className="text-sm font-mono text-center font-bold">a_l² = h² + a_b²</p>
                        <p className="text-sm text-center text-muted-foreground mt-1">Geratriz² = Altura² + Apótema_base²</p>
                      </div>
                      <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                        <p className="text-xs font-bold text-emerald-400 mb-2">Exemplo — Pirâmide Quadrangular</p>
                        <p className="text-sm">Base: l = 6 m → a_b = l/2 = 3 m</p>
                        <p className="text-sm">Altura: h = 4 m</p>
                        <p className="text-sm">Apótema lateral: a_l = √(16 + 9) = √25 = <strong>5 m</strong></p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO — Pirâmide vs Prisma">
            Se a questão menciona um silo ou estrutura "em forma de teto", provavelmente é uma pirâmide (V com fator 1/3). Se é um container ou caixa, é um prisma (sem o fator 1/3). Leia o enunciado com atenção!
          </AlertBox>

          <section id="quiz-modulo-3" className="mt-8">
            <QuizInterativo
              questoes={quizM3}
              titulo="Quiz — Pirâmides: Volume e Área"
              icone="🔺"
              numero={3}
              variant="cyan"
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 4: CILINDRO — VOLUME E ÁREA                               */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner
          numero={4}
          titulo="Cilindro: Volume e Área"
          descricao="O sólido mais presente na indústria petrolífera. Domine os cálculos de tanques, dutos e vasos de pressão cilíndricos."
          gradiente="bg-gradient-to-br from-cyan-600 via-blue-600 to-blue-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Volume e Área do Cilindro"
              description="As três fórmulas essenciais que todo técnico Petrobras precisa dominar."
              variant="cyan"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Fórmulas do Cilindro de Revolução"
              icone="🛢️"
              corIndicador="bg-cyan-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Volume do Cilindro",
                  icone: "🧮",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        O cilindro é um prisma de base circular. Seu volume segue a mesma fórmula geral dos prismas:
                      </p>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-6 text-center">
                        <p className="text-2xl font-bold font-mono text-cyan-400">V = π × r² × h</p>
                        <p className="text-sm text-muted-foreground mt-2">r = raio da base circular | h = altura do cilindro</p>
                      </div>
                      <AlertBox tipo="info" titulo="Aplicação Direta — Tanque Petrobras">
                        Um tanque cilíndrico com raio 5 m e altura 10 m tem V = 3,14 × 25 × 10 = <strong>785 m³</strong> ≈ 4.937 barris de petróleo. Tanques assim são comuns em terminais de armazenamento.
                      </AlertBox>
                      <AlertBox tipo="warning" titulo="Cuidado com o Diâmetro!">
                        Questões frequentemente fornecem o <strong>diâmetro</strong> (d), mas a fórmula usa o <strong>raio</strong> (r = d/2). Não esqueça de dividir por 2 antes de calcular!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Área Lateral e Área Total",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A área lateral do cilindro equivale ao retângulo que envolve a superfície curva:
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm font-mono font-bold">A_lateral = 2π × r × h</p>
                        <p className="text-sm font-mono font-bold">A_bases = 2 × π × r² (duas bases)</p>
                        <p className="text-sm font-mono font-bold text-cyan-400">A_total = 2πr(r + h)</p>
                      </div>
                      <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                        <p className="text-xs font-bold text-cyan-400 mb-2">Exemplo — Cilindro de Gás</p>
                        <p className="text-sm">r = 0,4 m, h = 1,2 m</p>
                        <p className="text-sm">A_lateral = 2 × 3,14 × 0,4 × 1,2 = <strong>3,01 m²</strong></p>
                        <p className="text-sm">A_total = 2 × 3,14 × 0,4 × (0,4 + 1,2) = 4,02 m²</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Cilindro Anelar (Casca Cilíndrica) — Paredes de Dutos",
                  icone: "🔩",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Dutos industriais têm paredes com espessura — o volume de metal é calculado pela <strong>diferença de dois cilindros</strong>:
                      </p>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                        <p className="text-sm font-mono font-bold text-center">V_metal = π × (R² − r²) × h</p>
                        <p className="text-sm text-center text-muted-foreground mt-1">R = raio externo | r = raio interno</p>
                      </div>
                      <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                        <p className="text-xs font-bold text-blue-400 mb-2">Oleoduto — Exemplo Real</p>
                        <p className="text-sm">Diâm. externo 0,5 m (R=0,25), espessura 10 mm (r=0,24)</p>
                        <p className="text-sm">V/m = π × (0,0625 − 0,0576) × 1 = 3,14 × 0,0049 ≈ <strong>0,01539 m³/m</strong></p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO — Raio ao Quadrado">
            O raio entra na fórmula <strong>ao quadrado (r²)</strong>. Se o raio dobra, o volume quadruplica (2² = 4). Se a questão pede comparação entre cilindros com raios diferentes, o fator é sempre (r₂/r₁)² para o volume.
          </AlertBox>

          <section id="quiz-modulo-4" className="mt-8">
            <QuizInterativo
              questoes={quizM4}
              titulo="Quiz — Cilindro: Volume e Área"
              icone="🛢️"
              numero={4}
              variant="cyan"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 5: CONE — VOLUME E ÁREA                                   */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="Cone: Volume e Área"
          descricao="Silos, funis e coberturas cônicas — calcule volume, área lateral e geratriz com precisão de engenharia."
          gradiente="bg-gradient-to-br from-blue-600 via-emerald-600 to-cyan-600"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Volume e Área do Cone de Revolução"
              description="O cone como pirâmide circular — 1/3 do cilindro correspondente."
              variant="emerald"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Fórmulas Essenciais do Cone"
              icone="🔻"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Volume do Cone: O Fator 1/3",
                  icone: "🧮",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Assim como a pirâmide, o cone tem volume <strong>1/3 do cilindro</strong> de mesma base e altura:
                      </p>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 text-center">
                        <p className="text-2xl font-bold font-mono text-emerald-400">V = (1/3) × π × r² × h</p>
                      </div>
                      <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                        <p className="text-xs font-bold text-blue-400 mb-2">Silo Cônico Invertido — Refinaria</p>
                        <p className="text-sm">r = 3 m, h = 4 m</p>
                        <p className="text-sm">V = (1/3) × 3,14 × 9 × 4 = (1/3) × 113,04 = <strong>37,68 m³</strong></p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Geratriz do Cone (l ou g)",
                  icone: "📏",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A <strong>geratriz</strong> é a distância do vértice ao perímetro da base. É calculada por Pitágoras:
                      </p>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 text-center">
                        <p className="text-xl font-bold font-mono text-cyan-400">g² = r² + h²</p>
                        <p className="text-sm text-muted-foreground mt-1">g = geratriz | r = raio | h = altura</p>
                      </div>
                      <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                        <p className="text-xs font-bold text-emerald-400 mb-2">Cone clássico: r=3, h=4</p>
                        <p className="text-sm">g = √(9 + 16) = √25 = <strong>5 m</strong> (trio pitagórico 3-4-5)</p>
                      </div>
                      <AlertBox tipo="info" titulo="Trios Pitagóricos Úteis">
                        Memorize: 3-4-5, 5-12-13, 8-15-17. A CESGRANRIO adora usar esses trios em cones e pirâmides para facilitar o cálculo sem calculadora.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Área Lateral e Total do Cone",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A área lateral do cone, quando planificada, forma um <strong>setor circular</strong>:
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm font-mono font-bold">A_lateral = π × r × g</p>
                        <p className="text-sm font-mono font-bold">A_base = π × r²</p>
                        <p className="text-sm font-mono font-bold text-emerald-400">A_total = π × r × (r + g)</p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO — Geratriz vs Altura">
            Quando o enunciado diz "a medida do lado" ou "a geratriz mede X", use diretamente g na fórmula da área lateral. Quando diz "a altura mede X", você precisa calcular g primeiro com Pitágoras. Confundir os dois é o erro mais frequente!
          </AlertBox>

          <section id="quiz-modulo-5" className="mt-8">
            <QuizInterativo
              questoes={quizM5}
              titulo="Quiz — Cone: Volume e Área"
              icone="🔻"
              numero={5}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 6: ESFERA — VOLUME E ÁREA                                 */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <ModuleBanner
          numero={6}
          titulo="Esfera: Volume e Área"
          descricao="Tanques esféricos de GLP, boias de sondagem e vasos de pressão — as fórmulas da esfera são indispensáveis na engenharia offshore."
          gradiente="bg-gradient-to-br from-cyan-600 via-blue-700 to-emerald-600"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Volume e Área da Esfera"
              description="Duas fórmulas que você não pode errar na prova CESGRANRIO."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="As Fórmulas Fundamentais da Esfera"
              icone="🌐"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Volume: V = (4/3) × π × r³",
                  icone: "🧮",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A esfera tem o <strong>maior volume possível</strong> para uma dada área de superfície — por isso é ideal para armazenamento de gás sob pressão:
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 text-center">
                        <p className="text-2xl font-bold font-mono text-blue-400">V = (4/3) × π × r³</p>
                        <p className="text-sm text-muted-foreground mt-2">r = raio da esfera</p>
                      </div>
                      <AlertBox tipo="info" titulo="Tanque Esférico de GLP">
                        Um tanque esférico de raio 20 m armazena V = (4/3) × 3,14 × 8000 = <strong>33.493 m³</strong> de gás natural — capacidade de um gasômetro industrial.
                      </AlertBox>
                      <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                        <p className="text-xs font-bold text-emerald-400 mb-2">Escala de raio e volume</p>
                        <p className="text-sm">Se r dobra: V aumenta 2³ = <strong>8 vezes</strong></p>
                        <p className="text-sm">Se r triplica: V aumenta 3³ = <strong>27 vezes</strong></p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Área da Superfície: A = 4 × π × r²",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A área da esfera equivale exatamente a <strong>4 vezes o círculo de mesmo raio</strong>:
                      </p>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-6 text-center">
                        <p className="text-2xl font-bold font-mono text-cyan-400">A = 4 × π × r²</p>
                        <p className="text-sm text-muted-foreground mt-2">= 4 × Área do círculo de mesmo raio</p>
                      </div>
                      <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                        <p className="text-xs font-bold text-blue-400 mb-2">Vaso de Pressão Esférico — RPBC</p>
                        <p className="text-sm">Diâmetro = 4 m → r = 2 m</p>
                        <p className="text-sm">A = 4 × 3,14 × 4 = <strong>50,24 m²</strong> de área a impermeabilizar</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Casca Esférica e Hemisfério",
                  icone: "🔮",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Situações especiais frequentes em provas:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20 space-y-2">
                          <p className="text-sm font-bold text-blue-400">Casca Esférica</p>
                          <p className="text-sm font-mono">V = (4/3)π(R³ − r³)</p>
                          <p className="text-xs text-muted-foreground">R = raio externo, r = raio interno</p>
                        </div>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20 space-y-2">
                          <p className="text-sm font-bold text-cyan-400">Hemisfério</p>
                          <p className="text-sm font-mono">V = (2/3)πr³</p>
                          <p className="text-sm font-mono">A_curva = 2πr²</p>
                          <p className="text-sm font-mono">A_total = 3πr²</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO — Diâmetro ou Raio?">
            A questão dirá "o tanque esférico tem diâmetro de 6 m". Se você usar r = 6 (em vez de r = 3), o volume fica 8 vezes maior e você erra! Sempre verifique se a medida dada é diâmetro ou raio.
          </AlertBox>

          <section id="quiz-modulo-6" className="mt-8">
            <QuizInterativo
              questoes={quizM6}
              titulo="Quiz — Esfera: Volume e Área"
              icone="🌐"
              numero={6}
              variant="blue"
              onComplete={(score) => handleModuleComplete("modulo-6", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 7: TRONCOS DE CONE E PIRÂMIDE                             */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <ModuleBanner
          numero={7}
          titulo="Troncos: Cone e Pirâmide"
          descricao="Barris, silos decantadores e reservatórios troncocônicos — as fórmulas dos troncos resolvem problemas reais de armazenamento industrial."
          gradiente="bg-gradient-to-br from-emerald-700 via-cyan-600 to-blue-600"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Volume dos Troncos"
              description="A fórmula de Heron generalizada — conecta as duas bases com a média geométrica."
              variant="cyan"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Fórmulas dos Troncos"
              icone="🪣"
              corIndicador="bg-cyan-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Volume do Tronco de Pirâmide",
                  icone: "🧮",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        O tronco de pirâmide é obtido cortando uma pirâmide com um plano paralelo à base. Seu volume envolve a <strong>média geométrica das áreas das bases</strong>:
                      </p>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-6 text-center">
                        <p className="text-xl font-bold font-mono text-cyan-400">V = (h/3) × (A₁ + A₂ + √(A₁ × A₂))</p>
                        <p className="text-sm text-muted-foreground mt-2">A₁, A₂ = áreas das duas bases | h = altura</p>
                      </div>
                      <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                        <p className="text-xs font-bold text-blue-400 mb-2">Exemplo — Base maior 6×6, base menor 4×4, h=3</p>
                        <p className="text-sm">A₁ = 36 m², A₂ = 16 m²</p>
                        <p className="text-sm">√(A₁×A₂) = √576 = 24 m²</p>
                        <p className="text-sm font-bold">V = (3/3)(36 + 16 + 24) = 76 m³</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Volume do Tronco de Cone",
                  icone: "🪣",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Para o tronco de cone, as áreas das bases são πR² e πr²:
                      </p>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 text-center">
                        <p className="text-xl font-bold font-mono text-emerald-400">V = (πh/3) × (R² + r² + R×r)</p>
                        <p className="text-sm text-muted-foreground mt-2">R = raio maior | r = raio menor | h = altura</p>
                      </div>
                      <AlertBox tipo="info" titulo="Aplicação — Barril Industrial">
                        Um barril troncocônico com R = 0,4 m, r = 0,3 m e h = 0,8 m tem volume V = (π×0,8/3)(0,16 + 0,09 + 0,12) = (0,837)(0,37) ≈ <strong>0,276 m³ = 276 L</strong>.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Geratriz do Tronco de Cone",
                  icone: "📏",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A geratriz do tronco de cone é calculada por Pitágoras considerando a <strong>diferença entre os raios</strong>:
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
                        <p className="text-xl font-bold font-mono text-blue-400">g = √[h² + (R − r)²]</p>
                      </div>
                      <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                        <p className="text-sm font-bold text-cyan-400 mb-2">Área Lateral do Tronco de Cone:</p>
                        <p className="text-sm font-mono">A_lateral = π × g × (R + r)</p>
                        <p className="text-sm font-mono">A_total = π×g×(R+r) + π(R²+r²)</p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO — Tronco vs Cone Completo">
            Ao calcular o volume de um tronco por subtração (cone grande − cone pequeno), certifique-se de que os cones são semelhantes (raios e alturas proporcionais). Se o enunciado der raios e altura do tronco, use a fórmula direta.
          </AlertBox>

          <section id="quiz-modulo-7" className="mt-8">
            <QuizInterativo
              questoes={quizM7}
              titulo="Quiz — Troncos de Cone e Pirâmide"
              icone="🪣"
              numero={7}
              variant="cyan"
              onComplete={(score) => handleModuleComplete("modulo-7", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 8: SÓLIDOS COMPOSTOS                                      */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <ModuleBanner
          numero={8}
          titulo="Sólidos Compostos"
          descricao="Silos, torres e tanques capsulares são combinações de sólidos. Domine a estratégia de decompor e calcular parte por parte."
          gradiente="bg-gradient-to-br from-blue-700 via-blue-600 to-emerald-600"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Estratégia: Decomposição em Sólidos Simples"
              description="Todo sólido composto é resolvido dividindo-o em partes conhecidas."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Como Resolver Sólidos Compostos"
              icone="🏗️"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "A Estratégia dos 3 Passos",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Para resolver qualquer questão de sólido composto, siga sempre estes passos:
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <span className="text-blue-400 font-bold text-lg">1.</span>
                          <div>
                            <p className="font-bold text-sm">Identifique os sólidos componentes</p>
                            <p className="text-sm text-muted-foreground">Cilindro + semiesfera? Prisma + pirâmide? Cubo com furo cilíndrico?</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <span className="text-cyan-400 font-bold text-lg">2.</span>
                          <div>
                            <p className="font-bold text-sm">Calcule cada volume/área separadamente</p>
                            <p className="text-sm text-muted-foreground">Use as fórmulas de cada sólido simples com as dimensões corretas.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <span className="text-emerald-400 font-bold text-lg">3.</span>
                          <div>
                            <p className="font-bold text-sm">Some (ou subtraia) os resultados</p>
                            <p className="text-sm text-muted-foreground">Adição para sólidos unidos; subtração para furos e remoções.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplos Industriais Compostos",
                  icone: "🏭",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FlipCard
                          frente={
                            <div className="flex flex-col items-center text-center space-y-2">
                              <span className="text-4xl">🌾</span>
                              <h3 className="font-bold text-lg">Silo Agrícola</h3>
                              <p className="text-sm opacity-80">Cilindro + Semiesfera</p>
                            </div>
                          }
                          verso={
                            <div className="space-y-3">
                              <p className="font-bold text-white mb-2">Exemplo</p>
                              <p className="text-white/90 text-[13px] leading-tight mt-1">
                                Cilindro: r=3 m, h=5 m → V₁ = π×9×5 = 141,3 m³ <br/>
                                Semiesfera: r=3 m → V₂ = (2/3)π×27 = 56,52 m³ <br/>
                                <strong>V_total = 141,3 + 56,52 = 197,82 m³</strong>
                              </p>
                            </div>
                          }
                          categoria="Exemplo 1"
                          variant="blue"
                        />
                        <FlipCard
                          frente={
                            <div className="flex flex-col items-center text-center space-y-2">
                              <span className="text-4xl">🚢</span>
                              <h3 className="font-bold text-lg">Tanque FPSO</h3>
                              <p className="text-sm opacity-80">Cilindro + 2 Hemisf. (Esfera)</p>
                            </div>
                          }
                          verso={
                            <div className="space-y-3">
                              <p className="font-bold text-white mb-2">Exemplo</p>
                              <p className="text-white/90 text-[13px] leading-tight mt-1">
                                Cilindro: r=4 m, h=6 m → V₁ = π×16×6 = 301,44 m³ <br/>
                                Esfera completa: r=4 → V₂ = (4/3)π×64 = 268,16 m³ <br/>
                                <strong>V_total = 301,44 + 268,16 = 569,6 m³</strong>
                              </p>
                            </div>
                          }
                          categoria="Exemplo 2"
                          variant="cyan"
                        />
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Área de Sólidos Compostos — Cuidado com Faces Internas",
                  icone: "⚠️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Ao calcular a <strong>área total de um sólido composto</strong>, elimine as faces que estão "ocultas" (contato entre os dois sólidos):
                      </p>
                      <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                        <p className="text-xs font-bold text-emerald-400 mb-2">Cilindro + Cone no Topo</p>
                        <p className="text-sm">A_total = A_lateral_cilindro + A_base_cilindro + A_lateral_cone</p>
                        <p className="text-sm text-muted-foreground">NÃO some a base do cone (ela é interna) nem a tampa superior do cilindro!</p>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        Em sólidos compostos, a banca frequentemente inclui nas alternativas o valor com as faces ocultas somadas. Identifique quais faces são externas antes de calcular!
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-8" className="mt-8">
            <QuizInterativo
              questoes={quizM8}
              titulo="Quiz — Sólidos Compostos"
              icone="🏗️"
              numero={8}
              variant="blue"
              onComplete={(score) => handleModuleComplete("modulo-8", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 9: APLICAÇÕES PETROBRAS — TANQUES E RESERVATÓRIOS         */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <ModuleBanner
          numero={9}
          titulo="Aplicações Petrobras: Tanques e Reservatórios"
          descricao="Geometria espacial aplicada diretamente ao dia a dia da indústria petrolífera — oleodutos, tanques de lastro, vasos de pressão e silos de refinaria."
          gradiente="bg-gradient-to-br from-emerald-700 via-blue-700 to-cyan-600"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Geometria na Indústria Petrolífera"
              description="Cada sólido tem uma aplicação real — reconheça e calcule no contexto industrial."
              variant="emerald"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Sólidos na Petrobras: Guia de Referência"
              icone="🛢️"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Tanques e Reservatórios",
                  icone: "🏭",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-xs font-bold text-blue-400 mb-2">Tanque Atmosférico</p>
                          <p className="text-sm">Formato: cilindro com teto cônico</p>
                          <p className="text-sm">V = V_cilindro + V_cone</p>
                          <p className="text-xs text-muted-foreground mt-1">Armazenamento de petróleo, gasolina, etanol</p>
                        </div>
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-xs font-bold text-emerald-400 mb-2">Tanque Esférico (Bullet)</p>
                          <p className="text-sm">Formato: esfera ou esferoide</p>
                          <p className="text-sm">V = (4/3)πr³</p>
                          <p className="text-xs text-muted-foreground mt-1">GLP, GNL, gases pressurizados</p>
                        </div>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="text-xs font-bold text-cyan-400 mb-2">Tanque de Lastro (FPSO)</p>
                          <p className="text-sm">Formato: paralelepípedo ou cilindro</p>
                          <p className="text-sm">Estabilidade da plataforma flutuante</p>
                        </div>
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-xs font-bold text-blue-400 mb-2">Vaso de Pressão</p>
                          <p className="text-sm">Cilindro + tampas hemisféricas</p>
                          <p className="text-sm">Processamento de gás, separadores</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Cálculo de Barris e Conversões",
                  icone: "🔢",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-sm font-bold text-emerald-400">Conversões Fundamentais</p>
                        <p className="text-sm font-mono">1 barril de petróleo = 158,987 L ≈ 0,159 m³</p>
                        <p className="text-sm font-mono">1 m³ = 1.000 L = 6,2898 barris</p>
                        <p className="text-sm font-mono">1 barril/dia = 0,159 m³/dia</p>
                      </div>
                      <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                        <p className="text-xs font-bold text-blue-400 mb-2">Exemplo — Tanque de 8.478 m³</p>
                        <p className="text-sm">Barris = 8.478 ÷ 0,159 ≈ <strong>53.320 barris</strong></p>
                        <p className="text-sm">Ou: 8.478 × 6,29 ≈ 53.327 barris</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Oleodutos e Gasodutos — Seção Anelar",
                  icone: "🔩",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Dutos têm paredes com espessura. O volume de metal por metro linear usa a <strong>seção anelar</strong>:
                      </p>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
                        <p className="text-sm font-mono text-center font-bold">V_metal/m = π(R² − r²)</p>
                      </div>
                      <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                        <p className="text-xs font-bold text-emerald-400 mb-2">Oleoduto — Gasoduto Bolivia-Brasil</p>
                        <p className="text-sm">Diâm. externo ≈ 0,5 m (R=0,25), espessura ≈ 10 mm (r=0,24)</p>
                        <p className="text-sm">V_aço/m = 3,14 × (0,0625 − 0,0576) = 0,01539 m³/m</p>
                        <p className="text-sm">Em 3.150 km: ≈ 48.479 m³ de aço!</p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <AlertBox tipo="warning" titulo="Dica de Prova — Contexto Petrobras">
            A CESGRANRIO frequentemente contextualiza questões de geometria espacial com cenários de refinarias, plataformas offshore e terminais. O sólido mais frequente é o cilindro (tanques, dutos). Identifique primeiro o sólido, depois aplique a fórmula.
          </AlertBox>

          <section id="quiz-modulo-9" className="mt-8">
            <QuizInterativo
              questoes={quizM9}
              titulo="Quiz — Aplicações Petrobras"
              icone="🛢️"
              numero={9}
              variant="emerald"
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
          titulo="Simulado CESGRANRIO — Geometria Espacial"
          descricao="Questões no estilo e nível de dificuldade da banca CESGRANRIO. Teste tudo que você aprendeu nos 9 módulos anteriores."
          gradiente="bg-gradient-to-br from-blue-800 via-blue-700 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Revisão Final — Tabela de Fórmulas"
              description="Consolide todas as fórmulas antes do simulado definitivo."
              variant="blue"
              className="mb-6"
            />
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-blue-500/10">
                    <th className="p-3 text-left border border-border">Sólido</th>
                    <th className="p-3 text-left border border-border">Volume</th>
                    <th className="p-3 text-left border border-border">Área Lateral</th>
                    <th className="p-3 text-left border border-border">Área Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-border font-bold text-blue-400">Cubo</td>
                    <td className="p-3 border border-border font-mono text-xs">a³</td>
                    <td className="p-3 border border-border font-mono text-xs">4a²</td>
                    <td className="p-3 border border-border font-mono text-xs">6a²</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="p-3 border border-border font-bold text-cyan-400">Prisma</td>
                    <td className="p-3 border border-border font-mono text-xs">A_b × h</td>
                    <td className="p-3 border border-border font-mono text-xs">P_b × h</td>
                    <td className="p-3 border border-border font-mono text-xs">A_lat + 2A_b</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-border font-bold text-emerald-400">Pirâmide</td>
                    <td className="p-3 border border-border font-mono text-xs">(1/3)A_b·h</td>
                    <td className="p-3 border border-border font-mono text-xs">(P_b × a_l)/2</td>
                    <td className="p-3 border border-border font-mono text-xs">A_lat + A_b</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="p-3 border border-border font-bold text-blue-400">Cilindro</td>
                    <td className="p-3 border border-border font-mono text-xs">πr²h</td>
                    <td className="p-3 border border-border font-mono text-xs">2πrh</td>
                    <td className="p-3 border border-border font-mono text-xs">2πr(r+h)</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-border font-bold text-cyan-400">Cone</td>
                    <td className="p-3 border border-border font-mono text-xs">(1/3)πr²h</td>
                    <td className="p-3 border border-border font-mono text-xs">πrg</td>
                    <td className="p-3 border border-border font-mono text-xs">πr(r+g)</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="p-3 border border-border font-bold text-emerald-400">Esfera</td>
                    <td className="p-3 border border-border font-mono text-xs">(4/3)πr³</td>
                    <td className="p-3 border border-border font-mono text-xs">—</td>
                    <td className="p-3 border border-border font-mono text-xs">4πr²</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-border font-bold text-blue-400">Tronco Cone</td>
                    <td className="p-3 border border-border font-mono text-xs">(πh/3)(R²+r²+Rr)</td>
                    <td className="p-3 border border-border font-mono text-xs">πg(R+r)</td>
                    <td className="p-3 border border-border font-mono text-xs">πg(R+r)+π(R²+r²)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <AlertBox tipo="info" titulo="Relações-Chave para Memorizar">
                <ul className="space-y-1 text-sm">
                  <li>• Euler: V − A + F = 2</li>
                  <li>• V_cone = (1/3) × V_cilindro</li>
                  <li>• V_pirâmide = (1/3) × V_prisma</li>
                  <li>• A_esfera = 4 × A_círculo (mesmo raio)</li>
                  <li>• Geratriz cone: g² = r² + h²</li>
                </ul>
              </AlertBox>
              <AlertBox tipo="warning" titulo="As 5 Pegadinhas da CESGRANRIO">
                <ul className="space-y-1 text-sm">
                  <li>• Diâmetro vs raio (divida por 2!)</li>
                  <li>• Geratriz vs altura no cone</li>
                  <li>• Apótema lateral vs apótema da base</li>
                  <li>• Fator 1/3 em cone e pirâmide</li>
                  <li>• Faces ocultas em sólidos compostos</li>
                </ul>
              </AlertBox>
            </div>
          </section>

          <section className="mb-8">
            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Mapa Mental",
                  icon: () => <span className="text-lg">🗺️</span>,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Poliedros e Prismas",
                          type: "infográfico",
                          placeholderColor: "bg-blue-500/20",
                        },
                        {
                          title: "Corpos Redondos",
                          type: "mapa mental",
                          placeholderColor: "bg-cyan-500/20",
                        },
                        {
                          title: "Troncos e Sólidos Compostos",
                          type: "infográfico",
                          placeholderColor: "bg-emerald-500/20",
                        }
                      ]}
                      tituloAula="Geometria Espacial"
                      materia="Matemática"
                      profissao="Engenharia"
                      moduloNome="Revisão Final"
                    />
                  ),
                },
                {
                  id: "video",
                  label: "Videoaula",
                  icon: () => <span className="text-lg">▶️</span>,
                  content: (
                    <div className="aspect-video rounded-xl overflow-hidden border border-border/50 bg-muted flex items-center justify-center relative group">
                      <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-blue-900/20 transition-colors" />
                      <div className="w-16 h-16 rounded-full bg-blue-600/90 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                        <span className="text-2xl ml-1">▶</span>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium">
                        Duração: 45:10
                      </div>
                    </div>
                  ),
                },
              ]}
              defaultTab="resumo"
              variant="blue"
            />
          </section>

          <section id="quiz-modulo-10" className="mt-8">
            <QuizInterativo
              questoes={quizM10}
              titulo="Simulado Final — CESGRANRIO Geometria Espacial"
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
