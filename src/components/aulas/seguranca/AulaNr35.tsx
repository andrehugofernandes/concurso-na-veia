"use client";

import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { getModuleVariant } from "@/lib/moduleColors";

import {
  ModuleConsolidation,
  AlertBox,
  QuizInterativo,
  ModuleBanner,
  getRandomQuestions,
  AulaProps,
  ContentAccordion,
  AulaTemplate,
  ModuleSectionHeader,
  ComparisonSide,
  RichIntro,
  TimelineItem
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
  LuListChecks
} from "react-icons/lu";

import {
  QUIZ_M1_NR35_INTRO,
  QUIZ_M2_NR35_TREINAMENTO,
  QUIZ_M3_NR35_PLANEJAMENTO,
  QUIZ_M4_NR35_EQUIPAMENTOS,
  QUIZ_M5_NR35_ESCADAS_ANEXO3
} from "./data/nr35-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Objetivo, Definições e Campo de Aplicação" },
  { id: "modulo-2", label: "Módulo 2", title: "Capacitação, Treinamento e Saúde" },
  { id: "modulo-3", label: "Módulo 3", title: "Planejamento, Organização e PT" },
  { id: "modulo-4", label: "Módulo 4", title: "Equipamentos de Proteção (SPQ)" },
  { id: "modulo-5", label: "Módulo 5", title: "Anexo III: Escadas (Novidade 2023)" },
] as const;

export default function AulaNr35({
  onComplete,
  loading,
  titulo,
  descricao,
  duracao,
}: AulaProps) {
  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

  const [quizM1, setQuizM1] = useState<typeof QUIZ_M1_NR35_INTRO>([]);
  const [quizM2, setQuizM2] = useState<typeof QUIZ_M2_NR35_TREINAMENTO>([]);
  const [quizM3, setQuizM3] = useState<typeof QUIZ_M3_NR35_PLANEJAMENTO>([]);
  const [quizM4, setQuizM4] = useState<typeof QUIZ_M4_NR35_EQUIPAMENTOS>([]);
  const [quizM5, setQuizM5] = useState<typeof QUIZ_M5_NR35_ESCADAS_ANEXO3>([]);

  const [hasSyncedInitial, setHasSyncedInitial] = useState(false);

  useEffect(() => {
    if (!hasSyncedInitial && !loading) {
      setQuizM1(getRandomQuestions(QUIZ_M1_NR35_INTRO, 8));
      setQuizM2(getRandomQuestions(QUIZ_M2_NR35_TREINAMENTO, 8));
      setQuizM3(getRandomQuestions(QUIZ_M3_NR35_PLANEJAMENTO, 8));
      setQuizM4(getRandomQuestions(QUIZ_M4_NR35_EQUIPAMENTOS, 8));
      setQuizM5(getRandomQuestions(QUIZ_M5_NR35_ESCADAS_ANEXO3, 8));
      setHasSyncedInitial(true);
    }
  }, [loading, hasSyncedInitial]);

  const handleModuleComplete = (moduleId: string) => {
    setCompletedModules((prev) => new Set([...prev, moduleId]));
  };

  const mv = Object.fromEntries(
    Array.from({ length: 10 }, (_, i) => [i + 1, getModuleVariant(i + 1)])
  ) as Record<number, ReturnType<typeof getModuleVariant>>;

  return (
    <AulaTemplate
      titulo={titulo || "NR-35: Segurança no Trabalho em Altura"}
      descricao={descricao || "Domine a atualização de 2023 da NR-35. Essencial para técnicos de manutenção, instrumentação e engenharia da Petrobras."}
      duracao={duracao || "120 min"}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      modules={MODULE_DEFS}
      completedModules={Array.from(completedModules)}
    >
      {/* ========================================================================= */}
      {/* MÓDULO 1: Objetivo e Definições */}
      {/* ========================================================================= */}
      <TabsContent value="modulo-1">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={1}
            titulo="Objetivo, Definições e Campo de Aplicação"
            variant={mv[1]}
            descricao="O conceito dos '2 metros' e a nova terminologia de 2023."
          />

          <RichIntro>
            <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
              <p className="text-lg font-semibold text-slate-900 dark:text-white border-l-4 border-amber-500 pl-4">
                Trabalho em altura é a causa número 1 de acidentes fatais na indústria. A NR-35 define as regras para evitar tragédias.
              </p>
              <p>
                A primeira coisa que você deve memorizar para a Petrobras: <strong>2 metros</strong>. Qualquer atividade acima desse nível, onde haja risco de queda, invoca a NR-35. 
              </p>

              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800 my-6">
                <h4 className="font-bold text-amber-900 dark:text-amber-100 mb-2 flex items-center gap-2">
                  <LuTriangleAlert className="w-5 h-5" /> Atualização 2023: Organização
                </h4>
                <p className="text-sm">
                  O texto de 2023 substituiu 'Empregador' por <strong>Organização</strong> e 'Trabalhador' por <strong>Empregado</strong> em vários pontos para se alinhar ao PGR (NR-01).
                </p>
              </div>

              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8">Hierarquia de Proteção</h3>
              <p>
                A norma dita uma ordem obrigatória de raciocínio antes de subir:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <li className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border-l-4 border-green-500">
                  <span className="text-green-500 font-bold">1º</span>
                  <div>
                    <p className="font-bold">Evitar o Trabalho</p>
                    <p className="text-xs text-slate-500">Pode ser feito no solo?</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border-l-4 border-amber-500">
                  <span className="text-amber-500 font-bold">2º</span>
                  <div>
                    <p className="font-bold">Eliminar o Risco</p>
                    <p className="text-xs text-slate-500">Uso de EPCs para impedir a queda.</p>
                  </div>
                </li>
              </ul>
              <p>
                Apenas quando não se pode evitar nem eliminar o risco, passamos a <strong>minimizar as consequências</strong> (Uso de EPIs).
              </p>
            </div>
          </RichIntro>

          <ContentAccordion
            mode="stacked"
            slides={[
              {
                titulo: "Conceito: O que são os 2 metros?",
                icone: <LuLightbulb className="w-5 h-5 text-amber-500" />,
                conteudo: (
                  <p>A medida é contada do nível inferior (chão ou base estável) até o ponto de suporte dos pés do trabalhador. Se os pés estão a 2,01m, a NR-35 é mandatória.</p>
                )
              },
              {
                titulo: "Exemplificação: Refinaria Petrobras",
                icone: <LuPlay className="w-5 h-5 text-amber-500" />,
                conteudo: (
                  <p>Um técnico subindo em uma escada marinheiro de 3 metros para verificar uma válvula no topo de um vaso de pressão está em Trabalho em Altura. Ele precisa de cinto, treinamento e permissão.</p>
                )
              },
              {
                titulo: "Dica: Abrangência vs Setor",
                icone: <LuTriangleAlert className="w-5 h-5 text-amber-500" />,
                conteudo: (
                  <p>A NR-35 é uma norma <strong>Geral</strong>. Ela se aplica à indústria, comércio e serviços. Não confunda com a NR-18 (Construção), que é <strong>Setorial</strong>, mas bebe da fonte da NR-35.</p>
                )
              },
              {
                titulo: "Responsabilidades da Organização",
                icone: <LuListChecks className="w-5 h-5 text-amber-500" />,
                conteudo: (
                  <ul className="list-disc list-inside space-y-1">
                    <li>Garantir a implementação das medidas.</li>
                    <li>Assegurar a realização da Análise de Risco (AR).</li>
                    <li>Desenvolver procedimentos operacionais.</li>
                  </ul>
                )
              }
            ]}
          />

          <ModuleConsolidation
            index={1}
            variant={mv[1]}
            video={{ videoId: "dQw4w9WgXcQ", title: "Conceitos Básicos NR-35", duration: "07:30" }}
            resumoVisual={{ 
              moduloNome: "Módulo 1", 
              tituloAula: "Trabalho em Altura", 
              materia: "Segurança", 
              images: [{ title: "Regra dos 2m", type: "infographic", placeholderColor: "amber" }] 
            }}
            maceteVisual={{ title: "2 Metros", content: <div className="text-4xl font-bold text-center p-4">H > 2,00m = NR-35</div> }}
            audio={{ audioUrl: "", titulo: "Podcast M1", artista: "Segurança Petrobras" }}
          />

          <QuizInterativo titulo="Simulado M1" questoes={quizM1} variant={mv[1]} onComplete={() => handleModuleComplete("modulo-1")} />
        </div>
      </TabsContent>

      {/* ========================================================================= */}
      {/* MÓDULO 2: Capacitação e Saúde */}
      {/* ========================================================================= */}
      <TabsContent value="modulo-2">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={2}
            titulo="Capacitação, Treinamento e Saúde"
            variant={mv[2]}
            descricao="Ninguém sobe sem estar treinado e com a saúde (mental e física) em dia."
          />

          <RichIntro>
            <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
              <p className="text-lg font-semibold text-slate-900 border-l-4 border-blue-500 pl-4">
                O treinamento de NR-35 não é opcional; é a licença para operar em altura.
              </p>
              <p>
                Para ser considerado capacitado, o trabalhador deve passar por um treinamento <strong>teórico e prático</strong> com carga horária mínima de <strong>8 horas</strong>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100">
                  <h4 className="font-bold flex items-center gap-2 mb-2"><LuCheck className="w-5 h-5" /> Periódico (Bienal)</h4>
                  <p className="text-sm">Realizado a cada 2 anos. Carga horária mínima de 8h.</p>
                </div>
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100">
                  <h4 className="font-bold flex items-center gap-2 mb-2"><LuTriangleAlert className="w-5 h-5" /> Eventual (Reciclagem)</h4>
                  <p className="text-sm">Mudança de procedimento, retorno de afastamento (>90 dias) ou mudança de empresa.</p>
                </div>
              </div>

              <h3 className="text-xl font-bold mt-8">Saúde Ocupacional: Além do Físico</h3>
              <p>
                A Petrobras exige rigor no PCMSO. O médico do trabalho deve avaliar se o trabalhador possui patologias que possam causar mal súbito (epilepsia, labirintite, problemas cardíacos). 
                <strong>Novidade 2023:</strong> Ênfase na avaliação <strong>psicossocial</strong>. O medo extremo de altura ou condições de estresse podem inviabilizar a autorização.
              </p>
            </div>
          </RichIntro>

          <ContentAccordion
            mode="stacked"
            slides={[
              {
                titulo: "Capacitação Inicial: O que deve conter?",
                icone: <LuFileText className="w-5 h-5 text-blue-500" />,
                conteudo: (
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Normas e regulamentos aplicáveis.</li>
                    <li>Análise de Risco e condições impeditivas.</li>
                    <li>Riscos potenciais e medidas de prevenção.</li>
                    <li>Sistemas, equipamentos e procedimentos de proteção.</li>
                    <li>Acidentes típicos e condutas em emergência.</li>
                  </ul>
                )
              },
              {
                titulo: "Dica: O Instrutor",
                icone: <LuLightbulb className="w-5 h-5 text-blue-500" />,
                conteudo: <p>O instrutor deve ter <strong>comprovada proficiência</strong> no assunto. Não precisa ser necessariamente Engenheiro, mas deve dominar a técnica e a norma.</p>
              },
              {
                titulo: "O que é um Trabalhador Autorizado?",
                icone: <LuCheck className="w-5 h-5 text-blue-500" />,
                conteudo: <p>É aquele que possui <strong>capacitação técnica</strong> (treinamento) E <strong>aptidão clínica</strong> (saúde em dia) registradas no ASO (Atestado de Saúde Ocupacional).</p>
              },
              {
                titulo: "Exceção: Afastamento",
                icone: <LuTriangleAlert className="w-5 h-5 text-blue-500" />,
                conteudo: <p>Se o profissional ficar mais de 90 dias afastado (por qualquer motivo), ele PRECISA de treinamento eventual antes de retornar às alturas.</p>
              }
            ]}
          />

          <ModuleConsolidation
            index={2}
            variant={mv[2]}
            video={{ videoId: "dQw4w9WgXcQ", title: "Treinamento e Saúde", duration: "10:15" }}
            resumoVisual={{ 
              moduloNome: "Módulo 2", 
              tituloAula: "Capacitação", 
              materia: "Segurança", 
              images: [{ title: "Bienal = 2 Anos", type: "infographic", placeholderColor: "blue" }] 
            }}
            maceteVisual={{ title: "8 Horas", content: <div className="text-2xl font-bold text-center p-4">Treinamento Inicial = 8h <br/> Periódico = 8h (Bienal)</div> }}
            audio={{ audioUrl: "", titulo: "Podcast M2", artista: "Segurança Petrobras" }}
          />

          <QuizInterativo titulo="Simulado M2" questoes={quizM2} variant={mv[2]} onComplete={() => handleModuleComplete("modulo-2")} />
        </div>
      </TabsContent>

      {/* ========================================================================= */}
      {/* MÓDULO 3: Planejamento (AR e PT) */}
      {/* ========================================================================= */}
      <TabsContent value="modulo-3">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={3}
            titulo="Planejamento, Organização e PT"
            variant={mv[3]}
            descricao="A burocracia que salva vidas: Análise de Risco e Permissão de Trabalho."
          />

          <RichIntro>
            <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
              <p className="text-lg font-semibold border-l-4 border-emerald-500 pl-4">
                Todo trabalho em altura deve ser PRECEDIDO de análise.
              </p>
              <p>
                Diferenciamos dois tipos de atividades: 
                <span className="font-bold text-emerald-600"> Rotineiras</span> (procedimento operacional padrão) e 
                <span className="font-bold text-emerald-600"> Não Rotineiras</span> (exigem PT - Permissão de Trabalho).
              </p>

              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 my-6">
                <h4 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
                  <LuFileText className="w-5 h-5" /> Permissão de Trabalho (PT)
                </h4>
                <ul className="text-sm space-y-1">
                  <li>Validade limitada à duração da atividade (restrita ao turno).</li>
                  <li>Deve ser assinada pelos envolvidos e pelo responsável.</li>
                  <li>Arquivada por no mínimo <strong>5 anos</strong>.</li>
                </ul>
              </div>

              <h3 className="text-xl font-bold mt-8">Condições Impeditivas</h3>
              <p>
                O planejamento deve prever quando NÃO subir. Ventos fortes, chuvas torrenciais, iluminação inadequada ou falta de equipe de resgate são motivos para abortar a missão imediatamente.
              </p>
            </div>
          </RichIntro>

          <ContentAccordion
            mode="stacked"
            slides={[
              {
                titulo: "O que considerar na Análise de Risco (AR)?",
                icone: <LuListChecks className="w-5 h-5 text-emerald-500" />,
                conteudo: (
                  <ul className="text-sm space-y-1">
                    <li>Risco de queda de materiais e ferramentas;</li>
                    <li>Raridade do ponto de ancoragem;</li>
                    <li>Riscos adicionais (elétrico, químico, calor);</li>
                    <li>Sinalização e isolamento da área inferior.</li>
                  </ul>
                )
              },
              {
                titulo: "Dica Petrobras: PT e Turno",
                icone: <LuLightbulb className="w-5 h-5 text-emerald-500" />,
                conteudo: <p>Se a equipe mudar (troca de turno), a PT deve ser revalidada ou uma nova deve ser emitida. Nunca use a assinatura do turno anterior.</p>
              },
              {
                titulo: "O Fenômeno da Suspensão Inerte",
                icone: <LuTriangleAlert className="w-5 h-5 text-emerald-500" />,
                conteudo: <p>É o risco de morte pós-queda. Se o trabalhador ficar pendurado imóvel, o sangue acumula nas pernas, podendo causar óbito em minutes. O plano de resgate deve ser RÁPIDO.</p>
              },
              {
                titulo: "Sinalização de Segurança",
                icone: <LuShield className="w-5 h-5 text-emerald-500" />,
                conteudo: <p>A área abaixo do trabalho deve ser isolada e sinalizada para evitar que ferramentas que caiam atinjam pessoas no solo.</p>
              }
            ]}
          />

          <ModuleConsolidation
            index={3}
            variant={mv[3]}
            video={{ videoId: "dQw4w9WgXcQ", title: "AR e PT na Prática", duration: "12:00" }}
            resumoVisual={{ 
              moduloNome: "Módulo 3", 
              tituloAula: "Planejamento", 
              images: [{ title: "5 Anos de Arquivo", type: "infographic", placeholderColor: "emerald" }] 
            }}
            maceteVisual={{ title: "PT", content: <div className="text-2xl font-bold text-center p-4">PT = Turno de Trabalho <br/> Arquivo = 5 Anos</div> }}
            audio={{ audioUrl: "", titulo: "Podcast M3", artista: "Segurança Petrobras" }}
          />

          <QuizInterativo titulo="Simulado M3" questoes={quizM3} variant={mv[3]} onComplete={() => handleModuleComplete("modulo-3")} />
        </div>
      </TabsContent>

      {/* ========================================================================= */}
      {/* MÓDULO 4: Equipamentos de Proteção */}
      {/* ========================================================================= */}
      <TabsContent value="modulo-4">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={4}
            titulo="Equipamentos de Proteção (SPQ)"
            variant={mv[4]}
            descricao="Cintos, talabartes e a física da queda. Proteja o que há de mais valioso."
          />

          <RichIntro>
            <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
              <p className="text-lg font-semibold border-l-4 border-orange-500 pl-4">
                Em segurança, o cinto abdominal é PROIBIDO para retenção de quedas.
              </p>
              <p>
                O padrão ouro é o <strong>Cinto de Segurança tipo Paraquedista</strong>. Ele distribui a força do impacto pelos ombros, peito e coxas, preservando a coluna e os órgãos internos.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100">
                  <h4 className="font-bold flex items-center gap-2 mb-2"><LuShield className="w-5 h-5" /> Absorvedor de Energia</h4>
                  <p className="text-sm">Obrigatório se o talabarte > 0,9m. Reduz o tranco no corpo do trabalhador.</p>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100">
                  <h4 className="font-bold flex items-center gap-2 mb-2"><LuZap className="w-5 h-5" /> Fator de Queda</h4>
                  <p className="text-sm">Fator 2 (ancoragem nos pés) é o mais perigoso. Tente ancorar sempre acima da cabeça (Fator 0).</p>
                </div>
              </div>

              <h3 className="text-xl font-bold mt-8">Inspeção Obrigatória</h3>
              <p>
                A inspeção deve ser feita <strong>antes de cada uso</strong> pelo próprio trabalhador. Se o cinto sofreu uma queda real, ele deve ser DESCARTADO imediatamente, mesmo que pareça intacto.
              </p>
            </div>
          </RichIntro>

          <ContentAccordion
            mode="stacked"
            slides={[
              {
                titulo: "O que é ZLQ (Zona de Livre Queda)?",
                icone: <LuLightbulb className="w-5 h-5 text-orange-500" />,
                conteudo: <p>É a distância mínima que você precisa ter 'limpa' abaixo de você para que, se cair, o talabarte estique totalmente e o absorvedor abra SEM você bater no chão.</p>
              },
              {
                titulo: "Talabarte em 'Y'",
                icone: <LuPlay className="w-5 h-5 text-orange-500" />,
                conteudo: <p>Permite que o trabalhador se desloque mantendo-se sempre conectado a pelo menos um ponto de ancoragem. Nunca fique 100% solto durante a progressão.</p>
              },
              {
                titulo: "Trava-quedas",
                icone: <LuZap className="w-5 h-5 text-orange-500" />,
                conteudo: <p>Dispositivo que corre em uma linha de vida e trava instantaneamente em caso de aceleração brusca. Essencial em escadas marinheiro longas.</p>
              },
              {
                titulo: "Cuidados com o Equipamento",
                icone: <LuListChecks className="w-5 h-5 text-orange-500" />,
                conteudo: <p>Evite contato com produtos químicos, calor excessivo ou arestas cortantes que possam fragilizar as fitas do cinto.</p>
              }
            ]}
          />

          <ModuleConsolidation
            index={4}
            variant={mv[4]}
            video={{ videoId: "dQw4w9WgXcQ", title: "EPIs de Trabalho em Altura", duration: "15:20" }}
            resumoVisual={{ 
              moduloNome: "Módulo 4", 
              images: [{ title: "Fator de Queda", type: "diagram", placeholderColor: "orange" }] 
            }}
            maceteVisual={{ title: "Fator de Queda", content: <div className="text-center p-4 font-bold">Ancoragem Alta = Risco Baixo <br/> Ancoragem Baixa = Risco Alto (Fator 2)</div> }}
            audio={{ audioUrl: "", titulo: "Podcast M4", artista: "Segurança Petrobras" }}
          />

          <QuizInterativo titulo="Simulado M4" questoes={quizM4} variant={mv[4]} onComplete={() => handleModuleComplete("modulo-4")} />
        </div>
      </TabsContent>

      {/* ========================================================================= */}
      {/* MÓDULO 5: Escadas (Anexo III) */}
      {/* ========================================================================= */}
      <TabsContent value="modulo-5">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={5}
            titulo="Anexo III: Escadas (Novidade 2023)"
            variant={mv[5]}
            descricao="A nova regulamentação detalhada para o equipamento mais comum e subestimado."
          />

          <RichIntro>
            <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
              <p className="text-lg font-semibold border-l-4 border-rose-500 pl-4">
                Escadas portáteis agora têm um anexo exclusivo (Anexo III).
              </p>
              <p>
                A NR-35 agora deixa claro: escadas portáteis são prioritariamente meios de <strong>acesso</strong>. Como postos de trabalho, só devem ser usadas para tarefas de <strong>curta duração</strong>.
              </p>

              <div className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-xl border border-rose-100 my-6">
                <h4 className="font-bold text-rose-900 mb-2 flex items-center gap-2">
                  <LuTriangleAlert className="w-5 h-5" /> Regra de Ouro: Proporção 1:4
                </h4>
                <p className="text-sm">Para cada 4 metros de altura, a base da escada deve estar afastada 1 metro da parede. Isso garante o ângulo de 75º.</p>
              </div>

              <h3 className="text-xl font-bold mt-8">Escadas de Madeira</h3>
              <p>
                <strong>Proibição Crítica:</strong> É proibido pintar escadas de madeira com tintas opacas. Elas devem ser protegidas apenas com verniz transparente para que nós e rachaduras fiquem visíveis na inspeção.
              </p>
            </div>
          </RichIntro>

          <ContentAccordion
            mode="stacked"
            slides={[
              {
                titulo: "Requisitos das Escadas Marinheiro (Fixas)",
                icone: <LuListChecks className="w-5 h-5 text-rose-500" />,
                conteudo: <p>Devem ter largura entre 40cm e 60cm, degraus antiderrapantes e, se acima de 6 metros, gaiola de proteção ou trava-quedas.</p>
              },
              {
                titulo: "A Regra dos 3 Pontos de Apoio",
                icone: <LuCheck className="w-5 h-5 text-rose-500" />,
                conteudo: <p>Ao subir ou descer, você deve ter sempre 3 pontos em contato com a escada (duas mãos e um pé, ou dois pés e uma mão).</p>
              },
              {
                titulo: "Escada Tesoura (De abrir)",
                icone: <LuTriangleAlert className="w-5 h-5 text-rose-500" />,
                conteudo: <p>Nunca utilize os dois últimos degraus para trabalhar, a menos que a escada tenha plataforma e guarda-corpo próprio.</p>
              },
              {
                titulo: "Prolongamento Superior",
                icone: <LuZap className="w-5 h-5 text-rose-500" />,
                conteudo: <p>Se a escada for usada para acessar um patamar superior, ela deve ultrapassar esse patamar em pelo menos <strong>1,00 metro</strong>.</p>
              }
            ]}
          />

          <ModuleConsolidation
            index={5}
            variant={mv[5]}
            video={{ videoId: "dQw4w9WgXcQ", title: "O Novo Anexo III", duration: "11:40" }}
            resumoVisual={{ 
              moduloNome: "Módulo 5", 
              images: [{ title: "Ângulo de 75º", type: "diagram", placeholderColor: "rose" }] 
            }}
            maceteVisual={{ title: "1:4", content: <div className="text-2xl font-bold text-center p-4">Afastamento = Altura / 4 <br/> Sobra Superior = 1,00m</div> }}
            audio={{ audioUrl: "", titulo: "Podcast Escadas", artista: "Segurança Petrobras" }}
          />

          <QuizInterativo titulo="Simulado M5" questoes={quizM5} variant={mv[5]} onComplete={() => handleModuleComplete("modulo-5")} />
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
