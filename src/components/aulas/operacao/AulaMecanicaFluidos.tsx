"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuBookOpen,
  LuClock,
  LuTrophy,
  LuTriangle,
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
  LuLock,
  LuCheck,
  LuWaves,
  LuActivity,
  LuSettings
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
 * AULA: MECÂNICA DOS FLUIDOS (Conhecimentos Específicos - Bloco I)
 * Cargo: Técnico de Operação
 * Foco: Estática, Dinâmica e Escoamentos Industriais
 */
export default function AulaMecanicaFluidos({
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
    const STORAGE_KEY_PREFIX = "petrobras_quest_aula_operacao_mecanica_fluidos_";

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
    { id: "modulo-1", label: "Fundamentos", icon: LuWaves },
    { id: "modulo-2", label: "Estática", icon: LuGauge },
    { id: "modulo-3", label: "Regimes", icon: LuActivity },
    { id: "modulo-4", label: "Bernoulli", icon: LuZap },
    { id: "modulo-5", label: "Aplicações", icon: LuSettings },
    { id: "conclusao", label: "Simulado", icon: LuTrophy },
  ];

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules(prev => [...prev, moduleId]);
    }
  };

  useEffect(() => {
    // Calculamos o progresso baseado nos módulos obrigatórios (ignorando introdução e conclusão)
    const progress = (completedModules.length / (mudulos.length - 2)) * 100;
    if (onUpdateProgress) onUpdateProgress(progress);
    
    if (completedModules.length >= mudulos.length - 2 && !isCompleted) {
       // A aula está pronta para ser finalizada no quiz
    }
  }, [completedModules]);

  // Quiz por módulo (Exemplo reduzido para o código, no real teria 10+ cada)
  const quizM1 = [
    {
      id: 1,
      pergunta: "Qual a principal característica de um 'Fluido Ideal' frequentemente citada pela Cesgranrio?",
      opcoes: [
        { label: "A", valor: "Viscosidade nula e Incompressibilidade" },
        { label: "B", valor: "Viscosidade constante e Compressibilidade" },
        { label: "C", valor: "Alta tensão superficial" },
        { label: "D", valor: "Comportamento não-newtoniano" },
        { label: "E", valor: "Resistência infinita ao cisalhamento" }
      ],
      correta: "A",
      explicacao: "Fluidos ideais são modelos teóricos onde a viscosidade é nula (sem perdas por atrito) e são incompressíveis (densidade constante)."
    }
  ];

  const quizConclusao = [
    {
      id: "q1",
      pergunta: "Em um escoamento através de um Venturi, o que ocorre com a pressão no ponto de menor área (garganta)?",
      opcoes: [
        { label: "A", valor: "Aumenta drasticamente" },
        { label: "B", valor: "Permanece igual ao ponto de entrada" },
        { label: "C", valor: "Diminui conforme o princípio de Bernoulli" },
        { label: "D", valor: "Depende apenas da viscosidade" },
        { label: "E", valor: "Torna-se igual à pressão atmosférica" }
      ],
      correta: "C",
      explicacao: "Pelo Princípio de Bernoulli, em locais de maior velocidade (menor área), a pressão é menor."
    },
    {
       id: "q2",
       pergunta: "O Número de Reynolds correlaciona quais efeitos no fluido?",
       opcoes: [
          { label: "A", valor: "Gravidade e Pressão" },
          { label: "B", valor: "Inércia e Viscosidade" },
          { label: "C", valor: "Calor e Temperatura" },
          { label: "D", valor: "Empuxo e Peso" },
          { label: "E", valor: "Tensão de vapor e Cavitação" }
       ],
       correta: "B",
       explicacao: "Re = ρvD/μ. É a razão entre as forças de inércia e as forças viscosas."
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-20">
      {/* Decoração de Fundo (Fluido) */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2" />

      {/* Navegação Superior Fixa */}
      <StickyModuleNav 
        modules={mudulos}
        activeTab={activeTab}
        completedModules={new Set(completedModules)}
        isModuleUnlocked={(index) => true} 
      />

      <main className="max-w-7xl mx-auto px-4 pt-24 md:pt-32">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            
            {/* 1. INTRODUÇÃO */}
            <TabsContent value="introducao" className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-8">
                     <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 font-bold text-lg">
                        <LuWaves className="animate-bounce" />
                        <span>Mecânica dos Fluidos de Missão Crítica</span>
                     </div>
                     <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
                        A CIÊNCIA DO <span className="text-blue-600">ESCOAMENTO</span>
                     </h1>
                     <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                        A base da operação em refinarias e plataformas. Se o petróleo não flui, a Petrobras não para. Domine pressões, vazões e o segredo da eficiência hidráulica.
                     </p>
                     
                     <div className="flex gap-6 pt-4">
                        <div className="flex flex-col">
                           <span className="text-4xl font-black text-foreground">80min</span>
                           <span className="text-lg text-muted-foreground uppercase font-bold tracking-widest">Duração</span>
                        </div>
                        <div className="w-px h-12 bg-border self-center" />
                        <div className="flex flex-col">
                           <span className="text-4xl font-black text-emerald-500">500</span>
                           <span className="text-lg uppercase font-bold tracking-widest text-emerald-500/70">XP Ganhos</span>
                        </div>
                        <div className="w-px h-12 bg-border self-center" />
                        <div className="flex flex-col">
                           <span className="text-4xl font-black text-amber-500">III</span>
                           <span className="text-lg uppercase font-bold tracking-widest text-amber-500/70">Bloco Edital</span>
                        </div>
                     </div>

                     <Button size="lg" onClick={() => setActiveTab("modulo-1")} className="rounded-full px-12 h-16 text-xl font-black group bg-blue-600 hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20">
                        INICIAR OPERAÇÃO <LuChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                     </Button>
                  </div>

                  <div className="relative group">
                     <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                     <div className="relative aspect-square rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                        <img 
                          src="/artifacts/mecanica_fluidos_banner_1774024382871.png" 
                          alt="Mecânica dos Fluidos"
                          className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                           <div className="flex items-center gap-4 text-white/90">
                              <LuGauge className="text-blue-400 w-8 h-8" />
                              <span className="font-mono text-lg tracking-tighter italic">P₁ + ½ρv₁² + ρgh₁ = const.</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-8 bg-card rounded-3xl border border-border/50 hover:border-blue-500/50 transition-colors space-y-4">
                     <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 font-black">01</div>
                     <h3 className="text-xl font-bold">Domine a Estática</h3>
                     <p className="text-muted-foreground text-lg">Entenda como a pressão se comporta em reservatórios e vasos de pressão em repouso.</p>
                  </div>
                  <div className="p-8 bg-card rounded-3xl border border-border/50 hover:border-blue-500/50 transition-colors space-y-4">
                     <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 font-black">02</div>
                     <h3 className="text-xl font-bold">Fluxo & Energia</h3>
                     <p className="text-muted-foreground text-lg">Use Bernoulli para calcular perdas de carga e garantir que o produto chegue ao destino.</p>
                  </div>
                  <div className="p-8 bg-card rounded-3xl border border-border/50 hover:border-blue-500/50 transition-colors space-y-4">
                     <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 font-black">03</div>
                     <h3 className="text-xl font-bold">Perdas Reais</h3>
                     <p className="text-muted-foreground text-lg">O pesadelo do Operador: Perda de carga distribuída e localizada em bombas e válvulas.</p>
                  </div>
               </div>
            </TabsContent>

            {/* 2. MÓDULO 1: FUNDAMENTOS */}
            <TabsContent value="modulo-1" className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
               <ModuleBanner 
                 numero={1}
                 titulo="PROPRIEDADES DOS FLUIDOS"
                 descricao="Viscosidade, densidade e o comportamento dos fluidos industriais."
                 variant="blue"
               />

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <section className="space-y-8">
                     <ModuleSectionHeader 
                        index="1.1" 
                        title="A Natureza dos Fluidos"
                        variant="blue"
                     />
                     <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-lg leading-relaxed">
                        <p>
                          Diferente dos sólidos, os <span className="text-blue-500 font-black">Fluidos</span> (Líquidos e Gases) não resistem a tensões de cisalhamento. Se você aplica uma força tangencial, eles se deformam continuamente — eles <strong>escoam</strong>.
                        </p>
                        
                        <AlertBox tipo="info" titulo="Dica de Bancada">
                           <p>Para a prova, lembre-se: Gás é <strong>altamente compressível</strong> (sua densidade varia com a pressão). Líquido é considerado <strong>incompressível</strong> para a maioria das aplicações de operação de baixa pressão.</p>
                        </AlertBox>

                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <div className="p-4 bg-muted rounded-2xl border border-border/50">
                               <p className="text-lg font-bold opacity-50 uppercase">Densidade (ρ)</p>
                               <p className="text-2xl font-black">ρ = m/V</p>
                               <p className="text-lg text-muted-foreground">Massa por unidade de volume (kg/m³).</p>
                            </div>
                            <div className="p-4 bg-muted rounded-2xl border border-border/50">
                               <p className="text-lg font-bold opacity-50 uppercase">Peso Específico (γ)</p>
                               <p className="text-2xl font-black">γ = ρ.g</p>
                               <p className="text-lg text-muted-foreground">Peso por unidade de volume (N/m³).</p>
                            </div>
                        </div>
                     </div>
                  </section>

                  <section className="space-y-8">
                     <ModuleSectionHeader 
                        index="1.2" 
                        title="Viscosidade: O Atrito Interno"
                        variant="blue"
                     />
                     <div className="bg-gradient-to-br from-blue-500/5 to-transparent p-8 rounded-3xl border border-blue-500/10 space-y-6">
                        <p className="text-lg leading-relaxed">
                          A <span className="text-blue-500 font-bold">Viscosidade</span> é a medida da resistência de um fluido ao escoamento. Pense no Mel (mais viscoso) vs Água (menos viscosa).
                        </p>
                        <CardCarousel 
                           cards={[
                             {
                               title: "Cinemática (ν)",
                               descricao: "ν = μ/ρ. Importante para o Número de Reynolds. Unidade: m²/s ou Stokes (St).",
                               icon: <LuActivity />
                             },
                             {
                               title: "Dinâmica (μ)",
                               descricao: "Medida direta do atrito entre camadas. Unidade: Pa.s ou Poise (P).",
                               icon: <LuGauge />
                             },
                             {
                               title: "Efeito da T",
                               descricao: "Nos LÍQUIDOS: Aumenta T -> Diminui μ. Nos GASES: Aumenta T -> Aumenta μ.",
                               icon: <LuThermometer />
                             }
                           ]}
                        />

                        <AlertBox tipo="warning" titulo="pontos de atenção Clássica">
                           <p>Cuidado! Em líquidos, o aumento da temperatura afasta as moléculas e diminui a viscosidade. Em gases, aumenta a agitação e colisões, <strong>aumentando</strong> a viscosidade. Isso cai em 80% das provas de Especialista!</p>
                        </AlertBox>
                     </div>
                  </section>
               </div>

               



<ModuleConsolidation moduloNumero={1} 
                index={1}
                variant="blue"
                resumoVisual={{
                  moduloNome: "Módulo 1",
                  tituloAula: "Propriedades",
                  materia: "Técnico de Operação",
                   images: [
                    { title: "Viscosímetro", type: "Equipamento", placeholderColor: "bg-blue-500/20" },
                    { title: "Gráfico μ vs T", type: "Gráfico", placeholderColor: "bg-cyan-500/20" }
                  ]
                }}
                sinteseEstrategica={{
                  title: "Destaque Estratégico",
                  content: (
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                      <p className="font-bold text-blue-600">Viscosidade & T</p>
                      <p className="text-lg">Líquido: Fica ralo no calor. Gás: Fica grosso (mais colisão) no calor.</p>
                    </div>
                  )
                }}
                podcast={{
            aulaId: "mecanicafluidos",
            aulaTitulo: "Mecanica Fluidos",
            materia: "Operação",
            materiaId: "operacao",
            moduloNumero: 1,
            moduloTitulo: "Módulo 1",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

                             <QuizInterativo 
                questoes={quizM1} 
                titulo="QUIZ: Módulo Nº 1" 
                icone="🧪"
                onComplete={(score) => handleModuleComplete("modulo-1", score)}
              />
            </TabsContent>

            {/* 3. MÓDULO 2: ESTÁTICA */}
            <TabsContent value="modulo-2" className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <ModuleBanner 
                 numero={2}
                 titulo="ESTÁTICA E MANOMETRIA"
                 descricao="Lei de Pascal, Stevin e o cálculo de pressões em tanques."
                 variant="cyan"
               />

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-8">
                     <ModuleSectionHeader index="2.1" title="Lei de Pascal e Pressão" variant="cyan" />
                     <div className="prose prose-slate dark:prose-invert max-w-none text-lg">
                        <p>
                          "A pressão exercida em qualquer ponto de um fluido estático em equilíbrio é transmitida integralmente a todos os pontos."
                        </p>
                        <AlertBox tipo="warning" titulo="Teoria de Prova">
                           <p>A pressão em um ponto no interior de um fluido em repouso é a mesma em todas as direções. É uma grandeza <strong>escalar</strong>.</p>
                        </AlertBox>
                        
                        <div className="p-6 bg-cyan-500/5 rounded-3xl border border-cyan-500/20 space-y-4">
                           <h4 className="font-black text-cyan-600 uppercase tracking-widest text-lg">Equação Fundamental da Hidrostática</h4>
                           <div className="flex items-center gap-6">
                              <div className="text-4xl font-mono font-black text-foreground">ΔP = ρgh</div>
                              <div className="text-lg text-muted-foreground flex-1">
                                 Onde <strong>h</strong> é a profundidade. Em um tanque aberto à atmosfera, P = Patm + ρgh.
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-8">
                    <ModuleSectionHeader index="2.2" title="Vasos Comunicantes" variant="cyan" />
                    <div className="grid grid-cols-1 gap-6">
                      <FlipCard 
                        frente={
                          <div className="space-y-4 text-center">
                            <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto text-cyan-500">
                              <LuGauge size={32} />
                            </div>
                            <h3 className="text-2xl font-black">Princípio de Stevin</h3>
                             <p className="text-lg text-muted-foreground underline decoration-cyan-500/30">Clique para ver o conceito</p>
                          </div>
                        }
                        verso={
                          <div className="space-y-4">
                            <p className="text-lg font-medium">Pontos em uma mesma horizontal em um fluido contínuo e em repouso <strong>possuem a mesma pressão</strong>.</p>
                             <ul className="text-lg space-y-2 opacity-80">
                               <li>• Independe da forma do vaso.</li>
                               <li>• Independe da área da superfície livre.</li>
                             </ul>
                          </div>
                        }
                        variant="blue"
                      />
                    </div>
                  </div>
               </div>

               <ModuleConsolidation moduloNumero={2} 
                index={2}
                variant="cyan"
                resumoVisual={{
                  moduloNome: "Módulo 2",
                  tituloAula: "Estática",
                  materia: "Técnico de Operação",
                   images: [
                    { title: "Manômetro em U", type: "Esquema", placeholderColor: "bg-cyan-500/20" },
                    { title: "Distrabuição de P", type: "Gráfico", placeholderColor: "bg-blue-500/20" }
                  ]
                }}
                sinteseEstrategica={{
                  title: "Cálculo Rápido P",
                  content: (
                    <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                      <p className="font-bold text-cyan-600">Regra do Mergulhador</p>
                      <p className="text-lg">Desceu? Soma (+ρgh). Subiu? Subtrai (-ρgh). Mesma horizontal? Igual (P₁=P₂).</p>
                    </div>
                  )
                }}
                podcast={{
            aulaId: "mecanicafluidos",
            aulaTitulo: "Mecanica Fluidos",
            materia: "Operação",
            materiaId: "operacao",
            moduloNumero: 2,
            moduloTitulo: "Módulo 2",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />
            </TabsContent>

            {/* 4. MÓDULO 3: REGIMES DE ESCOAMENTO */}
            <TabsContent value="modulo-3" className="space-y-12 animate-in fade-in slide-in-from-left-4 duration-500">
               <ModuleBanner 
                 numero={3}
                 titulo="REYNOLDS E CONTINUIDADE"
                 descricao="Escoamento laminar vs turbulento e a conservação da massa."
                 variant="indigo"
               />

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-8">
                     <ModuleSectionHeader index="3.1" title="Número de Reynolds (Re)" variant="indigo" />
                     <div className="p-8 bg-indigo-500/5 border border-indigo-500/20 rounded-3xl space-y-6">
                        <div className="flex flex-col items-center gap-4">
                           <div className="text-5xl font-mono font-black text-indigo-600">Re = ρvD / μ</div>
                           <p className="text-lg text-center text-muted-foreground font-medium italic">
                             "A luta entre a inércia (movimento) e a viscosidade (freio)."
                           </p>
                        </div>
                        
                        <div className="space-y-4">
                           <div className="flex items-center justify-between p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                              <span className="font-bold">Laminar</span>
                              <span className="font-mono px-3 py-1 bg-emerald-500 text-white rounded-lg text-lg">Re {'<'} 2000-2300</span>
                           </div>
                           <div className="flex items-center justify-between p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                              <span className="font-bold">Transição</span>
                              <span className="font-mono px-3 py-1 bg-amber-500 text-white rounded-lg text-lg">2000-2300 {'<'} Re {'<'} 4000</span>
                           </div>
                           <div className="flex items-center justify-between p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl">
                              <span className="font-bold">Turbulento</span>
                              <span className="font-mono px-3 py-1 bg-rose-500 text-white rounded-lg text-lg">Re {'\u003e'} 4000</span>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-8">
                     <ModuleSectionHeader index="3.2" title="Equação da Continuidade" variant="indigo" />
                     <div className="prose prose-slate dark:prose-invert max-w-none text-lg">
                        <p>
                          Baseada na <strong>Conservação da Massa</strong>. Em regime permanente e incompressível:
                        </p>
                        <div className="p-6 bg-slate-900 text-white rounded-3xl font-mono text-center text-2xl">
                           Q = A.v = const.
                        </div>
                        <p className="mt-4">
                          Se a área diminui, a velocidade deve aumentar para manter a vazão constante. <br />
                          <strong>A₁.v₁ = A₂.v₂</strong>
                        </p>
                     </div>
                  </div>
               </div>
            </TabsContent>

            {/* 5. MÓDULO 4: BERNOULLI E ENERGIA */}
            <TabsContent value="modulo-4" className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
               <ModuleBanner 
                 numero={4}
                 titulo="A EQUAÇÃO DE BERNOULLI"
                 descricao="Conservação de energia mecânica e perdas de carga reais."
                 variant="rose"
               />

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <ModuleSectionHeader index="4.1" title="Conservação de Energia" variant="rose" />
                    <p className="text-lg">Diz que a soma da energia de pressão, cinética e potencial é constante ao longo de uma linha de corrente.</p>
                    <div className="p-8 bg-rose-500/10 border border-rose-500/20 rounded-[2rem] text-center space-y-4">
                        <p className="text-xl font-mono font-black text-rose-600">P/γ + v²/2g + z = const.</p>
                        <ul className="text-lg text-left grid grid-cols-1 gap-2 opacity-80 pl-8 list-disc">
                          <li><strong>P/γ</strong>: Carga de Pressão</li>
                          <li><strong>v²/2g</strong>: Carga de Velocidade</li>
                          <li><strong>z</strong>: Carga de Posição (Cota)</li>
                        </ul>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <ModuleSectionHeader index="4.2" title="Perda de Carga (Hl)" variant="rose" />
                    <AlertBox tipo="warning" titulo="A Realidade do Escoamento">
                       <p>Em sistemas reais, a energia não se conserva perfeitamente — parte é dissipada como calor pelo atrito. Adicionamos o termo <strong>Hl</strong> na equação.</p>
                    </AlertBox>
                    <ContentAccordion 
                       slides={[
                         {
                           title: "Perda Distribuída",
                           content: "Ocorre ao longo do tubo pelo atrito viscoso. Calculada por Darcy-Weisbach: hf = f . (L/D) . (v²/2g)."
                         },
                         {
                           title: "Perda Localizada",
                           content: "Causada por acessórios (válvulas, joelhos, tês). Calculada por: hl = K . (v²/2g)."
                         }
                       ]}
                    />
                  </div>
               </div>
            </TabsContent>

            {/* 6. MÓDULO 5: APLICAÇÕES E MEDIÇÃO */}
            <TabsContent value="modulo-5" className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <ModuleBanner 
                 numero={5}
                 titulo="MEDIÇÃO E CAVITAÇÃO"
                 descricao="Venturi, Placa de Orifício e os perigos da cavitação em bombas."
                 variant="emerald"
               />

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <ModuleSectionHeader index="5.1" title="Efeito Venturi" variant="emerald" />
                    <p>O estrangulamento da tubulação cria aumento de velocidade e queda de pressão. Usamos essa ΔP para medir vazão.</p>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-4 bg-muted rounded-xl text-center">
                          <p className="text-lg uppercase opacity-50 font-bold">Placa de Orifício</p>
                          <p className="text-lg">Barata, mas causa alta perda de carga permanente.</p>
                       </div>
                       <div className="p-4 bg-muted rounded-xl text-center">
                          <p className="text-lg uppercase opacity-50 font-bold">Tubo de Venturi</p>
                          <p className="text-lg">Caro, mas eficiente (baixa perda de carga).</p>
                       </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <ModuleSectionHeader index="5.2" title="Cavitação: O Inimigo" variant="emerald" />
                    <AlertBox tipo="danger" titulo="Alerta Crítico de Operação">
                       <p>Quando a pressão em um ponto da bomba cai abaixo da <strong>tensão de vapor</strong> do líquido, formam-se bolhas de vapor. Quando elas implodem em zonas de alta pressão, destroem o rotor da bomba.</p>
                    </AlertBox>
                    <div className="p-6 bg-slate-900 rounded-3xl text-white">
                        <p className="text-pink-400 font-bold underline">SINTOMAS:</p>
                        <p className="text-lg mt-2">• Ruído de 'pedras' dentro da bomba.</p>
                        <p className="text-lg">• Vibração intensa.</p>
                        <p className="text-lg">• Queda no desempenho (H e Q).</p>
                    </div>
                  </div>
               </div>
            </TabsContent>

            {/* 7. CONCLUSÃO E SIMULADO */}
            <TabsContent value="conclusao" className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="py-20 text-center space-y-8">
                  <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-500 animate-bounce">
                     <LuTrophy size={48} />
                  </div>
                  <div className="space-y-4">
                      <h2 className="text-5xl font-black">OPERAÇÃO CONCLUÍDA!</h2>
                      <p className="text-muted-foreground max-w-xl mx-auto">Você completou o curso intensivo de Mecânica dos Fluidos. Agora prove seu valor no simulado de alta pressão.</p>
                  </div>
               </div>

               <QuizInterativo 
                 questoes={quizConclusao} 
                 titulo="Simulado de Fluidos (Padrão Petrobras)" 
                 variant="blue"
                 onComplete={(score) => {
                   if (score >= 70) {
                     setShowConfetti(true);
                     onComplete();
                   }
                 }}
               />

               {isCompleted && (
                 <div className="p-12 bg-blue-500/10 border-2 border-blue-500/30 rounded-[3rem] text-center space-y-8 max-w-4xl mx-auto">
                    <div className="space-y-2">
                       <h3 className="text-4xl font-black text-blue-600 tracking-tight">FLUIDO DOMINADO!</h3>
                       <p className="text-muted-foreground italic">"O segredo da operação não é impedir o fluxo, mas saber para onde ele vai pelo caminho de menor resistência."</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <Link href="/dashboard" className="w-full">
                         <Button variant="outline" size="lg" className="w-full rounded-2xl h-16 text-lg font-bold">Voltar ao Porto Seguro</Button>
                       </Link>
                       {nextTopico && (
                          <Link href={`/aulas/${materiaId}/${nextTopico.id}`} className="w-full">
                            <Button className="w-full rounded-2xl h-16 text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30">Próxima Aula: {nextTopico.titulo}</Button>
                          </Link>
                       )}
                    </div>

                     {/* CTA PETROLINGO - Relacionando conteúdo */}
                     <div className="pt-8 border-t border-blue-500/10 mt-8">
                        <p className="text-lg text-muted-foreground mb-4 uppercase font-black tracking-widest flex items-center justify-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                          Bônus de Especialista
                        </p>
                        <Link href="/aulas/ingles/petrolingo">
                          <div className="p-6 rounded-[2rem] bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all group flex flex-col md:flex-row items-center gap-6 text-left">
                            <div className="w-20 h-20 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                              <LuWaves size={40} />
                            </div>
                            <div className="flex-1 space-y-1">
                              <h4 className="text-xl font-black text-emerald-600 dark:text-emerald-400">Praticar English: PetroLingo</h4>
                              <p className="text-lg text-muted-foreground">O edital cobra Inglês. Domine Voz Passiva e Conectores fundamentais para ler textos técnicos no PetroLingo!</p>
                            </div>
                            <div className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-bold group-hover:bg-emerald-600 transition-colors">
                              IR PARA O PETROLINGO
                            </div>
                          </div>
                        </Link>
                     </div>
                 </div>
               )}
            </TabsContent>

        </Tabs>
      </main>
    </div>
  );
}
