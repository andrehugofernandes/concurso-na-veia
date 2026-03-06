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
  QUIZ_M2_AUMENTOS,
  QUIZ_M3_VARIACAO,
  QUIZ_M4_APLICACOES,
  QUIZ_M5_FINAL,
  QUIZ_M6_COMPOSTA,
  QUIZ_M7_CALCULO_REVERSO,
  QUIZ_M8_REGRA_TRES,
  QUIZ_M9_FINANCEIRO,
  QUIZ_M10_SIMULADO,
} from "./data/porcentagem-quizzes";

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

  const [quizM1] = useState(() => getRandomQuestions(QUIZ_M1_CONCEITOS, 6));
  const [quizM2] = useState(() => getRandomQuestions(QUIZ_M2_AUMENTOS, 6));
  const [quizM3] = useState(() => getRandomQuestions(QUIZ_M3_VARIACAO, 6));
  const [quizM4] = useState(() => getRandomQuestions(QUIZ_M4_APLICACOES, 5));
  const [quizM5] = useState(() => getRandomQuestions(QUIZ_M5_FINAL, 5));
  const [quizM6] = useState(() => getRandomQuestions(QUIZ_M6_COMPOSTA, 6));
  const [quizM7] = useState(() =>
    getRandomQuestions(QUIZ_M7_CALCULO_REVERSO, 6),
  );
  const [quizM8] = useState(() => getRandomQuestions(QUIZ_M8_REGRA_TRES, 6));
  const [quizM9] = useState(() => getRandomQuestions(QUIZ_M9_FINANCEIRO, 5));
  const [quizM10] = useState(() => getRandomQuestions(QUIZ_M10_SIMULADO, 6));

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
        "modulo-6",
        "modulo-7",
        "modulo-8",
        "modulo-9",
        "modulo-10",
      ].findIndex((m) => m === moduleId);
      onUpdateProgress?.(Math.round(((idx + 1) / 10) * 100));
      if (idx < 9) setTimeout(() => setActiveTab(`modulo-${idx + 2}`), 1500);
    }
  };

  useEffect(() => {
    if (currentProgress && currentProgress > 0) {
      const count = Math.floor((currentProgress / 100) * 10);
      const s = new Set<string>();
      for (let i = 1; i <= count; i++) s.add(`modulo-${i}`);
      setCompletedModules(s);
    }
  }, [currentProgress]);

  const MODULE_DEFS = [
    { id: "modulo-1", label: "Módulo 1", titulo: "Fundamentos" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Aumentos e Descontos" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Variação %" },
    { id: "modulo-4", label: "Módulo 4", titulo: "Aplicações" },
    { id: "modulo-5", label: "Módulo 5", titulo: "Desafio" },
    { id: "modulo-6", label: "Módulo 6", titulo: "% Composta" },
    { id: "modulo-7", label: "Módulo 7", titulo: "Cálculo Reverso" },
    { id: "modulo-8", label: "Módulo 8", titulo: "Regra de Três" },
    { id: "modulo-9", label: "Módulo 9", titulo: "Financeiro" },
    { id: "modulo-10", label: "Módulo 10", titulo: "Simulado Final" },
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
      {/* ═══════════════════════════════════════════════════════════════════
          MÓDULO 1 — FUNDAMENTOS DE PORCENTAGEM
      ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="Fundamentos de Porcentagem"
          descricao="O alicerce: conversões, cálculos e a lógica por trás do símbolo %."
          gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="O que é Porcentagem?"
              description="Uma razão com denominador 100 — a linguagem universal dos números."
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
                        <strong>Porcentagem</strong> significa literalmente{" "}
                        <em>&quot;por cento&quot;</em> — uma razão cujo
                        denominador é sempre 100. É a forma mais usada no mundo
                        real para expressar proporções.
                      </p>
                      <div className="p-5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center">
                        <p className="text-lg font-bold font-mono mb-2">
                          p% = p/100
                        </p>
                        <p className="text-sm opacity-70">
                          25% = 25/100 = 0,25 = 1/4
                        </p>
                      </div>
                      <p>
                        Na Petrobras, porcentagem aparece em{" "}
                        <strong>tudo</strong>: eficiência de equipamentos (92%),
                        pureza de combustíveis (99,5%), taxas de rendimento
                        financeiro (CDI + 2%).
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Conversões Entre Formas",
                  icone: "🔄",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center">
                          <p className="font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                            Fração → %
                          </p>
                          <p className="font-mono">× 100</p>
                          <p className="text-sm mt-2">3/4 × 100 = 75%</p>
                        </div>
                        <div className="p-4 bg-teal-500/10 rounded-xl border border-teal-500/20 text-center">
                          <p className="font-bold text-teal-700 dark:text-teal-400 mb-1">
                            % → Decimal
                          </p>
                          <p className="font-mono">÷ 100</p>
                          <p className="text-sm mt-2">75% ÷ 100 = 0,75</p>
                        </div>
                        <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-center">
                          <p className="font-bold text-cyan-700 dark:text-cyan-400 mb-1">
                            Decimal → %
                          </p>
                          <p className="font-mono">× 100</p>
                          <p className="text-sm mt-2">0,035 × 100 = 3,5%</p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        A banca adora confundir 0,035 com 35%. Sempre conte as
                        casas decimais: mover a vírgula 2 casas para a direita!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Tabela de Equivalências Essenciais",
                  icone: "📋",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Memorize estas equivalências — elas economizam minutos
                        preciosos na prova:
                      </p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="p-2 text-left font-bold">
                                Fração
                              </th>
                              <th className="p-2 text-left font-bold">
                                Decimal
                              </th>
                              <th className="p-2 text-left font-bold">
                                Porcentagem
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ["1/2", "0,50", "50%"],
                              ["1/3", "0,333...", "33,33%"],
                              ["1/4", "0,25", "25%"],
                              ["1/5", "0,20", "20%"],
                              ["1/8", "0,125", "12,5%"],
                              ["1/10", "0,10", "10%"],
                              ["2/3", "0,666...", "66,67%"],
                              ["3/4", "0,75", "75%"],
                              ["3/8", "0,375", "37,5%"],
                            ].map(([f, d, p], i) => (
                              <tr key={i} className="border-b border-border/50">
                                <td className="p-2 font-mono">{f}</td>
                                <td className="p-2 font-mono">{d}</td>
                                <td className="p-2 font-mono font-bold">{p}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <AlertBox tipo="info" titulo="Dica para a Prova">
                        1/3 = 33,33...% (dízima periódica) — NÃO é 30%! Essa é
                        uma das pegadinhas mais comuns.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Os 3 Tipos de Problema"
              description="Toda questão de porcentagem se resume a um destes três casos."
              variant="emerald"
              className="mb-6"
            />
            <CardCarousel
              cards={[
                {
                  titulo: "Tipo 1: Calcular o Valor",
                  descricao:
                    '"Quanto é 30% de 250?" → 250 × 0,30 = 75. Multiplique o total pelo decimal.',
                  icone: "🔢",
                },
                {
                  titulo: "Tipo 2: Descobrir a Base",
                  descricao:
                    '"60 é 40% de quanto?" → 60 ÷ 0,40 = 150. Divida a parte pelo decimal.',
                  icone: "🎯",
                },
                {
                  titulo: "Tipo 3: Descobrir a Taxa",
                  descricao:
                    '"45 é quantos % de 120?" → (45÷120) × 100 = 37,5%. Divida e multiplique por 100.',
                  icone: "📊",
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-1" className="mt-16">
            <QuizInterativo
              questoes={quizM1}
              titulo="Quiz - Conceitos de Porcentagem"
              icone="🧠"
              numero={1}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════
          MÓDULO 2 — AUMENTOS E DESCONTOS SUCESSIVOS
      ═══════════════════════════════════════════════════════════════════ */}
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
              description="A técnica que elimina cálculos intermediários."
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Aumento, Desconto e Sucessivos"
              icone="📊"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Regra do Fator",
                  icone: "🔑",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-5 bg-green-500/10 rounded-xl border border-green-500/20 text-center">
                          <p className="font-bold text-green-700 dark:text-green-400 text-lg mb-1">
                            📈 Aumento de p%
                          </p>
                          <p className="font-mono text-xl font-bold">
                            Fator = 1 + p/100
                          </p>
                          <p className="text-sm mt-2 opacity-80">
                            +15% → 1,15 | +8% → 1,08
                          </p>
                        </div>
                        <div className="p-5 bg-red-500/10 rounded-xl border border-red-500/20 text-center">
                          <p className="font-bold text-red-700 dark:text-red-400 text-lg mb-1">
                            📉 Desconto de p%
                          </p>
                          <p className="font-mono text-xl font-bold">
                            Fator = 1 − p/100
                          </p>
                          <p className="text-sm mt-2 opacity-80">
                            -20% → 0,80 | -30% → 0,70
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Aumentos e Descontos SUCESSIVOS",
                  icone: "⚠️",
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox
                        tipo="warning"
                        titulo="PEGADINHA #1 da CESGRANRIO"
                      >
                        Aumentos e descontos sucessivos NÃO se somam
                        algebricamente! Devemos MULTIPLICAR os fatores.
                      </AlertBox>
                      <div className="p-5 bg-amber-500/10 rounded-xl border border-amber-500/20">
                        <p className="font-bold mb-2">
                          Exemplo clássico de prova:
                        </p>
                        <p>
                          Um item aumentou 50% e depois teve desconto de 50%.
                          Voltou ao preço original?
                        </p>
                        <p className="font-mono mt-2">
                          <strong>NÃO!</strong> 1,50 × 0,50 = 0,75 → queda de
                          25%!
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Fórmula para Desfazer",
                  icone: "↩️",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                          <p className="font-bold text-sm mb-1">
                            Desfazer desconto de d%:
                          </p>
                          <p className="font-mono">Aumento = d/(100−d) × 100</p>
                          <p className="text-sm mt-1">
                            Desc. 20% → Aum. 20/80×100 = <strong>25%</strong>
                          </p>
                        </div>
                        <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                          <p className="font-bold text-sm mb-1">
                            Desfazer aumento de a%:
                          </p>
                          <p className="font-mono">
                            Desconto = a/(100+a) × 100
                          </p>
                          <p className="text-sm mt-1">
                            Aum. 25% → Desc. 25/125×100 = <strong>20%</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-2" className="mt-16">
            <QuizInterativo
              questoes={quizM2}
              titulo="Quiz - Aumentos e Descontos"
              icone="🧠"
              numero={2}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════
          MÓDULO 3 — VARIAÇÃO PERCENTUAL
      ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <ModuleBanner
          numero={3}
          titulo="Variação Percentual"
          descricao="Calcule quanto subiu ou caiu — e entenda a diferença entre variação absoluta e relativa."
          gradiente="bg-gradient-to-br from-amber-600 via-orange-600 to-red-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="A Fórmula da Variação"
              description="O denominador é SEMPRE o valor INICIAL."
              variant="amber"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Variação Percentual"
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
                        <p className="text-xl font-bold font-mono">
                          Variação % = (V<sub>final</sub> − V<sub>inicial</sub>)
                          / V<sub>inicial</sub> × 100
                        </p>
                      </div>
                      <AlertBox tipo="warning" titulo="Regra de Ouro">
                        O denominador é SEMPRE o valor INICIAL. Usar o valor
                        final no denominador é o erro #1 em provas da
                        CESGRANRIO!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Absoluta vs. Relativa",
                  icone: "⚖️",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                          <p className="font-bold text-blue-700 dark:text-blue-400">
                            Variação ABSOLUTA
                          </p>
                          <p className="text-sm">
                            Diferença em unidades: V<sub>f</sub> − V<sub>i</sub>
                          </p>
                          <p className="text-sm mt-1 font-mono">
                            De 5% para 2% = queda de{" "}
                            <strong>3 pontos percentuais</strong>
                          </p>
                        </div>
                        <div className="p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
                          <p className="font-bold text-orange-700 dark:text-orange-400">
                            Variação RELATIVA
                          </p>
                          <p className="text-sm">
                            Diferença em % sobre o original
                          </p>
                          <p className="text-sm mt-1 font-mono">
                            De 5% para 2% = queda de <strong>60%</strong> (3/5)
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-3" className="mt-16">
            <QuizInterativo
              questoes={quizM3}
              titulo="Quiz - Variação Percentual"
              icone="🧠"
              numero={3}
              variant="amber"
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════
          MÓDULO 4 — APLICAÇÕES PRÁTICAS
      ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner
          numero={4}
          titulo="Aplicações no Contexto Industrial"
          descricao="Porcentagem em orçamentos, eficiência, composição e indicadores operacionais."
          gradiente="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Problemas Multi-Etapa"
              description="A marca registrada da CESGRANRIO: questões que exigem 2-3 cálculos encadeados."
              variant="violet"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Técnicas de Resolução"
              icone="🔧"
              corIndicador="bg-violet-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Porcentagem de Porcentagem",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-3">
                      <p>
                        A CESGRANRIO adora criar problemas com{" "}
                        <strong>porcentagens encadeadas</strong>. O segredo é
                        resolver em etapas:
                      </p>
                      <div className="p-4 bg-muted rounded-xl text-sm space-y-1">
                        <p className="font-bold">
                          Problema: O orçamento de R$ 2 milhões sofreu corte de
                          15%. Do restante, 30% vai para peças.
                        </p>
                        <p>
                          <strong>Etapa 1:</strong> 2.000.000 × 0,85 = R$
                          1.700.000
                        </p>
                        <p>
                          <strong>Etapa 2:</strong> 1.700.000 × 0,30 ={" "}
                          <strong>R$ 510.000</strong>
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Média Ponderada com %",
                  icone: "⚖️",
                  conteudo: (
                    <div className="space-y-3">
                      <div className="p-4 bg-muted rounded-xl text-sm space-y-1">
                        <p className="font-bold">
                          70% de componente A (R$ 20/L) + 30% de componente B
                          (R$ 50/L)
                        </p>
                        <p>
                          Custo: 0,70 × 20 + 0,30 × 50 = 14 + 15 ={" "}
                          <strong>R$ 29/L</strong>
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Pontos Percentuais na Prática",
                  icone: "📊",
                  conteudo: (
                    <div className="space-y-3">
                      <div className="p-4 bg-muted rounded-xl text-sm space-y-1">
                        <p className="font-bold">
                          A eficiência da caldeira caiu de 92% para 78%.
                        </p>
                        <p>
                          Queda em <strong>pontos percentuais</strong>: 92 - 78
                          = 14 p.p.
                        </p>
                        <p>
                          Queda <strong>relativa</strong>: 14/92 × 100 ≈{" "}
                          <strong>15,2%</strong>
                        </p>
                        <p className="text-amber-600 dark:text-amber-400 font-bold mt-1">
                          14 p.p. ≠ 14% e ≠ 15,2%. São três coisas diferentes!
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
              questoes={quizM4}
              titulo="Quiz - Aplicações Práticas"
              icone="🔥"
              numero={4}
              variant="violet"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════
          MÓDULO 5 — DESAFIO (QUESTÕES INTEGRADORAS)
      ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="Desafio: Porcentagem Avançada"
          descricao="Questões integradoras combinando tudo o que você aprendeu nos módulos anteriores."
          gradiente="bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Revisão Expressa"
              description="Relembre os conceitos-chave antes do desafio."
              variant="rose"
              className="mb-6"
            />
            <CardCarousel
              cards={[
                {
                  titulo: "Fator de Aumento",
                  descricao: "p% de aumento → multiplique por (1 + p/100)",
                  icone: "📈",
                },
                {
                  titulo: "Fator de Desconto",
                  descricao: "p% de desconto → multiplique por (1 − p/100)",
                  icone: "📉",
                },
                {
                  titulo: "Variação %",
                  descricao: "Sempre: (Final−Inicial)/INICIAL × 100",
                  icone: "📐",
                },
                {
                  titulo: "Sucessivos",
                  descricao:
                    "MULTIPLIQUE os fatores — nunca some os percentuais",
                  icone: "⚠️",
                },
                {
                  titulo: "p.p. ≠ %",
                  descricao:
                    "Pontos percentuais (diferença absoluta) ≠ variação relativa",
                  icone: "⚖️",
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-5" className="mt-16">
            <QuizInterativo
              questoes={quizM5}
              titulo="Desafio - Porcentagem Avançada"
              icone="🏆"
              numero={5}
              variant="rose"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════
          MÓDULO 6 — PORCENTAGEM COMPOSTA
      ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <ModuleBanner
          numero={6}
          titulo="Porcentagem Composta"
          descricao="Juros compostos, meia-vida e depreciação: quando o juro incide sobre o juro."
          gradiente="bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Juros Compostos vs. Simples"
              description="A diferença que vale bilhões nos mercados financeiros."
              variant="cyan"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Fórmula e Aplicações"
              icone="💹"
              corIndicador="bg-sky-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "A Fórmula dos Juros Compostos",
                  icone: "🔑",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-5 bg-sky-500/10 rounded-xl border border-sky-500/20 text-center">
                          <p className="font-bold text-sky-700 dark:text-sky-400 mb-1">
                            Juros SIMPLES
                          </p>
                          <p className="font-mono text-lg font-bold">
                            M = C × (1 + i × n)
                          </p>
                          <p className="text-sm mt-2 opacity-80">
                            Juro constante por período
                          </p>
                        </div>
                        <div className="p-5 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-center">
                          <p className="font-bold text-indigo-700 dark:text-indigo-400 mb-1">
                            Juros COMPOSTOS
                          </p>
                          <p className="font-mono text-lg font-bold">
                            M = C × (1 + i)ⁿ
                          </p>
                          <p className="text-sm mt-2 opacity-80">
                            Juro incide sobre juro
                          </p>
                        </div>
                      </div>
                      <AlertBox tipo="info" titulo="Onde aparece na prova">
                        A CESGRANRIO usa juros compostos em questões de
                        investimento, financiamento, depreciação composta e
                        crescimento populacional. Domine o cálculo de (1+i)ⁿ
                        para n = 2 e 3.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Meia-Vida e Depreciação",
                  icone: "⚡",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="p-4 bg-muted rounded-xl text-sm space-y-2">
                        <p className="font-bold">
                          Meia-vida: perda de 50% a cada período
                        </p>
                        <p>
                          Fator por período: 0,50. Após n períodos: C × (0,5)ⁿ
                        </p>
                        <p>
                          Exemplo: 800g com meia-vida de 10 anos → após 30
                          anos: 800 × (0,5)³ = 800 × 0,125 = <strong>100g</strong>
                        </p>
                      </div>
                      <div className="p-4 bg-muted rounded-xl text-sm space-y-2">
                        <p className="font-bold">
                          Depreciação composta: perda de d% ao ano
                        </p>
                        <p>
                          Fator por período: (1 − d/100). Após n anos: V₀ × (1
                          − d/100)ⁿ
                        </p>
                        <p>
                          Exemplo: R$ 100.000 a 20%/ano → após 2 anos: 100.000
                          × 0,80² = 100.000 × 0,64 = <strong>R$ 64.000</strong>
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-6" className="mt-16">
            <QuizInterativo
              questoes={quizM6}
              titulo="Quiz - Porcentagem Composta"
              icone="💹"
              numero={6}
              variant="cyan"
              onComplete={(score) => handleModuleComplete("modulo-6", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════
          MÓDULO 7 — CÁLCULO REVERSO
      ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <ModuleBanner
          numero={7}
          titulo="Cálculo Reverso"
          descricao="Encontre o valor original: trabalhe de trás para frente usando a divisão pelo fator."
          gradiente="bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-600"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Encontrando o Valor Original"
              description="A regra é simples: divida pelo fator, não some/subtraia a porcentagem."
              variant="amber"
              className="mb-6"
            />
            <ContentAccordion
              titulo="A Técnica do Fator Reverso"
              icone="↩️"
              corIndicador="bg-orange-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Princípio do Cálculo Reverso",
                  icone: "🔑",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="p-5 bg-orange-500/10 rounded-xl border border-orange-500/20">
                        <p className="font-bold mb-3">
                          Se o preço FINAL é conhecido e o % aplicado é
                          conhecido, o preço ORIGINAL é:
                        </p>
                        <p className="font-mono text-lg text-center">
                          Original = Final ÷ Fator
                        </p>
                        <div className="grid md:grid-cols-2 gap-3 mt-3 text-sm">
                          <div className="p-3 bg-background rounded-lg">
                            <p className="font-bold">Após desconto de 20%:</p>
                            <p>Fator = 0,80</p>
                            <p>Original = Final ÷ 0,80</p>
                          </div>
                          <div className="p-3 bg-background rounded-lg">
                            <p className="font-bold">Após aumento de 25%:</p>
                            <p>Fator = 1,25</p>
                            <p>Original = Final ÷ 1,25</p>
                          </div>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Erro Fatal">
                        Para encontrar o original após desconto de 20%, NÃO
                        some 20% ao preço final! Ex: Final = R$ 1.600 (após
                        -20%). Original ≠ 1.600 + 320 = 1.920. Original =
                        1.600 ÷ 0,80 = R$ 2.000.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplos Resolvidos",
                  icone: "📝",
                  conteudo: (
                    <div className="space-y-3">
                      <div className="p-4 bg-muted rounded-xl text-sm space-y-2">
                        <p className="font-bold">
                          Após 2 descontos (10% e 20%), produto custou R$ 360.
                          Qual o original?
                        </p>
                        <p>Fator total: 0,90 × 0,80 = 0,72</p>
                        <p>
                          Original = 360 ÷ 0,72 = <strong>R$ 500</strong>
                        </p>
                        <p>Verificação: 500 × 0,72 = 360 ✓</p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-7" className="mt-16">
            <QuizInterativo
              questoes={quizM7}
              titulo="Quiz - Cálculo Reverso"
              icone="↩️"
              numero={7}
              variant="amber"
              onComplete={(score) => handleModuleComplete("modulo-7", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════
          MÓDULO 8 — REGRA DE TRÊS COM PORCENTAGEM
      ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <ModuleBanner
          numero={8}
          titulo="Regra de Três com Porcentagem"
          descricao="Proporcionalidade direta e inversa aplicada a contextos percentuais e industriais."
          gradiente="bg-gradient-to-br from-teal-600 via-emerald-600 to-green-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Direta vs. Inversa"
              description="Identifique o tipo de proporção antes de montar a regra de três."
              variant="emerald"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Tipos de Proporção"
              icone="⚖️"
              corIndicador="bg-teal-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Proporção Direta",
                  icone: "📈",
                  conteudo: (
                    <div className="space-y-3">
                      <p>
                        <strong>Direta:</strong> quando uma grandeza aumenta, a
                        outra também aumenta na mesma proporção.
                      </p>
                      <div className="p-4 bg-teal-500/10 rounded-xl border border-teal-500/20 text-sm">
                        <p className="font-bold">
                          Mais bombas → mais vazão | Mais funcionários → mais
                          produção
                        </p>
                        <p className="font-mono mt-2">
                          A₁/B₁ = A₂/B₂ (produto cruzado)
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Proporção Inversa",
                  icone: "📉",
                  conteudo: (
                    <div className="space-y-3">
                      <p>
                        <strong>Inversa:</strong> quando uma grandeza aumenta, a
                        outra diminui.
                      </p>
                      <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-sm">
                        <p className="font-bold">
                          Mais técnicos → menos dias | Mais velocidade → menos
                          tempo
                        </p>
                        <p className="font-mono mt-2">A₁ × B₁ = A₂ × B₂</p>
                        <p className="mt-2">
                          Ex: 12 técnicos × 30 dias = 18 técnicos × x → x = 20
                          dias
                        </p>
                      </div>
                      <AlertBox tipo="info" titulo="Como identificar">
                        Se o enunciado diz &quot;mais X, menos Y&quot; →
                        inversa. Se &quot;mais X, mais Y&quot; → direta. A
                        CESGRANRIO sempre dá pistas no texto.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-8" className="mt-16">
            <QuizInterativo
              questoes={quizM8}
              titulo="Quiz - Regra de Três"
              icone="⚖️"
              numero={8}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-8", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════
          MÓDULO 9 — APLICAÇÕES FINANCEIRAS
      ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <ModuleBanner
          numero={9}
          titulo="Aplicações Financeiras"
          descricao="Salário líquido, IR, INSS, impostos embutidos e descontos comerciais."
          gradiente="bg-gradient-to-br from-purple-600 via-violet-600 to-fuchsia-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Descontos em Cadeia"
              description="INSS → IR → líquido: encadeamento de descontos sobre o salário."
              variant="violet"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Estrutura de Remuneração"
              icone="💰"
              corIndicador="bg-purple-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Salário Bruto → Líquido",
                  icone: "💵",
                  conteudo: (
                    <div className="space-y-3">
                      <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 text-sm space-y-2">
                        <p className="font-bold">
                          Exemplo: Bruto = R$ 5.000 | INSS 11% | IR 7,5%
                        </p>
                        <p>INSS: 5.000 × 0,11 = R$ 550</p>
                        <p>IR: 5.000 × 0,075 = R$ 375</p>
                        <p>
                          Líquido: 5.000 - 550 - 375 ={" "}
                          <strong>R$ 4.075</strong>
                        </p>
                        <p className="opacity-70">
                          Fator direto: 5.000 × (1 - 0,11 - 0,075) = 5.000 ×
                          0,815 = R$ 4.075
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Imposto Incluso vs. Por Fora",
                  icone: "🧾",
                  conteudo: (
                    <div className="space-y-3">
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                          <p className="font-bold text-red-700 dark:text-red-400">
                            Imposto INCLUSO (por dentro)
                          </p>
                          <p className="mt-1">
                            Preço final JÁ contém o imposto
                          </p>
                          <p className="font-mono mt-2">
                            Valor sem imposto = Preço ÷ (1 + alíquota)
                          </p>
                          <p className="mt-1">
                            Ex: R$ 800 com 12% → 800 ÷ 1,12 ≈ R$ 714,29
                          </p>
                        </div>
                        <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                          <p className="font-bold text-green-700 dark:text-green-400">
                            Imposto POR FORA
                          </p>
                          <p className="mt-1">Imposto é adicionado ao preço</p>
                          <p className="font-mono mt-2">
                            Preço final = Base × (1 + alíquota)
                          </p>
                          <p className="mt-1">
                            Ex: R$ 714 + 12% → 714 × 1,12 ≈ R$ 800
                          </p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha frequente">
                        ICMS no Brasil é calculado &quot;por dentro&quot;
                        (incluso). A CESGRANRIO testa se você sabe que 800 com
                        12% incluso não dá 800 × 0,88 = 704. O correto é 800 ÷
                        1,12 ≈ 714,29.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-9" className="mt-16">
            <QuizInterativo
              questoes={quizM9}
              titulo="Quiz - Aplicações Financeiras"
              icone="💰"
              numero={9}
              variant="violet"
              onComplete={(score) => handleModuleComplete("modulo-9", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════
          MÓDULO 10 — SIMULADO FINAL CESGRANRIO
      ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <ModuleBanner
          numero={10}
          titulo="Simulado Final CESGRANRIO"
          descricao="Questões integradoras de alto nível — o padrão exato do concurso Petrobras."
          gradiente="bg-gradient-to-br from-slate-700 via-gray-700 to-zinc-800"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Mapa Mental Final"
              description="Tudo que cai em prova, em um único resumo."
              variant="indigo"
              className="mb-6"
            />
            <CardCarousel
              cards={[
                {
                  titulo: "Conversões",
                  descricao:
                    "% → decimal (÷100) | decimal → % (×100) | fração → % (×100)",
                  icone: "🔄",
                },
                {
                  titulo: "3 Tipos de Problema",
                  descricao:
                    "Calcular valor (×) | Descobrir base (÷) | Descobrir taxa (÷ e ×100)",
                  icone: "📊",
                },
                {
                  titulo: "Fator Multiplicador",
                  descricao:
                    "+p% → ×(1+p/100) | -p% → ×(1-p/100) | Sucessivos: MULTIPLIQUE fatores",
                  icone: "✖️",
                },
                {
                  titulo: "Variação %",
                  descricao:
                    "(Vf−Vi)/Vi×100 | Denominador = INICIAL | p.p. ≠ variação relativa",
                  icone: "📐",
                },
                {
                  titulo: "Juros Compostos",
                  descricao:
                    "M = C×(1+i)ⁿ | Depreciação: ×(1-d)ⁿ | Meia-vida: ×(0,5)ⁿ",
                  icone: "💹",
                },
                {
                  titulo: "Cálculo Reverso",
                  descricao:
                    "Original = Final ÷ Fator | Nunca some % ao preço final para achar o original",
                  icone: "↩️",
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-10" className="mt-16">
            <QuizInterativo
              questoes={quizM10}
              titulo="Simulado Final - Porcentagem CESGRANRIO"
              icone="🏆"
              numero={10}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-10", score)}
            />
          </section>

          {completedModules.has("modulo-10") && (
            <div className="mt-16 p-12 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[2rem] text-white text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="relative z-10 space-y-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-5xl mx-auto backdrop-blur-sm border border-white/30 animate-bounce">
                  💯
                </div>
                <h3 className="text-4xl font-black italic tracking-tighter">
                  PORCENTAGEM DOMINADA!
                </h3>
                <p className="text-xl opacity-90 max-w-xl mx-auto">
                  Porcentagem é o tema mais cobrado pela CESGRANRIO. Com os 10
                  módulos concluídos, você está preparado para qualquer questão
                  do concurso Petrobras!
                </p>
              </div>
            </div>
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
