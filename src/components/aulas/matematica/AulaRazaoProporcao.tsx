"use client";

import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  AlertBox,
  QuizInterativo,
  ModuleBanner,
  getRandomQuestions,
  AulaProps,
  CardCarousel,
  ContentAccordion,
  LessonTabs,
  ModuleSummaryCarouselNew,
  AulaTemplate,
  ModuleSectionHeader,
} from "../shared";
import { LuBookOpen } from "react-icons/lu";
import {
  QUIZ_M1_RAZAO,
  QUIZ_M2_PROPORCAO,
  QUIZ_M3_REGRA3,
  QUIZ_M4_DIVISAO,
  QUIZ_M5_FINAL,
} from "./data/razao-proporcao-quizzes";

// Quizzes importados de ./data/razao-proporcao-quizzes.ts
// (34 questões premium estilo CESGRANRIO)

// ── COMPONENT ───────────────────────────────────────────────────────────

export default function AulaRazaoProporcao({
  onComplete,
  isCompleted,
  loading,
  xpGanho = 50,
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

  const [quizConceitos] = useState(() => getRandomQuestions(QUIZ_M1_RAZAO, 6));
  const [quizGrandezas] = useState(() =>
    getRandomQuestions(QUIZ_M2_PROPORCAO, 6),
  );
  const [quizRegra3S] = useState(() => getRandomQuestions(QUIZ_M3_REGRA3, 6));
  const [quizRegra3C] = useState(() => getRandomQuestions(QUIZ_M4_DIVISAO, 5));
  const [quizFinal] = useState(() => getRandomQuestions(QUIZ_M5_FINAL, 5));

  const isModuleUnlocked = (index: number) => {
    return true; // DESBLOQUEADO PARA REVISÃO DO USUÁRIO
  };

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) {
      setCompletedModules((prev) => {
        const n = new Set(prev);
        n.add(moduleId);
        return n;
      });
      const idx = [
        "modulo-1",
        "modulo-2",
        "modulo-3",
        "modulo-4",
        "modulo-5",
      ].findIndex((m) => m === moduleId);
      const pct = Math.round(((idx + 1) / 5) * 100);
      onUpdateProgress?.(pct);
      if (idx < 4) setTimeout(() => setActiveTab(`modulo-${idx + 2}`), 1500);
    }
  };

  useEffect(() => {
    if (currentProgress && currentProgress > 0) {
      const count = Math.floor((currentProgress / 100) * 5);
      const s = new Set<string>();
      for (let i = 1; i <= count; i++) s.add(`modulo-${i}`);
      setCompletedModules(s);
    }
  }, [currentProgress]);

  const MODULE_DEFS = [
    { id: "modulo-1", label: "Módulo 1", titulo: "Conceitos de Razão" },
    { id: "modulo-2", label: "Módulo 2", titulo: "Grandezas e Escalas" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Regra de Três Simples" },
    { id: "modulo-4", label: "Módulo 4", titulo: "Regra de Três Composta" },
    { id: "modulo-5", label: "Módulo 5", titulo: "Desafio Final" },
  ];

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={setActiveTab}
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
      currentProgress={currentProgress}
      onComplete={onComplete}
      loading={loading}
      xpGanho={xpGanho}
    >
      {/* ═══ MÓDULO 1: CONCEITOS ═══ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="Conceitos de Razão e Proporção"
          descricao="A base para entender escalas, misturas e produtividade operacional."
          gradiente="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="O que é Razão?"
              description="Simplificando comparações entre duas grandezas."
              variant="indigo"
              className="mb-6"
            />
            <ContentAccordion
              titulo="Definição e Aplicações"
              icone="⚖️"
              corIndicador="bg-indigo-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "O Conceito",
                  icone: "💡",
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Uma <strong>razão</strong> é a comparação entre dois
                        números através de uma divisão. Representamos como{" "}
                        <em>a/b</em> ou <em>a:b</em>.
                      </p>
                      <AlertBox tipo="info" titulo="Uso prático">
                        Na Petrobras, razões são usadas para densidade de
                        fluidos, escalas de plantas industriais e proporção de
                        componentes em misturas químicas.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section id="quiz-modulo-1" className="mt-16">
            <QuizInterativo
              questoes={quizConceitos}
              titulo="Quiz - Conceitos de Razão"
              icone="🧠"
              numero={1}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 2: GRANDEZAS ═══ */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <ModuleBanner
          numero={2}
          titulo="Grandezas e Proporcionalidade"
          descricao="Saiba quando uma variável ajuda ou atrapalha a outra."
          gradiente="bg-gradient-to-br from-cyan-600 via-teal-600 to-emerald-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Direta vs Inversa"
              variant="emerald"
              className="mb-6"
            />
            <CardCarousel
              cards={[
                {
                  titulo: "Diretamente Proporcional",
                  descricao: "Se uma dobra, a outra dobra. Ex: Área e Tinta.",
                  icone: "📈",
                },
                {
                  titulo: "Inversamente Proporcional",
                  descricao:
                    "Se uma dobra, a outra cai pela metade. Ex: Velocidade e Tempo.",
                  icone: "📉",
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-2" className="mt-16">
            <QuizInterativo
              questoes={quizGrandezas}
              titulo="Quiz - Grandezas e Escalas"
              icone="🧠"
              numero={2}
              variant="emerald"
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 3: REGRA DE 3 SIMPLES ═══ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <ModuleBanner
          numero={3}
          titulo="Regra de Três Simples"
          descricao="A ferramenta mais utilizada no dia a dia do técnico."
          gradiente="bg-gradient-to-br from-amber-600 via-orange-600 to-red-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="A Matemática do Dia a Dia"
              variant="amber"
              className="mb-6"
            />
            <AlertBox tipo="warning" titulo="Dica de Ouro">
              Antes de multiplicar cruzado, verifique SEMPRE se as grandezas são
              diretas ou inversas. Se forem inversas, você deve inverter uma das
              razões!
            </AlertBox>
          </section>
          <section id="quiz-modulo-3" className="mt-16">
            <QuizInterativo
              questoes={quizRegra3S}
              titulo="Quiz - Regra de Três Simples"
              icone="🧠"
              numero={3}
              variant="amber"
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 4: REGRA DE 3 COMPOSTA ═══ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner
          numero={4}
          titulo="Regra de Três Composta"
          descricao="Lidando com múltiplas variáveis simultaneamente."
          gradiente="bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Resumo Visual"
              variant="violet"
              className="mb-8"
            />
            <LessonTabs
              tabs={[
                {
                  id: "resumo",
                  label: "Tabela de Variáveis",
                  icon: LuBookOpen,
                  content: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          title: "Método das Flechas",
                          type: "Diagrama",
                          placeholderColor:
                            "bg-fuchsia-100 dark:bg-fuchsia-900/30",
                        },
                      ]}
                    />
                  ),
                },
              ]}
            />
          </section>
          <section id="quiz-modulo-4" className="mt-16">
            <QuizInterativo
              questoes={quizRegra3C}
              titulo="Quiz - Regra de Três Composta"
              icone="🔥"
              numero={4}
              variant="violet"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 5: DESAFIO FINAL ═══ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="Desafio Final: Produtividade e Cálculo"
          descricao="Problemas mistos de concursos anteriores."
          gradiente="bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700"
        />
        <div className="space-y-[50px]">
          <section id="quiz-modulo-5" className="mt-16">
            <QuizInterativo
              questoes={quizFinal}
              titulo="Desafio Final - Razão e Proporção"
              icone="🏆"
              numero={5}
              variant="rose"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
          {completedModules.has("modulo-5") && (
            <div className="mt-16 p-12 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2rem] text-white text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="relative z-10 space-y-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-5xl mx-auto backdrop-blur-sm border border-white/30 animate-bounce">
                  🎓
                </div>
                <h3 className="text-4xl font-black italic tracking-tighter">
                  CERTIFICADO DE CONCLUSAO
                </h3>
                <p className="text-xl opacity-90 max-w-xl mx-auto">
                  Você dominou Razão e Proporção! Este é um dos temas mais
                  recorrentes na prova da Petrobras.
                </p>
              </div>
            </div>
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
