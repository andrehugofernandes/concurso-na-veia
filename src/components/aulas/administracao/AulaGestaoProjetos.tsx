// Gestão de Projetos (PMBOK) - Premium Aula
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
  LuClock,
  LuUsers,
  LuDollarSign,
  LuTriangle,
} from "react-icons/lu";

import { getModuleVariant } from "@/lib/moduleColors";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Conceitos de Projetos" },
  { id: "modulo-2", label: "Módulo 2", title: "Áreas do PMBOK" },
  { id: "modulo-3", label: "Módulo 3", title: "Grupos de Processos" },
  { id: "modulo-4", label: "Módulo 4", title: "Escopo e Tempo" },
  { id: "modulo-5", label: "Módulo 5", title: "Custos e Qualidade" },
  { id: "modulo-6", label: "Módulo 6", title: "Gestão de Riscos" },
  { id: "modulo-7", label: "Módulo 7", title: "Metodologias Ágeis" },
  { id: "modulo-8", label: "Módulo 8", title: "PMO e Governança" },
  { id: "modulo-9", label: "Módulo 9", title: "Aplicações Petrobras" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Geral" },
] as const;

const TEMP_QUIZ = [
  { id: 1, pergunta: "Um projeto é, por definição:", opcoes: [{ label: "A", valor: "Uma operação contínua e repetitiva" }, { label: "B", valor: "Um esforço temporário para criar um resultado exclusivo" }, { label: "C", valor: "Um processo permanente da organização" }, { label: "D", valor: "Uma atividade rotineira do dia a dia" }, { label: "E", valor: "Um plano estratégico de longo prazo" }], correta: "B", explicacao: "Segundo o PMBOK, projeto é um 'esforço temporário empreendido para criar um produto, serviço ou resultado exclusivo'. Temporário = início e fim definidos. Exclusivo = resultado único." },
  { id: 2, pergunta: "Quantas áreas de conhecimento possui o PMBOK 6ª edição?", opcoes: [{ label: "A", valor: "5" }, { label: "B", valor: "7" }, { label: "C", valor: "8" }, { label: "D", valor: "10" }, { label: "E", valor: "12" }], correta: "D", explicacao: "O PMBOK 6ª edição possui 10 áreas de conhecimento: Integração, Escopo, Cronograma, Custos, Qualidade, Recursos, Comunicações, Riscos, Aquisições e Partes Interessadas." },
  { id: 3, pergunta: "O caminho crítico de um projeto é:", opcoes: [{ label: "A", valor: "O caminho mais curto do projeto" }, { label: "B", valor: "A sequência mais longa de atividades dependentes" }, { label: "C", valor: "O caminho com menor custo" }, { label: "D", valor: "As atividades mais importantes" }, { label: "E", valor: "O caminho com mais recursos" }], correta: "B", explicacao: "O caminho crítico é a sequência mais longa de atividades dependentes, determinando a duração mínima do projeto. Atividades no caminho crítico têm folga zero — qualquer atraso impacta o prazo final." },
  { id: 4, pergunta: "No Scrum, o Product Owner é responsável por:", opcoes: [{ label: "A", valor: "Remover impedimentos do time" }, { label: "B", valor: "Maximizar o valor do produto" }, { label: "C", valor: "Definir a arquitetura técnica" }, { label: "D", valor: "Conduzir as reuniões diárias" }, { label: "E", valor: "Aprovar o orçamento do projeto" }], correta: "B", explicacao: "O Product Owner é responsável por maximizar o valor do produto e gerenciar o Product Backlog. O Scrum Master remove impedimentos. O Dev Team define a arquitetura." },
];

export default function AulaGestaoProjetos({
  onComplete, isCompleted, loading, xpGanho = 50,
  currentProgress, onUpdateProgress, titulo, descricao, duracao,
  materiaNome, materiaCor, materiaId, prevTopico, nextTopico,
}: AulaProps) {
    const STORAGE_KEY_PREFIX = "petrobras_quest_aula_gestao_projetos_";

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
      {/* ═══ MÓDULO 1: CONCEITOS E FUNDAMENTOS ═══ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner 
            numero={1} 
            titulo="Conceitos e Fundamentos" 
            descricao="O que define um projeto? Temporário, exclusivo e progressivamente elaborado." 
            gradiente="bg-gradient-to-br from-amber-300 via-amber-500 to-amber-400" 
          />
          
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader 
              index="INTRO" 
              title="A Essência do Projeto" 
              description="Definição PMBOK, características e a Tríplice Restrição." 
              variant="blue" 
            />
            
            <ContentAccordion slides={[
              { 
                titulo: "Conceituação - Definição PMBOK", 
                icone: <LuBrain />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      Segundo o <strong>PMBOK Guide</strong>, um projeto é um esforço <strong>temporário</strong> empreendido para criar um produto, serviço ou resultado <strong>exclusivo</strong>.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                        <p className="font-bold text-blue-800 text-lg mb-2">⏳ Temporário</p>
                        <p className="text-[10px] text-blue-700">Tem um início e um fim definidos. Não é um esforço contínuo como uma linha de montagem.</p>
                      </div>
                      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                        <p className="font-bold text-emerald-800 text-lg mb-2">💎 Exclusivo</p>
                        <p className="text-[10px] text-emerald-700">O resultado final tem características que o distinguem de todos os outros produtos ou serviços similares.</p>
                      </div>
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Exemplificação - Projetos vs Operações", 
                icone: <LuBookOpen />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground text-lg font-bold uppercase italic">Cenário Petrobras:</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                         <p className="text-[10px] font-bold text-blue-600 underline">PROJETO</p>
                         <p className="text-[10px]">Construção e instalação da plataforma P-71.</p>
                         <p className="text-[10px] text-slate-400">Objetivo: Entrega da unidade.</p>
                      </div>
                      <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                         <p className="text-[10px] font-bold text-emerald-600 underline">OPERAÇÃO</p>
                         <p className="text-[10px]">Extração diária de petróleo pela P-71.</p>
                         <p className="text-[10px] text-slate-400">Objetivo: Continuidade do negócio.</p>
                      </div>
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Dicas - Tríplice Restrição ou Triângulo de Ferro", 
                icone: <LuLightbulb />, 
                conteudo: (
                  <div className="space-y-4">
                    <AlertBox tipo="success" titulo="Dica para a Prova">
                      <p className="text-lg">
                        Lembre-se do <strong>Triângulo de Ferro</strong>: Escopo, Tempo e Custo. Se você aumentar o Escopo sem mexer no Orçamento, o Tempo irá aumentar. Eles são interdependentes e a <strong>Qualidade</strong> fica no centro (ou é o quarto elemento).
                      </p>
                    </AlertBox>
                    <div className="flex justify-center py-4 text-slate-300">
                      <LuTarget size={60} className="animate-pulse" />
                    </div>
                  </div>
                ) 
              },
            ]} />
          </section>


          
          <section id="quiz-modulo-1" className="mt-16">
          













<ModuleConsolidation 
            index={2} 
            variant="blue" 
            video={{ 
              videoId: "n7U7R8S_XuU", 
              title: "Fundamentação de Projetos", 
              duration: "18:45" 
            }} 
            resumoVisual={{ 
              moduloNome: "Módulo 1", 
              tituloAula: "Gestão de Projetos", 
              materia: "Administração", 
              images: [
                { title: "Projeto vs Operação", type: "Comparação", placeholderColor: "bg-blue-500/20" }, 
                { title: "Tríplice Restrição", type: "Geometria", placeholderColor: "bg-sky-500/20" }, 
                { title: "Partes Interessadas", type: "Mapa", placeholderColor: "bg-indigo-500/20" }
              ] 
            }} 
            sinteseEstrategica={{ 
              title: "P.T.E. (Iniciais)", 
              content: (
                <div className="space-y-2 text-left">
                  <p className="text-lg italic">"P.rojeto é T.emporário e E.xclusivo."</p>
                  <p className="text-lg text-muted-foreground uppercase tracking-widest">Não confunda com processo!</p>
                </div>
              ) 
            }} 
            audio={{ 
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", 
              titulo: "Podcast: O mindset de Projetos", 
              artista: "Especialista em PMO" 
            }} 
          />

                      {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Um projeto é, por definição:"
          alternativas={[
            { letra: "A", texto: "Uma operação contínua e repetitiva", correta: false },
                { letra: "B", texto: "Um esforço temporário para criar um resultado exclusivo", correta: true },
                { letra: "C", texto: "Um processo permanente da organização", correta: false },
                { letra: "D", texto: "Uma atividade rotineira do dia a dia", correta: false },
                { letra: "E", texto: "Um plano estratégico de longo prazo", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Segundo o PMBOK, projeto é um 'esforço temporário empreendido para criar um produto, serviço ou resultado exclusivo'." },
            { titulo: "Passo 2", conteudo: "Temporário = início e fim definidos." },
            { titulo: "Passo 3", conteudo: "Exclusivo = resultado único." }
          ]}
        />
        <QuizInterativo 
              questoes={quizM1} 
              titulo="QUIZ: Conceitos de Projetos" 
              numero={3} 
              variant="blue" 
              icone="🧩" 
              onComplete={(score) => handleModuleComplete("modulo-1", score)} 
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 2: ÁREAS DE CONHECIMENTO (PMBOK 6) ═══ */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner 
            numero={2} 
            titulo="Áreas de Conhecimento" 
            descricao="As 10 dimensões que um gerente de projetos deve dominar segundo o PMBOK 6." 
            gradiente="bg-gradient-to-br from-blue-300 via-blue-500 to-blue-400" 
          />
          
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader 
              index="INTRO" 
              title="A Visão 360 do Projeto" 
              description="Do Escopo às Partes Interessadas." 
              variant="blue" 
            />
            
            <ContentAccordion slides={[
              { 
                titulo: "Conceituação - As 10 Áreas", 
                icone: <LuBrain />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground text-lg">O PMBOK 6 organiza a gestão em 10 frentes:</p>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                       {[
                         "Integração", "Escopo", "Cronograma", "Custos", "Qualidade",
                         "Recursos", "Comunicações", "Riscos", "Aquisições", "Partes Interessadas"
                       ].map((area, idx) => (
                         <div key={idx} className="p-2 border border-emerald-100 bg-emerald-50 rounded text-center">
                            <p className="text-[10px] font-bold text-emerald-800">{area}</p>
                         </div>
                       ))}
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "A Área Mestra: Integração", 
                icone: <LuLayers />, 
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-[10px] leading-relaxed">
                       A <strong>Integração</strong> é a única área que perpassa todos os grupos de processos. É ela que garante que o bico do navio se encontre com a popa no final da construção. Inclui o Termo de Abertura e o Plano de Gestão do Projeto.
                    </p>
                  </div>
                ) 
              },
              { 
                titulo: "Dicas - Mudanças no PMBOK 7", 
                icone: <LuLightbulb />, 
                conteudo: (
                  <div className="space-y-4">
                    <AlertBox tipo="warning" titulo="Destaque Estratégico">
                      <p className="text-lg">
                        No PMBOK 7, as 10 Áreas foram substituídas por <strong>8 Domínios de Desempenho</strong>. No entanto, para a Petrobras, a base conceitual das 10 áreas ainda é o norte fundamental nas questões de Administração.
                      </p>
                    </AlertBox>
                  </div>
                ) 
              },
            ]} />
          </section>


          
          <section id="quiz-modulo-2" className="mt-16">
          













<ModuleConsolidation 
            index={2} 
            variant="blue" 
            video={{ 
              videoId: "n7U7R8S_XuU", 
              title: "Navegando pelas 10 Áreas", 
              duration: "15:00" 
            }} 
            resumoVisual={{ 
              moduloNome: "Módulo 2", 
              tituloAula: "Gestão de Projetos", 
              materia: "Administração", 
              images: [
                { title: "Mapa Mental das Áreas", type: "Infográfico", placeholderColor: "bg-emerald-500/20" }, 
                { title: "Fluxo de Integração", type: "Diagrama", placeholderColor: "bg-teal-500/20" }
              ] 
            }} 
            sinteseEstrategica={{ 
              title: "I.E.C.C. Q.R.C. R.A.P.", 
              content: (
                <div className="text-[10px] text-left opacity-70">
                  <p>In-Es-Cro-Cu Qual-Rec-Com Ris-Aqui-Par</p>
                </div>
              ) 
            }} 
            audio={{ 
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", 
              titulo: "Resumo Áreas PMBOK", 
              artista: "Especialista" 
            }} 
          />

                      {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Um projeto é, por definição:"
          alternativas={[
            { letra: "A", texto: "Uma operação contínua e repetitiva", correta: false },
                { letra: "B", texto: "Um esforço temporário para criar um resultado exclusivo", correta: true },
                { letra: "C", texto: "Um processo permanente da organização", correta: false },
                { letra: "D", texto: "Uma atividade rotineira do dia a dia", correta: false },
                { letra: "E", texto: "Um plano estratégico de longo prazo", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Segundo o PMBOK, projeto é um 'esforço temporário empreendido para criar um produto, serviço ou resultado exclusivo'." },
            { titulo: "Passo 2", conteudo: "Temporário = início e fim definidos." },
            { titulo: "Passo 3", conteudo: "Exclusivo = resultado único." }
          ]}
        />
        <QuizInterativo 
              questoes={quizM2} 
              titulo="QUIZ: Áreas do PMBOK" 
              numero={3} 
              variant="blue" 
              icone="🎯" 
              onComplete={(score) => handleModuleComplete("modulo-2", score)} 
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 3: GRUPOS DE PROCESSOS (O FLUXO) ═══ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner 
            numero={3} 
            titulo="Grupos de Processos" 
            descricao="O ciclo cronológico e lógico: Iniciação, Planejamento, Execução, Monitoramento e Encerramento." 
            gradiente="bg-gradient-to-br from-emerald-300 via-emerald-500 to-emerald-400" 
          />
          
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader 
              index="INTRO" 
              title="O Fluxo da Vida de um Projeto" 
              description="Esqueça as fases, foque nos grupos de processos." 
              variant="blue" 
            />
            
            <ContentAccordion slides={[
              { 
                titulo: "Conceituação - Os 5 Grupos", 
                icone: <LuBrain />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground text-lg">Todo projeto navega por estes 5 estágios:</p>
                    <div className="flex flex-col gap-2">
                       <div className="p-3 bg-amber-50 border-l-4 border-amber-500 rounded text-[10px]">
                          <span className="font-bold">1. Iniciação:</span> Autorização do projeto (Termo de Abertura).
                       </div>
                       <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded text-[10px]">
                          <span className="font-bold">2. Planejamento:</span> Refinamento da estratégia e linha de base.
                       </div>
                       <div className="p-3 bg-emerald-50 border-l-4 border-emerald-500 rounded text-[10px]">
                          <span className="font-bold">3. Execução:</span> Realização do trabalho em si.
                       </div>
                       <div className="p-3 bg-rose-50 border-l-4 border-rose-500 rounded text-[10px]">
                          <span className="font-bold">4. Monitoramento e Controle:</span> Medir desvios e corrigir.
                       </div>
                       <div className="p-3 bg-slate-50 border-l-4 border-slate-500 rounded text-[10px]">
                          <span className="font-bold">5. Encerramento:</span> Finalização formal e lições aprendidas.
                       </div>
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "O Loop de Monitoramento", 
                icone: <LuRefreshCw />, 
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-[10px] text-slate-500">
                       Dica crucial: O <strong>Monitoramento e Controle</strong> não ocorre após a execução; ele ocorre <strong>ao mesmo tempo</strong> que todos os outros grupos. Você monitora desde o planejamento até o encerramento.
                    </p>
                  </div>
                ) 
              },
              { 
                titulo: "Exemplificação - O Termo de Abertura", 
                icone: <LuFileText />, 
                conteudo: (
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-900 text-white rounded-xl">
                       <p className="text-[10px] font-bold text-amber-400 uppercase">Input Principal: Termo de Abertura (TAP)</p>
                       <p className="text-[10px] mt-2 italic">É o documento que dá 'vida' ao projeto e autoridade ao Gerente de Projeto (GP).</p>
                    </div>
                  </div>
                ) 
              },
            ]} />
          </section>


          
          <section id="quiz-modulo-3" className="mt-16">
          













<ModuleConsolidation 
            index={2} 
            variant="blue" 
            video={{ 
              videoId: "n7U7R8S_XuU", 
              title: "A Jornada do Projeto", 
              duration: "22:00" 
            }} 
            resumoVisual={{ 
              moduloNome: "Módulo 3", 
              tituloAula: "Gestão de Projetos", 
              materia: "Administração", 
              images: [
                { title: "Fluxo PDCA no PMBOK", type: "Modelo", placeholderColor: "bg-amber-500/20" }, 
                { title: "Iniciação ao Encerramento", type: "Cronos", placeholderColor: "bg-orange-500/20" }
              ] 
            }} 
            sinteseEstrategica={{ 
              title: "I.P.E.M.E.", 
              content: (
                <p className="text-lg font-bold text-center text-amber-600 tracking-widest">Inicia - Planeja - Executa - Monitora - Encerra</p>
              ) 
            }} 
            audio={{ 
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", 
              titulo: "Fluxos e Processos PMI", 
              artista: "Prof. Gestão" 
            }} 
          />

                      {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Um projeto é, por definição:"
          alternativas={[
            { letra: "A", texto: "Uma operação contínua e repetitiva", correta: false },
                { letra: "B", texto: "Um esforço temporário para criar um resultado exclusivo", correta: true },
                { letra: "C", texto: "Um processo permanente da organização", correta: false },
                { letra: "D", texto: "Uma atividade rotineira do dia a dia", correta: false },
                { letra: "E", texto: "Um plano estratégico de longo prazo", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Segundo o PMBOK, projeto é um 'esforço temporário empreendido para criar um produto, serviço ou resultado exclusivo'." },
            { titulo: "Passo 2", conteudo: "Temporário = início e fim definidos." },
            { titulo: "Passo 3", conteudo: "Exclusivo = resultado único." }
          ]}
        />
        <QuizInterativo 
              questoes={quizM3} 
              titulo="QUIZ: Grupos de Processos" 
              numero={3} 
              variant="blue" 
              icone="⚙️" 
              onComplete={(score) => handleModuleComplete("modulo-3", score)} 
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 4: ESCOPO E TEMPO (O FUNDAMENTO DO ENTREGÁVEL) ═══ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner 
            numero={4} 
            titulo="Escopo e Tempo" 
            descricao="Definindo o que será feito e quando: EAP, Cronograma e Caminho Crítico." 
            gradiente="bg-gradient-to-br from-rose-300 via-rose-500 to-rose-400" 
          />
          
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader 
              index="INTRO" 
              title="Planejamento de Entrega" 
              description="A estrutura da EAP e o domínio do cronograma." 
              variant="blue" 
            />
            
            <ContentAccordion slides={[
              { 
                titulo: "Conceituação - EAP (Estrutura Analítica do Projeto)", 
                icone: <LuLayers />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      A <strong>EAP (WBS - Work Breakdown Structure)</strong> é uma decomposição hierárquica orientada ao <strong>entregável</strong> do trabalho a ser executado pela equipe.
                    </p>
                    <AlertBox tipo="warning" titulo="Não é Lista de Tarefas!">
                       <p className="text-lg">
                         A EAP foca em <strong>subprodutos (substantivos)</strong> e não em ações (verbos). O nível mais baixo da EAP é chamado de <strong>Pacote de Trabalho</strong>.
                       </p>
                    </AlertBox>
                  </div>
                ) 
              },
              { 
                titulo: "Técnicas de Cronograma - Caminho Crítico (CPM)", 
                icone: <LuTrendingUp />, 
                conteudo: (
                  <div className="space-y-4 text-[10px]">
                    <p>O <strong>Caminho Crítico</strong> é a sequência de atividades que representa o caminho mais longo através de um projeto, o qual determina a <strong>menor duração possível</strong> do projeto.</p>
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg">
                       <p className="font-bold text-rose-800 uppercase">Resumo CPM:</p>
                       <ul className="list-disc pl-4 space-y-1 text-rose-700">
                          <li>Folga zero no caminho crítico.</li>
                          <li>Qualquer atraso aqui atrasa o projeto inteiro.</li>
                          <li>Fundamental para a gerência focar onde realmente importa.</li>
                       </ul>
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Fórmula PERT - Estimativa de Três Pontos", 
                icone: <LuSigma />, 
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-lg">Para lidar com incertezas, usamos a média ponderada PERT:</p>
                    <div className="p-4 bg-slate-100 rounded-xl font-mono text-center text-lg border border-slate-300 shadow-inner">
                       TE = (P + 4M + O) / 6
                    </div>
                    <p className="text-[10px] text-muted-foreground italic text-center">P = Pessimista | M = Mais Provável | O = Otimista</p>
                  </div>
                ) 
              },
            ]} />
          </section>


          
          <section id="quiz-modulo-4" className="mt-16">
          













<ModuleConsolidation 
            index={2} 
            variant="blue" 
            video={{ 
              videoId: "n7U7R8S_XuU", 
              title: "Técnicas de Escopo e Tempo", 
              duration: "25:10" 
            }} 
            resumoVisual={{ 
              moduloNome: "Módulo 4", 
              tituloAula: "Gestão de Projetos", 
              materia: "Administração", 
              images: [
                { title: "Hierarquia EAP", type: "Árvore", placeholderColor: "bg-rose-500/20" }, 
                { title: "Gráfico de Gantt", type: "Cronograma", placeholderColor: "bg-pink-500/20" }
              ] 
            }} 
            sinteseEstrategica={{ 
              title: "PERT = P+4M+O / 6", 
              content: (
                <div className="space-y-1">
                  <p className="text-[10px] italic">"Otimista (+), provável (x4) e pessimista (+), divide por 6."</p>
                </div>
              ) 
            }} 
            audio={{ 
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", 
              titulo: "Minicast: EAP vs Cronograma", 
              artista: "Especialista em Planejamento" 
            }} 
          />

                      {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Um projeto é, por definição:"
          alternativas={[
            { letra: "A", texto: "Uma operação contínua e repetitiva", correta: false },
                { letra: "B", texto: "Um esforço temporário para criar um resultado exclusivo", correta: true },
                { letra: "C", texto: "Um processo permanente da organização", correta: false },
                { letra: "D", texto: "Uma atividade rotineira do dia a dia", correta: false },
                { letra: "E", texto: "Um plano estratégico de longo prazo", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Segundo o PMBOK, projeto é um 'esforço temporário empreendido para criar um produto, serviço ou resultado exclusivo'." },
            { titulo: "Passo 2", conteudo: "Temporário = início e fim definidos." },
            { titulo: "Passo 3", conteudo: "Exclusivo = resultado único." }
          ]}
        />
        <QuizInterativo 
              questoes={quizM4} 
              titulo="QUIZ: Escopo e Tempo" 
              numero={3} 
              variant="blue" 
              icone="📅" 
              onComplete={(score) => handleModuleComplete("modulo-4", score)} 
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 5: CUSTOS E QUALIDADE (KPIs DE SUCESSO) ═══ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner 
            numero={5} 
            titulo="Custos e Qualidade" 
            descricao="Gestão do valor agregado (EVA) e padrões de excelência." 
            gradiente="bg-gradient-to-br from-violet-300 via-violet-500 to-violet-400" 
          />
          
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader 
              index="INTRO" 
              title="O Valor do Dinheiro e da Entrega" 
              description="EVA, CPI, SPI e métricas de qualidade." 
              variant="blue" 
            />
            
            <ContentAccordion slides={[
              { 
                titulo: "Conceituação - Earned Value Analysis (EVA)", 
                icone: <LuBrain />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      A <strong>Gestão do Valor Agregado</strong> é a técnica mais cobrada em provas de alto nível. Ela integra escopo, tempo e custo.
                    </p>
                    <div className="grid grid-cols-3 gap-2 text-[10px] text-center">
                       <div className="p-2 bg-indigo-50 border border-indigo-200 rounded">
                          <p className="font-bold">PV (VP)</p>
                          <p>Valor Planejado</p>
                       </div>
                       <div className="p-2 bg-emerald-50 border border-emerald-200 rounded">
                          <p className="font-bold">EV (VA)</p>
                          <p>Valor Agregado</p>
                       </div>
                       <div className="p-2 bg-rose-50 border border-rose-200 rounded">
                          <p className="font-bold">AC (CR)</p>
                          <p>Custo Real</p>
                       </div>
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Índices de Desempenho (CPI e SPI)", 
                icone: <LuTrendingUp />, 
                conteudo: (
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2">
                       <p className="text-[10px]"><span className="text-emerald-400 font-bold">CPI (IDC):</span> EV / AC (Eficiência de Custo)</p>
                       <p className="text-[10px]"><span className="text-blue-400 font-bold">SPI (IDP):</span> EV / PV (Eficiência de Prazo)</p>
                    </div>
                    <AlertBox tipo="success" titulo="Regra de Ouro">
                       <p className="text-lg italic">"Se o índice é {">"} 1.0, o projeto está bem. Se {"<"} 1.0, está atrasado ou acima do orçamento."</p>
                    </AlertBox>
                  </div>
                ) 
              },
              { 
                titulo: "Gestão da Qualidade", 
                icone: <LuSettings />, 
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-[10px]">
                       No contexto Petrobras, a qualidade é inegociável. Envolve a conformidade com requisitos e a satisfação do cliente (interno ou externo). Diferencie <strong>Garantia da Qualidade</strong> (processo) de <strong>Controle da Qualidade</strong> (produto).
                    </p>
                  </div>
                ) 
              },
            ]} />
          </section>


          
          <section id="quiz-modulo-5" className="mt-16">
          













<ModuleConsolidation 
            index={2} 
            variant="blue" 
            video={{ 
              videoId: "n7U7R8S_XuU", 
              title: "Dominando o EVA", 
              duration: "30:00" 
            }} 
            resumoVisual={{ 
              moduloNome: "Módulo 5", 
              tituloAula: "Gestão de Projetos", 
              materia: "Administração", 
              images: [
                { title: "Curva S", type: "Gráfico", placeholderColor: "bg-indigo-500/20" }, 
                { title: "Ferramentas da Qualidade", type: "Colagem", placeholderColor: "bg-violet-500/20" }
              ] 
            }} 
            sinteseEstrategica={{ 
              title: "Índice > 1 = Sucesso", 
              content: (
                <p className="text-lg text-emerald-600 font-bold uppercase tracking-wider">Acima de 1 tá rindo, abaixo tá chorando!</p>
              ) 
            }} 
            audio={{ 
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", 
              titulo: "Podcast: Métricas do Valor Agregado", 
              artista: "Controller de Projetos" 
            }} 
          />

                      {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Um projeto é, por definição:"
          alternativas={[
            { letra: "A", texto: "Uma operação contínua e repetitiva", correta: false },
                { letra: "B", texto: "Um esforço temporário para criar um resultado exclusivo", correta: true },
                { letra: "C", texto: "Um processo permanente da organização", correta: false },
                { letra: "D", texto: "Uma atividade rotineira do dia a dia", correta: false },
                { letra: "E", texto: "Um plano estratégico de longo prazo", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Segundo o PMBOK, projeto é um 'esforço temporário empreendido para criar um produto, serviço ou resultado exclusivo'." },
            { titulo: "Passo 2", conteudo: "Temporário = início e fim definidos." },
            { titulo: "Passo 3", conteudo: "Exclusivo = resultado único." }
          ]}
        />
        <QuizInterativo 
              questoes={quizM5} 
              titulo="QUIZ: Custos e Qualidade" 
              numero={3} 
              variant="blue" 
              icone="💰" 
              onComplete={(score) => handleModuleComplete("modulo-5", score)} 
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 6: GESTÃO DE RISCOS (INCERTEZA PROATIVA) ═══ */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner 
            numero={6} 
            titulo="Gestão de Riscos" 
            descricao="Incertezas que importam: ameaças, oportunidades e planos de contingência." 
            gradiente="bg-gradient-to-br from-amber-900 via-amber-500 to-amber-800" 
          />
          
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader 
              index="INTRO" 
              title="O Gerenciamento da Incerteza" 
              description="Identificação, análise e resposta aos riscos." 
              variant="blue" 
            />
            
            <ContentAccordion slides={[
              { 
                titulo: "Conceituação - O Que é Risco?", 
                icone: <LuBrain />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground text-lg">
                      Risco é um evento ou condição <strong>incerta</strong> que, se ocorrer, tem um efeito <strong>positivo (oportunidade)</strong> ou <strong>negativo (ameaça)</strong> em pelo menos um objetivo do projeto.
                    </p>
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-4">
                       <LuTriangle className="text-amber-600 flex-shrink-0" size={24} mode="stacked" />
                       <p className="text-[10px] text-amber-800 italic">"Risco conhecido = Contingência. Risco desconhecido = Reserva de Gerenciamento."</p>
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Matriz Probabilidade x Impacto", 
                icone: <LuMonitor />, 
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-[10px]">A <strong>Análise Qualitativa</strong> prioriza os riscos usando a matriz PxI. Já a <strong>Análise Quantitativa</strong> tenta dar um valor monetário e estatístico (ex: Simulação de Monte Carlo).</p>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-3 bg-red-50 rounded border border-red-100 text-[9px] font-bold text-red-700">Alta Probabilidade + Alto Impacto = FOCO TOTAL</div>
                       <div className="p-3 bg-blue-50 rounded border border-blue-100 text-[9px] font-bold text-blue-700">Baixa Probabilidade + Baixo Impacto = MONITORAR</div>
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Estratégias de Resposta", 
                icone: <LuShield />, 
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground">Para Ameaças:</p>
                    <div className="flex flex-wrap gap-2">
                       {["Evitar", "Transferir", "Mitigar", "Aceitar"].map((est, idx) => (
                         <span key={idx} className="px-2 py-1 bg-slate-100 border border-slate-300 rounded-full text-[9px] font-mono">{est}</span>
                       ))}
                    </div>
                  </div>
                ) 
              },
            ]} />
          </section>


          
          <section id="quiz-modulo-6" className="mt-16">
          













<ModuleConsolidation 
            index={2} 
            variant="blue" 
            video={{ 
              videoId: "n7U7R8S_XuU", 
              title: "Gestão de Riscos na Prática", 
              duration: "20:45" 
            }} 
            resumoVisual={{ 
              moduloNome: "Módulo 6", 
              tituloAula: "Gestão de Projetos", 
              materia: "Administração", 
              images: [
                { title: "Matriz PxI", type: "Matriz", placeholderColor: "bg-amber-500/20" }, 
                { title: "Simulação Monte Carlo", type: "Dashboard", placeholderColor: "bg-orange-500/20" }
              ] 
            }} 
            sinteseEstrategica={{ 
              title: "AMEAÇAS: E.T. M.A.", 
              content: (
                <div className="text-[10px] space-y-1">
                  <p><strong>E</strong>vitar | <strong>T</strong>ransferir | <strong>M</strong>itigar | <strong>A</strong>ceitar</p>
                </div>
              ) 
            }} 
            audio={{ 
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", 
              titulo: "Miniclass: Analise de Riscos", 
              artista: "Especialista de Riscos" 
            }} 
          />

                      {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Um projeto é, por definição:"
          alternativas={[
            { letra: "A", texto: "Uma operação contínua e repetitiva", correta: false },
                { letra: "B", texto: "Um esforço temporário para criar um resultado exclusivo", correta: true },
                { letra: "C", texto: "Um processo permanente da organização", correta: false },
                { letra: "D", texto: "Uma atividade rotineira do dia a dia", correta: false },
                { letra: "E", texto: "Um plano estratégico de longo prazo", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Segundo o PMBOK, projeto é um 'esforço temporário empreendido para criar um produto, serviço ou resultado exclusivo'." },
            { titulo: "Passo 2", conteudo: "Temporário = início e fim definidos." },
            { titulo: "Passo 3", conteudo: "Exclusivo = resultado único." }
          ]}
        />
        <QuizInterativo 
              questoes={quizM6} 
              titulo="QUIZ: Gestão de Riscos" 
              numero={3} 
              variant="blue" 
              icone="⚠️" 
              onComplete={(score) => handleModuleComplete("modulo-6", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 7: METODOLOGIAS ÁGEIS ═══ */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={7}
            titulo="Metodologias Ágeis"
            descricao="Scrum, Kanban e a Agilidade no Gerenciamento de Projetos Modernos."
            gradiente="bg-gradient-to-br from-purple-300 via-purple-500 to-purple-400"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index="INTRO"
              title="A Revolução Ágil"
              description="Adaptabilidade, iteração e entrega contínua de valor."
              variant="blue"
            />

            <ContentAccordion slides={[
              {
                titulo: "Conceituação - Manifesto Ágil",
                icone: <LuZap />,
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      O <strong>Manifesto Ágil</strong> (2001) prioriza: <strong>Indivíduos e Iterações</strong> sobre Processos e Ferramentas; <strong>Funcionamento de Software</strong> sobre Documentação; <strong>Colaboração com Cliente</strong> sobre Contrato; e <strong>Responder a Mudanças</strong> sobre Planejamento Rígido.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl">
                        <p className="font-bold text-purple-800 text-lg mb-2">🔄 Sprint</p>
                        <p className="text-[10px] text-purple-700">Iteração de 1-4 semanas com entrega funcional no final.</p>
                      </div>
                      <div className="p-4 bg-pink-50 border border-pink-200 rounded-xl">
                        <p className="font-bold text-pink-800 text-lg mb-2">📊 Backlog</p>
                        <p className="text-[10px] text-pink-700">Lista priorizada de features e tarefas do projeto.</p>
                      </div>
                    </div>
                  </div>
                )
              },
              {
                titulo: "Exemplificação - Scrum vs Kanban",
                icone: <LuBookOpen />,
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground text-lg font-bold uppercase italic">Comparação de Frameworks:</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                         <p className="text-[10px] font-bold text-purple-600 underline">SCRUM</p>
                         <p className="text-[10px]">Sprints fixas, reuniões definidas.</p>
                         <p className="text-[10px] text-slate-400">Ideal para mudanças previsíveis.</p>
                      </div>
                      <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                         <p className="text-[10px] font-bold text-pink-600 underline">KANBAN</p>
                         <p className="text-[10px]">Fluxo contínuo, sem sprints fixas.</p>
                         <p className="text-[10px] text-slate-400">Ideal para mudanças frequentes.</p>
                      </div>
                    </div>
                  </div>
                )
              },
              {
                titulo: "Dicas - Cerimônias Scrum Essenciais",
                icone: <LuLightbulb />,
                conteudo: (
                  <div className="space-y-4">
                    <AlertBox tipo="success" titulo="As 4 Cerimônias">
                      <p className="text-lg">
                        <strong>1. Planning:</strong> No início da Sprint. <strong>2. Daily:</strong> 15min diários. <strong>3. Review:</strong> Fim da Sprint. <strong>4. Retrospectiva:</strong> Melhorias do time. Estas cerimônias garantem sincronização e aprendizado contínuo.
                      </p>
                    </AlertBox>
                  </div>
                )
              },
            ]} />
          </section>



          <section id="quiz-modulo-7" className="mt-16">


<ModuleConsolidation
            index={2}
            variant="blue"
            video={{
              videoId: "jZkUiVDgNWA",
              title: "Scrum Masterclass",
              duration: "22:15"
            }}
            resumoVisual={{
              moduloNome: "Módulo 7",
              tituloAula: "Gestão de Projetos",
              materia: "Administração",
              images: [
                { title: "Papéis Scrum", type: "Organograma", placeholderColor: "bg-purple-500/20" },
                { title: "Sprint Timeline", type: "Cronograma", placeholderColor: "bg-violet-500/20" }
              ]
            }}
            sinteseEstrategica={{
              title: "D.O.R. & D.O.D.",
              content: (
                <div className="space-y-2 text-left">
                  <p className="text-lg italic"><strong>D.O.R.</strong> = Definition of Ready</p>
                  <p className="text-lg italic"><strong>D.O.D.</strong> = Definition of Done</p>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
              titulo: "Agilidade na Prática",
              artista: "Scrum Master Certificado"
            }}
          />

                      {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Um projeto é, por definição:"
          alternativas={[
            { letra: "A", texto: "Uma operação contínua e repetitiva", correta: false },
                { letra: "B", texto: "Um esforço temporário para criar um resultado exclusivo", correta: true },
                { letra: "C", texto: "Um processo permanente da organização", correta: false },
                { letra: "D", texto: "Uma atividade rotineira do dia a dia", correta: false },
                { letra: "E", texto: "Um plano estratégico de longo prazo", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Segundo o PMBOK, projeto é um 'esforço temporário empreendido para criar um produto, serviço ou resultado exclusivo'." },
            { titulo: "Passo 2", conteudo: "Temporário = início e fim definidos." },
            { titulo: "Passo 3", conteudo: "Exclusivo = resultado único." }
          ]}
        />
        <QuizInterativo
              questoes={quizM7}
              titulo="QUIZ: Metodologias Ágeis"
              numero={3}
              variant="blue"
              icone="⚡"
              onComplete={(score) => handleModuleComplete("modulo-7", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 8: PMO E GOVERNANÇA ═══ */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={8}
            titulo="PMO e Governança de Projetos"
            descricao="Office de Projetos, Governança e Alinhamento Estratégico."
            gradiente="bg-gradient-to-br from-indigo-300 via-indigo-500 to-indigo-400"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index="INTRO"
              title="Estrutura de Governança"
              description="PMO, Portfolio e Alinhamento com a Estratégia."
              variant="blue"
            />

            <ContentAccordion slides={[
              {
                titulo: "Conceituação - O Papel do PMO",
                icone: <LuLayoutDashboard />,
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      A <strong>Project Management Office (PMO)</strong> é uma unidade organizacional que centraliza a gestão de projetos. Ela oferece suporte, padronização e alinhamento estratégico. Existem 3 tipos principais:
                    </p>

                    <div className="grid grid-cols-1 gap-3">
                      <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl">
                        <p className="font-bold text-indigo-800 text-sm mb-1">🔹 Suportiva</p>
                        <p className="text-[10px] text-indigo-700">Oferece templates, lições aprendidas e consultoria.</p>
                      </div>
                      <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl">
                        <p className="font-bold text-indigo-800 text-sm mb-1">🔹 Controladora</p>
                        <p className="text-[10px] text-indigo-700">Exige conformidade com padrões; governa aprovações.</p>
                      </div>
                      <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl">
                        <p className="font-bold text-indigo-800 text-sm mb-1">🔹 Diretiva</p>
                        <p className="text-[10px] text-indigo-700">Gerencia projetos diretamente; maior controle.</p>
                      </div>
                    </div>
                  </div>
                )
              },
              {
                titulo: "Exemplificação - Portfolio Management",
                icone: <LuTarget />,
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground text-lg font-bold uppercase italic">Petrobras: Níveis de Governança:</p>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                         <p className="text-[10px] font-bold text-indigo-600 underline">PORTFÓLIO</p>
                         <p className="text-[10px]">Todos os projetos estratégicos da empresa.</p>
                         <p className="text-[10px] text-slate-400">Ex: Projetos de Exploração, Refino, Infraestrutura.</p>
                      </div>
                      <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                         <p className="text-[10px] font-bold text-indigo-600 underline">PROGRAMA</p>
                         <p className="text-[10px]">Agrupamento de projetos relacionados.</p>
                         <p className="text-[10px] text-slate-400">Ex: Programa de Desenvolvimento do Pré-Sal.</p>
                      </div>
                    </div>
                  </div>
                )
              },
              {
                titulo: "Dicas - Métricas de Governança",
                icone: <LuLightbulb />,
                conteudo: (
                  <div className="space-y-4">
                    <AlertBox tipo="success" titulo="KPIs Essenciais do PMO">
                      <p className="text-lg">
                        <strong>EVM (Earned Value Management):</strong> Compara valor planejado vs valor agregado. <strong>Budget vs Realizado</strong> e <strong>Schedule vs Realizado</strong> são os principais indicadores de saúde do projeto.
                      </p>
                    </AlertBox>
                  </div>
                )
              },
            ]} />
          </section>



          <section id="quiz-modulo-8" className="mt-16">


<ModuleConsolidation
            index={2}
            variant="blue"
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "Governance & PMO na Prática",
              duration: "19:30"
            }}
            resumoVisual={{
              moduloNome: "Módulo 8",
              tituloAula: "Gestão de Projetos",
              materia: "Administração",
              images: [
                { title: "Estrutura PMO", type: "Organograma", placeholderColor: "bg-indigo-500/20" },
                { title: "Dashboard de Métricas", type: "Dashboard", placeholderColor: "bg-cyan-500/20" }
              ]
            }}
            sinteseEstrategica={{
              title: "E.V.M.",
              content: (
                <div className="space-y-2 text-left">
                  <p className="text-lg italic"><strong>E</strong>arned <strong>V</strong>alue <strong>M</strong>anagement</p>
                  <p className="text-lg text-muted-foreground">O método que prova se o projeto está saudável.</p>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
              titulo: "Governance Best Practices",
              artista: "PMO Director"
            }}
          />

                      {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Um projeto é, por definição:"
          alternativas={[
            { letra: "A", texto: "Uma operação contínua e repetitiva", correta: false },
                { letra: "B", texto: "Um esforço temporário para criar um resultado exclusivo", correta: true },
                { letra: "C", texto: "Um processo permanente da organização", correta: false },
                { letra: "D", texto: "Uma atividade rotineira do dia a dia", correta: false },
                { letra: "E", texto: "Um plano estratégico de longo prazo", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Segundo o PMBOK, projeto é um 'esforço temporário empreendido para criar um produto, serviço ou resultado exclusivo'." },
            { titulo: "Passo 2", conteudo: "Temporário = início e fim definidos." },
            { titulo: "Passo 3", conteudo: "Exclusivo = resultado único." }
          ]}
        />
        <QuizInterativo
              questoes={quizM8}
              titulo="QUIZ: PMO e Governança"
              numero={3}
              variant="blue"
              icone="🏛️"
              onComplete={(score) => handleModuleComplete("modulo-8", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 9: APLICAÇÕES PETROBRAS ═══ */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={9}
            titulo="Gestão de Projetos na Petrobras"
            descricao="Megaprojetos, Exploração de Água Profunda e Gestão de Stakeholders Críticos."
            gradiente="bg-gradient-to-br from-orange-300 via-orange-500 to-orange-400"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index="INTRO"
              title="Realidade Petrobras"
              description="Megaprojetos, Regulação e Stakeholders."
              variant="blue"
            />

            <ContentAccordion slides={[
              {
                titulo: "Conceituação - Megaprojetos Petrobras",
                icone: <LuTrendingUp />,
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      Megaprojetos da Petrobras envolvem: <strong>Valores acima de $1 bilhão, Prazos de 5-15 anos, Múltiplas equipes globais e Regulação ambiental/operacional rigorosa.</strong> Exemplos incluem Pré-Sal, Refinarias e Plantas de Processamento.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
                        <p className="font-bold text-orange-800 text-lg mb-2">⛽ Pré-Sal</p>
                        <p className="text-[10px] text-orange-700">Exploração em águas profundas, mega-projetos de longa duração.</p>
                      </div>
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                        <p className="font-bold text-amber-800 text-lg mb-2">🏭 Infraestrutura</p>
                        <p className="text-[10px] text-amber-700">Refinarias, plantas de processamento, dutos críticos.</p>
                      </div>
                    </div>
                  </div>
                )
              },
              {
                titulo: "Exemplificação - Stakeholders e Compliance",
                icone: <LuUsers />,
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground text-lg font-bold uppercase italic">Ecossistema Petrobras:</p>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                         <p className="text-[10px] font-bold text-orange-600 underline">GOVERNO</p>
                         <p className="text-[10px]">ANP, IBAMA, regulação ambiental rigorosa.</p>
                      </div>
                      <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                         <p className="text-[10px] font-bold text-orange-600 underline">COMUNIDADES</p>
                         <p className="text-[10px]">Impacto ambiental, responsabilidade social.</p>
                      </div>
                      <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                         <p className="text-[10px] font-bold text-orange-600 underline">ACIONISTAS</p>
                         <p className="text-[10px]">Retorno financeiro, sustentabilidade.</p>
                      </div>
                    </div>
                  </div>
                )
              },
              {
                titulo: "Dicas - Gestão de Riscos Críticos",
                icone: <LuShield />,
                conteudo: (
                  <div className="space-y-4">
                    <AlertBox tipo="warning" titulo="Top 3 Riscos em Megaprojetos Petrobras">
                      <p className="text-lg">
                        <strong>1. Volatilidade do Preço do Petróleo:</strong> Impacta orçamento e viabilidade. <strong>2. Mudanças Regulatórias:</strong> Requisitos ambientais podem mudar. <strong>3. Complexidade Técnica:</strong> Operações em água profunda exigem inovação contínua. Documentação e governança são críticas.
                      </p>
                    </AlertBox>
                  </div>
                )
              },
            ]} />
          </section>



          <section id="quiz-modulo-9" className="mt-16">


<ModuleConsolidation
            index={2}
            variant="blue"
            video={{
              videoId: "5_aXSc9KZVc",
              title: "Megaprojetos e Inovação",
              duration: "24:00"
            }}
            resumoVisual={{
              moduloNome: "Módulo 9",
              tituloAula: "Gestão de Projetos",
              materia: "Administração",
              images: [
                { title: "Pré-Sal Mapa", type: "Mapa Geográfico", placeholderColor: "bg-orange-500/20" },
                { title: "Estrutura Stakeholder", type: "Rede", placeholderColor: "bg-yellow-500/20" }
              ]
            }}
            sinteseEstrategica={{
              title: "PETAR",
              content: (
                <div className="space-y-2 text-left">
                  <p className="text-lg italic"><strong>P</strong>ressão | <strong>E</strong>nergético | <strong>T</strong>ecnológico | <strong>A</strong>mbiental | <strong>R</strong>egulação</p>
                  <p className="text-lg text-muted-foreground">Os 5 pilares do contexto Petrobras.</p>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
              titulo: "Complexidade e Inovação",
              artista: "Gerente de Megaprojetos"
            }}
          />

                      {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Um projeto é, por definição:"
          alternativas={[
            { letra: "A", texto: "Uma operação contínua e repetitiva", correta: false },
                { letra: "B", texto: "Um esforço temporário para criar um resultado exclusivo", correta: true },
                { letra: "C", texto: "Um processo permanente da organização", correta: false },
                { letra: "D", texto: "Uma atividade rotineira do dia a dia", correta: false },
                { letra: "E", texto: "Um plano estratégico de longo prazo", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Segundo o PMBOK, projeto é um 'esforço temporário empreendido para criar um produto, serviço ou resultado exclusivo'." },
            { titulo: "Passo 2", conteudo: "Temporário = início e fim definidos." },
            { titulo: "Passo 3", conteudo: "Exclusivo = resultado único." }
          ]}
        />
        <QuizInterativo
              questoes={quizM9}
              titulo="QUIZ: Petrobras na Prática"
              numero={3}
              variant="blue"
              icone="🛢️"
              onComplete={(score) => handleModuleComplete("modulo-9", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 10: Simulado Geral ═══ */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={10}
            titulo="Simulado Geral"
            descricao="Consolidação, Revisão e Simulado Final com Questões de Prova."
            gradiente="bg-gradient-to-br from-rose-300 via-rose-500 to-rose-400"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index="INTRO"
              title="Revisão Completa & Simulado"
              description="Consolidação de todos os conceitos em um simulado integrado."
              variant="blue"
            />

            <ContentAccordion slides={[
              {
                titulo: "Revisão - Mapa Mental Completo",
                icone: <LuBrain />,
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      <strong>Módulo 1:</strong> Conceitos (Temporário, Exclusivo, Tríplice Restrição).
                      <strong> Módulo 2:</strong> 10 Áreas PMBOK.
                      <strong> Módulo 3:</strong> 5 Grupos de Processos.
                      <strong> Módulo 4:</strong> Escopo, Tempo e Técnicas.
                      <strong> Módulo 5:</strong> Custos e Qualidade.
                      <strong> Módulo 6:</strong> Gestão de Riscos PMBOK.
                      <strong> Módulo 7:</strong> Scrum, Kanban, Ágil.
                      <strong> Módulo 8:</strong> PMO e Governança.
                      <strong> Módulo 9:</strong> Petrobras na Prática.
                    </p>
                  </div>
                )
              },
              {
                titulo: "Dicas - Tópicos Mais Prováveis",
                icone: <LuTarget />,
                conteudo: (
                  <div className="space-y-4">
                    <AlertBox tipo="success" titulo="Foco de Estudo para Prova">
                      <p className="text-lg">
                        <strong>TOP 5 CONCEITOS:</strong> 1. Diferença Projeto vs Operação. 2. 10 Áreas PMBOK. 3. Grupos de Processos e Fluxo. 4. Caminho Crítico e EVM. 5. Governança e PMO. Certifique-se de dominar estes antes da prova!
                      </p>
                    </AlertBox>
                  </div>
                )
              },
              {
                titulo: "Estratégia - Prepare-se para o Simulado",
                icone: <LuZap />,
                conteudo: (
                  <div className="space-y-4">
                    <AlertBox tipo="info" titulo="Como Maximar seu Score">
                      <p className="text-lg">
                        <strong>1. Leia Atentamente:</strong> Identifique as palavras-chave. <strong>2. Elimine Óbvias:</strong> Descarte respostas claramente erradas. <strong>3. Relacione Conceitos:</strong> Lembre-se da integração entre áreas. <strong>4. Contexto Petrobras:</strong> Sempre pense em megaprojetos. BOA SORTE!
                      </p>
                    </AlertBox>
                  </div>
                )
              },
            ]} />
          </section>



          <section id="quiz-modulo-10" className="mt-16">


<ModuleConsolidation
            index={2}
            variant="blue"
            video={{
              videoId: "dQw4w9WgXcQ",
              title: "Revisão Geral - Tudo que Você Precisa Saber",
              duration: "45:00"
            }}
            resumoVisual={{
              moduloNome: "Módulo 10",
              tituloAula: "Gestão de Projetos",
              materia: "Administração",
              images: [
                { title: "Mapa Conceitual Completo", type: "Mindmap", placeholderColor: "bg-rose-500/20" },
                { title: "Guia de Revisão", type: "Checklist", placeholderColor: "bg-pink-500/20" }
              ]
            }}
            sinteseEstrategica={{
              title: "👑 MESTRE EM GESTÃO",
              content: (
                <div className="text-center space-y-2">
                  <p className="text-2xl font-bold">✨ Você completou!</p>
                  <p className="text-lg text-muted-foreground">ESPECIALISTA EM GESTÃO DE PROJETOS</p>
                </div>
              )
            }}
            audio={{
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
              titulo: "Encerramento & Motivação",
              artista: "Mentor Especialista"
            }}
          />

                      {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Um projeto é, por definição:"
          alternativas={[
            { letra: "A", texto: "Uma operação contínua e repetitiva", correta: false },
                { letra: "B", texto: "Um esforço temporário para criar um resultado exclusivo", correta: true },
                { letra: "C", texto: "Um processo permanente da organização", correta: false },
                { letra: "D", texto: "Uma atividade rotineira do dia a dia", correta: false },
                { letra: "E", texto: "Um plano estratégico de longo prazo", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Segundo o PMBOK, projeto é um 'esforço temporário empreendido para criar um produto, serviço ou resultado exclusivo'." },
            { titulo: "Passo 2", conteudo: "Temporário = início e fim definidos." },
            { titulo: "Passo 3", conteudo: "Exclusivo = resultado único." }
          ]}
        />
        <QuizInterativo
              questoes={quizM10}
              titulo="Simulado Geral: Gestão de Projetos"
              numero={3}
              variant="blue"
              icone="🏆"
              onComplete={(score) => handleModuleComplete("modulo-10", score)}
            />
          </section>

          {showCompletionBadge && (
            <div className="mt-16 p-8 bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200 rounded-2xl text-center space-y-4 animate-in fade-in duration-500">
              <div className="text-6xl">👑</div>
              <h2 className="text-3xl font-bold text-rose-700">ESPECIALISTA EM GESTÃO</h2>
              <p className="text-lg text-rose-600">Você domina todos os conceitos de Gestão de Projetos PMBOK e está pronto para a Petrobras!</p>
              <p className="text-sm text-muted-foreground">Parabéns por completar este caminho extraordinário! 🚀</p>
            </div>
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
