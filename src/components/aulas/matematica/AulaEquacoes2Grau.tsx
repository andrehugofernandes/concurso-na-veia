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
} from "./data/equacoes-2grau-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Bhaskara e Discriminante" },
  { id: "modulo-2", label: "Módulo 2", title: "Soma e Produto (Atalhos)" },
  { id: "modulo-3", label: "Módulo 3", title: "Problemas Práticos" },
  { id: "modulo-4", label: "Módulo 4", title: "Gráficos e Otimização" },
  { id: "modulo-5", label: "Módulo 5", title: "Desafio Final" },
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
  const [quizM2, setQuizM2] = useState<typeof QUIZ_M2_BHASKARA>([]); // Map this to M2 quiz conceptually
  const [quizM3, setQuizM3] = useState<typeof QUIZ_M3_AVANCADAS>([]); // Problemas
  const [quizM4, setQuizM4] = useState<typeof QUIZ_M4_PROBLEMAS>([]); // Parabola
  const [quizFinal, setQuizFinal] = useState<typeof QUIZ_M5_FINAL>([]);

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
      setQuizFinal(getRandomQuestions(QUIZ_M5_FINAL, 5));
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
            titulo="Desafio Supremo"
            descricao="Reúna tudo o que aprendeu em problemas brutais de equações polinomiais de grau 2."
            gradiente="bg-gradient-to-br from-slate-800 to-slate-900"
          />

          {showCompletionBadge ? (
            <div className="flex flex-col items-center gap-6 py-10 mt-10">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center animate-bounce">
                <LuTrophy className="w-12 h-12 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black">Ápice Parabólico!</h3>
              <p className="text-center text-muted-foreground max-w-sm">
                Raízes descobertas. Vértices conquistados. Você tem poder
                absoluto sobre as Equações Quadráticas e o arsenal inteiro está
                à sua disposição.
              </p>
            </div>
          ) : (
            <section id="quiz-modulo-5" className="mt-8">
              <QuizInterativo
                questoes={quizFinal}
                titulo="Simulado Elite - Equações 2º Grau"
                icone="🏆"
                numero={5}
                variant="slate"
                onComplete={(score) => handleModuleComplete("modulo-5", score)}
              />
            </section>
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}












