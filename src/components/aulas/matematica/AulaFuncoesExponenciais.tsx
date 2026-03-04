"use client";

import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  AlertBox,
  QuizInterativo,
  ModuleBanner,
  QuizQuestion,
  getRandomQuestions,
  AulaProps,
  ContentAccordion,
  AulaTemplate,
  ModuleSectionHeader,
} from "../shared";

// ── QUIZ POOLS (Matemática: Funções Exponenciais) ────────────────────────

const QUIZ_CONCEITO_POOL: QuizQuestion[] = [
  {
    id: 101,
    pergunta: "A função f(x) = 2ˣ é classificada como:",
    opcoes: [
      { label: "A", valor: "Logarítmica" },
      { label: "B", valor: "Exponencial crescente" },
      { label: "C", valor: "Exponencial decrescente" },
      { label: "D", valor: "Quadrática" },
      { label: "E", valor: "Linear" },
    ],
    correta: "B",
    explicacao: "Base 2 > 1 → crescente.",
  },
  {
    id: 102,
    pergunta: "Qual o valor de 3⁰?",
    opcoes: [
      { label: "A", valor: "0" },
      { label: "B", valor: "1" },
      { label: "C", valor: "3" },
      { label: "D", valor: "-1" },
      { label: "E", valor: "Indefinido" },
    ],
    correta: "B",
    explicacao: "Todo número (≠0) elevado a zero vale 1.",
  },
  {
    id: 103,
    pergunta: "Simplifique: 2³ × 2⁴ =",
    opcoes: [
      { label: "A", valor: "2⁷" },
      { label: "B", valor: "2¹²" },
      { label: "C", valor: "4⁷" },
      { label: "D", valor: "2¹" },
      { label: "E", valor: "4¹²" },
    ],
    correta: "A",
    explicacao: "Mesma base: soma os expoentes. 2³⁺⁴ = 2⁷.",
  },
  {
    id: 104,
    pergunta: "Se f(x) = (1/2)ˣ, a função é:",
    opcoes: [
      { label: "A", valor: "Crescente" },
      { label: "B", valor: "Constante" },
      { label: "C", valor: "Decrescente" },
      { label: "D", valor: "Periódica" },
      { label: "E", valor: "Indefinida" },
    ],
    correta: "C",
    explicacao: "Base 0 < 1/2 < 1 → decrescente.",
  },
  {
    id: 105,
    pergunta: "O valor de 5⁻² é:",
    opcoes: [
      { label: "A", valor: "-25" },
      { label: "B", valor: "-10" },
      { label: "C", valor: "1/25" },
      { label: "D", valor: "1/10" },
      { label: "E", valor: "25" },
    ],
    correta: "C",
    explicacao: "a⁻ⁿ = 1/aⁿ. 5⁻² = 1/25.",
  },
  {
    id: 106,
    pergunta: "Simplifique (2³)² =",
    opcoes: [
      { label: "A", valor: "2⁵" },
      { label: "B", valor: "2⁶" },
      { label: "C", valor: "2⁹" },
      { label: "D", valor: "4⁶" },
      { label: "E", valor: "2¹" },
    ],
    correta: "B",
    explicacao: "Potência de potência: multiplica os expoentes. (2³)² = 2⁶.",
  },
];

const QUIZ_EQUACOES_POOL: QuizQuestion[] = [
  {
    id: 201,
    pergunta: "Resolva: 2ˣ = 32",
    opcoes: [
      { label: "A", valor: "x = 4" },
      { label: "B", valor: "x = 5" },
      { label: "C", valor: "x = 6" },
      { label: "D", valor: "x = 16" },
      { label: "E", valor: "x = 3" },
    ],
    correta: "B",
    explicacao: "32 = 2⁵. Logo x = 5.",
  },
  {
    id: 202,
    pergunta: "Resolva: 3ˣ = 81",
    opcoes: [
      { label: "A", valor: "x = 3" },
      { label: "B", valor: "x = 4" },
      { label: "C", valor: "x = 27" },
      { label: "D", valor: "x = 9" },
      { label: "E", valor: "x = 5" },
    ],
    correta: "B",
    explicacao: "81 = 3⁴. Logo x = 4.",
  },
  {
    id: 203,
    pergunta: "Se 4ˣ = 64, então x vale:",
    opcoes: [
      { label: "A", valor: "2" },
      { label: "B", valor: "3" },
      { label: "C", valor: "4" },
      { label: "D", valor: "16" },
      { label: "E", valor: "8" },
    ],
    correta: "B",
    explicacao: "64 = 4³. Logo x = 3.",
  },
  {
    id: 204,
    pergunta: "Resolva: 5ˣ⁺¹ = 125",
    opcoes: [
      { label: "A", valor: "x = 1" },
      { label: "B", valor: "x = 2" },
      { label: "C", valor: "x = 3" },
      { label: "D", valor: "x = 4" },
      { label: "E", valor: "x = 5" },
    ],
    correta: "B",
    explicacao: "125=5³. x+1=3 → x=2.",
  },
  {
    id: 205,
    pergunta: "Se 9ˣ = 27, qual é x?",
    opcoes: [
      { label: "A", valor: "3/2" },
      { label: "B", valor: "2/3" },
      { label: "C", valor: "3" },
      { label: "D", valor: "1" },
      { label: "E", valor: "2" },
    ],
    correta: "A",
    explicacao: "9=3², 27=3³. (3²)ˣ=3³ → 2x=3 → x=3/2.",
  },
];

const QUIZ_APLICACOES_POOL: QuizQuestion[] = [
  {
    id: 301,
    pergunta:
      "Uma bactéria dobra a cada hora. Começando com 100, após 5h teremos:",
    opcoes: [
      { label: "A", valor: "500" },
      { label: "B", valor: "1600" },
      { label: "C", valor: "3200" },
      { label: "D", valor: "6400" },
      { label: "E", valor: "10000" },
    ],
    correta: "C",
    explicacao: "P(t)=100×2ᵗ. P(5)=100×32=3200.",
  },
  {
    id: 302,
    pergunta:
      "Um elemento radioativo decai pela lei N(t)=N₀×(1/2)ᵗ (t em horas). Após 3 horas, resta:",
    opcoes: [
      { label: "A", valor: "1/3 de N₀" },
      { label: "B", valor: "1/6 de N₀" },
      { label: "C", valor: "1/8 de N₀" },
      { label: "D", valor: "1/4 de N₀" },
      { label: "E", valor: "1/2 de N₀" },
    ],
    correta: "C",
    explicacao: "(1/2)³ = 1/8.",
  },
  {
    id: 303,
    pergunta: "R$ 1000 aplicados a 10% a.m. em juros compostos. Após 2 meses:",
    opcoes: [
      { label: "A", valor: "R$ 1.100" },
      { label: "B", valor: "R$ 1.200" },
      { label: "C", valor: "R$ 1.210" },
      { label: "D", valor: "R$ 1.220" },
      { label: "E", valor: "R$ 1.300" },
    ],
    correta: "C",
    explicacao: "M=1000×(1,10)²=1000×1,21=1210.",
  },
];

const QUIZ_INEQUACOES_POOL: QuizQuestion[] = [
  {
    id: 401,
    pergunta: "Na inequação 2ˣ > 16, a solução é:",
    opcoes: [
      { label: "A", valor: "x > 4" },
      { label: "B", valor: "x < 4" },
      { label: "C", valor: "x > 8" },
      { label: "D", valor: "x > 2" },
      { label: "E", valor: "x < 2" },
    ],
    correta: "A",
    explicacao: "16=2⁴. Base>1: mantém sentido. x>4.",
  },
  {
    id: 402,
    pergunta: "Na inequação (1/3)ˣ < 9, a solução é:",
    opcoes: [
      { label: "A", valor: "x > -2" },
      { label: "B", valor: "x < -2" },
      { label: "C", valor: "x > 2" },
      { label: "D", valor: "x < 2" },
      { label: "E", valor: "x > 0" },
    ],
    correta: "A",
    explicacao: "9=(1/3)⁻². Base 0<b<1: inverte. x>-2.",
  },
  {
    id: 403,
    pergunta: "Se 3ˣ ≤ 27, então:",
    opcoes: [
      { label: "A", valor: "x ≤ 3" },
      { label: "B", valor: "x ≥ 3" },
      { label: "C", valor: "x ≤ 9" },
      { label: "D", valor: "x ≥ 9" },
      { label: "E", valor: "x ≤ 27" },
    ],
    correta: "A",
    explicacao: "27=3³. Base>1: mantém sentido. x≤3.",
  },
];

const QUIZ_FINAL_POOL: QuizQuestion[] = [
  {
    id: 501,
    pergunta:
      "Em um reservatório, a concentração de cloro decai 20% a cada hora. A função modelo é:",
    opcoes: [
      { label: "A", valor: "C(t)=C₀×(0,8)ᵗ" },
      { label: "B", valor: "C(t)=C₀×(1,2)ᵗ" },
      { label: "C", valor: "C(t)=C₀×(0,2)ᵗ" },
      { label: "D", valor: "C(t)=C₀-0,2t" },
      { label: "E", valor: "C(t)=C₀×(0,02)ᵗ" },
    ],
    correta: "A",
    explicacao: "Decai 20% → mantém 80% → fator 0,8 por período.",
  },
  {
    id: 502,
    pergunta: "Compare: 2¹⁰ e 10³. O maior é:",
    opcoes: [
      { label: "A", valor: "São iguais" },
      { label: "B", valor: "2¹⁰" },
      { label: "C", valor: "10³" },
      { label: "D", valor: "Incomparáveis" },
      { label: "E", valor: "Depende do contexto" },
    ],
    correta: "B",
    explicacao: "2¹⁰ = 1024 e 10³ = 1000. Logo 2¹⁰ > 10³.",
  },
  {
    id: 503,
    pergunta: "O gráfico de f(x)=aˣ (a>1) SEMPRE passa pelo ponto:",
    opcoes: [
      { label: "A", valor: "(1, 0)" },
      { label: "B", valor: "(0, 1)" },
      { label: "C", valor: "(0, 0)" },
      { label: "D", valor: "(1, a)" },
      { label: "E", valor: "(a, 1)" },
    ],
    correta: "B",
    explicacao: "f(0) = a⁰ = 1. Sempre passa por (0,1).",
  },
];

// ── COMPONENT ───────────────────────────────────────────────────────────

export default function AulaFuncoesExponenciais({
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
    getRandomQuestions(QUIZ_CONCEITO_POOL, 6),
  );
  const [quizEquacoes] = useState(() =>
    getRandomQuestions(QUIZ_EQUACOES_POOL, 5),
  );
  const [quizAplicacoes] = useState(() =>
    getRandomQuestions(QUIZ_APLICACOES_POOL, 3),
  );
  const [quizInequacoes] = useState(() =>
    getRandomQuestions(QUIZ_INEQUACOES_POOL, 3),
  );
  const [quizFinal] = useState(() => getRandomQuestions(QUIZ_FINAL_POOL, 3));
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
      onUpdateProgress?.(Math.round(((idx + 1) / 5) * 100));
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
    { id: "modulo-1", label: "Módulo 1", titulo: "Potenciação" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Equações Exponenciais" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Aplicações" },
    { id: "modulo-4", label: "Módulo 4", titulo: "Inequações" },
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
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="Potenciação e Conceitos"
          descricao="As regras fundamentais de potências."
          gradiente="bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Regras de Potenciação"
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="As 5 Regras de Ouro"
              icone="⚡"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Regras Essenciais",
                  icone: "📜",
                  conteudo: (
                    <div className="space-y-3">
                      <div className="grid gap-2">
                        {[
                          "aᵐ × aⁿ = aᵐ⁺ⁿ",
                          "aᵐ ÷ aⁿ = aᵐ⁻ⁿ",
                          "(aᵐ)ⁿ = aᵐˣⁿ",
                          "a⁻ⁿ = 1/aⁿ",
                          "a⁰ = 1 (a≠0)",
                        ].map((r, i) => (
                          <div
                            key={i}
                            className="p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/20 font-mono text-center"
                          >
                            {r}
                          </div>
                        ))}
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
              titulo="Quiz - Potenciação"
              icone="🧠"
              numero={1}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      <TabsContent value="modulo-2" className="space-y-[50px]">
        <ModuleBanner
          numero={2}
          titulo="Equações Exponenciais"
          descricao="Iguale as bases e compare os expoentes."
          gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Método de Resolução"
              variant="emerald"
              className="mb-6"
            />
            <AlertBox tipo="success" titulo="Passo a Passo">
              1. Escreva ambos os lados com a MESMA BASE. 2. Iguale os
              expoentes. 3. Resolva a equação resultante.
            </AlertBox>
          </section>
          <section id="quiz-modulo-2" className="mt-16">
            <QuizInterativo
              questoes={quizEquacoes}
              titulo="Quiz - Equações"
              icone="🧠"
              numero={2}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>
        </div>
      </TabsContent>

      <TabsContent value="modulo-3" className="space-y-[50px]">
        <ModuleBanner
          numero={3}
          titulo="Aplicações: Crescimento e Decaimento"
          descricao="Juros compostos, populações e radioatividade."
          gradiente="bg-gradient-to-br from-amber-600 via-orange-600 to-red-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Modelos Exponenciais"
              variant="amber"
              className="mb-6"
            />
            <AlertBox tipo="info" titulo="Modelo Geral">
              N(t) = N₀ × (1 ± taxa)ᵗ. Crescimento: +. Decaimento: -.
            </AlertBox>
          </section>
          <section id="quiz-modulo-3" className="mt-16">
            <QuizInterativo
              questoes={quizAplicacoes}
              titulo="Quiz - Aplicações"
              icone="🧠"
              numero={3}
              variant="amber"
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>
        </div>
      </TabsContent>

      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner
          numero={4}
          titulo="Inequações Exponenciais"
          descricao="Base > 1 mantém; 0 < base < 1 inverte."
          gradiente="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Regra do Sentido"
              variant="violet"
              className="mb-6"
            />
            <AlertBox tipo="warning" titulo="Atenção!">
              Base &gt; 1: mantém o sentido da desigualdade. Base entre 0 e 1:
              INVERTE o sentido!
            </AlertBox>
          </section>
          <section id="quiz-modulo-4" className="mt-16">
            <QuizInterativo
              questoes={quizInequacoes}
              titulo="Quiz - Inequações"
              icone="🔥"
              numero={4}
              variant="violet"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="Desafio Final"
          descricao="Problemas mistos de exponenciais."
          gradiente="bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700"
        />
        <div className="space-y-[50px]">
          <section id="quiz-modulo-5" className="mt-16">
            <QuizInterativo
              questoes={quizFinal}
              titulo="Desafio Final - Exponenciais"
              icone="🏆"
              numero={5}
              variant="rose"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
          {completedModules.has("modulo-5") && (
            <div className="mt-16 p-12 bg-gradient-to-br from-amber-600 to-orange-700 rounded-[2rem] text-white text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="relative z-10 space-y-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-5xl mx-auto backdrop-blur-sm border border-white/30 animate-bounce">
                  ⚡
                </div>
                <h3 className="text-4xl font-black italic tracking-tighter">
                  EXPONENCIAIS DOMINADAS!
                </h3>
                <p className="text-xl opacity-90 max-w-xl mx-auto">
                  Juros compostos e crescimento população nunca mais serão um
                  mistério.
                </p>
              </div>
            </div>
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
