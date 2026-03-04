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
  CardCarousel,
  ContentAccordion,
  AulaTemplate,
  ModuleSectionHeader,
} from "../shared";

// ── QUIZ POOLS (Matemática: Funções Afim e Quadrática) ──────────────────

const QUIZ_AFIM_POOL: QuizQuestion[] = [
  {
    id: 101,
    pergunta:
      "Na função f(x) = 3x + 7, o coeficiente angular e o linear são, respectivamente:",
    opcoes: [
      { label: "A", valor: "7 e 3" },
      { label: "B", valor: "3 e 7" },
      { label: "C", valor: "3 e 0" },
      { label: "D", valor: "7 e 0" },
      { label: "E", valor: "0 e 7" },
    ],
    correta: "B",
    explicacao: "f(x) = ax + b. a=3 (angular), b=7 (linear).",
  },
  {
    id: 102,
    pergunta: "A raiz (zero) da função f(x) = 2x - 10 é:",
    opcoes: [
      { label: "A", valor: "x = 2" },
      { label: "B", valor: "x = -5" },
      { label: "C", valor: "x = 5" },
      { label: "D", valor: "x = 10" },
      { label: "E", valor: "x = -10" },
    ],
    correta: "C",
    explicacao: "2x - 10 = 0 → x = 5.",
  },
  {
    id: 103,
    pergunta: "Se a > 0 em f(x) = ax + b, a função é:",
    opcoes: [
      { label: "A", valor: "Decrescente" },
      { label: "B", valor: "Constante" },
      { label: "C", valor: "Crescente" },
      { label: "D", valor: "Periódica" },
      { label: "E", valor: "Indefinida" },
    ],
    correta: "C",
    explicacao: "a > 0 → função crescente.",
  },
  {
    id: 104,
    pergunta:
      "O custo de produção de uma refinaria é C(x) = 5000 + 15x. Para 1000 barris, o custo é:",
    opcoes: [
      { label: "A", valor: "R$ 15.000" },
      { label: "B", valor: "R$ 16.000" },
      { label: "C", valor: "R$ 20.000" },
      { label: "D", valor: "R$ 25.000" },
      { label: "E", valor: "R$ 5.000" },
    ],
    correta: "C",
    explicacao: "C(1000) = 5000 + 15×1000 = 5000 + 15000 = 20000.",
  },
  {
    id: 105,
    pergunta: "O gráfico de f(x) = -2x + 6 intercepta o eixo y no ponto:",
    opcoes: [
      { label: "A", valor: "(0, 6)" },
      { label: "B", valor: "(6, 0)" },
      { label: "C", valor: "(3, 0)" },
      { label: "D", valor: "(0, -2)" },
      { label: "E", valor: "(0, 3)" },
    ],
    correta: "A",
    explicacao: "f(0) = -2(0) + 6 = 6. Ponto (0, 6).",
  },
  {
    id: 106,
    pergunta: "Duas funções afins são paralelas quando:",
    opcoes: [
      { label: "A", valor: "Têm o mesmo coeficiente linear" },
      { label: "B", valor: "Têm coeficientes angulares opostos" },
      { label: "C", valor: "Têm o mesmo coeficiente angular" },
      { label: "D", valor: "São iguais" },
      { label: "E", valor: "Têm raízes iguais" },
    ],
    correta: "C",
    explicacao: "Retas paralelas: mesmo coeficiente angular (a₁ = a₂).",
  },
];

const QUIZ_QUADRATICA_POOL: QuizQuestion[] = [
  {
    id: 201,
    pergunta: "O vértice da parábola f(x) = x² - 4x + 3 é:",
    opcoes: [
      { label: "A", valor: "(2, -1)" },
      { label: "B", valor: "(2, 1)" },
      { label: "C", valor: "(-2, -1)" },
      { label: "D", valor: "(4, 3)" },
      { label: "E", valor: "(1, 0)" },
    ],
    correta: "A",
    explicacao: "xᵥ = -(-4)/(2×1) = 2. yᵥ = 4-8+3 = -1. V=(2,-1).",
  },
  {
    id: 202,
    pergunta: "O lucro L(x) = -x² + 10x - 16 é máximo quando x vale:",
    opcoes: [
      { label: "A", valor: "3" },
      { label: "B", valor: "4" },
      { label: "C", valor: "5" },
      { label: "D", valor: "8" },
      { label: "E", valor: "10" },
    ],
    correta: "C",
    explicacao: "xᵥ = -10/(2×(-1)) = 5.",
  },
  {
    id: 203,
    pergunta: "f(x) = 2x² - 8x tem raízes:",
    opcoes: [
      { label: "A", valor: "0 e 4" },
      { label: "B", valor: "2 e 4" },
      { label: "C", valor: "0 e 2" },
      { label: "D", valor: "-4 e 0" },
      { label: "E", valor: "0 e 8" },
    ],
    correta: "A",
    explicacao: "2x(x-4)=0 → x=0 ou x=4.",
  },
  {
    id: 204,
    pergunta: "Se a < 0, o vértice de f(x) = ax² + bx + c é ponto de:",
    opcoes: [
      { label: "A", valor: "Mínimo" },
      { label: "B", valor: "Máximo" },
      { label: "C", valor: "Inflexão" },
      { label: "D", valor: "Interseção" },
      { label: "E", valor: "Nenhum" },
    ],
    correta: "B",
    explicacao:
      "a < 0 → parábola com concavidade para baixo → vértice é ponto de máximo.",
  },
  {
    id: 205,
    pergunta: "Qual o valor de f(x) = x² para x = -3?",
    opcoes: [
      { label: "A", valor: "-9" },
      { label: "B", valor: "9" },
      { label: "C", valor: "-6" },
      { label: "D", valor: "6" },
      { label: "E", valor: "0" },
    ],
    correta: "B",
    explicacao: "(-3)² = 9.",
  },
];

const QUIZ_GRAFICO_POOL: QuizQuestion[] = [
  {
    id: 301,
    pergunta: "A imagem (Im) de f(x) = x² - 4x + 7 é:",
    opcoes: [
      { label: "A", valor: "Im = [3, +∞)" },
      { label: "B", valor: "Im = (-∞, 3]" },
      { label: "C", valor: "Im = [7, +∞)" },
      { label: "D", valor: "Im = ℝ" },
      { label: "E", valor: "Im = [0, +∞)" },
    ],
    correta: "A",
    explicacao: "a>0, yᵥ = -(16-28)/4 = 12/4 = 3. Im = [3, +∞).",
  },
  {
    id: 302,
    pergunta: "O sinal de f(x) = x² - 9 é negativo para:",
    opcoes: [
      { label: "A", valor: "x < -3 ou x > 3" },
      { label: "B", valor: "-3 < x < 3" },
      { label: "C", valor: "x > 0" },
      { label: "D", valor: "x < 0" },
      { label: "E", valor: "Sempre positivo" },
    ],
    correta: "B",
    explicacao: "Raízes: x=±3. Como a>0, f(x)<0 entre as raízes: -3<x<3.",
  },
  {
    id: 303,
    pergunta: "O gráfico de f(x) = (x-2)² é uma parábola com vértice em:",
    opcoes: [
      { label: "A", valor: "(0, 4)" },
      { label: "B", valor: "(2, 0)" },
      { label: "C", valor: "(-2, 0)" },
      { label: "D", valor: "(0, 2)" },
      { label: "E", valor: "(2, 4)" },
    ],
    correta: "B",
    explicacao: "f(x) = (x-2)² → vértice em (2, 0).",
  },
];

const QUIZ_APLICACOES_POOL: QuizQuestion[] = [
  {
    id: 401,
    pergunta:
      "A receita de vendas é R(x)=50x e o custo é C(x)=2x²+10x. O lucro L(x)=R-C é máximo quando x vale:",
    opcoes: [
      { label: "A", valor: "5" },
      { label: "B", valor: "10" },
      { label: "C", valor: "15" },
      { label: "D", valor: "20" },
      { label: "E", valor: "25" },
    ],
    correta: "B",
    explicacao: "L(x)=50x-2x²-10x = -2x²+40x. xᵥ=-40/(2×(-2))=10.",
  },
  {
    id: 402,
    pergunta: "Um projétil sobe segundo h(t)=-5t²+20t. Qual a altura máxima?",
    opcoes: [
      { label: "A", valor: "10 m" },
      { label: "B", valor: "15 m" },
      { label: "C", valor: "20 m" },
      { label: "D", valor: "25 m" },
      { label: "E", valor: "40 m" },
    ],
    correta: "C",
    explicacao: "tᵥ=2. h(2)=-5(4)+20(2)=-20+40=20 m.",
  },
  {
    id: 403,
    pergunta:
      "O break-even (receita = custo) ocorre nas raízes de L(x)=0. Se L(x)=-x²+8x-12, os pontos de equilíbrio são:",
    opcoes: [
      { label: "A", valor: "x=2 e x=6" },
      { label: "B", valor: "x=3 e x=4" },
      { label: "C", valor: "x=1 e x=12" },
      { label: "D", valor: "x=4 e x=8" },
      { label: "E", valor: "x=6 e x=8" },
    ],
    correta: "A",
    explicacao: "x²-8x+12=0. Δ=64-48=16. x=(8±4)/2 → x=2 e x=6.",
  },
];

const QUIZ_FINAL_POOL: QuizQuestion[] = [
  {
    id: 501,
    pergunta:
      "Uma função do tipo f(x) = ax + b tem gráfico que passa por (1,5) e (3,11). Os valores de a e b são:",
    opcoes: [
      { label: "A", valor: "a=3, b=2" },
      { label: "B", valor: "a=2, b=3" },
      { label: "C", valor: "a=5, b=0" },
      { label: "D", valor: "a=4, b=1" },
      { label: "E", valor: "a=6, b=-1" },
    ],
    correta: "A",
    explicacao: "a=(11-5)/(3-1)=3. b=5-3(1)=2.",
  },
  {
    id: 502,
    pergunta: "f(x) = x²-6x+k não possui raízes reais quando k é:",
    opcoes: [
      { label: "A", valor: "k < 9" },
      { label: "B", valor: "k = 9" },
      { label: "C", valor: "k > 9" },
      { label: "D", valor: "k > 0" },
      { label: "E", valor: "k < 0" },
    ],
    correta: "C",
    explicacao: "Δ<0: 36-4k<0 → k>9.",
  },
  {
    id: 503,
    pergunta: "A função f(x)=|x-3| tem gráfico em forma de:",
    opcoes: [
      { label: "A", valor: "Parábola" },
      { label: "B", valor: "Reta" },
      { label: "C", valor: "V (módulo)" },
      { label: "D", valor: "Hipérbole" },
      { label: "E", valor: "Circunferência" },
    ],
    correta: "C",
    explicacao: "Função modular tem gráfico em V com vértice em (3,0).",
  },
];

// ── COMPONENT ───────────────────────────────────────────────────────────

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

  const [quizAfim] = useState(() => getRandomQuestions(QUIZ_AFIM_POOL, 6));
  const [quizQuadratica] = useState(() =>
    getRandomQuestions(QUIZ_QUADRATICA_POOL, 5),
  );
  const [quizGrafico] = useState(() =>
    getRandomQuestions(QUIZ_GRAFICO_POOL, 3),
  );
  const [quizAplicacoes] = useState(() =>
    getRandomQuestions(QUIZ_APLICACOES_POOL, 3),
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
    { id: "modulo-1", label: "Módulo 1", titulo: "Função Afim" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Função Quadrática" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Análise Gráfica" },
    { id: "modulo-4", label: "Módulo 4", titulo: "Aplicações" },
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
          titulo="Função Afim (1º Grau)"
          descricao="f(x) = ax + b — a reta e suas propriedades."
          gradiente="bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Coeficientes e Gráfico"
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="A Função Afim"
              icone="📈"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Forma Geral",
                  icone: "🔑",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="p-5 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-center">
                        <p className="text-lg font-bold font-mono">
                          f(x) = ax + b
                        </p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                          <p className="font-bold text-blue-700 dark:text-blue-400">
                            a = coeficiente angular
                          </p>
                          <p className="text-sm">Define a inclinação da reta</p>
                        </div>
                        <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                          <p className="font-bold text-cyan-700 dark:text-cyan-400">
                            b = coeficiente linear
                          </p>
                          <p className="text-sm">
                            Onde a reta intercepta o eixo y
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-1" className="mt-16">
            <QuizInterativo
              questoes={quizAfim}
              titulo="Quiz - Função Afim"
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
          titulo="Função Quadrática (2º Grau)"
          descricao="f(x) = ax² + bx + c — a parábola."
          gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Parábola e Vértice"
              variant="emerald"
              className="mb-6"
            />
            <AlertBox tipo="info" titulo="Fórmulas do Vértice">
              xᵥ = -b/(2a) | yᵥ = -Δ/(4a)
            </AlertBox>
          </section>
          <section id="quiz-modulo-2" className="mt-16">
            <QuizInterativo
              questoes={quizQuadratica}
              titulo="Quiz - Função Quadrática"
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
          titulo="Análise Gráfica"
          descricao="Imagem, sinal e domínio das funções."
          gradiente="bg-gradient-to-br from-amber-600 via-orange-600 to-red-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Estudo do Sinal"
              variant="amber"
              className="mb-6"
            />
            <CardCarousel
              cards={[
                {
                  titulo: "a > 0",
                  descricao: "Parábola para cima (∪). f(x)<0 ENTRE as raízes.",
                  icone: "⬆️",
                },
                {
                  titulo: "a < 0",
                  descricao: "Parábola para baixo (∩). f(x)>0 ENTRE as raízes.",
                  icone: "⬇️",
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-3" className="mt-16">
            <QuizInterativo
              questoes={quizGrafico}
              titulo="Quiz - Análise Gráfica"
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
          titulo="Aplicações Industriais"
          descricao="Lucro, custo e receita modelados por funções."
          gradiente="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Modelagem com Funções"
              variant="violet"
              className="mb-6"
            />
            <AlertBox tipo="success" titulo="Fórmula do Lucro">
              L(x) = R(x) - C(x). O ponto de equilíbrio (break-even) é quando
              L(x) = 0.
            </AlertBox>
          </section>
          <section id="quiz-modulo-4" className="mt-16">
            <QuizInterativo
              questoes={quizAplicacoes}
              titulo="Quiz - Aplicações"
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
          descricao="Questões integrando funções afins e quadráticas."
          gradiente="bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700"
        />
        <div className="space-y-[50px]">
          <section id="quiz-modulo-5" className="mt-16">
            <QuizInterativo
              questoes={quizFinal}
              titulo="Desafio Final - Funções"
              icone="🏆"
              numero={5}
              variant="rose"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
          {completedModules.has("modulo-5") && (
            <div className="mt-16 p-12 bg-gradient-to-br from-blue-600 to-cyan-700 rounded-[2rem] text-white text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="relative z-10 space-y-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-5xl mx-auto backdrop-blur-sm border border-white/30 animate-bounce">
                  📈
                </div>
                <h3 className="text-4xl font-black italic tracking-tighter">
                  FUNÇÕES DOMINADAS!
                </h3>
                <p className="text-xl opacity-90 max-w-xl mx-auto">
                  Afim e Quadrática são pilares da prova. Excelente!
                </p>
              </div>
            </div>
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
