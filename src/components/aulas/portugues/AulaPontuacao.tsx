"use client";

import { useState, useCallback, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  LuCheck,
  LuCirclePlay as LuPlayCircle,
  LuBrain,
  LuMusic,
  LuZap,
  LuBookOpen,
  LuShield,
  LuMessageCircle,
  LuTriangleAlert,
  LuArrowRight,
  LuEye,
  LuFileText,
  LuTarget,
  LuLightbulb,
  LuTrophy,
  LuCircleCheck,
  LuCircleX,
  LuLayers,
} from "react-icons/lu";
import {
  QuizQuestion,
  getRandomQuestions,
  AlertBox,
  FlipCard,
  QuizInterativo,
  TimelineItem,
  ModuleBanner,
  CardCarousel,
  StickyModuleNav,
  ModuleSectionHeader,
  ContentAccordion,
  LessonTabs,
  ModuleSummaryCarouselNew,
  MusicPlayerCard,
  ProgressIndicator,
  AulaProps,
  VideoModal,
  AulaTemplate,
  Comparison,
} from "../shared";

import {
  QUIZ_M1_PONTUACAO,
  QUIZ_M2_PONTUACAO,
  QUIZ_M3_PONTUACAO,
  QUIZ_M4_PONTUACAO,
  QUIZ_M5_PONTUACAO,
  QUIZ_M6_PONTUACAO,
  QUIZ_M7_PONTUACAO,
  QUIZ_M8_PONTUACAO,
  QUIZ_M9_PONTUACAO,
  QUIZ_FINAL_PONTUACAO,
} from "./data/pontuacao-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Visão Geral e Funções" },
  { id: "modulo-2", label: "Módulo 2", title: "Vírgula: Proibições Fatais" },
  { id: "modulo-3", label: "Módulo 3", title: "Vírgula: Termos Essenciais" },
  { id: "modulo-4", label: "Módulo 4", title: "Vírgula: Aposto e Vocativo" },
  { id: "modulo-5", label: "Módulo 5", title: "Vírgula: Adjuntos Deslocados" },
  { id: "modulo-6", label: "Módulo 6", title: "Vírgula: Orações Coordenadas" },
  { id: "modulo-7", label: "Módulo 7", title: "Vírgula: Orações Subordinadas" },
  { id: "modulo-8", label: "Módulo 8", title: "Ponto e Ponto e Vírgula" },
  { id: "modulo-9", label: "Módulo 9", title: "Sinais Complementares" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Final" },
] as const;

export default function AulaPontuacao({
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
  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(),
  );
  const [hasSyncedInitial, setHasSyncedInitial] = useState(false);
  const [showCompletionBadge, setShowCompletionBadge] = useState(false);

  const totalModulos = MODULE_DEFS.length;

  useEffect(() => {
    if (
      currentProgress &&
      currentProgress > 0 &&
      !hasSyncedInitial &&
      !loading
    ) {
      const count = Math.floor((currentProgress / 100) * totalModulos);
      const s = new Set<string>();
      for (let i = 0; i < count; i++) {
        s.add(MODULE_DEFS[i].id);
      }
      setCompletedModules(s);
      if (count < totalModulos) {
        setActiveTab(MODULE_DEFS[count].id);
      } else {
        setActiveTab(MODULE_DEFS[totalModulos - 1].id);
      }
      setHasSyncedInitial(true);
    }
  }, [currentProgress, hasSyncedInitial, loading, totalModulos]);

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) {
      setCompletedModules((prev) => {
        const n = new Set(prev);
        n.add(moduleId);
        return n;
      });

      const idx = MODULE_DEFS.findIndex((m) => m.id === moduleId);
      onUpdateProgress?.(Math.round(((idx + 1) / totalModulos) * 100));

      if (idx < totalModulos - 1) {
        setTimeout(() => setActiveTab(MODULE_DEFS[idx + 1].id), 1500);
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
      currentProgress={Math.round((completedModules.size / totalModulos) * 100)}
      onComplete={onComplete}
      loading={loading}
      xpGanho={xpGanho}
    >
      {/* Módulo 1: Visão Geral */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={1}
            titulo="Visão Geral e Funções"
            descricao="Pontuar não é apenas pausar para respirar; é garantir a clareza e a coesão do texto técnico."
            gradiente="bg-gradient-to-br from-blue-700 to-indigo-900"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="As Finalidades da Pontuação"
              variant="blue"
            />
            <CardCarousel
              cards={[
                {
                  icone: "🔍",
                  title: "Clareza",
                  descricao:
                    "Garantir que o leitor entenda exatamente onde termina uma ideia e começa outra.",
                },
                {
                  icone: "🤝",
                  title: "Coesão",
                  descricao:
                    "Sinalizar os limites das estruturas sintáticas e seus nexos lógicos.",
                },
                {
                  icone: "🎭",
                  title: "Sentido",
                  descricao:
                    "Alterar a ênfase e o significado conforme o posicionamento dos sinais.",
                },
              ]}
            />
          </section>
          <QuizInterativo
            questoes={QUIZ_M1_PONTUACAO}
            titulo="Fixação - Módulo 1"
            icone="🎯"
            numero={1}
            variant="blue"
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 2: Proibições Fatais */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={2}
            titulo="Vírgula: Proibições Fatais"
            descricao="O que NUNCA fazer se você quiser ser aprovado. Erros que zeram questões de gramática."
            gradiente="bg-gradient-to-br from-red-700 to-orange-800"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Scanner de Erros Fatais"
              variant="rose"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AlertBox tipo="danger" titulo="Não Separe o Sujeito">
                Nunca coloque vírgula isolando o sujeito de seu verbo.
                <br /> ❌ "A Petrobras, produz gás."
              </AlertBox>
              <AlertBox tipo="danger" titulo="Não Separe o Objeto">
                Nunca coloque vírgula isolando o verbo de seus objetos (Direto
                ou Indireto).
                <br /> ❌ "Compramos, os equipamentos."
              </AlertBox>
            </div>
            <Comparison
              title="A Regra de Ouro"
              left={{
                title: "Pecado Capital (❌)",
                content: "O gerente de planta, autorizou o embarque.",
                description: "Vírgula separando sujeito do verbo.",
                variant: "danger",
              }}
              right={{
                title: "Norma Culta (✅)",
                content: "O gerente de planta autorizou o embarque.",
                description: "Sujeito e verbo unidos sem interrupção.",
                variant: "success",
              }}
            />
          </section>
          <QuizInterativo
            questoes={QUIZ_M2_PONTUACAO}
            titulo="Fixação - Módulo 2"
            icone="🎯"
            numero={2}
            variant="rose"
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 3: Termos Essenciais */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={3}
            titulo="Vírgula: Termos Essenciais"
            descricao="Enumerações, repetições e a organização básica da frase."
            gradiente="bg-gradient-to-br from-blue-600 to-cyan-800"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Listas e Repetições"
              variant="blue"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Enumeração",
                  icone: <LuLayers />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Usada para separar elementos de mesma função sintática
                        sem conjunção entre eles.
                      </p>
                      <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl italic">
                        "O setor adquiriu brocas, compressores, bombas e
                        geradores."
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Omissão de Verbo (Zêugma)",
                  icone: <LuZap />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        A vírgula substitui um verbo já mencionado
                        anteriormente.
                      </p>
                      <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl italic">
                        "João prefere o mar; Pedro, a terra."
                        <br />{" "}
                        <span className="text-xs opacity-60">
                          (A vírgula substitui "prefere")
                        </span>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <QuizInterativo
            questoes={QUIZ_M3_PONTUACAO}
            titulo="Fixação - Módulo 3"
            icone="🎯"
            numero={3}
            variant="blue"
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 4: Aposto e Vocativo */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={4}
            titulo="Vírgula: Aposto e Vocativo"
            descricao="Isole quem você chama e explique o que você cita."
            gradiente="bg-gradient-to-br from-cyan-600 to-teal-800"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={4}
              title="Chamamento e Explicação"
              variant="cyan"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FlipCard
                frente={<div className="font-bold">VOCATIVO</div>}
                verso={
                  <div className="space-y-3 text-xs">
                    <p>
                      <strong>Conceito:</strong> Chamamento direto.
                    </p>
                    <p>
                      <strong>Regra:</strong> Sempre isolado por vírgula.
                    </p>
                    <p>✅ "Senhores, a reunião começou."</p>
                  </div>
                }
              />
              <FlipCard
                frente={<div className="font-bold">APOSTO</div>}
                verso={
                  <div className="space-y-3 text-xs">
                    <p>
                      <strong>Conceito:</strong> Explicação de um termo.
                    </p>
                    <p>
                      <strong>Regra:</strong> Vem entre vírgulas.
                    </p>
                    <p>✅ "Mário, o engenheiro-chefe, aprovou."</p>
                  </div>
                }
              />
            </div>
          </section>
          <QuizInterativo
            questoes={QUIZ_M4_PONTUACAO}
            titulo="Fixação - Módulo 4"
            icone="🎯"
            numero={4}
            variant="cyan"
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 5: Adjuntos Deslocados */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={5}
            titulo="Vírgula: Adjuntos Deslocados"
            descricao="Quando o advérbio sai do seu lugar original e exige o sinal."
            gradiente="bg-gradient-to-br from-emerald-600 to-teal-800"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={5}
              title="A Regra do Comprimento"
              variant="emerald"
            />
            <AlertBox tipo="warning" titulo="O Pulo do Gato (Cesgranrio)">
              A banca avalia se o adjunto é **Longo** (obrigatória) ou **Curto**
              (facultativa).
            </AlertBox>
            <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-muted-foreground uppercase">
                    Curto (Facultativa)
                  </span>
                  <p className="font-medium">
                    "Hoje, choveu." ou "Hoje choveu."
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-muted-foreground uppercase">
                    Longo (Obrigatória)
                  </span>
                  <p className="font-medium">
                    "Durante o treinamento de segurança, todos anotaram."
                  </p>
                </div>
              </div>
            </div>
          </section>
          <QuizInterativo
            questoes={QUIZ_M5_PONTUACAO}
            titulo="Fixação - Módulo 5"
            icone="🎯"
            numero={5}
            variant="emerald"
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 6: Orações Coordenadas */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={6}
            titulo="Vírgula: Orações Coordenadas"
            descricao="O fetiche da Cesgranrio: vírgulas antes de MAS, PORÉM e o polêmico E."
            gradiente="bg-gradient-to-br from-teal-700 to-cyan-900"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={6}
              title="A Conjunção 'E'"
              variant="cyan"
            />
            <p className="text-muted-foreground text-sm">
              Geralmente o 'E' não pede vírgula, mas em 3 situações ele é seu
              melhor amigo:
            </p>
            <CardCarousel
              cards={[
                {
                  icone: "👥",
                  title: "Sujeitos Diferentes",
                  descricao: "O diretor falou, e o povo aplaudiu.",
                },
                {
                  icone: "🔄",
                  title: "Polissíndeto",
                  descricao: "E chora, e grita, e sofre.",
                },
                {
                  icone: "⚡",
                  title: "Valor Adversativo",
                  descricao: "Trabalhou muito, e não recebeu nada. (E = Mas)",
                },
              ]}
            />
          </section>
          <QuizInterativo
            questoes={QUIZ_M6_PONTUACAO}
            titulo="Fixação - Módulo 6"
            icone="🎯"
            numero={6}
            variant="cyan"
            onComplete={(score) => handleModuleComplete("modulo-6", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 7: Orações Subordinadas */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={7}
            titulo="Vírgula: Orações Subordinadas"
            descricao="A diferença vital entre explicar para todos ou restringir para alguns."
            gradiente="bg-gradient-to-br from-amber-600 to-orange-800"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={7}
              title="Explicativa vs Restritiva"
              variant="amber"
            />
            <Comparison
              title="Impacto Semântico"
              left={{
                title: "Explicativa (Com Vírgula)",
                content: "Os técnicos, que usam EPI, estão seguros.",
                description:
                  "TODOS os técnicos usam EPI e todos estão seguros.",
                variant: "success",
              }}
              right={{
                title: "Restritiva (Sem Vírgula)",
                content: "Os técnicos que usam EPI estão seguros.",
                description:
                  "APENAS a parte dos técnicos que usa EPI é que está segura.",
                variant: "info",
              }}
            />
          </section>
          <QuizInterativo
            questoes={QUIZ_M7_PONTUACAO}
            titulo="Fixação - Módulo 7"
            icone="🎯"
            numero={7}
            variant="amber"
            onComplete={(score) => handleModuleComplete("modulo-7", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 8: Ponto e Ponto e Vírgula */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={8}
            titulo="Ponto e Ponto e Vírgula"
            descricao="Organização de listas e períodos extensos que já possuem vírgulas internas."
            gradiente="bg-gradient-to-br from-orange-700 to-red-900"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={8}
              title="O ponto-e-vírgula"
              variant="amber"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Hierarquia de Pausas",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        O ponto-e-vírgula é uma pausa mais longa que a vírgula e
                        mais curta que o ponto final.
                      </p>
                      <AlertBox tipo="info" titulo="Quando Usar?">
                        Em listas complexas para separar subitens.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <QuizInterativo
            questoes={QUIZ_M8_PONTUACAO}
            titulo="Fixação - Módulo 8"
            icone="🎯"
            numero={8}
            variant="amber"
            onComplete={(score) => handleModuleComplete("modulo-8", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 9: Sinais Complementares */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={9}
            titulo="Sinais Complementares"
            descricao="Dois-pontos, Travessões e Parênteses: a estética da explicação."
            gradiente="bg-gradient-to-br from-red-800 to-black"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={9}
              title="Além da Vírgula"
              variant="rose"
            />
            <div className="grid gap-4 md:grid-cols-2">
              <FlipCard
                frente="Dois-Pontos (:)"
                verso="Indica citação, enumeração ou uma explicação que resume o anterior."
              />
              <FlipCard
                frente="Travessão (—)"
                verso="Usado para isolar falas ou para dar ênfase a explicações intercaladas."
              />
            </div>
          </section>
          <QuizInterativo
            questoes={QUIZ_M9_PONTUACAO}
            titulo="Fixação - Módulo 9"
            icone="🎯"
            numero={9}
            variant="rose"
            onComplete={(score) => handleModuleComplete("modulo-9", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 10: Simulado Final */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={10}
            titulo="Simulado Final"
            descricao="Teste seu domínio perante uma bateria definitiva focada em Pontuação Global Cesgranrio."
            gradiente="bg-gradient-to-br from-indigo-900 to-black"
          />
          {showCompletionBadge ? (
            <div className="flex flex-col items-center gap-6 py-10">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center animate-bounce">
                <LuTrophy className="w-12 h-12 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black">Mestre em Pontuação!</h3>
              <p className="text-center text-muted-foreground max-w-sm">
                Seu texto agora é blindado contra erros e ambiguidade. Pronto
                para o cargo!
              </p>
            </div>
          ) : (
            <QuizInterativo
              questoes={QUIZ_FINAL_PONTUACAO}
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
