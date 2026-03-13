"use client";

import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  LessonTabs,
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
  FlipCard,
  type FunctionPlot,
} from "../shared";

import {
  LuBookOpen,
  LuLightbulb,
  LuTarget,
  LuBrain,
  LuTrophy,
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
  { id: "modulo-1", label: "Módulo 1", titulo: "Conceitos Fundamentais" },
  { id: "modulo-2", label: "Módulo 2", titulo: "Fórmula de Bhaskara" },
  { id: "modulo-3", label: "Módulo 3", titulo: "Equações Avançadas" },
  { id: "modulo-4", label: "Módulo 4", titulo: "Problemas Contextualizados" },
  { id: "modulo-5", label: "Módulo 5", titulo: "Desafio Parcial" },
  { id: "modulo-6", label: "Módulo 6", titulo: "Soma e Produto (Atalhos)" },
  { id: "modulo-7", label: "Módulo 7", titulo: "Gráficos e Parábolas" },
  { id: "modulo-8", label: "Módulo 8", titulo: "Resolução Reversa" },
  { id: "modulo-9", label: "Módulo 9", titulo: "Aplicações Petrobras" },
  { id: "modulo-10", label: "Módulo 10", titulo: "Simulado Mestre" },
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

  const [quizM1, setQuizM1] = useState<typeof QUIZ_M1_CONCEITOS>([]);
  const [quizM2, setQuizM2] = useState<typeof QUIZ_M2_BHASKARA>([]);
  const [quizM3, setQuizM3] = useState<typeof QUIZ_M3_AVANCADAS>([]);
  const [quizM4, setQuizM4] = useState<typeof QUIZ_M4_PROBLEMAS>([]);
  const [quizM5, setQuizM5] = useState<typeof QUIZ_M5_FINAL>([]);
  const [quizM6, setQuizM6] = useState<typeof QUIZ_M6_SOMA_PRODUTO>([]);
  const [quizM7, setQuizM7] = useState<typeof QUIZ_M7_GRAFICOS>([]);
  const [quizM8, setQuizM8] = useState<typeof QUIZ_M8_REVERSA>([]);
  const [quizM9, setQuizM9] = useState<typeof QUIZ_M9_PETROBRASESPECIFICO>([]);
  const [quizM10, setQuizM10] = useState<typeof QUIZ_M10_SIMULADO_MESTRE>([]);

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

  useEffect(() => {
    if (!loading) {
      setQuizM1(getRandomQuestions(QUIZ_M1_CONCEITOS, 4));
      setQuizM2(getRandomQuestions(QUIZ_M2_BHASKARA, 4));
      setQuizM3(getRandomQuestions(QUIZ_M3_AVANCADAS, 4));
      setQuizM4(getRandomQuestions(QUIZ_M4_PROBLEMAS, 4));
      setQuizM5(getRandomQuestions(QUIZ_M5_FINAL, 4));
      setQuizM6(getRandomQuestions(QUIZ_M6_SOMA_PRODUTO, 4));
      setQuizM7(getRandomQuestions(QUIZ_M7_GRAFICOS, 4));
      setQuizM8(getRandomQuestions(QUIZ_M8_REVERSA, 4));
      setQuizM9(getRandomQuestions(QUIZ_M9_PETROBRASESPECIFICO, 4));
      setQuizM10(getRandomQuestions(QUIZ_M10_SIMULADO_MESTRE, 5));
    }
  }, [loading]);

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
      {/* ═══ MÓDULO 1 ═══ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={1}
            titulo="Fórmula de Bhaskara"
            descricao="A fórmula mais famosa da Matemática. Dominando o a, b e c."
            gradiente="bg-gradient-to-br from-blue-700 to-sky-800"
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
                  titulo: "Extraindo a, b e c",
                  icone:<LuTarget />,
                  conteudo:(
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
                  titulo: "A Trindade do Delta (Discriminante)",
                  icone:<LuBookOpen />,
                  conteudo:(
                    <div className="space-y-4">
                      <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 text-center shadow-inner">
                        <p className="text-xl font-bold font-mono text-blue-700">
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
                  titulo: "Finalizando o Bhaskara",
                  icone:<LuTarget />,
                  conteudo:(
                    <div className="space-y-4 text-center">
                      <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 shadow-inner inline-block">
                        <p className="text-xl font-bold font-mono text-blue-700">
                          x = (-b ± √Δ) / 2a
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Resolva o braço positivo (x1) usando o `+` e o braço
                        negativo (x2) usando o `-`.
                      </p>
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

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Dossiê de Memorização: Raízes Incompletas"
              description="Perguntas rápidas para consolidar coeficientes."
              variant="blue"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FlipCard
                frente={
                  <div className="flex flex-col items-center gap-2">
                    <LuTarget className="w-6 h-6 text-blue-500" />
                    <p className="font-bold text-center">C é 0 (x² - 5x = 0)</p>
                  </div>
                }
                verso={
                  <div className="flex flex-col items-center gap-3">
                    <LuBookOpen className="w-6 h-6 text-emerald-500" />
                    <p className="font-bold text-center text-sm">Fatore x</p>
                    <p className="text-xs text-muted-foreground text-center">
                      x(x - 5) = 0. Então as raízes são sempre 0 e o valor de -b/a. Raízes: 0 e 5.
                    </p>
                  </div>
                }
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center gap-2">
                    <LuTarget className="w-6 h-6 text-blue-500" />
                    <p className="font-bold text-center">B é 0 (x² - 16 = 0)</p>
                  </div>
                }
                verso={
                  <div className="flex flex-col items-center gap-3">
                    <LuBookOpen className="w-6 h-6 text-emerald-500" />
                    <p className="font-bold text-center text-sm">Passe pro outro lado</p>
                    <p className="text-xs text-muted-foreground text-center">
                      x² = 16. Tire a raiz dos dois lados: x = ±4. (Não esqueça do + e -).
                    </p>
                  </div>
                }
              />
            </div>
          </section>

          <div className="space-y-8 bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm">
            <ModuleSectionHeader
              index={3}
              title="Resumo do Módulo 1"
              variant="blue"
              className="mb-6"
            />
            <LessonTabs
              tabs={[
                {
                  id: "resumo-bhaskara",
                  label: "Diagrama do Delta",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Árvore de Decisão do Discriminante",
                          type: "Diagrama",
                          placeholderColor: "bg-blue-100 dark:bg-blue-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Diagrama de árvore estilo industrial dark. Nó inicial "Delta (b² - 4ac)". 3 ramos: ">0 (2 raizes)", "=0 (1 raiz)", "<0 (0 reais)".
                        },
                      ]}
                      moduloNome="Módulo 1"
                      tituloAula="Equações do 2º Grau"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </div>

          <QuizInterativo
            questoes={quizM1}
            titulo="Fixação - Módulo 1"
            numero={1}
            variant="blue"
            icone="🧠"
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          />
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 2 ═══ */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={2}
            titulo="Relações de Girard"
            descricao="O atalho dos Ninjas: descubra as raízes sem nem encostar em Bhaskara."
            gradiente="bg-gradient-to-br from-emerald-600 to-teal-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Soma e Produto"
              description="Quando o 'a' vale 1, você resolve a equação por pura dedução."
              variant="emerald"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "A Regra Mágica",
                  icone:<LuLightbulb />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Quando{" "}
                        <strong className="text-emerald-600">a = 1</strong> na
                        equação, as raízes secretas (x1 e x2) obedecem a uma lei
                        da física matemática:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-emerald-500/30 bg-emerald-500/10 p-4 rounded-lg text-center">
                          <div className="text-emerald-700 font-black mb-1">
                            A SOMA DAS RAÍZES
                          </div>
                          <p className="font-mono text-lg">S = -b</p>
                        </div>
                        <div className="border border-emerald-500/30 bg-emerald-500/10 p-4 rounded-lg text-center">
                          <div className="text-emerald-700 font-black mb-1">
                            O PRODUTO (MULTIPLICAÇÃO)
                          </div>
                          <p className="font-mono text-lg">P = c</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Aplicação (O Macete Final)",
                  icone:<LuTarget />,
                  conteudo:(
                    <div className="space-y-4">
                      <AlertBox tipo="success" titulo="Comece sempre pelo Fim">
                        <p>
                          Comece sempre pensando quais números multiplicados dão
                          o <strong className="font-mono">c</strong>. Exemplo:{" "}
                          <code>x² - 7x + 10 = 0</code>. <br />
                          <br />
                          1. Produto é 10. O que vezes o que dá 10? (2 e 5) ou
                          (1 e 10).
                          <br />
                          2. Desses, qual par somado (invertendo o sinal do b,
                          logo soma 7) dá 7?
                          <br />
                          3. O par é <strong>2 e 5</strong>. E acabou a conta.
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

          <QuizInterativo
            questoes={quizM2}
            titulo="Fixação - Módulo 2"
            numero={2}
            variant="emerald"
            icone="🎯"
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          />
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 3 ═══ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={3}
            titulo="Problemas Físicos e Geométricos"
            descricao="Como a banca usa terrenos e gravidade para emboscar você."
            gradiente="bg-gradient-to-br from-amber-600 to-orange-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Tradução Física das Raízes"
              description="Ninguém desenha uma parábola sem motivo de prova."
              variant="amber"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Terrenos e a Raiz Negativa",
                  icone:<LuBookOpen />,
                  conteudo:(
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
                  titulo: "Lançamento de Projéteis",
                  icone:<LuTarget />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Se o problema falar de "quando o balão atingiu o chão"
                        baseado numa função <code>h(t) = -2t² + 18t</code>. Ele
                        quer saber o Tempo (t) quando a Altura (h) for zero. Ou
                        seja, iguale a equação a zero e encontre as raízes. Uma
                        raiz será o instante do lançamento (t=0) e a outra
                        quando bateu no solo (t=9 min).
                      </p>
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

          <QuizInterativo
            questoes={quizM3}
            titulo="Fixação - Módulo 3"
            numero={3}
            variant="amber"
            icone="🎯"
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 4 ═══ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={4}
            titulo="O Gráfico e os Vértices"
            descricao="Encontrando o limite absoluto: Lucro Máximo e Altura Máxima."
            gradiente="bg-gradient-to-br from-cyan-600 to-sky-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="O Ápice da Parábola"
              description="Identificando o pico e o fundo do poço sem precisar desenhar o gráfico."
              variant="cyan"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Sorriso ou Tristeza?",
                  icone:<LuBrain />,
                  conteudo:(
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
                  titulo: "XV ou YV? A Pegadinha Brutal",
                  icone:<LuTarget />,
                  conteudo:(
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
              ]}
            />
          </section>

          <div className="space-y-8 bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm">
            <ModuleSectionHeader
              index={2}
              title="Resumo do Módulo 4"
              variant="cyan"
              className="mb-6"
            />
            <LessonTabs
              tabs={[
                {
                  id: "resumo-vertices",
                  label: "Tabela dos Vértices",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Quando usar Xv vs Yv",
                          type: "Tabela",
                          placeholderColor: "bg-cyan-100 dark:bg-cyan-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Tabela técnica estilo industrial Petrobras: Coluna 1 "A pergunta pede" (Instante do lucro máx, Quantidade para custo min). Coluna 2 "Fórmula a usar" (Xv = -b/2a). Coluna 3 "A pergunta pede" (Qual o lucro máx, Qual a altura máx). Coluna 4 "Fórmula a usar" (Yv = -Delta/4a).
                        },
                      ]}
                      moduloNome="Módulo 4"
                      tituloAula="Equações do 2º Grau"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </div>

          <QuizInterativo
            questoes={quizM4}
            titulo="Fixação - Módulo 4"
            numero={4}
            variant="cyan"
            icone="🎯"
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
          />
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 5 ═══ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={5}
            titulo="Desafio Parcial"
            descricao="Consolidando os conhecimentos dos primeiros 4 módulos."
            gradiente="bg-gradient-to-br from-indigo-600 to-purple-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Revisão Estratégica"
              description="Antes de avançar para técnicas mais sofisticadas, teste seu domínio."
              variant="violet"
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

          <QuizInterativo
            questoes={quizM5}
            titulo="Fixação - Módulo 5"
            numero={5}
            variant="violet"
            icone="📊"
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
          />
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 6 ═══ */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={6}
            titulo="Soma e Produto"
            descricao="Os atalhos dos ninjas: descubra raízes sem Bhaskara."
            gradiente="bg-gradient-to-br from-emerald-600 to-teal-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Relações de Vieta"
              description="Soma e produto das raízes."
              variant="emerald"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "A Relação Mágica",
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
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM6}
            titulo="Fixação - Módulo 6"
            numero={6}
            variant="emerald"
            icone="🎯"
            onComplete={(score) => handleModuleComplete("modulo-6", score)}
          />
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 7 ═══ */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={7}
            titulo="Gráficos e Parábolas"
            descricao="Visualizando raízes, vértices e o comportamento das parábolas."
            gradiente="bg-gradient-to-br from-cyan-600 to-sky-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="O Ápice da Parábola"
              description="Encontrando máximos e mínimos."
              variant="cyan"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Vértice e Eixo de Simetria",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        O vértice é o ponto extremo da parábola. Sua coordenada x é:
                      </p>
                      <div className="bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20 text-center">
                        <p className="font-mono text-lg font-bold text-cyan-700">
                          x_v = -b / 2a
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM7}
            titulo="Fixação - Módulo 7"
            numero={7}
            variant="cyan"
            icone="📈"
            onComplete={(score) => handleModuleComplete("modulo-7", score)}
          />
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 8 ═══ */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={8}
            titulo="Resolução Reversa"
            descricao="Do resultado para a equação: encontre coeficientes e parâmetros."
            gradiente="bg-gradient-to-br from-rose-600 to-pink-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Pensamento Inverso"
              description="Quando a banca dá as raízes, ache a equação."
              variant="rose"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Montando a Equação",
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
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM8}
            titulo="Fixação - Módulo 8"
            numero={8}
            variant="rose"
            icone="🔄"
            onComplete={(score) => handleModuleComplete("modulo-8", score)}
          />
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 9 ═══ */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={9}
            titulo="Aplicações Petrobras"
            descricao="Problemas reais de otimização em operações de petróleo e gás."
            gradiente="bg-gradient-to-br from-yellow-600 to-orange-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Contexto Industrial"
              description="Equações que resolvem problemas verdadeiros."
              variant="amber"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Otimização em Operações",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Problemas de rendimento máximo, custo mínimo e pressão ótima são modelados por funções quadráticas. O vértice da parábola é sempre a solução.
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM9}
            titulo="Fixação - Módulo 9"
            numero={9}
            variant="amber"
            icone="⚙️"
            onComplete={(score) => handleModuleComplete("modulo-9", score)}
          />
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 10 ═══ */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={10}
            titulo="Simulado Mestre"
            descricao="Teste seu domínio absoluto sobre Equações do 2º Grau."
            gradiente="bg-gradient-to-br from-slate-800 to-slate-900"
          />

          {showCompletionBadge ? (
            <div className="flex flex-col items-center gap-6 py-10 mt-10">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center animate-bounce">
                <LuTrophy className="w-12 h-12 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black">Mestre Parabólico!</h3>
              <p className="text-center text-muted-foreground max-w-sm">
                Você dominou completamente as Equações Quadráticas. Raízes, gráficos, vértices e aplicações práticas — tudo sob controle!
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












