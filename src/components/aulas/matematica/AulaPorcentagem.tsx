import { getAllModuleVariants } from "@/lib/moduleColors";
"use client";
import { useAulaProgress } from "@/hooks/useAulaProgress";
import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  ModuleConsolidation,
  
  AlertBox,
  QuizInterativo,
  ModuleBanner,
  getRandomQuestions,
  AulaProps,
  CardCarousel,
  ContentAccordion,
  AulaTemplate,
  ModuleSectionHeader,
  FlipCard,
  LessonTabs,
  ModuleSummaryCarouselNew,
  FunctionGraph,
  type FunctionPlot,
  QuestaoResolvidaStepByStep} from "../shared";
import {
  LuBookOpen,
  LuPercent,
  LuTrendingUp,
  LuTrendingDown,
  LuActivity,
  LuWallet,
  LuZap,
  LuArrowRight,
  LuCircleCheck,
  LuTriangleAlert,
  LuRotateCcw,
  LuTrophy,
  LuCalculator,
  LuRefreshCw,
  LuDollarSign,
  LuFactory,
} from "react-icons/lu";
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

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", titulo: "Fundamentos" },
  { id: "modulo-2", label: "Módulo 2", titulo: "Aumentos e Descontos" },
  { id: "modulo-3", label: "Módulo 3", titulo: "Variação %" },
  { id: "modulo-4", label: "Módulo 4", titulo: "Aplicações Industriais" },
  { id: "modulo-5", label: "Módulo 5", titulo: "Simulado Parcial" },
  { id: "modulo-6", label: "Módulo 6", titulo: "% Composta" },
  { id: "modulo-7", label: "Módulo 7", titulo: "Cálculo Reverso" },
  { id: "modulo-8", label: "Módulo 8", titulo: "Regra de Três %" },
  { id: "modulo-9", label: "Módulo 9", titulo: "Financeiro" },
  { id: "modulo-10", label: "Módulo 10", titulo: "Simulado Final" },
] as const;

const mv = [undefined, ...getAllModuleVariants()];

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
  const { completedModules: completedModulesList, updateCompletedModules } = useAulaProgress();
  const completedModules = new Set(completedModulesList);

  const [quizM1] = useState(() => getRandomQuestions(QUIZ_M1_CONCEITOS, 4));
  const [quizM2] = useState(() => getRandomQuestions(QUIZ_M2_AUMENTOS, 4));
  const [quizM3] = useState(() => getRandomQuestions(QUIZ_M3_VARIACAO, 4));
  const [quizM4] = useState(() => getRandomQuestions(QUIZ_M4_APLICACOES, 4));
  const [quizM5] = useState(() => getRandomQuestions(QUIZ_M5_FINAL, 5));
  const [quizM6] = useState(() => getRandomQuestions(QUIZ_M6_COMPOSTA, 4));
  const [quizM7] = useState(() => getRandomQuestions(QUIZ_M7_CALCULO_REVERSO, 4));
  const [quizM8] = useState(() => getRandomQuestions(QUIZ_M8_REGRA_TRES, 4));
  const [quizM9] = useState(() => getRandomQuestions(QUIZ_M9_FINANCEIRO, 4));
  const [quizM10] = useState(() => getRandomQuestions(QUIZ_M10_SIMULADO, 5));

  const totalModulos = MODULE_DEFS.length;

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) {
      const nextCompleted = new Set(completedModules);
      nextCompleted.add(moduleId);
      updateCompletedModules(Array.from(nextCompleted));
      const idx = MODULE_DEFS.findIndex((m) => m.id === moduleId);
      onUpdateProgress?.(Math.round(((idx + 1) / totalModulos) * 100));
      if (idx < totalModulos - 1) {
        setTimeout(() => setActiveTab(MODULE_DEFS[idx + 1].id), 1500);
      } else {
        onComplete?.();
      }
    }
  };

  useEffect(() => {
    if (currentProgress && currentProgress > 0) {
      const count = Math.floor((currentProgress / 100) * totalModulos);
      const s = new Set<string>();
      for (let i = 1; i <= count; i++) s.add(`modulo-${i}`);
      updateCompletedModules(Array.from(s));
    }
  }, [currentProgress, totalModulos]);

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
      currentProgress={Math.round((completedModules.size / totalModulos) * 100)}
      onComplete={onComplete}
      loading={loading}
      xpGanho={xpGanho}
    >
      {/* ═══════════════════════════════════════════════════════
          MÓDULO 1 — FUNDAMENTOS DE PORCENTAGEM
      ═══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-1">
        <div className="space-y-[50px]">
          <ModuleBanner numero={1}
            titulo="Fundamentos de Porcentagem"
            descricao="O alicerce: conversões, cálculos e a lógica por trás do símbolo %."
             variant="blue"/>

          {/* SEÇÃO 1: Conceito Central */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="A Linguagem Universal dos Números"
              description="Porcentagem está em todo relatório técnico, toda proposta comercial, todo indicador Petrobras."
              variant="blue"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação: O Que É Porcentagem?",
                  icone: <LuPercent />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        <strong>Porcentagem</strong> significa literalmente{" "}
                        <em>"por cento"</em> — uma razão cujo denominador é{" "}
                        <strong>sempre 100</strong>. É a forma padronizada para
                        comparar grandezas de escalas diferentes em um denominador
                        comum.
                      </p>
                      <div className="p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center space-y-2">
                        <p className="font-mono text-2xl font-black text-emerald-700 dark:text-emerald-400">
                          p% = p ÷ 100
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Fórmula raiz — tudo parte daqui
                        </p>
                      </div>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        <strong>Na prática Petrobras:</strong> A eficiência
                        energética de uma caldeira (92%), a pureza mínima de GLP
                        (99,5%), o percentual de redução de emissões de CO₂
                        (38%) — todos são porcentagens comparando parte/todo em
                        base 100.
                      </p>
                      <AlertBox tipo="info" titulo="Contexto Industrial">
                        Nos relatórios RPBC, REPAR e REPLAN, cada indicador de
                        desempenho usa porcentagem. Saber converter e operar com
                        agilidade elimina tempo de prova.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação: Tabela Mestra de Conversões",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Memorizar estas equivalências elimina cálculos na prova.
                        Candidatos que as dominam respondem questões em{" "}
                        <strong>30 segundos</strong> enquanto outros demoram 3
                        minutos.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-center">
                        {[
                          { f: "1/2", p: "50%", d: "0,5" },
                          { f: "1/4", p: "25%", d: "0,25" },
                          { f: "3/4", p: "75%", d: "0,75" },
                          { f: "1/5", p: "20%", d: "0,2" },
                          { f: "2/5", p: "40%", d: "0,4" },
                          { f: "3/5", p: "60%", d: "0,6" },
                          { f: "1/10", p: "10%", d: "0,1" },
                          { f: "1/20", p: "5%", d: "0,05" },
                        ].map(({ f, p, d }) => (
                          <div
                            key={f}
                            className="bg-muted p-2 rounded-lg font-mono text-xs"
                          >
                            <span className="font-bold">{f}</span> = {p} ={" "}
                            {d}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-amber-500/10 border border-amber-500/30 p-2 rounded-lg font-mono text-xs text-center text-amber-700 dark:text-amber-400">
                          <span className="font-bold">1/3 ≈ 33,33%</span>{" "}
                          (dízima!)
                        </div>
                        <div className="bg-amber-500/10 border border-amber-500/30 p-2 rounded-lg font-mono text-xs text-center text-amber-700 dark:text-amber-400">
                          <span className="font-bold">1/8 = 12,5%</span>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas: Calcular X% de Y — O Método do Móbile",
                  icone: <LuCalculator />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Dois métodos rápidos para calcular porcentagens mentalmente:
                      </p>
                      <div className="space-y-3">
                        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                          <p className="font-bold text-sm mb-1">Método 1 — Fator Decimal</p>
                          <p className="text-sm text-muted-foreground">
                            Converta direto: <strong>15% de 240</strong> →{" "}
                            <code>0,15 × 240 = 36</code>
                          </p>
                        </div>
                        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                          <p className="font-bold text-sm mb-1">Método 2 — Decomposição (Mental)</p>
                          <p className="text-sm text-muted-foreground">
                            <strong>15% de 240</strong>: 10% = 24, 5% = 12 →{" "}
                            <strong>24 + 12 = 36</strong>. Rápido e sem
                            calculadora.
                          </p>
                        </div>
                        <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                          <p className="font-bold text-sm mb-1">Método 3 — Inversão (Comutatividade)</p>
                          <p className="text-sm text-muted-foreground">
                            <strong>4% de 75</strong> = <strong>75% de 4</strong>{" "}
                            = 3. Muito mais fácil!
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções: Pegadinhas de Base",
                  icone: <LuTriangleAlert />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="danger" titulo="'De' vs 'Sobre'">
                        <strong>"10% de desconto"</strong> e{" "}
                        <strong>"desconto de 10 sobre 100"</strong> são
                        equivalentes. Mas a CESGRANRIO frequentemente usa
                        linguagem ambígua. Leia: o número que segue "de" ou "sobre"
                        é <em>sempre</em> a base (100%).
                      </AlertBox>
                      <AlertBox tipo="warning" titulo="Porcentagem de Porcentagem">
                        "A taxa cresceu 50% e agora é 6%." A taxa{" "}
                        <strong>não é</strong> 56%. Era, por exemplo, 4%.
                        Crescimento de 50% sobre 4% = +2 p.p. = 6%. Confundir
                        ponto percentual com porcentagem relativa é a armadilha
                        n°1 da CESGRANRIO.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          {/* SEÇÃO 2: FlipCards de fixação rápida */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Flashcards de Elite"
              description="Resposta rápida. Clique para revelar o raciocínio completo."
              variant="blue"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                    <LuPercent className="w-10 h-10 text-primary opacity-50" />
                    <h6 className="text-lg font-bold uppercase tracking-tight">1% de 1000</h6>
                    <p className="text-sm text-muted-foreground">Qual o valor?</p>
                  </div>
                }
                verso={
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <LuCircleCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                      <p className="text-sm font-bold text-emerald-400">1% de 1000 = 10</p>
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-100">
                      Regra do 1%: divida por 100. 1000 ÷ 100 = 10.
                      Memorize: <strong>1% de qualquer número</strong> é esse
                      número dividido por 100.
                    </p>
                    <div className="p-2 bg-primary/10 rounded-xl border border-primary/20 text-xs text-primary">
                      Dica de Elite: 5% = 5× o valor de 1%. Logo 5% de 1000 = 50.
                    </div>
                  </div>
                }
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                    <LuCalculator className="w-10 h-10 text-primary opacity-50" />
                    <h6 className="text-lg font-bold uppercase tracking-tight">35% de 200</h6>
                    <p className="text-sm text-muted-foreground">Calcule mentalmente</p>
                  </div>
                }
                verso={
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <LuCircleCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                      <p className="text-sm font-bold text-emerald-400">35% de 200 = 70</p>
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-100">
                      Decomposição: 10% de 200 = 20. 30% = 60. 5% = 10.
                      30% + 5% = <strong>70</strong>.
                    </p>
                    <div className="p-2 bg-primary/10 rounded-xl border border-primary/20 text-xs text-primary">
                      Dica: Quebre sempre em múltiplos de 10% + 5%.
                    </div>
                  </div>
                }
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                    <LuArrowRight className="w-10 h-10 text-primary opacity-50" />
                    <h6 className="text-lg font-bold uppercase tracking-tight">3/8 em %</h6>
                    <p className="text-sm text-muted-foreground">Converta a fração</p>
                  </div>
                }
                verso={
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <LuCircleCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                      <p className="text-sm font-bold text-emerald-400">3/8 = 37,5%</p>
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-100">
                      1/8 = 12,5%. Logo 3/8 = 3 × 12,5% = 37,5%.
                      Memorize 1/8 e multiplique.
                    </p>
                    <div className="p-2 bg-primary/10 rounded-xl border border-primary/20 text-xs text-primary">
                      Tabela: 1/8=12,5% | 2/8=25% | 3/8=37,5% | 4/8=50%
                    </div>
                  </div>
                }
              />
            </div>
          </section>

          <section id="quiz-modulo-1">



          











        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={4}
          titulo="Na Prática: Como a Banca Cobra"
          variant={"indigo"}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Em uma prova da CESGRANRIO com 60 questões, a nota mínima para aprovação é 50%. O candidato precisa acertar, no mínimo:"
          alternativas={[
              { letra: "A", texto: "25 questões", correta: false },
              { letra: "B", texto: "28 questões", correta: false },
              { letra: "C", texto: "30 questões", correta: true },
              { letra: "D", texto: "32 questões", correta: false },
              { letra: "E", texto: "35 questões", correta: false }
            ]}
          dicaEstrategica="Tipo de questão muito comum: transformar percentual em valor absoluto."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "50% de 60 = 0,50 × 60 = 30 questões." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa C como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={4}
            variant="indigo"
            video={{
              videoId: "h3S9XW1WzIk",
              title: "Revisão do Módulo 1",
              duration: "8:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 1",
              tituloAula: "Porcentagem",
              materia: "Matemática",
              images: [
                { title: "Conceito Principal", type: "Mapa Mental", placeholderColor: "bg-indigo-500/20" },
                { title: "Exemplos Práticos", type: "Esquema", placeholderColor: "bg-indigo-500/20" },
                { title: "Aplicações", type: "Fórmula", placeholderColor: "bg-indigo-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Dica de Ouro do Módulo 1",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                    <p className="font-bold text-indigo-600 dark:text-indigo-400">Padrão Essencial</p>
                    <p className="text-sm">Memorize a estrutura-chave deste módulo.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Rítmo do Aprendizado",
              artista: "Prof. Musical"
            }}
          />

                      <QuizInterativo
              questoes={quizM1}
              titulo="QUIZ: Fundamentos"
              numero={5}
              variant="blue"
              icone="🧠"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader index={3} title="Resumo e Multimídia" variant="indigo" />
            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Mapa de Conversões %",
                          type: "Infográfico",
                          placeholderColor: "bg-emerald-100 dark:bg-emerald-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Tabela visual dark premium mostrando conversões entre fração, decimal e porcentagem. Colunas: Fração | Decimal | Porcentagem. Cores Petrobras (verde/ciano), tipografia monospace, destaque em células críticas (1/3=33,33%, 1/8=12,5%). Estilo dossiê técnico.
                        },
                        {
                          title: "Método de Decomposição Mental",
                          type: "Diagrama",
                          placeholderColor: "bg-teal-100 dark:bg-teal-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Diagrama de fluxo dark premium mostrando como decompor 37% de 480 em 30%+7%: setas, caixas coloridas com os valores intermediários, resultado final em destaque ciano. Estilo operacional Petrobras.
                        },
                      ]}
                      moduloNome="Fundamentos de Porcentagem"
                      tituloAula="Porcentagem"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════
          MÓDULO 2 — AUMENTOS E DESCONTOS
      ═══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-2">
        <div className="space-y-[50px]">
          <ModuleBanner numero={2}
            titulo="Aumentos e Descontos"
            descricao="O fator multiplicador: a arma secreta que elimina 3 passos de cálculo."
             variant="blue"/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="O Fator Multiplicador"
              description="Uma única multiplicação substitui: calcular %, somar/subtrair do original."
              variant="blue"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação: Fator de Aumento",
                  icone: <LuTrendingUp />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        O <strong>fator multiplicador</strong> representa o novo
                        inteiro após aplicar a taxa. Para um aumento de 15%:
                      </p>
                      <div className="p-5 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-center space-y-1">
                        <p className="font-mono text-xl font-black text-blue-700 dark:text-blue-400">
                          Fator = 1 + (taxa ÷ 100)
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Aumento de +15% → fator = 1 + 0,15 = <strong>1,15</strong>
                        </p>
                      </div>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        <strong>Exemplo Petrobras:</strong> O salário base de um
                        técnico de manutenção era R$ 4.800. Recebeu reajuste de
                        12,5%. Novo salário:{" "}
                        <code>4.800 × 1,125 = R$ 5.400</code>. Rápido, sem
                        calcular 12,5% separado.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Conceituação: Fator de Desconto",
                  icone: <LuTrendingDown />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Para descontos, subtrai-se do 1 (que representa 100%):
                      </p>
                      <div className="p-5 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-center space-y-1">
                        <p className="font-mono text-xl font-black text-rose-700 dark:text-rose-400">
                          Fator = 1 - (taxa ÷ 100)
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Desconto de -20% → fator = 1 - 0,20 = <strong>0,80</strong>
                        </p>
                      </div>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        <strong>Exemplo:</strong> Uma plataforma de R$ 2.000.000
                        sofreu desconto de 8% na negociação de um contrato.
                        Valor final:{" "}
                        <code>2.000.000 × 0,92 = R$ 1.840.000</code>.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas: Aumentos/Descontos Sucessivos",
                  icone: <LuRefreshCw />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="danger" titulo="A Megera dos Concursos">
                        "O insumo petroquímico subiu 50% e no mês seguinte caiu
                        50%. O preço voltou ao original?" <strong>NÃO!</strong>{" "}
                        Fatores sucessivos se <em>multiplicam</em>, não se somam.
                        <br />
                        <br />
                        <code>1,50 × 0,50 = 0,75</code> → Houve um déficit de{" "}
                        <strong>25%</strong> sobre o preço inicial.
                      </AlertBox>
                      <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                        <p className="font-bold text-sm mb-2">Fórmula dos Sucessivos:</p>
                        <p className="font-mono text-sm">
                          Fator Total = F₁ × F₂ × F₃ × ...
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Três aumentos de 10% cada:{" "}
                          <code>1,10³ = 1,331</code> → +33,1% total (não 30%)
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções: Desconto Comercial vs Desconto Condicional",
                  icone: <LuTriangleAlert />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Na CESGRANRIO, questões de licitação Petrobras distinguem:
                      </p>
                      <div className="space-y-2">
                        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-sm">
                          <strong>Desconto Comercial:</strong> Aplicado sobre o
                          preço tabela antes da nota fiscal. Calculado sobre o
                          valor bruto.
                        </div>
                        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-sm">
                          <strong>Desconto Condicional (Financeiro):</strong>{" "}
                          Dado por pagamento antecipado. Calculado sobre o valor
                          já após descontos comerciais — ou seja, sobre uma base
                          menor.
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Ordem Importa">
                        Desconto de 5% comercial + 2% financeiro ≠ 7%. É{" "}
                        <code>0,95 × 0,98 = 0,931</code> → desconto real de
                        6,9%.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          {/* SEÇÃO 2: CardCarousel de casos práticos */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Casos da Petrobras"
              description="Situações reais onde o fator multiplicador é indispensável."
              variant="blue"
            />
            <CardCarousel
              cards={[
                {
                  titulo: "Reajuste Salarial",
                  descricao: "Técnico com R$ 5.200 recebeu 8,5% de aumento. Cálculo: 5200 × 1,085 = R$ 5.642. Nunca calcule 8,5% separado e some depois — use o fator direto.",
                },
                {
                  titulo: "Depreciação de Equipamento",
                  descricao: "Uma bomba centrífuga de R$ 180.000 sofreu redução de 12% no valor venal após revisão. Valor residual: 180.000 × 0,88 = R$ 158.400.",
                },
                {
                  titulo: "Desconto em Contrato",
                  descricao: "Fornecedor ofereceu 7% de desconto em pedido de R$ 3.200.000. Valor final: 3.200.000 × 0,93 = R$ 2.976.000.",
                },
                {
                  titulo: "Aumento Duplo Sucessivo",
                  descricao: "Insumo com aumento de 15% em janeiro e 10% em março. Fator: 1,15 × 1,10 = 1,265 → aumento real de 26,5% (não 25%).",
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-2">



          











        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={4}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Em uma prova da CESGRANRIO com 60 questões, a nota mínima para aprovação é 50%. O candidato precisa acertar, no mínimo:"
          alternativas={[
              { letra: "A", texto: "25 questões", correta: false },
              { letra: "B", texto: "28 questões", correta: false },
              { letra: "C", texto: "30 questões", correta: true },
              { letra: "D", texto: "32 questões", correta: false },
              { letra: "E", texto: "35 questões", correta: false }
            ]}
          dicaEstrategica="Tipo de questão muito comum: transformar percentual em valor absoluto."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "50% de 60 = 0,50 × 60 = 30 questões." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa C como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={4}
            variant="blue"
            video={{
              videoId: "h3S9XW1WzIk",
              title: "Revisão do Módulo 2",
              duration: "8:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 2",
              tituloAula: "Porcentagem",
              materia: "Matemática",
              images: [
                { title: "Conceito Principal", type: "Mapa Mental", placeholderColor: "bg-emerald-500/20" },
                { title: "Exemplos Práticos", type: "Esquema", placeholderColor: "bg-emerald-500/20" },
                { title: "Aplicações", type: "Fórmula", placeholderColor: "bg-emerald-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Dica de Ouro do Módulo 2",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <p className="font-bold text-emerald-600 dark:text-emerald-400">Padrão Essencial</p>
                    <p className="text-sm">Memorize a estrutura-chave deste módulo.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Rítmo do Aprendizado",
              artista: "Prof. Musical"
            }}
          />

                      <QuizInterativo
              questoes={quizM2}
              titulo="QUIZ: Aumentos e Descontos"
              numero={5}
              variant="blue"
              icone="🎯"
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader index={3} title="Resumo e Multimídia" variant="indigo" />
            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Fator Multiplicador — Mapa Mental",
                          type: "Mapa Mental",
                          placeholderColor: "bg-blue-100 dark:bg-blue-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Mapa mental dark premium mostrando o Fator Multiplicador no centro. Ramos: Aumento (1+i), Desconto (1-i), Sucessivos (produto de fatores), Pegadinha (nunca some taxas). Cores azul e ciano, ícones industriais Petrobras.
                        },
                      ]}
                      moduloNome="Aumentos e Descontos"
                      tituloAula="Porcentagem"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════
          MÓDULO 3 — VARIAÇÃO PERCENTUAL
      ═══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-3">
        <div className="space-y-[50px]">
          <ModuleBanner numero={3}
            titulo="Variação Percentual"
            descricao="Calcule quanto subiu ou caiu em relação ao valor inicial — sem errar a base."
             variant="blue"/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="A Fórmula Inviolável"
              description="Onde 90% dos candidatos erram: confundem base inicial com base final."
              variant="blue"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação: Variação Relativa",
                  icone: <LuActivity />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        A <strong>variação percentual relativa</strong> mede
                        quanto algo cresceu ou diminuiu em relação ao seu estado
                        inicial — o <em>ponto de partida</em> é sempre o
                        denominador.
                      </p>
                      <div className="p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-center space-y-2">
                        <p className="font-mono text-xl font-black text-amber-700 dark:text-amber-400">
                          Var% = (V_Final − V_Inicial) ÷ V_Inicial × 100
                        </p>
                        <p className="text-xs text-muted-foreground">
                          O denominador é SEMPRE o valor inicial
                        </p>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p className="text-muted-foreground">
                          <strong>Exemplo 1:</strong> Produção da RNEST passou
                          de 120.000 bbl/dia para 156.000 bbl/dia.
                        </p>
                        <div className="p-3 bg-muted rounded-xl font-mono text-xs">
                          Var% = (156.000 − 120.000) ÷ 120.000 × 100
                          <br />
                          Var% = 36.000 ÷ 120.000 × 100 ={" "}
                          <strong>+30%</strong>
                        </div>
                        <p className="text-muted-foreground mt-2">
                          <strong>Exemplo 2:</strong> Custo operacional caiu de
                          R$ 85 milhões para R$ 68 milhões.
                        </p>
                        <div className="p-3 bg-muted rounded-xl font-mono text-xs">
                          Var% = (68 − 85) ÷ 85 × 100
                          <br />
                          Var% = −17 ÷ 85 × 100 ≈ <strong>−20%</strong>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas: Pontos Percentuais vs Variação Relativa",
                  icone: <LuZap />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Esta é a distinção <strong>mais cobrada</strong> pela
                        CESGRANRIO em questões de interpretação de dados:
                      </p>
                      <div className="space-y-3">
                        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                          <p className="font-bold text-sm">Ponto Percentual (p.p.)</p>
                          <p className="text-sm text-muted-foreground">
                            Diferença aritmética entre duas taxas. Ex: taxa de
                            eficiência subiu de 4% para 7% → subiu{" "}
                            <strong>3 p.p.</strong>
                          </p>
                        </div>
                        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                          <p className="font-bold text-sm">Variação Relativa (%)</p>
                          <p className="text-sm text-muted-foreground">
                            Crescimento proporcional da taxa em si. Subiu de 4%
                            para 7%: variação relativa ={" "}
                            <code>(7−4)/4 × 100 = +75%</code>
                          </p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="A Pegadinha Clássica">
                        "A taxa subiu 3 pontos percentuais" ≠ "A taxa subiu
                        3%". São afirmações diferentes. A CESGRANRIO usa isso
                        para derrubar candidatos desatentos.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções: Variação com Valores Negativos (Queda)",
                  icone: <LuTriangleAlert />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Quando V_Final {"<"} V_Inicial, o resultado é negativo —
                        isso representa <strong>queda percentual</strong>.
                        Atenção ao sinal na prova.
                      </p>
                      <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl font-mono text-xs">
                        Produção caiu de 50.000 para 42.000 bbl/dia:
                        <br />
                        Var% = (42.000 − 50.000) ÷ 50.000 × 100 = −16%
                        <br />
                        <span className="text-rose-400">Queda de 16%</span>
                      </div>
                      <AlertBox tipo="danger" titulo="Base Inicial: Nunca o Final">
                        A CESGRANRIO coloca como distrator a opção que usa o
                        valor FINAL como denominador. Sempre verifique: o
                        denominador é o ponto de partida, não o de chegada.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-3">



          











        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={3}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="O preço do gás natural subiu de R$ 50 para R$ 65. A variação percentual foi de:"
          alternativas={[
              { letra: "A", texto: "15%", correta: false },
              { letra: "B", texto: "23%", correta: false },
              { letra: "C", texto: "30%", correta: true },
              { letra: "D", texto: "20%", correta: false },
              { letra: "E", texto: "35%", correta: false }
            ]}
          dicaEstrategica="A alternativa (A) 15% é pegadinha: é a diferença absoluta (15 reais), não a percentual."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Variação = (Vf - Vi)/Vi × 100 = (65-50)/50 × 100 = 15/50 × 100 = 30%." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa C como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={3}
            variant="blue"
            video={{
              videoId: "h3S9XW1WzIk",
              title: "Revisão do Módulo 3",
              duration: "8:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 3",
              tituloAula: "Porcentagem",
              materia: "Matemática",
              images: [
                { title: "Conceito Principal", type: "Mapa Mental", placeholderColor: "bg-cyan-500/20" },
                { title: "Exemplos Práticos", type: "Esquema", placeholderColor: "bg-cyan-500/20" },
                { title: "Aplicações", type: "Fórmula", placeholderColor: "bg-cyan-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Dica de Ouro do Módulo 3",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                    <p className="font-bold text-cyan-600 dark:text-cyan-400">Padrão Essencial</p>
                    <p className="text-sm">Memorize a estrutura-chave deste módulo.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Rítmo do Aprendizado",
              artista: "Prof. Musical"
            }}
          />

                      <QuizInterativo
              questoes={quizM3}
              titulo="QUIZ: Variação %"
              numero={4}
              variant="blue"
              icone="🎯"
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader index={2} title="Resumo e Multimídia" variant="indigo" />
            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Variação% — Fluxo de Cálculo",
                          type: "Diagrama",
                          placeholderColor: "bg-amber-100 dark:bg-amber-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Diagrama de fluxo dark premium. Início: dois valores (Inicial e Final). Seta: subtrair. Seta: dividir pelo INICIAL (destacado em vermelho/alerta). Seta: multiplicar por 100. Resultado: Variação%. Distinção p.p. vs % relativa em caixa separada. Estilo técnico Petrobras.
                        },
                      ]}
                      moduloNome="Variação Percentual"
                      tituloAula="Porcentagem"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════
          MÓDULO 4 — APLICAÇÕES INDUSTRIAIS
      ═══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-4">
        <div className="space-y-[50px]">
          <ModuleBanner numero={4}
            titulo="Aplicações Industriais"
            descricao="Eficiência de equipamentos, misturas de substâncias e metas operacionais."
             variant="blue"/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Porcentagem no Chão de Fábrica"
              description="Como a Petrobras usa % para medir eficiência, pureza e produtividade."
              variant="blue"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação: Eficiência de Equipamentos",
                  icone: <LuFactory />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        <strong>Eficiência percentual</strong> mede quanto da
                        energia/capacidade teórica máxima é convertida em
                        trabalho útil.
                      </p>
                      <div className="p-5 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-center space-y-2">
                        <p className="font-mono text-xl font-black text-cyan-700 dark:text-cyan-400">
                          η% = (Saída Útil ÷ Entrada Total) × 100
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-2">
                        <p>
                          <strong>Exemplo:</strong> Uma turbina consome 8.000 kW
                          e entrega 6.400 kW de potência útil ao gerador.
                        </p>
                        <div className="p-3 bg-muted rounded-xl font-mono text-xs">
                          η = 6.400 ÷ 8.000 × 100 = <strong>80%</strong>
                        </div>
                        <p>
                          <strong>Exemplo 2:</strong> Um compressor com
                          eficiência de 85% e potência de entrada de 200 kW
                          entrega:{" "}
                          <code>200 × 0,85 = 170 kW</code> úteis.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação: Concentração de Misturas",
                  icone: <LuActivity />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Em refinarias e petroquímicas, o{" "}
                        <strong>teor percentual</strong> indica a concentração
                        de uma substância na mistura.
                      </p>
                      <div className="space-y-3">
                        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-sm">
                          <p className="font-bold mb-1">Problema Típico:</p>
                          <p className="text-muted-foreground">
                            Um tanque tem 4.000 L de mistura com 15% de
                            metanol. São adicionados 1.000 L de metanol puro.
                            Qual o novo teor?
                          </p>
                          <div className="p-2 bg-muted rounded-lg font-mono text-xs mt-2">
                            Metanol inicial: 4.000 × 0,15 = 600 L<br />
                            Após adição: 600 + 1.000 = 1.600 L de metanol<br />
                            Total mistura: 5.000 L<br />
                            Novo teor: 1.600 ÷ 5.000 × 100 = <strong>32%</strong>
                          </div>
                        </div>
                      </div>
                      <AlertBox tipo="info" titulo="Pulo do Gato">
                        Nunca some porcentagens de misturas diretamente. Some
                        as <strong>quantidades absolutas</strong> (litros, kg)
                        e depois calcule o novo percentual sobre o total.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas: Metas e Produtividade",
                  icone: <LuTrendingUp />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Questões de RH e Planejamento Petrobras cobram
                        percentual de alcance de metas:
                      </p>
                      <div className="p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center space-y-1">
                        <p className="font-mono text-xl font-black text-emerald-700 dark:text-emerald-400">
                          % Meta = (Realizado ÷ Meta) × 100
                        </p>
                      </div>
                      <div className="text-sm">
                        <p className="text-muted-foreground">
                          <strong>Exemplo:</strong> Meta trimestral de 450 poços
                          vistoriados. Realizados: 378.
                        </p>
                        <div className="p-3 bg-muted rounded-xl font-mono text-xs mt-2">
                          % Meta = 378 ÷ 450 × 100 = <strong>84%</strong>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Quando a Meta Não É 100%">
                        Se a meta é atingir "no mínimo 80% do planejado", e o
                        realizado foi 75%, o time <em>não atingiu</em> a meta.
                        Cuidado com questões que perguntam "quanto faltou para
                        a meta" — faltaram 5 p.p., não 5%.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-4">



          











        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={3}
          titulo="Na Prática: Como a Banca Cobra"
          variant={"blue"}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="O preço do gás natural subiu de R$ 50 para R$ 65. A variação percentual foi de:"
          alternativas={[
              { letra: "A", texto: "15%", correta: false },
              { letra: "B", texto: "23%", correta: false },
              { letra: "C", texto: "30%", correta: true },
              { letra: "D", texto: "20%", correta: false },
              { letra: "E", texto: "35%", correta: false }
            ]}
          dicaEstrategica="A alternativa (A) 15% é pegadinha: é a diferença absoluta (15 reais), não a percentual."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Variação = (Vf - Vi)/Vi × 100 = (65-50)/50 × 100 = 15/50 × 100 = 30%." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa C como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={3}
            variant="blue"
            video={{
              videoId: "h3S9XW1WzIk",
              title: "Revisão do Módulo 4",
              duration: "8:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 4",
              tituloAula: "Porcentagem",
              materia: "Matemática",
              images: [
                { title: "Conceito Principal", type: "Mapa Mental", placeholderColor: "bg-blue-500/20" },
                { title: "Exemplos Práticos", type: "Esquema", placeholderColor: "bg-blue-500/20" },
                { title: "Aplicações", type: "Fórmula", placeholderColor: "bg-blue-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Dica de Ouro do Módulo 4",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <p className="font-bold text-blue-600 dark:text-blue-400">Padrão Essencial</p>
                    <p className="text-sm">Memorize a estrutura-chave deste módulo.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Rítmo do Aprendizado",
              artista: "Prof. Musical"
            }}
          />

                      <QuizInterativo
              questoes={quizM4}
              titulo="QUIZ: Aplicações Industriais"
              numero={4}
              variant="blue"
              icone="🔥"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader index={2} title="Resumo e Multimídia" variant="indigo" />
            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Eficiência Industrial — Dashboard",
                          type: "Infográfico",
                          placeholderColor: "bg-cyan-100 dark:bg-cyan-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Dashboard técnico dark premium estilo SCADA Petrobras. Três seções: 1) Eficiência de turbina (entrada/saída, fórmula η%), 2) Tanque de mistura com teor percentual (gráfico de nível), 3) Termômetro de meta (realizado vs planejado). Cores verde/ciano/azul Petrobras.
                        },
                      ]}
                      moduloNome="Aplicações Industriais"
                      tituloAula="Porcentagem"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════
          MÓDULO 5 — SIMULADO PARCIAL
      ═══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-5">
        <div className="space-y-[50px]">
          <ModuleBanner numero={5}
            titulo="Simulado — Metade da Jornada"
            descricao="Teste integrado dos módulos 1 a 4. Mínimo 60% para avançar."
             variant="blue"/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Revisão Express"
              description="Os 4 conceitos que mais aparecem nas questões do simulado."
              variant="blue"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { n: "1", t: "p% = p÷100", d: "Converta sempre para decimal antes de calcular." },
                { n: "2", t: "Fator = 1 ± taxa/100", d: "Aumento de 15% → ×1,15. Desconto 20% → ×0,80." },
                { n: "3", t: "Var% usa base inicial", d: "(Final−Inicial)÷Inicial×100. Nunca divida pelo Final." },
                { n: "4", t: "Mistura: some absolutos", d: "Jamais some porcentagens. Some quantidades físicas, recalcule %." },
              ].map(({ n, t, d }) => (
                <div
                  key={n}
                  className="flex gap-4 p-4 bg-muted/50 rounded-xl border border-border"
                >
                  <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-600 font-black text-sm shrink-0">
                    {n}
                  </div>
                  <div>
                    <p className="font-bold text-sm font-mono">{t}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="quiz-modulo-5">



          











        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="O salário base de um técnico da Petrobras é R$ 4.000. Após reajuste de 15%, o novo salário será de:"
          alternativas={[
              { letra: "A", texto: "R$ 4.150", correta: false },
              { letra: "B", texto: "R$ 4.400", correta: false },
              { letra: "C", texto: "R$ 4.600", correta: true },
              { letra: "D", texto: "R$ 4.500", correta: false },
              { letra: "E", texto: "R$ 5.000", correta: false }
            ]}
          dicaEstrategica="A alternativa (A) R$4.150 é pegadinha para quem calculou 15% de 1.000 em vez de 4.000."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Fator multiplicador: 1 + 15/100 = 1,15." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Novo salário: 4.000 × 1,15 = R$ 4.600." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa C como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            variant="blue"
            video={{
              videoId: "h3S9XW1WzIk",
              title: "Revisão do Módulo 5",
              duration: "8:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 5",
              tituloAula: "Porcentagem",
              materia: "Matemática",
              images: [
                { title: "Conceito Principal", type: "Mapa Mental", placeholderColor: "bg-amber-500/20" },
                { title: "Exemplos Práticos", type: "Esquema", placeholderColor: "bg-amber-500/20" },
                { title: "Aplicações", type: "Fórmula", placeholderColor: "bg-amber-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Dica de Ouro do Módulo 5",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                    <p className="font-bold text-amber-600 dark:text-amber-400">Padrão Essencial</p>
                    <p className="text-sm">Memorize a estrutura-chave deste módulo.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Rítmo do Aprendizado",
              artista: "Prof. Musical"
            }}
          />

                      <QuizInterativo
              questoes={quizM5}
              titulo="QUIZ: Simulado Parcial"
              numero={3}
              variant="blue"
              icone="🏆"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════
          MÓDULO 6 — PORCENTAGEM COMPOSTA
      ═══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-6">
        <div className="space-y-[50px]">
          <ModuleBanner numero={6}
            titulo="Porcentagem Composta"
            descricao="Juros sobre juros, depreciação exponencial e a potência do tempo."
             variant="blue"/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="O Crescimento Exponencial"
              description="O que difere juros simples de compostos e por que importa nas questões Petrobras."
              variant="indigo"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação: Simples vs Composto",
                  icone: <LuWallet />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                          <p className="font-bold text-sm text-blue-700 dark:text-blue-400 mb-2">
                            Juros Simples (Linear)
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Os juros incidem <em>sempre</em> sobre o capital
                            original (C).
                          </p>
                          <div className="mt-2 p-2 bg-muted rounded font-mono text-xs">
                            M = C + C × i × t = C(1 + i·t)
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Cresce linearmente: +R$ fixo por período
                          </p>
                        </div>
                        <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                          <p className="font-bold text-sm text-indigo-700 dark:text-indigo-400 mb-2">
                            Juros Compostos (Exponencial)
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Os juros incidem sobre o saldo{" "}
                            <em>atualizado</em> (capital + juros anteriores).
                          </p>
                          <div className="mt-2 p-2 bg-muted rounded font-mono text-xs">
                            M = C × (1 + i)ⁿ
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Cresce exponencialmente: cada período é maior
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <strong>Exemplo Petrobras:</strong> Investimento de R$
                        100.000 a 5% a.a. por 3 anos.
                        <br />
                        Simples: 100.000 × (1 + 0,05 × 3) = R$ 115.000
                        <br />
                        Composto: 100.000 × (1,05)³ = R$ 115.762,50
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação: Depreciação de Equipamentos",
                  icone: <LuTrendingDown />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Equipamentos industriais depreciam pelo modelo de{" "}
                        <strong>juros compostos negativos</strong> — a perda de
                        valor incide sobre o valor venal do ano anterior.
                      </p>
                      <div className="p-5 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-center space-y-1">
                        <p className="font-mono text-xl font-black text-rose-700 dark:text-rose-400">
                          V(t) = V₀ × (1 − d)ⁿ
                        </p>
                        <p className="text-xs text-muted-foreground">
                          d = taxa de depreciação anual | n = anos
                        </p>
                      </div>
                      <div className="p-3 bg-muted rounded-xl text-xs font-mono">
                        Bomba centrífuga: V₀ = R$ 240.000, d = 10% a.a., n = 3 anos
                        <br />
                        V(3) = 240.000 × (0,90)³ = 240.000 × 0,729 ={" "}
                        <strong>R$ 174.960</strong>
                      </div>
                      <AlertBox tipo="warning" titulo="A Armadilha da Depreciação Linear">
                        Muitos candidatos calculam: 240.000 × 0,10 × 3 = 72.000
                        e respondem R$ 168.000. ERRADO. Depreciação contábil
                        real é composta — use potência.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas: Taxa Equivalente e Proporcional",
                  icone: <LuZap />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                          <p className="font-bold text-sm">Taxa Proporcional (Simples)</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Divide/multiplica diretamente.
                            <br />
                            12% a.a. → 1% a.m. (÷12)
                          </p>
                        </div>
                        <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                          <p className="font-bold text-sm">Taxa Equivalente (Composta)</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Usa raiz/potência.
                            <br />
                            12% a.a. → (1,12)^(1/12) − 1 ≈ 0,949% a.m.
                          </p>
                        </div>
                      </div>
                      <AlertBox tipo="info" titulo="Na Prova">
                        A CESGRANRIO pede "taxa equivalente mensal" de uma taxa
                        anual. Use sempre a raiz 12ª do fator anual. Taxa
                        proporcional aparece apenas em juros simples.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções: Quando a Taxa Composta Vai Para Negativo",
                  icone: <LuTriangleAlert />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Cuidado com interpretações de{" "}
                        <strong>inflação composta</strong> — o poder de compra
                        caindo compostura:
                      </p>
                      <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs font-mono">
                        Inflação de 8% a.a. por 2 anos:
                        <br />
                        Perda real = 1 − 1/(1,08²) = 1 − 0,857 = 14,3% (não 16%)
                      </div>
                      <AlertBox tipo="danger" titulo="Deflator vs Taxa Nominal">
                        Em questões de salário real, o poder de compra é
                        deflacionado pela inflação composta, não simples. A
                        CESGRANRIO coloca 16% como distrator — use a fórmula.
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
              title="Visualização: Juros Simples"
              description="Observe o crescimento linear do montante ao longo do tempo para diferentes taxas."
              variant="indigo"
            />
            <FunctionGraph
              title="Juros Simples: M(t) = C·(1 + i·t)"
              functions={[
                {
                  id: "js-5",
                  label: "i=5%, C=1000",
                  color: "#3b82f6",
                  fn: (x: number) => 1000 * (1 + 0.05 * x),
                  strokeWidth: 2,
                },
                {
                  id: "js-10",
                  label: "i=10%, C=1000",
                  color: "#ef4444",
                  fn: (x: number) => 1000 * (1 + 0.10 * x),
                  strokeWidth: 2,
                },
                {
                  id: "js-15",
                  label: "i=15%, C=1000",
                  color: "#10b981",
                  fn: (x: number) => 1000 * (1 + 0.15 * x),
                  strokeWidth: 2,
                },
              ] satisfies FunctionPlot[]}
              xMin={0}
              xMax={20}
              yMin={0}
              yMax={5000}
              points={100}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={3}
              title="Visualização: Juros Compostos"
              description="Observe o crescimento exponencial do montante ao longo do tempo para diferentes taxas."
              variant="indigo"
            />
            <FunctionGraph
              title="Juros Compostos: M(t) = C·(1 + i)^t"
              functions={[
                {
                  id: "jc-5",
                  label: "i=5%, C=1000",
                  color: "#3b82f6",
                  fn: (x: number) => 1000 * Math.pow(1.05, x),
                  strokeWidth: 2,
                },
                {
                  id: "jc-10",
                  label: "i=10%, C=1000",
                  color: "#ef4444",
                  fn: (x: number) => 1000 * Math.pow(1.10, x),
                  strokeWidth: 2,
                },
                {
                  id: "jc-15",
                  label: "i=15%, C=1000",
                  color: "#10b981",
                  fn: (x: number) => 1000 * Math.pow(1.15, x),
                  strokeWidth: 2,
                },
              ] satisfies FunctionPlot[]}
              xMin={0}
              xMax={20}
              yMin={0}
              yMax={20000}
              points={100}
            />
          </section>

          <section id="quiz-modulo-6">



          











        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={5}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Um investimento rendeu 5% no primeiro mês e 8% no segundo mês (sobre o montante atualizado). Se o capital inicial era R$ 10.000, o montante ao final dos dois meses é:"
          alternativas={[
              { letra: "A", texto: "R$ 11.300", correta: false },
              { letra: "B", texto: "R$ 11.340", correta: true },
              { letra: "C", texto: "R$ 11.400", correta: false },
              { letra: "D", texto: "R$ 11.500", correta: false },
              { letra: "E", texto: "R$ 11.200", correta: false }
            ]}
          dicaEstrategica="Note como 5+8=13% mas o rendimento real é 13,4% — esse é o efeito dos juros compostos."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Mês 1: 10.000 × 1,05 = 10.500." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Mês 2: 10.500 × 1,08 = 11.340." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Fator único: 1,05 × 1,08 = 1,134." }
          ]}
        />

        <ModuleConsolidation
            index={5}
            variant="blue"
            video={{
              videoId: "h3S9XW1WzIk",
              title: "Revisão do Módulo 6",
              duration: "8:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 6",
              tituloAula: "Porcentagem",
              materia: "Matemática",
              images: [
                { title: "Conceito Principal", type: "Mapa Mental", placeholderColor: "bg-rose-500/20" },
                { title: "Exemplos Práticos", type: "Esquema", placeholderColor: "bg-rose-500/20" },
                { title: "Aplicações", type: "Fórmula", placeholderColor: "bg-rose-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Dica de Ouro do Módulo 6",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                    <p className="font-bold text-rose-600 dark:text-rose-400">Padrão Essencial</p>
                    <p className="text-sm">Memorize a estrutura-chave deste módulo.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Rítmo do Aprendizado",
              artista: "Prof. Musical"
            }}
          />

                      <QuizInterativo
              questoes={quizM6}
              titulo="QUIZ: % Composta"
              numero={6}
              variant="indigo"
              icone="🎯"
              onComplete={(score) => handleModuleComplete("modulo-6", score)}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader index={4} title="Resumo e Multimídia" variant="indigo" />
            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Simples vs Composto — Curvas de Crescimento",
                          type: "Gráfico",
                          placeholderColor: "bg-indigo-100 dark:bg-indigo-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Gráfico de linha dark premium comparando crescimento linear (Juros Simples, linha reta azul) vs exponencial (Juros Compostos, curva ciano). Eixo X: anos (0-10). Eixo Y: valor acumulado. Anotações nos pontos críticos onde as curvas divergem. Fórmulas sobrepostas. Estilo técnico Petrobras.
                        },
                        {
                          title: "Tabela de Depreciação Industrial",
                          type: "Infográfico",
                          placeholderColor: "bg-rose-100 dark:bg-rose-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Tabela dark premium de depreciação de equipamento industrial (bomba centrífuga Petrobras). Colunas: Ano | Valor Inicial | Depreciação (10%) | Valor Final. 5 anos. Valores em vermelho decrescente. Fórmula V=V₀×(0,9)ⁿ destacada. Logotipo estilo Petrobras.
                        },
                      ]}
                      moduloNome="Porcentagem Composta"
                      tituloAula="Porcentagem"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════
          MÓDULO 7 — CÁLCULO REVERSO
      ═══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-7">
        <div className="space-y-[50px]">
          <ModuleBanner numero={7}
            titulo="O Cálculo Reverso"
            descricao="Encontrar o valor original quando se conhece o resultado e a taxa aplicada."
             variant="blue"/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Desfazendo a Manipulação"
              description="A lógica de dividir pelo fator — não subtrair a taxa do resultado."
              variant="blue"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação: Por Que Dividir, Não Subtrair",
                  icone: <LuRotateCcw />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Dado o valor <em>após</em> uma taxa e a própria taxa,
                        para encontrar o valor original:
                      </p>
                      <div className="p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center space-y-2">
                        <p className="font-mono text-xl font-black text-emerald-700 dark:text-emerald-400">
                          V_Original = V_Final ÷ Fator
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Fator = 1 + taxa/100 (aumento) ou 1 − taxa/100 (desconto)
                        </p>
                      </div>
                      <AlertBox tipo="danger" titulo="O Erro Mais Comum da CESGRANRIO">
                        Um produto custa R$ 120 HOJE após aumento de 20%.
                        Candidato errado: <code>120 − 20% = 120 − 24 = 96</code>.{" "}
                        <strong>ERRADO.</strong>
                        <br />
                        <br />
                        O correto: a base de 20% foi o preço original (=100%).
                        <code>120 ÷ 1,20 = R$ 100</code>.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação: Casos Reais",
                  icone: <LuArrowRight />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-sm">
                          <p className="font-bold mb-1">Caso 1 — Salário Antes do Reajuste</p>
                          <p className="text-muted-foreground">
                            Um técnico ganha hoje R$ 6.050 após reajuste de
                            10%. Qual era o salário anterior?
                          </p>
                          <div className="p-2 bg-muted rounded font-mono text-xs mt-2">
                            V_orig = 6.050 ÷ 1,10 = <strong>R$ 5.500</strong>
                          </div>
                        </div>
                        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-sm">
                          <p className="font-bold mb-1">Caso 2 — Preço Antes do Desconto</p>
                          <p className="text-muted-foreground">
                            Um equipamento foi adquirido por R$ 170.000 com
                            desconto de 15%. Qual era o preço original?
                          </p>
                          <div className="p-2 bg-muted rounded font-mono text-xs mt-2">
                            V_orig = 170.000 ÷ 0,85 = <strong>R$ 200.000</strong>
                          </div>
                        </div>
                        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-sm">
                          <p className="font-bold mb-1">Caso 3 — Dois Descontos Sucessivos</p>
                          <p className="text-muted-foreground">
                            Peça adquirida por R$ 76,50 após descontos de 10%
                            e 15%. Preço original?
                          </p>
                          <div className="p-2 bg-muted rounded font-mono text-xs mt-2">
                            Fator total: 0,90 × 0,85 = 0,765
                            <br />
                            V_orig = 76,50 ÷ 0,765 = <strong>R$ 100,00</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas: Identificar a Direção do Cálculo",
                  icone: <LuZap />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Leia o enunciado com atenção para saber se é cálculo
                        direto (dado original, quer final) ou reverso (dado
                        final, quer original):
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                          <LuArrowRight className="text-blue-500 shrink-0" />
                          <p className="text-sm">
                            <strong>Direto:</strong> "Qual é o preço após 15% de aumento?" → ×1,15
                          </p>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                          <LuRotateCcw className="text-emerald-500 shrink-0" />
                          <p className="text-sm">
                            <strong>Reverso:</strong> "O preço depois do aumento de 15% é X. Qual era o original?" → ÷1,15
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          {/* FlipCards cálculo reverso */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Treino Mental — Reverso"
              description="Calcule o valor original rapidamente."
              variant="blue"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                    <LuRotateCcw className="w-10 h-10 text-primary opacity-50" />
                    <h6 className="text-lg font-bold uppercase tracking-tight">R$ 132 após +10%</h6>
                    <p className="text-sm text-muted-foreground">Qual era o original?</p>
                  </div>
                }
                verso={
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <LuCircleCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                      <p className="text-sm font-bold text-emerald-400">R$ 120,00</p>
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-100">
                      Fator de aumento: 1,10. Original: 132 ÷ 1,10 = R$ 120.
                      Verificação: 120 × 1,10 = 132 ✓
                    </p>
                    <div className="p-2 bg-primary/10 rounded-xl border border-primary/20 text-xs text-primary">
                      Dica: Divida pelo fator, nunca subtraia a taxa do resultado.
                    </div>
                  </div>
                }
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                    <LuRotateCcw className="w-10 h-10 text-primary opacity-50" />
                    <h6 className="text-lg font-bold uppercase tracking-tight">R$ 340 após −15%</h6>
                    <p className="text-sm text-muted-foreground">Qual era o original?</p>
                  </div>
                }
                verso={
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <LuCircleCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                      <p className="text-sm font-bold text-emerald-400">R$ 400,00</p>
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-100">
                      Fator de desconto: 0,85. Original: 340 ÷ 0,85 = R$ 400.
                      Verificação: 400 × 0,85 = 340 ✓
                    </p>
                    <div className="p-2 bg-primary/10 rounded-xl border border-primary/20 text-xs text-primary">
                      Armadilha: 340 + 15% = 391 é ERRADO. Use sempre a divisão.
                    </div>
                  </div>
                }
              />
            </div>
          </section>

          <section id="quiz-modulo-7">



          











        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={4}
          titulo="Na Prática: Como a Banca Cobra"
          variant={"indigo"}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Em uma prova da CESGRANRIO com 60 questões, a nota mínima para aprovação é 50%. O candidato precisa acertar, no mínimo:"
          alternativas={[
              { letra: "A", texto: "25 questões", correta: false },
              { letra: "B", texto: "28 questões", correta: false },
              { letra: "C", texto: "30 questões", correta: true },
              { letra: "D", texto: "32 questões", correta: false },
              { letra: "E", texto: "35 questões", correta: false }
            ]}
          dicaEstrategica="Tipo de questão muito comum: transformar percentual em valor absoluto."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "50% de 60 = 0,50 × 60 = 30 questões." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa C como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={4}
            variant="indigo"
            video={{
              videoId: "h3S9XW1WzIk",
              title: "Revisão do Módulo 7",
              duration: "8:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 7",
              tituloAula: "Porcentagem",
              materia: "Matemática",
              images: [
                { title: "Conceito Principal", type: "Mapa Mental", placeholderColor: "bg-indigo-500/20" },
                { title: "Exemplos Práticos", type: "Esquema", placeholderColor: "bg-indigo-500/20" },
                { title: "Aplicações", type: "Fórmula", placeholderColor: "bg-indigo-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Dica de Ouro do Módulo 7",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                    <p className="font-bold text-indigo-600 dark:text-indigo-400">Padrão Essencial</p>
                    <p className="text-sm">Memorize a estrutura-chave deste módulo.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Rítmo do Aprendizado",
              artista: "Prof. Musical"
            }}
          />

                      <QuizInterativo
              questoes={quizM7}
              titulo="QUIZ: Cálculo Reverso"
              numero={5}
              variant="blue"
              icone="🎯"
              onComplete={(score) => handleModuleComplete("modulo-7", score)}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader index={3} title="Resumo e Multimídia" variant="indigo" />
            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Cálculo Reverso — Diagrama de Decisão",
                          type: "Diagrama",
                          placeholderColor: "bg-emerald-100 dark:bg-emerald-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Diagrama de decisão dark premium. Pergunta central: "Sei o resultado ou o original?". Ramo esquerdo (sei o original): multiplica pelo fator. Ramo direito (sei o resultado): divide pelo fator. Exemplos numéricos em cada ramo com checklist verde. Destaque vermelho no erro clássico "subtrair taxa". Estilo técnico Petrobras.
                        },
                      ]}
                      moduloNome="Cálculo Reverso"
                      tituloAula="Porcentagem"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════
          MÓDULO 8 — REGRA DE TRÊS COM PORCENTAGEM
      ═══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-8">
        <div className="space-y-[50px]">
          <ModuleBanner numero={8}
            titulo="Regra de Três e Porcentagem"
            descricao="Quando o fator multiplicador não basta: alinhamento de grandezas proporcionais."
             variant="blue"/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Regra de Três: Quando Usar"
              description="Nem toda questão de porcentagem se resolve com fator. Saiba identificar."
              variant="blue"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação: Parte/Todo com Incógnita Diferente",
                  icone: <LuCalculator />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Use regra de três quando a incógnita <em>não</em> é
                        diretamente o valor após aplicar a taxa. Há três
                        configurações:
                      </p>
                      <div className="space-y-2">
                        {[
                          { q: "Tipo 1: Qual é X% de Y?", r: "Y × X/100 (fator direto)" },
                          { q: "Tipo 2: X é Y% de quanto?", r: "X ÷ (Y/100) = X × 100/Y" },
                          { q: "Tipo 3: X é que % de Y?", r: "(X ÷ Y) × 100" },
                        ].map(({ q, r }) => (
                          <div key={q} className="p-3 bg-muted rounded-xl text-sm">
                            <p className="font-bold">{q}</p>
                            <p className="text-muted-foreground text-xs mt-0.5 font-mono">{r}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação: Os Três Tipos em Contexto Petrobras",
                  icone: <LuFactory />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-sm">
                          <p className="font-bold mb-1">Tipo 1 — Calcular a parte</p>
                          <p className="text-muted-foreground">
                            "18% dos 2.400 funcionários são engenheiros. Quantos são?"
                          </p>
                          <p className="font-mono text-xs mt-1">2.400 × 0,18 = <strong>432 engenheiros</strong></p>
                        </div>
                        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-sm">
                          <p className="font-bold mb-1">Tipo 2 — Calcular o todo</p>
                          <p className="text-muted-foreground">
                            "432 engenheiros representam 18% do quadro. Qual é o total?"
                          </p>
                          <p className="font-mono text-xs mt-1">432 ÷ 0,18 = <strong>2.400 funcionários</strong></p>
                        </div>
                        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-sm">
                          <p className="font-bold mb-1">Tipo 3 — Calcular a taxa</p>
                          <p className="text-muted-foreground">
                            "432 de 2.400 são engenheiros. Qual o percentual?"
                          </p>
                          <p className="font-mono text-xs mt-1">(432 ÷ 2.400) × 100 = <strong>18%</strong></p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas: Dois Critérios Simultâneos",
                  icone: <LuZap />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Questões avançadas CESGRANRIO combinam dois critérios:
                      </p>
                      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-sm">
                        <p className="font-bold mb-2">Exemplo Composto:</p>
                        <p className="text-muted-foreground">
                          "30% dos técnicos são especializados em caldeiras e
                          40% desses são supervisores. Quantos supervisores
                          de caldeiras há em um grupo de 500 técnicos?"
                        </p>
                        <div className="p-2 bg-muted rounded font-mono text-xs mt-2">
                          Técnicos caldeiras: 500 × 0,30 = 150
                          <br />
                          Supervisores: 150 × 0,40 = <strong>60</strong>
                          <br />
                          Atalho: 500 × 0,30 × 0,40 = 500 × 0,12 = 60
                        </div>
                      </div>
                      <AlertBox tipo="info" titulo="Percentual de Percentual">
                        "40% de 30%" = 12% do total. Multiplique os fatores
                        (0,40 × 0,30 = 0,12). Nunca some as taxas aqui.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-8">



          











        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={3}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="O preço do gás natural subiu de R$ 50 para R$ 65. A variação percentual foi de:"
          alternativas={[
              { letra: "A", texto: "15%", correta: false },
              { letra: "B", texto: "23%", correta: false },
              { letra: "C", texto: "30%", correta: true },
              { letra: "D", texto: "20%", correta: false },
              { letra: "E", texto: "35%", correta: false }
            ]}
          dicaEstrategica="A alternativa (A) 15% é pegadinha: é a diferença absoluta (15 reais), não a percentual."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Variação = (Vf - Vi)/Vi × 100 = (65-50)/50 × 100 = 15/50 × 100 = 30%." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa C como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={3}
            variant="blue"
            video={{
              videoId: "h3S9XW1WzIk",
              title: "Revisão do Módulo 8",
              duration: "8:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 8",
              tituloAula: "Porcentagem",
              materia: "Matemática",
              images: [
                { title: "Conceito Principal", type: "Mapa Mental", placeholderColor: "bg-emerald-500/20" },
                { title: "Exemplos Práticos", type: "Esquema", placeholderColor: "bg-emerald-500/20" },
                { title: "Aplicações", type: "Fórmula", placeholderColor: "bg-emerald-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Dica de Ouro do Módulo 8",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <p className="font-bold text-emerald-600 dark:text-emerald-400">Padrão Essencial</p>
                    <p className="text-sm">Memorize a estrutura-chave deste módulo.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Rítmo do Aprendizado",
              artista: "Prof. Musical"
            }}
          />

                      <QuizInterativo
              questoes={quizM8}
              titulo="QUIZ: Regra de Três %"
              numero={4}
              variant="blue"
              icone="🔥"
              onComplete={(score) => handleModuleComplete("modulo-8", score)}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader index={2} title="Resumo e Multimídia" variant="indigo" />
            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Triângulo da Porcentagem",
                          type: "Infográfico",
                          placeholderColor: "bg-amber-100 dark:bg-amber-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Infográfico dark premium mostrando o "Triângulo da Porcentagem" (similar ao triângulo MCI de física). Três vértices: PARTE (p), TAXA (%), TOTAL (T). Fórmulas em cada divisão: P=T×%/100, T=P÷%, %=P/T×100. Fundo dark, cores âmbar e dourado, estilo Petrobras premium.
                        },
                      ]}
                      moduloNome="Regra de Três e Porcentagem"
                      tituloAula="Porcentagem"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════
          MÓDULO 9 — FINANCEIRO
      ═══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-9">
        <div className="space-y-[50px]">
          <ModuleBanner numero={9}
            titulo="Aplicações Financeiras"
            descricao="Salários, impostos, CDI, INSS e descontos embutidos do mundo real."
             variant="blue"/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Porcentagem no Mercado Financeiro"
              description="Os indicadores econômicos que aparecem nas questões de raciocínio quantitativo."
              variant="blue"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação: Salários e Descontos Trabalhistas",
                  icone: <LuDollarSign />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Em questões de folha de pagamento, há descontos
                        sucessivos sobre o salário bruto: INSS, depois IRRF
                        sobre o resultado.
                      </p>
                      <div className="p-4 bg-teal-500/10 border border-teal-500/20 rounded-xl text-sm">
                        <p className="font-bold mb-2">Exemplo Típico:</p>
                        <p className="text-muted-foreground">
                          Salário bruto R$ 5.000. INSS: 9%. IRRF: 15% sobre o
                          resultado. Qual o salário líquido?
                        </p>
                        <div className="p-2 bg-muted rounded font-mono text-xs mt-2">
                          Após INSS: 5.000 × 0,91 = R$ 4.550
                          <br />
                          Após IRRF: 4.550 × 0,85 = <strong>R$ 3.867,50</strong>
                          <br />
                          Fator único: 5.000 × 0,91 × 0,85 = 3.867,50
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Ordem dos Descontos">
                        INSS incide sobre o bruto. IRRF incide sobre o bruto
                        menos INSS. A base de cálculo muda — por isso são
                        fatores sucessivos, não uma soma de taxas.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação: Markup vs Margem",
                  icone: <LuTrendingUp />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Em gestão de contratos Petrobras, a distinção entre
                        markup e margem é crítica:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                          <p className="font-bold text-sm">Markup (sobre custo)</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Lucro calculado sobre o <em>custo</em>.
                            <br />
                            Custo R$80, markup 25% →<br />
                            Preço = 80 × 1,25 = R$ 100
                            <br />
                            Lucro: R$20 (= 25% do custo)
                          </p>
                        </div>
                        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                          <p className="font-bold text-sm">Margem (sobre preço)</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Lucro calculado sobre o <em>preço de venda</em>.
                            <br />
                            Preço R$100, margem 20% →<br />
                            Lucro: 20% de 100 = R$20
                            <br />
                            Custo: R$80
                          </p>
                        </div>
                      </div>
                      <AlertBox tipo="danger" titulo="Pegadinha de Markup vs Margem">
                        "Margem de 25%" e "markup de 25%" geram preços
                        diferentes! Margem 25% sobre preço R$100: lucro = R$25,
                        custo = R$75. Markup 25% sobre custo R$75: preço =
                        R$93,75. A CESGRANRIO confunde os dois deliberadamente.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas: CDI, SELIC e Rendimento Real",
                  icone: <LuActivity />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Questões de matemática financeira Petrobras cobram o
                        rendimento real descontada a inflação:
                      </p>
                      <div className="p-5 bg-teal-500/10 border border-teal-500/20 rounded-2xl text-center space-y-2">
                        <p className="font-mono text-lg font-black text-teal-700 dark:text-teal-400">
                          (1 + r_real) = (1 + r_nominal) ÷ (1 + inflação)
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Fórmula de Fischer — nunca subtraia inflação da taxa nominal diretamente
                        </p>
                      </div>
                      <div className="p-3 bg-muted rounded-xl font-mono text-xs">
                        CDI: 12,5% a.a. | Inflação: 5% a.a.
                        <br />
                        r_real = (1,125 ÷ 1,05) − 1 ≈ 0,0714 = <strong>7,14%</strong>
                        <br />
                        (Não 7,5% como a subtração direta sugere)
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções: Desconto Embutido no Preço",
                  icone: <LuTriangleAlert />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Em questões de licitação, fornecedores apresentam preços
                        "com desconto já embutido". Cuidado:
                      </p>
                      <AlertBox tipo="danger" titulo="O Preço 'cheio' não é base correta">
                        Se um fornecedor diz "preço com 10% de desconto: R$
                        900", o preço tabela é 900 ÷ 0,90 = R$ 1.000. Se ele
                        diz "desconto de 10% sobre R$ 1.000", confira se o
                        desconto foi aplicado corretamente: 1.000 × 0,90 = 900.
                        Ambos batem, mas a base de negociação importa em
                        situações de renegociação contratual.
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
              title="Visualização: Juros Simples vs. Compostos"
              description="Compare o crescimento linear e exponencial com a mesma taxa de 10% ao período."
              variant="blue"
            />
            <FunctionGraph
              title="Comparação: Juros Simples vs. Compostos"
              functions={[
                {
                  id: "cmp-simples",
                  label: "Simples i=10%",
                  color: "#3b82f6",
                  fn: (x: number) => 1000 * (1 + 0.10 * x),
                  strokeWidth: 2,
                },
                {
                  id: "cmp-compostos",
                  label: "Compostos i=10%",
                  color: "#ef4444",
                  fn: (x: number) => 1000 * Math.pow(1.10, x),
                  strokeWidth: 2,
                },
              ] satisfies FunctionPlot[]}
              xMin={0}
              xMax={20}
              yMin={0}
              yMax={7000}
              points={100}
            />
          </section>

          <section id="quiz-modulo-9">



          











        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={4}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Em uma prova da CESGRANRIO com 60 questões, a nota mínima para aprovação é 50%. O candidato precisa acertar, no mínimo:"
          alternativas={[
              { letra: "A", texto: "25 questões", correta: false },
              { letra: "B", texto: "28 questões", correta: false },
              { letra: "C", texto: "30 questões", correta: true },
              { letra: "D", texto: "32 questões", correta: false },
              { letra: "E", texto: "35 questões", correta: false }
            ]}
          dicaEstrategica="Tipo de questão muito comum: transformar percentual em valor absoluto."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "50% de 60 = 0,50 × 60 = 30 questões." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa C como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={4}
            variant="blue"
            video={{
              videoId: "h3S9XW1WzIk",
              title: "Revisão do Módulo 9",
              duration: "8:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 9",
              tituloAula: "Porcentagem",
              materia: "Matemática",
              images: [
                { title: "Conceito Principal", type: "Mapa Mental", placeholderColor: "bg-cyan-500/20" },
                { title: "Exemplos Práticos", type: "Esquema", placeholderColor: "bg-cyan-500/20" },
                { title: "Aplicações", type: "Fórmula", placeholderColor: "bg-cyan-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Dica de Ouro do Módulo 9",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                    <p className="font-bold text-cyan-600 dark:text-cyan-400">Padrão Essencial</p>
                    <p className="text-sm">Memorize a estrutura-chave deste módulo.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Rítmo do Aprendizado",
              artista: "Prof. Musical"
            }}
          />

                      <QuizInterativo
              questoes={quizM9}
              titulo="QUIZ: Financeiro"
              numero={5}
              variant="blue"
              icone="🔥"
              onComplete={(score) => handleModuleComplete("modulo-9", score)}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader index={3} title="Resumo e Multimídia" variant="indigo" />
            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Descontos Trabalhistas — Cascata",
                          type: "Infográfico",
                          placeholderColor: "bg-teal-100 dark:bg-teal-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Infográfico dark premium de cascata de descontos salariais. Blocos empilhados: Salário Bruto (R$5.000, topo), seta para baixo com INSS 9% (−R$450), Resultado após INSS (R$4.550), seta para baixo com IRRF 15% (−R$682,50), Salário Líquido (R$3.867,50, base em verde). Cores Petrobras verde/ciano, tipografia bold.
                        },
                        {
                          title: "Markup vs Margem — Comparativo",
                          type: "Diagrama",
                          placeholderColor: "bg-green-100 dark:bg-green-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Diagrama comparativo dark premium. Dois lados: Markup (base no custo, seta crescente para preço) vs Margem (base no preço, seta decrescente para custo). Valores numéricos iguais para evidenciar diferença. Caixa de alerta destacando a confusão clássica. Cores verde/âmbar Petrobras.
                        },
                      ]}
                      moduloNome="Aplicações Financeiras"
                      tituloAula="Porcentagem"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════
          MÓDULO 10 — SIMULADO FINAL
      ═══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-10">
        <div className="space-y-[50px]">
          <ModuleBanner numero={10}
            titulo="Simulado Mestre — Porcentagem"
            descricao="Todas as competências postas à prova. Nível CESGRANRIO real."
             variant="blue"/>

          {/* Revisão rápida final */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Dossiê de Elite — Revisão Final"
              description="Os 10 gatilhos mentais que separam os aprovados dos eliminados."
              variant="indigo"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { n: "1", t: "p% = p÷100", d: "Sempre converta para decimal." },
                { n: "2", t: "Fator = 1 ± taxa", d: "+15% → ×1,15 | −20% → ×0,80" },
                { n: "3", t: "Sucessivos = produto", d: "+10% e −10% ≠ zero. É ×0,99 = −1%." },
                { n: "4", t: "Variação% usa base inicial", d: "Denominator = V_inicial. Sempre." },
                { n: "5", t: "p.p. ≠ %", d: "3p.p. é diferente de crescimento de 3%." },
                { n: "6", t: "Misturas: some absolutos", d: "Nunca some porcentagens de misturas." },
                { n: "7", t: "Reverso = ÷ fator", d: "Nunca subtraia a taxa do resultado." },
                { n: "8", t: "Depreciação é composta", d: "V₀ × (1−d)ⁿ, não V₀ × d × n." },
                { n: "9", t: "Taxa equivalente ≠ proporcional", d: "Compostos usam raiz, não divisão." },
                { n: "10", t: "Margem sobre preço, markup sobre custo", d: "Mesmas taxas, bases diferentes." },
              ].map(({ n, t, d }) => (
                <div
                  key={n}
                  className="flex gap-3 p-3 bg-muted/50 rounded-xl border border-border"
                >
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black text-xs shrink-0">
                    {n}
                  </div>
                  <div>
                    <p className="font-bold text-xs font-mono">{t}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="quiz-modulo-10">



          











        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={3}
          titulo="Na Prática: Como a Banca Cobra"
          variant={"blue"}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="O preço do gás natural subiu de R$ 50 para R$ 65. A variação percentual foi de:"
          alternativas={[
              { letra: "A", texto: "15%", correta: false },
              { letra: "B", texto: "23%", correta: false },
              { letra: "C", texto: "30%", correta: true },
              { letra: "D", texto: "20%", correta: false },
              { letra: "E", texto: "35%", correta: false }
            ]}
          dicaEstrategica="A alternativa (A) 15% é pegadinha: é a diferença absoluta (15 reais), não a percentual."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Variação = (Vf - Vi)/Vi × 100 = (65-50)/50 × 100 = 15/50 × 100 = 30%." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa C como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={3}
            variant="blue"
            video={{
              videoId: "h3S9XW1WzIk",
              title: "Revisão do Módulo 10",
              duration: "8:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 10",
              tituloAula: "Porcentagem",
              materia: "Matemática",
              images: [
                { title: "Conceito Principal", type: "Mapa Mental", placeholderColor: "bg-blue-500/20" },
                { title: "Exemplos Práticos", type: "Esquema", placeholderColor: "bg-blue-500/20" },
                { title: "Aplicações", type: "Fórmula", placeholderColor: "bg-blue-500/20" }
              ]
            }}
            maceteVisual={{
              title: "Dica de Ouro do Módulo 10",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <p className="font-bold text-blue-600 dark:text-blue-400">Padrão Essencial</p>
                    <p className="text-sm">Memorize a estrutura-chave deste módulo.</p>
                  </div>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Rítmo do Aprendizado",
              artista: "Prof. Musical"
            }}
          />

                      <QuizInterativo
              questoes={quizM10}
              titulo="QUIZ: Simulado Final"
              icone="🏆"
              numero={4}
              variant="blue"
              onComplete={(score) => handleModuleComplete("modulo-10", score)}
            />
          </section>

          {completedModules.has("modulo-10") && (
            <div className="flex flex-col items-center gap-6 py-12">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center animate-bounce">
                <LuTrophy className="w-12 h-12 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black text-center">
                Mestre da Porcentagem
              </h3>
              <p className="text-center text-muted-foreground max-w-sm">
                Você dominou o tópico mais cobrado nas provas Petrobras/Transpetro.
                Fundamentos, fatores, variação, reverso, composta e financeiro —
                todos desbloqueados.
              </p>
            </div>
          )}

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-4">
            <ModuleSectionHeader index={2} title="Resumo e Multimídia" variant="indigo" />
            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Mapa Completo — Porcentagem",
                          type: "Mapa Mental",
                          placeholderColor: "bg-slate-100 dark:bg-slate-900/50",
                          imageUrl: "/temp-img.png", // PROMPT: Mapa mental dark premium completo sobre Porcentagem. Nó central "%" com 8 ramos: Fundamentos, Fator Multiplicador, Variação%, Misturas, Composta (M=C(1+i)ⁿ), Reverso (÷fator), Regra de 3, Financeiro. Cada ramo com fórmula-chave e cor diferente (emerald, blue, amber, cyan, indigo, rose, teal, slate). Estilo dossiê Petrobras premium.
                        },
                      ]}
                      moduloNome="Simulado Final"
                      tituloAula="Porcentagem"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
