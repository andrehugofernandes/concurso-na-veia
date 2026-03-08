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
  FunctionGraph,
  type FunctionPlot,
} from "../shared";
import {
  QUIZ_M1_CONCEITO_PA,
  QUIZ_M2_TERMO_GERAL,
  QUIZ_M3_SOMA,
  QUIZ_M4_PROPRIEDADES,
  QUIZ_M5_INTERPOLACAO,
  QUIZ_M6_PA_FUNCOES,
  QUIZ_M7_PRATICA,
  QUIZ_M8_AVANCADO,
  QUIZ_M9_DESAFIO,
  QUIZ_M10_SIMULADO,
} from "./data/progressoes-pa-quizzes";

export default function AulaProgressoesPa({
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

  const [quizConceito] = useState(() => getRandomQuestions(QUIZ_M1_CONCEITO_PA, 6));
  const [quizTermoGeral] = useState(() => getRandomQuestions(QUIZ_M2_TERMO_GERAL, 6));
  const [quizSoma] = useState(() => getRandomQuestions(QUIZ_M3_SOMA, 6));
  const [quizPropriedades] = useState(() => getRandomQuestions(QUIZ_M4_PROPRIEDADES, 6));
  const [quizInterpolacao] = useState(() => getRandomQuestions(QUIZ_M5_INTERPOLACAO, 6));
  const [quizFuncoes] = useState(() => getRandomQuestions(QUIZ_M6_PA_FUNCOES, 6));
  const [quizPratica] = useState(() => getRandomQuestions(QUIZ_M7_PRATICA, 6));
  const [quizAvancado] = useState(() => getRandomQuestions(QUIZ_M8_AVANCADO, 6));
  const [quizDesafio] = useState(() => getRandomQuestions(QUIZ_M9_DESAFIO, 6));
  const [quizSimulado] = useState(() => getRandomQuestions(QUIZ_M10_SIMULADO, 6));

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
    { id: "modulo-3", label: "Módulo 3", title: "Soma (Gauss)" },
    { id: "modulo-4", label: "Módulo 4", title: "Propriedades" },
    { id: "modulo-5", label: "Módulo 5", title: "Interpolação" },
    { id: "modulo-6", label: "Módulo 6", title: "PA e Funções" },
    { id: "modulo-7", label: "Módulo 7", title: "Prática Industrial" },
    { id: "modulo-8", label: "Módulo 8", title: "Avançado" },
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
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 1: CONCEITO E CLASSIFICAÇÃO DE PA                         */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="O que é uma Progressão Aritmética?"
          descricao="Domine o conceito de PA, identifique a razão e classifique sequências como crescente, decrescente ou constante."
          gradiente="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Definição e Razão da PA"
              description="O alicerce de tudo: entenda o padrão constante que define uma PA."
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
                  titulo: "O que é uma PA?",
                  icone: "🔢",
                  conteudo:(
                    <div className="space-y-4">
                      <p>
                        Uma <strong>Progressão Aritmética (PA)</strong> é uma sequência de números onde a <strong>diferença entre dois termos consecutivos é sempre constante</strong>. Essa constante é chamada de <strong>razão (r)</strong>.
                      </p>
                      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                        <p className="text-sm font-mono text-center">
                          r = a<sub>n+1</sub> − a<sub>n</sub> (para todo n)
                        </p>
                      </div>
                      <AlertBox tipo="info" titulo="Contextualização Petrobras">
                        Imagine um tanque que recebe <strong>30 litros por hora</strong>, de forma constante. As leituras de volume (500, 530, 560, 590...) formam uma PA com razão r = 30. Esse padrão linear é a base de inúmeros cálculos de produção e manutenção na indústria.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Como encontrar a razão",
                  icone: "🔍",
                  conteudo:(
                    <div className="space-y-4">
                      <p>
                        A razão é calculada subtraindo <strong>qualquer termo do seu sucessor</strong>:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-xs font-bold text-emerald-500 mb-2">Exemplo 1</p>
                          <p className="text-sm">PA: (3, 7, 11, 15, ...)</p>
                          <p className="text-sm">r = 7 − 3 = <strong>4</strong></p>
                        </div>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="text-xs font-bold text-cyan-500 mb-2">Exemplo 2</p>
                          <p className="text-sm">PA: (20, 15, 10, 5, ...)</p>
                          <p className="text-sm">r = 15 − 20 = <strong>−5</strong></p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Macete de Prova">
                        Se a banca dá 4 termos e pede "verifique se é PA", calcule <strong>TODAS</strong> as diferenças consecutivas. Se uma delas diferir, <strong>não é PA</strong>. Ex: (1, 3, 5, 9) → diferenças 2, 2, 4 → NÃO é PA.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Classificação da PA",
                  icone: "📊",
                  conteudo:(
                    <div className="space-y-4">
                      <p>
                        A PA é classificada de acordo com o <strong>sinal da razão</strong>:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20 text-center">
                          <p className="text-xs font-bold text-emerald-500 mb-2">r {">"} 0</p>
                          <p className="text-sm font-bold">Crescente</p>
                          <p className="text-xs text-muted-foreground mt-1">(2, 5, 8, 11...)</p>
                        </div>
                        <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/20 text-center">
                          <p className="text-xs font-bold text-rose-500 mb-2">r {"<"} 0</p>
                          <p className="text-sm font-bold">Decrescente</p>
                          <p className="text-xs text-muted-foreground mt-1">(20, 17, 14, 11...)</p>
                        </div>
                        <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20 text-center">
                          <p className="text-xs font-bold text-amber-500 mb-2">r = 0</p>
                          <p className="text-sm font-bold">Constante</p>
                          <p className="text-xs text-muted-foreground mt-1">(5, 5, 5, 5...)</p>
                        </div>
                      </div>
                      <AlertBox tipo="danger" titulo="Pegadinha CESGRANRIO">
                        A PA constante (r=0) é aquela em que <strong>todos os termos são iguais</strong>. Candidatos esquecem que (7, 7, 7, 7) é sim uma PA válida. A banca explora isso em alternativas de "nenhuma das anteriores".
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          {/* FlipCards - Termo Médio */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Propriedade do Termo Médio"
              description="O atalho que economiza 2 minutos na prova."
              variant="emerald"
              className="mb-6"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FlipCard
                frente={
                  <div className="text-center space-y-3">
                    <p className="text-4xl">🎯</p>
                    <p className="font-bold">Se (a, b, c) é PA...</p>
                    <p className="text-sm text-muted-foreground">Qual a relação entre eles?</p>
                  </div>
                }
                verso={
                  <div className="space-y-3">
                    <p className="font-bold text-emerald-400">Termo médio = Média Aritmética</p>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                      <p className="text-sm font-mono text-center">b = (a + c) / 2</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Se (2, b, 8) é PA → b = (2+8)/2 = <strong>5</strong>. Funciona para QUALQUER trio consecutivo em uma PA.
                    </p>
                  </div>
                }
              />
              <FlipCard
                frente={
                  <div className="text-center space-y-3">
                    <p className="text-4xl">🏭</p>
                    <p className="font-bold">Aplicação na Refinaria</p>
                    <p className="text-sm text-muted-foreground">Sensor de temperatura a cada hora</p>
                  </div>
                }
                verso={
                  <div className="space-y-3">
                    <p className="font-bold text-cyan-400">Leituras: 22°C, ?, 28°C</p>
                    <p className="text-sm">
                      Se as leituras formam PA, a leitura intermediária é:
                    </p>
                    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
                      <p className="text-sm font-mono text-center">(22 + 28) / 2 = <strong>25°C</strong></p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Usado em interpolação de dados de sensores quando há falha de leitura — contexto real de instrumentação.
                    </p>
                  </div>
                }
              />
            </div>
          </section>

          <FunctionGraph
            title="Progressão Aritmética: Crescimento Linear"
            functions={[
              {
                id: "pa-r3",
                label: "a_n = 1 + 3(n-1), r=3",
                color: "#3b82f6",
                fn: (x: number) => 1 + 3 * (x - 1),
                strokeWidth: 2,
              } satisfies FunctionPlot,
              {
                id: "pa-r5",
                label: "a_n = 2 + 5(n-1), r=5",
                color: "#ef4444",
                fn: (x: number) => 2 + 5 * (x - 1),
                strokeWidth: 2,
              } satisfies FunctionPlot,
              {
                id: "pa-rm2",
                label: "a_n = 20 - 2(n-1), r=-2",
                color: "#10b981",
                fn: (x: number) => 20 - 2 * (x - 1),
                strokeWidth: 2,
              } satisfies FunctionPlot,
            ]}
            xMin={0}
            xMax={10}
            yMin={-10}
            yMax={50}
            points={10}
          />

          <section id="quiz-modulo-1" className="mt-16">
            <QuizInterativo
              questoes={quizConceito}
              titulo="Quiz - Conceitos de PA"
              icone="🧠"
              numero={1}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 2: TERMO GERAL                                            */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <ModuleBanner
          numero={2}
          titulo="Fórmula do Termo Geral"
          descricao="Aprenda a encontrar QUALQUER termo da PA sem precisar listar todos os anteriores."
          gradiente="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="A Fórmula Mestra: aₙ = a₁ + (n−1)·r"
              description="A fórmula mais importante de PA. Domine-a e resolva 80% das questões."
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
                      <p>Observe o padrão:</p>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 space-y-1">
                        <p className="text-sm font-mono">a₁ = a₁</p>
                        <p className="text-sm font-mono">a₂ = a₁ + r</p>
                        <p className="text-sm font-mono">a₃ = a₁ + 2r</p>
                        <p className="text-sm font-mono">a₄ = a₁ + 3r</p>
                        <p className="text-sm font-mono">...</p>
                        <p className="text-sm font-mono font-bold">aₙ = a₁ + (n−1)·r</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        O expoente de r é sempre <strong>(n−1)</strong>, não n! Esse é o erro mais comum em provas.
                      </p>
                      <AlertBox tipo="warning" titulo="Dica de Ouro">
                        Para não errar: o 1º termo soma <strong>zero</strong> vezes r, o 2º soma <strong>uma</strong> vez r, o n-ésimo soma <strong>(n−1)</strong> vezes r. O "−1" existe porque o primeiro termo não precisa "andar" nenhum passo.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Encontrando termos distantes",
                  icone: "🎯",
                  conteudo:(
                    <div className="space-y-4">
                      <p>
                        A fórmula permite calcular qualquer termo <strong>sem listar</strong> todos os anteriores:
                      </p>
                      <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                        <p className="text-xs font-bold text-indigo-400 mb-2">Exemplo CESGRANRIO</p>
                        <p className="text-sm mb-2">PA: (5, 9, 13, ...). Qual o 100º termo?</p>
                        <p className="text-sm">a₁ = 5, r = 4</p>
                        <p className="text-sm font-bold">a₁₀₀ = 5 + (100−1)·4 = 5 + 396 = <strong>401</strong></p>
                      </div>
                      <AlertBox tipo="info" titulo="Contextualização Industrial">
                        Na P-66, um sistema de bombeamento registra a pressão a cada minuto. Se a leitura inicial é 120 psi e aumenta 0,5 psi/min, a fórmula do termo geral calcula a pressão em qualquer minuto futuro: a₆₀ = 120 + 59·0,5 = 149,5 psi (após 1 hora).
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Fórmula generalizada entre dois termos",
                  icone: "🔗",
                  conteudo:(
                    <div className="space-y-4">
                      <p>Nem sempre a questão dá a₁. Às vezes fornece a₃ e a₇. Use a versão generalizada:</p>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
                        <p className="text-sm font-mono text-center font-bold">
                          aₙ = aₘ + (n − m) · r
                        </p>
                      </div>
                      <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20">
                        <p className="text-xs font-bold text-amber-500 mb-2">Exemplo</p>
                        <p className="text-sm">Se a₃ = 14 e a₇ = 30, qual a razão?</p>
                        <p className="text-sm">a₇ = a₃ + (7−3)·r → 30 = 14 + 4r → r = 4</p>
                      </div>
                      <AlertBox tipo="warning" titulo="Macete Tático">
                        Entre aₘ e aₙ existem <strong>(n−m) intervalos</strong>, NÃO (n−m+1). Muitos candidatos erram por contar os "postes" em vez dos "espaços entre postes".
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          {/* FlipCards - Variações da fórmula */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Isolando Variáveis"
              description="A CESGRANRIO pede a₁, r, n ou aₙ. Saiba isolar cada uma."
              variant="cyan"
              className="mb-6"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FlipCard
                frente={
                  <div className="text-center space-y-3">
                    <p className="text-3xl font-mono font-bold text-emerald-400">Achar r</p>
                    <p className="text-sm text-muted-foreground">Quando a₁ e aₙ são dados</p>
                  </div>
                }
                verso={
                  <div className="space-y-3">
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                      <p className="text-sm font-mono text-center">r = (aₙ − a₁) / (n − 1)</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Ex: a₁=3, a₁₀=30 → r = (30−3)/9 = 3
                    </p>
                  </div>
                }
              />
              <FlipCard
                frente={
                  <div className="text-center space-y-3">
                    <p className="text-3xl font-mono font-bold text-cyan-400">Achar n</p>
                    <p className="text-sm text-muted-foreground">Quantos termos tem a PA?</p>
                  </div>
                }
                verso={
                  <div className="space-y-3">
                    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
                      <p className="text-sm font-mono text-center">n = (aₙ − a₁) / r + 1</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Ex: PA (7, 12, ..., 102) → n = (102−7)/5 + 1 = 20 termos
                    </p>
                  </div>
                }
              />
            </div>
          </section>

          <FunctionGraph
            title="Fórmula do Termo Geral: a_n = a₁ + (n-1)·r"
            functions={[
              {
                id: "tg-a5-r4",
                label: "a₁=5, r=4",
                color: "#3b82f6",
                fn: (x: number) => 5 + 4 * (x - 1),
                strokeWidth: 2,
              } satisfies FunctionPlot,
              {
                id: "tg-a10-r2",
                label: "a₁=10, r=2",
                color: "#ef4444",
                fn: (x: number) => 10 + 2 * (x - 1),
                strokeWidth: 2,
              } satisfies FunctionPlot,
            ]}
            xMin={0}
            xMax={10}
            yMin={0}
            yMax={50}
            points={10}
          />

          <section id="quiz-modulo-2" className="mt-16">
            <QuizInterativo
              questoes={quizTermoGeral}
              titulo="Quiz - Termo Geral"
              icone="🧮"
              numero={2}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 3: SOMA DOS TERMOS (GAUSS)                                */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <ModuleBanner
          numero={3}
          titulo="Soma dos Termos da PA"
          descricao="A fórmula de Gauss: o método genial que soma centenas de termos em segundos."
          gradiente="bg-gradient-to-br from-amber-600 via-orange-600 to-red-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="A Fórmula de Gauss"
              description="A história do garoto que humilhou o professor e criou uma das fórmulas mais úteis da matemática."
              variant="amber"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Soma de uma PA Finita"
              icone="🧮"
              corIndicador="bg-amber-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "A história de Gauss",
                  icone: "👦",
                  conteudo:(
                    <div className="space-y-4">
                      <p>
                        Conta a lenda que, aos 10 anos, <strong>Carl Friedrich Gauss</strong> foi desafiado pelo professor a somar os números de 1 a 100. Enquanto os colegas somavam um a um, Gauss percebeu um padrão: empareou o primeiro com o último (1+100=101), o segundo com o penúltimo (2+99=101)... formando <strong>50 pares de soma 101</strong>.
                      </p>
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                        <p className="text-sm font-mono text-center font-bold">
                          S₁₀₀ = (1 + 100) × 100 / 2 = 5050
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Essa ideia gera a fórmula universal da soma de PA.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "As duas formas da fórmula",
                  icone: "📐",
                  conteudo:(
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20">
                          <p className="text-xs font-bold text-amber-500 mb-2">Forma 1 (quando se conhece aₙ)</p>
                          <p className="text-sm font-mono font-bold">Sₙ = (a₁ + aₙ) · n / 2</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Usada quando o último termo é conhecido ou fácil de calcular.
                          </p>
                        </div>
                        <div className="p-4 bg-orange-500/5 rounded-xl border border-orange-500/20">
                          <p className="text-xs font-bold text-orange-500 mb-2">Forma 2 (quando se conhece r)</p>
                          <p className="text-sm font-mono font-bold">Sₙ = n·a₁ + n(n−1)·r/2</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Usada quando o último termo não é dado diretamente.
                          </p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Qual usar na prova?">
                        Se a questão dá a₁ e aₙ (ou é fácil calcular aₙ), use a <strong>Forma 1</strong>. Se dá a₁ e r sem mencionar aₙ, use a <strong>Forma 2</strong>. Na dúvida, calcule aₙ primeiro e use a Forma 1 — é menos propensa a erros de cálculo.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Aplicação industrial",
                  icone: "🏭",
                  conteudo:(
                    <div className="space-y-4">
                      <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                        <p className="text-xs font-bold text-indigo-400 mb-2">Produção acumulada na plataforma</p>
                        <p className="text-sm mb-2">
                          Uma plataforma offshore produz 1000 barris no 1º dia e aumenta 50 barris/dia. Produção total em 30 dias?
                        </p>
                        <p className="text-sm">a₁=1000, r=50, n=30</p>
                        <p className="text-sm">a₃₀ = 1000 + 29·50 = 2450</p>
                        <p className="text-sm font-bold">S₃₀ = (1000+2450)·30/2 = <strong>51.750 barris</strong></p>
                      </div>
                      <AlertBox tipo="info" titulo="Na vida real">
                        Esse tipo de cálculo de produção acumulada é usado em relatórios de ANP (Agência Nacional do Petróleo) e projeções de reserva dos campos da Petrobras.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          {/* Sₙ como função quadrática */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Sₙ é uma Parábola!"
              description="A conexão entre PA e funções quadráticas que a CESGRANRIO adora."
              variant="amber"
              className="mb-6"
            />
            <div className="space-y-4">
              <p>
                Reescrevendo Sₙ = n·a₁ + n(n−1)·r/2, temos:
              </p>
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
                <p className="text-sm font-mono text-center">
                  Sₙ = (r/2)·n² + (a₁ − r/2)·n
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Isso é um <strong>polinômio de grau 2 em n</strong>. O gráfico de Sₙ × n é uma parábola. Se r {">"} 0, a parábola abre para cima. Se r {"<"} 0, abre para baixo.
              </p>
              <AlertBox tipo="warning" titulo="Dica CESGRANRIO">
                Se a banca diz "Sₙ = 3n² + 2n", você pode extrair: <strong>r = 2·A = 2·3 = 6</strong> (onde A é o coeficiente de n²). E a₁ = S₁ = 3+2 = 5. Economiza tempo enorme.
              </AlertBox>
            </div>
          </section>

          <section id="quiz-modulo-3" className="mt-16">
            <QuizInterativo
              questoes={quizSoma}
              titulo="Quiz - Soma dos Termos"
              icone="➕"
              numero={3}
              variant="amber"
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 4: PROPRIEDADES E TERMOS EQUIDISTANTES                    */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner
          numero={4}
          titulo="Propriedades e Termos Equidistantes"
          descricao="Os atalhos que transformam questões de 5 minutos em 30 segundos."
          gradiente="bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Termos Equidistantes dos Extremos"
              description="A propriedade mais poderosa da PA para provas."
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="A Simetria da PA"
              icone="⚖️"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Propriedade fundamental",
                  icone: "🔑",
                  conteudo:(
                    <div className="space-y-4">
                      <p>
                        Em toda PA, a <strong>soma de dois termos equidistantes dos extremos é constante</strong>:
                      </p>
                      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                        <p className="text-sm font-mono text-center font-bold">
                          a₁ + aₙ = a₂ + aₙ₋₁ = a₃ + aₙ₋₂ = ... = constante
                        </p>
                      </div>
                      <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                        <p className="text-xs font-bold text-emerald-500 mb-2">Exemplo visual</p>
                        <p className="text-sm">PA: (3, 7, 11, 15, 19)</p>
                        <p className="text-sm">a₁+a₅ = 3+19 = <strong>22</strong></p>
                        <p className="text-sm">a₂+a₄ = 7+15 = <strong>22</strong> ✓</p>
                        <p className="text-sm">a₃+a₃ = 11+11 = <strong>22</strong> ✓</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Soma via termo central",
                  icone: "🎯",
                  conteudo:(
                    <div className="space-y-4">
                      <p>
                        Se a PA tem <strong>número ímpar de termos</strong>, o termo central é especial:
                      </p>
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                        <p className="text-sm font-mono text-center font-bold">
                          Sₙ = n · a_central (quando n é ímpar)
                        </p>
                      </div>
                      <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                        <p className="text-xs font-bold text-cyan-500 mb-2">Atalho matador</p>
                        <p className="text-sm">
                          "Uma PA de 15 termos tem soma 450. Qual o 8º termo?"
                        </p>
                        <p className="text-sm">
                          S₁₅ = 15 · a₈ → a₈ = 450/15 = <strong>30</strong>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Resolvido em 5 segundos, sem precisar de a₁ ou r!
                        </p>
                      </div>
                      <AlertBox tipo="danger" titulo="Exceção">
                        Essa propriedade SÓ funciona com número ímpar de termos. Com número par, não existe "termo central" e a fórmula não se aplica.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "3 termos em PA (sistema simplificado)",
                  icone: "🔧",
                  conteudo:(
                    <div className="space-y-4">
                      <p>
                        Quando a questão pede 3 termos consecutivos de uma PA, use a substituição inteligente:
                      </p>
                      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                        <p className="text-sm font-mono text-center">
                          Termos: <strong>(a−r), a, (a+r)</strong>
                        </p>
                        <p className="text-xs text-center text-muted-foreground mt-1">Soma = 3a (a razão cancela!)</p>
                      </div>
                      <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/20">
                        <p className="text-xs font-bold text-rose-400 mb-2">Exemplo clássico</p>
                        <p className="text-sm">"3 termos em PA somam 24 e o produto é 440."</p>
                        <p className="text-sm">3a = 24 → a = 8</p>
                        <p className="text-sm">(8−r)·8·(8+r) = 440 → 8(64−r²) = 440 → r² = 9 → r = 3</p>
                        <p className="text-sm font-bold">PA: (5, 8, 11)</p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-4" className="mt-16">
            <QuizInterativo
              questoes={quizPropriedades}
              titulo="Quiz - Propriedades da PA"
              icone="⚖️"
              numero={4}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 5: INTERPOLAÇÃO ARITMÉTICA                                */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="Interpolação Aritmética"
          descricao="Inserir meios aritméticos entre dois valores: o conceito que une PA com aplicações práticas."
          gradiente="bg-gradient-to-br from-cyan-600 via-teal-600 to-emerald-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Meios Aritméticos"
              description="Preencher lacunas entre dois valores mantendo padrão PA."
              variant="cyan"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Interpolação de Meios"
              icone="🔗"
              corIndicador="bg-cyan-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "O que é interpolação?",
                  icone: "📏",
                  conteudo:(
                    <div className="space-y-4">
                      <p>
                        <strong>Interpolar k meios aritméticos</strong> entre dois valores a₁ e aₙ significa inserir k termos entre eles de modo que a sequência resultante seja uma PA.
                      </p>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
                        <p className="text-sm font-mono text-center font-bold">
                          n = k + 2 (total de termos)
                        </p>
                        <p className="text-sm font-mono text-center">
                          r = (aₙ − a₁) / (k + 1)
                        </p>
                      </div>
                      <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                        <p className="text-xs font-bold text-emerald-500 mb-2">Exemplo</p>
                        <p className="text-sm">Interpolar 4 meios entre 3 e 23:</p>
                        <p className="text-sm">Total: 4+2 = 6 termos. r = (23−3)/5 = 4</p>
                        <p className="text-sm font-bold">PA: 3, 7, 11, 15, 19, 23</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Aplicação na expansão Petrobras",
                  icone: "🏭",
                  conteudo:(
                    <div className="space-y-4">
                      <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                        <p className="text-xs font-bold text-indigo-400 mb-2">Cenário real</p>
                        <p className="text-sm mb-2">
                          A Petrobras planeja expandir a produção de <strong>200 para 500 barris/dia</strong> em 6 etapas iguais (progressivas). Qual o aumento por etapa?
                        </p>
                        <p className="text-sm">6 etapas = 7 pontos (termos). r = (500−200)/6 = 50 barris/etapa</p>
                        <p className="text-sm font-bold">Cronograma: 200, 250, 300, 350, 400, 450, 500</p>
                      </div>
                      <AlertBox tipo="info" titulo="Onde aparece na indústria">
                        Planejamento de ramp-up de produção, escalonamento de manutenção preventiva, calibração gradual de instrumentos — todos usam interpolação aritmética.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-5" className="mt-16">
            <QuizInterativo
              questoes={quizInterpolacao}
              titulo="Quiz - Interpolação"
              icone="🔗"
              numero={5}
              variant="cyan"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 6: PA E FUNÇÕES                                           */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <ModuleBanner
          numero={6}
          titulo="PA e Funções"
          descricao="A conexão fundamental: PA é função afim, Sₙ é função quadrática."
          gradiente="bg-gradient-to-br from-rose-600 via-pink-600 to-red-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="PA = Função Afim"
              description="Por que o gráfico de uma PA são pontos alinhados."
              variant="rose"
              className="mb-6"
            />
            <ContentAccordion
              titulo="PA como Função de 1º Grau"
              icone="📈"
              corIndicador="bg-rose-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "aₙ = rn + (a₁ − r)",
                  icone: "📊",
                  conteudo:(
                    <div className="space-y-4">
                      <p>
                        Reescrevendo aₙ = a₁ + (n−1)r:
                      </p>
                      <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4">
                        <p className="text-sm font-mono text-center">
                          aₙ = rn + (a₁ − r) → aₙ = <strong>A</strong>n + <strong>B</strong>
                        </p>
                      </div>
                      <p className="text-sm">Onde:</p>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        <li><strong>A = r</strong> (coeficiente angular = razão)</li>
                        <li><strong>B = a₁ − r</strong> (coeficiente linear)</li>
                      </ul>
                      <AlertBox tipo="warning" titulo="Macete infalível">
                        Se a banca diz "aₙ = 3n + 2", a razão é <strong>3</strong> (coeficiente de n) e a₁ = 3(1)+2 = <strong>5</strong>. Não precisa fazer nenhuma conta extra.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Sₙ como parábola (revisão ampliada)",
                  icone: "🎢",
                  conteudo:(
                    <div className="space-y-4">
                      <p>
                        Se aₙ (termo geral) é função de 1º grau em n, então Sₙ (soma) é função de <strong>2º grau em n</strong>. Isso significa:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-xs font-bold text-emerald-500 mb-2">PA crescente (r {">"} 0)</p>
                          <p className="text-sm">Sₙ = parábola com concavidade para <strong>cima</strong></p>
                          <p className="text-xs text-muted-foreground">A soma cresce cada vez mais rápido</p>
                        </div>
                        <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/20">
                          <p className="text-xs font-bold text-rose-500 mb-2">PA decrescente (r {"<"} 0)</p>
                          <p className="text-sm">Sₙ = parábola com concavidade para <strong>baixo</strong></p>
                          <p className="text-xs text-muted-foreground">A soma atinge um máximo e depois diminui</p>
                        </div>
                      </div>
                      <AlertBox tipo="danger" titulo="Pegadinha CESGRANRIO">
                        "Qual o valor de n que MAXIMIZA a soma Sₙ?" — Só faz sentido em PA <strong>decrescente</strong>. A soma máxima ocorre quando aₙ = 0 (último termo não-negativo). Iguale aₙ ≥ 0 e encontre n.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <FunctionGraph
            title="PA como Função Linear: a_n = rn + (a₁ - r)"
            functions={[
              {
                id: "lin-3n2",
                label: "f(n) = 3n + 2",
                color: "#3b82f6",
                fn: (x: number) => 3 * x + 2,
                strokeWidth: 2,
              } satisfies FunctionPlot,
              {
                id: "lin-neg-n20",
                label: "f(n) = -n + 20",
                color: "#ef4444",
                fn: (x: number) => -x + 20,
                strokeWidth: 2,
              } satisfies FunctionPlot,
            ]}
            xMin={0}
            xMax={15}
            yMin={-5}
            yMax={50}
            points={15}
          />

          <section id="quiz-modulo-6" className="mt-16">
            <QuizInterativo
              questoes={quizFuncoes}
              titulo="Quiz - PA e Funções"
              icone="📈"
              numero={6}
              variant="rose"
              onComplete={(score) => handleModuleComplete("modulo-6", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 7: PA NA PRÁTICA INDUSTRIAL                               */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <ModuleBanner
          numero={7}
          titulo="PA na Prática Industrial"
          descricao="Problemas reais de produção, manutenção e operação resolvidos com PA."
          gradiente="bg-gradient-to-br from-teal-600 via-emerald-600 to-green-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Modelagem com PA"
              description="Transformando enunciados industriais em equações de PA."
              variant="emerald"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Cenários Industriais"
              icone="🏭"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Manutenção programada",
                  icone: "🔧",
                  conteudo:(
                    <div className="space-y-4">
                      <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                        <p className="text-xs font-bold text-emerald-500 mb-2">Cenário</p>
                        <p className="text-sm">
                          Uma bomba centrífuga na RPBC perde 2% de eficiência por mês. Começando com 100%, após quantos meses atinge 80% (limite para intervenção)?
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm"><strong>Modelagem:</strong> a₁ = 100, r = −2</p>
                        <p className="text-sm">aₙ = 80 → 80 = 100 + (n−1)(−2)</p>
                        <p className="text-sm">−20 = −2(n−1) → n−1 = 10 → n = 11</p>
                        <p className="text-sm font-bold">A manutenção deve ser feita no 11º mês (após 10 meses de operação).</p>
                      </div>
                      <AlertBox tipo="info" titulo="Interpretação cuidadosa">
                        a₁ é o <strong>estado inicial</strong> (mês 1). A 11ª leitura é após 10 intervalos. Cuidado com o "off-by-one" — erro que reprova em questões de PA industrial.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Produção acumulada",
                  icone: "📊",
                  conteudo:(
                    <div className="space-y-4">
                      <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                        <p className="text-xs font-bold text-cyan-500 mb-2">Cenário</p>
                        <p className="text-sm">
                          Um poço produz 1000 barris no 1º dia e aumenta 50 barris/dia. Em 30 dias, qual a produção total?
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm">a₁=1000, r=50, n=30</p>
                        <p className="text-sm">a₃₀ = 1000 + 29·50 = 2450</p>
                        <p className="text-sm font-bold">S₃₀ = (1000+2450)·30/2 = 51.750 barris</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Cronograma de treinamento NR",
                  icone: "📋",
                  conteudo:(
                    <div className="space-y-4">
                      <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20">
                        <p className="text-xs font-bold text-amber-500 mb-2">Cenário</p>
                        <p className="text-sm">
                          Um treinamento de NR-20 tem 8 módulos. O 1º dura 30 min, cada módulo seguinte dura 15 min a mais. Qual a duração total?
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm">a₁=30, r=15, n=8</p>
                        <p className="text-sm">a₈ = 30+7·15 = 135</p>
                        <p className="text-sm font-bold">S₈ = (30+135)·8/2 = 660 min = 11 horas</p>
                      </div>
                      <AlertBox tipo="warning" titulo="Dica de prova">
                        A CESGRANRIO frequentemente pede a conversão min → horas no final. 660/60 = 11h. Não esqueça de converter!
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-7" className="mt-16">
            <QuizInterativo
              questoes={quizPratica}
              titulo="Quiz - PA Industrial"
              icone="🏭"
              numero={7}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-7", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 8: TÓPICOS AVANÇADOS                                      */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <ModuleBanner
          numero={8}
          titulo="Tópicos Avançados"
          descricao="PA de 2ª ordem, PA + PG, e problemas de nível engenharia."
          gradiente="bg-gradient-to-br from-slate-600 via-zinc-600 to-neutral-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="PA de 2ª Ordem"
              description="Quando a sequência não é PA, mas as diferenças SIM."
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Diferenças que formam PA"
              icone="🔬"
              corIndicador="bg-slate-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Conceito de PA de 2ª ordem",
                  icone: "🧪",
                  conteudo:(
                    <div className="space-y-4">
                      <p>
                        Uma <strong>PA de 2ª ordem</strong> é uma sequência cujas <strong>diferenças consecutivas formam uma PA</strong>.
                      </p>
                      <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                        <p className="text-xs font-bold text-indigo-400 mb-2">Exemplo</p>
                        <p className="text-sm">Sequência: 1, 4, 9, 16, 25 (quadrados perfeitos)</p>
                        <p className="text-sm">Diferenças: 3, 5, 7, 9 → PA com r = 2 ✓</p>
                      </div>
                      <AlertBox tipo="info" titulo="Conexão importante">
                        A soma dos n primeiros termos de uma PA (que é Sₙ) é sempre uma PA de 2ª ordem! Os termos são os valores acumulados e as diferenças são os termos originais da PA.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "PA e PG simultâneas",
                  icone: "🔗",
                  conteudo:(
                    <div className="space-y-4">
                      <p>Se (a, b, c) é <strong>PA e PG ao mesmo tempo</strong>:</p>
                      <div className="space-y-2">
                        <p className="text-sm">PA: b = (a+c)/2</p>
                        <p className="text-sm">PG: b² = a·c</p>
                        <p className="text-sm">Substituindo: [(a+c)/2]² = ac → (a−c)² = 0 → <strong>a = b = c</strong></p>
                      </div>
                      <AlertBox tipo="danger" titulo="Conclusão para a prova">
                        A única sequência que é PA e PG ao mesmo tempo é a <strong>constante</strong> (todos os termos iguais). Se a banca perguntar, não hesite: a = b = c.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          {/* Múltiplos e soma */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Soma de Múltiplos"
              description="Questão clássica que aparece em TODA prova CESGRANRIO."
              variant="amber"
              className="mb-6"
            />
            <div className="space-y-4">
              <p>
                "Qual a soma de todos os múltiplos de k entre A e B?" é resolvida identificando uma PA:
              </p>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 space-y-2">
                <p className="text-sm"><strong>1.</strong> Primeiro múltiplo ≥ A → a₁</p>
                <p className="text-sm"><strong>2.</strong> Último múltiplo ≤ B → aₙ</p>
                <p className="text-sm"><strong>3.</strong> Razão r = k</p>
                <p className="text-sm"><strong>4.</strong> n = (aₙ − a₁)/k + 1</p>
                <p className="text-sm font-bold"><strong>5.</strong> Sₙ = (a₁ + aₙ) · n / 2</p>
              </div>
              <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                <p className="text-xs font-bold text-indigo-400 mb-2">Exemplo</p>
                <p className="text-sm">Soma dos múltiplos de 7 entre 1 e 200:</p>
                <p className="text-sm">a₁=7, aₙ=196, r=7, n=(196−7)/7+1=28</p>
                <p className="text-sm font-bold">S = (7+196)·28/2 = 2842</p>
              </div>
            </div>
          </section>

          <section id="quiz-modulo-8" className="mt-16">
            <QuizInterativo
              questoes={quizAvancado}
              titulo="Quiz - Tópicos Avançados"
              icone="🔬"
              numero={8}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-8", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 9: DESAFIO CESGRANRIO                                     */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
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
              title="Armadilhas Clássicas"
              description="Conheça os truques antes de cair neles."
              variant="rose"
              className="mb-6"
            />
            <ContentAccordion
              titulo="As 5 Armadilhas da CESGRANRIO em PA"
              icone="⚠️"
              corIndicador="bg-rose-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Armadilha 1: O (n−1)",
                  icone: "🪤",
                  conteudo:(
                    <div className="space-y-4">
                      <p>
                        O erro mais frequente: usar <strong>n</strong> em vez de <strong>(n−1)</strong> na fórmula do termo geral.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/20">
                          <p className="text-xs font-bold text-rose-500 mb-2">❌ ERRADO</p>
                          <p className="text-sm font-mono">a₂₀ = a₁ + 20·r</p>
                        </div>
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-xs font-bold text-emerald-500 mb-2">✅ CORRETO</p>
                          <p className="text-sm font-mono">a₂₀ = a₁ + 19·r</p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Mnemônico">
                        "O primeiro termo não anda." Se estou no 1º degrau de uma escada de 20 degraus, preciso subir <strong>19</strong> degraus (não 20).
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Armadilha 2: Termos vs Intervalos",
                  icone: "🪤",
                  conteudo:(
                    <div className="space-y-4">
                      <p>
                        "Um oleoduto tem 10 pontos de medição igualmente espaçados entre a estação A e B. Quantos <strong>trechos</strong> existem?"
                      </p>
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                        <p className="text-sm">
                          10 pontos = <strong>9 trechos</strong>. N pontos geram (N−1) intervalos.
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Analogia dos postes: 10 postes na cerca = 9 espaços entre eles. Quando a banca fala em "etapas" ou "trechos", pense em intervalos (n−1).
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Armadilha 3: Soma dos ímpares",
                  icone: "🪤",
                  conteudo:(
                    <div className="space-y-4">
                      <p>Identidade que <strong>cai em toda prova</strong>:</p>
                      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                        <p className="text-sm font-mono text-center font-bold">
                          1 + 3 + 5 + ... + (2n−1) = n²
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm">1 = 1² ✓</p>
                        <p className="text-sm">1+3 = 4 = 2² ✓</p>
                        <p className="text-sm">1+3+5 = 9 = 3² ✓</p>
                        <p className="text-sm">1+3+5+7 = 16 = 4² ✓</p>
                      </div>
                      <AlertBox tipo="info" titulo="Na prova">
                        Se pedir "soma dos 50 primeiros ímpares", a resposta é <strong>50² = 2500</strong>. Não perca tempo somando.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Armadilha 4: Soma máxima",
                  icone: "🪤",
                  conteudo:(
                    <div className="space-y-4">
                      <p>
                        Em PA <strong>decrescente</strong>, a soma pode atingir um máximo e depois diminuir (porque os termos ficam negativos).
                      </p>
                      <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/20">
                        <p className="text-xs font-bold text-rose-500 mb-2">Exemplo</p>
                        <p className="text-sm">PA: (15, 11, 7, 3, −1, −5, ...)</p>
                        <p className="text-sm">S₁=15, S₂=26, S₃=33, S₄=<strong>36</strong>, S₅=35, S₆=30...</p>
                        <p className="text-sm font-bold">Soma máxima em S₄ = 36</p>
                      </div>
                      <AlertBox tipo="warning" titulo="Método rápido">
                        A soma é máxima quando incluímos todos os termos ≥ 0. Encontre n tal que aₙ ≥ 0 e aₙ₊₁ {"<"} 0.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Armadilha 5: PA constante",
                  icone: "🪤",
                  conteudo:(
                    <div className="space-y-4">
                      <p>
                        (7, 7, 7, 7) é uma <strong>PA válida com r = 0</strong>. Candidatos marcam "não é PA" e perdem pontos fáceis.
                      </p>
                      <AlertBox tipo="danger" titulo="Memorize">
                        Toda sequência constante é PA (r=0) E PG (q=1) ao mesmo tempo. A banca explora isso em questões de V ou F.
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
              titulo="Quiz - Desafio CESGRANRIO"
              icone="🏆"
              numero={9}
              variant="rose"
              onComplete={(score) => handleModuleComplete("modulo-9", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 10: SIMULADO FINAL                                        */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <ModuleBanner
          numero={10}
          titulo="Simulado Final"
          descricao="Teste seus conhecimentos com questões de revisão completa. Aprovação ≥ 60%."
          gradiente="bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-600"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Resumo Rápido: Tudo sobre PA"
              description="Revise as fórmulas antes do simulado."
              variant="amber"
              className="mb-6"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                <p className="text-xs font-bold text-indigo-400 mb-2">Termo Geral</p>
                <p className="text-sm font-mono">aₙ = a₁ + (n−1)·r</p>
              </div>
              <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                <p className="text-xs font-bold text-emerald-500 mb-2">Soma (Gauss)</p>
                <p className="text-sm font-mono">Sₙ = (a₁+aₙ)·n/2</p>
              </div>
              <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                <p className="text-xs font-bold text-cyan-500 mb-2">Razão</p>
                <p className="text-sm font-mono">r = (aₙ−a₁)/(n−1)</p>
              </div>
              <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20">
                <p className="text-xs font-bold text-amber-500 mb-2">Nº de termos</p>
                <p className="text-sm font-mono">n = (aₙ−a₁)/r + 1</p>
              </div>
              <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/20">
                <p className="text-xs font-bold text-rose-500 mb-2">Equidistantes</p>
                <p className="text-sm font-mono">a₁+aₙ = a₂+aₙ₋₁</p>
              </div>
              <div className="p-4 bg-violet-500/5 rounded-xl border border-violet-500/20">
                <p className="text-xs font-bold text-violet-500 mb-2">Ímpares</p>
                <p className="text-sm font-mono">1+3+...+(2n−1) = n²</p>
              </div>
            </div>
          </section>

          <section id="quiz-modulo-10" className="mt-16">
            <QuizInterativo
              questoes={quizSimulado}
              titulo="Simulado Final - PA"
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










