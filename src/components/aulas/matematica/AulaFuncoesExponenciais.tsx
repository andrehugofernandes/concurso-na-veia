// Last modified: 2026-03-13 - Upgraded with ModuleConsolidation
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
  AulaTemplate,
  ModuleSectionHeader,
  CardCarousel,
  FunctionGraph,
  ModuleConsolidation,
  type FunctionPlot,
} from "../shared";
import { getModuleVariant } from "@/lib/moduleColors";

import {
  LuBookOpen,
  LuTarget,
  LuTrendingUp,
  LuTrophy,
  LuBrain,
  LuZap,
} from "react-icons/lu";

import {
  QUIZ_M1_POTENCIACAO,
  QUIZ_M2_GRAFICO,
  QUIZ_M3_EQUACOES,
  QUIZ_M4_APLICACOES,
  QUIZ_M5_FINAL,
  QUIZ_M6_LOGARITMO_E,
  QUIZ_M7_TRANSFORMACOES,
  QUIZ_M8_SISTEMAS,
  QUIZ_M9_PETROBRASESPECIFICO,
  QUIZ_M10_SIMULADO_MESTRE,
} from "./data/funcoes-exponenciais-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Potenciação e Bases" },
  { id: "modulo-2", label: "Módulo 2", title: "Gráficos e Comportamento" },
  { id: "modulo-3", label: "Módulo 3", title: "Equações Exponenciais" },
  { id: "modulo-4", label: "Módulo 4", title: "Crescimento e Decaimento" },
  { id: "modulo-5", label: "Módulo 5", title: "Desafio Parcial" },
  { id: "modulo-6", label: "Módulo 6", title: "Número e e Logaritmo" },
  { id: "modulo-7", label: "Módulo 7", title: "Transformações" },
  { id: "modulo-8", label: "Módulo 8", title: "Sistemas Exponenciais" },
  { id: "modulo-9", label: "Módulo 9", title: "Aplicações Petrobras" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
] as const;

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

  const [quizM1] = useState(() =>
    getRandomQuestions(QUIZ_M1_POTENCIACAO, 4),
  );
  const [quizM2] = useState(() =>
    getRandomQuestions(QUIZ_M2_GRAFICO, 4),
  );
  const [quizM3] = useState(() =>
    getRandomQuestions(QUIZ_M3_EQUACOES, 4),
  );
  const [quizM4] = useState(() =>
    getRandomQuestions(QUIZ_M4_APLICACOES, 4),
  );
  const [quizM5] = useState(() => getRandomQuestions(QUIZ_M5_FINAL, 4));
  const [quizM6] = useState(() =>
    getRandomQuestions(QUIZ_M6_LOGARITMO_E, 4),
  );
  const [quizM7] = useState(() =>
    getRandomQuestions(QUIZ_M7_TRANSFORMACOES, 4),
  );
  const [quizM8] = useState(() =>
    getRandomQuestions(QUIZ_M8_SISTEMAS, 4),
  );
  const [quizM9] = useState(() =>
    getRandomQuestions(QUIZ_M9_PETROBRASESPECIFICO, 4),
  );
  const [quizM10] = useState(() =>
    getRandomQuestions(QUIZ_M10_SIMULADO_MESTRE, 5),
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
            titulo="Potenciação Base"
            descricao="Onde tudo começa. Dominar as potências é o degrau principal."
            gradiente="bg-gradient-to-br from-blue-700 to-sky-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Regras Ocultas"
              description="A matemática trata potências com regras imutáveis."
              variant={getModuleVariant(1)}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - As Leis da Potência",
                  icone:<LuZap />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Não dependa de sorte. Dependa das propriedades matemáticas fundamentais que estruturam toda a exponenciação:
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 text-center">
                          <p className="font-mono font-bold text-blue-700 text-lg">
                            aᵐ × aⁿ = aᵐ⁺ⁿ
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Multiplicação de Mesma Base = Soma os expoentes.
                          </p>
                        </div>
                        <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 text-center">
                          <p className="font-mono font-bold text-blue-700 text-lg">
                            aᵐ ÷ aⁿ = aᵐ⁻ⁿ
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Divisão de Mesma Base = Subtrai os expoentes.
                          </p>
                        </div>
                        <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 text-center">
                          <p className="font-mono font-bold text-blue-700 text-lg">
                            (aᵐ)ⁿ = aᵐˣⁿ
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Potência de Potência = Multiplica os expoentes.
                          </p>
                        </div>
                        <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 text-center">
                          <p className="font-mono font-bold text-blue-700 text-lg">
                            a⁻ⁿ = 1/aⁿ
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Expoente Negativo = Inverte a base.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Aplicações Práticas",
                  icone:<LuTarget />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Veja como essas regras funcionam em situações reais:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-sky-500/10 p-4 rounded-lg border border-sky-500/20">
                          <p className="text-sm font-bold text-sky-700 mb-2">Exemplo 1: Simplificação</p>
                          <p className="text-sm font-mono">2³ × 2⁵ = 2⁸ = 256 (em vez de 8 × 32)</p>
                        </div>
                        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                          <p className="text-sm font-bold text-blue-700 mb-2">Exemplo 2: Base Petrobras - Crescimento de Reservas</p>
                          <p className="text-sm">Se a produção quadruplica a cada ano (×4), em 3 anos: 4³ = 64× de aumento inicial.</p>
                        </div>
                        <div className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/20">
                          <p className="text-sm font-bold text-indigo-700 mb-2">Exemplo 3: Expoente Negativo</p>
                          <p className="text-sm font-mono">3⁻² = 1/9 (processos de decaimento)</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Macetes e Atalhos",
                  icone:<LuBrain />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Domine esses truques para não cometer erros bobos em prova:
                      </p>
                      <div className="space-y-2">
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                          <p className="text-sm font-bold text-emerald-700">📌 Memorize: 2ⁿ = 1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024</p>
                        </div>
                        <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                          <p className="text-sm font-bold text-cyan-700">📌 Sempre simplifique antes de calcular fatoriais</p>
                        </div>
                        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                          <p className="text-sm font-bold text-blue-700">📌 Base negativa + expoente par = resultado positivo</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Pegadinhas CESGRANRIO",
                  icone:<LuTrophy />,
                  conteudo:(
                    <div className="space-y-4">
                      <AlertBox tipo="warning" titulo="Erro Comum #1">
                        2³ + 2² ≠ 2⁵. NÃO se soma bases iguais com expoentes diferentes. (2³ + 2² = 8 + 4 = 12, não 32)
                      </AlertBox>
                      <AlertBox tipo="warning" titulo="Erro Comum #2">
                        (2+3)² ≠ 2² + 3². As parenteses mudaram tudo: 5² = 25, não 4 + 9 = 13.
                      </AlertBox>
                      <AlertBox tipo="warning" titulo="Erro Comum #3">
                        (-2)⁴ = 16, mas -2⁴ = -16. O sinal fora da base não é elevado.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <FunctionGraph
            title="Funções Exponenciais com Diferentes Bases"
            functions={[
              {
                id: "func-2x",
                label: "2^x",
                color: "#3b82f6",
                fn: (x) => Math.pow(2, x),
                strokeWidth: 2,
              },
              {
                id: "func-ex",
                label: "e^x",
                color: "#10b981",
                fn: (x) => Math.exp(x),
                strokeWidth: 2,
              },
              {
                id: "func-10x",
                label: "10^x",
                color: "#ef4444",
                fn: (x) => Math.pow(10, x),
                strokeWidth: 2,
              },
            ]}
            xMin={-3}
            xMax={3}
            yMin={-1}
            yMax={15}
            points={250}
          />

          <ModuleConsolidation
            index={1}
            variant={getModuleVariant(10)}
            video={{
              videoId: "kIq5CZlg8Ik",
              title: "Potenciação Base: Regras de Expoentes Explicadas",
              duration: "12:30"
            }}
            resumoVisual={{
              moduloNome: "Potenciação e Bases",
              tituloAula: "Funções Exponenciais",
              materia: "Matemática",
              images: [
                { title: "Regras de Expoentes", type: "Fórmulário", placeholderColor: "bg-blue-500/20" },
                { title: "Bases Comuns (2, 10, e)", type: "Tabela", placeholderColor: "bg-sky-500/20" },
                { title: "Gráficos de Crescimento", type: "Visual", placeholderColor: "bg-cyan-500/20" }
              ]
            }}
            maceteVisual={{
              title: "O Truque da Mesma Base",
              content: (
                <div className="space-y-4 text-left">
                  <p className="text-sm italic">"Quando vejo mesma base, automaticamente faço a operação dos expoentes"</p>
                  <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl font-mono text-center">
                    <p className="text-sm">aᵐ × aⁿ = a^(m+n)</p>
                    <p className="text-sm mt-2">aᵐ ÷ aⁿ = a^(m-n)</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "As Regras da Potenciação (Batida Matemática)",
              artista: "Prof. Exponencial"
            }}
          />

          <section id="quiz-modulo-1" className="mt-16">
            <QuizInterativo
              questoes={quizM1}
              titulo="Fixação - Potenciação"
              numero={1}
              variant={getModuleVariant(1)}
              icone="🧮"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 2 ═══ */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={2}
            titulo="Gráficos e Comportamento"
            descricao="Entenda como a base controla o crescimento ou decaimento visual da curva exponencial."
            gradiente="bg-gradient-to-br from-emerald-600 to-teal-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Leitura e Interpretação de Gráficos"
              description="A forma do gráfico depende essencialmente da base escolhida."
              variant={getModuleVariant(3)}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Características Fundamentais",
                  icone:<LuTarget />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Todo gráfico exponencial possui propriedades matemáticas imutáveis que dependem da base:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/20">
                          <p className="text-sm font-bold text-emerald-700">Base a {`>`} 1: CRESCENTE</p>
                          <p className="text-sm">Passa por (0, 1), sobe para ∞ quando x→∞, desce para 0 quando x→-∞</p>
                        </div>
                        <div className="bg-teal-500/10 p-4 rounded-lg border border-teal-500/20">
                          <p className="text-sm font-bold text-teal-700">Base 0 {`<`} a {`<`} 1: DECRESCENTE</p>
                          <p className="text-sm">Passa por (0, 1), desce para 0 quando x→∞, sobe para ∞ quando x→-∞</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Comparações de Bases",
                  icone:<LuTrendingUp />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Compare o comportamento de diferentes bases em contextos práticos:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                          <p className="text-sm font-bold text-green-700">Exemplo 1: Competição de Crescimento</p>
                          <p className="text-sm">Em x=10: 2¹⁰=1024, 10¹⁰=10 bilhões. Base maior = crescimento MUITO mais rápido.</p>
                        </div>
                        <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/20">
                          <p className="text-sm font-bold text-cyan-700">Exemplo 2: Petrobras - Depreciação de Equipamento</p>
                          <p className="text-sm">Valor = V₀ × (0,9)ᵗ representa 10% de perda anual. O gráfico desce.</p>
                        </div>
                        <div className="bg-sky-500/10 p-4 rounded-lg border border-sky-500/20">
                          <p className="text-sm font-bold text-sky-700">Exemplo 3: Juros Compostos</p>
                          <p className="text-sm">M = C × (1,05)ᵗ - base 1,05 garante crescimento de 5% ao período.</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Atalhos para Identificação",
                  icone:<LuBrain />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Identifique rapidamente o tipo de gráfico sem cálculos:
                      </p>
                      <div className="space-y-2">
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                          <p className="text-sm font-bold text-emerald-700">📌 Curva para cima (parecendo "J") = a {`>`} 1</p>
                        </div>
                        <div className="p-3 bg-teal-500/10 border border-teal-500/20 rounded-lg">
                          <p className="text-sm font-bold text-teal-700">📌 Curva para baixo (tipo "∩") = 0 {`<`} a {`<`} 1</p>
                        </div>
                        <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                          <p className="text-sm font-bold text-cyan-700">📌 SEMPRE passa por (0, 1), pois aº = 1</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Inversões de Gráfico",
                  icone:<LuTrophy />,
                  conteudo:(
                    <div className="space-y-4">
                      <AlertBox tipo="warning" titulo="Pegadinha #1">
                        Se o gráfico passa por (0,1) mas sobe para a ESQUERDA, não é exponencial pura. Pode ter transformação y = a⁻ˣ.
                      </AlertBox>
                      <AlertBox tipo="warning" titulo="Pegadinha #2">
                        Um gráfico de base {`>`} 1 pode virar de cabeça para baixo se tiver -f(x) na frente. Sempre verifique o sinal.
                      </AlertBox>
                      <AlertBox tipo="warning" titulo="Pegadinha #3">
                        y = 3 × 2ˣ cresce 3× mais rápido que y = 2ˣ, mas ainda passa por (0, 3), não (0, 1).
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <FunctionGraph
            title="Crescimento e Decaimento Exponencial"
            functions={[
              {
                id: "func-ex",
                label: "e^x",
                color: "#3b82f6",
                fn: (x) => Math.exp(x),
                strokeWidth: 2,
              },
              {
                id: "func-e-x",
                label: "e^(-x)",
                color: "#ef4444",
                fn: (x) => Math.exp(-x),
                strokeWidth: 2,
              },
            ]}
            xMin={-5}
            xMax={3}
            yMin={-1}
            yMax={8}
            points={250}
          />

          <ModuleConsolidation
            index={2}
            variant={getModuleVariant(3)}
            video={{
              videoId: "xsW3q0DTJJ4",
              title: "Gráficos Exponenciais: Crescimento vs Decaimento",
              duration: "11:15"
            }}
            resumoVisual={{
              moduloNome: "Gráficos e Comportamento",
              tituloAula: "Funções Exponenciais",
              materia: "Matemática",
              images: [
                { title: "Crescimento (a>1)", type: "Gráfico", placeholderColor: "bg-emerald-500/20" },
                { title: "Decaimento (0<a<1)", type: "Gráfico", placeholderColor: "bg-teal-500/20" },
                { title: "Ponto (0,1) em Todas", type: "Propriedade", placeholderColor: "bg-green-500/20" }
              ]
            }}
            maceteVisual={{
              title: "A Regra do Ponto Fixo",
              content: (
                <div className="space-y-4 text-left">
                  <p className="text-sm">Toda exponencial passa por (0, 1). Use isso como referência!</p>
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <p className="text-sm font-mono text-center">f(0) = a⁰ = 1 ✓</p>
                    <p className="text-xs text-center text-muted-foreground mt-2">Independente da base, sempre verdade</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
              titulo: "O Ritmo dos Gráficos (Crescimento Exponencial)",
              artista: "DJ Funções"
            }}
          />

          <section id="quiz-modulo-2" className="mt-16">
            <QuizInterativo
              questoes={quizM2}
              titulo="Fixação - Gráficos"
              numero={2}
              variant={getModuleVariant(3)}
              icone="📈"
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 3 ═══ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={3}
            titulo="Equações Exponenciais"
            descricao="Isolando a variável no expoente para encontrar respostas definitivas."
            gradiente="bg-gradient-to-br from-cyan-600 to-sky-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Arte de Cortar as Bases"
              description="Quando o 'x' está no céu, e você precisa puxá-lo pra terra."
              variant={getModuleVariant(2)}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Método Universal",
                  icone:<LuTarget />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        O objetivo final é sempre chegar num formato onde não haja dúvida das intenções:
                      </p>
                      <div className="bg-cyan-500/10 p-4 text-center rounded-xl border border-cyan-500/20">
                        <p className="font-mono text-xl font-bold text-cyan-700">
                          aˣ = aʸ ⟹ x = y
                        </p>
                      </div>
                      <p className="text-sm mt-2 text-muted-foreground">
                        Se <code>4ˣ = 8</code>, nós precisamos transformar o 4 em <code>2²</code> e o 8 em <code>2³</code>. Assim teremos <code>2²ˣ = 2³</code>. Cortam-se os números gigantes da base, ficamos com: <code>2x = 3</code>.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Casos Reais",
                  icone:<LuBrain />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Veja como resolver diferentes tipos de equações exponenciais:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-sky-500/10 p-4 rounded-lg border border-sky-500/20">
                          <p className="text-sm font-bold text-sky-700 mb-2">Caso 1: Mesma Base Directa</p>
                          <p className="text-sm font-mono">8ˣ = 32 → (2³)ˣ = 2⁵ → 2³ˣ = 2⁵ → 3x = 5 → x = 5/3</p>
                        </div>
                        <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/20">
                          <p className="text-sm font-bold text-cyan-700 mb-2">Caso 2: Petrobras - Modelo de Crescimento</p>
                          <p className="text-sm">Produção: P(t) = 100 × 2ᵗ. Se P(t) = 1600, então 2ᵗ = 16 = 2⁴, logo t = 4 anos.</p>
                        </div>
                        <div className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/20">
                          <p className="text-sm font-bold text-indigo-700 mb-2">Caso 3: Artifício Algébrico</p>
                          <p className="text-sm">3²ˣ + 3ˣ - 6 = 0 → Faça y = 3ˣ → y² + y - 6 = 0 → y = 2 ou y = -3 → 3ˣ = 2</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Estratégias Comprovadas",
                  icone:<LuZap />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Use essas táticas para evitar armadilhas:
                      </p>
                      <div className="space-y-2">
                        <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                          <p className="text-sm font-bold text-cyan-700">📌 Sempre reduza a bases primas (2, 3, 5, 7, 11...)</p>
                        </div>
                        <div className="p-3 bg-sky-500/10 border border-sky-500/20 rounded-lg">
                          <p className="text-sm font-bold text-sky-700">📌 Se tiver 2 bases diferentes, use logaritmo</p>
                        </div>
                        <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                          <p className="text-sm font-bold text-indigo-700">📌 Para equações quadradas, use substituição y = aˣ</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Armadilhas Clássicas",
                  icone:<LuTrophy />,
                  conteudo:(
                    <div className="space-y-4">
                      <AlertBox tipo="warning" titulo="Pegadinha #1">
                        2ˣ + 2ˣ = 4 NÃO é 2²ˣ. É 2 × 2ˣ = 2ˣ⁺¹. Cuidado com somas de exponenciais!
                      </AlertBox>
                      <AlertBox tipo="warning" titulo="Pegadinha #2">
                        Se chegar em 2ˣ = -4, NÃO tem solução. Exponenciais SEMPRE são positivas.
                      </AlertBox>
                      <AlertBox tipo="warning" titulo="Pegadinha #3">
                        (1/2)ˣ = 4 → 2⁻ˣ = 2² → -x = 2 → x = -2. Não se esqueça do sinal negativo!
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM3}
            titulo="Fixação - Equações"
            numero={3}
            variant={getModuleVariant(2)}
            icone="⚡"
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 4 ═══ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={4}
            titulo="Crescimento e Decaimento"
            descricao="Aplicações do mundo real onde a exponencial modela fenômenos naturais e financeiros."
            gradiente="bg-gradient-to-br from-blue-600 to-indigo-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Explosão e Extinção"
              description="N(t) modela todo o caos da natureza ou das finanças financeiras."
              variant={getModuleVariant(1)}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Crescimento Absoluto",
                  icone:<LuTrendingUp />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        A fórmula oficial da Banca para problemas da vida real sempre engole parâmetros cruciais:
                      </p>
                      <div className="bg-blue-500/10 p-4 border border-blue-500/20 text-center rounded-xl shadow-inner inline-block">
                        <p className="font-mono text-lg font-bold text-blue-700">
                          N(t) = N₀ × aᵗ
                        </p>
                      </div>
                      <p className="text-sm">
                        O <strong>N₀</strong> é o valor exato daquele dado (Bactérias, Dinheiro inicial etc) no Início (Tempo 0). E o <strong>a</strong> é a variação (se o texto disser que sobe 20% todo mês, ele será 1,20).
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Contextos Práticos",
                  icone:<LuTarget />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Veja exemplos reais de crescimento e decaimento exponencial:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                          <p className="text-sm font-bold text-green-700 mb-2">Exemplo 1: Crescimento Bacteriano</p>
                          <p className="text-sm">B(t) = 1000 × 2ᵗ (bactérias dobram a cada hora). Em 4 horas: B(4) = 1000 × 16 = 16.000 bactérias.</p>
                        </div>
                        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                          <p className="text-sm font-bold text-blue-700 mb-2">Exemplo 2: Juros Compostos Petrobras</p>
                          <p className="text-sm">Se investir R$ 10.000 a 10% ao ano: M(t) = 10.000 × (1,1)ᵗ. Em 5 anos: M(5) = 10.000 × 1,61051 ≈ R$ 16.105.</p>
                        </div>
                        <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                          <p className="text-sm font-bold text-red-700 mb-2">Exemplo 3: Decaimento Radioativo</p>
                          <p className="text-sm">N(t) = N₀ × (0,5)ᵗ/ᵀ (vida média T). Metade desaparece a cada período T.</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Identificação de Parâmetros",
                  icone:<LuBrain />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Domine a leitura do enunciado para extrair os dados corretos:
                      </p>
                      <div className="space-y-2">
                        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                          <p className="text-sm font-bold text-blue-700">📌 "Dobra a cada..." → multiplica por 2</p>
                        </div>
                        <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                          <p className="text-sm font-bold text-indigo-700">📌 "Cresce 5% ao..." → multiplica por 1,05</p>
                        </div>
                        <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                          <p className="text-sm font-bold text-cyan-700">📌 "Reduz em 20% a cada..." → multiplica por 0,80</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Leitura Cuidadosa",
                  icone:<LuTrophy />,
                  conteudo:(
                    <div className="space-y-4">
                      <AlertBox tipo="warning" titulo="Pegadinha #1">
                        "Taxa de 10% ao mês" ≠ multiplicar por 0,10. Multiplica por 1,10 (cresce 10% em cima do que tinha).
                      </AlertBox>
                      <AlertBox tipo="warning" titulo="Pegadinha #2">
                        "Vida média de 5730 anos" para C14 não significa exatamente (0,5)ᵗ/⁵⁷³⁰. Verifique se o problema reformula.
                      </AlertBox>
                      <AlertBox tipo="warning" titulo="Pegadinha #3">
                        "Dobra cada 2 horas" em 4 horas → 2 períodos → multiplica por 2² = 4, não por 2.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <ModuleConsolidation
            index={4}
            variant={getModuleVariant(1)}
            video={{
              videoId: "IJMB7qKMSME",
              title: "Crescimento e Decaimento Exponencial no Mundo Real",
              duration: "13:45"
            }}
            resumoVisual={{
              moduloNome: "Crescimento e Decaimento",
              tituloAula: "Funções Exponenciais",
              materia: "Matemática",
              images: [
                { title: "Fórmula N(t) = N₀ × aᵗ", type: "Estrutura", placeholderColor: "bg-blue-500/20" },
                { title: "Exemplos Biológicos", type: "Aplicação", placeholderColor: "bg-green-500/20" },
                { title: "Exemplos Financeiros", type: "Aplicação", placeholderColor: "bg-emerald-500/20" }
              ]
            }}
            maceteVisual={{
              title: "O Macete da Base",
              content: (
                <div className="space-y-4 text-left">
                  <p className="text-sm">Percentual → Base da fórmula é imediato:</p>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl font-bold text-sm text-center">
                    <p>+5% ao mês → a = 1.05</p>
                    <p className="mt-2">-10% ao ano → a = 0.90</p>
                    <p className="mt-2">Dobra → a = 2</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
              titulo: "O Crescimento da Vida (Beat Exponencial)",
              artista: "Prof. Natureza"
            }}
          />

          <section id="quiz-modulo-4" className="mt-16">
            <QuizInterativo
              questoes={quizM4}
              titulo="Fixação - Aplicações"
              numero={4}
              variant={getModuleVariant(1)}
              icone="🌍"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 5 ═══ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={5}
            titulo="Desafio Parcial"
            descricao="Teste seus conhecimentos em problemas mistos de exponenciais."
            gradiente="bg-gradient-to-br from-amber-600 to-orange-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Revisão Estratégica"
              description="Sintetizando os conceitos dos módulos anteriores."
              variant={getModuleVariant(6)}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Integração de Conceitos",
                  icone:<LuZap />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Até agora você aprendeu as peças. Agora vamos conectar tudo:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                          <p className="text-sm font-bold text-amber-700">Regras (M1)</p>
                          <p className="text-sm">aᵐ × aⁿ = aᵐ⁺ⁿ, aᵐ ÷ aⁿ = aᵐ⁻ⁿ, (aᵐ)ⁿ = aᵐˣⁿ</p>
                        </div>
                        <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                          <p className="text-sm font-bold text-orange-700">Gráficos (M2)</p>
                          <p className="text-sm">Passa por (0,1), crescimento/decaimento conforme a base</p>
                        </div>
                        <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                          <p className="text-sm font-bold text-yellow-700">Equações (M3)</p>
                          <p className="text-sm">Igualar bases e expoentes, ou usar substituição</p>
                        </div>
                        <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                          <p className="text-sm font-bold text-red-700">Aplicações (M4)</p>
                          <p className="text-sm">N(t) = N₀ × aᵗ para crescimento/decaimento real</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Problemas Integrados",
                  icone:<LuTarget />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Problemas que combinam múltiplos conceitos:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                          <p className="text-sm font-bold text-amber-700 mb-2">Problema Integrado 1</p>
                          <p className="text-sm">Um investimento dobra a cada 5 anos (a=2, t em períodos de 5). Se começou com R$ 1000, quanto terá em 20 anos? Resposta: 1000 × 2⁴ = 16.000</p>
                        </div>
                        <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                          <p className="text-sm font-bold text-orange-700 mb-2">Problema Integrado 2</p>
                          <p className="text-sm">Petrobras: Produção P(t) = 100 × (1,2)ᵗ barris/dia. Quando atinge 172,8 barris/dia? Resolve 1,2ᵗ = 1,728 = 1,2³, logo t = 3 dias.</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Estratégia em Prova",
                  icone:<LuBrain />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Quando enfrentar problemas complexos:
                      </p>
                      <div className="space-y-2">
                        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                          <p className="text-sm font-bold text-amber-700">📌 Passo 1: Identifique N₀ (valor inicial)</p>
                        </div>
                        <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                          <p className="text-sm font-bold text-orange-700">📌 Passo 2: Identifique a (crescimento/taxa)</p>
                        </div>
                        <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                          <p className="text-sm font-bold text-yellow-700">📌 Passo 3: Montar e resolver N(t) = N₀ × aᵗ</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Ciladas Potenciais",
                  icone:<LuTrophy />,
                  conteudo:(
                    <div className="space-y-4">
                      <AlertBox tipo="warning" titulo="Cilada #1">
                        "Dobra a cada 5 anos em 20 anos" NÃO é 2²⁰, é 2⁴ (4 períodos de 5 anos cada).
                      </AlertBox>
                      <AlertBox tipo="warning" titulo="Cilada #2">
                        Se o problema diz "taxa contínua", pode envolver e ≈ 2,71828, não inteiros simples.
                      </AlertBox>
                      <AlertBox tipo="warning" titulo="Cilada #3">
                        Leia bem: "reduz para 90%" significa a=0,9 (fica 90%), não a=0,10 (reduz em 10%).
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <ModuleConsolidation
            index={5}
            variant={getModuleVariant(6)}
            video={{
              videoId: "8ydBPLXF0sE",
              title: "Desafio Parcial: Integrando Tudo de Exponenciais",
              duration: "14:20"
            }}
            resumoVisual={{
              moduloNome: "Desafio Parcial",
              tituloAula: "Funções Exponenciais",
              materia: "Matemática",
              images: [
                { title: "Fluxograma de Decisão", type: "Mapa", placeholderColor: "bg-amber-500/20" },
                { title: "Checklist de Passos", type: "Guia", placeholderColor: "bg-orange-500/20" },
                { title: "Erros Mais Comuns", type: "Alerta", placeholderColor: "bg-red-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Antes de Responder",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-sm font-bold">
                    <p>✓ Identifiquei N₀?</p>
                    <p className="mt-2">✓ Identifiquei a?</p>
                    <p className="mt-2">✓ Montei N(t) = N₀ × aᵗ?</p>
                    <p className="mt-2">✓ Resolvi a equação?</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
              titulo: "O Desafio Parcial (Trilha Épica)",
              artista: "Orquestra Matemática"
            }}
          />

          <section id="quiz-modulo-5" className="mt-16">
            <QuizInterativo
              questoes={quizM5}
              titulo="Desafio Parcial - Exponenciais"
              numero={5}
              variant={getModuleVariant(6)}
              icone="🎯"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 6 ═══ */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={6}
            titulo="Número e e Logaritmo Natural"
            descricao="A base mais importante do cálculo: Euler e seus mistérios."
            gradiente="bg-gradient-to-br from-rose-600 to-pink-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="O Número e"
              description="Compreendendo a constante mais importante além de π."
              variant={getModuleVariant(9)}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - O que é e?",
                  icone:<LuZap />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        O número e ≈ 2,71828... aparece naturalmente em processos de crescimento contínuo:
                      </p>
                      <div className="bg-rose-500/10 p-4 text-center rounded-xl border border-rose-500/20">
                        <p className="font-mono text-lg font-bold text-rose-700">
                          e = lim(1 + 1/n)ⁿ quando n→∞
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">Aproximadamente 2.71828182845904523536...</p>
                      </div>
                      <p className="text-sm">
                        Por que importa? Porque e é a base onde <strong>a derivada equals a própria função</strong>: d/dx(eˣ) = eˣ. É mágico!
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Contextos de e",
                  icone:<LuTarget />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Onde você encontra e na vida real:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/20">
                          <p className="text-sm font-bold text-pink-700 mb-2">Juros Compostos Contínuos</p>
                          <p className="text-sm">M = P × e^(rt) para capitalização contínua. Petrobras usa assim para investimentos.</p>
                        </div>
                        <div className="bg-rose-500/10 p-4 rounded-lg border border-rose-500/20">
                          <p className="text-sm font-bold text-rose-700 mb-2">Decaimento Radioativo</p>
                          <p className="text-sm">N(t) = N₀ × e^(-λt) modela perda contínua de massa em reações nucleares.</p>
                        </div>
                        <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                          <p className="text-sm font-bold text-red-700 mb-2">Crescimento Biológico</p>
                          <p className="text-sm">P(t) = P₀ × e^(kt) descreve crescimento de populações sem limites.</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Memorização e Cálculo",
                  icone:<LuBrain />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Trabalhe com e na calculadora:
                      </p>
                      <div className="space-y-2">
                        <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg">
                          <p className="text-sm font-bold text-rose-700">📌 e ≈ 2.718 (memorize com 3 casas decimais)</p>
                        </div>
                        <div className="p-3 bg-pink-500/10 border border-pink-500/20 rounded-lg">
                          <p className="text-sm font-bold text-pink-700">📌 ln(e) = 1 (logaritmo natural)</p>
                        </div>
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                          <p className="text-sm font-bold text-red-700">📌 e⁰ = 1, e¹ = e, e² ≈ 7.39</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Confusões Comuns",
                  icone:<LuTrophy />,
                  conteudo:(
                    <div className="space-y-4">
                      <AlertBox tipo="warning" titulo="Confusão #1">
                        e ≠ π. São constantes completamente diferentes! e ≈ 2,718 e π ≈ 3,14159.
                      </AlertBox>
                      <AlertBox tipo="warning" titulo="Confusão #2">
                        eˣ é EXPONENCIAL. Seu gráfico não é linear, cresce muito rápido para x {`>`} 0.
                      </AlertBox>
                      <AlertBox tipo="warning" titulo="Confusão #3">
                        ln(x) é o INVERSO de eˣ. Então ln(eˣ) = x e e^(ln x) = x sempre.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <ModuleConsolidation
            index={6}
            variant={getModuleVariant(9)}
            video={{
              videoId: "W5t6yP6sZWg",
              title: "O Número e: A Constante da Natureza",
              duration: "12:50"
            }}
            resumoVisual={{
              moduloNome: "Número e e Logaritmo Natural",
              tituloAula: "Funções Exponenciais",
              materia: "Matemática",
              images: [
                { title: "Convergência de e", type: "Gráfico", placeholderColor: "bg-rose-500/20" },
                { title: "Derivada de eˣ", type: "Conceito", placeholderColor: "bg-pink-500/20" },
                { title: "Relação com ln", type: "Propriedade", placeholderColor: "bg-red-500/20" }
              ]
            }}
            maceteVisual={{
              title: "O Número Mágico",
              content: (
                <div className="space-y-4 text-left">
                  <p className="text-sm italic">"e é a única base onde a derivada = a função original"</p>
                  <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl font-mono text-center">
                    <p className="text-sm">d/dx(eˣ) = eˣ ✓</p>
                    <p className="text-sm mt-2">d/dx(2ˣ) ≠ 2ˣ ✗</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
              titulo: "O Mistério do Número e (Jazz Matemático)",
              artista: "Euler & Friends"
            }}
          />

          <section id="quiz-modulo-6" className="mt-16">
            <QuizInterativo
              questoes={quizM6}
              titulo="Fixação - Módulo 6"
              numero={6}
              variant={getModuleVariant(9)}
              icone="🌌"
              onComplete={(score) => handleModuleComplete("modulo-6", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 7 ═══ */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={7}
            titulo="Transformações e Deslocamentos"
            descricao="Manipulando gráficos: translações, ampliações e reflexões."
            gradiente="bg-gradient-to-br from-indigo-600 to-purple-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Transformações de Funções"
              description="Veja como as operações algébricas alteram o gráfico."
              variant={getModuleVariant(10)}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Tipos de Transformações",
                  icone:<LuZap />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        As transformações aplicadas a f(x) = eˣ incluem:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-indigo-500/10 p-3 rounded-lg border border-indigo-500/20">
                          <p className="font-mono text-sm font-bold text-indigo-700">c*f(x)</p>
                          <p className="text-xs text-muted-foreground mt-1">Multiplicação por constante (ampliação vertical)</p>
                        </div>
                        <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                          <p className="font-mono text-sm font-bold text-purple-700">f(x - h)</p>
                          <p className="text-xs text-muted-foreground mt-1">Deslocamento horizontal para direita</p>
                        </div>
                        <div className="bg-violet-500/10 p-3 rounded-lg border border-violet-500/20">
                          <p className="font-mono text-sm font-bold text-violet-700">f(x) + k</p>
                          <p className="text-xs text-muted-foreground mt-1">Deslocamento vertical para cima</p>
                        </div>
                        <div className="bg-fuchsia-500/10 p-3 rounded-lg border border-fuchsia-500/20">
                          <p className="font-mono text-sm font-bold text-fuchsia-700">-f(x)</p>
                          <p className="text-xs text-muted-foreground mt-1">Reflexão sobre eixo x</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Combinações Práticas",
                  icone:<LuTarget />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Veja como combinar transformações em problemas reais:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/20">
                          <p className="text-sm font-bold text-indigo-700 mb-2">Exemplo 1: Ampliação</p>
                          <p className="text-sm font-mono">y = 3 × eˣ (cresce 3× mais rápido)</p>
                          <p className="text-sm">Ainda passa por (0,3) em vez de (0,1).</p>
                        </div>
                        <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                          <p className="text-sm font-bold text-purple-700 mb-2">Exemplo 2: Deslocamento</p>
                          <p className="text-sm font-mono">y = e^(x-2) (puxa para direita 2 unidades)</p>
                          <p className="text-sm">Passa por (2,1) em vez de (0,1).</p>
                        </div>
                        <div className="bg-violet-500/10 p-4 rounded-lg border border-violet-500/20">
                          <p className="text-sm font-bold text-violet-700 mb-2">Exemplo 3: Combinado Petrobras</p>
                          <p className="text-sm font-mono">y = 100 × e^(0.05t) + 500 (sobe de 500, multiplicado por 100)</p>
                          <p className="text-sm">Descreve produção com base mínima garantida.</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Identificação Rápida",
                  icone:<LuBrain />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Leia a função e identifique transformações rapidamente:
                      </p>
                      <div className="space-y-2">
                        <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                          <p className="text-sm font-bold text-indigo-700">📌 Coeficiente na frente → ampliação vertical</p>
                        </div>
                        <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                          <p className="text-sm font-bold text-purple-700">📌 Subtração no expoente → deslocamento direita</p>
                        </div>
                        <div className="p-3 bg-violet-500/10 border border-violet-500/20 rounded-lg">
                          <p className="text-sm font-bold text-violet-700">📌 Adição fora → deslocamento cima</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Erros de Interpretação",
                  icone:<LuTrophy />,
                  conteudo:(
                    <div className="space-y-4">
                      <AlertBox tipo="warning" titulo="Erro Comum #1">
                        eˣ⁻² ≠ e^(x-2). Parênteses fazem diferença! O segundo desloca, o primeiro não.
                      </AlertBox>
                      <AlertBox tipo="warning" titulo="Erro Comum #2">
                        2 × eˣ ≠ e^(2x). Multiplicação na frente amplia; multiplicação no expoente acelera.
                      </AlertBox>
                      <AlertBox tipo="warning" titulo="Erro Comum #3">
                        eˣ + 3 e eˣ - 3 deslocam verticalmente. NÃO alteram o fato de passar por (0, 1+3) = (0, 4) e (0, 1-3) = (0, -2).
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <FunctionGraph
            title="Transformações de Funções Exponenciais"
            functions={[
              {
                id: "func-ex",
                label: "e^x",
                color: "#3b82f6",
                fn: (x) => Math.exp(x),
                strokeWidth: 2,
              },
              {
                id: "func-2ex",
                label: "2*e^x",
                color: "#ef4444",
                fn: (x) => 2 * Math.exp(x),
                strokeWidth: 2,
              },
              {
                id: "func-e-x1",
                label: "e^(x-1)",
                color: "#10b981",
                fn: (x) => Math.exp(x - 1),
                strokeWidth: 2,
              },
            ]}
            xMin={-2}
            xMax={4}
            yMin={-1}
            yMax={20}
            points={250}
          />

          <ModuleConsolidation
            index={7}
            variant={getModuleVariant(10)}
            video={{
              videoId: "9w2EfgU-QjE",
              title: "Transformações de Funções Exponenciais",
              duration: "13:20"
            }}
            resumoVisual={{
              moduloNome: "Transformações e Deslocamentos",
              tituloAula: "Funções Exponenciais",
              materia: "Matemática",
              images: [
                { title: "Translações Horizontais", type: "Visualização", placeholderColor: "bg-indigo-500/20" },
                { title: "Translações Verticais", type: "Visualização", placeholderColor: "bg-purple-500/20" },
                { title: "Ampliações e Compressões", type: "Visualização", placeholderColor: "bg-violet-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Regra de Ouro das Transformações",
              content: (
                <div className="space-y-4 text-left">
                  <p className="text-sm font-bold">Sempre leia a função de fora para dentro:</p>
                  <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl font-mono text-sm text-center">
                    <p>c × f(x - h) + k</p>
                    <p className="mt-2">c = ampliação</p>
                    <p>h = deslocamento horizontal</p>
                    <p>k = deslocamento vertical</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
              titulo: "Dançando com Transformações (Remixado)",
              artista: "Graph Shifters"
            }}
          />

          <section id="quiz-modulo-7" className="mt-16">
            <QuizInterativo
              questoes={quizM7}
              titulo="Fixação - Módulo 7"
              numero={7}
              variant={getModuleVariant(10)}
              icone="🎨"
              onComplete={(score) => handleModuleComplete("modulo-7", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 8 ═══ */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={8}
            titulo="Sistemas Exponenciais"
            descricao="Combinando múltiplas bases e resolvendo problemas complexos."
            gradiente="bg-gradient-to-br from-emerald-600 to-green-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Resolução de Sistemas"
              description="Quando duas ou mais exponenciais se encontram."
              variant={getModuleVariant(3)}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Estrutura de Sistemas",
                  icone:<LuZap />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Um sistema exponencial envolve múltiplas equações com múltiplas bases ou variáveis:
                      </p>
                      <div className="bg-emerald-500/10 p-4 border border-emerald-500/20 rounded-xl">
                        <p className="text-sm font-mono text-center">2ˣ + 3ʸ = 11</p>
                        <p className="text-sm font-mono text-center mt-2">2ˣ - 3ʸ = -7</p>
                        <p className="text-sm text-center text-muted-foreground mt-2">Encontre x e y.</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Casos de Solução",
                  icone:<LuTarget />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Técnicas para resolver sistemas de exponenciais:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                          <p className="text-sm font-bold text-green-700 mb-2">Técnica 1: Substituição de Variáveis</p>
                          <p className="text-sm font-mono">Faça u = 2ˣ e v = 3ʸ</p>
                          <p className="text-sm">Resolva o sistema linear: u + v = 11, u - v = -7</p>
                        </div>
                        <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/20">
                          <p className="text-sm font-bold text-emerald-700 mb-2">Técnica 2: Soma/Subtração</p>
                          <p className="text-sm">Se 2ˣ + 2ˣ = 8, então 2 × 2ˣ = 8 → 2ˣ⁺¹ = 8 = 2³ → x+1 = 3 → x = 2</p>
                        </div>
                        <div className="bg-teal-500/10 p-4 rounded-lg border border-teal-500/20">
                          <p className="text-sm font-bold text-teal-700 mb-2">Exemplo Petrobras</p>
                          <p className="text-sm">Dois poços: P₁(t)=100×2ᵗ, P₂(t)=50×4ᵗ. Quando produzem igual?</p>
                          <p className="text-sm mt-1">100×2ᵗ = 50×4ᵗ → 100×2ᵗ = 50×(2²)ᵗ → 100×2ᵗ = 50×2²ᵗ → 2 = 2ᵗ → t = 1</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Estratégias Comprovadas",
                  icone:<LuBrain />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Quando se deparar com sistemas:
                      </p>
                      <div className="space-y-2">
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                          <p className="text-sm font-bold text-emerald-700">📌 Reduza a bases primas comuns</p>
                        </div>
                        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                          <p className="text-sm font-bold text-green-700">📌 Procure por múltiplos (4 = 2², 8 = 2³, etc)</p>
                        </div>
                        <div className="p-3 bg-teal-500/10 border border-teal-500/20 rounded-lg">
                          <p className="text-sm font-bold text-teal-700">📌 Use substituição se tiver muitos expoentes</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Ciladas em Sistemas",
                  icone:<LuTrophy />,
                  conteudo:(
                    <div className="space-y-4">
                      <AlertBox tipo="warning" titulo="Cilada #1">
                        4ᵗ ≠ 2^(2t) escritas diferente, mas são iguais! Sempre reduza.
                      </AlertBox>
                      <AlertBox tipo="warning" titulo="Cilada #2">
                        Se você substituir u = 2ˣ, lembre que u {`>`} 0 SEMPRE. Soluções negativas para u são inválidas.
                      </AlertBox>
                      <AlertBox tipo="warning" titulo="Cilada #3">
                        Um sistema pode ter 0, 1, 2 ou mais soluções. Verifique sempre a solução na equação original.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <ModuleConsolidation
            index={8}
            variant={getModuleVariant(3)}
            video={{
              videoId: "vBgCJqNaK_I",
              title: "Sistemas de Equações Exponenciais Resolvidos",
              duration: "14:10"
            }}
            resumoVisual={{
              moduloNome: "Sistemas Exponenciais",
              tituloAula: "Funções Exponenciais",
              materia: "Matemática",
              images: [
                { title: "Método da Substituição", type: "Passo a Passo", placeholderColor: "bg-emerald-500/20" },
                { title: "Redução a Bases Primas", type: "Técnica", placeholderColor: "bg-green-500/20" },
                { title: "Verificação de Soluções", type: "Validação", placeholderColor: "bg-teal-500/20" }
              ]
            }}
            maceteVisual={{
              title: "O Truque da Redução",
              content: (
                <div className="space-y-4 text-left">
                  <p className="text-sm">Sempre reduza tudo a bases primas antes de resolver:</p>
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl font-mono text-center text-sm">
                    <p>4 = 2²</p>
                    <p>8 = 2³</p>
                    <p>16 = 2⁴</p>
                    <p className="mt-2 text-muted-foreground">Tudo em potência de 2!</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
              titulo: "Harmonia dos Sistemas (Sinfônico)",
              artista: "Sinfônica Matemática"
            }}
          />

          <section id="quiz-modulo-8" className="mt-16">
            <QuizInterativo
              questoes={quizM8}
              titulo="Fixação - Módulo 8"
              numero={8}
              variant={getModuleVariant(3)}
              icone="⚙️"
              onComplete={(score) => handleModuleComplete("modulo-8", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 9 ═══ */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={9}
            titulo="Aplicações Petrobras"
            descricao="Decaimento radioativo, depreciação e otimização em operações reais."
            gradiente="bg-gradient-to-br from-amber-600 to-yellow-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Exponenciais no Contexto Industrial"
              description="Como grandes empresas usam esses modelos."
              variant={getModuleVariant(6)}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Aplicações Industriais",
                  icone:<LuZap />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Petrobras enfrenta 4 problemas exponenciais principais:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                          <p className="text-sm font-bold text-yellow-700">1. Crescimento de Produção</p>
                          <p className="text-sm">P(t) = P₀ × (1.05)ᵗ (5% crescimento anual)</p>
                        </div>
                        <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                          <p className="text-sm font-bold text-amber-700">2. Decaimento de Equipamentos</p>
                          <p className="text-sm">V(t) = V₀ × (0.9)ᵗ (10% depreciação anual)</p>
                        </div>
                        <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                          <p className="text-sm font-bold text-orange-700">3. Consumo Exponencial</p>
                          <p className="text-sm">Diesel queimado em turbocompressores: C(t) = 100 × e^(0.02t) litros/dia</p>
                        </div>
                        <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                          <p className="text-sm font-bold text-red-700">4. Reabsorção de Poluentes</p>
                          <p className="text-sm">Degradação ambiental: A(t) = A₀ × e^(-0.15t) (meia-vida)</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Casos Reais",
                  icone:<LuTarget />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Problemas que caem em provas da Petrobras:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                          <p className="text-sm font-bold text-yellow-700 mb-2">Caso 1: REPLAN - Produção</p>
                          <p className="text-sm">A refinaria começa com 50 mil barris/dia, cresce 3% ao mês. Em 6 meses, quantos barris?</p>
                          <p className="text-sm font-mono mt-1">P(6) = 50 × (1.03)⁶ ≈ 59.7 mil barris</p>
                        </div>
                        <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                          <p className="text-sm font-bold text-amber-700 mb-2">Caso 2: Depreciação de Máquinas</p>
                          <p className="text-sm">Compactor custou R$ 200 mil. Deprecia 15% ao ano. Após 5 anos?</p>
                          <p className="text-sm font-mono mt-1">V(5) = 200 × (0.85)⁵ ≈ R$ 86.9 mil</p>
                        </div>
                        <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                          <p className="text-sm font-bold text-orange-700 mb-2">Caso 3: Qualidade da Água</p>
                          <p className="text-sm">Poluição inicial de 100 ppm, reduz 8% ao mês com tratamento. Após 10 meses?</p>
                          <p className="text-sm font-mono mt-1">P(10) = 100 × (0.92)¹⁰ ≈ 43.4 ppm</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Leitura de Enunciados",
                  icone:<LuBrain />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Domine essas palavras-chave em provas Petrobras:
                      </p>
                      <div className="space-y-2">
                        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                          <p className="text-sm font-bold text-amber-700">📌 "Cresce X% ao..." → multiplica por (1 + X%)</p>
                        </div>
                        <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                          <p className="text-sm font-bold text-yellow-700">📌 "Reduz X% ao..." → multiplica por (1 - X%)</p>
                        </div>
                        <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                          <p className="text-sm font-bold text-orange-700">📌 "Meia-vida de T" → a = 0.5 com período T</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Ciladas CESGRANRIO",
                  icone:<LuTrophy />,
                  conteudo:(
                    <div className="space-y-4">
                      <AlertBox tipo="warning" titulo="Cilada Petrobras #1">
                        A banca pode misturar crescimento/decaimento: "Cresce 5% o primeiro ano, depois reduz 2% nos próximos". Cada mudança é um novo expoente!
                      </AlertBox>
                      <AlertBox tipo="warning" titulo="Cilada Petrobras #2">
                        Leia bem: "duplica a cada 3 anos em 9 anos" ≠ 2⁹. São 3 períodos, logo 2³ = 8×.
                      </AlertBox>
                      <AlertBox tipo="warning" titulo="Cilada Petrobras #3">
                        Contexto importa: "reduz para 80%" significa fica 80%, não reduz EM 80%.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <ModuleConsolidation
            index={9}
            variant={getModuleVariant(6)}
            video={{
              videoId: "j0zXdqVhNFA",
              title: "Exponenciais no Contexto de Petróleo e Gás",
              duration: "15:05"
            }}
            resumoVisual={{
              moduloNome: "Aplicações Petrobras",
              tituloAula: "Funções Exponenciais",
              materia: "Matemática",
              images: [
                { title: "Crescimento de Produção", type: "Modelo", placeholderColor: "bg-yellow-500/20" },
                { title: "Depreciação de Ativos", type: "Modelo", placeholderColor: "bg-amber-500/20" },
                { title: "Qualidade Ambiental", type: "Modelo", placeholderColor: "bg-orange-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Petrobras na Prática",
              content: (
                <div className="space-y-4 text-left">
                  <p className="text-sm font-bold">Padrão de questões Petrobras:</p>
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-sm">
                    <p>1) Identifique N₀ (situação inicial)</p>
                    <p className="mt-2">2) Identifique a (crescimento/taxa)</p>
                    <p className="mt-2">3) Coloque em N(t) = N₀ × aᵗ</p>
                    <p className="mt-2">4) Calcule para o t dado</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
              titulo: "Ritmo da Indústria (Tema Corporativo)",
              artista: "Petrobras Sound"
            }}
          />

          <section id="quiz-modulo-9" className="mt-16">
            <QuizInterativo
              questoes={quizM9}
              titulo="Fixação - Módulo 9"
              numero={9}
              variant={getModuleVariant(6)}
              icone="🏭"
              onComplete={(score) => handleModuleComplete("modulo-9", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 10 ═══ */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={10}
            titulo="Simulado Mestre"
            descricao="Teste seu domínio completo de funções exponenciais."
            gradiente="bg-gradient-to-br from-slate-800 to-slate-900"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Checklist Final"
              description="Revise todos os 9 módulos em um só lugar."
              variant={getModuleVariant(10)}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Síntese Completa",
                  icone:<LuZap />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Revisão rápida dos 9 módulos anteriores:
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="bg-slate-700/20 p-3 rounded-lg border border-slate-600 text-slate-50">
                          <p className="font-bold">✓ M1: Regras aᵐ × aⁿ = aᵐ⁺ⁿ, (aᵐ)ⁿ = aᵐˣⁿ</p>
                        </div>
                        <div className="bg-slate-700/20 p-3 rounded-lg border border-slate-600 text-slate-50">
                          <p className="font-bold">✓ M2: Gráficos - passa por (0,1), cresce se a{`>`}1</p>
                        </div>
                        <div className="bg-slate-700/20 p-3 rounded-lg border border-slate-600 text-slate-50">
                          <p className="font-bold">✓ M3: Equações - igualar bases, aˣ = aʸ ⟹ x = y</p>
                        </div>
                        <div className="bg-slate-700/20 p-3 rounded-lg border border-slate-600 text-slate-50">
                          <p className="font-bold">✓ M4: Aplicações - N(t) = N₀ × aᵗ</p>
                        </div>
                        <div className="bg-slate-700/20 p-3 rounded-lg border border-slate-600 text-slate-50">
                          <p className="font-bold">✓ M5: Desafio Parcial - integração de tudo</p>
                        </div>
                        <div className="bg-slate-700/20 p-3 rounded-lg border border-slate-600 text-slate-50">
                          <p className="font-bold">✓ M6: Número e ≈ 2.718, derivada mágica</p>
                        </div>
                        <div className="bg-slate-700/20 p-3 rounded-lg border border-slate-600 text-slate-50">
                          <p className="font-bold">✓ M7: Transformações - c × f(x - h) + k</p>
                        </div>
                        <div className="bg-slate-700/20 p-3 rounded-lg border border-slate-600 text-slate-50">
                          <p className="font-bold">✓ M8: Sistemas - reduzir a bases primas</p>
                        </div>
                        <div className="bg-slate-700/20 p-3 rounded-lg border border-slate-600 text-slate-50">
                          <p className="font-bold">✓ M9: Aplicações Petrobras - crescimento/depreciação</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Megaproblema Final",
                  icone:<LuTarget />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Um problema que envolve múltiplos conceitos:
                      </p>
                      <div className="bg-slate-700/10 p-4 rounded-lg border border-slate-600">
                        <p className="text-sm font-bold text-slate-100 mb-3">Megaproblema CESGRANRIO</p>
                        <p className="text-sm text-slate-200">Petrobras: Dois poços produzem exponencialmente.</p>
                        <p className="text-sm text-slate-200 mt-2">Poço A: P_A(t) = 1000 × 2ᵗ barris/dia</p>
                        <p className="text-sm text-slate-200">Poço B: P_B(t) = 500 × e^t barris/dia</p>
                        <p className="text-sm text-slate-200 mt-2">1) Qual produz mais no início (t=0)?</p>
                        <p className="text-sm text-slate-200">2) Após 1 dia, quem produz mais?</p>
                        <p className="text-sm text-slate-200">3) Em que momento produzem igual?</p>
                        <p className="text-sm text-slate-200 mt-2 font-mono">Resposta: A: 1000 vs 500 (A ganha em 0)</p>
                        <p className="text-sm text-slate-200 font-mono">t=1: A=2000 vs B=500e≈1359 (A ganha)</p>
                        <p className="text-sm text-slate-200 font-mono">Igualados em t≈1.6 dias (aproximado)</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Última Revisão",
                  icone:<LuBrain />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Dicas finais para dominar a prova:
                      </p>
                      <div className="space-y-2">
                        <div className="p-3 bg-slate-700/20 border border-slate-600 rounded-lg text-slate-50 text-sm font-bold">
                          <p>📌 Sempre reduza a bases primas (2, 3, 5, 7...)</p>
                        </div>
                        <div className="p-3 bg-slate-700/20 border border-slate-600 rounded-lg text-slate-50 text-sm font-bold">
                          <p>📌 Procure por padrões: duplica, triplica, dobra a cada...</p>
                        </div>
                        <div className="p-3 bg-slate-700/20 border border-slate-600 rounded-lg text-slate-50 text-sm font-bold">
                          <p>📌 Exponenciais SÃO SEMPRE positivas</p>
                        </div>
                        <div className="p-3 bg-slate-700/20 border border-slate-600 rounded-lg text-slate-50 text-sm font-bold">
                          <p>📌 Verificação: sempre substitua de volta na equação</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Pegadinhas Finais",
                  icone:<LuTrophy />,
                  conteudo:(
                    <div className="space-y-4">
                      <AlertBox tipo="warning" titulo="Armadilha #1">
                        2ˣ = -4 NÃO tem solução. Exponenciais são sempre {`>`} 0.
                      </AlertBox>
                      <AlertBox tipo="warning" titulo="Armadilha #2">
                        (1/2)ˣ = 4 → 2⁻ˣ = 2² → -x = 2 → x = -2. Não esqueça o negativo!
                      </AlertBox>
                      <AlertBox tipo="warning" titulo="Armadilha #3">
                        eˣ⁻¹ ≠ e^x - 1. Parênteses importam! A primeira desloca o gráfico.
                      </AlertBox>
                      <AlertBox tipo="warning" titulo="Armadilha #4">
                        Reduza tudo a mesma base antes de igualar expoentes.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <ModuleConsolidation
            index={10}
            variant={getModuleVariant(10)}
            video={{
              videoId: "2N4tYGJZfr8",
              title: "Simulado Mestre: Revisão Completa de Exponenciais",
              duration: "16:30"
            }}
            resumoVisual={{
              moduloNome: "Simulado Mestre",
              tituloAula: "Funções Exponenciais",
              materia: "Matemática",
              images: [
                { title: "Mapa Mental Completo", type: "Síntese", placeholderColor: "bg-slate-500/20" },
                { title: "Fórmulas Essenciais", type: "Referência", placeholderColor: "bg-slate-600/20" },
                { title: "Estratégias de Resolução", type: "Guia", placeholderColor: "bg-slate-700/20" }
              ]
            }}
            maceteVisual={{
              title: "O Segredo do Mestre",
              content: (
                <div className="space-y-4 text-left">
                  <p className="text-sm italic">"Quem domina exponenciais, domina 40% da prova de matemática Petrobras"</p>
                  <div className="p-4 bg-slate-700/20 border border-slate-600 rounded-xl text-slate-50 text-sm font-bold text-center">
                    <p>Reduza → Iguale Bases → Iguale Expoentes</p>
                    <p className="mt-2">Sempre.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
              titulo: "O Hino do Mestre (Épico Final)",
              artista: "Orquestra de Gênios"
            }}
          />

          {showCompletionBadge ? (
            <div className="flex flex-col items-center gap-6 py-10 mt-10">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center animate-bounce">
                <LuTrophy className="w-12 h-12 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black">Mestre das Exponenciais!</h3>
              <p className="text-center text-muted-foreground max-w-sm">
                Você dominou completamente as Funções Exponenciais. Crescimento, decaimento, transformações e aplicações práticas — tudo sob controle!
              </p>
            </div>
          ) : (
            <section id="quiz-modulo-10" className="mt-16">
              <QuizInterativo
                questoes={quizM10}
                titulo="Simulado Mestre - Exponenciais"
                icone="🏆"
                numero={10}
                variant={getModuleVariant(10)}
                onComplete={(score) => handleModuleComplete("modulo-10", score)}
              />
            </section>
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
