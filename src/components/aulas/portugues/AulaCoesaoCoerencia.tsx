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
  LuAnchor,
  LuCompass,
  LuZap,
  LuScale,
  LuLightbulb,
  LuLink,
  LuActivity,
  LuLibrary,
} from "react-icons/lu";

// Data
import {
  QUIZ_M1_POOL,
  QUIZ_M2_POOL,
  QUIZ_M3_POOL,
  QUIZ_M4_POOL,
  QUIZ_M5_POOL,
  QUIZ_M6_POOL,
  QUIZ_M7_POOL,
  QUIZ_M8_POOL,
  QUIZ_M9_POOL,
  QUIZ_M10_POOL,
} from "./data/coesao-coerencia-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "MÃ³dulo 1", title: "O Tecido do Texto" },
  { id: "modulo-2", label: "MÃ³dulo 2", title: "O Poder do Retrovisor" },
  { id: "modulo-3", label: "MÃ³dulo 3", title: "O Farol do Sentido" },
  { id: "modulo-4", label: "MÃ³dulo 4", title: "O SilÃªncio Eloquente" },
  { id: "modulo-5", label: "MÃ³dulo 5", title: "SubstituiÃ§Ãµes de Elite" },
  { id: "modulo-6", label: "MÃ³dulo 6", title: "A DanÃ§a dos Conectivos" },
  { id: "modulo-7", label: "MÃ³dulo 7", title: "ConcessÃ£o & OposiÃ§Ã£o" },
  { id: "modulo-8", label: "MÃ³dulo 8", title: "Arquitetura da CoerÃªncia" },
  { id: "modulo-9", label: "MÃ³dulo 9", title: "ProgressÃ£o e RelevÃ¢ncia" },
  { id: "modulo-10", label: "MÃ³dulo 10", title: "Arena de Elite" },
];

export default function AulaCoesaoCoerencia({
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

  // Quizzes dinÃ¢micos (seleÃ§Ã£o aleatÃ³ria do pool)
  const [quizM1, setQuizM1] = useState(QUIZ_M1_POOL);
  const [quizM2, setQuizM2] = useState(QUIZ_M2_POOL);
  const [quizM3, setQuizM3] = useState(QUIZ_M3_POOL);
  const [quizM4, setQuizM4] = useState(QUIZ_M4_POOL);
  const [quizM5, setQuizM5] = useState(QUIZ_M5_POOL);
  const [quizM6, setQuizM6] = useState(QUIZ_M6_POOL);
  const [quizM7, setQuizM7] = useState(QUIZ_M7_POOL);
  const [quizM8, setQuizM8] = useState(QUIZ_M8_POOL);
  const [quizM9, setQuizM9] = useState(QUIZ_M9_POOL);
  const [quizM10, setQuizM10] = useState(QUIZ_M10_POOL);

  useEffect(() => {
    setQuizM1(getRandomQuestions(QUIZ_M1_POOL, 5));
    setQuizM2(getRandomQuestions(QUIZ_M2_POOL, 5));
    setQuizM3(getRandomQuestions(QUIZ_M3_POOL, 3));
    setQuizM4(getRandomQuestions(QUIZ_M4_POOL, 3));
    setQuizM5(getRandomQuestions(QUIZ_M5_POOL, 3));
    setQuizM6(getRandomQuestions(QUIZ_M6_POOL, 3));
    setQuizM7(getRandomQuestions(QUIZ_M7_POOL, 3));
    setQuizM8(getRandomQuestions(QUIZ_M8_POOL, 2));
    setQuizM9(getRandomQuestions(QUIZ_M9_POOL, 2));
    setQuizM10(getRandomQuestions(QUIZ_M10_POOL, 5));
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
      {/* ââ MÃDULO 1: O TECIDO DO TEXTO âââââââââââââââââââââââââ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="O Tecido do Texto"
          descricao="Entenda a diferenÃ§a fundamental entre CoesÃ£o (forma) e CoerÃªncia (sentido) no padrÃ£o CESGRANRIO."
          gradiente="bg-gradient-to-br from-blue-700 to-sky-800"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-5 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Dualidade Textual"
              variant="blue"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "ConceituaÃ§Ã£o",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Imagine um tecido: a <strong>CoesÃ£o</strong> sÃ£o as
                        fibras e o modo como elas se entrelaÃ§am (gramÃ¡tica). A{" "}
                        <strong>CoerÃªncia</strong> Ã© o padrÃ£o, a cor e a
                        utilidade do tecido (sentido).
                      </p>
                      <AlertBox tipo="info" titulo="O que a prova cobra?">
                        A banca quer saber se vocÃª identifica os{" "}
                        <strong>mecanismos</strong> que amarram o texto ou se
                        percebe quando o sentido foge Ã  lÃ³gica.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "DiferenÃ§a TÃ©cnica",
                  icone: <LuScale />,
                  conteudo: (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                        <h4 className="font-bold text-blue-600 mb-2">
                          CoesÃ£o (Capa/Forma)
                        </h4>
                        <p className="text-sm">
                          Uso de pronomes, conjunÃ§Ãµes, sinÃ´nimos e pontuaÃ§Ã£o
                          para ligar as frases.
                        </p>
                      </div>
                      <div className="p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                        <h4 className="font-bold text-emerald-600 mb-2">
                          CoerÃªncia (Interior/Sentido)
                        </h4>
                        <p className="text-sm">
                          Unidade lÃ³gica, ausÃªncia de contradiÃ§Ã£o e relevÃ¢ncia
                          das informaÃ§Ãµes.
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <Comparison
              title="A ImportÃ¢ncia do Nexo"
              left={{
                title: "Texto Incoerente",
                content:
                  "O tÃ©cnico consertou a turbina. O navio voou para o espaÃ§o sideral.",
                description:
                  "As frases estÃ£o ligadas, mas o conteÃºdo Ã© ilÃ³gico (coeso mas incoerente).",
                variant: "danger",
              }}
              right={{
                title: "Texto Coeso e Coerente",
                content:
                  "O tÃ©cnico consertou a turbina. GraÃ§as a isso, a embarcaÃ§Ã£o voltou a operar.",
                description:
                  "HÃ¡ nexo gramatical (GraÃ§as a isso) e lÃ³gico (operaÃ§Ã£o retomada).",
                variant: "success",
              }}
            />
          </section>

          {/* ââ SEÃÃO EXTRA M1: Mecanismos de CoesÃ£o âââ */}
          <section className="bg-card rounded-2xl border border-border p-5 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Os 5 Grandes Mecanismos de CoesÃ£o"
              variant="blue"
            />
            <ContentAccordion
              mode="stacked"
              slides={[
                {
                  titulo: "O que Ã© ReferÃªncia?",
                  icone: <LuLink />,
                  conteudo: (
                    <div className="space-y-3">
                      <p className="text-muted-foreground leading-relaxed">
                        ReferÃªncia Ã© o mecanismo pelo qual um elemento do texto
                        remete a outro â dentro do prÃ³prio texto (endofÃ³rica) ou
                        fora dele (exofÃ³rica). Divide-se em{" "}
                        <strong>anÃ¡fora</strong> (retoma o que jÃ¡ foi dito) e{" "}
                        <strong>catÃ¡fora</strong> (antecipa o que serÃ¡ dito).
                      </p>
                      <div className="p-3 bg-blue-500/5 rounded-xl border-l-4 border-blue-500 font-mono text-sm italic">
                        "A engenheira chegou.{" "}
                        <span className="text-blue-600 font-bold">Ela</span>{" "}
                        assumiu o posto." â 'ela' refere-se a 'a engenheira'.
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Como funciona a SubstituiÃ§Ã£o?",
                  icone: <LuActivity />,
                  conteudo: (
                    <div className="space-y-3">
                      <p className="text-muted-foreground leading-relaxed">
                        A substituiÃ§Ã£o troca um elemento por outro de valor
                        equivalente para evitar repetiÃ§Ã£o. Pode ser{" "}
                        <strong>nominal</strong>, <strong>verbal</strong> ou{" "}
                        <strong>oracional</strong>.
                      </p>
                      <div className="p-3 bg-emerald-500/5 rounded-xl border-l-4 border-emerald-500 font-mono text-sm italic">
                        "O relatÃ³rio tÃ©cnico foi entregue.{" "}
                        <span className="text-emerald-600 font-bold">
                          O documento
                        </span>{" "}
                        estava impecÃ¡vel." â substituiÃ§Ã£o nominal.
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "O que Ã© Elipse e por que cria fluidez?",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-3">
                      <p className="text-muted-foreground leading-relaxed">
                        A elipse Ã© a omissÃ£o de um termo recuperÃ¡vel pelo
                        contexto. Cria fluidez eliminando repetiÃ§Ãµes
                        desnecessÃ¡rias. Na CESGRANRIO, a elipse verbal
                        frequentemente Ã© marcada pela vÃ­rgula.
                      </p>
                      <div className="p-3 bg-cyan-500/5 rounded-xl border-l-4 border-cyan-500 font-mono text-sm italic">
                        "Maria aprovou a proposta; Pedro{" "}
                        <span className="text-cyan-600 font-bold">
                          [aprovou]
                        </span>{" "}
                        a minuta." â verbo elidido.
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Qual Ã© o papel dos Conectivos?",
                  icone: <LuZap />,
                  conteudo: (
                    <p className="text-muted-foreground leading-relaxed">
                      ConjunÃ§Ãµes e conectivos estabelecem relaÃ§Ãµes
                      semÃ¢ntico-lÃ³gicas: <strong>adiÃ§Ã£o</strong> (e, alÃ©m
                      disso), <strong>adversidade</strong> (mas, porÃ©m),{" "}
                      <strong>causalidade</strong> (porque, visto que),{" "}
                      <strong>concessÃ£o</strong> (embora, ainda que),{" "}
                      <strong>finalidade</strong> (para que). SÃ£o os tijolos da
                      arquitetura argumentativa.
                    </p>
                  ),
                },
                {
                  titulo: "Como a CoesÃ£o Lexical enriquece o texto?",
                  icone: <LuLibrary />,
                  conteudo: (
                    <div className="space-y-3">
                      <p className="text-muted-foreground leading-relaxed">
                        A coesÃ£o lexical usa relaÃ§Ãµes semÃ¢nticas:{" "}
                        <strong>sinonÃ­mia</strong> (petrÃ³leo / Ã³leo cru),{" "}
                        <strong>hiperonÃ­mia</strong> (combustÃ­vel para petrÃ³leo,
                        gÃ¡s e etanol), <strong>hiponÃ­mia</strong> (diesel como
                        espÃ©cie de combustÃ­vel) e <strong>reiteraÃ§Ã£o</strong>{" "}
                        intencional. Em textos da Petrobras, a hiperonÃ­mia Ã©
                        especialmente frequente.
                      </p>
                    </div>
                  ),
                },
              ]}
            />

            <FlipCard
              className="h-[430px] md:h-[350px]"
              frente={
                <div className="text-center space-y-3">
                  <div className="text-4xl">ð</div>
                  <div className="font-bold text-lg">AnÃ¡fora vs. CatÃ¡fora</div>
                  <div className="text-sm text-muted-foreground">
                    Clique para ver a diferenÃ§a essencial
                  </div>
                </div>
              }
              verso={
                <div className="space-y-4 text-sm">
                  <div className="p-3 bg-cyan-500/20 rounded-xl border border-cyan-500/30">
                    <p className="font-bold text-cyan-300 mb-1">
                      ANÃFORA â Retrovisor
                    </p>
                    <p className="text-zinc-200 italic">
                      "A turbina falhou.{" "}
                      <span className="text-cyan-300 font-bold">
                        O equipamento
                      </span>{" "}
                      foi substituÃ­do."
                    </p>
                    <p className="text-zinc-400 text-xs mt-1">
                      â 'O equipamento' retoma 'a turbina' (passado)
                    </p>
                  </div>
                  <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
                    <p className="font-bold text-blue-300 mb-1">
                      CATÃFORA â Farol
                    </p>
                    <p className="text-zinc-200 italic">
                      "<span className="text-blue-300 font-bold">Isto</span> foi
                      anunciado: nova perfuraÃ§Ã£o no prÃ©-sal."
                    </p>
                    <p className="text-zinc-400 text-xs mt-1">
                      â 'Isto' antecipa 'nova perfuraÃ§Ã£o no prÃ©-sal' (futuro)
                    </p>
                  </div>
                </div>
              }
              variant="dark"
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-5 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="CoesÃ£o e CoerÃªncia no Contexto Petrobras"
              variant="blue"
            />
            <CardCarousel
              cards={[
                {
                  icone: "ð",
                  title: "RelatÃ³rios TÃ©cnicos",
                  descricao:
                    "Documentos como relatÃ³rios de seguranÃ§a operacional exigem coesÃ£o referencial precisa â pronomes e conectivos ambÃ­guos podem gerar falhas na interpretaÃ§Ã£o de procedimentos crÃ­ticos.",
                },
                {
                  icone: "ð",
                  title: "Normas e Regulamentos",
                  descricao:
                    "Textos normativos usam elipse e substituiÃ§Ã£o para evitar repetiÃ§Ãµes do sujeito institucional, mantendo a objetividade sem comprometer a clareza das obrigaÃ§Ãµes.",
                },
                {
                  icone: "ðï¸",
                  title: "Comunicados Oficiais",
                  descricao:
                    "Comunicados ao mercado e notas Ã  imprensa dependem de coerÃªncia temÃ¡tica rigorosa: cada parÃ¡grafo deve progredir logicamente sem contradizer informaÃ§Ãµes anteriores.",
                },
                {
                  icone: "ð",
                  title: "Editais de Concurso",
                  descricao:
                    "Os prÃ³prios editais da CESGRANRIO/Petrobras exemplificam o uso correto de catÃ¡fora em artigos como: 'Os candidatos deverÃ£o observar o seguinte: [lista de regras]'.",
                },
                {
                  icone: "ð¬",
                  title: "Artigos CientÃ­ficos",
                  descricao:
                    "A coesÃ£o lexical por hiperonÃ­mia Ã© especialmente valorizada em textos de engenharia: 'equipamentos', 'sistemas', 'dispositivos' como hiperÃ´nimos de itens especÃ­ficos.",
                },
              ]}
            />
            <AlertBox tipo="info" titulo="EstratÃ©gia CESGRANRIO">
              QuestÃµes de coesÃ£o na CESGRANRIO frequentemente apresentam um
              trecho e pedem qual pronome ou conectivo pode ser{" "}
              <strong>substituÃ­do sem alterar o sentido</strong>. Identifique
              sempre a relaÃ§Ã£o semÃ¢ntica (retomada, oposiÃ§Ã£o, causa) antes de
              escolher.
            </AlertBox>
          </section>

          <QuizInterativo
            questoes={quizM1}
            titulo="FixaÃ§Ã£o - MÃ³dulo 1"
            icone="ð¯"
            numero={1}
            variant="blue"
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          />
        </div>
      </TabsContent>

      {/* ââ MÃDULO 2: O PODER DO RETROVISOR ââââââââââââââââââââ */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <ModuleBanner
          numero={2}
          titulo="O Poder do Retrovisor"
          descricao="Domine a AnÃ¡fora: o recurso de retomar termos anteriores para evitar a repetiÃ§Ã£o cansativa."
          gradiente="bg-gradient-to-br from-cyan-700 to-teal-800"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-5 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="ReferenciaÃ§Ã£o AnafÃ³rica"
              variant="cyan"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "O que Ã© AnÃ¡fora?",
                  icone: <LuCompass />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        AnÃ¡fora (do grego <i>ana</i> = atrÃ¡s) Ã© o fenÃ´meno em
                        que um termo aponta para outro jÃ¡ citado. Ã o
                        "retrovisor" do texto.
                      </p>
                      <div className="p-4 bg-muted/50 rounded-xl border-l-4 border-cyan-500 font-medium">
                        "A Petrobras investe.{" "}
                        <span className="text-cyan-600 font-bold underline">
                          ELA
                        </span>{" "}
                        busca inovaÃ§Ã£o."
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "TÃ©cnicas de Retomada",
                  icone: <LuLibrary />,
                  conteudo: (
                    <CardCarousel
                      cards={[
                        {
                          icone: "ð¤",
                          title: "Pronominal",
                          descricao:
                            "Uso de pronomes (ele, esse, o qual). O mais comum em provas.",
                        },
                        {
                          icone: "ð",
                          title: "SinonÃ­mica",
                          descricao:
                            "Troca por sinÃ´nimo (PetrÃ³leo -> Ouro Negro). MantÃ©m o nÃ­vel do texto.",
                        },
                        {
                          icone: "ð¦",
                          title: "EpÃ­teto",
                          descricao:
                            "ExpressÃµes consagradas (Rio de Janeiro -> A Cidade Maravilhosa).",
                        },
                      ]}
                    />
                  ),
                },
              ]}
            />
            <AlertBox tipo="warning" titulo="Pulo do Gato!">
              Os demonstrativos com "SS" (Esse, Essa, Isso) sÃ£o tipicamente
              anafÃ³ricos. Use-os para olhar para trÃ¡s!
            </AlertBox>
          </section>

          <QuizInterativo
            questoes={quizM2}
            titulo="FixaÃ§Ã£o - MÃ³dulo 2"
            icone="ð¯"
            numero={2}
            variant="cyan"
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          />
        </div>
      </TabsContent>

      {/* ââ MÃDULO 3: O FAROL DO SENTIDO âââââââââââââââââââââââ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <ModuleBanner
          numero={3}
          titulo="O Farol do Sentido"
          descricao="A CatÃ¡fora prepara o leitor para o que virÃ¡. Aprenda a antecipar ideias com elegÃ¢ncia."
          gradiente="bg-gradient-to-br from-blue-600 to-cyan-700"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-5 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="AntecipaÃ§Ã£o (CatÃ¡fora)"
              variant="blue"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "ConceituaÃ§Ã£o",
                  icone: <LuCompass />,
                  conteudo: (
                    <p className="text-muted-foreground leading-relaxed">
                      A <strong>CatÃ¡fora</strong> Ã© o oposto da anÃ¡fora: ela
                      antecipa um termo que ainda serÃ¡ escrito. Gera foco e
                      expectativa no leitor.
                    </p>
                  ),
                },
                {
                  titulo: "O Sinal do 'T'",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <p>MnemÃ´nico para a prova da Petrobras:</p>
                      <div className="p-6 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-center italic text-xl font-bold">
                        Is
                        <span className="text-blue-600 underline text-2xl">
                          T
                        </span>
                        o / Es
                        <span className="text-blue-600 underline text-2xl">
                          T
                        </span>
                        e / Es
                        <span className="text-blue-600 underline text-2xl">
                          T
                        </span>
                        a
                      </div>
                      <p className="text-sm text-center">
                        Pronomens com <span className="font-bold">T</span> olham
                        para a <span className="font-bold underline">T</span>
                        extura que vem di
                        <span className="font-bold underline">T</span>a depois.
                      </p>
                    </div>
                  ),
                },
              ]}
            />
            <FlipCard
              frente={
                <div className="text-center font-bold">Exemplo ClÃ¡ssico</div>
              }
              verso={
                <div className="space-y-2">
                  <p className="text-zinc-100 italic">
                    "Meu desejo Ã©{" "}
                    <span className="text-primary font-black">ISTO:</span> sua
                    aprovaÃ§Ã£o."
                  </p>
                  <p className="text-xs text-zinc-400">
                    O 'ISTO' nÃ£o faz sentido sozinho; ele 'pede' o que vem
                    depois.
                  </p>
                </div>
              }
              variant="dark"
            />
          </section>

          <QuizInterativo
            questoes={quizM3}
            titulo="FixaÃ§Ã£o - MÃ³dulo 3"
            icone="ð¯"
            numero={3}
            variant="blue"
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </div>
      </TabsContent>

      {/* ââ MÃDULO 4: O SILÃNCIO ELOQUENTE ââââââââââââââââââââââ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner
          numero={4}
          titulo="O SilÃªncio Eloquente"
          descricao="Ãs vezes, nÃ£o dizer nada Ã© a melhor forma de conectar. Domine Elipse e ZÃªugma."
          gradiente="bg-gradient-to-br from-teal-600 to-emerald-700"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={4}
              title="CoesÃ£o por OmissÃ£o"
              variant="emerald"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Elipse",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        OmissÃ£o de um termo subentendido pelo contexto
                        (frequentemente o sujeito).
                      </p>
                      <p className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20 font-mono text-sm italic">
                        "[NÃ³s] Fizemos os testes. [NÃ³s] Passamos."
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "ZÃªugma",
                  icone: <LuAnchor />,
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        OmissÃ£o de um termo que <strong>jÃ¡ apareceu</strong> no
                        texto.
                      </p>
                      <p className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20 font-mono text-sm italic">
                        "Ela gosta de cafÃ©; eu, [gosto] de chÃ¡."
                      </p>
                    </div>
                  ),
                },
              ]}
            />
            <AlertBox tipo="info" titulo="Macete da VÃ­rgula">
              A vÃ­rgula costuma marcar o lugar do verbo omitido no ZÃªugma. Fique
              atento a essa pontuaÃ§Ã£o na Cesgranrio!
            </AlertBox>
          </section>

          <QuizInterativo
            questoes={quizM4}
            titulo="FixaÃ§Ã£o - MÃ³dulo 4"
            icone="ð¯"
            numero={4}
            variant="emerald"
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
          />
        </div>
      </TabsContent>

      {/* ââ MÃDULO 5: SUBSTITUIÃÃES DE ELITE âââââââââââââââââââââ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="SubstituiÃ§Ãµes de Elite"
          descricao="NominalizaÃ§Ã£o, HiperonÃ­mia e Palavras-SumÃ¡rio: o arsenal avanÃ§ado de coesÃ£o lexical."
          gradiente="bg-gradient-to-br from-blue-700 to-sky-800"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={5}
              title="CoesÃ£o Lexical"
              variant="blue"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "NominalizaÃ§Ã£o",
                  icone: <LuActivity />,
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Transformar um verbo (aÃ§Ã£o) em substantivo para retomar
                        a ideia.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-background border rounded-xl text-center">
                          <span className="text-xs text-muted-foreground block">
                            AÃ§Ã£o
                          </span>
                          <span className="font-bold">
                            "O poÃ§o explodiu..."
                          </span>
                        </div>
                        <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl text-center">
                          <span className="text-xs text-primary block">
                            Retomada
                          </span>
                          <span className="font-bold">"A EXPLOSÃO..."</span>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Palavras-Suporte (RÃ³tulos)",
                  icone: <LuLink />,
                  conteudo: (
                    <p className="text-muted-foreground">
                      Palavras como{" "}
                      <strong>
                        "Fato", "Evento", "CircunstÃ¢ncia", "Ideia"
                      </strong>{" "}
                      que empacotam parÃ¡grafos inteiros.
                    </p>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM5}
            titulo="FixaÃ§Ã£o - MÃ³dulo 5"
            icone="ð¯"
            numero={5}
            variant="blue"
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
          />
        </div>
      </TabsContent>

      {/* ââ MÃDULO 6: A DANÃA DOS CONECTIVOS ââââââââââââââââââââ */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <ModuleBanner
          numero={6}
          titulo="A DanÃ§a dos Conectivos"
          descricao="TransiÃ§Ãµes perfeitas: aprenda a usar conjunÃ§Ãµes para dar ritmo e lÃ³gica ao seu texto."
          gradiente="bg-gradient-to-br from-orange-600 to-amber-700"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={6}
              title="CoesÃ£o Sequencial"
              variant="amber"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "O Papel da ConjunÃ§Ã£o",
                  icone: <LuZap />,
                  conteudo: (
                    <p className="text-muted-foreground">
                      A CoesÃ£o Sequencial cria a progressÃ£o do tempo e das
                      ideias atravÃ©s dos conectivos. Sem eles, o texto Ã© um
                      amontoado de fatos isolados.
                    </p>
                  ),
                },
                {
                  titulo: "Tabela de Elite",
                  icone: <LuCheck />,
                  conteudo: (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="p-3 text-left">Valor</th>
                            <th className="p-3 text-left">
                              Conectivos Principais
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b bg-muted/30">
                            <td className="p-3 font-bold">AdiÃ§Ã£o</td>
                            <td className="p-3">
                              E, nem, bem como, nÃ£o sÃ³... mas tambÃ©m.
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-3 font-bold">Causa</td>
                            <td className="p-3">
                              Pois, porque, visto que, jÃ¡ que, porquanto.
                            </td>
                          </tr>
                          <tr className="border-b bg-muted/30">
                            <td className="p-3 font-bold">ConclusÃ£o</td>
                            <td className="p-3">
                              Logo, portanto, entÃ£o, por conseguinte, destarte.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM6}
            titulo="FixaÃ§Ã£o - MÃ³dulo 6"
            icone="ð¯"
            numero={6}
            variant="amber"
            onComplete={(score) => handleModuleComplete("modulo-6", score)}
          />
        </div>
      </TabsContent>

      {/* ââ MÃDULO 7: CONCESSÃO & OPOSIÃÃO âââââââââââââââââââââ */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <ModuleBanner
          numero={7}
          titulo="ConcessÃ£o & OposiÃ§Ã£o"
          descricao="O divisor de Ã¡guas da Cesgranrio: diferencie a forÃ§a do 'Mas' da resiliÃªncia do 'Embora'."
          gradiente="bg-gradient-to-br from-red-600 to-rose-800"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={7}
              title="O Grande Duelo"
              variant="rose"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Mas (Adversativo)",
                  icone: <LuZap />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        O 'Mas' introduz um fato que <strong>vence</strong> ou
                        bloqueia o anterior.
                      </p>
                      <p className="font-bold p-3 bg-red-500/5 rounded-lg border-l-4 border-red-500 italic">
                        "Estudou muito, MAS nÃ£o passou." (Foco no fracasso)
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Embora (Concessivo)",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        O 'Embora' introduz um fato que Ã© ignorado pela oraÃ§Ã£o
                        principal.
                      </p>
                      <p className="font-bold p-3 bg-emerald-500/5 rounded-lg border-l-4 border-emerald-500 italic">
                        "EMBORA nÃ£o tenha estudado, passou." (Foco no sucesso)
                      </p>
                    </div>
                  ),
                },
              ]}
            />
            <AlertBox tipo="danger" titulo="NÃ£o confunda!">
              Trocar 'Mas' por 'Embora' exige mudar o verbo do Indicativo para o
              Subjuntivo. A banca ADORA isso!
            </AlertBox>
          </section>

          <QuizInterativo
            questoes={quizM7}
            titulo="FixaÃ§Ã£o - MÃ³dulo 7"
            icone="ð¯"
            numero={7}
            variant="rose"
            onComplete={(score) => handleModuleComplete("modulo-7", score)}
          />
        </div>
      </TabsContent>

      {/* ââ MÃDULO 8: ARQUITETURA DA COERÃNCIA âââââââââââââââââ */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <ModuleBanner
          numero={8}
          titulo="Arquitetura da CoerÃªncia"
          descricao="A harmonia lÃ³gica: entenda o PrincÃ­pio da NÃ£o-ContradiÃ§Ã£o e a ConsistÃªncia PragmÃ¡tica."
          gradiente="bg-gradient-to-br from-emerald-600 to-teal-800"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={8}
              title="LÃ³gica Interna"
              variant="emerald"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "NÃ£o-ContradiÃ§Ã£o",
                  icone: <LuCheck />,
                  conteudo: (
                    <p className="text-muted-foreground">
                      Um texto nÃ£o pode afirmar 'A' e logo em seguida defender
                      'nÃ£o A' sem um motivo lÃ³gico ou ressalva explÃ­cita.
                    </p>
                  ),
                },
                {
                  titulo: "CoerÃªncia PragmÃ¡tica",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <p className="text-muted-foreground italic">
                      "O navio de aÃ§o flutuou levemente como uma pluma sobre a
                      lava do vulcÃ£o." - A frase pode ser coesa, mas fere o
                      nosso conhecimento de mundo (incoerÃªncia externa).
                    </p>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM8}
            titulo="FixaÃ§Ã£o - MÃ³dulo 8"
            icone="ð¯"
            numero={8}
            variant="emerald"
            onComplete={(score) => handleModuleComplete("modulo-8", score)}
          />
        </div>
      </TabsContent>

      {/* ââ MÃDULO 9: PROGRESSÃO E RELEVÃNCIA ââââââââââââââââââ */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <ModuleBanner
          numero={9}
          titulo="ProgressÃ£o e RelevÃ¢ncia"
          descricao="Evite o texto circular: aprenda a evoluir ideias sem perder a conexÃ£o temÃ¡tica."
          gradiente="bg-gradient-to-br from-teal-600 to-cyan-800"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={9}
              title="O Movimento do Texto"
              variant="emerald"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "ProgressÃ£o",
                  icone: <LuActivity />,
                  conteudo: (
                    <p className="text-muted-foreground">
                      O texto deve caminhar. Cada parÃ¡grafo deve somar uma
                      informaÃ§Ã£o nova (rema) ao que jÃ¡ era conhecido (tema).
                    </p>
                  ),
                },
              ]}
            />
            <AlertBox tipo="warning" titulo="O Erro do CÃ­rculo">
              A <strong>Tautologia</strong> (vÃ­cio de linguagem) Ã© o inimigo da
              progressÃ£o: falar o mesmo com outras palavras sem avanÃ§ar no
              sentido.
            </AlertBox>
          </section>

          <QuizInterativo
            questoes={quizM9}
            titulo="FixaÃ§Ã£o - MÃ³dulo 9"
            icone="ð¯"
            numero={9}
            variant="emerald"
            onComplete={(score) => handleModuleComplete("modulo-9", score)}
          />
        </div>
      </TabsContent>

      {/* ââ MÃDULO 10: ARENA DE ELITE ââââââââââââââââââââââââââ */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <ModuleBanner
          numero={10}
          titulo="Arena de Elite"
          descricao="Simulado Final: Teste seus conhecimentos em questÃµes de alto nÃ­vel da CESGRANRIO."
          gradiente="bg-gradient-to-br from-slate-800 to-slate-950"
        />

        <div className="space-y-[50px]">
          <AlertBox tipo="warning" titulo="Dica Final">
            Nas provas da Petrobras, a coesÃ£o referencial (AnÃ¡fora/CatÃ¡fora) Ã© o
            tÃ³pico que mais cai. Revise bem os pronomes demonstrativos!
          </AlertBox>

          <QuizInterativo
            questoes={quizM10}
            titulo="Simulado Final"
            icone="ð"
            numero={10}
            variant="indigo"
            onComplete={(score) => handleModuleComplete("modulo-10", score)}
          />
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
