// Planejamento Estratégico - Premium Aula
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
  { id: "modulo-1", label: "Módulo 1", title: "Conceitos Fundamentais" },
  { id: "modulo-2", label: "Módulo 2", title: "Análise SWOT" },
  { id: "modulo-3", label: "Módulo 3", title: "Balanced Scorecard (BSC)" },
  { id: "modulo-4", label: "Módulo 4", title: "Formulação Estratégica" },
  { id: "modulo-5", label: "Módulo 5", title: "Implementação Estratégica" },
  { id: "modulo-6", label: "Módulo 6", title: "Controle e Avaliação" },
  { id: "modulo-7", label: "Módulo 7", title: "Empresas Públicas" },
  { id: "modulo-8", label: "Módulo 8", title: "Cenários e Prospectiva" },
  { id: "modulo-9", label: "Módulo 9", title: "Aplicações Petrobras" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
] as const;

const TEMP_QUIZ = [
  { id: 1, pergunta: "Qual é a finalidade principal do planejamento estratégico?", opcoes: [{ label: "A", valor: "Definir tarefas operacionais diárias" }, { label: "B", valor: "Estabelecer diretrizes de longo prazo para a organização" }, { label: "C", valor: "Controlar o orçamento mensal" }, { label: "D", valor: "Gerenciar conflitos interpessoais" }, { label: "E", valor: "Elaborar relatórios financeiros" }], correta: "B", explicacao: "O planejamento estratégico visa estabelecer a direção de longo prazo da organização, definindo missão, visão, valores, objetivos e estratégias para alcançá-los. É diferente do planejamento operacional (curto prazo) e tático (médio prazo)." },
  { id: 2, pergunta: "A Matriz SWOT analisa:", opcoes: [{ label: "A", valor: "Apenas fatores internos" }, { label: "B", valor: "Apenas fatores externos" }, { label: "C", valor: "Fatores internos e externos" }, { label: "D", valor: "Apenas fatores financeiros" }, { label: "E", valor: "Apenas concorrentes" }], correta: "C", explicacao: "A Matriz SWOT analisa o ambiente interno (Strengths/Forças e Weaknesses/Fraquezas) e o ambiente externo (Opportunities/Oportunidades e Threats/Ameaças). É uma ferramenta completa de diagnóstico estratégico." },
  { id: 3, pergunta: "O BSC possui quantas perspectivas?", opcoes: [{ label: "A", valor: "2" }, { label: "B", valor: "3" }, { label: "C", valor: "4" }, { label: "D", valor: "5" }, { label: "E", valor: "6" }], correta: "C", explicacao: "O Balanced Scorecard (BSC) possui 4 perspectivas: Financeira, Clientes, Processos Internos e Aprendizado/Crescimento. Foi criado por Kaplan e Norton em 1992." },
  { id: 4, pergunta: "As 5 Forças de Porter NÃO incluem:", opcoes: [{ label: "A", valor: "Rivalidade entre concorrentes" }, { label: "B", valor: "Poder de barganha dos fornecedores" }, { label: "C", valor: "Ameaça de produtos substitutos" }, { label: "D", valor: "Análise PESTEL" }, { label: "E", valor: "Ameaça de novos entrantes" }], correta: "D", explicacao: "As 5 Forças de Porter são: 1) Rivalidade entre concorrentes, 2) Poder dos fornecedores, 3) Poder dos compradores, 4) Ameaça de substitutos, 5) Ameaça de novos entrantes. PESTEL é outra ferramenta (análise macro ambiental)." },
];

export default function AulaPlanejamentoEstrategico({
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
      {/* ═══ MÓDULO 1: CONCEITOS FUNDAMENTAIS ═══ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={1}
            titulo="Conceitos Fundamentais de Planejamento Estratégico"
            descricao="Missão, Visão, Valores: a tríade que norteia toda organização."
            gradiente="bg-gradient-to-br from-blue-700 to-sky-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Base do Planejamento"
              description="Entenda missão, visão e valores antes de qualquer estratégia."
              variant={getModuleVariant(1)}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação - O que é Planejamento Estratégico?",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        O <strong>Planejamento Estratégico</strong> é o processo gerencial que estabelece a direção de longo prazo da organização. Envolve definir <strong>onde estamos</strong>, <strong>onde queremos chegar</strong> e <strong>como vamos chegar lá</strong>.
                      </p>
                      <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
                        <p className="font-bold text-blue-700 mb-2">Tríade Estratégica:</p>
                        <div className="space-y-2 text-sm">
                          <p><strong>Missão:</strong> Razão de existir da organização (presente)</p>
                          <p><strong>Visão:</strong> Estado futuro desejado (futuro)</p>
                          <p><strong>Valores:</strong> Princípios que guiam comportamentos</p>
                        </div>
                      </div>
                      <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
                        <p className="font-bold text-blue-700 mb-2">Níveis de Planejamento:</p>
                        <div className="space-y-1 text-sm">
                          <p><strong>Estratégico:</strong> Longo prazo, alta direção, toda empresa</p>
                          <p><strong>Tático:</strong> Médio prazo, gerência, departamental</p>
                          <p><strong>Operacional:</strong> Curto prazo, supervisão, tarefas</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Petrobras na Prática",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">A Petrobras define seu planejamento estratégico em ciclos de 5 anos:</p>
                      <div className="space-y-2">
                        <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20">
                          <p className="font-bold text-blue-700 text-sm">Missão Petrobras</p>
                          <p className="text-xs">"Atuar de forma segura e rentável nas atividades da indústria de óleo, gás e energia"</p>
                        </div>
                        <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20">
                          <p className="font-bold text-blue-700 text-sm">Visão Petrobras</p>
                          <p className="text-xs">"Ser a melhor empresa de energia na geração de valor"</p>
                        </div>
                        <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20">
                          <p className="font-bold text-blue-700 text-sm">Valores</p>
                          <p className="text-xs">Respeito à vida, Integridade, Cooperação, Sustentabilidade, Excelência</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Diferenças Cruciais para a Prova",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="info" titulo="Missão vs. Visão">
                        <div className="text-sm space-y-1">
                          <p><strong>Missão:</strong> O que fazemos HOJE (presente, identidade)</p>
                          <p><strong>Visão:</strong> O que queremos SER (futuro, aspiração)</p>
                          <p className="text-xs text-muted-foreground mt-2">Pegadinha CESGRANRIO: Inverter missão e visão é o erro mais comum!</p>
                        </div>
                      </AlertBox>
                      <AlertBox tipo="warning" titulo="Estratégico vs. Tático">
                        <p className="text-sm">Estratégico é GLOBAL (toda empresa). Tático é DEPARTAMENTAL. Operacional é TAREFA.</p>
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Quando o PE Falha",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-3">
                      <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20">
                        <p className="font-bold text-blue-700 text-sm mb-1">Ambientes Turbulentos (VUCA)</p>
                        <p className="text-xs">Em cenários muito voláteis, o PE rígido pode ser obsoleto antes de implementado</p>
                      </div>
                      <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20">
                        <p className="font-bold text-blue-700 text-sm mb-1">Falta de Engajamento</p>
                        <p className="text-xs">PE sem buy-in da liderança vira "gaveta" — documento esquecido</p>
                      </div>
                      <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20">
                        <p className="font-bold text-blue-700 text-sm mb-1">Pensamento Emergente (Mintzberg)</p>
                        <p className="text-xs">Nem toda estratégia é deliberada; muitas emergem da prática</p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <ModuleConsolidation
            index={1}
            variant={getModuleVariant(1)}
            video={{ videoId: "iV7hKYv0fDc", title: "Planejamento Estratégico: Fundamentos", duration: "18:00" }}
            resumoVisual={{
              moduloNome: "Conceitos de PE",
              tituloAula: "Planejamento Estratégico",
              materia: "Administração",
              images: [
                { title: "Missão, Visão e Valores", type: "Conceito", placeholderColor: "bg-blue-500/20" },
                { title: "Níveis: Estratégico-Tático-Operacional", type: "Estrutura", placeholderColor: "bg-sky-500/20" },
                { title: "Processo de PE", type: "Fluxo", placeholderColor: "bg-cyan-500/20" },
              ],
            }}
            maceteVisual={{
              title: "PE = Missão + Visão + Valores + Estratégia",
              content: (
                <div className="space-y-3 text-left">
                  <p className="text-sm italic">"Missão é o HOJE, Visão é o AMANHÃ, Valores são o SEMPRE."</p>
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg font-mono text-xs text-center">
                    <p>Estratégico → Tático → Operacional</p>
                    <p className="text-muted-foreground">Longo prazo → Médio → Curto</p>
                  </div>
                </div>
              ),
            }}
            audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", titulo: "Conceitos de PE", artista: "Prof. Administração" }}
          />

          <section id="quiz-modulo-1" className="mt-16">
            <QuizInterativo questoes={quizM1} titulo="Fixação - Conceitos de PE" numero={1} variant={getModuleVariant(1)} icone="🧠" onComplete={(score) => handleModuleComplete("modulo-1", score)} />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 2: ANÁLISE SWOT ═══ */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={2} titulo="Análise SWOT" descricao="A ferramenta mais cobrada em provas: Forças, Fraquezas, Oportunidades e Ameaças." gradiente="bg-gradient-to-br from-emerald-600 to-teal-800" />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader index={2} title="Diagnóstico Estratégico" description="Ambiente interno e externo sob a lupa da SWOT." variant={getModuleVariant(2)} />
            <ContentAccordion slides={[
              { titulo: "Conceituação - Matriz SWOT", icone: <LuBrain />, conteudo: (<div className="space-y-4"><p className="text-muted-foreground leading-relaxed">A Análise SWOT (também chamada FOFA em português) é uma ferramenta de diagnóstico estratégico que analisa o <strong>ambiente interno</strong> (Forças e Fraquezas) e o <strong>ambiente externo</strong> (Oportunidades e Ameaças).</p><div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20"><p className="font-bold text-emerald-700 mb-2">Quadrantes SWOT:</p><div className="grid grid-cols-2 gap-2 text-sm"><div className="bg-green-500/10 p-2 rounded"><p className="font-bold text-green-700">S - Strengths (Forças)</p><p className="text-xs">Interno + Positivo</p></div><div className="bg-red-500/10 p-2 rounded"><p className="font-bold text-red-700">W - Weaknesses (Fraquezas)</p><p className="text-xs">Interno + Negativo</p></div><div className="bg-blue-500/10 p-2 rounded"><p className="font-bold text-blue-700">O - Opportunities</p><p className="text-xs">Externo + Positivo</p></div><div className="bg-orange-500/10 p-2 rounded"><p className="font-bold text-orange-700">T - Threats (Ameaças)</p><p className="text-xs">Externo + Negativo</p></div></div></div></div>) },
              { titulo: "Exemplificação - SWOT da Petrobras", icone: <LuBookOpen />, conteudo: (<div className="space-y-4"><div className="space-y-2"><div className="bg-green-500/10 p-3 rounded border border-green-500/20"><p className="font-bold text-green-700 text-sm">Forças</p><p className="text-xs">Expertise em águas profundas, Pré-sal, tecnologia própria</p></div><div className="bg-red-500/10 p-3 rounded border border-red-500/20"><p className="font-bold text-red-700 text-sm">Fraquezas</p><p className="text-xs">Endividamento alto, burocracia estatal, dependência do petróleo</p></div><div className="bg-blue-500/10 p-3 rounded border border-blue-500/20"><p className="font-bold text-blue-700 text-sm">Oportunidades</p><p className="text-xs">Transição energética, biocombustíveis, hidrogênio verde</p></div><div className="bg-orange-500/10 p-3 rounded border border-orange-500/20"><p className="font-bold text-orange-700 text-sm">Ameaças</p><p className="text-xs">Queda do preço do petróleo, regulação ambiental, energias renováveis</p></div></div></div>) },
              { titulo: "Dicas - Interno vs. Externo", icone: <LuLightbulb />, conteudo: (<div className="space-y-4"><AlertBox tipo="info" titulo="Regra de Ouro SWOT"><div className="text-sm space-y-1"><p><strong>INTERNO</strong> (S e W): A empresa CONTROLA — pode mudar</p><p><strong>EXTERNO</strong> (O e T): A empresa NÃO controla — deve se adaptar</p></div></AlertBox><AlertBox tipo="warning" titulo="Pegadinha Clássica"><p className="text-sm">A CESGRANRIO adora trocar interno por externo. "Concorrência" é EXTERNO (ameaça), nunca fraqueza!</p></AlertBox></div>) },
              { titulo: "Exceções - Cruzamento SWOT (TOWS)", icone: <LuTrophy />, conteudo: (<div className="space-y-3"><p className="text-muted-foreground text-sm">Além de listar, cruze os quadrantes para gerar estratégias:</p><div className="space-y-2"><div className="bg-emerald-500/10 p-3 rounded border border-emerald-500/20"><p className="font-bold text-emerald-700 text-sm">SO (Maxi-Maxi)</p><p className="text-xs">Usar forças para aproveitar oportunidades</p></div><div className="bg-emerald-500/10 p-3 rounded border border-emerald-500/20"><p className="font-bold text-emerald-700 text-sm">WO (Mini-Maxi)</p><p className="text-xs">Minimizar fraquezas para aproveitar oportunidades</p></div><div className="bg-emerald-500/10 p-3 rounded border border-emerald-500/20"><p className="font-bold text-emerald-700 text-sm">ST (Maxi-Mini)</p><p className="text-xs">Usar forças para minimizar ameaças</p></div><div className="bg-emerald-500/10 p-3 rounded border border-emerald-500/20"><p className="font-bold text-emerald-700 text-sm">WT (Mini-Mini)</p><p className="text-xs">Minimizar fraquezas e evitar ameaças (defensiva)</p></div></div></div>) },
            ]} />
          </section>
          <ModuleConsolidation index={2} variant={getModuleVariant(2)} video={{ videoId: "iV7hKYv0fDc", title: "SWOT Completo", duration: "15:00" }} resumoVisual={{ moduloNome: "Análise SWOT", tituloAula: "Planejamento Estratégico", materia: "Administração", images: [{ title: "Quadrantes SWOT", type: "Conceito", placeholderColor: "bg-emerald-500/20" }, { title: "Interno vs Externo", type: "Classificação", placeholderColor: "bg-teal-500/20" }, { title: "Cruzamento TOWS", type: "Estratégia", placeholderColor: "bg-green-500/20" }] }} maceteVisual={{ title: "SWOT: S e W = INTERNO, O e T = EXTERNO", content: (<div className="space-y-3 text-left"><p className="text-sm italic">"Força e Fraqueza você controla. Oportunidade e Ameaça você enfrenta."</p></div>) }} audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", titulo: "SWOT Descomplicado", artista: "Prof. Administração" }} />
          <section id="quiz-modulo-2" className="mt-16">
            <QuizInterativo questoes={quizM2} titulo="Fixação - SWOT" numero={2} variant={getModuleVariant(2)} icone="🎯" onComplete={(score) => handleModuleComplete("modulo-2", score)} />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 3: BSC ═══ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={3} titulo="Balanced Scorecard (BSC)" descricao="As 4 perspectivas de Kaplan e Norton para traduzir estratégia em ação." gradiente="bg-gradient-to-br from-amber-600 to-orange-700" />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader index={3} title="As 4 Perspectivas" description="Financeira, Clientes, Processos Internos, Aprendizado." variant={getModuleVariant(3)} />
            <ContentAccordion slides={[
              { titulo: "Conceituação - O que é BSC?", icone: <LuBrain />, conteudo: (<div className="space-y-4"><p className="text-muted-foreground leading-relaxed">O Balanced Scorecard (BSC) é um sistema de gestão estratégica criado por <strong>Robert Kaplan e David Norton (1992)</strong>. Traduz a estratégia em objetivos, indicadores, metas e iniciativas em 4 perspectivas.</p><div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20"><p className="font-bold text-amber-700 mb-2">As 4 Perspectivas:</p><div className="space-y-2 text-sm"><p><strong>1. Financeira:</strong> "Como parecemos para os acionistas?" (ROI, lucro, receita)</p><p><strong>2. Clientes:</strong> "Como os clientes nos veem?" (satisfação, retenção, market share)</p><p><strong>3. Processos Internos:</strong> "Em que devemos ser excelentes?" (qualidade, eficiência, inovação)</p><p><strong>4. Aprendizado e Crescimento:</strong> "Como sustentamos a capacidade de mudar?" (capacitação, TI, cultura)</p></div></div></div>) },
              { titulo: "Exemplificação - Mapa Estratégico", icone: <LuBookOpen />, conteudo: (<div className="space-y-4"><p className="text-muted-foreground text-sm">O Mapa Estratégico mostra as relações de causa e efeito entre as perspectivas:</p><div className="bg-amber-500/10 p-4 rounded border border-amber-500/20 text-sm"><p className="font-bold text-amber-700 mb-2">Cadeia de Causa e Efeito:</p><p>Aprendizado (Treinar equipe) →</p><p>Processos (Melhorar refino) →</p><p>Clientes (Qualidade do combustível) →</p><p>Financeiro (Maior receita)</p></div><AlertBox tipo="success" titulo="Leitura do Mapa"><p className="text-sm">O mapa se lê de BAIXO para CIMA: investir em aprendizado melhora processos, que satisfaz clientes, que gera resultado financeiro.</p></AlertBox></div>) },
              { titulo: "Dicas - BSC na Prova", icone: <LuLightbulb />, conteudo: (<div className="space-y-4"><AlertBox tipo="info" titulo="Ordem das Perspectivas"><div className="text-sm space-y-1"><p>De cima para baixo: <strong>F → C → P → A</strong></p><p>Mnemônico: <strong>"Finanças Com Processos Aprendidos"</strong></p></div></AlertBox><AlertBox tipo="warning" titulo="Cuidado!"><p className="text-sm">BSC NÃO é apenas financeiro! O "Balanced" significa justamente EQUILIBRAR as 4 perspectivas.</p></AlertBox></div>) },
              { titulo: "Exceções - BSC para Setor Público", icone: <LuTrophy />, conteudo: (<div className="space-y-3"><AlertBox tipo="info" titulo="Adaptação para Estatais"><div className="text-sm space-y-1"><p>Em empresas públicas/estatais como a Petrobras, a perspectiva <strong>Clientes/Sociedade</strong> pode ficar no topo, acima da Financeira.</p><p className="text-xs text-muted-foreground mt-1">O objetivo principal não é lucro, mas atender ao interesse público.</p></div></AlertBox></div>) },
            ]} />
          </section>
          <ModuleConsolidation index={3} variant={getModuleVariant(3)} video={{ videoId: "iV7hKYv0fDc", title: "BSC Explicado", duration: "16:00" }} resumoVisual={{ moduloNome: "Balanced Scorecard", tituloAula: "Planejamento Estratégico", materia: "Administração", images: [{ title: "4 Perspectivas BSC", type: "Conceito", placeholderColor: "bg-amber-500/20" }, { title: "Mapa Estratégico", type: "Ferramenta", placeholderColor: "bg-orange-500/20" }, { title: "Causa e Efeito", type: "Relação", placeholderColor: "bg-yellow-500/20" }] }} maceteVisual={{ title: "BSC: F-C-P-A (Finanças Com Processos Aprendidos)", content: (<div className="space-y-3 text-left"><p className="text-sm italic">"Kaplan e Norton criaram em 1992. 4 perspectivas. Mapa estratégico."</p></div>) }} audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", titulo: "BSC na Prática", artista: "Prof. Administração" }} />
          <section id="quiz-modulo-3" className="mt-16">
            <QuizInterativo questoes={quizM3} titulo="Fixação - BSC" numero={3} variant={getModuleVariant(3)} icone="📊" onComplete={(score) => handleModuleComplete("modulo-3", score)} />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULOS 4-10: Estrutura Base ═══ */}
      {[
        { mod: "modulo-4", num: 4, titulo: "Formulação Estratégica", desc: "Porter, Ansoff, estratégias genéricas e vantagem competitiva.", grad: "bg-gradient-to-br from-rose-600 to-pink-800", quiz: quizM4, secTitle: "Estratégias Competitivas", secDesc: "As 5 Forças de Porter e a Matriz de Ansoff." },
        { mod: "modulo-5", num: 5, titulo: "Implementação Estratégica", desc: "Como desdobrar a estratégia em OKRs, metas e planos de ação.", grad: "bg-gradient-to-br from-violet-600 to-purple-800", quiz: quizM5, secTitle: "Da Estratégia à Ação", secDesc: "Desdobramento, OKRs e accountability." },
        { mod: "modulo-6", num: 6, titulo: "Controle e Avaliação", desc: "Indicadores, dashboards e loops de feedback estratégico.", grad: "bg-gradient-to-br from-amber-900 via-amber-500 to-amber-800", quiz: quizM6, secTitle: "Medindo o Sucesso", secDesc: "KPIs, semáforos e revisão estratégica." },
        { mod: "modulo-7", num: 7, titulo: "PE em Empresas Públicas", desc: "PDCA, legislação e particularidades do setor público.", grad: "bg-gradient-to-br from-blue-900 via-blue-500 to-blue-800", quiz: quizM7, secTitle: "Setor Público", secDesc: "PPA, LDO, LOA e planejamento governamental." },
        { mod: "modulo-8", num: 8, titulo: "Cenários e Prospectiva", desc: "Análise de cenários, tendências e planejamento adaptativo.", grad: "bg-gradient-to-br from-emerald-900 via-emerald-500 to-emerald-800", quiz: quizM8, secTitle: "Pensando o Futuro", secDesc: "Cenários, tendências e incerteza." },
        { mod: "modulo-9", num: 9, titulo: "Aplicações Petrobras", desc: "PE no setor de óleo e gás, Plano Estratégico Petrobras 2024-2028.", grad: "bg-gradient-to-br from-rose-900 via-rose-500 to-rose-800", quiz: quizM9, secTitle: "PE na Petrobras", secDesc: "O planejamento estratégico na maior empresa do Brasil." },
        { mod: "modulo-10", num: 10, titulo: "Simulado Mestre", desc: "Teste integrado com questões de todos os módulos.", grad: "bg-gradient-to-br from-violet-900 via-violet-500 to-violet-800", quiz: quizM10, secTitle: "Desafio Final", secDesc: "Prove seu domínio em Planejamento Estratégico!" },
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
            <ModuleConsolidation index={num} variant={getModuleVariant(num)} video={{ videoId: "iV7hKYv0fDc", title: modTitulo, duration: "12:00" }} resumoVisual={{ moduloNome: modTitulo, tituloAula: "Planejamento Estratégico", materia: "Administração", images: [{ title: modTitulo, type: "Conceito", placeholderColor: "bg-blue-500/20" }] }} maceteVisual={{ title: modTitulo, content: (<div className="text-sm italic text-left"><p>Resumo visual de {modTitulo.toLowerCase()}</p></div>) }} audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", titulo: modTitulo, artista: "Prof. Administração" }} />
            <section id={`quiz-${mod}`} className="mt-16">
              <QuizInterativo questoes={quiz} titulo={`Fixação - ${modTitulo}`} numero={num} variant={getModuleVariant(num)} icone={num === 10 ? "👑" : "🎯"} onComplete={(score) => handleModuleComplete(mod, score)} />
            </section>
          </div>
        </TabsContent>
      ))}
    </AulaTemplate>
  );
}
