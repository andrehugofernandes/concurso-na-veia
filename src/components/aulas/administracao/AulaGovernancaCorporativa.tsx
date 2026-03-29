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
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
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
            <ModuleSectionHeader index={1} title="Fundamentos da Governança" description="Princípios IBGC, problema de agência e stakeholders." variant={mv[1]} />
            <ContentAccordion slides={[
              { titulo: "Conceituação - O que é Governança Corporativa?", icone: <LuBrain />, conteudo: (<div className="space-y-4"><p className="text-muted-foreground leading-relaxed"><strong>Governança Corporativa</strong> é o sistema pelo qual as organizações são dirigidas, monitoradas e incentivadas, envolvendo os relacionamentos entre proprietários, conselho de administração, diretoria e órgãos de controle.</p><div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20"><p className="font-bold text-blue-700 mb-2">4 Princípios (IBGC):</p><div className="space-y-2 text-lg"><p><strong>Transparência:</strong> Disponibilizar informações além das obrigatórias</p><p><strong>Equidade:</strong> Tratamento justo para todos os sócios e stakeholders</p><p><strong>Prestação de Contas (Accountability):</strong> Responsabilizar-se pelas decisões</p><p><strong>Responsabilidade Corporativa:</strong> Zelar pela sustentabilidade da organização</p></div></div><div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20"><p className="font-bold text-blue-700 mb-2">Problema de Agência:</p><p className="text-lg">Conflito entre <strong>Principal</strong> (acionista/dono) e <strong>Agente</strong> (gestor). O gestor pode agir em interesse próprio, não do acionista. A governança mitiga isso.</p></div></div>) },
              { titulo: "Exemplificação - Agentes de Governança", icone: <LuBookOpen />, conteudo: (<div className="space-y-4"><div className="space-y-2"><div className="bg-blue-500/10 p-3 rounded border border-blue-500/20"><p className="font-bold text-blue-700 text-lg">Assembleia de Acionistas</p><p className="text-lg">Órgão soberano — elege o Conselho de Administração</p></div><div className="bg-blue-500/10 p-3 rounded border border-blue-500/20"><p className="font-bold text-blue-700 text-lg">Conselho de Administração</p><p className="text-lg">Define estratégia, supervisiona diretoria, protege stakeholders</p></div><div className="bg-blue-500/10 p-3 rounded border border-blue-500/20"><p className="font-bold text-blue-700 text-lg">Diretoria Executiva</p><p className="text-lg">Executa a estratégia, gestão do dia a dia</p></div><div className="bg-blue-500/10 p-3 rounded border border-blue-500/20"><p className="font-bold text-blue-700 text-lg">Conselho Fiscal</p><p className="text-lg">Fiscaliza atos dos administradores e demonstrações financeiras</p></div></div></div>) },
              { titulo: "Dicas - Memorize os Princípios", icone: <LuLightbulb />, conteudo: (<div className="space-y-4"><AlertBox tipo="info" titulo="Mnemônico TEPR"><div className="text-lg space-y-1"><p><strong>T</strong>ransparência</p><p><strong>E</strong>quidade</p><p><strong>P</strong>restação de Contas</p><p><strong>R</strong>esponsabilidade Corporativa</p></div></AlertBox><AlertBox tipo="warning" titulo="Não Confunda!"><p className="text-lg">Equidade ≠ Igualdade. Equidade é tratar de forma JUSTA (proporcional), não necessariamente igual.</p></AlertBox></div>) },
              { titulo: "Exceções - Shareholder vs. Stakeholder", icone: <LuTrophy />, conteudo: (<div className="space-y-3"><div className="bg-blue-500/10 p-3 rounded border border-blue-500/20"><p className="font-bold text-blue-700 text-lg mb-1">Modelo Shareholder (Friedman)</p><p className="text-lg">Empresa existe para maximizar valor para ACIONISTAS</p></div><div className="bg-blue-500/10 p-3 rounded border border-blue-500/20"><p className="font-bold text-blue-700 text-lg mb-1">Modelo Stakeholder (Freeman)</p><p className="text-lg">Empresa deve atender a TODOS os stakeholders (funcionários, comunidade, governo...)</p></div><AlertBox tipo="info" titulo="Tendência Moderna"><p className="text-lg">A governança moderna caminha para o modelo stakeholder, especialmente em estatais como a Petrobras.</p></AlertBox></div>) },
            ]} />
          </section>
          
          <section id="quiz-modulo-1" className="mt-16">












<ModuleConsolidation index={3} variant={mv[1]} video={{ videoId: "b1VjGMSRfMk", title: "Governança Corporativa: Fundamentos", duration: "18:00" }} resumoVisual={{ moduloNome: "Módulo 1", tituloAula: "Governança Corporativa", materia: "Administração", images: [{ title: "4 Princípios IBGC", type: "Conceito", placeholderColor: "bg-blue-500/20" }, { title: "Problema de Agência", type: "Teoria", placeholderColor: "bg-sky-500/20" }, { title: "Agentes de Governança", type: "Estrutura", placeholderColor: "bg-cyan-500/20" }] }} maceteVisual={{ title: "TEPR: Transparência, Equidade, Prestação de Contas, Responsabilidade", content: (<div className="space-y-3 text-left"><p className="text-lg italic">"Principal quer lucro, Agente quer salário. Governança alinha os dois."</p></div>) }} audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", titulo: "Governança: Fundamentos", artista: "Prof. Administração" }} />

                      <QuizInterativo questoes={quizM1} titulo="QUIZ: Conceitos de Governança" numero={4} variant={mv[1]} icone="🧠" onComplete={(score) => handleModuleComplete("modulo-1", score)} />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULOS 2-10 ═══ */}
      {[
        { mod: "modulo-2", num: 2, titulo: "Compliance e Ética Empresarial", desc: "Programas de integridade, código de ética e canais de denúncia.", grad: "bg-gradient-to-br from-emerald-600 to-teal-800", quiz: quizM2, secTitle: "Integridade Corporativa", secDesc: "Compliance, ética e anticorrupção." },
        { mod: "modulo-3", num: 3, titulo: "Gestão de Riscos Corporativos (COSO ERM)", desc: "Framework COSO, apetite a risco e mapa de riscos.", grad: "bg-gradient-to-br from-amber-600 to-orange-700", quiz: quizM3, secTitle: "Framework COSO", secDesc: "Ambiente de controle, avaliação de riscos e monitoramento." },
        { mod: "modulo-4", num: 4, titulo: "Controles Internos", desc: "COSO Internal Control Framework e 5 componentes.", grad: "bg-gradient-to-br from-rose-600 to-pink-800", quiz: quizM4, secTitle: "Sistema de Controles", secDesc: "Ambiente, avaliação, atividades, informação e monitoramento." },
        { mod: "modulo-5", num: 5, titulo: "Lei Sarbanes-Oxley (SOX)", desc: "Seções 302, 404, 906 e impacto na governança.", grad: "bg-gradient-to-br from-violet-600 to-purple-800", quiz: quizM5, secTitle: "SOX na Prática", secDesc: "Responsabilização de executivos e controles internos." },
        { mod: "modulo-6", num: 6, titulo: "Conselho de Administração", desc: "Composição, comitês, independência e melhores práticas.", grad: "bg-gradient-to-br from-amber-900 via-amber-500 to-amber-800", quiz: quizM6, secTitle: "Estruturas de Governança", secDesc: "Conselho, comitês e auditoria." },
        { mod: "modulo-7", num: 7, titulo: "Transparência e Prestação de Contas", desc: "Relatórios, disclosure e comunicação com stakeholders.", grad: "bg-gradient-to-br from-blue-900 via-blue-500 to-blue-800", quiz: quizM7, secTitle: "Accountability", secDesc: "Relatórios integrados e disclosure." },
        { mod: "modulo-8", num: 8, titulo: "Governança em Estatais (Lei 13.303)", desc: "Lei das Estatais, requisitos de governança e transparência.", grad: "bg-gradient-to-br from-emerald-900 via-emerald-500 to-emerald-800", quiz: quizM8, secTitle: "Lei das Estatais", secDesc: "13.303/2016 e suas exigências." },
        { mod: "modulo-9", num: 9, titulo: "Aplicações Petrobras", desc: "Governança na Petrobras: comitês, integridade e lições aprendidas.", grad: "bg-gradient-to-br from-rose-900 via-rose-500 to-rose-800", quiz: quizM9, secTitle: "Governança Petrobras", secDesc: "Da Lava Jato às melhores práticas." },
        { mod: "modulo-10", num: 10, titulo: "Simulado Mestre", desc: "Teste integrado com questões de todos os módulos.", grad: "bg-gradient-to-br from-violet-900 via-violet-500 to-violet-800", quiz: quizM10, secTitle: "Desafio Final", secDesc: "Prove seu domínio em Governança Corporativa!" },
      ].map(({ mod, num, titulo: modTitulo, desc, grad, quiz, secTitle, secDesc }) => (
        <TabsContent key={mod} value={mod} className="space-y-[50px]">
          <div className="space-y-12 animate-in fade-in duration-500">
            <ModuleBanner numero={num} titulo={modTitulo} descricao={desc} gradiente={grad} />
            <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
              <ModuleSectionHeader index={num} title={secTitle} description={secDesc} variant={getModuleVariant(num)} />
              <ContentAccordion slides={[
                { titulo: `Conceituação - ${modTitulo}`, icone: <LuBrain />, conteudo: (<div className="space-y-4"><p className="text-muted-foreground leading-relaxed">Conteúdo completo sobre {modTitulo.toLowerCase()} para o concurso Petrobras.</p><AlertBox tipo="info" titulo="Conteúdo Premium"><p className="text-lg">Material detalhado para a prova CESGRANRIO.</p></AlertBox></div>) },
                { titulo: `Exemplificação - ${modTitulo}`, icone: <LuBookOpen />, conteudo: (<div className="space-y-4"><p className="text-muted-foreground text-lg">Exemplos práticos de {modTitulo.toLowerCase()} aplicados ao contexto Petrobras.</p></div>) },
                { titulo: "Dicas para a Prova", icone: <LuLightbulb />, conteudo: (<div className="space-y-4"><AlertBox tipo="success" titulo="Dica CESGRANRIO"><p className="text-lg">Foque nos conceitos-chave e diferenças entre termos similares.</p></AlertBox></div>) },
                { titulo: "Exceções e Pegadinhas", icone: <LuTrophy />, conteudo: (<div className="space-y-3"><AlertBox tipo="warning" titulo="Atenção!"><p className="text-lg">Revise os casos especiais mais cobrados em provas.</p></AlertBox></div>) },
              ]} />
            </section>
            
            <section id={`quiz-${mod}`} className="mt-16">












<ModuleConsolidation index={num} variant={getModuleVariant(num)} video={{ videoId: "b1VjGMSRfMk", title: modTitulo, duration: "12:00" }} resumoVisual={{ moduloNome: modTitulo, tituloAula: "Governança Corporativa", materia: "Administração", images: [{ title: modTitulo, type: "Conceito", placeholderColor: "bg-blue-500/20" }] }} maceteVisual={{ title: modTitulo, content: (<div className="text-lg italic text-left"><p>Resumo visual de {modTitulo.toLowerCase()}</p></div>) }} audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", titulo: modTitulo, artista: "Prof. Administração" }} />

                          <QuizInterativo questoes={quiz} titulo={`Fixação - ${modTitulo}`} numero={num} variant={getModuleVariant(num)} icone={num === 10 ? "👑" : "🎯"} onComplete={(score) => handleModuleComplete(mod, score)} />
            </section>
          </div>
        </TabsContent>
      ))}
    </AulaTemplate>
  );
}
