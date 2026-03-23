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
  CardCarousel,
  ContentAccordion,
  AulaTemplate,
  ModuleSectionHeader,
  ModuleSummaryCarouselNew,
  FunctionGraph,
  ModuleConsolidation,
  type FunctionPlot,
} from "../shared";

import {
  LuBookOpen,
  LuLightbulb,
  LuTarget,
  LuBrain,
  LuTrophy,
  LuRepeat,
  LuSigma,
  LuZap,
} from "react-icons/lu";

import {
  QUIZ_M1_CONCEITOS,
  QUIZ_M2_BHASKARA,
  QUIZ_M3_AVANCADAS,
  QUIZ_M4_PROBLEMAS,
  QUIZ_M5_FINAL,
  QUIZ_M6_SOMA_PRODUTO,
  QUIZ_M7_GRAFICOS,
  QUIZ_M8_REVERSA,
  QUIZ_M9_PETROBRASESPECIFICO,
  QUIZ_M10_SIMULADO_MESTRE,
} from "./data/equacoes-2grau-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Conceitos Fundamentais" },
  { id: "modulo-2", label: "Módulo 2", title: "Fórmula de Bhaskara" },
  { id: "modulo-3", label: "Módulo 3", title: "Equações Avançadas" },
  { id: "modulo-4", label: "Módulo 4", title: "Problemas Contextualizados" },
  { id: "modulo-5", label: "Módulo 5", title: "Desafio Parcial" },
  { id: "modulo-6", label: "Módulo 6", title: "Soma e Produto (Atalhos)" },
  { id: "modulo-7", label: "Módulo 7", title: "Gráficos e Parábolas" },
  { id: "modulo-8", label: "Módulo 8", title: "Resolução Reversa" },
  { id: "modulo-9", label: "Módulo 9", title: "Aplicações Petrobras" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
] as const;

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

  const [quizM1] = useState(() => getRandomQuestions(QUIZ_M1_CONCEITOS, 4));
  const [quizM2] = useState(() => getRandomQuestions(QUIZ_M2_BHASKARA, 4));
  const [quizM3] = useState(() => getRandomQuestions(QUIZ_M3_AVANCADAS, 4));
  const [quizM4] = useState(() => getRandomQuestions(QUIZ_M4_PROBLEMAS, 4));
  const [quizM5] = useState(() => getRandomQuestions(QUIZ_M5_FINAL, 5));
  const [quizM6] = useState(() => getRandomQuestions(QUIZ_M6_SOMA_PRODUTO, 5));
  const [quizM7] = useState(() => getRandomQuestions(QUIZ_M7_GRAFICOS, 5));
  const [quizM8] = useState(() => getRandomQuestions(QUIZ_M8_REVERSA, 5));
  const [quizM9] = useState(() =>
    getRandomQuestions(QUIZ_M9_PETROBRASESPECIFICO, 5),
  );
  const [quizM10] = useState(() =>
    getRandomQuestions(QUIZ_M10_SIMULADO_MESTRE, 5),
  );

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
            titulo="Conceitos Fundamentais"
            descricao="Desvendando a estrutura das equações do 2º grau."
            gradiente="bg-gradient-to-br from-amber-300 via-amber-500 to-amber-400"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Anatomia da Equação"
              description="Identificando os coeficientes sem cair nas armadilhas da banca."
              variant="blue"
            />

            <p className="text-muted-foreground leading-relaxed text-lg">
              Uma equação do 2º grau tem a cara:{" "}
              <strong>ax² + bx + c = 0</strong>. O poder está em extrair
              corretamente os coeficientes antes de colocar na fórmula.
            </p>

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Extraindo a, b e c",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Cuidado máximo com o sinal que acompanha o número. Ele
                        PERTENCE ao número.
                      </p>
                      <div className="bg-muted p-4 rounded-xl border border-border text-center">
                        <p className="text-xl font-mono font-black text-blue-600 mb-2">
                          -x² + 5x - 6 = 0
                        </p>
                        <ul className="text-left max-w-sm mx-auto space-y-2">
                          <li>
                            <span className="font-bold">a = -1</span> (o sinal
                            conta, se não tem número é 1)
                          </li>
                          <li>
                            <span className="font-bold">b = 5</span>
                          </li>
                          <li>
                            <span className="font-bold">c = -6</span> (termo
                            independente)
                          </li>
                        </ul>
                      </div>
                      <AlertBox tipo="warning" titulo="As Incompletas">
                        Se a equação for tipo <code>x² - 9 = 0</code>, note que
                        não existe a parte do xzinho sozinho. Logo,{" "}
                        <strong>b = 0</strong>.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Os Casos Mais Comuns",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Veja como extrair coeficientes em diferentes formatos:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                          <p className="font-bold text-blue-700 text-sm mb-1">
                            3x² - 7x + 2 = 0
                          </p>
                          <p className="text-sm">a=3, b=-7, c=2</p>
                        </div>
                        <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/20">
                          <p className="font-bold text-emerald-700 text-sm mb-1">
                            x² - 4 = 0
                          </p>
                          <p className="text-sm">a=1, b=0, c=-4 (incompleta)</p>
                        </div>
                        <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                          <p className="font-bold text-orange-700 text-sm mb-1">
                            -2x² + 8x = 0
                          </p>
                          <p className="text-sm">a=-2, b=8, c=0 (incompleta)</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Pegadinhas Comuns",
                  icone: <LuRepeat />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="warning" titulo="Sinal Negativo">
                        Quando você vê <code>-x²</code>, o coeficiente é -1, não
                        0!
                      </AlertBox>
                      <AlertBox tipo="info" titulo="Ordem Diferente">
                        Se a equação vem assim: <code>5x + 2 - 3x² = 0</code>,
                        reordene para <code>-3x² + 5x + 2 = 0</code> antes de
                        extrair.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Equações Incompletas",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        Nem sempre você terá todos os três termos. Existem dois
                        casos:
                      </p>
                      <div className="space-y-3">
                        <div className="border border-amber-500/30 bg-amber-500/10 p-4 rounded-lg">
                          <p className="font-bold text-amber-700 mb-2">
                            c = 0: ax² + bx = 0
                          </p>
                          <p className="text-sm">
                            Fatore: x(ax + b) = 0 → x₁ = 0 ou x₂ = -b/a
                          </p>
                        </div>
                        <div className="border border-rose-500/30 bg-rose-500/10 p-4 rounded-lg">
                          <p className="font-bold text-rose-700 mb-2">
                            b = 0: ax² + c = 0
                          </p>
                          <p className="text-sm">
                            Isole x²: x² = -c/a. Se positivo, x = ±√(-c/a)
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <FunctionGraph
            title="Parábolas: Posição e Forma"
            functions={[
              {
                id: "func1",
                label: "y = x²",
                color: "#3b82f6",
                fn: (x) => x * x,
                strokeWidth: 2,
              },
              {
                id: "func2",
                label: "y = x² - 2",
                color: "#ef4444",
                fn: (x) => x * x - 2,
                strokeWidth: 2,
              },
              {
                id: "func3",
                label: "y = (x-1)²",
                color: "#10b981",
                fn: (x) => (x - 1) * (x - 1),
                strokeWidth: 2,
              },
            ]}
            xMin={-4}
            xMax={4}
            yMin={-3}
            yMax={15}
            points={250}
          />



          <section id="quiz-modulo-1" className="mt-16">
          











<ModuleConsolidation
            index={1}
            variant="blue"
            video={{
              videoId: "gZDzgZxrvAo",
              title: "Equações do 2º Grau: Conceitos Fundamentais",
              duration: "12:30",
            }}
            resumoVisual={{
              moduloNome: "Módulo 1",
              tituloAula: "Equações do 2º Grau",
              materia: "Matemática",
              images: [
                {
                  title: "Estrutura: ax² + bx + c = 0",
                  type: "Conceito",
                  placeholderColor: "bg-blue-500/20",
                },
                {
                  title: "Extrair Coeficientes Corretamente",
                  type: "Técnica",
                  placeholderColor: "bg-sky-500/20",
                },
                {
                  title: "Equações Incompletas",
                  type: "Caso Especial",
                  placeholderColor: "bg-cyan-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Lembre dos Sinais!",
              content: (
                <div className="space-y-4 text-left">
                  <p className="text-sm italic">
                    "Os sinais contam como parte dos números!"
                  </p>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl font-mono text-center text-sm">
                    <p>-3x² + 5x - 2 = 0</p>
                    <p className="text-xs text-muted-foreground">↓ extrair ↓</p>
                    <p>a = -3, b = 5, c = -2</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Não esqueça do sinal negativo em 'a' e em 'c'!
                  </p>
                </div>
              ),
            }}
            audio={{
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Equações 2º Grau: Fundamentos",
              artista: "Prof. Algébrico",
            }}
          />

                      <QuizInterativo
              questoes={quizM1}
              titulo="QUIZ: Módulo Nº 1"
              numero={2}
              variant="blue"
              icone="🧠"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 2: FÓRMULA DE BHASKARA ═══ */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={2}
            titulo="Fórmula de Bhaskara"
            descricao="A fórmula mais famosa da Matemática. Dominando o a, b e c."
            gradiente="bg-gradient-to-br from-blue-300 via-blue-500 to-blue-400"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="O Coração do 2º Grau"
              description="Bhaskara: a fórmula que resolve tudo quando bem compreendida."
              variant="emerald"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - A Trindade do Delta",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 text-center shadow-inner">
                        <p className="text-xl font-bold font-mono text-emerald-700">
                          Δ = b² - 4ac
                        </p>
                      </div>
                      <p className="text-muted-foreground mt-4 text-sm">
                        O Delta prediz o futuro da sua equação. Veja para onde
                        ele te leva:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-card border p-4 rounded-lg text-center">
                          <div className="font-bold text-emerald-600 text-lg">
                            Δ &gt; 0
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Duas raízes REAIS e DIFERENTES.
                          </p>
                        </div>
                        <div className="bg-card border p-4 rounded-lg text-center">
                          <div className="font-bold text-amber-600 text-lg">
                            Δ = 0
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Duas raízes REAIS e IGUAIS (apenas toca o eixo X).
                          </p>
                        </div>
                        <div className="bg-card border p-4 rounded-lg text-center">
                          <div className="font-bold text-rose-600 text-lg">
                            Δ &lt; 0
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            NEM CONTINUE A CONTA. Não tem raiz real!
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Calculando o Delta",
                  icone: <LuSigma />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Veja como calcular delta em diferentes equações:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/20">
                          <p className="font-bold text-emerald-700 text-sm mb-2">
                            x² - 5x + 6 = 0
                          </p>
                          <p className="text-sm font-mono">
                            Δ = (-5)² - 4(1)(6) = 25 - 24 = 1 &gt; 0 ✓ Duas
                            raízes reais diferentes
                          </p>
                        </div>
                        <div className="bg-teal-500/10 p-4 rounded-lg border border-teal-500/20">
                          <p className="font-bold text-teal-700 text-sm mb-2">
                            x² - 2x + 1 = 0
                          </p>
                          <p className="text-sm font-mono">
                            Δ = (-2)² - 4(1)(1) = 4 - 4 = 0 → Uma raiz dupla
                          </p>
                        </div>
                        <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/20">
                          <p className="font-bold text-cyan-700 text-sm mb-2">
                            x² + 1 = 0
                          </p>
                          <p className="text-sm font-mono">
                            Δ = 0² - 4(1)(1) = -4 &lt; 0 ✗ Sem raízes reais
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - A Fórmula Completa",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 text-center">
                        <p className="text-lg font-bold font-mono text-emerald-700">
                          x = (-b ± √Δ) / 2a
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        O ± significa que você calcula duas vezes: uma com +
                        (raiz 1) e outra com - (raiz 2).
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Quando Parar",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="danger" titulo="Cuidado!">
                        <p className="text-sm">
                          Se Δ &lt; 0, PARE. Não existem raízes reais. A
                          resposta é "sem solução em ℝ".
                        </p>
                      </AlertBox>
                      <AlertBox tipo="info" titulo="Passo a Passo Seguro">
                        <p className="text-sm">1. Identifique a, b, c</p>
                        <p className="text-sm">2. Calcule Δ = b² - 4ac</p>
                        <p className="text-sm">3. Se Δ &lt; 0, pare aqui!</p>
                        <p className="text-sm">
                          4. Se Δ ≥ 0, aplique x = (-b ± √Δ) / 2a
                        </p>
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <FunctionGraph
            title="Visualizando as Raízes Reais"
            functions={[
              {
                id: "func1",
                label: "y = x² - 4",
                color: "#3b82f6",
                fn: (x) => x * x - 4,
                strokeWidth: 2,
              },
              {
                id: "func2",
                label: "y = x² - 2x - 3",
                color: "#ef4444",
                fn: (x) => x * x - 2 * x - 3,
                strokeWidth: 2,
              },
            ]}
            xMin={-3}
            xMax={5}
            yMin={-5}
            yMax={10}
            points={250}
          />



          <section id="quiz-modulo-2" className="mt-16">
          











<ModuleConsolidation
            index={2}
            variant="emerald"
            video={{
              videoId: "RFKjZ2FLSrk",
              title: "Fórmula de Bhaskara: Passo a Passo",
              duration: "14:15",
            }}
            resumoVisual={{
              moduloNome: "Módulo 2",
              tituloAula: "Equações do 2º Grau",
              materia: "Matemática",
              images: [
                {
                  title: "Δ = b² - 4ac",
                  type: "Discriminante",
                  placeholderColor: "bg-emerald-500/20",
                },
                {
                  title: "x = (-b ± √Δ) / 2a",
                  type: "Fórmula",
                  placeholderColor: "bg-teal-500/20",
                },
                {
                  title: "Δ > 0: 2 raízes; Δ = 0: 1 raiz; Δ < 0: 0 raízes",
                  type: "Análise",
                  placeholderColor: "bg-green-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "O Truque do Delta",
              content: (
                <div className="space-y-4 text-left">
                  <p className="text-sm italic">"Delta decide tudo!"</p>
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl font-mono text-center text-sm">
                    <p>Se Δ &gt; 0 → 2 raízes diferentes</p>
                    <p>Se Δ = 0 → 1 raiz dupla</p>
                    <p>Se Δ &lt; 0 → Sem raízes (PARE!)</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Sempre calcule delta PRIMEIRO!
                  </p>
                </div>
              ),
            }}
            audio={{
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Bhaskara: O Mantra do 2º Grau",
              artista: "Prof. Algébrico",
            }}
          />

                      <QuizInterativo
              questoes={quizM2}
              titulo="Fixação - Fórmula de Bhaskara"
              numero={2}
              variant="emerald"
              icone="🎯"
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 3: EQUAÇÕES AVANÇADAS ═══ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={3}
            titulo="Equações Avançadas"
            descricao="Problemas físicos e geométricos que geram equações de 2º grau."
            gradiente="bg-gradient-to-br from-emerald-300 via-emerald-500 to-emerald-400"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="A Tradução Física das Raízes"
              description="Ninguém desenha uma parábola sem motivo de prova."
              variant="amber"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Raiz Negativa",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Problemas envolvendo geometria (ex: calcular as
                        dimensões de um terreno) costumam gerar equações de
                        segundo grau através de área = Base × Altura. A
                        pegadinha está na resposta final.
                      </p>
                      <AlertBox
                        tipo="warning"
                        titulo="O Descarte da Antimatéria"
                      >
                        A matemática não liga para a Física e costuma botar uma
                        das raízes negativas. Mas <strong>não existe</strong>{" "}
                        "comprimento de -5 metros". Se suas raízes foram 8 e -5,
                        ignore a negativa! A resposta verdadeira é o 8.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Lançamento de Projéteis",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Se o problema falar de "quando o balão atingiu o chão"
                        baseado numa função <code>h(t) = -2t² + 18t</code>. Ele
                        quer saber o Tempo (t) quando a Altura (h) for zero. Ou
                        seja, iguale a equação a zero e encontre as raízes. Uma
                        raiz será o instante do lançamento (t=0) e a outra
                        quando bateu no solo (t=9 min).
                      </p>
                      <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20">
                        <p className="font-mono text-sm">
                          -2t² + 18t = 0<br />
                          t(-2t + 18) = 0<br />t = 0 ou t = 9 segundos
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Terrenos e Áreas",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="info" titulo="Fórmula de Área">
                        <p className="text-sm">
                          Se um lado é x e o outro é (x+5), a área é x(x+5) = x²
                          + 5x
                        </p>
                      </AlertBox>
                      <p className="text-sm text-muted-foreground">
                        Terrenos sempre geram dois valores. O negativo SEMPRE é
                        descartado.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Análise Crítica",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="border border-orange-500/30 bg-orange-500/10 p-4 rounded-lg">
                        <p className="font-bold text-orange-700 mb-2">
                          Velocidade Negativa?
                        </p>
                        <p className="text-sm">
                          Não faz sentido. Se uma raiz é negativa, ignore-a.
                        </p>
                      </div>
                      <div className="border border-amber-500/30 bg-amber-500/10 p-4 rounded-lg">
                        <p className="font-bold text-amber-700 mb-2">
                          Duas Raízes Positivas?
                        </p>
                        <p className="text-sm">
                          Ambas podem ser válidas. Analize o contexto. No
                          lançamento, t=0 é o início.
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <FunctionGraph
            title="Vértice e Eixo de Simetria"
            functions={[
              {
                id: "func1",
                label: "y = -(x-1)² + 4",
                color: "#3b82f6",
                fn: (x) => -((x - 1) * (x - 1)) + 4,
                strokeWidth: 2,
              },
              {
                id: "func2",
                label: "y = x²",
                color: "#ef4444",
                fn: (x) => x * x,
                strokeWidth: 2,
              },
            ]}
            xMin={-3}
            xMax={4}
            yMin={-2}
            yMax={5}
            points={250}
          />



          <section id="quiz-modulo-3" className="mt-16">
          











<ModuleConsolidation
            index={3}
            variant="amber"
            video={{
              videoId: "lkK4kZWglOk",
              title: "Problemas Contextualizados com Equações 2º Grau",
              duration: "13:40",
            }}
            resumoVisual={{
              moduloNome: "Módulo 3",
              tituloAula: "Equações do 2º Grau",
              materia: "Matemática",
              images: [
                {
                  title: "Problemas de Geometria",
                  type: "Aplicação",
                  placeholderColor: "bg-amber-500/20",
                },
                {
                  title: "Lançamento de Projéteis",
                  type: "Física",
                  placeholderColor: "bg-orange-500/20",
                },
                {
                  title: "Descarte de Soluções Inválidas",
                  type: "Análise",
                  placeholderColor: "bg-yellow-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Nem Toda Raiz Vale!",
              content: (
                <div className="space-y-4 text-left">
                  <p className="text-sm italic">
                    "Raiz negativa? Analisa o contexto!"
                  </p>
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center text-sm">
                    <p>Comprimento: Descarte negativo ✗</p>
                    <p>Tempo: Pode ser válido se for momento 2 ✓</p>
                    <p>Velocidade: Descarte negativo ✗</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Sempre questione se a resposta faz sentido!
                  </p>
                </div>
              ),
            }}
            audio={{
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Problemas Reais com Equações 2º Grau",
              artista: "Prof. Algébrico",
            }}
          />

                      <QuizInterativo
              questoes={quizM3}
              titulo="QUIZ: Módulo Nº 3"
              numero={4}
              variant="amber"
              icone="🎯"
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 4: PROBLEMAS CONTEXTUALIZADOS ═══ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={4}
            titulo="O Gráfico e os Vértices"
            descricao="Encontrando o limite absoluto: Lucro Máximo e Altura Máxima."
            gradiente="bg-gradient-to-br from-rose-300 via-rose-500 to-rose-400"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={4}
              title="O Ápice da Parábola"
              description="Identificando o pico e o fundo do poço sem precisar desenhar o gráfico."
              variant="cyan"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Sorriso ou Tristeza?",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center">
                        <p className="font-bold text-emerald-700">
                          Se a &gt; 0 (Positivo)
                        </p>
                        <p className="font-black text-lg text-foreground my-2">
                          Côncava p/ Cima ∪
                        </p>
                        <p className="text-sm text-muted-foreground">
                          O vértice é o ponto de <strong>MÍNIMO</strong> (fundo
                          do poço). Usado para custo mínimo.
                        </p>
                      </div>
                      <div className="p-4 bg-rose-500/10 rounded-xl border border-rose-500/20 text-center">
                        <p className="font-bold text-rose-700">
                          Se a &lt; 0 (Negativo)
                        </p>
                        <p className="font-black text-lg text-foreground my-2">
                          Côncava p/ Baixo ∩
                        </p>
                        <p className="text-sm text-muted-foreground">
                          O vértice é o ponto de <strong>MÁXIMO</strong> (topo
                          do morro). Usado para lucro e altura.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - XV ou YV?",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        A banca sempre perguntará duas variações disso. Se a
                        função for Lucro = L(Q):
                      </p>
                      <ul className="list-none space-y-4 font-mono text-sm max-w-lg mx-auto bg-muted p-4 rounded-xl border border-border">
                        <li>
                          <p className="font-bold text-cyan-600 uppercase">
                            Qual a quantidade para dar o lucro MAX?
                          </p>
                          <p>
                            Ele quer o <strong>X do Vértice</strong> (Xv =
                            -b/2a)
                          </p>
                        </li>
                        <div className="h-px bg-border/50 w-full my-2" />
                        <li>
                          <p className="font-bold text-cyan-600 uppercase">
                            Afinal, qual FOI esse lucro MAX em si?
                          </p>
                          <p>
                            Ele quer o <strong>Y do Vértice</strong> (Yv =
                            -Δ/4a)
                          </p>
                        </li>
                      </ul>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Cálculo do Vértice",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20">
                        <p className="font-mono text-sm font-bold text-cyan-700">
                          x_v = -b / 2a
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Encontre a coordenada X do vértice
                        </p>
                      </div>
                      <div className="bg-sky-500/10 p-4 rounded-xl border border-sky-500/20">
                        <p className="font-mono text-sm font-bold text-sky-700">
                          y_v = f(x_v) ou y_v = -Δ / 4a
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Encontre a coordenada Y do vértice
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Quando a Função Não tem Máximo",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox
                        tipo="warning"
                        titulo="Parábola Abre para Cima (a > 0)"
                      >
                        <p className="text-sm">
                          Tem MÍNIMO, mas NÃO tem máximo global. Confira o
                          domínio!
                        </p>
                      </AlertBox>
                      <AlertBox tipo="info" titulo="Domínio Restrito">
                        <p className="text-sm">
                          Se o problema restringe x (ex: 0 ≤ x ≤ 100), o máximo
                          pode estar no vértice OU na borda do intervalo.
                        </p>
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-4" className="mt-16">
          











<ModuleConsolidation
            index={4}
            variant="cyan"
            video={{
              videoId: "bPfYCGCYRN8",
              title: "Vértice e Otimização: Máximos e Mínimos",
              duration: "15:20",
            }}
            resumoVisual={{
              moduloNome: "Módulo 4",
              tituloAula: "Equações do 2º Grau",
              materia: "Matemática",
              images: [
                {
                  title: "a > 0: Mínimo (∪)",
                  type: "Côncava",
                  placeholderColor: "bg-cyan-500/20",
                },
                {
                  title: "a < 0: Máximo (∩)",
                  type: "Côncava",
                  placeholderColor: "bg-sky-500/20",
                },
                {
                  title: "Xv = -b/2a, Yv = -Δ/4a",
                  type: "Fórmulas",
                  placeholderColor: "bg-blue-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Sorriso vs Tristeza",
              content: (
                <div className="space-y-4 text-left">
                  <p className="text-sm italic">
                    "O sinal de 'a' determina tudo!"
                  </p>
                  <div className="grid grid-cols-2 gap-2 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-center text-sm font-mono">
                    <div>
                      <p className="font-bold text-emerald-700">a &gt; 0 ∪</p>
                      <p className="text-xs">Mínimo</p>
                    </div>
                    <div>
                      <p className="font-bold text-rose-700">a &lt; 0 ∩</p>
                      <p className="text-xs">Máximo</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Sempre o vértice é no x = -b/2a
                  </p>
                </div>
              ),
            }}
            audio={{
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Otimização: Máximos e Mínimos",
              artista: "Prof. Algébrico",
            }}
          />

                      <QuizInterativo
              questoes={quizM4}
              titulo="Fixação - Problemas Contextualizados"
              numero={4}
              variant="cyan"
              icone="🎯"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 5: DESAFIO PARCIAL ═══ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={5}
            titulo="Desafio Parcial"
            descricao="Consolidando os conhecimentos dos primeiros 4 módulos."
            gradiente="bg-gradient-to-br from-violet-300 via-violet-500 to-violet-400"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={5}
              title="Revisão Estratégica"
              description="Antes de avançar para técnicas mais sofisticadas, teste seu domínio."
              variant="violet"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Integrando Tudo",
                  icone: <LuRepeat />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        Até agora você aprendeu a identificar coeficientes, usar
                        Bhaskara e aplicar em contextos. Agora vamos integrar!
                      </p>
                      <AlertBox tipo="success" titulo="Rotina Completa">
                        <p className="text-sm">1. Extraia a, b, c</p>
                        <p className="text-sm">2. Calcule Δ</p>
                        <p className="text-sm">3. Se Δ ≥ 0, aplique Bhaskara</p>
                        <p className="text-sm">
                          4. Analise as raízes no contexto
                        </p>
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <FunctionGraph
            title="Análise Completa de Parábolas"
            functions={[
              {
                id: "func1",
                label: "y = x² - 6x + 5",
                color: "#3b82f6",
                fn: (x) => x * x - 6 * x + 5,
                strokeWidth: 2,
              },
              {
                id: "func2",
                label: "y = -x² + 4",
                color: "#ef4444",
                fn: (x) => -(x * x) + 4,
                strokeWidth: 2,
              },
            ]}
            xMin={-2}
            xMax={6}
            yMin={-3}
            yMax={5}
            points={250}
          />



          <section id="quiz-modulo-5" className="mt-16">
          











<ModuleConsolidation
            index={5}
            variant="violet"
            video={{
              videoId: "SJ-S32r9GUo",
              title: "Revisão: Equações 2º Grau Completas",
              duration: "16:45",
            }}
            resumoVisual={{
              moduloNome: "Módulo 5",
              tituloAula: "Equações do 2º Grau",
              materia: "Matemática",
              images: [
                {
                  title: "Extrair a, b, c",
                  type: "Passo 1",
                  placeholderColor: "bg-violet-500/20",
                },
                {
                  title: "Calcular Δ e Raízes",
                  type: "Passo 2",
                  placeholderColor: "bg-purple-500/20",
                },
                {
                  title: "Analisar Contexto",
                  type: "Passo 3",
                  placeholderColor: "bg-indigo-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Checklist do Sucesso",
              content: (
                <div className="space-y-4 text-left">
                  <p className="text-sm italic">"Siga os passos SEMPRE!"</p>
                  <div className="p-4 bg-violet-500/10 border border-violet-500/20 rounded-xl text-sm space-y-2">
                    <p>✓ a, b, c extraídos?</p>
                    <p>✓ Δ calculado?</p>
                    <p>✓ Bhaskara aplicado?</p>
                    <p>✓ Contexto analisado?</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Se um passo falhar, volta e refaz!
                  </p>
                </div>
              ),
            }}
            audio={{
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Desafio: Integrando Conceitos",
              artista: "Prof. Algébrico",
            }}
          />

                      <QuizInterativo
              questoes={quizM5}
              titulo="QUIZ: Módulo Nº 5"
              numero={6}
              variant="violet"
              icone="📊"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 6: SOMA E PRODUTO ═══ */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={6}
            titulo="Soma e Produto (Relações de Vieta)"
            descricao="Os atalhos dos ninjas: descubra raízes sem Bhaskara."
            gradiente="bg-gradient-to-br from-amber-900 via-amber-500 to-amber-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={6}
              title="Relações de Vieta"
              description="Soma e produto das raízes."
              variant="emerald"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - A Relação Mágica",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Para a equação ax² + bx + c = 0:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-emerald-500/30 bg-emerald-500/10 p-4 rounded-lg text-center">
                          <div className="text-emerald-700 font-black mb-1">
                            SOMA DAS RAÍZES
                          </div>
                          <p className="font-mono text-lg">S = -b/a</p>
                        </div>
                        <div className="border border-emerald-500/30 bg-emerald-500/10 p-4 rounded-lg text-center">
                          <div className="text-emerald-700 font-black mb-1">
                            PRODUTO DAS RAÍZES
                          </div>
                          <p className="font-mono text-lg">P = c/a</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Aplicação Prática",
                  icone: <LuSigma />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        Dada x² - 7x + 10 = 0:
                      </p>
                      <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                        <p className="text-sm mb-2">Soma: S = -(-7)/1 = 7</p>
                        <p className="text-sm mb-2">Produto: P = 10/1 = 10</p>
                        <p className="text-sm">
                          Que dois números somam 7 e multiplicam 10? 2 e 5!
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - O Macete Final",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="success" titulo="Comece Sempre pelo Fim">
                        <p className="text-sm">
                          Comece sempre pensando quais números multiplicados dão
                          o c. Exemplo: x² - 7x + 10 = 0. Produto é 10. O que
                          vezes o que dá 10? (2 e 5) ou (1 e 10). Desses, qual
                          par somado (logo soma 7) dá 7? O par é 2 e 5.
                        </p>
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Quando Isso NÃO Funciona",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="warning" titulo="a ≠ 1">
                        <p className="text-sm">
                          Se a ≠ 1, você precisa de Bhaskara. Soma e Produto
                          ficam mais complexas.
                        </p>
                      </AlertBox>
                      <AlertBox tipo="info" titulo="Raízes Irracionais">
                        <p className="text-sm">
                          Se as raízes envolvem √, Soma e Produto é mais
                          trabalhoso. Use Bhaskara.
                        </p>
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-6" className="mt-16">
          











<ModuleConsolidation
            index={6}
            variant="emerald"
            video={{
              videoId: "8mR0h4Ymfuo",
              title: "Soma e Produto: Relações de Vieta",
              duration: "12:50",
            }}
            resumoVisual={{
              moduloNome: "Módulo 6",
              tituloAula: "Equações do 2º Grau",
              materia: "Matemática",
              images: [
                {
                  title: "Soma = -b/a",
                  type: "Fórmula",
                  placeholderColor: "bg-emerald-500/20",
                },
                {
                  title: "Produto = c/a",
                  type: "Fórmula",
                  placeholderColor: "bg-teal-500/20",
                },
                {
                  title: "Encontre números que somam e multiplicam",
                  type: "Método",
                  placeholderColor: "bg-green-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Truque do Produto",
              content: (
                <div className="space-y-4 text-left">
                  <p className="text-sm italic">"Comece pelo produto!"</p>
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl font-mono text-center text-sm">
                    <p>1. Qual número × qual = P?</p>
                    <p>2. Desses, qual soma = S?</p>
                    <p>3. Pronto!</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Rápido quando funciona. Bhaskara se ficar confuso!
                  </p>
                </div>
              ),
            }}
            audio={{
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Soma e Produto: O Atalho",
              artista: "Prof. Algébrico",
            }}
          />

                      <QuizInterativo
              questoes={quizM6}
              titulo="Fixação - Soma e Produto"
              numero={6}
              variant="emerald"
              icone="🎯"
              onComplete={(score) => handleModuleComplete("modulo-6", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 7: GRÁFICOS E PARÁBOLAS ═══ */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={7}
            titulo="Gráficos e Parábolas"
            descricao="Visualizando raízes, vértices e o comportamento das parábolas."
            gradiente="bg-gradient-to-br from-blue-900 via-blue-500 to-blue-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={7}
              title="O Ápice da Parábola"
              description="Encontrando máximos e mínimos."
              variant="cyan"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Vértice e Eixo de Simetria",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        O vértice é o ponto extremo da parábola. Sua coordenada
                        x é:
                      </p>
                      <div className="bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20 text-center">
                        <p className="font-mono text-lg font-bold text-cyan-700">
                          x_v = -b / 2a
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        A reta vertical que passa por x_v é o eixo de simetria
                        da parábola.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Encontrando Coordenadas",
                  icone: <LuZap />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        Para y = x² - 4x + 3:
                      </p>
                      <div className="bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20">
                        <p className="text-sm font-mono">
                          a = 1, b = -4, c = 3
                        </p>
                        <p className="text-sm font-mono mt-2">
                          x_v = -(-4) / 2(1) = 4/2 = 2
                        </p>
                        <p className="text-sm font-mono mt-2">
                          y_v = 2² - 4(2) + 3 = 4 - 8 + 3 = -1
                        </p>
                        <p className="text-sm mt-2 text-muted-foreground">
                          Vértice: (2, -1)
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Características Gráficas",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/20">
                        <p className="font-bold text-cyan-700 text-sm mb-2">
                          Raízes (Zeros)
                        </p>
                        <p className="text-sm">
                          Pontos onde a parábola cruza o eixo X
                        </p>
                      </div>
                      <div className="bg-sky-500/10 p-4 rounded-lg border border-sky-500/20">
                        <p className="font-bold text-sky-700 text-sm mb-2">
                          Vértice
                        </p>
                        <p className="text-sm">Ponto de mínimo ou máximo</p>
                      </div>
                      <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                        <p className="font-bold text-blue-700 text-sm mb-2">
                          Interseção com Y
                        </p>
                        <p className="text-sm">Quando x=0, y=c</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Transformações",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="info" titulo="Translação">
                        <p className="text-sm">
                          Se vira y = (x-h)² + k, o vértice move para (h, k)
                        </p>
                      </AlertBox>
                      <AlertBox tipo="warning" titulo="Reflexão">
                        <p className="text-sm">
                          Se a &lt; 0, a parábola vira de cabeça para baixo
                        </p>
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-7" className="mt-16">
          











<ModuleConsolidation
            index={7}
            variant="cyan"
            video={{
              videoId: "qAHgWGWZhGs",
              title: "Gráficos de Parábolas: Visualização Completa",
              duration: "14:30",
            }}
            resumoVisual={{
              moduloNome: "Módulo 7",
              tituloAula: "Equações do 2º Grau",
              materia: "Matemática",
              images: [
                {
                  title: "Raízes no eixo X",
                  type: "Zeros",
                  placeholderColor: "bg-cyan-500/20",
                },
                {
                  title: "Vértice (pico ou fundo)",
                  type: "Extremo",
                  placeholderColor: "bg-sky-500/20",
                },
                {
                  title: "Eixo de simetria",
                  type: "Propriedade",
                  placeholderColor: "bg-blue-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "3 Pontos Chave",
              content: (
                <div className="space-y-4 text-left">
                  <p className="text-sm italic">
                    "Todo gráfico tem três informações!"
                  </p>
                  <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-sm space-y-2 font-mono text-center">
                    <p>1. Raízes (x₁, 0) e (x₂, 0)</p>
                    <p>2. Vértice (x_v, y_v)</p>
                    <p>3. Interseção Y (0, c)</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Marque esses e você terá o gráfico!
                  </p>
                </div>
              ),
            }}
            audio={{
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Gráficos: Visualizando Parábolas",
              artista: "Prof. Algébrico",
            }}
          />

                      <QuizInterativo
              questoes={quizM7}
              titulo="QUIZ: Módulo Nº 7"
              numero={8}
              variant="cyan"
              icone="📈"
              onComplete={(score) => handleModuleComplete("modulo-7", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 8: RESOLUÇÃO REVERSA ═══ */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={8}
            titulo="Resolução Reversa"
            descricao="Do resultado para a equação: encontre coeficientes e parâmetros."
            gradiente="bg-gradient-to-br from-emerald-900 via-emerald-500 to-emerald-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={8}
              title="Pensamento Inverso"
              description="Quando a banca dá as raízes, ache a equação."
              variant="rose"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Montando a Equação",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Se as raízes são r₁ e r₂, a equação é:
                      </p>
                      <div className="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20 text-center">
                        <p className="font-mono text-lg font-bold text-rose-700">
                          x² - (r₁+r₂)x + r₁r₂ = 0
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Ou, genericamente: (x - r₁)(x - r₂) = 0
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Aplicação Direta",
                  icone: <LuSigma />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        Se as raízes são 3 e -2:
                      </p>
                      <div className="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20">
                        <p className="text-sm font-mono">Soma: 3 + (-2) = 1</p>
                        <p className="text-sm font-mono mt-2">
                          Produto: 3 × (-2) = -6
                        </p>
                        <p className="text-sm font-mono mt-2">
                          Equação: x² - 1x + (-6) = 0
                        </p>
                        <p className="text-sm font-mono mt-1">
                          Ou: x² - x - 6 = 0
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Com Parâmetros",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="info" titulo="Raízes em Função de m">
                        <p className="text-sm">
                          Se a banca dá "raízes são m+1 e m-1", use Soma e
                          Produto em função de m!
                        </p>
                      </AlertBox>
                      <div className="bg-rose-500/10 p-4 rounded-lg border border-rose-500/20">
                        <p className="text-sm">Soma: (m+1) + (m-1) = 2m</p>
                        <p className="text-sm mt-2">
                          Produto: (m+1)(m-1) = m² - 1
                        </p>
                        <p className="text-sm mt-2">
                          Equação: x² - 2mx + (m² - 1) = 0
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Com Coeficiente a ≠ 1",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="warning" titulo="Quando a ≠ 1">
                        <p className="text-sm">
                          Use (x - r₁)(x - r₂) = 0 e depois expanda,
                          multiplicando por 'a' ao final.
                        </p>
                      </AlertBox>
                      <div className="bg-rose-500/10 p-4 rounded-lg border border-rose-500/20 text-sm">
                        <p>Se a = 2, r₁ = 3, r₂ = -1:</p>
                        <p className="mt-2">2(x - 3)(x + 1) = 0</p>
                        <p className="mt-2">2(x² + x - 3x - 3) = 0</p>
                        <p className="mt-2">2(x² - 2x - 3) = 0</p>
                        <p className="mt-2">2x² - 4x - 6 = 0</p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-8" className="mt-16">
          











<ModuleConsolidation
            index={8}
            variant="rose"
            video={{
              videoId: "v8HEYcH0WeM",
              title: "Resolução Reversa: Das Raízes à Equação",
              duration: "13:15",
            }}
            resumoVisual={{
              moduloNome: "Módulo 8",
              tituloAula: "Equações do 2º Grau",
              materia: "Matemática",
              images: [
                {
                  title: "Dadas as raízes",
                  type: "Entrada",
                  placeholderColor: "bg-rose-500/20",
                },
                {
                  title: "Calcule Soma e Produto",
                  type: "Passo",
                  placeholderColor: "bg-pink-500/20",
                },
                {
                  title: "x² - Sx + P = 0",
                  type: "Resultado",
                  placeholderColor: "bg-red-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Inverso de Bhaskara",
              content: (
                <div className="space-y-4 text-left">
                  <p className="text-sm italic">
                    "Se a banca dá raízes, construa a equação!"
                  </p>
                  <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl font-mono text-center text-sm">
                    <p>1. Soma = r₁ + r₂</p>
                    <p>2. Produto = r₁ × r₂</p>
                    <p>3. x² - Sx + P = 0</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Rápido e elegante!
                  </p>
                </div>
              ),
            }}
            audio={{
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Reversa: Construindo Equações",
              artista: "Prof. Algébrico",
            }}
          />

                      <QuizInterativo
              questoes={quizM8}
              titulo="Fixação - Resolução Reversa"
              numero={8}
              variant="rose"
              icone="🔄"
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
            descricao="Problemas reais de otimização em operações de petróleo e gás."
            gradiente="bg-gradient-to-br from-rose-900 via-rose-500 to-rose-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={9}
              title="Contexto Industrial"
              description="Equações que resolvem problemas verdadeiros."
              variant="amber"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Otimização em Operações",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Problemas de rendimento máximo, custo mínimo e pressão
                        ótima são modelados por funções quadráticas. O vértice
                        da parábola é sempre a solução.
                      </p>
                      <AlertBox tipo="success" titulo="Modelo Típico">
                        <p className="text-sm">
                          Lucro L(x) = Receita - Custo. Se ambas envolvem x²,
                          teremos uma quadrática.
                        </p>
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Produção de Derivados",
                  icone: <LuZap />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        Uma refinaria produz x barris por dia. O lucro é L(x) =
                        -2x² + 1000x - 50000. Qual a produção que maximiza
                        lucro?
                      </p>
                      <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20">
                        <p className="text-sm font-mono">
                          a = -2, b = 1000, c = -50000
                        </p>
                        <p className="text-sm font-mono mt-2">
                          x_v = -1000 / 2(-2) = -1000 / -4 = 250 barris
                        </p>
                        <p className="text-sm mt-2 text-muted-foreground">
                          Produção ótima: 250 barris/dia
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Interpretação de Contexto",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                        <p className="font-bold text-amber-700 text-sm mb-2">
                          Custo Unitário Mínimo
                        </p>
                        <p className="text-sm">
                          Minimizar C(x)/x, não C(x) diretamente
                        </p>
                      </div>
                      <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                        <p className="font-bold text-orange-700 text-sm mb-2">
                          Temperatura Ótima
                        </p>
                        <p className="text-sm">
                          Rendimento é máximo quando T = x_v da função
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Limitações Práticas",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="warning" titulo="Domínio Restrito">
                        <p className="text-sm">
                          Se x deve estar em [0, 500], o máximo pode NÃO estar
                          no vértice. Verifique os limites!
                        </p>
                      </AlertBox>
                      <AlertBox tipo="info" titulo="Valores Inteiros">
                        <p className="text-sm">
                          Se x deve ser inteiro (barris), arredonde x_v e
                          calcule L para ambos: x_v - 1 e x_v + 1
                        </p>
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-9" className="mt-16">
          











<ModuleConsolidation
            index={9}
            variant="amber"
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "Aplicações Reais: Otimização na Indústria",
              duration: "15:45",
            }}
            resumoVisual={{
              moduloNome: "Módulo 9",
              tituloAula: "Equações do 2º Grau",
              materia: "Matemática",
              images: [
                {
                  title: "Lucro/Custo = f(x)",
                  type: "Modelo",
                  placeholderColor: "bg-amber-500/20",
                },
                {
                  title: "Vértice = Solução Ótima",
                  type: "Técnica",
                  placeholderColor: "bg-orange-500/20",
                },
                {
                  title: "Verificar Domínio e Inteiros",
                  type: "Análise",
                  placeholderColor: "bg-yellow-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Triângulo da Otimização",
              content: (
                <div className="space-y-4 text-left">
                  <p className="text-sm italic">"Sempre otimiza no vértice!"</p>
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center text-sm space-y-2">
                    <p>📍 Modelo Matemático</p>
                    <p>↓</p>
                    <p>🎯 Vértice = Solução</p>
                    <p>↓</p>
                    <p>✓ Verifica Limites</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Sempre os três passos!
                  </p>
                </div>
              ),
            }}
            audio={{
              audioUrl:
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Otimização: Aplicações Petrobras",
              artista: "Prof. Algébrico",
            }}
          />

                      <QuizInterativo
              questoes={quizM9}
              titulo="QUIZ: Módulo Nº 9"
              numero={10}
              variant="amber"
              icone="⚙️"
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
            descricao="Teste seu domínio absoluto sobre Equações do 2º Grau."
            gradiente="bg-gradient-to-br from-violet-900 via-violet-500 to-violet-800"
          />

          {showCompletionBadge ? (
            <div className="flex flex-col items-center gap-6 py-10 mt-10">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center animate-bounce">
                <LuTrophy className="w-12 h-12 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black">Mestre Parabólico!</h3>
              <p className="text-center text-muted-foreground max-w-sm">
                Você dominou completamente as Equações Quadráticas. Raízes,
                gráficos, vértices e aplicações práticas — tudo sob controle!
              </p>
            </div>
          ) : (
            <section id="quiz-modulo-10" className="mt-8">
              <QuizInterativo
                questoes={quizM10}
                titulo="Simulado Mestre - Equações 2º Grau"
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
