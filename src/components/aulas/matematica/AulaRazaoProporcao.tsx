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
  AulaTemplate,
  ModuleSectionHeader,
  ModuleSummaryCarouselNew,
} from "../shared";

import {
  LuBookOpen,
  LuLightbulb,
  LuMap,
  LuTrendingUp,
  LuTrendingDown,
  LuTarget,
  LuZap,
  LuBrain,
  LuTrophy,
} from "react-icons/lu";

import {
  QUIZ_M1_RAZAO,
  QUIZ_M2_PROPORCAO,
  QUIZ_M3_REGRA3,
  QUIZ_M4_DIVISAO,
  QUIZ_M10_SIMULADO_FINAL,
} from "./data/razao-proporcao-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Conceitos de Razão" },
  { id: "modulo-2", label: "Módulo 2", title: "Grandezas e Escalas" },
  { id: "modulo-3", label: "Módulo 3", title: "Regra de Três Simples" },
  { id: "modulo-4", label: "Módulo 4", title: "Regra de Três Composta" },
  { id: "modulo-5", label: "Módulo 5", title: "Desafio Industrial" },
] as const;

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

  const [quizConceitos] = useState(() => getRandomQuestions(QUIZ_M1_RAZAO, 4));
  const [quizGrandezas] = useState(() =>
    getRandomQuestions(QUIZ_M2_PROPORCAO, 4),
  );
  const [quizRegra3S] = useState(() => getRandomQuestions(QUIZ_M3_REGRA3, 4));
  const [quizRegra3C] = useState(() => getRandomQuestions(QUIZ_M4_DIVISAO, 4));
  const [quizFinal] = useState(() =>
    getRandomQuestions(QUIZ_M10_SIMULADO_FINAL, 5),
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
      {/* ═══ MÓDULO 1 ═══ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={1}
            titulo="Razão Matriz"
            descricao="A base para entender escalas e produtividade operacional."
            gradiente="bg-gradient-to-br from-blue-700 to-sky-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Teoria da Comparação"
              description="Simplificando comparações métricas do dia a dia industrial."
              variant="blue"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "A Divisão Primitiva",
                  icone:<LuBookOpen />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Uma Razão é a comparação mais básica entre números. Se
                        há 20 engenheiros e 5 estagiários, a razão Engenheiros /
                        Estagiários é 20/5. Ou seja, <strong>4 para 1</strong>.
                        (Há 4 engenheiros cuidando de 1 estagiário).
                      </p>
                      <AlertBox tipo="info" titulo="Uso Prático na Petrobras">
                        Razões são essenciais no dia a dia: a{" "}
                        <strong>densidade</strong> (Massa / Volume), a{" "}
                        <strong>escala</strong> de um projeto (Desenho / Real) e
                        o próprio <strong>rendimento</strong> de uma bomba
                        (Energia Útil / Energia Total).
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Proporção (A Balança)",
                  icone:<LuTarget />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        A Proporção é a igualdade mágica entre duas Razões que à
                        primeira vista são diferentes.
                      </p>
                      <div className="bg-blue-500/10 p-4 border border-blue-500/20 text-center rounded-xl font-mono text-xl font-bold text-blue-700">
                        A / B = C / D
                      </div>
                      <p className="text-sm">
                        A regra máxima da Proporção nas bancas é a{" "}
                        <strong>multiplicação cruzada</strong>:{" "}
                        <code>A × D = B × C</code>.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "O Veneno da Escala",
                  icone:<LuMap />,
                  conteudo:(
                    <div className="space-y-4">
                      <AlertBox tipo="warning" titulo="Nunca perca pros zeros">
                        A Escala é: Desenho / Vida Real. Lembre-se:{" "}
                        <strong>
                          A ESQUERDA NUNCA TEM UNIDADE IMPRESSA NUM MAPA
                        </strong>{" "}
                        (ex: 1:50000). A pegadinha é que esses dois números
                        representam <strong>a mesma unidade</strong> geométrica.
                        Se o desenho tem 5 centímetros na prova, você usará os 5
                        centímetros, e os 50000 se tornarão, também, centímetros
                        pra serem convertidos só depois.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizConceitos}
            titulo="Fixação - Conceitos"
            numero={1}
            variant="blue"
            icone="🧠"
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          />
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 2 ═══ */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={2}
            titulo="Choque de Grandezas"
            descricao="Quem anda junto e quem atrapalha as engrenagens."
            gradiente="bg-gradient-to-br from-emerald-600 to-teal-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Direta x Inversa"
              description="Identificar o movimento da grandeza antes de armar o cálculo."
              variant="emerald"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "A Lealdade (Diretamente Proporcional)",
                  icone:<LuTrendingUp />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Subiu de um lado, subiu do outro. Sem surpresas e fiel
                        como um cão.
                      </p>
                      <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                        <p className="font-bold text-sm text-emerald-700 mb-2">
                          Exemplo Operacional:
                        </p>
                        <p className="text-sm">
                          Tempo de máquina ligada vs. Consumo de energia. Se
                          você dobrar as horas, consumirá inevitavelmente o
                          dobro da luz em KWh. Não tem atalho mágico.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "A Traição (Inversamente Proporcional)",
                  icone:<LuTrendingDown />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Onde a banca esmaga os inocentes. Um lado cresce pra
                        cima, e as consequências jogam o outro lado pra baixo. A
                        conta que estava multiplicando em X agora multiplicará{" "}
                        <strong>em linha reta</strong> na famosa Regra de Três.
                      </p>
                      <AlertBox
                        tipo="error"
                        titulo="Exemplo Famoso no Concurso"
                      >
                        Engenheiros x Tempo de Obra. Se você jogar o dobro de
                        engenheiros na sala, o tempo gasto vai CAIR pela metade.
                        Eles são inversos puros.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizGrandezas}
            titulo="Fixação - Grandezas"
            numero={2}
            variant="emerald"
            icone="🎯"
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          />
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 3 ═══ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={3}
            titulo="A Regra de 3 Básica"
            descricao="O pão com manteiga que resolve 60% da prova de matemática."
            gradiente="bg-gradient-to-br from-amber-600 to-orange-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Mecânica Operacional"
              description="A execução fria da regra."
              variant="amber"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "O Formato",
                  icone:<LuZap />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        As questões da Regra de 3 Simples trazem apenas e
                        unicamente <strong>DUAS</strong> variáveis.
                      </p>

                      <div className="bg-amber-500/10 p-4 border border-amber-500/20 text-center rounded-xl shadow-inner inline-block space-y-2">
                        <span className="font-bold text-amber-800">
                          1. Alinhe:
                        </span>
                        <p className="font-mono text-sm">
                          Bomba 10 min —— 400L
                        </p>
                        <p className="font-mono text-sm">Bomba 15 min —— X L</p>
                        <div className="h-px bg-amber-500/30 w-full my-2"></div>
                        <span className="font-bold text-amber-800">
                          2. Se pergunte:
                        </span>
                        <p className="font-mono text-sm text-left">
                          As duas setas sobem juntas? (Mais tempo = Mais
                          Litros?) SIM. É Direta. Multiplique cruzado (em X).
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizRegra3S}
            titulo="Fixação - Regra de 3 Simp."
            numero={3}
            variant="amber"
            icone="🎯"
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 4 ═══ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={4}
            titulo="A Terrível Composta"
            descricao="Mais de 3 variáveis entrando em colapso. Use o macete."
            gradiente="bg-gradient-to-br from-cyan-600 to-sky-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Causa & Efeito"
              description="Evitando a armadilha de setinhas que enlouquecem os candidatos."
              variant="cyan"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Macete do Faz/Sobra",
                  icone:<LuBrain />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Se você ver uma questão envolvendo trinta caras
                        (Tratores + Operários + Horas Dia + Eficiência)
                        construindo um único Efeito (Uma Ponte, Buraco ou
                        Tanque)...
                      </p>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Coloque <strong>TODOS que efetuam</strong> o trabalho no
                        lado de cima da divisão multiplicando um pelo outro, e
                        embaixo, a <strong>OBRA em si acabada</strong>. No outro
                        lado do igual você repete a mesmíssima coisa para o
                        segundo cenário, só que incluindo o seu X intocável.
                        Pimba. Morreu. Sem seta. Eletrocutou o problema.
                      </p>
                      <div className="bg-cyan-500/10 p-3 rounded-lg border border-cyan-500/20 font-mono text-cyan-800 dark:text-cyan-200 text-center font-bold overflow-x-auto text-xs sm:text-sm">
                        (OP² × DIA × HR) / Tanques = (OP²_B × DIA_B × HR_B) /
                        Tanques_B
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizRegra3C}
            titulo="Fixação - R. 3 Composta"
            numero={4}
            variant="cyan"
            icone="🎯"
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
          />
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 5 ═══ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={5}
            titulo="O Quizz de Guerra"
            descricao="Simulado insano das divisões proporcionais Cesgranrio"
            gradiente="bg-gradient-to-br from-slate-800 to-slate-900"
          />

          {showCompletionBadge ? (
            <div className="flex flex-col items-center gap-6 py-10 mt-10">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center animate-bounce">
                <LuTrophy className="w-12 h-12 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black">Escala Final</h3>
              <p className="text-center text-muted-foreground max-w-sm">
                Chegar até aqui demonstra um nível cognitivo superior à
                concorrência. Avante!
              </p>
            </div>
          ) : (
            <section id="quiz-modulo-5" className="mt-8">
              <QuizInterativo
                questoes={quizFinal}
                titulo="Simulado Elite - Proporção"
                icone="🏆"
                numero={5}
                variant="slate"
                onComplete={(score) => handleModuleComplete("modulo-5", score)}
              />
            </section>
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}












