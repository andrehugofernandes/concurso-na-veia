"use client";

import React, { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { useAulaProgress } from "@/hooks/useAulaProgress";
import { getModuleVariant } from "@/lib/moduleColors";
import {
  AlertBox,
  ContentAccordion,
  ModuleBanner,
  QuizInterativo,
  AulaProps,
  ModuleSectionHeader,
  AulaTemplate,
  ModuleConsolidation,
  QuizQuestion,
} from "../shared";

// ── Tipagem dos Dados da Aula ───────────────────────────────────────────

export interface AccordionItem {
  titulo: string;
  conteudo: string | React.ReactNode;
  icone?: React.ReactNode;
}

export interface SectionData {
  tipo: "texto" | "accordion" | "alerta" | "consolidation" | "header";
  titulo?: string;
  subtitulo?: string;
  descricao?: string;
  // Para tipo "texto":
  conteudo?: string | React.ReactNode;
  // Para tipo "alerta":
  tipoAlerta?: "info" | "warning" | "danger" | "success";
  // Para tipo "accordion":
  slides?: AccordionItem[];
  // Para tipo "consolidation":
  video?: {
    videoId: string;
    title: string;
    duration: string;
  };
  resumoVisual?: {
    moduloNome: string;
    tituloAula: string;
    materia: string;
    images?: {
      title: string;
      type: string;
      placeholderColor: string;
      imageUrl?: string;
    }[];
  };
  sinteseEstrategica?: {
    title: string;
    content: string | React.ReactNode;
  };
}

export interface QuizQuestionData {
  id: number;
  question: string;
  options: string[];
  correct: number; // 0 a 4 (índice da alternativa correta)
  explanation: string;
}

export interface ModuleData {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  duration: string;
  sections: SectionData[];
  quiz: QuizQuestionData[];
}

export interface AulaPremiumData {
  id: string;
  titulo: string;
  descricao: string;
  duracao: string;
  materiaNome: string;
  materiaCor: string;
  materiaId: string;
  modulos: ModuleData[];
}

// ── Helpers ─────────────────────────────────────────────────────────────

function mapQuizQuestions(questions: QuizQuestionData[]): QuizQuestion[] {
  const labels = ["A", "B", "C", "D", "E"];
  return questions.map((q) => ({
    id: q.id.toString(),
    pergunta: q.question,
    opcoes: q.options.map((opt, idx) => ({
      label: labels[idx] ?? String.fromCharCode(65 + idx),
      valor: opt,
    })),
    correta: labels[q.correct] ?? "A",
    explicacao: q.explanation,
  }));
}

// ── Componente Engine Principal ─────────────────────────────────────────

interface EngineProps extends AulaProps {
  data: AulaPremiumData;
}

export default function AulaPremiumDataEngine({ data, ...props }: EngineProps) {
  const STORAGE_KEY_PREFIX = `petrobras_quest_aula_dinamica_${data.id}_`;

  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}active_tab`);
      if (saved && data.modulos.some((m) => m.id === saved)) return saved;
    }
    return data.modulos[0]?.id || "modulo-1";
  });

  const { completedModules: completedModulesList, updateCompletedModules } = useAulaProgress();
  const completedModules = new Set(completedModulesList);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}active_tab`, activeTab);
    }
  }, [activeTab, data.id]);

  const handleQuizComplete = (moduleId: string, score: number) => {
    const newCompleted = new Set(completedModules);
    newCompleted.add(moduleId);
    updateCompletedModules(Array.from(newCompleted));
  };

  const moduleDefs = data.modulos.map((m) => ({
    id: m.id,
    label: m.label,
    titulo: m.title,
  }));

  const renderSection = (sec: SectionData, idx: number, moduleIndex: number, variant: any) => {
    switch (sec.tipo) {
      case "header":
        return (
          <ModuleSectionHeader
            key={idx}
            index={moduleIndex}
            variant={variant}
            title={sec.titulo || ""}
            description={sec.descricao || ""}
          />
        );
      case "texto":
        return (
          <div key={idx} className="bg-muted/30 p-6 rounded-2xl border border-border">
            {typeof sec.conteudo === "string" ? (
              <p className="text-xl text-foreground/85 leading-relaxed whitespace-pre-line">
                {sec.conteudo}
              </p>
            ) : (
              sec.conteudo
            )}
          </div>
        );
      case "alerta":
        return (
          <AlertBox key={idx} tipo={sec.tipoAlerta || "info"} titulo={sec.titulo || "📍 IMPORTANTE 📍"}>
            {typeof sec.conteudo === "string" ? (
              <div className="whitespace-pre-line">{sec.conteudo}</div>
            ) : (
              sec.conteudo
            )}
          </AlertBox>
        );
      case "accordion":
        return (
          <ContentAccordion
            key={idx}
            mode="stacked"
            slides={sec.slides || []}
          />
        );
      case "consolidation":
        return (
          <ModuleConsolidation
            key={idx}
            index={moduleIndex}
            variant={variant}
            video={sec.video}
            resumoVisual={sec.resumoVisual ? {
              moduloNome: sec.resumoVisual.moduloNome,
              tituloAula: sec.resumoVisual.tituloAula,
              materia: sec.resumoVisual.materia,
              images: sec.resumoVisual.images || []
            } : undefined}
            sinteseEstrategica={sec.sinteseEstrategica}
          
            podcast={{
              aulaId: "premiumdataengine",
              aulaTitulo: "Premium Data Engine",
              materia: "shared",
              materiaId: "shared",
              moduloNumero: 1,
              moduloTitulo: "Módulo 1",
              conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AulaTemplate
      {...props}
      modules={moduleDefs}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      completedModules={completedModules}
      canComplete={completedModules.size >= data.modulos.length}
      lockMessage="Você precisa responder a todos os quizzes desta aula para finalizá-la."
    >
      {data.modulos.map((mod, modIdx) => {
        const moduleNumber = modIdx + 1;
        const variant = getModuleVariant(moduleNumber);

        return (
          <TabsContent key={mod.id} value={mod.id} className="mt-0">
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Banner do Módulo */}
              <ModuleBanner
                numero={moduleNumber}
                variant={variant}
                titulo={mod.title}
                descricao={mod.subtitle}
              />

              {/* Seções de Conteúdo */}
              {mod.sections.map((sec, secIdx) =>
                renderSection(sec, secIdx, moduleNumber, variant)
              )}

              {/* Quiz do Módulo */}
              {mod.quiz && mod.quiz.length > 0 && (
                <div className="space-y-6 pt-4">
                  <QuizInterativo
                    titulo={mod.title}
                    numero={moduleNumber}
                    variant={variant}
                    questoes={mapQuizQuestions(mod.quiz)}
                    onComplete={(score: number) => handleQuizComplete(mod.id, score)}
                  />
                </div>
              )}
            </div>
          </TabsContent>
        );
      })}
    </AulaTemplate>
  );
}
