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
  LuShieldCheck,
  LuFileText,
  LuSearch,
  LuAward,
  LuTriangleAlert,
  LuLayers,
  LuDatabase
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
  { id: "modulo-11", label: "Módulo 11", title: "PE Petrobras 2024-2028 (Pro)" },
  { id: "glossario", label: "Glossário", title: "Terminologia Técnica" },
  { id: "faq", label: "FAQ", title: "Detector de Pegadinhas" },
  { id: "banco-questoes", label: "Questões", title: "Super Banco Cesgranrio" },
] as const;

import { QUIZ_PLANEJAMENTO } from "@/data/quizzes/planejamento-quizzes";

export default function AulaPlanejamentoEstrategico({
  onComplete, isCompleted, loading, xpGanho = 50,
  currentProgress, onUpdateProgress, titulo, descricao, duracao,
  materiaNome, materiaCor, materiaId, prevTopico, nextTopico,
}: AulaProps) {
  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

  // Estados dos Quizzes carregados do arquivo externo
  const quizM1 = QUIZ_PLANEJAMENTO["modulo-1"];
  const quizM2 = QUIZ_PLANEJAMENTO["modulo-2"];
  const quizM3 = QUIZ_PLANEJAMENTO["modulo-3"];
  const quizM4 = QUIZ_PLANEJAMENTO["modulo-4"];
  const quizM5 = QUIZ_PLANEJAMENTO["modulo-5"];
  const quizM6 = QUIZ_PLANEJAMENTO["modulo-6"];
  const quizM7 = QUIZ_PLANEJAMENTO["modulo-7"];
  const quizM8 = QUIZ_PLANEJAMENTO["modulo-8"];
  const quizM9 = QUIZ_PLANEJAMENTO["modulo-9"];
  const quizM10 = QUIZ_PLANEJAMENTO["modulo-10"];
  const quizM11 = QUIZ_PLANEJAMENTO["modulo-1"]; // Usaremos o M1 como base ou questões locais
  const quizGlossario = []; // Referência apenas
  const quizFAQ = []; // Referência apenas
  const quizBanco = []; // Referência apenas

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
                  titulo: "Conceituação - A Essência da Estratégia",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-muted-foreground leading-relaxed">
                        O <strong>Planejamento Estratégico (PE)</strong> transcende a simples definição de metas. É um processo organizacional de adaptação ao ambiente, onde a alta administração estabelece a <strong>direção de longo prazo</strong>. Diferente dos planos rotineiros, o PE foca na <strong>eficácia</strong> (fazer a coisa certa) e na criação de valor sustentável.
                      </p>
                      
                      <div className="bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 shadow-sm space-y-4">
                        <p className="font-bold text-blue-700 flex items-center gap-2">
                           <LuTarget className="w-5 h-5" /> Atributos do Planejamento Estratégico:
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <li className="flex gap-2">
                            <span className="text-blue-500 font-bold">•</span>
                            <span><strong>Holicidade:</strong> Abrange a organização como um todo (visão sistêmica).</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-blue-500 font-bold">•</span>
                            <span><strong>Longo Prazo:</strong> Projeções que costumam variar de 5 a 10 anos.</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-blue-500 font-bold">•</span>
                            <span><strong>Incerteza:</strong> Lida com variáveis ambientais não controláveis.</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-blue-500 font-bold">•</span>
                            <span><strong>Decisões Irreversíveis:</strong> Envolve grandes alocações de capital (CAPEX).</span>
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-4">
                        <p className="font-bold text-lg text-blue-800 tracking-tight">A Tríade Fundamental:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 shadow-sm transition-all hover:border-blue-400">
                            <p className="font-black text-blue-600 mb-1 uppercase tracking-tighter">Missão</p>
                            <p className="text-[11px] leading-tight text-muted-foreground">O propósito atual. "Por que existimos?". Define o negócio e os clientes atendidos hoje.</p>
                          </div>
                          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 shadow-sm transition-all hover:border-blue-400">
                            <p className="font-black text-blue-600 mb-1 uppercase tracking-tighter">Visão</p>
                            <p className="text-[11px] leading-tight text-muted-foreground">A aspiração futura. "Onde queremos chegar?". É o farol que ilumina o destino final.</p>
                          </div>
                          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 shadow-sm transition-all hover:border-blue-400">
                            <p className="font-black text-blue-600 mb-1 uppercase tracking-tighter">Valores</p>
                            <p className="text-[11px] leading-tight text-muted-foreground">O DNA ético. Princípios que regem o comportamento interno e externo.</p>
                          </div>
                        </div>
                      </div>

                      <table className="w-full text-xs border-collapse rounded-lg overflow-hidden border border-slate-200">
                        <thead>
                          <tr className="bg-slate-100 dark:bg-slate-800">
                            <th className="p-3 text-left border-b border-slate-200">Nível</th>
                            <th className="p-3 text-left border-b border-slate-200">Responsáveis</th>
                            <th className="p-3 text-left border-b border-slate-200">Foco</th>
                            <th className="p-3 text-left border-b border-slate-200">Prazo</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="p-3 border-b border-slate-100 font-bold text-blue-700">Estratégico</td>
                            <td className="p-3 border-b border-slate-100">Alta Cúpula / Diretoria</td>
                            <td className="p-3 border-b border-slate-100">Eficácia / Organização Integral</td>
                            <td className="p-3 border-b border-slate-100 text-muted-foreground">Longo (5+ anos)</td>
                          </tr>
                          <tr className="bg-slate-50/50 dark:bg-slate-800/20">
                            <td className="p-3 border-b border-slate-100 font-bold text-blue-700">Tático</td>
                            <td className="p-3 border-b border-slate-100">Gerência Média</td>
                            <td className="p-3 border-b border-slate-100">Articulação / Departamentos</td>
                            <td className="p-3 border-b border-slate-100 text-muted-foreground">Médio (1-3 anos)</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-bold text-blue-700">Operacional</td>
                            <td className="p-3">Supervisores / Equipes</td>
                            <td className="p-3">Eficiência / Tarefas e Rotinas</td>
                            <td className="p-3 text-muted-foreground">Curto (Imediato)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação - Petrobras: O Caso Real 2024-2028",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-muted-foreground text-sm italic">
                        Para a prova, você deve conhecer como a Petrobras aplica esses conceitos no seu <strong>Plano Estratégico (PE 2024-2028)</strong>:
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-500/5 p-5 rounded-2xl border-l-8 border-blue-600 shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                             <p className="font-black text-blue-800 text-xs uppercase tracking-widest">Missão Petrobras</p>
                             <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[9px] font-bold">PRESENTE</span>
                          </div>
                          <p className="text-sm leading-relaxed">
                            "Prover energia que move a sociedade e contribui para o desenvolvimento do Brasil, de forma ética, segura e com foco na sustentabilidade."
                          </p>
                        </div>

                        <div className="bg-slate-500/5 p-5 rounded-2xl border-l-8 border-emerald-600 shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                             <p className="font-black text-emerald-800 text-xs uppercase tracking-widest">Visão Petrobras</p>
                             <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-[9px] font-bold">FUTURO</span>
                          </div>
                          <p className="text-sm leading-relaxed font-medium">
                            "Ser a melhor empresa de energia na geração de valor, liderando a transição energética justa no Brasil."
                          </p>
                        </div>
                      </div>

                      <div className="p-5 bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/10 dark:to-emerald-900/10 rounded-2xl border border-blue-200/50">
                        <p className="font-bold text-blue-900 dark:text-blue-100 mb-4 text-center">Níveis de Planejamento na Petrobras:</p>
                        <div className="space-y-3">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-1 bg-blue-600 rounded-full"></div>
                            <p className="text-xs"><strong>Estratégico:</strong> Plano 2024-2028 (Direção Geral: Exploração, Eólicas, Descarbonização).</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-1 bg-blue-400 rounded-full"></div>
                            <p className="text-xs"><strong>Tático:</strong> Plano de Negócios da Gerência de Refino (Modernização de Abreu e Lima).</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-1 bg-blue-200 rounded-full"></div>
                            <p className="text-xs"><strong>Operacional:</strong> Procedimento de segurança em plataforma (Troca de válvula no FPSO).</p>
                          </div>
                        </div>
                      </div>

                      <AlertBox tipo="info" titulo="O 'Hóspede' na Estratégia">
                        <p className="text-xs">
                          O Governo Federal, como acionista majoritário, exerce influência no PE através do Conselho de Administração. Isso significa que o planejamento da Petrobras também deve estar alinhado com as políticas públicas de energia do país (PPA e PDE).
                        </p>
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas - Sniper Cesgranrio",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <AlertBox tipo="danger" titulo="PEGADINHA: EFICÁCIA vs EFICIÊNCIA">
                          <p className="text-xs leading-relaxed">
                            A Cesgranrio vai dizer que o Planejamento Estratégico foca na <strong>Eficiência</strong>. <br/>
                            <strong>FALSO!</strong> O nível estratégico foca na <strong>EFICÁCIA</strong> (resultados globais). Eficiência é foco do nível OPERACIONAL (meios/recursos).
                          </p>
                        </AlertBox>

                        <div className="p-5 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                          <p className="font-bold text-amber-800 text-sm mb-3 flex items-center gap-2">
                            <LuTarget className="w-4 h-4" /> Palavras-Chave de Prova:
                          </p>
                          <ul className="space-y-2 text-xs">
                            <li><strong>Estratégico:</strong> Global, Estabilidade, Mudança, Longo Prazo, Ambiguidade.</li>
                            <li><strong>Operacional:</strong> Pormenorizado, Curto Prazo, Rotina, Tarefa, Precisão.</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-slate-900 text-emerald-400 p-5 rounded-2xl font-mono text-xs border-l-4 border-emerald-500 shadow-xl">
                        <p className="text-emerald-500 font-black mb-2 uppercase">// MACETE ATÔMICO</p>
                        <p>MISSÃO = M de MÃE (Quem sou eu hoje, o que eu faço agora)</p>
                        <p>VISÃO = V de VIAGEM (Onde eu quero chegar no futuro)</p>
                        <p className="mt-2 text-white/50 italic opacity-80">Se a questão disser "Imagem do futuro", marque VISÃO sem medo.</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções - Inflexibilidade e Disrupção",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Apesar da teoria clássica, a realidade impõe limites ao planejamento rígido. Conheça as exceções mais cobradas:
                      </p>
                      
                      <div className="space-y-4">
                        <div className="p-5 bg-rose-500/5 rounded-2xl border border-rose-500/20">
                          <p className="font-bold text-rose-700 text-sm mb-2 flex items-center gap-2">
                            <LuRepeat className="w-4 h-4" /> Planejamento Adaptativo vs. Rígido
                          </p>
                          <p className="text-xs">
                            Em ambientes de <strong>extrema volatilidade</strong> (como o preço do petróleo), o planejamento não pode ser um dogma. Empresas modernas usam <strong>estratégias emergentes</strong> — aquelas que surgem da necessidade e da prática, independentemente do que foi escrito no plano original de janeiro.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-orange-500/10 rounded-xl">
                             <p className="font-bold text-orange-800 text-[11px] mb-1">A Falácia da Predição</p>
                             <p className="text-[10px] opacity-80">Achar que o futuro será apenas uma repetição melhorada do passado (Cuidado com projeções lineares!).</p>
                          </div>
                          <div className="p-4 bg-orange-500/10 rounded-xl">
                             <p className="font-bold text-orange-800 text-[11px] mb-1">A Miopia Estratégica</p>
                             <p className="text-[10px] opacity-80">Focar tanto na visão de longo prazo que se esquece das ameaças imediatas no ambiente operacional.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>



          <section id="quiz-modulo-1" className="mt-16">
          





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
                { 
                  titulo: "Conceituação - A Matriz SWOT (FOFA)", 
                  icone: <LuBrain />, 
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-muted-foreground leading-relaxed">
                        A Análise <strong>SWOT</strong> (ou <strong>FOFA</strong>: Forças, Oportunidades, Fraquezas e Ameaças) é a ferramenta diagnóstica mais versátil da gestão. Ela permite cruzar o olhar para dentro da empresa (Ambiente Interno) com a observação do horizonte (Ambiente Externo).
                      </p>
                      
                      <div className="bg-emerald-500/10 p-5 rounded-2xl border border-emerald-500/20 shadow-inner">
                        <p className="font-bold text-emerald-700 mb-4 flex items-center gap-2">
                           <LuTarget className="w-5 h-5" /> Dinâmica da Matriz:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                          <div className="bg-white/40 dark:bg-black/20 p-4 rounded-xl border border-green-200">
                            <p className="font-bold text-green-700 flex items-center gap-1">💪 S - Strengths (Forças)</p>
                            <p className="text-xs mt-1 text-muted-foreground">Fatores <strong>internos</strong> positivos que a empresa controla. Vantagens competitivas.</p>
                          </div>
                          <div className="bg-white/40 dark:bg-black/20 p-4 rounded-xl border border-red-200">
                            <p className="font-bold text-red-700 flex items-center gap-1">⚠️ W - Weaknesses (Fraquezas)</p>
                            <p className="text-xs mt-1 text-muted-foreground">Fatores <strong>internos</strong> negativos. Gaps de competência ou recursos.</p>
                          </div>
                          <div className="bg-white/40 dark:bg-black/20 p-4 rounded-xl border border-blue-200">
                            <p className="font-bold text-blue-700 flex items-center gap-1">🌟 O - Opportunities (Oportunidades)</p>
                            <p className="text-xs mt-1 text-muted-foreground">Fatores <strong>externos</strong> positivos. Janelas de mercado não controláveis.</p>
                          </div>
                          <div className="bg-white/40 dark:bg-black/20 p-4 rounded-xl border border-orange-200">
                            <p className="font-bold text-orange-700 flex items-center gap-1">🔥 T - Threats (Ameaças)</p>
                            <p className="text-xs mt-1 text-muted-foreground">Fatores <strong>externos</strong> negativos. Pressões ou riscos fora do controle.</p>
                          </div>
                        </div>
                      </div>

                      <AlertBox tipo="info" titulo="O Conceito de Controlabilidade">
                         <p className="text-sm leading-relaxed">
                           Identifique o ambiente pela <strong>capacidade de controle</strong>: 
                           Se a gestão pode mudar diretamente (ex: contratar, treinar, investir), é <strong>Mundo Interno</strong>. 
                           Se a gestão apenas reage (ex: câmbio, leis, clima, concorrência), é <strong>Mundo Externo</strong>.
                         </p>
                      </AlertBox>
                    </div>
                  ) 
                },
                { 
                  titulo: "Exemplificação - SWOT Petrobras: Caso de Estudo", 
                  icone: <LuBookOpen />, 
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Ao analisar a Petrobras, os estrategistas separam ativos e competências (interno) de variáveis macroeconômicas (externo).
                      </p>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-green-500/5 rounded-xl border border-green-500/20">
                            <p className="font-black text-green-700 text-[10px] uppercase">Força: Tecnologia de Águas Ultraprofundas</p>
                            <p className="text-xs italic mt-1 text-muted-foreground">"Liderança mundial na exploração do Pré-sal e premiações da OTC."</p>
                          </div>
                          <div className="p-4 bg-orange-500/5 rounded-xl border border-orange-500/20">
                            <p className="font-black text-orange-700 text-[10px] uppercase">Ameaça: Transição Global para Renováveis</p>
                            <p className="text-xs italic mt-1 text-muted-foreground">"Pressão de fundos de investimento para descarbonização rápida."</p>
                          </div>
                          <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                            <p className="font-black text-blue-700 text-[10px] uppercase">Oportunidade: Margem Equatorial</p>
                            <p className="text-xs italic mt-1 text-muted-foreground">"Novas fronteiras geológicas que podem repor reservas estratégicas."</p>
                          </div>
                          <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/20">
                            <p className="font-black text-red-700 text-[10px] uppercase">Fraqueza: Dependência de Fornecedores Únicos</p>
                            <p className="text-xs italic mt-1 text-muted-foreground">"Vulnerabilidade na cadeia de suprimentos de sondas especiais."</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) 
                },
                { 
                  titulo: "Dicas - Estratégias de Cruzamento (TOWS)", 
                  icone: <LuLightbulb />, 
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-muted-foreground text-sm">A prova não quer apenas que você liste, mas que você <strong>cruze</strong> os fatores:</p>
                      <div className="space-y-3">
                        <div className="flex gap-4 p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 items-center transition-all hover:scale-[1.02]">
                          <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-black">SO</div>
                          <div className="flex-1">
                             <p className="font-bold text-sm">Desenvolvimento/Ofensiva</p>
                             <p className="text-xs opacity-70">Use sua Força para agarrar a Oportunidade.</p>
                          </div>
                        </div>
                        <div className="flex gap-4 p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20 items-center transition-all hover:scale-[1.02]">
                          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-black">WO</div>
                          <div className="flex-1">
                             <p className="font-bold text-sm">Crescimento/Melhoria</p>
                             <p className="text-xs opacity-70">Reduza Fraquezas para conseguir aproveitar Oportunidades.</p>
                          </div>
                        </div>
                        <div className="flex gap-4 p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20 items-center transition-all hover:scale-[1.02]">
                          <div className="w-10 h-10 bg-amber-600 text-white rounded-full flex items-center justify-center font-black">ST</div>
                          <div className="flex-1">
                             <p className="font-bold text-sm">Manutenção/Confronto</p>
                             <p className="text-xs opacity-70">Use sua Força para mitigar ou enfrentar Ameaças.</p>
                          </div>
                        </div>
                        <div className="flex gap-4 p-4 bg-rose-500/10 rounded-2xl border border-rose-500/20 items-center transition-all hover:scale-[1.02]">
                          <div className="w-10 h-10 bg-rose-600 text-white rounded-full flex items-center justify-center font-black">WT</div>
                          <div className="flex-1">
                             <p className="font-bold text-sm">Sobrevivência/Defensiva</p>
                             <p className="text-xs opacity-70">Minimize Fraquezas e tente escapar de Ameaças (Pior cenário).</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) 
                },
                { 
                  titulo: "Exceções - Quando a SWOT Falha", 
                  icone: <LuTrophy />, 
                  conteudo: (
                    <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                      <p>
                        A SWOT é frequentemente criticada por ser subjetiva demais. O que um gestor vê como "Força", outro pode ver como "Fraqueza" (ex: "Cultura Conservadora").
                      </p>
                      <div className="bg-orange-500/10 p-4 rounded-xl border-l-4 border-orange-500">
                        <p className="font-bold text-orange-800 mb-1">Cuidado com Listas Infinitas!</p>
                        <p className="text-xs underline">Swot é sobre priorização.</p>
                        <p className="text-xs">Uma matriz com 50 itens em cada quadrante perde o foco estratégico e paralisa a decisão.</p>
                      </div>
                    </div>
                  ) 
                },
              ]} />
          </section>
          
          <section id="quiz-modulo-2" className="mt-16">




<ModuleConsolidation index={2} variant={getModuleVariant(2)} video={{ videoId: "iV7hKYv0fDc", title: "SWOT Completo", duration: "15:00" }} resumoVisual={{ moduloNome: "Análise SWOT", tituloAula: "Planejamento Estratégico", materia: "Administração", images: [{ title: "Quadrantes SWOT", type: "Conceito", placeholderColor: "bg-emerald-500/20" }, { title: "Interno vs Externo", type: "Classificação", placeholderColor: "bg-teal-500/20" }, { title: "Cruzamento TOWS", type: "Estratégia", placeholderColor: "bg-green-500/20" }] }} maceteVisual={{ title: "SWOT: S e W = INTERNO, O e T = EXTERNO", content: (<div className="space-y-3 text-left"><p className="text-sm italic">"Força e Fraqueza você controla. Oportunidade e Ameaça você enfrenta."</p></div>) }} audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", titulo: "SWOT Descomplicado", artista: "Prof. Administração" }} />

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
              { 
                titulo: "Conceituação - O que é BSC (Balanced Scorecard)?", 
                icone: <LuBrain />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      O <strong>Balanced Scorecard (BSC)</strong>, desenvolvido por Kaplan e Norton em 1992, surgiu para corrigir a miopia da gestão baseada apenas em indicadores financeiros. O BSC propõe uma visão equilibrada (<i>balanced</i>) que traduz a visão e a estratégia em objetivos concretos em quatro perspectivas fundamentais.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20 shadow-sm">
                        <p className="font-bold text-amber-800 border-b border-amber-500/30 pb-2 mb-3">📈 Perspectiva Financeira</p>
                        <p className="text-xs leading-relaxed">Foca no valor gerado para os acionistas. Exemplos: ROE (Retorno sobre Patrimônio), Fluxo de Caixa Livre e Redução de Custos Operacionais.</p>
                      </div>
                      <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20 shadow-sm">
                        <p className="font-bold text-amber-800 border-b border-amber-500/30 pb-2 mb-3">👥 Perspectiva de Clientes</p>
                        <p className="text-xs leading-relaxed">Foca na proposta de valor e participação de mercado. Exemplos: NPS (Satisfação), Taxa de Retenção e Market Share no mercado de GN.</p>
                      </div>
                      <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 shadow-sm">
                        <p className="font-bold text-emerald-800 border-b border-emerald-500/30 pb-2 mb-3">⚙️ Processos Internos</p>
                        <p className="text-xs leading-relaxed">Foca na excelência operacional e inovação. Exemplos: Tempo de ciclo de perfuração, Custo de Extração (Lifting Cost) e HSE.</p>
                      </div>
                      <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20 shadow-sm">
                        <p className="font-bold text-blue-800 border-b border-blue-500/30 pb-2 mb-3">🌱 Aprendizado e Crescimento</p>
                        <p className="text-xs leading-relaxed">Foca nas pessoas, cultura e sistemas. Exemplos: Horas de treinamento, Disponibilidade de TI e Clima Organizacional.</p>
                      </div>
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Exemplificação - O Mapa Estratégico Petrobras", 
                icone: <LuBookOpen />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground text-sm">
                      O <strong>Mapa Estratégico</strong> é a representação visual da estratégia. Na Petrobras, os objetivos são interconectados por relações de causa e efeito:
                    </p>
                    <div className="relative p-6 bg-slate-100 dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700">
                      <div className="flex flex-col gap-3 items-center">
                        <div className="bg-amber-600 text-white p-2 rounded-lg text-[10px] w-full text-center font-bold">GERAR VALOR PARA ACIONISTAS E SOCIEDADE</div>
                        <div className="w-1 h-4 bg-slate-400"></div>
                        <div className="bg-blue-600 text-white p-2 rounded-lg text-[10px] w-full text-center font-bold">PROPORCIONAR EXCELENTE EXPERIÊNCIA AOS CLIENTES</div>
                        <div className="w-1 h-4 bg-slate-400"></div>
                        <div className="bg-emerald-600 text-white p-2 rounded-lg text-[10px] w-full text-center font-bold">AVANÇAR NA TRANSIÇÃO ENERGÉTICA E DESCARBONIZAÇÃO</div>
                        <div className="w-1 h-4 bg-slate-400"></div>
                        <div className="bg-slate-700 text-white p-2 rounded-lg text-[10px] w-full text-center font-bold">CULTURA DE ALTA PERFORMANCE E CAPACITAÇÃO</div>
                      </div>
                    </div>
                    <p className="text-xs text-center text-muted-foreground italic">Representação simplificada de fluxos do BSC.</p>
                  </div>
                ) 
              },
              { 
                titulo: "Dicas - Não erre na Cesgranrio", 
                icone: <LuLightbulb />, 
                conteudo: (
                  <div className="space-y-5">
                    <AlertBox tipo="warning" titulo="DIFERENCIE INDICADOR DE INICIATIVA">
                      <p className="text-sm leading-relaxed">
                        Muitas questões confundem <strong>Indicadores</strong> (como medimos?) com <strong>Iniciativas</strong> (o que faremos?).
                      </p>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="p-2 bg-white/50 rounded border border-orange-200 text-[10px]">
                           <strong>Indicador:</strong> % de redução de carbono.
                        </div>
                        <div className="p-2 bg-white/50 rounded border border-blue-200 text-[10px]">
                           <strong>Iniciativa:</strong> Instalar filtros de nova tecnologia.
                        </div>
                      </div>
                    </AlertBox>

                    <div className="bg-blue-500/5 p-4 rounded-xl border-l-4 border-blue-500">
                       <p className="font-bold text-sm text-blue-900 mb-1">Mnemônico das Perspectivas:</p>
                       <p className="text-xs"><strong>F</strong>inanças <strong>C</strong>om <strong>P</strong>rocessos <strong>A</strong>prendidos (F - C - P - A)</p>
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Exceções - BSC no Setor Público (Diferencial)", 
                icone: <LuTrophy />, 
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Lembre-se: em organizações sem fins lucrativos ou setor público, a hierarquia muda.
                    </p>
                    <div className="bg-orange-500/5 p-4 rounded-xl border border-orange-500/20">
                       <p className="font-bold text-orange-800 text-xs mb-2">Inversão de Topo:</p>
                       <p className="text-xs">
                         Enquanto empresas privadas buscam o lucro (Financeira no topo), as públicas buscam o <strong>Impacto Social / Atendimento ao Cidadão</strong>. Portanto, a perspectiva "Clientes/Sociedade" sobe para o topo do mapa, e a financeira passa a ser uma <strong>restrição orçamentária</strong> (meio, e não fim).
                       </p>
                    </div>
                  </div>
                ) 
              },
            ]} />
          </section>
          
          <section id="quiz-modulo-3" className="mt-16">




<ModuleConsolidation index={3} variant={getModuleVariant(3)} video={{ videoId: "iV7hKYv0fDc", title: "BSC Explicado", duration: "16:00" }} resumoVisual={{ moduloNome: "Balanced Scorecard", tituloAula: "Planejamento Estratégico", materia: "Administração", images: [{ title: "4 Perspectivas BSC", type: "Conceito", placeholderColor: "bg-amber-500/20" }, { title: "Mapa Estratégico", type: "Ferramenta", placeholderColor: "bg-orange-500/20" }, { title: "Causa e Efeito", type: "Relação", placeholderColor: "bg-yellow-500/20" }] }} maceteVisual={{ title: "BSC: F-C-P-A (Finanças Com Processos Aprendidos)", content: (<div className="space-y-3 text-left"><p className="text-sm italic">"Kaplan e Norton criaram em 1992. 4 perspectivas. Mapa estratégico."</p></div>) }} audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", titulo: "BSC na Prática", artista: "Prof. Administração" }} />

                      <QuizInterativo questoes={quizM3} titulo="Fixação - BSC" numero={3} variant={getModuleVariant(3)} icone="📊" onComplete={(score) => handleModuleComplete("modulo-3", score)} />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 4: FORMULAÇÃO ESTRATÉGICA (UNROLLED) ═══ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={4} titulo="Formulação Estratégica" descricao="Porter, Ansoff e a escolha do caminho competitivo." gradiente="bg-gradient-to-br from-rose-600 to-pink-800" />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader index={4} title="Estratégias Competitivas" description="As 5 Forças de Porter e a Matriz de Ansoff." variant={getModuleVariant(4)} />
            <ContentAccordion slides={[
              { 
                titulo: "Conceituação - As 5 Forças de Porter", 
                icone: <LuBrain />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      Michael Porter revolucionou a estratégia ao analisar a <strong>Atratividade do Setor</strong>. Segundo ele, a rentabilidade de uma empresa não depende apenas dela, mas de 5 forças competitivas:
                    </p>
                    <div className="space-y-3">
                      <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-200">
                         <p className="text-sm font-bold text-rose-800 tracking-tight">1. Rivalidade entre Concorrentes</p>
                         <p className="text-xs text-muted-foreground">A intensidade da disputa por market share.</p>
                      </div>
                      <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-200">
                         <p className="text-sm font-bold text-rose-800 tracking-tight">2. Poder de Negociação dos Fornecedores</p>
                         <p className="text-xs text-muted-foreground">Quando poucos fornecedores dominam insumos críticos.</p>
                      </div>
                      <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-200">
                         <p className="text-sm font-bold text-rose-800 tracking-tight">3. Poder de Negociação dos Clientes</p>
                         <p className="text-xs text-muted-foreground">Capacidade do comprador de forçar preços para baixo.</p>
                      </div>
                      <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-200">
                         <p className="text-sm font-bold text-rose-800 tracking-tight">4. Ameaça de Novos Entrantes</p>
                         <p className="text-xs text-muted-foreground">Barreiras de entrada como escala e regulação.</p>
                      </div>
                      <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-200">
                         <p className="text-sm font-bold text-rose-800 tracking-tight">5. Ameaça de Produtos Substitutos</p>
                         <p className="text-xs text-muted-foreground">Novas tecnologias que tornam seu produto obsoleto.</p>
                      </div>
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Exemplificação - Petrobras e o Pré-sal", 
                icone: <LuBookOpen />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground text-sm">
                      Na Petrobras, a <strong>Barreira de Entrada</strong> é gigantesca devido ao capital necessário para operar em águas ultraprofundas (Força 4). Entretanto, a <strong>Ameaça de Substitutos</strong> (Força 5) vem crescendo com o barateamento da energia solar e veículos elétricos.
                    </p>
                    <AlertBox tipo="info" titulo="Estratégias Genéricas de Porter:">
                       <ul className="text-xs space-y-2 list-disc list-inside">
                         <li><strong>Liderança em Custo:</strong> Ser o produtor mais eficiente (ex: Petróleo com baixo custo de extração).</li>
                         <li><strong>Diferenciação:</strong> Ter um produto único (ex: Combustíveis premium com aditivos exclusivos).</li>
                         <li><strong>Enfoque (Nicho):</strong> Focar em um segmento geográfico ou de produto específico.</li>
                       </ul>
                    </AlertBox>
                  </div>
                ) 
              },
              { 
                titulo: "Dicas - Matriz de Ansoff", 
                icone: <LuLightbulb />, 
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-sm">A Matriz de Ansoff foca no <strong>Crescimento</strong>:</p>
                    <table className="w-full text-[10px] border-collapse">
                      <thead>
                        <tr className="bg-rose-500/20">
                          <th className="border p-2"></th>
                          <th className="border p-2">Produtos Existentes</th>
                          <th className="border p-2">Novos Produtos</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border p-2 font-bold">Mercados Existentes</td>
                          <td className="border p-2 bg-emerald-500/5"><strong>Penetração</strong> (Vender mais do mesmo)</td>
                          <td className="border p-2"><strong>Desenv. de Produto</strong> (Criar novos itens)</td>
                        </tr>
                        <tr>
                          <td className="border p-2 font-bold">Novos Mercados</td>
                          <td className="border p-2"><strong>Desenv. de Mercado</strong> (Novas regiões)</td>
                          <td className="border p-2 bg-rose-500/10"><strong>Diversificação</strong> (Novo produto + Novo mercado)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) 
              },
              { 
                titulo: "Exceções - Inconsistência na Estratégia", 
                icone: <LuTrophy />, 
                conteudo: (
                  <div className="space-y-4">
                    <AlertBox tipo="danger" titulo="MEIO-TERMO (STUCK IN THE MIDDLE)">
                       <p className="text-sm leading-relaxed">
                         Segundo Porter, o maior perigo é não escolher. Uma empresa que tenta ter custo baixo E ser diferenciada ao mesmo tempo pode acabar <strong>presa no meio</strong>, sem as vantagens de nenhum dos dois lados.
                       </p>
                    </AlertBox>
                  </div>
                ) 
              },
            ]} />
          </section>
          
          <section id="quiz-modulo-4" className="mt-16">




<ModuleConsolidation index={4} variant={getModuleVariant(4)} video={{ videoId: "iV7hKYv0fDc", title: "Estratégias de Porter", duration: "20:00" }} resumoVisual={{ moduloNome: "Formulação Estratégica", tituloAula: "Planejamento Estratégico", materia: "Administração", images: [{ title: "5 Forças de Porter", type: "Relação", placeholderColor: "bg-rose-500/20" }, { title: "Estratégias Genéricas", type: "Opções", placeholderColor: "bg-pink-500/20" }, { title: "Matriz Ansoff", type: "Crescimento", placeholderColor: "bg-red-500/20" }] }} maceteVisual={{ title: "PORTER: Custo, Diferenciação ou Foco", content: (<div className="space-y-3 text-left"><p className="text-sm italic">"Ou você é barato, ou é especial, ou foca em um bando."</p></div>) }} audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", titulo: "Estratégias Competitivas", artista: "Prof. Administração" }} />

                      <QuizInterativo questoes={quizM4} titulo="Fixação - Formulação" numero={4} variant={getModuleVariant(4)} icone="⚔️" onComplete={(score) => handleModuleComplete("modulo-4", score)} />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 5: IMPLEMENTAÇÃO ESTRATÉGICA (UNROLLED) ═══ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={5} titulo="Implementação Estratégica" descricao="Onde a maioria das estratégias falha: transformando planos em ação real." gradiente="bg-gradient-to-br from-violet-600 to-purple-800" />
          
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader index={5} title="Da Estratégia à Ação" description="Ferramentas de execução: 5W2H e Matriz RACI." variant={getModuleVariant(5)} />
            
            <ContentAccordion slides={[
              { 
                titulo: "Conceituação - O Desafio da Execução", 
                icone: <LuBrain />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      Implementar é a fase mais difícil. Segundo Kaplan e Norton, <strong>9 em cada 10 estratégias falham na execução</strong>, não no planejamento. Para vencer esse gap, usamos ferramentas de desdobramento.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 bg-violet-500/10 rounded-xl border border-violet-200 text-center">
                        <p className="font-black text-violet-700 text-lg">Diretriz</p>
                        <p className="text-[10px] uppercase opacity-70">O "O Quê"</p>
                      </div>
                      <div className="p-4 bg-violet-500/10 rounded-xl border border-violet-200 text-center">
                        <p className="font-black text-violet-700 text-lg">Meta</p>
                        <p className="text-[10px] uppercase opacity-70">O "Quanto"</p>
                      </div>
                      <div className="p-4 bg-violet-500/10 rounded-xl border border-violet-200 text-center">
                        <p className="font-black text-violet-700 text-lg">Plano</p>
                        <p className="text-[10px] uppercase opacity-70">O "Como"</p>
                      </div>
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Ferramenta - O Mestre 5W2H", 
                icone: <LuSigma />, 
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-sm">Um plano de ação só serve se responder a 7 perguntas cruciais:</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                       {['What (O quê)', 'Why (Por quê)', 'Who (Quem)', 'Where (Onde)', 'When (Quando)', 'How (Como)', 'How Much (Quanto custa)'].map(q => (
                         <div key={q} className="p-2 bg-white/50 dark:bg-black/20 border rounded-lg text-center font-bold text-[10px]">{q}</div>
                       ))}
                    </div>
                    <AlertBox tipo="warning" titulo="PEGADINHA COMUM">
                       <p className="text-xs italic">"Who" (Quem) deve ser sempre UMA pessoa ou área específica (Accountability), nunca um grupo vago como 'todos os colaboradores'.</p>
                    </AlertBox>
                  </div>
                ) 
              },
              { 
                titulo: "Exemplificação - Matriz RACI na Petrobras", 
                icone: <LuBookOpen />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground text-sm">Em projetos complexos como a exploração de um novo poço na <strong>Margem Equatorial</strong>, as responsabilidades precisam ser cristalinas:</p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-blue-500/5 rounded-xl border border-blue-500/20">
                        <div className="bg-blue-600 text-white w-6 h-6 rounded flex-shrink-0 flex items-center justify-center font-bold text-xs text-nowrap">R</div>
                        <div>
                          <p className="font-bold text-xs">Responsible (Responsável)</p>
                          <p className="text-[10px] opacity-70">Quem põe a mão na massa (Engenheiros de perfuração).</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                        <div className="bg-emerald-600 text-white w-6 h-6 rounded flex-shrink-0 flex items-center justify-center font-bold text-xs text-nowrap">A</div>
                        <div>
                          <p className="font-bold text-xs">Accountable (Autoridade/Dono)</p>
                          <p className="text-[10px] opacity-70">Quem responde pelo sucesso/fracasso (Gerente Executivo). <strong>Apenas UM A por tarefa!</strong></p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-amber-500/5 rounded-xl border border-amber-500/20">
                        <div className="bg-amber-600 text-white w-6 h-6 rounded flex-shrink-0 flex items-center justify-center font-bold text-xs text-nowrap">C</div>
                        <div>
                          <p className="font-bold text-xs">Consulted (Consultado)</p>
                          <p className="text-[10px] opacity-70">Especialistas que dão opinião (Geólogos, Ambientalistas).</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-violet-500/5 rounded-xl border border-violet-500/20">
                        <div className="bg-violet-600 text-white w-6 h-6 rounded flex-shrink-0 flex items-center justify-center font-bold text-xs text-nowrap">I</div>
                        <div>
                          <p className="font-bold text-xs">Informed (Informado)</p>
                          <p className="text-[10px] opacity-70">Quem precisa saber do status (Diretoria, Acionistas).</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Dicas - Barreiras à Implementação", 
                icone: <LuZap />, 
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-sm">Fique atento aos 4 tipos de barreiras que a Cesgranrio ama:</p>
                    <ul className="space-y-2">
                       <li className="text-xs">🚫 <strong>Barreira da Visão:</strong> Apenas 5% dos funcionários entendem a estratégia.</li>
                       <li className="text-xs">🚫 <strong>Barreira da Gestão:</strong> Gerentes gastam pouco tempo discutindo o futuro.</li>
                       <li className="text-xs">🚫 <strong>Barreira dos Recursos:</strong> O orçamento não segue a estratégia (desconexão financeira).</li>
                       <li className="text-xs">🚫 <strong>Barreira das Pessoas:</strong> Incentivos e remuneração não estão ligados às metas.</li>
                    </ul>
                  </div>
                ) 
              }
            ]} />
          </section>
          

          
          <section id="quiz-modulo-5" className="mt-16">
          





<ModuleConsolidation 
            index={5} 
            variant={getModuleVariant(5)} 
            video={{ videoId: "iV7hKYv0fDc", title: "Implementação e Execução", duration: "22:00" }} 
            resumoVisual={{ 
              moduloNome: "Implementação", 
              tituloAula: "Planejamento Estratégico", 
              materia: "Administração", 
              images: [
                { title: "5W2H: Ação", type: "Ferramenta", placeholderColor: "bg-violet-500/20" }, 
                { title: "Matriz RACI", type: "Responsabilidade", placeholderColor: "bg-purple-500/20" }, 
                { title: "Barreiras à Execução", type: "Obstáculos", placeholderColor: "bg-fuchsia-500/20" }
              ] 
            }} 
            maceteVisual={{ 
              title: "RACI: Quem Faz, Quem Manda, Quem Ajuda, Quem Sabe", 
              content: (<div className="space-y-3 text-left"><p className="text-sm italic">"R - Põe a mão. A - Responde (O Dono). C - Dá pitaco. I - Fica sabendo."</p></div>) 
            }} 
            audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", titulo: "Táticas de Implementação", artista: "Prof. Administração" }} 
          />

                      <QuizInterativo questoes={quizM5} titulo="Fixação - Implementação" numero={5} variant={getModuleVariant(5)} icone="🎯" onComplete={(score) => handleModuleComplete("modulo-5", score)} />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 6: CONTROLE E AVALIAÇÃO (UNROLLED) ═══ */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={6} titulo="Controle e Avaliação" descricao="O que não é medido não é gerenciado: a ciência dos indicadores e feedback." gradiente="bg-gradient-to-br from-amber-600 to-amber-900" />
          
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader index={6} title="Medindo o Sucesso" description="KPIs, semáforos e a gestão do desempenho." variant={getModuleVariant(6)} />
            
            <ContentAccordion slides={[
              { 
                titulo: "Conceituação - Gestão pelo Desempenho", 
                icone: <LuBrain />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      O controle estratégico não é apenas punitivo, é <strong>orientador</strong>. Ele garante que a empresa permaneça nos "trilhos" definidos no Planejamento Estratégico.
                    </p>
                    <div className="bg-amber-500/5 p-5 rounded-2xl border border-amber-500/20">
                      <p className="font-bold text-amber-700 mb-3 flex items-center gap-2">
                         <LuTarget className="w-5 h-5" /> Os 3 Níveis de Controle:
                      </p>
                      <ul className="space-y-2 text-xs">
                        <li>🎯 <strong>Estratégico:</strong> Focado no longo prazo e na organização como um todo (BSC).</li>
                        <li>📊 <strong>Tático:</strong> Focado em unidades de negócio ou departamentos (Metas Trimestrais).</li>
                        <li>⚙️ <strong>Operacional:</strong> Focado em tarefas e processos diários (Checklists, Horas-máquina).</li>
                      </ul>
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Ferramenta - KPIs vs. KRIs", 
                icone: <LuSigma />, 
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-sm">Nas provas da Cesgranrio, saber a diferença entre indicadores de <strong>Resultado</strong> e de <strong>Risco</strong> é vital:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-200">
                        <p className="font-bold text-emerald-800 text-sm mb-1">KPI (Key Performance Indicator)</p>
                        <p className="text-xs opacity-70 italic">"O quão rápido estamos indo?"</p>
                        <p className="text-[10px] mt-2">Ex: Volume de extração de barris/dia.</p>
                      </div>
                      <div className="p-4 bg-rose-500/10 rounded-xl border border-rose-200">
                        <p className="font-bold text-rose-800 text-sm mb-1">KRI (Key Risk Indicator)</p>
                        <p className="text-xs opacity-70 italic">"O quão perigoso está o caminho?"</p>
                        <p className="text-[10px] mt-2">Ex: Pressão instável em tubulações submarinas.</p>
                      </div>
                    </div>
                    <AlertBox tipo="info" titulo="O SISTEMA DE SEMÁFOROS">
                       <p className="text-xs leading-relaxed">
                         🟢 <strong>Verde:</strong> Meta atingida ou acima.<br/>
                         🟡 <strong>Amarelo:</strong> Desvio aceitável, requer monitoramento.<br/>
                         🔴 <strong>Vermelho:</strong> Desvio crítico, requer ação imediata (Plano de Contingência).
                       </p>
                    </AlertBox>
                  </div>
                ) 
              },
              { 
                titulo: "Exemplificação - Dashboards na Petrobras", 
                icone: <LuBookOpen />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground text-sm">Na Petrobras, o <strong>Painel de Desempenho</strong> é centralizado. Um dos KPIs mais críticos é o <strong>Vazamento de Óleo (VO)</strong> e a <strong>Taxa de Acidentes Registráveis (TAR)</strong>.</p>
                    <div className="p-4 bg-slate-100 dark:bg-slate-800/50 rounded-2xl border-dashed border-2 border-slate-300">
                       <p className="text-[10px] font-mono text-center uppercase opacity-50 mb-4">Simulação de Dashboard de Refinaria</p>
                       <div className="grid grid-cols-3 gap-2">
                          <div className="p-2 bg-green-500/20 text-green-700 rounded text-center">
                            <p className="font-black text-xs">98%</p>
                            <p className="text-[8px]">Disponibilidade</p>
                          </div>
                          <div className="p-2 bg-yellow-500/20 text-yellow-700 rounded text-center">
                            <p className="font-black text-xs">85%</p>
                            <p className="text-[8px]">Produção Diesel</p>
                          </div>
                          <div className="p-2 bg-red-500/20 text-red-700 rounded text-center">
                            <p className="font-black text-xs">1.2</p>
                            <p className="text-[8px]">Indice Acidentes</p>
                          </div>
                       </div>
                    </div>
                    <p className="text-[10px] italic leading-relaxed text-center">"O desvio no Índice de Acidentes (Vermelho) dispararia um ciclo de feedback corretivo imediato."</p>
                  </div>
                ) 
              },
              { 
                titulo: "Dicas - Ciclos de Aprendizagem", 
                icone: <LuTrendingUp />, 
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-sm">Entenda como a organização aprende com os erros:</p>
                    <div className="space-y-3">
                      <div className="p-4 bg-blue-500/5 rounded-xl border-l-4 border-blue-500">
                        <p className="font-bold text-xs">Single Loop Learning (Aprendizagem Simples)</p>
                        <p className="text-[10px] opacity-70">Corrigimos o erro para manter o plano. "O poço falhou, vamos consertar a sonda."</p>
                      </div>
                      <div className="p-4 bg-emerald-500/5 rounded-xl border-l-4 border-emerald-500">
                        <p className="font-bold text-xs">Double Loop Learning (Aprendizagem Dupla)</p>
                        <p className="text-[10px] opacity-70">Questionamos as premissas do plano. "Por que estamos usando esse tipo de sonda? Nossa estratégia de perfuração está certa?"</p>
                      </div>
                    </div>
                  </div>
                ) 
              }
            ]} />
          </section>
          

          
          <section id="quiz-modulo-6" className="mt-16">
          





<ModuleConsolidation 
            index={6} 
            variant={getModuleVariant(6)} 
            video={{ videoId: "iV7hKYv0fDc", title: "Monitoramento e Controle", duration: "19:00" }} 
            resumoVisual={{ 
              moduloNome: "Controle", 
              tituloAula: "Planejamento Estratégico", 
              materia: "Administração", 
              images: [
                { title: "KPIs vs KRIs", type: "Indicadores", placeholderColor: "bg-amber-500/20" }, 
                { title: "Semaforização", type: "Status", placeholderColor: "bg-yellow-500/20" }, 
                { title: "Ciclos de Feedback", type: "Aprendizagem", placeholderColor: "bg-orange-500/20" }
              ] 
            }} 
            maceteVisual={{ 
              title: "KPI: Como estou? KRI: Vou me ferrar?", 
              content: (<div className="space-y-3 text-left"><p className="text-sm italic">"Se o KPI tá baixo, você não produziu. Se o KRI tá alto, você vai explodir."</p></div>) 
            }} 
            audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3", titulo: "A Arte de Medir", artista: "Prof. Administração" }} 
          />

                      <QuizInterativo questoes={quizM6} titulo="Fixação - Controle" numero={6} variant={getModuleVariant(6)} icone="📈" onComplete={(score) => handleModuleComplete("modulo-6", score)} />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 7: PE EM EMPRESAS PÚBLICAS (UNROLLED) ═══ */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={7} titulo="PE em Empresas Públicas" descricao="A complexa missão de equilibrar lucro, legislação e interesse social." gradiente="bg-gradient-to-br from-blue-600 to-blue-900" />
          
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader index={7} title="Setor Público e Governança" description="Lei 13.303/16 e a integração com o orçamento público." variant={getModuleVariant(7)} />
            
            <ContentAccordion slides={[
              { 
                titulo: "Conceituação - A Lei das Estatais (13.303/16)", 
                icone: <LuBrain />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      Para as empresas estatais como a Petrobras, o Planejamento Estratégico não é apenas uma escolha gerencial, é um <strong>imperativo legal</strong>. A Lei 13.303/16 exige a publicação anual da carta de governança e compromissos sociais.
                    </p>
                    <div className="bg-blue-500/5 p-5 rounded-2xl border border-blue-500/20">
                      <p className="font-bold text-blue-700 mb-3 flex items-center gap-2">
                         <LuTarget className="w-5 h-5" /> Pilares da Lei 13.303/16:
                      </p>
                      <ul className="space-y-2 text-xs">
                        <li>🏢 <strong>Transparência:</strong> Divulgação tempestiva de dados financeiros e operacionais.</li>
                        <li>🛡️ <strong>Gestão de Riscos:</strong> Implementação de controles internos e compliance obrigatórios.</li>
                        <li>👥 <strong>Indicação de Dirigentes:</strong> Critérios técnicos rigorosos para reduzir a interferência política.</li>
                      </ul>
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Instrumentos - PPA, LDO e LOA", 
                icone: <LuSigma />, 
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-sm">O planejamento das estatais deve conversar com o ciclo orçamentário federal:</p>
                    <div className="space-y-3">
                       <div className="p-4 bg-white/50 dark:bg-black/20 border rounded-xl">
                          <p className="font-bold text-[11px] text-blue-800">PPA (Plano Plurianual) - 4 ANOS</p>
                          <p className="text-[10px] opacity-70">Diretrizes, Objetivos e Metas para o longo prazo.</p>
                       </div>
                       <div className="p-4 bg-white/50 dark:bg-black/20 border rounded-xl">
                          <p className="font-bold text-[11px] text-blue-800">LDO (Lei de Diretrizes Orçamentárias) - ANUAL</p>
                          <p className="text-[10px] opacity-70">Define quais metas do PPA serão prioridade no próximo ano.</p>
                       </div>
                       <div className="p-4 bg-white/50 dark:bg-black/20 border rounded-xl">
                          <p className="font-bold text-[11px] text-blue-800">LOA (Lei Orçamentária Anual) - O DINHEIRO</p>
                          <p className="text-[10px] opacity-70">O orçamento propriamente dito. Nas estatais, foca no <strong>Orçamento de Investimento</strong>.</p>
                       </div>
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Exemplificação - Governança na Petrobras", 
                icone: <LuBookOpen />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground text-sm">A Petrobras é uma <strong>Sociedade de Economia Mista</strong>. Isso significa que ela deve seguir as regras de mercado (CVM) E as regras de controle público (TCU/CGU).</p>
                    <AlertBox tipo="success" titulo="COMPLIANCE E ÉTICA">
                       <p className="text-xs">
                         O <strong>Estatuto Social</strong> da Petrobras prevê que qualquer decisão de investimento de alto valor deve passar por comitês técnicos independentes, garantindo que o interesse da empresa esteja acima de pressões conjunturais.
                       </p>
                    </AlertBox>
                    <div className="flex gap-2">
                       <div className="flex-1 p-2 bg-slate-100 dark:bg-slate-800 rounded text-[9px] text-center border">Empresa de Mercado (Lucro)</div>
                       <div className="flex-1 p-2 bg-blue-100 dark:bg-blue-900/30 rounded text-[9px] text-center border font-bold">Petrobras (Híbrida)</div>
                       <div className="flex-1 p-2 bg-slate-100 dark:bg-slate-800 rounded text-[9px] text-center border">Órgão Público (Serviço)</div>
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Dicas - Stakeholders no Setor Público", 
                icone: <LuZap />, 
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-sm">A Cesgranrio costuma cobrar a multiplicidade de stakeholders:</p>
                    <ul className="space-y-2">
                       <li className="text-xs">🌍 <strong>Sociedade:</strong> Quer preços justos e sustentabilidade.</li>
                       <li className="text-xs">🏛️ <strong>Governo (Acionista Majoritário):</strong> Quer dividendos e política energética.</li>
                       <li className="text-xs">📈 <strong>Investidores (Minoritários):</strong> Querem valorização da ação e lucro.</li>
                       <li className="text-xs">👷 <strong>Colaboradores:</strong> Querem segurança e boas condições de trabalho.</li>
                    </ul>
                    <p className="text-[10px] italic text-rose-600 font-bold">Macro-regra: O Planejamento Estratégico deve harmonizar esses interesses conflitantes.</p>
                  </div>
                ) 
              }
            ]} />
          </section>
          

          
          <section id="quiz-modulo-7" className="mt-16">
          





<ModuleConsolidation 
            index={7} 
            variant={getModuleVariant(7)} 
            video={{ videoId: "iV7hKYv0fDc", title: "Legislação e Governança", duration: "21:00" }} 
            resumoVisual={{ 
              moduloNome: "Setor Público", 
              tituloAula: "Planejamento Estratégico", 
              materia: "Administração", 
              images: [
                { title: "PPA-LDO-LOA", type: "Instrumentos", placeholderColor: "bg-blue-500/20" }, 
                { title: "Lei 13.303/16", type: "Legislação", placeholderColor: "bg-sky-500/20" }, 
                { title: "Estatuto Petrobras", type: "Governança", placeholderColor: "bg-indigo-500/20" }
              ] 
            }} 
            maceteVisual={{ 
              title: "PPA-LDO-LOA: Planeja - Decide - Aloca", 
              content: (<div className="space-y-3 text-left"><p className="text-sm italic">"PPA guia o rumo. LDO escolhe a briga. LOA paga a conta."</p></div>) 
            }} 
            audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3", titulo: "Público vs Privado", artista: "Prof. Administração" }} 
          />

                      <QuizInterativo questoes={quizM7} titulo="Fixação - Setor Público" numero={7} variant={getModuleVariant(7)} icone="🏛️" onComplete={(score) => handleModuleComplete("modulo-7", score)} />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 8: CENÁRIOS E PROSPECTIVA (UNROLLED) ═══ */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={8} titulo="Cenários e Prospectiva" descricao="A arte de antecipar múltiplos futuros para reduzir a incerteza." gradiente="bg-gradient-to-br from-emerald-600 to-emerald-900" />
          
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader index={8} title="Pensando o Futuro" description="Metodologias para navegar em ambientes VUCA e BANI." variant={getModuleVariant(8)} />
            
            <ContentAccordion slides={[
              { 
                titulo: "Conceituação - O Método Peter Schwartz", 
                icone: <LuBrain />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      Planejamento Estratégico não é <strong>prever</strong> o futuro, mas sim <strong>preparar-se</strong> para ele. O método da <i>Global Business Network</i> (GBN) foca na criação de narrativas logicamente consistentes de futuros possíveis.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10 text-center">
                        <p className="font-bold text-emerald-700 text-xs">Forças Motrizes</p>
                        <p className="text-[10px] opacity-70">Eventos que moldam o futuro (ex: IA, Transição Energética).</p>
                      </div>
                      <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/10 text-center">
                        <p className="font-bold text-amber-700 text-xs">Incertezas Críticas</p>
                        <p className="text-[10px] opacity-70">Variáveis de alto impacto e baixa previsibilidade.</p>
                      </div>
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Estratégia - O Cone de Incerteza", 
                icone: <LuTarget />, 
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-sm">Quanto mais longe olhamos, maior o leque de possibilidades:</p>
                    <ul className="space-y-3">
                       <li className="flex items-start gap-2 text-xs">
                         <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                         <span><strong>Futuro Desejável:</strong> O que queremos que aconteça (Visão).</span>
                       </li>
                       <li className="flex items-start gap-2 text-xs">
                         <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                         <span><strong>Futuro Provável:</strong> A tendência inercial (Business as usual).</span>
                       </li>
                       <li className="flex items-start gap-2 text-xs">
                         <div className="mt-1 w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                         <span><strong>Futuro Plausível:</strong> O que pode acontecer face às rupturas.</span>
                       </li>
                    </ul>
                    <AlertBox tipo="info" titulo="Cross-Impact Matrix">
                       <p className="text-[10px]">Ferramenta para analisar como uma mudança em uma variável (ex: preço do barril) impacta outra (ex: investimento em eólicas).</p>
                    </AlertBox>
                  </div>
                ) 
              },
              { 
                titulo: "Exemplificação - Cenários Petrobras 2050", 
                icone: <LuBookOpen />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground text-sm">A Petrobras utiliza cenários de longo prazo para decidir investimentos Bilionários que duram 30 anos:</p>
                    <div className="space-y-3">
                       <div className="p-3 bg-white/50 dark:bg-black/20 border-l-4 border-l-rose-500 rounded-lg">
                          <p className="font-bold text-xs">Cenário "Inércia":</p>
                          <p className="text-[10px]">Gargalos na transição, dependência fóssil continua alta.</p>
                       </div>
                       <div className="p-3 bg-white/50 dark:bg-black/20 border-l-4 border-l-emerald-500 rounded-lg">
                          <p className="font-bold text-xs">Cenário "Aceleração":</p>
                          <p className="text-[10px]">Políticas climáticas globais agressivas reduzem demanda por óleo.</p>
                       </div>
                    </div>
                    <p className="text-[10px] italic">"A Petrobras deve ser resiliente em qualquer um desses mundos."</p>
                  </div>
                ) 
              },
              { 
                titulo: "Pegadinhas - Planejamento Adaptativo", 
                icone: <LuZap />, 
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-sm">O maior erro em prospectiva é o <strong>Pensamento Único</strong>. Fique atento a estas armadilhas:</p>
                    <ul className="grid grid-cols-1 gap-2 text-[10px]">
                      <li className="p-2 bg-amber-500/5 border border-amber-500/10 rounded"><strong>Excesso de Otimismo:</strong> Ignorar eventos improváveis (Black Swans).</li>
                      <li className="p-2 bg-emerald-500/5 border border-emerald-500/10 rounded"><strong>Dogmatismo:</strong> Apegar-se ao cenário "mais provável" como se fosse certeza.</li>
                    </ul>
                  </div>
                ) 
              },
            ]} />
          </section>
          

          
          <section id="quiz-modulo-8" className="mt-16">
          





<ModuleConsolidation 
            index={8} 
            variant={getModuleVariant(8)} 
            video={{ videoId: "iV7hKYv0fDc", title: "Cenários e Prospectiva", duration: "18:00" }} 
            resumoVisual={{ 
              moduloNome: "Cenários", 
              tituloAula: "Planejamento Estratégico", 
              materia: "Administração", 
              images: [
                { title: "Cone de Incerteza", type: "Prospectiva", placeholderColor: "bg-emerald-500/20" }, 
                { title: "Sinais Fracos", type: "Monitoramento", placeholderColor: "bg-amber-500/20" }, 
                { title: "Resiliência", type: "Estratégia", placeholderColor: "bg-teal-500/20" }
              ] 
            }} 
            maceteVisual={{ 
              title: "Cenário não é Previsão!", 
              content: (<div className="space-y-3 text-left"><p className="text-sm italic">"Prever é tentar acertar um ponto. Cenarizar é desenhar o mapa do território desconhecido."</p></div>) 
            }} 
            audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", titulo: "Prospectiva Estratégica", artista: "Prof. Administração" }} 
          />

                      <QuizInterativo questoes={quizM8} titulo="Fixação - Cenários" numero={8} variant={getModuleVariant(8)} icone="🔮" onComplete={(score) => handleModuleComplete("modulo-8", score)} />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 9: APLICAÇÕES PETROBRAS (UNROLLED) ═══ */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={9} titulo="Aplicações Petrobras" descricao="O Plano Estratégico 2024-2028 e a Transição Energética Justa." gradiente="bg-gradient-to-br from-rose-600 to-rose-900" />
          
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader index={9} title="A Estratégia em Ação" description="Missão, Visão e o Plano de Negócios 2024-2028." variant={getModuleVariant(9)} />
            
            <ContentAccordion slides={[
              { 
                titulo: "A Identidade Estratégica", 
                icone: <LuBrain />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      Para a prova da Cesgranrio, você precisa ter a <strong>Missão</strong> e a <strong>Visão</strong> da Petrobras na ponta da língua.
                    </p>
                    <div className="space-y-3">
                      <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/10">
                        <p className="font-bold text-rose-700 text-xs uppercase tracking-wider">Missão:</p>
                        <p className="text-[11px] font-medium italic">"Prover energia que assegura prosperidade de forma ética, justa e segura."</p>
                      </div>
                      <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/10">
                        <p className="font-bold text-rose-700 text-xs uppercase tracking-wider">Visão:</p>
                        <p className="text-[11px] font-medium italic">"Ser a melhor empresa de energia na geração de valor, com liderança na transição energética justa."</p>
                      </div>
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Plano 2024-2028: Pilares Estratégicos", 
                icone: <LuTarget />, 
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-sm">O novo plano foca em 3 eixos fundamentais:</p>
                    <div className="grid grid-cols-1 gap-3">
                       <div className="p-3 bg-white/50 dark:bg-black/20 border-l-4 border-l-blue-500 rounded-lg">
                          <p className="font-bold text-xs uppercase text-blue-800">1. Óleo e Gás de Baixo Carbono</p>
                          <p className="text-[10px]">Foco no Pré-Sal e exploração de novas fronteiras (Margem Equatorial).</p>
                       </div>
                       <div className="p-3 bg-white/50 dark:bg-black/20 border-l-4 border-l-emerald-500 rounded-lg">
                          <p className="font-bold text-xs uppercase text-emerald-800">2. Transição Energética Justa</p>
                          <p className="text-[10px]">Investimentos em eólica, solar, hidrogênio e biorefino.</p>
                       </div>
                       <div className="p-3 bg-white/50 dark:bg-black/20 border-l-4 border-l-amber-500 rounded-lg">
                          <p className="font-bold text-xs uppercase text-amber-800">3. Valor Social e Ambiental</p>
                          <p className="text-[10px]">Geração de empregos, descarbonização e proteção ambiental.</p>
                       </div>
                    </div>
                  </div>
                ) 
              },
              { 
                titulo: "Dados de CAPEX (Investimento)", 
                icone: <LuSigma />, 
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground text-sm">O volume de investimentos para 2024-2028 é de aproximadamente <strong>US$ 102 bilhões</strong>.</p>
                    <AlertBox tipo="info" titulo="ALOCAÇÃO DE RECURSOS">
                       <ul className="space-y-2 text-xs">
                         <li>🔥 <strong>E&P (Exploração):</strong> US$ 73 Bi (Foco no Pré-sal).</li>
                         <li>🌱 <strong>Baixo Carbono:</strong> US$ 11.5 Bi (Cerca de 11% do CAPEX total).</li>
                         <li>⚙️ <strong>Refino e Gás:</strong> US$ 17 Bi (Modernização e Bio-combustíveis).</li>
                       </ul>
                    </AlertBox>
                    <p className="text-[10px] opacity-70 italic text-center">Nota: Estes números podem cair na prova como questão de 'Priorização Estratégica'.</p>
                  </div>
                ) 
              },
              { 
                titulo: "Valores Petrobras", 
                icone: <LuZap />, 
                conteudo: (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 border rounded-xl bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center">
                       <span className="text-lg mb-1">🛡️</span>
                       <p className="font-bold text-[10px]">Segurança</p>
                       <p className="text-[9px] text-center opacity-70">Valor inegociável.</p>
                    </div>
                    <div className="p-3 border rounded-xl bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center">
                       <span className="text-lg mb-1">⚖️</span>
                       <p className="font-bold text-[10px]">Ética</p>
                       <p className="text-[9px] text-center opacity-70">Integridade total.</p>
                    </div>
                    <div className="p-3 border rounded-xl bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center">
                       <span className="text-lg mb-1">📈</span>
                       <p className="font-bold text-[10px]">Resultado</p>
                       <p className="text-[9px] text-center opacity-70">Geração de valor.</p>
                    </div>
                    <div className="p-3 border rounded-xl bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center">
                       <span className="text-lg mb-1">🤝</span>
                       <p className="font-bold text-[10px]">Pessoas</p>
                       <p className="text-[9px] text-center opacity-70">Diversidade e talento.</p>
                    </div>
                  </div>
                ) 
              }
            ]} />
          </section>
          

          
          <section id="quiz-modulo-9" className="mt-16">
          





<ModuleConsolidation 
            index={9} 
            variant={getModuleVariant(9)} 
            video={{ videoId: "iV7hKYv0fDc", title: "O Plano 2024-2028", duration: "25:00" }} 
            resumoVisual={{ 
              moduloNome: "Petrobras", 
              tituloAula: "Planejamento Estratégico", 
              materia: "Administração", 
              images: [
                { title: "Plano 2024-2028", type: "Negócios", placeholderColor: "bg-rose-500/20" }, 
                { title: "Missão e Visão", type: "Identidade", placeholderColor: "bg-orange-500/20" }, 
                { title: "Capex Alocação", type: "Financeiro", placeholderColor: "bg-pink-500/20" }
              ] 
            }} 
            maceteVisual={{ 
              title: "Missão E J S", 
              content: (<div className="space-y-3 text-left"><p className="text-sm italic">"<strong>É</strong>tica, <strong>J</strong>usta e <strong>S</strong>egura. Lembre-se do EJS para a Missão!"</p></div>) 
            }} 
            audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3", titulo: "Estratégia Petrobras 2024", artista: "Prof. Administração" }} 
          />

                      <QuizInterativo questoes={quizM9} titulo="Fixação - Petrobras" numero={9} variant={getModuleVariant(9)} icone="🛢️" onComplete={(score) => handleModuleComplete("modulo-9", score)} />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULOS 10: SIMULADO MESTRE (UNROLLED PARA ESTABILIDADE) ═══ */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner numero={10} titulo="Simulado Mestre" descricao="Desafio final integrando todos os conceitos de Planejamento Estratégico." gradiente="bg-gradient-to-br from-violet-600 to-violet-900" />
          
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader index={10} title="O Grande Desafio" description="Teste seus conhecimentos com questões de nível difícil (Cesgranrio)." variant={getModuleVariant(10)} />
            
            <ContentAccordion slides={[
              { 
                titulo: "Táticas de Prova", 
                icone: <LuBrain />, 
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">No dia da prova, o cansaço é seu maior inimigo. O Simulado Mestre treina sua resistência mental.</p>
                    <AlertBox tipo="success" titulo="DICA DE OURO">
                       <p className="text-xs">Leia primeiro o comando da questão e depois o texto de apoio. Muitas questões de Administração podem ser resolvidas apenas com lógica e eliminação.</p>
                    </AlertBox>
                  </div>
                ) 
              },
              { 
                titulo: "Revisão Expressa", 
                icone: <LuTarget />, 
                conteudo: (
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded">SWOT: Forças/Fraquezas = Interno.</div>
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded">BSC: 4 Perspectivas.</div>
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded">Porter: 5 Forças de mercado.</div>
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded">Mintzberg: 5 Ps da Estratégia.</div>
                  </div>
                ) 
              }
            ]} />
          </section>



          <section id="quiz-modulo-10" className="mt-16">
          





<ModuleConsolidation 
            index={10} 
            variant={getModuleVariant(10)} 
            video={{ videoId: "iV7hKYv0fDc", title: "Simulado Comentado", duration: "45:00" }} 
            resumoVisual={{ 
              moduloNome: "Simulado", 
              tituloAula: "Planejamento Estratégico", 
              materia: "Administração", 
              images: [{ title: "Checklist Final", type: "Desafio", placeholderColor: "bg-violet-500/20" }] 
            }} 
            maceteVisual={{ 
              title: "Confie no Processo!", 
              content: (<div className="text-sm italic text-left"><p>Você percorreu todos os 10 módulos. Agora é hora de brilhar!</p></div>) 
            }} 
            audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3", titulo: "Dicas Finais", artista: "Prof. Administração" }} 
          />

                      <QuizInterativo questoes={quizM10} titulo="Fixação - Simulado" numero={10} variant={getModuleVariant(10)} icone="👑" onComplete={(score) => handleModuleComplete("modulo-10", score)} />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 11: PE PETROBRAS 2024-2028 (PRO) ═══ */}
      <TabsContent value="modulo-11" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={11}
            titulo="PE Petrobras 2024-2028 (Aprofundamento Pro)"
            descricao="O futuro da energia brasileira: Transição justa, Margem Equatorial e CAPEX."
            gradiente="bg-gradient-to-br from-emerald-800 to-blue-900"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={11}
              title="A Estratégia do Século XXI"
              description="Como a maior empresa do Brasil planeja os próximos 5 anos."
              variant={getModuleVariant(11)}
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "O Novo Modelo de Valor: A Transição Energética Justa",
                  icone: <LuRepeat />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-muted-foreground leading-relaxed">
                        A Petrobras não é mais "apenas" uma petroleira. A visão estratégica atual, definida no <strong>Plano Estratégico 2024-2028</strong>, foca na <strong>Dualidade Estratégica</strong>: maximizar o valor do Pré-sal enquanto financia a transição para fontes renováveis.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-5 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                          <p className="font-bold text-emerald-800 text-sm mb-2">Descarbonização (Scope 1 e 2)</p>
                          <p className="text-xs">Meta de ser <strong>Net Zero</strong> até 2050. Investimento maciço em CCUS (Captura, Uso e Armazenamento de Carbono).</p>
                        </div>
                        <div className="p-5 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                          <p className="font-bold text-blue-800 text-sm mb-2">Energia Renovável</p>
                          <p className="text-xs">Foco em <strong>Eólica Offshore</strong> e <strong>Hidrogênio Verde</strong>, aproveitando a expertise em engenharia submarina.</p>
                        </div>
                      </div>

                      <AlertBox tipo="warning" titulo="TERMO DE PROVA: CAPEX E OPEX NO PE">
                        <p className="text-xs">
                          O plano prevê <strong>US$ 102 bilhões</strong> de CAPEX. Lembrar que a alocação de recursos em "Baixo Carbono" subiu de 6% no plano anterior para cerca de 11% no atual. Isso mostra uma mudança na <strong>Priorização Estratégica</strong>.
                        </p>
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "A Nova Fronteira: Margem Equatorial",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-muted-foreground text-sm">
                        O PE define a <strong>Margem Equatorial (do Amapá ao Rio Grande do Norte)</strong> como o "Novo Pré-sal". Estratégica para garantir a segurança energética do Brasil pós-2030.
                      </p>

                      <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl border-dashed border-2 border-slate-300">
                         <p className="text-[10px] font-mono mb-2 uppercase opacity-50 text-center">Desafios Estratégicos da Margem Equatorial</p>
                         <ul className="space-y-2 text-[10px]">
                           <li>🌊 <strong>Exploração:</strong> Águas ultraprofundas com correntes marinhas imprevisíveis.</li>
                           <li>🌿 <strong>Licenciamento:</strong> Proximidade com ecossistemas sensíveis (Foz do Amazonas).</li>
                           <li>🏗️ <strong>Logística:</strong> Necessidade de desenvolver infraestrutura portuária no Arco Norte.</li>
                         </ul>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Governança e Resistência Estratégica",
                  icone: <LuShieldCheck />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        A <strong>Governança Corporativa</strong> é o escudo do PE. Na Petrobras, as decisões não são individuais, seguem o rito da Lei 13.303/16 (Lei das Estatais).
                      </p>
                      <div className="bg-blue-500/5 p-4 rounded-xl border border-blue-500/10">
                         <p className="font-bold text-xs text-blue-700 mb-1 leading-relaxed">Blindagem contra Influência Política:</p>
                         <p className="text-[10px] opacity-80 leading-relaxed italic">
                           "A aprovação do Plano de Negócios deve passar por diversas camadas de análise técnica e ser chancelada pelo Conselho de Administração, garantindo a perenidade dos projetos além dos ciclos eleitorais."
                         </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="p-4 bg-slate-50 dark:bg-slate-900 border rounded-xl flex items-center gap-3">
                 <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-600">
                   <LuTrendingUp className="w-5 h-5" />
                 </div>
                 <div>
                   <p className="text-[10px] font-bold">Produção</p>
                   <p className="text-[9px] opacity-60">Liderança Mundial</p>
                 </div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-900 border rounded-xl flex items-center gap-3">
                 <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-600">
                   <LuLayers className="w-5 h-5" />
                 </div>
                 <div>
                   <p className="text-[10px] font-bold">Refino</p>
                   <p className="text-[9px] opacity-60">Modernização Pro</p>
                 </div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-900 border rounded-xl flex items-center gap-3">
                 <div className="w-10 h-10 bg-violet-500/10 rounded-lg flex items-center justify-center text-violet-600">
                   <LuDatabase className="w-5 h-5" />
                 </div>
                 <div>
                   <p className="text-[10px] font-bold">Tecnologia</p>
                   <p className="text-[9px] opacity-60">P&D Oceânico</p>
                 </div>
              </div>
            </div>
          </section>

          <section id="quiz-modulo-11" className="mt-16">
            <ModuleConsolidation
              index={11}
              variant={getModuleVariant(11)}
              video={{ videoId: "iV7hKYv0fDc", title: "Estratégia Petrobras 2024-2028", duration: "32:00" }}
              resumoVisual={{
                moduloNome: "PE Petrobras Pro",
                tituloAula: "Planejamento Estratégico",
                materia: "Administração",
                images: [
                  { title: "Dualidade Estratégica", type: "Foco", placeholderColor: "bg-emerald-500/20" },
                  { title: "Margem Equatorial", type: "Fronteira", placeholderColor: "bg-amber-500/20" },
                  { title: "Capex Alocação Pro", type: "Investimento", placeholderColor: "bg-blue-500/20" },
                ],
              }}
              maceteVisual={{
                title: "O Pulo do Gato: 102 Bi",
                content: (
                  <div className="space-y-3 text-left">
                    <p className="text-sm italic">"Lembre-se: 102 Bi de investimento total. 73% em E&P (Exploração), 11% em Baixo Carbono."</p>
                  </div>
                ),
              }}
              audio={{ audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3", titulo: "O Novo PE Petrobras", artista: "Prof. Administração" }}
            />

            <QuizInterativo questoes={quizM11} titulo="Fixação - Estratégia Petrobras" numero={11} variant={getModuleVariant(11)} icone="🛢️" onComplete={(score) => handleModuleComplete("modulo-11", score)} />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO GLOSSÁRIO: TERMINOLOGIA TÉCNICA ═══ */}
      <TabsContent value="glossario" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={12}
            titulo="Glossário Técnico do Estrategista"
            descricao="Domine os termos que o examinador usa para confundir os despreparados."
            gradiente="bg-gradient-to-br from-slate-700 to-slate-900"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { t: "CAPEX", d: "Capital Expenditure (Investimento em Bens de Capital). Ex: Comprar uma plataforma." },
                { t: "OPEX", d: "Operational Expenditure (Despesas Operacionais). Ex: Pagar salários e manutenção." },
                { t: "SWOT", d: "Strengths, Weaknesses, Opportunities, Threats (Análise FOFA em português)." },
                { t: "BSC", d: "Balanced Scorecard. Ferramenta de gestão baseada em perspectivas (Finanças, Clientes, Processos, Aprendizado)." },
                { t: "Eficácia", d: "Foco no RESULTADO global. 'Fazer a coisa certa'." },
                { t: "Eficiência", d: "Foco no PROCESSO e recursos. 'Fazer certo a coisa'." },
                { t: "Stakeholders", d: "Partes interessadas (Governo, Sociedade, Empregados, Acionistas)." },
                { t: "Benchmarking", d: "Comparação de processos e métricas com os melhores do mercado." },
                { t: "Missão", d: "A razão de ser atual da empresa. O propósito de hoje." },
                { t: "Visão", d: "O estado futuro desejado. Onde a empresa quer estar em 10 anos." },
                { t: "Valores", d: "Princípios éticos e comportamentais inegociáveis." },
                { t: "Mindset", d: "Mentalidade ou configuração mental predominante em uma cultura organizacional." },
                { t: "Vantagem Competitiva", d: "Atributo que permite à empresa superar seus concorrentes de forma sustentável." },
                { t: "Core Competence", d: "Competência essencial que gera valor superior para o cliente e é difícil de imitar." },
                { t: "BANI", d: "Brittle (Frágil), Anxious (Ansioso), Non-linear (Não linear), Incomprehensible (Incompreensível)." },
                { t: "VUCA", d: "Volatility, Uncertainty, Complexity, Ambiguity. Cenário de instabilidade." },
                { t: "Análise de Cenários", d: "Metodologia para prospectar múltiplos futuros possíveis e incertos." },
                { t: "KPI", d: "Key Performance Indicator (Indicador-chave de Desempenho)." },
                { t: "KRI", d: "Key Risk Indicator (Indicador-chave de Risco)." },
                { t: "Plano de Contingência", d: "Conjunto de ações preventivas para lidar com um evento de risco materializado." },
                { t: "Matriz BCG", d: "Ferramenta de análise de portfólio (Estrela, Vaca Leiteira, Interrogação, Cachorro)." },
                { t: "5 Forças de Porter", d: "Análise da atratividade de uma indústria (Rivalidade, Entrantes, Substitutos, Fornecedores, Clientes)." },
                { t: "Estratégias Genéricas", d: "Liderança em Custo, Diferenciação e Enfoque (Porter)." },
                { t: "Estrutura Organizacional", d: "Forma como as atividades são dirigidas para alcançar os objetivos estratégicos." },
                { t: "Cultura Organizacional", d: "Sistema de valores e crenças compartilhados que governam o comportamento." },
                { t: "Estratégia Emergente", d: "Ações que surgem espontaneamente da organização, sem planejamento prévio formal." },
                { t: "Estratégia Deliberante", d: "Plano formalizado pela alta cúpula para ser executado conforme desenhado." },
                { t: "Double Loop Learning", d: "Aprendizado que questiona as premissas e valores por trás da ação orignial." },
                { t: "Governança Corporativa", d: "Sistema pelo qual as empresas são dirigidas e monitoradas." },
                { t: "Transição Energética", d: "Mudança estrutural dos sistemas de energia focada na descarbonização." },
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-900/50 border rounded-xl hover:shadow-md transition-all">
                  <p className="font-black text-xs text-slate-800 dark:text-slate-200 mb-1">{item.t}</p>
                  <p className="text-[10px] opacity-70 leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO FAQ: DETECTOR DE PEGADINHAS ═══ */}
      <TabsContent value="faq" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={13}
            titulo="FAQ: Detector de Pegadinhas Cesgranrio"
            descricao="Antecipe os truques da banca e não perca pontos por pura distração."
            gradiente="bg-gradient-to-br from-amber-600 to-rose-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <div className="space-y-6">
               {[
                 { q: "A Cesgranrio pode dizer que Missão e Visão são a mesma coisa?", a: "Jamais. A Missão é o 'DNA' atual (Quem somos). A Visão é o 'Alvo' futuro (Onde vamos). Se a questão misturar os conceitos de tempo, marque errado." },
                 { q: "E as 5 Forças de Porter? Qual a maior armadilha?", a: "A banca costuma trocar 'Entrada de Novos Concorrentes' por 'Rivalidade entre Concorrentes'. Mas o perigo real é a 'Ameça de Produtos Substitutos'. Lembre-se: Substitutos são produtos diferentes que atendem a mesma necessidade (ex: Carro vs Ônibus)." },
                 { q: "Como identificar uma questão sobre Planejamento Tático?", a: "Procure por palavras como 'Departamental', 'Gerência Média', 'Unidades de Negócio' ou prazos de '1 a 3 anos'. Se falar em 'Global' ou 'Institucional', é Estratégico." },
                 { q: "Cesgranrio cobra BSC (Balanced Scorecard)?", a: "Muito! O erro clássico deles é trocar a perspectiva de 'Processos Internos' por 'Clientes'. Lembre-se: Processos Internos foca na EFICIÊNCIA operacional dentro da fábrica/escritório." },
                 { q: "Qual a diferença entre Estratégia Emergente e Deliberada?", a: "A Deliberada é o plano 'bonitinho' no papel. A Emergente é o que acontece na vida real (o 'caos organizado'). A Cesgranrio ama Mintzberg, então saiba que a estratégia real é uma mistura das duas (Estratégia Realizada)." },
                 { q: "No SWOT, onde coloco o 'Preço do Petróleo'?", a: "Sempre em OPORTUNIDADE ou AMEAÇA (Ambiente Externo). A Petrobras não controla o preço do barril, ela apenas reage a ele. Forças e Fraquezas são coisas que a empresa CONTROLA (ex: tecnologia própria)." },
                 { q: "A Petrobras segue o PPA federal?", a: "Sim, como estatal, ela deve integrar seus planos de longo prazo com o Plano Plurianual do Governo Federal, especialmente em investimentos estratégicos para o país." },
                 { q: "O que é 'Enfoque' nas Estratégias de Porter?", a: "É focar em um NICH0 específico (ex: Apenas lubrificantes para motores de aviões). Não tenta ser a maior para todos, mas a melhor para ALGUÉM." },
                 { q: "Qual o maior erro ao lidar com Indicadores (KPIs)?", a: "Achar que ter MUITOS indicadores é bom. O Planejamento Estratégico exige POUCOS e BONS indicadores (seletividade). Muita informação gera paralisia." },
                 { q: "Cenários e Prospectiva: É sobre adivinhar o futuro?", a: "Erro fatal! É sobre construir MAPAS mentais de futuros possíveis. Se o examinador usar a palavra 'Prever com exatidão', fuja!" },
               ].map((faq, idx) => (
                 <div key={idx} className="p-6 bg-slate-500/5 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <p className="font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                      <span className="w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center text-[10px]">Q</span>
                      {faq.q}
                    </p>
                    <p className="text-xs text-muted-foreground ml-8 leading-relaxed">
                      <span className="font-bold text-emerald-600 mr-2">RESPOSTA:</span> {faq.a}
                    </p>
                 </div>
               ))}
            </div>
          </section>
        </div>
      </TabsContent>

      <TabsContent value="banco-questoes" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={14}
            titulo="Super Banco de Questões Comentadas"
            descricao="30 questões de nível avançado com explicações detalhadas para gabaritar Administração."
            gradiente="bg-gradient-to-br from-indigo-700 to-violet-900"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-12">
            <div className="space-y-16">
              {/* Bloco 1: Estratégia e Fundamentos */}
              <div className="space-y-8">
                <h3 className="text-xl font-bold text-indigo-700 border-b pb-2 flex items-center gap-2">
                  <LuAward className="w-6 h-6" /> Bloco 1: Fundamentos e Níveis
                </h3>

                {[
                  {
                    id: 1,
                    q: "No contexto do planejamento estratégico, a 'Eficácia' é frequentemente associada ao nível institucional da organização. Qual das alternativas abaixo define CORRETAMENTE esse conceito segundo a literatura clássica de administração?",
                    o: ["Fazer as coisas da maneira mais econômica possível.", "Alcançar os objetivos e resultados pretendidos pela organização.", "Otimizar o uso de recursos produtivos no dia a dia.", "Seguir rigorosamente os procedimentos operacionais padrão.", "Reduzir o desperdício de matérias-primas na linha de produção."],
                    r: "Alcançar os objetivos e resultados pretendidos pela organização.",
                    e: "Eficácia refere-se ao atingimento de metas e resultados (fazer a coisa certa). Economia, otimização de recursos e redução de desperdício são conceitos ligados à EFICIÊNCIA (fazer certo a coisa)."
                  },
                  {
                    id: 2,
                    q: "Uma Sociedade de Economia Mista, como a Petrobras, ao elaborar seu Planejamento Estratégico, deve considerar variáveis que transcendem o lucro. Qual instrumento legal obriga a publicação anual de compromissos de metas e governança?",
                    o: ["Lei 8.666/93 (Licitações)", "Lei 14.133/21 (Nova Lei de Licitações)", "Lei 13.303/16 (Lei das Estatais)", "Constituição Federal, Art. 37", "Estatuto do Servidor Público Federal"],
                    r: "Lei 13.303/16 (Lei das Estatais)",
                    e: "A Lei 13.303/16 é o marco regulatório das estatais, exigindo transparência, governança e a definição clara de metas anuais alinhadas ao interesse público e privado."
                  },
                  {
                    id: 3,
                    q: "A ferramenta Five Forces (Cinco Forças), proposta por Michael Porter, visa analisar a atratividade de uma indústria. Quando um novo concorrente possui facilidade de entrar no mercado, dizemos que:",
                    o: ["A rivalidade entre os concorrentes atuais é baixa.", "O poder de barganha dos fornecedores é nulo.", "As barreiras de entrada são baixas.", "A escala de produção é o fator determinante do lucro.", "Os produtos substitutos são irrelevantes."],
                    r: "As barreiras de entrada são baixas.",
                    e: "Barreiras de entrada são obstáculos (patentes, capital alto, escala) que impedem novos players. Se é fácil entrar, a barreira é baixa, o que reduz a atratividade estratégica do setor."
                  },
                  {
                    id: 4,
                    q: "O Balanced Scorecard (BSC) propõe quatro perspectivas interligadas. Qual delas foca na capacidade da organização de melhorar e criar valor através do capital humano e sistemas?",
                    o: ["Perspectiva Financeira", "Perspectiva do Cliente", "Perspectiva de Processos Internos", "Perspectiva de Aprendizado e Crescimento", "Perspectiva de Sustentabilidade Ambiental"],
                    r: "Perspectiva de Aprendizado e Crescimento",
                    e: "Aprendizado e Crescimento lida com infraestrutura imaterial: pessoas, sistemas, cultura e motivação. É a base que sustenta as outras três perspectivas."
                  },
                  {
                    id: 5,
                    q: "Na análise SWOT, um aumento global repentino na cotação do dólar para uma empresa exportadora de commodities deve ser classificado como:",
                    o: ["Força (Strength)", "Fraqueza (Weakness)", "Oportunidade (Opportunity)", "Ameaça (Threat)", "Variável de Processo Internalizável"],
                    r: "Oportunidade (Opportunity)",
                    e: "Como se trata de uma variável externa (mercado de câmbio) e beneficia a empresa exportadora (recebe mais em reais), é classificada como Oportunidade."
                  },
                  {
                    id: 6,
                    q: "A estratégia de 'Diferenciação', de acordo com as estratégias genéricas de Porter, baseia-se em:",
                    o: ["Ter o menor custo de produção do setor.", "Focar em um nicho de mercado muito específico e ignorar os outros.", "Criar algo que seja percebido como único pelos clientes, justificando um preço 'premium'.", "Atender apenas órgãos governamentais com produtos padronizados.", "Eliminar todos os intermediários da cadeia logística."],
                    r: "Criar algo que seja percebido como único pelos clientes, justificando um preço 'premium'.",
                    e: "Diferenciação busca singularidade (marca, tecnologia, serviço). Se o cliente percebe valor único, ele aceita pagar mais (price premium)."
                  },
                  {
                    id: 7,
                    q: "Qual dos 5 Ps da estratégia, segundo Henry Mintzberg, define a estratégia como uma manobra para enganar ou desorientar o concorrente?",
                    o: ["Plan (Plano)", "Pattern (Padrão)", "Position (Posição)", "Perspective (Perspectiva)", "Ploy (Pretexto/Manobra)"],
                    r: "Ploy (Pretexto/Manobra)",
                    e: "Ploy é a estratégia como 'truque' ou manobra tática pontual para ganhar vantagem momentânea sobre um rival específico."
                  },
                  {
                    id: 8,
                    q: "O Planejamento Operacional difere do Estratégico principalmente por:",
                    o: ["Sua amplitude global na organização.", "Focar em prazos superiores a 10 anos.", "Envolver decisões irreversíveis de alto risco econômico.", "Ser detalhado, focado em tarefas específicas e curto prazo.", "Ser responsabilidade exclusiva do CEO e do Conselho."],
                    r: "Ser detalhado, focado em tarefas específicas e curto prazo.",
                    e: "O nível operacional é o 'chão de fábrica'. É curto prazo, micro-orientado e foca na eficiência de processos individuais."
                  },
                  {
                    id: 9,
                    q: "A ferramenta 5W2H é essencial na fase de:",
                    o: ["Diagnóstico Ambiental (SWOT).", "Definição da Visão de Futuro.", "Criação de Mapas Estratégicos.", "Elaboração de Planos de Ação (Implementação).", "Pós-Venda e Feedback de Clientes."],
                    r: "Elaboração de Planos de Ação (Implementação).",
                    e: "5W2H (O que, quem, onde, quando...) é o esqueleto de qualquer plano de ação prático. Tira a ideia do papel e atribui responsabilidade."
                  },
                  {
                    id: 10,
                    q: "Em um cenário BANI, a estratégia deve priorizar a 'Resiliência' em vez da 'Otimização Rigorosa'. O que significa ser resiliente em planejamento?",
                    o: ["Ter planos tão perfeitos que nada pode dar errado.", "Capacidade de retornar ao estado original ou adaptar-se rapidamente após um choque externo.", "Eliminar todos os custos fixos da empresa.", "Seguir o plano original independentemente das mudanças do mercado.", "Demitir funcionários sempre que o lucro diminuir."],
                    r: "Capacidade de retornar ao estado original ou adaptar-se rapidamente após um choque externo.",
                    e: "Resiliência é a elasticidade estratégica. Em mundos frágeis e ansiosos (BANI), a capacidade de 'aguentar a pancada' e continuar operando é mais valiosa que a eficiência máxima."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-4 p-6 bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-2xl">
                    <div className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">{item.id}</span>
                      <p className="text-sm font-medium leading-relaxed">{item.q}</p>
                    </div>
                    <div className="ml-12 grid grid-cols-1 gap-2">
                       {item.o.map((opt, oidx) => (
                         <div key={oidx} className={`p-3 rounded-xl border text-xs ${opt === item.r ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-800 dark:text-emerald-400 font-bold' : 'bg-white dark:bg-black/20 border-slate-200 dark:border-slate-800'}`}>
                           {String.fromCharCode(65 + oidx)}) {opt}
                         </div>
                       ))}
                    </div>
                    <div className="ml-12 p-4 bg-blue-500/5 border-l-4 border-blue-500 rounded-r-xl">
                       <p className="text-[10px] font-bold text-blue-700 uppercase mb-1">Gabarito Comentado:</p>
                       <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">{item.e}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bloco 2: Ferramentas de Portfólio e Cenários */}
              <div className="space-y-8">
                <h3 className="text-xl font-bold text-indigo-700 border-b pb-2 flex items-center gap-2">
                  <LuTarget className="w-6 h-6" /> Bloco 2: Ferramentas e Prospectiva
                </h3>

                {[
                  {
                    id: 11,
                    q: "Na Matriz BCG, um produto que possui alta participação de mercado em um setor de baixo crescimento é chamado de:",
                    o: ["Estrela (Star)", "Ponto de Interrogação (Question Mark)", "Vaca Leiteira (Cash Cow)", "Cachorro/Vira-lata (Dog)", "Abacaxi (Pineapple)"],
                    r: "Vaca Leiteira (Cash Cow)",
                    e: "Vaca Leiteira gera caixa constante sem exigir grandes novos investimentos, pois o mercado já está maduro (baixo crescimento). É o que financia novos projetos."
                  },
                  {
                    id: 12,
                    q: "O método de planejamento por cenários foca na identificação de 'Incertezas Críticas'. Qual a principal característica de uma incerteza crítica?",
                    o: ["É um evento fácil de prever com precisão.", "É uma variável de baixo impacto no futuro da empresa.", "É um evento de alto impacto, mas cuja direção futura é altamente incerta ou desconhecida.", "Sempre se refere a desastres naturais imprevisíveis.", "Refere-se apenas à variação do preço da matéria-prima."],
                    r: "É um evento de alto impacto, mas cuja direção futura é altamente incerta ou desconhecida.",
                    e: "Incerteza Crítica é o que realmente molda os cenários diferentes. Se fosse previsível, seria uma 'tendência'. Se tivesse baixo impacto, seria irrelevante."
                  },
                  {
                    id: 13,
                    q: "A análise PESTEL expande a visão do ambiente macro de uma organização. O que representa o 'E' e o 'L' dessa sigla?",
                    o: ["Engenharia e Logística.", "Econômico e Legal.", "Estratégico e Local.", "Eficiência e Liderança.", "Endividamento e Lucratividade."],
                    r: "Econômico e Legal.",
                    e: "PESTEL: Político, Econômico, Social, Tecnológico, Ecológico (Ambiental) e Legal. São as forças externas que a empresa não controla."
                  },
                  {
                    id: 14,
                    q: "De acordo com o Balanced Scorecard, os indicadores financeiros são considerados indicadores de 'lagging' (resultado tardio). Qual o significado disso?",
                    o: ["Eles preveem o futuro com 100% de exatidão.", "Eles mostram o efeito de ações tomadas no passado.", "Eles são irrelevantes para os acionistas.", "Eles focam apenas nos defeitos da produção.", "Eles devem ser medidos apenas de 10 em 10 anos."],
                    r: "Eles mostram o efeito de ações tomadas no passado.",
                    e: "Indicadores financeiros (lucro, ROI) são 'consequências'. Para mudar o financeiro, você precisa atuar nos indicadores de 'leading' (causa), como treinamento e processos internos."
                  },
                  {
                    id: 15,
                    q: "Uma empresa que decide competir através da 'Liderança em Custo' deve priorizar:",
                    o: ["Marketing agressivo e luxuoso.", "Customização extrema para cada cliente.", "Ganho de escala e rígido controle de desperdícios.", "Pesquisa e Desenvolvimento de produtos revolucionários.", "Aumento do preço final para demonstrar exclusividade."],
                    r: "Ganho de escala e rígido controle de desperdícios.",
                    e: "Liderança em Custo foca em ser o produtor mais barato do setor. Isso exige escala, processos otimizados e pouco 'fru-fru' no produto."
                  },
                  {
                    id: 16,
                    q: "O conceito de 'Oceano Azul' na estratégia defende que a empresa deve:",
                    o: ["Competir ferozmente em mercados existentes baixando os preços.", "Buscar novos mercados inexplorados onde a concorrência é irrelevante.", "Comprar todos os seus competidores menores.", "Focar apenas em produtos ligados ao mar e petróleo.", "Ignorar a tecnologia e voltar ao artesanato."],
                    r: "Buscar novos mercados inexplorados onde a concorrência é irrelevante.",
                    e: "Oceano Azul é a criação de um novo espaço de mercado. O Oceano Vermelho é onde as empresas se 'matam' por migalhas de participação."
                  },
                  {
                    id: 17,
                    q: "A Petrobras, como Sociedade de Economia Mista sob a égide da Lei 13.303/16, deve implementar uma 'Carta de Governança'. Qual o objetivo principal desse documento?",
                    o: ["Listar os nomes de todos os funcionários da empresa.", "Definir os bônus salariais dos diretores.", "Declarar publicamente os compromissos de metas e a política de dividendos.", "Explicar como burlar as leis de licitação.", "Descrever os processos químicos de refino de petróleo."],
                    r: "Declarar publicamente os compromissos de metas e a política de dividendos.",
                    e: "A Carta de Governança serve para dar transparência ao mercado e à sociedade sobre o que a estatal pretende fazer com o dinheiro público e como será gerida."
                  },
                  {
                    id: 18,
                    q: "Qual ferramenta é mais adequada para analisar a posição competitiva de diversas unidades de negócio de uma holding?",
                    o: ["Checklist de manutenção.", "Matriz BCG.", "Ciclo PDCA.", "Folha de Verificação.", "Histograma de frequência."],
                    r: "Matriz BCG.",
                    e: "A BCG foi criada justamente para gerenciar 'portfólio' de negócios. Ajuda a decidir onde investir mais, onde manter e onde desinvestir (vender)."
                  },
                  {
                    id: 19,
                    q: "O 'Propósito' da organização, que responde à pergunta 'Para que servimos à sociedade?', costuma estar contido em qual elemento estratégico?",
                    o: ["Visão.", "Cenários.", "Missão.", "SWOT.", "Análise da Concorrência."],
                    r: "Missão.",
                    e: "A Missão define a razão de ser. O propósito social e o valor entregue hoje ao cliente são o núcleo da Missão organizacional."
                  },
                  {
                    id: 20,
                    q: "Na análise de cenários, o 'Cenário Inercial' ou 'Tendencial' é aquele que:",
                    o: ["Considera a mudança mais radical possível.", "Considera que as tendências atuais continuarão sem grandes rupturas.", "Ignora completamente o passado.", "Foca apenas em desastres catastróficos.", "É o único cenário que deve ser planejado."],
                    r: "Considera que as tendências atuais continuarão sem grandes rupturas.",
                    e: "O cenário inercial é o 'Business as usual'. É o ponto de partida para imaginar as rupturas que gerarão os outros cenários."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-4 p-6 bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm tracking-tight">{item.id}</span>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-snug">{item.q}</p>
                    </div>
                    <div className="ml-12 grid grid-cols-1 gap-2">
                       {item.o.map((opt, oidx) => (
                         <div key={oidx} className={`p-4 rounded-xl border text-[11px] flex items-center gap-3 transition-colors ${opt === item.r ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-400 font-bold' : 'bg-white dark:bg-black/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'}`}>
                           <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[9px] font-black">{String.fromCharCode(65 + oidx)}</span>
                           {opt}
                         </div>
                       ))}
                    </div>
                    <div className="ml-12 p-5 bg-indigo-500/5 border-l-4 border-indigo-500 rounded-r-2xl">
                       <p className="text-[9px] font-black text-indigo-700 dark:text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                         <LuSearch className="w-3 h-3" /> Análise do Especialista:
                       </p>
                       <p className="text-[11px] leading-relaxed text-slate-700 dark:text-slate-300 antialiased font-medium">{item.e}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bloco 3: Cultura e Mudança Estratégica */}
              <div className="space-y-8">
                <h3 className="text-xl font-bold text-indigo-700 border-b pb-2 flex items-center gap-2">
                  <LuBrain className="w-6 h-6" /> Bloco 3: Cultura e Execução
                </h3>

                {[
                  {
                    id: 21,
                    q: "Peter Drucker afirmou: 'A cultura come a estratégia no café da manhã'. No planejamento estratégico, isso significa que:",
                    o: ["A estratégia deve ser ignorada em favor da cultura.", "Mesmo o melhor plano estratégico falhará se não estiver alinhado com os valores e a cultura da empresa.", "A cultura organizacional não tem impacto nos resultados financeiros.", "A estratégia deve mudar a cultura da empresa em apenas uma semana.", "Estratégia e Cultura são sinônimos perfeitos."],
                    r: "Mesmo o melhor plano estratégico falhará se não estiver alinhado com os valores e a cultura da empresa.",
                    e: "A cultura é o sistema de crenças invisível. Se o plano pede inovação, mas a cultura pune erros, o plano morrerá. O PE deve respeitar ou planejar a evolução cultural."
                  },
                  {
                    id: 22,
                    q: "A estratégia de 'Nicho' ou 'Enfoque' de Porter é ideal para:",
                    o: ["Empresas gigantescas que querem dominar o mundo todo.", "Pequenas empresas com recursos limitados que focam em um segmento específico.", "Empresas que produzem apenas commodities de baixo valor.", "Órgãos do governo que não possuem concorrência.", "Empresas que querem ter o menor preço do mercado global."],
                    r: "Pequenas empresas com recursos limitados que focam em um segmento específico.",
                    e: "Enfoque permite que a empresa seja 'especialista' em um público (ex: Celíacos, Donos de Carros Antigos), ganhando proteção pela sua expertise."
                  },
                  {
                    id: 23,
                    q: "Qual elemento do Plano Estratégico 2024-2028 da Petrobras é considerado o pilar de crescimento de longo prazo?",
                    o: ["Venda de todas as refinarias.", "Foco exclusivo em energia solar residencial.", "Exploração da Margem Equatorial e maximização do Pré-Sal.", "Importação de 100% do diesel consumido no Brasil.", "Transformação da empresa em uma rede de postos de conveniência."],
                    r: "Exploração da Margem Equatorial e maximização do Pré-Sal.",
                    e: "A estratégia atual foca na reposição de reservas (Margem Equatorial) e na produtividade do Pré-Sal para financiar a transição energética."
                  },
                  {
                    id: 24,
                    q: "A análise de portfólio pela Matriz BCG classifica um produto 'Estrela' como aquele que:",
                    o: ["Gera muito lucro, mas consome pouco investimento.", "Consome muito investimento, mas entrega grande crescimento e participação.", "Deve ser vendido imediatamente por não gerar lucro.", "Possui baixa participação em um mercado saturado.", "É o produto mais antigo da organização."],
                    r: "Consome muito investimento, mas entrega grande crescimento e participação.",
                    e: "Estrelas são o futuro da empresa, mas custam caro (exigem investimento para manter a liderança no mercado que cresce rápido)."
                  },
                  {
                    id: 25,
                    q: "O que caracteriza uma 'Estratégia Emergente', segundo a perspectiva de Mintzberg?",
                    o: ["Um plano escrito por consultores externos e seguido à risca.", "Ações que se tornam um padrão ao longo do tempo, mesmo sem intenção prévia formal.", "Uma estratégia que surge apenas em momentos de falência iminente.", "O uso de inteligência artificial para prever o mercado.", "A estratégia de baixar preços sempre que um concorrente aparece."],
                    r: "Ações que se tornam um padrão ao longo do tempo, mesmo sem intenção prévia formal.",
                    e: "Estratégia Emergente é o aprendizado na prática. É o que a empresa 'acaba fazendo' em resposta ao ambiente, criando um padrão vencedor."
                  },
                  {
                    id: 26,
                    q: "A 'Miopia Estratégica' ocorre quando a organização:",
                    o: ["Usa óculos com grau errado em suas apresentações.", "Foca excessivamente no curto prazo e ignora as ameaças disruptivas do futuro.", "Contrata apenas funcionários com mais de 50 anos.", "Não possui um departamento de marketing.", "Investe 100% do seu lucro em caridade."],
                    r: "Foca excessivamente no curto prazo e ignora as ameaças disruptivas do futuro.",
                    e: "Miopia é a falta de visão de longo prazo. A empresa foca no 'conforto' do lucro de hoje e não vê o concorrente digital que vai destruir seu negócio amanhã."
                  },
                  {
                    id: 27,
                    q: "No BSC, a perspectiva que responde à pergunta 'Para sermos bem-sucedidos financeiramente, como deveríamos parecer para nossos acionistas?' é a:",
                    o: ["Perspectiva do Cliente.", "Perspectiva de Processos Internos.", "Perspectiva Financeira.", "Perspectiva de Inovação.", "Perspectiva Ética."],
                    r: "Perspectiva Financeira.",
                    e: "A perspectiva financeira é o topo da hierarquia no BSC para empresas privadas e sociedades de economia mista, medindo ROI, lucro e valor da ação."
                  },
                  {
                    id: 28,
                    q: "Qual a principal diferença entre os modelos VUCA e BANI?",
                    o: ["VUCA é para empresas de tecnologia e BANI para o agronegócio.", "O modelo BANI enfatiza a fragilidade e a ansiedade de sistemas complexos modernos.", "VUCA é um modelo obsoleto que não deve mais ser estudado.", "BANI é um acrônimo para 'Bancos, Alimentos, Negócios e Indústria'.", "Não há diferença, são apenas nomes novos para a mesma teoria."],
                    r: "O modelo BANI enfatiza a fragilidade e a ansiedade de sistemas complexos modernos.",
                    e: "BANI (Frágil, Ansioso, Não-linear, Incompreensível) é uma evolução do VUCA criada para descrever o mundo pós-pandemia e hiperconectado."
                  },
                  {
                    id: 29,
                    q: "Uma barreira de saída alta em uma indústria (ex: Refino de Petróleo) significa que:",
                    o: ["É muito fácil fechar a fábrica e ir embora.", "Há custos elevados de encerramento, como multas ambientais e ativos caros, o que mantém empresas no mercado mesmo com lucro baixo.", "As empresas podem entrar e sair do mercado como se fosse uma feira livre.", "O governo proíbe qualquer empresa de fechar as portas.", "Os funcionários são donos da empresa."],
                    r: "Há custos elevados de encerramento, como multas ambientais e ativos caros, o que mantém empresas no mercado mesmo com lucro baixo.",
                    e: "Barreiras de saída elevadas (ativos fixos, passivo trabalhista/ambiental) geram 'excesso de oferta', o que aumenta a rivalidade do setor e reduz o lucro de todos."
                  },
                  {
                    id: 30,
                    q: "O 'Controle Estratégico' deve ser, idealmente:",
                    o: ["Apenas punitivo para quem não bate metas.", "Oculto dos funcionários para não gerar estresse.", "Um processo contínuo de monitoramento que permite correções de rumo em tempo real.", "Feito apenas uma vez a cada 10 anos.", "Responsabilidade de uma empresa de auditoria externa apenas."],
                    r: "Um processo contínuo de monitoramento que permite correções de rumo em tempo real.",
                    e: "O controle moderno é cibernético e proativo. Não espera o desastre acontecer: usa indicadores de risco (KRIs) para ajustar a vela antes da tempestade."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-4 p-6 bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-2xl">
                    <div className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-violet-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">{item.id}</span>
                      <p className="text-sm font-medium leading-relaxed">{item.q}</p>
                    </div>
                    <div className="ml-12 grid grid-cols-1 gap-2">
                       {item.o.map((opt, oidx) => (
                         <div key={oidx} className={`p-3 rounded-xl border text-xs ${opt === item.r ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-800 dark:text-emerald-400 font-bold' : 'bg-white dark:bg-black/20 border-slate-200 dark:border-slate-800'}`}>
                           {String.fromCharCode(65 + oidx)}) {opt}
                         </div>
                       ))}
                    </div>
                    <div className="ml-12 p-4 bg-violet-500/5 border-l-4 border-violet-500 rounded-r-xl">
                       <p className="text-[10px] font-bold text-violet-700 uppercase mb-1 flex items-center gap-1">
                         <LuLightbulb className="w-3 h-3" /> Conclusão Pedagógica:
                       </p>
                       <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400 italic">{item.e}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

              {/* Bloco 4: Gestão de Crises e Riscos Estratégicos */}
              <div className="space-y-8">
                <h3 className="text-xl font-bold text-indigo-700 border-b pb-2 flex items-center gap-2">
                  <LuShieldCheck className="w-6 h-6" /> Bloco 4: Crises e Riscos
                </h3>

                {[
                  {
                    id: 31,
                    q: "Em situações de crise inesperada (cisnes negros), qual o papel do planejamento estratégico tradicional?",
                    o: ["Ser seguido rigorosamente, pois foi planejado pelos gênios da empresa.", "Ser pausado para que a gestão de crises assuma o comando tático imediato.", "Ser jogado no lixo, pois planejamento não serve para crises.", "Ser alterado apenas após o fim da crise, por via das dúvidas.", "Ser usado para culpar os subordinados pela falha de previsão."],
                    r: "Ser pausado para que a gestão de crises assuma o comando tático imediato.",
                    e: "Em crises extremas, a sobrevivência (operacional e tática) é prioridade. O PE é o guia de longo prazo, mas o plano de contingência assume o timão no curto prazo."
                  },
                  {
                    id: 32,
                    q: "O 'Compliance' em estatais como a Petrobras, sob a Lei 13.303, é um elemento de:",
                    o: ["Aumento desnecessário de burocracia.", "Redução de riscos estratégicos e proteção do patrimônio público.", "Marketing para enganar investidores estrangeiros.", "Aceleração de processos de contratação sem licitação.", "Substituição total do conselho de administração."],
                    r: "Redução de riscos estratégicos e proteção do patrimônio público.",
                    e: "Compliance (Estar em conformidade) garante que a estratégia seja executada dentro da lei, evitando escândalos que destroem o valor da empresa no longo prazo."
                  },
                  {
                    id: 33,
                    q: "Na análise SWOT, uma 'Fraqueza' (Weakness) da Petrobras poderia ser:",
                    o: ["Queda no preço do barril Brent.", "Tecnologia de perfuração em águas profundas subdesenvolvida.", "Elevado endividamento bruto em dólar dependente do câmbio internacional.", "Novas leis ambientais mais rígidas na Europa.", "Aumento da concorrência de operadoras de energia solar locais."],
                    r: "Elevado endividamento bruto em dólar dependente do câmbio internacional.",
                    e: "Fraqueza é algo INTERNO e NEGATIVO. O endividamento é uma variável que a gestão financeira da empresa controla e deve monitorar. Preço do Brent e Leis são externos (Ameaças)."
                  },
                  {
                    id: 34,
                    q: "A ferramenta de 'Mapeamento de Stakeholders' serve para:",
                    o: ["Saber quem são os acionistas que mais falam mal da empresa.", "Identificar quem pode influenciar ou ser influenciado pela estratégia e como gerenciar essas expectativas.", "Descobrir o endereço residencial de todos os fornecedores.", "Eliminar todos os stakeholders que não concordam com a diretoria.", "Substituir o conselho fiscal por representantes de ONGs."],
                    r: "Identificar quem pode influenciar ou ser influenciado pela estratégia e como gerenciar essas expectativas.",
                    e: "Stakeholder Management é política organizacional pura. Saber quem mexe os pauzinhos e quem será afetado é vital para a aceitação social do plano."
                  },
                  {
                    id: 35,
                    q: "A 'Cultura de Segurança' na Petrobras é considerada um:",
                    o: ["Custo operacional evitável.", "Valor estratégico inegociável contido na Missão e Visão.", "Mera decoração de cartazes nas plataformas.", "Responsabilidade apenas dos técnicos de segurança do trabalho.", "Obstáculo para a maximização dos lucros rápidos."],
                    r: "Valor estratégico inegociável contido na Missão e Visão.",
                    e: "Segurança é o valor número 1 da Petrobras. Um acidente grave destrói a estratégia, o valor da ação e a reputação da empresa por décadas."
                  },
                  {
                    id: 36,
                    q: "A ferramenta 'Cinco Porquês' (5 Whys) é usada principalmente no controle estratégico para:",
                    o: ["Questionar a sanidade dos diretores.", "Chegar à causa raiz de um problema ou desvio de meta.", "Criar cinco novas diretrizes para cada uma que falhar.", "Demorar cinco vezes mais para entregar um relatório.", "Justificar o atraso em uma auditoria externa."],
                    r: "Chegar à causa raiz de um problema ou desvio de meta.",
                    e: "A técnica dos 5 porquês ajuda a sair do sintoma ('a meta não bateu') e chegar à causa real ('o equipamento falhou por fadiga de material que não foi comprado por erro orçamentário')."
                  },
                  {
                    id: 37,
                    q: "Na Matriz BCG, o quadrante 'Cachorro' (Dog) representa produtos que:",
                    o: ["São os melhores amigos do gerente de marketing.", "Devem receber todo o investimento possível por serem fofos.", "Têm baixa participação em um mercado de baixo crescimento, sendo candidatos ao desinvestimento.", "São altamente lucrativos no início do seu ciclo de vida.", "Devem ser transformados em 'Estrelas' a qualquer custo."],
                    r: "Têm baixa participação em um mercado de baixo crescimento, sendo candidatos ao desinvestimento.",
                    e: "Cães são negócios ruins. Se não dão lucro e não crescem, consomem recursos preciosos que poderiam estar em PEs (E&P ou Renovável)."
                  },
                  {
                    id: 38,
                    q: "O 'Plano de Negócios e Gestão (PNG)' da Petrobras é a materialização de qual nível de planejamento?",
                    o: ["Nível Operacional (Tarefas diárias).", "Nível Tático/Estratégico (Define o rumo para os próximos 5 anos).", "Nível Apenas Financeiro.", "Nível Político-Partidário.", "Nível de Marketing de Relacionamento."],
                    r: "Nível Tático/Estratégico (Define o rumo para os próximos 5 anos).",
                    e: "O PNG é a bíblia da Petrobras. Ele traduz a Visão de longo prazo em projetos concretos com prazos e orçamentos definidos de médio prazo."
                  },
                  {
                    id: 39,
                    q: "O que significa 'Agilidade Estratégica' em uma organização de grande porte?",
                    o: ["Fazer tudo correndo e sem planejamento.", "Capacidade de reconfigurar recursos e processos de forma rápida perante ameaças ou oportunidades.", "Contratar consultores que fiquem correndo pelos corredores.", "Alterar a marca da empresa toda semana.", "Ignorar a Lei das Estatais para agir mais rápido."],
                    r: "Capacidade de reconfigurar recursos e processos de forma rápida perante ameaças ou oportunidades.",
                    e: "Agilidade estratégica em gigantes como a Petrobras significa ter braços flexíveis (Unidades Ágeis) que respondem rápido a inovações tecnológicas sem quebrar a estrutura central."
                  },
                  {
                    id: 40,
                    q: "Qual conceito define o foco da Petrobras em liderar a 'Transição Energética Justa'?",
                    o: ["Mudar para energia eólica independentemente do custo.", "Garantir que a mudança para renováveis ocorra de forma a não destruir empregos e garantir a energia para a sociedade.", "Ignorar as mudanças climáticas e focar apenas no petróleo.", "Vender toda a divisão de biocombustíveis.", "Transformar as refinarias em museus históricos."],
                    r: "Garantir que a mudança para renováveis ocorra de forma a não destruir empregos e garantir a energia para a sociedade.",
                    e: "Justiça na transição significa equilíbrio. É estratégica pois mantém a 'Licença Social para Operar', garantindo que o progresso ambiental não gere desequilíbrio social."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-4 p-6 bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-2xl">
                    <div className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-rose-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">{item.id}</span>
                      <p className="text-sm font-medium leading-relaxed">{item.q}</p>
                    </div>
                    <div className="ml-12 grid grid-cols-1 gap-2">
                       {item.o.map((opt, oidx) => (
                         <div key={oidx} className={`p-3 rounded-xl border text-xs ${opt === item.r ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-800 dark:text-emerald-400 font-bold' : 'bg-white dark:bg-black/20 border-slate-200 dark:border-slate-800'}`}>
                           {String.fromCharCode(65 + oidx)}) {opt}
                         </div>
                       ))}
                    </div>
                    <div className="ml-12 p-4 bg-emerald-500/5 border-l-4 border-emerald-500 rounded-r-xl">
                       <p className="text-[10px] font-bold text-emerald-700 uppercase mb-1 flex items-center gap-1">
                         <LuAward className="w-3 h-3" /> Chave do Sucesso:
                       </p>
                       <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400 italic font-medium">{item.e}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Seção Extra 1: Estudo de Caso Master - A Petrobras no Olho do Furacão */}
              <div className="mt-20 space-y-12">
                <div className="p-12 bg-gradient-to-br from-slate-800 to-slate-950 rounded-[50px] text-white shadow-3xl relative overflow-hidden border border-white/5">
                   <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none rotate-12">
                      <LuTarget className="w-80 h-80" />
                   </div>
                   
                   <div className="relative z-10 space-y-10">
                      <div className="inline-flex items-center gap-3 px-5 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-[11px] font-black uppercase tracking-[0.2em]">
                         <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" /> Análise de Nível Gerencial (Premium)
                      </div>
                      
                      <h3 className="text-5xl font-black tracking-tighter leading-[0.9] italic uppercase max-w-3xl">
                         Estudo de Caso Pro:<br/>
                         <span className="text-emerald-500">O Dilema da Transição Energética</span> na Petrobras
                      </h3>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-4">
                         <div className="space-y-8">
                            <div className="space-y-4">
                               <p className="text-base leading-relaxed text-slate-300 font-medium italic border-l-2 border-emerald-500 pl-6">
                                  "Como planejar a sobrevivência de longo prazo quando seu produto principal é o centro de uma crise climática global? Este é o dilema que o PE 2024-2028 tenta resolver."
                               </p>
                               <p className="text-[12px] leading-relaxed text-slate-400">
                                  O Planejamento Estratégico da Petrobras hoje opera em duas velocidades. A primeira é a velocidade do <strong>Pré-sal</strong>: eficiente, lucrativa e geradora de caixa imediato. A segunda é a velocidade da <strong>Descarbonização</strong>: lenta, experimental e intensiva em capital. O desafio estratégico é: como usar o lucro da primeira para financiar a existência da segunda sem quebrar a empresa no processo?
                               </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                               <div className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                                  <p className="font-bold text-emerald-400 text-xs mb-3 flex items-center gap-2"><LuBrain className="w-4 h-4" /> Visão 2050</p>
                                  <p className="text-[10px] leading-relaxed text-slate-400">Neutralidade de carbono em operações sob controle (Escopo 1 e 2) e ambição de influenciar a cadeia.</p>
                               </div>
                               <div className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                                  <p className="font-bold text-blue-400 text-xs mb-3 flex items-center gap-2"><LuTarget className="w-4 h-4" /> CAPEX Verde</p>
                                  <p className="text-[10px] leading-relaxed text-slate-400">Alocação histórica de US$ 11,5 bilhões em projetos de baixo carbono no quinquênio.</p>
                               </div>
                            </div>
                         </div>

                         <div className="space-y-6">
                            <div className="p-8 bg-white/5 rounded-[3rem] border border-white/10 space-y-6">
                               <h4 className="text-xs font-black uppercase text-emerald-400 tracking-widest border-b border-white/10 pb-4">Análise SWOT Dinâmica (Cenário 2024)</h4>
                               <div className="space-y-6">
                                  <div className="flex gap-4">
                                     <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 font-bold text-xs italic">F</div>
                                     <div className="space-y-1">
                                        <p className="text-[11px] font-bold text-white uppercase">Custo de Extração de Elite</p>
                                        <p className="text-[10px] text-slate-400 leading-relaxed">A Petrobras produz o barril mais 'limpo' (menos CO2 por barril) e mais barato do mundo no Pré-sal.</p>
                                     </div>
                                  </div>
                                  <div className="flex gap-4">
                                     <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 shrink-0 font-bold text-xs italic">A</div>
                                     <div className="space-y-1">
                                        <p className="text-[11px] font-bold text-white uppercase">Obsolescência da Demanda</p>
                                        <p className="text-[10px] text-slate-400 leading-relaxed">Eletrificação veicular na China e Europa pode derrubar a demanda global por combustível fóssil abruptamente.</p>
                                     </div>
                                  </div>
                                  <div className="flex gap-4">
                                     <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 font-bold text-xs italic">O</div>
                                     <div className="space-y-1">
                                        <p className="text-[11px] font-bold text-white uppercase">Liderança em Eólica Offshore</p>
                                        <p className="text-[10px] text-slate-400 leading-relaxed">Uso das plataformas desativadas para ancorar torres de geração eólica, criando uma economia circular.</p>
                                     </div>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                      
                      <div className="pt-10 border-t border-white/10 text-center">
                         <p className="text-[10px] font-mono text-slate-500 italic">
                            "Estratégia não é o que você diz que vai fazer, é onde você coloca o seu CAPEX." - Provérbio de Gestão Corporativa.
                         </p>
                      </div>
                   </div>
                </div>

                {/* Seção Extra 2: Nota Técnica - A Blindagem da Lei 13.303/16 */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[4rem] p-12 space-y-12 shadow-sm">
                   <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 dark:border-slate-800 pb-12">
                      <div className="space-y-4 max-w-xl">
                         <h4 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-slate-100 uppercase leading-none">
                            Nota Técnica:<br/>
                            <span className="text-indigo-600">A Governança Blindada</span>
                         </h4>
                         <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
                            O Planejamento Estratégico em uma estatal não é livre. Ele é amarrado por uma das leis mais rígidas do mundo corporativo: a <strong>Lei das Estatais</strong>. Entenda como ela molda o PE da Petrobras.
                         </p>
                      </div>
                      <div className="px-6 py-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                         <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Status Jurídico: Ativo</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                       </div>
                </div>
              </div>
         </div>
       </TabsContent>

        {/* Nota Final do Instrutor */}
        <div className="mt-20 p-12 bg-gradient-to-r from-slate-50 to-indigo-50 dark:from-slate-900/50 dark:to-indigo-900/50 rounded-[4rem] border border-indigo-200/50 text-center space-y-6 relative overflow-hidden">
           <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl" />
           <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl" />
           
           <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl flex items-center justify-center mx-auto mb-6 border border-indigo-100 dark:border-indigo-900 group hover:rotate-12 transition-transform cursor-pointer">
              <LuAward className="w-10 h-10 text-indigo-600 group-hover:scale-110 transition-transform" />
           </div>
           
           <h4 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tighter uppercase italic">O Futuro te espera na Petrobras!</h4>
           
           <p className="text-[13px] text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
              Você concluiu a jornada de elite pelo <strong>Planejamento Estratégico</strong>. O caminho até o crachá verde e amarelo é feito de consistência. Este módulo agora é parte do seu arsenal técnico. Revisite-o sempre que a dúvida bater.
           </p>
           
           <div className="flex justify-center gap-2 mt-8">
              {[1,2,3,4,5].map(i => <div key={i} className="w-2 h-2 rounded-full bg-indigo-500/20" />)}
           </div>
           
           <p className="text-[11px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] pt-4">Você está pronto. Avante!</p>
        </div>
    </AulaTemplate>
  );
}
