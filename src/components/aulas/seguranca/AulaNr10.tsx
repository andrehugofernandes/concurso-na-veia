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
} from "react-icons/lu";

import {
  QUIZ_M1_NR10_INTRO,
  QUIZ_M2_NR10_MEDIDAS_CONTROLE,
  QUIZ_M3_NR10_PIE,
  QUIZ_M4_NR10_VESTIMENTAS,
  QUIZ_M5_NR10_MESTRE,
} from "./data/nr10-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Introdução, Objetivo e Campo de Aplicação" },
  { id: "modulo-2", label: "Módulo 2", title: "Medidas de Controle Prioritárias" },
  { id: "modulo-3", label: "Módulo 3", title: "O Prontuário de Instalações Elétricas (PIE)" },
  { id: "modulo-4", label: "Módulo 4", title: "Medidas de Proteção Individual e Vestimentas" },
  { id: "modulo-5", label: "Módulo 5", title: "Zonas de Risco e Simulado Mestre" },
] as const;

export default function AulaNr10({
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

  const [quizM1, setQuizM1] = useState<typeof QUIZ_M1_NR10_INTRO>([]);
  const [quizM2, setQuizM2] = useState<typeof QUIZ_M2_NR10_MEDIDAS_CONTROLE>([]);
  const [quizM3, setQuizM3] = useState<typeof QUIZ_M3_NR10_PIE>([]);
  const [quizM4, setQuizM4] = useState<typeof QUIZ_M4_NR10_VESTIMENTAS>([]);
  const [quizM5, setQuizM5] = useState<typeof QUIZ_M5_NR10_MESTRE>([]);

  const [hasSyncedInitial, setHasSyncedInitial] = useState(false);

  useEffect(() => {
    if (!hasSyncedInitial && !loading) {
      setQuizM1(getRandomQuestions(QUIZ_M1_NR10_INTRO, 8));
      setQuizM2(getRandomQuestions(QUIZ_M2_NR10_MEDIDAS_CONTROLE, 8));
      setQuizM3(getRandomQuestions(QUIZ_M3_NR10_PIE, 8));
      setQuizM4(getRandomQuestions(QUIZ_M4_NR10_VESTIMENTAS, 8));
      setQuizM5(getRandomQuestions(QUIZ_M5_NR10_MESTRE, 8));
      setHasSyncedInitial(true);
    }
  }, [loading, hasSyncedInitial]);

  const handleModuleComplete = (moduleId: string) => {
    setCompletedModules((prev) => new Set([...prev, moduleId]));
  };

  const mv = Object.fromEntries(
    Array.from({ length: 6 }, (_, i) => [i + 1, getModuleVariant(i + 1)])
  ) as Record<number, ReturnType<typeof getModuleVariant>>;

  return (
    <AulaTemplate
      titulo={titulo || "NR-10: Segurança em Instalações e Serviços em Eletricidade"}
      descricao={descricao || "Dominando a norma mais exigida nos editais técnicos e de engenharia da Petrobras, passo a passo e com foco total em jurisprudência CESGRANRIO."}
      duracao={duracao || "90 min"}
      materiaNome={materiaNome || "Segurança do Trabalho"}
      materiaCor={materiaCor || "from-emerald-500 to-green-600"}
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
      {/* MÓDULO 1: Introdução, Objetivo e Campo de Aplicação */}
      {/* ========================================================================= */}
      <TabsContent value="modulo-1">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={1}
            titulo="Introdução, Objetivo e Campo de Aplicação"
            variant={mv[1]}
            descricao="Neste módulo, mergulhamos no item 10.1 da norma: o que a NR-10 abrange, o que ela exclui e por que seu viés prevencionista é abrangente."
          />

          <RichIntro>
            <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
              <p className="text-xl font-bold text-slate-900 dark:text-white border-l-4 border-amber-500 pl-4 mb-4">
                A NR-10 é a espinha dorsal da segurança elétrica no Brasil e o terror dos candidatos desatentos.
              </p>
              <p>
                O objetivo fundamental da NR-10 é estabelecer diretrizes basilares e condições mínimas de segurança em todas as fases da vida de uma instalação elétrica. De acordo com o texto legal,
                seu principal objetivo é garantir a saúde e a segurança dos trabalhadores que, direta ou indiretamente, interagem em instalações elétricas e serviços correlatos. 
                A premissa mais cobrada pela <strong>Cesgranrio</strong> é que a NR-10 aplica-se a <strong>Geração, Transmissão, Distribuição e Consumo (G-T-D-C)</strong>.
              </p>
              <p>
                Em outras palavras, pense no conceito "do berço ao túmulo": desde o <strong>Projeto</strong>, Construção, Montagem, Operação até a <strong>Manutenção</strong> e quaisquer trabalhos nas proximidades.
              </p>
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800 my-6">
                <h4 className="font-bold text-amber-900 dark:text-amber-100 mb-2 flex items-center gap-2">
                  <LuTriangleAlert className="w-5 h-5" /> Fique Atento:
                </h4>
                <p className="text-lg">
                  A NR-10 não se limita a quem "mexe no fio". Ela abrange todos que trabalham nas proximidades, inclusive quem apenas opera o maquinário alimentado.
                </p>
              </div>
            </div>
          </RichIntro>

          <ContentAccordion
            mode="stacked"
            slides={[
              {
                titulo: "Campo de Aplicação Detalhado",
                icone: <LuBookOpen className="w-5 h-5" />,
                conteudo: (
                  <div className="space-y-2">
                    <p>A norma recai sobre todas as etapas:</p>
                    <ul className="list-disc list-inside ml-2">
                      <li>Projeto, Construção, Montagem;</li>
                      <li>Operação e Manutenção;</li>
                      <li>Trabalhos nas PROXIMIDADES.</li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Exemplificação Prática",
                icone: <LuPlay className="w-5 h-5" />,
                conteudo: <p>Numa refinaria, o desenhista do diagrama elétrico (Projeto) e o pedreiro que abre valas perto de cabos (Proximidades) estão ambos sob a égide da NR-10.</p>,
              },
              {
                titulo: "Pegadinhas de Concurso",
                icone: <LuLightbulb className="w-5 h-5" />,
                conteudo: <p>A banca vai dizer que a NR-10 só se aplica a instalações de "Alta Tensão". FALSO. Aplica-se a Baixa e Alta Tensão indistintamente desde que haja risco.</p>,
              }
            ]}
          />

          <ModuleConsolidation
            index={1}
            variant={mv[1]}
            video={{ videoId: "dQw4w9WgXcQ", title: "Introdução à NR-10", duration: "10:30" }}
            resumoVisual={{
              moduloNome: "Módulo 1",
              tituloAula: "Segurança Elétrica",
              materia: "Segurança",
              images: [{ title: "G-T-D-C", type: "infographic", placeholderColor: "amber" }]
            }}
            maceteVisual={{ title: "Berço ao Túmulo", content: "Projeto -> Construção -> Operação -> Manutenção -> Descarte" }}
            audio={{ audioUrl: "/audio/nr10-m1.mp3", titulo: "Podcast NR-10 Intro", artista: "Prof. Petro" }}
          />

          <QuizInterativo titulo="QUIZ: Módulo Nº 1" questoes={quizM1} variant={mv[1]} onComplete={() => handleModuleComplete("modulo-1")} />
        </div>
      </TabsContent>

      {/* ========================================================================= */}
      {/* MÓDULO 2: Medidas de Controle Prioritárias */}
      {/* ========================================================================= */}
      <TabsContent value="modulo-2">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={2}
            titulo="Medidas de Controle Prioritárias"
            variant={mv[2]}
            descricao="Entenda a hierarquia irrevogável: De EPCs à Desenergização absoluta."
          />

          <RichIntro>
            <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
              <p className="text-xl font-bold text-slate-900 dark:text-white border-l-4 border-blue-500 pl-4 mb-4">
                A hierarquia de proteção na NR-10 segue a regra: Coletivo &gt; Individual.
              </p>
              <p>
                O subitem 10.2.8 impõe que as <strong>Medidas de Proteção Coletiva (EPC)</strong> devem preceder quaisquer medidas individuais. 
                A medida prioritária absoluta de proteção coletiva é a <strong>Desenergização Elétrica</strong>. 
                Se desenergizar for tecnicamente inviável, a segunda opção prioritária é o emprego de <strong>Tensão de Segurança</strong>.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-xl">
                  <p className="font-bold text-blue-900 dark:text-blue-100 flex items-center gap-2 mb-2">
                    <LuShield className="w-5 h-5" /> EPC (Prioridade 1)
                  </p>
                  <p className="text-lg">Blindagem, seccionamento, barreiras e aterramento temporário.</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl">
                  <p className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-2">
                    <LuZap className="w-5 h-5" /> EPI (Prioridade 2)
                  </p>
                  <p className="text-lg">Luvas, vestimentas e calçados (última alternativa).</p>
                </div>
              </div>
            </div>
          </RichIntro>

          <ContentAccordion
            mode="stacked"
            slides={[
              {
                titulo: "As 6 Etapas da Desenergização",
                icone: <LuZap className="w-5 h-5 text-blue-500" />,
                conteudo: (
                  <div className="space-y-2">
                    <p>Para uma instalação ser considerada desenergizada (Livre de Tensão), os 6 passos devem ser seguidos (Item 10.5.1):</p>
                    <ol className="list-decimal list-inside ml-2 text-lg italic">
                      <li>Seccionamento;</li>
                      <li>Impedimento do religamento (Travamento);</li>
                      <li>Constatação da ausência de tensão;</li>
                      <li>Instalação do aterramento temporário;</li>
                      <li>Proteção dos elementos vizinhos vivos;</li>
                      <li>Sinalização de impedimento.</li>
                    </ol>
                  </div>
                ),
              },
              {
                titulo: "Tensão de Segurança",
                icone: <LuShield className="w-5 h-5 text-blue-500" />,
                conteudo: <p>Considera-se tensão de segurança aquela que não oferece risco à vida humana sob condições adversas. Comumente abaixo de 50V CA ou 120V CC.</p>,
              }
            ]}
          />

          <ModuleConsolidation
            index={1}
            variant={mv[2]}
            video={{ videoId: "dQw4w9WgXcQ", title: "Hierarquia de Proteção", duration: "12:15" }}
            resumoVisual={{
              moduloNome: "Módulo 2",
              tituloAula: "Controle",
              materia: "NR-10",
              images: [{ title: "EPC > EPI", type: "infographic", placeholderColor: "blue" }]
            }}
            maceteVisual={{ title: "S-I-C-A-P-S", content: "Secciona, Impede, Constata, Aterra, Protege e Sinaliza!" }}
            audio={{ audioUrl: "/audio/nr10-m2.mp3", titulo: "Audioaula Medidas", artista: "Prof. Petro" }}
          />

          <QuizInterativo titulo="Simulado de Conhecimento" questoes={quizM2} variant={mv[2]} onComplete={() => handleModuleComplete("modulo-2")} />
        </div>
      </TabsContent>

      {/* ========================================================================= */}
      {/* MÓDULO 3: O Prontuário (PIE) */}
      {/* ========================================================================= */}
      <TabsContent value="modulo-3">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={3}
            titulo="O Prontuário de Instalações Elétricas (PIE)"
            variant={mv[3]}
            descricao="O dossiê documental obrigatório para empresas com carga superior a 75kW."
          />

          <RichIntro>
            <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
              <p className="text-xl font-bold text-slate-900 dark:text-white border-l-4 border-emerald-500 pl-4 mb-4">
                O PIE é o cérebro documental da segurança elétrica na indústria.
              </p>
              <p>
                O estabelecimento deve manter um Prontuário organizado e atualizado (Item 10.2.4). 
                A regra de ouro que gera inúmeras questões de prova é o limite de potência: Empresas com carga instalada superior a <strong>75 kW</strong> são obrigadas a constituir o PIE. 
              </p>
              <p>
                Este prontuário não é apenas "um papel", mas sim um compilado de diagramas unifilares, relatórios de auditoria, laudos de sistema de terra e especificações de EPIs/EPCs.
              </p>

              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800 my-6">
                <h4 className="font-bold text-emerald-900 dark:text-emerald-100 mb-2 flex items-center gap-2">
                  <LuCheck className="w-5 h-5" /> Número Mágico: 75 kW
                </h4>
                <p className="text-lg">
                  Decore este número. Se a carga instalada for 75 kW ou menor, a obrigatoriedade do PIE é flexibilizada pela norma.
                </p>
              </div>
            </div>
          </RichIntro>

          <ContentAccordion
            mode="stacked"
            slides={[
              {
                titulo: "Conteúdo Obrigatório do PIE",
                icone: <LuFileText className="w-5 h-5 text-emerald-500" />,
                conteudo: (
                  <ul className="list-disc list-inside text-lg">
                    <li>Diagramas unifilares atualizados;</li>
                    <li>Procedimentos de segurança e trabalho;</li>
                    <li>Especificações técnicas de EPI/EPC;</li>
                    <li>Relatórios de inspeções periódicas.</li>
                  </ul>
                ),
              },
              {
                titulo: "Auditoria e Fiscalização",
                icone: <LuTriangleAlert className="w-5 h-5 text-emerald-500" />,
                conteudo: <p>Na Petrobras, o PIE é o primeiro documento solicitado em auditorias de SSMA (Saúde, Segurança e Meio Ambiente). Diagramas defasados geram multas pesadas.</p>,
              }
            ]}
          />

          <ModuleConsolidation
            index={1}
            variant={mv[3]}
            video={{ videoId: "dQw4w9WgXcQ", title: "Entendendo o PIE", duration: "09:40" }}
            resumoVisual={{
              moduloNome: "Módulo 3",
              tituloAula: "Documentação",
              materia: "NR-10",
              images: [{ title: "PIE Checklist", type: "table", placeholderColor: "emerald" }]
            }}
            maceteVisual={{ title: "75 é o Limite", content: "Carga > 75kW = PIE Obrigatório!" }}
            audio={{ audioUrl: "/audio/nr10-m3.mp3", titulo: "Podcast PIE", artista: "Prof. Petro" }}
          />

          <QuizInterativo titulo="QUIZ: Módulo Nº 3" questoes={quizM3} variant={mv[3]} onComplete={() => handleModuleComplete("modulo-3")} />
        </div>
      </TabsContent>

      {/* ========================================================================= */}
      {/* MÓDULO 4: EPI e Vestimentas */}
      {/* ========================================================================= */}
      <TabsContent value="modulo-4">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={4}
            titulo="Medidas de Proteção Individual e Vestimentas"
            variant={mv[4]}
            descricao="Abordaremos o famigerado 'uso exato de proteção no corpo' da normatização elétrica."
          />

          <RichIntro>
            <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
              <p className="text-lg text-slate-900 dark:text-white border-l-4 border-orange-500 pl-4 font-bold">
                Em eletricidade, a vestimenta não é moda; é o último anteparo entre o arco elétrico e a integridade física do trabalhador.
              </p>
              <p>
                O item 10.2.9 da NR-10 trata das medidas de proteção individual. O ponto que mais cai em concursos da <strong>Cesgranrio</strong> é a proibição de adornos. 
                Isso inclui alianças, relógios, correntes e até piercings. A justificativa técnica é que esses objetos podem conduzir corrente ou 
                magnetizar sob alta indução, perfurando o EPI ou causando queimaduras graves.
              </p>

              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border border-orange-100 dark:border-orange-800 my-6">
                <h4 className="font-bold text-orange-900 dark:text-orange-100 mb-2 flex items-center gap-2">
                  <LuShield className="w-5 h-5" /> Regra de Ouro: Proibição de Adornos
                </h4>
                <p className="text-lg italic text-orange-800 dark:text-orange-200">
                  "É vedado o uso de adornos pessoais nos trabalhos com instalações elétricas ou em suas proximidades." (Item 10.2.9.3)
                </p>
              </div>

              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8">As Vestimentas e o Risco de Arco</h3>
              <p>
                As roupas de trabalho devem ser de tecido <strong>Retardante a Chamas (FR)</strong> e possuir a classificação ATPV (Arc Thermal Performance Value) 
                compatível com o nível de energia incidente calculado para aquele painel. Tecidos sintéticos (como poliéster) são proibidos pois derretem na pele.
              </p>
            </div>
          </RichIntro>

          <ContentAccordion
            mode="stacked"
            slides={[
              {
                titulo: "EPIs Comuns",
                icone: <LuShield className="w-5 h-5 text-orange-500" />,
                conteudo: (
                  <ul className="list-disc list-inside text-lg">
                    <li>Luvas isolantes de borracha (com sobreluva de proteção);</li>
                    <li>Capacete de segurança Classe B;</li>
                    <li>Botas sem componentes metálicos expostos;</li>
                    <li>Viseira de proteção contra arco elétrico.</li>
                  </ul>
                ),
              },
              {
                titulo: "A Pegadinha da Aliança",
                icone: <LuTriangleAlert className="w-5 h-5 text-orange-500" />,
                conteudo: <p>Bancas afirmam que adornos por baixo do EPI são permitidos. FALSO. A proibição é absoluta para evitar pontos de calor e indução.</p>,
              }
            ]}
          />

          <ModuleConsolidation
            index={1}
            variant={mv[4]}
            video={{ videoId: "dQw4w9WgXcQ", title: "EPI e Vestimentas", duration: "11:00" }}
            resumoVisual={{
              moduloNome: "Módulo 4",
              tituloAula: "Segurança Pessoal",
              materia: "NR-10",
              images: [{ title: "Proibição de Adornos", type: "infographic", placeholderColor: "orange" }]
            }}
            maceteVisual={{ title: "Regra da Pele", content: "EPI é o úlitmo escudo. Se chegou no EPI, a proteção coletiva falhou." }}
            audio={{ audioUrl: "/audio/nr10-m4.mp3", titulo: "Podcast Vestimentas", artista: "Prof. Petro" }}
          />

          <QuizInterativo titulo="Simulado de Conhecimento" questoes={quizM4} variant={mv[4]} onComplete={() => handleModuleComplete("modulo-4")} />
        </div>
      </TabsContent>

      {/* ========================================================================= */}
      {/* MÓDULO 5: Zonas de Risco */}
      {/* ========================================================================= */}
      <TabsContent value="modulo-5">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={5}
            titulo="Zonas de Risco"
            variant={mv[5]}
            descricao="Entendendo os raios limítrofes, delimitações dimensionais e exigências de intervenção."
          />

          <RichIntro>
            <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
              <p className="text-lg text-slate-900 dark:text-white border-l-4 border-red-500 pl-4 font-bold">
                O ar é um isolante, mas até ele tem limites. Entender as distâncias de segurança separa o trabalho seguro da tragédia.
              </p>
              <p>
                A NR-10 define três zonas concêntricas ao redor de um ponto energizado desprotegido: 
                <span className="text-red-600 font-bold mx-1">Zona de Risco (ZR)</span>, 
                <span className="text-red-600 font-bold mx-1">Zona Controlada (ZC)</span> e 
                <span className="text-slate-900 dark:text-slate-100 font-bold mx-1">Zona Livre (ZL)</span>. 
                Os raios dessas zonas dependem da classe de tensão da instalação.
              </p>

              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-100 dark:border-red-800 my-6">
                <h4 className="font-bold text-red-900 dark:text-red-100 mb-2 flex items-center gap-2">
                  <LuTriangleAlert className="w-5 h-5" /> ZR vs ZC
                </h4>
                <p className="text-lg">
                  A <strong>Zona de Risco</strong> é restrita apenas a profissionais autorizados e com equipamentos específicos. 
                  A <strong>Zona Controlada</strong> é para autorizados sob vigilância e supervisão técnica.
                </p>
              </div>

              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8">Exemplo de Distâncias (Tabela Anexo II)</h3>
              <p>
                Para uma tensão de 13.8kV (comum em indústrias), o Raio R1 (ZR) é de 0,60m e o Raio R2 (ZC) é de 1,60m. 
                Qualquer distância acima de 1,60m coloca o trabalhador na <strong>Zona Livre</strong>.
              </p>
            </div>
          </RichIntro>

          <ComparisonSide
            tipo="correct"
            titulo="Acesso Permitido"
            items={[
              "Zona Livre: Todos (incluindo leigos)",
              "Zona Controlada: Autorizados treinados",
              "Zona de Risco: Autorizados com proteção de linha viva"
            ]}
          />

          <ModuleConsolidation
            index={1}
            variant={mv[5]}
            video={{ videoId: "dQw4w9WgXcQ", title: "Mapa de Zonas", duration: "14:50" }}
            resumoVisual={{
              moduloNome: "Módulo 5",
              tituloAula: "Zonas",
              materia: "NR-10",
              images: [{ title: "Raios de Segurança", type: "diagram", placeholderColor: "red" }]
            }}
            maceteVisual={{ title: "ZR = Arco", content: "Na ZR, o arco pula. Na ZC, ele te observa." }}
            audio={{ audioUrl: "/audio/nr10-m5.mp3", titulo: "Podcast Final", artista: "Prof. Petro" }}
          />

          <QuizInterativo titulo="QUIZ: Módulo Nº 5" questoes={quizM5} variant={mv[5]} onComplete={() => handleModuleComplete("modulo-5")} />
        </div>
      </TabsContent>

    </AulaTemplate>
  );
}
