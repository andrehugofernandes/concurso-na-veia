"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
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
  LessonTabs,
  ModuleSummaryCarouselNew,
  VideoModal,
  MusicPlayerCard,
  ProgressIndicator,
  Activity,
} from "../shared";

import {
  LuBookOpen,
  LuTarget,
  LuTrophy,
  LuTriangleAlert,
  LuSearch,
  LuLink,
  LuEye,
  LuCpu,
  LuCirclePlay as LuPlayCircle,
  LuMusic,
  LuBrain,
  LuDna,
  LuCheck,
  LuAnchor,
  LuCompass,
  LuZap,
  LuShuffle,
  LuScale,
  LuActivity,
} from "react-icons/lu";

// Data
import {
  QUIZ_M1_COESAO,
  QUIZ_M2_COERENCIA,
  QUIZ_M3_PRATICO,
  QUIZ_M4_APROFUNDAMENTO,
  QUIZ_FINAL_SIMULADO,
} from "./data/coesao-coerencia-quizzes";

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
  const MODULE_DEFS = [
    { id: "modulo-1", label: "Módulo 1", titulo: "O Tecido do Texto" },
    { id: "modulo-2", label: "Módulo 2", titulo: "O Poder do Retrovisor" },
    { id: "modulo-3", label: "Módulo 3", titulo: "O Farol do Sentido" },
    { id: "modulo-4", label: "Módulo 4", titulo: "O Silêncio Eloquente" },
    { id: "modulo-5", label: "Módulo 5", titulo: "Substituições de Elite" },
    { id: "modulo-6", label: "Módulo 6", titulo: "A Dança dos Conectivos" },
    { id: "modulo-7", label: "Módulo 7", titulo: "Concessão & Oposição" },
    { id: "modulo-8", label: "Módulo 8", titulo: "Arquitetura da Coerência" },
    { id: "modulo-9", label: "Módulo 9", titulo: "Progressão e Relevância" },
    { id: "modulo-10", label: "Módulo 10", titulo: "Arena de Elite" },
  ];

  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(),
  );
  const [hasSyncedInitial, setHasSyncedInitial] = useState(false);

  // Quizzes dinâmicos (seleção aleatória do pool)
  const [quizM1, setQuizM1] = useState(QUIZ_M1_COESAO);
  const [quizM2, setQuizM2] = useState(QUIZ_M2_COERENCIA);
  const [quizM3, setQuizM3] = useState(QUIZ_M3_PRATICO);
  const [quizM4, setQuizM4] = useState(QUIZ_M4_APROFUNDAMENTO);
  const [quizFinal, setQuizFinal] = useState(QUIZ_FINAL_SIMULADO);

  useEffect(() => {
    setQuizM1(getRandomQuestions(QUIZ_M1_COESAO, 4));
    setQuizM2(getRandomQuestions(QUIZ_M2_COERENCIA, 4));
    setQuizM3(getRandomQuestions(QUIZ_M3_PRATICO, 2));
    setQuizM4(getRandomQuestions(QUIZ_M4_APROFUNDAMENTO, 3));
    setQuizFinal(getRandomQuestions(QUIZ_FINAL_SIMULADO, 10));
  }, [isLessonCompleted]);

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
        setActiveTab(MODULE_DEFS[index + 1].id);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        onComplete?.();
      }
    }
  };

  const isModuleUnlocked = (index: number) => {
    if (isLessonCompleted) return true;
    if (index === 0) return true;
    return completedModules.has(MODULE_DEFS[index - 1].id);
  };

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
      isCompleted={isLessonCompleted}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
      currentProgress={Math.round(
        (completedModules.size / MODULE_DEFS.length) * 100,
      )}
    >
      {/* MÓDULO 1: O TECIDO DO TEXTO */}
      <Activity mode={activeTab === "modulo-1" ? "visible" : "hidden"}>
        <div className="space-y-[40px] animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={1}
            titulo="O Tecido do Texto"
            descricao="Entenda a diferença fundamental entre Coesão (forma) e Coerência (sentido) no padrão 2026."
            gradiente="bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600"
          />

          <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-10">
            <ModuleSectionHeader
              index={1}
              title="A Dualidade Textual"
              description="Bechara define o texto como uma unidade de sentido. Vamos decompor essa unidade."
              variant="blue"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FlipCard
                frente="O que é Coesão?"
                verso="É a conexão física entre as palavras e frases através de recursos gramaticais (pronomes, conjunções, concordância)."
                icone={<LuLink className="w-8 h-8 text-blue-500" />}
              />
              <FlipCard
                frente="O que é Coerência?"
                verso="É a harmonia lógica das ideias. Um texto pode ser coeso mas incoerente (ligado, mas sem pé nem cabeça)."
                icone={<LuBrain className="w-8 h-8 text-indigo-500" />}
              />
            </div>

            <AlertBox tipo="info" titulo="O Conceito de Unidade">
              <p className="text-lg">
                Imagine um tecido: a **Coesão** são os fios e pontos de costura.
                A **Coerência** é o desenho que o tecido forma. Sem fios, o
                desenho não se sustenta. Sem desenho, os fios são inúteis.
              </p>
            </AlertBox>
          </section>

          <QuizInterativo
            questoes={quizM1}
            titulo="Check-point: Fundamentos"
            icone="📝"
            numero={1}
            variant="blue"
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          />
        </div>
      </Activity>

      {/* MÓDULO 2: O PODER DO RETROVISOR (ANÁFORA) */}
      <Activity mode={activeTab === "modulo-2" ? "visible" : "hidden"}>
        <div className="space-y-[40px] animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={2}
            titulo="O Poder do Retrovisor"
            descricao="Domine a Anáfora: o recurso de retomar termos anteriores para evitar a repetição cansativa."
            gradiente="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-600"
          />

          <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Referenciação Anafórica"
              description="Como olhar para trás garante a fluidez do texto."
              variant="indigo"
            />

            <div className="bg-muted/30 p-8 rounded-3xl border border-border/50">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-indigo-500/10 rounded-xl">
                  <LuAnchor className="w-8 h-8 text-indigo-600" />
                </div>
                <h4 className="text-2xl font-black">A Âncora Textual</h4>
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed">
                A **Anáfora** ocorre quando um termo (o anafórico) aponta para
                um termo já citado (o antecedente). É o mecanismo de coesão mais
                cobrado pela Cesgranrio.
              </p>
            </div>

            <ContentAccordion
              titulo="Mecanismos de Anáfora"
              icone="⚓"
              slides={[
                {
                  titulo: "Pronominal",
                  icone: "👤",
                  conteudo:
                    "Uso de pronomes (ele, seu, este, o qual) para retomar nomes.",
                  exemplo: "A Petrobras investe em IA. Ela busca eficiência.",
                },
                {
                  titulo: "Sinonímica",
                  icone: "📚",
                  conteudo:
                    "Retomada por sinônimos ou expressões equivalentes.",
                  exemplo: "O petróleo subiu. O ouro negro está valorizado.",
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM1}
            titulo="Check-point: Anáfora"
            icone="⚓"
            numero={2}
            variant="indigo"
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          />
        </div>
      </Activity>

      {/* MÓDULO 3: O FAROL DO SENTIDO (CATÁFORA) */}
      <Activity mode={activeTab === "modulo-3" ? "visible" : "hidden"}>
        <div className="space-y-[40px] animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={3}
            titulo="O Farol do Sentido"
            descricao="A Catáfora prepara o leitor para o que virá. Aprenda a antecipar ideias com elegância."
            gradiente="bg-gradient-to-br from-cyan-600 via-blue-500 to-indigo-600"
          />

          <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Antecipação Textual"
              description="A catáfora cria expectativa e organiza a revelação de informações."
              variant="cyan"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-8 bg-cyan-500/5 border border-cyan-500/10 rounded-3xl">
                <LuCompass className="w-12 h-12 text-cyan-600 mb-6" />
                <h4 className="text-2xl font-black mb-4">Catáfora: O Farol</h4>
                <p className="text-lg text-muted-foreground">
                  Diferente da anáfora, a **Catáfora** aponta para frente. O
                  pronome aparece antes do nome que ele representa.
                </p>
              </div>
              <div className="p-8 bg-card border border-border rounded-3xl flex flex-col justify-center italic text-2xl font-medium">
                <p>
                  "Eu só quero{" "}
                  <span className="text-cyan-600 font-bold">ISTO</span>: sua{" "}
                  <span className="text-indigo-600 font-bold underline">
                    APROVAÇÃO
                  </span>
                  ."
                </p>
                <span className="text-sm mt-4 text-muted-foreground not-italic">
                  *ISTO* antecipa *APROVAÇÃO*.
                </span>
              </div>
            </div>
          </section>

          <QuizInterativo
            questoes={quizM1}
            titulo="Check-point: Catáfora"
            icone="🔦"
            numero={3}
            variant="cyan"
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </div>
      </Activity>

      {/* MÓDULO 4: O SILÊNCIO ELOQUENTE (ELIPSE E ZÊUGMA) */}
      <Activity mode={activeTab === "modulo-4" ? "visible" : "hidden"}>
        <div className="space-y-[40px] animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={4}
            titulo="O Silêncio Eloquente"
            descricao="Às vezes, não dizer nada é a melhor forma de conectar. Domine Elipse e Zêugma."
            gradiente="bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-700"
          />

          <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-10">
            <ModuleSectionHeader
              index={1}
              title="Coesão por Omissão"
              description="Omitir termos conhecidos torna o texto ágil e evita a redundância."
              variant="indigo"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-2xl font-black">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                    1
                  </div>
                  Elipse
                </div>
                <p className="text-muted-foreground text-lg">
                  Omissão de um termo que nunca apareceu, mas é óbvio no
                  contexto.
                </p>
                <div className="p-6 bg-muted/50 rounded-2xl border border-border italic font-bold">
                  "(Nós) Estaremos na plataforma amanhã."
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-2xl font-black">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    2
                  </div>
                  Zêugma
                </div>
                <p className="text-muted-foreground text-lg">
                  Omissão de um termo que **já apareceu** anteriormente.
                </p>
                <div className="p-6 bg-muted/50 rounded-2xl border border-border italic font-bold">
                  "Eu prefiro ler; você, (prefere) ver vídeos."
                </div>
              </div>
            </div>
          </section>

          <QuizInterativo
            questoes={quizM4}
            titulo="Check-point: Omissão"
            icone="😶"
            numero={4}
            variant="indigo"
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
          />
        </div>
      </Activity>

      {/* MÓDULO 5: SUBSTITUIÇÕES DE ELITE */}
      <Activity mode={activeTab === "modulo-5" ? "visible" : "hidden"}>
        <div className="space-y-[40px] animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={5}
            titulo="Substituições de Elite"
            descricao="Nominalização, Hiperonímia e Palavras-Sumário: o arsenal avançado de coesão lexical."
            gradiente="bg-gradient-to-br from-blue-700 via-indigo-600 to-purple-600"
          />

          <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Coesão Lexical Avançada"
              description="Use o vocabulário para amarrar ideias complexas."
              variant="blue"
            />

            <ContentAccordion
              titulo="Recursos de Elite"
              icone="🏆"
              slides={[
                {
                  titulo: "Nominalização",
                  icone: "📝",
                  conteudo:
                    "Transformar um verbo em substantivo para retomar a ação anterior.",
                  exemplo:
                    "A empresa decidiu *diversificar*. Essa *diversificação* é estratégica.",
                },
                {
                  titulo: "Palavras-Sumário",
                  icone: "📦",
                  conteudo:
                    "Usar termos genéricos (fato, situação, processo) para resumir ideias inteiras.",
                  exemplo:
                    "O dólar subiu e a bolsa caiu. Esse *cenário* preocupa.",
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM4}
            titulo="Check-point: Léxico"
            icone="🧠"
            numero={5}
            variant="blue"
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
          />
        </div>
      </Activity>

      {/* MÓDULO 6: A DANÇA DOS CONECTIVOS (COESÃO SEQUENCIAL) */}
      <Activity mode={activeTab === "modulo-6" ? "visible" : "hidden"}>
        <div className="space-y-[40px] animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={6}
            titulo="A Dança dos Conectivos"
            descricao="Transições perfeitas: aprenda a usar conjunções e advérbios para dar ritmo e lógica ao texto."
            gradiente="bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-600"
          />

          <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-10">
            <ModuleSectionHeader
              index={1}
              title="Operadores Argumentativos"
              description="Conectivos não apenas ligam, eles dão a direção do argumento."
              variant="indigo"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-blue-500/5 border border-blue-200/20 rounded-2xl">
                <h4 className="font-bold text-blue-600 mb-2">
                  Causa/Explicação
                </h4>
                <p className="text-sm text-muted-foreground italic">
                  "Pois, porque, porquanto, visto que."
                </p>
              </div>
              <div className="p-6 bg-emerald-500/5 border border-emerald-200/20 rounded-2xl">
                <h4 className="font-bold text-emerald-600 mb-2">Conclusão</h4>
                <p className="text-sm text-muted-foreground italic">
                  "Portanto, logo, por conseguinte, então."
                </p>
              </div>
              <div className="p-6 bg-amber-500/5 border border-amber-200/20 rounded-2xl">
                <h4 className="font-bold text-amber-600 mb-2">Consequência</h4>
                <p className="text-sm text-muted-foreground italic">
                  "De modo que, de sorte que, tanto que."
                </p>
              </div>
            </div>
          </section>

          <QuizInterativo
            questoes={quizM1}
            titulo="Check-point: Conectivos"
            icone="🔗"
            numero={6}
            variant="indigo"
            onComplete={(score) => handleModuleComplete("modulo-6", score)}
          />
        </div>
      </Activity>

      {/* MÓDULO 7: CONCESSÃO & OPOSIÇÃO */}
      <Activity mode={activeTab === "modulo-7" ? "visible" : "hidden"}>
        <div className="space-y-[40px] animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={7}
            titulo="Concessão & Oposição"
            descricao="O divisor de águas da Cesgranrio: diferencie a força do 'Mas' da resiliência do 'Embora'."
            gradiente="bg-gradient-to-br from-red-600 via-orange-600 to-yellow-600"
          />

          <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="O Confronto Lógico"
              description="Adversativas vs Concessivas: como a banca te desafia."
              variant="red"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-red-500/5 border border-red-500/20 rounded-3xl">
                <h4 className="text-2xl font-black mb-4 flex items-center gap-2">
                  <LuScale /> Adversativas (Mas)
                </h4>
                <p className="text-muted-foreground">
                  A segunda ideia ganha da primeira. É uma oposição forte.
                </p>
                <div className="mt-4 p-4 bg-background rounded-xl italic font-bold">
                  "Estudou, mas não passou." (Fato principal: NÃO passou).
                </div>
              </div>
              <div className="p-8 bg-orange-500/5 border border-orange-500/20 rounded-3xl">
                <h4 className="text-2xl font-black mb-4 flex items-center gap-2">
                  <LuZap /> Concessivas (Embora)
                </h4>
                <p className="text-muted-foreground">
                  A primeira ideia é um obstáculo que não impede a segunda.
                </p>
                <div className="mt-4 p-4 bg-background rounded-xl italic font-bold">
                  "Embora não tenha estudado, passou." (Fato principal: PASSOU).
                </div>
              </div>
            </div>
          </section>

          <QuizInterativo
            questoes={quizM3}
            titulo="Check-point: Concessão"
            icone="⚖️"
            numero={7}
            variant="red"
            onComplete={(score) => handleModuleComplete("modulo-7", score)}
          />
        </div>
      </Activity>

      {/* MÓDULO 8: ARQUITETURA DA COERÊNCIA */}
      <Activity mode={activeTab === "modulo-8" ? "visible" : "hidden"}>
        <div className="space-y-[40px] animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={8}
            titulo="Arquitetura da Coerência"
            descricao="O plano do conteúdo: entenda os princípios da Não-Contradição e da Relevância."
            gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
          />

          <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-10">
            <ModuleSectionHeader
              index={1}
              title="Os Pilares do Sentido"
              description="Segundo Bechara e Koch, a coerência é construída pelo leitor."
              variant="emerald"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FlipCard
                frente="Anáfora (Retrovisor)"
                verso="Retoma um termo já citado no texto. Evita repetições desnecessárias."
                icone="🔙"
              />
              <FlipCard
                frente="Catáfora (Farol)"
                verso="Antecipa um termo que ainda será apresentado. Cria expectativa."
                icone="🔜"
              />
              <FlipCard
                frente="Continuidade"
                verso="O texto deve manter os conceitos já apresentados vivos na memória do leitor."
                icone="🔄"
              />
            </div>
          </section>

          <QuizInterativo
            questoes={quizM2}
            titulo="Check-point: Coerência"
            icone="🧠"
            numero={8}
            variant="emerald"
            onComplete={(score) => handleModuleComplete("modulo-8", score)}
          />
        </div>
      </Activity>

      {/* MÓDULO 9: PROGRESSÃO E RELEVÂNCIA */}
      <Activity mode={activeTab === "modulo-9" ? "visible" : "hidden"}>
        <div className="space-y-[40px] animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={9}
            titulo="Progressão e Relevância"
            descricao="Aprenda a fazer o texto caminhar (Novidade) sem perder o fio da meada (Continuidade)."
            gradiente="bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600"
          />

          <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Âncora Textual: Anáfora vs Catáfora"
              variant="indigo"
              className="mb-8"
            />
            <ModuleSectionHeader
              index={1}
              title="O Equilíbrio do Texto"
              description="Novidade vs Manutenção Temática."
              variant="teal"
            />

            <div className="bg-primary/5 rounded-3xl p-10 border border-primary/10">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-800 shadow-xl flex items-center justify-center text-5xl">
                  🧶
                </div>
                <div className="flex-1 space-y-4">
                  <h4 className="text-2xl font-black">O Fio de Ariadne</h4>
                  <p className="text-xl text-muted-foreground">
                    Um texto coerente é um labirinto onde o leitor sempre
                    encontra a saída. A cada frase, você traz algo novo
                    (Progressão), mas amarrado ao que disse antes
                    (Continuidade).
                  </p>
                </div>
              </div>
            </div>

            <AlertBox tipo="warning" titulo="Erro Fatal">
              <p>
                Muitos candidatos andam em círculos (redundância) ou pulam de
                assunto sem aviso (incoerência por falta de relevância).
              </p>
            </AlertBox>
          </section>

          <QuizInterativo
            questoes={quizM2}
            titulo="Check-point: Fluxo"
            icone="🌊"
            numero={9}
            variant="teal"
            onComplete={(score) => handleModuleComplete("modulo-9", score)}
          />
        </div>
      </Activity>

      {/* MÓDULO 10: ARENA DE ELITE */}
      <Activity mode={activeTab === "modulo-10" ? "visible" : "hidden"}>
        <div className="space-y-[40px] animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ModuleBanner
            numero={10}
            titulo="Arena de Elite"
            descricao="Consolidação final: 10 questões inéditas padrão Cesgranrio 2026 para zerar a matéria."
            gradiente="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900"
          />

          <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Resumo Visual Final"
              description="A revisão estratégica em 10 segundos."
              variant="indigo"
            />

            <ModuleSummaryCarouselNew
              tituloAula="Coesão e Coerência"
              materia="Língua Portuguesa"
              profissao="Técnico de Operação"
              moduloNome="Premium"
              images={[
                {
                  title: "Mapa Mental: Coesão Referencial",
                  type: "Mapa Mental",
                  placeholderColor: "bg-blue-500",
                  imageUrl:
                    "/images/mapa-mental/coesao_referencial_1771465579878.png",
                },
                {
                  title: "Infográfico: Anáfora vs Catáfora",
                  type: "Infográfico",
                  placeholderColor: "bg-indigo-500",
                  imageUrl:
                    "/images/mapa-mental/anafora_catafora_1771466182917.png",
                },
                {
                  title: "Esquema: Elipse e Zêugma",
                  type: "Mapa Mental",
                  placeholderColor: "bg-slate-500",
                  imageUrl:
                    "/images/mapa-mental/elipse_zeugma_1771466156558.png",
                },
                {
                  title: "Dicas de Coesão: Palavras-Sumário",
                  type: "Mapa Mental",
                  placeholderColor: "bg-gray-500",
                  imageUrl:
                    "/images/mapa-mental/palavras_sumario_1771465535398.png",
                },
                {
                  title: "Mapa Mental: Coesão Lexical",
                  type: "Mapa Mental",
                  placeholderColor: "bg-blue-500",
                  imageUrl:
                    "/images/mapa-mental/coesao_lexical_1771466121406.png",
                },
                {
                  title: "Diagrama: Coerência Externa",
                  type: "Diagrama",
                  placeholderColor: "bg-cyan-500",
                },
                {
                  title: "Checklist: A prova da Cesgranrio",
                  type: "Card",
                  placeholderColor: "bg-amber-500",
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizFinal}
            titulo="Simulado de Elite: Coesão e Coerência"
            icone="🏆"
            numero={10}
            variant="indigo"
            onComplete={(score) => handleModuleComplete("modulo-10", score)}
          />

          {/* Fim da Aula */}
          <section className="mt-12 text-center p-12 bg-indigo-500/5 rounded-[40px] border border-indigo-500/10 shadow-2xl">
            <div className="w-24 h-24 bg-indigo-600 rounded-[30px] flex items-center justify-center text-white mx-auto mb-8 shadow-indigo-500/40 shadow-2xl rotate-3 transform group-hover:rotate-0 transition-transform">
              <LuTrophy size={48} />
            </div>
            <h2 className="text-4xl font-black text-foreground mb-4">
              Gabaritou Coesão!
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto italic font-medium">
              "Um texto bem amarrado é o primeiro passo para uma carreira de
              sucesso. Você acaba de subir um degrau na sua aprovação."
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => onComplete?.()}
                className="px-12 py-6 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-full font-black text-xl shadow-2xl shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
              >
                Concluir Aula <LuCheck className="w-6 h-6" />
              </button>
            </div>
          </section>
        </div>
      </Activity>
    </AulaTemplate>
  );
}
