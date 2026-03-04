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
  LessonTabs,
  ModuleSummaryCarouselNew,
  AulaTemplate,
  ModuleSectionHeader,
} from "../shared";
import { LuBookOpen } from "react-icons/lu";

// ── QUIZ POOLS (Matemática: Porcentagem) ──────────────────────────────────

const QUIZ_CONCEITOS_POOL: QuizQuestion[] = [
  {
    id: 101,
    pergunta: "A expressão '25%' equivale a qual fração irredutível?",
    opcoes: [
      { label: "A", valor: "1/5" },
      { label: "B", valor: "1/4" },
      { label: "C", valor: "2/5" },
      { label: "D", valor: "1/3" },
      { label: "E", valor: "3/4" },
    ],
    correta: "B",
    explicacao: "25% = 25/100 = 1/4.",
  },
  {
    id: 102,
    pergunta:
      "A Petrobras anunciou aumento de 15% no salário base de R$ 4.000. Qual o novo salário?",
    opcoes: [
      { label: "A", valor: "R$ 4.150" },
      { label: "B", valor: "R$ 4.400" },
      { label: "C", valor: "R$ 4.600" },
      { label: "D", valor: "R$ 4.500" },
      { label: "E", valor: "R$ 5.000" },
    ],
    correta: "C",
    explicacao: "4000 × 1,15 = R$ 4.600.",
  },
  {
    id: 103,
    pergunta: "0,035 equivale a qual porcentagem?",
    opcoes: [
      { label: "A", valor: "0,35%" },
      { label: "B", valor: "3,5%" },
      { label: "C", valor: "35%" },
      { label: "D", valor: "0,035%" },
      { label: "E", valor: "350%" },
    ],
    correta: "B",
    explicacao: "0,035 × 100 = 3,5%.",
  },
  {
    id: 104,
    pergunta: "Para converter uma fração em porcentagem, multiplicamos por:",
    opcoes: [
      { label: "A", valor: "10" },
      { label: "B", valor: "1000" },
      { label: "C", valor: "100" },
      { label: "D", valor: "50" },
      { label: "E", valor: "Depende da fração" },
    ],
    correta: "C",
    explicacao: "Percentual = fração × 100.",
  },
  {
    id: 105,
    pergunta: "Qual é 30% de 250?",
    opcoes: [
      { label: "A", valor: "65" },
      { label: "B", valor: "70" },
      { label: "C", valor: "75" },
      { label: "D", valor: "80" },
      { label: "E", valor: "85" },
    ],
    correta: "C",
    explicacao: "250 × 0,30 = 75.",
  },
  {
    id: 106,
    pergunta: "A fração 3/8 equivale a que porcentagem?",
    opcoes: [
      { label: "A", valor: "35%" },
      { label: "B", valor: "37,5%" },
      { label: "C", valor: "38%" },
      { label: "D", valor: "40%" },
      { label: "E", valor: "33,3%" },
    ],
    correta: "B",
    explicacao: "3 ÷ 8 = 0,375 → 37,5%.",
  },
];

const QUIZ_AUMENTOS_POOL: QuizQuestion[] = [
  {
    id: 201,
    pergunta:
      "Um produto custava R$ 80 e sofreu aumento de 25%. Qual o fator multiplicador?",
    opcoes: [
      { label: "A", valor: "0,25" },
      { label: "B", valor: "1,25" },
      { label: "C", valor: "0,75" },
      { label: "D", valor: "1,025" },
      { label: "E", valor: "2,5" },
    ],
    correta: "B",
    explicacao: "Aumento de p% → fator = 1 + p/100 = 1 + 0,25 = 1,25.",
  },
  {
    id: 202,
    pergunta:
      "O barril de petróleo caiu 20% em relação a US$ 100. Qual o novo preço?",
    opcoes: [
      { label: "A", valor: "US$ 80" },
      { label: "B", valor: "US$ 90" },
      { label: "C", valor: "US$ 75" },
      { label: "D", valor: "US$ 70" },
      { label: "E", valor: "US$ 85" },
    ],
    correta: "A",
    explicacao: "100 × (1 - 0,20) = 100 × 0,80 = US$ 80.",
  },
  {
    id: 203,
    pergunta:
      "Um item custava R$ 200, aumentou 50% e depois recebeu desconto de 50%. O preço final é:",
    opcoes: [
      { label: "A", valor: "R$ 200" },
      { label: "B", valor: "R$ 150" },
      { label: "C", valor: "R$ 100" },
      { label: "D", valor: "R$ 175" },
      { label: "E", valor: "R$ 250" },
    ],
    correta: "B",
    explicacao:
      "200 × 1,50 = 300. Depois: 300 × 0,50 = R$ 150. Aumentos e descontos sucessivos NÃO se anulam!",
  },
  {
    id: 204,
    pergunta: "O fator multiplicador de um desconto de 40% é:",
    opcoes: [
      { label: "A", valor: "0,40" },
      { label: "B", valor: "1,40" },
      { label: "C", valor: "0,60" },
      { label: "D", valor: "1,60" },
      { label: "E", valor: "0,04" },
    ],
    correta: "C",
    explicacao: "Desconto de p% → fator = 1 - p/100 = 1 - 0,40 = 0,60.",
  },
  {
    id: 205,
    pergunta:
      "Dois aumentos sucessivos de 10% equivalem a um aumento total de:",
    opcoes: [
      { label: "A", valor: "20%" },
      { label: "B", valor: "21%" },
      { label: "C", valor: "22%" },
      { label: "D", valor: "19%" },
      { label: "E", valor: "11%" },
    ],
    correta: "B",
    explicacao:
      "1,10 × 1,10 = 1,21. Portanto aumento de 21%. Os juros se compõem!",
  },
  {
    id: 206,
    pergunta:
      "Um salário sofreu reajuste de 8% seguido de outro de 5%. O reajuste total equivale a:",
    opcoes: [
      { label: "A", valor: "13%" },
      { label: "B", valor: "13,4%" },
      { label: "C", valor: "12,6%" },
      { label: "D", valor: "40%" },
      { label: "E", valor: "13,04%" },
    ],
    correta: "B",
    explicacao: "1,08 × 1,05 = 1,134. Aumento total = 13,4%.",
  },
];

const QUIZ_VARIACAO_POOL: QuizQuestion[] = [
  {
    id: 301,
    pergunta:
      "O preço do gás subiu de R$ 50 para R$ 65. A variação percentual foi de:",
    opcoes: [
      { label: "A", valor: "15%" },
      { label: "B", valor: "25%" },
      { label: "C", valor: "30%" },
      { label: "D", valor: "20%" },
      { label: "E", valor: "35%" },
    ],
    correta: "C",
    explicacao: "Variação = (65-50)/50 × 100 = 15/50 × 100 = 30%.",
  },
  {
    id: 302,
    pergunta:
      "Uma ação da Petrobras caiu de R$ 40 para R$ 32. Qual o percentual de queda?",
    opcoes: [
      { label: "A", valor: "8%" },
      { label: "B", valor: "15%" },
      { label: "C", valor: "20%" },
      { label: "D", valor: "25%" },
      { label: "E", valor: "32%" },
    ],
    correta: "C",
    explicacao: "(40-32)/40 × 100 = 8/40 × 100 = 20%.",
  },
  {
    id: 303,
    pergunta:
      "Um preço era R$ 250 e hoje é R$ 200. Para voltar ao preço original, é preciso um aumento de:",
    opcoes: [
      { label: "A", valor: "20%" },
      { label: "B", valor: "25%" },
      { label: "C", valor: "30%" },
      { label: "D", valor: "50%" },
      { label: "E", valor: "10%" },
    ],
    correta: "B",
    explicacao: "De 200 para 250: (250-200)/200 × 100 = 50/200 × 100 = 25%.",
  },
  {
    id: 304,
    pergunta:
      "A produção passou de 1000 para 1350 barris. A variação percentual foi de:",
    opcoes: [
      { label: "A", valor: "30%" },
      { label: "B", valor: "35%" },
      { label: "C", valor: "25%" },
      { label: "D", valor: "13,5%" },
      { label: "E", valor: "40%" },
    ],
    correta: "B",
    explicacao: "(1350-1000)/1000 × 100 = 350/1000 × 100 = 35%.",
  },
  {
    id: 305,
    pergunta: "Para desfazer um desconto de 20%, o aumento necessário é de:",
    opcoes: [
      { label: "A", valor: "20%" },
      { label: "B", valor: "22%" },
      { label: "C", valor: "25%" },
      { label: "D", valor: "30%" },
      { label: "E", valor: "15%" },
    ],
    correta: "C",
    explicacao:
      "Se desceu 20% (fator 0,80), para voltar: 1/0,80 = 1,25. Portanto 25%.",
  },
];

const QUIZ_APLICACOES_POOL: QuizQuestion[] = [
  {
    id: 401,
    pergunta:
      "Em uma prova com 60 questões, o candidato acertou 75%. Quantas questões acertou?",
    opcoes: [
      { label: "A", valor: "40" },
      { label: "B", valor: "42" },
      { label: "C", valor: "45" },
      { label: "D", valor: "48" },
      { label: "E", valor: "50" },
    ],
    correta: "C",
    explicacao: "60 × 0,75 = 45 questões.",
  },
  {
    id: 402,
    pergunta:
      "Uma equipe de 200 funcionários teve 12% de absenteísmo no mês. Quantos faltaram?",
    opcoes: [
      { label: "A", valor: "12" },
      { label: "B", valor: "20" },
      { label: "C", valor: "24" },
      { label: "D", valor: "30" },
      { label: "E", valor: "36" },
    ],
    correta: "C",
    explicacao: "200 × 0,12 = 24 funcionários.",
  },
  {
    id: 403,
    pergunta: "Se 60 é 40% de um número N, qual é N?",
    opcoes: [
      { label: "A", valor: "100" },
      { label: "B", valor: "120" },
      { label: "C", valor: "150" },
      { label: "D", valor: "200" },
      { label: "E", valor: "240" },
    ],
    correta: "C",
    explicacao: "N × 0,40 = 60 -> N = 60 / 0,40 = 150.",
  },
  {
    id: 404,
    pergunta:
      "Em um tanque de 8.000 litros, 35% é de óleo diesel. Qual o volume de diesel em litros?",
    opcoes: [
      { label: "A", valor: "2.400" },
      { label: "B", valor: "2.600" },
      { label: "C", valor: "2.800" },
      { label: "D", valor: "3.000" },
      { label: "E", valor: "3.200" },
    ],
    correta: "C",
    explicacao: "8000 × 0,35 = 2.800 litros.",
  },
];

const QUIZ_FINAL_POOL: QuizQuestion[] = [
  {
    id: 501,
    pergunta:
      "Um investimento rendeu 5% no primeiro mês e 8% no segundo, sobre o montante atualizado. Se o capital inicial era R$ 10.000, qual o montante ao final dos dois meses?",
    opcoes: [
      { label: "A", valor: "R$ 11.300" },
      { label: "B", valor: "R$ 11.340" },
      { label: "C", valor: "R$ 11.400" },
      { label: "D", valor: "R$ 11.500" },
      { label: "E", valor: "R$ 11.200" },
    ],
    correta: "B",
    explicacao: "10000 × 1,05 = 10500. Depois: 10500 × 1,08 = 11340.",
  },
  {
    id: 502,
    pergunta:
      "Uma peça custava R$ 120. Sofreu aumento de 25%, depois desconto de 20%. Qual o preço final?",
    opcoes: [
      { label: "A", valor: "R$ 120" },
      { label: "B", valor: "R$ 115" },
      { label: "C", valor: "R$ 110" },
      { label: "D", valor: "R$ 108" },
      { label: "E", valor: "R$ 100" },
    ],
    correta: "A",
    explicacao:
      "120 × 1,25 = 150. Depois: 150 × 0,80 = R$ 120. Coincidência numérica aqui!",
  },
  {
    id: 503,
    pergunta:
      "Em uma plataforma, a taxa de acidentes caiu de 5% para 2% do total de 1000 colaboradores. A redução absoluta de acidentes foi de:",
    opcoes: [
      { label: "A", valor: "3 pessoas" },
      { label: "B", valor: "20 pessoas" },
      { label: "C", valor: "30 pessoas" },
      { label: "D", valor: "50 pessoas" },
      { label: "E", valor: "300 pessoas" },
    ],
    correta: "C",
    explicacao:
      "Antes: 1000 × 0,05 = 50. Depois: 1000 × 0,02 = 20. Diferença: 50 - 20 = 30.",
  },
  {
    id: 504,
    pergunta:
      "A meta de produção era 10.000 barris. Atingiram 12.500. Superaram a meta em quantos por cento?",
    opcoes: [
      { label: "A", valor: "20%" },
      { label: "B", valor: "25%" },
      { label: "C", valor: "30%" },
      { label: "D", valor: "15%" },
      { label: "E", valor: "12,5%" },
    ],
    correta: "B",
    explicacao: "(12500-10000)/10000 × 100 = 2500/10000 × 100 = 25%.",
  },
];

// ── COMPONENT ───────────────────────────────────────────────────────────

export default function AulaPorcentagem({
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

  const [quizConceitos] = useState(() =>
    getRandomQuestions(QUIZ_CONCEITOS_POOL, 6),
  );
  const [quizAumentos] = useState(() =>
    getRandomQuestions(QUIZ_AUMENTOS_POOL, 6),
  );
  const [quizVariacao] = useState(() =>
    getRandomQuestions(QUIZ_VARIACAO_POOL, 5),
  );
  const [quizAplicacoes] = useState(() =>
    getRandomQuestions(QUIZ_APLICACOES_POOL, 4),
  );
  const [quizFinal] = useState(() => getRandomQuestions(QUIZ_FINAL_POOL, 4));

  const isModuleUnlocked = (index: number) => {
    return true; // DESBLOQUEADO PARA REVISÃO DO USUÁRIO
  };

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
    { id: "modulo-1", label: "Módulo 1", titulo: "Conceitos Básicos" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Aumentos e Descontos" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Variação Percentual" },
    { id: "modulo-4", label: "Módulo 4", titulo: "Aplicações Práticas" },
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
      {/* ═══ MÓDULO 1: CONCEITOS BÁSICOS ═══ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="Fundamentos de Porcentagem"
          descricao="Conversões, cálculos do valor percentual e a base de tudo."
          gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="O que é Porcentagem?"
              description="Uma fração com denominador 100."
              variant="emerald"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Definição e Conversões"
              icone="💯"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Conceito Fundamental",
                  icone: "💡",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        <strong>Porcentagem</strong> significa &quot;por
                        cento&quot; — uma razão cujo denominador é 100.
                      </p>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center">
                          <p className="font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                            Fração
                          </p>
                          <p className="text-lg font-mono">25/100</p>
                        </div>
                        <div className="p-4 bg-teal-500/10 rounded-xl border border-teal-500/20 text-center">
                          <p className="font-bold text-teal-700 dark:text-teal-400 mb-1">
                            Decimal
                          </p>
                          <p className="text-lg font-mono">0,25</p>
                        </div>
                        <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-center">
                          <p className="font-bold text-cyan-700 dark:text-cyan-400 mb-1">
                            Porcentagem
                          </p>
                          <p className="text-lg font-mono">25%</p>
                        </div>
                      </div>
                      <AlertBox tipo="info" titulo="Regra rápida">
                        Multiplicar por 100 → fração vira %. Dividir por 100 → %
                        vira decimal.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-1" className="mt-16">
            <QuizInterativo
              questoes={quizConceitos}
              titulo="Quiz - Conceitos de Porcentagem"
              icone="🧠"
              numero={1}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 2: AUMENTOS E DESCONTOS ═══ */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <ModuleBanner
          numero={2}
          titulo="Aumentos e Descontos Sucessivos"
          descricao="O fator multiplicador: a arma secreta dos aprovados."
          gradiente="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="O Fator Multiplicador"
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Aumento e Desconto"
              icone="📊"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Fator de Aumento",
                  icone: "📈",
                  conteudo: (
                    <div className="space-y-3">
                      <p>
                        Aumento de <strong>p%</strong>: multiplique por{" "}
                        <strong>(1 + p/100)</strong>.
                      </p>
                      <div className="bg-green-500/10 p-4 rounded-xl border border-green-500/20">
                        <p className="text-sm">
                          <strong>Exemplo:</strong> Aumento de 15% → fator = 1 +
                          0,15 = <strong>1,15</strong>
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Fator de Desconto",
                  icone: "📉",
                  conteudo: (
                    <div className="space-y-3">
                      <p>
                        Desconto de <strong>p%</strong>: multiplique por{" "}
                        <strong>(1 - p/100)</strong>.
                      </p>
                      <div className="bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                        <p className="text-sm">
                          <strong>Exemplo:</strong> Desconto de 30% → fator = 1
                          - 0,30 = <strong>0,70</strong>
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Sucessivos: A Pegadinha!",
                  icone: "⚠️",
                  conteudo: (
                    <div className="space-y-3">
                      <AlertBox tipo="warning" titulo="Cuidado!">
                        Aumentos e descontos sucessivos NÃO se somam
                        algebricamente. Devemos multiplicar os fatores!
                      </AlertBox>
                      <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20">
                        <p className="text-sm">
                          <strong>+50% depois -50%</strong> ≠ 0%. Na verdade:
                          1,50 × 0,50 = 0,75 → <strong>queda de 25%!</strong>
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-2" className="mt-16">
            <QuizInterativo
              questoes={quizAumentos}
              titulo="Quiz - Aumentos e Descontos"
              icone="🧠"
              numero={2}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 3: VARIAÇÃO PERCENTUAL ═══ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <ModuleBanner
          numero={3}
          titulo="Variação Percentual"
          descricao="Calcule quanto subiu ou caiu, em porcentagem."
          gradiente="bg-gradient-to-br from-amber-600 via-orange-600 to-red-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="A Fórmula da Variação"
              variant="amber"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Variação = (Final - Inicial) / Inicial × 100"
              icone="📐"
              corIndicador="bg-amber-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "A Fórmula",
                  icone: "🔑",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="p-5 bg-amber-500/10 rounded-xl border border-amber-500/20 text-center">
                        <p className="text-lg font-bold font-mono">
                          Variação % = ((Vf - Vi) / Vi) × 100
                        </p>
                      </div>
                      <AlertBox tipo="info" titulo="Atenção">
                        O denominador é SEMPRE o valor INICIAL (anterior). Esse
                        é o erro mais comum em provas!
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-3" className="mt-16">
            <QuizInterativo
              questoes={quizVariacao}
              titulo="Quiz - Variação Percentual"
              icone="🧠"
              numero={3}
              variant="amber"
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 4: APLICAÇÕES ═══ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner
          numero={4}
          titulo="Aplicações Práticas"
          descricao="Porcentagem no contexto operacional da Petrobras."
          gradiente="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Problemas do Dia a Dia"
              variant="violet"
              className="mb-6"
            />
            <CardCarousel
              cards={[
                {
                  titulo: "Calcular o Percentual",
                  descricao: "Quanto é X% de N? → N × (X/100)",
                  icone: "🔢",
                },
                {
                  titulo: "Descobrir a Base",
                  descricao: "X é P% de quanto? → N = X / (P/100)",
                  icone: "🎯",
                },
                {
                  titulo: "Descobrir a Taxa",
                  descricao: "X é quantos % de N? → P = (X/N) × 100",
                  icone: "📊",
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-4" className="mt-16">
            <QuizInterativo
              questoes={quizAplicacoes}
              titulo="Quiz - Aplicações Práticas"
              icone="🔥"
              numero={4}
              variant="violet"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 5: DESAFIO FINAL ═══ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="Desafio Final: Porcentagem Avançada"
          descricao="Aumentos e descontos sucessivos, juros e problemas mistos."
          gradiente="bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700"
        />
        <div className="space-y-[50px]">
          <section id="quiz-modulo-5" className="mt-16">
            <QuizInterativo
              questoes={quizFinal}
              titulo="Desafio Final - Porcentagem"
              icone="🏆"
              numero={5}
              variant="rose"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
          {completedModules.has("modulo-5") && (
            <div className="mt-16 p-12 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[2rem] text-white text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="relative z-10 space-y-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-5xl mx-auto backdrop-blur-sm border border-white/30 animate-bounce">
                  💯
                </div>
                <h3 className="text-4xl font-black italic tracking-tighter">
                  APROVADO EM PORCENTAGEM!
                </h3>
                <p className="text-xl opacity-90 max-w-xl mx-auto">
                  Porcentagem domina as provas da CESGRANRIO. Parabéns por
                  concluir!
                </p>
              </div>
            </div>
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
