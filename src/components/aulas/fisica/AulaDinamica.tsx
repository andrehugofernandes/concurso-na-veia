"use client";

import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { getModuleVariant } from "@/lib/moduleColors";
import { useAulaProgress } from "@/hooks/useAulaProgress";
import * as LuIcons from "react-icons/lu";

import {
  ModuleConsolidation,
  QuizInterativo,
  ModuleBanner,
  getRandomQuestions,
  QuizQuestion,
  AulaProps,
  AulaTemplate,
  RichIntro,
  ModuleSectionHeader,
  FlipCard
} from "../shared";

import { MODULE_CONTENTS } from "./data/dinamica-content";
import * as Quizzes from "./data/dinamica-quizzes";

// Dynamic Icon Component
function DynamicLucideIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = (LuIcons as any)[name] || LuIcons.LuBook;
  return <IconComponent className={className} />;
}

const MODULE_DEFS = [
  { id: "modulo-1", numero: 1, label: "Mód 1", title: "As Leis de Newton Descomplicadas", descricao: "Conteúdo essencial e aprofundamento estratégico para a prova." },
  { id: "modulo-2", numero: 2, label: "Mód 2", title: "Forças Especiais em Ação", descricao: "Conteúdo essencial e aprofundamento estratégico para a prova." },
  { id: "modulo-3", numero: 3, label: "Mód 3", title: "O Segredo do Atrito", descricao: "Conteúdo essencial e aprofundamento estratégico para a prova." },
  { id: "modulo-4", numero: 4, label: "Mód 4", title: "Plano Inclinado sem Mistério", descricao: "Conteúdo essencial e aprofundamento estratégico para a prova." },
  { id: "modulo-5", numero: 5, label: "Mód 5", title: "Polias e Sistemas Complexos", descricao: "Conteúdo essencial e aprofundamento estratégico para a prova." },
  { id: "modulo-6", numero: 6, label: "Mód 6", title: "Aplicações Práticas de Força", descricao: "Conteúdo essencial e aprofundamento estratégico para a prova." },
  { id: "modulo-7", numero: 7, label: "Mód 7", title: "As Ameaças Triplas da Dinâmica", descricao: "Conteúdo essencial e aprofundamento estratégico para a prova." },
  { id: "modulo-8", numero: 8, label: "Mód 8", title: "A Lógica CESGRANRIO", descricao: "Análise do perfil da banca e principais pegadinhas." },
  { id: "modulo-9", numero: 9, label: "Mód 9", title: "Checklist Tático", descricao: "Passo a passo definitivo para resolução rápida de questões." },
  { id: "modulo-10", numero: 10, label: "Mód 10", title: "Laboratório de Consolidação Final", descricao: "Treinamento intensivo com questões simuladas." }
];

export default function AulaDinamica({
  onComplete,
  isCompleted,
  loading,
  xpGanho = 50,
  titulo = "Dinâmica",
  descricao = "Leis de Newton, forças e equilíbrio",
  duracao = "120 min",
  materiaNome = "Fisica",
  materiaCor,
  materiaId = "fisica",
  prevTopico,
  nextTopico,
}: AulaProps) {
  const STORAGE_KEY_PREFIX = "petrobras_quest_aula_fisica_dinamica_";

  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}active_tab`);
      return saved || "modulo-1";
    }
    return "modulo-1";
  });

  const { completedModules: completedModulesList, updateCompletedModules } = useAulaProgress();
  const completedModules = new Set(completedModulesList);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}active_tab`, activeTab);
    }
  }, [activeTab]);

  const [quizzes, setQuizzes] = useState<Record<number, QuizQuestion[]>>({});
  const [hasSyncedInitial, setHasSyncedInitial] = useState(false);

  useEffect(() => {
    if (!hasSyncedInitial && !loading) {
      const qs: Record<number, QuizQuestion[]> = {};
      for (let i = 1; i <= 10; i++) {
        const quizKey = Object.keys(Quizzes).find(k => k === `QUIZ_M${i}` || k.startsWith(`QUIZ_M${i}_`));
        const quizData = quizKey ? (Quizzes as any)[quizKey] : [];
        qs[i] = getRandomQuestions(quizData, 5);
      }
      setQuizzes(qs);
      setHasSyncedInitial(true);
    }
  }, [loading, hasSyncedInitial]);

  const handleModuleComplete = (moduleId: string) => {
    const nextCompleted = new Set(completedModules);
    nextCompleted.add(moduleId);
    updateCompletedModules(Array.from(nextCompleted));
    
    if (nextCompleted.size === 10) {
      setTimeout(() => {
        onComplete?.();
      }, 500);
    }
  };

  const mv = Object.fromEntries(
    Array.from({ length: 10 }, (_, i) => [i + 1, getModuleVariant(i + 1)])
  ) as Record<number, ReturnType<typeof getModuleVariant>>;

  const defaultGradient = materiaCor || (materiaId === "ingles" ? "from-cyan-500 to-blue-500" : materiaId === "quimica" ? "from-amber-500 to-orange-500" : "from-blue-500 to-indigo-500");

  return (
    <AulaTemplate
      canComplete={completedModules.size >= 10}
      lockMessage="Você precisa responder a todos os quizzes desta aula para finalizá-la."
      titulo={titulo}
      descricao={descricao}
      duracao={duracao}
      materiaNome={materiaNome}
      materiaCor={defaultGradient}
      materiaId={materiaId}
      modules={MODULE_DEFS}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      completedModules={completedModules}
      onComplete={() => onComplete?.()}
      isCompleted={isCompleted}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
    >
      {MODULE_DEFS.map((mod) => {
        const modNum = mod.numero;
        const blocks = MODULE_CONTENTS[modNum] || [];
        const quiz = quizzes[modNum] || [];
        
        const introBlock = blocks.find((b: any) => b.type === "text" && b.index === "INTRO");
        const flipcardsBlock = blocks.find((b: any) => b.type === "flipcards");
        const consolidationBlock = blocks.find((b: any) => b.type === "consolidation");
        
        return (
          <TabsContent key={mod.id} value={mod.id} className="space-y-12 animate-in fade-in duration-500">
            <ModuleBanner
              numero={modNum}
              titulo={mod.title}
              variant={mv[modNum]}
              descricao={mod.descricao}
            />
            
            {introBlock && (
              <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
                <ModuleSectionHeader
                  index="INTRO"
                  title={mod.title}
                  description={mod.descricao}
                  variant={mv[modNum]}
                />
                <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
                  {introBlock.content.split("\n\n").map((paragraph: string, idx: number) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </section>
            )}
            
            {flipcardsBlock && (
              <section className="space-y-6">
                <ModuleSectionHeader
                  index={1}
                  title="Conceitos Chave & Termos Técnicos"
                  description="Fique por dentro das definições cruciais para a sua prova."
                  variant={mv[modNum]}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {flipcardsBlock.cards.slice(0, 3).map((card: any, idx: number) => (
                    <FlipCard
                      key={idx}
                      frente={
                        <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                          <div className="p-4 bg-blue-500/10 rounded-full shadow-inner ring-1 ring-blue-500/20">
                            <DynamicLucideIcon name={card.icon} className="w-12 h-12 text-blue-500" />
                          </div>
                          <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                            {card.front.split(" + ")[1] || card.front}
                          </span>
                        </div>
                      }
                      verso={
                        <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                          <div className="flex items-center gap-2 text-blue-500 font-bold border-b border-blue-500/10 pb-3">
                            <LuIcons.LuCheck className="w-5 h-5 shrink-0" />
                            <span className="tracking-widest uppercase text-xs">Memorização</span>
                          </div>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {card.back}
                          </p>
                        </div>
                      }
                      categoria="Conceitos"
                      variant={mv[modNum]}
                    />
                  ))}
                </div>
                
                <ModuleSectionHeader
                  index={2}
                  title="Análise Prática & Contextualização"
                  description="Casos reais e aplicação prática dos conceitos do módulo."
                  variant={mv[modNum]}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {flipcardsBlock.cards.slice(3, 6).map((card: any, idx: number) => (
                    <FlipCard
                      key={idx}
                      frente={
                        <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                          <div className="p-4 bg-emerald-500/10 rounded-full shadow-inner ring-1 ring-emerald-500/20">
                            <DynamicLucideIcon name={card.icon} className="w-12 h-12 text-emerald-500" />
                          </div>
                          <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                            {card.front.split(" + ")[1] || card.front}
                          </span>
                        </div>
                      }
                      verso={
                        <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                          <div className="flex items-center gap-2 text-emerald-500 font-bold border-b border-emerald-500/10 pb-3">
                            <LuIcons.LuCheck className="w-5 h-5 shrink-0" />
                            <span className="tracking-widest uppercase text-xs">Aplicação Prática</span>
                          </div>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {card.back}
                          </p>
                        </div>
                      }
                      categoria="Aplicação"
                      variant={mv[modNum]}
                    />
                  ))}
                </div>
              </section>
            )}
            
            {consolidationBlock && (
              <ModuleConsolidation
                index={modNum}
                variant={mv[modNum]}
                sinteseEstrategica={{
                  title: "Síntese Estratégica",
                  content: consolidationBlock.sinteseEstrategica
                }}
                resumoVisual={{
                  moduloNome: `Módulo ${modNum}`,
                  tituloAula: titulo,
                  materia: materiaNome,
                  images: [
                    {
                      title: `Mapa Mental - Módulo ${modNum}`,
                      type: "mapa-mental",
                      placeholderColor: "bg-blue-600/20 text-blue-600",
                      imageUrl: `/images/mapa-mental/mapa_\${materiaId}_dinamica_m\${modNum}.png`
                    },
                    {
                      title: `Esquema - Módulo ${modNum}`,
                      type: "esquema",
                      placeholderColor: "bg-indigo-600/20 text-indigo-600",
                      imageUrl: `/images/mapa-mental/esquema_\${materiaId}_dinamica_m\${modNum}.png`
                    },
                    {
                      title: `Fluxograma - Módulo ${modNum}`,
                      type: "fluxograma",
                      placeholderColor: "bg-emerald-600/20 text-emerald-600",
                      imageUrl: `/images/mapa-mental/fluxo_\${materiaId}_dinamica_m\${modNum}.png`
                    }
                  ]
                }}
                podcast={{
                  aulaId: "dinamica",
                  aulaTitulo: titulo,
                  materia: materiaNome,
                  materiaId: materiaId,
                  moduloNumero: modNum,
                  moduloTitulo: `Módulo ${modNum} - Podcast`,
                  conteudoResumo: "Áudio de fixação focando em memorização e dicas quentes para prova."
                }}
              />
            )}
            
            <QuizInterativo
              questoes={quiz}
              titulo={`QUIZ: Módulo Nº ${modNum}`}
              numero={modNum}
              variant={mv[modNum]}
              onComplete={() => handleModuleComplete(mod.id)}
            />
          </TabsContent>
        );
      })}
    </AulaTemplate>
  );
}
