"use client";

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
  TimelineItem,
  ComparisonSide,
  Comparison,
} from "../shared";

import { getModuleVariant } from "@/lib/moduleColors";

import {
  LuBookOpen,
  LuLightbulb,
  LuPlay,
  LuTriangleAlert,
  LuZap,
  LuCircleCheck,
  LuShield,
  LuGraduationCap,
  LuTarget,
} from "react-icons/lu";

import {
  QUIZ_M1_SIMPLE_PRESENT,
  QUIZ_M2_SIMPLE_PAST,
  QUIZ_M3_PRESENT_PERFECT,
  QUIZ_M4_FUTURE_FORMS,
  QUIZ_M5_PASSIVE_VOICE,
  QUIZ_M6_MODAL_VERBS,
  QUIZ_M7_CONDITIONAL_SENTENCES,
  QUIZ_M8_TENSE_REVIEW,
  QUIZ_M9_PETROBRAS_OPERATIONS,
  QUIZ_M10_MESTRE,
} from "./data/verb-tenses-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Simple Present & Present Continuous" },
  { id: "modulo-2", label: "Módulo 2", title: "Simple Past & Past Continuous" },
  { id: "modulo-3", label: "Módulo 3", title: "Present Perfect & Past Perfect" },
  { id: "modulo-4", label: "Módulo 4", title: "Future Forms" },
  { id: "modulo-5", label: "Módulo 5", title: "Passive Voice" },
  { id: "modulo-6", label: "Módulo 6", title: "Modal Verbs" },
  { id: "modulo-7", label: "Módulo 7", title: "Conditional Sentences" },
  { id: "modulo-8", label: "Módulo 8", title: "Tense Review & Error Correction" },
  { id: "modulo-9", label: "Módulo 9", title: "English in Petrobras Operations" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
] as const;

export default function AulaVerbTenses({
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

  const [quizM1, setQuizM1] = useState<typeof QUIZ_M1_SIMPLE_PRESENT>([]);
  const [quizM2, setQuizM2] = useState<typeof QUIZ_M2_SIMPLE_PAST>([]);
  const [quizM3, setQuizM3] = useState<typeof QUIZ_M3_PRESENT_PERFECT>([]);
  const [quizM4, setQuizM4] = useState<typeof QUIZ_M4_FUTURE_FORMS>([]);
  const [quizM5, setQuizM5] = useState<typeof QUIZ_M5_PASSIVE_VOICE>([]);
  const [quizM6, setQuizM6] = useState<typeof QUIZ_M6_MODAL_VERBS>([]);
  const [quizM7, setQuizM7] = useState<typeof QUIZ_M7_CONDITIONAL_SENTENCES>([]);
  const [quizM8, setQuizM8] = useState<typeof QUIZ_M8_TENSE_REVIEW>([]);
  const [quizM9, setQuizM9] = useState<typeof QUIZ_M9_PETROBRAS_OPERATIONS>([]);
  const [quizFinal, setQuizFinal] = useState<typeof QUIZ_M10_MESTRE>([]);

  const [hasSyncedInitial, setHasSyncedInitial] = useState(false);
  const [showCompletionBadge, setShowCompletionBadge] = useState(false);

  useEffect(() => {
    if (isCompleted) setShowCompletionBadge(true);
  }, [isCompleted]);

  useEffect(() => {
    if (!hasSyncedInitial && !loading) {
      setQuizM1(getRandomQuestions(QUIZ_M1_SIMPLE_PRESENT, 8));
      setQuizM2(getRandomQuestions(QUIZ_M2_SIMPLE_PAST, 8));
      setQuizM3(getRandomQuestions(QUIZ_M3_PRESENT_PERFECT, 8));
      setQuizM4(getRandomQuestions(QUIZ_M4_FUTURE_FORMS, 8));
      setQuizM5(getRandomQuestions(QUIZ_M5_PASSIVE_VOICE, 8));
      setQuizM6(getRandomQuestions(QUIZ_M6_MODAL_VERBS, 8));
      setQuizM7(getRandomQuestions(QUIZ_M7_CONDITIONAL_SENTENCES, 8));
      setQuizM8(getRandomQuestions(QUIZ_M8_TENSE_REVIEW, 8));
      setQuizM9(getRandomQuestions(QUIZ_M9_PETROBRAS_OPERATIONS, 8));
      setQuizFinal(getRandomQuestions(QUIZ_M10_MESTRE, 8));
      setHasSyncedInitial(true);
    }
  }, [loading, hasSyncedInitial]);

  const handleModuleComplete = (moduleId: string) => {
    setCompletedModules((prev) => new Set([...prev, moduleId]));
  };

  // Variantes de cor pré-computadas — usa mv[N] ao invés de hardcodar getModuleVariant(N)

  const mv = Object.fromEntries(

    Array.from({ length: 10 }, (_, i) => [i + 1, getModuleVariant(i + 1)])

  ) as Record<number, ReturnType<typeof getModuleVariant>>;


  return (
    <AulaTemplate
      titulo={titulo || "Verb Tenses — Os 7 Tempos Verbais do Inglês"}
      descricao={descricao || "Domine Simple Present, Simple Past, Present Perfect e todos os tempos verbais com exemplos de contexto Petrobras e estratégia CESGRANRIO"}
      duracao={duracao || "15 horas"}
      materiaNome={materiaNome || "Inglês"}
      materiaCor={materiaCor || "from-blue-500 to-cyan-400"}
      materiaId={materiaId || "ingles"}
      modules={MODULE_DEFS}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      completedModules={completedModules}
      isModuleUnlocked={(index) => true}
      onComplete={onComplete}
      isCompleted={isCompleted}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
    >
      <TabsContent value="modulo-1">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={1}
            titulo="Simple Present & Present Continuous"
            variant={mv[1]}
            descricao="Os dois tempos fundamentais do presente: ações permanentes vs ações em andamento"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Fundamentos do Presente em Inglês"
              description="Entender quando usar cada tempo é a chave para textos técnicos precisos"
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                O Simple Present é o tempo dos manuais técnicos, das especificações de equipamento e das rotinas laborais permanentes.
                Segundo Raymond Murphy em "English Grammar in Use", o Simple Present descreve fatos que permanecem verdadeiros por um
                longo período de tempo, incluindo verdades universais e características permanentes de objetos. Quando você diz "The
                pressure relief valve prevents overpressure", você não está descrevendo uma ação que está acontecendo agora — você está
                descrevendo a função permanente deste componente. Esta é a razão pela qual todos os manuais Petrobras usam Simple Present
                exclusivamente. A estrutura é simples: infinitivo para "I, you, we, they" e infinitivo + -s para "he, she, it". Nunca
                "The valve prevent" — sempre "The valve prevents". Este detalhe gramatical é testado obsessivamente em provas CESGRANRIO
                porque mesmo falantes intermediários cometem erros com a terceira pessoa do singular.
              </p>

              <p>
                O Present Continuous, por outro lado, captura ações que estão acontecendo especificamente neste momento. Se você está
                observando algo acontecer agora, use "-ing". A estrutura é "be (am/is/are) + verb-ing". "The pressure is rising rapidly
                right now" descreve não a função do equipamento, mas uma circunstância imediata. O relatório que está sendo redigido AGORA
                usaria Present Continuous: "The team is conducting maintenance on the compressor." A distinção entre "O equipamento funciona"
                (Simple Present) e "O equipamento está funcionando neste momento" (Present Continuous) é frequentemente confusa para aprendizes,
                mas é absolutamente fundamental em contextos onde a precisão importa — como em relatórios técnicos de emergência.
              </p>

              <p>
                State verbs — verbos que descrevem estados mentais ou condições contínuas — NUNCA usam Present Continuous, mesmo que a lógica
                pareça sugerir o contrário. Você não pode dizer "I am knowing English" ou "She is understanding the procedure". Estes verbos
                (know, understand, want, like, believe, own, possess, prefer, seem, appear) descrevem estados, não ações, e portanto nunca
                recebem a marca "-ing". Esta é a pegadinha número um em testes de gramática. Um falante experiente diria "I know English grammar"
                e não "I am knowing English grammar", mesmo que em português a segunda forma pareça natural. A Cambridge Grammar of English classifica
                estes como "stative verbs" precisamente porque descrevem uma condição que permanece constante, não uma ação em desenvolvimento.
              </p>

              <p>
                Frequency adverbs (sempre, geralmente, às vezes, nunca) aparecem em posições específicas no Simple Present. A regra é: se o verbo
                é "be", o advérbio vem após "be" ("She is usually punctual"). Para todos os outros verbos, o advérbio vem antes do verbo ("We
                usually complete inspections on Mondays"). Esta regra é tão importante que CESGRANRIO dedica questões inteiras a ela. Você verá
                frases como "The inspector never finds defects" (advérbio antes do verbo) vs "The pressure is never excessive" (advérbio após be).
                A primeira é correta, a segunda também — a posição depende do verbo auxiliar.
              </p>

              <p>
                Em resumo, escolha Simple Present para: (1) verdades científicas permanentes, (2) características de equipamentos, (3) rotinas
                diárias estabelecidas, (4) procedimentos padronizados. Escolha Present Continuous para: (1) ações em andamento neste exato momento,
                (2) situações temporárias, (3) narrativas de eventos que estão ocorrendo agora. State verbs nunca são Present Continuous. Esta é a
                tríade fundamental do presente inglês.
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Estrutura e Usos Fundamentais</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="font-semibold text-sm text-blue-700 dark:text-blue-300">Simple Present</div>
                    <div className="text-sm">Estrutura: S + V (he/she/it + V-s)</div>
                    <div className="text-sm">Uso: Rotinas, fatos, verdades permanentes</div>
                    <div className="text-sm italic">Ex: "The pump operates continuously."</div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-semibold text-sm text-cyan-700 dark:text-cyan-300">Present Continuous</div>
                    <div className="text-sm">Estrutura: S + am/is/are + V-ing</div>
                    <div className="text-sm">Uso: Ações em andamento agora</div>
                    <div className="text-sm italic">Ex: "The pressure is rising rapidly."</div>
                  </div>
                </div>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "① Conceituação: Simple Present & State Verbs",
                  icone: <LuBookOpen className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-base leading-relaxed">
                        O Simple Present é construído de forma simples: use o infinitivo do verbo para todos os sujeitos, EXCETO
                        na terceira pessoa singular (he, she, it), onde você adiciona "-s" ou "-es" à raiz. "I work, you work, he
                        works, we work, they work." Para verbos terminados em -s, -ss, -sh, -ch, -x, -z, use "-es": "watch → watches",
                        "pass → passes". Para verbos terminados em consoante + y, mude o y para i e adicione -es: "study → studies",
                        "carry → carries". Para verbos terminados em vogal + y, apenas adicione -s: "play → plays", "enjoy → enjoys".
                      </p>

                      <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 space-y-3">
                        <h5 className="font-semibold text-sm">State Verbs (NUNCA Present Continuous):</h5>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>• know (conhecer)</div>
                          <div>• understand (entender)</div>
                          <div>• want (querer)</div>
                          <div>• like (gostar)</div>
                          <div>• believe (acreditar)</div>
                          <div>• own (possuir)</div>
                          <div>• possess (possuir)</div>
                          <div>• prefer (preferir)</div>
                          <div>• seem (parecer)</div>
                          <div>• appear (aparecer)</div>
                          <div>• have (quando = ter/possuir)</div>
                          <div>• love (amar)</div>
                          <div>• hate (odiar)</div>
                          <div>• need (precisar)</div>
                          <div>• see (ver/entender)</div>
                          <div>• hear (ouvir/saber)</div>
                        </div>
                      </div>

                      <p className="text-base leading-relaxed">
                        Frequency adverbs (sempre, geralmente, às vezes, raramente, nunca) usam-se em posições específicas no Simple
                        Present. Quando o verbo é "be", o advérbio vai APÓS "be": "She is usually punctual." Para outros verbos, o
                        advérbio vai ANTES: "We usually inspect the equipment." Esta regra é rigorosa e nunca muda. Adverbs de frequência
                        incluem: always (sempre), usually (geralmente), often (frequentemente), sometimes (às vezes), hardly ever (raramente),
                        never (nunca).
                      </p>

                      <p className="text-base leading-relaxed">
                        Em contextos Petrobras, o Simple Present domina porque a maioria dos documentos técnicos descreve procedimentos
                        permanentes e funções equipamentos. Um operational manual nunca diz "The valve is controlling the pressure right now"
                        — sempre "The valve controls the pressure." Este uso reflete o fato de que estamos descrevendo uma realidade constante
                        do equipamento, não um evento momentâneo.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "② Exemplificação: Petrobras & Contexto Técnico",
                  icone: <LuPlay className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="border-l-4 border-blue-500 pl-4">
                          <p className="font-semibold">1. Função Permanente do Equipamento</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "The compressor works at maximum capacity during peak hours."
                            <span className="block mt-1 text-xs italic">Análise: Função regular do equipamento, uma característica permanente, não um evento momentâneo.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-cyan-500 pl-4">
                          <p className="font-semibold">2. Rotina Diária Estabelecida</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "The drilling team inspects the wellhead every morning at 6 AM."
                            <span className="block mt-1 text-xs italic">Análise: Rotina estabelecida, repetida regularmente, descrita em Simple Present.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-green-500 pl-4">
                          <p className="font-semibold">3. Verdade Científica Permanente</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "Oil floats on water due to its lower density."
                            <span className="block mt-1 text-xs italic">Análise: Fato científico permanente que nunca muda, requer Simple Present.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-amber-500 pl-4">
                          <p className="font-semibold">4. Ação em Andamento: Present Continuous</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "The pressure is rising rapidly in Sector B right now."
                            <span className="block mt-1 text-xs italic">Análise: "Right now" = neste momento específico. É uma circunstância temporária, não a função normal do equipamento.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-purple-500 pl-4">
                          <p className="font-semibold">5. Situação Temporária em Andamento</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "The maintenance team is repairing the pipeline in Zone 3."
                            <span className="block mt-1 text-xs italic">Análise: Ação em andamento, temporária, requer Present Continuous. Quando terminar, param de reparar.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-red-500 pl-4">
                          <p className="font-semibold">6. State Verb: Errado com -ing</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "❌ I am knowing the safety procedures. → ✅ I know the safety procedures."
                            <span className="block mt-1 text-xs italic">Análise: "Know" = state verb. Descreve um conhecimento que você POSSUI, não uma ação em andamento.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-pink-500 pl-4">
                          <p className="font-semibold">7. Procedimento Padronizado</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "The operator closes the isolation valve before starting maintenance."
                            <span className="block mt-1 text-xs italic">Análise: Procedimento padrão, Always implied, requer Simple Present.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-indigo-500 pl-4">
                          <p className="font-semibold">8. Narrativa Técnica em Andamento</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "While the team is conducting the pressure test, we are monitoring all gauges."
                            <span className="block mt-1 text-xs italic">Análise: Dois Present Continuous descrevendo ações simultâneas ocorrendo no momento da redação do relatório.</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "③ Dicas: Reconheça os Sinais",
                  icone: <LuLightbulb className="w-5 h-5" />,
                  conteudo: (
                    <CardCarousel
                      cards={[
                        {
                          titulo: "Marcadores Temporais = Simple Present",
                          descricao: "Palavras como 'always', 'usually', 'every day', 'each month', 'on Mondays' indicam rotinas. Use Simple Present: 'We always check the valves on Mondays.'",
                          exemplo: "✓ The team usually completes inspections by 5 PM",
                        },
                        {
                          titulo: "State Verbs Nunca São -ing",
                          descricao: "Know, understand, want, like, believe, have, own, possess NUNCA viram -ing. Mesmo que 'agora' pareça certo, a língua não permite: ❌ 'I am knowing' → ✅ 'I know'",
                          exemplo: "✓ I understand the procedure. NOT: I am understanding.",
                        },
                        {
                          titulo: "Terceira Pessoa: +s, +es, ou mudança",
                          descricao: "He/She/It SEMPRE recebem alteração. Watch→watches, study→studies, go→goes. Esta é a regra mais violada em testes CESGRANRIO.",
                          exemplo: "✓ She watches the equipment. NOT: She watch.",
                        },
                        {
                          titulo: "RIGHT NOW = Present Continuous",
                          descricao: "Se a frase contém 'right now', 'at this moment', 'currently', use -ing. Descreve o que está acontecendo neste exato segundo.",
                          exemplo: "✓ The pressure is rising right now. NOT: The pressure rises.",
                        },
                        {
                          titulo: "Função do Equipamento = Simple Present",
                          descricao: "Manuais técnicos usam Simple Present para descrever O QUE O EQUIPAMENTO FAZ normalmente. 'The valve controls the flow' = função permanente.",
                          exemplo: "✓ The pump supplies water. NOT: The pump is supplying.",
                        },
                        {
                          titulo: "Contexto Petrobras: Documentos Técnicos",
                          descricao: "Operational manuals, equipment specs, safety procedures = Simple Present. Incident reports em andamento, progress updates = Present Continuous.",
                          exemplo: "✓ Manual: 'The alarm alerts...' Progress: 'The team is repairing...'",
                        },
                      ]}
                    />
                  ),
                },
                {
                  titulo: "④ Exceções & Pegadinhas CESGRANRIO",
                  icone: <LuTriangleAlert className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox
                        tipo="danger"
                        titulo="Pegadilha #1: State Verbs Com -ing"
                      >
                        <Comparison title="Exemplos" left={{ title: "ERRADO", content: "I am knowing English. She is understanding the topic. He is liking this job.", description: "", variant: "danger" }} right={{ title: "CORRETO", content: "I know English. She understands the topic. He likes this job.", description: "", variant: "success" }} />
                      </AlertBox>

                      <AlertBox
                        tipo="danger"
                        titulo="Pegadilha #2: Terceira Pessoa no Simple Present"
                      >
                        <Comparison title="Exemplos" left={{ title: "ERRADO", content: "He work every day. She monitor the pressure. It require approval. Does she complete the task?", description: "", variant: "danger" }} right={{ title: "CORRETO", content: "He works every day. She monitors the pressure. It requires approval. Does she complete the task?", description: "", variant: "success" }} />
                      </AlertBox>

                      <AlertBox
                        tipo="danger"
                        titulo="Pegadilha #3: Confundindo Simple Present com Present Continuous"
                      >
                        <Comparison title="Exemplos" left={{ title: "ERRADO", content: "I am usually doing homework. We are always checking the equipment. The technician is every day repairing devices.", description: "", variant: "danger" }} right={{ title: "CORRETO", content: "I usually do homework. We always check the equipment. The technician repairs devices every day.", description: "", variant: "success" }} />
                      </AlertBox>

                      <AlertBox
                        tipo="danger"
                        titulo="Pegadilha #4: CESGRANRIO Teste Fino"
                      >
                        <Comparison title="Exemplos" left={{ title: "ERRADO", content: "Actually, I am liking this job. To be honest, we are preferring the original plan.", description: "", variant: "danger" }} right={{ title: "CORRETO", content: "Actually, I like this job. To be honest, we prefer the original plan.", description: "", variant: "success" }} />
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Qual tempo é correto?</p>
                    <p className="text-base">"The technician ___ equipment every morning."</p>
                    <p className="text-xs text-foreground/60">(A) checks (B) is checking</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ CHECKS</p>
                    <p>"Every morning" = rotina estabelecida, marcador de Simple Present. Descreve o que ele FAZ regularmente, não o que está fazendo neste segundo.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Qual tempo é correto?</p>
                    <p className="text-base">"Right now, the pressure ___ rapidly!"</p>
                    <p className="text-xs text-foreground/60">(A) rises (B) is rising</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ IS RISING</p>
                    <p>"Right now" = neste momento específico. Present Continuous descreve uma circunstância que está ocorrendo NESTE SEGUNDO, não a função normal.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">State Verb ou Action Verb?</p>
                    <p className="text-base">"I ___ English grammar."</p>
                    <p className="text-xs text-foreground/60">Verbo: UNDERSTAND | Pode ser -ing?</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-red-600">❌ NÃO -ing (State Verb)</p>
                    <p>"Understand" descreve um estado mental que você POSSUI. Nunca -ing. ✅ "I understand grammar." NOT: "I am understanding."</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Terceira Pessoa Singular</p>
                    <p className="text-base">"The valve ___ the flow of oil."</p>
                    <p className="text-xs text-foreground/60">(A) control (B) controls</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ CONTROLS</p>
                    <p>He/She/It SEMPRE adiciona -s. Função permanente do equipamento = Simple Present. "The valve controls the flow."</p>
                  </div>
                }
              />
            </div>
          </section>

          

<ModuleConsolidation
            index={2}
            variant={mv[1]}
            maceteVisual={{
              title: "Simple Present vs Present Continuous — Regra de Ouro",
              content: (
                <div className="space-y-2 text-sm">
                  <p><strong>PERMANENTE / FATO</strong> → Simple Present: "The valve <em>controls</em> the flow."</p>
                  <p><strong>AGORA / TEMPORÁRIO</strong> → Present Continuous: "The pressure <em>is rising</em>."</p>
                  <p><strong>STATE VERBS</strong> nunca usam Continuous: know, understand, believe, own, contain.</p>
                  <p className="text-xs text-muted-foreground">CESGRANRIO cobra state verbs em ~60% das questões de Present Tenses.</p>
                </div>
              )
            }}
            onComplete={() => handleModuleComplete("modulo-1")}
          />

                    <QuizInterativo
            questoes={quizM1}
            titulo="Simple Present & Present Continuous"
            numero={1}
            onComplete={() => handleModuleComplete("modulo-1")}
          />
        </div>
      </TabsContent>

      {/* MODULE 2 — SIMPLE PAST & PAST CONTINUOUS */}
      <TabsContent value="modulo-2">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={2}
            titulo="Simple Past & Past Continuous"
            variant={mv[2]}
            descricao="Os dois tempos fundamentais do passado: ações concluídas vs ações em andamento (narrativa)"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="O Passado em Inglês Técnico: Relatórios, Incidentes e Manutenção"
              description="Os relatórios de incidente, os logs de manutenção e o histórico de equipamentos usam exclusivamente Simple Past"
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                O Simple Past é o tempo dos relatórios. Quando algo aconteceu e terminou — em um momento específico do passado —
                você descreve com Simple Past. "The incident occurred yesterday." "We completed the project in 2023." "The valve failed at 3 PM."
                Tudo isto é Simple Past porque cada frase responde a QUANDO exatamente aconteceu. A estrutura é simples: verbo regular adiciona -ed
                (work → worked, check → checked, complete → completed); verbos irregulares usam formas especiais (go → went, see → saw, have → had,
                do → did, break → broke, take → took). A razão pela qual os aprendizes confundem Simple Past com Present Perfect é que ambos falam
                de ações passadas, mas Simple Past enxerga o passado como uma coisa encerrada, histórica, sem conexão com agora. Present Perfect conecta
                o passado ao presente.
              </p>

              <p>
                Past Continuous é o cenário, o pano de fundo narrativo. Quando o relatório técnico quer descrever O QUE ESTAVA ACONTECENDO quando
                outra coisa ocorreu, use Past Continuous. "While the team was inspecting the pipeline (ongoing), a leak was discovered (what happened)."
                A estrutura é was/were + -ing. O crucial aqui é entender o padrão: Past Continuous descreve a ação de fundo; Simple Past interrompe.
                "When I arrived, they were still working" — Past Continuous ("were still working") descreve a situação quando você chegou; você chegou é
                Simple Past implícito. Em narrativa técnica, este padrão é absolutamente predominante.
              </p>

              <p>
                Irregular verbs em contexto Petrobras merecem memorização porque aparecem constantemente em relatórios técnicos reais. Go→went,
                see→saw, have→had (tive), do→did (fiz), break→broke (quebrou), take→took (levou), come→came (veio), know→knew (soube), think→thought
                (pensei), give→gave (dei), find→found (encontrei), make→made (fiz), get→got (consegui), keep→kept (mantive), leave→left (saí),
                meet→met (encontrei), say→said (disse), tell→told (contei). Um relatório típico Petrobras pode incluir todos estes.
              </p>

              <p>
                A distinção quando vs while é a cola que mantém Past Continuous funcionando. "When" marca um ponto específico no passado — neste
                ponto, Past Continuous estava em andamento. "While" descreve a duração da ação de fundo. "When the alarm sounded, we were checking
                the equipment" (when = ponto específico → Simple Past; while ongoing → Past Continuous). "While we were checking the equipment, the
                alarm sounded" (while = duração de fundo; alarm = interrupção pontual → Simple Past). O sentido é idêntico, mas a ordem gramatical muda.
              </p>

              <p>
                Em relatórios Petrobras, você frequentemente vê: "The technician was performing maintenance on the compressor when the pressure relief
                valve suddenly opened." Aqui: "was performing" = Past Continuous (ação de fundo contínua); "opened" = Simple Past (evento que interrompeu).
                Este é o padrão narrativo universal em documentação técnica — descrever o contexto (Past Continuous), depois o que aconteceu (Simple Past).
              </p>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Estrutura e Usos Fundamentais</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="font-semibold text-sm text-emerald-700 dark:text-emerald-300">Simple Past</div>
                    <div className="text-sm">Estrutura: S + V-ed (regular) | S + V (irregular)</div>
                    <div className="text-sm">Uso: Ações concluídas, eventos pontuais, narrativa histórica</div>
                    <div className="text-sm italic">Ex: "The valve failed at 3 PM yesterday."</div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-semibold text-sm text-teal-700 dark:text-teal-300">Past Continuous</div>
                    <div className="text-sm">Estrutura: S + was/were + V-ing</div>
                    <div className="text-sm">Uso: Ação em andamento, interrompida por outra (narrativa)</div>
                    <div className="text-sm italic">Ex: "While we were inspecting, the alarm sounded."</div>
                  </div>
                </div>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "① Irregular Verbs: Memorização Técnica",
                  icone: <LuBookOpen className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-base leading-relaxed">
                        Irregular verbs não seguem o padrão -ed. Cada um tem uma forma especial que DEVE ser memorizada. Em contextos Petrobras,
                        cerca de 20 irregular verbs aparecem repetidamente em documentação técnica. A boa notícia: você provavelmente já sabe a maioria
                        em oral; agora, precisa consolidar a escrita.
                      </p>

                      <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-lg p-4 space-y-3">
                        <h5 className="font-semibold text-sm">20+ Irregular Verbs Técnicos (Base | Past | Past Participle):</h5>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>• go | went | gone</div>
                          <div>• see | saw | seen</div>
                          <div>• have | had | had</div>
                          <div>• do | did | done</div>
                          <div>• break | broke | broken</div>
                          <div>• take | took | taken</div>
                          <div>• come | came | come</div>
                          <div>• know | knew | known</div>
                          <div>• think | thought | thought</div>
                          <div>• give | gave | given</div>
                          <div>• find | found | found</div>
                          <div>• make | made | made</div>
                          <div>• get | got | gotten</div>
                          <div>• keep | kept | kept</div>
                          <div>• leave | left | left</div>
                          <div>• meet | met | met</div>
                          <div>• say | said | said</div>
                          <div>• tell | told | told</div>
                          <div>• begin | began | begun</div>
                          <div>• write | wrote | written</div>
                        </div>
                      </div>

                      <p className="text-base leading-relaxed">
                        Contexto Petrobras: "The inspector went to the platform and saw the damaged valve." (went, saw) Não "The inspector go" ou "The inspector see".
                        Em logs: "We had completed the maintenance by 5 PM." (had) Em procedimentos: "The operator did the safety check." (did) Em relatórios:
                        "The pressure relief valve broke at 3 PM." (broke, não "breaked")
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "② Exemplificação: Incident Reports & Maintenance Logs",
                  icone: <LuPlay className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="border-l-4 border-emerald-500 pl-4">
                          <p className="font-semibold">1. Simple Past: Evento Documentado</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "The compressor unit failed at 14:30 on March 15, 2026."
                            <span className="block mt-1 text-xs italic">Análise: Tempo específico, evento encerrado, necessariamente Simple Past.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-teal-500 pl-4">
                          <p className="font-semibold">2. Simple Past: Ações Sequenciais (Então... depois...)</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "The team arrived at the site, inspected the equipment, and identified the leak."
                            <span className="block mt-1 text-xs italic">Análise: Série de ações passadas, cada uma concluída sequencialmente. Tudo Simple Past.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-blue-500 pl-4">
                          <p className="font-semibold">3. Past Continuous: Cenário de Fundo</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "While the pressure was rising dangerously, the operator was monitoring the readings."
                            <span className="block mt-1 text-xs italic">Análise: Dois eventos simultâneos no passado, ambos em progresso. Past Continuous.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-purple-500 pl-4">
                          <p className="font-semibold">4. Past Continuous + Simple Past: Interrupção Narrativa</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "When the alarm sounded (Simple Past), we were conducting a routine inspection (Past Continuous)."
                            <span className="block mt-1 text-xs italic">Análise: "When" marca ponto específico; "were conducting" = fundo; "sounded" = interrupção.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-pink-500 pl-4">
                          <p className="font-semibold">5. Irregular Verbs: Contexto Técnico</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "The technician saw the anomaly and took corrective action immediately."
                            <span className="block mt-1 text-xs italic">Análise: saw (irregular: see→saw) + took (irregular: take→took). Ambos Simple Past, documentam eventos.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-red-500 pl-4">
                          <p className="font-semibold">6. Errado: Confundindo Past Continuous com Simple Past</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "❌ While we checked the equipment, the pressure went up. → ✅ While we were checking the equipment, the pressure went up."
                            <span className="block mt-1 text-xs italic">Análise: "While" exige Past Continuous para a ação de fundo. Só Simple Past na interrupção.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-orange-500 pl-4">
                          <p className="font-semibold">7. When vs While: Posicionamento</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "When the technician arrived, the team was already working." vs "While the team was working, the technician arrived."
                            <span className="block mt-1 text-xs italic">Análise: Sentido idêntico, mas estrutura diferente. A ordem das cláusulas não muda o significado.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-indigo-500 pl-4">
                          <p className="font-semibold">8. Narrativa Técnica Completa</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "The platform was operating normally when the pressure gauge showed an anomaly. The control room immediately initiated a full system check."
                            <span className="block mt-1 text-xs italic">Análise: "was operating" = Past Continuous (fundo); "showed" = Simple Past (evento). Estrutura narrativa clássica.</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "③ Dicas: Reconheça os Sinais",
                  icone: <LuLightbulb className="w-5 h-5" />,
                  conteudo: (
                    <CardCarousel
                      cards={[
                        {
                          titulo: "YESTERDAY = Simple Past (Tempo fechado)",
                          descricao: "Marcadores como 'yesterday', 'last week', 'ago', 'in 2020' indicam Simple Past. Tempo definido, evento encerrado. Nunca ambíguo.",
                          exemplo: "✓ The incident occurred yesterday. NOT: The incident was occurring yesterday.",
                        },
                        {
                          titulo: "IRREGULAR VERBS: Memorize No Context",
                          descricao: "Go→went, see→saw, have→had, do→did, break→broke. Aparecem constantemente em relatórios técnicos. Erros com irregulares são nota vermelha em CESGRANRIO.",
                          exemplo: "✓ The engineer went to the site. NOT: The engineer go.",
                        },
                        {
                          titulo: "WHILE + Dois Eventos = Past Continuous + Simple Past",
                          descricao: "'While the team was checking (ongoing), the pressure rose (interruption).' Este padrão é obrigatório em narrativa técnica. While exige ação de fundo em progresso.",
                          exemplo: "✓ While we were working, the alarm sounded. NOT: While we worked, the alarm sounded.",
                        },
                        {
                          titulo: "WHEN = Ponto Específico (Past Continuous ou Simple Past)",
                          descricao: "'When I arrived, they were still working.' When marca um ponto no tempo. A ação anterior a 'when' geralmente é Past Continuous (fundo).",
                          exemplo: "✓ When the technician arrived, we were conducting tests. NOT: When arrived the technician, we conducted tests.",
                        },
                        {
                          titulo: "Relative Timing: Qual Aconteceu Primeiro?",
                          descricao: "Past Continuous = aconteceu primeiro (ação de fundo). Simple Past = aconteceu segundo (interrupção). Este ordenamento é a chave para entender narrativa em inglês técnico.",
                          exemplo: "✓ They were working when the alarm sounded. (Working first, alarm second)",
                        },
                      ]}
                    />
                  ),
                },
                {
                  titulo: "④ Exceções & Pegadinhas CESGRANRIO",
                  icone: <LuTriangleAlert className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox
                        tipo="danger"
                        titulo="Pegadilha #1: Irregular Verbs Errados"
                      >
                        <Comparison title="Exemplos" left={{ title: "ERRADO", content: "The technician go yesterday. We see the issue and take action. She broke the record and make a new one.", description: "", variant: "danger" }} right={{ title: "CORRETO", content: "The technician went yesterday. We saw the issue and took action. She broke the record and made a new one.", description: "", variant: "success" }} />
                      </AlertBox>

                      <AlertBox
                        tipo="danger"
                        titulo="Pegadilha #2: While + Dois Simple Past (Proibido!)"
                      >
                        <Comparison title="Exemplos" left={{ title: "ERRADO", content: "While we checked the pressure, the valve opened. While the technician completed the test, I logged the data. While they inspected the pipeline, they found a leak.", description: "", variant: "danger" }} right={{ title: "CORRETO", content: "While we were checking the pressure, the valve opened. While the technician was completing the test, I logged the data. While they were inspecting the pipeline, they found a leak.", description: "", variant: "success" }} />
                      </AlertBox>

                      <AlertBox
                        tipo="danger"
                        titulo="Pegadilha #3: Past Continuous Para Eventos Rápidos (Errado!)"
                      >
                        <Comparison title="Exemplos" left={{ title: "ERRADO", content: "The system was failing yesterday. The valve was opening at 3 PM. The pressure was rising suddenly.", description: "", variant: "danger" }} right={{ title: "CORRETO", content: "The system failed yesterday. The valve opened at 3 PM. (Se durável:) The pressure was rising gradually when we noticed it.", description: "", variant: "success" }} />
                      </AlertBox>

                      <AlertBox
                        tipo="danger"
                        titulo="Pegadilha #4: When Com Simple Past Para AMBOS (Às vezes Correto)"
                      >
                        <Comparison title="Exemplos" left={{ title: "✓ CORRETO (sequência)", content: "When the pressure rose, we immediately closed the valve. (Ambos = eventos rápidos)", description: "", variant: "danger" }} right={{ title: "✓ TAMBÉM CORRETO (narrativa)", content: "When the pressure rose, we were monitoring the system closely. (Monitoring = em progresso)", description: "", variant: "success" }} />
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Qual é o tempo correto?</p>
                    <p className="text-base">"The technician ___ the fault and ___ the procedure."</p>
                    <p className="text-xs text-foreground/60">(found/take, sees/took, saw/took)</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ SAW/TOOK</p>
                    <p>Passado específico: "saw" (see→saw, irregular) + "took" (take→took, irregular). Ambos simple past = eventos sequenciais.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">While ou When?</p>
                    <p className="text-base">"___ the team was checking the system, the alarm sounded."</p>
                    <p className="text-xs text-foreground/60">(A) While (B) When</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ WHILE</p>
                    <p>"While" descreve duração de fundo. "Checking" = Past Continuous. "Sounded" = Simple Past interrompe. When marcaria apenas um ponto específico.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Tempo ou Frase?</p>
                    <p className="text-base">"The pressure was rising dangerously."</p>
                    <p className="text-xs text-foreground/60">Qual é o tempo? O que descreve?</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ PAST CONTINUOUS</p>
                    <p>"Was rising" = ação em andamento no passado. Descreve uma situação que estava em progresso. Se houve interrupção, não aparece aqui, mas seria Simple Past.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Irregular Verb</p>
                    <p className="text-base">"The engineer ___ the site and ___ the problem."</p>
                    <p className="text-xs text-foreground/60">Verbo: GO, SEE</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ WENT / SAW</p>
                    <p>Go→went (irregular) + see→saw (irregular). "The engineer went the site and saw the problem." Não "goed" ou "sawed".</p>
                  </div>
                }
              />
            </div>
          </section>

          

<ModuleConsolidation
            index={2}
            variant={mv[2]}
            maceteVisual={{
              title: "Simple Past vs Past Continuous — Regra de Ouro",
              content: (
                <div className="space-y-2 text-sm">
                  <p><strong>AÇÃO PONTUAL</strong> → Simple Past: "The explosion <em>occurred</em> at 14:00."</p>
                  <p><strong>PANO DE FUNDO</strong> → Past Continuous: "The team <em>was inspecting</em> when it happened."</p>
                  <p><strong>WHEN</strong> = ação interrompe outra | <strong>WHILE</strong> = duas ações simultâneas.</p>
                  <p className="text-xs text-muted-foreground">Verbos irregulares técnicos: break→broke, find→found, write→wrote, send→sent.</p>
                </div>
              )
            }}
            onComplete={() => handleModuleComplete("modulo-2")}
          />

                    <QuizInterativo
            questoes={quizM2}
            titulo="Simple Past & Past Continuous"
            numero={2}
            onComplete={() => handleModuleComplete("modulo-2")}
          />
        </div>
      </TabsContent>

      {/* MODULE 3 — PRESENT PERFECT & PAST PERFECT */}
      <TabsContent value="modulo-3">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={3}
            titulo="Present Perfect & Past Perfect"
            variant={mv[3]}
            descricao="Os 'Perfeitos': conectar passado e presente, e estabelecer sequência de ações passadas"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="O Dilema Clássico: Present Perfect vs Simple Past"
              description="A confusão entre estes dois tempos causa 40% dos erros em CESGRANRIO. A distinção é sutil, mas obrigatória."
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                "I have completed the inspection" vs "I completed the inspection yesterday" — qual é a diferença? Present Perfect conecta
                passado e presente. O resultado importa AGORA. O tempo em que ocorreu é irrelevante ou não mencionado. "I have completed the
                inspection" significa: a inspeção terminou em algum momento no passado, e o resultado afeta AGORA — talvez relatórios já foram
                gerados, cliente já foi notificado, próximas ações já foram iniciadas. Simple Past é apenas um fato histórico. "I completed the
                inspection yesterday" — e então? Nada relevante para agora. É apenas um registro histórico.
              </p>

              <p>
                Use Present Perfect quando: (1) A ação começou no passado e continua relevante agora: "We have been waiting for 2 hours" (ainda
                esperando, relevante agora). (2) Algo acabou E AFETA O PRESENTE: "The report has been submitted" (enviado no passado, mas relevante
                porque agora está na fila de revisão). (3) Não há tempo específico mencionado: "I have visited Petrobras headquarters" (não importa
                quando, a experiência é relevante agora). Use Simple Past quando: (1) Há tempo específico claro: "I visited in 2021" — tempo definido
                encerra a relevância presente. (2) É história pura: "The Deepwater Horizon explosion occurred in 2010" — evento histórico, sem conexão
                com presente.
              </p>

              <p>
                A tabela Just | Already | Yet | Since | For é crucial. "Just" = há poucos momentos ("I have just arrived" — cheguei há alguns segundos,
                ainda não tenho agenda marcada). "Already" = antes do esperado ("The team has already started" — começou antes do previsto, relevante
                porque afeta planejamento). "Yet" = ainda não ("Have you completed the task yet?" — esperando conclusão, relevante). "Since" = ponto
                de partida ("We have worked since 2020" — começou em 2020, continua até agora). "For" = duração ("We have been waiting for 3 hours" —
                começou 3 horas atrás, continua agora).
              </p>

              <p>
                Past Perfect é o "mais que passado" — a ação que já tinha acontecido ANTES de outra coisa. "When we arrived, the team had already left."
                "Left" (Simple Past) é o ponto de referência; "had left" (Past Perfect) é anterior a "arrived". Estrutura: had + past participle. Em
                contextos Petrobras: "The inspector reviewed the procedures that the technician had completed." (Had completed = antes de reviewed).
                Imagine uma linha de tempo: ___had completed___ (primeiro) → ___reviewed___ (depois). Past Perfect é sempre ANTES de outro evento passado.
              </p>

              <p>
                Em relatórios Petrobras, Present Perfect aparece em seções de status: "We have completed Phase 1." "The pressure has stabilized." Past
                Perfect aparece em narrativas de sequência: "After the technician had checked the pressure, the system resumed normal operation."
              </p>

              <div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/30 dark:to-purple-950/30 rounded-lg border border-pink-200 dark:border-pink-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">For vs Since (Tabela Crítica)</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div className="space-y-2">
                    <div className="font-semibold text-pink-700 dark:text-pink-300">FOR (duração)</div>
                    <div>Usa quantidade de tempo: "for 5 years", "for 3 hours", "for 2 weeks"</div>
                    <div className="italic">"We have worked for 10 years."</div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-semibold text-purple-700 dark:text-purple-300">SINCE (ponto de partida)</div>
                    <div>Usa momento específico: "since 2020", "since Monday", "since 9 AM"</div>
                    <div className="italic">"We have worked since 2016."</div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-semibold text-indigo-700 dark:text-indigo-300">Comparação</div>
                    <div>For = "há quanto tempo?" (duração). Since = "desde quando?" (ponto)</div>
                    <div className="italic">"For 5 years = since 2021 (today is 2026)"</div>
                  </div>
                </div>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "① Present Perfect: Estrutura & Timing",
                  icone: <LuBookOpen className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-base leading-relaxed">
                        Present Perfect = have/has + Past Participle. "Have" para I, you, we, they. "Has" para he, she, it. Past Participle:
                        verbos regulares terminam em -ed (completed, worked, checked); irregulares têm formas especiais (gone, seen, been, done,
                        broken, taken, found, written). Estrutura deve ser memorizada rigorosamente porque é testada obsessivamente em CESGRANRIO.
                      </p>

                      <div className="bg-pink-50 dark:bg-pink-950/20 rounded-lg p-4 space-y-3">
                        <h5 className="font-semibold text-sm">Just | Already | Yet (Present Perfect Markers)</h5>
                        <div className="space-y-2 text-sm">
                          <div className="border-b pb-2">
                            <div className="font-semibold text-pink-700 dark:text-pink-300">JUST = há poucos momentos</div>
                            <div>"I have just arrived." (Cheguei segundos atrás, ainda não se moveu muito)</div>
                          </div>
                          <div className="border-b pb-2">
                            <div className="font-semibold text-purple-700 dark:text-purple-300">ALREADY = antes do esperado</div>
                            <div>"The report has already been submitted." (Enviado antes do deadline, impacta planejamento)</div>
                          </div>
                          <div>
                            <div className="font-semibold text-indigo-700 dark:text-indigo-300">YET = ainda não (em perguntas/negações)</div>
                            <div>"Have you finished yet?" / "I haven't finished yet." (Espera de conclusão)</div>
                          </div>
                        </div>
                      </div>

                      <p className="text-base leading-relaxed">
                        Contexto Petrobras: "The platform has just started operations." (Iniciou segundos atrás, ainda em startup). "We have
                        already completed the safety audit." (Concluído, relatório pode ser gerado). "The technician hasn't finished the inspection
                        yet." (Inspeção contínua, resultado ainda pendente).
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "② Past Perfect: Sequência Temporal",
                  icone: <LuLightbulb className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-base leading-relaxed">
                        Past Perfect = had + Past Participle. Sempre indica uma ação que terminou ANTES de outra ação passada. Pense em Past Perfect
                        como "o mais que passado" — tudo que é mais antigo que Simple Past. Estrutura: had + particípio (had completed, had seen, had
                        been, had done, had written). Duas ações passadas = sequência temporal → use Past Perfect para a primeira, Simple Past para a
                        segunda.
                      </p>

                      <div className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-4 space-y-3">
                        <h5 className="font-semibold text-sm">Padrão UNIVERSAL: Past Perfect + Simple Past</h5>
                        <div className="space-y-4 text-sm">
                          <div className="border-l-4 border-purple-500 pl-3">
                            <p className="font-semibold">Padrão 1: "After [had + V], [Simple Past V]."</p>
                            <p className="italic">"After the technician had checked the pressure, the system resumed normal operation."</p>
                          </div>
                          <div className="border-l-4 border-purple-500 pl-3">
                            <p className="font-semibold">Padrão 2: "When [had + V], [Simple Past V]."</p>
                            <p className="italic">"When we had finished the inspection, the manager approved the report."</p>
                          </div>
                          <div className="border-l-4 border-purple-500 pl-3">
                            <p className="font-semibold">Padrão 3: "[Simple Past], but [had already + V]."</p>
                            <p className="italic">"We arrived at the site, but the team had already left."</p>
                          </div>
                        </div>
                      </div>

                      <p className="text-base leading-relaxed">
                        Contexto Petrobras: "By the time the inspector arrived, the technician had already completed the repairs." (Repairs = primeira ação,
                        Past Perfect; arrived = segunda, Simple Past). Em relatórios: "The platform had operated for 20 years before the incident occurred."
                        (Operado = mais antigo; occurred = referência; Past Perfect marca anterior).
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "③ Exemplificação: Status Reports & Narrativas",
                  icone: <LuPlay className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="border-l-4 border-pink-500 pl-4">
                          <p className="font-semibold">1. Present Perfect: Status Actual (Relevância AGORA)</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "We have completed the Phase 1 testing."
                            <span className="block mt-1 text-xs italic">Análise: Completo no passado, mas relevante agora porque Phase 2 pode começar. Sem data específica.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-purple-500 pl-4">
                          <p className="font-semibold">2. Present Perfect: Experiência (Sem Data Específica)</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "I have worked on three major projects in my career."
                            <span className="block mt-1 text-xs italic">Análise: Experiência acumulada, relevante para CV/avaliação. Não importa quando, apenas que ocorreu.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-indigo-500 pl-4">
                          <p className="font-semibold">3. Simple Past: Data Específica (Sem Relevância Presente)</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "I worked on the Guanabara Project from 2018 to 2020."
                            <span className="block mt-1 text-xs italic">Análise: Tempo definido (2018-2020). Encerrado. Fato histórico, não Present Perfect.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-pink-500 pl-4">
                          <p className="font-semibold">4. Just/Already/Yet: Timing em Present Perfect</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "The report has just been submitted to management."
                            <span className="block mt-1 text-xs italic">Análise: "Just" = segundos atrás. Impacta ação presente (management recebeu, pode revisar). Present Perfect necessário.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-purple-500 pl-4">
                          <p className="font-semibold">5. For vs Since: Duração vs Ponto</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "We have worked on safety procedures for 15 years." / "We have worked on safety procedures since 2011."
                            <span className="block mt-1 text-xs italic">Análise: For = duração (15 anos). Since = ponto de partida (2011). Ambas Present Perfect, mas indicadores diferentes.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-red-500 pl-4">
                          <p className="font-semibold">6. Errado: Data Específica Com Present Perfect</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "❌ I have completed the project yesterday. → ✅ I completed the project yesterday."
                            <span className="block mt-1 text-xs italic">Análise: "Yesterday" = data específica. Exclui Present Perfect. Obrigatoriamente Simple Past.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-orange-500 pl-4">
                          <p className="font-semibold">7. Past Perfect: Sequência (Qual Aconteceu Primeiro?)</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "When the inspector arrived at the site, the maintenance crew had already completed the repairs."
                            <span className="block mt-1 text-xs italic">Análise: "Had completed" = primeiro. "Arrived" = segundo. Past Perfect marca o anterior.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-blue-500 pl-4">
                          <p className="font-semibold">8. Narrativa Completa: Três Tempos</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "By the time we arrived, the technician had already started working. When we began, he was still completing the final checks."
                            <span className="block mt-1 text-xs italic">Análise: Had started (Past Perfect, 1º) → Arrived (Simple Past, 2º) → Was completing (Past Continuous, 3º simultâneo). Timeline clara.</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "④ Dicas: Reconheça os Marcadores",
                  icone: <LuLightbulb className="w-5 h-5" />,
                  conteudo: (
                    <CardCarousel
                      cards={[
                        {
                          titulo: "Just/Already/Yet = Present Perfect",
                          descricao: "'I have just finished.' 'They have already left.' 'Have you completed yet?' Estes marcadores EXIGEM Present Perfect. Descrevem relevância AGORA.",
                          exemplo: "✓ NOT: I just finished. → ✅ I have just finished.",
                        },
                        {
                          titulo: "Since [ano/momento] = Present Perfect",
                          descricao: "'We have worked since 2020.' 'She has lived here since Monday.' Since marca ponto de partida. Use Present Perfect para ação que continua até agora.",
                          exemplo: "✓ NOT: We work since 2020. → ✅ We have worked since 2020.",
                        },
                        {
                          titulo: "For [duração] = Present Perfect",
                          descricao: "'We have worked for 5 years.' 'I have been waiting for 2 hours.' For descreve quanto tempo (duração). Use Present Perfect para ação contínua.",
                          exemplo: "✓ NOT: We work for 5 years. → ✅ We have worked for 5 years.",
                        },
                        {
                          titulo: "Yesterday/Specific Date = Simple Past",
                          descricao: "'I completed it yesterday.' 'The incident occurred on March 15.' Data específica EXCLUI Present Perfect. Obrigatoriamente Simple Past.",
                          exemplo: "✓ NOT: I have completed yesterday. → ✅ I completed yesterday.",
                        },
                        {
                          titulo: "After/Before [ação] = Past Perfect + Simple Past",
                          descricao: "'After we had checked, the system worked.' 'Before the inspector arrived, the crew had finished.' After/Before + sequência = use Past Perfect para ação anterior.",
                          exemplo: "✓ After we had inspected, we approved. NOT: After we inspected, we approved.",
                        },
                        {
                          titulo: "Resultado Visível Agora = Present Perfect",
                          descricao: "'The door is closed.' (não importa quando fechou, está fechado agora = relevância presente) → 'I have closed the door.' (ação relevante para estado atual).",
                          exemplo: "✓ The report has been reviewed. (Relevante = está revisto agora)",
                        },
                      ]}
                    />
                  ),
                },
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Present Perfect ou Simple Past?</p>
                    <p className="text-base">"I ___ the inspection yesterday."</p>
                    <p className="text-xs text-foreground/60">(completed, have completed)</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ COMPLETED (Simple Past)</p>
                    <p>"Yesterday" = data específica. Proíbe Present Perfect. Obrigatoriamente Simple Past.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Just/Already/Yet = Qual Tempo?</p>
                    <p className="text-base">"The team ___ started the project."</p>
                    <p className="text-xs text-foreground/60">(started, has just started)</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ HAS JUST STARTED</p>
                    <p>"Just" exige Present Perfect. Descreve momento muito recente com relevância presente (projeto é novo, planejamento afetado).</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">For vs Since?</p>
                    <p className="text-base">"We ___ worked ___ 2020."</p>
                    <p className="text-xs text-foreground/60">(have, since) ou (have, for)?</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ HAVE / SINCE 2020</p>
                    <p>Since = ponto de partida (2020). For = duração (5 years). Aqui: "since 2020" = começou 2020, continua agora.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Past Perfect ou Simple Past?</p>
                    <p className="text-base">"When we arrived, the team ___ already left."</p>
                    <p className="text-xs text-foreground/60">(left, had left)</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ HAD LEFT (Past Perfect)</p>
                    <p>Past Perfect = ação anterior no passado. "Had left" aconteceu antes de "arrived". Marca sequência temporal clara.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Which is relevant NOW?</p>
                    <p className="text-base">"The report ___ submitted."</p>
                    <p className="text-xs text-foreground/60">(was submitted, has been submitted)</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ HAS BEEN SUBMITTED</p>
                    <p>Present Perfect = relevância AGORA. Está no sistema de revisão, impacta ações presentes. (Was = apenas fato histórico, sem relevância agora)</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Sequência de Ações</p>
                    <p className="text-base">"After the technician ___ the procedure, the supervisor approved it."</p>
                    <p className="text-xs text-foreground/60">(completed, had completed)</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ HAD COMPLETED</p>
                    <p>"After" indica sequência. "Had completed" = primeiro. "Approved" = segundo (Simple Past). Padrão obrigatório.</p>
                  </div>
                }
              />
            </div>
          </section>

          

<ModuleConsolidation
            index={2}
            variant={mv[3]}
            maceteVisual={{
              title: "Present Perfect vs Simple Past — A Distinção Crucial",
              content: (
                <div className="space-y-2 text-sm">
                  <p><strong>COM DATA/HORA</strong> → Simple Past: "We <em>completed</em> the audit on Friday."</p>
                  <p><strong>SEM DATA (relevância presente)</strong> → Present Perfect: "We <em>have completed</em> the audit."</p>
                  <p><strong>FOR</strong> = duração | <strong>SINCE</strong> = ponto de início no tempo.</p>
                  <p className="text-xs text-muted-foreground">Past Perfect: "had + PP" — o que já tinha acontecido ANTES de outra ação passada.</p>
                </div>
              )
            }}
            onComplete={() => handleModuleComplete("modulo-3")}
          />

                    <QuizInterativo
            questoes={quizM3}
            titulo="Present Perfect & Past Perfect"
            numero={3}
            onComplete={() => handleModuleComplete("modulo-3")}
          />
        </div>
      </TabsContent>

      {/* MODULE 4 — FUTURE FORMS */}
      <TabsContent value="modulo-4">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={4}
            titulo="Future Forms: Will, Going To, Present Continuous"
            variant={mv[4]}
            descricao="Os 3 futuros do inglês NÃO são intercambiáveis. Cada um tem um propósito específico."
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Os 3 Futuros: Não São Simples Sinônimos"
              description="Usar o futuro errado muda o significado. CESGRANRIO testa esta distinção sutil obsessivamente."
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Os 3 futuros do inglês NÃO são intercambiáveis. Cada um comunica algo diferente. "WILL: Decisão espontânea ou previsão SEM evidência.
                Você não sabe especificamente o que vai acontecer, apenas faz uma suposição geral." Exemplo: "The inspection will reveal issues."
                (Previsão, sem saber especificamente quais problemas). "I'll help you." (Decisão neste exato momento, espontânea, sem planejamento prévio).
                GOING TO: "Plano pré-decidido ou previsão COM evidência VISÍVEL AGORA." Você já planejou, ou tem sinais óbvios do que vai acontecer.
                Exemplo: "We are going to drill this well tomorrow." (Plano já definido, equipamento já posicionado, agenda marcada). "Look at the sky!
                It's going to rain." (Vejo nuvens escuras AGORA — evidência visível). PRESENT CONTINUOUS para futuro: "Agenda confirmada, compromisso já
                marcado, em calendário." Exemplo: "The meeting is happening on Friday at 2 PM." (Evento confirmado, está em agenda, avisos já foram enviados).
                "We are flying to Rio next week." (Reserva já feita, confirmada).
              </p>

              <p>
                A confusão acontece porque em português não distinguimos estes. Dizemos "Vou fazer isso" (going to com plano? ou will espontâneo?). Mas
                em inglês, a distinção é OBRIGATÓRIA e comunicada através destas três formas. CESGRANRIO testa isto porque falantes intermediários erram.
                Um texto Petrobras pode incluir os 3 em parágrafos diferentes: "We will conduct maintenance tomorrow" (decisão espontânea da gerência, just
                made the decision = WILL). "We are going to launch the project next quarter" (já foi aprovado, planejado = GOING TO). "Our board meeting
                is happening next Tuesday at 9 AM" (confirmado, em agenda = PRESENT CONTINUOUS para futuro).
              </p>

              <p>
                WILL = impermanência + espontaneidade. Se você souber que algo SERÁ (certeza permanente), use will. Se você acha que algo VAI ACONTECER
                (previsão sem certeza), use will. GOING TO = planejamento + evidência. Se você já planejou, use going to. Se você vê sinais óbvios
                de que algo vai acontecer (nuvens para chuva, estrutura para terremoto), use going to. PRESENT CONTINUOUS para futuro = agenda confirmada.
                É o futuro mais próximo do presente — está quase acontecendo. Booking confirmada, evento em calendário, avisos já enviados.
              </p>

              <p>
                Comparações diretas são essenciais. "I will become an engineer" = previsão genérica, sem plano específico. "I am going to become an
                engineer" = já fiz pesquisa, apliquei, decidi o caminho. "I am studying engineering" = já estou inscrito em aulas, começou semana passada.
                Cada forma é um nível de compromisso/evidência diferente com o futuro.
              </p>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 rounded-lg border border-orange-200 dark:border-orange-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Os 3 Futuros: Tabela Comparativa</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div className="space-y-2">
                    <div className="font-semibold text-orange-700 dark:text-orange-300">WILL (will + infinitive)</div>
                    <div>Decisão espontânea OU previsão genérica</div>
                    <div className="italic">"I will help you" "The system will fail"</div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-semibold text-amber-700 dark:text-amber-300">GOING TO (am/is/are + going to + infinitive)</div>
                    <div>Plano pré-decidido OU previsão com evidência VISÍVEL</div>
                    <div className="italic">"We are going to launch tomorrow" "It's going to rain"</div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-semibold text-yellow-700 dark:text-yellow-300">PRESENT CONTINUOUS (am/is/are + -ing)</div>
                    <div>Agenda confirmada, evento agendado, muito próximo</div>
                    <div className="italic">"The meeting is happening Friday" "We are flying tomorrow"</div>
                  </div>
                </div>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "① WILL vs GOING TO: Decisão vs Plano",
                  icone: <LuBookOpen className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-base leading-relaxed">
                        WILL é para decisões que você toma NESTE MOMENTO ou previsões sem evidência específica. "I will help you with this."
                        (Você acaba de decidir, no momento da fala). "The inspection will take 3 days." (Previsão geral, sem saber quantos dias
                        EXATAMENTE). GOING TO é para planos que você JÁ FEZ ou previsões onde você VÊ EVIDÊNCIA. "We are going to renovate the
                        office next month." (Já foi aprovado, orçamento já foi aprovado, data já foi marcada). "Look at the pressure gauge! The
                        system is going to shut down!" (Vejo números críticos AGORA — evidência).
                      </p>

                      <ComparisonSide
                        lado1={{
                          label: "WILL (Espontâneo/Genérico)",
                          content: "I will solve this problem.\nThe valve will control the pressure.\nWe will complete the project.",
                        }}
                        lado2={{
                          label: "GOING TO (Planejado/Evidência)",
                          content: "We are going to renovate the plant.\nThe pressure is going to exceed limits.\nWe are going to implement new safety rules.",
                        }}
                      />

                      <p className="text-base leading-relaxed">
                        Contexto Petrobras: Management na reunião: "We will reduce operational costs by 20%." (Decisão neste segundo, será comunicada
                        aos acionistas). Depois: "We are going to introduce a new Safety Management System next quarter." (Já aprovado, projeto já
                        começou, design já foi feito).
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "② GOING TO vs PRESENT CONTINUOUS: Plano vs Agenda",
                  icone: <LuPlay className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-base leading-relaxed">
                        GOING TO é para planos e projetos — ainda faltam passos antes de execução. PRESENT CONTINUOUS para futuro é para eventos
                        que JÁ ESTÃO NA AGENDA, praticamente confirmados. "We are going to build a new facility" = projeto aprovado, engenharia começou,
                        terreno escolhido. Ainda há meses de design. "We are building a new facility next month" = construção literal começa no próximo
                        mês, projeto está 100% finalizado, material já encomendado, equipe já selecionada.
                      </p>

                      <ComparisonSide
                        lado1={{
                          label: "GOING TO (Plano, não tão próximo)",
                          content: "We are going to implement AI in our systems.\nThe company is going to hire 100 engineers.\nWe are going to open offices in Brazil.",
                        }}
                        lado2={{
                          label: "PRESENT CONTINUOUS (Agenda definida, muito próximo)",
                          content: "We are implementing a new Safety System next Monday.\nThe board is meeting on Friday at 3 PM.\nWe are traveling to São Paulo next week.",
                        }}
                      />

                      <p className="text-base leading-relaxed">
                        Contexto Petrobras: Diretoria planeja: "We are going to explore new deepwater fields." (Plano em desenvolvimento). Operações
                        coordena: "The drilling team is departing for Platform A tomorrow at 7 AM." (Agenda confirmada, literal amanhã).
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "③ Exemplificação: Projeto vs Previsão vs Agenda",
                  icone: <LuLightbulb className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="border-l-4 border-orange-500 pl-4">
                          <p className="font-semibold">1. WILL: Decisão Espontânea (Agora)</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "The manager just decided: 'I will allocate more budget to this project.'"
                            <span className="block mt-1 text-xs italic">Análise: Decisão neste segundo. Comunicada oralmente, impacta imediatamente. WILL necessário.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-orange-500 pl-4">
                          <p className="font-semibold">2. WILL: Previsão Genérica (Sem Evidência Específica)</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "The inspection will identify potential issues."
                            <span className="block mt-1 text-xs italic">Análise: Expectativa geral. Não sei quais problemas. Apenas suposição. WILL necessário.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-amber-500 pl-4">
                          <p className="font-semibold">3. GOING TO: Plano Aprovado (Projeto Iniciado)</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "We are going to upgrade the pressure relief system. (It was already approved last month.)"
                            <span className="block mt-1 text-xs italic">Análise: Projeto foi aprovado, planejamento começou. Ainda não é execução (não é presente continuous). GOING TO necessário.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-amber-500 pl-4">
                          <p className="font-semibold">4. GOING TO: Previsão Com Evidência (Vejo Agora)</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "Look at the pressure gauge! The system is going to fail if we don't act immediately."
                            <span className="block mt-1 text-xs italic">Análise: Números críticos AGORA (evidência visível). Previsão baseada em dados presentes. GOING TO necessário.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-yellow-500 pl-4">
                          <p className="font-semibold">5. PRESENT CONTINUOUS: Agenda Confirmada (Evento Próximo)</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "The safety audit is happening next Tuesday at 9 AM." (It's in the calendar, confirmado.)"
                            <span className="block mt-1 text-xs italic">Análise: Evento está em agenda, confirmado, quase acontecendo (dias, não meses). PRESENT CONTINUOUS necessário.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-yellow-500 pl-4">
                          <p className="font-semibold">6. PRESENT CONTINUOUS: Booking Confirmada (Viagem)</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "We are flying to Rio de Janeiro next Friday at 2 PM." (Tickets booked, confirmado.)"
                            <span className="block mt-1 text-xs italic">Análise: Viagem é literal, reserva confirmada, acontece dias (não meses) de agora. PRESENT CONTINUOUS necessário.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-red-500 pl-4">
                          <p className="font-semibold">7. Errado: Confundindo WILL com GOING TO (1)</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "❌ The project is going to fail because of budget. → ✅ The project will fail because of budget."
                            <span className="block mt-1 text-xs italic">Análise: Previsão genérica (sem evidência específica de quando/como). WILL necessário. "Going to" exigiria evidência: "The budget numbers are 30% over now."</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-red-500 pl-4">
                          <p className="font-semibold">8. Confusão Clássica: Present Continuous em Contexto Errado</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "❌ We are implementing AI next year. → ✅ We are going to implement AI next year."
                            <span className="block mt-1 text-xs italic">Análise: "Next year" = meses de agora. Não está em agenda próxima. "Going to" para plano. Present continuous = dias.</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "④ Dicas: Distinção Prática",
                  icone: <LuLightbulb className="w-5 h-5" />,
                  conteudo: (
                    <CardCarousel
                      cards={[
                        {
                          titulo: "WILL: Decisão AGORA ou Previsão Genérica",
                          descricao: "Se você está decidindo neste exato momento, use WILL. Se está fazendo suposição sem evidência específica, use WILL. 'I will help' (acaba de decidir). 'It will rain tomorrow' (previsão geral).",
                          exemplo: "✓ 'I will solve this issue.' (Deciding now) ✗ 'I will solve this issue' (if planned yesterday → use going to)",
                        },
                        {
                          titulo: "GOING TO: Plano JÁ APROVADO ou Evidência VISÍVEL",
                          descricao: "Se o projeto/plano foi aprovado/começou, use GOING TO. Se você vê sinais óbvios agora (nuvens escuras, números críticos), use GOING TO.",
                          exemplo: "✓ 'We are going to drill tomorrow' (approved, team ready) 'It is going to rain' (see dark clouds now)",
                        },
                        {
                          titulo: "PRESENT CONTINUOUS: Agenda em Calendário (Dias, não meses)",
                          descricao: "Se o evento está confirmado em agenda, com data/hora definida, e está próximo (dias), use Present Continuous. É o futuro mais 'confirmado'.",
                          exemplo: "✓ 'The meeting is happening Friday at 3 PM' (calendar event) ✗ 'We are implementing AI next year' (too far, use going to)",
                        },
                        {
                          titulo: "Teste Prático: Qual é o Intervalo de Tempo?",
                          descricao: "Meses de agora? → Plano (going to). Dias de agora? → Agenda confirmada (present continuous). Decisão neste segundo? → Will.",
                          exemplo: "Today. Next weeks → present continuous. Next month+ → going to. Decision now → will.",
                        },
                        {
                          titulo: "Contexto Petrobras: Três Exemplos Reais",
                          descricao: "CEO meeting: 'We will reduce costs' (decision now). Project plan: 'We are going to upgrade systems' (approved, in progress). Operations: 'The audit is happening Tuesday' (calendar event).",
                          exemplo: "Will = Management Decision | Going To = Strategic Plan | Present Continuous = Operational Schedule",
                        },
                      ]}
                    />
                  ),
                },
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">WILL ou GOING TO?</p>
                    <p className="text-base">"We ___ implement new safety protocols next quarter."</p>
                    <p className="text-xs text-foreground/60">(will, are going to)</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ ARE GOING TO</p>
                    <p>Contexto: "Next quarter" + projeto já aprovado = GOING TO. Não é decisão espontânea (será). É plano pré-decidido.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Qual é o Futuro?</p>
                    <p className="text-base">"The board meeting ___ on Friday at 2 PM."</p>
                    <p className="text-xs text-foreground/60">(will be, is going to be, is being)</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ IS (happening/on Friday)</p>
                    <p>Evento em agenda confirmada, dias de agora. Present Continuous para futuro próximo. Não será, não going to. Está no calendário.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Decisão vs Plano</p>
                    <p className="text-base">"Manager says: 'I ___ approve this budget immediately.'"</p>
                    <p className="text-xs text-foreground/60">(will, am going to)</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ WILL</p>
                    <p>Decisão neste segundo. Não foi planejado antes. Manager está decidindo AGORA. WILL = decisão espontânea.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Evidência Visível?</p>
                    <p className="text-base">"Look! The pressure gauge shows 30 PSI over limit. The system ___ fail!"</p>
                    <p className="text-xs text-foreground/60">(will, is going to)</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ IS GOING TO</p>
                    <p>Evidência VISÍVEL AGORA (números críticos). Previsão baseada em dados presentes = GOING TO, não WILL (genérico).</p>
                  </div>
                }
              />
            </div>
          </section>

          

<ModuleConsolidation
            index={3}
            variant={mv[4]}
            maceteVisual={{
              title: "Future Forms — Quando Usar Cada Um",
              content: (
                <div className="space-y-2 text-sm">
                  <p><strong>WILL</strong> = decisão espontânea / previsão sem evidência: "I'll check the report."</p>
                  <p><strong>GOING TO</strong> = plano pré-decidido / evidência visível: "It's going to fail — look at the pressure."</p>
                  <p><strong>PRES. CONTINUOUS</strong> = agenda/compromisso agendado: "We are meeting at 9am tomorrow."</p>
                  <p className="text-xs text-muted-foreground">Planos de projeto Petrobras usam "going to" para metas e "will" para previsões financeiras.</p>
                </div>
              )
            }}
            onComplete={() => handleModuleComplete("modulo-4")}
          />

                    <QuizInterativo
            questoes={quizM4}
            titulo="Future Forms"
            numero={4}
            onComplete={() => handleModuleComplete("modulo-4")}
          />
        </div>
      </TabsContent>

      {/* MODULE 5-7 PLACEHOLDERS (for future implementation) */}
      {[5, 6, 7].map((modNum) => (
        <TabsContent key={`modulo-${modNum}`} value={`modulo-${modNum}`}>
          <div className="space-y-12 animate-in fade-in duration-500">
            <ModuleBanner
              modulo={modNum}
              titulo={MODULE_DEFS[modNum - 1]?.title || `Módulo ${modNum}`}
              icone={<LuBookOpen className="w-8 h-8" />}
              corModulo={getModuleVariant(modNum)}
              descricao={`Aprofundamento em ${MODULE_DEFS[modNum - 1]?.title || "Verb Tenses"}`}
            />
            <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
              <ModuleSectionHeader
                titulo={MODULE_DEFS[modNum - 1]?.title || `Módulo ${modNum}`}
                descricao="Conteúdo premium detalhado será adicionado em breve"
              />
              <div className="text-center py-16 text-foreground/50">
                <p>Este módulo está em desenvolvimento. Volte em breve para conteúdo premium detalhado.</p>
              </div>
            </section>
          </div>
        </TabsContent>
      ))}

      {/* MODULE 5 — PASSIVE VOICE */}
      <TabsContent value="modulo-5">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={5}
            titulo="Passive Voice"
            variant={mv[5]}
            descricao="A voz passiva domina textos técnicos porque o foco é no PROCESSO, não em quem faz"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Voz Passiva em Contextos Técnicos"
              description="Procedimentos, manuais e relatórios Petrobras preferem a voz passiva porque enfatizam o que FOI FEITO, não quem o fez"
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                A voz passiva é o idioma padrão de textos técnicos porque desvia o foco de QUEM FAZ uma ação para O PROCESSO que está sendo realizado.
                Quando você lê "The valve was inspected yesterday", você não se preocupa em saber QUEM inspecionou — o importante é que a válvula foi inspecionada
                e está em bom estado. Este é precisamente o interesse do leitor de manuais técnicos, relatórios de segurança e procedimentos operacionais.
                A estrutura fundamental é simples: BE + Past Participle. "The system is maintained regularly" (Simple Present Passive). "The equipment was repaired
                yesterday" (Simple Past Passive). "The inspection has been completed" (Present Perfect Passive). "The report will be submitted tomorrow" (Future Passive).
                "If needed, the valve would be replaced" (Conditional Passive). A voz passiva existe em TODOS os tempos verbais, usando sempre BE (em sua forma apropriada
                para o tempo) + Past Participle do verbo principal.
              </p>

              <p>
                A by-phrase (by the technician, by the team) é opcional na voz passiva e deve ser usada APENAS quando a identidade do agente é importante para o significado.
                Em manuais Petrobras, vemos raramente by-phrases porque o documento assume que procedimentos são seguidos corretamente. Você vê "The pressure relief valve
                was closed" (sem by-phrase) porque a identidade do técnico não importa — o importante é o estado da válvula. Se, porém, você precisa especificar responsabilidade
                ou informar um detalhe crucial como "The inspection was conducted by the safety team", aí a by-phrase é necessária. O get-passive ("The valve got damaged")
                é coloquial, temporário e raro em textos técnicos — sempre prefira "The valve was damaged" em contextos formais.
              </p>

              <p>
                Quando escolher a voz passiva? Sempre que: (1) O processo é mais importante que o agente, (2) Você quer destacar o objeto afetado, (3) O agente é desconhecido
                ou óbvio, (4) Você escreve procedimentos ou instruções técnicas, (5) Você redige relatórios formais. A voz ativa ("The technician inspected the valve")
                enfatiza QUEM FAZ. A voz passiva ("The valve was inspected") enfatiza O QUÊ FOI FEITO. Em documentação Petrobras, você encontrará voz passiva predominante
                em: equipment specifications ("The pump is designed for high-pressure operations"), maintenance logs ("The system was serviced on March 15"), safety procedures
                ("All personnel must follow the protocols before starting operations"), incident reports ("The leak was discovered in Sector B").
              </p>

              <p>
                Alguns verbos NÃO aceitam voz passiva. Transitivos diretos como "give", "send", "bring", "teach" podem ser passivados normalmente: "The report was sent to
                the team." Mas verbos intransitivos como "happen", "occur", "go", "come", "arrive" NUNCA têm voz passiva — são ações que não afetam um objeto direto.
                Você nunca diz "The accident was happened" ou "The problem was occurred". Estes verbos indicam eventos que simplesmente acontecem, não processos que alguém realiza.
              </p>

              <p>
                Em contexto Petrobras, a voz passiva não é apenas uma escolha gramatical — é uma estratégia comunicativa. Procedimentos são documentados em voz passiva porque
                o documento foca no resultado, não na pessoa. Incidentes são reportados em voz passiva porque o objetivo é registrar O QUÊ aconteceu, não criticar QUEM estava
                envolvido. Inspeções são documentadas em voz passiva porque o leitor quer saber O ESTADO do equipamento, não a identidade do inspetor.
              </p>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg border border-purple-200 dark:border-purple-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Formação da Voz Passiva em Todos os Tempos</h4>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <div className="font-semibold">Simple Present</div>
                    <div className="text-xs italic">am/is/are + Past Participle</div>
                    <div className="text-foreground/80">"The system is maintained regularly."</div>
                  </div>
                  <div className="border-l-4 border-pink-500 pl-4">
                    <div className="font-semibold">Simple Past</div>
                    <div className="text-xs italic">was/were + Past Participle</div>
                    <div className="text-foreground/80">"The equipment was repaired yesterday."</div>
                  </div>
                  <div className="border-l-4 border-rose-500 pl-4">
                    <div className="font-semibold">Present Perfect</div>
                    <div className="text-xs italic">has/have + been + Past Participle</div>
                    <div className="text-foreground/80">"The inspection has been completed."</div>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4">
                    <div className="font-semibold">Future Simple</div>
                    <div className="text-xs italic">will + be + Past Participle</div>
                    <div className="text-foreground/80">"The report will be submitted tomorrow."</div>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <div className="font-semibold">Conditional</div>
                    <div className="text-xs italic">would + be + Past Participle</div>
                    <div className="text-foreground/80">"If needed, the valve would be replaced."</div>
                  </div>
                </div>
              </div>
            </div>

            <ComparisonSide
              lado1={{
                label: "ACTIVE VOICE (Ênfase: Quem faz)",
                content: `The technician inspected the valve.
The team completed the maintenance.
The engineer designed the system.`
              }}
              lado2={{
                label: "PASSIVE VOICE (Ênfase: O que foi feito)",
                content: `The valve was inspected (by the technician).
The maintenance was completed (by the team).
The system was designed (by the engineer).`
              }}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "① Conceituação: Estrutura e Formação",
                  icone: <LuBookOpen className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-base leading-relaxed">
                        A voz passiva segue um padrão consistente: sujeito recebe a ação ao invés de realizá-la. Para converter active para passive:
                        (1) O objeto direto (what) da ativa vira sujeito da passiva, (2) O verbo vira BE (no tempo apropriado) + Past Participle,
                        (3) O sujeito original pode entrar como by-phrase ou ser omitido. Exemplo: "The technician inspected the valve" → "The valve was inspected
                        (by the technician)." O objeto "the valve" vira sujeito. O verbo "inspected" vira "was inspected". O sujeito "the technician" opcional entra
                        como by-phrase.
                      </p>

                      <div className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-4 space-y-3">
                        <h5 className="font-semibold text-sm">Verbos que NUNCA Aceitam Passiva:</h5>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>• happen (acontecer)</div>
                          <div>• occur (ocorrer)</div>
                          <div>• go (ir)</div>
                          <div>• come (vir)</div>
                          <div>• arrive (chegar)</div>
                          <div>• exist (existir)</div>
                          <div>• appear (aparecer)</div>
                          <div>• remain (permanecer)</div>
                        </div>
                      </div>

                      <p className="text-base leading-relaxed">
                        A by-phrase é opcional e deve ser incluída APENAS quando essencial ao significado. Em documentação técnica Petrobras, você verá pouquíssimas
                        by-phrases porque a identidade do executante é irrelevante — o documento quer registrar O QUÊ foi feito e em qual estado ficou. "The pressure
                        relief valve was tested" é suficiente. "The pressure relief valve was tested by Technician Silva" acrescenta informação não técnica.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "② Exemplificação: Transformação Active → Passive",
                  icone: <LuPlay className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="border-l-4 border-purple-500 pl-4">
                          <p className="font-semibold">1. Manual Técnico: Função Permanente</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "The safety system monitors pressure continuously."
                            <span className="block mt-1 text-xs italic text-purple-600">ATIVO: Ênfase no sistema que trabalha.</span>
                          </p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "Pressure is monitored continuously by the safety system."
                            <span className="block mt-1 text-xs italic text-purple-600">PASSIVO: Ênfase na pressão que é monitorada. Preferível em manuais.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-pink-500 pl-4">
                          <p className="font-semibold">2. Relatório de Incidente: By-Phrase Opcional</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "The team discovered a leak in Sector B."
                            <span className="block mt-1 text-xs italic text-pink-600">ATIVO: Identifica quem descobriu.</span>
                          </p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "A leak was discovered in Sector B."
                            <span className="block mt-1 text-xs italic text-pink-600">PASSIVO: Foca no fato. O by-phrase é desnecessário em relatórios técnicos.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-rose-500 pl-4">
                          <p className="font-semibold">3. Procedimento de Segurança: Diretiva Clara</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "Operators must close the isolation valve before maintenance."
                            <span className="block mt-1 text-xs italic text-rose-600">ATIVO: Diz ao operador o que fazer.</span>
                          </p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "The isolation valve must be closed before maintenance."
                            <span className="block mt-1 text-xs italic text-rose-600">PASSIVO: Ênfase na ação necessária. Padrão em procedimentos.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-red-500 pl-4">
                          <p className="font-semibold">4. Inspeção Concluída: Present Perfect Passive</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "The team has completed the inspection."
                            <span className="block mt-1 text-xs italic text-red-600">ATIVO: Foca na equipe.</span>
                          </p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "The inspection has been completed."
                            <span className="block mt-1 text-xs italic text-red-600">PASSIVO: Foca na conclusão da inspeção. Preferível em relatórios.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-orange-500 pl-4">
                          <p className="font-semibold">5. Condicional: Ação Hipotética</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "If the pressure exceeds the limit, we would release it."
                            <span className="block mt-1 text-xs italic text-orange-600">ATIVO: Ação nossa em resposta.</span>
                          </p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "If the pressure exceeds the limit, it would be released automatically."
                            <span className="block mt-1 text-xs italic text-orange-600">PASSIVO: Processo automático. Ênfase no equipamento, não na ação humana.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-indigo-500 pl-4">
                          <p className="font-semibold">6. Log de Eventos: Histórico Neutro</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "The technician recorded the data at 14:30."
                            <span className="block mt-1 text-xs italic text-indigo-600">ATIVO: Identifica o técnico (responsabilidade).</span>
                          </p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "The data was recorded at 14:30."
                            <span className="block mt-1 text-xs italic text-indigo-600">PASSIVO: Foca no registro do dado. Melhor para logs automatizados ou procedimentos.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-violet-500 pl-4">
                          <p className="font-semibold">7. By-Phrase Necessária: Responsabilidade Importante</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "The safety certification was issued by the regulatory body."
                            <span className="block mt-1 text-xs italic text-violet-600">PASSIVO + BY-PHRASE: A identidade importa — o órgão regulador é crucial.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-fuchsia-500 pl-4">
                          <p className="font-semibold">8. Get-Passive (Coloquial, Evite):</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "The equipment got damaged during transport."
                            <span className="block mt-1 text-xs italic text-fuchsia-600">❌ COLOQUIAL: Evite em contextos técnicos formais.</span>
                          </p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "The equipment was damaged during transport."
                            <span className="block mt-1 text-xs italic text-fuchsia-600">✅ FORMAL: Use sempre em documentos técnicos.</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "③ Estratégia: Quando Usar Passiva",
                  icone: <LuLightbulb className="w-5 h-5" />,
                  conteudo: (
                    <CardCarousel
                      cards={[
                        {
                          titulo: "Foco no PROCESSO?",
                          descricao: "Se o leitor precisa saber O QUÊ foi feito (resultado) em vez de QUEM fez, use Passive. Procedimentos técnicos sempre focam no processo.",
                          exemplo: "✓ The system is calibrated weekly. NOT: Engineers calibrate the system weekly.",
                        },
                        {
                          titulo: "By-Phrase Necessária?",
                          descricao: "Inclua by-phrase APENAS se a identidade do agente é crucial para o significado. Em manuais, raramente é. Em relatórios de responsabilidade, pode ser.",
                          exemplo: "✓ The report was signed by the Safety Director. (Identidade importa)",
                        },
                        {
                          titulo: "Contexto Formal/Técnico?",
                          descricao: "Textos técnicos, manuais, procedimentos e relatórios formais preferem Passive. Get-passive ('got damaged') é muito coloquial para estes contextos.",
                          exemplo: "✓ Procedure: The valve is closed before starting. NOT: ...the operator closes...",
                        },
                        {
                          titulo: "Agente Desconhecido ou Óbvio?",
                          descricao: "Se o agente é desconhecido ('O vidro foi quebrado' — não sei quem quebrou) ou óbvio (num procedimento, todos sabem como), omita-o.",
                          exemplo: "✓ The inspection was completed on time. (Quem? Óbvio — a equipe de inspeção.)",
                        },
                        {
                          titulo: "Responsabilidade vs Informação?",
                          descricao: "Active = responsabilidade (quem fez). Passive = informação técnica (o que foi feito). Em procedimentos, escolha Passive.",
                          exemplo: "✓ Manual: 'The pressure is released automatically.' Focus: equipamento, não pessoa.",
                        },
                      ]}
                    />
                  ),
                },
                {
                  titulo: "④ Avisos: Pegadinhas com Passiva",
                  icone: <LuTriangleAlert className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox
                        tipo="danger"
                        titulo="Pegadinha #1: Verbos Intransitivos Nunca São Passivos"
                      >
                        <Comparison title="Exemplos" left={{ title: "ERRADO", content: "The accident was happened. The problem was occurred. The solution was arrived.", description: "", variant: "danger" }} right={{ title: "CORRETO", content: "The accident happened. The problem occurred. We arrived at a solution.", description: "", variant: "success" }} />
                      </AlertBox>

                      <AlertBox
                        tipo="warning"
                        titulo="Pegadinha #2: By-Phrase Opcionais — Não Abuse"
                      >
                        <Comparison title="Exemplos" left={{ title: "DESNECESSÁRIO", content: "The valve was closed by the operator. The pressure was recorded by the instrument.", description: "", variant: "danger" }} right={{ title: "CONCISO", content: "The valve was closed. The pressure was recorded. (By-phrase omitido porque óbvio)", description: "", variant: "success" }} />
                      </AlertBox>

                      <AlertBox
                        tipo="danger"
                        titulo="Pegadinha #3: Get-Passive é Coloquial, Evite em Textos Formais"
                      >
                        <Comparison title="Exemplos" left={{ title: "COLOQUIAL", content: "The equipment got damaged. The personnel got injured. The procedure got changed.", description: "", variant: "danger" }} right={{ title: "FORMAL", content: "The equipment was damaged. The personnel were injured. The procedure was changed.", description: "", variant: "success" }} />
                      </AlertBox>

                      <AlertBox
                        tipo="warning"
                        titulo="Pegadinha #4: Passive Perfeita Exige 'Been'"
                      >
                        <Comparison title="Exemplos" left={{ title: "ERRADO", content: "The inspection has completed. The system is maintained regularly. The data has recorded.", description: "", variant: "danger" }} right={{ title: "CORRETO", content: "The inspection has been completed. The system is being maintained regularly. The data has been recorded.", description: "", variant: "success" }} />
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Transforme para Passive:</p>
                    <p className="text-base">"The technician inspected the valve."</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ THE VALVE WAS INSPECTED</p>
                    <p>Ou com by-phrase opcional: "The valve was inspected by the technician." Mas em documentos técnicos, a by-phrase é frequentemente omitida.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Passive → Active:</p>
                    <p className="text-base">"The report has been submitted."</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ SOMEONE HAS SUBMITTED THE REPORT</p>
                    <p>A passiva omite o agente porque é desconhecido ou óbvio. Se precisasse especificar: "The report has been submitted by the team."</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Qual é correta?</p>
                    <p className="text-base">"The accident _____ at 14:30."</p>
                    <p className="text-xs text-foreground/60">(A) happened (B) was happened</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ HAPPENED</p>
                    <p>"Happen" é intransitivo e NUNCA recebe voz passiva. O acidente simplesmente aconteceu — ninguém causa o acidente, ele ocorre.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Present Perfect Passive:</p>
                    <p className="text-base">"The system _____ serviced."</p>
                    <p className="text-xs text-foreground/60">(A) has (B) has been (C) is</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ HAS BEEN</p>
                    <p>Present Perfect Passive SEMPRE: has/have + BEEN + Past Participle. "The system has been serviced." Erro comum: omitir "been".</p>
                  </div>
                }
              />
            </div>
          </section>

          

<ModuleConsolidation
            index={2}
            variant={mv[5]}
            maceteVisual={{
              title: "Passive Voice — Regra de Ouro",
              content: (
                <div className="space-y-2 text-sm">
                  <p><strong>ESTRUTURA</strong>: BE (conjugado) + Past Participle</p>
                  <p><strong>EXEMPLOS</strong>: "is inspected" | "was repaired" | "has been submitted" | "is being monitored"</p>
                  <p><strong>BY-PHRASE</strong>: use somente quando o agente é relevante: "...by the engineering team."</p>
                  <p className="text-xs text-muted-foreground">Textos técnicos Petrobras usam passiva porque o PROCESSO é mais importante que quem o executa.</p>
                </div>
              )
            }}
            onComplete={() => handleModuleComplete("modulo-5")}
          />

                    <QuizInterativo
            questoes={quizM5}
            titulo="Passive Voice"
            numero={5}
            onComplete={() => handleModuleComplete("modulo-5")}
          />
        </div>
      </TabsContent>

      {/* MODULE 6 — MODAL VERBS */}
      <TabsContent value="modulo-6">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={6}
            titulo="Modal Verbs"
            variant={mv[6]}
            descricao="Modificadores de força, obrigação, capacidade e possibilidade que qualificam cada ação"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Modais: O Espectro de Certeza e Obrigação"
              description="Can, may, must, should, have to, could, might, would — cada um qualifica a força de uma ação de forma única"
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Os verbos modais (can, may, must, should, have to, could, might, would) são "modificadores de força" porque qualificam o grau de certeza, obrigação,
                capacidade ou permissão de uma ação. Eles não descrevem o verbo em si, mas o contexto da ação. "You must complete the safety training" indica obrigação
                imposta por lei ou regulamento. "You should complete the safety training" indica recomendação ou conselho fraco. "You can complete the safety training"
                indica capacidade ou permissão. Todos os três significam que você vai fazer algo relacionado a treinamento, mas cada modal qualifica COMO ou COM QUÊ
                FORÇA essa ação é exigida. Este é o centro da compreensão de modais — não são tempos verbais (como past ou future), são qualificadores de atitude.
              </p>

              <p>
                MUST significa obrigação forte imposta por lei, regra ou dedução lógica. "You MUST follow the safety procedures" (regra obrigatória). "The leak MUST be
                in the pump" (dedução — tem que estar lá porque a lógica aponta). Em contextos Petrobras, MUST aparece em safety requirements, regulations, critical procedures.
                HAVE TO significa obrigação exterior imposta por circunstância, não lei. "I HAVE TO attend the meeting" (circunstância, não escolha, mas não é lei).
                Importante: "You don't HAVE TO come" (não é necessário) versus "You MUST NOT come" (proibição). A negação desses dois modais têm significados radicalmente
                diferentes. "Don't have to" = sem obrigação. "Must not" = proibição explícita.
              </p>

              <p>
                SHOULD é recomendação ou conselho fraco, obrigação menor. "You SHOULD check the pressure regularly" (conselho, não mandato absoluto). "The inspection
                SHOULD be completed by Friday" (esperado, preferível, mas não mandatório). CAN/COULD indicam capacidade (can = presente, could = passado ou hipotético).
                "I CAN speak English" (capacidade presente). "I COULD speak English before" (capacidade que tive mas talvez tenha perdido). "If we had more time,
                we COULD solve this" (hipotético, se as condições fossem diferentes).
              </p>

              <p>
                MAY/MIGHT indicam possibilidade ou permissão. MAY é mais certo, MIGHT menos. "The report MAY arrive tomorrow" (possível, mais provável). "It MIGHT rain"
                (talvez, incerteza maior). Para permissão formal: "You MAY proceed with the test" (permissão, aprovação). Em contextos informais, "Can I go?" está ok,
                mas em documentos técnicos Petrobras, "May I proceed?" é mais formal. WOULD indica condicional, hábito passado ou solicitação educada. "If we increased
                pressure, it WOULD work" (condicional). "Every morning he WOULD check the valves" (hábito passado, rotina que não se repete mais). "Would you help me?"
                (solicitação educada).
              </p>

              <p>
                Em contexto Petrobras, os modais criam um espectro de certeza do mais forte (MUST) até o mais fraco (MIGHT), passando por SHOULD (recomendação),
                CAN (capacidade/permissão), MAY (possibilidade mais certa), e MIGHT (possibilidade menos certa). Este espectro é fundamental para safety protocols
                (onde MUST domina), procedimentos operacionais (onde SHOULD é comum), e risk assessments (onde MIGHT e MAY indicam cenários possíveis).
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Escala de Força: MUST → MIGHT</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="font-bold text-red-600 min-w-fit">MUST</div>
                    <div className="flex-1 text-foreground/80">Obrigação Absoluta (Lei, Regra Imposta)</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="font-bold text-orange-600 min-w-fit">HAVE TO</div>
                    <div className="flex-1 text-foreground/80">Obrigação Exterior (Circunstância)</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="font-bold text-yellow-600 min-w-fit">SHOULD</div>
                    <div className="flex-1 text-foreground/80">Recomendação/Conselho (Obrigação Fraca)</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="font-bold text-green-600 min-w-fit">CAN</div>
                    <div className="flex-1 text-foreground/80">Capacidade/Permissão (Habilidade Presente)</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="font-bold text-blue-600 min-w-fit">MAY</div>
                    <div className="flex-1 text-foreground/80">Possibilidade (50-70% certeza)</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="font-bold text-purple-600 min-w-fit">MIGHT</div>
                    <div className="flex-1 text-foreground/80">Possibilidade (20-50% certeza)</div>
                  </div>
                </div>
              </div>
            </div>

            <CardCarousel
              cards={[
                {
                  titulo: "MUST: Obrigação Absoluta",
                  descricao: "Imposta por lei, regra ou dedução lógica. Em Petrobras: safety mandates, regulatory requirements, logical conclusions.",
                  exemplo: "You MUST complete the safety training. The leak MUST be in the pump.",
                },
                {
                  titulo: "SHOULD: Recomendação",
                  descricao: "Conselho, obrigação fraca, o que é preferível mas não absolutamente mandatório.",
                  exemplo: "You SHOULD check the pressure regularly. The inspection SHOULD be completed by Friday.",
                },
                {
                  titulo: "CAN: Capacidade/Permissão",
                  descricao: "Habilidade presente, o que é possível. Permissão menos formal que 'may'.",
                  exemplo: "I CAN speak English. You CAN proceed with the test.",
                },
                {
                  titulo: "MAY: Possibilidade Maior",
                  descricao: "Mais certeza que MIGHT. Permissão formal. Mais educado que 'can' em contextos técnicos.",
                  exemplo: "The report MAY arrive tomorrow. You MAY proceed with caution.",
                },
                {
                  titulo: "MIGHT: Possibilidade Menor",
                  descricao: "Maior incerteza. Cenários de risco, eventos improváveis mas possíveis.",
                  exemplo: "It MIGHT rain. The pressure MIGHT exceed the limit if we don't act.",
                },
                {
                  titulo: "WOULD: Condicional/Hábito",
                  descricao: "Ação hipotética, hábito passado, solicitação educada.",
                  exemplo: "If we increased pressure, it WOULD work. Would you help me?",
                },
              ]}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "① Conceituação: Os 8 Modais Principais",
                  icone: <LuBookOpen className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-base leading-relaxed">
                        Cada modal tem um "significado núcleo" que se ramifica em contextos. MUST = forte imposição, CAN = capacidade/permissão, MAY = possibilidade
                        com permissão formal, MIGHT = menor possibilidade, SHOULD = recomendação, HAVE TO = obrigação circunstancial, COULD = capacidade passada ou
                        condicional, WOULD = condicional ou hábito passado. A estrutura é simples: modal + infinitivo SEM "to" (exceto "have to", que é semi-modal).
                        "You MUST go", "You SHOULD go", "You CAN go", "You MAY go", "You MIGHT go", "You COULD go", "You WOULD go", "You HAVE TO go".
                      </p>

                      <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 space-y-3">
                        <h5 className="font-semibold text-sm">Negações Criticamente Diferentes:</h5>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div><span className="font-semibold">MUST NOT</span> = Proibição explícita (❌ não faça)</div>
                          <div><span className="font-semibold">DON'T HAVE TO</span> = Sem obrigação (nem faça nem deixe de fazer)</div>
                          <div><span className="font-semibold">SHOULDN'T</span> = Recomendação negativa (não é bom fazer)</div>
                          <div><span className="font-semibold">CAN'T</span> = Impossibilidade lógica ou proibição</div>
                          <div><span className="font-semibold">MAY NOT</span> = Permissão negada, proibição formal</div>
                          <div><span className="font-semibold">MIGHT NOT</span> = Possível que não aconteça</div>
                        </div>
                      </div>

                      <p className="text-base leading-relaxed">
                        A distinção entre MUST NOT (proibição) e DON'T HAVE TO (sem obrigação) é critical em contextos onde o significado importa. Em uma situação de
                        emergência: "You MUST NOT enter without equipment" (proibição absoluta). Em um dia normal: "You don't HAVE TO attend the meeting if you're busy"
                        (sem obrigação, mas se puder, talvez fosse bom). Em Petrobras, MUST NOT aparece em safety protocols. Don't have to aparece em procedimentos opcionais.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "② Exemplificação: Contexto Petrobras & HSE",
                  icone: <LuPlay className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="border-l-4 border-red-600 pl-4">
                          <p className="font-semibold">1. Safety Mandate: MUST (Obrigação Absoluta)</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "All personnel MUST wear hard hats in restricted areas."
                            <span className="block mt-1 text-xs italic">Análise: Lei, regulamento, obrigação absoluta. Sem exceção.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-orange-600 pl-4">
                          <p className="font-semibold">2. Circunstância Obrigatória: HAVE TO</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "Due to the equipment failure, we HAVE TO shut down production today."
                            <span className="block mt-1 text-xs italic">Análise: Obrigação imposta pela circunstância (falha), não por lei.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-yellow-600 pl-4">
                          <p className="font-semibold">3. Recomendação: SHOULD</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "The pressure gauge SHOULD be recalibrated quarterly."
                            <span className="block mt-1 text-xs italic">Análise: Melhor prática, recomendação, não absolutamente mandatório.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-green-600 pl-4">
                          <p className="font-semibold">4. Capacidade/Permissão: CAN</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "The new pump CAN handle pressures up to 500 bar."
                            <span className="block mt-1 text-xs italic">Análise: Capacidade técnica da máquina.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-blue-600 pl-4">
                          <p className="font-semibold">5. Possibilidade Razoável: MAY</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "The inspection MAY be delayed due to weather conditions."
                            <span className="block mt-1 text-xs italic">Análise: Cenário possível, mas não garantido. Maior probabilidade que MIGHT.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-purple-600 pl-4">
                          <p className="font-semibold">6. Possibilidade Remota: MIGHT</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "The system MIGHT fail if we exceed operational limits, but we have safeguards."
                            <span className="block mt-1 text-xs italic">Análise: Cenário de risco, possível mas improvável. Menor probabilidade.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-indigo-600 pl-4">
                          <p className="font-semibold">7. Capacidade Passada: COULD</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "The old system COULD only handle 300 bar; the new system handles 500 bar."
                            <span className="block mt-1 text-xs italic">Análise: Capacidade que tinha no passado, mas não tem mais.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-pink-600 pl-4">
                          <p className="font-semibold">8. Condicional: WOULD</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "If we increased the pressure by 10%, the flow WOULD increase proportionally."
                            <span className="block mt-1 text-xs italic">Análise: Hipótese, não realidade. Consequência de uma condição.</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "③ Estratégia: Escolher o Modal Certo",
                  icone: <LuLightbulb className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox
                        tipo="info"
                        titulo="MUST vs HAVE TO: Qual é mais forte?"
                      >
                        <Comparison title="Exemplos" left={{ title: "MUST (Lei/Regra)", content: "You MUST follow the safety protocol (é regulamentação).", description: "", variant: "danger" }} right={{ title: "HAVE TO (Circunstância)", content: "We HAVE TO shut down because of the breakdown (situação exigiu).", description: "", variant: "success" }} />
                      </AlertBox>

                      <AlertBox
                        tipo="info"
                        titulo="SHOULD vs MUST: Recomendação vs Mandato"
                      >
                        <Comparison title="Exemplos" left={{ title: "SHOULD (Recomendação)", content: "You SHOULD backup your data weekly.", description: "", variant: "danger" }} right={{ title: "MUST (Obrigação)", content: "You MUST complete the safety training before starting work.", description: "", variant: "success" }} />
                      </AlertBox>

                      <AlertBox
                        tipo="info"
                        titulo="CAN vs MAY: Capacidade vs Possibilidade"
                      >
                        <Comparison title="Exemplos" left={{ title: "CAN (Capacidade)", content: "The pump CAN operate at 500 bar (é capaz).", description: "", variant: "danger" }} right={{ title: "MAY (Possibilidade)", content: "Pressure MAY exceed the limit if not monitored (é possível).", description: "", variant: "success" }} />
                      </AlertBox>

                      <AlertBox
                        tipo="info"
                        titulo="COULD (Passado) vs CAN (Presente)"
                      >
                        <Comparison title="Exemplos" left={{ title: "COULD (Passado)", content: "The old equipment COULD handle 300 bar.", description: "", variant: "danger" }} right={{ title: "CAN (Presente)", content: "The new equipment CAN handle 500 bar.", description: "", variant: "success" }} />
                      </AlertBox>

                      <AlertBox
                        tipo="info"
                        titulo="WOULD para Hábito Passado"
                      >
                        <Comparison title="Exemplos" left={{ title: "WOULD (Hábito)", content: "Every morning he WOULD check the pressure (rotina passada).", description: "", variant: "danger" }} right={{ title: "Simple Past (Evento)", content: "Yesterday he checked the pressure at 8 AM (evento específico).", description: "", variant: "success" }} />
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "④ Avisos: Confusões Comuns com Modais",
                  icone: <LuTriangleAlert className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox
                        tipo="danger"
                        titulo="Pegadinha #1: MUST NOT vs DON'T HAVE TO"
                      >
                        <Comparison title="Exemplos" left={{ title: "MUST NOT (Proibição)", content: "You MUST NOT enter without equipment. (Proibido, crime não entrar.)", description: "", variant: "danger" }} right={{ title: "DON'T HAVE TO (Opcional)", content: "You don't HAVE TO attend the meeting. (Opcional, você escolhe.)", description: "", variant: "success" }} />
                      </AlertBox>

                      <AlertBox
                        tipo="danger"
                        titulo="Pegadinha #2: CAN vs MAY para Permissão"
                      >
                        <Comparison title="Exemplos" left={{ title: "COLOQUIAL", content: "Can I start the procedure? Can we enter the restricted area?", description: "", variant: "danger" }} right={{ title: "FORMAL", content: "May I start the procedure? May we enter the restricted area?", description: "", variant: "success" }} />
                      </AlertBox>

                      <AlertBox
                        tipo="danger"
                        titulo="Pegadinha #3: COULD Passado vs COULD Condicional"
                      >
                        <Comparison title="Exemplos" left={{ title: "COULD Passado", content: "I could swim before my injury (capacidade perdida).", description: "", variant: "danger" }} right={{ title: "COULD Condicional", content: "If we had time, we could solve this (se fosse possível, conseguiríamos).", description: "", variant: "success" }} />
                      </AlertBox>

                      <AlertBox
                        tipo="warning"
                        titulo="Pegadinha #4: Modais NUNCA Tomam 'to' (exceto HAVE TO)"
                      >
                        <Comparison title="Exemplos" left={{ title: "ERRADO", content: "You must to complete. We can to do it. You should to check.", description: "", variant: "danger" }} right={{ title: "CORRETO", content: "You must complete. We can do it. You should check. (HAVE TO exigir: You have to complete.)", description: "", variant: "success" }} />
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Escolha o modal:</p>
                    <p className="text-base">"All workers ___ complete the training before starting."</p>
                    <p className="text-xs text-foreground/60">(A) must (B) should (C) can</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ MUST</p>
                    <p>Lei de segurança obrigatória. MUST = mandato absoluto. Should = recomendação fraca. Can = capacidade.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Qual negação é correta?</p>
                    <p className="text-base">"You ___ enter the lab without a badge."</p>
                    <p className="text-xs text-foreground/60">(A) can't (B) shouldn't (C) don't have to</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ CAN'T ou MUST NOT</p>
                    <p>É uma proibição (não permitido). Can't e must not = proibição. Don't have to = opcional. Shouldn't = desaconselhado.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">COULD Passado ou Condicional?</p>
                    <p className="text-base">"When I was younger, I ___ work 12 hours without fatigue."</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ COULD (Passado)</p>
                    <p>"When I was younger" = contexto passado. Capacidade que tive mas talvez não tenha mais. É COULD para hábito ou capacidade passada.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Modal certo?</p>
                    <p className="text-base">"The report ___ arrive tomorrow, but it's not guaranteed."</p>
                    <p className="text-xs text-foreground/60">(A) may (B) might (C) will</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ MAY ou MIGHT</p>
                    <p>Incerteza: "might not guaranteed" sugerindo possibilidade mas sem certeza. May = um pouco mais de certeza. Might = menos certo.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Hábito Passado vs Evento:</p>
                    <p className="text-base">"Every shift he ___ inspect the equipment."</p>
                    <p className="text-xs text-foreground/60">Qual modal?</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ WOULD ou USED TO</p>
                    <p>"Every shift" = rotina repetida no passado. WOULD exprime hábito passado. Used to também (mais comum em coloquial).</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">MUST NOT vs DON'T HAVE TO:</p>
                    <p className="text-base">"You ___ touch the hot surface; it's dangerous."</p>
                    <p className="text-xs text-foreground/60">Qual é proibição?</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ MUST NOT</p>
                    <p>Perigo = proibição absoluta (MUST NOT). Don't have to = opcional, não obrigatório. Aqui é perigoso, então é MUST NOT.</p>
                  </div>
                }
              />
            </div>
          </section>

          

<ModuleConsolidation
            index={2}
            variant={mv[6]}
            maceteVisual={{
              title: "Modal Verbs — Força e Função",
              content: (
                <div className="space-y-2 text-sm">
                  <p><strong>MUST</strong> = obrigação interna / dedução lógica forte</p>
                  <p><strong>HAVE TO</strong> = obrigação externa (regra, lei)</p>
                  <p><strong>MUST NOT</strong> = proibição | <strong>DON'T HAVE TO</strong> = não é necessário (mas pode)</p>
                  <p><strong>SHOULD</strong> = recomendação | <strong>MAY/MIGHT</strong> = possibilidade (may = maior)</p>
                  <p className="text-xs text-muted-foreground">HSE Petrobras usa "must" para obrigações de segurança e "should" para boas práticas.</p>
                </div>
              )
            }}
            onComplete={() => handleModuleComplete("modulo-6")}
          />

                    <QuizInterativo
            questoes={quizM6}
            titulo="Modal Verbs"
            numero={6}
            onComplete={() => handleModuleComplete("modulo-6")}
          />
        </div>
      </TabsContent>

      {/* MODULE 7 — CONDITIONAL SENTENCES */}
      <TabsContent value="modulo-7">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={7}
            titulo="Conditional Sentences"
            variant={mv[7]}
            descricao="SE X acontecer, ENTÃO Y resultará — a lógica central do pensamento técnico e de risco"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Condicionais: A Lógica de SE... ENTÃO"
              description="Type 0, 1, 2 progridem de lei universal até hipótese improvável — cada uma com estrutura e contexto únicos"
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                As sentenças condicionais são a estrutura lógica central do pensamento técnico. Toda avaliação de risco, todo procedimento alternativo, toda contingência
                usa condicionais. "If the pressure exceeds the limit, the relief valve opens" — esta é a base de qualquer sistema automatizado. "If we follow the procedure,
                we will complete the task safely" — este é o princípio de toda instrução operacional. As condicionais progridem de três tipos: Type 0 (lei universal),
                Type 1 (possibilidade real no futuro), Type 2 (hipótese improvável ou contrária aos fatos). Cada tipo tem estrutura precisa e uso contextual específico.
              </p>

              <p>
                TYPE 0 (Zero Conditional) descreve uma lei universal, algo sempre verdadeiro, sem exceção. "If you heat water to 100°C, it boils" — esta é uma lei física
                que sempre se cumpre. "If the pressure exceeds the limit, the relief valve opens" — funcionamento do equipamento, sempre assim. A estrutura é: If + Simple
                Present, Simple Present (NUNCA will, NUNCA outro tempo). Esta é uma crítica diferença — Type 0 NUNCA usa "will" porque não é futuro, é uma verdade permanente.
                "If + Simple Present, Simple Present" é a forma rigid de Type 0. Por que? Porque ambas as partes da frase descrevem verdades atuais ou universais, não eventos
                futuros. Uma lei física não é "futura", ela existe AGORA e sempre.
              </p>

              <p>
                TYPE 1 (First Conditional) descreve uma possibilidade real no futuro — algo plausível que PODE acontecer. "If we follow the procedure, we will complete the
                task safely" — é possível que isso aconteça. "If the weather is clear, the helicopter will arrive tomorrow" — é realista que isso ocorra. A estrutura é:
                If + Simple Present, will + verb. Por que Simple Present na condicional apesar de falar de futuro? Porque em inglês, a cláusula "if" obrigatoriamente usa
                Simple Present (lei da língua), enquanto a cláusula de resultado usa "will" (futuro real). Este é o padrão Type 1. Possibilidades reais, eventos que podem
                realmente acontecer.
              </p>

              <p>
                TYPE 2 (Second Conditional) descreve uma hipótese improvável OU uma situação contrária aos fatos. "If I were you, I would report the incident immediately"
                — Eu NÃO sou você, mas estou imaginar se FOSSE. "If the pipeline had a leak, it would lose pressure" — não tem leak agora, mas estou explorando o cenário
                hipotético. A estrutura é: If + Simple Past (ou "were" para todos), would + verb. Importante: na condicional, o verbo "be" vira "were" para TODOS os sujeitos
                (I were, you were, he were). "If I were president..." não "If I was president...". Em Type 2, a ação da cláusula "if" é contrária aos fatos (não é lei,
                não é realista, é hipotética).
              </p>

              <p>
                TYPE 3 (Third Conditional) descreve algo que PODERIA TER ACONTECIDO mas não aconteceu — reflexão sobre o passado. "If we had known earlier, we would have
                prevented it" — não sabíamos naquela época, agora sabemos. Estrutura: If + Past Perfect (had + Past Participle), would have + Past Participle.
              </p>

              <p>
                UNLESS = if not. "Unless the procedure changes, we will fail" = "If the procedure does NOT change, we will fail". Unless inverte a lógica — descreve a
                condição negativa para que algo aconteça. Importante: nunca use "unless" com negação dupla ("Unless the procedure doesn't change" é errado — use "If the
                procedure doesn't change" ou "Unless the procedure changes").
              </p>

              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Os Três Tipos de Condicionais</h4>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="border-l-4 border-blue-600 pl-4">
                    <div className="font-semibold">Type 0: Lei Universal</div>
                    <div className="text-xs italic">If + Simple Present, Simple Present</div>
                    <div className="text-foreground/80">"If you heat water to 100°C, it boils." (SEMPRE verdadeiro)</div>
                  </div>
                  <div className="border-l-4 border-cyan-600 pl-4">
                    <div className="font-semibold">Type 1: Possibilidade Real</div>
                    <div className="text-xs italic">If + Simple Present, will + verb</div>
                    <div className="text-foreground/80">"If we follow the procedure, we will succeed." (PODE acontecer)</div>
                  </div>
                  <div className="border-l-4 border-purple-600 pl-4">
                    <div className="font-semibold">Type 2: Hipótese Improvável</div>
                    <div className="text-xs italic">If + Simple Past, would + verb (be → were)</div>
                    <div className="text-foreground/80">"If I were you, I would report it." (CONTRÁRIO aos fatos)</div>
                  </div>
                  <div className="border-l-4 border-pink-600 pl-4">
                    <div className="font-semibold">Type 3: Reflexão Passada</div>
                    <div className="text-xs italic">If + Past Perfect, would have + Past Participle</div>
                    <div className="text-foreground/80">"If we had known, we would have prevented it." (PODERIA TER SIDO)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline replaced */}

            <ComparisonSide
              lado1={{
                label: "TYPE 1: Possível Realmente",
                content: `If we increase the pressure,
the flow will increase.
(Possível, natural, esperado)

If it rains tomorrow,
the project will be delayed.
(Cenário realista)`
              }}
              lado2={{
                label: "TYPE 2: Hipotético/Improvável",
                content: `If we were to increase the pressure dramatically,
the system would fail.
(Contrário ao normal, hipotético)

If the manager were here now,
he would authorize the overtime.
(Ele não está aqui, mas estou imaginando)`
              }}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "① Conceituação: Type 0, 1, 2 — Estrutura Precisa",
                  icone: <LuBookOpen className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-base leading-relaxed">
                        TYPE 0 = Lei Física/Lógica. Estrutura: If + Simple Present, Simple Present. NUNCA "will". Exemplo: "If you increase the temperature, the pressure increases."
                        Isto não é futuro, é uma relação causal permanente. Toda vez que você aumenta temperatura, pressão sobe. Agora, amanhã, sempre. Por isso não usa will.
                      </p>

                      <p className="text-base leading-relaxed">
                        TYPE 1 = Possibilidade Real. Estrutura: If + Simple Present, will + verb. Por que Simple Present na condicional? Porque é regra do inglês — a cláusula "if"
                        sempre usa Simple Present (mesmo falando de futuro). A cláusula de resultado usa "will" para indicar futuro. "If you press the button, the alarm will sound."
                        Resultado futuro, condição em Simple Present (regra de ouro do inglês).
                      </p>

                      <p className="text-base leading-relaxed">
                        TYPE 2 = Hipótese Improvável/Contrária aos Fatos. Estrutura: If + Simple Past, would + verb. Importante: "be" vira "were" para TODOS. "If I were you" (não
                        "If I was you"), "If he were here" (não "If he was here"). Em Type 2, você está brincando com um cenário contrário à realidade. "If I were the president..."
                        (não sou). "If she were taller..." (não é). Então a conjugação muda.
                      </p>

                      <div className="bg-indigo-50 dark:bg-indigo-950/20 rounded-lg p-4 space-y-3">
                        <h5 className="font-semibold text-sm">Inversion Pattern (Menos Comum mas Importante):</h5>
                        <p className="text-sm text-foreground/80">
                          Você pode inverter a ordem formal de uma condicional omitindo "if" e invertendo sujeito-auxiliar. "Had I known earlier, I would have prevented it" = "If I had known earlier, I would have prevented it."
                          Muito formal, raro em conversação, comum em escrita técnica premium.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "② Exemplificação: Condicionais em Contexto Técnico",
                  icone: <LuPlay className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="border-l-4 border-blue-600 pl-4">
                          <p className="font-semibold">1. Type 0: Funcionamento de Equipamento</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "If the pressure exceeds 500 bar, the relief valve opens."
                            <span className="block mt-1 text-xs italic">Análise: Lei física do equipamento. Sempre acontece assim, sem exceção. Type 0.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-cyan-600 pl-4">
                          <p className="font-semibold">2. Type 1: Procedimento Operacional</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "If we follow the safety procedure, we will complete the task without incident."
                            <span className="block mt-1 text-xs italic">Análise: Possível realmente. Se fizer assim, resultado será seguro. Scenario tipo 1.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-purple-600 pl-4">
                          <p className="font-semibold">3. Type 1: Contingência Realista</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "If the weather deteriorates, the helicopter will return to the base."
                            <span className="block mt-1 text-xs italic">Análise: Cenário plausível. Tempo ruim é realista em offshore. Type 1.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-pink-600 pl-4">
                          <p className="font-semibold">4. Type 2: Análise Hipotética</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "If we were to operate the system without safeguards, it would fail catastrophically."
                            <span className="block mt-1 text-xs italic">Análise: Não estamos operando sem safeguards. Isto é hipotético, contrário aos fatos. Type 2.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-orange-600 pl-4">
                          <p className="font-semibold">5. Type 2: Simulação de Cenário</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "If the team were to increase the flow rate by 50%, the system would exceed operational limits."
                            <span className="block mt-1 text-xs italic">Análise: Estamos explorando um cenário hipotético. Não está acontecendo, é especulação. Type 2.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-red-600 pl-4">
                          <p className="font-semibold">6. Type 3: Retrospectiva de Incidente</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "If the team had followed the protocol, the accident would have been prevented."
                            <span className="block mt-1 text-xs italic">Análise: Reflexão sobre o passado. Não seguiram o protocolo. Se tivessem seguido, não teria acontecido. Type 3.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-indigo-600 pl-4">
                          <p className="font-semibold">7. UNLESS = IF NOT (Lei de Risco)</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "Unless the inspection is completed, production cannot restart."
                            <span className="block mt-1 text-xs italic">Análise: UNLESS = se NÃO. Inversão da lógica. Produção depende da inspeção. Se não inspet, não reinicia.</span>
                          </p>
                        </div>

                        <div className="border-l-4 border-green-600 pl-4">
                          <p className="font-semibold">8. Inversion Pattern (Formal)</p>
                          <p className="text-sm text-foreground/80 mt-2">
                            "Had we monitored the system continuously, the leak would have been detected earlier."
                            <span className="block mt-1 text-xs italic">Análise: = "If we had monitored..." Inversion omite "if" e inverte sujeito-auxiliar. Muito formal.</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "③ Estratégia: Escolher Type Correto",
                  icone: <LuLightbulb className="w-5 h-5" />,
                  conteudo: (
                    <CardCarousel
                      cards={[
                        {
                          titulo: "Pergunta: É uma Lei/Funcionamento?",
                          descricao: "Se descreve uma verdade permanente, lei física, propriedade imutável, use Type 0. 'If water reaches 100°C, it boils' = lei universal.",
                          exemplo: "✓ Type 0: If you apply heat, ice melts. (Lei física, sempre verdadeiro)",
                        },
                        {
                          titulo: "Pergunta: É Possível Realmente?",
                          descricao: "Se o evento é plausível, realista, pode acontecer, use Type 1. 'If we get good weather, we will proceed' = realista.",
                          exemplo: "✓ Type 1: If the pressure rises, the alarm will sound. (Cenário realista)",
                        },
                        {
                          titulo: "Pergunta: É Hipotético/Improvável?",
                          descricao: "Se é contrário aos fatos, imaginário, improvável, use Type 2. 'If I were taller...' = não sou, mas imaginando.",
                          exemplo: "✓ Type 2: If the system were to fail, production would stop. (Hipotético, contrário aos fatos)",
                        },
                        {
                          titulo: "Pergunta: É Reflexão Passada?",
                          descricao: "Se está analisando o que PODERIA TER SIDO mas não foi, use Type 3. 'If I had studied harder, I would have passed'.",
                          exemplo: "✓ Type 3: If we had known, we would have prevented it. (Passado, retrospectiva)",
                        },
                        {
                          titulo: "Pergunta: É Condição Negativa?",
                          descricao: "Se está descrevendo uma condição negativa para algo acontecer, use UNLESS (= if not). 'Unless you follow the procedure, you will fail.'",
                          exemplo: "✓ Unless: Unless you study, you won't pass. (= If you don't study...)",
                        },
                      ]}
                    />
                  ),
                },
                {
                  titulo: "④ Avisos: Pegadinhas com Condicionais",
                  icone: <LuTriangleAlert className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox
                        tipo="danger"
                        titulo="Pegadinha #1: Type 0 NUNCA Usa 'will'"
                      >
                        <Comparison title="Exemplos" left={{ title: "ERRADO", content: "If you heat water, it will boil. If you press the button, the alarm will sound.", description: "", variant: "danger" }} right={{ title: "CORRETO (Type 0)", content: "If you heat water, it boils. If you press the button, the alarm sounds.", description: "", variant: "success" }} />
                      </AlertBox>

                      <AlertBox
                        tipo="danger"
                        titulo="Pegadinha #2: Type 2 'be' Vira 'were' para TODOS"
                      >
                        <Comparison title="Exemplos" left={{ title: "ERRADO", content: "If I was you. If he was president. If she was taller.", description: "", variant: "danger" }} right={{ title: "CORRETO", content: "If I were you. If he were president. If she were taller.", description: "", variant: "success" }} />
                      </AlertBox>

                      <AlertBox
                        tipo="danger"
                        titulo="Pegadinha #3: Type 1 SEMPRE Simple Present na Condicional"
                      >
                        <Comparison title="Exemplos" left={{ title: "ERRADO", content: "If we will follow the procedure, we will succeed. If you will complete the task, you will be promoted.", description: "", variant: "danger" }} right={{ title: "CORRETO", content: "If we follow the procedure, we will succeed. If you complete the task, you will be promoted.", description: "", variant: "success" }} />
                      </AlertBox>

                      <AlertBox
                        tipo="warning"
                        titulo="Pegadinha #4: UNLESS Nunca Recebe Negação (Dupla Negação)"
                      >
                        <Comparison title="Exemplos" left={{ title: "ERRADO", content: "Unless you don't complete the work, you will be fired. Unless he doesn't come, we will start.", description: "", variant: "danger" }} right={{ title: "CORRETO", content: "Unless you complete the work, you will be fired. Unless he comes, we will start.", description: "", variant: "success" }} />
                      </AlertBox>

                      <AlertBox
                        tipo="info"
                        titulo="Inversion Pattern: Formal mas não Obrigatório"
                      >
                        <Comparison title="Exemplos" left={{ title: "INVERSO (Formal)", content: "Had we known, we would have prevented it. Should you need assistance, contact us.", description: "", variant: "danger" }} right={{ title: "NORMAL", content: "If we had known, we would have prevented it. If you need assistance, contact us.", description: "", variant: "success" }} />
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Qual é Type 0?</p>
                    <p className="text-base">"If you freeze water, it becomes ice."</p>
                    <p className="text-xs text-foreground/60">Por que não Type 1?</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ TYPE 0: Lei Física</p>
                    <p>Não é futuro, é permanente. Sempre que você congela água, ela vira gelo. AGORA, AMANHÃ, SEMPRE. Por isso usa Simple Present em ambas as partes.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Type 1 ou Type 2?</p>
                    <p className="text-base">"If we increase the budget, we will hire more staff."</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ TYPE 1: Possibilidade Real</p>
                    <p>É plausível aumentar o orçamento. Resultado real se isso acontecer. Se não acontecer, não contratamos. TYPE 1: cenário realista.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Qual verbo está certo?</p>
                    <p className="text-base">"If I ___ the manager, I would authorize the project."</p>
                    <p className="text-xs text-foreground/60">(A) am (B) was (C) were</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ WERE</p>
                    <p>Type 2: "If I were the manager..." (não sou). Contrário aos fatos. Em Type 2, "be" sempre vira "were" para TODOS os sujeitos.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Encontre o erro:</p>
                    <p className="text-base">"If we will complete the project, we will be promoted."</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-red-600">❌ ERRO: "will complete"</p>
                    <p>Type 1 NUNCA usa "will" na cláusula "if". Use Simple Present: "If we complete the project, we will be promoted."</p>
                  </div>
                }
              />
            </div>
          </section>

          

<ModuleConsolidation
            index={2}
            variant={mv[7]}
            maceteVisual={{
              title: "Conditionals — Os 3 Tipos e Probabilidade",
              content: (
                <div className="space-y-2 text-sm">
                  <p><strong>TYPE 0</strong>: If + Present, Present → lei universal: "If you heat oil, it expands."</p>
                  <p><strong>TYPE 1</strong>: If + Present, will + base → possível: "If the valve fails, we will shut down."</p>
                  <p><strong>TYPE 2</strong>: If + Past, would + base → hipotético: "If we had more budget, we would expand."</p>
                  <p><strong>UNLESS</strong> = If not: "Unless you calibrate it, it won't work."</p>
                  <p className="text-xs text-muted-foreground">Risk assessments Petrobras usam Type 1 para riscos reais e Type 2 para cenários hipotéticos.</p>
                </div>
              )
            }}
            onComplete={() => handleModuleComplete("modulo-7")}
          />

                    <QuizInterativo
            questoes={quizM7}
            titulo="Conditionals"
            numero={7}
            onComplete={() => handleModuleComplete("modulo-7")}
          />
        </div>
      </TabsContent>

      {/* MODULE 8 — TENSE REVIEW & ERROR CORRECTION */}
      <TabsContent value="modulo-8">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={8}
            titulo="Tense Review & Error Correction"
            variant={mv[8]}
            descricao="Identifique erros de tempos verbais e domine a estratégia CESGRANRIO dos 5 passos"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Estratégia CESGRANRIO: Identificar Erros de Tempos Verbais"
              description="CESGRANRIO testa compreensão de tempos verbais através de identificação de erros e escolha de correção"
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                A estratégia principal de CESGRANRIO em testes de Verb Tenses é apresentar uma frase com uma palavra sublinhada
                (indicando que há um erro) e pedir para escolher a correção entre várias opções. A chave para resolver rapidamente é
                identificar PRIMEIRO o marcador temporal — palavras como "yesterday" (passado), "now" (presente), "since 2020" (presente
                até agora), "usually" (presente habitual), "tomorrow" (futuro), "already" (antes de agora) são ÂNCORAS que revelam qual
                tempo verbal você deve usar. Uma vez que você identifica o marcador, o tempo correto geralmente se torna óbvio.
              </p>

              <p>
                Exemplo de questão típica: "The engineer are checking the system right now." Qual é o erro? Primeiro, procure pelo
                marcador temporal: "right now" = presente, ação em andamento. Isto pede Present Continuous (am/is/are + -ing). Segundo,
                identifique o sujeito: "The engineer" = singular (he/she/it). Para Present Continuous com singular: "is + -ing". Portanto,
                "are checking" está errado — deve ser "is checking". Este processo (marcador → tempo → estrutura) resolve 80% das questões
                de CESGRANRIO sobre tenses.
              </p>

              <p>
                Os pares de tempos que CESGRANRIO mais testa para erro são: (1) Present Perfect vs Simple Past — confundem-se porque ambos
                falam de ações passadas, mas um tem tempo definido e outro não, (2) Will vs Going to — parecem sinônimos em português, mas
                em inglês um é decisão espontânea e outro é plano prévio, (3) Simple Present vs Present Continuous — ambos no presente, mas
                um é habitual e outro é em progresso. Entender estas distinções é 50% da batalha.
              </p>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-lg border border-amber-200 dark:border-amber-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Tabela: Marcadores Temporais → Tempos Verbais</h4>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="font-semibold text-amber-700 dark:text-amber-300">Marcador</div>
                    <div className="font-semibold text-amber-700 dark:text-amber-300">Tempo Verbal</div>
                    <div className="font-semibold text-amber-700 dark:text-amber-300">Exemplo</div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 border-t border-amber-300 pt-2">
                    <div>usually, always, every day</div>
                    <div>Simple Present</div>
                    <div>"She usually works"</div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>right now, at this moment</div>
                    <div>Present Continuous</div>
                    <div>"They are working now"</div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>just, already, ever, yet</div>
                    <div>Present Perfect</div>
                    <div>"I have just finished"</div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>yesterday, last week, in 2020</div>
                    <div>Simple Past</div>
                    <div>"We worked last year"</div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>while, when (narrative)</div>
                    <div>Past Continuous</div>
                    <div>"She was working when..."</div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>since 2020, for 5 years</div>
                    <div>Present Perfect / Perfect Continuous</div>
                    <div>"We have worked since..."</div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>tomorrow, next week, will</div>
                    <div>Future Simple / Going to</div>
                    <div>"We will/are going to work"</div>
                  </div>
                </div>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "① Os 5 Passos da Estratégia CESGRANRIO",
                  icone: <LuTarget className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-base leading-relaxed">
                        Desenvolver uma estratégia sistemática é a diferença entre acertar 50% e 95% das questões de tenses em CESGRANRIO.
                        Os 5 passos abaixo são testados repetidamente em provas reais e funcionam para QUALQUER tipo de questão sobre verb tenses.
                        Quando você vê uma questão com um verbo sublinhado ou um espaço em branco para completar, siga esta sequência mental
                        sem exceção.
                      </p>

                      <TimelineItem
              passo={1}
              titulo="Identifique o Marcador Temporal"
              descricao="Procure por QUANDO a ação ocorre. Palavras-chave: yesterday (passado específico), usually (presente habitual), right now (presente instantâneo), since 2020 (até agora), tomorrow (futuro), already (antes de agora). Se não houver marcador explícito, procure pelo contexto (um relatório, um manual técnico, uma conversa casual)."
                      />

                      <TimelineItem
              passo={2}
              titulo="Procure por 'State Verbs'"
              descricao="Se o verbo é know, understand, want, like, believe, have (posse), own, possess, prefer, seem, appear, então NUNCA use -ing, mesmo que pareça correto em português. 'I am knowing' é ABSOLUTAMENTE PROIBIDO. State verbs descrevem estados mentais ou posses, não ações."
                      />

                      <TimelineItem
              passo={3}
              titulo="Procure pelo Sujeito — Número & Pessoa"
              descricao="He/She/It SEMPRE adiciona -s em Simple Present (works, not work). Plural (they, we, you) não adiciona. Este é o erro mais comum em CESGRANRIO porque falantes intermediários frequentemente esquecem. 'The system detect problems' está ERRADO — deve ser 'detects'."
                      />

                      <TimelineItem
              passo={4}
              titulo="Procure por Pistas de Voz Ativa vs Passiva"
              descricao="Se a frase começa com O OBJETO (The equipment, The platform, The alarm) e não com o AGENTE, é muito provável que seja voz passiva. Passiva = BE + Past Participle. 'The system is monitored by engineers' = passiva. Ativa = 'Engineers monitor the system'."
                      />

                      <TimelineItem
              passo={5}
              titulo="Teste Cada Opção — Qual Soa Mais Natural?"
              descricao="Um falante nativo nunca diria 'I am being tired' (estar cansado é estado, não ação). Leia mentalmente cada opção e descartar aquelas que SOAM erradas — mesmo que você não saiba a regra gramatical, seu instinto de aprendiz avançado o guiará corretamente 70% das vezes."
                      />
                    </div>
                  ),
                },
                {
                  titulo: "② Resumo dos 7 Tempos (Referência Rápida)",
                  icone: <LuCircleCheck className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="border-l-4 border-blue-500 pl-4">
                          <p className="font-semibold text-sm text-blue-700 dark:text-blue-300">Simple Present (S + V)</p>
                          <p className="text-sm mt-1">
                            Rotinas, fatos permanentes, verdades universais. "The pump operates 24/7." "Oil floats on water."
                          </p>
                        </div>

                        <div className="border-l-4 border-cyan-500 pl-4">
                          <p className="font-semibold text-sm text-cyan-700 dark:text-cyan-300">Present Continuous (am/is/are + -ing)</p>
                          <p className="text-sm mt-1">
                            Ações em andamento AGORA. "The pressure is rising right now." Palavra-chave: "right now", "at this moment".
                          </p>
                        </div>

                        <div className="border-l-4 border-emerald-500 pl-4">
                          <p className="font-semibold text-sm text-emerald-700 dark:text-emerald-300">Simple Past (V + -ed)</p>
                          <p className="text-sm mt-1">
                            Ação concluída em tempo definido. "We completed the inspection yesterday." Palavra-chave: "yesterday", "last week", "in 2020".
                          </p>
                        </div>

                        <div className="border-l-4 border-purple-500 pl-4">
                          <p className="font-semibold text-sm text-purple-700 dark:text-purple-300">Past Continuous (was/were + -ing)</p>
                          <p className="text-sm mt-1">
                            Ação em andamento em momento passado, frequentemente interrompida. "We were checking when the alarm sounded."
                          </p>
                        </div>

                        <div className="border-l-4 border-pink-500 pl-4">
                          <p className="font-semibold text-sm text-pink-700 dark:text-pink-300">Present Perfect (have/has + Past Participle)</p>
                          <p className="text-sm mt-1">
                            Ação passada com relevância atual, sem data definida. "We have completed three projects this year." Palavra-chave: "just", "already", "for 5 years", "since 2020".
                          </p>
                        </div>

                        <div className="border-l-4 border-orange-500 pl-4">
                          <p className="font-semibold text-sm text-orange-700 dark:text-orange-300">Future Simple (will + infinitive)</p>
                          <p className="text-sm mt-1">
                            Ação futura, decisão espontânea ou previsão. "The system will shut down tomorrow." "I will help you with this."
                          </p>
                        </div>

                        <div className="border-l-4 border-red-500 pl-4">
                          <p className="font-semibold text-sm text-red-700 dark:text-red-300">Conditional Type 1 (if + Simple Present, will + infinitive)</p>
                          <p className="text-sm mt-1">
                            Situação realista no futuro. "If the pressure exceeds 20 bar, the alarm will sound." Muito realista/provável.
                          </p>
                        </div>
                      </div>

                      <AlertBox tipo="info" titulo="Dica de Memorização"><p></p></AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "③ Exemplos de Correção em Contexto",
                  icone: <LuPlay className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                          <p className="font-semibold text-red-700 dark:text-red-300 text-sm mb-2">Erro #1: "The engineers are knowing the safety procedures."</p>
                          <p className="text-sm">
                            <strong>Problema:</strong> "Know" é state verb. Nunca -ing.
                          </p>
                          <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                            <strong>Correção:</strong> "The engineers know the safety procedures."
                          </p>
                          <p className="text-xs text-foreground/70 mt-2 italic">
                            Passo 2 aplicado: reconheceu state verb → removeu -ing.
                          </p>
                        </div>

                        <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                          <p className="font-semibold text-red-700 dark:text-red-300 text-sm mb-2">Erro #2: "I have finished the report yesterday."</p>
                          <p className="text-sm">
                            <strong>Problema:</strong> "Yesterday" = tempo definido, pede Simple Past, não Present Perfect.
                          </p>
                          <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                            <strong>Correção:</strong> "I finished the report yesterday."
                          </p>
                          <p className="text-xs text-foreground/70 mt-2 italic">
                            Passo 1 aplicado: "yesterday" = Simple Past (não have + Past Participle).
                          </p>
                        </div>

                        <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                          <p className="font-semibold text-red-700 dark:text-red-300 text-sm mb-2">Erro #3: "While we check the equipment, the power went out."</p>
                          <p className="text-sm">
                            <strong>Problema:</strong> "While" = ação em andamento (Past Continuous) interrompida por Simple Past.
                          </p>
                          <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                            <strong>Correção:</strong> "While we were checking the equipment, the power went out."
                          </p>
                          <p className="text-xs text-foreground/70 mt-2 italic">
                            Passo 1 aplicado: "while" + ação em andamento = Past Continuous (were checking) + interrupção Simple Past (went).
                          </p>
                        </div>

                        <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                          <p className="font-semibold text-red-700 dark:text-red-300 text-sm mb-2">Erro #4: "The technician are testing the system right now."</p>
                          <p className="text-sm">
                            <strong>Problema:</strong> "Technician" = singular (he/she/it), pede "is", não "are".
                          </p>
                          <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                            <strong>Correção:</strong> "The technician is testing the system right now."
                          </p>
                          <p className="text-xs text-foreground/70 mt-2 italic">
                            Passo 3 aplicado: reconheceu singular → "is" (não "are").
                          </p>
                        </div>

                        <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                          <p className="font-semibold text-red-700 dark:text-red-300 text-sm mb-2">Erro #5: "By tomorrow, we complete the project."</p>
                          <p className="text-sm">
                            <strong>Problema:</strong> "By tomorrow" = Future Perfect (ação terminada ATÉ futuro), não Simple Present.
                          </p>
                          <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                            <strong>Correção:</strong> "By tomorrow, we will have completed the project."
                          </p>
                          <p className="text-xs text-foreground/70 mt-2 italic">
                            Passo 1 aplicado: "by tomorrow" = futuro com tempo definido = Future Perfect (will have completed).
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "④ Técnicas de Reconhecimento de Armadilhas",
                  icone: <LuTriangleAlert className="w-5 h-5" />,
                  conteudo: (
                    <CardCarousel
                      cards={[
                        {
                          titulo: "Armadilha: 'Find the Time Marker First'",
                          descricao: "90% das questões têm um marcador temporal óbvio (yesterday, now, since, usually). Se você não vir um, o contexto gera um implícito. SEMPRE procure primeiro — isto elimina 70% da confusão.",
                          exemplo: "❌ 'I work here' (qual tempo?). ✅ 'I work here USUALLY' = Simple Present.",
                        },
                        {
                          titulo: "Armadilha: 'State Verbs Never -ing'",
                          descricao: "Memorize: know, understand, want, like, believe, have (posse), own, possess, prefer, seem, appear. Se você vir qualquer um destes com -ing, é ERROR. Sempre. Sem exceção.",
                          exemplo: "❌ 'I am liking this' → ✅ 'I like this' (estado mental permanente).",
                        },
                        {
                          titulo: "Armadilha: 'Singular = +S'",
                          descricao: "He/She/It SEMPRE adiciona -s em Simple Present: he works, she monitors, it requires. Verbo auxiliar questions também: 'Does she complete?' (não 'Do she'). Este é O ERRO mais testado.",
                          exemplo: "❌ 'The valve prevent backflow' → ✅ 'The valve prevents backflow'.",
                        },
                        {
                          titulo: "Armadilha: 'Check for Passive Indicators'",
                          descricao: "Se vir BE + Past Participle + BY, é passiva. Se vir sujeito no inicio = passiva. Passiva = BE + Past Participle. Não confunda 'is being tested' (continuous passive) com 'was tested' (simple passive).",
                          exemplo: "✓ 'The system is monitored' vs ❌ 'The system monitored' (falta 'is').",
                        },
                        {
                          titulo: "Armadilha: 'Present Perfect com SINCE vs FOR'",
                          descricao: "SINCE = ponto de início (2020, last year). FOR = duração (5 years, 2 hours). 'I worked since 2020' ERRADO. 'I have worked since 2020' CORRETO. 'I work for 5 years' ERRADO. 'I have worked for 5 years' CORRETO.",
                          exemplo: "✓ 'We have worked SINCE 2020' e 'FOR 5 years' (não 'in 5 years').",
                        },
                        {
                          titulo: "Armadilha: 'Conditional Type 1 vs Type 2'",
                          descricao: "Type 1 (realista): IF + Simple Present, WILL + inf. Type 2 (improvável): IF + Simple Past, WOULD + inf. 'If you study, you will pass' (realista). 'If you studied, you would pass' (mas você não estuda).",
                          exemplo: "Type 1: 'If it rains, the event will be cancelled.' Type 2: 'If it rained, we would postpone.'",
                        },
                      ]}
                    />
                  ),
                },
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Qual opção está CORRETA?</p>
                    <p className="text-base">"She ___ English since 2015."</p>
                    <p className="text-xs text-foreground/60">(A) works (B) has worked (C) is working (D) worked</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ HAS WORKED (B)</p>
                    <p>
                      "Since 2015" = ponto de início no passado com relevância até agora. Present Perfect (has worked) = ação que começou
                      antes e continua agora.
                    </p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Identifique o ERRO:</p>
                    <p className="text-base">"While we are monitoring the system, the alarm sounded."</p>
                    <p className="text-xs text-foreground/60">Qual tempo está ERRADO?</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ MUDANÇA DE TEMPO</p>
                    <p>
                      "Are monitoring" (Present Continuous) está em CONTEXTO PASSADO (sounded = Simple Past). Deve ser "were monitoring"
                      (Past Continuous) para manter coherência temporal.
                    </p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Qual está CORRETO?</p>
                    <p className="text-base">"By the time you arrive, I ___ the report."</p>
                    <p className="text-xs text-foreground/60">(A) finish (B) will finish (C) will have finished</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ WILL HAVE FINISHED (C)</p>
                    <p>
                      "By the time" (até aquele momento) pede Future Perfect: ação que TERMINARÁ antes de outro evento futuro (você
                      chegar).
                    </p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">State Verb ou Action?</p>
                    <p className="text-base">"I ___ how to fix this." (KNOW)</p>
                    <p className="text-xs text-foreground/60">Pode ser -ing?</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-red-600">❌ NÃO -ing</p>
                    <p>
                      "Know" = state verb (conhecimento que você POSSUI). ✅ "I know how to fix this." NOT: "I am knowing how to fix
                      this."
                    </p>
                  </div>
                }
              />
            </div>
          </section>

          

<ModuleConsolidation
            index={2}
            variant={mv[8]}
            maceteVisual={{
              title: "Tense Review — Âncoras de Tempo",
              content: (
                <div className="space-y-2 text-sm">
                  <p><strong>YESTERDAY / AGO / LAST</strong> → Simple Past</p>
                  <p><strong>ALREADY / JUST / YET / SINCE / FOR (sem data)</strong> → Present Perfect</p>
                  <p><strong>TOMORROW / NEXT / SOON</strong> → Future (will / going to)</p>
                  <p><strong>NOW / AT THE MOMENT / CURRENTLY</strong> → Present Continuous</p>
                  <p className="text-xs text-muted-foreground">CESGRANRIO: identifique o marcador temporal PRIMEIRO — ele revela o tempo correto em 80% das questões.</p>
                </div>
              )
            }}
            onComplete={() => handleModuleComplete("modulo-8")}
          />

                    <QuizInterativo
            questoes={quizM8}
            titulo="Tense Review"
            numero={8}
            onComplete={() => handleModuleComplete("modulo-8")}
          />
        </div>
      </TabsContent>

      {/* MODULE 9 — ENGLISH IN PETROBRAS OPERATIONS */}
      <TabsContent value="modulo-9">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={9}
            titulo="English in Petrobras Operations"
            variant={mv[9]}
            descricao="Tempos verbais em contextos reais: manuais, relatórios, comunicações Petrobras"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Documentos Técnicos Petrobras: Um Tempo para Cada Propósito"
              description="Cada tipo de documento corporativo Petrobras tem um 'registro verbal preferido'"
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Quando você trabalha em Petrobras — seja redigindo procedimentos, respondendo e-mails, ou lendo manuais operacionais —
                você rapidamente perceberá que cada tipo de documento tem uma ASSINATURA VERBAL específica. Um manual operacional NUNCA é
                escrito em Past Tense porque descreve procedimentos permanentes, não eventos históricos. Um relatório de incidente NUNCA
                usa Present Continuous porque o evento já terminou — é tudo passado. Um progress report SEMPRE usa Present Perfect para
                "o que já foi feito" porque o resultado é relevante AGORA. Uma avaliação de risco usa Conditional Type 2 ("Se X ocorresse,
                Y resultaria") porque descreve cenários hipotéticos. Compreender esta estrutura é a chave para parecer competente em
                comunicações Petrobras.
              </p>

              <p>
                A razão é pragmática e lógica: se você está escrevendo um operational manual (ex: "How to Change a Drill Bit"), você não
                está contando uma história passada — você está descrevendo um PROCEDIMENTO que é repetido infinitas vezes. Portanto: Simple
                Present. "The operator closes the safety valve. He removes the damaged bit. He inserts the new bit." Cada ação é descrita
                em Simple Present porque descrevem procedimentos permanentes, não eventos únicos. Contraste com um relatório de INCIDENTE:
                "Yesterday at 3 PM, a pressure spike occurred. The team was conducting maintenance when the alarm sounded. We implemented
                emergency procedures." Tudo é passado porque o incidente JÁ ACONTECEU e você está relatando o que ocorreu (Simple Past +
                Past Continuous).
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">4 Géneros Textuais Petrobras x Tempos Verbais</h4>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-600 pl-4">
                    <p className="font-semibold text-blue-700 dark:text-blue-300">1. Operational Manual (Procedimentos)</p>
                    <p className="text-sm text-foreground/80 mt-1">
                      <strong>Tempo Principal:</strong> Simple Present. <strong>Razão:</strong> Descreve procedimentos permanentes que são repetidos
                      infinitas vezes. "The pump operates continuously. The pressure valve prevents overpressure."
                    </p>
                  </div>

                  <div className="border-l-4 border-amber-600 pl-4">
                    <p className="font-semibold text-amber-700 dark:text-amber-300">2. Incident Report (O que Aconteceu)</p>
                    <p className="text-sm text-foreground/80 mt-1">
                      <strong>Tempo Principal:</strong> Simple Past + Past Continuous. <strong>Razão:</strong> Relata eventos que já ocorreram.
                      "The alarm sounded at 14:32. The team was conducting maintenance when the incident occurred. We implemented corrective actions."
                    </p>
                  </div>

                  <div className="border-l-4 border-green-600 pl-4">
                    <p className="font-semibold text-green-700 dark:text-green-300">3. Progress Report (Status Atual)</p>
                    <p className="text-sm text-foreground/80 mt-1">
                      <strong>Tempo Principal:</strong> Present Perfect + Simple Past. <strong>Razão:</strong> Descreve o que foi completo (resultado
                      até agora) e o que iniciou. "We have completed Phase 1. Phase 2 began last week. Deliverables are expected by Q4."
                    </p>
                  </div>

                  <div className="border-l-4 border-red-600 pl-4">
                    <p className="font-semibold text-red-700 dark:text-red-300">4. Risk Assessment (Cenários Hipotéticos)</p>
                    <p className="text-sm text-foreground/80 mt-1">
                      <strong>Tempo Principal:</strong> Conditional Type 2 + Type 3. <strong>Razão:</strong> Descreve cenários irreais/improvável.
                      "If the pipeline were to rupture, it would require full emergency protocols. Had this been detected earlier, we would have prevented the incident."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "① Operational Manual: Procedimentos em Simple Present",
                  icone: <LuBookOpen className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-base leading-relaxed">
                        Um operational manual Petrobras descreve procedimentos que são executados repetidamente, frequentemente por diferentes
                        operadores em diferentes datas. Portanto, NUNCA há datas específicas e NUNCA há pessoa específica — é tudo genérico e
                        atemporal. "The operator closes the isolation valve. He opens the pressure relief valve. He monitors the gauge." Cada
                        frase é Simple Present porque descreve UMA AÇÃO QUE SEMPRE OCORRE, não uma ação que ocorreu uma vez.
                      </p>

                      <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                        <p className="font-semibold text-sm mb-3">Exemplo: Drilling Procedure — Change Drill Bit (Manual Técnico Petrobras)</p>
                        <div className="space-y-2 text-sm italic text-foreground/90">
                          <p>
                            "Step 1: The driller slows the rotational speed to minimum. Step 2: The circulation is stopped at the pump house.
                            Step 3: The kelly is picked up and positioned over the BOP. Step 4: The damaged bit is disconnected from the kelly.
                            Step 5: The new bit is carefully lowered and locked into position. Step 6: Normal circulation procedures resume."
                          </p>
                        </div>
                        <p className="text-xs text-foreground/70 mt-3">
                          <strong>Análise:</strong> Cada verbo é Simple Present porque descreve procedimento. "Is stopped", "is positioned", "is
                          disconnected" são passivas, mas ainda Simple Present — porque descrevem ações permanentes, não eventos únicos.
                        </p>
                      </div>

                      <AlertBox tipo="info" titulo="Regra Prática: Manual = Sempre Simple Present (Ativo ou Passivo)"><p></p></AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "② Incident Report: Passado Completo (Simple Past + Past Continuous)",
                  icone: <LuTriangleAlert className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-base leading-relaxed">
                        Um Incident Report relata algo que JÁ ACONTECEU. É uma narrativa histórica de um evento específico no passado. Todos
                        os tempos serão passado: Simple Past para eventos sequenciais, Past Continuous para ações em andamento, Past Perfect
                        para algo que terminou ANTES de outro evento passado. "The platform evacuated at 14:32. While the team was conducting
                        maintenance, the alarm sounded. Procedures had already been initiated by the time..."
                      </p>

                      <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                        <p className="font-semibold text-sm mb-3">Exemplo: HSE Incident Report — Pressure Spike on Offshore Platform</p>
                        <div className="space-y-2 text-sm italic text-foreground/90">
                          <p>
                            "On March 15th at 14:32, a pressure anomaly was detected in Sector 3. The monitoring team was conducting routine checks
                            when the alarm triggered. The lead supervisor immediately activated emergency procedures. By 14:45, all non-essential
                            personnel had been evacuated to the muster point. The technical team had isolated the affected line before the pressure
                            exceeded critical limits. Corrective measures were implemented immediately, and the facility resumed normal operations by
                            16:00."
                          </p>
                        </div>
                        <p className="text-xs text-foreground/70 mt-3">
                          <strong>Tempos Utilizados:</strong> Simple Past (detected, triggered, activated, evacuated). Past Continuous (was
                          conducting). Past Perfect (had been, had isolated). Past Perfect Passive (had been evacuated).
                        </p>
                      </div>

                      <AlertBox tipo="danger" titulo="Erro Comum em Relatórios"><p></p></AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "③ Progress Report: Present Perfect (Resultado) + Simple Past (Eventos Passados)",
                  icone: <LuZap className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-base leading-relaxed">
                        Um Progress Report é um SNAPSHOT — mostra o que foi feito até agora (resultado presente) e o que iniciou. Usa Present
                        Perfect para descrever o que foi COMPLETADO (porque o resultado é relevante AGORA) e Simple Past para descrever EVENTOS
                        que já passaram. "We have completed Phase 1 ahead of schedule. Phase 2 began last Monday. Deliverables are expected by
                        Q4." A estrutura é: Present Perfect (resultado até agora) + Simple Past (eventos) + Simple Present (estado atual).
                      </p>

                      <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                        <p className="font-semibold text-sm mb-3">Exemplo: Quarterly Progress Report — Deepwater Platform Development</p>
                        <div className="space-y-2 text-sm italic text-foreground/90">
                          <p>
                            "We have successfully completed the structural foundation installation. The team has installed 35 of 40 primary support
                            columns. The mooring system installation began on March 1st and is progressing on schedule. We have resolved two critical
                            design issues identified in the Q1 assessment. The electrical infrastructure is currently being integrated. Deliverables
                            for Q2 are on track, with an expected completion date of June 15th. We anticipate transitioning to the operational phase
                            by Q3."
                          </p>
                        </div>
                        <p className="text-xs text-foreground/70 mt-3">
                          <strong>Tempos:</strong> Present Perfect (have completed, have installed, have resolved) para resultados. Simple Past
                          (began) para eventos históricos. Present Continuous (is progressing, is being integrated) para ações em andamento.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "④ Risk Assessment: Conditional Types 2 & 3 (Cenários Hipotéticos)",
                  icone: <LuShield className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-base leading-relaxed">
                        Um Risk Assessment descreve cenários hipotéticos e consequências. "If X were to happen, Y would result." É Conditional
                        Type 2 (improvável) ou Type 3 (arrependimento). "If a pipeline rupture were to occur in Sector 5, it would trigger
                        immediate emergency protocols. Had this vulnerability been detected in the design phase, we would have redesigned the
                        system." Note o uso de WERE TO (mais formal para hipótese técnica) em vez de IF + Simple Past.
                      </p>

                      <div className="bg-amber-50 dark:bg-amber-950/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
                        <p className="font-semibold text-sm mb-3">Exemplo: Environmental Risk Assessment — Oil Spill Scenario</p>
                        <div className="space-y-2 text-sm italic text-foreground/90">
                          <p>
                            "If an uncontrolled release of crude oil were to occur at the wellhead, the environmental impact would be severe within
                            a 50-km radius. Should weather conditions be unfavorable, the dispersal would take 7-10 days. Had the double-wall
                            containment system been installed in 2015 (as recommended), this scenario would have been prevented entirely. Should such
                            an incident occur, the response protocol would activate within 30 minutes of detection. We would implement aerial
                            dispersant spraying and deploy containment booms along the coastline."
                          </p>
                        </div>
                        <p className="text-xs text-foreground/70 mt-3">
                          <strong>Tempos:</strong> Conditional Type 2 (were to occur, would be) + Type 3 (Had been installed, would have been).
                          "Should" = Formal conditional. Resultado sempre em WOULD ou WOULD HAVE.
                        </p>
                      </div>

                      <ComparisonSide
                        lado1={{
                          label: "Type 2 (Improvável Agora)",
                          content:
                            "If the pressure relief valve were to fail, the system would shut down automatically. (Improvável, mas possível)",
                        }}
                        lado2={{
                          label: "Type 3 (Arrependimento Passado)",
                          content:
                            "Had we installed redundant safety systems, the accident would have been prevented. (Já passou, mas lamentável)",
                        }}
                      />
                    </div>
                  ),
                },
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Qual tempo em Manual Técnico?</p>
                    <p className="text-base">"The valve ___ the pressure flow."</p>
                    <p className="text-xs text-foreground/60">(A) controls (B) is controlling (C) has controlled (D) controlled</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ CONTROLS (A)</p>
                    <p>
                      Manual = procedimento permanente = Simple Present. Descreve função do equipamento que é repetida infinitas vezes, não um
                      evento único.
                    </p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Qual em Incident Report?</p>
                    <p className="text-base">"The alarm ___ while the team ___ maintenance."</p>
                    <p className="text-xs text-foreground/60">(A) sounds / conducts (B) sounded / was conducting (C) has sounded / is conducting</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ SOUNDED / WAS CONDUCTING (B)</p>
                    <p>
                      Incident = evento passado completo. Simple Past (sounded = evento) + Past Continuous (was conducting = ação em andamento
                      interrompida).
                    </p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Progress Report: Qual tempo para resultado?</p>
                    <p className="text-base">"We ___ Phase 1 on schedule."</p>
                    <p className="text-xs text-foreground/60">(A) completed (B) have completed (C) are completing (D) will complete</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ HAVE COMPLETED (B)</p>
                    <p>
                      Progress Report usa Present Perfect para "o que foi feito" (resultado relevante até agora). Não é tempo fechado (completed
                      only) porque o impacto continua.
                    </p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Risk Assessment: Qual estrutura?</p>
                    <p className="text-base">"If the system ___ to fail, operations ___ shut down."</p>
                    <p className="text-xs text-foreground/60">(A) was / would (B) were / will (C) is / would (D) will / would</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✅ WERE / WOULD (A)</p>
                    <p>
                      Risk Assessment = cenário hipotético (improvável). Conditional Type 2: IF + Simple Past (were) + WOULD + infinitive
                      (would shut down).
                    </p>
                  </div>
                }
              />
            </div>
          </section>

          

<ModuleConsolidation
            index={2}
            variant={mv[9]}
            maceteVisual={{
              title: "English in Petrobras — Tempo por Documento",
              content: (
                <div className="space-y-2 text-sm">
                  <p><strong>MANUAL OPERACIONAL</strong> → Simple Present: "The operator checks the gauge."</p>
                  <p><strong>RELATÓRIO DE INCIDENTE</strong> → Simple Past: "The pressure dropped at 09:15."</p>
                  <p><strong>RELATÓRIO DE PROGRESSO</strong> → Present Perfect: "The team has completed Phase 1."</p>
                  <p><strong>RISK ASSESSMENT</strong> → Conditionals: "If the sensor fails, the system will shut down."</p>
                  <p className="text-xs text-muted-foreground">CESGRANRIO adapta textos autênticos Petrobras — reconhecer o gênero textual = acertar o tempo.</p>
                </div>
              )
            }}
            onComplete={() => handleModuleComplete("modulo-9")}
          />

                    <QuizInterativo
            questoes={quizM9}
            titulo="English in Petrobras"
            numero={9}
            onComplete={() => handleModuleComplete("modulo-9")}
          />
        </div>
      </TabsContent>

      {/* MODULE 10 — SIMULADO MESTRE (FINAL) */}
      <TabsContent value="modulo-10">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={10}
            titulo="Simulado Mestre — Consolidação Final"
            variant={mv[10]}
            descricao="Você dominaria os 7 tempos verbais: teste sua expertise com 8 questões de simulado CESGRANRIO"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Os 7 Tempos Verbais — Guia de Referência Mestre"
              description="Resumo completo: estrutura, quando usar, exemplos, marcadores temporais"
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Você chegou ao final. Este módulo consolida TUDO que aprendeu sobre Verb Tenses em uma referência completa. Aqui está a
                tabela que você deve memorizar, a estratégia dos 5 passos que funciona para QUALQUER questão, e um conjunto de questões
                finais que representam a dificuldade real de CESGRANRIO. Se você conseguir 70% neste simulado, você está pronto para a
                prova oficial.
              </p>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg border border-purple-200 dark:border-purple-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Tabela Mestre: 7 Tempos Verbais em Uma Página</h4>
                <div className="space-y-3 text-sm overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-purple-200 dark:bg-purple-900">
                        <th className="border border-purple-300 dark:border-purple-700 p-2 text-left">Tempo</th>
                        <th className="border border-purple-300 dark:border-purple-700 p-2 text-left">Estrutura</th>
                        <th className="border border-purple-300 dark:border-purple-700 p-2 text-left">Quando Usar</th>
                        <th className="border border-purple-300 dark:border-purple-700 p-2 text-left">Marcadores</th>
                        <th className="border border-purple-300 dark:border-purple-700 p-2 text-left">Exemplo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border border-purple-200 dark:border-purple-800">
                        <td className="border border-purple-200 dark:border-purple-800 p-2 font-semibold">Simple Present</td>
                        <td className="border border-purple-200 dark:border-purple-800 p-2">S + V (he/she/it + -s)</td>
                        <td className="border border-purple-200 dark:border-purple-800 p-2">Rotinas, fatos permanentes, verdades</td>
                        <td className="border border-purple-200 dark:border-purple-800 p-2">always, usually, every day</td>
                        <td className="border border-purple-200 dark:border-purple-800 p-2">"She works daily"</td>
                      </tr>
                      <tr className="border border-purple-200 dark:border-purple-800">
                        <td className="border border-purple-200 dark:border-purple-800 p-2 font-semibold">Present Continuous</td>
                        <td className="border border-purple-200 dark:border-purple-800 p-2">am/is/are + V-ing</td>
                        <td className="border border-purple-200 dark:border-purple-800 p-2">Ação em andamento AGORA</td>
                        <td className="border border-purple-200 dark:border-purple-800 p-2">right now, at this moment</td>
                        <td className="border border-purple-200 dark:border-purple-800 p-2">"She is working now"</td>
                      </tr>
                      <tr className="border border-purple-200 dark:border-purple-800">
                        <td className="border border-purple-200 dark:border-purple-800 p-2 font-semibold">Simple Past</td>
                        <td className="border border-purple-200 dark:border-purple-800 p-2">V + -ed (ou irregular)</td>
                        <td className="border border-purple-200 dark:border-purple-800 p-2">Ação concluída, tempo definido</td>
                        <td className="border border-purple-200 dark:border-purple-800 p-2">yesterday, last week, ago</td>
                        <td className="border border-purple-200 dark:border-purple-800 p-2">"She worked yesterday"</td>
                      </tr>
                      <tr className="border border-purple-200 dark:border-purple-800">
                        <td className="border border-purple-200 dark:border-purple-800 p-2 font-semibold">Past Continuous</td>
                        <td className="border border-purple-200 dark:border-purple-800 p-2">was/were + V-ing</td>
                        <td className="border border-purple-200 dark:border-purple-800 p-2">Ação em andamento no passado</td>
                        <td className="border border-purple-200 dark:border-purple-800 p-2">while, when (passado)</td>
                        <td className="border border-purple-200 dark:border-purple-800 p-2">"She was working when..."</td>
                      </tr>
                      <tr className="border border-purple-200 dark:border-purple-800">
                        <td className="border border-purple-200 dark:border-purple-800 p-2 font-semibold">Present Perfect</td>
                        <td className="border border-purple-200 dark:border-purple-800 p-2">have/has + Past Participle</td>
                        <td className="border border-purple-200 dark:border-purple-800 p-2">Ação passada, relevância atual</td>
                        <td className="border border-purple-200 dark:border-purple-800 p-2">just, already, for, since</td>
                        <td className="border border-purple-200 dark:border-purple-800 p-2">"She has worked since 2020"</td>
                      </tr>
                      <tr className="border border-purple-200 dark:border-purple-800">
                        <td className="border border-purple-200 dark:border-purple-800 p-2 font-semibold">Future Simple</td>
                        <td className="border border-purple-200 dark:border-purple-800 p-2">will + infinitive</td>
                        <td className="border border-purple-200 dark:border-purple-800 p-2">Ação futura, previsão, promessa</td>
                        <td className="border border-purple-200 dark:border-purple-800 p-2">tomorrow, will, next week</td>
                        <td className="border border-purple-200 dark:border-purple-800 p-2">"She will work tomorrow"</td>
                      </tr>
                      <tr className="border border-purple-200 dark:border-purple-800">
                        <td className="border border-purple-200 dark:border-purple-800 p-2 font-semibold">Conditional Type 1</td>
                        <td className="border border-purple-200 dark:border-purple-800 p-2">if + Simple Present, will + V</td>
                        <td className="border border-purple-200 dark:border-purple-800 p-2">Situação realista/provável futuro</td>
                        <td className="border border-purple-200 dark:border-purple-800 p-2">if, unless, provided that</td>
                        <td className="border border-purple-200 dark:border-purple-800 p-2">"If she works, she will succeed"</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <AlertBox tipo="success" titulo="📊 Você Está Pronto!"><p></p></AlertBox>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "① Estratégia Mestre dos 5 Passos (Resumo Executivo)",
                  icone: <LuTarget className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-base leading-relaxed">
                        Esta é a estratégia que você deve usar para QUALQUER questão sobre Verb Tenses em uma prova CESGRANRIO. Não há
                        exceção. Siga sempre nesta ordem exata, e você acertará 90% das questões.
                      </p>

                      <TimelineItem
              passo={1}
              titulo="Identifique o Marcador Temporal"
              descricao="Procure pela PALAVRA que mostra QUANDO a ação ocorre. Yesterday? Now? Since 2020? Tomorrow? O marcador te diz qual tempo usar. Este passo sozinho elimina 70% da confusão."
                      />

                      <TimelineItem
              passo={2}
              titulo="Identifique o Verbo — É State Verb?"
              descricao="Se for know, understand, want, like, believe, have, own, possess, prefer, seem, appear: NUNCA -ing. Ponto final. Isto elimina várias opções erradas."
                      />

                      <TimelineItem
              passo={3}
              titulo="Procure pelo Sujeito — Singular ou Plural?"
              descricao="He/She/It = adiciona -s em Simple Present. Plural (they, we, you) = não adiciona. 'The system prevents' (singular). 'Systems prevent' (plural)."
                      />

                      <TimelineItem
              passo={4}
              titulo="Procure por Indicadores de Passiva ou Ativa"
              descricao="Viu BE + Past Participle? É passiva. Viu sujeito AGINDO? É ativa. Isto muda completamente qual tempo usar."
                      />

                      <TimelineItem
              passo={5}
              titulo="Teste Cada Opção — Qual Soa Mais Natural?"
              descricao="Um falante nativo NUNCA diria certas coisas. Se você lê uma opção e sente que é 'errado', confie em seu instinto — você provavelmente está certo."
                      />
                    </div>
                  ),
                },
                {
                  titulo: "② Pegadinhas Finais: O Que CESGRANRIO Ama Testar",
                  icone: <LuTriangleAlert className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox
                        tipo="danger"
                        titulo="Pegadilha #1: 'Since' vs 'For' com Present Perfect"
                      >
                        <Comparison title="Exemplos" left={{ title: "ERRADO", content: "I have worked since last 5 years. We have been here for 2020.", description: "", variant: "danger" }} right={{ title: "CORRETO", content: "I have worked since 2020. We have been here for 5 years.", description: "", variant: "success" }} />
                      </AlertBox>

                      <AlertBox
                        tipo="danger"
                        titulo="Pegadilha #2: Concordância em Third Person Singular"
                      >
                        <Comparison title="Exemplos" left={{ title: "ERRADO", content: "He work here. She monitor the system. It require approval. Does she go?", description: "", variant: "danger" }} right={{ title: "CORRETO", content: "He works here. She monitors the system. It requires approval. Does she go?", description: "", variant: "success" }} />
                      </AlertBox>

                      <AlertBox
                        tipo="danger"
                        titulo="Pegadilha #3: State Verbs + Contexto Temporal"
                      >
                        <Comparison title="Exemplos" left={{ title: "ERRADO", content: "Now, I am knowing the answer. Recently, I am understanding the concept.", description: "", variant: "danger" }} right={{ title: "CORRETO", content: "Now, I know the answer. Recently, I have understood the concept.", description: "", variant: "success" }} />
                      </AlertBox>

                      <AlertBox
                        tipo="danger"
                        titulo="Pegadilha #4: Passiva com Verbo Modal"
                      >
                        <Comparison title="Exemplos" left={{ title: "ERRADO", content: "The protocol must follow. All employees should respect. Can the equipment repair?", description: "", variant: "danger" }} right={{ title: "CORRETO", content: "The protocol must be followed. All employees should respect the rules. Can the equipment be repaired?", description: "", variant: "success" }} />
                      </AlertBox>

                      <AlertBox
                        tipo="danger"
                        titulo="Pegadilha #5: Future Perfect vs Future Simple"
                      >
                        <Comparison title="Exemplos" left={{ title: "BY uma data (Future Perfect)", content: "By the deadline, we will have completed the report.", description: "", variant: "danger" }} right={{ title: "Sem deadline específico (Future Simple)", content: "We will complete the report soon.", description: "", variant: "success" }} />
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "③ Mnemônico para Cada Tempo (Memorização Rápida)",
                  icone: <LuLightbulb className="w-5 h-5" />,
                  conteudo: (
                    <CardCarousel
                      cards={[
                        {
                          titulo: "Simple Present: ALWAYS (Sempre igual)",
                          descricao:
                            "S + V. Use para rotinas, fatos permanentes. Mnemônico: 'ALWAYS' — porque descreve algo que é SEMPRE assim. 'She works daily.' 'Oil floats.'",
                          exemplo: "✓ Rotinas, verdades, procedimentos permanentes",
                        },
                        {
                          titulo: "Present Continuous: RIGHT NOW (Agora, neste segundo)",
                          descricao:
                            "am/is/are + V-ing. Use para ações em andamento neste EXATO momento. Mnemônico: 'RIGHT NOW' — o marcador mais comum. 'She is working right now.' 'They are discussing the plan.'",
                          exemplo: "✓ Ação ocorrendo NESTE SEGUNDO (agora, at this moment)",
                        },
                        {
                          titulo: "Simple Past: YESTERDAY (Já passou)",
                          descricao:
                            "V + -ed. Use para eventos concluídos em tempo definido. Mnemônico: 'YESTERDAY' — tempo fechado/completo. 'She worked yesterday.' 'The alarm sounded at 3 PM.'",
                          exemplo: "✓ Tempo definido/fechado (yesterday, last week, ago, in 2020)",
                        },
                        {
                          titulo: "Past Continuous: WHILE (Enquanto... interrupção)",
                          descricao:
                            "was/were + V-ing. Use para ação em andamento interrompida. Mnemônico: 'WHILE' — a palavra que marca duas ações simultâneas. 'While I was working, the alarm sounded.'",
                          exemplo: "✓ Duas ações no passado: uma em andamento, outra interrompendo",
                        },
                        {
                          titulo: "Present Perfect: ALREADY (Até agora)",
                          descricao:
                            "have/has + Past Participle. Use para ação com resultado atual. Mnemônico: 'ALREADY' — resultado visível AGORA. 'I have already finished.' 'We have completed Phase 1.'",
                          exemplo: "✓ Passado com relevância AGORA (just, already, for, since)",
                        },
                        {
                          titulo: "Future Simple: TOMORROW (Vai acontecer)",
                          descricao:
                            "will + infinitive. Use para previsões/promessas futuro. Mnemônico: 'TOMORROW' — evento futuro certo. 'I will help you.' 'The system will shut down tomorrow.'",
                          exemplo: "✓ Futuro simples (will, tomorrow, next week, decisions)",
                        },
                      ]}
                    />
                  ),
                },
              ]}
            />

            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white space-y-4">
              <h4 className="font-bold text-lg">🎯 Você Tem Tudo Que Precisa</h4>
              <p className="text-sm leading-relaxed">
                Você aprendeu os 7 tempos verbais (Simple Present, Present Continuous, Simple Past, Past Continuous, Present Perfect,
                Future Simple, Conditional). Você aprendeu a estratégia dos 5 passos que funciona para QUALQUER questão. Você aprendeu os
                marcadores temporais que revelam qual tempo usar. Você aprendeu os contextos Petrobras (manuais, relatórios, avaliações de
                risco). Agora, teste seu conhecimento no simulado abaixo. Se você conseguir 70% ou mais, você está pronto para a prova
                oficial de CESGRANRIO.
              </p>
              <p className="text-xs font-semibold">
                Dica final: Leia cada questão lentamente. Procure primeiro pelo marcador temporal. Aplique os 5 passos. Confie em seu
                instinto.
              </p>
            </div>
          </section>

          

<ModuleConsolidation
            index={2}
            variant={mv[10]}
            maceteVisual={{
              title: "Simulado Mestre — Os 5 Passos CESGRANRIO",
              content: (
                <div className="space-y-2 text-sm">
                  <p><strong>1.</strong> Leia a frase completa antes de responder.</p>
                  <p><strong>2.</strong> Identifique o marcador temporal (yesterday, since, now…).</p>
                  <p><strong>3.</strong> Identifique o tipo de verbo (state verb = nunca continuous).</p>
                  <p><strong>4.</strong> Elimine as alternativas incompatíveis com o marcador.</p>
                  <p><strong>5.</strong> Confirme que a alternativa escolhida faz sentido semântico na frase.</p>
                  <p className="text-xs text-muted-foreground">Você domina os 7 tempos verbais! Confiança + método = aprovação.</p>
                </div>
              )
            }}
            onComplete={() => handleModuleComplete("modulo-10")}
          />

                    <QuizInterativo
            questoes={quizFinal}
            titulo="Simulado Mestre"
            numero={10}
            onComplete={() => handleModuleComplete("modulo-10")}
          />
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
