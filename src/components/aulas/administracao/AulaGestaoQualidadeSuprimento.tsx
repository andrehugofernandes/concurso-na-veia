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
  CardCarousel,
} from "@/components/aulas/shared";
import { TabsContent } from "@/components/ui/tabs";
import {
  LuFileText,
  LuBrain,
  LuCircleCheck,
  LuTrendingUp,
  LuTarget,
  LuGauge,
  LuLightbulb,
  LuCircleAlert,
  LuTriangleAlert,
  LuFileCheck,
} from "react-icons/lu";
import { GESTAO_QUALIDADE_QUIZZES } from "@/data/quizzes/gestao-qualidade-quizzes";
import { getModuleVariant } from "@/lib/moduleColors";

/**
 * AULA: Gestão da Qualidade (Suprimento) - Ultimate V4.1
 * Estabilidade de Ícones: Lucide 5.5 (react-icons/lu)
 */
export default function AulaGestaoQualidadeSuprimento({
  onComplete,
  isCompleted,
  loading,
  xpGanho = 50,
  currentProgress = 0,
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
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

  const MODULE_DEFS = [
    { id: "modulo-1", label: "M1", title: "Fundamentos da Qualidade" },
    { id: "modulo-2", label: "M2", title: "Era da Qualidade" },
    { id: "modulo-3", label: "M3", title: "Gurus da Qualidade" },
    { id: "modulo-4", label: "M4", title: "Ferramentas de Qualidade" },
    { id: "modulo-5", label: "M5", title: "Normas ISO e Certificação" },
    { id: "modulo-6", label: "M6", title: "Six Sigma e Lean" },
    { id: "modulo-7", label: "M7", title: "Controle Estatístico (CEP)" },
    { id: "modulo-8", label: "M8", title: "Auditoria e Conformidade" },
    { id: "modulo-9", label: "M9", title: "Qualidade na Petrobras" },
    { id: "modulo-10", label: "M10", title: "Simulado Mestre" },
  ] as const;

  const mv = Object.fromEntries(
    Array.from({ length: 11 }, (_, i) => [i, getModuleVariant(i)])
  ) as any;

  const handleModuleComplete = (modId: string, score: number) => {
    setCompletedModules((prev) => {
      const newSet = new Set(prev).add(modId);
      const percent = Math.round((newSet.size / MODULE_DEFS.length) * 100);
      onUpdateProgress?.(percent);
      return newSet;
    });
    if (modId === "modulo-10" && score >= 70) {
      onComplete();
    }
  };

  const isModuleUnlocked = (index: number) => {
    if (index === 0) return true;
    return completedModules.has(MODULE_DEFS[index - 1].id);
  };

  const mapQuizQuestions = (modId: string) => {
    const quiz = GESTAO_QUALIDADE_QUIZZES[modId];
    if (!quiz) return [];
    return quiz.questions.map((q: any) => ({
      id: q.id,
      pergunta: q.question,
      opcoes: q.options.map((opt: string, i: number) => ({
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
      isModuleUnlocked={isModuleUnlocked}
      isCompleted={isCompleted}
      loading={loading}
      xpGanho={xpGanho}
      currentProgress={currentProgress}
      onComplete={onComplete}
      titulo={titulo}
      descricao={descricao}
      duracao={duracao}
      materiaNome={materiaNome}
      materiaCor={mv[1]}
      materiaId={materiaId}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
    >
      {/* ─── Módulo 1 ─── */}
      <TabsContent value="modulo-1" className="mt-0 space-y-12">
        <ModuleBanner numero={1} titulo={MODULE_DEFS[0].title} variant={mv[1]} descricao="Fundamentos e o ciclo PDCA." />
        <RichIntro>Qualidade no Suprimento é o grau em que as características de um produto ou serviço atendem aos requisitos.</RichIntro>
        <ModuleConsolidation
          index={1} variant={mv[1]}
          video={{ videoId: "Q1", title: "Conceito", duration: "10:00" }}
          resumoVisual={{ moduloNome: "M1", tituloAula: "Qualidade", materia: "Suprimento", images: [{ title: "PDCA", type: "Diagrama", placeholderColor: "bg-blue-100" }] }}
          maceteVisual={{ title: "Regra", content: "P-D-C-A: Planejar, Executar, Checar e Atuar." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 1", artista: "Voz Digital" }}
        />
        <QuizInterativo questoes={mapQuizQuestions("modulo-1")} titulo="Quiz 1" numero={1} variant={mv[1]} onComplete={(s) => handleModuleComplete("modulo-1", s)} />
      </TabsContent>

      <TabsContent value="modulo-2" className="mt-0 space-y-12">
        <ModuleBanner numero={2} titulo={MODULE_DEFS[1].title} variant={mv[2]} descricao="Eras da Qualidade." />
        <ModuleConsolidation
          index={2} variant={mv[2]}
          video={{ videoId: "Q2", title: "Eras", duration: "08:00" }}
          resumoVisual={{ moduloNome: "M2", tituloAula: "Qualidade", materia: "Suprimento", images: [{ title: "Eras", type: "Timeline", placeholderColor: "bg-amber-100" }] }}
          maceteVisual={{ title: "ICGT", content: "I-C-G-T: Inspeção, Controle, Garantia, Total." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 2", artista: "Voz Digital" }}
        />
        <QuizInterativo questoes={mapQuizQuestions("modulo-2")} titulo="Quiz 2" numero={2} variant={mv[2]} onComplete={(s) => handleModuleComplete("modulo-2", s)} />
      </TabsContent>

      <TabsContent value="modulo-3" className="mt-0 space-y-12">
        <ModuleBanner numero={3} titulo={MODULE_DEFS[2].title} variant={mv[3]} descricao="Os pais da gestão moderna." />
        <ModuleConsolidation
          index={3} variant={mv[3]}
          video={{ videoId: "Q3", title: "Gurus", duration: "12:30" }}
          resumoVisual={{ moduloNome: "M3", tituloAula: "Qualidade", materia: "Suprimento", images: [{ title: "Gurus", type: "Tabela", placeholderColor: "bg-emerald-100" }] }}
          maceteVisual={{ title: "Gurus", content: "Deming(PDCA), Juran(80/20), Crosby(ZD), Ishikawa(Causa-Efeito)." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 3", artista: "Voz Digital" }}
        />
        <QuizInterativo questoes={mapQuizQuestions("modulo-3")} titulo="Quiz 3" numero={3} variant={mv[3]} onComplete={(s) => handleModuleComplete("modulo-3", s)} />
      </TabsContent>

      <TabsContent value="modulo-4" className="mt-0 space-y-12">
        <ModuleBanner numero={4} titulo={MODULE_DEFS[3].title} variant={mv[4]} descricao="Ishikawa, Pareto, Folhas." />
        <ModuleConsolidation
          index={4} variant={mv[4]}
          video={{ videoId: "Q4", title: "Ferramentas", duration: "18:00" }}
          resumoVisual={{ moduloNome: "M4", tituloAula: "Qualidade", materia: "Suprimento", images: [{ title: "7 Ferramentas", type: "Dashboard", placeholderColor: "bg-rose-100" }] }}
          maceteVisual={{ title: "Ishikawa", content: "As 6 causas: Mão de Obra, Meio Ambiente, Máquina, Método, Material, Medida." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 4", artista: "Voz Digital" }}
        />
        <QuizInterativo questoes={mapQuizQuestions("modulo-4")} titulo="Quiz 4" numero={4} variant={mv[4]} onComplete={(s) => handleModuleComplete("modulo-4", s)} />
      </TabsContent>

      <TabsContent value="modulo-5" className="mt-0 space-y-12">
        <ModuleBanner numero={5} titulo={MODULE_DEFS[4].title} variant={mv[5]} descricao="ISO 9001, 14001, 45001." />
        <ModuleConsolidation
          index={5} variant={mv[5]}
          video={{ videoId: "Q5", title: "ISO", duration: "11:20" }}
          resumoVisual={{ moduloNome: "M5", tituloAula: "Qualidade", materia: "Suprimento", images: [{ title: "Normas", type: "Selo", placeholderColor: "bg-violet-100" }] }}
          maceteVisual={{ title: "ISO", content: "900x=Qualidade, 1400x=Ambiental, 4500x=Segurança." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 5", artista: "Voz Digital" }}
        />
        <QuizInterativo questoes={mapQuizQuestions("modulo-5")} titulo="Quiz 5" numero={5} variant={mv[5]} onComplete={(s) => handleModuleComplete("modulo-5", s)} />
      </TabsContent>

      <TabsContent value="modulo-6" className="mt-0 space-y-12">
        <ModuleBanner numero={6} titulo={MODULE_DEFS[5].title} variant={mv[6]} descricao="Combinação de agilidade e precisão." />
        <ModuleConsolidation
          index={6} variant={mv[6]}
          video={{ videoId: "Q6", title: "Lean Sigma", duration: "09:40" }}
          resumoVisual={{ moduloNome: "M6", tituloAula: "Qualidade", materia: "Suprimento", images: [{ title: "DMAIC", type: "Infográfico", placeholderColor: "bg-blue-900" }] }}
          maceteVisual={{ title: "DMAIC", content: "D-M-A-I-C: Define, Measure, Analyze, Improve, Control." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 6", artista: "Voz Digital" }}
        />
        <QuizInterativo questoes={mapQuizQuestions("modulo-6")} titulo="Quiz 6" numero={6} variant={mv[6]} onComplete={(s) => handleModuleComplete("modulo-6", s)} />
      </TabsContent>

      <TabsContent value="modulo-7" className="mt-0 space-y-12">
        <ModuleBanner numero={7} titulo={MODULE_DEFS[6].title} variant={mv[7]} descricao="Gráficos de Controle." />
        <ModuleConsolidation
          index={7} variant={mv[7]}
          video={{ videoId: "Q7", title: "CEP", duration: "14:10" }}
          resumoVisual={{ moduloNome: "M7", tituloAula: "Qualidade", materia: "Suprimento", images: [{ title: "Controle", type: "Gráfico", placeholderColor: "bg-amber-900" }] }}
          maceteVisual={{ title: "CEP", content: "Limites: Superior (LSC) e Inferior (LIC)." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 7", artista: "Voz Digital" }}
        />
        <QuizInterativo questoes={mapQuizQuestions("modulo-7")} titulo="Quiz 7" numero={7} variant={mv[7]} onComplete={(s) => handleModuleComplete("modulo-7", s)} />
      </TabsContent>

      <TabsContent value="modulo-8" className="mt-0 space-y-12">
        <ModuleBanner numero={8} titulo={MODULE_DEFS[7].title} variant={mv[8]} descricao="Padrões de conformidade." />
        <ModuleConsolidation
          index={8} variant={mv[8]}
          video={{ videoId: "Q8", title: "Auditoria", duration: "08:15" }}
          resumoVisual={{ moduloNome: "M8", tituloAula: "Qualidade", materia: "Suprimento", images: [{ title: "Auditoria", type: "Capa", placeholderColor: "bg-emerald-900" }] }}
          maceteVisual={{ title: "Segunda Parte", content: "Auditoria de 1ª parte(autohavaliação), 2ª(fornecedor), 3ª(certificadora)." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 8", artista: "Voz Digital" }}
        />
        <QuizInterativo questoes={mapQuizQuestions("modulo-8")} titulo="Quiz 8" numero={8} variant={mv[8]} onComplete={(s) => handleModuleComplete("modulo-8", s)} />
      </TabsContent>

      <TabsContent value="modulo-9" className="mt-0 space-y-12">
        <ModuleBanner numero={9} titulo={MODULE_DEFS[8].title} variant={mv[9]} descricao="Excelência em SMS e Conformidade." />
        <ModuleConsolidation
          index={9} variant={mv[9]}
          video={{ videoId: "Q9", title: "Petrobras", duration: "07:20" }}
          resumoVisual={{ moduloNome: "M9", tituloAula: "Qualidade", materia: "Suprimento", images: [{ title: "Plataforma", type: "Cenas", placeholderColor: "bg-rose-900" }] }}
          maceteVisual={{ title: "Petrobras", content: "Especificação é lei. SMS é prioridade zero." }}
          audio={{ audioUrl: "#", titulo: "AudioAula 9", artista: "Voz Digital" }}
        />
        <QuizInterativo questoes={mapQuizQuestions("modulo-9")} titulo="Quiz 9" numero={9} variant={mv[9]} onComplete={(s) => handleModuleComplete("modulo-9", s)} />
      </TabsContent>

      <TabsContent value="modulo-10" className="mt-0 space-y-12">
        <ModuleBanner numero={10} titulo={MODULE_DEFS[9].title} variant={mv[10]} descricao="Provando seu conhecimento." />
        <AlertBox tipo="success" titulo="Simulado">Resolva 15 questões integradas para concluir este tópico.</AlertBox>
        <QuizInterativo questoes={mapQuizQuestions("modulo-10")} titulo="Simulado Final" numero={10} variant={mv[10]} onComplete={(s) => handleModuleComplete("modulo-10", s)} />
      </TabsContent>
    </AulaTemplate>
  );
}
