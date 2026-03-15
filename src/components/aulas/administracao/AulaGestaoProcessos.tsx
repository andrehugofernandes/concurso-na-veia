// Gestão de Processos - Premium Aula (stub - will be expanded)
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
} from "../shared";

import {
  LuBookOpen,
  LuLightbulb,
  LuTarget,
  LuTrendingUp,
  LuTrophy,
  LuBrain,
  LuRepeat,
  LuSigma,
  LuZap,
} from "react-icons/lu";

import { getModuleVariant } from "@/lib/moduleColors";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Conceitos de Processos" },
  { id: "modulo-2", label: "Módulo 2", title: "BPM" },
  { id: "modulo-3", label: "Módulo 3", title: "Modelagem BPMN" },
  { id: "modulo-4", label: "Módulo 4", title: "Mapeamento AS-IS/TO-BE" },
  { id: "modulo-5", label: "Módulo 5", title: "Melhoria Contínua" },
  { id: "modulo-6", label: "Módulo 6", title: "Indicadores de Processos" },
  { id: "modulo-7", label: "Módulo 7", title: "Automação e Transformação" },
  { id: "modulo-8", label: "Módulo 8", title: "Gestão da Qualidade" },
  { id: "modulo-9", label: "Módulo 9", title: "Aplicações Petrobras" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
] as const;

// Temporary inline quizzes until data file is ready
const TEMP_QUIZ = [
  { id: 1, pergunta: "O que significa BPM?", opcoes: [{ label: "A", valor: "Business Process Management" }, { label: "B", valor: "Business Product Management" }, { label: "C", valor: "Basic Process Model" }, { label: "D", valor: "Business Plan Method" }, { label: "E", valor: "Best Practice Model" }], correta: "A", explicacao: "BPM = Business Process Management (Gerenciamento de Processos de Negócio). É a disciplina que combina métodos, ferramentas e tecnologia para projetar, analisar, executar e monitorar processos organizacionais." },
  { id: 2, pergunta: "Qual a diferença entre processo e procedimento?", opcoes: [{ label: "A", valor: "São sinônimos" }, { label: "B", valor: "Processo é macro, procedimento é o passo-a-passo" }, { label: "C", valor: "Procedimento é mais amplo que processo" }, { label: "D", valor: "Processo não tem entrada definida" }, { label: "E", valor: "Procedimento não gera resultado" }], correta: "B", explicacao: "Processo é o conjunto de atividades inter-relacionadas que transforma entradas em saídas. Procedimento é a descrição detalhada (passo-a-passo) de como executar uma atividade dentro do processo." },
  { id: 3, pergunta: "Na notação BPMN, um evento de início é representado por:", opcoes: [{ label: "A", valor: "Retângulo" }, { label: "B", valor: "Losango" }, { label: "C", valor: "Círculo fino" }, { label: "D", valor: "Círculo grosso" }, { label: "E", valor: "Seta" }], correta: "C", explicacao: "Na BPMN, eventos de início são representados por círculos com borda fina. Eventos intermediários têm borda dupla fina, e eventos de fim têm borda grossa." },
  { id: 4, pergunta: "O mapeamento AS-IS representa:", opcoes: [{ label: "A", valor: "O processo futuro desejado" }, { label: "B", valor: "O processo atual como ele é" }, { label: "C", valor: "O processo ideal teórico" }, { label: "D", valor: "O benchmark do mercado" }, { label: "E", valor: "A documentação legal" }], correta: "B", explicacao: "AS-IS (como é) mapeia o processo atual. TO-BE (como será) mapeia o processo futuro desejado após melhorias. O gap analysis compara ambos para identificar oportunidades." },
];

export default function AulaGestaoProcessos({
  onComplete, isCompleted, loading, xpGanho = 50,
  currentProgress, onUpdateProgress, titulo, descricao, duracao,
  materiaNome, materiaCor, materiaId, prevTopico, nextTopico,
}: AulaProps) {
  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());
  const [quizM1] = useState(() => TEMP_QUIZ);
  const [quizM2] = useState(() => TEMP_QUIZ);
  const [quizM3] = useState(() => TEMP_QUIZ);
  const [quizM4] = useState(() => TEMP_QUIZ);
  const [quizM5] = useState(() => TEMP_QUIZ);
  const [quizM6] = useState(() => TEMP_QUIZ);
  const [quizM7] = useState(() => TEMP_QUIZ);
  const [quizM8] = useState(() => TEMP_QUIZ);
  const [quizM9] = useState(() => TEMP_QUIZ);
  const [quizM10] = useState(() => TEMP_QUIZ);

  const [hasSyncedInitial, setHasSyncedInitial] = useState(false);
  const [showCompletionBadge, setShowCompletionBadge] = useState(false);

  useEffect(() => {
    if (isCompleted) setShowCompletionBadge(true);
  }, [isCompleted]);

  useEffect(() => {
    if (!hasSyncedInitial && !loading && currentProgress !== undefined && currentProgress > 0) {
      const doneCount = Math.floor((currentProgress / 100) * MODULE_DEFS.length);
      const newDone = new Set<string>();
      for (let i = 0; i < doneCount; i++) newDone.add(MODULE_DEFS[i].id);
      setCompletedModules(newDone);
      setHasSyncedInitial(true);
    } else if (!hasSyncedInitial && !loading && currentProgress === 0) {
      setHasSyncedInitial(true);
    }
  }, [currentProgress, hasSyncedInitial, loading]);

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 70) {
      const newSet = new Set(completedModules).add(moduleId);
      setCompletedModules(newSet);
      const percent = Math.round((newSet.size / MODULE_DEFS.length) * 100);
      if (onUpdateProgress) onUpdateProgress(percent);
      const index = MODULE_DEFS.findIndex((m) => m.id === moduleId);
      if (index === MODULE_DEFS.length - 1) {
        setShowCompletionBadge(true);
        onComplete?.();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setTimeout(() => setActiveTab(MODULE_DEFS[index + 1].id), 1500);
      }
    }
  };

  const isModuleUnlocked = (index: number) => {
    if (isCompleted || index === 0) return true;
    return completedModules.has(MODULE_DEFS[index - 1].id);
  };

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={(val) => {
        const idx = MODULE_DEFS.findIndex((m) => m.id === val);
        if (isModuleUnlocked(idx)) setActiveTab(val);
      }}
      modules={Array.from(MODULE_DEFS)}
      completedModules={completedModules}
      isModuleUnlocked={isModuleUnlocked}
      titulo={titulo}
      descricao={descricao}
      duracao={duracao}
      materiaNome={materiaNome}
      materiaCor={materiaCor}
      materiaId={materiaId}
      isCompleted={isCompleted}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
      currentProgress={Math.round((completedModules.size / MODULE_DEFS.length) * 100)}
      onComplete={onComplete}
      loading={loading}
      xpGanho={xpGanho}
    >
      {/* ═══ MÓDULO 1: CONCEITOS DE PROCESSOS ═══ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={1}
            titulo="Conceitos de Processos Organizacionais"
            descricao="Entenda o que são processos, como classificá-los e por que são a base da gestão moderna."
            gradiente="bg-gradient-to-br from-blue-700 to-sky-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="O que é um Processo?"
              description="Definição, elementos e classificação dos processos organizacionais."
              variant={getModuleVariant(1)}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - Definição de Processo",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Um <strong>processo</strong> é um conjunto estruturado de atividades inter-relacionadas que transforma <strong>entradas</strong> (inputs) em <strong>saídas</strong> (outputs) de valor para o cliente ou stakeholder.
                      </p>
                      <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
                        <p className="font-bold text-blue-700 mb-2">Elementos de um Processo:</p>
                        <div className="space-y-1 text-sm">
                          <p><strong>Entrada (Input):</strong> Matéria-prima, informação, demanda</p>
                          <p><strong>Atividades:</strong> Transformação, agregação de valor</p>
                          <p><strong>Saída (Output):</strong> Produto, serviço, resultado</p>
                          <p><strong>Responsável (Dono):</strong> Quem responde pelo processo</p>
                          <p><strong>Indicadores:</strong> Métricas de desempenho</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Processos na Petrobras",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">Tipos de processos em uma organização:</p>
                      <div className="space-y-2">
                        <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20">
                          <p className="font-bold text-blue-700 text-sm">Processos Primários (Core)</p>
                          <p className="text-xs">Exploração, Refino, Distribuição — geram valor direto ao cliente</p>
                        </div>
                        <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20">
                          <p className="font-bold text-blue-700 text-sm">Processos de Suporte</p>
                          <p className="text-xs">RH, TI, Compras — apoiam os processos primários</p>
                        </div>
                        <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20">
                          <p className="font-bold text-blue-700 text-sm">Processos Gerenciais</p>
                          <p className="text-xs">Planejamento, Governança, Controle — direcionam a organização</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Hierarquia de Processos",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="info" titulo="Hierarquia Processual">
                        <div className="text-sm space-y-1">
                          <p><strong>Macroprocesso</strong> → Processo → Subprocesso → Atividade → Tarefa</p>
                          <p className="text-xs text-muted-foreground mt-2">Ex: Macroprocesso "Produção" → Processo "Refino" → Subprocesso "Destilação" → Atividade "Controle de temperatura" → Tarefa "Verificar sensor"</p>
                        </div>
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Processos vs. Projetos",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20">
                        <p className="font-bold text-blue-700 text-sm mb-1">Processo: Contínuo e Repetitivo</p>
                        <p className="text-xs">Operações do dia a dia, sem data de término definida</p>
                      </div>
                      <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20">
                        <p className="font-bold text-blue-700 text-sm mb-1">Projeto: Temporário e Único</p>
                        <p className="text-xs">Início e fim definidos, resultado exclusivo</p>
                      </div>
                      <AlertBox tipo="warning" titulo="Pegadinha de Prova!">
                        <p className="text-sm">A CESGRANRIO adora confundir processo com projeto. Lembre: processo é CONTÍNUO, projeto é TEMPORÁRIO.</p>
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <ModuleConsolidation
            index={1}
            variant={getModuleVariant(1)}
            video={{
              videoId: "T3Z7M-0eEG8",
              title: "Gestão de Processos: Fundamentos",
              duration: "15:30",
            }}
            resumoVisual={{
              moduloNome: "Conceitos de Processos",
              tituloAula: "Gestão de Processos",
              materia: "Administração",
              images: [
                { title: "Entrada → Processo → Saída", type: "Conceito", placeholderColor: "bg-blue-500/20" },
                { title: "Primários, Suporte, Gerenciais", type: "Classificação", placeholderColor: "bg-sky-500/20" },
                { title: "Hierarquia Processual", type: "Estrutura", placeholderColor: "bg-cyan-500/20" },
              ],
            }}
            maceteVisual={{
              title: "Processo: Transforma Entradas em Saídas!",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-sm italic">"Todo processo tem dono, entrada, saída e indicador."</p>
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg font-mono text-xs text-center">
                    <p>INPUT → PROCESSO → OUTPUT</p>
                    <p className="text-muted-foreground">+ Dono + Indicadores</p>
                  </div>
                </div>
              ),
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
              titulo: "Processos: Fundamentos",
              artista: "Prof. Administração",
            }}
          />

          <section id="quiz-modulo-1" className="mt-16">
            <QuizInterativo
              questoes={quizM1}
              titulo="Fixação - Conceitos de Processos"
              numero={1}
              variant={getModuleVariant(1)}
              icone="🧠"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 2: BPM ═══ */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={2} titulo="BPM - Business Process Management" descricao="A disciplina que une métodos, ferramentas e tecnologia para gerir processos." gradiente="bg-gradient-to-br from-emerald-600 to-teal-800" />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader index={2} title="O Ciclo BPM" description="Projetar, modelar, executar, monitorar e otimizar." variant={getModuleVariant(2)} />
            <ContentAccordion slides={[
              { titulo: "Conceituação - O que é BPM?", icone: <LuBrain />, conteudo: (<div className="space-y-4"><p className="text-muted-foreground leading-relaxed">BPM (Business Process Management) é uma abordagem disciplinada para identificar, desenhar, executar, documentar, medir, monitorar e controlar processos de negócio.</p><div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20"><p className="font-bold text-emerald-700 mb-2">Ciclo de Vida BPM:</p><div className="space-y-1 text-sm"><p>1. <strong>Planejamento:</strong> Definir estratégia de processos</p><p>2. <strong>Análise:</strong> Entender o AS-IS</p><p>3. <strong>Desenho:</strong> Projetar o TO-BE</p><p>4. <strong>Implementação:</strong> Implantar mudanças</p><p>5. <strong>Monitoramento:</strong> Medir desempenho</p><p>6. <strong>Refinamento:</strong> Melhoria contínua</p></div></div></div>) },
              { titulo: "Exemplificação - BPM na Prática", icone: <LuBookOpen />, conteudo: (<div className="space-y-4"><p className="text-muted-foreground text-sm">Na Petrobras, BPM é usado para:</p><div className="space-y-2"><div className="bg-emerald-500/10 p-3 rounded border border-emerald-500/20"><p className="font-bold text-emerald-700 text-sm">Processo de Compras</p><p className="text-xs">Requisição → Cotação → Aprovação → Pedido → Recebimento</p></div><div className="bg-emerald-500/10 p-3 rounded border border-emerald-500/20"><p className="font-bold text-emerald-700 text-sm">Processo de Manutenção</p><p className="text-xs">Solicitação → Planejamento → Programação → Execução → Encerramento</p></div></div></div>) },
              { titulo: "Dicas - BPMS vs BPM", icone: <LuLightbulb />, conteudo: (<div className="space-y-4"><AlertBox tipo="info" titulo="Não Confunda!"><div className="text-sm space-y-1"><p><strong>BPM:</strong> Disciplina/abordagem de gestão</p><p><strong>BPMS:</strong> Software/sistema que automatiza BPM</p><p><strong>BPMN:</strong> Notação gráfica para modelar processos</p></div></AlertBox></div>) },
              { titulo: "Exceções - Quando NÃO usar BPM", icone: <LuTrophy />, conteudo: (<div className="space-y-3"><AlertBox tipo="warning" titulo="Cuidado na Prova!"><p className="text-sm">BPM não é adequado para atividades puramente criativas ou decisões estratégicas únicas. É ideal para processos repetitivos e estruturados.</p></AlertBox></div>) },
            ]} />
          </section>
          <ModuleConsolidation index={2} variant={getModuleVariant(2)} video={{ videoId: "T3Z7M-0eEG8", title: "BPM Explicado", duration: "12:00" }} resumoVisual={{ moduloNome: "BPM", tituloAula: "Gestão de Processos", materia: "Administração", images: [{ title: "Ciclo de Vida BPM", type: "Conceito", placeholderColor: "bg-emerald-500/20" }, { title: "BPM vs BPMS vs BPMN", type: "Diferença", placeholderColor: "bg-teal-500/20" }, { title: "Aplicações Práticas", type: "Aplicação", placeholderColor: "bg-green-500/20" }] }} maceteVisual={{ title: "BPM = Disciplina, BPMS = Software, BPMN = Notação", content: (<div className="space-y-3 text-left"><p className="text-sm italic">"BPM é a filosofia, BPMS é a ferramenta, BPMN é a linguagem."</p></div>) }} audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", titulo: "BPM na Prática", artista: "Prof. Administração" }} />
          <section id="quiz-modulo-2" className="mt-16">
            <QuizInterativo questoes={quizM2} titulo="Fixação - BPM" numero={2} variant={getModuleVariant(2)} icone="🎯" onComplete={(score) => handleModuleComplete("modulo-2", score)} />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 3: MODELAGEM BPMN ═══ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={3} titulo="Modelagem BPMN" descricao="A notação padrão internacional para diagramar processos de negócio." gradiente="bg-gradient-to-br from-amber-600 to-orange-700" />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader index={3} title="Elementos da BPMN" description="Eventos, atividades, gateways e fluxos." variant={getModuleVariant(3)} />
            <ContentAccordion slides={[
              { titulo: "Conceituação - Elementos BPMN", icone: <LuBrain />, conteudo: (<div className="space-y-4"><p className="text-muted-foreground leading-relaxed">BPMN (Business Process Model and Notation) é a notação gráfica padrão ISO para representar processos de negócio.</p><div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20"><p className="font-bold text-amber-700 mb-2">Elementos Principais:</p><div className="space-y-1 text-sm"><p><strong>Eventos (Círculos):</strong> Início, Intermediário, Fim</p><p><strong>Atividades (Retângulos):</strong> Tarefas e Subprocessos</p><p><strong>Gateways (Losangos):</strong> Decisões e junções</p><p><strong>Fluxos (Setas):</strong> Sequência, Mensagem, Associação</p></div></div></div>) },
              { titulo: "Exemplificação - Gateway Exclusivo (XOR)", icone: <LuBookOpen />, conteudo: (<div className="space-y-4"><div className="bg-amber-500/10 p-4 rounded border border-amber-500/20"><p className="font-bold text-amber-700 text-sm mb-2">Gateway Exclusivo (X)</p><p className="text-xs">Apenas UM caminho é seguido. Ex: "Pedido aprovado?" → Sim OU Não</p></div><div className="bg-amber-500/10 p-4 rounded border border-amber-500/20"><p className="font-bold text-amber-700 text-sm mb-2">Gateway Paralelo (+)</p><p className="text-xs">TODOS os caminhos são seguidos simultaneamente. Ex: "Enviar email E atualizar sistema"</p></div><div className="bg-amber-500/10 p-4 rounded border border-amber-500/20"><p className="font-bold text-amber-700 text-sm mb-2">Gateway Inclusivo (O)</p><p className="text-xs">UM OU MAIS caminhos são seguidos. Ex: "Notificar gerente E/OU auditor"</p></div></div>) },
              { titulo: "Dicas - Pools e Lanes", icone: <LuLightbulb />, conteudo: (<div className="space-y-4"><AlertBox tipo="info" titulo="Organização Visual"><div className="text-sm space-y-1"><p><strong>Pool:</strong> Representa uma organização ou participante</p><p><strong>Lane:</strong> Subdivide o Pool por departamento/papel</p><p className="text-xs text-muted-foreground mt-2">Ex: Pool "Petrobras" com lanes "Compras", "Jurídico", "Financeiro"</p></div></AlertBox></div>) },
              { titulo: "Exceções - Erros Comuns em BPMN", icone: <LuTrophy />, conteudo: (<div className="space-y-3"><AlertBox tipo="warning" titulo="Evite na Prova!"><div className="text-sm space-y-1"><p>• Processo sem evento de início ou fim</p><p>• Gateway sem condição nos fluxos de saída</p><p>• Fluxo de mensagem dentro do mesmo Pool</p><p>• Atividade sem fluxo de entrada ou saída</p></div></AlertBox></div>) },
            ]} />
          </section>
          <ModuleConsolidation index={3} variant={getModuleVariant(3)} video={{ videoId: "T3Z7M-0eEG8", title: "BPMN na Prática", duration: "14:00" }} resumoVisual={{ moduloNome: "Modelagem BPMN", tituloAula: "Gestão de Processos", materia: "Administração", images: [{ title: "Eventos, Atividades, Gateways", type: "Elementos", placeholderColor: "bg-amber-500/20" }, { title: "Tipos de Gateway", type: "Decisão", placeholderColor: "bg-orange-500/20" }, { title: "Pools e Lanes", type: "Organização", placeholderColor: "bg-yellow-500/20" }] }} maceteVisual={{ title: "BPMN: Círculo-Retângulo-Losango!", content: (<div className="space-y-3 text-left"><p className="text-sm italic">"Evento é círculo, atividade é retângulo, gateway é losango."</p></div>) }} audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", titulo: "BPMN Descomplicado", artista: "Prof. Administração" }} />
          <section id="quiz-modulo-3" className="mt-16">
            <QuizInterativo questoes={quizM3} titulo="Fixação - BPMN" numero={3} variant={getModuleVariant(3)} icone="📊" onComplete={(score) => handleModuleComplete("modulo-3", score)} />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULOS 4-10: Estrutura Base ═══ */}
      {[
        { mod: "modulo-4", num: 4, titulo: "Mapeamento de Processos", desc: "Técnicas AS-IS e TO-BE para diagnóstico e redesenho.", grad: "bg-gradient-to-br from-rose-600 to-pink-800", quiz: quizM4, secTitle: "AS-IS e TO-BE", secDesc: "Mapeie o presente, projete o futuro." },
        { mod: "modulo-5", num: 5, titulo: "Melhoria Contínua", desc: "Kaizen, Lean, Six Sigma e PDCA aplicados a processos.", grad: "bg-gradient-to-br from-violet-600 to-purple-800", quiz: quizM5, secTitle: "Filosofias de Melhoria", secDesc: "Kaizen, Lean e Six Sigma na prática." },
        { mod: "modulo-6", num: 6, titulo: "Indicadores de Processos", desc: "KPIs, dashboards e métricas para monitoramento eficaz.", grad: "bg-gradient-to-br from-amber-900 via-amber-500 to-amber-800", quiz: quizM6, secTitle: "KPIs e Métricas", secDesc: "Medir para melhorar." },
        { mod: "modulo-7", num: 7, titulo: "Automação e Transformação Digital", desc: "RPA, workflow engines e digitalização de processos.", grad: "bg-gradient-to-br from-blue-900 via-blue-500 to-blue-800", quiz: quizM7, secTitle: "Automação de Processos", secDesc: "Do manual ao digital." },
        { mod: "modulo-8", num: 8, titulo: "Gestão da Qualidade", desc: "ISO 9001, TQM e ferramentas da qualidade.", grad: "bg-gradient-to-br from-emerald-900 via-emerald-500 to-emerald-800", quiz: quizM8, secTitle: "Qualidade Total", secDesc: "ISO 9001 e ferramentas essenciais." },
        { mod: "modulo-9", num: 9, titulo: "Aplicações Petrobras", desc: "Gestão de processos no setor de óleo e gás.", grad: "bg-gradient-to-br from-rose-900 via-rose-500 to-rose-800", quiz: quizM9, secTitle: "Processos no O&G", secDesc: "Aplicações reais na Petrobras." },
        { mod: "modulo-10", num: 10, titulo: "Simulado Mestre", desc: "Teste integrado com questões de todos os módulos.", grad: "bg-gradient-to-br from-violet-900 via-violet-500 to-violet-800", quiz: quizM10, secTitle: "Desafio Final", secDesc: "Prove seu domínio em Gestão de Processos!" },
      ].map(({ mod, num, titulo: modTitulo, desc, grad, quiz, secTitle, secDesc }) => (
        <TabsContent key={mod} value={mod} className="space-y-[50px]">
          <div className="space-y-12 animate-in fade-in duration-500">
            <ModuleBanner numero={num} titulo={modTitulo} descricao={desc} gradiente={grad} />
            <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
              <ModuleSectionHeader index={num} title={secTitle} description={secDesc} variant={getModuleVariant(num)} />
              <ContentAccordion slides={[
                { titulo: `Conceituação - ${modTitulo}`, icone: <LuBrain />, conteudo: (<div className="space-y-4"><p className="text-muted-foreground leading-relaxed">Conteúdo detalhado sobre {modTitulo.toLowerCase()} será expandido com C.E.D.E. completo.</p><AlertBox tipo="info" titulo="Em Construção"><p className="text-sm">Este módulo está sendo expandido com conteúdo premium completo.</p></AlertBox></div>) },
                { titulo: `Exemplificação - ${modTitulo}`, icone: <LuBookOpen />, conteudo: (<div className="space-y-4"><p className="text-muted-foreground text-sm">Exemplos práticos de {modTitulo.toLowerCase()} no contexto da Petrobras.</p></div>) },
                { titulo: "Dicas para a Prova", icone: <LuLightbulb />, conteudo: (<div className="space-y-4"><AlertBox tipo="success" titulo="Dica CESGRANRIO"><p className="text-sm">Foque nos conceitos-chave e nas diferenças entre termos similares.</p></AlertBox></div>) },
                { titulo: "Exceções e Pegadinhas", icone: <LuTrophy />, conteudo: (<div className="space-y-3"><AlertBox tipo="warning" titulo="Atenção!"><p className="text-sm">Revise os casos especiais e exceções mais cobrados em provas.</p></AlertBox></div>) },
              ]} />
            </section>
            <ModuleConsolidation index={num} variant={getModuleVariant(num)} video={{ videoId: "T3Z7M-0eEG8", title: modTitulo, duration: "10:00" }} resumoVisual={{ moduloNome: modTitulo, tituloAula: "Gestão de Processos", materia: "Administração", images: [{ title: modTitulo, type: "Conceito", placeholderColor: "bg-blue-500/20" }] }} maceteVisual={{ title: modTitulo, content: (<div className="text-sm italic text-left"><p>Macete visual de {modTitulo.toLowerCase()}</p></div>) }} audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", titulo: modTitulo, artista: "Prof. Administração" }} />
            <section id={`quiz-${mod}`} className="mt-16">
              <QuizInterativo questoes={quiz} titulo={`Fixação - ${modTitulo}`} numero={num} variant={getModuleVariant(num)} icone={num === 10 ? "👑" : "🎯"} onComplete={(score) => handleModuleComplete(mod, score)} />
            </section>
          </div>
        </TabsContent>
      ))}
    </AulaTemplate>
  );
}
