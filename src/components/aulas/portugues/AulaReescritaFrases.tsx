"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import {
  LuCheck,
  LuTrophy,
  LuTarget,
  LuLayers,
  LuTriangleAlert,
  LuBookOpen,
  LuLock,
  LuArrowRight,
  LuShuffle,
  LuPlay,
  LuImage,
  LuVolume2,
  LuTimer,
  LuArrowLeft,
} from "react-icons/lu";

import {
  AlertBox,
  CardCarousel,
  ContentAccordion,
  ModuleBanner,
  QuizInterativo,
  FlipCard,
  LessonTabs,
  ModuleSectionHeader,
  ModuleSummaryCarouselNew,
  VideoModal,
  AulaTemplate,
  MusicPlayer,
} from "../shared";

import type { QuizQuestion, AulaProps } from "../shared";

import {
  QUIZ_M1_REESCRITA,
  QUIZ_M2_TECNICAS,
  QUIZ_M3_VOZES,
  QUIZ_M4_DISCURSO,
  QUIZ_M5_NOMINALIZACAO,
  QUIZ_M6_CONECTIVOS,
  QUIZ_M7_PONTUACAO,
  QUIZ_M8_PARAFRASES,
  QUIZ_M9_CESGRANRIO,
  QUIZ_FINAL_REESCRITA,
} from "./data/reescrita-frases-quizzes";

import { LuLightbulb } from "react-icons/lu";

// ── Tipos e Configurações ──────────────────────────────────────────────────

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", titulo: "Conceitos Base" },
  { id: "modulo-2", label: "Módulo 2", titulo: "Técnicas de Troca" },
  { id: "modulo-3", label: "Módulo 3", titulo: "Vozes Verbais" },
  { id: "modulo-4", label: "Módulo 4", titulo: "Discurso Direto/Indireto" },
  { id: "modulo-5", label: "Módulo 5", titulo: "Nominalização" },
  { id: "modulo-6", label: "Módulo 6", titulo: "Conectivos Lógicos" },
  { id: "modulo-7", label: "Módulo 7", titulo: "Pontuação e Sentido" },
  { id: "modulo-8", label: "Módulo 8", titulo: "Paráfrases Complexas" },
  { id: "modulo-9", label: "Módulo 9", titulo: "Laboratório Cesgranrio" },
  { id: "modulo-10", label: "Módulo 10", titulo: "Simulado Final" },
];

export default function AulaReescritaFrases({
  titulo,
  descricao,
  duracao,
  materiaNome,
  materiaCor,
  materiaId,
  prevTopico,
  nextTopico,
  onUpdateProgress,
  onComplete,
  isCompleted,
  loading,
  xpGanho,
  currentProgress,
}: AulaProps) {
  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(),
  );
  const [showCompletionBadge, setShowCompletionBadge] = useState(false);

  useEffect(() => {
    if ((currentProgress ?? 0) >= 100 || isCompleted)
      setShowCompletionBadge(true);
  }, [currentProgress, isCompleted]);

  // Sincronizar progresso inicial do estado global
  const [hasSyncedInitial, setHasSyncedInitial] = useState(false);
  useEffect(() => {
    if (
      !hasSyncedInitial &&
      !loading &&
      currentProgress !== undefined &&
      currentProgress > 0
    ) {
      const doneCount = Math.floor(
        (currentProgress / 100) * MODULE_DEFS.length,
      );
      const newDone = new Set<string>();
      for (let i = 0; i < doneCount; i++) {
        newDone.add(MODULE_DEFS[i].id);
      }
      setCompletedModules(newDone);
      setHasSyncedInitial(true);
    } else if (!hasSyncedInitial && !loading && currentProgress === 0) {
      setHasSyncedInitial(true);
    }
  }, [currentProgress, hasSyncedInitial, loading]);

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 70) {
      const newCompleted = new Set(completedModules);
      newCompleted.add(moduleId);
      setCompletedModules(newCompleted);

      const progressPercent = Math.round(
        (newCompleted.size / MODULE_DEFS.length) * 100,
      );
      if (onUpdateProgress) onUpdateProgress(progressPercent);

      const index = MODULE_DEFS.findIndex((m) => m.id === moduleId);
      if (index < MODULE_DEFS.length - 1) {
        setTimeout(() => setActiveTab(MODULE_DEFS[index + 1].id), 1500);
      } else {
        setShowCompletionBadge(true);
        if (onComplete) onComplete();
      }
    }
  };

  const isModuleUnlocked = (index: number) => {
    if (index === 0) return true;
    return completedModules.has(MODULE_DEFS[index - 1].id) || isCompleted;
  };

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={(val) => {
        const idx = MODULE_DEFS.findIndex((m) => m.id === val);
        if (isModuleUnlocked(idx)) setActiveTab(val);
      }}
      modules={MODULE_DEFS}
      completedModules={completedModules}
      isModuleUnlocked={isModuleUnlocked}
      titulo={titulo}
      descricao={descricao}
      duracao={duracao}
      materiaNome={materiaNome}
      materiaCor={materiaCor}
      materiaId={materiaId}
      isCompleted={isCompleted}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
      currentProgress={Math.round(
        (completedModules.size / MODULE_DEFS.length) * 100,
      )}
      onComplete={onComplete}
      loading={loading}
      xpGanho={xpGanho}
    >
      {/* Módulo 1: Fundamentos */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={1}
            titulo="Fundamentos da Reescritura"
            descricao="Fidelidade ao sentido original e correção gramatical."
            gradiente="bg-gradient-to-br from-blue-600 to-indigo-700"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Semântica + Gramática"
              variant="indigo"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AlertBox tipo="info" titulo="O que a banca quer?">
                <p className="text-sm">
                  A Cesgranrio busca paráfrases que não alterem a modalização
                  (certeza vs. dúvida).
                </p>
              </AlertBox>
              <FlipCard
                frente="Talvez ele venha."
                verso="Com certeza ele virá. (ERRADO: Mudou de dúvida para certeza)"
              />
            </div>
          </section>
          <QuizInterativo
            questoes={QUIZ_M1_REESCRITA}
            titulo="Fixação - Módulo 1"
            icone="🎯"
            numero={1}
            variant="indigo"
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 2: Técnicas de Troca */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={2}
            titulo="Engenharia de Substituição"
            descricao="Troca de conectivos, sinônimos contextuais e adequação de registro."
            gradiente="bg-gradient-to-br from-indigo-600 to-blue-700"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Sinônimos e Registro"
              variant="indigo"
            />
            <CardCarousel
              cards={[
                {
                  icone: "🔄",
                  titulo: "Sinônimos",
                  descricao: "Alegre → Feliz",
                },
                {
                  icone: "⚠️",
                  titulo: "Contexto",
                  descricao: "Banco (assento) vs Banco (financeiro)",
                },
                {
                  icone: "📍",
                  titulo: "Registro",
                  descricao: "Informal vs Formal",
                },
              ]}
            />
          </section>
          <QuizInterativo
            questoes={QUIZ_M2_TECNICAS}
            titulo="Fixação - Módulo 2"
            icone="🎯"
            numero={2}
            variant="indigo"
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 3: Vozes Verbais */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={3}
            titulo="Vozes Verbais"
            descricao="Transposição entre as vozes mantendo rigorosamente o tempo verbal."
            gradiente="bg-gradient-to-br from-emerald-600 to-teal-700"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Ativa & Passiva"
              variant="emerald"
            />
            <div className="space-y-4">
              <p className="text-muted-foreground">
                O 'tempo' do verbo auxiliar deve ser o mesmo do verbo principal
                da ativa.
              </p>
              <FlipCard
                frente="Anunciou (Pretérito)"
                verso="Foi anunciado (Pretérito)"
              />
            </div>
          </section>
          <QuizInterativo
            questoes={QUIZ_M3_VOZES}
            titulo="Fixação - Módulo 3"
            icone="🎯"
            numero={3}
            variant="emerald"
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 4: Discurso */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={4}
            titulo="Transposição de Discurso"
            descricao="Eu disse: 'Vou' → Ele disse que iria. Ajustes de pronomes e tempos."
            gradiente="bg-gradient-to-br from-teal-600 to-emerald-700"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={4}
              title="Direto & Indireto"
              variant="emerald"
            />
            <AlertBox tipo="warning" titulo="Advérbios do Dia">
              <p className="text-sm">
                Ontem → O dia anterior | Amanhã → O dia seguinte | Aqui → Ali.
              </p>
            </AlertBox>
          </section>
          <QuizInterativo
            questoes={QUIZ_M4_DISCURSO}
            titulo="Fixação - Módulo 4"
            icone="🎯"
            numero={4}
            variant="emerald"
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 5: Nominalização */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={5}
            titulo="Nominalização"
            descricao="Transformar orações inteiras em substantivos para maior formalidade."
            gradiente="bg-gradient-to-br from-amber-600 to-orange-700"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={5}
              title="Verbo → Substantivo"
              variant="amber"
            />
            <p className="text-muted-foreground italic">
              "Precisamos que todos colaborem" → "Precisamos da colaboração de
              todos."
            </p>
          </section>
          <QuizInterativo
            questoes={QUIZ_M5_NOMINALIZACAO}
            titulo="Fixação - Módulo 5"
            icone="🎯"
            numero={5}
            variant="amber"
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 6: Conectivos */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={6}
            titulo="Conectivos Lógicos"
            descricao="Embora, Mas, Portanto, Caso... Trocas válidas vs. Erros de semântica."
            gradiente="bg-gradient-to-br from-orange-600 to-amber-700"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={6}
              title="Nexos e Coesão"
              variant="amber"
            />
            <AlertBox tipo="info" titulo="Banca em Foco">
              <p className="text-sm">
                A Cesgranrio AMA trocar 'Se' por 'Caso' e 'Embora' por 'Apesar
                de'.
              </p>
            </AlertBox>
          </section>
          <QuizInterativo
            questoes={QUIZ_M6_CONECTIVOS}
            titulo="Fixação - Módulo 6"
            icone="🎯"
            numero={6}
            variant="amber"
            onComplete={(score) => handleModuleComplete("modulo-6", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 7: Pontuação */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={7}
            titulo="Pontuação e Sentido"
            descricao="Vírgulas explicativas vs. restritivas. Como a pontuação altera o nexo."
            gradiente="bg-gradient-to-br from-rose-600 to-pink-700"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={7}
              title="Variações de Sentido"
              variant="rose"
            />
            <FlipCard
              frente="Os técnicos, que são proativos..."
              verso="Todos são proativos. (Explicativa com vírgula)"
            />
            <FlipCard
              frente="Os técnicos que são proativos..."
              verso="Somente os proativos. (Restritiva sem vírgula)"
            />
          </section>
          <QuizInterativo
            questoes={QUIZ_M7_PONTUACAO}
            titulo="Fixação - Módulo 7"
            icone="🎯"
            numero={7}
            variant="rose"
            onComplete={(score) => handleModuleComplete("modulo-7", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 8: Paráfrases */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={8}
            titulo="Paráfrases Complexas"
            descricao="Transformações em cascata: conectivos + tempos verbais + pronomes."
            gradiente="bg-gradient-to-br from-pink-600 to-rose-700"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={8}
              title="Desafios de Reescrita"
              variant="rose"
            />
            <p className="text-muted-foreground">
              Neste nível, a banca mistura nominalização com voz passiva.
            </p>
          </section>
          <QuizInterativo
            questoes={QUIZ_M8_PARAFRASES}
            titulo="Fixação - Módulo 8"
            icone="🎯"
            numero={8}
            variant="rose"
            onComplete={(score) => handleModuleComplete("modulo-8", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 9: Laboratório */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={9}
            titulo="Laboratório Cesgranrio"
            descricao="Análise das pegadinhas reais colhidas nas provas da Petrobras/BNDES."
            gradiente="bg-gradient-to-br from-blue-700 to-cyan-800"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={9}
              title="Padrões da Banca"
              variant="indigo"
            />
            <AlertBox tipo="danger" titulo="Não caia nessa!">
              <p className="text-sm">
                Cuidado com 'posto que' e 'visto que'. Não confunda causa com
                concessão!
              </p>
            </AlertBox>
          </section>
          <QuizInterativo
            questoes={QUIZ_M9_CESGRANRIO}
            titulo="Fixação - Módulo 9"
            icone="🎯"
            numero={9}
            variant="indigo"
            onComplete={(score) => handleModuleComplete("modulo-9", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 10: Final */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={10}
            titulo="Simulado Final"
            descricao="Teste seu domínio completo em 8 questões de nível Petrobras."
            gradiente="bg-gradient-to-br from-indigo-800 to-blue-900"
          />
          {showCompletionBadge ? (
            <div className="flex flex-col items-center gap-6 py-10">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center animate-bounce">
                <LuTrophy className="w-12 h-12 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black">Parabéns! Você é Pro!</h3>
              <p className="text-center text-muted-foreground max-w-sm">
                Você concluiu todos os módulos com excelência.
              </p>
            </div>
          ) : (
            <QuizInterativo
              questoes={QUIZ_FINAL_REESCRITA}
              titulo="Simulado de Conclusão"
              icone="🏆"
              numero={10}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-10", score)}
            />
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
