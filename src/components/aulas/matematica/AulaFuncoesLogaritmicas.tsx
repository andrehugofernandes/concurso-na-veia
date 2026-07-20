import { getModuleVariant } from "@/lib/moduleColors";
// Last modified: 2026-03-13 - Upgraded with ModuleConsolidation (4-tab system) and C.E.D.E. pedagogy
"use client";
import { useAulaProgress } from "@/hooks/useAulaProgress";

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
  FunctionGraph,
  ModuleConsolidation,
  type FunctionPlot,
  QuestaoResolvidaStepByStep} from "../shared";

import {
  LuBookOpen,
  LuTarget,
  LuTrendingUp,
  LuTrophy,
  LuBrain,
  LuRepeat,
  LuSigma,
  LuZap,
} from "react-icons/lu";

import {
  QUIZ_M1_CONCEITOS,
  QUIZ_M2_PROPRIEDADES,
  QUIZ_M3_EQUACOES,
  QUIZ_M4_GRAFICOS,
  QUIZ_M5_FINAL,
  QUIZ_M6_FUNCOES_LOG,
  QUIZ_M7_SISTEMAS_INEQUACOES,
  QUIZ_M8_REVERSA,
  QUIZ_M9_PETROBRASESPECIFICO,
  QUIZ_M10_SIMULADO_MESTRE,
} from "./data/funcoes-logaritmicas-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Conceito Logarítmico" },
  { id: "modulo-2", label: "Módulo 2", title: "Propriedades Fundamentais" },
  { id: "modulo-3", label: "Módulo 3", title: "Equações Logarítmicas" },
  { id: "modulo-4", label: "Módulo 4", title: "Condições de Existência" },
  { id: "modulo-5", label: "Módulo 5", title: "Desafio Integrado" },
  { id: "modulo-6", label: "Módulo 6", title: "Funções Logarítmicas" },
  { id: "modulo-7", label: "Módulo 7", title: "Sistemas & Inequações" },
  { id: "modulo-8", label: "Módulo 8", title: "Resolução Reversa" },
  { id: "modulo-9", label: "Módulo 9", title: "Aplicações Petrobras" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
] as const;

const mv = Array.from({ length: 11 }, (_, i) => getModuleVariant(i));

export default function AulaFuncoesLogaritmicas({
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
  const { completedModules: completedModulesList, updateCompletedModules } = useAulaProgress();
  const completedModules = new Set(completedModulesList);

  const [quizM1] = useState(() => getRandomQuestions(QUIZ_M1_CONCEITOS, 4));
  const [quizM2] = useState(() => getRandomQuestions(QUIZ_M2_PROPRIEDADES, 4));
  const [quizM3] = useState(() => getRandomQuestions(QUIZ_M3_EQUACOES, 4));
  const [quizM4] = useState(() => getRandomQuestions(QUIZ_M4_GRAFICOS, 4));
  const [quizM5] = useState(() => getRandomQuestions(QUIZ_M5_FINAL, 5));
  const [quizM6] = useState(() => getRandomQuestions(QUIZ_M6_FUNCOES_LOG, 5));
  const [quizM7] = useState(() => getRandomQuestions(QUIZ_M7_SISTEMAS_INEQUACOES, 5));
  const [quizM8] = useState(() => getRandomQuestions(QUIZ_M8_REVERSA, 5));
  const [quizM9] = useState(() => getRandomQuestions(QUIZ_M9_PETROBRASESPECIFICO, 5));
  const [quizM10] = useState(() => getRandomQuestions(QUIZ_M10_SIMULADO_MESTRE, 5));

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
      updateCompletedModules(Array.from(newDone));
      setHasSyncedInitial(true);
    } else if (!hasSyncedInitial && !loading && currentProgress === 0) {
      setHasSyncedInitial(true);
    }
  }, [currentProgress, hasSyncedInitial, loading]);

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 70) {
      const newSet = new Set(completedModules).add(moduleId);
      updateCompletedModules(Array.from(newSet));

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

  const isModuleUnlocked = (_index: number) => true; // ✅ TODOS OS MÓDULOS DESBLOQUEADOS

    


  return (
    <AulaTemplate
      canComplete={completedModules.size >= MODULE_DEFS.length}
      lockMessage="Você precisa responder a todos os quizzes desta aula para finalizá-la."
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
      {/* ═══ MÓDULO 1: CONCEITO LOGARÍTMICO ═══ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={1}
            titulo="O Conceito de Logaritmo"
            descricao="Números colossais encolhem em números menores através da pergunta fundamental."
             variant={mv[1]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Pergunta Decodificadora"
              description="Esqueça o medo superficial de não entender a palavra Logaritmo."
              variant="indigo"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - A Definição Sagrada",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="leading-relaxed text-xl text-foreground/85">
                        O Logaritmo é apenas uma pergunta exposta num papel. Ele te questiona de forma direta: &quot;Que número elevei a essa Base para conseguir esse resultado?&quot;
                      </p>
                      <div className="bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20 text-center shadow-inner">
                        <p className="font-mono text-xl text-indigo-800 dark:text-indigo-200 font-bold">
                          log_a(b) = c &nbsp;&nbsp;&nbsp;⟺&nbsp;&nbsp;&nbsp; aᶜ = b
                        </p>
                      </div>
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Exemplo: <code>log₃(9) = 2</code> significa: &quot;3 elevado a quanto dá 9?&quot; Resposta: 3² = 9.
                      </p>
                      <div className="bg-indigo-500/5 p-4 rounded-lg border border-indigo-500/20">
                        <p className="text-xl text-foreground/85 leading-relaxed"><strong>Terminologia:</strong></p>
                        <ul className="text-xl space-y-1 mt-2 text-foreground/85 leading-relaxed">
                          <li>• <strong>a</strong> = base (sempre positiva, ≠ 1): a {'>'} 0, a ≠ 1</li>
                          <li>• <strong>b</strong> = logaritmando (sempre positivo): b {'>'} 0</li>
                          <li>• <strong>c</strong> = logaritmo (qualquer real)</li>
                        </ul>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Bases Naturais",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="leading-relaxed text-xl text-foreground/85">
                        As bases mais comuns e importantes aparecem em diferentes contextos:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                          <p className="font-bold text-blue-700 text-xl mb-1 text-foreground/85 leading-relaxed">Base 10 (Logaritmo Comum)</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">log₁₀(1000) = 3, pois 10³ = 1000. Usado em pH, decibéis, Richter.</p>
                        </div>
                        <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/20">
                          <p className="font-bold text-emerald-700 text-xl mb-1 text-foreground/85 leading-relaxed">Base e (Logaritmo Natural)</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">ln(e) = 1, pois e¹ = e. Fundamental em crescimento exponencial e cálculo.</p>
                        </div>
                        <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                          <p className="font-bold text-orange-700 text-xl mb-1 text-foreground/85 leading-relaxed">Base 2 (Logaritmo Binário)</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">log₂(8) = 3, pois 2³ = 8. Usado em computação e teoria da informação.</p>
                        </div>
                      </div>
                      <div className="bg-purple-500/5 p-4 rounded-lg border border-purple-500/20 mt-3">
                        <p className="text-xl text-foreground/85 leading-relaxed"><strong>Na Petrobras:</strong> pH usa base 10, modelo de decaimento usa base e natural.</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Base Oculta",
                  icone: <LuRepeat />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="leading-relaxed text-xl text-foreground/85">
                        Quando você vê apenas <code>log(x)</code> sem base explícita, há convenções importantes:
                      </p>
                      <div className="space-y-2">
                        <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                          <p className="text-xl font-bold text-indigo-700 text-foreground/85 leading-relaxed">📌 Em Concursos (CESGRANRIO): log = log₁₀ (base 10)</p>
                        </div>
                        <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                          <p className="text-xl font-bold text-purple-700 text-foreground/85 leading-relaxed">📌 Em Cálculo/Científico: log = ln (base e)</p>
                        </div>
                        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                          <p className="text-xl font-bold text-blue-700 text-foreground/85 leading-relaxed">📌 Em Programação: log = log₂ (base 2)</p>
                        </div>
                      </div>
                      <p className="text-lg text-foreground/85 leading-relaxed mt-3 italic">Sempre leia o enunciado. Em CESGRANRIO, quando não especificado, assuma base 10!</p>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Restrições do Domínio",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="danger" titulo="Restrições Absolutas">
                        <p className="text-xl text-foreground/85 leading-relaxed">• A base <strong>a</strong> deve ser positiva e diferente de 1: a {'>'} 0, a ≠ 1</p>
                        <p className="text-xl text-foreground/85 leading-relaxed">• O logaritmando <strong>b</strong> deve ser positivo: b {'>'} 0</p>
                        <p className="text-xl text-foreground/85 leading-relaxed">• Se violar: não existe logaritmo no campo real!</p>
                      </AlertBox>
                      <div className="bg-red-500/5 p-3 rounded-lg border border-red-500/20 mt-3">
                        <p className="text-xl text-foreground/85 leading-relaxed"><strong>Pegadinha CESGRANRIO:</strong> log(-5) ou log₀(10) ou log₁(100) → IMPOSSÍVEL!</p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm">
            <FunctionGraph
              title="Funções Logarítmicas com Diferentes Bases"
              functions={[
                {
                  id: "log10",
                  fn: (x) => Math.log10(x),
                  color: "#3b82f6",
                  label: "log₁₀(x)",
                  strokeWidth: 2,
                },
                {
                  id: "log2",
                  fn: (x) => Math.log2(x),
                  color: "#ef4444",
                  label: "log₂(x)",
                  strokeWidth: 2,
                },
                {
                  id: "ln",
                  fn: (x) => Math.log(x),
                  color: "#10b981",
                  label: "ln(x)",
                  strokeWidth: 2,
                },
              ]}
              xMin={0.1}
              xMax={10}
              yMin={-3}
              yMax={3.5}
              points={300}
            />
          </section>



          <section id="quiz-modulo-1" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={"indigo"}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Se log a = 5 e log b = 3, qual é o valor de log(a² / b)?"
          alternativas={[
            { letra: "A", texto: "7", correta: true },
              { letra: "B", texto: "2", correta: false },
              { letra: "C", texto: "13", correta: false },
              { letra: "D", texto: "25/3", correta: false },
              { letra: "E", texto: "10", correta: false }
          ]}
          dicaEstrategica="Substituindo: 2×(5) - 3 = 10 - 3 = 7."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Aplicando as propriedades: log(a² / b) = log(a²) - log(b)." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Depois, a regra do tombo no a²: 2×log(a) - log(b)." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa A como a resposta correta." }
          ]}
        />

        <ModuleConsolidation moduloNumero={1}
            index={1}
            variant="indigo"
            resumoVisual={{
              moduloNome: "Módulo 1",
              tituloAula: "Funções Logarítmicas",
              materia: "Matemática",
              images: [
                { title: "Definição: log_a(b) = c", type: "Conceito", placeholderColor: "bg-indigo-500/20" },
                { title: "Inversa de Exponencial", type: "Relação", placeholderColor: "bg-blue-500/20" },
                { title: "Restrições: a>0, b>0, a≠1", type: "Domínio", placeholderColor: "bg-purple-500/20" }
              ]
            }}
            maceteVisual={{
              title: "O Truque da Conversão",
              content: (
                <div className="space-y-4 text-left">
                  <p className="text-xl italic text-foreground/85 leading-relaxed">"Confuso com log? Converta para exponencial!"</p>
                  <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl font-mono text-center">
                    <p className="text-xl text-foreground/85 leading-relaxed">log_a(b) = c</p>
                    <p className="text-lg text-foreground/85 leading-relaxed">↓ converter ↓</p>
                    <p className="text-xl text-foreground/85 leading-relaxed">aᶜ = b</p>
                  </div>
                  <p className="text-lg text-foreground/85 leading-relaxed">Use isso SEMPRE quando ficar em dúvida!</p>
                </div>
              )
            }}
            podcast={{
            aulaId: "funcoeslogaritmicas",
            aulaTitulo: "Funcoes Logaritmicas",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 1,
            moduloTitulo: "Módulo 1",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                      <QuizInterativo
              questoes={quizM1}
              titulo="QUIZ: Conceito Logarítmico"
              numero={3}
              variant="indigo"
              icone="🧠"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 2: PROPRIEDADES FUNDAMENTAIS ═══ */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={2}
            titulo="Propriedades Operacionais"
            descricao="Multiplicação encolhe para soma e potência descende como o tombo."
             variant={mv[2]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Vantagem Algébrica"
              description="Manobras lícitas que convertem calvários em passeios."
              variant={mv[2]}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Propriedades Básicas",
                  icone: <LuSigma />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="leading-relaxed text-xl text-foreground/85">
                        Os logaritmos possuem propriedades que simplificam expressões complexas:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-emerald-500/10 p-4 border border-emerald-500/20 text-center rounded-xl font-mono font-bold text-xl text-foreground/85 leading-relaxed">
                          <p>log_a(m × n) = log_a(m) + log_a(n)</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">Produto vira soma</p>
                        </div>
                        <div className="bg-teal-500/10 p-4 border border-teal-500/20 text-center rounded-xl font-mono font-bold text-xl text-foreground/85 leading-relaxed">
                          <p>log_a(m ÷ n) = log_a(m) - log_a(n)</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">Quociente vira subtração</p>
                        </div>
                        <div className="bg-green-500/10 p-4 border border-green-500/20 text-center rounded-xl font-mono font-bold text-xl text-foreground/85 leading-relaxed">
                          <p>log_a(bⁿ) = n × log_a(b)</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">O expoente "tomba" para frente</p>
                        </div>
                      </div>
                      <AlertBox tipo="info" titulo="Propriedade Extra: Log de 1">
                        log_a(1) = 0 para qualquer base a {'>'} 0, a ≠ 1. Por quê? Porque a⁰ = 1!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Aplicações Práticas",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="leading-relaxed text-xl text-foreground/85">
                        Veja como essas propriedades tornam problemas mais simples:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/20">
                          <p className="text-xl font-bold text-emerald-700 mb-2 text-foreground/85 leading-relaxed">Simplificar: log₂(8 × 16)</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">= log₂(8) + log₂(16) = 3 + 4 = 7 ✓</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">Verificação: 2⁷ = 128 = 8 × 16 ✓</p>
                        </div>
                        <div className="bg-teal-500/10 p-4 rounded-lg border border-teal-500/20">
                          <p className="text-xl font-bold text-teal-700 mb-2 text-foreground/85 leading-relaxed">Simplificar: log₃(81 ÷ 9)</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">= log₃(81) - log₃(9) = 4 - 2 = 2 ✓</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">Verificação: 81/9 = 9 = 3² ✓</p>
                        </div>
                        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                          <p className="text-xl font-bold text-green-700 mb-2 text-foreground/85 leading-relaxed">Simplificar: log₁₀(10⁵)</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">= 5 × log₁₀(10) = 5 × 1 = 5 ✓</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">Aplicação: log₁₀(100.000) = 5</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Mudança de Base",
                  icone: <LuRepeat />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="leading-relaxed text-xl text-foreground/85">
                        A Mudança de Base é o truque final que os corretores adoram usar:
                      </p>
                      <AlertBox tipo="warning" titulo="A Fórmula Sagrada">
                        <p className="font-mono text-center text-xl text-foreground/85 leading-relaxed">log_a(b) = log_c(b) / log_c(a)</p>
                        <p className="text-xl mt-2 text-foreground/85 leading-relaxed">Exemplo: log₃(2) = log₁₀(2) / log₁₀(3) = 0,301 / 0,477 ≈ 0,631</p>
                      </AlertBox>
                      <div className="bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/20 mt-3">
                        <p className="text-xl text-foreground/85 leading-relaxed"><strong>Quando usar:</strong> Quando a calculadora só tem log₁₀ ou ln, mas a questão pede log₃ ou outra base!</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Pegadinhas Clássicas",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="warning" titulo="Erro #1: Distribuição de Log">
                        log(a+b) ≠ log(a) + log(b). A propriedade SÓ funciona para multiplicação! É a CESGRANRIO armadilha número 1.
                      </AlertBox>
                      <AlertBox tipo="warning" titulo="Erro #2: Inversão de Propriedade">
                        log_a(b) + log_c(d) ≠ log_a(bd). Só funciona com mesma base!
                      </AlertBox>
                      <AlertBox tipo="info" titulo="Extra: Logaritmo de Logaritmo">
                        log_a(log_b(c)) = ? Aqui você precisa resolver de dentro para fora! Calcule log_b(c) PRIMEIRO.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-2" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[2]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Se log a = 5 e log b = 3, qual é o valor de log(a² / b)?"
          alternativas={[
            { letra: "A", texto: "7", correta: true },
              { letra: "B", texto: "2", correta: false },
              { letra: "C", texto: "13", correta: false },
              { letra: "D", texto: "25/3", correta: false },
              { letra: "E", texto: "10", correta: false }
          ]}
          dicaEstrategica="Substituindo: 2×(5) - 3 = 10 - 3 = 7."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Aplicando as propriedades: log(a² / b) = log(a²) - log(b)." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Depois, a regra do tombo no a²: 2×log(a) - log(b)." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa A como a resposta correta." }
          ]}
        />

        <ModuleConsolidation moduloNumero={2}
            index={2}
            variant={mv[2]}
            resumoVisual={{
              moduloNome: "Módulo 2",
              tituloAula: "Funções Logarítmicas",
              materia: "Matemática",
              images: [
                { title: "Produto = Soma", type: "Propriedade", placeholderColor: "bg-emerald-500/20" },
                { title: "Quociente = Subtração", type: "Propriedade", placeholderColor: "bg-teal-500/20" },
                { title: "Expoente = Multiplicação", type: "Propriedade", placeholderColor: "bg-green-500/20" }
              ]
            }}
            maceteVisual={{
              title: "As 3 Regras de Ouro",
              content: (
                <div className="space-y-3 text-left">
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                    <p className="text-xl font-bold text-emerald-700 text-foreground/85 leading-relaxed">Multiplicação → Adição</p>
                  </div>
                  <div className="p-3 bg-teal-500/10 border border-teal-500/20 rounded-lg">
                    <p className="text-xl font-bold text-teal-700 text-foreground/85 leading-relaxed">Divisão → Subtração</p>
                  </div>
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="text-xl font-bold text-green-700 text-foreground/85 leading-relaxed">Potência → Multiplicação</p>
                  </div>
                </div>
              )
            }}
            podcast={{
            aulaId: "funcoeslogaritmicas",
            aulaTitulo: "Funcoes Logaritmicas",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 2,
            moduloTitulo: "Módulo 2",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                      <QuizInterativo
              questoes={quizM2}
              titulo="QUIZ: Propriedades Fundamentais"
              numero={3}
              variant={mv[2]}
              icone="🎯"
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 3: EQUAÇÕES LOGARÍTMICAS ═══ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={3}
            titulo="Equações Logarítmicas"
            descricao="X nas cordas e logs somando e subtraindo do lado."
             variant={mv[3]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Eliminando o Logaritmo"
              description="Para eliminar a palavra log da equação, a base inferior tem que se sacrificar."
              variant={mv[3]}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Método Universal",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="leading-relaxed text-xl text-foreground/85">
                        O objetivo é sempre chegar num formato onde a variável fica isolada. A estratégia principal é converter de forma logarítmica para exponencial:
                      </p>
                      <div className="bg-cyan-500/10 p-4 text-center rounded-xl border border-cyan-500/20 font-mono text-xl font-bold text-foreground/85 leading-relaxed">
                        <p>Se log_a(x) = b, então x = aᵇ</p>
                      </div>
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        É SEMPRE a estratégia central: simplifique usando propriedades, depois converta para exponencial, depois resolva algebricamente.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Casos Reais",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="leading-relaxed text-xl text-foreground/85">
                        Veja como resolver diferentes tipos de equações:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-sky-500/10 p-4 rounded-lg border border-sky-500/20">
                          <p className="text-xl font-bold text-sky-700 mb-2 text-foreground/85 leading-relaxed">Caso 1: log₂(x+8) = 4</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Converta: x+8 = 2⁴ = 16 → x = 8 ✓</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">Teste: log₂(8+8) = log₂(16) = 4 ✓</p>
                        </div>
                        <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/20">
                          <p className="text-xl font-bold text-cyan-700 mb-2 text-foreground/85 leading-relaxed">Caso 2: log₃(x) + log₃(x-2) = 1</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Combine: log₃[x(x-2)] = 1 → x(x-2) = 3¹ → x² - 2x - 3 = 0</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Bhaskara: x = 3 ou x = -1. Teste domínio: x {'>'} 0 e x-2 {'>'} 0 → x {'>'} 2</p>
                          <p className="text-xl font-bold text-green-600 text-foreground/85 leading-relaxed">Apenas x = 3 é válido!</p>
                        </div>
                        <div className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/20">
                          <p className="text-xl font-bold text-indigo-700 mb-2 text-foreground/85 leading-relaxed">Caso 3: 2log₅(x) = log₅(25)</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Simplifique: log₅(x²) = log₅(25) → x² = 25 → x = ±5</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Domínio: x {'>'} 0 → apenas x = 5 válido</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Estratégias Comprovadas",
                  icone: <LuZap />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="leading-relaxed text-xl text-foreground/85">
                        Use essas táticas para evitar armadilhas:
                      </p>
                      <div className="space-y-2">
                        <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                          <p className="text-xl font-bold text-cyan-700 text-foreground/85 leading-relaxed">📌 Use propriedades ANTES de converter para exponencial</p>
                        </div>
                        <div className="p-3 bg-sky-500/10 border border-sky-500/20 rounded-lg">
                          <p className="text-xl font-bold text-sky-700 text-foreground/85 leading-relaxed">📌 Sempre isole o log de um lado</p>
                        </div>
                        <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                          <p className="text-xl font-bold text-indigo-700 text-foreground/85 leading-relaxed">📌 Verifique as condições de existência no final!</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Armadilhas Clássicas",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="warning" titulo="Pegadinha #1">
                        log(a+b) ≠ log(a) + log(b). Não distribua o log sobre somas!
                      </AlertBox>
                      <AlertBox tipo="warning" titulo="Pegadinha #2">
                        Ao resolver, sempre teste se a solução satisfaz a equação original E as restrições de domínio.
                      </AlertBox>
                      <AlertBox tipo="danger" titulo="Pegadinha #3 (CESGRANRIO)">
                        Se a banca dá 2 soluções e só 1 é válida no domínio, essa é a resposta. Não marque a que viola restrição!
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-3" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[3]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Se log a = 5 e log b = 3, qual é o valor de log(a² / b)?"
          alternativas={[
            { letra: "A", texto: "7", correta: true },
              { letra: "B", texto: "2", correta: false },
              { letra: "C", texto: "13", correta: false },
              { letra: "D", texto: "25/3", correta: false },
              { letra: "E", texto: "10", correta: false }
          ]}
          dicaEstrategica="Substituindo: 2×(5) - 3 = 10 - 3 = 7."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Aplicando as propriedades: log(a² / b) = log(a²) - log(b)." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Depois, a regra do tombo no a²: 2×log(a) - log(b)." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa A como a resposta correta." }
          ]}
        />

        <ModuleConsolidation moduloNumero={3}
            index={3}
            variant={mv[3]}
            resumoVisual={{
              moduloNome: "Módulo 3",
              tituloAula: "Funções Logarítmicas",
              materia: "Matemática",
              images: [
                { title: "Converter para Exponencial", type: "Técnica", placeholderColor: "bg-cyan-500/20" },
                { title: "Usar Propriedades", type: "Método", placeholderColor: "bg-sky-500/20" },
                { title: "Verificar Domínio", type: "Validação", placeholderColor: "bg-indigo-500/20" }
              ]
            }}
            maceteVisual={{
              title: "O Truque: Converter e Resolver",
              content: (
                <div className="space-y-4 text-left">
                  <p className="text-xl italic text-foreground/85 leading-relaxed">"Quando vejo log isolado, converto para exponencial"</p>
                  <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl font-mono text-center">
                    <p className="text-xl text-foreground/85 leading-relaxed">log_a(x) = b</p>
                    <p className="text-lg text-foreground/85 leading-relaxed">↓ converter ↓</p>
                    <p className="text-xl text-foreground/85 leading-relaxed">x = aᵇ</p>
                  </div>
                </div>
              )
            }}
            podcast={{
            aulaId: "funcoeslogaritmicas",
            aulaTitulo: "Funcoes Logaritmicas",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 3,
            moduloTitulo: "Módulo 3",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                      <QuizInterativo
              questoes={quizM3}
              titulo="QUIZ: Equações Logarítmicas"
              numero={3}
              variant={mv[3]}
              icone="⚙️"
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 4: CONDIÇÕES DE EXISTÊNCIA ═══ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={4}
            titulo="Condições de Existência"
            descricao="Bancas colocam raízes falsas que não existem na vida real."
             variant={mv[4]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Masmorra de Erros"
              description="Um logaritmo negativo te levará a uma explosão no meio da prova."
              variant={mv[4]}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Restrições Absolutas",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="leading-relaxed text-xl text-foreground/85">
                        Logaritmos só existem sob condições matemáticas rigorosas:
                      </p>
                      <div className="space-y-3">
                        <AlertBox tipo="danger" titulo="Restrição 1: Base">
                          A base <strong>a</strong> deve satisfazer: <strong>a {'>'} 0 e a ≠ 1</strong>
                        </AlertBox>
                        <AlertBox tipo="danger" titulo="Restrição 2: Logaritmando">
                          O argumento <strong>b</strong> deve satisfazer: <strong>b {'>'} 0</strong>
                        </AlertBox>
                        <div className="bg-blue-500/5 p-3 rounded-lg border border-blue-500/20">
                          <p className="text-xl text-foreground/85 leading-relaxed"><strong>Combinadas:</strong> log_a(b) só existe quando a {'>'} 0, a ≠ 1, E b {'>'} 0 simultaneamente!</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Domínios Restritos",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="leading-relaxed text-xl text-foreground/85">
                        Observe como restrições afetam soluções:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                          <p className="text-xl font-bold text-blue-700 mb-2 text-foreground/85 leading-relaxed">Exemplo 1: log₂(x-5)</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Domínio: x - 5 &gt; 0 → x &gt; 5</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">Logo, x = 3 ou x = 4 NÃO servem!</p>
                        </div>
                        <div className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/20">
                          <p className="text-xl font-bold text-indigo-700 mb-2 text-foreground/85 leading-relaxed">Exemplo 2: log₃(x²-4)</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Domínio: x² - 4 &gt; 0 → x² &gt; 4 → x &lt; -2 ou x &gt; 2</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">Logo, x = 1 ou x = -1 NÃO servem!</p>
                        </div>
                        <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                          <p className="text-xl font-bold text-purple-700 mb-2 text-foreground/85 leading-relaxed">Exemplo 3: log_(x-1)(8)</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Domínio: x - 1 &gt; 0 e x - 1 ≠ 1 → x &gt; 1 e x ≠ 2</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">A base não pode ser 1!</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Teste de Validade",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="leading-relaxed text-xl text-foreground/85">
                        Ao resolver, sempre teste se a solução é válida:
                      </p>
                      <div className="space-y-2">
                        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                          <p className="text-xl font-bold text-blue-700 text-foreground/85 leading-relaxed">📌 Passo 1: Resolva a equação (ignore domínio temporariamente)</p>
                        </div>
                        <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                          <p className="text-xl font-bold text-indigo-700 text-foreground/85 leading-relaxed">📌 Passo 2: Verifique cada solução no domínio original</p>
                        </div>
                        <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                          <p className="text-xl font-bold text-purple-700 text-foreground/85 leading-relaxed">📌 Passo 3: Descarte soluções que violam restrições</p>
                        </div>
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                          <p className="text-xl font-bold text-red-700 text-foreground/85 leading-relaxed">📌 Passo 4: Teste substituindo na equação original</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - O Pior Risco da CESGRANRIO",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="leading-relaxed text-xl text-foreground/85">
                        Terminou a equação de Bhaskara e achou -2 e 8? Não corra pra marcar a letra com as respostas!
                      </p>
                      <AlertBox tipo="danger" titulo="Teste Obrigatório">
                        Se a equação original tiver <code>log(x-5)</code> e você achou x = -2, então log(-2-5) = log(-7), que é <strong>IMPOSSÍVEL</strong>. Essa raiz não conta no Gabarito!!
                      </AlertBox>
                      <div className="bg-orange-500/5 p-3 rounded-lg border border-orange-500/20 mt-3">
                        <p className="text-xl text-foreground/85 leading-relaxed"><strong>Verdade brutal:</strong> CESGRANRIO sempre coloca uma solução inválida no domínio para pegar desatentos. Não caia!</p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm">
            <FunctionGraph
              title="Visualizando Domínios: Logaritmo Natural com Restrições"
              functions={[
                {
                  id: "ln_x",
                  fn: (x) => (x > 0 ? Math.log(x) : null),
                  color: "#3b82f6",
                  label: "ln(x)",
                  strokeWidth: 2,
                },
                {
                  id: "ln_shifted",
                  fn: (x) => (x > 2 ? Math.log(x - 2) : null),
                  color: "#ef4444",
                  label: "ln(x-2)",
                  strokeWidth: 2,
                },
              ]}
              xMin={-1}
              xMax={10}
              yMin={-3}
              yMax={3}
              points={300}
            />
          </section>



          <section id="quiz-modulo-4" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={"blue"}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Se log a = 5 e log b = 3, qual é o valor de log(a² / b)?"
          alternativas={[
            { letra: "A", texto: "7", correta: true },
              { letra: "B", texto: "2", correta: false },
              { letra: "C", texto: "13", correta: false },
              { letra: "D", texto: "25/3", correta: false },
              { letra: "E", texto: "10", correta: false }
          ]}
          dicaEstrategica="Substituindo: 2×(5) - 3 = 10 - 3 = 7."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Aplicando as propriedades: log(a² / b) = log(a²) - log(b)." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Depois, a regra do tombo no a²: 2×log(a) - log(b)." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa A como a resposta correta." }
          ]}
        />

        <ModuleConsolidation moduloNumero={4}
            index={4}
            variant={mv[4]}
            resumoVisual={{
              moduloNome: "Módulo 4",
              tituloAula: "Funções Logarítmicas",
              materia: "Matemática",
              images: [
                { title: "Base: a>0, a≠1", type: "Restrição", placeholderColor: "bg-blue-500/20" },
                { title: "Logaritmando: b>0", type: "Restrição", placeholderColor: "bg-indigo-500/20" },
                { title: "Teste Todas as Soluções", type: "Validação", placeholderColor: "bg-purple-500/20" }
              ]
            }}
            maceteVisual={{
              title: "A Regra de Ouro: Sempre Verifique",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-xl italic font-bold text-foreground/85 leading-relaxed">Solução de log: 3 passos obrigatórios</p>
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <p className="text-xl text-foreground/85 leading-relaxed">1️⃣ Resolva algebricamente</p>
                  </div>
                  <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                    <p className="text-xl text-foreground/85 leading-relaxed">2️⃣ Verifique domínio (cada x no argumento &gt; 0)</p>
                  </div>
                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <p className="text-xl text-foreground/85 leading-relaxed">3️⃣ Teste substituindo na equação original</p>
                  </div>
                </div>
              )
            }}
            podcast={{
            aulaId: "funcoeslogaritmicas",
            aulaTitulo: "Funcoes Logaritmicas",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 4,
            moduloTitulo: "Módulo 4",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                      <QuizInterativo
              questoes={quizM4}
              titulo="QUIZ: Condições de Existência"
              numero={3}
              variant={mv[4]}
              icone="🔍"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 5: DESAFIO INTEGRADO ═══ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={5}
            titulo="Desafio Integrado"
            descricao="Combine todo o conhecimento em questões de média dificuldade."
             variant={mv[5]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Consolidação do Conhecimento"
              description="Revisão de conceitos, propriedades, equações e domínios combinados."
              variant={mv[5]}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Estratégia de Resolução",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="leading-relaxed text-xl text-foreground/85">
                        Em problemas integrados, siga um roteiro claro:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                          <p className="text-xl font-bold text-amber-700 text-foreground/85 leading-relaxed">Etapa 1: Identifique se é equação, inequação ou função</p>
                        </div>
                        <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                          <p className="text-xl font-bold text-orange-700 text-foreground/85 leading-relaxed">Etapa 2: Aplique propriedades para simplificar</p>
                        </div>
                        <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                          <p className="text-xl font-bold text-yellow-700 text-foreground/85 leading-relaxed">Etapa 3: Resolva algebraicamente</p>
                        </div>
                        <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                          <p className="text-xl font-bold text-red-700 text-foreground/85 leading-relaxed">Etapa 4: Verifique domínio e restrições</p>
                        </div>
                      </div>
                      <p className="text-xl mt-3 italic text-foreground/85 leading-relaxed">Essa ordem não é sugestão — é OBRIGATÓRIA em CESGRANRIO!</p>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Problema Completo",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="leading-relaxed text-xl text-foreground/85">
                        Resolva: log₂(x) + log₂(x-1) = 3
                      </p>
                      <div className="space-y-2 text-xl text-foreground/85 leading-relaxed">
                        <p><strong>Passo 1:</strong> Identifique tipo: equação logarítmica ✓</p>
                        <p><strong>Passo 2:</strong> Combine logs: log₂[x(x-1)] = 3</p>
                        <p><strong>Passo 3:</strong> Converta: x(x-1) = 2³ = 8</p>
                        <p><strong>Passo 4:</strong> Resolva: x² - x - 8 = 0</p>
                        <p><strong>Passo 5:</strong> Bhaskara: x = (1 ± √33)/2 ≈ 3,37 ou -2,37</p>
                        <p><strong>Passo 6:</strong> Teste no domínio: x &gt; 0 E x-1 &gt; 0 → x &gt; 1</p>
                        <p className="font-bold text-green-600">Resposta válida: x ≈ 3,37 ✓</p>
                      </div>
                      <AlertBox tipo="info" titulo="Aprendizado">
                        A solução negativa foi DESCARTADA antes de testar a original. Domínio primeiro!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Ordem de Operações",
                  icone: <LuZap />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="leading-relaxed text-xl text-foreground/85">
                        Mantenha a ordem para não se perder:
                      </p>
                      <div className="space-y-2">
                        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                          <p className="text-xl font-bold text-amber-700 text-foreground/85 leading-relaxed">📌 Propriedades ANTES de converter</p>
                        </div>
                        <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                          <p className="text-xl font-bold text-orange-700 text-foreground/85 leading-relaxed">📌 Converta para exponencial para isolar x</p>
                        </div>
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                          <p className="text-xl font-bold text-red-700 text-foreground/85 leading-relaxed">📌 Verifique domínio por ÚLTIMO</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Pegadinhas Combinadas",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="warning" titulo="Pegadinha #1: Múltiplos Domínios">
                        Em log_a(x) + log_a(y) = c, você precisa de AMBOS x&gt;0 E y&gt;0. Teste cada restrição separadamente!
                      </AlertBox>
                      <AlertBox tipo="warning" titulo="Pegadinha #2: Simplificação Falsa">
                        log_a(x²) = 2·log_a(x) NÃO é sempre verdade! Se x&lt;0, log_a(x) não existe. Use cuidado!
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-5" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[5]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Se log a = 5 e log b = 3, qual é o valor de log(a² / b)?"
          alternativas={[
            { letra: "A", texto: "7", correta: true },
              { letra: "B", texto: "2", correta: false },
              { letra: "C", texto: "13", correta: false },
              { letra: "D", texto: "25/3", correta: false },
              { letra: "E", texto: "10", correta: false }
          ]}
          dicaEstrategica="Substituindo: 2×(5) - 3 = 10 - 3 = 7."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Aplicando as propriedades: log(a² / b) = log(a²) - log(b)." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Depois, a regra do tombo no a²: 2×log(a) - log(b)." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa A como a resposta correta." }
          ]}
        />

        <ModuleConsolidation moduloNumero={5}
            index={5}
            variant={mv[5]}
            resumoVisual={{
              moduloNome: "Módulo 5",
              tituloAula: "Funções Logarítmicas",
              materia: "Matemática",
              images: [
                { title: "Simplificar com Propriedades", type: "Técnica", placeholderColor: "bg-amber-500/20" },
                { title: "Converter para Exponencial", type: "Método", placeholderColor: "bg-orange-500/20" },
                { title: "Validar Soluções", type: "Verificação", placeholderColor: "bg-red-500/20" }
              ]
            }}
            maceteVisual={{
              title: "A Receita Completa",
              content: (
                <div className="space-y-2 text-left">
                  <p className="text-xl italic text-foreground/85 leading-relaxed">Siga sempre nessa ordem:</p>
                  <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded text-xl text-foreground/85 leading-relaxed">Propriedades → Converter → Resolver → Validar</div>
                </div>
              )
            }}
            podcast={{
            aulaId: "funcoeslogaritmicas",
            aulaTitulo: "Funcoes Logaritmicas",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 5,
            moduloTitulo: "Módulo 5",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                      <QuizInterativo
              questoes={quizM5}
              titulo="QUIZ: Desafio Integrado"
              numero={3}
              variant={mv[5]}
              icone="🎯"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 6: FUNÇÕES LOGARÍTMICAS ═══ */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={6}
            titulo="Funções Logarítmicas"
            descricao="Transformações, composições e o domínio das curvas que subem com cuidado."
             variant={mv[6]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Forma Padrão das Funções Log"
              description="Como as funções logarítmicas se comportam quando transformadas."
              variant={mv[6]}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Características Fundamentais",
                  icone: <LuTrendingUp />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="leading-relaxed text-xl text-foreground/85">
                        A função logarítmica f(x) = log_a(x) possui características especiais:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-rose-500/10 p-4 rounded-lg border border-rose-500/20">
                          <p className="text-xl font-bold text-rose-700 text-foreground/85 leading-relaxed">Sempre passa por (1, 0)</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">log_a(1) = 0 para qualquer base a &gt; 0, a ≠ 1</p>
                        </div>
                        <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                          <p className="text-xl font-bold text-red-700 text-foreground/85 leading-relaxed">Domínio: x &gt; 0 (nunca zero ou negativo)</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Contradomínio: todos os reais</p>
                        </div>
                        <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/20">
                          <p className="text-xl font-bold text-pink-700 text-foreground/85 leading-relaxed">Crescente se a &gt; 1; Decrescente se 0 &lt; a &lt; 1</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Assíntota vertical em x = 0</p>
                        </div>
                      </div>
                      <AlertBox tipo="info" titulo="Inversa da Exponencial">
                        f(x) = log_a(x) é a inversa de g(x) = aˣ. São reflexões ao longo da reta y = x!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Transformações de Funções",
                  icone: <LuRepeat />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="leading-relaxed text-xl text-foreground/85">
                        Deslocar, esticar ou refletir uma função logarítmica:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-rose-500/10 p-4 rounded-lg border border-rose-500/20">
                          <p className="text-xl font-bold text-rose-700 mb-1 text-foreground/85 leading-relaxed">Deslocamento Horizontal</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">f(x+c): desloca c unidades para ESQUERDA</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">f(x-c): desloca c unidades para DIREITA</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">Exemplo: log(x-3) desloca 3 para direita</p>
                        </div>
                        <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                          <p className="text-xl font-bold text-red-700 mb-1 text-foreground/85 leading-relaxed">Deslocamento Vertical</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">f(x)+c: desloca c unidades para CIMA</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">f(x)-c: desloca c unidades para BAIXO</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">Exemplo: log(x)+2 desloca 2 para cima</p>
                        </div>
                        <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/20">
                          <p className="text-xl font-bold text-pink-700 mb-1 text-foreground/85 leading-relaxed">Escala</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">k·f(x): estica verticalmente por fator k</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">f(k·x): comprime horizontalmente por fator k</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Identificação de Transformações",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="leading-relaxed text-xl text-foreground/85">
                        Identifique rapidamente que tipo de transformação ocorreu:
                      </p>
                      <div className="space-y-2">
                        <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg">
                          <p className="text-xl font-bold text-rose-700 text-foreground/85 leading-relaxed">📌 Se o ponto (1,0) se move, há deslocamento</p>
                        </div>
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                          <p className="text-xl font-bold text-red-700 text-foreground/85 leading-relaxed">📌 Se a curva fica mais "aberta", há compressão</p>
                        </div>
                        <div className="p-3 bg-pink-500/10 border border-pink-500/20 rounded-lg">
                          <p className="text-xl font-bold text-pink-700 text-foreground/85 leading-relaxed">📌 Se a curva fica mais "fechada", há expansão</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Inversões Sutis",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="warning" titulo="Pegadinha #1">
                        -log_a(x) inverte a curva (reflexão sobre o eixo x). A função fica DECRESCENTE!
                      </AlertBox>
                      <AlertBox tipo="warning" titulo="Pegadinha #2">
                        log_a(-x) não existe se x &gt; 0. Só funciona para x &lt; 0. Domínio muda!
                      </AlertBox>
                      <AlertBox tipo="info" titulo="Extra">
                        Em gráficos, sempre procure o ponto (1, c) onde c é o deslocamento vertical de (1,0)!
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm">
            <FunctionGraph
              title="Transformações de Funções Logarítmicas"
              functions={[
                {
                  id: "ln_x",
                  fn: (x) => (x > 0 ? Math.log(x) : null),
                  color: "#3b82f6",
                  label: "ln(x)",
                  strokeWidth: 2,
                },
                {
                  id: "ln_2x",
                  fn: (x) => (x > 0 ? 2 * Math.log(x) : null),
                  color: "#ef4444",
                  label: "2·ln(x)",
                  strokeWidth: 2,
                },
                {
                  id: "ln_x_plus_1",
                  fn: (x) => (x > 0 ? Math.log(x) + 1 : null),
                  color: "#10b981",
                  label: "ln(x)+1",
                  strokeWidth: 2,
                },
              ]}
              xMin={0.1}
              xMax={10}
              yMin={-5}
              yMax={5}
              points={300}
            />
          </section>



          <section id="quiz-modulo-6" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[6]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Se log a = 5 e log b = 3, qual é o valor de log(a² / b)?"
          alternativas={[
            { letra: "A", texto: "7", correta: true },
              { letra: "B", texto: "2", correta: false },
              { letra: "C", texto: "13", correta: false },
              { letra: "D", texto: "25/3", correta: false },
              { letra: "E", texto: "10", correta: false }
          ]}
          dicaEstrategica="Substituindo: 2×(5) - 3 = 10 - 3 = 7."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Aplicando as propriedades: log(a² / b) = log(a²) - log(b)." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Depois, a regra do tombo no a²: 2×log(a) - log(b)." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa A como a resposta correta." }
          ]}
        />

        <ModuleConsolidation moduloNumero={6}
            index={6}
            variant={mv[6]}
            resumoVisual={{
              moduloNome: "Módulo 6",
              tituloAula: "Funções Logarítmicas",
              materia: "Matemática",
              images: [
                { title: "Sempre passa por (1,0)", type: "Propriedade", placeholderColor: "bg-rose-500/20" },
                { title: "Deslocamentos Horizontal/Vertical", type: "Transformação", placeholderColor: "bg-red-500/20" },
                { title: "Escala e Reflexão", type: "Modificação", placeholderColor: "bg-pink-500/20" }
              ]
            }}
            maceteVisual={{
              title: "O Ponto Fixo",
              content: (
                <div className="space-y-4 text-left">
                  <p className="text-xl text-foreground/85 leading-relaxed">"Todo log passa por (1,0) — use isso como referência!"</p>
                  <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl font-mono text-center">
                    <p className="text-xl text-foreground/85 leading-relaxed">f(1) = log_a(1) = 0 ✓</p>
                    <p className="text-lg text-foreground/85 leading-relaxed text-center mt-2">Independente de transformações</p>
                  </div>
                </div>
              )
            }}
            podcast={{
            aulaId: "funcoeslogaritmicas",
            aulaTitulo: "Funcoes Logaritmicas",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 6,
            moduloTitulo: "Módulo 6",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                      <QuizInterativo
              questoes={quizM6}
              titulo="QUIZ: Funções Logarítmicas"
              numero={3}
              variant={mv[6]}
              icone="📊"
              onComplete={(score) => handleModuleComplete("modulo-6", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 7: SISTEMAS & INEQUAÇÕES ═══ */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={7}
            titulo="Sistemas e Inequações"
            descricao="Quando múltiplas equações logarítmicas se encontram numa mesma arena."
             variant={mv[7]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Combinações Táticas de Logaritmos"
              description="A combinação tática de restrições logarítmicas simultâneas."
              variant="indigo"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Sistemas de Equações",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="leading-relaxed text-xl text-foreground/85">
                        Quando duas ou mais equações logarítmicas devem ser satisfeitas simultaneamente, combine propriedades com técnicas algébricas:
                      </p>
                      <AlertBox tipo="info" titulo="Estratégia Principal">
                        Use propriedades de logaritmos para simplificar cada equação ANTES de resolver o sistema.
                      </AlertBox>
                      <div className="bg-indigo-500/5 p-3 rounded-lg border border-indigo-500/20 mt-3">
                        <p className="text-xl text-foreground/85 leading-relaxed"><strong>Ordem:</strong> Propriedades → Conversão → Sistema → Validação</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Casos Práticos",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="leading-relaxed text-xl text-foreground/85">
                        Exemplo de sistema integrado:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/20">
                          <p className="text-xl font-bold text-indigo-700 mb-2 text-foreground/85 leading-relaxed">Sistema: log₂(x) + log₂(y) = 5 e log₂(x/y) = 1</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Simplifique: log₂(xy) = 5 e log₂(x) - log₂(y) = 1</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Converta: xy = 32 e x/y = 2</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Resolva: de x/y = 2 → x = 2y. Substitua: 2y·y = 32 → y² = 16 → y = 4, x = 8</p>
                          <p className="text-xl font-bold text-green-600 text-foreground/85 leading-relaxed">Solução: (x, y) = (8, 4) ✓</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Inequações Logarítmicas",
                  icone: <LuZap />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="leading-relaxed text-xl text-foreground/85">
                        Cuidado especial com inequações — o sinal pode inverter!
                      </p>
                      <div className="space-y-2">
                        <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                          <p className="text-xl font-bold text-indigo-700 text-foreground/85 leading-relaxed">📌 Se a &gt; 1: log_a(x₁) &lt; log_a(x₂) ⟹ x₁ &lt; x₂ (mantém sinal)</p>
                        </div>
                        <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                          <p className="text-xl font-bold text-purple-700 text-foreground/85 leading-relaxed">📌 Se 0 &lt; a &lt; 1: log_a(x₁) &lt; log_a(x₂) ⟹ x₁ &gt; x₂ (inverte sinal!)</p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha de Prova">
                        Em CESGRANRIO, sempre test a base! Se a = 0.5, o sinal INVERTE. Muitos alunos esquecem!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Pegadinhas em Sistemas",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="warning" titulo="Pegadinha #1">
                        Em sistemas, verifique que cada solução satisfaz <strong>TODAS</strong> as equações E todos os domínios.
                      </AlertBox>
                      <AlertBox tipo="warning" titulo="Pegadinha #2">
                        Em inequações com 0 &lt; a &lt; 1, lembre-se: o sinal da inequação INVERTE!
                      </AlertBox>
                      <AlertBox tipo="info" titulo="Extra">
                        Sempre teste a solução do sistema voltando para as equações originais. Uma falhinha ali mata tudo!
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm">
            <FunctionGraph
              title="Visualizando Inequações Logarítmicas"
              functions={[
                {
                  id: "ln_x",
                  fn: (x) => (x > 0 ? Math.log(x) : null),
                  color: "#3b82f6",
                  label: "ln(x)",
                  strokeWidth: 2,
                },
                {
                  id: "y_equals_2",
                  fn: (x) => 2,
                  color: "#f59e0b",
                  label: "y = 2",
                  strokeWidth: 2,
                },
              ]}
              xMin={0.1}
              xMax={150}
              yMin={-1}
              yMax={3}
              points={300}
            />
          </section>



          <section id="quiz-modulo-7" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={"indigo"}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Se log a = 5 e log b = 3, qual é o valor de log(a² / b)?"
          alternativas={[
            { letra: "A", texto: "7", correta: true },
              { letra: "B", texto: "2", correta: false },
              { letra: "C", texto: "13", correta: false },
              { letra: "D", texto: "25/3", correta: false },
              { letra: "E", texto: "10", correta: false }
          ]}
          dicaEstrategica="Substituindo: 2×(5) - 3 = 10 - 3 = 7."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Aplicando as propriedades: log(a² / b) = log(a²) - log(b)." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Depois, a regra do tombo no a²: 2×log(a) - log(b)." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa A como a resposta correta." }
          ]}
        />

        <ModuleConsolidation moduloNumero={7}
            index={7}
            variant="indigo"
            resumoVisual={{
              moduloNome: "Módulo 7",
              tituloAula: "Funções Logarítmicas",
              materia: "Matemática",
              images: [
                { title: "Combinar Equações", type: "Sistema", placeholderColor: "bg-indigo-500/20" },
                { title: "Verificar Domínios", type: "Validação", placeholderColor: "bg-purple-500/20" },
                { title: "Atenção ao Sinal (0<a<1)", type: "Inequação", placeholderColor: "bg-blue-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Sistema vs Inequação",
              content: (
                <div className="space-y-3 text-left">
                  <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                    <p className="text-xl font-bold text-foreground/85 leading-relaxed">Sistemas: teste cada solução em TODAS as equações</p>
                  </div>
                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <p className="text-xl font-bold text-foreground/85 leading-relaxed">Inequações: a&gt;1 mantém sinal; 0&lt;a&lt;1 inverte!</p>
                  </div>
                </div>
              )
            }}
            podcast={{
            aulaId: "funcoeslogaritmicas",
            aulaTitulo: "Funcoes Logaritmicas",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 7,
            moduloTitulo: "Módulo 7",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                      <QuizInterativo
              questoes={quizM7}
              titulo="QUIZ: Sistemas & Inequações"
              numero={3}
              variant="indigo"
              icone="🔗"
              onComplete={(score) => handleModuleComplete("modulo-7", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 8: RESOLUÇÃO REVERSA ═══ */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={8}
            titulo="Resolução Reversa"
            descricao="Desconstruir problemas complexos até seus componentes logarítmicos primitivos."
             variant={mv[8]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Decomposição de Problemas"
              description="Inverta a lógica: comece pelo resultado e trabalhe para trás até o argumento."
              variant={mv[8]}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Pensamento Inverso",
                  icone: <LuRepeat />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="leading-relaxed text-xl text-foreground/85">
                        Em problemas reversos, você recebe uma expressão aparentemente complexa e precisa identificar que ela é um logaritmo disfarçado:
                      </p>
                      <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 text-center font-mono text-xl text-foreground/85 leading-relaxed">
                        <p>"Qual expoente x satisfaz 2ˣ = 5?"</p>
                        <p className="text-lg text-foreground/85 leading-relaxed mt-2">Isso é: x = log₂(5)</p>
                      </div>
                      <p className="text-xl mt-3 text-foreground/85 leading-relaxed">
                        O truque é reconhecer quando uma PERGUNTA é, na verdade, um logaritmo escondido!
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Reconhecimento de Padrões",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="leading-relaxed text-xl text-foreground/85">
                        Veja como identificar logaritmos disfarçados:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                          <p className="text-xl font-bold text-green-700 mb-1 text-foreground/85 leading-relaxed">Pergunta: "Qual é o expoente?"</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Resposta: Use logaritmo com essa base</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">Exemplo: 2ˣ = 10 → x = log₂(10)</p>
                        </div>
                        <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/20">
                          <p className="text-xl font-bold text-emerald-700 mb-1 text-foreground/85 leading-relaxed">Pergunta: "Em quantos períodos?"</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Em crescimento exponencial: use log para encontrar tempo</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">Exemplo: P(t) = 1000·(1.05)ᵗ, quando P = 2000? → t = log_(1.05)(2)</p>
                        </div>
                        <div className="bg-teal-500/10 p-4 rounded-lg border border-teal-500/20">
                          <p className="text-xl font-bold text-teal-700 mb-1 text-foreground/85 leading-relaxed">Exemplo: "3ˣ = 243, encontre x"</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Solução: x = log₃(243) = 5</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">Verificação: 3⁵ = 243 ✓</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Conversão Inteligente",
                  icone: <LuZap />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="leading-relaxed text-xl text-foreground/85">
                        Domine essa técnica reversa:
                      </p>
                      <div className="space-y-2">
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                          <p className="text-xl font-bold text-emerald-700 text-foreground/85 leading-relaxed">📌 Veja exponencial? Converta para log</p>
                        </div>
                        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                          <p className="text-xl font-bold text-green-700 text-foreground/85 leading-relaxed">📌 Veja crescimento N(t) = N₀·aᵗ? Use log para encontrar t</p>
                        </div>
                        <div className="p-3 bg-teal-500/10 border border-teal-500/20 rounded-lg">
                          <p className="text-xl font-bold text-teal-700 text-foreground/85 leading-relaxed">📌 Mentalize: log e exponencial são inversas</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Contexto Importa",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="info" titulo="Dica Crucial">
                        Logaritmos e exponenciais são funções inversas. Se tiver dificuldade em uma forma, sempre tente converter para a outra.
                      </AlertBox>
                      <AlertBox tipo="warning" titulo="Cuidado com Bases">
                        Em log_(1.05)(2), a base é 1.05, não é 10! Use mudança de base ou calculadora científica!
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-8" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[8]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Se log a = 5 e log b = 3, qual é o valor de log(a² / b)?"
          alternativas={[
            { letra: "A", texto: "7", correta: true },
              { letra: "B", texto: "2", correta: false },
              { letra: "C", texto: "13", correta: false },
              { letra: "D", texto: "25/3", correta: false },
              { letra: "E", texto: "10", correta: false }
          ]}
          dicaEstrategica="Substituindo: 2×(5) - 3 = 10 - 3 = 7."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Aplicando as propriedades: log(a² / b) = log(a²) - log(b)." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Depois, a regra do tombo no a²: 2×log(a) - log(b)." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa A como a resposta correta." }
          ]}
        />

        <ModuleConsolidation moduloNumero={8}
            index={8}
            variant={mv[8]}
            resumoVisual={{
              moduloNome: "Módulo 8",
              tituloAula: "Funções Logarítmicas",
              materia: "Matemática",
              images: [
                { title: "Inversa: Exp ↔ Log", type: "Conceito", placeholderColor: "bg-emerald-500/20" },
                { title: "Identificar Padrões", type: "Reconhecimento", placeholderColor: "bg-green-500/20" },
                { title: "Converter Inteligentemente", type: "Estratégia", placeholderColor: "bg-teal-500/20" }
              ]
            }}
            maceteVisual={{
              title: "O Espelho: Exponencial ↔ Logaritmo",
              content: (
                <div className="space-y-4 text-left">
                  <p className="text-xl text-foreground/85 leading-relaxed">São funções inversas! Use a conversão quando precisar.</p>
                  <div className="space-y-2">
                    <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded text-xl text-foreground/85 leading-relaxed">
                      aˣ = b  ⟹  x = log_a(b)
                    </div>
                    <div className="p-2 bg-green-500/10 border border-green-500/20 rounded text-xl text-foreground/85 leading-relaxed">
                      log_a(x) = b  ⟹  x = aᵇ
                    </div>
                  </div>
                </div>
              )
            }}
            podcast={{
            aulaId: "funcoeslogaritmicas",
            aulaTitulo: "Funcoes Logaritmicas",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 8,
            moduloTitulo: "Módulo 8",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                      <QuizInterativo
              questoes={quizM8}
              titulo="QUIZ: Resolução Reversa"
              numero={3}
              variant={mv[8]}
              icone="🔄"
              onComplete={(score) => handleModuleComplete("modulo-8", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 9: APLICAÇÕES PETROBRAS ═══ */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={9}
            titulo="Aplicações Petrobras"
            descricao="Onde os logaritmos vivem na indústria de petróleo e gás natural."
             variant={mv[9]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Logaritmos no Mundo Real"
              description="A matemática por trás das operações de exploração e produção."
              variant={mv[9]}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Escalas Logarítmicas",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="leading-relaxed text-xl text-foreground/85">
                        Escalas logarítmicas comprimem números enormes em representações manejáveis:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                          <p className="text-xl font-bold text-blue-700 text-foreground/85 leading-relaxed">pH (Hidrogênio)</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">pH = -log₁₀[H⁺]. Um aumento de 1 unidade = redução de 10× em acidez</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">Em refinarias: pH do corrosivo vs neutro</p>
                        </div>
                        <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/20">
                          <p className="text-xl font-bold text-cyan-700 text-foreground/85 leading-relaxed">Decibéis (Ruído)</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">dB = 10 × log₁₀(I/I₀). Usado em monitoramento de ruído de plataformas</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">Legislação ambiental offshore: limite de 85 dB</p>
                        </div>
                        <div className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/20">
                          <p className="text-xl font-bold text-indigo-700 text-foreground/85 leading-relaxed">Escala Richter (Sísmico)</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">R = log₁₀(A/A₀). Crítico para monitorar atividade sísmica em campos offshore</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">Um ponto a mais = 30× mais energia liberada!</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Casos Petrobras",
                  icone: <LuTrendingUp />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="leading-relaxed text-xl text-foreground/85">
                        Problemas reais da indústria petrolífera:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                          <p className="text-xl font-bold text-blue-700 mb-2 text-foreground/85 leading-relaxed">pH em Refinaria</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Se [H⁺] = 10⁻⁷, então pH = -log₁₀(10⁻⁷) = 7 (neutro). Se [H⁺] = 10⁻⁴, então pH = 4 (ácido)</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">Diferença de pH 3 = 1000× mais acidez!</p>
                        </div>
                        <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/20">
                          <p className="text-xl font-bold text-cyan-700 mb-2 text-foreground/85 leading-relaxed">Decaimento em Dutos</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Corrosão: M(t) = M₀ × (0,85)ᵗ. Em quantos meses cai para 50%? Use log!</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">0,5M₀ = M₀ × (0,85)ᵗ → log(0,5) = t × log(0,85) → t ≈ 5,4 meses</p>
                        </div>
                        <div className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/20">
                          <p className="text-xl font-bold text-indigo-700 mb-2 text-foreground/85 leading-relaxed">Monitoramento Sísmico</p>
                          <p className="text-xl text-foreground/85 leading-relaxed">Terremoto magnitude 5.0 vs 6.0 offshore = 10 vezes mais energia!</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">Escala é logarítmica, não linear!</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Modelagem de Crescimento",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="leading-relaxed text-xl text-foreground/85">
                        Em exploração de petróleo, crescimento e decaimento aparecem frequentemente:
                      </p>
                      <div className="space-y-2">
                        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                          <p className="text-xl font-bold text-blue-700 text-foreground/85 leading-relaxed">📌 Produção cresce por tempo? Use N(t) = N₀·aᵗ</p>
                        </div>
                        <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                          <p className="text-xl font-bold text-cyan-700 text-foreground/85 leading-relaxed">📌 Precisa encontrar t? Use logaritmo!</p>
                        </div>
                        <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                          <p className="text-xl font-bold text-indigo-700 text-foreground/85 leading-relaxed">📌 Sempre converta para escala apropriada (pH, dB, etc)</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Diferenças de Escala",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="warning" titulo="Atenção à Fórmula">
                        Nem toda escala usa log₁₀. Verifique a fórmula exata em cada contexto!
                      </AlertBox>
                      <AlertBox tipo="info" titulo="Exemplo">
                        pH = -log₁₀[H⁺] (negativo!)
                        dB = 10 × log₁₀(razão) (multiplicado por 10!)
                        Richter = log₁₀(A/A₀) (normal!)
                      </AlertBox>
                      <div className="bg-orange-500/5 p-3 rounded-lg border border-orange-500/20 mt-3">
                        <p className="text-xl text-foreground/85 leading-relaxed"><strong>Pegadinha em CESGRANRIO:</strong> O sinal negativo em pH! Muitos esquecem e erram. pH MAIOR = MENOS ácido (porque [H⁺] MENOR)!</p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-9" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={"blue"}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Se log a = 5 e log b = 3, qual é o valor de log(a² / b)?"
          alternativas={[
            { letra: "A", texto: "7", correta: true },
              { letra: "B", texto: "2", correta: false },
              { letra: "C", texto: "13", correta: false },
              { letra: "D", texto: "25/3", correta: false },
              { letra: "E", texto: "10", correta: false }
          ]}
          dicaEstrategica="Substituindo: 2×(5) - 3 = 10 - 3 = 7."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Aplicando as propriedades: log(a² / b) = log(a²) - log(b)." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Depois, a regra do tombo no a²: 2×log(a) - log(b)." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa A como a resposta correta." }
          ]}
        />

        <ModuleConsolidation moduloNumero={9}
            index={9}
            variant={mv[9]}
            resumoVisual={{
              moduloNome: "Módulo 9",
              tituloAula: "Funções Logarítmicas",
              materia: "Matemática",
              images: [
                { title: "pH: -log₁₀[H⁺]", type: "Fórmula", placeholderColor: "bg-blue-500/20" },
                { title: "dB: 10×log₁₀(razão)", type: "Fórmula", placeholderColor: "bg-cyan-500/20" },
                { title: "Richter: log₁₀(A/A₀)", type: "Fórmula", placeholderColor: "bg-indigo-500/20" }
              ]
            }}
            maceteVisual={{
              title: "3 Escalas Principais",
              content: (
                <div className="space-y-2 text-left text-xl text-foreground/85 leading-relaxed">
                  <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded">
                    pH = -log₁₀[H⁺] (química)
                  </div>
                  <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded">
                    dB = 10 log₁₀(razão) (acústica)
                  </div>
                  <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded">
                    R = log₁₀(A/A₀) (sísmica)
                  </div>
                </div>
              )
            }}
            podcast={{
            aulaId: "funcoeslogaritmicas",
            aulaTitulo: "Funcoes Logaritmicas",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 9,
            moduloTitulo: "Módulo 9",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                      <QuizInterativo
              questoes={quizM9}
              titulo="QUIZ: Aplicações Petrobras"
              numero={3}
              variant={mv[9]}
              icone="🛢️"
              onComplete={(score) => handleModuleComplete("modulo-9", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 10: SIMULADO MESTRE ═══ */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={10}
            titulo="Simulado Mestre"
            descricao="O teste final combinando todo o conhecimento de logaritmos. Prepare-se para a prova real."
             variant={mv[10]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Integração Completa de Conhecimento"
              description="Questões que combinam múltiplos conceitos em um único desafio."
              variant={mv[10]}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Estratégia de Prova",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="leading-relaxed text-xl text-foreground/85">
                        Em provas integradas, mantenha essa estratégia:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                          <p className="text-xl font-bold text-purple-700 text-foreground/85 leading-relaxed">Etapa 1: Leia com atenção</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">Procure palavras-chave: log, expoente, crescimento, escala</p>
                        </div>
                        <div className="bg-rose-500/10 p-4 rounded-lg border border-rose-500/20">
                          <p className="text-xl font-bold text-rose-700 text-foreground/85 leading-relaxed">Etapa 2: Identifique o tipo de problema</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">É equação? Sistema? Inequação? Aplicação?</p>
                        </div>
                        <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/20">
                          <p className="text-xl font-bold text-pink-700 text-foreground/85 leading-relaxed">Etapa 3: Aplique propriedades em ordem</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">Não pule etapas. Propriedades primeiro!</p>
                        </div>
                        <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                          <p className="text-xl font-bold text-red-700 text-foreground/85 leading-relaxed">Etapa 4: Verifique restrições e domínio</p>
                          <p className="text-lg text-foreground/85 leading-relaxed mt-1">A parte que mata — não esqueça!</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Problema Desafiador",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="leading-relaxed text-xl text-foreground/85">
                        Resolva: log₂(log₃(x)) = 1
                      </p>
                      <div className="space-y-2 text-xl text-foreground/85 leading-relaxed">
                        <p><strong>Passo 1:</strong> Identifique: logaritmo de logaritmo (composição)</p>
                        <p><strong>Passo 2:</strong> Converta exterior: log₃(x) = 2¹ = 2</p>
                        <p><strong>Passo 3:</strong> Converta interior: x = 3² = 9</p>
                        <p><strong>Passo 4:</strong> Verifique: log₃(9) = log₃(3²) = 2 ✓ e log₂(2) = 1 ✓</p>
                        <p><strong>Passo 5:</strong> Teste domínio: x &gt; 0 e log₃(x) &gt; 0 → x &gt; 1. Como x = 9 &gt; 1 ✓</p>
                        <p className="font-bold text-green-600">Resposta: x = 9 ✓ VÁLIDO!</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Gestão de Tempo",
                  icone: <LuZap />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="leading-relaxed text-xl text-foreground/85">
                        Em provas com limite de tempo:
                      </p>
                      <div className="space-y-2">
                        <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                          <p className="text-xl font-bold text-purple-700 text-foreground/85 leading-relaxed">📌 Faça questões fáceis PRIMEIRO (sem cálculos complexos)</p>
                        </div>
                        <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg">
                          <p className="text-xl font-bold text-rose-700 text-foreground/85 leading-relaxed">📌 Deixe as complexas para o final</p>
                        </div>
                        <div className="p-3 bg-pink-500/10 border border-pink-500/20 rounded-lg">
                          <p className="text-xl font-bold text-pink-700 text-foreground/85 leading-relaxed">📌 Se travar em uma, pule e volte depois</p>
                        </div>
                      </div>
                      <AlertBox tipo="info" titulo="Mentalize">
                        Você já estudou tudo. Confia no seu processo. Lê com calma. Propriedades antes de converter. Domínio por último. You got this!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Últimas Pegadinhas",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="warning" titulo="Checklist Final">
                        <p className="text-xl text-foreground/85 leading-relaxed">✓ Restrições de domínio (a&gt;0, a≠1, b&gt;0)</p>
                        <p className="text-xl text-foreground/85 leading-relaxed">✓ Propriedades aplicadas corretamente</p>
                        <p className="text-xl text-foreground/85 leading-relaxed">✓ Solução testada na equação original</p>
                        <p className="text-xl text-foreground/85 leading-relaxed">✓ Bases e logaritmandos verificados</p>
                        <p className="text-xl text-foreground/85 leading-relaxed">✓ Sinal correto em pH (negativo!) e dB (multiplicado por 10!)</p>
                      </AlertBox>
                      <div className="bg-green-500/5 p-3 rounded-lg border border-green-500/20 mt-3">
                        <p className="text-xl text-foreground/85 leading-relaxed"><strong>Verdade final:</strong> CESGRANRIO adora testar domínio. Essa é a pegadinha #1. Acerte ali e acerta a questão toda!</p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          {showCompletionBadge ? (
            <div className="flex flex-col items-center gap-6 py-10 mt-10">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center animate-bounce">
                <LuTrophy className="w-12 h-12 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black">
                Logaritmos Completamente Dominados
              </h3>
              <p className="text-center text-muted-foreground max-w-sm">
                Você conquistou a maestria em funções logarítmicas. Está pronto para qualquer desafio que vier na CESGRANRIO!
              </p>
            </div>
          ) : (
            <section id="quiz-modulo-10" className="mt-8">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[10]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Se log a = 5 e log b = 3, qual é o valor de log(a² / b)?"
          alternativas={[
            { letra: "A", texto: "7", correta: true },
              { letra: "B", texto: "2", correta: false },
              { letra: "C", texto: "13", correta: false },
              { letra: "D", texto: "25/3", correta: false },
              { letra: "E", texto: "10", correta: false }
          ]}
          dicaEstrategica="Substituindo: 2×(5) - 3 = 10 - 3 = 7."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Aplicando as propriedades: log(a² / b) = log(a²) - log(b)." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Depois, a regra do tombo no a²: 2×log(a) - log(b)." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa A como a resposta correta." }
          ]}
        />

        <ModuleConsolidation moduloNumero={10}
            index={10}
            variant={mv[10]}
            resumoVisual={{
              moduloNome: "Módulo 10",
              tituloAula: "Funções Logarítmicas",
              materia: "Matemática",
              images: [
                { title: "Todos os 9 Módulos Anteriores", type: "Revisão", placeholderColor: "bg-purple-500/20" },
                { title: "Problemas Integrados", type: "Aplicação", placeholderColor: "bg-rose-500/20" },
                { title: "Estratégias de Prova", type: "Tática", placeholderColor: "bg-pink-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Checklist Mestre de Logaritmos",
              content: (
                <div className="space-y-2 text-left text-xl text-foreground/85 leading-relaxed">
                  <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded">
                    ✓ Definição e conversão exponencial
                  </div>
                  <div className="p-2 bg-rose-500/10 border border-rose-500/20 rounded">
                    ✓ Propriedades (soma, subtração, potência)
                  </div>
                  <div className="p-2 bg-pink-500/10 border border-pink-500/20 rounded">
                    ✓ Domínio e restrições
                  </div>
                  <div className="p-2 bg-red-500/10 border border-red-500/20 rounded">
                    ✓ Aplicações Petrobras (pH, dB, Richter)
                  </div>
                </div>
              )
            }}
            podcast={{
            aulaId: "funcoeslogaritmicas",
            aulaTitulo: "Funcoes Logaritmicas",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 10,
            moduloTitulo: "Módulo 10",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                        <QuizInterativo
                questoes={quizM10}
                titulo="QUIZ: Simulado Mestre"
                icone="🏆"
                numero={3}
                variant={mv[10]}
                onComplete={(score) => handleModuleComplete("modulo-10", score)}
              />
            </section>
          )}
        </div>
      </TabsContent>

      {/* ═══ APÊNDICE: RESUMO RÁPIDO PARA PROVA ═══ */}
      <div className="mt-20 mb-10 space-y-8">
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold">Exercícios Práticos Extras</h2>
          <p className="text-muted-foreground">Problemas resolvidos para consolidar cada módulo:</p>

          <div className="space-y-6">
            <div className="bg-indigo-500/5 p-5 rounded-xl border border-indigo-500/20">
              <p className="text-xl font-bold text-indigo-700 mb-3 text-foreground/85 leading-relaxed">Módulo 1: Conceito Básico</p>
              <p className="text-lg text-foreground/85 leading-relaxed mb-2"><strong>Problema:</strong> Se log₅(x) = 2, qual é x?</p>
              <p className="text-lg text-foreground/85 leading-relaxed"><strong>Solução:</strong> x = 5² = 25. Verificação: log₅(25) = log₅(5²) = 2 ✓</p>
            </div>

            <div className="bg-emerald-500/5 p-5 rounded-xl border border-emerald-500/20">
              <p className="text-xl font-bold text-emerald-700 mb-3 text-foreground/85 leading-relaxed">Módulo 2: Propriedades</p>
              <p className="text-lg text-foreground/85 leading-relaxed mb-2"><strong>Problema:</strong> Simplifique log₂(16) + log₂(8) - log₂(2)</p>
              <p className="text-lg text-foreground/85 leading-relaxed"><strong>Solução:</strong> = log₂(16·8÷2) = log₂(64) = log₂(2⁶) = 6 ✓</p>
            </div>

            <div className="bg-cyan-500/5 p-5 rounded-xl border border-cyan-500/20">
              <p className="text-xl font-bold text-cyan-700 mb-3 text-foreground/85 leading-relaxed">Módulo 3: Equações</p>
              <p className="text-lg text-foreground/85 leading-relaxed mb-2"><strong>Problema:</strong> log₃(x-1) = 2. Encontre x.</p>
              <p className="text-lg text-foreground/85 leading-relaxed"><strong>Solução:</strong> x-1 = 3² = 9 → x = 10. Domínio: x-1&gt;0 → x&gt;1 ✓ (10&gt;1)</p>
            </div>

            <div className="bg-blue-500/5 p-5 rounded-xl border border-blue-500/20">
              <p className="text-xl font-bold text-blue-700 mb-3 text-foreground/85 leading-relaxed">Módulo 4: Domínio</p>
              <p className="text-lg text-foreground/85 leading-relaxed mb-2"><strong>Problema:</strong> Qual é o domínio de f(x) = log(x²-9)?</p>
              <p className="text-lg text-foreground/85 leading-relaxed"><strong>Solução:</strong> x²-9&gt;0 → x²&gt;9 → x&lt;-3 ou x&gt;3. D = (-∞,-3)∪(3,+∞) ✓</p>
            </div>

            <div className="bg-amber-500/5 p-5 rounded-xl border border-amber-500/20">
              <p className="text-xl font-bold text-amber-700 mb-3 text-foreground/85 leading-relaxed">Módulo 5: Integrado</p>
              <p className="text-lg text-foreground/85 leading-relaxed mb-2"><strong>Problema:</strong> log₄(x) + log₄(x-3) = 1</p>
              <p className="text-lg text-foreground/85 leading-relaxed"><strong>Solução:</strong> log₄[x(x-3)] = 1 → x(x-3) = 4 → x²-3x-4=0 → x=4 ou x=-1. Domínio: x&gt;0, x-3&gt;0 → x&gt;3. Válido: x=4 ✓</p>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold">Resumo Rápido para Prova</h2>
          <p className="text-muted-foreground">Use este guia nos últimos 5 minutos antes da prova para revisar.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-indigo-500/10 p-5 rounded-xl border border-indigo-500/20">
              <p className="text-xl font-bold text-indigo-700 mb-3 text-foreground/85 leading-relaxed">Definição Fundamental</p>
              <p className="font-mono text-xl text-center text-foreground/85 leading-relaxed">log_a(b) = c ⟺ aᶜ = b</p>
              <p className="text-lg text-foreground/85 leading-relaxed mt-2 text-center">Regra de ouro: CONVERTER</p>
            </div>

            <div className="bg-emerald-500/10 p-5 rounded-xl border border-emerald-500/20">
              <p className="text-xl font-bold text-emerald-700 mb-3 text-foreground/85 leading-relaxed">3 Propriedades</p>
              <ul className="text-lg text-foreground/85 leading-relaxed space-y-1">
                <li>• log(mn) = log(m) + log(n)</li>
                <li>• log(m/n) = log(m) - log(n)</li>
                <li>• log(mⁿ) = n·log(m)</li>
              </ul>
            </div>

            <div className="bg-cyan-500/10 p-5 rounded-xl border border-cyan-500/20">
              <p className="text-xl font-bold text-cyan-700 mb-3 text-foreground/85 leading-relaxed">Restrições Absolutas</p>
              <p className="text-lg text-foreground/85 leading-relaxed">Base: a&gt;0, a≠1</p>
              <p className="text-lg text-foreground/85 leading-relaxed">Argumentação: b&gt;0</p>
              <p className="text-lg text-foreground/85 leading-relaxed font-bold text-red-600 mt-1">Sempre testar no final!</p>
            </div>

            <div className="bg-amber-500/10 p-5 rounded-xl border border-amber-500/20">
              <p className="text-xl font-bold text-amber-700 mb-3 text-foreground/85 leading-relaxed">Ordem de Ação</p>
              <ol className="text-lg text-foreground/85 leading-relaxed space-y-1">
                <li>1. Propriedades</li>
                <li>2. Converter exponencial</li>
                <li>3. Resolver</li>
                <li>4. Validar domínio</li>
              </ol>
            </div>

            <div className="bg-rose-500/10 p-5 rounded-xl border border-rose-500/20">
              <p className="text-xl font-bold text-rose-700 mb-3 text-foreground/85 leading-relaxed">Escalas Petrobras</p>
              <p className="text-lg text-foreground/85 leading-relaxed">pH = -log₁₀[H⁺]</p>
              <p className="text-lg text-foreground/85 leading-relaxed">dB = 10·log₁₀(razão)</p>
              <p className="text-lg text-foreground/85 leading-relaxed">R = log₁₀(A/A₀)</p>
            </div>

            <div className="bg-blue-500/10 p-5 rounded-xl border border-blue-500/20">
              <p className="text-xl font-bold text-blue-700 mb-3 text-foreground/85 leading-relaxed">Mudança de Base</p>
              <p className="font-mono text-lg text-foreground/85 leading-relaxed text-center">log_a(b) = log₁₀(b)/log₁₀(a)</p>
              <p className="text-lg text-foreground/85 leading-relaxed mt-1">Quando base é estranha!</p>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold">Pegadinhas CESGRANRIO TOP 5</h2>

          <div className="space-y-4">
            <div className="border-l-4 border-red-500 bg-red-500/5 p-4 rounded">
              <p className="text-xl font-bold text-red-700 mb-1 text-foreground/85 leading-relaxed">1. Domínio é a RESPOSTA</p>
              <p className="text-lg text-foreground/85 leading-relaxed">Resolveu? Testou no domínio? Descartou invalidas? Só aí marca letra!</p>
            </div>

            <div className="border-l-4 border-orange-500 bg-orange-500/5 p-4 rounded">
              <p className="text-xl font-bold text-orange-700 mb-1 text-foreground/85 leading-relaxed">2. pH tem sinal negativo</p>
              <p className="text-lg text-foreground/85 leading-relaxed">pH = -log₁₀[H⁺]. Não esqueça o sinal! pH maior = MENOS ácido!</p>
            </div>

            <div className="border-l-4 border-yellow-500 bg-yellow-500/5 p-4 rounded">
              <p className="text-xl font-bold text-yellow-700 mb-1 text-foreground/85 leading-relaxed">3. Não distribui log sobre soma</p>
              <p className="text-lg text-foreground/85 leading-relaxed">log(a+b) ≠ log(a) + log(b). Muitos caem nessa! Propriedade só para × e ÷</p>
            </div>

            <div className="border-l-4 border-green-500 bg-green-500/5 p-4 rounded">
              <p className="text-xl font-bold text-green-700 mb-1 text-foreground/85 leading-relaxed">4. Inequação com base &lt;1 INVERTE</p>
              <p className="text-lg text-foreground/85 leading-relaxed">Se 0&lt;a&lt;1: log_a(x)&lt;log_a(y) ⟹ x&gt;y. Sinal inverte!</p>
            </div>

            <div className="border-l-4 border-blue-500 bg-blue-500/5 p-4 rounded">
              <p className="text-xl font-bold text-blue-700 mb-1 text-foreground/85 leading-relaxed">5. Logaritmo de logaritmo de dentro pra fora</p>
              <p className="text-lg text-foreground/85 leading-relaxed">log₂(log₃(x))? Resolva o de dentro PRIMEIRO, depois o de fora!</p>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold">Casos Especiais & Truques</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-500/10 p-5 rounded-xl border border-purple-500/20">
              <p className="text-xl font-bold text-purple-700 mb-2 text-foreground/85 leading-relaxed">Logaritmo Inverso</p>
              <p className="text-lg text-foreground/85 leading-relaxed">Se aˣ = b, então x = log_a(b)</p>
              <p className="text-lg text-foreground/85 leading-relaxed mt-1">São funções inversas!</p>
            </div>

            <div className="bg-teal-500/10 p-5 rounded-xl border border-teal-500/20">
              <p className="text-xl font-bold text-teal-700 mb-2 text-foreground/85 leading-relaxed">Logaritmo de 1</p>
              <p className="text-lg text-foreground/85 leading-relaxed">log_a(1) = 0 SEMPRE</p>
              <p className="text-lg text-foreground/85 leading-relaxed mt-1">Porque a⁰ = 1</p>
            </div>

            <div className="bg-cyan-500/10 p-5 rounded-xl border border-cyan-500/20">
              <p className="text-xl font-bold text-cyan-700 mb-2 text-foreground/85 leading-relaxed">Logaritmo da Base</p>
              <p className="text-lg text-foreground/85 leading-relaxed">log_a(a) = 1 SEMPRE</p>
              <p className="text-lg text-foreground/85 leading-relaxed mt-1">Porque a¹ = a</p>
            </div>

            <div className="bg-pink-500/10 p-5 rounded-xl border border-pink-500/20">
              <p className="text-xl font-bold text-pink-700 mb-2 text-foreground/85 leading-relaxed">Base Fora do Log</p>
              <p className="text-lg text-foreground/85 leading-relaxed">a^(log_a(x)) = x</p>
              <p className="text-lg text-foreground/85 leading-relaxed mt-1">Propriedade poderosa!</p>
            </div>

            <div className="bg-indigo-500/10 p-5 rounded-xl border border-indigo-500/20">
              <p className="text-xl font-bold text-indigo-700 mb-2 text-foreground/85 leading-relaxed">Crescimento Exponencial</p>
              <p className="text-lg text-foreground/85 leading-relaxed">N(t) = N₀·aᵗ → t = log_a(N/N₀)</p>
              <p className="text-lg text-foreground/85 leading-relaxed mt-1">Use log pra encontrar TEMPO</p>
            </div>

            <div className="bg-orange-500/10 p-5 rounded-xl border border-orange-500/20">
              <p className="text-xl font-bold text-orange-700 mb-2 text-foreground/85 leading-relaxed">Meia-Vida / Decaimento</p>
              <p className="text-lg text-foreground/85 leading-relaxed">M(t) = M₀·(1/2)^(t/T) → use log</p>
              <p className="text-lg text-foreground/85 leading-relaxed mt-1">Radiatividade, corrosão, etc</p>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold">Tabela de Referência Rápida</h2>
          <p className="text-muted-foreground">Valores logarítmicos comuns que aparecem em CESGRANRIO:</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xl text-foreground/85 leading-relaxed">
            <div className="bg-slate-500/10 p-3 rounded border border-slate-500/20">
              <p className="font-bold">log₁₀(2) ≈ 0,30</p>
            </div>
            <div className="bg-slate-500/10 p-3 rounded border border-slate-500/20">
              <p className="font-bold">log₁₀(3) ≈ 0,48</p>
            </div>
            <div className="bg-slate-500/10 p-3 rounded border border-slate-500/20">
              <p className="font-bold">log₁₀(5) ≈ 0,70</p>
            </div>
            <div className="bg-slate-500/10 p-3 rounded border border-slate-500/20">
              <p className="font-bold">log₁₀(7) ≈ 0,85</p>
            </div>
            <div className="bg-slate-500/10 p-3 rounded border border-slate-500/20">
              <p className="font-bold">ln(2) ≈ 0,69</p>
            </div>
            <div className="bg-slate-500/10 p-3 rounded border border-slate-500/20">
              <p className="font-bold">ln(10) ≈ 2,30</p>
            </div>
            <div className="bg-slate-500/10 p-3 rounded border border-slate-500/20">
              <p className="font-bold">log₂(10) ≈ 3,32</p>
            </div>
            <div className="bg-slate-500/10 p-3 rounded border border-slate-500/20">
              <p className="font-bold">log₃(2) ≈ 0,63</p>
            </div>
            <div className="bg-slate-500/10 p-3 rounded border border-slate-500/20">
              <p className="font-bold">log₅(2) ≈ 0,43</p>
            </div>
          </div>

          <AlertBox tipo="info" titulo="Como usar">
            Quando sua calculadora científica tiver só log₁₀ e ln, use a fórmula de mudança de base para converter! Essas aproximações já são suficientes para muitos problemas.
          </AlertBox>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold">Estratégia de Estudo Final</h2>

          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 text-indigo-700 font-bold text-xl text-foreground/85 leading-relaxed">1</div>
              <div>
                <p className="font-bold text-xl mb-1 text-foreground/85 leading-relaxed">Releia todas as 10 definições dos módulos</p>
                <p className="text-lg text-foreground/85 leading-relaxed">Conceito é tudo. Se conceito está claro, resolução sai fácil.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-700 font-bold text-xl text-foreground/85 leading-relaxed">2</div>
              <div>
                <p className="font-bold text-xl mb-1 text-foreground/85 leading-relaxed">Grave essas 3 propriedades na memória</p>
                <p className="text-lg text-foreground/85 leading-relaxed">log(mn) = log(m)+log(n), log(m/n) = log(m)-log(n), log(mⁿ) = n·log(m). Sabe isso? Sabe tudo.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 text-cyan-700 font-bold text-xl text-foreground/85 leading-relaxed">3</div>
              <div>
                <p className="font-bold text-xl mb-1 text-foreground/85 leading-relaxed">Pratique converter entre log e exponencial</p>
                <p className="text-lg text-foreground/85 leading-relaxed">Isso é o TRUQUE. A conversão resolve 90% dos problemas. Treina 10 conversões rápidas.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 text-blue-700 font-bold text-xl text-foreground/85 leading-relaxed">4</div>
              <div>
                <p className="font-bold text-xl mb-1 text-foreground/85 leading-relaxed">Teste domínio SEMPRE</p>
                <p className="text-lg text-foreground/85 leading-relaxed">Terminou? Teste a/as solução/soluções no domínio original. Descarta inválidas. Só aí marca.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 text-amber-700 font-bold text-xl text-foreground/85 leading-relaxed">5</div>
              <div>
                <p className="font-bold text-xl mb-1 text-foreground/85 leading-relaxed">Revise pH, dB, Richter</p>
                <p className="text-lg text-foreground/85 leading-relaxed">CESGRANRIO adora aplicações reais. Se pedir escala logarítmica, você já sabe!</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl border border-indigo-500/30 p-8 md:p-10 space-y-4">
          <h2 className="text-2xl font-bold">Sua Jornada Logarítmica</h2>
          <p className="text-muted-foreground">Você passou por 10 módulos de imersão profunda:</p>
          <ul className="space-y-2 text-xl text-foreground/85 leading-relaxed">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              <span>M1: Conceito Logarítmico — entendeu o que é log</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              <span>M2: Propriedades Fundamentais — dominou as 3 regras</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
              <span>M3: Equações Logarítmicas — resolveu isolando x</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>M4: Condições de Existência — aprendeu a descartar inválidas</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
              <span>M5: Desafio Integrado — combinou tudo</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
              <span>M6: Funções Logarítmicas — visualizou gráficos</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
              <span>M7: Sistemas & Inequações — trabalhou com múltiplas equações</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
              <span>M8: Resolução Reversa — reconheceu logs disfarçados</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span>M9: Aplicações Petrobras — viu logs na indústria</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
              <span>M10: Simulado Mestre — provou domínio completo</span>
            </li>
          </ul>
          <div className="mt-6 p-4 bg-white/50 dark:bg-slate-950/50 rounded-lg border border-purple-500/20">
            <p className="text-center font-bold text-lg">
              Você virou MESTRE em Funções Logarítmicas! 🏆
            </p>
            <p className="text-center text-xl mt-2 text-foreground/85 leading-relaxed">
              Qualquer questão da CESGRANRIO com logaritmo: você conquista!
            </p>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold">FAQ: Dúvidas Frequentes</h2>

          <div className="space-y-5">
            <div className="bg-indigo-500/5 p-5 rounded-xl border border-indigo-500/20">
              <p className="font-bold text-xl text-indigo-700 mb-2 text-foreground/85 leading-relaxed">P: Por que logaritmo é a inversa da exponencial?</p>
              <p className="text-lg text-foreground/85 leading-relaxed">R: Se f(x) = aˣ, então f⁻¹(y) = log_a(y). Aplicar uma depois da outra volta ao original: log_a(aˣ) = x e a^(log_a(x)) = x. São espelhos!</p>
            </div>

            <div className="bg-emerald-500/5 p-5 rounded-xl border border-emerald-500/20">
              <p className="font-bold text-xl text-emerald-700 mb-2 text-foreground/85 leading-relaxed">P: Qual base usar se nenhuma for especificada?</p>
              <p className="text-lg text-foreground/85 leading-relaxed">R: Em CESGRANRIO concurso: base 10 (log₁₀). Em cálculo/científico: base e (ln). Em computação: base 2 (log₂). Sempre leia o enunciado!</p>
            </div>

            <div className="bg-cyan-500/5 p-5 rounded-xl border border-cyan-500/20">
              <p className="font-bold text-xl text-cyan-700 mb-2 text-foreground/85 leading-relaxed">P: Como resolver log(a+b)?</p>
              <p className="text-lg text-foreground/85 leading-relaxed">R: Não tem propriedade para isso! log(a+b) ≠ log(a) + log(b). Não existe simplificação direta. Se está nessa forma, algo está errado no problema ou você precisa de outro método.</p>
            </div>

            <div className="bg-blue-500/5 p-5 rounded-xl border border-blue-500/20">
              <p className="font-bold text-xl text-blue-700 mb-2 text-foreground/85 leading-relaxed">P: Uma solução é válida? Como saber?</p>
              <p className="text-lg text-foreground/85 leading-relaxed">R: Teste 3 coisas: (1) Substitua na equação original — ambos lados devem ser iguais. (2) Verifique domínio — todas as variáveis no argumento de log devem ser &gt;0. (3) Se múltiplas soluções, descarta as que violam domínio.</p>
            </div>

            <div className="bg-rose-500/5 p-5 rounded-xl border border-rose-500/20">
              <p className="font-bold text-xl text-rose-700 mb-2 text-foreground/85 leading-relaxed">P: Qual é o gráfico de f(x) = log(x)?</p>
              <p className="text-lg text-foreground/85 leading-relaxed">R: Passa por (1,0). Cresce lentamente para direita (x&gt;1). Cai para -∞ à esquerda (0&lt;x&lt;1). Assíntota vertical em x=0. Domínio: x&gt;0. Contradomínio: todos os reais.</p>
            </div>

            <div className="bg-amber-500/5 p-5 rounded-xl border border-amber-500/20">
              <p className="font-bold text-xl text-amber-700 mb-2 text-foreground/85 leading-relaxed">P: Como resolver 2^(log_2(x)) rapidinho?</p>
              <p className="text-lg text-foreground/85 leading-relaxed">R: Use propriedade: a^(log_a(b)) = b. Aqui, 2^(log_2(x)) = x. Direto! Tipo: 5^(log_5(10)) = 10. 3^(log_3(7)) = 7. Sempre igual ao argumento!</p>
            </div>

            <div className="bg-green-500/5 p-5 rounded-xl border border-green-500/20">
              <p className="font-bold text-xl text-green-700 mb-2 text-foreground/85 leading-relaxed">P: Inequações logarítmicas são iguais a equações?</p>
              <p className="text-lg text-foreground/85 leading-relaxed">R: Quase! Diferença crucial: se base &gt;1, sinal MANTÉM (log crescente). Se 0&lt;base&lt;1, sinal INVERTE (log decrescente). Sempre teste a base ANTES de remover log!</p>
            </div>

            <div className="bg-purple-500/5 p-5 rounded-xl border border-purple-500/20">
              <p className="font-bold text-xl text-purple-700 mb-2 text-foreground/85 leading-relaxed">P: Devo memorizar valores como log₁₀(2) = 0,30?</p>
              <p className="text-lg text-foreground/85 leading-relaxed">R: Ajuda muito! Memorize os 5 principais (2, 3, 5, 7, 10). Mas se esquecer, use mudança de base na calculadora. Banca reconhece que você sabe o método!</p>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold">Próximos Passos Após Este Curso</h2>

          <div className="space-y-4">
            <p className="text-xl text-foreground/85 leading-relaxed">Você completou a jornada em Funções Logarítmicas. Aqui está o que vem depois:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/20">
                <p className="font-bold text-xl text-indigo-700 mb-2 text-foreground/85 leading-relaxed">Sequências & Séries</p>
                <p className="text-lg text-foreground/85 leading-relaxed">Crescimento logarítmico é fundamental para progressões geométricas infinitas. Você verá log novamente!</p>
              </div>

              <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/20">
                <p className="font-bold text-xl text-emerald-700 mb-2 text-foreground/85 leading-relaxed">Probabilidade & Estatística</p>
                <p className="text-lg text-foreground/85 leading-relaxed">Escala logarítmica em gráficos de distribuição. pH, dB e Richter eram só o começo!</p>
              </div>

              <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/20">
                <p className="font-bold text-xl text-cyan-700 mb-2 text-foreground/85 leading-relaxed">Cálculo Diferencial</p>
                <p className="text-lg text-foreground/85 leading-relaxed">Derivada de log é 1/x. Integral de 1/x é ln(x). Logaritmos VOLTAM em cálculo!</p>
              </div>

              <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                <p className="font-bold text-xl text-blue-700 mb-2 text-foreground/85 leading-relaxed">Aplicações de Engenharia</p>
                <p className="text-lg text-foreground/85 leading-relaxed">Resistência de materiais, acústica, sismologia. Você já conhece essas aplicações!</p>
              </div>
            </div>

            <AlertBox tipo="success" titulo="Conselho Final">
              Não pense que terminou com logaritmos. Você dominou o conceito fundamental. Cada novo tópico em matemática superior reutiliza isso. Você tem uma base sólida — construa sobre ela com confiança!
            </AlertBox>
          </div>
        </section>
      </div>
    </AulaTemplate>
  );
}
