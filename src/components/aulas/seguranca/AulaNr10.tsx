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
  CardCarousel,
  ContentAccordion,
  AulaTemplate,
  ModuleSectionHeader,
  FlipCard,
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

  // Variantes de cor pré-computadas — usa mv[N] ao invés de hardcodar getModuleVariant(N)
  const mv = Object.fromEntries(
    Array.from({ length: 10 }, (_, i) => [i + 1, getModuleVariant(i + 1)])
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

          {/* RICH INTRO SECTION - PADRÃO ULTIMATE */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Base da NR-10: Por que ela existe?"
              description="A abrangência totalitária de uma norma construída para preservar vidas"
              variant={mv[1]}
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                A Norma Regulamentadora número 10 (NR-10) estabelece diretrizes basilares e condições
                mínimas de segurança relacionadas a instalações elétricas e aos serviços com
                eletricidade. De acordo com o texto legal consolidado pelo antigo Ministério do Trabalho e Previdência,
                seu principal objetivo é garantir a saúde e a segurança dos trabalhadores que, direta ou
                indiretamente, interagem em instalações elétricas e serviços correlatos. No contexto das provas CESGRANRIO, principalmente para a Petrobras, a premissa mais cobrada não é decorar dados, mas sim entender que a NR foi concebida com viés TOTALMENTE preventivo, aplicando-se desde a prancheta de desenho do projeto até o descarte do equipamento elétrico sucateado.
              </p>

              <p>
                Em outras palavras, pense no conceito "do berço ao túmulo". Nenhuma fase da instalação elétrica escapa do rigor da NR-10.
                Isso significa que o desenhista CAD que está fazendo o diagrama unifilar também está submetido às regras da norma (ele precisa prever sistemas de seccionamento, priorizar tensão de segurança etc). Da mesma forma, o mecânico que tritura a bomba no fim de sua vida útil (operação de descarte) também deve ser protegido pelos preceitos desta NR, caso haja potencial elétrico residual na carcaça.
              </p>

              <p>
                A regra de ouro (itens 10.1.1 e 10.1.2) que você verá repetidamente nos quizzes de concurso é que a NR-10 **aplica-se às fases de geração, transmissão, distribuição e consumo**. Ela recai sem exceção sobre **todas as etapas**: Projeto, Construção, Montagem, Operação e Manutenção. Portanto, não é apenas na manutenção ou frente a painéis energizados que as regras incidem, mas também durante a elaboração das plantas elétricas e nos canteiros de obra.
              </p>

              <p>
                No ambiente da Petrobras, seja atuando numa parada de manutenção de uma plataforma *offshore* (UPGU), seja atuando na termelétrica que entrega energia para a planta terrestre de refinamento de gás, a universalidade desta afirmação é testada todo dia. Um caldeireiro ou técnico de instrumentação que faz calibração de um transmissor de pressão (que requer energia em 24V ou mesmo 110V AC) trabalha *nas proximidades* da instalação elétrica e consequentemente também encontra-se abarcado pelas proteções dessa norma.
              </p>

              <p>
                Contudo, o que mais despenca em questões estilo CESGRANRIO — e você verá exatamente isso no quiz de consolidação que acompanha este módulo — são as **EXCEÇÕES TÁCITAS**. A NR-10 deixa claro que não atinge de forma generalista instalações elétricas impulsionadas por baterias em frotas veiculares comuns administrativas se tais veículos **não estiverem interligados** ao SEP (Sistema Elétrico de Potência). Pegadinha clássica: "técnico da firma troca bateria de carro no estacionamento administrativo", não incide NR-10 na força da norma, já um eletricista no painel central ou gerador do canteiro, sim.
              </p>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-lg border border-amber-200 dark:border-amber-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">A Regra-Chave (Campo de Aplicação)</h4>
                <div className="space-y-3">
                  <p className="font-semibold">Fases Abrangidas Obrigatoriamente (10.1.2):</p>
                  <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
                    <li>Geração de Energia</li>
                    <li>Transmissão de Energia</li>
                    <li>Distribuição de Energia</li>
                    <li>Consumo final de Energia</li>
                  </ul>
                  <p className="mt-4 font-semibold">Etapas Submetidas:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
                    <li>Projeto, Construção, Montagem, Operação, Manutenção</li>
                    <li>Quaisquer trabalhos **nas suas proximidades**</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* C.E.D.E. CONTENT ACCORDION (Reforço) */}
          <ContentAccordion
            mode="stacked"
            slides={[
              {
                titulo: "Conceituação: O que é 'SEP' e sua importância?",
                icone: <LuLightbulb className="w-5 h-5 text-amber-500" />,
                conteudo: (
                  <div className="space-y-4 text-base">
                    <p>
                      <strong>SEP (Sistema Elétrico de Potência):</strong> Compreende os sistemas
                      destinados à geração, transmissão e distribuição de energia elétrica até o
                      agrupamento da medição de faturamento da empresa. Em suma, é o trecho complexo gerador-subestação-grid fora das dependências operativas exclusivas de baixa tensão, sendo que trabalhar NO ou PERTO do SEP invoca uma categoria de normas AINDA MAIS severas da NR-10 (como o treinamento complementar NR-10 SEP e necessidade de zonas estritas de bloqueio).
                    </p>
                    <p>
                      Sempre que as bancas colocarem *Baixa Tensão* x *Alta Tensão*, lembre-se:
                      Alta Tensão é a tensão superior a 1000 Volts (em CA) ou 1500 Volts (em CC). Mas a NR-10 também regulamenta a Baixa Tensão (até 1000V) e a Extra-Baixa Tensão (tensão de segurança, isolamento extremo).
                    </p>
                  </div>
                ),
              },
              {
                titulo: "Exemplificação Prática",
                icone: <LuPlay className="w-5 h-5 text-amber-500" />,
                conteudo: (
                  <div className="space-y-4 text-base">
                    <p>Para cristalizar as exclusões da NR-10:</p>
                    <ul className="list-decimal list-inside space-y-2">
                      <li>Técnico de automação configura uma válvula num painel 110V: <strong>Aplica-se NR-10.</strong></li>
                      <li>Engenheiro dimensiona fiação no CAD: <strong>Aplica-se NR-10 (etapa Projeto).</strong></li>
                      <li>Operador troca bateria e farol de uma picape 4x4 do controle operacional (sem relation c/ SEP): <strong>NÃO é o foco direto da NR-10 para risco de arco/choque em instalações de consumo industrial normais.</strong></li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "Dicas: A Pegadinha da Unidade",
                icone: <LuLightbulb className="w-5 h-5 text-amber-500" />,
                conteudo: (
                  <div className="space-y-2">
                    <p>A Petrobras/Cesgranrio AMA confundir as fases (G-T-D-C) com as etapas (P-C-M-O-M). </p>
                    <p><strong>Macete:</strong> O 25,4 da metrologia é útil, mas aqui o número é 75 (kW) para o PIE. Nunca esqueça!</p>
                  </div>
                )
              },
              {
                titulo: "Exceções e Casos Especiais",
                icone: <LuTriangleAlert className="w-5 h-5 text-amber-500" />,
                conteudo: (
                  <ul className="list-disc list-inside space-y-1">
                    <li>Instalações de TI/Telecom menores que 50V CA ou 120V CC (Extra-Baixa Tensão) têm critérios diferenciados.</li>
                    <li>Equipamentos hospitalares de suporte à vida têm normas redundantes sobrepostas.</li>
                  </ul>
                )
              }
            ]}
          />

          <ModuleConsolidation
            index={1}
            variant={mv[1]}
            video={{ 
              videoId: "dQw4w9WgXcQ", 
              title: "NR-10: Introdução e Abrangência", 
              duration: "08:45" 
            }}
            resumoVisual={{ 
              moduloNome: "Módulo 1", 
              tituloAula: "Segurança em Eletricidade", 
              materia: "Segurança do Trabalho", 
              images: [
                { title: "G-T-D-C", type: "infographic", placeholderColor: "amber" },
                { title: "Berço ao Túmulo", type: "diagram", placeholderColor: "orange" }
              ]
            }}
            maceteVisual={{ 
              title: "O Mantra da NR-10", 
              content: <div className="text-xl font-bold italic text-center p-4">"Gera, Transmite, Distribui e Consome... do Projeto ao Descarte, a regra tem nome!"</div> 
            }}
            audio={{ 
              audioUrl: "/audio/nr10-m1.mp3", 
              titulo: "Podcast NR-10 M1", 
              artista: "Segurança Petrobras" 
            }}
          />

          <QuizInterativo titulo="Simulado de Conhecimento"
            questoes={quizM1}
            variant={mv[1]}
            onComplete={() => handleModuleComplete("modulo-1")}
          />
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
            descricao="O cerne da prevenção de acidentes baseia-se em hierarquias obrigatórias. Entenda por que a Desenergização é rainha."
          />

          {/* RICH INTRO SECTION */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Escaleta Irrevogável da Segurança Elétrica"
              description="Hierarquia que destrói as questões do quiz e fundamenta as provas de segurança do trabalho"
              variant={mv[2]}
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                As normas do Ministério do Trabalho adotam, em sua imensa maioria, um princípio basilar que dita: entre a proteção ambiental/coletiva e a proteção ancorada exclusivamente num item usado pelo trabalhador (EPI), opta-se SEMPRE, incondicionalmente, pela via coletiva. Com a NR-10, o subitem 10.2.8 impõe formalmente a obrigatoriedade da adoção de medidas de proteção coletiva (EPC) relativas aos riscos elétricos antes de se aventar medidas individuais.
              </p>

              <p>
                Em outras palavras, se um técnico na refinaria precisar de manutenção num painel de 440V, o gerente não deve simplesmente entregar a ele uma vestimenta anticondutiva Classe 4 e luvas até o cotovelo, mandando-o mexer nos dutos vivos. Jamais! A solução deve residir primeiro no arranjo impessoal: desligar a chave, prover barreiras, blindagens, entre outras intervenções sistêmicas e ambientais coletivas.
              </p>

              <p>
                Dentre todas as medidas de proteção coletiva, o texto regulamentar elege, no artigo 10.2.8.2, rainhas absolutas. A primeiríssima atitude, prioritária sobre todas, compreende a **Desenergização Elétrica**. Isso consagra algo fisicamente irrefutável: sem energia (Tensão = Zero, Fonte seccionada, trancada, aterrada), o risco elétrico principal extingue-se momentaneamente no ambiente. Quando esta Desenergização é tecnicamente inviável — por exemplo, nas plataformas da Petrobras onde desligar o painel X colapsa completamente os transmissores vitais antipânico Y — recorre-se, prioritariamente em segunda via, ao **emprego de tensão de segurança** (extrema baixa tensão controlada).
              </p>

              <p>
                A aplicação prática na caldeiraria ou em redes vitais industriais dita ainda que o emprego dessas medidas prioritárias deve vir escalonado. Caso não se consiga a desenergização, nem se consiga implementar tensão extra-baixa de segurança, a norma enumera outras salvaguardas coletivas em uma lista imperativa (A ISOLAÇÃO das partes vivas, criação de BARREIRAS, utilização de INVÓLUCROS protetores em chassi, adoção do BLOQUEIO DO RELIGAMENTO AUTOMÁTICO etc).
              </p>

              <p>
                Como as bancas, em especial a fundação examinadora de concursos da Petrobras, desvirtuam isso? Em todos os concursos há sempre uma afirmação ardilosa dizendo que: "A principal providência a se tomar, sempre que a desenergização for morosa, é garantir que o trabalhador use a vestimenta condutiva com resistência X". É fraude legal. EPC &gt; EPI. Sempre. Desenergização &gt; Equipamentos Isolantes. Sempre. O seu material e roteiro prático no dia-da-prova resume-se neste axioma.
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">A Hierarquia de Ouro (Decore!)</h4>
                <div className="space-y-3">
                  <TimelineItem passo={1} titulo="EPC (Proteção Coletiva)" descricao="Desenergização absoluta de toda a estrutura, respeitadas as cinco etapas essenciais (seccionamento, trancamento, teste de ausência, aterramento, sinalização)." />
                  <TimelineItem passo={2} titulo="Tensão de Segurança" descricao="Caso desenergizar destrua a logística do equipamento em operação crítica (Ex: bomba de ar ininterrupta ou controle HMI vital), usa-se Tensão abaixo das barreiras corporais causadoras de choque letal." />
                  <TimelineItem passo={3} titulo="Outros EPCs Físicos" descricao="Colocação de isolantes nas partes vivas, invólucros plásticos, barricadas com grade protetora e chaves para bloqueio." />
                  <TimelineItem passo={4} titulo="EPI (Proteção Individual)" descricao="Somente na falha técnica ou na inviabilidade operacional manifesta das 3 etapas anteriores é que o trabalhador ampara-se primariamente numa luva ou vestimenta." />
                </div>
              </div>
            </div>
          </section>

          {/* C.E.D.E. CONTENT ACCORDION (Reforço) */}
          <ContentAccordion
            mode="stacked"
            slides={[
              {
                titulo: "Dica de Prova: Os Seis Passos para Desenergizar",
                icone: <LuLightbulb className="w-5 h-5 text-blue-500" />,
                conteudo: (
                  <div className="space-y-4 text-base">
                    <p>
                      Muitas bancas gostam de saber O QUE É uma instalação desenergizada, que a norma traz no seu bojo (NR 10.5.1). Decorra esta sequência de ações garantidoras da Desenergização:
                    </p>
                    <ul className="list-decimal list-inside space-y-1">
                      <li>Seccionamento</li>
                      <li>Impedimento do religamento (Travamento)</li>
                      <li>Constatação da ausência de tensão com instrumento</li>
                      <li>Instalação do aterramento temporário com equipotencialização</li>
                      <li>Proteção dos elementos vizinhos vivos</li>
                      <li>Instalação da placa/sinalização de advertência</li>
                    </ul>
                    <p>Faltou o passo 4 ou 5? A NR considera a cabine como ENERGIZADA!</p>
                  </div>
                ),
              },
              {
                titulo: "Exemplificação: EPC em Painéis",
                icone: <LuShield className="w-5 h-5 text-blue-500" />,
                conteudo: (
                  <div className="space-y-2">
                    <p><strong>Cenário:</strong> Manutenção em cubículo de 13.8kV. </p>
                    <p><strong>Ação Correta:</strong> Seccionamento e Aterramento Temporário Equipotencializado (EPC) antes de qualquer toque. Jamais confiar apenas na bota e luva.</p>
                  </div>
                )
              },
              {
                titulo: "Dicas e Exceções",
                icone: <LuZap className="w-5 h-5 text-blue-500" />,
                conteudo: (
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Exceção:</strong> Tensão de Segurança. Se for menos de 50V CA, a hierarquia muda.</li>
                    <li><strong>Dica:</strong> Decorar os 6 passos da desenergização (S-I-C-A-P-S).</li>
                  </ul>
                )
              }
            ]}
          />

          <ModuleConsolidation
            index={2}
            variant={mv[2]}
            video={{ 
              videoId: "dQw4w9WgXcQ", 
              title: "Hierarquia de Proteção Elétrica", 
              duration: "12:10" 
            }}
            resumoVisual={{ 
              moduloNome: "Módulo 2", 
              tituloAula: "Medidas de Controle", 
              materia: "NR-10", 
              images: [
                { title: "EPC > EPI", type: "infographic", placeholderColor: "blue" },
                { title: "As 6 Etapas", type: "table", placeholderColor: "indigo" }
              ]
            }}
            maceteVisual={{ 
              title: "S-I-C-A-P-S", 
              content: (
                <div className="space-y-2 text-center p-4">
                  <p className="font-bold">S-I-C-A-P-S</p>
                  <p className="text-sm">Secciona, Impede, Constata, Aterra, Protege e Sinaliza!</p>
                </div>
              ) 
            }}
            audio={{ 
              audioUrl: "/audio/nr10-m2.mp3", 
              titulo: "Podcast Medidas de Controle", 
              artista: "Segurança Petrobras" 
            }}
          />

          <QuizInterativo titulo="Simulado de Conhecimento"
            questoes={quizM2}
            variant={mv[2]}
            onComplete={() => handleModuleComplete("modulo-2")}
          />
        </div>
      </TabsContent>

      <TabsContent value="modulo-3">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={3}
            titulo="O PIE - Prontuário de Instalações Elétricas"
            variant={mv[3]}
            descricao="Neste módulo abordaremos a documentação central mandatória por onde o esqueleto documental da NR-10 sobrevive e consolida todas as exigências burocráticas auditáveis."
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Certidão de Nascimento da Instalação"
              description="Potência Mínima e Escopo do Arquivamento de Acordo c/ a NR 10"
              variant={mv[3]}
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                O texto legislativo prevencionista não depende apenas de vontades; ele requer materialidade palpável que possa ser auditável pelos inspetores ou engajável pelos auditores de contingência em momento de incidentes. Assim nasce a obrigação inescusável do Prontuário de Instalações Elétricas, cravado no parágrafo 10.2.4 da norma, carinhosamente adotado pela sigla <strong>PIE</strong> pelas instâncias técnicas e bancas.
              </p>

              <p>
                Esta obrigação não exaure todos os lojistas do bairro mercantil; em outras palavras, a cantina ou pequena drogaria que consome meros kWs na somatória de suas tomadas e chillers tem dispensável obrigação deste conjunto massivo e burocrático de regras que é o PIE. No entanto, para as instalações da alta e média indústria, como as áreas administrativas da Petrobras ou mesmo pequenos entrepostos logísticos pesados com subestações privadas, isso é obrigatório.
              </p>

              <p>
                Qual é a barreira numérica ditada pela NR-10 e cobrada massivamente pelo Cebraspe e Cesgranrio? Exatamente: <strong>Acima de 75 kW de carga instalada</strong>. Repito: TODO estabelecimento com a soma da "carga elétrica global total final alocada nas plantas aprovadas" que seja maior do que os 75 kilowatts (KW) - fator chave, KW, não kVA - são compulsoriamente obrigados à implementação irrestrita e conservação na sede da empresa do tal Prontuário PIE.
              </p>

              <p>
                O PIE em si não é apenas "um" laudo. Consiste de um compilado imenso: relatórios unifilares dos quadros, detalhamento das especificações dos equipamentos de proteção individual que a empresa concede contra choques/arcos elétricos (luvas ATPV, balaclavas RF), comprovação das qualificações intelectuais/autorizações atualizadas de todos os prepostos submetidos como eletricistas ou instrumentistas naquela edificação, laudos consolidados das malhas em terra (SPDA / Para-Raios) e comprovações sistêmicas das zonas perigosas do recinto, entre inúmeros outros relatórios assinados.
              </p>

              <p>
                As questões adoram dizer que o PIE é "obrigatório até mesmo em carga de 50kW", ou que ele "fica hospedado fora da sede central junto à ANEEL ou Bombeiros", o que é rigorosamente falso. O PIE permanece, e sempre deverá estar ali, à disposição, permanentemente atrelado na planta do estabelecimento submetido àquela carga e sempre manuseado ou validos tecnicamente pelo preposto profissional formalizado legalmente para aquilo.
              </p>
            </div>
          </section>

          <ContentAccordion 
            mode="stacked"
            slides={[
                {
                    titulo: "Conceituação: O que NÃO pode faltar no PIE?",
                    icone: <LuFileText className="w-5 h-5 text-emerald-500" />,
                    conteudo: (
                        <ul className="list-disc list-inside space-y-1">
                            <li>Diagramas unifilares atualizados.</li>
                            <li>Laudos de inspeção do SPDA.</li>
                            <li>Relatório de Auditoria de conformidade.</li>
                            <li>Especificações dos EPIs e EPCs.</li>
                        </ul>
                    )
                },
                {
                    titulo: "Exemplificação: Auditoria Petrobras",
                    icone: <LuCheck className="w-5 h-5 text-emerald-500" />,
                    conteudo: (
                        <p>O fiscal da Petrobras solicita o PIE de uma refinaria. Se os diagramas não tiverem a assinatura do Engenheiro Eletricista ou se o laudo de SPDA estiver vencido (inspeção anual), a unidade é multada.</p>
                    )
                },
                {
                    titulo: "Dicas de Memorização",
                    icone: <LuLightbulb className="w-5 h-5 text-emerald-500" />,
                    conteudo: <p>Número Mágico: <strong>75 kW</strong>. Abaixo disso, a norma se preocupa menos com o dossiê textual (PIE).</p>
                },
                {
                    titulo: "Exceções e Pegadinhas",
                    icone: <LuTriangleAlert className="w-5 h-5 text-emerald-500" />,
                    conteudo: <p>Bancas afirmam que empresas com 50kW precisam de PIE. FALSO. Só acima de 75kW.</p>
                }
            ]}
          />

          <ModuleConsolidation
            index={3}
            variant={mv[3]}
            video={{ 
                videoId: "dQw4w9WgXcQ", 
                title: "Dossiê PIE na Prática", 
                duration: "10:30" 
            }}
            resumoVisual={{ 
                moduloNome: "Módulo 3", 
                tituloAula: "O Prontuário", 
                materia: "NR-10", 
                images: [
                    { title: "Checklist PIE", type: "gallery", placeholderColor: "emerald" },
                    { title: "A Regra dos 75kW", type: "infographic", placeholderColor: "green" }
                ]
            }}
            maceteVisual={{ 
                title: "PIE = 75", 
                content: <div className="text-4xl font-black text-center text-emerald-600 p-6">75 kW+</div> 
            }}
            audio={{ 
                audioUrl: "/audio/nr10-m3.mp3", 
                titulo: "Rádio PIE", 
                artista: "Segurança Petrobras" 
            }}
          />

          <QuizInterativo titulo="Simulado de Conhecimento" questoes={quizM3} variant={mv[3]} onComplete={() => handleModuleComplete("modulo-3")} />
        </div>
      </TabsContent>

      <TabsContent value="modulo-4">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={4}
            titulo="Medidas de Proteção Individual e Vestimentas"
            variant={mv[4]}
            descricao="Abordaremos o famigerado 'uso exato de proteção no corpo' da normatização elétrica."
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader index={1} title="As Regras Corporais Irrevogáveis" description="O artigo 10.2.9 e a exigência por características Inertes ao operário" variant={mv[4]} />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                EPI não é mero capacitete plástico quando passamos à arena impiedosa dos campos de eletricidade da NR-10. O regramento normativo dita expressamente as condições obrigatórias no parágrafo 10.2.9 voltado à profilaxia individual (já discutimos que elas vêm num degrau abaixado hierarquicamente perante as protecentes coletivas ou ambientais, correto?). Mas na hora em que este EPI ou Vestimenta se faz vital e inevitável devido à indisposição em desligar a grade (vide intervenções SEP - energizadas, Linha Viva), ele converte-se dogmaticamente absoluto.
              </p>
              <p>
                A primeira e mais vital diretriz exigida na regra 10.2.9.2 define expressamente que quaisquer roupas usadas na jornada em canteiro energizado ou adjacências deverão compulsoriamente contemplar dois preceitos técnicos das barreiras humanas corporárias contra a ignição térmica ou centelhamentos originados na corrente: a condutividade imposta e, especialmente, a Inflamabilidade dos tecidos. Se o tecido atrai as linhas das centelhas do arco elétrico e as encandeia consumindo a roupa de poliéster do operador atritando no seu plexo solar, tem-se a letalidade num microssegundo. Por isto usa-se a blindagem RF (Retardante a Fogo / Anti-Chamas).
              </p>
              <p>
                Nesse mesmo espectro pragmático reside a proibição de praxe: Nos moldes do 10.2.9.3, torna-se literalmente vedado (proibido categoricamente) e passível perante sanção aos supervisores ou próprios vitimados - conforme atestado na norma - qualquer tipo contido ou aderência em partes orgânicas periféricas com Adornos e Adereços da vida civil. Em palavras mais rudimentares aplicadas à realidade pragmática nos polos petroquímicos ou refinarias em que lidamos num polo de dutos 440V ou 13.800V AC: tirem alianças correntes, piercings expostos pescoçais, prendedores poliméricos/metaláceos estéticos de crinas/cabelos.
              </p>
              <p>
                Se a banca te disser "caso utilize uma luva com espessura isolante e proteção para 1500 V, o eletricitário industrial está chancelado legalmente segundo a NR-10 a conservar e trabalhar mantendo a aliança comemorativa de 30 anos no anelar por baixo do EPI, coibido à vista alheia"? Falso. O objeto condutivo na extremidade vital atrai distorções eletromagnéticas passíveis em casos extrínsecos até mesmo perfurando as resistividades e impulsionando perfurações no suor condensado no canal palmar da contenção. O item legal não cita flexibilidade; é taxativo: vedado quaisquer adereços/adornos.
              </p>
            </div>
          </section>

          <ContentAccordion 
            mode="stacked"
            slides={[
                {
                    titulo: "Conceituação: Vestimentas e a Chama",
                    icone: <LuShield className="w-5 h-5 text-orange-500" />,
                    conteudo: (
                        <p>A vestimenta de trabalho deve ser capaz de suportar o efeito térmico do arco elétrico e ser condutiva para evitar acúmulo de estática em áreas classificadas.</p>
                    )
                },
                {
                    titulo: "Exemplificação: O Risco do Adorno",
                    icone: <LuTriangleAlert className="w-5 h-5 text-orange-500" />,
                    conteudo: (
                        <p>Um eletricista usando aliança de ouro pode sofrer uma queimadura de 3º grau instantânea se a joia entrar em contato com um barramento energizado, mesmo de baixa tensão.</p>
                    )
                },
                {
                    titulo: "Dica: Proibição de Adornos",
                    icone: <LuLightbulb className="w-5 h-5 text-orange-500" />,
                    conteudo: (
                        <p>O item 10.2.9.3 proíbe expressamente o uso de adornos pessoais nos trabalhos com instalações elétricas.</p>
                    )
                },
                {
                    titulo: "Exceções Técnicas",
                    icone: <LuZap className="w-5 h-5 text-orange-500" />,
                    conteudo: (
                        <p>Algumas vestimentas especiais são projetadas para resistir a ATPV específicos. Verifique sempre a etiqueta CA.</p>
                    )
                }
            ]}
          />

          <ModuleConsolidation
            index={4}
            variant={mv[4]}
            video={{ 
                videoId: "dQw4w9WgXcQ", 
                title: "EPI e Vestimentas na NR-10", 
                duration: "09:20" 
            }}
            resumoVisual={{ 
                moduloNome: "Módulo 4", 
                tituloAula: "EPI e Vestimentas", 
                materia: "NR-10", 
                images: [
                    { title: "Proibição de Adornos", type: "infographic", placeholderColor: "orange" },
                    { title: "Tecidos Ignífugos", type: "gallery", placeholderColor: "red" }
                ]
            }}
            maceteVisual={{ 
                title: "Regra do Ouro", 
                content: <div className="text-xl font-bold text-center text-orange-700 p-4">"Aliança, brinco ou relógio... na elétrica, trazem o necrotério!"</div> 
            }}
            audio={{ 
                audioUrl: "/audio/nr10-m4.mp3", 
                titulo: "Podcast EPIs", 
                artista: "Segurança Petrobras" 
            }}
          />

          <QuizInterativo titulo="Simulado de Conhecimento" questoes={quizM4} variant={mv[4]} onComplete={() => handleModuleComplete("modulo-4")} />
        </div>
      </TabsContent>

      <TabsContent value="modulo-5">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={5}
            titulo="Zonas de Risco"
            variant={mv[5]}
            descricao="Entendendo os raios limítrofes, delimitações dimensionais e exigências de intervenção estipuladas no apêndice da NR."
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader index={1} title="Radial de Segurança Elétrica" description="De Livre, para Controlada e finalmente a letal Zona de Risco" variant={mv[5]} />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Conforme observamos o avanço do ponto elétrico desprotegido irradiando no espaço vital (o "Ponto Físico Não-Isolado Energizado"), o invólucro imaginário ao redor dele que a norma NR-10 formalmente classifica nos seus anexos baseia-se num gradiente dimensional ditado pela tensão global (kV) incidente naquele exato local físico. Temos os três círculos virtuais de afastamento (as Zonas de contenção radiais). Este assunto cai tanto na prova de segurança do trabalho quanto na prova da elétrica técnica predial básica.
              </p>
              <p>
                As três Zonas delimitadas: <strong>(1) A Zona de Risco (ZR)</strong> é a delimitação virtual irrestritamente próxima; entrar nessa margem submete impiedosamente o corpo físico às possibilidades factuais do salto em flash do arco elétrico fatal. Portanto, ingressar ou estender qualquer haste de ferramentas ali assemelha-se burocraticamente (sintonia administrativa) aos padrões rígidos do trabalho de 'linha viva': só trabalhadores autorizados (em seu ápice, os mais treinandos na corporação com SEP e avalizados pelo PCMSO específico) e vestidos das couraças impeditivas adequadas podem ali atuar.
              </p>
              <p>
                Fora da ZR, nós temos um contorno concêntrico ou retilíneo virtual secundário, que é a <strong>(2) Zona Controlada (ZC)</strong>. Se estendermos até esse perímetro as réguas dimensionais do Anexo da Regulação Legal e o trabalhador não autorizado, sem as qualidades cabais legal ou os devidos EPC/EPI cruzar para o raio, as penalidades procedurais recaem no fiscal predial e expõem este leigo a descargas indiretas e contingências na variação perigosa do contato na tensão de passa ou passo em falha do subsolo. A regra para a ZC é: pessoas inadvertidas e NÃO autorizadas continuam estritamente proibidas (confinadas a não entrada e banidas desse acesso).
              </p>
              <p>
                Por último e irrestritamente liberada pela lei encontra-se a remanescente <strong>(3) Zona Livre (ZL)</strong>. Quando a literatura teórica descrever e a CESGRANRIO cobrar no quiz, esta é a margem liminar circundando toda e qualquer subestação onde absolutamente qualquer sujeito operário, porteiro civil, assistente de logística, gerente leigo predial pode residir ou estar locado de corpo alocado sem ser forçado legalizadamente pelo uso de couraças normativas extremadas da referida regulação NR10 – claro, contanto que se mantenham nessa contenção limitadora externa ZL.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ComparisonSide
                tipo="incorrect"
                titulo="Pessoas Não Autorizadas"
                items={["Jamais entram ou adentram as linhas tênues das margens radiotivas da Zona Controlada (ZC)", "Pior ainda, não acessam a Zona de Risco (ZR)"]}
              />
              <ComparisonSide
                tipo="correct"
                titulo="Trabalhadores Autorizados"
                items={["Possuem aval burocrático e aptidão documental médica total para ZC", "Ingressam com ferramental e autorização na ZR apenas sob as cautelas severas de EPCs / EPIs"]}
              />
            </div>
          </section>

          <ContentAccordion 
            mode="stacked"
            slides={[
                {
                    titulo: "Conceituação: Zonas de Risco e Livre",
                    icone: <LuZap className="w-5 h-5 text-red-500" />,
                    conteudo: (
                        <ul className="list-disc list-inside space-y-1">
                            <li><strong>ZR:</strong> Área em torno de ponto energizado acessível apenas a profissionais autorizados.</li>
                            <li><strong>ZC:</strong> Área entre a ZR e a zona livre.</li>
                            <li><strong>ZL:</strong> Todo o restante do ambiente.</li>
                        </ul>
                    )
                },
                {
                    titulo: "Exemplificação: Distâncias de Segurança",
                    icone: <LuTriangleAlert className="w-5 h-5 text-red-500" />,
                    conteudo: (
                        <p>Para uma linha de 13.8kV, a zona de risco é de 0,6m. Estar a 50cm significa estar DENTRO do risco de arco, mesmo sem tocar no fio.</p>
                    )
                },
                {
                    titulo: "Dica de Prova: Prontuário vs Zonas",
                    icone: <LuLightbulb className="w-5 h-5 text-red-500" />,
                    conteudo: (
                        <p>Lembre-se: O PIE é para instalações acima de 75kW. As zonas de risco se aplicam a QUALQUER tensão acima de 50V CA.</p>
                    )
                },
                {
                    titulo: "Exceções e Casos Especiais",
                    icone: <LuZap className="w-5 h-5 text-red-500" />,
                    conteudo: (
                        <p>Trabalhos em proximidade exigem barreiras físicas ou sinalização rígida para evitar invasão inadvertida da ZR.</p>
                    )
                }
            ]}
          />

          <ModuleConsolidation
            index={5}
            variant={mv[5]}
            video={{ 
                videoId: "dQw4w9WgXcQ", 
                title: "Zonas de Risco Detalhadas", 
                duration: "14:50" 
            }}
            resumoVisual={{ 
                moduloNome: "Módulo 5", 
                tituloAula: "Zonas de Risco", 
                materia: "NR-10", 
                images: [
                    { title: "Mapa de Zonas", type: "diagram", placeholderColor: "red" },
                    { title: "Tabela de Raio", type: "table", placeholderColor: "rose" }
                ]
            }}
            maceteVisual={{ 
                title: "ZR vs ZC", 
                content: <div className="text-center p-4">ZR = Risco (Só autorizados) <br/> ZC = Controlada (Monitorado)</div> 
            }}
            audio={{ 
                audioUrl: "/audio/nr10-m5.mp3", 
                titulo: "Podcast Final NR-10", 
                artista: "Segurança Petrobras" 
            }}
          />

          <QuizInterativo titulo="Simulado de Conhecimento" questoes={quizM5} variant={mv[5]} onComplete={() => handleModuleComplete("modulo-5")} />
        </div>
      </TabsContent>

    </AulaTemplate>
  );
}
