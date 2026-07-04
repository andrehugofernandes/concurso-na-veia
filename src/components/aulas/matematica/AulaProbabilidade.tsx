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
  ModuleConsolidation,
  QuestaoResolvidaStepByStep} from "../shared";

import {
  LuBookOpen,
  LuLightbulb,
  LuTarget,
  LuTrendingUp,
  LuTrophy,
  LuBrain,
  LuRepeat,
  LuSigma,
  LuZap,
} from "react-icons/lu";

import {
  QUIZ_M1_FUNDAMENTOS,
  QUIZ_M2_LAPLACE,
  QUIZ_M3_UNIAO_INTERSECAO,
  QUIZ_M4_CONDICIONAL,
  QUIZ_M5_BINOMIAL,
  QUIZ_M6_COMPLEMENTAR,
  QUIZ_M7_GEOMETRICA,
  QUIZ_M8_INDEPENDENCIA,
  QUIZ_M9_PETROBRASESPECIFICO,
  QUIZ_M10_SIMULADO_MESTRE,
} from "./data/probabilidade-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Fundamentos" },
  { id: "modulo-2", label: "Módulo 2", title: "Lei de Laplace" },
  { id: "modulo-3", label: "Módulo 3", title: "União e Interseção" },
  { id: "modulo-4", label: "Módulo 4", title: "Probabilidade Condicional" },
  { id: "modulo-5", label: "Módulo 5", title: "Probabilidade Binomial" },
  { id: "modulo-6", label: "Módulo 6", title: "Complementar" },
  { id: "modulo-7", label: "Módulo 7", title: "Probabilidade Geométrica" },
  { id: "modulo-8", label: "Módulo 8", title: "Independência" },
  { id: "modulo-9", label: "Módulo 9", title: "Engenharia de Riscos" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
] as const;

const mv = Array.from({ length: 11 }, (_, i) => getModuleVariant(i));

export default function AulaProbabilidade({
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

  const [quizM1] = useState(() => getRandomQuestions(QUIZ_M1_FUNDAMENTOS, 4));
  const [quizM2] = useState(() => getRandomQuestions(QUIZ_M2_LAPLACE, 4));
  const [quizM3] = useState(() => getRandomQuestions(QUIZ_M3_UNIAO_INTERSECAO, 4));
  const [quizM4] = useState(() => getRandomQuestions(QUIZ_M4_CONDICIONAL, 5));
  const [quizM5] = useState(() => getRandomQuestions(QUIZ_M5_BINOMIAL, 5));
  const [quizM6] = useState(() => getRandomQuestions(QUIZ_M6_COMPLEMENTAR, 5));
  const [quizM7] = useState(() => getRandomQuestions(QUIZ_M7_GEOMETRICA, 5));
  const [quizM8] = useState(() => getRandomQuestions(QUIZ_M8_INDEPENDENCIA, 5));
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
      titulo={titulo || "Probabilidade"}
      descricao={
        descricao ||
        "Do acaso à certeza: domine as leis que regem os eventos aleatórios."
      }
      duracao={duracao || "45 min"}
      materiaNome={materiaNome || "Matemática"}
      materiaCor={materiaCor || "bg-brand-primary"}
      materiaId={materiaId || "matematica"}
      isCompleted={!!isCompleted}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
      currentProgress={currentProgress}
      onComplete={onComplete}
      loading={loading}
      xpGanho={xpGanho}
    >
      {/* ═══ MÓDULO 1: FUNDAMENTOS ═══ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={1}
            titulo="Fundamentos da Probabilidade"
            descricao="O alicerce: experimentos aleatórios, espaço amostral e eventos."
             variant={mv[1]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Base Intelectual"
              description="Terminologias que a banca adora cobrar."
              variant={mv[1]}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Experimento Aleatório",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        É qualquer processo repetível onde o resultado é governado pelo acaso. Repetir sob as mesmas condições NÃO garante o mesmo resultado.
                      </p>
                      <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
                        <p className="text-xl text-foreground/85 leading-relaxed"><strong>Exemplos:</strong></p>
                        <ul className="text-xl space-y-1 mt-2 list-disc pl-5 text-foreground/85 leading-relaxed">
                          <li>Lançar uma moeda</li>
                          <li>Rolar um dado</li>
                          <li>Sortear uma carta do baralho</li>
                          <li>Teste de falha de equipamento</li>
                        </ul>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Espaço Amostral",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Conjunto de TODOS os resultados possíveis. Se esquecer um, sua probabilidade fica errada!
                      </p>
                      <div className="bg-blue-500/10 p-4 rounded border border-blue-500/20">
                        <p className="font-bold text-blue-700 text-xl mb-2 text-foreground/85 leading-relaxed">Lançar moeda 2 vezes:</p>
                        <p className="font-mono text-lg text-foreground/85 leading-relaxed text-center">S = {"{(Cara,Cara), (Cara,Coroa), (Coroa,Cara), (Coroa,Coroa)}"}</p>
                        <p className="text-lg text-foreground/85 leading-relaxed text-center mt-1">n(S) = 4</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Evento",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="info" titulo="Evento = Subconjunto de S">
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          É qualquer resultado ou conjunto de resultados que nos interessa.
                        </p>
                      </AlertBox>
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Ex: "tirar cara" no lançamento de moeda é um evento dentro do espaço amostral.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Evento Certo e Impossível",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20">
                        <p className="font-bold text-blue-700 text-xl mb-1 text-foreground/85 leading-relaxed">Evento Certo:</p>
                        <p className="text-lg text-foreground/85 leading-relaxed">É todo o espaço amostral. P = 1 (100%)</p>
                      </div>
                      <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20">
                        <p className="font-bold text-blue-700 text-xl mb-1 text-foreground/85 leading-relaxed">Evento Impossível:</p>
                        <p className="text-lg text-foreground/85 leading-relaxed">Não existe em S. P = 0 (0%)</p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-1" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={"blue"}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Uma urna contém 4 bolas vermelhas e 6 bolas azuis. Retirando-se uma bola ao acaso, qual a probabilidade de ela ser vermelha?"
          alternativas={[
            { letra: "A", texto: "1/4", correta: false },
              { letra: "B", texto: "2/5", correta: false },
              { letra: "C", texto: "3/5", correta: false },
              { letra: "D", texto: "2/3", correta: false },
              { letra: "E", texto: "4/6", correta: false }
          ]}
          dicaEstrategica="A opção E (4/6) é o erro clássico de usar apenas as azuis no denominador."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Pela Lei de Laplace, P(A) = n(A) / n(S)." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "n(A) = 4 bolas vermelhas; n(S) = 4 + 6 = 10 bolas no total." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "P(vermelha) = 4/10 = 2/5." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            variant={mv[1]}
            resumoVisual={{
              moduloNome: "Módulo 1",
              tituloAula: "Probabilidade",
              materia: "Matemática",
              images: [
                {
                  title: "Experimento Aleatório",
                  type: "Conceito",
                  placeholderColor: "bg-blue-500/20",
                },
                {
                  title: "Espaço Amostral S",
                  type: "Técnica",
                  placeholderColor: "bg-indigo-500/20",
                },
                {
                  title: "Evento E ⊆ S",
                  type: "Aplicação",
                  placeholderColor: "bg-purple-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Lembre: S é Tudo!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-xl italic text-foreground/85 leading-relaxed">
                    "Experimento aleatório → espaço amostral S → eventos são subconjuntos"
                  </p>
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg font-mono text-lg text-foreground/85 leading-relaxed text-center">
                    <p>Lançar 1 dado</p>
                    <p className="text-lg text-foreground/85 leading-relaxed">S = {"{1,2,3,4,5,6}"}</p>
                    <p>Evento: tirar par = {"{2,4,6}"}</p>
                  </div>
                </div>
              ),
            }}
            podcast={{
            aulaId: "probabilidade",
            aulaTitulo: "Probabilidade",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 1,
            moduloTitulo: "Módulo 1",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                      <QuizInterativo
              questoes={quizM1}
              titulo="QUIZ: Fundamentos"
              numero={3}
              variant={mv[1]}
              icone="🧠"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 2: LEI DE LAPLACE ═══ */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={2}
            titulo="Lei de Laplace"
            descricao="P(E) = (casos favoráveis) / (casos totais). A fórmula mágica!"
             variant={mv[2]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Fórmula da Probabilidade"
              description="Quando todos os eventos são igualmente prováveis."
              variant={mv[2]}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - A Fórmula",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Lei de Laplace (espaços uniformes):
                      </p>
                      <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                        <p className="font-mono font-bold text-center text-emerald-700 mb-2">
                          P(E) = n(E) / n(S)
                        </p>
                        <p className="text-xl text-center text-foreground/85 leading-relaxed">
                          (favoráveis) / (totais)
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Prática",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Qual é a probabilidade de tirar um número par ao lançar um dado?
                      </p>
                      <div className="bg-emerald-500/10 p-4 rounded border border-emerald-500/20">
                        <p className="font-mono text-lg text-foreground/85 leading-relaxed text-center">
                          E = {"{2, 4, 6}"} → n(E) = 3
                          <br />
                          S = {"{1,2,3,4,5,6}"} → n(S) = 6
                          <br />
                          P(E) = 3/6 = 1/2 = 50%
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Simplificar Frações",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="info" titulo="Sempre Simplificar">
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          3/6 = 1/2. 0,5 = 50%. Use a forma mais clara!
                        </p>
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Probabilidade Não-Uniforme",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <div className="bg-emerald-500/10 p-3 rounded border border-emerald-500/20">
                        <p className="font-bold text-emerald-700 text-xl mb-1 text-foreground/85 leading-relaxed">
                          Moeda ou Dado Viciado:
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                          Lei de Laplace não se aplica! Usa-se frequência relativa.
                        </p>
                      </div>
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
          enunciado="Uma urna contém 4 bolas vermelhas e 6 bolas azuis. Retirando-se uma bola ao acaso, qual a probabilidade de ela ser vermelha?"
          alternativas={[
            { letra: "A", texto: "1/4", correta: false },
              { letra: "B", texto: "2/5", correta: false },
              { letra: "C", texto: "3/5", correta: false },
              { letra: "D", texto: "2/3", correta: false },
              { letra: "E", texto: "4/6", correta: false }
          ]}
          dicaEstrategica="A opção E (4/6) é o erro clássico de usar apenas as azuis no denominador."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Pela Lei de Laplace, P(A) = n(A) / n(S)." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "n(A) = 4 bolas vermelhas; n(S) = 4 + 6 = 10 bolas no total." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "P(vermelha) = 4/10 = 2/5." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            variant={mv[2]}
            resumoVisual={{
              moduloNome: "Módulo 2",
              tituloAula: "Probabilidade",
              materia: "Matemática",
              images: [
                {
                  title: "Fórmula: P(E) = n(E)/n(S)",
                  type: "Conceito",
                  placeholderColor: "bg-emerald-500/20",
                },
                {
                  title: "Conte Casos Favoráveis",
                  type: "Técnica",
                  placeholderColor: "bg-teal-500/20",
                },
                {
                  title: "Divida por Casos Totais",
                  type: "Aplicação",
                  placeholderColor: "bg-cyan-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Laplace: Conte e Divida!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-xl italic text-foreground/85 leading-relaxed">
                    "Quantos te interessam dividido por quantos existem"
                  </p>
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg font-mono text-lg text-foreground/85 leading-relaxed text-center">
                    <p>Tirar ás de baralho?</p>
                    <p className="text-lg text-foreground/85 leading-relaxed">4 ases</p>
                    <p className="text-lg text-foreground/85 leading-relaxed">52 cartas</p>
                    <p>P = 4/52 = 1/13</p>
                  </div>
                </div>
              ),
            }}
            podcast={{
            aulaId: "probabilidade",
            aulaTitulo: "Probabilidade",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 2,
            moduloTitulo: "Módulo 2",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                      <QuizInterativo
              questoes={quizM2}
              titulo="QUIZ: Lei de Laplace"
              numero={3}
              variant={mv[2]}
              icone="🎯"
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 3: UNIÃO E INTERSEÇÃO ═══ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={3}
            titulo="União e Interseção de Eventos"
            descricao="Quando combinar probabilidades: regra da adição."
             variant={mv[3]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Operações Entre Eventos"
              description="OU = União (+), E = Interseção (×)."
              variant={mv[3]}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - União (E₁ ∪ E₂)",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        P(E₁ ∪ E₂) = ocorre E₁ OU E₂ (ou ambos). Cuidado: pode haver sobreposição!
                      </p>
                      <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20">
                        <p className="font-mono font-bold text-center text-amber-700 mb-2">
                          P(E₁ ∪ E₂) = P(E₁) + P(E₂) - P(E₁ ∩ E₂)
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed text-center">
                          (subtraia interseção para não contar duas vezes!)
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Problema Típico",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Probabilidade de tirar uma carta que é ÁS ou VERMELHA:
                      </p>
                      <div className="bg-amber-500/10 p-4 rounded border border-amber-500/20">
                        <p className="text-lg text-foreground/85 leading-relaxed font-mono text-center">
                          P(Ás) = 4/52
                          <br />
                          P(Vermelha) = 26/52
                          <br />
                          P(Ás ∩ Vermelha) = 2/52 (ás de copas, ás de ouro)
                          <br />
                          P(Ás ∪ Vermelha) = 4/52 + 26/52 - 2/52 = 28/52
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Eventos Disjuntos",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="info" titulo="Se E₁ ∩ E₂ = ∅">
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          Eventos não se sobrepõem! P(E₁ ∪ E₂) = P(E₁) + P(E₂)
                        </p>
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Interseção (E₁ ∩ E₂)",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <div className="bg-amber-500/10 p-3 rounded border border-amber-500/20">
                        <p className="font-bold text-amber-700 text-xl mb-1 text-foreground/85 leading-relaxed">
                          P(E₁ ∩ E₂) = ambos ocorrem
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                          Requer eventos conectados (correlação de dados)
                        </p>
                      </div>
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
          enunciado="Uma urna contém 4 bolas vermelhas e 6 bolas azuis. Retirando-se uma bola ao acaso, qual a probabilidade de ela ser vermelha?"
          alternativas={[
            { letra: "A", texto: "1/4", correta: false },
              { letra: "B", texto: "2/5", correta: false },
              { letra: "C", texto: "3/5", correta: false },
              { letra: "D", texto: "2/3", correta: false },
              { letra: "E", texto: "4/6", correta: false }
          ]}
          dicaEstrategica="A opção E (4/6) é o erro clássico de usar apenas as azuis no denominador."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Pela Lei de Laplace, P(A) = n(A) / n(S)." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "n(A) = 4 bolas vermelhas; n(S) = 4 + 6 = 10 bolas no total." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "P(vermelha) = 4/10 = 2/5." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            variant={mv[3]}
            resumoVisual={{
              moduloNome: "Módulo 3",
              tituloAula: "Probabilidade",
              materia: "Matemática",
              images: [
                {
                  title: "P(E₁ ∪ E₂) = Soma - Interseção",
                  type: "Conceito",
                  placeholderColor: "bg-amber-500/20",
                },
                {
                  title: "Cuidado com Sobreposição",
                  type: "Técnica",
                  placeholderColor: "bg-orange-500/20",
                },
                {
                  title: "Eventos Disjuntos",
                  type: "Aplicação",
                  placeholderColor: "bg-yellow-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "União: Não Conte 2 Vezes!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-xl italic text-foreground/85 leading-relaxed">
                    "Se pode ocorrer em comum, subtraia a interseção"
                  </p>
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg font-mono text-lg text-foreground/85 leading-relaxed text-center">
                    <p>Moeda: cara OU número &lt; 5?</p>
                    <p className="text-lg text-foreground/85 leading-relaxed">
                      1/2 + 4/6 - 2/6 = ?
                    </p>
                    <p>Se disjuntos: 1/2 + 1/3</p>
                  </div>
                </div>
              ),
            }}
            podcast={{
            aulaId: "probabilidade",
            aulaTitulo: "Probabilidade",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 3,
            moduloTitulo: "Módulo 3",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                      <QuizInterativo
              questoes={quizM3}
              titulo="QUIZ: União e Interseção"
              numero={3}
              variant={mv[3]}
              icone="🎯"
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 4-10: ESTRUTURA SIMILAR ═══ */}
      {/* Para brevidade, incluindo versões simplificadas dos módulos 4-10 */}

      {/* MÓDULO 4: CONDICIONAL */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={4}
            titulo="Probabilidade Condicional"
            descricao="P(A|B) = Quando um evento depende de outro ter ocorrido."
             variant={mv[4]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Eventos Dependentes"
              description="A probabilidade muda quando há informação prévia."
              variant={mv[4]}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Probabilidade Condicional",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        P(A|B) = "Probabilidade de A acontecer dado que B já aconteceu"
                      </p>
                      <div className="bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20">
                        <p className="font-mono font-bold text-center text-cyan-700 mb-2">
                          P(A|B) = P(A ∩ B) / P(B)
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Prática",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Duas cartas do baralho. Qual P(2ª vermelha | 1ª vermelha)?
                      </p>
                      <div className="bg-cyan-500/10 p-4 rounded border border-cyan-500/20">
                        <p className="text-lg text-foreground/85 leading-relaxed font-mono text-center">
                          Após tirar vermelha, restam 51 cartas (25 vermelhas)
                          <br />
                          P = 25/51 (não é mais 26/52!)
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Independência",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="info" titulo="Se P(A|B) = P(A)">
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          Então A e B são independentes! Um não afeta o outro.
                        </p>
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Multiplicação",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <div className="bg-cyan-500/10 p-3 rounded border border-cyan-500/20">
                        <p className="font-bold text-cyan-700 text-xl mb-1 text-foreground/85 leading-relaxed">
                          P(A ∩ B) = P(A) × P(B|A)
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                          Probabilidade de ambos ocorrerem em sequência
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-4" className="mt-16">
          













        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[4]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Uma urna contém 4 bolas vermelhas e 6 bolas azuis. Retirando-se uma bola ao acaso, qual a probabilidade de ela ser vermelha?"
          alternativas={[
            { letra: "A", texto: "1/4", correta: false },
              { letra: "B", texto: "2/5", correta: false },
              { letra: "C", texto: "3/5", correta: false },
              { letra: "D", texto: "2/3", correta: false },
              { letra: "E", texto: "4/6", correta: false }
          ]}
          dicaEstrategica="A opção E (4/6) é o erro clássico de usar apenas as azuis no denominador."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Pela Lei de Laplace, P(A) = n(A) / n(S)." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "n(A) = 4 bolas vermelhas; n(S) = 4 + 6 = 10 bolas no total." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "P(vermelha) = 4/10 = 2/5." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            variant={mv[4]}
            resumoVisual={{
              moduloNome: "Módulo 4",
              tituloAula: "Probabilidade",
              materia: "Matemática",
              images: [
                {
                  title: "P(A|B) = P(A∩B)/P(B)",
                  type: "Conceito",
                  placeholderColor: "bg-cyan-500/20",
                },
                {
                  title: "Dado que B ocorreu",
                  type: "Técnica",
                  placeholderColor: "bg-sky-500/20",
                },
                {
                  title: "Multiplicação de Eventos",
                  type: "Aplicação",
                  placeholderColor: "bg-blue-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: 'Condicional: "Dado que"!',
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-xl italic text-foreground/85 leading-relaxed">
                    "P(A|B) muda o espaço amostral para apenas B"
                  </p>
                  <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg font-mono text-lg text-foreground/85 leading-relaxed text-center">
                    <p>Chuva? P(sim) = 1/3</p>
                    <p className="text-lg text-foreground/85 leading-relaxed">
                      P(sim|nuvem) = ?
                    </p>
                    <p>Novo espaço: "nuvem, nublado"</p>
                  </div>
                </div>
              ),
            }}
            podcast={{
            aulaId: "probabilidade",
            aulaTitulo: "Probabilidade",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 4,
            moduloTitulo: "Módulo 4",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                      <QuizInterativo
              questoes={quizM4}
              titulo="QUIZ: Probabilidade Condicional"
              numero={3}
              variant={mv[4]}
              icone="🎯"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 5: BINOMIAL ═══ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={5}
            titulo="Distribuição Binomial"
            descricao="Repetir n tentativas de 2 resultados (sucesso/fracasso)."
             variant={mv[5]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Experimentos Repetidos"
              description="Exatamente k sucessos em n tentativas."
              variant={mv[5]}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Binomial",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Repetir n vezes um experimento com 2 resultados (sucesso = p, fracasso = 1-p):
                      </p>
                      <div className="bg-violet-500/10 p-4 rounded-xl border border-violet-500/20">
                        <p className="font-mono font-bold text-center text-violet-700 mb-2">
                          P(X = k) = C(n,k) × p^k × (1-p)^(n-k)
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Moeda 4 Vezes",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Qual P(exatamente 3 caras em 4 lançamentos)?
                      </p>
                      <div className="bg-violet-500/10 p-4 rounded border border-violet-500/20">
                        <p className="text-lg text-foreground/85 leading-relaxed font-mono text-center">
                          C(4,3) × (1/2)³ × (1/2)¹ = 4 × 1/8 × 1/2 = 1/4 = 25%
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Combinações",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="info" titulo="C(n,k) = n! / (k!(n-k)!)">
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          Número de formas de escolher k de n elementos
                        </p>
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Casos Especiais",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <div className="bg-violet-500/10 p-3 rounded border border-violet-500/20">
                        <p className="font-bold text-violet-700 text-xl mb-1 text-foreground/85 leading-relaxed">
                          Pelo Menos k: somam probabilidades
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">P(X ≥ k) = P(X=k) + P(X=k+1) + ...</p>
                      </div>
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
          enunciado="Uma urna contém 4 bolas vermelhas e 6 bolas azuis. Retirando-se uma bola ao acaso, qual a probabilidade de ela ser vermelha?"
          alternativas={[
            { letra: "A", texto: "1/4", correta: false },
              { letra: "B", texto: "2/5", correta: false },
              { letra: "C", texto: "3/5", correta: false },
              { letra: "D", texto: "2/3", correta: false },
              { letra: "E", texto: "4/6", correta: false }
          ]}
          dicaEstrategica="A opção E (4/6) é o erro clássico de usar apenas as azuis no denominador."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Pela Lei de Laplace, P(A) = n(A) / n(S)." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "n(A) = 4 bolas vermelhas; n(S) = 4 + 6 = 10 bolas no total." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "P(vermelha) = 4/10 = 2/5." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            variant={mv[5]}
            resumoVisual={{
              moduloNome: "Módulo 5",
              tituloAula: "Probabilidade",
              materia: "Matemática",
              images: [
                {
                  title: "n tentativas, k sucessos",
                  type: "Conceito",
                  placeholderColor: "bg-violet-500/20",
                },
                {
                  title: "C(n,k) × p^k × (1-p)^(n-k)",
                  type: "Técnica",
                  placeholderColor: "bg-purple-500/20",
                },
                {
                  title: "Repetições Independentes",
                  type: "Aplicação",
                  placeholderColor: "bg-fuchsia-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Binomial: Combinação × Potências!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-xl italic text-foreground/85 leading-relaxed">
                    "Quantas maneiras × chance de cada maneira"
                  </p>
                  <div className="p-3 bg-violet-500/10 border border-violet-500/20 rounded-lg font-mono text-lg text-foreground/85 leading-relaxed text-center">
                    <p>3 dados, todos 6?</p>
                    <p className="text-lg text-foreground/85 leading-relaxed">
                      C(3,3) × (1/6)³
                    </p>
                    <p>= 1 × 1/216 = 0.46%</p>
                  </div>
                </div>
              ),
            }}
            podcast={{
            aulaId: "probabilidade",
            aulaTitulo: "Probabilidade",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 5,
            moduloTitulo: "Módulo 5",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                      <QuizInterativo
              questoes={quizM5}
              titulo="QUIZ: Probabilidade Binomial"
              numero={3}
              variant={mv[5]}
              icone="🧠"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 6: COMPLEMENTAR ═══ */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={6}
            titulo="Evento Complementar"
            descricao="P(Eᶜ) = 1 - P(E). O atalho mais lindo!"
             variant={mv[6]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Negação de Eventos"
              description="Às vezes é mais fácil calcular o oposto."
              variant={mv[6]}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Complementar",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Eᶜ = "NÃO ocorre E". Sempre: P(E) + P(Eᶜ) = 1
                      </p>
                      <div className="bg-teal-500/10 p-4 rounded-xl border border-teal-500/20">
                        <p className="font-mono font-bold text-center text-teal-700 mb-2">
                          P(Eᶜ) = 1 - P(E)
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Aplicação Prática",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Qual P(pelo menos um 6 em 3 dados)? Calcule o oposto!
                      </p>
                      <div className="bg-teal-500/10 p-4 rounded border border-teal-500/20">
                        <p className="text-lg text-foreground/85 leading-relaxed font-mono text-center">
                          P(nenhum 6) = (5/6)³ = 125/216
                          <br />
                          P(pelo menos um) = 1 - 125/216 = 91/216
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Quando Usar",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="info" titulo='"Pelo Menos" = Complementar!'>
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          "Pelo menos 1" é mais fácil como "não zero"
                        </p>
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Sempre Válido",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <div className="bg-teal-500/10 p-3 rounded border border-teal-500/20">
                        <p className="font-bold text-teal-700 text-xl mb-1 text-foreground/85 leading-relaxed">
                          Universalidade:
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                          Funciona SEMPRE, sem restrições!
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
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
          enunciado="Uma urna contém 4 bolas vermelhas e 6 bolas azuis. Retirando-se uma bola ao acaso, qual a probabilidade de ela ser vermelha?"
          alternativas={[
            { letra: "A", texto: "1/4", correta: false },
              { letra: "B", texto: "2/5", correta: false },
              { letra: "C", texto: "3/5", correta: false },
              { letra: "D", texto: "2/3", correta: false },
              { letra: "E", texto: "4/6", correta: false }
          ]}
          dicaEstrategica="A opção E (4/6) é o erro clássico de usar apenas as azuis no denominador."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Pela Lei de Laplace, P(A) = n(A) / n(S)." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "n(A) = 4 bolas vermelhas; n(S) = 4 + 6 = 10 bolas no total." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "P(vermelha) = 4/10 = 2/5." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            variant={mv[6]}
            resumoVisual={{
              moduloNome: "Módulo 6",
              tituloAula: "Probabilidade",
              materia: "Matemática",
              images: [
                {
                  title: "P(E) + P(Eᶜ) = 1",
                  type: "Conceito",
                  placeholderColor: "bg-teal-500/20",
                },
                {
                  title: "Calcule o Oposto",
                  type: "Técnica",
                  placeholderColor: "bg-cyan-500/20",
                },
                {
                  title: "Subtraia de 1",
                  type: "Aplicação",
                  placeholderColor: "bg-blue-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Complementar: O Atalho!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-xl italic text-foreground/85 leading-relaxed">
                    ""Pelo menos" é quase sempre P = 1 - P(oposto)"
                  </p>
                  <div className="p-3 bg-teal-500/10 border border-teal-500/20 rounded-lg font-mono text-lg text-foreground/85 leading-relaxed text-center">
                    <p>Moeda 5x, pelo menos 1 cara?</p>
                    <p className="text-lg text-foreground/85 leading-relaxed">
                      = 1 - P(todas coroas)
                    </p>
                    <p>= 1 - (1/2)⁵ = 31/32</p>
                  </div>
                </div>
              ),
            }}
            podcast={{
            aulaId: "probabilidade",
            aulaTitulo: "Probabilidade",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 6,
            moduloTitulo: "Módulo 6",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                      <QuizInterativo
              questoes={quizM6}
              titulo="QUIZ: Complementar"
              numero={3}
              variant={mv[6]}
              icone="🎯"
              onComplete={(score) => handleModuleComplete("modulo-6", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* MÓDULO 7: GEOMÉTRICA */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={7}
            titulo="Probabilidade Geométrica"
            descricao="Razão de áreas/comprimentos para eventos contínuos."
             variant={mv[7]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Eventos Contínuos"
              description="Quando o espaço amostral é infinito."
              variant="indigo"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Geométrica",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        P(E) = (medida favorable) / (medida total). Aplicada a geometria!
                      </p>
                      <div className="bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20">
                        <p className="font-mono font-bold text-center text-indigo-700 mb-2">
                          P(E) = Área(E) / Área(S)
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Alvo",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Círculo dentro de quadrado. Qual P(acerta o círculo)?
                      </p>
                      <div className="bg-indigo-500/10 p-4 rounded border border-indigo-500/20">
                        <p className="text-lg text-foreground/85 leading-relaxed font-mono text-center">
                          Área círculo = πr²
                          <br />
                          Área quadrado = L²
                          <br />
                          P = πr² / L²
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Simetria",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="info" titulo="Desenhe!">
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          Geométrica exige visualização. Desenhe e calcule áreas.
                        </p>
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Dimensões",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <div className="bg-indigo-500/10 p-3 rounded border border-indigo-500/20">
                        <p className="font-bold text-indigo-700 text-xl mb-1 text-foreground/85 leading-relaxed">
                          1D: comprimento / comprimento
                        </p>
                        <p className="font-bold text-indigo-700 text-xl mb-1 text-foreground/85 leading-relaxed">
                          2D: área / área
                        </p>
                        <p className="font-bold text-indigo-700 text-xl text-foreground/85 leading-relaxed">
                          3D: volume / volume
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
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
          enunciado="Uma urna contém 4 bolas vermelhas e 6 bolas azuis. Retirando-se uma bola ao acaso, qual a probabilidade de ela ser vermelha?"
          alternativas={[
            { letra: "A", texto: "1/4", correta: false },
              { letra: "B", texto: "2/5", correta: false },
              { letra: "C", texto: "3/5", correta: false },
              { letra: "D", texto: "2/3", correta: false },
              { letra: "E", texto: "4/6", correta: false }
          ]}
          dicaEstrategica="A opção E (4/6) é o erro clássico de usar apenas as azuis no denominador."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Pela Lei de Laplace, P(A) = n(A) / n(S)." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "n(A) = 4 bolas vermelhas; n(S) = 4 + 6 = 10 bolas no total." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "P(vermelha) = 4/10 = 2/5." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            variant="indigo"
            resumoVisual={{
              moduloNome: "Módulo 7",
              tituloAula: "Probabilidade",
              materia: "Matemática",
              images: [
                {
                  title: "P(E) = Área(E)/Área(S)",
                  type: "Conceito",
                  placeholderColor: "bg-indigo-500/20",
                },
                {
                  title: "Razão de Figuras",
                  type: "Técnica",
                  placeholderColor: "bg-blue-500/20",
                },
                {
                  title: "Comprimento ou Área",
                  type: "Aplicação",
                  placeholderColor: "bg-purple-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Geométrica: Desenhe e Divida!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-xl italic text-foreground/85 leading-relaxed">
                    "Sempre uma razão entre medidas (área, comprimento, volume)"
                  </p>
                  <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg font-mono text-lg text-foreground/85 leading-relaxed text-center">
                    <p>Ponto em [0,10]?</p>
                    <p className="text-lg text-foreground/85 leading-relaxed">
                      P(em [3,7])
                    </p>
                    <p>= (7-3)/(10-0) = 4/10</p>
                  </div>
                </div>
              ),
            }}
            podcast={{
            aulaId: "probabilidade",
            aulaTitulo: "Probabilidade",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 7,
            moduloTitulo: "Módulo 7",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                      <QuizInterativo
              questoes={quizM7}
              titulo="QUIZ: Probabilidade Geométrica"
              numero={3}
              variant="indigo"
              icone="🎯"
              onComplete={(score) => handleModuleComplete("modulo-7", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* MÓDULO 8: INDEPENDÊNCIA */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={8}
            titulo="Independência de Eventos"
            descricao="Quando P(A ∩ B) = P(A) × P(B). Nenhuma interferência!"
             variant={mv[8]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Eventos Sem Correlação"
              description="Multiplicação simples: P(A e B) = P(A) × P(B)."
              variant={mv[8]}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Independência",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        A e B são independentes se um não afeta a probabilidade do outro:
                      </p>
                      <div className="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20">
                        <p className="font-mono font-bold text-center text-rose-700 mb-2">
                          P(A ∩ B) = P(A) × P(B)
                        </p>
                        <p className="text-xl text-center text-foreground/85 leading-relaxed">
                          (ou P(A|B) = P(A))
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - 2 Moedas",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Qual P(moeda 1 cara E moeda 2 cara)?
                      </p>
                      <div className="bg-rose-500/10 p-4 rounded border border-rose-500/20">
                        <p className="text-lg text-foreground/85 leading-relaxed font-mono text-center">
                          P(cara) = 1/2
                          <br />
                          P(cara E cara) = 1/2 × 1/2 = 1/4
                          <br />
                          (não é 1/2 + 1/2!)
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Identificar Independência",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="info" titulo="Sinais de Independência">
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          Moedas diferentes, dados diferentes, reposição em sorteios.
                        </p>
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Dependência",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <div className="bg-rose-500/10 p-3 rounded border border-rose-500/20">
                        <p className="font-bold text-rose-700 text-xl mb-1 text-foreground/85 leading-relaxed">
                          SEM Reposição:
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                          Probabilidade muda após cada sorteio (dependência!)
                        </p>
                      </div>
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
          enunciado="Uma urna contém 4 bolas vermelhas e 6 bolas azuis. Retirando-se uma bola ao acaso, qual a probabilidade de ela ser vermelha?"
          alternativas={[
            { letra: "A", texto: "1/4", correta: false },
              { letra: "B", texto: "2/5", correta: false },
              { letra: "C", texto: "3/5", correta: false },
              { letra: "D", texto: "2/3", correta: false },
              { letra: "E", texto: "4/6", correta: false }
          ]}
          dicaEstrategica="A opção E (4/6) é o erro clássico de usar apenas as azuis no denominador."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Pela Lei de Laplace, P(A) = n(A) / n(S)." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "n(A) = 4 bolas vermelhas; n(S) = 4 + 6 = 10 bolas no total." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "P(vermelha) = 4/10 = 2/5." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            variant={mv[8]}
            resumoVisual={{
              moduloNome: "Módulo 8",
              tituloAula: "Probabilidade",
              materia: "Matemática",
              images: [
                {
                  title: "P(A∩B) = P(A)×P(B)",
                  type: "Conceito",
                  placeholderColor: "bg-rose-500/20",
                },
                {
                  title: "Um não afeta o outro",
                  type: "Técnica",
                  placeholderColor: "bg-red-500/20",
                },
                {
                  title: "Multiplicação Direta",
                  type: "Aplicação",
                  placeholderColor: "bg-pink-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Independência: Multiplica!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-xl italic text-foreground/85 leading-relaxed">
                    "Eventos independentes se multiplicam, não se somam"
                  </p>
                  <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg font-mono text-lg text-foreground/85 leading-relaxed text-center">
                    <p>2 dados: ambos 6?</p>
                    <p className="text-lg text-foreground/85 leading-relaxed">
                      1/6 × 1/6
                    </p>
                    <p>= 1/36 ≈ 2.8%</p>
                  </div>
                </div>
              ),
            }}
            podcast={{
            aulaId: "probabilidade",
            aulaTitulo: "Probabilidade",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 8,
            moduloTitulo: "Módulo 8",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                      <QuizInterativo
              questoes={quizM8}
              titulo="QUIZ: Independência"
              numero={3}
              variant={mv[8]}
              icone="🎯"
              onComplete={(score) => handleModuleComplete("modulo-8", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* MÓDULO 9: PETROBRAS */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={9}
            titulo="Engenharia de Riscos (Petrobras)"
            descricao="Confiabilidade, falhas e estratégias de redundância."
             variant={mv[9]}/>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Probabilidade na Indústria"
              description="Análise de risco e confiabilidade de sistemas."
              variant={mv[9]}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Confiabilidade",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Confiabilidade = probabilidade de um sistema funcionar sem falhas durante um período.
                      </p>
                      <div className="bg-orange-500/10 p-4 rounded-xl border border-orange-500/20">
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          <strong>Exemplo Petrobras:</strong> Plataforma marítima com 3 bombas. Cada tem 95% de confiabilidade.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Redundância",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-xl text-foreground/85 leading-relaxed">
                        Qual P(sistema funcionar com 2 de 3 bombas)?
                      </p>
                      <div className="bg-orange-500/10 p-4 rounded border border-orange-500/20">
                        <p className="text-lg text-foreground/85 leading-relaxed font-mono text-center">
                          P(pelo menos 2 funcionam)
                          <br />
                          = C(3,2)×(0.95)²×(0.05)¹ + C(3,3)×(0.95)³
                          <br />
                          ≈ 99.3%
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Árvore de Falhas",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="info" titulo="Sistema em Série vs Paralelo">
                        <p className="text-xl text-foreground/85 leading-relaxed">
                          Série: todos devem funcionar (multiplica). Paralelo: pelo menos um (complementar)!
                        </p>
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Eventos Correlacionados",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <div className="bg-orange-500/10 p-3 rounded border border-orange-500/20">
                        <p className="font-bold text-orange-700 text-xl mb-1 text-foreground/85 leading-relaxed">
                          Causa Comum:
                        </p>
                        <p className="text-lg text-foreground/85 leading-relaxed">
                          Bombas podem falhar juntas se há falha elétrica
                        </p>
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
          variant={mv[9]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Uma urna contém 4 bolas vermelhas e 6 bolas azuis. Retirando-se uma bola ao acaso, qual a probabilidade de ela ser vermelha?"
          alternativas={[
            { letra: "A", texto: "1/4", correta: false },
              { letra: "B", texto: "2/5", correta: false },
              { letra: "C", texto: "3/5", correta: false },
              { letra: "D", texto: "2/3", correta: false },
              { letra: "E", texto: "4/6", correta: false }
          ]}
          dicaEstrategica="A opção E (4/6) é o erro clássico de usar apenas as azuis no denominador."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Pela Lei de Laplace, P(A) = n(A) / n(S)." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "n(A) = 4 bolas vermelhas; n(S) = 4 + 6 = 10 bolas no total." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "P(vermelha) = 4/10 = 2/5." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            variant={mv[9]}
            resumoVisual={{
              moduloNome: "Módulo 9",
              tituloAula: "Probabilidade",
              materia: "Matemática",
              images: [
                {
                  title: "Confiabilidade de Sistemas",
                  type: "Conceito",
                  placeholderColor: "bg-orange-500/20",
                },
                {
                  title: "Redundância e Failover",
                  type: "Técnica",
                  placeholderColor: "bg-red-500/20",
                },
                {
                  title: "Análise de Risco",
                  type: "Aplicação",
                  placeholderColor: "bg-amber-500/20",
                },
              ],
            }}
            maceteVisual={{
              title: "Riscos: Série vs Paralelo!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-xl italic text-foreground/85 leading-relaxed">
                    "Série: todos funcionam. Paralelo: pelo menos um."
                  </p>
                  <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg font-mono text-lg text-foreground/85 leading-relaxed text-center">
                    <p>2 bombas 99% cada</p>
                    <p className="text-lg text-foreground/85 leading-relaxed">Série: 99×99%</p>
                    <p className="text-lg text-foreground/85 leading-relaxed">
                      Paralelo: 1-(1%)²
                    </p>
                  </div>
                </div>
              ),
            }}
            podcast={{
            aulaId: "probabilidade",
            aulaTitulo: "Probabilidade",
            materia: "Matemática",
            materiaId: "matematica",
            moduloNumero: 9,
            moduloTitulo: "Módulo 9",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                      <QuizInterativo
              questoes={quizM9}
              titulo="QUIZ: Engenharia de Riscos"
              numero={3}
              variant={mv[9]}
              icone="🌊"
              onComplete={(score) => handleModuleComplete("modulo-9", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* MÓDULO 10: SIMULADO */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={10}
            titulo="Simulado Mestre"
            descricao="Teste final: integre todos os conceitos de probabilidade."
             variant={mv[10]}/>

          {showCompletionBadge ? (
            <div className="flex flex-col items-center gap-6 py-10 mt-10">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center animate-bounce">
                <LuTrophy className="w-12 h-12 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black">🏆 Mestre da Probabilidade!</h3>
              <p className="text-center text-muted-foreground max-w-sm">
                Você dominou probabilidade! De fundamentos a engenharia de riscos na Petrobras,
                você está pronto para qualquer desafio probabilístico.
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
          enunciado="Uma urna tem 5 bolas brancas e 3 vermelhas. Retiram-se duas bolas sem reposição. Qual a probabilidade de a primeira ser branca e a segunda ser vermelha?"
          alternativas={[
            { letra: "A", texto: "15/56", correta: false },
                { letra: "B", texto: "5/8", correta: false },
                { letra: "C", texto: "15/64", correta: false },
                { letra: "D", texto: "3/8", correta: false },
                { letra: "E", texto: "15/28", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "P(1ª branca) = 5/8." },
            { titulo: "Passo 2", conteudo: "Dado isso, restam 7 bolas, 3 vermelhas." },
            { titulo: "Passo 3", conteudo: "P(2ª vermelha | 1ª branca) = 3/7. P = (5/8)·(3/7) = 15/56." }
          ]}
        />
        <QuizInterativo
                questoes={quizM10}
                titulo="QUIZ: Simulado Mestre"
                icone="🏆"
                numero={1}
                variant={mv[10]}
                onComplete={(score) => handleModuleComplete("modulo-10", score)}
              />
            </section>
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
