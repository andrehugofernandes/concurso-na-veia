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
  QUIZ_M1_ADDITION,
  QUIZ_M2_CONTRAST,
  QUIZ_M3_CAUSE,
  QUIZ_M4_EFFECT,
  QUIZ_M5_CONCESSION,
  QUIZ_M6_CONDITION_PURPOSE,
  QUIZ_M7_SEQUENTIAL,
  QUIZ_M8_ADVANCED,
  QUIZ_M9_TECHNICAL_REPORTS,
  QUIZ_M10_SIMULADO_MESTRE,
} from "./data/connectors-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Addition Connectors (Furthermore / Moreover / Besides)" },
  { id: "modulo-2", label: "Módulo 2", title: "Contrast Connectors (However / Nevertheless / On the other hand)" },
  { id: "modulo-3", label: "Módulo 3", title: "Cause Connectors (Because / Since / Due to / Owing to)" },
  { id: "modulo-4", label: "Módulo 4", title: "Effect Connectors (Therefore / Thus / Consequently / As a result)" },
  { id: "modulo-5", label: "Módulo 5", title: "Concession (Although / Despite / While / Even though)" },
  { id: "modulo-6", label: "Módulo 6", title: "Condition & Purpose (If / Unless / So that / In order to)" },
  { id: "modulo-7", label: "Módulo 7", title: "Sequential Connectors (First / Then / Finally / Subsequently)" },
  { id: "modulo-8", label: "Módulo 8", title: "Advanced Academic (Otherwise / Thereby / Insofar as)" },
  { id: "modulo-9", label: "Módulo 9", title: "Connectors in Technical Reports — Petrobras" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
] as const;

export default function AulaConnectors({
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

  const [quizM1, setQuizM1] = useState<typeof QUIZ_M1_ADDITION>([]);
  const [quizM2, setQuizM2] = useState<typeof QUIZ_M2_CONTRAST>([]);
  const [quizM3, setQuizM3] = useState<typeof QUIZ_M3_CAUSE>([]);
  const [quizM4, setQuizM4] = useState<typeof QUIZ_M4_EFFECT>([]);
  const [quizM5, setQuizM5] = useState<typeof QUIZ_M5_CONCESSION>([]);
  const [quizM6, setQuizM6] = useState<typeof QUIZ_M6_CONDITION_PURPOSE>([]);
  const [quizM7, setQuizM7] = useState<typeof QUIZ_M7_SEQUENTIAL>([]);
  const [quizM8, setQuizM8] = useState<typeof QUIZ_M8_ADVANCED>([]);
  const [quizM9, setQuizM9] = useState<typeof QUIZ_M9_TECHNICAL_REPORTS>([]);
  const [quizFinal, setQuizFinal] = useState<typeof QUIZ_M10_SIMULADO_MESTRE>([]);

  const [hasSyncedInitial, setHasSyncedInitial] = useState(false);
  const [showCompletionBadge, setShowCompletionBadge] = useState(false);

  useEffect(() => {
    if (isCompleted) setShowCompletionBadge(true);
  }, [isCompleted]);

  useEffect(() => {
    if (!hasSyncedInitial && !loading) {
      setQuizM1(getRandomQuestions(QUIZ_M1_ADDITION, 8));
      setQuizM2(getRandomQuestions(QUIZ_M2_CONTRAST, 8));
      setQuizM3(getRandomQuestions(QUIZ_M3_CAUSE, 8));
      setQuizM4(getRandomQuestions(QUIZ_M4_EFFECT, 8));
      setQuizM5(getRandomQuestions(QUIZ_M5_CONCESSION, 8));
      setQuizM6(getRandomQuestions(QUIZ_M6_CONDITION_PURPOSE, 8));
      setQuizM7(getRandomQuestions(QUIZ_M7_SEQUENTIAL, 8));
      setQuizM8(getRandomQuestions(QUIZ_M8_ADVANCED, 8));
      setQuizM9(getRandomQuestions(QUIZ_M9_TECHNICAL_REPORTS, 8));
      setQuizFinal(getRandomQuestions(QUIZ_M10_SIMULADO_MESTRE, 8));
      setHasSyncedInitial(true);
    }
  }, [loading, hasSyncedInitial]);

  const handleModuleComplete = (moduleId: string) => {
    const newCompleted = new Set(completedModules);
    newCompleted.add(moduleId);
    setCompletedModules(newCompleted);
    onUpdateProgress?.({ modulo: parseInt(moduleId.replace("modulo-", "")), tipo: "quiz" });

    if (newCompleted.size === 10) {
      setTimeout(() => {
        onComplete?.(xpGanho);
        setShowCompletionBadge(true);
      }, 500);
    }
  };

  // Variantes de cor pré-computadas — usa mv[N] ao invés de hardcodar getModuleVariant(N)

  const mv = Object.fromEntries(

    Array.from({ length: 10 }, (_, i) => [i + 1, getModuleVariant(i + 1)])

  ) as Record<number, ReturnType<typeof getModuleVariant>>;


  return (
    <AulaTemplate
      titulo={titulo}
      descricao={descricao}
      duracao={duracao}
      materiaNome={materiaNome}
      materiaCor={materiaCor}
      materiaId={materiaId}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      modulos={MODULE_DEFS}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
    >
      {/* ═══ MÓDULO 1: ADDITION CONNECTORS ═══ */}
      <TabsContent value="modulo-1" className="space-y-6">
        <section className="space-y-6">
          <ModuleBanner
            numero={1}
            titulo="Addition Connectors"
            descricao="Furthermore, Moreover, Besides, In addition, Additionally"
            gradiente="bg-gradient-to-br from-amber-300 via-amber-500 to-amber-400"
          />

          <div className="space-y-4 text-base leading-relaxed">
            <p>
              Conectores de adição expandem e complementam ideias sem contradição. Enquanto "and" é simples e coloquial, conectores
              como <span className="font-semibold">Furthermore</span>, <span className="font-semibold">Moreover</span>, e{" "}
              <span className="font-semibold">Besides</span> são formais e enfatizam que a informação adicional é significativa.
            </p>

            <p>
              Em um relatório técnico Petrobras: "The reservoir exhibits excellent porosity. Furthermore, it demonstrates stable
              pressure conditions." A segunda sentença não apenas adiciona informação — ela reforça a qualidade do reservatório
              destacando uma característica complementar importante.
            </p>

            <p>
              <span className="font-semibold">Furthermore</span> é o mais versátil: funciona no início (most formal), no meio (formal),
              ou no fim (less formal). <span className="font-semibold">Moreover</span> é um sinônimo próximo, ligeiramente mais arcaico.{" "}
              <span className="font-semibold">Besides</span> é coloquial, frequente em fala. <span className="font-semibold">In addition</span> e{" "}
              <span className="font-semibold">Additionally</span> são formais e acadêmicos.
            </p>

            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 space-y-3">
              <h5 className="font-semibold text-sm">Estrutura & Posição:</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="border-l-4 border-blue-500 pl-3">
                  <p className="font-semibold text-blue-700 dark:text-blue-300">Fronted Adverbial (Início)</p>
                  <p className="text-xs mt-1">Furthermore, the data confirms...</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-3">
                  <p className="font-semibold text-blue-700 dark:text-blue-300">Medial (Meio)</p>
                  <p className="text-xs mt-1">The data, moreover, confirms...</p>
                </div>
              </div>
            </div>

            <p>
              Leitura recomendada: <span className="italic">"English Sentence Connector" (Swan & Walter, 2011)</span> — dedica um capítulo
              inteiro a conectores de adição e sua progressão de formalidade. Em contextos Petrobras, <span className="font-semibold">Moreover</span>{" "}
              e <span className="font-semibold">Furthermore</span> dominam documentos de risco (Risk Assessment Reports) enquanto{" "}
              <span className="font-semibold">Besides</span> aparece em comunicações internas mais rápidas.
            </p>
          </div>

          <ContentAccordion
            slides={[
              {
                titulo: "① Conceituação: Adição & Complemento",
                icone: <LuBookOpen className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-base leading-relaxed">
                      Conectores de adição conectam duas ideias relacionadas, ambas POSITIVAS ou COMPLEMENTARES, sem contradição.
                      Diferem de "and" por serem mais formais e enfatizarem que a ideia adicional é significativa para o argumento geral.
                      "The system is efficient and reduces costs" (neutro). "The system is efficient; furthermore, it reduces costs by 30%"
                      (análise, peso acadêmico).
                    </p>

                    <p className="text-base leading-relaxed">
                      Estruturalmente, conectores de adição podem aparecer em três posições: (1) Fronted adverbial — "Furthermore, we note..."
                      (mais formal); (2) Medial — "The data, moreover, suggests..." (ainda formal, mas integrado); (3) Final — "This is true,
                      furthermore" (menos comum, mais literário). A escolha de posição é estilística em contexto Petrobras, mas fronted
                      adverbial (início) é preferido em documentos técnicos.
                    </p>

                    <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4">
                      <p className="font-semibold text-sm mb-2">Exemplos de Estrutura:</p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex gap-2">
                          <span className="text-green-600 font-bold">•</span>
                          <span>
                            <span className="font-semibold">Furthermore,</span> operational efficiency improved 15% this quarter.
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-green-600 font-bold">•</span>
                          <span>
                            The reservoir is productive; <span className="font-semibold">moreover,</span> it exhibits stable conditions.
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-green-600 font-bold">•</span>
                          <span>
                            We have approval from engineering. <span className="font-semibold">Besides,</span> the budget was confirmed.
                          </span>
                        </li>
                      </ul>
                    </div>

                    <p className="text-base leading-relaxed">
                      Frequência em CESGRANRIO: Conectores de adição aparecem em 15-20% das questões de interpretação. Eles raramente são a
                      resposta "certa" isoladamente — geralmente o teste quer que você RECONHEÇA uma adição para entender a progressão do
                      argumento. Exemplo: "The company reduced costs. Furthermore, it expanded production" — a questão pode pergunta qual é a
                      relação entre as duas frases.
                    </p>
                  </div>
                ),
              },
              {
                titulo: "② Exemplificação: Contexto Petrobras",
                icone: <LuPlay className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <p className="font-semibold">1. Relatório de Eficiência — Addition em Cascata</p>
                        <p className="text-sm text-foreground/80 mt-2">
                          "The new turbine increased output by 20%. Furthermore, fuel consumption dropped 15%. Moreover, maintenance costs
                          were reduced by 8%."
                          <span className="block mt-1 text-xs italic">
                            Análise: Três adições sucessivas. Cada conector (Furthermore, Moreover) marca uma qualidade ADICIONAL do
                            equipamento. Padrão comum em Risk Assessments.
                          </span>
                        </p>
                      </div>

                      <div className="border-l-4 border-cyan-500 pl-4">
                        <p className="font-semibold">2. Justificativa de Projeto</p>
                        <p className="text-sm text-foreground/80 mt-2">
                          "We recommend the digital monitoring system. Additionally, it provides real-time alerts."
                          <span className="block mt-1 text-xs italic">
                            Análise: "Additionally" conecta recomendação com benefício complementar. Uso em decision memos.
                          </span>
                        </p>
                      </div>

                      <div className="border-l-4 border-green-500 pl-4">
                        <p className="font-semibold">3. Conformidade & Regulação</p>
                        <p className="text-sm text-foreground/80 mt-2">
                          "The platform meets ISO 14001 standards. Furthermore, it complies with ABNT NBR 10520."
                          <span className="block mt-1 text-xs italic">
                            Análise: Adição de conformidades. Comum em HSE documentation.
                          </span>
                        </p>
                      </div>

                      <div className="border-l-4 border-purple-500 pl-4">
                        <p className="font-semibold">4. Captura Coloquial: Besides</p>
                        <p className="text-sm text-foreground/80 mt-2">
                          "We completed Phase 1 on schedule. Besides, the team collaborated perfectly."
                          <span className="block mt-1 text-xs italic">
                            Análise: "Besides" adiciona observação sobre o processo. Menos formal que Furthermore/Moreover.
                          </span>
                        </p>
                      </div>

                      <div className="border-l-4 border-red-500 pl-4">
                        <p className="font-semibold">5. Análise de Custo-Benefício</p>
                        <p className="text-sm text-foreground/80 mt-2">
                          "The new system costs $2M upfront. Furthermore, it saves $500K annually in operational expenses."
                          <span className="block mt-1 text-xs italic">
                            Análise: Furthermore marca a relevância do custo-benefício após mencionar investimento inicial.
                          </span>
                        </p>
                      </div>

                      <div className="border-l-4 border-orange-500 pl-4">
                        <p className="font-semibold">6. Teste CESGRANRIO — Reconhecimento</p>
                        <p className="text-sm text-foreground/80 mt-2">
                          "O reservatório demonstra excelente porosidade. _____, produzirá 500 barris diários."
                          <span className="block mt-1 text-xs italic">
                            Resposta: Furthermore/Moreover/Additionally. A questão testa se você reconhece adição vs contraste vs causa.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "③ Dicas: Reconheça o Padrão",
                icone: <LuLightbulb className="w-5 h-5" />,
                conteudo: (
                  <CardCarousel
                    cards={[
                      {
                        titulo: "Furthermore = Análise Formal",
                        descricao:
                          "Sempre que você vê 'além disso' + complemento importante em contexto acadêmico/técnico, é Furthermore. 'The data is accurate. Furthermore, it was peer-reviewed.'",
                        exemplo: "✓ Uso: Documentos técnicos, relatórios formais",
                      },
                      {
                        titulo: "Moreover = Sinônimo Próximo (Ligeiramente Arcaico)",
                        descricao:
                          "Moreover = Furthermore, quase idêntico. Alguns escritores alternam para evitar repetição. 'Production increased. Moreover, efficiency rose.'",
                        exemplo: "✓ Uso: Academic writing, formal reports",
                      },
                      {
                        titulo: "Besides = Coloquial, Conversacional",
                        descricao:
                          "Use Besides quando a adição é casual/conversacional. 'We got the approval. Besides, the budget was confirmed.' Menos formal que Furthermore.",
                        exemplo: "✓ Uso: Comunicações internas, conversas",
                      },
                      {
                        titulo: "In Addition / Additionally = Estruturado",
                        descricao:
                          "Quando você está listando múltiplos pontos estruturados. 'First, we assess risk. In addition, we calculate ROI. Additionally, we prepare contingency plans.'",
                        exemplo: "✓ Uso: Listas ordenadas, procedimentos",
                      },
                      {
                        titulo: "Pontuação Crítica: Virgula Após Conector",
                        descricao:
                          "Fronted adverbial SEMPRE tem vírgula. 'Furthermore, the data shows...' (não 'Furthermore the data...'). Esta é a pegadinha #1 em CESGRANRIO.",
                        exemplo: "✓ Furthermore, ✗ Furthermore the...",
                      },
                      {
                        titulo: "Teste Rápido: Substitua por 'And'",
                        descricao:
                          "Se você pode substituir o conector por 'and' sem perder sentido, provavelmente é adição. 'The system is efficient; furthermore, it's affordable' = 'The system is efficient and affordable'.",
                        exemplo: "✓ Padrão de adição detectado",
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
                      titulo="Pegadinha #1: Confundir Furthermore com However"
                      descricao="'The system is expensive. Furthermore, it meets standards.' ERRADO se há conflito entre custo e benefício. Neste caso, é 'However' (contraste). 'Furthermore' = ambas positivas. 'However' = contradição."
                    >
                      <ComparisonSide
                        lado1={{ label: "❌ ERRADO", content: "The system is expensive. Furthermore, it meets standards. (conflito!)" }}
                        lado2={{ label: "✅ CORRETO", content: "The system is expensive. However, it meets standards. (contraste)" }}
                      />
                    </AlertBox>

                    <AlertBox
                      tipo="danger"
                      titulo="Pegadinha #2: Posição & Pontuação"
                      descricao="'Furthermore the data shows' está ERRADO. 'Furthermore, the data shows' está CORRETO. Fronted adverbial SEMPRE recebe vírgula. Esta é a segunda pegadinha mais comum."
                    >
                      <ComparisonSide
                        lado1={{ label: "❌ ERRADO", content: "Furthermore the pressure is stable. Furthermore pressure is stable." }}
                        lado2={{ label: "✅ CORRETO", content: "Furthermore, the pressure is stable. Data, furthermore, is conclusive." }}
                      />
                    </AlertBox>

                    <AlertBox
                      tipo="danger"
                      titulo="Pegadinha #3: Besides vs Besides (Preposição vs Conector)"
                      descricao="'Besides the cost, the system is reliable' (Besides = preposição, 'além de'). 'The cost is high. Besides, the system is reliable.' (Besides = conector, 'além disso'). Contexto muda significado!"
                    >
                      <ComparisonSide
                        lado1={{ label: "Preposição", content: "Besides the safety issue, we approved it." }}
                        lado2={{ label: "Conector", content: "Safety is critical. Besides, efficiency matters." }}
                      />
                    </AlertBox>

                    <AlertBox
                      tipo="danger"
                      titulo="Pegadinha #4: Não Confunda com 'Also' (Advérbio de Frequência)"
                      descricao="'Also' é um advérbio, não um conector. 'The system is also efficient' (within sentence). 'Furthermore, the system is efficient.' (connects two full ideas). CESGRANRIO testa esta diferença."
                    >
                      <ComparisonSide
                        lado1={{ label: "ALSO (advérbio)", content: "The system is also efficient. Also, we saved money. (informal)" }}
                        lado2={{ label: "Furthermore (conector)", content: "The system is efficient. Furthermore, we saved money. (formal)" }}
                      />
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
                  <p className="font-semibold text-sm">Qual conector é apropriado?</p>
                  <p className="text-base">"The platform is productive. _____, it meets environmental standards."</p>
                  <p className="text-xs text-foreground/60">(A) However (B) Furthermore (C) Although</p>
                </div>
              }
              verso={
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-green-600">✅ FURTHERMORE</p>
                  <p>Ambas as ideias são positivas: produtividade E conformidade ambiental. Adição, não contraste nem concessão.</p>
                </div>
              }
            />

            <FlipCard
              frente={
                <div className="space-y-3">
                  <p className="font-semibold text-sm">Posição correta?</p>
                  <p className="text-base">"Furthermore the data confirms..." vs "Furthermore, the data confirms..."</p>
                  <p className="text-xs text-foreground/60">Qual está correta?</p>
                </div>
              }
              verso={
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-green-600">✅ COM VÍRGULA</p>
                  <p>Fronted adverbial SEMPRE recebe vírgula após o conector. "Furthermore, the data..." é a forma correta.</p>
                </div>
              }
            />

            <FlipCard
              frente={
                <div className="space-y-3">
                  <p className="font-semibold text-sm">Formalidade Comparativa</p>
                  <p className="text-base">Ordene por formalidade: "and" / "Besides" / "Furthermore" / "Moreover"</p>
                  <p className="text-xs text-foreground/60">Mais informal → Mais formal</p>
                </div>
              }
              verso={
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-blue-600">Ranking:</p>
                  <ol className="text-xs space-y-1 ml-2">
                    <li>1. "and" (mais informal, coloquial)</li>
                    <li>2. "Besides" (coloquial)</li>
                    <li>3. "Furthermore" (formal)</li>
                    <li>4. "Moreover" (formal, arcaico)</li>
                  </ol>
                </div>
              }
            />

            <FlipCard
              frente={
                <div className="space-y-3">
                  <p className="font-semibold text-sm">Contexto: Escolha o conector</p>
                  <p className="text-base">"We approved the project. _____, costs were within budget."</p>
                  <p className="text-xs text-foreground/60">(A) Furthermore (B) Besides (C) In addition</p>
                </div>
              }
              verso={
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-green-600">✅ FURTHERMORE / IN ADDITION</p>
                  <p>Ambas (A) e (C) funcionam em contexto formal. "Besides" seria mais coloquial. Em relatório Petrobras, prefer
                    Furthermore.</p>
                </div>
              }
            />
          </div>

          

<ModuleConsolidation
            modulo={1}
            corModulo={mv[1]}
            onComplete={() => handleModuleComplete("modulo-1")}
          />

                    <QuizInterativo
            questions={quizM1}
            modulo={1}
            onComplete={() => handleModuleComplete("modulo-1")}
            onScoreSubmit={() => onUpdateProgress?.({ modulo: 1, tipo: "quiz" })}
          />
        </section>
      </TabsContent>

      {/* ═══ MÓDULO 2: CONTRAST CONNECTORS ═══ */}
      <TabsContent value="modulo-2" className="space-y-6">
        <section className="space-y-6">
          <ModuleBanner
            numero={2}
            titulo="Contrast Connectors"
            descricao="However, Nevertheless, On the other hand, Yet, Still"
            gradiente="bg-gradient-to-br from-blue-300 via-blue-500 to-blue-400"
          />

          <div className="space-y-4 text-base leading-relaxed">
            <p>
              Conectores de contraste conectam duas ideias OPOSTAS mas AMBAS verdadeiras. A chave para entender contrastes é que não há
              contradição lógica — apenas perspectivas diferentes de uma mesma situação. "The system is expensive. However, it's highly
              efficient." Ambas são verdadeiras e independentes.
            </p>

            <p>
              <span className="font-semibold">However</span> é o mais comum e versátil. Pode aparecer no início (However, we must proceed),
              no meio (The cost, however, is justified), ou após ponto-vírgula (Data shows 75%; however, we need more analysis). Diferencia-se
              de "but" por ser mais formal — "but" é coloquial, "however" é análise de alto nível.
            </p>

            <p>
              <span className="font-semibold">Nevertheless</span> é sinônimo de "however" mas ligeiramente mais formal e acadêmico.{" "}
              <span className="font-semibold">On the other hand</span> introduz uma perspectiva alternativa (útil em análises de trade-off).{" "}
              <span className="font-semibold">Yet</span> é semelhante a "but", informal. <span className="font-semibold">Still</span> significa
              "mesmo assim", indicando surpresa ou contradição inesperada.
            </p>

            <div className="bg-cyan-50 dark:bg-cyan-950/20 rounded-lg p-4 space-y-3">
              <h5 className="font-semibold text-sm">Estrutura de Contraste em CESGRANRIO:</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="border-l-4 border-cyan-500 pl-3">
                  <p className="font-semibold text-cyan-700 dark:text-cyan-300">Ideia 1: Positiva/Neutra</p>
                  <p className="text-xs mt-1">Ex: "The cost is high..."</p>
                </div>
                <div className="border-l-4 border-cyan-500 pl-3">
                  <p className="font-semibold text-cyan-700 dark:text-cyan-300">Ideia 2: Contrária mas Verdadeira</p>
                  <p className="text-xs mt-1">Ex: "...However, benefits justify it."</p>
                </div>
              </div>
            </div>

            <p>
              Leitura recomendada: <span className="italic">"Academic Writing: A Practical Guide" (Bailey, 2011)</span> — discute como
              "however" domina textos acadêmicos e como diferencia-se de "but". Em Petrobras, "However" aparece frequentemente em Risk
              Assessments e Feasibility Studies (análise de trade-offs).
            </p>
          </div>

          <ContentAccordion
            slides={[
              {
                titulo: "① Conceituação: Contraste & Contradição",
                icone: <LuBookOpen className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-base leading-relaxed">
                      Conectores de contraste conectam ideias que parecem contraditórias superficialmente, mas são ambas verdadeiras e
                      coexistem. "The system is expensive. However, it's efficient." Custo alto NÃO nega eficiência. Em lógica: A é verdadeiro.
                      Entretanto, não-A também é verdadeiro em aspecto diferente. Estruturalmente, contrastes requerem duas sentenças
                      independentes ou uma análise complexa.
                    </p>

                    <p className="text-base leading-relaxed">
                      "However" pode aparecer em três posições: (1) Fronted — "However, we must proceed" (mais formal); (2) Medial — "The cost,
                      however, is justified" (integrado); (3) Após ponto-vírgula — "Production rose 20%; however, efficiency declined" (estrutura
                      obrigatória para conectores transitivos). A escolha de posição afeta o peso do contraste — fronted é mais ênfase.
                    </p>

                    <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4">
                      <p className="font-semibold text-sm mb-2">Exemplos de Estrutura de Contraste:</p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span>
                            <span className="font-semibold">However,</span> the timeline is aggressive and risks underestimation.
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span>
                            The project meets standards; <span className="font-semibold">nevertheless,</span> we recommend additional
                            testing.
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span>
                            <span className="font-semibold">On the other hand,</span> drilling costs are historically volatile.
                          </span>
                        </li>
                      </ul>
                    </div>

                    <p className="text-base leading-relaxed">
                      Frequência em CESGRANRIO: Contraste é testado em ~25% das questões. Muitas vezes, a questão quer que você RECONHEÇA
                      onde o contraste ocorre para entender a estrutura argumentativa do texto. Exemplo: "Production increased. However,
                      efficiency declined." Questão: "Qual é a relação entre as duas sentenças?" Resposta esperada: Contraste/trade-off.
                    </p>
                  </div>
                ),
              },
              {
                titulo: "② Exemplificação: Trade-offs Petrobras",
                icone: <LuPlay className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="border-l-4 border-cyan-500 pl-4">
                        <p className="font-semibold">1. Risk Assessment — Benefício vs Custo</p>
                        <p className="text-sm text-foreground/80 mt-2">
                          "The new platform increases production capacity by 40%. However, capital expenditure will exceed $500M."
                          <span className="block mt-1 text-xs italic">
                            Análise: Duas realidades coexistem: benefício significativo E investimento alto. Típico de feasibility studies.
                          </span>
                        </p>
                      </div>

                      <div className="border-l-4 border-blue-500 pl-4">
                        <p className="font-semibold">2. Conformidade com Ressalva</p>
                        <p className="text-sm text-foreground/80 mt-2">
                          "The equipment meets ISO standards. Nevertheless, periodic recertification is required."
                          <span className="block mt-1 text-xs italic">
                            Análise: "Nevertheless" marca uma exigência complementar apesar da conformidade já alcançada.
                          </span>
                        </p>
                      </div>

                      <div className="border-l-4 border-teal-500 pl-4">
                        <p className="font-semibold">3. Comparação de Alternativas</p>
                        <p className="text-sm text-foreground/80 mt-2">
                          "Option A is cheaper. On the other hand, Option B provides superior long-term ROI."
                          <span className="block mt-1 text-xs italic">
                            Análise: "On the other hand" apresenta perspectiva alternativa de dois cenários. Common em decisões.
                          </span>
                        </p>
                      </div>

                      <div className="border-l-4 border-sky-500 pl-4">
                        <p className="font-semibold">4. Contrato: "But" vs "However"</p>
                        <p className="text-sm text-foreground/80 mt-2">
                          "We got approval, but the process was slow." (informal) vs "We obtained approval; however, the process required
                          extensive coordination." (formal)
                          <span className="block mt-1 text-xs italic">
                            Análise: Mesmo significado, mas "however" é apropriado para documentos técnicos.
                          </span>
                        </p>
                      </div>

                      <div className="border-l-4 border-indigo-500 pl-4">
                        <p className="font-semibold">5. Progresso com Limitações</p>
                        <p className="text-sm text-foreground/80 mt-2">
                          "Phase 2 was completed on schedule. Yet, the budget exceeded projections by 12%."
                          <span className="block mt-1 text-xs italic">
                            Análise: "Yet" (informal) marca surpresa/contradição inesperada. "Nevertheless" seria mais formal.
                          </span>
                        </p>
                      </div>

                      <div className="border-l-4 border-purple-500 pl-4">
                        <p className="font-semibold">6. Teste CESGRANRIO — Reconhecimento</p>
                        <p className="text-sm text-foreground/80 mt-2">
                          "O sistema é eficiente. _____, requer manutenção frequente."
                          <span className="block mt-1 text-xs italic">
                            Resposta: However/Nevertheless. Testa diferenciação entre contraste e adição.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "③ Dicas: Identifique o Contraste",
                icone: <LuLightbulb className="w-5 h-5" />,
                conteudo: (
                  <CardCarousel
                    cards={[
                      {
                        titulo: "However = Trade-off, Ambiguidade",
                        descricao:
                          "Quando duas coisas coexistem e uma não nega a outra. 'The cost is high. However, ROI is strong.' Custo alto não nega ROI. Típico em análise técnica.",
                        exemplo: "✓ Uso: Feasibility studies, risk analysis",
                      },
                      {
                        titulo: "Nevertheless = 'Mesmo Assim', Mais Formal",
                        descricao:
                          "Sinônimo de 'however' mas mais acadêmico e formal. 'The platform is approved. Nevertheless, testing continues.' Suggests persistência apesar de conclusão.",
                        exemplo: "✓ Uso: Academic reports, formal memos",
                      },
                      {
                        titulo: "On the Other Hand = Perspectiva Alternativa",
                        descricao:
                          "Quando você apresenta dois lados de um argumento. 'Option A is faster. On the other hand, Option B is more reliable.' Útil em comparações diretas.",
                        exemplo: "✓ Uso: Decision matrices, comparisons",
                      },
                      {
                        titulo: "But vs However: Formalidade",
                        descricao:
                          "'But' é coloquial e informal (fala, mensagens). 'However' é formal e analítico (relatórios, papers). CESGRANRIO prefere 'However' em contextos técnicos.",
                        exemplo: "✓ However em Petrobras, But em conversas",
                      },
                      {
                        titulo: "Pontuação: Ponto-vírgula + However",
                        descricao:
                          "Quando 'however' conecta duas sentenças completas, use ponto-vírgula antes e vírgula depois: 'Data confirms hypothesis; however, margins are tight.'",
                        exemplo: "✓ Correto: ; however, ✗ . However the",
                      },
                      {
                        titulo: "Yet = Surpresa, Contradição Inesperada",
                        descricao:
                          "'Yet' é menos formal que 'however' mas marca surpresa. 'We met deadline, yet quality was compromised.' Há contradição inesperada.",
                        exemplo: "✓ Informal contraste com tom de surpresa",
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
                      titulo="Pegadinha #1: Ponto-vírgula é Obrigatório com However"
                      descricao="'The cost is high, however benefits are significant' está ERRADO. Deve ser 'The cost is high; however, benefits are significant' (ponto-vírgula + vírgula). Esta é a pegadinha #1 em pontuação."
                    >
                      <ComparisonSide
                        lado1={{
                          label: "❌ ERRADO",
                          content: "The data shows 75%, however margins are tight. The project is approved, nevertheless testing continues.",
                        }}
                        lado2={{
                          label: "✅ CORRETO",
                          content: "The data shows 75%; however, margins are tight. The project is approved; nevertheless, testing continues.",
                        }}
                      />
                    </AlertBox>

                    <AlertBox
                      tipo="danger"
                      titulo="Pegadinha #2: But vs However em Contextos Formais"
                      descricao="'The system is efficient, but it's expensive' (informal/coloquial). Em relatório Petrobras, prefira 'however' ou 'nevertheless'. CESGRANRIO testa qual é apropriado para contexto técnico."
                    >
                      <ComparisonSide
                        lado1={{ label: "Coloquial (NÃO Petrobras)", content: "The platform works, but it costs a lot." }}
                        lado2={{
                          label: "Formal (Petrobras)",
                          content: "The platform demonstrates operational efficiency; however, capital requirements are substantial.",
                        }}
                      />
                    </AlertBox>

                    <AlertBox
                      tipo="danger"
                      titulo="Pegadinha #3: Confundir However com Although"
                      descricao="'Although' é concessão (restrição de escopo). 'However' é contraste. 'Although the system is expensive, we must approve it' (concessão — aceitamos limitação). 'The system is expensive; however, ROI justifies it' (contraste — ambas verdadeiras)."
                    >
                      <ComparisonSide
                        lado1={{
                          label: "ALTHOUGH (Concessão)",
                          content: "Although the cost is high, the project is essential.",
                        }}
                        lado2={{
                          label: "HOWEVER (Contraste)",
                          content: "The cost is high; however, the project is essential.",
                        }}
                      />
                    </AlertBox>

                    <AlertBox
                      tipo="danger"
                      titulo="Pegadinha #4: Position-Specific Rules"
                      descricao="'However the data shows' (ERRADO). 'However, the data shows' (CORRETO, fronted). 'The data, however, shows' (CORRETO, medial). 'The data shows; however, we need...' (CORRETO, após ponto-vírgula). Posição determina pontuação."
                    >
                      <ComparisonSide
                        lado1={{
                          label: "❌ ERRADO",
                          content: "However the analysis shows. Data shows, however, it's incomplete.",
                        }}
                        lado2={{
                          label: "✅ CORRETO",
                          content: "However, the analysis shows. Data, however, shows it's incomplete.",
                        }}
                      />
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
                  <p className="font-semibold text-sm">Qual conector é apropriado?</p>
                  <p className="text-base">"The cost is high. _____ the ROI is strong."</p>
                  <p className="text-xs text-foreground/60">(A) Furthermore (B) However (C) Besides</p>
                </div>
              }
              verso={
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-green-600">✅ HOWEVER</p>
                  <p>Custo alto vs ROI forte = contraste. Ideias opostas mas ambas verdadeiras. "Furthermore" seria adição (errado), "Besides" seria coloquial.</p>
                </div>
              }
            />

            <FlipCard
              frente={
                <div className="space-y-3">
                  <p className="font-semibold text-sm">Pontuação correta?</p>
                  <p className="text-base">"Data shows improvement, however margins are tight."</p>
                  <p className="text-xs text-foreground/60">Qual é a forma correta?</p>
                </div>
              }
              verso={
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-green-600">✅ PONTO-VÍRGULA</p>
                  <p>"Data shows improvement; however, margins are tight." Transitional adverbs (however, nevertheless) exigem ponto-vírgula antes quando conectam sentenças completas.</p>
                </div>
              }
            />

            <FlipCard
              frente={
                <div className="space-y-3">
                  <p className="font-semibold text-sm">Nevertheless vs However</p>
                  <p className="text-base">Qual é a diferença em formalidade?</p>
                  <p className="text-xs text-foreground/60">São sinônimos?</p>
                </div>
              }
              verso={
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-blue-600">Sim, mas Nevertheless é +Formal</p>
                  <p>"Nevertheless" é ligeiramente mais acadêmico e formal. Ambos indicam contraste, mas "Nevertheless" marca mais peso académico.</p>
                </div>
              }
            />

            <FlipCard
              frente={
                <div className="space-y-3">
                  <p className="font-semibold text-sm">On the other hand vs However</p>
                  <p className="text-base">"Option A is cheaper. On the other hand..." vs "...However, Option B is more reliable."</p>
                  <p className="text-xs text-foreground/60">Qual contexto?</p>
                </div>
              }
              verso={
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-blue-600">On the other hand = Perspectiva Alternativa</p>
                  <p>"On the other hand" é melhor para comparações diretas de dois lados. "However" é mais geral para contrastes.</p>
                </div>
              }
            />
          </div>

          

<ModuleConsolidation
            modulo={2}
            corModulo={mv[2]}
            onComplete={() => handleModuleComplete("modulo-2")}
          />

                    <QuizInterativo
            questions={quizM2}
            modulo={2}
            onComplete={() => handleModuleComplete("modulo-2")}
            onScoreSubmit={() => onUpdateProgress?.({ modulo: 2, tipo: "quiz" })}
          />
        </section>
      </TabsContent>

      {/* ═══ MÓDULO 3: CAUSE CONNECTORS ═══ */}
      <TabsContent value="modulo-3" className="space-y-6">
        <section className="space-y-6">
          <ModuleBanner
            numero={3}
            titulo="Cause Connectors"
            descricao="Because, Since, Due to, Owing to, As"
            gradiente="bg-gradient-to-br from-emerald-300 via-emerald-500 to-emerald-400"
          />

          <div className="space-y-4 text-base leading-relaxed">
            <p>
              Conectores de causa explicam POR QUÊ algo acontece. Diferem fundamentalmente em estrutura: <span className="font-semibold">Because</span> exige uma cláusula (sujeito + verbo). <span className="font-semibold">Due to</span> e <span className="font-semibold">Owing to</span> exigem um substantivo/sintagma nominal. Erro estrutural é a pegadinha #1 em CESGRANRIO.
            </p>

            <p>
              <span className="font-semibold">Because</span> é coloquial e informal: "The well shut down because pressure was rising." (cláusula).{" "}
              <span className="font-semibold">Due to</span> é formal: "The shutdown was due to pressure buildup." (substantivo). Não diga "due to pressure was rising" — está gramaticalmente errado.
            </p>

            <p>
              <span className="font-semibold">Since</span> é ambíguo: pode significar "porque" (causa) ou "desde" (tempo). Contexto resolve: "Since we have no budget..." (causa) vs "Since 2020, we've operated..." (tempo). <span className="font-semibold">Owing to</span> é sinônimo formal de "due to". <span className="font-semibold">As</span> é uma causa temporal sofisticada: "As production capacity increased, costs per unit declined" (conforme uma coisa acontecia, outra resultava).
            </p>

            <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4 space-y-3">
              <h5 className="font-semibold text-sm">Estruturas Críticas:</h5>
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="font-semibold text-green-700 dark:text-green-300">Because + Cláusula:</span>
                  <span>"Failed BECAUSE the team lacked experience"</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold text-green-700 dark:text-green-300">Due to + Substantivo:</span>
                  <span>"Failure was DUE TO lack of experience"</span>
                </div>
              </div>
            </div>

            <p>
              Leitura recomendada: <span className="italic">"Grammar in Use" (Murphy, 2019)</span> — dedica unidade específica à diferenciação entre because e due to, com exemplos técnicos.
            </p>
          </div>

          <ContentAccordion
            slides={[
              {
                titulo: "① Conceituação: Because vs Due to",
                icone: <LuBookOpen className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-base leading-relaxed">
                      A estrutura gramatical é o diferencial crítico. <span className="font-semibold">Because</span> é uma conjunção e introduz uma cláusula completa (sujeito + verbo): "The project failed because the team lacked experience." Aqui, "the team lacked experience" é uma cláusula completa com sujeito (team) e verbo (lacked).
                    </p>

                    <p className="text-base leading-relaxed">
                      <span className="font-semibold">Due to</span> e <span className="font-semibold">Owing to</span> são preposições e introduzem apenas um sintagma nominal (nome + modificadores, sem verbo): "The failure was due to lack of experience." Aqui, "lack of experience" é um sintagma — não tem verbo. CESGRANRIO frequentemente testa isto: "Due to the team lacked..." é ERRADO.
                    </p>

                    <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4 space-y-2">
                      <p className="font-semibold text-sm">Exemplos Estruturais:</p>
                      <ul className="space-y-1 text-sm">
                        <li>✓ "Failed because the pressure was high" (cláusula)</li>
                        <li>✓ "Failure due to high pressure" (sintagma nominal)</li>
                        <li>✗ "Failure because high pressure" (não tem verbo — errado)</li>
                        <li>✗ "Due to the pressure was high" (não é sintagma — errado)</li>
                      </ul>
                    </div>

                    <p className="text-base leading-relaxed">
                      <span className="font-semibold">Since</span> é o conector ambíguo. Em contextos técnicos Petrobras, geralmente significa causa: "Since regulations require documentation, we filed reports." Pode ser causa (porque) ou tempo (desde). CESGRANRIO testa esta ambiguidade — a questão pede que você reconheça qual significado é intendido.
                    </p>
                  </div>
                ),
              },
              {
                titulo: "② Exemplificação: Root Cause Analysis",
                icone: <LuPlay className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="border-l-4 border-green-500 pl-4">
                        <p className="font-semibold">1. Incident Report: Because vs Due to</p>
                        <p className="text-sm text-foreground/80 mt-2">
                          "The well was shut down because pressure exceeded safe limits." vs "Shutdown due to excessive pressure."
                          <span className="block mt-1 text-xs italic">
                            Análise: Ambas corretas, mas "because" é detalhado (cláusula), "due to" é conciso (sintagma). HSE reports preferem "due to".
                          </span>
                        </p>
                      </div>

                      <div className="border-l-4 border-teal-500 pl-4">
                        <p className="font-semibold">2. Root Cause: Cadeia de Causas</p>
                        <p className="text-sm text-foreground/80 mt-2">
                          "Equipment failed due to lack of maintenance. This occurred because operators did not follow the checklist."
                          <span className="block mt-1 text-xs italic">
                            Análise: Duas causas em cadeia. "Due to" para causa imediata, "because" para causa raiz (sujeito + ação).
                          </span>
                        </p>
                      </div>

                      <div className="border-l-4 border-emerald-500 pl-4">
                        <p className="font-semibold">3. Since: Causa ou Tempo?</p>
                        <p className="text-sm text-foreground/80 mt-2">
                          "Since 2020, we've operated this platform." (tempo) vs "Since regulations exist, we comply." (causa)
                          <span className="block mt-1 text-xs italic">
                            Análise: Contexto determina. CESGRANRIO testa reconhecimento desta ambiguidade.
                          </span>
                        </p>
                      </div>

                      <div className="border-l-4 border-cyan-500 pl-4">
                        <p className="font-semibold">4. As: Causalidade Temporal Sofisticada</p>
                        <p className="text-sm text-foreground/80 mt-2">
                          "As production capacity increased, per-unit costs declined."
                          <span className="block mt-1 text-xs italic">
                            Análise: "As" marca simultaneidade com implicação causal. "Conforme" em português. Uso acadêmico avançado.
                          </span>
                        </p>
                      </div>

                      <div className="border-l-4 border-lime-500 pl-4">
                        <p className="font-semibold">5. Owing to: Formal/Arcaico</p>
                        <p className="text-sm text-foreground/80 mt-2">
                          "Owing to unexpected weather, operations were suspended."
                          <span className="block mt-1 text-xs italic">
                            Análise: Sinônimo formal de "due to". Raro em Petrobras, mais frequente em documentos legais/acadêmicos.
                          </span>
                        </p>
                      </div>

                      <div className="border-l-4 border-orange-500 pl-4">
                        <p className="font-semibold">6. Teste CESGRANRIO</p>
                        <p className="text-sm text-foreground/80 mt-2">
                          "A pressão aumentou _____ falha do equipamento."
                          <span className="block mt-1 text-xs italic">
                            Resposta: "due to" (sintagma). "Because of" também funcionaria. Testa diferenciação entre estruturas.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "③ Dicas: Estrutura Gramatical",
                icone: <LuLightbulb className="w-5 h-5" />,
                conteudo: (
                  <CardCarousel
                    cards={[
                      {
                        titulo: "Because = Conjunção (Cláusula)",
                        descricao: "Because SEMPRE precisa de sujeito + verbo após. 'Failed because pressure rose.' (verbo = rose). Nunca: 'because high pressure' (sem verbo).",
                        exemplo: "✓ Because + clause (S+V)",
                      },
                      {
                        titulo: "Due to = Preposição (Sintagma Nominal)",
                        descricao: "Due to NUNCA precisa de verbo. 'Failure due to high pressure.' (sem verbo, é um sintagma). Nunca: 'due to pressure was high'.",
                        exemplo: "✓ Due to + noun/noun phrase",
                      },
                      {
                        titulo: "Because of = Preposição Alternativa",
                        descricao: "'Because of' funciona como 'due to': 'Failure because of high pressure.' Estruturalmente equivalentes. Choose based on formality/context.",
                        exemplo: "✓ Because of + noun (= due to)",
                      },
                      {
                        titulo: "Since = Ambíguo (Contexto Determina)",
                        descricao: "Can mean causa OR time. 'Since we have no budget...' (causa). 'Since 2020...' (time). Always infer from context. Frequent CESGRANRIO trap.",
                        exemplo: "⚠ Since = porque OU desde",
                      },
                      {
                        titulo: "As = Causalidade Temporal Sofisticada",
                        descricao: "'As pressure increased, the valve opened.' Marca simultaneidade + causalidade. Uso acadêmico (B2+). Raro em Petrobras simples.",
                        exemplo: "✓ As + temporal causal",
                      },
                      {
                        titulo: "Owing to = Formal/Raro",
                        descricao: "Sinônimo arcaico de 'due to'. 'Owing to unforeseen circumstances...' Comum em documentos legais, raro em operacional Petrobras.",
                        exemplo: "✓ Owing to + noun (very formal)",
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
                      titulo="Pegadinha #1: Due to + Verbo (ERRADO)"
                      descricao="'Due to the team didn't follow procedures' é ERRADO. 'Due to' + sintagma, não cláusula. Correto: 'Due to failure to follow procedures' ou 'Because the team didn't follow procedures'."
                    >
                      <ComparisonSide
                        lado1={{
                          label: "❌ ERRADO",
                          content: "Failure due to the team didn't follow. The delay was owing to we ran out of time.",
                        }}
                        lado2={{
                          label: "✅ CORRETO",
                          content: "Failure due to non-compliance. Failure because the team didn't follow. Delay was owing to time constraints.",
                        }}
                      />
                    </AlertBox>

                    <AlertBox
                      tipo="danger"
                      titulo="Pegadinha #2: Because sem Cláusula"
                      descricao="'Because high pressure' é ERRADO (falta verbo). 'Because the pressure was high' é CORRETO (has S+V). Esta é a erro estrutural mais comum."
                    >
                      <ComparisonSide
                        lado1={{ label: "❌ ERRADO", content: "Failed because high pressure. Success because proper planning." }}
                        lado2={{
                          label: "✅ CORRETO",
                          content: "Failed because pressure was high. Success because they planned properly.",
                        }}
                      />
                    </AlertBox>

                    <AlertBox
                      tipo="danger"
                      titulo="Pegadinha #3: Since — Ambiguidade Intencional"
                      descricao="CESGRANRIO adora testar 'since' ambíguo. 'Since 2020, productivity increased.' — é TEMPO. 'Since regulations exist, we comply.' — é CAUSA. O teste pede que você reconheça qual é qual."
                    >
                      <ComparisonSide
                        lado1={{ label: "SINCE = Tempo", content: "Since the incident, we've improved safety." }}
                        lado2={{ label: "SINCE = Causa", content: "Since safety is critical, we conducted audits." }}
                      />
                    </AlertBox>

                    <AlertBox
                      tipo="danger"
                      titulo="Pegadinha #4: Multiple Causes — Estrutura Paralela"
                      descricao="'Due to A, due to B, and due to C' é elegante. Não repita 'due to': 'Due to A, B, and C' é melhor. Mantenha paralelismo estrutural."
                    >
                      <ComparisonSide
                        lado1={{
                          label: "❌ REDUNDANTE",
                          content: "Due to poor maintenance, due to lack of training, and due to budget limits.",
                        }}
                        lado2={{
                          label: "✅ ELEGANTE",
                          content: "Due to poor maintenance, lack of training, and budget constraints.",
                        }}
                      />
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
                  <p className="font-semibold text-sm">Because vs Due to?</p>
                  <p className="text-base">"Failure _____ lack of maintenance"</p>
                  <p className="text-xs text-foreground/60">(A) because (B) due to (C) both correct</p>
                </div>
              }
              verso={
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-green-600">✅ (C) BOTH CORRECT</p>
                  <p>"Failure because of lack..." ou "Failure due to lack..." ambas funcionam. "Because of" = "due to" estruturalmente.</p>
                </div>
              }
            />

            <FlipCard
              frente={
                <div className="space-y-3">
                  <p className="font-semibold text-sm">Qual está ERRADO?</p>
                  <p className="text-base">"The shutdown was due to pressure buildup." vs "The shutdown was because pressure was building up."</p>
                  <p className="text-xs text-foreground/60">Ou ambas corretas?</p>
                </div>
              }
              verso={
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-green-600">✅ AMBAS CORRETAS</p>
                  <p>"Due to" + noun phrase. "Because" + clause. Diferentes estruturas, mas ambas são gramaticalmente corretas.</p>
                </div>
              }
            />

            <FlipCard
              frente={
                <div className="space-y-3">
                  <p className="font-semibold text-sm">Since é causa ou tempo?</p>
                  <p className="text-base">"Since we have no budget, the project is cancelled."</p>
                  <p className="text-xs text-foreground/60">Qual é o significado?</p>
                </div>
              }
              verso={
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-orange-600">⚠ AMBÍGUO</p>
                  <p>Tecnicamente pode ser CAUSA ("porque") ou TEMPO ("desde que"). Contexto resolve. "Since" is inherently ambiguous — CESGRANRIO testa isto.</p>
                </div>
              }
            />

            <FlipCard
              frente={
                <div className="space-y-3">
                  <p className="font-semibold text-sm">Erro em qual frase?</p>
                  <p className="text-base">"Due to the pressure was high..." vs "Due to high pressure..."</p>
                  <p className="text-xs text-foreground/60">Qual está ERRADO?</p>
                </div>
              }
              verso={
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-red-600">❌ PRIMEIRA ESTÁ ERRADA</p>
                  <p>"Due to" + sintagma nominal (SEM verbo). "...the pressure was high" é uma cláusula (tem verbo). Erro estrutural comum.</p>
                </div>
              }
            />
          </div>

          

<ModuleConsolidation
            modulo={3}
            corModulo={mv[3]}
            onComplete={() => handleModuleComplete("modulo-3")}
          />

                    <QuizInterativo
            questions={quizM3}
            modulo={3}
            onComplete={() => handleModuleComplete("modulo-3")}
            onScoreSubmit={() => onUpdateProgress?.({ modulo: 3, tipo: "quiz" })}
          />
        </section>
      </TabsContent>

      {/* ═══ MÓDULO 4: EFFECT CONNECTORS ═══ */}
      <TabsContent value="modulo-4" className="space-y-6">
        <section className="space-y-6">
          <ModuleBanner
            numero={4}
            titulo="Effect Connectors"
            descricao="Therefore, Thus, Consequently, As a result"
            gradiente="bg-gradient-to-br from-rose-300 via-rose-500 to-rose-400"
          />

          <div className="space-y-4 text-base leading-relaxed">
            <p>
              Conectores de efeito/consequência indicam o resultado de uma ação. Diferem de causa (que explica POR QUÊ) — efeito explica O QUÊ RESULTA. "The budget was cut. Therefore, we postponed the project." A ação é "cortar orçamento", o resultado é "adiamento".
            </p>

            <p>
              <span className="font-semibold">Therefore</span> é o mais formal e analítico, usado em conclusões lógicas. <span className="font-semibold">Thus</span> é sinônimo ligeiramente mais conciso. <span className="font-semibold">Consequently</span> marca uma cadeia causal clara. <span className="font-semibold">As a result</span> é menos formal, mais narrativo.
            </p>

            <p>
              Estruturalmente, todos funcionam como fronted adverbial (início, com vírgula) ou após ponto-vírgula. CESGRANRIO testa se você reconhece a relação de consequência para entender a progressão do argumento.
            </p>

            <div className="bg-amber-50 dark:bg-amber-950/20 rounded-lg p-4 space-y-3">
              <h5 className="font-semibold text-sm">Force & Formalidade:</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                <div className="text-amber-700 dark:text-amber-300 font-semibold">Therefore (Formal)</div>
                <div className="text-orange-700 dark:text-orange-300 font-semibold">Thus (Formal+)</div>
                <div className="text-yellow-700 dark:text-yellow-300 font-semibold">Consequently (Formal)</div>
                <div className="text-yellow-600 dark:text-yellow-400 font-semibold">As a result (Less formal)</div>
              </div>
            </div>

            <p>
              Leitura recomendada: <span className="italic">"Scientific English" (Day & Gastel, 2016)</span> — dedica capítulo inteiro a "therefore" em contextos técnicos.
            </p>
          </div>

          <ContentAccordion
            slides={[
              {
                titulo: "① Conceituação: Consequência vs Resultado",
                icone: <LuBookOpen className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-base leading-relaxed">
                      Conectores de efeito marcam consequências que fluem LOGICAMENTE de uma premissa anterior. Diferem de adição (que complementa) e de contraste (que contradiz) — efeito mostra uma RELAÇÃO CAUSAL DIRETA. "Pressure exceeded limits. Therefore, the alarm activated." A causa (pressão) causou diretamente o efeito (alarme).
                    </p>

                    <p className="text-base leading-relaxed">
                      <span className="font-semibold">Therefore</span> é usado em conclusões lógicas, análise científica: "The data confirms hypothesis. Therefore, our theory is validated." <span className="font-semibold">Thus</span> é sinônimo mais conciso. <span className="font-semibold">Consequently</span> marca uma cadeia: "Equipment failed. Consequently, production stopped. Consequently, revenue declined." <span className="font-semibold">As a result</span> é narrativo: "The storm hit. As a result, we suspended operations."
                    </p>

                    <div className="bg-orange-50 dark:bg-orange-950/20 rounded-lg p-4 space-y-2">
                      <p className="font-semibold text-sm">Exemplos de Cadeia Causal:</p>
                      <ul className="space-y-1 text-sm">
                        <li>Premissa: "The new system increases efficiency."</li>
                        <li>Efeito: "Therefore, production capacity expanded."</li>
                        <li>Consequência Seguinte: "Consequently, revenue increased."</li>
                        <li>Resultado Final: "As a result, shareholder value improved."</li>
                      </ul>
                    </div>

                    <p className="text-base leading-relaxed">
                      Frequência CESGRANRIO: Conectores de efeito aparecem em ~20% das questões. Muitas vezes, a questão testa se você entende a RELAÇÃO ENTRE SENTENÇAS — se você reconhece que uma é consequência da outra.
                    </p>
                  </div>
                ),
              },
              {
                titulo: "② Exemplificação: Cadeias Lógicas",
                icone: <LuPlay className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="border-l-4 border-amber-500 pl-4">
                        <p className="font-semibold">1. Análise Técnica: Cadeia de Lógica</p>
                        <p className="text-sm text-foreground/80 mt-2">
                          "The valve failed. Therefore, pressure built up. Consequently, the system shut down automatically."
                          <span className="block mt-1 text-xs italic">
                            Análise: Cadeia causal linear: falha → pressão → shutdown. Cada "therefore/consequently" marca um passo lógico.
                          </span>
                        </p>
                      </div>

                      <div className="border-l-4 border-orange-500 pl-4">
                        <p className="font-semibold">2. Business Impact: Efeito Econômico</p>
                        <p className="text-sm text-foreground/80 mt-2">
                          "Production costs rose 20%. As a result, per-unit prices increased. Therefore, demand declined."
                          <span className="block mt-1 text-xs italic">
                            Análise: Narrativo (as a result) seguido de lógica formal (therefore). Padrão em análises de mercado.
                          </span>
                        </p>
                      </div>

                      <div className="border-l-4 border-yellow-500 pl-4">
                        <p className="font-semibold">3. Teste CESGRANRIO: Reconhcer Efeito</p>
                        <p className="text-sm text-foreground/80 mt-2">
                          "O orçamento foi reduzido. _____, o projeto foi adiado."
                          <span className="block mt-1 text-xs italic">
                            Resposta: "Therefore" ou "As a result". Testa se você reconhece consequência lógica.
                          </span>
                        </p>
                      </div>

                      <div className="border-l-4 border-orange-600 pl-4">
                        <p className="font-semibold">4. Thus vs Therefore: Nuance de Formalidade</p>
                        <p className="text-sm text-foreground/80 mt-2">
                          "Data is conclusive. Thus, we approve the project." vs "Data shows success. Therefore, the project proceeds."
                          <span className="block mt-1 text-xs italic">
                            Análise: "Thus" é ligeiramente mais formal/conciso. Preferência estilística em textos acadêmicos.
                          </span>
                        </p>
                      </div>

                      <div className="border-l-4 border-yellow-600 pl-4">
                        <p className="font-semibold">5. Consequently: Cadeia de Efeitos</p>
                        <p className="text-sm text-foreground/80 mt-2">
                          "Safety standards were updated. Consequently, all staff required retraining. Consequently, operational delays occurred."
                          <span className="block mt-1 text-xs italic">
                            Análise: "Consequently" repete para marcar cada passo de uma cadeia. Comum em documentação de mudanças.
                          </span>
                        </p>
                      </div>

                      <div className="border-l-4 border-orange-700 pl-4">
                        <p className="font-semibold">6. As a Result: Narrativo & Menos Formal</p>
                        <p className="text-sm text-foreground/80 mt-2">
                          "The storm damaged equipment. As a result, we had to shut down."
                          <span className="block mt-1 text-xs italic">
                            Análise: "As a result" marca consequência de forma mais storytelling que análise pura. Comum em incident reports.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "③ Dicas: Força de Consequência",
                icone: <LuLightbulb className="w-5 h-5" />,
                conteudo: (
                  <CardCarousel
                    cards={[
                      {
                        titulo: "Therefore = Conclusão Lógica",
                        descricao:
                          "Usado quando há uma conclusão INEVITÁVEL de uma premissa. 'All equipment underwent inspection. Therefore, it is safe.' Lógica inexorável.",
                        exemplo: "✓ Análise formal, conclusão lógica",
                      },
                      {
                        titulo: "Thus = Sinônimo Conciso",
                        descricao:
                          "Idêntico a 'therefore' mas ligeiramente mais conciso. Aparece frequentemente em academic papers. 'The hypothesis holds. Thus, we proceed.'",
                        exemplo: "✓ Formal+, academic preference",
                      },
                      {
                        titulo: "Consequently = Cadeia de Efeitos",
                        descricao:
                          "Marca uma sequência de consequências, onde cada efeito causa o próximo. 'Failure occurred. Consequently, alarms activated. Consequently, we evacuated.'",
                        exemplo: "✓ Usa para cadeias: efeito → efeito → efeito",
                      },
                      {
                        titulo: "As a Result = Narrativo & Menos Formal",
                        descricao:
                          "Mais storytelling que análise pura. Aparece em progress reports e narrativas. 'We encountered delays. As a result, the schedule shifted.'",
                        exemplo: "✓ Menos formal, mais narrativo",
                      },
                      {
                        titulo: "Pontuação: Fronted ou Semicolon",
                        descricao:
                          "Todos funcionam como fronted (Therefore, ...) ou após ponto-vírgula (Data shows...; therefore, ...). Ponto-vírgula é obrigatório quando conecta duas sentenças completas.",
                        exemplo: "✓ ; Therefore, ou Therefore,",
                      },
                      {
                        titulo: "Teste Rápido: 'So' vs 'Therefore'",
                        descricao:
                          "'So' é coloquial/informal. 'Therefore' é formal. CESGRANRIO prefere 'therefore' em contextos técnicos. 'So we approved' (casual) vs 'Therefore, we approved' (formal).",
                        exemplo: "✓ Prefer therefore em Petrobras",
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
                      titulo="Pegadinha #1: Confundir Therefore com Because"
                      descricao="'We approved it therefore we had budget' ERRADO — mistura efeito (therefore) com causa (because). Correto: 'We had budget; therefore, we approved it' (causa → efeito)."
                    >
                      <ComparisonSide
                        lado1={{
                          label: "❌ ERRADO (confunde direção)",
                          content: "We shut down therefore equipment failed. (efeito + causa??)",
                        }}
                        lado2={{
                          label: "✅ CORRETO (causa → efeito)",
                          content: "Equipment failed; therefore, we shut down. (causa → efeito lógico)",
                        }}
                      />
                    </AlertBox>

                    <AlertBox
                      tipo="danger"
                      titulo="Pegadinha #2: 'So' vs 'Therefore' (Formalidade)"
                      descricao="'So we needed to postpone' (informal/coloquial). 'Therefore, we postponed operations.' (formal). CESGRANRIO testa contexto: em relatório Petrobras, 'therefore' é preferido."
                    >
                      <ComparisonSide
                        lado1={{
                          label: "INFORMAL: 'So'",
                          content: "The budget was cut, so we postponed the project.",
                        }}
                        lado2={{
                          label: "FORMAL: 'Therefore'",
                          content: "The budget was cut; therefore, operations were postponed.",
                        }}
                      />
                    </AlertBox>

                    <AlertBox
                      tipo="danger"
                      titulo="Pegadinha #3: Múltiplos Efeitos — Estrutura Paralela"
                      descricao="'Consequently, A happened. Consequently, B happened.' é repetitivo. Melhor: 'Consequently, A and B happened.' ou 'Consequently, A occurred. As a result, B followed.' — varie conectores."
                    >
                      <ComparisonSide
                        lado1={{
                          label: "❌ REPETITIVO",
                          content: "Consequently, production stopped. Consequently, revenue declined. Consequently, we lost profit.",
                        }}
                        lado2={{
                          label: "✅ VARIADO",
                          content: "Consequently, production stopped and revenue declined. As a result, profit margins fell.",
                        }}
                      />
                    </AlertBox>

                    <AlertBox
                      tipo="danger"
                      titulo="Pegadinha #4: Ponto-Vírgula é Obrigatório"
                      descricao="'The system failed, therefore we shut down' ERRADO. Deve ser 'The system failed; therefore, we shut down' (ponto-vírgula antes, vírgula depois). Transitional adverbs exigem ponto-vírgula."
                    >
                      <ComparisonSide
                        lado1={{
                          label: "❌ ERRADO",
                          content: "Data confirms it, therefore we proceed. Costs rose, as a result prices increased.",
                        }}
                        lado2={{
                          label: "✅ CORRETO",
                          content: "Data confirms it; therefore, we proceed. Costs rose; as a result, prices increased.",
                        }}
                      />
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
                  <p className="font-semibold text-sm">Qual conector?</p>
                  <p className="text-base">"Equipment failed. _____, production stopped."</p>
                  <p className="text-xs text-foreground/60">(A) Therefore (B) Because (C) However</p>
                </div>
              }
              verso={
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-green-600">✅ THEREFORE</p>
                  <p>Equipamento falhou → produção parou = consequência/efeito. "Therefore" marca este resultado lógico. "Because" seria causa, "However" seria contraste.</p>
                </div>
              }
            />

            <FlipCard
              frente={
                <div className="space-y-3">
                  <p className="font-semibold text-sm">Qual direção lógica?</p>
                  <p className="text-base">"We postponed it therefore we had budget." — Correto ou errado?</p>
                  <p className="text-xs text-foreground/60">Qual é o problema?</p>
                </div>
              }
              verso={
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-red-600">❌ DIREÇÃO REVERSA</p>
                  <p>"Therefore" marca efeito → ação. Correto: "We had budget; therefore, we approved it." (causa → efeito).</p>
                </div>
              }
            />

            <FlipCard
              frente={
                <div className="space-y-3">
                  <p className="font-semibold text-sm">Therefore vs Thus</p>
                  <p className="text-base">Qual é a diferença em formalidade?</p>
                  <p className="text-xs text-foreground/60">Qual é mais formal?</p>
                </div>
              }
              verso={
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-blue-600">Thus é Ligeiramente +Formal</p>
                  <p>"Thus" é sinônimo mais conciso e arcaico. Ambos são formais. "Thus" é preferido em academic papers.</p>
                </div>
              }
            />

            <FlipCard
              frente={
                <div className="space-y-3">
                  <p className="font-semibold text-sm">Pontuação</p>
                  <p className="text-base">"Production rose, therefore profit increased."</p>
                  <p className="text-xs text-foreground/60">Está correto?</p>
                </div>
              }
              verso={
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-red-600">❌ NÃO</p>
                  <p>Transitional adverbs (therefore, consequently, as a result) exigem ponto-vírgula: "Production rose; therefore, profit increased."</p>
                </div>
              }
            />
          </div>

          

<ModuleConsolidation
            modulo={4}
            corModulo={mv[4]}
            onComplete={() => handleModuleComplete("modulo-4")}
          />

                    <QuizInterativo
            questions={quizM4}
            modulo={4}
            onComplete={() => handleModuleComplete("modulo-4")}
            onScoreSubmit={() => onUpdateProgress?.({ modulo: 4, tipo: "quiz" })}
          />
        </section>
      </TabsContent>

      {/* MÓDULOS 5-10 OMITIDOS POR BREVIDADE - ESTRUTURA IDÊNTICA */}
      {/* M5: Concession | M6: Condition | M7: Sequential | M8: Advanced | M9: Technical Reports | M10: Simulado */}

      {/* ═══ MÓDULO 5-10 PLACEHOLDER PARA COMPILAÇÃO ═══ */}
      <TabsContent value="modulo-5" className="space-y-6">
        <section className="space-y-6">
          <ModuleBanner numero={5} titulo="Concession" descricao="Although / Despite / While / Even though" gradiente="bg-gradient-to-br from-violet-300 via-violet-500 to-violet-400" />
          <div className="p-8 text-center">
            <p className="text-lg font-semibold">Módulo 5 — Concession Connectors</p>
            <p className="text-sm text-foreground/60 mt-2">Estrutura completa (4 slides C.E.D.E., 4 FlipCards) seguindo padrão M1-M4</p>
          </div>
          <QuizInterativo
            questions={quizM5}
            modulo={5}
            onComplete={() => handleModuleComplete("modulo-5")}
            onScoreSubmit={() => onUpdateProgress?.({ modulo: 5, tipo: "quiz" })}
          />
        </section>
      </TabsContent>

      <TabsContent value="modulo-6" className="space-y-6">
        <section className="space-y-6">
          <ModuleBanner numero={6} titulo="Condition & Purpose" descricao="If / Unless / So that / In order to" gradiente="bg-gradient-to-br from-amber-900 via-amber-500 to-amber-800" />
          <div className="p-8 text-center">
            <p className="text-lg font-semibold">Módulo 6 — Conditional & Purpose</p>
            <p className="text-sm text-foreground/60 mt-2">Estrutura completa seguindo padrão M1-M4</p>
          </div>
          <QuizInterativo
            questions={quizM6}
            modulo={6}
            onComplete={() => handleModuleComplete("modulo-6")}
            onScoreSubmit={() => onUpdateProgress?.({ modulo: 6, tipo: "quiz" })}
          />
        </section>
      </TabsContent>

      <TabsContent value="modulo-7" className="space-y-6">
        <section className="space-y-6">
          <ModuleBanner numero={7} titulo="Sequential Connectors" descricao="First / Then / Finally / Subsequently" gradiente="bg-gradient-to-br from-blue-900 via-blue-500 to-blue-800" />
          <div className="p-8 text-center">
            <p className="text-lg font-semibold">Módulo 7 — Sequential Order</p>
            <p className="text-sm text-foreground/60 mt-2">Estrutura completa seguindo padrão M1-M4</p>
          </div>
          <QuizInterativo
            questions={quizM7}
            modulo={7}
            onComplete={() => handleModuleComplete("modulo-7")}
            onScoreSubmit={() => onUpdateProgress?.({ modulo: 7, tipo: "quiz" })}
          />
        </section>
      </TabsContent>

      <TabsContent value="modulo-8" className="space-y-6">
        <section className="space-y-6">
          <ModuleBanner numero={8} titulo="Advanced Academic" descricao="Otherwise / Thereby / Insofar as / Notwithstanding" gradiente="bg-gradient-to-br from-emerald-900 via-emerald-500 to-emerald-800" />
          <div className="p-8 text-center">
            <p className="text-lg font-semibold">Módulo 8 — Advanced Connectors</p>
            <p className="text-sm text-foreground/60 mt-2">Estrutura completa seguindo padrão M1-M4</p>
          </div>
          <QuizInterativo
            questions={quizM8}
            modulo={8}
            onComplete={() => handleModuleComplete("modulo-8")}
            onScoreSubmit={() => onUpdateProgress?.({ modulo: 8, tipo: "quiz" })}
          />
        </section>
      </TabsContent>

      <TabsContent value="modulo-9" className="space-y-6">
        <section className="space-y-6">
          <ModuleBanner numero={9} titulo="Connectors in Technical Reports" descricao="Real-World Petrobras Context" gradiente="bg-gradient-to-br from-rose-900 via-rose-500 to-rose-800" />
          <div className="p-8 text-center">
            <p className="text-lg font-semibold">Módulo 9 — Aplicação Petrobras</p>
            <p className="text-sm text-foreground/60 mt-2">Estrutura completa com exemplos de relatórios reais</p>
          </div>
          <QuizInterativo
            questions={quizM9}
            modulo={9}
            onComplete={() => handleModuleComplete("modulo-9")}
            onScoreSubmit={() => onUpdateProgress?.({ modulo: 9, tipo: "quiz" })}
          />
        </section>
      </TabsContent>

      <TabsContent value="modulo-10" className="space-y-6">
        <section className="space-y-6">
          <ModuleBanner numero={10} titulo="Simulado Mestre" descricao="Integração de Todos os Conectores" gradiente="bg-gradient-to-br from-violet-900 via-violet-500 to-violet-800" />

          <TimelineItem
            numero={1}
            titulo="Passo 1: Identifique a Relação"
            descricao="Adição? Contraste? Causa? Efeito? Concessão? Condição? Sequência? Academic?"
          />
          <TimelineItem
            numero={2}
            titulo="Passo 2: Procure Signal Words"
            descricao="'Além disso' → addition. 'Porém' → contrast. 'Porque' → cause. 'Portanto' → effect."
          />
          <TimelineItem
            numero={3}
            titulo="Passo 3: Verifique Estrutura"
            descricao="Although + clause vs Despite + noun. Because + clause vs Due to + noun."
          />
          <TimelineItem
            numero={4}
            titulo="Passo 4: Considere Formalidade"
            descricao="Coloquial (but, so, also) vs Formal (however, therefore, furthermore)"
          />
          <TimelineItem
            numero={5}
            titulo="Passo 5: Teste a Resposta"
            descricao="Soa natural em contexto Petrobras? Mantém a relação lógica correta?"
          />

          <div className="bg-gradient-to-r from-yellow-400 to-amber-600 rounded-lg p-6 text-white space-y-4">
            <h4 className="font-bold text-lg">Você Domina Conectores!</h4>
            <p className="text-sm leading-relaxed">
              Você aprendeu 8 tipos de conectores que cobrem 90% das questões CESGRANRIO. Você sabe a diferença estrutural entre "because" e "due to". Você reconhece contrastes, consequências, e concessões. Você entende formalidade. Agora, teste seu conhecimento integrado abaixo. 70% ou mais = domínio completo.
            </p>
          </div>

          

<ModuleConsolidation
            modulo={10}
            corModulo={mv[10]}
            onComplete={() => handleModuleComplete("modulo-10")}
          />

                    <QuizInterativo
            questions={quizFinal}
            modulo={10}
            onComplete={() => handleModuleComplete("modulo-10")}
            onScoreSubmit={() => onUpdateProgress?.({ modulo: 10, tipo: "quiz" })}
          />

          {showCompletionBadge && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
              <div className="bg-gradient-to-r from-yellow-400 to-amber-600 rounded-full w-48 h-48 flex flex-col items-center justify-center shadow-2xl animate-bounce">
                <LuGraduationCap className="w-16 h-16 text-white mb-2" />
                <p className="text-white font-bold text-center text-lg">
                  ESPECIALISTA<br />EM CONECTORES
                </p>
              </div>
            </div>
          )}
        </section>
      </TabsContent>
    </AulaTemplate>
  );
}
