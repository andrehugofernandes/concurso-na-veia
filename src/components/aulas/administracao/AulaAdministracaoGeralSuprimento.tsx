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
  LuChartBar,
  LuClipboardList,
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
    title: "Simulado Mestre",
  },
] as const;

export default function AulaAdministracaoGeralSuprimento(props: AulaProps) {
  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(),
  );

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) {
      setCompletedModules((prev) => new Set([...prev, moduleId]));
      const progress = Math.round(
        (completedModules.size / (MODULE_DEFS.length - 1)) * 100,
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
  const quizM1 = ADMINISTRACAO_GERAL_QUIZZES["modulo-1"];
  const quizM2 = ADMINISTRACAO_GERAL_QUIZZES["modulo-2"];
  const quizM3 = ADMINISTRACAO_GERAL_QUIZZES["modulo-3"];
  const quizM4 = ADMINISTRACAO_GERAL_QUIZZES["modulo-4"];
  const quizM5 = ADMINISTRACAO_GERAL_QUIZZES["modulo-5"];
  const quizM6 = ADMINISTRACAO_GERAL_QUIZZES["modulo-6"];
  const quizM7 = ADMINISTRACAO_GERAL_QUIZZES["modulo-7"];
  const quizM8 = ADMINISTRACAO_GERAL_QUIZZES["modulo-8"];
  const quizM9 = ADMINISTRACAO_GERAL_QUIZZES["modulo-9"];
  const quizM10 = getRandomQuestions(
    ADMINISTRACAO_GERAL_QUIZZES["modulo-10"] || [],
    10,
  );

  // Variantes de cor pré-computadas
  const mv = Object.fromEntries(
    Array.from({ length: 10 }, (_, i) => [i + 1, getModuleVariant(i + 1)]),
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
      materiaNome="Administração"
      materiaCor={getModuleVariant(1)}
      materiaId="administracao"
      isCompleted={completedModules.size >= MODULE_DEFS.length - 1}
      currentProgress={props.currentProgress}
      onComplete={props.onComplete}
      loading={props.loading}
    >
      {/* ==================== MÓDULO 1 ==================== */}
      <TabsContent value="modulo-1" className="space-y-12 mt-0">
        <ModuleBanner
          numero={1}
          titulo="Fundamentos de Administração"
          descricao="Entenda a essência da administração como processo de planejar, organizar, dirigir e controlar recursos para atingir objetivos organizacionais."
          variant={mv[1]}
        />

        <div className="space-y-6">
          <ModuleSectionHeader
            index={1}
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
                corFundo: "bg-indigo-500/10",
              },
              {
                titulo: "Eficiência vs Eficácia",
                descricao: "Eficiência: fazer certo (máxima produção com mínimos recursos). Eficácia: fazer o certo (atingir objetivos estratégicos). Na Petrobras, ambas são críticas.",
                icone: <LuCheck />,
                corFundo: "bg-blue-500/10",
              },
              {
                titulo: "Universalidade da Administração",
                descricao: "A administração é universal: aplica-se a todas as organizações (públicas, privadas, militares, religiosas) e todas as áreas (produção, vendas, RH, financeira).",
                icone: <LuNetwork />,
                corFundo: "bg-emerald-500/10",
              },
              {
                titulo: "Importância Estratégica",
                descricao: "Em um mercado competitivo de energia global, a qualidade administrativa diferencia entre líderes e seguidores. Para a Petrobras, é questão de sobrevivência.",
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
                titulo: "Conceituação: Administração como Ciência",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      A administração é uma ciência social aplicada que estuda
                      como as organizações funcionam, como as pessoas atuam
                      dentro delas, e como recursos podem ser otimizados. Não é
                      baseada em achismo, mas em princípios, teorias e técnicas
                      comprovadas.
                    </p>
                    <AlertBox tipo="info" titulo="Defesa Acadêmica">
                      Chiavenato define: "Administração é o processo de planejar,
                      organizar, dirigir e controlar o uso de recursos para
                      alcançar objetivos organizacionais."
                    </AlertBox>
                  </div>
                ),
                icone: <LuBookOpen />,
              },
              {
                titulo: "Exemplificação: Os Pilares na Petrobras",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      A Petrobras opera 126 plataformas no pré-sal. Cada uma é
                      um microcosmo administrativo com centenas de pessoas,
                      milhões em recursos e objetivos críticos de segurança e
                      produção.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <h5 className="font-bold flex items-center gap-2">
                          <LuCheck className="text-indigo-500" /> Planejamento
                        </h5>
                        <p className="text-lg">
                          Previsão de produção, orçamento, RH, manutenção
                          preventiva.
                        </p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <h5 className="font-bold flex items-center gap-2">
                          <LuCheck className="text-blue-500" /> Organização
                        </h5>
                        <p className="text-lg">
                          Estrutura de comando, delegação, divisão de tarefas.
                        </p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <h5 className="font-bold flex items-center gap-2">
                          <LuCheck className="text-emerald-500" /> Direção
                        </h5>
                        <p className="text-lg">
                          Liderança, motivação, comunicação da visão e valores.
                        </p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <h5 className="font-bold flex items-center gap-2">
                          <LuCheck className="text-amber-500" /> Controle
                        </h5>
                        <p className="text-lg">
                          Monitoramento de KPIs, auditorias, ajustes de curso.
                        </p>
                      </div>
                    </div>
                  </div>
                ),
                icone: <LuBuilding />,
              },
              {
                titulo: "Dicas Táticas: Questões Cesgranrio",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      A CESGRANRIO cobra definições de conceitos básicos em
                      questões objetivas simples. Você precisa conhecer:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Eficiência:</strong> Relação entre recursos
                        usados e produtos gerados (fazer certo com mínimo custo).
                      </li>
                      <li>
                        <strong>Eficácia:</strong> Capacidade de atingir
                        objetivos propostos (fazer o certo, independente do
                        custo).
                      </li>
                      <li>
                        <strong>Efetividade:</strong> Impacto duradouro dos
                        resultados no ambiente externo (longo prazo).
                      </li>
                    </ul>
                  </div>
                ),
                icone: <LuAward />,
              },
              {
                titulo: "Exceções e Pegadinhas: Contexto de Estatal",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      A Administração na Petrobras não é 100% livre mercado.
                      Existem restrições legais (Lei 13.303/2016, Lei de
                      Licitações, Direito Administrativo).
                    </p>
                    <AlertBox tipo="danger" titulo="Não caia na pegadinha">
                      Muitos acham que empresas modernas são 100% ágeis e sem
                      rigidez. Estatais têm processos legais mandatórios. O
                      desafio é ser eficiente DENTRO da legalidade.
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
                <LuFactory className="text-indigo-500" />
                Projeto Pré-Sal
              </h4>
              <p className="text-lg text-muted-foreground leading-relaxed">
                O Pré-Sal é um exemplo de administração em escala: 126 plataformas,
                ~40 mil colaboradores, orçamento de bilhões. Exige planejamento
                estratégico de longo prazo e controle operacional rígido.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <LuUsers className="text-blue-500" />
                Gestão de Fornecedores
              </h4>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A Petrobras trabalha com ~8 mil fornecedores de bens e serviços.
                Coordenar essa rede requer processos de seleção, negociação,
                monitoramento e controle de qualidade rigorosos.
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
                placeholderColor: "bg-indigo-500/20",
              },
            ],
          }}
          maceteVisual={{
            title: "Lembre-se: PODC",
            content: (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-center">
                  <p className="font-bold text-indigo-600 text-sm">P</p>
                  <p className="text-xs">Planejar</p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-center">
                  <p className="font-bold text-blue-600 text-sm">O</p>
                  <p className="text-xs">Organizar</p>
                </div>
                <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center">
                  <p className="font-bold text-emerald-600 text-sm">D</p>
                  <p className="text-xs">Dirigir</p>
                </div>
                <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-center">
                  <p className="font-bold text-amber-600 text-sm">C</p>
                  <p className="text-xs">Controlar</p>
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
          questoes={quizM1}
          titulo="QUIZ: Fundamentos de Administração"
          numero={1}
          variant={mv[1]}
          onComplete={(score: number) => handleModuleComplete("modulo-1", score)}
        />
      </TabsContent>

      {/* ==================== MÓDULO 2 ==================== */}
      <TabsContent value="modulo-2" className="space-y-12 mt-0">
        <ModuleBanner
          numero={2}
          titulo="Funções Administrativas PODC"
          descricao="Aprofunde nas quatro funções que sustentam a administração: Planejamento, Organização, Direção e Controle."
          variant={mv[2]}
        />

        <div className="space-y-6">
          <ModuleSectionHeader
            index={1}
            variant={mv[2]}
            title="Dossiê das Funções Administrativas"
            description="Entenda como cada função se desdobra em técnicas e ferramentas específicas."
          />
          <CardCarousel
            cards={[
              {
                titulo: "Planejamento",
                descricao: "Define objetivos, estratégias e recursos necessários. Visão de longo prazo (estratégico), médio prazo (tático) e curto prazo (operacional).",
                icone: <LuTarget />,
                corFundo: "bg-emerald-500/10",
              },
              {
                titulo: "Organização",
                descricao: "Estrutura a empresa em departamentos, cargos, hierarquias. Define responsabilidades, autoridades e canais de comunicação.",
                icone: <LuBuilding />,
                corFundo: "bg-teal-500/10",
              },
              {
                titulo: "Direção",
                descricao: "Orienta as pessoas em direção aos objetivos. Envolve liderança, motivação, comunicação e delegação de tarefas.",
                icone: <LuUserPlus />,
                corFundo: "bg-cyan-500/10",
              },
              {
                titulo: "Controle",
                descricao: "Monitora resultados, compara com objetivos, identifica desvios e propõe correções. Fechamento do ciclo administrativo.",
                icone: <LuChartBar />,
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
                titulo: "Conceituação: O Ciclo Administrativo",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      PODC não é linear; é cíclico. Planejamento → Organização →
                      Direção → Controle → feedback que reinicia o planejamento.
                    </p>
                    <AlertBox tipo="info" titulo="Modelo Integrado">
                      Cada função alimenta a próxima. Um planejamento ruim leva
                      a uma organização inadequada, que compromete a direção e
                      torna o controle ineficaz.
                    </AlertBox>
                  </div>
                ),
                icone: <LuNetwork />,
              },
              {
                titulo: "Exemplificação: Planejamento em Suprimento",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Na Petrobras, um Técnico de Suprimento participa
                      ativamente de:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <h5 className="font-bold flex items-center gap-2">
                          <LuCheck className="text-emerald-500" /> Planejamento
                        </h5>
                        <p className="text-lg">
                          Previsão de demanda de materiais, calendário de
                          licitações, orçamento de compras.
                        </p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <h5 className="font-bold flex items-center gap-2">
                          <LuCheck className="text-teal-500" /> Organização
                        </h5>
                        <p className="text-lg">
                          Definição de quem compra, quem aprova, quem recebe e
                          valida qualidade.
                        </p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <h5 className="font-bold flex items-center gap-2">
                          <LuCheck className="text-cyan-500" /> Direção
                        </h5>
                        <p className="text-lg">
                          Comunicação com fornecedores, delegação de tarefas na
                          equipe, motivação.
                        </p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <h5 className="font-bold flex items-center gap-2">
                          <LuCheck className="text-blue-500" /> Controle
                        </h5>
                        <p className="text-lg">
                          Monitoramento de prazos, qualidade, custos, índice de
                          atendimento.
                        </p>
                      </div>
                    </div>
                  </div>
                ),
                icone: <LuBriefcase />,
              },
              {
                titulo: "Dicas Táticas: Cobranças Cesgranrio",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      A banca testa discriminação entre as funções. Cuidado com:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Organização vs Direção:</strong> Organização
                        define ESTRUTURA (cargos, departamentos). Direção trata
                        das PESSOAS (comportamento, motivação).
                      </li>
                      <li>
                        <strong>Planejamento vs Controle:</strong> Planejamento
                        é ANTES (estabelece meta). Controle é DEPOIS (verifica
                        se atingiu).
                      </li>
                    </ul>
                  </div>
                ),
                icone: <LuAward />,
              },
              {
                titulo: "Exceções e Pegadinhas: Integração Necessária",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Muitas bancas tentam isolar as funções em questões
                      independentes. Mas na prática, elas são inseparáveis.
                    </p>
                    <AlertBox tipo="warning" titulo="Atenção">
                      Uma organização mal estruturada não consegue dirigir bem.
                      Direção fraca compromete o controle. Controle inadequado
                      força replanejamento emergencial.
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
          maceteVisual={{
            title: "Diferenciais Críticos",
            content: (
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                  <p className="font-bold text-emerald-600">
                    Planejamento: O QUÊ fazer
                  </p>
                </div>
                <div className="p-3 bg-teal-500/10 rounded-xl border border-teal-500/20">
                  <p className="font-bold text-teal-600">
                    Organização: COMO estruturar
                  </p>
                </div>
                <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                  <p className="font-bold text-cyan-600">
                    Direção: QUEM faz e PORQUÊ
                  </p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                  <p className="font-bold text-blue-600">
                    Controle: VERIFICAÇÃO E AJUSTE
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
          questoes={quizM2}
          titulo="QUIZ: Funções Administrativas PODC"
          numero={2}
          variant={mv[2]}
          onComplete={(score: number) => handleModuleComplete("modulo-2", score)}
        />
      </TabsContent>

      {/* ==================== MÓDULO 3 ==================== */}
      <TabsContent value="modulo-3" className="space-y-12 mt-0">
        <ModuleBanner
          numero={3}
          titulo="Estruturas Organizacionais"
          descricao="Conheça os principais modelos de estrutura organizacional e como a Petrobras se organiza para otimizar processos e decisões."
          variant={mv[3]}
        />

        <div className="space-y-6">
          <ModuleSectionHeader
            index={1}
            variant={mv[3]}
            title="Dossiê de Modelos Estruturais"
            description="Das estruturas clássicas às contemporâneas: escolhendo o melhor modelo para cada contexto."
          />
          <CardCarousel
            cards={[
              {
                titulo: "Estrutura Funcional",
                descricao: "Agrupa funções similares (Produção, Vendas, RH, Financeiro). Simples, eficiente para empresas pequenas. Desafio: isolamento entre áreas.",
                icone: <LuBuilding />,
                corFundo: "bg-violet-500/10",
              },
              {
                titulo: "Estrutura Divisional",
                descricao: "Agrupa por produtos, serviços ou geografias (Downstream, Upstream, E&P). Cada divisão tem sua própria estrutura. Usada pela Petrobras.",
                icone: <LuChartBar />,
                corFundo: "bg-indigo-500/10",
              },
              {
                titulo: "Estrutura Matricial",
                descricao: "Combina funcional e divisional. Um gestor responde a dois chefes (função + projeto). Mais integrada, mas com conflitos potenciais.",
                icone: <LuNetwork />,
                corFundo: "bg-purple-500/10",
              },
              {
                titulo: "Estrutura por Processos",
                descricao: "Organiza-se em volta de processos-chave (Vendas ao Cliente, Produção, Suprimento). Mais ágil, demanda forte coordenação horizontal.",
                icone: <LuActivity />,
                corFundo: "bg-fuchsia-500/10",
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
                titulo: "Conceituação: Estrutura Organizacional",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Estrutura é a forma como a organização se divide em
                      unidades, define responsabilidades e estabelece relações
                      de autoridade e comunicação.
                    </p>
                    <AlertBox tipo="info" titulo="Definição Chiavenato">
                      "Estrutura é o padrão de configuração das posições e
                      unidades de uma organização, definido pelas relações
                      hierárquicas e funcionais."
                    </AlertBox>
                  </div>
                ),
                icone: <LuBookOpen />,
              },
              {
                titulo: "Exemplificação: Estrutura Petrobras",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      A Petrobras usa uma estrutura DIVISIONAL com elementos
                      MATRICIAIS:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Divisões principais:</strong> Upstream (E&P),
                        Downstream (Refino e Distribuição), Gás e Energia,
                        Biocombustíveis.
                      </li>
                      <li>
                        <strong>Funções transversais:</strong> RH, Financeiro,
                        Jurídico, Compliance — atuam em todas as divisões.
                      </li>
                      <li>
                        <strong>Desafio:</strong> Coordenar a Suprimento em
                        ~126 plataformas + ~15 refinarias + ~4.500 postos.
                      </li>
                    </ul>
                  </div>
                ),
                icone: <LuBriefcase />,
              },
              {
                titulo: "Dicas Táticas: Diferenças Clássicas",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      A CESGRANRIO gosta de pedir para comparar estruturas:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-violet-500/10 rounded-lg border border-violet-500/20">
                        <p className="font-bold text-violet-600">Funcional</p>
                        <p className="text-sm">✓ Simples | ✗ Isolamento</p>
                      </div>
                      <div className="p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                        <p className="font-bold text-indigo-600">Divisional</p>
                        <p className="text-sm">✓ Flexível | ✗ Redundância</p>
                      </div>
                      <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                        <p className="font-bold text-purple-600">Matricial</p>
                        <p className="text-sm">✓ Integrada | ✗ Confusão</p>
                      </div>
                      <div className="p-3 bg-fuchsia-500/10 rounded-lg border border-fuchsia-500/20">
                        <p className="font-bold text-fuchsia-600">Processos</p>
                        <p className="text-sm">✓ Ágil | ✗ Complexa</p>
                      </div>
                    </div>
                  </div>
                ),
                icone: <LuAward />,
              },
              {
                titulo: "Exceções e Pegadinhas: Não existe Estrutura Perfeita",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Muitos acham que existe um modelo "melhor" em absoluto.
                      Falso: cada estrutura é otimizada para um contexto.
                    </p>
                    <AlertBox tipo="warning" titulo="Realidade Corporativa">
                      A maioria das grandes corporações usa HÍBRIDOS: divisional
                      base + matriz de projetos + processos. Petrobras é assim.
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
                placeholderColor: "bg-violet-500/20",
              },
            ],
          }}
          maceteVisual={{
            title: "Escolha Rápida",
            content: (
              <div className="text-sm space-y-2">
                <p>
                  <strong className="text-violet-600">Funcional:</strong> Só
                  Pequena Empresa
                </p>
                <p>
                  <strong className="text-indigo-600">Divisional:</strong>{" "}
                  Petrobras usa
                </p>
                <p>
                  <strong className="text-purple-600">Matricial:</strong> Muitos
                  Projetos
                </p>
                <p>
                  <strong className="text-fuchsia-600">Processos:</strong> Muito
                  Ágil
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
          questoes={quizM3}
          titulo="QUIZ: Estruturas Organizacionais"
          numero={3}
          variant={mv[3]}
          onComplete={(score: number) => handleModuleComplete("modulo-3", score)}
        />
      </TabsContent>

      {/* ==================== MÓDULO 4 ==================== */}
      <TabsContent value="modulo-4" className="space-y-12 mt-0">
        <ModuleBanner
          numero={4}
          titulo="Comportamento Organizacional"
          descricao="Entenda como as pessoas atuam dentro das organizações: motivação, liderança, comunicação, trabalho em equipe e cultura organizacional."
          variant={mv[4]}
        />

        <div className="space-y-6">
          <ModuleSectionHeader
            index={1}
            variant={mv[4]}
            title="Dossiê Comportamental"
            description="Os fatores psicossociais que impactam desempenho e satisfação nas organizações."
          />
          <CardCarousel
            cards={[
              {
                titulo: "Motivação",
                descricao: "Força que impulsiona a ação. Teorias: Maslow (necessidades), Herzberg (satisfação), McClelland (realização). Essencial para engajamento.",
                icone: <LuLightbulb />,
                corFundo: "bg-rose-500/10",
              },
              {
                titulo: "Liderança",
                descricao: "Influência exercida para orientar pessoas. Estilos: Autocrático, Democrático, Laissez-faire. Na Petrobras, liderança situacional é preferida.",
                icone: <LuUsers />,
                corFundo: "bg-pink-500/10",
              },
              {
                titulo: "Comunicação",
                descricao: "Troca de informações entre emissor e receptor. Canais: ascendentes, descendentes, horizontais. Barreiras: ruído, interpretação distorcida.",
                icone: <LuHandshake />,
                corFundo: "bg-red-500/10",
              },
              {
                titulo: "Cultura Organizacional",
                descricao: "Conjunto de valores, crenças e normas compartilhadas. Define 'como fazemos as coisas por aqui'. Na Petrobras, segurança é valor central.",
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
                titulo: "Conceituação: Comportamento Organizacional",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Comportamento Organizacional (BO) estuda como indivíduos
                      e grupos agem dentro das organizações. Combina psicologia,
                      sociologia e administração.
                    </p>
                    <AlertBox tipo="info" titulo="Foco Integrador">
                      BO não separa pessoas de processos. Reconhece que a
                      estrutura organizacional afeta o comportamento, que afeta
                      resultados.
                    </AlertBox>
                  </div>
                ),
                icone: <LuBrain />,
              },
              {
                titulo: "Exemplificação: Desafios na Petrobras",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      A Petrobras enfrenta desafios únicos de comportamento:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Ambiente Hostil:</strong> Trabalhar em plataforma
                        offshore cria stress extremo. Necessário equilíbrio.
                      </li>
                      <li>
                        <strong>Hierarquia Rígida:</strong> Tradição militar
                        afeta comunicação. Muitos colaboradores temem falar
                        abertamente com chefes.
                      </li>
                      <li>
                        <strong>Mudança Contínua:</strong> Energia renovável,
                        sustentabilidade. Exige adaptabilidade comportamental.
                      </li>
                    </ul>
                  </div>
                ),
                icone: <LuBriefcase />,
              },
              {
                titulo: "Dicas Táticas: Teoria vs Prática",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      A CESGRANRIO testa teorias de motivação e liderança:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Maslow:</strong> Hierarquia Fisiológica →
                        Segurança → Social → Estima → Auto-realização.
                      </li>
                      <li>
                        <strong>Herzberg:</strong> Fatores de Higiene
                        (evitam insatisfação) vs Motivadores (geram satisfação).
                      </li>
                      <li>
                        <strong>McGregor:</strong> Teoria X (pessoas preguiçosas)
                        vs Teoria Y (pessoas automotivadas).
                      </li>
                    </ul>
                  </div>
                ),
                icone: <LuAward />,
              },
              {
                titulo: "Exceções e Pegadinhas: Contexto Cultural",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Teorias de comportamento foram criadas em contextos
                      ocidentais. Nem sempre valem globalmente.
                    </p>
                    <AlertBox tipo="warning" titulo="Variações Culturais">
                      O que motiva um técnico em Houston pode não motivar um em
                      Macaé. Fatores culturais, religiosos e sociais impactam
                      comportamento.
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
          maceteVisual={{
            title: "Teorias-Chave",
            content: (
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-rose-500/10 rounded border border-rose-500/20">
                  <p className="font-bold">Maslow: Necessidades</p>
                </div>
                <div className="p-2 bg-pink-500/10 rounded border border-pink-500/20">
                  <p className="font-bold">Herzberg: Satisfação</p>
                </div>
                <div className="p-2 bg-red-500/10 rounded border border-red-500/20">
                  <p className="font-bold">McGregor: X vs Y</p>
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
          questoes={quizM4}
          titulo="QUIZ: Comportamento Organizacional"
          numero={4}
          variant={mv[4]}
          onComplete={(score: number) => handleModuleComplete("modulo-4", score)}
        />
      </TabsContent>

      {/* ==================== MÓDULO 5 ==================== */}
      <TabsContent value="modulo-5" className="space-y-12 mt-0">
        <ModuleBanner
          numero={5}
          titulo="Gestão por Processos"
          descricao="Abordagem moderna que organiza a empresa em torno de processos-chave. BPM (Business Process Management) e otimização contínua."
          variant={mv[5]}
        />

        <div className="space-y-6">
          <ModuleSectionHeader
            index={1}
            variant={mv[5]}
            title="Dossiê de Processos"
            description="Do conceito de processo à implementação de BPM em grandes organizações."
          />
          <CardCarousel
            cards={[
              {
                titulo: "O que é um Processo?",
                descricao: "Sequência de atividades inter-relacionadas que transformam entradas (inputs) em saídas (outputs) de valor. Exemplo: Processo de Compra.",
                icone: <LuActivity />,
                corFundo: "bg-cyan-500/10",
              },
              {
                titulo: "BPM (Business Process Management)",
                descricao: "Disciplina que engloba design, modelagem, execução, monitoramento e otimização contínua de processos. Melhoria cíclica.",
                icone: <LuChartBar />,
                corFundo: "bg-teal-500/10",
              },
              {
                titulo: "Mapeamento de Processos",
                descricao: "Ferramentas: Fluxogramas, BPMN (Business Process Model Notation), Diagramas de Valor. Visualiza quem faz o quê, quando e por quê.",
                icone: <LuFileText />,
                corFundo: "bg-green-500/10",
              },
              {
                titulo: "Otimização e Automação",
                descricao: "Identificar gargalos, redundâncias e ineficiências. RPA (Robotic Process Automation) para atividades repetitivas. Lean para eliminar desperdícios.",
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
                titulo: "Conceituação: Process-Centric Organization",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Organizações tradicionais (funcional) olham para
                      atividades ISOLADAS. Organizações por processos (moderna)
                      olham para a CADEIA DE VALOR.
                    </p>
                    <AlertBox tipo="info" titulo="Mudança de Paradigma">
                      Passamos de "Depto de Vendas vende, Depto de Produção
                      produz" para "Processo de Venda ao Cliente envolve: Pré
                      Venda, Venda, Produção, Entrega, Pós Venda."
                    </AlertBox>
                  </div>
                ),
                icone: <LuNetwork />,
              },
              {
                titulo: "Exemplificação: Processo de Compra na Petrobras",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      O Processo de Compra de Materiais em Suprimento segue:
                    </p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>
                        <strong>Identificação da Necessidade:</strong> Requisição
                        de departamento.
                      </li>
                      <li>
                        <strong>Cotação:</strong> Busca de preços com
                        fornecedores pré-qualificados.
                      </li>
                      <li>
                        <strong>Aprovação:</strong> Validação de orçamento e
                        assinatura de gestor.
                      </li>
                      <li>
                        <strong>Pedido:</strong> Emissão de ordem de compra.
                      </li>
                      <li>
                        <strong>Recebimento:</strong> Validação de qualidade e
                        quantidade.
                      </li>
                      <li>
                        <strong>Pagamento:</strong> Verificação de nota fiscal e
                        liberação de cheque.
                      </li>
                    </ol>
                  </div>
                ),
                icone: <LuClipboardList />,
              },
              {
                titulo: "Dicas Táticas: CESGRANRIO e BPM",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      A banca testa conceitos de BPM e Lean Manufacturing:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Gargalo:</strong> Atividade que restringe o
                        fluxo (capacidade menor que as anteriores).
                      </li>
                      <li>
                        <strong>Desperdício Lean:</strong> Atividade que não
                        agrega valor (Transport, Inventory, Motion, Waiting,
                        Overproduction, Overprocessing, Defects).
                      </li>
                      <li>
                        <strong>Value Stream:</strong> Mapeamento de todas as
                        atividades que compõem o processo.
                      </li>
                    </ul>
                  </div>
                ),
                icone: <LuAward />,
              },
              {
                titulo: "Exceções e Pegadinhas: Resistência à Mudança",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Implementar BPM não é só técnico; é organizational.
                      Pessoas resistem a mudanças.
                    </p>
                    <AlertBox tipo="warning" titulo="Desafio Real">
                      Um técnico que sempre recebeu requisições via email pode
                      não gostar de sistema automatizado. Gestão de mudança é
                      crítica para sucesso de BPM.
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
          maceteVisual={{
            title: "BPM em 5 Passos",
            content: (
              <div className="space-y-2 text-sm">
                <p>1. <strong>Mapear</strong> o processo atual</p>
                <p>2. <strong>Analisar</strong> gargalos e desperdícios</p>
                <p>3. <strong>Redesenhar</strong> o processo ideal</p>
                <p>4. <strong>Automatizar</strong> atividades repetitivas</p>
                <p>5. <strong>Monitorar</strong> e otimizar continuamente</p>
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
          questoes={quizM5}
          titulo="QUIZ: Gestão por Processos"
          numero={5}
          variant={mv[5]}
          onComplete={(score: number) => handleModuleComplete("modulo-5", score)}
        />
      </TabsContent>

      {/* ==================== MÓDULO 6 ==================== */}
      <TabsContent value="modulo-6" className="space-y-12 mt-0">
        <ModuleBanner
          numero={6}
          titulo="Teoria das Organizações"
          descricao="Evolução histórica do pensamento administrativo: de Taylor à Contingência. Escolas, correntes e como elas moldaram a administração moderna."
          variant={mv[6]}
        />

        <div className="space-y-6">
          <ModuleSectionHeader
            index={1}
            variant={mv[6]}
            title="Dossiê Histórico-Teórico"
            description="As grandes escolas e teorias que fundamentam a administração contemporânea."
          />
          <CardCarousel
            cards={[
              {
                titulo: "Administração Científica (Taylor)",
                descricao: "Foco em eficiência de tarefas, estudo de tempos e movimentos. Abordagem bottom-up. Era: ~1911.",
                icone: <LuSearchCode />,
                corFundo: "bg-blue-500/10",
              },
              {
                titulo: "Teoria Clássica (Fayol)",
                descricao: "14 princípios e 5 funções administrativas. Abordagem top-down. Foco em estrutura. Era: ~1916.",
                icone: <LuBuilding />,
                corFundo: "bg-indigo-500/10",
              },
              {
                titulo: "Relações Humanas (Mayo)",
                descricao: "Reconhece fatores psicossociais. Grupos informais importam. Humanização do trabalho. Era: ~1924-1932.",
                icone: <LuUsers />,
                corFundo: "bg-purple-500/10",
              },
              {
                titulo: "Contingência (Lawrence & Lorsch)",
                descricao: "Não existe estrutura ideal. Depende do ambiente, tecnologia, estratégia. Abordagem moderna e situacional. Era: ~1967+",
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
                titulo: "Conceituação: Escolas Administrativas",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Cada escola reflete o contexto de sua época: a
                      Administração Científica surgiu na Era Industrial (foco
                      em produção). Relações Humanas surgiu na crise pós-guerra
                      (foco em pessoas).
                    </p>
                    <AlertBox tipo="info" titulo="Não são Obsoletas">
                      Teorias antigas ainda são válidas. Taylor é usado em
                      operações com tarefas repetitivas. Fayol fundamenta
                      estruturas de grandes empresas.
                    </AlertBox>
                  </div>
                ),
                icone: <LuBookOpen />,
              },
              {
                titulo: "Exemplificação: Evolução na Petrobras",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      A Petrobras passou por todas essas fases:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Anos 1950s (Científica):</strong> Foco em
                        eficiência de perfuração, produção em massa.
                      </li>
                      <li>
                        <strong>Anos 1970-80s (Clássica):</strong> Estrutura
                        hierárquica rígida, planejamento formal.
                      </li>
                      <li>
                        <strong>Anos 1990s (Relações Humanas):</strong> Programas
                        de RH, sindicalismo, clima organizacional.
                      </li>
                      <li>
                        <strong>2000s+ (Contingência):</strong> Ágil, adaptável,
                        focada em contexto (E&P diferente de Refino).
                      </li>
                    </ul>
                  </div>
                ),
                icone: <LuBriefcase />,
              },
              {
                titulo: "Dicas Táticas: O que CESGRANRIO Testa",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      A banca testa MUITO cronologia e características:
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="p-2 bg-blue-500/10 rounded border border-blue-500/20">
                        <p><strong>Taylor:</strong> "Chão de fábrica" + Tempos + Movimentos</p>
                      </div>
                      <div className="p-2 bg-indigo-500/10 rounded border border-indigo-500/20">
                        <p><strong>Fayol:</strong> "14 Princípios" + "Funções Adm" + Top-down</p>
                      </div>
                      <div className="p-2 bg-purple-500/10 rounded border border-purple-500/20">
                        <p><strong>Mayo:</strong> Hawthorne + "Fator Humano" + Grupos</p>
                      </div>
                      <div className="p-2 bg-amber-500/10 rounded border border-amber-500/20">
                        <p><strong>Contingência:</strong> "Depende do contexto" + Situacional</p>
                      </div>
                    </div>
                  </div>
                ),
                icone: <LuAward />,
              },
              {
                titulo: "Exceções e Pegadinhas: Síntese, Não Substituição",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Pegadinha comum: "A Contingência substituiu a Clássica?"
                      Errado. Todas coexistem.
                    </p>
                    <AlertBox tipo="danger" titulo="Cuidado">
                      Contingência não elimina Taylor ou Fayol. Apenas reconhece
                      que aplicar a mesma estrutura a TODOS os contextos é
                      ineficaz.
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
          maceteVisual={{
            title: "Ordem Cronológica",
            content: (
              <div className="space-y-2 text-sm">
                <p>1911: <strong>Taylor</strong> - Científica</p>
                <p>1916: <strong>Fayol</strong> - Clássica</p>
                <p>1924: <strong>Mayo</strong> - Relações Humanas</p>
                <p>1967: <strong>Lawrence & Lorsch</strong> - Contingência</p>
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
          questoes={quizM6}
          titulo="QUIZ: Teoria das Organizações"
          numero={6}
          variant={mv[6]}
          onComplete={(score: number) => handleModuleComplete("modulo-6", score)}
        />
      </TabsContent>

      {/* ==================== MÓDULO 7 ==================== */}
      <TabsContent value="modulo-7" className="space-y-12 mt-0">
        <ModuleBanner
          numero={7}
          titulo="Comunicação e Conflitos"
          descricao="A comunicação como processo vital. Canais, barreiras, feedback. Conflitos: naturais, necessários, podem ser construtivos ou destrutivos."
          variant={mv[7]}
        />

        <div className="space-y-6">
          <ModuleSectionHeader
            index={1}
            variant={mv[7]}
            title="Dossiê de Comunicação"
            description="Fundamentos e práticas de comunicação organizacional eficaz."
          />
          <CardCarousel
            cards={[
              {
                titulo: "Modelo de Comunicação",
                descricao: "Emissor → Codificação → Mensagem → Canal → Receptor → Decodificação → Feedback. Cada etapa pode ter ruído e distorção.",
                icone: <LuHandshake />,
                corFundo: "bg-teal-500/10",
              },
              {
                titulo: "Tipos de Canais",
                descricao: "Ascendentes (para cima), Descendentes (para baixo), Horizontais (lateral). Formais (oficiais) vs Informais (rádio peão).",
                icone: <LuNetwork />,
                corFundo: "bg-cyan-500/10",
              },
              {
                titulo: "Barreiras de Comunicação",
                descricao: "Ruído, linguagem complexa, preconceitos, distância, tecnologia. Prejudicam compreensão e feedback.",
                icone: <LuTriangleAlert />,
                corFundo: "bg-orange-500/10",
              },
              {
                titulo: "Feedback",
                descricao: "Retorno de informação. Essencial para validar compreensão. Deve ser claro, específico e construtivo.",
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
                titulo: "Conceituação: Comunicação Eficaz",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Comunicação é mais que transmitir informação: é garantir
                      COMPREENSÃO. Se o receptor não entendeu como o emissor
                      pretendia, houve falha.
                    </p>
                    <AlertBox tipo="info" titulo="Responsabilidade Bilateral">
                      Tanto emissor (clareza) quanto receptor (escuta ativa)
                      são responsáveis pelo sucesso da comunicação.
                    </AlertBox>
                  </div>
                ),
                icone: <LuBookOpen />,
              },
              {
                titulo: "Exemplificação: Conflitos em Suprimento",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Suprimento frequentemente enfrenta conflitos com outras áreas:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Com Produção:</strong> "Por que não conseguem
                        material a tempo?" (falta de planejamento prévio).
                      </li>
                      <li>
                        <strong>Com Financeiro:</strong> "Por que compram item
                        caro?" (qualidade e prazo justificam preço).
                      </li>
                      <li>
                        <strong>Com Vendedor:</strong> "Por que seu produto é
                        ruim?" (falta de especificação clara).
                      </li>
                    </ul>
                    <p className="mt-3">
                      <strong>Solução:</strong> Comunicação clara sobre critérios
                      antes de fazer, não depois.
                    </p>
                  </div>
                ),
                icone: <LuBriefcase />,
              },
              {
                titulo: "Dicas Táticas: Conflitos Construtivos",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      A CESGRANRIO testa se você sabe que conflito nem sempre é
                      ruim:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-green-500/10 rounded border border-green-500/20">
                        <p className="font-bold text-green-600">Construtivo</p>
                        <p className="text-sm">Leva a inovação, melhoria de
                          processos</p>
                      </div>
                      <div className="p-3 bg-red-500/10 rounded border border-red-500/20">
                        <p className="font-bold text-red-600">Destrutivo</p>
                        <p className="text-sm">Cria ambiente tóxico, reduz
                          produtividade</p>
                      </div>
                    </div>
                  </div>
                ),
                icone: <LuAward />,
              },
              {
                titulo: "Exceções e Pegadinhas: Evitar vs Resolver",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Pegadinha: "Bom gerente evita conflitos." Falso. Bom
                      gerente FACILITA resolução construtiva.
                    </p>
                    <AlertBox tipo="warning" titulo="Realidade">
                      Suprimir conflito (evitar) é pior que resolvê-lo. Conflito
                      suprimido reaparece com mais força depois.
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
          maceteVisual={{
            title: "Escuta Ativa",
            content: (
              <div className="space-y-2 text-sm">
                <p>✓ <strong>Ouça</strong> sem interromper</p>
                <p>✓ <strong>Confirme</strong> o que entendeu</p>
                <p>✓ <strong>Faça</strong> perguntas clarificadoras</p>
                <p>✓ <strong>Valide</strong> sentimentos</p>
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
          questoes={quizM7}
          titulo="QUIZ: Comunicação e Conflitos"
          numero={7}
          variant={mv[7]}
          onComplete={(score: number) => handleModuleComplete("modulo-7", score)}
        />
      </TabsContent>

      {/* ==================== MÓDULO 8 ==================== */}
      <TabsContent value="modulo-8" className="space-y-12 mt-0">
        <ModuleBanner
          numero={8}
          titulo="Decisão e Inovação"
          descricao="Processo decisório nas organizações: tipos, modelos, técnicas. Inovação: necessidade estratégica na era do conhecimento."
          variant={mv[8]}
        />

        <div className="space-y-6">
          <ModuleSectionHeader
            index={1}
            variant={mv[8]}
            title="Dossiê Decisório"
            description="Tipos de decisão, modelos de decisão, técnicas e armadilhas cognitivas."
          />
          <CardCarousel
            cards={[
              {
                titulo: "Decisão Programada",
                descricao: "Rotineira, previsível, com critérios claros. Ex: Compra de material padrão. Pode ser delegada, automatizada.",
                icone: <LuClipboardList />,
                corFundo: "bg-blue-500/10",
              },
              {
                titulo: "Decisão Não-Programada",
                descricao: "Singular, complexa, sem precedente. Ex: Fechar uma unidade. Exige análise profunda, risco elevado, nível executivo.",
                icone: <LuBrain />,
                corFundo: "bg-purple-500/10",
              },
              {
                titulo: "Modelo Racional",
                descricao: "Identificar problema, gerar alternativas, avaliar consequências, escolher ótima. Ideal, raramente executado perfeitamente.",
                icone: <LuSearch />,
                corFundo: "bg-emerald-500/10",
              },
              {
                titulo: "Inovação e Criatividade",
                descricao: "Gerar novas ideias, testar, aprender com falhas. Cultura de inovação em Petrobras é crítica para competitividade em energias limpas.",
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
                titulo: "Conceituação: Decisão Administrativa",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Decisão é escolha entre alternativas. Na administração,
                      envolve recursos, pessoas, tempo. Toda decisão tem
                      consequências (positivas ou negativas).
                    </p>
                    <AlertBox tipo="info" titulo="Modelo Clássico">
                      Simon propõe que decisões são racionalmente LIMITADAS:
                      não temos informação perfeita nem tempo ilimitado. Logo,
                      satisfazemos (buscamos bom, não perfeito).
                    </AlertBox>
                  </div>
                ),
                icone: <LuBookOpen />,
              },
              {
                titulo: "Exemplificação: Decisão em Suprimento",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Técnico de Suprimento enfrenta decisões diárias:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Programada:</strong> "Qual fornecedor usar para
                        parafusos?" (Critério: preço + qualidade + prazo, já
                        temos processo definido).
                      </li>
                      <li>
                        <strong>Não-Programada:</strong> "Manter fornecedor que
                        atrasa ou trocar?" (Análise complexa: custo de troca,
                        impacto operacional, alternativas).
                      </li>
                      <li>
                        <strong>Inovação:</strong> "Adotar blockchain para
                        rastreabilidade de materiais?" (Benefício a longo prazo,
                        investimento alto, risco de falha).
                      </li>
                    </ul>
                  </div>
                ),
                icone: <LuBriefcase />,
              },
              {
                titulo: "Dicas Táticas: Armadilhas Cognitivas",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      A banca pode testar se você conhece vieses de decisão:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Viés de Confirmação:</strong> Buscar informações
                        que confirmem sua opinião (ignorar contrários).
                      </li>
                      <li>
                        <strong>Ancoragem:</strong> Fixar-se no primeiro número
                        ouvido, ignorar novos dados.
                      </li>
                      <li>
                        <strong>Aversão ao Risco:</strong> Preferir perder
                        ganho certo a ganhar arriscado.
                      </li>
                    </ul>
                  </div>
                ),
                icone: <LuAward />,
              },
              {
                titulo: "Exceções e Pegadinhas: Inovação ≠ Sempre Bem",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Muitos acham que inovar é sempre bom. Contexto importa.
                    </p>
                    <AlertBox tipo="warning" titulo="Realidade">
                      Em Suprimento, inovação pode aumentar custo ou risco.
                      Exemplo: Material novo sem histórico de qualidade em
                      plataforma crítica = perigo. Inovação deve ser calculada,
                      não impulsiva.
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
          maceteVisual={{
            title: "Passos da Decisão Racional",
            content: (
              <div className="space-y-2 text-xs">
                <p>1. <strong>Identificar</strong> o problema</p>
                <p>2. <strong>Gerar</strong> alternativas</p>
                <p>3. <strong>Avaliar</strong> consequências</p>
                <p>4. <strong>Escolher</strong> melhor opção</p>
                <p>5. <strong>Implementar</strong> decisão</p>
                <p>6. <strong>Aprender</strong> com resultado</p>
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
          questoes={quizM8}
          titulo="QUIZ: Decisão e Inovação"
          numero={8}
          variant={mv[8]}
          onComplete={(score: number) => handleModuleComplete("modulo-8", score)}
        />
      </TabsContent>

      {/* ==================== MÓDULO 9 ==================== */}
      <TabsContent value="modulo-9" className="space-y-12 mt-0">
        <ModuleBanner
          numero={9}
          titulo="Administração na Petrobras"
          descricao="Aplicação prática: desafios únicos de suprimento em uma estatal de energia. Leis 13.303, processos, fornecedores, sustentabilidade."
          variant={mv[9]}
        />

        <div className="space-y-6">
          <ModuleSectionHeader
            index={1}
            variant={mv[9]}
            title="Dossiê Petrobras"
            description="Realidades administrativas, desafios operacionais e contexto estratégico."
          />
          <CardCarousel
            cards={[
              {
                titulo: "Lei das Estatais (13.303/2016)",
                descricao: "Governa compras públicas na Petrobras. Exige licitações, transparência, compliance rigoroso. Diferencia de mercado privado.",
                icone: <LuScale />,
                corFundo: "bg-slate-500/10",
              },
              {
                titulo: "Gestão de Fornecedores",
                descricao: "Petrobras trabalha com ~8 mil fornecedores. Qualificação rigorosa, auditorias, sistema de avaliação. Crítico para suprimento estratégico.",
                icone: <LuTruck />,
                corFundo: "bg-stone-500/10",
              },
              {
                titulo: "Sustentabilidade e ESG",
                descricao: "Pressão crescente para transição energética. Critérios ESG (Environmental, Social, Governance) afetam seleção de fornecedores e projetos.",
                icone: <LuShield />,
                corFundo: "bg-green-500/10",
              },
              {
                titulo: "Cadeias de Suprimento Críticas",
                descricao: "126 plataformas, 15+ refinarias, 4.500+ postos. Cada unidade depende de suprimento robusto. Falha em um = paralisação operacional.",
                icone: <LuPackage />,
                corFundo: "bg-red-500/10",
              },
            ]}
          />
        </div>

        <div className="space-y-6">
          <ModuleSectionHeader
            index={2}
            variant={mv[9]}
            title="Análise Técnica C.E.D.E."
            description="Desafios e soluções administrativas na realidade Petrobras."
          />
          <ContentAccordion
            slides={[
              {
                titulo: "Conceituação: Administração em Contexto Público",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Administração em estatais difere de privadas. Principais
                      diferenças:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Accountability:</strong> Responsabilidade pública
                        (sociedade, governo, órgãos de controle).
                      </li>
                      <li>
                        <strong>Transparência:</strong> Decisões devem ser
                        justificáveis e documentadas (auditoria).
                      </li>
                      <li>
                        <strong>Legalidade:</strong> Toda ação deve estar
                        fundamentada em lei ou regulamento.
                      </li>
                      <li>
                        <strong>Impessoalidade:</strong> Decisões por critérios
                        objetivos, não pessoais.
                      </li>
                    </ul>
                  </div>
                ),
                icone: <LuBookOpen />,
              },
              {
                titulo: "Exemplificação: Compra de Materiais",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Em uma empresa privada: CEO decide comprar de fornecedor Y
                      porque é amigo. Na Petrobras:
                    </p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>
                        <strong>Licitação obrigatória:</strong> Publicar edital
                        com critérios (preço mín 50%, qualidade 30%, prazo 20%).
                      </li>
                      <li>
                        <strong>Concorrência:</strong> Mínimo 3 fornecedores
                        qualificados devem concorrer.
                      </li>
                      <li>
                        <strong>Transparência:</strong> Resultado publicado,
                        fornecedor perdedor pode contestar.
                      </li>
                      <li>
                        <strong>Auditoria:</strong> Órgão de controle (TCU)
                        pode revisar a decisão até 1 ano depois.
                      </li>
                    </ol>
                  </div>
                ),
                icone: <LuBriefcase />,
              },
              {
                titulo: "Dicas Táticas: Temas Críticos CESGRANRIO",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Para Petrobras, a banca testa:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Lei 13.303:</strong> Quais são os princípios
                        (legalidade, moralidade, transparência)?
                      </li>
                      <li>
                        <strong>Licitação:</strong> Quais os tipos (aberta,
                        restrita, concorrência, tomada de preço)?
                      </li>
                      <li>
                        <strong>Bom Uso de Dinheiro Público:</strong> Eficiência,
                        não apenas menor preço.
                      </li>
                      <li>
                        <strong>Sustentabilidade:</strong> Lei 14.133/2021
                        exige critérios ESG em licitações.
                      </li>
                    </ul>
                  </div>
                ),
                icone: <LuAward />,
              },
              {
                titulo: "Exceções e Pegadinhas: Rigidez ≠ Ineficiência",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Pegadinha: "Lei 13.303 deixa Petrobras lenta." Errado. A
                      lei permite celeridade com accountability.
                    </p>
                    <AlertBox tipo="warning" titulo="Verdade">
                      Processos bem desenhados (que respeitam lei) são MAIS
                      rápidos que improvisação. Petrobras compra bilhões por
                      ano, tudo com licitação.
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
          maceteVisual={{
            title: "Lei 13.303 - Princípios",
            content: (
              <div className="space-y-1 text-xs">
                <p>🔐 <strong>Legalidade</strong> - Respeitar lei</p>
                <p>🤝 <strong>Moralidade</strong> - Ética pública</p>
                <p>📢 <strong>Transparência</strong> - Aberto ao público</p>
                <p>💰 <strong>Eficiência</strong> - Máxima qualidade, mín custo</p>
                <p>🎯 <strong>Impessoalidade</strong> - Critérios objetivos</p>
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
          questoes={quizM9}
          titulo="QUIZ: Administração na Petrobras"
          numero={9}
          variant={mv[9]}
          onComplete={(score: number) => handleModuleComplete("modulo-9", score)}
        />
      </TabsContent>

      {/* ==================== MÓDULO 10 ==================== */}
      <TabsContent value="modulo-10" className="space-y-12 mt-0">
        <ModuleBanner
          numero={10}
          titulo="Simulado Mestre"
          descricao="Consolidação de todos os 9 módulos anteriores. 10 questões integradas cobrindo fundamentos, teorias, processos e contexto Petrobras."
          variant={mv[10]}
        />

        <div className="space-y-6">
          <ModuleSectionHeader
            index={1}
            variant={mv[10]}
            title="Síntese Integradora"
            description="Antes do simulado: revise os conceitos-chave de cada módulo."
          />
          <CardCarousel
            cards={[
              {
                titulo: "M1-M2: Fundamentals",
                descricao: "PODC, 4 pilares, definição de administração, eficiência vs eficácia. Base para tudo mais.",
                icone: <LuBookOpen />,
                corFundo: "bg-indigo-500/10",
              },
              {
                titulo: "M3-M4: Estrutura e Gente",
                descricao: "Estruturas organizacionais, comportamento, motivação, liderança. A parte 'viva' da administração.",
                icone: <LuUsers />,
                corFundo: "bg-rose-500/10",
              },
              {
                titulo: "M5-M6: Processos e Evolução",
                descricao: "BPM, mapeamento de processos, escolas administrativas. Entender mudança e otimização.",
                icone: <LuNetwork />,
                corFundo: "bg-cyan-500/10",
              },
              {
                titulo: "M7-M9: Integração Final",
                descricao: "Comunicação, conflitos, decisão, inovação, Lei 13.303. Aplicação prática na Petrobras real.",
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
            description="Antes do simulado, certifique-se que você domina:"
          />
          <div className="space-y-4">
            <AlertBox tipo="success" titulo="Conceitos Críticos">
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Definição de administração (PODC)</li>
                <li>Diferença entre estruturas (funcional, divisional, matricial, processos)</li>
                <li>Teorias de motivação (Maslow, Herzberg, McGregor)</li>
                <li>Escolas administrativas cronologicamente (Taylor, Fayol, Mayo, Contingência)</li>
                <li>BPM e mapeamento de processos</li>
                <li>Lei 13.303 princípios e aplicação</li>
                <li>Comunicação eficaz e gestão de conflitos</li>
                <li>Decisão programada vs não-programada</li>
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
                placeholderColor: "bg-indigo-500/20",
              },
            ],
          }}
          maceteVisual={{
            title: "As 10 Ideias-Chave",
            content: (
              <div className="text-xs space-y-1">
                <p>1️⃣ Administração = PODC</p>
                <p>2️⃣ Estrutura molda comportamento</p>
                <p>3️⃣ Pessoas motivadas = melhor resultado</p>
                <p>4️⃣ Comunicação clara evita conflitos</p>
                <p>5️⃣ BPM otimiza processos</p>
                <p>6️⃣ Teorias evoluem, mas todas valem</p>
                <p>7️⃣ Decisão deve ser racional</p>
                <p>8️⃣ Inovação é necessária</p>
                <p>9️⃣ Lei 13.303 é essencial em Petrobras</p>
                <p>🔟 Contexto sempre importa</p>
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
          titulo="SIMULADO MESTRE: Administração Geral Completa"
          numero={10}
          variant={mv[10]}
          onComplete={(score: number) => handleModuleComplete("modulo-10", score)}
        />
      </TabsContent>
    </AulaTemplate>
  );
}
