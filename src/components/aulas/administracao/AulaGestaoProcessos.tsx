// Gestão de Processos - Premium Aula (stub - will be expanded)
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
  LuCheck,
  LuLayoutDashboard,
  LuLayers,
  LuDatabase,
  LuSettings,
  LuShield,
  LuMonitor,
  LuArrowDown,
  LuList,
  LuWorkflow,
  LuFileText,
  LuSearch,
  LuRefreshCw,
} from "react-icons/lu";

import { getModuleVariant } from "@/lib/moduleColors";
import { QUIZ_GESTAO_PROCESSOS } from "@/data/quizzes/gestao-processos-quizzes";

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
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Geral" },
] as const;


export default function AulaGestaoProcessos({
  onComplete, isCompleted, loading, xpGanho = 50,
  currentProgress, onUpdateProgress, titulo, descricao, duracao,
  materiaNome, materiaCor, materiaId, prevTopico, nextTopico,
}: AulaProps) {
    const STORAGE_KEY_PREFIX = "petrobras_quest_aula_gestao_processos_";

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
  const [quizM1] = useState(() => QUIZ_GESTAO_PROCESSOS["modulo-1"]);
  const [quizM2] = useState(() => QUIZ_GESTAO_PROCESSOS["modulo-2"]);
  const [quizM3] = useState(() => QUIZ_GESTAO_PROCESSOS["modulo-3"]);
  const [quizM4] = useState(() => QUIZ_GESTAO_PROCESSOS["modulo-4"]);
  const [quizM5] = useState(() => QUIZ_GESTAO_PROCESSOS["modulo-5"]);
  const [quizM6] = useState(() => QUIZ_GESTAO_PROCESSOS["modulo-6"]);
  const [quizM7] = useState(() => QUIZ_GESTAO_PROCESSOS["modulo-7"]);
  const [quizM8] = useState(() => QUIZ_GESTAO_PROCESSOS["modulo-8"]);
  const [quizM9] = useState(() => QUIZ_GESTAO_PROCESSOS["modulo-9"]);
  const [quizM10] = useState(() => QUIZ_GESTAO_PROCESSOS["modulo-10"]);

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

  // Variantes de cor pré-computadas — usa mv[N] ao invés de hardcodar getModuleVariant(N)

  const mv = Object.fromEntries(

    Array.from({ length: 10 }, (_, i) => [i + 1, getModuleVariant(i + 1)])

  ) as Record<number, ReturnType<typeof getModuleVariant>>;


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
      {activeTab === "modulo-1" && (
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={1}
            titulo="Conceitos de Processos Organizacionais"
            descricao="Domine a espinha dorsal da gestão moderna: como as organizações transformam insumos em valor."
            gradiente="bg-gradient-to-br from-amber-300 via-amber-500 to-amber-400"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index="INTRO"
              title="Fundamentos do Processo de Negócio"
              description="A definição técnica e os componentes vitais que caem na sua prova."
              variant={mv[1]}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - O Processo como Transformação",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-muted-foreground leading-relaxed">
                        Para a <strong>CESGRANRIO</strong>, um processo é uma sequência lógica de atividades que consome recursos para transformar uma <strong>entrada</strong> em uma <strong>saída</strong> de valor.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl text-center">
                          <p className="font-bold text-blue-600 mb-1">Entradas (Inputs)</p>
                          <p className="text-lg text-muted-foreground">Demanda, Informação, Matéria-prima, Insumos.</p>
                        </div>
                        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center flex flex-col justify-center">
                          <p className="font-bold text-blue-700">ATIVIDADES</p>
                          <p className="text-[10px] text-blue-600 uppercase tracking-widest font-bold">Processamento</p>
                        </div>
                        <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl text-center">
                          <p className="font-bold text-blue-600 mb-1">Saídas (Outputs)</p>
                          <p className="text-lg text-muted-foreground">Valor agredado, Produto final, Serviço prestado.</p>
                        </div>
                      </div>

                      <div className="bg-slate-900/5 p-4 rounded-xl border border-slate-900/10 space-y-3">
                        <p className="font-bold text-slate-800 flex items-center gap-2">
                          <LuCheck className="text-blue-600" /> Atributos Críticos:
                        </p>
                        <ul className="grid grid-cols-2 gap-2 text-lg">
                          <li className="flex items-center gap-2">🔹 <strong>Repetitividade:</strong> Ocorre ciclicamente.</li>
                          <li className="flex items-center gap-2">🔹 <strong>Previsibilidade:</strong> Resultado esperado.</li>
                          <li className="flex items-center gap-2">🔹 <strong>Mecanismo:</strong> Como é feito.</li>
                          <li className="flex items-center gap-2">🔹 <strong>Controle:</strong> Restrições e regras.</li>
                        </ul>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Processos Petrobras",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-muted-foreground">Analise como a Petrobras organiza sua cadeia de valor:</p>
                      
                      <div className="space-y-4">
                        <div className="flex gap-4 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-600">
                          <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold">1</div>
                          <div>
                            <p className="font-bold text-blue-900">Processos Primários (Core)</p>
                            <p className="text-lg text-blue-700 mb-2">Aqueles que realizam a missão da empresa e tocam o cliente.</p>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-2 py-1 bg-white border border-blue-200 rounded text-[10px] font-bold">Exploração</span>
                              <span className="px-2 py-1 bg-white border border-blue-200 rounded text-[10px] font-bold">Refino</span>
                              <span className="px-2 py-1 bg-white border border-blue-200 rounded text-[10px] font-bold">Venda</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-4 p-4 bg-slate-50 rounded-xl border-l-4 border-slate-400">
                          <div className="bg-slate-400 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold">2</div>
                          <div>
                            <p className="font-bold text-slate-800">Processos de Suporte (Apoio)</p>
                            <p className="text-lg text-slate-600 mb-2">Garantem que os processos primários funcionem.</p>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold">RH</span>
                              <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold">TI</span>
                              <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold">Jurídico</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-4 p-4 bg-cyan-50 rounded-xl border-l-4 border-cyan-600">
                          <div className="bg-cyan-600 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold">3</div>
                          <div>
                            <p className="font-bold text-cyan-900">Processos Gerenciais (Gestão)</p>
                            <p className="text-lg text-cyan-700 mb-2">Monitoram e direcionam a organização.</p>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-2 py-1 bg-white border border-cyan-200 rounded text-[10px] font-bold">Compliance</span>
                              <span className="px-2 py-1 bg-white border border-cyan-200 rounded text-[10px] font-bold">Estratégia</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Hierarquia e Níveis",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-muted-foreground">Não confunda macroprocesso com tarefa! Use a escada da complexidade:</p>
                      
                      <div className="relative p-6 bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-tighter">Foco em Prova</div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="text-blue-600 font-bold">Nível 1</div>
                            <div className="flex-1 h-2 bg-blue-200 rounded-full"><div className="w-1/5 h-full bg-blue-600 rounded-full" /></div>
                            <div className="text-lg font-bold text-slate-700">MACROPROCESSO</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-blue-600 font-bold">Nível 2</div>
                            <div className="flex-1 h-2 bg-blue-200 rounded-full"><div className="w-2/5 h-full bg-blue-600 rounded-full" /></div>
                            <div className="text-lg font-bold text-slate-700">PROCESSO</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-blue-600 font-bold">Nível 3</div>
                            <div className="flex-1 h-2 bg-blue-200 rounded-full"><div className="w-3/5 h-full bg-blue-600 rounded-full" /></div>
                            <div className="text-lg font-bold text-slate-700">SUBPROCESSO</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-blue-600 font-bold">Nível 4</div>
                            <div className="flex-1 h-2 bg-blue-200 rounded-full"><div className="w-4/5 h-full bg-blue-600 rounded-full" /></div>
                            <div className="text-lg font-bold text-slate-700">ATIVIDADE</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-blue-600 font-bold">Nível 5</div>
                            <div className="flex-1 h-2 bg-blue-200 rounded-full"><div className="w-5/5 h-full bg-blue-600 rounded-full" /></div>
                            <div className="text-lg font-bold text-slate-700">TAREFA</div>
                          </div>
                        </div>
                      </div>

                      <AlertBox tipo="info" titulo="Macete de Memorização">
                        <p className="text-lg">Imagine uma boneca russa (Matrioska): O <strong>Macroprocesso</strong> é a maior, a <strong>Tarefa</strong> é a menorzinha lá dentro.</p>
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Processos vs. Projetos",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                          <p className="font-bold text-green-700 mb-2 flex items-center gap-2"><LuRepeat /> Processos</p>
                          <ul className="text-lg space-y-1 text-green-800">
                            <li>• Permanentes / Contínuos</li>
                            <li>• Geram produtos repetitivos</li>
                            <li>• Foco em eficiência (baixa incerteza)</li>
                            <li>• Sustentam o negócio (Operação)</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                          <p className="font-bold text-orange-700 mb-2 flex items-center gap-2"><LuZap /> Projetos</p>
                          <ul className="text-lg space-y-1 text-orange-800">
                            <li>• Temporários (Início e Fim)</li>
                            <li>• Geram resultados únicos</li>
                            <li>• Foco em eficácia (alta incerteza)</li>
                            <li>• Mudam o negócio (Inovação)</li>
                          </ul>
                        </div>
                      </div>

                      <AlertBox tipo="warning" titulo="Destaque Estratégico!">
                        <p className="text-lg">Se a questão falar que algo "tem fim determinado", mate na hora: é <strong>Projeto</strong>. Se falar em "rotina" ou "dia a dia", é <strong>Processo</strong>.</p>
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-1" className="mt-16">
          











<ModuleConsolidation moduloNumero={1}
            index={1}
            variant={mv[1]}
            resumoVisual={{
              moduloNome: "Módulo 1",
              tituloAula: "Gestão de Processos",
              materia: "Administração",
              images: [
                { title: "Input-Process-Output", type: "Esquema Central", placeholderColor: "bg-blue-500/20" },
                { title: "Cadeia de Valor Petrobras", type: "Exemplificação", placeholderColor: "bg-sky-500/20" },
                { title: "Processo vs Projeto", type: "Comparativo", placeholderColor: "bg-cyan-500/20" },
              ],
            }}
            sinteseEstrategica={{
              title: "O Princípio do Processo",
              content: (
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-slate-900 text-white rounded-xl font-mono text-lg">
                    <p className="text-blue-400"># Definição Premium</p>
                    <p>Processo = <span className="text-amber-400">Input</span> + <span className="text-emerald-400">Atividade</span> + <span className="text-rose-400">Output</span> + <span className="text-cyan-400">Valor</span></p>
                  </div>
                  <div className="flex gap-2 text-[10px] font-bold uppercase overflow-x-auto pb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded whitespace-nowrap">Repetitivo</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded whitespace-nowrap">Estruturado</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded whitespace-nowrap">Transversal</span>
                  </div>
                </div>
              ),
            }}
            podcast={{
            aulaId: "gestaoprocessos",
            aulaTitulo: "Gestao Processos",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 1,
            moduloTitulo: "Módulo 1",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
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
          enunciado="Na gestão de processos, como se define um 'processo de negócio'?"
          alternativas={[
            { letra: "A", texto: "Conjunto de tarefas isoladas sem relação entre si", correta: false },
                { letra: "B", texto: "Sequência de atividades inter-relacionadas que transformam entradas em saídas de valor", correta: true },
                { letra: "C", texto: "Apenas atividades operacionais de baixo nível", correta: false },
                { letra: "D", texto: "Um documento técnico obrigatório", correta: false },
                { letra: "E", texto: "Sinônimo de procedimento administrativo", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Um processo de negócio é um conjunto de atividades estruturadas, ordenadas no tempo e no espaço, que convergem para criar um resultado de valor (produto ou serviço) para um cliente específico." },
            { titulo: "Passo 2", conteudo: "Cada atividade adiciona valor ao processo." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
              questoes={quizM1}
              titulo="QUIZ: Módulo Nº 1"
              numero={3}
              variant={mv[1]}
              icone="🧠"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>
      )}

      {/* ═══ MÓDULO 2: BPM ═══ */}
      {activeTab === "modulo-2" && (
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner 
            numero={2} 
            titulo="BPM - Business Process Management" 
            descricao="A disciplina gerencial que une métodos, ferramentas e tecnologia para maximizar desempenho." 
            gradiente="bg-gradient-to-br from-blue-300 via-blue-500 to-blue-400" 
          />
          
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader 
              index="INTRO" 
              title="A Filosofia e o Ciclo de Vida" 
              description="Do planejamento estratégico ao refinamento contínuo (Baseado no CBOK)." 
              variant={mv[2]} 
            />
            
            <ContentAccordion slides={[
              { 
                titulo: "Conceituação - O que é BPM?", 
                icone: <LuBrain />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      <strong>BPM</strong> não é um software, nem um projeto único. É uma <strong>disciplina gerencial</strong> contínua. Segundo o CBOK (corpo de conhecimento mundial), o foco é transformar a visão funcional (departamentos) em visão por processos (horizontal).
                    </p>
                    
                    <div className="bg-emerald-500/10 p-5 rounded-2xl border border-emerald-500/20">
                      <p className="font-bold text-emerald-800 mb-4 flex items-center gap-2">
                        <LuWorkflow /> O Ciclo de Vida BPM (Padronizado):
                      </p>
                      <div className="space-y-3">
                        {[
                          { etapa: "1. Planejamento", desc: "Alinhamento com a estratégia da Petrobras." },
                          { etapa: "2. Análise", desc: "Entender a realidade atual (Pé no chão)." },
                          { etapa: "3. Desenho", desc: "Projetar a melhoria teórica." },
                          { etapa: "4. Implementação", desc: "Colocar em prática (Tecnologia + Pessoas)." },
                          { etapa: "5. Monitoramento", desc: "Acompanhar KPIs em tempo real." },
                          { etapa: "6. Refinamento", desc: "Ajustar e melhorar (Não para nunca)." },
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i+1}</span>
                            <div className="text-lg">
                              <span className="font-bold text-emerald-900">{item.etapa}:</span>{" "}
                              <span className="text-emerald-700">{item.desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Exemplificação - Evolução da Maturidade", 
                icone: <LuBookOpen />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground">Como as empresas evoluem na Gestão de Processos:</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                      {[
                        { nível: "Inicial", cor: "bg-slate-100", texto: "Caótico, sem padrões." },
                        { nível: "Definido", cor: "bg-emerald-50", texto: "Documentado em papel." },
                        { nível: "Gerido", cor: "bg-emerald-100", texto: "Monitorado por KPIs." },
                        { nível: "Otimizado", cor: "bg-emerald-200", texto: "Melhoria automática." },
                      ].map((n, i) => (
                        <div key={i} className={`p-4 rounded-xl border border-black/5 ${n.cor} text-center`}>
                          <p className="font-bold text-[10px] uppercase text-slate-500">Nível {i+1}</p>
                          <p className="font-bold text-emerald-900 text-lg">{n.nível}</p>
                          <p className="text-[10px] text-slate-600 mt-1">{n.texto}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-4 bg-emerald-600 text-white rounded-xl text-center space-y-1">
                      <p className="font-bold">O Caso Petrobras</p>
                      <p className="text-lg opacity-90 italic">Redução de burocracia no refino através da integração AS-IS e TO-BE.</p>
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Dicas - Pilares da Gestão de Processos", 
                icone: <LuLightbulb />, 
                conteudo: (
                  <div className="space-y-6">
                    <div className="relative p-6 bg-slate-900 text-white rounded-2xl overflow-hidden border-4 border-emerald-500">
                      <p className="text-emerald-400 font-bold mb-4 uppercase tracking-widest text-lg">Os 3 Ps do Sucesso</p>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <LuFileText className="text-2xl text-emerald-300" />
                          <div>
                            <p className="font-bold leading-none">PROCESSOS</p>
                            <p className="text-[10px] text-slate-400">O método e o fluxo lógico.</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <LuBrain className="text-2xl text-emerald-300" />
                          <div>
                            <p className="font-bold leading-none">PESSOAS</p>
                            <p className="text-[10px] text-slate-400">A cultura e o treinamento.</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <LuZap className="text-2xl text-emerald-300" />
                          <div>
                            <p className="font-bold leading-none">PLATAFORMAS</p>
                            <p className="text-[10px] text-slate-400">A tecnologia e o software (BPMS).</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Exceções - Quando BPM falha?", 
                icone: <LuTrophy />, 
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">BPM não é "bala de prata". Veja onde ele não se aplica bem:</p>
                    <ul className="space-y-2 text-lg">
                      <li className="flex gap-2">❌ <strong>Processos Ad-Hoc:</strong> Atividades que mudam completamente toda vez (ex: criação artística pura).</li>
                      <li className="flex gap-2">❌ <strong>Foco apenas em TI:</strong> Implementar o software sem mudar a cultura das pessoas.</li>
                      <li className="flex gap-2">❌ <strong>Paralisia por Análise:</strong> Mapear até o infinito e nunca implementar a melhoria.</li>
                    </ul>
                    <AlertBox tipo="warning" titulo="Termo Técnico: Paralisia por Análise">
                      <p className="text-lg">É o erro de gastar meses no AS-IS enquanto a organização perde dinheiro. A CESGRANRIO gosta de situações-problema sobre isso.</p>
                    </AlertBox>
                  </div>
                ) 
              },
            ]} />
          </section>


          
          <section id="quiz-modulo-2" className="mt-16">
          











<ModuleConsolidation moduloNumero={2} 
            index={2} 
            variant={mv[2]} 
            resumoVisual={{ 
              moduloNome: "Módulo 2", 
              tituloAula: "Gestão de Processos", 
              materia: "Administração", 
              images: [
                { title: "Ciclo PDCA vs Ciclo BPM", type: "Analogia", placeholderColor: "bg-emerald-500/20" }, 
                { title: "Funções vs Processos", type: "Mudança Mental", placeholderColor: "bg-teal-500/20" }, 
                { title: "O Papel do Process Owner", type: "Responsabilidade", placeholderColor: "bg-green-500/20" }
              ] 
            }} 
            sinteseEstrategica={{ 
              title: "O Princípio do Gestor de Processos", 
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-lg italic">"Medir para entender, gerir para controlar, otimizar para evoluir."</p>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
                    <div className="bg-emerald-100 text-emerald-800 p-2 rounded">EFICIÊNCIA: "Fazer certo"</div>
                    <div className="bg-blue-100 text-blue-800 p-2 rounded">EFICÁCIA: "Fazer o certo"</div>
                  </div>
                </div>
              ) 
            }} 
            podcast={{
            aulaId: "gestaoprocessos",
            aulaTitulo: "Gestao Processos",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 2,
            moduloTitulo: "Módulo 2",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
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
          enunciado="Na gestão de processos, como se define um 'processo de negócio'?"
          alternativas={[
            { letra: "A", texto: "Conjunto de tarefas isoladas sem relação entre si", correta: false },
                { letra: "B", texto: "Sequência de atividades inter-relacionadas que transformam entradas em saídas de valor", correta: true },
                { letra: "C", texto: "Apenas atividades operacionais de baixo nível", correta: false },
                { letra: "D", texto: "Um documento técnico obrigatório", correta: false },
                { letra: "E", texto: "Sinônimo de procedimento administrativo", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Um processo de negócio é um conjunto de atividades estruturadas, ordenadas no tempo e no espaço, que convergem para criar um resultado de valor (produto ou serviço) para um cliente específico." },
            { titulo: "Passo 2", conteudo: "Cada atividade adiciona valor ao processo." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo 
              questoes={quizM2} 
              titulo="QUIZ: Módulo Nº 2" 
              numero={3} 
              variant={mv[2]} 
              icone="🎯" 
              onComplete={(score) => handleModuleComplete("modulo-2", score)} 
            />
          </section>
        </div>
      </TabsContent>
      )}

      {/* ═══ MÓDULO 3: MODELAGEM BPMN ═══ */}
      {activeTab === "modulo-3" && (
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner 
            numero={3} 
            titulo="Modelagem com BPMN 2.0" 
            descricao="A linguagem universal para que humanos e máquinas entendam o fluxo de trabalho." 
            gradiente="bg-gradient-to-br from-emerald-300 via-emerald-500 to-emerald-400" 
          />
          
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader 
              index="INTRO" 
              title="Gramática do Processo" 
              description="Alfabeto visual: Eventos, Atividades, Gateways e Artefatos." 
              variant={mv[3]} 
            />
            
            <ContentAccordion slides={[
              { 
                titulo: "Conceituação - O Alfabeto BPMN", 
                icone: <LuBrain />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      Lembre-se: <strong>BPMN</strong> é para o processo o que a partitura é para a música. Todos os envolvidos devem ler e entender a mesma melodia operacional.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
                        <p className="font-bold text-amber-700 text-lg flex items-center gap-2">⭕ Eventos (Ondas de Impacto)</p>
                        <ul className="text-lg space-y-2">
                          <li className="flex items-center gap-2"><span className="w-4 h-4 rounded-full border border-slate-400" /> <strong>Início:</strong> Borda fina.</li>
                          <li className="flex items-center gap-2"><span className="w-4 h-4 rounded-full border-2 border-double border-slate-400" /> <strong>Intermediário:</strong> Borda dupla.</li>
                          <li className="flex items-center gap-2"><span className="w-4 h-4 rounded-full border-2 border-slate-600 bg-slate-100" /> <strong>Fim:</strong> Borda grossa.</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 text-lg">
                        <p className="font-bold text-amber-700 text-lg flex items-center gap-2">Rect: Atividades (Ação)</p>
                        <ul className="text-lg space-y-2">
                          <li>🟦 <strong>Tarefa:</strong> Unidade atômica (não divídível).</li>
                          <li>🟦 [+] <strong>Subprocesso:</strong> Atividade complexa detalhada em outro diagrama.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Exemplificação - Gateways (O Coração da Lógica)", 
                icone: <LuBookOpen />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground">O losango indica onde o processo "escolhe" um caminho:</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                        <div className="w-10 h-10 bg-white border-2 border-amber-500 rotate-45 flex items-center justify-center shrink-0">
                          <span className="-rotate-45 font-bold text-amber-700">X</span>
                        </div>
                        <div>
                          <p className="font-bold text-amber-800 text-lg">Exclusivo (XOR)</p>
                          <p className="text-[10px] text-amber-700">Apenas UM caminho será seguido. <span className="italic">"Ou café ou chá".</span></p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                        <div className="w-10 h-10 bg-white border-2 border-amber-500 rotate-45 flex items-center justify-center shrink-0">
                          <span className="-rotate-45 font-bold text-amber-700">+</span>
                        </div>
                        <div>
                          <p className="font-bold text-amber-800 text-lg">Paralelo (AND)</p>
                          <p className="text-[10px] text-amber-700">TODOS os caminhos ocorrem ao mesmo tempo. <span className="italic">"Pague e retire".</span></p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                        <div className="w-10 h-10 bg-white border-2 border-amber-500 rotate-45 flex items-center justify-center shrink-0">
                          <span className="-rotate-45 font-bold text-amber-700">O</span>
                        </div>
                        <div>
                          <p className="font-bold text-amber-800 text-lg">Inclusivo (OR)</p>
                          <p className="text-[10px] text-amber-700">UM ou MAIS caminhos dependendo das condições.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Dicas - Piscinas (Pools) e Raias (Lanes)", 
                icone: <LuLightbulb />, 
                conteudo: (
                  <div className="space-y-4">
                    <div className="p-5 bg-slate-900 text-white rounded-2xl relative">
                      <div className="absolute top-4 right-4 text-amber-400"><LuLayoutDashboard className="text-2xl" /></div>
                      <p className="font-bold mb-3">Geografia do Processo:</p>
                      <div className="space-y-3 text-lg">
                        <div className="border border-slate-700 p-3 rounded-lg">
                          <p className="text-amber-400 font-bold uppercase text-[10px] tracking-widest">Piscina (Pool)</p>
                          <p className="text-lg">Representa o Participante (ex: Petrobras, Cliente, Banco).</p>
                        </div>
                        <div className="border border-slate-700 p-3 rounded-lg ml-4">
                          <p className="text-blue-400 font-bold uppercase text-[10px] tracking-widest">Raia (Lane)</p>
                          <p className="text-lg">Subdivide o Pool por cargo ou área (ex: RH, Financeiro).</p>
                        </div>
                      </div>
                    </div>
                    <AlertBox tipo="success" titulo="Regra de Ouro!">
                      <p className="text-lg">Fluxos de SEQUÊNCIA (setas cheias) nunca cruzam as bordas de um Pool. Para falar com outro Pool, use Fluxo de MENSAGEM (setas tracejadas).</p>
                    </AlertBox>
                  </div>
                ) 
              },
              { 
                titulo: "Exceções - Atividades e Marcadores", 
                icone: <LuTrophy />, 
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">Existem tarefas especiais que caem muito em provas:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-3 bg-slate-100 rounded-lg border border-slate-200">
                        <p className="font-bold text-cyan-700 text-[10px] uppercase">Tarefa de Usuário 👤</p>
                        <p className="text-[10px]">Humano realizando via sistema.</p>
                      </div>
                      <div className="p-3 bg-slate-100 rounded-lg border border-slate-200">
                        <p className="font-bold text-cyan-700 text-[10px] uppercase">Tarefa de Serviço ⚙️</p>
                        <p className="text-[10px]">Automação pura, sem intervenção.</p>
                      </div>
                    </div>
                    <AlertBox tipo="info" titulo="Subprocesso em Loop">
                      <p className="text-lg">Representado por uma espiral no fundo do retângulo. Indica que a atividade se repete até que uma condição seja atingida.</p>
                    </AlertBox>
                  </div>
                ) 
              },
            ]} />
          </section>


          
          <section id="quiz-modulo-3" className="mt-16">
          











<ModuleConsolidation moduloNumero={3} 
            index={3} 
            variant={mv[3]} 
            resumoVisual={{ 
              moduloNome: "Módulo 3", 
              tituloAula: "Gestão de Processos", 
              materia: "Administração", 
              images: [
                { title: "Léxico Visual BPMN", type: "Tabela Técnica", placeholderColor: "bg-amber-500/20" }, 
                { title: "Arquitetura de Gateways", type: "Diagrama Lógico", placeholderColor: "bg-orange-500/20" }, 
                { title: "Pools e Colaboração", type: "Fluxograma", placeholderColor: "bg-yellow-500/20" }
              ] 
            }} 
            sinteseEstrategica={{ 
              title: "Alfabeto Rápido", 
              content: (
                <div className="space-y-3 text-left">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center"><span className="w-8 h-8 rounded-full border-2 border-slate-400 bg-white" /> <span className="text-lg">Borda fina = Começou!</span></div>
                    <div className="flex gap-2 items-center"><span className="w-8 h-8 rounded-full border-2 border-double border-slate-400 bg-white" /> <span className="text-lg">Borda dupla = Esperou!</span></div>
                    <div className="flex gap-2 items-center"><span className="w-8 h-8 rounded-full border-4 border-slate-600 bg-slate-200" /> <span className="text-lg">Borda grossa = Acabou!</span></div>
                  </div>
                </div>
              ) 
            }} 
            podcast={{
            aulaId: "gestaoprocessos",
            aulaTitulo: "Gestao Processos",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 3,
            moduloTitulo: "Módulo 3",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
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
          enunciado="Na gestão de processos, como se define um 'processo de negócio'?"
          alternativas={[
            { letra: "A", texto: "Conjunto de tarefas isoladas sem relação entre si", correta: false },
                { letra: "B", texto: "Sequência de atividades inter-relacionadas que transformam entradas em saídas de valor", correta: true },
                { letra: "C", texto: "Apenas atividades operacionais de baixo nível", correta: false },
                { letra: "D", texto: "Um documento técnico obrigatório", correta: false },
                { letra: "E", texto: "Sinônimo de procedimento administrativo", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Um processo de negócio é um conjunto de atividades estruturadas, ordenadas no tempo e no espaço, que convergem para criar um resultado de valor (produto ou serviço) para um cliente específico." },
            { titulo: "Passo 2", conteudo: "Cada atividade adiciona valor ao processo." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo 
              questoes={quizM3} 
              titulo="QUIZ: Módulo Nº 3" 
              numero={3} 
              variant={mv[3]} 
              icone="📊" 
              onComplete={(score) => handleModuleComplete("modulo-3", score)} 
            />
          </section>
        </div>
      </TabsContent>
      )}

      {/* ═══ MÓDULO 4: MAPEAMENTO AS-IS E TO-BE ═══ */}
      {activeTab === "modulo-4" && (
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner 
            numero={4} 
            titulo="Mapeamento e Diagnóstico" 
            descricao="Ouvir a operação, identificar gargalos e desenhar o futuro da eficiência." 
            gradiente="bg-gradient-to-br from-rose-300 via-rose-500 to-rose-400" 
          />
          
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader 
              index="INTRO" 
              title="AS-IS e TO-BE: A Ponte para a Melhoria" 
              description="Não se melhora o que não se entende. O mapeamento é a fotografia da realidade." 
              variant={mv[4]} 
            />
            
            <ContentAccordion slides={[
              { 
                titulo: "Conceituação - O que é AS-IS e TO-BE?", 
                icone: <LuBrain />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      Imagine que você quer otimizar a logística de suprimentos da Petrobras. Antes de comprar um novo software, você precisa saber como as coisas funcionam hoje.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-5 bg-rose-50 border border-rose-200 rounded-2xl">
                        <p className="font-bold text-rose-800 flex items-center gap-2 mb-2">🔍 AS-IS (Como é)</p>
                        <p className="text-lg text-rose-700">A visão nua e crua da realidade. Identifica gargalos, redundâncias e atividades que não agregam valor. É o diagnóstico.</p>
                      </div>
                      <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl">
                        <p className="font-bold text-emerald-800 flex items-center gap-2 mb-2">🚀 TO-BE (Como será)</p>
                        <p className="text-lg text-emerald-700">O desenho do processo otimizado. Aplica melhorias, automação e novos padrões. É o objetivo final.</p>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <p className="text-lg font-bold text-slate-800 mb-2">Técnicas de Coleta de Dados:</p>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2 text-[10px] bg-white p-2 rounded border border-slate-100 italic">"Entrevistas individuais"</div>
                        <div className="flex items-center gap-2 text-[10px] bg-white p-2 rounded border border-slate-100 italic">"Questionários (Surveys)"</div>
                        <div className="flex items-center gap-2 text-[10px] bg-white p-2 rounded border border-slate-100 italic">"Observação Direta (Job Shadowing)"</div>
                        <div className="flex items-center gap-2 text-[10px] bg-white p-2 rounded border border-slate-100 italic">"JAD (Joint Application Design)"</div>
                      </div>
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Exemplificação - Mapeamento na Refinaria", 
                icone: <LuBookOpen />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground">Caso real de otimização de manutenção preventiva:</p>
                    
                    <div className="border-l-4 border-rose-500 pl-4 py-2 space-y-4">
                      <div>
                        <p className="font-bold text-rose-900 text-lg">Cenário AS-IS:</p>
                        <ul className="text-lg text-rose-700 list-disc ml-4 mt-1">
                          <li>Solicitação via formulário de papel (demora 2 dias).</li>
                          <li>Aprovação manual de 3 gerentes diferentes.</li>
                          <li>Estoque não é verificado antes da ordem de serviço.</li>
                        </ul>
                      </div>
                      
                      <div className="flex justify-center py-2">
                        <LuArrowDown className="text-2xl text-slate-400" />
                      </div>

                      <div>
                        <p className="font-bold text-emerald-900 text-lg">Cenário TO-BE:</p>
                        <ul className="text-lg text-emerald-700 list-disc ml-4 mt-1">
                          <li>Abertura via App mobile (imediato).</li>
                          <li>Aprovação automática baseada em níveis de risco.</li>
                          <li>Reserva automática de peças no almoxarifado via IoT.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Dicas - Erros Fatais no Mapeamento", 
                icone: <LuLightbulb />, 
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">Evite o que a CESGRANRIO gosta de cobrar:</p>
                    <div className="bg-amber-900 p-6 rounded-2xl text-amber-100 border-2 border-amber-600 shadow-lg">
                      <p className="font-bold mb-4 uppercase text-lg tracking-tighter">Checklist de Sobrevivência</p>
                      <div className="space-y-3">
                        <div className="flex gap-3">
                          <LuCheck className="shrink-0 text-amber-400" />
                          <p className="text-lg"><strong>Mapear o "Deveria Ser":</strong> No AS-IS, mapeie o erro, não o manual de procedimentos.</p>
                        </div>
                        <div className="flex gap-3">
                          <LuCheck className="shrink-0 text-amber-400" />
                          <p className="text-lg"><strong>Esquecer o Cliente:</strong> O processo deve agregar valor para quem recebe o output (interno ou externo).</p>
                        </div>
                        <div className="flex gap-3">
                          <LuCheck className="shrink-0 text-amber-400" />
                          <p className="text-lg"><strong>Documentação Viciada:</strong> Usar termos técnicos que só a TI entende ignora o negócio.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Exceções - Quando NÃO mapear?", 
                icone: <LuTrophy />, 
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground text-lg">Existem situações onde o mapeamento detalhado é desperdício:</p>
                    <ul className="space-y-3">
                      <li className="p-3 bg-slate-100 rounded-lg flex items-center gap-3">
                        <span className="text-xl">🏃</span>
                        <p className="text-[10px] font-bold text-slate-700 uppercase">Processos em Crise Aguda:</p>
                        <p className="text-[10px] text-slate-500 italic">"Se o prédio está pegando fogo, você não mapeia a saída, você sai."</p>
                      </li>
                      <li className="p-3 bg-slate-100 rounded-lg flex items-center gap-3">
                        <span className="text-xl">🛠️</span>
                        <p className="text-[10px] font-bold text-slate-700 uppercase">Ações Rápidas (Quick Wins):</p>
                        <p className="text-[10px] text-slate-500 italic">"Se a solução é óbvia e barata, implemente direto."</p>
                      </li>
                    </ul>
                    <AlertBox tipo="warning" titulo="pontos de atenção de Prova">
                      <p className="text-lg">A CESGRANRIO pode perguntar se o TO-BE deve ser feito ANTES do AS-IS. <strong>Nunca!</strong> Sem saber onde você está (AS-IS), você não traça a rota para onde quer ir.</p>
                    </AlertBox>
                  </div>
                ) 
              },
            ]} />
          </section>


          
          <section id="quiz-modulo-4" className="mt-16">
          











<ModuleConsolidation moduloNumero={4} 
            index={4} 
            variant={mv[4]} 
            resumoVisual={{ 
              moduloNome: "Módulo 4", 
              tituloAula: "Gestão de Processos", 
              materia: "Administração", 
              images: [
                { title: "Dashboard de Lacunas", type: "Análise", placeholderColor: "bg-rose-500/20" }, 
                { title: "Fluxo de Valor", type: "Design", placeholderColor: "bg-pink-500/20" }, 
                { title: "Quick Wins", type: "Estratégia", placeholderColor: "bg-red-500/20" }
              ] 
            }} 
            sinteseEstrategica={{ 
              title: "Destaque Estratégico", 
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-lg font-bold text-rose-800">Gap Analysis:</p>
                  <p className="text-[10px] leading-snug italic text-rose-700">"GAP = (Onde queremos estar) - (Onde estamos hoje). A distância é o seu plano de projeto!"</p>
                </div>
              ) 
            }} 
            podcast={{
            aulaId: "gestaoprocessos",
            aulaTitulo: "Gestao Processos",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 4,
            moduloTitulo: "Módulo 4",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
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
          enunciado="Na gestão de processos, como se define um 'processo de negócio'?"
          alternativas={[
            { letra: "A", texto: "Conjunto de tarefas isoladas sem relação entre si", correta: false },
                { letra: "B", texto: "Sequência de atividades inter-relacionadas que transformam entradas em saídas de valor", correta: true },
                { letra: "C", texto: "Apenas atividades operacionais de baixo nível", correta: false },
                { letra: "D", texto: "Um documento técnico obrigatório", correta: false },
                { letra: "E", texto: "Sinônimo de procedimento administrativo", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Um processo de negócio é um conjunto de atividades estruturadas, ordenadas no tempo e no espaço, que convergem para criar um resultado de valor (produto ou serviço) para um cliente específico." },
            { titulo: "Passo 2", conteudo: "Cada atividade adiciona valor ao processo." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo 
              questoes={quizM4} 
              titulo="QUIZ: Módulo Nº 4" 
              numero={3} 
              variant={mv[4]} 
              icone="🎯" 
              onComplete={(score) => handleModuleComplete("modulo-4", score)} 
            />
          </section>
        </div>
      </TabsContent>
      )}

      {/* ═══ MÓDULO 5: MELHORIA CONTÍNUA ═══ */}
      {activeTab === "modulo-5" && (
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner 
            numero={5} 
            titulo="Melhoria Contínua e PDCA" 
            descricao="A arte de nunca estar satisfeito com o 'bom o suficiente'. Evolução constante." 
            gradiente="bg-gradient-to-br from-emerald-300 via-emerald-500 to-emerald-400" 
          />
          
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader 
              index="INTRO" 
              title="Filosofias de Otimização" 
              description="Do Ciclo de Deming ao rigor estatístico do Six Sigma." 
              variant={mv[5]} 
            />
            
            <ContentAccordion slides={[
              { 
                titulo: "Conceituação - O Ciclo PDCA", 
                icone: <LuBrain />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      O <strong>PDCA</strong> (Plan-Do-Check-Act) é a espinha dorsal de qualquer sistema de gestão moderna. Na Petrobras, ele é usado para garantir que as metas de segurança e produção sejam batidas sistematicamente.
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="p-4 bg-emerald-100 border border-emerald-200 rounded-xl text-center">
                        <p className="font-black text-emerald-800 text-xl">P</p>
                        <p className="font-bold text-[10px] text-emerald-700">PLAN</p>
                        <p className="text-[8px] text-emerald-600">Metas e Métodos</p>
                      </div>
                      <div className="p-4 bg-emerald-100 border border-emerald-200 rounded-xl text-center">
                        <p className="font-black text-emerald-800 text-xl">D</p>
                        <p className="font-bold text-[10px] text-emerald-700">DO</p>
                        <p className="text-[8px] text-emerald-600">Execução e Treino</p>
                      </div>
                      <div className="p-4 bg-emerald-100 border border-emerald-200 rounded-xl text-center">
                        <p className="font-black text-emerald-800 text-xl">C</p>
                        <p className="font-bold text-[10px] text-emerald-700">CHECK</p>
                        <p className="text-[8px] text-emerald-600">Verificação</p>
                      </div>
                      <div className="p-4 bg-emerald-100 border border-emerald-200 rounded-xl text-center">
                        <p className="font-black text-emerald-800 text-xl">A</p>
                        <p className="font-bold text-[10px] text-emerald-700">ACT</p>
                        <p className="text-[8px] text-emerald-600">Ação Corretiva</p>
                      </div>
                    </div>

                    <AlertBox tipo="info" titulo="O 'A' é o mais importante!">
                      <p className="text-lg">Muitas empresas param no 'C' (descobrem o erro mas não agem). A Melhoria Contínua só ocorre quando o ciclo recomeça a partir de uma nova base (Standard).</p>
                    </AlertBox>
                  </div>
                ) 
              },
              { 
                titulo: "Exemplificação - Lean e Six Sigma", 
                icone: <LuBookOpen />, 
                conteudo: (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-slate-900 text-white p-5 rounded-2xl border-l-8 border-orange-500">
                        <p className="font-bold text-orange-400 mb-2 flex items-center gap-2">🚜 Lean (Manufatura Enxuta)</p>
                        <p className="text-[10px] text-slate-300">Foco em <strong>Eliminar Desperdícios</strong> (Tempo, Estoque, Movimentação). "Fazer mais com menos".</p>
                      </div>
                      <div className="bg-slate-900 text-white p-5 rounded-2xl border-l-8 border-blue-500">
                        <p className="font-bold text-blue-400 mb-2 flex items-center gap-2">📊 Six Sigma (6σ)</p>
                        <p className="text-[10px] text-slate-300">Foco em <strong>Reduzir Variabilidade</strong> e defeitos. Usa o método DMAIC (Define, Measure, Analyze, Improve, Control).</p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 italic text-[10px] text-emerald-800 text-center">
                      "Lean remove a gordura; Six Sigma remove a doença (erros)."
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Dicas - Os 7 Desperdícios do Lean", 
                icone: <LuLightbulb />, 
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground text-lg font-bold uppercase">Mnemônico: TIM WOODS</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {[
                        { k: "T", v: "Transporte" },
                        { k: "I", v: "Inventário" },
                        { k: "M", v: "Movimentação" },
                        { k: "W", v: "Espera (Waiting)" },
                        { k: "O", v: "Superprocessamento" },
                        { k: "O", v: "Superprodução" },
                        { k: "D", v: "Defeitos" },
                        { k: "S", v: "Skills (Talento)" },
                      ].map((d, i) => (
                        <div key={i} className="bg-white border border-slate-200 p-2 rounded-lg text-center">
                          <p className="font-black text-rose-600">{d.k}</p>
                          <p className="text-[8px] font-bold uppercase">{d.v}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Exceções - Inovação vs Melhoria", 
                icone: <LuTrophy />, 
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">Não confunda Melhoria Incremental com Inovação Disruptiva:</p>
                    <table className="w-full text-lg">
                      <thead>
                        <tr className="bg-slate-100 text-slate-700">
                          <th className="p-2 border border-slate-200 text-left">Característica</th>
                          <th className="p-2 border border-slate-200 text-left underline">Kaizen (Incremental)</th>
                          <th className="p-2 border border-slate-200 text-left italic">Kaikaku (Disruptivo)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2 border border-slate-200 font-bold">Risco</td>
                          <td className="p-2 border border-slate-200">Baixo</td>
                          <td className="p-2 border border-slate-200">Alto</td>
                        </tr>
                        <tr>
                          <td className="p-2 border border-slate-200 font-bold">Investimento</td>
                          <td className="p-2 border border-slate-200">Baixo</td>
                          <td className="p-2 border border-slate-200">Elevado</td>
                        </tr>
                        <tr>
                          <td className="p-2 border border-slate-200 font-bold">Mudança</td>
                          <td className="p-2 border border-slate-200">Constante/Lenta</td>
                          <td className="p-2 border border-slate-200">Radical/Rápida</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) 
              },
            ]} />
          </section>


          
          <section id="quiz-modulo-5" className="mt-16">
          











<ModuleConsolidation moduloNumero={5} 
            index={5} 
            variant={mv[5]} 
            resumoVisual={{ 
              moduloNome: "Módulo 5", 
              tituloAula: "Gestão de Processos", 
              materia: "Administração", 
              images: [
                { title: "Funil do PDCA", type: "Processo", placeholderColor: "bg-emerald-500/20" }, 
                { title: "Os 5 porquês", type: "Técnica", placeholderColor: "bg-amber-500/20" }, 
                { title: "Cinto Negro (Black Belt)", type: "Hierarquia", placeholderColor: "bg-cyan-500/20" }
              ] 
            }} 
            sinteseEstrategica={{ 
              title: "5S: A Base da Melhoria", 
              content: (
                <div className="grid grid-cols-5 gap-1 text-[8px] font-bold text-center">
                  <div className="bg-slate-100 p-1 rounded">Seiri (Utilização)</div>
                  <div className="bg-slate-100 p-1 rounded">Seiton (Ordenação)</div>
                  <div className="bg-slate-100 p-1 rounded">Seiso (Limpeza)</div>
                  <div className="bg-slate-100 p-1 rounded">Seiketsu (Saúde)</div>
                  <div className="bg-slate-100 p-1 rounded">Shitsuke (Autodisciplina)</div>
                </div>
              ) 
            }} 
            podcast={{
            aulaId: "gestaoprocessos",
            aulaTitulo: "Gestao Processos",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 5,
            moduloTitulo: "Módulo 5",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
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
          enunciado="Na gestão de processos, como se define um 'processo de negócio'?"
          alternativas={[
            { letra: "A", texto: "Conjunto de tarefas isoladas sem relação entre si", correta: false },
                { letra: "B", texto: "Sequência de atividades inter-relacionadas que transformam entradas em saídas de valor", correta: true },
                { letra: "C", texto: "Apenas atividades operacionais de baixo nível", correta: false },
                { letra: "D", texto: "Um documento técnico obrigatório", correta: false },
                { letra: "E", texto: "Sinônimo de procedimento administrativo", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Um processo de negócio é um conjunto de atividades estruturadas, ordenadas no tempo e no espaço, que convergem para criar um resultado de valor (produto ou serviço) para um cliente específico." },
            { titulo: "Passo 2", conteudo: "Cada atividade adiciona valor ao processo." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo 
              questoes={quizM5} 
              titulo="QUIZ: Módulo Nº 5" 
              numero={3} 
              variant={mv[5]} 
              icone="🚀" 
              onComplete={(score) => handleModuleComplete("modulo-5", score)} 
            />
          </section>
        </div>
      </TabsContent>
      )}

      {/* ═══ MÓDULO 6: INDICADORES DE PROCESSOS ═══ */}
      {activeTab === "modulo-6" && (
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner 
            numero={6} 
            titulo="Indicadores e Métricas (KPIs)" 
            descricao="O que não se mede, não se gerencia. A ciência de transformar dados em decisões." 
            gradiente="bg-gradient-to-br from-amber-900 via-amber-500 to-amber-800" 
          />
          
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader 
              index="INTRO" 
              title="A Ciência da Medição" 
              description="Eficiência, Eficácia e Efetividade: A trindade do desempenho." 
              variant={mv[6]} 
            />
            
            <ContentAccordion slides={[
              { 
                titulo: "Conceituação - Eficiência vs Eficácia vs Efetividade", 
                icone: <LuBrain />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      Esses três termos são os preferidos das bancas de concurso. Entender a diferença é garantir 2 ou 3 questões na prova.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl">
                        <p className="font-bold text-amber-900 text-lg">⚙️ Eficiência (Meio)</p>
                        <p className="text-lg text-amber-700">Fazer as coisas certo. Foco no uso dos recursos, custos e desperdícios. <span className="italic">"Economizar combustível durante a viagem."</span></p>
                      </div>
                      <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl">
                        <p className="font-bold text-blue-900 text-lg">🎯 Eficácia (Fim)</p>
                        <p className="text-lg text-blue-700">Fazer a coisa certa. Foco no resultado, na meta e no objetivo atingido. <span className="italic">"Chegar ao destino final."</span></p>
                      </div>
                      <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl">
                        <p className="font-bold text-emerald-900 text-lg">💎 Efetividade (Impacto)</p>
                        <p className="text-lg text-emerald-700">O impacto real. Foco na satisfação do cliente e na mudança social/organizacional. <span className="italic">"A viagem resolveu o problema do cliente?"</span></p>
                      </div>
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Exemplificação - KPIs SMART", 
                icone: <LuBookOpen />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground">Um indicador bem construído deve ser <strong>SMART</strong>:</p>
                    
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { l: "S", t: "Specific (Específico)", d: "O que exatamente queremos medir?" },
                        { l: "M", t: "Measurable (Mensurável)", d: "Pode ser quantificado em números?" },
                        { l: "A", t: "Achievable (Atingível)", d: "A meta é realista?" },
                        { l: "R", t: "Relevant (Relevante)", d: "Faz sentido para a estratégia?" },
                        { l: "T", t: "Time-bound (Prazo)", d: "Quando será medido?" },
                      ].map((s, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl">
                          <span className="w-8 h-8 flex items-center justify-center bg-amber-600 text-white font-black rounded-lg shrink-0">{s.l}</span>
                          <div>
                            <p className="font-bold text-lg text-slate-800">{s.t}</p>
                            <p className="text-[10px] text-slate-500">{s.d}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Dicas - Dashboards e Gestão à Vista", 
                icone: <LuLightbulb />, 
                conteudo: (
                  <div className="space-y-4">
                    <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-4">
                      <p className="font-bold text-amber-400 uppercase text-lg">O Painel de Controle</p>
                      <p className="text-lg opacity-80">Assim como o cockpit de um avião, a Gestão à Vista permite que todos na Petrobras vejam o status do processo em tempo real através de luzes (Verde/Amarelo/Vermelho).</p>
                      <div className="flex justify-around py-2">
                        <div className="w-12 h-12 rounded-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse" />
                        <div className="w-12 h-12 rounded-full bg-yellow-500/30" />
                        <div className="w-12 h-12 rounded-full bg-green-500/30" />
                      </div>
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Exceções - Quando KPIs mentem", 
                icone: <LuTrophy />, 
                conteudo: (
                  <div className="space-y-4">
                    <AlertBox tipo="warning" titulo="Efeito Cobra">
                      <p className="text-lg leading-relaxed">
                        Cuidado com metas que incentivam o comportamento errado. Exemplo: "Reduzir tempo de atendimento no suporte". O funcionário pode simplesmente desligar na cara do cliente para fechar o chamado rápido.
                      </p>
                    </AlertBox>
                    <p className="text-lg italic text-slate-500">Sempre cruze indicadores (ex: Velocidade x Qualidade).</p>
                  </div>
                ) 
              },
            ]} />
          </section>


          
          <section id="quiz-modulo-6" className="mt-16">
          











<ModuleConsolidation moduloNumero={6} 
            index={6} 
            variant={mv[6]} 
            resumoVisual={{ 
              moduloNome: "Módulo 6", 
              tituloAula: "Gestão de Processos", 
              materia: "Administração", 
              images: [
                { title: "Painel de Controle", type: "Visual", placeholderColor: "bg-amber-500/20" }, 
                { title: "Funil de Métricas", type: "Fluxo", placeholderColor: "bg-orange-500/20" }, 
                { title: "Alinhamento SMART", type: "Filtro", placeholderColor: "bg-yellow-500/20" }
              ] 
            }} 
            sinteseEstrategica={{ 
              title: "Mantra do Desempenho", 
              content: (
                <div className="space-y-2 text-left">
                  <p className="text-[10px] font-bold">"EFICIÊNCIA é esforço. EFICÁCIA é alvo. EFETIVIDADE é legado."</p>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 w-3/4" />
                  </div>
                </div>
              ) 
            }} 
            podcast={{
            aulaId: "gestaoprocessos",
            aulaTitulo: "Gestao Processos",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 6,
            moduloTitulo: "Módulo 6",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
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
          enunciado="Na gestão de processos, como se define um 'processo de negócio'?"
          alternativas={[
            { letra: "A", texto: "Conjunto de tarefas isoladas sem relação entre si", correta: false },
                { letra: "B", texto: "Sequência de atividades inter-relacionadas que transformam entradas em saídas de valor", correta: true },
                { letra: "C", texto: "Apenas atividades operacionais de baixo nível", correta: false },
                { letra: "D", texto: "Um documento técnico obrigatório", correta: false },
                { letra: "E", texto: "Sinônimo de procedimento administrativo", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Um processo de negócio é um conjunto de atividades estruturadas, ordenadas no tempo e no espaço, que convergem para criar um resultado de valor (produto ou serviço) para um cliente específico." },
            { titulo: "Passo 2", conteudo: "Cada atividade adiciona valor ao processo." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo 
              questoes={quizM6} 
              titulo="QUIZ: Módulo Nº 6" 
              numero={3} 
              variant={mv[6]} 
              icone="📈" 
              onComplete={(score) => handleModuleComplete("modulo-6", score)} 
            />
          </section>
        </div>
      </TabsContent>
      )}

      {/* ═══ MÓDULO 7: AUTOMAÇÃO E BPM ═══ */}
      {activeTab === "modulo-7" && (
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner 
            numero={7} 
            titulo="Automação e Digitalização" 
            descricao="BPMS e RPA: Deixando as máquinas fazerem a parte repetitiva para que os humanos possam pensar." 
            gradiente="bg-gradient-to-br from-blue-900 via-blue-500 to-blue-800" 
          />
          
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader 
              index="INTRO" 
              title="A Era Digital nos Processos" 
              description="Sistemas, robôs e orquestração de fluxos." 
              variant={mv[7]} 
            />
            
            <ContentAccordion slides={[
              { 
                titulo: "Conceituação - BPMS vs RPA", 
                icone: <LuBrain />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground">Nem toda automação é igual. Entenda onde cada uma brilha:</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                        <p className="font-bold text-blue-800 text-lg mb-2">🤖 BPMS (Orquestrador)</p>
                        <p className="text-[10px] text-blue-700">Faz a gestão do fluxo de ponta a ponta. Conecta pessoas e sistemas. É o "maestro".</p>
                      </div>
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                        <p className="font-bold text-slate-800 text-lg mb-2">⚡ RPA (O Robô)</p>
                        <p className="text-[10px] text-slate-700">Imita o clique do humano na tela. Ideal para sistemas legados que não têm API. É o "trabalhador braçal digital".</p>
                      </div>
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Exemplificação - Workflow na Petrobras", 
                icone: <LuBookOpen />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground text-lg font-bold">Automação de Requisição de Compras:</p>
                    <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded bg-blue-600 text-white flex items-center justify-center text-[10px]">1</div>
                        <p className="text-[10px]">Abertura de pedido via SAP.</p>
                      </div>
                      <div className="flex items-center gap-3 border-t border-slate-100 pt-3">
                        <div className="w-6 h-6 rounded bg-blue-600 text-white flex items-center justify-center text-[10px]">2</div>
                        <p className="text-[10px]">Motor de Regras (BRMS) verifica se está no orçamento.</p>
                      </div>
                      <div className="flex items-center gap-3 border-t border-slate-100 pt-3 text-emerald-600 font-bold">
                        <div className="w-6 h-6 rounded bg-emerald-600 text-white flex items-center justify-center text-[10px]">3</div>
                        <p className="text-[10px]">Aprovação automática se valor &lt; R$ 10.000,00.</p>
                      </div>
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Dicas - Low-code e Agilidade", 
                icone: <LuLightbulb />, 
                conteudo: (
                  <div className="space-y-4">
                    <AlertBox tipo="success" titulo="Dica Premium">
                      <p className="text-lg">
                        O futuro não é programar código complexo, é desenhar processos em interfaces visuais. Na prova, lembre-se que o <strong>BPMS</strong> facilita a agilidade na mudança das regras de negócio.
                      </p>
                    </AlertBox>
                  </div>
                ) 
              },
              { 
                titulo: "Exceções e Riscos", 
                icone: <LuTrophy />, 
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">O erro clássico:</p>
                    <div className="p-4 bg-rose-900 text-white rounded-xl text-center">
                      <p className="font-black italic">"Automatizar um processo bagunçado apenas torna a bagunça mais rápida."</p>
                    </div>
                    <p className="text-lg text-slate-500 text-center uppercase font-bold tracking-widest mt-2 shrink-0">Simplifique antes de automatizar.</p>
                  </div>
                ) 
              },
            ]} />
          </section>


          
          <section id="quiz-modulo-7" className="mt-16">
          











<ModuleConsolidation moduloNumero={7} 
            index={7} 
            variant={mv[7]} 
            resumoVisual={{ 
              moduloNome: "Módulo 7", 
              tituloAula: "Gestão de Processos", 
              materia: "Administração", 
              images: [
                { title: "Arquitetura BPMS", type: "TI", placeholderColor: "bg-blue-500/20" }, 
                { title: "Robôs de Processo", type: "Robótica", placeholderColor: "bg-slate-500/20" }, 
                { title: "Dashboard de Execução", type: "Dados", placeholderColor: "bg-cyan-500/20" }
              ] 
            }} 
            sinteseEstrategica={{ 
              title: "O Princípio Tech", 
              content: (
                <div className="space-y-2 text-left">
                  <p className="text-lg italic">"Se é repetitivo, é robô. Se é decisão, é regra. Se é fluxo, é processo."</p>
                </div>
              ) 
            }} 
            podcast={{
            aulaId: "gestaoprocessos",
            aulaTitulo: "Gestao Processos",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 7,
            moduloTitulo: "Módulo 7",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
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
          enunciado="Na gestão de processos, como se define um 'processo de negócio'?"
          alternativas={[
            { letra: "A", texto: "Conjunto de tarefas isoladas sem relação entre si", correta: false },
                { letra: "B", texto: "Sequência de atividades inter-relacionadas que transformam entradas em saídas de valor", correta: true },
                { letra: "C", texto: "Apenas atividades operacionais de baixo nível", correta: false },
                { letra: "D", texto: "Um documento técnico obrigatório", correta: false },
                { letra: "E", texto: "Sinônimo de procedimento administrativo", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Um processo de negócio é um conjunto de atividades estruturadas, ordenadas no tempo e no espaço, que convergem para criar um resultado de valor (produto ou serviço) para um cliente específico." },
            { titulo: "Passo 2", conteudo: "Cada atividade adiciona valor ao processo." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo 
              questoes={quizM7} 
              titulo="QUIZ: Módulo Nº 7" 
              numero={3} 
              variant={mv[7]} 
              icone="⚙️" 
              onComplete={(score) => handleModuleComplete("modulo-7", score)} 
            />
          </section>
        </div>
      </TabsContent>
      )}

      {/* ═══ MÓDULO 8: GESTÃO DA QUALIDADE ═══ */}
      {activeTab === "modulo-8" && (
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner 
            numero={8} 
            titulo="Qualidade e Maturidade" 
            descricao="ISO 9001 e as ferramentas que garantem o padrão de excelência mundial." 
            gradiente="bg-gradient-to-br from-emerald-900 via-emerald-500 to-emerald-800" 
          />
          
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader 
              index="INTRO" 
              title="A Cultura da Qualidade" 
              description="Do Ishikawa ao Pareto: Resolvendo problemas na raiz." 
              variant={mv[8]} 
            />
            
            <ContentAccordion slides={[
              { 
                titulo: "Conceituação - As 7 Ferramentas da Qualidade", 
                icone: <LuBrain />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground text-lg">Essenciais para qualquer analista de processos:</p>
                    <div className="grid grid-cols-2 gap-2">
                       <div className="bg-emerald-50 p-2 rounded border border-emerald-100 text-[10px] font-bold">1. Fluxograma</div>
                       <div className="bg-emerald-50 p-2 rounded border border-emerald-100 text-[10px] font-bold">2. Diagrama de Ishikawa (Espinha de Peixe)</div>
                       <div className="bg-emerald-50 p-2 rounded border border-emerald-100 text-[10px] font-bold">3. Folha de Verificação</div>
                       <div className="bg-emerald-50 p-2 rounded border border-emerald-100 text-[10px] font-bold">4. Gráfico de Pareto (80/20)</div>
                       <div className="bg-emerald-50 p-2 rounded border border-emerald-100 text-[10px] font-bold">5. Histograma</div>
                       <div className="bg-emerald-50 p-2 rounded border border-emerald-100 text-[10px] font-bold">6. Gráfico de Dispersão</div>
                       <div className="bg-emerald-50 p-2 rounded border border-emerald-100 text-[10px] font-bold">7. Carta de Controle</div>
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Exemplificação - Diagrama de Ishikawa", 
                icone: <LuBookOpen />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground text-lg font-bold uppercase">Causa e Efeito (Os 6Ms):</p>
                    <div className="bg-slate-900 p-6 rounded-2xl text-white">
                       <div className="flex flex-wrap gap-2 text-[10px]">
                          <span className="px-2 py-1 bg-emerald-600 rounded">Método</span>
                          <span className="px-2 py-1 bg-emerald-600 rounded">Mão de obra</span>
                          <span className="px-2 py-1 bg-emerald-600 rounded">Máquina</span>
                          <span className="px-2 py-1 bg-emerald-600 rounded">Meio Ambiente</span>
                          <span className="px-2 py-1 bg-emerald-600 rounded">Material</span>
                          <span className="px-2 py-1 bg-emerald-600 rounded">Medida</span>
                       </div>
                       <div className="mt-4 border-t border-slate-700 pt-4 flex items-center justify-between">
                          <p className="text-[10px] italic">"O problema é a cabeça do peixe, as causas são as espinhas."</p>
                       </div>
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Dicas - ISO 9001 e Processos", 
                icone: <LuLightbulb />, 
                conteudo: (
                  <div className="space-y-4">
                    <AlertBox tipo="info" titulo="O que a Prova quer de você?">
                       <p className="text-lg">
                          Saiba que a ISO 9001:2015 exige a <strong>Abordagem por Processos</strong> e a <strong>Mentalidade de Risco</strong>. Não é mais só documentar, é garantir que o processo gera valor com risco controlado.
                       </p>
                    </AlertBox>
                  </div>
                ) 
              },
              { 
                titulo: "Exceções - Qualidade vs Burocracia", 
                icone: <LuTrophy />, 
                conteudo: (
                  <div className="space-y-3">
                    <p className="text-[10px] text-muted-foreground leading-relaxed italic">
                      "Muita norma sem propósito vira burocracia. Pouca norma com propósito vira qualidade."
                    </p>
                  </div>
                ) 
              },
            ]} />
          </section>


          
          <section id="quiz-modulo-8" className="mt-16">
          











<ModuleConsolidation moduloNumero={8} 
            index={8} 
            variant={mv[8]} 
            resumoVisual={{ 
              moduloNome: "Módulo 8", 
              tituloAula: "Gestão de Processos", 
              materia: "Administração", 
              images: [
                { title: "As 7 Ferramentas", type: "Infográfico", placeholderColor: "bg-emerald-500/20" }, 
                { title: "Níveis CMMI", type: "Escala", placeholderColor: "bg-green-500/20" }, 
                { title: "Ciclo PDCA da Qualidade", type: "Loop", placeholderColor: "bg-teal-500/20" }
              ] 
            }} 
            sinteseEstrategica={{ 
              title: "80/20 de Pareto", 
              content: (
                <div className="space-y-2 text-left">
                  <p className="text-[10px] font-bold">"20% das causas resolvem 80% dos problemas."</p>
                  <div className="flex gap-1 h-4">
                    <div className="bg-emerald-500 w-[20%]" />
                    <div className="bg-slate-200 w-[80%]" />
                  </div>
                </div>
              ) 
            }} 
            podcast={{
            aulaId: "gestaoprocessos",
            aulaTitulo: "Gestao Processos",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 8,
            moduloTitulo: "Módulo 8",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
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
          enunciado="Na gestão de processos, como se define um 'processo de negócio'?"
          alternativas={[
            { letra: "A", texto: "Conjunto de tarefas isoladas sem relação entre si", correta: false },
                { letra: "B", texto: "Sequência de atividades inter-relacionadas que transformam entradas em saídas de valor", correta: true },
                { letra: "C", texto: "Apenas atividades operacionais de baixo nível", correta: false },
                { letra: "D", texto: "Um documento técnico obrigatório", correta: false },
                { letra: "E", texto: "Sinônimo de procedimento administrativo", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Um processo de negócio é um conjunto de atividades estruturadas, ordenadas no tempo e no espaço, que convergem para criar um resultado de valor (produto ou serviço) para um cliente específico." },
            { titulo: "Passo 2", conteudo: "Cada atividade adiciona valor ao processo." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo 
              questoes={quizM8} 
              titulo="QUIZ: Módulo Nº 8" 
              numero={3} 
              variant={mv[8]} 
              icone="🏆" 
              onComplete={(score) => handleModuleComplete("modulo-8", score)} 
            />
          </section>
        </div>
      </TabsContent>
      )}

      {/* ═══ MÓDULO 9: APLICAÇÕES NA PETROBRAS ═══ */}
      {activeTab === "modulo-9" && (
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner 
            numero={9} 
            titulo="Processos no O&G (Petrobras)" 
            descricao="Como a maior empresa do Brasil gerencia fluxos complexos de exploração até o posto de combustível." 
            gradiente="bg-gradient-to-br from-rose-900 via-rose-500 to-rose-800" 
          />
          
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader 
              index="INTRO" 
              title="A Cadeia de Valor Integrada" 
              description="Upstream, Midstream e Downstream." 
              variant={mv[9]} 
            />
            
            <ContentAccordion slides={[
              { 
                titulo: "Conceituação - Upstream, Midstream e Downstream", 
                icone: <LuBrain />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground text-lg">O petróleo percorre um longo caminho de processos:</p>
                    <div className="flex flex-col gap-4">
                       <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl relative overflow-hidden">
                          <p className="font-bold text-rose-800 text-lg">💦 Upstream (Exploração e Produção)</p>
                          <p className="text-[10px] text-rose-700">Achar o óleo e tirar do mar. Processos de altíssimo risco e custo.</p>
                       </div>
                       <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                          <p className="font-bold text-amber-800 text-lg">🚢 Midstream (Transporte e Logística)</p>
                          <p className="text-[10px] text-amber-700">Dutos, navios e estocagem. O elo de ligação.</p>
                       </div>
                       <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                          <p className="font-bold text-emerald-800 text-lg">⛽ Downstream (Refino e Distribuição)</p>
                          <p className="text-[10px] text-emerald-700">Transformação em gasolina, diesel e plásticos. Venda ao consumidor.</p>
                       </div>
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Exemplificação - HMS e Segurança", 
                icone: <LuBookOpen />, 
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground text-lg leading-relaxed">
                       Na Petrobras, o processo de <strong>Segurança, Meio Ambiente e Saúde (SMS)</strong> é transversal. Ele interrompe qualquer outro processo se houver risco iminente de acidente. É a cultura da "Interrupção de Segurança".
                    </p>
                  </div>
                ) 
              },
              { 
                titulo: "Dicas - Auditoria de Processos", 
                icone: <LuLightbulb />, 
                conteudo: (
                  <div className="space-y-4">
                    <div className="p-5 bg-slate-900 text-white rounded-2xl border-b-4 border-rose-500">
                       <p className="text-lg font-bold text-rose-400 mb-2 uppercase">Fique de Olho!</p>
                       <p className="text-lg">
                          Auditorias na Petrobras buscam conformidade com os processos internos (Manuais da Qualidade). Qualquer desvio deve ser relatado como "NÃO CONFORMIDADE".
                       </p>
                    </div>
                  </div>
                ) 
              },
            ]} />
          </section>


          
          <section id="quiz-modulo-9" className="mt-16">
          











<ModuleConsolidation moduloNumero={9} 
            index={9} 
            variant={mv[9]} 
            resumoVisual={{ 
              moduloNome: "Módulo 9", 
              tituloAula: "Gestão de Processos", 
              materia: "Administração", 
              images: [
                { title: "Mapa de Exploração", type: "Geoprocesso", placeholderColor: "bg-rose-500/20" }, 
                { title: "Logística de Dutos", type: "Infra", placeholderColor: "bg-red-500/20" }, 
                { title: "Padrão de Refino", type: "Química", placeholderColor: "bg-rose-600/20" }
              ] 
            }} 
            sinteseEstrategica={{ 
              title: "Cadeia Petrobras", 
              content: (
                <div className="flex justify-between items-center text-[8px] font-bold uppercase text-slate-500">
                  <p>Mar (E&P)</p>
                  <LuArrowDown className="-rotate-90" />
                  <p>Navio (Mid)</p>
                  <LuArrowDown className="-rotate-90" />
                  <p>Posto (Down)</p>
                </div>
              ) 
            }} 
            podcast={{
            aulaId: "gestaoprocessos",
            aulaTitulo: "Gestao Processos",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 9,
            moduloTitulo: "Módulo 9",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
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
          enunciado="Na gestão de processos, como se define um 'processo de negócio'?"
          alternativas={[
            { letra: "A", texto: "Conjunto de tarefas isoladas sem relação entre si", correta: false },
                { letra: "B", texto: "Sequência de atividades inter-relacionadas que transformam entradas em saídas de valor", correta: true },
                { letra: "C", texto: "Apenas atividades operacionais de baixo nível", correta: false },
                { letra: "D", texto: "Um documento técnico obrigatório", correta: false },
                { letra: "E", texto: "Sinônimo de procedimento administrativo", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Um processo de negócio é um conjunto de atividades estruturadas, ordenadas no tempo e no espaço, que convergem para criar um resultado de valor (produto ou serviço) para um cliente específico." },
            { titulo: "Passo 2", conteudo: "Cada atividade adiciona valor ao processo." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo 
              questoes={quizM9} 
              titulo="QUIZ: Módulo Nº 9" 
              numero={3} 
              variant={mv[9]} 
              icone="🏭" 
              onComplete={(score) => handleModuleComplete("modulo-9", score)} 
            />
          </section>
        </div>
      </TabsContent>
      )}

      {/* ═══ MÓDULO 10: Simulado Geral ═══ */}
      {activeTab === "modulo-10" && (
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner 
            numero={10} 
            titulo="Simulado Geral e Consolidação" 
            descricao="Todas as competências testadas em um único simulado de alto nível. A hora da verdade!" 
            gradiente="bg-gradient-to-br from-emerald-900 via-emerald-500 to-emerald-800" 
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader 
              index="INTRO" 
              title="O Checklist de Ouro" 
              description="O que você NÃO pode esquecer para a prova da CESGRANRIO." 
              variant={mv[10]} 
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Card 1: Conceitos Chave */}
              <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl space-y-4">
                <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
                  <LuCheck />
                </div>
                <h4 className="font-bold text-emerald-900">Conceitos Fatais</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-[10px] text-emerald-800">
                    <span className="font-bold">•</span>
                    Processo vs Projeto (Repetitivo vs Único/Temporário)
                  </li>
                  <li className="flex items-start gap-2 text-[10px] text-emerald-800">
                    <span className="font-bold">•</span>
                    Dono do Processo (Responsável pelo resultado final)
                  </li>
                  <li className="flex items-start gap-2 text-[10px] text-emerald-800">
                    <span className="font-bold">•</span>
                    Valor Agregado (A visão do cliente interno/externo)
                  </li>
                </ul>
              </div>

              {/* Card 2: Ferramentas */}
              <div className="p-6 bg-cyan-50 border border-cyan-100 rounded-3xl space-y-4">
                <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center text-white">
                  <LuSettings />
                </div>
                <h4 className="font-bold text-cyan-900">Ferramentas Pro</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-[10px] text-cyan-800">
                    <span className="font-bold">•</span>
                    Ishikawa (Causa e Efeito: 6 Ms)
                  </li>
                  <li className="flex items-start gap-2 text-[10px] text-cyan-800">
                    <span className="font-bold">•</span>
                    Pareto (80/20: Priorização de problemas)
                  </li>
                  <li className="flex items-start gap-2 text-[10px] text-cyan-800">
                    <span className="font-bold">•</span>
                    BPMN (Símbolos: Piscina, Raias, Eventos)
                  </li>
                </ul>
              </div>

              {/* Card 3: Metodologias */}
              <div className="p-6 bg-blue-50 border border-blue-100 rounded-3xl space-y-4">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                  <LuTrendingUp />
                </div>
                <h4 className="font-bold text-blue-900">Estratégias de Melhoria</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-[10px] text-blue-800">
                    <span className="font-bold">•</span>
                    PDCA (Ciclo de Deming: Nunca acaba!)
                  </li>
                  <li className="flex items-start gap-2 text-[10px] text-blue-800">
                    <span className="font-bold">•</span>
                    Lean (Redução de desperdícios: Muda)
                  </li>
                  <li className="flex items-start gap-2 text-[10px] text-blue-800">
                    <span className="font-bold">•</span>
                    Six Sigma (Redução de variabilidade: DMAIC)
                  </li>
                </ul>
              </div>
            </div>

            <AlertBox tipo="success" titulo="Aprovação Petrobras">
              <p className="text-lg">
                A CESGRANRIO costuma cobrar a integração desses conceitos. Saiba que a <strong>Gestão de Processos</strong> não é uma ilha; ela serve ao <strong>Planejamento Estratégico</strong> da companhia por meio de indicadores (KPIs).
              </p>
            </AlertBox>
          </section>

          <section id="quiz-modulo-10" className="mt-16">
            {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant={mv[10]}
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Na gestão de processos, como se define um 'processo de negócio'?"
          alternativas={[
            { letra: "A", texto: "Conjunto de tarefas isoladas sem relação entre si", correta: false },
                { letra: "B", texto: "Sequência de atividades inter-relacionadas que transformam entradas em saídas de valor", correta: true },
                { letra: "C", texto: "Apenas atividades operacionais de baixo nível", correta: false },
                { letra: "D", texto: "Um documento técnico obrigatório", correta: false },
                { letra: "E", texto: "Sinônimo de procedimento administrativo", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Um processo de negócio é um conjunto de atividades estruturadas, ordenadas no tempo e no espaço, que convergem para criar um resultado de valor (produto ou serviço) para um cliente específico." },
            { titulo: "Passo 2", conteudo: "Cada atividade adiciona valor ao processo." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo 
              questoes={quizM10} 
              titulo="QUIZ: Módulo Nº 10" 
              numero={2} 
              variant={mv[10]} 
              icone="👑" 
              onComplete={(score) => handleModuleComplete("modulo-10", score)} 
            />
          </section>

          <footer className="pt-10 border-t border-slate-200 opacity-50 text-center pb-20">
            <p className="text-lg text-slate-400 italic">© 2026 Petrobras Quest AI - Conteúdo Premium Estilo CESGRANRIO</p>
          </footer>
        </div>
      </TabsContent>
      )}
    </AulaTemplate>
  );
}
