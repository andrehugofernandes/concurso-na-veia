"use client";
import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  AlertBox,
  QuizInterativo,
  ModuleBanner,
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
  QUIZ_M1_PROCESSOS_MATURIDADE,
  QUIZ_M2_CICLO_VIDA,
  QUIZ_M3_REQUISITOS,
  QUIZ_M4_UML_PATTERNS,
  QUIZ_M5_AGILE_DEVOPS,
  QUIZ_M6_DATABASE_SQL,
  QUIZ_M7_NOSQL_BIGDATA,
  QUIZ_M8_MICROSERVICES,
  QUIZ_M9_SECURITY,
  QUIZ_M10_TESTING_QUALITY,
} from "./data/engenharia-software-quizzes";

export default function AulaEngenhariaSoftware({
  onComplete, isCompleted, loading, xpGanho = 50,
  currentProgress, onUpdateProgress, titulo, descricao, duracao,
  materiaNome, materiaCor, materiaId, prevTopico, nextTopico
}: AulaProps) {

    const STORAGE_KEY_PREFIX = "petrobras_quest_aula_ti_engenharia_software_";

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

  // Definir os módulos da aula (Padrão Premium: 10 módulos)
  const MODULE_DEFS = [
    { id: "modulo-1", label: "Módulo 1", titulo: "Processos e Maturidade" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Ciclos de Vida" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Engenharia de Requisitos" },
    { id: "modulo-4", label: "Módulo 4", titulo: "Arquitetura e UML" },
    { id: "modulo-5", label: "Módulo 5", titulo: "Agilidade e DevOps" },
    { id: "modulo-6", label: "Módulo 6", titulo: "Bancos de Dados SQL" },
    { id: "modulo-7", label: "Módulo 7", titulo: "NoSQL e Big Data" },
    { id: "modulo-8", label: "Módulo 8", titulo: "Microserviços" },
    { id: "modulo-9", label: "Módulo 9", titulo: "Segurança de Software" },
    { id: "modulo-10", label: "Módulo 10", titulo: "Testes e Qualidade" },
  ];

  const totalModulos = MODULE_DEFS.length;

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) {
      setCompletedModules(prev => {
        const n = new Set(prev);
        n.add(moduleId);
        return n;
      });
      const idx = MODULE_DEFS.findIndex(m => m.id === moduleId);
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

  // Quiz pools inicializados com getRandomQuestions
  const quizM1 = getRandomQuestions(QUIZ_M1_PROCESSOS_MATURIDADE, 5);
  const quizM2 = getRandomQuestions(QUIZ_M2_CICLO_VIDA, 5);
  const quizM3 = getRandomQuestions(QUIZ_M3_REQUISITOS, 5);
  const quizM4 = getRandomQuestions(QUIZ_M4_UML_PATTERNS, 5);
  const quizM5 = getRandomQuestions(QUIZ_M5_AGILE_DEVOPS, 5);
  const quizM6 = getRandomQuestions(QUIZ_M6_DATABASE_SQL, 5);
  const quizM7 = getRandomQuestions(QUIZ_M7_NOSQL_BIGDATA, 5);
  const quizM8 = getRandomQuestions(QUIZ_M8_MICROSERVICES, 5);
  const quizM9 = getRandomQuestions(QUIZ_M9_SECURITY, 5);
  const quizM10 = getRandomQuestions(QUIZ_M10_TESTING_QUALITY, 5);

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
      isCompleted={isCompleted}
      titulo={titulo}
      descricao={descricao}
      duracao={duracao}
      materiaNome={materiaNome}
      materiaCor={materiaCor}
      materiaId={materiaId}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
      currentProgress={currentProgress}
      onComplete={onComplete}
      loading={loading}
      xpGanho={xpGanho}
    >
      {/* ══════════════════════════════════════════════════════
          MÓDULO 1: PROCESSOS E MATURIDADE
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-1" className="mt-0">
        <ModuleBanner
          numero={1}
          titulo="Processos e Modelos de Maturidade"
          descricao="Entenda como a organização e a qualidade são medidas na engenharia de software através dos modelos CMMI e MPS.BR."
          variant={mv[1]}
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index="INTRO"
              title="Introdução aos Processos de Software"
              variant={mv[1]}
            />

            <ContentAccordion
              titulo="Conceituação - O que é um Processo de Software?"
              icone="📖"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                      <div className="prose prose-slate dark:prose-invert max-w-none">
                        <p className="text-lg leading-relaxed">
                          Um <strong>Processo de Software</strong> é um conjunto estruturado de atividades, métodos e práticas usados no desenvolvimento e manutenção de software. Imagine o processo como uma 'receita' que guia a equipe, desde o entendimento inicial da necessidade até o software em operação.
                        </p>
                        <p className="text-lg text-muted-foreground italic">
                          Nas provas da CESGRANRIO, os processos são frequentemente vistos como o pilar da qualidade organizacional. Sem processo, o desenvolvimento é caótico ('Code-and-Fix'), e o resultado é imprevisível.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <h4 className="text-lg font-bold text-blue-600 mb-3 flex items-center gap-2">
                             📌 Atividades Fundamentais (Sommerville)
                          </h4>
                          <ul className="space-y-3">
                            <li className="flex gap-3">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">1</span>
                              <p><strong>Especificação:</strong> O que o sistema deve fazer.</p>
                            </li>
                            <li className="flex gap-3">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">2</span>
                              <p><strong>Projeto/Implementação:</strong> Como o sistema é construído.</p>
                            </li>
                            <li className="flex gap-3">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">3</span>
                              <p><strong>Validação:</strong> Mostrar que o software atende ao pedido.</p>
                            </li>
                            <li className="flex gap-3">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">4</span>
                              <p><strong>Evolução:</strong> Mudança para atender novas demandas.</p>
                            </li>
                          </ul>
                        </div>
                        <div className="p-6 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <h4 className="text-lg font-bold text-emerald-600 mb-3 flex items-center gap-2">
                             🚀 Contexto Petrobras
                          </h4>
                          <p className="text-lg">
                            Em ambientes industriais complexos como os da Petrobras, o processo não serve apenas para 'código', mas para garantir **rastreabilidade** e **segurança**. Um software que controla a pressão de um duto não pode ser feito sem um processo rigoroso de validação e garantia de qualidade.
                          </p>
                          <div className="mt-4 p-4 bg-white/50 dark:bg-black/20 rounded-lg">
                            <p className="font-semibold text-lg text-muted-foreground uppercase tracking-wider mb-2">Exemplo Real:</p>
                            <p className="text-lg italic">"A implementação de um novo módulo no sistema de logística de combustíveis exige que todos os pré-requisitos técnicos estejam documentados para auditorias futuras."</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <ContentAccordion
              titulo="Maturidade OBRIGATÓRIA - CMMI (Níveis de 1 a 5)"
              icone="🏆"
              corIndicador="bg-amber-500"
              defaultOpen={false}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                      <div className="prose prose-slate dark:prose-invert max-w-none">
                        <p className="text-lg leading-relaxed">
                          O <strong>CMMI (Capability Maturity Model Integration)</strong> é a 'bíblia' da melhoria de processos. Para concursos, você DEVE decorar os 5 níveis de maturidade e suas palavras-chave.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <TimelineItem 
                          passo={1} 
                          titulo="Nível 1 - Inicial" 
                          descricao="Processos adhoc, imprevisíveis e reativos. O sucesso depende de heroísmo individual. Não existem processos repetíveis." 
                        />
                        <TimelineItem 
                          passo={2} 
                          titulo="Nível 2 - Gerenciado" 
                          descricao="Os processos são planejados, executados, medidos e controlados ao nível do PROJETO. Palavra-chave: Repetibilidade em projetos específicos." 
                        />
                        <TimelineItem 
                          passo={3} 
                          titulo="Nível 3 - Definido" 
                          descricao="Os processos são padronizados e integrados em toda a ORGANIZAÇÃO. Há um conjunto de processos padrão para todos." 
                        />
                        <TimelineItem 
                          passo={4} 
                          titulo="Nível 4 - Gerenciado Quantitativamente" 
                          descricao="Processos medidos estatisticamente. A organização entende as variações e controla a performance com dados numéricos." 
                        />
                        <TimelineItem 
                          passo={5} 
                          titulo="Nível 5 - Em Otimização" 
                          descricao="Melhoria contínua focada em inovação e na prevenção sistemática de defeitos. Uso de tecnologia para melhorar o processo padrão." 
                        />
                      </div>

                      <AlertBox tipo="warning" titulo="⚠️ pontos de atenção CESGRANRIO">
                        A banca costuma trocar a descrição do **Nível 2** pelo **Nível 3**. Lembre-se: Nível 2 é **foco no Projeto**; Nível 3 é **foco na Organização (Empresa inteira)**.
                      </AlertBox>

                      <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-xl border border-border">
                        <h5 className="font-bold mb-4 flex items-center gap-2">📊 Tabela de Memorização Rápida</h5>
                        <div className="overflow-x-auto">
                          <table className="w-full text-lg">
                            <thead>
                              <tr className="border-b border-border">
                                <th className="text-left py-2 font-bold">Nível</th>
                                <th className="text-left py-2 font-bold">Foco</th>
                                <th className="text-left py-2 font-bold">Estado do Processo</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                              <tr>
                                <td className="py-2 font-semibold">1 (Inic)</td>
                                <td className="py-2 text-muted-foreground">Heróis</td>
                                <td className="py-2">Caótico / Ad-hoc</td>
                              </tr>
                              <tr>
                                <td className="py-2 font-semibold text-blue-500">2 (Ger)</td>
                                <td className="py-2 text-muted-foreground">Projetos</td>
                                <td className="py-2">Planejado e Disciplinado</td>
                              </tr>
                              <tr>
                                <td className="py-2 font-semibold text-emerald-500">3 (Def)</td>
                                <td className="py-2 text-muted-foreground">Org</td>
                                <td className="py-2">Padronizado institucional</td>
                              </tr>
                              <tr>
                                <td className="py-2 font-semibold text-amber-500">4 (Quant)</td>
                                <td className="py-2 text-muted-foreground">Estatística</td>
                                <td className="py-2">Previsível / Medido</td>
                              </tr>
                              <tr>
                                <td className="py-2 font-semibold text-red-500">5 (Otim)</td>
                                <td className="py-2 text-muted-foreground">Melhoria</td>
                                <td className="py-2">Inovador / Preventivo</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <ContentAccordion
              titulo="Exemplificação - CMMI na Prática da Engenharia"
              icone="⚙️"
              corIndicador="bg-red-500"
              defaultOpen={false}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-6">
                      <div className="prose prose-slate dark:prose-invert max-w-none">
                        <p>Imagine o desenvolvimento de um sistema de automação para refinaria (Refiner-Auto 2.0). Veja como ele se comportaria em diferentes níveis:</p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 border-l-4 border-red-500 bg-red-50/30 dark:bg-red-950/20">
                          <div className="bg-red-500 text-white p-2 rounded-lg font-bold">Lvl 1</div>
                          <div>
                            <p className="font-bold uppercase text-lg text-red-600">Cenário Caótico:</p>
                            <p className="text-lg">O código é feito por um 'expert' que não documenta nada. Se ele sair da empresa, ninguém sabe como atualizar o sistema. O projeto atrasa meses sem explicação.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 border-l-4 border-blue-500 bg-blue-50/30 dark:bg-blue-950/20">
                          <div className="bg-blue-500 text-white p-2 rounded-lg font-bold">Lvl 2</div>
                          <div>
                            <p className="font-bold uppercase text-lg text-blue-600">Cenário Planejado:</p>
                            <p className="text-lg">O projeto do Refiner-Auto possui um cronograma, controle de versões e requisitos aprovados. Se houver falha, sabemos o que foi planejado vs o que foi executado.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 border-l-4 border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20">
                          <div className="bg-emerald-500 text-white p-2 rounded-lg font-bold">Lvl 3</div>
                          <div>
                            <p className="font-bold uppercase text-lg text-emerald-600">Cenário Padrão:</p>
                            <p className="text-lg">A empresa possui um portal com todos os modelos de documentos e processos que TODOS os projetos de refinaria devem seguir. O conhecimento não pertence ao autor, mas à organização.</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 bg-slate-900 text-slate-100 rounded-xl font-mono text-lg">
                        <p className="text-emerald-400">// DICA DE MESTRE:</p>
                        <p>No Nível 4, você tem GRÁFICOS DE CONTROLE (como o de parafusos em uma fábrica).</p>
                        <p>No Nível 5, você está trocando o parafuso por um novo MATERIAL mais leve.</p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          {/* SEÇÃO 2: MPS.BR e ISO 12207 */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="MPS.BR - O Modelo Brasileiro"
              variant={mv[1]}
            />

            <ContentAccordion
              titulo="Conceituação - MPS.BR (Níveis A a G)"
              icone="🇧🇷"
              corIndicador="bg-emerald-600"
              defaultOpen={false}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                      <div className="prose prose-slate dark:prose-invert max-w-none">
                        <p className="text-lg">
                          O <strong>MPS.BR</strong> (Melhoria de Processos do Software Brasileiro) foi criado para ser mais acessível que o CMMI, especialmente para PMEs. Ele possui 7 níveis de maturidade, do mais básico (G) ao mais avançado (A).
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <ComparisonSide 
                            titulo="Nível G (Parcialmente Gerenciado)" 
                            tipo="correct"
                            items={["Início do Nível 2 do CMMI"]}
                          />
                          <ComparisonSide 
                            titulo="Nível F (Gerenciado)" 
                            tipo="correct"
                            items={["Todo o Nível 2 do CMMI"]}
                          />
                          <ComparisonSide 
                            titulo="Nível E/D/C" 
                            tipo="correct"
                            items={["Nível 3 do CMMI (Gradativo)"]}
                          />
                          <ComparisonSide 
                            titulo="Nível B (Gerenciado Quant.)" 
                            tipo="correct"
                            items={["Nível 4 do CMMI"]}
                          />
                          <ComparisonSide 
                            titulo="Nível A (Em Otimização)" 
                            tipo="correct"
                            items={["Nível 5 do CMMI"]}
                          />
                        </div>
                      </div>

                      <AlertBox tipo="info" titulo="🔍 Estrutura do MPS.BR">
                        O MPS.BR é composto por:
                        1. **MR-MPS:** Modelo de Referência (o 'que' fazer).
                        2. **MA-MPS:** Método de Avaliação (como auditar).
                        3. **MN-MPS:** Modelo de Negócio (como custear o selo).
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            <ContentAccordion
              titulo="ISO/IEC 12207 - Ciclo de Vida do Software"
              icone="🌐"
              corIndicador="bg-slate-700"
              defaultOpen={false}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-6">
                      <div className="prose prose-slate dark:prose-invert max-w-none">
                        <p>A norma **ISO/IEC 12207** define uma terminologia comum para o ciclo de vida. Ela divide os processos em três grandes categorias:</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4 border border-border rounded-xl hover:shadow-md transition-shadow">
                          <h6 className="font-bold text-blue-600 mb-2">1. Primários</h6>
                          <ul className="text-lg space-y-1 text-muted-foreground list-disc pl-4">
                            <li>Aquisição</li>
                            <li>Fornecimento</li>
                            <li>Desenvolvimento</li>
                            <li>Operação</li>
                            <li>Manutenção</li>
                          </ul>
                        </div>
                        <div className="p-4 border border-border rounded-xl hover:shadow-md transition-shadow">
                          <h6 className="font-bold text-emerald-600 mb-2">2. Apoio</h6>
                          <ul className="text-lg space-y-1 text-muted-foreground list-disc pl-4">
                            <li>Doc / Gestão Conf.</li>
                            <li>Garantia Qualidade</li>
                            <li>Verificação / Validação</li>
                            <li>Revisão Conjunta</li>
                            <li>Audit / Resolução</li>
                          </ul>
                        </div>
                        <div className="p-4 border border-border rounded-xl hover:shadow-md transition-shadow">
                          <h6 className="font-bold text-amber-600 mb-2">3. Organizacionais</h6>
                          <ul className="text-lg space-y-1 text-muted-foreground list-disc pl-4">
                            <li>Gestão de Infra</li>
                            <li>Gestão de Recursos</li>
                            <li>Melhoria de Processo</li>
                            <li>Treinamento</li>
                          </ul>
                        </div>
                      </div>

                      <AlertBox tipo="danger" titulo="❌ O que NÃO é Nível CMMI?">
                        CMMI não é uma linguagem de programação nem uma ferramenta (como Jira). CMMI é um **Modelo de Qualidade**. ISO 12207 é um **Padrão de Processo**. Saiba distinguir!
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          

          <section id="quiz-modulo-1">


<ModuleConsolidation
            index={3}
            variant={mv[1]}
            resumoVisual={{
              moduloNome: "Módulo 1",
              tituloAula: titulo,
              materia: materiaNome,
              images: [
                {
                  title: "Pirâmide CMMI",
                  type: "Infográfico",
                  placeholderColor: "blue",
                  imageUrl: "https://images.unsplash.com/photo-1551288049-bbda38a5f452?q=80&w=2070&auto=format&fit=crop",
                },
                {
                  title: "Equivalência MPS.BR",
                  type: "Tabela",
                  placeholderColor: "emerald",
                  imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "A Frase para os Níveis do CMMI",
              content: (
                <div className="space-y-4">
                  <p className="text-xl font-bold text-center p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    "Eu <span className="underline decoration-red-500">I</span>nicialmente <span className="underline decoration-blue-500">G</span>erenciei <span className="underline decoration-emerald-500">D</span>etalhes <span className="underline decoration-amber-500">Q</span>uantitativos <span className="underline decoration-red-500">O</span>timizados"
                  </p>
                  <p className="text-lg text-center text-muted-foreground italic">(I-G-D-Q-O = Inicial, Gerenciado, Definido, Quantitativo, Otimizado)</p>
                </div>
              ),
            }}
            podcast={{
            aulaId: "engenhariasoftware",
            aulaTitulo: "Engenharia Software",
            materia: "Tecnologia da Informação",
            materiaId: "ti",
            moduloNumero: 1,
            moduloTitulo: "Módulo 1",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                      <QuizInterativo
              questoes={quizM1}
              titulo="QUIZ: Processos e Maturidade"
              variant={mv[1]}
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ══════════════════════════════════════════════════════
          MÓDULO 2: MODELOS DE CICLO DE VIDA
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-2" className="mt-0">
        <ModuleBanner
          numero={2}
          titulo="Modelos de Ciclo de Vida"
          descricao="Do clássico Cascata aos modernos modelos Iterativos e Espirais. Saiba como escolher a estratégia certa para cada projeto."
          variant={mv[2]}
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index="INTRO"
              title="A Evolução dos Modelos de Ciclo de Vida"
              variant={mv[2]}
            />

            <ContentAccordion
              titulo="Conceituação - O que é um Modelo de Ciclo de Vida?"
              icone="♻️"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                      <div className="prose prose-slate dark:prose-invert max-w-none">
                        <p className="text-lg">
                          O <strong>Modelo de Ciclo de Vida</strong> (ou Ciclo de Desenvolvimento) define as **fases** pelas quais o software passa e a **ordem** em que essas fases ocorrem. É a estrutura organizacional do desenvolvimento.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <h6 className="font-bold flex items-center gap-2">🌊 Modelo Clássico: Cascata (Waterfall)</h6>
                          <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                             <p className="text-lg">Sequencial. Uma fase deve ser assinada e terminada para começar a próxima. Requisitos são fixos no início.</p>
                             <div className="mt-3 flex flex-wrap gap-2">
                               <span className="px-2 py-1 bg-red-100 text-red-700 text-[10px] font-bold rounded">RIGIDEZ</span>
                               <span className="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded">DOCUMENTAÇÃO</span>
                               <span className="px-2 py-1 bg-slate-100 text-slate-700 text-[10px] font-bold rounded">SEQUENCIAL</span>
                             </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h6 className="font-bold flex items-center gap-2">🔄 Modelo Moderno: Iterativo e Incremental</h6>
                          <div className="p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
                             <p className="text-lg">Entrega o software em partes (incrementos). Cada ciclo (iteração) permite revisar e melhorar os requisitos.</p>
                             <div className="mt-3 flex flex-wrap gap-2">
                               <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded">FLEXIBILIDADE</span>
                               <span className="px-2 py-1 bg-purple-100 text-purple-700 text-[10px] font-bold rounded">FEEDBACK</span>
                               <span className="px-2 py-1 bg-slate-100 text-slate-700 text-[10px] font-bold rounded">EVOLUTIVO</span>
                             </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <ContentAccordion
              titulo="Detalhamento Técnico - Modelo em Espiral (Boehm)"
              icone="🌀"
              corIndicador="bg-amber-600"
              defaultOpen={false}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                      <div className="prose prose-slate dark:prose-invert max-w-none">
                        <p>O **Modelo Espiral** é fundamental para sistemas críticos (como os da Petrobras). Ele não foca apenas em fazer código, mas em **analisar riscos** continuamente.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border-t-4 border-blue-500">
                          <span className="text-lg font-bold text-blue-600 uppercase">Q1</span>
                          <p className="text-lg font-bold mt-1">Planejamento</p>
                          <p className="text-[10px] text-muted-foreground mt-2">Identificar objetivos e alternativas.</p>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border-t-4 border-red-500">
                          <span className="text-lg font-bold text-red-600 uppercase">Q2</span>
                          <p className="text-lg font-bold mt-1">Análise de Riscos</p>
                          <p className="text-[10px] text-muted-foreground mt-2">Avaliar alternativas e resolver riscos.</p>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border-t-4 border-emerald-500">
                          <span className="text-lg font-bold text-emerald-600 uppercase">Q3</span>
                          <p className="text-lg font-bold mt-1">Engenharia</p>
                          <p className="text-[10px] text-muted-foreground mt-2">Desenvolvimento do produto/protótipo.</p>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border-t-4 border-amber-500">
                          <span className="text-lg font-bold text-amber-600 uppercase">Q4</span>
                          <p className="text-lg font-bold mt-1">Avaliação</p>
                          <p className="text-[10px] text-muted-foreground mt-2">Revisão do cliente e planeja próxima volta.</p>
                        </div>
                      </div>

                      <AlertBox tipo="info" titulo="🎯 Foco Total em Riscos">
                        Se a prova perguntar: "Qual modelo tem uma fase explícita para resolver incertezas e riscos técnicos?", a resposta é **ESPIRAL**.
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
              title="RUP - Rational Unified Process"
              variant={mv[2]}
            />

            <ContentAccordion
              titulo="Exemplificação - As 4 Fases do RUP"
              icone="💎"
              corIndicador="bg-blue-600"
              defaultOpen={false}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                      <p className="text-lg">O RUP é um framework pesado, iterativo e centrado na arquitetura. Decorar as fases é vital:</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
                          <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xl shadow-lg">1</div>
                          <div>
                            <h6 className="font-bold">Concepção (Inception)</h6>
                            <p className="text-lg text-muted-foreground">Foco: Business Case, Escopo Inicial e Viabilidade. "Vale a pena fazer este sistema?"</p>
                          </div>
                        </div>
                        <div className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
                          <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xl shadow-lg">2</div>
                          <div>
                            <h6 className="font-bold">Elaboração (Elaboration)</h6>
                            <p className="text-lg text-muted-foreground">Foco: **ARQUITETURA** e Riscos Técnicos. Cria-se o protótipo executável da arquitetura.</p>
                          </div>
                        </div>
                        <div className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
                          <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-xl shadow-lg">3</div>
                          <div>
                            <h6 className="font-bold">Construção (Construction)</h6>
                            <p className="text-lg text-muted-foreground">Foco: Desenvolvimento massivo. Transformar a arquitetura em produto final.</p>
                          </div>
                        </div>
                        <div className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
                          <div className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-xl shadow-lg">4</div>
                          <div>
                            <h6 className="font-bold">Transição (Transition)</h6>
                            <p className="text-lg text-muted-foreground">Foco: Implantação, treinamento, suporte e entrega final ao usuário.</p>
                          </div>
                        </div>
                      </div>

                      <AlertBox tipo="warning" titulo="⚠️ pontos de atenção de Prova">
                        O RUP é **Iterativo**, mas suas fases (Concepção, Elaboração...) parecem sequenciais. Lembre-se que cada fase pode ter várias iterações internas!
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          

          <section id="quiz-modulo-2">


<ModuleConsolidation
            index={3}
            variant={mv[2]}
            resumoVisual={{
              moduloNome: "Módulo 2",
              tituloAula: titulo,
              materia: materiaNome,
              images: [
                {
                  title: "Gráfico Cascata",
                  type: "Diagrama",
                  placeholderColor: "blue",
                  imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
                },
                {
                  title: "A Espiral de Boehm",
                  type: "Infográfico",
                  placeholderColor: "amber",
                  imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Fases do RUP: C.E.C.T.",
              content: (
                <div className="p-6 bg-blue-600 text-white rounded-2xl shadow-xl text-center">
                  <p className="text-3xl font-black tracking-widest mb-2">CE-CO-TR</p>
                  <p className="text-lg opacity-90">Concepção, Elaboração, Construção, Transição</p>
                  <p className="mt-4 text-lg font-mono">"CECO para o TRabalho"</p>
                </div>
              ),
            }}
            podcast={{
            aulaId: "engenhariasoftware",
            aulaTitulo: "Engenharia Software",
            materia: "Tecnologia da Informação",
            materiaId: "ti",
            moduloNumero: 2,
            moduloTitulo: "Módulo 2",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                      <QuizInterativo
              questoes={quizM2}
              titulo="QUIZ: Ciclos de Vida"
              variant={mv[2]}
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>
        </div>
      </TabsContent>
      
      {/* ══════════════════════════════════════════════════════
          MÓDULO 3: ENGENHARIA DE REQUISITOS
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-3" className="mt-0">
        <ModuleBanner
          numero={3}
          titulo="Engenharia de Requisitos"
          descricao="A base de tudo. Saiba como elicitar, analisar, documentar e validar as necessidades do sistema com precisão técnica."
          variant={mv[3]}
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index="INTRO"
              title="Tipos de Requisitos e Elicitação"
              variant={mv[3]}
            />

            <ContentAccordion
              titulo="Conceituação - Funcionais vs Não-Funcionais"
              icone="📝"
              corIndicador="bg-blue-500"
              defaultOpen={true}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                      <div className="prose prose-slate dark:prose-invert max-w-none">
                        <p className="text-xl font-medium leading-relaxed">
                          A Engenharia de Requisitos é o processo de descobrir, analisar e documentar o que um sistema deve fazer. Um erro aqui custa até 100x mais caro se for descoberto apenas na fase de manutenção.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 bg-blue-500/10 rounded-2xl border-2 border-dashed border-blue-500/20 relative overflow-hidden group">
                          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <span className="text-6xl">⚙️</span>
                          </div>
                          <h4 className="text-xl font-black text-blue-700 mb-4 flex items-center gap-2">
                             Requisitos Funcionais (RF)
                          </h4>
                          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                            Definem o **comportamento** do sistema. O que ele deve fazer diante de entradas específicas. São as funções do software.
                          </p>
                          <div className="mt-6 pt-6 border-t border-blue-200 dark:border-blue-800">
                             <p className="text-lg font-bold uppercase text-blue-600 mb-3 tracking-widest">Exemplos Petrobras:</p>
                             <ul className="space-y-2 text-lg">
                               <li className="flex items-center gap-2">✅ "O sistema deve emitir alerta se a pressão do duto exceder 500 PSI."</li>
                               <li className="flex items-center gap-2">✅ "Deve permitir o cadastro de funcionários offshore via biometria."</li>
                               <li className="flex items-center gap-2">✅ "O software deve gerar relatórios diários de extração de gás."</li>
                             </ul>
                          </div>
                        </div>

                        <div className="p-8 bg-emerald-500/10 rounded-2xl border-2 border-dashed border-emerald-500/20 relative overflow-hidden group">
                          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                            <span className="text-6xl">🏎️</span>
                          </div>
                          <h4 className="text-xl font-black text-emerald-700 mb-4 flex items-center gap-2">
                             Requisitos Não-Funcionais (RNF)
                          </h4>
                          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                            Definem as **qualidades** e **restrições** do sistema. Como ele deve ser. Performance, segurança, disponibilidade e usabilidade.
                          </p>
                          <div className="mt-6 pt-6 border-t border-emerald-200 dark:border-emerald-800">
                             <p className="text-lg font-bold uppercase text-emerald-600 mb-3 tracking-widest">Exemplos Petrobras (Qualidade):</p>
                             <ul className="space-y-2 text-lg">
                               <li className="flex items-center gap-2">🛡️ "O sistema deve usar criptografia AES-256 para dados sensíveis."</li>
                               <li className="flex items-center gap-2">⚡ "As consultas à base de dados devem responder em menos de 2s."</li>
                               <li className="flex items-center gap-2">🏗️ "O sistema deve ser compatível com infraestrutura cloud Azure."</li>
                             </ul>
                          </div>
                        </div>
                      </div>

                      <AlertBox tipo="danger" titulo="⚠️ pontos de atenção da CESGRANRIO: Requisitos de Domínio">
                        Às vezes a banca cita requisitos que vêm da área de aplicação (ex: geologia, mecânica) e não do usuário final. Estes são os **Requisitos de Domínio**. Eles podem ser funcionais ou não-funcionais, mas sua origem é o **conhecimento técnico do setor**.
                      </AlertBox>

                      <div className="space-y-6">
                         <h5 className="text-lg font-bold flex items-center gap-2 border-b-2 border-blue-500 pb-2 w-fit">
                            📌 Níveis de Requisito (Karl Wiegers)
                         </h5>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-5 bg-card border rounded-xl shadow-sm text-center">
                               <div className="w-10 h-10 bg-slate-900 text-white rounded-lg flex items-center justify-center mx-auto mb-3 font-bold">1</div>
                               <h6 className="font-bold text-lg">Negócio (Business)</h6>
                               <p className="text-lg text-muted-foreground mt-2">Visão macro. Por que a Petrobras precisa deste projeto?</p>
                            </div>
                            <div className="p-5 bg-card border rounded-xl shadow-sm text-center">
                               <div className="w-10 h-10 bg-slate-900 text-white rounded-lg flex items-center justify-center mx-auto mb-3 font-bold">2</div>
                               <h6 className="font-bold text-lg">Usuário (User)</h6>
                               <p className="text-lg text-muted-foreground mt-2">O que o operador precisa fazer com o sistema.</p>
                            </div>
                            <div className="p-5 bg-card border rounded-xl shadow-sm text-center">
                               <div className="w-10 h-10 bg-slate-900 text-white rounded-lg flex items-center justify-center mx-auto mb-3 font-bold">3</div>
                               <h6 className="font-bold text-lg">Sistema (System)</h6>
                               <p className="text-lg text-muted-foreground mt-2">Detalhamento técnico para os desenvolvedores.</p>
                            </div>
                         </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <ContentAccordion
              titulo="Exemplificação - Técnicas de Elicitação"
              icone="🔍"
              corIndicador="bg-purple-600"
              defaultOpen={false}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                      <div className="prose prose-slate dark:prose-invert max-w-none">
                        <p className="text-lg">Como extrair requisitos dos stakeholders da Petrobras? Veja as técnicas mais eficazes:</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-border group hover:border-purple-500 transition-colors">
                            <div className="flex items-center gap-4 mb-4">
                               <span className="text-3xl">🗣️</span>
                               <h6 className="font-black text-xl">Entrevistas</h6>
                            </div>
                            <p className="text-lg text-muted-foreground">Podem ser **estruturadas** ou **abertas**. Excelentes para entender a visão do gerente do setor offshore, mas consomem muito tempo se houver muitos usuários.</p>
                            <div className="mt-4 flex items-center gap-2 text-lg font-bold text-emerald-600">
                               <span className="p-1 bg-emerald-100 rounded">PRÓ</span> Flexibilidade total.
                            </div>
                         </div>
                         <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-border group hover:border-blue-500 transition-colors">
                            <div className="flex items-center gap-4 mb-4">
                               <span className="text-3xl">👥</span>
                               <h6 className="font-black text-xl">Workshops (JAD)</h6>
                            </div>
                            <p className="text-lg text-muted-foreground">**Joint Application Development**. Reuniões intensivas com facilitador e tomadores de decisão. Ideal para resolver conflitos de requisitos entre geologia e infraestrutura.</p>
                            <div className="mt-4 flex items-center gap-2 text-lg font-bold text-blue-600">
                               <span className="p-1 bg-blue-100 rounded">PRÓ</span> Consenso rápido.
                            </div>
                         </div>
                         <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-border group hover:border-amber-500 transition-colors">
                            <div className="flex items-center gap-4 mb-4">
                               <span className="text-3xl">👀</span>
                               <h6 className="font-black text-xl">Etnografia/Observação</h6>
                            </div>
                            <p className="text-lg text-muted-foreground">O analista observa o operador no dia a dia. Descobre requisitos que o usuário nem sabia que tinha (ex: automação de preenchimento de planilhas de turno).</p>
                            <div className="mt-4 flex items-center gap-2 text-lg font-bold text-amber-600">
                               <span className="p-1 bg-amber-100 rounded">PRÓ</span> Captura o fluxo real.
                            </div>
                         </div>
                         <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-border group hover:border-red-500 transition-colors">
                            <div className="flex items-center gap-4 mb-4">
                               <span className="text-3xl">📊</span>
                               <h6 className="font-black text-xl">Análise de Documentos</h6>
                            </div>
                            <p className="text-lg text-muted-foreground">Estudar manuais da Petrobras, NRs e sistemas legados. Essencial para garantir a conformidade normativa e técnica do novo software.</p>
                            <div className="mt-4 flex items-center gap-2 text-lg font-bold text-red-600">
                               <span className="p-1 bg-red-100 rounded">PRÓ</span> Base sólida e legal.
                            </div>
                         </div>
                      </div>

                      <div className="p-8 bg-[#0a0a0a] text-slate-100 rounded-3xl shadow-2xl relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
                        <h5 className="text-2xl font-black mb-6 flex items-center gap-3">
                           🎓 Mesa de Priorização: MoSCoW
                        </h5>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                           <div className="p-4 bg-red-500/20 border border-red-500/40 rounded-xl text-center">
                              <p className="text-xl font-black text-red-400">MUST</p>
                              <p className="text-[10px] uppercase tracking-widest mt-1">Essencial</p>
                           </div>
                           <div className="p-4 bg-amber-500/20 border border-amber-500/40 rounded-xl text-center">
                              <p className="text-xl font-black text-amber-400">SHOULD</p>
                              <p className="text-[10px] uppercase tracking-widest mt-1">Importante</p>
                           </div>
                           <div className="p-4 bg-blue-500/20 border border-blue-500/40 rounded-xl text-center">
                              <p className="text-xl font-black text-blue-400">COULD</p>
                              <p className="text-[10px] uppercase tracking-widest mt-1">Desejável</p>
                           </div>
                           <div className="p-4 bg-slate-500/20 border border-slate-500/40 rounded-xl text-center">
                              <p className="text-xl font-black text-slate-400">WON'T</p>
                              <p className="text-[10px] uppercase tracking-widest mt-1">Não agora</p>
                           </div>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="Análise, Especificação e Validação"
              variant={mv[3]}
            />

            <ContentAccordion
              titulo="Conceituação - Documentação e Especificação"
              icone="📄"
              corIndicador="bg-slate-800"
              defaultOpen={false}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                       <div className="prose prose-slate dark:prose-invert max-w-none">
                          <p className="text-lg">Após elicitar, precisamos escrever. O resultado principal é o **SRS (Software Requirements Specification)**.</p>
                       </div>

                       <div className="space-y-6">
                          <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-xl">
                             <h6 className="font-bold flex items-center gap-2 mb-4">📌 Características de um Bom Requisito</h6>
                             <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-lg font-mono">
                                <div className="p-2 border border-blue-500/30 rounded bg-blue-500/5">CORRETO</div>
                                <div className="p-2 border border-blue-500/30 rounded bg-blue-500/5">NÃO AMBÍGUO</div>
                                <div className="p-2 border border-blue-500/30 rounded bg-blue-500/5">COMPLETO</div>
                                <div className="p-2 border border-blue-500/30 rounded bg-blue-500/5">CONSISTENTE</div>
                                <div className="p-2 border border-blue-500/30 rounded bg-blue-500/5">VERIFICÁVEL</div>
                                <div className="p-2 border border-blue-500/30 rounded bg-blue-500/5">RASTRÁVEL</div>
                             </div>
                          </div>

                          <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                             <h6 className="font-black text-emerald-700 mb-4 uppercase text-lg tracking-widest flex items-center gap-2">
                                🛡️ Validação vs Verificação (V&V)
                             </h6>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                   <p className="font-bold text-lg">Verificação (Documento)</p>
                                   <p className="text-lg text-muted-foreground italic">"O requisito foi escrito conforme o padrão IEEE 830?"</p>
                                   <p className="text-lg">Foco no **PROCESSO**. Checa se a especificação está correta técnica e gramaticalmente.</p>
                                </div>
                                <div className="space-y-3">
                                   <p className="font-bold text-lg">Validação (Necessidade)</p>
                                   <p className="text-lg text-muted-foreground italic">"O software que estamos pedindo resolve o problema do poço?"</p>
                                   <p className="text-lg">Foco no **CLIENTE**. Checa se estamos construindo o sistema certo.</p>
                                </div>
                             </div>
                          </div>
                       </div>

                       <AlertBox tipo="warning" titulo="⚠️ pontos de atenção CESGRANRIO: Rastreabilidade">
                          A **Rastreabilidade** pode ser:
                          - **Forward (Avançante):** Do requisito para o código e testes.
                          - **Backward (Retroativa):** Do código/teste voltando para o requisito original.
                          Bancas adoram perguntar o que acontece quando um requisito é alterado sem rastreabilidade. **Resposta:** Inconsistência e bugs 'fantasma'.
                       </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <ModuleConsolidation
            index={3}
            variant={mv[3]}
            resumoVisual={{
              moduloNome: "Módulo 3",
              tituloAula: titulo,
              materia: materiaNome,
              images: [
                {
                  title: "Mapa Mental de Requisitos",
                  type: "Infográfico",
                  placeholderColor: "blue",
                  imageUrl: "https://images.unsplash.com/photo-1454165833772-d996d49511d3?q=80&w=2070&auto=format&fit=crop",
                },
                {
                  title: "Workshops de Elicitação",
                  type: "Card",
                  placeholderColor: "emerald",
                  imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "MoSCoW na Mente",
              content: (
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                       <span className="w-8 h-8 rounded bg-red-500 text-white flex items-center justify-center font-bold">M</span>
                       <p className="text-lg font-bold">**M**ust Have (Imprescindível)</p>
                    </div>
                    <div className="flex items-center gap-3">
                       <span className="w-8 h-8 rounded bg-amber-500 text-white flex items-center justify-center font-bold">S</span>
                       <p className="text-lg font-bold">**S**hould Have (Importante mas não mata o projeto)</p>
                    </div>
                    <div className="flex items-center gap-3">
                       <span className="w-8 h-8 rounded bg-blue-500 text-white flex items-center justify-center font-bold">C</span>
                       <p className="text-lg font-bold">**C**ould Have (Seria legal ter)</p>
                    </div>
                    <div className="flex items-center gap-3">
                       <span className="w-8 h-8 rounded bg-slate-500 text-white flex items-center justify-center font-bold">W</span>
                       <p className="text-lg font-bold">**W**on't Have (Fica para a versão 2.0)</p>
                    </div>
                  </div>
                </div>
              ),
            }}
            />

          <section id="quiz-modulo-3">
            <QuizInterativo
              questoes={quizM3}
              titulo="QUIZ: Engenharia de Requisitos"
              variant={mv[3]}
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ══════════════════════════════════════════════════════
          MÓDULO 4: ARQUITETURA E UML
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-4" className="mt-0">
        <ModuleBanner
          numero={4}
          titulo="Arquitetura de Software e UML"
          descricao="A estrutura óssea do sistema. Domine a modelagem com UML 2.0 e os padrões de projeto que resolvem problemas recorrentes."
          variant={mv[4]}
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index="INTRO"
              title="Modelagem com UML 2.0"
              variant={mv[4]}
            />

            <ContentAccordion
              titulo="Conceituação - O que é UML e para que serve?"
              icone="📐"
              corIndicador="bg-blue-600"
              defaultOpen={true}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                      <div className="prose prose-slate dark:prose-invert max-w-none">
                        <p className="text-lg leading-relaxed">
                          A **UML (Unified Modeling Language)** não é um processo, mas uma **linguagem visual** para especificar, visualizar e documentar sistemas. Para a CESGRANRIO, você precisa diferenciar os diagramas **Estruturais** dos **Comportamentais**.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="p-6 bg-blue-50 dark:bg-blue-950/20 rounded-2xl border border-blue-200 dark:border-blue-800">
                            <h6 className="font-bold text-blue-700 dark:text-blue-400 mb-4 flex items-center gap-2">
                               🏗️ Diagramas Estruturais (Estáticos)
                            </h6>
                            <p className="text-lg text-muted-foreground mb-4 font-mono tracking-tighter">Mostram 'o que existe' no sistema.</p>
                            <ul className="space-y-2 text-lg">
                               <li className="flex gap-2"><strong>Classes:</strong> O mais importante. Mostra classes, atributos e relações.</li>
                               <li className="flex gap-2"><strong>Objetos:</strong> Instância das classes em um momento T.</li>
                               <li className="flex gap-2"><strong>Componentes:</strong> Como o código é repartido fisicamente.</li>
                               <li className="flex gap-2"><strong>Implantação (Deployment):</strong> Topologia de hardware e rede.</li>
                               <li className="flex gap-2"><strong>Pacotes:</strong> Organização lógica de pastas/namespaces.</li>
                               <li className="flex gap-2"><strong>Estrutura Composta:</strong> Estrutura interna de uma classe complexa.</li>
                            </ul>
                         </div>
                         <div className="p-6 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-800">
                            <h6 className="font-bold text-emerald-700 dark:text-emerald-400 mb-4 flex items-center gap-2">
                               ⚡ Diagramas Comportamentais (Dinâmicos)
                            </h6>
                            <p className="text-lg text-muted-foreground mb-4 font-mono tracking-tighter">Mostram 'como funciona' o sistema.</p>
                            <ul className="space-y-2 text-lg">
                               <li className="flex gap-2 text-emerald-600 font-bold">Sequência: Interação cronológica (mensagens).</li>
                               <li className="flex gap-2"><strong>Casos de Uso:</strong> Interação Ator vs Sistema.</li>
                               <li className="flex gap-2"><strong>Atividades:</strong> Fluxograma de processos (lógica).</li>
                               <li className="flex gap-2"><strong>Estados (Statechart):</strong> Ciclo de vida de um objeto.</li>
                               <li className="flex gap-2"><strong>Comunicação:</strong> Foco nos vínculos entre objetos.</li>
                               <li className="flex gap-2"><strong>Visão Geral de Interação:</strong> Combina Atv e Seq.</li>
                            </ul>
                         </div>
                      </div>
                      
                      <AlertBox tipo="info" titulo="🎓 Dica Ouro: Diagrama de Classes">
                        Nas relações entre classes, foque em 3 conceitos:
                        1. **Generalização:** Herança ("É um").
                        2. **Associação:** Conexão simples ("Conhece um").
                        3. **Dependência:** Usa temporariamente ("Depende de").
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            <ContentAccordion
              titulo="Detalhamento - Relações Fortes: Agregação vs Composição"
              icone="💎"
              corIndicador="bg-amber-600"
              defaultOpen={false}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                       <div className="prose prose-slate dark:prose-invert max-w-none text-center">
                          <p className="text-lg">Esta é a questão favorita de UML nas provas. Entenda de uma vez por todas.</p>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="relative p-6 bg-white dark:bg-slate-900 rounded-2xl border shadow-inner">
                             <div className="absolute top-0 right-0 p-3">
                                <div className="w-6 h-10 border-2 border-slate-300 dark:border-slate-600 rotate-45 transform origin-bottom -translate-y-2"></div>
                             </div>
                             <h6 className="font-bold text-amber-600 mb-2">Agregação (Diamante Vazio)</h6>
                             <p className="text-lg font-mono mb-4 text-muted-foreground">Relacionamento 'Fraco'.</p>
                             <p className="text-lg">A parte existe sem o todo. Exemplo: **Departamento** e **Professor**. Se o departamento fechar, o professor continua existindo (ele só perde o vínculo).</p>
                             <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800 rounded text-center font-bold text-lg text-slate-500">
                                ◇───────
                             </div>
                          </div>
                          <div className="relative p-6 bg-slate-900 dark:bg-black rounded-2xl border border-slate-700 shadow-2xl">
                             <div className="absolute top-0 right-0 p-3">
                                <div className="w-6 h-10 bg-slate-100 border-2 border-slate-100 rotate-45 transform origin-bottom -translate-y-2"></div>
                             </div>
                             <h6 className="font-bold text-blue-400 mb-2">Composição (Diamante Preenchido)</h6>
                             <p className="text-lg font-mono mb-4 text-slate-500">Relacionamento 'Forte'.</p>
                             <p className="text-lg text-slate-300">A parte NÃO existe sem o todo. Exemplo: **Nota Fiscal** e **Itens da Nota**. Se a nota fiscal for deletada, os itens perdem o sentido e morrem com ela.</p>
                             <div className="mt-4 p-3 bg-slate-800 rounded text-center font-bold text-lg text-blue-400">
                                ◆───────
                             </div>
                          </div>
                       </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Padrões de Projeto (GoF)"
              variant={mv[4]}
            />

            <ContentAccordion
              titulo="Exemplificação - Os 3 Tipos de Patterns"
              icone="🧩"
              corIndicador="bg-emerald-600"
              defaultOpen={false}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                       <p className="text-lg">Os padrões da Gang of Four (GoF) resolvem problemas comuns de design. Eles se dividem em:</p>
                       
                       <div className="space-y-6">
                          {/* CRIAÇÃO */}
                          <div className="p-6 bg-emerald-500/5 border-l-4 border-emerald-500 rounded-r-xl">
                             <h6 className="font-black text-emerald-700 text-lg mb-2">1. Criação (Creational)</h6>
                             <p className="text-lg text-muted-foreground mb-4">Lidam com a instanciação de objetos. Ocultam a lógica de criação do usuário.</p>
                             <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div className="p-2 bg-white dark:bg-slate-800 border rounded text-center text-[10px] font-bold">SINGLETON</div>
                                <div className="p-2 bg-white dark:bg-slate-800 border rounded text-center text-[10px] font-bold">FACTORY METHOD</div>
                                <div className="p-2 bg-white dark:bg-slate-800 border rounded text-center text-[10px] font-bold">ABSTRACT FACTORY</div>
                                <div className="p-2 bg-white dark:bg-slate-800 border rounded text-center text-[10px] font-bold">BUILDER / PROTOTYPE</div>
                             </div>
                          </div>

                          {/* ESTRUTURAL */}
                          <div className="p-6 bg-blue-500/5 border-l-4 border-blue-500 rounded-r-xl">
                             <h6 className="font-black text-blue-700 text-lg mb-2">2. Estrutural (Structural)</h6>
                             <p className="text-lg text-muted-foreground mb-4">Lidam com a composição de classes ou objetos (como eles se montam).</p>
                             <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div className="p-2 bg-white dark:bg-slate-800 border rounded text-center text-[10px] font-bold">ADAPTER</div>
                                <div className="p-2 bg-white dark:bg-slate-800 border rounded text-center text-[10px] font-bold">FACADE</div>
                                <div className="p-2 bg-white dark:bg-slate-800 border rounded text-center text-[10px] font-bold">DECORATOR</div>
                                <div className="p-2 bg-white dark:bg-slate-800 border rounded text-center text-[10px] font-bold">PROXY / BRIDGE</div>
                             </div>
                          </div>

                          {/* COMPORTAMENTAL */}
                          <div className="p-6 bg-amber-500/5 border-l-4 border-amber-500 rounded-r-xl">
                             <h6 className="font-black text-amber-700 text-lg mb-2">3. Comportamental (Behavioral)</h6>
                             <p className="text-lg text-muted-foreground mb-4">Lidam com a comunicação e as responsabilidades entre os objetos.</p>
                             <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div className="p-2 bg-white dark:bg-slate-800 border rounded text-center text-[10px] font-bold">STRATEGY</div>
                                <div className="p-2 bg-white dark:bg-slate-800 border rounded text-center text-[10px] font-bold">OBSERVER</div>
                                <div className="p-2 bg-white dark:bg-slate-800 border rounded text-center text-[10px] font-bold">COMMAND</div>
                                <div className="p-2 bg-white dark:bg-slate-800 border rounded text-center text-[10px] font-bold">TEMPLATE METHOD</div>
                             </div>
                          </div>
                       </div>
                    </div>
                  ),
                },
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <FlipCard 
                 frente={<div className="text-center font-bold">SINGLETON</div>}
                 verso={<div className="text-lg p-4 bg-slate-950 text-white rounded-xl">Garante uma única instância global. Ideal para Loggers e Conexão de BD.</div>}
               />
               <FlipCard 
                 frente={<div className="text-center font-bold">FACADE</div>}
                 verso={<div className="text-lg p-4 bg-slate-950 text-white rounded-xl">Interface simplificada para sistema complexo. Uma 'fachada' limpa.</div>}
               />
               <FlipCard 
                 frente={<div className="text-center font-bold">STRATEGY</div>}
                 verso={<div className="text-lg p-4 bg-slate-950 text-white rounded-xl">Encapsula algoritmos e os torna intercambiáveis em tempo de execução.</div>}
               />
            </div>
          </section>

          

          <section id="quiz-modulo-4">


<ModuleConsolidation
            index={3}
            variant={mv[4]}
            resumoVisual={{
              moduloNome: "Módulo 4",
              tituloAula: titulo,
              materia: materiaNome,
              images: [
                {
                  title: "Diagrama de Classes Exemplo",
                  type: "Diagrama",
                  placeholderColor: "blue",
                  imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
                },
                {
                  title: "Padrões GoF Resumo",
                  type: "Infográfico",
                  placeholderColor: "emerald",
                  imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "O Segredo dos Diagramas",
              content: (
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-500/10 rounded-xl text-center">
                    <p className="font-bold text-lg uppercase mb-2">QUEM?</p>
                    <p className="text-lg">Diagramas de Classes e Objetos</p>
                  </div>
                  <div className="p-4 bg-emerald-500/10 rounded-xl text-center">
                    <p className="font-bold text-lg uppercase mb-2">QUANDO?</p>
                    <p className="text-lg">Diagrama de Sequência e Atividade</p>
                  </div>
                </div>
              ),
            }}
            />

                      <QuizInterativo
              questoes={quizM4}
              titulo="QUIZ: Arquitetura e UML"
              variant={mv[4]}
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ══════════════════════════════════════════════════════
          MÓDULO 5: AGILIDADE E DEVOPS
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-5" className="mt-0">
        <ModuleBanner
          numero={5}
          titulo="Agilidade, Scrum e DevOps"
          descricao="O mundo real do desenvolvimento moderno. Saiba como equipes ágeis entregam valor contínuo através de Scrum e automação CI/CD."
          variant={mv[5]}
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index="INTRO"
              title="Scrum e Kanban"
              variant={mv[5]}
            />

            <ContentAccordion
              titulo="Conceituação - O Framework Scrum"
              icone="🏃"
              corIndicador="bg-amber-500"
              defaultOpen={true}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                      <div className="prose prose-slate dark:prose-invert max-w-none">
                        <p className="text-lg">
                          Scrum é um framework **empírico** focado em transparência, inspeção e adaptação. Ele resolve problemas complexos através de ciclos curtos chamados **Sprints**.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         {/* PAPÉIS */}
                         <div className="p-5 bg-amber-50 dark:bg-amber-950/20 rounded-2xl border border-amber-200 dark:border-amber-800">
                            <h6 className="font-bold text-amber-700 dark:text-amber-400 mb-3 uppercase text-lg tracking-tighter">Papéis (Pessoas)</h6>
                            <ul className="text-lg space-y-3">
                               <li>👤 **Product Owner (PO):** Maximiza o valor do produto. É o dono do Backlog.</li>
                               <li>🛠️ **Developers:** Fazem o trabalho técnico. São autogerenciáveis.</li>
                               <li>🧘 **Scrum Master:** Líder servidor. Remove impedimentos e ensina o Scrum.</li>
                            </ul>
                         </div>
                         {/* EVENTOS */}
                         <div className="p-5 bg-blue-50 dark:bg-blue-950/20 rounded-2xl border border-blue-200 dark:border-blue-800">
                            <h6 className="font-bold text-blue-700 dark:text-blue-400 mb-3 uppercase text-lg tracking-tighter">Eventos (Ritos)</h6>
                            <ul className="text-lg space-y-3">
                               <li>📅 **Sprint Planning:** O que vamos fazer?</li>
                               <li>☀️ **Daily Scrum:** Alinhamento diário (15 min).</li>
                               <li>🔍 **Sprint Review:** Apresentação do incremento ao cliente.</li>
                               <li>🔄 **Sprint Retrospective:** Melhoria do PROCESSO do time.</li>
                            </ul>
                         </div>
                         {/* ARTEFATOS */}
                         <div className="p-5 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-800">
                            <h6 className="font-bold text-emerald-700 dark:text-emerald-400 mb-3 uppercase text-lg tracking-tighter">Artefatos (Entregas)</h6>
                            <ul className="text-lg space-y-3">
                               <li>📖 **Product Backlog:** Lista de tudo o que pode ser feito.</li>
                               <li>🎯 **Sprint Backlog:** Itens selecionados para a Sprint.</li>
                               <li>📦 **Increment (DoR/DoD):** Software pronto, testado e funcional.</li>
                            </ul>
                         </div>
                      </div>

                      <AlertBox tipo="info" titulo="🎓 Dica Scrum 2024">
                        O Guia Scrum mais recente reafirma: **não existe mais o papel de 'Gestor de Projeto' no Scrum**. O time é autônomo.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            <ContentAccordion
              titulo="Detalhamento - Kanban e Métricas de Fluxo"
              icone="📊"
              corIndicador="bg-slate-700"
              defaultOpen={false}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                      <div className="prose prose-slate dark:prose-invert max-w-none">
                         <p className="text-lg">Diferente do Scrum que é baseado em Sprints, o Kanban é focado no **fluxo contínuo**. Ele usa o sistema 'puxado' e visualização densa de tarefas.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-3xl">
                            <h6 className="font-black text-lg uppercase mb-4 tracking-widest text-slate-500">Métricas Críticas</h6>
                            <div className="space-y-4">
                               <div className="flex justify-between items-center p-3 bg-white dark:bg-black rounded-lg border">
                                  <span className="text-lg font-bold">1. LEAD TIME</span>
                                  <span className="text-[10px] text-blue-500">Pedido → Entrega Final</span>
                               </div>
                               <div className="flex justify-between items-center p-3 bg-white dark:bg-black rounded-lg border">
                                  <span className="text-lg font-bold">2. CYCLE TIME</span>
                                  <span className="text-[10px] text-emerald-500">Início do Trabalho → Conclusão</span>
                               </div>
                               <div className="flex justify-between items-center p-3 bg-white dark:bg-black rounded-lg border">
                                  <span className="text-lg font-bold">3. THROUGHPUT</span>
                                  <span className="text-[10px] text-amber-500">Entregáveis por Unidade de Tempo</span>
                               </div>
                            </div>
                         </div>
                         <div className="p-6 border-4 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col justify-center items-center text-center">
                            <span className="text-5xl opacity-20 mb-4">🛑</span>
                            <h6 className="font-bold text-xl mb-2">WIP LIMIT</h6>
                            <p className="text-lg text-muted-foreground">O limite de **Trabalho em Progresso**. Significa: 'Pare de começar e comece a terminar'. Essencial para evitar multitarefa nociva.</p>
                         </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Cultura DevOps e Automação"
              variant={mv[5]}
            />

            <ContentAccordion
              titulo="Conceituação - DevOps e o Loop de Feedback"
              icone="♾️"
              corIndicador="bg-blue-700"
              defaultOpen={false}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                       <div className="prose prose-slate dark:prose-invert max-w-none">
                          <p className="text-lg leading-relaxed">
                            DevOps não é uma ferramenta, é uma **Cultura**. O objetivo é quebrar o muro entre quem Desenvolve (Dev) e quem Opera (Ops) para entregar software mais rápido com maior qualidade.
                          </p>
                       </div>

                       <div className="p-8 bg-blue-600 rounded-3xl shadow-xl text-white">
                          <h6 className="font-black mb-6 flex items-center gap-2">🚀 O Pipeline CI/CD (Contínuo)</h6>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                             <div className="space-y-2">
                                <p className="text-lg font-bold border-b border-blue-400 pb-2">1. Continuous Integration (CI)</p>
                                <p className="text-[10px] opacity-90 leading-relaxed">Código é mergeado no repositório principal várias vezes ao dia. Testes automáticos rodam a cada commit. **Objetivo: Pegar bugs na raiz.**</p>
                             </div>
                             <div className="space-y-2">
                                <p className="text-lg font-bold border-b border-blue-400 pb-2">2. Continuous Delivery (CD)</p>
                                <p className="text-[10px] opacity-90 leading-relaxed">O software está SEMPRE em estado deployável. O deploy para produção é um 'clique de botão' manual.</p>
                             </div>
                             <div className="space-y-2">
                                <p className="text-lg font-bold border-b border-blue-400 pb-2">3. Continuous Deployment (CD²)</p>
                                <p className="text-[10px] opacity-90 leading-relaxed">Automação total. Se o código passar em todos os testes do pipeline, ele vai para PRODUÇÃO sem intervenção humana.</p>
                             </div>
                          </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border">
                               <h6 className="font-bold mb-3 flex items-center gap-2">🛠️ Infrastructure as Code (IaC)</h6>
                               <p className="text-lg text-muted-foreground">Gerenciar servidores e redes usando arquivos de configuração (ex: Docker, Terraform). Permite que o ambiente de produção seja idêntico ao de desenvolvimento.</p>
                            </div>
                            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border">
                               <h6 className="font-bold mb-3 flex items-center gap-2">📈 Observabilidade</h6>
                               <p className="text-lg text-muted-foreground">Monitoramento proativo com Logs, Métricas e Tracing. Não apenas saber que o sistema caiu, mas entender 'por que' antes mesmo de cair.</p>
                            </div>
                       </div>

                       <AlertBox tipo="danger" titulo="⚠️ Cuidado: Antipatronage DevOps">
                          Comprar ferramentas caras (Jenkins, Jira, AWS) sem mudar a cultura de colaboração das equipes NÃO é DevOps. DevOps é primeiramente sobre **pessoas**.
                       </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          

          <section id="quiz-modulo-5">


<ModuleConsolidation
            index={3}
            variant={mv[5]}
            resumoVisual={{
              moduloNome: "Módulo 5",
              tituloAula: titulo,
              materia: materiaNome,
              images: [
                {
                  title: "Fluxo Scrum",
                  type: "Diagrama",
                  placeholderColor: "blue",
                  imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
                },
                {
                  title: "Esteira CI/CD",
                  type: "Infográfico",
                  placeholderColor: "emerald",
                  imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?q=80&w=2070&auto=format&fit=crop",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "As Três Maneiras do DevOps",
              content: (
                <div className="space-y-4">
                  <TimelineItem 
                    passo={1} 
                    titulo="Acelerar o Fluxo" 
                    descricao="Reduzir lead time (Esquerda para Direita)." 
                  />
                  <TimelineItem 
                    passo={2} 
                    titulo="Amplificar o Feedback" 
                    descricao="Ciclos curtos (Direita para Esquerda)." 
                  />
                  <TimelineItem 
                    passo={3} 
                    titulo="Cultura de Aprendizado" 
                    descricao="Experimentação e riscos calculados." 
                  />
                </div>
              ),
            }}
            />

                      <QuizInterativo
              questoes={quizM5}
              titulo="QUIZ: Agilidade e DevOps"
              variant={mv[5]}
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
        </div>
      </TabsContent>
      {/* ══════════════════════════════════════════════════════
          MÓDULO 6: BANCO DE DADOS RELACIONAL (SQL)
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-6" className="mt-0">
        <ModuleBanner
          numero={6}
          titulo="Bancos de Dados Relacionais e SQL"
          descricao="O coração da persistência. Domine o modelo relacional, normzalização, integridade e a linguagem SQL para consultas complexas."
          variant={mv[6]}
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index="INTRO"
              title="O Modelo Relacional e Normalização"
              variant={mv[6]}
            />

            <ContentAccordion
              titulo="Conceituação - Teorias Médicas das Tabelas"
              icone="📊"
              corIndicador="bg-indigo-600"
              defaultOpen={true}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                      <div className="prose prose-slate dark:prose-invert max-w-none">
                        <p className="text-lg leading-relaxed">
                          O modelo relacional, proposto por **E.F. Codd**, organiza dados em tabelas (relações) onde cada linha é única (tupla). A base de tudo é a **Álgebra Relacional**.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="p-6 bg-indigo-50 dark:bg-indigo-950/20 rounded-2xl border border-indigo-200">
                            <h6 className="font-bold text-indigo-700 mb-4">🔑 Chaves e Integridade</h6>
                            <ul className="space-y-3 text-lg">
                               <li className="flex gap-2"><strong>PK (Primary Key):</strong> Identificador único da linha. Não aceita nulos.</li>
                               <li className="flex gap-2"><strong>FK (Foreign Key):</strong> Garante a integridade referencial entre tabelas.</li>
                               <li className="flex gap-2"><strong>UK (Unique Key):</strong> Garante unicidade, mas aceita um valor nulo.</li>
                               <li className="flex gap-2 text-red-600 font-bold">Integridade de Entidade: PK não pode ser nula.</li>
                               <li className="flex gap-2 text-indigo-600 font-bold">Integridade Referencial: FK deve apontar para uma PK existente ou ser nula.</li>
                            </ul>
                         </div>
                         <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border">
                            <h6 className="font-bold text-slate-700 mb-4">🏠 As Formas Normais (FN)</h6>
                            <p className="text-lg text-muted-foreground mb-4 italic">Evitando a redundância e anomalias de atualização.</p>
                            <div className="space-y-2">
                               <div className="p-2 bg-white dark:bg-black border rounded text-lg">**1FN:** Atributos atômicos (sem listas ou tabelas dentro de colunas).</div>
                               <div className="p-2 bg-white dark:bg-black border rounded text-lg">**2FN:** Estar na 1FN + Toda coluna não-chave depende de TODA a PK (completa).</div>
                               <div className="p-2 bg-white dark:bg-black border rounded text-lg">**3FN:** Estar na 2FN + Nenhuma coluna não-chave depende de outra não-chave (transitividade).</div>
                            </div>
                         </div>
                      </div>

                      <AlertBox tipo="warning" titulo="⚠️ pontos de atenção CESGRANRIO: BCNF">
                        A Forma Normal de **Boyce-Codd (BCNF)** é uma versão mais rigorosa da 3FN. Ela trata de tabelas com chaves candidatas compostas que se sobrepõem. Se a prova perguntar qual FN é "mais forte" que a 3FN, a resposta costuma ser BCNF.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            <ContentAccordion
              titulo="Detalhamento - Transações e Propriedades ACID"
              icone="⚖️"
              corIndicador="bg-red-600"
              defaultOpen={false}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                       <div className="prose prose-slate dark:prose-invert max-w-none">
                          <p className="text-lg">Para sistemas críticos na Petrobras (como controle financeiro de exploração), o banco DEVE ser transacional e seguir o **ACID**.</p>
                       </div>

                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="p-4 bg-red-100 dark:bg-red-950/40 border border-red-200 rounded-xl text-center">
                             <p className="text-xl font-black text-red-600">A</p>
                             <p className="text-[10px] font-bold">ATOMICIDADE</p>
                             <p className="text-[9px] mt-2 opacity-70">Tudo ou Nada.</p>
                          </div>
                          <div className="p-4 bg-blue-100 dark:bg-blue-950/40 border border-blue-200 rounded-xl text-center">
                             <p className="text-xl font-black text-blue-600">C</p>
                             <p className="text-[10px] font-bold">CONSISTÊNCIA</p>
                             <p className="text-[9px] mt-2 opacity-70">Regras de integridade mantidas.</p>
                          </div>
                          <div className="p-4 bg-amber-100 dark:bg-amber-950/40 border border-amber-200 rounded-xl text-center">
                             <p className="text-xl font-black text-amber-600">I</p>
                             <p className="text-[10px] font-bold">ISOLAMENTO</p>
                             <p className="text-[9px] mt-2 opacity-70">Transações paralelas não se chocam.</p>
                          </div>
                          <div className="p-4 bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-200 rounded-xl text-center">
                             <p className="text-xl font-black text-emerald-600">D</p>
                             <p className="text-[10px] font-bold">DURABILIDADE</p>
                             <p className="text-[9px] mt-2 opacity-70">Dados persistem após crash.</p>
                          </div>
                       </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Linguagem SQL (DDL, DML, DCL, TCL)"
              variant={mv[6]}
            />

            <ContentAccordion
              titulo="Exemplificação - Categorias de Comandos"
              icone="💾"
              corIndicador="bg-slate-800"
              defaultOpen={false}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-6">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="p-5 bg-slate-900 text-white rounded-2xl">
                             <h6 className="text-emerald-400 font-bold mb-3">DDL (Data Definition)</h6>
                             <p className="text-lg mb-4">Cria a estrutura (o esqueleto).</p>
                             <div className="flex gap-2 flex-wrap">
                                <span className="px-2 py-1 bg-slate-800 rounded text-[10px] font-mono">CREATE</span>
                                <span className="px-2 py-1 bg-slate-800 rounded text-[10px] font-mono">ALTER</span>
                                <span className="px-2 py-1 bg-slate-800 rounded text-[10px] font-mono">DROP</span>
                                <span className="px-2 py-1 bg-slate-800 rounded text-[10px] font-mono">TRUNCATE</span>
                             </div>
                          </div>
                          <div className="p-5 bg-slate-900 text-white rounded-2xl">
                             <h6 className="text-blue-400 font-bold mb-3">DML (Data Manipulation)</h6>
                             <p className="text-lg mb-4">Lida com os dados (o conteúdo).</p>
                             <div className="flex gap-2 flex-wrap">
                                <span className="px-2 py-1 bg-slate-800 rounded text-[10px] font-mono">SELECT</span>
                                <span className="px-2 py-1 bg-slate-800 rounded text-[10px] font-mono">INSERT</span>
                                <span className="px-2 py-1 bg-slate-800 rounded text-[10px] font-mono">UPDATE</span>
                                <span className="px-2 py-1 bg-slate-800 rounded text-[10px] font-mono">DELETE</span>
                             </div>
                          </div>
                       </div>

                       <AlertBox tipo="info" titulo="🎓 Joins: A Grande Confusão">
                          - **INNER JOIN:** Registros que batem nas duas tabelas.
                          - **LEFT JOIN:** Tudo da esquerda + o que bater na direita.
                          - **FULL OUTER:** Tudo de ambas (muito raro em produção).
                          - **CROSS JOIN:** Produto cartesiano (Cuidado! Pode travar o banco).
                       </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          

          <section id="quiz-modulo-6">


<ModuleConsolidation
            index={3}
            variant={mv[6]}
            resumoVisual={{
              moduloNome: "Módulo 6",
              tituloAula: titulo,
              materia: materiaNome,
              images: [
                {
                  title: "Diagrama Entidade-Relacionamento",
                  type: "Diagrama",
                  placeholderColor: "indigo",
                  imageUrl: "https://images.unsplash.com/photo-1544383335-cccf3b82d3ef?q=80&w=2070&auto=format&fit=crop",
                },
                {
                  title: "Hierarquia SQL",
                  type: "Infográfico",
                  placeholderColor: "slate",
                  imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?q=80&w=2070&auto=format&fit=crop",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "ACID de Inverno",
              content: (
                <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                   <p className="text-lg italic">"O banco de dados é um ácido que corrói a bagunça: **A**tômico, **C**onsistente, **I**solado e **D**urável."</p>
                </div>
              ),
            }}
            />

                      <QuizInterativo
              questoes={quizM6}
              titulo="QUIZ: Bancos de Dados SQL"
              variant={mv[6]}
              onComplete={(score) => handleModuleComplete("modulo-6", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ══════════════════════════════════════════════════════
          MÓDULO 7: NOSQL E BIG DATA
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-7" className="mt-0">
        <ModuleBanner
          numero={7}
          titulo="NoSQL, Big Data e Arquitetura de Dados"
          descricao="Quando o relacional não basta. Explore o Teorema CAP, bancos de documentos, grafos, chave-valor e o ecossistema Hadoop."
          variant={mv[7]}
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index="INTRO"
              title="O Teorema CAP e Tipos de NoSQL"
              variant={mv[7]}
            />

            <ContentAccordion
              titulo="Conceituação - Por que NoSQL?"
              icone="🌐"
              corIndicador="bg-emerald-600"
              defaultOpen={true}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                      <div className="prose prose-slate dark:prose-invert max-w-none">
                        <p className="text-lg">NoSQL (**Not Only SQL**) surgiu para lidar com as 3 metas clássicas do Big Data: **V**olume, **V**elocidade e **V**ariedade.</p>
                      </div>

                      <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                         <h6 className="font-black text-emerald-700 mb-6 flex items-center gap-2">📊 Teorema CAP (Brewer)</h6>
                         <p className="text-lg mb-6">Em um sistema distribuído, você só pode escolher **DOIS** destes três:</p>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center p-3 border rounded-xl">
                               <p className="font-black text-xl">C</p>
                               <p className="text-[10px] font-bold">CONSISTENCY</p>
                               <p className="text-[9px] opacity-70">Todos vêem o mesmo dado simultaneamente.</p>
                            </div>
                            <div className="text-center p-3 border rounded-xl">
                               <p className="font-black text-xl">A</p>
                               <p className="text-[10px] font-bold">AVAILABILITY</p>
                               <p className="text-[9px] opacity-70">O sistema sempre responde (mesmo que com dado antigo).</p>
                            </div>
                            <div className="text-center p-3 border rounded-xl">
                               <p className="font-black text-xl">P</p>
                               <p className="text-[10px] font-bold">PARTITION TOLERANCE</p>
                               <p className="text-[9px] opacity-70">O sistema continua funcionando mesmo com falha na rede.</p>
                            </div>
                         </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                         <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl text-center border group hover:border-emerald-500 transition-colors">
                            <span className="text-2xl mb-2 block">📄</span>
                            <h6 className="text-[10px] font-bold uppercase">Documentos</h6>
                            <p className="text-[8px] opacity-70 mt-1">Ex: MongoDB, CouchDB</p>
                         </div>
                         <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl text-center border group hover:border-blue-500 transition-colors">
                            <span className="text-2xl mb-2 block">🔑</span>
                            <h6 className="text-[10px] font-bold uppercase">Chave-Valor</h6>
                            <p className="text-[8px] opacity-70 mt-1">Ex: Redis, DynamoDB</p>
                         </div>
                         <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl text-center border group hover:border-purple-500 transition-colors">
                            <span className="text-2xl mb-2 block">🕸️</span>
                            <h6 className="text-[10px] font-bold uppercase">Grafos</h6>
                            <p className="text-[8px] opacity-70 mt-1">Ex: Neo4j</p>
                         </div>
                         <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl text-center border group hover:border-amber-500 transition-colors">
                            <span className="text-2xl mb-2 block">🏛️</span>
                            <h6 className="text-[10px] font-bold uppercase">Colunares</h6>
                            <p className="text-[8px] opacity-70 mt-1">Ex: Cassandra, HBase</p>
                         </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Fundamentos de Big Data: Hadoop e Spark"
              variant={mv[7]}
            />

            <ContentAccordion
              titulo="Detalhamento - O Ecossistema de Dados"
              icone="🐘"
              corIndicador="bg-amber-600"
              defaultOpen={false}
              mode="stacked"
              slides={[
                {
                   conteudo: (
                     <div className="space-y-6">
                        <div className="p-6 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-xl">
                           <h6 className="font-bold text-amber-700 mb-2">Hadoop (O Elefante)</h6>
                           <p className="text-lg">Focado em armazenamento (**HDFS**) e processamento em lote (**MapReduce**). É o avô do Big Data.</p>
                        </div>
                        <div className="p-6 bg-red-500/10 border-l-4 border-red-500 rounded-r-xl">
                           <h6 className="font-bold text-red-700 mb-2">Apache Spark (Velocidade)</h6>
                           <p className="text-lg">Processamento **In-Memory**. Muito mais rápido que o MapReduce do Hadoop. Usa o conceito de **RDD** (Resilient Distributed Datasets).</p>
                        </div>
                        <AlertBox tipo="info" titulo="🎓 Tipos de Dados">
                           - **Estruturados:** Tabelas SQL.
                           - **Semi-estruturados:** JSON, XML.
                           - **Não-estruturados:** Imagens, Vídeos, PDFs. (Aqui o Big Data brilha!)
                        </AlertBox>
                     </div>
                   )
                }
              ]}
            />
          </section>

          

          <section id="quiz-modulo-7">


<ModuleConsolidation
            index={3}
            variant={mv[7]}
            resumoVisual={{
              moduloNome: "Módulo 7",
              tituloAula: titulo,
              materia: materiaNome,
              images: [
                {
                  title: "Triângulo CAP",
                  type: "Diagrama",
                  placeholderColor: "emerald",
                  imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
                },
                {
                  title: "Cluster de Big Data",
                  type: "Infográfico",
                  placeholderColor: "amber",
                  imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?q=80&w=2070&auto=format&fit=crop",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "BASE vs ACID",
              content: (
                <div className="p-4 bg-emerald-500/10 rounded-xl">
                   <p className="text-lg leading-relaxed">Enguanto SQL é **ACID**, NoSQL é **BASE**: **B**asically **A**vailable, **S**oft-state, **E**ventual consistency.</p>
                </div>
              ),
            }}
            />

                      <QuizInterativo
              questoes={quizM7}
              titulo="QUIZ: NoSQL e Big Data"
              variant={mv[7]}
              onComplete={(score) => handleModuleComplete("modulo-7", score)}
            />
          </section>
        </div>
      </TabsContent>
      {/* ══════════════════════════════════════════════════════
          MÓDULO 8: MICROSERVIÇOS E APIs
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-8" className="mt-0">
        <ModuleBanner
          numero={8}
          titulo="Arquitetura de Microserviços e APIs"
          descricao="Decompondo o monólito. Aprenda sobre escalabilidade, resiliência, REST, gRPC e padrões de comunicação entre serviços."
          variant={mv[8]}
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index="INTRO"
              title="Monólitos vs Microserviços"
              variant={mv[8]}
            />

            <ContentAccordion
              titulo="Conceituação - A Evolução da Arquitetura"
              icone="🏗️"
              corIndicador="bg-cyan-600"
              defaultOpen={true}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                      <div className="prose prose-slate dark:prose-invert max-w-none">
                        <p className="text-lg">Migrar de um monólito para microserviços não é apenas técnico, é organizacional. Segue a **Lei de Conway**: as organizações desenham sistemas que espelham sua estrutura de comunicação.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border flex flex-col items-center text-center">
                            <h6 className="font-bold text-slate-700 mb-4">🏦 Monólito</h6>
                            <p className="text-lg mb-4">Código único, deploy único, banco único.</p>
                            <ul className="text-[10px] space-y-1 opacity-70">
                               <li>✅ Simples de testar inicialmente.</li>
                               <li>✅ Baixa latência interna.</li>
                               <li>❌ Difícil de escalar partes isoladas.</li>
                               <li>❌ Ponto único de falha total.</li>
                            </ul>
                         </div>
                         <div className="p-6 bg-cyan-50 dark:bg-cyan-950/20 rounded-2xl border border-cyan-200 flex flex-col items-center text-center">
                            <h6 className="font-bold text-cyan-700 mb-4">🐝 Microserviços</h6>
                            <p className="text-lg mb-4">Serviços granulares, independentes e focados em negócio.</p>
                            <ul className="text-[10px] space-y-1 opacity-70">
                               <li>✅ Escalabilidade seletiva.</li>
                               <li>✅ Agilidade de deploy independente.</li>
                               <li>❌ Complexidade de rede e latência.</li>
                               <li>❌ Dificuldade de manter consistência (Saga).</li>
                            </ul>
                         </div>
                      </div>

                      <AlertBox tipo="info" titulo="🎓 Características Essenciais">
                         - **Independência de Tecnologia:** Cada serviço pode usar um BD diferente (Poliglota).
                         - **Descentralização:** Não há um 'cérebro' central; cada serviço é dono de seus dados.
                         - **Resiliência:** Se o serviço de 'email' cai, o 'checkout' deve continuar funcionando.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="APIs e Comunicação (REST vs gRPC)"
              variant={mv[8]}
            />

            <ContentAccordion
              titulo="Detalhamento - Como os serviços conversam"
              icone="🔌"
              corIndicador="bg-slate-700"
              defaultOpen={false}
              mode="stacked"
              slides={[
                {
                   conteudo: (
                     <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="p-5 bg-white dark:bg-slate-900 border rounded-2xl shadow-sm">
                              <h6 className="font-bold text-emerald-600 mb-2">REST (Richardson Maturity)</h6>
                              <p className="text-lg text-muted-foreground">O padrão da web. Usa HTTP, verbos (GET, POST, etc) e JSON.</p>
                              <p className="text-[10px] mt-2 font-mono">Nível 0: HTTP puro<br/>Nível 1: Recursos<br/>Nível 2: Verbos HTTP<br/>Nível 3: HATEOAS (Auto-descoberta)</p>
                           </div>
                           <div className="p-5 bg-white dark:bg-slate-900 border rounded-2xl shadow-sm">
                              <h6 className="font-bold text-blue-600 mb-2">gRPC / Mensageria</h6>
                              <p className="text-lg text-muted-foreground">Alta performance. gRPC usa Protocol Buffers (binário) e HTTP/2. Ideal para comunicação **Service-to-Service**.</p>
                              <p className="text-[10px] mt-2 font-mono text-blue-500">RabbitMQ / Kafka: Comunicação Assíncrona.</p>
                           </div>
                        </div>

                        <div className="p-6 bg-amber-500/5 border border-amber-500/20 rounded-2xl">
                           <h6 className="font-black text-amber-700 text-lg uppercase mb-4 tracking-tighter">Padrões de Microserviços</h6>
                           <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              <div className="p-2 bg-white dark:bg-black border rounded text-center text-[9px] font-bold">API GATEWAY</div>
                              <div className="p-2 bg-white dark:bg-black border rounded text-center text-[9px] font-bold">CIRCUIT BREAKER</div>
                              <div className="p-2 bg-white dark:bg-black border rounded text-center text-[9px] font-bold">SERVICE DISCOVERY</div>
                              <div className="p-2 bg-white dark:bg-black border rounded text-center text-[9px] font-bold">STRANGLER FIG</div>
                              <div className="p-2 bg-white dark:bg-black border rounded text-center text-[9px] font-bold">SAGA PATTERN</div>
                              <div className="p-2 bg-white dark:bg-black border rounded text-center text-[9px] font-bold">CQRS</div>
                           </div>
                        </div>
                     </div>
                   )
                }
              ]}
            />
          </section>

          

          <section id="quiz-modulo-8">


<ModuleConsolidation
            index={3}
            variant={mv[8]}
            resumoVisual={{
              moduloNome: "Módulo 8",
              tituloAula: titulo,
              materia: materiaNome,
              images: [
                {
                  title: "Malha de Serviços (Mesh)",
                  type: "Diagrama",
                  placeholderColor: "cyan",
                  imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?q=80&w=2070&auto=format&fit=crop",
                },
                {
                  title: "API Gateway",
                  type: "Infográfico",
                  placeholderColor: "slate",
                  imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Destaque Estratégico: Circuit Breaker",
              content: (
                <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-center">
                   <p className="text-lg">"Se o serviço vizinho está pegando fogo, **FECHE A PORTA** (Open Circuit) para não queimar sua casa também."</p>
                </div>
              ),
            }}
            />

                      <QuizInterativo
              questoes={quizM8}
              titulo="QUIZ: Microserviços"
              variant={mv[8]}
              onComplete={(score) => handleModuleComplete("modulo-8", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ══════════════════════════════════════════════════════
          MÓDULO 9: SEGURANÇA DA INFORMAÇÃO NO SOFTWARE
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-9" className="mt-0">
        <ModuleBanner
          numero={9}
          titulo="Segurança da Informação e OWASP"
          descricao="Blindando sua aplicação. Entenda as vulnerabilidades do OWASP Top 10, criptografia, autenticação JWT e segurança por design."
          variant={mv[9]}
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index="INTRO"
              title="Cultura de Segurança e OWASP Top 10"
              variant={mv[9]}
            />

            <ContentAccordion
              titulo="Conceituação - Os Pilares da Segurança (CID)"
              icone="🛡️"
              corIndicador="bg-red-700"
              defaultOpen={true}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                      <div className="prose prose-slate dark:prose-invert max-w-none">
                        <p className="text-lg">Segurança de software não é um 'add-on', é um processo contínuo (**DevSecOps**). Tudo começa pelos pilares fundamentais:</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         <div className="p-5 bg-red-50 dark:bg-red-950/20 rounded-2xl border border-red-200">
                            <h6 className="font-black text-red-700 mb-2">Confidencialidade</h6>
                            <p className="text-[10px] opacity-70">Garantir que apenas pessoas autorizadas vejam o dado.</p>
                         </div>
                         <div className="p-5 bg-amber-50 dark:bg-amber-950/20 rounded-2xl border border-amber-200">
                            <h6 className="font-black text-amber-700 mb-2">Integridade</h6>
                            <p className="text-[10px] opacity-70">Garantir que o dado não foi alterado indevidamente.</p>
                         </div>
                         <div className="p-5 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200">
                            <h6 className="font-black text-emerald-700 mb-2">Disponibilidade</h6>
                            <p className="text-[10px] opacity-70">Garantir que o sistema esteja acessível quando necessário.</p>
                         </div>
                      </div>

                      <div className="p-6 bg-slate-900 text-white rounded-3xl">
                         <h6 className="font-bold text-red-400 mb-4 flex items-center gap-2">⚠️ OWASP Top 10 (Tendências Atuais)</h6>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[10px]">
                            <div className="p-3 bg-slate-800 rounded-lg flex items-center gap-3">
                               <span className="bg-red-500 w-2 h-2 rounded-full"></span>
                               <span>**A01:2021-Broken Access Control:** Falha na autorização de acesso.</span>
                            </div>
                            <div className="p-3 bg-slate-800 rounded-lg flex items-center gap-3">
                               <span className="bg-red-500 w-2 h-2 rounded-full"></span>
                               <span>**A02:2021-Cryptographic Failures:** Erros no uso de senhas e chaves.</span>
                            </div>
                            <div className="p-3 bg-slate-800 rounded-lg flex items-center gap-3">
                               <span className="bg-red-500 w-2 h-2 rounded-full"></span>
                               <span>**A03:2021-Injection:** SQL Injection, Cross-site Scripting (XSS).</span>
                            </div>
                            <div className="p-3 bg-slate-800 rounded-lg flex items-center gap-3">
                               <span className="bg-red-500 w-2 h-2 rounded-full"></span>
                               <span>**A04:2021-Insecure Design:** Falhas estruturais na lógica de negócio.</span>
                            </div>
                         </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Criptografia e Autenticação"
              variant={mv[9]}
            />

            <ContentAccordion
              titulo="Detalhamento - Protegendo as Portas"
              icone="🔑"
              corIndicador="bg-slate-800"
              defaultOpen={false}
              mode="stacked"
              slides={[
                {
                   conteudo: (
                     <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                              <h6 className="font-bold mb-4">Criptografia: Simétrica vs Assimétrica</h6>
                              <div className="space-y-3 text-lg leading-relaxed">
                                 <p>🔴 **Simétrica:** Mesma chave para cifrar e decifrar (Ex: AES). Rápida, mas difícil de distribuir chaves.</p>
                                 <p>🔵 **Assimétrica:** Par de chaves (Pública e Privada). Ex: RSA, Eliptic Curves. Essencial para TLS e assinaturas digitais.</p>
                              </div>
                           </div>
                           <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                              <h6 className="font-bold mb-4">Mecanismos Modernos</h6>
                              <ul className="text-lg space-y-2 opacity-70">
                                 <li>🔐 **OAuth 2.0 / OpenID:** Autorização delegada.</li>
                                 <li>🎫 **JWT (JSON Web Token):** Autenticação Stateless por tokens.</li>
                                 <li>🧬 **MFA (Multi-Factor):** Algo que você sabe + Algo que você tem.</li>
                              </ul>
                           </div>
                        </div>
                     </div>
                   )
                }
              ]}
            />
          </section>

          

          <section id="quiz-modulo-9">


<ModuleConsolidation
            index={3}
            variant={mv[9]}
            resumoVisual={{
              moduloNome: "Módulo 9",
              tituloAula: titulo,
              materia: materiaNome,
              images: [
                {
                  title: "Defesa em Profundidade",
                  type: "Diagrama",
                  placeholderColor: "red",
                  imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
                },
                {
                  title: "Anatomia de um Ataque SQLi",
                  type: "Infográfico",
                  placeholderColor: "slate",
                  imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Nunca Confie, Sempre Verifique",
              content: (
                <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20 text-center">
                   <p className="text-lg font-bold">"Zero Trust Mindset: Trate cada input de usuário como uma bomba relógio até que seja sanitizado."</p>
                </div>
              ),
            }}
            />

                      <QuizInterativo
              questoes={quizM9}
              titulo="QUIZ: Segurança de Software"
              variant={mv[9]}
              onComplete={(score) => handleModuleComplete("modulo-9", score)}
            />
          </section>
        </div>
      </TabsContent>
      {/* ══════════════════════════════════════════════════════
          MÓDULO 10: TESTES E QUALIDADE DE SOFTWARE
          ══════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-10" className="mt-0">
        <ModuleBanner
          numero={10}
          titulo="Qualidade de Software e Testes"
          descricao="A garantia da entrega. Domine a Pirâmide de Testes, TDD, BDD, métricas de qualidade ISO e automação de garantia (QA)."
          variant={mv[10]}
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index="INTRO"
              title="A Pirâmide de Testes e Estratégias"
              variant={mv[10]}
            />

            <ContentAccordion
              titulo="Conceituação - Por que testar?"
              icone="🧪"
              corIndicador="bg-green-600"
              defaultOpen={true}
              mode="stacked"
              slides={[
                {
                  conteudo: (
                    <div className="space-y-8">
                      <div className="prose prose-slate dark:prose-invert max-w-none">
                        <p className="text-lg">Testar não é encontrar bugs, é **prevenir** bugs. A estratégia moderna baseia-se na Pirâmide de Mike Cohn:</p>
                      </div>

                      <div className="flex flex-col items-center">
                         <div className="w-full max-w-md bg-slate-900 p-8 rounded-3xl relative overflow-hidden shadow-2xl border border-white/10">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
                            
                            <div className="space-y-4">
                               <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-center group hover:scale-105 transition-transform cursor-pointer">
                                  <h6 className="text-emerald-400 font-black text-lg uppercase tracking-widest">Topo: E2E / UI</h6>
                                  <p className="text-[10px] text-white/70">Lentos, caros e instáveis. Simulam o usuário real.</p>
                               </div>
                               <div className="p-5 bg-blue-500/20 border border-blue-500/40 rounded-xl text-center group hover:scale-105 transition-transform cursor-pointer">
                                  <h6 className="text-blue-400 font-black text-lg uppercase tracking-widest">Meio: Integração / API</h6>
                                  <p className="text-[10px] text-white/70">Testam a comunicação entre componentes e serviços.</p>
                               </div>
                               <div className="p-6 bg-indigo-500/20 border border-indigo-500/40 rounded-xl text-center group hover:scale-105 transition-transform cursor-pointer">
                                  <h6 className="text-indigo-400 font-black text-lg uppercase tracking-widest">Base: Unitários</h6>
                                  <p className="text-[10px] text-white/70">Rápidos, baratos e numerosos. Testam funções isoladas.</p>
                               </div>
                            </div>
                         </div>
                         <p className="text-lg text-muted-foreground mt-4 italic">"Quanto mais alto na pirâmide, maior o custo e menor a velocidade."</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                         <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border">
                            <h6 className="font-bold mb-4 flex items-center gap-2">🔄 TDD (Test Driven Development)</h6>
                            <p className="text-lg leading-relaxed opacity-70">Escrever o teste **ANTES** do código. Ciclo: **Red** (falha) → **Green** (passa) → **Refactor** (melhora).</p>
                         </div>
                         <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border">
                            <h6 className="font-bold mb-4 flex items-center gap-2">📖 BDD (Behavior Driven Development)</h6>
                            <p className="text-lg leading-relaxed opacity-70">Define comportamentos em linguagem natural (Dado que..., Quando..., Então...). Focado no valor para o negócio.</p>
                         </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Métricas de Qualidade (ISO/IEC 25010)"
              variant={mv[10]}
            />

            <ContentAccordion
              titulo="Detalhamento - Os 8 Pilares da Qualidade"
              icone="🏆"
              corIndicador="bg-amber-600"
              defaultOpen={false}
              mode="stacked"
              slides={[
                {
                   conteudo: (
                     <div className="space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                           {[
                             {t: "Adequação Funcional", i: "🎯"},
                             {t: "Eficiência de Performance", i: "⚡"},
                             {t: "Compatibilidade", i: "📱"},
                             {t: "Usabilidade", i: "🎨"},
                             {t: "Confiabilidade", i: "🛡️"},
                             {t: "Segurança", i: "🔑"},
                             {t: "Manutenibilidade", i: "🛠️"},
                             {t: "Portabilidade", i: "🌍"}
                           ].map((item, i) => (
                             <div key={i} className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl text-center border">
                                <span className="text-xl mb-2 block">{item.i}</span>
                                <h6 className="text-[9px] font-black uppercase tracking-tighter">{item.t}</h6>
                             </div>
                           ))}
                        </div>
                        <AlertBox tipo="warning" titulo="⚠️ pontos de atenção CESGRANRIO: Verificação vs Validação">
                           Como já vimos no Módulo 3, a **Verificação** foca no processo ("Estamos fazendo certo?"), enquanto a **Validação** foca no produto ("Estamos fazendo a coisa certa para o cliente?"). No Módulo 10, associamos Verificação a Testes Estáticos (Revisões) e Validação a Testes Dinâmicos (Execução do Código).
                        </AlertBox>
                     </div>
                   )
                }
              ]}
            />
          </section>

          

          <section id="quiz-modulo-10">


<ModuleConsolidation
            index={3}
            variant={mv[10]}
            resumoVisual={{
              moduloNome: "Módulo 10",
              tituloAula: titulo,
              materia: materiaNome,
              images: [
                {
                  title: "Pirâmide de Testes Completa",
                  type: "Diagrama",
                  placeholderColor: "green",
                  imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
                },
                {
                  title: "Dashboards de QA",
                  type: "Infográfico",
                  placeholderColor: "blue",
                  imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "As Sete Cores dos Testes",
              content: (
                <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                   <ul className="text-lg space-y-1 font-bold">
                      <li className="text-emerald-500">🟢 Unitário: A menor parte.</li>
                      <li className="text-blue-500">🔵 Integração: A conversa.</li>
                      <li className="text-amber-500">🟡 Fumaça: Básico funciona?</li>
                      <li className="text-red-500">🔴 Regressão: Quebrou o que era bom?</li>
                      <li className="text-purple-500">🟣 Aceitação: Cliente aprovou?</li>
                   </ul>
                </div>
              ),
            }}
            />

                      <QuizInterativo
              questoes={quizM10}
              titulo="QUIZ: Testes e Qualidade"
              variant={mv[10]}
              onComplete={(score) => handleModuleComplete("modulo-10", score)}
            />
          </section>

          <section className="mt-12 p-8 bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 space-y-6">
              <h4 className="text-2xl font-black text-white flex items-center gap-3">
                🎯 Dicas de Ouro para a Petrobras (Engenharia de Software)
              </h4>
              <p className="text-slate-400 text-lg leading-relaxed">
                A banca **CESGRANRIO** tem um perfil muito claro para os cargos de TI da Petrobras. Foque nestes 3 pilares para garantir sua aprovação:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 bg-white/5 rounded-2xl border border-white/10 transition-transform hover:-translate-y-1">
                  <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center mb-4 font-bold">1</div>
                  <h6 className="font-bold text-white mb-2">Padrões de Projeto (GoF)</h6>
                  <p className="text-lg text-slate-500">Decore a diferença entre **Creational**, **Structural** e **Behavioral**. A banca adora o Singleton, Factory e Command.</p>
                </div>
                <div className="p-5 bg-white/5 rounded-2xl border border-white/10 transition-transform hover:-translate-y-1">
                  <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center mb-4 font-bold">2</div>
                  <h6 className="font-bold text-white mb-2">UML 2.5</h6>
                  <p className="text-lg text-slate-500">Saiba interpretar o **Diagrama de Classes** e o de **Sequência**. Atenção total à diferença entre Agregação (vazia) e Composição (preenchida).</p>
                </div>
                <div className="p-5 bg-white/5 rounded-2xl border border-white/10 transition-transform hover:-translate-y-1">
                  <div className="w-10 h-10 bg-amber-500/20 text-amber-400 rounded-lg flex items-center justify-center mb-4 font-bold">3</div>
                  <h6 className="font-bold text-white mb-2">Scrum & DevOps</h6>
                  <p className="text-lg text-slate-500">Domine os ritos do Scrum (Sprint, Daily, Review, Retrospective) e os pilares do DevOps (CI/CD, IaC, Observabilidade).</p>
                </div>
              </div>
              <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">Conteúdo Consolidado por Especialistas em Petrobras</p>
                <div className="px-4 py-2 bg-emerald-500 text-slate-900 rounded-full text-lg font-black shadow-lg shadow-emerald-500/20">
                  ESTATUS: PREMIUM 💎
                </div>
              </div>
            </div>
          </section>
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
