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
  LuTrophy,
  LuCircleCheck,
  LuCircleX,
  LuTriangleAlert,
  LuZap,
  LuShield,
  LuGraduationCap,
} from "react-icons/lu";

import {
  QUIZ_M1_CONCEITOS,
  QUIZ_M2_FRACOES,
  QUIZ_M3_PROBLEMAS,
  QUIZ_M4_INEQUACOES,
  QUIZ_M5_FINAL,
  QUIZ_M6_SISTEMAS_AVANCADOS,
  QUIZ_M7_VERIFICACAO,
  QUIZ_M8_PEGADINHAS,
  QUIZ_M9_PETROBRASESPECIFICO,
  QUIZ_M10_SIMULADO_MESTRE,
} from "./data/equacoes-1grau-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Fundamentos & Balança" },
  { id: "modulo-2", label: "Módulo 2", title: "Tradução de Problemas" },
  { id: "modulo-3", label: "Módulo 3", title: "Equações com Frações" },
  { id: "modulo-4", label: "Módulo 4", title: "Sistemas Lineares" },
  { id: "modulo-5", label: "Módulo 5", title: "Simulado Parcial (M1-M4)" },
  { id: "modulo-6", label: "Módulo 6", title: "Inequações de 1º Grau" },
  { id: "modulo-7", label: "Módulo 7", title: "Sistemas 3x3 & Avançado" },
  { id: "modulo-8", label: "Módulo 8", title: "Resolução Reversa" },
  { id: "modulo-9", label: "Módulo 9", title: "Aplicações Petrobras" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
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
  const [quizM2, setQuizM2] = useState<typeof QUIZ_M2_FRACOES>([]);
  const [quizM3, setQuizM3] = useState<typeof QUIZ_M3_PROBLEMAS>([]);
  const [quizM4, setQuizM4] = useState<typeof QUIZ_M4_INEQUACOES>([]);
  const [quizM5, setQuizM5] = useState<typeof QUIZ_M5_FINAL>([]);
  const [quizM6, setQuizM6] = useState<typeof QUIZ_M6_SISTEMAS_AVANCADOS>([]);
  const [quizM7, setQuizM7] = useState<typeof QUIZ_M7_VERIFICACAO>([]);
  const [quizM8, setQuizM8] = useState<typeof QUIZ_M8_PEGADINHAS>([]);
  const [quizM9, setQuizM9] = useState<typeof QUIZ_M9_PETROBRASESPECIFICO>([]);
  const [quizFinal, setQuizFinal] = useState<typeof QUIZ_M10_SIMULADO_MESTRE>(
    [],
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

  useEffect(() => {
    if (!loading) {
      setQuizM1(getRandomQuestions(QUIZ_M1_CONCEITOS, 6));
      setQuizM2(getRandomQuestions(QUIZ_M2_FRACOES, 6));
      setQuizM3(getRandomQuestions(QUIZ_M3_PROBLEMAS, 6));
      setQuizM4(getRandomQuestions(QUIZ_M4_INEQUACOES, 6));
      setQuizM5(getRandomQuestions(QUIZ_M5_FINAL, 5));
      setQuizM6(getRandomQuestions(QUIZ_M6_SISTEMAS_AVANCADOS, 6));
      setQuizM7(getRandomQuestions(QUIZ_M7_VERIFICACAO, 6));
      setQuizM8(getRandomQuestions(QUIZ_M8_PEGADINHAS, 6));
      setQuizM9(getRandomQuestions(QUIZ_M9_PETROBRASESPECIFICO, 6));
      setQuizFinal(getRandomQuestions(QUIZ_M10_SIMULADO_MESTRE, 8));
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
            titulo="Fundamentos & Princípio da Balança"
            descricao="A base: isolar a incógnita na balança invisível. Operação inversa é LEI."
            gradiente="bg-gradient-to-br from-blue-700 to-sky-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Mecânica das Equações de 1º Grau"
              description="Dominando a balança matemática: o que você faz de um lado, faz do outro."
              variant="blue"
            />

            <p className="text-muted-foreground leading-relaxed text-lg">
              Uma <strong>equação do 1º grau</strong> é uma igualdade que contém
              apenas uma letra (incógnita) com expoente invisível igual a 1. O
              sinal <strong className="text-xl px-1">=</strong> é o pino central
              de uma balança de laboratório: qualquer coisa que você faz de um
              lado, <strong>DEVE fazer exatamente igual do outro lado</strong>.
            </p>

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação: O Princípio da Balança",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Para a balança não pender (não quebrar a igualdade),
                        qualquer operação executada de um lado{" "}
                        <strong>
                          TEM QUE ser exatamente igual do outro lado
                        </strong>
                        . Usamos o atalho mental: "passa pro outro lado
                        invertendo a operação".
                      </p>
                      <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
                        <p className="text-sm font-bold text-blue-700 mb-3">
                          Operações Inversas (A Base):
                        </p>
                        <ul className="space-y-2 text-sm">
                          <li>
                            <strong>+ inverte para -</strong> (e vice-versa)
                          </li>
                          <li>
                            <strong>× inverte para ÷</strong> (e vice-versa)
                          </li>
                          <li>
                            <strong>Expoente inverte para raiz</strong>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação: Passo a Passo",
                  icone: <LuPlay />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="bg-blue-500/10 p-5 rounded-xl border border-blue-500/20 font-mono text-sm space-y-3">
                        <p className="font-black text-blue-700 text-base">
                          Exemplo 1: 2x - 8 = 10
                        </p>
                        <p>1º: 2x = 10 + 8 (o -8 vira +8)</p>
                        <p>2º: 2x = 18</p>
                        <p>3º: x = 18 ÷ 2 (o ×2 vira ÷2)</p>
                        <p className="text-lg font-bold text-blue-700">
                          x = 9 ✓
                        </p>
                      </div>
                      <div className="bg-emerald-500/10 p-5 rounded-xl border border-emerald-500/20 font-mono text-sm space-y-3">
                        <p className="font-black text-emerald-700 text-base">
                          Exemplo 2: 5x + 3 = 28
                        </p>
                        <p>1º: 5x = 28 - 3 (o +3 vira -3)</p>
                        <p>2º: 5x = 25</p>
                        <p>3º: x = 25 ÷ 5</p>
                        <p className="text-lg font-bold text-emerald-700">
                          x = 5 ✓
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas: Gatilhos Mentais",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-3 text-sm">
                      <div className="bg-amber-500/10 p-3 rounded-lg border-l-4 border-amber-500">
                        <p className="font-bold text-amber-700">
                          💡 "Isolamento 3 Passos"
                        </p>
                        <p className="text-muted-foreground">
                          1. Números para um lado. 2. Letras para o outro. 3.
                          Simplifique.
                        </p>
                      </div>
                      <div className="bg-cyan-500/10 p-3 rounded-lg border-l-4 border-cyan-500">
                        <p className="font-bold text-cyan-700">
                          🎯 "Mecanismo da Balança"
                        </p>
                        <p className="text-muted-foreground">
                          Leia: "O que você faz de cá, faz de lá". Se sumir de
                          um lado, aparece do outro com operação inversa.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções: Pegadinhas da CESGRANRIO",
                  icone: <LuTriangleAlert />,
                  conteudo: (
                    <AlertBox
                      tipo="danger"
                      titulo="O Veneno: Número Negativo na Frente"
                    >
                      <p className="text-sm mb-3">
                        Se vir <code>-3x = 15</code>, o {"-3"} está{" "}
                        <strong>multiplicando</strong>. Ele passa para o outro
                        lado <strong>DIVIDINDO</strong>, junto com o sinal
                        negativo:
                      </p>
                      <p className="text-sm font-mono font-bold">
                        x = 15 ÷ (-3) = -5 ✓
                      </p>
                      <p className="text-sm mt-3">
                        ERRADO pensar: "Inverte o sinal". A operação que
                        inverte, não o sinal!
                      </p>
                    </AlertBox>
                  ),
                },
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FlipCard
                frente={
                  <div className="flex flex-col items-center gap-2">
                    <LuZap className="w-6 h-6 text-blue-500" />
                    <p className="font-bold">Mnemônico Rápido</p>
                    <p className="text-sm text-muted-foreground">
                      Qual é o oposto de +5?
                    </p>
                  </div>
                }
                verso={
                  <div className="flex flex-col items-center gap-3">
                    <LuCircleCheck className="w-6 h-6 text-emerald-500" />
                    <p className="font-bold">-5 (e vice-versa)</p>
                    <p className="text-xs text-muted-foreground text-center">
                      Soma inverte para subtração
                    </p>
                  </div>
                }
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center gap-2">
                    <LuZap className="w-6 h-6 text-blue-500" />
                    <p className="font-bold">Dúvida Comum</p>
                    <p className="text-sm text-muted-foreground">
                      Inverte o sinal ou a operação?
                    </p>
                  </div>
                }
                verso={
                  <div className="flex flex-col items-center gap-3">
                    <LuCircleCheck className="w-6 h-6 text-emerald-500" />
                    <p className="font-bold">A OPERAÇÃO!</p>
                    <p className="text-xs text-muted-foreground text-center">
                      O sinal vai junto. -3x passa÷3 com o sinal.
                    </p>
                  </div>
                }
              />
            </div>
          </section>

          <QuizInterativo
            questoes={quizM1}
            titulo="Fixação - Módulo 1"
            numero={1}
            variant="blue"
            icone="🧠"
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          />

          <div className="space-y-8 bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm">
            <h3 className="text-2xl font-bold">Resumo Visual</h3>
            <ModuleSummaryCarouselNew
              images={[
                {
                  title: "Operações Inversas - Mapa Mental",
                  type: "Diagrama",
                  placeholderColor: "bg-blue-100 dark:bg-blue-900/30",
                  imageUrl: "/temp-img.png", // PROMPT: Mapa mental em estilo dark premium mostrando as 4 operações básicas (+, -, ×, ÷) com setas bidirecionais indicando inversão. Centro: "Operação Inversa". Cores Petrobras (azul/verde/ciano). Estilo técnico industrial.
                },
              ]}
              moduloNome="Módulo 1"
              tituloAula="Equações de 1º Grau"
              materia="Matemática"
            />
          </div>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 2 ═══ */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={2}
            titulo="Tradução de Problemas: Português → Matemática"
            descricao="A habilidade que separa os 70% dos 90%: ler e converter em equação."
            gradiente="bg-gradient-to-br from-emerald-600 to-teal-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="O Dicionário Operacional"
              description="Como a CESGRANRIO pensa em português e a gente converte para x."
              variant="emerald"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação: Palavras Chave",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Cada frase em português tem um equivalente matemático. A
                        banca usa{" "}
                        <strong>SEMPRE as mesmas palavras-chave</strong>.
                        Decorar essa tabela é 80% do trabalho.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-emerald-500/10 p-3 rounded border border-emerald-500/20 text-sm">
                          <p className="font-bold text-emerald-700 mb-2">
                            QUANTIDADES
                          </p>
                          <ul className="space-y-1">
                            <li>
                              Um número = <code>x</code>
                            </li>
                            <li>
                              O dobro = <code>2x</code>
                            </li>
                            <li>
                              A metade = <code>x/2</code>
                            </li>
                            <li>
                              O triplo = <code>3x</code>
                            </li>
                            <li>
                              A terça parte = <code>x/3</code>
                            </li>
                            <li>
                              O sucessor = <code>x + 1</code>
                            </li>
                            <li>
                              O antecessor = <code>x - 1</code>
                            </li>
                          </ul>
                        </div>
                        <div className="bg-teal-500/10 p-3 rounded border border-teal-500/20 text-sm">
                          <p className="font-bold text-teal-700 mb-2">
                            OPERAÇÕES
                          </p>
                          <ul className="space-y-1">
                            <li>
                              A soma = <code>+</code>
                            </li>
                            <li>
                              A diferença = <code>-</code>
                            </li>
                            <li>
                              O produto = <code>×</code>
                            </li>
                            <li>
                              O quociente = <code>÷</code>
                            </li>
                            <li>
                              Aumentou = <code>+</code>
                            </li>
                            <li>
                              Diminuiu = <code>-</code>
                            </li>
                            <li>
                              Totalizou = <code>="</code>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação: Do Problema à Equação",
                  icone: <LuPlay />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                        <p className="font-bold text-emerald-700 mb-3">
                          Problema 1: (CESGRANRIO 2018 - Técnico)
                        </p>
                        <p className="text-sm mb-3">
                          "Um operador recebe um bônus de R$ 500 e seu salário
                          fica 30% maior. Qual era o salário antes do aumento?"
                        </p>
                        <p className="text-xs bg-emerald-500/20 p-2 rounded font-mono">
                          S + 500 = S × 1,30 → S × 0,30 = 500 → S = 1.667
                        </p>
                      </div>
                      <div className="bg-teal-500/10 p-4 rounded-xl border border-teal-500/20">
                        <p className="font-bold text-teal-700 mb-3">
                          Problema 2: (Petrobras - Sistema 2x2)
                        </p>
                        <p className="text-sm mb-3">
                          "Dois técnicos têm juntos 12 anos de experiência. Um
                          tem 4 anos a mais que o outro. Quanto cada um tem?"
                        </p>
                        <p className="text-xs bg-teal-500/20 p-2 rounded font-mono">
                          t₁ + t₂ = 12 e t₁ = t₂ + 4 → t₂ = 4 anos, t₁ = 8 anos
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas: Protocolo de Batalha",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-3">
                      <ol className="space-y-2 text-sm list-decimal list-inside">
                        <li>
                          <strong>Leia DUAS VEZES</strong> respirando fundo.
                        </li>
                        <li>
                          <strong>Declare quem é X</strong>: "Seja x o
                          salário..."
                        </li>
                        <li>
                          <strong>
                            Ache o verbo "É" / "Ficou" / "Resulta"
                          </strong>
                          : Ali fica o "=".
                        </li>
                        <li>
                          <strong>Escreva a equação lendo pedacinho</strong> por
                          pedacinho.
                        </li>
                        <li>
                          <strong>Resolvaa equação</strong> com cuidado.
                        </li>
                        <li>
                          <strong>Releia o enunciado</strong> para garantir que
                          respondeu o certo.
                        </li>
                      </ol>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções: Ciladas do Português",
                  icone: <LuTriangleAlert />,
                  conteudo: (
                    <AlertBox
                      tipo="danger"
                      titulo="Pegadinha: Percentual vs Aumento Nominal"
                    >
                      <p className="text-sm mb-2">
                        <strong>ERRADO:</strong> "Salário aumentou R$ 500, que é
                        30% maior" = S + 500 = S + 0,30S ❌
                      </p>
                      <p className="text-sm mb-2">
                        <strong>CERTO:</strong> "Salário fica 30% maior" = S ×
                        1,30 ✓
                      </p>
                      <p className="text-sm">
                        Aumentar 30% = multiplicar por 1,30, não somar 30% do
                        valor.
                      </p>
                    </AlertBox>
                  ),
                },
              ]}
            />

            <CardCarousel
              titulo="Problemas Reais (Contexto Petrobras)"
              cards={[
                {
                  titulo: "Caso 1: Distribuição de Horas",
                  descricao: (
                    <div className="space-y-2 text-sm">
                      <p>
                        Um técnico da RNEST trabalhou x horas em manutenção e
                        (x+8) horas em inspeção. Total: 40h.
                      </p>
                      <p className="font-mono text-xs">
                        x + (x+8) = 40 → x = 16h
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Caso 2: Custo de Operação",
                  descricao: (
                    <div className="space-y-2 text-sm">
                      <p>
                        Combustível custa R$ 50/barril. Se gastar R$ 5.000 em um
                        mês, quantos barris foram consumidos?
                      </p>
                      <p className="font-mono text-xs">50x = 5000 → x = 100</p>
                    </div>
                  ),
                },
                {
                  titulo: "Caso 3: Meta de Produção",
                  descricao: (
                    <div className="space-y-2 text-sm">
                      <p>
                        Plataforma A produz 2x barris/dia. Plataforma B produz
                        1.5x. Juntas: 3.500 barris. Quanto cada uma?
                      </p>
                      <p className="font-mono text-xs">
                        2x + 1.5x = 3.500 → x = 1.000 (A=2.000, B=1.500)
                      </p>
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
            titulo="Equações com Frações: O Aniquilador de Denominador"
            descricao="Como destruir frações em um único golpe: MMC. Nunca mais sofrer com ÷."
            gradiente="bg-gradient-to-br from-amber-600 to-orange-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Limpando Frações Rápidamente"
              description="Frações atraem erros. Seu objetivo: eliminá-las no PRIMEIRO passo."
              variant="amber"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação: O Estratagema do MMC",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Quando uma equação tem denominadores, o truque é
                        encontrar o <strong>Mínimo Múltiplo Comum</strong> de
                        todos os números de baixo e{" "}
                        <strong>multiplicar TODA a equação por esse MMC</strong>
                        . Pronto: as frações desaparecem como mágica.
                      </p>
                      <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20">
                        <p className="font-bold text-amber-700 mb-2">
                          Por que funciona?
                        </p>
                        <p className="text-sm">
                          Se multiplicamos por MMC, cada fração tem seu
                          denominador anulado. Ex: (x/2) × 6 = 3x (porque
                          6÷2=3).
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação: Passo a Passo",
                  icone: <LuPlay />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 font-mono text-sm space-y-2">
                        <p className="font-black text-amber-700">
                          Exemplo 1: (x/2) + (x/3) = 5
                        </p>
                        <p>📌 MMC(2,3) = 6</p>
                        <p>📌 Multiplica TUDO por 6: 6(x/2) + 6(x/3) = 6(5)</p>
                        <p>📌 Simplifica: 3x + 2x = 30</p>
                        <p>📌 Resolve: 5x = 30 → x = 6 ✓</p>
                      </div>
                      <div className="bg-orange-500/10 p-4 rounded-xl border border-orange-500/20 font-mono text-sm space-y-2">
                        <p className="font-black text-orange-700">
                          Exemplo 2: (2x/3) - (x/4) = 5
                        </p>
                        <p>📌 MMC(3,4) = 12</p>
                        <p>📌 Multiplica: 12(2x/3) - 12(x/4) = 12(5)</p>
                        <p>📌 Simplifica: 8x - 3x = 60</p>
                        <p>📌 Resolve: 5x = 60 → x = 12 ✓</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas: O Método RÁPIDO",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-3">
                      <div className="bg-amber-500/10 p-3 rounded border-l-4 border-amber-500">
                        <p className="font-bold text-amber-700 text-sm mb-1">
                          🚀 Atalho: MMC por Vontade
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Se tiver 2, 3, 4: MMC = 12. Se tiver 5, 6: MMC = 30.
                          Multiplicar por um múltiplo comum SEMPRE funciona.
                        </p>
                      </div>
                      <div className="bg-orange-500/10 p-3 rounded border-l-4 border-orange-500">
                        <p className="font-bold text-orange-700 text-sm mb-1">
                          🎯 Passo Crítico
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Multiplique TODA equação, não só um lado. Erros
                          maiores acontecem aqui.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções: Ciladas com Multiplicação",
                  icone: <LuTriangleAlert />,
                  conteudo: (
                    <AlertBox
                      tipo="danger"
                      titulo="ATENÇÃO: Multiplicação Cruzada"
                    >
                      <p className="text-sm mb-2">
                        Se tiver <code>(x/2) = (5/3)</code>, NÃO use MMC. Use
                        multiplicação cruzada:
                      </p>
                      <p className="text-sm font-mono font-bold">
                        3x = 2 × 5 → x = 10/3 ✓
                      </p>
                      <p className="text-sm mt-2">
                        Multiplicação cruzada é MAIS RÁPIDA quando tem uma
                        fração = outra fração.
                      </p>
                    </AlertBox>
                  ),
                },
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FlipCard
                frente={
                  <div className="flex flex-col items-center gap-2">
                    <LuZap className="w-6 h-6 text-amber-500" />
                    <p className="font-bold text-center">MMC de 4 e 6?</p>
                  </div>
                }
                verso={
                  <div className="flex flex-col items-center gap-3">
                    <LuCircleCheck className="w-6 h-6 text-emerald-500" />
                    <p className="font-bold text-center">12</p>
                    <p className="text-xs text-muted-foreground">
                      Múltiplos: 4, 8, 12... 6, 12...
                    </p>
                  </div>
                }
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center gap-2">
                    <LuZap className="w-6 h-6 text-amber-500" />
                    <p className="font-bold text-center">(x/5) + 2 = 7</p>
                    <p className="text-sm text-muted-foreground">Qual é x?</p>
                  </div>
                }
                verso={
                  <div className="flex flex-col items-center gap-3">
                    <LuCircleCheck className="w-6 h-6 text-emerald-500" />
                    <p className="font-mono text-sm font-bold">x = 25</p>
                    <p className="text-xs text-muted-foreground">
                      x/5 = 5 → x = 25
                    </p>
                  </div>
                }
              />
            </div>
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
            titulo="Sistemas Lineares 2x2"
            descricao="Duas equações, duas incógnitas. Método da Adição vs Substituição."
            gradiente="bg-gradient-to-br from-cyan-600 to-sky-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={4}
              title="Dominando X e Y"
              description="Quando você tem duas balas para dois alvos."
              variant="cyan"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação: O que é um Sistema?",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Um <strong>sistema linear 2x2</strong> é um conjunto de
                        duas equações com duas incógnitas que devem ser
                        satisfeitas<strong> simultâneamente</strong>. A solução
                        é o par (x, y) que torna AMBAS equações verdadeiras.
                      </p>
                      <div className="bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20">
                        <p className="font-bold text-cyan-700 mb-2">Exemplo:</p>
                        <p className="font-mono text-sm mb-2">
                          x + y = 10
                          <br />x - y = 4<br />
                          <span className="text-cyan-600">
                            Solução: x = 7, y = 3
                          </span>
                        </p>
                        <p className="text-xs">
                          Verificação: 7 + 3 = 10 ✓ e 7 - 3 = 4 ✓
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação: Método da Adição",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground mb-3">
                        É o método veloz. Empilhe as equações e "some", torcendo
                        para um dos valores se anular.
                      </p>
                      <div className="bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20 font-mono text-sm space-y-3">
                        <p className="font-black">2x + y = 10</p>
                        <p>3x - y = 15</p>
                        <p className="border-t border-cyan-500/50 pt-2">
                          Soma: 5x + 0 = 25
                        </p>
                        <p>
                          Resultado: x = 5, substitui em qualquer uma → y = 0
                        </p>
                        <p className="text-cyan-600 font-bold">
                          ✓ Solução: (5, 0)
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação: Método da Substituição",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground mb-3">
                        Útil quando uma letra está isolada. Ex: "J = M + 5".
                      </p>
                      <div className="bg-sky-500/10 p-4 rounded-xl border border-sky-500/20 space-y-2 text-sm">
                        <p className="font-bold">Sistema:</p>
                        <p className="font-mono">
                          y = 2x
                          <br />x + y = 9
                        </p>
                        <p className="font-bold mt-2">Passo a Passo:</p>
                        <p>1. Vê que y = 2x já está isolado.</p>
                        <p>2. Substitui na segunda: x + 2x = 9</p>
                        <p>3. Resolve: 3x = 9 → x = 3</p>
                        <p>4. Volta: y = 2(3) = 6</p>
                        <p className="font-bold text-sky-600 mt-2">
                          ✓ Solução: (3, 6)
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas: Escolha o Método Certo",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-3">
                      <div className="bg-cyan-500/10 p-3 rounded border-l-4 border-cyan-500">
                        <p className="font-bold text-cyan-700 text-sm">
                          ⚡ Adição: Quando há simetria
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Se vir +y e -y, some direto. Rápido!
                        </p>
                      </div>
                      <div className="bg-sky-500/10 p-3 rounded border-l-4 border-sky-500">
                        <p className="font-bold text-sky-700 text-sm">
                          🔄 Substituição: Quando há isolamento
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Se já vê x = ... ou y = ..., use substituição.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções: Sistemas Especiais",
                  icone: <LuTriangleAlert />,
                  conteudo: (
                    <AlertBox tipo="info" titulo="Casos Especiais">
                      <p className="text-sm mb-2">
                        <strong>1. Sistema Impossível:</strong> 2x + y = 5 e 2x
                        + y = 8 (Não há solução, retas paralelas)
                      </p>
                      <p className="text-sm mb-2">
                        <strong>2. Sistema Indeterminado:</strong> 2x + y = 6 e
                        4x + 2y = 12 (Infinitas soluções, retas coincidentes)
                      </p>
                      <p className="text-sm">
                        <strong>3. Sistema Normal:</strong> Uma única solução
                        (retas se cruzam em um ponto)
                      </p>
                    </AlertBox>
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
            titulo="Simulado Parcial"
            descricao="Reúna tudo dos Módulos 1-4. Você está no caminho certo?"
            gradiente="bg-gradient-to-br from-indigo-700 to-purple-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={5}
              title="Checkpoint: Revisão Progressiva"
              description="Teste seus conhecimentos antes de avançar para inequações e sistemas avançados."
              variant="indigo"
            />

            <AlertBox tipo="info" titulo="O que esperar">
              <p className="text-sm">
                Este simulado combina problemas dos 4 primeiros módulos. Mínimo
                de 70% para avançar. Tempo estimado: 20 minutos.
              </p>
            </AlertBox>
          </section>

          <QuizInterativo
            questoes={quizM5}
            titulo="Simulado Parcial - M1 até M4"
            numero={5}
            variant="indigo"
            icone="📋"
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
          />
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 6 ═══ */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={6}
            titulo="Inequações de 1º Grau"
            descricao={
              "Equações ao contrário: > e <. Regra do Sinal INVERTE ao dividir por negativo."
            }
            gradiente="bg-gradient-to-br from-rose-600 to-pink-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={6}
              title="Desigualdades e Soluções em Intervalo"
              description={
                "Quando a igualdade (=) vira desigualdade (>, <, ≥, ≤)."
              }
              variant="rose"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação: O que é uma Inequação?",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Uma <strong>inequação</strong> é como uma equação, mas
                        com um sinal de desigualdade ({">"}, {"<"}, ≥, ≤) ao
                        invés de igualdade. A solução é um{" "}
                        <strong>intervalo</strong> de valores, não um único
                        valor.
                      </p>
                      <div className="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20">
                        <p className="font-mono text-sm mb-2">
                          <strong>Exemplo:</strong> 3x - 5 {">"} 7
                        </p>
                        <p className="text-sm">
                          Resolve como equação: 3x {">"} 12 → x {">"} 4
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Solução: todos os números maiores que 4.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação: Divisão por Negativo",
                  icone: <LuPlay />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20 font-mono text-sm space-y-2">
                        <p className="font-black">Exemplo 1: -2x {"<"} 8</p>
                        <p>
                          {"→"} x {">"} -4
                        </p>
                        <p className="text-rose-600 text-xs">
                          ⚠️ Divide por -2, INVERTE o sinal de {"<"} para {">"}
                        </p>
                      </div>
                      <div className="bg-pink-500/10 p-4 rounded-xl border border-pink-500/20 font-mono text-sm space-y-2">
                        <p className="font-black">Exemplo 2: 5x ≥ 20</p>
                        <p>{"→"} x ≥ 4</p>
                        <p className="text-pink-600 text-xs">
                          ✓ Divide por 5 (positivo), mantém ≥
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas: A Regra CRUCIAL",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-3">
                      <AlertBox tipo="danger" titulo="REGRA DE OURO">
                        <p className="text-sm font-bold">
                          Ao dividir (ou multiplicar) por um NÚMERO NEGATIVO, o
                          sinal de desigualdade INVERTE!
                        </p>
                      </AlertBox>
                      <div className="bg-rose-500/10 p-3 rounded border-l-4 border-rose-500 text-sm">
                        <p className="font-bold text-rose-700">
                          {">"} inverte para {"<"}
                        </p>
                        <p className="font-bold text-rose-700">
                          ≥ inverte para ≤
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções: Sistemas de Inequações",
                  icone: <LuTriangleAlert />,
                  conteudo: (
                    <div className="space-y-3 text-sm">
                      <p className="font-bold">
                        Quando há E: interseção dos intervalos
                      </p>
                      <div className="bg-rose-500/10 p-2 rounded font-mono text-xs">
                        x {`>`} 2 E x {`<`} 7 → 2 {`<`} x {`<`} 7
                      </div>
                      <p className="font-bold mt-3">
                        Quando há OU: união dos intervalos
                      </p>
                      <div className="bg-pink-500/10 p-2 rounded font-mono text-xs">
                        x {"<"} 0 OU x {">"} 5 → x ∈ (-∞, 0) ∪ (5, +∞)
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FlipCard
                frente={
                  <div className="flex flex-col items-center gap-2">
                    <LuZap className="w-6 h-6 text-rose-500" />
                    <p className="font-bold text-center">-3x ≤ 12, qual é x?</p>
                  </div>
                }
                verso={
                  <div className="flex flex-col items-center gap-3">
                    <LuCircleCheck className="w-6 h-6 text-emerald-500" />
                    <p className="font-mono font-bold">x ≥ -4</p>
                    <p className="text-xs text-muted-foreground">
                      Dividir por -3 inverte ≤ para ≥
                    </p>
                  </div>
                }
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center gap-2">
                    <LuZap className="w-6 h-6 text-rose-500" />
                    <p className="font-bold text-center">
                      (2x + 1) {">"} 9, qual é x?
                    </p>
                  </div>
                }
                verso={
                  <div className="flex flex-col items-center gap-3">
                    <LuCircleCheck className="w-6 h-6 text-emerald-500" />
                    <p className="font-mono font-bold">x {">"} 4</p>
                    <p className="text-xs text-muted-foreground">
                      2x {">"} 8 → divide por 2 (positivo)
                    </p>
                  </div>
                }
              />
            </div>
          </section>

          <QuizInterativo
            questoes={quizM6}
            titulo="Fixação - Módulo 6"
            numero={6}
            variant="rose"
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
            titulo="Sistemas Lineares Avançados (3x3)"
            descricao="Três equações, três incógnitas. Eliminação de Gauss (simplificado)."
            gradiente="bg-gradient-to-br from-violet-600 to-indigo-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={7}
              title="Da Dimensão 2x2 para 3x3"
              description="Mesma estratégia: isolar incógnitas progressivamente."
              variant="violet"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação: Sistema 3x3",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Um sistema 3x3 tem 3 equações com 3 incógnitas (x, y,
                        z). Usa-se <strong>eliminação progressiva</strong>: das
                        3 equações originais, passa para 2, depois para 1.
                      </p>
                      <div className="bg-violet-500/10 p-4 rounded-xl border border-violet-500/20">
                        <p className="font-bold text-violet-700 mb-2">
                          Exemplo Simples:
                        </p>
                        <div className="font-mono text-xs space-y-1">
                          <p>x + y + z = 6</p>
                          <p>x - y + z = 4</p>
                          <p>2x + y - z = 5</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação: Passo a Passo",
                  icone: <LuPlay />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xs text-muted-foreground mb-3">
                        Estratégia: Use a 1ª equação para eliminar x das outras
                        duas.
                      </p>
                      <div className="bg-violet-500/10 p-4 rounded-xl border border-violet-500/20 font-mono text-xs space-y-2">
                        <p className="font-bold">
                          1º: Das 3 equações, faça 2 com um menos:
                        </p>
                        <p>Eq2 - Eq1: (x-y+z) - (x+y+z) = 4-6</p>
                        <p>Resultado: -2y = -2 → y = 1</p>
                        <p className="mt-2 font-bold">
                          2º: Agora substitua y em outra:
                        </p>
                        <p>x + 1 + z = 6 → x + z = 5</p>
                        <p className="mt-2 font-bold">
                          3º: Continue a simplificar...
                        </p>
                        <p className="text-violet-600">
                          Resultado final: x=2, y=1, z=3
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas: Estratégia de Batalha",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-3 text-sm">
                      <div className="bg-violet-500/10 p-3 rounded border-l-4 border-violet-500">
                        <p className="font-bold text-violet-700">
                          1️⃣ Escolha uma incógnita para eliminar
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Geralmente a que tem coeficiente 1 ou simétrico.
                        </p>
                      </div>
                      <div className="bg-indigo-500/10 p-3 rounded border-l-4 border-indigo-500">
                        <p className="font-bold text-indigo-700">
                          2️⃣ Use as 3 equações para fazer 2
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Subtraia ou some combinações para eliminar.
                        </p>
                      </div>
                      <div className="bg-violet-500/10 p-3 rounded border-l-4 border-violet-500">
                        <p className="font-bold text-violet-700">
                          3️⃣ Repita com as 2 equações (torna-se 2x2)
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Agora é um sistema 2x2. Use adição ou substituição.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções: Sistemas Impossíveis ou Indeterminados",
                  icone: <LuTriangleAlert />,
                  conteudo: (
                    <AlertBox tipo="info" titulo="Análise de Soluções">
                      <p className="text-sm mb-2">
                        <strong>Uma solução:</strong> Sistema normal, planos se
                        cruzam em um ponto.
                      </p>
                      <p className="text-sm mb-2">
                        <strong>Infinitas soluções:</strong> 0 = 0 (identidade),
                        planos são coincidentes.
                      </p>
                      <p className="text-sm">
                        <strong>Nenhuma solução:</strong> 0 = 5 (absurdo),
                        planos são paralelos.
                      </p>
                    </AlertBox>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM7}
            titulo="Fixação - Módulo 7"
            numero={7}
            variant="violet"
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
            titulo="Resolução Reversa e Verificação"
            descricao="Trabalhe de trás para frente: dado o resultado, é a solução certa?"
            gradiente="bg-gradient-to-br from-teal-600 to-cyan-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={8}
              title="Técnica de Prova: Substituição na Equação Original"
              description="A verificação não é luxo, é necessidade na CESGRANRIO."
              variant="cyan"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação: Por que Verificar?",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        <strong>Erros de cálculo acontecem</strong>. A
                        verificação leva 30 segundos e garante que sua resposta
                        está correta. Na CESGRANRIO, não há "meio certo": ou
                        acerta ou erra.
                      </p>
                      <AlertBox tipo="info" titulo="Estatística Real">
                        <p className="text-sm">
                          Estudantes que verificam aumentam sua taxa de acertos
                          em até 15%.
                        </p>
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação: O Teste Prático",
                  icone: <LuPlay />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="bg-teal-500/10 p-4 rounded-xl border border-teal-500/20">
                        <p className="font-bold text-teal-700 mb-3">
                          Problema Resolvido: 2x + 3 = 11
                        </p>
                        <p className="text-sm mb-3">
                          Solução encontrada: x = 4
                        </p>
                        <p className="font-bold text-teal-700 mb-2">
                          Verificação:
                        </p>
                        <p className="font-mono text-sm">
                          2(4) + 3 = 8 + 3 = 11 ✓
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Ambos lados da equação são iguais. x = 4 está CORRETO.
                        </p>
                      </div>

                      <div className="bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20">
                        <p className="font-bold text-cyan-700 mb-3">
                          Contra-exemplo: Erro Detectado
                        </p>
                        <p className="text-sm mb-3">
                          Solução (errada) encontrada: x = 5
                        </p>
                        <p className="font-bold text-cyan-700 mb-2">
                          Verificação:
                        </p>
                        <p className="font-mono text-sm">
                          2(5) + 3 = 10 + 3 = 13 ≠ 11 ✗
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Lado esquerdo ≠ lado direito. Há erro. Refaça!
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas: Verificação Rápida",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-3 text-sm">
                      <div className="bg-teal-500/10 p-3 rounded border-l-4 border-teal-500">
                        <p className="font-bold text-teal-700">
                          1️⃣ Substitua direto no original
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Não use equações intermediárias, volta ao texto.
                        </p>
                      </div>
                      <div className="bg-cyan-500/10 p-3 rounded border-l-4 border-cyan-500">
                        <p className="font-bold text-cyan-700">
                          2️⃣ Calcule ambos os lados separadamente
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Lado esquerdo = ? Lado direito = ? Iguais?
                        </p>
                      </div>
                      <div className="bg-teal-500/10 p-3 rounded border-l-4 border-teal-500">
                        <p className="font-bold text-teal-700">
                          3️⃣ Verifique antes de marcar
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Se sobrar tempo: SEMPRE verifica.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções: Soluções Estranhas",
                  icone: <LuTriangleAlert />,
                  conteudo: (
                    <AlertBox tipo="warning" titulo="Atenção com Domínio">
                      <p className="text-sm mb-2">
                        Se a equação tiver{" "}
                        <strong>raízes ou denominadores</strong>, a solução pode
                        ser inválida:
                      </p>
                      <p className="text-xs mb-2 font-mono">
                        {"√(x-2)"} precisa x ≥ 2
                      </p>
                      <p className="text-sm">
                        Se x = 1 resolver a equação, mas x = 1 {"<"} 2, então x
                        = 1 é <strong>solução estranha</strong> (deve ser
                        descartada).
                      </p>
                    </AlertBox>
                  ),
                },
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FlipCard
                frente={
                  <div className="flex flex-col items-center gap-2">
                    <LuShield className="w-6 h-6 text-cyan-500" />
                    <p className="font-bold text-center">
                      Se x = 3, é solução de 4x - 5 = 7?
                    </p>
                  </div>
                }
                verso={
                  <div className="flex flex-col items-center gap-3">
                    <LuCircleX className="w-6 h-6 text-rose-500" />
                    <p className="font-bold">Não ✗</p>
                    <p className="text-xs text-muted-foreground">
                      4(3) - 5 = 7 → 12 - 5 = 7 ✓ (sim!)
                    </p>
                  </div>
                }
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center gap-2">
                    <LuShield className="w-6 h-6 text-cyan-500" />
                    <p className="font-bold text-center">
                      Se x = -2, é solução de 3x + 6 = 0?
                    </p>
                  </div>
                }
                verso={
                  <div className="flex flex-col items-center gap-3">
                    <LuCircleCheck className="w-6 h-6 text-emerald-500" />
                    <p className="font-bold">Sim ✓</p>
                    <p className="text-xs text-muted-foreground">
                      3(-2) + 6 = -6 + 6 = 0 ✓
                    </p>
                  </div>
                }
              />
            </div>
          </section>

          <QuizInterativo
            questoes={quizM8}
            titulo="Fixação - Módulo 8"
            numero={8}
            variant="cyan"
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
            titulo="Aplicações Petrobras & Contextos Reais"
            descricao="Onde as equações vivem: RNEST, RPBC, caldeiras, licitações, folha de pagamento."
            gradiente="bg-gradient-to-br from-orange-600 to-red-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={9}
              title="Problemas Contextualizados Petrobras"
              description="A CESGRANRIO adora disfarçar equações em situações reais da empresa."
              variant="amber"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação: Problemas Contextualizados",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        A Petrobras não pergunta "Resolva 3x + 5 = 20". Ela diz
                        <strong>
                          {" "}
                          "Uma plataforma produz x barris. Outra produz o dobro.
                          Juntas fazem 9.000. Quantos cada uma faz?"
                        </strong>
                        . O contexto esconde a equação.
                      </p>
                      <AlertBox tipo="info" titulo="Realidade Cesgranrio">
                        <p className="text-sm">
                          80% das questões de equações NO CONCURSO REAL vêm
                          assim: disfarçadas em situações do dia a dia da
                          empresa.
                        </p>
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação: Casos Reais",
                  icone: <LuPlay />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="bg-orange-500/10 p-4 rounded-xl border border-orange-500/20">
                        <p className="font-bold text-orange-700 mb-2">
                          Caso 1: Horas de Trabalho (RNEST - Recife)
                        </p>
                        <p className="text-sm mb-2">
                          Um técnico trabalhou x horas em manutenção (R$ 50/h) e
                          (x+4) horas em inspeção (R$ 60/h). Ganhou R$ 700 no
                          total. Quantas horas de manutenção?
                        </p>
                        <p className="font-mono text-xs">
                          50x + 60(x+4) = 700 → 50x + 60x + 240 = 700 → 110x =
                          460 → x ≈ 4,18h
                        </p>
                      </div>

                      <div className="bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                        <p className="font-bold text-red-700 mb-2">
                          Caso 2: Produção de Barrís (RPBC - Paulínia)
                        </p>
                        <p className="text-sm mb-2">
                          Plataforma A produz 2.500 b/dia. Plataforma B produz
                          1.5x essa quantidade. Juntas devem produzir 18.000
                          barris. Qual deve ser o fator multiplicador x?
                        </p>
                        <p className="font-mono text-xs">
                          2500x + 1.5(2500x) = 18000 → 4000x = 18000 → x = 4,5
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas: Interpretação do Contexto",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-3 text-sm">
                      <div className="bg-orange-500/10 p-3 rounded border-l-4 border-orange-500">
                        <p className="font-bold text-orange-700">
                          1️⃣ Destaque as VARIÁVEIS
                        </p>
                        <p className="text-xs text-muted-foreground">
                          "x horas", "y barris", "z salários". Sublinha tudo.
                        </p>
                      </div>
                      <div className="bg-red-500/10 p-3 rounded border-l-4 border-red-500">
                        <p className="font-bold text-red-700">
                          2️⃣ Encontre as RELACIONS
                        </p>
                        <p className="text-xs text-muted-foreground">
                          "o dobro", "3 vezes menor", "somando todos".
                        </p>
                      </div>
                      <div className="bg-orange-500/10 p-3 rounded border-l-4 border-orange-500">
                        <p className="font-bold text-orange-700">
                          3️⃣ Procure o RESULTADO FINAL
                        </p>
                        <p className="text-xs text-muted-foreground">
                          "Ficou em", "Totalizou", "Somam". Ali fica o "=".
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções: Unidades e Escalas",
                  icone: <LuTriangleAlert />,
                  conteudo: (
                    <AlertBox tipo="warning" titulo="Atenção com Unidades">
                      <p className="text-sm mb-2">
                        <strong>Horas e minutos:</strong> Converta para mesma
                        unidade. 1h30min = 1,5h ou 90 minutos.
                      </p>
                      <p className="text-sm mb-2">
                        <strong>Escalas de produção:</strong> 1.000 barris =
                        1000, não 1k (a menos que o enunciado defina).
                      </p>
                      <p className="text-sm">
                        <strong>Taxas:</strong> R$ 50/h é diferente de R$ 50
                        total. Cuidado!
                      </p>
                    </AlertBox>
                  ),
                },
              ]}
            />

            <CardCarousel
              titulo="Casos Petrobras Clássicos"
              cards={[
                {
                  titulo: "Distribuição Proporcional",
                  descricao: (
                    <div className="space-y-2 text-sm">
                      <p>
                        Orçamento de R$ 50.000 dividido entre 3 unidades em
                        proporção 1:2:2. Quanto cada uma recebe?
                      </p>
                      <p className="font-mono text-xs">
                        1x + 2x + 2x = 50000 → x = 12500
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Análise de Folha de Pagamento",
                  descricao: (
                    <div className="space-y-2 text-sm">
                      <p>
                        Técnico ganha S. Com desconto INSS de 10%, fica com R$
                        3.600. Qual era o salário bruto?
                      </p>
                      <p className="font-mono text-xs">
                        0.90S = 3600 → S = 4000
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Licitação com Descontos",
                  descricao: (
                    <div className="space-y-2 text-sm">
                      <p>
                        Fornecedor A oferece 15% de desconto. Fornecedor B
                        oferece R$ 10.000 a menos. Se igual, qual o preço
                        original?
                      </p>
                      <p className="font-mono text-xs">
                        0.85P = P - 10000 → 0.15P = 10000 → P = 66666,67
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
            icone="🎯"
            onComplete={(score) => handleModuleComplete("modulo-9", score)}
          />
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 10 ═══ */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={10}
            titulo="Simulado Mestre — Elite Masterclass"
            descricao="Reúna TUDO: balança, sistemas, inequações, contextos. 90+ = domínio total."
            gradiente="bg-gradient-to-br from-slate-800 to-slate-900"
          />

          {showCompletionBadge ? (
            <div className="flex flex-col items-center gap-6 py-10 mt-10">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center animate-bounce">
                <LuTrophy className="w-12 h-12 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black">Mestre das Equações!</h3>
              <p className="text-center text-muted-foreground max-w-sm">
                Você dominou equações de 1º grau: balança, frações, sistemas,
                inequações, contextos Petrobras. Está pronto para Equações de 2º
                Grau, Funções e além.
              </p>
              <div className="flex gap-2 text-sm text-muted-foreground">
                <LuGraduationCap className="w-4 h-4" />
                <span>Próximo: Equações de 2º Grau</span>
              </div>
            </div>
          ) : (
            <section id="quiz-modulo-10" className="mt-8">
              <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-8">
                <ModuleSectionHeader
                  index={10}
                  title="Avaliação Final Compreensiva"
                  description="Este simulado cobre TODOS os tópicos: M1 até M9. Mínimo 75% para aprovação."
                  variant="slate"
                />

                <AlertBox tipo="warning" titulo="Instruções Importantes">
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>
                      Tempo estimado: 45 minutos para 8 questões diversas.
                    </li>
                    <li>Você pode revisar cada resposta antes de enviar.</li>
                    <li>Ao atingir 75%+, você completa a aula. Parabéns!</li>
                    <li>
                      Abaixo de 75%: estude os módulos anteriores novamente.
                    </li>
                  </ul>
                </AlertBox>
              </section>

              <QuizInterativo
                questoes={quizFinal}
                titulo="Simulado Elite - Equações de 1º Grau"
                icone="🏆"
                numero={10}
                variant="slate"
                onComplete={(score) => handleModuleComplete("modulo-10", score)}
              />
            </section>
          )}

          <div className="space-y-8 bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm">
            <h3 className="text-2xl font-bold">Resumo Executivo</h3>
            <div className="space-y-4">
              <div className="bg-slate-500/10 p-6 rounded-2xl border border-slate-500/20">
                <h4 className="font-bold mb-3">Os 10 Pilares Dominados</h4>
                <ol className="space-y-2 text-sm list-decimal list-inside">
                  <li>
                    <strong>Princípio da Balança:</strong> Operação inversa é
                    LEI.
                  </li>
                  <li>
                    <strong>Tradução Português-Matemática:</strong> Dicionário
                    de palavras-chave memorizado.
                  </li>
                  <li>
                    <strong>Frações:</strong> MMC elimina tudo em um golpe.
                  </li>
                  <li>
                    <strong>Sistemas 2x2:</strong> Adição e substituição
                    dominadas.
                  </li>
                  <li>
                    <strong>Checkpoint Parcial:</strong> Você já domina 50%
                    completo.
                  </li>
                  <li>
                    <strong>Inequações:</strong> Sinal inverte ao dividir por
                    negativo.
                  </li>
                  <li>
                    <strong>Sistemas 3x3:</strong> Eliminação progressiva
                    dominada.
                  </li>
                  <li>
                    <strong>Verificação:</strong> Substitua na original para
                    garantir.
                  </li>
                  <li>
                    <strong>Contextos Petrobras:</strong> Problema textual vira
                    equação.
                  </li>
                  <li>
                    <strong>Síntese Final:</strong> Você é MESTRE em equações de
                    1º grau!
                  </li>
                </ol>
              </div>

              <ModuleSummaryCarouselNew
                images={[
                  {
                    title: "Mapa Completo de Equações 1º Grau",
                    type: "Infográfico",
                    placeholderColor: "bg-slate-100 dark:bg-slate-900/30",
                    imageUrl: "/temp-img.png", // PROMPT: Infográfico estilo dark premium mostrando os 10 módulos em sequência progressiva. Centro: "Equações de 1º Grau". Ramos periféricos para cada módulo com ícones temáticos (balança, sistema, inequação, etc). Cores Petrobras (azul/verde/ciano). Estilo técnico industrial.
                  },
                ]}
                moduloNome="Módulo 10 - Síntese"
                tituloAula="Equações de 1º Grau"
                materia="Matemática"
              />
            </div>
          </div>
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
