import { getAllModuleVariants } from "@/lib/moduleColors";
// Last modified: 2026-03-13 - Upgraded with ModuleConsolidation (4-tab system) and C.E.D.E. pedagogy
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
  LuBookOpen,
  LuLightbulb,
  LuTarget,
  LuTrendingUp,
  LuTrophy,
  LuBrain,
  LuRepeat,
  LuSigma,
  LuZap,
} from "react-icons/lu";

import {
  QUIZ_M1_CONCEITO_PG,
  QUIZ_M2_TERMO_GERAL_PG,
  QUIZ_M3_SOMA_PG,
  QUIZ_M4_SOMA_INFINITA,
  QUIZ_M5_PROPRIEDADES_PG,
  QUIZ_M6_CRESCIMENTO,
  QUIZ_M7_FINANCEIRA,
  QUIZ_M8_PA_VS_PG,
  QUIZ_M9_DESAFIO_PG,
  QUIZ_M10_SIMULADO_PG,
} from "./data/progressoes-pg-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Conceitos Fundamentais" },
  { id: "modulo-2", label: "Módulo 2", title: "Termo Geral" },
  { id: "modulo-3", label: "Módulo 3", title: "Soma Finita" },
  { id: "modulo-4", label: "Módulo 4", title: "Soma Infinita" },
  { id: "modulo-5", label: "Módulo 5", title: "Propriedades" },
  { id: "modulo-6", label: "Módulo 6", title: "Crescimento/Decaimento" },
  { id: "modulo-7", label: "Módulo 7", title: "Matemática Financeira" },
  { id: "modulo-8", label: "Módulo 8", title: "PA vs PG" },
  { id: "modulo-9", label: "Módulo 9", title: "Aplicações Petrobras" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
] as const;

const mv = [undefined, ...getAllModuleVariants()];

export default function AulaProgressoesPg({
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

  const [quizM1] = useState(() => getRandomQuestions(QUIZ_M1_CONCEITO_PG, 4));
  const [quizM2] = useState(() => getRandomQuestions(QUIZ_M2_TERMO_GERAL_PG, 4));
  const [quizM3] = useState(() => getRandomQuestions(QUIZ_M3_SOMA_PG, 4));
  const [quizM4] = useState(() => getRandomQuestions(QUIZ_M4_SOMA_INFINITA, 4));
  const [quizM5] = useState(() => getRandomQuestions(QUIZ_M5_PROPRIEDADES_PG, 5));
  const [quizM6] = useState(() => getRandomQuestions(QUIZ_M6_CRESCIMENTO, 5));
  const [quizM7] = useState(() => getRandomQuestions(QUIZ_M7_FINANCEIRA, 5));
  const [quizM8] = useState(() => getRandomQuestions(QUIZ_M8_PA_VS_PG, 5));
  const [quizM9] = useState(() => getRandomQuestions(QUIZ_M9_DESAFIO_PG, 5));
  const [quizM10] = useState(() => getRandomQuestions(QUIZ_M10_SIMULADO_PG, 5));

  const [hasSyncedInitial, setHasSyncedInitial] = useState(false);
  const [showCompletionBadge, setShowCompletionBadge] = useState(false);

  useEffect(() => {
    if (isCompleted) setShowCompletionBadge(true);
  }, [isCompleted]);

  useEffect(() => {
    if (
      !hasSyncedInitial &&
      !loading &&
      currentProgress !== undefined &&
      currentProgress > 0
    ) {
      const doneCount = Math.floor(
        (currentProgress / 100) * MODULE_DEFS.length,
      );
      const newDone = new Set<string>();
      for (let i = 0; i < doneCount; i++) {
        newDone.add(MODULE_DEFS[i].id);
      }
      setCompletedModules(newDone);
      setHasSyncedInitial(true);
    } else if (!hasSyncedInitial && !loading && currentProgress === 0) {
      setHasSyncedInitial(true);
    }
  }, [currentProgress, hasSyncedInitial, loading]);

  const handleModuleComplete = (moduleId: string, score: number) => {
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

      if (index === MODULE_DEFS.length - 1) {
        setShowCompletionBadge(true);
        onComplete?.();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setTimeout(() => setActiveTab(MODULE_DEFS[index + 1].id), 1500);
      }
    }
  };

  const isModuleUnlocked = (_index: number) => true; // ✅ TODOS OS MÓDULOS DESBLOQUEADOS

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={(val) => {
        const idx = MODULE_DEFS.findIndex((m) => m.id === val);
        if (isModuleUnlocked(idx)) setActiveTab(val);
      }}
      modules={Array.from(MODULE_DEFS)}
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
      currentProgress={Math.round(
        (completedModules.size / MODULE_DEFS.length) * 100,
      )}
      onComplete={onComplete}
      loading={loading}
      xpGanho={xpGanho}
    >
      {/* ═══ MÓDULO 1: CONCEITOS FUNDAMENTAIS ═══ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={1}
            titulo="Conceitos Fundamentais de PG"
            descricao="A razão que multiplica: progressão geométrica explicada."
             variant={mv[1]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Sequência que Multiplica"
              description="Entenda a razão q e o primeiro termo a₁."
              variant="blue"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - O que é PG?",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Uma Progressão Geométrica é uma sequência onde cada termo é obtido multiplicando o anterior por uma constante chamada <strong>razão (q)</strong>.
                      </p>
                      <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
                        <p className="font-bold text-blue-700 mb-2">PG: a₁, a₂, a₃, ...</p>
                        <p className="text-sm">a₂ = a₁ × q</p>
                        <p className="text-sm">a₃ = a₂ × q = a₁ × q²</p>
                        <p className="text-sm">aₙ = a₁ × q^(n-1)</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Casos Práticos",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">Veja PGs em contextos reais:</p>
                      <div className="space-y-2">
                        <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20">
                          <p className="font-bold text-blue-700 text-sm">Crescimento: (2, 4, 8, 16, ...)</p>
                          <p className="text-xs">a₁ = 2, q = 2 (duplica)</p>
                        </div>
                        <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20">
                          <p className="font-bold text-blue-700 text-sm">Decaimento: (100, 50, 25, 12.5, ...)</p>
                          <p className="text-xs">a₁ = 100, q = 0.5 (metade)</p>
                        </div>
                        <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20">
                          <p className="font-bold text-blue-700 text-sm">Negativos: (1, -2, 4, -8, ...)</p>
                          <p className="text-xs">a₁ = 1, q = -2 (alternado)</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Reconhecendo PG",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="info" titulo="Teste da Razão">
                        <p className="text-sm">
                          Divida dois termos consecutivos. Se o resultado é sempre o mesmo, é PG!
                        </p>
                      </AlertBox>
                      <p className="text-sm text-muted-foreground">
                        Sequência (3, 6, 12, 24): 6/3 = 2, 12/6 = 2, 24/12 = 2 ✓ É PG com q = 2
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Casos Especiais",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20">
                        <p className="font-bold text-blue-700 text-sm mb-1">PG Constante: q = 1</p>
                        <p className="text-xs">(5, 5, 5, ...) todos iguais</p>
                      </div>
                      <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20">
                        <p className="font-bold text-blue-700 text-sm mb-1">PG Nula: a₁ = 0</p>
                        <p className="text-xs">(0, 0, 0, ...) todos zero</p>
                      </div>
                      <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20">
                        <p className="font-bold text-blue-700 text-sm mb-1">q Negativo: q &lt; 0</p>
                        <p className="text-xs">Termos alternam de sinal</p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-1" className="mt-16">
          











<ModuleConsolidation
            index={2}
            variant="blue"
            video={{
              videoId: "gZDzgZxrvAo",
              title: "PG: Conceitos Fundamentais",
              duration: "10:20",
            }}
            resumoVisual={{
              moduloNome: "Módulo 1",
              tituloAula: "Progressões Geométricas",
              materia: "Matemática",
              images: [
                {
                  title: "PG: Multiplicação Constante",
                  type: "Conceito",
                  placeholderColor: "bg-blue-500/20",
                },
                {
                  title: "Razão q e Termo Geral",
                  type: "Técnica",
                  placeholderColor: "bg-sky-500/20",
                },
                {
                  title: "Crescimento e Decaimento",
                  type: "Aplicação",
                  placeholderColor: "bg-cyan-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "PG: Sempre Multiplica!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-sm italic">
                    "Na PG, cada termo é o anterior vezes q. Simples assim!"
                  </p>
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg font-mono text-xs text-center">
                    <p>PG: (2, 6, 18, 54, ...)</p>
                    <p className="text-xs text-muted-foreground">a₁ = 2</p>
                    <p className="text-xs text-muted-foreground">q = 3</p>
                  </div>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "PG: Conceitos Fundamentais",
              artista: "Prof. Progressões",
            }}
          />

                      <QuizInterativo
              questoes={quizM1}
              titulo="QUIZ: Módulo Nº 1"
              numero={3}
              variant="blue"
              icone="🧠"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 2: TERMO GERAL ═══ */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={2}
            titulo="Termo Geral da PG"
            descricao="A fórmula para encontrar qualquer termo sem calcular todos."
             variant={mv[2]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Fórmula do Termo Geral"
              description="aₙ = a₁ × q^(n-1)"
              variant="emerald"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - A Fórmula",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        A fórmula do termo geral permite encontrar qualquer termo sem calcular os anteriores.
                      </p>
                      <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                        <p className="font-mono font-bold text-center text-emerald-700">aₙ = a₁ × q^(n-1)</p>
                        <div className="mt-4 space-y-2 text-sm">
                          <p><strong>aₙ</strong> = termo procurado</p>
                          <p><strong>a₁</strong> = primeiro termo</p>
                          <p><strong>q</strong> = razão</p>
                          <p><strong>n</strong> = posição do termo</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Aplicando a Fórmula",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">Encontre o 5º termo de (2, 6, 18, ...):</p>
                      <div className="bg-emerald-500/10 p-4 rounded border border-emerald-500/20">
                        <p className="font-mono text-sm text-center">a₅ = 2 × 3^(5-1) = 2 × 3⁴ = 2 × 81 = 162</p>
                      </div>
                      <AlertBox tipo="success" titulo="Vantagem">
                        Sem a fórmula, teria que calcular: 2 → 6 → 18 → 54 → 162
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Evite Erros Comuns",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-3">
                      <AlertBox tipo="warning" titulo="Atenção ao Expoente!">
                        O expoente é (n-1), NÃO n! Se procura o 5º termo, use q⁴, não q⁵.
                      </AlertBox>
                      <p className="text-sm text-muted-foreground">
                        Posição 1 → expoente 0 (a₁ = a₁ × q⁰ = a₁)
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Valores Especiais de q",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <div className="bg-emerald-500/10 p-3 rounded border border-emerald-500/20">
                        <p className="font-bold text-emerald-700 text-sm mb-1">q = 1: PG Constante</p>
                        <p className="text-xs">aₙ = a₁ (todos os termos iguais)</p>
                      </div>
                      <div className="bg-emerald-500/10 p-3 rounded border border-emerald-500/20">
                        <p className="font-bold text-emerald-700 text-sm mb-1">0 {'<'} q {'<'} 1: Decaimento</p>
                        <p className="text-xs">Termos diminuem (mais lentamente)</p>
                      </div>
                      <div className="bg-emerald-500/10 p-3 rounded border border-emerald-500/20">
                        <p className="font-bold text-emerald-700 text-sm mb-1">q {'<'} 0: Alternado</p>
                        <p className="text-xs">Sinais alternados, módulo aumenta</p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-2" className="mt-16">
          











<ModuleConsolidation
            index={2}
            variant="emerald"
            video={{
              videoId: "2Aq7p7-VgEU",
              title: "PG: Termo Geral Explicado",
              duration: "12:15",
            }}
            resumoVisual={{
              moduloNome: "Módulo 2",
              tituloAula: "Progressões Geométricas",
              materia: "Matemática",
              images: [
                {
                  title: "Fórmula: aₙ = a₁ × q^(n-1)",
                  type: "Conceito",
                  placeholderColor: "bg-emerald-500/20",
                },
                {
                  title: "Identifique a₁ e q",
                  type: "Técnica",
                  placeholderColor: "bg-teal-500/20",
                },
                {
                  title: "Calcule Qualquer Termo",
                  type: "Aplicação",
                  placeholderColor: "bg-green-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Termo Geral: aₙ = a₁ × q^(n-1)!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-sm italic">
                    "Nunca calcule todos os termos. Use a fórmula!"
                  </p>
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg font-mono text-xs text-center">
                    <p>PG: (3, 6, 12, ...)</p>
                    <p className="text-xs text-muted-foreground">a₁ = 3, q = 2</p>
                    <p>a₁₀ = 3 × 2⁹ = 1536</p>
                  </div>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
              titulo: "PG: Termo Geral",
              artista: "Prof. Progressões",
            }}
          />

                      <QuizInterativo
              questoes={quizM2}
              titulo="Fixação - Termo Geral"
              numero={3}
              variant="emerald"
              icone="🎯"
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 3: SOMA FINITA ═══ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={3}
            titulo="Soma de Termos (Finita)"
            descricao="Calcule a soma dos primeiros n termos de uma PG."
             variant={mv[3]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Soma dos Primeiros n Termos"
              description="Fórmula e aplicações práticas."
              variant="amber"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - A Fórmula de Soma",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        A soma dos n primeiros termos é dada pela fórmula:
                      </p>
                      <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20">
                        <p className="font-mono font-bold text-center text-amber-700 mb-3">Sₙ = a₁ × (1 - q^n) / (1 - q)</p>
                        <p className="text-xs text-muted-foreground text-center">
                          (válida quando q ≠ 1)
                        </p>
                        <p className="text-sm mt-3">Se q = 1: Sₙ = a₁ × n</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Soma Prática",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Calcule a soma dos 4 primeiros termos de (2, 6, 18, 54):
                      </p>
                      <div className="bg-amber-500/10 p-4 rounded border border-amber-500/20">
                        <p className="font-mono text-xs text-center">
                          a₁ = 2, q = 3, n = 4
                          <br />
                          S₄ = 2 × (1 - 3⁴) / (1 - 3)
                          <br />
                          S₄ = 2 × (1 - 81) / (-2)
                          <br />
                          S₄ = 2 × (-80) / (-2) = 80
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        Verificação: 2 + 6 + 18 + 54 = 80 ✓
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Manejo de Frações",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-3">
                      <AlertBox tipo="warning" titulo="Cuidado com o Sinal">
                        Se q &gt; 1, (1 - q^n) é negativo. (1 - q) também é negativo. Negativo ÷ negativo = positivo!
                      </AlertBox>
                      <p className="text-sm text-muted-foreground">
                        Sempre simplifique antes de calcular potências grandes.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Caso q = 1",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <div className="bg-amber-500/10 p-3 rounded border border-amber-500/20">
                        <p className="font-bold text-amber-700 text-sm mb-1">
                          PG Constante (q = 1):
                        </p>
                        <p className="text-xs">
                          Fórmula de denominador zero não aplica.
                        </p>
                        <p className="text-xs mt-2 font-mono">Sₙ = a₁ × n</p>
                        <p className="text-xs text-muted-foreground">
                          Ex: (5, 5, 5, 5) → S₄ = 5 × 4 = 20
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-3" className="mt-16">
          











<ModuleConsolidation
            index={2}
            variant="amber"
            video={{
              videoId: "4KzE9R6zWzY",
              title: "PG: Soma Finita",
              duration: "11:50",
            }}
            resumoVisual={{
              moduloNome: "Módulo 3",
              tituloAula: "Progressões Geométricas",
              materia: "Matemática",
              images: [
                {
                  title: "Fórmula: Sₙ = a₁(1-q^n)/(1-q)",
                  type: "Conceito",
                  placeholderColor: "bg-amber-500/20",
                },
                {
                  title: "Identifique Parâmetros",
                  type: "Técnica",
                  placeholderColor: "bg-orange-500/20",
                },
                {
                  title: "Calcule a Soma",
                  type: "Aplicação",
                  placeholderColor: "bg-yellow-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Soma Finita: Fórmula de Ouro!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-sm italic">
                    "Não some manualmente! Use Sₙ = a₁(1-q^n)/(1-q)"
                  </p>
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg font-mono text-xs text-center">
                    <p>PG: (1, 2, 4, 8, ...)</p>
                    <p className="text-xs text-muted-foreground">
                      S₆ = 1 × (1-2⁶)/(1-2)
                    </p>
                    <p>= (1-64)/(-1) = 63</p>
                  </div>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
              titulo: "PG: Soma Finita",
              artista: "Prof. Progressões",
            }}
          />

                      <QuizInterativo
              questoes={quizM3}
              titulo="QUIZ: Módulo Nº 3"
              numero={3}
              variant="amber"
              icone="🎯"
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 4: SOMA INFINITA ═══ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={4}
            titulo="Soma Infinita (Série PG)"
            descricao="O limite da soma quando n tende ao infinito."
             variant={mv[4]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Série Geométrica Infinita"
              description="Convergência e limite da série."
              variant="cyan"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Série Infinita",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Para |q| {'<'} 1, a série infinita converge a um limite finito:
                      </p>
                      <div className="bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20">
                        <p className="font-mono font-bold text-center text-cyan-700 mb-3">S∞ = a₁ / (1 - q)</p>
                        <p className="text-sm mt-3">
                          <strong>Válida somente se |q| {'<'} 1</strong>
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Se |q| ≥ 1, a série diverge (não converge).
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Série Convergente",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Calcule a soma infinita de (1, 1/2, 1/4, 1/8, ...):
                      </p>
                      <div className="bg-cyan-500/10 p-4 rounded border border-cyan-500/20">
                        <p className="font-mono text-xs text-center">
                          a₁ = 1, q = 1/2 (|q| = 0.5 {'<'} 1 ✓)
                          <br />
                          S∞ = 1 / (1 - 1/2) = 1 / (1/2) = 2
                        </p>
                      </div>
                      <AlertBox tipo="success" titulo="Resultado">
                        A série infinita soma 2, mesmo tendo infinitos termos!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Reconhecendo Convergência",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-3">
                      <div className="bg-cyan-500/10 p-3 rounded border border-cyan-500/20">
                        <p className="font-bold text-cyan-700 text-sm mb-1">
                          |q| {'<'} 1: CONVERGE
                        </p>
                        <p className="text-xs">Série tem soma finita</p>
                      </div>
                      <div className="bg-cyan-500/10 p-3 rounded border border-cyan-500/20">
                        <p className="font-bold text-cyan-700 text-sm mb-1">
                          |q| ≥ 1: DIVERGE
                        </p>
                        <p className="text-xs">Série não tem soma (ou é infinita)</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Casos Especiais",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <div className="bg-cyan-500/10 p-3 rounded border border-cyan-500/20">
                        <p className="font-bold text-cyan-700 text-sm mb-1">
                          a₁ = 0:
                        </p>
                        <p className="text-xs">S∞ = 0 (série nula)</p>
                      </div>
                      <div className="bg-cyan-500/10 p-3 rounded border border-cyan-500/20">
                        <p className="font-bold text-cyan-700 text-sm mb-1">
                          q = 0:
                        </p>
                        <p className="text-xs">S∞ = a₁ (apenas 1º termo)</p>
                      </div>
                      <div className="bg-cyan-500/10 p-3 rounded border border-cyan-500/20">
                        <p className="font-bold text-cyan-700 text-sm mb-1">
                          q negativo:
                        </p>
                        <p className="text-xs">
                          Converge se -1 &lt; q &lt; 1, mesmo com sinais alternados
                        </p>
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
            variant="cyan"
            video={{
              videoId: "9KZg0LdwAg4",
              title: "PG Infinita: Série Convergente",
              duration: "13:40",
            }}
            resumoVisual={{
              moduloNome: "Módulo 4",
              tituloAula: "Progressões Geométricas",
              materia: "Matemática",
              images: [
                {
                  title: "Convergência: |q| < 1",
                  type: "Conceito",
                  placeholderColor: "bg-cyan-500/20",
                },
                {
                  title: "Fórmula: S∞ = a₁/(1-q)",
                  type: "Técnica",
                  placeholderColor: "bg-sky-500/20",
                },
                {
                  title: "Soma Infinita Finita",
                  type: "Aplicação",
                  placeholderColor: "bg-blue-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Série Infinita: Só se |q| < 1!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-sm italic">
                    "Infinitos termos podem somar finito se a razão for bem pequena."
                  </p>
                  <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg font-mono text-xs text-center">
                    <p>Série: 1 + 0.1 + 0.01 + 0.001 + ...</p>
                    <p className="text-xs text-muted-foreground">a₁=1, q=0.1</p>
                    <p>S∞ = 1/(1-0.1) = 1/0.9 = 10/9</p>
                  </div>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
              titulo: "PG Infinita: Série Geométrica",
              artista: "Prof. Progressões",
            }}
          />

                      <QuizInterativo
              questoes={quizM4}
              titulo="Fixação - Soma Infinita"
              numero={3}
              variant="cyan"
              icone="🎯"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 5: PROPRIEDADES ═══ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={5}
            titulo="Propriedades Especiais de PG"
            descricao="Relações e padrões únicos das progressões geométricas."
             variant={mv[5]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Propriedades Importantes"
              description="Produtos, meios geométricos e simetrias."
              variant="violet"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Produto de Termos",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Em uma PG, o produto de termos equidistantes dos extremos é constante:
                      </p>
                      <div className="bg-violet-500/10 p-4 rounded-xl border border-violet-500/20">
                        <p className="font-mono font-bold text-center text-violet-700 mb-3">
                          a₁ × aₙ = a₂ × aₙ₋₁ = a₃ × aₙ₋₂ = ... = aₖ × aₙ₊₁₋ₖ
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Produto de Extremos",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Na PG (2, 4, 8, 16, 32, 64):
                      </p>
                      <div className="bg-violet-500/10 p-4 rounded border border-violet-500/20">
                        <p className="font-mono text-xs text-center">
                          a₁ × a₆ = 2 × 64 = 128
                          <br />
                          a₂ × a₅ = 4 × 32 = 128
                          <br />
                          a₃ × a₄ = 8 × 16 = 128
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Meio Geométrico",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="info" titulo="Três Termos em PG">
                        <p className="text-sm">
                          Se a, b, c estão em PG, então <strong>b² = a × c</strong>
                        </p>
                      </AlertBox>
                      <p className="text-sm text-muted-foreground">
                        Ex: (3, 6, 12) → 6² = 36 = 3 × 12 ✓
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Termos Negativos",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <div className="bg-violet-500/10 p-3 rounded border border-violet-500/20">
                        <p className="font-bold text-violet-700 text-sm mb-1">
                          Razão Negativa (q &lt; 0):
                        </p>
                        <p className="text-xs">
                          Termos alternando positivo e negativo. Produto segue padrão.
                        </p>
                      </div>
                      <div className="bg-violet-500/10 p-3 rounded border border-violet-500/20">
                        <p className="font-bold text-violet-700 text-sm mb-1">
                          Simetria:
                        </p>
                        <p className="text-xs">
                          Número ímpar de termos: termo central é a raiz do produto
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-5" className="mt-16">
          











<ModuleConsolidation
            index={2}
            variant="violet"
            video={{
              videoId: "7Pg5MZV2XqU",
              title: "PG: Propriedades Especiais",
              duration: "10:50",
            }}
            resumoVisual={{
              moduloNome: "Módulo 5",
              tituloAula: "Progressões Geométricas",
              materia: "Matemática",
              images: [
                {
                  title: "Produto de Extremos",
                  type: "Conceito",
                  placeholderColor: "bg-violet-500/20",
                },
                {
                  title: "Meio Geométrico: b² = ac",
                  type: "Técnica",
                  placeholderColor: "bg-purple-500/20",
                },
                {
                  title: "Simetria de Produtos",
                  type: "Aplicação",
                  placeholderColor: "bg-fuchsia-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Propriedade: Produto Simétrico!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-sm italic">
                    "Termos equidistantes: a₁×aₙ = a₂×aₙ₋₁ = etc."
                  </p>
                  <div className="p-3 bg-violet-500/10 border border-violet-500/20 rounded-lg font-mono text-xs text-center">
                    <p>PG: (1, 2, 4, 8, 16)</p>
                    <p className="text-xs text-muted-foreground">1×16 = 16</p>
                    <p className="text-xs text-muted-foreground">2×8 = 16</p>
                    <p className="text-xs text-muted-foreground">4×4 = 16</p>
                  </div>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
              titulo: "PG: Propriedades",
              artista: "Prof. Progressões",
            }}
          />

                      <QuizInterativo
              questoes={quizM5}
              titulo="QUIZ: Módulo Nº 5"
              numero={3}
              variant="violet"
              icone="🧠"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 6: CRESCIMENTO/DECAIMENTO ═══ */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={6}
            titulo="Crescimento e Decaimento"
            descricao="Exponencial na natureza: população, radioatividade, juros."
             variant={mv[6]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="PG Aplicada a Fenômenos Naturais"
              description="Exponencial explica crescimento rápido ou decaimento lento."
              variant="cyan"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Crescimento Exponencial",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Quando algo cresce multiplicando por uma constante &gt; 1 cada período:
                      </p>
                      <div className="bg-teal-500/10 p-4 rounded-xl border border-teal-500/20">
                        <p className="text-sm mb-2">
                          <strong>População</strong>: dobra a cada ano
                        </p>
                        <p className="font-mono text-xs">P₀, 2P₀, 4P₀, 8P₀, ... (q=2)</p>
                        <p className="text-sm mt-3">
                          <strong>Investimento</strong>: cresce 10% ao ano
                        </p>
                        <p className="font-mono text-xs">M₀, 1.1M₀, 1.21M₀, ... (q=1.1)</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Decaimento Exponencial",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        Quando algo decresce multiplicando por constante &lt; 1 cada período:
                      </p>
                      <div className="bg-teal-500/10 p-4 rounded border border-teal-500/20">
                        <p className="text-sm mb-2">
                          <strong>Radioatividade</strong>: meia-vida
                        </p>
                        <p className="font-mono text-xs">
                          M₀, M₀/2, M₀/4, M₀/8, ... (q=0.5)
                        </p>
                        <p className="text-sm mt-3">
                          <strong>Depreciação</strong>: perde 20% ao ano
                        </p>
                        <p className="font-mono text-xs">V₀, 0.8V₀, 0.64V₀, ... (q=0.8)</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Identificando q",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-3">
                      <AlertBox tipo="info" titulo="Crescimento/Decaimento">
                        Se cresce x% ao ano: q = 1 + x/100
                        <br />
                        Se decresce x% ao ano: q = 1 - x/100
                      </AlertBox>
                      <p className="text-sm text-muted-foreground">
                        Ex: +25% ao ano → q = 1.25; -10% ao ano → q = 0.9
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Meia-Vida e Períodos",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <div className="bg-teal-500/10 p-3 rounded border border-teal-500/20">
                        <p className="font-bold text-teal-700 text-sm mb-1">
                          Meia-Vida:
                        </p>
                        <p className="text-xs">
                          Tempo necessário para quantidade reduzir à metade
                        </p>
                      </div>
                      <div className="bg-teal-500/10 p-3 rounded border border-teal-500/20">
                        <p className="font-bold text-teal-700 text-sm mb-1">
                          Período Composto:
                        </p>
                        <p className="text-xs">
                          Se taxa é anual, mas período é mensal, ajuste q
                        </p>
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
            variant="cyan"
            video={{
              videoId: "tZzgzUaHdCw",
              title: "Crescimento Exponencial: Aplicações",
              duration: "12:25",
            }}
            resumoVisual={{
              moduloNome: "Módulo 6",
              tituloAula: "Progressões Geométricas",
              materia: "Matemática",
              images: [
                {
                  title: "q > 1: Crescimento",
                  type: "Conceito",
                  placeholderColor: "bg-teal-500/20",
                },
                {
                  title: "0 < q < 1: Decaimento",
                  type: "Técnica",
                  placeholderColor: "bg-cyan-500/20",
                },
                {
                  title: "Aplicações Naturais",
                  type: "Aplicação",
                  placeholderColor: "bg-blue-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Exponencial: Rápido!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-sm italic">
                    "Crescimento/decaimento sempre por multiplicação constante q"
                  </p>
                  <div className="p-3 bg-teal-500/10 border border-teal-500/20 rounded-lg font-mono text-xs text-center">
                    <p>População dobra/ano</p>
                    <p className="text-xs text-muted-foreground">a₁ = 100, q = 2</p>
                    <p>Ano 5: 100 × 2⁴ = 1600</p>
                  </div>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
              titulo: "Crescimento Exponencial",
              artista: "Prof. Progressões",
            }}
          />

                      <QuizInterativo
              questoes={quizM6}
              titulo="Fixação - Crescimento/Decaimento"
              numero={3}
              variant="cyan"
              icone="🎯"
              onComplete={(score) => handleModuleComplete("modulo-6", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 7: MATEMÁTICA FINANCEIRA ═══ */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={7}
            titulo="Matemática Financeira com PG"
            descricao="Juros compostos, prestações e investimentos."
             variant={mv[7]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Finanças Modeladas por PG"
              description="Juros e prestações são progressões geométricas."
              variant="indigo"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Juros Compostos",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Quando juros incidem sobre juros, o montante cresce em PG:
                      </p>
                      <div className="bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20">
                        <p className="font-mono font-bold text-center text-indigo-700 mb-2">
                          M = C × (1 + i)^t
                        </p>
                        <p className="text-sm mt-2">
                          <strong>M</strong> = montante final
                          <br />
                          <strong>C</strong> = capital inicial
                          <br />
                          <strong>i</strong> = taxa de juros por período
                          <br />
                          <strong>t</strong> = número de períodos
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Juros Compostos na Prática",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        R$ 1000 aplicado a 10% ao ano por 3 anos:
                      </p>
                      <div className="bg-indigo-500/10 p-4 rounded border border-indigo-500/20">
                        <p className="font-mono text-xs text-center">
                          M = 1000 × (1.1)³
                          <br />
                          M = 1000 × 1.331 = R$ 1.331
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        Cronograma: 1000 → 1100 → 1210 → 1331 (PG com q=1.1)
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Série de Pagamentos",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="info" titulo="Financiamento">
                        <p className="text-sm">
                          Prestações iguais com juros formam uma série PG. Soma finita resolve!
                        </p>
                      </AlertBox>
                      <p className="text-sm text-muted-foreground">
                        Prestação P, taxa i: VP = P × [1-(1+i)^-n] / i
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Diferentes Períodos",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <div className="bg-indigo-500/10 p-3 rounded border border-indigo-500/20">
                        <p className="font-bold text-indigo-700 text-sm mb-1">
                          Taxa Nominal vs Efetiva:
                        </p>
                        <p className="text-xs">
                          Anual com capitalização mensal exige ajuste de taxa
                        </p>
                      </div>
                      <div className="bg-indigo-500/10 p-3 rounded border border-indigo-500/20">
                        <p className="font-bold text-indigo-700 text-sm mb-1">
                          Inflação Acumulada:
                        </p>
                        <p className="text-xs">
                          Produto de inflações mensais forma PG
                        </p>
                      </div>
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
              videoId: "5Rw9KzK3jqA",
              title: "Juros Compostos: Progressão Geométrica",
              duration: "13:10",
            }}
            resumoVisual={{
              moduloNome: "Módulo 7",
              tituloAula: "Progressões Geométricas",
              materia: "Matemática",
              images: [
                {
                  title: "M = C(1+i)^t",
                  type: "Conceito",
                  placeholderColor: "bg-indigo-500/20",
                },
                {
                  title: "Montante Cresce em PG",
                  type: "Técnica",
                  placeholderColor: "bg-blue-500/20",
                },
                {
                  title: "Série de Pagamentos",
                  type: "Aplicação",
                  placeholderColor: "bg-purple-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Finanças: PG do Montante!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-sm italic">
                    "Juros compostos: cada período multiplica por (1+i)"
                  </p>
                  <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg font-mono text-xs text-center">
                    <p>R$ 1000, taxa 5%/ano, 4 anos</p>
                    <p className="text-xs text-muted-foreground">a₁ = 1000</p>
                    <p className="text-xs text-muted-foreground">q = 1.05</p>
                    <p>M₄ = 1000 × 1.05⁴ ≈ 1216</p>
                  </div>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
              titulo: "Juros Compostos: Financeiro",
              artista: "Prof. Progressões",
            }}
          />

                      <QuizInterativo
              questoes={quizM7}
              titulo="QUIZ: Módulo Nº 7"
              numero={3}
              variant="indigo"
              icone="🎯"
              onComplete={(score) => handleModuleComplete("modulo-7", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 8: PA vs PG ═══ */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={8}
            titulo="Comparação: PA vs PG"
            descricao="Diferenças fundamentais entre progressão aritmética e geométrica."
             variant={mv[8]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Duas Famílias de Sequências"
              description="Quando usar PA, quando usar PG."
              variant="rose"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - PA: Soma Constante",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        PA adiciona/subtrai constante. PG multiplica/divide constante.
                      </p>
                      <div className="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20">
                        <p className="font-bold text-rose-700 mb-2">PA (Aritmética)</p>
                        <p className="font-mono text-sm">aₙ = a₁ + (n-1)r</p>
                        <p className="text-xs mt-2">Adição constante r</p>
                      </div>
                      <div className="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20">
                        <p className="font-bold text-rose-700 mb-2">PG (Geométrica)</p>
                        <p className="font-mono text-sm">aₙ = a₁ × q^(n-1)</p>
                        <p className="text-xs mt-2">Multiplicação constante q</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Crescimento Comparado",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        PA (1, 3, 5, 7, ...): cresce por +2
                        <br />
                        PG (2, 4, 8, 16, ...): cresce por ×2
                      </p>
                      <div className="bg-rose-500/10 p-4 rounded border border-rose-500/20">
                        <p className="font-mono text-xs text-center">
                          n=10:
                          <br />
                          PA: 1 + 9×2 = 19 (cresce lentamente)
                          <br />
                          PG: 2 × 2⁹ = 1024 (explode)
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Reconhecendo Cada Uma",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-3">
                      <AlertBox tipo="info" titulo="Teste Rápido">
                        <p className="text-sm">
                          Divida dois termos: se razão é constante = PG. Subtraia: se diferença é constante = PA.
                        </p>
                      </AlertBox>
                      <p className="text-sm text-muted-foreground">
                        (10, 20, 30, 40): PA (r=10) | (10, 20, 40, 80): PG (q=2)
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Termos em Comum",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <div className="bg-rose-500/10 p-3 rounded border border-rose-500/20">
                        <p className="font-bold text-rose-700 text-sm mb-1">
                          Sequência Constante:
                        </p>
                        <p className="text-xs">PA com r=0 E PG com q=1</p>
                      </div>
                      <div className="bg-rose-500/10 p-3 rounded border border-rose-500/20">
                        <p className="font-bold text-rose-700 text-sm mb-1">
                          Justaposição:
                        </p>
                        <p className="text-xs">
                          Uma sequência pode ser PA de certos termos e PG de outros
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-8" className="mt-16">
          











<ModuleConsolidation
            index={2}
            variant="rose"
            video={{
              videoId: "2xQr4vZ5M1I",
              title: "PA vs PG: Comparação Completa",
              duration: "11:30",
            }}
            resumoVisual={{
              moduloNome: "Módulo 8",
              tituloAula: "Progressões Geométricas",
              materia: "Matemática",
              images: [
                {
                  title: "PA: Adição; PG: Multiplicação",
                  type: "Conceito",
                  placeholderColor: "bg-rose-500/20",
                },
                {
                  title: "Crescimento Linear vs Exponencial",
                  type: "Técnica",
                  placeholderColor: "bg-red-500/20",
                },
                {
                  title: "Quando Cada Uma Domina",
                  type: "Aplicação",
                  placeholderColor: "bg-pink-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "PA vs PG: Operações Diferentes!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-sm italic">
                    "PA soma, PG multiplica. Exponencial sempre vence no fim."
                  </p>
                  <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg font-mono text-xs text-center">
                    <p>PA: 1,2,3,4,5 (n=100 → 100)</p>
                    <p className="text-xs text-muted-foreground">
                      vs
                    </p>
                    <p>PG: 1,2,4,8,16 (n=10 → 512)</p>
                  </div>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
              titulo: "PA vs PG: Comparação",
              artista: "Prof. Progressões",
            }}
          />

                      <QuizInterativo
              questoes={quizM8}
              titulo="Fixação - PA vs PG"
              numero={3}
              variant="rose"
              icone="🎯"
              onComplete={(score) => handleModuleComplete("modulo-8", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 9: APLICAÇÕES PETROBRAS ═══ */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={9}
            titulo="Aplicações Petrobras"
            descricao="Produção, reservas e investimentos em óleo e gás."
             variant={mv[9]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Progressões Geométricas na Indústria"
              description="Crescimento de produção, depleção de reservas."
              variant="amber"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Crescimento de Produção",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Na Petrobras, a produção frequentemente cresce em percentual fixo ao ano:
                      </p>
                      <div className="bg-orange-500/10 p-4 rounded-xl border border-orange-500/20">
                        <p className="text-sm">
                          <strong>Exemplo</strong>: Campo aumenta produção 15% ao ano
                        </p>
                        <p className="font-mono text-xs mt-2">
                          P₀ = 1000 barris/dia
                          <br />
                          P₁ = 1150, P₂ = 1323, P₃ = 1521, ...
                          <br />
                          PG com a₁=1000, q=1.15
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Depleção de Reservas",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        Reserva diminui conforme poços são drenados:
                      </p>
                      <div className="bg-orange-500/10 p-4 rounded border border-orange-500/20">
                        <p className="text-sm mb-2">
                          <strong>Meia-vida de poço</strong>: 10 anos
                        </p>
                        <p className="font-mono text-xs">
                          R₀ = 500M barris
                          <br />
                          A cada 10 anos: ÷2
                          <br />
                          PG: 500M, 250M, 125M, 62.5M, ...
                          <br />
                          q = 0.5
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Planejamento Estratégico",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="info" titulo="Decisões Corporativas">
                        <p className="text-sm">
                          Quanto investir em exploração futura considerando crescimento projetado (PG)?
                        </p>
                      </AlertBox>
                      <p className="text-sm text-muted-foreground">
                        Usa-se Sₙ para calcular produção total acumulada em 5 anos, por exemplo.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Oscilações de Mercado",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <div className="bg-orange-500/10 p-3 rounded border border-orange-500/20">
                        <p className="font-bold text-orange-700 text-sm mb-1">
                          Preço do Barril:
                        </p>
                        <p className="text-xs">
                          Não segue PG (mercado volátil). Usa-se projeções
                        </p>
                      </div>
                      <div className="bg-orange-500/10 p-3 rounded border border-orange-500/20">
                        <p className="font-bold text-orange-700 text-sm mb-1">
                          Taxa de Câmbio:
                        </p>
                        <p className="text-xs">
                          Afeta receitas em real. Modelado separadamente
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-9" className="mt-16">
          











<ModuleConsolidation
            index={2}
            variant="amber"
            video={{
              videoId: "4KzE9R6zWzY",
              title: "PG na Petrobras: Produção e Reservas",
              duration: "12:40",
            }}
            resumoVisual={{
              moduloNome: "Módulo 9",
              tituloAula: "Progressões Geométricas",
              materia: "Matemática",
              images: [
                {
                  title: "Crescimento 15%/ano: q=1.15",
                  type: "Conceito",
                  placeholderColor: "bg-orange-500/20",
                },
                {
                  title: "Depleção: q<1 (Meia-vida)",
                  type: "Técnica",
                  placeholderColor: "bg-red-500/20",
                },
                {
                  title: "Somas Acumuladas em 5 anos",
                  type: "Aplicação",
                  placeholderColor: "bg-amber-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Petrobras: PG de Produção!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-sm italic">
                    "Crescimento percentual fixo = PG. Perfeito para projeções."
                  </p>
                  <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg font-mono text-xs text-center">
                    <p>Produção cresce 10%/ano</p>
                    <p className="text-xs text-muted-foreground">Inicial: 1M bbl/dia</p>
                    <p>Ano 5: 1M × 1.1⁵ ≈ 1.61M</p>
                  </div>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
              titulo: "PG na Petrobras",
              artista: "Prof. Progressões",
            }}
          />

                      <QuizInterativo
              questoes={quizM9}
              titulo="QUIZ: Módulo Nº 9"
              numero={3}
              variant="amber"
              icone="🌊"
              onComplete={(score) => handleModuleComplete("modulo-9", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 10: SIMULADO MESTRE ═══ */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={10}
            titulo="Simulado Mestre"
            descricao="Teste final: integre todos os conceitos de progressões geométricas."
             variant={mv[10]}/>

          {showCompletionBadge ? (
            <div className="flex flex-col items-center gap-6 py-10 mt-10">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center animate-bounce">
                <LuTrophy className="w-12 h-12 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black">🏆 Mestre das Progressões!</h3>
              <p className="text-center text-muted-foreground max-w-sm">
                Você dominou progressões geométricas! De séries infinitas a aplicações
                Petrobras, você está pronto para qualquer desafio matemático.
              </p>
            </div>
          ) : (
            <section id="quiz-modulo-10" className="mt-8">
              <QuizInterativo
                questoes={quizM10}
                titulo="Simulado Elite - Progressões Geométricas"
                icone="🏆"
                numero={1}
                variant="slate"
                onComplete={(score) => handleModuleComplete("modulo-10", score)}
              />
            </section>
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
