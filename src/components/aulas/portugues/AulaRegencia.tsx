"use client";

import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  FlipCard,
  ContentAccordion,
  CardCarousel,
  QuizInterativo,
  ModuleBanner,
  AlertBox,
  AulaProps,
  AulaTemplate,
  getRandomQuestions,
  ModuleSectionHeader,
  ModuleSummaryCarouselNew,
} from "../shared";

import {
  LuBookOpen,
  LuTarget,
  LuTrophy,
  LuLightbulb,
  LuBrain,
  LuCheckCircle,
  LuArrowRight,
  LuXCircle,
} from "react-icons/lu";

import {
  QUIZ_M1_REGENCIA,
  QUIZ_M2_REGENCIA,
  QUIZ_M3_REGENCIA,
  QUIZ_M4_REGENCIA,
  QUIZ_FINAL_REGENCIA,
} from "./data/regencia-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Regência Nominal" },
  { id: "modulo-2", label: "Módulo 2", title: "Regência Verbal I" },
  { id: "modulo-3", label: "Módulo 3", title: "Regência Verbal II" },
  { id: "modulo-4", label: "Módulo 4", title: "Regência e Relativos" },
  { id: "modulo-5", label: "Módulo 5", title: "Laboratório de Elite" },
] as const;

export default function AulaRegencia({
  titulo,
  descricao,
  duracao,
  materiaNome,
  materiaCor,
  materiaId,
  prevTopico,
  nextTopico,
  onComplete,
  isCompleted,
  loading,
  xpGanho = 50,
  currentProgress,
  onUpdateProgress,
}: AulaProps) {
  const [quizM1, setQuizM1] = useState<typeof QUIZ_M1_REGENCIA>([]);
  const [quizM2, setQuizM2] = useState<typeof QUIZ_M2_REGENCIA>([]);
  const [quizM3, setQuizM3] = useState<typeof QUIZ_M3_REGENCIA>([]);
  const [quizM4, setQuizM4] = useState<typeof QUIZ_M4_REGENCIA>([]);
  const [quizFinal, setQuizFinal] = useState<typeof QUIZ_FINAL_REGENCIA>([]);
  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(),
  );

  const [hasSyncedInitial, setHasSyncedInitial] = useState(false);
  const [showCompletionBadge, setShowCompletionBadge] = useState(false);

  useEffect(() => {
    if (isCompleted) setShowCompletionBadge(true);
  }, [isCompleted]);

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

  useEffect(() => {
    if (!loading) {
      setQuizM1(getRandomQuestions(QUIZ_M1_REGENCIA, 4));
      setQuizM2(getRandomQuestions(QUIZ_M2_REGENCIA, 4));
      setQuizM3(getRandomQuestions(QUIZ_M3_REGENCIA, 4));
      setQuizM4(getRandomQuestions(QUIZ_M4_REGENCIA, 4));
      setQuizFinal(getRandomQuestions(QUIZ_FINAL_REGENCIA, 10));
    }
  }, [loading]);

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

      if (index === MODULE_DEFS.length - 1) {
        setShowCompletionBadge(true);
        onComplete?.();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setTimeout(() => setActiveTab(MODULE_DEFS[index + 1].id), 1500);
      }
    }
  };

  const isModuleUnlocked = (index: number) => {
    if (isCompleted || index === 0) return true;
    return completedModules.has(MODULE_DEFS[index - 1].id);
  };

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={(val) => {
        const idx = MODULE_DEFS.findIndex((m) => m.id === val);
        if (isModuleUnlocked(idx)) setActiveTab(val);
      }}
      modules={Array.from(MODULE_DEFS)}
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
      {/* === MÓDULO 1 === */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={1}
            titulo="Sintaxe da Regência Nominal"
            descricao="Estudo sistemático das relações de subordinação entre nomes e complementos"
            gradiente="bg-gradient-to-br from-blue-700 to-sky-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Fundamentos da Sintaxe de Regência"
              variant="blue"
            />

            <p className="text-muted-foreground leading-relaxed text-lg">
              A regência estuda as relações em que certas palavras exigem a
              presença de outras para completar sua significação. Esse elo de
              subordinação garante a coesão gramatical.
            </p>

            <ContentAccordion
              slides={[
                {
                  titulo: "A Mecânica do Ímã Nominal",
                  icone:<LuBookOpen />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Na Regência Nominal, o nome (substantivo, adjetivo ou
                        advérbio) <strong>sempre</strong> exige uma preposição
                        para se conectar ao seu complemento. Pense num ímã que
                        só gruda através de uma cola específica (a preposição).
                      </p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <li className="bg-muted/30 p-4 rounded-xl border border-border">
                          <strong className="text-blue-500 block mb-1">
                            Favorável a
                          </strong>
                          "Sou favorável <strong>às</strong> mudanças."
                        </li>
                        <li className="bg-muted/30 p-4 rounded-xl border border-border">
                          <strong className="text-blue-500 block mb-1">
                            Apto a/para
                          </strong>
                          "Ele está apto <strong>ao</strong> serviço."
                        </li>
                        <li className="bg-muted/30 p-4 rounded-xl border border-border">
                          <strong className="text-blue-500 block mb-1">
                            Referente a
                          </strong>
                          "Dados referentes <strong>ao</strong> lucro."
                        </li>
                        <li className="bg-muted/30 p-4 rounded-xl border border-border">
                          <strong className="text-blue-500 block mb-1">
                            Passível de
                          </strong>
                          "O erro é passível <strong>de</strong> multa."
                        </li>
                      </ul>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM1}
            titulo="Fixação - Módulo 1"
            numero={1}
            variant="blue"
            icone="🧠"
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          />
        </div>
      </TabsContent>

      {/* === MÓDULO 2 === */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={2}
            titulo="Sintaxe da Regência Verbal I"
            descricao="Análise da transitividade verbal dos grandes clássicos da Cesgranrio."
            gradiente="bg-gradient-to-br from-emerald-600 to-teal-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Transitividade e Argumentos"
              variant="emerald"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "A Dinâmica do Verbo Assistir",
                  icone:<LuTarget />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        O verbo Assistir muda de significado radicalmente
                        mudando (ou não) sua preposição.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                          <h4 className="font-bold text-emerald-600">
                            Sem Preposição (VTD)
                          </h4>
                          <p className="text-sm mt-1">
                            Significa: Ajudar / Socorrer
                          </p>
                          <p className="text-sm italic font-medium mt-2">
                            "O médico assistiu o doente."
                          </p>
                        </div>
                        <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                          <h4 className="font-bold text-emerald-600">
                            Com Preposição A (VTI)
                          </h4>
                          <p className="text-sm mt-1">
                            Significa: Ver / Presenciar
                          </p>
                          <p className="text-sm italic font-medium mt-2">
                            "O público assistiu ao jogo."
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "O Verbo Visar",
                  icone:<LuBrain />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Visar também possui as duas polaridades:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="bg-muted p-4 rounded-xl border border-border">
                          <h4 className="font-bold">Sem Preposição (VTD)</h4>
                          <p className="text-sm mt-1">
                            Significa: Dar visto ou Mirar
                          </p>
                          <p className="text-sm italic font-medium mt-2">
                            "Ele visou o passaporte."
                          </p>
                        </div>
                        <div className="bg-muted p-4 rounded-xl border border-border">
                          <h4 className="font-bold">Com Preposição A (VTI)</h4>
                          <p className="text-sm mt-1">
                            Significa: Objetivar / Pretender
                          </p>
                          <p className="text-sm italic font-medium mt-2">
                            "O acordo visava ao lucro."
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM2}
            titulo="Fixação - Módulo 2"
            numero={2}
            variant="emerald"
            icone="🎯"
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          />
        </div>
      </TabsContent>

      {/* === MÓDULO 3 === */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={3}
            titulo="Regência Verbal II"
            descricao="Verbos problemáticos: Preferir, Esquecer, Lembrar e Pagar."
            gradiente="bg-gradient-to-br from-amber-600 to-orange-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Lógica dos Reflexivos"
              variant="amber"
            />
            <CardCarousel
              cards={[
                {
                  icone: "🧠",
                  title: "Esquecer e Lembrar",
                  descricao:
                    "Se NÃO tiver pronome, NÃO tem preposição (Esqueci a chave). Se TIVER pronome (me, te, se), TÊM preposição (Esqueci-me da chave).",
                },
                {
                  icone: "💸",
                  title: "Pagar e Perdoar",
                  descricao:
                    "Paga-se algo (coisa - VTD) a alguém (pessoa - VTI). Ex: Pagou a dívida ao banco.",
                },
                {
                  icone: "⚖️",
                  title: "Preferir",
                  descricao:
                    "Prefere-se uma coisa A outra. Nunca 'do que'. Nunca 'mais'. Ex: Prefiro estudar a dormir.",
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM3}
            titulo="Fixação - Módulo 3"
            numero={3}
            variant="amber"
            icone="🎯"
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </div>
      </TabsContent>

      {/* === MÓDULO 4 === */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={4}
            titulo="Regência e Pronome Relativo"
            descricao="A união de duas matérias: quando o pronome relativo atrai a preposição exigida pelo verbo."
            gradiente="bg-gradient-to-br from-red-600 to-red-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="O Quebra-Cabeça da Preposição Frontal"
              variant="rose"
            />
            <AlertBox tipo="danger" titulo="A Banca Adora!">
              <p className="text-sm">
                Quando um verbo que exige preposição está numa oração
                introduzida por pronome relativo (que, qual, quem, cujo),{" "}
                <strong>a preposição precisa ir para antes do pronome</strong>.
              </p>
            </AlertBox>

            <div className="bg-muted/30 p-6 rounded-2xl border border-border font-medium space-y-4">
              <p className="flex justify-between items-center bg-card p-3 rounded-xl shadow-sm border border-border">
                <span className="text-red-500">ERRADO:</span>
                <span>O cargo que eu aspiro é alto.</span>
              </p>
              <p className="text-sm text-center text-muted-foreground w-full py-2">
                <LuArrowRight className="inline mx-2 rotate-90 md:rotate-0" />{" "}
                (Aspirar exige A){" "}
                <LuArrowRight className="inline mx-2 rotate-90 md:rotate-0" />
              </p>
              <p className="flex justify-between items-center bg-card p-3 rounded-xl shadow-sm border border-border">
                <span className="text-green-500">CORRETO:</span>
                <span>
                  O cargo <strong>a que</strong> eu aspiro é alto.
                </span>
              </p>
            </div>
          </section>

          <QuizInterativo
            questoes={quizM4}
            titulo="Fixação - Módulo 4"
            numero={4}
            variant="rose"
            icone="🎯"
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
          />
        </div>
      </TabsContent>

      {/* === MÓDULO 5 === */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={5}
            titulo="Laboratório de Elite"
            descricao="O Simulado Cesgranrio de Regência. O rigor supremo."
            gradiente="bg-gradient-to-br from-slate-800 to-slate-900"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={5}
              title="A Sintaxe Mestre"
              variant="slate"
            />
            <ModuleSummaryCarouselNew
              tituloAula="Regência"
              materia="Língua Portuguesa"
              profissao="Técnico de Operação"
              moduloNome="Premium"
              images={[
                {
                  title: "Verbos Perigosos (Cesgranrio)",
                  type: "Mapa Mental",
                  placeholderColor: "bg-slate-500",
                  imageUrl:
                    "/images/mapa-mental/coesao_referencial_1771465579878.png",
                },
              ]}
            />
          </section>

          {showCompletionBadge ? (
            <div className="flex flex-col items-center gap-6 py-10">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center animate-bounce">
                <LuTrophy className="w-12 h-12 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black">Regência Dominada!</h3>
              <p className="text-center text-muted-foreground max-w-sm">
                Agora você está blindado contra as piores "pegadinhas" de
                regência da banca. Suas conexões entre nome/verbo e complemento
                estão perfeitamente forjadas.
              </p>
            </div>
          ) : (
            <QuizInterativo
              questoes={quizFinal}
              titulo="Simulado Elite"
              numero={5}
              variant="slate"
              icone="🏆"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}












