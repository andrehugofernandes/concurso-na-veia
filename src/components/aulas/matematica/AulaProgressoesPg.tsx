"use client";

import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  AlertBox,
  QuizInterativo,
  ModuleBanner,
  getRandomQuestions,
  AulaProps,
  ContentAccordion,
  FlipCard,
  AulaTemplate,
  ModuleSectionHeader,
} from "../shared";
import {
  QUIZ_M1_CONCEITO_PG,
  QUIZ_M2_TERMO_GERAL_PG,
  QUIZ_M3_SOMA_PG,
  QUIZ_M4_SOMA_INFINITA,
  QUIZ_M5_PROPRIEDADES_PG,
  QUIZ_M6_CRESCIMENTO,
  QUIZ_M7_FINANCEIRA,
  QUIZ_M8_PA_VS_PG,
  QUIZ_M9_DESAFIO_PG,
  QUIZ_M10_SIMULADO_PG,
} from "./data/progressoes-pg-quizzes";

export default function AulaProgressoesPg({
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
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

  const [quizConceito] = useState(() => getRandomQuestions(QUIZ_M1_CONCEITO_PG, 6));
  const [quizTermoGeral] = useState(() => getRandomQuestions(QUIZ_M2_TERMO_GERAL_PG, 6));
  const [quizSoma] = useState(() => getRandomQuestions(QUIZ_M3_SOMA_PG, 6));
  const [quizInfinita] = useState(() => getRandomQuestions(QUIZ_M4_SOMA_INFINITA, 6));
  const [quizPropriedades] = useState(() => getRandomQuestions(QUIZ_M5_PROPRIEDADES_PG, 6));
  const [quizCrescimento] = useState(() => getRandomQuestions(QUIZ_M6_CRESCIMENTO, 6));
  const [quizFinanceira] = useState(() => getRandomQuestions(QUIZ_M7_FINANCEIRA, 6));
  const [quizPaVsPg] = useState(() => getRandomQuestions(QUIZ_M8_PA_VS_PG, 6));
  const [quizDesafio] = useState(() => getRandomQuestions(QUIZ_M9_DESAFIO_PG, 6));
  const [quizSimulado] = useState(() => getRandomQuestions(QUIZ_M10_SIMULADO_PG, 6));

  const isModuleUnlocked = (_index: number) => true;

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) {
      setCompletedModules((prev) => {
        const n = new Set(prev);
        n.add(moduleId);
        return n;
      });
      const modules = Array.from({ length: 10 }, (_, i) => `modulo-${i + 1}`);
      const idx = modules.findIndex((m) => m === moduleId);
      const pct = Math.round(((idx + 1) / 10) * 100);
      onUpdateProgress?.(pct);
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
    { id: "modulo-1", label: "Módulo 1", title: "Conceitos" },
    { id: "modulo-2", label: "Módulo 2", title: "Termo Geral" },
    { id: "modulo-3", label: "Módulo 3", title: "Soma Finita" },
    { id: "modulo-4", label: "Módulo 4", title: "Soma Infinita" },
    { id: "modulo-5", label: "Módulo 5", title: "Propriedades" },
    { id: "modulo-6", label: "Módulo 6", title: "Crescimento/Decaimento" },
    { id: "modulo-7", label: "Módulo 7", title: "Mat. Financeira" },
    { id: "modulo-8", label: "Módulo 8", title: "PA vs PG" },
    { id: "modulo-9", label: "Módulo 9", title: "Desafio CESGRANRIO" },
    { id: "modulo-10", label: "Módulo 10", title: "Simulado Final" },
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
      {/* ═══ MÓDULO 1: CONCEITO DE PG ═══ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="O que é uma Progressão Geométrica?"
          descricao="Domine o conceito de PG, identifique a razão e classifique sequências como crescente, decrescente, alternante ou constante."
          gradiente="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Definição e Razão da PG"
              description="O quociente constante que define a multiplicação em sequência."
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="A Definição Formal"
              icone="📐"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "O que é uma PG?",
                  icone: "🔢",
                  conteudo:(
                    <div className="space-y-4">
                      <p>
                        Uma <strong>Progressão Geométrica (PG)</strong> é uma sequência onde o <strong>quociente entre dois termos consecutivos é constante</strong>. Essa constante é a <strong>razão (q)</strong>.
                      </p>
                      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                        <p className="text-sm font-mono text-center">
                          q = a<sub>n+1</sub> / a<sub>n</sub> (para todo n, com aₙ ≠ 0)
                        </p>
                      </div>
                      <AlertBox tipo="info" titulo="PA vs PG">
                        Na PA, cada termo é o anterior <strong>mais</strong> uma constante. Na PG, cada termo é o anterior <strong>vezes</strong> uma constante. PA é soma repetida; PG é multiplicação repetida.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Classificação da PG",
                  icone: "📊",
                  conteudo:(
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20 text-center">
                          <p className="text-xs font-bold text-emerald-500 mb-2">q {">"} 1 (e a₁ {">"} 0)</p>
                          <p className="text-sm font-bold">Crescente</p>
                          <p className="text-xs text-muted-foreground mt-1">(2, 6, 18, 54...)</p>
                        </div>
                        <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/20 text-center">
                          <p className="text-xs font-bold text-rose-500 mb-2">0 {"<"} q {"<"} 1 (e a₁ {">"} 0)</p>
                          <p className="text-sm font-bold">Decrescente</p>
                          <p className="text-xs text-muted-foreground mt-1">(100, 50, 25...)</p>
                        </div>
                        <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20 text-center">
                          <p className="text-xs font-bold text-amber-500 mb-2">q {"<"} 0</p>
                          <p className="text-sm font-bold">Alternante</p>
                          <p className="text-xs text-muted-foreground mt-1">(5, -10, 20, -40...)</p>
                        </div>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20 text-center">
                          <p className="text-xs font-bold text-cyan-500 mb-2">q = 1</p>
                          <p className="text-sm font-bold">Constante</p>
                          <p className="text-xs text-muted-foreground mt-1">(7, 7, 7, 7...)</p>
                        </div>
                      </div>
                      <AlertBox tipo="danger" titulo="Pegadinha CESGRANRIO">
                        A classificação depende de a₁ E q <strong>juntos</strong>! Se a₁ {"<"} 0 e q {">"} 1, a PG é <strong>decrescente</strong> (os termos ficam "mais negativos"). Cuidado com o sinal de a₁!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "PG na indústria do petróleo",
                  icone: "🏭",
                  conteudo:(
                    <div className="space-y-4">
                      <p>A PG aparece naturalmente em processos que envolvem <strong>multiplicação repetida</strong>:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-xs font-bold text-emerald-500 mb-2">Crescimento</p>
                          <p className="text-sm">Juros compostos, crescimento bacteriano, contaminação ambiental</p>
                        </div>
                        <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/20">
                          <p className="text-xs font-bold text-rose-500 mb-2">Decaimento</p>
                          <p className="text-sm">Meia-vida radioativa, depreciação de equipamentos, perda de eficiência</p>
                        </div>
                      </div>
                      <AlertBox tipo="info" titulo="Contextualização Petrobras">
                        Na RPBC, a eficiência de um catalisador cai 15% a cada ciclo. Se inicia com 100%: 100, 85, 72.25, 61.41... Isso é PG com q = 0,85. Saber prever quando trocar o catalisador é PA/PG aplicada!
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
              title="Média Geométrica"
              description="O equivalente da média aritmética, mas para PG."
              variant="emerald"
              className="mb-6"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FlipCard
                frente={
                  <div className="text-center space-y-3">
                    <p className="text-4xl">🎯</p>
                    <p className="font-bold">Se (a, b, c) é PG...</p>
                    <p className="text-sm text-muted-foreground">Qual a relação entre eles?</p>
                  </div>
                }
                verso={
                  <div className="space-y-3">
                    <p className="font-bold text-emerald-400">Média Geométrica</p>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                      <p className="text-sm font-mono text-center">b² = a · c</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Se (3, b, 12) é PG → b² = 3·12 = 36 → b = <strong>6</strong>. Na PA seria (3+12)/2 = 7,5. PG usa multiplicação, PA usa soma!
                    </p>
                  </div>
                }
              />
              <FlipCard
                frente={
                  <div className="text-center space-y-3">
                    <p className="text-4xl">⚠️</p>
                    <p className="font-bold">Cuidado com o sinal!</p>
                    <p className="text-sm text-muted-foreground">b² = a·c pode ter 2 soluções</p>
                  </div>
                }
                verso={
                  <div className="space-y-3">
                    <p className="font-bold text-rose-400">Quando b² = 36...</p>
                    <p className="text-sm">b = +6 ou b = −6</p>
                    <p className="text-xs text-muted-foreground">
                      Se a {">"} 0 e c {">"} 0, ambos os sinais geram PGs válidas! (3, 6, 12) com q=2 e (3, −6, 12) com q=−2. A CESGRANRIO pode pedir ambas.
                    </p>
                  </div>
                }
              />
            </div>
          </section>

          <section id="quiz-modulo-1" className="mt-16">
            <QuizInterativo
              questoes={quizConceito}
              titulo="Quiz - Conceitos de PG"
              icone="🧠"
              numero={1}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 2: TERMO GERAL ═══ */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <ModuleBanner
          numero={2}
          titulo="Fórmula do Termo Geral"
          descricao="aₙ = a₁ · q^(n−1): a fórmula que encontra qualquer termo sem listar todos."
          gradiente="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="A Fórmula Mestra da PG"
              description="Multiplicação repetida compactada em uma única expressão."
              variant="emerald"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Dedução e Aplicação"
              icone="📐"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "De onde vem a fórmula?",
                  icone: "🧮",
                  conteudo:(
                    <div className="space-y-4">
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 space-y-1">
                        <p className="text-sm font-mono">a₁ = a₁</p>
                        <p className="text-sm font-mono">a₂ = a₁ · q</p>
                        <p className="text-sm font-mono">a₃ = a₁ · q²</p>
                        <p className="text-sm font-mono">a₄ = a₁ · q³</p>
                        <p className="text-sm font-mono">...</p>
                        <p className="text-sm font-mono font-bold">aₙ = a₁ · q^(n−1)</p>
                      </div>
                      <AlertBox tipo="warning" titulo="O (n−1) de novo!">
                        Assim como na PA, o expoente é <strong>(n−1)</strong>, não n. O 1º termo multiplica por q <strong>zero</strong> vezes, o 2º multiplica <strong>uma</strong> vez, etc.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Crescimento exponencial na Petrobras",
                  icone: "📈",
                  conteudo:(
                    <div className="space-y-4">
                      <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                        <p className="text-xs font-bold text-indigo-400 mb-2">Depreciação de equipamento</p>
                        <p className="text-sm mb-2">
                          Um compressor de R$200.000 perde 20% do valor por ano. Qual o valor após 5 anos?
                        </p>
                        <p className="text-sm">a₁ = 200.000, q = 0,80</p>
                        <p className="text-sm font-bold">a₆ = 200.000 · 0,8⁵ = 200.000 · 0,32768 = R$65.536</p>
                      </div>
                      <AlertBox tipo="danger" titulo="Atenção: PA ≠ PG em depreciação">
                        Depreciação linear (PA): perde R$40.000/ano fixo → após 5 anos vale R$0. Depreciação percentual (PG): perde 20%/ano → <strong>nunca chega a zero</strong>. A CESGRANRIO testa se você sabe a diferença.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Fórmula generalizada",
                  icone: "🔗",
                  conteudo:(
                    <div className="space-y-4">
                      <p>Assim como na PA, se a questão dá dois termos quaisquer:</p>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
                        <p className="text-sm font-mono text-center font-bold">
                          aₙ = aₘ · q^(n−m)
                        </p>
                      </div>
                      <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20">
                        <p className="text-xs font-bold text-amber-500 mb-2">Exemplo</p>
                        <p className="text-sm">Se a₃ = 12 e a₆ = 96, qual a razão?</p>
                        <p className="text-sm">a₆ = a₃ · q³ → 96 = 12 · q³ → q³ = 8 → <strong>q = 2</strong></p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-2" className="mt-16">
            <QuizInterativo
              questoes={quizTermoGeral}
              titulo="Quiz - Termo Geral da PG"
              icone="🧮"
              numero={2}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 3: SOMA FINITA ═══ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <ModuleBanner
          numero={3}
          titulo="Soma dos Termos (Finita)"
          descricao="A fórmula Sₙ = a₁(qⁿ−1)/(q−1) e suas variações."
          gradiente="bg-gradient-to-br from-amber-600 via-orange-600 to-red-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Soma de n Termos"
              description="Diferente da PA, aqui a fórmula envolve potências."
              variant="amber"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Fórmula da Soma Finita"
              icone="➕"
              corIndicador="bg-amber-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "A fórmula e quando usar",
                  icone: "📐",
                  conteudo:(
                    <div className="space-y-4">
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                        <p className="text-sm font-mono text-center font-bold">
                          Sₙ = a₁ · (qⁿ − 1) / (q − 1), para q ≠ 1
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-xs font-bold text-emerald-500 mb-2">Se q {">"} 1</p>
                          <p className="text-sm">Prefira: Sₙ = a₁(qⁿ−1)/(q−1)</p>
                          <p className="text-xs text-muted-foreground">Numerador e denominador positivos</p>
                        </div>
                        <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/20">
                          <p className="text-xs font-bold text-rose-500 mb-2">Se q {"<"} 1</p>
                          <p className="text-sm">Prefira: Sₙ = a₁(1−qⁿ)/(1−q)</p>
                          <p className="text-xs text-muted-foreground">Evita sinais negativos</p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Para q = 1">
                        Se q = 1, todos os termos são iguais: Sₙ = n · a₁. A fórmula principal dá 0/0 (indeterminação), então usamos o caso especial.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplo completo",
                  icone: "🎯",
                  conteudo:(
                    <div className="space-y-4">
                      <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                        <p className="text-xs font-bold text-indigo-400 mb-2">PG: (1, 2, 4, 8, ...) — Soma dos 10 primeiros termos</p>
                        <p className="text-sm">a₁=1, q=2, n=10</p>
                        <p className="text-sm font-bold">S₁₀ = 1·(2¹⁰−1)/(2−1) = (1024−1)/1 = <strong>1023</strong></p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Compare: em PA com r=2 (1,3,5,...), S₁₀ = 100. A PG soma <strong>10× mais</strong> por causa do crescimento exponencial!
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-3" className="mt-16">
            <QuizInterativo
              questoes={quizSoma}
              titulo="Quiz - Soma Finita da PG"
              icone="➕"
              numero={3}
              variant="amber"
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 4: SOMA INFINITA ═══ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner
          numero={4}
          titulo="Soma Infinita (PG Convergente)"
          descricao="Quando |q| < 1, a soma de infinitos termos tem valor finito. Parece mágica, é Matemática."
          gradiente="bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="S∞ = a₁ / (1 − q)"
              description="A fórmula que soma infinitos termos em uma fração."
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="PG Convergente"
              icone="♾️"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Condição de convergência",
                  icone: "📏",
                  conteudo:(
                    <div className="space-y-4">
                      <p>
                        A soma infinita SÓ existe quando <strong>|q| {"<"} 1</strong> (ou seja, −1 {"<"} q {"<"} 1, com q ≠ 0). Nesse caso, os termos vão ficando cada vez menores e a soma "se estabiliza":
                      </p>
                      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                        <p className="text-sm font-mono text-center font-bold">
                          S∞ = a₁ / (1 − q)
                        </p>
                      </div>
                      <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                        <p className="text-xs font-bold text-emerald-500 mb-2">Exemplo</p>
                        <p className="text-sm">PG: (10, 5, 2.5, 1.25, ...)</p>
                        <p className="text-sm">a₁=10, q=0,5 → S∞ = 10/(1−0,5) = 10/0,5 = <strong>20</strong></p>
                        <p className="text-xs text-muted-foreground">Infinitos termos somam apenas 20!</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dízimas periódicas como PG",
                  icone: "🔄",
                  conteudo:(
                    <div className="space-y-4">
                      <p>Toda dízima periódica pode ser escrita como soma infinita de PG:</p>
                      <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20">
                        <p className="text-sm">0,333... = 3/10 + 3/100 + 3/1000 + ...</p>
                        <p className="text-sm">a₁ = 3/10, q = 1/10</p>
                        <p className="text-sm font-bold">S∞ = (3/10)/(1−1/10) = (3/10)/(9/10) = <strong>1/3</strong> ✓</p>
                      </div>
                      <AlertBox tipo="info" titulo="Aplicação na Petrobras">
                        Em cálculos de amortização e valor presente, a soma infinita de PG é usada para avaliar fluxos de caixa perpétuos (perpetuidades). Ex: "Qual o valor presente de um royalty que paga R$X/ano para sempre?"
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-4" className="mt-16">
            <QuizInterativo
              questoes={quizInfinita}
              titulo="Quiz - Soma Infinita"
              icone="♾️"
              numero={4}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 5: PROPRIEDADES ═══ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="Propriedades da PG"
          descricao="Termos equidistantes, produto, e a conexão logaritmo → PA."
          gradiente="bg-gradient-to-br from-cyan-600 via-teal-600 to-emerald-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Propriedades Fundamentais"
              description="Os atalhos que fazem a diferença na prova."
              variant="cyan"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Propriedades da PG"
              icone="⚡"
              corIndicador="bg-cyan-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Termos equidistantes (produto constante)",
                  icone: "⚖️",
                  conteudo:(
                    <div className="space-y-4">
                      <p>Na PA, termos equidistantes têm <strong>soma constante</strong>. Na PG, têm <strong>produto constante</strong>:</p>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
                        <p className="text-sm font-mono text-center font-bold">
                          a₁ · aₙ = a₂ · aₙ₋₁ = a₃ · aₙ₋₂ = ... = constante
                        </p>
                      </div>
                      <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                        <p className="text-xs font-bold text-emerald-500 mb-2">Exemplo</p>
                        <p className="text-sm">PG: (2, 6, 18, 54, 162)</p>
                        <p className="text-sm">a₁·a₅ = 2·162 = <strong>324</strong></p>
                        <p className="text-sm">a₂·a₄ = 6·54 = <strong>324</strong> ✓</p>
                        <p className="text-sm">a₃² = 18² = <strong>324</strong> ✓</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Logaritmo de PG = PA",
                  icone: "🔗",
                  conteudo:(
                    <div className="space-y-4">
                      <p>A propriedade mais elegante: <strong>o logaritmo de uma PG é uma PA</strong>.</p>
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                        <p className="text-sm">PG: (a, aq, aq², aq³)</p>
                        <p className="text-sm">Log: (log a, log a + log q, log a + 2·log q, log a + 3·log q)</p>
                        <p className="text-sm font-bold">→ PA com razão = log q</p>
                      </div>
                      <AlertBox tipo="warning" titulo="Macete CESGRANRIO">
                        Se a banca pede "os logaritmos de 2, 8, 32 formam que tipo de sequência?", calcule: log₂(2)=1, log₂(8)=3, log₂(32)=5 → PA com r=2. Não precisa calcular os logs decimais!
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-5" className="mt-16">
            <QuizInterativo
              questoes={quizPropriedades}
              titulo="Quiz - Propriedades da PG"
              icone="⚡"
              numero={5}
              variant="cyan"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 6: CRESCIMENTO/DECAIMENTO ═══ */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <ModuleBanner
          numero={6}
          titulo="Crescimento e Decaimento Exponencial"
          descricao="Populações, radioatividade, depreciação: o poder destrutivo (e construtivo) da PG."
          gradiente="bg-gradient-to-br from-rose-600 via-pink-600 to-red-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Modelagem Exponencial"
              description="Transforme problemas do mundo real em PG."
              variant="rose"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Cenários de Crescimento e Decaimento"
              icone="📈"
              corIndicador="bg-rose-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Crescimento: q > 1",
                  icone: "🚀",
                  conteudo:(
                    <div className="space-y-4">
                      <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                        <p className="text-xs font-bold text-emerald-500 mb-2">Bactérias que dobram a cada hora</p>
                        <p className="text-sm">a₁=500, q=2. Após 10h: a₁₁ = 500·2¹⁰ = <strong>512.000</strong></p>
                      </div>
                      <AlertBox tipo="danger" titulo="O poder do exponencial">
                        Se uma bactéria dobra a cada 20min, começando com 1, após 24h teremos 2⁷² ≈ 4,7 × 10²¹. Isso é mais que o número de estrelas no universo observável! A PG cresce absurdamente rápido.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Decaimento: 0 < q < 1",
                  icone: "📉",
                  conteudo:(
                    <div className="space-y-4">
                      <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/20">
                        <p className="text-xs font-bold text-rose-500 mb-2">Meia-vida na RPBC</p>
                        <p className="text-sm">A meia-vida de um isótopo é 5 anos. Se há 1600g:</p>
                        <p className="text-sm">Após 5 anos: 800g. Após 10: 400g. Após 20: <strong>100g</strong></p>
                        <p className="text-sm">q = 0,5, cada "passo" = 5 anos</p>
                      </div>
                      <AlertBox tipo="warning" titulo="Macete: Crescer p% → q = 1 + p/100. Decair p% → q = 1 − p/100">
                        Crescer 20% → q = 1,20. Decair 20% → q = 0,80. A CESGRANRIO ADORA trocar "aumentar" por "diminuir" para ver se você ajusta o q.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-6" className="mt-16">
            <QuizInterativo
              questoes={quizCrescimento}
              titulo="Quiz - Crescimento e Decaimento"
              icone="📈"
              numero={6}
              variant="rose"
              onComplete={(score) => handleModuleComplete("modulo-6", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 7: MATEMÁTICA FINANCEIRA ═══ */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <ModuleBanner
          numero={7}
          titulo="PG e Matemática Financeira"
          descricao="Juros compostos são PG pura. Domine a conexão que cai em TODA prova."
          gradiente="bg-gradient-to-br from-teal-600 via-emerald-600 to-green-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Juros Compostos = PG"
              description="A fórmula M = C(1+i)ⁿ É a fórmula do termo geral da PG."
              variant="emerald"
              className="mb-6"
            />
            <ContentAccordion
              titulo="A Conexão Fundamental"
              icone="💰"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Juros compostos como PG",
                  icone: "🏦",
                  conteudo:(
                    <div className="space-y-4">
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                        <p className="text-sm font-mono text-center">
                          Montante = Capital · (1 + taxa)^período
                        </p>
                        <p className="text-sm font-mono text-center font-bold mt-1">
                          M = C · (1+i)ⁿ = <strong>a₁ · q^(n−1)</strong> com q = (1+i)
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20">
                          <p className="text-xs font-bold text-amber-500 mb-2">Juros Simples (PA)</p>
                          <p className="text-sm">M = C(1+in)</p>
                          <p className="text-xs text-muted-foreground">Cresce linearmente</p>
                        </div>
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-xs font-bold text-emerald-500 mb-2">Juros Compostos (PG)</p>
                          <p className="text-sm">M = C(1+i)ⁿ</p>
                          <p className="text-xs text-muted-foreground">Cresce exponencialmente</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Regra dos 72",
                  icone: "🎯",
                  conteudo:(
                    <div className="space-y-4">
                      <p>Para estimar em quantos períodos o capital <strong>dobra</strong>:</p>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
                        <p className="text-sm font-mono text-center font-bold">
                          n ≈ 72 / taxa(%)
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm">Taxa 6% → dobra em ≈ 12 períodos</p>
                        <p className="text-sm">Taxa 8% → dobra em ≈ 9 períodos</p>
                        <p className="text-sm">Taxa 12% → dobra em ≈ 6 períodos</p>
                      </div>
                      <AlertBox tipo="info" titulo="Na prova">
                        Se não tiver calculadora, a regra dos 72 dá uma aproximação excelente. A CESGRANRIO aceita valores aproximados em questões de juros compostos.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-7" className="mt-16">
            <QuizInterativo
              questoes={quizFinanceira}
              titulo="Quiz - PG e Finanças"
              icone="💰"
              numero={7}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-7", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 8: PA vs PG ═══ */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <ModuleBanner
          numero={8}
          titulo="PA vs PG: Comparação Final"
          descricao="Consolide as diferenças e conexões entre as duas progressões."
          gradiente="bg-gradient-to-br from-slate-600 via-zinc-600 to-neutral-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Tabela Comparativa"
              description="Tudo lado a lado para nunca mais confundir."
              variant="indigo"
              className="mb-6"
            />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 text-muted-foreground">Aspecto</th>
                    <th className="text-left p-3 text-indigo-400">PA</th>
                    <th className="text-left p-3 text-emerald-400">PG</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="p-3">Operação</td><td className="p-3">Soma constante</td><td className="p-3">Multiplicação constante</td></tr>
                  <tr><td className="p-3">Razão</td><td className="p-3">r = a₂ − a₁</td><td className="p-3">q = a₂ / a₁</td></tr>
                  <tr><td className="p-3">Termo geral</td><td className="p-3 font-mono text-xs">a₁ + (n−1)r</td><td className="p-3 font-mono text-xs">a₁ · q^(n−1)</td></tr>
                  <tr><td className="p-3">Soma</td><td className="p-3 font-mono text-xs">(a₁+aₙ)n/2</td><td className="p-3 font-mono text-xs">a₁(qⁿ−1)/(q−1)</td></tr>
                  <tr><td className="p-3">Gráfico</td><td className="p-3">Pontos em reta</td><td className="p-3">Curva exponencial</td></tr>
                  <tr><td className="p-3">Equidistantes</td><td className="p-3">Soma constante</td><td className="p-3">Produto constante</td></tr>
                  <tr><td className="p-3">Média</td><td className="p-3">Aritmética: (a+c)/2</td><td className="p-3">Geométrica: √(a·c)</td></tr>
                  <tr><td className="p-3">Aplicação</td><td className="p-3">Juros simples</td><td className="p-3">Juros compostos</td></tr>
                  <tr><td className="p-3">Conexão</td><td className="p-3" colSpan={2}>log(PG) = PA | 10^(PA) = PG</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="quiz-modulo-8" className="mt-16">
            <QuizInterativo
              questoes={quizPaVsPg}
              titulo="Quiz - PA vs PG"
              icone="⚖️"
              numero={8}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-8", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 9: DESAFIO CESGRANRIO ═══ */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <ModuleBanner
          numero={9}
          titulo="Desafio CESGRANRIO"
          descricao="Questões de nível avançado com as armadilhas típicas da banca."
          gradiente="bg-gradient-to-br from-red-600 via-rose-600 to-pink-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Armadilhas em PG"
              description="Conheça os truques antes de cair neles."
              variant="rose"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Pegadinhas Clássicas"
              icone="⚠️"
              corIndicador="bg-rose-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Confundir PA com PG",
                  icone: "🪤",
                  conteudo:(
                    <div className="space-y-4">
                      <p>A armadilha mais frequente: usar fórmula de PA em problema de PG (e vice-versa).</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/20">
                          <p className="text-xs font-bold text-rose-500 mb-2">Pista de PA</p>
                          <p className="text-sm">"aumenta X por período", "diferença constante", "juros simples"</p>
                        </div>
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-xs font-bold text-emerald-500 mb-2">Pista de PG</p>
                          <p className="text-sm">"aumenta X% por período", "triplica", "juros compostos", "meia-vida"</p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Regra de ouro">
                        <strong>"Mais X"</strong> = PA (soma). <strong>"X% a mais"</strong> = PG (multiplicação). "Aumenta R$100/mês" é PA. "Aumenta 10%/mês" é PG.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Soma infinita quando |q| ≥ 1",
                  icone: "🪤",
                  conteudo:(
                    <div className="space-y-4">
                      <p>A fórmula S∞ = a₁/(1−q) SÓ vale quando |q| {"<"} 1!</p>
                      <AlertBox tipo="danger" titulo="Erro fatal">
                        Se q = 2: S∞ = a₁/(1−2) = −a₁. Isso está ERRADO! A PG com q=2 diverge (soma vai ao infinito). A fórmula só funciona se |q| {"<"} 1. Antes de aplicar, <strong>SEMPRE verifique |q|</strong>.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-9" className="mt-16">
            <QuizInterativo
              questoes={quizDesafio}
              titulo="Quiz - Desafio CESGRANRIO (PG)"
              icone="🏆"
              numero={9}
              variant="rose"
              onComplete={(score) => handleModuleComplete("modulo-9", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 10: SIMULADO FINAL ═══ */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <ModuleBanner
          numero={10}
          titulo="Simulado Final"
          descricao="Teste completo sobre PG. Aprovação ≥ 60%."
          gradiente="bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-600"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Resumo Rápido: Tudo sobre PG"
              description="Revise as fórmulas antes do simulado."
              variant="amber"
              className="mb-6"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                <p className="text-xs font-bold text-indigo-400 mb-2">Termo Geral</p>
                <p className="text-sm font-mono">aₙ = a₁ · q^(n−1)</p>
              </div>
              <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                <p className="text-xs font-bold text-emerald-500 mb-2">Soma Finita</p>
                <p className="text-sm font-mono">Sₙ = a₁(qⁿ−1)/(q−1)</p>
              </div>
              <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                <p className="text-xs font-bold text-cyan-500 mb-2">Soma Infinita</p>
                <p className="text-sm font-mono">S∞ = a₁/(1−q), |q|{"<"}1</p>
              </div>
              <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20">
                <p className="text-xs font-bold text-amber-500 mb-2">Média Geométrica</p>
                <p className="text-sm font-mono">b² = a · c</p>
              </div>
              <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/20">
                <p className="text-xs font-bold text-rose-500 mb-2">Equidistantes</p>
                <p className="text-sm font-mono">a₁·aₙ = a₂·aₙ₋₁</p>
              </div>
              <div className="p-4 bg-violet-500/5 rounded-xl border border-violet-500/20">
                <p className="text-xs font-bold text-violet-500 mb-2">Log(PG) = PA</p>
                <p className="text-sm font-mono">r_PA = log(q_PG)</p>
              </div>
            </div>
          </section>

          <section id="quiz-modulo-10" className="mt-16">
            <QuizInterativo
              questoes={quizSimulado}
              titulo="Simulado Final - PG"
              icone="🏅"
              numero={10}
              variant="amber"
              onComplete={(score) => handleModuleComplete("modulo-10", score)}
            />
          </section>
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}










