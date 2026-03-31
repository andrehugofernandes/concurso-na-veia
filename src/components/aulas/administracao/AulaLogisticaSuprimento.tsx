"use client";

import { useState } from "react";
import {
  AulaTemplate,
  ModuleBanner,
  ModuleSectionHeader,
  AlertBox,
  RichIntro,
  ContentAccordion,
  ModuleConsolidation,
  QuizInterativo,
  AulaProps,
} from "@/components/aulas/shared";
import { TabsContent } from "@/components/ui/tabs";
import {
  LuZap,
  LuPlay,
  LuBookOpen,
  LuImage,
  LuVolume2,
  LuShieldCheck,
  LuTruck,
  LuFileText,
  LuBrain,
  LuPackage,
} from "react-icons/lu";
import { LOGISTICA_QUIZZES } from "@/data/quizzes/logistica-quizzes";

/**
 * AULA: Logística e Distribuição (Suprimento) - Ultimate V4.1
 */
export default function AulaLogisticaSuprimento({
  onComplete,
  isCompleted,
  loading,
  xpGanho,
  currentProgress,
  onUpdateProgress,
  titulo,
  descricao,
  duracao,
  materiaNome,
  materiaCor,
  materiaId,
  prevTopico,
  nextTopico,
}: AulaProps) {
  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(),
  );

  const MODULE_DEFS = [
    { id: "modulo-1", label: "M1", title: "Fundamentos" },
    { id: "modulo-2", label: "M2", title: "Modais de Transp" },
    { id: "modulo-3", label: "M3", title: "Estocagem" },
    { id: "modulo-4", label: "M4", title: "Movimentação" },
    { id: "modulo-5", label: "M5", title: "Simulado" },
  ] as const;

  const handleModuleComplete = (modId: string, score: number) => {
    setCompletedModules((prev) => new Set(prev).add(modId));
    if (modId === "modulo-5" && score >= 70) {
      onComplete();
    }
  };

  const mapQuizQuestions = (modId: string) => {
    const quiz = LOGISTICA_QUIZZES[modId];
    if (!quiz) return [];
    return quiz.questions.map((q) => ({
      id: q.id,
      pergunta: q.question,
      opcoes: q.options.map((opt, i) => ({
        label: String.fromCharCode(65 + i),
        valor: opt,
      })),
      correta: String.fromCharCode(65 + q.correct),
      explicacao: q.explanation,
    }));
  };

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      completedModules={completedModules}
      modules={MODULE_DEFS}
      isCompleted={isCompleted}
      loading={loading}
      xpGanho={xpGanho}
      currentProgress={currentProgress}
      onComplete={onComplete}
      titulo={titulo}
      descricao={descricao}
      duracao={duracao}
      materiaNome={materiaNome}
      materiaCor={materiaCor}
      materiaId={materiaId}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
    >
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={1}
            titulo="Fundamentos de Logística"
            descricao="Fluxo de materiais, informações e valores na cadeia de suprimento."
            gradiente="bg-gradient-to-br from-amber-600 to-orange-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Arte de Movimentar"
              description="Rich Intro: Logística é colocar o item certo no lugar certo."
              variant="amber"
            />

            <RichIntro>
              <p>
                A **Logística** é o braço operacional do Suprimento. Ela cuida
                de tudo o que acontece desde a saída do fornecedor até o ponto
                de consumo em uma refinaria ou plataforma.
              </p>
              <p>
                O foco é a redução do **Custo Logístico Total**, equilibrando
                transporte, estoque e processamento de pedidos.
              </p>
            </RichIntro>

            <AlertBox tipo="info" titulo="💡 SCM vs Logística">
              Logística é o fluxo interno da empresa. **SCM (Supply Chain
              Management)** é a integração de todos os elos da cadeia, do
              produtor da matéria-prima ao cliente final.
            </AlertBox>

            <ContentAccordion
              corIndicador="bg-amber-500"
              slides={[
                {
                  title: "Logística Reversa",
                  icon: <LuPackage />,
                  content: (
                    <p>
                      Processo de retorno de materiais (embalagens, resíduos,
                      produtos defeituosos) para reaproveitamento ou descarte
                      ecológico. Fundamental para o ESG da Petrobras.
                    </p>
                  ),
                },
              ]}
            />
          </section>

          <section id="consolidacao-modulo-1" className="mt-16">
            <ModuleConsolidation
              index={1}
              variant="amber"
              video={{
                videoId: "LOG123",
                title: "Resumo M1: Logística",
                duration: "18:00",
              }}
              resumoVisual={{
                moduloNome: "Módulo 1",
                tituloAula: "Logística",
                materia: "Suprimento",
                images: [
                  {
                    title: "Cadeia de Suprimento",
                    type: "Fluxograma",
                    placeholderColor: "bg-amber-500/20",
                  },
                ],
              }}
              maceteVisual={{
                title: "As 7 Letras",
                content: (
                  <p className="text-xl font-bold italic text-center">
                    "Logística: Levar O Gasto Inútil ao Silêncio Total...
                    Incrível Agilidade!"
                  </p>
                ),
              }}
              audio={{
                audioUrl: "/audio/logistica-m1.mp3",
                titulo: "Batida do Transporte",
                artista: "Suno AI",
              }}
            />
            <QuizInterativo
              questoes={mapQuizQuestions("modulo-1")}
              titulo="4 QUIZ: Fundamentos de Logística"
              numero={1}
              variant="amber"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* Outros módulos simplificados */}
      {[2, 3, 4, 5].map((n) => (
        <TabsContent
          key={`m${n}`}
          value={`modulo-${n}`}
          className="space-y-[50px]"
        >
          <div className="space-y-12 animate-in fade-in duration-500">
            <ModuleSectionHeader
              index={n}
              title={MODULE_DEFS[n - 1].title}
              variant="amber"
            />
            <QuizInterativo
              questoes={mapQuizQuestions(`modulo-${n}`)}
              titulo={`4 QUIZ: ${MODULE_DEFS[n - 1].title}`}
              numero={n}
              variant="amber"
              onComplete={(score) => handleModuleComplete(`modulo-${n}`, score)}
            />
          </div>
        </TabsContent>
      ))}
    </AulaTemplate>
  );
}
