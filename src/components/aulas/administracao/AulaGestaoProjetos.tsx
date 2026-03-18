// Gestão de Projetos (PMBOK) - Premium Aula
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
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
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
      {/* ═══ MÓDULO 1: CONCEITOS E FUNDAMENTOS ═══ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner 
            numero={1} 
            titulo="Conceitos e Fundamentos" 
            descricao="O que define um projeto? Temporário, exclusivo e progressivamente elaborado." 
            gradiente="bg-gradient-to-br from-blue-700 to-sky-800" 
          />
          
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader 
              index={1} 
              title="A Essência do Projeto" 
              description="Definição PMBOK, características e a Tríplice Restrição." 
              variant={getModuleVariant(1)} 
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
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                        <p className="font-bold text-blue-800 text-xs mb-2">⏳ Temporário</p>
                        <p className="text-[10px] text-blue-700">Tem um início e um fim definidos. Não é um esforço contínuo como uma linha de montagem.</p>
                      </div>
                      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                        <p className="font-bold text-emerald-800 text-xs mb-2">💎 Exclusivo</p>
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
                    <p className="text-muted-foreground text-sm font-bold uppercase italic">Cenário Petrobras:</p>
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
                      <p className="text-xs">
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
            index={1} 
            variant={getModuleVariant(1)} 
            video={{ 
              videoId: "n7U7R8S_XuU", 
              title: "Fundamentação de Projetos", 
              duration: "18:45" 
            }} 
            resumoVisual={{ 
              moduloNome: "Conceitos", 
              tituloAula: "Gestão de Projetos", 
              materia: "Administração", 
              images: [
                { title: "Projeto vs Operação", type: "Comparação", placeholderColor: "bg-blue-500/20" }, 
                { title: "Tríplice Restrição", type: "Geometria", placeholderColor: "bg-sky-500/20" }, 
                { title: "Partes Interessadas", type: "Mapa", placeholderColor: "bg-indigo-500/20" }
              ] 
            }} 
            maceteVisual={{ 
              title: "P.T.E. (Iniciais)", 
              content: (
                <div className="space-y-2 text-left">
                  <p className="text-sm italic">"P.rojeto é T.emporário e E.xclusivo."</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Não confunda com processo!</p>
                </div>
              ) 
            }} 
            audio={{ 
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", 
              titulo: "Podcast: O mindset de Projetos", 
              artista: "Especialista em PMO" 
            }} 
          />

                      <QuizInterativo 
              questoes={quizM1} 
              titulo="Fixação - Conceitos Iniciais" 
              numero={1} 
              variant={getModuleVariant(1)} 
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
            gradiente="bg-gradient-to-br from-emerald-600 to-teal-800" 
          />
          
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader 
              index={2} 
              title="A Visão 360 do Projeto" 
              description="Do Escopo às Partes Interessadas." 
              variant={getModuleVariant(2)} 
            />
            
            <ContentAccordion slides={[
              { 
                titulo: "Conceituação - As 10 Áreas", 
                icone: <LuBrain />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground text-sm">O PMBOK 6 organiza a gestão em 10 frentes:</p>
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
                    <AlertBox tipo="warning" titulo="O Pulo do Gato">
                      <p className="text-xs">
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
            variant={getModuleVariant(2)} 
            video={{ 
              videoId: "n7U7R8S_XuU", 
              title: "Navegando pelas 10 Áreas", 
              duration: "15:00" 
            }} 
            resumoVisual={{ 
              moduloNome: "Áreas", 
              tituloAula: "Gestão de Projetos", 
              materia: "Administração", 
              images: [
                { title: "Mapa Mental das Áreas", type: "Infográfico", placeholderColor: "bg-emerald-500/20" }, 
                { title: "Fluxo de Integração", type: "Diagrama", placeholderColor: "bg-teal-500/20" }
              ] 
            }} 
            maceteVisual={{ 
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

                      <QuizInterativo 
              questoes={quizM2} 
              titulo="Fixação - Áreas PMBOK" 
              numero={2} 
              variant={getModuleVariant(2)} 
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
            gradiente="bg-gradient-to-br from-amber-600 to-orange-700" 
          />
          
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader 
              index={3} 
              title="O Fluxo da Vida de um Projeto" 
              description="Esqueça as fases, foque nos grupos de processos." 
              variant={getModuleVariant(3)} 
            />
            
            <ContentAccordion slides={[
              { 
                titulo: "Conceituação - Os 5 Grupos", 
                icone: <LuBrain />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground text-sm">Todo projeto navega por estes 5 estágios:</p>
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
            index={3} 
            variant={getModuleVariant(3)} 
            video={{ 
              videoId: "n7U7R8S_XuU", 
              title: "A Jornada do Projeto", 
              duration: "22:00" 
            }} 
            resumoVisual={{ 
              moduloNome: "Grupos", 
              tituloAula: "Gestão de Projetos", 
              materia: "Administração", 
              images: [
                { title: "Fluxo PDCA no PMBOK", type: "Modelo", placeholderColor: "bg-amber-500/20" }, 
                { title: "Iniciação ao Encerramento", type: "Cronos", placeholderColor: "bg-orange-500/20" }
              ] 
            }} 
            maceteVisual={{ 
              title: "I.P.E.M.E.", 
              content: (
                <p className="text-sm font-bold text-center text-amber-600 tracking-widest">Inicia - Planeja - Executa - Monitora - Encerra</p>
              ) 
            }} 
            audio={{ 
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", 
              titulo: "Fluxos e Processos PMI", 
              artista: "Prof. Gestão" 
            }} 
          />

                      <QuizInterativo 
              questoes={quizM3} 
              titulo="Fixação - Fluxo de Projeto" 
              numero={3} 
              variant={getModuleVariant(3)} 
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
            gradiente="bg-gradient-to-br from-rose-600 to-pink-800" 
          />
          
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader 
              index={4} 
              title="Planejamento de Entrega" 
              description="A estrutura da EAP e o domínio do cronograma." 
              variant={getModuleVariant(4)} 
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
                       <p className="text-xs">
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
                    <p className="text-xs">Para lidar com incertezas, usamos a média ponderada PERT:</p>
                    <div className="p-4 bg-slate-100 rounded-xl font-mono text-center text-sm border border-slate-300 shadow-inner">
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
            index={4} 
            variant={getModuleVariant(4)} 
            video={{ 
              videoId: "n7U7R8S_XuU", 
              title: "Técnicas de Escopo e Tempo", 
              duration: "25:10" 
            }} 
            resumoVisual={{ 
              moduloNome: "Escopo/Tempo", 
              tituloAula: "Gestão de Projetos", 
              materia: "Administração", 
              images: [
                { title: "Hierarquia EAP", type: "Árvore", placeholderColor: "bg-rose-500/20" }, 
                { title: "Gráfico de Gantt", type: "Cronograma", placeholderColor: "bg-pink-500/20" }
              ] 
            }} 
            maceteVisual={{ 
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

                      <QuizInterativo 
              questoes={quizM4} 
              titulo="Fixação - Escopo e Tempo" 
              numero={4} 
              variant={getModuleVariant(4)} 
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
            gradiente="bg-gradient-to-br from-violet-600 to-purple-800" 
          />
          
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader 
              index={5} 
              title="O Valor do Dinheiro e da Entrega" 
              description="EVA, CPI, SPI e métricas de qualidade." 
              variant={getModuleVariant(5)} 
            />
            
            <ContentAccordion slides={[
              { 
                titulo: "Conceituação - Earned Value Analysis (EVA)", 
                icone: <LuBrain />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground text-xs leading-relaxed">
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
                       <p className="text-xs italic">"Se o índice é {">"} 1.0, o projeto está bem. Se {"<"} 1.0, está atrasado ou acima do orçamento."</p>
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
            index={5} 
            variant={getModuleVariant(5)} 
            video={{ 
              videoId: "n7U7R8S_XuU", 
              title: "Dominando o EVA", 
              duration: "30:00" 
            }} 
            resumoVisual={{ 
              moduloNome: "Custos/Qualidade", 
              tituloAula: "Gestão de Projetos", 
              materia: "Administração", 
              images: [
                { title: "Curva S", type: "Gráfico", placeholderColor: "bg-indigo-500/20" }, 
                { title: "Ferramentas da Qualidade", type: "Colagem", placeholderColor: "bg-violet-500/20" }
              ] 
            }} 
            maceteVisual={{ 
              title: "Índice > 1 = Sucesso", 
              content: (
                <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider">Acima de 1 tá rindo, abaixo tá chorando!</p>
              ) 
            }} 
            audio={{ 
              audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", 
              titulo: "Podcast: Métricas do Valor Agregado", 
              artista: "Controller de Projetos" 
            }} 
          />

                      <QuizInterativo 
              questoes={quizM5} 
              titulo="Fixação - Custos e Metrificação" 
              numero={5} 
              variant={getModuleVariant(5)} 
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
              index={6} 
              title="O Gerenciamento da Incerteza" 
              description="Identificação, análise e resposta aos riscos." 
              variant={getModuleVariant(6)} 
            />
            
            <ContentAccordion slides={[
              { 
                titulo: "Conceituação - O Que é Risco?", 
                icone: <LuBrain />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground text-xs">
                      Risco é um evento ou condição <strong>incerta</strong> que, se ocorrer, tem um efeito <strong>positivo (oportunidade)</strong> ou <strong>negativo (ameaça)</strong> em pelo menos um objetivo do projeto.
                    </p>
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-4">
                       <LuTriangle className="text-amber-600 flex-shrink-0" size={24} />
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
            index={6} 
            variant={getModuleVariant(6)} 
            video={{ 
              videoId: "n7U7R8S_XuU", 
              title: "Gestão de Riscos na Prática", 
              duration: "20:45" 
            }} 
            resumoVisual={{ 
              moduloNome: "Riscos", 
              tituloAula: "Gestão de Projetos", 
              materia: "Administração", 
              images: [
                { title: "Matriz PxI", type: "Matriz", placeholderColor: "bg-amber-500/20" }, 
                { title: "Simulação Monte Carlo", type: "Dashboard", placeholderColor: "bg-orange-500/20" }
              ] 
            }} 
            maceteVisual={{ 
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

                      <QuizInterativo 
              questoes={quizM6} 
              titulo="Fixação - Gestão de Riscos" 
              numero={6} 
              variant={getModuleVariant(6)} 
              icone="⚠️" 
              onComplete={(score) => handleModuleComplete("modulo-6", score)} 
            />
          </section>
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
