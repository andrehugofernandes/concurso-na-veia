import { getAllModuleVariants } from "@/lib/moduleColors";
"use client";
import { useAulaProgress } from "@/hooks/useAulaProgress";

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
  QuestaoResolvidaStepByStep} from "../shared";
import {
  QUIZ_M1_POLIGONOS,
  QUIZ_M2_TRIANGULOS,
  QUIZ_M3_AREA_TRIANGULO,
  QUIZ_M4_QUADRILATEROS,
  QUIZ_M5_CIRCULO,
  QUIZ_M6_SEMELHANCA,
  QUIZ_M7_PITAGORAS,
  QUIZ_M8_RAZAO_AREAS,
  QUIZ_M9_APLICACOES,
  QUIZ_M10_SIMULADO,
} from "./data/geometria-plana-quizzes";

const mv = [undefined, ...getAllModuleVariants()];

export default function AulaGeometriaPlana({
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
  const { completedModules: completedModulesList, updateCompletedModules } = useAulaProgress();
  const completedModules = new Set(completedModulesList);

  const [quizM1] = useState(() => getRandomQuestions(QUIZ_M1_POLIGONOS, 6));
  const [quizM2] = useState(() => getRandomQuestions(QUIZ_M2_TRIANGULOS, 6));
  const [quizM3] = useState(() => getRandomQuestions(QUIZ_M3_AREA_TRIANGULO, 6));
  const [quizM4] = useState(() => getRandomQuestions(QUIZ_M4_QUADRILATEROS, 6));
  const [quizM5] = useState(() => getRandomQuestions(QUIZ_M5_CIRCULO, 6));
  const [quizM6] = useState(() => getRandomQuestions(QUIZ_M6_SEMELHANCA, 6));
  const [quizM7] = useState(() => getRandomQuestions(QUIZ_M7_PITAGORAS, 6));
  const [quizM8] = useState(() => getRandomQuestions(QUIZ_M8_RAZAO_AREAS, 6));
  const [quizM9] = useState(() => getRandomQuestions(QUIZ_M9_APLICACOES, 6));
  const [quizM10] = useState(() => getRandomQuestions(QUIZ_M10_SIMULADO, 6));

  const isModuleUnlocked = (_index: number) => true; // ✅ TODOS OS MÓDULOS DESBLOQUEADOS

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) {
      const nextCompleted = new Set(completedModules);
      nextCompleted.add(moduleId);
      updateCompletedModules(Array.from(nextCompleted));
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
      updateCompletedModules(Array.from(s));
    }
  }, [currentProgress]);

  const MODULE_DEFS = [
    { id: "modulo-1", label: "Módulo 1", titulo: "Polígonos" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Triângulos" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Área do Triângulo" },
    { id: "modulo-4", label: "Módulo 4", titulo: "Quadriláteros" },
    { id: "modulo-5", label: "Módulo 5", titulo: "Círculo e Circunferência" },
    { id: "modulo-6", label: "Módulo 6", titulo: "Semelhança" },
    { id: "modulo-7", label: "Módulo 7", titulo: "Teorema de Pitágoras" },
    { id: "modulo-8", label: "Módulo 8", titulo: "Razão de Semelhança" },
    { id: "modulo-9", label: "Módulo 9", titulo: "Aplicações Industriais" },
    { id: "modulo-10", label: "Módulo 10", titulo: "Simulado Final" },
  ];

    


  return (
    <AulaTemplate
      canComplete={completedModules.size >= MODULE_DEFS.length}
      lockMessage="Você precisa responder a todos os quizzes desta aula para finalizá-la."
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
      {/* MÓDULO 1: POLÍGONOS — CLASSIFICAÇÃO E PROPRIEDADES               */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner numero={1}
          titulo="Polígonos: Classificação e Propriedades"
          descricao="Domine a classificação de polígonos, soma dos ângulos internos e externos — fundamentos que a CESGRANRIO cobra todo concurso."
           variant="blue"/>
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="O que é um Polígono?"
              description="Definição, nomenclatura e propriedades angulares dos polígonos convexos."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Definição e Classificação"
              icone="📐"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Definição de Polígono",
                  icone: "🔷",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Um <strong>polígono</strong> é uma figura plana fechada formada por segmentos de reta (lados). Cada ponto de encontro entre dois lados é chamado de <strong>vértice</strong>.
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-xl font-bold text-blue-400 text-foreground/85 leading-relaxed">Nomenclatura por número de lados:</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xl text-foreground/85 leading-relaxed">
                          <div className="bg-card rounded-lg p-2 text-center border border-border">
                            <p className="font-bold">3 lados</p>
                            <p className="text-lg text-foreground/85 leading-relaxed">Triângulo</p>
                          </div>
                          <div className="bg-card rounded-lg p-2 text-center border border-border">
                            <p className="font-bold">4 lados</p>
                            <p className="text-lg text-foreground/85 leading-relaxed">Quadrilátero</p>
                          </div>
                          <div className="bg-card rounded-lg p-2 text-center border border-border">
                            <p className="font-bold">5 lados</p>
                            <p className="text-lg text-foreground/85 leading-relaxed">Pentágono</p>
                          </div>
                          <div className="bg-card rounded-lg p-2 text-center border border-border">
                            <p className="font-bold">6 lados</p>
                            <p className="text-lg text-foreground/85 leading-relaxed">Hexágono</p>
                          </div>
                          <div className="bg-card rounded-lg p-2 text-center border border-border">
                            <p className="font-bold">7 lados</p>
                            <p className="text-lg text-foreground/85 leading-relaxed">Heptágono</p>
                          </div>
                          <div className="bg-card rounded-lg p-2 text-center border border-border">
                            <p className="font-bold">8 lados</p>
                            <p className="text-lg text-foreground/85 leading-relaxed">Octógono</p>
                          </div>
                          <div className="bg-card rounded-lg p-2 text-center border border-border">
                            <p className="font-bold">9 lados</p>
                            <p className="text-lg text-foreground/85 leading-relaxed">Eneágono</p>
                          </div>
                          <div className="bg-card rounded-lg p-2 text-center border border-border">
                            <p className="font-bold">10 lados</p>
                            <p className="text-lg text-foreground/85 leading-relaxed">Decágono</p>
                          </div>
                        </div>
                      </div>
                      <AlertBox tipo="info" titulo="Contexto Industrial">
                        Na Petrobras, seções transversais de peças, tampas de inspeção e parafusos têm formatos poligonais. Parafusos hexagonais (6 lados) permitem melhor torque com a chave. Conhecer polígonos é essencial para calcular áreas de peças em manutenção.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Soma dos Ângulos Internos",
                  icone: "📏",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A soma dos ângulos internos de um polígono convexo de <strong>n lados</strong> é:
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
                        <p className="text-lg font-mono font-bold">S<sub>i</sub> = (n − 2) × 180°</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/20 text-center">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-emerald-500">Triângulo (n=3)</p>
                          <p className="text-xl mt-1 text-foreground/85 leading-relaxed">(3−2)×180° = <strong>180°</strong></p>
                        </div>
                        <div className="p-3 bg-cyan-500/5 rounded-xl border border-cyan-500/20 text-center">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-cyan-500">Quadrilátero (n=4)</p>
                          <p className="text-xl mt-1 text-foreground/85 leading-relaxed">(4−2)×180° = <strong>360°</strong></p>
                        </div>
                        <div className="p-3 bg-blue-500/5 rounded-xl border border-blue-500/20 text-center">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-blue-500">Hexágono (n=6)</p>
                          <p className="text-xl mt-1 text-foreground/85 leading-relaxed">(6−2)×180° = <strong>720°</strong></p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        A banca costuma dar a soma dos ângulos internos e pedir o número de lados. Isole n: n = S<sub>i</sub>/180° + 2. Se S<sub>i</sub> = 1440°: n = 1440/180 + 2 = 8 + 2 = 10 lados.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Ângulos Externos e Polígonos Regulares",
                  icone: "⭐",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        O <strong>ângulo externo</strong> de um polígono é o suplemento do ângulo interno correspondente. A soma dos ângulos externos de qualquer polígono convexo é sempre <strong>360°</strong>.
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-xl font-bold text-blue-400 text-foreground/85 leading-relaxed">Para polígono REGULAR (n lados):</p>
                        <p className="text-xl font-mono text-foreground/85 leading-relaxed">Ângulo interno = (n−2)×180° / n</p>
                        <p className="text-xl font-mono text-foreground/85 leading-relaxed">Ângulo externo = 360° / n</p>
                      </div>
                      <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20">
                        <p className="text-lg text-foreground/85 leading-relaxed font-bold text-amber-500 mb-2">Macete para encontrar n:</p>
                        <p className="text-xl text-foreground/85 leading-relaxed">Se cada ângulo externo = 45° → n = 360°/45° = 8 lados (octógono)</p>
                        <p className="text-xl text-foreground/85 leading-relaxed">Se cada ângulo interno = 150° → ângulo externo = 30° → n = 360°/30° = 12</p>
                      </div>
                      <AlertBox tipo="danger" titulo="Pegadinha CESGRANRIO">
                        A soma dos ângulos EXTERNOS é sempre 360°, não importa quantos lados o polígono convexo tenha. Esse resultado contraintuitivo é frequentemente explorado em questões de múltipla escolha com a alternativa errada "depende do número de lados".
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
              title="Diagonais e Classificação"
              description="Conte diagonais e classifique polígonos quanto à convexidade e regularidade."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Diagonais e Tipos de Polígonos"
              icone="🔗"
              corIndicador="bg-cyan-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "Número de Diagonais",
                  icone: "↗️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A <strong>diagonal</strong> une dois vértices não adjacentes. O número de diagonais de um polígono de n lados é:
                      </p>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 text-center">
                        <p className="text-lg font-mono font-bold">d = n(n − 3) / 2</p>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="p-3 bg-card rounded-xl border border-border text-center">
                          <p className="font-bold text-xl text-foreground/85 leading-relaxed">Triângulo</p>
                          <p className="text-lg text-foreground/85 leading-relaxed">n=3: d = 0</p>
                        </div>
                        <div className="p-3 bg-card rounded-xl border border-border text-center">
                          <p className="font-bold text-xl text-foreground/85 leading-relaxed">Quadrilátero</p>
                          <p className="text-lg text-foreground/85 leading-relaxed">n=4: d = 2</p>
                        </div>
                        <div className="p-3 bg-card rounded-xl border border-border text-center">
                          <p className="font-bold text-xl text-foreground/85 leading-relaxed">Pentágono</p>
                          <p className="text-lg text-foreground/85 leading-relaxed">n=5: d = 5</p>
                        </div>
                        <div className="p-3 bg-card rounded-xl border border-border text-center">
                          <p className="font-bold text-xl text-foreground/85 leading-relaxed">Hexágono</p>
                          <p className="text-lg text-foreground/85 leading-relaxed">n=6: d = 9</p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Dica de Prova">
                        Não confunda: diagonal une vértices NÃO adjacentes (não vizinhos). Lado une vértices adjacentes. O triângulo não tem diagonal (todo par de vértices é adjacente).
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Convexo vs. Côncavo",
                  icone: "🔄",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-emerald-500 mb-2">Polígono Convexo</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Todos os ângulos internos são menores que 180°. Qualquer segmento unindo dois pontos internos fica totalmente dentro do polígono.</p>
                        </div>
                        <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/20">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-rose-500 mb-2">Polígono Côncavo</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Possui ao menos um ângulo interno maior que 180° (ângulo reentrante). A fórmula S<sub>i</sub> = (n−2)×180° se aplica apenas a polígonos convexos.</p>
                        </div>
                      </div>
                      <AlertBox tipo="info" titulo="Em Provas CESGRANRIO">
                        A CESGRANRIO trabalha predominantemente com polígonos convexos. Quando a questão não especificar, assuma convexo e aplique as fórmulas normalmente.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Polígono Regular",
                  icone: "⭐",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Um polígono é <strong>regular</strong> quando é simultaneamente <strong>equilátero</strong> (todos os lados iguais) e <strong>equiângulo</strong> (todos os ângulos internos iguais).
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                        <p className="text-xl text-foreground/85 leading-relaxed">O <strong>quadrado</strong> é o único quadrilátero regular. O retângulo é equiângulo mas não equilátero (salvo quando for quadrado). O losango é equilátero mas não equiângulo (salvo quando for quadrado).</p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-1" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={3}
          titulo="Na Prática: Como a Banca Cobra"
          variant={"indigo"}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Um triângulo de suporte de plataforma tem base 6 m e altura 4 m. Qual a sua área?"
          alternativas={[
            { letra: "A", texto: "10 m²", correta: false },
              { letra: "B", texto: "12 m²", correta: true },
              { letra: "C", texto: "24 m²", correta: false },
              { letra: "D", texto: "6 m²", correta: false },
              { letra: "E", texto: "8 m²", correta: false }
          ]}
          dicaEstrategica="Atenção: a altura deve ser perpendicular à base."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "A = (base × altura) / 2 = (6 × 4) / 2 = 24 / 2 = 12 m²." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Nunca use o lado oblíquo como altura." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={3}
            variant="indigo"
            video={{
              videoId: "aN1mKSMWiow",
              title: "Polígonos: Classificação, Ângulos Internos e Propriedades",
              duration: "12:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 1",
              tituloAula: "Geometria Plana",
              materia: "Matemática",
              images: [
                { title: "Soma de Ângulos (n-2)×180°", type: "Fórmula", placeholderColor: "bg-indigo-500/20" },
                { title: "Classificação: Convexo vs Côncavo", type: "Diagrama", placeholderColor: "bg-blue-500/20" },
                { title: "Diagonal: n(n-3)/2", type: "Conceito", placeholderColor: "bg-purple-500/20" },
                { title: "Polígonos Regulares: Eixos de Simetria", type: "Propriedade", placeholderColor: "bg-indigo-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Pulo do Gato: A Fórmula Mágica",
              content: (
                <div className="space-y-4">
                  <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                    <p className="font-semibold">🔑 Soma dos Ângulos Internos = (n - 2) × 180°</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Substitua n pelo número de lados. Sempre funciona para polígonos convexos. Para n=3 (triângulo): (3-2)×180° = 180°</p>
                  </div>
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <p className="font-semibold text-emerald-400">💡 Cada ângulo interno (polígono regular) = Soma ÷ n</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Para hexágono regular: 720° ÷ 6 = 120° cada</p>
                  </div>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <p className="font-semibold text-blue-400">📐 Número de Diagonais = n(n-3)/2</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Pentágono (n=5): 5×2÷2 = 5 diagonais. Triângulo: 0 diagonais.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "A Dança dos Polígonos",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM1}
              titulo="QUIZ: Polígonos"
              icone="🔷"
              numero={4}
              variant="blue"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>

          <section className="mt-16">
            <div className="bg-gradient-to-br from-indigo-500/5 to-blue-500/5 rounded-2xl border border-indigo-500/20 p-8 space-y-6">
              <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">📋 Referência Rápida — Polígonos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="font-bold text-xl mb-2 text-foreground/85 leading-relaxed">Triângulo (n=3)</p>
                  <p className="text-lg text-foreground/85 leading-relaxed">Soma: 180° | Diagonais: 0</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="font-bold text-xl mb-2 text-foreground/85 leading-relaxed">Quadrilátero (n=4)</p>
                  <p className="text-lg text-foreground/85 leading-relaxed">Soma: 360° | Diagonais: 2</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="font-bold text-xl mb-2 text-foreground/85 leading-relaxed">Pentágono (n=5)</p>
                  <p className="text-lg text-foreground/85 leading-relaxed">Soma: 540° | Diagonais: 5</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="font-bold text-xl mb-2 text-foreground/85 leading-relaxed">Hexágono (n=6)</p>
                  <p className="text-lg text-foreground/85 leading-relaxed">Soma: 720° | Diagonais: 9</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="font-bold text-xl mb-2 text-foreground/85 leading-relaxed">Octógono (n=8)</p>
                  <p className="text-lg text-foreground/85 leading-relaxed">Soma: 1080° | Diagonais: 20</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="font-bold text-xl mb-2 text-foreground/85 leading-relaxed">Decágono (n=10)</p>
                  <p className="text-lg text-foreground/85 leading-relaxed">Soma: 1440° | Diagonais: 35</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 2: TRIÂNGULOS — TIPOS E PROPRIEDADES                      */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <ModuleBanner numero={2}
          titulo="Triângulos: Tipos e Propriedades"
          descricao="Classifique triângulos quanto aos lados e ângulos, aplique a desigualdade triangular e o teorema do ângulo externo."
           variant="blue"/>
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Classificação dos Triângulos"
              description="Quanto aos lados e quanto aos ângulos — dois critérios independentes."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Tipos de Triângulos"
              icone="🔺"
              corIndicador="bg-cyan-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Quanto aos Lados",
                  icone: "📏",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20 text-center">
                          <p className="text-2xl mb-2">🔺</p>
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-blue-500 mb-1">Equilátero</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">3 lados iguais</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">Todos ângulos = 60°</p>
                        </div>
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20 text-center">
                          <p className="text-2xl mb-2">🔺</p>
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-emerald-500 mb-1">Isósceles</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">2 lados iguais</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">2 ângulos da base iguais</p>
                        </div>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20 text-center">
                          <p className="text-2xl mb-2">🔺</p>
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-cyan-500 mb-1">Escaleno</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">3 lados diferentes</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">3 ângulos diferentes</p>
                        </div>
                      </div>
                      <AlertBox tipo="info" titulo="Contexto Petrobras">
                        Estruturas de suporte de plataformas usam triângulos como base por ser a forma mais estável — não deforma sob carga. Treliças de plataformas offshore combinam os três tipos de triângulos dependendo das forças aplicadas.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Quanto aos Ângulos",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20 text-center">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-emerald-500 mb-1">Acutângulo</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Todos os ângulos {"< 90°"}</p>
                        </div>
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20 text-center">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-blue-500 mb-1">Retângulo</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Um ângulo = 90°</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">Base do Pitágoras</p>
                        </div>
                        <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20 text-center">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-amber-500 mb-1">Obtusângulo</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Um ângulo {"> 90°"}</p>
                        </div>
                      </div>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
                        <p className="text-xl font-bold text-cyan-400 mb-2 text-foreground/85 leading-relaxed">Combinações possíveis:</p>
                        <p className="text-xl text-foreground/85 leading-relaxed">• Retângulo-escaleno: (30°, 60°, 90°) com lados todos diferentes</p>
                        <p className="text-xl text-foreground/85 leading-relaxed">• Retângulo-isósceles: (45°, 45°, 90°) com dois catetos iguais</p>
                        <p className="text-xl text-foreground/85 leading-relaxed">• NÃO EXISTE: triângulo retângulo-equilátero (impossível)</p>
                      </div>
                      <AlertBox tipo="warning" titulo="Macete de Prova">
                        Todo triângulo equilátero é acutângulo. Nenhum triângulo equilátero pode ser retângulo ou obtusângulo, pois todos os ângulos são 60°.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Desigualdade Triangular e Ângulo Externo",
                  icone: "⚖️",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-xl font-bold text-blue-400 text-foreground/85 leading-relaxed">Desigualdade Triangular:</p>
                        <p className="text-xl font-mono text-foreground/85 leading-relaxed">A soma de dois lados DEVE SER MAIOR que o terceiro:</p>
                        <p className="text-xl font-mono text-foreground/85 leading-relaxed">a + b {">"} c, a + c {">"} b, b + c {">"} a</p>
                      </div>
                      <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                        <p className="text-lg text-foreground/85 leading-relaxed font-bold text-emerald-500 mb-2">Exemplo: (7, 8, 15) não é triângulo!</p>
                        <p className="text-xl text-foreground/85 leading-relaxed">7 + 8 = 15, que NÃO é maior que 15. Falhou a desigualdade.</p>
                      </div>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
                        <p className="text-xl font-bold text-cyan-400 mb-2 text-foreground/85 leading-relaxed">Teorema do Ângulo Externo:</p>
                        <p className="text-xl text-foreground/85 leading-relaxed">O ângulo externo de um triângulo = soma dos dois ângulos internos não adjacentes.</p>
                        <p className="text-xl font-mono mt-1 text-foreground/85 leading-relaxed">ângulo_ext = α + β (ângulos remotos)</p>
                      </div>
                      <AlertBox tipo="danger" titulo="Pegadinha CESGRANRIO">
                        Se (a, b, c) são os lados e a + b = c (igualdade), NÃO forma triângulo — os três pontos ficam colineares (em linha reta). A desigualdade deve ser ESTRITA (maior, não maior ou igual).
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-2" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Um suporte triangular de plataforma offshore tem ângulos internos de 90°, 45° e 45°. Como esse triângulo é classificado quanto aos ângulos e quanto aos lados?"
          alternativas={[
            { letra: "A", texto: "Retângulo e isósceles", correta: true },
              { letra: "B", texto: "Obtusângulo e escaleno", correta: false },
              { letra: "C", texto: "Retângulo e equilátero", correta: false },
              { letra: "D", texto: "Acutângulo e isósceles", correta: false },
              { letra: "E", texto: "Retângulo e escaleno", correta: false }
          ]}
          dicaEstrategica="Um triângulo retângulo-isósceles é muito comum em estruturas de suporte."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Com ângulo de 90° é retângulo." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Com dois ângulos iguais (45°), os dois lados opostos são iguais, portanto é isósceles." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa A como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            variant="blue"
            video={{
              videoId: "xhEQa-uECe0",
              title: "Triângulos: Classificação, Desigualdade Triangular e Altura",
              duration: "14:20"
            }}
            resumoVisual={{
              moduloNome: "Módulo 2",
              tituloAula: "Geometria Plana",
              materia: "Matemática",
              images: [
                { title: "Soma dos Ângulos = 180°", type: "Teorema", placeholderColor: "bg-emerald-500/20" },
                { title: "Desigualdade: a+b > c", type: "Restrição", placeholderColor: "bg-green-500/20" },
                { title: "Ângulo Externo = α + β", type: "Propriedade", placeholderColor: "bg-teal-500/20" },
                { title: "Altura e Mediatriz", type: "Elemento", placeholderColor: "bg-emerald-400/20" }
              ]
            }}
            maceteVisual={{
              title: "Pulo do Gato: Os Três Pilares",
              content: (
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <p className="font-semibold">1️⃣ Soma dos Ângulos: α + β + γ = 180°</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Vale para TODO triângulo. Reto, agudo ou obtuso. A soma é invariável.</p>
                  </div>
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <p className="font-semibold text-green-400">2️⃣ Desigualdade Triangular: a + b &gt; c</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Todos os 3 pares de lados devem satisfazer. Se a+b=c, é colinear (não existe triângulo).</p>
                  </div>
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                    <p className="font-semibold text-amber-400">3️⃣ Ângulo Externo: ê = α + β (remotos)</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Ângulo externo = soma dos 2 ângulos internos não adjacentes a ele.</p>
                  </div>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <p className="font-semibold text-blue-400">📍 Altura vs Mediana vs Mediatriz</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Altura ⊥ ao lado | Mediana une vértice ao meio do lado | Mediatriz ⊥ ao meio do lado</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
              titulo: "Trilha dos Triângulos",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM2}
              titulo="QUIZ: Triângulos"
              icone="🔺"
              numero={3}
              variant="blue"
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>

          <section className="mt-16">
            <div className="bg-gradient-to-br from-cyan-500/5 to-emerald-500/5 rounded-2xl border border-cyan-500/20 p-8 space-y-6">
              <h3 className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">📋 Referência Rápida — Triângulos</h3>
              <div className="space-y-4">
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="font-bold text-xl mb-2 text-foreground/85 leading-relaxed">Classificação por Ângulos</p>
                  <p className="text-lg text-foreground/85 leading-relaxed">• Acutângulo: todos ângulos &lt; 90° | • Retângulo: um ângulo = 90° | • Obtusângulo: um ângulo &gt; 90°</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="font-bold text-xl mb-2 text-foreground/85 leading-relaxed">Classificação por Lados</p>
                  <p className="text-lg text-foreground/85 leading-relaxed">• Equilátero: 3 lados iguais | • Isósceles: 2 lados iguais | • Escaleno: 3 lados diferentes</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="font-bold text-xl mb-2 text-foreground/85 leading-relaxed">Elementos Principais</p>
                  <p className="text-lg text-foreground/85 leading-relaxed">Altura: perpendicular do vértice ao lado | Mediana: linha do vértice ao meio do lado oposto | Mediatriz: perpendicular ao meio do lado</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 3: ÁREA DO TRIÂNGULO                                       */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <ModuleBanner numero={3}
          titulo="Área do Triângulo"
          descricao="Calcule áreas com a fórmula clássica, pela Fórmula de Heron e casos especiais: retângulo, equilátero e isósceles."
           variant="blue"/>
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Fórmulas de Área do Triângulo"
              description="Da fórmula básica à Fórmula de Heron — domínio completo para qualquer situação."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Fórmulas e Aplicações"
              icone="📐"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Fórmula Básica: base × altura / 2",
                  icone: "🧮",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center">
                        <p className="text-xl font-mono font-bold">A = (b × h) / 2</p>
                        <p className="text-xl mt-1 text-foreground/85 leading-relaxed">onde h é a altura perpendicular à base b</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-blue-500 mb-2">Triângulo Retângulo</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Os catetos são base e altura mutuamente:</p>
                          <p className="text-xl font-mono font-bold text-foreground/85 leading-relaxed">A = (cateto₁ × cateto₂) / 2</p>
                        </div>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-cyan-500 mb-2">Exemplo Industrial</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Suporte com base 6 m e altura 4 m:</p>
                          <p className="text-xl font-bold text-foreground/85 leading-relaxed">A = (6 × 4)/2 = 12 m²</p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Erro Clássico">
                        A altura DEVE SER PERPENDICULAR à base. Em triângulos obtusângulos, a altura pode cair fora da base. Nunca use o lado oblíquo como altura sem verificar a perpendicularidade.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Fórmula de Heron (lados conhecidos)",
                  icone: "🏛️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>Quando só os três lados são conhecidos (sem altura), use a <strong>Fórmula de Heron</strong>:</p>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 space-y-2 text-center">
                        <p className="text-xl font-mono text-foreground/85 leading-relaxed">s = (a + b + c) / 2 &nbsp;&nbsp; (semiperímetro)</p>
                        <p className="text-lg font-mono font-bold">A = √[s(s−a)(s−b)(s−c)]</p>
                      </div>
                      <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20">
                        <p className="text-lg text-foreground/85 leading-relaxed font-bold text-amber-500 mb-2">Exemplo: lados 3, 4 e 5</p>
                        <p className="text-xl text-foreground/85 leading-relaxed">s = (3+4+5)/2 = 6</p>
                        <p className="text-xl text-foreground/85 leading-relaxed">A = √[6×(6−3)×(6−4)×(6−5)] = √[6×3×2×1] = √36 = 6 m²</p>
                        <p className="text-xl text-emerald-400 mt-1 text-foreground/85 leading-relaxed">✓ Confirmação: é triângulo retângulo, A = (3×4)/2 = 6 m²</p>
                      </div>
                      <AlertBox tipo="info" titulo="Aplicação em Campo">
                        Inspetores de campo frequentemente medem os três lados de uma área irregular (como um terreno triangular) com trena. A Fórmula de Heron permite calcular a área sem precisar medir a altura.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Triângulo Equilátero",
                  icone: "⬡",
                  conteudo: (
                    <div className="space-y-4">
                      <p>Para o triângulo equilátero de lado L, existe fórmula direta:</p>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-center space-y-2">
                        <p className="text-lg font-mono font-bold">A = (L² × √3) / 4</p>
                        <p className="text-xl text-foreground/85 leading-relaxed">Altura: h = L√3/2</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="p-3 bg-card rounded-xl border border-border text-center">
                          <p className="text-lg text-foreground/85 leading-relaxed">L = 2</p>
                          <p className="font-bold text-xl text-foreground/85 leading-relaxed">A = √3 m²</p>
                        </div>
                        <div className="p-3 bg-card rounded-xl border border-border text-center">
                          <p className="text-lg text-foreground/85 leading-relaxed">L = 4</p>
                          <p className="font-bold text-xl text-foreground/85 leading-relaxed">A = 4√3 m²</p>
                        </div>
                        <div className="p-3 bg-card rounded-xl border border-border text-center">
                          <p className="text-lg text-foreground/85 leading-relaxed">L = 6</p>
                          <p className="font-bold text-xl text-foreground/85 leading-relaxed">A = 9√3 m²</p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Dica de Memória">
                        √3 ≈ 1,732. Para L=6: A = 9×1,732 ≈ 15,59 m². A CESGRANRIO geralmente deixa a resposta em forma de radical (4√3, 9√3...), então não se preocupe em calcular √3 numericamente.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-3" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Um suporte triangular de plataforma offshore tem ângulos internos de 90°, 45° e 45°. Como esse triângulo é classificado quanto aos ângulos e quanto aos lados?"
          alternativas={[
            { letra: "A", texto: "Retângulo e isósceles", correta: true },
              { letra: "B", texto: "Obtusângulo e escaleno", correta: false },
              { letra: "C", texto: "Retângulo e equilátero", correta: false },
              { letra: "D", texto: "Acutângulo e isósceles", correta: false },
              { letra: "E", texto: "Retângulo e escaleno", correta: false }
          ]}
          dicaEstrategica="Um triângulo retângulo-isósceles é muito comum em estruturas de suporte."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Com ângulo de 90° é retângulo." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Com dois ângulos iguais (45°), os dois lados opostos são iguais, portanto é isósceles." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa A como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            variant="blue"
            video={{
              videoId: "K7eVVVHGDe4",
              title: "Cálculo de Áreas de Triângulos: Fórmulas Principais e Casos Especiais",
              duration: "11:15"
            }}
            resumoVisual={{
              moduloNome: "Módulo 3",
              tituloAula: "Geometria Plana",
              materia: "Matemática",
              images: [
                { title: "A = (b × h)/2", type: "Fórmula Básica", placeholderColor: "bg-cyan-500/20" },
                { title: "A = (L²√3)/4 Equilátero", type: "Caso Especial", placeholderColor: "bg-blue-500/20" },
                { title: "Fórmula de Heron", type: "Avançado", placeholderColor: "bg-sky-500/20" },
                { title: "A = (a×b×sen C)/2", type: "Trigonométrica", placeholderColor: "bg-cyan-400/20" }
              ]
            }}
            maceteVisual={{
              title: "Pulo do Gato: Qual Fórmula Usar?",
              content: (
                <div className="space-y-4">
                  <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                    <p className="font-semibold">🎯 Caso 1: Base e Altura conhecidas</p>
                    <p className="font-mono text-xl mt-2 text-foreground/85 leading-relaxed">A = (b × h) / 2   [MAIS COMUM]</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Altura é perpendicular ao lado (base).</p>
                  </div>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <p className="font-semibold text-blue-400">⭐ Caso 2: Triângulo Equilátero (lado L)</p>
                    <p className="font-mono text-xl mt-2 text-foreground/85 leading-relaxed">A = (L² × √3) / 4</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Ex: L=6 → A = 36√3/4 = 9√3 ≈ 15,59 m²</p>
                  </div>
                  <div className="p-4 bg-sky-500/10 border border-sky-500/20 rounded-xl">
                    <p className="font-semibold text-sky-400">🔬 Caso 3: Três lados (Fórmula de Heron)</p>
                    <p className="font-mono text-xl mt-2 text-foreground/85 leading-relaxed">A = √[s(s-a)(s-b)(s-c)], onde s=(a+b+c)/2</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Quando altura não é dada.</p>
                  </div>
                  <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                    <p className="font-semibold text-purple-400">📊 Caso 4: Dois lados e ângulo</p>
                    <p className="font-mono text-xl mt-2 text-foreground/85 leading-relaxed">A = (a × b × sen C) / 2</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Usar quando ângulo entre dois lados é conhecido.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
              titulo: "A Fórmula da Área",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM3}
              titulo="QUIZ: Área do Triângulo"
              icone="📐"
              numero={3}
              variant="blue"
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>

          <section className="mt-16">
            <div className="bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 rounded-2xl border border-emerald-500/20 p-8 space-y-6">
              <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">📋 Referência Rápida — Áreas de Triângulos</h3>
              <div className="space-y-4">
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="font-bold text-xl mb-2 text-foreground/85 leading-relaxed">Fórmula Geral</p>
                  <p className="text-lg text-foreground/85 leading-relaxed font-mono">A = (base × altura) / 2</p>
                  <p className="text-lg text-foreground/85 leading-relaxed mt-2">Altura deve ser perpendicular à base escolhida.</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="font-bold text-xl mb-2 text-foreground/85 leading-relaxed">Triângulo Equilátero (lado L)</p>
                  <p className="text-lg text-foreground/85 leading-relaxed font-mono">A = (L² × √3) / 4 | h = (L × √3) / 2</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="font-bold text-xl mb-2 text-foreground/85 leading-relaxed">Fórmula de Heron (3 lados: a, b, c)</p>
                  <p className="text-lg text-foreground/85 leading-relaxed font-mono">A = √[s(s-a)(s-b)(s-c)], onde s = (a+b+c)/2</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="font-bold text-xl mb-2 text-foreground/85 leading-relaxed">Com 2 lados e ângulo entre eles</p>
                  <p className="text-lg text-foreground/85 leading-relaxed font-mono">A = (a × b × sen C) / 2</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 4: QUADRILÁTEROS — TIPOS E ÁREAS                          */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner numero={4}
          titulo="Quadriláteros: Tipos e Áreas"
          descricao="Domine retângulo, quadrado, losango, paralelogramo e trapézio — com todas as fórmulas de área e propriedades para a prova."
           variant="blue"/>
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Hierarquia dos Quadriláteros"
              description="Entenda as relações de inclusão entre os quadriláteros especiais."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Quadriláteros Especiais e Suas Áreas"
              icone="⬛"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Retângulo e Quadrado",
                  icone: "🟦",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-blue-500 mb-2">Retângulo</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">4 ângulos retos (90°)</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Lados opostos iguais e paralelos</p>
                          <div className="bg-blue-500/10 rounded-lg p-2 mt-2">
                            <p className="text-xl font-mono font-bold text-center text-foreground/85 leading-relaxed">A = base × altura</p>
                          </div>
                        </div>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-cyan-500 mb-2">Quadrado</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">4 ângulos retos + 4 lados iguais</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Retângulo + Losango ao mesmo tempo</p>
                          <div className="bg-cyan-500/10 rounded-lg p-2 mt-2">
                            <p className="text-xl font-mono font-bold text-center text-foreground/85 leading-relaxed">A = L²</p>
                          </div>
                        </div>
                      </div>
                      <AlertBox tipo="info" titulo="Contexto Petrobras">
                        O pátio retangular da refinaria REPLAN tem 120 m × 80 m → A = 9.600 m². Plataformas offshore têm formato próximo ao retangular: P-77 mede ~90 m × 60 m. Calcular área é fundamental para dimensionar pavimentação, cobertura e proteção.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Losango e Paralelogramo",
                  icone: "♦️",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-emerald-500 mb-2">Losango</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">4 lados iguais</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Diagonais perpendiculares e bissetrizes</p>
                          <div className="bg-emerald-500/10 rounded-lg p-2 mt-2">
                            <p className="text-xl font-mono font-bold text-center text-foreground/85 leading-relaxed">A = (d₁ × d₂) / 2</p>
                          </div>
                        </div>
                        <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-amber-500 mb-2">Paralelogramo</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Lados opostos paralelos e iguais</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Ângulos opostos iguais</p>
                          <div className="bg-amber-500/10 rounded-lg p-2 mt-2">
                            <p className="text-xl font-mono font-bold text-center text-foreground/85 leading-relaxed">A = base × altura</p>
                          </div>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        No losango, a fórmula A = (d₁ × d₂)/2 usa as DIAGONAIS, não os lados. No paralelogramo, a altura é a distância PERPENDICULAR entre as bases paralelas — não o lado oblíquo!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Trapézio",
                  icone: "🔶",
                  conteudo: (
                    <div className="space-y-4">
                      <p>O <strong>trapézio</strong> tem exatamente um par de lados paralelos (bases B e b), com a outra dupla de lados não paralela.</p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
                        <p className="text-xl font-mono font-bold">A = [(B + b) × h] / 2</p>
                        <p className="text-xl mt-1 text-foreground/85 leading-relaxed">B = base maior, b = base menor, h = altura entre as bases</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="p-3 bg-card rounded-xl border border-border text-center">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-blue-400">Retângulo</p>
                          <p className="text-lg text-foreground/85 leading-relaxed">Um lado não paralelo ⊥ às bases</p>
                        </div>
                        <div className="p-3 bg-card rounded-xl border border-border text-center">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-emerald-400">Isósceles</p>
                          <p className="text-lg text-foreground/85 leading-relaxed">Lados não paralelos iguais</p>
                        </div>
                        <div className="p-3 bg-card rounded-xl border border-border text-center">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-cyan-400">Escaleno</p>
                          <p className="text-lg text-foreground/85 leading-relaxed">Lados não paralelos diferentes</p>
                        </div>
                      </div>
                      <AlertBox tipo="info" titulo="Aplicação em Drenagem">
                        Seções transversais de canais de drenagem de refinaria frequentemente têm forma trapezoidal: mais larga na superfície que no fundo, facilitando o escoamento. A área molhada (seção transversal) é calculada pela fórmula do trapézio.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-4">
            <ModuleSectionHeader
              index={2}
              title="Tabela Resumo das Fórmulas"
              description="Consulta rápida para a prova — todas as áreas em um só lugar."
              variant="blue"
              className="mb-6"
            />
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-xl text-foreground/85 leading-relaxed">
                  <thead>
                    <tr className="text-left border-b border-border">
                      <th className="pb-2 pr-4 font-bold text-blue-400">Figura</th>
                      <th className="pb-2 pr-4 font-bold text-blue-400">Área</th>
                      <th className="pb-2 font-bold text-blue-400">Observação</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-1">
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-medium">Retângulo</td>
                      <td className="py-2 pr-4 font-mono text-cyan-400">b × h</td>
                      <td className="py-2 text-lg text-foreground/85 leading-relaxed">base × altura</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-medium">Quadrado</td>
                      <td className="py-2 pr-4 font-mono text-cyan-400">L²</td>
                      <td className="py-2 text-lg text-foreground/85 leading-relaxed">lado ao quadrado</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-medium">Paralelogramo</td>
                      <td className="py-2 pr-4 font-mono text-cyan-400">b × h</td>
                      <td className="py-2 text-lg text-foreground/85 leading-relaxed">h perpendicular à base</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-medium">Losango</td>
                      <td className="py-2 pr-4 font-mono text-cyan-400">(d₁ × d₂)/2</td>
                      <td className="py-2 text-lg text-foreground/85 leading-relaxed">produto das diagonais / 2</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-medium">Trapézio</td>
                      <td className="py-2 pr-4 font-mono text-cyan-400">[(B+b) × h]/2</td>
                      <td className="py-2 text-lg text-foreground/85 leading-relaxed">média das bases × altura</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>



          <section id="quiz-modulo-4" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={3}
          titulo="Na Prática: Como a Banca Cobra"
          variant={"blue"}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Um triângulo de suporte de plataforma tem base 6 m e altura 4 m. Qual a sua área?"
          alternativas={[
            { letra: "A", texto: "10 m²", correta: false },
              { letra: "B", texto: "12 m²", correta: true },
              { letra: "C", texto: "24 m²", correta: false },
              { letra: "D", texto: "6 m²", correta: false },
              { letra: "E", texto: "8 m²", correta: false }
          ]}
          dicaEstrategica="Atenção: a altura deve ser perpendicular à base."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "A = (base × altura) / 2 = (6 × 4) / 2 = 24 / 2 = 12 m²." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Nunca use o lado oblíquo como altura." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={3}
            variant="blue"
            video={{
              videoId: "ZcX-8SmG6nA",
              title: "Quadriláteros: Tipos, Diagonais, Perímetro e Área",
              duration: "13:45"
            }}
            resumoVisual={{
              moduloNome: "Módulo 4",
              tituloAula: "Geometria Plana",
              materia: "Matemática",
              images: [
                { title: "Retângulo: A = b × h", type: "Tipo 1", placeholderColor: "bg-blue-500/20" },
                { title: "Losango: A = (d₁ × d₂)/2", type: "Tipo 2", placeholderColor: "bg-indigo-500/20" },
                { title: "Trapézio: A = [(B+b)×h]/2", type: "Tipo 3", placeholderColor: "bg-cyan-500/20" },
                { title: "Quadrado: A = L² ou d²/2", type: "Caso Especial", placeholderColor: "bg-blue-400/20" }
              ]
            }}
            maceteVisual={{
              title: "Pulo do Gato: Identificar e Calcular",
              content: (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <p className="font-semibold">📦 Retângulo: A = b × h</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Lados opostos iguais, 4 ângulos retos (90°). Diagonal: d = √(b² + h²)</p>
                  </div>
                  <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                    <p className="font-semibold text-purple-400">💎 Losango: A = (d₁ × d₂) / 2</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">4 lados iguais. Diagonais perpendiculares e se bisectam.</p>
                  </div>
                  <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                    <p className="font-semibold text-cyan-400">📊 Trapézio: A = [(B + b) × h] / 2</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Uma só par de lados paralelos. Soma das bases vezes altura, divide por 2.</p>
                  </div>
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <p className="font-semibold text-emerald-400">⬜ Quadrado: A = L² (ou d²/2 pela diagonal)</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Caso especial: 4 lados iguais e 4 ângulos de 90°. Diagonal: d = L√2</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
              titulo: "Os Quatro Quadros",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM4}
              titulo="QUIZ: Quadriláteros"
              icone="⬛"
              numero={4}
              variant="blue"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>

          <section className="mt-16">
            <div className="bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-2xl border border-blue-500/20 p-8 space-y-6">
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">📋 Referência Rápida — Quadriláteros</h3>
              <div className="space-y-4">
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="font-bold text-xl mb-2 text-foreground/85 leading-relaxed">Quadrado (lado L)</p>
                  <p className="text-lg text-foreground/85 leading-relaxed font-mono">A = L² | P = 4L | d = L√2</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="font-bold text-xl mb-2 text-foreground/85 leading-relaxed">Retângulo (base b, altura h)</p>
                  <p className="text-lg text-foreground/85 leading-relaxed font-mono">A = b × h | P = 2(b+h) | d = √(b² + h²)</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="font-bold text-xl mb-2 text-foreground/85 leading-relaxed">Losango (diagonais d₁ e d₂)</p>
                  <p className="text-lg text-foreground/85 leading-relaxed font-mono">A = (d₁ × d₂) / 2 | P = 4 × lado</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="font-bold text-xl mb-2 text-foreground/85 leading-relaxed">Trapézio (bases B e b, altura h)</p>
                  <p className="text-lg text-foreground/85 leading-relaxed font-mono">A = [(B + b) × h] / 2 | P = B + b + lado1 + lado2</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="font-bold text-xl mb-2 text-foreground/85 leading-relaxed">Paralelogramo</p>
                  <p className="text-lg text-foreground/85 leading-relaxed font-mono">A = base × altura | P = 2(lado1 + lado2)</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 5: CÍRCULO E CIRCUNFERÊNCIA                               */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner numero={5}
          titulo="Círculo e Circunferência"
          descricao="Área, comprimento, setores e coroas circulares — fundamento para cálculo de seções de dutos, tanques e vedações."
           variant="blue"/>
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Fórmulas Fundamentais do Círculo"
              description="Área, circunferência, setor e coroa — tudo que a CESGRANRIO cobra."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Círculo, Circunferência e Partes"
              icone="⭕"
              corIndicador="bg-cyan-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Área e Comprimento",
                  icone: "🔵",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-blue-400 mb-2">ÁREA do Círculo</p>
                          <p className="text-xl font-mono font-bold">A = π r²</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">resultado em unidades²</p>
                        </div>
                        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 text-center">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-cyan-400 mb-2">COMPRIMENTO da Circunferência</p>
                          <p className="text-xl font-mono font-bold">C = 2πr = πd</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">resultado em unidades lineares</p>
                        </div>
                      </div>
                      <AlertBox tipo="danger" titulo="Pegadinha Mais Comum">
                        Circunferência (C = 2πr) é o COMPRIMENTO da borda circular — medido em metros, cm, etc. Área do círculo (A = πr²) é a REGIÃO interna — medida em m², cm², etc. A banca adora perguntar um quando o candidato espera o outro.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Setor Circular e Coroa",
                  icone: "🍕",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-emerald-500 mb-2">Setor Circular (ângulo θ°)</p>
                          <p className="text-xl font-mono font-bold text-foreground/85 leading-relaxed">A = (θ/360°) × πr²</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">Ex: setor de 90° = 1/4 do círculo</p>
                        </div>
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-blue-400 mb-2">Coroa Circular (anel)</p>
                          <p className="text-xl font-mono font-bold text-foreground/85 leading-relaxed">A = π(R² − r²)</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">R = raio externo, r = raio interno</p>
                        </div>
                      </div>
                      <AlertBox tipo="info" titulo="Aplicação Industrial">
                        A coroa circular é a seção transversal de qualquer tubo ou duto oco. Num duto de diâmetro externo 20 cm e interno 16 cm: A = π(10²−8²) = π×36 ≈ 113 cm². Essa área determina a vazão de petróleo ou gás.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Relação entre Raio e Área",
                  icone: "📈",
                  conteudo: (
                    <div className="space-y-4">
                      <p>Como A = πr², a área varia com o <strong>quadrado do raio</strong>:</p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                        <p className="text-xl font-bold text-blue-400 mb-2 text-foreground/85 leading-relaxed">Regra do Quadrado:</p>
                        <p className="text-xl text-foreground/85 leading-relaxed">Se o raio multiplica por k → a área multiplica por k²</p>
                        <div className="grid grid-cols-3 gap-2 mt-3 text-center text-xl text-foreground/85 leading-relaxed">
                          <div className="p-2 bg-card rounded-lg border border-border">
                            <p className="text-lg text-foreground/85 leading-relaxed">raio × 2</p>
                            <p className="font-bold">área × 4</p>
                          </div>
                          <div className="p-2 bg-card rounded-lg border border-border">
                            <p className="text-lg text-foreground/85 leading-relaxed">raio × 3</p>
                            <p className="font-bold">área × 9</p>
                          </div>
                          <div className="p-2 bg-card rounded-lg border border-border">
                            <p className="text-lg text-foreground/85 leading-relaxed">raio × 5</p>
                            <p className="font-bold">área × 25</p>
                          </div>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        Se o diâmetro dobra, a área quadruplica (não dobra). Um duto com diâmetro 2× maior tem 4× a área de seção e portanto transporta até 4× mais fluido (mesma velocidade). A banca adora perguntar essa razão.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-5" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Um suporte triangular de plataforma offshore tem ângulos internos de 90°, 45° e 45°. Como esse triângulo é classificado quanto aos ângulos e quanto aos lados?"
          alternativas={[
            { letra: "A", texto: "Retângulo e isósceles", correta: true },
              { letra: "B", texto: "Obtusângulo e escaleno", correta: false },
              { letra: "C", texto: "Retângulo e equilátero", correta: false },
              { letra: "D", texto: "Acutângulo e isósceles", correta: false },
              { letra: "E", texto: "Retângulo e escaleno", correta: false }
          ]}
          dicaEstrategica="Um triângulo retângulo-isósceles é muito comum em estruturas de suporte."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Com ângulo de 90° é retângulo." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Com dois ângulos iguais (45°), os dois lados opostos são iguais, portanto é isósceles." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa A como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            variant="blue"
            video={{
              videoId: "p-e5Ot_BDOA",
              title: "Círculo e Circunferência: Perímetro, Área, Setor e Coroa Circular",
              duration: "12:50"
            }}
            resumoVisual={{
              moduloNome: "Módulo 5",
              tituloAula: "Geometria Plana",
              materia: "Matemática",
              images: [
                { title: "C = 2πr ou πd", type: "Perímetro", placeholderColor: "bg-amber-500/20" },
                { title: "A = πr²", type: "Área", placeholderColor: "bg-yellow-500/20" },
                { title: "Setor e Coroa", type: "Variações", placeholderColor: "bg-orange-500/20" },
                { title: "Arco = (θ/360°) × 2πr", type: "Comprimento", placeholderColor: "bg-amber-400/20" }
              ]
            }}
            maceteVisual={{
              title: "Pulo do Gato: Memorizar π",
              content: (
                <div className="space-y-4">
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                    <p className="font-semibold">🔵 Circunferência (perímetro): C = 2πr</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Se r dobra, C dobra (proporcionalidade linear). π ≈ 3,14159</p>
                  </div>
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                    <p className="font-semibold text-yellow-600 dark:text-yellow-400">🟡 Área do Círculo: A = πr²</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Se r dobra, A quadruplica (proporcionalidade quadrática!). Ex: r=5 → A ≈ 78,54</p>
                  </div>
                  <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                    <p className="font-semibold text-orange-400">🍩 Coroa Circular: A = π(R² - r²)</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Área entre círculo maior (R) e menor (r). Subtrai os raios ao quadrado.</p>
                  </div>
                  <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                    <p className="font-semibold text-rose-400">🎯 Setor Circular: A = (θ/360°) × πr²</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Apenas uma "fatia" do círculo. θ é o ângulo central em graus.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
              titulo: "A Canção do Raio e do Pi",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM5}
              titulo="QUIZ: Círculo e Circunferência"
              icone="⭕"
              numero={3}
              variant="blue"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>

          <section className="mt-16">
            <div className="bg-gradient-to-br from-amber-500/5 to-yellow-500/5 rounded-2xl border border-amber-500/20 p-8 space-y-6">
              <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400">📋 Referência Rápida — Círculo e Circunferência</h3>
              <div className="space-y-4">
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="font-bold text-xl mb-2 text-foreground/85 leading-relaxed">Circunferência (raio r)</p>
                  <p className="text-lg text-foreground/85 leading-relaxed font-mono">C = 2πr (ou C = πd)</p>
                  <p className="text-lg text-foreground/85 leading-relaxed mt-1">π ≈ 3,14159</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="font-bold text-xl mb-2 text-foreground/85 leading-relaxed">Área do Círculo</p>
                  <p className="text-lg text-foreground/85 leading-relaxed font-mono">A = πr²</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="font-bold text-xl mb-2 text-foreground/85 leading-relaxed">Setor Circular (ângulo θ em graus)</p>
                  <p className="text-lg text-foreground/85 leading-relaxed font-mono">A_setor = (θ/360°) × πr²</p>
                  <p className="text-lg text-foreground/85 leading-relaxed font-mono">C_arco = (θ/360°) × 2πr</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                  <p className="font-bold text-xl mb-2 text-foreground/85 leading-relaxed">Coroa Circular (raio maior R, menor r)</p>
                  <p className="text-lg text-foreground/85 leading-relaxed font-mono">A = π(R² - r²)</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 6: SEMELHANÇA DE TRIÂNGULOS                               */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <ModuleBanner numero={6}
          titulo="Semelhança de Triângulos"
          descricao="Critérios AA, LAL e LLL, escalas de plantas industriais e razões de lados, áreas e volumes em figuras semelhantes."
           variant="blue"/>
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Critérios de Semelhança"
              description="Três critérios para provar que dois triângulos são semelhantes."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Semelhança: Definição e Critérios"
              icone="🔍"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Definição e Critérios",
                  icone: "🔵",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Dois triângulos são <strong>semelhantes</strong> (△ABC ~ △DEF) quando têm ângulos correspondentes iguais e lados correspondentes proporcionais. A constante de proporcionalidade é a <strong>razão de semelhança k</strong>.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-blue-500 mb-2">AA (Ângulo-Ângulo)</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">2 ângulos correspondentes iguais → semelhantes</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">O mais simples de verificar</p>
                        </div>
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-emerald-500 mb-2">LAL (Lado-Ângulo-Lado)</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">2 lados proporcionais e ângulo entre eles igual</p>
                        </div>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-cyan-500 mb-2">LLL (Lado-Lado-Lado)</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">3 pares de lados em mesma proporção</p>
                        </div>
                      </div>
                      <AlertBox tipo="info" titulo="Escalas em Plantas Industriais">
                        Plantas industriais usam semelhança: escala 1:500 significa que cada figura da planta é semelhante à real com k = 1/500. Um duto de 4 cm na planta tem 4 × 500 = 2.000 cm = 20 m na realidade.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Razões de Lados, Áreas e Volumes",
                  icone: "📊",
                  conteudo: (
                    <div className="space-y-4">
                      <p>Se dois polígonos semelhantes têm razão de semelhança <strong>k</strong>:</p>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-blue-500 text-white text-lg text-foreground/85 leading-relaxed flex items-center justify-center font-bold">1</span>
                          <span className="text-xl text-foreground/85 leading-relaxed"><strong>Perímetros e lados</strong> têm razão <strong>k</strong></span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-lg text-foreground/85 leading-relaxed flex items-center justify-center font-bold">2</span>
                          <span className="text-xl text-foreground/85 leading-relaxed"><strong>Áreas</strong> têm razão <strong>k²</strong></span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-cyan-500 text-white text-lg text-foreground/85 leading-relaxed flex items-center justify-center font-bold">3</span>
                          <span className="text-xl text-foreground/85 leading-relaxed"><strong>Volumes</strong> têm razão <strong>k³</strong></span>
                        </div>
                      </div>
                      <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20">
                        <p className="text-lg text-foreground/85 leading-relaxed font-bold text-amber-500 mb-2">Exemplo: k = 1:3</p>
                        <p className="text-xl text-foreground/85 leading-relaxed">Lados: 1:3, Áreas: 1:9, Volumes: 1:27</p>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha de Prova">
                        Se a razão de volumes é 8:27, a razão de lados é ∛(8/27) = 2/3, não 8/27. Sempre extraia a raiz cúbica para passar de volume para lado, e raiz quadrada para passar de área para lado.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Semelhança no Triângulo Retângulo",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4">
                      <p>No triângulo retângulo, a <strong>altura relativa à hipotenusa</strong> cria dois triângulos menores, todos semelhantes entre si e ao triângulo original.</p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-xl font-bold text-blue-400 text-foreground/85 leading-relaxed">Relações Métricas do Triângulo Retângulo:</p>
                        <p className="text-xl font-mono text-foreground/85 leading-relaxed">h² = p × q &nbsp;&nbsp;&nbsp; (h = altura à hipotenusa)</p>
                        <p className="text-xl font-mono text-foreground/85 leading-relaxed">a² = c × p &nbsp;&nbsp;&nbsp; (cateto a, projeção p)</p>
                        <p className="text-xl font-mono text-foreground/85 leading-relaxed">b² = c × q &nbsp;&nbsp;&nbsp; (cateto b, projeção q)</p>
                        <p className="text-xl mt-1 text-foreground/85 leading-relaxed">c = hipotenusa, p e q = projeções dos catetos</p>
                      </div>
                      <AlertBox tipo="info" titulo="Aplicação">
                        Essas relações permitem calcular a altura de uma estrutura a partir de suas projeções — técnica usada em engenharia civil e naval sem necessidade de acesso direto ao topo.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-6" className="mt-16">
                  {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Um suporte triangular de plataforma offshore tem ângulos internos de 90°, 45° e 45°. Como esse triângulo é classificado quanto aos ângulos e quanto aos lados?"
          alternativas={[
            { letra: "A", texto: "Retângulo e isósceles", correta: true },
              { letra: "B", texto: "Obtusângulo e escaleno", correta: false },
              { letra: "C", texto: "Retângulo e equilátero", correta: false },
              { letra: "D", texto: "Acutângulo e isósceles", correta: false },
              { letra: "E", texto: "Retângulo e escaleno", correta: false }
          ]}
          dicaEstrategica="Um triângulo retângulo-isósceles é muito comum em estruturas de suporte."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Com ângulo de 90° é retângulo." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Com dois ângulos iguais (45°), os dois lados opostos são iguais, portanto é isósceles." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa A como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            variant="blue"
            video={{
              videoId: "t4WdZDvp8Ps",
              title: "Semelhança de Triângulos: Critérios AA, LAL, LLL e Teorema de Thales",
              duration: "15:10"
            }}
            resumoVisual={{
              moduloNome: "Módulo 6",
              tituloAula: "Geometria Plana",
              materia: "Matemática",
              images: [
                { title: "Critério AA (2 ângulos)", type: "Suficiente", placeholderColor: "bg-rose-500/20" },
                { title: "Razão k de Semelhança", type: "Proporcional", placeholderColor: "bg-pink-500/20" },
                { title: "Teorema de Thales", type: "Retas Paralelas", placeholderColor: "bg-red-500/20" },
                { title: "Casos LAL e LLL", type: "Critérios", placeholderColor: "bg-rose-400/20" }
              ]
            }}
            maceteVisual={{
              title: "Pulo do Gato: Razão de Semelhança",
              content: (
                <div className="space-y-4">
                  <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                    <p className="font-semibold">✅ Se triângulos são semelhantes com razão k:</p>
                    <p className="font-mono text-xl mt-2 text-foreground/85 leading-relaxed">Lados: k | Perímetro: k | Altura: k | Área: k²</p>
                  </div>
                  <div className="p-4 bg-pink-500/10 border border-pink-500/20 rounded-xl">
                    <p className="font-semibold text-pink-400">📐 Critério AA (mais rápido)</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">2 ângulos iguais → triângulos semelhantes. Se ∠A = ∠A' e ∠B = ∠B', então △ ~ △'</p>
                  </div>
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <p className="font-semibold text-red-400">🧵 Teorema de Thales</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Retas paralelas cortam transversais em segmentos proporcionais. AB/BC = A'B'/B'C'</p>
                  </div>
                  <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                    <p className="font-semibold text-purple-400">📊 Casos LAL e LLL</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">LAL: 2 lados proporcionais + ângulo igual | LLL: 3 lados proporcionais</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
              titulo: "A Proporcionalidade dos Triângulos",
              artista: "Prof. Rítmico"
            }}
          />

            <QuizInterativo
              questoes={quizM6}
              titulo="QUIZ: Semelhança"
              icone="🔍"
              numero={3}
              variant="blue"
              onComplete={(score) => handleModuleComplete("modulo-6", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 7: TEOREMA DE PITÁGORAS E APLICAÇÕES                      */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <ModuleBanner numero={7}
          titulo="Teorema de Pitágoras e Aplicações"
          descricao="O teorema mais usado em engenharia: cabos, diagonais, alturas e ternas pitagóricas essenciais para concursos."
           variant="blue"/>
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="O Teorema e as Ternas Pitagóricas"
              description="Fórmula, demonstração visual e as ternas que economizam tempo de prova."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Teorema de Pitágoras"
              icone="📐"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "O Teorema",
                  icone: "🔢",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Em todo triângulo retângulo, o <strong>quadrado da hipotenusa</strong> é igual à <strong>soma dos quadrados dos catetos</strong>:
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
                        <p className="text-2xl font-mono font-bold">c² = a² + b²</p>
                        <p className="text-xl mt-1 text-foreground/85 leading-relaxed">c = hipotenusa (oposta ao ângulo reto), a e b = catetos</p>
                      </div>
                      <AlertBox tipo="info" titulo="Contexto Petrobras">
                        Cabos de ancoragem de plataformas, escadas de manutenção, distâncias diagonais em refinarias — todos usam Pitágoras. Um cabo que vai da plataforma (40 m de altura) até o fundo (30 m horizontal) mede: c = √(30² + 40²) = √(900+1600) = √2500 = 50 m.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Ternas Pitagóricas",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        <strong>Ternas pitagóricas</strong> são conjuntos de 3 inteiros positivos que satisfazem c² = a² + b². Memorize as principais:
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                          <div className="p-2 bg-card rounded-lg border border-border">
                            <p className="font-bold text-blue-400">3-4-5</p>
                            <p className="text-lg text-foreground/85 leading-relaxed">e múltiplos: 6-8-10, 30-40-50</p>
                          </div>
                          <div className="p-2 bg-card rounded-lg border border-border">
                            <p className="font-bold text-emerald-400">5-12-13</p>
                            <p className="text-lg text-foreground/85 leading-relaxed">25+144=169✓</p>
                          </div>
                          <div className="p-2 bg-card rounded-lg border border-border">
                            <p className="font-bold text-cyan-400">7-24-25</p>
                            <p className="text-lg text-foreground/85 leading-relaxed">49+576=625✓</p>
                          </div>
                          <div className="p-2 bg-card rounded-lg border border-border">
                            <p className="font-bold text-amber-400">8-15-17</p>
                            <p className="text-lg text-foreground/85 leading-relaxed">64+225=289✓</p>
                          </div>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Macete de Prova">
                        Reconheça a terna antes de calcular! Se a questão tem catetos 9 e 12 → é (9, 12, 15) = 3×(3, 4, 5) → hipotenusa = 15. Se tem 5 e 12 → (5, 12, 13). Economiza 1 a 2 minutos por questão.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Casos Especiais: Quadrado e Triângulo Equilátero",
                  icone: "⬡",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-blue-400 mb-2">Diagonal do Quadrado (lado L):</p>
                          <p className="text-lg font-mono font-bold text-center">d = L√2</p>
                          <p className="text-xl text-center mt-1 text-foreground/85 leading-relaxed">Ex: L=10 → d = 10√2 ≈ 14,14</p>
                        </div>
                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-emerald-400 mb-2">Altura do Equilátero (lado L):</p>
                          <p className="text-lg font-mono font-bold text-center">h = L√3/2</p>
                          <p className="text-xl text-center mt-1 text-foreground/85 leading-relaxed">Ex: L=6 → h = 3√3 ≈ 5,20</p>
                        </div>
                      </div>
                      <AlertBox tipo="danger" titulo="Pegadinha CESGRANRIO">
                        No quadrado de lado L, d = L√2. A banca pode dar d e pedir L: L = d/√2 = d√2/2. Racionalizar! Se d = 10√2 → L = 10. Candidatos que não racionalizam erram a alternativa.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-7" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={"indigo"}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Um suporte triangular de plataforma offshore tem ângulos internos de 90°, 45° e 45°. Como esse triângulo é classificado quanto aos ângulos e quanto aos lados?"
          alternativas={[
            { letra: "A", texto: "Retângulo e isósceles", correta: true },
              { letra: "B", texto: "Obtusângulo e escaleno", correta: false },
              { letra: "C", texto: "Retângulo e equilátero", correta: false },
              { letra: "D", texto: "Acutângulo e isósceles", correta: false },
              { letra: "E", texto: "Retângulo e escaleno", correta: false }
          ]}
          dicaEstrategica="Um triângulo retângulo-isósceles é muito comum em estruturas de suporte."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Com ângulo de 90° é retângulo." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Com dois ângulos iguais (45°), os dois lados opostos são iguais, portanto é isósceles." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa A como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            variant="indigo"
            video={{
              videoId: "v4Zl1qZpXv4",
              title: "Teorema de Pitágoras: Aplicações, Ternas e Problemas Espaciais",
              duration: "13:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 7",
              tituloAula: "Geometria Plana",
              materia: "Matemática",
              images: [
                { title: "c² = a² + b²", type: "Teorema Fundamental", placeholderColor: "bg-indigo-500/20" },
                { title: "Ternas Pitagóricas", type: "Atalhos", placeholderColor: "bg-blue-500/20" },
                { title: "Diagonal do Quadrado = L√2", type: "Aplicação", placeholderColor: "bg-purple-500/20" },
                { title: "Altura do Triângulo Equilátero", type: "Fórmula", placeholderColor: "bg-indigo-400/20" }
              ]
            }}
            maceteVisual={{
              title: "Pulo do Gato: Ternas Pitagóricas",
              content: (
                <div className="space-y-4">
                  <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                    <p className="font-semibold">📏 Fórmula: c² = a² + b²</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">c é a hipotenusa (lado oposto ao ângulo reto). a e b são os catetos. Apenas em triângulos retângulos!</p>
                  </div>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <p className="font-semibold text-blue-400">⚡ Ternas Principais (economize tempo!):</p>
                    <p className="text-xl mt-2 font-mono text-foreground/85 leading-relaxed">3-4-5, 5-12-13, 8-15-17, 7-24-25, 9-40-41, 20-21-29</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Reconheça esses padrões na prova e evite cálculos.</p>
                  </div>
                  <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                    <p className="font-semibold text-purple-400">📐 Aplicações Geométricas:</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Diagonal quadrado: d = L√2 | Altura triângulo equilátero: h = L√3/2</p>
                  </div>
                  <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                    <p className="font-semibold text-rose-400">⚠️ Pegadinha:</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Não confunda: √2 ≠ 2, √3 ≠ 3. Deixe em forma radical na resposta.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
              titulo: "O Ritmo Pitagórico",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM7}
              titulo="QUIZ: Teorema de Pitágoras"
              icone="📐"
              numero={3}
              variant="blue"
              onComplete={(score) => handleModuleComplete("modulo-7", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 8: RAZÃO E ÁREAS SEMELHANTES                              */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <ModuleBanner numero={8}
          titulo="Razão de Semelhança e Áreas"
          descricao="Domine a relação entre razão de semelhança, áreas e volumes — a mais cobrada em questões avançadas de Geometria Plana."
           variant="blue"/>
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Razão de Semelhança × Áreas × Volumes"
              description="O triplo de proporção: lados, superfícies e espaços."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Relações de Proporção em Figuras Semelhantes"
              icone="📊"
              corIndicador="bg-cyan-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "A Regra Fundamental",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-5">
                        <p className="text-xl font-bold text-cyan-400 mb-3 text-center text-foreground/85 leading-relaxed">Para figuras semelhantes com razão k:</p>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border">
                            <span className="text-2xl font-bold text-blue-400 w-12 text-center">k</span>
                            <div>
                              <p className="font-bold text-xl text-foreground/85 leading-relaxed">Razão de Lados e Perímetros</p>
                              <p className="text-lg text-foreground/85 leading-relaxed">Se lados são 3:5 → k = 3/5</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border">
                            <span className="text-2xl font-bold text-emerald-400 w-12 text-center">k²</span>
                            <div>
                              <p className="font-bold text-xl text-foreground/85 leading-relaxed">Razão de Áreas</p>
                              <p className="text-lg text-foreground/85 leading-relaxed">Se k = 3/5 → áreas em razão 9/25</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border">
                            <span className="text-2xl font-bold text-amber-400 w-12 text-center">k³</span>
                            <div>
                              <p className="font-bold text-xl text-foreground/85 leading-relaxed">Razão de Volumes</p>
                              <p className="text-lg text-foreground/85 leading-relaxed">Se k = 3/5 → volumes em razão 27/125</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Macete para Ir e Vir">
                        Dado volume → lado: raiz cúbica. Dado área → lado: raiz quadrada. Dado lado → área: eleve ao quadrado. Dado lado → volume: eleve ao cubo. Memorize a hierarquia: LADO → ÁREA → VOLUME.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Aplicações com Escalas",
                  icone: "🗺️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>Em plantas industriais com escala 1:n, a razão de semelhança é k = 1/n:</p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 space-y-3">
                        <div className="p-3 bg-card rounded-xl border border-border">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-blue-400 mb-1">Escala 1:500</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">k = 1/500. Área real = área_planta × 500² = área_planta × 250.000</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Ex: 8 cm² na planta → 8 × 250.000 = 2.000.000 cm² = 200 m²</p>
                        </div>
                        <div className="p-3 bg-card rounded-xl border border-border">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-emerald-400 mb-1">Maquete em escala 1:50</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">k = 1/50. Volume real = volume_maquete × 50³ = × 125.000</p>
                        </div>
                      </div>
                      <AlertBox tipo="danger" titulo="Pegadinha de Escala">
                        NUNCA multiplique a área da planta pela escala diretamente! Se a escala é 1:500, a área multiplica por 500² = 250.000, não por 500. Esse erro é gravíssimo e muito explorado nas provas.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Ampliação e Redução de Figuras",
                  icone: "🔭",
                  conteudo: (
                    <div className="space-y-4">
                      <p>Se uma figura é ampliada por fator k:</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-3 bg-blue-500/5 rounded-xl border border-blue-500/20 text-center">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-blue-500 mb-1">k = 2</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Lados × 2</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Área × 4</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Volume × 8</p>
                        </div>
                        <div className="p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/20 text-center">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-emerald-500 mb-1">k = 3</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Lados × 3</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Área × 9</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Volume × 27</p>
                        </div>
                        <div className="p-3 bg-cyan-500/5 rounded-xl border border-cyan-500/20 text-center">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-cyan-500 mb-1">k = 1/2</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Lados × 1/2</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Área × 1/4</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Volume × 1/8</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-8" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Um suporte triangular de plataforma offshore tem ângulos internos de 90°, 45° e 45°. Como esse triângulo é classificado quanto aos ângulos e quanto aos lados?"
          alternativas={[
            { letra: "A", texto: "Retângulo e isósceles", correta: true },
              { letra: "B", texto: "Obtusângulo e escaleno", correta: false },
              { letra: "C", texto: "Retângulo e equilátero", correta: false },
              { letra: "D", texto: "Acutângulo e isósceles", correta: false },
              { letra: "E", texto: "Retângulo e escaleno", correta: false }
          ]}
          dicaEstrategica="Um triângulo retângulo-isósceles é muito comum em estruturas de suporte."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Com ângulo de 90° é retângulo." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Com dois ângulos iguais (45°), os dois lados opostos são iguais, portanto é isósceles." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa A como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            variant="blue"
            video={{
              videoId: "JQuBrpJv2K8",
              title: "Razão de Semelhança: Aplicação em Áreas e Volumes de Figuras Semelhantes",
              duration: "14:20"
            }}
            resumoVisual={{
              moduloNome: "Módulo 8",
              tituloAula: "Geometria Plana",
              materia: "Matemática",
              images: [
                { title: "Razão Linear: k", type: "Lados", placeholderColor: "bg-emerald-500/20" },
                { title: "Razão de Áreas: k²", type: "Superfícies", placeholderColor: "bg-green-500/20" },
                { title: "Razão de Volumes: k³", type: "Espaço 3D", placeholderColor: "bg-teal-500/20" },
                { title: "Perímetro também é k", type: "Perímetro", placeholderColor: "bg-emerald-400/20" }
              ]
            }}
            maceteVisual={{
              title: "Pulo do Gato: Não Confundir Razões",
              content: (
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <p className="font-semibold">1️⃣ Razão Linear (lados e perímetro): k</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Se lado₁ = 3 e lado₂ = 6, então k = 2. Perímetro também multiplica por k.</p>
                  </div>
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <p className="font-semibold text-green-400">2️⃣ Razão de Áreas: k²</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Se k = 2, então área₂ = 4 × área₁. ELEVAR AO QUADRADO! Não multiplicar por k.</p>
                  </div>
                  <div className="p-4 bg-teal-500/10 border border-teal-500/20 rounded-xl">
                    <p className="font-semibold text-teal-400">3️⃣ Razão de Volumes: k³</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Se k = 2, então volume₂ = 8 × volume₁. ELEVAR AO CUBO! Não multiplicar por k ou k².</p>
                  </div>
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                    <p className="font-semibold text-amber-400">🎯 Tabela Rápida (k=2):</p>
                    <p className="text-xl mt-2 font-mono text-foreground/85 leading-relaxed">Lados: ×2 | Perímetro: ×2 | Áreas: ×4 | Volumes: ×8</p>
                    <p className="text-amber-600 dark:text-amber-300 font-bold mt-2">⚠️ PEGADINHA MAIS COMUM DA CESGRANRIO!</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
              titulo: "A Progressão das Razões",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM8}
              titulo="QUIZ: Razão de Semelhança"
              icone="📊"
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
          titulo="Aplicações Industriais Petrobras"
          descricao="Seções de dutos, plantas de refinaria, maquetes de plataforma e cálculo de área útil — Geometria Plana no contexto real da Petrobras."
           variant="blue"/>
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Geometria Plana na Indústria de Petróleo"
              description="Como as fórmulas de área e perímetro se aplicam em situações reais da Petrobras."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Cenários Industriais de Aplicação"
              icone="🏭"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Seções Transversais de Dutos",
                  icone: "🔧",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A <strong>seção transversal</strong> de um duto determina a sua capacidade de transporte. Para dutos circulares:
                      </p>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 space-y-2">
                        <p className="text-xl font-bold text-emerald-400 text-foreground/85 leading-relaxed">Área de escoamento (duto sólido):</p>
                        <p className="text-xl font-mono text-foreground/85 leading-relaxed">A = πr²</p>
                        <p className="text-xl font-bold text-blue-400 mt-3 text-foreground/85 leading-relaxed">Área de escoamento (duto oco — mais comum):</p>
                        <p className="text-xl font-mono text-foreground/85 leading-relaxed">A = π(R² − r²) = π(R+r)(R−r)</p>
                        <p className="text-lg text-foreground/85 leading-relaxed mt-1">R = raio externo, r = raio interno (raio do canal interno)</p>
                      </div>
                      <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                        <p className="text-lg text-foreground/85 leading-relaxed font-bold text-blue-500 mb-2">Exemplo prático:</p>
                        <p className="text-xl text-foreground/85 leading-relaxed">Duto de aço com diâmetro externo 20 cm e espessura de parede 2 cm:</p>
                        <p className="text-xl text-foreground/85 leading-relaxed">R = 10 cm, r = 10 − 2 = 8 cm</p>
                        <p className="text-xl font-bold text-foreground/85 leading-relaxed">A = π(100 − 64) = 36π ≈ 113 cm²</p>
                      </div>
                      <AlertBox tipo="warning" titulo="Atenção com Diâmetro vs Raio">
                        A banca dá o DIÂMETRO, mas a fórmula usa o RAIO. Sempre divida por 2 antes de calcular! Esse é o erro mais comum em questões de seção transversal de dutos.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Plantas de Refinaria e Plataformas",
                  icone: "🗺️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Plantas industriais combinam figuras geométricas para calcular áreas de ocupação, cobertura e pavimentação:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-blue-500 mb-2">Área Total − Exclusões</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">A_útil = A_total − A_excluídas</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">Ex: plataforma retangular menos heliporto circular</p>
                        </div>
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-lg text-foreground/85 leading-relaxed font-bold text-emerald-500 mb-2">Escala da Planta</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Área real = área_planta × k²</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">k = fator de escala (ex: 500 para escala 1:500)</p>
                        </div>
                      </div>
                      <AlertBox tipo="info" titulo="Caso Real">
                        A plataforma P-77 da Petrobras tem área de convés de aproximadamente 16.000 m². Em planta 1:2000, a área seria 16.000 × 10.000 / (2000²) = 4 m² (40 cm × 100 cm na planta). Engenheiros trabalham com essas conversões diariamente.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Canais e Seções de Drenagem",
                  icone: "💧",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Canais de drenagem industrial têm seções transversais em formas geométricas definidas para otimizar escoamento:
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 space-y-2">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xl text-foreground/85 leading-relaxed">
                          <div className="p-3 bg-card rounded-xl border border-border text-center">
                            <p className="font-bold text-blue-400">Retangular</p>
                            <p className="font-mono text-lg text-foreground/85 leading-relaxed mt-1">A = b × h</p>
                          </div>
                          <div className="p-3 bg-card rounded-xl border border-border text-center">
                            <p className="font-bold text-emerald-400">Trapezoidal</p>
                            <p className="font-mono text-lg text-foreground/85 leading-relaxed mt-1">A = [(B+b)×h]/2</p>
                          </div>
                          <div className="p-3 bg-card rounded-xl border border-border text-center">
                            <p className="font-bold text-cyan-400">Semicircular</p>
                            <p className="font-mono text-lg text-foreground/85 leading-relaxed mt-1">A = πr²/2</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        A <strong>área molhada</strong> (seção transversal ocupada pelo fluido) é usada no cálculo da vazão Q = A × v, onde v é a velocidade do escoamento.
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-9" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Um suporte triangular de plataforma offshore tem ângulos internos de 90°, 45° e 45°. Como esse triângulo é classificado quanto aos ângulos e quanto aos lados?"
          alternativas={[
            { letra: "A", texto: "Retângulo e isósceles", correta: true },
              { letra: "B", texto: "Obtusângulo e escaleno", correta: false },
              { letra: "C", texto: "Retângulo e equilátero", correta: false },
              { letra: "D", texto: "Acutângulo e isósceles", correta: false },
              { letra: "E", texto: "Retângulo e escaleno", correta: false }
          ]}
          dicaEstrategica="Um triângulo retângulo-isósceles é muito comum em estruturas de suporte."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Com ângulo de 90° é retângulo." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Com dois ângulos iguais (45°), os dois lados opostos são iguais, portanto é isósceles." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa A como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            variant="blue"
            video={{
              videoId: "xKh0_l-Wevs",
              title: "Aplicações Petrobras: Cálculo de Áreas de Concessão, Plataformas e Tanques",
              duration: "16:00"
            }}
            resumoVisual={{
              moduloNome: "Módulo 9",
              tituloAula: "Geometria Plana",
              materia: "Matemática",
              images: [
                { title: "Blocos Exploratórios (polígonos)", type: "Concessão", placeholderColor: "bg-cyan-500/20" },
                { title: "Perímetro de Cercas (segurança)", type: "Limite", placeholderColor: "bg-blue-500/20" },
                { title: "Seção de Dutos (círculo)", type: "Vazão", placeholderColor: "bg-sky-500/20" },
                { title: "Plataformas e Tanques", type: "Estrutura", placeholderColor: "bg-cyan-400/20" }
              ]
            }}
            maceteVisual={{
              title: "Pulo do Gato: Contexto Industrial Petrobras",
              content: (
                <div className="space-y-4">
                  <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                    <p className="font-semibold">🗺️ Blocos Exploratórios (Concessão)</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Áreas poligonais em terra ou mar. Use (n-2)×180° para validar ângulos. Calcule área com coordenadas ou divida em triângulos.</p>
                  </div>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <p className="font-semibold text-blue-400">🔒 Perímetro de Concessão</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Soma dos lados = custo de cercas/demarcação/segurança. Ex: Quadrado 100×100 km → P = 400 km → custo total em R$.</p>
                  </div>
                  <div className="p-4 bg-sky-500/10 border border-sky-500/20 rounded-xl">
                    <p className="font-semibold text-sky-400">⭕ Duto Cilíndrico (Seção)</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Área molhada A = πr² determina vazão Q = A × v (velocidade). Diâmetro é CRÍTICO.</p>
                    <p className="text-xl mt-1 font-mono text-foreground/85 leading-relaxed">Se d dobra → A quadruplica → Q quadruplica</p>
                  </div>
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <p className="font-semibold text-emerald-400">📏 Plataformas e Tanques</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Volume = Área da Base × Altura. Tanque cilíndrico: V = πr² × h. Otimização de espaço.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
              titulo: "Geometria no Poço (Tema Petrobras)",
              artista: "Prof. Rítmico"
            }}
          />

                      <QuizInterativo
              questoes={quizM9}
              titulo="QUIZ: Aplicações Industriais"
              icone="🏭"
              numero={3}
              variant="blue"
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
          descricao="Questões no padrão CESGRANRIO integrando todos os tópicos de Geometria Plana. Prove que você está pronto para a prova real."
           variant="blue"/>
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Revisão Completa: Todas as Fórmulas"
              description="Consulta final antes do simulado — todas as fórmulas de Geometria Plana."
              variant="blue"
              className="mb-6"
            />
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 space-y-4">
              <p className="text-xl font-bold text-blue-400 text-foreground/85 leading-relaxed">FÓRMULAS ESSENCIAIS — GEOMETRIA PLANA</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xl text-foreground/85 leading-relaxed">
                <div className="space-y-2">
                  <p className="font-bold text-emerald-400">Triângulos:</p>
                  <p className="font-mono">A = (b × h) / 2</p>
                  <p className="font-mono">A_equil. = L²√3 / 4</p>
                  <p className="font-mono">Heron: A = √[s(s-a)(s-b)(s-c)]</p>
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-blue-400">Quadriláteros:</p>
                  <p className="font-mono">Retângulo: A = b × h</p>
                  <p className="font-mono">Losango: A = (d₁ × d₂) / 2</p>
                  <p className="font-mono">Trapézio: A = [(B+b)×h] / 2</p>
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-cyan-400">Círculo:</p>
                  <p className="font-mono">Área: A = πr²</p>
                  <p className="font-mono">Circ.: C = 2πr = πd</p>
                  <p className="font-mono">Coroa: A = π(R² − r²)</p>
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-amber-400">Polígonos:</p>
                  <p className="font-mono">Si = (n−2)×180°</p>
                  <p className="font-mono">ângulo_ext = 360°/n</p>
                  <p className="font-mono">Pitágoras: c² = a² + b²</p>
                </div>
              </div>
              <div className="border-t border-border/50 pt-4">
                <p className="font-bold text-emerald-400 mb-2">Semelhança (razão k):</p>
                <p className="font-mono text-xl text-foreground/85 leading-relaxed">Lados → k &nbsp;|&nbsp; Áreas → k² &nbsp;|&nbsp; Volumes → k³</p>
              </div>
            </div>
            <AlertBox tipo="warning" titulo="Estratégia para a Prova CESGRANRIO">
              1. Identifique QUAL figura está sendo descrita antes de escolher a fórmula. 2. Atenção: raio ≠ diâmetro; altura perpendicular ≠ lado oblíquo. 3. Em semelhança, nunca aplique a razão de lados diretamente em áreas. 4. Calcule usando as ternas pitagóricas quando possível para economizar tempo.
            </AlertBox>
          </section>



          <section id="quiz-modulo-10" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={"blue"}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Um suporte triangular de plataforma offshore tem ângulos internos de 90°, 45° e 45°. Como esse triângulo é classificado quanto aos ângulos e quanto aos lados?"
          alternativas={[
            { letra: "A", texto: "Retângulo e isósceles", correta: true },
              { letra: "B", texto: "Obtusângulo e escaleno", correta: false },
              { letra: "C", texto: "Retângulo e equilátero", correta: false },
              { letra: "D", texto: "Acutângulo e isósceles", correta: false },
              { letra: "E", texto: "Retângulo e escaleno", correta: false }
          ]}
          dicaEstrategica="Um triângulo retângulo-isósceles é muito comum em estruturas de suporte."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Com ângulo de 90° é retângulo." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Com dois ângulos iguais (45°), os dois lados opostos são iguais, portanto é isósceles." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa A como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            variant="blue"
            video={{
              videoId: "1N7NcVB0pN8",
              title: "Simulado Mestre: Revisão Completa e Estratégia de Prova para Geometria Plana",
              duration: "18:45"
            }}
            resumoVisual={{
              moduloNome: "Módulo 10",
              tituloAula: "Geometria Plana",
              materia: "Matemática",
              images: [
                { title: "Checklist de Fórmulas", type: "Consolidação", placeholderColor: "bg-blue-500/20" },
                { title: "Estratégia de Leitura", type: "Tática", placeholderColor: "bg-indigo-500/20" },
                { title: "Pegadinhas Comuns", type: "Cuidados", placeholderColor: "bg-cyan-500/20" },
                { title: "Gestão de Tempo", type: "Otimização", placeholderColor: "bg-blue-400/20" }
              ]
            }}
            maceteVisual={{
              title: "Pulo do Gato: Antes da Prova",
              content: (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <p className="font-semibold">✅ Checklist Final de Fórmulas:</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">1. Polígonos: Si = (n-2)×180° | Diagonais: n(n-3)/2</p>
                    <p className="text-xl text-foreground/85 leading-relaxed">2. Triângulos: A = (b×h)/2 | Equilátero: A = L²√3/4 | Heron: √[s(s-a)(s-b)(s-c)]</p>
                    <p className="text-xl text-foreground/85 leading-relaxed">3. Quadriláteros: Retângulo A=b×h | Losango A=(d₁×d₂)/2 | Trapézio A=[(B+b)×h]/2</p>
                    <p className="text-xl text-foreground/85 leading-relaxed">4. Círculo: Perímetro C = 2πr | Área A = πr² | Setor: A = (θ/360°)×πr²</p>
                    <p className="text-xl text-foreground/85 leading-relaxed">5. Pitágoras: c² = a² + b² | Ternas: 3-4-5, 5-12-13, 8-15-17</p>
                    <p className="text-xl text-foreground/85 leading-relaxed">6. Semelhança: Lados k | Áreas k² | Perímetro k</p>
                  </div>
                  <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                    <p className="font-semibold text-indigo-400">🎯 Estratégia de Leitura:</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">1. Leia com atenção: qual figura? | 2. Identifique o que é dado e o que é pedido | 3. Escolha a fórmula certa | 4. Calcule passo a passo</p>
                  </div>
                  <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                    <p className="font-semibold text-cyan-400">🔴 Pegadinhas CESGRANRIO (erros comuns):</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">- Raio ≠ Diâmetro | - Altura ≠ Lado oblíquo | - k² em áreas (nunca k!) | - Ternas pitagóricas economizam cálculos</p>
                    <p className="text-xl text-foreground/85 leading-relaxed">- Desigualdade triangular: a+b &gt; c (ESTRITA) | - Ângulo externo = soma dos remotos</p>
                  </div>
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <p className="font-semibold text-emerald-400">⏱️ Gestão de Tempo:</p>
                    <p className="text-xl mt-2 text-foreground/85 leading-relaxed">2-3 min por questão. Se travar, pule e volte depois. Priorize identificação correta da figura.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
              titulo: "Hino da Geometria Plana",
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
    </AulaTemplate>
  );
}
