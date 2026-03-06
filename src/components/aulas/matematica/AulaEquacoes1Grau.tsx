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
} from "../shared";
import {
  QUIZ_M1_CONCEITOS,
  QUIZ_M2_FRACOES,
  QUIZ_M3_PROBLEMAS,
  QUIZ_M4_INEQUACOES,
  QUIZ_M5_FINAL,
} from "./data/equacoes-1grau-quizzes";

// Quizzes importados de ./data/equacoes-1grau-quizzes.ts
// (36 questões premium estilo CESGRANRIO)

// ── COMPONENT ───────────────────────────────────────────────────────────

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

  const [quizConceito] = useState(() =>
    getRandomQuestions(QUIZ_M1_CONCEITOS, 6),
  );
  const [quizProblemas] = useState(() =>
    getRandomQuestions(QUIZ_M3_PROBLEMAS, 6),
  );
  const [quizFracoes] = useState(() => getRandomQuestions(QUIZ_M2_FRACOES, 6));
  const [quizSistemas] = useState(() =>
    getRandomQuestions(QUIZ_M4_INEQUACOES, 5),
  );
  const [quizFinal] = useState(() => getRandomQuestions(QUIZ_M5_FINAL, 5));

  const isModuleUnlocked = (_index: number) => true;

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) {
      setCompletedModules((prev) => {
        const n = new Set(prev);
        n.add(moduleId);
        return n;
      });
      const idx = [
        "modulo-1",
        "modulo-2",
        "modulo-3",
        "modulo-4",
        "modulo-5",
      ].findIndex((m) => m === moduleId);
      const pct = Math.round(((idx + 1) / 5) * 100);
      onUpdateProgress?.(pct);
      if (idx < 4) setTimeout(() => setActiveTab(`modulo-${idx + 2}`), 1500);
    }
  };

  useEffect(() => {
    if (currentProgress && currentProgress > 0) {
      const count = Math.floor((currentProgress / 100) * 5);
      const s = new Set<string>();
      for (let i = 1; i <= count; i++) s.add(`modulo-${i}`);
      setCompletedModules(s);
    }
  }, [currentProgress]);

  const MODULE_DEFS = [
    { id: "modulo-1", label: "Módulo 1", titulo: "Conceitos" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Problemas" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Frações e Parênteses" },
    { id: "modulo-4", label: "Módulo 4", titulo: "Sistemas Lineares" },
    { id: "modulo-5", label: "Módulo 5", titulo: "Desafio Final" },
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
      {/* ═══ MÓDULO 1 ═══ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="Fundamentos de Equações"
          descricao="A base: isolar a incógnita e resolver."
          gradiente="bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="A Mecânica das Equações"
              description="Dominando a balança matemática: o que você faz de um lado, faz do outro."
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Princípios Fundamentais"
              icone="⚖️"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "O que é uma Equação?",
                  icone: "💡",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm sm:text-base">
                        Uma <strong>equação do 1º grau</strong> é uma igualdade
                        que contém pelo menos uma letra (incógnita) com expoente
                        invisível igual a 1 (como{" "}
                        <code className="bg-indigo-500/10 px-1 rounded">x</code>
                        , não{" "}
                        <code className="bg-indigo-500/10 px-1 rounded">
                          x²
                        </code>
                        ).
                      </p>
                      <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-center shadow-inner">
                        <p className="text-lg font-mono font-bold text-indigo-800 dark:text-indigo-300">
                          ax + b = 0
                        </p>
                        <p className="text-xs mt-1">
                          Onde "x" é a incógnita e "a" e "b" são números reais
                          (a ≠ 0).
                        </p>
                      </div>
                      <AlertBox tipo="info" titulo="O Princípio da Balança">
                        O sinal de <strong className="text-xl">=</strong> é o
                        pino central de uma balança de pratos. Para ela não
                        pender (não quebrar a igualdade), tudo o que você fizer
                        de um lado (somar, subtrair, multiplicar ou dividir),{" "}
                        <strong>
                          TEM QUE fazer exatamente igual do outro lado
                        </strong>
                        . Na prática, usamos o "passa pro outro lado invertendo
                        a operação".
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Isolando o 'X' (Passo a Passo)",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        O objetivo único em qualquer equação é deixar o{" "}
                        <strong>x sozinho e positivo</strong> de um lado da
                        igualdade.
                      </p>
                      <div className="bg-card p-4 rounded-xl border border-border">
                        <p className="font-bold text-sm mb-2">
                          A Ordem de Libertação do X:
                        </p>
                        <ul className="text-sm space-y-2 list-none pl-0">
                          <li>
                            <strong>1º Passo:</strong> Quem está somando ou
                            subtraindo passa para o outro lado invertendo (se
                            era +, vira -; se era -, vira +).
                          </li>
                          <li>
                            <strong>2º Passo:</strong> Quem está multiplicando
                            passa dividindo (MANTENDO O SINAL). Quem está
                            dividindo passa multiplicando.
                          </li>
                        </ul>
                      </div>
                      <div className="p-3 bg-indigo-500/10 rounded-lg text-sm text-center">
                        <p className="font-mono font-bold">2x - 8 = 10</p>
                        <p className="font-mono mt-1">
                          2x = 10 + 8 (o -8 passou +)
                        </p>
                        <p className="font-mono mt-1">2x = 18</p>
                        <p className="font-mono mt-1">
                          x = 18 / 2 (o 2 multiplicando passou dividindo)
                        </p>
                        <p className="font-mono font-bold mt-1 text-indigo-700 dark:text-indigo-300">
                          x = 9
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-1" className="mt-16">
            <QuizInterativo
              questoes={quizConceito}
              titulo="Quiz - Conceitos Básicos"
              icone="🧠"
              numero={1}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 2 ═══ */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <ModuleBanner
          numero={2}
          titulo="Problemas do Cotidiano"
          descricao="Transforme texto em equação."
          gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Traduzindo Problemas"
              description="Como transformar textos de bancas em equações matemáticas."
              variant="emerald"
              className="mb-6"
            />
            <ContentAccordion
              titulo="O Dicionário Matemático"
              icone="📖"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Lendo a Prova da CESGRANRIO",
                  icone: "🔍",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        O maior desafio de provas de concurso não é a conta, é{" "}
                        <strong>montar a conta</strong>. Veja o vocabulário base
                        que você precisa decorar:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                          <p className="font-bold">Em Português → Matemática</p>
                          <ul className="mt-2 space-y-1">
                            <li>
                              Um número desconhecido → <strong>x</strong>
                            </li>
                            <li>
                              O dobro do número → <strong>2x</strong>
                            </li>
                            <li>
                              A metade do número → <strong>x/2</strong>
                            </li>
                            <li>
                              O sucessor do número → <strong>x + 1</strong>
                            </li>
                            <li>
                              Excede o número em dois → <strong>x + 2</strong>
                            </li>
                          </ul>
                        </div>
                        <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                          <p className="font-bold">Em Português → Operadores</p>
                          <ul className="mt-2 space-y-1">
                            <li>
                              É igual a, equivale a, resulta em →{" "}
                              <strong>=</strong>
                            </li>
                            <li>
                              Aumentado, somado, mais → <strong>+</strong>
                            </li>
                            <li>
                              Diminuído, subtraído, diferença →{" "}
                              <strong>-</strong>
                            </li>
                            <li>
                              De, do, da (fração de algo) →{" "}
                              <strong>× (multiplicação)</strong>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <AlertBox
                        tipo="success"
                        titulo="Passo a Passo de Resolução Segura"
                      >
                        1. <strong>Quem é o X?</strong> Defina clamente (Ex: x =
                        salário do técnico).
                        <br />
                        2. <strong>Traduza pedaço por pedaço</strong> da
                        esquerda para a direita.
                        <br />
                        3. <strong>Encontre a igualdade (=)</strong> no texto (a
                        pista de onde abalança se equilibra).
                        <br />
                        4. <strong>Resolva isolando x</strong> e, depois,
                        VERIFIQUE se o valor de x responde à pergunta final da
                        questão (CESGRANRIO adora pedir o valor de 2x ao invés
                        de x só para enganar!).
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-2" className="mt-16">
            <QuizInterativo
              questoes={quizProblemas}
              titulo="Quiz - Problemas"
              icone="🧠"
              numero={2}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 3 ═══ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <ModuleBanner
          numero={3}
          titulo="Frações e Parênteses"
          descricao="MMC e distributiva para equações mais complexas."
          gradiente="bg-gradient-to-br from-amber-600 via-orange-600 to-red-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Resolvendo o Caos"
              description="Quando a equação vem cheia de armadilhas matemáticas."
              variant="amber"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Limpando a Equação"
              icone="🔧"
              corIndicador="bg-amber-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Parênteses e o 'Chuveirinho'",
                  icone: "🚿",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        O número que está colado no parênteses multiplica TODOS
                        os itens dentro dele (Propriedade Distributiva).
                      </p>
                      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 shadow-inner">
                        <p className="font-mono text-sm">3(x + 4) = 30</p>
                        <p className="font-mono text-sm">3x + 12 = 30</p>
                      </div>
                      <AlertBox
                        tipo="warning"
                        titulo="O Veneno da CESGRANRIO: O Sinal de Menos"
                      >
                        Se houver um sinal de menos antes do parênteses,{" "}
                        <strong>ELE TROCA O SINAL DE TODOS LÁ DENTRO</strong>.
                        <br />
                        Ex: -(2x - 5) vira -2x + 5.
                        <br />
                        Muitos candidatos esquecem de trocar o sinal do segundo
                        número!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "O Truque do MMC para Frações",
                  icone: "🔢",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        Equações com frações dão dor de cabeça. O segredo é
                        ELIMINAR os denominadores (números de baixo) logo no
                        primeiro passo.
                      </p>
                      <ol className="list-decimal pl-5 space-y-2 text-sm">
                        <li>
                          Calcule o <strong>MMC</strong> de todos os
                          denominadores da equação inteira.
                        </li>
                        <li>Multiplique a equação INTEIRA por esse MMC.</li>
                        <li>
                          Faça: MMC ÷ pelo número de baixo × pelo número de
                          cima.
                        </li>
                      </ol>
                      <div className="bg-card p-4 rounded-xl border border-border">
                        <p className="font-bold text-sm mb-2">
                          Exemplo Rápido:
                        </p>
                        <p className="font-mono text-sm">(x/2) + (x/3) = 5</p>
                        <p className="text-xs text-muted-foreground mt-1 mb-2">
                          MMC de 2 e 3 é 6. Multiplica tudo por 6:
                        </p>
                        <p className="font-mono text-sm text-amber-600 dark:text-amber-400">
                          3x + 2x = 30
                        </p>
                        <p className="font-mono text-sm">5x = 30 → x = 6</p>
                      </div>
                      <p className="text-xs italic">
                        Magicamente, não há mais frações!
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-3" className="mt-16">
            <QuizInterativo
              questoes={quizFracoes}
              titulo="Quiz - Frações e Parênteses"
              icone="🧠"
              numero={3}
              variant="amber"
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 4 ═══ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner
          numero={4}
          titulo="Sistemas Lineares 2×2"
          descricao="Duas equações, duas incógnitas."
          gradiente="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="2 Equações, 2 Incógnitas"
              description="Quando você tem x e y no mesmo problema."
              variant="violet"
              className="mb-6"
            />
            <ContentAccordion
              titulo="A Arte da Substituição e Adição"
              icone="⚔️"
              corIndicador="bg-violet-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Método da Substituição",
                  icone: "🔄",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        Ideal quando uma das letras (x ou y){" "}
                        <strong>está sozinha</strong> (sem número na frente ou
                        apenas multiplicada por 1).
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-sm mb-3">
                        <li>
                          <strong>1º:</strong> Pegue a equação mais fácil e
                          isole uma letra (ex: x = 10 - y).
                        </li>
                        <li>
                          <strong>2º:</strong> Pegue a OUTRA equação e troque a
                          letra pelo valor isolado no passo 1.
                        </li>
                        <li>
                          <strong>3º:</strong> Resolva para achar a primeira
                          variável. Depois volte para achar a segunda.
                        </li>
                      </ul>
                      <AlertBox tipo="info" titulo="Tática de Prova">
                        A CESGRANRIO frequentemente monta problemas do tipo:
                        "João comprou 3 cadeiras e 2 mesas (3c + 2m = X)". Se
                        você usar substituição, vá devagar e use parênteses na
                        hora de substituir!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Método da Adição (Eliminação)",
                  icone: "➕",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        O método <strong>mais rápido</strong> para quem tem
                        prática. Consiste em somar as duas equações (como numa
                        conta de padaria) para que uma variável "suma".
                      </p>
                      <div className="bg-violet-500/10 p-4 rounded-xl border border-violet-500/20 text-center shadow-inner">
                        <p className="font-mono text-sm">2x + y = 10</p>
                        <p className="font-mono text-sm">3x - y = 15</p>
                        <hr className="border-violet-500/30 my-2" />
                        <p className="font-mono text-sm font-bold text-violet-800 dark:text-violet-300">
                          5x = 25 → x = 5
                        </p>
                      </div>
                      <p className="text-sm mt-3">
                        <em>Mas e se as letras não sumirem sozinhas?</em>
                        <br />
                        Você deve <strong>multiplicar</strong> a linha inteira
                        de uma das equações por um número que você escolher, de
                        modo que force uma letra a ficar oposta (+2y e -2y, por
                        exemplo).
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-4" className="mt-16">
            <QuizInterativo
              questoes={quizSistemas}
              titulo="Quiz - Sistemas Lineares"
              icone="🔥"
              numero={4}
              variant="violet"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 5 ═══ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="Desafio Final"
          descricao="Reúna tudo o que aprendeu em problemas desafiadores."
          gradiente="bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700"
        />
        <div className="space-y-[50px]">
          <section id="quiz-modulo-5" className="mt-16">
            <QuizInterativo
              questoes={quizFinal}
              titulo="Desafio Final - Equações de 1º Grau"
              icone="🏆"
              numero={5}
              variant="rose"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
          {completedModules.has("modulo-5") && (
            <div className="mt-16 p-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] text-white text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="relative z-10 space-y-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-5xl mx-auto backdrop-blur-sm border border-white/30 animate-bounce">
                  ⚖️
                </div>
                <h3 className="text-4xl font-black italic tracking-tighter">
                  EQUAÇÕES DOMINADAS!
                </h3>
                <p className="text-xl opacity-90 max-w-xl mx-auto">
                  A base de tudo: resolver equações é a ferramenta mais poderosa
                  da Matemática.
                </p>
              </div>
            </div>
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
