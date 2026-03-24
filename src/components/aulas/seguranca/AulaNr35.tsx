"use client";

import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { getModuleVariant } from "@/lib/moduleColors";

import {
  ModuleConsolidation,
  QuizInterativo,
  ModuleBanner,
  getRandomQuestions,
  AulaProps,
  ContentAccordion,
  AulaTemplate,
  ModuleSectionHeader,
  RichIntro,
  TimelineItem,
  ComparisonSide,
} from "../shared";

import {
  LuBookOpen,
  LuLightbulb,
  LuPlay,
  LuTriangleAlert,
  LuShield,
  LuZap,
  LuFileText,
  LuCheck,
  LuArrowUpCircle,
  LuCloudRain,
  LuHistory,
  LuConstruction,
} from "react-icons/lu";

import {
  QUIZ_M1_NR35_INTRO,
  QUIZ_M2_NR35_AR_PT,
  QUIZ_M3_NR35_CAPACITACAO,
  QUIZ_M4_NR35_SPQ,
  QUIZ_M5_NR35_ANCORAGEM,
  QUIZ_M6_NR35_EPIS,
  QUIZ_M7_NR35_CORDAS,
  QUIZ_M8_NR35_SISTEMAS,
  QUIZ_M9_NR35_ESCADAS,
  QUIZ_M10_NR35_RESGATE,
} from "./data/nr35-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Introdução e Objetivos" },
  { id: "modulo-2", label: "Módulo 2", title: "Planejamento e Organização (AR/PT)" },
  { id: "modulo-3", label: "Módulo 3", title: "Capacitação e Treinamento" },
  { id: "modulo-4", label: "Módulo 4", title: "Sistemas de Proteção (SPQ)" },
  { id: "modulo-5", label: "Módulo 5", title: "Ancoragem e Retenção" },
  { id: "modulo-6", label: "Módulo 6", title: "EPIs e Equipamentos" },
  { id: "modulo-7", label: "Módulo 7", title: "Acesso por Cordas" },
  { id: "modulo-8", label: "Módulo 8", title: "Sistemas de Ancoragem (Anexo II)" },
  { id: "modulo-9", label: "Módulo 9", title: "Escadas (Anexo III - NOVO 2023)" },
  { id: "modulo-10", label: "Módulo 10", title: "Emergência e Salvamento" },
] as const;

export default function AulaNr35({
  onComplete,
  isCompleted,
  loading,
  xpGanho = 50,
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

  const [quizM1, setQuizM1] = useState<typeof QUIZ_M1_NR35_INTRO>([]);
  const [quizM2, setQuizM2] = useState<typeof QUIZ_M2_NR35_AR_PT>([]);
  const [quizM3, setQuizM3] = useState<typeof QUIZ_M3_NR35_CAPACITACAO>([]);
  const [quizM4, setQuizM4] = useState<typeof QUIZ_M4_NR35_SPQ>([]);
  const [quizM5, setQuizM5] = useState<typeof QUIZ_M5_NR35_ANCORAGEM>([]);
  const [quizM6, setQuizM6] = useState<typeof QUIZ_M6_NR35_EPIS>([]);
  const [quizM7, setQuizM7] = useState<typeof QUIZ_M7_NR35_CORDAS>([]);
  const [quizM8, setQuizM8] = useState<typeof QUIZ_M8_NR35_SISTEMAS>([]);
  const [quizM9, setQuizM9] = useState<typeof QUIZ_M9_NR35_ESCADAS>([]);
  const [quizM10, setQuizM10] = useState<typeof QUIZ_M10_NR35_RESGATE>([]);

  const [hasSyncedInitial, setHasSyncedInitial] = useState(false);

  useEffect(() => {
    if (!hasSyncedInitial && !loading) {
      setQuizM1(getRandomQuestions(QUIZ_M1_NR35_INTRO, 8));
      setQuizM2(getRandomQuestions(QUIZ_M2_NR35_AR_PT, 8));
      setQuizM3(getRandomQuestions(QUIZ_M3_NR35_CAPACITACAO, 8));
      setQuizM4(getRandomQuestions(QUIZ_M4_NR35_SPQ, 8));
      setQuizM5(getRandomQuestions(QUIZ_M5_NR35_ANCORAGEM, 8));
      setQuizM6(getRandomQuestions(QUIZ_M6_NR35_EPIS, 8));
      setQuizM7(getRandomQuestions(QUIZ_M7_NR35_CORDAS, 8));
      setQuizM8(getRandomQuestions(QUIZ_M8_NR35_SISTEMAS, 8));
      setQuizM9(getRandomQuestions(QUIZ_M9_NR35_ESCADAS, 8));
      setQuizM10(getRandomQuestions(QUIZ_M10_NR35_RESGATE, 8));
      setHasSyncedInitial(true);
    }
  }, [loading, hasSyncedInitial]);

  const handleModuleComplete = (moduleId: string) => {
    setCompletedModules((prev) => new Set([...prev, moduleId]));
  };

  const mv = Object.fromEntries(
    Array.from({ length: 11 }, (_, i) => [i + 1, getModuleVariant(i + 1)])
  ) as Record<number, ReturnType<typeof getModuleVariant>>;

  return (
    <AulaTemplate
      titulo={titulo || "NR-35: Trabalho em Altura (Compilado Atualizado 2023)"}
      descricao={descricao || "Guia definitivo para concursos da área técnica e de segurança da Petrobras, incluindo o novo Anexo III sobra escadas."}
      duracao={duracao || "120 min"}
      materiaNome={materiaNome || "Segurança do Trabalho"}
      materiaCor={materiaCor || "from-sky-500 to-blue-600"}
      materiaId={materiaId || "nrs"}
      modules={MODULE_DEFS}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      completedModules={completedModules}
      onComplete={onComplete}
      isCompleted={isCompleted}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
    >
      {/* ========================================================================= */}
      {/* MÓDULO 1: Introdução */}
      {/* ========================================================================= */}
      <TabsContent value="modulo-1">
        <div className="space-y-12 animate-in fade-in duration-500 text-slate-700">
          <ModuleBanner
            numero={1}
            titulo="O que é Trabalho em Altura?"
            variant={mv[1]}
            descricao="Definições fundamentais e responsabilidades segundo a NR-35."
          />

          <RichIntro>
            <div className="space-y-6 leading-relaxed">
              <p className="text-xl font-bold text-slate-900 border-l-4 border-sky-500 pl-4 mb-4">
                Em qualquer questão de prova sobre a NR-35, a primeira coisa que você deve buscar é o número "2,00".
              </p>
              <p>
                Considera-se trabalho em altura toda atividade executada <strong>acima de 2,00 m (dois metros)</strong> do nível inferior, onde haja risco de queda. 
                Isso parece simples, mas a Petrobras/Cesgranrio costuma colocar o trabalhador em cima de uma escada de 1,50m e perguntar se a NR-35 é obrigatória. A resposta é: Pela norma, não, mas as práticas de gestão podem exigir proteção antes dessa altura.
              </p>
              <div className="bg-sky-50 p-4 rounded-xl border border-sky-100 my-6">
                <h4 className="font-bold text-sky-900 mb-2 flex items-center gap-2">
                  <LuArrowUpCircle className="w-5 h-5" /> Regra dos 2 Metros
                </h4>
                <p className="text-sm italic">
                  "Considera-se trabalho em altura toda atividade executada acima de 2,00 m (dois metros) do nível inferior, onde haja risco de queda." (Item 35.1.2)
                </p>
              </div>
            </div>
          </RichIntro>

          <ContentAccordion
            mode="stacked"
            slides={[
              {
                titulo: "Responsabilidades do Empregador",
                icone: <LuShield className="w-5 h-5 text-sky-500" />,
                conteudo: (
                  <ul className="list-disc list-inside text-sm">
                    <li>Garantir a implementação das medidas de proteção;</li>
                    <li>Assegurar a realização da AR (Análise de Risco);</li>
                    <li>Desenvolver procedimentos operacionais para as atividades de rotina;</li>
                    <li>Garantir a autorização e capacitação dos trabalhadores.</li>
                  </ul>
                ),
              },
              {
                titulo: "Responsabilidades do Trabalhador",
                icone: <LuShield className="w-5 h-5 text-sky-500" />,
                conteudo: <p>Zelar pela sua segurança e saúde e a de outras pessoas que possam ser afetadas; Comunicar riscos ao superior; Cumprir os procedimentos operacionais.</p>,
              }
            ]}
          />

          <ModuleConsolidation
            index={1}
            variant={mv[1]}
            video={{ videoId: "dQw4w9WgXcQ", title: "Fundamentos NR-35", duration: "08:15" }}
            maceteVisual={{ title: "Limite de Ouro", content: "Altura > 2,00m = NR-35!" }}
            audio={{ audioUrl: "/audio/nr35-m1.mp3", titulo: "Audioaula Intro NR-35", artista: "Segurança Petrobras" }}
          />

          <QuizInterativo titulo="Simulado de Conhecimento" questoes={quizM1} variant={mv[1]} onComplete={() => handleModuleComplete("modulo-1")} />
        </div>
      </TabsContent>

      {/* ========================================================================= */}
      {/* MÓDULO 9: Escadas (Anexo III) - Foco em 2023 */}
      {/* ========================================================================= */}
      <TabsContent value="modulo-9">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={9}
            titulo="Escadas e o Novo Anexo III"
            variant={mv[9]}
            descricao="O que mudou com a atualização de 2023 sobre o uso de escadas fixas e portáteis."
          />

          <RichIntro>
            <div className="space-y-6 leading-relaxed">
              <p className="text-xl font-bold text-slate-900 border-l-4 border-emerald-500 pl-4 mb-4">
                Escadas não são mais "apenas acessórios" — agora têm um anexo dedicado e rigoroso.
              </p>
              <p>
                O <strong>Anexo III</strong>, publicado em 2023, trouxe regramentos específicos para escadas portáteis e fixas. A premissa básica é que as escadas portáteis 
                são equipamentos de <strong>acesso</strong> e só podem ser usadas como <strong>postos de trabalho</strong> para atividades de curta duração e baixo risco.
              </p>
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 my-6">
                <h4 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
                  <LuCheck className="w-5 h-5" /> Regra do Triângulo (Três Pontos)
                </h4>
                <p className="text-sm">
                  Ao subir ou descer, mantenha sempre contato de 3 pontos (dois pés e uma mão, ou duas mãos e um pé). Nunca use o último degrau em escadas de abrir.
                </p>
              </div>
            </div>
          </RichIntro>

          <ContentAccordion
            mode="stacked"
            slides={[
              {
                titulo: "Escadas Portáteis",
                icone: <LuConstruction className="w-5 h-5 text-emerald-500" />,
                conteudo: (
                  <ul className="list-disc list-inside text-sm">
                    <li>Devem possuir identificação do fabricante;</li>
                    <li>Devem ter sapatas antiderrapantes íntegras;</li>
                    <li>Só devem ser pintadas com verniz ou selador (transparente) para não esconder rachaduras.</li>
                  </ul>
                ),
              },
              {
                titulo: "Escadas de Marinheiro (Fixas)",
                icone: <LuLadderIcon className="w-5 h-5 text-emerald-500" />,
                conteudo: <p>Exigem sistema de proteção de queda se a altura for superior a 2,00m. A partir de 2023, as gaiolas metálicas não são mais consideradas proteção contra queda, sendo obrigatório o uso de trava-quedas de cabo/trilho.</p>,
              }
            ]}
          />

          <ModuleConsolidation
            index={9}
            variant={mv[9]}
            video={{ videoId: "dQw4w9WgXcQ", title: "Anexo III - Escadas", duration: "15:20" }}
            maceteVisual={{ title: "Regra do Topo", content: "Em escadas de abrir, NUNCA use o último degrau como plataforma!" }}
            audio={{ audioUrl: "/audio/nr35-m9.mp3", titulo: "Podcast Novas NRs", artista: "Segurança Petrobras" }}
          />

          <QuizInterativo titulo="Simulado Mestre Escadas" questoes={quizM9} variant={mv[9]} onComplete={() => handleModuleComplete("modulo-9")} />
        </div>
      </TabsContent>

      {/* Módulos restantes omitidos para brevidade e implementados conforme necessário */}
      <TabsContent value="modulo-2"><ModuleBanner numero={2} titulo="Em Breve" variant={mv[2]} descricao="Conteúdo sendo carregado..." /></TabsContent>
      <TabsContent value="modulo-3"><ModuleBanner numero={3} titulo="Em Breve" variant={mv[3]} descricao="Conteúdo sendo carregado..." /></TabsContent>
      <TabsContent value="modulo-4"><ModuleBanner numero={4} titulo="Em Breve" variant={mv[4]} descricao="Conteúdo sendo carregado..." /></TabsContent>
      <TabsContent value="modulo-5"><ModuleBanner numero={5} titulo="Em Breve" variant={mv[5]} descricao="Conteúdo sendo carregado..." /></TabsContent>
      <TabsContent value="modulo-6"><ModuleBanner numero={6} titulo="Em Breve" variant={mv[6]} descricao="Conteúdo sendo carregado..." /></TabsContent>
      <TabsContent value="modulo-7"><ModuleBanner numero={7} titulo="Em Breve" variant={mv[7]} descricao="Conteúdo sendo carregado..." /></TabsContent>
      <TabsContent value="modulo-8"><ModuleBanner numero={8} titulo="Em Breve" variant={mv[8]} descricao="Conteúdo sendo carregado..." /></TabsContent>
      <TabsContent value="modulo-10"><ModuleBanner numero={10} titulo="Em Breve" variant={mv[10]} descricao="Conteúdo sendo carregado..." /></TabsContent>

    </AulaTemplate>
  );
}

// Icone customizado temporário
function LuLadderIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 3v18" />
            <path d="M5 3v18" />
            <path d="M19 7H5" />
            <path d="M19 11H5" />
            <path d="M19 15H5" />
            <path d="M19 19H5" />
        </svg>
    )
}
