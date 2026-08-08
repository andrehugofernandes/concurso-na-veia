"use client";

import React, { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { useAulaProgress } from "@/hooks/useAulaProgress";
import { getModuleVariant } from "@/lib/moduleColors";
import {
  ContentAccordion,
  ModuleBanner,
  QuizInterativo,
  FlipCard,
  AulaProps,
  ModuleSectionHeader,
  AulaTemplate,
  ModuleConsolidation,
} from "../shared";
import { 
  LuZap, LuActivity, LuCpu, LuShieldAlert, LuCheck, LuX, LuLayers, LuTrendingUp
} from "react-icons/lu";

import { CONTEUDO_ENGENHARIA_DE_REQUISITOS, ModuloConteudo } from "./data/engenharia-de-requisitos";
import {
  QUIZ_M1_REQUISITOS, QUIZ_M2_REQUISITOS, QUIZ_M3_REQUISITOS, QUIZ_M4_REQUISITOS, QUIZ_M5_REQUISITOS,
  QUIZ_M6_REQUISITOS, QUIZ_M7_REQUISITOS, QUIZ_M8_REQUISITOS, QUIZ_M9_REQUISITOS, QUIZ_M10_REQUISITOS
} from "./data/engenharia-de-requisitos-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", titulo: "Fundamentos da Engenharia de Requisitos" },
  { id: "modulo-2", label: "Módulo 2", titulo: "Técnicas de Elicitação" },
  { id: "modulo-3", label: "Módulo 3", titulo: "Requisitos Funcionais vs. Não-Funcionais" },
  { id: "modulo-4", label: "Módulo 4", titulo: "Especificação e Documentação" },
  { id: "modulo-5", label: "Módulo 5", titulo: "Modelagem com UML" },
  { id: "modulo-6", label: "Módulo 6", titulo: "Validação e Verificação" },
  { id: "modulo-7", label: "Módulo 7", titulo: "Gerenciamento de Mudanças" },
  { id: "modulo-8", label: "Módulo 8", titulo: "Priorização e Negociação" },
  { id: "modulo-9", label: "Módulo 9", titulo: "Requisitos em Ágeis" },
  { id: "modulo-10", label: "Módulo 10", titulo: "Questões CESGRANRIO" },
];

export default function AulaEngenhariaDeRequisitos(props: AulaProps) {
  const STORAGE_KEY_PREFIX = "petrobras_quest_aula_eng_requisitos_";

  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}active_tab`);
      if (saved && MODULE_DEFS.some((m) => m.id === saved)) return saved;
    }
    return MODULE_DEFS[0].id;
  });

  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const { completedModules: completedModulesList, updateCompletedModules } = useAulaProgress();
  const completedModules = new Set(completedModulesList);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}active_tab`, activeTab);
    }
  }, [activeTab]);

  const handleQuizComplete = (moduleId: string, _score: number) => {
    const newCompleted = new Set(completedModules);
    newCompleted.add(moduleId);
    updateCompletedModules(Array.from(newCompleted));
  };

  const mv = Array.from({ length: 11 }, (_, i) => getModuleVariant(i));

  const QUIZ_MAP: Record<number, any> = {
    1: QUIZ_M1_REQUISITOS,
    2: QUIZ_M2_REQUISITOS,
    3: QUIZ_M3_REQUISITOS,
    4: QUIZ_M4_REQUISITOS,
    5: QUIZ_M5_REQUISITOS,
    6: QUIZ_M6_REQUISITOS,
    7: QUIZ_M7_REQUISITOS,
    8: QUIZ_M8_REQUISITOS,
    9: QUIZ_M9_REQUISITOS,
    10: QUIZ_M10_REQUISITOS,
  };

  const renderIcon = (name: string, iconClassName: string) => {
    switch (name) {
      case "LuZap": return <LuZap className={iconClassName} />;
      case "LuActivity": return <LuActivity className={iconClassName} />;
      case "LuCpu": return <LuCpu className={iconClassName} />;
      case "LuLayers": return <LuLayers className={iconClassName} />;
      case "LuShieldAlert": return <LuShieldAlert className={iconClassName} />;
      case "LuTrendingUp": return <LuTrendingUp className={iconClassName} />;
      case "LuCheck": return <LuCheck className={iconClassName} />;
      default: return <LuZap className={iconClassName} />;
    }
  };

  const renderModulo = (modulo: ModuloConteudo) => {
    const variantColor = mv[modulo.numero];

    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <ModuleBanner
          numero={modulo.numero}
          variant={variantColor}
          titulo={modulo.titulo}
          descricao={modulo.descricao}
        />

        {/* Seção 1: INTRO (C.E.D.E.A) */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
          <ModuleSectionHeader index="INTRO" title={modulo.intro.titulo} variant={variantColor} />
          
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            {modulo.intro.paragrafos.map((p, idx) => (
              <p 
                key={idx} 
                dangerouslySetInnerHTML={{ __html: p }}
              />
            ))}
          </div>
        </section>

        {/* Seção 2: Detalhamento Técnico */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={1} title="Detalhamento Técnico" variant={variantColor} />
          
          <ContentAccordion
            mode="stacked"
            slides={modulo.accordion.map((item) => ({
              titulo: item.titulo,
              icone: renderIcon(item.iconName, "w-5 h-5"),
              conteudo: item.conteudo
            }))}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            {modulo.flipcardsConceito.map((card, cIdx) => (
              <FlipCard
                key={cIdx}
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className={`p-4 bg-${card.color}-500/10 rounded-full shadow-inner ring-1 ring-${card.color}-500/20`}>
                      {renderIcon(card.iconName, `w-12 h-12 text-${card.color}-500`)}
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      {card.frenteTitle}
                    </span>
                    <span className={`text-sm text-${card.color}-500/80 font-medium`}>
                      {card.frenteSub}
                    </span>
                  </div>
                }
                verso={
                  <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                    <div className={`flex items-center gap-2 text-${card.color}-500 font-bold border-b border-${card.color}-500/10 pb-3`}>
                      <LuCheck className="w-5 h-5 shrink-0" />
                      <span className="tracking-widest uppercase text-xs">{card.versoLabel}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{card.versoText}</p>
                    {card.versoCerto && (
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        ✅ <strong className="text-foreground/90">{card.versoCerto}</strong>
                      </p>
                    )}
                    {card.versoErrado && (
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        ❌ <strong className="text-foreground/90">{card.versoErrado}</strong>
                      </p>
                    )}
                  </div>
                }
                categoria={card.categoria}
              />
            ))}
          </div>
        </section>

        {/* Seção 3: Análise Prática e Memorização */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={2} title="Análise Prática e Memorização" variant={variantColor} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {modulo.flipcardsPratica.map((card, cIdx) => (
              <FlipCard
                key={cIdx}
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className={`p-4 bg-${card.color}-500/10 rounded-full shadow-inner ring-1 ring-${card.color}-500/20`}>
                      {renderIcon(card.iconName, `w-12 h-12 text-${card.color}-500`)}
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      {card.frenteTitle}
                    </span>
                    <span className={`text-sm text-${card.color}-500/80 font-medium`}>
                      {card.frenteSub}
                    </span>
                  </div>
                }
                verso={
                  <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                    <div className={`flex items-center gap-2 text-${card.color}-500 font-bold border-b border-${card.color}-500/10 pb-3`}>
                      <LuCheck className="w-5 h-5 shrink-0" />
                      <span className="tracking-widest uppercase text-xs">{card.versoLabel}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{card.versoText}</p>
                    {card.versoCerto && (
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        ✅ <strong className="text-foreground/90">{card.versoCerto}</strong>
                      </p>
                    )}
                    {card.versoErrado && (
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        ❌ <strong className="text-foreground/90">{card.versoErrado}</strong>
                      </p>
                    )}
                  </div>
                }
                categoria={card.categoria}
              />
            ))}
          </div>
        </section>

        {/* Seção 4: Consolidação */}
        <ModuleConsolidation moduloNumero={1}
          index={modulo.numero}
          variant={variantColor}
          resumoVisual={{
            moduloNome: `Módulo ${modulo.numero}`,
            tituloAula: "Engenharia de Requisitos",
            materia: "Conhecimentos Específicos",
            images: []
          }}
          sinteseEstrategica={{
            title: modulo.consolidation.sinteseTitle,
            content: (
              <div className="space-y-4">
                <span className="text-6xl my-6 animate-pulse inline-block">🎓 🏆</span>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">
                  {modulo.consolidation.sinteseMarkdown}
                </p>
              </div>
            )
          }}
          podcast={{
            aulaId: "engrequisitos",
            aulaTitulo: "Engenharia de Requisitos",
            materia: "Específicas",
            materiaId: "especificas",
            moduloNumero: modulo.numero,
            moduloTitulo: `Módulo ${modulo.numero}`,
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
        />

        {/* Seção 5: Quiz */}
        <QuizInterativo
          titulo={`Quiz: ${modulo.titulo}`}
          numero={modulo.numero}
          variant={variantColor}
          questoes={QUIZ_MAP[modulo.numero]}
          onComplete={(score: number) => handleQuizComplete(`modulo-${modulo.numero}`, score)}
        />
      </div>
    );
  };

  return (
    <>
      <AulaTemplate
        {...props}
        modules={MODULE_DEFS}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        completedModules={completedModules}
        canComplete={completedModules.size >= MODULE_DEFS.length}
        lockMessage="Você precisa responder a todos os quizzes desta aula para finalizá-la."
      >
        {CONTEUDO_ENGENHARIA_DE_REQUISITOS.map((modulo) => (
          <TabsContent 
            key={`modulo-${modulo.numero}`} 
            value={`modulo-${modulo.numero}`} 
            className="mt-0"
          >
            {renderModulo(modulo)}
          </TabsContent>
        ))}
      </AulaTemplate>

      {zoomedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-md cursor-zoom-out p-4 md:p-8"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img
              src={zoomedImage}
              alt="Imagem ampliada"
              className="max-w-full max-h-full object-contain rounded-2xl border border-border/40 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            />
            <button 
              className="absolute top-4 right-4 p-3 bg-muted/80 backdrop-blur-md rounded-full text-foreground hover:bg-muted transition-colors" 
              onClick={() => setZoomedImage(null)}
            >
              <LuX className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
