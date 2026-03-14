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
  type FunctionPlot,
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
  QUIZ_M1_CONCEITO_PA,
  QUIZ_M2_TERMO_GERAL,
  QUIZ_M3_SOMA,
  QUIZ_M4_PROPRIEDADES,
  QUIZ_M5_INTERPOLACAO,
  QUIZ_M6_PA_FUNCOES,
  QUIZ_M7_PRATICA,
  QUIZ_M8_AVANCADO,
  QUIZ_M9_DESAFIO,
  QUIZ_M10_SIMULADO,
} from "./data/progressoes-pa-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Conceitos Fundamentais" },
  { id: "modulo-2", label: "Módulo 2", title: "Termo Geral" },
  { id: "modulo-3", label: "Módulo 3", title: "Soma Finita" },
  { id: "modulo-4", label: "Módulo 4", title: "Propriedades" },
  { id: "modulo-5", label: "Módulo 5", title: "Interpolação" },
  { id: "modulo-6", label: "Módulo 6", title: "PA e Funções Afim" },
  { id: "modulo-7", label: "Módulo 7", title: "Prática Integrada" },
  { id: "modulo-8", label: "Módulo 8", title: "Desafios Avançados" },
  { id: "modulo-9", label: "Módulo 9", title: "Aplicações Petrobras" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
] as const;

export default function AulaProgressoesPa({
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

  const [quizM1] = useState(() => getRandomQuestions(QUIZ_M1_CONCEITO_PA, 4));
  const [quizM2] = useState(() => getRandomQuestions(QUIZ_M2_TERMO_GERAL, 4));
  const [quizM3] = useState(() => getRandomQuestions(QUIZ_M3_SOMA, 4));
  const [quizM4] = useState(() => getRandomQuestions(QUIZ_M4_PROPRIEDADES, 4));
  const [quizM5] = useState(() => getRandomQuestions(QUIZ_M5_INTERPOLACAO, 5));
  const [quizM6] = useState(() => getRandomQuestions(QUIZ_M6_PA_FUNCOES, 5));
  const [quizM7] = useState(() => getRandomQuestions(QUIZ_M7_PRATICA, 5));
  const [quizM8] = useState(() => getRandomQuestions(QUIZ_M8_AVANCADO, 5));
  const [quizM9] = useState(() => getRandomQuestions(QUIZ_M9_DESAFIO, 5));
  const [quizM10] = useState(() => getRandomQuestions(QUIZ_M10_SIMULADO, 5));

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

  const isModuleUnlocked = (index: number) => {
    if (isCompleted || index === 0) return true;
    return completedModules.has(MODULE_DEFS[index - 1].id);
  };

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
          <ModuleBanner
            numero={1}
            titulo="Conceitos Fundamentais de PA"
            descricao="A diferença que se repete: progressão aritmética explicada."
            gradiente="bg-gradient-to-br from-blue-700 to-sky-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Sequência que Soma"
              description="Entenda a razão r e o primeiro termo a₁."
              variant="blue"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - O que é PA?",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Uma Progressão Aritmética é uma sequência onde cada termo é obtido somando ao anterior uma constante chamada <strong>razão (r)</strong>.
                      </p>
                      <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
                        <p className="font-bold text-blue-700 mb-2">PA: a₁, a₂, a₃, ...</p>
                        <p className="text-sm">a₂ = a₁ + r</p>
                        <p className="text-sm">a₃ = a₂ + r = a₁ + 2r</p>
                        <p className="text-sm">aₙ = a₁ + (n-1)r</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Casos Práticos",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">Veja PAs em contextos reais:</p>
                      <div className="space-y-2">
                        <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20">
                          <p className="font-bold text-blue-700 text-sm">Crescimento: (5, 10, 15, 20, ...)</p>
                          <p className="text-xs">a₁ = 5, r = 5 (soma 5)</p>
                        </div>
                        <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20">
                          <p className="font-bold text-blue-700 text-sm">Decrescimento: (100, 90, 80, 70, ...)</p>
                          <p className="text-xs">a₁ = 100, r = -10 (soma -10)</p>
                        </div>
                        <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20">
                          <p className="font-bold text-blue-700 text-sm">Constante: (7, 7, 7, 7, ...)</p>
                          <p className="text-xs">a₁ = 7, r = 0 (sem mudança)</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Reconhecendo PA",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="info" titulo="Teste da Razão">
                        <p className="text-sm">
                          Subtraia dois termos consecutivos. Se o resultado é sempre o mesmo, é PA!
                        </p>
                      </AlertBox>
                      <p className="text-sm text-muted-foreground">
                        Sequência (3, 7, 11, 15): 7-3 = 4, 11-7 = 4, 15-11 = 4 ✓ É PA com r = 4
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
                        <p className="font-bold text-blue-700 text-sm mb-1">PA Constante: r = 0</p>
                        <p className="text-xs">(5, 5, 5, ...) todos iguais</p>
                      </div>
                      <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20">
                        <p className="font-bold text-blue-700 text-sm mb-1">r Negativo: r &lt; 0</p>
                        <p className="text-xs">Sequência decrescente</p>
                      </div>
                      <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20">
                        <p className="font-bold text-blue-700 text-sm mb-1">a₁ = 0</p>
                        <p className="text-xs">Começa no zero, depois soma r</p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <ModuleConsolidation
            index={1}
            variant="blue"
            video={{
              videoId: "gZDzgZxrvAo",
              title: "PA: Conceitos Fundamentais",
              duration: "9:50",
            }}
            resumoVisual={{
              moduloNome: "Conceitos PA",
              tituloAula: "Progressões Aritméticas",
              materia: "Matemática",
              images: [
                {
                  title: "PA: Adição Constante",
                  type: "Conceito",
                  placeholderColor: "bg-blue-500/20",
                },
                {
                  title: "Razão r e Termo Geral",
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
              title: "PA: Sempre Soma!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-sm italic">
                    "Na PA, cada termo é o anterior mais r. Simples assim!"
                  </p>
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg font-mono text-xs text-center">
                    <p>PA: (2, 5, 8, 11, ...)</p>
                    <p className="text-xs text-muted-foreground">a₁ = 2</p>
                    <p className="text-xs text-muted-foreground">r = 3</p>
                  </div>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "PA: Conceitos Fundamentais",
              artista: "Prof. Progressões",
            }}
          />

          <section id="quiz-modulo-1" className="mt-16">
            <QuizInterativo
              questoes={quizM1}
              titulo="Fixação - Conceitos PA"
              numero={1}
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
          <ModuleBanner
            numero={2}
            titulo="Termo Geral da PA"
            descricao="A fórmula para encontrar qualquer termo sem calcular todos."
            gradiente="bg-gradient-to-br from-emerald-600 to-teal-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Fórmula do Termo Geral"
              description="aₙ = a₁ + (n-1)r"
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
                        <p className="font-mono font-bold text-center text-emerald-700">aₙ = a₁ + (n-1)r</p>
                        <div className="mt-4 space-y-2 text-sm">
                          <p><strong>aₙ</strong> = termo procurado</p>
                          <p><strong>a₁</strong> = primeiro termo</p>
                          <p><strong>r</strong> = razão</p>
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
                      <p className="text-sm text-muted-foreground">Encontre o 10º termo de (3, 7, 11, ...):</p>
                      <div className="bg-emerald-500/10 p-4 rounded border border-emerald-500/20">
                        <p className="font-mono text-sm text-center">a₁₀ = 3 + (10-1)×4 = 3 + 36 = 39</p>
                      </div>
                      <AlertBox tipo="success" titulo="Vantagem">
                        Sem a fórmula, teria que calcular: 3 → 7 → 11 → ... → 39
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
                        O multiplicador de r é (n-1), NÃO n! Se procura o 5º termo, use 4r, não 5r.
                      </AlertBox>
                      <p className="text-sm text-muted-foreground">
                        Posição 1 → multiplicador 0 (a₁ = a₁ + 0×r = a₁)
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Valores Especiais de r",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <div className="bg-emerald-500/10 p-3 rounded border border-emerald-500/20">
                        <p className="font-bold text-emerald-700 text-sm mb-1">r = 0: PA Constante</p>
                        <p className="text-xs">aₙ = a₁ (todos os termos iguais)</p>
                      </div>
                      <div className="bg-emerald-500/10 p-3 rounded border border-emerald-500/20">
                        <p className="font-bold text-emerald-700 text-sm mb-1">r &gt; 0: Crescente</p>
                        <p className="text-xs">Termos aumentam progressivamente</p>
                      </div>
                      <div className="bg-emerald-500/10 p-3 rounded border border-emerald-500/20">
                        <p className="font-bold text-emerald-700 text-sm mb-1">r &lt; 0: Decrescente</p>
                        <p className="text-xs">Termos diminuem progressivamente</p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <ModuleConsolidation
            index={2}
            variant="emerald"
            video={{
              videoId: "2Aq7p7-VgEU",
              title: "PA: Termo Geral Explicado",
              duration: "11:20",
            }}
            resumoVisual={{
              moduloNome: "Termo Geral PA",
              tituloAula: "Progressões Aritméticas",
              materia: "Matemática",
              images: [
                {
                  title: "Fórmula: aₙ = a₁ + (n-1)r",
                  type: "Conceito",
                  placeholderColor: "bg-emerald-500/20",
                },
                {
                  title: "Identifique a₁ e r",
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
              title: "Termo Geral: aₙ = a₁ + (n-1)r!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-sm italic">
                    "Nunca calcule todos os termos. Use a fórmula!"
                  </p>
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg font-mono text-xs text-center">
                    <p>PA: (2, 5, 8, ...)</p>
                    <p className="text-xs text-muted-foreground">a₁ = 2, r = 3</p>
                    <p>a₂₀ = 2 + 19×3 = 59</p>
                  </div>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
              titulo: "PA: Termo Geral",
              artista: "Prof. Progressões",
            }}
          />

          <section id="quiz-modulo-2" className="mt-16">
            <QuizInterativo
              questoes={quizM2}
              titulo="Fixação - Termo Geral"
              numero={2}
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
          <ModuleBanner
            numero={3}
            titulo="Soma de Termos (Finita)"
            descricao="Calcule a soma dos primeiros n termos de uma PA."
            gradiente="bg-gradient-to-br from-amber-600 to-orange-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
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
                        <p className="font-mono font-bold text-center text-amber-700 mb-3">Sₙ = (a₁ + aₙ) × n / 2</p>
                        <p className="text-sm mt-3">Ou alternativamente:</p>
                        <p className="font-mono font-bold text-center text-amber-700 mt-2">Sₙ = n × [2a₁ + (n-1)r] / 2</p>
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
                        Calcule a soma dos 5 primeiros termos de (2, 5, 8, 11, 14):
                      </p>
                      <div className="bg-amber-500/10 p-4 rounded border border-amber-500/20">
                        <p className="font-mono text-xs text-center">
                          a₁ = 2, a₅ = 14, n = 5
                          <br />
                          S₅ = (2 + 14) × 5 / 2
                          <br />
                          S₅ = 16 × 5 / 2 = 40
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        Verificação: 2 + 5 + 8 + 11 + 14 = 40 ✓
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Escolhendo a Fórmula",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-3">
                      <AlertBox tipo="info" titulo="Qual Usar?">
                        Se sabe aₙ: use Sₙ = (a₁ + aₙ) × n / 2 (mais simples)
                        <br />
                        Se sabe r: use Sₙ = n × [2a₁ + (n-1)r] / 2
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Casos Especiais",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <div className="bg-amber-500/10 p-3 rounded border border-amber-500/20">
                        <p className="font-bold text-amber-700 text-sm mb-1">
                          PA Constante (r = 0):
                        </p>
                        <p className="text-xs">Sₙ = a₁ × n (apenas a₁ repetido n vezes)</p>
                      </div>
                      <div className="bg-amber-500/10 p-3 rounded border border-amber-500/20">
                        <p className="font-bold text-amber-700 text-sm mb-1">
                          n = 1:
                        </p>
                        <p className="text-xs">S₁ = a₁ (apenas o primeiro termo)</p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <ModuleConsolidation
            index={3}
            variant="amber"
            video={{
              videoId: "4KzE9R6zWzY",
              title: "PA: Soma Finita",
              duration: "10:45",
            }}
            resumoVisual={{
              moduloNome: "Soma Finita PA",
              tituloAula: "Progressões Aritméticas",
              materia: "Matemática",
              images: [
                {
                  title: "Fórmula: Sₙ = (a₁+aₙ)n/2",
                  type: "Conceito",
                  placeholderColor: "bg-amber-500/20",
                },
                {
                  title: "Calcule aₙ Primeiro",
                  type: "Técnica",
                  placeholderColor: "bg-orange-500/20",
                },
                {
                  title: "Aplique a Soma",
                  type: "Aplicação",
                  placeholderColor: "bg-yellow-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Soma PA: (a₁+aₙ)n/2!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-sm italic">
                    "Soma de extremos, vezes n, dividido por 2. Fácil!"
                  </p>
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg font-mono text-xs text-center">
                    <p>PA: (1, 3, 5, 7, 9)</p>
                    <p className="text-xs text-muted-foreground">
                      S₅ = (1 + 9) × 5/2
                    </p>
                    <p>= 50/2 = 25</p>
                  </div>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
              titulo: "PA: Soma Finita",
              artista: "Prof. Progressões",
            }}
          />

          <section id="quiz-modulo-3" className="mt-16">
            <QuizInterativo
              questoes={quizM3}
              titulo="Fixação - Soma Finita"
              numero={3}
              variant="amber"
              icone="🎯"
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 4: PROPRIEDADES ═══ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={4}
            titulo="Propriedades Especiais de PA"
            descricao="Relações e padrões únicos das progressões aritméticas."
            gradiente="bg-gradient-to-br from-cyan-600 to-sky-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={4}
              title="Propriedades Importantes"
              description="Termos equidistantes, meios aritméticos e simetria."
              variant="cyan"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Termos Equidistantes",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Em uma PA, a soma de termos equidistantes dos extremos é constante:
                      </p>
                      <div className="bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20">
                        <p className="font-mono font-bold text-center text-cyan-700 mb-3">
                          a₁ + aₙ = a₂ + aₙ₋₁ = a₃ + aₙ₋₂ = ... = aₖ + aₙ₊₁₋ₖ
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Soma de Extremos",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Na PA (2, 5, 8, 11, 14, 17, 20):
                      </p>
                      <div className="bg-cyan-500/10 p-4 rounded border border-cyan-500/20">
                        <p className="font-mono text-xs text-center">
                          a₁ + a₇ = 2 + 20 = 22
                          <br />
                          a₂ + a₆ = 5 + 17 = 22
                          <br />
                          a₃ + a₅ = 8 + 14 = 22
                          <br />
                          a₄ = 11 (único, no centro)
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Meio Aritmético",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="info" titulo="Três Termos em PA">
                        <p className="text-sm">
                          Se a, b, c estão em PA, então <strong>b = (a + c) / 2</strong>
                        </p>
                      </AlertBox>
                      <p className="text-sm text-muted-foreground">
                        Ex: (3, 7, 11) → 7 = (3 + 11) / 2 = 7 ✓
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Número de Termos Ímpar vs Par",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <div className="bg-cyan-500/10 p-3 rounded border border-cyan-500/20">
                        <p className="font-bold text-cyan-700 text-sm mb-1">
                          Número Ímpar de Termos:
                        </p>
                        <p className="text-xs">Existe termo central, que é a média</p>
                      </div>
                      <div className="bg-cyan-500/10 p-3 rounded border border-cyan-500/20">
                        <p className="font-bold text-cyan-700 text-sm mb-1">
                          Número Par de Termos:
                        </p>
                        <p className="text-xs">
                          Não há termo central único, mas dois centrais
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <ModuleConsolidation
            index={4}
            variant="cyan"
            video={{
              videoId: "9KZg0LdwAg4",
              title: "PA: Propriedades Especiais",
              duration: "10:15",
            }}
            resumoVisual={{
              moduloNome: "Propriedades PA",
              tituloAula: "Progressões Aritméticas",
              materia: "Matemática",
              images: [
                {
                  title: "Soma de Extremos Constante",
                  type: "Conceito",
                  placeholderColor: "bg-cyan-500/20",
                },
                {
                  title: "Meio Aritmético: b = (a+c)/2",
                  type: "Técnica",
                  placeholderColor: "bg-sky-500/20",
                },
                {
                  title: "Simetria da PA",
                  type: "Aplicação",
                  placeholderColor: "bg-blue-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Propriedade: Soma Simétrica!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-sm italic">
                    "Termos equidistantes: a₁+aₙ = a₂+aₙ₋₁ = etc."
                  </p>
                  <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg font-mono text-xs text-center">
                    <p>PA: (1, 3, 5, 7, 9)</p>
                    <p className="text-xs text-muted-foreground">1+9 = 10</p>
                    <p className="text-xs text-muted-foreground">3+7 = 10</p>
                    <p className="text-xs text-muted-foreground">5 = centro</p>
                  </div>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
              titulo: "PA: Propriedades",
              artista: "Prof. Progressões",
            }}
          />

          <section id="quiz-modulo-4" className="mt-16">
            <QuizInterativo
              questoes={quizM4}
              titulo="Fixação - Propriedades"
              numero={4}
              variant="cyan"
              icone="🎯"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 5: INTERPOLAÇÃO ═══ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={5}
            titulo="Interpolação Aritmética"
            descricao="Insira termos entre dois números para formar uma PA."
            gradiente="bg-gradient-to-br from-violet-600 to-purple-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={5}
              title="Inserindo Termos em PA"
              description="Encontre a razão para formar progressão completa."
              variant="violet"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Interpolação",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Interpolar k termos entre a e b significa inserir k números para formar uma PA com a como primeiro e b como último:
                      </p>
                      <div className="bg-violet-500/10 p-4 rounded-xl border border-violet-500/20">
                        <p className="text-sm mb-2">
                          Se interpolamos k termos, a PA terá (k+2) termos.
                        </p>
                        <p className="font-mono font-bold text-center text-violet-700">
                          r = (b - a) / (k + 1)
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Prática Interpolação",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Interpole 3 termos entre 2 e 14:
                      </p>
                      <div className="bg-violet-500/10 p-4 rounded border border-violet-500/20">
                        <p className="font-mono text-xs text-center">
                          a = 2, b = 14, k = 3
                          <br />
                          r = (14 - 2) / (3 + 1) = 12 / 4 = 3
                          <br />
                          PA: (2, 5, 8, 11, 14)
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Verificação",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="info" titulo="Verifique">
                        <p className="text-sm">
                          Conte os termos: deve ter k+2 no total. Verifique se último é de fato b.
                        </p>
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Casos Especiais",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <div className="bg-violet-500/10 p-3 rounded border border-violet-500/20">
                        <p className="font-bold text-violet-700 text-sm mb-1">
                          k = 0: Nenhum termo
                        </p>
                        <p className="text-xs">PA tem apenas 2 termos (a e b)</p>
                      </div>
                      <div className="bg-violet-500/10 p-3 rounded border border-violet-500/20">
                        <p className="font-bold text-violet-700 text-sm mb-1">
                          a = b:
                        </p>
                        <p className="text-xs">r = 0 (PA constante)</p>
                      </div>
                      <div className="bg-violet-500/10 p-3 rounded border border-violet-500/20">
                        <p className="font-bold text-violet-700 text-sm mb-1">
                          a &gt; b:
                        </p>
                        <p className="text-xs">r será negativo (decrescente)</p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <ModuleConsolidation
            index={5}
            variant="violet"
            video={{
              videoId: "5Rw9KzK3jqA",
              title: "Interpolação Aritmética",
              duration: "9:30",
            }}
            resumoVisual={{
              moduloNome: "Interpolação PA",
              tituloAula: "Progressões Aritméticas",
              materia: "Matemática",
              images: [
                {
                  title: "Fórmula: r = (b-a)/(k+1)",
                  type: "Conceito",
                  placeholderColor: "bg-violet-500/20",
                },
                {
                  title: "Identifique a, b, k",
                  type: "Técnica",
                  placeholderColor: "bg-purple-500/20",
                },
                {
                  title: "Construa a PA Completa",
                  type: "Aplicação",
                  placeholderColor: "bg-fuchsia-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Interpolação: r = (b-a)/(k+1)!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-sm italic">
                    "Divida a diferença pelo número de 'passos' para encontrar r."
                  </p>
                  <div className="p-3 bg-violet-500/10 border border-violet-500/20 rounded-lg font-mono text-xs text-center">
                    <p>Interpole 4 entre 3 e 23</p>
                    <p className="text-xs text-muted-foreground">
                      r = (23-3)/(4+1) = 20/5 = 4
                    </p>
                    <p>(3, 7, 11, 15, 19, 23)</p>
                  </div>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
              titulo: "Interpolação Aritmética",
              artista: "Prof. Progressões",
            }}
          />

          <section id="quiz-modulo-5" className="mt-16">
            <QuizInterativo
              questoes={quizM5}
              titulo="Fixação - Interpolação"
              numero={5}
              variant="violet"
              icone="🧠"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 6: PA E FUNÇÕES AFIM ═══ */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={6}
            titulo="PA e Funções Afim"
            descricao="Conexão entre progressões aritméticas e funções do 1º grau."
            gradiente="bg-gradient-to-br from-teal-600 to-cyan-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={6}
              title="PA Como Restrição de Função Afim"
              description="Quando n é número natural, f(n) forma uma PA."
              variant="teal"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - PA e f(x) = ax + b",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Uma função afim f(x) = ax + b, quando restrita a n ∈ ℕ, gera uma PA:
                      </p>
                      <div className="bg-teal-500/10 p-4 rounded-xl border border-teal-500/20">
                        <p className="text-sm mb-2">
                          <strong>f(1), f(2), f(3), ... forma PA com razão a</strong>
                        </p>
                        <p className="font-mono text-xs text-center">
                          f(1) = a + b = a₁
                          <br />
                          f(2) = 2a + b = a₂
                          <br />
                          f(n) = an + b = aₙ
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Função Afim → PA",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        A função f(x) = 3x + 2 para x = 1, 2, 3, 4, ... gera:
                      </p>
                      <div className="bg-teal-500/10 p-4 rounded border border-teal-500/20">
                        <p className="font-mono text-xs text-center">
                          f(1) = 5
                          <br />
                          f(2) = 8
                          <br />
                          f(3) = 11
                          <br />
                          f(4) = 14
                          <br />
                          ... PA: (5, 8, 11, 14, ...) com r = 3
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Relação Direta",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="info" titulo="Conexão Simples">
                        <p className="text-sm">
                          Na função f(x) = ax + b, o coeficiente a é EXATAMENTE a razão r da PA!
                        </p>
                      </AlertBox>
                      <p className="text-sm text-muted-foreground">
                        Se f(x) = 5x - 3, a PA terá r = 5 e a₁ = f(1) = 2
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Função Não-Afim",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <div className="bg-teal-500/10 p-3 rounded border border-teal-500/20">
                        <p className="font-bold text-teal-700 text-sm mb-1">
                          f(x) = ax² + bx + c:
                        </p>
                        <p className="text-xs">Não gera PA (é quadrática)</p>
                      </div>
                      <div className="bg-teal-500/10 p-3 rounded border border-teal-500/20">
                        <p className="font-bold text-teal-700 text-sm mb-1">
                          f(x) = a (constante):
                        </p>
                        <p className="text-xs">Gera PA constante com r = 0</p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <ModuleConsolidation
            index={6}
            variant="teal"
            video={{
              videoId: "tZzgzUaHdCw",
              title: "PA e Funções Afim: Conexão",
              duration: "11:00",
            }}
            resumoVisual={{
              moduloNome: "PA e Função Afim",
              tituloAula: "Progressões Aritméticas",
              materia: "Matemática",
              images: [
                {
                  title: "f(x) = ax + b gera PA",
                  type: "Conceito",
                  placeholderColor: "bg-teal-500/20",
                },
                {
                  title: "Razão r = a (coef. angular)",
                  type: "Técnica",
                  placeholderColor: "bg-cyan-500/20",
                },
                {
                  title: "Primeiro termo: f(1) = a + b",
                  type: "Aplicação",
                  placeholderColor: "bg-blue-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "PA = f(n) com f(x)=ax+b!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-sm italic">
                    "Função afim em naturais: PA com r = a (coef. angular)"
                  </p>
                  <div className="p-3 bg-teal-500/10 border border-teal-500/20 rounded-lg font-mono text-xs text-center">
                    <p>f(x) = 2x + 1</p>
                    <p className="text-xs text-muted-foreground">
                      f(1)=3, f(2)=5, f(3)=7, ...
                    </p>
                    <p>PA: (3, 5, 7, ...) com r=2</p>
                  </div>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
              titulo: "PA e Funções Afim",
              artista: "Prof. Progressões",
            }}
          />

          <section id="quiz-modulo-6" className="mt-16">
            <QuizInterativo
              questoes={quizM6}
              titulo="Fixação - PA e Função Afim"
              numero={6}
              variant="teal"
              icone="🎯"
              onComplete={(score) => handleModuleComplete("modulo-6", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 7: PRÁTICA INTEGRADA ═══ */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={7}
            titulo="Prática Integrada"
            descricao="Combine tudo: fórmulas, propriedades e aplicações."
            gradiente="bg-gradient-to-br from-indigo-600 to-purple-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={7}
              title="Problemas Contextualizados"
              description="PA em situações reais e complexas."
              variant="indigo"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Estratégia de Resolução",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Para resolver problemas com PA:
                      </p>
                      <div className="bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20">
                        <ol className="text-sm space-y-2">
                          <li>1. Identifique se é realmente PA (razão constante)</li>
                          <li>2. Encontre a₁ e r</li>
                          <li>3. Escreva aₙ usando a fórmula do termo geral</li>
                          <li>4. Calcule o que é pedido (termo, soma, etc.)</li>
                        </ol>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Problema Clássico",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Problema: "Uma empresa produz 100 peças no 1º dia, 105 no 2º, 110 no 3º, etc. Quantas peças em 30 dias? Quantas ao total?"
                      </p>
                      <div className="bg-indigo-500/10 p-4 rounded border border-indigo-500/20">
                        <p className="text-xs font-mono text-center">
                          a₁ = 100, r = 5, n = 30
                          <br />
                          a₃₀ = 100 + 29×5 = 245 peças (dia 30)
                          <br />
                          S₃₀ = (100+245)×30/2 = 5175 peças (total)
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Erros Comuns",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-3">
                      <AlertBox tipo="warning" titulo="Cuidado!">
                        Não confunda "termo 30" com "durante 30 dias". Às vezes o primeiro é dia 0 ou dia 1.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - PA Decrescente",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <div className="bg-indigo-500/10 p-3 rounded border border-indigo-500/20">
                        <p className="font-bold text-indigo-700 text-sm mb-1">
                          r &lt; 0:
                        </p>
                        <p className="text-xs">
                          Diminui. Cuidado: pode ficar negativa, exija a₁ &gt; (n-1)|r| se houver restrição física
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <ModuleConsolidation
            index={7}
            variant="indigo"
            video={{
              videoId: "2xQr4vZ5M1I",
              title: "PA: Problemas Contextualizados",
              duration: "12:20",
            }}
            resumoVisual={{
              moduloNome: "Prática Integrada",
              tituloAula: "Progressões Aritméticas",
              materia: "Matemática",
              images: [
                {
                  title: "Identifique a₁ e r",
                  type: "Conceito",
                  placeholderColor: "bg-indigo-500/20",
                },
                {
                  title: "Aplique Fórmulas",
                  type: "Técnica",
                  placeholderColor: "bg-blue-500/20",
                },
                {
                  title: "Interprete Resultado",
                  type: "Aplicação",
                  placeholderColor: "bg-purple-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "PA em Problema: 4 Passos!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-sm italic">
                    "Identifique → Fórmula → Calcule → Interprete"
                  </p>
                  <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg font-mono text-xs text-center">
                    <p>Produza 100, 105, 110, ...</p>
                    <p className="text-xs text-muted-foreground">PA com a₁=100, r=5</p>
                    <p>Dia n: 100 + (n-1)×5</p>
                  </div>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
              titulo: "PA: Prática Integrada",
              artista: "Prof. Progressões",
            }}
          />

          <section id="quiz-modulo-7" className="mt-16">
            <QuizInterativo
              questoes={quizM7}
              titulo="Fixação - Prática Integrada"
              numero={7}
              variant="indigo"
              icone="🎯"
              onComplete={(score) => handleModuleComplete("modulo-7", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 8: DESAFIOS AVANÇADOS ═══ */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={8}
            titulo="Desafios Avançados"
            descricao="Problemas complexos e integrações com outros conceitos."
            gradiente="bg-gradient-to-br from-rose-600 to-red-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={8}
              title="Nível Avançado"
              description="Sistemas, inequações e aplicações múltiplas."
              variant="rose"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Sistema com PA",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Às vezes você recebe 2+ informações simultâneas sobre uma PA e deve resolvê-las como sistema:
                      </p>
                      <div className="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20">
                        <p className="text-sm">
                          Ex: "a₃ = 10 e a₇ = 22. Encontre a PA."
                          <br />
                          a₃ = a₁ + 2r = 10
                          <br />
                          a₇ = a₁ + 6r = 22
                          <br />
                          Subtraia: 4r = 12 → r = 3, a₁ = 4
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Inequação com PA",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        "Qual é o primeiro termo positivo de PA (-15, -10, -5, ...)?":
                      </p>
                      <div className="bg-rose-500/10 p-4 rounded border border-rose-500/20">
                        <p className="text-xs font-mono text-center">
                          aₙ = -15 + (n-1)×5 &gt; 0
                          <br />
                          -15 + 5n - 5 &gt; 0
                          <br />
                          5n &gt; 20 → n &gt; 4
                          <br />
                          n = 5: a₅ = 5 (1º positivo)
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Verificação de Resposta",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="info" titulo="Sempre Verifique">
                        <p className="text-sm">
                          Substitua a₁ e r na fórmula e teste alguns termos. Confira se batem com o enunciado.
                        </p>
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - PA com Restrições",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <div className="bg-rose-500/10 p-3 rounded border border-rose-500/20">
                        <p className="font-bold text-rose-700 text-sm mb-1">
                          Domínio Físico:
                        </p>
                        <p className="text-xs">
                          Se PA representa quantidade, todos termos devem ser positivos
                        </p>
                      </div>
                      <div className="bg-rose-500/10 p-3 rounded border border-rose-500/20">
                        <p className="font-bold text-rose-700 text-sm mb-1">
                          n Inteiro:
                        </p>
                        <p className="text-xs">
                          Não existe "termo 2.5". Sempre n ∈ ℕ*
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <ModuleConsolidation
            index={8}
            variant="rose"
            video={{
              videoId: "4KzE9R6zWzY",
              title: "PA Avançada: Desafios",
              duration: "13:15",
            }}
            resumoVisual={{
              moduloNome: "Desafios Avançados",
              tituloAula: "Progressões Aritméticas",
              materia: "Matemática",
              images: [
                {
                  title: "Sistema com PA",
                  type: "Conceito",
                  placeholderColor: "bg-rose-500/20",
                },
                {
                  title: "Inequações em PA",
                  type: "Técnica",
                  placeholderColor: "bg-red-500/20",
                },
                {
                  title: "Aplicações Múltiplas",
                  type: "Aplicação",
                  placeholderColor: "bg-pink-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Desafios: Sistema de Equações!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-sm italic">
                    "2+ informações → monte 2+ equações com a₁ e r"
                  </p>
                  <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg font-mono text-xs text-center">
                    <p>a₂ = 5 e a₅ = 14</p>
                    <p className="text-xs text-muted-foreground">↓ sistema ↓</p>
                    <p>a₁ + r = 5</p>
                    <p>a₁ + 4r = 14</p>
                  </div>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
              titulo: "Desafios Avançados em PA",
              artista: "Prof. Progressões",
            }}
          />

          <section id="quiz-modulo-8" className="mt-16">
            <QuizInterativo
              questoes={quizM8}
              titulo="Fixação - Desafios Avançados"
              numero={8}
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
          <ModuleBanner
            numero={9}
            titulo="Aplicações Petrobras"
            descricao="Cronogramas, investimentos e programação linear."
            gradiente="bg-gradient-to-br from-orange-600 to-red-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={9}
              title="PA na Indústria"
              description="Cronogramas, depreciação, e programação."
              variant="orange"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Cronogramas",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Cronogramas de projetos frequentemente seguem PA:
                      </p>
                      <div className="bg-orange-500/10 p-4 rounded-xl border border-orange-500/20">
                        <p className="text-sm">
                          <strong>Exemplo</strong>: Exploração de poço fase 1, 2, 3, ...
                          <br />
                          Semana 1: 10 operários
                          <br />
                          Semana 2: 15 operários
                          <br />
                          Semana 3: 20 operários
                          <br />
                          PA: (10, 15, 20, ...) com r = 5
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Depreciação",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        Equipamento com depreciação linear:
                      </p>
                      <div className="bg-orange-500/10 p-4 rounded border border-orange-500/20">
                        <p className="text-sm mb-2">
                          <strong>Valor inicial</strong>: R$ 100.000
                          <br />
                          <strong>Depreciação/ano</strong>: R$ 10.000
                          <br />
                          <strong>Ano n</strong>: 100.000 - (n-1)×10.000
                        </p>
                        <p className="font-mono text-xs text-center mt-2">
                          Ano 1: 100k, Ano 2: 90k, ..., Ano 10: 10k
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Programação Linear",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="info" titulo="Otimização">
                        <p className="text-sm">
                          Se restrição é PA, otimize testando extremos (primeiros/últimos termos viáveis).
                        </p>
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Restrições Práticas",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <div className="bg-orange-500/10 p-3 rounded border border-orange-500/20">
                        <p className="font-bold text-orange-700 text-sm mb-1">
                          Limite Mínimo/Máximo:
                        </p>
                        <p className="text-xs">
                          PA pode não continuar indefinidamente (recursos finitos)
                        </p>
                      </div>
                      <div className="bg-orange-500/10 p-3 rounded border border-orange-500/20">
                        <p className="font-bold text-orange-700 text-sm mb-1">
                          Arredondamento:
                        </p>
                        <p className="text-xs">
                          Valores reais são sempre inteiros (operários, peças, etc.)
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <ModuleConsolidation
            index={9}
            variant="orange"
            video={{
              videoId: "9KZg0LdwAg4",
              title: "PA na Petrobras: Cronogramas",
              duration: "12:50",
            }}
            resumoVisual={{
              moduloNome: "Aplicações Petrobras",
              tituloAula: "Progressões Aritméticas",
              materia: "Matemática",
              images: [
                {
                  title: "Cronogramas: Crescimento Linear",
                  type: "Conceito",
                  placeholderColor: "bg-orange-500/20",
                },
                {
                  title: "Depreciação de Equipamento",
                  type: "Técnica",
                  placeholderColor: "bg-red-500/20",
                },
                {
                  title: "Otimização com PA",
                  type: "Aplicação",
                  placeholderColor: "bg-amber-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Petrobras: PA em Cronogramas!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-sm italic">
                    "Aumento/redução linear ao longo do tempo = PA"
                  </p>
                  <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg font-mono text-xs text-center">
                    <p>Semanistas: 100, 110, 120, ...</p>
                    <p className="text-xs text-muted-foreground">a₁=100, r=10</p>
                    <p>Semana n: 100 + (n-1)×10</p>
                  </div>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
              titulo: "PA na Petrobras",
              artista: "Prof. Progressões",
            }}
          />

          <section id="quiz-modulo-9" className="mt-16">
            <QuizInterativo
              questoes={quizM9}
              titulo="Fixação - Aplicações Petrobras"
              numero={9}
              variant="orange"
              icone="🌊"
              onComplete={(score) => handleModuleComplete("modulo-9", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 10: SIMULADO MESTRE ═══ */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={10}
            titulo="Simulado Mestre"
            descricao="Teste final: integre todos os conceitos de progressões aritméticas."
            gradiente="bg-gradient-to-br from-slate-800 to-slate-900"
          />

          {showCompletionBadge ? (
            <div className="flex flex-col items-center gap-6 py-10 mt-10">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center animate-bounce">
                <LuTrophy className="w-12 h-12 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black">🏆 Mestre das Progressões!</h3>
              <p className="text-center text-muted-foreground max-w-sm">
                Você dominou progressões aritméticas! De fórmulas básicas a aplicações Petrobras,
                você está pronto para qualquer desafio matemático.
              </p>
            </div>
          ) : (
            <section id="quiz-modulo-10" className="mt-8">
              <QuizInterativo
                questoes={quizM10}
                titulo="Simulado Elite - Progressões Aritméticas"
                icone="🏆"
                numero={10}
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
