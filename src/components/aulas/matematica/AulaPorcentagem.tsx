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
  LuPercent,
  LuTrendingUp,
  LuTrendingDown,
  LuTarget,
  LuActivity,
  LuWallet,
  LuMap,
  LuTrophy,
} from "react-icons/lu";

import {
  QUIZ_M1_CONCEITOS,
  QUIZ_M2_AUMENTOS,
  QUIZ_M3_VARIACAO,
  QUIZ_M4_APLICACOES,
  QUIZ_M5_FINAL,
  QUIZ_M6_COMPOSTA,
  QUIZ_M7_CALCULO_REVERSO,
  QUIZ_M8_REGRA_TRES,
  QUIZ_M9_FINANCEIRO,
  QUIZ_M10_SIMULADO,
} from "./data/porcentagem-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Fundamentos" },
  { id: "modulo-2", label: "Módulo 2", title: "Aumentos/Descontos" },
  { id: "modulo-3", label: "Módulo 3", title: "Variação %" },
  { id: "modulo-4", label: "Módulo 4", title: "Aplicações" },
  { id: "modulo-5", label: "Módulo 5", title: "Desafio Básico" },
  { id: "modulo-6", label: "Módulo 6", title: "% Composta" },
  { id: "modulo-7", label: "Módulo 7", title: "Reverso" },
  { id: "modulo-8", label: "Módulo 8", title: "Regra de 3 %" },
  { id: "modulo-9", label: "Módulo 9", title: "Financeiro" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Final" },
] as const;

export default function AulaPorcentagem({
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

  const [quizM1] = useState(() => getRandomQuestions(QUIZ_M1_CONCEITOS, 4));
  const [quizM2] = useState(() => getRandomQuestions(QUIZ_M2_AUMENTOS, 4));
  const [quizM3] = useState(() => getRandomQuestions(QUIZ_M3_VARIACAO, 4));
  const [quizM4] = useState(() => getRandomQuestions(QUIZ_M4_APLICACOES, 4));
  const [quizM5] = useState(() => getRandomQuestions(QUIZ_M5_FINAL, 5));
  const [quizM6] = useState(() => getRandomQuestions(QUIZ_M6_COMPOSTA, 4));
  const [quizM7] = useState(() =>
    getRandomQuestions(QUIZ_M7_CALCULO_REVERSO, 4),
  );
  const [quizM8] = useState(() => getRandomQuestions(QUIZ_M8_REGRA_TRES, 4));
  const [quizM9] = useState(() => getRandomQuestions(QUIZ_M9_FINANCEIRO, 4));
  const [quizM10] = useState(() => getRandomQuestions(QUIZ_M10_SIMULADO, 5));

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
            titulo="Fundamentos de Porcentagem"
            descricao="O alicerce: conversões, cálculos e a lógica por trás do símbolo %."
            gradiente="bg-gradient-to-br from-emerald-600 to-teal-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Teoria Universal"
              description="Simplificando a linguagem universal dos números na prova."
              variant="emerald"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Definição Absoluta",
                  icone:<LuPercent />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        <strong>Porcentagem</strong> significa literalmente
                        &quot;por cento&quot; — uma razão cujo denominador é{" "}
                        <strong>sempre 100</strong>. É a forma mais usada no
                        mundo real para expressar proporções.
                      </p>
                      <div className="bg-emerald-500/10 p-4 border border-emerald-500/20 text-center rounded-xl font-mono text-xl font-bold text-emerald-700">
                        p% = p / 100
                      </div>
                      <AlertBox tipo="info" titulo="Uso Prático na Petrobras">
                        Eficiência de caldeiras (92%), pureza de combustíveis
                        (99,5%), rendimento financeiro (CDI + 2%).
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "A Tabela Mestra",
                  icone:<LuBookOpen />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Decorar essas equivalências salva minutos valiosos no
                        concurso.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-center">
                        <div className="bg-muted p-2 rounded-lg font-mono">
                          1/2 = 50%
                        </div>
                        <div className="bg-muted p-2 rounded-lg font-mono">
                          1/4 = 25%
                        </div>
                        <div className="bg-muted p-2 rounded-lg font-mono">
                          3/4 = 75%
                        </div>
                        <div className="bg-muted p-2 rounded-lg font-mono">
                          1/5 = 20%
                        </div>
                        <div className="bg-amber-500/10 border-amber-500/30 border p-2 rounded-lg font-mono font-bold text-amber-700 col-span-2">
                          1/3 = 33,33% (cuidado)
                        </div>
                        <div className="bg-amber-500/10 border-amber-500/30 border p-2 rounded-lg font-mono font-bold text-amber-700 col-span-2">
                          1/8 = 12,5%
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM1}
            titulo="Fixação - Conceitos"
            numero={1}
            variant="emerald"
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
            titulo="Aumentos e Descontos"
            descricao="O fator multiplicador: a arma secreta dos aprovados."
            gradiente="bg-gradient-to-br from-blue-700 to-sky-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Arma do Fator"
              description="Como eliminar três passos inúteis da regra de três usando um único multiplicador."
              variant="blue"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Aumento",
                  icone:<LuTrendingUp />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Para calcular +15% de algo, não calcule 15% para depois
                        somar. Pule etapas multiplicando direto.
                      </p>
                      <div className="bg-blue-500/10 p-4 border border-blue-500/20 text-center rounded-xl font-mono font-bold text-blue-700">
                        Fator Aumento: 1 + (taxa/100) <br />
                        +15% = 1,15
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Desconto",
                  icone:<LuTrendingDown />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        A mesma lógica. Desconto subtrai do 1 inteiro (100%).
                      </p>
                      <div className="bg-red-500/10 p-4 border border-red-500/20 text-center rounded-xl font-mono font-bold text-red-700">
                        Fator Desconto: 1 - (taxa/100) <br />
                        -20% = 0,80
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Sucessivos (A Megera)",
                  icone:<LuTarget />,
                  conteudo:(
                    <div className="space-y-4">
                      <AlertBox tipo="error" titulo="Nunca faça somas diretas!">
                        Dizer que a gasolina "subiu 50% e depois desceu 50%"{" "}
                        <strong>NÃO zera a conta.</strong> Zera na cabeça do
                        leigo, mas pro engenheiro, você{" "}
                        <strong>multiplica os fatores</strong>: <br />
                        <br />
                        <code>1,50 × 0,50 = 0,75</code> → Houve na verdade um{" "}
                        <strong>DÉFICIT de 25%</strong> sobre o preço inicial.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM2}
            titulo="Fixação - Fatores"
            numero={2}
            variant="blue"
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
            titulo="Variação Percentual"
            descricao="Calcule quanto subiu ou caiu em relação ao início cronológico."
            gradiente="bg-gradient-to-br from-amber-600 to-orange-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Absoluta x Relativa"
              description="Onde o candidato comum tropeça feio."
              variant="amber"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "A Fórmula Inviolável",
                  icone:<LuActivity />,
                  conteudo:(
                    <div className="space-y-4">
                      <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 text-center shadow-inner">
                        <p className="font-bold text-amber-800 font-mono text-sm sm:text-base">
                          (V_Final - V_Inicial) / V_Inicial × 100
                        </p>
                      </div>
                      <AlertBox tipo="warning" titulo="O Denominador Rei">
                        O denominador JAMAIS é o Valor Novo (Final). É sempre o{" "}
                        <strong>INICIAL</strong>. O erro clássico no gabarito
                        errado sempre traz a conta dividindo pelo Final. Fuja
                        dessa roleta.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Pontos Percentuais",
                  icone:<LuPercent />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Na Petrobras, "a taxa caiu de 5% para 2%". Ela caiu{" "}
                        <strong>3 pontos percentuais (p.p)</strong>. Essa é a
                        Variação Absoluta.
                        <br />
                        <br />
                        Se perguntarem a Variação <strong>Relativa</strong>, ela
                        caiu -60% (pois perdeu 3/5 da própria força nominal).
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM3}
            titulo="Fixação - Variação"
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
            titulo="Aplicações Operacionais"
            descricao="Misturas de líquidos, pesos secos e eficiências."
            gradiente="bg-gradient-to-br from-cyan-600 to-teal-800"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm">
            <QuizInterativo
              questoes={quizM4}
              titulo="Fixação - Aplicações"
              numero={4}
              variant="cyan"
              icone="🔥"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 5 ═══ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={5}
            titulo="Desafio Metade da Jornada"
            descricao="Simulado das partes 1 a 4."
            gradiente="bg-gradient-to-br from-rose-600 to-red-800"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm">
            <QuizInterativo
              questoes={quizM5}
              titulo="Simulado - Nível 1"
              numero={5}
              variant="rose"
              icone="🏆"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 6 ═══ */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={6}
            titulo="Porcentagem Composta"
            descricao="Quando os jurinhos aplicam sobre jurinhos anteriores."
            gradiente="bg-gradient-to-br from-indigo-700 to-blue-900"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Juros sobre Juros"
              description="A grande bola de neve contábil corporativa."
              variant="indigo"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Simples x Composto",
                  icone:<LuWallet />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        O Simples cobra a porcentagem sempre sobre o capital
                        original (<code>C + C×i×t</code>), um crescimento linear
                        burro. <br />O Composto ataca o saldo mais recente
                        acumulado do mês anterior (Crescimento Exponencial:{" "}
                        <code>C × (1+i)^t</code>)
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Depreciação de Equipamento",
                  icone:<LuTrendingDown />,
                  conteudo:(
                    <div className="space-y-4">
                      <AlertBox tipo="warning" titulo="Máquina Velha">
                        Na Petrobras, se uma máquina sofre depreciação de 10%
                        a.a (Capital -10%), no ano seguinte ela perderá 10%{" "}
                        <strong>do valor venal atual</strong> dela, não do valor
                        original. Lembre disso na hora de traçar{" "}
                        <code>Valor = V0 × (0.90)^anos</code>.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM6}
            titulo="Fixação - Comp."
            numero={6}
            variant="indigo"
            icone="🎯"
            onComplete={(score) => handleModuleComplete("modulo-6", score)}
          />
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 7 ═══ */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={7}
            titulo="O Cálculo Reverso"
            descricao="Mergulhando no valor passado quando se sabe o atual e a taxa."
            gradiente="bg-gradient-to-br from-emerald-600 to-cyan-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Volta no Tempo"
              description="Desfazendo manipulações matemáticas sem somar taxas burras."
              variant="emerald"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Divida, não Subtraia",
                  icone:<LuMap />,
                  conteudo:(
                    <div className="space-y-4">
                      <AlertBox tipo="error" titulo="O Veneno Mortal">
                        Se um tênis custa 120 reais HOJE porque sofreu 20% de
                        aumento ano passado...{" "}
                        <strong>O original não é 120 menos 20%.</strong> <br />A
                        base de 20% foi o passado (que era o 100%). Tirar 20% de
                        120 (que se tornou um 120%) é errar a base.
                        <br />A regra é:{" "}
                        <code>Original = Final ÷ Fator de Aumento</code>.<br />
                        <code>Original = 120 ÷ 1,20</code> →{" "}
                        <code>100 reais</code>.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM7}
            titulo="Fixação - Reverso"
            numero={7}
            variant="emerald"
            icone="🎯"
            onComplete={(score) => handleModuleComplete("modulo-7", score)}
          />
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 8 ═══ */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={8}
            titulo="Regra de Três da Porcentagem"
            descricao="Alinhando variáveis para evitar erros básicos."
            gradiente="bg-gradient-to-br from-amber-600 to-yellow-800"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm">
            <QuizInterativo
              questoes={quizM8}
              titulo="Fixação - Regra 3"
              numero={8}
              variant="amber"
              icone="🔥"
              onComplete={(score) => handleModuleComplete("modulo-8", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 9 ═══ */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={9}
            titulo="Mercado Financeiro"
            descricao="Salários, descontos embutidos e pegadinhas tributárias do Brasil."
            gradiente="bg-gradient-to-br from-teal-600 to-green-800"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm">
            <QuizInterativo
              questoes={quizM9}
              titulo="Fixação - Financ."
              numero={9}
              variant="emerald"
              icone="🔥"
              onComplete={(score) => handleModuleComplete("modulo-9", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 10 ═══ */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={10}
            titulo="O Simulado Mestre"
            descricao="Todas as competências matemáticas postas à prova juntas."
            gradiente="bg-gradient-to-br from-slate-800 to-slate-900"
          />

          {showCompletionBadge ? (
            <div className="flex flex-col items-center gap-6 py-10 mt-10">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center animate-bounce">
                <LuTrophy className="w-12 h-12 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black">Mestre da Porcentagem</h3>
              <p className="text-center text-muted-foreground max-w-sm">
                Você venceu o tópico mais importante cobrado na
                Transpetro/Petrobras de longe.
              </p>
            </div>
          ) : (
            <section id="quiz-modulo-10" className="mt-8">
              <QuizInterativo
                questoes={quizM10}
                titulo="Simulado Elite - %"
                icone="🏆"
                numero={10}
                variant="slate"
                onComplete={(score) => handleModuleComplete("modulo-10", score)}
              />
            </section>
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}













