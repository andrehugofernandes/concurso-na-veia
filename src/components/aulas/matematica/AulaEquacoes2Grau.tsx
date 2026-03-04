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

// ── QUIZ POOLS (Matemática: Equações de 2º Grau) ────────────────────────

const QUIZ_BHASKARA_POOL: QuizQuestion[] = [
  {
    id: 101,
    pergunta: "Na equação x² - 5x + 6 = 0, o discriminante (Δ) vale:",
    opcoes: [
      { label: "A", valor: "1" },
      { label: "B", valor: "4" },
      { label: "C", valor: "6" },
      { label: "D", valor: "-1" },
      { label: "E", valor: "0" },
    ],
    correta: "A",
    explicacao: "Δ = b² - 4ac = (-5)² - 4(1)(6) = 25 - 24 = 1.",
  },
  {
    id: 102,
    pergunta: "As raízes de x² - 5x + 6 = 0 são:",
    opcoes: [
      { label: "A", valor: "x = 1 e x = 6" },
      { label: "B", valor: "x = 2 e x = 3" },
      { label: "C", valor: "x = -2 e x = -3" },
      { label: "D", valor: "x = 5 e x = 6" },
      { label: "E", valor: "x = 0 e x = 5" },
    ],
    correta: "B",
    explicacao: "x = (5 ± 1)/2. x₁ = 3, x₂ = 2.",
  },
  {
    id: 103,
    pergunta: "Se Δ < 0, a equação de 2º grau possui:",
    opcoes: [
      { label: "A", valor: "Duas raízes reais iguais" },
      { label: "B", valor: "Duas raízes reais distintas" },
      { label: "C", valor: "Uma raiz real" },
      { label: "D", valor: "Nenhuma raiz real" },
      { label: "E", valor: "Infinitas raízes" },
    ],
    correta: "D",
    explicacao:
      "Δ < 0 → não existe raiz quadrada real de número negativo → sem raízes reais.",
  },
  {
    id: 104,
    pergunta: "Na equação 2x² - 8x = 0, as raízes são:",
    opcoes: [
      { label: "A", valor: "x = 0 e x = 4" },
      { label: "B", valor: "x = 2 e x = 4" },
      { label: "C", valor: "x = 0 e x = 8" },
      { label: "D", valor: "x = -4 e x = 4" },
      { label: "E", valor: "x = 0 e x = 2" },
    ],
    correta: "A",
    explicacao: "2x(x - 4) = 0 → x = 0 ou x = 4.",
  },
  {
    id: 105,
    pergunta: "Resolva: x² - 9 = 0",
    opcoes: [
      { label: "A", valor: "x = 3" },
      { label: "B", valor: "x = 9" },
      { label: "C", valor: "x = ±3" },
      { label: "D", valor: "x = ±9" },
      { label: "E", valor: "x = 0" },
    ],
    correta: "C",
    explicacao: "x² = 9 → x = ±√9 = ±3.",
  },
  {
    id: 106,
    pergunta: "Qual o valor de Δ em x² + 4x + 4 = 0?",
    opcoes: [
      { label: "A", valor: "0" },
      { label: "B", valor: "4" },
      { label: "C", valor: "8" },
      { label: "D", valor: "16" },
      { label: "E", valor: "-16" },
    ],
    correta: "A",
    explicacao: "Δ = 16 - 16 = 0. Raiz dupla: x = -2.",
  },
];

const QUIZ_SOMA_PROD_POOL: QuizQuestion[] = [
  {
    id: 201,
    pergunta:
      "Na equação x² - 7x + 12 = 0, a soma das raízes (S) e o produto (P) são:",
    opcoes: [
      { label: "A", valor: "S = 7 e P = 12" },
      { label: "B", valor: "S = -7 e P = 12" },
      { label: "C", valor: "S = 7 e P = -12" },
      { label: "D", valor: "S = 12 e P = 7" },
      { label: "E", valor: "S = -7 e P = -12" },
    ],
    correta: "A",
    explicacao: "Relações de Girard: S = -b/a = 7, P = c/a = 12.",
  },
  {
    id: 202,
    pergunta: "Se as raízes de uma equação de 2º grau são 5 e -2, a equação é:",
    opcoes: [
      { label: "A", valor: "x² - 3x - 10 = 0" },
      { label: "B", valor: "x² + 3x - 10 = 0" },
      { label: "C", valor: "x² - 3x + 10 = 0" },
      { label: "D", valor: "x² + 7x + 10 = 0" },
      { label: "E", valor: "x² - 7x + 10 = 0" },
    ],
    correta: "A",
    explicacao:
      "S = 5+(-2) = 3, P = 5×(-2) = -10. x² - Sx + P = x² - 3x - 10 = 0.",
  },
  {
    id: 203,
    pergunta: "Se as raízes são 4 e 6, qual o produto?",
    opcoes: [
      { label: "A", valor: "10" },
      { label: "B", valor: "20" },
      { label: "C", valor: "24" },
      { label: "D", valor: "12" },
      { label: "E", valor: "2" },
    ],
    correta: "C",
    explicacao: "Produto = 4 × 6 = 24.",
  },
  {
    id: 204,
    pergunta: "Se S = -b/a = 8 e P = c/a = 15, as raízes são:",
    opcoes: [
      { label: "A", valor: "3 e 5" },
      { label: "B", valor: "4 e 4" },
      { label: "C", valor: "1 e 15" },
      { label: "D", valor: "6 e 2" },
      { label: "E", valor: "7 e 1" },
    ],
    correta: "A",
    explicacao: "Dois números que somam 8 e multiplicam 15: 3 e 5.",
  },
];

const QUIZ_PROBLEMAS_POOL: QuizQuestion[] = [
  {
    id: 301,
    pergunta:
      "A área de um terreno retangular é 120 m². Se o comprimento excede a largura em 2m, qual a largura?",
    opcoes: [
      { label: "A", valor: "8 m" },
      { label: "B", valor: "10 m" },
      { label: "C", valor: "12 m" },
      { label: "D", valor: "14 m" },
      { label: "E", valor: "6 m" },
    ],
    correta: "B",
    explicacao:
      "x(x+2)=120 → x²+2x-120=0. Δ=484. x=(−2+22)/2=10. Largura = 10 m.",
  },
  {
    id: 302,
    pergunta:
      "O lucro de uma refinaria é L(x) = -2x² + 40x - 100. Qual produção maximiza o lucro?",
    opcoes: [
      { label: "A", valor: "5 unidades" },
      { label: "B", valor: "8 unidades" },
      { label: "C", valor: "10 unidades" },
      { label: "D", valor: "12 unidades" },
      { label: "E", valor: "20 unidades" },
    ],
    correta: "C",
    explicacao: "xᵥ = -b/2a = -40/(2×(-2)) = -40/-4 = 10.",
  },
  {
    id: 303,
    pergunta:
      "Um projétil é lançado e sua altura é h(t)=-5t²+30t. Em que instante a altura é máxima?",
    opcoes: [
      { label: "A", valor: "2 s" },
      { label: "B", valor: "3 s" },
      { label: "C", valor: "4 s" },
      { label: "D", valor: "5 s" },
      { label: "E", valor: "6 s" },
    ],
    correta: "B",
    explicacao: "tᵥ = -30/(2×(-5)) = -30/-10 = 3 segundos.",
  },
  {
    id: 304,
    pergunta:
      "A equação x² - 10x + k = 0 tem raízes reais iguais quando k vale:",
    opcoes: [
      { label: "A", valor: "10" },
      { label: "B", valor: "20" },
      { label: "C", valor: "25" },
      { label: "D", valor: "50" },
      { label: "E", valor: "100" },
    ],
    correta: "C",
    explicacao: "Δ = 0: 100 - 4k = 0 → k = 25.",
  },
];

const QUIZ_PARABOLA_POOL: QuizQuestion[] = [
  {
    id: 401,
    pergunta: "A parábola y = x² - 6x + 5 intercepta o eixo x nos pontos:",
    opcoes: [
      { label: "A", valor: "(1,0) e (5,0)" },
      { label: "B", valor: "(2,0) e (3,0)" },
      { label: "C", valor: "(-1,0) e (-5,0)" },
      { label: "D", valor: "(0,0) e (6,0)" },
      { label: "E", valor: "(1,0) e (6,0)" },
    ],
    correta: "A",
    explicacao: "x²-6x+5=0 → Δ=16 → x=(6±4)/2 → x=1 e x=5.",
  },
  {
    id: 402,
    pergunta: "Se a > 0 em f(x) = ax² + bx + c, a parábola:",
    opcoes: [
      { label: "A", valor: "Tem concavidade para baixo" },
      { label: "B", valor: "Tem concavidade para cima" },
      { label: "C", valor: "É uma reta" },
      { label: "D", valor: "Não cruza o eixo x" },
      { label: "E", valor: "Depende de b" },
    ],
    correta: "B",
    explicacao: "a > 0 → concavidade para cima (∪). Ponto mínimo.",
  },
  {
    id: 403,
    pergunta: "O vértice da parábola y = -x² + 8x - 12 é:",
    opcoes: [
      { label: "A", valor: "(4, 4)" },
      { label: "B", valor: "(4, -4)" },
      { label: "C", valor: "(2, 0)" },
      { label: "D", valor: "(8, 12)" },
      { label: "E", valor: "(-4, 4)" },
    ],
    correta: "A",
    explicacao: "xᵥ=-8/(2×(-1))=4. yᵥ=-16+32-12=4. V=(4,4).",
  },
];

const QUIZ_FINAL_POOL: QuizQuestion[] = [
  {
    id: 501,
    pergunta: "A equação 3x² - 12 = 0 tem como solução:",
    opcoes: [
      { label: "A", valor: "x = ±2" },
      { label: "B", valor: "x = ±4" },
      { label: "C", valor: "x = 2" },
      { label: "D", valor: "x = 4" },
      { label: "E", valor: "x = ±6" },
    ],
    correta: "A",
    explicacao: "3x² = 12 → x² = 4 → x = ±2.",
  },
  {
    id: 502,
    pergunta: "Qual equação de 2º grau tem raízes -1 e 3?",
    opcoes: [
      { label: "A", valor: "x² - 2x - 3 = 0" },
      { label: "B", valor: "x² + 2x - 3 = 0" },
      { label: "C", valor: "x² - 2x + 3 = 0" },
      { label: "D", valor: "x² + 4x + 3 = 0" },
      { label: "E", valor: "x² - 4x - 3 = 0" },
    ],
    correta: "A",
    explicacao: "S=-1+3=2, P=-1×3=-3. x² - 2x - 3 = 0.",
  },
  {
    id: 503,
    pergunta:
      "Na fórmula de Bhaskara, se Δ = 49 e a = 1, b = -3, as raízes são:",
    opcoes: [
      { label: "A", valor: "5 e -2" },
      { label: "B", valor: "7 e -4" },
      { label: "C", valor: "10 e -7" },
      { label: "D", valor: "3 e 0" },
      { label: "E", valor: "4 e -1" },
    ],
    correta: "A",
    explicacao: "x = (3 ± 7)/2. x₁ = 5, x₂ = -2.",
  },
];

// ── COMPONENT ───────────────────────────────────────────────────────────

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

  const [quizBhaskara] = useState(() =>
    getRandomQuestions(QUIZ_BHASKARA_POOL, 6),
  );
  const [quizSomaProd] = useState(() =>
    getRandomQuestions(QUIZ_SOMA_PROD_POOL, 4),
  );
  const [quizProblemas] = useState(() =>
    getRandomQuestions(QUIZ_PROBLEMAS_POOL, 4),
  );
  const [quizParabola] = useState(() =>
    getRandomQuestions(QUIZ_PARABOLA_POOL, 3),
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
    { id: "modulo-1", label: "Módulo 1", titulo: "Bhaskara" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Soma e Produto" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Problemas" },
    { id: "modulo-4", label: "Módulo 4", titulo: "Parábola" },
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
          titulo="Fórmula de Bhaskara"
          descricao="A fórmula mais famosa da Matemática: x = (-b ± √Δ) / 2a."
          gradiente="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Discriminante e Raízes"
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Bhaskara Passo a Passo"
              icone="📐"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "A Fórmula",
                  icone: "🔑",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="p-5 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-center space-y-2">
                        <p className="text-lg font-bold font-mono">
                          Δ = b² - 4ac
                        </p>
                        <p className="text-lg font-bold font-mono">
                          x = (-b ± √Δ) / 2a
                        </p>
                      </div>
                      <CardCarousel
                        cards={[
                          {
                            titulo: "Δ > 0",
                            descricao: "Duas raízes reais distintas",
                            icone: "✌️",
                          },
                          {
                            titulo: "Δ = 0",
                            descricao: "Raiz dupla (duas iguais)",
                            icone: "1️⃣",
                          },
                          {
                            titulo: "Δ < 0",
                            descricao: "Sem raízes reais",
                            icone: "❌",
                          },
                        ]}
                      />
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-1" className="mt-16">
            <QuizInterativo
              questoes={quizBhaskara}
              titulo="Quiz - Bhaskara"
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
          titulo="Relações de Girard (Soma e Produto)"
          descricao="Atalho poderoso para encontrar raízes sem Bhaskara."
          gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Soma e Produto"
              variant="emerald"
              className="mb-6"
            />
            <AlertBox tipo="success" titulo="Fórmulas de Girard">
              Soma: S = x₁ + x₂ = -b/a | Produto: P = x₁ × x₂ = c/a
            </AlertBox>
          </section>
          <section id="quiz-modulo-2" className="mt-16">
            <QuizInterativo
              questoes={quizSomaProd}
              titulo="Quiz - Soma e Produto"
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
          titulo="Problemas do 2º Grau"
          descricao="Áreas, lucros e projéteis."
          gradiente="bg-gradient-to-br from-amber-600 via-orange-600 to-red-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Modelagem de Problemas"
              variant="amber"
              className="mb-6"
            />
            <AlertBox tipo="info" titulo="Dica">
              Identifique a grandeza desconhecida, monte a equação e descarte
              raízes que não fazem sentido no contexto (ex: medida negativa).
            </AlertBox>
          </section>
          <section id="quiz-modulo-3" className="mt-16">
            <QuizInterativo
              questoes={quizProblemas}
              titulo="Quiz - Problemas"
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
          titulo="O Gráfico: A Parábola"
          descricao="Concavidade, vértice e interseções."
          gradiente="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Análise Gráfica"
              variant="violet"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Propriedades da Parábola"
              icone="📈"
              corIndicador="bg-violet-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Concavidade",
                  icone: "↕️",
                  conteudo: (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20 text-center">
                        <p className="font-bold text-green-700 dark:text-green-400">
                          a &gt; 0 → Côncava para cima (∪)
                        </p>
                        <p className="text-sm mt-1">
                          Ponto de MÍNIMO no vértice
                        </p>
                      </div>
                      <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20 text-center">
                        <p className="font-bold text-red-700 dark:text-red-400">
                          a &lt; 0 → Côncava para baixo (∩)
                        </p>
                        <p className="text-sm mt-1">
                          Ponto de MÁXIMO no vértice
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-4" className="mt-16">
            <QuizInterativo
              questoes={quizParabola}
              titulo="Quiz - Parábola"
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
          descricao="Problemas integradores de toda a matéria."
          gradiente="bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700"
        />
        <div className="space-y-[50px]">
          <section id="quiz-modulo-5" className="mt-16">
            <QuizInterativo
              questoes={quizFinal}
              titulo="Desafio Final - Equações de 2º Grau"
              icone="🏆"
              numero={5}
              variant="rose"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
          {completedModules.has("modulo-5") && (
            <div className="mt-16 p-12 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2rem] text-white text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="relative z-10 space-y-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-5xl mx-auto backdrop-blur-sm border border-white/30 animate-bounce">
                  📐
                </div>
                <h3 className="text-4xl font-black italic tracking-tighter">
                  BHASKARA DOMINADO!
                </h3>
                <p className="text-xl opacity-90 max-w-xl mx-auto">
                  Equações de 2º grau são um dos temas mais cobrados. Excelente
                  trabalho!
                </p>
              </div>
            </div>
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
