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
  CardCarousel,
  QuestaoResolvidaStepByStep} from "../shared";
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

  const { completedModules: completedModulesList, updateCompletedModules } = useAulaProgress();
  const completedModules = new Set(completedModulesList);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}active_tab`, activeTab);
    }
  }, [activeTab]);

  

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) {
      const newSet = new Set(completedModules).add(moduleId);
      updateCompletedModules(Array.from(newSet));
      const progress = Math.round(
        (newSet.size / MODULE_DEFS.length) * 100
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
      canComplete={completedModules.size >= MODULE_DEFS.length}
      lockMessage="Você precisa responder a todos os quizzes desta aula para finalizá-la."
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
            <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>A ciência da administração consolidou-se ao longo do último século como uma das disciplinas fundamentais para a viabilização e longevidade das organizações complexas. Nos exames de admissão de nível superior da Petrobras, elaborados tradicionalmente pela banca CESGRANRIO, os conceitos introdutórios de administração geral não são cobrados de forma puramente teórica, mas sim contextualizados nas rotinas de gerenciamento de recursos e planejamento estratégico. O entendimento claro desses alicerces é a primeira barreira de conhecimento que separa o candidato da aprovação.</p>
            <p>Em exames da CESGRANRIO, o domínio dos conceitos fundamentais é vital para o correto julgamento de questões complexas de múltipla escolha.</p>
            <p>No núcleo das teorias fundamentais da administração encontra-se a conceituação clássica de <strong>eficiência</strong> e <strong>eficácia</strong>. A eficiência refere-se estritamente aos meios e métodos de execução, buscando a otimização dos recursos com foco na minimização do desperdício de insumos, tempo e capital. A eficácia, por outro lado, foca de forma exclusiva nos fins, resultados e metas planejadas, representando a capacidade da empresa de cumprir de fato os objetivos estabelecidos com o mercado.</p>
            <p>A fundamentação teórica estabelece os parâmetros técnicos, de governança e de conformidade legal exigidos em auditorias.</p>
            <p>Para ilustrar graficamente esses conceitos na prática corporativa, considere a atividade de compras de tubulações de aço para o escoamento de gás natural de um consórcio petrolífero. Se a equipe de suprimentos realiza cotações ágeis, reduz custos administrativos do processo licitatório em 30% e otimiza a logística de transporte das tubulações até a base portuária, ela atuou com extrema <strong>eficiência operacional</strong> (melhor aproveitamento de recursos).</p>
            <p>Como demonstração operacional clássica, a conformidade atua prevenindo desperdícios e desvios de processo no almoxarifado.</p>
            <p>Os desdobramentos dessas teorias apontam para a importância de compreender a organização como um sistema aberto, cujos níveis hierárquicos (estratégico, tático e operacional) interagem continuamente. A transição entre esses níveis exige do administrador uma mudança na proporção de suas habilidades: o gerente tático (intermediário) atua como a ponte de conversão das diretrizes corporativas em planos de ação de curto prazo, demandando alta habilidade de comunicação humana para integrar equipes horizontais distintas.</p>
            <p>A análise aprofundada de exceções regulatórias exige documentação estrita de conformidade legal de todas as etapas de compras.</p>
            <p>Nas avaliações aplicadas pela CESGRANRIO, as questões costumam contrapor cenários práticos e induzir o candidato ao erro por meio da inversão sistemática das definições de eficiência e eficácia. Outra pegadinha clássica consiste em afirmar que as habilidades humanas pertencem exclusivamente ao nível intermediário, quando, na verdade, o modelo clássico de Katz estabelece de forma clara que as **habilidades humanas possuem relevância crítica e igual proporção** em todos os níveis da hierarquiaorganizacional.</p>
            <p>Na Petrobras, a rotina sob a égide da Lei das Estatais requer do Técnico rigor de compliance e transparência técnica em todos os processos.</p>
            
          </div>
            
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
              title="Habilidades e Papéis Gerenciais no Contexto Administrativo"
              description="Explorando a profundidade pedagógica dos fundamentos de administração."
            />
            <ContentAccordion mode="stacked" slides={[
                {
                  titulo: "Conceituação: O Processo Administrativo e Habilidades de Katz",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A administração moderna é definida como uma ciência social aplicada, cujo objeto de estudo é a atividade organizacional. Para compreender a atuação do administrador em qualquer esfera, recorre-se clássicamente ao modelo de <strong>Habilidades Administrativas de Robert Katz</strong>, extremamente cobrado pela banca CESGRANRIO:
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-lg">
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
                      <div className="bg-emerald-500/5 p-5 rounded-xl border border-emerald-500/20 mt-4">
                        <span className="font-bold text-xl text-emerald-800 dark:text-emerald-400 block mb-2">Os 10 Papéis Gerenciais de Henry Mintzberg</span>
                        <p className="text-lg">
                          Mintzberg identificou que os administradores desempenham 10 papéis específicos, subdivididos em três categorias fundamentais:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 text-lg">
                          <div className="p-4 bg-card border rounded-lg">
                            <span className="font-bold text-blue-600 dark:text-blue-400 text-xl block mb-1">1. Interpessoais:</span>
                            <ul className="list-disc pl-5 mt-1 space-y-1 text-base text-muted-foreground">
                              <li>Símbolo (representação formal)</li>
                              <li>Líder (motivação e orientação)</li>
                              <li>Ligação (rede de contatos)</li>
                            </ul>
                          </div>
                          <div className="p-4 bg-card border rounded-lg">
                            <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xl block mb-1">2. Informacionais:</span>
                            <ul className="list-disc pl-5 mt-1 space-y-1 text-base text-muted-foreground">
                              <li>Monitor (coleta de informações)</li>
                              <li>Disseminador (partilha interna)</li>
                              <li>Porta-voz (comunicação externa)</li>
                            </ul>
                          </div>
                          <div className="p-4 bg-card border rounded-lg">
                            <span className="font-bold text-amber-600 dark:text-amber-400 text-xl block mb-1">3. Decisórios:</span>
                            <ul className="list-disc pl-5 mt-1 space-y-1 text-base text-muted-foreground">
                              <li>Empreendedor (iniciador de projetos)</li>
                              <li>Solucionador de Conflitos</li>
                              <li>Alocador de Recursos</li>
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
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Para visualizar como a teoria se reflete na realidade prática da Petrobras, observe o desdobramento das atividades de suprimento em cada nível organizacional:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        <div className="p-5 bg-muted rounded-lg border border-border">
                          <h5 className="font-bold flex items-center gap-2 text-xl text-blue-600 dark:text-blue-400">
                            <LuTarget /> Nível Estratégico
                          </h5>
                          <p className="text-lg mt-2">
                            <strong>Quem atua:</strong> Conselho de Administração e Diretores Executivos da holding.
                          </p>
                          <p className="text-base text-muted-foreground mt-2">
                            Define o Plano de Negócios de Longo Prazo, a política ESG e as metas globais de transição energética para a próxima década.
                          </p>
                        </div>
                        <div className="p-5 bg-muted rounded-lg border border-border">
                          <h5 className="font-bold flex items-center gap-2 text-xl text-emerald-600 dark:text-emerald-400">
                            <LuBriefcase /> Nível Tático (Intermediário)
                          </h5>
                          <p className="text-lg mt-2">
                            <strong>Quem atua:</strong> Gerentes de Suprimento, Logística e Infraestrutura.
                          </p>
                          <p className="text-base text-muted-foreground mt-2">
                            Traduz as diretrizes globais em planos de ação específicos, gerencia os centros de distribuição e desenha as estratégias de compras locais.
                          </p>
                        </div>
                        <div className="p-5 bg-muted rounded-lg border border-border">
                          <h5 className="font-bold flex items-center gap-2 text-xl text-cyan-600 dark:text-cyan-400">
                            <LuFactory /> Nível Operacional
                          </h5>
                          <p className="text-lg mt-2">
                            <strong>Quem atua:</strong> Técnicos de Suprimento de Bens e Serviços, supervisores de pátio.
                          </p>
                          <p className="text-base text-muted-foreground mt-2">
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
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A CESGRANRIO possui um repertório clássico de distorções conceituais criadas para confundir o candidato apressado. Memorize estas distinções cruciais:
                      </p>
                      <div className="bg-amber-500/5 p-5 rounded-xl border border-amber-500/20 space-y-4 mt-4">
                        <div className="flex items-start gap-3">
                          <LuCheck className="text-emerald-600 mt-1 flex-shrink-0 w-6 h-6" />
                          <div>
                            <strong className="text-xl text-amber-800 dark:text-amber-400 block mb-1">Eficiência vs. Eficácia:</strong>
                            <p className="text-lg text-slate-700 dark:text-slate-300">
                              A banca costuma inverter as definições. Lembre-se: se a questão fala sobre "reduzir custos", "otimizar processos", "relação insumo-produto", ela está falando de <strong>Eficiência</strong> (meios). Se fala sobre "bater metas", "concluir o projeto", "satisfazer o cliente", refere-se a <strong>Eficácia</strong> (fins).
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <LuCheck className="text-emerald-600 mt-1 flex-shrink-0 w-6 h-6" />
                          <div>
                            <strong className="text-xl text-amber-800 dark:text-amber-400 block mb-1">Efetividade (O Impacto):</strong>
                            <p className="text-lg text-slate-700 dark:text-slate-300">
                              A <strong>Efetividade</strong> mede o impacto social ou institucional de longo prazo. Exemplo: A eficiência da refinaria é produzir gasolina com menor custo por barril; a eficácia é atingir a meta mensal de refino; a efetividade é garantir a soberania energética e o abastecimento contínuo do país.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <LuCheck className="text-emerald-600 mt-1 flex-shrink-0 w-6 h-6" />
                          <div>
                            <strong className="text-xl text-amber-800 dark:text-amber-400 block mb-1">Habilidade Humana em Todos os Níveis:</strong>
                            <p className="text-lg text-slate-700 dark:text-slate-300">
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
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Como Sociedade de Economia Mista sob controle da União, a Petrobras integra a Administração Pública Indireta. Isso cria um regime jurídico híbrido:
                      </p>
                      <AlertBox tipo="danger" titulo="Atenção à Dupla Natureza Jurídica">
                        <span className="text-lg">
                          Diferente de uma petroleira privada como a Shell, a Petrobras deve observar estritamente princípios constitucionais (Art. 37 da CF/88): Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência. No entanto, ela atua sob o regime de livre concorrência econômica (Art. 173 da CF), exigindo agilidade comercial. Conciliar a rigidez de uma estatal com a velocidade exigida pelo mercado de commodities petrolíferas é o maior desafio administrativo e de suprimentos de sua governança.
                        </span>
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
                <h4 className="font-bold text-foreground text-xl mb-3 flex items-center gap-2">
                  <LuFactory className="text-emerald-500" />
                  Decisões no Pré-Sal
                </h4>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A exploração em águas ultraprofundas é um teste de fogo de eficiência e eficácia: a construção de um navio-plataforma (FPSO) exige planejamento tático rigoroso de suprimentos para coordenar milhares de peças e garantir que a meta de primeiro óleo (eficácia) seja cumprida no menor custo operacional possível (eficiência).
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-foreground text-xl mb-3 flex items-center gap-2">
                  <LuUsers className="text-blue-500" />
                  Papéis de Ligação na Logística
                </h4>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Os profissionais de Suprimentos na Petrobras atuam fortemente no papel de ligação de Mintzberg, conectando a diretoria com parceiros internacionais de engenharia e prestadores de serviços de helicópteros e embarcações de apoio às plataformas.
                </p>
              </div>
            </div>
          </div>

                  {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={1}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[1]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Em um mercado altamente competitivo de suprimentos, uma empresa estabelece descontos progressivos e cartões de fidelidade baseados em pontos acumulados para incentivar a recompra por seus parceiros de negócios. De acordo com a literatura clássica de marketing de relacionamento, essa ação estratégica representa um laço de fidelidade baseado em aspectos:"
          alternativas={[
            { letra: "A", texto: "sociais", correta: false },
              { letra: "B", texto: "financeiros", correta: true },
              { letra: "C", texto: "estruturais", correta: false },
              { letra: "D", texto: "interativos", correta: false },
              { letra: "E", texto: "cognitivos", correta: false }
          ]}
          dicaEstrategica="Foque nas pegadinhas clássicas da CESGRANRIO envolvendo este assunto."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Os descontos progressivos e programas de pontos são incentivos puramente econômicos, classificando-se como laços de fidelidade de nível financeiro (nível 1 de Berry e Parasuraman)." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={1}
            variant={mv[1]}
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
              title: "Diretrizes Críticas de Fundamentos",
              content: (
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-6xl my-6 animate-pulse inline-block">🎯 🔍</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg">
                    <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center">
                      <p className="font-bold text-emerald-600 mb-1 text-xl">Habilidades de Katz</p>
                      <p className="text-base text-muted-foreground">Conceituais no topo estratégico, Técnicas na base operacional, e Humanas necessárias igualmente em todos os níveis organizacionais.</p>
                    </div>
                    <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-center">
                      <p className="font-bold text-cyan-600 mb-1 text-xl">Papéis de Mintzberg</p>
                      <p className="text-base text-muted-foreground">10 papéis divididos em decisórios, informacionais e interpessoais que descrevem o comportamento diário real do gestor.</p>
                    </div>
                    <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 text-center">
                      <p className="font-bold text-blue-600 mb-1 text-xl">Eficiência vs Eficácia</p>
                      <p className="text-base text-muted-foreground">Eficiência é o foco nos meios e menor consumo de recursos. Eficácia é o cumprimento das metas globais planejadas.</p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-xl border text-base space-y-2">
                    <p className="font-bold">💡 Dica Quente da CESGRANRIO:</p>
                    <p>• Não confunda: Dinheiro, salário ou benefício básico nunca gera motivação duradoura; apenas previne a insatisfação corporativa.</p>
                    <p>• O ruído semântico decorre unicamente de variações de repertórios linguísticos de diferentes departamentos.</p>
                  </div>
                </div>
              ),
            }}
            podcast={{
            aulaId: "administracaogeralsuprimento",
            aulaTitulo: "Administracao Geral Suprimento",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 1,
            moduloTitulo: "Módulo 1",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
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
            <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>O ciclo integrado das funções administrativas, consolidado pela sigla <strong>PODC</strong> (Planejamento, Organização, Direção e Controle), constitui o arcabouço metodológico sobre o qual se estrutura toda a atividade de gerenciar. Na banca CESGRANRIO, as questões comumente exigem do candidato a capacidade de mapear as atividades operacionais cotidianas dentro de cada um desses quatro pilares funcionais da administração clássica. O domínio destas divisões é vital para compreender como os objetivos abstratos da organização ganham corpo e execução.</p>
            <p>Em exames da CESGRANRIO, o domínio dos conceitos fundamentais é vital para o correto julgamento de questões complexas de múltipla escolha.</p>
            <p>O <strong>Planejamento</strong> é a função que define as metas de longo prazo da organização e os meios adequados para alcançá-las, projetando cenários futuros de forma a reduzir a incerteza do ambiente externo. A <strong>Organização</strong> é a função de estruturação dos recursos, responsável por dividir o trabalho, definir a hierarquia de cargos, agrupar as tarefas em departamentos, definir as linhas formais de autoridade e alocar o capital humano e físico disponível.</p>
            <p>A fundamentação teórica estabelece os parâmetros técnicos, de governança e de conformidade legal exigidos em auditorias.</p>
            <p>Para visualizar a interação prática dessas funções na cadeia logística, imagine o suprimento de sobressalentes para uma refinaria de petróleo. O <strong>Planejamento</strong> define a meta anual de estoque de contingência de válvulas de segurança. A <strong>Organização</strong> estrutura o armazém central, dividindo as tarefas de conferência entre os técnicos de suprimento de plantão e alocando empilhadeiras para a movimentação rápida de cargas.</p>
            <p>Como demonstração operacional clássica, a conformidade atua prevenindo desperdícios e desvios de processo no almoxarifado.</p>
            <p>As funções administrativas desdobram-se ao longo da pirâmide organizacional em níveis de abrangência bem delimitados. O Planejamento Estratégico, focado no longo prazo e na empresa como um todo, é conduzido pela diretoria executiva, enquanto o Planejamento Tático atua em médio prazo focando em departamentos isolados (como a diretoria de compras). O Planejamento Operacional, por sua vez, é detalhado no nível diário das tarefas executivas e operacionais.</p>
            <p>A análise aprofundada de exceções regulatórias exige documentação estrita de conformidade legal de todas as etapas de compras.</p>
            <p>A banca CESGRANRIO costuma elaborar pegadinhas trocando os verbos que caracterizam cada uma das funções administrativas. Afirmações que envolvem "liderar equipes", "motivar colaboradores" ou "coordenar esforços de pessoas" pertencem exclusivamente à função de <strong>Direção</strong>, embora a banca tente rotulá-las como Organização. Da mesma forma, associar a "definição de prioridades" ou a "alocação física de equipamentos" ao Planejamento é um erro comum, pois tratam-se de atividades de <strong>Organização</strong>.</p>
            <p>Na Petrobras, a rotina sob a égide da Lei das Estatais requer do Técnico rigor de compliance e transparência técnica em todos os processos.</p>
            
          </div>

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
              title="Aprofundamento Funcional do Ciclo Administrativo"
              description="Desdobramentos técnicos de cada função administrativa."
            />
            <ContentAccordion mode="stacked" slides={[
                {
                  titulo: "Conceituação: Ciclo Integrado de Planejamento e Controle",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        As funções administrativas representam um processo cíclico e sistêmico, onde o <strong>Planejamento</strong> e o <strong>Controle</strong> são considerados as duas faces da mesma moeda administrativa. Não é possível controlar sem um planejamento prévio que defina as metas (padrões), e um planejamento sem controle torna-se inútil por falta de acompanhamento.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="p-5 bg-muted rounded-lg border">
                          <h6 className="font-bold text-emerald-700 dark:text-emerald-400 text-xl mb-2">1. Desdobramento do Planejamento:</h6>
                          <ul className="list-disc pl-5 text-lg space-y-2">
                            <li><strong>Estratégico:</strong> Longo prazo, visão sistêmica, focado no topo da hierarquia, alto nível de incerteza.</li>
                            <li><strong>Tático:</strong> Médio prazo, focado em departamentos ou áreas específicas (como Suprimentos).</li>
                            <li><strong>Operacional:</strong> Curto prazo, detalhado no nível da execução diária das tarefas.</li>
                          </ul>
                        </div>
                        <div className="p-5 bg-muted rounded-lg border">
                          <h6 className="font-bold text-blue-700 dark:text-blue-400 text-xl mb-2">2. Etapas do Controle:</h6>
                          <ul className="list-disc pl-5 text-lg space-y-2">
                            <li><strong>Estabelecimento de Padrões:</strong> Definição de KPIs de custo, tempo, qualidade e quantidade.</li>
                            <li><strong>Medição do Desempenho:</strong> Coleta ativa de dados do andamento das operações de compras.</li>
                            <li><strong>Comparação:</strong> Contrastar o desempenho real com a meta/padrão pré-estabelecido.</li>
                            <li><strong>Ação Corretiva:</strong> Ajustar desvios e prevenir a reincorrência de ineficiências no processo.</li>
                          </ul>
                        </div>
                      </div>
                      <p className="mt-2 text-lg">
                        Na função de <strong>Organização</strong>, define-se a centralização (decisões no topo) ou descentralização (decisões delegadas), a amplitude de controle (número de subordinados por gerente) e a divisão de departamentos. Na função de <strong>Direção</strong>, aplicam-se estilos de liderança situacional para engajar a força de trabalho.
                      </p>
                    </div>
                  ),
                  icone: <LuBookOpen />,
                },
                {
                  titulo: "Exemplificação: Planejamento Estratégico, Tático e Operacional em Energia",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Observe a aplicação prática do desdobramento do planejamento na Petrobras:
                      </p>
                      <div className="bg-muted p-5 rounded-xl border border-border space-y-4 mt-4">
                        <div>
                          <strong className="text-xl text-teal-600 block mb-1">Estratégico (Longa Duração):</strong>
                          <p className="text-lg">
                            O Conselho Executivo aprova o investimento de US$ 10 bilhões na descarbonização das refinarias.
                          </p>
                        </div>
                        <div>
                          <strong className="text-xl text-cyan-600 block mb-1">Tático (Média Duração):</strong>
                          <p className="text-lg">
                            A gerência de suprimentos corporativa renegocia contratos de longo prazo com fornecedores de tecnologia ambiental.
                          </p>
                        </div>
                        <div>
                          <strong className="text-xl text-blue-600 block mb-1">Operacional (Curta Duração):</strong>
                          <p className="text-lg">
                            O técnico de suprimentos emite a ordem de recebimento físico para descarregar o novo catalisador na unidade de refino.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuBriefcase />,
                },
                {
                  titulo: "Dicas Táticas: A Tabela de Verbos das Funções Administrativas",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Para a prova da CESGRANRIO, memorize esta correspondência direta para evitar pegadinhas clássicas de troca de funções:
                      </p>
                      <div className="overflow-x-auto mt-4 font-sans text-lg">
                        <table className="w-full text-left border-collapse border border-border">
                          <thead>
                            <tr className="bg-muted">
                              <th className="p-3 border border-border font-bold">Função</th>
                              <th className="p-3 border border-border font-bold">Ações e Verbos Principais</th>
                              <th className="p-3 border border-border font-bold">Foco Crítico</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="p-3 font-bold border border-border text-emerald-600">Planejamento</td>
                              <td className="p-3 border border-border">Definir objetivos, prever cenários, traçar metas, programar atividades.</td>
                              <td className="p-3 border border-border">O futuro e as diretrizes estratégicas.</td>
                            </tr>
                            <tr>
                              <td className="p-3 font-bold border border-border text-teal-600">Organização</td>
                              <td className="p-3 border border-border">Alocar recursos, estruturar trabalho, dividir tarefas, desenhar cargos.</td>
                              <td className="p-3 border border-border">A estrutura e a hierarquia funcional.</td>
                            </tr>
                            <tr>
                              <td className="p-3 font-bold border border-border text-cyan-600">Direção</td>
                              <td className="p-3 border border-border">Liderar equipes, motivar trabalhadores, orientar tarefas, comunicar decisões.</td>
                              <td className="p-3 border border-border">A coordenação das pessoas e atitudes.</td>
                            </tr>
                            <tr>
                              <td className="p-3 font-bold border border-border text-blue-600">Controle</td>
                              <td className="p-3 border border-border">Monitorar desempenho, medir resultados, corrigir desvios, avaliar KPIs.</td>
                              <td className="p-3 border border-border">A conformidade e ações corretivas.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ),
                  icone: <LuAward />,
                },
                {
                  titulo: "Exceções e pontos de atenção: Controle Prévio, Simultâneo e Posterior",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        O controle organizacional não é executado apenas no final de cada processo ou trimestre de faturamento:
                      </p>
                      <AlertBox tipo="warning" titulo="Os Três Tipos de Controle Temporal">
                        <span className="text-lg">
                          1. <strong>Prévio (Preventivo):</strong> Realizado antes da atividade iniciar. Exemplo: A exigência de atestados e garantias financeiras no edital de licitação da Petrobras.<br />
                          2. <strong>Simultâneo (Concorrente):</strong> Realizado durante o andamento da tarefa. Exemplo: A fiscalização diária exercida pelo engenheiro sobre a montagem física da tubulação na refinaria.<br />
                          3. <strong>Posterior (Feedback):</strong> Realizado após o encerramento da tarefa. Exemplo: O relatório final de auditoria que apura o custo total do contrato de compras.
                        </span>
                      </AlertBox>
                    </div>
                  ),
                  icone: <LuTriangleAlert />,
                },
              ]}
            />
          </div>

                  {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[2]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="O planejamento estratégico, tático e operacional diferem principalmente em qual aspecto?"
          alternativas={[
            { letra: "A", texto: "Pela área funcional que cada um cobre (RH, Finanças, Operações)", correta: false },
              { letra: "B", texto: "Pelo horizonte temporal e nível hierárquico: longo prazo/alta direção, médio/média gerência, curto/operacional", correta: true },
              { letra: "C", texto: "Pelo grau de formalidade exigido pela legislação vigente", correta: false },
              { letra: "D", texto: "Pelo número de pessoas envolvidas no processo de decisão", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
          ]}
          dicaEstrategica="Planejamento operacional: curto prazo (dias/meses), nível operacional, define tarefas específicas."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Planejamento estratégico: longo prazo (3-5+ anos), alta direção, define missão/visão/objetivos macro." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Planejamento tático: médio prazo (1-2 anos), gerência média, define planos por área." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={2}
            variant={mv[2]}
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
              title: "Diretrizes Críticas de PODC",
              content: (
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-6xl my-6 animate-pulse inline-block">⚙️ 🔄</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                    <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                      <p className="font-bold text-emerald-600 mb-1 text-xl">Planejamento & Controle</p>
                      <p className="text-base text-muted-foreground">Duas faces da mesma moeda. Planejamento define as metas (padrões); Controle mede desvios e executa correções.</p>
                    </div>
                    <div className="p-4 bg-teal-500/10 rounded-xl border border-teal-500/20">
                      <p className="font-bold text-teal-600 mb-1 text-xl">Organização & Direção</p>
                      <p className="text-base text-muted-foreground">Organização foca em alocar recursos de forma estrutural; Direção lida diretamente com a liderança e motivação de pessoas.</p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-xl border text-base space-y-2">
                    <p className="font-bold">💡 Dica Quente da CESGRANRIO:</p>
                    <p>• O controle preventivo atua antes do processo começar (ex: qualificação de fornecedores).</p>
                    <p>• As habilidades conceituais são prioritárias para a função de Planejamento Estratégico global.</p>
                  </div>
                </div>
              ),
            }}
            podcast={{
            aulaId: "administracaogeralsuprimento",
            aulaTitulo: "Administracao Geral Suprimento",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 2,
            moduloTitulo: "Módulo 2",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
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
            <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>A definição da estrutura organizacional constitui uma das decisões de design corporativo mais estratégicas a serem tomadas pelo topo decisório estratégico. Nos concursos públicos da Petrobras elaborados pela banca CESGRANRIO, as estruturas organizacionais são exploradas tanto em suas definições clássicas e burocráticas quanto em seus desdobramentos flexíveis e modernos. Compreender como os cargos, as linhas de autoridade e a comunicação horizontal são desenhados é essencial para gabaritar a disciplina.</p>
            <p>Em exames da CESGRANRIO, o domínio dos conceitos fundamentais é vital para o correto julgamento de questões complexas de múltipla escolha.</p>
            <p>A departamentalização expressa o critério utilizado para agrupar tarefas semelhantes em unidades organizacionais específicas. Entre as modelagens tradicionais, destaca-se a <strong>estrutura funcional</strong> (agrupamento baseado em especialidades profissionais, como engenharia ou compras) e a <strong>estrutura divisional</strong> (agrupamento baseado em produtos, serviços ou divisões territoriais semiautônomas).</p>
            <p>A fundamentação teórica estabelece os parâmetros técnicos, de governança e de conformidade legal exigidos em auditorias.</p>
            <p>Para visualizar esses conceitos em um cenário de compras, considere a implantação de uma nova sonda de perfuração marítima de alta profundidade. Sob o regime de uma <strong>estrutura puramente funcional</strong>, o analista de compras dependeria de submeter relatórios técnicos a diversos chefes de engenharia de materiais de diferentes divisões verticais antes de emitir a nota fiscal, gerando lentidão extrema e burocracia por conta de silos comunicativos.</p>
            <p>Como demonstração operacional clássica, a conformidade atua prevenindo desperdícios e desvios de processo no almoxarifado.</p>
            <p>A amplitude de controle refere-se de forma direta ao número de subordinados que um único gerente ou supervisor consegue comandar de forma eficiente. Estruturas organizacionais caracterizadas por uma amplitude de controle reduzida (poucos subordinados por chefe) tendem a apresentar um desenho verticalizado (alto), com múltiplos níveis hierárquicos, gerando custos elevados de coordenação de cargos e lentidão nos fluxos comunicativos corporativos.</p>
            <p>A análise aprofundada de exceções regulatórias exige documentação estrita de conformidade legal de todas as etapas de compras.</p>
            <p>Nas avaliações objetivas da CESGRANRIO, a estrutura matricial é frequentemente rotulada por sua principal característica de design: a <strong>quebra planejada do princípio Fayolista de unidade de comando</strong>. Questões costumam propor cenários onde colaboradores lidam com a dupla subordinação hierárquica e demandam do gestor habilidades humanas avançadas de mediação de atritos. A banca também gosta de associar a estrutura em rede a empresas virtuais focadas unicamente em core business com terceirização extrema.</p>
            <p>Na Petrobras, a rotina sob a égide da Lei das Estatais requer do Técnico rigor de compliance e transparência técnica em todos os processos.</p>
            
          </div>

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
                  corFundo: "bg-blue-500/10",
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
              title="Modelagem e Análise do Design Organizacional"
              description="Análise profunda de cada modelo estrutural."
            />
            <ContentAccordion mode="stacked" slides={[
                {
                  titulo: "Conceituação: Comparação Crítica e Departamentalização",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A estruturação de uma organização envolve decidir como as tarefas serão divididas, agrupadas e coordenadas. Esse agrupamento é chamado de <strong>Departamentalização</strong>. A CESGRANRIO cobra maciçamente as distinções clássicas entre os tipos de estrutura, especialmente a quebra de paradigmas dos modelos contemporâneos:
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-lg">
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
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A Petrobras é uma corporação complexa de dimensões gigantescas. Sua estrutura combina características <strong>Divisionais</strong> e <strong>Matriciais</strong>:
                      </p>
                      <div className="bg-muted p-5 rounded-xl border border-border mt-4">
                        <span className="font-bold text-xl text-emerald-800 dark:text-emerald-400 block mb-2">Estrutura Divisional e Matricial Petrobras</span>
                        <ul className="list-disc pl-5 space-y-2 text-lg">
                          <li>
                            <strong>Divisões Semiautônomas (Segmentos de Negócio):</strong> A holding organiza-se em torno de diretorias finalísticas focadas na cadeia produtiva do petróleo: Exploração e Produção (Upstream), Refino, Transporte e Comercialização (Downstream), Transição Energética e Sustentabilidade.
                          </li>
                          <li>
                            <strong>Matriz de Funções Corporativas:</strong> Setores transversais como a Diretoria Financeira, Jurídico, Recursos Humanos e a própria estrutura corporativa de Suprimentos atuam de forma matricial, prestando serviços e exercendo governança e controle sobre todas as divisões operacionais de forma integrada.
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
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Memorize este quadro técnico para resolver de forma rápida e segura as questões clássicas da banca sobre vantagens e desvantagens de cada tipo de estrutura:
                      </p>
                      <div className="overflow-x-auto mt-4 font-sans text-lg">
                        <table className="w-full text-left border-collapse border border-border">
                          <thead>
                            <tr className="bg-muted">
                              <th className="p-2 border border-border font-bold">Tipo</th>
                              <th className="p-2 border border-border font-bold">Vantagens Principais</th>
                              <th className="p-2 border border-border font-bold">Desvantagens Principais</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="p-2 font-bold border border-border text-cyan-600">Funcional</td>
                              <td className="p-2 border border-border">Especialização técnica, alta clareza de carreira, economias de escala intra-departamentais.</td>
                              <td className="p-2 border border-border">Isolamento entre áreas (silos), lentidão nas decisões interdepartamentais, perda da visão sistêmica.</td>
                            </tr>
                            <tr>
                              <td className="p-2 font-bold border border-border text-cyan-600">Divisional</td>
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
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        O princípio clássico de Henri Fayol ditava a **unidade de comando**: cada trabalhador deve receber ordens de apenas um único supervisor direto para evitar atritos e direções conflitantes.
                      </p>
                      <AlertBox tipo="warning" titulo="A Quebra da Unidade de Comando na Matricial">
                        <span className="text-lg">
                          Nas provas, a banca costuma classificar a estrutura **Matricial** especificamente por sua quebra voluntária da unidade de comando. A coexistência de uma autoridade funcional (eixo vertical) e uma autoridade de projeto (eixo horizontal) exige habilidades gerenciais maduras de negociação para que os conflitos intrínsecos de prioridades e alocações de recursos humanos não levem ao colapso operacional da equipe.
                        </span>
                      </AlertBox>
                    </div>
                  ),
                  icone: <LuTriangleAlert />,
                },
              ]}
            />
          </div>

                  {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={3}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[3]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A estrutura organizacional funcional organiza a empresa principalmente por:"
          alternativas={[
            { letra: "A", texto: "Produtos ou linhas de negócio distintas", correta: false },
              { letra: "B", texto: "Regiões geográficas de atuação da empresa", correta: false },
              { letra: "C", texto: "Funções ou especialidades (RH, Finanças, Operações, Marketing)", correta: true },
              { letra: "D", texto: "Projetos temporários com times multidisciplinares", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
          ]}
          dicaEstrategica="Desvantagem: silos funcionais e comunicação lateral difícil."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Na estrutura funcional, departamentos são organizados por especialidade: RH, Finanças, Marketing, Operações etc." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "É a mais comum em empresas tradicionais." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Vantagem: especialização e economia de escala." }
          ]}
        />

        <ModuleConsolidation
            index={3}
            variant={mv[3]}
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
              title: "Diretrizes Críticas de Estruturas",
              content: (
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-6xl my-6 animate-pulse inline-block">🏢 🔗</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                    <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                      <p className="font-bold text-cyan-600 mb-1 text-xl">Estrutura Funcional</p>
                      <p className="text-base text-muted-foreground">Foco na especialização técnica interna por departamentos (RH, TI, Compras). Desenvolve excelência técnica, mas cria barreiras de comunicação horizontais.</p>
                    </div>
                    <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                      <p className="font-bold text-emerald-600 mb-1 text-xl">Estrutura Matricial</p>
                      <p className="text-base text-muted-foreground">Sobreposição de departamentos funcionais e gerência de projetos. Exige dupla subordinação hierárquica e quebra a unidade de comando de Fayol.</p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-xl border text-base space-y-2">
                    <p className="font-bold">💡 Dica Quente da CESGRANRIO:</p>
                    <p>• A estrutura divisional duplica recursos corporativos desnecessariamente, mas foca no mercado ou no cliente final.</p>
                    <p>• A amplitude de controle estreita verticaliza a hierarquia, aumentando a cadeia de comando da estatal.</p>
                  </div>
                </div>
              ),
            }}
            podcast={{
            aulaId: "administracaogeralsuprimento",
            aulaTitulo: "Administracao Geral Suprimento",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 3,
            moduloTitulo: "Módulo 3",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
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
            <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>O comportamento organizacional atua como o pilar integrador que estuda o impacto de indivíduos, grupos e da cultura sobre o desempenho funcional das corporações. Nas provas elaboradas pela banca CESGRANRIO, os fatores psicossociais não são avaliados sob viés clínico, mas sim associados a resultados de engajamento operacional, estilos gerenciais e atitudes de liderança situacional. Compreender esses mecanismos comportamentais é indispensável para gabaritar a prova.</p>
            <p>Em exames da CESGRANRIO, o domínio dos conceitos fundamentais é vital para o correto julgamento de questões complexas de múltipla escolha.</p>
            <p>No centro dos estudos comportamentais encontram-se as <strong>teorias de motivação</strong>, tradicionalmente divididas em teorias de conteúdo (focadas em mapear as necessidades internas que orientam as ações, como Maslow e Herzberg) e teorias de processo (focadas em decodificar como a motivação se desenvolve e se mantém, como a teoria da expectativa de Victor Vroom). A motivação é compreendida como a força e a direção que orientam o esforço individual rumo às metas.</p>
            <p>A fundamentação teórica estabelece os parâmetros técnicos, de governança e de conformidade legal exigidos em auditorias.</p>
            <p>Para visualizar a dinâmica desses conceitos na prática, considere o aumento emergencial da meta de expedição de sobressalentes em uma base de apoio offshore. Sob a ótica da **teoria dos dois fatores de Frederick Herzberg**, se o supervisor operacional aumentar em 20% o valor do salário básico (fator higiênico), ele apenas conseguirá evitar a insatisfação imediata e prevenir reclamações formais da equipe, mas não gerará motivação ativa de longo prazo.</p>
            <p>Como demonstração operacional clássica, a conformidade atua prevenindo desperdícios e desvios de processo no almoxarifado.</p>
            <p>Os estudos de comportamento avançam para a compreensão da cultura organizacional, entendida como o conjunto de valores compartilhados, crenças internas, ritos formais e normas que determinam como os membros atuam e resolvem problemas. A cultura constitui a identidade duradoura da empresa, ditando regras não escritas de conduta social. O clima organizacional, diferentemente da cultura, expressa a percepção temporária das pessoas sobre o ambiente de trabalho.</p>
            <p>A análise aprofundada de exceções regulatórias exige documentação estrita de conformidade legal de todas as etapas de compras.</p>
            <p>A banca CESGRANRIO adora explorar as armadilhas conceituais da teoria de Herzberg, tentando classificar o salário e os benefícios sociais básicos como fatores motivadores, quando na verdade constituem **fatores higiênicos (extrínsecos)** que apenas previnem a insatisfação. A banca também costuma propor cenários práticos envolvendo a teoria de liderança situacional de Hersey e Blanchard, exigindo que o candidato associe a baixa maturidade técnica da equipe ao estilo diretivo ou direcionador.</p>
            <p>Na Petrobras, a rotina sob a égide da Lei das Estatais requer do Técnico rigor de compliance e transparência técnica em todos os processos.</p>
            
          </div>

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
              title="Vetores da Dinâmica Humana nas Organizações"
              description="Aprofundamento em conceitos de comportamento organizacional."
            />
            <ContentAccordion mode="stacked" slides={[
                {
                  titulo: "Conceituação: Teorias de Motivação (Conteúdo vs. Processo)",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A motivação é um estado interno que conduz o comportamento. A literatura divide as teorias motivacionais em dois grandes blocos, cuja diferenciação é exigida de forma recorrente em concursos:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="p-5 bg-muted rounded-lg border">
                          <h6 className="font-bold text-rose-700 dark:text-rose-400 text-xl mb-2">Teorias de Conteúdo (O QUE motiva):</h6>
                          <p className="text-base text-muted-foreground mb-2">Identificam as necessidades internas das pessoas.</p>
                          <ul className="list-disc pl-5 text-lg space-y-2">
                            <li><strong>Maslow (Hierarquia):</strong> Necessidades fisiológicas, segurança, sociais, estima, autorrealização (as inferiores devem ser satisfeitas primeiro).</li>
                            <li><strong>Herzberg (Dois Fatores):</strong> Fatores Higiênicos (evitam insatisfação, mas não motivam - ex: salário, estrutura física) vs. Fatores Motivadores (geram real motivação - ex: trabalho desafiador, crescimento).</li>
                            <li><strong>McClelland:</strong> Três necessidades dominantes adquiridas socialmente: Realização, Afiliação e Poder.</li>
                          </ul>
                        </div>
                        <div className="p-5 bg-muted rounded-lg border">
                          <h6 className="font-bold text-pink-700 dark:text-pink-400 text-xl mb-2">Teorias de Processo (COMO motiva):</h6>
                          <p className="text-base text-muted-foreground mb-2">Explicam como o comportamento se inicia e é mantido.</p>
                          <ul className="list-disc pl-5 text-lg space-y-2">
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
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A teoria de **Liderança Situacional de Hersey e Blanchard** defende que não existe um estilo único e correto de liderança. O estilo deve se adaptar à maturidade e competência dos liderados:
                      </p>
                      <div className="bg-muted p-5 rounded-xl border border-border space-y-4 mt-4 text-lg">
                        <p>
                          Imagine duas equipes diferentes sob gestão do Técnico de Suprimentos Sênior na Petrobras:
                        </p>
                        <div className="flex gap-2 items-start">
                          <LuChevronRight className="mt-1 text-emerald-600 flex-shrink-0 w-6 h-6" />
                          <p>
                            <strong>Cenário A (Equipe de Recém-Admitidos):</strong> Sem conhecimento prático das normas da Lei 13.303. O líder deve aplicar o estilo <strong>Direcionador (M1)</strong>, fornecendo instruções claras e supervisionando rigidamente a elaboração técnica de cada edital.
                          </p>
                        </div>
                        <div className="flex gap-2 items-start">
                          <LuChevronRight className="mt-1 text-emerald-600 flex-shrink-0 w-6 h-6" />
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
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        O Fator Higiênico de Frederick Herzberg é o maior alvo de pegadinhas das provas de Comportamento Organizacional. Cuidado extremo com a seguinte lógica:
                      </p>
                      <AlertBox tipo="info" titulo="O Paradoxo dos Fatores Higiênicos">
                        <span className="text-lg">
                          Nas provas, a banca costuma dizer que "para motivar os trabalhadores, a empresa aumentou o salário básico ou comprou cadeiras ergonômicas". **Isso é incorreto sob a teoria de Herzberg.** Salário, benefícios, políticas da empresa, segurança no trabalho e infraestrutura física são **Fatores Higiênicos** (extrínsecos). Sua presença apenas previne a insatisfação, mas **não gera motivação ativa**. A motivação real só é obtida por **Fatores Motivacionais** (intrínsecos), como reconhecimento profissional, delegação de responsabilidades desafiadoras e perspectiva de crescimento na carreira.
                        </span>
                      </AlertBox>
                    </div>
                  ),
                  icone: <LuAward />,
                },
                {
                  titulo: "Exceções e pontos de atenção: A Disfunção da Cultura de Segurança",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Na Petrobras, a Cultura Organizacional é ancorada no valor inegociável da **Segurança e SMS** (Saúde, Meio Ambiente e Segurança). No entanto, toda cultura forte possui potenciais pontos de atenção secundárias:
                      </p>
                      <AlertBox tipo="danger" titulo="Alerta de Rigidez Cultural">
                        <span className="text-lg">
                          Uma cultura de conformidade extrema com a segurança pode, se não for bem administrada pelo comportamento de liderança, criar um clima de aversão total ao risco em processos de suprimento, onde a inovação é tolhida pelo receio de desviar de ritos analógicos tradicionais, tornando o processo de contratação excessivamente burocrático e lento. O equilíbrio exige uma liderança que estimule a segurança sem matar a inovação no processo de suprimento.
                        </span>
                      </AlertBox>
                    </div>
                  ),
                  icone: <LuTriangleAlert />,
                },
              ]}
            />
          </div>

                  {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={4}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[4]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A Pirâmide de Maslow hierarquiza necessidades humanas. Qual é a ordem correta da base ao topo?"
          alternativas={[
            { letra: "A", texto: "Estima → Segurança → Fisiológicas → Social → Autorrealização", correta: false },
              { letra: "B", texto: "Fisiológicas → Segurança → Social (pertencimento) → Estima → Autorrealização", correta: true },
              { letra: "C", texto: "Autorrealização → Estima → Social → Segurança → Fisiológicas", correta: false },
              { letra: "D", texto: "Social → Fisiológicas → Estima → Segurança → Autorrealização", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
          ]}
          dicaEstrategica="Necessidades inferiores devem ser minimamente atendidas antes das superiores."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Maslow: base (mais urgente) = Fisiológicas (alimento, abrigo) → Segurança (emprego, estabilidade) → Social (pertencimento, amizades) → Estima (reconhecimento, status) → Autorrealização (realização do potencial)." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={4}
            variant={mv[4]}
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
              title: "Diretrizes Críticas de Comportamento",
              content: (
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-6xl my-6 animate-pulse inline-block">💡 🤝</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg">
                    <div className="p-4 bg-rose-500/10 rounded-xl border border-rose-500/20 text-center">
                      <p className="font-bold text-rose-600 mb-1 text-xl">Dois Fatores</p>
                      <p className="text-base text-muted-foreground">Fatores higiênicos (salário, infraestrutura) apenas evitam insatisfação. Fatores motivadores (reconhecimento, desafio) geram satisfação ativa.</p>
                    </div>
                    <div className="p-4 bg-pink-500/10 rounded-xl border border-pink-500/20 text-center">
                      <p className="font-bold text-pink-600 mb-1 text-xl">Liderança Situacional</p>
                      <p className="text-base text-muted-foreground">O líder deve modular seu estilo de gestão (Direcionar, Apoiar, Delegar) conforme o grau de competência técnica e maturidade do liderado.</p>
                    </div>
                    <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20 text-center">
                      <p className="font-bold text-red-600 mb-1 text-xl">Cultura vs Clima</p>
                      <p className="text-base text-muted-foreground">Cultura expressa a identidade profunda e valores compartilhados históricos; Clima expressa a percepção passageira imediata do time.</p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-xl border text-base space-y-2">
                    <p className="font-bold">💡 Dica Quente da CESGRANRIO:</p>
                    <p>• A teoria da expectativa de Vroom afirma que a motivação baseia-se na valência, instrumentalidade e expectativa individual.</p>
                    <p>• Herzberg estabelece de forma clara que a satisfação e a insatisfação organizacionais constituem dimensões totalmente independentes.</p>
                  </div>
                </div>
              ),
            }}
            podcast={{
            aulaId: "administracaogeralsuprimento",
            aulaTitulo: "Administracao Geral Suprimento",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 4,
            moduloTitulo: "Módulo 4",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
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
            descricao="Aprenda a mapear, analisar e otimizar processos de negócios corporativos, promovendo a integração horizontal e eliminando gargalos."
            variant={mv[5]}
          />

          <div className="space-y-6">
            <ModuleSectionHeader
              index="INTRO"
              variant={mv[5]}
              title="Dossiê de Gestão de Processos BPM"
              description="A quebra de silos e o gerenciamento horizontal voltado à entrega de valor."
            />
            <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>A gestão de processos de negócio, amplamente referida pela sigla <strong>BPM</strong> (Business Process Management), expressa um marco estrutural no desenho das organizações modernas. Nos concursos promovidos pela Petrobras sob a coordenação da banca CESGRANRIO, a gestão por processos é avaliada sob a ótica da quebra de barreiras departamentais e da modelagem de fluxogramas funcionais baseados na notação padrão BPMN. Dominar este tema habilita o candidato a resolver questões complexas de otimização integrada.</p>
            <p>Em exames da CESGRANRIO, o domínio dos conceitos fundamentais é vital para o correto julgamento de questões complexas de múltipla escolha.</p>
            <p>Os processos organizacionais são divididos pela literatura clássica de BPM em três categorias funcionais integradas: <strong>processos primários</strong> (ou finalísticos, que tocam e geram valor direto ao cliente externo), <strong>processos de suporte</strong> (ou de apoio, que fornecem recursos internos para viabilizar os primários, como a área de TI ou suprimentos) e <strong>processos gerenciais</strong> (focados no controle de metas e governança).</p>
            <p>A fundamentação teórica estabelece os parâmetros técnicos, de governança e de conformidade legal exigidos em auditorias.</p>
            <p>Para visualizar a dinâmica desses conceitos na aquisição de materiais, considere o processo de requisição de tubulações especiais. No mapeamento <strong>As-Is</strong>, identifica-se que o processo passa por três validações manuais redundantes de engenharia em diferentes bases operacionais, gerando um tempo de fila de 25 dias e atrasando a compra.</p>
            <p>Como demonstração operacional clássica, a conformidade atua prevenindo desperdícios e desvios de processo no almoxarifado.</p>
            <p>Para otimizar o fluxo de um processo de compras, a administração deve identificar e contornar os gargalos operacionais (bottlenecks), definidos como a atividade de menor capacidade de processamento que limita a vazão e a velocidade de todo o circuito de tarefas. A melhoria contínua dos processos pode ser conduzida por meio da metodologia **Kaizen** (mudanças graduais, de baixo custo e incrementais executadas de forma colaborativa).</p>
            <p>A análise aprofundada de exceções regulatórias exige documentação estrita de conformidade legal de todas as etapas de compras.</p>
            <p>A banca CESGRANRIO costuma induzir o candidato ao erro ao confundir a terminologia de gerenciar <strong>OS</strong> processos (atividade de rotina e controle de métricas tradicionais) com gerenciar <strong>POR</strong> processos (reestruturação radical da cultura da empresa para que a hierarquia formal perca força em relação à fluidez horizontal do valor). A banca também cobra a classificação de compras e suprimentos como um clássico processo de **suporte**, pois apoia a atividade-fim de refino e exploração de petróleo.</p>
            <p>Na Petrobras, a rotina sob a égide da Lei das Estatais requer do Técnico rigor de compliance e transparência técnica em todos os processos.</p>
            
          </div>

            <CardCarousel
              cards={[
                {
                  titulo: "Processos Primários",
                  descricao: "Processos finalísticos de ponta a ponta que geram valor diretamente para o cliente externo da organização (ex: Produção e Refino de Combustíveis).",
                  icone: <LuFactory />,
                  corFundo: "bg-emerald-500/10",
                },
                {
                  titulo: "Processos de Suporte",
                  descricao: "Processos transversais que garantem os recursos necessários para a execução das atividades finalísticas (ex: Tecnologia da Informação, Suprimentos).",
                  icone: <LuBuilding />,
                  corFundo: "bg-teal-500/10",
                },
                {
                  titulo: "BPMN e Modelagem",
                  descricao: "Notaçao gráfica padrão para modelar fluxos de processos de forma visual. Divide-se em pools (piscinas), raias (responsabilidades) e gateways (decisão).",
                  icone: <LuNetwork />,
                  corFundo: "bg-cyan-500/10",
                },
                {
                  titulo: "As-Is e To-Be",
                  descricao: "As-Is: Mapeamento detalhado da situação operacional real no presente. To-Be: Modelagem desenhada para o estado ideal futuro otimizado.",
                  icone: <LuActivity />,
                  corFundo: "bg-blue-500/10",
                },
              ]}
            />
          </div>

          <div className="space-y-6">
            <ModuleSectionHeader
              index={2}
              variant={mv[5]}
              title="Metodologia e Ciclos de Melhoria BPM"
              description="Estruturação, mapeamento e modelagem horizontal de fluxos de valor."
            />
            <ContentAccordion mode="stacked" slides={[
                {
                  titulo: "Conceituação: O Ciclo BPM e a Notação Gráfica BPMN",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A modelagem de processos permite visualizar a sequência de atividades de ponta a ponta. A notação gráfica padrão mundial é o <strong>BPMN (Business Process Model and Notation)</strong>, composto por elementos bem definidos:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        <div className="p-5 bg-card border rounded-lg">
                          <strong className="text-xl text-teal-600 block mb-2">Pools e Lanes:</strong>
                          <p className="text-lg">
                            A Piscina (Pool) representa o processo organizacional como um todo. As Raias (Lanes) subdividem a piscina para identificar quem executa cada tarefa específica (departamentos ou cargos).
                          </p>
                        </div>
                        <div className="p-5 bg-card border rounded-lg">
                          <strong className="text-xl text-cyan-600 block mb-2">Gateways (Decisão):</strong>
                          <p className="text-lg">
                            Losangos que indicam pontos de desvio no fluxo (decisões). Podem ser exclusivos (uma única rota), paralelos (rotas simultâneas) ou inclusivos (múltiplas rotas condicionais).
                          </p>
                        </div>
                        <div className="p-5 bg-card border rounded-lg">
                          <strong className="text-xl text-blue-600 block mb-2">Eventos e Atividades:</strong>
                          <p className="text-lg">
                            Círculos indicam o início, intermediários e fim do processo. Retângulos com cantos arredondados representam tarefas físicas ou lógicas executadas pelos agentes.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuBookOpen />,
                },
                {
                  titulo: "Exemplificação: O Fluxo de Compras (Procure-to-Pay) na Petrobras",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        No Procure-to-Pay da Petrobras, o processo transita de forma contínua através das raias do fluxograma corporativo:
                      </p>
                      <div className="bg-muted p-5 rounded-xl border border-border mt-4 text-lg space-y-3">
                        <p>1. <strong>Raia de Operações (Macaé):</strong> O técnico de suprimentos identifica que o estoque de brocas especiais de perfuração atingiu o ponto de ressuprimento no SAP.</p>
                        <p>2. <strong>Raia de Suprimentos (Rio de Janeiro):</strong> O analista de licitações publica o edital no Petronect conforme as exigências e ritos da Lei 13.303.</p>
                        <p>3. <strong>Raia Financeira:</strong> A auditoria interna valida a regularidade fiscal do fornecedor vencedor e emite a ordem de pagamento integrada.</p>
                        <p>A otimização integrada dessas interfaces elimina gargalos operacionais e evita paradas de sondas de perfuração.</p>
                      </div>
                    </div>
                  ),
                  icone: <LuBriefcase />,
                },
                {
                  titulo: "Dicas Táticas: Melhoria Contínua (Kaizen) vs. Reengenharia Radical",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A CESGRANRIO adora cobrar a diferenciação clássica de metodologias de aprimoramento de processos de negócio:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
                          <h6 className="font-bold text-xl text-emerald-800 dark:text-emerald-400 mb-2">Kaizen (Melhoria Incremental):</h6>
                          <p className="text-lg">
                            Evolução gradual, contínua e de baixo custo financeiro. Parte da premissa de eliminar desperdícios a partir da participação ativa e colaborativa de todos os colaboradores da base fabril (baixo risco).
                          </p>
                        </div>
                        <div className="p-5 bg-rose-500/5 border border-rose-500/20 rounded-lg">
                          <h6 className="font-bold text-xl text-rose-800 dark:text-rose-400 mb-2">Reengenharia (Mudança Radical):</h6>
                          <p className="text-lg">
                            Descarte completo e absoluto do processo existente. Reconstrução radical do zero ("folha em branco"), redesenhando fluxos apoiados em novas tecnologias (alto custo, risco e impacto gerencial).
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuAward />,
                },
                {
                  titulo: "Exceções e pontos de atenção: O Perigo da Otimização Localizada",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Um erro clássico de modeladores inexperientes é tentar melhorar de forma isolada a eficiência de uma única raia departamental:
                      </p>
                      <AlertBox tipo="danger" titulo="A Armadilha dos Subprocessos Isolados">
                        <span className="text-lg">
                          Apressar o tempo de triagem física de notas no almoxarifado em 50% de nada adiantará se a raia de auditoria jurídica central estiver sobrecarregada, acumulando processos de homologação. O gargalo continuará limitando a velocidade de entrega total da cadeia de compras. A visão de BPM deve abranger o processo de ponta a ponta, de forma que as melhorias locais não gerem excesso de estoque intermediário por descompasso de capacidade.
                        </span>
                      </AlertBox>
                    </div>
                  ),
                  icone: <LuTriangleAlert />,
                },
              ]}
            />
          </div>

                  {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={5}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[5]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="O ciclo PDCA (Plan-Do-Check-Act) é uma ferramenta de melhoria contínua. O que representa a fase 'Check'?"
          alternativas={[
            { letra: "A", texto: "Definir objetivos, metas e o plano de ação para a melhoria", correta: false },
              { letra: "B", texto: "Implementar o plano definido na fase anterior em escala piloto", correta: false },
              { letra: "C", texto: "Verificar e analisar os resultados obtidos, comparando com o planejado e identificando desvios", correta: true },
              { letra: "D", texto: "Padronizar as melhorias confirmadas e corrigir o plano se necessário", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
          ]}
          dicaEstrategica="O ciclo recomeça continuamente."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "PDCA: Plan (planejar: definir objetivo e como alcançar) → Do (executar: implementar o plano) → Check (verificar: medir resultados e comparar com metas) → Act (agir: padronizar se funcionou, ou corrigir e replanejar se não)." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa C como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={5}
            variant={mv[5]}
            resumoVisual={{
              moduloNome: "Módulo 5",
              tituloAula: "Administração Geral",
              materia: "Administração",
              images: [
                {
                  title: "Mapeamento As-Is e To-Be",
                  type: "Fluxograma BPMN",
                  placeholderColor: "bg-teal-500/20",
                },
              ],
            }}
            sinteseEstrategica={{
              title: "Diretrizes Críticas de Processos",
              content: (
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-6xl my-6 animate-pulse inline-block">⚙️ 🔄</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg">
                    <div className="p-4 bg-teal-500/10 rounded-xl border border-teal-500/20 text-center">
                      <p className="font-bold text-teal-600 mb-1 text-xl">Mapeamento As-Is</p>
                      <p className="text-base text-muted-foreground">Documentar a realidade real atual de como os processos rodam no dia a dia da plataforma para identificar ineficiências.</p>
                    </div>
                    <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-center">
                      <p className="font-bold text-cyan-600 mb-1 text-xl">Redesenho To-Be</p>
                      <p className="text-base text-muted-foreground">Modelagem ideal desenhada para o futuro, livre de trâmites redundantes e papéis lentos.</p>
                    </div>
                    <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 text-center">
                      <p className="font-bold text-blue-600 mb-1 text-xl">Kaizen vs Reengenharia</p>
                      <p className="text-base text-muted-foreground">Kaizen propõe evolução contínua incremental e barata. Reengenharia propõe quebra radical e recomeço do zero.</p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-xl border text-base space-y-2">
                    <p className="font-bold">💡 Dica Quente da CESGRANRIO:</p>
                    <p>• Suprimentos e almoxarifado classificam-se como processos de suporte, fornecendo recursos à atividade-fim.</p>
                    <p>• Pools indicam a organização; Lanes subdividem responsabilidades hierárquicas no fluxograma.</p>
                  </div>
                </div>
              ),
            }}
            podcast={{
            aulaId: "administracaogeralsuprimento",
            aulaTitulo: "Administracao Geral Suprimento",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 5,
            moduloTitulo: "Módulo 5",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
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
            <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>A evolução histórica das teorias administrativas constitui o pilar científico básico sobre o qual se assenta toda a moderna gestão das corporações complexas. Nos exames aplicados pela banca CESGRANRIO para o nível superior, a compreensão cronológica e o foco estratégico de cada escola de pensamento são avaliados recorrentemente por meio de questões conceituais profundas. O domínio dessas teorias é a chave fundamental para evitar confusões e armadilhas estruturais na prova.</p>
            <p>Em exames da CESGRANRIO, o domínio dos conceitos fundamentais é vital para o correto julgamento de questões complexas de múltipla escolha.</p>
            <p>A <strong>Administração Científica</strong> (Taylor) iniciou a era clássica focando na eficiência das tarefas operacionais do chão de fábrica, otimizando tempos, movimentos e recursos com base na Organização Racional do Trabalho (ORT). Simultaneamente, a <strong>Teoria Clássica</strong> (Fayol) desenhou os princípios formais da gerência a partir da estrutura global, definindo a cadeia de comando linear e as funções originais do administrador.</p>
            <p>A fundamentação teórica estabelece os parâmetros técnicos, de governança e de conformidade legal exigidos em auditorias.</p>
            <p>Para visualizar a coexistência prática dessas escolas em uma estatal de energia, considere o gerenciamento de refino de petróleo. Nas unidades operacionais de destilação de derivados da Petrobras, aplicam-se a impessoalidade weberiana e os princípios de Taylor para cronometrar a eficiência física do refino e garantir a conformidade documental das licitações (Burocracia Racional-Legal).</p>
            <p>Como demonstração operacional clássica, a conformidade atua prevenindo desperdícios e desvios de processo no almoxarifado.</p>
            <p>A Burocracia, embora projetada por Weber para atingir a máxima eficiência técnica através da racionalidade de processos, é frequentemente corrompida na prática cotidiana por disfunções comportamentais sistemáticas descritas por Robert Merton. Dentre as disfunções mais cobradas pela CESGRANRIO, destaca-se o excesso de formalismo (apego cego a papéis e assinaturas que atrasam trâmites de compras) e a resistência crônica a mudanças (inabilidade de aceitar inovações sistêmicas).</p>
            <p>A análise aprofundada de exceções regulatórias exige documentação estrita de conformidade legal de todas as etapas de compras.</p>
            <p>Nas provas objetivas de concurso, a banca CESGRANRIO costuma induzir o candidato ao erro invertendo a direção metodológica da escola científica e da clássica. Lembre-se: Taylor adota uma abordagem de baixo para cima (<strong>bottom-up</strong>, focando na tarefa do operário para atingir a gerência). Já Fayol adota uma abordagem de cima para baixo (<strong>top-down</strong>, partindo da estrutura global da diretoria para descer até as bases da empresa). A banca também foca na identificação de disfunções burocráticas clássicas.</p>
            <p>Na Petrobras, a rotina sob a égide da Lei das Estatais requer do Técnico rigor de compliance e transparência técnica em todos os processos.</p>
            
          </div>

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
                  corFundo: "bg-cyan-500/10",
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
              title="Fundamentos Históricos e Escolas de Pensamento"
              description="Comparação crítica entre as grandes escolas administrativas."
            />
            <ContentAccordion mode="stacked" slides={[
                {
                  titulo: "Conceituação: A Burocracia Weberiana e suas Disfunções Clássicas",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A **Teoria da Burocracia de Max Weber** fundamenta a estrutura formal do serviço público brasileiro e das estatais. Weber projetou a burocracia como o modelo racional-legal ideal de eficiência baseado na impessoalidade, mérito e regras escritas claras. Contudo, na prática organizacional surgem desvios patológicos chamados de **Disfunções da Burocracia** (propostos por Robert Merton), assunto recorrente em provas:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 text-lg">
                        <div className="p-5 bg-card border rounded-lg">
                          <strong className="text-xl text-blue-600 dark:text-blue-400 block mb-2">Características Ideais de Weber:</strong>
                          <ul className="list-disc pl-5 space-y-2 text-lg">
                            <li><strong>Caráter Legal:</strong> Regras, rotinas e normas exaustivamente escritas em estatutos.</li>
                            <li><strong>Impessoalidade:</strong> Tratamento sem favorecimento ou protecionismo pessoal.</li>
                            <li><strong>Hierarquia Funcional:</strong> Divisão estrita de esferas de competência e subordinação de chefia.</li>
                            <li><strong>Profissionalização:</strong> Escolha técnica e meritocrática dos agentes públicos.</li>
                          </ul>
                        </div>
                        <div className="p-5 bg-card border rounded-lg">
                          <strong className="text-xl text-amber-600 dark:text-amber-400 block mb-2">Disfunções Reais (Patologias):</strong>
                          <ul className="list-disc pl-5 space-y-2 text-lg">
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
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Para a Petrobras, operar a cadeia de suprimentos exige um equilíbrio cirúrgico entre duas escolas aparentemente contraditórias:
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-lg">
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
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Nas provas objetivas, a banca cobra a associação direta de autores, teorias e seus focos principais de estudo. Decore este mapa conceitual para responder instantaneamente:
                      </p>
                      <div className="overflow-x-auto mt-4 font-sans text-lg">
                        <table className="w-full text-left border-collapse border border-border">
                          <thead>
                            <tr className="bg-muted">
                              <th className="p-3 border border-border font-bold">Escola</th>
                              <th className="p-3 border border-border font-bold">Foco Principal</th>
                              <th className="p-3 border border-border font-bold">Conceito e Termo Curinga</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="p-3 font-bold border border-border text-blue-600">Administração Científica (Taylor)</td>
                              <td className="p-3 border border-border">Nas Tarefas e Tempos (Chão de fábrica).</td>
                              <td className="p-3 border border-border">ORT (Organização Racional do Trabalho), Divisão do trabalho, Peça-Preço, *Homo Economicus*.</td>
                            </tr>
                            <tr>
                              <td className="p-3 font-bold border border-border text-teal-600">Teoria Clássica (Fayol)</td>
                              <td className="p-3 border border-border">Na Estrutura formal global.</td>
                              <td className="p-3 border border-border">14 Princípios universais, Funções Administrativas originais, unidade de comando, linearidade.</td>
                            </tr>
                            <tr>
                              <td className="p-3 font-bold border border-border text-emerald-600">Relações Humanas (Elton Mayo)</td>
                              <td className="p-3 border border-border">Nas Pessoas e Grupos informais.</td>
                              <td className="p-3 border border-border">Hawthorne, *Homo Socialis*, liderança informal, dinâmica de grupos, fatores motivacionais sociais.</td>
                            </tr>
                            <tr>
                              <td className="p-3 font-bold border border-border text-cyan-600">Teoria de Sistemas (Ludwig)</td>
                              <td className="p-3 border border-border">Na Visão Sistêmica integrada.</td>
                              <td className="p-3 border border-border">Entropia negativa, sinergia, homeostase, limites dinâmicos, organização como sistema aberto.</td>
                            </tr>
                            <tr>
                              <td className="p-3 font-bold border border-border text-amber-600">Contingencial (Woodward)</td>
                              <td className="p-3 border border-border">No Ambiente e Tecnologia.</td>
                              <td className="p-3 border border-border">"Não há uma única forma correta de gerir", imperativo tecnológico, flexibilidade orgânica vs mecânica.</td>
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
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Muitos candidatos acham que a Escola Científica e a Clássica são sinônimos por pertencerem à Era Clássica da Administração. **A direção do olhar metodológico é uma pegadinha recorrente nas provas.**
                      </p>
                      <AlertBox tipo="warning" titulo="A Direção do Olhar Metodológico">
                        <span className="text-lg">
                          A **Administração Científica** de Frederick Taylor adota uma abordagem de baixo para cima (*bottom-up*), partindo da análise minuciosa da tarefa do operário para depois chegar à gerência global. Por outro lado, a **Teoria Clássica** de Henri Fayol adota uma abordagem de cima para baixo (*top-down*), partindo da estrutura global da diretoria e descendo até as divisões de base. A banca adora inverter estes dois fluxos!
                        </span>
                      </AlertBox>
                    </div>
                  ),
                  icone: <LuTriangleAlert />,
                },
              ]}
            />
          </div>

                  {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={6}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[6]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Max Weber propôs o modelo burocrático de organização. Qual é a principal característica desse modelo?"
          alternativas={[
            { letra: "A", texto: "Ênfase em relações informais e cultura organizacional para guiar o comportamento", correta: false },
              { letra: "B", texto: "Racionalidade legal-racional: autoridade baseada em normas formais, cargos, procedimentos escritos e impessoalidade", correta: true },
              { letra: "C", texto: "Foco na eficiência das tarefas operacionais por meio de padronização de movimentos", correta: false },
              { letra: "D", texto: "Adaptação constante ao ambiente externo, sem estrutura formal definida", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
          ]}
          dicaEstrategica="Ideal weberiano de racionalidade."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Weber identificou três tipos de autoridade: tradicional (costumes), carismática (personalidade do líder) e legal-racional (normas)." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "A burocracia é baseada na legal-racional: cargos (não pessoas), normas escritas, impessoalidade, hierarquia definida, competência técnica." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={6}
            variant={mv[6]}
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
              title: "Diretrizes Críticas das Escolas",
              content: (
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-6xl my-6 animate-pulse inline-block">📜 🏆</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg">
                    <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 text-center">
                      <p className="font-bold text-blue-600 mb-1 text-xl">Escola Científica & Clássica</p>
                      <p className="text-base text-muted-foreground">Taylor foca na tarefa e tempos (bottom-up). Fayol foca na estrutura formal global da empresa (top-down).</p>
                    </div>
                    <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center">
                      <p className="font-bold text-emerald-600 mb-1 text-xl">Burocracia & Sistemas</p>
                      <p className="text-base text-muted-foreground">Burocracia (Weber) foca em impessoalidade legal e mérito. Sistemas foca na organização como um sistema aberto no ambiente.</p>
                    </div>
                    <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 text-center">
                      <p className="font-bold text-amber-600 mb-1 text-xl">Escola Contingencial</p>
                      <p className="text-base text-muted-foreground">Não existe receita de gestão única ideal absoluta. Tudo depende dos imperativos da tecnologia e ambiente externo.</p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-xl border text-base space-y-2">
                    <p className="font-bold">💡 Dica Quente da CESGRANRIO:</p>
                    <p>• As disfunções descritas por Merton expressam patologias práticas como o excesso de papelório e regras como fins em si mesmas.</p>
                    <p>• A experiência de Hawthorne (Mayo) provou a primazia das forças sociais informais sobre as condições de iluminação física.</p>
                  </div>
                </div>
              ),
            }}
            podcast={{
            aulaId: "administracaogeralsuprimento",
            aulaTitulo: "Administracao Geral Suprimento",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 6,
            moduloTitulo: "Módulo 6",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
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
              title="Dossiê de Comunicação e Conflitos"
              description="Fundamentos teóricos e dinâmicas relacionais nas organizações contemporâneas."
            />
            <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>A comunicação organizacional atua como o verdadeiro sistema circulatório das corporações modernas, ligando gerências, equipes de campo e a alta diretoria em uma rede contínua de compartilhamento de significados. Sem fluxos comunicacionais estruturados e transparentes, o alinhamento estratégico, a sinergia departamental e a própria execução das tarefas operacionais cotidianas tornam-se virtualmente impossíveis. O desempenho coletivo está intrinsecamente atrelado à qualidade, precisão e tempestividade da informação disseminada.</p>
            <p>Em exames da CESGRANRIO, o domínio dos conceitos fundamentais é vital para o correto julgamento de questões complexas de múltipla escolha.</p>
            <p>O processo de comunicação é composto por um circuito integrado de elementos essenciais: o emissor (quem origina a ideia), a codificação (conversão da ideia em símbolos ou linguagem), a mensagem (o conteúdo transmitido), o canal (o meio físico ou virtual de transmissão), a decodificação (interpretação da mensagem pelo destinatário), o receptor (a quem a mensagem se destina) e o feedback (a resposta que confirma a decodificação bem-sucedida). Ao longo desse circuito, atuam os ruídos, entendidos como qualquer barreira ou distorção que degrade a integridade da mensagem.</p>
            <p>A fundamentação teórica estabelece os parâmetros técnicos, de governança e de conformidade legal exigidos em auditorias.</p>
            <p>Para visualizar a dinâmica prática desses conceitos, considere a especificação técnica de um contrato de fornecimento de válvulas de controle de pressão para uma plataforma de refino. O emissor (gerente de operações) codifica os requisitos técnicos em um e-mail formal (mensagem e canal) e o envia ao receptor (analista de suprimentos). Se o analista utilizar jargões puramente mercadológicos para responder e o gerente interpretar isso como desinteresse técnico, ocorreu um clássico ruído semântico decorrente de diferenças de repertório vocacional.</p>
            <p>Como demonstração operacional clássica, a conformidade atua prevenindo desperdícios e desvios de processo no almoxarifado.</p>
            <p>O intercâmbio de mensagens nas organizações transita por fluxos formais estruturados (comunicação descendente, que flui da chefia com ordens e diretrizes; ascendente, que sobe com sugestões e relatórios; horizontal, que conecta gerências de mesmo nível; e diagonal, que cruza níveis hierárquicos e setores distintos). No entanto, de forma paralela, a comunicação informal (rádio-corredor) opera de forma orgânica, rápida e descentralizada, preenchendo as lacunas de informação deixadas pelos canais formais da organização.</p>
            <p>A análise aprofundada de exceções regulatórias exige documentação estrita de conformidade legal de todas as etapas de compras.</p>
            <p>Na Petrobras, a eficácia na comunicação e no manejo de conflitos é de suma importância em suas operações integradas offshore. Nas trocas de turnos em plataformas de petróleo na bacia de Campos, engenheiros e técnicos operam sob escalas de confinamento exaustivas, onde ruídos de comunicação podem representar riscos reais de acidentes graves de segurança. O uso de protocolos de comunicação repetitivos (escuta ativa e confirmação obrigatória de comandos operacionais) atua como uma barreira preventiva contra acidentes.</p>
            <p>Na Petrobras, a rotina sob a égide da Lei das Estatais requer do Técnico rigor de compliance e transparência técnica em todos os processos.</p>
            
          </div>
          </div>

          <div className="space-y-6">
            <ModuleSectionHeader
              index={2}
              variant={mv[7]}
              title="Mecanismos de Diálogo e Gestão de Conflitos"
              description="Aprofundamento técnico nos processos comunicacionais e na mediação corporativa."
            />
            <ContentAccordion mode="stacked" slides={[
                {
                  titulo: "Comunicação: O Circuito e seus Componentes Críticos",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A comunicação eficaz só ocorre quando o destinatário de fato compreende o significado da mensagem de forma idêntica à planejada pelo emissor.
                      </p>
                      <div className="bg-muted p-5 rounded-xl border border-border space-y-3 mt-4">
                        <span className="font-bold text-xl text-teal-600 block">Os 7 Elementos do Circuito Comunicativo:</span>
                        <ul className="list-disc pl-5 space-y-2 text-lg">
                          <li><strong>Emissor:</strong> A fonte que inicia a transmissão da ideia ou pensamento.</li>
                          <li><strong>Codificação:</strong> Conversão da ideia em linguagem, símbolos, gestos ou imagens padronizadas.</li>
                          <li><strong>Mensagem:</strong> O conteúdo físico ou conceitual codificado e transmitido.</li>
                          <li><strong>Canal:</strong> O veículo de mídia físico, digital ou presencial por onde viaja a mensagem.</li>
                          <li><strong>Decodificação:</strong> A interpretação e tradução dos símbolos realizada pelo receptor.</li>
                          <li><strong>Receptor:</strong> O destinatário final que absorve a informação decodificada.</li>
                          <li><strong>Feedback:</strong> O retorno que atesta a correta recepção e entendimento da ideia original.</li>
                        </ul>
                      </div>
                    </div>
                  ),
                  icone: <LuHandshake />,
                },
                {
                  titulo: "Canais e Direcionamento dos Fluxos Comunicacionais",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        As redes de informação estruturam-se em fluxos formais (organograma) e informais, transitando em diferentes direções hierárquicas essenciais:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        <div className="p-5 bg-teal-500/5 border border-teal-500/20 rounded-lg">
                          <h6 className="font-bold text-xl text-teal-800 dark:text-teal-400 mb-2">Descendente:</h6>
                          <p className="text-lg">
                            Da alta gerência para os níveis operacionais. Transmite metas, diretrizes organizacionais, ordens de tarefas e rotinas formais escritas.
                          </p>
                        </div>
                        <div className="p-5 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
                          <h6 className="font-bold text-xl text-cyan-800 dark:text-cyan-400 mb-2">Ascendente:</h6>
                          <p className="text-lg">
                            Dos colaboradores para a liderança. Traz relatórios de desempenho, dúvidas, sugestões de melhoria contínua Kaizen e queixas.
                          </p>
                        </div>
                        <div className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                          <h6 className="font-bold text-xl text-blue-800 dark:text-blue-400 mb-2">Horizontal e Diagonal:</h6>
                          <p className="text-lg">
                            Conecta setores de mesmo nível ou cruza departamentos de níveis diferentes, otimizando o tempo e a coordenação integrada.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuNetwork />,
                },
                {
                  titulo: "Gestão de Conflitos: Abordagens e Estilos Organizacionais",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        O conflito é um processo em que uma das partes percebe que a outra afeta negativamente seus interesses. Os estilos de gestão variam conforme assertividade e cooperação:
                      </p>
                      <div className="bg-muted p-5 rounded-xl border border-border space-y-3 mt-4">
                        <span className="font-bold text-xl text-cyan-600 block">Os 5 Estilos de Thomas-Kilmann:</span>
                        <ul className="list-disc pl-5 space-y-2 text-lg">
                          <li><strong>Competição (Ganhar-Perder):</strong> Assertivo e não cooperativo. Focado em impor a própria vontade a qualquer custo. Útil em emergências rápidas de segurança.</li>
                          <li><strong>Colaboração (Ganhar-Ganhar):</strong> Assertivo e cooperativo. Busca integrar as visões de forma holística para obter uma solução consensual ideal.</li>
                          <li><strong>Compromisso (Acordo Médio):</strong> Meio-termo onde ambas as partes cedem parcialmente para fechar um acordo viável rápido.</li>
                          <li><strong>Evitação (Perder-Perder):</strong> Não assertivo e não cooperativo. O gestor ignora, adia ou evita ativamente lidar com o conflito latente.</li>
                          <li><strong>Acomodação (Perder-Ganhar):</strong> Não assertivo e cooperativo. Ceder à vontade alheia para manter a harmonia social imediata do grupo.</li>
                        </ul>
                      </div>
                    </div>
                  ),
                  icone: <LuUsers />,
                },
                {
                  titulo: "Negociação: Estratégias Distributivas vs. Integrativas",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A negociação é o principal rito formal para a pacificação de conflitos de interesses. Divide-se em duas abordagens metodológicas clássicas:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="p-5 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                          <h6 className="font-bold text-xl text-amber-800 dark:text-amber-400 mb-2">Negociação Distributiva (Soma Zero):</h6>
                          <p className="text-lg">
                            Focada na divisão de recursos fixados. O ganho de uma das partes representa necessariamente a perda direta da outra (foco competitivo de curto prazo).
                          </p>
                        </div>
                        <div className="p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
                          <h6 className="font-bold text-xl text-emerald-800 dark:text-emerald-400 mb-2">Negociação Integrativa (Consensual):</h6>
                          <p className="text-lg">
                            Focada na expansão dos recursos por meio de cooperação, buscando criar soluções de valor agregado mútuo que satisfaçam ambos (foco colaborativo de longo prazo).
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuHandshake />,
                },
                {
                  titulo: "Conceituação: Elementos, Ruídos e Barreiras no Fluxo de Informação",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Para a CESGRANRIO, o candidato deve dominar os fatores que bloqueiam ou distorcem a eficácia da comunicação organizacional (Barreiras de Comunicação):
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="p-5 bg-card border rounded-lg">
                          <strong className="text-blue-600 dark:text-blue-400 block text-xl mb-2">Tipos de Ruído e Distorções:</strong>
                          <ul className="list-disc pl-5 space-y-2 text-lg">
                            <li><strong>Filtragem:</strong> A manipulação deliberada da informação pelo emissor para torná-la mais favorável aos olhos da chefia.</li>
                            <li><strong>Percepção Seletiva:</strong> O receptor seleciona, lê ou ouve apenas o que lhe interessa com base em seus valores pessoais prévios.</li>
                            <li><strong>Sobrecarga de Informação:</strong> Excesso de dados que ultrapassa a capacidade de processamento do cérebro.</li>
                          </ul>
                        </div>
                        <div className="p-5 bg-card border rounded-lg">
                          <strong className="text-amber-600 dark:text-amber-400 block text-xl mb-2">Barreiras de Linguagem e Emoção:</strong>
                          <ul className="list-disc pl-5 space-y-2 text-lg">
                            <li><strong>Semântica:</strong> O uso de palavras, jargões técnicos ou siglas cujo sentido varia entre diferentes especialidades profissionais.</li>
                            <li><strong>Emoção:</strong> O estado emocional no momento da troca bloqueia a racionalidade na decodificação e na escuta.</li>
                            <li><strong>Ruído Físico:</strong> Interferências acústicas no ambiente fabril ou problemas técnicos de conexão na rede.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuBookOpen />,
                },
                {
                  titulo: "Exemplificação: O Rito de Alinhamento de SMS em Operações Off-Shore",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Nas plataformas de exploração offshore da Petrobras, a comunicação eficiente é uma barreira de segurança vital:
                      </p>
                      <AlertBox tipo="info" titulo="Protocolo 'Three-Way Communication' (Circuito Fechado)">
                        <span className="text-lg">
                          Para coibir acidentes fatais, adota-se o rito formal de três etapas:
                          1. O emissor (gerente de mar) transmite o comando operacional técnico.
                          2. O receptor (operador) repete verbalmente o comando como o interpretou para verificação.
                          3. O emissor confirma verbalmente ("Correto") ou corrige se houver ruído semântico de decodificação.
                          Esse protocolo simples do feedback obrigatório garante a eliminação completa de ruídos nas operações críticas da plataforma.
                        </span>
                      </AlertBox>
                    </div>
                  ),
                  icone: <LuBriefcase />,
                },
                {
                  titulo: "Dicas Táticas: As 5 Estratégias de Thomas-Kilmann para Provas",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Nas provas objetivas de administração geral da CESGRANRIO, as questões costumam propor cenários de conflitos e pedir o estilo mais adequado de mediação. Decore esta regra de ouro:
                      </p>
                      <div className="overflow-x-auto mt-4">
                        <table className="w-full text-lg text-left border-collapse border border-border">
                          <thead>
                            <tr className="bg-muted">
                              <th className="p-3 border border-border font-bold">Estilo de Resolução</th>
                              <th className="p-3 border border-border font-bold">Cenário Ideal na Prova</th>
                              <th className="p-3 border border-border font-bold">Compromisso / Perda Parcial</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="p-3 font-bold border border-border text-red-600">Competição</td>
                              <td className="p-3 border border-border">Decisões rápidas, impopulares e cruciais de segurança operacional.</td>
                              <td className="p-3 border border-border">Nenhum. Apenas uma parte vence.</td>
                            </tr>
                            <tr>
                              <td className="p-3 font-bold border border-border text-emerald-600">Colaboração</td>
                              <td className="p-3 border border-border">Conciliar interesses diversos de longo prazo integrando visões.</td>
                              <td className="p-3 border border-border">Soma positiva (Ganhar-Ganhar). Ambos ganham de forma plena.</td>
                            </tr>
                            <tr>
                              <td className="p-3 font-bold border border-border text-cyan-600">Compromisso</td>
                              <td className="p-3 border border-border">Prazos curtos, metas temporárias sob poder equivalente das partes.</td>
                              <td className="p-3 border border-border">Partilha equitativa. Ambos cedem um pouco para avançar.</td>
                            </tr>
                            <tr>
                              <td className="p-3 font-bold border border-border text-amber-600">Acomodação</td>
                              <td className="p-3 border border-border">Quando o tema é mais importante para o outro ou para manter harmonia social.</td>
                              <td className="p-3 border border-border">Submissão pacífica. Uma parte cede por completo.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ),
                  icone: <LuAward />,
                },
                {
                  titulo: "Exceções e pontos de atenção: Supressão ≠ Resolução Real",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Um erro frequente de gestores inexperientes é tentar suprimir ativamente qualquer manifestação de conflito em suas equipes.
                      </p>
                      <AlertBox tipo="danger" titulo="Os Perigos da Evitação Sistemática">
                        <span className="text-lg">
                          Adotar a <strong>evitação</strong> (fingir que o conflito não existe) ou a <strong>acomodação rápida</strong> (dar razão sempre a um reclamante) apenas silencia provisoriamente os sintomas visíveis. As causas reais da divergência permanecem latentes e acumulam-se, gerando um ambiente de desconfiança e ressentimento que explodirá de forma muito mais grave no futuro sob a forma de ruídos de comunicação e ineficiência.
                        </span>
                      </AlertBox>
                    </div>
                  ),
                  icone: <LuTriangleAlert />,
                },
              ]}
            />
          </div>

                  {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={7}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[7]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="O processo de comunicação organizacional inclui vários elementos. O 'ruído' nesse processo refere-se a:"
          alternativas={[
            { letra: "A", texto: "O volume sonoro nos ambientes de trabalho que dificulta reuniões presenciais", correta: false },
              { letra: "B", texto: "Qualquer interferência que distorce ou impede a transmissão fiel da mensagem do emissor ao receptor", correta: true },
              { letra: "C", texto: "A falta de canais digitais de comunicação interna na organização", correta: false },
              { letra: "D", texto: "O desalinhamento entre comunicação formal e informal dentro da empresa", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
          ]}
          dicaEstrategica="Pode ser físico (barulho), semântico (palavras com múltiplos sentidos), psicológico (preconceitos, emoções), organizacional (hierarquia excessiva) ou tecnológico (falhas no sistema)."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Ruído na comunicação: qualquer fator que distorce, bloqueia ou distrai a transmissão da mensagem." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={7}
            variant={mv[7]}
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
              title: "Diretrizes Críticas de Comunicação e Conflitos",
              content: (
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-6xl my-6 animate-pulse inline-block">💬 🤝</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg">
                    <div className="p-4 bg-teal-500/10 rounded-xl border border-teal-500/20 text-center">
                      <p className="font-bold text-teal-600 mb-1 text-xl">Circuito Fechado</p>
                      <p className="text-base text-muted-foreground">O feedback obrigatório garante a sintonia conceitual e elimina ruídos semânticos e distorções.</p>
                    </div>
                    <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-center">
                      <p className="font-bold text-cyan-600 mb-1 text-xl">Estilos Situacionais</p>
                      <p className="text-base text-muted-foreground">Competição em emergências operacionais. Colaboração para integrar objetivos de longo prazo.</p>
                    </div>
                    <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 text-center">
                      <p className="font-bold text-blue-600 mb-1 text-xl">Riqueza de Canal</p>
                      <p className="text-base text-muted-foreground">Assuntos ambíguos ou sensíveis demandam canais de alta riqueza de mídia (presencial síncrono).</p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-xl border text-base space-y-2">
                    <p className="font-bold">💡 Dica Quente da CESGRANRIO:</p>
                    <p>• O ruído semântico é provocado por diferença de vocabulário e repertório técnico ou profissional.</p>
                    <p>• A evitação e a acomodação silenciam conflitos mas mantêm sua causa latente e acumulada.</p>
                  </div>
                </div>
              ),
            }}
            podcast={{
            aulaId: "administracaogeralsuprimento",
            aulaTitulo: "Administracao Geral Suprimento",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 7,
            moduloTitulo: "Módulo 7",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
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
              title="Dossiê Decisório e Inovação"
              description="Racionalidade limitada, espiral do conhecimento e armadilhas mentais na tomada de decisão."
            />
            <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>A tomada de decisão constitui o verdadeiro núcleo dinâmico da ação administrativa, sendo a atividade por meio da qual os gestores definem o rumo estratégico e a alocação de recursos da corporação. Em cenários de negócios marcados pela volatilidade e pela complexidade tecnológica, a capacidade de selecionar alternativas viáveis sob forte pressão de tempo e riscos determina a sobrevivência de qualquer empresa. Compreender a teoria por trás do ato de decidir é a ferramenta mais eficaz contra a intuição cega e o empirismo ingênuo.</p>
            <p>Em exames da CESGRANRIO, o domínio dos conceitos fundamentais é vital para o correto julgamento de questões complexas de múltipla escolha.</p>
            <p>Para decodificar esse cenário, Herbert Simon formulou a revolucionária teoria da <strong>Racionalidade Limitada</strong>, demonstrando que os administradores operam sob restrições cognitivas severas. Sendo impossível mapear exaustivamente todas as opções e antever todas as suas consequências, os tomadores de decisão abandonam a busca pela otimização absoluta (a decisão perfeita). No lugar dela, adotam o modelo da <strong>decisão satisfatória</strong>, selecionando a primeira alternativa viável que atenda aos requisitos mínimos de segurança estabelecidos.</p>
            <p>A fundamentação teórica estabelece os parâmetros técnicos, de governança e de conformidade legal exigidos em auditorias.</p>
            <p>Para visualizar a interação desses conceitos, considere a contratação emergencial de um fornecedor de válvulas industriais sob suspeita de falha estrutural generalizada. Sob a premissa da racionalidade absoluta, o gestor de compras deveria cotar o preço e avaliar o balanço de todas as fundições de válvulas do planeta e realizar testes metalúrgicos em todos os protótipos antes de assinar. Sob a Racionalidade Limitada de Simon, o gestor define três critérios essenciais (prazo de entrega de 5 dias, certificação técnica mínima e preço compatível com o histórico).</p>
            <p>Como demonstração operacional clássica, a conformidade atua prevenindo desperdícios e desvios de processo no almoxarifado.</p>
            <p>O processo decisório, contudo, é frequentemente sabotado por vieses cognitivos e armadilhas mentais sistemáticas cometidas pelos administradores. Dentre os mais cobrados pela CESGRANRIO, destaca-se o viés de ancoragem (fixar-se excessivamente na primeira informação ou estimativa recebida e ajustar de forma insuficiente os dados subsequentes). Paralelamente, o viés de confirmação faz com que o decisor busque e valorize apenas dados que corroborem sua opinião inicial, ignorando ativamente evidências contrárias de riscos.</p>
            <p>A análise aprofundada de exceções regulatórias exige documentação estrita de conformidade legal de todas as etapas de compras.</p>
            <p>Na Petrobras, a dualidade da racionalidade decisória é observada na divisão entre decisões programadas e não-programadas. Decisões programadas referem-se às atividades rotineiras e padronizadas, como a reposição de estoques de segurança de sobressalentes operacionais. O analista de suprimentos não precisa tomar decisões ativas: quando o estoque atinge o ponto de ressuprimento no sistema SAP Petronect, dispara-se automaticamente a emissão da nota de compras sob as condições de atas de registro de preços vigentes.</p>
            <p>Na Petrobras, a rotina sob a égide da Lei das Estatais requer do Técnico rigor de compliance e transparência técnica em todos os processos.</p>
            
          </div>
          </div>

          <div className="space-y-6">
            <ModuleSectionHeader
              index={2}
              variant={mv[8]}
              title="Racionalidade Decisória e Vetores de Inovação"
              description="Modelos de tomada de decisão e gestão estratégica do conhecimento."
            />
            <ContentAccordion mode="stacked" slides={[
                {
                  titulo: "Racionalidade Limitada: A Teoria Decisória de Herbert Simon",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A tomada de decisão é a essência do trabalho administrativo. Contrapondo-se ao modelo econômico clássico de racionalidade absoluta, <strong>Herbert Simon</strong> formulou a teoria da <strong>Racionalidade Limitada</strong>:
                      </p>
                      <div className="bg-muted p-5 rounded-xl border border-border space-y-3 mt-4">
                        <span className="font-bold text-xl text-blue-600 block">Os 3 Limites Decisórios:</span>
                        <ul className="list-disc pl-5 space-y-2 text-lg">
                          <li><strong>Capacidade Cognitiva:</strong> O cérebro humano possui limites biológicos na quantidade de informações e variáveis que pode processar simultaneamente.</li>
                          <li><strong>Informação Incompleta:</strong> Nunca há acesso a todos os dados do ambiente de mercado ou às consequências futuras de cada escolha.</li>
                          <li><strong>Tempo Finito:</strong> Os prazos operacionais impedem o cálculo infinito de múltiplos cenários alternativos.</li>
                        </ul>
                      </div>
                      <p className="mt-2 text-lg">
                        Como consequência dessas limitações, os administradores buscam uma decisão <strong>satisfatória</strong> (suficientemente boa para resolver o problema prático) em vez da decisão ótima (ideal absoluta).
                      </p>
                    </div>
                  ),
                  icone: <LuSearch />,
                },
                {
                  titulo: "Decisões Programadas vs. Não-Programadas no Contexto Gerencial",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Os problemas organizacionais variam em termos de previsibilidade e estruturação, exigindo dois tipos distintos de respostas decisórias:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                          <h6 className="font-bold text-xl text-blue-800 dark:text-blue-400 mb-2">Decisão Programada:</h6>
                          <p className="text-lg">
                            Rotineira, repetitiva e previsível. É guiada por procedimentos operacionais padronizados (POPs) ou regras automáticas de sistema. O custo decisório é mínimo.
                          </p>
                        </div>
                        <div className="p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
                          <h6 className="font-bold text-xl text-emerald-800 dark:text-emerald-400 mb-2">Decisão Não-Programada:</h6>
                          <p className="text-lg">
                            Única, complexa e sem precedentes históricos exatos. Demanda análise de risco, criatividade da gerência e soluções customizadas. Alto custo e risco decisório.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuBriefcase />,
                },
                {
                  titulo: "A Espiral do Conhecimento: Socialização e Externalização",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A inovação depende da conversão dinâmica do conhecimento organizacional. Nonaka e Takeuchi dividem o saber em <strong>Tácito</strong> (pessoal, fruto de experiência) e <strong>Explícito</strong> (formalizado, escrito).
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="p-5 bg-card border rounded-lg">
                          <strong className="text-blue-600 block text-xl mb-2">Socialização (Tácito para Tácito):</strong>
                          <p className="text-lg">
                            Ocorre por meio do compartilhamento direto de experiências, observação prática e mentoria presencial no dia a dia, sem formalização escrita.
                          </p>
                        </div>
                        <div className="p-5 bg-card border rounded-lg">
                          <strong className="text-emerald-600 block text-xl mb-2">Externalização (Tácito para Explícito):</strong>
                          <p className="text-lg">
                            A etapa mais crítica da espiral, onde o conhecimento prático subjetivo é traduzido e documentado em manuais, relatórios, fluxogramas ou normas oficiais.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuLightbulb />,
                },
                {
                  titulo: "Combinação e Internalização: Reter e Disseminar Saberes",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Para consolidar o conhecimento como um ativo corporativo permanente, a espiral de Nonaka avança para as etapas de fechamento do ciclo integrado:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="p-5 bg-card border rounded-lg">
                          <strong className="text-cyan-600 block text-xl mb-2">Combinação (Explícito para Explícito):</strong>
                          <p className="text-lg">
                            Agrupamento, síntese e sistematização de múltiplos conhecimentos explícitos diferentes (ex: cruzar dois manuais técnicos distintos para desenhar um novo rito de segurança).
                          </p>
                        </div>
                        <div className="p-5 bg-card border rounded-lg">
                          <strong className="text-amber-600 block text-xl mb-2">Internalização (Explícito para Tácito):</strong>
                          <p className="text-lg">
                            Ocorre quando a equipe lê, treina e coloca em prática as novas diretrizes formais escritas, absorvendo-as até virar rotina de trabalho espontânea (aprender fazendo).
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuClipboardList />,
                },
                {
                  titulo: "Conceituação: Vieses Cognitivos e Armadilhas do Processo Decisório",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Os administradores estão sujeitos a vieses e distorções mentais que comprometem sistematicamente a qualidade lógica das decisões:
                      </p>
                      <div className="bg-muted p-5 rounded-xl border border-border space-y-3 mt-4">
                        <span className="font-bold text-xl text-rose-600 block">Os 4 Vieses Críticos Cobrados em Concursos:</span>
                        <ul className="list-disc pl-5 space-y-2 text-lg">
                          <li><strong>Ancoragem:</strong> Fixar-se desproporcionalmente na primeira informação recebida e reajustar de forma insuficiente estimativas posteriores.</li>
                          <li><strong>Confirmação:</strong> Buscar seletivamente informações que confirmem hipóteses prévias e ignorar dados contrários.</li>
                          <li><strong>Disponibilidade:</strong> Avaliar a probabilidade de eventos com base no quão facilmente lembranças semelhantes surgem na memória recente.</li>
                          <li><strong>Custo Afundado (Sunk Cost):</strong> Continuar aportando fundos em projetos fracassados apenas para tentar "justificar" perdas passadas.</li>
                        </ul>
                      </div>
                    </div>
                  ),
                  icone: <LuTriangleAlert />,
                },
                {
                  titulo: "Exemplificação: Processo Decisório na Escolha de Fornecedor Crítico na Petrobras",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Veja o contraste da tomada de decisão programada e não-programada na Petrobras:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="p-5 bg-muted border rounded-lg space-y-2">
                          <h6 className="font-bold text-xl text-blue-600">Decisão Programada (Operacional):</h6>
                          <p className="text-lg">
                            O estoque de óleo lubrificante de turbinas na base offshore caiu abaixo do limite de segurança (ponto de ressuprimento).
                          </p>
                          <p className="text-slate-500 text-base mt-2">
                            A ação corretiva é automática: o sistema Petronect dispara a emissão de pedido de compras direcionada ao fornecedor vencedor do contrato de gaveta pré-aprovado. Não exige novas análises ou debates estratégicos.
                          </p>
                        </div>
                        <div className="p-5 bg-muted border rounded-lg space-y-2">
                          <h6 className="font-bold text-xl text-emerald-600">Decisão Não-Programada (Estratégica):</h6>
                          <p className="text-lg">
                            A Petrobras decide investir em tecnologia de hidrogênio verde, exigindo a contratação de fornecedores globais de engenharia disruptiva.
                          </p>
                          <p className="text-slate-500 text-base mt-2">
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
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A CESGRANRIO adora cobrar os vieses cognitivos e falhas sistemáticas cometidas pelos administradores no processo decisório:
                      </p>
                      <AlertBox tipo="warning" titulo="O Viés da Confirmação nas Questões">
                        <span className="text-lg">
                          Nas provas, a banca descreve um gerente que já tomou uma decisão e pede a sua equipe que realize uma "pesquisa" para embasá-la, instruindo-os a focar apenas em dados positivos. O candidato deve identificar imediatamente que esse gerente está sob o **Viés de Confirmação**, rejeitando qualquer evidência científica contraditória para blindar sua opinião prévia.
                        </span>
                      </AlertBox>
                    </div>
                  ),
                  icone: <LuAward />,
                },
                {
                  titulo: "Exceções e pontos de atenção: A Ilusão do Modelo Racional Puro de Decisão",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Muitos candidatos de engenharia ou finanças acreditam que, com computadores modernos e algoritmos avançados, o modelo racional de decisão absoluta é atingível.
                      </p>
                      <AlertBox tipo="warning" titulo="Limites Físicos e Políticos">
                        <span className="text-lg">
                          Na Petrobras real, as grandes decisões estratégicas nunca são tomadas sob racionalidade computacional matemática pura. Existem fatores geopolíticos mutáveis de mercado, pressões institucionais do acionista majoritário (Governo Federal), tensões ambientais locais e flutuações extremas da cotação internacional do petróleo (Brent) que tornam o cenário decisório altamente incerto e político. A decisão bem-sucedida equilibra a modelagem estatística com o discernimento político do cenário estratégico externo.
                        </span>
                      </AlertBox>
                    </div>
                  ),
                  icone: <LuTriangleAlert />,
                },
              ]}
            />
          </div>

                  {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={8}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[8]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="O modelo de 'racionalidade limitada' de Herbert Simon contradiz o modelo racional clássico ao propor que:"
          alternativas={[
            { letra: "A", texto: "Gestores têm acesso a toda informação relevante e sempre escolhem a opção ótima", correta: false },
              { letra: "B", texto: "As decisões são irracionais e baseadas exclusivamente em emoções e intuições pessoais", correta: false },
              { letra: "C", texto: "Gestores tomam decisões com informação limitada, tempo limitado e capacidade cognitiva limitada, buscando solução ", correta: true },
              { letra: "D", texto: " (satisficing), não a ótima", correta: false },
              { letra: "E", texto: "A tomada de decisão deve ser sempre delegada a especialistas externos à organização", correta: false },
              { letra: "F", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
          ]}
          dicaEstrategica="Buscam"
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Simon (Nobel de Economia, 1978): na realidade, gestores não têm informação perfeita, tempo ilimitado nem capacidade de processar todas as alternativas." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa C como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={8}
            variant={mv[8]}
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
              title: "Diretrizes Críticas de Tomada de Decisão",
              content: (
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-6xl my-6 animate-pulse inline-block">🎯 💡</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-lg">
                    <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 text-center">
                      <p className="font-bold text-blue-600 mb-1 text-xl">Racionalidade Limitada</p>
                      <p className="text-base text-muted-foreground">O decisor busca alternativas satisfatórias devido a limites cognitivos e tempo finito.</p>
                    </div>
                    <div className="p-4 bg-teal-500/10 rounded-xl border border-teal-500/20 text-center">
                      <p className="font-bold text-teal-600 mb-1 text-xl">Espiral do Saber</p>
                      <p className="text-base text-muted-foreground">Inovação pelo intercâmbio contínuo e cíclico de conhecimento tácito e explícito.</p>
                    </div>
                    <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 text-center">
                      <p className="font-bold text-amber-600 mb-1 text-xl">Vieses Cognitivos</p>
                      <p className="text-base text-muted-foreground">Cuidado com ancoragem e viés de confirmação nas avaliações de riscos.</p>
                    </div>
                    <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center">
                      <p className="font-bold text-emerald-600 mb-1 text-xl">Tipo Decisório</p>
                      <p className="text-base text-muted-foreground">Programada para rotinas operacionais; não-programada para estratégia complexa.</p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-xl border text-base space-y-2">
                    <p className="font-bold">💡 Dica Quente da CESGRANRIO:</p>
                    <p>• Herbert Simon introduziu a decisão satisfatória como alternativa realista à impossibilidade física da otimização ideal.</p>
                    <p>• A armadilha do custo afundado faz o decisor verter recursos adicionais em um erro só para não assumir prejuízos passados.</p>
                  </div>
                </div>
              ),
            }}
            podcast={{
            aulaId: "administracaogeralsuprimento",
            aulaTitulo: "Administracao Geral Suprimento",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 8,
            moduloTitulo: "Módulo 8",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
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
            <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            <p>A Petrobras, na qualidade de Sociedade de Economia Mista sob controle da União, opera sob um regime jurídico híbrido de extrema complexidade. Ao mesmo tempo em que disputa espaço no mercado internacional de óleo e gás concorrendo diretamente com gigantes privadas globais, a companhia deve observar com absoluto rigor os princípios constitucionais da Administração Pública. Essa natureza ambivalente exige ferramentas de governança de suprimentos robustas, combinando agilidade comercial com controles jurídicos estritos.</p>
            <p>Em exames da CESGRANRIO, o domínio dos conceitos fundamentais é vital para o correto julgamento de questões complexas de múltipla escolha.</p>
            <p>O marco legal que disciplina as aquisições da Petrobras é a <strong>Lei das Estatais (Lei nº 13.303/16)</strong>, que outorga às empresas estatais um regulamento próprio de licitações mais dinâmico que a lei comum de contratos. Esse estatuto foi desenhado para assegurar flexibilidade comercial frente à concorrência privada. Assim sendo, a Petrobras **não** submete seus certames de compras à Nova Lei de Licitações (Lei nº 14.133/21), exceto nos limites expressos de aplicação de crimes licitatórios tipificados no Código Penal brasileiro.</p>
            <p>A fundamentação teórica estabelece os parâmetros técnicos, de governança e de conformidade legal exigidos em auditorias.</p>
            <p>Para visualizar o ganho de eficiência operacional gerado por essa regra, imagine uma licitação para aquisição de sobressalentes mecânicos com a participação de 40 empresas concorrentes. No modelo tradicional de licitação da administração direta, a comissão de licitação seria forçada a abrir, analisar e julgar as certidões negativas e balanços de todas as 40 empresas antes mesmo de olhar os envelopes de preços. Esse rito burocrático gerava atrasos de meses e recorrentes disputas judiciais sobre documentação.</p>
            <p>Como demonstração operacional clássica, a conformidade atua prevenindo desperdícios e desvios de processo no almoxarifado.</p>
            <p>Além da celeridade processual, o estatuto das estatais introduziu mecanismos de blindagem e gestão de integridade institucional sob a égide do ESG (Environmental, Social, and Governance). Nas grandes contratações integradas de engenharia, a Petrobras deve obrigatoriamente formalizar uma **Matriz de Riscos** detalhada no edital, partilhando previamente as responsabilidades de riscos geotécnicos e flutuações cambiais entre a estatal e o consórcio vencedor, reduzindo litígios contratuais futuros.</p>
            <p>A análise aprofundada de exceções regulatórias exige documentação estrita de conformidade legal de todas as etapas de compras.</p>
            <p>Na rotina de contratações diretas, o Técnico de Suprimentos deve prestar atenção aos limites e às justificativas técnicas exigidas. A Lei 13.303 fixa limites de alçada específicos para a dispensa de licitação por valor (R$ 100.000,00 para obras de engenharia e R$ 50.000,00 para aquisições gerais de bens). Qualquer compra direta fundamentada em dispensa ou inexigibilidade (por inviabilidade de competição frente a fornecedor exclusivo ou fabricante único) requer parecer de justificativa técnica e ateste de compatibilidade de preço.</p>
            <p>Na Petrobras, a rotina sob a égide da Lei das Estatais requer do Técnico rigor de compliance e transparência técnica em todos os processos.</p>
            
          </div>
          </div>

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
                <span className="text-lg text-foreground/85 leading-relaxed uppercase tracking-wider font-bold text-emerald-600">Critério 1</span>
                <h5 className="font-bold text-foreground text-xl">Âmbito de Aplicação</h5>
                <div className="space-y-1 text-lg text-slate-700 dark:text-slate-300">
                  <p><strong>Lei das Estatais (13.303/2016):</strong> Sociedades de Economia Mista (ex: Petrobras, Banco do Brasil), Empresas Públicas (ex: Caixa Econômica) e suas subsidiárias.</p>
                  <p><strong>Nova Lei de Licitações (14.133/2021):</strong> Administração Direta, Autárquica e Fundacional da União, Estados, DF e Municípios.</p>
                  <p className="text-base text-amber-600 mt-1 font-bold italic">💡 CESGRANRIO: Estatais NÃO usam a Lei 14.133, exceto se expressamente indicado em crimes licitatórios do Código Penal.</p>
                </div>
              </div>

              <div className="p-4 bg-card border rounded-xl space-y-2">
                <span className="text-lg text-foreground/85 leading-relaxed uppercase tracking-wider font-bold text-emerald-600">Critério 2</span>
                <h5 className="font-bold text-foreground text-xl">Modalidades de Licitação</h5>
                <div className="space-y-1 text-lg text-slate-700 dark:text-slate-300">
                  <p><strong>Lei das Estatais (13.303/2016):</strong> Não adota modalidades rígidas de nomes da 14.133. Aplica o <strong>Procedimento Licitatório Próprio</strong> e o <strong>Pregão</strong> (para bens e serviços comuns).</p>
                  <p><strong>Nova Lei de Licitações (14.133/2021):</strong> Modalidades estritas de lei: Pregão, Concorrência, Concurso, Leilão e <strong>Diálogo Competitivo</strong>.</p>
                  <p className="text-base text-amber-600 mt-1 font-bold italic">💡 CESGRANRIO: A Lei 13.303 não possui a modalidade de Diálogo Competitivo ou Concorrência nos moldes tradicionais.</p>
                </div>
              </div>

              <div className="p-4 bg-card border rounded-xl space-y-2">
                <span className="text-lg text-foreground/85 leading-relaxed uppercase tracking-wider font-bold text-emerald-600">Critério 3</span>
                <h5 className="font-bold text-foreground text-xl">Inversão de Fases de Habilitação</h5>
                <div className="space-y-1 text-lg text-slate-700 dark:text-slate-300">
                  <p><strong>Lei das Estatais (13.303/2016):</strong> <strong>Regra Geral Obrigatória:</strong> Julgamento financeiro primeiro. Somente o licitante 1º colocado tem a documentação de habilitação analisada.</p>
                  <p><strong>Nova Lei de Licitações (14.133/2021):</strong> Regra geral: proposta e depois habilitação. Mas a inversão é permitida apenas mediante justificativa expressa no edital.</p>
                  <p className="text-base text-amber-600 mt-1 font-bold italic">💡 CESGRANRIO: A inversão obrigatória nas estatais economiza tempo considerável de tramitação dos certames.</p>
                </div>
              </div>

              <div className="p-4 bg-card border rounded-xl space-y-2">
                <span className="text-lg text-foreground/85 leading-relaxed uppercase tracking-wider font-bold text-emerald-600">Critério 4</span>
                <h5 className="font-bold text-foreground text-xl">Limites para Dispensa de Licitação</h5>
                <div className="space-y-1 text-lg text-slate-700 dark:text-slate-300">
                  <p><strong>Lei das Estatais (13.303/2016):</strong> R$ 100.000,00 para obras/engenharia e R$ 50.000,00 para compras/serviços comuns (atualizável por decreto interno).</p>
                  <p><strong>Nova Lei de Licitações (14.133/2021):</strong> R$ 100.000,00 para engenharia/manutenção e R$ 50.000,00 para outros serviços e compras (reajustados anualmente).</p>
                  <p className="text-base text-amber-600 mt-1 font-bold italic">💡 CESGRANRIO: Cuidado com a alteração recente de limites e regras de publicidade de compras diretas.</p>
                </div>
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/80 text-foreground text-lg font-bold border-b border-border">
                    <th className="p-4">Critério Técnico</th>
                    <th className="p-4 w-1/3">Lei das Estatais (Lei 13.303/16)</th>
                    <th className="p-4 w-1/3">Nova Lei de Licitações (Lei 14.133/21)</th>
                    <th className="p-4">Dica Tática CESGRANRIO</th>
                  </tr>
                </thead>
                <tbody className="text-lg text-slate-700 dark:text-slate-300 divide-y divide-border">
                  <tr>
                    <td className="p-4 font-bold bg-muted/20 text-xl">Âmbito de Aplicação</td>
                    <td className="p-4">Empresas Públicas e Sociedades de Economia Mista federais, estaduais e municipais (ex: Petrobras, Banco do Brasil).</td>
                    <td className="p-4">Administração Direta, autarquias, fundações públicas e órgãos especiais da federação.</td>
                    <td className="p-4 text-emerald-600 font-semibold">Petrobras usa unicamente a 13.303 para compras de atividades-fim e meio. Nunca a 14.133.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold bg-muted/20 text-xl">Modalidades</td>
                    <td className="p-4">Adota o <strong>Procedimento Licitatório Próprio</strong> regulado por regulamento interno, mais a adoção do <strong>Pregão</strong> para bens comuns.</td>
                    <td className="p-4">Pregão, Concorrência, Concurso, Leilão e <strong>Diálogo Competitivo</strong> (extinguiu tomada de preço).</td>
                    <td className="p-4 text-emerald-600 font-semibold">Estatais não possuem a modalidade formal de Diálogo Competitivo.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold bg-muted/20 text-xl">Fase de Habilitação</td>
                    <td className="p-4"><strong>Regra Geral:</strong> Ocorre a inversão de fases obrigatória. Abre-se o preço, julga-se e <strong>apenas o licitante 1º colocado</strong> envia a habilitação.</td>
                    <td className="p-4">Propostas de preço antecedem a habilitação, mas permite-se o rito inverso clássico sob forte motivação legal.</td>
                    <td className="p-4 text-emerald-600 font-semibold">Nas estatais, a inversão é regra legal expressa. Poupa tempo e burocracia de arquivo.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold bg-muted/20 text-xl">Dispensa de Licitação</td>
                    <td className="p-4">Valores de alçada: <strong>R$ 100 mil</strong> para obras e engenharia; <strong>R$ 50 mil</strong> para compras e serviços comuns (atualizáveis).</td>
                    <td className="p-4">Valores de alçada: <strong>R$ 100 mil</strong> para engenharia/manutenções e <strong>R$ 50 mil</strong> para outras aquisições (reajustáveis).</td>
                    <td className="p-4 text-emerald-600 font-semibold">Os valores originais nominalmente coincidem, mas as estatais usam índice de reajuste próprio.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold bg-muted/20 text-xl">Matriz de Riscos</td>
                    <td className="p-4"><strong>Obrigatória</strong> em todos os contratos de empreitada integrada e semi-integrada para dividir responsabilidades.</td>
                    <td className="p-4">Opcional como regra geral, mas obrigatória em contratações de grande escala financeira ou complexidade técnica.</td>
                    <td className="p-4 text-emerald-600 font-semibold">A matriz de risco da Petrobras blinda a estatal contra reequilíbrios contratuais abusivos de fornecedores.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <ModuleSectionHeader
              index={2}
              variant={mv[9]}
              title="Direito Administrativo Aplicado à Sociedade de Economia Mista"
              description="Desafios e soluções administrativas na realidade Petrobras."
            />
            <ContentAccordion mode="stacked" slides={[
                {
                  titulo: "Lei das Estatais (13.303): O Regime Jurídico das Compras Públicas",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A <strong>Lei 13.303/16</strong> representou um marco de governança para as empresas públicas e sociedades de economia mista brasileiras. Ela rege todas as compras de bens, obras, serviços de engenharia e alienações da Petrobras.
                      </p>
                      <div className="bg-muted p-5 rounded-xl border border-border space-y-3 mt-4">
                        <span className="font-bold text-xl text-teal-600 block">Objetivos e Vantagens da Lei 13.303/16:</span>
                        <ul className="list-disc pl-5 space-y-2 text-lg">
                          <li><strong>Liberdade Comercial:</strong> Permite flexibilidade operacional nas contratações para garantir competitividade de mercado perante a livre concorrência.</li>
                          <li><strong>Combate à Corrupção:</strong> Regras estritas de conformidade, compliance e auditoria interna de integridade corporativa.</li>
                          <li><strong>Controle de Riscos:</strong> Divisão antecipada de responsabilidades de riscos econômico-financeiros no edital (matriz de riscos).</li>
                        </ul>
                      </div>
                    </div>
                  ),
                  icone: <LuScale />,
                },
                {
                  titulo: "A Petronect e o Princípio Constitucional da Publicidade",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A Petrobras realiza a esmagadora maioria de suas licitações de bens e serviços através do portal eletrônico <strong>Petronect</strong> (regime eletrônico de compras). Isso cumpre o princípio constitucional da <strong>Publicidade</strong> e da <strong>Isonomia</strong>:
                      </p>
                      <AlertBox tipo="info" titulo="Vantagens do Petronect">
                        <span className="text-lg">
                          O sistema Petronect garante que fornecedores de qualquer porte ou localização geográfica possam concorrer em igualdade de condições. Todas as propostas de preço de sobressalentes, cotações e atas de julgamento ficam registradas digitalmente, impedindo manipulações manuais de compras e otimizando a velocidade das transações.
                        </span>
                      </AlertBox>
                    </div>
                  ),
                  icone: <LuBookOpen />,
                },
                {
                  titulo: "Inversão de Fases: Otimização de Tempo na Cadeia de Suprimentos",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        No rito licitatório regulado pela Lei das Estatais, a <strong>inversão de fases é obrigatória</strong> como regra processual geral, o que gera economia brutal de tempo operacional:
                      </p>
                      <div className="bg-muted p-5 rounded-xl border border-border space-y-3 mt-4">
                        <span className="font-bold text-xl text-emerald-600 block">Como Funciona a Inversão:</span>
                        <p className="text-lg">
                          Primeiramente, são abertas, analisadas e classificadas apenas as propostas financeiras de preço de todos os concorrentes. Somente o licitante vencedor (1º colocado) tem sua documentação de habilitação aberta e avaliada.
                        </p>
                        <p className="text-lg text-slate-500 italic">
                          💡 Se os documentos da empresa vencedora estiverem regulares, o certame é homologado sem que os envelopes dos outros concorrentes perdedores tenham sido sequer abertos.
                        </p>
                      </div>
                    </div>
                  ),
                  icone: <LuFileCheck />,
                },
                {
                  titulo: "Conceituação: A Dispensa de Licitação e os Limites de Alçada",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A contratação direta ocorre de forma excepcional quando o certame licitatório formal é dispensado ou inexigível por inviabilidade de concorrência.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="p-5 bg-teal-500/5 border border-teal-500/20 rounded-lg">
                          <h6 className="font-bold text-xl text-teal-800 dark:text-teal-400 mb-2">Limites de Dispensa por Valor:</h6>
                          <p className="text-lg">
                            R$ 100.000,00 para obras de engenharia e reformas. R$ 50.000,00 para compras gerais de bens e contratações de serviços comuns (reajustados periodicamente por decreto interno).
                          </p>
                        </div>
                        <div className="p-5 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                          <h6 className="font-bold text-xl text-amber-800 dark:text-amber-400 mb-2">Inexigibilidade de Licitação:</h6>
                          <p className="text-lg">
                            Ocorre quando a licitação formal é logicamente inviável (ex: contratação de representante exclusivo de sobressalentes importados, ou serviços técnicos de notória especialização sem similares no país).
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuScale />,
                },
                {
                  titulo: "Exemplificação: Processo de Compra de Itens Estratégicos vs. Commodities",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        O setor de suprimento da Petrobras atua na classificação matricial das compras em duas grandes categorias:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="p-5 bg-muted rounded border border-border">
                          <strong className="text-emerald-700 text-xl block mb-2">1. Itens Estratégicos (Customizados):</strong>
                          <p className="text-lg">
                            Equipamentos submarinos complexos (ex: Árvores de Natal Molhadas - ANM, linhas flexíveis).
                          </p>
                          <p className="mt-4 font-semibold text-lg text-slate-600">Ação de Suprimento:</p>
                          <p className="text-lg mt-1 text-slate-500">Exige qualificação restrita técnica rigorosa prévia do fornecedor e longas negociações de engenharia sob regime de matriz de riscos complexa.</p>
                        </div>
                        <div className="p-5 bg-muted rounded border border-border">
                          <strong className="text-blue-700 text-xl block mb-2">2. Itens de Prateleira (Commodities):</strong>
                          <p className="text-lg">
                            Parafusos, tubulações padrão, óleo comum, equipamentos de escritório, uniformes.
                          </p>
                          <p className="mt-4 font-semibold text-lg text-slate-600">Ação de Suprimento:</p>
                          <p className="text-lg mt-1 text-slate-500">Contratação ágil por pregão eletrônico na Petronect, focada única e exclusivamente no menor preço e prazos céleres de entrega nos pátios de refino.</p>
                        </div>
                      </div>
                    </div>
                  ),
                  icone: <LuBriefcase />,
                },
                {
                  titulo: "Dicas Táticas: Questões Clássicas sobre Inversão de Fases nas Provas",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        A inversão de fases é o calcanhar de Aquiles de muitos candidatos. Memorize o fluxo oficial ditado pela Lei das Estatais em contratações:
                      </p>
                      <div className="p-5 bg-amber-500/5 rounded-xl border border-amber-500/20 text-lg">
                        <span className="font-bold text-amber-800 text-xl block mb-3">Fluxo Licitatório Oficial da Lei 13.303:</span>
                        <div className="flex flex-wrap items-center gap-2 mt-2 font-bold text-slate-800 text-lg">
                          <span>1. Edital</span> <LuChevronRight className="text-amber-500" />
                          <span>2. Propostas</span> <LuChevronRight className="text-amber-500" />
                          <span>3. Julgamento</span> <LuChevronRight className="text-amber-500" />
                          <span>4. Recursos</span> <LuChevronRight className="text-amber-500" />
                          <span className="bg-emerald-500/20 text-emerald-800 p-2 rounded">5. Habilitação (Apenas do Vencedor)</span> <LuChevronRight className="text-amber-500" />
                          <span>6. Homologação</span>
                        </div>
                        <p className="mt-4 text-base text-slate-600">
                          Note que os envelopes de documentação fiscal e trabalhista (habilitação) de todos os perdedores <strong>nunca são abertos</strong>, economizando centenas de horas de conferência burocrática de certidões.
                        </p>
                      </div>
                    </div>
                  ),
                  icone: <LuAward />,
                },
                {
                  titulo: "Exceções e pontos de atenção: A Dispensa em Licitação Fracassada ou Deserta",
                  conteudo: (
                    <div className="space-y-4 text-lg text-slate-700 dark:text-slate-300 text-justify">
                      <p>
                        Um cenário delicado em Suprimentos é a ocorrência de licitações vazias (sem interessados) ou fracassadas (todas as propostas foram desclassificadas por preços abusivos ou descumprimento de especificações).
                      </p>
                      <AlertBox tipo="warning" titulo="A Dispensa Técnica Motivada">
                        <span className="text-lg">
                          A Lei das Estatais prevê a exceção de <strong>Contratação Direta (Dispensa)</strong> caso a licitação anterior tenha sido fracassada ou deserta e sua repetição possa causar sérios prejuízos à operação da Petrobras. Contudo, a gerência de suprimentos deve documentar de forma inequívoca que as condições de mercado originais do edital fracassado foram mantidas e que o preço contratado diretamente está em consonância com as médias de mercado locais.
                        </span>
                      </AlertBox>
                    </div>
                  ),
                  icone: <LuTriangleAlert />,
                },
              ]}
            />
          </div>

                  {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={9}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[9]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A Lei 13.303/2016 (Lei das Estatais) impôs diversas obrigações de governança à Petrobras. Qual das alternativas descreve corretamente uma dessas exigências?"
          alternativas={[
            { letra: "A", texto: "Proibição total de contratar executivos com experiência no setor privado", correta: false },
              { letra: "B", texto: "Obrigatoriedade de Conselho de Administração com maioria de membros independentes e Comitê de Auditoria Estatutário", correta: true },
              { letra: "C", texto: "Eliminação do processo licitatório para compras abaixo de R$ 10 milhões", correta: false },
              { letra: "D", texto: "Vedação de qualquer parceria com empresas estrangeiras no setor de E&P", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
          ]}
          dicaEstrategica="Objetivo: aumentar transparência, accountability e reduzir interferência política."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Lei 13.303/2016: exige Conselho de Administração com 25%+ de membros independentes, Comitê de Auditoria Estatutário, Comitê de Elegibilidade (perfil dos conselheiros), código de conduta, ouvidoria." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={9}
            variant={mv[9]}
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
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-6xl my-6 animate-pulse inline-block">⚖️ 🏢</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg">
                    <div className="p-4 bg-teal-500/10 rounded-xl border border-teal-500/20 text-center">
                      <p className="font-bold text-teal-600 mb-1 text-xl">Regime Licitatório</p>
                      <p className="text-base text-muted-foreground">Regulado pela Lei das Estatais (13.303/16), blindado de regras da lei comum de licitações 14.133/21.</p>
                    </div>
                    <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-center">
                      <p className="font-bold text-cyan-600 mb-1 text-xl">Petronect</p>
                      <p className="text-base text-muted-foreground">Portal eletrônico de compras que operacionaliza a publicidade, isonomia e agilidade comercial das compras.</p>
                    </div>
                    <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center">
                      <p className="font-bold text-emerald-600 mb-1 text-xl">Governança ESG</p>
                      <p className="text-base text-muted-foreground">Compliance, matriz de riscos obrigatória e auditoria DDI integrada para blindar parcerias de suprimentos.</p>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-xl border text-base space-y-2">
                    <p className="font-bold">💡 Dica Quente da CESGRANRIO:</p>
                    <p>• A inversão de fases (proposta antes de habilitação) é a regra legal impositiva das compras das estatais.</p>
                    <p>• As estatais usam o Pregão e o Procedimento Licitatório Próprio, não possuindo modalidade de Diálogo Competitivo.</p>
                  </div>
                </div>
              ),
            }}
            podcast={{
            aulaId: "administracaogeralsuprimento",
            aulaTitulo: "Administracao Geral Suprimento",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 9,
            moduloTitulo: "Módulo 9",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
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
            <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed bg-muted/30 p-6 rounded-2xl border border-border">
              <p>O Simulado Geral representa o coroamento de sua jornada de estudos em Administração Geral para o cargo de Técnico de Suprimentos da Petrobras. Ao longo dos nove módulos anteriores, você percorreu desde os fundamentos básicos do ato de gerenciar (eficiência versus eficácia e os papéis de Mintzberg) até a complexidade legal e de conformidade imposta pela Lei das Estatais (Lei 13.303/16) e o monitoramento estratégico de processos (BPM/BPMN).</p>
              <p>A prova elaborada pela banca CESGRANRIO exige do candidato não apenas a memorização abstrata dos termos, mas a capacidade prática de aplicar teorias de comportamento (vieses decisórios de Simon, fatores motivadores de Herzberg) e design organizacional (estruturas matriciais e unidade de comando) na resolução de casos práticos ambientados no ecossistema de compras de uma grande estatal de energia. Utilize este simulado como termômetro de sua preparação final.</p>
            </div>
          </div>

          <div className="space-y-6">
            <ModuleSectionHeader
              index={2}
              variant={mv[10]}
              title="Checklist de Preparação"
              description="Antes de iniciar o simulado, certifique-se que você domina os pilares estratégicos:"
            />
            <div className="space-y-4">
              <AlertBox tipo="success" titulo="Metas de Aprendizado Consolidadas (Revisão Crítica)">
                <ul className="list-disc pl-6 space-y-3 mt-2 text-lg text-justify">
                  <li><strong>Robert Katz:</strong> Habilidade conceitual predomina no topo estratégico; humanas em todos os níveis; técnicas na base operacional.</li>
                  <li><strong>Mintzberg:</strong> Diferenciar com precisão os papéis interpessoais (liderança, ligação), informacionais (monitor, porta-voz) e decisórios (empreendedor, negociador).</li>
                  <li><strong>Fatores de Herzberg:</strong> Condições físicas de trabalho, políticas da empresa e salário básico são Fatores Higiênicos (extrínsecos, apenas previnem a insatisfação). Reconhecimento e crescimento são Fatores Motivadores (intrínsecos, geram motivação ativa).</li>
                  <li><strong>Estrutura Organizacional:</strong> A estrutura Matricial quebra de forma planejada o princípio de unidade de comando de Fayol para gerenciar projetos integrados sob dupla subordinação.</li>
                  <li><strong>Gestão por Processos:</strong> Modelagem horizontal focada no fluxo de valor de ponta a ponta (As-Is/To-Be). Kaizen realiza melhorias incrementais; Reengenharia promove reestruturações radicais do zero.</li>
                  <li><strong>Lei 13.303/16 (Estatais):</strong> Rito licitatório próprio por meio do portal Petronect, com inversão de fases obrigatória e adoção de matriz de riscos em contratações de engenharia.</li>
                </ul>
              </AlertBox>
            </div>
          </div>

                  {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={10}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[10]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Um gestor da área de manutenção da Petrobras identifica que a taxa de falhas em equipamentos aumentou 15% no último trimestre. Ele define metas de redução, redesenha o processo de manutenção preventiva, lidera a equipe na implementação e monitora os resultados. Quais funções do PODC estão sendo exercidas, respectivamente?"
          alternativas={[
            { letra: "A", texto: "Controlar → Organizar → Planejar → Dirigir", correta: false },
              { letra: "B", texto: "Planejar (metas) → Organizar (redesenho de processo) → Dirigir (liderança) → Controlar (monitoramento)", correta: true },
              { letra: "C", texto: "Dirigir → Planejar → Controlar → Organizar", correta: false },
              { letra: "D", texto: "Organizar → Planejar → Controlar → Dirigir", correta: false },
              { letra: "E", texto: "Nenhuma das alternativas anteriores está correta.", correta: false }
          ]}
          dicaEstrategica="Compreender o PODC em situações práticas é essencial na CESGRANRIO."
          passos={[
            { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas no enunciado." },
            { titulo: "Passo 2: Análise das Alternativas", conteudo: "Esse cenário percorre o PODC completo: Planejar (define metas de redução de falhas) → Organizar (redesenha o processo de manutenção preventiva) → Dirigir (lidera a equipe na implementação) → Controlar (monitora resultados)." },
            { titulo: "Passo 3: Validação da Resposta", conteudo: "Confirmar a alternativa B como a resposta correta." }
          ]}
        />

        <ModuleConsolidation
            index={10}
            variant={mv[10]}
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
              title: "As 10 Diretrizes de Ouro do Candidato de Elite",
              content: (
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-6xl my-6 animate-pulse inline-block">🎓 🏆</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                    <div className="p-5 bg-cyan-500/5 border border-cyan-500/20 rounded-xl space-y-2">
                      <p className="font-bold text-cyan-700 dark:text-cyan-400 text-xl">1. Habilidades & Papéis</p>
                      <ul className="list-disc pl-5 space-y-1 text-base text-muted-foreground">
                        <li>Katz: Conceitual é vital no nível de diretoria estratégica.</li>
                        <li>Mintzberg: Interpessoais, informacionais e decisórios.</li>
                      </ul>
                    </div>
                    <div className="p-5 bg-rose-500/5 border border-rose-500/20 rounded-xl space-y-2">
                      <p className="font-bold text-rose-700 dark:text-rose-400 text-xl">2. Vetor Comportamental</p>
                      <ul className="list-disc pl-5 space-y-1 text-base text-muted-foreground">
                        <li>Herzberg: Salário básico e benefícios evitam insatisfação.</li>
                        <li>Liderança: O estilo deve se adaptar à maturidade da equipe.</li>
                      </ul>
                    </div>
                    <div className="p-5 bg-cyan-500/5 border border-cyan-500/20 rounded-xl space-y-2">
                      <p className="font-bold text-cyan-700 dark:text-cyan-400 text-xl">3. Desenho & Processos</p>
                      <ul className="list-disc pl-5 space-y-1 text-base text-muted-foreground">
                        <li>Matricial: Quebra a unidade de comando linear de Fayol.</li>
                        <li>BPMN: Modelagem horizontal As-Is (atual) e To-Be (futura).</li>
                      </ul>
                    </div>
                    <div className="p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-xl space-y-2">
                      <p className="font-bold text-emerald-700 dark:text-emerald-400 text-xl">4. Tomada de Decisão & Lei 13.303</p>
                      <ul className="list-disc pl-5 space-y-1 text-base text-muted-foreground">
                        <li>Simon: Decisões satisfatórias sob Racionalidade Limitada.</li>
                        <li>Lei 13.303: Inversão de fases poupa tempo administrativo.</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-xl border text-base space-y-2">
                    <p className="font-bold">💡 Diretriz de Ouro CESGRANRIO:</p>
                    <p>• O simulado final reúne 10 questões robustas integrando todos os temas estruturais de administração geral. Resolva com foco nos limites conceituais das teorias.</p>
                  </div>
                </div>
              ),
            }}
            podcast={{
            aulaId: "administracaogeralsuprimento",
            aulaTitulo: "Administracao Geral Suprimento",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 10,
            moduloTitulo: "Módulo 10",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
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
