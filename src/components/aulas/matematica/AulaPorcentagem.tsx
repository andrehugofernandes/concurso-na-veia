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
          {/* Seção 1: Definição e Conversões */}
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
                        <strong>Porcentagem</strong> (ou percentagem) significa
                        literalmente <em>&quot;por cento&quot;</em> — uma razão
                        cujo denominador é sempre 100. É a forma mais usada no
                        mundo real para expressar proporções.
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
                        financeiro (CDI + 2%), dentre outros indicadores
                        operacionais.
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
                        A banca adora confundir 0,035 com 35% (ao invés do
                        correto 3,5%). Sempre conte as casas decimais: mover a
                        vírgula 2 casas para a direita!
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

          {/* Seção 2: Os 3 Problemas Fundamentais */}
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
            <ContentAccordion
              titulo="Exemplos Resolvidos"
              icone="✏️"
              corIndicador="bg-emerald-500"
              slides={[
                {
                  titulo: "Exemplo 1 (Tipo 1 – Fácil)",
                  icone: "📝",
                  conteudo: (
                    <div className="space-y-3">
                      <div className="p-4 bg-muted rounded-xl">
                        <p className="font-bold">
                          Em uma refinaria, 35% dos 8.000 litros de um tanque
                          são de diesel. Qual o volume de diesel?
                        </p>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p>
                          <strong>Passo 1:</strong> Converter % em decimal → 35%
                          = 0,35
                        </p>
                        <p>
                          <strong>Passo 2:</strong> Multiplicar → 8.000 × 0,35 ={" "}
                          <strong>2.800 litros</strong>
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplo 2 (Tipo 2 – Médio)",
                  icone: "📝",
                  conteudo: (
                    <div className="space-y-3">
                      <div className="p-4 bg-muted rounded-xl">
                        <p className="font-bold">
                          60 barris representam 40% da produção diária. Qual a
                          produção total?
                        </p>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p>
                          <strong>Passo 1:</strong> Montar a equação → Total ×
                          0,40 = 60
                        </p>
                        <p>
                          <strong>Passo 2:</strong> Isolar → Total = 60 ÷ 0,40 ={" "}
                          <strong>150 barris</strong>
                        </p>
                        <p>
                          <strong>Verificação:</strong> 150 × 0,40 = 60 ✓
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplo 3 (Tipo 3 – Difícil)",
                  icone: "📝",
                  conteudo: (
                    <div className="space-y-3">
                      <div className="p-4 bg-muted rounded-xl">
                        <p className="font-bold">
                          Uma plataforma produziu 15.000 barris em fevereiro
                          contra 12.000 em janeiro. A produção de fevereiro
                          representa quantos % da de janeiro?
                        </p>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p>
                          <strong>Passo 1:</strong> Calcular a razão → 15.000 /
                          12.000 = 1,25
                        </p>
                        <p>
                          <strong>Passo 2:</strong> Converter → 1,25 × 100 ={" "}
                          <strong>125%</strong>
                        </p>
                        <p className="text-amber-600 dark:text-amber-400 font-bold">
                          ⚠️ Atenção: 125% é &quot;representa quantos %
                          de&quot;. O AUMENTO foi de 25% (125% - 100%). A
                          CESGRANRIO explora essa diferença!
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          {/* Quiz Módulo 1 */}
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
                      <p className="text-sm">
                        O fator multiplicador transforma qualquer cálculo de %
                        em uma <strong>única multiplicação</strong>. Em vez de
                        calcular o aumento e somar, basta multiplicar
                        diretamente pelo fator.
                      </p>
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
                        <p className="text-sm mt-2">
                          Se custava R$ 200: → R$ 300 (após +50%) →{" "}
                          <strong>R$ 150</strong> (após -50%)
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
                      <p className="font-bold">
                        Para &quot;desfazer&quot; uma variação e voltar ao valor
                        original:
                      </p>
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
                      <AlertBox
                        tipo="info"
                        titulo="Por que a CESGRANRIO adora isso?"
                      >
                        Porque confunde o candidato que acha que +20% e -20% se
                        anulam. Nunca se anulam! (exceto +25% e -20%, ou +100% e
                        -50%, etc.)
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
              title="Exemplos Resolvidos"
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Passo a Passo"
              icone="✏️"
              corIndicador="bg-indigo-500"
              slides={[
                {
                  titulo: "Exemplo 1: Reajuste salarial composto",
                  icone: "📝",
                  conteudo: (
                    <div className="space-y-3">
                      <div className="p-4 bg-muted rounded-xl">
                        <p className="font-bold">
                          Um salário de R$ 4.000 teve reajuste de 8% seguido de
                          5%. Qual o salário final e o reajuste total?
                        </p>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p>
                          <strong>Passo 1:</strong> Fator 1 = 1,08 | Fator 2 =
                          1,05
                        </p>
                        <p>
                          <strong>Passo 2:</strong> Fator total = 1,08 × 1,05 =
                          1,134
                        </p>
                        <p>
                          <strong>Passo 3:</strong> Salário = 4.000 × 1,134 ={" "}
                          <strong>R$ 4.536</strong>
                        </p>
                        <p>
                          <strong>Reajuste total:</strong> 13,4% (não 13%!)
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplo 2: Descontos sucessivos",
                  icone: "📝",
                  conteudo: (
                    <div className="space-y-3">
                      <div className="p-4 bg-muted rounded-xl">
                        <p className="font-bold">
                          Uma peça de R$ 500 recebeu desconto de 10% e depois
                          mais 20%. Qual o preço final e o desconto equivalente?
                        </p>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p>
                          <strong>Passo 1:</strong> Fator = 0,90 × 0,80 = 0,72
                        </p>
                        <p>
                          <strong>Passo 2:</strong> Preço = 500 × 0,72 ={" "}
                          <strong>R$ 360</strong>
                        </p>
                        <p>
                          <strong>Desconto equivalente:</strong> 1 - 0,72 = 0,28
                          = <strong>28%</strong> (não 30%!)
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
                        O denominador é SEMPRE o valor INICIAL (anterior, de
                        referência). Usar o valor final no denominador é o erro
                        #1 em provas da CESGRANRIO e gera uma alternativa errada
                        que estará lá esperando você!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Absoluta vs. Relativa",
                  icone: "⚖️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A CESGRANRIO distingue dois conceitos que candidatos
                        confundem:
                      </p>
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
                      <AlertBox tipo="info" titulo="Questão certa na prova">
                        A distinção entre &quot;pontos percentuais&quot; e
                        &quot;variação percentual&quot; aparece em quase toda
                        prova CESGRANRIO. Eles adoram perguntar: &quot;a taxa
                        caiu X pontos percentuais, o que equivale a uma redução
                        relativa de Y%&quot;.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplo Resolvido",
                  icone: "📝",
                  conteudo: (
                    <div className="space-y-3">
                      <div className="p-4 bg-muted rounded-xl">
                        <p className="font-bold">
                          O preço do gás subiu de R$ 50 para R$ 65. Qual a
                          variação percentual? E se depois voltar a R$ 50, a
                          queda é de mesma porcentagem?
                        </p>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p>
                          <strong>Subida:</strong> (65-50)/50 × 100 ={" "}
                          <strong>30%</strong>
                        </p>
                        <p>
                          <strong>Volta:</strong> (65-50)/65 × 100 ={" "}
                          <strong>23,1%</strong>
                        </p>
                        <p className="text-amber-600 dark:text-amber-400 font-bold mt-2">
                          ⚠️ A subida é 30%, mas a volta é só 23,1%! O
                          denominador mudou (de 50 para 65). Isso prova que
                          variações não são simétricas.
                        </p>
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
                          15%. Do restante, 30% vai para peças. Quanto vai para
                          peças?
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
                      <AlertBox tipo="info" titulo="Atalho">
                        Pode calcular direto: 2.000.000 × 0,85 × 0,30 = R$
                        510.000. Os fatores se multiplicam!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Média Ponderada com %",
                  icone: "⚖️",
                  conteudo: (
                    <div className="space-y-3">
                      <p>
                        Misturar componentes com percentuais diferentes é{" "}
                        <strong>média ponderada</strong>:
                      </p>
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
          MÓDULO 5 — DESAFIO FINAL
      ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="Desafio Final: Porcentagem Avançada"
          descricao="Questões integradoras combinando tudo o que você aprendeu."
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
                  PORCENTAGEM DOMINADA!
                </h3>
                <p className="text-xl opacity-90 max-w-xl mx-auto">
                  Porcentagem é o tema mais cobrado pela CESGRANRIO. Com essas
                  técnicas, você está preparado para qualquer questão!
                </p>
              </div>
            </div>
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
