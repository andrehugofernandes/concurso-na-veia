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
      {/* INTRODUÇÃO: BEM-VINDO À GEOMETRIA ESPACIAL                        */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="intro" className="space-y-6">
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-600 rounded-3xl p-8 md:p-12 text-white shadow-lg">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Geometria Espacial (3D)</h1>
            <p className="text-lg md:text-xl opacity-90 mb-6">Domine cálculos de volume, área e visualização de sólidos geométricos.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/20 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold">10</p>
                <p className="text-sm opacity-80">Módulos</p>
              </div>
              <div className="bg-white/20 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold">60+</p>
                <p className="text-sm opacity-80">Questões</p>
              </div>
              <div className="bg-white/20 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold">15h</p>
                <p className="text-sm opacity-80">Duração</p>
              </div>
              <div className="bg-white/20 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold">100%</p>
                <p className="text-sm opacity-80">CESGRANRIO</p>
              </div>
            </div>
          </div>

          <AlertBox tipo="success" titulo="Por Que Estudar Geometria Espacial?">
            Geometria espacial é frequente em provas CESGRANRIO (Petrobras), especialmente em contextos industriais:
            <ul className="list-disc list-inside mt-3 space-y-1 text-sm">
              <li><strong>Tanques de armazenamento:</strong> esferóides, cilindros, cones</li>
              <li><strong>Tubulações e dutos:</strong> cilindros com diferentes raios</li>
              <li><strong>Silos e reservatórios:</strong> sólidos compostos (cilindro + cone)</li>
              <li><strong>Otimização de custo:</strong> minimizar material, maximizar volume</li>
              <li><strong>Capacidade e eficiência:</strong> cálculos de volume em litros/m³</li>
            </ul>
          </AlertBox>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AlertBox tipo="info" titulo="Estrutura desta Aula">
              <div className="space-y-2 text-sm mt-3">
                <p><strong>Módulos 1-3:</strong> Fundamentos (poliedros, prismas, pirâmides)</p>
                <p><strong>Módulos 4-6:</strong> Sólidos de revolução (cilindro, cone, esfera)</p>
                <p><strong>Módulos 7-8:</strong> Tópicos avançados (troncos, compostos)</p>
                <p><strong>Módulos 9-10:</strong> Aplicações Petrobras e simulado final</p>
              </div>
            </AlertBox>

            <AlertBox tipo="warning" titulo="Pré-requisitos">
              <div className="space-y-2 text-sm mt-3">
                <p>✓ Área e perímetro de polígonos planos</p>
                <p>✓ Teorema de Pitágoras (a² + b² = c²)</p>
                <p>✓ Noções de trigonometria básica (seno, cosseno)</p>
                <p>✓ Proporção e semelhança de figuras</p>
              </div>
            </AlertBox>
          </div>

          <AlertBox tipo="success" titulo="O Que Você Vai Aprender Nesta Aula">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mt-3">
              <div>
                <p className="font-semibold text-emerald-400 mb-2">Conceitos</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Relação de Euler (V-A+F=2)</li>
                  <li>Poliedros e suas classificações</li>
                  <li>Sólidos de revolução</li>
                  <li>Sólidos compostos</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-blue-400 mb-2">Habilidades</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Calcular volumes com precisão</li>
                  <li>Encontrar áreas de sólidos</li>
                  <li>Converter unidades corretamente</li>
                  <li>Resolver problemas contextualizados</li>
                </ul>
              </div>
            </div>
          </AlertBox>

          <ContentAccordion
            items={[
              {
                titulo: "Metodologia de Estudo Recomendada",
                icone: "📚",
                conteudo: (
                  <div className="space-y-3 text-sm">
                    <p><strong>1. Leia o conceito:</strong> Entenda a definição e as fórmulas antes de memorizar.</p>
                    <p><strong>2. Visualize em 3D:</strong> Use papel/software ou objetos reais para ver o sólido.</p>
                    <p><strong>3. Decore as fórmulas:</strong> Crie cartões mentais e repita 5-10 vezes.</p>
                    <p><strong>4. Resolva exemplos:</strong> Comece com exercícios simples, depois complexos.</p>
                    <p><strong>5. Pratique questões CESGRANRIO:</strong> Leia provas antigas e identifique padrões.</p>
                    <p><strong>6. Faça o simulado:</strong> Teste seus conhecimentos ao final.</p>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 1: POLIEDROS — VÉRTICES, ARESTAS E FACES                  */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="Poliedros e a Relação de Euler"
          descricao="Identifique vértices, arestas e faces de sólidos geométricos e aplique a relação V − A + F = 2 para resolver questões CESGRANRIO."
          gradiente="bg-gradient-to-br from-amber-300 via-amber-500 to-amber-400"
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
          











<ModuleConsolidation
            index={1}
            variant="indigo"
            video={{
              videoId: "Zf4sGKq8TL8",
              title: "Poliedros e a Relação de Euler",
              duration: "12:45"
            }}
            resumoVisual={{
              moduloNome: "Módulo 1",
              tituloAula: "Geometria Espacial",
              materia: "Matemática",
              images: [{
                title: "Relação de Euler: V - A + F = 2",
                type: "diagram",
                placeholderColor: "indigo",
                imageUrl: "/temp-img.png"
              }]
            }}
            maceteVisual={{
              title: "Pulo do Gato",
              content: (<div className="space-y-3">
                <p className="font-semibold">Memorize a Relação de Euler: V - A + F = 2</p>
                <p>Para qualquer poliedro convexo: Vértices - Arestas + Faces = 2. Use em pirâmides, prismas e qualquer sólido fechado.</p>
              </div>)
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Resumo dos Poliedros e Euler",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM1}
              titulo="QUIZ: Poliedros e Euler"
              icone="🔷"
              numero={3}
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
          gradiente="bg-gradient-to-br from-blue-300 via-blue-500 to-blue-400"
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
          











<ModuleConsolidation
            index={2}
            variant="emerald"
            video={{
              videoId: "7K8VgX2sXMc",
              title: "Prismas: Volume, Área Lateral e Total",
              duration: "14:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 2",
              tituloAula: "Geometria Espacial",
              materia: "Matemática",
              images: [{
                title: "Fórmulas de Prismas: V = base × altura",
                type: "diagram",
                placeholderColor: "emerald",
                imageUrl: "/temp-img.png"
              }]
            }}
            maceteVisual={{
              title: "Pulo do Gato",
              content: (<div className="space-y-3">
                <p className="font-semibold">Volume de Prisma = Área da Base × Altura</p>
                <p>A altura é sempre perpendicular à base. Para área lateral, some as áreas dos retângulos das faces. Para área total: A_total = 2 × A_base + A_lateral.</p>
              </div>)
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
              titulo: "Prismas Descomplicados",
              artista: "Prof. Rítmico"
            }}
          />

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
          gradiente="bg-gradient-to-br from-emerald-300 via-emerald-500 to-emerald-400"
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
          











<ModuleConsolidation
            index={3}
            variant="cyan"
            video={{
              videoId: "4lLu2Kj2W0A",
              title: "Pirâmides: Apótema, Volume e Área Lateral",
              duration: "15:20"
            }}
            resumoVisual={{
              moduloNome: "Módulo 3",
              tituloAula: "Geometria Espacial",
              materia: "Matemática",
              images: [{
                title: "Volume de Pirâmide = (base × altura) / 3",
                type: "diagram",
                placeholderColor: "cyan",
                imageUrl: "/temp-img.png"
              }]
            }}
            maceteVisual={{
              title: "Pulo do Gato",
              content: (<div className="space-y-3">
                <p className="font-semibold">Sempre divida por 3 no volume de pirâmides</p>
                <p>V = (1/3) × A_base × h. Use Pitágoras para achar apótema lateral: a_l² = h² + a_b². Não confunda apótema da base com apótema lateral!</p>
              </div>)
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
              titulo: "Pirâmides: O Fator 1/3",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM3}
              titulo="QUIZ: Pirâmides"
              icone="🔺"
              numero={4}
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
          gradiente="bg-gradient-to-br from-rose-300 via-rose-500 to-rose-400"
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
          











<ModuleConsolidation
            index={4}
            variant="blue"
            video={{
              videoId: "I7C8Ygvdp8k",
              title: "Cilindro: Superfícies, Secções e Volume",
              duration: "13:45"
            }}
            resumoVisual={{
              moduloNome: "Módulo 4",
              tituloAula: "Geometria Espacial",
              materia: "Matemática",
              images: [{
                title: "Volume de Cilindro = π × r² × h",
                type: "diagram",
                placeholderColor: "blue",
                imageUrl: "/temp-img.png"
              }]
            }}
            maceteVisual={{
              title: "Pulo do Gato",
              content: (<div className="space-y-3">
                <p className="font-semibold">Raio ao quadrado é crítico: r² (não r)</p>
                <p>V = π × r² × h. Se o raio dobra, volume quadruplica. Área lateral = 2πrh (a "banda" lateral). Área total = 2πr(h + r).</p>
              </div>)
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
              titulo: "Cilindros e Secções",
              artista: "Prof. Rítmico"
            }}
          />

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
          gradiente="bg-gradient-to-br from-violet-300 via-violet-500 to-violet-400"
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
          











<ModuleConsolidation
            index={5}
            variant="amber"
            video={{
              videoId: "Gn7r8JTqPO8",
              title: "Cone: Geratriz, Planificação e Volume",
              duration: "14:10"
            }}
            resumoVisual={{
              moduloNome: "Módulo 5",
              tituloAula: "Geometria Espacial",
              materia: "Matemática",
              images: [{
                title: "Volume de Cone = (π × r² × h) / 3",
                type: "diagram",
                placeholderColor: "amber",
                imageUrl: "/temp-img.png"
              }]
            }}
            maceteVisual={{
              title: "Pulo do Gato",
              content: (<div className="space-y-3">
                <p className="font-semibold">Geratriz ≠ Altura: use Pitágoras g² = h² + r²</p>
                <p>V = (1/3)πr²h. Área lateral = πrg (use geratriz, não altura). A planificação do cone é um setor de círculo com raio = geratriz.</p>
              </div>)
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
              titulo: "Cone: Geratriz e Planificação",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM5}
              titulo="QUIZ: Cone"
              icone="🔻"
              numero={6}
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
          gradiente="bg-gradient-to-br from-amber-900 via-amber-500 to-amber-800"
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
          











<ModuleConsolidation
            index={6}
            variant="rose"
            video={{
              videoId: "5P6jf8dO1Zc",
              title: "Esfera: Volume, Área e Secções Esféricas",
              duration: "13:55"
            }}
            resumoVisual={{
              moduloNome: "Módulo 6",
              tituloAula: "Geometria Espacial",
              materia: "Matemática",
              images: [{
                title: "Volume de Esfera = (4/3)π × r³",
                type: "diagram",
                placeholderColor: "rose",
                imageUrl: "/temp-img.png"
              }]
            }}
            maceteVisual={{
              title: "Pulo do Gato",
              content: (<div className="space-y-3">
                <p className="font-semibold">Leia bem: diâmetro ou raio? Confundir multiplica o erro por 8!</p>
                <p>V = (4/3)πr³, A = 4πr². Casca esférica: V = (4/3)π(R³-r³). Hemisfério: V = (2/3)πr³. Sempre verifique a unidade dada no problema.</p>
              </div>)
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
              titulo: "Esferas: Fórmulas e Cálculos",
              artista: "Prof. Rítmico"
            }}
          />

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
          gradiente="bg-gradient-to-br from-blue-900 via-blue-500 to-blue-800"
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
          











<ModuleConsolidation
            index={7}
            variant="indigo"
            video={{
              videoId: "rK7qN2pL0J4",
              title: "Troncos de Cone e Pirâmide: Volumes",
              duration: "14:25"
            }}
            resumoVisual={{
              moduloNome: "Módulo 7",
              tituloAula: "Geometria Espacial",
              materia: "Matemática",
              images: [{
                title: "Volume de Tronco = (π×h/3) × (R² + R×r + r²)",
                type: "diagram",
                placeholderColor: "indigo",
                imageUrl: "/temp-img.png"
              }]
            }}
            maceteVisual={{
              title: "Pulo do Gato",
              content: (<div className="space-y-3">
                <p className="font-semibold">Fórmula de tronco envolve soma e produto dos raios</p>
                <p>V = (πh/3)(R² + Rr + r²). Geratriz: g = √[h² + (R-r)²]. Método alternativo: cone grande - cone pequeno.</p>
              </div>)
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
              titulo: "Troncos: Fórmulas Condensadas",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM7}
              titulo="QUIZ: Troncos"
              icone="🪣"
              numero={8}
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
          gradiente="bg-gradient-to-br from-emerald-900 via-emerald-500 to-emerald-800"
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
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-xs font-bold text-blue-400 mb-2">Silo Agrícola — Cilindro + Semiesfera</p>
                          <p className="text-sm">Cilindro: r=3 m, h=5 m → V₁ = π×9×5 = 141,3 m³</p>
                          <p className="text-sm">Semiesfera: r=3 m → V₂ = (2/3)π×27 = 56,52 m³</p>
                          <p className="text-sm font-bold">V_total = 141,3 + 56,52 = <span className="text-emerald-400">197,82 m³</span></p>
                        </div>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="text-xs font-bold text-cyan-400 mb-2">Tanque Capsular FPSO — Cilindro + 2 Hemisférios</p>
                          <p className="text-sm">Cilindro: r=4 m, h=6 m → V₁ = π×16×6 = 301,44 m³</p>
                          <p className="text-sm">Esfera completa: r=4 → V₂ = (4/3)π×64 = 268,16 m³</p>
                          <p className="text-sm font-bold">V_total = 301,44 + 268,16 = <span className="text-emerald-400">569,6 m³</span></p>
                        </div>
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
          











<ModuleConsolidation
            index={8}
            variant="emerald"
            video={{
              videoId: "EZ9KF3dK8Hg",
              title: "Sólidos Compostos: Decomposição e Volume",
              duration: "13:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 8",
              tituloAula: "Geometria Espacial",
              materia: "Matemática",
              images: [{
                title: "Decomponha sólidos compostos em partes conhecidas",
                type: "diagram",
                placeholderColor: "emerald",
                imageUrl: "/temp-img.png"
              }]
            }}
            maceteVisual={{
              title: "Pulo do Gato",
              content: (<div className="space-y-3">
                <p className="font-semibold">Divida sólidos em partes: cilindro + semiesfera, cone + cilindro, etc.</p>
                <p>Calcule cada parte separadamente e some. Cuidado: faces internas não contam para área total. Use cores ou rabiscos para marcar as partes.</p>
              </div>)
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
              titulo: "Sólidos Compostos: Estratégia",
              artista: "Prof. Rítmico"
            }}
          />

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
          gradiente="bg-gradient-to-br from-rose-900 via-rose-500 to-rose-800"
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
          











<ModuleConsolidation
            index={9}
            variant="cyan"
            video={{
              videoId: "zW7j2P5kK9I",
              title: "Geometria Espacial na Petrobras: Tanques e Tubulações",
              duration: "15:40"
            }}
            resumoVisual={{
              moduloNome: "Módulo 9",
              tituloAula: "Geometria Espacial",
              materia: "Matemática",
              images: [{
                title: "Tanques esféricos, cilíndricos e silos",
                type: "diagram",
                placeholderColor: "cyan",
                imageUrl: "/temp-img.png"
              }]
            }}
            maceteVisual={{
              title: "Pulo do Gato",
              content: (<div className="space-y-3">
                <p className="font-semibold">Petrobras adora tanques cilíndricos e esféricos para armazenamento</p>
                <p>Tanques de armazenamento: cilindros (V = πr²h). Silos: cilindro + cone. Tubulações: cilindros com diâmetro × comprimento. Cálculo de capacidade em litros: 1 m³ = 1000 L.</p>
              </div>)
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
              titulo: "Tanques e Tubulações na Indústria",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM9}
              titulo="QUIZ: Tanques e Reservatórios"
              icone="🛢️"
              numero={10}
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
          gradiente="bg-gradient-to-br from-violet-900 via-violet-500 to-violet-800"
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



          <section id="quiz-modulo-10" className="mt-8">
          











<ModuleConsolidation
            index={10}
            variant="blue"
            video={{
              videoId: "hN1K7mX4qJE",
              title: "Geometria Espacial: Resumo Completo e Estratégia CESGRANRIO",
              duration: "16:20"
            }}
            resumoVisual={{
              moduloNome: "Módulo 10",
              tituloAula: "Geometria Espacial",
              materia: "Matemática",
              images: [{
                title: "Consolidação de todas as fórmulas e conceitos",
                type: "diagram",
                placeholderColor: "blue",
                imageUrl: "/temp-img.png"
              }]
            }}
            maceteVisual={{
              title: "Pulo do Gato",
              content: (<div className="space-y-3">
                <p className="font-semibold">Revise: Euler (V-A+F=2), fatores 1/3 e 2/3, raio ao quadrado</p>
                <p>Leia o enunciado 2 vezes. Identifique o sólido. Use Pitágoras para geratriz. Cuidado com diâmetro vs raio. Decomponha sólidos compostos. Ignore faces internas na área total.</p>
              </div>)
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
              titulo: "Geometria Espacial: Revisão Final",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM10}
              titulo="QUIZ: Simulado Final"
              icone="🏆"
              numero={11}
              variant="blue"
              onComplete={(score) => handleModuleComplete("modulo-10", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* GUIA COMPLEMENTAR — DICAS EXTRA E RECURSO                         */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="recursos" className="space-y-6">
        <div className="space-y-6">
          <ModuleBanner
            numero={0}
            titulo="Recursos Complementares — Geometria Espacial 3D"
            descricao="Aprenda estratégias avançadas, como resolver problemas de visualização 3D e conversão entre unidades."
            icone="📚"
            variant="purple"
          />

          <AlertBox tipo="info" titulo="Como Usar Esta Seção de Recursos">
            <div className="space-y-2 text-sm mt-3">
              <p>Esta seção complementa os 10 módulos principais com:</p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Dicas práticas:</strong> Estratégias que economizam tempo na prova</li>
                <li><strong>Exercícios extras:</strong> Para praticar além do simulado</li>
                <li><strong>Revisão de conceitos:</strong> Reforce o que aprendeu</li>
                <li><strong>Glossário:</strong> Consulte termos confusos quando precisar</li>
              </ul>
              <p className="mt-2">Ideal para revisar 1-2 dias antes da prova ou quando tiver dúvida em um conceito específico.</p>
            </div>
          </AlertBox>

          <section className="space-y-6">
            <AlertBox tipo="success" titulo="Visualização 3D — Estratégia Prática">
              Para qualquer sólido, desenhe em papel ou use software de modelagem (GeoGebra 3D). Se a questão descreve um sólido composto, sempre:
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Identifique as partes (cilindro, cone, esfera)</li>
                <li>Marque dimensões dadas (raio, altura, aresta)</li>
                <li>Use cores diferentes para cada parte</li>
                <li>Calcule volume ou área de cada parte isoladamente</li>
                <li>Combine resultados (soma para volume, cuidado com área total)</li>
              </ul>
            </AlertBox>

            <AlertBox tipo="info" titulo="Conversão de Unidades — Tabela Rápida">
              <div className="font-mono text-xs space-y-1 mt-2">
                <p>1 m³ = 1000 L (litros)</p>
                <p>1 cm³ = 1 mL</p>
                <p>1 m³ = 1 000 000 cm³</p>
                <p>1 L = 1 dm³</p>
                <p>Densidade: m = ρ × V (massa = densidade × volume)</p>
              </div>
            </AlertBox>

            <AlertBox tipo="warning" titulo="Erros Mais Frequentes CESGRANRIO">
              <ul className="list-disc list-inside space-y-2 text-sm mt-2">
                <li><strong>Confundir diâmetro com raio:</strong> Se D=6m, então r=3m. Erro aqui multiplica volume por 8!</li>
                <li><strong>Esquecer o fator 1/3:</strong> Pirâmide e cone sempre têm 1/3. Prisma e cilindro não.</li>
                <li><strong>Misturar geratriz com altura:</strong> Geratriz é o "lado" do cone/pirâmide. Use Pitágoras: g² = h² + r²</li>
                <li><strong>Não reconhecer sólidos compostos:</strong> Leia "silo", "tanque", "estrutura em forma de..." e pense em decomposição.</li>
                <li><strong>Esquecer que faces internas não contam:</strong> Em um sólido composto, onde dois sólidos se tocam, não há área lateral.</li>
              </ul>
            </AlertBox>

            <AlertBox tipo="success" titulo="Mapa Mental — Organize as Fórmulas Hierarquicamente">
              <div className="space-y-3 text-sm mt-3">
                <p><strong>Nível 1 (Conceitos)</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Poliedro: sólido com faces planas</li>
                  <li>Sólido de revolução: formado por rotação</li>
                  <li>Sólido composto: combinação de dois ou mais</li>
                </ul>
                <p className="mt-2"><strong>Nível 2 (Famílias de Sólidos)</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Prismas: V = A_base × h</li>
                  <li>Pirâmides: V = (1/3) × A_base × h (tem 1/3!)</li>
                  <li>Cilindros: V = πr²h</li>
                  <li>Cones: V = (1/3)πr²h (também tem 1/3!)</li>
                  <li>Esferas: V = (4/3)πr³ (tem 4/3!)</li>
                </ul>
                <p className="mt-2"><strong>Nível 3 (Variações Específicas)</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Paralelepípedo (prisma retangular): V = a × b × c</li>
                  <li>Cubo (caso especial): V = a³</li>
                  <li>Tronco de cone: V = (πh/3)(R²+Rr+r²)</li>
                </ul>
              </div>
            </AlertBox>

            <ContentAccordion
              items={[
                {
                  titulo: "Exercício Resolvido 1 — Prisma Pentagonal",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4 text-sm">
                      <p><strong>Enunciado:</strong> Um prisma pentagonal regular tem aresta da base 4 cm e altura 10 cm. Calcule o volume.</p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                        <p className="font-semibold mb-2">Resolução:</p>
                        <p>1. Área da base pentagonal regular = (a² × √(25 + 10√5)) / 4</p>
                        <p>2. Para a = 4: A_base ≈ 27,5 cm²</p>
                        <p>3. Volume = A_base × h = 27,5 × 10 = <strong>275 cm³</strong></p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exercício Resolvido 2 — Esfera Inscrita em Cubo",
                  icone: "⚽",
                  conteudo: (
                    <div className="space-y-4 text-sm">
                      <p><strong>Enunciado:</strong> Uma esfera está inscrita em um cubo de aresta 6 m. Qual é o volume da esfera?</p>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                        <p className="font-semibold mb-2">Resolução:</p>
                        <p>1. Se a esfera está inscrita no cubo, o diâmetro = aresta do cubo = 6 m</p>
                        <p>2. Raio da esfera = d/2 = 3 m</p>
                        <p>3. V = (4/3)π(3)³ = (4/3)π × 27 = 36π ≈ <strong>113,1 m³</strong></p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dica: Reconhecer Sólidos por Descrição",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-3 text-sm">
                      <p><strong>Cilindro:</strong> "lata", "tubo", "coluna", "pote", "balde"</p>
                      <p><strong>Cone:</strong> "funil", "chapéu de festa", "silo", "pirâmide redonda"</p>
                      <p><strong>Esfera:</strong> "bola", "globo", "tanque esférico", "reservatório esférico"</p>
                      <p><strong>Prisma:</strong> "caixa", "bloco", "estrutura prismática", "paralelepípedo"</p>
                      <p><strong>Pirâmide:</strong> "pirâmide egípcia", "topo de estrutura", "ponta"</p>
                      <p><strong>Tronco:</strong> "balde troncocônico", "tanque troncocônico", "copo"</p>
                    </div>
                  ),
                },
              ]}
            />

            <AlertBox tipo="info" titulo="Ferramentas de Auxílio">
              <ul className="list-disc list-inside space-y-1 text-sm mt-2">
                <li><strong>GeoGebra 3D:</strong> Software gratuito para visualizar sólidos (www.geogebra.org)</li>
                <li><strong>Calculadora Científica:</strong> Use para π (3,14159...) com precisão</li>
                <li><strong>Papel e Lápis:</strong> Sempre desenhe, mesmo que aproximado</li>
                <li><strong>Tabelas de Fórmulas:</strong> Mantenha à mão durante o estudo</li>
              </ul>
            </AlertBox>

            <AlertBox tipo="success" titulo="Passo-a-Passo para Resolver Qualquer Problema 3D">
              <div className="space-y-2 text-sm mt-3">
                <p><strong>1. Leia 2 vezes:</strong> Entenda o cenário (indústria, contexto) e os dados.</p>
                <p><strong>2. Desenhe:</strong> Faça um esboço, marque dimensões (r, h, a, etc)</p>
                <p><strong>3. Identifique o sólido:</strong> Cilindro? Cone? Esfera? Composto?</p>
                <p><strong>4. Busque a fórmula:</strong> Revise a tabela de referência.</p>
                <p><strong>5. Substitua valores:</strong> Cuidado com unidades (m vs cm) e conversões.</p>
                <p><strong>6. Calcule:</strong> Use π = 3,14 ou 22/7 (aproximações comuns).</p>
                <p><strong>7. Verifique a resposta:</strong> Faz sentido? Tamanho esperado? Unidade correta?</p>
              </div>
            </AlertBox>

            <AlertBox tipo="warning" titulo="Armadilhas Comuns — O Que NÃO Fazer">
              <div className="space-y-2 text-sm mt-3">
                <p>❌ <strong>Confundir fórmulas:</strong> Não misture volume de cone com cilindro.</p>
                <p>❌ <strong>Esquecer π:</strong> Sempre inclua π nas respostas finais (não use 3,14 antes do fim).</p>
                <p>❌ <strong>Unidades inconsistentes:</strong> Se r=2cm e h=5m, converta primeiro!</p>
                <p>❌ <strong>Confundir diâmetro/raio:</strong> O erro mais custoso! Releia o enunciado.</p>
                <p>❌ <strong>Fazer contas de cabeça:</strong> Use papel para toda conta, mesmo simples.</p>
                <p>❌ <strong>Ignorar desenhos:</strong> Desenhos dão pistas sobre o sólido.</p>
              </div>
            </AlertBox>

            <ContentAccordion
              items={[
                {
                  titulo: "Aproximações Práticas para π",
                  icone: "🧮",
                  conteudo: (
                    <div className="space-y-3 text-sm">
                      <p><strong>π ≈ 3,14159265...</strong> (valor completo)</p>
                      <p><strong>π ≈ 3,14</strong> (uso geral em prova)</p>
                      <p><strong>π ≈ 22/7</strong> (fração útil quando não tem calculadora)</p>
                      <p><strong>π² ≈ 10</strong> (para cálculos rápidos)</p>
                      <p className="font-semibold mt-3">Dica CESGRANRIO:</p>
                      <p>Se a resposta pedir π (não aproximado), deixe assim: "V = 36π m³". Se pedir valor numérico, use π ≈ 3,14.</p>
                    </div>
                  ),
                },
                {
                  titulo: "Exercício Extra 7 — Esfera Cortada (Calota Esférica)",
                  icone: "🎪",
                  conteudo: (
                    <div className="space-y-4 text-sm">
                      <p><strong>Conceito:</strong> Uma esfera cortada por um plano deixa uma "calota esférica".</p>
                      <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                        <p className="font-semibold mb-2">Fórmula de Calota Esférica:</p>
                        <p className="font-mono text-xs">V_calota = (πh²/3) × (3R - h)</p>
                        <p className="text-xs text-muted-foreground mt-1">onde h = altura da calota, R = raio da esfera</p>
                      </div>
                      <p><strong>Exemplo:</strong> Uma esfera de raio 5 m é cortada a uma altura de 2 m do topo. Volume da calota?</p>
                      <p className="font-mono text-xs bg-slate-900 text-white p-2 rounded">V = (π × 2² / 3) × (3 × 5 - 2) = (4π/3) × 13 = 52π/3 ≈ 54,45 m³</p>
                    </div>
                  ),
                },
                {
                  titulo: "Exercício Extra 8 — Cone Reto vs Cone Oblíquo",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4 text-sm">
                      <p><strong>Cone Reto:</strong> O eixo é perpendicular à base. A altura h é a distância do vértice ao centro da base.</p>
                      <p><strong>Cone Oblíquo:</strong> O eixo é inclinado. A altura ainda é medida perpendicularmente à base.</p>
                      <p className="font-semibold">Importante:</p>
                      <p>Em ambos os casos, a fórmula de volume é a mesma: V = (1/3)πr²h</p>
                      <p>A diferença está na posição do vértice, mas o cálculo de volume ignora isso!</p>
                    </div>
                  ),
                },
                {
                  titulo: "Técnica de Cálculo: Multiplicação por π no Final",
                  icone: "⚡",
                  conteudo: (
                    <div className="space-y-3 text-sm">
                      <p><strong>Errado:</strong> V = 3,14 × 5² × 8 = 3,14 × 25 × 8 = ... (muitos decimais)</p>
                      <p><strong>Certo:</strong> V = π × 5² × 8 = π × 200 = 200π ≈ 628 m³</p>
                      <p className="mt-3">Deixe π como símbolo até o final. Isso evita erros de arredondamento e deixa o cálculo mais limpo.</p>
                    </div>
                  ),
                },
              ]}
            />

            <ContentAccordion
              items={[
                {
                  titulo: "Sequência de Aprendizado Recomendada",
                  icone: "🚀",
                  conteudo: (
                    <div className="space-y-3 text-sm">
                      <p><strong>Dia 1-2:</strong> Estude Módulo 1 (Poliedros e Euler) e pratique com exemplos simples.</p>
                      <p><strong>Dia 3-4:</strong> Módulos 2 (Prismas) e 3 (Pirâmides). Faça comparações entre volume de prisma vs pirâmide.</p>
                      <p><strong>Dia 5-6:</strong> Módulos 4 (Cilindro) e 5 (Cone). Use objetos reais (lata, funil) para visualizar.</p>
                      <p><strong>Dia 7:</strong> Módulo 6 (Esfera) e 7 (Troncos). Estes são mais complexos; não tenha pressa.</p>
                      <p><strong>Dia 8:</strong> Módulo 8 (Sólidos Compostos). Pratique decomposição com vários exemplos.</p>
                      <p><strong>Dia 9:</strong> Módulo 9 (Aplicações Petrobras). Leia questões reais da banca.</p>
                      <p><strong>Dia 10:</strong> Módulo 10 (Simulado). Faça testes de simulação CESGRANRIO.</p>
                    </div>
                  ),
                },
                {
                  titulo: "Exercício Extra 3 — Tronco de Pirâmide",
                  icone: "🔻",
                  conteudo: (
                    <div className="space-y-4 text-sm">
                      <p><strong>Enunciado:</strong> Um tronco de pirâmide quadrangular tem base maior de 8 m, base menor de 4 m e altura 3 m. Calcule o volume.</p>
                      <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                        <p className="font-semibold mb-2">Resolução:</p>
                        <p>1. Fórmula: V = (h/3) × (A₁ + A₂ + √(A₁ × A₂))</p>
                        <p>2. A₁ (base maior) = 8² = 64 m²</p>
                        <p>3. A₂ (base menor) = 4² = 16 m²</p>
                        <p>4. √(64 × 16) = √1024 = 32 m²</p>
                        <p>5. V = (3/3) × (64 + 16 + 32) = 1 × 112 = <strong>112 m³</strong></p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exercício Extra 4 — Cilindro dentro de Cilindro",
                  icone: "🔄",
                  conteudo: (
                    <div className="space-y-4 text-sm">
                      <p><strong>Enunciado:</strong> Um cilindro oco tem raio externo R = 5 m e raio interno r = 3 m, com altura h = 8 m. Qual é o volume do material?</p>
                      <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
                        <p className="font-semibold mb-2">Resolução:</p>
                        <p>1. Volume do cilindro externo: V₁ = π × 5² × 8 = 200π m³</p>
                        <p>2. Volume do cilindro interno (vazio): V₂ = π × 3² × 8 = 72π m³</p>
                        <p>3. Volume do material: V = V₁ - V₂ = 200π - 72π = 128π ≈ <strong>402,1 m³</strong></p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dica Final — Leitura de Desenhos e Projeções",
                  icone: "🎨",
                  conteudo: (
                    <div className="space-y-3 text-sm">
                      <p><strong>Projeção Ortogonal:</strong> Quando a questão mostra um desenho 2D de um sólido 3D, sempre identifique:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>A visão frontal (o que você vê de frente)</li>
                        <li>A visão lateral (o que você vê de lado)</li>
                        <li>A visão superior (o que você vê de cima)</li>
                      </ul>
                      <p className="mt-3"><strong>Exemplo:</strong> Um cilindro em vista frontal é um retângulo, em vista superior é um círculo.</p>
                    </div>
                  ),
                },
                {
                  titulo: "Transformações Geométricas — Escala e Proporção",
                  icone: "📏",
                  conteudo: (
                    <div className="space-y-4 text-sm">
                      <p><strong>Se um sólido sofre uma transformação de escala (k):</strong></p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                          <p className="font-bold text-blue-400 text-xs mb-1">Comprimentos</p>
                          <p className="font-mono">Aumentam por k</p>
                        </div>
                        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
                          <p className="font-bold text-cyan-400 text-xs mb-1">Áreas</p>
                          <p className="font-mono">Aumentam por k²</p>
                        </div>
                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                          <p className="font-bold text-emerald-400 text-xs mb-1">Volumes</p>
                          <p className="font-mono">Aumentam por k³</p>
                        </div>
                      </div>
                      <p className="mt-3"><strong>Exemplo prático:</strong> Se uma esfera tem raio 2 m e outra tem raio 6 m:</p>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Razão de raios: k = 6/2 = 3</li>
                        <li>Razão de áreas: 3² = 9</li>
                        <li>Razão de volumes: 3³ = 27</li>
                      </ul>
                    </div>
                  ),
                },
                {
                  titulo: "Estratégia de Estimativa Rápida",
                  icone: "⚡",
                  conteudo: (
                    <div className="space-y-3 text-sm">
                      <p><strong>Quando calcular π × r²:</strong></p>
                      <p className="font-mono text-xs">πr² ≈ 3r² (aproximação rápida)</p>
                      <p>Exemplo: πr² para r=5 → 3×25 = 75 (real: 78,5)</p>
                      <p className="mt-3"><strong>Para volume de cilindro rápido:</strong></p>
                      <p className="font-mono text-xs">V = πr²h ≈ 3r²h</p>
                      <p>Para r=2, h=10 → V ≈ 3×4×10 = 120 m³ (real: 125,6)</p>
                      <p className="mt-3"><strong>Aviso:</strong> Use apenas para verificação rápida! Sempre faça contas precisas.</p>
                    </div>
                  ),
                },
                {
                  titulo: "Problema Histórico — A Esfera de Arquimedes",
                  icone: "🏛️",
                  conteudo: (
                    <div className="space-y-3 text-sm">
                      <p>Arquimedes descobriu que uma esfera inscrita em um cilindro tem:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li><strong>Altura do cilindro = Diâmetro da esfera</strong></li>
                        <li><strong>Raio do cilindro = Raio da esfera</strong></li>
                        <li><strong>V_esfera = (2/3) × V_cilindro</strong></li>
                      </ul>
                      <p className="mt-2 text-xs text-muted-foreground">Este é um dos resultados mais belos da geometria clássica e prova por que o volume da esfera é (4/3)πr³!</p>
                    </div>
                  ),
                },
              ]}
            />

            <AlertBox tipo="success" titulo="Checklist Final — Antes de Fazer a Prova">
              <div className="space-y-2 text-sm mt-3">
                <p>☐ Memorizei a Relação de Euler (V - A + F = 2)</p>
                <p>☐ Sei diferenciar prisma, pirâmide, cilindro, cone e esfera</p>
                <p>☐ Reconheço quando usar fator 1/3 e quando não usar</p>
                <p>☐ Domino conversão de unidades (m³ → L, cm³ → mL)</p>
                <p>☐ Consigo usar Pitágoras para achar geratriz e altura</p>
                <p>☐ Sei decompor sólidos compostos corretamente</p>
                <p>☐ Entendo diferença entre diâmetro e raio</p>
                <p>☐ Pratiquei 10+ questões de sólidos compostos</p>
                <p>☐ Revisei aplicações Petrobras (tanques, tubulações)</p>
                <p>☐ Resolvi o simulado completo com 80%+ de acerto</p>
              </div>
            </AlertBox>

            <ContentAccordion
              items={[
                {
                  titulo: "Exercício Bônus 1 — Paralelepípedo Irregular",
                  icone: "📦",
                  conteudo: (
                    <div className="space-y-4 text-sm">
                      <p><strong>Enunciado:</strong> Um paralelepípedo tem dimensões 3 m × 4 m × 5 m. Qual é o comprimento da diagonal espacial?</p>
                      <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                        <p className="font-semibold mb-2">Resolução:</p>
                        <p>Diagonal espacial: d = √(a² + b² + c²)</p>
                        <p>d = √(3² + 4² + 5²) = √(9 + 16 + 25) = √50 = 5√2 ≈ <strong>7,07 m</strong></p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exercício Bônus 2 — Pirâmide Regular",
                  icone: "🔺",
                  conteudo: (
                    <div className="space-y-4 text-sm">
                      <p><strong>Enunciado:</strong> Uma pirâmide regular tem base quadrada de lado 6 m e altura 8 m. Qual é o comprimento da apótema lateral?</p>
                      <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
                        <p className="font-semibold mb-2">Resolução:</p>
                        <p>1. Apótema da base (distância do centro ao meio do lado) = 6/2 = 3 m</p>
                        <p>2. Apótema lateral: a_l² = h² + a_b² = 8² + 3² = 64 + 9 = 73</p>
                        <p>3. a_l = √73 ≈ <strong>8,54 m</strong></p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exercício Bônus 3 — Velocidade de Preenchimento",
                  icone: "⏱️",
                  conteudo: (
                    <div className="space-y-4 text-sm">
                      <p><strong>Enunciado:</strong> Um tanque cilíndrico de raio 2 m e altura 5 m é preenchido com óleo a uma taxa de 10 m³/hora. Quanto tempo leva para encher?</p>
                      <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-4">
                        <p className="font-semibold mb-2">Resolução:</p>
                        <p>1. Volume do tanque: V = πr²h = π × 4 × 5 = 20π ≈ 62,83 m³</p>
                        <p>2. Tempo = Volume / Taxa = 62,83 / 10 ≈ <strong>6,28 horas (ou 6h 17 min)</strong></p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Desafio Final — Sólido Composto Complexo",
                  icone: "🏆",
                  conteudo: (
                    <div className="space-y-4 text-sm">
                      <p><strong>Enunciado Desafiador:</strong> Um monumento consiste em uma pirâmide de base quadrada (lado 10 m, altura 8 m) sobre um cubo (aresta 10 m) que repousa sobre uma semiesfera (raio 5 m). Qual é o volume total?</p>
                      <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl p-4">
                        <p className="font-semibold mb-2">Resolução Passo a Passo:</p>
                        <p>1. V_pirâmide = (1/3) × 10² × 8 = (1/3) × 100 × 8 = 800/3 ≈ 266,67 m³</p>
                        <p>2. V_cubo = 10³ = 1000 m³</p>
                        <p>3. V_semiesfera = (1/2) × (4/3)π × 5³ = (2/3)π × 125 ≈ 261,80 m³</p>
                        <p>4. V_total = 266,67 + 1000 + 261,80 ≈ <strong>1528,47 m³</strong></p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <ContentAccordion
              items={[
                {
                  titulo: "Tabela Rápida de Referência — Todas as Fórmulas",
                  icone: "📋",
                  conteudo: (
                    <div className="space-y-4 text-xs overflow-auto">
                      <div className="bg-slate-900 text-white p-4 rounded-lg font-mono">
                        <p className="font-bold mb-3">SÓLIDOS E FÓRMULAS</p>
                        <div className="space-y-2">
                          <p><span className="text-blue-400">Cubo:</span> V = a³, A = 6a²</p>
                          <p><span className="text-cyan-400">Prisma:</span> V = A_base × h, A_lateral = perímetro_base × h</p>
                          <p><span className="text-emerald-400">Pirâmide:</span> V = (1/3) × A_base × h, A_lateral = (perímetro × apótema) / 2</p>
                          <p><span className="text-yellow-400">Cilindro:</span> V = πr²h, A_lateral = 2πrh, A_total = 2πr(h+r)</p>
                          <p><span className="text-orange-400">Cone:</span> V = (1/3)πr²h, A_lateral = πrg, A_total = πr(r+g)</p>
                          <p><span className="text-pink-400">Esfera:</span> V = (4/3)πr³, A = 4πr²</p>
                          <p><span className="text-indigo-400">Tronco Cone:</span> V = (πh/3)(R²+Rr+r²), A_lateral = πg(R+r)</p>
                          <p><span className="text-rose-400">Euler:</span> V - A + F = 2</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exercício Extra 5 — Cone Inscrito em Cilindro",
                  icone: "🎭",
                  conteudo: (
                    <div className="space-y-4 text-sm">
                      <p><strong>Enunciado:</strong> Um cone está inscrito em um cilindro de raio 4 m e altura 6 m (o cone tem a mesma base e altura do cilindro). Qual é o volume do espaço vazio entre o cilindro e o cone?</p>
                      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                        <p className="font-semibold mb-2">Resolução:</p>
                        <p>1. Volume do cilindro: V_cil = π × 4² × 6 = 96π m³</p>
                        <p>2. Volume do cone: V_cone = (1/3) × π × 4² × 6 = 32π m³</p>
                        <p>3. Volume do espaço vazio: V_vazio = 96π - 32π = 64π ≈ <strong>201,1 m³</strong></p>
                        <p className="text-xs text-muted-foreground mt-2">Observe que o cilindro sempre tem 3 vezes o volume do cone inscrito!</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exercício Extra 6 — Tanque Petrobras Composto",
                  icone: "🛢️",
                  conteudo: (
                    <div className="space-y-4 text-sm">
                      <p><strong>Enunciado:</strong> Um tanque de armazenamento Petrobras consiste em um cilindro central de raio 6 m e altura 10 m, coroado por uma semiesfera no topo. Qual é o volume total em litros?</p>
                      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                        <p className="font-semibold mb-2">Resolução:</p>
                        <p>1. Volume do cilindro: V_cil = π × 6² × 10 = 360π m³</p>
                        <p>2. Volume da semiesfera: V_semi = (1/2) × (4/3)π × 6³ = (2/3)π × 216 = 144π m³</p>
                        <p>3. Volume total: V = 360π + 144π = 504π m³ ≈ 1583,36 m³</p>
                        <p>4. Conversão para litros: 1583,36 m³ × 1000 = <strong>1.583.360 litros</strong></p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Estratégia Avançada — Problemas com Proporção",
                  icone: "⚡",
                  conteudo: (
                    <div className="space-y-3 text-sm">
                      <p><strong>Situação:</strong> Você tem dois sólidos semelhantes com razão de semelhança k.</p>
                      <ul className="list-disc list-inside space-y-2">
                        <li><strong>Razão linear:</strong> k (lados, altura, raio)</li>
                        <li><strong>Razão de área:</strong> k² (áreas de superfície)</li>
                        <li><strong>Razão de volume:</strong> k³ (volumes)</li>
                      </ul>
                      <p className="mt-3"><strong>Exemplo prático:</strong> Se um cilindro A tem raio 2m e cilindro B tem raio 4m (k=2), então:</p>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Razão de altura: 2</li>
                        <li>Razão de área lateral: 4 (= 2²)</li>
                        <li>Razão de volume: 8 (= 2³)</li>
                      </ul>
                    </div>
                  ),
                },
                {
                  titulo: "Questão-Tipo CESGRANRIO 1",
                  icone: "📝",
                  conteudo: (
                    <div className="space-y-4 text-sm">
                      <p><strong>"Uma plataforma offshore tem um tanque esférico para armazenamento de óleo com diâmetro de 12 metros. Qual é a capacidade aproximada em milhares de litros?"</strong></p>
                      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                        <p className="font-semibold mb-2">Resolução CESGRANRIO:</p>
                        <p>1. Diâmetro = 12 m → Raio = 6 m</p>
                        <p>2. V = (4/3)π(6)³ = (4/3)π × 216 = 288π m³</p>
                        <p>3. V ≈ 904,78 m³ ≈ 904.780 litros ≈ <strong>904,78 mil litros (ou 904,78 × 10³ L)</strong></p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Questão-Tipo CESGRANRIO 2",
                  icone: "📝",
                  conteudo: (
                    <div className="space-y-4 text-sm">
                      <p><strong>"Um silo agrícola tem forma de cilindro com cone no topo. O cilindro tem 4m de raio e 8m de altura. O cone tem 4m de raio e 3m de altura. Qual é o volume total?"</strong></p>
                      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                        <p className="font-semibold mb-2">Resolução CESGRANRIO:</p>
                        <p>1. V_cilindro = π × 4² × 8 = 128π m³</p>
                        <p>2. V_cone = (1/3)π × 4² × 3 = 16π m³</p>
                        <p>3. V_total = 128π + 16π = 144π ≈ <strong>452,39 m³</strong></p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Questão-Tipo CESGRANRIO 3",
                  icone: "📝",
                  conteudo: (
                    <div className="space-y-4 text-sm">
                      <p><strong>"Uma tubulação cilíndrica de óleo tem raio interno 0,5 m e comprimento 200 m. Se a densidade do óleo é 0,8 kg/L, qual é a massa total de óleo que pode ser armazenada?"</strong></p>
                      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                        <p className="font-semibold mb-2">Resolução CESGRANRIO:</p>
                        <p>1. V = πr²h = π × (0,5)² × 200 = π × 0,25 × 200 = 50π m³</p>
                        <p>2. V ≈ 157 m³ = 157.000 L</p>
                        <p>3. Massa = 157.000 L × 0,8 kg/L = <strong>125.600 kg = 125,6 toneladas</strong></p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Questão-Tipo CESGRANRIO 4",
                  icone: "📝",
                  conteudo: (
                    <div className="space-y-4 text-sm">
                      <p><strong>"Dois cilindros A e B têm a mesma altura (10 m). O cilindro A tem raio 2 m, e o cilindro B tem raio 4 m. Qual é a razão entre seus volumes?"</strong></p>
                      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                        <p className="font-semibold mb-2">Resolução CESGRANRIO:</p>
                        <p>1. V_A = π × 2² × 10 = 40π m³</p>
                        <p>2. V_B = π × 4² × 10 = 160π m³</p>
                        <p>3. V_A / V_B = 40π / 160π = 40/160 = 1/4</p>
                        <p className="mt-2 text-xs text-muted-foreground">Razão de raios: 2:4 = 1:2 → Razão de volumes: 1²:2² = 1:4</p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <AlertBox tipo="info" titulo="Resumo Executivo — Antes de Começar o Simulado">
              <div className="space-y-3 text-sm mt-3">
                <p><strong>Domínios Críticos (memorize):</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Fator 1/3 em pirâmide e cone</li>
                  <li>Esfera: V = (4/3)πr³ (a mais complexa!)</li>
                  <li>Euler: V - A + F = 2</li>
                  <li>Conversão: 1 m³ = 1000 L</li>
                </ul>
                <p className="mt-3"><strong>Leia sempre:</strong> Diâmetro ou raio? Altura ou geratriz? Base maior ou menor?</p>
                <p><strong>Desenhe sempre:</strong> Mesmo um esboço rápido evita erros.</p>
                <p><strong>Verifique o resultado:</strong> Faz sentido? Unidade correta? Ordem de magnitude esperada?</p>
              </div>
            </AlertBox>

            <AlertBox tipo="info" titulo="Aprofundamento — Cálculo de Superfícies Laterais">
              <div className="space-y-3 text-sm mt-3">
                <p><strong>Área Lateral vs Área Total:</strong> Distinção importante!</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Área Lateral:</strong> Apenas as faces "em volta" (sem bases)</li>
                  <li><strong>Área Total:</strong> Área lateral + área das bases</li>
                </ul>
                <p className="mt-2"><strong>Fórmulas de Área Lateral:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Cilindro: A_lateral = 2πrh</li>
                  <li>Cone: A_lateral = πrg (use geratriz, não altura!)</li>
                  <li>Prisma: A_lateral = perímetro_base × altura</li>
                </ul>
              </div>
            </AlertBox>

            <AlertBox tipo="success" titulo="Dicas Finais para Prova — Estratégia Mental">
              <div className="space-y-3 text-sm mt-3">
                <p><strong>5 minutos antes de começar:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Respire fundo. Você estudou!</li>
                  <li>Revise mentalmente: Euler (V-A+F=2), fator 1/3, πr²</li>
                  <li>Tenha papel e lápis prontos</li>
                </ul>
                <p className="mt-3"><strong>Ao ler cada questão:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Leia 2 vezes, lentamente</li>
                  <li>Identifique o sólido (cone? cilindro? composto?)</li>
                  <li>Marque dados: r, h, a, D, etc</li>
                  <li>Escolha a fórmula certa</li>
                </ul>
                <p className="mt-3"><strong>Após resolver:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Verifique unidades (cm³, m³, L?)</li>
                  <li>Estime: é razoável esse número?</li>
                  <li>Se sobrar tempo, revise 2-3 questões</li>
                </ul>
              </div>
            </AlertBox>

            <ContentAccordion
              items={[
                {
                  titulo: "Glossário — Termos Essenciais de Geometria Espacial",
                  icone: "📖",
                  conteudo: (
                    <div className="space-y-2 text-sm">
                      <p><strong>Arestas:</strong> Segmentos de reta onde duas faces se encontram.</p>
                      <p><strong>Apótema:</strong> Altura de um triângulo lateral de uma pirâmide ou cone.</p>
                      <p><strong>Base:</strong> Face sobre a qual repousa o sólido (prisma, pirâmide, cilindro, cone).</p>
                      <p><strong>Casca esférica:</strong> Região entre duas esferas concêntricas.</p>
                      <p><strong>Cilindro:</strong> Sólido com duas bases circulares paralelas e congruentes.</p>
                      <p><strong>Cone:</strong> Sólido com base circular e vértice único acima.</p>
                      <p><strong>Cone oblíquo:</strong> Cone cujo eixo não é perpendicular à base.</p>
                      <p><strong>Cone reto:</strong> Cone cujo eixo é perpendicular à base.</p>
                      <p><strong>Esfera:</strong> Sólido onde todos os pontos estão a uma mesma distância (raio) do centro.</p>
                      <p><strong>Faces:</strong> Superfícies planas que formam o poliedro.</p>
                      <p><strong>Geratriz:</strong> Linha que, ao girar, forma a superfície lateral de um sólido de revolução.</p>
                      <p><strong>Hemisfério:</strong> Metade de uma esfera dividida por um plano diametral.</p>
                      <p><strong>Poliedro:</strong> Sólido geométrico limitado por faces planas poligonais.</p>
                      <p><strong>Prisma:</strong> Poliedro com duas bases paralelas e congruentes, e faces laterais retangulares.</p>
                      <p><strong>Pirâmide:</strong> Poliedro com uma base poligonal e faces laterais triangulares.</p>
                      <p><strong>Tronco:</strong> Sólido resultante de cortar um cone ou pirâmide por um plano paralelo à base.</p>
                      <p><strong>Vértices:</strong> Pontos onde três ou mais arestas se encontram.</p>
                    </div>
                  ),
                },
                {
                  titulo: "Verificação Final — Checklist de Cálculo",
                  icone: "✅",
                  conteudo: (
                    <div className="space-y-2 text-sm">
                      <p>☐ Li o enunciado 2 vezes e entendi a situação</p>
                      <p>☐ Identifiquei corretamente o sólido</p>
                      <p>☐ Extraí todos os dados (r, h, a, D, etc)</p>
                      <p>☐ Verifiquei se todas as unidades são iguais (tudo em m, ou tudo em cm)</p>
                      <p>☐ Escolhi a fórmula correta</p>
                      <p>☐ Substitui os valores na fórmula</p>
                      <p>☐ Fiz todas as contas com cuidado</p>
                      <p>☐ Deixei π como símbolo até o final (não aproximei cedo)</p>
                      <p>☐ Apliquei aproximação final (se necessário)</p>
                      <p>☐ Verifiquei a unidade da resposta</p>
                      <p>☐ Comparei com a resposta: é razoável?</p>
                    </div>
                  ),
                },
                {
                  titulo: "Comparação de Volumes — Qual Sólido Armazena Mais?",
                  icone: "⚖️",
                  conteudo: (
                    <div className="space-y-4 text-sm">
                      <p><strong>Situação comum:</strong> Preciso armazenar óleo. Qual sólido é mais eficiente?</p>
                      <p>Suponha que todos têm altura h = 6 m e raio/lado = 3 m:</p>
                      <div className="space-y-2 font-mono text-xs bg-slate-900 text-white p-3 rounded">
                        <p>Cilindro: V = π × 3² × 6 = 54π ≈ <span className="text-emerald-400">169,65 m³</span></p>
                        <p>Cone: V = (1/3)π × 3² × 6 = 18π ≈ <span className="text-blue-400">56,55 m³</span></p>
                        <p>Cubo: V = 3 × 3 × 6 = <span className="text-yellow-400">54 m³</span></p>
                        <p>Esfera (r=3): V = (4/3)π × 3³ ≈ <span className="text-pink-400">113,1 m³</span></p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2"><strong>Conclusão:</strong> Cilindro armazena mais que esfera, que armazena mais que cubo, que armazena mais que cone.</p>
                    </div>
                  ),
                },
                {
                  titulo: "Integrais Simples — Geometria Analítica 3D (Extra)",
                  icone: "∫",
                  conteudo: (
                    <div className="space-y-3 text-sm">
                      <p><strong>Conhecimento Avançado (não é essencial para CESGRANRIO):</strong></p>
                      <p>O volume de um sólido pode ser calculado por integração:</p>
                      <p className="font-mono text-xs bg-slate-700 text-white p-2 rounded">V = ∫∫∫ dxdydz</p>
                      <p>Para um cilindro com raio R e altura H:</p>
                      <p className="font-mono text-xs bg-slate-700 text-white p-2 rounded">V = ∫₀ᴴ πR² dh = πR²H</p>
                      <p className="text-xs text-muted-foreground">Este é o fundamento matemático das fórmulas que você usa!</p>
                    </div>
                  ),
                },
                {
                  titulo: "Casos-Limite — O Que Acontece em Extremos?",
                  icone: "📊",
                  conteudo: (
                    <div className="space-y-3 text-sm">
                      <p><strong>Se a altura de um cone → 0:</strong> Cone vira um disco (área = πr², volume → 0)</p>
                      <p><strong>Se o raio de uma esfera → 0:</strong> Esfera vira um ponto (volume → 0)</p>
                      <p><strong>Se um cilindro tem h = 0:</strong> Vira um disco circular (volume = 0)</p>
                      <p><strong>Se um prisma tem uma dimensão tendendo ao infinito:</strong> Volume → infinito</p>
                      <p className="text-xs text-muted-foreground mt-2">Pensar em casos-limite ajuda a verificar se suas fórmulas fazem sentido!</p>
                    </div>
                  ),
                },
              ]}
            />
          </section>
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
