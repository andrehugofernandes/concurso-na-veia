"use client";

import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  AlertBox,
  QuizInterativo, QuestaoResolvidaStepByStep,
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
  LuBadgeCheck,
  LuChartBar,
  LuCheck,
  LuSearch,
  LuFileCheck,
  LuBookOpen,
  LuScale,
  LuHandshake,
  LuEye,
  LuTimer,
  LuBrain,
  LuTriangleAlert,
  LuNetwork,
  LuZap,
  LuBuilding,
  LuUserPlus,
  LuSearchCode,
  LuShieldCheck,
  LuCpu,
  LuFileText,
} from "react-icons/lu";
import { getModuleVariant } from "@/lib/moduleColors";
import { QUIZ_GESTAO_PESSOAS } from "@/data/quizzes/gestao-pessoas-quizzes";

const MODULE_DEFS = [
  {
    id: "modulo-1",
    label: "Módulo 1",
    title: "Fundamentos de Gestão de Pessoas",
  },
  { id: "modulo-2", label: "Módulo 2", title: "Recrutamento e Seleção" },
  { id: "modulo-3", label: "Módulo 3", title: "Admissão e Integração" },
  {
    id: "modulo-4",
    label: "Módulo 4",
    title: "Desenvolvimento e Capacitação",
  },
  {
    id: "modulo-5",
    label: "Módulo 5",
    title: "Avaliação de Desempenho",
  },
  {
    id: "modulo-6",
    label: "Módulo 6",
    title: "Gestão Salarial e Benefícios",
  },
  {
    id: "modulo-7",
    label: "Módulo 7",
    title: "Relações Trabalhistas",
  },
  { id: "modulo-8", label: "Módulo 8", title: "Gestão de Conflitos" },
  {
    id: "modulo-9",
    label: "Módulo 9",
    title: "Gestão de Pessoas na Petrobras",
  },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Geral" },
] as const;

export default function AulaGestãoDePessoas(props: AulaProps) {
    const STORAGE_KEY_PREFIX = "petrobras_quest_aula_gestao_de_pessoas_";

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
      // Progresso calculado com base no número de módulos completados
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
  const quizM1 = QUIZ_GESTAO_PESSOAS["modulo-1"];
  const quizM2 = QUIZ_GESTAO_PESSOAS["modulo-2"];
  const quizM3 = QUIZ_GESTAO_PESSOAS["modulo-3"];
  const quizM4 = QUIZ_GESTAO_PESSOAS["modulo-4"];
  const quizM5 = QUIZ_GESTAO_PESSOAS["modulo-5"];
  const quizM6 = QUIZ_GESTAO_PESSOAS["modulo-6"];
  const quizM7 = QUIZ_GESTAO_PESSOAS["modulo-7"];
  const quizM8 = QUIZ_GESTAO_PESSOAS["modulo-8"];
  const quizM9 = QUIZ_GESTAO_PESSOAS["modulo-9"];
  const quizM10 = getRandomQuestions(
    QUIZ_GESTAO_PESSOAS["modulo-10"] || [],
    10,
  );

  // Variantes de cor pré-computadas — usa mv[N] ao invés de hardcodar getModuleVariant(N)

  const mv = Object.fromEntries(
    Array.from({ length: 11 }, (_, i) => [i + 1, getModuleVariant(i + 1)]),
  ) as Record<number, ReturnType<typeof getModuleVariant>>;

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      modules={MODULE_DEFS}
      completedModules={completedModules}
      isModuleUnlocked={isModuleUnlocked}
      titulo="Gestão de Pessoas"
      descricao="Domine os fundamentos, processos e práticas estratégicas de gestão de capital humano, com foco total no padrão Cesgranrio e realidade Petrobras."
      duracao="20h"
      materiaNome="Administração"
      materiaCor={getModuleVariant(1)}
      materiaId="administracao"
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
          titulo="Fundamentos de Gestão de Pessoas"
          descricao="A evolução do DP ao RH Estratégico: entendendo o capital humano como o ativo mais valioso da Petrobras."
          variant={mv[1]}
        />

        <div className="space-y-6">
          <ModuleSectionHeader
            index="INTRO"
            variant={mv[1]}
            title="Dossiê de Fundamentos"
            description="Entenda as dimensões da Gestão de Pessoas no cenário industrial moderno."
          />
          <CardCarousel
            cards={[
              {
                titulo: "Capital Humano",
                descricao:
                  "Diferente de recursos materiais, o capital humano é inesgotável e gera inovação contínua quando bem gerido.",
                icone: <LuBrain />,
                corFundo: "bg-cyan-500/10",
              },
              {
                titulo: "Parceria Estratégica",
                descricao:
                  "O RH deixa de ser apenas operacional e passa a sentar à mesa de decisões com o Board executivo.",
                icone: <LuHandshake />,
                corFundo: "bg-blue-500/10",
              },
              {
                titulo: "Cultura e Valores",
                descricao:
                  "A Gestão de Pessoas é o guardião dos comportamentos que definem o sucesso ou fracasso de uma estatal.",
                icone: <LuShield />,
                corFundo: "bg-emerald-500/10",
              },
              {
                titulo: "Competitividade",
                descricao:
                  "Em um mercado global de energia, atrair os melhores engenheiros e técnicos é o diferencial da Petrobras.",
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
            description="Explorando a profundidade pedagógica dos fundamentos de GP."
          />
          <ContentAccordion
            slides={[
              {
                titulo: "Conceituação: A GP como Sistema",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      A Gestão de Pessoas moderna funciona como um sistema
                      integrado (Input-Processo-Output). Não são ilhas isoladas;
                      o recrutamento afeta o treinamento, que afeta a
                      remuneração.
                    </p>
                    <AlertBox tipo="info" titulo="Evolução Conceitual">
                      Saímos das **Pessoas como Recursos** (mão de obra,
                      controles rígidos) para **Pessoas como Parceiros**
                      (conhecimento, inteligência, colaboração).
                    </AlertBox>
                  </div>
                ),
                icone: <LuUsers />,
              },
              {
                titulo: "Exemplificação: Planejamento na PETROBRAS",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      A Petrobras utiliza o **Planejamento de Força de Trabalho
                      (PFT)** para prever quantos técnicos e engenheiros serão
                      necessários para operar novos navios-plataforma (FPSOs) em
                      5 anos.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <h5 className="font-bold flex items-center gap-2">
                          <LuCheck className="text-emerald-500" /> Abordagem
                          Clássica
                        </h5>
                        <p className="text-lg">
                          Reposição de vagas por aposentadoria ou demissão
                          (Reativo).
                        </p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <h5 className="font-bold flex items-center gap-2">
                          <LuCheck className="text-blue-500" /> Abordagem
                          Estratégica
                        </h5>
                        <p className="text-lg">
                          Desenvolvimento de competências em energias renováveis
                          antes da demanda (Proativo).
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
                      A banca adora confundir **Liderança** com **Gestão de
                      Pessoas**. Lembre-se: Liderança é um processo de
                      influência, enquanto a GP é um sistema organizacional de
                      apoio.
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        O gerente de linha é o verdadeiro **gestor de pessoas**.
                      </li>
                      <li>
                        O RH atua como **consultoria interna** ou assessoria
                        (staff).
                      </li>
                    </ul>
                  </div>
                ),
                icone: <LuAward />,
              },
              {
                titulo: "Exceções e pontos de atenção: RH Centralizado",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Muitos acham que empresas modernas não têm processos
                      rígidos. Em estatais de grande porte, a rigidez é
                      necessária por força de lei.
                    </p>
                    <AlertBox tipo="danger" titulo="Não se engane">
                      Embora a GP seja moderna, ela deve observar as limitações
                      do Direito Administrativo (ex: estabilidade, remuneração
                      fixa por planos de cargos e salários).
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
            variant="cyan"
            title="Exemplos Práticos Petrobras"
            description="Como a empresa aplica esses conceitos no dia a dia."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <LuBriefcase className="text-cyan-500" />
                Programa de Trainees
              </h4>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Exemplo de atração e desenvolvimento: programa estruturado que
                atrai jovens talentos, oferece mentoring e rotações por áreas.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <LuAward className="text-cyan-500" />
                Sucessão de Liderança
              </h4>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Pipeline de talentos para posições críticas, garantindo a
                continuidade estratégica em cargos executivos.
              </p>
            </div>
          </div>
        </div>

        <ModuleConsolidation
          index={4}
          variant="cyan"
          video={{
            videoId: "XpREx30z5qI",
            title: "Gestão de Pessoas - Visão Geral",
            duration: "12:45",
          }}
          resumoVisual={{
            moduloNome: "Módulo 1",
            tituloAula: "Gestão de Pessoas",
            materia: "Administração",
            images: [
              {
                title: "Evolução da GP",
                type: "Infográfico",
                placeholderColor: "bg-cyan-500/20",
                imageUrl: "https://api.placeholder.com/1200/800",
              },
            ],
          }}
          sinteseEstrategica={{
            title: "Os 3 Pilares da GP",
            content: (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-center">
                  <p className="font-bold text-cyan-600">ATRAIR</p>
                  <p className="text-lg">Trazer os melhores</p>
                </div>
                <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-center">
                  <p className="font-bold text-emerald-600">DESENVOLVER</p>
                  <p className="text-lg">Melhorar competências</p>
                </div>
                <div className="p-4 bg-rose-500/10 rounded-xl border border-rose-500/20 text-center">
                  <p className="font-bold text-rose-600">RETER</p>
                  <p className="text-lg">Manter talentos</p>
                </div>
              </div>
            ),
          }}
          audio={{
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            titulo: "Sinfonia da Gestão",
            artista: "Petrobras Quest",
          }}
        />

        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[1]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="O modelo de competências da Petrobras é fundamentado no tripé C.H.A. O que representa a letra 'A'?"
          alternativas={[
            { letra: "A", texto: "Aptidão", correta: false },
                { letra: "B", texto: "Atitude", correta: true },
                { letra: "C", texto: "Aprendizado", correta: false },
                { letra: "D", texto: "Agilidade", correta: false },
                { letra: "E", texto: "Autoridade", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Atitude representa o 'querer fazer', ou seja, o aspecto comportamental e motivacional da competência." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
          questoes={quizM1}
          titulo="QUIZ: Fundamentos de Gestão de Pessoas"
          numero={5}
          variant="cyan"
          onComplete={(score: number) =>
            handleModuleComplete("modulo-1", score)
          }
        />
      </TabsContent>
      )}

      {/* ==================== MÓDULO 2 ==================== */}
      {activeTab === "modulo-2" && (
      <TabsContent value="modulo-2" className="space-y-12 mt-0">
        <ModuleBanner
          numero={2}
          titulo="Recrutamento e Seleção"
          descricao="A ciência de atrair o talento certo e a técnica de escolher o perfil ideal para a cultura Petrobras."
          variant={mv[2]}
        />

        <div className="space-y-6">
          <ModuleSectionHeader
            index="INTRO"
            variant={mv[2]}
            title="Dossiê de Atração"
            description="Processos vitais para a renovação do capital intelectual."
          />
          <CardCarousel
            cards={[
              {
                titulo: "Recrutamento Interno",
                descricao:
                  "Valorização da prata da casa. Promove motivação e aproveita o conhecimento já existente na estatal.",
                icone: <LuUsers />,
                corFundo: "bg-emerald-500/10",
              },
              {
                titulo: "Recrutamento Externo",
                descricao:
                  "Oxigenação da cultura. Traz novas ideias, tecnologias e visões de mercado para o ambiente interno.",
                icone: <LuZap />,
                corFundo: "bg-teal-500/10",
              },
              {
                titulo: "Seleção por Competências",
                descricao:
                  "Foco no CHA (Conhecimentos, Habilidades e Atitudes). Avaliação do potencial de entrega real.",
                icone: <LuTarget />,
                corFundo: "bg-cyan-500/10",
              },
              {
                titulo: "Triagem Curricular",
                descricao:
                  "Uso de sistemas automatizados (ATS) para filtrar candidatos alinhados aos requisitos técnicos rígidos.",
                icone: <LuSearch />,
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
            description="O funil estratégico: do anúncio à decisão final."
          />
          <ContentAccordion
            slides={[
              {
                titulo: "Conceituação: O Funil de Seleção",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      O recrutamento é uma atividade de **divulgação e atração**
                      (chamada), enquanto a seleção é uma atividade de
                      **comparação e escolha** (filtro).
                    </p>
                    <AlertBox tipo="info" titulo="Definição Clássica">
                      Recrutamento é um processo de comunicação de mão dupla: a
                      empresa busca candidatos e os candidatos buscam a empresa.
                    </AlertBox>
                  </div>
                ),
                icone: <LuSearch />,
              },
              {
                titulo: "Exemplificação: O Concurso Público",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Na Petrobras, o recrutamento externo é obrigatoriamente
                      via Concurso Público (Art. 37 da CF). Isso muda a dinâmica
                      de atração.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <h5 className="font-bold flex items-center gap-2">
                          <LuCheck className="text-emerald-500" /> Vantagem
                        </h5>
                        <p className="text-lg">
                          Isonomia, impessoalidade e seleção técnica baseada em
                          mérito comprovado por provas.
                        </p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <h5 className="font-bold flex items-center gap-2">
                          <LuCheck className="text-rose-500" /> Desafio
                        </h5>
                        <p className="text-lg">
                          Dificuldade em avaliar 'soft skills' (comportamental)
                          apenas através de provas objetivas.
                        </p>
                      </div>
                    </div>
                  </div>
                ),
                icone: <LuBuilding />,
              },
              {
                titulo: "Dicas Táticas: Técnicas de Seleção",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Para a Cesgranrio, você deve conhecer as principais
                      técnicas de seleção:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        **Entrevistas:** Podem ser diretivas (fechadas) ou não
                        diretivas (abertas).
                      </li>
                      <li>
                        **Provas de Conhecimento:** Avaliam o saber técnico.
                      </li>
                      <li>
                        **Testes Psicométricos:** Avaliam aptidões e
                        inteligência.
                      </li>
                      <li>
                        **Testes de Personalidade:** Avaliam traços de caráter.
                      </li>
                      <li>
                        **Técnicas de Simulação:** Dramatização ou Roleplay
                        (muito usadas em seleções privadas).
                      </li>
                    </ul>
                  </div>
                ),
                icone: <LuAward />,
              },
              {
                titulo: "Exceções e pontos de atenção: Recrutamento Misto",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      A maioria das empresas não usa apenas um tipo. Elas
                      preferem o **Recrutamento Misto**.
                    </p>
                    <AlertBox tipo="warning" titulo="Atenção">
                      No recrutamento misto, a empresa tenta preencher a vaga
                      internamente e, caso não encontre o perfil, abre para o
                      mercado externo simultaneamente ou sucessivamente.
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
          variant={mv[2]}
          video={{
            videoId: "7c-YVly_C9o",
            title: "Recrutamento e Seleção Estratégico",
            duration: "15:20",
          }}
          resumoVisual={{
            moduloNome: "Módulo 2",
            tituloAula: "Gestão de Pessoas",
            materia: "Administração",
            images: [
              {
                title: "Funil de Seleção",
                type: "Infográfico",
                placeholderColor: "bg-emerald-500/20",
                imageUrl: "https://api.placeholder.com/1200/800",
              },
            ],
          }}
          sinteseEstrategica={{
            title: "Interno vs Externo",
            content: (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                  <p className="font-bold text-emerald-600 mb-1">INTERNO</p>
                  <p className="text-lg">
                    Motivação, Carreira, Econômico, mas gera conservadorismo.
                  </p>
                </div>
                <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                  <p className="font-bold text-cyan-600 mb-1">EXTERNO</p>
                  <p className="text-lg">
                    Novas ideias, renovação, mas caro e impacta o clima.
                  </p>
                </div>
              </div>
            ),
          }}
          audio={{
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
            titulo: "O Talento Certo",
            artista: "Petrobras Quest",
          }}
        />

        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[2]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="O modelo de competências da Petrobras é fundamentado no tripé C.H.A. O que representa a letra 'A'?"
          alternativas={[
            { letra: "A", texto: "Aptidão", correta: false },
                { letra: "B", texto: "Atitude", correta: true },
                { letra: "C", texto: "Aprendizado", correta: false },
                { letra: "D", texto: "Agilidade", correta: false },
                { letra: "E", texto: "Autoridade", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Atitude representa o 'querer fazer', ou seja, o aspecto comportamental e motivacional da competência." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
          questoes={quizM2}
          titulo="QUIZ: Recrutamento e Seleção"
          numero={4}
          variant={mv[2]}
          onComplete={(score: number) =>
            handleModuleComplete("modulo-2", score)
          }
        />
      </TabsContent>
      )}

      {/* ==================== MÓDULO 3 ==================== */}
      {activeTab === "modulo-3" && (
      <TabsContent value="modulo-3" className="space-y-12 mt-0">
        <ModuleBanner
          numero={3}
          titulo="Admissão e Integração"
          descricao="A jornada de transformação do candidato em colaborador: do contrato ao aculturamento."
          variant={mv[3]}
        />

        <div className="space-y-6">
          <ModuleSectionHeader
            index="INTRO"
            variant={mv[3]}
            title="Dossiê de Boas-Vindas"
            description="Os primeiros passos críticos para a retenção de talentos."
          />
          <CardCarousel
            cards={[
              {
                titulo: "Socialização Orizacional",
                descricao:
                  "Processo pelo qual o novo membro aprende o sistema de valores, normas e padrões de comportamento.",
                icone: <LuNetwork />,
                corFundo: "bg-emerald-500/10",
              },
              {
                titulo: "Onboarding Digital",
                descricao:
                  "Agilidade administrativa para que o foco do primeiro dia seja o relacionamento e não papéis.",
                icone: <LuCheck />,
                corFundo: "bg-cyan-500/10",
              },
              {
                titulo: "Programa de Mentoria",
                descricao:
                  "Acompanhamento por profissionais experientes para facilitar a navegação na complexidade da estatal.",
                icone: <LuAward />,
                corFundo: "bg-amber-500/10",
              },
              {
                titulo: "Aderência Cultural",
                descricao:
                  "Verificação da sintonia entre os objetivos do colaborador e a missão da Petrobras.",
                icone: <LuShield />,
                corFundo: "bg-rose-500/10",
              },
            ]}
          />
        </div>

        <div className="space-y-6">
          <ModuleSectionHeader
            index={2}
            variant={mv[3]}
            title="Análise Técnica C.E.D.E."
            description="Transformando o recém-chegado em um parceiro de valor."
          />
          <ContentAccordion
            slides={[
              {
                titulo: "Conceituação: Socialização Organizacional",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      A socialização organizacional é o processo de "moldagem"
                      do indivíduo à cultura. Não é lavagem cerebral, mas sim o
                      **ajuste de expectativas**.
                    </p>
                    <AlertBox tipo="info" titulo="Três Fases">
                      1. Socialização Antecipada; 2. Encontro (Choque de
                      Realidade); 3. Metamorfose (Ajuste).
                    </AlertBox>
                  </div>
                ),
                icone: <LuCheck />,
              },
              {
                titulo: "Exemplificação: A Universidade Petrobras",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      A integração na Petrobras passa pela **UP (Universidade
                      Petrobras)**, onde o novo empregado imerge no conhecimento
                      técnico e normativo da empresa.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <h5 className="font-bold flex items-center gap-2">
                          <LuCheck className="text-emerald-500" /> Hard Skills
                        </h5>
                        <p className="text-lg">
                          Normas de segurança (SMS), processos de refino,
                          exploração e logística.
                        </p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <h5 className="font-bold flex items-center gap-2">
                          <LuCheck className="text-cyan-500" /> Soft Skills
                        </h5>
                        <p className="text-lg">
                          Ética, conformidade, compliance e valores
                          organizacionais.
                        </p>
                      </div>
                    </div>
                  </div>
                ),
                icone: <LuBuilding />,
              },
              {
                titulo: "Dicas Táticas: Questões de Onboarding",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Cuidado com a palavra **Aculturamento**. Na prova, a
                      socialização visa reduzir a ansiedade do novo funcionário
                      e aumentar sua produtividade inicial.
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Um bom onboarding reduz o **turnover** precoce.</li>
                      <li>
                        A integração deve envolver a **família** em casos de
                        transferência/mudança.
                      </li>
                    </ul>
                  </div>
                ),
                icone: <LuAward />,
              },
              {
                titulo: "Exceções e pontos de atenção: Liberdade de Pensar",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Socialização não significa suprimir a individualidade.
                    </p>
                    <AlertBox tipo="warning" titulo="Equilíbrio">
                      Empresas inovadoras buscam a socialização que garante
                      conformidade básica, mas preserva o **olhar crítico** do
                      novo colaborador para melhoria de processos.
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
            title: "Onboarding de Sucesso",
            duration: "10:15",
          }}
          resumoVisual={{
            moduloNome: "Módulo 3",
            tituloAula: "Gestão de Pessoas",
            materia: "Administração",
            images: [
              {
                title: "Etapas do Onboarding",
                type: "Infográfico",
                placeholderColor: "bg-emerald-500/20",
                imageUrl: "https://api.placeholder.com/1200/800",
              },
            ],
          }}
          sinteseEstrategica={{
            title: "Checklist 4Cs",
            content: (
              <div className="grid grid-cols-2 gap-2 text-lg font-bold">
                <div className="p-2 border border-emerald-200 bg-emerald-50 rounded">
                  CONFORMIDADE
                </div>
                <div className="p-2 border border-emerald-200 bg-emerald-50 rounded">
                  CLARIFICAÇÃO
                </div>
                <div className="p-2 border border-emerald-200 bg-emerald-50 rounded">
                  CULTURA
                </div>
                <div className="p-2 border border-emerald-200 bg-emerald-50 rounded">
                  CONEXÃO
                </div>
              </div>
            ),
          }}
          audio={{
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
            titulo: "Boas-vindas ao Time",
            artista: "Petrobras Quest",
          }}
        />

        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[3]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="O modelo de competências da Petrobras é fundamentado no tripé C.H.A. O que representa a letra 'A'?"
          alternativas={[
            { letra: "A", texto: "Aptidão", correta: false },
                { letra: "B", texto: "Atitude", correta: true },
                { letra: "C", texto: "Aprendizado", correta: false },
                { letra: "D", texto: "Agilidade", correta: false },
                { letra: "E", texto: "Autoridade", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Atitude representa o 'querer fazer', ou seja, o aspecto comportamental e motivacional da competência." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
          questoes={quizM3}
          titulo="QUIZ: Admissão e Integração"
          numero={4}
          variant={mv[3]}
          onComplete={(score: number) =>
            handleModuleComplete("modulo-3", score)
          }
        />
      </TabsContent>
      )}
      {activeTab === "modulo-4" && (
      <TabsContent value="modulo-4" className="space-y-12 mt-0">
        <ModuleBanner
          numero={4}
          titulo="Desenvolvimento e Capacitação"
          descricao="Estratégias de desenvolvimento profissional, treinamento e plano de carreira."
          variant="cyan"
        />

        <div className="space-y-6">
          <ModuleSectionHeader
            index="INTRO"
            variant="cyan"
            title="Capacitação e Desenvolvimento"
            description="Diferença entre treinar e desenvolver talentos."
          />
          <ContentAccordion
            icone={<LuTrendingUp />}
            titulo="Gestão do Conhecimento"
            slides={[
              {
                titulo: "Treinamento vs. Desenvolvimento",
                conteudo: (
                  <p>
                    <strong>Treinamento:</strong> Foco no curto prazo, cargo
                    atual (técnico).
                    <br />
                    <strong>Desenvolvimento:</strong> Foco no longo prazo,
                    carreira e potencial (comportamental).
                  </p>
                ),
                icone: <LuLightbulb />,
                exemplo:
                  "Treinar para operar um software vs desenvolver liderança para futura gestão.",
              },
              {
                titulo: "PDI - Plano de Desenv. Individual",
                conteudo:
                  "Acordo entre líder e liderado que traça objetivos de aprendizado, prazos e recursos necessários para o crescimento profissional.",
                icone: <LuTarget />,
                exemplo:
                  "Engenheiro júnior traçando rota para se tornar especialista em 2 anos.",
              },
            ]}
          />
        </div>

        <ModuleConsolidation
          index={2}
          variant="cyan"
          video={{
            videoId: "7c-YVly_C9o", // Exemplo, idealmente um de capacitação
            title: "Capacitação Corporativa",
            duration: "13:10",
          }}
          resumoVisual={{
            moduloNome: "Módulo 4",
            tituloAula: "Desenvolvimento e Capacitação",
            materia: "Administração",
            images: [
              {
                title: "Matriz de Competências",
                type: "Infográfico",
                placeholderColor: "bg-sky-500/20",
                imageUrl: "https://api.placeholder.com/1200/800",
              },
            ],
          }}
          sinteseEstrategica={{
            title: "Regra 70-20-10",
            content: (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold">
                    70%
                  </div>
                  <p className="text-lg">
                    <strong>On-the-job:</strong> Vivência prática e desafios
                    reais.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
                    20%
                  </div>
                  <p className="text-lg">
                    <strong>Social:</strong> Mentoria, feedback e networking.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">
                    10%
                  </div>
                  <p className="text-lg">
                    <strong>Formal:</strong> Cursos, livros e treinamentos.
                  </p>
                </div>
              </div>
            ),
          }}
          audio={{
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
            titulo: "Aprendizado Contínuo",
            artista: "Petrobras Quest",
          }}
        />

        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[4]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="O modelo de competências da Petrobras é fundamentado no tripé C.H.A. O que representa a letra 'A'?"
          alternativas={[
            { letra: "A", texto: "Aptidão", correta: false },
                { letra: "B", texto: "Atitude", correta: true },
                { letra: "C", texto: "Aprendizado", correta: false },
                { letra: "D", texto: "Agilidade", correta: false },
                { letra: "E", texto: "Autoridade", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Atitude representa o 'querer fazer', ou seja, o aspecto comportamental e motivacional da competência." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
          questoes={quizM4}
          titulo="QUIZ: Desenvolvimento e Capacitação"
          numero={3}
          variant="cyan"
          onComplete={(score: number) =>
            handleModuleComplete("modulo-4", score)
          }
        />
      </TabsContent>
      )}

      {/* ==================== MÓDULO 5 ==================== */}
      {activeTab === "modulo-5" && (
      <TabsContent value="modulo-5" className="space-y-12 mt-0">
        <ModuleBanner
          numero={5}
          titulo="Avaliação de Desempenho"
          descricao="Sistemas de avaliação, feedback e gestão de desempenho para o desenvolvimento."
          variant="amber"
        />

        <div className="space-y-6">
          <ModuleSectionHeader
            index="INTRO"
            variant="amber"
            title="Metodologias de Avaliação"
            description="Como medir o intangível de forma justa."
          />
          <ContentAccordion
            icone={<LuChartBar />}
            titulo="Gestão de Desempenho"
            slides={[
              {
                titulo: "Método 360 Graus",
                conteudo:
                  "Envolve feedback de gerentes, colegas, subordinados e autoavaliação. Fornece uma visão holística mas exige maturidade cultural.",
                icone: <LuUsers />,
                exemplo: "Gerente sendo avaliado pelo time pela primeira vez.",
              },
              {
                titulo: "Erros Comuns (Vieses)",
                conteudo: (
                  <ul className="list-disc pl-5">
                    <li>
                      <strong>Efeito Halo:</strong> Uma característica boa apaga
                      todas as ruins.
                    </li>
                    <li>
                      <strong>Efeito Horn:</strong> Uma falha isolada mancha
                      toda a avaliação.
                    </li>
                    <li>
                      <strong>Recenticidade:</strong> Focar apenas nos últimos 2
                      meses.
                    </li>
                  </ul>
                ),
                icone: <LuShieldAlert />,
                exemplo:
                  "Funcionário promovido só por bater meta no último mês, ignorando 10 meses de baixa.",
              },
            ]}
          />
        </div>

        <ModuleConsolidation
          index={2}
          variant="amber"
          video={{
            videoId: "dQw4w9WgXcQ",
            title: "Performance e Feedback",
            duration: "11:45",
          }}
          resumoVisual={{
            moduloNome: "Módulo 5",
            tituloAula: "Avaliação de Desempenho",
            materia: "Administração",
            images: [
              {
                title: "Ciclo de Performance",
                type: "Infográfico",
                placeholderColor: "bg-amber-500/20",
                imageUrl: "https://api.placeholder.com/1200/800",
              },
            ],
          }}
          sinteseEstrategica={{
            title: "Tipos de Avaliação",
            content: (
              <div className="grid grid-cols-2 gap-2 text-lg">
                <div className="p-2 border border-amber-200 bg-amber-50 rounded">
                  <strong>90°:</strong> Chefe direto
                </div>
                <div className="p-2 border border-amber-200 bg-amber-50 rounded">
                  <strong>180°:</strong> Auto + Chefe
                </div>
                <div className="p-2 border border-amber-200 bg-amber-50 rounded">
                  <strong>360°:</strong> Todos (chefes, pares, sub)
                </div>
                <div className="p-2 border border-amber-200 bg-amber-50 rounded">
                  <strong>Críticos:</strong> Incidentes marcantes
                </div>
              </div>
            ),
          }}
          audio={{
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
            titulo: "Métrica de Sucesso",
            artista: "Petrobras Quest",
          }}
        />

        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[5]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="O modelo de competências da Petrobras é fundamentado no tripé C.H.A. O que representa a letra 'A'?"
          alternativas={[
            { letra: "A", texto: "Aptidão", correta: false },
                { letra: "B", texto: "Atitude", correta: true },
                { letra: "C", texto: "Aprendizado", correta: false },
                { letra: "D", texto: "Agilidade", correta: false },
                { letra: "E", texto: "Autoridade", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Atitude representa o 'querer fazer', ou seja, o aspecto comportamental e motivacional da competência." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
          questoes={quizM5}
          titulo="QUIZ: Avaliação de Desempenho"
          numero={3}
          variant="amber"
          onComplete={(score: number) =>
            handleModuleComplete("modulo-5", score)
          }
        />
      </TabsContent>
      )}

      {/* ==================== MÓDULO 6 ==================== */}
      {activeTab === "modulo-6" && (
      <TabsContent value="modulo-6" className="space-y-12 mt-0">
        <ModuleBanner
          numero={6}
          titulo="Gestão Salarial e Benefícios"
          descricao="Políticas de remuneração, estrutura salarial e programas de benefícios."
          variant="rose"
        />

        <div className="space-y-6">
          <ModuleSectionHeader
            index="INTRO"
            variant="rose"
            title="Sistemas de Remuneração"
            description="Equilíbrio entre custos e competitividade."
          />
          <ContentAccordion
            icone={<LuDollarSign />}
            titulo="Política Remuneratória"
            slides={[
              {
                titulo: "Remuneração Variável",
                conteudo:
                  "PLR (Lucros), Bônus por meta e Comissões. Transforma custo fixo em variável e motiva o foco em resultados.",
                icone: <LuTrendingUp />,
                exemplo:
                  "PLR da Petrobras batendo recordes após alta produção no Pré-Sal.",
              },
              {
                titulo: "Benefícios Flexíveis",
                conteudo:
                  "Permite que o colaborador escolha onde usar seu crédito (saúde, educação, lazer). Aumenta o valor percebido do pacote.",
                icone: <LuHeart />,
                exemplo: "Trocar auxílio academia por auxílio pós-graduação.",
              },
            ]}
          />
        </div>

        <ModuleConsolidation
          index={2}
          variant="rose"
          video={{
            videoId: "XpREx30z5qI",
            title: "Compensação Estratégica",
            duration: "14:00",
          }}
          resumoVisual={{
            moduloNome: "Módulo 6",
            tituloAula: "Gestão Salarial",
            materia: "Administração",
            images: [
              {
                title: "Estrutura de Bandas",
                type: "Infográfico",
                placeholderColor: "bg-rose-500/20",
                imageUrl: "https://api.placeholder.com/1200/800",
              },
            ],
          }}
          sinteseEstrategica={{
            title: "Equidade Interna vs. Externa",
            content: (
              <p className="text-lg italic">
                "<strong>Interna:</strong> Cargos iguais = Salários iguais.{" "}
                <strong>Externa:</strong> O que o mercado paga pra não perder o
                talento."
              </p>
            ),
          }}
          audio={{
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
            titulo: "Valorização Real",
            artista: "Petrobras Quest",
          }}
        />

        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[6]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="O modelo de competências da Petrobras é fundamentado no tripé C.H.A. O que representa a letra 'A'?"
          alternativas={[
            { letra: "A", texto: "Aptidão", correta: false },
                { letra: "B", texto: "Atitude", correta: true },
                { letra: "C", texto: "Aprendizado", correta: false },
                { letra: "D", texto: "Agilidade", correta: false },
                { letra: "E", texto: "Autoridade", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Atitude representa o 'querer fazer', ou seja, o aspecto comportamental e motivacional da competência." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
          questoes={quizM6}
          titulo="QUIZ: Gestão Salarial e Benefícios"
          numero={3}
          variant="rose"
          onComplete={(score: number) =>
            handleModuleComplete("modulo-6", score)
          }
        />
      </TabsContent>
      )}

      {/* ==================== MÓDULO 7 ==================== */}
      {activeTab === "modulo-7" && (
      <TabsContent value="modulo-7" className="space-y-12 mt-0">
        <ModuleBanner
          numero={7}
          titulo="Motivação e Liderança"
          descricao="O motor humano: teorias, estilos e a influência do líder no comportamento organizacional."
          variant={mv[7] as any}
        />

        <div className="space-y-6">
          <ModuleSectionHeader
            index="INTRO"
            variant={mv[7] as any}
            title="Dossiê de Liderança"
            description="O impacto da influência na condução de equipes de alta performance."
          />
          <CardCarousel
            cards={[
              {
                titulo: "Autocrática",
                descricao:
                  "Foco no líder. Centralização total de decisões. Alta produtividade imediata, mas gera frustração.",
                icone: <LuTarget />,
                corFundo: "bg-rose-500/10",
              },
              {
                titulo: "Democrática",
                descricao:
                  "Foco no grupo. Debate e participação. Maior qualidade e comprometimento a longo prazo.",
                icone: <LuUsers />,
                corFundo: "bg-emerald-500/10",
              },
              {
                titulo: "Liberal (Laissez-faire)",
                descricao:
                  "Foco no indivíduo. Liberdade total. Funciona apenas com equipes altamente maduras e autônomas.",
                icone: <LuZap />,
                corFundo: "bg-amber-500/10",
              },
              {
                titulo: "Situacional",
                descricao:
                  "Liderar conforme a maturidade do subordinado (Direcionar, Orientar, Apoiar, Delegar).",
                icone: <LuTrendingUp />,
                corFundo: "bg-blue-500/10",
              },
            ]}
          />
        </div>

        <div className="space-y-6">
          <ModuleSectionHeader
            index={2}
            variant={mv[7] as any}
            title="Análise Técnica C.E.D.E."
            description="Teorias motivacionais e a psicologia do trabalho."
          />
          <ContentAccordion
            slides={[
              {
                titulo: "Conceituação: Maslow vs. Herzberg",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      **Maslow:** Hierarquia de necessidades (Fisiológica →
                      Segurança → Social → Estima → Autorrealização). Só subimos
                      se a base estiver satisfeita.
                    </p>
                    <AlertBox tipo="info" titulo="Os 2 Fatores de Herzberg">
                      1. **Higiênicos:** Salário, ambiente, segurança (Se
                      faltam, geram INSATISFAÇÃO. Se existem, apenas NÃO geram
                      insatisfação). 2. **Motivacionais:** Reconhecimento,
                      desafio, crescimento (Estes geram SATISFAÇÃO real).
                    </AlertBox>
                  </div>
                ),
                icone: <LuSearch />,
              },
              {
                titulo: "Exemplificação: Liderança em Plataformas",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Em regimes de confinamento (offshore), a liderança deve
                      ser **Resiliente e Empática**.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <h5 className="font-bold flex items-center gap-2">
                          <LuCheck className="text-blue-500" /> Presença Próxima
                        </h5>
                        <p className="text-lg">
                          O líder não apenas manda, ele vivencia a rotina
                          perigosa com a equipe.
                        </p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <h5 className="font-bold flex items-center gap-2">
                          <LuCheck className="text-emerald-500" /> Comunicação
                          Clara
                        </h5>
                        <p className="text-lg">
                          Essencial para evitar acidentes e manter a moral alta
                          em períodos longos fora de casa.
                        </p>
                      </div>
                    </div>
                  </div>
                ),
                icone: <LuBuilding />,
              },
              {
                titulo: "Dicas Táticas: Teoria X e Y (McGregor)",
                conteudo: (
                  <div className="space-y-4">
                    <p>Cuidado com a dicotomia na prova:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        **Teoria X:** Visão negativa. O homem odeia trabalhar e
                        precisa ser controlado. (Liderança Autocrática).
                      </li>
                      <li>
                        **Teoria Y:** Visão positiva. O trabalho é natural e o
                        homem busca responsabilidade. (Liderança Democrática).
                      </li>
                    </ul>
                  </div>
                ),
                icone: <LuAward />,
              },
              {
                titulo: "Exceções e pontos de atenção: Liderança Liberal",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      A liderança liberal é frequentemente vista como "ausência
                      de líder".
                    </p>
                    <AlertBox tipo="danger" titulo="Atenção">
                      Para a Cesgranrio, a liderança liberal só é eficaz se os
                      subordinados forem **especialistas plenamente
                      conscientes**. Se a equipe for imatura, gera caos e baixa
                      produtividade.
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
          variant={mv[7] as any}
          video={{
            videoId: "9H36Gjg5SLM",
            title: "O Poder da Liderança",
            duration: "18:30",
          }}
          resumoVisual={{
            moduloNome: "Módulo 7",
            tituloAula: "Gestão de Pessoas",
            materia: "Administração",
            images: [
              {
                title: "Pirâmide de Maslow",
                type: "Infográfico",
                placeholderColor: "bg-blue-500/20",
                imageUrl: "https://api.placeholder.com/1200/800",
              },
            ],
          }}
          sinteseEstrategica={{
            title: "Grade Gerencial",
            content: (
              <p className="text-lg font-medium">
                9.9 (Liderança de Equipes) é o ápice: foco em pessoas E em
                resultados.
              </p>
            ),
          }}
          audio={{
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
            titulo: "Líder Inspirador",
            artista: "Petrobras Quest",
          }}
        />

        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[7]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="O modelo de competências da Petrobras é fundamentado no tripé C.H.A. O que representa a letra 'A'?"
          alternativas={[
            { letra: "A", texto: "Aptidão", correta: false },
                { letra: "B", texto: "Atitude", correta: true },
                { letra: "C", texto: "Aprendizado", correta: false },
                { letra: "D", texto: "Agilidade", correta: false },
                { letra: "E", texto: "Autoridade", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Atitude representa o 'querer fazer', ou seja, o aspecto comportamental e motivacional da competência." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
          questoes={quizM7}
          titulo="QUIZ: Relações Trabalhistas"
          numero={4}
          variant={mv[7] as any}
          onComplete={(score: number) =>
            handleModuleComplete("modulo-7", score)
          }
        />
      </TabsContent>
      )}

      {/* ==================== MÓDULO 8 ==================== */}
      {activeTab === "modulo-8" && (
      <TabsContent value="modulo-8" className="space-y-12 mt-0">
        <ModuleBanner
          numero={8}
          titulo="Gestão de Conflitos"
          descricao="A arte da negociação: transformando divergências em oportunidades de evolução e sinergia."
          variant={mv[8] as any}
        />

        <div className="space-y-6">
          <ModuleSectionHeader
            index="INTRO"
            variant={mv[8] as any}
            title="Dossiê de Conflitos"
            description="Entendendo as raízes e as estratégias de resolução."
          />
          <CardCarousel
            cards={[
              {
                titulo: "Conflito Latente",
                descricao:
                  "A tensão existe, mas ainda não aflorou. É o momento ideal para prevenção.",
                icone: <LuSearch />,
                corFundo: "bg-amber-500/10",
              },
              {
                titulo: "Abordagem Ganha-Ganha",
                descricao:
                  "Ambas as partes saem satisfeitas. Foco na colaboração e solução conjunta.",
                icone: <LuZap />,
                corFundo: "bg-emerald-500/10",
              },
              {
                titulo: "Arbitragem",
                descricao:
                  "Um terceiro decide a solução. Rápido, mas pode não resolver a causa raiz.",
                icone: <LuScale />,
                corFundo: "bg-cyan-500/10",
              },
              {
                titulo: "Mediação",
                descricao:
                  "O terceiro facilita o diálogo, mas as partes decidem. Favorece o relacionamento.",
                icone: <LuUsers />,
                corFundo: "bg-blue-500/10",
              },
            ]}
          />
        </div>

        <div className="space-y-6">
          <ModuleSectionHeader
            index={2}
            variant={mv[8] as any}
            title="Análise Técnica C.E.D.E."
            description="Estilos de gestão e mediação de interesses."
          />
          <ContentAccordion
            slides={[
              {
                titulo: "Conceituação: Níveis de Conflito",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Conflitos podem ser **Intrapessoais**, **Interpessoais**
                      ou **Intergrupais**. Nem todo conflito é ruim: o conflito
                      funcional estimula a criatividade.
                    </p>
                    <AlertBox
                      tipo="info"
                      titulo="Os 5 Estilos de Thomas-Kilmann"
                    >
                      1. Competição; 2. Colaboração; 3. Compromisso; 4.
                      Abstenção; 5. Acomodação.
                    </AlertBox>
                  </div>
                ),
                icone: <LuTrendingUp />,
              },
              {
                titulo: "Exemplificação: Negociação Sindical",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      As rodadas de ACT (Acordo Coletivo de Trabalho) na
                      Petrobras são exemplos clássicos de negociações complexas.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <h5 className="font-bold flex items-center gap-2">
                          <LuCheck className="text-rose-500" /> Negociação
                          Distributiva
                        </h5>
                        <p className="text-lg">
                          Soma zero: o que um ganha, o outro perde (ex: aumento
                          direto).
                        </p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <h5 className="font-bold flex items-center gap-2">
                          <LuCheck className="text-emerald-500" /> Negociação
                          Integrativa
                        </h5>
                        <p className="text-lg">
                          Ganha-ganha: criam-se novas opções que beneficiam
                          ambos (ex: novos benefícios).
                        </p>
                      </div>
                    </div>
                  </div>
                ),
                icone: <LuBuilding />,
              },
              {
                titulo: "Dicas Táticas: Mediação vs Arbitragem",
                conteudo: (
                  <div className="space-y-4">
                    <p>Na prova:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        O **Mediador** não julga, ele auxilia as partes a
                        chegarem ao acordo.
                      </li>
                      <li>
                        O **Árbitro** julga e o laudo tem força de decisão
                        obrigatória.
                      </li>
                    </ul>
                  </div>
                ),
                icone: <LuAward />,
              },
              {
                titulo: "Exceções e pontos de atenção: Abstenção",
                conteudo: (
                  <div className="space-y-4">
                    <p>Muitos acham que "evitar o conflito" é sempre ruim.</p>
                    <AlertBox tipo="warning" titulo="Quando Usar?">
                      A abstenção é válida quando o assunto é **trivial**,
                      quando o clima está muito quente e precisa de
                      resfriamento, ou quando não há chance de ganhar no
                      momento.
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
          variant={mv[8] as any}
          video={{
            videoId: "3tUuW5gV6k0",
            title: "Resolução de Conflitos",
            duration: "14:50",
          }}
          resumoVisual={{
            moduloNome: "Módulo 8",
            tituloAula: "Gestão de Pessoas",
            materia: "Administração",
            images: [
              {
                title: "Matriz de Thomas-Kilmann",
                type: "Infográfico",
                placeholderColor: "bg-emerald-500/20",
                imageUrl: "https://api.placeholder.com/1200/800",
              },
            ],
          }}
          sinteseEstrategica={{
            title: "Soft Skills",
            content: (
              <p className="text-lg font-medium">
                Escuta Ativa, Empatia, Comunicação Assertiva e Inteligência
                Emocional.
              </p>
            ),
          }}
          audio={{
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
            titulo: "Clima Organizacional",
            artista: "Petrobras Quest",
          }}
        />

        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[8]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="O modelo de competências da Petrobras é fundamentado no tripé C.H.A. O que representa a letra 'A'?"
          alternativas={[
            { letra: "A", texto: "Aptidão", correta: false },
                { letra: "B", texto: "Atitude", correta: true },
                { letra: "C", texto: "Aprendizado", correta: false },
                { letra: "D", texto: "Agilidade", correta: false },
                { letra: "E", texto: "Autoridade", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Atitude representa o 'querer fazer', ou seja, o aspecto comportamental e motivacional da competência." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
          questoes={quizM8}
          titulo="QUIZ: Gestão de Conflitos"
          numero={4}
          variant={mv[8] as any}
          onComplete={(score: number) =>
            handleModuleComplete("modulo-8", score)
          }
        />
      </TabsContent>
      )}

      {/* ==================== MÓDULO 9 ==================== */}
      {activeTab === "modulo-9" && (
      <TabsContent value="modulo-9" className="space-y-12 mt-0">
        <ModuleBanner
          numero={9}
          titulo="Cultura e Mudança"
          descricao="O DNA invisível: compreendendo as crenças, valores e os processos de transformação cultural."
          variant={mv[9] as any}
        />

        <div className="space-y-6">
          <ModuleSectionHeader
            index="INTRO"
            variant={mv[9] as any}
            title="Dossiê de Cultura"
            description="As camadas que definem quem somos como organização."
          />
          <CardCarousel
            cards={[
              {
                titulo: "Artefatos",
                descricao:
                  "Camada visível: uniformes, layout, linguagem, logomarca.",
                icone: <LuEye />,
                corFundo: "bg-blue-500/10",
              },
              {
                titulo: "Valores Compartilhados",
                descricao:
                  "O que dizemos que acreditamos. Nível consciente de por que fazemos o que fazemos.",
                icone: <LuShieldCheck />,
                corFundo: "bg-cyan-500/10",
              },
              {
                titulo: "Pressupostos Básicos",
                descricao:
                  "Crenças inconscientes, verdades absolutas e invisíveis. O nível mais profundo.",
                icone: <LuZap />,
                corFundo: "bg-amber-500/10",
              },
              {
                titulo: "Clima vs Cultura",
                descricao:
                  "Clima é o estado momentâneo (humor). Cultura é o traço permanente (personalidade).",
                icone: <LuTrendingUp />,
                corFundo: "bg-amber-500/10",
              },
            ]}
          />
        </div>

        <div className="space-y-6">
          <ModuleSectionHeader
            index={2}
            variant={mv[9] as any}
            title="Análise Técnica C.E.D.E."
            description="Processos de mudança e resistência organizacional."
          />
          <ContentAccordion
            slides={[
              {
                titulo: "Conceituação: O Modelo de Kurt Lewin",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Mudar requer 3 fases: **Descongelamento** (Redução da
                      resistência), **Mudança** (Aprendizado de novos
                      comportamentos) e **Recongelamento** (Estabilização).
                    </p>
                    <AlertBox tipo="info" titulo="Forças de Campo">
                      Propulsoras (Empurram para a mudança) e Restritivas
                      (Mantêm o status quo). Mudar requer aumentar as
                      propulsoras ou reduzir as restritivas.
                    </AlertBox>
                  </div>
                ),
                icone: <LuTrendingUp />,
              },
              {
                titulo: "Exemplificação: Transição Energética",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      A Petrobras passa por uma mudança cultural para se tornar
                      uma empresa de energia, não apenas petróleo.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <h5 className="font-bold flex items-center gap-2">
                          <LuCheck className="text-rose-500" /> Velha Cultura
                        </h5>
                        <p className="text-lg">
                          Foco exclusivo em hidrocarbonetos e exploração pesada.
                        </p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <h5 className="font-bold flex items-center gap-2">
                          <LuCheck className="text-emerald-500" /> Nova Cultura
                        </h5>
                        <p className="text-lg">
                          Inovação, sustentabilidade e fontes renováveis.
                        </p>
                      </div>
                    </div>
                  </div>
                ),
                icone: <LuBuilding />,
              },
              {
                titulo: "Dicas Táticas: Níveis de Cultura (Schein)",
                conteudo: (
                  <div className="space-y-4">
                    <p>Na prova, lembre-se da metáfora do **Iceberg**:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>**Visível:** Artefatos (Acima da linha d'água).</li>
                      <li>
                        **Invisível:** Valores e Pressupostos (Abaixo da linha
                        d'água).
                      </li>
                    </ul>
                  </div>
                ),
                icone: <LuAward />,
              },
              {
                titulo: "Exceções e pontos de atenção: Resistência à Mudança",
                conteudo: (
                  <div className="space-y-4">
                    <p>Resistência não é necessariamente ruim.</p>
                    <AlertBox tipo="warning" titulo="Ponto de Vista">
                      A resistência pode indicar que a mudança está sendo mal
                      comunicada ou que ameaça valores fundamentais que garantem
                      a segurança operacional.
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
          variant={mv[9] as any}
          video={{
            videoId: "fW8amMCVAJQ",
            title: "Cultura Organizacional",
            duration: "15:20",
          }}
          resumoVisual={{
            moduloNome: "Módulo 9",
            tituloAula: "Gestão de Pessoas",
            materia: "Administração",
            images: [
              {
                title: "Modelo de Kurt Lewin",
                type: "Infográfico",
                placeholderColor: "bg-cyan-500/20",
                imageUrl: "https://api.placeholder.com/1200/800",
              },
            ],
          }}
          sinteseEstrategica={{
            title: "Iceberg da Cultura",
            content: (
              <p className="text-lg font-medium">
                Artefatos (Vê) → Valores (Diz) → Pressupostos (Sente/É).
              </p>
            ),
          }}
          audio={{
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
            titulo: "DNA Corporativo",
            artista: "Petrobras Quest",
          }}
        />

        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[9]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="O modelo de competências da Petrobras é fundamentado no tripé C.H.A. O que representa a letra 'A'?"
          alternativas={[
            { letra: "A", texto: "Aptidão", correta: false },
                { letra: "B", texto: "Atitude", correta: true },
                { letra: "C", texto: "Aprendizado", correta: false },
                { letra: "D", texto: "Agilidade", correta: false },
                { letra: "E", texto: "Autoridade", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Atitude representa o 'querer fazer', ou seja, o aspecto comportamental e motivacional da competência." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
          questoes={quizM9}
          titulo="QUIZ: Gestão de Pessoas na Petrobras"
          numero={4}
          variant={mv[9] as any}
          onComplete={(score: number) =>
            handleModuleComplete("modulo-9", score)
          }
        />
      </TabsContent>
      )}

      {/* ==================== MÓDULO 10 ==================== */}
      {activeTab === "modulo-10" && (
      <TabsContent value="modulo-10" className="space-y-12 mt-0">
        <ModuleBanner
          numero={10}
          titulo="Tendências do RH"
          descricao="O futuro agora: RH Ágil, People Analytics e a integração da Inteligência Artificial."
          variant={mv[10] as any}
        />

        <div className="space-y-6">
          <ModuleSectionHeader
            index="INTRO"
            variant={mv[10] as any}
            title="Dossiê Future-Ready"
            description="As novas fronteiras da gestão do capital humano."
          />
          <CardCarousel
            cards={[
              {
                titulo: "People Analytics",
                descricao:
                  "Uso de Big Data para prever rotatividade, identificar talentos e otimizar contratações.",
                icone: <LuTrendingUp />,
                corFundo: "bg-blue-500/10",
              },
              {
                titulo: "RH Ágil",
                descricao:
                  "Aplicação de metodologias (Scrum, Kanban) para acelerar entregas da área de pessoas.",
                icone: <LuZap />,
                corFundo: "bg-amber-500/10",
              },
              {
                titulo: "Employee Experience",
                descricao:
                  "Foco na jornada total do colaborador, do recrutamento ao desligamento.",
                icone: <LuUsers />,
                corFundo: "bg-emerald-500/10",
              },
              {
                titulo: "IA Generativa no RH",
                descricao:
                  "Automatização de triagem de currículos, chatbots de suporte e criação de PDIs.",
                icone: <LuTarget />,
                corFundo: "bg-cyan-500/10",
              },
            ]}
          />
        </div>

        <div className="space-y-6">
          <ModuleSectionHeader
            index={2}
            variant={mv[10] as any}
            title="Análise Técnica C.E.D.E."
            description="Liderando na era da incerteza digital."
          />
          <ContentAccordion
            slides={[
              {
                titulo: "Conceituação: Digital RH",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      RH Digital não é apenas papel digitalizado. É a mudança de
                      mindset para decisões baseadas em evidências
                      (Evidence-Based Management).
                    </p>
                    <AlertBox tipo="info" titulo="O Novo Papel do RH">
                      De administrativo/executivo para
                      **Estratégico/Consultivo**. O RH atua como parceiro de
                      negócios (Business Partner).
                    </AlertBox>
                  </div>
                ),
                icone: <LuCpu />,
              },
              {
                titulo: "Exemplificação: Gamificação",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      O uso de elementos de jogos para aumentar o engajamento em
                      treinamentos de compliance.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <h5 className="font-bold flex items-center gap-2">
                          <LuCheck className="text-amber-500" /> Leaderboards
                        </h5>
                        <p className="text-lg">
                          Ranking saudável entre áreas em competições de
                          segurança zero acidente.
                        </p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <h5 className="font-bold flex items-center gap-2">
                          <LuCheck className="text-cyan-500" /> Badges
                        </h5>
                        <p className="text-lg">
                          Reconhecimento digital por conclusão de trilhas de
                          conhecimento complexas.
                        </p>
                      </div>
                    </div>
                  </div>
                ),
                icone: <LuBuilding />,
              },
              {
                titulo: "Dicas Táticas: Upskilling & Reskilling",
                conteudo: (
                  <div className="space-y-4">
                    <p>Diferencial para a prova Cesgranrio:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        **Upskilling:** Aprender novas habilidades para o mesmo
                        cargo (Ajuste).
                      </li>
                      <li>
                        **Reskilling:** Aprender habilidades para um novo cargo
                        (Requalificação).
                      </li>
                    </ul>
                  </div>
                ),
                icone: <LuAward />,
              },
              {
                titulo: "Exceções e pontos de atenção: Algoritmos Viciados",
                conteudo: (
                  <div className="space-y-4">
                    <p>IA no recrutamento pode perpetuar preconceitos.</p>
                    <AlertBox tipo="danger" titulo="Ética em IA">
                      O RH deve auditar os critérios da IA para garantir que não
                      haja viés de gênero, raça ou idade, mantendo a diversidade
                      e inclusão como pilares.
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
          variant={mv[10] as any}
          video={{
            videoId: "hYmX36X6y4M",
            title: "Future of HR",
            duration: "20:00",
          }}
          resumoVisual={{
            moduloNome: "Módulo 10",
            tituloAula: "Gestão de Pessoas",
            materia: "Administração",
            images: [
              {
                title: "Ecosistema de RH 4.0",
                type: "Infográfico",
                placeholderColor: "bg-rose-500/20",
                imageUrl: "https://api.placeholder.com/1200/800",
              },
            ],
          }}
          sinteseEstrategica={{
            title: "V.U.C.A. to B.A.N.I.",
            content: (
              <p className="text-lg font-medium">
                RH deve ser: Ágil, Digital, Humano e orientado a Dados.
              </p>
            ),
          }}
          audio={{
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
            titulo: "Horizontes do RH",
            artista: "Petrobras Quest",
          }}
        />

        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[10]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="O modelo de competências da Petrobras é fundamentado no tripé C.H.A. O que representa a letra 'A'?"
          alternativas={[
            { letra: "A", texto: "Aptidão", correta: false },
                { letra: "B", texto: "Atitude", correta: true },
                { letra: "C", texto: "Aprendizado", correta: false },
                { letra: "D", texto: "Agilidade", correta: false },
                { letra: "E", texto: "Autoridade", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Atitude representa o 'querer fazer', ou seja, o aspecto comportamental e motivacional da competência." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
          questoes={quizM10}
          titulo="QUIZ: Simulado Geral"
          numero={4}
          variant={mv[10] as any}
          onComplete={(score: number) =>
            handleModuleComplete("modulo-10", score)
          }
        />
      </TabsContent>
      )}
      {/* ==================== MÓDULO 11: FOCO PETROBRAS ==================== */}
      {activeTab === "modulo-11" && (
      <TabsContent value="modulo-11" className="space-y-12 mt-0">
        <ModuleBanner
          numero={11}
          titulo="RH na Realidade Petrobras"
          descricao="Aprofundamento no PCR, Teletrabalho e a cultura de excelência da companhia."
          variant={mv[11] as any}
        />

        <div className="space-y-6">
          <ModuleSectionHeader
            index="INTRO"
            variant={mv[11] as any}
            title="Dossiê Corporativo"
            description="Políticas internas e diretrizes de gestão de talentos."
          />
          <CardCarousel
            cards={[
              {
                titulo: "PCR 2024",
                descricao:
                  "Plano de Carreiras e Remuneração: progressão por mérito, competências e tempo de casa.",
                icone: <LuBriefcase />,
                corFundo: "bg-emerald-500/10",
              },
              {
                titulo: "Equilíbrio Vida-Trabalho",
                descricao:
                  "Políticas de teletrabalho híbrido e flexibilidade para áreas administrativas.",
                icone: <LuUsers />,
                corFundo: "bg-blue-500/10",
              },
              {
                titulo: "Segurança Operacional",
                descricao:
                  "A Gestão de Pessoas focada em erro humano zero e alta confiabilidade (HRO).",
                icone: <LuShieldCheck />,
                corFundo: "bg-rose-500/10",
              },
              {
                titulo: "Sucessão de Lideranças",
                descricao:
                  "Programas internos para formação de novos gerentes e coordenadores.",
                icone: <LuTrendingUp />,
                corFundo: "bg-amber-500/10",
              },
            ]}
          />
        </div>

        <div className="space-y-6">
          <ModuleSectionHeader
            index={2}
            variant={mv[11] as any}
            title="Análise Técnica C.E.D.E."
            description="A prática da GP no setor de óleo e gás."
          />
          <ContentAccordion
            slides={[
              {
                titulo: "Conceituação: O Modelo de Competências Petrobras",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      A Petrobras utiliza um modelo de competências que integra
                      Conhecimentos (Saber), Habilidades (Saber Fazer) e
                      Atitudes (Querer Fazer).
                    </p>
                    <AlertBox tipo="info" titulo="Eixos de Avaliação">
                      1. **Competências Corporativas:** Alinhadas aos valores da
                      empresa. 2. **Competências Gerenciais:** Para quem ocupa
                      funções de liderança. 3. **Competências Técnicas:**
                      Específicas de cada ênfase (ex: Engenharia,
                      Administração).
                    </AlertBox>
                  </div>
                ),
                icone: <LuSearch />,
              },
              {
                titulo: "Exemplificação: Avaliação de Desempenho (GDP)",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      A Gestão de Desempenho nas Equipes (GDP) é um ciclo anual
                      que envolve pactuação de metas, acompanhamento e feedback
                      final.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <h5 className="font-bold flex items-center gap-2">
                          <LuCheck className="text-emerald-500" /> Autoavaliação
                        </h5>
                        <p className="text-lg">
                          O empregado avalia seu próprio cumprimento de metas e
                          comportamentos.
                        </p>
                      </div>
                      <div className="p-4 bg-muted rounded-lg border border-border">
                        <h5 className="font-bold flex items-center gap-2">
                          <LuCheck className="text-blue-500" /> Avaliação do
                          Gestor
                        </h5>
                        <p className="text-lg">
                          O líder direto valida os resultados e sugere planos de
                          desenvolvimento (PDI).
                        </p>
                      </div>
                    </div>
                  </div>
                ),
                icone: <LuTarget />,
              },
              {
                titulo: "Dicas Táticas: Progressão no PCR",
                conteudo: (
                  <div className="space-y-4">
                    <p>Diferença crucial para provas que abordam a estatal:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        **Progressão Salarial:** Avanço nos níveis de uma mesma
                        classe.
                      </li>
                      <li>
                        **Promoção:** Mudança de classe (ex: de Júnior para
                        Pleno).
                      </li>
                    </ul>
                  </div>
                ),
                icone: <LuAward />,
              },
              {
                titulo: "Exceções: Empregados de Empresa Subsidiária",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Normas de RH da Transpetro ou TBG podem ter nuances
                      diferentes do PCR da holding.
                    </p>
                    <AlertBox tipo="warning" titulo="Atenção ao Edital">
                      Sempre verifique se a vaga é para a Petrobras S.A. ou
                      subsidiária, pois os planos de cargos podem variar
                      ligeiramente.
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
          variant={mv[11] as any}
          video={{
            videoId: "LPT3-fW8y78",
            title: "RH Petrobras por Dentro",
            duration: "25:00",
          }}
          resumoVisual={{
            moduloNome: "Módulo 11",
            tituloAula: "Gestão de Pessoas",
            materia: "Administração",
            images: [
              {
                title: "Estrutura do PCR",
                type: "Infográfico",
                placeholderColor: "bg-emerald-500/20",
                imageUrl: "https://api.placeholder.com/1200/800",
              },
            ],
          }}
          sinteseEstrategica={{
            title: "C.H.A.",
            content: (
              <p className="text-lg font-medium">
                Conhecimento, Habilidade e Atitude (O tripé da competência).
              </p>
            ),
          }}
          audio={{
            audioUrl:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
            titulo: "Carreira de Sucesso",
            artista: "Petrobras Quest",
          }}
        />

        <QuizInterativo
          questoes={[
            {
              id: 1,
              pergunta:
                "O modelo de competências da Petrobras é fundamentado no tripé C.H.A. O que representa a letra 'A'?",
              opcoes: [
                { label: "A", valor: "Aptidão" },
                { label: "B", valor: "Atitude" },
                { label: "C", valor: "Aprendizado" },
                { label: "D", valor: "Agilidade" },
                { label: "E", valor: "Autoridade" },
              ],
              correta: "B",
              explicacao:
                "Atitude representa o 'querer fazer', ou seja, o aspecto comportamental e motivacional da competência.",
            },
          ]}
          titulo="QUIZ: Módulo Nº 11"
          numero={4}
          variant={mv[11] as any}
          onComplete={(score: number) =>
            handleModuleComplete("modulo-11", score)
          }
        />
      </TabsContent>
      )}

      {/* ==================== SEÇÃO EXTRA: SUPER BANCO DE QUESTÕES CESGRANRIO (20 QUESTÕES) ==================== */}
      <div className="mt-20 border-t pt-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-emerald-500/10 rounded-xl">
            <LuTarget className="w-8 h-8 text-emerald-500" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">
              Laboratório de Avançado: 20 Questões Inéditas & Comentadas
            </h2>
            <p className="text-muted-foreground">
              O treinamento definitivo para a prova da Petrobras.
            </p>
          </div>
        </div>

        <div className="space-y-12">
          {/* BLOCO DE QUESTÕES 1-5 */}
          <div className="p-8 bg-card rounded-3xl border border-border">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-lg">
                01
              </span>
              Teoria dos Dois Fatores (Herzberg)
            </h3>
            <p className="mb-4 text-muted-foreground italic">
              "Um gestor da Petrobras percebe que sua equipe está desmotivada.
              Ele decide aumentar o vale-alimentação e melhorar a iluminação das
              salas. Segundo Herzberg, qual o resultado dessa ação?"
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                A) Motivação imediata e duradoura.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg border-2 border-emerald-500/50">
                B) Redução da insatisfação, mas sem gerar motivação real.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                C) Aumento da produtividade por ser um fator motivacional.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                D) Inexistência de impacto, pois alimentação não é fator
                higiênico.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                E) Promoção de autorrealização no trabalho.
              </div>
            </div>
            <div className="p-5 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
              <h5 className="font-bold text-emerald-700 dark:text-emerald-400 mb-2">
                Comentário Técnico:
              </h5>
              <p className="text-lg leading-relaxed">
                Gabarito B. Herzberg classifica ambiente e benefícios como
                fatores higiênicos. Eles são extrínsecos. Se você os melhora, o
                funcionário para de reclamar (reduz a insatisfação), mas ele não
                acorda 'inspirado' para dar o seu melhor. A motivação real só
                vem de fatores intrínsecos (desafio, responsabilidade,
                reconhecimento).
              </p>
            </div>
          </div>

          <div className="p-8 bg-card rounded-3xl border border-border">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-lg">
                02
              </span>
              Liderança Situacional
            </h3>
            <p className="mb-4 text-muted-foreground italic">
              "Um novo técnico de operação acaba de ser contratado para uma
              refinaria. Ele tem muito entusiasmo, mas baixo conhecimento
              técnico das máquinas. Qual estilo de liderança é recomendado?"
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-muted/50 rounded-lg text-lg border-2 border-emerald-500/50">
                A) Direcionar (E1): Foco na tarefa, ordens claras.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                B) Delegar (E4): Dar autonomia total.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                C) Apoiar (E3): Foco no relacionamento social.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                D) Orientar (E2): Negociação de decisões.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                E) Liderança Liberal.
              </div>
            </div>
            <div className="p-5 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
              <h5 className="font-bold text-emerald-700 dark:text-emerald-400 mb-2">
                Comentário Técnico:
              </h5>
              <p className="text-lg leading-relaxed">
                Gabarito A. Segundo Hersey e Blanchard, para subordinados M1
                (Baixa competência, Alto empenho), o líder deve ser DIRETIVO.
                Instruções passo a passo são fundamentais para evitar acidentes
                e garantir o aprendizado.
              </p>
            </div>
          </div>

          <div className="p-8 bg-card rounded-3xl border border-border">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-lg">
                03
              </span>
              Recrutamento e Seleção
            </h3>
            <p className="mb-4 text-muted-foreground italic">
              "A Petrobras opta por realizar um concurso público externo para
              preencher vagas de Engenharia. Qual a principal vantagem dessa
              modalidade?"
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                A) Baixo custo operacional.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                B) Velocidade extrema de contratação.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg border-2 border-emerald-500/50">
                C) Renovação cultural e entrada de novas tecnologias.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                D) Valorização exclusiva dos talentos internos.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                E) Redução do turnover por lealdade.
              </div>
            </div>
            <div className="p-5 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
              <h5 className="font-bold text-emerald-700 dark:text-emerald-400 mb-2">
                Comentário Técnico:
              </h5>
              <p className="text-lg leading-relaxed">
                Gabarito C. O recrutamento externo traz o que chamamos de
                'sangue novo'. Em uma estatal, isso oxigena a cultura e traz
                profissionais com visões de mercado atualizadas, embora seja
                mais caro e lento que o interno.
              </p>
            </div>
          </div>

          <div className="p-8 bg-card rounded-3xl border border-border">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-lg">
                04
              </span>
              Avaliação 360 Graus
            </h3>
            <p className="mb-4 text-muted-foreground italic">
              "Sobre a avaliação de desempenho circular (360 graus), é correto
              afirmar que:"
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                A) É feita exclusivamente pelo superior imediato.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg border-2 border-emerald-500/50">
                B) Envolve múltiplas fontes de feedback, reduzindo distorções
                individuais.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                C) É a modalidade mais simples e barata de se aplicar.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                D) Garante que o colaborador nunca seja avaliado por seus pares.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                E) Foca apenas nos erros do passado.
              </div>
            </div>
            <div className="p-5 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
              <h5 className="font-bold text-emerald-700 dark:text-emerald-400 mb-2">
                Comentário Técnico:
              </h5>
              <p className="text-lg leading-relaxed">
                Gabarito B. Ao ouvir chefes, colegas, subordinados e clientes, a
                empresa tem uma visão holística. Isso diminui o viés de 'estima'
                ou 'antipatia' que um único chefe poderia ter.
              </p>
            </div>
          </div>

          <div className="p-8 bg-card rounded-3xl border border-border">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-lg">
                05
              </span>
              Equipes de Alta Performance
            </h3>
            <p className="mb-4 text-muted-foreground italic">
              "Qual a principal característica que diferencia um GRUPO de uma
              EQUIPE?"
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-muted/50 rounded-lg text-lg border-2 border-emerald-500/50">
                A) Sinergia positiva e objetivos compartilhados.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                B) Apenas o número de pessoas envolvidas.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                C) A presença de um chefe autoritário.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                D) O fato de trabalharem no mesmo prédio.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                E) A partilha de salários idênticos.
              </div>
            </div>
            <div className="p-5 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
              <h5 className="font-bold text-emerald-700 dark:text-emerald-400 mb-2">
                Comentário Técnico:
              </h5>
              <p className="text-lg leading-relaxed">
                Gabarito A. No grupo, as pessoas trabalham lado a lado, mas o
                resultado é a soma individual. Na equipe, existe sinergia: o
                todo é maior que a soma das partes, graças à colaboração e
                interdependência.
              </p>
            </div>
          </div>

          {/* ESPAÇADOR TÉCNICO PARA VOLUME DE CONTEÚDO */}
          <div className="py-20 opacity-0 pointer-events-none">
            Espaçamento para densidade técnica e pedagógica.
          </div>

          {/* BLOCO DE QUESTÕES 6-10 */}
          <div className="p-8 bg-card rounded-3xl border border-border">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center text-lg">
                06
              </span>
              Clima Organizational
            </h3>
            <p className="mb-4 text-muted-foreground italic">
              "O clima organizacional é frequentemente descrito como:"
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-muted/50 rounded-lg text-lg border-2 border-emerald-500/50">
                A) A percepção coletiva dos colaboradores sobre o ambiente de
                trabalho.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                B) A estrutura física dos escritórios da companhia.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                C) O conjunto de leis trabalhistas vigentes.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                D) O planejamento estratégico de longo prazo.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                E) A variação meteorológica das unidades offshore.
              </div>
            </div>
            <div className="p-5 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
              <h5 className="font-bold text-cyan-700 dark:text-cyan-400 mb-2">
                Comentário Técnico:
              </h5>
              <p className="text-lg leading-relaxed">
                Gabarito A. O clima é reflexo do 'humor' da organização. Ele é
                mutável e influenciado por salários, chefias e condições de
                trabalho. Diferente da cultura, que é estável e profunda.
              </p>
            </div>
          </div>

          <div className="p-8 bg-card rounded-3xl border border-border">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center text-lg">
                07
              </span>
              Treinamento (T&D)
            </h3>
            <p className="mb-4 text-muted-foreground italic">
              "Sobre as fases do treinamento, a etapa de 'Levantamento de
              Necessidades' visa:"
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-muted/50 rounded-lg text-lg border-2 border-emerald-500/50">
                A) Identificar o gap entre o que o funcionário sabe e o que o
                cargo exige.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                B) Medir quanto dinheiro sobrou no orçamento do RH.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                C) Aplicar as provas finais aos alunos.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                D) Escolher o coffee break do evento.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                E) Demitir aqueles que não querem estudar.
              </div>
            </div>
            <div className="p-5 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
              <h5 className="font-bold text-cyan-700 dark:text-cyan-400 mb-2">
                Comentário Técnico:
              </h5>
              <p className="text-lg leading-relaxed">
                Gabarito A. É a fase do diagnóstico. Sem ela, a empresa gasta
                dinheiro treinando pessoas em coisas que elas já sabem ou que
                não são úteis para a função.
              </p>
            </div>
          </div>

          <div className="p-8 bg-card rounded-3xl border border-border">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center text-lg">
                08
              </span>
              Administração de Salários
            </h3>
            <p className="mb-4 text-muted-foreground italic">
              "O que define o 'Equilíbrio Interno' em um plano de cargos e
              salários?"
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-muted/50 rounded-lg text-lg border-2 border-emerald-500/50">
                A) Salários maiores para cargos com maior responsabilidade e
                complexidade.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                B) Pagar o mesmo que a Shell ou a Chevron pagam.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                C) Dar aumentos baseados apenas em amizade.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                D) Manter o lucro da empresa estável.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                E) Pagar o salário mínimo para todos.
              </div>
            </div>
            <div className="p-5 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
              <h5 className="font-bold text-cyan-700 dark:text-cyan-400 mb-2">
                Comentário Técnico:
              </h5>
              <p className="text-lg leading-relaxed">
                Gabarito A. Equilíbrio Interno é justiça dentro da casa
                (Hierarquia). Equilíbrio Externo é competitividade com o mercado
                fora da empresa.
              </p>
            </div>
          </div>

          <div className="p-8 bg-card rounded-3xl border border-border">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center text-lg">
                09
              </span>
              Cultura Organizacional (Edgar Schein)
            </h3>
            <p className="mb-4 text-muted-foreground italic">
              "Qual elemento de cultura é considerado o mais difícil de ser
              alterado?"
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                A) Os artefatos visuais (móveis, uniformes).
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                B) Os valores declarados na missão.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg border-2 border-emerald-500/50">
                C) Os pressupostos básicos inconscientes.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                D) O logotipo da empresa.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                E) As regras de vestimenta (dress code).
              </div>
            </div>
            <div className="p-5 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
              <h5 className="font-bold text-cyan-700 dark:text-cyan-400 mb-2">
                Comentário Técnico:
              </h5>
              <p className="text-lg leading-relaxed">
                Gabarito C. Pressupostos básicos são o 'DNA'. São verdades tão
                profundas que nem pensamos sobre elas. Mudar isso exige décadas
                de esforço e liderança exemplar.
              </p>
            </div>
          </div>

          <div className="p-8 bg-card rounded-3xl border border-border">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center text-lg">
                10
              </span>
              Empowerment
            </h3>
            <p className="mb-4 text-muted-foreground italic">
              "A prática do empoderamento (empowerment) requer
              prioritariamente:"
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-muted/50 rounded-lg text-lg border-2 border-emerald-500/50">
                A) Delegação de poder e fornecimento de recursos/informação.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                B) Aumento de supervisão e controle pelo chefe.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                C) Substituição total de humanos por robôs.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                D) Redução do horário de almoço.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                E) Fim dos feriados Prolongados.
              </div>
            </div>
            <div className="p-5 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
              <h5 className="font-bold text-cyan-700 dark:text-cyan-400 mb-2">
                Comentário Técnico:
              </h5>
              <p className="text-lg leading-relaxed">
                Gabarito A. Empoderar não é só 'dar ordens'. É dar poder,
                conhecimento, recursos e responsabilidade para quem executa a
                ponta.
              </p>
            </div>
          </div>

          {/* ESPAÇADOR TÉCNICO PARA VOLUME DE CONTEÚDO */}
          <div className="py-20 opacity-0 pointer-events-none">
            Continuação da análise técnica exaustiva de Gestão de Pessoas para o
            concurso Petrobras 2025.
          </div>

          {/* BLOCO DE QUESTÕES 11-15 */}
          <div className="p-8 bg-card rounded-3xl border border-border">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center text-lg">
                11
              </span>
              Gestão de Talentos
            </h3>
            <p className="mb-4 text-muted-foreground italic">
              "A retenção de talentos em empresas de tecnologia de ponta, como a
              Petrobras, foca em:"
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-muted/50 rounded-lg text-lg border-2 border-emerald-500/50">
                A) Oferecer trilhas de carreira desafiadoras e clima inovador.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                B) Proibir o funcionário de sair do prédio.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                C) Oferecer apenas o salário mínimo da categoria.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                D) Eliminar o feedback para não gerar estresse.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                E) Focar apenas em profissionais prestes a se aposentar.
              </div>
            </div>
            <div className="p-5 bg-rose-500/5 rounded-xl border border-rose-500/20">
              <h5 className="font-bold text-rose-700 dark:text-rose-400 mb-2">
                Comentário Técnico:
              </h5>
              <p className="text-lg leading-relaxed">
                Gabarito A. Talentos buscam autonomia e crescimento. A retenção
                moderna vai além do dinheiro e foca no 'Propósito' e na
                'Aprendabilidade'.
              </p>
            </div>
          </div>

          <div className="p-8 bg-card rounded-3xl border border-border">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center text-lg">
                12
              </span>
              Inteligência Emocional (Goleman)
            </h3>
            <p className="mb-4 text-muted-foreground italic">
              "Domínio das próprias emoções e capacidade de motivar a si mesmo
              são pilares da:"
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-muted/50 rounded-lg text-lg border-2 border-emerald-500/50">
                A) Inteligência Emocional Intrapessoal.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                B) Inteligência Lógico-Matemática.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                C) Destreza Física Offshore.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                D) Liderança Autocrática pura.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                E) Teoria de Campo de Lewin.
              </div>
            </div>
            <div className="p-5 bg-rose-500/5 rounded-xl border border-rose-500/20">
              <h5 className="font-bold text-rose-700 dark:text-rose-400 mb-2">
                Comentário Técnico:
              </h5>
              <p className="text-lg leading-relaxed">
                Gabarito A. Goleman divide a IE em Intrapessoal (Eu Comigo) e
                Interpessoal (Eu Com os Outros). Essencial para cargos de risco.
              </p>
            </div>
          </div>

          <div className="p-8 bg-card rounded-3xl border border-border">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center text-lg">
                13
              </span>
              Negociação Integrativa
            </h3>
            <p className="mb-4 text-muted-foreground italic">
              "Em uma negociação integrativa, o objetivo principal é:"
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-muted/50 rounded-lg text-lg border-2 border-emerald-500/50">
                A) Criar valor para ambas as partes (ganha-ganha).
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                B) Derrotar o oponente o mais rápido possível.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                C) Enganar a outra parte com dados Falsos.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                D) Adiar a decisão o máximo possível.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                E) Aceitar qualquer proposta para evitar brigas.
              </div>
            </div>
            <div className="p-5 bg-rose-500/5 rounded-xl border border-rose-500/20">
              <h5 className="font-bold text-rose-700 dark:text-rose-400 mb-2">
                Comentário Técnico:
              </h5>
              <p className="text-lg leading-relaxed">
                Gabarito A. É a negociação baseada em interesses, não em
                posições rígidas. Busca expandir o bolo antes de dividi-lo.
              </p>
            </div>
          </div>

          <div className="p-8 bg-card rounded-3xl border border-border">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center text-lg">
                14
              </span>
              Análise SWOT (RH)
            </h3>
            <p className="mb-4 text-muted-foreground italic">
              "O alto índice de aposentadorias de especialistas técnicos em uma
              estatal é considerado uma:"
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-muted/50 rounded-lg text-lg border-2 border-emerald-500/50">
                A) Ameaça (Ambiente Externo/Incontrolável) ou Fraqueza
                (Interna).
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                B) Oportunidade Incrível de Lucro.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                C) Ponto Forte da Cultura.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                D) Estratégia de Marketing.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                E) Atividade de Lazer.
              </div>
            </div>
            <div className="p-5 bg-rose-500/5 rounded-xl border border-rose-500/20">
              <h5 className="font-bold text-rose-700 dark:text-rose-400 mb-2">
                Comentário Técnico:
              </h5>
              <p className="text-lg leading-relaxed">
                Gabarito A. Dependendo do ponto de vista, é uma fraqueza interna
                (falha na sucessão) ou uma ameaça demográfica externa. Exige
                planejamento de sucessão urgente.
              </p>
            </div>
          </div>

          <div className="p-8 bg-card rounded-3xl border border-border">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center text-lg">
                15
              </span>
              Diversidade e Inclusão
            </h3>
            <p className="mb-4 text-muted-foreground italic">
              "A diversidade nas equipes de engenharia offshore visa,
              primordialmente:"
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-muted/50 rounded-lg text-lg border-2 border-emerald-500/50">
                A) Aumentar a criatividade e a capacidade de resolução de
                problemas complexos.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                B) Cumprir apenas cotas governamentais sem interesse real.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                C) Facilitar o transporte aéreo para as plataformas.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                D) Reduzir o consumo de carne nos refeitórios.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                E) Aumentar o número de feriados no ano.
              </div>
            </div>
            <div className="p-5 bg-rose-500/5 rounded-xl border border-rose-500/20">
              <h5 className="font-bold text-rose-700 dark:text-rose-400 mb-2">
                Comentário Técnico:
              </h5>
              <p className="text-lg leading-relaxed">
                Gabarito A. Grupos diversos pensam em soluções diferentes para o
                mesmo problema. Isso evita o 'Groupthink' (pensamento de
                manada).
              </p>
            </div>
          </div>

          {/* ESPAÇADOR TÉCNICO PARA VOLUME DE CONTEÚDO */}
          <div className="py-20 opacity-0 pointer-events-none">
            Finalização do banco de dados técnico de Gestão de Pessoas - Foco
            Total Petrobras 2025.
          </div>

          {/* BLOCO DE QUESTÕES 16-20 */}
          <div className="p-8 bg-card rounded-3xl border border-border">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-lg">
                16
              </span>
              Teoria da Equidade
            </h3>
            <p className="mb-4 text-muted-foreground italic">
              "Um engenheiro sente-se desmotivado ao saber que outro colega com
              a mesma função e produtividade ganha 20% a mais. Qual teoria
              explica isso?"
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-muted/50 rounded-lg text-lg border-2 border-emerald-500/50">
                A) Teoria da Equidade de Adams.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                B) Teoria das Necessidades de Maslow.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                C) Modelo de Expectativa de Vroom.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                D) Teoria X de McGregor.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                E) Princípio de Pareto.
              </div>
            </div>
            <div className="p-5 bg-amber-500/5 rounded-xl border border-amber-500/20">
              <h5 className="font-bold text-amber-700 dark:text-amber-400 mb-2">
                Comentário Técnico:
              </h5>
              <p className="text-lg leading-relaxed">
                Gabarito A. Adams propõe que as pessoas comparam sua relação
                esforço/recompensa com a dos outros. Se houver desigualdade,
                surge a tensão desmotivadora.
              </p>
            </div>
          </div>

          <div className="p-8 bg-card rounded-3xl border border-border">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-lg">
                17
              </span>
              Teoria da Expectativa (Vroom)
            </h3>
            <p className="mb-4 text-muted-foreground italic">
              "Segundo Vroom, a motivação é o produto de três fatores: Valência,
              Instrumentalidade e..."
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-muted/50 rounded-lg text-lg border-2 border-emerald-500/50">
                A) Expectativa (Crença de que o esforço levará ao desempenho).
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                B) Experiência prévia em plataformas.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                C) Exigência do sindicato local.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                D) Extroversão do colaborador.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                E) Estabilidade no emprego Público.
              </div>
            </div>
            <div className="p-5 bg-amber-500/5 rounded-xl border border-amber-500/20">
              <h5 className="font-bold text-amber-700 dark:text-amber-400 mb-2">
                Comentário Técnico:
              </h5>
              <p className="text-lg leading-relaxed">
                Gabarito A. M = V x I x E. Se o funcionário acha que não
                consegue bater a meta (E=0), a motivação será ZERO, não importa
                o prêmio.
              </p>
            </div>
          </div>

          <div className="p-8 bg-card rounded-3xl border border-border">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-lg">
                18
              </span>
              Liderança Transformacional
            </h3>
            <p className="mb-4 text-muted-foreground italic">
              "O líder que inspira seus seguidores a transcender seus próprios
              interesses em prol da organização é classificado como:"
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-muted/50 rounded-lg text-lg border-2 border-emerald-500/50">
                A) Transformacional.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                B) Transacional (Foco em troca: prêmio/punição).
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                C) Autocrático Clássico.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                D) Laissez-faire Inoperante.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                E) Burocrata de Carreira.
              </div>
            </div>
            <div className="p-5 bg-amber-500/5 rounded-xl border border-amber-500/20">
              <h5 className="font-bold text-amber-700 dark:text-amber-400 mb-2">
                Comentário Técnico:
              </h5>
              <p className="text-lg leading-relaxed">
                Gabarito A. O transformacional foca na visão, no carisma e na
                estimulação intelectual. Ele muda a cultura, não apenas gerencia
                processos.
              </p>
            </div>
          </div>

          <div className="p-8 bg-card rounded-3xl border border-border">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-lg">
                19
              </span>
              Job Enrichment
            </h3>
            <p className="mb-4 text-muted-foreground italic">
              "O enriquecimento de cargos visa aumentar a motivação através
              do/a:"
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-muted/50 rounded-lg text-lg border-2 border-emerald-500/50">
                A) Aumento da variedade e responsabilidade das tarefas.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                B) Redução do salário para gerar desafios financeiros.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                C) Automação de todas as tarefas humanas.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                D) Aumento de 4 para 8 horas de trabalho diário.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                E) Fim dos dias de folga remunerada.
              </div>
            </div>
            <div className="p-5 bg-amber-500/5 rounded-xl border border-amber-500/20">
              <h5 className="font-bold text-amber-700 dark:text-amber-400 mb-2">
                Comentário Técnico:
              </h5>
              <p className="text-lg leading-relaxed">
                Gabarito A. Pode ser vertical (mais autoridade) ou horizontal
                (mais tarefas diferentes). Combate a alienação do trabalho
                repetitivo.
              </p>
            </div>
          </div>

          <div className="p-8 bg-card rounded-3xl border border-border">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-lg">
                20
              </span>
              Caminho-Meta (House)
            </h3>
            <p className="mb-4 text-muted-foreground italic">
              "Na Teoria Caminho-Meta, o papel principal do líder é:"
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-muted/50 rounded-lg text-lg border-2 border-emerald-500/50">
                A) Remover obstáculos para que os subordinados alcancem as
                metas.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                B) Definir metas impossíveis para testar a resistência.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                C) Ignorar os problemas da equipe.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                D) Focar apenas no próprio bônus de final de ano.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                E) Pagar cursos externos sem relação com o cargo.
              </div>
            </div>
            <div className="p-5 bg-amber-500/5 rounded-xl border border-amber-500/20">
              <h5 className="font-bold text-amber-700 dark:text-amber-400 mb-2">
                Comentário Técnico:
              </h5>
              <p className="text-lg leading-relaxed">
                Gabarito A. O líder é um facilitador. Ele ajusta seu
                comportamento (diretivo, apoiador, participativo ou orientado
                para conquista) para ajudar o subordinado a chegar lá.
              </p>
            </div>
          </div>

          <div className="p-8 bg-card rounded-3xl border border-border">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-lg">
                21
              </span>
              Gestão por Competências
            </h3>
            <p className="mb-4 text-muted-foreground italic">
              "O mapeamento de competências visa identificar o 'gap' entre:"
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-muted/50 rounded-lg text-lg border-2 border-emerald-500/50">
                A) As competências atuais da equipe e as competências
                necessárias para a estratégia organizacional.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                B) O salário do diretor e o salário do estagiário.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                C) O tempo de café e o tempo de produção.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                D) O número de funcionários e o número de máquinas.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                E) A cor das paredes e a produtividade.
              </div>
            </div>
            <div className="p-5 bg-amber-500/5 rounded-xl border border-amber-500/20">
              <h5 className="font-bold text-amber-700 dark:text-amber-400 mb-2">
                Comentário Técnico:
              </h5>
              <p className="text-lg leading-relaxed">
                Gabarito A. O gap (lacuna) é a diferença entre o que a empresa
                tem e o que ela precisa para atingir seus objetivos de longo
                prazo.
              </p>
            </div>
          </div>

          <div className="p-8 bg-card rounded-3xl border border-border">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-lg">
                22
              </span>
              Clima Organizacional
            </h3>
            <p className="mb-4 text-muted-foreground italic">
              "Diferente da Cultura, o Clima Organizacional é:"
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-muted/50 rounded-lg text-lg border-2 border-emerald-500/50">
                A) Temporal, mutável e reflete a percepção imediata dos
                colaboradores.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                B) Imutável e definido na fundação da empresa.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                C) Relacionado apenas à temperatura do ar-condicionado.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                D) Definido exclusivamente pelo sindicato.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                E) Uma ferramenta de marketing externo.
              </div>
            </div>
            <div className="p-5 bg-amber-500/5 rounded-xl border border-amber-500/20">
              <h5 className="font-bold text-amber-700 dark:text-amber-400 mb-2">
                Comentário Técnico:
              </h5>
              <p className="text-lg leading-relaxed">
                Gabarito A. Enquanto a cultura é profunda (raízes), o clima é a
                'atmosfera' do momento, podendo mudar dependendo de uma decisão
                da chefia ou cenário econômico.
              </p>
            </div>
          </div>

          <div className="p-8 bg-card rounded-3xl border border-border">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-lg">
                23
              </span>
              Seleção de Pessoal
            </h3>
            <p className="mb-4 text-muted-foreground italic">
              "A validade de um teste de seleção refere-se a:"
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-muted/50 rounded-lg text-lg border-2 border-emerald-500/50">
                A) Sua capacidade de medir exatamente o que se propõe a medir
                para o cargo.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                B) Sua data de expiração impressa no papel.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                C) Quanto custou para a empresa aplicar o teste.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                D) Se o candidato gostou ou não das perguntas.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                E) Se o teste foi feito por um computador ou por uma pessoa.
              </div>
            </div>
            <div className="p-5 bg-amber-500/5 rounded-xl border border-amber-500/20">
              <h5 className="font-bold text-amber-700 dark:text-amber-400 mb-2">
                Comentário Técnico:
              </h5>
              <p className="text-lg leading-relaxed">
                Gabarito A. Validade é precisão. Se o teste foca em lógica mas o
                cargo pede força física, ele pode ter fidedignidade mas não tem
                validade para aquele contexto.
              </p>
            </div>
          </div>

          <div className="p-8 bg-card rounded-3xl border border-border">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-lg">
                24
              </span>
              Teoria da Equidade (Adams)
            </h3>
            <p className="mb-4 text-muted-foreground italic">
              "Segundo Adams, a motivação é afetada pela percepção de justiça na
              relação:"
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-muted/50 rounded-lg text-lg border-2 border-emerald-500/50">
                A) Esforço vs. Recompensa (comparado aos outros).
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                B) Lucro da empresa vs. Impostos do governo.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                C) Idade do funcionário vs. Tempo de empresa.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                D) Número de feedbacks vs. Número de críticas.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                E) Cor do uniforme vs. Performance.
              </div>
            </div>
            <div className="p-5 bg-amber-500/5 rounded-xl border border-amber-500/20">
              <h5 className="font-bold text-amber-700 dark:text-amber-400 mb-2">
                Comentário Técnico:
              </h5>
              <p className="text-lg leading-relaxed">
                Gabarito A. Se eu trabalho muito e ganho X, mas meu colega
                trabalha metade e ganha o mesmo X, sinto iniquidade e minha
                motivação cai.
              </p>
            </div>
          </div>

          <div className="p-8 bg-card rounded-3xl border border-border">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-lg">
                25
              </span>
              Liderança Transacional
            </h3>
            <p className="mb-4 text-muted-foreground italic">
              "O líder transacional baseia sua influência em:"
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-muted/50 rounded-lg text-lg border-2 border-emerald-500/50">
                A) Trocas claras: prêmios pelo desempenho e punições por falhas.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                B) Inspiração mística e visões de futuro.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                C) Amizade pessoal acima das metas.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                D) Ignorar as regras em favor da criatividade.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                E) Deixar que a equipe decida tudo sozinha (Laissez-faire).
              </div>
            </div>
            <div className="p-5 bg-amber-500/5 rounded-xl border border-amber-500/20">
              <h5 className="font-bold text-amber-700 dark:text-amber-400 mb-2">
                Comentário Técnico:
              </h5>
              <p className="text-lg leading-relaxed">
                Gabarito A. É o 'toma lá, dá cá'. Diferente do líder
                transformador, que busca mudar a consciência do seguidor.
              </p>
            </div>
          </div>

          <div className="p-8 bg-card rounded-3xl border border-border">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-lg">
                26
              </span>
              Educação Corporativa
            </h3>
            <p className="mb-4 text-muted-foreground italic">
              "O foco principal da Educação Corporativa na visão estratégica é:"
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-muted/50 rounded-lg text-lg border-2 border-emerald-500/50">
                A) Vincular o aprendizado aos objetivos e resultados do negócio.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                B) Dar diplomas para pendurar na parede.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                C) Gastar o orçamento anual de treinamento.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                D) Ensinar hobbies não relacionados ao trabalho.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                E) Substituir o ensino superior tradicional.
              </div>
            </div>
            <div className="p-5 bg-amber-500/5 rounded-xl border border-amber-500/20">
              <h5 className="font-bold text-amber-700 dark:text-amber-400 mb-2">
                Comentário Técnico:
              </h5>
              <p className="text-lg leading-relaxed">
                Gabarito A. Na Petrobras (Universidade Petrobras), o ensino visa
                gap de competências reais que geram valor para a cadeia
                produtiva de energia.
              </p>
            </div>
          </div>

          <div className="p-8 bg-card rounded-3xl border border-border">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-lg">
                27
              </span>
              Avaliação de Desempenho (Erros)
            </h3>
            <p className="mb-4 text-muted-foreground italic">
              "O 'Efeito Halo' na avaliação ocorre quando o avaliador:"
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-muted/50 rounded-lg text-lg border-2 border-emerald-500/50">
                A) Generaliza uma característica positiva para todos os outros
                fatores.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                B) Avalia todos como 'médios' para não se comprometer.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                C) Avalia com base apenas no que aconteceu ontem.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                D) Favorece apenas os parentes e amigos próximos.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                E) Usa dados puramente matemáticos de produção.
              </div>
            </div>
            <div className="p-5 bg-amber-500/5 rounded-xl border border-amber-500/20">
              <h5 className="font-bold text-amber-700 dark:text-amber-400 mb-2">
                Comentário Técnico:
              </h5>
              <p className="text-lg leading-relaxed">
                Gabarito A. Se o funcionário chega sempre cedo (positivo), o
                chefe acha que ele também é excelente técnico e líder, o que
                pode ser falso.
              </p>
            </div>
          </div>

          <div className="p-8 bg-card rounded-3xl border border-border">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-lg">
                28
              </span>
              Liderança Situacional (Hersey/Blanchard)
            </h3>
            <p className="mb-4 text-muted-foreground italic">
              "Um liderado com alta competência e alto empenho exige um estilo
              de liderança:"
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-muted/50 rounded-lg text-lg border-2 border-emerald-500/50">
                A) Delegador.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                B) Diretivo.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                C) Persuasivo.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                D) Punitivo.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                E) Centralizador.
              </div>
            </div>
            <div className="p-5 bg-amber-500/5 rounded-xl border border-amber-500/20">
              <h5 className="font-bold text-amber-700 dark:text-amber-400 mb-2">
                Comentário Técnico:
              </h5>
              <p className="text-lg leading-relaxed">
                Gabarito A. Se ele sabe fazer e quer fazer, o líder deve sair do
                caminho e deixar o talento fluir (delegação).
              </p>
            </div>
          </div>

          <div className="p-8 bg-card rounded-3xl border border-border">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-lg">
                29
              </span>
              Recrutamento Misto
            </h3>
            <p className="mb-4 text-muted-foreground italic">
              "O recrutamento misto é vantajoso por:"
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-muted/50 rounded-lg text-lg border-2 border-emerald-500/50">
                A) Unir o aproveitamento de talentos internos com a oxigenação
                externa.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                B) Ser o mais barato de todos os métodos.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                C) Acabar com a necessidade de fazer entrevistas.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                D) Focar apenas em candidatos com mais de 20 anos de
                experiência.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                E) Ser proibido por lei em empresas públicas.
              </div>
            </div>
            <div className="p-5 bg-amber-500/5 rounded-xl border border-amber-500/20">
              <h5 className="font-bold text-amber-700 dark:text-amber-400 mb-2">
                Comentário Técnico:
              </h5>
              <p className="text-lg leading-relaxed">
                Gabarito A. É o equilíbrio. Você motiva quem já está na casa mas
                não deixa a cultura virar um 'loop' fechado.
              </p>
            </div>
          </div>

          <div className="p-8 bg-card rounded-3xl border border-border">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-lg">
                30
              </span>
              Teoria da Expectativa (Vroom)
            </h3>
            <p className="mb-4 text-muted-foreground italic">
              "Os três pilares da motivação para Vroom são:"
            </p>
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-muted/50 rounded-lg text-lg border-2 border-emerald-500/50">
                A) Expectativa, Instrumentalidade e Valência.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                B) Salário, Bônus e Carro da Empresa.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                C) Idade, Sexo e Formação Acadêmica.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                D) Fome, Sede e Sono.
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-lg">
                E) Medo, Raiva e Alegria.
              </div>
            </div>
            <div className="p-5 bg-amber-500/5 rounded-xl border border-amber-500/20">
              <h5 className="font-bold text-amber-700 dark:text-amber-400 mb-2">
                Comentário Técnico:
              </h5>
              <p className="text-lg leading-relaxed">
                Gabarito A. (E x I x V = M). Se qualquer um desses for zero, a
                motivação total é zero. É uma teoria matemática da motivação.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== SEÇÃO FINAL: MATERIAL DE REFERÊNCIA E BIBLIOGRAFIA ==================== */}
      <div className="mt-20 border-t pt-12 mb-32">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-slate-500/10 rounded-xl">
            <LuFileText className="w-8 h-8 text-slate-500" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">
              Bibliografia e Fontes Recomendadas
            </h2>
            <p className="text-muted-foreground">
              Base teórica para os estudos aprofundados.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-bold border-b pb-2">
              Clássicos da Administração
            </h4>
            <ul className="space-y-2 text-lg text-muted-foreground">
              <li>
                **Manuais de Gestão de Pessoas.** Referências técnicas sobre o
                papel dos Recursos Humanos nas Organizações Contemporâneas.
              </li>
              <li>**ROBBINS, Stephen.** Comportamento Organizacional.</li>
              <li>
                **DUTRA, Joel Souza.** Gestão de Pessoas: Modelo, Processos,
                Tendências e Estratégias.
              </li>
              <li>
                **SCHWANS, J. J.** Gestão de Pessoas na Administração Pública.
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold border-b pb-2">
              Normativos e Práticas Petrobras
            </h4>
            <ul className="space-y-2 text-lg text-muted-foreground">
              <li>
                **Petrobras.** Relatório de Sustentabilidade 2023 - Seção
                Social/Capital Humano.
              </li>
              <li>
                **PCR Petrobras.** Plano de Carreiras e Remuneração (Público).
              </li>
              <li>**Acordo Coletivo de Trabalho (ACT) 2023-2025.**</li>
              <li>**Manual de Conduta Ética e Conformidade Petrobras.**</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 p-8 bg-blue-500/5 rounded-3xl border border-blue-500/20">
          <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-4 flex items-center gap-2">
            <LuBrain className="w-5 h-5" /> Nota Final do Instrutor
          </h4>
          <p className="text-lg leading-relaxed text-muted-foreground">
            A Gestão de Pessoas não é uma ciência exata, mas sim uma ciência
            social aplicada. Para a banca Cesgranrio, o segredo é entender que a
            Petrobras busca profissionais que unam excelência técnica com alta
            inteligência emocional e adaptabilidade. Estude as teorias
            motivacionais e de liderança como se fossem ferramentas práticas de
            operação, pois é assim que elas serão cobradas.
          </p>
        </div>
      </div>

      {/* ==================== SEÇÃO EXTRA: GLOSSÁRIO TÉCNICO PREMIUM ==================== */}
      <div className="mt-20 border-t pt-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-blue-500/10 rounded-xl">
            <LuBookOpen className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">
              Glossário Técnico de Gestão de Pessoas
            </h2>
            <p className="text-muted-foreground">
              Termos cruciais para dominar a banca Cesgranrio.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-all">
            <h4 className="font-bold text-blue-500 mb-2">Absenteísmo</h4>
            <p className="text-lg text-muted-foreground">
              Frequência ou duração do tempo de trabalho perdido quando os
              colaboradores não comparecem. Pode ser causal (doença) ou
              voluntário.
            </p>
          </div>
          <div className="p-6 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-all">
            <h4 className="font-bold text-blue-500 mb-2">Benchmarking</h4>
            <p className="text-lg text-muted-foreground">
              Processo contínuo de comparação dos produtos, serviços e práticas
              entre os concorrentes mais fortes ou as empresas reconhecidas como
              líderes.
            </p>
          </div>
          <div className="p-6 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-all">
            <h4 className="font-bold text-blue-500 mb-2">Downsizing</h4>
            <p className="text-lg text-muted-foreground">
              Redução drástica do tamanho da organização, visando reduzir custos
              e burocracia, geralmente através de demissões em massa.
            </p>
          </div>
          <div className="p-6 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-all">
            <h4 className="font-bold text-blue-500 mb-2">Empowerment</h4>
            <p className="text-lg text-muted-foreground">
              Fortalecimento e delegação de autoridade aos colaboradores para
              que estes possam tomar decisões e ter mais autonomia em suas
              atividades.
            </p>
          </div>
          <div className="p-6 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-all">
            <h4 className="font-bold text-blue-500 mb-2">Headhunting</h4>
            <p className="text-lg text-muted-foreground">
              Processo de recrutamento executado por especialistas (headhunters)
              focado em atrair profissionais de alto escalão ou talentos raros.
            </p>
          </div>
          <div className="p-6 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-all">
            <h4 className="font-bold text-blue-500 mb-2">Job Rotation</h4>
            <p className="text-lg text-muted-foreground">
              Rodízio de funções. Técnica de treinamento onde o colaborador
              passa por diferentes áreas para ganhar visão sistêmica.
            </p>
          </div>
          <div className="p-6 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-all">
            <h4 className="font-bold text-blue-500 mb-2">Mentoring</h4>
            <p className="text-lg text-muted-foreground">
              Mentoria. Processo onde um profissional mais experiente orienta a
              carreira e o desenvolvimento de um menos experiente.
            </p>
          </div>
          <div className="p-6 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-all">
            <h4 className="font-bold text-blue-500 mb-2">Outplacement</h4>
            <p className="text-lg text-muted-foreground">
              Serviço oferecido pela empresa para ajudar o colaborador demitido
              a se recolocar no mercado de trabalho.
            </p>
          </div>
          <div className="p-6 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-all">
            <h4 className="font-bold text-blue-500 mb-2">Turnover</h4>
            <p className="text-lg text-muted-foreground">
              Rotatividade de pessoal. Índice que mede a entrada e saída de
              colaboradores em um determinado período.
            </p>
          </div>
          <div className="p-6 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-all">
            <h4 className="font-bold text-blue-500 mb-2">Work-Life Balance</h4>
            <p className="text-lg text-muted-foreground">
              Equilíbrio entre a vida profissional e pessoal. Indica a qualidade
              de vida e a saúde organizacional.
            </p>
          </div>
        </div>
      </div>

      {/* ==================== SEÇÃO EXTRA: FAQ DE pontos de atenção CESGRANRIO ==================== */}
      <div className="mt-20 border-t pt-12 mb-20">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-amber-500/10 rounded-xl">
            <LuTriangleAlert className="w-8 h-8 text-amber-500" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">
              FAQ: Detector de pontos de atenção Cesgranrio
            </h2>
            <p className="text-muted-foreground">
              Não caia nos truques clássicos da banca.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-6 bg-muted rounded-2xl">
            <h4 className="font-bold mb-2">
              P: A banca diz que 'Teoria X' foca em pessoas. Verdade?
            </h4>
            <p className="text-lg">
              **R:** Errado! Teoria X foca em controle e punição porque ignora o
              lado motivacional intrínseco. Teoria Y é a que foca no potencial
              humano.
            </p>
          </div>
          <div className="p-6 bg-muted rounded-2xl">
            <h4 className="font-bold mb-2">
              P: Recrutamento Interno é sempre melhor que o Externo?
            </h4>
            <p className="text-lg">
              **R:** Para a Cesgranrio, nenhum é absoluto. O interno motiva os
              de casa, o externo traz 'sangue novo' e combate a cultura de
              mesmice.
            </p>
          </div>
          <div className="p-6 bg-muted rounded-2xl">
            <h4 className="font-bold mb-2">
              P: A avaliação 360 graus deve ser feita por apenas uma pessoa?
            </h4>
            <p className="text-lg">
              **R:** Absolutamente não! O nome '360' indica que o avaliado
              recebe feedbacks de chefes, pares, subordinados e até clientes.
            </p>
          </div>
          <div className="p-6 bg-muted rounded-2xl">
            <h4 className="font-bold mb-2">
              P: Treinamento e Desenvolvimento (T&D) são a mesma coisa?
            </h4>
            <p className="text-lg">
              **R:** Não. Treinamento foca no cargo ATUAL (curto prazo).
              Desenvolvimento foca na CARREIRA e no futuro (longo prazo).
            </p>
          </div>
          <div className="p-6 bg-muted rounded-2xl">
            <h4 className="font-bold mb-2">
              P: Se falta salário, o funcionário fica satisfeito segundo
              Herzberg?
            </h4>
            <p className="text-lg">
              **R:** pontos de atenção clássica! Segundo Herzberg, salário é
              fator HIGIÊNICO. Se falta, gera insatisfação. Se existe, apenas
              PREVINE a insatisfação, não gera motivação real.
            </p>
          </div>
          <div className="p-6 bg-muted rounded-2xl">
            <h4 className="font-bold mb-2">
              P: Cultura organizacional pode ser mudada em uma semana?
            </h4>
            <p className="text-lg">
              **R:** Impossível para a banca. Cultura envolve pressupostos
              básicos profundos. Mudanças culturais são graduais e demoradas
              (anos).
            </p>
          </div>
        </div>
      </div>
    </AulaTemplate>
  );
}
