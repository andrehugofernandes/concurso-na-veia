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
  LuTrendingUp,
  LuChartBar,
  LuLeaf,
  LuClipboardList,
  LuHandshake,
} from "react-icons/lu";

import {
  QUIZ_M1_UPSTREAM,
  QUIZ_M2_DOWNSTREAM,
  QUIZ_M3_EQUIPMENT,
  QUIZ_M4_SAFETY,
  QUIZ_M5_FINANCIAL,
  QUIZ_M6_ENVIRONMENTAL,
  QUIZ_M7_MANAGEMENT,
  QUIZ_M8_PROCUREMENT,
  QUIZ_M9_PETROBRASESPECIFICO,
  QUIZ_M10_MESTRE,
} from "./data/vocabulary-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Upstream Operations (Exploration & Drilling)" },
  { id: "modulo-2", label: "Módulo 2", title: "Downstream Operations (Refining & Distribution)" },
  { id: "modulo-3", label: "Módulo 3", title: "Industrial Equipment (Valves, Pumps, Pipes, Rigs)" },
  { id: "modulo-4", label: "Módulo 4", title: "Safety & HSE (PPE, Hazard, Incident, Compliance)" },
  { id: "modulo-5", label: "Módulo 5", title: "Financial & Business Terms (CAPEX, OPEX, Brent)" },
  { id: "modulo-6", label: "Módulo 6", title: "Environmental Terms (Carbon Footprint, ESG)" },
  { id: "modulo-7", label: "Módulo 7", title: "Management & Projects (KPI, Milestone, Scope)" },
  { id: "modulo-8", label: "Módulo 8", title: "Procurement & Contracts (Tender, Bid, Liability)" },
  { id: "modulo-9", label: "Módulo 9", title: "Vocabulary in Petrobras Context" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
] as const;

export default function AulaVocabulary({
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

  const [quizM1, setQuizM1] = useState<typeof QUIZ_M1_UPSTREAM>([]);
  const [quizM2, setQuizM2] = useState<typeof QUIZ_M2_DOWNSTREAM>([]);
  const [quizM3, setQuizM3] = useState<typeof QUIZ_M3_EQUIPMENT>([]);
  const [quizM4, setQuizM4] = useState<typeof QUIZ_M4_SAFETY>([]);
  const [quizM5, setQuizM5] = useState<typeof QUIZ_M5_FINANCIAL>([]);
  const [quizM6, setQuizM6] = useState<typeof QUIZ_M6_ENVIRONMENTAL>([]);
  const [quizM7, setQuizM7] = useState<typeof QUIZ_M7_MANAGEMENT>([]);
  const [quizM8, setQuizM8] = useState<typeof QUIZ_M8_PROCUREMENT>([]);
  const [quizM9, setQuizM9] = useState<typeof QUIZ_M9_PETROBRASESPECIFICO>([]);
  const [quizFinal, setQuizFinal] = useState<typeof QUIZ_M10_MESTRE>([]);

  const [hasSyncedInitial, setHasSyncedInitial] = useState(false);
  const [showCompletionBadge, setShowCompletionBadge] = useState(false);

  useEffect(() => {
    if (isCompleted) setShowCompletionBadge(true);
  }, [isCompleted]);

  useEffect(() => {
    if (!hasSyncedInitial && !loading) {
      setQuizM1(getRandomQuestions(QUIZ_M1_UPSTREAM, 8));
      setQuizM2(getRandomQuestions(QUIZ_M2_DOWNSTREAM, 8));
      setQuizM3(getRandomQuestions(QUIZ_M3_EQUIPMENT, 8));
      setQuizM4(getRandomQuestions(QUIZ_M4_SAFETY, 8));
      setQuizM5(getRandomQuestions(QUIZ_M5_FINANCIAL, 8));
      setQuizM6(getRandomQuestions(QUIZ_M6_ENVIRONMENTAL, 8));
      setQuizM7(getRandomQuestions(QUIZ_M7_MANAGEMENT, 8));
      setQuizM8(getRandomQuestions(QUIZ_M8_PROCUREMENT, 8));
      setQuizM9(getRandomQuestions(QUIZ_M9_PETROBRASESPECIFICO, 8));
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
      titulo={titulo || "Technical Vocabulary — Domínio do Vocabulário Técnico Petrobras"}
      descricao={descricao || "Domine 200+ termos em 8 domínios técnicos: Upstream, Downstream, Equipamentos, Segurança, Financeiro, Ambiental, Gestão e Procurement com contexto real Petrobras e estratégia CESGRANRIO"}
      duracao={duracao || "16 horas"}
      materiaNome={materiaNome || "Inglês"}
      materiaCor={materiaCor || "from-blue-500 to-cyan-400"}
      materiaId={materiaId || "ingles"}
      modules={MODULE_DEFS}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      completedModules={completedModules}
      onComplete={onComplete}
      isCompleted={isCompleted}
      showCompletionBadge={showCompletionBadge}
      completionBadgeText="🏆 MASTER EM VOCABULÁRIO TÉCNICO"
      prevTopico={prevTopico}
      nextTopico={nextTopico}
    >
      {/* ═══ MÓDULO 1: UPSTREAM OPERATIONS ═══ */}
      <TabsContent value="modulo-1">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={1}
            titulo="Upstream Operations (Exploration & Drilling)"
            variant={mv[1]}
            />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              titulo="Upstream: A Jornada da Exploração até a Produção"
              />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Upstream operations representam a primeira etapa da cadeia de valor de óleo e gás: exploração, desenvolvimento e produção. A Petrobras é uma empresa heavily upstream-dependent porque o Brasil possui algumas das maiores reservas de petróleo do mundo, especialmente no pré-sal. O termo "upstream" literalmente significa "contra a corrente" — você está procurando pela fonte do óleo, não processando o que já foi encontrado. Esta distinção é crítica para entender documentos técnicos, relatórios de operação e discussões estratégicas em Petrobras.
              </p>

              <p>
                A jornada upstream segue uma sequência lógica: Seismic Survey (investigação sísmica para identificar estruturas geológicas) → Exploration Well (poço exploratório para confirmar reservas) → Drilling (perfuração do poço de produção) → Well Completion (conclusão do poço) → Production Testing (testes de produção) → Field Development (desenvolvimento do campo) → Continuous Production (produção contínua). Cada etapa tem vocabulário específico que é testado em provas CESGRANRIO.
              </p>

              <p>
                Termos críticos: Exploration (exploração), Drilling (perfuração), Well (poço), Borehole (furo do poço), Rig (sonda/plataforma de perfuração), Platform (plataforma de produção), Reservoir (reservatório/jazida), Crude Oil (óleo cru), Extraction (extração), Onshore (em terra), Offshore (no mar), Seismic (sísmico), Wellhead (cabeçote do poço), Casing (revestimento), Tubing (coluna de produção), Perforation (canhoneio).
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Fases Principais do Upstream</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-blue-700 dark:text-blue-300">Exploration</div>
                    <div className="text-xs mt-1">Seismic surveys, wildcat wells, reserve estimation</div>
                  </div>
                  <div>
                    <div className="font-semibold text-cyan-700 dark:text-cyan-300">Development</div>
                    <div className="text-xs mt-1">Platform design, well drilling, infrastructure</div>
                  </div>
                  <div>
                    <div className="font-semibold text-teal-700 dark:text-teal-300">Production</div>
                    <div className="text-xs mt-1">Oil/gas extraction, processing, transport to refinery</div>
                  </div>
                  <div>
                    <div className="font-semibold text-green-700 dark:text-green-300">Decommissioning</div>
                    <div className="text-xs mt-1">Well abandonment, platform removal, site restoration</div>
                  </div>
                </div>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "① Conceituação: Fases do Upstream",
                  icone: <LuBookOpen className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4 text-base leading-relaxed">
                      <p>
                        <strong>Exploration Phase:</strong> Geoscientists usam seismic surveys (ondas sonoras que penetram a terra) para identificar estruturas geológicas que POSSAM conter óleo. Se os dados sísmicos são promissores, eles perfuram um wildcat well (poço exploratório de risco) para confirmar a presença de óleo e gás. Se bem-sucedido, estimam o tamanho da reserva usando cores e valores de teste.
                      </p>
                      <p>
                        <strong>Development Phase:</strong> Uma vez confirmada a reserva comercial, engenheiros projetam a infraestrutura: plataformas offshore, sistemas de perfuração, pipelines. A perfuração começa em série — cada well (poço) é identificado por coordenadas e profundidade. A estrutura interna do poço inclui: casing (tubos de aço que revestem o poço), tubing (tubos menores por onde o óleo sobe), wellhead (equipamento no topo que controla o fluxo).
                      </p>
                      <p>
                        <strong>Production Phase:</strong> O óleo cru sai do reservoir através do tubing, é coletado na plataforma, passa por processing inicial (separação de água, gás, sólidos), e é transportado via pipeline ou tanker até a refinaria. Velocidade de produção é medida em barrels per day (bbl/d).
                      </p>
                      <p>
                        <strong>Decommissioning Phase:</strong> Quando a reserva se esgota (economicamente não é mais viável), wells são abandoned (vedadas permanentemente), plataformas são removed, e o site é restaurado. Este é o lado menos glamouroso mas obrigatório do upstream.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "② Exemplificação: Vocabulário em Contexto Real",
                  icone: <LuPlay className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <p className="font-semibold">1. Seismic Survey Identifies Structures</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "The seismic survey revealed a large anticlinal structure that could contain oil reserves beneath 2,000 meters of overburden."
                        </p>
                      </div>
                      <div className="border-l-4 border-cyan-500 pl-4">
                        <p className="font-semibold">2. Drilling Operations</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "The drilling rig commenced operations on the Campos Basin well, targeting a depth of 3,500 meters with 9.5-inch casing."
                        </p>
                      </div>
                      <div className="border-l-4 border-green-500 pl-4">
                        <p className="font-semibold">3. Well Completion</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "After perforation and tubing installation, the well was tested for production capacity and flow rates."
                        </p>
                      </div>
                      <div className="border-l-4 border-amber-500 pl-4">
                        <p className="font-semibold">4. Platform Operations</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "The offshore platform processed 50,000 bbl/d of crude oil, which was then transported via pipeline to the terminal."
                        </p>
                      </div>
                      <div className="border-l-4 border-purple-500 pl-4">
                        <p className="font-semibold">5. Reservoir Management</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "The reservoir pressure declined over five years, requiring enhanced recovery techniques such as water injection to maintain extraction rates."
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "③ Dicas: Sinais Contextuais",
                  icone: <LuLightbulb className="w-5 h-5" />,
                  conteudo: (
                    <CardCarousel
                      cards={[
                        {
                          titulo: "Seismic = Vibrações, Estruturas",
                          descricao: "Seismic survey usa ondas sonoras. Identifica estruturas geológicas, camadas de rocha, possíveis armadilhas de óleo.",
                          exemplo: "✓ Seismic data revealed an anticline favorable for oil accumulation",
                        },
                        {
                          titulo: "Drilling = Perfuração Profunda",
                          descricao: "Drilling rig perfura poços. Casing reveste, tubing traz óleo para cima. Perforation abre furos nas paredes.",
                          exemplo: "✓ Drilling commenced at 2,000m depth with 9.5-inch casing",
                        },
                        {
                          titulo: "Reservoir = Jazida Subterrânea",
                          descricao: "Reservoir é a formação de rocha porosa que CONTÉM o óleo. Não é um tanque — é rocha com poros cheios de hidrocarboneto.",
                          exemplo: "✓ The reservoir contains an estimated 500 million barrels",
                        },
                        {
                          titulo: "Platform = Estrutura de Produção",
                          descricao: "Platform (offshore) ou onshore facility = lugar onde o óleo sai do poço, é processado, armazenado, então transportado.",
                          exemplo: "✓ The platform processes crude oil before transport to refinery",
                        },
                        {
                          titulo: "Bbl/d = Barris por Dia",
                          descricao: "Production rate é medida em bbl/d (barrels per day). 1 barril = 159 litros. Alta produção = negócio viável.",
                          exemplo: "✓ Current production rate: 100,000 bbl/d (economically viable)",
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
                      <AlertBox tipo="danger"
                        titulo="Confusão #1: Platform vs Plataforma (português)"
                        
                      >
                        <ComparisonSide
                          lado1={{ label: "❌ Errado", content: "Platform é uma estação de trem." }}
                          lado2={{ label: "✅ Correto", content: "The offshore platform produces 100,000 bbl/d." }}
                        />
                      </AlertBox>
                      <AlertBox tipo="warning"
                        titulo="Confusão #2: Well vs Poço (água)"
                        
                      >
                        <ComparisonSide
                          lado1={{ label: "❌ Contextualmente estranho", content: "We drilled a well to extract drinking water. (Possível mas incomum em Petrobras)" }}
                          lado2={{ label: "✅ Em Petrobras", content: "We drilled 50 exploration wells in the pre-sal region. (Contexto oil/gas)" }}
                        />
                      </AlertBox>
                      <AlertBox tipo="info" titulo="Dica #3: Upstream = ANTES do Refino"><p>Se você vê: seismic, drilling, platform, reservoir, extraction — é UPSTREAM. Se vê: refinery, distillation, products — é DOWNSTREAM.</p></AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            <div className="space-y-4">
              <h4 className="font-bold text-lg">FlipCards: Termos Upstream</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FlipCard
                  frente="Seismic Survey"
                  verso="Investigação usando ondas sonoras para mapear estruturas geológicas subterrâneas. Identifica potenciais depósitos de óleo/gás. Ex: 'The seismic survey revealed a promising anticlinal structure.'"
                />
                <FlipCard
                  frente="Wellhead"
                  verso="Cabeçote do poço. Conjunto de equipamentos no topo que controla fluxo e pressão. Ex: 'The wellhead controls the flow rate of crude oil from the reservoir.'"
                />
                <FlipCard
                  frente="Casing"
                  verso="Revestimento em tubos de aço que alinha as paredes do poço para evitar colapso. Ex: 'The 9.5-inch casing was installed at 2,000 meters depth.'"
                />
                <FlipCard
                  frente="Perforation"
                  verso="Canhoneio. Fazer furos nas paredes do poço para permitir óleo/gás fluir do reservatório para dentro do tubing. Ex: 'Perforation creates channels for oil flow.'"
                />
                <FlipCard
                  frente="Reservoir"
                  verso="Jazida. Formação de rocha porosa e permeável que contém óleo/gás. Ex: 'The pre-sal reservoir contains 500 million barrels of crude oil.'"
                />
                <FlipCard
                  frente="Tubing"
                  verso="Coluna de produção. Tubos menores dentro do poço por onde óleo/gás sobem até a superfície. Ex: 'Oil flows through the tubing to the surface.'"
                />
              </div>
            </div>
          </section>

          <ModuleConsolidation
            numero={1}
            variant={mv[1]}
            onComplete={() => handleModuleComplete("modulo-1")}
            maceteVisual={{
              title: "Upstream Operations - Key Drilling Terms",
              content: (
                <div className="space-y-2">
                  <p><strong>Wellhead:</strong> The equipment at the top of the well that controls pressure and flow</p>
                  <p><strong>Casing:</strong> Large diameter pipe inserted into the borehole to provide structural support</p>
                  <p><strong>Tubing:</strong> Smaller pipe inside the casing through which oil and gas are produced</p>
                  <p><strong>Drill Bit:</strong> The cutting tool at the end of the drill string that removes rock</p>
                </div>
              ),
            }}
          >
            <QuizInterativo
              questoes={quizM1}
              numero={1}
              onComplete={() => handleModuleComplete("modulo-1")}
            />
          </ModuleConsolidation>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 2: DOWNSTREAM OPERATIONS ═══ */}
      <TabsContent value="modulo-2">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={2}
            titulo="Downstream Operations (Refining & Distribution)"
            variant={mv[2]}
            />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              titulo="Downstream: Transformando Óleo Cru em Produtos"
              />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Downstream operations começam quando o óleo cru sai do poço e termina quando produtos finais (gasolina, diesel, querosene, óleo lubrificante, petroquímicos) chegam ao consumidor final. Enquanto upstream é sobre ENCONTRAR e EXTRAIR o óleo, downstream é sobre TRANSFORMAR e VENDER. A Petrobras tem operações significativas em ambas, mas a estratégia corporativa tem priorizado upstream (pré-sal) nos últimos 15 anos.
              </p>

              <p>
                O processo começa na refinery (refinaria), onde o crude oil (óleo cru) é destilado — aquecido e separado em frações baseadas em ponto de ebulição. Cada fração tem uso diferente: lighter fractions (gasolina, querosene) vs heavier fractions (óleo combustível, asfalto). Alguns hidrocarbonetos maiores são "cracked" (quebrados) em moléculas menores usando calor e catalisadores para aumentar a produção de produtos valiosos. Após refining, produtos são armazenados em tanques, transportados via pipelines/tankers, e distribuídos para retailers (postos de gasolina, clientes industriais, etc.).
              </p>

              <p>
                Termos críticos: Refinery (refinaria), Refining (refino), Distillation (destilação), Crude Oil Fraction (fração de óleo cru), Distillate (destilado), Gasoline (gasolina), Diesel (diesel), Jet Fuel (combustível de aviação), Fuel Oil (óleo combustível), Lubricant (lubrificante), Petrochemical (petroquímico), Cracking (craqueamento), Processing (processamento), Distribution (distribuição), Retail (varejo).
              </p>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 rounded-lg border border-orange-200 dark:border-orange-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Cadeia de Valor Downstream</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-orange-700 dark:text-orange-300">Refining</div>
                    <div className="text-xs mt-1">Crude oil → Distillation → Fractions (gasoline, diesel, etc)</div>
                  </div>
                  <div>
                    <div className="font-semibold text-amber-700 dark:text-amber-300">Processing</div>
                    <div className="text-xs mt-1">Additional treatment, blending, quality control</div>
                  </div>
                  <div>
                    <div className="font-semibold text-yellow-700 dark:text-yellow-300">Storage & Transport</div>
                    <div className="text-xs mt-1">Tanks, pipelines, trucks, ships to distribution centers</div>
                  </div>
                  <div>
                    <div className="font-semibold text-red-700 dark:text-red-300">Retail & Consumption</div>
                    <div className="text-xs mt-1">Gas stations, industrial users, power plants</div>
                  </div>
                </div>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "① Conceituação: Processos Downstream",
                  icone: <LuBookOpen className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4 text-base leading-relaxed">
                      <p>
                        <strong>Distillation:</strong> O crude oil aquecido a ~350°C entra numa fractionating column (torre de destilação). Moléculas leves (gasolina) sobem para o topo e saem como vapor; moléculas pesadas (fuel oil) descem para o fundo. Cada fração tem nome: naphtha (matéria prima petroquímica), gasoline (gasolina), kerosene (querosene), gasoil (diesel), fuel oil (óleo combustível).
                      </p>
                      <p>
                        <strong>Cracking:</strong> Algumas moléculas pesadas são quebradas ("cracked") usando calor (thermal cracking) ou catalisadores (catalytic cracking) para produzir mais moléculas leves e valiosas. Cracking aumenta o rendimento de gasolina de ~50% para ~70%.
                      </p>
                      <p>
                        <strong>Blending & Treatment:</strong> Os destilados são misturados com aditivos para atingir especificações de octanagem (gasolina), cetanagem (diesel), ou outras propriedades. Enxofre é removido (desulfuração) porque combustíveis com baixo enxofre poluem menos.
                      </p>
                      <p>
                        <strong>Distribution:</strong> Produtos finais são armazenados em tanques, transportados via pipeline para distribuidoras regionais, depois para postos de gasolina e clientes industriais. Cada produto tem cadeia de custódia rigorosa para evitar contaminação.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "② Exemplificação: Vocabulary in Context",
                  icone: <LuPlay className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="border-l-4 border-orange-500 pl-4">
                        <p className="font-semibold">1. Refinery Operations</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "The Paulínia refinery processes 170,000 bbl/d of crude oil and produces gasoline, diesel, and fuel oil."
                        </p>
                      </div>
                      <div className="border-l-4 border-amber-500 pl-4">
                        <p className="font-semibold">2. Distillation Process</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "In the distillation unit, crude oil fractions are separated based on boiling point and sent to different processing streams."
                        </p>
                      </div>
                      <div className="border-l-4 border-yellow-500 pl-4">
                        <p className="font-semibold">3. Cracking & Conversion</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "Catalytic cracking converts heavy molecules into lighter, more valuable products like gasoline and jet fuel."
                        </p>
                      </div>
                      <div className="border-l-4 border-red-500 pl-4">
                        <p className="font-semibold">4. Quality Control</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "Desulfurization treatment reduces sulfur content in diesel to meet environmental standards."
                        </p>
                      </div>
                      <div className="border-l-4 border-pink-500 pl-4">
                        <p className="font-semibold">5. Distribution Network</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "Finished gasoline is transported via pipeline to distribution terminals and then trucked to retail gas stations."
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "③ Dicas: Reconheça Downstream",
                  icone: <LuLightbulb className="w-5 h-5" />,
                  conteudo: (
                    <CardCarousel
                      cards={[
                        {
                          titulo: "Refinery = Transformação",
                          descricao: "Refinery transforma crude oil em produtos. Se vê 'refinery', 'distillation', 'cracking' — é downstream.",
                          exemplo: "✓ The refinery produces gasoline, diesel, and petrochemicals",
                        },
                        {
                          titulo: "Distillate = Fração Separada",
                          descricao: "Distillate é qualquer fração que sai da destilação: naphtha, gasoline, kerosene, diesel, fuel oil.",
                          exemplo: "✓ Light distillates (gasoline) vs heavy distillates (fuel oil)",
                        },
                        {
                          titulo: "Cracking = Quebra Molecular",
                          descricao: "Cracking quebra moléculas pesadas em leves. Aumenta rendimento. Thermal cracking (calor) vs catalytic (catalisador).",
                          exemplo: "✓ Catalytic cracking converts heavy residues into lighter fractions",
                        },
                        {
                          titulo: "Distribution = Venda & Transporte",
                          descricao: "Distribution é toda a cadeia depois do refino: armazenamento, transporte, varejo. É onde o produto chega ao consumidor.",
                          exemplo: "✓ Distribution network reaches 5,000 gas stations nationwide",
                        },
                        {
                          titulo: "Petroquímical = Plástico & Química",
                          descricao: "Petrochemicals são produtos químicos derivados de óleo/gás. Plásticos, fertilizantes, fibras sintéticas — tudo vem de petroquímicos.",
                          exemplo: "✓ Petrochemical division produces plastics and synthetic fibers",
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
                      <AlertBox tipo="danger"
                        titulo="Confusão #1: Refinery vs Refining"
                        
                      >
                        <ComparisonSide
                          lado1={{ label: "Refinery (lugar)", content: "The refinery is a large industrial facility." }}
                          lado2={{ label: "Refining (processo)", content: "Refining crude oil produces gasoline." }}
                        />
                      </AlertBox>
                      <AlertBox tipo="warning"
                        titulo="Confusão #2: Crude vs Crude Oil"
                        
                      >
                        <ComparisonSide
                          lado1={{ label: "❌ Uncommon", content: "We extracted crude from the well." }}
                          lado2={{ label: "✅ Correct", content: "We extracted crude oil from the well." }}
                        />
                      </AlertBox>
                      <AlertBox tipo="info" titulo="Dica #3: DOWNSTREAM = Valor Agregado"><p>Downstream gera mais lucro por unidade mas requer investimento capital em refinarias. Upstream é exploração pura.</p></AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            <div className="space-y-4">
              <h4 className="font-bold text-lg">FlipCards: Termos Downstream</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FlipCard
                  frente="Distillation"
                  verso="Destilação. Aquecimento de crude oil e separação em frações por ponto de ebulição. Ex: 'Distillation separates crude oil into gasoline, diesel, and fuel oil.'"
                />
                <FlipCard
                  frente="Cracking"
                  verso="Craqueamento. Quebra de moléculas pesadas em leves usando calor (thermal) ou catalisadores (catalytic). Ex: 'Catalytic cracking increases gasoline yield from 50% to 70%.'"
                />
                <FlipCard
                  frente="Fraction"
                  verso="Fração. Qualquer destilado específico: naphtha, gasoline, kerosene, gasoil, fuel oil. Ex: 'Each fraction has different boiling point and uses.'"
                />
                <FlipCard
                  frente="Petrochemical"
                  verso="Petroquímico. Produtos químicos derivados de óleo/gás: plásticos, fertilizantes, fibras. Ex: 'The petrochemical unit produces ethylene and propylene.'"
                />
                <FlipCard
                  frente="Desulfurization"
                  verso="Desulfuração. Remoção de enxofre do combustível. Combustíveis com baixo S poluem menos. Ex: 'Desulfurization reduces diesel sulfur to <10 ppm.'"
                />
                <FlipCard
                  frente="Distribution Terminal"
                  verso="Terminal de distribuição. Centro logístico onde produtos são armazenados e transportados para varejo/clientes. Ex: 'The terminal distributes gasoline to 500 gas stations.'"
                />
              </div>
            </div>
          </section>

          <ModuleConsolidation
            numero={2}
            variant={mv[2]}
            onComplete={() => handleModuleComplete("modulo-2")}
            maceteVisual={{
              title: "Downstream Operations - Refining & Distribution",
              content: (
                <div className="space-y-2">
                  <p><strong>Refinery:</strong> Industrial facility that converts crude oil into usable products like gasoline</p>
                  <p><strong>Distillation:</strong> The process of separating crude oil into different components by heating and cooling</p>
                  <p><strong>Fractionation Column:</strong> Tall vertical structure where crude oil is separated into products of different weights</p>
                  <p><strong>Distribution Network:</strong> System of pipelines and terminals that transport refined products to consumers</p>
                </div>
              ),
            }}
          >
            <QuizInterativo
              questoes={quizM2}
              numero={1}
              onComplete={() => handleModuleComplete("modulo-2")}
            />
          </ModuleConsolidation>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 3: INDUSTRIAL EQUIPMENT ═══ */}
      <TabsContent value="modulo-3">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={3}
            titulo="Industrial Equipment (Valves, Pumps, Pipes, Rigs)"
            variant={mv[3]}
            />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              titulo="Equipamentos: Construindo a Indústria"
              />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Equipamentos são o esqueleto da indústria de óleo e gás. Cada sistema de produção, refino ou transporte é construído com hundreds de componentes especializados que devem funcionar de forma coordenada. Um pequeno vazamento numa válvula pode parar operações inteiras. Entender nomes e funções de equipamentos é CRÍTICO para compreender documentos técnicos, relatórios de manutenção e discussões operacionais. Este módulo apresenta os 4 tipos principais: valves (válvulas), pumps (bombas), pipes (tubulações) e rigs (sondas/equipamentos de perfuração).
              </p>

              <p>
                <strong>Valves</strong> controlam fluxo de fluidos. Ball valve usa uma esfera com furo central — rápida, simples, selador excelente. Gate valve usa uma porta deslizante — boa para isolar completamente. Check valve permite fluxo em uma direção apenas — previne backflow. Relief valve libera pressão quando excede limite — proteção crítica. Control valve regula fluxo fino — automática com atuador.
              </p>

              <p>
                <strong>Pumps</strong> movem fluidos aplicando força. Centrifugal pump (força centrífuga, tipo hélice) é rápida, eficiente em alto volume, mas precisa de startup power. Positive displacement pump (deslocamento positivo) move volume fixo por ciclo — forte, lenta, confiável mesmo com fluidos viscosos. Submersible pump fica submersa — usada para lift em poços.
              </p>

              <p>
                <strong>Pipes</strong> transportam fluidos. Especificações: diâmetro (inches), espessura de parede (wall thickness), material (carbon steel/aço carbono, stainless/inox, composite), e pressure rating (nominal pipe size vs actual OD/ID). Pipeline é uma série de pipes soldados — pode ter centenas de quilômetros. Um leak em alta pressão é catastrófico.
              </p>

              <p>
                <strong>Rigs</strong> perfuram poços. Onshore rig (em terra) é uma torre com motor, tração para levantar drill pipe, e bomba circulating drilling fluid. Offshore rig (no mar) é uma estrutura maior flutuante. Rotary rig usa rotação do broca. Percussion rig usa impacto (menos comum). As maiores rigs custam US$ 500 milhões+ e alugam por US$ 1+ milhão/dia.
              </p>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg border border-purple-200 dark:border-purple-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Equipamentos Principais e Funções</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-purple-700 dark:text-purple-300">Valve</div>
                    <div className="text-xs mt-1">Controls, isolates, or relieves fluid flow. Types: ball, gate, check, relief, control.</div>
                  </div>
                  <div>
                    <div className="font-semibold text-pink-700 dark:text-pink-300">Pump</div>
                    <div className="text-xs mt-1">Moves fluids by imparting kinetic energy. Types: centrifugal, positive displacement, submersible.</div>
                  </div>
                  <div>
                    <div className="font-semibold text-indigo-700 dark:text-indigo-300">Pipe</div>
                    <div className="text-xs mt-1">Conveys fluid. Specs: diameter, wall thickness, material, pressure rating. Series = pipeline.</div>
                  </div>
                  <div>
                    <div className="font-semibold text-rose-700 dark:text-rose-300">Rig</div>
                    <div className="text-xs mt-1">Drills wells. Types: onshore, offshore, rotary, percussion. Rental: US$1M+/day for mega-rigs.</div>
                  </div>
                </div>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "① Conceituação: Tipos e Funções",
                  icone: <LuBookOpen className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4 text-base leading-relaxed">
                      <p>
                        <strong>Valves — Flow Control:</strong> Ball valve (furo esférico, ON/OFF rápido), Gate valve (porta deslizante, isolamento), Check valve (fluxo unidirecional), Relief valve (proteção de sobrepressão), Control valve (regulação fina com atuador pneumático/elétrico).
                      </p>
                      <p>
                        <strong>Pumps — Fluid Movement:</strong> Centrifugal pump (tipo turbina, rápido, adequado para alto volume de fluido leve), Positive displacement pump (volume fixo por ciclo, forte, bom para fluidos viscosos), Submersible pump (fica submersa, usado para elevar fluido de poços profundos).
                      </p>
                      <p>
                        <strong>Pipes — Fluid Transport:</strong> Especificações críticas: Nominal Pipe Size (NPS, polegadas), wall thickness (espessura da parede, mils = 1/1000 polegada), material (carbon steel para alta pressão, stainless steel para corrosão, composite para peso/flexibilidade), pressure rating (ANSI Class 150/300/600). Um pipe de 6 polegadas a 900 psi com wall thickness 0.375" pode custar US$ 500+.
                      </p>
                      <p>
                        <strong>Rigs — Well Drilling:</strong> Rotary rig mais comum (broca gira), Percussion rig menos comum (impacto), Onshore rig (torre em terra, móvel com mudança), Offshore rig (fixa ou flutuante, estrutura permanente em plataforma). Mega-rigs offshore (semisub, drillship) = bilhões de dólares de investimento.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "② Exemplificação: Equipment in Context",
                  icone: <LuPlay className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="border-l-4 border-purple-500 pl-4">
                        <p className="font-semibold">1. Valve Selection</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "A ball valve was installed at the wellhead for quick isolation, and a relief valve protects the line against overpressure."
                        </p>
                      </div>
                      <div className="border-l-4 border-pink-500 pl-4">
                        <p className="font-semibold">2. Pump Operation</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "The centrifugal pump circulates cooling water at 500 GPM; a positive displacement pump handles the viscous crude oil transfer."
                        </p>
                      </div>
                      <div className="border-l-4 border-indigo-500 pl-4">
                        <p className="font-semibold">3. Pipe Specifications</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "The main transmission line is 12-inch NPS carbon steel, Schedule 60, rated for 900 psi, with corrosion allowance included."
                        </p>
                      </div>
                      <div className="border-l-4 border-rose-500 pl-4">
                        <p className="font-semibold">4. Rig Operations</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "The offshore rotary rig drilled 3,500 meters depth in 45 days at an operating cost of US$ 1.2 million per day."
                        </p>
                      </div>
                      <div className="border-l-4 border-violet-500 pl-4">
                        <p className="font-semibold">5. Integrated System</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "The production platform uses ball valves for quick isolation, centrifugal pumps for export, and 12-inch pipelines to the terminal."
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "③ Dicas: Reconheça Equipamentos",
                  icone: <LuLightbulb className="w-5 h-5" />,
                  conteudo: (
                    <CardCarousel
                      cards={[
                        {
                          titulo: "Valve = Controle/Isolamento",
                          descricao: "Valves controlam ou isolam fluxo. Ball = rápido, Gate = isolamento total, Check = unidirecional, Relief = proteção.",
                          exemplo: "✓ Install a ball valve for quick shutdown and a relief valve for overpressure protection",
                        },
                        {
                          titulo: "Pump = Movimento de Fluido",
                          descricao: "Pumps movem fluido. Centrifugal = rápida/eficiente, Positive displacement = forte, Submersible = submersa.",
                          exemplo: "✓ A centrifugal pump exports crude oil at 10,000 bbl/d",
                        },
                        {
                          titulo: "Pipe = Transporte",
                          descricao: "Pipes transportam fluido. Especifique: diâmetro, material, pressure rating. Pipeline = série de pipes.",
                          exemplo: "✓ The 16-inch pipeline transports crude oil 200 km to the refinery",
                        },
                        {
                          titulo: "Rig = Perfuração",
                          descricao: "Rigs perfuram poços. Onshore = terra, Offshore = mar. Rotary = rotação, Percussion = impacto.",
                          exemplo: "✓ The offshore rotary rig drilled the well to 4,000 meters depth",
                        },
                        {
                          titulo: "GPM vs PSI",
                          descricao: "GPM (gallons per minute) = volume flow. PSI (pounds per square inch) = pressão. Ambos críticos para especificação.",
                          exemplo: "✓ Pump rated 500 GPM at 150 PSI; line rated 1,200 PSI",
                        },
                        {
                          titulo: "Schedule & Class",
                          descricao: "Schedule (parede/peso de pipe): 40, 60, 80, 120. Class (pressão de válvula): 150, 300, 600, 900, 1500.",
                          exemplo: "✓ Schedule 60 pipe, Class 600 flange rated for 900 psi service",
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
                      <AlertBox tipo="danger"
                        titulo="Confusão #1: Pump vs Valve"
                        
                      >
                        <ComparisonSide
                          lado1={{ label: "Pump", content: "Centrifugal pump supplies water at 100 GPM" }}
                          lado2={{ label: "Valve", content: "Ball valve controls the pump discharge flow" }}
                        />
                      </AlertBox>
                      <AlertBox tipo="warning"
                        titulo="Confusão #2: Pipe vs Pipeline vs Piping"
                        
                      >
                        <ComparisonSide
                          lado1={{ label: "Pipe", content: "A single 6-inch carbon steel pipe" }}
                          lado2={{ label: "Pipeline", content: "A 500-km pipeline transporting crude to refinery" }}
                        />
                      </AlertBox>
                      <AlertBox tipo="info" titulo="Dica #3: Rig vs Drill vs Drilling"><p>Rig = equipamento físico. Drill/Drilling = ação. 'The rig is drilling the well' = a máquina está perfurando.</p></AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            <div className="space-y-4">
              <h4 className="font-bold text-lg">FlipCards: Equipamentos Técnicos</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FlipCard
                  frente="Ball Valve"
                  verso="Válvula de esfera. ON/OFF rápido com esfera perfurada. Selador excelente. Ex: 'Install a ball valve at the wellhead for emergency shutdown.'"
                />
                <FlipCard
                  frente="Gate Valve"
                  verso="Válvula de comporta. Isolamento completo com porta deslizante. Ex: 'The gate valve isolates the pipeline section for maintenance.'"
                />
                <FlipCard
                  frente="Check Valve"
                  verso="Válvula de retenção. Permite fluxo em uma direção; previne backflow. Ex: 'A check valve prevents siphoning when pump stops.'"
                />
                <FlipCard
                  frente="Relief Valve"
                  verso="Válvula de alívio. Libera pressão quando excede set point. Proteção crítica. Ex: 'Relief valve set at 500 PSI protects the system.'"
                />
                <FlipCard
                  frente="Centrifugal Pump"
                  verso="Bomba centrífuga. Usa força de rotação. Rápida, eficiente em alto volume. Ex: 'Centrifugal pump transfers crude oil at 50,000 bbl/d.'"
                />
                <FlipCard
                  frente="Positive Displacement Pump"
                  verso="Bomba de deslocamento positivo. Move volume fixo por ciclo. Forte, confiável. Ex: 'PD pump handles viscous crude oil transfer.'"
                />
              </div>
            </div>
          </section>

          <ModuleConsolidation
            numero={3}
            variant={mv[3]}
            onComplete={() => handleModuleComplete("modulo-3")}
            maceteVisual={{
              title: "Industrial Equipment - Valves, Pumps & Pipes",
              content: (
                <div className="space-y-2">
                  <p><strong>Gate Valve:</strong> On/off valve that uses a flat gate to control flow - simple and reliable</p>
                  <p><strong>Centrifugal Pump:</strong> Uses rotation force for rapid, efficient high-volume oil transfer</p>
                  <p><strong>Ball Valve:</strong> Rotating sphere with hole controls flow direction - quick closure, minimal leakage</p>
                  <p><strong>Manifold:</strong> System of pipes and valves that directs fluid flow to multiple destinations</p>
                </div>
              ),
            }}
          >
            <QuizInterativo
              questoes={quizM3}
              numero={1}
              onComplete={() => handleModuleComplete("modulo-3")}
            />
          </ModuleConsolidation>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 4: SAFETY & HSE ═══ */}
      <TabsContent value="modulo-4">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={4}
            titulo="Safety & HSE (PPE, Hazard, Incident, Compliance)"
            variant={mv[4]}
            />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              titulo="HSE: Mais Que Compliance, É Cultura"
              />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                HSE (Health, Safety, Environment) é o pilar mais importante da cultura corporativa Petrobras. Não é apenas regulamentação — é sobrevivência. A indústria de óleo e gás carrega riscos inerentes: pressão alta, temperaturas extremas, produtos inflamáveis, gases tóxicos, ambientes isolados. Um pequeno erro pode causar explosão, vazamento, morte. Por isso Petrobras investe billions em HSE: treinamento obrigatório, auditorias regulares, cultura Zero Harm (zero acidentes).
              </p>

              <p>
                <strong>PPE (Personal Protective Equipment):</strong> Hard hat protege cabeça de queda/impacto. Safety glasses protege olhos de sprays/particles. Safety gloves (nitrila para química, couro para abrasão, composite para múltiplos riscos). Safety boots com toe cap (ponta de aço) para esmagamento, eletricamente isoladas em áreas com risco elétrico. Respirator para ambientes com gases/vapores perigosos. Harness para trabalho em altura.
              </p>

              <p>
                <strong>Hazard (Perigo):</strong> Qualquer situação que PODE causar dano. Chemical hazard (vazamento de ácido, exposição a H2S). Thermal hazard (superfícies quentes). Mechanical hazard (peças móveis, torque, engrenagens). Electrical hazard (choque, arco elétrico). Biological hazard (bactérias, vírus em ambientes marinhos). CESGRANRIO frequentemente testa "identify hazards" = reconhecer riscos antes que virem acidentes.
              </p>

              <p>
                <strong>Incident (Incidente):</strong> Qualquer EVENTO com potencial de causar dano. Accident = incidente que CAUSOU dano (lesão, morte, perda de propriedade). Near-miss = incidente que QUASE causou dano (escapou por sorte). Injury = ferimento corporativo (cut, burn, fracture). Spill/Leak = vazamento de produto. Explosion = reação violenta (raro mas catastrófico). Toda empresa tem protocolo de incident reporting para análise e prevenção.
              </p>

              <p>
                <strong>Compliance (Conformidade):</strong> Seguir regulations (leis/regulações estaduais/federais), standards (ISO 14001 para ambiente, OHSAS 18001 para segurança), procedures (guias operacionais), audits (verificação de conformidade), corrective actions (ações corretivas se não-conformidade encontrada), certifications (prova de cumprimento). Non-compliance resulta em multas, perda de licença operacional, ou encerramento de operações.
              </p>

              <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 rounded-lg border border-red-200 dark:border-red-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">HSE Framework</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-red-700 dark:text-red-300">Health</div>
                    <div className="text-xs mt-1">Worker wellness, medical exams, occupational disease prevention</div>
                  </div>
                  <div>
                    <div className="font-semibold text-orange-700 dark:text-orange-300">Safety</div>
                    <div className="text-xs mt-1">Accident prevention, incident investigation, hazard control, PPE, training</div>
                  </div>
                  <div>
                    <div className="font-semibold text-yellow-700 dark:text-yellow-300">Environment</div>
                    <div className="text-xs mt-1">Spill prevention, emissions control, waste management, restoration</div>
                  </div>
                  <div>
                    <div className="font-semibold text-green-700 dark:text-green-300">Compliance</div>
                    <div className="text-xs mt-1">Regulations, standards, audits, corrective actions, certifications</div>
                  </div>
                </div>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "① Conceituação: PPE & Hazards",
                  icone: <LuBookOpen className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4 text-base leading-relaxed">
                      <p>
                        <strong>PPE (Equipamento de Proteção Individual):</strong> Hard hat (capacete de segurança resistente a impacto), Safety glasses (proteção ocular contra particles/splashes), Gloves (nitrila, couro, composite específico para risco), Safety boots (com toe cap de aço, eletricamente isoladas se necessário), Respirator (N95, P100, ou SCBA para atmosfera perigosa), High-visibility vest (colete fluorescente), Harness/fall arrest equipment (para trabalho em altura). Cada operação prescreve PPE específico conforme risk assessment.
                      </p>
                      <p>
                        <strong>Hazard Categories:</strong> Chemical (ácidos, bases, solventes, H2S toxic gas). Thermal (fornos, steam, cryogenic). Mechanical (peças móveis, high-pressure release, rotating equipment). Electrical (high voltage, arc flash, grounding inadequado). Biological (microorganisms em offshore, bodily fluid exposure). Ergonomic (repetitive strain, back injury, manual handling inadequado).
                      </p>
                      <p>
                        <strong>Incident vs Accident:</strong> Incident = any unplanned event (seja causou dano ou não). Accident = incident que resulted em injury/damage. Near-miss = incident que could have caused injury mas não causou (escapou por sorte). Sempre report incidents porque near-misses hoje podem ser acidentes amanhã.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "② Exemplificação: HSE Situations",
                  icone: <LuPlay className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="border-l-4 border-red-500 pl-4">
                        <p className="font-semibold">1. PPE Requirement</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "All workers entering the platform must wear hard hat, safety glasses, work boots, and high-visibility vest. Respirator required in the H2S zone."
                        </p>
                      </div>
                      <div className="border-l-4 border-orange-500 pl-4">
                        <p className="font-semibold">2. Hazard Identification</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "The pre-startup safety review identified chemical hazard (pressurized H2S), thermal hazard (high-temperature piping), and mechanical hazard (rotating compressor)."
                        </p>
                      </div>
                      <div className="border-l-4 border-yellow-500 pl-4">
                        <p className="font-semibold">3. Incident Reporting</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "A near-miss occurred when a worker slipped but caught the railing. The incident was reported immediately, the floor was cleaned, and anti-slip tape was installed."
                        </p>
                      </div>
                      <div className="border-l-4 border-green-500 pl-4">
                        <p className="font-semibold">4. Compliance Audit</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "The ISO 14001 audit found non-compliance in waste segregation. Corrective action was implemented: new waste bins and worker retraining completed within 30 days."
                        </p>
                      </div>
                      <div className="border-l-4 border-blue-500 pl-4">
                        <p className="font-semibold">5. Safety Training</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "All new hires complete mandatory HSE induction covering PPE, hazard recognition, emergency procedures, and incident reporting protocols."
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "③ Dicas: HSE Vocabulary",
                  icone: <LuLightbulb className="w-5 h-5" />,
                  conteudo: (
                    <CardCarousel
                      cards={[
                        {
                          titulo: "PPE = Proteção Individual",
                          descricao: "Hard hat, safety glasses, gloves, boots, respirator, harness. Cada trabalho prescreve PPE específico.",
                          exemplo: "✓ PPE requirement: hard hat, safety glasses, and gloves in all work areas",
                        },
                        {
                          titulo: "Hazard = Perigo Potencial",
                          descricao: "Qualquer situação que pode causar dano. Chemical, thermal, mechanical, electrical, biological.",
                          exemplo: "✓ Hazard assessment identified H2S exposure as critical risk",
                        },
                        {
                          titulo: "Incident = Evento NÃO Planejado",
                          descricao: "Qualquer evento inesperado. Se causou dano = accident. Se quase causou = near-miss. Report tudo.",
                          exemplo: "✓ The incident was immediately reported and investigated",
                        },
                        {
                          titulo: "Compliance = Conformidade",
                          descricao: "Seguir regulations, standards, procedures. Audits verificam. Non-compliance = multas/encerramento.",
                          exemplo: "✓ Annual compliance audit ensures adherence to ISO 14001 and OHSAS 18001",
                        },
                        {
                          titulo: "Zero Harm = Zero Acidentes",
                          descricao: "Meta cultural: nenhum acidente, nenhuma lesão, nenhuma doença ocupacional. Ideal aspiracional.",
                          exemplo: "✓ Petrobras aims for Zero Harm in all operations",
                        },
                        {
                          titulo: "SOP = Standard Operating Procedure",
                          descricao: "Procedimento padronizado para cada tarefa. Define riscos, controles, sequência. Obrigatório seguir.",
                          exemplo: "✓ All workers must follow the SOP for high-pressure line operation",
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
                      <AlertBox tipo="danger"
                        titulo="Confusão #1: Hazard vs Incident vs Accident"
                        
                      >
                        <ComparisonSide
                          lado1={{ label: "Hazard", content: "Slippery floor (risk potential)" }}
                          lado2={{ label: "Incident", content: "Worker slipped on floor (event that happened)" }}
                        />
                      </AlertBox>
                      <AlertBox tipo="warning"
                        titulo="Confusão #2: Near-Miss = IMPORTANTE"
                        
                      >
                        <ComparisonSide
                          lado1={{ label: "Accident", content: "Worker fell and broke leg" }}
                          lado2={{ label: "Near-Miss", content: "Worker tripped but grabbed railing and didn't fall" }}
                        />
                      </AlertBox>
                      <AlertBox tipo="info" titulo="Dica #3: PETROBRAS = HSE FOCUSED"><p>Petrobras é conhecida por HSE rigoroso. Prioriza segurança acima de produção. Qualquer pergunta sobre trade-off entre lucro e segurança = escolha segurança.</p></AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            <div className="space-y-4">
              <h4 className="font-bold text-lg">FlipCards: Termos HSE</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FlipCard
                  frente="PPE"
                  verso="Personal Protective Equipment. Hard hat, glasses, gloves, boots, respirator, harness. Ex: 'PPE compliance: all workers must wear complete PPE.'"
                />
                <FlipCard
                  frente="Hazard"
                  verso="Perigo potencial. Qualquer situação que pode causar dano. Ex: 'Chemical hazard: H2S exposure requires respiratory protection.'"
                />
                <FlipCard
                  frente="Incident"
                  verso="Evento não planejado. Pode ser near-miss (sem dano) ou accident (com dano). Ex: 'Report all incidents within 24 hours.'"
                />
                <FlipCard
                  frente="Near-Miss"
                  verso="Incidente sem lesão/dano mas que poderia ter. Ex: 'The near-miss was analyzed to prevent recurrence.'"
                />
                <FlipCard
                  frente="SOP"
                  verso="Standard Operating Procedure. Guia passo-a-passo para executar tarefa com segurança. Ex: 'Follow the SOP for confined space entry.'"
                />
                <FlipCard
                  frente="Risk Assessment"
                  verso="Avaliação de riscos. Identifica hazards, analisa severidade/probabilidade, prescreve controles. Ex: 'Risk assessment identified H2S as critical hazard.'"
                />
              </div>
            </div>
          </section>

          <ModuleConsolidation
            numero={4}
            variant={mv[4]}
            onComplete={() => handleModuleComplete("modulo-4")}
            maceteVisual={{
              title: "Safety & HSE - PPE, Hazards & Compliance",
              content: (
                <div className="space-y-2">
                  <p><strong>PPE (Personal Protective Equipment):</strong> Protective gear like hard hats, gloves, and safety glasses</p>
                  <p><strong>Hazard:</strong> Anything with potential to cause harm - H2S gas, high pressure, hot surfaces</p>
                  <p><strong>Incident:</strong> Unplanned event that could be a near-miss or accident - must report within 24 hours</p>
                  <p><strong>SOP (Standard Operating Procedure):</strong> Step-by-step guide to safely execute critical tasks like confined space entry</p>
                </div>
              ),
            }}
          >
            <QuizInterativo
              questoes={quizM4}
              numero={1}
              onComplete={() => handleModuleComplete("modulo-4")}
            />
          </ModuleConsolidation>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 5: FINANCIAL & BUSINESS TERMS ═══ */}
      <TabsContent value="modulo-5">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={5}
            titulo="Financial & Business Terms (CAPEX, OPEX, Brent)"
            variant={mv[5]}
            />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              titulo="Business & Finance: O Lado Econômico"
              />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Petrobras é uma empresa de capital intensivo — projetos de bilhões de dólares que levam 5-10 anos para retorno sobre investimento. Entender linguagem financeira é crítico para compreender decisões estratégicas. Um projeto pode ser tecnicamente bom mas economicamente inviável se o price do Brent (benchmark internacional) cair. Ou um CAPEX (investimento inicial) gigante pode ser justificado se OPEX (custos diários) forem baixos e o poço produzir por 30 anos.
              </p>

              <p>
                <strong>Brent Crude:</strong> Benchmark de preço de óleo usado globalmente (especialmente Europa/África/Ásia). WTI (West Texas Intermediate) é outro benchmark para América do Norte. Preço flutuante: pode ser US$ 40/bbl em recessão, US$ 120/bbl em stress geopolítico. Um bbl = 159 litros. Petrobras faz hedge (proteção) de preço para reduzir volatilidade. Se Brent cai, receita cai — menos dinheiro para investimento.
              </p>

              <p>
                <strong>CAPEX (Capital Expenditure):</strong> Investimento em ativos de longa duração: plataforma offshore (US$ 1-3 bilhões), refinaria nova (US$ 5-10 bilhões), pipeline (centenas de milhões). CAPEX é amortizado ao longo de vida útil (asset depreciation). Decisão de CAPEX requer aprovação de conselho porque envolve bilhões e 20+ anos de compromisso.
              </p>

              <p>
                <strong>OPEX (Operating Expense):</strong> Custos operacionais diários: salários, manutenção, peças sobressalentes, combustível para operação, água de processo, taxas regulatórias. OPEX é despesa corrente (deducted imediatamente do lucro). Reduzir OPEX é meta constante — automação, eficiência, renegociação com fornecedores. Se OPEX é alto, projeto é menos lucrativo mesmo se Brent for alto.
              </p>

              <p>
                <strong>Stakeholder:</strong> Qualquer pessoa interessada na empresa: acionistas (querem lucro), empregados (querem salário/benefícios), governo (quer impostos/compliance), comunidade local (quer meio ambiente limpo), fornecedores (querem pagamento pontual). Gestão de stakeholders = equilibrar interesses conflitantes. Uma decisão que aumenta lucro de acionistas pode prejudicar comunidade local.
              </p>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg border border-green-200 dark:border-green-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Economic Framework</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-green-700 dark:text-green-300">Brent Price</div>
                    <div className="text-xs mt-1">International oil benchmark, USD/barrel, sets revenue potential</div>
                  </div>
                  <div>
                    <div className="font-semibold text-emerald-700 dark:text-emerald-300">CAPEX</div>
                    <div className="text-xs mt-1">Capital investments in assets, amortized over decades</div>
                  </div>
                  <div>
                    <div className="font-semibold text-teal-700 dark:text-teal-300">OPEX</div>
                    <div className="text-xs mt-1">Operating costs, daily expenses, impact on profitability</div>
                  </div>
                  <div>
                    <div className="font-semibold text-cyan-700 dark:text-cyan-300">Stakeholders</div>
                    <div className="text-xs mt-1">Shareholders, employees, governments, communities, suppliers</div>
                  </div>
                </div>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "① Conceituação: Economia do Petróleo",
                  icone: <LuBookOpen className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4 text-base leading-relaxed">
                      <p>
                        <strong>Brent Crude Oil:</strong> Benchmark internacional que determina preço de venda. Publicado diariamente, flutuante, afetado por: oferta global, demanda (crescimento econômico), geopolítica (guerras, embargo, OPEC decisions). 2008: Brent atingiu US$ 147/bbl (pico histórico). 2020: Caiu para US$ 15/bbl (pandemia). 2022-2023: US$ 70-100/bbl (volatilidade pós-Ucrânia). Petrobras recomendou projetos pressupondo Brent = US$ 50-60/bbl "para segurança".
                      </p>
                      <p>
                        <strong>CAPEX Decision:</strong> Requer business case demonstrando NPV (Net Present Value) positivo. Exemplo: Projeto X custa US$ 2 bilhões CAPEX, produzirá 100,000 bbl/d por 20 anos. Se Brent = US$ 60/bbl, receita anual = 2.19 bilhões. OPEX anual = US$ 300 milhões. Lucro anual = 1.89 bilhões. NPV de 20 anos (descontado a 10%) ≈ US$ 15 bilhões. Viável? Sim. Mas se Brent cai para US$ 40/bbl, NPV vira negativo — projeto é cancelado.
                      </p>
                      <p>
                        <strong>OPEX Optimization:</strong> Reduzir OPEX é meta permanente. Estratégias: automação de operações (menos pessoal), consolidação de processamento (economias de escala), renegociação com fornecedores, decommissioning de campos marginais. Um campo com OPEX de US$ 10/bbl é muito mais viável que OPEX US$ 30/bbl mesmo com mesma produção.
                      </p>
                      <p>
                        <strong>Stakeholder Management:</strong> Acionistas querem dividendo (lucro distribuído). Empregados querem bônus. Governo quer royalty (percentual da receita). Comunidade quer empregos locais. Petrobras tenta agradar todos mas deve priorizar shareholder value (lucro). Decisões unilaterais causam reação: greve de empregados, protesto de comunidade, redução de royalty esperado.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "② Exemplificação: Business Scenarios",
                  icone: <LuPlay className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="border-l-4 border-green-500 pl-4">
                        <p className="font-semibold">1. Brent Impact on Revenue</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "When Brent crude fell from $120/bbl to $60/bbl, Petrobras revenue dropped 50%, forcing postponement of several CAPEX projects."
                        </p>
                      </div>
                      <div className="border-l-4 border-emerald-500 pl-4">
                        <p className="font-semibold">2. CAPEX Investment</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "The pre-sal development project required a CAPEX of $8 billion for platform, wells, and infrastructure, with payback period of 7 years at current production levels."
                        </p>
                      </div>
                      <div className="border-l-4 border-teal-500 pl-4">
                        <p className="font-semibold">3. OPEX Management</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "By automating platform operations and reducing crew size, the unit OPEX decreased from $25/bbl to $18/bbl, improving project economics."
                        </p>
                      </div>
                      <div className="border-l-4 border-cyan-500 pl-4">
                        <p className="font-semibold">4. Stakeholder Conflict</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "The government wanted higher royalty (20% vs 12.5%), community demanded local hiring, shareholders demanded cost cuts. Management negotiated compromise."
                        </p>
                      </div>
                      <div className="border-l-4 border-blue-500 pl-4">
                        <p className="font-semibold">5. Project Viability</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "The marginal field was viable at $80/bbl Brent but became uneconomical at $50/bbl. The break-even price was calculated at $72/bbl."
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "③ Dicas: Financeira em Contexto",
                  icone: <LuLightbulb className="w-5 h-5" />,
                  conteudo: (
                    <CardCarousel
                      cards={[
                        {
                          titulo: "Brent = Receita Determinante",
                          descricao: "Brent é o preço que você RECEBE. Flutuante, global, impacta viabilidade de tudo.",
                          exemplo: "✓ Project viability depends on Brent forecast: $60, $75, or $100/bbl?",
                        },
                        {
                          titulo: "CAPEX = Investimento Inicial",
                          descricao: "CAPEX é o dinheiro gasto ANTES de qualquer receita. Bilhões. Aprovado por conselho.",
                          exemplo: "✓ The offshore platform CAPEX: $2.5 billion (to be amortized over 20 years)",
                        },
                        {
                          titulo: "OPEX = Custos Contínuos",
                          descricao: "OPEX é o dinheiro gasto DURANTE operação. Diário, afeta lucro imediatamente.",
                          exemplo: "✓ Current OPEX: $22/bbl (target: reduce to $18/bbl by 2025)",
                        },
                        {
                          titulo: "Stakeholder = Interessados",
                          descricao: "Qualquer pessoa interessada: acionista (lucro), empregado (salário), governo (impostos), comunidade (empregos).",
                          exemplo: "✓ Stakeholder management: satisfy shareholders while respecting community concerns",
                        },
                        {
                          titulo: "Break-Even Price",
                          descricao: "Preço mínimo de Brent em que projeto é viável (receita = OPEX). Abaixo disso = prejuízo.",
                          exemplo: "✓ Project break-even price: $65/bbl (Brent below this closes the field)",
                        },
                        {
                          titulo: "NPV = Valor Presente Líquido",
                          descricao: "Cálculo econômico de viabilidade. NPV > 0 = viável. NPV < 0 = não viável.",
                          exemplo: "✓ NPV (at 10% discount rate): $12 billion (over 20 years, economically sound)",
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
                      <AlertBox tipo="danger"
                        titulo="Confusão #1: CAPEX vs OPEX"
                        
                      >
                        <ComparisonSide
                          lado1={{ label: "CAPEX", content: "$3B for platform construction (one-time, amortized)" }}
                          lado2={{ label: "OPEX", content: "$200M annual operating costs (recurring, yearly)" }}
                        />
                      </AlertBox>
                      <AlertBox tipo="warning"
                        titulo="Confusão #2: Brent é Receita, NÃO Lucro"
                        
                      >
                        <ComparisonSide
                          lado1={{ label: "Revenue", content: "100,000 bbl/d × $100/bbl = $10M daily (gross)" }}
                          lado2={{ label: "Profit", content: "$10M revenue - $3M OPEX - taxes = actual profit" }}
                        />
                      </AlertBox>
                      <AlertBox tipo="info" titulo="Dica #3: Stakeholder = EQUILIBRIO"><p>Não existe decisão que agrada 100% dos stakeholders. Gestão = negociar compromissos.</p></AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            <div className="space-y-4">
              <h4 className="font-bold text-lg">FlipCards: Termos Financeiros</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FlipCard
                  frente="Brent Crude"
                  verso="Benchmark internacional de preço de óleo. USD/barrel, flutuante. Determina receita da empresa. Ex: 'Brent fell from $100 to $60, reducing revenue by 40%.'"
                />
                <FlipCard
                  frente="CAPEX"
                  verso="Capital Expenditure. Investimento em ativos duráveis (plataforma, refinaria). Bilhões. Ex: 'Pre-sal CAPEX: $8 billion over 3 years.'"
                />
                <FlipCard
                  frente="OPEX"
                  verso="Operating Expense. Custos operacionais diários (salários, manutenção, fuel). Afeta lucro imediatamente. Ex: 'Target OPEX reduction: 15% by 2024.'"
                />
                <FlipCard
                  frente="Stakeholder"
                  verso="Interessado na empresa. Acionista, empregado, governo, comunidade, fornecedor. Cada um tem interesse diferente. Ex: 'Stakeholder engagement: balance shareholder returns with community benefits.'"
                />
                <FlipCard
                  frente="Break-Even Price"
                  verso="Preço mínimo viável. Abaixo disso = prejuízo. Ex: 'Project break-even: $65/bbl (close if Brent below this).'"
                />
                <FlipCard
                  frente="NPV"
                  verso="Net Present Value. Valor econômico futuro descontado. NPV > 0 = viável, NPV < 0 = não viável. Ex: 'Project NPV: $15 billion (economically sound).'"
                />
              </div>
            </div>
          </section>

          <ModuleConsolidation
            numero={5}
            variant={mv[5]}
            onComplete={() => handleModuleComplete("modulo-5")}
            maceteVisual={{
              title: "Financial & Business Terms - CAPEX, OPEX & Brent",
              content: (
                <div className="space-y-2">
                  <p><strong>CAPEX (Capital Expenditure):</strong> Upfront investment in assets like drilling rigs - large initial cost</p>
                  <p><strong>OPEX (Operating Expenditure):</strong> Ongoing costs to run the business - staff, maintenance, utilities</p>
                  <p><strong>Brent Crude:</strong> Global oil benchmark price used as standard reference for trade - fluctuates daily</p>
                  <p><strong>NPV (Net Present Value):</strong> Future value discounted to today - NPV {'>'} 0 means economically viable</p>
                </div>
              ),
            }}
          >
            <QuizInterativo
              questoes={quizM5}
              numero={1}
              onComplete={() => handleModuleComplete("modulo-5")}
            />
          </ModuleConsolidation>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 6: ENVIRONMENTAL TERMS ═══ */}
      <TabsContent value="modulo-6">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={6}
            titulo="Environmental Terms (Carbon Footprint, ESG)"
            variant={mv[6]}
            />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              titulo="Environmental: A Transição Energética"
              />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                ESG (Environmental, Social, Governance) é o framework que define sustentabilidade corporativa. Institucional investors (fundos de pensão, seguros) agora exigem ESG compliance antes de investir bilhões. Petrobras tem meta Net-Zero Upstream 2030 e Net-Zero Scope 1+2 por 2050. Mas como uma oil company chega a net-zero enquanto produz bilhões de barris? Resposta: investimento em renewable energy (eólica, solar), carbon capture (captura de CO2 e injeção no solo), e transição gradual.
              </p>

              <p>
                <strong>Carbon Footprint:</strong> Medida total de emissões de GHG (greenhouse gases) causadas por atividade. Medido em toneladas de CO2-equivalente (tCO2e). Scope 1 = emissões diretas da operação (queima de combustível na plataforma). Scope 2 = emissões indiretas da eletricidade comprada. Scope 3 = emissões da cadeia de valor (combustão do produto vendido, que é o maior para oil company). Reduzir carbon footprint = menos queima, mais eficiência, melhor tecnologia.
              </p>

              <p>
                <strong>ESG Compliance:</strong> Seguir padrões de sustentabilidade corporativa. Climate Action (reduzir emissões), Renewable Energy (investir em solar/eólica), Circular Economy (reuso, reciclagem), Diversity & Inclusion (equidade de gênero, etnias), Good Governance (corrupção zero, transparência). Empresas com bom ESG score recebem menor custo de capital (empréstimos mais baratos) e atratizam investimento.
              </p>

              <p>
                <strong>Net-Zero Commitment:</strong> Compromisso de reduzir emissões a zero. "Net" significa que permanecer com algumas emissões é OK se forem OFFSET por carbon removal (captura e armazenamento). Petrobras comprometeu Net-Zero Upstream 2030: reduzir emissões de operação em 25% até 2030. Mas combustão do produto vendido ainda emitirá — aí entra carbon removal como offset.
              </p>

              <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30 rounded-lg border border-green-200 dark:border-green-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">ESG Framework</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-green-700 dark:text-green-300">Environmental</div>
                    <div className="text-xs mt-1">Carbon footprint, emissions, renewable energy, net-zero targets</div>
                  </div>
                  <div>
                    <div className="font-semibold text-teal-700 dark:text-teal-300">Social</div>
                    <div className="text-xs mt-1">Community impact, employee welfare, diversity, human rights</div>
                  </div>
                  <div>
                    <div className="font-semibold text-cyan-700 dark:text-cyan-300">Governance</div>
                    <div className="text-xs mt-1">Board oversight, ethics, transparency, anti-corruption</div>
                  </div>
                  <div>
                    <div className="font-semibold text-blue-700 dark:text-blue-300">Stakeholder Value</div>
                    <div className="text-xs mt-1">Balanced returns to shareholders with responsible practices</div>
                  </div>
                </div>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "① Conceituação: Carbon & ESG",
                  icone: <LuBookOpen className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4 text-base leading-relaxed">
                      <p>
                        <strong>Carbon Footprint &amp; Scopes:</strong> Scope 1 = emissões DIRETAS da operação (ex: queimadores na plataforma). Scope 2 = emissões INDIRETAS de eletricidade comprada (se eletricidade vem de carvão, tem footprint). Scope 3 = emissões da cadeia de valor (o maior número para oil company: quando o cliente QUEIMA o combustível vendido). Para oil company, Scope 3 &gt;&gt; Scope 1+2.
                      </p>
                      <p>
                        <strong>ESG Metrics:</strong> Carbon intensity = toneladas CO2e por barril produzido. Petrobras = ~8 tCO2e/bbl (entre os mais eficientes). Saudi Aramco = ~10, Shell = ~12, ExxonMobil = ~15. Melhorar essa métrica = investir em eficiência, energia renovável na plataforma, reduzir flaring (queima de gás associado).
                      </p>
                      <p>
                        <strong>Net-Zero Strategy:</strong> Não é zero absoluto. É emissões zero liquidas (remover quanto você emite). Estratégia: Reduction (25% by 2030), Carbon Capture & Storage CCS (capturar CO2 do ar/operação e injetar 2km profundo), Renewable energy (placas solares na plataforma). Petrobras investe em todos.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "② Exemplificação: ESG in Practice",
                  icone: <LuPlay className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="border-l-4 border-green-500 pl-4">
                        <p className="font-semibold">1. Carbon Footprint Reduction</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "By installing solar panels on the platform, Petrobras reduced Scope 2 emissions by 30% and energy costs by US$ 5M annually."
                        </p>
                      </div>
                      <div className="border-l-4 border-teal-500 pl-4">
                        <p className="font-semibold">2. ESG Target Setting</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "Petrobras committed to net-zero Scope 1+2 emissions by 2050 and 25% reduction by 2030, aligning with Paris Agreement goals."
                        </p>
                      </div>
                      <div className="border-l-4 border-cyan-500 pl-4">
                        <p className="font-semibold">3. Carbon Capture Project</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "A CCS project captures 1 million tCO2/year from the refinery and injects it 2,000m deep for permanent storage, offsetting operational emissions."
                        </p>
                      </div>
                      <div className="border-l-4 border-blue-500 pl-4">
                        <p className="font-semibold">4. ESG Reporting</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "Petrobras publishes annual Sustainability Report with GRI-verified carbon intensity, renewable energy %, and diversity metrics."
                        </p>
                      </div>
                      <div className="border-l-4 border-indigo-500 pl-4">
                        <p className="font-semibold">5. Investor Influence</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "Institutional investors (BlackRock, Vanguard) increasingly vote for ESG compliance; poor ESG leads to lower stock valuations and higher cost of capital."
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "③ Dicas: ESG Vocabulary",
                  icone: <LuLightbulb className="w-5 h-5" />,
                  conteudo: (
                    <CardCarousel
                      cards={[
                        {
                          titulo: "Carbon Footprint = Emissões Totais",
                          descricao: "Medida em tCO2e (toneladas de CO2-equivalente). Inclui Scope 1, 2, 3.",
                          exemplo: "✓ Our carbon footprint: 5 million tCO2e (Scope 1+2+3 combined)",
                        },
                        {
                          titulo: "Scope 1,2,3 = Diferentes Fontes",
                          descricao: "Scope 1 = direto (plataforma), Scope 2 = eletricidade comprada, Scope 3 = cadeia (maior).",
                          exemplo: "✓ Scope 3 emissions dominate (when customer burns our product)",
                        },
                        {
                          titulo: "Net-Zero = Emissões Líquidas Zero",
                          descricao: "Não é zero absoluto. É emissões = remocão. Resultado líquido = zero.",
                          exemplo: "✓ Net-zero by 2050: reduce 80%, offset remaining 20% with CCS",
                        },
                        {
                          titulo: "Carbon Capture & Storage (CCS)",
                          descricao: "Captura CO2 da atmosfera ou operação, comprime, injeta 2km profundo para armazenamento permanente.",
                          exemplo: "✓ CCS project: 2 million tCO2/year captured and stored permanently",
                        },
                        {
                          titulo: "ESG Score = Investimento Atrativo",
                          descricao: "Bom ESG = menor custo de capital. Ruim ESG = excluído de investimento sustentável.",
                          exemplo: "✓ High ESG score → lower borrowing costs, institutional investor inflow",
                        },
                        {
                          titulo: "Just Transition = Equidade",
                          descricao: "Transição para renewable sem prejudicar trabalhadores de oil/coal. Retraining, new jobs, community support.",
                          exemplo: "✓ Just transition: retrain 10,000 oil workers for renewable energy jobs",
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
                      <AlertBox tipo="danger"
                        titulo="Confusão #1: Carbon vs Emissions"
                        
                      >
                        <ComparisonSide
                          lado1={{ label: "Carbon", content: "Shorthand for CO2-equivalent (includes all GHG)" }}
                          lado2={{ label: "Emissions", content: "Broader: all air pollutants (CO2, CH4, NOx, etc)" }}
                        />
                      </AlertBox>
                      <AlertBox tipo="warning"
                        titulo="Confusão #2: Net-Zero ≠ Zero Absoluto"
                        
                      >
                        <ComparisonSide
                          lado1={{ label: "Net-Zero", content: "Reduce 80%, offset 20% = net zero (achievable)" }}
                          lado2={{ label: "Zero", content: "0% emissions (impossible for fossil fuels)" }}
                        />
                      </AlertBox>
                      <AlertBox tipo="info" titulo="Dica #3: Scope 3 é o MAIOR Problema"><p>Para oil company, quando cliente queima o combustível, emissões são enormes. Escopo 3 &gt;&gt; Escopo 1+2. Net-zero deve incluir Scope 3.</p></AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            <div className="space-y-4">
              <h4 className="font-bold text-lg">FlipCards: Termos Ambientais</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FlipCard
                  frente="Carbon Footprint"
                  verso="Medida total de emissões de GHG em tCO2e. Inclui Scopes 1, 2, 3. Ex: 'Our carbon footprint: 8 tCO2e per barrel.'"
                />
                <FlipCard
                  frente="Scope 1 Emissions"
                  verso="Emissões diretas da própria operação (queimadores, compressores, flares). Ex: 'Scope 1: 2M tCO2e from platform operations.'"
                />
                <FlipCard
                  frente="Scope 2 Emissions"
                  verso="Emissões indiretas da eletricidade comprada. Dependem da matriz energética. Ex: 'Scope 2: reduce by switching to renewable electricity.'"
                />
                <FlipCard
                  frente="Scope 3 Emissions"
                  verso="Emissões da cadeia de valor (combustão do produto). Maior para oil company. Ex: 'Scope 3: emissions when customer burns our product.'"
                />
                <FlipCard
                  frente="Net-Zero"
                  verso="Emissões líquidas zero (redução + remoção = zero). Não é zero absoluto. Ex: 'Net-zero by 2050: reduce 80%, offset 20%.'"
                />
                <FlipCard
                  frente="Carbon Capture & Storage"
                  verso="CCS. Captura CO2 e injeta 2km profundo para armazenamento permanente. Ex: 'CCS project: 2M tCO2/year captured and sequestered.'"
                />
              </div>
            </div>
          </section>

          <ModuleConsolidation
            numero={6}
            variant={mv[6]}
            onComplete={() => handleModuleComplete("modulo-6")}
            maceteVisual={{
              title: "Environmental Terms - Carbon Footprint & ESG",
              content: (
                <div className="space-y-2">
                  <p><strong>Carbon Footprint:</strong> Total greenhouse gas emissions from operations - measured in CO2 equivalents</p>
                  <p><strong>ESG (Environmental, Social, Governance):</strong> Framework assessing corporate responsibility beyond profit</p>
                  <p><strong>Renewable Energy:</strong> Solar, wind, hydro sources that replenish - shift from fossil fuels</p>
                  <p><strong>CCS (Carbon Capture & Storage):</strong> Capture CO2 and inject 2km deep for permanent sequestration</p>
                </div>
              ),
            }}
          >
            <QuizInterativo
              questoes={quizM6}
              numero={1}
              onComplete={() => handleModuleComplete("modulo-6")}
            />
          </ModuleConsolidation>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 7: MANAGEMENT & PROJECTS ═══ */}
      <TabsContent value="modulo-7">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={7}
            titulo="Management & Projects (KPI, Milestone, Scope)"
            variant={mv[7]}
            />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              titulo="Project Management: Acompanhando o Progresso"
              />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Projetos em Petrobras são gigantescos: bilhões de dólares, 5-10 anos, milhares de pessoas. Gerenciar tudo requer framework de KPIs (métricas de sucesso), milestones (pontos de verificação), scope (o que está incluído), e deliverables (o que será entregue). Um projeto sem KPI é como navegar sem bússola — você não sabe se está indo bem. Um projeto sem milestones é caótico — ninguém sabe o que vem próximo. Vocabulário de gestão é testado porque entrevistadores querem candidatos que entendem planejamento.
              </p>

              <p>
                <strong>KPI (Key Performance Indicator):</strong> Métrica que mede sucesso. Para projeto upstream: "Complete drilling 2 months ahead of schedule" (tempo), "Maintain safety with zero LTI" (segurança = Lost Time Injury), "Deliver within CAPEX budget ±5%" (custo), "Achieve 90,000 bbl/d production target" (desempenho). Cada KPI tem owner (responsável) e target (número específico). Se KPI não é atingido, projeto é problema.
              </p>

              <p>
                <strong>Milestone:</strong> Ponto-chave de verificação no cronograma. Exemplo: "Jan 2024: Permitting complete", "Mar 2024: Platform piles installed", "Jun 2024: Topsides on deck", "Sep 2024: First oil". Cada milestone tem predecessors (o que deve vir antes) e successors (o que vem depois). Delay em um milestone cascata para todos depois.
              </p>

              <p>
                <strong>Scope:</strong> Definição de O QUE está incluído no projeto. Exemplo: "Scope = drill 50 wells, install platform, build 200-km pipeline, NOT including refining or distribution". Scope creep (adicionar coisas depois) é problema comum — aumenta custo, atrasa prazo. Formal change control: proposição de mudança de escopo deve ser aprovada pelo PMO (Project Management Office).
              </p>

              <p>
                <strong>Deliverable:</strong> Qualquer coisa tangível que o projeto entrega. Podem ser: Documentos (engineering drawings, manuals, reports), Infraestrutura (plataforma, pipeline, refinaria), Serviços (treinamento, operação), Capacidade (50,000 bbl/d of production). Cada deliverable tem acceptance criteria (como sabemos que está "pronto").
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Project Framework</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-blue-700 dark:text-blue-300">KPI</div>
                    <div className="text-xs mt-1">Metric of success: time, cost, safety, performance. Must be specific, measurable.</div>
                  </div>
                  <div>
                    <div className="font-semibold text-purple-700 dark:text-purple-300">Milestone</div>
                    <div className="text-xs mt-1">Key checkpoint in schedule. Date-specific, binary (done or not).</div>
                  </div>
                  <div>
                    <div className="font-semibold text-indigo-700 dark:text-indigo-300">Scope</div>
                    <div className="text-xs mt-1">Definition of what's included. Formal change control for additions.</div>
                  </div>
                  <div>
                    <div className="font-semibold text-pink-700 dark:text-pink-300">Deliverable</div>
                    <div className="text-xs mt-1">Tangible output: documents, infrastructure, services, capacity. Must meet acceptance criteria.</div>
                  </div>
                </div>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "① Conceituação: Project Governance",
                  icone: <LuBookOpen className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4 text-base leading-relaxed">
                      <p>
                        <strong>KPI Definition:</strong> Cada KPI deve ter: Owner (quem é responsável), Target (número específico), Baseline (onde estamos agora), Timeline (quando será medido). Exemplo KPI: "Complete first oil production by Q4 2025 (vs baseline Q1 2026)". Se você completa em Jul 2025, você está "ahead of schedule". Se completa em Dez 2026, está "behind schedule".
                      </p>
                      <p>
                        <strong>Milestone Schedule:</strong> Tipicamente em Gantt chart (cronograma visual). Milestones são eventos binários (100% completo ou não). Exemplos: "Permitting approved", "Environmental impact assessment complete", "Financing secured", "Engineering finalized", "Procurement open bid", "Installation complete", "Testing & commissioning", "First oil", "Ramp-up complete". Critical path = sequência de milestones que determina prazo total.
                      </p>
                      <p>
                        <strong>Scope Definition:</strong> Deve incluir: Inclusions (o que ESTÁ no projeto), Exclusions (o que NÃO está), Assumptions (coisas que presumimos ser verdadeiras), Constraints (limitações). Exemplo Exclusions: "Refining and marketing NOT included in this scope." Exemplo Assumption: "Permitting will be complete by Jan 2024." Exemplo Constraint: "Budget max US$ 2 billion."
                      </p>
                      <p>
                        <strong>Deliverable Acceptance:</strong> Cada deliverable tem criteria específico. Exemplo: "Platform installation deliverable accepted when: (1) structural inspection 100% complete and approved, (2) all welds certified, (3) offshore hook-up testing complete, (4) handover documentation provided." Se qualquer critério não é atingido, deliverable é rejected (rejeitado).
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "② Exemplificação: PM in Context",
                  icone: <LuPlay className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <p className="font-semibold">1. KPI Tracking</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "Project KPIs: (1) Schedule: Complete first oil by Q4 2025, (2) Cost: Deliver within $2B ±5%, (3) Safety: Zero LTI, (4) Quality: 100% inspection compliance."
                        </p>
                      </div>
                      <div className="border-l-4 border-purple-500 pl-4">
                        <p className="font-semibold">2. Milestone Delay</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "The platform installation milestone (originally Q2 2024) was delayed to Q3 due to weather. This cascaded to push first oil from Q4 2025 to Q1 2026."
                        </p>
                      </div>
                      <div className="border-l-4 border-indigo-500 pl-4">
                        <p className="font-semibold">3. Scope Change</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "A change request proposed adding water treatment to scope. PMO evaluated: +$50M cost, +6 months schedule. Approved by steering committee on Nov 2023."
                        </p>
                      </div>
                      <div className="border-l-4 border-pink-500 pl-4">
                        <p className="font-semibold">4. Deliverable Rejection</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "Pipeline inspections found 3 critical welds that didn't meet specifications. Deliverable was rejected; contractor reworked and resubmitted."
                        </p>
                      </div>
                      <div className="border-l-4 border-indigo-600 pl-4">
                        <p className="font-semibold">5. Cost Control</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "Monthly cost tracking shows project is tracking 8% over budget YTD. If trend continues, expect final cost overrun of $160M. Mitigation strategies implemented."
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "③ Dicas: PM Vocabulary",
                  icone: <LuLightbulb className="w-5 h-5" />,
                  conteudo: (
                    <CardCarousel
                      cards={[
                        {
                          titulo: "KPI = Métrica Específica",
                          descricao: "Deve ter owner, target, baseline, timeline. Exemplo: 'Deliver first oil by Q4 2025'.",
                          exemplo: "✓ KPI: Zero LTI (lost-time injuries) and complete permitting by Dec 2023",
                        },
                        {
                          titulo: "Milestone = Ponto de Verificação",
                          descricao: "Data-specific, binary (completo ou não). Afeta cronograma.",
                          exemplo: "✓ Milestone: Platform installation complete (originally Q2 2024, now Q3)",
                        },
                        {
                          titulo: "Scope = O Que Está Incluído",
                          descricao: "Formal definition. Inclusions, exclusions, assumptions, constraints.",
                          exemplo: "✓ Scope: drill 50 wells and install platform (NOT including refining)",
                        },
                        {
                          titulo: "Deliverable = Saída Tangível",
                          descricao: "Documento, infraestrutura, serviço, capacidade. Com acceptance criteria.",
                          exemplo: "✓ Deliverable: 200-km pipeline (accepted when inspected 100% and certified)",
                        },
                        {
                          titulo: "Critical Path = Prazo Total",
                          descricao: "Sequência de milestones que determina quanto tempo o projeto leva.",
                          exemplo: "✓ Critical path: Permitting → Design → Procurement → Construction → First oil",
                        },
                        {
                          titulo: "Scope Creep = Problema Comum",
                          descricao: "Adicionar coisas depois = aumento de custo e atraso. Requer formal change control.",
                          exemplo: "✓ Scope creep: added water treatment (+$50M, +6 months) mid-project",
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
                      <AlertBox tipo="danger"
                        titulo="Confusão #1: Milestone vs Deliverable"
                        
                      >
                        <ComparisonSide
                          lado1={{ label: "Milestone", content: "Oct 2024: Platform installation complete (TIME)" }}
                          lado2={{ label: "Deliverable", content: "Offshore platform 100% ready (THING)" }}
                        />
                      </AlertBox>
                      <AlertBox tipo="warning"
                        titulo="Confusão #2: Target vs Baseline"
                        
                      >
                        <ComparisonSide
                          lado1={{ label: "Baseline", content: "Current: schedule slippage 2 months" }}
                          lado2={{ label: "Target", content: "Goal: eliminate slippage, deliver on time" }}
                        />
                      </AlertBox>
                      <AlertBox tipo="info" titulo="Dica #3: Crítico vs Não-Crítico"><p>Milestone no Critical Path = atraso cascata. Milestone não-crítico = float (margem de atraso sem impacto no prazo total).</p></AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            <div className="space-y-4">
              <h4 className="font-bold text-lg">FlipCards: Termos de Gestão</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FlipCard
                  frente="KPI"
                  verso="Key Performance Indicator. Métrica específica de sucesso (tempo, custo, segurança, desempenho). Ex: 'KPI: deliver within $2B ±5% budget.'"
                />
                <FlipCard
                  frente="Milestone"
                  verso="Ponto de verificação no cronograma. Date-specific, binary. Ex: 'Milestone: First oil production by Q4 2025.'"
                />
                <FlipCard
                  frente="Scope"
                  verso="Definição de o que está incluído no projeto. Formal, com inclusions/exclusions. Ex: 'Scope: drill wells and install platform (NOT refining).'"
                />
                <FlipCard
                  frente="Deliverable"
                  verso="Saída tangível: documento, infraestrutura, serviço, capacidade. Com acceptance criteria. Ex: 'Deliverable: 200-km pipeline (certified and inspected 100%).'"
                />
                <FlipCard
                  frente="Critical Path"
                  verso="Sequência de milestones que determina prazo total. Atraso em critical path = atraso geral. Ex: 'Critical path: Permitting → Design → Build → First oil.'"
                />
                <FlipCard
                  frente="Scope Creep"
                  verso="Adição de itens depois de escopo fechado. Aumenta custo e atrasa prazo. Requer formal change control. Ex: 'Scope creep: added $50M water treatment mid-project.'"
                />
              </div>
            </div>
          </section>

          <ModuleConsolidation
            numero={7}
            variant={mv[7]}
            onComplete={() => handleModuleComplete("modulo-7")}
            maceteVisual={{
              title: "Management & Projects - KPI, Milestone & Scope",
              content: (
                <div className="space-y-2">
                  <p><strong>KPI (Key Performance Indicator):</strong> Measurable metric tracking progress toward goals - e.g., production rate, safety incidents</p>
                  <p><strong>Milestone:</strong> Significant project checkpoint - approval stage, equipment delivery, operational startup</p>
                  <p><strong>Critical Path:</strong> Sequence of milestones determining total duration - delay here = overall project delay</p>
                  <p><strong>Scope Creep:</strong> Uncontrolled addition of items after scope closure - increases cost and schedule</p>
                </div>
              ),
            }}
          >
            <QuizInterativo
              questoes={quizM7}
              numero={1}
              onComplete={() => handleModuleComplete("modulo-7")}
            />
          </ModuleConsolidation>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 8: PROCUREMENT & CONTRACTS ═══ */}
      <TabsContent value="modulo-8">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={8}
            titulo="Procurement & Contracts (Tender, Bid, Liability)"
            variant={mv[8]}
            />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              titulo="Procurement: Gerenciando a Cadeia de Suprimento"
              />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Procurement representa 40-50% dos custos totais de um projeto Petrobras. Para um projeto de US$ 2 bilhões, US$ 800M+ vão para compras de equipamento, contratação de serviços, construção. O processo é rigidamente formal: transparência, competição, compliance. Qualquer desvio resulta em investigação, multas, execução ou desempenho contratual. Este módulo apresenta vocabulário crítico: tender (licitação), bid (proposta), contract (contrato), liability (responsabilidade legal).
              </p>

              <p>
                <strong>Tender:</strong> Processo formal de licitação. Petrobras publica tender documents (especificações técnicas, termos comerciais, cronograma, requisitos de qualificação). Fornecedores respondem com bid (proposta) contendo preço, prazos, metodologia. Avaliação: técnica (é capaz?) + comercial (quem é mais barato?). Vencedor é informado; perdedores podem protestar em tribunal.
              </p>

              <p>
                <strong>Bid:</strong> Proposta formal de fornecedor ao tender. Deve incluir: preço (lump sum ou unit rate?), cronograma (quando entrega?), metodologia (como você vai fazer?), organização (quem faz?), qualificações (experiência anterior?). Um bid bem escrito = maior chance de ganhar. Bid ruins = desqualificação imediata.
              </p>

              <p>
                <strong>Contract:</strong> Acordo vinculante entre Petrobras (cliente) e contractor (fornecedor). Define: Scope (o quê), Schedule (quando), Price (quanto), Liability (quem paga se algo der errado), Insurance (coberturas obrigatórias), Warranty (garantia de performance). Contracts variam: lump sum (preço fixo, risco para contractor), cost-plus (custo + margem, risco para cliente), time & materials (horário + materiais).
              </p>

              <p>
                <strong>Liability:</strong> Responsabilidade legal por danos, atrasos, não-conformidade. Exemplo: "Contractor é responsável por acidentes de seus trabalhadores até US$ 10M. Petrobras é responsável por design errors até US$ 50M." Se contractor não entrega no prazo, Petrobras pode aplicar penalties (multa por dia de atraso). Se Petrobras não paga, contractor pode parar o trabalho ou processar judicialmente.
              </p>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-lg border border-amber-200 dark:border-amber-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Procurement Cycle</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-amber-700 dark:text-amber-300">Tender Publication</div>
                    <div className="text-xs mt-1">Formal RFQ/RFP with specs, terms, timeline, qualification requirements</div>
                  </div>
                  <div>
                    <div className="font-semibold text-orange-700 dark:text-orange-300">Bid Submission</div>
                    <div className="text-xs mt-1">Vendors submit proposals: price, schedule, methodology, qualifications</div>
                  </div>
                  <div>
                    <div className="font-semibold text-yellow-700 dark:text-yellow-300">Evaluation & Award</div>
                    <div className="text-xs mt-1">Technical + commercial assessment. Winner announced; losers can protest.</div>
                  </div>
                  <div>
                    <div className="font-semibold text-red-700 dark:text-red-300">Contract & Execution</div>
                    <div className="text-xs mt-1">Contract signed. Work begins. Liability, penalties, insurance defined.</div>
                  </div>
                </div>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "① Conceituação: Procurement Process",
                  icone: <LuBookOpen className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4 text-base leading-relaxed">
                      <p>
                        <strong>Tender Documents:</strong> Publicação formal que define: RFQ (Request for Quotation — simples) ou RFP (Request for Proposal — complexo). Inclui: Scope of work (o quê exatamente), Schedule (cronograma esperado), Site conditions (onde será, que desafios tem), Qualification requirements (que experiência você precisa ter), Commercial terms (pagamento, currency, insurance), Evaluation criteria (técnico 60%, comercial 40%, exemplo). Deadline para bid submission — depois disso, não aceita mais.
                      </p>
                      <p>
                        <strong>Bid Preparation:</strong> Vendedor estuda tender 4-8 semanas. Prepara: Executive summary (resumo 1 pág), Metodologia técnica (como você faz?), Cronograma detalhado (Gantt chart), Preço (item by item breakdown), Qualificações (referências de clientes anteriores), Insurances (provas de cobertura), Finance (quem está financiando, capacidade financeira).
                      </p>
                      <p>
                        <strong>Evaluation:</strong> Petrobras monta comitê (técnico, comercial, legal). Avalia cada bid em duas frentes: Técnico (é tecnicamente viável? Quem faz? Experiência?) e Comercial (quem é mais barato? Que termos comerciais melhor para Petrobras?). Bid tecnicamente inaceitável é desqualificado (mesmo que mais barato). Bid com falhas menores recebem "desvios aceitos".
                      </p>
                      <p>
                        <strong>Contract Terms:</strong> Vencedor negocia contrato. Termos típicos: (1) Scope = design, supply, install, test, commission; (2) Schedule = 18 meses com milestones; (3) Price = US$ 50M lump sum (fixo); (4) Warranty = 12 meses de operação sem custos ao cliente; (5) Liability = Contractor responsável por acidentes &lt;US$10M, acima disso Petrobras assume; (6) Penalties = 0.5% por semana de atraso, máximo 10%.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "② Exemplificação: Procurement Cases",
                  icone: <LuPlay className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="border-l-4 border-amber-500 pl-4">
                        <p className="font-semibold">1. Tender Publication</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "Tender for platform jacket fabrication published: Scope=design+FAB+ship, Schedule=24 months, Price ceiling=$200M, Bid deadline=60 days."
                        </p>
                      </div>
                      <div className="border-l-4 border-orange-500 pl-4">
                        <p className="font-semibold">2. Competitive Bidding</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "Three vendors submitted bids: Vendor A=$180M (delayed schedule +3 months), Vendor B=$210M (on time, proven), Vendor C=$150M (unqualified). Vendor B selected."
                        </p>
                      </div>
                      <div className="border-l-4 border-yellow-500 pl-4">
                        <p className="font-semibold">3. Contract Negotiation</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "Contract finalized: Lump sum $210M, schedule 24 months, warranty 12 months, penalty 0.5%/week (max 10%), liability split $20M Petrobras/$190M Contractor."
                        </p>
                      </div>
                      <div className="border-l-4 border-red-500 pl-4">
                        <p className="font-semibold">4. Performance Issue</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "Contractor missed fabrication milestone by 8 weeks. Penalty applied: 0.5% × 8 weeks = 4% of contract = $8.4M deducted from payment."
                        </p>
                      </div>
                      <div className="border-l-4 border-pink-500 pl-4">
                        <p className="font-semibold">5. Change Order</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "Client requested design change mid-fabrication. Contractor submitted change order: +$5M cost, +6 weeks schedule. Petrobras approved; contract amended."
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "③ Dicas: Procurement Vocabulary",
                  icone: <LuLightbulb className="w-5 h-5" />,
                  conteudo: (
                    <CardCarousel
                      cards={[
                        {
                          titulo: "Tender = Licitação Formal",
                          descricao: "Publicação pública com specs, termos, cronograma. Requer bid competitivo.",
                          exemplo: "✓ Tender published: design+build+commission platform (deadline 60 days)",
                        },
                        {
                          titulo: "Bid = Proposta Formal",
                          descricao: "Resposta de vendedor. Inclui: preço, cronograma, metodologia, qualificações.",
                          exemplo: "✓ Bid: $180M, 24-month schedule, proven methodology, 15-year experience",
                        },
                        {
                          titulo: "Contract = Acordo Vinculante",
                          descricao: "Define: scope, schedule, price, liability, warranty, insurance, penalties.",
                          exemplo: "✓ Contract: Lump sum $180M, 24 months, 0.5%/week penalty, 12-month warranty",
                        },
                        {
                          titulo: "Liability = Responsabilidade Legal",
                          descricao: "Quem paga se algo der errado. Divido entre Petrobras e contractor.",
                          exemplo: "✓ Contractor liable for accidents <$10M; Petrobras liable for design errors",
                        },
                        {
                          titulo: "Lump Sum = Preço Fixo",
                          descricao: "Contractor assume risco. Se custa mais, contractor perde. Petrobras protegida.",
                          exemplo: "✓ Lump sum contract: $200M fixed price (contractor bears cost overrun risk)",
                        },
                        {
                          titulo: "Change Order = Mudança Contratual",
                          descricao: "Adiciona escopo depois de contrato. Requer aprovação. Aumenta custo/prazo.",
                          exemplo: "✓ Change order: add stainless steel (+$5M, +4 weeks), approved by client",
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
                      <AlertBox tipo="danger"
                        titulo="Confusão #1: Tender vs Bid"
                        
                      >
                        <ComparisonSide
                          lado1={{ label: "Tender (convite)", content: "Petrobras publishes: design+build platform" }}
                          lado2={{ label: "Bid (resposta)", content: "Vendor responds: we'll do it for $180M in 24 months" }}
                        />
                      </AlertBox>
                      <AlertBox tipo="warning"
                        titulo="Confusão #2: Contract vs Change Order"
                        
                      >
                        <ComparisonSide
                          lado1={{ label: "Contract", content: "Original scope: drill 50 wells" }}
                          lado2={{ label: "Change Order", content: "Add: drill 10 more wells (+$50M, +8 weeks)" }}
                        />
                      </AlertBox>
                      <AlertBox tipo="info" titulo="Dica #3: Liability é DIVISÃO de Risco"><p>Contractor não assume TUDO. Risco dividido: contractor = execução, Petrobras = design/site. Isso é típico.</p></AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            <div className="space-y-4">
              <h4 className="font-bold text-lg">FlipCards: Termos de Procurement</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FlipCard
                  frente="Tender"
                  verso="Publicação formal de licitação. Especifica scope, schedule, cronograma, requisitos. Ex: 'Tender for jacket fabrication (deadline 60 days).'"
                />
                <FlipCard
                  frente="Bid"
                  verso="Proposta de vendedor em resposta a tender. Inclui preço, cronograma, metodologia, qualificações. Ex: 'Bid: $180M, 24 months, proven experience.'"
                />
                <FlipCard
                  frente="RFQ/RFP"
                  verso="Request for Quotation (simples) ou Request for Proposal (complexo). Tipos de publicação de tender. Ex: 'RFP: design+build+commission.'"
                />
                <FlipCard
                  frente="Contract"
                  verso="Acordo vinculante com vendor. Define scope, schedule, price, liability, warranty, penalties. Ex: 'Contract: lump sum $200M, 24 months, 0.5%/week penalty.'"
                />
                <FlipCard
                  frente="Lump Sum"
                  verso="Preço fixo. Contractor assume risco de custo excessivo. Petrobras protegida. Ex: 'Lump sum $200M (contractor absorbs overruns).'"
                />
                <FlipCard
                  frente="Change Order"
                  verso="Mudança contratual depois de assinatura. Aumenta custo/prazo. Requer aprovação. Ex: 'Change order: add stainless steel (+$5M, +4 weeks).'"
                />
              </div>
            </div>
          </section>

          <ModuleConsolidation
            numero={8}
            variant={mv[8]}
            onComplete={() => handleModuleComplete("modulo-8")}
            maceteVisual={{
              title: "Procurement & Contracts - Tender, Bid & Liability",
              content: (
                <div className="space-y-2">
                  <p><strong>Tender:</strong> Formal invitation to suppliers for competitive bids - establishes quality, timeline, and cost expectations</p>
                  <p><strong>Bid:</strong> Proposal submitted by vendor - includes technical approach, timeline, and pricing</p>
                  <p><strong>Liability:</strong> Legal responsibility for damage or failure - defined in contract with penalties for non-performance</p>
                  <p><strong>Lump Sum:</strong> Fixed price contract - contractor assumes cost overrun risk, Petrobras is protected</p>
                </div>
              ),
            }}
          >
            <QuizInterativo
              questoes={quizM8}
              numero={1}
              onComplete={() => handleModuleComplete("modulo-8")}
            />
          </ModuleConsolidation>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 9: VOCABULÁRIO EM CONTEXTO PETROBRAS ═══ */}
      <TabsContent value="modulo-9">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={9}
            titulo="Vocabulary in Petrobras Context (Technical Integration)"
            variant={mv[9]}
            />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              titulo="Integrando Tudo: Vocabulary in Real Business Scenarios"
              />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Agora que você domina os 8 domínios técnicos, é hora de integrar tudo em cenários realistas. CESGRANRIO não testa "defina CAPEX" em contexto vazio. Em vez disso, apresenta parágrafos longos (150-300 palavras) misturando vocabulário de múltiplos domínios e exigindo que você reconheça significados por contexto. Este módulo apresenta 4 tipos de documentos reais (contraído para proteção de propriedade intelectual) que você encontrará:
              </p>

              <p>
                1. <strong>Operational Reports:</strong> Documento diário/semanal descrevendo atividades de produção. Usa upstream vocabulary (wells, production rate bbl/d, reservoir pressure), HSE language (incidents, hazards, compliance), equipment specs (valve types, pump performance, pipeline specs).
              </p>

              <p>
                2. <strong>Project Proposals:</strong> Business case para novo investimento. Integra: upstream (field potential, reserve estimate), financial (CAPEX $2B, OPEX $30/bbl, Brent assumption $70), environmental (carbon footprint 8 tCO2e/bbl), management (KPIs, milestones, scope), procurement (tender strategy, contractor selection).
              </p>

              <p>
                3. <strong>Safety Bulletins:</strong> Comunicado de incidente/hazard. Usa: HSE vocabulary (near-miss, accident, hazard identification, PPE, incident investigation, corrective actions), equipment terms (específico que falhou), management language (KPIs for safety, compliance, training requirement).
              </p>

              <p>
                4. <strong>Bid Responses & Contracts:</strong> Documento de procurement. Integra: technical specs (equipment, performance, warranty), commercial terms (price, schedule, liability), project language (scope, deliverables, acceptance criteria), HSE commitments (safety record, insurance, training).
              </p>

              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Tipos de Documentos Petrobras</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-indigo-700 dark:text-indigo-300">Operational Report</div>
                    <div className="text-xs mt-1">Daily/weekly production status, incidents, compliance, equipment performance</div>
                  </div>
                  <div>
                    <div className="font-semibold text-blue-700 dark:text-blue-300">Project Proposal</div>
                    <div className="text-xs mt-1">Business case with technical, financial, environmental, management aspects</div>
                  </div>
                  <div>
                    <div className="font-semibold text-cyan-700 dark:text-cyan-300">Safety Bulletin</div>
                    <div className="text-xs mt-1">Incident description, hazard analysis, corrective actions, training implications</div>
                  </div>
                  <div>
                    <div className="font-semibold text-purple-700 dark:text-purple-300">Bid/Contract</div>
                    <div className="text-xs mt-1">Proposal with technical specs, commercial terms, HSE commitments</div>
                  </div>
                </div>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "① Conceituação: Integração de Domínios",
                  icone: <LuBookOpen className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4 text-base leading-relaxed">
                      <p>
                        <strong>Scenario 1 — Project Viability Assessment:</strong> "Our upstream team discovered a major field in the pre-sal with estimated 500 million barrels. To maximize efficiency and minimize carbon footprint, we will deploy new drilling rigs with advanced safety features (PPE, hazard controls, incident management). The project requires CAPEX $8 billion (platform, wells, pipeline) with OPEX $18/bbl. At Brent assumption $70/bbl, net margin $52/bbl generates NPV $15 billion over 20 years. We will release a competitive tender for jacket fabrication (specifications in RFP). All work must meet ISO 14001 environmental compliance, OHSAS 18001 safety standards, and net-zero scope 1+2 emissions target. Milestones: permitting Q1 2024, FID Q2 2024, drilling start Q4 2024, first oil Q4 2026."
                      </p>
                      <p>
                        <strong>Termos integrados:</strong> Upstream (field, pre-sal, drilling rigs, wells, pipeline), Financial (CAPEX, OPEX, Brent, NPV), Environmental (carbon footprint, net-zero, ISO 14001), HSE (PPE, hazard, incident management, OHSAS 18001), Management (KPI = net margin, milestones, scope implícito), Procurement (tender, RFP, jacket fabrication).
                      </p>
                      <p>
                        <strong>Scenario 2 — Safety Incident Response:</strong> "A near-miss occurred when a technician slipped on wet deck without proper PPE (safety boots required per SOP). Immediate investigation identified hazard: inadequate anti-slip coating + failure to follow PPE requirements. Corrective actions: (1) replace deck coating (equipment/procurement), (2) retrain all workers on HSE compliance (management/training), (3) implement checklist system (procedure). Timeline: actions complete within 15 days. This near-miss KPI (zero LTI target) was reported per incident management protocol within 24 hours."
                      </p>
                      <p>
                        <strong>Termos integrados:</strong> HSE (near-miss, PPE, SOP, hazard, incident management, KPI = zero LTI), Management (corrective actions, timeline, KPI), Procurement (coating replacement, supplier coordination implícita), Equipment (deck, anti-slip coating specification).
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "② Exemplificação: Real Documents (Paraphrased)",
                  icone: <LuPlay className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="border-l-4 border-indigo-500 pl-4">
                        <p className="font-semibold">1. Daily Operations Report</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "Production 95,000 bbl/d on schedule. Platform pressure nominal, all valves operating within spec. One near-miss (worker trip hazard); SOP review conducted. Cathodic protection system maintenance ongoing. No spills or environmental incidents. All personnel trained in HSE compliance. Equipment inspection 100% complete, no defects. Onshore pipeline transport to refinery nominal."
                        </p>
                      </div>
                      <div className="border-l-4 border-blue-500 pl-4">
                        <p className="font-semibold">2. Project Approval Memo</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "Development Plan approved: CAPEX $3.2B, OPEX $22/bbl, payback 6.5 years at Brent $65/bbl. Drilling to commence with 2 offshore rotary rigs. Platform design incorporates renewable energy (solar panels). Scope: drill 30 wells, install production topsides, 150-km pipeline to terminal. Milestones: drilling start Mar 2024, first oil Jan 2026. Tender for drilling services and jacket will open Q4 2023. Risk: Brent price below $60 makes project economically marginal."
                        </p>
                      </div>
                      <div className="border-l-4 border-cyan-500 pl-4">
                        <p className="font-semibold">3. Safety Alert</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "ALERT: H2S hazard detected in Sector B wellhead. All personnel must wear respirators (Class D PPE requirement). Site-wide incident investigation initiated. Corrective action: install additional sensors and emergency venting system (equipment change). Work order issued; estimated completion 5 days. Zero LTI target strictly maintained. Compliance: OHSAS 18001 audit scheduled."
                        </p>
                      </div>
                      <div className="border-l-4 border-purple-500 pl-4">
                        <p className="font-semibold">4. Tender Evaluation Summary</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "Three bids received for jacket fabrication RFP. Vendor A: $195M, 26-month schedule, proven record. Vendor B: $180M, delayed +4 weeks, unproven. Vendor C: $220M, on-time, superior quality. Evaluation committee recommends Vendor A: technically sound, commercial competitive, liability split favorable (Contractor &lt;$15M). Change order risk identified if client adds scope mid-fabrication; cost impact will be tracked."
                        </p>
                      </div>
                      <div className="border-l-4 border-pink-500 pl-4">
                        <p className="font-semibold">5. Sustainability Commitment</p>
                        <p className="text-sm text-foreground/80 mt-1">
                          "Our ESG strategy targets net-zero Scope 1+2 by 2050 and 25% carbon footprint reduction by 2030. Platform will use solar + wind renewable energy, reducing Scope 2 emissions 40%. Carbon capture project will sequester 500,000 tCO2/year. Investments in sustainable procurement: all equipment suppliers must meet ESG standards. Workforce diversity target: 40% women by 2030."
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "③ Dicas: Estratégia de Interpretação",
                  icone: <LuLightbulb className="w-5 h-5" />,
                  conteudo: (
                    <CardCarousel
                      cards={[
                        {
                          titulo: "1️⃣ Identifique o Tipo de Documento",
                          descricao: "É operacional (production report)? Projeto (proposal)? Segurança (safety bulletin)? Procurement (tender/bid)? Tipo define vocabulário esperado.",
                          exemplo: "✓ 'ALERT: near-miss incident' = tipo SAFETY document (expect: HSE vocabulary)",
                        },
                        {
                          titulo: "2️⃣ Reconheça Domínios Misturados",
                          descricao: "Um parágrafo pode misturar upstream + financial + environmental + management. Marque cada termo por domínio.",
                          exemplo: "✓ 'CAPEX $2B (financial), drilling (upstream), zero LTI (HSE), by Q4 2024 (management)'",
                        },
                        {
                          titulo: "3️⃣ Use Contexto para Significado",
                          descricao: "Se você não sabe uma palavra exata, leia ao redor. Contexto revela. 'Wellhead controls X' = wellhead é equipamento que controla fluxo.",
                          exemplo: "✓ Unknown term: 'manifold' + context 'manifold controls flow to pipeline' = manifold = distribuidor",
                        },
                        {
                          titulo: "4️⃣ Procure Números & Métricas",
                          descricao: "Números sinalizam contexto: 8 tCO2e/bbl = carbon metric, $50M = financial, 24 months = schedule, 100,000 bbl/d = production.",
                          exemplo: "✓ '500 million barrels' = reserve size (upstream)",
                        },
                        {
                          titulo: "5️⃣ Colocações Importam",
                          descricao: "'Deploy drilling rig', 'install valve', 'report incident', 'evaluate bid'. Verbo + noun patterns revelam relação.",
                          exemplo: "✓ 'tender for X' = tender = opportunity, 'bid for X' = bid = proposal",
                        },
                        {
                          titulo: "6️⃣ Trade-offs são Comuns",
                          descricao: "Projetos balanceiam: custo vs qualidade, prazo vs qualidade, lucro vs segurança. Reconheça essa tensão.",
                          exemplo: "✓ 'Cheaper bid BUT unproven' = trade-off: preço baixo vs risco técnico",
                        },
                      ]}
                    />
                  ),
                },
                {
                  titulo: "④ Estratégia CESGRANRIO",
                  icone: <LuTriangleAlert className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="info" titulo="Padrão CESGRANRIO: Texto Longo + 5 Alternativas"><p>Você recebe parágrafo de 150-300 palavras (operação, projeto, segurança, ou procurement). Pergunta pede: 'O texto implica que X é ...' ou 'A palavra Y neste contexto significa ...' Estratégia: leia o texto 2 vezes. Primeira = compreensão geral. Segunda = local da palavra-alvo + contexto imediato.</p></AlertBox>
                      <AlertBox tipo="warning"
                        titulo="Pegadinha Comum: Significado Literal vs Contextual"
                        
                      >
                        <ComparisonSide
                          lado1={{ label: "Literal", content: "'Platform' = elevated stage for speeches" }}
                          lado2={{ label: "Contextual (CESGRANRIO)", content: "'The offshore platform produces 100,000 bbl/d' = production structure" }}
                        />
                      </AlertBox>
                      <AlertBox tipo="success" titulo="Estratégia Vencedora: Eliminate Impossibilities"><p>Se opção A (significado literal) não faz sentido no contexto, elimine. Se opção B (sinônimo incorreto) é tecnicamente impossível, elimine. Sobram as plausíveis — escolha a mais específica ao contexto Petrobras.</p></AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            <div className="space-y-4">
              <h4 className="font-bold text-lg">Tabela de Referência: 200+ Termos por Domínio</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm mt-4">
                <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Upstream (M1)</h5>
                  <div className="text-xs space-y-1">Exploration, seismic survey, wildcat well, drilling, rig, borehole, casing, tubing, wellhead, perforation, reservoir, crude oil, extraction, production platform, offshore, onshore, bbl/d</div>
                </div>
                <div className="bg-orange-50 dark:bg-orange-950/20 rounded-lg p-4">
                  <h5 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">Downstream (M2)</h5>
                  <div className="text-xs space-y-1">Refinery, refining, distillation, crude oil fraction, gasoline, diesel, jet fuel, fuel oil, lubricant, petrochemical, cracking, processing, desulfurization, distribution terminal, retail</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-4">
                  <h5 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Equipment (M3)</h5>
                  <div className="text-xs space-y-1">Valve (ball, gate, check, relief, control), pump (centrifugal, positive displacement), pipe, pipeline, flange, compressor, turbine, motor, capacity, pressure rating, flow rate (GPM, bbl/d)</div>
                </div>
                <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-4">
                  <h5 className="font-semibold text-red-700 dark:text-red-300 mb-2">HSE (M4)</h5>
                  <div className="text-xs space-y-1">PPE, hard hat, gloves, respirator, harness, hazard, chemical, thermal, mechanical, incident, accident, near-miss, injury, spill, SOP, compliance, audit, KPI (zero LTI)</div>
                </div>
                <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4">
                  <h5 className="font-semibold text-green-700 dark:text-green-300 mb-2">Financial (M5)</h5>
                  <div className="text-xs space-y-1">Brent crude, WTI, barrel ($USD), price, revenue, CAPEX (capital expenditure), OPEX (operating expense), break-even, NPV, stakeholder, shareholder, dividend, margin</div>
                </div>
                <div className="bg-teal-50 dark:bg-teal-950/20 rounded-lg p-4">
                  <h5 className="font-semibold text-teal-700 dark:text-teal-300 mb-2">Environmental (M6)</h5>
                  <div className="text-xs space-y-1">Carbon footprint, tCO2e, emissions, GHG, Scope 1/2/3, net-zero, ESG, carbon capture & storage (CCS), renewable energy, solar, wind, just transition, circular economy</div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Management (M7)</h5>
                  <div className="text-xs space-y-1">KPI, milestone, scope, deliverable, acceptance criteria, schedule, critical path, Gantt chart, change order, scope creep, project manager, PMO, sponsor, stakeholder</div>
                </div>
                <div className="bg-amber-50 dark:bg-amber-950/20 rounded-lg p-4">
                  <h5 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">Procurement (M8)</h5>
                  <div className="text-xs space-y-1">Tender, RFQ, RFP, bid, proposal, contract, lump sum, cost-plus, liability, penalty, warranty, change order, supplier, vendor, evaluation, award</div>
                </div>
              </div>
            </div>
          </section>

          <ModuleConsolidation
            numero={9}
            variant={mv[9]}
            onComplete={() => handleModuleComplete("modulo-9")}
            maceteVisual={{
              title: "Vocabulary in Petrobras Context",
              content: (
                <div className="space-y-2">
                  <p><strong>Upstream/Downstream:</strong> Two main branches of oil business - exploration/extraction vs. refining/distribution</p>
                  <p><strong>Production Rate:</strong> Volume of oil/gas extracted measured in barrels per day (bbl/d) - critical operational metric</p>
                  <p><strong>Cost Per Barrel:</strong> OPEX divided by production - determines profitability at given oil prices</p>
                  <p><strong>First Oil:</strong> Milestone when commercial production starts - marks transition from development to revenue generation</p>
                </div>
              ),
            }}
          >
            <QuizInterativo
              questoes={quizM9}
              numero={1}
              onComplete={() => handleModuleComplete("modulo-9")}
            />
          </ModuleConsolidation>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 10: SIMULADO MESTRE ═══ */}
      <TabsContent value="modulo-10">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={10}
            titulo="Simulado Mestre (FINAL)"
            variant={mv[10]}
            />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              titulo="Simulado Mestre: Você Domina Vocabulário Técnico!"
              />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Parabéns! Você completou 8 módulos com 200+ termos técnicos Petrobras em contexto real. Agora é hora do teste final: simulado com questões estilo CESGRANRIO que misturam domínios, exigem interpretação contextual, e testam se você pode deduzir significado mesmo quando encontra termos desconhecidos. Este módulo apresenta a estratégia final em 8 passos + quiz de consolidação com 8 questões sorteadas de todas as categorias.
              </p>

              <p>
                <strong>A realidade:</strong> CESGRANRIO não testará "O que é upstream?" literalmente. Em vez disso, apresentará parágrafo sobre "descoberta de novo campo pré-sal com potencial de 500 milhões de barris" e perguntará: "Qual é o impacto PRINCIPAL desta descoberta?" (resposta: aumenta reservas, potencial de receita, justifica investimento CAPEX bilionário). Ou apresentará "A empresa decidiu não perfurar este campo porque Brent está US$ 50/bbl" e perguntará "Por que?" (resposta: break-even &gt; Brent atual, projeto economicamente inviável). Ou apresentará incidente com trabalhador lesionado e perguntará "Que categoria de PPE teria prevenido?" (resposta: reconhecer situação + causaroot + solução PPE).
              </p>

              <p>
                Seu objetivo: reconhecer vocabulário por colocação, contexto, padrão. Não precisa saber TUDO — precisa ser capaz de deduzir.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 p-6">
                <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <LuTarget className="w-5 h-5 text-emerald-600" />
                  8 Passos para Adivinhar Significado
                </h4>
                <div className="space-y-4">
                  <TimelineItem
                    step={1}
                    title="Identifique a Categoria"
                    description="O termo está relacionado a: equipamento? Processo? Pessoa? Substância? Risco? Financeiro? Gestão? Sustentabilidade? Procurement? Categoria restringe possibilidades."
                    example="Exemplo: 'The operator checked the wellhead pressure.' → Categoria: EQUIPAMENTO (wellhead)"
                  />
                  <TimelineItem
                    step={2}
                    title="Procure Cognatos Português"
                    description="Muitas palavras técnicas vêm do português ou latim. 'Perforation' ≈ 'perfuração', 'Reservoir' ≈ 'reservatório', 'Compliance' ≈ 'conformidade'."
                    example="Cognato: 'distillation' → 'destilação' → processo que separa"
                  />
                  <TimelineItem
                    step={3}
                    title="Use Contextual Clues"
                    description="Palavras ao redor revelam significado. Se vê 'valve controls flow', sabe que valve = algo que controla. Se vê 'Brent fell from 100 to 60', sabe que Brent = preço que flutua."
                    example="Clue: 'deploy drilling rigs' → deploy = colocar, rigs = estruturas → drilling rig = estrutura de perfuração"
                  />
                  <TimelineItem
                    step={4}
                    title="Elimine Opções Impossíveis"
                    description="Se frase é 'We installed a pump to move crude oil', opção 'pump = celebração da multidão' é impossível. Elimine. Sobra opção correta."
                    example="Impossível: 'The pump celebrates the crew' (nonsense) → Elimina qualquer opção abstrata"
                  />
                  <TimelineItem
                    step={5}
                    title="Reconheça Colocações"
                    description="Certas palavras sempre andam juntas: 'capital expenditure' (CAPEX), 'operating expense' (OPEX), 'break-even price', 'first oil', 'production platform'."
                    example="Colocação: 'offshore platform' (não 'offshore pump' ou 'offshore wellhead sozinho') = equipamento grande no mar"
                  />
                  <TimelineItem
                    step={6}
                    title="Considere a Lógica de Negócios"
                    description="Petrobras existe para produzir óleo de forma rentável e segura. Decisões respeitam: risco técnico, viabilidade econômica, conformidade HSE/ambiental. Que significado faz sentido nessa lógica?"
                    example="Se pergunta menciona atraso + CAPEX + Brent cai, lógica é: atraso aumenta custo, Brent baixo reduz receita, projeto fica economicamente inviável"
                  />
                  <TimelineItem
                    step={7}
                    title="Valide Contra Sentença Inteira"
                    description="Escolheu um significado? Substitua na frase original. Faz sentido? Se não, reconsidere. Significado correto deve se encaixar perfeitamente no contexto."
                    example="Significado testado: 'The valve [= device that controls flow] released pressure.' ✓ Faz sentido. Validado."
                  />
                  <TimelineItem
                    step={8}
                    title="Se Ainda Incerto, Escolha Mais Específico"
                    description="Se 2 opções parecem corretas, escolha aquela que é MAIS ESPECÍFICA ao contexto Petrobras/técnico, não a genérica."
                    example="Opção A: 'CAPEX = qualquer investimento' (genérico) vs Opção B: 'CAPEX = investimento em ativos de longa vida' (específico) → B é melhor"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-bold text-lg mb-4">Checklist Final: Você Está Pronto?</h4>
              <div className="space-y-3">
                <div className="flex gap-3 items-start">
                  <div className="text-lg">✓</div>
                  <div className="text-sm">Você reconhece 30+ termos upstream (exploration, drilling, reservoir, platform, bbl/d) em contexto?</div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="text-lg">✓</div>
                  <div className="text-sm">Você diferencia downstream (refining, distillation, cracking, petrochemical) de upstream?</div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="text-lg">✓</div>
                  <div className="text-sm">Você sabe que valve CONTROLA e pump MOVE fluido — equipamentos diferentes?</div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="text-lg">✓</div>
                  <div className="text-sm">Você compreende HSE prioridade = zero accidents, PPE não-negociável, incident reporting obrigatório?</div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="text-lg">✓</div>
                  <div className="text-sm">Você diferencia CAPEX (investimento inicial) de OPEX (custos diários) e entende break-even?</div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="text-lg">✓</div>
                  <div className="text-sm">Você reconhece ESG/net-zero não é zero absoluto — é redução + carbon removal?</div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="text-lg">✓</div>
                  <div className="text-sm">Você sabe que KPI, milestone, scope são coordenadas de projeto e colocações importam?</div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="text-lg">✓</div>
                  <div className="text-sm">Você diferencia tender (publicação) de bid (resposta) de contract (acordo vinculante)?</div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="text-lg">✓</div>
                  <div className="text-sm">Você consegue ler parágrafo de 200 palavras misturando 3-4 domínios e reconhecer significados por contexto?</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40 rounded-lg p-6 mt-8 border border-emerald-300 dark:border-emerald-700">
              <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                <LuCircleCheck className="w-5 h-5 text-emerald-600" />
                🏆 Você Domina Vocabulário Técnico Petrobras!
              </h4>
              <p className="text-sm leading-relaxed">
                Este é o top 30-40% do conteúdo de Inglês CESGRANRIO. Você aprendeu 200+ termos em 8 domínios críticos: Upstream, Downstream, Equipamentos, Segurança, Financeiro, Ambiental, Gestão e Procurement. Mais importante: você entende NÃO só definições, mas CONTEXTO — como estes termos se usam em cenários reais Petrobras. CESGRANRIO testará sua capacidade de ler parágrafos longos, reconhecer vocabulário por padrão, e deduzir significado mesmo com termos desconhecidos. Este módulo final consolida essa habilidade.
              </p>
            </div>
          </section>

          <ModuleConsolidation
            numero={10}
            variant={mv[10]}
            onComplete={() => handleModuleComplete("modulo-10")}
            maceteVisual={{
              title: "Master Simulator - Complete Petrobras Vocabulary",
              content: (
                <div className="space-y-2">
                  <p><strong>Domains Covered:</strong> Upstream (drilling, wellhead, tubing), Downstream (refinery, distillation), Equipment (pumps, valves, manifold)</p>
                  <p><strong>HSE & Business:</strong> Safety protocols (PPE, SOP, incident), Financial metrics (CAPEX, OPEX, NPV), Environmental responsibility (ESG, carbon footprint)</p>
                  <p><strong>Project Management:</strong> Procurement (tender, bid, contract), Execution (KPI, milestone, critical path, scope creep)</p>
                  <p><strong>Integration Test:</strong> Read 200+ word paragraphs mixing 3-4 domains and recognize meanings by context - the ultimate assessment</p>
                </div>
              ),
            }}
          >
            <QuizInterativo
              questoes={quizFinal}
              numero={1}
              onComplete={() => {
                handleModuleComplete("modulo-10");
                onComplete?.();
              }}
            />
          </ModuleConsolidation>
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}

