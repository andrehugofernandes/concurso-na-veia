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

// Importando dados enriquecidos da aula e quizzes
import { CONTEUDO_CIRCUITOS, ModuloConteudo } from "./data/circuitos-ccca";
import {
  quizM1, quizM2, quizM3, quizM4, quizM5,
  quizM6, quizM7, quizM8, quizM9, quizM10
} from "./data/circuitos-ccca-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", titulo: "Introdução à Eletrodinâmica" },
  { id: "modulo-2", label: "Módulo 2", titulo: "Leis de Ohm e Efeitos Térmicos" },
  { id: "modulo-3", label: "Módulo 3", titulo: "Leis de Kirchhoff (LKT e LKC)" },
  { id: "modulo-4", label: "Módulo 4", titulo: "Associação de Resistores e Divisores" },
  { id: "modulo-5", label: "Módulo 5", titulo: "Teoremas de Thévenin e Norton" },
  { id: "modulo-6", label: "Módulo 6", titulo: "Parâmetros da Corrente Alternada" },
  { id: "modulo-7", label: "Módulo 7", titulo: "Componentes Reativos em CA" },
  { id: "modulo-8", label: "Módulo 8", titulo: "Impedância Complexa e Circuitos RLC" },
  { id: "modulo-9", label: "Módulo 9", titulo: "Triângulo de Potências e FP" },
  { id: "modulo-10", label: "Módulo 10", titulo: "Sistemas Trifásicos Básicos e Segurança" },
];

export default function AulaCircuitosCcca(props: AulaProps) {
  const STORAGE_KEY_PREFIX = "petrobras_quest_aula_circuitos_ccca_";

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

  const handleQuizComplete = (moduleId: string, score: number) => {
    const newCompleted = new Set(completedModules);
    newCompleted.add(moduleId);
    updateCompletedModules(Array.from(newCompleted));
  };

  const mv = Array.from({ length: 11 }, (_, i) => getModuleVariant(i));

  // Dicionário de Quizzes mapeado por número de módulo
  const QUIZ_MAP: Record<number, any> = {
    1: quizM1,
    2: quizM2,
    3: quizM3,
    4: quizM4,
    5: quizM5,
    6: quizM6,
    7: quizM7,
    8: quizM8,
    9: quizM9,
    10: quizM10,
  };

  // Helper para renderizar ícones dinamicamente
  const renderIcon = (name: string, className: string) => {
    switch (name) {
      case "LuZap": return <LuZap className={className} />;
      case "LuActivity": return <LuActivity className={className} />;
      case "LuCpu": return <LuCpu className={className} />;
      case "LuLayers": return <LuLayers className={className} />;
      case "LuShieldAlert": return <LuShieldAlert className={className} />;
      case "LuTrendingUp": return <LuTrendingUp className={className} />;
      default: return <LuZap className={className} />;
    }
  };

  // ── RENDERIZADOR DINÂMICO DE MÓDULOS ─────────────────────────────────
  const renderModulo = (modulo: ModuloConteudo) => {
    const variantColor = mv[modulo.numero];

    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Banner do Módulo */}
        <ModuleBanner
          numero={modulo.numero}
          variant={variantColor}
          titulo={modulo.titulo}
          descricao={modulo.descricao}
        />

        {/* Seção 1: INTRO (C.E.D.E.A) */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
          <ModuleSectionHeader index="INTRO" title={modulo.intro.titulo} variant={variantColor} />
          
          {/* Texto C.E.D.E.A - 10 Parágrafos Densos */}
          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            {modulo.intro.paragrafos.map((p, idx) => {
              // Mnemônicos visuais destacados para o C.E.D.E.A (2 parágrafos por pilar)
              let prefix = "";
              if (idx === 0) prefix = "<strong>[Contexto]</strong> ";
              else if (idx === 2) prefix = "<strong>[Explicação]</strong> ";
              else if (idx === 4) prefix = "<strong>[Demonstração]</strong> ";
              else if (idx === 6) prefix = "<strong>[Expansão]</strong> ";
              else if (idx === 8) prefix = "<strong>[Aplicação]</strong> ";

              return (
                <p 
                  key={idx} 
                  dangerouslySetInnerHTML={{ __html: prefix + p }}
                />
              );
            })}
          </div>

          {/* Imagem Clicável com Lightbox */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start my-8 border-t border-border/10 pt-6">
            <div className="space-y-4">
              <h4 className="font-bold text-foreground text-xl flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                {modulo.intro.diagrama.titulo}
              </h4>
              <p className="text-lg text-muted-foreground leading-relaxed">{modulo.intro.diagrama.descricao}</p>
            </div>
            <div className="shrink-0 space-y-2 w-full max-w-[320px] mx-auto lg:mx-0">
              <div 
                className="cursor-zoom-in hover:scale-[1.02] transition-transform duration-200"
                onClick={() => setZoomedImage(modulo.intro.diagrama.imageUrl)}
              >
                <img
                  src={modulo.intro.diagrama.imageUrl}
                  alt={modulo.intro.diagrama.titulo}
                  className="w-full rounded-2xl border border-border/20 shadow-lg"
                />
              </div>
              <p className="text-lg text-muted-foreground text-center">{modulo.intro.diagrama.legenda}</p>
            </div>
          </div>

          {/* Quebra de Listas Corridas (Cards Numéricos em Grid) se houver */}
          {modulo.intro.listaCorrida && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              {modulo.intro.listaCorrida.map((item) => (
                <div key={item.num} className="flex gap-4 p-4 bg-muted/30 border border-border/10 rounded-xl">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 font-extrabold text-lg shrink-0">
                    {item.num}
                  </span>
                  <div className="space-y-1">
                    <h5 className="font-bold text-foreground text-xl">{item.title}</h5>
                    <p className="text-lg text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Seção 2: Detalhamento Técnico (Teoria) */}
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

          {/* Grid de 3 FlipCards Premium de Conceito */}
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

        {/* Seção 3: Cartões de Memorização Prática */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader index={2} title="Análise Prática e Memorização" variant={variantColor} />
          
          {/* Grid de 3 FlipCards Premium de Prática */}
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

        {/* Seção 4: Consolidação Multimídia */}
        <ModuleConsolidation
          index={modulo.numero}
          variant={variantColor}
          video={{
            videoId: modulo.consolidation.videoId,
            title: modulo.consolidation.videoTitle,
            duration: modulo.consolidation.videoDuration
          }}
          resumoVisual={{
            moduloNome: `Módulo ${modulo.numero}`,
            tituloAula: "Circuitos CC/CA",
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
        />

        {/* Seção 5: Quiz de Módulo */}
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
        {CONTEUDO_CIRCUITOS.map((modulo) => (
          <TabsContent 
            key={`modulo-${modulo.numero}`} 
            value={`modulo-${modulo.numero}`} 
            className="mt-0"
          >
            {renderModulo(modulo)}
          </TabsContent>
        ))}
      </AulaTemplate>

      {/* Lightbox Modal de Imagem */}
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
