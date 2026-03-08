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
} from "../shared";

import {
  LuBookOpen,
  LuLightbulb,
  LuTarget,
  LuTrendingUp,
  LuTrophy,
  LuBrain,
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
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(),
  );

  const [quizAfim] = useState(() => getRandomQuestions(QUIZ_M1_AFIM, 4));
  const [quizQuadratica] = useState(() =>
    getRandomQuestions(QUIZ_M2_QUADRATICA, 4),
  );
  const [quizGrafico] = useState(() => getRandomQuestions(QUIZ_M3_GRAFICOS, 4));
  const [quizAplicacoes] = useState(() =>
    getRandomQuestions(QUIZ_M4_APLICACOES, 4),
  );
  const [quizComparacao] = useState(() =>
    getRandomQuestions(QUIZ_M6_COMPARACAO, 4),
  );
  const [quizInequacoes] = useState(() =>
    getRandomQuestions(QUIZ_M7_INEQUACOES, 4),
  );
  const [quizSistemas] = useState(() =>
    getRandomQuestions(QUIZ_M8_SISTEMAS, 4),
  );
  const [quizOtimizacao] = useState(() =>
    getRandomQuestions(QUIZ_M9_OTIMIZACAO, 5),
  );
  const [quizSimuladoMestre] = useState(() =>
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
      {/* ═══ MÓDULO 1 ═══ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={1}
            titulo="Função Afim (A Reta)"
            descricao="Custo fixo e variável: modelando o comportamento corporativo."
            gradiente="bg-gradient-to-br from-blue-700 to-sky-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Receita do Bolo (ax + b)"
              description="Identifique a essência da linha reta nos gráficos empresariais."
              variant="blue"
            />

            <p className="text-muted-foreground leading-relaxed text-lg">
              A <strong>Função Afim</strong>, muitas vezes chamada de Função do
              1º Grau, é a forma matemática de prever valores proporcionais no
              futuro, como os custos de produção em série.
            </p>

            <ContentAccordion
              slides={[
                {
                  titulo: "Os Dois Coeficientes Vitais",
                  icone:<LuTarget />,
                  conteudo:(
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
                            <p className="text-sm">
                              Coeficiente Angular. Mostra o quão rápido o valor
                              sobe (ou desce). Ex: R$3 por Km rodado.
                            </p>
                          </div>
                          <div className="text-left bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                            <p className="font-bold text-blue-700">
                              A Bandeirada (b)
                            </p>
                            <p className="text-sm">
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
                  titulo: "Contexto Petrobras",
                  icone:<LuBookOpen />,
                  conteudo:(
                    <div className="space-y-4">
                      <AlertBox tipo="info" titulo="Modelagem de Custos">
                        <p className="text-sm">
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
                  titulo: "A Raiz (Onde fura o chão)",
                  icone:<LuTrendingUp />,
                  conteudo:(
                    <div className="space-y-4 text-center">
                      <p className="text-muted-foreground text-left text-sm">
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
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizAfim}
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
            titulo="A Função Quadrática"
            descricao="O reino do crescimento acelerado e do formato parabólico."
            gradiente="bg-gradient-to-br from-emerald-600 to-teal-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Côncavas e Convexas"
              description="A equação ganha um expoente na potência dois. Tudo muda."
              variant="emerald"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Os Limites do Universo",
                  icone:<LuBrain />,
                  conteudo:(
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
                          <p className="text-sm">
                            Gráfico atinge um ponto muito baixo (MÍNIMO) e volta
                            a subir para a eternidade. (Ex: Custos).
                          </p>
                        </div>
                        <div className="border border-rose-500/30 bg-rose-500/10 p-4 rounded-lg text-center">
                          <div className="text-rose-700 font-black mb-1">
                            Se a &lt; 0
                          </div>
                          <p className="font-mono text-lg mb-2">U Triste</p>
                          <p className="text-sm">
                            Gráfico atinge o topo de um pico (MÁXIMO) e cai.
                            (Ex: Lucros em declínio ou movimento de pedras).
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "O Ponto Inicial (c)",
                  icone:<LuTarget />,
                  conteudo:(
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
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizQuadratica}
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
            titulo="Interpretação Geográfica"
            descricao="Brotou o gráfico na sua frente. O que ele está dizendo?"
            gradiente="bg-gradient-to-br from-amber-600 to-orange-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Estudo Cidadão do Sinal"
              description="Quando o gráfico mente e quando o gráfico expõe verdades duras."
              variant="amber"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "A Linha d'Água (Eixo X)",
                  icone:<LuBookOpen />,
                  conteudo:(
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
                        <ul className="text-sm space-y-2 list-disc pl-5">
                          <li>
                            Elas costumam subir, ficar POSITIVAS entre as duas
                            raízes, atingir o topo e depois voltar a descer
                            rasgando o eixo X ficando negativas pra sempre.
                          </li>
                          <li>
                            <strong>
                              Entre as raízes de Lucas: A empresa dá lucro
                              absoluto.
                            </strong>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizGrafico}
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
            titulo="O Vértice do Poder"
            descricao="Maximizando o lucro da empresa ou escapando da ruína a tempo."
            gradiente="bg-gradient-to-br from-cyan-600 to-sky-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Dominando Vértices"
              description="Não tente achar raízes em problemas de lucro máximo."
              variant="cyan"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Erros Comuns (Pegadinha do Lucro Máx)",
                  icone:<LuTrophy />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Uma das táticas mais nefastas da Cesgranrio: apresentar
                        uma questão de <strong>Lucro Máximo</strong>. O
                        candidato inexperiente corre pra fazer Bhaskara achando
                        raízes.
                      </p>
                      <AlertBox
                        tipo="warning"
                        titulo="Nunca faça Bhaskara aqui!"
                      >
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
                  titulo: "Receita - Custo = Lucro",
                  icone:<LuBrain />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Lembre do mantra: Ninguém fala de f(x) na petroleira.
                        Eles falam de:
                      </p>
                      <div className="bg-cyan-500/10 p-4 border border-cyan-500/20 text-center rounded-xl font-mono text-lg font-bold">
                        L(x) = R(x) - C(x)
                      </div>
                      <p className="text-sm mt-2 text-muted-foreground">
                        Onde você diminui toda a função de Receita pela de Custo
                        (lembre de botar parênteses no Custo para o sinal
                        negativo invadir todo mundo corretamente). E a nova
                        função virou <code>ax² + bx + c</code>, para aí sim
                        procurar o Vértice.
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizAplicacoes}
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
            titulo="Comparação Afim vs Quadrática"
            descricao="Entenda as diferenças e semelhanças entre retas e parábolas."
            gradiente="bg-gradient-to-br from-violet-600 to-purple-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Duas Famílias Distintas"
              description="Linear versus Quadrático: comportamentos completamente diferentes."
              variant="violet"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "A Reta (Afim) é Previsível",
                  icone:<LuTrendingUp />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        A função afim <code>f(x) = ax + b</code> sempre cresce ou decresce no mesmo ritmo. A cada novo x, você adiciona exatamente <code>a</code> no resultado.
                      </p>
                      <div className="bg-violet-500/10 p-4 rounded-xl border border-violet-500/20">
                        <p className="font-bold text-violet-700 mb-2">Comportamento Uniforme</p>
                        <ul className="text-sm space-y-1 list-disc pl-5">
                          <li>Se a &gt; 0: cresce sempre</li>
                          <li>Se a &lt; 0: decresce sempre</li>
                          <li>Taxa de variação: sempre <code>a</code></li>
                        </ul>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "A Parábola (Quadrática) é Acelerada",
                  icone:<LuBrain />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        A função quadrática <code>f(x) = ax² + bx + c</code> cresce/decresce cada vez mais rápido conforme <code>|x|</code> aumenta. Para valores grandes de x, domina totalmente a reta.
                      </p>
                      <AlertBox tipo="info" titulo="Dominação Quadrática">
                        <p>Para x suficientemente grande, qualquer parábola ultrapassa qualquer reta. O termo x² é mais poderoso que 2x para |x| grande.</p>
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizComparacao}
            titulo="Fixação - Módulo 5"
            numero={5}
            variant="violet"
            icone="🧠"
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
          />
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 6 ═══ */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={6}
            titulo="Inequações com Afim e Quadrática"
            descricao="Resolva f(x) > 0, f(x) < 0 e variações com confiança."
            gradiente="bg-gradient-to-br from-amber-600 to-orange-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Estudando o Sinal da Função"
              description="Onde a função é positiva, negativa ou nula."
              variant="amber"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Raízes (Zeros) São PontosChave",
                  icone:<LuTarget />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        As raízes dividem o domínio em intervalos. Em cada intervalo, a função mantém o mesmo sinal (sempre positiva ou sempre negativa).
                      </p>
                      <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20">
                        <p className="font-bold text-amber-700 mb-2">Estratégia</p>
                        <ol className="text-sm space-y-2 list-decimal pl-5">
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
                  titulo: "Inversão de Sinal em Inequações",
                  icone:<LuLightbulb />,
                  conteudo:(
                    <div className="space-y-4">
                      <AlertBox tipo="warning" titulo="Cuidado!">
                        Ao multiplicar ou dividir uma inequação por um número negativo, o sinal de &lt;, &gt;, ≤, ≥ se inverte!
                      </AlertBox>
                      <p className="text-sm text-muted-foreground">
                        Ex: -2x &gt; 6 → x &lt; -3 (o &gt; virou &lt;)
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizInequacoes}
            titulo="Fixação - Módulo 6"
            numero={6}
            variant="amber"
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
            titulo="Sistemas e Intesecções"
            descricao="Encontre onde retas e parábolas se cruzam no plano cartesiano."
            gradiente="bg-gradient-to-br from-cyan-600 to-blue-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Encontrando Pontos de Encontro"
              description="Sistemas com funções afim e quadrática."
              variant="cyan"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Reta vs Parábola",
                  icone:<LuBookOpen />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Para encontrar onde y = reta cruza y = parábola, iguale as duas expressões e resolva a equação resultante.
                      </p>
                      <div className="bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20">
                        <p className="font-mono text-sm font-bold text-cyan-700">
                          Se y = 2x + 1 e y = x²:<br/>
                          x² = 2x + 1<br/>
                          x² - 2x - 1 = 0<br/>
                          Δ = 4 + 4 = 8 &gt; 0 → 2 soluções → 2 pontos
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Tangência (Um Único Ponto)",
                  icone:<LuTrophy />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Quando Δ = 0, a reta toca a parábola em exatamente um ponto (tangência).
                      </p>
                      <AlertBox tipo="success" titulo="Discriminante Decisivo">
                        <p className="text-sm">Δ &gt; 0: 2 pontos | Δ = 0: 1 ponto (tangência) | Δ &lt; 0: sem intersecção</p>
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizSistemas}
            titulo="Fixação - Módulo 7"
            numero={7}
            variant="cyan"
            icone="🎯"
            onComplete={(score) => handleModuleComplete("modulo-7", score)}
          />
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 8 ═══ */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={8}
            titulo="Otimização Avançada"
            descricao="Maximizar lucros, minimizar custos e resolver problemas reais."
            gradiente="bg-gradient-to-br from-emerald-600 to-green-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Vértice: O Ponto Mágico"
              description="Máximos e mínimos de funções quadráticas."
              variant="emerald"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Receita - Custo = Lucro",
                  icone:<LuLightbulb />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Problemas de otimização geralmente envolvem maximizar receita ou minimizar custo. O vértice da parábola é sempre a resposta.
                      </p>
                      <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                        <p className="font-bold text-emerald-700 mb-3">Fórmulas Essenciais</p>
                        <p className="font-mono text-sm mb-2 text-emerald-700">x_vértice = -b / 2a</p>
                        <p className="font-mono text-sm text-emerald-700">y_vértice = f(x_vértice)</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Quando Usar Qual Fórmula?",
                  icone:<LuBrain />,
                  conteudo:(
                    <div className="space-y-4">
                      <AlertBox tipo="info" titulo="Dica CESGRANRIO">
                        Use x_v = -b/2a quando o problema pedir "quantidade que maximiza" ou "valor de x que minimiza". Use y_v quando pedir "máximo de y" ou "mínimo de y".
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizOtimizacao}
            titulo="Fixação - Módulo 8"
            numero={8}
            variant="emerald"
            icone="🎯"
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
            descricao="Resolvendo problemas reais da indústria de petróleo e gás."
            gradiente="bg-gradient-to-br from-rose-600 to-red-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Matemática Corporativa"
              description="Casos de uso na Petrobras e similares."
              variant="rose"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Problema Clássico: Custo de Produção",
                  icone:<LuTarget />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Uma plataforma tem custo fixo (estrutura, operadores) + custo variável (combustível, manutenção por barril). Quantos barris produzir para minimizar custo unitário?
                      </p>
                      <div className="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20">
                        <p className="text-sm"><strong>C(x) = F + Vx</strong> (Custo total linear)</p>
                        <p className="text-sm mt-2"><strong>Custo/barril = C(x)/x = F/x + V</strong> (Hipérbola + constante)</p>
                        <p className="text-sm mt-2">Aumentar produção reduz F/x, minimizando custo unitário.</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Problema de Receita Máxima",
                  icone:<LuTrendingUp />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        R(x) = Preço × Quantidade. Se o preço cai conforme quantidade aumenta (demanda), R(x) vira parábola.
                      </p>
                      <AlertBox tipo="success" titulo="Estratégia Empresa">
                        <p className="text-sm">A receita máxima não ocorre no maior x possível, mas no vértice da parábola R(x).</p>
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizOtimizacao}
            titulo="Fixação - Módulo 9"
            numero={9}
            variant="rose"
            icone="🌹"
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
            descricao="Teste final: integre tudo e domine funções afim e quadrática."
            gradiente="bg-gradient-to-br from-slate-800 to-slate-900"
          />

          {showCompletionBadge ? (
            <div className="flex flex-col items-center gap-6 py-10 mt-10">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center animate-bounce">
                <LuTrophy className="w-12 h-12 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black">CEO das Funções!</h3>
              <p className="text-center text-muted-foreground max-w-sm">
                Vértices otimizados, raizes encontradas e lucros engajados no
                nível máximo.
              </p>
            </div>
          ) : (
            <section id="quiz-modulo-10" className="mt-8">
              <QuizInterativo
                questoes={quizSimuladoMestre}
                titulo="Simulado Elite - Funções Afim e Quad."
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
