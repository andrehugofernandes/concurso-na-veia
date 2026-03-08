"use client";

import { useState, useEffect, useCallback } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  AlertBox,
  ContentAccordion,
  ModuleBanner,
  QuizInterativo,
  FlipCard,
  AulaProps,
  ModuleSectionHeader,
  AulaTemplate,
  getRandomQuestions,
  CardCarousel,
  Comparison,
} from "../shared";

import {
  LuBookOpen,
  LuTarget,
  LuTriangleAlert,
  LuBrain,
  LuCheck,
  LuZap,
  LuScale,
  LuLightbulb,
  LuActivity,
  LuLink,
  LuRepeat,
  LuMic,
  LuMessagesSquare,
  LuLibrary,
  LuShieldAlert,
} from "react-icons/lu";

// Data
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

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "A Arte da Paráfrase" },
  { id: "modulo-2", label: "Módulo 2", title: "Sinonímia e Campo Semântico" },
  { id: "modulo-3", label: "Módulo 3", title: "Vozes Verbais" },
  { id: "modulo-4", label: "Módulo 4", title: "O Discurso sob Controle" },
  {
    id: "modulo-5",
    label: "Módulo 5",
    title: "Troca de Classes (Nominalização)",
  },
  { id: "modulo-6", label: "Módulo 6", title: "Equivalência Conjutiva" },
  { id: "modulo-7", label: "Módulo 7", title: "O Duelo Concessivo" },
  { id: "modulo-8", label: "Módulo 8", title: "Pontuação e Sentido" },
  { id: "modulo-9", label: "Módulo 9", title: "Laboratório CESGRANRIO" },
  { id: "modulo-10", label: "Módulo 10", title: "Arena de Elite" },
];

export default function AulaReescritaFrases({
  onComplete,
  isCompleted: isLessonCompleted,
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
  const [hasSyncedInitial, setHasSyncedInitial] = useState(false);

  // Quizzes dinâmicos (seleção aleatória do pool)
  const [quizM1, setQuizM1] = useState(QUIZ_M1_REESCRITA);
  const [quizM2, setQuizM2] = useState(QUIZ_M2_TECNICAS);
  const [quizM3, setQuizM3] = useState(QUIZ_M3_VOZES);
  const [quizM4, setQuizM4] = useState(QUIZ_M4_DISCURSO);
  const [quizM5, setQuizM5] = useState(QUIZ_M5_NOMINALIZACAO);
  const [quizM6, setQuizM6] = useState(QUIZ_M6_CONECTIVOS);
  const [quizM7, setQuizM7] = useState(QUIZ_M7_PONTUACAO);
  const [quizM8, setQuizM8] = useState(QUIZ_M8_PARAFRASES);
  const [quizM9, setQuizM9] = useState(QUIZ_M9_CESGRANRIO);
  const [quizM10, setQuizM10] = useState(QUIZ_FINAL_REESCRITA);

  useEffect(() => {
    setQuizM1(getRandomQuestions(QUIZ_M1_REESCRITA, 4));
    setQuizM2(getRandomQuestions(QUIZ_M2_TECNICAS, 4));
    setQuizM3(getRandomQuestions(QUIZ_M3_VOZES, 4));
    setQuizM4(getRandomQuestions(QUIZ_M4_DISCURSO, 4));
    setQuizM5(getRandomQuestions(QUIZ_M5_NOMINALIZACAO, 4));
    setQuizM6(getRandomQuestions(QUIZ_M6_CONECTIVOS, 4));
    setQuizM7(getRandomQuestions(QUIZ_M7_PONTUACAO, 4));
    setQuizM8(getRandomQuestions(QUIZ_M8_PARAFRASES, 4));
    setQuizM9(getRandomQuestions(QUIZ_M9_CESGRANRIO, 4));
    setQuizM10(getRandomQuestions(QUIZ_FINAL_REESCRITA, 5));
  }, []);

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
      const newSet = new Set(completedModules).add(moduleId);
      setCompletedModules(newSet);

      const total = MODULE_DEFS.length;
      const done = newSet.size;
      const percent = Math.round((done / total) * 100);

      if (onUpdateProgress) {
        onUpdateProgress(percent);
      }

      const index = MODULE_DEFS.findIndex((m) => m.id === moduleId);
      if (index < MODULE_DEFS.length - 1) {
        setTimeout(() => setActiveTab(MODULE_DEFS[index + 1].id), 1500);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        onComplete?.();
      }
    }
  };

  const isModuleUnlocked = useCallback(
    (index: number) => {
      if (index === 0) return true;
      return (
        completedModules.has(MODULE_DEFS[index - 1].id) || isLessonCompleted
      );
    },
    [completedModules, isLessonCompleted],
  );

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
      isCompleted={isLessonCompleted}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
      currentProgress={Math.round(
        (completedModules.size / MODULE_DEFS.length) * 100,
      )}
      onComplete={onComplete}
      loading={loading}
      xpGanho={xpGanho}
    >
      {/* ── MÓDULO 1: A ARTE DA PARÁFRASE ───────────────────────── */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="A Arte da Paráfrase"
          descricao="Entenda o binômio da reescrita perfeita: Sentido Intacto e Norma Culta Plena."
          gradiente="bg-gradient-to-br from-blue-700 to-sky-800"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="O Conceito de Reescritura"
              variant="blue"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Reescrever um texto é transpor sua mensagem para uma
                        nova estrutura sintática sem alterar o{" "}
                        <strong>conteúdo semântico</strong>. Para a CESGRANRIO,
                        não basta estar gramaticalmente correto; a mensagem deve
                        ser 100% fiel ao original.
                      </p>
                      <AlertBox tipo="info" titulo="O Equilíbrio">
                        Se a frase original expressa uma <strong>dúvida</strong>{" "}
                        (ex: "Talvez chova"), a reescrita não pode expressar{" "}
                        <strong>certeza</strong> (ex: "Certamente choverá").
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
                        Veja um caso de relatórios industriais:
                      </p>
                      <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl italic">
                        "O reparo do duto garantiu a operação." (Original){" "}
                        <br />
                        "A operação foi garantida pelo reparo do duto."
                        (Reescrita correta)
                      </div>
                    </div>
                  ),
                },
              ]}
            />
            <AlertBox tipo="danger" titulo="Erro de Extrapolação">
              Não adicione detalhes que não estão no texto. Se o autor diz que o
              lucro subiu, você não pode reescrever dizendo que ele subiu
              "devido à boa gestão" se o texto não afirmou isso.
            </AlertBox>
          </section>

          <QuizInterativo
            questoes={quizM1}
            titulo="Fixação - Módulo 1"
            icone="🎯"
            numero={1}
            variant="blue"
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 2: SINONÍMIA E CAMPO SEMÂNTICO ──────────────── */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <ModuleBanner
          numero={2}
          titulo="Sinonímia e Campo Semântico"
          descricao="Troque palavras mantendo a precisão técnica necessária para a indústria de energia."
          gradiente="bg-gradient-to-br from-cyan-700 to-teal-800"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="A Precisão das Palavras"
              variant="cyan"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Campo Semântico",
                  icone: <LuLibrary />,
                  conteudo: (
                    <p className="text-muted-foreground">
                      Um sinônimo absoluto raramente existe. O contexto define
                      se "Operar" pode ser trocado por "Trabalhar" ou
                      "Executar". Em reescrita, buscamos a{" "}
                      <strong>equivalência contextual</strong>.
                    </p>
                  ),
                },
                {
                  titulo: "Parônimos Perigosos",
                  icone: <LuTriangleAlert />,
                  conteudo: (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FlipCard
                        frente="Ratificar"
                        verso="Confirmar, validar. (O gerente RATIFICOU a decisão)."
                      />
                      <FlipCard
                        frente="Retificar"
                        verso="Corrigir, consertar. (O técnico RETIFICOU o erro)."
                      />
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM2}
            titulo="Fixação - Módulo 2"
            icone="🎯"
            numero={2}
            variant="cyan"
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 3: VOZES VERBAIS ──────────────────────────── */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <ModuleBanner
          numero={3}
          titulo="Vozes Verbais"
          descricao="A travessia entre Ativa e Passiva é o tema predileto da banca. Aprenda a não perder o tempo."
          gradiente="bg-gradient-to-br from-emerald-600 to-teal-700"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="A Travessia (Vozes)"
              variant="emerald"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "A Regra do Tempo",
                  icone: <LuZap />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        O tempo verbal <strong>nunca</strong> muda na
                        transposição de voz.
                      </p>
                      <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                        <p className="text-sm">
                          Se o verbo na ativa está no{" "}
                          <strong>Pretérito Imperfeito</strong> ("fazia"), o
                          verbo <i>ser</i> na passiva deve ir para o{" "}
                          <strong>Pretérito Imperfeito</strong> ("era feito").
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <Comparison
              title="Voz Ativa vs. Passiva"
              left={{
                title: "Voz Ativa",
                content: "O navio transportava o óleo.",
                description: "Foco no agente (Navio). Tempo: Pret. Imperfeito.",
                variant: "info",
              }}
              right={{
                title: "Voz Passiva",
                content: "O óleo era transportado pelo navio.",
                description: "Foco no objeto. Verbo SER no Pret. Imperfeito.",
                variant: "success",
              }}
            />
          </section>

          <QuizInterativo
            questoes={quizM3}
            titulo="Fixação - Módulo 3"
            icone="🎯"
            numero={3}
            variant="emerald"
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 4: O DISCURSO SOB CONTROLE ─────────────────── */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner
          numero={4}
          titulo="O Discurso sob Controle"
          descricao="Direto para Indireto: ajuste pronomes, tempos e advérbios sem titubear."
          gradiente="bg-gradient-to-br from-teal-600 to-emerald-800"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={4}
              title="Direto & Indireto"
              variant="emerald"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "A Transposição",
                  icone: <LuMessagesSquare />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Ao passar do discurso direto (fala real) para o indireto
                        (relato), os tempos verbais "recuam" no tempo.
                      </p>
                      <ul className="list-disc pl-5 text-sm space-y-2">
                        <li>
                          <strong>Presente</strong> vira{" "}
                          <strong>Pretérito Imperfeito</strong>.
                        </li>
                        <li>
                          <strong>Pretérito Perfeito</strong> vira{" "}
                          <strong>Pretérito Mais-que-Perfeito</strong>.
                        </li>
                        <li>
                          <strong>Amanhã</strong> vira{" "}
                          <strong>No dia seguinte</strong>.
                        </li>
                      </ul>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM4}
            titulo="Fixação - Módulo 4"
            icone="🎯"
            numero={4}
            variant="emerald"
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 5: NOMINALIZAÇÃO ──────────────────────────── */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="Nominalização"
          descricao="Transforme verbos em substantivos para dar densidade técnica e profissional ao seu texto."
          gradiente="bg-gradient-to-br from-amber-600 to-orange-700"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={5}
              title="Verbo para Substantivo"
              variant="amber"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Processo",
                  icone: <LuActivity />,
                  conteudo: (
                    <p className="text-muted-foreground">
                      A nominalização permite que você trate uma ação como um
                      "objeto" fixo. Ex: "O poço produziu mil barris" {"→"} "A
                      produção do poço atingiu mil barris."
                    </p>
                  ),
                },
              ]}
            />
            <CardCarousel
              cards={[
                {
                  icone: "✏️",
                  title: "Aperfeiçoar",
                  descricao: "O aperfeiçoamento constante é vital.",
                },
                {
                  icone: "🔌",
                  title: "Conectar",
                  descricao: "A conexão dos cabos deve ser precisa.",
                },
                {
                  icone: "🚢",
                  title: "Atracar",
                  descricao: "A atracação do navio demorou.",
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM5}
            titulo="Fixação - Módulo 5"
            icone="🎯"
            numero={5}
            variant="amber"
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 6: EQUIVALÊNCIA CONJUNUTIVA ────────────────── */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <ModuleBanner
          numero={6}
          titulo="Equivalência Conjutiva"
          descricao="Domine os conectivos causais, temporais e condicionais. A alma da reescrita sequencial."
          gradiente="bg-gradient-to-br from-orange-600 to-amber-700"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={6}
              title="Nexos Equivalentes"
              variant="amber"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Condicionais",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="p-4 bg-muted/50 rounded-xl">
                      <p className="font-bold">
                        SE = CASO = DESDE QUE = CONTANTO QUE
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Nota: 'Desde que' pode ser temporal ou condicional.
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM6}
            titulo="Fixação - Módulo 6"
            icone="🎯"
            numero={6}
            variant="amber"
            onComplete={(score) => handleModuleComplete("modulo-6", score)}
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 7: O DUELO CONCESSIVO ──────────────────────── */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <ModuleBanner
          numero={7}
          titulo="O Duelo Concessivo"
          descricao="Embora vs Mas. A troca mais perigosa e frequente da banca Cesgranrio."
          gradiente="bg-gradient-to-br from-red-600 to-rose-800"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={7}
              title="Embora x Mas"
              variant="rose"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "A Mudança de Modo",
                  icone: <LuScale />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Ao trocar um conectivo adversativo (Mas) por um
                        concessivo (Embora), você muda a força da frase.
                        Enquanto o "Mas" destaca a segunda ideia, o "Embora"
                        preserva a força da oração principal.
                      </p>
                      <AlertBox tipo="danger" titulo="Vigilância Verbal">
                        "Mas produziu" (Indicativo) {"→"} "Embora produzisse"
                        (Subjuntivo). Fique atento aos verbos!
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={getRandomQuestions(QUIZ_M8_PARAFRASES, 4)}
            titulo="Fixação - Módulo 7"
            icone="🎯"
            numero={7}
            variant="rose"
            onComplete={(score) => handleModuleComplete("modulo-7", score)}
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 8: PONTUAÇÃO E SENTIDO ─────────────────────── */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <ModuleBanner
          numero={8}
          titulo="Pontuação e Sentido"
          descricao="A vírgula não é apenas uma pausa; ela é o interruptor do sentido explicativo/restritivo."
          gradiente="bg-gradient-to-br from-rose-700 to-red-900"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={8}
              title="O Poder da Vírgula"
              variant="rose"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "A Regra das Adjetivas",
                  icone: <LuCheck />,
                  conteudo: (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-muted/50 rounded-xl border border-border">
                        <p className="text-xs font-bold mb-1">
                          COM Vírgula (Explicativa)
                        </p>
                        <p className="text-sm">
                          Os homens, que são racionais, lutam. (Todos os homens)
                        </p>
                      </div>
                      <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                        <p className="text-xs font-bold mb-1 text-primary">
                          SEM Vírgula (Restritiva)
                        </p>
                        <p className="text-sm">
                          Os homens que são racionais lutam. (Somente os
                          racionais)
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM7}
            titulo="Fixação - Módulo 8"
            icone="🎯"
            numero={8}
            variant="rose"
            onComplete={(score) => handleModuleComplete("modulo-8", score)}
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 9: LABORATÓRIO CESGRANRIO ───────────────────── */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <ModuleBanner
          numero={9}
          titulo="Laboratório CESGRANRIO"
          descricao="Analise as 5 trocas que a banca mais ama e que derrubam 90% dos candidatos."
          gradiente="bg-gradient-to-br from-blue-700 to-cyan-800"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={9}
              title="Padrões de Elite"
              variant="blue"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "A Pegadinha do 'Onde'",
                  icone: <LuTriangleAlert />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        "Onde" só serve para lugares físicos. Para todo o resto,
                        use "Em que" ou "No qual".
                      </p>
                      <div className="p-3 bg-red-500/5 rounded-xl border border-red-500/20 text-xs">
                        ❌ "Na reunião ONDE decidimos..." <br />✅ "Na reunião
                        EM QUE decidimos..."
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Posto Que vs Contanto Que",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-muted rounded-lg text-center">
                        <p className="font-bold text-xs">Posto Que</p>
                        <p className="text-[10px]">Concessão (Embora)</p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg text-center">
                        <p className="font-bold text-xs">Contanto Que</p>
                        <p className="text-[10px]">Condição (Caso)</p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM9}
            titulo="Fixação - Módulo 9"
            icone="🎯"
            numero={9}
            variant="blue"
            onComplete={(score) => handleModuleComplete("modulo-9", score)}
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 10: ARENA DE ELITE ─────────────────────────── */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <ModuleBanner
          numero={10}
          titulo="Arena de Elite"
          descricao="Simulado Final: 10 questões de reescrita global. O teste definitivo de sua semântica."
          gradiente="bg-gradient-to-br from-slate-800 to-slate-950"
        />

        <div className="space-y-[50px]">
          <AlertBox tipo="info" titulo="Recapitulação Final">
            A reescrita bem-sucedida é aquela em que você leria a frase nova num
            jornal e ela passaria a mesma informação da antiga, sem erros de
            crase ou concordância.
          </AlertBox>

          <QuizInterativo
            questoes={quizM10}
            titulo="Simulado de Conclusão"
            icone="🏆"
            numero={10}
            variant="indigo"
            onComplete={(score) => handleModuleComplete("modulo-10", score)}
          />
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
