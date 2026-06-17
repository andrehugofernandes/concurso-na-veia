// Governança Corporativa - Premium Aula
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
  { id: "modulo-1", label: "Módulo 1", title: "Conceitos de Governança" },
  { id: "modulo-2", label: "Módulo 2", title: "Compliance e Ética" },
  { id: "modulo-3", label: "Módulo 3", title: "Gestão de Riscos (COSO)" },
  { id: "modulo-4", label: "Módulo 4", title: "Controles Internos" },
  { id: "modulo-5", label: "Módulo 5", title: "Lei Sarbanes-Oxley (SOX)" },
  { id: "modulo-6", label: "Módulo 6", title: "Conselho de Administração" },
  { id: "modulo-7", label: "Módulo 7", title: "Transparência" },
  { id: "modulo-8", label: "Módulo 8", title: "Governança em Estatais" },
  { id: "modulo-9", label: "Módulo 9", title: "Aplicações Petrobras" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Geral" },
] as const;

const TEMP_QUIZ = [
  { id: 1, pergunta: "Governança corporativa tem como principal objetivo:", opcoes: [{ label: "A", valor: "Maximizar lucros a qualquer custo" }, { label: "B", valor: "Alinhar interesses entre gestores e stakeholders" }, { label: "C", valor: "Reduzir o número de funcionários" }, { label: "D", valor: "Eliminar todos os riscos" }, { label: "E", valor: "Centralizar decisões na diretoria" }], correta: "B", explicacao: "A governança corporativa visa alinhar os interesses dos gestores (agentes) com os dos acionistas e demais stakeholders (principais), mitigando o problema de agência. Não se trata de maximizar lucros a qualquer custo, mas de fazê-lo de forma ética e transparente." },
  { id: 2, pergunta: "Os 4 princípios básicos da governança corporativa (IBGC) são:", opcoes: [{ label: "A", valor: "Lucro, Crescimento, Expansão, Inovação" }, { label: "B", valor: "Transparência, Equidade, Prestação de Contas, Responsabilidade Corporativa" }, { label: "C", valor: "Planejamento, Organização, Direção, Controle" }, { label: "D", valor: "Eficiência, Eficácia, Efetividade, Economicidade" }, { label: "E", valor: "Legalidade, Impessoalidade, Moralidade, Publicidade" }], correta: "B", explicacao: "O IBGC (Instituto Brasileiro de Governança Corporativa) define 4 princípios: Transparência, Equidade (fairness), Prestação de Contas (accountability) e Responsabilidade Corporativa. A opção E são princípios da administração pública (LIMPE)." },
  { id: 3, pergunta: "A Lei Sarbanes-Oxley (SOX) foi criada em resposta a:", opcoes: [{ label: "A", valor: "Crise de 2008" }, { label: "B", valor: "Escândalos Enron e WorldCom (2001-2002)" }, { label: "C", valor: "Pandemia de COVID-19" }, { label: "D", valor: "Crise do petróleo de 1973" }, { label: "E", valor: "Bolha da internet (2000)" }], correta: "B", explicacao: "A SOX (2002) foi uma resposta direta aos escândalos contábeis da Enron, WorldCom e outras empresas americanas. Estabeleceu regras rígidas de controles internos, auditoria e responsabilização de executivos." },
  { id: 4, pergunta: "O framework COSO é usado principalmente para:", opcoes: [{ label: "A", valor: "Gestão de projetos" }, { label: "B", valor: "Controles internos e gestão de riscos" }, { label: "C", valor: "Marketing digital" }, { label: "D", valor: "Recrutamento e seleção" }, { label: "E", valor: "Logística e supply chain" }], correta: "B", explicacao: "O COSO (Committee of Sponsoring Organizations) é o framework mais utilizado mundialmente para estruturar controles internos e gestão de riscos corporativos (ERM). Possui 5 componentes integrados." },
];

export default function AulaGovernancaCorporativa({
  onComplete, isCompleted, loading, xpGanho = 50,
  currentProgress, onUpdateProgress, titulo, descricao, duracao,
  materiaNome, materiaCor, materiaId, prevTopico, nextTopico,
}: AulaProps) {
    const STORAGE_KEY_PREFIX = "petrobras_quest_aula_governanca_corporativa_";

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
      {/* ═══ MÓDULO 1: CONCEITOS DE GOVERNANÇA ═══ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={1} titulo="Conceitos de Governança Corporativa" descricao="Os princípios, agentes e mecanismos que protegem os stakeholders." gradiente="bg-gradient-to-br from-amber-300 via-amber-500 to-amber-400" />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader index="INTRO" title="Fundamentos da Governança" description="Princípios IBGC, problema de agência e stakeholders." variant="blue" />
            <ContentAccordion slides={[
              { titulo: "Conceituação - O que é Governança Corporativa?", icone: <LuBrain />, conteudo: (<div className="space-y-4"><p className="text-muted-foreground leading-relaxed"><strong>Governança Corporativa</strong> é o sistema pelo qual as organizações são dirigidas, monitoradas e incentivadas, envolvendo os relacionamentos entre proprietários, conselho de administração, diretoria e órgãos de controle.</p><div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20"><p className="font-bold text-blue-700 mb-2">4 Princípios (IBGC):</p><div className="space-y-2 text-lg"><p><strong>Transparência:</strong> Disponibilizar informações além das obrigatórias</p><p><strong>Equidade:</strong> Tratamento justo para todos os sócios e stakeholders</p><p><strong>Prestação de Contas (Accountability):</strong> Responsabilizar-se pelas decisões</p><p><strong>Responsabilidade Corporativa:</strong> Zelar pela sustentabilidade da organização</p></div></div><div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20"><p className="font-bold text-blue-700 mb-2">Problema de Agência:</p><p className="text-lg">Conflito entre <strong>Principal</strong> (acionista/dono) e <strong>Agente</strong> (gestor). O gestor pode agir em interesse próprio, não do acionista. A governança mitiga isso.</p></div></div>) },
              { titulo: "Exemplificação - Agentes de Governança", icone: <LuBookOpen />, conteudo: (<div className="space-y-4"><div className="space-y-2"><div className="bg-blue-500/10 p-3 rounded border border-blue-500/20"><p className="font-bold text-blue-700 text-lg">Assembleia de Acionistas</p><p className="text-lg">Órgão soberano — elege o Conselho de Administração</p></div><div className="bg-blue-500/10 p-3 rounded border border-blue-500/20"><p className="font-bold text-blue-700 text-lg">Conselho de Administração</p><p className="text-lg">Define estratégia, supervisiona diretoria, protege stakeholders</p></div><div className="bg-blue-500/10 p-3 rounded border border-blue-500/20"><p className="font-bold text-blue-700 text-lg">Diretoria Executiva</p><p className="text-lg">Executa a estratégia, gestão do dia a dia</p></div><div className="bg-blue-500/10 p-3 rounded border border-blue-500/20"><p className="font-bold text-blue-700 text-lg">Conselho Fiscal</p><p className="text-lg">Fiscaliza atos dos administradores e demonstrações financeiras</p></div></div></div>) },
              { titulo: "Dicas - Memorize os Princípios", icone: <LuLightbulb />, conteudo: (<div className="space-y-4"><AlertBox tipo="info" titulo="Mnemônico TEPR"><div className="text-lg space-y-1"><p><strong>T</strong>ransparência</p><p><strong>E</strong>quidade</p><p><strong>P</strong>restação de Contas</p><p><strong>R</strong>esponsabilidade Corporativa</p></div></AlertBox><AlertBox tipo="warning" titulo="Não Confunda!"><p className="text-lg">Equidade ≠ Igualdade. Equidade é tratar de forma JUSTA (proporcional), não necessariamente igual.</p></AlertBox></div>) },
              { titulo: "Exceções - Shareholder vs. Stakeholder", icone: <LuTrophy />, conteudo: (<div className="space-y-3"><div className="bg-blue-500/10 p-3 rounded border border-blue-500/20"><p className="font-bold text-blue-700 text-lg mb-1">Modelo Shareholder (Friedman)</p><p className="text-lg">Empresa existe para maximizar valor para ACIONISTAS</p></div><div className="bg-blue-500/10 p-3 rounded border border-blue-500/20"><p className="font-bold text-blue-700 text-lg mb-1">Modelo Stakeholder (Freeman)</p><p className="text-lg">Empresa deve atender a TODOS os stakeholders (funcionários, comunidade, governo...)</p></div><AlertBox tipo="info" titulo="Tendência Moderna"><p className="text-lg">A governança moderna caminha para o modelo stakeholder, especialmente em estatais como a Petrobras.</p></AlertBox></div>) },
            ]} />
          </section>

          <section id="quiz-modulo-1" className="mt-16">
            <ModuleConsolidation index={1} variant="blue" video={{ videoId: "b1VjGMSRfMk", title: "Governança Corporativa: Fundamentos", duration: "18:00" }} resumoVisual={{ moduloNome: "Módulo 1", tituloAula: "Governança Corporativa", materia: "Administração", images: [{ title: "4 Princípios IBGC", type: "Conceito", placeholderColor: "bg-blue-500/20" }, { title: "Problema de Agência", type: "Teoria", placeholderColor: "bg-sky-500/20" }, { title: "Agentes de Governança", type: "Estrutura", placeholderColor: "bg-cyan-500/20" }] }} sinteseEstrategica={{ title: "TEPR: Transparência, Equidade, Prestação de Contas, Responsabilidade", content: (<div className="space-y-3 text-left"><p className="text-lg italic">"Principal quer lucro, Agente quer salário. Governança alinha os dois."</p></div>) }} audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", titulo: "Governança: Fundamentos", artista: "Prof. Administração" }} />
            <QuizInterativo questoes={quizM1} titulo="QUIZ: Conceitos de Governança" numero={1} variant="blue" icone="🧠" onComplete={(score) => handleModuleComplete("modulo-1", score)} />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 2: COMPLIANCE E ÉTICA EMPRESARIAL ═══ */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={2} titulo="Compliance e Ética Empresarial" descricao="Programas de integridade, código de ética e canais de denúncia." gradiente="bg-gradient-to-br from-emerald-600 to-teal-800" />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader index={2} title="Integridade Corporativa" description="Compliance, ética e anticorrupção." variant="blue" />
            <ContentAccordion slides={[
              { titulo: "Conceituação - Compliance e Ética", icone: <LuBrain />, conteudo: (<div className="space-y-4"><p className="text-muted-foreground leading-relaxed"><strong>Compliance</strong> é o cumprimento de leis, regulações, políticas internas e padrões éticos. <strong>Ética</strong> envolve princípios morais que guiam as decisões organizacionais.</p><div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20"><p className="font-bold text-emerald-700 mb-2">Programa de Compliance:</p><div className="space-y-2 text-lg"><p><strong>1. Código de Ética:</strong> Documento que define valores, princípios e comportamentos esperados</p><p><strong>2. Políticas:</strong> Regras claras sobre anticorrupção, conflito de interesse, segurança</p><p><strong>3. Treinamento:</strong> Capacitação periódica de todos os colaboradores</p><p><strong>4. Canais de Denúncia:</strong> Ouvidoria, hotline, mecanismos de proteção ao denunciante</p><p><strong>5. Investigação:</strong> Apuração independente de irregularidades</p><p><strong>6. Disciplina:</strong> Consequências progressivas para violações</p></div></div></div>) },
              { titulo: "Exemplificação - Casos Reais", icone: <LuBookOpen />, conteudo: (<div className="space-y-4"><div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20"><p className="font-bold text-emerald-700 mb-3">Lava Jato (2014-2020) - Petrobras:</p><p className="text-lg mb-2">Maior investigação de corrupção do Brasil. Executivos envolvidos em:</p><ul className="text-lg list-disc list-inside space-y-1"><li>Recebimento de propinas de construtoras</li><li>Superfaturamento de refinarias e navios</li><li>Desvio de bilhões em recursos públicos</li></ul><p className="text-lg font-bold mt-3">Consequência:</p><p className="text-lg">Implementação rigorosa de programa de compliance na Petrobras, auditorias externas contínuas, códigos de conduta revisos.</p></div><div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20"><p className="font-bold text-emerald-700 mb-2">Conflito de Interesse:</p><p className="text-lg">Executivo que participa de licitações onde sua família tem interesse deve se declarar e se afastar.</p></div></div>) },
              { titulo: "Dicas - Questões Comuns", icone: <LuLightbulb />, conteudo: (<div className="space-y-4"><AlertBox tipo="success" titulo="Memorize as 6 Pilares"><p className="text-lg"><strong>CÓDIGO, POLÍTICAS, TREINAMENTO, DENÚNCIA, INVESTIGAÇÃO, DISCIPLINA</strong> — sempre nessa ordem no programa!</p></AlertBox><AlertBox tipo="warning" titulo="pontos de atenção Comum"><p className="text-lg">Ter código de ética NÃO substitui compliance. Você precisa de <strong>educação contínua</strong> e <strong>fiscalização ativa</strong>.</p></AlertBox></div>) },
              { titulo: "Exceções - Conflitos de Interesse", icone: <LuTrophy />, conteudo: (<div className="space-y-3"><div className="bg-emerald-500/10 p-3 rounded border border-emerald-500/20"><p className="font-bold text-emerald-700 text-lg mb-1">Situações que Requerem Transparência:</p><ul className="text-lg list-disc list-inside space-y-1"><li>Executivo que tem parente em fornecedor</li><li>Diretor com investimento em empresa que compete</li><li>Conselheiro que recebe consultoria de auditoria também</li></ul><p className="text-lg mt-2">Nesses casos: <strong>DECLARAR E ABSTER-SE</strong> de votações/decisões.</p></div></div>) },
            ]} />
          </section>
          <section id="quiz-modulo-2" className="mt-16">
            <ModuleConsolidation index={2} variant="blue" video={{ videoId: "b1VjGMSRfMk", title: "Compliance e Ética Empresarial", duration: "16:00" }} resumoVisual={{ moduloNome: "Módulo 2", tituloAula: "Governança Corporativa", materia: "Administração", images: [{ title: "6 Pilares de Compliance", type: "Estrutura", placeholderColor: "bg-emerald-500/20" }, { title: "Lava Jato - Petrobras", type: "Caso Real", placeholderColor: "bg-emerald-500/20" }, { title: "Conflitos de Interesse", type: "Risco", placeholderColor: "bg-red-500/20" }] }} sinteseEstrategica={{ title: "CÓDIGO-POLÍTICAS-TREINAMENTO-DENÚNCIA-INVESTIGAÇÃO-DISCIPLINA", content: (<div className="space-y-2 text-left"><p className="text-lg italic">"Compliance é cultura, não apenas regra."</p></div>) }} audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", titulo: "Compliance e Ética", artista: "Prof. Administração" }} />
            <QuizInterativo questoes={quizM2} titulo="QUIZ: Compliance e Ética" numero={2} variant="blue" icone="✅" onComplete={(score) => handleModuleComplete("modulo-2", score)} />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 3: GESTÃO DE RISCOS (COSO ERM) ═══ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={3} titulo="Gestão de Riscos Corporativos (COSO ERM)" descricao="Framework COSO, apetite a risco e mapa de riscos." gradiente="bg-gradient-to-br from-amber-600 to-orange-700" />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader index={3} title="Framework COSO ERM" description="Gestão integrada de riscos corporativos." variant="blue" />
            <ContentAccordion slides={[
              { titulo: "Conceituação - COSO Enterprise Risk Management", icone: <LuBrain />, conteudo: (<div className="space-y-4"><p className="text-muted-foreground leading-relaxed"><strong>COSO ERM (2004, atualizado 2017)</strong> é um framework para gestão de riscos corporativos que integra riscos em toda a organização.</p><div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20"><p className="font-bold text-amber-700 mb-2">8 Componentes COSO ERM:</p><div className="space-y-2 text-lg"><p><strong>1. Governança e Cultura:</strong> Tom no topo, comitês de risco</p><p><strong>2. Estratégia e Objetivos:</strong> Definir apetite a risco</p><p><strong>3. Identificação de Riscos:</strong> Brainstorming, análise de dados</p><p><strong>4. Avaliação de Riscos:</strong> Matriz probabilidade × impacto</p><p><strong>5. Resposta a Riscos:</strong> Evitar, mitigar, transferir, aceitar</p><p><strong>6. Atividades de Controle:</strong> Segregação de funções, aprovações</p><p><strong>7. Informação e Comunicação:</strong> Reportes gerenciais</p><p><strong>8. Atividades de Monitoramento:</strong> Revisões periódicas do mapa de riscos</p></div></div></div>) },
              { titulo: "Exemplificação - Mapa de Riscos", icone: <LuBookOpen />, conteudo: (<div className="space-y-4"><div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20"><p className="font-bold text-amber-700 mb-3">Exemplo: Refinaria da Petrobras</p><div className="space-y-2 text-lg"><div className="bg-white/10 p-2 rounded"><p><strong>Risco:</strong> Vazamento de óleo</p><p><strong>Probabilidade:</strong> Baixa (2/5)</p><p><strong>Impacto:</strong> Muito Alto (5/5) — ambiental, legal</p><p><strong>Prioridade:</strong> CRÍTICA (2×5=10)</p><p><strong>Resposta:</strong> <strong>MITIGAR</strong> — investir em sistemas de detecção</p></div></div></div><div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20"><p className="font-bold text-amber-700 mb-2">Apetite a Risco:</p><p className="text-lg">Nível máximo de risco que a organização está disposta a aceitar para alcançar seus objetivos. Exemplo: Petrobras tolera risco exploração, não tolera compliance.</p></div></div>) },
              { titulo: "Dicas - Matriz Risco", icone: <LuLightbulb />, conteudo: (<div className="space-y-4"><AlertBox tipo="info" titulo="Matriz Risco Simples"><p className="text-lg"><strong>VERDE (Baixo):</strong> Aceitar | <strong>AMARELO (Médio):</strong> Mitigar | <strong>VERMELHO (Alto):</strong> Mitigar/Evitar</p></AlertBox><AlertBox tipo="success" titulo="CESGRANRIO Cobra"><p className="text-lg">Diferença entre <strong>Risco Bruto</strong> (antes de controles) e <strong>Risco Residual</strong> (após controles).</p></AlertBox></div>) },
              { titulo: "Exceções - Aceitação de Risco", icone: <LuTrophy />, conteudo: (<div className="space-y-3"><div className="bg-amber-500/10 p-3 rounded border border-amber-500/20"><p className="font-bold text-amber-700 text-lg mb-1">Quando ACEITAR Risco?</p><p className="text-lg">Quando o custo da mitigação é maior que o impacto potencial. Exemplo: Investir em segurança contra terremoto em região estável pode ser ineficiente.</p></div></div>) },
            ]} />
          </section>
          <section id="quiz-modulo-3" className="mt-16">
            <ModuleConsolidation index={3} variant="blue" video={{ videoId: "b1VjGMSRfMk", title: "Gestão de Riscos COSO ERM", duration: "20:00" }} resumoVisual={{ moduloNome: "Módulo 3", tituloAula: "Governança Corporativa", materia: "Administração", images: [{ title: "8 Componentes COSO", type: "Framework", placeholderColor: "bg-amber-500/20" }, { title: "Matriz de Riscos", type: "Ferramenta", placeholderColor: "bg-orange-500/20" }, { title: "Risco Bruto vs Residual", type: "Conceito", placeholderColor: "bg-yellow-500/20" }] }} sinteseEstrategica={{ title: "COSO ERM: 8 Passos Integrados", content: (<div className="space-y-2 text-left"><p className="text-lg italic">"Risco bem gerenciado = Oportunidade bem aproveitada"</p></div>) }} audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", titulo: "Gestão de Riscos COSO", artista: "Prof. Administração" }} />
            <QuizInterativo questoes={quizM3} titulo="QUIZ: Gestão de Riscos" numero={3} variant="blue" icone="⚠️" onComplete={(score) => handleModuleComplete("modulo-3", score)} />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 4: CONTROLES INTERNOS ═══ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={4} titulo="Controles Internos" descricao="COSO Internal Control Framework e 5 componentes." gradiente="bg-gradient-to-br from-rose-600 to-pink-800" />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader index={4} title="Sistema de Controles" description="Ambiente, avaliação, atividades, informação e monitoramento." variant="blue" />
            <ContentAccordion slides={[
              { titulo: "Conceituação - COSO Internal Control", icone: <LuBrain />, conteudo: (<div className="space-y-4"><p className="text-muted-foreground leading-relaxed"><strong>COSO IC (1992, atualizado 2013)</strong> define controles internos como processo para garantir:</p><div className="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20"><p className="font-bold text-rose-700 mb-2">5 Componentes COSO IC:</p><div className="space-y-2 text-lg"><p><strong>1. Ambiente de Controle:</strong> Tone at the top, valores éticos, competência</p><p><strong>2. Avaliação de Riscos:</strong> Identificar e analisar riscos para objetivos</p><p><strong>3. Atividades de Controle:</strong> Políticas, procedimentos (aprovações, segregação funções)</p><p><strong>4. Informação e Comunicação:</strong> Dados precisos, comunicação clara dos controles</p><p><strong>5. Monitoramento:</strong> Avaliações contínuas e periódicas de efetividade</p></div></div></div>) },
              { titulo: "Exemplificação - Controles Operacionais", icone: <LuBookOpen />, conteudo: (<div className="space-y-4"><div className="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20"><p className="font-bold text-rose-700 mb-3">Exemplo 1: Segregação de Funções</p><p className="text-lg">A pessoa que <strong>autoriza</strong> pagamento NÃO pode ser a que <strong>executa</strong> nem a que <strong>registra</strong>. Evita fraude.</p></div><div className="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20"><p className="font-bold text-rose-700 mb-3">Exemplo 2: Sistema de Aprovações</p><p className="text-lg">Compras acima de R$50 mil requerem aprovação de 2 gerentes. Protege contra gasto excessivo.</p></div><div className="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20"><p className="font-bold text-rose-700 mb-3">Exemplo 3: Reconciliação Bancária</p><p className="text-lg">Conferência mensal de saldos de caixa vs. banco. Detecta erros ou desvios.</p></div></div>) },
              { titulo: "Dicas - Efetividade de Controles", icone: <LuLightbulb />, conteudo: (<div className="space-y-4"><AlertBox tipo="success" titulo="CESGRANRIO Frequente"><p className="text-lg"><strong>Controle Efetivo</strong> = Atinge objetivo, implementado, monitorado continuamente. NÃO basta ter no papel!</p></AlertBox><AlertBox tipo="warning" titulo="Cuidado"><p className="text-lg">Controle muito severo pode <strong>paralisar operações</strong>. Deve haver equilíbrio entre proteção e eficiência.</p></AlertBox></div>) },
              { titulo: "Exceções - Limitações Inerentes", icone: <LuTrophy />, conteudo: (<div className="space-y-3"><div className="bg-rose-500/10 p-3 rounded border border-rose-500/20"><p className="font-bold text-rose-700 text-lg mb-1">Controles Internos Não Garantem 100% Proteção:</p><ul className="text-lg list-disc list-inside space-y-1"><li><strong>Colusão:</strong> Dois funcionários que se colidem burlam controle</li><li><strong>Erro Humano:</strong> Falha de julgamento do executor</li><li><strong>Custo-Benefício:</strong> Controle muito caro pode não ser viável</li><li><strong>Mudanças:</strong> Novos riscos podem surgir rapidamente</li></ul></div></div>) },
            ]} />
          </section>
          <section id="quiz-modulo-4" className="mt-16">
            <ModuleConsolidation index={4} variant="blue" video={{ videoId: "b1VjGMSRfMk", title: "Controles Internos COSO", duration: "18:00" }} resumoVisual={{ moduloNome: "Módulo 4", tituloAula: "Governança Corporativa", materia: "Administração", images: [{ title: "5 Componentes COSO IC", type: "Framework", placeholderColor: "bg-rose-500/20" }, { title: "Segregação de Funções", type: "Controle", placeholderColor: "bg-pink-500/20" }, { title: "Limitações Inerentes", type: "Risco", placeholderColor: "bg-red-500/20" }] }} sinteseEstrategica={{ title: "COSO IC: Ambiente → Risco → Atividades → Info → Monitoramento", content: (<div className="space-y-2 text-left"><p className="text-lg italic">"Controle não é restrição, é proteção"</p></div>) }} audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", titulo: "Controles Internos", artista: "Prof. Administração" }} />
            <QuizInterativo questoes={quizM4} titulo="QUIZ: Controles Internos" numero={4} variant="blue" icone="🔐" onComplete={(score) => handleModuleComplete("modulo-4", score)} />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 5: LEI SARBANES-OXLEY (SOX) ═══ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={5} titulo="Lei Sarbanes-Oxley (SOX)" descricao="Seções 302, 404, 906 e impacto na governança." gradiente="bg-gradient-to-br from-violet-600 to-purple-800" />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader index={5} title="SOX na Prática" description="Responsabilização de executivos e controles internos." variant="blue" />
            <ContentAccordion slides={[
              { titulo: "Conceituação - Lei Sarbanes-Oxley", icone: <LuBrain />, conteudo: (<div className="space-y-4"><p className="text-muted-foreground leading-relaxed"><strong>SOX (2002)</strong> é lei federal americana que regulamenta empresas listadas em bolsa (NASDAQ, NYSE) para restaurar confiança após escândalos contábeis.</p><div className="bg-violet-500/10 p-4 rounded-xl border border-violet-500/20"><p className="font-bold text-violet-700 mb-2">Seções Principais:</p><div className="space-y-2 text-lg"><p><strong>Seção 302:</strong> CEO e CFO certificam demonstrações financeiras (responsabilidade pessoal, até prisão)</p><p><strong>Seção 404:</strong> Avaliar efetividade de controles internos sobre relatórios financeiros (auditoria externa obrigatória)</p><p><strong>Seção 906:</strong> Penalidade criminal para certificação falsa (até 20 anos de prisão)</p><p><strong>Seção 802:</strong> Destruição de documentos é crime (7 anos)</p><p><strong>Seção 906:</strong> Proteção ao denunciante (whistleblower)</p></div></div></div>) },
              { titulo: "Exemplificação - Impacto na Governança", icone: <LuBookOpen />, conteudo: (<div className="space-y-4"><div className="bg-violet-500/10 p-4 rounded-xl border border-violet-500/20"><p className="font-bold text-violet-700 mb-3">Caso Enron (2001) — Motivou SOX:</p><p className="text-lg"><strong>CEO Kenny Lay</strong> aprovava relatórios que ocultavam US$38 bilhões em dívida. Resultado: Company faliu, 20 mil empregados perderam tudo.</p><p className="text-lg mt-2"><strong>Lição:</strong> A partir de SOX, CEO assina pessoalmente e responde criminalmente.</p></div><div className="bg-violet-500/10 p-4 rounded-xl border border-violet-500/20"><p className="font-bold text-violet-700 mb-3">Petrobras + Lava Jato:</p><p className="text-lg">Embora Petrobras seja brasileira, seu ADR (American Depositary Receipt) é listado em NYSE, logo <strong>sujeita a SOX</strong>. Isso forçou:</p><ul className="text-lg list-disc list-inside space-y-1"><li>Auditoria externa intensificada (Big Four)</li><li>Relatórios de controles internos trimestrais</li><li>Proteção de denunciantes reforçada</li></ul></div></div>) },
              { titulo: "Dicas - Executivos e Responsabilidade", icone: <LuLightbulb />, conteudo: (<div className="space-y-4"><AlertBox tipo="warning" titulo="CESGRANRIO Cobra Sempre"><p className="text-lg"><strong>Seção 302:</strong> CEO/CFO respondem <strong>CRIMINALMENTE</strong> por documentos falsos. Até 20 anos.</p></AlertBox><AlertBox tipo="success" titulo="Defesa Contra Fraude"><p className="text-lg"><strong>Controles Internos Efetivos</strong> (SOX 404) reduzem risco de fraude e protegem o executivo de culpa criminal.</p></AlertBox></div>) },
              { titulo: "Exceções - Aplicação Global", icone: <LuTrophy />, conteudo: (<div className="space-y-3"><div className="bg-violet-500/10 p-3 rounded border border-violet-500/20"><p className="font-bold text-violet-700 text-lg mb-1">Quem se Aplica SOX?</p><p className="text-lg"><strong>Apenas empresas listadas em bolsas americanas</strong> (NASDAQ, NYSE, etc.). Petrobras aplicado porque tem ADR/listagem no exterior.</p><p className="text-lg mt-2"><strong>Brasil:</strong> Lei 11.638/2007 adaptou SOX para empresas brasileiras listadas em BM&FBOVESPA (hoje B3).</p></div></div>) },
            ]} />
          </section>
          <section id="quiz-modulo-5" className="mt-16">
            <ModuleConsolidation index={5} variant="blue" video={{ videoId: "b1VjGMSRfMk", title: "Lei Sarbanes-Oxley SOX", duration: "17:00" }} resumoVisual={{ moduloNome: "Módulo 5", tituloAula: "Governança Corporativa", materia: "Administração", images: [{ title: "Seções Principais SOX", type: "Lei", placeholderColor: "bg-violet-500/20" }, { title: "Caso Enron", type: "História", placeholderColor: "bg-purple-500/20" }, { title: "Impacto Petrobras", type: "Aplicação", placeholderColor: "bg-indigo-500/20" }] }} sinteseEstrategica={{ title: "SOX 302/404/906: Certificação, Controles, Responsabilidade", content: (<div className="space-y-2 text-left"><p className="text-lg italic">"Com grande poder vem grande responsabilidade (criminal)"</p></div>) }} audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", titulo: "Lei Sarbanes-Oxley", artista: "Prof. Administração" }} />
            <QuizInterativo questoes={quizM5} titulo="QUIZ: Lei Sarbanes-Oxley" numero={5} variant="blue" icone="⚖️" onComplete={(score) => handleModuleComplete("modulo-5", score)} />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 6: CONSELHO DE ADMINISTRAÇÃO ═══ */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={6} titulo="Conselho de Administração" descricao="Composição, comitês, independência e melhores práticas." gradiente="bg-gradient-to-br from-amber-900 via-amber-500 to-amber-800" />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader index={6} title="Estruturas de Governança" description="Conselho, comitês e auditoria." variant="blue" />
            <ContentAccordion slides={[
              { titulo: "Conceituação - Conselho de Administração", icone: <LuBrain />, conteudo: (<div className="space-y-4"><p className="text-muted-foreground leading-relaxed"><strong>Conselho de Administração (CA)</strong> é órgão colegial eleito pela Assembleia que define estratégia, supervisiona executivos e protege stakeholders.</p><div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20"><p className="font-bold text-amber-700 mb-2">Composição Recomendada:</p><div className="space-y-2 text-lg"><p><strong>Independentes:</strong> Sem vínculo com empresa (min. 30%, ideal 50%)</p><p><strong>Conselheiros Externos:</strong> Podem ter vínculo pequeno mas trazem visão nova</p><p><strong>Presidente do CA:</strong> Idealmente diferente de CEO (separação)</p><p><strong>Tamanho:</strong> 5-11 membros (equilíbrio entre diversidade e agilidade)</p></div></div><div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20"><p className="font-bold text-amber-700 mb-2">Comitês Importantes:</p><div className="space-y-2 text-lg"><p><strong>Auditoria:</strong> Supervisiona auditores, revisa controles</p><p><strong>Compliance/Risco:</strong> Monitora ERM e programa de integridade</p><p><strong>Remuneração:</strong> Define bônus e incentivos de executivos</p><p><strong>Sucessão:</strong> Planeja transição de CEO e lideranças críticas</p></div></div></div>) },
              { titulo: "Exemplificação - Conselho Petrobras", icone: <LuBookOpen />, conteudo: (<div className="space-y-4"><div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20"><p className="font-bold text-amber-700 mb-3">Governança Petrobras Pós-Lava Jato:</p><p className="text-lg mb-2"><strong>Antes:</strong> Conselho fraco, CEO muito poderoso, partido político interferia</p><p className="text-lg"><strong>Depois (2016+):</strong></p><ul className="text-lg list-disc list-inside space-y-1"><li>Aumentado independência do CA (Lei 13.303)</li><li>Criado Comitê de Conformidade e Integridade</li><li>Auditoria externa contínua (Big Four)</li><li>Relatórios ESG anuais obrigatórios</li></ul></div><div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20"><p className="font-bold text-amber-700 mb-2">Estrutura Atual:</p><p className="text-lg">9 conselheiros, 30% independentes, Comitês de Auditoria, Risco/Compliance, Remuneração, Sucessão.</p></div></div>) },
              { titulo: "Dicas - Independência é Chave", icone: <LuLightbulb />, conteudo: (<div className="space-y-4"><AlertBox tipo="success" titulo="Memorize"><p className="text-lg"><strong>Conselheiro Independente:</strong> Sem relacionamento com empresa, acionistas relevantes ou executivos em últimos 3 anos.</p></AlertBox><AlertBox tipo="warning" titulo="pontos de atenção"><p className="text-lg">Conselheiro que é fornecedor da empresa <strong>NÃO é independente</strong>, mesmo que não tenha vínculo legal direto.</p></AlertBox></div>) },
              { titulo: "Exceções - Conflito de Interesse no CA", icone: <LuTrophy />, conteudo: (<div className="space-y-3"><div className="bg-amber-500/10 p-3 rounded border border-amber-500/20"><p className="font-bold text-amber-700 text-lg mb-1">Situações de Conflito:</p><ul className="text-lg list-disc list-inside space-y-1"><li><strong>Votação sobre aquisição:</strong> Conselheiro que é CEO de empresa alvo se afasta</li><li><strong>Decisão sobre auditoria:</strong> Conselheiro que é sócio de auditoria eleita não vota</li><li><strong>Bônus executivos:</strong> Comitê de Remuneração analisa, não o CA todo</li></ul><p className="text-lg mt-2"><strong>Regra:</strong> Afastar-se da discussão e votação quando há interesse pessoal.</p></div></div>) },
            ]} />
          </section>
          <section id="quiz-modulo-6" className="mt-16">
            <ModuleConsolidation index={6} variant="blue" video={{ videoId: "b1VjGMSRfMk", title: "Conselho de Administração", duration: "19:00" }} resumoVisual={{ moduloNome: "Módulo 6", tituloAula: "Governança Corporativa", materia: "Administração", images: [{ title: "Composição CA", type: "Estrutura", placeholderColor: "bg-amber-500/20" }, { title: "Comitês Especializados", type: "Governance", placeholderColor: "bg-amber-600/20" }, { title: "Independência", type: "Qualidade", placeholderColor: "bg-amber-400/20" }] }} sinteseEstrategica={{ title: "CA: Estratégia, Supervisão, Proteção - Mínimo 30% Independentes", content: (<div className="space-y-2 text-left"><p className="text-lg italic">"Bom conselho desconfia, não delega cegamente"</p></div>) }} audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", titulo: "Conselho de Administração", artista: "Prof. Administração" }} />
            <QuizInterativo questoes={quizM6} titulo="QUIZ: Conselho de Administração" numero={6} variant="blue" icone="👥" onComplete={(score) => handleModuleComplete("modulo-6", score)} />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 7: TRANSPARÊNCIA E PRESTAÇÃO DE CONTAS ═══ */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={7} titulo="Transparência e Prestação de Contas" descricao="Relatórios, disclosure e comunicação com stakeholders." gradiente="bg-gradient-to-br from-blue-900 via-blue-500 to-blue-800" />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader index={7} title="Accountability" description="Relatórios integrados e disclosure." variant="blue" />
            <ContentAccordion slides={[
              { titulo: "Conceituação - Transparência e Disclosure", icone: <LuBrain />, conteudo: (<div className="space-y-4"><p className="text-muted-foreground leading-relaxed"><strong>Transparência</strong> é disponibilizar informações completas, precisas e em tempo hábil. <strong>Disclosure</strong> é o ato de revelar informações material.</p><div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20"><p className="font-bold text-blue-700 mb-2">Tipos de Relatórios:</p><div className="space-y-2 text-lg"><p><strong>Relatório Anual:</strong> Demonstrações financeiras auditadas + análise gerencial</p><p><strong>Relatório Trimestral (ITR):</strong> Informações contábeis não auditadas mas revisadas</p><p><strong>Relatório Integrado:</strong> Combina financeiro + ambiental + social (IIRC)</p><p><strong>Relatório de Sustentabilidade:</strong> GRI, ESG, emissões de CO₂</p><p><strong>Avisos Relevantes:</strong> Eventos que afetam preço da ação (aquisições, litígios)</p></div></div></div>) },
              { titulo: "Exemplificação - Práticas de Disclosure", icone: <LuBookOpen />, conteudo: (<div className="space-y-4"><div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20"><p className="font-bold text-blue-700 mb-3">Relatório Integrado Petrobras:</p><p className="text-lg mb-2">Publicado anualmente, inclui:</p><ul className="text-lg list-disc list-inside space-y-1"><li><strong>Financeiro:</strong> Receita, EBITDA, fluxo de caixa</li><li><strong>Operacional:</strong> Produção de petróleo (bbl/dia), refinarias</li><li><strong>Ambiental:</strong> Emissões Escopo 1,2,3 (meta net-zero 2050)</li><li><strong>Social:</strong> Diversidade, acidentes de trabalho (TRIR), comunidades</li><li><strong>Governança:</strong> Independência CA, execuções Lava Jato, integridade</li></ul></div><div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20"><p className="font-bold text-blue-700 mb-2">Aviso Relevante Exemplo:</p><p className="text-lg">"Petrobras anuncia aumento de preços de combustíveis em 10% a partir de amanhã" — isso move mercado, deve ser divulgado imediatamente.</p></div></div>) },
              { titulo: "Dicas - Informação Material", icone: <LuLightbulb />, conteudo: (<div className="space-y-4"><AlertBox tipo="info" titulo="Definição Material"><p className="text-lg">Informação é <strong>material</strong> se sua omissão/falsidade afetaria decisão de investidor. Teste: "Isso influencia meu voto/compra de ação?"</p></AlertBox><AlertBox tipo="success" titulo="CESGRANRIO Frequente"><p className="text-lg"><strong>Insider Trading:</strong> É crime usar informação privilegiada (não divulgada) para comprar/vender ações. A transparência (disclosure) previne isso.</p></AlertBox></div>) },
              { titulo: "Exceções - Sigilo vs. Transparência", icone: <LuTrophy />, conteudo: (<div className="space-y-3"><div className="bg-blue-500/10 p-3 rounded border border-blue-500/20"><p className="font-bold text-blue-700 text-lg mb-1">Informações que Podem Não Ser Divulgadas:</p><ul className="text-lg list-disc list-inside space-y-1"><li><strong>Segredo industrial:</strong> Tecnologia proprietária (receita de óleo)</li><li><strong>Negociação em andamento:</strong> Até assinatura de contrato (M&A em sigilo)</li><li><strong>Litígio confidencial:</strong> Por ordem judicial até sentença</li><li><strong>Segurança nacional:</strong> Instalações militares, infraestrutura crítica</li></ul><p className="text-lg mt-2"><strong>Limite:</strong> Sigilo não pode ser usado para ocultar fraude ou illegalidade.</p></div></div>) },
            ]} />
          </section>
          <section id="quiz-modulo-7" className="mt-16">
            <ModuleConsolidation index={7} variant="blue" video={{ videoId: "b1VjGMSRfMk", title: "Transparência e Prestação de Contas", duration: "16:00" }} resumoVisual={{ moduloNome: "Módulo 7", tituloAula: "Governança Corporativa", materia: "Administração", images: [{ title: "Tipos de Relatórios", type: "Disclosure", placeholderColor: "bg-blue-500/20" }, { title: "Relatório Integrado", type: "Comunicação", placeholderColor: "bg-cyan-500/20" }, { title: "Informação Material", type: "Conceito", placeholderColor: "bg-sky-500/20" }] }} sinteseEstrategica={{ title: "Transparência: Financeiro + Ambiental + Social + Governança", content: (<div className="space-y-2 text-left"><p className="text-lg italic">"Transparência total reduz custos de capital"</p></div>) }} audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", titulo: "Transparência e Disclosure", artista: "Prof. Administração" }} />
            <QuizInterativo questoes={quizM7} titulo="QUIZ: Transparência" numero={7} variant="blue" icone="📊" onComplete={(score) => handleModuleComplete("modulo-7", score)} />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 8: GOVERNANÇA EM ESTATAIS (LEI 13.303) ═══ */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={8} titulo="Governança em Estatais (Lei 13.303)" descricao="Lei das Estatais, requisitos de governança e transparência." gradiente="bg-gradient-to-br from-emerald-900 via-emerald-500 to-emerald-800" />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader index={8} title="Lei das Estatais" description="13.303/2016 e suas exigências." variant="blue" />
            <ContentAccordion slides={[
              { titulo: "Conceituação - Lei 13.303/2016", icone: <LuBrain />, conteudo: (<div className="space-y-4"><p className="text-muted-foreground leading-relaxed"><strong>Lei 13.303/2016</strong> regulamenta estatais (Petrobras, Caixa, BNDES) para melhorar governança, combater corrupção e aumentar eficiência.</p><div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20"><p className="font-bold text-emerald-700 mb-2">Objetivos Principais:</p><div className="space-y-2 text-lg"><p><strong>1. Profissionalizar Gestão:</strong> Eliminar influência política direta nas decisões operacionais</p><p><strong>2. Conselho Independente:</strong> Maioria dos conselheiros (min. 50%) sem vínculo político</p><p><strong>3. Auditoria Rigorosa:</strong> Auditoria interna independente, externa obrigatória (Big Four)</p><p><strong>4. Transparência Total:</strong> Relatórios anuais, divulgação de critérios de seleção de executivos</p><p><strong>5. Combate à Corrupção:</strong> Programa de Integridade, Código de Ética, Ouvidoria</p></div></div></div>) },
              { titulo: "Exemplificação - Petrobras Pós-Lava Jato", icone: <LuBookOpen />, conteudo: (<div className="space-y-4"><div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20"><p className="font-bold text-emerald-700 mb-3">Cronologia da Lava Jato (Petrobras):</p><p className="text-lg"><strong>2009-2014:</strong> Fraude massiva — executivos e construtoras recebem propinas</p><p className="text-lg"><strong>2014 (Março):</strong> Operação Lava Jato inicia investigação</p><p className="text-lg"><strong>2015:</strong> CEO Graça Foster renuncia, reveladas descobertas contábeis</p><p className="text-lg"><strong>2016:</strong> Lei 13.303 promulgada (resposta legal)</p><p className="text-lg"><strong>2017+:</strong> Reestruturação total de governança, CFO novos, Comitê de Integridade criado</p></div><div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20"><p className="font-bold text-emerald-700 mb-2">Resultado Atual:</p><p className="text-lg">Petrobras é agora modelo de governança em estatais brasileiras (listada em NYSE, IBGC Nível 1).</p></div></div>) },
              { titulo: "Dicas - Requisitos Lei 13.303", icone: <LuLightbulb />, conteudo: (<div className="space-y-4"><AlertBox tipo="success" titulo="Memorize os 5 Pilares"><p className="text-lg"><strong>Profissionalização, Independência, Auditoria, Transparência, Integridade</strong></p></AlertBox><AlertBox tipo="warning" titulo="Diferença Importante"><p className="text-lg"><strong>Lei 13.303 é APENAS para estatais brasileiras.</strong> Petrobras, Caixa, BNDES, Banco do Brasil precisam cumprir. Empresa privada segue Lei 6.404 (Lei das S.A.).</p></AlertBox></div>) },
              { titulo: "Exceções - Concessões à Realidade", icone: <LuTrophy />, conteudo: (<div className="space-y-3"><div className="bg-emerald-500/10 p-3 rounded border border-emerald-500/20"><p className="font-bold text-emerald-700 text-lg mb-1">Casos Especiais Lei 13.303:</p><ul className="text-lg list-disc list-inside space-y-1"><li><strong>Minoritárias:</strong> Estatal que controla empresa subsidiária pode ter menos independência lá</li><li><strong>Segurança Nacional:</strong> Petrobras pré-sal pode ter restrições de disclosure por segurança</li><li><strong>Mandatos Políticos:</strong> Lei permite 1 conselheiro indicado pelo governo, mas não pode ser maioria</li></ul></div></div>) },
            ]} />
          </section>
          <section id="quiz-modulo-8" className="mt-16">
            <ModuleConsolidation index={8} variant="blue" video={{ videoId: "b1VjGMSRfMk", title: "Lei 13.303 - Estatais", duration: "17:00" }} resumoVisual={{ moduloNome: "Módulo 8", tituloAula: "Governança Corporativa", materia: "Administração", images: [{ title: "Lei 13.303/2016", type: "Regulação", placeholderColor: "bg-emerald-500/20" }, { title: "Lava Jato", type: "Contexto", placeholderColor: "bg-red-500/20" }, { title: "Governança Petrobras", type: "Aplicação", placeholderColor: "bg-emerald-600/20" }] }} sinteseEstrategica={{ title: "Lei 13.303: 50% Independência, Auditoria Rigorosa, Integridade Total", content: (<div className="space-y-2 text-left"><p className="text-lg italic">"Estatal que governa bem atrai investidores"</p></div>) }} audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", titulo: "Lei 13.303 e Estatais", artista: "Prof. Administração" }} />
            <QuizInterativo questoes={quizM8} titulo="QUIZ: Lei 13.303" numero={8} variant="blue" icone="📜" onComplete={(score) => handleModuleComplete("modulo-8", score)} />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 9: APLICAÇÕES PETROBRAS ═══ */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={9} titulo="Aplicações Petrobras" descricao="Governança na Petrobras: comitês, integridade e lições aprendidas." gradiente="bg-gradient-to-br from-rose-900 via-rose-500 to-rose-800" />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader index={9} title="Governança Petrobras" description="Da Lava Jato às melhores práticas." variant="blue" />
            <ContentAccordion slides={[
              { titulo: "Conceituação - Estrutura de Governança Petrobras", icone: <LuBrain />, conteudo: (<div className="space-y-4"><p className="text-muted-foreground leading-relaxed">A Petrobras, como estatal listada em NYSE e conformidade SOX + Lei 13.303, implementou governança de classe mundial.</p><div className="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20"><p className="font-bold text-rose-700 mb-2">Estrutura Atual Petrobras:</p><div className="space-y-2 text-lg"><p><strong>Assembleia de Acionistas:</strong> 50% Estado, 50% Mercado (cotistas privados)</p><p><strong>Conselho de Administração:</strong> 9 membros, 30% independentes, presidido por personalidade de mercado</p><p><strong>Comitês:</strong> Auditoria, Conformidade/Integridade, Remuneração, Sucessão, Saúde/Segurança/Meio Ambiente</p><p><strong>Diretoria Executiva:</strong> CEO + 5-6 Diretores (Financeiro, Operações, Exploração, Refino, etc.)</p><p><strong>Auditoria Interna:</strong> Independente, reporta ao CA</p><p><strong>Compliance:</strong> Diretor de Conformidade, programa de integridade, ouvidoria 24/7</p></div></div></div>) },
              { titulo: "Exemplificação - Casos Reais Petrobras", icone: <LuBookOpen />, conteudo: (<div className="space-y-4"><div className="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20"><p className="font-bold text-rose-700 mb-3">Lições da Lava Jato na Petrobras:</p><p className="text-lg"><strong>Antes:</strong> CEO Graça Foster ignorava sinais de fraude, conselho fraco, auditoria interna comprometida</p><p className="text-lg"><strong>Fraudes Detectadas:</strong></p><ul className="text-lg list-disc list-inside space-y-1"><li>Superfaturamento refinaria Abreu e Lima (Pernambuco): R$ 4 bilhões</li><li>Navios-tanque não entregues: R$ 5 bilhões</li><li>Esquema propinas construtoras (Odebrecht, Andrade Gutierrez): R$ 2 bilhões</li></ul><p className="text-lg mt-2"><strong>Depois:</strong> CEO Pedro Parente + Castello Branco implementaram:</p><ul className="text-lg list-disc list-inside space-y-1"><li>Auditoria interna triplicada em pessoal</li><li>Programa "Fale Seguro" (ouvidoria anônima)</li><li>Políticas rígidas de seleção de fornecedores</li><li>Relatórios integrados anuais (ESG)</li></ul></div></div>) },
              { titulo: "Dicas - Pontos Frequentes em Prova", icone: <LuLightbulb />, conteudo: (<div className="space-y-4"><AlertBox tipo="success" titulo="Cobra CESGRANRIO"><p className="text-lg">Petrobras é listada em <strong>NYSE</strong> → sujeita a <strong>SOX</strong> (seções 302, 404). CEO/CFO certificam pessoalmente.</p></AlertBox><AlertBox tipo="info" titulo="Lei 13.303"><p className="text-lg">Petrobras deve ter <strong>Programa de Integridade</strong> formal, <strong>Ouvidoria</strong>, <strong>Código de Ética</strong> atualizados.</p></AlertBox></div>) },
              { titulo: "Exceções - Dilemas da Estatal Privada", icone: <LuTrophy />, conteudo: (<div className="space-y-3"><div className="bg-rose-500/10 p-3 rounded border border-rose-500/20"><p className="font-bold text-rose-700 text-lg mb-1">Conflito: Lucro vs. Interesse Público</p><p className="text-lg"><strong>Dilema:</strong> Petrobras é empresa pública, mas precisa gerar lucro. Estado exige dividendos, mercado exige preços competitivos.</p><p className="text-lg mt-2"><strong>Exemplo:</strong> Em 2021-2022, governo pressionou Petrobras a reduzir preço de combustível (eleições), Conselho resistiu em nome dos acionistas minoritários. Governança funcionou!</p></div></div>) },
            ]} />
          </section>
          <section id="quiz-modulo-9" className="mt-16">
            <ModuleConsolidation index={9} variant="blue" video={{ videoId: "b1VjGMSRfMk", title: "Governança Petrobras na Prática", duration: "18:00" }} resumoVisual={{ moduloNome: "Módulo 9", tituloAula: "Governança Corporativa", materia: "Administração", images: [{ title: "Estrutura Governança Petrobras", type: "Organograma", placeholderColor: "bg-rose-500/20" }, { title: "Lava Jato: Lições", type: "Caso Real", placeholderColor: "bg-red-500/20" }, { title: "Programa de Integridade", type: "Compliance", placeholderColor: "bg-rose-600/20" }] }} sinteseEstrategica={{ title: "Petrobras: 50% Estado, 50% Mercado, Governança Mundial", content: (<div className="space-y-2 text-left"><p className="text-lg italic">"Governança forte protege empresa E acionistas"</p></div>) }} audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", titulo: "Governança Petrobras", artista: "Prof. Administração" }} />
            <QuizInterativo questoes={quizM9} titulo="QUIZ: Aplicações Petrobras" numero={9} variant="blue" icone="🏢" onComplete={(score) => handleModuleComplete("modulo-9", score)} />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 10: Simulado Geral ═══ */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={10} titulo="Simulado Geral - Governança Corporativa" descricao="Teste integrado com questões de todos os módulos. Prove seu domínio!" gradiente="bg-gradient-to-br from-violet-900 via-violet-500 to-violet-800" />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader index={10} title="Desafio Final" description="Consolidação de conhecimentos - 10 questões integradas." variant="blue" />
            <ContentAccordion slides={[
              { titulo: "Como Usar este Simulado", icone: <LuBrain />, conteudo: (<div className="space-y-4"><p className="text-muted-foreground leading-relaxed">Este simulado consolida os 9 módulos anteriores e simula questões CESGRANRIO reais.</p><div className="bg-violet-500/10 p-4 rounded-xl border border-violet-500/20"><p className="font-bold text-violet-700 mb-2">Estratégia:</p><div className="space-y-2 text-lg"><p><strong>1. Leia cada questão 2x:</strong> Identifique a pontos de atenção (alternativa que parece correta mas não é)</p><p><strong>2. Retire palavras-chave:</strong> "Governança", "Compliance", "Controle", "Risco", "Independência"</p><p><strong>3. Elimine absurdas:</strong> Opções que mentem descaradamente</p><p><strong>4. Entre as 2 restantes, foque em nuances:</strong> Qual é MAIS correta?</p></div></div></div>) },
              { titulo: "Tópicos Cobertos", icone: <LuBookOpen />, conteudo: (<div className="space-y-4"><div className="bg-violet-500/10 p-4 rounded-xl border border-violet-500/20"><p className="font-bold text-violet-700 mb-2">Questões por Módulo:</p><p className="text-lg"><strong>1x Conceitos (M1)</strong> | <strong>1x Compliance (M2)</strong> | <strong>1x Riscos COSO (M3)</strong> | <strong>1x Controles (M4)</strong> | <strong>1x SOX (M5)</strong> | <strong>1x CA (M6)</strong> | <strong>1x Transparência (M7)</strong> | <strong>1x Lei 13.303 (M8)</strong> | <strong>1x Petrobras (M9)</strong> | <strong>1x Integrada (Todos)</strong></p></div></div>) },
              { titulo: "Boas Práticas para Provas CESGRANRIO", icone: <LuLightbulb />, conteudo: (<div className="space-y-4"><AlertBox tipo="success" titulo="Timing"><p className="text-lg">Não gaste mais de 3 min por questão. Se não sabe, pule e volta depois.</p></AlertBox><AlertBox tipo="info" titulo="Marque Padrões"><p className="text-lg">CESGRANRIO adora cobrar: "Qual é NÃO é", "Qual é CORRETO", "Qual é EXCEÇÃO". Leia o verbo com atenção.</p></AlertBox></div>) },
              { titulo: "Após Completar Este Simulado", icone: <LuTrophy />, conteudo: (<div className="space-y-3"><div className="bg-violet-500/10 p-3 rounded border border-violet-500/20"><p className="font-bold text-violet-700 text-lg mb-2">Parabéns! ESPECIALISTA EM GOVERNANÇA CORPORATIVA</p><p className="text-lg">Você completou todos os 10 módulos e está pronto para a prova CESGRANRIO de Administração.</p><p className="text-lg mt-2"><strong>Próximas ações:</strong></p><ul className="text-lg list-disc list-inside space-y-1"><li>Revisar módulos com score baixo</li><li>Resolver questões antigas de CESGRANRIO</li><li>Praticar com simulados online</li><li>Consolidar mentalmente os frameworks (COSO, IBGC, Lei 13.303)</li></ul></div></div>) },
            ]} />
          </section>
          <section id="quiz-modulo-10" className="mt-16">
            <ModuleConsolidation index={10} variant="blue" video={{ videoId: "b1VjGMSRfMk", title: "Simulado Final Governança", duration: "22:00" }} resumoVisual={{ moduloNome: "Módulo 10 - Simulado", tituloAula: "Governança Corporativa", materia: "Administração", images: [{ title: "9 Módulos Integrados", type: "Consolidação", placeholderColor: "bg-violet-500/20" }, { title: "10 Questões CESGRANRIO", type: "Simulado", placeholderColor: "bg-purple-500/20" }, { title: "Score ≥70% = Aprovado", type: "Critério", placeholderColor: "bg-indigo-500/20" }] }} sinteseEstrategica={{ title: "Governança Corporativa Masterclass: 10 Módulos Concluídos!", content: (<div className="space-y-2 text-left"><p className="text-lg italic font-bold">"A melhor governança é aquela que funciona em crise"</p></div>) }} audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", titulo: "Simulado Final Governança", artista: "Prof. Administração" }} />
            <QuizInterativo questoes={quizM10} titulo="👑 Simulado Geral - Governança Corporativa" numero={10} variant="blue" icone="👑" onComplete={(score) => handleModuleComplete("modulo-10", score)} />
          </section>
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
