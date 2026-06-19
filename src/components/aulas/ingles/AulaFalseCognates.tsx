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
  LuFactory,
  LuGavel,
  LuTrendingUp,
} from "react-icons/lu";

import {
  QUIZ_M1_CLASSICOS,
  QUIZ_M2_INDUSTRIAL,
  QUIZ_M3_MANAGEMENT,
  QUIZ_M4_B2LEVEL,
  QUIZ_M5_BUSINESS_ENGLISH,
  QUIZ_M6_LEGAL,
  QUIZ_M7_ADVANCED,
  QUIZ_M8_CONTRAST,
  QUIZ_M9_CESGRANRIO,
  QUIZ_M10_SIMULADO_MESTRE,
} from "./data/false-cognates-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Os Clássicos (Actually / Eventually / Library / Parents)" },
  { id: "modulo-2", label: "Módulo 2", title: "Industrial Traps (Fabric / Commodity / Schedule / College)" },
  { id: "modulo-3", label: "Módulo 3", title: "Management Traps (Policy / Tax / Legend / Claim)" },
  { id: "modulo-4", label: "Módulo 4", title: "False Friends B2 (Eventual / Pretend / Resume / Sensible)" },
  { id: "modulo-5", label: "Módulo 5", title: "Push vs Pull / Exit — Business English" },
  { id: "modulo-6", label: "Módulo 6", title: "False Cognates em Contratos e Textos Jurídicos" },
  { id: "modulo-7", label: "Módulo 7", title: "Nível Avançado — Nuances e Contexto" },
  { id: "modulo-8", label: "Módulo 8", title: "Revisão por Contrastes (Inglês x Português)" },
  { id: "modulo-9", label: "Módulo 9", title: "False Cognates em Provas CESGRANRIO — Petrobras" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
] as const;

export default function AulaFalseCognates({
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

  useEffect(() => {
    if (onUpdateProgress) {
      const pct = Math.round((completedModules.size / 10) * 100);
      onUpdateProgress(pct);
    }
  }, [completedModules, onUpdateProgress]);

  const [quizM1, setQuizM1] = useState<typeof QUIZ_M1_CLASSICOS>([]);
  const [quizM2, setQuizM2] = useState<typeof QUIZ_M2_INDUSTRIAL>([]);
  const [quizM3, setQuizM3] = useState<typeof QUIZ_M3_MANAGEMENT>([]);
  const [quizM4, setQuizM4] = useState<typeof QUIZ_M4_B2LEVEL>([]);
  const [quizM5, setQuizM5] = useState<typeof QUIZ_M5_BUSINESS_ENGLISH>([]);
  const [quizM6, setQuizM6] = useState<typeof QUIZ_M6_LEGAL>([]);
  const [quizM7, setQuizM7] = useState<typeof QUIZ_M7_ADVANCED>([]);
  const [quizM8, setQuizM8] = useState<typeof QUIZ_M8_CONTRAST>([]);
  const [quizM9, setQuizM9] = useState<typeof QUIZ_M9_CESGRANRIO>([]);
  const [quizFinal, setQuizFinal] = useState<typeof QUIZ_M10_SIMULADO_MESTRE>([]);

  const [hasSyncedInitial, setHasSyncedInitial] = useState(false);

  useEffect(() => {
    if (!hasSyncedInitial && !loading) {
      setQuizM1(getRandomQuestions(QUIZ_M1_CLASSICOS, 8));
      setQuizM2(getRandomQuestions(QUIZ_M2_INDUSTRIAL, 8));
      setQuizM3(getRandomQuestions(QUIZ_M3_MANAGEMENT, 8));
      setQuizM4(getRandomQuestions(QUIZ_M4_B2LEVEL, 8));
      setQuizM5(getRandomQuestions(QUIZ_M5_BUSINESS_ENGLISH, 8));
      setQuizM6(getRandomQuestions(QUIZ_M6_LEGAL, 8));
      setQuizM7(getRandomQuestions(QUIZ_M7_ADVANCED, 8));
      setQuizM8(getRandomQuestions(QUIZ_M8_CONTRAST, 8));
      setQuizM9(getRandomQuestions(QUIZ_M9_CESGRANRIO, 8));
      setQuizFinal(getRandomQuestions(QUIZ_M10_SIMULADO_MESTRE, 8));
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
      titulo={titulo || "False Cognates — As Armadilhas Clássicas do Inglês"}
      descricao={descricao || "Domine 60+ falsos cognatos que CESGRANRIO testa obsessivamente. Contexto Petrobras em cada módulo."}
      duracao={duracao || "12 horas"}
      materiaNome={materiaNome || "Inglês"}
      materiaCor={materiaCor || "from-blue-500 to-cyan-400"}
      materiaId={materiaId || "ingles"}
      modules={MODULE_DEFS}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      completedModules={completedModules}
      onComplete={onComplete}
      isCompleted={isCompleted}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
    >
      {/* ═══ MÓDULO 1 — OS CLÁSSICOS ═══ */}
      <TabsContent value="modulo-1">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            modulo={1}
            titulo="Os Clássicos — Actually, Eventually, Library, Parents"
            icone={<LuBookOpen className="w-8 h-8" />}
            corModulo={mv[1]}
            descricao="Os falsos cognatos mais famosos que derramam candidatos em provas Petrobras"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Os Falsos Cognatos Clássicos"
              description="Palavras que PARECEM significar uma coisa em português, mas significam COMPLETAMENTE outra em inglês"
            />

            <div className="space-y-6 text-xl text-foreground/85 leading-relaxed text-justify">
              <p>
                Os falsos cognatos clássicos são a armadilha número um de candidatos em provas CESGRANRIO. Estas palavras parecem iguais ou muito similares em português e inglês, mas seus significados são radicalmente diferentes. ACTUALLY parece "atualmente" (agora, presente), mas significa "de fato" ou "na verdade" (um qualificador de opinião, não tempo). EVENTUALLY parece "eventualmente" (talvez, possivelmente), mas significa "finalmente" ou "por fim" (após longo tempo, definitivamente, mas depois). LIBRARY parece "livraria" (loja de livros), mas é "biblioteca" (lugar de empréstimo, pesquisa, acervo público). PARENTS parece "pais" (país), mas significa "pais" (pai e mãe, genitor). Estas palavras aparecem em 40-60% das questões de leitura em provas Petrobras porque testam exatamente essa confusão cognitiva.
              </p>

              <p>
                A psicologia por trás disso é fascinante: seu cérebro vê uma palavra que é 80% similar ao português e assume que o significado é também 80% similar. Não é. ACTUALLY em "Actually, I don't agree" não significa "Atualmente, não concordo" (que mudaria completamente o sentido). Significa "Na verdade / De fato, não concordo". O contexto é opinião, não tempo. Quando um texto técnico Petrobras diz "Actually, the system failed due to corrosion", não está dizendo "Agora o sistema falhou" — está dizendo "De fato / Na realidade, o sistema falhou por causa da corrosão". Isto é qualificação de fato, não descrição temporal.
              </p>

              <p>
                EVENTUALLY é igualmente perigoso. "After years of effort, we eventually succeeded" significa "Após anos de esforço, FINALMENTE conseguimos". É resultado após longo tempo. Português "eventualmente" (talvez) não, definitivamente não. Em inglês, "eventually" é certeza + tempo. Vai acontecer, mas vai demorar. "If this trend continues, we will eventually run out of resources" = Se esta tendência continuar, DEFINITIVAMENTE ficaremos sem recursos (mas no futuro). Novamente, não é "eventualmente" (talvez) português.
              </p>

              <p>
                LIBRARY vs BOOKSTORE é confusão de contexto comercial. Uma biblioteca é uma instituição pública onde você EMPRESTA livros (biblioteca = public institution). Uma livraria é uma loja onde você COMPRA livros (bookstore = retail shop). Em português, "biblioteca" e "livraria" existem como conceitos distintos, mas muitos falantes confundem ao traduzir para inglês. "Vou à livraria" = "I'm going to the bookstore" (comprar). "Vou à biblioteca" = "I'm going to the library" (pesquisa/empréstimo). CESGRANRIO testa isto constantemente porque é confusão lógica, não apenas linguística.
              </p>

              <p>
                PARENTS (pais = genitor) é falso cognato fonético, não visual. Soa como "pais" (país), mas é completamente diferente. "My parents are retired" = "Meus pais (genitores) estão aposentados". "Parents" = pai e mãe, genitor, origem. "Pais" (país) em inglês = country ou nation, nunca "parents". Este confunde mais com falantes de outras línguas latinas (espanhol "padres", francês "parents"), e CESGRANRIO gosta de incluir porque testa múltiplas línguas romanças ao mesmo tempo.
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Tabela: Os Clássicos</h4>
                <div className="space-y-3 text-lg">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 border-b pb-2">
                    <div className="font-semibold">Falso Cognato</div>
                    <div className="font-semibold">Português (Errado)</div>
                    <div className="font-semibold">Significado Correto</div>
                    <div className="font-semibold">Contexto Certo</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 border-b pb-2">
                    <div>ACTUALLY</div>
                    <div className="text-red-600">Atualmente (agora)</div>
                    <div className="text-green-600">De fato / Na verdade</div>
                    <div className="text-lg">Qualificação de opinião/fato</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 border-b pb-2">
                    <div>EVENTUALLY</div>
                    <div className="text-red-600">Eventualmente (talvez)</div>
                    <div className="text-green-600">Finalmente / Por fim (após tempo)</div>
                    <div className="text-lg">Resultado após longo tempo</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 border-b pb-2">
                    <div>LIBRARY</div>
                    <div className="text-red-600">Livraria (loja)</div>
                    <div className="text-green-600">Biblioteca (empréstimo/pesquisa)</div>
                    <div className="text-lg">Instituição pública</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <div>PARENTS</div>
                    <div className="text-red-600">Pais (país)</div>
                    <div className="text-green-600">Pais (genitor, pai/mãe)</div>
                    <div className="text-lg">Relação familiar</div>
                  </div>
                </div>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "① Conceituação: Os 4 Clássicos",
                  icone: <LuBookOpen className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-lg leading-relaxed">
                        ACTUALLY = "na verdade", "de fato", "na realidade". Qualificador de pensamento, não marcador de tempo. Use quando você quer dizer "contrário ao que você poderia pensar" ou "a realidade é". "Actually, oil is less dense than water" = "Na verdade, óleo é menos denso que água" (qualificação de fato científico). "Actually, I disagree" = "De fato, não concordo" (qualificação de opinião). NUNCA use para "agora" ou "atualmente". Use "currently", "at present", "these days" para tempo presente.
                      </p>

                      <p className="text-lg leading-relaxed">
                        EVENTUALLY = "finalmente", "por fim", "no fim das contas" (sempre com conotação de tempo longo). Use para descrever um resultado que vai acontecer, mas só após espera considerável. "After months of testing, we eventually found the issue" = "Após meses de teste, FINALMENTE achamos o problema". "If this continues, we will eventually fail" = "Se isto continuar, DEFINITIVAMENTE vamos falhar (mas depois)". Português "eventualmente" = "talvez" (muito fraco). Inglês "eventually" = "certeza, mas tarde".
                      </p>

                      <p className="text-lg leading-relaxed">
                        LIBRARY = "biblioteca", instituição pública para pesquisa, leitura, empréstimo de materiais. Em contexto técnico Petrobras, "technical library" = "biblioteca técnica" (repositório de documentos). "Bookstore" = loja de livros (venda). "The company has a technical library with 5,000 documents" = "A empresa tem uma biblioteca técnica com 5.000 documentos". Biblioteca é PÚBLICA ou INSTITUCIONAL. Livraria (bookstore) é COMERCIAL.
                      </p>

                      <p className="text-lg leading-relaxed">
                        PARENTS = "pais" (genitores, pai e mãe). "My parents work for Petrobras" = "Meus pais trabalham na Petrobras". NUNCA use "parents" para país. País = "country" ou "nation". "Brazil is my country" = "Brasil é meu país" (não "meus pais").
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "② Exemplificação: Contextos Reais Petrobras",
                  icone: <LuPlay className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <p className="font-semibold">1. ACTUALLY em Relatório Técnico</p>
                        <p className="text-lg text-foreground/80 mt-2">
                          "Actually, the corrosion rate is lower than our initial estimate."
                          <span className="block mt-1 text-lg italic">Análise: Qualificação de fato. Realidade contrária à expectativa. NÃO "agora".</span>
                        </p>
                      </div>

                      <div className="border-l-4 border-cyan-500 pl-4">
                        <p className="font-semibold">2. EVENTUALLY em Previsão</p>
                        <p className="text-lg text-foreground/80 mt-2">
                          "If we continue this extraction rate, we will eventually deplete the reservoir."
                          <span className="block mt-1 text-lg italic">Análise: Resultado certo, mas após longo tempo. Definitividade + espera temporal.</span>
                        </p>
                      </div>

                      <div className="border-l-4 border-green-500 pl-4">
                        <p className="font-semibold">3. LIBRARY em Contexto Institucional</p>
                        <p className="text-lg text-foreground/80 mt-2">
                          "Access the technical library to find equipment specifications."
                          <span className="block mt-1 text-lg italic">Análise: Biblioteca técnica = repositório de documentos. NÃO loja (bookstore).</span>
                        </p>
                      </div>

                      <div className="border-l-4 border-amber-500 pl-4">
                        <p className="font-semibold">4. PARENTS em Contexto Familiar</p>
                        <p className="text-lg text-foreground/80 mt-2">
                          "My parents retired from Petrobras after 30 years of service."
                          <span className="block mt-1 text-lg italic">Análise: Pais = pai e mãe. NÃO país (country).</span>
                        </p>
                      </div>

                      <div className="border-l-4 border-purple-500 pl-4">
                        <p className="font-semibold">5. Confusão Perigosa: ACTUALLY + Tempo</p>
                        <p className="text-lg text-foreground/80 mt-2">
                          "❌ Actually, the pressure is rising (agora)" vs "✅ Actually, the pressure is higher than expected"
                          <span className="block mt-1 text-lg italic">Análise: ACTUALLY não marca tempo. Marca qualificação de fato. Se é "agora", use "right now", "currently", "at this moment".</span>
                        </p>
                      </div>

                      <div className="border-l-4 border-red-500 pl-4">
                        <p className="font-semibold">6. Confusão Perigosa: EVENTUALLY + Imediato</p>
                        <p className="text-lg text-foreground/80 mt-2">
                          "❌ We will eventually finish this task today" vs "✅ We will finish this task today"
                          <span className="block mt-1 text-lg italic">Análise: EVENTUALLY implica longo tempo. Se é "hoje", não use EVENTUALLY.</span>
                        </p>
                      </div>

                      <div className="border-l-4 border-pink-500 pl-4">
                        <p className="font-semibold">7. LIBRARY em Contexto Digital</p>
                        <p className="text-lg text-foreground/80 mt-2">
                          "The software includes a component library with 200 reusable modules."
                          <span className="block mt-1 text-lg italic">Análise: "Library" em programação = coleção reutilizável (metáfora de biblioteca).</span>
                        </p>
                      </div>

                      <div className="border-l-4 border-indigo-500 pl-4">
                        <p className="font-semibold">8. Contraste: ACTUALLY vs CURRENTLY</p>
                        <p className="text-lg text-foreground/80 mt-2">
                          "Actually, the system is better than before" (qualificação de fato) vs "Currently, the system is down" (tempo presente).
                          <span className="block mt-1 text-lg italic">Análise: ACTUALLY = opinião/qualificação. CURRENTLY = tempo presente. Use a palavra correta!</span>
                        </p>
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
                          titulo: "ACTUALLY = Qualificador de Fato",
                          descricao: "Se a frase está dizendo 'a realidade é diferente do que você pensa', use ACTUALLY. 'Actually, the cost is lower' = qualificação. NÃO para tempo presente.",
                          exemplo: "✓ Actually, oil floats on water. NOT: Actually, is rising.",
                        },
                        {
                          titulo: "EVENTUALLY = Longo Tempo + Certeza",
                          descricao: "Se há 'after time', 'over years', 'if this continues', use EVENTUALLY. Resultado CERTO, mas DEPOIS. NÃO para ação imediata.",
                          exemplo: "✓ We will eventually run out of resources. NOT: We will eventually finish today.",
                        },
                        {
                          titulo: "LIBRARY = Instituição / Acervo",
                          descricao: "'Library' = lugar de pesquisa/empréstimo. 'Bookstore' = loja. Technical library = repositório de documentos. Public library = acervo público.",
                          exemplo: "✓ The technical library has manuals. NOT: I bought books at the library.",
                        },
                        {
                          titulo: "PARENTS = Genitor (Pai + Mãe)",
                          descricao: "PARENTS = pais (relação familiar). COUNTRY/NATION = país (estado). Se é relação familiar, use PARENTS. Se é estado, use COUNTRY.",
                          exemplo: "✓ My parents work here. NOT: Brazil is my parents.",
                        },
                        {
                          titulo: "Contexto é Chave",
                          descricao: "ACTUALLY vem antes de qualificação de opinião/fato. EVENTUALLY vem com verbos de futuro + tempo. LIBRARY vem com documentos/pesquisa. PARENTS vem com relação familiar.",
                          exemplo: "✓ Reconheça o contexto antes de escolher a palavra.",
                        },
                      ]}
                    />
                  ),
                },
                {
                  titulo: "④ Pegadinhas CESGRANRIO",
                  icone: <LuTriangleAlert className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox
                        tipo="danger"
                        titulo="Pegadilha #1: ACTUALLY com Tempo Presente"
                        descricao="'Actually, the pressure is rising right now' ERRADO? Depende. Se é 'agora neste segundo' = 'Right now' ou 'Currently'. Se é qualificação = 'Actually, the pressure is higher than expected' CORRETO. CESGRANRIO testa exatamente isto."
                      >
                        <ComparisonSide
                          lado1={{ label: "❌ Pegadinha", content: "Actually, the system is failing right now. (Confunde qualificação com tempo)" }}
                          lado2={{ label: "✅ Correto", content: "The system is failing right now. OR Actually, the system has failed." }}
                        />
                      </AlertBox>

                      <AlertBox
                        tipo="danger"
                        titulo="Pegadilha #2: EVENTUALLY com Tempo Imediato"
                        descricao="'We will eventually complete this task by 5 PM' ERRADO. EVENTUALLY implica longo tempo. Se é 'hoje', elimine EVENTUALLY. Teste: 'Por fim' faz sentido? Se sim, EVENTUALLY está certo. Se não, elimine."
                      >
                        <ComparisonSide
                          lado1={{ label: "❌ Pegadinha", content: "We will eventually finish this report today. (Contradição: hoje ≠ longo tempo)" }}
                          lado2={{ label: "✅ Correto", content: "We will finish this report today. OR We will eventually complete the project." }}
                        />
                      </AlertBox>

                      <AlertBox
                        tipo="danger"
                        titulo="Pegadilha #3: LIBRARY como 'Livraria'"
                        descricao="'I bought books at the library' ERRADO. Library = acervo/pesquisa. 'I bought books at the bookstore' CORRETO. Teste: Você EMPRESTA ou COMPRA? Se EMPRESTA = library. Se COMPRA = bookstore."
                      >
                        <ComparisonSide
                          lado1={{ label: "❌ Pegadinha", content: "I went to the library to buy books. (Library = empréstimo, não venda)" }}
                          lado2={{ label: "✅ Correto", content: "I went to the bookstore to buy books. OR I went to the library to borrow books." }}
                        />
                      </AlertBox>

                      <AlertBox
                        tipo="danger"
                        titulo="Pegadilha #4: PARENTS como 'Pais' (País)"
                        descricao="'My parents is a tropical country' ABSURDO, mas CESGRANRIO testa isto. PARENTS = pais (genitor). COUNTRY = país (nação). Se é relação familiar = PARENTS. Se é estado geográfico = COUNTRY."
                      >
                        <ComparisonSide
                          lado1={{ label: "❌ Pegadinha", content: "Brazil is my parents. (Fonético: soa como 'pais', mas é país)" }}
                          lado2={{ label: "✅ Correto", content: "My parents are from Brazil. OR Brazil is my country." }}
                        />
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-lg">Escolha a palavra correta</p>
                    <p className="text-lg">"___, the system is more efficient than before."</p>
                    <p className="text-lg text-foreground/60">(A) Actually (B) Currently</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-lg">
                    <p className="font-semibold text-green-600">✅ ACTUALLY</p>
                    <p>Qualificação de fato. "Na verdade" o sistema é mais eficiente (opinião/qualificação). CURRENTLY = tempo presente agora.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-lg">Escolha a palavra correta</p>
                    <p className="text-lg">"After years, we will ___ find the solution."</p>
                    <p className="text-lg text-foreground/60">(A) eventually (B) actually</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-lg">
                    <p className="font-semibold text-green-600">✅ EVENTUALLY</p>
                    <p>"After years" = longo tempo. EVENTUALLY = finalmente após espera. ACTUALLY = qualificação, não tempo.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-lg">Escolha a palavra correta</p>
                    <p className="text-lg">"I borrowed books from the ___."</p>
                    <p className="text-lg text-foreground/60">(A) library (B) bookstore</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-lg">
                    <p className="font-semibold text-green-600">✅ LIBRARY</p>
                    <p>BORROWED = empréstimo = library. Se fosse BOUGHT (comprou) = bookstore. Library = pesquisa/empréstimo.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-lg">Escolha a palavra correta</p>
                    <p className="text-lg">"My ___ work in the energy sector."</p>
                    <p className="text-lg text-foreground/60">(A) parents (B) country</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-lg">
                    <p className="font-semibold text-green-600">✅ PARENTS</p>
                    <p>Relação familiar = PARENTS. COUNTRY = país (nação). "My parents" = meu pai e minha mãe.</p>
                  </div>
                }
              />
            </div>
          </section>
<QuizInterativo
            questoes={quizM1}
            numero={2}
            onComplete={() => handleModuleComplete("modulo-1")}
          />
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 2 — INDUSTRIAL TRAPS ═══ */}
      <TabsContent value="modulo-2">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            modulo={2}
            titulo="Industrial Traps — Fabric, Commodity, Schedule, College"
            icone={<LuFactory className="w-8 h-8" />}
            corModulo={mv[2]}
            descricao="Falsos cognatos específicos de contexto técnico e industrial Petrobras"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Falsos Cognatos em Contexto Industrial"
              description="Palavras que enganam especialmente em relatórios técnicos, especificações e textos gerenciais"
            />

            <div className="space-y-6 text-xl text-foreground/85 leading-relaxed text-justify">
              <p>
                Contexto industrial traz um conjunto diferente de falsos cognatos. FABRIC parece "fábrica" (lugar de manufatura), mas significa "tecido" (material têxtil) OU "estrutura/componentes" em contexto técnico. Uma fábrica em inglês = "factory" (lugar onde se fabrica). FABRIC = tecido (têxtil, roupa) ou metaforicamente "estrutura" ("the fabric of society" = a estrutura da sociedade). Em um manual Petrobras, "equipment fabric" NUNCA significa "tecido do equipamento" — pode significar "estrutura do equipamento" (componentes, arquitetura). Esta confusão acontece porque português "fábrica" soa like "fabric", mas significados divergem completamente.
              </p>

              <p>
                COMMODITY é palavra crítica em contexto Petrobras. Parece "comodidade" (conforto, facilidade), mas significa "bem comercial padronizado" (produto que pode ser vendido/comprado em mercado — oil, gas, gold, wheat são commodities clássicas). Comodidade em inglês = "comfort". Commodity = "produto de troca" (mercadoria-padrão). "Crude oil is a commodity" = Petróleo bruto é um bem comercial (pode ser vendido/comprado em bolsa). "Commodity prices fluctuate" = Preços de bens comerciais (commodities) flutuam. Isto é ABSOLUTAMENTE CRÍTICO em provas Petrobras porque óleo é commodity-número-um.
              </p>

              <p>
                SCHEDULE em contexto técnico é "cronograma" (plano de tempo para ações futuras) OU "agenda" (lista de coisas a fazer). Em português, "schedule" parece "agendar", mas em inglês é mais formal e planejado. "Schedule the maintenance" = coloque a manutenção no cronograma (planejamento futuro formal). Em documentos técnicos, "maintenance schedule" = "cronograma de manutenção" (plano futuro). "Boost the schedule" = acelerar o cronograma (mudar datas de atividades planejadas). Isto é confuso porque "agendar" em português é mais casual, enquanto "schedule" é formal/oficial.
              </p>

              <p>
                COLLEGE varia por país. USA: college = universidade (educação superior, undergrad). UK: college = parte de universidade (subdivisiào de faculdade maior). Em contexto CESGRANRIO/Petrobras, college = "instituição de ensino superior" (qualquer universidade/faculdade). "College degree" = grau/diploma de faculdade. "Community college" = faculdade comunitária (USA). A confusão portuguesa é rara porque "college" é empréstimo direto, mas contexto importa: college ≠ universidade genérica, é específico de instituição de educação superior.
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Tabela: Industrial Traps</h4>
                <div className="space-y-3 text-lg">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 border-b pb-2">
                    <div className="font-semibold">Falso Cognato</div>
                    <div className="font-semibold">Português (Errado)</div>
                    <div className="font-semibold">Significado Correto</div>
                    <div className="font-semibold">Contexto Certo</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 border-b pb-2">
                    <div>FABRIC</div>
                    <div className="text-red-600">Fábrica (lugar)</div>
                    <div className="text-green-600">Tecido / Estrutura</div>
                    <div className="text-lg">Material têxtil ou arquitetura</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 border-b pb-2">
                    <div>COMMODITY</div>
                    <div className="text-red-600">Comodidade (conforto)</div>
                    <div className="text-green-600">Bem comercial padronizado</div>
                    <div className="text-lg">Produto de bolsa (óleo, ouro)</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 border-b pb-2">
                    <div>SCHEDULE</div>
                    <div className="text-red-600">Agendar (casual)</div>
                    <div className="text-green-600">Cronograma / Agenda formal</div>
                    <div className="text-lg">Planejamento futuro oficial</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <div>COLLEGE</div>
                    <div className="text-red-600">Faculdade genérica</div>
                    <div className="text-green-600">Instituição de educação superior</div>
                    <div className="text-lg">Universidade / Faculdade</div>
                  </div>
                </div>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "① Conceituação: Industrial Vocabulary",
                  icone: <LuBookOpen className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-lg leading-relaxed">
                        FABRIC: (1) Tecido, material têxtil (cloth, material). "The fabric of the cloth is cotton." = "O tecido do pano é algodão." (2) Estrutura, composição (metafórico). "The fabric of the system is stable." = "A estrutura do sistema é estável." Em contextos industriais, fabric frequentemente refere-se a estrutura/componentes, não material têxtil. "Equipment fabric" = estrutura do equipamento (como está montado, quais componentes). NUNCA = tecido do equipamento (não faz sentido).
                      </p>

                      <p className="text-lg leading-relaxed">
                        COMMODITY: Bem comercial padronizado que pode ser negociado em mercado. Crude oil = commodity. Natural gas = commodity. Gold = commodity. Características: (1) Padronizado (toda unidade é igual). (2) Negociável em bolsa. (3) Preço varia com oferta/demanda global. "Oil commodity prices hit $100/barrel" = "Preços de óleo atingem $100/barril". Commodity NÃO = comodidade (conforto). Commodity = "produto de negócio" (mercadoria-padrão).
                      </p>

                      <p className="text-lg leading-relaxed">
                        SCHEDULE: (1) Cronograma, plano de atividades futuras (timeline formal). "The project schedule includes 5 phases." = "O cronograma do projeto inclui 5 fases." (2) Agenda, lista de eventos/tarefas. "The maintenance schedule shows maintenance dates." = "A agenda de manutenção mostra datas de manutenção." SCHEDULE é FORMAL e PLANEJADO. "Book an appointment" = casual. "Schedule an appointment" = formal/oficial. Em contextos Petrobras, sempre formal.
                      </p>

                      <p className="text-lg leading-relaxed">
                        COLLEGE: Instituição de educação superior (universidade, faculdade, academy). "She graduated from college." = "Ela se formou na faculdade/universidade." COLLEGE pode ser 4-year university (USA) ou divisão de universidade maior (UK). Em qualquer contexto, refere-se a educação pós-high-school. Não confunda com "university" genérica ou "school" (antes do college).
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "② Exemplificação: Textos Técnicos Petrobras",
                  icone: <LuPlay className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <p className="font-semibold">1. FABRIC em Contexto Técnico</p>
                        <p className="text-lg text-foreground/80 mt-2">
                          "The structural fabric of the compressor withstood extreme pressure."
                          <span className="block mt-1 text-lg italic">Análise: FABRIC = estrutura (componentes do compressor). NÃO = tecido.</span>
                        </p>
                      </div>

                      <div className="border-l-4 border-cyan-500 pl-4">
                        <p className="font-semibold">2. COMMODITY em Contexto Econômico</p>
                        <p className="text-lg text-foreground/80 mt-2">
                          "Crude oil remains the primary commodity driving global markets."
                          <span className="block mt-1 text-lg italic">Análise: COMMODITY = bem comercial padronizado. NÃO comodidade (conforto).</span>
                        </p>
                      </div>

                      <div className="border-l-4 border-green-500 pl-4">
                        <p className="font-semibold">3. SCHEDULE em Planejamento</p>
                        <p className="text-lg text-foreground/80 mt-2">
                          "The maintenance schedule includes quarterly inspections."
                          <span className="block mt-1 text-lg italic">Análise: SCHEDULE = cronograma de atividades planejadas. Formal e oficial.</span>
                        </p>
                      </div>

                      <div className="border-l-4 border-amber-500 pl-4">
                        <p className="font-semibold">4. COLLEGE em Contexto Educacional</p>
                        <p className="text-lg text-foreground/80 mt-2">
                          "He received his petroleum engineering degree from college."
                          <span className="block mt-1 text-lg italic">Análise: COLLEGE = faculdade (instituição educação superior).</span>
                        </p>
                      </div>

                      <div className="border-l-4 border-purple-500 pl-4">
                        <p className="font-semibold">5. Confusão: FABRIC vs FACTORY</p>
                        <p className="text-lg text-foreground/80 mt-2">
                          "❌ The fabric produced 1,000 units" vs "✅ The factory produced 1,000 units"
                          <span className="block mt-1 text-lg italic">Análise: FABRIC = material/estrutura. FACTORY = lugar de produção. FACTORY é o lugar onde se fabrica.</span>
                        </p>
                      </div>

                      <div className="border-l-4 border-red-500 pl-4">
                        <p className="font-semibold">6. Confusão: COMMODITY vs COMFORT</p>
                        <p className="text-lg text-foreground/80 mt-2">
                          "❌ Oil is a comfort product" vs "✅ Oil is a commodity product"
                          <span className="block mt-1 text-lg italic">Análise: COMMODITY = bem comercial (negociável). COMFORT = comodidade (conforto físico).</span>
                        </p>
                      </div>

                      <div className="border-l-4 border-pink-500 pl-4">
                        <p className="font-semibold">7. SCHEDULE em Urgência</p>
                        <p className="text-lg text-foreground/80 mt-2">
                          "We need to accelerate the schedule by 2 weeks."
                          <span className="block mt-1 text-lg italic">Análise: SCHEDULE = cronograma. ACCELERATE = mudar datas planejadas (adiantar).</span>
                        </p>
                      </div>

                      <div className="border-l-4 border-indigo-500 pl-4">
                        <p className="font-semibold">8. FABRIC em Arquitetura</p>
                        <p className="text-lg text-foreground/80 mt-2">
                          "The fabric of the organization is built on trust."
                          <span className="block mt-1 text-lg italic">Análise: FABRIC metafórico = estrutura (valores, componentes).</span>
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "③ CardCarousel: Dicas Industriais",
                  icone: <LuLightbulb className="w-5 h-5" />,
                  conteudo: (
                    <CardCarousel
                      cards={[
                        {
                          titulo: "FABRIC = Tecido OU Estrutura",
                          descricao: "Se é material têxtil = fabric (cloth, cotton). Se é estrutura/componentes = fabric (architecture). Em Petrobras = estrutura. Factory = lugar (fábrica).",
                          exemplo: "✓ Equipment fabric (estrutura). Textile fabric (tecido).",
                        },
                        {
                          titulo: "COMMODITY = Bem Comercial",
                          descricao: "Produto padronizado negociável em bolsa. Oil, gas, gold = commodities. NÃO = comodidade (comfort). Commodity = mercadoria-padrão.",
                          exemplo: "✓ Oil is a commodity. NOT: Oil is a commodity for comfort.",
                        },
                        {
                          titulo: "SCHEDULE = Cronograma Formal",
                          descricao: "Plano de atividades futuras (formal). 'Schedule the meeting' = agende (formal). 'Book the meeting' = reserve (casual). Em Petrobras sempre SCHEDULE.",
                          exemplo: "✓ Maintenance schedule (cronograma). Boost the schedule (adiantar cronograma).",
                        },
                        {
                          titulo: "COLLEGE = Educação Superior",
                          descricao: "Instituição de educação pós-high school. 'Community college' = faculdade comunitária. 'College degree' = diploma de faculdade.",
                          exemplo: "✓ She attended college. NOT: She attended university college.",
                        },
                        {
                          titulo: "Contexto Industrial: Sempre Formal",
                          descricao: "Em relatórios, manuais e textos Petrobras: SCHEDULE é cronograma (não agendar casual), COMMODITY é bem-comercial (não conforto), FABRIC é estrutura (não têxtil).",
                          exemplo: "✓ Técnico = formal. SCHEDULE, COMMODITY sempre formais.",
                        },
                      ]}
                    />
                  ),
                },
                {
                  titulo: "④ Pegadinhas Industriais CESGRANRIO",
                  icone: <LuTriangleAlert className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox
                        tipo="danger"
                        titulo="Pegadilha #1: FABRIC vs FACTORY"
                        descricao="'The fabric produced 1,000 units in Q3.' ERRADO. FABRIC = material/estrutura. FACTORY = lugar de produção. Se fala de produção = FACTORY. Se fala de estrutura/material = FABRIC."
                      >
                        <ComparisonSide
                          lado1={{ label: "❌ ERRADO", content: "The fabric produced goods. The equipment is made of factory." }}
                          lado2={{ label: "✅ CORRETO", content: "The factory produced goods. The equipment is made of fabric." }}
                        />
                      </AlertBox>

                      <AlertBox
                        tipo="danger"
                        titulo="Pegadilha #2: COMMODITY como Conforto"
                        descricao="'Oil provides comfort' ERRADO se quer dizer 'commodity'. COMMODITY = bem comercial padronizado. COMFORT = comodidade (facilidade física). Oil é commodity, não comfort."
                      >
                        <ComparisonSide
                          lado1={{ label: "❌ ERRADO", content: "Oil is a commodity for comfort. Gas prices reduce the commodity." }}
                          lado2={{ label: "✅ CORRETO", content: "Oil is a commodity. Commodity prices fluctuate." }}
                        />
                      </AlertBox>

                      <AlertBox
                        tipo="danger"
                        titulo="Pegadilha #3: SCHEDULE Casual vs Formal"
                        descricao="'I schedule a meeting' = formal/oficial. 'I book a table' = casual/reserva. CESGRANRIO testa contexto: se é formal (Petrobras) = SCHEDULE. Se é casual = BOOK ou ARRANGE."
                      >
                        <ComparisonSide
                          lado1={{ label: "❌ Casual demais", content: "Let me book your maintenance. (Informal para contexto oficial)" }}
                          lado2={{ label: "✅ Formal/Oficial", content: "Let me schedule your maintenance. (Cronograma oficial)" }}
                        />
                      </AlertBox>

                      <AlertBox
                        tipo="danger"
                        titulo="Pegadilha #4: COLLEGE vs UNIVERSITY"
                        descricao="COLLEGE = instituição específica de educação superior (USA undergrad ou UK divisão). UNIVERSITY = instituição genérica maior. 'She attended college' ≠ 'She attended university' (contextos diferentes)."
                      >
                        <ComparisonSide
                          lado1={{ label: "USA COLLEGE", content: "Community college (2 anos). College degree (undergrad)." }}
                          lado2={{ label: "UK COLLEGE", content: "Oxford's Trinity College (divisão). University = Oxford." }}
                        />
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-lg">Qual é correto?</p>
                    <p className="text-lg">"The ___ produced 5,000 barrels daily."</p>
                    <p className="text-lg text-foreground/60">(A) fabric (B) factory</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-lg">
                    <p className="font-semibold text-green-600">✅ FACTORY</p>
                    <p>FACTORY = lugar de produção. FABRIC = material/estrutura. Produção acontece em factory.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-lg">Qual é correto?</p>
                    <p className="text-lg">"Oil prices are rising because oil is a ___."</p>
                    <p className="text-lg text-foreground/60">(A) commodity (B) comfort</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-lg">
                    <p className="font-semibold text-green-600">✅ COMMODITY</p>
                    <p>COMMODITY = bem comercial (negociável em bolsa, preço varia). COMFORT = conforto (não negociável).</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-lg">Qual é correto?</p>
                    <p className="text-lg">"We must ___ the maintenance for next month."</p>
                    <p className="text-lg text-foreground/60">(A) schedule (B) book</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-lg">
                    <p className="font-semibold text-green-600">✅ SCHEDULE (depende do contexto)</p>
                    <p>SCHEDULE = formal/cronograma (Petrobras). BOOK = casual/reserva (restaurante). Em contexto técnico, SCHEDULE.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-lg">Qual é correto?</p>
                    <p className="text-lg">"She graduated from ___ with an engineering degree."</p>
                    <p className="text-lg text-foreground/60">(A) college (B) university</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-lg">
                    <p className="font-semibold text-green-600">✅ COLLEGE (em contexto USA)</p>
                    <p>COLLEGE = instituição educação superior (undergrad USA). UNIVERSITY = genérico. Ambos podem estar certos dependendo contexto.</p>
                  </div>
                }
              />
            </div>
          </section>
<QuizInterativo
            questoes={quizM2}
            numero={2}
            onComplete={() => handleModuleComplete("modulo-2")}
          />
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 3 — MANAGEMENT TRAPS ═══ */}
      <TabsContent value="modulo-3">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            modulo={3}
            titulo="Management Traps — Policy, Tax, Legend, Claim"
            icone={<LuGraduationCap className="w-8 h-8" />}
            corModulo={mv[3]}
            descricao="Falsos cognatos em contexto gerencial e administrativo"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Falsos Cognatos em Management"
              description="Palavras críticas em documentos gerenciais, políticas corporativas e textos administrativos"
            />

            <div className="space-y-6 text-xl text-foreground/85 leading-relaxed text-justify">
              <p>
                Management Petrobras tem seu próprio conjunto de falsos cognatos. POLICY em "Company policy" é "política da empresa" (norma/regra corporativa), NÃO política de governo. Politics = governo/eleições. Policy = norma/regra (corporate policy = norma da empresa). "Compliance policy" = "política de conformidade" (regra de conformidade). Confusão comum: português "política" pode ser governo OU regra corporativa, mas em inglês POLICY = regra corporativa exclusivamente. Governo/eleição = POLITICS (sempre plural).
              </p>

              <p>
                TAX é "imposto" (fiscal), NÃO "taxa" (rate de juros/variação) ou "tarifa" (import duty). RATE = taxa (taxa de juros, taxa de crescimento). TARIFF = tarifa (imposto de importação). TAX = imposto direto (income tax, corporate tax, sales tax). "Sales tax" = imposto sobre vendas (Brasil = ICMS). "Income tax" = imposto de renda. "The tax rate is 25%" = "A alíquota do imposto é 25%". Confusão comum: "taxa" português pode ser "tax" OU "rate", mas em inglês precisa ser específico.
              </p>

              <p>
                LEGEND em gráficos/mapas é "legenda" (explicação de símbolos). Em contexto de fama é "lenda" (pessoa lendária). "The map's legend explains the symbols" = "A legenda do mapa explica os símbolos" (não lenda). "He became a legend in petroleum engineering" = "Ele se tornou uma lenda (pessoa lendária) na engenharia de petróleo". Confusão: português "legenda" é visual (mapa/gráfico), enquanto "lenda" é história/fama. Em inglês, LEGEND cobre ambas (depende contexto).
              </p>

              <p>
                CLAIM é "reivindicar" OU "alegar" (fazer uma alegação), NÃO "clamar" (chamar, invocar) OU "reclamação" (complaint). "The company claims to be carbon-neutral" = "A empresa ALEGA/RECLAMA ser neutra em carbono" (não é fato comprovado, é reivindicação). "Insurance claim" = "reivindicação de seguro" (pedido de pagamento). "File a claim" = "apresentar uma reivindicação" (de direito). Confusão: português "reclamação" = complaint (queixa), não "claim". CLAIM = alegação/reivindicação. COMPLAINT = queixa/reclamação.
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Tabela: Management Traps</h4>
                <div className="space-y-3 text-lg">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 border-b pb-2">
                    <div className="font-semibold">Falso Cognato</div>
                    <div className="font-semibold">Português (Errado)</div>
                    <div className="font-semibold">Significado Correto</div>
                    <div className="font-semibold">Contexto Certo</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 border-b pb-2">
                    <div>POLICY</div>
                    <div className="text-red-600">Política (governo)</div>
                    <div className="text-green-600">Política / Norma corporativa</div>
                    <div className="text-lg">Regra da empresa (não governo)</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 border-b pb-2">
                    <div>TAX</div>
                    <div className="text-red-600">Taxa (de juros/crescimento)</div>
                    <div className="text-green-600">Imposto (fiscal)</div>
                    <div className="text-lg">Imposto direto (income, sales)</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 border-b pb-2">
                    <div>LEGEND</div>
                    <div className="text-red-600">Lenda (pessoa famosa)</div>
                    <div className="text-green-600">Legenda (gráfico/mapa) OU Lenda</div>
                    <div className="text-lg">Explicação visual OU fama</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <div>CLAIM</div>
                    <div className="text-red-600">Reclamação (queixa)</div>
                    <div className="text-green-600">Reivindicação / Alegação</div>
                    <div className="text-lg">Direito / Alegação (não queixa)</div>
                  </div>
                </div>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "① Conceituação: Management Vocabulary",
                  icone: <LuBookOpen className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-lg leading-relaxed">
                        POLICY: Norma, regra, procedimento estabelecido por uma organização. "Company policy forbids smoking in the office" = "A política da empresa proíbe fumar no escritório". POLITICS = governo, sistema eleitoral, eleições. "He works in politics" = "Ele trabalha em política (governo)". Em contextos corporativos Petrobras, sempre POLICY (norma da empresa). NEVER use POLITICS para regra corporativa.
                      </p>

                      <p className="text-lg leading-relaxed">
                        TAX: Imposto governamental. "Income tax" = imposto de renda. "Corporate tax" = imposto corporativo. "Sales tax" = imposto sobre vendas. RATE = taxa (taxa de juros, taxa de crescimento, taxa de desemprego). "Interest rate" = taxa de juros. "Growth rate" = taxa de crescimento. TARIFF = tarifa/imposto de importação. "Import tariff" = tarifa de importação. Em relatórios Petrobras, identifique: é imposto = TAX, é percentual de variação = RATE, é imposto de importação = TARIFF.
                      </p>

                      <p className="text-lg leading-relaxed">
                        LEGEND: (1) Legenda, explicação de símbolos em mapa/gráfico/tabela. "Refer to the legend for color meanings" = "Refira-se à legenda para significados de cores". (2) Lenda, pessoa lendária/famosa (menos comum). "He is a legend in engineering" = "Ele é uma lenda em engenharia". Em documentos técnicos, quase sempre significado (1) legenda/explicação visual.
                      </p>

                      <p className="text-lg leading-relaxed">
                        CLAIM: (1) Reivindicação, alegação (pedido de direito ou afirmação não comprovada). "The company claims to reduce emissions by 50%" = "A empresa ALEGA/RECLAMA reduzir emissões 50%". (2) Insurance claim = reivindicação de seguro (pedido de pagamento). "File a claim" = "apresentar uma reivindicação". COMPLAINT = queixa, reclamação negativa. "File a complaint" = "apresentar uma queixa/reclamação" (negativa). CLAIM = reivindicação (direito). COMPLAINT = reclamação (insatisfação).
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "② Exemplificação: Documentos Gerenciais",
                  icone: <LuPlay className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <p className="font-semibold">1. POLICY em Documento Corporativo</p>
                        <p className="text-lg text-foreground/80 mt-2">
                          "According to company policy, all employees must wear safety equipment."
                          <span className="block mt-1 text-lg italic">Análise: POLICY = norma da empresa. NÃO política (governo).</span>
                        </p>
                      </div>

                      <div className="border-l-4 border-cyan-500 pl-4">
                        <p className="font-semibold">2. TAX em Relatório Financeiro</p>
                        <p className="text-lg text-foreground/80 mt-2">
                          "The company paid $50 million in federal income tax."
                          <span className="block mt-1 text-lg italic">Análise: TAX = imposto de renda. NÃO taxa (rate).</span>
                        </p>
                      </div>

                      <div className="border-l-4 border-green-500 pl-4">
                        <p className="font-semibold">3. LEGEND em Gráfico Técnico</p>
                        <p className="text-lg text-foreground/80 mt-2">
                          "Refer to the legend at the bottom to understand the pressure measurements."
                          <span className="block mt-1 text-lg italic">Análise: LEGEND = explicação visual do gráfico. NÃO lenda (pessoa).</span>
                        </p>
                      </div>

                      <div className="border-l-4 border-amber-500 pl-4">
                        <p className="font-semibold">4. CLAIM em Documento de Reivindicação</p>
                        <p className="text-lg text-foreground/80 mt-2">
                          "The insurance claim was approved for $100,000 in damages."
                          <span className="block mt-1 text-lg italic">Análise: CLAIM = reivindicação (direito). NÃO reclamação (queixa).</span>
                        </p>
                      </div>

                      <div className="border-l-4 border-purple-500 pl-4">
                        <p className="font-semibold">5. Confusão: POLICY vs POLITICS</p>
                        <p className="text-lg text-foreground/80 mt-2">
                          "❌ Government policy vs ✅ Government politics (eleições/governo)"
                          <span className="block mt-1 text-lg italic">Análise: POLICY = norma (seja governo ou empresa). POLITICS = governo/eleições (sempre plural).</span>
                        </p>
                      </div>

                      <div className="border-l-4 border-red-500 pl-4">
                        <p className="font-semibold">6. Confusão: TAX vs RATE vs TARIFF</p>
                        <p className="text-lg text-foreground/80 mt-2">
                          "Income tax" (imposto) vs "Growth rate" (taxa) vs "Import tariff" (tarifa)
                          <span className="block mt-1 text-lg italic">Análise: TAX = imposto direto. RATE = percentual variação. TARIFF = imposto importação.</span>
                        </p>
                      </div>

                      <div className="border-l-4 border-pink-500 pl-4">
                        <p className="font-semibold">7. CLAIM em Contexto de Negócio</p>
                        <p className="text-lg text-foreground/80 mt-2">
                          "The company's claim of zero emissions is disputed by environmental groups."
                          <span className="block mt-1 text-lg italic">Análise: CLAIM = alegação (afirmação não comprovada). NÃO reclamação negativa (complaint).</span>
                        </p>
                      </div>

                      <div className="border-l-4 border-indigo-500 pl-4">
                        <p className="font-semibold">8. LEGEND em Mapa Geológico</p>
                        <p className="text-lg text-foreground/80 mt-2">
                          "The geological map's legend identifies rock formations by color."
                          <span className="block mt-1 text-lg italic">Análise: LEGEND = explicação de cores/símbolos. Parte essencial de mapa/gráfico.</span>
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "③ CardCarousel: Dicas Gerenciais",
                  icone: <LuLightbulb className="w-5 h-5" />,
                  conteudo: (
                    <CardCarousel
                      cards={[
                        {
                          titulo: "POLICY = Norma Corporativa",
                          descricao: "Company policy = norma da empresa (não governo). POLITICS = governo/eleições. 'Safety policy' = norma segurança. 'Government policies' = políticas públicas (ambiguidade: pode ser normas ou governo).",
                          exemplo: "✓ Company policy forbids X. NOT: Company politics forbids.",
                        },
                        {
                          titulo: "TAX vs RATE vs TARIFF",
                          descricao: "TAX = imposto direto (income, corporate, sales). RATE = taxa percentual (juros, crescimento). TARIFF = imposto importação. Cada um é específico.",
                          exemplo: "✓ Income tax, interest rate, import tariff (cada um diferente).",
                        },
                        {
                          titulo: "LEGEND = Explicação Visual",
                          descricao: "LEGEND = legenda de mapa/gráfico (explicação de símbolos/cores). Também pode = pessoa lendária (contexto raro). Em documentos técnicos = sempre legenda visual.",
                          exemplo: "✓ Map legend explains symbols. NOT: The legend is wrong.",
                        },
                        {
                          titulo: "CLAIM = Reivindicação/Alegação",
                          descricao: "CLAIM = reivindicação (direito) ou alegação (afirmação). COMPLAINT = queixa/reclamação (negativa). 'File a claim' = reivindicação. 'File a complaint' = queixa.",
                          exemplo: "✓ Insurance claim (reivindicação). Customer complaint (queixa).",
                        },
                        {
                          titulo: "Contexto Corporativo Petrobras",
                          descricao: "Em documentos gerenciais: POLICY = norma, TAX = imposto, LEGEND = legenda visual, CLAIM = reivindicação. Todos são contexto formal corporativo.",
                          exemplo: "✓ Sempre contexto formal/administrativo. Sem ambiguidades.",
                        },
                      ]}
                    />
                  ),
                },
                {
                  titulo: "④ Pegadinhas Gerenciais CESGRANRIO",
                  icone: <LuTriangleAlert className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox
                        tipo="danger"
                        titulo="Pegadilha #1: POLICY vs POLITICS"
                        descricao="'Company politics forbids smoking' ERRADO. POLICY = norma (empresa OU governo). POLITICS = governo/eleições (sempre plural). Se é norma corporativa = POLICY. Se é governo/eleição = POLITICS."
                      >
                        <ComparisonSide
                          lado1={{ label: "❌ ERRADO", content: "Company politics forbids smoking. The government policy works." }}
                          lado2={{ label: "✅ CORRETO", content: "Company policy forbids smoking. Government politics (eleições). Government policies (normas públicas)." }}
                        />
                      </AlertBox>

                      <AlertBox
                        tipo="danger"
                        titulo="Pegadilha #2: TAX, RATE, TARIFF (Confusão 3-vias)"
                        descricao="'Sales rate' ERRADO se quer dizer imposto sobre vendas (é SALES TAX). 'Income tariff' ERRADO se quer dizer imposto de renda (é INCOME TAX). Cada termo tem contexto específico."
                      >
                        <ComparisonSide
                          lado1={{ label: "❌ ERRADO", content: "Sales rate (sales tax). Import tax (import tariff). Interest tax (interest rate)." }}
                          lado2={{ label: "✅ CORRETO", content: "Sales tax. Import tariff. Interest rate." }}
                        />
                      </AlertBox>

                      <AlertBox
                        tipo="danger"
                        titulo="Pegadilha #3: LEGEND como Pessoa Lendária"
                        descricao="'The legend of the map' = legenda (visual). 'He is a legend' = lenda/pessoa famosa. Ambigüidade intencional: CESGRANRIO oferece ambas opções, candidato precisa usar contexto."
                      >
                        <ComparisonSide
                          lado1={{ label: "Legenda Visual", content: "Map legend (explicação de símbolos). Chart legend (key)." }}
                          lado2={{ label: "Pessoa Lendária", content: "He became a legend (pessoa famosa). A legend in engineering (especialista famoso)." }}
                        />
                      </AlertBox>

                      <AlertBox
                        tipo="danger"
                        titulo="Pegadilha #4: CLAIM vs COMPLAINT"
                        descricao="'The customer filed a claim' = reivindicação (direito). 'The customer filed a complaint' = queixa (reclamação). CESGRANRIO oferece ambas como opções, candidato precisa saber diferença."
                      >
                        <ComparisonSide
                          lado1={{ label: "CLAIM (Reivindicação)", content: "Insurance claim (pedido de pagamento). File a claim (solicitar direito)." }}
                          lado2={{ label: "COMPLAINT (Queixa)", content: "Customer complaint (queixa negativa). File a complaint (insatisfação)." }}
                        />
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-lg">Qual é correto?</p>
                    <p className="text-lg">"According to company ___, all employees..."</p>
                    <p className="text-lg text-foreground/60">(A) policy (B) politics</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-lg">
                    <p className="font-semibold text-green-600">✅ POLICY</p>
                    <p>POLICY = norma da empresa. POLITICS = governo/eleições. "Company policy" é obrigatório.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-lg">Qual é correto?</p>
                    <p className="text-lg">"The company paid 25% ___."</p>
                    <p className="text-lg text-foreground/60">(A) tax (B) rate</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-lg">
                    <p className="font-semibold text-green-600">✅ TAX (depende)</p>
                    <p>Se é "25% imposto" = TAX. Se é "taxa de juros 25%" = RATE. Contexto importa.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-lg">Qual é correto?</p>
                    <p className="text-lg">"Check the ___ for color meanings."</p>
                    <p className="text-lg text-foreground/60">(A) legend (B) story</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-lg">
                    <p className="font-semibold text-green-600">✅ LEGEND</p>
                    <p>LEGEND (legenda) = explicação visual. STORY = história (não visual). Em gráficos/mapas, sempre LEGEND.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-lg">Qual é correto?</p>
                    <p className="text-lg">"The customer filed a ___."</p>
                    <p className="text-lg text-foreground/60">(A) claim (B) complaint</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-lg">
                    <p className="font-semibold text-green-600">✅ Ambos possíveis!</p>
                    <p>CLAIM = reivindicação (direito). COMPLAINT = queixa (insatisfação). Contexto determina qual.</p>
                  </div>
                }
              />
            </div>
          </section>
<QuizInterativo
            questoes={quizM3}
            numero={2}
            onComplete={() => handleModuleComplete("modulo-3")}
          />
        </div>
      </TabsContent>

      {/* ═══ MÓDULOS 4-10 (Stub Structures) ═══ */}
      <TabsContent value="modulo-4">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            modulo={4}
            titulo="False Friends B2 Level"
            icone={<LuZap className="w-8 h-8" />}
            corModulo={mv[4]}
            descricao="Falsos cognatos nível B2 — mais sutis e contextuais"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm">
            <div className="text-center text-foreground/60">
              <p>Módulo 4: Eventual, Pretend, Resume, Sensible (Em Desenvolvimento)</p>
              <p className="text-lg mt-2">Quiz disponível abaixo para praticar</p>
            </div>
          </section>
<QuizInterativo
            questoes={quizM4}
            numero={1}
            onComplete={() => handleModuleComplete("modulo-4")}
          />
        </div>
      </TabsContent>

      <TabsContent value="modulo-5">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            modulo={5}
            titulo="Push vs Pull / Exit — Business English"
            icone={<LuTrendingUp className="w-8 h-8" />}
            corModulo={mv[5]}
            descricao="Estratégias opostas e vocabulário de negócios"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm">
            <div className="text-center text-foreground/60">
              <p>Módulo 5: Push vs Pull, Exit Strategy (Em Desenvolvimento)</p>
              <p className="text-lg mt-2">Quiz disponível abaixo para praticar</p>
            </div>
          </section>
<QuizInterativo
            questoes={quizM5}
            numero={1}
            onComplete={() => handleModuleComplete("modulo-5")}
          />
        </div>
      </TabsContent>

      <TabsContent value="modulo-6">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            modulo={6}
            titulo="False Cognates em Contratos e Textos Jurídicos"
            icone={<LuGavel className="w-8 h-8" />}
            corModulo={mv[6]}
            descricao="Lease, Lien, Assess, Waive em contextos legais"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm">
            <div className="text-center text-foreground/60">
              <p>Módulo 6: Termos Legais e Contratuais (Em Desenvolvimento)</p>
              <p className="text-lg mt-2">Quiz disponível abaixo para praticar</p>
            </div>
          </section>
<QuizInterativo
            questoes={quizM6}
            numero={1}
            onComplete={() => handleModuleComplete("modulo-6")}
          />
        </div>
      </TabsContent>

      <TabsContent value="modulo-7">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            modulo={7}
            titulo="Nível Avançado — Nuances e Contexto"
            icone={<LuLightbulb className="w-8 h-8" />}
            corModulo={mv[7]}
            descricao="Actual, Prove, Engage, Billion — sutilezas de contexto"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm">
            <div className="text-center text-foreground/60">
              <p>Módulo 7: Nuances B2+ (Em Desenvolvimento)</p>
              <p className="text-lg mt-2">Quiz disponível abaixo para praticar</p>
            </div>
          </section>
<QuizInterativo
            questoes={quizM7}
            numero={1}
            onComplete={() => handleModuleComplete("modulo-7")}
          />
        </div>
      </TabsContent>

      <TabsContent value="modulo-8">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            modulo={8}
            titulo="Revisão por Contrastes (Inglês x Português)"
            icone={<LuCircleCheck className="w-8 h-8" />}
            corModulo={mv[8]}
            descricao="Tabela comparativa completa de 50+ falsos cognatos"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm">
            <div className="text-center text-foreground/60">
              <p>Módulo 8: Síntese e Revisão (Em Desenvolvimento)</p>
              <p className="text-lg mt-2">Quiz disponível abaixo para praticar</p>
            </div>
          </section>
<QuizInterativo
            questoes={quizM8}
            numero={1}
            onComplete={() => handleModuleComplete("modulo-8")}
          />
        </div>
      </TabsContent>

      <TabsContent value="modulo-9">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            modulo={9}
            titulo="False Cognates em Provas CESGRANRIO — Contexto Petrobras"
            icone={<LuShield className="w-8 h-8" />}
            corModulo={mv[9]}
            descricao="Padrões de prova e estratégias CESGRANRIO específicas"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm">
            <div className="text-center text-foreground/60">
              <p>Módulo 9: Análise de Provas CESGRANRIO (Em Desenvolvimento)</p>
              <p className="text-lg mt-2">Quiz disponível abaixo para praticar</p>
            </div>
          </section>
<QuizInterativo
            questoes={quizM9}
            numero={1}
            onComplete={() => handleModuleComplete("modulo-9")}
          />
        </div>
      </TabsContent>

      <TabsContent value="modulo-10">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            modulo={10}
            titulo="Simulado Mestre — False Cognates Completamente Dominado"
            icone={<LuTarget className="w-8 h-8" />}
            corModulo={mv[10]}
            descricao="Você aprendeu 60+ falsos cognatos. Agora, teste seu conhecimento."
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Seu Checklist Final"
              description="5 passos para nunca mais cair em armadilha de falso cognato"
            />

            <div className="space-y-6">
              <TimelineItem
                passo={1}
                titulo="Veja a Palavra → Desconfia Primeiro"
                descricao="Se parece cognato com português, pode ser falso. ACTUALLY parece 'atualmente'? Sim, pode ser falso. Procure contexto antes de decidir."
              />

              <TimelineItem
                passo={2}
                titulo="Procure o Contexto"
                descricao="Qual significado faz sentido NESTA frase? 'Actually, the pressure...' = qualificação (de fato) ou 'Now, the pressure...' = tempo (agora)."
              />

              <TimelineItem
                passo={3}
                titulo="Elimine pelo Português"
                descricao="Qual 'português errado' é tentador? Se 'atualmente' faz sentido em português aqui, cuidado — em inglês pode ser ACTUALLY (de fato) OU CURRENTLY (agora)."
              />

              <TimelineItem
                passo={4}
                titulo="Valide pela Estrutura"
                descricao="Gramática marca sentido? 'Eventually' é advérbio de tempo (future será). 'Actually' é advérbio qualificador (qualquer tempo). Estrutura linguística é pista."
              />

              <TimelineItem
                passo={5}
                titulo="Releia e Valide"
                descricao="Leia a frase inteira com sua resposta. Faz sentido perfeitamente? Se não, volte aos passos 2-4. Confiança vem de validação completa."
              />
            </div>

            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white space-y-4">
              <h4 className="font-bold text-lg">👑 Você Domina False Cognates</h4>
              <p className="text-lg leading-relaxed">
                Você aprendeu os 4 clássicos (Actually, Eventually, Library, Parents), os 4 industriais (Fabric, Commodity, Schedule, College), os 4 gerenciais (Policy, Tax, Legend, Claim), e dezenas de outros em contextos B2, legal, e nuances avançadas. Você aprendeu os 5 passos que funcionam para QUALQUER falso cognato. Você aprendeu os padrões CESGRANRIO. Agora, vá direto para o simulado abaixo. Se conseguir 70% ou mais, você está pronto para dominar a seção de leitura Petrobras.
              </p>
            </div>
          </section>
<QuizInterativo
            questoes={quizFinal}
            numero={2}
            onComplete={() => handleModuleComplete("modulo-10")}
          />
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
