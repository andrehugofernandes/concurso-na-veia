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
  FlipCard,
  ModuleSummaryCarouselNew,
} from "../shared";

import {
  LuBookOpen,
  LuLightbulb,
  LuTarget,
  LuBrain,
  LuPlay,
  LuMusic,
  LuTrophy,
  LuCircleCheck,
  LuArrowRight,
  LuCircleX,
} from "react-icons/lu";

import {
  QUIZ_M1_CONCEITOS,
  QUIZ_M2_FRACOES,
  QUIZ_M3_PROBLEMAS,
  QUIZ_M4_INEQUACOES,
  QUIZ_M5_FINAL,
} from "./data/equacoes-1grau-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Conceitos Fundamentais" },
  { id: "modulo-2", label: "Módulo 2", title: "Problemas do Cotidiano" },
  { id: "modulo-3", label: "Módulo 3", title: "Ameaças em Frações" },
  { id: "modulo-4", label: "Módulo 4", title: "Sistemas Lineares" },
  { id: "modulo-5", label: "Módulo 5", title: "Desafio Final" },
] as const;

export default function AulaEquacoes1Grau({
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
  const [quizM2, setQuizM2] = useState<typeof QUIZ_M3_PROBLEMAS>([]); // Note: Problemas is M2 visually
  const [quizM3, setQuizM3] = useState<typeof QUIZ_M2_FRACOES>([]); // Frações is M3 visually
  const [quizM4, setQuizM4] = useState<typeof QUIZ_M4_INEQUACOES>([]);
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
      setQuizM2(getRandomQuestions(QUIZ_M3_PROBLEMAS, 4));
      setQuizM3(getRandomQuestions(QUIZ_M2_FRACOES, 4));
      setQuizM4(getRandomQuestions(QUIZ_M4_INEQUACOES, 4));
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
            titulo="Fundamentos de Equações"
            descricao="A base: isolar a incógnita e resolver a balança invisível."
            gradiente="bg-gradient-to-br from-blue-700 to-sky-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Mecânica das Equações"
              description="Dominando a balança matemática: o que você faz de um lado, faz do outro."
              variant="blue"
            />

            <p className="text-muted-foreground leading-relaxed text-lg">
              Uma <strong>equação do 1º grau</strong> é uma igualdade que contém
              pelo menos uma letra (incógnita) com expoente invisível igual a 1.
              Na matemática do seu dia a dia (e da Cesgranrio), o sinal de{" "}
              <strong className="text-xl px-1">=</strong> é o pino central de
              uma balança de pratos de laboratório.
            </p>

            <ContentAccordion
              slides={[
                {
                  titulo: "O Princípio da Balança",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Para ela não pender (não quebrar a igualdade), tudo o
                        que você fizer de um lado{" "}
                        <strong>
                          TEM QUE fazer exatamente igual do outro lado
                        </strong>
                        . Na prática, usamos o atalho mental: "passa pro outro
                        lado invertendo a operação".
                      </p>
                      <div className="bg-muted p-4 rounded-xl border border-border text-center">
                        <p className="text-xl font-mono font-black text-blue-600">
                          2x - 8 = 10
                        </p>
                        <div className="space-y-2 mt-4 text-sm font-medium">
                          <p>
                            1º: 2x = 10{" "}
                            <strong className="text-blue-500">+ 8</strong>{" "}
                            <em>(O -8 inverteu operação para SOMA)</em>
                          </p>
                          <p>2º: 2x = 18</p>
                          <p>
                            3º: x = 18{" "}
                            <strong className="text-blue-500">/ 2</strong>{" "}
                            <em>(O 2 inverteu operação para DIVISÃO)</em>
                          </p>
                          <p className="text-lg font-bold text-foreground mt-2">
                            x = 9
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Sinal x Operação (Pegadinha)",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <AlertBox
                      tipo="warning"
                      titulo="O Veneno da Operação Inversa"
                    >
                      <p className="text-sm">
                        Muitos pensam "Inverte o Sinal".{" "}
                        <strong>ERRADO!</strong> Inverte-se a{" "}
                        <strong>operação</strong>! Se for <code>-3x = 15</code>,
                        o <code>-3</code> está multiplicando. Ele passa para o
                        outro lado DIVIDINDO{" "}
                        <strong>junto com o sinal negativo dele</strong>. O
                        correto é <code>x = 15 / (-3)</code>, que dá{" "}
                        <code>-5</code>.
                      </p>
                    </AlertBox>
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
            titulo="Problemas do Cotidiano"
            descricao="A habilidade mais valiosa: Transforme texto em equação."
            gradiente="bg-gradient-to-br from-emerald-600 to-teal-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Traduzindo Problemas"
              description="O dicionário que traduz o Português Jurídico da Banca para a Matemática."
              variant="emerald"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "O Dicionário Operacional",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                          <h4 className="font-bold text-emerald-700 mb-2">
                            Traduções Fixas
                          </h4>
                          <ul className="space-y-2 text-sm text-foreground">
                            <li>
                              Um número = <strong>x</strong>
                            </li>
                            <li>
                              O dobro = <strong>2x</strong>
                            </li>
                            <li>
                              A metade = <strong>x/2</strong>
                            </li>
                            <li>
                              O sucessor = <strong>x + 1</strong>
                            </li>
                            <li>
                              A diferença = <strong>Subtração (-)</strong>
                            </li>
                            <li>
                              Quociente = <strong>Divisão (/)</strong>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                          <h4 className="font-bold text-emerald-700 mb-2">
                            Protocolo de Batalha
                          </h4>
                          <ol className="space-y-2 text-sm text-foreground list-decimal ml-4 font-medium">
                            <li>Leia tudo uma vez respirando fundo.</li>
                            <li>Declare quem é "X".</li>
                            <li>
                              Ache o verbo "É" / "Ficou" / "Resulta". Ali fica o{" "}
                              <strong>"="</strong>.
                            </li>
                            <li>
                              Escreva a equação lendo pedacinho por pedacinho.
                            </li>
                          </ol>
                        </div>
                      </div>
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
            titulo="Ameaças em Frações"
            descricao="Como destruir frações através do MMC em um único golpe."
            gradiente="bg-gradient-to-br from-amber-600 to-orange-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Limpando Frações Rápidamente"
              description="Frações atraem o erro. Seu dever cívico é eliminá-las."
              variant="amber"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "O Aniquilador de Denominador (MMC)",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Se a equação tem denominadores de um lado, do outro,
                        perdidos... O truque sujo (e maravilhoso) é calcular o
                        MMC de todos os números de baixo e{" "}
                        <strong>
                          multiplicar TODOS os elementos de cima por esse MMC
                        </strong>
                        .
                      </p>

                      <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 font-mono text-sm space-y-3">
                        <p>
                          <strong>A Equação Suja:</strong> (x/2) + (x/3) = 5
                        </p>
                        <hr className="border-amber-500/30" />
                        <p>
                          1. MMC de 2 e 3 é{" "}
                          <strong className="text-amber-600">6</strong>.
                        </p>
                        <p>2. Multiplica a galera inteira por 6:</p>
                        <p className="text-center font-bold text-lg my-2">
                          6(x/2) + 6(x/3) = 6(5)
                        </p>
                        <p>3. Simplifica cortando (6/2=3, 6/3=2):</p>
                        <p className="text-center font-bold text-lg my-2 text-amber-700">
                          3x + 2x = 30
                        </p>
                        <p className="text-center">
                          5x = 30 → <strong>x = 6</strong>
                        </p>
                      </div>
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
        {/* Usando Cyan ao invés de Purple/Violet para respeitar o Purple Ban */}
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={4}
            titulo="Sistemas Lineares (2x2)"
            descricao="Duas equações, duas incógnitas. Dois métodos de ataque."
            gradiente="bg-gradient-to-br from-cyan-600 to-sky-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Dominando X e Y"
              description="Quando você tem duas balas para dois alvos."
              variant="cyan"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Método da Adição (Caça-Jato)",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        É o método veloz. Você empilha as equações e as "soma",
                        torcendo para que um dos valores fique neutro (ex: +2y e
                        -2y se anulam ali mesmo). Se não anular,{" "}
                        <strong>
                          multiplique a linha inteira de cima ou de baixo
                        </strong>{" "}
                        por um número que você escolhe à força, até que eles se
                        anulem.
                      </p>
                      <div className="bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20 flex justify-center text-center">
                        <div className="font-mono text-sm inline-block text-left relative">
                          <p> 2x + y = 10</p>
                          <p>
                            {" "}
                            3x - <strong className="text-red-500">y</strong> =
                            15
                          </p>
                          <div className="h-px w-full bg-cyan-500/50 my-2" />
                          <p> 5x + 0 = 25 → x = 5</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Substituição (Tático Lento)",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        É útil quando tem uma letra perfeitamente isolada. Ex:
                        "A idade de João é a de Maria mais cinco (J = M + 5)".
                        Neste caso, vá na segunda equação e onde tiver J, você
                        desce um parênteses e insere (M + 5) lá dentro.
                      </p>
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
            descricao="Reúna tudo o que aprendeu em problemas brutais e avançados de equações e frações."
            gradiente="bg-gradient-to-br from-slate-800 to-slate-900"
          />

          {showCompletionBadge ? (
            <div className="flex flex-col items-center gap-6 py-10 mt-10">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center animate-bounce">
                <LuTrophy className="w-12 h-12 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black">Mestre das Equações!</h3>
              <p className="text-center text-muted-foreground max-w-sm">
                Balanças calibradas. Sinais dominados. Você acabou de adquirir a
                base mais crítica do núcleo duro da Matemática Cesgranrio.
              </p>
            </div>
          ) : (
            <section id="quiz-modulo-5" className="mt-8">
              <QuizInterativo
                questoes={quizFinal}
                titulo="Simulado Elite - Equações"
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
