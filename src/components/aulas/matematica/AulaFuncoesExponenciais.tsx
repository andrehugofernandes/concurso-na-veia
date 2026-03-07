// Last modified: 2026-03-06 22:41:50
"use client";

import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  AlertBox,
  QuizInterativo,
  ModuleBanner,
  getRandomQuestions,
  AulaProps,
  ContentAccordion,
  AulaTemplate,
  ModuleSectionHeader,
  CardCarousel,
} from "../shared";

import {
  LuBookOpen,
  LuTarget,
  LuTrendingUp,
  LuTrophy,
  LuBrain,
  LuZap,
} from "react-icons/lu";

import {
  QUIZ_M1_POTENCIACAO,
  QUIZ_M2_GRAFICO,
  QUIZ_M3_EQUACOES,
  QUIZ_M4_APLICACOES,
  QUIZ_M5_FINAL,
} from "./data/funcoes-exponenciais-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "MÃ³dulo 1", title: "PotenciaÃ§Ã£o Base" },
  { id: "modulo-2", label: "MÃ³dulo 2", title: "EquaÃ§Ãµes Exponenciais" },
  { id: "modulo-3", label: "MÃ³dulo 3", title: "AplicaÃ§Ãµes Industriais" },
  { id: "modulo-4", label: "MÃ³dulo 4", title: "InequaÃ§Ãµes" },
  { id: "modulo-5", label: "MÃ³dulo 5", title: "Desafio Final" },
] as const;

export default function AulaFuncoesExponenciais({
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

  const [quizConceito] = useState(() =>
    getRandomQuestions(QUIZ_M1_POTENCIACAO, 4),
  );
  const [quizEquacoes] = useState(() =>
    getRandomQuestions(QUIZ_M3_EQUACOES, 4),
  );
  const [quizAplicacoes] = useState(() =>
    getRandomQuestions(QUIZ_M4_APLICACOES, 4),
  );
  const [quizInequacoes] = useState(() =>
    getRandomQuestions(QUIZ_M2_GRAFICO, 4),
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
            titulo="PotenciaÃ§Ã£o Base"
            descricao="Onde tudo comeÃ§a. Dominar as potÃªncias Ã© o degrau principal."
            gradiente="bg-gradient-to-br from-blue-700 to-sky-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Regras Ocultas"
              description="A matemÃ¡tica trata potÃªncias com regras imutÃ¡veis."
              variant="blue"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "As Leis da PotÃªncia",
                  icone:<LuZap />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        NÃ£o dependa de sorte. Dependa das propriedades
                        matemÃ¡ticas:
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 text-center">
                          <p className="font-mono font-bold text-blue-700 text-lg">
                            aáµ Ã— aâ¿ = aáµâºâ¿
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            MultiplicaÃ§Ã£o de Mesma Base = Soma os vizinhos.
                          </p>
                        </div>
                        <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 text-center">
                          <p className="font-mono font-bold text-blue-700 text-lg">
                            aáµ Ã· aâ¿ = aáµâ»â¿
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            DivisÃ£o de Mesma Base = Subtrai o de baixo.
                          </p>
                        </div>
                        <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 text-center">
                          <p className="font-mono font-bold text-blue-700 text-lg">
                            (aáµ)â¿ = aáµË£â¿
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            PotÃªncia de PotÃªncia = Multiplica o intruso.
                          </p>
                        </div>
                        <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 text-center">
                          <p className="font-mono font-bold text-blue-700 text-lg">
                            aâ»â¿ = 1/aâ¿
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Expoente Negativo = Inverte a base toda.
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
            questoes={quizConceito}
            titulo="FixaÃ§Ã£o - PotenciaÃ§Ã£o"
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
            titulo="EquaÃ§Ãµes Exponenciais"
            descricao="FatoraÃ§Ã£o em busca da igualdade."
            gradiente="bg-gradient-to-br from-emerald-600 to-teal-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Arte de Cortar as Bases"
              description="Quando o 'x' estÃ¡ no cÃ©u, e vocÃª precisa puxÃ¡-lo pra terra."
              variant="emerald"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "MÃ©todo Universal",
                  icone:<LuTarget />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        O objetivo final Ã© sempre chegar num formato onde nÃ£o
                        haja dÃºvida das intenÃ§Ãµes:
                      </p>
                      <div className="bg-emerald-500/10 p-4 text-center rounded-xl border border-emerald-500/20">
                        <p className="font-mono text-xl font-bold text-emerald-700">
                          aË£ = aÊ¸ âŸ¹ x = y
                        </p>
                      </div>
                      <p className="text-sm mt-2 text-muted-foreground">
                        Se <code>4Ë£ = 8</code>, nÃ³s precisamos transformar o 4
                        em <code>2Â²</code> e o 8 em <code>2Â³</code>. Assim
                        teremos <code>2Â²Ë£ = 2Â³</code>. Cortam-se os nÃºmeros
                        gigantes da base, ficamos com vida de adulto:{" "}
                        <code>2x = 3</code>.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "O Pior CenÃ¡rio (ArtifÃ­cio AlgÃ©brico)",
                  icone:<LuBrain />,
                  conteudo:(
                    <div className="space-y-4">
                      <AlertBox
                        tipo="warning"
                        titulo="Quando nÃ£o dÃ¡ pra isolar a base numa paulada sÃ³"
                      >
                        Se trombar com coisas no nÃ­vel{" "}
                        <code>3Â²Ë£ + 3Ë£ - 6 = 0</code>. NÃ£o corra. Perceba que{" "}
                        <code>3Â²Ë£</code> Ã© nada menos que <code>(3Ë£)Â²</code>.
                        Chame de imediato <code>3Ë£</code> de uma letra qualquer
                        (Y). E resolva usando Bhaskara ou Soma/Produto:{" "}
                        <code>YÂ² + Y - 6 = 0</code>. ApÃ³s achar o Y, volte para
                        a variÃ¡vel original!
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizEquacoes}
            titulo="FixaÃ§Ã£o - EquaÃ§Ãµes"
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
            titulo="AplicaÃ§Ãµes de Alta Performance"
            descricao="Crescimento bacteriano e Juros Compostos modelados matematicamente."
            gradiente="bg-gradient-to-br from-amber-600 to-orange-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="ExplosÃ£o e ExtinÃ§Ã£o"
              description="N(t) modela todo o caos da natureza ou das finanÃ§as financeiras."
              variant="amber"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Crescimento Absoluto",
                  icone:<LuTrendingUp />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        A fÃ³rmula oficial da Banca para problemas da vida real
                        sempre engole parÃ¢metros cruciais:
                      </p>
                      <div className="bg-amber-500/10 p-4 border border-amber-500/20 text-center rounded-xl shadow-inner inline-block">
                        <p className="font-mono text-lg font-bold text-amber-800">
                          N(t) = Nâ‚€ Ã— aáµ—
                        </p>
                      </div>
                      <p className="text-sm">
                        O <strong>Nâ‚€</strong> Ã© o valor exato daquele dado
                        (BactÃ©rias, Dinheiro inicial e etc) no InÃ­cio (Tempo 0).
                        E o <strong>a</strong> Ã© a variaÃ§Ã£o (se o texto disser
                        que sobe 20% todo mÃªs, ele serÃ¡ 1,20).
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizAplicacoes}
            titulo="FixaÃ§Ã£o - AplicaÃ§Ãµes"
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
            titulo="InequaÃ§Ãµes Complexas"
            descricao="Onde uma base menor que 1 inverte todos os sinais."
            gradiente="bg-gradient-to-br from-cyan-600 to-sky-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Regra da InversÃ£o"
              description="Manter a direÃ§Ã£o matemÃ¡tica nÃ£o Ã© um direito incondicional."
              variant="cyan"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Base (a > 1)",
                  icone:<LuTrendingUp />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Se vocÃª tiver uma base maior que 1, a funÃ§Ã£o Exponencial
                        apenas decola para o infinito. Ã‰ Crescente. Se vocÃª
                        tiver de um lado o nÃºmero maior, quer dizer de fato que
                        o expoente dele tambÃ©m era maior.
                      </p>
                      <div className="bg-cyan-500/10 p-3 rounded-lg border border-cyan-500/20">
                        <code>2Ë£ &gt; 2âµ âŸ¹ x &gt; 5</code>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Base (0 < a < 1)",
                  icone:<LuTrendingUp />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Ã‰ aqui onde ocorre o desastre. Se vocÃª lidar com um
                        valor minÃºsculo <code>(1/2)</code> ou <code>(0,3)</code>
                        , eles diminuem a cada passo de expoente. EntÃ£o se do
                        lado esquerdo o nÃºmero que resta Ã© maior que o do
                        direito, a Ãºnica explicaÃ§Ã£o, Ã© que seu expoente era o
                        menorzinho da fila.
                      </p>
                      <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20 font-bold">
                        <p>O sinal vai INVERTER.</p>
                        <code className="text-red-700">
                          0,5Ë£ &gt; 0,5Â² âŸ¹ x &lt; 2
                        </code>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizInequacoes}
            titulo="FixaÃ§Ã£o - InequaÃ§Ãµes"
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
            titulo="Desafio Final da Carga Mestre"
            descricao="NÃ­veis exponenciais misturados em alto estresse cognitivo."
            gradiente="bg-gradient-to-br from-slate-800 to-slate-900"
          />

          {showCompletionBadge ? (
            <div className="flex flex-col items-center gap-6 py-10 mt-10">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center animate-bounce">
                <LuTrophy className="w-12 h-12 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black">Analista Certificado</h3>
              <p className="text-center text-muted-foreground max-w-sm">
                AprovaÃ§Ãµes comeÃ§am destruindo essas falhas de InequaÃ§Ãµes da base
                menor.
              </p>
            </div>
          ) : (
            <section id="quiz-modulo-5" className="mt-8">
              <QuizInterativo
                questoes={quizFinal}
                titulo="Simulado Elite - Exponenciais"
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














