"use client";
import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  AlertBox,
  QuizInterativo,
  ModuleBanner,
  QuizQuestion,
  getRandomQuestions,
  AulaProps,
  CardCarousel,
  ContentAccordion,
  AulaTemplate,
  ModuleSectionHeader,
  ModuleConsolidation,
  FlipCard,
  Comparison,
  TimelineItem,
  ComparisonSide,
} from "../shared";
import { getModuleVariant } from "@/lib/moduleColors";

// Quizzes do arquivo de dados (SEPARADO):
import {
  QUIZ_GOVERNANCA_M1,
  QUIZ_GOVERNANCA_M2,
  QUIZ_GOVERNANCA_M3,
  QUIZ_GOVERNANCA_M4,
  QUIZ_GOVERNANCA_M5,
  QUIZ_GOVERNANCA_M6,
  QUIZ_GOVERNANCA_M7,
  QUIZ_GOVERNANCA_M8,
  QUIZ_GOVERNANCA_M9,
  QUIZ_GOVERNANCA_M10,
} from "./data/governanca-quizzes";

export default function AulaGovernanca({
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
    const STORAGE_KEY_PREFIX = "petrobras_quest_aula_ti_governanca_";

  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}active_tab`);
      return saved || "modulo-1";
    }
    return "modulo-1";
  });

  const [completedModules, setCompletedModules] = useState<Set<string>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}completed_modules`);
      if (saved) {
        try {
          const arr = JSON.parse(saved);
          return new Set(arr);
        } catch (e) {
          return new Set();
        }
      }
    }
    return new Set();
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}active_tab`, activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        `${STORAGE_KEY_PREFIX}completed_modules`,
        JSON.stringify(Array.from(completedModules))
      );
    }
  }, [completedModules]);

  const MODULE_DEFS = [
    { id: "modulo-1", label: "Módulo 1", titulo: "Conceitos e Alinhamento" },
    { id: "modulo-2", label: "Módulo 2", titulo: "COBIT 2019: Framework" },
    { id: "modulo-3", label: "Módulo 3", titulo: "ITIL 4: Gestão de Serviços" },
    { id: "modulo-4", label: "Módulo 4", titulo: "ISO/IEC 38500: Norma" },
    { id: "modulo-5", label: "Módulo 5", titulo: "PETI e PDTI: Estratégia" },
    {
      id: "modulo-6",
      label: "Módulo 6",
      titulo: "Gestão de Riscos (ISO 31000)",
    },
    { id: "modulo-7", label: "Módulo 7", titulo: "Conformidade e LGPD" },
    { id: "modulo-8", label: "Módulo 8", titulo: "Gestão de Terceiros e SLAs" },
    { id: "modulo-9", label: "Módulo 9", titulo: "BSC e Indicadores (KPIs)" },
    {
      id: "modulo-10",
      label: "Módulo 10",
      titulo: "Governança Ágil e Digital",
    },
  ];

  const totalModulos = MODULE_DEFS.length;

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) {
      setCompletedModules((prev) => {
        const n = new Set(prev);
        n.add(moduleId);
        return n;
      });
      const idx = MODULE_DEFS.findIndex((m) => m.id === moduleId);
      onUpdateProgress?.(Math.round(((idx + 1) / totalModulos) * 100));

      if (idx < totalModulos - 1) {
        setTimeout(() => setActiveTab(MODULE_DEFS[idx + 1].id), 1500);
      }
    }
  };

  useEffect(() => {
    if (currentProgress && currentProgress > 0) {
      const count = Math.floor((currentProgress / 100) * totalModulos);
      const s = new Set<string>();
      for (let i = 1; i <= count; i++) s.add(`modulo-${i}`);
      setCompletedModules(s);
    }
  }, [currentProgress, totalModulos]);

  // Pools de questões via getRandomQuestions
  const quizM1 = getRandomQuestions(QUIZ_GOVERNANCA_M1, 5);
  const quizM2 = getRandomQuestions(QUIZ_GOVERNANCA_M2, 5);
  const quizM3 = getRandomQuestions(QUIZ_GOVERNANCA_M3, 5);
  const quizM4 = getRandomQuestions(QUIZ_GOVERNANCA_M4, 5);
  const quizM5 = getRandomQuestions(QUIZ_GOVERNANCA_M5, 5);
  const quizM6 = getRandomQuestions(QUIZ_GOVERNANCA_M6, 5);
  const quizM7 = getRandomQuestions(QUIZ_GOVERNANCA_M7, 5);
  const quizM8 = getRandomQuestions(QUIZ_GOVERNANCA_M8, 5);
  const quizM9 = getRandomQuestions(QUIZ_GOVERNANCA_M9, 5);
  const quizM10 = getRandomQuestions(QUIZ_GOVERNANCA_M10, 5);

  // Variantes de cor pré-computadas — usa mv[N] ao invés de hardcodar getModuleVariant(N)

  const mv = Object.fromEntries(

    Array.from({ length: 10 }, (_, i) => [i + 1, getModuleVariant(i + 1)])

  ) as Record<number, ReturnType<typeof getModuleVariant>>;


  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      modules={MODULE_DEFS}
      completedModules={completedModules}
      isModuleUnlocked={(index) => true}
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
      {/* 🏁 MÓDULO 1: CONCEITOS E ALINHAMENTO */}
      <TabsContent value="modulo-1" className="mt-0">
        <ModuleBanner
          numero={1}
          titulo="Fundamentos e Governança vs Gestão"
          descricao="Entenda a diferença crucial entre dirigir a TI e operá-la no dia a dia."
          variant={mv[1]}
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index="INTRO"
              title="O Que é Governança de TI?"
              variant={mv[1]}
            />

            <ContentAccordion
              titulo="Conceituação - A Definição de Valor"
              icone="📖"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        A **Governança de TI** não é apenas sobre tecnologia; é
                        sobre como as organizações garantem que a TI suporte e
                        estenda as estratégias e objetivos da empresa. Na
                        Petrobras, isso significa alinhar investimentos em
                        digitalização de plataformas com a metas de segurança e
                        produção.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-blue-500/10 rounded-xl border border-blue-500/20">
                          <h4 className="font-bold text-blue-500 mb-2">
                            Visão Corporativa
                          </h4>
                          <p className="text-lg">
                            A Governança olha para fora e para o futuro,
                            garantindo compliance e retorno sobre investimento
                            (ROI).
                          </p>
                        </div>
                        <div className="p-6 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                          <h4 className="font-bold text-emerald-500 mb-2">
                            Visão Operacional
                          </h4>
                          <p className="text-lg">
                            A Gestão olha para dentro e para o presente, focando
                            em eficiência, SLAs e entrega de serviços.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-xl font-bold flex items-center gap-2">
                          <span className="p-2 bg-amber-500/20 rounded-lg text-amber-500 text-lg">
                            PROVA
                          </span>
                          Os 5 Pilares da Governança de TI
                        </h4>
                        <TimelineItem
                          passo={1}
                          titulo="Alinhamento Estratégico"
                          descricao="TI e Negócio falando a mesma língua."
                        />
                        <TimelineItem
                          passo={2}
                          titulo="Entrega de Valor"
                          descricao="Garantir que os benefícios prometidos sejam entregues."
                        />
                        <TimelineItem
                          passo={3}
                          titulo="Gestão de Riscos"
                          descricao="Preservar o valor da marca e dos ativos digitais."
                        />
                        <TimelineItem
                          passo={4}
                          titulo="Gestão de Recursos"
                          descricao="Otimizar infraestrutura e capital intelectual."
                        />
                        <TimelineItem
                          passo={5}
                          titulo="Mensuração de Desempenho"
                          descricao="Monitorar o progresso via KPIs e BSC."
                        />
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <ContentAccordion
              titulo="Exemplificação - Governança vs Gestão na Prática"
              icone="📚"
              corIndicador="bg-emerald-500"
              defaultOpen={false}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                      <Comparison
                        title="Diferenças Críticas para Concursos"
                        left={{
                          title: "Governança (Governing Body)",
                          content: "Diz O QUE a TI deve fazer",
                          description:
                            "Foco em EDM (Avaliar, Direcionar, Monitorar). Responsabilidade do Conselho.",
                          variant: "info",
                        }}
                        right={{
                          title: "Gestão (Management)",
                          content: "Diz COMO a TI deve fazer",
                          description:
                            "Foco em PBRM (Planejar, Construir, Executar, Monitorar). Responsabilidade do CIO.",
                          variant: "success",
                        }}
                      />

                      <div className="p-6 bg-muted rounded-xl bg-[#0a0a0a] text-white">
                        <p className="font-mono text-lg">
                          <span className="text-blue-400">
                            // Cenário Petrobras
                          </span>
                          <br />
                          A **Diretoria** (Governança) decide que a empresa
                          precisa ser zero emissões até 2050 (Estratégia).
                          <br />A **TI** (Gestão) implementa sensores IoT e
                          modelos de IA para otimizar o consumo de energia em
                          sondas (Execução).
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <ContentAccordion
              titulo="Estratégias e Insights de Prova"
              icone="💡"
              corIndicador="bg-amber-500"
              defaultOpen={false}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                      <div className="flex flex-wrap gap-4">
                        <FlipCard
                          frente={
                            <div className="space-y-2">
                              <span className="text-2xl">🔄</span>
                              <h5 className="font-bold">O que é EDM?</h5>
                              <p className="text-lg text-muted-foreground">
                                O Princípio da Governança na ISO 38500.
                              </p>
                            </div>
                          }
                          verso={
                            <div className="space-y-2">
                              <span className="text-2xl">✅</span>
                              <h5 className="font-bold">
                                Evaluate, Direct, Monitor
                              </h5>
                              <p className="text-lg text-muted-foreground">
                                Avaliar o uso atual, Direcionar a estratégia e
                                Monitorar a conformidade.
                              </p>
                            </div>
                          }
                        />
                        <FlipCard
                          frente={
                            <div className="space-y-2">
                              <span className="text-2xl">⚖️</span>
                              <h5 className="font-bold">Diferença Chave</h5>
                              <p className="text-lg text-muted-foreground">
                                Como não esquecer Governança vs Gestão.
                              </p>
                            </div>
                          }
                          verso={
                            <div className="space-y-2">
                              <span className="text-2xl">✅</span>
                              <h5 className="font-bold">Dono vs Empregado</h5>
                              <p className="text-lg text-muted-foreground">
                                O dono (Governança) dá o rumo; o empregado
                                (Gestão) faz o trabalho acontecer.
                              </p>
                            </div>
                          }
                        />
                      </div>

                      <AlertBox tipo="warning" titulo="⚠️ Pontos de Atenção - Cesgranrio">
                        A banca costuma dizer que o CIO é o responsável final
                        pela Governança de TI. **ERRADO!** O responsável final é
                        o **Corpo Diretivo / Conselho de Administração**. O CIO
                        lidera a **Gestão**.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            <ContentAccordion
              titulo="Exceções e Casos Limite"
              icone="⚠️"
              corIndicador="bg-red-500"
              defaultOpen={false}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                      <p className="text-md leading-relaxed">
                        Em empresas pequenas, os papéis de Governança e Gestão
                        podem ser exercidos pelas mesmas pessoas. No entanto,
                        para fins de concurso e para grandes empresas como a
                        Petrobras, a **Segregação de Funções** é mandatória para
                        evitar conflitos de interesse e fraudes.
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>
                          <strong>Shadow IT:</strong> Quando o negócio ignora a
                          governança e contrata serviços de nuvem por conta
                          própria.
                        </li>
                        <li>
                          <strong>Crise Aguda:</strong> Em desastres, a
                          Governança costuma ceder espaço temporário para a
                          Gestão de Crise (comando centralizado).
                        </li>
                      </ul>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          



<ModuleConsolidation
            index={2}
            variant={mv[1]}
            resumoVisual={{
              moduloNome: "Módulo 1",
              tituloAula: titulo,
              materia: materiaNome,
              images: [
                {
                  title: "Silos vs Integração",
                  type: "Infográfico",
                  placeholderColor: "blue",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Silos%20vs%20Integra%C3%A7%C3%A3o",
                },
                {
                  title: "Matriz EDM",
                  type: "Card",
                  placeholderColor: "emerald",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Matriz%20EDM",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "G-DOR: Síntese Estratégica",
              content: (
                <div className="space-y-4">
                  <p className="font-bold text-lg">
                    G-DOR: Governança = Direção, Operação = Rumo.
                  </p>
                  <p>
                    Lembre-se: Governança não põe a mão na massa, ela aponta o
                    dedo para onde a massa deve ir!
                  </p>
                </div>
              ),
            }}
            podcast={{
            aulaId: "governanca",
            aulaTitulo: "Governanca",
            materia: "Tecnologia da Informação",
            materiaId: "ti",
            moduloNumero: 1,
            moduloTitulo: "Módulo 1",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                    <QuizInterativo
            questoes={quizM1}
            titulo="QUIZ: Conceitos e Alinhamento"
            variant={mv[1]}
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          />
        </div>
      </TabsContent>

      {/* 🛠️ MÓDULO 2: COBIT 2019 */}
      <TabsContent value="modulo-2" className="mt-0">
        <ModuleBanner
          numero={2}
          titulo="COBIT 2019: O Framework de Referência"
          descricao="Aprenda a estruturar o sistema de governança usando o framework mais cobrado em provas de TI."
          variant={mv[2]}
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index="INTRO"
              title="Estrutura e Fatores de Design"
              variant={mv[2]}
            />

            <ContentAccordion
              titulo="Conceituação - Princípios do COBIT 2019"
              icone="📖"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        O **COBIT 2019** (Control Objectives for Information and
                        Related Technologies) não é uma regra rígida, mas um
                        **Framework**. Ele ajuda a construir um sistema de
                        governança baseado em 6 princípios fundamentais para o
                        sistema e 3 princípios para o framework.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                          {
                            t: "Valor Transparente",
                            d: "Entrega de valor aos stakeholders.",
                          },
                          {
                            t: "Abordagem Holística",
                            d: "Componentes interagindo entre si.",
                          },
                          {
                            t: "Sistema Dinâmico",
                            d: "Evolução conforme o negócio.",
                          },
                          {
                            t: "Distinção Gov/Gestão",
                            d: "Separa EDM de PBRM.",
                          },
                          {
                            t: "Sob Medida",
                            d: "Fatores de Design (Tailoring).",
                          },
                          {
                            t: "Cobertura de Ponta a Ponta",
                            d: "Toda a organização inclusa.",
                          },
                        ].map((p, i) => (
                          <div
                            key={i}
                            className="p-4 border border-border rounded-lg bg-muted/30"
                          >
                            <h5 className="font-bold text-lg text-blue-400">
                              {p.t}
                            </h5>
                            <p className="text-lg text-muted-foreground">
                              {p.d}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="p-6 bg-blue-500/5 border-l-4 border-blue-500 rounded-r-lg">
                        <h4 className="font-bold mb-2">
                          Fatores de Design (Tailoring)
                        </h4>
                        <p className="text-lg">
                          Diferente das versões anteriores, o COBIT 2019 permite
                          que a Petrobras ajuste a governança com base em:
                          **Estratégia, Objetivos de Negócio, Perfil de Risco,
                          Cenário de Ameaças, Cultura e Papel da TI.**
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <ContentAccordion
              titulo="Exemplificação - Domínios e Objetivos"
              icone="📚"
              corIndicador="bg-emerald-500"
              defaultOpen={false}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                      <CardCarousel
                        cards={[
                          {
                            titulo: "EDM (Governança)",
                            descricao: (
                              <div>
                                Foco em Avaliar, Direcionar e Monitorar. O nível
                                mais alto de decisão.
                              </div>
                            ),
                            icone: "👑",
                          },
                          {
                            titulo: "APO (Planejamento)",
                            descricao: (
                              <div>
                                Alinhar, Planejar e Organizar. Estratégia, risco
                                e custos.
                              </div>
                            ),
                            icone: "🗺️",
                          },
                          {
                            titulo: "BAI (Construção)",
                            descricao: (
                              <div>
                                Buscar, Adquirir e Implementar. Projetos,
                                mudanças e ativos.
                              </div>
                            ),
                            icone: "🏗️",
                          },
                          {
                            titulo: "DSS (Operação)",
                            descricao: (
                              <div>
                                Entregar (Delivery), Serviço e Suporte.
                                Incidentes e continuidade.
                              </div>
                            ),
                            icone: "🛠️",
                          },
                          {
                            titulo: "MEA (Monitoramento)",
                            descricao: (
                              <div>
                                Monitorar, Avaliar e Analisar. Performance e
                                conformidade externa.
                              </div>
                            ),
                            icone: "📊",
                          },
                        ]}
                      />

                      <div className="space-y-4">
                        <h4 className="font-bold">Ciclo de Implementação</h4>
                        <p className="text-lg">
                          No COBIT, a implementação segue o{" "}
                          <strong>Continuous Improvement</strong> em 7 fases,
                          desde o 'Quais são os drivers?' até 'Como mantemos o
                          fôlego?'.
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <ContentAccordion
              titulo="Dicas e pontos de atenção de Prova"
              icone="💡"
              corIndicador="bg-amber-500"
              defaultOpen={false}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                      <AlertBox tipo="info" titulo="📌 Padrão 2019 vs 5">
                        No COBIT 5 tínhamos 37 processos. No COBIT 2019 temos{" "}
                        <strong>40 Objetivos de Governança e Gestão</strong>. A
                        nomenclatura mudou de "Processo" para "Objetivo".
                      </AlertBox>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                          <p className="font-bold text-red-500">
                            ❌ Pontos de Atenção:
                          </p>
                          <p className="text-lg">
                            Achar que o COBIT é apenas para segurança. Ele é
                            para a <strong>TI INTEIRA</strong>, do código ao
                            hardware.
                          </p>
                        </div>
                        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                          <p className="font-bold text-emerald-500">
                            ✅ Foco Petrobras:
                          </p>
                          <p className="text-lg">
                            A Petrobras usa o COBIT para auditoria de TI e para
                            garantir que o dinheiro do contribuinte/acionista
                            não suma em projetos infinitos.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          



<ModuleConsolidation
            index={2}
            variant={mv[2]}
            resumoVisual={{
              moduloNome: "Módulo 2",
              tituloAula: titulo,
              materia: materiaNome,
              images: [
                {
                  title: "Os 40 Objetivos",
                  type: "Infográfico",
                  placeholderColor: "blue",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Os%2040%20Objetivos",
                },
                {
                  title: "Domínios de Gestão",
                  type: "Diagrama",
                  placeholderColor: "emerald",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Dom%C3%ADnios%20de%20Gest%C3%A3o",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Resumo Estrutural do COBIT",
              content: (
                <p>
                  Lembre-se: APO (Plano), BAI (Obra), DSS (Suporte), MEA
                  (Check).
                </p>
              ),
            }}
            podcast={{
            aulaId: "governanca",
            aulaTitulo: "Governanca",
            materia: "Tecnologia da Informação",
            materiaId: "ti",
            moduloNumero: 2,
            moduloTitulo: "Módulo 2",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                    <QuizInterativo
            questoes={quizM2}
            titulo="QUIZ: COBIT 2019: Framework"
            variant={mv[2]}
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          />
        </div>
      </TabsContent>

      {/* 📦 MÓDULO 3: ITIL 4 */}
      <TabsContent value="modulo-3" className="mt-0">
        <ModuleBanner
          numero={3}
          titulo="ITIL 4: Gestão de Serviços de TI"
          descricao="O foco mudou de processos para a co-criação de valor através de serviços."
          variant={mv[3]}
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index="INTRO"
              title="SVS e Cadeia de Valor"
              variant={mv[3]}
            />

            <ContentAccordion
              titulo="Conceituação - O Sistema de Valor de Serviço (SVS)"
              icone="📖"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        O **ITIL 4** abandonou o 'Ciclo de Vida' em favor de
                        algo mais fluido. O centro do ITIL 4 é o **Service Value
                        System (SVS)**, que mostra como todos os componentes da
                        organização trabalham juntos para criar valor.
                      </p>

                      <div className="space-y-6">
                        <h4 className="font-bold flex items-center gap-2 text-xl">
                          <span className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full text-lg">
                            5
                          </span>
                          Componentes do SVS
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="p-5 bg-card border border-border rounded-xl shadow-inner">
                            <h5 className="font-bold text-blue-500">
                              1. Princípios Orientadores
                            </h5>
                            <p className="text-lg">
                              Cultura e diretrizes (ex: 'Foco no Valor').
                            </p>
                          </div>
                          <div className="p-5 bg-card border border-border rounded-xl shadow-inner">
                            <h5 className="font-bold text-blue-500">
                              2. Governança
                            </h5>
                            <p className="text-lg">
                              Alinhamento com o sistema EDM.
                            </p>
                          </div>
                          <div className="p-5 bg-card border border-border rounded-xl shadow-inner">
                            <h5 className="font-bold text-blue-500">
                              3. Cadeia de Valor de Serviço
                            </h5>
                            <p className="text-lg">
                              Atividades operacionais (Planejar, Engajar, etc).
                            </p>
                          </div>
                          <div className="p-5 bg-card border border-border rounded-xl shadow-inner">
                            <h5 className="font-bold text-blue-500">
                              4. Práticas (ex-processos)
                            </h5>
                            <p className="text-lg">As 34 práticas de gestão.</p>
                          </div>
                        </div>
                        <div className="p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                          <h5 className="font-bold text-emerald-500 italic">
                            5. Melhoria Contínua
                          </h5>
                          <p className="text-lg text-emerald-700 dark:text-emerald-400">
                            Presente em todos os níveis do SVS.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <ContentAccordion
              titulo="Exemplificação - Cadeia de Valor e Práticas"
              icone="📚"
              corIndicador="bg-emerald-500"
              defaultOpen={false}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                      <Comparison
                        title="As 4 Dimensões da Gestão de Serviço"
                        left={{
                          title: "Organizações e Pessoas / Info e Tecnologia",
                          content: "Cultura e Sistemas",
                          description:
                            "Estrutura organizacional, competências e bancos de dados.",
                          variant: "info",
                        }}
                        right={{
                          title:
                            "Parceiros e Fornecedores / Fluxos e Processos",
                          content: "Relações e Eficiência",
                          description:
                            "Relacionamento com terceiros e cadeias de valor.",
                          variant: "success",
                        }}
                      />

                      <div className="space-y-4">
                        <h4 className="font-bold">Práticas Chaves p/ Prova:</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <li className="p-4 bg-muted rounded-lg border border-border">
                            <strong className="text-blue-500 underline">
                              Incidentes:
                            </strong>{" "}
                            Restaurar o serviço rápido!
                          </li>
                          <li className="p-4 bg-muted rounded-lg border border-border">
                            <strong className="text-blue-500 underline">
                              Problemas:
                            </strong>{" "}
                            Buscar a causa-raiz.
                          </li>
                          <li className="p-4 bg-muted rounded-lg border border-border">
                            <strong className="text-blue-500 underline">
                              Mudanças:
                            </strong>{" "}
                            Maximizar mudanças bem-sucedidas.
                          </li>
                          <li className="p-4 bg-muted rounded-lg border border-border">
                            <strong className="text-blue-500 underline">
                              Catálogo:
                            </strong>{" "}
                            Única fonte de info sobre serviços.
                          </li>
                        </ul>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <ContentAccordion
              titulo="Dicas de Ouro - ITIL 4"
              icone="💡"
              corIndicador="bg-amber-500"
              defaultOpen={false}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                      <div className="p-6 bg-amber-500/10 border-2 border-dashed border-amber-500 rounded-2xl">
                        <h5 className="font-bold text-amber-500 mb-2">
                          Mnemonic: FOCO NO P.E.C.A
                        </h5>
                        <ul className="text-lg space-y-1">
                          <li>
                            <strong>F</strong>oco no Valor
                          </li>
                          <li>
                            <strong>O</strong>timizar e Automatizar
                          </li>
                          <li>
                            <strong>C</strong>olaborar e Promover Visibilidade
                          </li>
                          <li>
                            <strong>O</strong>nde você está (Comece lá)
                          </li>
                        </ul>
                      </div>

                      <AlertBox tipo="warning" titulo="⚠️ pontos de atenção CESGRANRIO">
                        Diferente do V3, o ITIL 4 diz que o valor não é apenas
                        entregue (como um presente), mas **co-criado** entre o
                        fornecedor e o consumidor. Se a questão disser 'Valor é
                        entregue de forma estática', está errada!
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          



<ModuleConsolidation
            index={2}
            variant={mv[3]}
            resumoVisual={{
              moduloNome: "Módulo 3",
              tituloAula: titulo,
              materia: materiaNome,
              images: [
                {
                  title: "Service Value System",
                  type: "Diagrama",
                  placeholderColor: "blue",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Service%20Value%20System",
                },
                {
                  title: "As 4 Dimensões",
                  type: "Infográfico",
                  placeholderColor: "emerald",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=As%204%20Dimens%C3%B5es",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Prazos e Prioridades ITIL",
              content: (
                <p>SVS = A Engrenagem que transforma Demanda em Valor.</p>
              ),
            }}
            podcast={{
            aulaId: "governanca",
            aulaTitulo: "Governanca",
            materia: "Tecnologia da Informação",
            materiaId: "ti",
            moduloNumero: 3,
            moduloTitulo: "Módulo 3",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                    <QuizInterativo
            questoes={quizM3}
            titulo="QUIZ: ITIL 4: Gestão de Serviços"
            variant={mv[3]}
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </div>
      </TabsContent>

      {/* 📜 MÓDULO 4: ISO/IEC 38500 */}
      <TabsContent value="modulo-4" className="mt-0">
        <ModuleBanner
          numero={4}
          titulo="ISO/IEC 38500: A Norma de Governança"
          descricao="O padrão internacional que serve de base para COBIT e ITIL em nível estratégico."
          variant={mv[4]}
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index="INTRO"
              title="6 Princípios e o Ciclo EDM"
              variant={mv[4]}
            />

            <ContentAccordion
              titulo="Conceituação - O Modelo de Governança"
              icone="📖"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        A **ISO/IEC 38500** constitui a norma diretriz para a Governança de TI.
                        Ela estabelece as atribuições do **Corpo Diretivo** (Board).
                        Distinta do COBIT, ela prescreve princípios orientadores em seis dimensões.
                      </p>

                      <div className="p-6 bg-muted rounded-xl border border-border">
                        <h4 className="font-bold mb-4 text-center">
                          Os 6 Princípios para a Boa Governança
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                          {[
                            {
                              i: "🤝",
                              n: "Responsabilidade",
                              d: "Autoridade clara.",
                            },
                            {
                              i: "🎯",
                              n: "Estratégia",
                              d: "Planos alinhados.",
                            },
                            {
                              i: "🛒",
                              n: "Aquisição",
                              d: "Investimento útil.",
                            },
                            {
                              i: "🏎️",
                              n: "Desempenho",
                              d: "Entregar o prometido.",
                            },
                            {
                              i: "⚖️",
                              n: "Conformidade",
                              d: "Respeitar as leis.",
                            },
                            {
                              i: "👤",
                              n: "Comportamento Humano",
                              d: "Foco nas pessoas.",
                            },
                          ].map((item, idx) => (
                            <div key={idx} className="text-center space-y-2">
                              <span className="text-3xl">{item.i}</span>
                              <h6 className="font-bold text-lg">{item.n}</h6>
                              <p className="text-[10px] text-muted-foreground">
                                {item.d}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <ContentAccordion
              titulo="Exemplificação - O Modelo EDM Detalhado"
              icone="📚"
              corIndicador="bg-emerald-500"
              defaultOpen={false}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                      <TimelineItem
                        passo={1}
                        titulo="Evaluate (Avaliar)"
                        descricao="O Conselho de Administração analisa propostas estratégicas de TI."
                      />
                      <TimelineItem
                        passo={2}
                        titulo="Direct (Direcionar)"
                        descricao="O Conselho estabelece diretrizes, aprova políticas e delega a execução."
                      />
                      <TimelineItem
                        passo={3}
                        titulo="Monitor (Monitorar)"
                        descricao="O Conselho monitora a entrega de resultados e a conformidade regulatória."
                      />

                      <div className="p-6 bg-[#0a0a0a] rounded-xl text-white">
                        <p className="text-lg italic">
                          "O sucesso organizacional depende da governança de TI. A ISO 38500
                          assegura que a alta direção monitore o desempenho da tecnologia."
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <ContentAccordion
              titulo="Dicas Chave - ISO 38500"
              icone="💡"
              corIndicador="bg-amber-500"
              defaultOpen={false}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                      <div className="flex flex-wrap gap-4">
                        <FlipCard
                          frente={
                            <div className="space-y-2">
                              <span className="text-2xl">⚖️</span>
                              <h5 className="font-bold">
                                Conformidade vs Desempenho
                              </h5>
                              <p className="text-lg text-muted-foreground">
                                O dilema da governança.
                              </p>
                            </div>
                          }
                          verso={
                            <div className="space-y-2">
                              <span className="text-2xl">✅</span>
                              <h5 className="font-bold">Equilíbrio</h5>
                              <p className="text-lg text-muted-foreground">
                                A norma preconiza a convergência entre eficiência e conformidade legal.
                              </p>
                            </div>
                          }
                        />
                        <FlipCard
                          frente={
                            <div className="space-y-2">
                              <span className="text-2xl">👥</span>
                              <h5 className="font-bold">Público-alvo</h5>
                              <p className="text-lg text-muted-foreground">
                                A quem se destina esta norma?
                              </p>
                            </div>
                          }
                          verso={
                            <div className="space-y-2">
                              <span className="text-2xl">✅</span>
                              <h5 className="font-bold">O Board</h5>
                              <p className="text-lg text-muted-foreground">
                                Diretores, proprietários e alta gestão.
                              </p>
                            </div>
                          }
                        />
                      </div>
                      <AlertBox tipo="info" titulo="📌 Contexto Institucional">
                        Em auditorias do TCU, a ISO 38500 é frequentemente referenciada para
                        atribuição de responsabilidades sobre a governança de TI.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          



<ModuleConsolidation
            index={2}
            variant={mv[4]}
            resumoVisual={{
              moduloNome: "Módulo 4",
              tituloAula: titulo,
              materia: materiaNome,
              images: [
                {
                  title: "Os 6 Princípios",
                  type: "Card",
                  placeholderColor: "blue",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Os%206%20Princ%C3%ADpios",
                },
                {
                  title: "Fluxo EDM",
                  type: "Diagrama",
                  placeholderColor: "emerald",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Fluxo%20EDM",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Fases de Gestão de Riscos",
              content: <p>PETI sonha, PDTI realiza.</p>,
            }}
            podcast={{
            aulaId: "governanca",
            aulaTitulo: "Governanca",
            materia: "Tecnologia da Informação",
            materiaId: "ti",
            moduloNumero: 4,
            moduloTitulo: "Módulo 4",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                    <QuizInterativo
            questoes={quizM4}
            titulo="QUIZ: ISO/IEC 38500: Norma"
            variant={mv[4]}
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
          />
        </div>
      </TabsContent>

      {/* 🗺️ MÓDULO 5: PETI E PDTI */}
      <TabsContent value="modulo-5" className="mt-0">
        <ModuleBanner
          numero={5}
          titulo="PETI e PDTI: O Planejamento na Prática"
          descricao="Saiba como transformar a visão corporativa em projetos reais de tecnologia."
          variant={mv[5]}
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index="INTRO"
              title="Do Estratégico ao Operacional"
              variant={mv[5]}
            />

            <ContentAccordion
              titulo="Conceituação - PETI (Plano Estratégico de TI)"
              icone="📖"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        O **PETI** representa a cúpula do planejamento. Com horizonte de
                        longo prazo (3-5 anos), define a **Missão, Visão e Valores** da
                        divisão de TI alinhados aos objetivos da organização.
                      </p>

                      <div className="bg-muted p-6 rounded-xl border border-border space-y-4">
                        <h4 className="font-bold">Análise Estratégica (SWOT) na TI</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-emerald-500/10 rounded-lg">
                            <strong className="text-emerald-500">
                              Forças:
                            </strong>{" "}
                            Infraestrutura robusta, quadro técnico qualificado.
                          </div>
                          <div className="p-4 bg-red-500/10 rounded-lg">
                            <strong className="text-red-500">Fraquezas:</strong>{" "}
                            Sistemas legados, processos operacionais onerosos.
                          </div>
                          <div className="p-4 bg-blue-500/10 rounded-lg">
                            <strong className="text-blue-500">
                              Oportunidades:
                            </strong>{" "}
                            Adoção de IA e Cloud computing.
                          </div>
                          <div className="p-4 bg-amber-500/10 rounded-lg">
                            <strong className="text-amber-500">Ameaças:</strong>{" "}
                            Vulnerabilidades cibernéticas e mudanças regulatórias.
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <ContentAccordion
              titulo="Exemplificação - PDTI (Plano Diretor de TI)"
              icone="📚"
              corIndicador="bg-emerald-500"
              defaultOpen={false}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                      <p>
                        O **PDTI** atua como instrumento executivo, delineando os
                        investimentos anuais para atingir as metas estratégicas.
                      </p>
                      <TimelineItem
                        passo={1}
                        titulo="Diagnóstico"
                        descricao="Inventário de ativos e identificação de necessidades."
                      />
                      <TimelineItem
                        passo={2}
                        titulo="Demandas"
                        descricao="Requisições das unidades de negócio."
                      />
                      <TimelineItem
                        passo={3}
                        titulo="Plano de Ação"
                        descricao="Estabelecimento de entregáveis, cronogramas e indicadores (KPIs)."
                      />
                      <TimelineItem
                        passo={4}
                        titulo="Plano Orçamentário"
                        descricao="Alocação e detalhamento de investimentos."
                      />
                    </div>
                  ),
                },
              ]}
            />

            <ContentAccordion
              titulo="Dicas p/ o Edital - Planejamento"
              icone="💡"
              corIndicador="bg-amber-500"
              defaultOpen={false}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                      <AlertBox tipo="warning" titulo="⚠️ Pontos de atenção">
                        O PDTI transcende o documento técnico, configurando-se como instrumento
                        de **Governança**. Em empresas públicas, a ausência de PDTI constitui óbice para
                        aquisições de grande vulto junto aos órgãos de controle.
                      </AlertBox>

                      <FlipCard
                        frente={
                          <div className="space-y-2">
                            <span className="text-2xl">⚔️</span>
                            <h5 className="font-bold">PETI vs PDTI</h5>
                            <p className="text-lg text-muted-foreground">
                              Diferenciação temporal.
                            </p>
                          </div>
                        }
                        verso={
                          <div className="space-y-2">
                            <span className="text-2xl">✅</span>
                            <h5 className="font-bold">Estratégico vs Tático</h5>
                            <p className="text-lg text-muted-foreground">
                              PETI = Longo prazo (Estratégico). PDTI =
                              Curto/Médio prazo (Operacional/Planejamento).
                            </p>
                          </div>
                        }
                      />
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <ModuleConsolidation
            index={2}
            variant={mv[5]}
            resumoVisual={{
              moduloNome: "Módulo 5",
              tituloAula: titulo,
              materia: materiaNome,
              images: [
                {
                  title: "Matriz SWOT",
                  type: "Infográfico",
                  placeholderColor: "blue",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Matriz%20SWOT",
                },
                {
                  title: "Estrutura PDTI",
                  type: "Card",
                  placeholderColor: "emerald",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Estrutura%20PDTI",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Alinhamento Estratégico",
              content: <p>PETI define diretrizes, PDTI viabiliza a execução.</p>,
            }}
            podcast={{
            aulaId: "governanca",
            aulaTitulo: "Governanca",
            materia: "Tecnologia da Informação",
            materiaId: "ti",
            moduloNumero: 5,
            moduloTitulo: "Módulo 5",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />
        </div>
      </TabsContent>

      {/* ⚠️ MÓDULO 6: GESTÃO DE RISCOS (ISO 31000) */}
      <TabsContent value="modulo-6" className="mt-0">
        <ModuleBanner
          numero={6}
          titulo="Gestão de Riscos (ISO 31000)"
          descricao="Aprenda a identificar, analisar e tratar riscos tecnológicos."
          variant={mv[6]}
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index="INTRO"
              title="Identificação e Tratamento de Riscos"
              variant={mv[6]}
            />

            <ContentAccordion
              titulo="Conceituação - O Processo de Gestão de Riscos"
              icone="📖"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        A gestão de riscos é imperativa para assegurar a continuidade
                        das operações. O processo conforme a ISO 31000 abrange:
                        Identificação, Análise, Avaliação e Tratamento.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                          <h4 className="font-bold text-red-500">
                            Riscos de Ameaça
                          </h4>
                          <p className="text-lg">
                            Eventos adversos capazes de gerar prejuízos.
                          </p>
                        </div>
                        <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                          <h4 className="font-bold text-emerald-500">
                            Oportunidades
                          </h4>
                          <p className="text-lg">
                            Fatores positivos com potencial de ganho estratégico.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          



<ModuleConsolidation
            index={2}
            variant={mv[6]}
            resumoVisual={{
              moduloNome: "Módulo 6",
              tituloAula: titulo,
              materia: materiaNome,
              images: [
                {
                  title: "Matriz de Riscos",
                  type: "Diagrama",
                  placeholderColor: "blue",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Matriz%20de%20Riscos",
                },
                {
                  title: "Fluxo de Tratamento",
                  type: "Infográfico",
                  placeholderColor: "emerald",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Fluxo%20de%20Tratamento",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Modelos Ágeis",
              content: (
                <p>
                  Lembre-se: M.A.T.E — Mitigar, Aceitar, Transferir, Evitar.
                </p>
              ),
            }}
            podcast={{
            aulaId: "governanca",
            aulaTitulo: "Governanca",
            materia: "Tecnologia da Informação",
            materiaId: "ti",
            moduloNumero: 6,
            moduloTitulo: "Módulo 6",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                    <QuizInterativo
            questoes={quizM6}
            titulo="QUIZ: Gestão de Riscos (ISO 31000)"
            variant={mv[6]}
            onComplete={(score) => handleModuleComplete("modulo-6", score)}
          />
        </div>
      </TabsContent>

      {/* ⚖️ MÓDULO 7: CONFORMIDADE E LGPD */}
      <TabsContent value="modulo-7" className="mt-0">
        <ModuleBanner
          numero={7}
          titulo="Conformidade e LGPD"
          descricao="A proteção de dados e o compliance como pilares da governança moderna."
          variant={mv[7]}
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index="INTRO"
              title="Privacidade e Governança de Dados"
              variant={mv[7]}
            />
            <ContentAccordion
              titulo="LGPD na Prática Governamental"
              icone="⚖️"
              corIndicador="bg-blue-500"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        A Lei Geral de Proteção de Dados (LGPD) impõe rigorosos requisitos de governança
                        sobre dados pessoais sob custódia de organizações.
                      </p>
                      <AlertBox tipo="info" titulo="Encarregado (DPO)">
                        A nomeação de um Encarregado de Proteção de Dados é obrigatória, servindo
                        como ponto de comunicação entre a organização, os titulares e a ANPD.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          



<ModuleConsolidation
            index={2}
            variant={mv[7]}
            resumoVisual={{
              moduloNome: "Módulo 7",
              tituloAula: titulo,
              materia: materiaNome,
              images: [
                {
                  title: "Fundamentos LGPD",
                  type: "Card",
                  placeholderColor: "blue",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Fundamentos%20LGPD",
                },
                {
                  title: "Fluxo de Resposta",
                  type: "Infográfico",
                  placeholderColor: "emerald",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Fluxo%20de%20Resposta",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Privacidade por Design",
              content: (
                <p>
                  Privacy by Design: Segurança integrada desde a concepção do projeto.
                </p>
              ),
            }}
            podcast={{
            aulaId: "governanca",
            aulaTitulo: "Governanca",
            materia: "Tecnologia da Informação",
            materiaId: "ti",
            moduloNumero: 7,
            moduloTitulo: "Módulo 7",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                    <QuizInterativo
            questoes={quizM7}
            titulo="QUIZ: Conformidade e LGPD"
            variant={mv[7]}
            onComplete={(score) => handleModuleComplete("modulo-7", score)}
          />
        </div>
      </TabsContent>

      {/* 🤝 MÓDULO 8: GESTÃO DE TERCEIROS E SLAS */}
      <TabsContent value="modulo-8" className="mt-0">
        <ModuleBanner
          numero={8}
          titulo="Gestão de Terceiros e SLAs"
          descricao="Gerencie fornecedores e garanta que a entrega externa atenda às necessidades internas."
          variant={mv[8]}
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index="INTRO"
              title="Contratos e Níveis de Serviço"
              variant={mv[8]}
            />
            <ContentAccordion
              titulo="Acordos de Nível de Serviço (SLA)"
              icone="🤝"
              corIndicador="bg-blue-500"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        O SLA (Service Level Agreement) estabelece as expectativas
                        de desempenho e penalidades contratuais.
                      </p>
                      <Comparison
                        title="SLA vs OLA"
                        left={{
                          title: "SLA (Externo)",
                          content: "Acordo com Terceiros",
                          description: "Focado nos níveis de entrega ao cliente.",
                          variant: "info",
                        }}
                        right={{
                          title: "OLA (Interno)",
                          content: "Acordo Operacional",
                          description:
                            "Suporte interno necessário para viabilizar o SLA.",
                          variant: "success",
                        }}
                      />
                    </div>
                  ),
                },
              ]}
            />
          </section>

          



<ModuleConsolidation
            index={2}
            variant={mv[8]}
            resumoVisual={{
              moduloNome: "Módulo 8",
              tituloAula: titulo,
              materia: materiaNome,
              images: [
                {
                  title: "Métricas de Serviço",
                  type: "Infográfico",
                  placeholderColor: "blue",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=M%C3%A9tricas%20de%20Servi%C3%A7o",
                },
                {
                  title: "Hierarquia de Contratos",
                  type: "Diagrama",
                  placeholderColor: "emerald",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Hierarquia%20de%20Contratos",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Alinhamento Estratégico",
              content: <p>SLA = Promessa externa. OLA = Ajuda interna.</p>,
            }}
            podcast={{
            aulaId: "governanca",
            aulaTitulo: "Governanca",
            materia: "Tecnologia da Informação",
            materiaId: "ti",
            moduloNumero: 8,
            moduloTitulo: "Módulo 8",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                    <QuizInterativo
            questoes={quizM8}
            titulo="QUIZ: Gestão de Terceiros e SLAs"
            variant={mv[8]}
            onComplete={(score) => handleModuleComplete("modulo-8", score)}
          />
        </div>
      </TabsContent>

      {/* 📊 MÓDULO 9: BSC E INDICADORES (KPIS) */}
      <TabsContent value="modulo-9" className="mt-0">
        <ModuleBanner
          numero={9}
          titulo="BSC e Indicadores (KPIs)"
          descricao="Meça o que importa: do operacional ao estratégico."
          variant={mv[9]}
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index="INTRO"
              title="O Balanced Scorecard na TI"
              variant={mv[9]}
            />
            <ContentAccordion
              titulo="As 4 Perspectivas do BSC de TI"
              icone="📊"
              corIndicador="bg-blue-500"
              slides={[
                {
                  conteudo: (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-muted rounded-xl">
                        <strong>Financeira:</strong> ROI, custos, valor do
                        negócio.
                      </div>
                      <div className="p-4 bg-muted rounded-xl">
                        <strong>Cliente:</strong> Satisfação, NPS, entrega de
                        serviços.
                      </div>
                      <div className="p-4 bg-muted rounded-xl">
                        <strong>Processos Internos:</strong> Operação,
                        agilidade, qualidade.
                      </div>
                      <div className="p-4 bg-muted rounded-xl">
                        <strong>Aprendizado/Crescimento:</strong> Skills,
                        cultura, inovação.
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          



<ModuleConsolidation
            index={2}
            variant={mv[9]}
            resumoVisual={{
              moduloNome: "Módulo 9",
              tituloAula: titulo,
              materia: materiaNome,
              images: [
                {
                  title: "Painel de KPIs",
                  type: "Infográfico",
                  placeholderColor: "blue",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Painel%20de%20KPIs",
                },
                {
                  title: "Árvore de Indicadores",
                  type: "Diagrama",
                  placeholderColor: "emerald",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=%C3%81rvore%20de%20Indicadores",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Síntese Estratégica",
              content: (
                <p>
                  Quem não mede, não gerencia. O BSC equilibra o financeiro com
                  o operacional.
                </p>
              ),
            }}
            podcast={{
            aulaId: "governanca",
            aulaTitulo: "Governanca",
            materia: "Tecnologia da Informação",
            materiaId: "ti",
            moduloNumero: 9,
            moduloTitulo: "Módulo 9",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                    <QuizInterativo
            questoes={quizM9}
            titulo="QUIZ: BSC e Indicadores (KPIs)"
            variant={mv[9]}
            onComplete={(score) => handleModuleComplete("modulo-9", score)}
          />
        </div>
      </TabsContent>

      {/* 🚀 MÓDULO 10: GOVERNANÇA ÁGIL E DIGITAL */}
      <TabsContent value="modulo-10" className="mt-0">
        <ModuleBanner
          numero={10}
          titulo="Governança Ágil e Digital"
          descricao="O futuro da governança: agilidade sem perder o controle."
          variant={mv[10]}
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index="INTRO"
              title="Adaptação aos Novos Tempos"
              variant={mv[10]}
            />
            <ContentAccordion
              titulo="Governança Lean e Ágil"
              icone="🚀"
              corIndicador="bg-blue-500"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Governança Ágil não é ausência de regras, mas sim regras
                        adaptadas ao fluxo de valor contínuo (DevOps/Cloud).
                      </p>
                      <TimelineItem
                        passo={1}
                        titulo="Automação"
                        descricao="Compliance via código e auditoria em tempo real."
                      />
                      <TimelineItem
                        passo={2}
                        titulo="Descentralização"
                        descricao="Dar autonomia aos times com limites (Guardrails) claros."
                      />
                    </div>
                  ),
                },
              ]}
            />
          </section>

          



<ModuleConsolidation
            index={2}
            variant={mv[10]}
            resumoVisual={{
              moduloNome: "Módulo 10",
              tituloAula: titulo,
              materia: materiaNome,
              images: [
                {
                  title: "Guardrails de Cloud",
                  type: "Infográfico",
                  placeholderColor: "blue",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=Guardrails%20de%20Cloud",
                },
                {
                  title: "DevSecOps flow",
                  type: "Diagrama",
                  placeholderColor: "emerald",
                  imageUrl: "https://placehold.co/600x400/1e293b/38bdf8?text=DevSecOps%20flow",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Ágil com Controle",
              content: (
                <p>
                  Guardrails: O segredo para correr rápido sem sair da pista.
                </p>
              ),
            }}
            podcast={{
            aulaId: "governanca",
            aulaTitulo: "Governanca",
            materia: "Tecnologia da Informação",
            materiaId: "ti",
            moduloNumero: 10,
            moduloTitulo: "Módulo 10",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                    <QuizInterativo
            questoes={quizM10}
            titulo="QUIZ: Governança Ágil e Digital"
            variant={mv[10]}
            onComplete={(score) => handleModuleComplete("modulo-10", score)}
          />
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
