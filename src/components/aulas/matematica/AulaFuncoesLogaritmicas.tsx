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
} from "../shared";

import {
  LuBookOpen,
  LuTarget,
  LuTrendingUp,
  LuTrophy,
  LuBrain,
  LuRepeat,
  LuSigma,
} from "react-icons/lu";

import {
  QUIZ_M1_CONCEITOS,
  QUIZ_M2_PROPRIEDADES,
  QUIZ_M3_EQUACOES,
  QUIZ_M4_GRAFICOS,
  QUIZ_M5_FINAL,
  QUIZ_M6_FUNCOES_LOG,
  QUIZ_M7_SISTEMAS_INEQUACOES,
  QUIZ_M8_REVERSA,
  QUIZ_M9_PETROBRASESPECIFICO,
  QUIZ_M10_SIMULADO_MESTRE,
} from "./data/funcoes-logaritmicas-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Conceito Logarítmico" },
  { id: "modulo-2", label: "Módulo 2", title: "Propriedades Fundamentais" },
  { id: "modulo-3", label: "Módulo 3", title: "Equações Letradas" },
  { id: "modulo-4", label: "Módulo 4", title: "C.E. e Visual Gráfico" },
  { id: "modulo-5", label: "Módulo 5", title: "Desafio Industrial" },
  { id: "modulo-6", label: "Módulo 6", title: "Funções Logarítmicas" },
  { id: "modulo-7", label: "Módulo 7", title: "Sistemas & Inequações" },
  { id: "modulo-8", label: "Módulo 8", title: "Resolução Reversa" },
  { id: "modulo-9", label: "Módulo 9", title: "Aplicações Petrobras" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
] as const;

export default function AulaFuncoesLogaritmicas({
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
  const [quizM2] = useState(() => getRandomQuestions(QUIZ_M2_PROPRIEDADES, 4));
  const [quizM3] = useState(() => getRandomQuestions(QUIZ_M3_EQUACOES, 4));
  const [quizM4] = useState(() => getRandomQuestions(QUIZ_M4_GRAFICOS, 4));
  const [quizM5] = useState(() => getRandomQuestions(QUIZ_M5_FINAL, 5));
  const [quizM6] = useState(() => getRandomQuestions(QUIZ_M6_FUNCOES_LOG, 5));
  const [quizM7] = useState(() => getRandomQuestions(QUIZ_M7_SISTEMAS_INEQUACOES, 5));
  const [quizM8] = useState(() => getRandomQuestions(QUIZ_M8_REVERSA, 5));
  const [quizM9] = useState(() => getRandomQuestions(QUIZ_M9_PETROBRASESPECIFICO, 5));
  const [quizM10] = useState(() => getRandomQuestions(QUIZ_M10_SIMULADO_MESTRE, 5));

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
            titulo="O Conceito de Log"
            descricao="Quando nÃºmeros colossais encolhem em nÃºmeros menores."
            gradiente="bg-gradient-to-br from-blue-700 to-sky-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Pergunta Decodificadora"
              description="EsqueÃ§a o medo superficial de nÃ£o entender a palavra Logaritmo."
              variant="blue"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "A DefiniÃ§Ã£o Sagrada",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        O Logaritmo Ã© apenas uma pergunta exposta num papel.
                        Ele te questiona de forma direta: &quot;Bota fÃ© de que
                        nÃºmero eu coloquei em cima dessa Base aÃ­ debaixo, pra
                        ela virar esse grandÃ£o do lado?&quot;
                      </p>
                      <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 text-center shadow-inner">
                        <p className="font-mono text-xl text-blue-800 font-bold">
                          log_a (b) = c âŸº aá¶œ = b
                        </p>
                      </div>
                      <p className="text-sm">
                        Eis que <code>logâ‚ƒ 9 = 2</code> nÃ£o Ã© mÃ¡gica, ele
                        simplesmente assume a forma matemÃ¡tica de{" "}
                        <code>3Â² = 9</code>. Corta para a Exponencial.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Base Oculta (Base 10)",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Quando alguÃ©m esconde a base que fica flutuando
                        abaixadinha e diz apenas <code>log 1000</code>,
                        subentenda que ali existe um 10 cravado.
                      </p>
                      <AlertBox tipo="info" titulo="DecibÃ©is e Richter">
                        Nas engenharias quÃ­micas ou na geologia que move a
                        Petrobras. Terremoto forÃ§a 5 e Terremoto forÃ§a 6 na
                        escala Richter... A diferenÃ§a nÃ£o Ã© 1x, a explosÃ£o
                        Ã© 10 vezes pior. E um 7 Ã© 100 vezes pior que o 5. Tudo
                        Ã© base 10.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM1}
            titulo="FixaÃ§Ã£o - Conceitos"
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
            titulo="Propriedades Operamentais"
            descricao="MultiplicaÃ§Ã£o encolhe para soma e a potÃªncia descende como o tombo."
            gradiente="bg-gradient-to-br from-emerald-600 to-teal-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Vantagem AlgÃ©brica"
              description="Manobras lÃ­citas que convertem calvÃ¡rios em passeios."
              variant="emerald"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "O Tombo do Logaritmo",
                  icone: <LuSigma />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        O caso do cara que tem log(bâ¿) na sua mira. O Expoente{" "}
                        <code>n</code> que corria o risco de explodir e travar o
                        processamento da calculadora, nÃ£o tem mais forÃ§a: ele
                        tomba pra frente virando um mero multiplicador.
                      </p>
                      <div className="bg-emerald-500/10 p-4 border border-emerald-500/20 text-center rounded-xl shadow-inner font-mono font-bold">
                        log_a (bâ¿) = n Ã— log_a(b)
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "MudanÃ§a de Base",
                  icone: <LuRepeat />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox
                        tipo="warning"
                        titulo="O Truque Final em Concursos"
                      >
                        Os corretores adoram te obrigar a trabalhar numa base
                        esquisita, dizendo no cabeÃ§alho algo como{" "}
                        <em>
                          &quot;Use os dados na base 10: log 2 = 0,3 e log 3 =
                          0,48&quot;
                        </em>
                        . E aÃ­ no problema ele atira um <code>logâ‚ƒ 2</code>{" "}
                        em vocÃª. A mÃ¡gica da mudanÃ§a te deixa estraÃ§alhar
                        tudo e trocar para log de 10 dividindo o{" "}
                        <strong>interior original pelo antigo da base</strong>.{" "}
                        <code>logâ‚â‚€ 2 / logâ‚â‚€ 3</code>.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM2}
            titulo="FixaÃ§Ã£o - Propriedades"
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
            titulo="EquaÃ§Ãµes Infiltradas"
            descricao="X nas cordas e logs somando e subtraindo do lado."
            gradiente="bg-gradient-to-br from-amber-600 to-orange-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Chuta-Chuta da Base"
              description="Para eliminar a palavra log da equaÃ§Ã£o, a base inferior tem que se sacrificar."
              variant="amber"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "MecÃ¢nica do Coice (A Ãšnica Forma Legal de Matar)",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Imagina resolver <code>logâ‚‚(x+8) = 4</code>. O
                        desespero da escuridÃ£o... Mas espere: Pegue a base
                        inferior ali de fininho (2), leve para o outro lado
                        correndo, e chute a cara do 4 fazendo ele engolir e se
                        transformar em potÃªncia de cara. Quando isso
                        acontece... o Log desapareceu, meu amigo.
                      </p>
                      <div className="bg-amber-500/10 p-4 border border-amber-500/20 text-center rounded-xl font-mono text-amber-800 dark:text-amber-200">
                        <p>x + 8 = 2â´</p>
                        <p>x + 8 = 16 âŸ¹ x = 8</p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM3}
            titulo="FixaÃ§Ã£o - EquaÃ§Ãµes"
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
            titulo="C.E. - CondiÃ§Ãµes de ExistÃªncia"
            descricao="Bancas sempre colocam raÃ­zes falsas que nÃ£o existem na vida real."
            gradiente="bg-gradient-to-br from-cyan-600 to-sky-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Masmorra de Erros"
              description="Um logaritmo negativo te levarÃ¡ a uma explosÃ£o no meio da prova."
              variant="cyan"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "O Pior Risco da CESGRANRIO",
                  icone: <LuTrophy />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Terminou a equaÃ§Ã£o de Bhaskara para a equaÃ§Ã£o de log
                        e achou -2 e 8? NÃ£o corra pra marcar a letra B com as
                        respostas. <strong>TESTE</strong> elas dentro do log lÃ¡
                        da pergunta inicial.
                      </p>
                      <AlertBox tipo="danger" titulo="Proibido por Lei">
                        Se houver na equaÃ§Ã£o <code>log(x-5)</code>, e vocÃª
                        usar seu x = -2... Estourou a fÃ¡brica e terÃ­amos{" "}
                        <code>log(-7)</code>. Ã‰ impossÃ­vel e nulo. Raiz nÃ£o
                        contada no Gabarito!!
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM4}
            titulo="FixaÃ§Ã£o - ExistÃªncia"
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
            titulo="O Quizz de Guerra"
            descricao="Integre todo o conhecimento nas opÃ§Ãµes letais da prova."
            gradiente="bg-gradient-to-br from-slate-800 to-slate-900"
          />

          {showCompletionBadge ? (
            <div className="flex flex-col items-center gap-6 py-10 mt-10">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center animate-bounce">
                <LuTrophy className="w-12 h-12 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black">
                A Arte CategÃ³rica Finalizada
              </h3>
              <p className="text-center text-muted-foreground max-w-sm">
                Com esse simulado destruÃ­do vocÃª acabou de blindar seu
                cÃ©rebro de logaritmos.
              </p>
            </div>
          ) : (
            <section id="quiz-modulo-5" className="mt-8">
              <QuizInterativo
                questoes={quizM5}
                titulo="Simulado Elite - Logaritmos"
                icone="ðŸ†"
                numero={5}
                variant="slate"
                onComplete={(score) => handleModuleComplete("modulo-5", score)}
              />
            </section>
          )}
        </div>
      </TabsContent>

      {/* ••• MÓDULO 6 ••• */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={6}
            titulo="Funções Logarítmicas"
            descricao="Transformações, composições e o domínio das curvas que subem com cuidado."
            gradiente="bg-gradient-to-br from-violet-600 to-purple-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Forma Padrão das Funções Log"
              description="Como as funções logarítmicas se comportam quando transformadas."
              variant="violet"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Função Logarítmica Padrão",
                  icone: <LuTrendingUp />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        A função logarítmica f(x) = log_a(x) possui características especiais: sempre passa pelo ponto (1, 0), cresce lentamente, e tem domínio {"x > 0"}. Quando {"a > 1"}, a função é crescente; quando {"0 < a < 1"}, ela é decrescente.
                      </p>
                      <AlertBox tipo="info" titulo="Assíntota Vertical">
                        A reta x = 0 (eixo y) é uma assíntota vertical da função. A função nunca toca esse eixo, apenas se aproxima infinitamente.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Transformações de Função",
                  icone: <LuRepeat />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Deslocar, esticar ou refletir uma função logarítmica segue as mesmas regras das funções em geral:
                      </p>
                      <div className="text-sm space-y-2">
                        <p>• f(x + c): desloca c unidades para a esquerda</p>
                        <p>• f(x) + c: desloca c unidades para cima</p>
                        <p>• k·f(x): estica verticalmente por fator k</p>
                        <p>• f(k·x): comprime horizontalmente por fator k</p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM6}
            titulo="Fixação - Funções Logarítmicas"
            numero={6}
            variant="violet"
            icone="📊"
            onComplete={(score) => handleModuleComplete("modulo-6", score)}
          />
        </div>
      </TabsContent>

      {/* ••• MÓDULO 7 ••• */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={7}
            titulo="Sistemas e Inequações"
            descricao="Quando múltiplas equações logarítmicas se encontram numa mesma arena."
            gradiente="bg-gradient-to-br from-amber-600 to-orange-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Sistemas de Equações Logarítmicas"
              description="A combinação tática de restrições logarítmicas simultâneas."
              variant="amber"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Resolvendo Sistemas",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Quando duas ou mais equações logarítmicas devem ser satisfeitas simultaneamente, você combina propriedades de logaritmos com técnicas algébricas. A chave é sempre verificar as condições de existência para cada solução proposta.
                      </p>
                      <AlertBox tipo="warning" titulo="Dupla Verificação">
                        Em sistemas, verifique que cada solução satisfaz <strong>todas</strong> as equações e que nenhuma cond de existência foi violada.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Inequações Logarítmicas",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Ao resolver inequações com logaritmos, cuidado com a monotonia da função. Se {"0 < base < 1"}, o sinal da inequação inverte quando você "remove" o log! Sempre considere o domínio (logaritmando {">"} 0 e base {">"} 0, base {"≠"} 1).
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM7}
            titulo="Fixação - Sistemas & Inequações"
            numero={7}
            variant="amber"
            icone="🔗"
            onComplete={(score) => handleModuleComplete("modulo-7", score)}
          />
        </div>
      </TabsContent>

      {/* ••• MÓDULO 8 ••• */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={8}
            titulo="Resolução Reversa"
            descricao="Desconstruir problemas complexos até seus componentes logarítmicos primitivos."
            gradiente="bg-gradient-to-br from-cyan-600 to-sky-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Decomposição de Problemas"
              description="Inverta a lógica: comece pelo resultado e trabalhe para trás até o argumento."
              variant="cyan"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "Técnica de Reversão",
                  icone: <LuRepeat />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        Em problemas reversos, você recebe uma expressão complexa e precisa identificar que ela é um logaritmo disfarçado. Por exemplo: "Qual expoente x satisfaz 2ˣ = 5?" é na verdade x = log₂(5).
                      </p>
                      <AlertBox tipo="info" titulo="Pensamento Inverso">
                        Logaritmos e exponenciais são funções inversas. Se você tem dificuldade em uma forma, tente converter para a outra.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM8}
            titulo="Fixação - Resolução Reversa"
            numero={8}
            variant="cyan"
            icone="🔄"
            onComplete={(score) => handleModuleComplete("modulo-8", score)}
          />
        </div>
      </TabsContent>

      {/* ••• MÓDULO 9 ••• */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={9}
            titulo="Aplicações Petrobras"
            descricao="Onde os logaritmos vivem na indústria de petróleo e gás natural."
            gradiente="bg-gradient-to-br from-emerald-600 to-teal-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Logaritmos no Mundo Real"
              description="A matemática por trás das operações de exploração e produção."
              variant="emerald"
            />

            <ContentAccordion
              slides={[
                {
                  titulo: "pH e Acidez em Refinarias",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        O pH usa a escala logarítmica base 10 para medir a concentração de íons hidrogênio. Um aumento de 1 unidade de pH significa uma redução de 10 vezes na acidez. Isso é crítico em processos de refino de petróleo.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Decaimento Radioativo e Corrosão",
                  icone: <LuTrendingUp />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        A degradação de materiais em dutos submetidos à corrosão segue uma lei exponencial, modelada por funções logarítmicas. Engenheiros usam logs para prever a vida útil de equipamentos de subsea.
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM9}
            titulo="Fixação - Aplicações Petrobras"
            numero={9}
            variant="emerald"
            icone="🛢️"
            onComplete={(score) => handleModuleComplete("modulo-9", score)}
          />
        </div>
      </TabsContent>

      {/* ••• MÓDULO 10 ••• */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={10}
            titulo="Simulado Mestre"
            descricao="O teste final combinando todo o conhecimento de logaritmos. Prepare-se para a prova real."
            gradiente="bg-gradient-to-br from-rose-600 to-red-700"
          />

          {showCompletionBadge ? (
            <div className="flex flex-col items-center gap-6 py-10 mt-10">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center animate-bounce">
                <LuTrophy className="w-12 h-12 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black">
                Logaritmos Completamente Dominados
              </h3>
              <p className="text-center text-muted-foreground max-w-sm">
                Você conquistou a maestria em funções logarítmicas. Está pronto para qualquer desafio que vier!
              </p>
            </div>
          ) : (
            <section id="quiz-modulo-10" className="mt-8">
              <QuizInterativo
                questoes={quizM10}
                titulo="Simulado Mestre - Domínio Logarítmico Completo"
                icone="🏆"
                numero={10}
                variant="rose"
                onComplete={(score) => handleModuleComplete("modulo-10", score)}
              />
            </section>
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
