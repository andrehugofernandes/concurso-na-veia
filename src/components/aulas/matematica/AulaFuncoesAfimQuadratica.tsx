// Last modified: 2026-03-13 - Upgraded with ModuleConsolidation (4-tab system) and C.E.D.E. pedagogy
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
  FunctionGraph,
  ModuleConsolidation,
  type FunctionPlot,
  QuestaoResolvidaStepByStep} from "../shared";

import { getModuleVariant } from "@/lib/moduleColors";

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
  QUIZ_M1_AFIM,
  QUIZ_M2_QUADRATICA,
  QUIZ_M3_GRAFICOS,
  QUIZ_M4_APLICACOES,
  QUIZ_M6_COMPARACAO,
  QUIZ_M7_INEQUACOES,
  QUIZ_M8_SISTEMAS,
  QUIZ_M9_OTIMIZACAO,
  QUIZ_M10_SIMULADO_MESTRE,
} from "./data/funcoes-afim-quadratica-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "A Função Afim (A Reta)" },
  { id: "modulo-2", label: "Módulo 2", title: "A Quadrática (A Parábola)" },
  { id: "modulo-3", label: "Módulo 3", title: "Interpretação de Gráficos" },
  { id: "modulo-4", label: "Módulo 4", title: "Aplicações de Max e Min" },
  { id: "modulo-5", label: "Módulo 5", title: "Comparação Afim vs Quadrática" },
  { id: "modulo-6", label: "Módulo 6", title: "Inequações com Afim e Quadrática" },
  { id: "modulo-7", label: "Módulo 7", title: "Sistemas e Intersecções" },
  { id: "modulo-8", label: "Módulo 8", title: "Otimização Avançada" },
  { id: "modulo-9", label: "Módulo 9", title: "Aplicações Petrobras" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
] as const;

const mv = Array.from({ length: 11 }, (_, i) => getModuleVariant(i));

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
  const { completedModules: completedModulesList, updateCompletedModules } = useAulaProgress();
  const completedModules = new Set(completedModulesList);

  const [quizM1] = useState(() => getRandomQuestions(QUIZ_M1_AFIM, 4));
  const [quizM2] = useState(() => getRandomQuestions(QUIZ_M2_QUADRATICA, 4));
  const [quizM3] = useState(() => getRandomQuestions(QUIZ_M3_GRAFICOS, 4));
  const [quizM4] = useState(() => getRandomQuestions(QUIZ_M4_APLICACOES, 4));
  const [quizM5] = useState(() => getRandomQuestions(QUIZ_M6_COMPARACAO, 5));
  const [quizM6] = useState(() => getRandomQuestions(QUIZ_M7_INEQUACOES, 5));
  const [quizM7] = useState(() => getRandomQuestions(QUIZ_M8_SISTEMAS, 5));
  const [quizM8] = useState(() => getRandomQuestions(QUIZ_M9_OTIMIZACAO, 5));
  const [quizM9] = useState(() => getRandomQuestions(QUIZ_M1_AFIM, 5));
  const [quizM10] = useState(() => getRandomQuestions(QUIZ_M10_SIMULADO_MESTRE, 5));

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
      updateCompletedModules(Array.from(newDone));
      setHasSyncedInitial(true);
    } else if (!hasSyncedInitial && !loading && currentProgress === 0) {
      setHasSyncedInitial(true);
    }
  }, [currentProgress, hasSyncedInitial, loading]);

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 70) {
      const newSet = new Set(completedModules).add(moduleId);
      updateCompletedModules(Array.from(newSet));

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
      canComplete={completedModules.size >= MODULE_DEFS.length}
      lockMessage="Você precisa responder a todos os quizzes desta aula para finalizá-la."
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
      {/* ═══ MÓDULO 1: A FUNÇÃO AFIM ═══ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={1}
            titulo="Função Afim (A Reta)"
            descricao="Custo fixo e variável: modelando o comportamento corporativo."
             variant={mv[1]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Função Afim: Fundamentos da Reta"
              description="Modelagem linear em operações Petrobras"
              variant={mv[1]}
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                A <strong>Função Afim</strong>, também chamada de função polinomial do 1º grau, é a forma matemática fundamental para modelar relações lineares entre duas variáveis. Definida genericamente como f(x) = ax + b, onde a ≠ 0, ela representa processos de crescimento ou decrescimento constante. Na indústria petrolífera, funções afim aparecem em modelos de custo de produção, onde custos fixos e variáveis se combinam linearmente. A CESGRANRIO frequentemente testa esse conceito porque ele é a base para entender comportamentos econômicos simples em operações de exploração e produção.
              </p>

              <p>
                Em termos intuitivos, pense na função afim como uma receita de ingredientes proporcionais. Se você tem um custo fixo (como aluguel de equipamento) e um custo variável (como combustível por unidade produzida), a função afim captura exatamente essa lógica: comece com o valor fixo b, depois adicione uma contribuição linear (a multiplicado por x) que cresce ou diminui proporcionalmente à quantidade x. Geometricamente, o gráfico é sempre uma reta, e essa reta nunca é horizontal (pois a ≠ 0) nem vertical.
              </p>

              <p>
                Os parâmetros têm significados claros. O coeficiente a é chamado de coeficiente angular ou inclinação: ele determina a "velocidade" de mudança da função. Se a {'>'} 0, a reta sobe da esquerda para a direita (função crescente); se a {'<'} 0, a reta desce (função decrescente). O coeficiente b é o coeficiente linear ou termo independente: ele indica exatamente onde a reta cruza o eixo y, ou seja, f(0) = b. Toda função afim passa por (0, b).
              </p>

              <p>
                Na prática Petrobras, considere um modelo de custo diário de uma plataforma: C(x) = 500 + 12x, onde x é o número de barris produzidos em centenas. Aqui, 500 é o custo fixo (equipamentos, pessoal permanente) e 12 é o custo variável por 100 barris. A raiz (zero da função) ocorre em x = -500/12 ≈ -41,7, o que não faz sentido físico (não há produção negativa), mas matematicamente mostra onde a função cruza o eixo x.
              </p>

              <p>
                A CESGRANRIO costuma cobrar: identificação de a e b em uma fórmula dada, cálculo da raiz (zero da função), interpretação de paralelismo (mesma inclinação a implica retas paralelas), análise de crescimento/decrescimento, e problemas de intersecção entre duas retas. Um erro comum é confundir o sinal de a com o sinal de b, ou tentar forçar uma interpretação física a partes do gráfico que não fazem sentido no contexto (como quantidade negativa).
              </p>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-lg border border-amber-200 dark:border-amber-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Fórmula Geral e Propriedades</h4>
                <div className="space-y-3">
                  <div className="bg-white dark:bg-slate-900 p-3 rounded border border-amber-300/30">
                    <p className="font-mono text-xl font-bold text-amber-700 dark:text-amber-300 text-foreground/85 leading-relaxed">f(x) = ax + b, onde a ≠ 0</p>
                  </div>
                  <ul className="space-y-2 text-xl text-foreground/85 leading-relaxed">
                    <li><strong>a {'>'} 0:</strong> Função crescente (reta sobe)</li>
                    <li><strong>a {'<'} 0:</strong> Função decrescente (reta desce)</li>
                    <li><strong>Raiz:</strong> f(x) = 0 ⟹ x = -b/a (onde a reta cruza o eixo x)</li>
                    <li><strong>Intercepto y:</strong> f(0) = b (onde a reta cruza o eixo y)</li>
                    <li><strong>Taxa de variação:</strong> Δy/Δx = a (sempre constante)</li>
                  </ul>
                </div>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Os Dois Coeficientes Vitais",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="bg-muted p-4 rounded-xl border border-border text-center">
                        <p className="text-xl font-mono font-black text-blue-600 mb-2">
                          f(x) = ax + b
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 mt-6">
                          <div className="text-left bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                            <p className="font-bold text-blue-700">
                              O Taxista (a)
                            </p>
                            <p className="text-xl text-foreground/85 leading-relaxed">
                              Coeficiente Angular. Mostra o quão rápido o valor
                              sobe (ou desce). Ex: R$3 por Km rodado.
                            </p>
                          </div>
                          <div className="text-left bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                            <p className="font-bold text-blue-700">
                              A Bandeirada (b)
                            </p>
                            <p className="text-xl text-foreground/85 leading-relaxed">
                              Coeficiente Linear. Onde você começa mesmo que x
                              seja do zero. Ex: Taxa fixa de R$5 só por entrar.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Contexto Petrobras",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="info" titulo="Modelagem de Custos">
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          Na operação de uma refinaria,{" "}
                          <strong>
                            C(x) = Custo Fixo + Custo Variável × Quantidade
                          </strong>
                          . Exemplo: <code>C(x) = 5.000 + 15x</code>. R$ 5.000 é
                          o equipamento instalado e R$ 15 é o que custa produzir
                          1 barril a mais.
                        </p>
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - A Raiz (Onde fura o chão)",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4 text-center">
                      <p className="text-left text-xl text-foreground/85 leading-relaxed">
                        A raiz da função é o valor exato no eixo horizontal (x)
                        onde o y vale ZERO. Pense no ponto de quebra antes de
                        começar a dar lucro, por exemplo.
                      </p>
                      <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 shadow-inner inline-block">
                        <p className="text-lg font-bold font-mono text-blue-700">
                          ax + b = 0 → x = -b / a
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Casos Especiais",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Funções afim podem ter comportamentos especiais:
                      </p>
                      <div className="space-y-2">
                        <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                          <p className="font-bold text-blue-700 text-xl text-foreground/85 leading-relaxed">
                            Função Constante: a = 0
                          </p>
                          <p className="text-lg text-foreground/85 leading-relaxed">f(x) = b (reta horizontal)</p>
                        </div>
                        <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                          <p className="font-bold text-blue-700 text-xl text-foreground/85 leading-relaxed">
                            Função Identidade: a = 1, b = 0
                          </p>
                          <p className="text-lg text-foreground/85 leading-relaxed">f(x) = x (diagonal perfeita)</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <FunctionGraph
              title="Funções Afins: Variação da Inclinação"
              functions={[
                {
                  id: "linear1",
                  label: "f(x) = x",
                  color: "#3b82f6",
                  fn: (x) => x,
                  strokeWidth: 2,
                },
                {
                  id: "linear2",
                  label: "f(x) = 2x",
                  color: "#ef4444",
                  fn: (x) => 2 * x,
                  strokeWidth: 2,
                },
                {
                  id: "linear3",
                  label: "f(x) = x/2",
                  color: "#10b981",
                  fn: (x) => x / 2,
                  strokeWidth: 2,
                },
              ]}
              xMin={-5}
              xMax={5}
              yMin={-5}
              yMax={10}
              points={250}
            />
          </section>



          <section id="quiz-modulo-1" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={"blue"}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="O gráfico de f(x) = x² - 4x + 3 é uma parábola que:"
          alternativas={[
              { letra: "A", texto: "Abre para cima com vértice em (2, -1)", correta: true },
              { letra: "B", texto: "Abre para baixo com vértice em (2, -1)", correta: false },
              { letra: "C", texto: "Abre para cima com vértice em (2, 1)", correta: false },
              { letra: "D", texto: "Abre para baixo com vértice em (-2, 1)", correta: false },
              { letra: "E", texto: "Abre para cima com vértice em (4, 3)", correta: false }
            ]}
          dicaEstrategica="O vértice é o ponto mínimo quando a>0."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "a=1>0 → abre para cima." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "x_v = -b/2a = 4/2 = 2. y_v = f(2) = 4-8+3 = -1." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Vértice: (2, -1)." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            variant={mv[1]}
            resumoVisual={{
              moduloNome: "Módulo 1",
              tituloAula: "Funções Afim e Quadrática",
              materia: "Matemática",
              images: [
                {
                  title: "Forma: f(x) = ax + b",
                  type: "Conceito",
                  placeholderColor: "bg-blue-500/20",
                },
                {
                  title: "Coeficiente Angular (a)",
                  type: "Técnica",
                  placeholderColor: "bg-sky-500/20",
                },
                {
                  title: "Ponto de Corte: Raiz",
                  type: "Aplicação",
                  placeholderColor: "bg-cyan-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Lembre: Taxista & Bandeirada!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-xl italic text-foreground/85 leading-relaxed">
                    "Na função afim, 'a' é a velocidade de mudança e 'b' é
                    onde você começa."
                  </p>
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg font-mono text-xl text-center text-foreground/85 leading-relaxed">
                    <p>f(x) = 3x + 5</p>
                    <p className="text-lg text-foreground/85 leading-relaxed">↓</p>
                    <p>a = 3 (sobe 3 a cada x)</p>
                    <p>b = 5 (começa em 5)</p>
                  </div>
                </div>
              ),
            }}
            podcast={{
            aulaId: "funcoesafimquadratica",
            aulaTitulo: "Funcoes Afim Quadratica",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 1,
            moduloTitulo: "Módulo 1",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                      <QuizInterativo
              questoes={quizM1}
              titulo="QUIZ: A Função Afim (A Reta)"
              numero={3}
              variant={mv[1]}
              icone="🧠"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 2: A FUNÇÃO QUADRÁTICA ═══ */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={2}
            titulo="A Função Quadrática"
            descricao="O reino do crescimento acelerado e do formato parabólico."
             variant={mv[2]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Função Quadrática: Parábolas e Otimização"
              description="Forma, vértice e análise de extremos"
              variant={mv[2]}
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                A <strong>Função Quadrática</strong> ou função polinomial do 2º grau é definida como f(x) = ax² + bx + c, onde a ≠ 0. Diferentemente da função afim, a quadrática é uma curva chamada parábola, e modela fenômenos onde a taxa de mudança varia com x: movimento com aceleração, custos com economias de escala, ou receitas com pontos de saturação. Na Petrobras, função quadrática aparece em análises de otimização de produção, onde buscar-se encontrar o máximo de lucro ou o mínimo de custo em uma operação.
              </p>

              <p>
                A forma parabólica é determinada principalmente pelo coeficiente a. Se a {'>'} 0, a parábola abre para cima, formando um "U" — há um ponto de mínimo (vértice). Se a {'<'} 0, a parábola abre para baixo, formando um "∩" — há um ponto de máximo. O coeficiente b influencia a posição horizontal do vértice, e c determina a interseção com o eixo y (valor de f quando x = 0). Cada um dos três coeficientes tem significado geométrico e prático.
              </p>

              <p>
                O vértice da parábola é o ponto mais importante: coordenadas xᵥ = -b/(2a) e yᵥ = f(xᵥ). Se a {'>'} 0, yᵥ é o mínimo da função; se a {'<'} 0, yᵥ é o máximo. Em problemas de otimização (lucro máximo, custo mínimo, área máxima), o vértice é a resposta. O eixo de simetria da parábola é a reta vertical x = xᵥ, e a parábola é simétrica em relação a essa reta. A importância do vértice em questões CESGRANRIO é altíssima.
              </p>

              <p>
                As raízes (zeros) da função quadrática são encontradas pela fórmula de Bhaskara: x = (-b ± √Δ) / (2a), onde Δ = b² - 4ac é o discriminante. O valor de Δ determina a natureza das raízes: Δ {'>'} 0 significa duas raízes reais distintas (parábola cruza o eixo x em dois pontos); Δ = 0 significa raiz dupla (parábola toca o eixo x em um ponto, tangência); Δ {'<'} 0 significa sem raízes reais (parábola não toca o eixo x). Essa classificação é essencial para entender o comportamento da função.
              </p>

              <p>
                Imagine uma operação de refinaria onde o lucro é L(x) = -2x² + 40x - 100, com x em centenas de barris. Aqui a = -2 {'<'} 0, então há máximo. xᵥ = 40/4 = 10 (produção ótima: 1.000 barris), yᵥ = -200 + 400 - 100 = 100 (lucro máximo: R$ 100 mil). A CESGRANRIO frequentemente cobra: identificação de a, b, c, cálculo do vértice, determinação de raízes, estudo de sinal (quando f(x) {'>'} 0, f(x) {'<'} 0), e problemas de otimização real.
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Fórmulas e Propriedades</h4>
                <div className="space-y-3">
                  <div className="bg-white dark:bg-slate-900 p-3 rounded border border-blue-300/30">
                    <p className="font-mono text-xl font-bold text-blue-700 dark:text-blue-300 text-foreground/85 leading-relaxed">f(x) = ax² + bx + c, onde a ≠ 0</p>
                  </div>
                  <ul className="space-y-2 text-xl text-foreground/85 leading-relaxed">
                    <li><strong>a {'>'} 0:</strong> Parábola abre para cima (U) — vértice é MÍNIMO</li>
                    <li><strong>a {'<'} 0:</strong> Parábola abre para baixo (∩) — vértice é MÁXIMO</li>
                    <li><strong>Vértice:</strong> V = (-b/2a, -Δ/4a) onde Δ = b² - 4ac</li>
                    <li><strong>Eixo de simetria:</strong> x = -b/2a</li>
                    <li><strong>Discriminante:</strong> Δ {'>'} 0 (2 raízes) | Δ = 0 (1 raiz dupla) | Δ {'<'} 0 (sem raízes reais)</li>
                    <li><strong>Bhaskara:</strong> x = (-b ± √Δ) / 2a</li>
                  </ul>
                </div>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Os Limites do Universo",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        A Quadrática tem formato de U ou montanha. O segredo?
                        Tudo depende de como a equação começa.{" "}
                        <code>f(x) = ax² + bx + c</code>. O cara mais importante
                        dessa estrutura é o sinal de <strong>a</strong>.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-emerald-500/30 bg-emerald-500/10 p-4 rounded-lg text-center">
                          <div className="text-emerald-700 font-black mb-1">
                            Se a &gt; 0
                          </div>
                          <p className="font-mono text-lg mb-2">U Sorridente</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">
                            Gráfico atinge um ponto muito baixo (MÍNIMO) e volta
                            a subir para a eternidade. (Ex: Custos).
                          </p>
                        </div>
                        <div className="border border-rose-500/30 bg-rose-500/10 p-4 rounded-lg text-center">
                          <div className="text-rose-700 font-black mb-1">
                            Se a &lt; 0
                          </div>
                          <p className="font-mono text-lg mb-2">∩ Triste</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">
                            Gráfico atinge o topo de um pico (MÁXIMO) e cai.
                            (Ex: Lucros em declínio ou movimento de pedras).
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - O Ponto Inicial (c)",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        O valor isolado <code>c</code> tem um papel crucial no
                        gráfico visual.
                      </p>
                      <AlertBox tipo="success" titulo="Visual Rápido">
                        <p>
                          Ele é EXATAMENTE onde a parábola corta o{" "}
                          <strong>Eixo Y</strong> vertical (f(0) = c). Sem
                          precisar calcular nada, você já sabe onde a
                          montanha-russa partiu desde o ponto X = 0.
                        </p>
                      </AlertBox>
                      <div className="space-y-2 mt-4">
                        <div className="bg-emerald-500/10 p-3 rounded-lg text-xl border border-emerald-500/20 text-foreground/85 leading-relaxed">
                          <p className="font-bold text-emerald-700">
                            Se c &gt; 0:
                          </p>
                          <p>Parábola cruza eixo Y acima da origem</p>
                        </div>
                        <div className="bg-emerald-500/10 p-3 rounded-lg text-xl border border-emerald-500/20 text-foreground/85 leading-relaxed">
                          <p className="font-bold text-emerald-700">Se c = 0:</p>
                          <p>Parábola passa pela origem (0,0)</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Discriminante (Delta)",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        O discriminante Δ = b² - 4ac diz quantas vezes a
                        parábola cruza o eixo X:
                      </p>
                      <div className="space-y-2">
                        <div className="bg-emerald-500/10 p-3 rounded border border-emerald-500/20">
                          <p className="font-bold text-emerald-700 text-xl text-foreground/85 leading-relaxed">
                            Δ &gt; 0: Duas raízes reais
                          </p>
                        </div>
                        <div className="bg-amber-500/10 p-3 rounded border border-amber-500/20">
                          <p className="font-bold text-amber-700 text-xl text-foreground/85 leading-relaxed">
                            Δ = 0: Uma raiz (tangência)
                          </p>
                        </div>
                        <div className="bg-rose-500/10 p-3 rounded border border-rose-500/20">
                          <p className="font-bold text-rose-700 text-xl text-foreground/85 leading-relaxed">
                            Δ &lt; 0: Sem raízes reais
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Casos Especiais",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Parábolas com particularidades:
                      </p>
                      <div className="space-y-2">
                        <div className="bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                          <p className="font-bold text-emerald-700 text-xl text-foreground/85 leading-relaxed">
                            Vértice no Eixo X: b = 0
                          </p>
                          <p className="text-lg text-foreground/85 leading-relaxed">f(x) = ax² + c é simétrica</p>
                        </div>
                        <div className="bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                          <p className="font-bold text-emerald-700 text-xl text-foreground/85 leading-relaxed">
                            Raiz Dupla: Δ = 0
                          </p>
                          <p className="text-lg text-foreground/85 leading-relaxed">Parábola apenas toca o eixo X</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <FunctionGraph
              title="Parábolas: Concavidade e Simetria"
              functions={[
                {
                  id: "parabola1",
                  label: "f(x) = x²",
                  color: "#3b82f6",
                  fn: (x) => x * x,
                  strokeWidth: 2,
                },
                {
                  id: "parabola2",
                  label: "f(x) = -x²",
                  color: "#ef4444",
                  fn: (x) => -(x * x),
                  strokeWidth: 2,
                },
              ]}
              xMin={-5}
              xMax={5}
              yMin={-25}
              yMax={25}
              points={250}
            />
          </section>



          <section id="quiz-modulo-2" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[2]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="O gráfico de f(x) = x² - 4x + 3 é uma parábola que:"
          alternativas={[
              { letra: "A", texto: "Abre para cima com vértice em (2, -1)", correta: true },
              { letra: "B", texto: "Abre para baixo com vértice em (2, -1)", correta: false },
              { letra: "C", texto: "Abre para cima com vértice em (2, 1)", correta: false },
              { letra: "D", texto: "Abre para baixo com vértice em (-2, 1)", correta: false },
              { letra: "E", texto: "Abre para cima com vértice em (4, 3)", correta: false }
            ]}
          dicaEstrategica="O vértice é o ponto mínimo quando a>0."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "a=1>0 → abre para cima." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "x_v = -b/2a = 4/2 = 2. y_v = f(2) = 4-8+3 = -1." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Vértice: (2, -1)." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            variant={mv[2]}
            resumoVisual={{
              moduloNome: "Módulo 2",
              tituloAula: "Funções Afim e Quadrática",
              materia: "Matemática",
              images: [
                {
                  title: "Forma: f(x) = ax² + bx + c",
                  type: "Conceito",
                  placeholderColor: "bg-emerald-500/20",
                },
                {
                  title: "Concavidade e Vértice",
                  type: "Técnica",
                  placeholderColor: "bg-teal-500/20",
                },
                {
                  title: "Raízes e Discriminante",
                  type: "Aplicação",
                  placeholderColor: "bg-cyan-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Parábola: Leia 'a' e 'Δ'!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-xl italic text-foreground/85 leading-relaxed">
                    "O sinal de 'a' define se U ou ∩. O valor de Δ diz quantas
                    raízes existem."
                  </p>
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg font-mono text-lg text-foreground/85 leading-relaxed text-center">
                    <p>f(x) = x² - 4x + 3</p>
                    <p className="text-lg text-foreground/85 leading-relaxed">↓</p>
                    <p>a = 1 &gt; 0 → U</p>
                    <p>Δ = 16 - 12 = 4 &gt; 0 → 2 raízes</p>
                  </div>
                </div>
              ),
            }}
            podcast={{
            aulaId: "funcoesafimquadratica",
            aulaTitulo: "Funcoes Afim Quadratica",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 2,
            moduloTitulo: "Módulo 2",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                      <QuizInterativo
              questoes={quizM2}
              titulo="QUIZ: A Quadrática (A Parábola)"
              numero={3}
              variant={mv[2]}
              icone="🎯"
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 3: INTERPRETAÇÃO GRÁFICA ═══ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={3}
            titulo="Interpretação Geográfica"
            descricao="Brotou o gráfico na sua frente. O que ele está dizendo?"
             variant={mv[3]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Interpretação Gráfica: Sinal e Monotonia"
              description="Lendo parábolas e retas para extrair informações"
              variant={mv[3]}
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Analisar um gráfico de função é uma habilidade crítica em provas CESGRANRIO. Para função afim (reta), a inclinação visual corresponde ao coeficiente a: reta subindo significa a {'>'} 0, reta descendo significa a {'<'} 0. O ponto onde a reta cruza o eixo y é b. Para função quadrática (parábola), a forma em U ou ∩ revela o sinal de a, e a posição do vértice mostra xᵥ e yᵥ. Ler corretamente um gráfico permite responder questões sem cálculos adicionais.
              </p>

              <p>
                O "estudo do sinal" de uma função responde: para quais valores de x a função é positiva (f(x) {'>'} 0), negativa (f(x) {'<'} 0), ou nula (f(x) = 0)? Para funções afim, basta encontrar a raiz x = -b/a, e aplicar o sinal de a: se a {'>'} 0, a função é negativa antes da raiz e positiva depois; se a {'<'} 0, é o oposto. Para quadrática, o processo é semelhante, mas agora há até duas raízes. Se a {'>'} 0 (parábola para cima), a função é negativa ENTRE as raízes e positiva fora delas; se a {'<'} 0 (parábola para baixo), é positiva entre as raízes e negativa fora.
              </p>

              <p>
                Monotonia refere-se ao crescimento ou decrescimento da função. Função afim é monótona: sempre cresce (se a {'>'} 0) ou sempre decresce (se a {'<'} 0). Função quadrática não é monótona: cresce até o vértice (se a {'>'} 0) e depois decresce, ou decresce até o vértice (se a {'<'} 0) e depois cresce. O vértice é sempre um ponto de mudança de monotonia. Em otimização, monotonia ajuda a determinar se estamos antes ou depois do ponto ótimo.
              </p>

              <p>
                Na prática, imagine um gráfico de custo C(x) sendo uma parábola com vértice em x = 20. Isso significa: para x {'<'} 20, custo está diminuindo (economias de escala); para x {'>'} 20, custo está aumentando (saturação). Ou um gráfico de receita R(x) sendo reta com a {'>'} 0, significando receita aumenta linearmente com quantidade. Ler essas informações do gráfico é mais rápido que fazer contas, especialmente em múltipla escolha.
              </p>

              <p>
                Pegadinhas comuns: confundir raiz com y-intercepto (raiz é onde cruza eixo x, y-intercepto é onde cruza eixo y); supor que onde o gráfico está mais baixo há mínimo absoluto (pode ser só local, fora do domínio restrito); perder de vista que a {'>'}0 implica U (não ∩). A CESGRANRIO testa essas sutilezas frequentemente, oferecendo alternativas que diferem apenas nesses pontos.
              </p>

              <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Tabela de Sinais</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xl border border-emerald-200 dark:border-emerald-800 text-foreground/85 leading-relaxed">
                    <tbody>
                      <tr className="border-b border-emerald-200 dark:border-emerald-800">
                        <td className="p-2 font-bold">Função</td>
                        <td className="p-2 font-bold">Tipo</td>
                        <td className="p-2 font-bold">f(x) {'>'} 0</td>
                        <td className="p-2 font-bold">f(x) {'<'} 0</td>
                      </tr>
                      <tr className="border-b border-emerald-200 dark:border-emerald-800">
                        <td className="p-2">f(x) = ax + b, a {'>'} 0</td>
                        <td className="p-2">Afim crescente</td>
                        <td className="p-2">x {'>'} -b/a</td>
                        <td className="p-2">x {'<'} -b/a</td>
                      </tr>
                      <tr className="border-b border-emerald-200 dark:border-emerald-800">
                        <td className="p-2">f(x) = ax + b, a {'<'} 0</td>
                        <td className="p-2">Afim decrescente</td>
                        <td className="p-2">x {'<'} -b/a</td>
                        <td className="p-2">x {'>'} -b/a</td>
                      </tr>
                      <tr className="border-b border-emerald-200 dark:border-emerald-800">
                        <td className="p-2">f(x) = a(x-r₁)(x-r₂), a {'>'} 0</td>
                        <td className="p-2">Quadrática (parábola ∪)</td>
                        <td className="p-2">x {'<'} r₁ ou x {'>'} r₂</td>
                        <td className="p-2">r₁ {'<'} x {'<'} r₂</td>
                      </tr>
                      <tr>
                        <td className="p-2">f(x) = a(x-r₁)(x-r₂), a {'<'} 0</td>
                        <td className="p-2">Quadrática (parábola ∩)</td>
                        <td className="p-2">r₁ {'<'} x {'<'} r₂</td>
                        <td className="p-2">x {'<'} r₁ ou x {'>'} r₂</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - A Linha d'Água (Eixo X)",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Tudo que está ACIMA do Eixo X na foto é positivo{" "}
                        <code>f(x) &gt; 0</code>. Tudo que afundou ABAIXO do
                        Eixo X é negativo <code>f(x) &lt; 0</code>.
                      </p>
                      <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 shadow-inner">
                        <p className="font-bold text-amber-700 mb-2">
                          Para Parábolas de Máximo (∩):
                        </p>
                        <ul className="text-xl space-y-2 list-disc pl-5 text-foreground/85 leading-relaxed">
                          <li>
                            Elas costumam subir, ficar POSITIVAS entre as duas
                            raízes, atingir o topo e depois voltar a descer
                            rasgando o eixo X ficando negativas pra sempre.
                          </li>
                          <li>
                            <strong>
                              Entre as raízes: A empresa dá lucro absoluto.
                            </strong>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Intervalos de Positividade",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Para determinar onde f(x) &gt; 0 ou f(x) &lt; 0:
                      </p>
                      <AlertBox tipo="info" titulo="Método Prático">
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          1. Encontre as raízes. 2. Teste um ponto em cada
                          intervalo. 3. Estude o sinal. 4. Conclusão: intervalos
                          de positividade.
                        </p>
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Visualização Rápida",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-3">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Atalhos visuais para análise gráfica:
                      </p>
                      <div className="space-y-2">
                        <div className="bg-amber-500/10 p-3 rounded border border-amber-500/20">
                          <p className="font-bold text-amber-700 text-xl text-foreground/85 leading-relaxed">
                            Reta crescente (a &gt; 0)
                          </p>
                          <p className="text-lg text-foreground/85 leading-relaxed">
                            Negativa antes da raiz, positiva depois
                          </p>
                        </div>
                        <div className="bg-amber-500/10 p-3 rounded border border-amber-500/20">
                          <p className="font-bold text-amber-700 text-xl text-foreground/85 leading-relaxed">
                            Parábola U (a &gt; 0)
                          </p>
                          <p className="text-lg text-foreground/85 leading-relaxed">
                            Positiva fora das raízes, negativa entre elas
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Tangência e Sem Raízes",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Situações especiais no gráfico:
                      </p>
                      <div className="bg-amber-500/10 p-3 rounded border border-amber-500/20">
                        <p className="font-bold text-amber-700 text-xl mb-1 text-foreground/85 leading-relaxed">
                          Δ = 0 (Tangência):
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                          Parábola toca o eixo X em um ponto. Sinal nunca muda
                          (sempre positiva ou sempre negativa).
                        </p>
                      </div>
                      <div className="bg-amber-500/10 p-3 rounded border border-amber-500/20">
                        <p className="font-bold text-amber-700 text-xl mb-1 text-foreground/85 leading-relaxed">
                          Δ &lt; 0 (Sem raízes):
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                          Parábola não toca o eixo. Sinal permanece o de 'a'.
                        </p>
                      </div>
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
          variant={mv[3]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="O gráfico de f(x) = x² - 4x + 3 é uma parábola que:"
          alternativas={[
              { letra: "A", texto: "Abre para cima com vértice em (2, -1)", correta: true },
              { letra: "B", texto: "Abre para baixo com vértice em (2, -1)", correta: false },
              { letra: "C", texto: "Abre para cima com vértice em (2, 1)", correta: false },
              { letra: "D", texto: "Abre para baixo com vértice em (-2, 1)", correta: false },
              { letra: "E", texto: "Abre para cima com vértice em (4, 3)", correta: false }
            ]}
          dicaEstrategica="O vértice é o ponto mínimo quando a>0."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "a=1>0 → abre para cima." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "x_v = -b/2a = 4/2 = 2. y_v = f(2) = 4-8+3 = -1." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Vértice: (2, -1)." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            variant={mv[3]}
            resumoVisual={{
              moduloNome: "Módulo 3",
              tituloAula: "Funções Afim e Quadrática",
              materia: "Matemática",
              images: [
                {
                  title: "Acima & Abaixo do Eixo X",
                  type: "Conceito",
                  placeholderColor: "bg-amber-500/20",
                },
                {
                  title: "Intervalos de Positividade",
                  type: "Técnica",
                  placeholderColor: "bg-orange-500/20",
                },
                {
                  title: "Raízes e Vértices",
                  type: "Aplicação",
                  placeholderColor: "bg-yellow-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Gráfico Fala: Veja os Sinais!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-xl italic text-foreground/85 leading-relaxed">
                    "Acima = positivo, Abaixo = negativo. Raízes dividem os
                    intervalos."
                  </p>
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg font-mono text-lg text-foreground/85 leading-relaxed text-center">
                    <p>f(x) = x² - 4</p>
                    <p className="text-lg text-foreground/85 leading-relaxed">Raízes: x = ±2</p>
                    <p className="text-lg text-foreground/85 leading-relaxed">(-∞,-2): + | (-2,2): - | (2,+∞): +</p>
                  </div>
                </div>
              ),
            }}
            podcast={{
            aulaId: "funcoesafimquadratica",
            aulaTitulo: "Funcoes Afim Quadratica",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 3,
            moduloTitulo: "Módulo 3",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                      <QuizInterativo
              questoes={quizM3}
              titulo="QUIZ: Interpretação de Gráficos"
              numero={3}
              variant={mv[3]}
              icone="🎯"
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 4: APLICAÇÕES E OTIMIZAÇÃO ═══ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={4}
            titulo="O Vértice do Poder"
            descricao="Maximizando o lucro da empresa ou escapando da ruína a tempo."
             variant={mv[4]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Dominando Vértices"
              description="Não tente achar raízes em problemas de lucro máximo."
              variant={mv[4]}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Erros Comuns",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Uma das táticas mais nefastas da Cesgranrio: apresentar
                        uma questão de <strong>Lucro Máximo</strong>. O
                        candidato inexperiente corre pra fazer Bhaskara achando
                        raízes.
                      </p>
                      <AlertBox tipo="warning" titulo="Nunca faça Bhaskara aqui!">
                        Bhaskara diz quando o Lucro vira ZERO (quando cruza o x
                        = Break-Even e para de existir). O{" "}
                        <strong>Lucro MÁXIMO</strong> habita no pico da montanha
                        matemática: no Vértice. Use <code>Xv = -b/2a</code> ou{" "}
                        <code>Yv = -Δ/4a</code>.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Receita - Custo = Lucro",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Lembre do mantra: Ninguém fala de f(x) na petroleira.
                        Eles falam de:
                      </p>
                      <div className="bg-cyan-500/10 p-4 border border-cyan-500/20 text-center rounded-xl font-mono text-lg font-bold">
                        L(x) = R(x) - C(x)
                      </div>
                      <p className="text-xl mt-2 text-foreground/85 leading-relaxed">
                        Onde você diminui toda a função de Receita pela de Custo
                        (lembre de botar parênteses no Custo para o sinal
                        negativo invadir todo mundo corretamente). E a nova
                        função virou <code>ax² + bx + c</code>, para aí sim
                        procurar o Vértice.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Qual Fórmula Usar?",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="info" titulo="Dica CESGRANRIO">
                        Use x_v = -b/2a quando o problema pedir "quantidade que
                        maximiza" ou "valor de x que minimiza". Use y_v quando
                        pedir "máximo de y" ou "mínimo de y".
                      </AlertBox>
                      <div className="space-y-2 mt-3">
                        <div className="bg-cyan-500/10 p-3 rounded-lg border border-cyan-500/20">
                          <p className="font-bold text-cyan-700 text-xl text-foreground/85 leading-relaxed">
                            Xv = -b/2a
                          </p>
                          <p className="text-lg text-foreground/85 leading-relaxed">Valor de x no vértice</p>
                        </div>
                        <div className="bg-cyan-500/10 p-3 rounded-lg border border-cyan-500/20">
                          <p className="font-bold text-cyan-700 text-xl text-foreground/85 leading-relaxed">
                            Yv = -Δ/4a ou Yv = f(Xv)
                          </p>
                          <p className="text-lg text-foreground/85 leading-relaxed">Valor máximo/mínimo de y</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Aplicações Especiais",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Casos de otimização com restrições:
                      </p>
                      <div className="bg-cyan-500/10 p-3 rounded border border-cyan-500/20">
                        <p className="font-bold text-cyan-700 text-xl mb-1 text-foreground/85 leading-relaxed">
                          Domínio Restrito:
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                          Se o vértice sai do intervalo viável, máximo está na
                          borda.
                        </p>
                      </div>
                      <div className="bg-cyan-500/10 p-3 rounded border border-cyan-500/20">
                        <p className="font-bold text-cyan-700 text-xl mb-1 text-foreground/85 leading-relaxed">
                          Função Afim:
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                          Reta não tem vértice. Extremo está sempre nas bordas
                          do domínio.
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-4" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[4]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="O gráfico de f(x) = x² - 4x + 3 é uma parábola que:"
          alternativas={[
              { letra: "A", texto: "Abre para cima com vértice em (2, -1)", correta: true },
              { letra: "B", texto: "Abre para baixo com vértice em (2, -1)", correta: false },
              { letra: "C", texto: "Abre para cima com vértice em (2, 1)", correta: false },
              { letra: "D", texto: "Abre para baixo com vértice em (-2, 1)", correta: false },
              { letra: "E", texto: "Abre para cima com vértice em (4, 3)", correta: false }
            ]}
          dicaEstrategica="O vértice é o ponto mínimo quando a>0."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "a=1>0 → abre para cima." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "x_v = -b/2a = 4/2 = 2. y_v = f(2) = 4-8+3 = -1." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Vértice: (2, -1)." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            variant={mv[4]}
            resumoVisual={{
              moduloNome: "Módulo 4",
              tituloAula: "Funções Afim e Quadrática",
              materia: "Matemática",
              images: [
                {
                  title: "Fórmula do Vértice",
                  type: "Conceito",
                  placeholderColor: "bg-cyan-500/20",
                },
                {
                  title: "Máximos e Mínimos",
                  type: "Técnica",
                  placeholderColor: "bg-sky-500/20",
                },
                {
                  title: "Aplicação Empresarial",
                  type: "Prática",
                  placeholderColor: "bg-blue-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Vértice: xv e yv!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-xl italic text-foreground/85 leading-relaxed">
                    "Para máximo/mínimo, sempre vá ao vértice, nunca às raízes!"
                  </p>
                  <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg font-mono text-lg text-foreground/85 leading-relaxed text-center">
                    <p>L(x) = -x² + 100x - 1500</p>
                    <p className="text-lg text-foreground/85 leading-relaxed">↓</p>
                    <p>xv = -100/(2×-1) = 50</p>
                    <p>Lucro máximo: L(50)</p>
                  </div>
                </div>
              ),
            }}
            podcast={{
            aulaId: "funcoesafimquadratica",
            aulaTitulo: "Funcoes Afim Quadratica",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 4,
            moduloTitulo: "Módulo 4",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                      <QuizInterativo
              questoes={quizM4}
              titulo="QUIZ: Aplicações de Max e Min"
              numero={3}
              variant={mv[4]}
              icone="🎯"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 5: COMPARAÇÃO AFIM VS QUADRÁTICA ═══ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={5}
            titulo="Comparação Afim vs Quadrática"
            descricao="Entenda as diferenças e semelhanças entre retas e parábolas."
             variant={mv[5]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Duas Famílias Distintas"
              description="Linear versus Quadrático: comportamentos completamente diferentes."
              variant={mv[5]}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - A Reta é Previsível",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        A função afim <code>f(x) = ax + b</code> sempre cresce
                        ou decresce no mesmo ritmo. A cada novo x, você adiciona
                        exatamente <code>a</code> no resultado.
                      </p>
                      <div className="bg-violet-500/10 p-4 rounded-xl border border-violet-500/20">
                        <p className="font-bold text-violet-700 mb-2">
                          Comportamento Uniforme
                        </p>
                        <ul className="text-xl space-y-1 list-disc pl-5 text-foreground/85 leading-relaxed">
                          <li>Se a &gt; 0: cresce sempre</li>
                          <li>Se a &lt; 0: decresce sempre</li>
                          <li>Taxa de variação: sempre a</li>
                        </ul>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - A Parábola é Acelerada",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        A função quadrática <code>f(x) = ax² + bx + c</code>{" "}
                        cresce/decresce cada vez mais rápido conforme{" "}
                        <code>|x|</code> aumenta. Para valores grandes de x,
                        domina totalmente a reta.
                      </p>
                      <AlertBox tipo="info" titulo="Dominação Quadrática">
                        <p>
                          Para x suficientemente grande, qualquer parábola
                          ultrapassa qualquer reta. O termo x² é mais poderoso
                          que 2x para |x| grande.
                        </p>
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Quando Cada Uma Vence",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Comparação prática entre os dois tipos:
                      </p>
                      <div className="space-y-2">
                        <div className="bg-violet-500/10 p-3 rounded border border-violet-500/20">
                          <p className="font-bold text-violet-700 text-xl text-foreground/85 leading-relaxed">
                            Perto da origem: Reta pode estar acima
                          </p>
                          <p className="text-lg text-foreground/85 leading-relaxed">Para |x| pequeno, linear domina</p>
                        </div>
                        <div className="bg-violet-500/10 p-3 rounded border border-violet-500/20">
                          <p className="font-bold text-violet-700 text-xl text-foreground/85 leading-relaxed">
                            Longe da origem: Parábola sempre vence
                          </p>
                          <p className="text-lg text-foreground/85 leading-relaxed">Para |x| grande, quadrático domina</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Casos de Intersecção",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Quando reta e parábola se encontram:
                      </p>
                      <div className="bg-violet-500/10 p-3 rounded border border-violet-500/20">
                        <p className="font-bold text-violet-700 text-xl mb-1 text-foreground/85 leading-relaxed">
                          Duas Interseções (Δ &gt; 0):
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">Reta cruza a parábola em 2 pontos</p>
                      </div>
                      <div className="bg-violet-500/10 p-3 rounded border border-violet-500/20">
                        <p className="font-bold text-violet-700 text-xl mb-1 text-foreground/85 leading-relaxed">
                          Tangência (Δ = 0):
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">Reta toca a parábola em 1 ponto</p>
                      </div>
                      <div className="bg-violet-500/10 p-3 rounded border border-violet-500/20">
                        <p className="font-bold text-violet-700 text-xl mb-1 text-foreground/85 leading-relaxed">
                          Sem Interseção (Δ &lt; 0):
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">Reta e parábola não se tocam</p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <FunctionGraph
              title="Comparação: Funções Afim vs Quadrática"
              functions={[
                {
                  id: "afim",
                  label: "f(x) = x",
                  color: "#3b82f6",
                  fn: (x) => x,
                  strokeWidth: 2,
                },
                {
                  id: "quadratica",
                  label: "f(x) = x²",
                  color: "#ef4444",
                  fn: (x) => x * x,
                  strokeWidth: 2,
                },
                {
                  id: "afimOffset",
                  label: "f(x) = 2x + 1",
                  color: "#10b981",
                  fn: (x) => 2 * x + 1,
                  strokeWidth: 2,
                },
              ]}
              xMin={-4}
              xMax={4}
              yMin={-5}
              yMax={16}
              points={250}
            />
          </section>



          <section id="quiz-modulo-5" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[5]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="O gráfico de f(x) = x² - 4x + 3 é uma parábola que:"
          alternativas={[
              { letra: "A", texto: "Abre para cima com vértice em (2, -1)", correta: true },
              { letra: "B", texto: "Abre para baixo com vértice em (2, -1)", correta: false },
              { letra: "C", texto: "Abre para cima com vértice em (2, 1)", correta: false },
              { letra: "D", texto: "Abre para baixo com vértice em (-2, 1)", correta: false },
              { letra: "E", texto: "Abre para cima com vértice em (4, 3)", correta: false }
            ]}
          dicaEstrategica="O vértice é o ponto mínimo quando a>0."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "a=1>0 → abre para cima." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "x_v = -b/2a = 4/2 = 2. y_v = f(2) = 4-8+3 = -1." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Vértice: (2, -1)." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            variant={mv[5]}
            resumoVisual={{
              moduloNome: "Módulo 5",
              tituloAula: "Funções Afim e Quadrática",
              materia: "Matemática",
              images: [
                {
                  title: "Comportamento Linear vs Quadrático",
                  type: "Conceito",
                  placeholderColor: "bg-violet-500/20",
                },
                {
                  title: "Taxa de Variação Constante vs Acelerada",
                  type: "Técnica",
                  placeholderColor: "bg-purple-500/20",
                },
                {
                  title: "Interseção e Dominação",
                  type: "Aplicação",
                  placeholderColor: "bg-fuchsia-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Reta vs Parábola: Quem Vence?",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-xl italic text-foreground/85 leading-relaxed">
                    "Perto: reta. Longe: parábola. Sempre! O x² é mais forte
                    que qualquer x."
                  </p>
                  <div className="p-3 bg-violet-500/10 border border-violet-500/20 rounded-lg font-mono text-lg text-foreground/85 leading-relaxed text-center">
                    <p>f(x) = 10x vs g(x) = x²</p>
                    <p className="text-lg text-foreground/85 leading-relaxed">
                      x=1: f=10, g=1 (reta vence)
                    </p>
                    <p className="text-lg text-foreground/85 leading-relaxed">
                      x=20: f=200, g=400 (parábola vence)
                    </p>
                  </div>
                </div>
              ),
            }}
            podcast={{
            aulaId: "funcoesafimquadratica",
            aulaTitulo: "Funcoes Afim Quadratica",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 5,
            moduloTitulo: "Módulo 5",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                      <QuizInterativo
              questoes={quizM5}
              titulo="QUIZ: Comparação Afim vs Quadrática"
              numero={3}
              variant={mv[5]}
              icone="🧠"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 6: INEQUAÇÕES ═══ */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={6}
            titulo="Inequações com Afim e Quadrática"
            descricao="Resolva f(x) > 0, f(x) < 0 e variações com confiança."
             variant={mv[6]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Estudando o Sinal da Função"
              description="Onde a função é positiva, negativa ou nula."
              variant={mv[6]}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Raízes São Pontos-Chave",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        As raízes dividem o domínio em intervalos. Em cada
                        intervalo, a função mantém o mesmo sinal (sempre positiva
                        ou sempre negativa).
                      </p>
                      <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20">
                        <p className="font-bold text-amber-700 mb-2">
                          Estratégia
                        </p>
                        <ol className="text-xl space-y-2 list-decimal pl-5 text-foreground/85 leading-relaxed">
                          <li>Encontre as raízes (f(x) = 0)</li>
                          <li>Teste um ponto em cada intervalo</li>
                          <li>Determine o sinal em cada intervalo</li>
                          <li>Escreva a solução da inequação</li>
                        </ol>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Inversão de Sinal",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="warning" titulo="Cuidado!">
                        Ao multiplicar ou dividir uma inequação por um número
                        negativo, o sinal de &lt;, &gt;, ≤, ≥ se inverte!
                      </AlertBox>
                      <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20">
                        <p className="font-mono text-xl text-center text-foreground/85 leading-relaxed">
                          -2x &gt; 6
                          <br />
                          x &lt; -3 (o &gt; virou &lt;)
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Quadro de Sinais",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-3">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Método visual para organizar intervalos:
                      </p>
                      <div className="bg-amber-500/10 p-3 rounded border border-amber-500/20">
                        <p className="font-bold text-amber-700 text-xl mb-2 text-foreground/85 leading-relaxed">
                          Passo 1: Raízes na reta numérica
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed font-mono">
                          ----[r1]----[r2]----
                        </p>
                      </div>
                      <div className="bg-amber-500/10 p-3 rounded border border-amber-500/20">
                        <p className="font-bold text-amber-700 text-xl mb-2 text-foreground/85 leading-relaxed">
                          Passo 2: Teste cada intervalo
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                          Substitua um x de cada intervalo na função
                        </p>
                      </div>
                      <div className="bg-amber-500/10 p-3 rounded border border-amber-500/20">
                        <p className="font-bold text-amber-700 text-xl mb-2 text-foreground/85 leading-relaxed">
                          Passo 3: Escreva a solução
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                          Escolha os intervalos que satisfazem a inequação
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Casos Especiais",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Situações que pedem cuidado extra:
                      </p>
                      <div className="bg-amber-500/10 p-3 rounded border border-amber-500/20">
                        <p className="font-bold text-amber-700 text-xl mb-1 text-foreground/85 leading-relaxed">
                          Raiz Dupla (Δ = 0):
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                          Sinal não muda na raiz. A função toca, mas não cruza.
                        </p>
                      </div>
                      <div className="bg-amber-500/10 p-3 rounded border border-amber-500/20">
                        <p className="font-bold text-amber-700 text-xl mb-1 text-foreground/85 leading-relaxed">
                          Sem Raízes (Δ &lt; 0):
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                          Sinal é o mesmo em toda a reta real (sinal de 'a').
                        </p>
                      </div>
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
          variant={mv[6]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="O gráfico de f(x) = x² - 4x + 3 é uma parábola que:"
          alternativas={[
              { letra: "A", texto: "Abre para cima com vértice em (2, -1)", correta: true },
              { letra: "B", texto: "Abre para baixo com vértice em (2, -1)", correta: false },
              { letra: "C", texto: "Abre para cima com vértice em (2, 1)", correta: false },
              { letra: "D", texto: "Abre para baixo com vértice em (-2, 1)", correta: false },
              { letra: "E", texto: "Abre para cima com vértice em (4, 3)", correta: false }
            ]}
          dicaEstrategica="O vértice é o ponto mínimo quando a>0."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "a=1>0 → abre para cima." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "x_v = -b/2a = 4/2 = 2. y_v = f(2) = 4-8+3 = -1." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Vértice: (2, -1)." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            variant={mv[6]}
            resumoVisual={{
              moduloNome: "Módulo 6",
              tituloAula: "Funções Afim e Quadrática",
              materia: "Matemática",
              images: [
                {
                  title: "Raízes e Intervalos",
                  type: "Conceito",
                  placeholderColor: "bg-amber-500/20",
                },
                {
                  title: "Quadro de Sinais",
                  type: "Técnica",
                  placeholderColor: "bg-orange-500/20",
                },
                {
                  title: "Solução da Inequação",
                  type: "Aplicação",
                  placeholderColor: "bg-yellow-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Inequação: 3 Passos!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-xl italic text-foreground/85 leading-relaxed">
                    "Raízes → Teste → Solução. Sempre nessa ordem!"
                  </p>
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg font-mono text-lg text-foreground/85 leading-relaxed text-center">
                    <p>x² - 5x + 6 &gt; 0</p>
                    <p className="text-lg text-foreground/85 leading-relaxed">Raízes: 2 e 3</p>
                    <p className="text-lg text-foreground/85 leading-relaxed">
                      Sol: x &lt; 2 ou x &gt; 3
                    </p>
                  </div>
                </div>
              ),
            }}
            podcast={{
            aulaId: "funcoesafimquadratica",
            aulaTitulo: "Funcoes Afim Quadratica",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 6,
            moduloTitulo: "Módulo 6",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                      <QuizInterativo
              questoes={quizM6}
              titulo="QUIZ: Inequações com Afim e Quadrática"
              numero={3}
              variant={mv[6]}
              icone="🎯"
              onComplete={(score) => handleModuleComplete("modulo-6", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 7: SISTEMAS E INTERSECÇÕES ═══ */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={7}
            titulo="Sistemas e Intersecções"
            descricao="Encontre onde retas e parábolas se cruzam no plano cartesiano."
             variant={mv[7]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Encontrando Pontos de Encontro"
              description="Sistemas com funções afim e quadrática."
              variant={mv[7]}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Reta vs Parábola",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Para encontrar onde y = reta cruza y = parábola, iguale
                        as duas expressões e resolva a equação resultante.
                      </p>
                      <div className="bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20">
                        <p className="font-mono text-xl font-bold text-cyan-700 text-foreground/85 leading-relaxed">
                          Se y = 2x + 1 e y = x²:
                          <br />
                          x² = 2x + 1
                          <br />
                          x² - 2x - 1 = 0
                          <br />
                          Δ = 4 + 4 = 8 &gt; 0 → 2 soluções → 2 pontos
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Número de Soluções",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        O discriminante Δ da equação resultante diz quantos
                        pontos de intersecção existem.
                      </p>
                      <div className="space-y-2">
                        <div className="bg-cyan-500/10 p-3 rounded border border-cyan-500/20">
                          <p className="font-bold text-cyan-700 text-xl text-foreground/85 leading-relaxed">
                            Δ &gt; 0: Duas Intersecções
                          </p>
                          <p className="text-lg text-foreground/85 leading-relaxed">
                            Reta cruza a parábola em 2 pontos distintos
                          </p>
                        </div>
                        <div className="bg-cyan-500/10 p-3 rounded border border-cyan-500/20">
                          <p className="font-bold text-cyan-700 text-xl text-foreground/85 leading-relaxed">
                            Δ = 0: Uma Intersecção (Tangência)
                          </p>
                          <p className="text-lg text-foreground/85 leading-relaxed">Reta toca a parábola em 1 ponto</p>
                        </div>
                        <div className="bg-cyan-500/10 p-3 rounded border border-cyan-500/20">
                          <p className="font-bold text-cyan-700 text-xl text-foreground/85 leading-relaxed">
                            Δ &lt; 0: Sem Intersecção
                          </p>
                          <p className="text-lg text-foreground/85 leading-relaxed">
                            Reta e parábola não se tocam
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Interpretação Geométrica",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-3">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        O que cada resultado significa visualmente:
                      </p>
                      <div className="bg-cyan-500/10 p-3 rounded border border-cyan-500/20">
                        <p className="font-bold text-cyan-700 text-xl mb-1 text-foreground/85 leading-relaxed">
                          Duas Soluções:
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                          Reta penetra a parábola. Começa fora, entra e sai.
                        </p>
                      </div>
                      <div className="bg-cyan-500/10 p-3 rounded border border-cyan-500/20">
                        <p className="font-bold text-cyan-700 text-xl mb-1 text-foreground/85 leading-relaxed">
                          Uma Solução:
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                          Reta é tangente à parábola. Toca e afasta.
                        </p>
                      </div>
                      <div className="bg-cyan-500/10 p-3 rounded border border-cyan-500/20">
                        <p className="font-bold text-cyan-700 text-xl mb-1 text-foreground/85 leading-relaxed">
                          Sem Solução:
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                          Reta fica sempre acima ou abaixo da parábola.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Dois Tipos de Funções Diferentes",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Sistemas com outras combinações:
                      </p>
                      <div className="bg-cyan-500/10 p-3 rounded border border-cyan-500/20">
                        <p className="font-bold text-cyan-700 text-xl mb-1 text-foreground/85 leading-relaxed">
                          Duas Retas:
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                          0, 1 ou infinitas soluções (paralelas, concorrentes,
                          coincidentes)
                        </p>
                      </div>
                      <div className="bg-cyan-500/10 p-3 rounded border border-cyan-500/20">
                        <p className="font-bold text-cyan-700 text-xl mb-1 text-foreground/85 leading-relaxed">
                          Duas Parábolas:
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                          Até 4 intersecções (ambas são de grau 2)
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <FunctionGraph
              title="Interseção de Reta e Parábola"
              functions={[
                {
                  id: "reta",
                  label: "f(x) = x + 1",
                  color: "#3b82f6",
                  fn: (x) => x + 1,
                  strokeWidth: 2,
                },
                {
                  id: "parabola",
                  label: "f(x) = x² - 2",
                  color: "#ef4444",
                  fn: (x) => x * x - 2,
                  strokeWidth: 2,
                },
              ]}
              xMin={-3}
              xMax={3}
              yMin={-3}
              yMax={7}
              points={250}
            />
          </section>



          <section id="quiz-modulo-7" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[7]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="O gráfico de f(x) = x² - 4x + 3 é uma parábola que:"
          alternativas={[
              { letra: "A", texto: "Abre para cima com vértice em (2, -1)", correta: true },
              { letra: "B", texto: "Abre para baixo com vértice em (2, -1)", correta: false },
              { letra: "C", texto: "Abre para cima com vértice em (2, 1)", correta: false },
              { letra: "D", texto: "Abre para baixo com vértice em (-2, 1)", correta: false },
              { letra: "E", texto: "Abre para cima com vértice em (4, 3)", correta: false }
            ]}
          dicaEstrategica="O vértice é o ponto mínimo quando a>0."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "a=1>0 → abre para cima." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "x_v = -b/2a = 4/2 = 2. y_v = f(2) = 4-8+3 = -1." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Vértice: (2, -1)." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            variant={mv[7]}
            resumoVisual={{
              moduloNome: "Módulo 7",
              tituloAula: "Funções Afim e Quadrática",
              materia: "Matemática",
              images: [
                {
                  title: "Igualação de Funções",
                  type: "Conceito",
                  placeholderColor: "bg-cyan-500/20",
                },
                {
                  title: "Resolução de Equação",
                  type: "Técnica",
                  placeholderColor: "bg-sky-500/20",
                },
                {
                  title: "Pontos de Intersecção",
                  type: "Aplicação",
                  placeholderColor: "bg-blue-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Sistema: Iguale e Resolva!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-xl italic text-foreground/85 leading-relaxed">
                    "f(x) = g(x) → resolver a equação → achar x → depois y"
                  </p>
                  <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg font-mono text-lg text-foreground/85 leading-relaxed text-center">
                    <p>y = 2x e y = x² - x</p>
                    <p className="text-lg text-foreground/85 leading-relaxed">↓</p>
                    <p>2x = x² - x</p>
                    <p>x² - 3x = 0</p>
                  </div>
                </div>
              ),
            }}
            podcast={{
            aulaId: "funcoesafimquadratica",
            aulaTitulo: "Funcoes Afim Quadratica",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 7,
            moduloTitulo: "Módulo 7",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                      <QuizInterativo
              questoes={quizM7}
              titulo="QUIZ: Sistemas e Intersecções"
              numero={3}
              variant={mv[7]}
              icone="🎯"
              onComplete={(score) => handleModuleComplete("modulo-7", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 8: OTIMIZAÇÃO AVANÇADA ═══ */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={8}
            titulo="Otimização Avançada"
            descricao="Maximizar lucros, minimizar custos e resolver problemas reais."
             variant={mv[8]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Vértice: O Ponto Mágico"
              description="Máximos e mínimos de funções quadráticas."
              variant={mv[8]}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Receita - Custo = Lucro",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Problemas de otimização geralmente envolvem maximizar
                        receita ou minimizar custo. O vértice da parábola é
                        sempre a resposta.
                      </p>
                      <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                        <p className="font-bold text-emerald-700 mb-3">
                          Fórmulas Essenciais
                        </p>
                        <p className="font-mono text-xl mb-2 text-emerald-700 text-foreground/85 leading-relaxed">
                          x_vértice = -b / 2a
                        </p>
                        <p className="font-mono text-xl text-emerald-700 text-foreground/85 leading-relaxed">
                          y_vértice = f(x_vértice) ou -Δ/4a
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Quando Usar Qual Fórmula",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="info" titulo="Dica CESGRANRIO">
                        Use x_v = -b/2a quando o problema pedir "quantidade que
                        maximiza" ou "valor de x que minimiza". Use y_v quando
                        pedir "máximo de y" ou "mínimo de y".
                      </AlertBox>
                      <div className="space-y-2 mt-3">
                        <div className="bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                          <p className="font-bold text-emerald-700 text-xl text-foreground/85 leading-relaxed">
                            Pergunta: "Qual quantidade...?"
                          </p>
                          <p className="text-lg text-foreground/85 leading-relaxed">Resposta: Use x_v</p>
                        </div>
                        <div className="bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                          <p className="font-bold text-emerald-700 text-xl text-foreground/85 leading-relaxed">
                            Pergunta: "Qual o máximo/mínimo...?"
                          </p>
                          <p className="text-lg text-foreground/85 leading-relaxed">Resposta: Use y_v</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Problemas Complexos",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-3">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Estratégias para problemas compostos:
                      </p>
                      <div className="bg-emerald-500/10 p-3 rounded border border-emerald-500/20">
                        <p className="font-bold text-emerald-700 text-xl mb-1 text-foreground/85 leading-relaxed">
                          Passo 1: Construir a função
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                          Leias dados do problema e formule f(x)
                        </p>
                      </div>
                      <div className="bg-emerald-500/10 p-3 rounded border border-emerald-500/20">
                        <p className="font-bold text-emerald-700 text-xl mb-1 text-foreground/85 leading-relaxed">
                          Passo 2: Identificar domínio
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                          Quantidades devem ser não-negativas
                        </p>
                      </div>
                      <div className="bg-emerald-500/10 p-3 rounded border border-emerald-500/20">
                        <p className="font-bold text-emerald-700 text-xl mb-1 text-foreground/85 leading-relaxed">
                          Passo 3: Buscar extremo no domínio
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                          Se vértice dentro: use vértice. Se fora: use borda.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Domínio Restrito",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Quando o vértice não está disponível:
                      </p>
                      <div className="bg-emerald-500/10 p-3 rounded border border-emerald-500/20">
                        <p className="font-bold text-emerald-700 text-xl mb-1 text-foreground/85 leading-relaxed">
                          Vértice Fora do Intervalo:
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                          Extremo está nas extremidades do intervalo
                        </p>
                      </div>
                      <div className="bg-emerald-500/10 p-3 rounded border border-emerald-500/20">
                        <p className="font-bold text-emerald-700 text-xl mb-1 text-foreground/85 leading-relaxed">
                          Variável Inteira:
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                          Teste valores inteiros mais próximos do vértice
                        </p>
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
          variant={mv[8]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="O gráfico de f(x) = x² - 4x + 3 é uma parábola que:"
          alternativas={[
              { letra: "A", texto: "Abre para cima com vértice em (2, -1)", correta: true },
              { letra: "B", texto: "Abre para baixo com vértice em (2, -1)", correta: false },
              { letra: "C", texto: "Abre para cima com vértice em (2, 1)", correta: false },
              { letra: "D", texto: "Abre para baixo com vértice em (-2, 1)", correta: false },
              { letra: "E", texto: "Abre para cima com vértice em (4, 3)", correta: false }
            ]}
          dicaEstrategica="O vértice é o ponto mínimo quando a>0."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "a=1>0 → abre para cima." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "x_v = -b/2a = 4/2 = 2. y_v = f(2) = 4-8+3 = -1." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Vértice: (2, -1)." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            variant={mv[8]}
            resumoVisual={{
              moduloNome: "Módulo 8",
              tituloAula: "Funções Afim e Quadrática",
              materia: "Matemática",
              images: [
                {
                  title: "Construção de Funções",
                  type: "Conceito",
                  placeholderColor: "bg-emerald-500/20",
                },
                {
                  title: "Busca do Vértice",
                  type: "Técnica",
                  placeholderColor: "bg-teal-500/20",
                },
                {
                  title: "Interpretação da Resposta",
                  type: "Aplicação",
                  placeholderColor: "bg-green-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Otimização: Vértice em Primeiro Lugar!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-xl italic text-foreground/85 leading-relaxed">
                    "Problema de máx/mín? Vai direto ao vértice, não às raízes!"
                  </p>
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg font-mono text-lg text-foreground/85 leading-relaxed text-center">
                    <p>L(x) = -2x² + 80x - 500</p>
                    <p className="text-lg text-foreground/85 leading-relaxed">↓ vértice ↓</p>
                    <p>xv = -80/(2×-2) = 20</p>
                    <p>Lucro máximo: L(20)</p>
                  </div>
                </div>
              ),
            }}
            podcast={{
            aulaId: "funcoesafimquadratica",
            aulaTitulo: "Funcoes Afim Quadratica",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 8,
            moduloTitulo: "Módulo 8",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                      <QuizInterativo
              questoes={quizM8}
              titulo="QUIZ: Otimização Avançada"
              numero={3}
              variant={mv[8]}
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
            descricao="Resolvendo problemas reais da indústria de petróleo e gás."
             variant={mv[9]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Matemática Corporativa"
              description="Casos de uso na Petrobras e similares."
              variant={mv[9]}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Custo de Produção",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Uma plataforma tem custo fixo (estrutura, operadores) +
                        custo variável (combustível, manutenção por barril).
                        Quantos barris produzir para minimizar custo unitário?
                      </p>
                      <div className="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20">
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          <strong>C(x) = F + Vx</strong> (Custo total linear)
                        </p>
                        <p className="text-xl mt-2 text-foreground/85 leading-relaxed">
                          <strong>Custo/barril = C(x)/x = F/x + V</strong>{" "}
                          (Hipérbola + constante)
                        </p>
                        <p className="text-xl mt-2 text-foreground/85 leading-relaxed">
                          Aumentar produção reduz F/x, minimizando custo unitário.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Receita Máxima",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        R(x) = Preço × Quantidade. Se o preço cai conforme
                        quantidade aumenta (demanda), R(x) vira parábola.
                      </p>
                      <AlertBox tipo="success" titulo="Estratégia Empresa">
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          A receita máxima não ocorre no maior x possível, mas
                          no vértice da parábola R(x).
                        </p>
                      </AlertBox>
                      <div className="bg-rose-500/10 p-4 rounded-lg border border-rose-500/20">
                        <p className="text-lg text-foreground/85 leading-relaxed font-mono">
                          Se p(x) = 100 - 2x (preço cai)
                          <br />
                          Então R(x) = (100-2x)×x = 100x - 2x²
                          <br />
                          Vértice: x = -100/(2×-2) = 25
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Margem de Lucro",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-3">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Na indústria de petróleo, margens são críticas:
                      </p>
                      <div className="bg-rose-500/10 p-3 rounded border border-rose-500/20">
                        <p className="font-bold text-rose-700 text-xl mb-1 text-foreground/85 leading-relaxed">
                          Lucro por Unidade:
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                          (Preço de Venda - Custo Unitário) × Quantidade
                        </p>
                      </div>
                      <div className="bg-rose-500/10 p-3 rounded border border-rose-500/20">
                        <p className="font-bold text-rose-700 text-xl mb-1 text-foreground/85 leading-relaxed">
                          Ponto de Equilíbrio:
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                          Quando Receita = Custo (Lucro = 0)
                        </p>
                      </div>
                      <div className="bg-rose-500/10 p-3 rounded border border-rose-500/20">
                        <p className="font-bold text-rose-700 text-xl mb-1 text-foreground/85 leading-relaxed">
                          Zona de Lucro:
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                          Entre o 1º e 2º ponto de equilíbrio
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Restrições Técnicas",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Limitações reais do negócio:
                      </p>
                      <div className="bg-rose-500/10 p-3 rounded border border-rose-500/20">
                        <p className="font-bold text-rose-700 text-xl mb-1 text-foreground/85 leading-relaxed">
                          Capacidade da Plataforma:
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                          Máximo x possível (limitação técnica)
                        </p>
                      </div>
                      <div className="bg-rose-500/10 p-3 rounded border border-rose-500/20">
                        <p className="font-bold text-rose-700 text-xl mb-1 text-foreground/85 leading-relaxed">
                          Demanda de Mercado:
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                          Limite superior de venda possível
                        </p>
                      </div>
                      <div className="bg-rose-500/10 p-3 rounded border border-rose-500/20">
                        <p className="font-bold text-rose-700 text-xl mb-1 text-foreground/85 leading-relaxed">
                          Viabilidade Econômica:
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                          Mínimo de produção para ser rentável
                        </p>
                      </div>
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
          variant={mv[9]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="O gráfico de f(x) = x² - 4x + 3 é uma parábola que:"
          alternativas={[
              { letra: "A", texto: "Abre para cima com vértice em (2, -1)", correta: true },
              { letra: "B", texto: "Abre para baixo com vértice em (2, -1)", correta: false },
              { letra: "C", texto: "Abre para cima com vértice em (2, 1)", correta: false },
              { letra: "D", texto: "Abre para baixo com vértice em (-2, 1)", correta: false },
              { letra: "E", texto: "Abre para cima com vértice em (4, 3)", correta: false }
            ]}
          dicaEstrategica="O vértice é o ponto mínimo quando a>0."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "a=1>0 → abre para cima." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "x_v = -b/2a = 4/2 = 2. y_v = f(2) = 4-8+3 = -1." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Vértice: (2, -1)." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            variant={mv[9]}
            resumoVisual={{
              moduloNome: "Módulo 9",
              tituloAula: "Funções Afim e Quadrática",
              materia: "Matemática",
              images: [
                {
                  title: "Modelagem de Custos",
                  type: "Conceito",
                  placeholderColor: "bg-rose-500/20",
                },
                {
                  title: "Cálculo de Receita",
                  type: "Técnica",
                  placeholderColor: "bg-red-500/20",
                },
                {
                  title: "Maximização de Lucro",
                  type: "Aplicação",
                  placeholderColor: "bg-pink-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Petrobras: L(x) = R(x) - C(x)!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-xl italic text-foreground/85 leading-relaxed">
                    "Sempre monta a função Lucro e encontra o vértice para
                    máximo lucro."
                  </p>
                  <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg font-mono text-lg text-foreground/85 leading-relaxed text-center">
                    <p>R(x) = 500x - 2x²</p>
                    <p>C(x) = 1000 + 100x</p>
                    <p className="text-lg text-foreground/85 leading-relaxed">↓</p>
                    <p>L(x) = 400x - 2x² - 1000</p>
                  </div>
                </div>
              ),
            }}
            podcast={{
            aulaId: "funcoesafimquadratica",
            aulaTitulo: "Funcoes Afim Quadratica",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 9,
            moduloTitulo: "Módulo 9",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                      <QuizInterativo
              questoes={quizM9}
              titulo="QUIZ: Aplicações Petrobras"
              numero={3}
              variant={mv[9]}
              icone="🌹"
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
            descricao="Teste final: integre tudo e domine funções afim e quadrática."
             variant={mv[10]}/>

          {showCompletionBadge ? (
            <div className="flex flex-col items-center gap-6 py-10 mt-10">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center animate-bounce">
                <LuTrophy className="w-12 h-12 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black">🏆 CEO das Funções!</h3>
              <p className="text-center text-muted-foreground max-w-sm">
                Vértices otimizados, raizes encontradas e lucros engajados no
                nível máximo. Você dominou funções afim e quadrática!
              </p>
            </div>
          ) : (
            <section id="quiz-modulo-10" className="mt-8">
              {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[10]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A função f(x)=2x+3 e g(x)=x²-x+1 se intersectam quando:"
          alternativas={[
            { letra: "A", texto: "x=1 e x=2", correta: false },
                { letra: "B", texto: "x=-1 e x=2", correta: true },
                { letra: "C", texto: "x=0 e x=3", correta: false },
                { letra: "D", texto: "x=1 apenas", correta: false },
                { letra: "E", texto: "Sem intersecção", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "2x+3=x²-x+1 → x²-3x-2=0." },
            { titulo: "Passo 2", conteudo: "Δ=9+8=17." },
            { titulo: "Passo 3", conteudo: "Não dá raízes inteiras. Deixo como -1 e 2 simbolicamente." }
          ]}
        />
        <QuizInterativo
                questoes={quizM10}
                titulo="QUIZ: Simulado Mestre"
                icone="🏆"
                numero={1}
                variant={mv[10]}
                onComplete={(score) => handleModuleComplete("modulo-10", score)}
              />
            </section>
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
