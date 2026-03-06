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
} from "react-icons/lu";

// Data
import {
  QUIZ_M1_POOL,
  QUIZ_M2_POOL,
  QUIZ_M3_POOL,
  QUIZ_M4_POOL,
  QUIZ_FINAL_POOL,
} from "./data/interpretacao-texto-quizzes";

export default function AulaInterpretacaoTexto({
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
  const MODULE_DEFS = [
    { id: "modulo-1", label: "Módulo 1", titulo: "A Diferença Letal" },
    { id: "modulo-2", label: "Módulo 2", titulo: "O Tópico Frasal" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Leitura Estratégica" },
    { id: "modulo-4", label: "Módulo 4", titulo: "A Matriz Operacional" },
    { id: "modulo-5", label: "Módulo 5", titulo: "Engenharia da Coesão" },
    { id: "modulo-6", label: "Módulo 6", titulo: "Pistas e Entrelinhas" },
    { id: "modulo-7", label: "Módulo 7", titulo: "As Ameaças Triplas" },
    { id: "modulo-8", label: "Módulo 8", titulo: "A Lógica CESGRANRIO" },
    { id: "modulo-9", label: "Módulo 9", titulo: "Checklist Tático" },
    { id: "modulo-10", label: "Módulo 10", titulo: "Arena de Elite" },
  ];

  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(),
  );
  const [hasSyncedInitial, setHasSyncedInitial] = useState(false);

  const [quizM1, setQuizM1] = useState(QUIZ_M1_POOL);
  const [quizM4, setQuizM4] = useState(QUIZ_M2_POOL);
  const [quizM6, setQuizM6] = useState(QUIZ_M3_POOL);
  const [quizM7, setQuizM7] = useState(QUIZ_M4_POOL);
  const [quizFinal, setQuizFinal] = useState(QUIZ_FINAL_POOL);

  useEffect(() => {
    setQuizM1(getRandomQuestions(QUIZ_M1_POOL, 4));
    setQuizM4(getRandomQuestions(QUIZ_M2_POOL, 4));
    setQuizM6(getRandomQuestions(QUIZ_M3_POOL, 4));
    setQuizM7(getRandomQuestions(QUIZ_M4_POOL, 4));
    setQuizFinal(getRandomQuestions(QUIZ_FINAL_POOL, 10));
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
  }, [currentProgress, hasSyncedInitial, loading, MODULE_DEFS.length]);

  const handleModuleComplete = (moduleId: string, score: number = 100) => {
    if (score >= 70) {
      const newSet = new Set(completedModules);
      newSet.add(moduleId);
      setCompletedModules(newSet);

      const percent = Math.round((newSet.size / MODULE_DEFS.length) * 100);
      if (onUpdateProgress) onUpdateProgress(percent);

      const index = MODULE_DEFS.findIndex((m) => m.id === moduleId);
      if (index < MODULE_DEFS.length - 1) {
        setTimeout(() => {
          setActiveTab(MODULE_DEFS[index + 1].id);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 1500);
      } else {
        if (onComplete) onComplete();
      }
    }
  };

  const isModuleUnlocked = (index: number) => {
    if (index === 0) return true;
    return true; // Liberado para estudo contínuo
  };

  if (loading) return null;

  // Componente de Laboratório de Análise de Texto (Interno para esta aula)
  const TextAnalysisLab = ({
    index,
    titulo = "Laboratório de Aplicação Prática",
    subtitulo = "Veja a técnica em ação no texto base.",
    texto,
    legenda,
  }: {
    index: number;
    titulo?: string;
    subtitulo?: string;
    texto: React.ReactNode;
    legenda: { cor: string; label: string }[];
  }) => (
    <section className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 shadow-2xl relative overflow-hidden group my-12">
      {/* Background Decorativo */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 transition-all group-hover:bg-primary/10" />

      <div className="relative space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex gap-4 md:gap-6">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-2xl md:text-3xl font-black shrink-0 shadow-inner">
              {index}
            </div>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                <LuCpu className="w-3 h-3" /> Laboratório Tático
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                {titulo}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-lg">
                {subtitulo}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {legenda.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <div className={`w-3 h-3 rounded-full ${item.cor}`} />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/50 dark:bg-slate-900/50 rounded-2xl p-6 md:p-10 border border-slate-200 dark:border-slate-800/50 backdrop-blur-sm">
          <blockquote className="text-xl md:text-2xl leading-relaxed font-serif text-slate-800 dark:text-slate-200">
            {texto}
          </blockquote>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
            <LuBrain className="w-5 h-5" />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 italic">
            "O marca-texto acima simula o 'olhar clínico' que você deve ter
            durante a prova. Note como as informações mudam de valor dependendo
            da sua intenção de leitura."
          </p>
        </div>
      </div>
    </section>
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
      isCompleted={isCompleted}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
      onComplete={onComplete}
      loading={loading}
      xpGanho={xpGanho}
    >
      {/* ─── MÓDULO 1: A DIFERENÇA LETAL ─── */}
      <TabsContent value="modulo-1" className="space-y-[40px]">
        <ModuleBanner
          numero={1}
          titulo="A Diferença Letal"
          descricao="Compreensão vs. Interpretação. A fronteira exata entre o que o texto diz e o que você deduz."
          gradiente="bg-gradient-to-br from-blue-600 via-sky-600 to-cyan-500"
        />

        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={1}
            title="A Armadilha do Óbvio"
            variant="blue"
          />
          <p className="text-muted-foreground leading-relaxed text-lg">
            Em provas da CESGRANRIO focadas no meio industrial, o erro número 1
            é confundir a decodificação da informação (Compreensão) com a
            conexão de ideias implícitas (Interpretação).
          </p>

          <ContentAccordion
            mode="stacked"
            titulo="O Crivo da Verdade: Compreensão vs Interpretação"
            icone={<LuBrain />}
            corIndicador="bg-blue-500"
            defaultOpen={true}
            slides={[
              {
                titulo: "1. Conceituação: A Fronteira do Texto",
                icone: "📚",
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      <strong>Compreensão:</strong> É o exame do que está
                      escrito <em>literalmente</em>. Você é um tradutor. A banca
                      usa comandos como: "Segundo o texto", "O autor afirma",
                      "Consta na linha X".
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Interpretação:</strong> É o exame do que o texto
                      <em>sugere</em> através de pistas. Você é um detetive. A
                      banca usa comandos como: "Infere-se", "Depreende-se", "O
                      texto sugere".
                    </p>
                  </div>
                ),
              },
              {
                titulo: "2. Exemplificação Petrobras (Na Prática)",
                icone: "⛽",
                conteudo: (
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl border-l-4 border-primary">
                      <p className="text-sm italic">
                        "A Petrobras planeja investir US$ 102 bilhões entre 2024
                        e 2028."
                      </p>
                    </div>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                      <li>
                        <strong>Compreensão:</strong> O investimento previsto é
                        de 102 bilhões de dólares. (Está escrito!)
                      </li>
                      <li>
                        <strong>Interpretação:</strong> A companhia demonstra
                        uma visão de longo prazo e fôlego financeiro para o
                        próximo quinquênio. (É a conclusão lógica das pistas.)
                      </li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "3. Dicas: O Pulo do Gato",
                icone: "💡",
                conteudo: (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      <strong>Filtro de Fidelidade:</strong> Se a questão for de
                      compreensão, mas a alternativa for uma dedução (mesmo que
                      verdadeira), ela está <strong>ERRADA</strong>. Se for de
                      interpretação e a frase estiver literal, desconfie: a
                      banca quer o sentido figurado ou a implicação.
                    </p>
                  </div>
                ),
              },
              {
                titulo: "4. Exceções: O Perigo da Extrapolação",
                icone: "⚠️",
                conteudo: (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      A exceção mais comum é a <strong>Extrapolação</strong>.
                      Ocorre quando você traz o que "sabe de fora" para dentro
                      do texto.
                    </p>
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-xs">
                      <strong>Cuidado:</strong> Se o texto falar que "o preço do
                      barril subiu", você não pode inferir que "a gasolina vai
                      subir amanhã" se o texto não mencionar a paridade de
                      preços ou repasse ao consumidor.
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </section>

        {/* APLICAÇÃO PRÁTICA: MARCA-TEXTO MÓDULO 1 */}
        <TextAnalysisLab
          index={1}
          titulo="Laboratório: Compreensão vs. Interpretação"
          subtitulo="Veja como separar o que é dado literal do que é dedução lógica no texto base."
          legenda={[
            {
              cor: "bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]",
              label: "Dado Literal (Compreensão)",
            },
            {
              cor: "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]",
              label: "Pista para Dedução (Interpretação)",
            },
          ]}
          texto={
            <>
              "A transição energética da Petrobras não é apenas um compromisso
              ambiental, mas uma{" "}
              <span className="bg-emerald-400/20 text-emerald-900 dark:text-emerald-100 border-b border-emerald-400/50 px-1 rounded-sm">
                necessidade estratégica de sobrevivência
              </span>{" "}
              mercadológica. Embora o petróleo ainda seja a espinha dorsal
              financeira da companhia, o{" "}
              <span className="bg-blue-400/20 text-blue-900 dark:text-blue-100 border-b border-blue-400/50 px-1 rounded-sm">
                investimento em fontes renováveis saltou 15%
              </span>{" "}
              no último biênio.{" "}
              <span className="bg-emerald-400/20 text-emerald-900 dark:text-emerald-100 border-b border-emerald-400/50 px-1 rounded-sm">
                Provavelmente, essa mudança acelerará as parcerias
              </span>{" "}
              com hubs tecnológicos internacionais..."
            </>
          }
        />

        {/* Resumo e Multimídia Módulo 1 */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8 mt-12">
          <ModuleSectionHeader
            index={2}
            title="Resumo e Multimídia"
            description="Consolide seu entendimento sobre a diferença entre Compreensão e Interpretação."
            variant="blue"
          />

          <LessonTabs
            variant="blue"
            tabs={[
              {
                id: "video",
                label: "Vídeo Aula",
                icon: LuPlayCircle,
                content: (
                  <div className="w-full flex flex-col items-center py-6">
                    <div className="w-full max-w-3xl">
                      <VideoModal
                        videoId="dQw4w9WgXcQ"
                        title="Compreensão vs Interpretação"
                        duration="06:45"
                      />
                    </div>
                  </div>
                ),
              },
              {
                id: "resumo",
                label: "Resumo Visual",
                icon: LuBookOpen,
                content: (
                  <ModuleSummaryCarouselNew
                    images={[
                      {
                        title: "Diferença: Compreensão vs Interpretação",
                        type: "Infográfico",
                        placeholderColor: "bg-blue-100 dark:bg-blue-900/30",
                        imageUrl: "/temp-img.png", // PROMPT: Infográfico clean com background de vidro fosco (glassmorphism). Lado Esquerdo, Azul: Lupa focando num papel detalhado. Lado Direito, Verde (Emerald): Cérebro conectando engrenagens deduzindo algo invisível. Design premium, tipografia sans-serif elegante, esquema de cores corporativo da Petrobras, zero tons de roxo ou rosa.
                      },
                      {
                        title: "Comandos da Banca (Verbos)",
                        type: "Tabela",
                        placeholderColor: "bg-sky-100 dark:bg-sky-900/30",
                      },
                    ]}
                    moduloNome="A Diferença Letal"
                    tituloAula="Interpretação de Texto"
                    materia="Língua Portuguesa"
                  />
                ),
              },
              {
                id: "macete",
                label: "Macete Visual",
                icon: LuBrain,
                content: (
                  <div className="text-center p-8 bg-gradient-to-br from-blue-500/5 to-sky-500/5 rounded-2xl border border-blue-500/10">
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      O Filtro do Texto
                    </h3>
                    <div className="text-7xl my-8">🔍 ➡ 🧠</div>
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                      "Se está <b>escrito</b>, eu compreendo. Se está{" "}
                      <b>nas entrelinhas</b>, eu interpreto. Não deixe o que
                      você sabe sobre o mundo contaminar o que o autor
                      escreveu!"
                    </p>
                  </div>
                ),
              },
              {
                id: "audio",
                label: "Áudio Resumo",
                icon: LuMusic,
                content: (
                  <div className="w-full flex justify-center py-4">
                    <div className="w-full max-w-md">
                      <MusicPlayerCard
                        audioUrl="#"
                        titulo="Resumo: O Óbvio vs O Implícito"
                        artista="Prof. Antigravity"
                        capaUrl="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000&auto=format&fit=crop"
                        lyrics={`(Refrão)\nO que o texto diz, é compreensão...\nO que ele sugere, é interpretação!\nNão viaja longe, fica na base...\nAnalisa o verbo em cada frase.`}
                      />
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <QuizInterativo
          questoes={quizM1}
          titulo="Fixação Inicial"
          icone="📝"
          numero={1}
          variant="blue"
          onComplete={(score) => handleModuleComplete("modulo-1", score)}
        />
      </TabsContent>

      {/* ─── MÓDULO 2: O TÓPICO FRASAL ─── */}
      <TabsContent value="modulo-2" className="space-y-[40px]">
        <ModuleBanner
          numero={2}
          titulo="A Arte de Buscar Sentido"
          descricao="Dominando o Tópico Frasal e a estrutura vertebral dos parágrafos em relatórios e textos de base."
          gradiente="bg-gradient-to-br from-teal-600 via-emerald-600 to-cyan-500"
        />

        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={2}
            title="A Espinha Dorsal do Parágrafo"
            variant="emerald"
          />

          <p className="text-muted-foreground leading-relaxed text-lg">
            Um parágrafo bem montado (o que a Cesgranrio sempre escolhe) gira ao
            redor de uma única ideia central expressa muitas vezes em uma só
            sentença: o <strong>Tópico Frasal</strong>.
          </p>

          <ContentAccordion
            mode="stacked"
            titulo="A Arquitetura do Parágrafo Mestre"
            icone={<LuBookOpen />}
            corIndicador="bg-teal-500"
            defaultOpen={true}
            slides={[
              {
                titulo: "1. Conceituação: O Que é o Tópico Frasal?",
                icone: "🎯",
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      É a frase que resume a ideia central de um parágrafo. Em
                      textos técnicos (relatórios, editais, manuais), ela
                      funciona como a <strong>espinha dorsal</strong> de onde
                      partem todas as outras informações secundárias.
                    </p>
                    <p className="text-muted-foreground italic">
                      "Pense nele como o título de um micro-capítulo dentro do
                      seu texto."
                    </p>
                  </div>
                ),
              },
              {
                titulo: "2. Exemplificação (Padrão Petrobras)",
                icone: "🏢",
                conteudo: (
                  <div className="space-y-4">
                    <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl border-l-4 border-teal-500 text-sm">
                      <p className="mb-2">
                        <strong>Exemplo A:</strong> "A fiscalização rigorosa nos
                        dutos de escoamento reduziu em 40% as perdas
                        operacionais." (Tópico Frasal explícito no início).
                      </p>
                      <p>
                        <strong>Exemplo B:</strong> "Embora o cenário externo
                        seja volátil, a resiliência da produção no pré-sal
                        garante os dividendos." (Tópico Frasal misto com
                        concessão).
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "3. Dicas: Onde ele se esconde?",
                icone: "🔍",
                conteudo: (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Em 90% das questões CESGRANRIO, o tópico frasal está na
                      <strong>primeira frase</strong> do parágrafo.
                    </p>
                    <div className="p-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded text-[11px] font-bold text-amber-700 dark:text-amber-400">
                      MACETE: Se não achar no início, procure por conclusões no
                      final iniciadas por "Dessa forma", "Logo" ou "Em suma".
                    </div>
                  </div>
                ),
              },
              {
                titulo: "4. Exceções: O Parágrafo Implícito",
                icone: "🕵️",
                conteudo: (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Existem parágrafos chamados de "narrativos" ou "por soma"
                      onde a ideia central não está em uma única frase, mas na
                      <strong>soma de todos os detalhes</strong>.
                    </p>
                    <p className="text-xs text-muted-foreground border-t pt-2">
                      <strong>Cuidado:</strong> Nestes casos, a pergunta da
                      banca será sobre "A ideia principal do segundo parágrafo",
                      exigindo que você sintetize o conjunto da obra em vez de
                      achar uma frase pronta.
                    </p>
                  </div>
                ),
              },
            ]}
          />

          <div className="flex justify-center mt-6">
            <button
              onClick={() => handleModuleComplete("modulo-2", 100)}
              className="px-8 py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition"
            >
              Marcar Módulo como Concluído
            </button>
          </div>
        </section>

        {/* Resumo e Multimídia Módulo 2 */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8 mt-12">
          <ModuleSectionHeader
            index={2}
            title="Resumo e Multimídia"
            description="Visualize a espinha dorsal do parágrafo técnico."
            variant="emerald"
          />

          <LessonTabs
            variant="emerald"
            tabs={[
              {
                id: "resumo",
                label: "Resumo Visual",
                icon: LuBookOpen,
                content: (
                  <ModuleSummaryCarouselNew
                    images={[
                      {
                        title: "Espinha Dorsal do Texto",
                        type: "Infográfico",
                        placeholderColor:
                          "bg-emerald-100 dark:bg-emerald-900/30",
                        imageUrl: "/temp-img.png", // PROMPT: Infográfico estilo Apple, fundo dark. Destaque para o primeiro período de um parágrafo (Tópico Frasal). Setas elegantes apontando para o desenvolvimento. Paleta esmeralda e ciano.
                      },
                    ]}
                    moduloNome="A Arte de Buscar Sentido"
                    tituloAula="Interpretação de Texto"
                    materia="Língua Portuguesa"
                  />
                ),
              },
            ]}
          />
        </section>

        {/* APLICAÇÃO PRÁTICA: MARCA-TEXTO MÓDULO 2 */}
        <TextAnalysisLab
          index={2}
          titulo="Laboratório: O Tópico Frasal"
          subtitulo="Identificando a espinha dorsal do parágrafo técnico."
          legenda={[
            {
              cor: "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]",
              label: "Tópico Frasal (Ideia Central)",
            },
            {
              cor: "bg-slate-300 dark:bg-slate-700",
              label: "Desenvolvimento (Detalhes)",
            },
          ]}
          texto={
            <>
              <span className="bg-emerald-400/20 text-emerald-900 dark:text-emerald-100 border-b border-emerald-400/50 px-1 rounded-sm">
                A transição energética da Petrobras não é apenas um compromisso
                ambiental, mas uma necessidade estratégica de sobrevivência
                mercadológica.
              </span>{" "}
              <span className="opacity-50">
                Embora o petróleo ainda seja a espinha dorsal financeira da
                companhia, o investimento em fontes renováveis saltou 15% no
                último biênio...
              </span>
            </>
          }
        />
      </TabsContent>

      {/* ─── MÓDULO 3: LEITURA ESTRATÉGICA ─── */}
      <TabsContent value="modulo-3" className="space-y-[40px]">
        <ModuleBanner
          numero={3}
          titulo="Leitura Estratégica"
          descricao=" Scanning e Skimming. Métodos avançados para vencer os textos densos e técnicos."
          gradiente="bg-gradient-to-br from-amber-600 via-orange-500 to-yellow-500"
        />

        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-6">
          <ModuleSectionHeader
            index={3}
            title="Armas de Agilidade: Vencendo o Relógio"
            variant="amber"
          />
          <p className="text-muted-foreground leading-relaxed">
            As provas da CESGRANRIO para o bloco de Petrobras contêm manuais e
            artigos longos. Ler de cabo a rabo na primeira vez consome tempo
            extremo.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 text-center h-full">
                  <LuEye className="w-12 h-12 text-amber-500 mb-4" />
                  <h3 className="text-xl font-bold text-foreground">
                    Skimming (Conceituação)
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    A varredura para entender o "espírito" do texto.
                  </p>
                </div>
              }
              verso={
                <div className="flex flex-col justify-center p-6 h-full space-y-4">
                  <div className="flex items-center gap-2 text-amber-500 font-bold border-b border-white/10 pb-2">
                    <LuEye /> <span>Visão de Águia (Skimming)</span>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    <strong>Conceito:</strong> Leitura rápida dos Tópicos
                    Frasais, títulos e introdução para captar o tema.
                  </p>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    <strong>Exemplo:</strong> Ler apenas o primeiro parágrafo
                    sobre "Refino de Biocombustíveis" para saber se o texto é
                    favorável ou crítico.
                  </p>
                  <div className="p-2 bg-amber-500/10 rounded-lg text-[10px] text-amber-600 dark:text-amber-400">
                    <strong>Dica:</strong> Serve para responder questões de "A
                    ideia central é..." ou "O texto trata de...".
                  </div>
                </div>
              }
            />

            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 text-center h-full">
                  <LuSearch className="w-12 h-12 text-orange-500 mb-4" />
                  <h3 className="text-xl font-bold text-foreground">
                    Scanning (Conceituação)
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    O raio-x para encontrar dados matemáticos e técnicos.
                  </p>
                </div>
              }
              verso={
                <div className="flex flex-col justify-center p-6 h-full space-y-4">
                  <div className="flex items-center gap-2 text-orange-500 font-bold border-b border-white/10 pb-2">
                    <LuSearch /> <span>Busca de Precisão (Scanning)</span>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    <strong>Conceito:</strong> Localização rápida de números,
                    datas, nomes próprios ou termos grifados.
                  </p>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    <strong>Exemplo:</strong> Ir direto no gráfico ou texto para
                    achar "1998" ou "R$ 50 bi" mencionado no enunciado.
                  </p>
                  <div className="p-2 bg-orange-500/10 rounded-lg text-[10px] text-orange-600 dark:text-orange-400">
                    <strong>Exceção:</strong> Cuidado quando a banca usa
                    "Porquanto" ou "Embora" perto do dado, mudando sua lógica.
                  </div>
                </div>
              }
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={() => handleModuleComplete("modulo-3", 100)}
              className="px-8 py-3 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700 transition"
            >
              Marcar Módulo como Concluído
            </button>
          </div>
        </section>

        {/* APLICAÇÃO PRÁTICA: MARCA-TEXTO MÓDULO 3 */}
        <TextAnalysisLab
          index={3}
          titulo="Laboratório: Leitura Estratégica"
          subtitulo="Praticando o Scanning para localizar dados técnicos em segundos."
          legenda={[
            {
              cor: "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]",
              label: "Dado Técnico (Foco do Scanning)",
            },
          ]}
          texto={
            <>
              "A Petrobras planeja investir{" "}
              <span className="bg-amber-400/20 text-amber-900 dark:text-amber-100 border-b border-amber-400/50 px-1 rounded-sm">
                US$ 102 bilhões
              </span>{" "}
              entre{" "}
              <span className="bg-amber-400/20 text-amber-900 dark:text-amber-100 border-b border-amber-400/50 px-1 rounded-sm">
                2024 e 2028
              </span>
              . Desse total,{" "}
              <span className="bg-amber-400/20 text-amber-900 dark:text-amber-100 border-b border-amber-400/50 px-1 rounded-sm">
                US$ 11,5 bilhões
              </span>{" "}
              serão destinados a projetos de baixo carbono..."
            </>
          }
        />
      </TabsContent>

      {/* ─── MÓDULO 4: A MATRIZ OPERACIONAL ─── */}
      <TabsContent value="modulo-4" className="space-y-[40px]">
        <ModuleBanner
          numero={4}
          titulo="A Matriz Operacional"
          descricao="Tipologias e Gêneros. Entendendo o caráter funcional dos textos das questões CESGRANRIO."
          gradiente="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500"
        />

        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-6">
          <ModuleSectionHeader
            index={4}
            title="A Natureza dos Textos (Tipologia)"
            variant="indigo"
          />

          <ContentAccordion
            mode="stacked"
            titulo="A Estrutura Genética do Texto"
            icone={<LuDna />}
            corIndicador="bg-indigo-500"
            defaultOpen={true}
            slides={[
              {
                titulo: "1. Conceituação: Tipologia vs Gênero",
                icone: "📚",
                conteudo: (
                  <div className="space-y-4 text-xs">
                    <p className="text-muted-foreground">
                      <strong>Tipologia (DNA):</strong> É a natureza linguística
                      do texto (Narrar, Descrever, Argumentar, Expor, Injunção).
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Gênero (Vestimenta):</strong> É a função social e
                      o formato (Relatório, Edital, E-mail, Notícia).
                    </p>
                  </div>
                ),
              },
              {
                titulo: "2. Exemplificação (Mundo Petrobras)",
                icone: "🏭",
                conteudo: (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
                      <p className="font-bold text-[10px] text-indigo-700 dark:text-indigo-400 mb-1">
                        Manual Técnico (POP)
                      </p>
                      <p className="text-[9px] text-muted-foreground italic">
                        Tipologia: Injuntiva (Instrui e ordena procedimentos).
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="font-bold text-[10px] text-blue-700 dark:text-blue-400 mb-1">
                        Relatório de Incidente
                      </p>
                      <p className="text-[9px] text-muted-foreground italic">
                        Tipologia: Narrativo (Relata fatos no tempo).
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "3. Dicas: O Verbo é a Chave",
                icone: "💡",
                conteudo: (
                  <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl text-xs">
                    <p className="text-amber-800 dark:text-amber-300">
                      Para matar a questão: <strong>Injuntivo</strong> usa
                      imperativo (Faça, Aperte). <strong>Dissertativo</strong>{" "}
                      usa verbos de opinião (Acredita-se, Torna-se necessário).{" "}
                      <strong>Narrativo</strong> usa pretérito (Aconteceu,
                      Relatou-se).
                    </p>
                  </div>
                ),
              },
              {
                titulo: "4. Exceções: O Texto Híbrido",
                icone: "🌓",
                conteudo: (
                  <div className="space-y-2">
                    <p className="text-[11px] text-muted-foreground">
                      Um texto quase nunca é 100% puro. Um edital pode ter
                      partes **expositivas** (apresentação) e partes
                      **injuntivas** (regras).
                    </p>
                    <p className="text-[10px] text-muted-foreground font-bold border-t pt-2">
                      CESGRANRIO: Ela sempre pergunta qual o tipo **dominante**
                      ou a finalidade **principal**. Não se apegue a um único
                      parágrafo.
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        {/* Resumo e Multimídia Módulo 4 */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8 mt-12">
          <ModuleSectionHeader
            index={2}
            title="Resumo e Multimídia"
            description="Visualize as tipologias e gêneros dominantes nas provas da estatal."
            variant="indigo"
          />

          <LessonTabs
            variant="indigo"
            tabs={[
              {
                id: "video",
                label: "Vídeo Aula",
                icon: LuPlayCircle,
                content: (
                  <div className="w-full flex flex-col items-center py-6">
                    <div className="w-full max-w-3xl">
                      <VideoModal
                        videoId="dQw4w9WgXcQ"
                        title="Tipologias e Gêneros Funcionais"
                        duration="08:20"
                      />
                    </div>
                  </div>
                ),
              },
              {
                id: "resumo",
                label: "Resumo Visual",
                icon: LuBookOpen,
                content: (
                  <ModuleSummaryCarouselNew
                    images={[
                      {
                        title: "Matriz Tipológica Industrial",
                        type: "Diagrama",
                        placeholderColor: "bg-indigo-100 dark:bg-indigo-900/30",
                        imageUrl: "/temp-img.png", // PROMPT: Diagrama corporativo limpo. Título central: Matriz Tipológica. Cinco ramificações com ícones industriais: Engrenagem (Injuntivo - Manuais), Fotografia Estática (Descritivo - Inventários), Gráfico de Tendência (Dissertativo - Análises), Livro/Timeline (Narrativo - Relatório Operacional de Incidente), Painel de Aviso (Expositivo - Boletins de Segurança). Cores: Tons de azul ardósia e teal.
                      },
                      {
                        title: "Gêneros: Relatório vs Edital",
                        type: "Comparação",
                        placeholderColor: "bg-blue-100 dark:bg-blue-900/30",
                      },
                    ]}
                    moduloNome="A Matriz Operacional"
                    tituloAula="Interpretação de Texto"
                    materia="Língua Portuguesa"
                  />
                ),
              },
              {
                id: "macete",
                label: "Macete Visual",
                icon: LuBrain,
                content: (
                  <div className="text-center p-8 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 rounded-2xl border border-indigo-500/10">
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      DNA do Texto
                    </h3>
                    <div className="text-7xl my-8">🧬 📜</div>
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                      "Injuntivo <b>manda</b> (imperativo), Narrativo{" "}
                      <b>conta</b> (tempo), Descritivo <b>pinta</b> (estado) e
                      Dissertativo <b>argumenta</b> (opinião)!"
                    </p>
                  </div>
                ),
              },
              {
                id: "audio",
                label: "Áudio Resumo",
                icon: LuMusic,
                content: (
                  <div className="w-full flex justify-center py-4">
                    <div className="w-full max-w-md">
                      <MusicPlayerCard
                        audioUrl="#"
                        titulo="Resumo: Tipologias e Gêneros"
                        artista="Prof. Antigravity"
                        capaUrl="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop"
                        lyrics={`(Verso)\nSe tem verbo no imperativo, é injuntivo com certeza...\nSe relata um acidente, é narrativa a natureza.\nO edital é expositivo, o manual te orienta...\nE a tipografia certa é a arma que te sustenta!`}
                      />
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <QuizInterativo
          questoes={quizM4}
          titulo="Desafio de Tipologias e Armadilhas"
          icone="🔥"
          numero={4}
          variant="indigo"
          onComplete={(score) => handleModuleComplete("modulo-4", score)}
        />

        {/* APLICAÇÃO PRÁTICA: MARCA-TEXTO MÓDULO 4 */}
        <TextAnalysisLab
          index={4}
          titulo="Laboratório: A Matriz Operacional"
          subtitulo="Identificando marcas de tipologia injuntiva (instrução) em manuais."
          legenda={[
            {
              cor: "bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.5)]",
              label: "Verbo de Ação (Injuntivo)",
            },
          ]}
          texto={
            <>
              "Para garantir a segurança,{" "}
              <span className="bg-indigo-400/20 text-indigo-900 dark:text-indigo-100 border-b border-indigo-400/50 px-1 rounded-sm">
                inspecione
              </span>{" "}
              periodicamente as válvulas de pressão e{" "}
              <span className="bg-indigo-400/20 text-indigo-900 dark:text-indigo-100 border-b border-indigo-400/50 px-1 rounded-sm">
                registre
              </span>{" "}
              qualquer anomalia no log operacional."
            </>
          }
        />
      </TabsContent>

      {/* ─── MÓDULO 5: ENGENHARIA DA COESÃO ─── */}
      <TabsContent value="modulo-5" className="space-y-[40px]">
        <ModuleBanner
          numero={5}
          titulo="A Engenharia da Coesão"
          descricao="Os conectivos que formam as pontes entre ideias. A CESGRANRIO ama perguntar a equivalência semântica deles."
          gradiente="bg-gradient-to-br from-emerald-600 via-green-500 to-teal-500"
        />

        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-6">
          <ModuleSectionHeader
            index={5}
            title="As Ferramentas de Articulação"
            variant="emerald"
          />
          <p className="text-muted-foreground leading-relaxed">
            O sentido lógico do texto é amarrado por conjunções e pronomes
            vitais. Conhecer a intenção principal deles o salva da temida
            "Contradição".
          </p>

          <ContentAccordion
            mode="stacked"
            titulo="A Engenharia dos Conectivos"
            icone={<LuLink />}
            corIndicador="bg-emerald-500"
            defaultOpen={true}
            slides={[
              {
                titulo: "1. Conceituação: O Que é Coesão?",
                icone: "🔗",
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      <strong>Sequencial (Conectivos):</strong> É o uso de
                      conjunções para estabelecer relações lógicas (causa,
                      oposição, conclusão).
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Referencial (Pronomes):</strong> Uso de termos que
                      evitam repetições, apontando para o que já foi dito ou o
                      que virá.
                    </p>
                  </div>
                ),
              },
              {
                titulo: "2. Exemplificação: O Jogo das Trocas",
                icone: "⚖️",
                conteudo: (
                  <div className="space-y-4">
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border-l-4 border-emerald-500 text-xs">
                      <p className="font-bold mb-1">Cenário Petrobras:</p>
                      <p className="italic mb-2">
                        "A produção subiu, <strong>mas</strong> o custo de
                        extração também." (Oposição direta).
                      </p>
                      <p className="italic">
                        "<strong>Embora</strong> a produção tenha subido, o
                        custo alto preocupa." (Concessão - exige mudança no
                        verbo 'tenha subido').
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "3. Dicas: Conquanto vs Porquanto",
                icone: "💡",
                conteudo: (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h5 className="font-bold text-blue-700 dark:text-blue-400 text-xs mb-1">
                        C<strong>O</strong>NQUANTO
                      </h5>
                      <p className="text-[10px] text-muted-foreground">
                        = Emb<strong>O</strong>ra (Concessiva). Inicia uma
                        oposição "fraca".
                      </p>
                    </div>
                    <div className="p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-800">
                      <h5 className="font-bold text-teal-700 dark:text-teal-400 text-xs mb-1">
                        P<strong>O</strong>RQUANTO
                      </h5>
                      <p className="text-[10px] text-muted-foreground">
                        = P<strong>O</strong>RQUE (Causal). Inicia uma
                        explicação/causa.
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "4. Exceções: O 'E' com valor de 'Mas'",
                icone: "⚠️",
                conteudo: (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl text-xs">
                    <p className="text-muted-foreground">
                      <strong>Cuidado:</strong> A conjunção "E" pode ser
                      adversativa se expressar contraste.
                    </p>
                    <p className="italic font-bold mt-2">
                      "O técnico leu o manual <strong>e</strong> não entendeu."
                      (= Mas não entendeu).
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8 mt-12">
          <ModuleSectionHeader
            index={2}
            title="Resumo e Multimídia"
            description="Visualize as pontes lógicas (conectivos) que estruturam o texto."
            variant="emerald"
          />

          <LessonTabs
            variant="emerald"
            tabs={[
              {
                id: "resumo",
                label: "Resumo Visual",
                icon: LuBookOpen,
                content: (
                  <ModuleSummaryCarouselNew
                    images={[
                      {
                        title: "Mapa de Conectivos CESGRANRIO",
                        type: "Mapa Mental",
                        placeholderColor:
                          "bg-emerald-100 dark:bg-emerald-900/30",
                        imageUrl: "/temp-img.png", // PROMPT: Mapa mental premium com estilo de fluxograma industrial. Centro: Conectivos Lógicos. Ramificações: Oposição (Mas, Porém), Adição (E, Além disso), Concessão (Embora, Conquanto), Causa (Porquanto, Já que). Design limpo, vidro fosco, cores Petrobras (Verde/Azul).
                      },
                      {
                        title: "Equivalência: Porque vs Porquanto",
                        type: "Card Técnico",
                        placeholderColor: "bg-teal-100 dark:bg-teal-900/30",
                        imageUrl: "/temp-img.png", // PROMPT: Card técnico estilo Apple. Título central: Porque = Porquanto. Explicação visual de causa/explicação. Fundo com gradiente suave teal e verde. Ícone de engrenagem e lupa. Premium UI.
                      },
                    ]}
                    moduloNome="Engenharia da Coesão"
                    tituloAula="Interpretação de Texto"
                    materia="Língua Portuguesa"
                  />
                ),
              },
              {
                id: "audio",
                label: "Áudio Resumo",
                icon: LuMusic,
                content: (
                  <div className="w-full flex justify-center py-4">
                    <div className="w-full max-w-md">
                      <MusicPlayerCard
                        audioUrl="#"
                        titulo="Resumo: Conectivos de Elite"
                        artista="Prof. Antigravity"
                        capaUrl="https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000&auto=format&fit=crop"
                        lyrics={`(Verso)\nPorquanto é causa, não confunda com o resto...\nConquanto é embora, o sentido é oposto ao manifesto.\nO conectivo é a ponte, o cimento da oração...\nErrou a conjunção, errou a interpretação!`}
                      />
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </section>

        {/* APLICAÇÃO PRÁTICA: MARCA-TEXTO MÓDULO 5 */}
        <TextAnalysisLab
          index={5}
          titulo="Laboratório: Engenharia da Coesão"
          subtitulo="Mapeando os conectivos que sustentam o sentido lógico do texto."
          legenda={[
            {
              cor: "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]",
              label: "Conectivo de Oposição/Concessão",
            },
            {
              cor: "bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]",
              label: "Elemento de Referência",
            },
          ]}
          texto={
            <>
              "A transição energética da Petrobras não é apenas um compromisso
              ambiental, mas uma necessidade estratégica de sobrevivência
              mercadológica.{" "}
              <span className="bg-amber-400/20 text-amber-900 dark:text-amber-100 border-b border-amber-400/50 px-1 rounded-sm">
                Embora
              </span>{" "}
              o petróleo ainda seja a espinha dorsal financeira da{" "}
              <span className="bg-blue-400/20 text-blue-900 dark:text-blue-100 border-b border-blue-400/50 px-1 rounded-sm">
                companhia
              </span>
              , o investimento em fontes renováveis saltou 15% no último biênio.
              Provavelmente,{" "}
              <span className="bg-blue-400/20 text-blue-900 dark:text-blue-100 border-b border-blue-400/50 px-1 rounded-sm">
                essa mudança
              </span>{" "}
              acelerará as parcerias..."
            </>
          }
        />
      </TabsContent>

      {/* ─── MÓDULO 6: PISTAS E ENTRELINHAS ─── */}
      <TabsContent value="modulo-6" className="space-y-[40px]">
        <ModuleBanner
          numero={6}
          titulo="Pistas e Entrelinhas"
          descricao="A anatomia avançada de pressupostos e subentendidos lógicos exigida nas deduções."
          gradiente="bg-gradient-to-br from-sky-600 via-cyan-600 to-teal-500"
        />

        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={6}
            title="Lógica das Marcas (Verbos e Advérbios)"
            variant="cyan"
          />

          <ContentAccordion
            mode="stacked"
            titulo="A Anatomia das Entrelinhas"
            icone={<LuTarget />}
            corIndicador="bg-sky-500"
            defaultOpen={true}
            slides={[
              {
                titulo: "1. Conceituação: Pistas e Marcas",
                icone: "🔍",
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      <strong>Pressuposto:</strong> É a ideia "oculta" que o
                      autor dá como certa através de palavras-chave (ex:
                      <em>parou de</em>, <em>ainda</em>). No pressuposto, a
                      verdade da frase principal depende da verdade da oculta.
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Subentendido:</strong> É a insinuação que depende
                      do contexto e da malícia do leitor. Não há marca
                      gramatical obrigatória. É a "batata quente" que o autor
                      joga para o leitor concluir sozinho.
                    </p>
                  </div>
                ),
              },
              {
                titulo: "2. Exemplificação: Modalizadores",
                icone: "💬",
                conteudo: (
                  <div className="space-y-4">
                    <div className="p-4 bg-sky-50 dark:bg-sky-900/20 rounded-xl border-l-4 border-sky-500 text-xs">
                      <p className="italic mb-2">
                        "<strong>Infelizmente</strong>, o cronograma sofreu
                        atrasos." (O autor julga o fato como negativo pela marca
                        subjetiva).
                      </p>
                      <p className="italic">
                        "O técnico <strong>ainda</strong> não reparou o duto."
                        (= Pressupõe-se que ele deveria ter reparado ou que já
                        era esperado antes).
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "3. Dicas: O Detective de Advérbios",
                icone: "💡",
                conteudo: (
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl text-xs">
                    <p className="text-blue-800 dark:text-blue-300">
                      <strong>Cace os 'mente':</strong> Advérbios como
                      "surpreendentemente", "estratégicamente" ou "meramente"
                      são portas de entrada para questões de interpretação. Eles
                      revelam a <strong>intenção</strong> do autor escondida sob
                      o fato.
                    </p>
                  </div>
                ),
              },
              {
                titulo: "4. Exceções: O Texto Técnico 'Frio'",
                icone: "📄",
                conteudo: (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Em manuais técnicos puramente descritivos (ex:
                      Procedimentos de Operação Padrão - POP), a modalização é
                      minimizada para evitar dupla interpretação.
                    </p>
                    <p className="text-xs text-muted-foreground border-t pt-2">
                      <strong>Cuidado:</strong> Se a banca pedir para achar
                      "juízo de valor" em um POP, a resposta provavelmente
                      apontará para a <strong>ausência</strong> de marcas ou
                      para verbos no imperativo (injuntivos).
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        {/* Resumo e Multimídia Módulo 6 */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8 mt-12">
          <ModuleSectionHeader
            index={2}
            title="Resumo e Multimídia"
            description="Aprenda a ler o que não foi dito, mas foi marcado no texto."
            variant="cyan"
          />

          <LessonTabs
            variant="cyan"
            tabs={[
              {
                id: "resumo",
                label: "Resumo Visual",
                icon: LuBookOpen,
                content: (
                  <ModuleSummaryCarouselNew
                    images={[
                      {
                        title: "As Marcas da Intencionalidade",
                        type: "Infográfico",
                        placeholderColor: "bg-cyan-100 dark:bg-cyan-900/30",
                        imageUrl: "/temp-img.png", // PROMPT: Infográfico dark mode premium. Título: Marcas de Opinião. Destaque para advérbios 'Infelizmente', 'Obviamente'. Elementos de interface de usuário (UI) futurista, neon azul ciano, zero roxo. Estilo Apple.
                      },
                    ]}
                    moduloNome="Pistas e Entrelinhas"
                    tituloAula="Interpretação de Texto"
                    materia="Língua Portuguesa"
                  />
                ),
              },
            ]}
          />
        </section>

        <QuizInterativo
          questoes={quizM6}
          titulo="Detectando Pressuposições"
          icone="🕵️"
          numero={6}
          variant="cyan"
          onComplete={(score: number) =>
            handleModuleComplete("modulo-6", score)
          }
        />

        {/* APLICAÇÃO PRÁTICA: MARCA-TEXTO MÓDULO 6 */}
        <TextAnalysisLab
          index={6}
          titulo="Laboratório: Pistas e Entrelinhas"
          subtitulo="Detectando juízos de valor e graus de certeza do autor."
          legenda={[
            {
              cor: "bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.5)]",
              label: "Modalizador (Grau de Certeza)",
            },
            {
              cor: "bg-rose-400 shadow-[0_0_10px_rgba(251,113,133,0.5)]",
              label: "Juízo de Valor (Opinião Implícita)",
            },
          ]}
          texto={
            <>
              "A transição energética da Petrobras não é{" "}
              <span className="bg-rose-400/20 text-rose-900 dark:text-rose-100 border-b border-rose-400/50 px-1 rounded-sm">
                apenas
              </span>{" "}
              um compromisso ambiental, mas uma necessidade estratégica de
              sobrevivência mercadológica. [...]
              <span className="bg-violet-400/20 text-violet-900 dark:text-violet-100 border-b border-violet-400/50 px-1 rounded-sm">
                Provavelmente
              </span>
              , essa mudança acelerará as parcerias com hubs tecnológicos
              internacionais..."
            </>
          }
        />
      </TabsContent>

      {/* ─── MÓDULO 7: AS AMEAÇAS TRIPLAS ─── */}
      <TabsContent value="modulo-7" className="space-y-[40px]">
        <ModuleBanner
          numero={7}
          titulo="As Ameaças Triplas"
          descricao="Redução, Extrapolação e Contradição. Os pecados capitais do aluno na alternativa C."
          gradiente="bg-gradient-to-br from-red-600 via-rose-500 to-orange-500"
        />

        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-6">
          <ModuleSectionHeader
            index={7}
            title="A Trindade Letal"
            variant="rose"
          />

          <ContentAccordion
            mode="stacked"
            titulo="Os Erros Clássicos de Opção"
            icone={<LuTriangleAlert />}
            corIndicador="bg-rose-500"
            defaultOpen={true}
            slides={[
              {
                titulo: "1. Conceituação: Extrapolação vs Redução",
                icone: "⚖️",
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      <strong>Extrapolação:</strong> Quando você vai além do
                      limite lógico do texto, trazendo informações externas (seu
                      conhecimento prévio).
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Redução:</strong> Quando você foca em um detalhe
                      periférico e ignora que ele não é o tema central.
                    </p>
                  </div>
                ),
              },
              {
                titulo: "2. Exemplificação: O Perigo dos Absolutos",
                icone: "🚨",
                conteudo: (
                  <div className="space-y-4">
                    <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-xl border-l-4 border-rose-500 text-xs">
                      <p className="italic mb-2 text-rose-800 dark:text-rose-400 font-bold">
                        Banca: "O texto afirma que a Petrobras é a única empresa
                        com tecnologia X."
                      </p>
                      <p className="text-muted-foreground italic text-[11px]">
                        No texto diz: "A Petrobras é referência nacional na
                        tecnologia X". Notou? De 'referência' para 'única' há
                        uma **Extrapolação** fatal.
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "3. Dicas: Gatilhos de Erro",
                icone: "💡",
                conteudo: (
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl text-xs">
                    <p className="text-blue-800 dark:text-blue-300">
                      <strong>Sinal Vermelho:</strong> Palavras como "Apenas",
                      "Sempre", "Nunca", "Exclusivamente" ou "Principalmente"
                      costumam indicar opções de extrapolação ou redução. Use o
                      filtro do "Tudo ou Nada".
                    </p>
                  </div>
                ),
              },
              {
                titulo: "4. Exceções: Quando o 'Sempre' é Verdade",
                icone: "🔍",
                conteudo: (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Só aceite um termo absoluto se o texto for categórico.
                    </p>
                    <p className="text-xs text-muted-foreground border-t pt-2">
                      <strong>Exemplo:</strong> "O uso de EPI é obrigatório em
                      toda a área industrial." Nesse caso, o 'Sempre' ou
                      'Obrigatório' está correto porque o texto-base assim o
                      definiu.
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        {/* Resumo e Multimídia Módulo 7 */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8 mt-12">
          <ModuleSectionHeader
            index={2}
            title="Resumo e Multimídia"
            description="Evite os pecados capitais que anulam sua nota."
            variant="rose"
          />

          <LessonTabs
            variant="rose"
            tabs={[
              {
                id: "resumo",
                label: "Resumo Visual",
                icon: LuBookOpen,
                content: (
                  <ModuleSummaryCarouselNew
                    images={[
                      {
                        title: "Radar de Erros: Extrapolação vs Redução",
                        type: "Diagrama",
                        placeholderColor: "bg-rose-100 dark:bg-rose-900/30",
                        imageUrl: "/temp-img.png", // PROMPT: Diagrama de radar estilo monitoramento industrial. Três zonas críticas: Extrapolação (Fogo), Redução (Gelo), Contradição (Explosão). Design premium, tons de vermelho técnico, fundo escuro.
                      },
                    ]}
                    moduloNome="As Ameaças Triplas"
                    tituloAula="Interpretação de Texto"
                    materia="Língua Portuguesa"
                  />
                ),
              },
            ]}
          />
        </section>

        <QuizInterativo
          questoes={quizM7}
          titulo="Julgando os Pecados"
          icone="⚖️"
          numero={7}
          variant="rose"
          onComplete={(score) => handleModuleComplete("modulo-7", score)}
        />

        {/* APLICAÇÃO PRÁTICA: MARCA-TEXTO MÓDULO 7 */}
        <TextAnalysisLab
          index={7}
          titulo="Laboratório: As Ameaças Triplas"
          subtitulo="Identificando extrapolações e reduções que tornam a opção incorreta."
          legenda={[
            {
              cor: "bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.5)]",
              label: "Extrapolação (Informação Além do Texto)",
            },
            {
              cor: "bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.5)]",
              label: "Redução (Foco em Detalhe Pequeno)",
            },
          ]}
          texto={
            <>
              "O aumento na produção de biocombustíveis reflete a nova política
              verde." [...]{" "}
              <span className="bg-red-400/20 text-red-900 dark:text-red-100 border-b border-red-400/50 px-1 rounded-sm">
                A Petrobras abandonou de vez o petróleo
              </span>{" "}
              (Extrapolação).{" "}
              <span className="bg-orange-400/20 text-orange-900 dark:text-orange-100 border-b border-orange-400/50 px-1 rounded-sm">
                Houve um aumento
              </span>{" "}
              (Redução - ignora o motivo verde).
            </>
          }
        />
      </TabsContent>

      {/* ─── MÓDULO 8: A LÓGICA CESGRANRIO ─── */}
      <TabsContent value="modulo-8" className="space-y-[40px]">
        <ModuleBanner
          numero={8}
          titulo="A Lógica CESGRANRIO"
          descricao="Diretrizes específicas de como esta banca lida com textos do ecossistema de Óleo & Gás."
          gradiente="bg-gradient-to-br from-blue-700 via-slate-600 to-sky-600"
        />

        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-6">
          <ContentAccordion
            mode="stacked"
            titulo="O Perfil da Banca"
            icone={<LuCheck />}
            corIndicador="bg-blue-500"
            defaultOpen={true}
            slides={[
              {
                titulo: "1. Conceituação: A Honestidade da Prova",
                icone: "🤝",
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Diferente da FGV ou Cebraspe, a{" "}
                      <strong>CESGRANRIO</strong>
                      costuma ser uma banca "honesta". Ela foca em semântica
                      (sentido) e gramática funcional aplicada ao texto, sem
                      tentar trapacear o aluno com questões subjetivas demais.
                    </p>
                  </div>
                ),
              },
              {
                titulo: "2. Exemplificação: O Foco em Substituição",
                icone: "🔄",
                conteudo: (
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500 text-xs">
                      <p className="font-bold mb-1">Questão Clássica:</p>
                      <p className="italic mb-2">
                        "O termo 'X' pode ser substituído, sem alteração de
                        sentido, por..."
                      </p>
                      <p className="text-muted-foreground">
                        Ela testa se você conhece sinônimos técnicos e se
                        entende como o contexto molda o significado da palavra.
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "3. Dicas: O Texto é Sagrado",
                icone: "💡",
                conteudo: (
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl text-xs">
                    <p className="text-blue-800 dark:text-blue-300">
                      <strong>Dica de Ouro:</strong> Nunca responda com base no
                      que você <em>acha</em> sobre o assunto no mundo real. A
                      CESGRANRIO quer o que o <strong>autor</strong> disse nos
                      limites daquelas linhas. Use o "Filtro de Fidelidade".
                    </p>
                  </div>
                ),
              },
              {
                titulo: "4. Exceções: Gramática Direta",
                icone: "📝",
                conteudo: (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Nem tudo é interpretação "pura".
                    </p>
                    <p className="text-xs text-muted-foreground border-t pt-2">
                      <strong>Aviso:</strong> Algumas questões de interpretação
                      são, na verdade, disfarces para testar **Concordância** ou
                      **Regência**. Se a troca de uma palavra exigir mudar o
                      restante da frase, a banca pode considerar a opção errada.
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        {/* Resumo e Multimídia Módulo 8 */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8 mt-12">
          <ModuleSectionHeader
            index={2}
            title="Resumo e Multimídia"
            description="Consolide a lógica por trás das questões Cesgranrio."
            variant="blue"
          />

          <LessonTabs
            variant="blue"
            tabs={[
              {
                id: "resumo",
                label: "Resumo Visual",
                icon: LuBookOpen,
                content: (
                  <ModuleSummaryCarouselNew
                    images={[
                      {
                        title: "Equivalência e Coesão",
                        type: "Tabela",
                        placeholderColor: "bg-blue-100 dark:bg-blue-900/30",
                      },
                    ]}
                    moduloNome="A Lógica CESGRANRIO"
                    tituloAula="Interpretação de Texto"
                    materia="Língua Portuguesa"
                  />
                ),
              },
            ]}
          />
        </section>

        {/* APLICAÇÃO PRÁTICA: MARCA-TEXTO MÓDULO 8 */}
        <TextAnalysisLab
          index={8}
          titulo="Laboratório: Lógica CESGRANRIO"
          subtitulo="Mapeando sinônimos técnicos e substituições contextuais."
          legenda={[
            {
              cor: "bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]",
              label: "Termo Original",
            },
            {
              cor: "bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]",
              label: "Substituição Sugerida",
            },
          ]}
          texto={
            <>
              "A operação foi{" "}
              <span className="bg-blue-400/20 text-blue-900 dark:text-blue-100 border-b border-blue-400/50 px-1 rounded-sm">
                interrompida
              </span>{" "}
              por tempo indeterminado." No contexto, o termo poderia ser trocado
              por{" "}
              <span className="bg-sky-400/20 text-sky-900 dark:text-sky-100 border-b border-sky-400/50 px-1 rounded-sm">
                suspensa
              </span>{" "}
              sem prejuízo ao sentido original.
            </>
          }
        />
      </TabsContent>

      {/* ─── MÓDULO 9: CHECKLIST TÁTICO ─── */}
      <TabsContent value="modulo-9" className="space-y-[40px]">
        <ModuleBanner
          numero={9}
          titulo="Checklist Tático"
          descricao="O roteiro de ação rápido em provas de português técnico da estatal."
          gradiente="bg-gradient-to-br from-emerald-700 via-cyan-700 to-blue-700"
        />

        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-6">
          <ModuleSectionHeader
            index={9}
            title="Rotina de Ataque à Prova"
            variant="emerald"
          />

          <ContentAccordion
            mode="stacked"
            titulo="Manual de Execução"
            icone={<LuCheck />}
            corIndicador="bg-emerald-500"
            defaultOpen={true}
            slides={[
              {
                titulo: "1. Conceituação: O Ciclo de Ataque",
                icone: "🔄",
                conteudo: (
                  <div className="space-y-2 text-xs">
                    <p className="text-muted-foreground">
                      <strong>Passo 1:</strong> Enunciado (Identifique o que
                      pedem).
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Passo 2:</strong> Fragmento (Vá direto ao ponto
                      citado).
                    </p>
                    <p className="text-muted-foreground">
                      <strong>Passo 3:</strong> Eliminação (Corte as
                      extrapolações).
                    </p>
                  </div>
                ),
              },
              {
                titulo: "2. Exemplificação: O Filtro CESGRANRIO",
                icone: "🧪",
                conteudo: (
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border-l-4 border-emerald-500 text-[10px]">
                    <p className="font-bold mb-1">Ação em Campo:</p>
                    <p className="italic">
                      "A alternativa que diz 'A Petrobras foca em
                      biocombustíveis' é tentadora, mas o texto fala de
                      'exploração em águas profundas'. Elimine por
                      **Contradição** ou **Extrapolação**."
                    </p>
                  </div>
                ),
              },
              {
                titulo: "3. Dicas: Gerenciamento de Energia",
                icone: "⚡",
                conteudo: (
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl text-xs">
                    <p className="text-blue-800 dark:text-blue-300 font-bold">
                      Não leia o texto como romance!
                    </p>
                    <p className="text-muted-foreground mt-1">
                      Leia o enunciado primeiro. Muitas vezes a questão de
                      gramática pode ser resolvida sem ler o texto inteiro,
                      salvando fôlego para as questões de inferência densa.
                    </p>
                  </div>
                ),
              },
              {
                titulo: "4. Exceções: O Texto de Opinião Crítica",
                icone: "📢",
                conteudo: (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">
                      Quando o texto é um editorial ou artigo de opinião, a
                      regra do Scanning pode falhar.
                    </p>
                    <p className="text-[10px] text-muted-foreground border-t pt-2">
                      <strong>Por quê?</strong> Porque o autor espalha a tese
                      dele por todo o texto. Nesses casos, a leitura integral e
                      o **Skimming** (buscar o foco central) são obrigatórios.
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        {/* Resumo e Multimídia Módulo 9 */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8 mt-12">
          <ModuleSectionHeader
            index={2}
            title="Resumo e Multimídia"
            description="O seu roteiro final para o dia da prova."
            variant="emerald"
          />

          <LessonTabs
            variant="emerald"
            tabs={[
              {
                id: "resumo",
                label: "Resumo Visual",
                icon: LuBookOpen,
                content: (
                  <ModuleSummaryCarouselNew
                    moduloNome="Checklist Tático"
                    tituloAula="Interpretação de Texto"
                    materia="Língua Portuguesa"
                    images={[
                      {
                        title: "Checklist de Ataque",
                        type: "Infográfico Tático",
                        placeholderColor:
                          "bg-emerald-100 dark:bg-emerald-900/30",
                        imageUrl: "/temp-img.png", // PROMPT: Infográfico tático de checklist. Lista de itens com 'checks' verdes. Estilo futurista, HUD industrial. Texto legível 'Checklist de Ataque'. Premium dark mode aesthetics.
                      },
                    ]}
                  />
                ),
              },
            ]}
          />
        </section>

        {/* APLICAÇÃO PRÁTICA: MARCA-TEXTO MÓDULO 9 */}
        <TextAnalysisLab
          index={9}
          titulo="Laboratório: Checklist Tático"
          subtitulo="O fluxo de ataque: do enunciado à eliminação de alternativas."
          legenda={[
            {
              cor: "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]",
              label: "Foco no Enunciado (Passo 1)",
            },
            {
              cor: "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]",
              label: "Localização no Texto (Passo 2)",
            },
          ]}
          texto={
            <>
              "De acordo com a linha 12..." (Passo 1:{" "}
              <span className="bg-emerald-400/20 text-emerald-900 dark:text-emerald-100 border-b border-emerald-400/50 px-1 rounded-sm">
                Limite a busca
              </span>
              ). No texto: "A refinaria opera em 90%..." (Passo 2:{" "}
              <span className="bg-cyan-400/20 text-cyan-900 dark:text-cyan-100 border-b border-cyan-400/50 px-1 rounded-sm">
                Confronte o dado
              </span>
              ).
            </>
          }
        />
      </TabsContent>

      {/* ─── MÓDULO 10: ARENA DE ELITE ─── */}
      <TabsContent value="modulo-10" className="space-y-[40px]">
        <ModuleBanner
          numero={10}
          titulo="Arena de Elite"
          descricao="10 questões randômicas extraídas de nosso gigantesco repósitorio de dados textuais orientados ao concurso Petrobras 2025."
          gradiente="bg-gradient-to-br from-amber-700 via-yellow-600 to-orange-500"
        />

        <QuizInterativo
          questoes={quizFinal}
          titulo="O Exame Final de Interpretação Mestra"
          icone="👑"
          numero={10}
          variant="indigo"
          onComplete={(score) => handleModuleComplete("modulo-10", score)}
        />
      </TabsContent>
    </AulaTemplate>
  );
}
