"use client";

import { useState, useEffect } from "react";
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
} from "react-icons/lu";
import { COMPRAS_QUIZZES } from "@/data/quizzes/compras-quizzes";

/**
 * AULA: Gestão de Compras (Ultimate V4.1)
 * Foco: Petrobras & CESGRANRIO
 */
export default function AulaComprasSuprimento({
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

  // Definição dos Módulos
  const MODULE_DEFS = [
    { id: "modulo-1", label: "M1", title: "Fundamentos" },
    { id: "modulo-2", label: "M2", title: "Processos" },
    { id: "modulo-3", label: "M3", title: "Fornecedores" },
    { id: "modulo-4", label: "M4", title: "Compliance" },
    { id: "modulo-5", label: "M5", title: "Simulado" },
  ] as const;

  // Variantes de cor por módulo
  const getModuleVariant = (num: number) => {
    const variants = ["indigo", "emerald", "amber", "rose", "violet"] as const;
    return variants[(num - 1) % variants.length];
  };

  const handleModuleComplete = (modId: string, score: number) => {
    setCompletedModules((prev) => new Set(prev).add(modId));
    if (modId === "modulo-5" && score >= 70) {
      onComplete();
    }
  };

  // Mapeamento de Questões do Quiz
  const mapQuizQuestions = (modId: string) => {
    const quiz = COMPRAS_QUIZZES[modId];
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
      {/* ═══ MÓDULO 1: Fundamentos ═══ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={1}
            titulo="Fundamentos de Compras"
            descricao="Conceitos básicos, evolução e importância estratégica do suprimento."
            gradiente="bg-gradient-to-br from-indigo-600 to-blue-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Base do Suprimento"
              description="Rich Intro: Entenda por que compras é o coração financeiro da indústria."
              variant="indigo"
            />

            <RichIntro>
              <p>
                A função de **Compras** deixou de ser burocrática para se tornar
                estratégica. Em indústrias como a Petrobras, materiais comprados
                podem representar até **70% do faturamento**.
              </p>
              <p>
                O objetivo central é garantir os **5 Certos**: Qualidade,
                Quantidade, Tempo, Preço e Fonte.
              </p>
            </RichIntro>

            <AlertBox tipo="info" titulo="💡 Visão Petrobras">
              Na Petrobras, a continuidade operacional é soberana. O Técnico de
              Suprimentos foca em minimizar o *lead time* para evitar paradas de
              produção bilionárias.
            </AlertBox>

            <ContentAccordion
              corIndicador="bg-indigo-500"
              slides={[
                {
                  title: "Os 5 Certos do Suprimento",
                  icon: <LuZap />,
                  content: (
                    <ul className="list-disc ml-6 space-y-2">
                      <li>Qualidade certa: Atendimento técnico.</li>
                      <li>Quantidade certa: Nem falta, nem excesso.</li>
                      <li>Tempo certo: Lead time compatível.</li>
                      <li>Preço certo: Custo de propriedade (TCO).</li>
                      <li>Fonte certa: Fornecedores qualificados.</li>
                    </ul>
                  ),
                },
              ]}
            />
          </section>

          <section id="consolidacao-modulo-1" className="mt-16">
            <ModuleConsolidation
              index={1}
              variant="indigo"
              video={{
                videoId: "b1VjGMSRfMk",
                title: "Resumo M1: Fundamentos",
                duration: "12:00",
              }}
              resumoVisual={{
                moduloNome: "Módulo 1",
                tituloAula: "Gestão de Compras",
                materia: "Suprimento",
                images: [
                  {
                    title: "Os 5 Certos",
                    type: "Mapa Mental",
                    placeholderColor: "bg-indigo-500/20",
                  },
                ],
              }}
              maceteVisual={{
                title: "O Mantra dos 5Rs",
                content: (
                  <p className="text-xl font-bold italic text-center">
                    "Qualidade e Qtd no Tempo e Preço da Fonte"
                  </p>
                ),
              }}
              audio={{
                audioUrl: "/audio/resumo-compras-m1.mp3",
                titulo: "Mantra do Comprador",
                artista: "Suno AI",
              }}
            />

            <QuizInterativo
              questoes={mapQuizQuestions("modulo-1")}
              titulo="4 QUIZ: Fundamentos de Compras"
              numero={1}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULOS 2-4 (Simplificado para o exemplo, seguir padrão M1) ═══ */}
      {[
        {
          id: "modulo-2",
          num: 2,
          t: "Processos",
          v: "emerald" as const,
          icon: <LuTruck />,
        },
        {
          id: "modulo-3",
          num: 3,
          t: "Fornecedores",
          v: "amber" as const,
          icon: <LuBrain />,
        },
        {
          id: "modulo-4",
          num: 4,
          t: "Compliance",
          v: "rose" as const,
          icon: <LuShieldCheck />,
        },
      ].map(({ id, num, t, v, icon }) => (
        <TabsContent key={id} value={id} className="space-y-[50px]">
          <div className="space-y-12 animate-in fade-in duration-500">
            <ModuleBanner
              numero={num}
              titulo={t}
              descricao={`Aprofundamento em ${t} para Suprimento.`}
              gradiente={`bg-gradient-to-br ${v === "emerald" ? "from-emerald-600 to-teal-800" : v === "amber" ? "from-amber-600 to-orange-700" : "from-rose-600 to-pink-800"}`}
            />
            <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
              <ModuleSectionHeader index={num} title={t} variant={v} />
              <RichIntro>
                <p>Conteúdo em fase de consolidação pedagógica para {t}.</p>
              </RichIntro>
            </section>
            <section id={`consolidacao-${id}`} className="mt-16">
              <ModuleConsolidation
                index={num}
                variant={v}
                video={{
                  videoId: "abc",
                  title: `Resumo ${t}`,
                  duration: "10:00",
                }}
                resumoVisual={{
                  moduloNome: t,
                  tituloAula: "Gestão de Compras",
                  materia: "Suprimento",
                  images: [
                    {
                      title: t,
                      type: "Resumo",
                      placeholderColor: "bg-slate-500/10",
                    },
                  ],
                }}
                maceteVisual={{
                  title: "Macete",
                  content: <p>Macete Visual {t}</p>,
                }}
                audio={{
                  audioUrl: "/audio.mp3",
                  titulo: t,
                  artista: "Suno AI",
                }}
              />
              <QuizInterativo
                questoes={mapQuizQuestions(id)}
                titulo={`4 QUIZ: ${t}`}
                numero={num}
                variant={v}
                onComplete={(score) => handleModuleComplete(id, score)}
              />
            </section>
          </div>
        </TabsContent>
      ))}

      {/* ═══ MÓDULO 5: Simulado ═══ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={5}
            titulo="Simulado Mestre"
            descricao="Nível Petrobras."
            gradiente="bg-gradient-to-br from-black via-slate-800 to-indigo-950"
          />
          <QuizInterativo
            questoes={mapQuizQuestions("modulo-5")}
            titulo="4 QUIZ: Simulado Mestre"
            numero={5}
            variant="violet"
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
          />
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
