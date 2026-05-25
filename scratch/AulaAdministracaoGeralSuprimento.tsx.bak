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
  ModuleConsolidation,
  CardCarousel,
} from "../shared";
import {
  LuAward,
  LuShieldAlert,
  LuDollarSign,
  LuHeart,
  LuUsers,
  LuBriefcase,
  LuTrendingUp,
  LuLightbulb,
  LuTarget,
  LuShield,
  LuCheck,
  LuSearch,
  LuFileCheck,
  LuBookOpen,
  LuScale,
  LuHandshake,
  LuBrain,
  LuTriangleAlert,
  LuNetwork,
  LuZap,
  LuBuilding,
  LuUserPlus,
  LuShieldCheck,
  LuFileText,
  LuActivity,
  LuTruck,
  LuPackage,
  LuFactory,
  LuClipboardList,
  LuSearchCode,
  LuChevronRight,
  LuChartBar,
  LuInfo,
} from "react-icons/lu";
import { getModuleVariant } from "@/lib/moduleColors";
import { ADMINISTRACAO_GERAL_QUIZZES } from "@/data/quizzes/administracao-geral-quizzes";

const MODULE_DEFS = [
  {
    id: "modulo-1",
    label: "Módulo 1",
    title: "Fundamentos de Administração",
  },
  { id: "modulo-2", label: "Módulo 2", title: "Funções Administrativas PODC" },
  {
    id: "modulo-3",
    label: "Módulo 3",
    title: "Estruturas Organizacionais",
  },
  {
    id: "modulo-4",
    label: "Módulo 4",
    title: "Comportamento Organizacional",
  },
  {
    id: "modulo-5",
    label: "Módulo 5",
    title: "Gestão por Processos",
  },
  {
    id: "modulo-6",
    label: "Módulo 6",
    title: "Teoria das Organizações",
  },
  {
    id: "modulo-7",
    label: "Módulo 7",
    title: "Comunicação e Conflitos",
  },
  {
    id: "modulo-8",
    label: "Módulo 8",
    title: "Decisão e Inovação",
  },
  {
    id: "modulo-9",
    label: "Módulo 9",
    title: "Administração na Petrobras",
  },
  {
    id: "modulo-10",
    label: "Módulo 10",
    title: "Simulado Geral",
  },
] as const;

export default function AulaAdministracaoGeralSuprimento(props: AulaProps) {
    const STORAGE_KEY_PREFIX = "petrobras_quest_aula_administracao_geral_suprimento_";

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

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) {
      setCompletedModules((prev) => new Set([...prev, moduleId]));
      const progress = Math.round(
        (completedModules.size / (MODULE_DEFS.length - 1)) * 100
      );
      props.onUpdateProgress?.(progress);
    }
  };

  const isModuleUnlocked = (index: number) => {
    if (index === 0) return true;
    const previousModule = MODULE_DEFS[index - 1];
    return completedModules.has(previousModule.id);
  };

  // Pools de questões
  const mapQuizQuestions = (modId: string) => {
    const quiz = ADMINISTRACAO_GERAL_QUIZZES[modId];
    if (!quiz) return [];
    return quiz.questions.map((q) => ({
      id: q.id,
      pergunta: q.question,
      opcoes: q.options.map((opt, i) => ({
        label: String.fromCharCode(65 + i),
        valor: opt,
      })),
      correta: String.fromCharCode(65 + q.correct),
      explicacao: q.explanation,
    }));
  };

  const quizM10 = getRandomQuestions(
    mapQuizQuestions("modulo-10"),
    10
  );

  // Variantes de cor pré-computadas (Garantindo que evitamos roxo, violeta ou fúcsia)
  const mv = Object.fromEntries(
    Array.from({ length: 10 }, (_, i) => [i + 1, getModuleVariant(i + 1)])
  ) as Record<number, ReturnType<typeof getModuleVariant>>;

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      modules={MODULE_DEFS}
      completedModules={completedModules}
      isModuleUnlocked={isModuleUnlocked}
      titulo="Administração Geral (Suprimento)"
      descricao="Domine os fundamentos de administração com foco em teorias clássicas, processos, estruturas organizacionais e aplicações no contexto Petrobras. Preparação completa para CESGRANRIO."
      duracao="25h"
      materiaNome={props.materiaNome}
      materiaCor={props.materiaCor}
      materiaId={props.materiaId}
      isCompleted={completedModules.size >= MODULE_DEFS.length - 1}
      currentProgress={props.currentProgress}
      onComplete={props.onComplete}
      loading={props.loading}
    >
      {/* ==================== MÓDULO 1 ==================== */}
      {activeTab === "modulo-1" && (
        <TabsContent value="modulo-1" className="space-y-12 mt-0">
          <ModuleBanner
            numero={1}
            titulo="Fundamentos de Administração"
            descricao="Entenda a essência da administração como processo de planejar, organizar, dirigir e controlar recursos para atingir objetivos organizacionais."
            variant={mv[1]}
          />

          <div className="space-y-6">
            <ModuleSectionHeader
              index="INTRO"
              variant={mv[1]}
              title="Definição e Pilares da Administração"
              description="Os conceitos fundamentais que sustentam toda a prática administrativa moderna."
            />
            <CardCarousel
              cards={[
                {
                  titulo: "O que é Administração?",
                  descricao: "Processo integrado de planejar, organizar, dirigir e controlar recursos (humanos, financeiros, materiais, informacionais) para alcançar objetivos organizacionais de forma eficiente e eficaz.",
                  icone: <LuBriefcase />,
                  corFundo: "bg-emerald-500/10",
                },
                {
                  titulo: "Eficiência vs Eficácia",
                  descricao: "Eficiência: fazer certo (foco nos meios e processos, menor custo). Eficácia: fazer o certo (foco nos fins e resultados). Ambos são críticos na cadeia de suprimentos da Petrobras.",
                  icone: <LuCheck />,
                  corFundo: "bg-blue-500/10",
                },
                {
                  titulo: "Universalidade e Níveis",
                  descricao: "A administração é universal: aplica-se a todas as organizações e áreas. Distribui-se em três níveis organizacionais: estratégico, tático e operacional.",
                  icone: <LuNetwork />,
                  corFundo: "bg-cyan-500/10",
                },
                {
                  titulo: "Importância Estratégica",
                  descricao: "Em um mercado competitivo de energia global, a qualidade administrativa diferencia entre líderes e seguidores. Para a Petrobras, é questão de sobrevivência e soberania.",
                  icone: <LuTrendingUp />,
                  corFundo: "bg-amber-500/10",
                },
              ]}
            />
          </div>

          <div className="space-y-6">
            <ModuleSectionHeader
              index={2}
              variant={mv[1]}
              title="Análise Técnica C.E.D.E."
              description="Explorando a profundidade pedagógica dos fundamentos de administração."
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação: O Processo Administrativo e Habilidades de Katz",
                  conteudo: (
                    <div className="space-y-4 text-slate-700 dark:text-slate-300">
                      <p>
                        A administração moderna é definida como uma ciência social aplicada, cujo objeto de estudo é a atividade organizacional. Para compreender a atuação do administrador em qualquer esfera, recorre-se clássicamente ao modelo de <strong>Habilidades Administrativas de Robert Katz</strong>, extremamente cobrado pela banca CESGRANRIO:
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          <strong>Habilidades Técnicas:</strong> Envolvem o uso de conhecimento especializado e facilidade na execução de técnicas relacionadas ao trabalho e aos procedimentos. São cruciais no <em>nível operacional</em> (onde as coisas são feitas fisicamente, como na logística de armazenamento).
                        </li>
                        <li>
                          <strong>Habilidades Humanas:</strong> Relacionam-se com a capacidade de trabalhar com pessoas, compreender suas atitudes e motivações, liderar e comunicar de forma eficaz. São igualmente distribuídas e fundamentais em <em>todos os níveis hierárquicos</em> (operacional, tático e estratégico), pois toda administração é feita com e por meio de pessoas.
                        </li>
                        <li>
                          <strong>Habilidades Conceituais:</strong> Consistem na capacidade de enxergar a organização como um todo, compreender a complexidade sistêmica, entender como as várias funções se integram e como a empresa se relaciona com o ambiente externo. São a prioridade máxima no <em>nível estratégico</em> (diretoria e conselho de administração da Petrobras).
                        </li>
                      </ul>
                      <div className="bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/20">
                        <h5 className="font-semibold text-emerald-800 dark:text-emerald-400 mb-2">Os 10 Papéis Gerenciais de Henry Mintzberg</h5>
                        <p className="text-sm">
                          Mintzberg identificou que os administradores desempenham 10 papéis específicos, subdivididos em três categorias fundamentais:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2 text-xs">
                          <div className="p-3 bg-card border rounded-lg">
                            <span className="font-bold text-blue-600 dark:text-blue-400">1. Interpessoais:</span>
                            <ul className="list-disc pl-3 mt-1">
                              <li>Símbolo (representação formal)</li>
                              <li>Líder (motivação e orientação)</li>
                              <li>Ligação (rede de contatos)</li>
                            </ul>
                          </div>
                          <div className="p-3 bg-card border rounded-lg">
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">2. Informacionais:</span>
                            <ul className="list-disc pl-3 mt-1">
                              <li>Monitor (coleta de informações)</li>
                              <li>Disseminador (partilha interna)</li>
                              <li>Porta-voz (comunicação externa)</li>
                            </ul>
                          </div>
                          <div className="p-3 bg-card border rounded-lg">
                            <span className="font-bold text-amber-600 dark:text-amber-400">3. Decisórios:</span>
                            <ul className="list-disc pl-3 mt-1">
                              <li>Empreendedor (iniciador de projetos)</li>
                              <li>Solucionador de Conflitos (correções)</li>
                              <li>Alocador de Recursos (orçamentos)</li>
                              <li>Negociador (defesa de interesses)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuBookOpen />,
                },
                {
                  titulo: "Exemplificação: Os Níveis Organizacionais na Petrobras",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-slate-700 dark:text-slate-300">
                        Para visualizar como a teoria se reflete na realidade prática da Petrobras, observe o desdobramento das atividades de suprimento em cada nível organizacional:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4 bg-muted rounded-lg border border-border">
                          <h5 className="font-bold flex items-center gap-2 text-blue-600 dark:text-blue-400">
                            <LuTarget /> Nível Estratégico
                          </h5>
                          <p className="text-sm mt-1">
                            <strong>Quem atua:</strong> Conselho de Administração e Diretores Executivos da holding.
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Define o Plano de Negócios de Longo Prazo, a política ESG e as metas globais de transição energética para a próxima década.
                          </p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg border border-border">
                          <h5 className="font-bold flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                            <LuBriefcase /> Nível Tático (Intermediário)
                          </h5>
                          <p className="text-sm mt-1">
                            <strong>Quem atua:</strong> Gerentes de Suprimento, Logística e Infraestrutura.
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Traduz as diretrizes globais em planos de ação específicos, gerencia os centros de distribuição e desenha as estratégias de compras locais.
                          </p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg border border-border">
                          <h5 className="font-bold flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                            <LuFactory /> Nível Operacional
                          </h5>
                          <p className="text-sm mt-1">
                            <strong>Quem atua:</strong> Técnicos de Suprimento de Bens e Serviços, supervisores de pátio.
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Executa fisicamente as tarefas diárias: recebe materiais nas bases de Macaé, confere notas fiscais e alimenta os sistemas de estoque.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuBuilding />,
                },
                {
                  titulo: "Dicas Táticas: Pegadinhas Frequentes da CESGRANRIO",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-slate-700 dark:text-slate-300">
                        A CESGRANRIO possui um repertório clássico de distorções conceituais criadas para confundir o candidato apressado. Memorize estas distinções cruciais:
                      </p>
                      <div className="bg-amber-500/5 p-4 rounded-xl border border-amber-500/20 space-y-3">
                        <div className="flex items-start gap-3">
                          <LuCheck className="text-emerald-600 mt-1 flex-shrink-0" />
                          <div>
                            <strong className="text-amber-800 dark:text-amber-400">Eficiência vs. Eficácia:</strong>
                            <p className="text-sm text-slate-700 dark:text-slate-300">
                              A banca costuma inverter as definições. Lembre-se: se a questão fala sobre "reduzir custos", "otimizar processos", "relação insumo-produto", ela está falando de <strong>Eficiência</strong> (meios). Se fala sobre "bater metas", "concluir o projeto", "satisfazer o cliente", refere-se a <strong>Eficácia</strong> (fins).
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <LuCheck className="text-emerald-600 mt-1 flex-shrink-0" />
                          <div>
                            <strong className="text-amber-800 dark:text-amber-400">Efetividade (O Impacto):</strong>
                            <p className="text-sm text-slate-700 dark:text-slate-300">
                              A <strong>Efetividade</strong> mede o impacto social ou institucional de longo prazo. Exemplo: A eficiência da refinaria é produzir gasolina com menor custo por barril; a eficácia é atingir a meta mensal de refino; a efetividade é garantir a soberania energética e o abastecimento contínuo do país.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <LuCheck className="text-emerald-600 mt-1 flex-shrink-0" />
                          <div>
                            <strong className="text-amber-800 dark:text-amber-400">Habilidade Humana em Todos os Níveis:</strong>
                            <p className="text-sm text-slate-700 dark:text-slate-300">
                              Cuidado com afirmações que dizem que habilidades humanas pertencem apenas ao nível tático. O gráfico clássico de Katz mostra que a habilidade humana possui a <strong>mesma proporção</strong> e importância crítica no nível operacional, tático e estratégico!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuAward />,
                },
                {
                  titulo: "Exceções e pontos de atenção: O Contexto da Administração Indireta",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-slate-700 dark:text-slate-300">
                        Como Sociedade de Economia Mista sob controle da União, a Petrobras integra a Administração Pública Indireta. Isso cria um regime jurídico híbrido:
                      </p>
                      <AlertBox tipo="danger" titulo="Atenção à Dupla Natureza Jurídica">
                        Diferente de uma petroleira privada como a Shell, a Petrobras deve observar estritamente princípios constitucionais (Art. 37 da CF/88): Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência. No entanto, ela atua sob o regime de livre concorrência econômica (Art. 173 da CF), exigindo agilidade comercial. Conciliar a rigidez de uma estatal com a velocidade exigida pelo mercado de commodities petrolíferas é o maior desafio administrativo e de suprimentos de sua governança.
                      </AlertBox>
                    </div>
                  ),
                  icone: <LuTriangleAlert />,
                },
              ]}
            />
          </div>

          <div className="space-y-6">
            <ModuleSectionHeader
              index={3}
              variant={mv[1]}
              title="Exemplos Práticos Petrobras"
              description="Como esses conceitos fundamentais se aplicam na realidade da empresa."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <LuFactory className="text-emerald-500" />
                  Decisões no Pré-Sal
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A exploração em águas ultraprofundas é um teste de fogo de eficiência e eficácia: a construção de um navio-plataforma (FPSO) exige planejamento tático rigoroso de suprimentos para coordenar milhares de peças e garantir que a meta de primeiro óleo (eficácia) seja cumprida no menor custo operacional possível (eficiência).
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <LuUsers className="text-blue-500" />
                  Papéis de Ligação na Logística
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Os profissionais de Suprimentos na Petrobras atuam fortemente no papel de ligação de Mintzberg, conectando a diretoria com parceiros internacionais de engenharia e prestadores de serviços de helicópteros e embarcações de apoio às plataformas.
                </p>
              </div>
            </div>
          </div>

          <ModuleConsolidation
            index={1}
            variant={mv[1]}
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "Fundamentos de Administração - Visão Geral",
              duration: "12:45",
            }}
            resumoVisual={{
              moduloNome: "Módulo 1",
              tituloAula: "Administração Geral",
              materia: "Administração",
              images: [
                {
                  title: "Os 4 Pilares (PODC)",
                  type: "Esquema Conceitual",
                  placeholderColor: "bg-emerald-500/20",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Lembre-se: Três Níveis e Habilidades",
              content: (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center">
                      <p className="font-bold text-emerald-600 text-sm">P</p>
                      <p className="text-xs">Planejar</p>
                    </div>
                    <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-center">
                      <p className="font-bold text-blue-600 text-sm">O</p>
                      <p className="text-xs">Organizar</p>
                    </div>
                    <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-center">
                      <p className="font-bold text-cyan-600 text-sm">D</p>
                      <p className="text-xs">Dirigir</p>
                    </div>
                    <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-center">
                      <p className="font-bold text-amber-600 text-sm">C</p>
                      <p className="text-xs">Controlar</p>
                    </div>
                  </div>
                  <div className="p-3 bg-muted rounded-lg text-xs space-y-1">
                    <p>• <strong>Estratégico:</strong> Habilidades Conceituais (Visão Sistêmica)</p>
                    <p>• <strong>Tático:</strong> Habilidades Humanas (Liderança e Coordenação)</p>
                    <p>• <strong>Operacional:</strong> Habilidades Técnicas (Processos e Tarefas)</p>
                  </div>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Fundamentos de Administração",
              artista: "Petrobras Quest",
            }}
          />

          <QuizInterativo
            questoes={mapQuizQuestions("modulo-1")}
            titulo="QUIZ: Fundamentos de Administração"
            numero={1}
            variant={mv[1]}
            onComplete={(score: number) => handleModuleComplete("modulo-1", score)}
          />
        </TabsContent>
      )}

      {/* ==================== MÓDULO 2 ==================== */}
      {activeTab === "modulo-2" && (
        <TabsContent value="modulo-2" className="space-y-12 mt-0">
          <ModuleBanner
            numero={2}
            titulo="Funções Administrativas PODC"
            descricao="Aprofunde nas quatro funções que sustentam a administração: Planejamento, Organização, Direção e Controle."
            variant={mv[2]}
          />

          <div className="space-y-6">
            <ModuleSectionHeader
              index="INTRO"
              variant={mv[2]}
              title="Dossiê das Funções Administrativas"
              description="Entenda como cada função se desdobra em técnicas e ferramentas específicas."
            />
            <CardCarousel
              cards={[
                {
                  titulo: "Planejamento (Metas)",
                  descricao: "Define objetivos, analisa cenários internos e externos, e estabelece o melhor plano de ação para atingir o futuro desejado.",
                  icone: <LuTarget />,
                  corFundo: "bg-emerald-500/10",
                },
                {
                  titulo: "Organização (Recursos)",
                  descricao: "Estrutura as atividades, aloca os recursos humanos e físicos, divide as tarefas em cargos e estabelece as linhas de autoridade.",
                  icone: <LuBuilding />,
                  corFundo: "bg-teal-500/10",
                },
                {
                  titulo: "Direção (Pessoas)",
                  descricao: "Orienta, lidera e motiva o capital humano rumo aos objetivos. É a função mais dinâmica e focada nas relações humanas.",
                  icone: <LuUserPlus />,
                  corFundo: "bg-cyan-500/10",
                },
                {
                  titulo: "Controle (Padrões)",
                  descricao: "Define padrões de desempenho, monitora as atividades reais, compara com o planejado e inicia ações corretivas imediatas.",
                  icone: <LuActivity />,
                  corFundo: "bg-blue-500/10",
                },
              ]}
            />
          </div>

          <div className="space-y-6">
            <ModuleSectionHeader
              index={2}
              variant={mv[2]}
              title="Análise Técnica C.E.D.E."
              description="Desdobramentos técnicos de cada função administrativa."
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação: Ciclo Integrado de Planejamento e Controle",
                  conteudo: (
                    <div className="space-y-4 text-slate-700 dark:text-slate-300">
                      <p>
                        As funções administrativas representam um processo cíclico e sistêmico, onde o <strong>Planejamento</strong> e o <strong>Controle</strong> são considerados as duas faces da mesma moeda administrativa. Não é possível controlar sem um planejamento prévio que defina as metas (padrões), e um planejamento sem controle torna-se inútil por falta de acompanhamento.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-3 bg-muted rounded-lg border">
                          <h6 className="font-bold text-emerald-700 dark:text-emerald-400">1. Desdobramento do Planejamento:</h6>
                          <ul className="list-disc pl-4 text-xs mt-2 space-y-1">
                            <li><strong>Estratégico:</strong> Longo prazo, visão sistêmica, focado no topo da hierarquia, alto nível de incerteza.</li>
                            <li><strong>Tático:</strong> Médio prazo, focado em departamentos ou áreas específicas (como Suprimentos).</li>
                            <li><strong>Operacional:</strong> Curto prazo, detalhado no nível da execução diária das tarefas.</li>
                          </ul>
                        </div>
                        <div className="p-3 bg-muted rounded-lg border">
                          <h6 className="font-bold text-blue-700 dark:text-blue-400">2. Etapas do Controle:</h6>
                          <ul className="list-disc pl-4 text-xs mt-2 space-y-1">
                            <li><strong>Estabelecimento de Padrões:</strong> Definição de KPIs de custo, tempo, qualidade e quantidade.</li>
                            <li><strong>Medição do Desempenho:</strong> Coleta ativa de dados do andamento das operações de compras.</li>
                            <li><strong>Comparação:</strong> Contrastar o desempenho real com a meta/padrão pré-estabelecido.</li>
                            <li><strong>Ação Corretiva:</strong> Ajustar desvios e prevenir a reincorrência de ineficiências no processo.</li>
                          </ul>
                        </div>
                      </div>
                      <p className="text-sm">
                        Na função de <strong>Organização</strong>, define-se a centralização (decisões no topo) ou descentralização (decisões delegadas), a amplitude de controle (número de subordinados por gerente) e a divisão de departamentos. Na função de <strong>Direção</strong>, aplicam-se estilos de liderança situacional para engajar a força de trabalho.
                      </p>
                    </div>
                  ),
                  icone: <LuNetwork />,
                },
                {
                  titulo: "Exemplificação: O PODC na Cadeia de Suprimentos",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-slate-700 dark:text-slate-300">
                        Entenda como o ciclo de suprimento de sobressalentes críticos de perfuração offshore passa pelas 4 funções:
                      </p>
                      <div className="p-4 bg-muted rounded-lg space-y-3">
                        <div className="flex gap-2">
                          <span className="p-1 px-2 font-bold text-emerald-600 bg-emerald-500/10 rounded">P</span>
                          <p className="text-sm">
                            <strong>Planejamento:</strong> Com base na vida útil das brocas de perfuração das sondas, estima-se a quantidade de brocas que serão necessárias para o próximo ano fiscal, gerando o cronograma de contratação.
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <span className="p-1 px-2 font-bold text-blue-600 bg-blue-500/10 rounded">O</span>
                          <p className="text-sm">
                            <strong>Organização:</strong> Atribui-se as tarefas específicas: o departamento X redige a especificação técnica, o departamento de compras lança o edital e a comissão de licitações avalia as propostas técnicas.
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <span className="p-1 px-2 font-bold text-cyan-600 bg-cyan-500/10 rounded">D</span>
                          <p className="text-sm">
                            <strong>Direção:</strong> O gerente da equipe de suprimentos motiva a comissão a analisar os dossiês complexos no prazo legal, lidera reuniões de esclarecimento de dúvidas técnicas dos licitantes e garante a coesão do time.
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <span className="p-1 px-2 font-bold text-amber-600 bg-amber-500/10 rounded">C</span>
                          <p className="text-sm">
                            <strong>Controle:</strong> Mede-se o tempo gasto desde a requisição até a assinatura do contrato. Se o prazo foi maior do que a média estipulada (padrão), o sistema dispara um alerta e o gerente realiza uma auditoria do fluxo para identificar o gargalo.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuBriefcase />,
                },
                {
                  titulo: "Dicas Táticas: Como Diferenciar Funções nas Questões",
                  conteudo: (
                    <div className="space-y-4 text-slate-700 dark:text-slate-300">
                      <p>
                        Nas provas de Administração Geral, as bancas tentam fazer pegadinhas sutilíssimas entre as atribuições de cada pilar. Use este guia de palavras-chave para nunca mais errar:
                      </p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left border-collapse border border-border">
                          <thead>
                            <tr className="bg-muted">
                              <th className="p-2 border border-border">Função</th>
                              <th className="p-2 border border-border">Palavras-Chave de Questão</th>
                              <th className="p-2 border border-border">Pegadinha Clássica</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="p-2 font-bold border border-border">Planejamento</td>
                              <td className="p-2 border border-border">Definir objetivos, prever cenários, formular estratégias, traçar planos, alocar recursos globais.</td>
                              <td className="p-2 border border-border">Confundir "estratégico" com ações táticas operacionais diárias.</td>
                            </tr>
                            <tr>
                              <td className="p-2 font-bold border border-border">Organização</td>
                              <td className="p-2 border border-border">Distribuir tarefas, estruturar cargos, agrupar em unidades, desenhar organogramas, amplitude, autoridade.</td>
                              <td className="p-2 border border-border">Falar que organizar cuida da motivação de pessoas (esta é da Direção).</td>
                            </tr>
                            <tr>
                              <td className="p-2 font-bold border border-border">Direção</td>
                              <td className="p-2 border border-border">Liderar, motivar, guiar esforços, comunicar, dirimir conflitos pessoais, estilos de liderança.</td>
                              <td className="p-2 border border-border">Atribuir a elaboração de cargos à direção (cargos pertencem à Organização).</td>
                            </tr>
                            <tr>
                              <td className="p-2 font-bold border border-border">Controle</td>
                              <td className="p-2 border border-border">Monitorar KPIs, medir resultados, corrigir desvios, avaliar desempenho, padrões, retroalimentação.</td>
                              <td className="p-2 border border-border">Falar que o controle define as metas originais (esta é do Planejamento).</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ),
                  icone: <LuAward />,
                },
                {
                  titulo: "Exceções e pontos de atenção: A Relação entre Amplitude e Hierarquia",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-slate-700 dark:text-slate-300">
                        Um conceito muito cobrado associado à função de <strong>Organização</strong> é a relação de amplitude administrativa:
                      </p>
                      <AlertBox tipo="warning" titulo="Relação Inversa de Amplitude">
                        A **amplitude de controle** indica o número de subordinados atribuídos a um único chefe. Se a amplitude for <em>estreita</em> (poucos subordinados por gerente), a organização terá uma estrutura **alta e verticalizada** (com muitos níveis hierárquicos). Se a amplitude for <em>larga</em> (muitos subordinados por gerente), a organização terá uma estrutura **achatada e horizontalizada** (poucos níveis hierárquicos). As provas adoram tentar inverter esta correlação matemática direta!
                      </AlertBox>
                    </div>
                  ),
                  icone: <LuTriangleAlert />,
                },
              ]}
            />
          </div>

          <ModuleConsolidation
            index={2}
            variant={mv[2]}
            video={{
              videoId: "7c-YVly_C9o",
              title: "PODC - Desdobramento Prático",
              duration: "15:20",
            }}
            resumoVisual={{
              moduloNome: "Módulo 2",
              tituloAula: "Administração Geral",
              materia: "Administração",
              images: [
                {
                  title: "Ciclo Administrativo PODC",
                  type: "Fluxograma",
                  placeholderColor: "bg-emerald-500/20",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Diferenciais Críticos",
              content: (
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                    <p className="font-bold text-emerald-600">
                      Planejamento: O QUÊ fazer e a definição do futuro
                    </p>
                  </div>
                  <div className="p-3 bg-teal-500/10 rounded-xl border border-teal-500/20">
                    <p className="font-bold text-teal-600">
                      Organização: COMO estruturar e alocar
                    </p>
                  </div>
                  <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                    <p className="font-bold text-cyan-600">
                      Direção: QUEM faz, lidera e incentiva as pessoas
                    </p>
                  </div>
                  <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                    <p className="font-bold text-blue-600">
                      Controle: VERIFICAÇÃO dos resultados e correções
                    </p>
                  </div>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
              titulo: "Funções Administrativas PODC",
              artista: "Petrobras Quest",
            }}
          />

          <QuizInterativo
            questoes={mapQuizQuestions("modulo-2")}
            titulo="QUIZ: Funções Administrativas PODC"
            numero={2}
            variant={mv[2]}
            onComplete={(score: number) => handleModuleComplete("modulo-2", score)}
          />
        </TabsContent>
      )}

      {/* ==================== MÓDULO 3 ==================== */}
      {activeTab === "modulo-3" && (
        <TabsContent value="modulo-3" className="space-y-12 mt-0">
          <ModuleBanner
            numero={3}
            titulo="Estruturas Organizacionais"
            descricao="Conheça os principais modelos de estrutura organizacional e como a Petrobras se organiza para otimizar processos e decisões."
            variant={mv[3]}
          />

          <div className="space-y-6">
            <ModuleSectionHeader
              index="INTRO"
              variant={mv[3]}
              title="Dossiê de Modelos Estruturais"
              description="Das estruturas clássicas às contemporâneas: compreendendo as linhas de força e as escolhas de design organizacional."
            />
            <CardCarousel
              cards={[
                {
                  titulo: "Estrutura Funcional",
                  descricao: "Agrupa os profissionais por especialidades e competências afins (ex. Contratos, Logística, Engenharia). Simples, especializada, mas cria ilhas de isolamento de comunicação.",
                  icone: <LuBuilding />,
                  corFundo: "bg-cyan-500/10",
                },
                {
                  titulo: "Estrutura Divisional",
                  descricao: "Agrupa atividades por divisões semiautônomas de produtos, serviços ou regiões (ex. E&P, Refino, Gás). Focada no mercado, flexível, mas aumenta a redundância de funções corporativas.",
                  icone: <LuChartBar />,
                  corFundo: "bg-indigo-500/10",
                },
                {
                  titulo: "Estrutura Matricial",
                  descricao: "Sobrepõe a estrutura funcional tradicional a uma estrutura de projetos ou produtos. Estabelece a dupla subordinação: quebra a unidade de comando clássica em prol da alta integração.",
                  icone: <LuNetwork />,
                  corFundo: "bg-emerald-500/10",
                },
                {
                  titulo: "Estrutura por Processos",
                  descricao: "Estrutura as equipes de forma horizontal ao longo de fluxos de valor integrados (ex. Processo Completo de Suprimentos). Reduz fronteiras internas e maximiza a orientação para o cliente.",
                  icone: <LuActivity />,
                  corFundo: "bg-amber-500/10",
                },
              ]}
            />
          </div>

          <div className="space-y-6">
            <ModuleSectionHeader
              index={2}
              variant={mv[3]}
              title="Análise Técnica C.E.D.E."
              description="Análise profunda de cada modelo estrutural."
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação: Comparação Crítica e Departamentalização",
                  conteudo: (
                    <div className="space-y-4 text-slate-700 dark:text-slate-300">
                      <p>
                        A estruturação de uma organização envolve decidir como as tarefas serão divididas, agrupadas e coordenadas. Esse agrupamento é chamado de <strong>Departamentalização</strong>. A CESGRANRIO cobra maciçamente as distinções clássicas entre os tipos de estrutura, especialmente a quebra de paradigmas dos modelos contemporâneos:
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          <strong>Estrutura Linear (Tradicional):</strong> Baseada no princípio da unidade de comando e na rigidez militar. Centralizada, com linhas formais rígidas de comunicação. Ideal para ambientes extremamente estáveis, mas ineficiente diante de mudanças rápidas de mercado.
                        </li>
                        <li>
                          <strong>Estrutura Funcional:</strong> Baseada na especialização de funções (Fayol). Promove economia de escala e desenvolvimento de conhecimentos profundos nas áreas funcionais. Suas maiores falhas são os conflitos entre áreas e a falta de visão global do negócio (efeito 'silo').
                        </li>
                        <li>
                          <strong>Estrutura Matricial (Grade):</strong> Combina o melhor de dois mundos (funcional e por projetos). Os colaboradores reportam-se a um gerente funcional (ex: Chefe de TI) e a um gerente de projeto (ex: Líder da Implantação do ERP). Exige alta maturidade e habilidades humanas para resolver o conflito inerente de autoridade ("dois chefes").
                        </li>
                        <li>
                          <strong>Estrutura em Rede:</strong> Virtual, baseada na terceirização de atividades não-críticas, focando internamente apenas nas competências essenciais. Altamente adaptável e de baixíssimo custo fixo, mas apresenta riscos sérios de perda de controle operacional e de qualidade.
                        </li>
                      </ul>
                    </div>
                  ),
                  icone: <LuBookOpen />,
                },
                {
                  titulo: "Exemplificação: Como a Petrobras Estrutura a Holding e suas Subsidiárias",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-slate-700 dark:text-slate-300">
                        A Petrobras é uma corporação complexa de dimensões gigantescas. Sua estrutura combina características <strong>Divisionais</strong> e <strong>Matriciais</strong>:
                      </p>
                      <div className="bg-muted p-4 rounded-xl border border-border">
                        <h6 className="font-bold text-emerald-800 dark:text-emerald-400 mb-2">Estrutura Divisional e Matricial Petrobras</h6>
                        <ul className="list-disc pl-5 space-y-2 text-xs">
                          <li>
                            <strong>Divisões Semiautônomas (Segmentos de Negócio):</strong> A holding organiza-se em torno de diretorias finalísticas focadas na cadeia produtiva do petróleo: Exploração e Produção (Upstream), Refino, Transporte e Comercialização (Downstream), Transição Energética e Sustentabilidade.
                          </li>
                          <li>
                            <strong>Matriz de Funções Corporativas:</strong> Setores transversais como a Diretoria Financeira e de Relacionamento com Investidores, Jurídico, Recursos Humanos e a própria estrutura corporativa de Suprimentos atuam de forma matricial, prestando serviços e exercendo governança e controle sobre todas as divisões operacionais de forma integrada.
                          </li>
                          <li>
                            <strong>Subsidiárias Integrais:</strong> Entidades corporativas distintas (ex: Transpetro, Petrobras Biocombustíveis) operam com estrutura própria, mas alinhadas às diretrizes e ao planejamento estratégico do grupo corporativo.
                          </li>
                        </ul>
                      </div>
                    </div>
                  ),
                  icone: <LuBriefcase />,
                },
                {
                  titulo: "Dicas Táticas: Tabela de Vantagens e Desvantagens para Concurso",
                  conteudo: (
                    <div className="space-y-4 text-slate-700 dark:text-slate-300">
                      <p>
                        Memorize este quadro técnico para resolver de forma rápida e segura as questões clássicas da banca sobre vantagens e desvantagens de cada tipo de estrutura:
                      </p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left border-collapse border border-border">
                          <thead>
                            <tr className="bg-muted">
                              <th className="p-2 border border-border">Tipo</th>
                              <th className="p-2 border border-border">Vantagens Principais</th>
                              <th className="p-2 border border-border">Desvantagens Principais</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="p-2 font-bold border border-border text-cyan-600">Funcional</td>
                              <td className="p-2 border border-border">Especialização técnica, alta clareza de carreira, economias de escala intra-departamentais.</td>
                              <td className="p-2 border border-border">Isolamento entre áreas (silos), lentidão nas decisões interdepartamentais, perda da visão sistêmica.</td>
                            </tr>
                            <tr>
                              <td className="p-2 font-bold border border-border text-indigo-600">Divisional</td>
                              <td className="p-2 border border-border">Foco total no cliente/região/produto, rápida resposta a mudanças, descentralização decisória.</td>
                              <td className="p-2 border border-border">Duplicação desnecessária de recursos, competição destrutiva entre divisões, perda de economias de escala.</td>
                            </tr>
                            <tr>
                              <td className="p-2 font-bold border border-border text-emerald-600">Matricial</td>
                              <td className="p-2 border border-border">Uso compartilhado e flexível de especialistas, coordenação interdisciplinar excelente, resposta ágil.</td>
                              <td className="p-2 border border-border">Conflito de lealdade (dupla subordinação), custo elevado de coordenação, estresse emocional nos subordinados.</td>
                            </tr>
                            <tr>
                              <td className="p-2 font-bold border border-border text-amber-600">Em Rede</td>
                              <td className="p-2 border border-border">Flexibilidade extrema, custo fixo irrisório, rápido escalonamento global.</td>
                              <td className="p-2 border border-border">Vulnerabilidade jurídica, dependência extrema de terceiros, perda de know-how interno estratégico.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ),
                  icone: <LuAward />,
                },
                {
                  titulo: "Exceções e pontos de atenção: A Queda do Princípio de Unidade de Comando",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-slate-700 dark:text-slate-300">
                        O princípio clássico de Henri Fayol ditava a **unidade de comando**: cada trabalhador deve receber ordens de apenas um único supervisor direto para evitar atritos e direções conflitantes.
                      </p>
                      <AlertBox tipo="warning" titulo="A Quebra da Unidade de Comando na Matricial">
                        Nas provas, a banca costuma classificar a estrutura **Matricial** especificamente por sua quebra voluntária da unidade de comando. A coexistência de uma autoridade funcional (eixo vertical) e uma autoridade de projeto (eixo horizontal) exige habilidades gerenciais maduras de negociação para que os conflitos intrínsecos de prioridades e alocações de recursos humanos não levem ao colapso operacional da equipe.
                      </AlertBox>
                    </div>
                  ),
                  icone: <LuTriangleAlert />,
                },
              ]}
            />
          </div>

          <ModuleConsolidation
            index={3}
            variant={mv[3]}
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "Estruturas Organizacionais",
              duration: "14:30",
            }}
            resumoVisual={{
              moduloNome: "Módulo 3",
              tituloAula: "Administração Geral",
              materia: "Administração",
              images: [
                {
                  title: "Modelos de Estrutura",
                  type: "Organograma Comparativo",
                  placeholderColor: "bg-cyan-500/20",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Escolha Rápida",
              content: (
                <div className="text-sm space-y-2">
                  <p>
                    <strong className="text-cyan-600">Funcional:</strong> Foco em departamentos especializados e na eficiência técnica corporativa.
                  </p>
                  <p>
                    <strong className="text-indigo-600">Divisional:</strong> Foco no produto/região, permitindo unidades autônomas na cadeia.
                  </p>
                  <p>
                    <strong className="text-emerald-600">Matricial:</strong> Dupla subordinação, unindo competências com metas de projetos.
                  </p>
                  <p>
                    <strong className="text-amber-600">Processos:</strong> Foco na cadeia horizontal de entrega de valor fim a fim.
                  </p>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
              titulo: "Estruturas Organizacionais",
              artista: "Petrobras Quest",
            }}
          />

          <QuizInterativo
            questoes={mapQuizQuestions("modulo-3")}
            titulo="QUIZ: Estruturas Organizacionais"
            numero={3}
            variant={mv[3]}
            onComplete={(score: number) => handleModuleComplete("modulo-3", score)}
          />
        </TabsContent>
      )}

      {/* ==================== MÓDULO 4 ==================== */}
      {activeTab === "modulo-4" && (
        <TabsContent value="modulo-4" className="space-y-12 mt-0">
          <ModuleBanner
            numero={4}
            titulo="Comportamento Organizacional"
            descricao="Entenda como as pessoas atuam dentro das organizações: motivação, liderança, comunicação, trabalho em equipe e cultura organizacional."
            variant={mv[4]}
          />

          <div className="space-y-6">
            <ModuleSectionHeader
              index="INTRO"
              variant={mv[4]}
              title="Dossiê Comportamental"
              description="Os fatores psicossociais que impactam desempenho e satisfação nas organizações."
            />
            <CardCarousel
              cards={[
                {
                  titulo: "Motivação",
                  descricao: "Forças internas e externas que iniciam, direcionam e sustentam o esforço individual. Abrange teorias de conteúdo (Maslow, Herzberg) e de processo (Vroom).",
                  icone: <LuLightbulb />,
                  corFundo: "bg-rose-500/10",
                },
                {
                  titulo: "Liderança",
                  descricao: "Habilidade de influenciar pessoas para o alcance voluntário de metas organizacionais. Abrange estilos autocrático, democrático, liberal e teorias situacionais.",
                  icone: <LuUsers />,
                  corFundo: "bg-pink-500/10",
                },
                {
                  titulo: "Comunicação",
                  descricao: "Fluxo e intercâmbio de informações e sentidos entre emissor e receptor. Crucial para prevenir conflitos e engajar equipes.",
                  icone: <LuHandshake />,
                  corFundo: "bg-red-500/10",
                },
                {
                  titulo: "Cultura Organizacional",
                  descricao: "Conjunto de crenças, valores, ritos e normas compartilhados que determinam como os membros se comportam e resolvem problemas.",
                  icone: <LuShield />,
                  corFundo: "bg-orange-500/10",
                },
              ]}
            />
          </div>

          <div className="space-y-6">
            <ModuleSectionHeader
              index={2}
              variant={mv[4]}
              title="Análise Técnica C.E.D.E."
              description="Aprofundamento em conceitos de comportamento organizacional."
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação: Teorias de Motivação (Conteúdo vs. Processo)",
                  conteudo: (
                    <div className="space-y-4 text-slate-700 dark:text-slate-300">
                      <p>
                        A motivação é um estado interno que conduz o comportamento. A literatura divide as teorias motivacionais em dois grandes blocos, cuja diferenciação é exigida de forma recorrente em concursos:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-muted rounded-lg border">
                          <h6 className="font-bold text-rose-700 dark:text-rose-400">Teorias de Conteúdo (O QUE motiva):</h6>
                          <p className="text-xs text-muted-foreground mt-1">Identificam as necessidades internas das pessoas.</p>
                          <ul className="list-disc pl-4 text-xs mt-2 space-y-1">
                            <li><strong>Maslow (Hierarquia):</strong> Necessidades fisiológicas, segurança, sociais, estima, autorrealização (as inferiores devem ser satisfeitas primeiro).</li>
                            <li><strong>Herzberg (Dois Fatores):</strong> Fatores Higiênicos (evitam insatisfação, mas não motivam - ex: salário, estrutura física) vs. Fatores Motivadores (geram real motivação - ex: trabalho desafiador, crescimento).</li>
                            <li><strong>McClelland:</strong> Três necessidades dominantes adquiridas socialmente: Realização, Afiliação e Poder.</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-muted rounded-lg border">
                          <h6 className="font-bold text-pink-700 dark:text-pink-400">Teorias de Processo (COMO motiva):</h6>
                          <p className="text-xs text-muted-foreground mt-1">Explicam como o comportamento se inicia e é mantido.</p>
                          <ul className="list-disc pl-4 text-xs mt-2 space-y-1">
                            <li><strong>Vroom (Expectativa):</strong> A motivação é o produto de três variáveis: Valência (valor da recompensa) x Instrumentalidade (crença no ganho) x Expectativa (crença no próprio esforço).</li>
                            <li><strong>Skinner (Reforço):</strong> Comportamentos reforçados positivamente tendem a se repetir, enquanto punições extinguem comportamentos.</li>
                            <li><strong>Adams (Equidade):</strong> O indivíduo compara seus esforços e recompensas com os dos colegas; disparidades geram insatisfação motivacional.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuBrain />,
                },
                {
                  titulo: "Exemplificação: Análise de Caso de Liderança Situacional na Petrobras",
                  conteudo: (
                    <div className="space-y-4 text-slate-700 dark:text-slate-300">
                      <p>
                        A teoria de **Liderança Situacional de Hersey e Blanchard** defende que não existe um estilo único e correto de liderança. O estilo deve se adaptar à maturidade e competência dos liderados:
                      </p>
                      <div className="bg-muted p-4 rounded-xl border border-border space-y-3 text-xs">
                        <p>
                          Imagine duas equipes diferentes sob gestão do Técnico de Suprimentos Sênior na Petrobras:
                        </p>
                        <div className="flex gap-2 items-start">
                          <LuChevronRight className="mt-1 text-emerald-600 flex-shrink-0" />
                          <p>
                            <strong>Cenário A (Equipe de Recém-Admitidos):</strong> Sem conhecimento prático das normas da Lei 13.303. O líder deve aplicar o estilo <strong>Direcionador (M1)</strong>, fornecendo instruções claras e supervisionando rigidamente a elaboração técnica de cada edital.
                          </p>
                        </div>
                        <div className="flex gap-2 items-start">
                          <LuChevronRight className="mt-1 text-emerald-600 flex-shrink-0" />
                          <p>
                            <strong>Cenário B (Equipe de Analistas de Contratos Veteranos):</strong> Com profundo domínio da legislação e anos de experiência. O líder deve aplicar o estilo **Delegador (M4)**, conferindo autonomia total para elaboração e assinatura das licitações sob sua responsabilidade, atuando apenas como apoio em situações complexas.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuBriefcase />,
                },
                {
                  titulo: "Dicas Táticas: A Pegadinha Frequente do Fator Higiênico de Herzberg",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-slate-700 dark:text-slate-300">
                        O Fator Higiênico de Frederick Herzberg é o maior alvo de pegadinhas das provas de Comportamento Organizacional. Cuidado extremo com a seguinte lógica:
                      </p>
                      <AlertBox tipo="info" titulo="O Paradoxo dos Fatores Higiênicos">
                        Nas provas, a banca costuma dizer que "para motivar os trabalhadores, a empresa aumentou o salário básico ou comprou cadeiras ergonômicas". **Isso é incorreto sob a teoria de Herzberg.** Salário, benefícios, políticas da empresa, segurança no trabalho e infraestrutura física são **Fatores Higiênicos** (extrínsecos). Sua presença apenas previne a insatisfação, mas **não gera motivação ativa**. A motivação real só é obtida por **Fatores Motivacionais** (intrínsecos), como reconhecimento profissional, delegação de responsabilidades desafiadoras e perspectiva de crescimento na carreira.
                      </AlertBox>
                    </div>
                  ),
                  icone: <LuAward />,
                },
                {
                  titulo: "Exceções e pontos de atenção: A Disfunção da Cultura de Segurança",
                  conteudo: (
                    <div className="space-y-4 text-slate-700 dark:text-slate-300">
                      <p>
                        Na Petrobras, a Cultura Organizacional é ancorada no valor inegociável da **Segurança e SMS** (Saúde, Meio Ambiente e Segurança). No entanto, toda cultura forte possui potenciais pontos de atenção secundárias:
                      </p>
                      <AlertBox tipo="danger" titulo="Alerta de Rigidez Cultural">
                        Uma cultura de conformidade extrema com a segurança pode, se não for bem administrada pelo comportamento de liderança, criar um clima de aversão total ao risco em processos de suprimento, onde a inovação é tolhida pelo receio de desviar de ritos analógicos tradicionais, tornando o processo de contratação excessivamente burocrático e lento. O equilíbrio exige uma liderança que estimule a segurança sem matar a inovação no processo de suprimento.
                      </AlertBox>
                    </div>
                  ),
                  icone: <LuTriangleAlert />,
                },
              ]}
            />
          </div>

          <ModuleConsolidation
            index={4}
            variant={mv[4]}
            video={{
              videoId: "7c-YVly_C9o",
              title: "Comportamento Organizacional",
              duration: "13:15",
            }}
            resumoVisual={{
              moduloNome: "Módulo 4",
              tituloAula: "Administração Geral",
              materia: "Administração",
              images: [
                {
                  title: "Fatores Comportamentais",
                  type: "Mapa Mental",
                  placeholderColor: "bg-rose-500/20",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Teorias-Chave",
              content: (
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-rose-500/10 rounded border border-rose-500/20 text-xs">
                    <p className="font-bold">Maslow: Necessidades em Hierarquia</p>
                    <p className="text-slate-500">Auto-realização no topo, Fisiológicas na base.</p>
                  </div>
                  <div className="p-2 bg-pink-500/10 rounded border border-pink-500/20 text-xs">
                    <p className="font-bold">Herzberg: Higiênicos (evitam) vs Motivadores (geram)</p>
                    <p className="text-slate-500">Dinheiro não gera motivação, mas a sua ausência desmotiva.</p>
                  </div>
                  <div className="p-2 bg-red-500/10 rounded border border-red-500/20 text-xs">
                    <p className="font-bold">Hersey & Blanchard: Adaptação à Maturidade</p>
                    <p className="text-slate-500">Líder deve moldar o estilo ao nível de competência técnica.</p>
                  </div>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
              titulo: "Comportamento Organizacional",
              artista: "Petrobras Quest",
            }}
          />

          <QuizInterativo
            questoes={mapQuizQuestions("modulo-4")}
            titulo="QUIZ: Comportamento Organizacional"
            numero={4}
            variant={mv[4]}
            onComplete={(score: number) => handleModuleComplete("modulo-4", score)}
          />
        </TabsContent>
      )}

      {/* ==================== MÓDULO 5 ==================== */}
      {activeTab === "modulo-5" && (
        <TabsContent value="modulo-5" className="space-y-12 mt-0">
          <ModuleBanner
            numero={5}
            titulo="Gestão por Processos"
            descricao="Abordagem moderna que organiza a empresa em torno de processos-chave. BPM (Business Process Management) e otimização contínua."
            variant={mv[5]}
          />

          <div className="space-y-6">
            <ModuleSectionHeader
              index="INTRO"
              variant={mv[5]}
              title="Dossiê de Processos"
              description="Do conceito de processo à implementação de BPM em grandes organizações."
            />
            <CardCarousel
              cards={[
                {
                  titulo: "Conceito de Processo",
                  descricao: "Sequência sistemática e inter-relacionada de ações ou atividades coordenadas, que consomem recursos para transformar insumos (inputs) em saídas de valor (outputs).",
                  icone: <LuActivity />,
                  corFundo: "bg-cyan-500/10",
                },
                {
                  titulo: "Visão Horizontal (BPM)",
                  descricao: "Business Process Management (BPM). Integra de forma holística a gestão dos processos organizacionais de ponta a ponta, ignorando as fronteiras tradicionais dos setores.",
                  icone: <LuChartBar />,
                  corFundo: "bg-teal-500/10",
                },
                {
                  titulo: "Mapeamento (BPMN)",
                  descricao: "Técnica de desenhar, documentar e analisar fluxogramas através de notação visual rica e unificada (BPMN), revelando gargalos e caminhos críticos nas compras corporativas.",
                  icone: <LuFileText />,
                  corFundo: "bg-green-500/10",
                },
                {
                  titulo: "Kaizen e Lean",
                  descricao: "Processo de melhoria contínua incremental (Kaizen) e eliminação exaustiva de desperdícios e tempos de fila sem agregação de valor real na logística de pátios.",
                  icone: <LuZap />,
                  corFundo: "bg-lime-500/10",
                },
              ]}
            />
          </div>

          <div className="space-y-6">
            <ModuleSectionHeader
              index={2}
              variant={mv[5]}
              title="Análise Técnica C.E.D.E."
              description="Metodologias e práticas em gestão por processos."
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação: Transição para a Organização por Processos",
                  conteudo: (
                    <div className="space-y-4 text-slate-700 dark:text-slate-300">
                      <p>
                        A **Gestão de Processos (BPM)** revoluciona a forma clássica de administração ao propor a transição do foco vertical (departamentos estanques) para o **foco horizontal** (fluxo contínuo de valor que atravessa a empresa e chega ao cliente). Isso é de suma importância para grandes estatais como a Petrobras, pois reduz barreiras burocráticas internas.
                      </p>
                      <div className="bg-muted p-4 rounded-xl border border-border text-xs space-y-2">
                        <span className="font-bold text-cyan-600">Ciclo de Vida de BPM (As-Is / To-Be):</span>
                        <p>
                          O ciclo do gerenciamento de processos é contínuo e estruturado:
                        </p>
                        <ol className="list-decimal pl-5 space-y-1">
                          <li><strong>Planejamento Estratégico:</strong> Identificar e classificar os processos essenciais da organização.</li>
                          <li><strong>Modelagem As-Is (Situação Atual):</strong> Mapear graficamente as tarefas da forma como são executadas hoje, revelando gargalos e ineficiências reais de fluxo.</li>
                          <li><strong>Desenho To-Be (Situação Futura desejada):</strong> Projetar o processo de forma otimizada, automatizada e sem redundâncias.</li>
                          <li><strong>Implementação:</strong> Colocar o novo processo em operação, capacitar pessoas e configurar sistemas integrados de software.</li>
                          <li><strong>Monitoramento e Controle:</strong> Analisar o andamento das métricas em tempo real através de painéis ou dashboards corporativos.</li>
                          <li><strong>Refinamento Contínuo:</strong> Iniciar melhorias incrementais adicionais com base nos desvios observados.</li>
                        </ol>
                      </div>
                    </div>
                  ),
                  icone: <LuNetwork />,
                },
                {
                  titulo: "Exemplificação: Processo de Homologação de Fornecedores na Petrobras",
                  conteudo: (
                    <div className="space-y-4 text-slate-700 dark:text-slate-300">
                      <p>
                        O processo de **Cadastro e Homologação de Fornecedores** (no sistema Petronect) é uma cadeia de processos horizontal complexa que atravessa diversas gerências da Petrobras:
                      </p>
                      <div className="p-4 bg-muted border rounded-lg text-xs space-y-2">
                        <div className="flex gap-2">
                          <strong className="text-cyan-600">1. Cadastro Primário (Parceiro):</strong>
                          <p>O fornecedor faz o upload de documentos jurídicos, técnicos, fiscais e de balanço contábil.</p>
                        </div>
                        <div className="flex gap-2">
                          <strong className="text-cyan-600">2. Avaliação de Integridade (Compliance):</strong>
                          <p>A gerência de conformidade avalia o DDI (Devida Diligência de Integridade) contra riscos de corrupção.</p>
                        </div>
                        <div className="flex gap-2">
                          <strong className="text-cyan-600">3. Auditoria de SMS:</strong>
                          <p>Engenheiros de SMS vistoriam ou avaliam as políticas de segurança e a pegada de carbono do fornecedor.</p>
                        </div>
                        <div className="flex gap-2">
                          <strong className="text-cyan-600">4. Emissão do CRC:</strong>
                          <p>Aprovadas todas as etapas, emite-se o Certificado de Registro Cadastral, habilitando-o a disputar licitações da estatal.</p>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuClipboardList />,
                },
                {
                  titulo: "Dicas Táticas: Pegadinhas sobre Kaizen vs. Reengenharia",
                  conteudo: (
                    <div className="space-y-4 text-slate-700 dark:text-slate-300">
                      <p>
                        A CESGRANRIO adora pedir a diferenciação conceitual entre as metodologias de redesenho e otimização de processos. Nunca confunda estes dois extremos:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
                          <h6 className="font-bold text-emerald-800 dark:text-emerald-400">Melhoria Incremental (Kaizen)</h6>
                          <p className="text-xs mt-1">
                            Abordagem de baixo para cima (*bottom-up*), focada em melhorias pequenas, continuadas, de baixo risco e baixo custo financeiro. Valoriza a participação direta de quem executa as tarefas no dia a dia.
                          </p>
                        </div>
                        <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                          <h6 className="font-bold text-amber-800 dark:text-amber-400">Reengenharia (Radical)</h6>
                          <p className="text-xs mt-1">
                            Abordagem de cima para baixo (*top-down*), focada em mudanças radicais, quebrando o processo atual por completo e redesenhando o fluxo **do zero**. Alto custo, alto risco e focada em saltos revolucionários de performance.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuAward />,
                },
                {
                  titulo: "Exceções e pontos de atenção: O Gargalo e a Teoria das Restrições",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-slate-700 dark:text-slate-300">
                        Um erro comum em gestão de processos é acreditar que todas as etapas de um fluxo devem ser otimizadas simultaneamente.
                      </p>
                      <AlertBox tipo="warning" titulo="Foque na Restrição Principal (Teoria das Restrições)">
                        O ritmo total de um processo de compras é determinado **única e exclusivamente pela sua atividade mais lenta (gargalo)**. Otimizar as atividades anteriores ou posteriores ao gargalo apenas cria acúmulo desnecessário de estoque intermediário (fila) sem aumentar a vazão final de contratação. O foco de análise do Técnico de Suprimentos deve ser identificar e ampliar a capacidade do gargalo do fluxo operacional antes de realizar qualquer outra ação.
                      </AlertBox>
                    </div>
                  ),
                  icone: <LuTriangleAlert />,
                },
              ]}
            />
          </div>

          <ModuleConsolidation
            index={5}
            variant={mv[5]}
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "Gestão por Processos e BPM",
              duration: "14:00",
            }}
            resumoVisual={{
              moduloNome: "Módulo 5",
              tituloAula: "Administração Geral",
              materia: "Administração",
              images: [
                {
                  title: "Value Stream Mapping",
                  type: "Fluxograma",
                  placeholderColor: "bg-cyan-500/20",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "BPM em 5 Passos",
              content: (
                <div className="space-y-2 text-sm">
                  <p>1. <strong>Mapear (As-Is):</strong> Descobrir a realidade atual do fluxo de contratação.</p>
                  <p>2. <strong>Analisar:</strong> Localizar desperdícios operacionais e tempos de fila.</p>
                  <p>3. <strong>Redesenhar (To-Be):</strong> Desenhar o novo fluxo ideal automatizado.</p>
                  <p>4. <strong>Automatizar:</strong> Reduzir trâmites manuais e aprovações em papel.</p>
                  <p>5. <strong>Monitorar:</strong> Acompanhar SLAs e KPIs para ajustes incrementais contínuos.</p>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
              titulo: "Gestão por Processos",
              artista: "Petrobras Quest",
            }}
          />

          <QuizInterativo
            questoes={mapQuizQuestions("modulo-5")}
            titulo="QUIZ: Gestão por Processos"
            numero={5}
            variant={mv[5]}
            onComplete={(score: number) => handleModuleComplete("modulo-5", score)}
          />
        </TabsContent>
      )}

      {/* ==================== MÓDULO 6 ==================== */}
      {activeTab === "modulo-6" && (
        <TabsContent value="modulo-6" className="space-y-12 mt-0">
          <ModuleBanner
            numero={6}
            titulo="Teoria das Organizações"
            descricao="Evolução histórica do pensamento administrativo: de Taylor à Contingência. Escolas, correntes e como elas moldaram a administração moderna."
            variant={mv[6]}
          />

          <div className="space-y-6">
            <ModuleSectionHeader
              index="INTRO"
              variant={mv[6]}
              title="Dossiê Histórico-Teórico"
              description="As grandes escolas e teorias que fundamentam a administração contemporânea."
            />
            <CardCarousel
              cards={[
                {
                  titulo: "Administração Científica",
                  descricao: "Frederick Taylor (~1911). Foco no 'chão de fábrica', estudo de tempos e movimentos, divisão de tarefas, máxima especialização. Foco nos meios.",
                  icone: <LuSearchCode />,
                  corFundo: "bg-blue-500/10",
                },
                {
                  titulo: "Teoria Clássica e Burocracia",
                  descricao: "Fayol (~1916) e Weber. Foco na estrutura formal da organização, princípios universais de administração e rigidez burocrática dos regulamentos.",
                  icone: <LuBuilding />,
                  corFundo: "bg-indigo-500/10",
                },
                {
                  titulo: "Relações Humanas",
                  descricao: "Elton Mayo (~1932). Hawthorne. Reconhece os grupos informais, fatores emocionais, o trabalhador social (*homo socialis*) e as condições humanas.",
                  icone: <LuUsers />,
                  corFundo: "bg-emerald-500/10",
                },
                {
                  titulo: "Abordagem Contingencial",
                  descricao: "Lawrence, Lorsch e Woodward. Não há uma única forma ideal de administrar (*one best way*). Tudo depende do ambiente externo e da tecnologia.",
                  icone: <LuZap />,
                  corFundo: "bg-amber-500/10",
                },
              ]}
            />
          </div>

          <div className="space-y-6">
            <ModuleSectionHeader
              index={2}
              variant={mv[6]}
              title="Análise Técnica C.E.D.E."
              description="Comparação crítica entre as grandes escolas administrativas."
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação: A Burocracia Weberiana e suas Disfunções Clássicas",
                  conteudo: (
                    <div className="space-y-4 text-slate-700 dark:text-slate-300">
                      <p>
                        A **Teoria da Burocracia de Max Weber** fundamenta a estrutura formal do serviço público brasileiro e das estatais. Weber projetou a burocracia como o modelo racional-legal ideal de eficiência baseado na impessoalidade, mérito e regras escritas claras. Contudo, na prática organizacional surgem desvios patológicos chamados de **Disfunções da Burocracia** (propostos por Robert Merton), assunto recorrente em provas:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                        <div className="p-3 bg-card border rounded-lg">
                          <strong className="text-blue-600 dark:text-blue-400">Características Ideais de Weber:</strong>
                          <ul className="list-disc pl-4 mt-2 space-y-1">
                            <li><strong>Caráter Legal:</strong> Regras, rotinas e normas exaustivamente escritas em estatutos.</li>
                            <li><strong>Impessoalidade:</strong> Tratamento sem favorecimento ou protecionismo pessoal.</li>
                            <li><strong>Hierarquia Funcional:</strong> Divisão estrita de esferas de competência e subordinação de chefia.</li>
                            <li><strong>Profissionalização:</strong> Escolha técnica e meritocrática dos agentes públicos.</li>
                          </ul>
                        </div>
                        <div className="p-3 bg-card border rounded-lg">
                          <strong className="text-amber-600 dark:text-amber-400">Disfunções Reais (Patologias):</strong>
                          <ul className="list-disc pl-4 mt-2 space-y-1">
                            <li><strong>Excesso de Formalismo (Papelório):</strong> Apego exagerado a carimbos, assinaturas e rotinas lentas.</li>
                            <li><strong>Resistência a Mudanças:</strong> Inabilidade crônica de se adaptar a novas tecnologias ou realidades de mercado.</li>
                            <li><strong>Despersonalização:</strong> Tratar as demandas individuais de forma puramente abstrata e cega.</li>
                            <li><strong>Regras como Fins em Si Mesmas:</strong> Cumprir a regra cegamente, mesmo que impeça o alcance do objetivo real.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuBookOpen />,
                },
                {
                  titulo: "Exemplificação: Como a Petrobras Gerencia o Choque Burocracia vs. Contingência",
                  conteudo: (
                    <div className="space-y-4 text-slate-700 dark:text-slate-300">
                      <p>
                        Para a Petrobras, operar a cadeia de suprimentos exige um equilíbrio cirúrgico entre duas escolas aparentemente contraditórias:
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-xs">
                        <li>
                          <strong>Burocracia Racional-Legal:</strong> Exigida mandatoriamente pela Lei 13.303, que rege as contratações públicas para coibir fraudes, nepotismo e garantir tratamento isonômico. Todo processo de compra deve deixar trilhas estritas de auditoria (impessoalidade e formalidade weberianas).
                        </li>
                        <li>
                          <strong>Abordagem Contingencial (Adaptabilidade):</strong> Quando ocorre um vazamento imprevisto ou a falha mecânica de uma broca em plataforma isolada a 200 km da costa, a Petrobras não pode esperar os prazos normais de uma licitação tradicional burocrática. Aplica-se a contingência situacional por meio das cláusulas de compra emergencial (dispensa regulamentar), priorizando a segurança e o fornecimento contínuo.
                        </li>
                      </ul>
                    </div>
                  ),
                  icone: <LuBriefcase />,
                },
                {
                  titulo: "Dicas Táticas: A Linha do Tempo e Conceitos-Chave da CESGRANRIO",
                  conteudo: (
                    <div className="space-y-4 text-slate-700 dark:text-slate-300">
                      <p>
                        Nas provas objetivas, a banca cobra a associação direta de autores, teorias e seus focos principais de estudo. Decore este mapa conceitual para responder instantaneamente:
                      </p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left border-collapse border border-border">
                          <thead>
                            <tr className="bg-muted">
                              <th className="p-2 border border-border">Escola</th>
                              <th className="p-2 border border-border">Foco Principal</th>
                              <th className="p-2 border border-border">Conceito e Termo Curinga</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="p-2 font-bold border border-border text-blue-600">Administração Científica (Taylor)</td>
                              <td className="p-2 border border-border">Nas Tarefas e Tempos (Chão de fábrica).</td>
                              <td className="p-2 border border-border">ORT (Organização Racional do Trabalho), Divisão do trabalho, Peça-Preço, *Homo Economicus*.</td>
                            </tr>
                            <tr>
                              <td className="p-2 font-bold border border-border text-indigo-600">Teoria Clássica (Fayol)</td>
                              <td className="p-2 border border-border">Na Estrutura formal global.</td>
                              <td className="p-2 border border-border">14 Princípios universais, Funções Administrativas originais, unidade de comando, linearidade.</td>
                            </tr>
                            <tr>
                              <td className="p-2 font-bold border border-border text-emerald-600">Relações Humanas (Elton Mayo)</td>
                              <td className="p-2 border border-border">Nas Pessoas e Grupos informais.</td>
                              <td className="p-2 border border-border">Hawthorne, *Homo Socialis*, liderança informal, dinâmica de grupos, fatores motivacionais sociais.</td>
                            </tr>
                            <tr>
                              <td className="p-2 font-bold border border-border text-cyan-600">Teoria de Sistemas (Ludwig)</td>
                              <td className="p-2 border border-border">Na Visão Sistêmica integrada.</td>
                              <td className="p-2 border border-border">Entropia negativa, sinergia, homeostase, limites dinâmicos, organização como sistema aberto.</td>
                            </tr>
                            <tr>
                              <td className="p-2 font-bold border border-border text-amber-600">Contingencial (Woodward)</td>
                              <td className="p-2 border border-border">No Ambiente e Tecnologia.</td>
                              <td className="p-2 border border-border">"Não há uma única forma correta de gerir", imperativo tecnológico, flexibilidade orgânica vs mecânica.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ),
                  icone: <LuAward />,
                },
                {
                  titulo: "Exceções e pontos de atenção: Teoria Clássica vs. Científica",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-slate-700 dark:text-slate-300">
                        Muitos candidatos acham que a Escola Científica e a Clássica são sinônimos por pertencerem à Era Clássica da Administração. **Isso é uma pontos de atenção recorrente nas provas.**
                      </p>
                      <AlertBox tipo="warning" titulo="A Direção do Olhar Metodológico">
                        A **Administração Científica** de Frederick Taylor adota uma abordagem de baixo para cima (*bottom-up*), partindo da análise minuciosa da tarefa do operário para depois chegar à gerência global. Por outro lado, a **Teoria Clássica** de Henri Fayol adota uma abordagem de cima para baixo (*top-down*), partindo da estrutura global da diretoria e descendo até as divisões de base. A banca adora inverter estes dois fluxos!
                      </AlertBox>
                    </div>
                  ),
                  icone: <LuTriangleAlert />,
                },
              ]}
            />
          </div>

          <ModuleConsolidation
            index={6}
            variant={mv[6]}
            video={{
              videoId: "7c-YVly_C9o",
              title: "Escolas Administrativas - Linha do Tempo",
              duration: "15:45",
            }}
            resumoVisual={{
              moduloNome: "Módulo 6",
              tituloAula: "Administração Geral",
              materia: "Administração",
              images: [
                {
                  title: "Evolução Histórica",
                  type: "Timeline",
                  placeholderColor: "bg-blue-500/20",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Ordem Cronológica das Escolas",
              content: (
                <div className="space-y-2 text-sm">
                  <p>• <strong>1911:</strong> Administração Científica (Taylor) – Eficiência de Tarefa.</p>
                  <p>• <strong>1916:</strong> Teoria Clássica (Fayol) – Eficiência na Estrutura.</p>
                  <p>• <strong>1924:</strong> Experiência de Hawthorne e Mayo – Reconhecimento do Fator Humano.</p>
                  <p>• <strong>1947:</strong> Teoria da Burocracia (Weber) – Racionalidade e Impessoalidade legal.</p>
                  <p>• <strong>1967+:</strong> Abordagem Contingencial – Flexibilidade diante do contexto externo.</p>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
              titulo: "Teoria das Organizações",
              artista: "Petrobras Quest",
            }}
          />

          <QuizInterativo
            questoes={mapQuizQuestions("modulo-6")}
            titulo="QUIZ: Teoria das Organizações"
            numero={6}
            variant={mv[6]}
            onComplete={(score: number) => handleModuleComplete("modulo-6", score)}
          />
        </TabsContent>
      )}

      {/* ==================== MÓDULO 7 ==================== */}
      {activeTab === "modulo-7" && (
        <TabsContent value="modulo-7" className="space-y-12 mt-0">
          <ModuleBanner
            numero={7}
            titulo="Comunicação e Conflitos"
            descricao="A comunicação como processo vital. Canais, barreiras, feedback. Conflitos: naturais, necessários, podem ser construtivos ou destrutivos."
            variant={mv[7]}
          />

          <div className="space-y-6">
            <ModuleSectionHeader
              index="INTRO"
              variant={mv[7]}
              title="Dossiê de Comunicação"
              description="Fundamentos e práticas de comunicação organizacional eficaz."
            />
            <CardCarousel
              cards={[
                {
                  titulo: "Processo de Comunicação",
                  descricao: "Circuito composto por Emissor, Mensagem, Codificação, Canal, Decodificação, Receptor, Feedback e os ruídos ambientais ou psicológicos.",
                  icone: <LuHandshake />,
                  corFundo: "bg-teal-500/10",
                },
                {
                  titulo: "Canais e Fluxos",
                  descricao: "Canais formais vs informais (rádio corredor). Direções: fluxos descendentes (ordens), ascendentes (sugestões) e horizontais (colaboração lateral).",
                  icone: <LuNetwork />,
                  corFundo: "bg-cyan-500/10",
                },
                {
                  titulo: "Barreiras Semânticas e Físicas",
                  descricao: "Barreiras de interpretação de palavras (semânticas), ruído físico ambiental e filtragem (envio seletivo e parcial de informações corporativas).",
                  icone: <LuTriangleAlert />,
                  corFundo: "bg-orange-500/10",
                },
                {
                  titulo: "O Conflito como Força",
                  descricao: "Superação da visão clássica que via o conflito apenas como destruição. Visões moderna e interacionista: o conflito é natural e estimula inovação.",
                  icone: <LuCheck />,
                  corFundo: "bg-emerald-500/10",
                },
              ]}
            />
          </div>

          <div className="space-y-6">
            <ModuleSectionHeader
              index={2}
              variant={mv[7]}
              title="Análise Técnica C.E.D.E."
              description="Profundidade em comunicação e gestão de conflitos."
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação: Gestão de Conflitos sob o Modelo Thomas-Kilmann",
                  conteudo: (
                    <div className="space-y-4 text-slate-700 dark:text-slate-300">
                      <p>
                        A gestão de conflitos exige a compreensão de que as divergências são inevitáveis e naturais em equipes multidisciplinares. O modelo clássico de <strong>Thomas-Kilmann</strong> conceitua as atitudes das pessoas perante conflitos com base em dois eixos essenciais: **Assertividade** (grau em que o sujeito busca satisfazer os próprios interesses) e **Cooperatividade** (grau em que busca cooperar para sanar o interesse do outro). Disso decorrem 5 abordagens clássicas:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
                        <div className="p-3 bg-card border rounded-lg text-center">
                          <strong className="text-red-600 block mb-1">1. Competição:</strong>
                          <span>Assertivo e Não Cooperativo. Estilo ganhar-perder. Útil em emergências críticas.</span>
                        </div>
                        <div className="p-3 bg-card border rounded-lg text-center">
                          <strong className="text-amber-600 block mb-1">2. Acomodação:</strong>
                          <span>Não Assertivo e Cooperativo. Abrir mão dos próprios interesses em favor do outro.</span>
                        </div>
                        <div className="p-3 bg-card border rounded-lg text-center">
                          <strong className="text-blue-600 block mb-1">3. Evitação:</strong>
                          <span>Não Assertivo e Não Cooperativo. Fugir do conflito para adiar o debate. Supressão temporária.</span>
                        </div>
                        <div className="p-3 bg-card border rounded-lg text-center">
                          <strong className="text-emerald-600 block mb-1">4. Compromisso:</strong>
                          <span>Meio-termo de assertividade e cooperatividade. Estilo negociação partilhada.</span>
                        </div>
                        <div className="p-3 bg-card border rounded-lg text-center">
                          <strong className="text-teal-600 block mb-1">5. Colaboração:</strong>
                          <span>Assertivo e Cooperativo. Estilo ganhar-ganhar. Solução integrada inovadora para ambas as partes.</span>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuBookOpen />,
                },
                {
                  titulo: "Exemplificação: O Impacto da Filtragem de Informação na Cadeia de Logística",
                  conteudo: (
                    <div className="space-y-4 text-slate-700 dark:text-slate-300">
                      <p>
                        A **filtragem** é uma barreira de comunicação grave na Petrobras, comum nos fluxos ascendentes (quando a base repassa dados para a gerência corporativa):
                      </p>
                      <AlertBox tipo="warning" titulo="Exemplo Prático de Filtragem">
                        Imagine que um técnico operacional de almoxarifado em Macaé percebe um atraso na entrega de válvulas críticas por parte de um fornecedor estratégico, o que pode paralisar as sondas de perfuração do pré-sal em 3 semanas. Temendo reações negativas da gerência (que cobra o cumprimento de prazos estritos), o técnico "filtra" a informação ao supervisor intermediário, relatando apenas que "o processo segue em andamento, com pequenos ajustes de logística". O resultado é uma perda de tempo de reação estratégico, pois a diretoria só toma conhecimento do problema quando a paralisação operacional torna-se iminente.
                      </AlertBox>
                    </div>
                  ),
                  icone: <LuBriefcase />,
                },
                {
                  titulo: "Dicas Táticas: Classificação Moderna do Conflito",
                  conteudo: (
                    <div className="space-y-4 text-slate-700 dark:text-slate-300">
                      <p>
                        A CESGRANRIO cobra muito a visão interacionista e contemporânea do conflito organizacional. Lembre-se:
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          <strong>Conflito de Tarefa:</strong> Relaciona-se com o conteúdo e metas do trabalho. Em níveis moderados, **estimula a inovação** e a criatividade, sendo considerado construtivo (funcional).
                        </li>
                        <li>
                          <strong>Conflito de Relacionamento (Pessoal):</strong> Relaciona-se com antipatias, choques de egos ou hostilidade mútua de caráter pessoal. **Sempre destrutivo e prejudicial (disfuncional)** à produtividade corporativa.
                        </li>
                        <li>
                          <strong>Conflito de Processo:</strong> Relaciona-se com o debate de COMO o trabalho é executado (divisão de responsabilidades). Em níveis baixos, também pode ser construtivo.
                        </li>
                      </ul>
                    </div>
                  ),
                  icone: <LuAward />,
                },
                {
                  titulo: "Exceções e pontos de atenção: Supressão ≠ Resolução Real",
                  conteudo: (
                    <div className="space-y-4 text-slate-700 dark:text-slate-300">
                      <p>
                        Um erro frequente de gestores inexperientes é tentar suprimir ativamente qualquer manifestação de conflito em suas equipes.
                      </p>
                      <AlertBox tipo="danger" titulo="Os Perigos da Evitação Sistemática">
                        Adotar a **evitação** (fingir que o conflito não existe) ou a **acomodação rápida** (dar razão sempre a um reclamante) apenas silencia provisoriamente os sintomas visíveis. As causas reais da divergência permanecem latentes e acumulam-se, gerando um ambiente de desconfiança e ressentimento que explodirá de forma muito mais grave no futuro sob a forma de ruídos de comunicação e ineficiência.
                      </AlertBox>
                    </div>
                  ),
                  icone: <LuTriangleAlert />,
                },
              ]}
            />
          </div>

          <ModuleConsolidation
            index={7}
            variant={mv[7]}
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "Comunicação e Conflitos Organizacionais",
              duration: "13:30",
            }}
            resumoVisual={{
              moduloNome: "Módulo 7",
              tituloAula: "Administração Geral",
              materia: "Administração",
              images: [
                {
                  title: "Modelo de Comunicação",
                  type: "Diagrama",
                  placeholderColor: "bg-teal-500/20",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Escuta Ativa nas Relações",
              content: (
                <div className="space-y-2 text-sm">
                  <p>✓ <strong>Ouça sem preconceitos:</strong> Evite a filtragem mental preliminar baseada em antipatias pessoais.</p>
                  <p>✓ <strong>Solicite Feedback:</strong> Garanta o circuito completo de decodificação no receptor.</p>
                  <p>✓ <strong>Escolha o Canal Adequado:</strong> Assuntos complexos ou conflitos exigem comunicação presencial ou síncrona rica, e não trocas frias de e-mails corporativos.</p>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
              titulo: "Comunicação e Conflitos",
              artista: "Petrobras Quest",
            }}
          />

          <QuizInterativo
            questoes={mapQuizQuestions("modulo-7")}
            titulo="QUIZ: Comunicação e Conflitos"
            numero={7}
            variant={mv[7]}
            onComplete={(score: number) => handleModuleComplete("modulo-7", score)}
          />
        </TabsContent>
      )}

      {/* ==================== MÓDULO 8 ==================== */}
      {activeTab === "modulo-8" && (
        <TabsContent value="modulo-8" className="space-y-12 mt-0">
          <ModuleBanner
            numero={8}
            titulo="Decisão e Inovação"
            descricao="Processo decisório nas organizações: tipos, modelos, técnicas. Inovação: necessidade estratégica na era do conhecimento."
            variant={mv[8]}
          />

          <div className="space-y-6">
            <ModuleSectionHeader
              index="INTRO"
              variant={mv[8]}
              title="Dossiê Decisório"
              description="Tipos de decisão, modelos de decisão, técnicas e armadilhas cognitivas."
            />
            <CardCarousel
              cards={[
                {
                  titulo: "Decisão Programada",
                  descricao: "Rotineira, previsível e baseada em regras repetitivas ou procedimentos operacionais padronizados (POPs). Exemplo: Reposição de estoque.",
                  icone: <LuClipboardList />,
                  corFundo: "bg-blue-500/10",
                },
                {
                  titulo: "Decisão Não-Programada",
                  descricao: "Complexa, sem precedentes históricos, exige soluções customizadas da alta hierarquia. Exemplo: Mudança estratégica da refinaria.",
                  icone: <LuBrain />,
                  corFundo: "bg-emerald-500/10",
                },
                {
                  titulo: "Racionalidade Limitada",
                  descricao: "Herbert Simon. Demonstra que a decisão humana nunca é perfeita devido a limites cognitivos, tempo finito e falta de dados perfeitos.",
                  icone: <LuSearch />,
                  corFundo: "bg-cyan-500/10",
                },
                {
                  titulo: "Espiral do Conhecimento",
                  descricao: "Nonaka & Takeuchi. A conversão dinâmica e cíclica entre conhecimento tácito (pessoal) e explícito (sistemas corporativos).",
                  icone: <LuLightbulb />,
                  corFundo: "bg-yellow-500/10",
                },
              ]}
            />
          </div>

          <div className="space-y-6">
            <ModuleSectionHeader
              index={2}
              variant={mv[8]}
              title="Análise Técnica C.E.D.E."
              description="Modelos de decisão e gestão da inovação organizacional."
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação: A Racionalidade Limitada de Herbert Simon e a Espiral de Nonaka",
                  conteudo: (
                    <div className="space-y-4 text-slate-700 dark:text-slate-300">
                      <p>
                        A tomada de decisão é a essência do trabalho administrativo. Contrapondo-se ao modelo econômico clássico que defendia que o homem toma decisões 100% racionais com base em informações perfeitas, <strong>Herbert Simon</strong> formulou a teoria da **Racionalidade Limitada**:
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          O tomador de decisão possui capacidade cognitiva limitada de processamento de múltiplos cenários.
                        </li>
                        <li>
                          Não possui tempo ilimitado nem acesso a todas as informações ambientais de mercado.
                        </li>
                        <li>
                          Portanto, os administradores buscam uma decisão **satisfatória** (suficientemente boa para sanar o problema no curto prazo) em vez da decisão ótima (ideal absoluta).
                        </li>
                      </ul>
                      <div className="bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/20 text-xs space-y-2">
                        <span className="font-bold text-emerald-800 dark:text-emerald-400">A Espiral do Conhecimento de Nonaka e Takeuchi:</span>
                        <p>
                          A inovação decorre do fluxo dinâmico de conversão do conhecimento em 4 quadrantes clássicos:
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-center mt-2">
                          <div className="p-2 bg-card border rounded">
                            <strong className="block text-blue-600">Socialização:</strong>
                            Tácito para Tácito. Conversas e partilhas informais diretas.
                          </div>
                          <div className="p-2 bg-card border rounded">
                            <strong className="block text-emerald-600">Externalização:</strong>
                            Tácito para Explícito. Documentar o saber em manuais ou manuais técnicos.
                          </div>
                          <div className="p-2 bg-card border rounded">
                            <strong className="block text-cyan-600">Combinação:</strong>
                            Explícito para Explícito. Unir múltiplos manuais para criar novos sistemas corporativos.
                          </div>
                          <div className="p-2 bg-card border rounded">
                            <strong className="block text-amber-600">Internalização:</strong>
                            Explícito para Tácito. Aprender fazendo (*learning by doing*), absorvendo o conhecimento.
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuBookOpen />,
                },
                {
                  titulo: "Exemplificação: Processo Decisório na Escolha de Fornecedor Crítico na Petrobras",
                  conteudo: (
                    <div className="space-y-4 text-slate-700 dark:text-slate-300">
                      <p>
                        Veja o contraste da tomada de decisão programada e não-programada na Petrobras:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                        <div className="p-4 bg-muted border rounded-lg space-y-2">
                          <h6 className="font-bold text-blue-600">Decisão Programada (Operacional):</h6>
                          <p>
                            O estoque de óleo lubrificante de turbinas na base offshore caiu abaixo do limite de segurança (ponto de ressuprimento).
                          </p>
                          <p className="text-muted-foreground text-xxs">
                            A ação corretiva é automática: o sistema SAP dispara a emissão de pedido de compras direcionada ao fornecedor vencedor do contrato de gaveta pré-aprovado. Não exige novas análises ou debates estratégicos.
                          </p>
                        </div>
                        <div className="p-4 bg-muted border rounded-lg space-y-2">
                          <h6 className="font-bold text-emerald-600">Decisão Não-Programada (Estratégica):</h6>
                          <p>
                            A Petrobras decide investir em tecnologia de hidrogênio verde, exigindo a contratação de fornecedores globais de engenharia disruptiva.
                          </p>
                          <p className="text-muted-foreground text-xxs">
                            Não existe edital anterior padronizado ou referências exatas. Exige reuniões interdisciplinares na diretoria, consultas públicas ao mercado, profunda análise de risco financeiro e aprovação pelo comitê executivo da holding.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuBriefcase />,
                },
                {
                  titulo: "Dicas Táticas: Armadilhas e Vieses Decisórios em Concursos",
                  conteudo: (
                    <div className="space-y-4 text-slate-700 dark:text-slate-300">
                      <p>
                        A CESGRANRIO adora cobrar os vieses cognitivos e falhas sistemáticas cometidas pelos administradores no processo decisório:
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          <strong>Viés de Ancoragem:</strong> Fixar-se desproporcionalmente na primeira informação recebida (a âncora) e reajustar de forma inadequada os dados adicionais posteriores. Exemplo: Considerar o primeiro orçamento de contratação como a única verdade inalterável.
                        </li>
                        <li>
                          <strong>Viés de Confirmação:</strong> Buscar seletivamente informações que confirmem sua hipótese inicial e ignorar ou depreciar ativamente dados que contestem sua opinião.
                        </li>
                        <li>
                          <strong>Viés de Disponibilidade:</strong> Avaliar a probabilidade de eventos com base no quão facilmente exemplos semelhantes surgem na memória recente, e não em dados estatísticos reais.
                        </li>
                        <li>
                          <strong>Armadilha do Custo Afundado (*Sunk Cost*):</strong> Continuar aportando recursos financeiros e humanos em um projeto fracassado apenas para tentar "justificar" as perdas de investimentos já realizadas no passado.
                        </li>
                      </ul>
                    </div>
                  ),
                  icone: <LuAward />,
                },
                {
                  titulo: "Exceções e pontos de atenção: A Ilusão do Modelo 100% Racional",
                  conteudo: (
                    <div className="space-y-4 text-slate-700 dark:text-slate-300">
                      <p>
                        Muitos candidatos de engenharia ou finanças acreditam que, com computadores modernos e algoritmos avançados, o modelo racional de decisão absoluta é atingível.
                      </p>
                      <AlertBox tipo="warning" titulo="Limites Físicos e Políticos">
                        Na Petrobras real, as grandes decisões estratégicas nunca são tomadas sob racionalidade computacional matemática pura. Existem fatores geopolíticos mutáveis de mercado, pressões institucionais do acionista majoritário (Governo Federal), tensões ambientais locais e flutuações extremas da cotação internacional do petróleo (Brent) que tornam o cenário decisório altamente incerto e político. A decisão bem-sucedida equilibra a modelagem estatística com o discernimento político do cenário estratégico externo.
                      </AlertBox>
                    </div>
                  ),
                  icone: <LuTriangleAlert />,
                },
              ]}
            />
          </div>

          <ModuleConsolidation
            index={8}
            variant={mv[8]}
            video={{
              videoId: "7c-YVly_C9o",
              title: "Decisão Administrativa e Inovação",
              duration: "14:15",
            }}
            resumoVisual={{
              moduloNome: "Módulo 8",
              tituloAula: "Administração Geral",
              materia: "Administração",
              images: [
                {
                  title: "Processo Decisório",
                  type: "Fluxograma",
                  placeholderColor: "bg-blue-500/20",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Passos da Decisão Racional Limitada",
              content: (
                <div className="space-y-2 text-xs">
                  <p>1. <strong>Definir o Problema:</strong> Isolar os sintomas da causa real da ineficiência.</p>
                  <p>2. <strong>Fixar Critérios:</strong> O que é mandatório na escolha (custo, tempo, sustentabilidade).</p>
                  <p>3. <strong>Gerar Alternativas:</strong> Encontrar opções de fornecedores aptos.</p>
                  <p>4. <strong>Escolha Rápida e Satisfatória:</strong> Escolher a primeira alternativa que satisfaz os limites mínimos de segurança.</p>
                  <p>5. <strong>Avaliar Consequências:</strong> Ajustar e aprender com as decisões passadas para o próximo ciclo de compras.</p>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
              titulo: "Decisão e Inovação",
              artista: "Petrobras Quest",
            }}
          />

          <QuizInterativo
            questoes={mapQuizQuestions("modulo-8")}
            titulo="QUIZ: Decisão e Inovação"
            numero={8}
            variant={mv[8]}
            onComplete={(score: number) => handleModuleComplete("modulo-8", score)}
          />
        </TabsContent>
      )}

      {/* ==================== MÓDULO 9 ==================== */}
      {activeTab === "modulo-9" && (
        <TabsContent value="modulo-9" className="space-y-12 mt-0">
          <ModuleBanner
            numero={9}
            titulo="Administração na Petrobras"
            descricao="Aplicação prática: desafios únicos de suprimento em uma estatal de energia. Leis 13.303 e 14.133, processos, fornecedores, sustentabilidade."
            variant={mv[9]}
          />

          <div className="space-y-6">
            <ModuleSectionHeader
              index="INTRO"
              variant={mv[9]}
              title="Dossiê Petrobras: Marco Regulatório Legal"
              description="Domine a complexidade jurídica e a comparação crítica dos regimes de contratações estatais e públicas."
            />
            <CardCarousel
              cards={[
                {
                  titulo: "Lei das Estatais (13.303)",
                  descricao: "Estatuto jurídico que disciplina a exploração econômica do Estado. Rege obrigatoriamente todas as compras de bens e serviços da Petrobras.",
                  icone: <LuScale />,
                  corFundo: "bg-slate-500/10",
                },
                {
                  titulo: "Regime Próprio de Compras",
                  descricao: "Diferente da administração direta, a Lei 13.303 permite à Petrobras ritos simplificados de contratação para garantir velocidade comercial perante a livre concorrência.",
                  icone: <LuTruck />,
                  corFundo: "bg-stone-500/10",
                },
                {
                  titulo: "Inversão de Fases",
                  descricao: "No rito licitatório das estatais, o julgamento das propostas financeiras ocorre ANTES da abertura e análise dos documentos de habilitação jurídica.",
                  icone: <LuFileCheck />,
                  corFundo: "bg-green-500/10",
                },
                {
                  titulo: "ESG e Governança",
                  descricao: "Matriz de riscos e canal de compliance para combater corrupção, garantir transparência e focar na redução sistemática da pegada de carbono.",
                  icone: <LuShield />,
                  corFundo: "bg-emerald-500/10",
                },
              ]}
            />
          </div>

          {/* TABELA COMPARATIVA PREMIUM DE LICITAÇÕES (Módulo 9) */}
          <div className="space-y-6">
            <ModuleSectionHeader
              index="LICITAÇÕES"
              variant={mv[9]}
              title="Lei das Estatais (13.303) vs. Nova Lei de Licitações (14.133)"
              description="Comparativo definitivo exigido pela banca CESGRANRIO para o cargo de Técnico de Suprimentos."
            />

            {/* Layout responsivo premium (Opção B): Tabela rolável no Desktop, Cards empilhados no Mobile */}
            <div className="block lg:hidden space-y-4">
              <AlertBox tipo="info" titulo="Modo Mobile Ativo">
                Abaixo, a tabela comparativa premium foi adaptada para cards empilhados de alta legibilidade para telas menores.
              </AlertBox>

              <div className="p-4 bg-card border rounded-xl space-y-2">
                <span className="text-xxs uppercase tracking-wider font-bold text-emerald-600">Critério 1</span>
                <h5 className="font-bold text-foreground">Âmbito de Aplicação</h5>
                <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                  <p><strong>Lei das Estatais (13.303/2016):</strong> Sociedades de Economia Mista (ex: Petrobras, BB), Empresas Públicas (ex: Caixa) e suas subsidiárias integrais.</p>
                  <p><strong>Nova Lei de Licitações (14.133/2021):</strong> Administração Direta, Autárquica e Fundacional da União, Estados, DF e Municípios.</p>
                  <p className="text-xxs text-amber-600 mt-1 font-bold italic">💡 CESGRANRIO: Estatais NÃO usam a Lei 14.133, exceto se expressamente indicado em crime licitatório no Código Penal.</p>
                </div>
              </div>

              <div className="p-4 bg-card border rounded-xl space-y-2">
                <span className="text-xxs uppercase tracking-wider font-bold text-emerald-600">Critério 2</span>
                <h5 className="font-bold text-foreground">Modalidades de Licitação</h5>
                <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                  <p><strong>Lei das Estatais (13.303/2016):</strong> Sem modalidades rígidas de nomes da 14.133 (ex: tomada de preços). Adota o **Procedimento Licitatório Próprio** e o **Pregão** (para bens comuns).</p>
                  <p><strong>Nova Lei de Licitações (14.133/2021):</strong> Modalidades estritas de lei: Pregão, Concorrência, Concurso, Leilão e **Diálogo Competitivo**.</p>
                  <p className="text-xxs text-amber-600 mt-1 font-bold italic">💡 CESGRANRIO: A 13.303 **não** possui a modalidade de Diálogo Competitivo ou Concorrência nos moldes tradicionais.</p>
                </div>
              </div>

              <div className="p-4 bg-card border rounded-xl space-y-2">
                <span className="text-xxs uppercase tracking-wider font-bold text-emerald-600">Critério 3</span>
                <h5 className="font-bold text-foreground">Inversão de Fases de Habilitação</h5>
                <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                  <p><strong>Lei das Estatais (13.303/2016):</strong> **Regra Absoluta:** Ocorre primeiro a proposta e julgamento financeiro, e **somente o licitante vencedor** tem sua documentação de habilitação analisada.</p>
                  <p><strong>Nova Lei de Licitações (14.133/2021):</strong> Regra geral: proposta e depois habilitação. Mas a inversão é permitida apenas mediante justificativa expressa em edital.</p>
                  <p className="text-xxs text-amber-600 mt-1 font-bold italic">💡 CESGRANRIO: A inversão nas estatais economiza 90% do tempo de tramitação dos certames.</p>
                </div>
              </div>

              <div className="p-4 bg-card border rounded-xl space-y-2">
                <span className="text-xxs uppercase tracking-wider font-bold text-emerald-600">Critério 4</span>
                <h5 className="font-bold text-foreground">Limites para Dispensa de Licitação</h5>
                <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                  <p><strong>Lei das Estatais (13.303/2016):</strong> R$ 100.000,00 para obras/engenharia e R$ 50.000,00 para compras/outros serviços (atualizável por decreto corporativo).</p>
                  <p><strong>Nova Lei de Licitações (14.133/2021):</strong> R$ 100.000,00 para engenharia/manutenção e R$ 50.000,00 para outros serviços e compras (valores reajustados anualmente).</p>
                  <p className="text-xxs text-amber-600 mt-1 font-bold italic">💡 CESGRANRIO: Cuidado com a alteração recente de limites e regras de publicidade de compras diretas.</p>
                </div>
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/80 text-foreground text-xs font-bold border-b border-border">
                    <th className="p-3">Critério Técnico</th>
                    <th className="p-3 w-1/3">Lei das Estatais (Lei 13.303/16)</th>
                    <th className="p-3 w-1/3">Nova Lei de Licitações (Lei 14.133/21)</th>
                    <th className="p-3">Dica Tática CESGRANRIO</th>
                  </tr>
                </thead>
                <tbody className="text-xs text-slate-700 dark:text-slate-300 divide-y divide-border">
                  <tr>
                    <td className="p-3 font-bold bg-muted/20">Âmbito de Aplicação</td>
                    <td className="p-3">Empresas Públicas e Sociedades de Economia Mista federais, estaduais e municipais (ex: Petrobras, Banco do Brasil).</td>
                    <td className="p-3">Administração Direta, autarquias, fundações públicas e órgãos especiais da federação.</td>
                    <td className="p-3 text-emerald-600 font-semibold">Petrobras usa unicamente a 13.303 para compras fins e meio. Nunca a 14.133.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold bg-muted/20">Modalidades</td>
                    <td className="p-3">Adota **Procedimento Licitatório Próprio** regulado pelo estatuto interno, mais a adoção do **Pregão** para bens comuns.</td>
                    <td className="p-3">Pregão, Concorrência, Concurso, Leilão e **Diálogo Competitivo** (extinguiu tomada de preço).</td>
                    <td className="p-3 text-emerald-600 font-semibold">Estatais não possuem a modalidade formal de Diálogo Competitivo.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold bg-muted/20">Fase de Habilitação</td>
                    <td className="p-3">**Regra Absoluta:** Ocorre a inversão de fases. Abre-se o preço, julga-se e **apenas o licitante 1º colocado** envia habilitação.</td>
                    <td className="p-3">Propostas de preço antecedem a habilitação, mas permite-se o rito inverso clássico sob forte motivação legal.</td>
                    <td className="p-3 text-emerald-600 font-semibold">Nas estatais, a inversão é regra legal expressa. Poupa tempo e burocracia de arquivo.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold bg-muted/20">Dispensa de Licitação</td>
                    <td className="p-3">Valores de alçada: **R$ 100 mil** para obras e engenharia; **R$ 50 mil** para compras e serviços comuns.</td>
                    <td className="p-3">Valores de alçada: **R$ 100 mil** para engenharia/manutenções e **R$ 50 mil** para outras aquisições (reajustáveis).</td>
                    <td className="p-3 text-emerald-600 font-semibold">Os valores originais nominalmente coincidem, mas as estatais usam índice de reajuste próprio.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold bg-muted/20">Matriz de Riscos</td>
                    <td className="p-3">**Obrigatória** em todos os contratos de empreitada integrada e semi-integrada para dividir responsabilidades.</td>
                    <td className="p-3">Opcional como regra geral, mas obrigatória em contratações de grande escala financeira ou complexidade técnica.</td>
                    <td className="p-3 text-emerald-600 font-semibold">A matriz de risco da Petrobras blinda a empresa contra reequilíbrios contratuais abusivos de fornecedores.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <ModuleSectionHeader
              index={2}
              variant={mv[9]}
              title="Análise Técnica C.E.D.E. (Dossiê Lei 13.303)"
              description="Desafios e soluções administrativas na realidade Petrobras."
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação: O Princípio da Transparência e a Petronect",
                  conteudo: (
                    <div className="space-y-4 text-slate-700 dark:text-slate-300">
                      <p>
                        A Petrobras realiza a esmagadora maioria de suas licitações de bens e serviços através do portal eletrônico **Petronect** (regime eletrônico de compras). Isso cumpre o princípio constitucional da **Publicidade** e da **Isonomia**:
                      </p>
                      <AlertBox tipo="info" titulo="Vantagens do Petronect">
                        O sistema Petronect garante que fornecedores de qualquer porte ou localização geográfica possam concorrer em igualdade de condições. Todas as propostas de preço de sobressalentes, cotações e atas de julgamento ficam registradas digitalmente, impedindo manipulações manuais de compras e otimizando a velocidade das transações.
                      </AlertBox>
                    </div>
                  ),
                  icone: <LuBookOpen />,
                },
                {
                  titulo: "Exemplificação: Processo de Compra Estratégica vs. Commodities",
                  conteudo: (
                    <div className="space-y-4 text-slate-700 dark:text-slate-300">
                      <p>
                        O setor de suprimento da Petrobras atua na classificação matricial das compras em duas grandes categorias:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                        <div className="p-3 bg-muted rounded border border-border">
                          <strong className="text-emerald-700">1. Itens Estratégicos (Customizados):</strong>
                          <p className="mt-1 text-slate-600">
                            Equipamentos submarinos complexos (ex: Árvores de Natal Molhadas - ANM, linhas flexíveis).
                          </p>
                          <p className="mt-2 font-semibold">Ação de Suprimento:</p>
                          <p className="text-xxs">Exige qualificação restrita técnica rigorosa prévia do fornecedor e longas negociações de engenharia sob regime de matriz de riscos complexa.</p>
                        </div>
                        <div className="p-3 bg-muted rounded border border-border">
                          <strong className="text-blue-700">2. Itens de Prateleira (Commodities):</strong>
                          <p className="mt-1 text-slate-600">
                            Parafusos, tubulações padrão, óleo comum, equipamentos de escritório, uniformes.
                          </p>
                          <p className="mt-2 font-semibold">Ação de Suprimento:</p>
                          <p className="text-xxs">Contratação ágil por pregão eletrônico, focada única e exclusivamente no menor preço e prazos céleres de logística de pátio.</p>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuBriefcase />,
                },
                {
                  titulo: "Dicas Táticas: Questões Clássicas sobre Inversão de Fases",
                  conteudo: (
                    <div className="space-y-4 text-slate-700 dark:text-slate-300">
                      <p>
                        A inversão de fases é o calcanhar de Aquiles de muitos candidatos. Memorize o fluxo oficial ditado pela Lei das Estatais em contratações:
                      </p>
                      <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20 text-xs">
                        <span className="font-bold text-amber-800">Fluxo Licitatório Oficial da Lei 13.303:</span>
                        <div className="flex flex-wrap items-center gap-2 mt-2 font-bold text-slate-800">
                          <span>1. Edital</span> <LuChevronRight className="text-amber-500" />
                          <span>2. Propostas</span> <LuChevronRight className="text-amber-500" />
                          <span>3. Julgamento</span> <LuChevronRight className="text-amber-500" />
                          <span>4. Recursos</span> <LuChevronRight className="text-amber-500" />
                          <span className="bg-emerald-500/20 text-emerald-800 p-1 rounded">5. Habilitação (Apenas 1º Colocado)</span> <LuChevronRight className="text-amber-500" />
                          <span>6. Homologação</span>
                        </div>
                        <p className="mt-3 text-xxs text-slate-600">
                          Note que os envelopes de documentação fiscal e trabalhista (habilitação) de todos os perdedores **nunca são abertos**, economizando centenas de horas administrativas de conferência de balanços e certidões negativas de dezenas de licitantes.
                        </p>
                      </div>
                    </div>
                  ),
                  icone: <LuAward />,
                },
                {
                  titulo: "Exceções e pontos de atenção: A Dispensa em Licitação Fracassada",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-slate-700 dark:text-slate-300">
                        Um cenário delicado em Suprimentos é a ocorrência de licitações vazias (sem interessados) ou fracassadas (todas as propostas foram desclassificadas por preços abusivos ou descumprimento de especificações).
                      </p>
                      <AlertBox tipo="warning" titulo="A Dispensa Técnica Motivada">
                        A Lei das Estatais prevê a exceção de **Contratação Direta (Dispensa)** caso a licitação anterior tenha sido fracassada ou deserta e sua repetição possa causar sérios prejuízos à operação da Petrobras. Contudo, a gerência de suprimentos deve documentar de forma inequívoca que as condições de mercado originais do edital fracassado foram mantidas e que o preço contratado diretamente está em consonância com as médias de mercado locais.
                      </AlertBox>
                    </div>
                  ),
                  icone: <LuTriangleAlert />,
                },
              ]}
            />
          </div>

          <ModuleConsolidation
            index={9}
            variant={mv[9]}
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "Administração Pública e Lei 13.303",
              duration: "13:00",
            }}
            resumoVisual={{
              moduloNome: "Módulo 9",
              tituloAula: "Administração Geral",
              materia: "Administração",
              images: [
                {
                  title: "Processo de Compras Petrobras",
                  type: "Fluxograma",
                  placeholderColor: "bg-slate-500/20",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Lei 13.303 - Princípios",
              content: (
                <div className="space-y-1 text-xs">
                  <p>🔐 <strong>Legalidade:</strong> Respeitar a letra fria da lei das estatais.</p>
                  <p>🤝 <strong>Moralidade:</strong> Ética e conformidade contra fraudes corporativas.</p>
                  <p>📢 <strong>Transparência:</strong> Petronect aberta a consultas públicas e auditoria.</p>
                  <p>💰 <strong>Eficiência:</strong> Otimização da cadeia de fornecedores sem desperdício de caixa.</p>
                  <p>Target <strong>Impessoalidade:</strong> Julgamento técnico impessoal por critérios de edital.</p>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
              titulo: "Administração na Petrobras",
              artista: "Petrobras Quest",
            }}
          />

          <QuizInterativo
            questoes={mapQuizQuestions("modulo-9")}
            titulo="QUIZ: Administração na Petrobras"
            numero={9}
            variant={mv[9]}
            onComplete={(score: number) => handleModuleComplete("modulo-9", score)}
          />
        </TabsContent>
      )}

      {/* ==================== MÓDULO 10 ==================== */}
      {activeTab === "modulo-10" && (
        <TabsContent value="modulo-10" className="space-y-12 mt-0">
          <ModuleBanner
            numero={10}
            titulo="Simulado Geral"
            descricao="Consolidação de todos os 9 módulos anteriores. 10 questões integradas cobrindo fundamentos, teorias, processos e contexto Petrobras."
            variant={mv[10]}
          />

          <div className="space-y-6">
            <ModuleSectionHeader
              index="INTRO"
              variant={mv[10]}
              title="Síntese Integradora"
              description="Antes do simulado: revise os conceitos-chave de cada módulo."
            />
            <CardCarousel
              cards={[
                {
                  titulo: "M1-M2: Bases e PODC",
                  descricao: "Eficiência vs Eficácia, Robert Katz, Mintzberg. Funções do ciclo integrado (Planejamento, Organização, Direção e Controle).",
                  icone: <LuBookOpen />,
                  corFundo: "bg-indigo-500/10",
                },
                {
                  titulo: "M3-M4: Design e Pessoas",
                  descricao: "Estruturas funcionais, matriciais e divisionais. Comportamento humano, Herzberg, Maslow e estilos de liderança situacional.",
                  icone: <LuUsers />,
                  corFundo: "bg-rose-500/10",
                },
                {
                  titulo: "M5-M6: Processos e Escolas",
                  descricao: "Mapeamento As-Is e To-Be, BPM, Kaizen vs Reengenharia. Evolução histórica das escolas Taylor, Fayol, Mayo e Weber.",
                  icone: <LuNetwork />,
                  corFundo: "bg-cyan-500/10",
                },
                {
                  titulo: "M7-M9: Execução e Petrobras",
                  descricao: "Comunicação livre de filtragem, resolução de conflitos, racionalidade limitada decisória e a Lei das Estatais (13.303) corporativa.",
                  icone: <LuBriefcase />,
                  corFundo: "bg-amber-500/10",
                },
              ]}
            />
          </div>

          <div className="space-y-6">
            <ModuleSectionHeader
              index={2}
              variant={mv[10]}
              title="Checklist de Preparação"
              description="Antes do simulado, certifique-se que você domina os pilares estratégicos:"
            />
            <div className="space-y-4">
              <AlertBox tipo="success" titulo="Metas de Aprendizado Consolidadas">
                <ul className="list-disc pl-5 space-y-2 mt-2 text-xs">
                  <li><strong>Robert Katz:</strong> Habilidades conceituais no topo estratégico, humanas em todos, técnicas na base operacional.</li>
                  <li><strong>Mintzberg:</strong> Diferenciar papéis interpessoais, informacionais e decisórios nas atribuições.</li>
                  <li><strong>Fatores de Herzberg:</strong> Salário é higiênico (extrínseco), desafio profissional é motivador (intrínseco).</li>
                  <li><strong>Estrutura Matricial:</strong> Quebra da unidade de comando de Fayol por metas complexas integradas.</li>
                  <li><strong>Gestão de Processos (BPM):</strong> Otimização horizontal com foco no valor final gerado.</li>
                  <li><strong>Lei 13.303/16 (Estatais):</strong> Rito licitatório eletrônico prioritário, inversão de fases obrigatória e matriz de risco.</li>
                </ul>
              </AlertBox>
            </div>
          </div>

          <ModuleConsolidation
            index={10}
            variant={mv[10]}
            video={{
              videoId: "7c-YVly_C9o",
              title: "Revisão Geral - Administração Completa",
              duration: "20:00",
            }}
            resumoVisual={{
              moduloNome: "Módulo 10",
              tituloAula: "Administração Geral",
              materia: "Administração",
              images: [
                {
                  title: "Mapa Mental - Todos os Módulos",
                  type: "Síntese Integradora",
                  placeholderColor: "bg-emerald-500/20",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "As 10 Ideias-Chave do Candidato de Elite",
              content: (
                <div className="text-xs space-y-1 bg-muted p-3 rounded-lg border">
                  <p>1️⃣ <strong>Administração:</strong> PODC sistemático contínuo.</p>
                  <p>2️⃣ <strong>Eficiência:</strong> Foco no uso racional dos meios. <strong>Eficácia:</strong> Foco nas metas.</p>
                  <p>3️⃣ <strong>Robert Katz:</strong> Habilidades sistêmicas no topo estratégico.</p>
                  <p>4️⃣ <strong>Herzberg:</strong> Condições físicas previnem insatisfação, mas não motivam de forma ativa.</p>
                  <p>5️⃣ <strong>Estrutura Matricial:</strong> Dupla subordinação em prol da integração.</p>
                  <p>6️⃣ <strong>Mapeamento As-Is:</strong> Representa a realidade operacional atual, sem filtros.</p>
                  <p>7️⃣ <strong>Merton (Disfunções):</strong> O excesso de formalismo burocrático gera ineficiências graves.</p>
                  <p>8️⃣ <strong>Thomas-Kilmann:</strong> A colaboração busca a atitude ganhar-ganhar integrada.</p>
                  <p>9️⃣ <strong>Simon:</strong> Administradores tomam decisões satisfatórias devido à racionalidade limitada.</p>
                  <p>🔟 <strong>Lei 13.303:</strong> A inversão de fases agiliza o fluxo de suprimentos da Petrobras.</p>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
              titulo: "Síntese Administração Geral",
              artista: "Petrobras Quest",
            }}
          />

          <QuizInterativo
            questoes={quizM10}
            titulo="Simulado Geral: Administração Geral Completa"
            numero={10}
            variant={mv[10]}
            onComplete={(score: number) => handleModuleComplete("modulo-10", score)}
          />
        </TabsContent>
      )}
    </AulaTemplate>
  );
}
