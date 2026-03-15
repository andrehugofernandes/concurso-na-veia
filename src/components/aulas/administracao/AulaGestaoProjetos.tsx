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
      {/* ═══ MÓDULO 1: CONCEITOS DE PROJETOS ═══ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={1} titulo="Conceitos Fundamentais de Projetos" descricao="O que define um projeto? Temporário, exclusivo e progressivamente elaborado." gradiente="bg-gradient-to-br from-blue-700 to-sky-800" />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader index={1} title="O que é um Projeto?" description="Definição PMBOK, características e ciclo de vida." variant={getModuleVariant(1)} />
            <ContentAccordion slides={[
              { titulo: "Conceituação - Definição de Projeto", icone: <LuBrain />, conteudo: (<div className="space-y-4"><p className="text-muted-foreground leading-relaxed">Segundo o <strong>PMBOK (Project Management Body of Knowledge)</strong>, um projeto é um <strong>esforço temporário</strong> empreendido para criar um <strong>produto, serviço ou resultado exclusivo</strong>.</p><div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20"><p className="font-bold text-blue-700 mb-2">Características do Projeto:</p><div className="space-y-1 text-sm"><p><strong>Temporário:</strong> Início e fim definidos</p><p><strong>Exclusivo:</strong> Resultado único, nunca feito antes</p><p><strong>Progressivo:</strong> Elaborado em etapas incrementais</p><p><strong>Recursos limitados:</strong> Orçamento e equipe finitos</p></div></div><div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20"><p className="font-bold text-blue-700 mb-2">Projeto vs. Operação:</p><div className="space-y-1 text-sm"><p><strong>Projeto:</strong> Temporário, resultado único (ex: construir plataforma P-80)</p><p><strong>Operação:</strong> Contínua, repetitiva (ex: produzir petróleo na P-80)</p></div></div></div>) },
              { titulo: "Exemplificação - Projetos na Petrobras", icone: <LuBookOpen />, conteudo: (<div className="space-y-4"><div className="space-y-2"><div className="bg-blue-500/10 p-3 rounded border border-blue-500/20"><p className="font-bold text-blue-700 text-sm">Projeto de Construção</p><p className="text-xs">Plataforma FPSO para campo de Búzios (pré-sal)</p></div><div className="bg-blue-500/10 p-3 rounded border border-blue-500/20"><p className="font-bold text-blue-700 text-sm">Projeto de TI</p><p className="text-xs">Implementação de ERP SAP na Petrobras</p></div><div className="bg-blue-500/10 p-3 rounded border border-blue-500/20"><p className="font-bold text-blue-700 text-sm">Projeto de Manutenção</p><p className="text-xs">Parada programada de unidade de refino (REPAR)</p></div></div></div>) },
              { titulo: "Dicas - Tríplice Restrição", icone: <LuLightbulb />, conteudo: (<div className="space-y-4"><AlertBox tipo="info" titulo="Triângulo de Ferro"><div className="text-sm space-y-1"><p>Todo projeto é restrito por 3 fatores inter-relacionados:</p><p><strong>Escopo</strong> (o que fazer) × <strong>Tempo</strong> (quando) × <strong>Custo</strong> (quanto)</p><p className="text-xs text-muted-foreground mt-1">Alterar um impacta os outros. Ex: Aumentar escopo → mais tempo ou mais custo.</p></div></AlertBox></div>) },
              { titulo: "Exceções - PMBOK 7 vs PMBOK 6", icone: <LuTrophy />, conteudo: (<div className="space-y-3"><AlertBox tipo="warning" titulo="Atenção na Prova!"><div className="text-sm space-y-1"><p><strong>PMBOK 6:</strong> 10 áreas de conhecimento, 5 grupos de processos, 49 processos</p><p><strong>PMBOK 7:</strong> 8 domínios de desempenho, baseado em princípios (mais ágil)</p><p className="text-xs text-muted-foreground mt-1">A CESGRANRIO geralmente cobra o PMBOK 6, mas fique atento ao edital!</p></div></AlertBox></div>) },
            ]} />
          </section>
          <ModuleConsolidation index={1} variant={getModuleVariant(1)} video={{ videoId: "n7U7R8S_XuU", title: "Gestão de Projetos: Fundamentos", duration: "20:00" }} resumoVisual={{ moduloNome: "Conceitos de Projetos", tituloAula: "Gestão de Projetos (PMBOK)", materia: "Administração", images: [{ title: "Projeto: Temporário + Exclusivo", type: "Conceito", placeholderColor: "bg-blue-500/20" }, { title: "Tríplice Restrição", type: "Modelo", placeholderColor: "bg-sky-500/20" }, { title: "PMBOK 6 vs 7", type: "Comparação", placeholderColor: "bg-cyan-500/20" }] }} maceteVisual={{ title: "Projeto = Temporário + Exclusivo + Progressivo", content: (<div className="space-y-3 text-left"><p className="text-sm italic">"Projeto tem começo, meio e FIM. Operação não tem fim."</p><div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg font-mono text-xs text-center"><p>Escopo × Tempo × Custo</p><p className="text-muted-foreground">Triângulo de Ferro</p></div></div>) }} audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", titulo: "Projetos: Fundamentos", artista: "Prof. Administração" }} />
          <section id="quiz-modulo-1" className="mt-16">
            <QuizInterativo questoes={quizM1} titulo="Fixação - Conceitos de Projetos" numero={1} variant={getModuleVariant(1)} icone="🧠" onComplete={(score) => handleModuleComplete("modulo-1", score)} />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULOS 2-10 ═══ */}
      {[
        { mod: "modulo-2", num: 2, titulo: "Áreas de Conhecimento do PMBOK", desc: "As 10 áreas: Integração, Escopo, Cronograma, Custos e mais.", grad: "bg-gradient-to-br from-emerald-600 to-teal-800", quiz: quizM2, secTitle: "10 Áreas PMBOK", secDesc: "Conheça cada uma das áreas de conhecimento." },
        { mod: "modulo-3", num: 3, titulo: "Grupos de Processos", desc: "Iniciação, Planejamento, Execução, Monitoramento e Encerramento.", grad: "bg-gradient-to-br from-amber-600 to-orange-700", quiz: quizM3, secTitle: "5 Grupos", secDesc: "O fluxo natural de um projeto." },
        { mod: "modulo-4", num: 4, titulo: "Escopo e Tempo", desc: "EAP, cronograma, caminho crítico e PERT/CPM.", grad: "bg-gradient-to-br from-rose-600 to-pink-800", quiz: quizM4, secTitle: "Planejando Escopo e Prazo", secDesc: "EAP e técnicas de estimativa." },
        { mod: "modulo-5", num: 5, titulo: "Custos e Qualidade", desc: "Orçamento, EVA (Earned Value Analysis) e controle de qualidade.", grad: "bg-gradient-to-br from-violet-600 to-purple-800", quiz: quizM5, secTitle: "Quanto Custa e Como Medir", secDesc: "EVA, CPI, SPI e ferramentas da qualidade." },
        { mod: "modulo-6", num: 6, titulo: "Gestão de Riscos", desc: "Identificar, analisar (qualitativa/quantitativa), planejar respostas e monitorar.", grad: "bg-gradient-to-br from-amber-900 via-amber-500 to-amber-800", quiz: quizM6, secTitle: "Riscos em Projetos", secDesc: "Probabilidade × Impacto e estratégias de resposta." },
        { mod: "modulo-7", num: 7, titulo: "Metodologias Ágeis", desc: "Scrum, Kanban, XP e abordagem híbrida.", grad: "bg-gradient-to-br from-blue-900 via-blue-500 to-blue-800", quiz: quizM7, secTitle: "Agilidade em Projetos", secDesc: "Sprints, backlogs e entregas incrementais." },
        { mod: "modulo-8", num: 8, titulo: "PMO e Governança de Projetos", desc: "Escritório de projetos, portfólios e programas.", grad: "bg-gradient-to-br from-emerald-900 via-emerald-500 to-emerald-800", quiz: quizM8, secTitle: "Estruturas de Governança", secDesc: "PMO, portfólio e seleção de projetos." },
        { mod: "modulo-9", num: 9, titulo: "Aplicações Petrobras", desc: "Gestão de projetos em O&G, FPSOs e paradas de manutenção.", grad: "bg-gradient-to-br from-rose-900 via-rose-500 to-rose-800", quiz: quizM9, secTitle: "Projetos na Petrobras", secDesc: "Do pré-sal às refinarias." },
        { mod: "modulo-10", num: 10, titulo: "Simulado Mestre", desc: "Teste integrado com questões de todos os módulos.", grad: "bg-gradient-to-br from-violet-900 via-violet-500 to-violet-800", quiz: quizM10, secTitle: "Desafio Final", secDesc: "Prove seu domínio em Gestão de Projetos!" },
      ].map(({ mod, num, titulo: modTitulo, desc, grad, quiz, secTitle, secDesc }) => (
        <TabsContent key={mod} value={mod} className="space-y-[50px]">
          <div className="space-y-12 animate-in fade-in duration-500">
            <ModuleBanner numero={num} titulo={modTitulo} descricao={desc} gradiente={grad} />
            <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
              <ModuleSectionHeader index={num} title={secTitle} description={secDesc} variant={getModuleVariant(num)} />
              <ContentAccordion slides={[
                { titulo: `Conceituação - ${modTitulo}`, icone: <LuBrain />, conteudo: (<div className="space-y-4"><p className="text-muted-foreground leading-relaxed">Conteúdo completo sobre {modTitulo.toLowerCase()} para o concurso Petrobras.</p><AlertBox tipo="info" titulo="Conteúdo Premium"><p className="text-sm">Este módulo contém material detalhado para a prova CESGRANRIO.</p></AlertBox></div>) },
                { titulo: `Exemplificação - ${modTitulo}`, icone: <LuBookOpen />, conteudo: (<div className="space-y-4"><p className="text-muted-foreground text-sm">Exemplos práticos de {modTitulo.toLowerCase()} aplicados ao contexto Petrobras.</p></div>) },
                { titulo: "Dicas para a Prova", icone: <LuLightbulb />, conteudo: (<div className="space-y-4"><AlertBox tipo="success" titulo="Dica CESGRANRIO"><p className="text-sm">Foque nos conceitos-chave e diferenças entre termos similares.</p></AlertBox></div>) },
                { titulo: "Exceções e Pegadinhas", icone: <LuTrophy />, conteudo: (<div className="space-y-3"><AlertBox tipo="warning" titulo="Atenção!"><p className="text-sm">Revise os casos especiais mais cobrados em provas.</p></AlertBox></div>) },
              ]} />
            </section>
            <ModuleConsolidation index={num} variant={getModuleVariant(num)} video={{ videoId: "n7U7R8S_XuU", title: modTitulo, duration: "12:00" }} resumoVisual={{ moduloNome: modTitulo, tituloAula: "Gestão de Projetos (PMBOK)", materia: "Administração", images: [{ title: modTitulo, type: "Conceito", placeholderColor: "bg-blue-500/20" }] }} maceteVisual={{ title: modTitulo, content: (<div className="text-sm italic text-left"><p>Resumo visual de {modTitulo.toLowerCase()}</p></div>) }} audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", titulo: modTitulo, artista: "Prof. Administração" }} />
            <section id={`quiz-${mod}`} className="mt-16">
              <QuizInterativo questoes={quiz} titulo={`Fixação - ${modTitulo}`} numero={num} variant={getModuleVariant(num)} icone={num === 10 ? "👑" : "🎯"} onComplete={(score) => handleModuleComplete(mod, score)} />
            </section>
          </div>
        </TabsContent>
      ))}
    </AulaTemplate>
  );
}
