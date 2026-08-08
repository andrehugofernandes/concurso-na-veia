"use client";

import React, { useState, useEffect, useMemo } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { useAulaProgress } from "@/hooks/useAulaProgress";
import { getModuleVariant } from "@/lib/moduleColors";
import { recordQuizAttempt } from "@/lib/actions/quiz-tracking";
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
  ResolvedQuestionCard,
  QuestaoComentadaData,
  ContentSlide,
} from "../shared";

// ── Tipagem dos Dados da Aula ───────────────────────────────────────────

export interface SectionData {
  tipo: "texto" | "accordion" | "alerta" | "consolidation" | "header" | "questao_comentada";
  titulo?: string;
  subtitulo?: string;
  descricao?: string;
  conteudo?: string | React.ReactNode;
  tipoAlerta?: "info" | "warning" | "danger" | "success";
  slides?: ContentSlide[];
  questaoComentada?: QuestaoComentadaData;
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
      format?: string;
    }[];
  };
  sinteseEstrategica?: {
    title: string;
    content: string | React.ReactNode;
  };
  audio?: {
    audioUrl: string;
    titulo: string;
    artista: string;
    lyrics?: string;
  };
  podcast?: {
    aulaId: string;
    aulaTitulo: string;
    materia: string;
    materiaId: string;
    moduloNumero: number;
    moduloTitulo: string;
    conteudoResumo?: string;
  };
}

export interface QuizQuestionData {
  id: string | number;
  question: string;
  options: string[];
  correct: number | string; // 0 a 4 (índice) ou "A", "B", "C", "D", "E"
  explanation: string;
}

export interface ModuleData {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  duration: string;
  sections: SectionData[];
  accordions?: ContentSlide[];
  questaoComentada?: QuestaoComentadaData;
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
  return questions.map((q) => {
    let correctLetter = "A";
    if (typeof q.correct === "number") {
      correctLetter = labels[q.correct] ?? "A";
    } else if (typeof q.correct === "string") {
      correctLetter = q.correct.trim().toUpperCase().charAt(0);
    }

    return {
      id: q.id.toString(),
      pergunta: q.question,
      opcoes: q.options.map((opt, idx) => ({
        label: labels[idx] ?? String.fromCharCode(65 + idx),
        valor: opt,
      })),
      correta: correctLetter,
      explicacao: q.explanation,
    };
  });
}

/**
 * Seleciona 4 questões rotativas por módulo a partir do pool total
 */
function getRandomRotatedQuestions(questions: QuizQuestionData[], count = 4): QuizQuestionData[] {
  if (!questions || questions.length <= count) return questions || [];
  // Usa embaralhamento pseudo-aleatório baseado no timestamp atual do client
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
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

  // Gravação de tentativas no histórico de quiz do usuário
  const handleQuizComplete = async (mod: ModuleData, score: number, questionsAttempted?: QuizQuestion[]) => {
    const newCompleted = new Set(completedModules);
    newCompleted.add(mod.id);
    updateCompletedModules(Array.from(newCompleted));

    // Salva cada questão respondida no backend para métricas de erros
    if (questionsAttempted && questionsAttempted.length > 0) {
      for (const q of questionsAttempted) {
        await recordQuizAttempt({
          aulaId: data.id,
          moduloNumero: parseInt(mod.id.replace("modulo-", "")) || 1,
          questaoId: String(q.id),
          pergunta: typeof q.pergunta === "string" ? q.pergunta : String(q.pergunta || ""),
          respostaUsuario: "REGISTRADO",
          respostaCorreta: q.correta,
          correto: score >= 70,
          materiaId: data.materiaId,
        });
      }
    }
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
      case "questao_comentada":
        return sec.questaoComentada ? (
          <div key={idx} className="space-y-4">
            <ModuleSectionHeader
              index={moduleIndex}
              variant={variant}
              title="Resolução Prática Orientada (Questão Comentada)"
              description="Análise detalhada de pegadinha e resolução passo a passo da banca CESGRANRIO antes do Quiz."
            />
            <ResolvedQuestionCard data={sec.questaoComentada} />
          </div>
        ) : null;
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
            audio={sec.audio}
            podcast={sec.podcast}
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

        // Seleciona 4 questões rotativas a partir do pool total de questões do módulo
        const rotatedQuizQuestions = mapQuizQuestions(getRandomRotatedQuestions(mod.quiz, 4));

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
              {mod.sections && mod.sections.map((sec, secIdx) =>
                renderSection(sec, secIdx, moduleNumber, variant)
              )}

              {/* Acordeons Didáticos do Módulo (caso definidos no módulo) */}
              {mod.accordions && mod.accordions.length > 0 && (
                <div className="space-y-4">
                  <ModuleSectionHeader
                    index={moduleNumber}
                    variant={variant}
                    title="Detalhamento Técnico e Acordeões Didáticos"
                    description="Aprofundamento conceitual, exemplificação prática e exceções da matéria."
                  />
                  <ContentAccordion mode="stacked" slides={mod.accordions} />
                </div>
              )}

              {/* Questão Comentada de Fixação Pré-Quiz (caso definida no módulo) */}
              {mod.questaoComentada && (
                <div className="space-y-4 pt-4">
                  <ModuleSectionHeader
                    index={moduleNumber}
                    variant={variant}
                    title="Análise de Questão Comentada CESGRANRIO"
                    description="Exame prático de pegadinhas e gabarito comentado antes do Quiz de fixação."
                  />
                  <ResolvedQuestionCard data={mod.questaoComentada} />
                </div>
              )}

              {/* Quiz Interativo Rotativo (Mínimo de 4 Questões Selecionadas do Pool) */}
              {rotatedQuizQuestions.length > 0 && (
                <div className="space-y-6 pt-4">
                  <QuizInterativo
                    titulo={`Desafio Rotativo de Fixação - Módulo ${moduleNumber}`}
                    numero={moduleNumber}
                    variant={variant}
                    questoes={rotatedQuizQuestions}
                    onComplete={(score: number) => handleQuizComplete(mod, score, rotatedQuizQuestions)}
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
