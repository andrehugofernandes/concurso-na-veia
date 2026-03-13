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
  LessonTabs,
  FlipCard,
  ModuleSummaryCarouselNew,
} from "../shared";
import { 
  LuHash, 
  LuBox, 
  LuShuffle, 
  LuRepeat, 
  LuLayers, 
  LuUsers, 
  LuAward, 
  LuBookOpen, 
  LuTarget, 
  LuLightbulb 
} from "react-icons/lu";
import {
  QUIZ_M1_PRINCIPIO_CONTAGEM,
  QUIZ_M2_FATORIAL,
  QUIZ_M3_PERMUTACAO_SIMPLES,
  QUIZ_M4_PERMUTACAO_REPETICAO,
  QUIZ_M5_ARRANJO_SIMPLES,
  QUIZ_M6_COMBINACAO_SIMPLES,
  QUIZ_M7_COMBINACAO_REPETICAO,
  QUIZ_M8_PROPRIEDADES,
  QUIZ_M9_APLICACOES_PETROBRAS,
  QUIZ_M10_SIMULADO_CESGRANRIO,
} from "./data/analise-combinatoria-quizzes";

export default function AulaAnaliseCombinatoria({
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

  const [quizM1] = useState(() => getRandomQuestions(QUIZ_M1_PRINCIPIO_CONTAGEM, 6));
  const [quizM2] = useState(() => getRandomQuestions(QUIZ_M2_FATORIAL, 6));
  const [quizM3] = useState(() => getRandomQuestions(QUIZ_M3_PERMUTACAO_SIMPLES, 6));
  const [quizM4] = useState(() => getRandomQuestions(QUIZ_M4_PERMUTACAO_REPETICAO, 6));
  const [quizM5] = useState(() => getRandomQuestions(QUIZ_M5_ARRANJO_SIMPLES, 6));
  const [quizM6] = useState(() => getRandomQuestions(QUIZ_M6_COMBINACAO_SIMPLES, 6));
  const [quizM7] = useState(() => getRandomQuestions(QUIZ_M7_COMBINACAO_REPETICAO, 6));
  const [quizM8] = useState(() => getRandomQuestions(QUIZ_M8_PROPRIEDADES, 6));
  const [quizM9] = useState(() => getRandomQuestions(QUIZ_M9_APLICACOES_PETROBRAS, 6));
  const [quizM10] = useState(() => getRandomQuestions(QUIZ_M10_SIMULADO_CESGRANRIO, 6));

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
    { id: "modulo-1", label: "Módulo 1", titulo: "Princípio da Contagem" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Fatorial" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Permutação Simples" },
    { id: "modulo-4", label: "Módulo 4", titulo: "Permutação com Repetição" },
    { id: "modulo-5", label: "Módulo 5", titulo: "Arranjo Simples" },
    { id: "modulo-6", label: "Módulo 6", titulo: "Combinação Simples" },
    { id: "modulo-7", label: "Módulo 7", titulo: "Combinação com Repetição" },
    { id: "modulo-8", label: "Módulo 8", titulo: "Propriedades e Identidades" },
    { id: "modulo-9", label: "Módulo 9", titulo: "Aplicações Petrobras" },
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
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 1: PRINCÍPIO FUNDAMENTAL DA CONTAGEM                      */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="Princípio Fundamental da Contagem"
          descricao="A base de toda análise combinatória: quando multiplicar as possibilidades para contar corretamente sem listar cada caso."
          gradiente="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="O Princípio Fundamental da Contagem (PFC)"
              description="Se uma tarefa pode ser feita em etapas independentes, o total de formas é o produto das possibilidades de cada etapa."
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="💡 Conceito e Como Usar"
              icone="🔢"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Definição e Intuição",
                  icone: "💡",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        O <strong>Princípio Fundamental da Contagem</strong> afirma: se um evento A pode ocorrer de <em>m</em> maneiras e, independentemente, um evento B de <em>n</em> maneiras, então A e B juntos podem ocorrer de <strong>m × n maneiras</strong>.
                      </p>
                      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                        <p className="font-mono text-center">
                          Total = n₁ × n₂ × n₃ × ... × nₖ
                        </p>
                      </div>
                      <AlertBox tipo="info" titulo="Contexto Petrobras">
                        Um técnico da REPLAN deve escolher: 1 de 3 EPCs de proteção respiratória, 1 de 4 tipos de luva e 1 de 2 modelos de capacete. O total de combinações de EPI é 3 × 4 × 2 = <strong>24 configurações</strong>. O PFC evita listar todas as possibilidades manualmente.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Aplicação Passo a Passo",
                  icone: "📋",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Para aplicar o PFC corretamente, identifique cada <strong>etapa independente</strong> e conte as opções de cada uma:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-sm font-bold text-blue-500 mb-2">Exemplo: Código de Equipamento</p>
                          <p>Formato: 1 letra (A–E) + 2 dígitos (0–9)</p>
                          <p className="mt-2">Etapa 1: 5 letras</p>
                          <p>Etapa 2: 10 dígitos</p>
                          <p>Etapa 3: 10 dígitos</p>
                          <p className="font-bold mt-2 text-blue-500">Total: 5 × 10 × 10 = 500</p>
                        </div>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="text-sm font-bold text-cyan-500 mb-2">Exemplo: Rotas de Inspeção</p>
                          <p>4 rotas de acesso à plataforma</p>
                          <p>3 rotas de retorno à base</p>
                          <p className="mt-2">Etapa 1 (ida): 4 opções</p>
                          <p>Etapa 2 (volta): 3 opções</p>
                          <p className="font-bold mt-2 text-cyan-500">Total: 4 × 3 = 12 viagens</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <ContentAccordion
              titulo="⚠️ Armadilhas e Limitações"
              icone="🚫"
              corIndicador="bg-amber-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "Quando NÃO usar o PFC",
                  icone: "⚠️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        O PFC exige que as etapas sejam <strong>independentes</strong>. Quando os eventos são <em>alternativos</em> (ou A ou B, não os dois), usa-se <strong>adição</strong>, não multiplicação.
                      </p>
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                        <p className="font-bold mb-2">Multiplicação vs. Adição</p>
                        <p>✅ <strong>Multiplicação</strong>: etapas sequenciais (faz A E B)</p>
                        <p>✅ <strong>Adição</strong>: alternativas excludentes (faz A OU B)</p>
                        <p className="mt-2">Ex: 3 ônibus ou 2 barcos para chegar à plataforma → 3 + 2 = 5 meios de transporte (não 3 × 2).</p>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        A banca mistura etapas sequenciais e alternativas no mesmo enunciado. Leia com atenção as palavras <strong>"E"</strong> (multiplica) e <strong>"OU"</strong> (soma). Este é o erro mais comum no PFC.
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
              title="Resumo Estratégico: O Poder do PFC"
              description="Consolide a base de toda a análise combinatória."
              variant="indigo"
            />
            <LessonTabs
              tabs={[
                {
                  id: "resumo-pfc",
                  label: "Diagrama de Decisão",
                  icon: LuLightbulb,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Árvore de Decisão: E vs OU",
                          type: "Esquema",
                          placeholderColor: "bg-indigo-100 dark:bg-indigo-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Esquema industrial: Nó central "Problema de Contagem". Seta 1 "Fases sucessivas?" -> "E (Multiplica)". Seta 2 "Opções alternativas?" -> "OU (Soma)".
                        },
                      ]}
                      moduloNome="Módulo 1"
                      tituloAula="Análise Combinatória"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-1" className="mt-16">
            <QuizInterativo
              questoes={quizM1}
              titulo="Quiz — Princípio Fundamental da Contagem"
              icone="🔢"
              numero={1}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 2: FATORIAL E NOTAÇÃO                                     */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <ModuleBanner
          numero={2}
          titulo="Fatorial e Notação"
          descricao="Domine a operação fundamental que sustenta todas as fórmulas de análise combinatória: o fatorial."
          gradiente="bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Definição de Fatorial"
              description="n! representa o produto de todos os inteiros positivos de 1 até n."
              variant="cyan"
              className="mb-6"
            />
            <ContentAccordion
              titulo="📐 Definição e Cálculo de Fatoriais"
              icone="❗"
              corIndicador="bg-cyan-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "O que é Fatorial",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        O <strong>fatorial de n</strong> (escrito n!) é o produto de todos os inteiros de 1 até n:
                      </p>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
                        <p className="font-mono text-center">n! = n × (n−1) × (n−2) × ... × 2 × 1</p>
                        <p className="font-mono text-center mt-2">Por convenção: 0! = 1</p>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                        {[
                          { n: "0!", v: "1" },
                          { n: "1!", v: "1" },
                          { n: "2!", v: "2" },
                          { n: "3!", v: "6" },
                          { n: "4!", v: "24" },
                          { n: "5!", v: "120" },
                          { n: "6!", v: "720" },
                          { n: "7!", v: "5.040" },
                        ].map((item) => (
                          <FlipCard
                            key={item.n}
                            frente={
                              <div className="flex flex-col items-center justify-center p-2">
                                <span className="text-2xl font-black text-indigo-500">{item.n}</span>
                                <span className="text-xs text-muted-foreground uppercase mt-1">Gire para ver</span>
                              </div>
                            }
                            verso={
                              <div className="flex flex-col items-center justify-center p-2">
                                <span className="text-xl font-mono font-bold text-emerald-500">{item.v}</span>
                                <span className="text-xs text-muted-foreground mt-1">Valor fixo</span>
                              </div>
                            }
                          />
                        ))}
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Simplificação de Fatoriais",
                  icone: "✂️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Nunca calcule fatoriais grandes individualmente. <strong>Simplifique primeiro</strong>, cancelando o fatorial menor:
                      </p>
                      <div className="space-y-3">
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-sm font-bold text-emerald-500 mb-2">Exemplo 1: 10! / 8!</p>
                          <p className="font-mono">= (10 × 9 × <span className="text-muted-foreground">8!</span>) / <span className="text-muted-foreground">8!</span></p>
                          <p className="font-mono">= 10 × 9 = <strong>90</strong></p>
                        </div>
                        <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                          <p className="text-sm font-bold text-indigo-500 mb-2">Exemplo 2: 8! / (5! × 3!)</p>
                          <p className="font-mono">= (8 × 7 × 6 × <span className="text-muted-foreground">5!</span>) / (<span className="text-muted-foreground">5!</span> × 6)</p>
                          <p className="font-mono">= (8 × 7 × 6) / 6 = 8 × 7 = <strong>56</strong></p>
                        </div>
                      </div>
                      <AlertBox tipo="info" titulo="Dica de Velocidade">
                        Em prova, antes de calcular qualquer fatorial, verifique se há cancelamento. Candidatos que calculam fatoriais grandes perdem tempo valioso.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            <ContentAccordion
              titulo="🤔 Por que 0! = 1? (A Pegadinha da Banca)"
              icone="⚠️"
              corIndicador="bg-amber-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "Por que 0! = 1",
                  icone: "🤔",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A definição 0! = 1 não é arbitrária — ela é necessária para que as fórmulas de combinatória funcionem corretamente:
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 space-y-2">
                        <p>C(n, 0) = n! / (0! × n!) = n! / (1 × n!) = <strong>1</strong></p>
                        <p className="text-muted-foreground">Há exatamente 1 forma de escolher 0 elementos de um conjunto: o subconjunto vazio.</p>
                      </div>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 space-y-2">
                        <p>C(n, n) = n! / (n! × 0!) = <strong>1</strong></p>
                        <p className="text-muted-foreground">Há exatamente 1 forma de escolher todos os elementos: pegar o conjunto inteiro.</p>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        A banca frequentemente usa C(n,0) ou C(n,n) em cálculos. Candidatos que não sabem 0!=1 erram essas questões. <strong>Memorize: 0! = 1, ponto final.</strong>
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-2" className="mt-16">
            <QuizInterativo
              questoes={quizM2}
              titulo="Quiz — Fatorial e Notação"
              icone="❗"
              numero={2}
              variant="cyan"
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6 mt-12">
            <ModuleSectionHeader index={2.1} title="Resumo e Multimídia" variant="cyan" />
            <LessonTabs
              tabs={[
                {
                  id: "resumo-fatorial",
                  label: "Tabela de Referência",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Tabela de Fatoriais Comuns",
                          type: "Tabela",
                          placeholderColor: "bg-cyan-100 dark:bg-cyan-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Tabela dark premium de fatoriais de 0! a 6!. 0!=1, 1!=1, 2!=2, 3!=6, 4!=24, 5!=120, 6!=720. Estilo dashboard industrial com brilhos ciano.
                        },
                      ]}
                      moduloNome="Módulo 2"
                      tituloAula="Análise Combinatória"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 3: PERMUTAÇÃO SIMPLES                                     */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <ModuleBanner
          numero={3}
          titulo="Permutação Simples"
          descricao="Quando a ordem importa e usamos todos os elementos: quantas formas distintas de organizar n objetos diferentes."
          gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="P(n) = n! — A Fórmula da Permutação"
              description="O número de arranjos de n elementos distintos em todos os n lugares é n fatorial."
              variant="emerald"
              className="mb-6"
            />
            <ContentAccordion
              titulo="🔀 Conceito e Processo de Permutação"
              icone="🔀"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Definição de Permutação Simples",
                  icone: "📌",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A <strong>Permutação Simples</strong> conta o número de formas de organizar <em>n</em> objetos distintos em <em>n</em> posições distintas. Cada objeto ocupa exatamente uma posição.
                      </p>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                        <p className="font-mono text-center text-lg">P(n) = n!</p>
                        <p className="text-sm text-center text-muted-foreground mt-1">Todos os n elementos, todos os n lugares</p>
                      </div>
                      <AlertBox tipo="info" titulo="Contexto Petrobras">
                        5 técnicos da REPLAN precisam ser escalados em fila para receber treinamento. De quantas formas? P(5) = 5! = 120. Cada ordem é diferente: o técnico A na frente ≠ o técnico B na frente.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Resolução Passo a Passo",
                  icone: "🪜",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Pense em <strong>preencher posições sequencialmente</strong>: a 1ª posição tem n opções, a 2ª tem n−1, a 3ª tem n−2, e assim por diante.
                      </p>
                      <div className="p-4 bg-teal-500/5 rounded-xl border border-teal-500/20">
                        <p className="font-bold text-teal-500 mb-3">Exemplo: 4 operadores em 4 turnos</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="px-3 py-2 bg-teal-500/10 rounded border border-teal-500/20 text-center">
                            <p className="text-sm text-muted-foreground">Turno 1</p>
                            <p className="font-bold">4 opções</p>
                          </div>
                          <span className="text-muted-foreground">×</span>
                          <div className="px-3 py-2 bg-teal-500/10 rounded border border-teal-500/20 text-center">
                            <p className="text-sm text-muted-foreground">Turno 2</p>
                            <p className="font-bold">3 opções</p>
                          </div>
                          <span className="text-muted-foreground">×</span>
                          <div className="px-3 py-2 bg-teal-500/10 rounded border border-teal-500/20 text-center">
                            <p className="text-sm text-muted-foreground">Turno 3</p>
                            <p className="font-bold">2 opções</p>
                          </div>
                          <span className="text-muted-foreground">×</span>
                          <div className="px-3 py-2 bg-teal-500/10 rounded border border-teal-500/20 text-center">
                            <p className="text-sm text-muted-foreground">Turno 4</p>
                            <p className="font-bold">1 opção</p>
                          </div>
                          <span className="text-muted-foreground">=</span>
                          <div className="px-3 py-2 bg-emerald-500/20 rounded border border-emerald-500/40 text-center">
                            <p className="font-bold text-emerald-500">24</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <ContentAccordion
              titulo="⚖️ Permutação vs. Arranjo: Saiba Diferenciar"
              icone="⚖️"
              corIndicador="bg-blue-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "Permutação vs. Arranjo",
                  icone: "⚖️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A <strong>Permutação usa TODOS os n elementos</strong>. Quando você usa apenas p elementos de n (com p &lt; n), é um <strong>Arranjo A(n,p)</strong>:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-sm font-bold text-emerald-500 mb-2">Permutação P(n)</p>
                          <p>n elementos → n lugares</p>
                          <p className="font-mono mt-1">P(5) = 5! = 120</p>
                          <p className="text-sm text-muted-foreground mt-1">5 técnicos em 5 turnos</p>
                        </div>
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-sm font-bold text-blue-500 mb-2">Arranjo A(n,p)</p>
                          <p>n elementos → p lugares (p &lt; n)</p>
                          <p className="font-mono mt-1">A(8,3) = 8×7×6 = 336</p>
                          <p className="text-sm text-muted-foreground mt-1">8 barcos, pódio de 3</p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        "De quantas formas o pódio pode ser preenchido com 3 finalistas de 8 equipes?" Isso é <strong>Arranjo A(8,3)</strong>, não permutação P(3) = 6 (que seria apenas a ordenação dos 3 finalistas entre si).
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
              title="Permutação vs Arranjo: Quando usar cada um?"
              description="A dúvida mais comum resolvida de forma visual."
              variant="emerald"
            />
            <LessonTabs
              tabs={[
                {
                  id: "comparativo-p-a",
                  label: "Comparativo",
                  icon: LuShuffle,
                  content: (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-bold text-emerald-500">Permutação P(n)</h4>
                        <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground">
                          <li>Usa <strong>todos</strong> os elementos</li>
                          <li>Nº de elementos = Nº de lugares</li>
                          <li>Ex: Anagramas, filas completas</li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-bold text-blue-500">Arranjo A(n,p)</h4>
                        <ul className="space-y-2 text-sm list-disc list-inside text-muted-foreground">
                          <li>Usa apenas <strong>parte</strong> dos elementos</li>
                          <li>Nº de elementos &gt; Nº de lugares</li>
                          <li>Ex: Pódios, senhas parciais</li>
                        </ul>
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
              titulo="Quiz — Permutação Simples"
              icone="🔀"
              numero={3}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6 mt-12">
            <ModuleSectionHeader index={3.1} title="Resumo e Multimídia" variant="emerald" />
            <LessonTabs
              tabs={[
                {
                  id: "resumo-p3",
                  label: "Visual do Fatorial",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Diagrama de Permutação",
                          type: "Esquema",
                          placeholderColor: "bg-emerald-100 dark:bg-emerald-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Diagrama dark premium mostrando 3 objetos (A, B, C) e as 6 formas de organizá-los (ABC, ACB, BAC, BCA, CAB, CBA). Estilo técnico esmeralda.
                        },
                      ]}
                      moduloNome="Módulo 3"
                      tituloAula="Análise Combinatória"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 4: PERMUTAÇÃO COM REPETIÇÃO                               */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner
          numero={4}
          titulo="Permutação com Repetição"
          descricao="Quando alguns elementos são idênticos, organizações que parecem distintas são na verdade iguais. Aprenda a corrigir a contagem."
          gradiente="bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="P(n; n₁, n₂, ...) = n! / (n₁! × n₂! × ...)"
              description="Divida pelo fatorial de cada grupo de elementos repetidos para eliminar contagens duplicadas."
              variant="cyan"
              className="mb-6"
            />
            <ContentAccordion
              titulo="📪 Conceito e Anagramas"
              icone="🔁"
              corIndicador="bg-cyan-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Por que dividir pelos fatoriais?",
                  icone: "🧩",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Se temos n elementos onde alguns são idênticos, trocar elementos iguais de posição <strong>não gera um arranjo novo</strong>. Precisamos dividir pelas repetições:
                      </p>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
                        <p className="font-mono text-center">P(n; n₁, n₂, ..., nₖ) = n! / (n₁! × n₂! × ... × nₖ!)</p>
                        <p className="text-center text-muted-foreground mt-1">onde n₁ + n₂ + ... + nₖ = n</p>
                      </div>
                      <AlertBox tipo="info" titulo="Exemplo Industrial">
                        Sinalizadores em linha: 3 vermelhos (V,V,V) e 2 amarelos (A,A). Sem contar repetições: 5! = 120. Mas V₁V₂V₃A₁A₂ = V₂V₁V₃A₁A₂ (os vermelhos são idênticos). Dividimos: 5!/(3!×2!) = 120/12 = <strong>10 arranjos distintos</strong>.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Anagramas de Palavras",
                  icone: "🔤",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Anagramas são as permutações das letras de uma palavra. Quando há letras repetidas, usa-se a fórmula da permutação com repetição:
                      </p>
                      <div className="space-y-3">
                        <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                          <p className="text-sm font-bold text-indigo-500 mb-2">PETRO (5 letras, todas distintas)</p>
                          <p className="font-mono">P(5) = 5! = <strong>120 anagramas</strong></p>
                        </div>
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-sm font-bold text-blue-500 mb-2">BACIA (5 letras, A aparece 2×)</p>
                          <p className="font-mono">P(5; 2) = 5!/2! = 120/2 = <strong>60 anagramas</strong></p>
                        </div>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="text-sm font-bold text-cyan-500 mb-2">RADAR (5 letras, R aparece 2×, A aparece 2×)</p>
                          <p className="font-mono">P(5; 2, 2) = 5!/(2!×2!) = 120/4 = <strong>30 anagramas</strong></p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <ContentAccordion
              titulo="🔗 Conexão Elegante com Combinação"
              icone="✨"
              corIndicador="bg-emerald-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "Conexão com Combinação",
                  icone: "🔗",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Existe uma ligação elegante entre permutação com repetição e combinação:
                      </p>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 space-y-2">
                        <p className="font-bold">P(n; p, n−p) = C(n, p)</p>
                        <p className="text-muted-foreground">Permutação de n elementos em 2 grupos (p e n−p) é igual a combinar n tomados p a p.</p>
                        <p className="mt-2">Ex: P(5; 3, 2) = 5!/(3!×2!) = 10 = C(5,2)</p>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        A banca pode pedir "permutação de n objetos com k iguais" ou "combinação de n tomados k a k" — ambos dão o mesmo resultado! Reconheça as duas formas de enunciar o mesmo problema.
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
              title="Resumo Visual: Repetições"
              description="Como tratar elementos idênticos em fila."
              variant="cyan"
            />
            <ModuleSummaryCarouselNew
              images={[
                {
                  title: "Anagramas com Repetição",
                  type: "Exemplo",
                  placeholderColor: "bg-cyan-100 dark:bg-cyan-900/30",
                  imageUrl: "/temp-img.png", // PROMPT: Ilustração de anagramas da palavra "BANANA". Destaque nas letras 'A' e 'N' repetidas e a divisão na fórmula.
                },
              ]}
              moduloNome="Módulo 4"
              tituloAula="Análise Combinatória"
              materia="Matemática"
            />
          </section>

          <section id="quiz-modulo-4" className="mt-16">
            <QuizInterativo
              questoes={quizM4}
              titulo="Quiz — Permutação com Repetição"
              icone="🔁"
              numero={4}
              variant="rose"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6 mt-12">
            <ModuleSectionHeader index={4.1} title="Resumo e Multimídia" variant="rose" />
            <LessonTabs
              tabs={[
                {
                  id: "resumo-p4",
                  label: "Fórmula de Repetição",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Removendo Permutações Idênticas",
                          type: "Explicação Visual",
                          placeholderColor: "bg-rose-100 dark:bg-rose-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Diagrama dark premium explicando a palavra ANA. 3! = 6 formas, mas metade são idênticas. Estilo infográfico rose.
                        },
                      ]}
                      moduloNome="Módulo 4"
                      tituloAula="Análise Combinatória"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 5: ARRANJO SIMPLES                                        */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="Arranjo Simples"
          descricao="Selecionar e ordenar p elementos de um conjunto de n: a ordem importa e cada elemento é usado no máximo uma vez."
          gradiente="bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="A(n,p) = n! / (n−p)!"
              description="Escolher p de n elementos onde a ordem importa — mais que combinação, menos que permutação total."
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="🏆 Definição e Cálculo de Arranjos"
              icone="🏆"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Definição e Fórmula",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        O <strong>Arranjo Simples A(n,p)</strong> conta o número de formas de selecionar e ordenar <em>p</em> elementos de um conjunto de <em>n</em> elementos distintos, sem repetição:
                      </p>
                      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                        <p className="font-mono text-center text-lg">A(n, p) = n! / (n − p)!</p>
                        <p className="font-mono text-center mt-1">= n × (n−1) × ... × (n−p+1)</p>
                        <p className="text-center text-muted-foreground mt-1">São exatamente p fatores, começando por n</p>
                      </div>
                      <AlertBox tipo="info" titulo="Contexto Petrobras">
                        De 10 técnicos, escolher e ordenar 3 para os cargos de líder, vice-líder e secretário de turno: A(10,3) = 10×9×8 = <strong>720 formas</strong>. A ordem importa porque líder ≠ vice-líder.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Cálculo Rápido de Arranjos",
                  icone: "⚡",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Para calcular A(n,p), multiplique <strong>p números consecutivos decrescentes a partir de n</strong> — não precisa calcular fatoriais:
                      </p>
                      <div className="space-y-3">
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-sm font-bold text-blue-500">A(8, 3) = ?</p>
                          <p className="font-mono mt-1">= 8 × 7 × 6 = <strong>336</strong></p>
                          <p className="text-sm text-muted-foreground">3 fatores começando em 8</p>
                        </div>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="text-sm font-bold text-cyan-500">A(12, 4) = ?</p>
                          <p className="font-mono mt-1">= 12 × 11 × 10 × 9 = <strong>11.880</strong></p>
                          <p className="text-sm text-muted-foreground">4 fatores começando em 12</p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        "De 12 equipes, de quantas formas os 3 primeiros lugares podem ser distribuídos?" → A(12,3) = 1320. A banca testa se você usa arranjo (ordem importa) ou combinação (ordem não importa) neste contexto.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            <ContentAccordion
              titulo="⚖️ Arranjo vs. Combinação: A Diferença Crítica"
              icone="⚖️"
              corIndicador="bg-emerald-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "Arranjo vs. Combinação: A Diferença Crítica",
                  icone: "⚖️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A única diferença entre arranjo e combinação é se a <strong>ordem importa ou não</strong>:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                          <p className="text-sm font-bold text-indigo-500 mb-2">ARRANJO: Ordem Importa</p>
                          <p>A(5,3) = 5×4×3 = 60</p>
                          <p className="text-sm text-muted-foreground mt-1">ABC ≠ BAC ≠ CBA</p>
                          <p className="text-sm text-muted-foreground">Cargos, pódio, senhas ordenadas</p>
                        </div>
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="text-sm font-bold text-emerald-500 mb-2">COMBINAÇÃO: Ordem Não Importa</p>
                          <p>C(5,3) = 10</p>
                          <p className="text-sm text-muted-foreground mt-1">ABC = BAC = CBA</p>
                          <p className="text-sm text-muted-foreground">Grupos, equipes, comitês</p>
                        </div>
                      </div>
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                        <p className="font-bold">Relação: A(n,p) = C(n,p) × p!</p>
                        <p className="text-muted-foreground mt-1">Para cada combinação de p elementos, há p! maneiras de ordená-los → cada combinação gera p! arranjos.</p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-5" className="mt-16">
            <QuizInterativo
              questoes={quizM5}
              titulo="Quiz — Arranjo Simples"
              icone="🏆"
              numero={5}
              variant="amber"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6 mt-12">
            <ModuleSectionHeader index={5.1} title="Resumo e Multimídia" variant="amber" />
            <LessonTabs
              tabs={[
                {
                  id: "resumo-p5",
                  label: "Diferencial Arranjo",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Arranjo: Ordem é Posicional",
                          type: "Contextualização",
                          placeholderColor: "bg-amber-100 dark:bg-amber-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Pódio industrial com 1º, 2º e 3º lugares. Estilo dark premium âmbar.
                        },
                      ]}
                      moduloNome="Módulo 5"
                      tituloAula="Análise Combinatória"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 6: COMBINAÇÃO SIMPLES                                     */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <ModuleBanner
          numero={6}
          titulo="Combinação Simples"
          descricao="Selecionar p elementos de n sem se preocupar com a ordem: equipes, grupos, subconjuntos — o conceito mais cobrado em provas."
          gradiente="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-600"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="C(n,p) = n! / [p! × (n−p)!]"
              description="A fórmula mais importante da análise combinatória: contagem de subgrupos sem levar em conta a ordem."
              variant="blue"
              className="mb-6"
            />
            <ContentAccordion
              titulo="👥 Definição e Cálculo de Combinações"
              icone="👥"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Definição e Fórmula",
                  icone: "📐",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A <strong>Combinação Simples C(n,p)</strong> conta o número de subconjuntos de tamanho <em>p</em> que podem ser formados de um conjunto de <em>n</em> elementos, <strong>sem repetição e sem considerar a ordem</strong>:
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                        <p className="font-mono text-center text-lg">C(n, p) = n! / [p! × (n−p)!]</p>
                        <p className="text-sm font-mono text-center mt-1">Também escrito como Cₙᵖ ou ⁿCₚ ou (ⁿₚ)</p>
                      </div>
                      <AlertBox tipo="info" titulo="Contexto Petrobras">
                        De 8 técnicos da REPLAN, quantas equipes de 3 podem ser formadas para inspeção? C(8,3) = (8×7×6)/(3×2×1) = 336/6 = <strong>56 equipes</strong>. A equipe {"{João, Maria, Pedro}"} é a mesma que {"{Pedro, João, Maria}"}.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Cálculo Eficiente de C(n,p)",
                  icone: "⚡",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Use sempre o menor entre p e (n−p) no denominador — isso minimiza o cálculo:
                      </p>
                      <div className="space-y-3">
                        <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                          <p className="text-sm font-bold text-indigo-500 mb-2">C(10, 4) — use C(10,4) pois 4 &lt; 6</p>
                          <p className="font-mono">= (10×9×8×7) / (4×3×2×1) = 5040/24 = <strong>210</strong></p>
                        </div>
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-sm font-bold text-blue-500 mb-2">C(10, 7) = C(10, 3) pela simetria</p>
                          <p className="font-mono">= (10×9×8) / (3×2×1) = 720/6 = <strong>120</strong></p>
                        </div>
                      </div>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                        <p className="font-bold">Atalho: C(n, 2) = n(n−1)/2</p>
                        <p className="text-muted-foreground">Apertos de mão, diagonais de polígono — sempre C(n,2) = n(n−1)/2.</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Problemas Clássicos com Combinação",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="text-sm font-bold text-cyan-500 mb-2">Apertos de Mão</p>
                          <p>n pessoas, cada par cumprimenta uma vez:</p>
                          <p className="font-mono mt-1">C(n, 2) = n(n−1)/2</p>
                          <p className="text-sm text-muted-foreground mt-1">6 gerentes → C(6,2) = 15 apertos</p>
                        </div>
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-sm font-bold text-blue-500 mb-2">Diagonais de Polígono</p>
                          <p>n vértices, subtraindo os n lados:</p>
                          <p className="font-mono mt-1">C(n,2) − n = n(n−3)/2</p>
                          <p className="text-sm text-muted-foreground mt-1">Octógono → C(8,2)−8 = 28−8 = 20</p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        "Quantos jogos em um torneio todos-contra-todos?" = C(n,2). "Com ida e volta?" = A(n,2) = n(n−1). A banca testa se você distingue partidas com e sem mandante.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            <ContentAccordion
              titulo="🎯 Problemas Clássicos: Aplicações CESGRANRIO"
              icone="🎯"
              corIndicador="bg-amber-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "Apertos de Mão e Torneios",
                  icone: "🤝",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="text-sm font-bold text-cyan-500 mb-2">Apertos de Mão</p>
                          <p>n pessoas, cada par cumprimenta uma vez: <strong>C(n,2)</strong></p>
                          <p className="font-mono mt-2">C(6,2) = 15 apertos (6 gerentes)</p>
                        </div>
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-sm font-bold text-blue-500 mb-2">Torneio Todos vs. Todos</p>
                          <p>Sem mandante: <strong>C(n,2)</strong> jogos</p>
                          <p>Com mandante (ida+volta): <strong>A(n,2)</strong> jogos</p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        "Quantos jogos em um torneio todos-contra-todos?" = C(n,2). "Com ida e volta?" = A(n,2) = n(n−1). A banca testa se você distingue partidas com e sem mandante.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-6" className="mt-16">
            <QuizInterativo
              questoes={quizM6}
              titulo="Quiz — Combinação Simples"
              icone="👥"
              numero={6}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-6", score)}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6 mt-12">
            <ModuleSectionHeader index={6.1} title="Resumo e Multimídia" variant="indigo" />
            <LessonTabs
              tabs={[
                {
                  id: "resumo-c6",
                  label: "Diagrama Combinatório",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Combinação: Ordem Não Importa",
                          type: "Esquema",
                          placeholderColor: "bg-indigo-100 dark:bg-indigo-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Diagrama técnico mostrando um conjunto de 3 bolas (RGB). Selecionar (RG) é igual a (GR). Sublinhar: "Subconjuntos". Estilo dark industrial indigo.
                        },
                      ]}
                      moduloNome="Módulo 6"
                      tituloAula="Análise Combinatória"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 7: COMBINAÇÃO COM REPETIÇÃO                               */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <ModuleBanner
          numero={7}
          titulo="Combinação com Repetição"
          descricao="Quando é permitido escolher o mesmo elemento mais de uma vez: o mais difícil dos problemas de combinatória."
          gradiente="bg-gradient-to-br from-cyan-600 via-teal-600 to-emerald-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="CR(n,p) = C(n+p−1, p)"
              description="A fórmula que transforma um problema com repetição em uma combinação simples de ordem maior."
              variant="cyan"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Combinação com Repetição: A Fórmula Mágica"
              icone="♻️"
              corIndicador="bg-cyan-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Definição e Intuição",
                  icone: "💡",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A <strong>Combinação com Repetição CR(n,p)</strong> conta o número de formas de escolher <em>p</em> elementos de <em>n</em> tipos distintos, onde um mesmo tipo pode ser escolhido múltiplas vezes, e a ordem não importa:
                      </p>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
                        <p className="font-mono text-center text-lg">CR(n, p) = C(n+p−1, p)</p>
                        <p className="text-sm text-center text-muted-foreground mt-1">Equivalente a C(n+p−1, n−1)</p>
                      </div>
                      <AlertBox tipo="info" titulo="Exemplo Prático">
                        Um operador escolhe 3 itens de um cardápio com 5 opções (pode repetir): CR(5,3) = C(5+3−1, 3) = C(7,3) = <strong>35 formas</strong>. Sem repetição seria apenas C(5,3) = 10.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Equivalência com Equações",
                  icone: "🔢",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        CR(n,p) é equivalente ao número de <strong>soluções inteiras não-negativas</strong> de equações do tipo x₁ + x₂ + ... + xₙ = p:
                      </p>
                      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                        <p className="text-sm font-bold mb-2">Exemplo: x₁ + x₂ + x₃ = 4</p>
                        <p className="text-sm">n=3 variáveis, p=4 unidades a distribuir</p>
                        <p className="text-sm font-mono mt-2">CR(3,4) = C(3+4−1, 4) = C(6,4) = C(6,2) = <strong>15 soluções</strong></p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                        <div className="p-3 bg-teal-500/5 rounded-xl border border-teal-500/20">
                          <p className="text-xs text-teal-500 font-bold">CR vs. C: Quando Usar</p>
                          <p className="text-xs text-muted-foreground mt-1">CR: "pode repetir", "pode escolher o mesmo"</p>
                          <p className="text-xs text-muted-foreground">C: "sem repetição", "cada elemento único"</p>
                        </div>
                        <div className="p-3 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="text-xs text-cyan-500 font-bold">Relação CR {">"} C</p>
                          <p className="text-xs text-muted-foreground mt-1">CR(n,p) ≥ C(n,p) sempre</p>
                          <p className="text-xs text-muted-foreground">Mais opções quando repetição é permitida</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Tabela de Comparação Final",
                  icone: "📊",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                          <thead>
                            <tr className="bg-muted/50">
                              <th className="p-3 text-left border border-border">Tipo</th>
                              <th className="p-3 text-center border border-border">Ordem</th>
                              <th className="p-3 text-center border border-border">Repetição</th>
                              <th className="p-3 text-left border border-border">Fórmula</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="p-3 border border-border font-medium">Permutação Simples</td>
                              <td className="p-3 border border-border text-center text-emerald-500">Sim</td>
                              <td className="p-3 border border-border text-center text-rose-500">Não</td>
                              <td className="p-3 border border-border font-mono text-xs">n!</td>
                            </tr>
                            <tr className="bg-muted/20">
                              <td className="p-3 border border-border font-medium">Perm. com Repetição</td>
                              <td className="p-3 border border-border text-center text-emerald-500">Sim</td>
                              <td className="p-3 border border-border text-center text-emerald-500">Sim</td>
                              <td className="p-3 border border-border font-mono text-xs">n!/(n₁!×n₂!...)</td>
                            </tr>
                            <tr>
                              <td className="p-3 border border-border font-medium">Arranjo Simples</td>
                              <td className="p-3 border border-border text-center text-emerald-500">Sim</td>
                              <td className="p-3 border border-border text-center text-rose-500">Não</td>
                              <td className="p-3 border border-border font-mono text-xs">n!/(n−p)!</td>
                            </tr>
                            <tr className="bg-muted/20">
                              <td className="p-3 border border-border font-medium">Combinação Simples</td>
                              <td className="p-3 border border-border text-center text-rose-500">Não</td>
                              <td className="p-3 border border-border text-center text-rose-500">Não</td>
                              <td className="p-3 border border-border font-mono text-xs">n!/[p!(n−p)!]</td>
                            </tr>
                            <tr>
                              <td className="p-3 border border-border font-medium">Comb. com Repetição</td>
                              <td className="p-3 border border-border text-center text-rose-500">Não</td>
                              <td className="p-3 border border-border text-center text-emerald-500">Sim</td>
                              <td className="p-3 border border-border font-mono text-xs">C(n+p−1, p)</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        A banca dificilmente usa o termo "combinação com repetição" diretamente. Procure pistas no enunciado: <strong>"podendo repetir"</strong>, <strong>"com reposição"</strong>, <strong>"soluções não-negativas"</strong>. Estas são as senhas para usar CR.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6 mt-12">
            <ModuleSectionHeader
              index={7.1}
              title="Resumo Visual: Combinatória com Repetição"
              variant="emerald"
            />
            <LessonTabs
              tabs={[
                {
                  id: "resumo-cr7",
                  label: "Método Bola-Traço",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Explicação: Estrelas e Barras",
                          type: "Esquema",
                          placeholderColor: "bg-emerald-100 dark:bg-emerald-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Esquema matemático mostrando bolinhas divididas por barras verticais para representar soluções de equações. Estilo técnico esmeralda.
                        },
                      ]}
                      moduloNome="Módulo 7"
                      tituloAula="Análise Combinatória"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-7" className="mt-16">
            <QuizInterativo
              questoes={quizM7}
              titulo="Quiz — Combinação com Repetição"
              icone="♻️"
              numero={7}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-7", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 8: PROPRIEDADES E IDENTIDADES                             */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <ModuleBanner
          numero={8}
          titulo="Propriedades e Identidades"
          descricao="As relações entre combinações que permitem resolver problemas complexos rapidamente: simetria, Pascal e o Teorema Binomial."
          gradiente="bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="As Três Propriedades Essenciais"
              description="Simetria, Pascal e a Soma de uma Linha — as ferramentas de aceleração de cálculo em prova."
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Identidades Fundamentais da Combinatória"
              icone="🔏"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Simetria: C(n,p) = C(n, n−p)",
                  icone: "🪞",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Escolher <em>p</em> elementos para incluir é o mesmo que escolher <em>n−p</em> para excluir:
                      </p>
                      <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                        <p className="text-sm font-mono text-center">C(n, p) = C(n, n−p)</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-sm font-bold text-blue-500 mb-2">Exemplos</p>
                          <p className="text-sm font-mono">C(10, 3) = C(10, 7) = 120</p>
                          <p className="text-sm font-mono mt-1">C(8, 2) = C(8, 6) = 28</p>
                          <p className="text-sm font-mono mt-1">C(n, 0) = C(n, n) = 1</p>
                        </div>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="text-sm font-bold text-cyan-500 mb-2">Uso em Prova</p>
                          <p className="text-sm">Se C(n, k) = C(n, 5) e k ≠ 5, então k = n−5.</p>
                          <p className="text-xs text-muted-foreground mt-2">Banca usa para testar se você reconhece a simetria.</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Identidade de Pascal: C(n,p) = C(n−1,p−1) + C(n−1,p)",
                  icone: "🔺",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Cada elemento do <strong>Triângulo de Pascal</strong> é a soma dos dois diretamente acima dele:
                      </p>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 font-mono text-sm text-center space-y-1">
                        <p>1</p>
                        <p>1  1</p>
                        <p>1  2  1</p>
                        <p>1  3  3  1</p>
                        <p>1  4  6  4  1</p>
                        <p>1  5  10  10  5  1</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Linha n=4: C(4,0)=1, C(4,1)=4, C(4,2)=6, C(4,3)=4, C(4,4)=1
                      </p>
                      <AlertBox tipo="info" titulo="Aplicação">
                        C(5,2) = C(4,1) + C(4,2) = 4 + 6 = 10. Útil quando você conhece valores vizinhos e precisa de um sem calcular a fórmula completa.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Soma da Linha n: ΣC(n,k) = 2ⁿ",
                  icone: "∑",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A soma de todos os coeficientes binomiais da linha n é sempre 2ⁿ:
                      </p>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                        <p className="text-sm font-mono text-center">C(n,0) + C(n,1) + ... + C(n,n) = 2ⁿ</p>
                        <p className="text-sm text-center text-muted-foreground mt-1">Decorre do Binômio de Newton com x=y=1</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="p-3 bg-blue-500/5 rounded-xl border border-blue-500/20 text-center">
                          <p className="text-xs text-blue-500 font-bold">n=3</p>
                          <p className="text-sm font-mono">1+3+3+1 = 8 = 2³</p>
                        </div>
                        <div className="p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/20 text-center">
                          <p className="text-xs text-indigo-500 font-bold">n=4</p>
                          <p className="text-sm font-mono">1+4+6+4+1 = 16 = 2⁴</p>
                        </div>
                        <div className="p-3 bg-cyan-500/5 rounded-xl border border-cyan-500/20 text-center">
                          <p className="text-xs text-cyan-500 font-bold">n=5</p>
                          <p className="text-sm font-mono">1+5+10+10+5+1 = 32 = 2⁵</p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha CESGRANRIO">
                        "Quantos subconjuntos (incluindo o vazio) um conjunto de 4 elementos possui?" = 2⁴ = 16. Isso é a soma da linha n=4 do triângulo de Pascal.
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
              titulo="Quiz — Propriedades e Identidades"
              icone="🔏"
              numero={8}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-8", score)}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6 mt-12">
            <ModuleSectionHeader index={8.1} title="Resumo e Atalhos" variant="indigo" />
            <LessonTabs
              tabs={[
                {
                  id: "resumo-p8",
                  label: "Triângulo de Pascal",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Propriedades Rápidas",
                          type: "Tabela",
                          placeholderColor: "bg-indigo-100 dark:bg-indigo-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Vizualização do Triângulo de Pascal com setas indicando somas e simetria. Estilo infográfico educacional azul e índigo.
                        },
                      ]}
                      moduloNome="Módulo 8"
                      tituloAula="Análise Combinatória"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 9: APLICAÇÕES PETROBRAS                                   */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <ModuleBanner
          numero={9}
          titulo="Aplicações Petrobras"
          descricao="Equipes, senhas, rotas, comissões: os cenários reais mais cobrados pela CESGRANRIO com contexto de operações petrolíferas."
          gradiente="bg-gradient-to-br from-emerald-600 via-cyan-600 to-blue-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Problemas Compostos e Estratégia de Resolução"
              description="Como decompor enunciados complexos em etapas simples de combinatória — a habilidade mais exigida na CESGRANRIO."
              variant="emerald"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Estratégias para Problemas Petrobras"
              icone="🏭"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Problemas com Restrições (Pelo Menos / No Máximo)",
                  icone: "⚙️",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Problemas com <strong>"pelo menos k"</strong> ou <strong>"no máximo k"</strong> são melhor resolvidos por <strong>complementar</strong> ou por <strong>soma de casos</strong>:
                      </p>
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                        <p className="text-sm font-bold mb-2">Método do Complementar</p>
                        <p className="text-sm">Total de possibilidades − casos proibidos</p>
                        <p className="text-sm mt-2">Ex: "Pelo menos 1 mulher" = Total − (zero mulheres)</p>
                      </div>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                        <p className="text-sm font-bold mb-2">Soma de Casos</p>
                        <p className="text-sm">Some todos os casos favoráveis separadamente</p>
                        <p className="text-sm mt-2">Ex: "Pelo menos 2 eng" = (2 eng) + (3 eng) + (4 eng)</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Problemas com Grupos Fixos e Variáveis",
                  icone: "👥",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Quando a equipe tem <strong>papéis distintos</strong> para grupos diferentes, resolva separadamente e multiplique pelo PFC:
                      </p>
                      <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                        <p className="text-sm font-bold text-cyan-500 mb-3">Exemplo: Equipe de Emergência REPLAN</p>
                        <p className="text-sm">1 líder de 5 engenheiros + 3 técnicos de 8 técnicos</p>
                        <div className="space-y-2 mt-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Líderes</span>
                            <span className="text-sm font-mono">C(5,1) = 5</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">Técnicos</span>
                            <span className="text-sm font-mono">C(8,3) = 56</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">Total</span>
                            <span className="text-sm font-mono">5 × 56 = 280 equipes</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Senhas, Rotas e Redes de Dutos",
                  icone: "🔐",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                          <p className="text-xs font-bold text-indigo-500 mb-2">Senhas Ordenadas</p>
                          <p className="text-sm">Letras distintas, sem repetição, ordem importa:</p>
                          <p className="text-sm font-mono mt-1">A(26, 4) = 26×25×24×23</p>
                          <p className="text-xs text-muted-foreground mt-1">= 358.800 senhas de 4 letras distintas</p>
                        </div>
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-xs font-bold text-blue-500 mb-2">Redes de Dutos</p>
                          <p className="text-sm">n nós, máximo de trechos bidirecionais:</p>
                          <p className="text-sm font-mono mt-1">C(n, 2) = n(n−1)/2</p>
                          <p className="text-xs text-muted-foreground mt-1">6 nós → 15 trechos possíveis</p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Estratégia para Provas CESGRANRIO">
                        Leia o enunciado 2 vezes antes de calcular. Identifique: (1) ordem importa? → arranjo/permutação; (2) repetição permitida? → PFC ou CR; (3) há restrições? → complementar ou soma de casos.
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
              titulo="Quiz — Aplicações Petrobras"
              icone="🏭"
              numero={9}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-9", score)}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6 mt-12">
            <ModuleSectionHeader index={9.1} title="Contexto Petrobras" variant="emerald" />
            <LessonTabs
              tabs={[
                {
                  id: "resumo-app9",
                  label: "Cenários de Prova",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Modelagem de Problemas",
                          type: "Fluxograma",
                          placeholderColor: "bg-emerald-100 dark:bg-emerald-900/30",
                          imageUrl: "/temp-img.png", // PROMPT: Fluxograma de decisão para combinatória: "Ordem importa?" -> Sim/Não -> "Surgem restrições?" -> Sim/Não. Visual tecnológico Petrobras.
                        },
                      ]}
                      moduloNome="Módulo 9"
                      tituloAula="Análise Combinatória"
                      materia="Matemática"
                    />
                  ),
                },
              ]}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* MÓDULO 10: SIMULADO CESGRANRIO                                   */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <ModuleBanner
          numero={10}
          titulo="Simulado CESGRANRIO"
          descricao="Questões no estilo exato da banca: enunciados elaborados, múltiplas restrições, armadilhas clássicas. Teste sua preparação completa."
          gradiente="bg-gradient-to-br from-indigo-600 via-blue-600 to-emerald-600"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Checklist Final: O que a CESGRANRIO Mais Cobra"
              description="Revise os padrões de questões mais recorrentes antes de encarar o simulado."
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Revisão Estratégica: Padrões CESGRANRIO"
              icone="🎯"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Os 5 Tipos Mais Cobrados",
                  icone: "📋",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="space-y-3">
                        {[
                          { n: "1", tipo: "Comitês / Equipes", formula: "C(n,p)", desc: "Sem hierarquia → sem ordem → combinação" },
                          { n: "2", tipo: "Pódio / Cargos Distintos", formula: "A(n,p)", desc: "Com hierarquia → com ordem → arranjo" },
                          { n: "3", tipo: "Restrições (pelo menos / no máximo)", formula: "Complementar", desc: "Total − casos proibidos" },
                          { n: "4", tipo: "Anagramas / Senhas com Letras Iguais", formula: "Perm. Repetição", desc: "n!/n₁!×n₂!..." },
                          { n: "5", tipo: "Diagonais / Apertos de Mão", formula: "C(n,2)", desc: "Conexão de 2 a 2 em um conjunto" },
                        ].map((item) => (
                          <div key={item.n} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border border-border">
                            <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold">{item.n}</span>
                            <div>
                              <p className="text-sm font-bold">{item.tipo} <span className="text-indigo-500 font-mono">→ {item.formula}</span></p>
                              <p className="text-xs text-muted-foreground">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Armadilhas Clássicas da CESGRANRIO",
                  icone: "🪤",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/20">
                          <p className="text-sm font-bold text-rose-500">Armadilha 1: Confundir Arranjo com Combinação</p>
                          <p className="text-sm text-muted-foreground mt-1">Se o enunciado diz "formas de escolher e distribuir em cargos" → arranjo. "Formas de formar um grupo" → combinação.</p>
                        </div>
                        <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20">
                          <p className="text-sm font-bold text-amber-500">Armadilha 2: Esquecer 0! = 1</p>
                          <p className="text-sm text-muted-foreground mt-1">C(n,0) = 1 e C(n,n) = 1. Questões com casos extremos testam isso explicitamente.</p>
                        </div>
                        <div className="p-4 bg-orange-500/5 rounded-xl border border-orange-500/20">
                          <p className="text-sm font-bold text-orange-500">Armadilha 3: PFC — Somar vs. Multiplicar</p>
                          <p className="text-sm text-muted-foreground mt-1">"Vai de carro OU de barco" (7 opções ao todo) → soma. "Vai de carro E depois de barco" → multiplica.</p>
                        </div>
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-sm font-bold text-blue-500">Armadilha 4: Elementos Juntos / Separados</p>
                          <p className="text-sm text-muted-foreground mt-1">Para juntos: trate o bloco como 1 elemento. Para separados: Total − (casos juntos).</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Fórmulas para o Dia da Prova",
                  icone: "📝",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          { nome: "Permutação Simples", formula: "P(n) = n!" },
                          { nome: "Perm. com Repetição", formula: "n! / (n₁!×n₂!...)" },
                          { nome: "Arranjo Simples", formula: "A(n,p) = n!/(n−p)!" },
                          { nome: "Combinação Simples", formula: "C(n,p) = n!/[p!(n−p)!]" },
                          { nome: "Comb. com Repetição", formula: "CR(n,p) = C(n+p−1, p)" },
                          { nome: "Simetria", formula: "C(n,p) = C(n, n−p)" },
                          { nome: "Pascal", formula: "C(n,p) = C(n−1,p−1)+C(n−1,p)" },
                          { nome: "Soma da Linha", formula: "ΣC(n,k) = 2ⁿ" },
                        ].map((item) => (
                          <div key={item.nome} className="p-3 bg-muted/30 rounded-lg border border-border">
                            <p className="text-xs text-muted-foreground">{item.nome}</p>
                            <p className="text-sm font-mono font-bold">{item.formula}</p>
                          </div>
                        ))}
                      </div>
                      <AlertBox tipo="warning" titulo="Última Dica">
                        Em prova, sempre verifique se o enunciado usa <strong>"pelo menos"</strong>, <strong>"no mínimo"</strong>, <strong>"ao menos"</strong> → complementar. E <strong>"exatamente k"</strong> → calcule diretamente aquele caso.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-10" className="mt-16">
            <QuizInterativo
              questoes={quizM10}
              titulo="Simulado Final — Análise Combinatória"
              icone="🎯"
              numero={10}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-10", score)}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6 mt-12">
            <ModuleSectionHeader index={10.1} title="Revisão de Véspera" variant="indigo" />
            <LessonTabs
              tabs={[
                {
                  id: "resumo-final",
                  label: "Checklist de Combate",
                  icon: LuBookOpen,
                  content: (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FlipCard
                        frente={
                          <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                            <LuTarget className="w-12 h-12 text-indigo-500 opacity-50" />
                            <h6 className="text-xl font-bold uppercase tracking-tight">Decisão Rápida</h6>
                            <p className="text-sm text-muted-foreground">O que usar em cada caso?</p>
                          </div>
                        }
                        verso={
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <LuUsers className="w-5 h-5 text-indigo-400 shrink-0" />
                              <p className="text-sm font-bold text-indigo-400">Guia de Bolso</p>
                            </div>
                            <ul className="text-sm space-y-2 text-zinc-300">
                              <li>• <strong>Grupos/Equipes</strong>: Combinação (C)</li>
                              <li>• <strong>Cargos/Pódios</strong>: Arranjo (A)</li>
                              <li>• <strong>Ordem Total</strong>: Permutação (P)</li>
                              <li>• <strong>Repetição</strong>: CR ou PFC</li>
                            </ul>
                            <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-xs text-indigo-300 mt-2">
                              Dica: Se "Pelo menos 1" → use Total - Nada.
                            </div>
                          </div>
                        }
                      />
                      <ModuleSummaryCarouselNew
                        images={[
                          {
                            title: "Mapa Mental Final",
                            type: "Mapa",
                            placeholderColor: "bg-indigo-100 dark:bg-indigo-900/30",
                            imageUrl: "/temp-img.png", // PROMPT: Mapa mental completo de Análise Combinatória. Centralizado: Análise Combinatória. Ramos: Permutação, Arranjo, Combinação. Estilo dark premium.
                          },
                        ]}
                        moduloNome="Módulo 10"
                        tituloAula="Análise Combinatória"
                        materia="Matemática"
                      />
                    </div>
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
