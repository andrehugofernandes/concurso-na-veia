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
  CheckCircle,
} from "react-icons/lu";
import { GESTAO_QUALIDADE_QUIZZES } from "@/data/quizzes/gestao-qualidade-quizzes";

/**
 * AULA: Gestão da Qualidade (Suprimento) - Ultimate V4.1
 */
export default function AulaGestaoQualidadeSuprimento({
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
    { id: "modulo-2", label: "M2", title: "Era da Qualidade" },
    { id: "modulo-3", label: "M3", title: "Gurus da Qualidade" },
    { id: "modulo-4", label: "M4", title: "Ferramentas" },
    { id: "modulo-5", label: "M5", title: "Simulado" },
  ] as const;

  const handleModuleComplete = (modId: string, score: number) => {
    setCompletedModules((prev) => new Set(prev).add(modId));
    if (modId === "modulo-5" && score >= 70) {
      onComplete();
    }
  };

  const mapQuizQuestions = (modId: string) => {
    const quiz = GESTAO_QUALIDADE_QUIZZES[modId];
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
            titulo="Fundamentos da Qualidade"
            descricao="Dimensões, conceitos e a importância da melhoria contínua."
            gradiente="bg-gradient-to-br from-emerald-600 to-teal-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Era da Excelência"
              description="Rich Intro: Qualidade não é luxo, é conformidade e satisfação."
              variant="emerald"
            />

            <RichIntro>
              <p>
                Para o Suprimento, **Qualidade** significa garantir que cada
                parafuso ou turbina atenda às especificações técnicas rigorosas
                (conformidade).
              </p>
              <p>
                Trabalhamos com o conceito de **TQM (Total Quality
                Management)**, onde a qualidade é responsabilidade de todos,
                desde o recebimento até o uso final.
              </p>
            </RichIntro>

            <AlertBox tipo="success" titulo="✅ Conceito Chave: PDCA">
              O ciclo de **Shewhart/Deming (PDCA)** é a espinha dorsal da
              melhoria contínua. Plan (Planejar), Do (Executar), Check
              (Verificar), Act (Agir/Corrigir).
            </AlertBox>

            <ContentAccordion
              corIndicador="bg-emerald-500"
              slides={[
                {
                  title: "As 8 Dimensões de Garvin",
                  icon: <CheckCircle />,
                  content: (
                    <ul className="list-disc ml-6 space-y-2">
                      <li>Desempenho: Características básicas.</li>
                      <li>Conformidade: Grau de atendimento às normas.</li>
                      <li>Durabilidade: Vida útil do produto.</li>
                      <li>Estética: Aparência e acabamento.</li>
                    </ul>
                  ),
                },
              ]}
            />
          </section>

          <section id="consolidacao-modulo-1" className="mt-16">
            <ModuleConsolidation
              index={1}
              variant="emerald"
              video={{
                videoId: "QUAL123",
                title: "Resumo M1: Qualidade",
                duration: "12:00",
              }}
              resumoVisual={{
                moduloNome: "Módulo 1",
                tituloAula: "Gestão da Qualidade",
                materia: "Suprimento",
                images: [
                  {
                    title: "Ciclo PDCA",
                    type: "Infográfico",
                    placeholderColor: "bg-emerald-500/20",
                  },
                ],
              }}
              maceteVisual={{
                title: "PDCA Decorado",
                content: (
                  <p className="text-xl font-bold italic text-center">
                    "Planeja, Dança, Checa e Atua"
                  </p>
                ),
              }}
              audio={{
                audioUrl: "/audio/qualidade-m1.mp3",
                titulo: "Hino da Qualidade",
                artista: "Suno AI",
              }}
            />
            <QuizInterativo
              questoes={mapQuizQuestions("modulo-1")}
              titulo="4 QUIZ: Fundamentos da Qualidade"
              numero={1}
              variant="emerald"
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
              variant="emerald"
            />
            <QuizInterativo
              questoes={mapQuizQuestions(`modulo-${n}`)}
              titulo={`4 QUIZ: ${MODULE_DEFS[n - 1].title}`}
              numero={n}
              variant="emerald"
              onComplete={(score) => handleModuleComplete(`modulo-${n}`, score)}
            />
          </div>
        </TabsContent>
      ))}
    </AulaTemplate>
  );
}
