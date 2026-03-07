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
  LuTarget,
  LuTrendingUp,
  LuTrophy,
  LuBrain,
} from "react-icons/lu";

import {
  QUIZ_M1_AFIM,
  QUIZ_M2_QUADRATICA,
  QUIZ_M3_GRAFICOS,
  QUIZ_M4_APLICACOES,
  QUIZ_M5_FINAL,
} from "./data/funcoes-afim-quadratica-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "MÃ³dulo 1", title: "A FunÃ§Ã£o Afim (A Reta)" },
  { id: "modulo-2", label: "MÃ³dulo 2", title: "A QuadrÃ¡tica (A ParÃ¡bola)" },
  { id: "modulo-3", label: "MÃ³dulo 3", title: "InterpretaÃ§Ã£o de GrÃ¡ficos" },
  { id: "modulo-4", label: "MÃ³dulo 4", title: "AplicaÃ§Ãµes de Max e Min" },
  { id: "modulo-5", label: "MÃ³dulo 5", title: "Desafio Final" },
] as const;

export default function AulaFuncoesAfimQuadratica({
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

  const [quizAfim] = useState(() => getRandomQuestions(QUIZ_M1_AFIM, 4));
  const [quizQuadratica] = useState(() =>
    getRandomQuestions(QUIZ_M2_QUADRATICA, 4),
  );
  const [quizGrafico] = useState(() => getRandomQuestions(QUIZ_M3_GRAFICOS, 4));
  const [quizAplicacoes] = useState(() =>
    getRandomQuestions(QUIZ_M4_APLICACOES, 4),
  );
  const [quizFinal] = useState(() => getRandomQuestions(QUIZ_M5_FINAL, 5));

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
      {/* â•â•â• MÃ“DULO 1 â•â•â• */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={1}
            titulo="FunÃ§Ã£o Afim (A Reta)"
            descricao="Custo fixo e variÃ¡vel: modelando o comportamento corporativo."
            gradiente="bg-gradient-to-br from-blue-700 to-sky-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Receita do Bolo (ax + b)"
              description="Identifique a essÃªncia da linha reta nos grÃ¡ficos empresariais."
              variant="blue"
            />

            <p className="text-muted-foreground leading-relaxed text-lg">
              A <strong>FunÃ§Ã£o Afim</strong>, muitas vezes chamada de FunÃ§Ã£o do
              1Âº Grau, Ã© a forma matemÃ¡tica de prever valores proporcionais no
              futuro, como os custos de produÃ§Ã£o em sÃ©rie.
            </p>

            <ContentAccordion
              slides={[
                {
                  titulo: "Os Dois Coeficientes Vitais",
                  icone:<LuTarget />,
                  conteudo:(
                    <div className="space-y-4">
                      <div className="bg-muted p-4 rounded-xl border border-border text-center">
                        <p className="text-xl font-mono font-black text-blue-600 mb-2">
                          f(x) = ax + b
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 mt-6">
                          <div className="text-left bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                            <p className="font-bold text-blue-700">
                              O Taxista (a)
                            </p>
                            <p className="text-sm">
                              Coeficiente Angular. Mostra o quÃ£o rÃ¡pido o valor
                              sobe (ou desce). Ex: R$3 por Km rodado.
                            </p>
                          </div>
                          <div className="text-left bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                            <p className="font-bold text-blue-700">
                              A Bandeirada (b)
                            </p>
                            <p className="text-sm">
                              Coeficiente Linear. Onde vocÃª comeÃ§a mesmo que x
                              seja do zero. Ex: Taxa fixa de R$5 sÃ³ por entrar.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Contexto Petrobras",
                  icone:<LuBookOpen />,
                  conteudo:(
                    <div className="space-y-4">
                      <AlertBox tipo="info" titulo="Modelagem de Custos">
                        <p className="text-sm">
                          Na operaÃ§Ã£o de uma refinaria,{" "}
                          <strong>
                            C(x) = Custo Fixo + Custo VariÃ¡vel Ã— Quantidade
                          </strong>
                          . Exemplo: <code>C(x) = 5.000 + 15x</code>. R$ 5.000 Ã©
                          o equipamento instalado e R$ 15 Ã© o que custa produzir
                          1 barril a mais.
                        </p>
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "A Raiz (Onde fura o chÃ£o)",
                  icone:<LuTrendingUp />,
                  conteudo:(
                    <div className="space-y-4 text-center">
                      <p className="text-muted-foreground text-left text-sm">
                        A raiz da funÃ§Ã£o Ã© o valor exato no eixo horizontal (x)
                        onde o y vale ZERO. Pense no ponto de quebra antes de
                        comeÃ§ar a dar lucro, por exemplo.
                      </p>
                      <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 shadow-inner inline-block">
                        <p className="text-lg font-bold font-mono text-blue-700">
                          ax + b = 0 â†’ x = -b / a
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizAfim}
            titulo="FixaÃ§Ã£o - MÃ³dulo 1"
            numero={1}
            variant="blue"
            icone="ðŸ§ "
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          />
        </div>
      </TabsContent>

      {/* â•â•â• MÃ“DULO 2 â•â•â• */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={2}
            titulo="A FunÃ§Ã£o QuadrÃ¡tica"
            descricao="O reino do crescimento acelerado e do formato parabÃ³lico."
            gradiente="bg-gradient-to-br from-emerald-600 to-teal-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="CÃ´ncavas e Convexas"
              description="A equaÃ§Ã£o ganha um expoente na potÃªncia dois. Tudo muda."
              variant="emerald"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Os Limites do Universo",
                  icone:<LuBrain />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        A QuadrÃ¡tica tem formato de U ou montanha. O segredo?
                        Tudo depende de como a equaÃ§Ã£o comeÃ§a.{" "}
                        <code>f(x) = axÂ² + bx + c</code>. O cara mais importante
                        dessa estrutura Ã© o sinal de <strong>a</strong>.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-emerald-500/30 bg-emerald-500/10 p-4 rounded-lg text-center">
                          <div className="text-emerald-700 font-black mb-1">
                            Se a &gt; 0
                          </div>
                          <p className="font-mono text-lg mb-2">U Sorridente</p>
                          <p className="text-sm">
                            GrÃ¡fico atinge um ponto muito baixo (MÃNIMO) e volta
                            a subir para a eternidade. (Ex: Custos).
                          </p>
                        </div>
                        <div className="border border-rose-500/30 bg-rose-500/10 p-4 rounded-lg text-center">
                          <div className="text-rose-700 font-black mb-1">
                            Se a &lt; 0
                          </div>
                          <p className="font-mono text-lg mb-2">U Triste</p>
                          <p className="text-sm">
                            GrÃ¡fico atinge o topo de um pico (MÃXIMO) e cai.
                            (Ex: Lucros em declÃ­nio ou movimento de pedras).
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "O Ponto Inicial (c)",
                  icone:<LuTarget />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        O valor isolado <code>c</code> tem um papel crucial no
                        grÃ¡fico visual.
                      </p>
                      <AlertBox tipo="success" titulo="Visual RÃ¡pido">
                        <p>
                          Ele Ã© EXATAMENTE onde a parÃ¡bola corta o{" "}
                          <strong>Eixo Y</strong> vertical (f(0) = c). Sem
                          precisar calcular nada, vocÃª jÃ¡ sabe onde a
                          montanha-russa partiu desde o ponto X = 0.
                        </p>
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizQuadratica}
            titulo="FixaÃ§Ã£o - MÃ³dulo 2"
            numero={2}
            variant="emerald"
            icone="ðŸŽ¯"
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          />
        </div>
      </TabsContent>

      {/* â•â•â• MÃ“DULO 3 â•â•â• */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={3}
            titulo="InterpretaÃ§Ã£o GeogrÃ¡fica"
            descricao="Brotou o grÃ¡fico na sua frente. O que ele estÃ¡ dizendo?"
            gradiente="bg-gradient-to-br from-amber-600 to-orange-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Estudo CidadÃ£o do Sinal"
              description="Quando o grÃ¡fico mente e quando o grÃ¡fico expÃµe verdades duras."
              variant="amber"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "A Linha d'Ãgua (Eixo X)",
                  icone:<LuBookOpen />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Tudo que estÃ¡ ACIMA do Eixo X na foto Ã© positivo{" "}
                        <code>f(x) &gt; 0</code>. Tudo que afundou ABAIXO do
                        Eixo X Ã© negativo <code>f(x) &lt; 0</code>.
                      </p>
                      <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 shadow-inner">
                        <p className="font-bold text-amber-700 mb-2">
                          Para ParÃ¡bolas de MÃ¡ximo (âˆ©):
                        </p>
                        <ul className="text-sm space-y-2 list-disc pl-5">
                          <li>
                            Elas costumam subir, ficar POSITIVAS entre as duas
                            raÃ­zes, atingir o topo e depois voltar a descer
                            rasgando o eixo X ficando negativas pra sempre.
                          </li>
                          <li>
                            <strong>
                              Entre as raÃ­zes de Lucas: A empresa dÃ¡ lucro
                              absoluto.
                            </strong>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizGrafico}
            titulo="FixaÃ§Ã£o - MÃ³dulo 3"
            numero={3}
            variant="amber"
            icone="ðŸŽ¯"
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </div>
      </TabsContent>

      {/* â•â•â• MÃ“DULO 4 â•â•â• */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={4}
            titulo="O VÃ©rtice do Poder"
            descricao="Maximizando o lucro da empresa ou escapando da ruÃ­na a tempo."
            gradiente="bg-gradient-to-br from-cyan-600 to-sky-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Dominando VÃ©rtices"
              description="NÃ£o tente achar raÃ­zes em problemas de lucro mÃ¡ximo."
              variant="cyan"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Erros Comuns (Pegadinha do Lucro MÃ¡x)",
                  icone:<LuTrophy />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Uma das tÃ¡ticas mais nefastas da Cesgranrio: apresentar
                        uma questÃ£o de <strong>Lucro MÃ¡ximo</strong>. O
                        candidato inexperiente corre pra fazer Bhaskara achando
                        raÃ­zes.
                      </p>
                      <AlertBox
                        tipo="warning"
                        titulo="Nunca faÃ§a Bhaskara aqui!"
                      >
                        Bhaskara diz quando o Lucro vira ZERO (quando cruza o x
                        = Break-Even e para de existir). O{" "}
                        <strong>Lucro MÃXIMO</strong> habita no pico da montanha
                        matemÃ¡tica: no VÃ©rtice. Use <code>Xv = -b/2a</code> ou{" "}
                        <code>Yv = -Î”/4a</code>.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Receita - Custo = Lucro",
                  icone:<LuBrain />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Lembre do mantra: NinguÃ©m fala de f(x) na petroleira.
                        Eles falam de:
                      </p>
                      <div className="bg-cyan-500/10 p-4 border border-cyan-500/20 text-center rounded-xl font-mono text-lg font-bold">
                        L(x) = R(x) - C(x)
                      </div>
                      <p className="text-sm mt-2 text-muted-foreground">
                        Onde vocÃª diminui toda a funÃ§Ã£o de Receita pela de Custo
                        (lembre de botar parÃªnteses no Custo para o sinal
                        negativo invadir todo mundo corretamente). E a nova
                        funÃ§Ã£o virou <code>axÂ² + bx + c</code>, para aÃ­ sim
                        procurar o VÃ©rtice.
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizAplicacoes}
            titulo="FixaÃ§Ã£o - MÃ³dulo 4"
            numero={4}
            variant="cyan"
            icone="ðŸŽ¯"
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
          />
        </div>
      </TabsContent>

      {/* â•â•â• MÃ“DULO 5 â•â•â• */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={5}
            titulo="SimulaÃ§Ã£o Administrativa Final"
            descricao="Integre os dados num teste pesado focado em bancas de concursos."
            gradiente="bg-gradient-to-br from-slate-800 to-slate-900"
          />

          {showCompletionBadge ? (
            <div className="flex flex-col items-center gap-6 py-10 mt-10">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center animate-bounce">
                <LuTrophy className="w-12 h-12 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black">CEO das FunÃ§Ãµes!</h3>
              <p className="text-center text-muted-foreground max-w-sm">
                VÃ©rtices otimizados, raizes encontradas e lucros engajados no
                nÃ­vel mÃ¡ximo.
              </p>
            </div>
          ) : (
            <section id="quiz-modulo-5" className="mt-8">
              <QuizInterativo
                questoes={quizFinal}
                titulo="Simulado Elite - FunÃ§Ãµes Afim e Quad."
                icone="ðŸ†"
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













