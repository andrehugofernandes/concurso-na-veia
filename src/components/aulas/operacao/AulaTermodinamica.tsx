"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuBookOpen,
  LuClock,
  LuTrophy,
  LuCheck,
  LuTriangle,
  LuLightbulb,
  LuGauge,
  LuThermometer,
  LuWind,
  LuZap,
  LuFlame,
  LuDroplets,
  LuChevronRight,
  LuChevronLeft,
  LuPlay,
  LuFileText,
  LuBrain,
  LuTarget,
  LuShieldAlert,
  LuLock
} from "react-icons/lu";
import Link from "next/link";

import {
  AulaProps,
  AlertBox,
  CardCarousel,
  ContentAccordion,
  QuizInterativo,
  ProgressIndicator,
  FlipCard,
  VideoModal,
  FunctionGraph,
  type FunctionPlot
} from "../shared";

import {
  ModuleBanner,
  ModuleSectionHeader,
  ModuleConsolidation,
  StickyModuleNav
} from "../shared";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * AULA: TERMODINÂMICA (Conhecimentos Específicos - Bloco I)
 * Cargo: Técnico de Operação
 * Foco: Leis, Ciclos e Aplicações Industriais
 */
export default function AulaTermodinamica({
  onComplete,
  isCompleted,
  loading,
  xpGanho = 500,
  currentProgress = 0,
  onUpdateProgress,
  titulo,
  descricao,
  duracao,
  materiaNome,
  materiaCor,
  materiaId,
  prevTopico,
  nextTopico
}: AulaProps) {
    const STORAGE_KEY_PREFIX = "petrobras_quest_aula_operacao_termodinamica_";

  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}active_tab`);
      return saved || "introducao";
    }
    return "introducao";
  });

  const [completedModules, setCompletedModules] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}completed_modules`);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return [];
        }
      }
    }
    return [];
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
        JSON.stringify(completedModules)
      );
    }
  }, [completedModules]);
  const [showConfetti, setShowConfetti] = useState(false);

  // Módulos da Aula
  const mudulos = [
    { id: "introducao", label: "Início", icon: LuPlay },
    { id: "modulo-1", label: "Conceitos", icon: LuGauge },
    { id: "modulo-2", label: "As Leis", icon: LuThermometer },
    { id: "modulo-3", label: "Ciclos", icon: LuZap },
    { id: "modulo-4", label: "Vapor", icon: LuDroplets },
    { id: "conclusao", label: "Finalização", icon: LuTrophy },
  ];

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules(prev => [...prev, moduleId]);
    }
  };

  useEffect(() => {
    const progress = (completedModules.length / (mudulos.length - 2)) * 100;
    if (onUpdateProgress) onUpdateProgress(progress);
    
    if (completedModules.length >= mudulos.length - 2 && !isCompleted) {
      // Aula concluída virtualmente
    }
  }, [completedModules]);

  // Gráfico: Isoterma (P = nRT / V) - P em função de V
  const isotermaData: FunctionPlot[] = [
    {
      id: "isoterma-300k",
      label: "T1 = 300K",
      color: "#3b82f6",
      fn: (v) => 300 / v,
    },
    {
      id: "isoterma-500k",
      label: "T2 = 500K",
      color: "#f59e0b",
      fn: (v) => 500 / v,
    },
    {
        id: "adiabatica",
        label: "Adiabática (Q=0)",
        color: "#ef4444",
        fn: (v) => 800 / Math.pow(v, 1.4), // P * V^gamma = const
    }
  ];

  // Dados do Quiz: Módulo 1
  const quizModulo1 = [
    {
      id: 1,
      pergunta: "Em um sistema FECHADO, o que pode atravessar a fronteira?",
      opcoes: [
        { label: "A", valor: "Massa e Energia" },
        { label: "B", valor: "Apenas Massa" },
        { label: "C", valor: "Apenas Energia (Calor/Trabalho)" },
        { label: "D", valor: "Nada atravessa a fronteira" },
      ],
      correta: "C",
      explicacao: "Sistemas fechados trocam energia mas NÃO trocam massa com o ambiente."
    },
    {
      id: 2,
      pergunta: "Qual das propriedades abaixo é EXTENSIVA?",
      opcoes: [
        { label: "A", valor: "Pressão" },
        { label: "B", valor: "Temperatura" },
        { label: "C", valor: "Volume Total" },
        { label: "D", valor: "Massa Específica" },
      ],
      correta: "C",
      explicacao: "Propriedades extensivas dependem do tamanho do sistema. Volume e massa são extensivas; pressão e temperatura são intensivas."
    }
  ];

  return (
    <div className="relative min-h-screen bg-background pb-32">
      <ProgressIndicator percent={currentProgress} />
      
      {/* Navegação Superior Fixa */}
      <StickyModuleNav 
        modules={mudulos}
        activeTab={activeTab}
        completedModules={new Set(completedModules)}
        isModuleUnlocked={(index) => true} // For specific class we can allow all or implement logic
      />

      <main className="max-w-7xl mx-auto px-4 pt-24 md:pt-32">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          
          {/* ══════════════════════════════════════════════════════════════════
              PÁGINA INICIAL: INTRODUÇÃO
              ══════════════════════════════════════════════════════════════════ */}
          <TabsContent value="introducao" className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-lg font-bold uppercase tracking-wider">
                    <LuFlame className="animate-pulse" /> Conhecimentos Específicos - Bloco I
                    </div>
                  <h1 className="text-5xl md:text-7xl font-black text-foreground leading-[1.1] tracking-tight">
                    Termodinâmica <span className="text-amber-500 italic">Industrial</span>
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl font-medium">
                    A espinha dorsal de qualquer refinaria ou plataforma. Entenda como transformar calor em potência e dominar os processos que movem a Petrobras.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-3 bg-card border border-border px-5 py-3 rounded-2xl shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                      <LuClock size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Duração</p>
                      <p className="text-lg font-bold">{duracao}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-card border border-border px-5 py-3 rounded-2xl shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                      <LuTrophy size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Recompensa</p>
                      <p className="text-lg font-bold">+{xpGanho} XP</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-card border border-border px-5 py-3 rounded-2xl shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                      <LuTarget size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Nível</p>
                      <p className="text-lg font-bold">Especialista</p>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => setActiveTab("modulo-1")}
                  size="lg" 
                  className="h-16 px-10 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg shadow-xl shadow-amber-500/20 group"
                >
                  Iniciar Jornada Técnica
                  <LuChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <div className="lg:col-span-5 relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500/20 to-transparent blur-3xl opacity-50" />
                <div className="relative aspect-square rounded-[2rem] overflow-hidden border-4 border-card shadow-2xl skew-y-2 hover:skew-y-0 transition-transform duration-700">
                  <img 
                    src="/termodinamica_banner.png" 
                    alt="Termodinâmica Industrial" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                    <p className="text-white/60 text-lg font-bold uppercase tracking-widest mb-2">Simulação de Fluxo</p>
                    <h3 className="text-white text-2xl font-black italic">Ciclos de Vida da Energia</h3>
                  </div>
                </div>
              </div>
            </div>

            <section className="mb-20">
              <div className="mb-10 text-center space-y-2">
                <h2 className="text-3xl font-black">O que você vai dominar</h2>
                <p className="text-muted-foreground">Competências essenciais para o Técnico de Operação</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: LuGauge, title: "Sistemas e Estados", desc: "Definições de fronteiras e propriedades intensivas/extensivas." },
                  { icon: LuFlame, title: "1ª Lei", desc: "Balanço de energia, calor e trabalho em regime permanente." },
                  { icon: LuWind, title: "2ª Lei e Entropia", desc: "Irreversibilidades e eficiência isentrópica em máquinas." },
                  { icon: LuZap, title: "Ciclos Rankine", desc: "Operação de caldeiras e turbinas a vapor no refino." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -5 }}
                    className="p-8 bg-card rounded-3xl border border-border shadow-md space-y-4 hover:border-amber-500/40 transition-all"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                      <item.icon size={28} />
                    </div>
                    <h4 className="font-black text-xl">{item.title}</h4>
                    <p className="text-lg text-muted-foreground leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          </TabsContent>

          {/* ══════════════════════════════════════════════════════════════════
              MÓDULO 1: CONCEITOS E SISTEMAS
              ══════════════════════════════════════════════════════════════════ */}
          <TabsContent value="modulo-1" className="space-y-[60px]">
            <ModuleBanner 
              numero={1}
              titulo="Fundamentos e Definições"
              descricao="A linguagem da termodinâmica. Sem estes conceitos, é impossível ler um painel de controle ou interpretar um P&ID corretamente."
              gradiente="bg-gradient-to-br from-amber-300 via-amber-500 to-amber-400"
            />

            <div className="space-y-[80px]">
              <section className="space-y-12">
                <ModuleSectionHeader 
                  index="INTRO"
                  title="O Universo Termodinâmico"
                  description="Como isolar o que importa para análise técnica."
                  variant="amber"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <FlipCard 
                    frente={
                      <div className="space-y-4 text-center">
                        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto text-blue-500">
                          <LuTarget size={32} />
                        </div>
                        <h3 className="text-2xl font-black">Sistema Aberto</h3>
                        <p className="text-lg text-muted-foreground underline decoration-blue-500/30">Clique para ver o verso</p>
                      </div>
                    }
                    verso={
                      <div className="space-y-4 text-center">
                         <p className="text-blue-600 font-bold uppercase tracking-tighter text-lg">Conceito Típico</p>
                         <p className="text-lg font-medium">Troca **Massa** e **Energia**. Exemplo: Uma turbina ou uma válvula de controle.</p>
                         <div className="mt-4 p-3 bg-blue-600/10 rounded-xl text-blue-700 text-lg font-bold italic">
                           "Volume de Controle"
                         </div>
                      </div>
                    }
                    variant="blue"
                  />
                  <FlipCard 
                    frente={
                      <div className="space-y-4 text-center">
                        <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto text-amber-500">
                           <LuShieldAlert size={32} />
                        </div>
                        <h3 className="text-2xl font-black">Sistema Fechado</h3>
                         <p className="text-lg text-muted-foreground underline decoration-amber-500/30">Clique para ver o verso</p>
                      </div>
                    }
                    verso={
                      <div className="space-y-4 text-center">
                         <p className="text-amber-600 font-bold uppercase tracking-tighter text-lg">Conceito Típico</p>
                         <p className="text-lg font-medium">Troca apenas **Energia**. A massa permanece fixa.</p>
                         <div className="mt-4 p-3 bg-amber-600/10 rounded-xl text-amber-700 text-lg font-bold italic">
                           "Massa de Controle"
                         </div>
                      </div>
                    }
                    variant="amber"
                  />
                   <FlipCard 
                    frente={
                      <div className="space-y-4 text-center">
                        <div className="w-16 h-16 bg-slate-500/10 rounded-full flex items-center justify-center mx-auto text-slate-500">
                          <LuLock size={32} />
                        </div>
                        <h3 className="text-2xl font-black">S. Isoliado</h3>
                         <p className="text-lg text-muted-foreground underline decoration-slate-500/30">Clique para ver o verso</p>
                      </div>
                    }
                    verso={
                      <div className="space-y-4 text-center">
                         <p className="text-slate-600 font-bold uppercase tracking-tighter text-lg">Conceito Típico</p>
                         <p className="text-lg font-medium">Não troca nada. O universo idealizado.</p>
                      </div>
                    }
                    variant="slate"
                  />
                </div>

                <ContentAccordion 
                  titulo="Propriedades Intensivas vs Extensivas"
                  icone="🔬"
                  slides={[
                    {
                      titulo: "Propriedades Intensivas (Foco em Operação)",
                      icone: "🌡️",
                      conteudo: (
                         <div className="space-y-4">
                           <p>São Independentes da massa do sistema. Se você dividir o sistema ao meio, elas permanecem iguais.</p>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="p-3 border border-border rounded-xl flex items-center gap-3">
                                <span className="p-2 bg-orange-100 rounded-lg text-orange-600 italic font-black">T</span>
                                <span className="text-lg font-bold">Temperatura</span>
                              </div>
                               <div className="p-3 border border-border rounded-xl flex items-center gap-3">
                                <span className="p-2 bg-blue-100 rounded-lg text-blue-600 italic font-black">P</span>
                                <span className="text-lg font-bold">Pressão</span>
                              </div>
                           </div>
                           <AlertBox tipo="info" titulo="Macete Cesgranrio">
                             Qualquer propriedade **específica** (volume específico, energia interna específica) é **INTENSIVA**. Se tem "específico" no nome, não depende da massa total.
                           </AlertBox>
                         </div>
                      )
                    },
                    {
                      titulo: "Propriedades Extensivas",
                      icone: "📦",
                      conteudo: (
                        <div className="space-y-4">
                          <p>Dependem diretamente da quantidade de matéria no sistema.</p>
                          <ul className="space-y-2">
                             <li className="flex items-center gap-3"><LuCheck className="text-emerald-500"/> Volume Total (V)</li>
                             <li className="flex items-center gap-3"><LuCheck className="text-emerald-500"/> Massa Total (m)</li>
                             <li className="flex items-center gap-3"><LuCheck className="text-emerald-500"/> Energia Interna Total (U)</li>
                          </ul>
                        </div>
                      )
                    }
                  ]}
                />
              </section>

              <section className="space-y-12">
                <ModuleSectionHeader 
                  index={2}
                  title="Estados e Processos"
                  description="Como o sistema caminha de um ponto a outro."
                  variant="amber"
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-black">Diagramas P-V: O Mapa do Operador</h3>
                    <p className="text-muted-foreground">O comportamento de um gás ideal ou real é frequentemente analisado através de funções matemáticas. No gráfico ao lado, você pode ver fatias de temperatura constante (**Isotermas**).</p>
                    <div className="space-y-4">
                      <div className="p-4 bg-muted rounded-2xl border border-border">
                        <p className="text-lg font-bold mb-2">💡 Observação do Gráfico:</p>
                        <p className="text-lg text-muted-foreground leading-relaxed">Quanto mais alta a curva no gráfico P-V, maior é a temperatura do gás. A área sob a curva representa o **Trabalho (W)** realizado ou recebido.</p>
                      </div>
                      <AlertBox tipo="warning" titulo="Equação de Clapeyron">
                         PV = nRT. Lembrar que a pressão é inversamente proporcional ao volume em processos isotérmicos.
                      </AlertBox>
                    </div>
                  </div>
                  <div className="bg-card p-4 rounded-3xl border border-border shadow-2xl">
                    <FunctionGraph 
                      title="Isotermas de um Gás Ideal"
                      functions={isotermaData}
                      xMin={1}
                      xMax={10}
                      yMin={0}
                      yMax={600}
                      xLabel="Volume (V)"
                      yLabel="Pressão (P)"
                    />
                  </div>
                </div>
              </section>

              



<ModuleConsolidation 
                index={1}
                variant="amber"
                resumoVisual={{
                  moduloNome: "Módulo 1",
                  tituloAula: "Bases da Termo",
                  materia: "Técnico de Operação",
                  images: [
                    { title: "Definição de Fronteira", type: "Esquema", placeholderColor: "bg-amber-500/20" },
                    { title: "Intensivas vs Extensivas", type: "Tabela", placeholderColor: "bg-orange-500/20" }
                  ]
                }}
                sinteseEstrategica={{
                  title: "Propriedades",
                  content: (
                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                      <p className="font-bold text-amber-600">Intensivas vs Extensivas</p>
                      <p className="text-lg">Dividiu ao meio? Se ficar igual é Intensiva (T, P). Se mudar é Extensiva (m, V).</p>
                    </div>
                  )
                }}
                podcast={{
            aulaId: "termodinamica",
            aulaTitulo: "Termodinamica",
            materia: "Operação",
            materiaId: "operacao",
            moduloNumero: 1,
            moduloTitulo: "Módulo 1",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                            <QuizInterativo 
                questoes={quizModulo1}
                titulo="QUIZ: Módulo Nº 1"
                icone="🧠"
                numero={3}
                variant="amber"
                onComplete={(score) => handleModuleComplete("modulo-1", score)}
              />
            </div>
          </TabsContent>

          {/* ══════════════════════════════════════════════════════════════════
              MÓDULO 2: AS LEIS (1ª E 2ª)
              ══════════════════════════════════════════════════════════════════ */}
          <TabsContent value="modulo-2" className="space-y-[60px]">
             <ModuleBanner 
              numero={2}
              titulo="As Leis Capitais"
              descricao="Onde a conservação encontra a eficiência. Estude os balanços de energia que regem bombas, compressores e trocadores de calor."
              gradiente="bg-gradient-to-br from-blue-300 via-blue-500 to-blue-400"
            />

            <div className="space-y-[80px]">
              <section className="space-y-12">
                 <ModuleSectionHeader 
                  index="INTRO"
                  title="Primeira Lei: Balanço Crítico"
                  description="Energia não se cria, se transforma."
                  variant="blue"
                />

                <div className="bg-blue-500/5 p-8 rounded-3xl border border-blue-500/20 space-y-6">
                   <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-500 text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-blue-500/20">Σ</div>
                      <h3 className="text-3xl font-black italic">Q - W = ΔU + ΔKE + ΔPE</h3>
                   </div>
                   <p className="text-lg text-muted-foreground">Em regimes de fluxo em refinarias (Turbinas/Bombas), usamos a forma de **Entalpia (H)**:</p>
                   <div className="p-6 bg-card border border-border rounded-2xl shadow-inner">
                      <p className="text-2xl font-black text-center text-blue-600 dark:text-blue-400">Q̇ - Ẇ = ṁ(h₂ - h₁ + ...)</p>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                       <div className="p-5 bg-card border border-border rounded-2xl hover:border-blue-500/40 transition-colors">
                          <h4 className="font-bold mb-2 flex items-center gap-2"><LuFlame className="text-red-500"/> Calor (Q)</h4>
                          <ul className="text-lg space-y-1 text-muted-foreground">
                            <li>Positivo (+): Calor ENTROU no sistema.</li>
                            <li>Negativo (-): Calor SAIU do sistema.</li>
                          </ul>
                       </div>
                        <div className="p-5 bg-card border border-border rounded-2xl hover:border-blue-500/40 transition-colors">
                          <h4 className="font-bold mb-2 flex items-center gap-2"><LuZap className="text-amber-500"/> Trabalho (W)</h4>
                          <ul className="text-lg space-y-1 text-muted-foreground">
                            <li>Positivo (+): Trabalho REALIZADO pelo sistema.</li>
                            <li>Negativo (-): Trabalho RECEBIDO pelo sistema.</li>
                          </ul>
                       </div>
                   </div>
                </div>
              </section>

              <section className="space-y-12">
                 <ModuleSectionHeader 
                  index={2}
                  title="Segunda Lei e Entropia"
                  description="O limite do possível e a seta do tempo."
                  variant="blue"
                />

                <CardCarousel 
                  titulo="Enunciados da 2ª Lei"
                  subtitulo="A base para entender por que você não tem rendimento de 100%."
                  cards={[
                    {
                      icone: <LuThermometer />,
                      titulo: "Clausius",
                      descricao: "O calor não flui espontaneamente de um corpo frio para um quente. É necessário TRABALHO extra.",
                      exemplo: "Funcionamento do seu refrigerador ou ciclo de refrigeração industrial.",
                      corFundo: "bg-blue-100 dark:bg-blue-900/30"
                    },
                    {
                      icone: <LuFlame />,
                      titulo: "Kelvin-Planck",
                      descricao: "É impossível converter TODO o calor de uma fonte em trabalho. Sempre haverá rejeição para uma fonte fria.",
                      exemplo: "Por que uma turbina SEMPRE precisa de um condensador/torre de resfriamento.",
                      corFundo: "bg-amber-100 dark:bg-amber-900/30"
                    },
                    {
                      icone: <LuBrain />,
                      titulo: "Entropia (S)",
                      descricao: "O grau de desordem. Em processos reais (irreversíveis), a entropia do universo sempre AUMENTA.",
                      exemplo: "O atrito em um pistão gera calor dissipado, aumentando a entropia e reduzindo a eficiência.",
                      corFundo: "bg-purple-100 dark:bg-purple-900/30"
                    }
                  ]}
                />
              </section>

               <ModuleConsolidation 
                index={2}
                variant="blue"
                resumoVisual={{
                  moduloNome: "Módulo 2",
                  tituloAula: "Leis da Termo",
                  materia: "Técnico de Operação",
                  images: [
                    { title: "Balanço de Energia", type: "Gráfico", placeholderColor: "bg-blue-500/20" },
                    { title: "Ciclo de Carnot Ideal", type: "Esquema", placeholderColor: "bg-indigo-500/20" }
                  ]
                }}
                sinteseEstrategica={{
                  title: "A Diferença de Ouro",
                  content: (
                    <div className="space-y-4">
                      <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                         <p className="font-black text-emerald-600 mb-1">Entalpia (H)</p>
                         <p className="text-lg">Energia total para processos de FLUXO (h = u + Pv).</p>
                      </div>
                      <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                         <p className="font-black text-orange-600 mb-1">Entropia (S)</p>
                         <p className="text-lg">Mede a impossibilidade de conversão em trabalho útil.</p>
                      </div>
                    </div>
                  )
                }}
                podcast={{
            aulaId: "termodinamica",
            aulaTitulo: "Termodinamica",
            materia: "Operação",
            materiaId: "operacao",
            moduloNumero: 2,
            moduloTitulo: "Módulo 2",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />
            </div>
          </TabsContent>

          {/* ══════════════════════════════════════════════════════════════════
              MÓDULO 3: CICLOS DE POTÊNCIA
              ══════════════════════════════════════════════════════════════════ */}
          <TabsContent value="modulo-3" className="space-y-[60px]">
             <ModuleBanner 
              numero={3}
              titulo="Ciclos Industriais"
              descricao="Como fazemos a mágica acontecer. De turbinas a vapor a motores de combustão, aprenda os ciclos que operam nas unidades da Petrobras."
              gradiente="bg-gradient-to-br from-emerald-300 via-emerald-500 to-emerald-400"
            />

            <div className="space-y-[80px]">
              <section className="space-y-12">
                 <ModuleSectionHeader 
                  index="INTRO"
                  title="Ciclo de Carnot"
                  description="A perfeição inatingível."
                  variant="emerald"
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <p>O Ciclo de Carnot é o ciclo idealizado com a máxima eficiência possível entre duas temperaturas. Na prova, cai muito a fórmula da eficiência de Carnot:</p>
                        <div className="p-8 bg-card border-2 border-emerald-500/30 rounded-3xl shadow-xl flex items-center justify-center">
                           <p className="text-4xl font-black text-emerald-600 dark:text-emerald-400">η = 1 - (T_fria / T_quente)</p>
                        </div>
                        <AlertBox tipo="danger" titulo="CUIDADO: Unidades!">
                           Os cálculos de eficiência termodinâmica DEVEM ser feitos obrigatoriamente em **KELVIN (K)**. Somar 273,15 ao valor em Celsius. Errar isso é eliminação garantida.
                        </AlertBox>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-bold italic">As 4 Etapas de Carnot:</h4>
                        <ol className="space-y-3">
                           {[
                             {t: "Expansão Isotérmica", d: "Recebe calor (Qh) da fonte quente à Tq constante."},
                             {t: "Expansão Adiabática", d: "O sistema realiza trabalho e a temperatura cai até Tf."},
                             {t: "Compressão Isotérmica", d: "Rejeita calor (Qf) para a fonte fria à Tf constante."},
                             {t: "Compressão Adiabática", d: "O sistema recebe trabalho e a temperatura sobe de volta para Tq."}
                           ].map((step, i) => (
                             <li key={i} className="flex gap-4 p-4 bg-muted/40 rounded-2xl border border-border hover:bg-white dark:hover:bg-zinc-900 transition-colors group">
                                <span className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 font-black group-hover:scale-110 transition-transform">
                                  {i+1}
                                </span>
                                <div className="flex-1">
                                   <p className="font-black text-lg">{step.t}</p>
                                   <p className="text-lg text-muted-foreground">{step.d}</p>
                                </div>
                             </li>
                           ))}
                           <li className="flex gap-4 p-4 bg-muted/40 rounded-2xl border border-border hover:bg-white dark:hover:bg-zinc-900 transition-colors group">
                                <span className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 font-black group-hover:scale-110 transition-transform">
                                  🇬🇧
                                </span>
                                <div className="flex-1">
                                 <h4 className="text-lg font-black text-amber-600 dark:text-amber-400 leading-tight">Practice English: PetroLingo</h4>
                                 <p className="text-lg text-muted-foreground">Domine 'Passive Voice', 'Connectors' e referências no PetroLingo.</p>
                               </div>
                           </li>
                        </ol>
                    </div>
                </div>
              </section>

               <section className="space-y-12">
                 <ModuleSectionHeader 
                  index={2}
                  title="Ciclo Rankine (Vapor)"
                  description="A vida real das caldeiras e turbinas."
                  variant="emerald"
                />
                 
                 <ContentAccordion 
                  titulo="Equipamentos do Ciclo Rankine"
                  icone="⚙️"
                  corIndicador="bg-teal-500"
                  slides={[
                    {
                      titulo: "1. Caldeira (Boiler)",
                      icone: "🔥",
                      conteudo: (
                         <div>
                           <p>Transforma água (líquido) em vapor superaquecido (gasoso). Adição de calor a pressão constante (isobárico).</p>
                           <p className="mt-2 font-black text-blue-500">h₂ {'='} h₁</p>
                         </div>
                      )
                    },
                     {
                      titulo: "2. Turbina",
                      icone: "🌀",
                      conteudo: (
                         <div>
                           <p>O vapor se expande realizando trabalho mecânico. Expansão idealmente isentrópica (entropia constante).</p>
                           <p className="mt-2 font-black text-emerald-500">W = h₂ - h₃</p>
                         </div>
                      )
                    },
                     {
                      titulo: "3. Condensador",
                      icone: "❄️",
                      conteudo: (
                         <div>
                           <p>O vapor exausto volta ao estado líquido, rejeitando calor para o meio ambiente.</p>
                         </div>
                      )
                    },
                     {
                      titulo: "4. Bomba",
                      icone: "⛽",
                      conteudo: (
                         <div>
                           <p>Eleva a pressão da água líquida de volta para a pressão da caldeira. Consumo de trabalho.</p>
                         </div>
                      )
                    }
                  ]}
                 />
               </section>
            </div>
          </TabsContent>

          {/* ══════════════════════════════════════════════════════════════════
              MÓDULO 4: VAPOR E DIAGRAMAS (SLIDES FINAIS)
              ══════════════════════════════════════════════════════════════════ */}
           <TabsContent value="modulo-4" className="space-y-[60px]">
             <ModuleBanner 
              numero={4}
              titulo="Substâncias Puras e Tabelas"
              descricao="Aprenda a navegar pelo 'Sino de Saturação'. Líquido comprimido, vapor saturado ou superaquecido: onde está seu processo?"
              gradiente="bg-gradient-to-br from-rose-300 via-rose-500 to-rose-400"
            />

            <div className="space-y-[80px]">
                <section className="space-y-8">
                   <ModuleSectionHeader 
                    index="INTRO"
                    title="O Diagrama T-S (Temperatura-Entropia)"
                    description="O indispensável para ciclos de potência."
                    variant="violet"
                  />
                  <div className="p-8 bg-card border border-border rounded-3xl shadow-lg space-y-6">
                     <p className="text-muted-foreground leading-relaxed italic">
                       Imagine um gráfico com o formato de um 'sino' (domo de saturação). 
                       - **Lado Esquerdo:** Líquido Saturado.
                       - **Lado Direito:** Vapor Saturado.
                       - **Topo (Ponto Crítico):** Onde as fases se tornam indistinguíveis.
                       - **Dentro do Sino:** Mistura Líquido-Vapor (usamos o **Título 'x'** para medir a porcentagem de vapor).
                     </p>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-violet-50 dark:bg-violet-900/20 border border-violet-500/20 rounded-2xl">
                           <h5 className="font-black text-violet-600 mb-2 uppercase text-lg">Fórmula do Título (x)</h5>
                           <p className="text-xl font-mono font-bold text-center">x = m_vapor / m_total</p>
                        </div>
                        <div className="p-4 bg-pink-50 dark:bg-pink-900/20 border border-pink-500/20 rounded-2xl">
                           <h5 className="font-black text-pink-600 mb-2 uppercase text-lg">Propriedade da Mistura</h5>
                           <p className="text-xl font-mono font-bold text-center">y = y_f + x * y_fg</p>
                        </div>
                     </div>
                  </div>
                </section>

                <AlertBox tipo="warning" titulo="Dica para o Dia da Prova">
                   A Cesgranrio costuma fornecer pequenos recortes de tabelas de vapor. Você precisa saber correlacionar a Pressão (P) dada com a Pressão de Saturação (Psat) para saber se a água está em ebulição ou já superaquecida.
                </AlertBox>

                <div className="pt-20 border-t border-border">
                   <div className="flex flex-col items-center text-center space-y-6">
                      <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 animate-bounce">
                         <LuTrophy size={40} />
                      </div>
                      <h2 className="text-3xl font-black">Você completou os módulos teóricos!</h2>
                      <p className="text-muted-foreground max-w-xl">Agora é hora de testar sua mente contra a 'Banca' em uma simulação ostensiva.</p>
                      <Button 
                        onClick={() => setActiveTab("conclusao")}
                         variant="outline" 
                        size="lg" 
                        className="rounded-full px-12 h-14 font-black"
                      >
                         Ir para Desafio Final
                      </Button>
                   </div>
                </div>
            </div>
           </TabsContent>

           {/* ══════════════════════════════════════════════════════════════════
              PÁGINA FINAL: CONCLUSÃO E TESTE
              ══════════════════════════════════════════════════════════════════ */}
            <TabsContent value="conclusao" className="animate-in zoom-in-95 duration-500">
               <div className="max-w-4xl mx-auto space-y-12 pt-10">
                  <div className="text-center space-y-4">
                    <h2 className="text-4xl font-black">Desafio do Operador</h2>
                    <p className="text-muted-foreground">Acerte pelo menos 70% para marcar este tópico como dominado.</p>
                  </div>

                  <QuizInterativo 
                    questoes={[
                      ...quizModulo1,
                      {
                        id: 3,
                        pergunta: "Em um Ciclo Rankine Idealizado, qual processo ocorre na TURBINA?",
                        opcoes: [
                          { label: "A", valor: "Compressão isobárica" },
                          { label: "B", valor: "Expansão isentrópica" },
                          { label: "C", valor: "Adição de calor isotérmica" },
                          { label: "D", valor: "Expansão isocórica" },
                        ],
                        correta: "B",
                        explicacao: "Na turbina ideal, o vapor se expande sem trocar calor e sem reversibilidades, logo a entropia é mantida constante (isentrópica)."
                      },
                      {
                        id: 4,
                        pergunta: "Para uma máquina térmica de Carnot operando entre 400°C e 25°C, qual a eficiência máxima aproximada?",
                        opcoes: [
                          { label: "A", valor: "93%" },
                          { label: "B", valor: "55%" },
                          { label: "C", valor: "40%" },
                          { label: "D", valor: "75%" },
                        ],
                        correta: "B",
                        explicacao: "Convertendo para Kelvin: Tq = 673K, Tf = 298K. η = 1 - (298/673) ≈ 1 - 0.44 = 0.56 (56%)."
                      }
                    ]}
                    titulo="Simulado de Termodinâmica - Técnico de Operação"
                    icone="🏆"
                    numero={99}
                    variant="emerald"
                    onComplete={(score) => {
                      if (score >= 70) {
                        setShowConfetti(true);
                        onComplete();
                      }
                    }}
                  />

                  {isCompleted && (
                    <div className="p-8 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-3xl text-center space-y-6">
                       <h3 className="text-2xl font-black text-emerald-600">Parabéns, Operador!</h3>
                       <p className="text-muted-foreground italic">"A energia não pode ser criada nem destruída, mas agora ela é compreendida por você."</p>
                       <div className="flex justify-center gap-4">
                          <Link href="/dashboard">
                            <Button variant="outline" className="rounded-xl">Voltar ao Dashboard</Button>
                          </Link>
                          {nextTopico && (
                             <Link href={`/aulas/${materiaId}/${nextTopico.id}`}>
                               <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-xl">Próxima Aula: {nextTopico.titulo}</Button>
                             </Link>
                          )}
                       </div>
                    </div>
                  )}
               </div>
            </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
