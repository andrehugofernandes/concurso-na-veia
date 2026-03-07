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
  LuShieldAlert,
  LuSearch,
  LuLink,
  LuEye,
  LuCpu,
  LuCirclePlay as LuPlayCircle,
  LuMusic,
  LuBrain,
  LuDna,
  LuCheck,
  LuHammer,
  LuLayers,
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
    { id: "modulo-1", label: "Módulo 1", title: "A Diferença Letal" },
    { id: "modulo-2", label: "Módulo 2", title: "O Tópico Frasal" },
    { id: "modulo-3", label: "Módulo 3", title: "Leitura Estratégica" },
    { id: "modulo-4", label: "Módulo 4", title: "A Matriz Operacional" },
    { id: "modulo-5", label: "Módulo 5", title: "Engenharia da Coesão" },
    { id: "modulo-6", label: "Módulo 6", title: "Pistas e Entrelinhas" },
    { id: "modulo-7", label: "Módulo 7", title: "As Ameaças Triplas" },
    { id: "modulo-8", label: "Módulo 8", title: "A Lógica CESGRANRIO" },
    { id: "modulo-9", label: "Módulo 9", title: "Checklist Tático" },
    { id: "modulo-10", label: "Módulo 10", title: "Arena de Elite" },
  ];

  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(),
  );
  const [hasSyncedInitial, setHasSyncedInitial] = useState(false);

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
  const [quizFinal, setQuizFinal] = useState(QUIZ_FINAL_POOL);

  useEffect(() => {
    setQuizM1(getRandomQuestions(QUIZ_M1_POOL, 6));
    setQuizM2(getRandomQuestions(QUIZ_M2_POOL, 6));
    setQuizM3(getRandomQuestions(QUIZ_M3_POOL, 6));
    setQuizM4(getRandomQuestions(QUIZ_M4_POOL, 6));
    setQuizM5(getRandomQuestions(QUIZ_M5_POOL, 6));
    setQuizM6(getRandomQuestions(QUIZ_M6_POOL, 6));
    setQuizM7(getRandomQuestions(QUIZ_M7_POOL, 6));
    setQuizM8(getRandomQuestions(QUIZ_M8_POOL, 6));
    setQuizM9(getRandomQuestions(QUIZ_M9_POOL, 6));
    setQuizM10(getRandomQuestions(QUIZ_M10_POOL, 6));
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
      {/* ─── MÓDULO 1: A DIFERENÇA LETAL (DOSSIÊ PREMIUM) ─── */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="A Diferença Letal"
          descricao="O Dossiê Premium de Compreensão vs. Interpretação. A fronteira exata entre o que o texto afirma e o que a banca induz."
          gradiente="bg-gradient-to-br from-blue-700 via-sky-600 to-cyan-500"
        />

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={1}
            title="A Anatomia do Sentido: O Que Você Vê vs. O Que Você Pensa"
            variant="blue"
            description="Para a CESGRANRIO, o maior erro do candidato é 'viajar' para além dos limites do texto. Vamos blindar sua leitura agora."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-primary flex items-center gap-2">
                <LuBookOpen className="w-5 h-5" /> Compreensão (Análise Literal)
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                A compreensão é a decodificação imediata. O autor disse "X",
                você lê "X". Não há juízo de valor, apenas constatação. É o
                nível <strong>explícito</strong>.
              </p>
              <ul className="space-y-3">
                {[
                  "Foco no texto real (palavras e sintaxe).",
                  "Comandos: 'O texto afirma...', 'Segundo o autor...', 'Na linha 12...'",
                  "Resposta: Está 'esparramada' visualmente no parágrafo.",
                  "Risco: Confundir com o que VOCÊ acha do assunto.",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-foreground/80"
                  >
                    <LuCheck className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />{" "}
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <LuTarget className="w-5 h-5" /> Interpretação (Síntese Lógica)
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                A interpretação é o diálogo com o <strong>implícito</strong>.
                São as conclusões autorizadas pelas pistas que o autor deixou. É
                o nível da dedução.
              </p>
              <ul className="space-y-3">
                {[
                  "Foco na intenção educativa/persuasiva do autor.",
                  "Comandos: 'Depreende-se...', 'Infere-se que...', 'O texto sugere que...'",
                  "Resposta: Requer conectar dois ou mais pontos do texto.",
                  "Risco: Extrapolar para fora da base textual.",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-foreground/80"
                  >
                    <LuCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />{" "}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <AlertBox tipo="warning" titulo="O Alerta Cesgranrio">
            <p>
              A banca costuma colocar uma alternativa com uma verdade técnica
              ABSOLUTA sobre a Petrobras, mas que{" "}
              <strong>não foi dita no texto</strong>. Se você marcar, errou por
              Extrapolação. Lembre-se: se não está no papel, não existe na
              prova!
            </p>
          </AlertBox>

          <ContentAccordion
            mode="stacked"
            titulo="Aprofundamento: O Microscópio de Bechara"
            icone={<LuSearch />}
            corIndicador="bg-blue-600"
            defaultOpen={false}
            slides={[
              {
                titulo: "A Unidade de Sentido",
                icone: "🔍",
                conteudo: (
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Bechara ensina que o texto é uma{" "}
                      <em>unidade sociocomunicativa</em>. Isso significa que
                      cada palavra foi escolhida para um fim específico.
                    </p>
                    <p className="p-4 bg-muted/40 rounded-xl border-l-4 border-primary italic">
                      "Não analisamos frases soltas; analisamos a função que
                      aquela frase exerce no argumento global do autor."
                    </p>
                  </div>
                ),
              },
              {
                titulo: "Referenciação e Dêixis",
                icone: "🔗",
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-sm">
                      Para compreender, você deve dominar quem é quem no texto.
                      O "Ele" retoma o "Presidente" ou a "Comunicação"?
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/10">
                        <span className="font-bold text-xs block mb-1">
                          Anáfora
                        </span>
                        <p className="text-[10px]">
                          Retoma o que passou. (Segurança é vital.{" "}
                          <strong>Ela</strong> previne acidentes.)
                        </p>
                      </div>
                      <div className="p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/10">
                        <span className="font-bold text-xs block mb-1">
                          Catáfora
                        </span>
                        <p className="text-[10px]">
                          Antecipa o que virá. (O plano é <strong>este</strong>:
                          investir no pré-sal.)
                        </p>
                      </div>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </section>

        {/* LABORATÓRIO TÁTICO M1 */}
        <TextAnalysisLab
          index={1}
          titulo="Dossiê Técnico: O Relatório da Refinaria"
          subtitulo="Aplique os conceitos de explícito vs. implícito num fragmento real de manual industrial."
          legenda={[
            { cor: "bg-blue-400", label: "Fato Explícito (Compreensão)" },
            { cor: "bg-emerald-400", label: "Pista Implícita (Interpretação)" },
          ]}
          texto={
            <div className="space-y-4">
              <p>
                "A paralisia do setor de manutenção em 2023{" "}
                <span className="bg-blue-400/30 dark:bg-blue-400/20 px-1 rounded ring-1 ring-blue-400/50">
                  não decorreu de falta de verba
                </span>
                , mas de uma{" "}
                <span className="bg-emerald-400/30 dark:bg-emerald-400/20 px-1 rounded ring-1 ring-emerald-400/50">
                  crise de gestão logística sem precedentes
                </span>
                . Embora as peças estivessem estocadas, o fluxo de distribuição
                falhou,{" "}
                <span className="bg-blue-400/30 dark:bg-blue-400/20 px-1 rounded ring-1 ring-blue-400/50">
                  impedindo a liberação de 40% das ordens de serviço
                </span>{" "}
                no primeiro semestre."
              </p>
            </div>
          }
        />

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={2}
            title="Laboratório de Gabarito: Certo vs Errado"
            variant="blue"
            description="Teste sua percepção antes do quiz final do módulo."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FlipCard
              frente="O texto conclui que a manutenção parou por falta de dinheiro."
              verso={
                <div className="space-y-2">
                  <span className="font-bold text-red-500 block">
                    ❌ ERRADO
                  </span>
                  <p className="text-sm">
                    O texto afirma explicitamente que 'não decorreu de falta de
                    verba'. Isso é erro de CONTRADIÇÃO.
                  </p>
                </div>
              }
            />
            <FlipCard
              frente="A gestão interna foi o principal gargalo técnico relatado."
              verso={
                <div className="space-y-2">
                  <span className="font-bold text-emerald-500 block">
                    ✅ CERTO
                  </span>
                  <p className="text-sm">
                    A expressão 'crise de gestão logística' sustenta essa
                    interpretação como a causa raiz do problema.
                  </p>
                </div>
              }
            />
          </div>
        </section>

        {/* SEÇÃO DE CONSOLIDAÇÃO M1 (ANTES DO QUIZ) */}
        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={3}
            title="Consolidação e Resumo"
            variant="blue"
            description="Tudo o que você precisa fixar antes do desafio final."
          />
          <LessonTabs
            variant="blue"
            tabs={[
              {
                id: "resumo",
                label: "Resumo Técnico",
                icon: LuBookOpen,
                content: (
                  <div className="space-y-4 text-muted-foreground p-4">
                    <p className="font-bold text-foreground">
                      Compreensão vs Interpretação:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                      <li>
                        <strong>Compreensão:</strong> É o que está escrito. O
                        explícito. Foco nos comandos: "O autor afirma", "Segundo
                        o texto".
                      </li>
                      <li>
                        <strong>Interpretação:</strong> É o que se conclui. O
                        implícito autorizado. Foco nos comandos: "Infere-se",
                        "Depreende-se".
                      </li>
                      <li>
                        <strong>Cuidado:</strong> A CESGRANRIO usa "achismos" e
                        conhecimentos externos como distratores.
                      </li>
                    </ul>
                  </div>
                ),
              },
              {
                id: "mapas",
                label: "Mapas Mentais",
                icon: LuBrain,
                content: (
                  <ModuleSummaryCarouselNew
                    moduloNome="A Diferença Letal"
                    tituloAula="Interpretação de Texto"
                    materia="Língua Portuguesa"
                    images={[
                      {
                        title: "Mapa 1: A Fronteira do Sentido",
                        type: "Diagrama Lógico",
                        placeholderColor: "bg-blue-100",
                        imageUrl: "/temp-img.png",
                      },
                      {
                        title: "Mapa 2: Comandos de Prova",
                        type: "Infográfico",
                        placeholderColor: "bg-sky-100",
                        imageUrl: "/temp-img.png",
                      },
                      {
                        title: "Mapa 3: Fluxo de Eliminação",
                        type: "Tático",
                        placeholderColor: "bg-cyan-100",
                        imageUrl: "/temp-img.png",
                      },
                    ]}
                  />
                ),
              },
              {
                id: "multimidia",
                label: "Multimídia",
                icon: LuPlayCircle,
                content: (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <VideoModal
                      videoId="dQw4w9WgXcQ"
                      title="A Diferença que te faz Passar"
                      duration="08:45"
                    />
                    <MusicPlayerCard
                      audioUrl="#"
                      titulo="Podcast: Decifrando o Relatório Técnico"
                      artista="Dossiê Petrobras"
                      capaUrl="https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000"
                      lyrics="[Intro] - Bem-vindo ao Dossiê.\n[Host] - Hoje vamos falar de como a Cesgranrio cobra a diferença entre o que você vê e o que você conclui num manual de segurança...\n[Especialista] - O segredo está em não projetar seus medos no texto..."
                    />
                  </div>
                ),
              },
              {
                id: "pratica",
                label: "Dicas de Elite",
                icon: LuTarget,
                content: (
                  <div className="p-6 bg-blue-500/5 rounded-2xl border border-blue-500/10">
                    <h4 className="font-bold text-blue-500 mb-2">
                      Checklist de Resposta:
                    </h4>
                    <p className="text-sm italic">
                      "Ao marcar uma opção, encontre o parágrafo que a sustenta.
                      Se você não achar uma base visual, mude a resposta. A
                      Cesgranrio é literal na compreensão e lógica na
                      inferência."
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <QuizInterativo
          questoes={quizM1}
          titulo="Blindagem de Módulo: Fundamentos"
          icone="🛡️"
          numero={1}
          variant="blue"
          onComplete={(score) => handleModuleComplete("modulo-1", score)}
        />
      </TabsContent>

      {/* ─── MÓDULO 2: O TÓPICO FRASAL ─── */}
      <TabsContent value="modulo-2" className="space-y-[40px]">
        <ModuleBanner
          numero={2}
          titulo="O Tópico Frasal"
          descricao="A técnica cirúrgica para encontrar a ideia central do parágrafo em segundos, ignorando o ruído visual."
          gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-500"
        />

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={1}
            title="A Engenharia do Parágrafo: A Viga Mestra"
            variant="emerald"
            description="Entender o tópico frasal é como identificar a viga de sustentação de um edifício: sem ela, o resto do conteúdo desmorona."
          />

          <div className="space-y-8">
            <div className="p-6 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
              <h4 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 flex items-center gap-2">
                <LuTarget className="w-5 h-5" /> Definição de Elite
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                O <strong>Tópico Frasal</strong> é o núcleo do parágrafo. Em
                textos técnicos da Petrobras, ele costuma ser curto, direto e
                está localizado logo na primeira frase (o chamado "Ponto de
                Impacto"). Se você domina a identificação dele, sua velocidade
                de leitura dobra.
              </p>
            </div>

            <ContentAccordion
              mode="stacked"
              titulo="Métodos de Construção do Tópico Frasal"
              icone={<LuCpu />}
              corIndicador="bg-emerald-600"
              defaultOpen={true}
              slides={[
                {
                  titulo: "1. Declaração Inicial (O Padrão Ouro)",
                  icone: "📌",
                  conteudo: (
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p>
                        O autor faz uma afirmação categórica logo no início e
                        passa o resto do parágrafo provando-a.
                      </p>
                      <p className="p-3 bg-muted rounded-lg border-l-2 border-emerald-500">
                        "A transição para o hidrogênio verde exige
                        infraestrutura robusta." (Tópico Frasal) &rarr; Seguido
                        de dados sobre usinas e dutos.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "2. Definição (O Padrão Didático)",
                  icone: "📖",
                  conteudo: (
                    <p className="text-sm text-muted-foreground">
                      O parágrafo começa definindo um termo técnico ou conceito.
                      Comum em manuais de operação e normas de segurança
                      (EPI/EPC).
                    </p>
                  ),
                },
                {
                  titulo: "3. Contraste (O Padrão Argumentativo)",
                  icone: "⚖️",
                  conteudo: (
                    <p className="text-sm text-muted-foreground">
                      O foco é a oposição entre dois fatos. "Enquanto o custo de
                      extração sobe, a eficiência das bombas compensa o
                      impacto."
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </section>

        <TextAnalysisLab
          index={2}
          titulo="Raio-X do Parágrafo Técnico"
          subtitulo="Identifique a 'Viga Mestra' e como ela sustenta os 'Adornos' (detalhes)."
          legenda={[
            { cor: "bg-emerald-500", label: "Tópico Frasal (Viga)" },
            { cor: "bg-slate-400", label: "Desenvolvimento (Adorno)" },
          ]}
          texto={
            <div className="space-y-4">
              <p>
                "
                <span className="bg-emerald-500/30 dark:bg-emerald-500/20 px-1 rounded ring-1 ring-emerald-500/50">
                  A segurança operacional em plataformas offshore é
                  indissociável da saúde mental da equipe
                </span>
                . Dados recentes indicam que 30% dos incidentes leves decorrem
                de fadiga cognitiva. Além disso, o regime de confinamento exige
                protocolos de lazer que, embora pareçam secundários,{" "}
                <span className="bg-slate-400/30 dark:bg-slate-400/20 px-1 rounded ring-1 ring-slate-400/50 italic">
                  blindam a operação contra falhas humanas catastróficas
                </span>
                ."
              </p>
            </div>
          }
        />

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={2}
            title="Prática de Combate: Localização"
            variant="emerald"
            description="Onde está o coração do texto?"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FlipCard
              frente="O Tópico Frasal pode vir no final do parágrafo?"
              verso={
                <div className="space-y-2">
                  <span className="font-bold text-emerald-500 block">
                    ✅ SIM
                  </span>
                  <p className="text-sm">
                    Chama-se parágrafo INDUTIVO. O autor apresenta fatos e fecha
                    com a conclusão (Tópico Frasal).
                  </p>
                </div>
              }
            />
            <FlipCard
              frente="Todo parágrafo TEM um Tópico Frasal explícito?"
              verso={
                <div className="space-y-2">
                  <span className="font-bold text-red-500 block">❌ NÃO</span>
                  <p className="text-sm">
                    Em textos narrativos ou muito fragmentados, a ideia central
                    pode estar implícita na soma das partes.
                  </p>
                </div>
              }
            />
          </div>
        </section>

        {/* Consolidação e Labs M2 (ANTES DO QUIZ) */}
        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={3}
            title="Consolidação e Resumo"
            variant="emerald"
            description="A técnica do tópico frasal aplicada."
          />
          <LessonTabs
            variant="emerald"
            tabs={[
              {
                id: "resumo",
                label: "Resumo Técnico",
                icon: LuBookOpen,
                content: (
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground p-4">
                    <li>
                      <strong>Tópico Frasal:</strong> Frase núcleo que carrega a
                      ideia central.
                    </li>
                    <li>
                      <strong>Localização:</strong> Geralmente no início
                      (Dedução) ou no fim (Indução).
                    </li>
                    <li>
                      <strong>Utilidade:</strong> Permite o Skimming (leitura
                      rápida) eficiente em provas longas.
                    </li>
                  </ul>
                ),
              },
              {
                id: "mapas",
                label: "Mapas Mentais",
                icon: LuBrain,
                content: (
                  <ModuleSummaryCarouselNew
                    moduloNome="O Tópico Frasal"
                    tituloAula="Interpretação de Texto"
                    materia="Língua Portuguesa"
                    images={[
                      {
                        title: "Mapa 1: Anatomia do Parágrafo",
                        type: "Infográfico",
                        placeholderColor: "bg-emerald-100",
                        imageUrl: "/temp-img.png",
                      },
                      {
                        title: "Mapa 2: Ponto de Impacto",
                        type: "Tático",
                        placeholderColor: "bg-teal-100",
                        imageUrl: "/temp-img.png",
                      },
                      {
                        title: "Mapa 3: Padrões de Abertura",
                        type: "Diagrama",
                        placeholderColor: "bg-cyan-100",
                        imageUrl: "/temp-img.png",
                      },
                    ]}
                  />
                ),
              },
              {
                id: "multimidia",
                label: "Multimídia",
                icon: LuPlayCircle,
                content: (
                  <div className="flex flex-col items-center">
                    <VideoModal
                      videoId="dQw4w9WgXcQ"
                      title="A Engenharia do Parágrafo"
                      duration="06:30"
                    />
                  </div>
                ),
              },
              {
                id: "pratica",
                label: "Dicas de Elite",
                icon: LuTarget,
                content: (
                  <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10 text-sm">
                    <strong>Macete:</strong> Se você ler apenas a primeira frase
                    de cada parágrafo, você deve ser capaz de entender 80% da
                    linha de raciocínio do autor.
                  </div>
                ),
              },
            ]}
          />
        </section>

        <TextAnalysisLab
          index={4}
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

        <QuizInterativo
          questoes={quizM2}
          titulo="Blindagem de Módulo: Arquitetura"
          icone="🏗️"
          numero={2}
          variant="emerald"
          onComplete={(score) => handleModuleComplete("modulo-2", score)}
        />
      </TabsContent>

      {/* ─── MÓDULO 3: LEITURA ESTRATÉGICA ─── */}
      <TabsContent value="modulo-3" className="space-y-[40px]">
        <ModuleBanner
          numero={3}
          titulo="Coesão e Argumentação"
          descricao="A 'Cola' que une as ideias e os 'Martelos' que as sustentam. Como a Cesgranrio cobra a lógica invisível."
          gradiente="bg-gradient-to-br from-amber-600 via-orange-500 to-yellow-500"
        />

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={1}
            title="A Engenharia da Conexão"
            variant="amber"
            description="Um texto não é uma pilha de frases; é uma rede de conexões. Se um elo falha, o sentido desaba."
          />

          <div className="space-y-8">
            <div className="p-6 bg-amber-500/5 rounded-2xl border border-amber-500/10">
              <h4 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-4 flex items-center gap-2">
                <LuLink className="w-5 h-5" /> Coesão Referencial vs. Sequencial
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                A <strong>Coesão Referencial</strong> evita a repetição (uso de
                "ele", "cujo", "o qual"). A <strong>Coesão Sequencial</strong>{" "}
                faz o texto andar usando conectivos (conjunções). Nas provas da
                Petrobras, identificar a que termo um pronome se refere é
                questão certa.
              </p>
            </div>

            <ContentAccordion
              mode="stacked"
              titulo="Operadores Argumentativos de Alto Impacto"
              icone={<LuHammer />}
              corIndicador="bg-amber-600"
              defaultOpen={true}
              slides={[
                {
                  titulo: "1. Oposição (Adversativas/Concessivas)",
                  icone: "⚖️",
                  conteudo: (
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p>
                        O autor apresenta um obstáculo mas mantém a ideia
                        principal. "Embora" (concessiva) é o conectivo favorito
                        da banca.
                      </p>
                      <p className="p-3 bg-muted rounded-lg border-l-2 border-amber-500 font-mono">
                        Embora o pré-sal seja caro [Obstáculo], a tecnologia o
                        torna viável [Foco].
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "2. Conclusão e Consequência",
                  icone: "🎯",
                  conteudo: (
                    <p className="text-sm text-muted-foreground">
                      Marcadores como "Portanto", "Desse modo", "Por
                      conseguinte". Eles amarram o raciocínio final do autor ou
                      mostram o efeito de uma causa anterior.
                    </p>
                  ),
                },
                {
                  titulo: "3. Retificação e Ênfase",
                  icone: "📢",
                  conteudo: (
                    <p className="text-sm text-muted-foreground">
                      "Aliás", "Ou melhor", "Inclusive". Servem para ajustar a
                      precisão de um dado técnico ou dar peso a uma afirmação.
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </section>

        <TextAnalysisLab
          index={3}
          titulo="Rastreamento de Referentes"
          subtitulo="A quem este pronome está servindo? Evite a armadilha do referente mais próximo."
          legenda={[
            { cor: "bg-amber-500", label: "Referente Principal" },
            { cor: "bg-slate-400", label: "Anáfora (Substituto)" },
          ]}
          texto={
            <div className="space-y-4">
              <p>
                "A{" "}
                <span className="bg-amber-500/30 dark:bg-amber-500/20 px-1 rounded ring-1 ring-amber-500/50">
                  subsidiária
                </span>{" "}
                enviou o relatório ao comitê de ética após{" "}
                <span className="bg-slate-400/30 dark:bg-slate-400/20 px-1 rounded ring-1 ring-slate-400/50 font-bold italic">
                  esta
                </span>{" "}
                detectar irregularidades no balanço."
              </p>
              <div className="p-3 bg-amber-500/5 dark:bg-amber-500/10 border-l-4 border-amber-500 text-xs text-amber-800 dark:text-amber-200">
                Atenção: "Esta" (pronome demonstrativo) refere-se ao elemento
                mais próximo: o <strong>comitê de ética</strong>, e não à
                subsidiária.
              </div>
            </div>
          }
        />

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={2}
            title="Mecânica Argumentativa"
            variant="amber"
            description="Entenda como o autor te convence."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FlipCard
              frente="Qual a diferença semântica entre 'Mas' e 'Embora'?"
              verso={
                <div className="space-y-2">
                  <span className="font-bold text-amber-500 block">
                    📊 HIERARQUIA
                  </span>
                  <p className="text-sm">
                    O 'Mas' enfatiza o que vem depois. O 'Embora' enfatiza a
                    oração principal, deixando a oposição em segundo plano.
                  </p>
                </div>
              }
            />
            <FlipCard
              frente="O termo 'Pois' pode ser explicativo ou conclusivo?"
              verso={
                <div className="space-y-2">
                  <span className="font-bold text-emerald-500 block">
                    ✅ Depende da Posição
                  </span>
                  <p className="text-sm">
                    Antes do verbo: Explicativo. Entre vírgulas, após o verbo:
                    Conclusivo (Sinônimo de 'Portanto').
                  </p>
                </div>
              }
            />
          </div>
        </section>

        {/* Consolidação M3 (Antes do Quiz) */}
        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={3}
            title="Consolidação e Resumo"
            variant="amber"
            description="Fixando as conexões lógicas."
          />
          <LessonTabs
            variant="amber"
            tabs={[
              {
                id: "resumo",
                label: "Resumo Técnico",
                icon: LuBookOpen,
                content: (
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground p-4">
                    <li>
                      <strong>Coesão Referencial:</strong> Retoma termos (Ele,
                      Este, O qual).
                    </li>
                    <li>
                      <strong>Coesão Sequencial:</strong> Conectivos que fazem o
                      texto andar (Mas, Embora, Pois).
                    </li>
                    <li>
                      <strong>Dica:</strong> 'Mas' enfatiza o que vem depois.
                      'Embora' enfatiza a oração principal.
                    </li>
                  </ul>
                ),
              },
              {
                id: "mapas",
                label: "Mapas Mentais",
                icon: LuBrain,
                content: (
                  <ModuleSummaryCarouselNew
                    moduloNome="Coesão e Argumentação"
                    tituloAula="Interpretação de Texto"
                    materia="Língua Portuguesa"
                    images={[
                      {
                        title: "Mapa 1: Teia de Conectivos",
                        type: "Diagrama",
                        placeholderColor: "bg-amber-100",
                        imageUrl: "/temp-img.png",
                      },
                      {
                        title: "Mapa 2: Referenciação",
                        type: "Infográfico",
                        placeholderColor: "bg-orange-100",
                        imageUrl: "/temp-img.png",
                      },
                      {
                        title: "Mapa 3: Operadores Lógicos",
                        type: "Tático",
                        placeholderColor: "bg-yellow-100",
                        imageUrl: "/temp-img.png",
                      },
                    ]}
                  />
                ),
              },
              {
                id: "multimidia",
                label: "Multimídia",
                icon: LuMusic,
                content: (
                  <MusicPlayerCard
                    audioUrl="#"
                    titulo="Resumo: Conectivos de Impacto"
                    artista="Dossiê Petrobras"
                    capaUrl="https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000"
                    lyrics="[Intro] - A cola do texto...\n[Dica] - Se vir um 'Embora', saiba que a ideia principal vem depois da vírgula..."
                  />
                ),
              },
              {
                id: "pratica",
                label: "Dicas de Elite",
                icon: LuTarget,
                content: (
                  <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/10 text-sm">
                    <strong>Atenção:</strong> O pronome 'Este' retoma o elemento
                    mais próximo. 'Aquele' retoma o mais distante. A Cesgranrio
                    AMA cobrar isso.
                  </div>
                ),
              },
            ]}
          />
        </section>

        <TextAnalysisLab
          index={4}
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

        <QuizInterativo
          questoes={quizM3}
          titulo="Blindagem de Módulo: Lógica"
          icone="🧠"
          numero={3}
          variant="amber"
          onComplete={(score) => handleModuleComplete("modulo-3", score)}
        />
      </TabsContent>

      {/* ─── MÓDULO 4: TIPOLOGIA TEXTUAL (DOSSIÊ PREMIUM) ─── */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner
          numero={4}
          titulo="Tipologia Textual"
          descricao="O DNA do Texto. Identifique o gênero e o tipo predominante para antecipar a intenção do autor."
          gradiente="bg-gradient-to-br from-indigo-600 via-blue-700 to-cyan-500"
        />

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={1}
            title="A Matriz de Tipos: O Filtro Petrobras"
            variant="blue"
            description="As provas para engenharia e operação focam em Dissertação e Injunção. Mas as armadilhas estão nos textos Narrativos disfarçados."
          />

          <div className="space-y-8">
            <div className="p-6 bg-indigo-500/5 rounded-2xl border border-indigo-500/10">
              <h4 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 flex items-center gap-2">
                <LuLayers className="w-5 h-5" /> Tipos Base vs. Gêneros
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                O <strong>Tipo Textual</strong> é a estrutura (narrar,
                descrever, dissertar). O <strong>Gênero</strong> é o uso social
                (editorial, relatório, crônica, edital). A Cesgranrio adora
                perguntar: "O texto X apresenta marcas predominantes de...".
              </p>
            </div>

            <ContentAccordion
              mode="stacked"
              titulo="O Trio de Ouro da Cesgranrio"
              icone={<LuBrain />}
              corIndicador="bg-indigo-600"
              defaultOpen={true}
              slides={[
                {
                  titulo: "1. Dissertação-Argumentativa",
                  icone: "🖋️",
                  conteudo: (
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <p>
                        Foco em convencer. Presença marcante de verbos no
                        presente e conectivos de conclusão/oposição. O autor
                        defende uma tese.
                      </p>
                      <p className="p-3 bg-muted rounded-lg border-l-2 border-indigo-500 italic">
                        "É imperativo que a empresa adote energias limpas por
                        questões de solvência."
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "2. Dissertação-Expositiva",
                  icone: "📊",
                  conteudo: (
                    <p className="text-sm text-muted-foreground">
                      Foco em informar. Texto neutro, impessoal, repleto de
                      dados técnicos e definições, sem interesse em persuadir,
                      apenas em esclarecer. Comum em manuais de refino.
                    </p>
                  ),
                },
                {
                  titulo: "3. Texto Injuntivo (O Comando)",
                  icone: "⚙️",
                  conteudo: (
                    <p className="text-sm text-muted-foreground">
                      Aquele que dá ordens ou instruções. Verbos no imperativo
                      ou infinitivo com valor de ordem. "Abra a válvula",
                      "Verifique a pressão", "Evite fumar".
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </section>

        <TextAnalysisLab
          index={4}
          titulo="Identificando o DNA"
          subtitulo="Qual a intenção primária do autor neste fragmento?"
          legenda={[
            { cor: "bg-indigo-500", label: "Marca de Dissertação" },
            { cor: "bg-amber-400", label: "Marca de Injunção (Instrução)" },
          ]}
          texto={
            <div className="space-y-4">
              <p>
                "
                <span className="bg-indigo-500/30 dark:bg-indigo-500/20 px-1 rounded ring-1 ring-indigo-500/50">
                  Considerando a instabilidade geopolítica, a Petrobras deve
                  priorizar a autosuficiência asfáltica
                </span>
                . Para isso,{" "}
                <span className="bg-amber-400/30 dark:bg-amber-400/20 px-1 rounded ring-1 ring-amber-400/50 italic font-bold">
                  realoque os investimentos
                </span>{" "}
                da unidade X para a unidade Y imediatamente."
              </p>
              <div className="p-3 bg-indigo-500/5 dark:bg-indigo-500/10 border-l-4 border-indigo-500 text-xs text-indigo-800 dark:text-indigo-200">
                Análise: O texto é híbrido, mas a <strong>predominância</strong>{" "}
                é dissertativa no início (tese) e injuntiva no final (comando).
              </div>
            </div>
          }
        />

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={2}
            title="Duelo de Gêneros"
            variant="blue"
            description="Não confunda a roupa com o corpo."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FlipCard
              frente="Um editorial de jornal é sempre Argumentativo?"
              verso={
                <div className="space-y-2">
                  <span className="font-bold text-indigo-500 block">
                    ✅ QUASE SEMPRE
                  </span>
                  <p className="text-sm">
                    Editoriais expressam a opinião do veículo de comunicação. Se
                    expressa opinião, é Dissertativo-Argumentativo.
                  </p>
                </div>
              }
            />
            <FlipCard
              frente="Quais as marcas da narração que aparecem na prova?"
              verso={
                <div className="space-y-2">
                  <span className="font-bold text-red-500 block">
                    🕒 TEMPO E ESPAÇO
                  </span>
                  <p className="text-sm">
                    Verbos no pretérito, progressão cronológica e personagens.
                    Geralmente em textos de apoio sobre a história da energia.
                  </p>
                </div>
              }
            />
          </div>
        </section>

        {/* Consolidação M4 (Antes do Quiz) */}
        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={3}
            title="Consolidação e Resumo"
            variant="blue"
            description="Tipologias e Gêneros em foco."
          />
          <LessonTabs
            variant="blue"
            tabs={[
              {
                id: "resumo",
                label: "Resumo Técnico",
                icon: LuBookOpen,
                content: (
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground p-4">
                    <li>
                      <strong>Dissertação:</strong> Defesa de ideias. Foco da
                      Petrobras.
                    </li>
                    <li>
                      <strong>Exposição:</strong> Apenas informa fatos.
                    </li>
                    <li>
                      <strong>Injunção:</strong> Dá ordens/instruções. Típico de
                      manuais.
                    </li>
                    <li>
                      <strong>Narração:</strong> Conta fatos no tempo
                      (pretérito).
                    </li>
                  </ul>
                ),
              },
              {
                id: "mapas",
                label: "Mapas Mentais",
                icon: LuBrain,
                content: (
                  <ModuleSummaryCarouselNew
                    moduloNome="Tipologia Textual"
                    tituloAula="Interpretação de Texto"
                    materia="Língua Portuguesa"
                    images={[
                      {
                        title: "Mapa 1: Matriz de Tipos",
                        type: "Diagrama",
                        placeholderColor: "bg-blue-100",
                        imageUrl: "/temp-img.png",
                      },
                      {
                        title: "Mapa 2: Gêneros Recorrentes",
                        type: "Infográfico",
                        placeholderColor: "bg-sky-100",
                        imageUrl: "/temp-img.png",
                      },
                      {
                        title: "Mapa 3: Verbos de Comando",
                        type: "Tático",
                        placeholderColor: "bg-indigo-100",
                        imageUrl: "/temp-img.png",
                      },
                    ]}
                  />
                ),
              },
              {
                id: "multimidia",
                label: "Multimídia",
                icon: LuPlayCircle,
                content: (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <VideoModal
                      videoId="dQw4w9WgXcQ"
                      title="Tipologias e Gêneros Funcionais"
                      duration="08:20"
                    />
                    <MusicPlayerCard
                      audioUrl="#"
                      titulo="Resumo: Tipologias e Gêneros"
                      artista="Prof. Antigravity"
                      capaUrl="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop"
                      lyrics={`(Verso)\nSe tem verbo no imperativo, é injuntivo com certeza...\nSe relata um acidente, é narrativa a natureza.`}
                    />
                  </div>
                ),
              },
              {
                id: "pratica",
                label: "Dicas de Elite",
                icon: LuTarget,
                content: (
                  <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/10 text-sm">
                    <strong>Gatilho:</strong> Se o texto te dá um passo a passo,
                    ele é **Injuntivo**. Se ele tenta te convencer, ele é
                    **Dissertativo**.
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
      </TabsContent>

      {/* ─── MÓDULO 5: VÍCIOS E VELOCIDADE (DOSSIÊ PREMIUM) ─── */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="Vícios e Velocidade"
          descricao="Elimine as âncoras que te impedem de ler os textos técnicos da Petrobras em tempo recorde."
          gradiente="bg-gradient-to-br from-emerald-600 via-green-500 to-teal-500"
        />

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={1}
            title="As Âncoras do Candidato"
            variant="emerald"
            description="Para ler rápido, não é preciso ler 'correndo', mas sim ler sem carregar peso desnecessário."
          />
          <p className="text-muted-foreground leading-relaxed">
            Eliminar vícios de leitura é o primeiro passo para dominar os textos
            técnicos da Petrobras sem estourar o cronômetro da prova.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <FlipCard
              frente="O que é a Subvocalização?"
              verso={
                <p className="text-sm">
                  É o hábito de 'ouvir' a voz na mente enquanto lê. Isso limita
                  sua velocidade de leitura à velocidade da fala (150 ppm).
                  Leitura visual pura atinge 600+ ppm.
                </p>
              }
            />
            <FlipCard
              frente="Por que a Regressão Ocular é fatal?"
              verso={
                <p className="text-sm">
                  Voltar ao início da frase porque 'não entendeu'. Isso destrói
                  a coesão mental. O cérebro entende melhor no fluxo contínuo.
                </p>
              }
            />
          </div>

          <div className="space-y-6 mt-10">
            <h4 className="text-xl font-bold text-emerald-600 flex items-center gap-2">
              <LuTarget className="w-5 h-5" /> Técnica do Guia Visual
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              Use a ponta de uma caneta (ou o cursor do mouse) para guiar o
              olho. O seu olho é atraído pelo movimento. Ao seguir um guia, você
              evita saltos e regressões, mantendo o foco nos{" "}
              <strong>termos operacionais</strong> do texto técnico.
            </p>

            <ContentAccordion
              mode="stacked"
              titulo="Níveis de Leitura para a Prova"
              icone={<LuEye />}
              corIndicador="bg-emerald-600"
              slides={[
                {
                  titulo: "1. Leitura de Reconhecimento",
                  icone: "🔍",
                  conteudo: (
                    <p className="text-xs text-muted-foreground">
                      Busca de palavras-chave. Usada após ler o enunciado.
                    </p>
                  ),
                },
                {
                  titulo: "2. Leitura de Compreensão",
                  icone: "📘",
                  conteudo: (
                    <p className="text-xs text-muted-foreground">
                      Para entender a lógica dos parágrafos e a tese do autor.
                    </p>
                  ),
                },
                {
                  titulo: "3. Leitura Analítica",
                  icone: "⚖️",
                  conteudo: (
                    <p className="text-xs text-muted-foreground">
                      Focada em um único período para identificar pegadinhas de
                      negação ou restrição.
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </section>

        <TextAnalysisLab
          index={5}
          titulo="Laboratório de Velocidade"
          subtitulo="Tente captar o sentido dos blocos destacados sem subvocalizar."
          legenda={[
            { cor: "bg-emerald-500", label: "Bloco de Sentido (Chunk)" },
          ]}
          texto={
            <div className="flex flex-wrap gap-2 leading-relaxed">
              <span className="bg-emerald-500/20 px-1 rounded border border-emerald-500/30">
                O refino de petróleo
              </span>
              <span className="bg-emerald-500/20 px-1 rounded border border-emerald-500/30">
                no Brasil enfrenta
              </span>
              <span className="bg-emerald-500/20 px-1 rounded border border-emerald-500/30">
                desafios logísticos
              </span>
              <span className="bg-emerald-500/20 px-1 rounded border border-emerald-500/30">
                sem precedentes
              </span>
              <span className="bg-emerald-500/20 px-1 rounded border border-emerald-500/30">
                devido à escala.
              </span>
            </div>
          }
        />

        {/* Consolidação M5 (Antes do Quiz) */}
        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={2}
            title="Consolidação e Resumo"
            variant="emerald"
            description="Técnicas de Leitura de Elite."
          />
          <LessonTabs
            variant="emerald"
            tabs={[
              {
                id: "resumo",
                label: "Resumo Técnico",
                icon: LuBookOpen,
                content: (
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground p-4">
                    <li>
                      <strong>Subvocalização:</strong> O 'eco' mental que limita
                      a velocidade.
                    </li>
                    <li>
                      <strong>Regressão:</strong> O hábito de voltar frases
                      (mata a compreensão).
                    </li>
                    <li>
                      <strong>Guia Visual:</strong> Usar a caneta para focar o
                      olho.
                    </li>
                  </ul>
                ),
              },
              {
                id: "mapas",
                label: "Mapas Mentais",
                icon: LuBrain,
                content: (
                  <ModuleSummaryCarouselNew
                    moduloNome="Vícios de Leitura"
                    tituloAula="Interpretação de Texto"
                    materia="Língua Portuguesa"
                    images={[
                      {
                        title: "Mapa 1: Barreiras Mentais",
                        type: "Diagrama",
                        placeholderColor: "bg-emerald-100",
                        imageUrl: "/temp-img.png",
                      },
                      {
                        title: "Mapa 2: Fluxo de Escaneamento",
                        type: "Tático",
                        placeholderColor: "bg-teal-100",
                        imageUrl: "/temp-img.png",
                      },
                      {
                        title: "Mapa 3: Foco Ocular",
                        type: "Infográfico",
                        placeholderColor: "bg-green-100",
                        imageUrl: "/temp-img.png",
                      },
                    ]}
                  />
                ),
              },
              {
                id: "multimidia",
                label: "Multimídia",
                icon: LuPlayCircle,
                content: (
                  <VideoModal
                    videoId="dQw4w9WgXcQ"
                    title="Leitura de Velocidade"
                    duration="06:20"
                  />
                ),
              },
              {
                id: "pratica",
                label: "Exercício de Campo",
                icon: LuTarget,
                content: (
                  <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10 text-sm">
                    <strong>Desafio:</strong> Tente ler o próximo texto da
                    Petrobras apenas captando os 'chunks' (blocos) de sentido,
                    sem 'pronunciar' as palavras na mente.
                  </div>
                ),
              },
            ]}
          />
        </section>

        <QuizInterativo
          questoes={quizM5}
          titulo="Blindagem de Módulo: Alta Performance"
          icone="⚡"
          numero={5}
          variant="emerald"
          onComplete={(score) => handleModuleComplete("modulo-5", score)}
        />
      </TabsContent>

      {/* ─── MÓDULO 6: AS ENTRELINHAS (DOSSIÊ PREMIUM) ─── */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <ModuleBanner
          numero={6}
          titulo="As Entrelinhas (Inferência)"
          descricao="A arte de ler o que não foi escrito, mas foi 'pago' para ser entendido. Pressupostos vs Subentendidos."
          gradiente="bg-gradient-to-br from-sky-600 via-cyan-600 to-teal-500"
        />

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={1}
            title="Lógica de Detecção"
            variant="cyan"
            description="Não é 'achismo'. É dedução lógica baseada em marcas gramaticais."
          />
          <p className="text-muted-foreground leading-relaxed">
            A inferência na Cesgranrio não é um exercício de imaginação, mas sim
            a extração de dados contidos nas dobras da linguagem.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <FlipCard
              frente="O que é um Pressuposto?"
              verso={
                <div className="space-y-2">
                  <span className="font-bold text-cyan-500 block">
                    ADMITIDO PELO TEXTO
                  </span>
                  <p className="text-sm">
                    Informação que o texto não diz explicitamente, mas que é
                    obrigatória para o sentido da frase. Geralmente introduzida
                    por verbos como 'deixar de', 'continuar' ou advérbios como
                    'ainda'.
                  </p>
                </div>
              }
            />
            <FlipCard
              frente="O que é um Subentendido?"
              verso={
                <div className="space-y-2">
                  <span className="font-bold text-sky-500 block">
                    SUGERIDO PELO CONTEXTO
                  </span>
                  <p className="text-sm">
                    Insinuação que depende da interpretação do leitor e do
                    contexto. O autor pode negar se for confrontado. Não há
                    marca gramatical 'blindada'.
                  </p>
                </div>
              }
            />
          </div>
          <div className="space-y-6 mt-10">
            <h4 className="text-xl font-bold text-cyan-600 flex items-center gap-2">
              <LuSearch className="w-5 h-5" /> Gatilhos de Inferência
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl border border-cyan-200 dark:border-cyan-800">
                <span className="font-bold block mb-1">Verbos de Mudança</span>
                <p className="text-[10px] text-muted-foreground">
                  'Parou de' implica que antes fazia.
                </p>
              </div>
              <div className="p-4 bg-sky-50 dark:bg-sky-900/20 rounded-xl border border-sky-200 dark:border-sky-800">
                <span className="font-bold block mb-1">
                  Advérbios Temporais
                </span>
                <p className="text-[10px] text-muted-foreground">
                  'Ainda' implica que algo deve mudar.
                </p>
              </div>
              <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-200 dark:border-teal-800">
                <span className="font-bold block mb-1">
                  Adjetivos Valorativos
                </span>
                <p className="text-[10px] text-muted-foreground">
                  'O excelente' implica um julgamento de valor do autor.
                </p>
              </div>
            </div>
          </div>
        </section>

        <TextAnalysisLab
          index={6}
          titulo="Laboratório de Inferência"
          subtitulo="Extraia o pressuposto oculto na frase operacional."
          legenda={[{ cor: "bg-cyan-500", label: "Marca de Pressuposto" }]}
          texto={
            <>
              "A Petrobras{" "}
              <span className="bg-cyan-500/20 px-1 rounded border border-cyan-500/30 font-bold italic">
                continuará
              </span>{" "}
              investindo em refino sustentável." (Pressuposto: Já investe hoje).
            </>
          }
        />

        {/* Consolidação M6 (Antes do Quiz) */}
        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={2}
            title="Consolidação e Resumo"
            variant="cyan"
            description="Mapeando as entrelinhas."
          />
          <LessonTabs
            variant="cyan"
            tabs={[
              {
                id: "resumo",
                label: "Resumo Técnico",
                icon: LuBookOpen,
                content: (
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground p-4">
                    <li>
                      <strong>Pressuposto:</strong> Garantido pela gramática
                      (não pode ser negado).
                    </li>
                    <li>
                      <strong>Subentendido:</strong> Sugerido pelo contexto
                      (pode ser negado).
                    </li>
                    <li>
                      <strong>Gatilhos:</strong> 'Ainda', 'Já', 'Parou de'.
                    </li>
                  </ul>
                ),
              },
              {
                id: "mapas",
                label: "Mapas Mentais",
                icon: LuBrain,
                content: (
                  <ModuleSummaryCarouselNew
                    moduloNome="As Entrelinhas"
                    tituloAula="Interpretação de Texto"
                    materia="Língua Portuguesa"
                    images={[
                      {
                        title: "Mapa 1: Anatomia da Inferência",
                        type: "Diagrama",
                        placeholderColor: "bg-cyan-100",
                        imageUrl: "/temp-img.png",
                      },
                      {
                        title: "Mapa 2: Gatilhos Gramaticais",
                        type: "Infográfico",
                        placeholderColor: "bg-sky-100",
                        imageUrl: "/temp-img.png",
                      },
                      {
                        title: "Mapa 3: Filtro de Verdade",
                        type: "Tático",
                        placeholderColor: "bg-teal-100",
                        imageUrl: "/temp-img.png",
                      },
                    ]}
                  />
                ),
              },
              {
                id: "multimidia",
                label: "Multimídia",
                icon: LuPlayCircle,
                content: (
                  <VideoModal
                    videoId="dQw4w9WgXcQ"
                    title="A Arte das Entrelinhas"
                    duration="05:40"
                  />
                ),
              },
              {
                id: "pratica",
                label: "Dicas de Elite",
                icon: LuTarget,
                content: (
                  <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/10 text-sm">
                    <strong>Check:</strong> Se o autor diz que a Petrobras
                    *continuará* rentável, ele pressupõe que ela *é* rentável
                    agora. Isso é questão de prova recorrente.
                  </div>
                ),
              },
            ]}
          />
        </section>

        <QuizInterativo
          questoes={quizM6}
          titulo="Desafio de Entrelinhas"
          icone="🕵️"
          numero={6}
          variant="cyan"
          onComplete={(score) => handleModuleComplete("modulo-6", score)}
        />
      </TabsContent>

      {/* ─── MÓDULO 7: AS AMEAÇAS TRIPLAS (DOSSIÊ PREMIUM) ─── */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <ModuleBanner
          numero={7}
          titulo="As Ameaças Triplas"
          descricao="Redução, Extrapolação e Contradição. Detecte os venenos das alternativas falsas lógicas."
          gradiente="bg-gradient-to-br from-red-600 via-rose-500 to-orange-500"
        />

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={1}
            title="A Trindade do Erro"
            variant="rose"
            description="As três formas clássicas que a Cesgranrio usa para invalidar uma interpretação correta."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FlipCard
              frente="1. Redução"
              verso={
                <div className="space-y-2">
                  <span className="font-bold text-rose-500 block">
                    DADO PARCIAL
                  </span>
                  <p className="text-[10px]">
                    O texto é amplo, mas a alternativa foca em apenas um
                    detalhe, ignorando a conclusão principal. É o erro do
                    'meio-certo'.
                  </p>
                </div>
              }
            />
            <FlipCard
              frente="2. Extrapolação"
              verso={
                <div className="space-y-2">
                  <span className="font-bold text-orange-500 block">
                    ALÉM DO TEXTO
                  </span>
                  <p className="text-[10px]">
                    A alternativa traz uma informação 'bonita' ou 'lógica' do
                    mundo real, mas que NÃO consta no texto. É o 'achismo'
                    gourmet.
                  </p>
                </div>
              }
            />
            <FlipCard
              frente="3. Contradição"
              verso={
                <div className="space-y-2">
                  <span className="font-bold text-red-600 block">
                    INVERSÃO LÓGICA
                  </span>
                  <p className="text-[10px]">
                    A alternativa diz exatamente o oposto do que o texto
                    afirmou, muitas vezes usando conectivos de negação
                    escondidos.
                  </p>
                </div>
              }
            />
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6 border border-red-200 dark:border-red-800">
            <h4 className="font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
              <LuShieldAlert className="w-5 h-5" /> Regra de Ouro: A Blindagem
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <li className="flex gap-2">
                <span className="text-red-500 font-bold">1.</span>
                <span>
                  Ignore o seu conhecimento prévio sobre o tema da Petrobras.
                  Responda apenas com o texto.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-500 font-bold">2.</span>
                <span>
                  Se houver 2 'certas', a mais completa vence (evite a Redução).
                </span>
              </li>
            </ul>
          </div>
        </section>

        <TextAnalysisLab
          index={7}
          titulo="Scanner de Ameaças"
          subtitulo="Identifique por que as alternativas abaixo seriam invalidadas."
          legenda={[{ cor: "bg-red-500", label: "Contradição Direta" }]}
          texto={
            <>
              Texto: "A Petrobras reduziu custos." <br />
              Alt A: "A Petrobras{" "}
              <span className="bg-red-500/20 px-1 rounded border border-red-500/30 font-bold italic text-red-700">
                ignorou a economia
              </span>{" "}
              de custos."
            </>
          }
        />

        {/* Consolidação M7 (Antes do Quiz) */}
        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={2}
            title="Consolidação e Resumo"
            variant="rose"
            description="Detectando as falhas lógicas."
          />
          <LessonTabs
            variant="rose"
            tabs={[
              {
                id: "resumo",
                label: "Resumo Técnico",
                icon: LuBookOpen,
                content: (
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground p-4">
                    <li>
                      <strong>Redução:</strong> Foca no detalhe e esquece o
                      todo.
                    </li>
                    <li>
                      <strong>Extrapolação:</strong> Inventa o que não está
                      escrito.
                    </li>
                    <li>
                      <strong>Contradição:</strong> Diz o oposto do texto.
                    </li>
                  </ul>
                ),
              },
              {
                id: "mapas",
                label: "Mapas Mentais",
                icon: LuBrain,
                content: (
                  <ModuleSummaryCarouselNew
                    moduloNome="Ameaças Triplas"
                    tituloAula="Interpretação de Texto"
                    materia="Língua Portuguesa"
                    images={[
                      {
                        title: "Mapa 1: Radar de Erros",
                        type: "Diagrama",
                        placeholderColor: "bg-red-100",
                        imageUrl: "/temp-img.png",
                      },
                      {
                        title: "Mapa 2: Blindagem Lógica",
                        type: "Infográfico",
                        placeholderColor: "bg-rose-100",
                        imageUrl: "/temp-img.png",
                      },
                      {
                        title: "Mapa 3: Checkpoint de Questão",
                        type: "Tático",
                        placeholderColor: "bg-orange-100",
                        imageUrl: "/temp-img.png",
                      },
                    ]}
                  />
                ),
              },
              {
                id: "multimidia",
                label: "Multimídia",
                icon: LuPlayCircle,
                content: (
                  <VideoModal
                    videoId="dQw4w9WgXcQ"
                    title="Evitando as Armadilhas"
                    duration="07:05"
                  />
                ),
              },
              {
                id: "pratica",
                label: "Dicas de Elite",
                icon: LuTarget,
                content: (
                  <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/10 text-sm">
                    <strong>Alerta:</strong> Se você sentiu que a alternativa é
                    'óbvia' mas não achou a palavra no texto, desconfie de
                    Extrapolação.
                  </div>
                ),
              },
            ]}
          />
        </section>

        <QuizInterativo
          questoes={quizM7}
          titulo="Desafio de Detecção"
          icone="🚫"
          numero={7}
          variant="rose"
          onComplete={(score) => handleModuleComplete("modulo-7", score)}
        />
      </TabsContent>

      {/* ─── MÓDULO 8: INTENÇÃO AUTORAL (DOSSIÊ PREMIUM) ─── */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <ModuleBanner
          numero={8}
          titulo="Intenção Autoral"
          descricao="Para que o texto foi escrito? Decifre a finalidade principal e o tom do autor."
          gradiente="bg-gradient-to-br from-indigo-600 via-blue-500 to-sky-400"
        />

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={1}
            title="A Vontade por Trás das Palavras"
            variant="blue"
            description="Identificar o objetivo (informativo, persuasivo ou crítico) é 50% da questão."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <FlipCard
              frente="Informativo vs. Persuasivo"
              verso={
                <div className="space-y-2">
                  <span className="font-bold text-blue-500 block">
                    FINALIDADE
                  </span>
                  <p className="text-sm">
                    O texto informativo apenas relata fatos (neutro). O
                    persuasivo quer mudar sua opinião ou te convencer de uma
                    tese (subjetivo).
                  </p>
                </div>
              }
            />
            <FlipCard
              frente="Crítico vs. Elogioso"
              verso={
                <div className="space-y-2">
                  <span className="font-bold text-sky-500 block">
                    TOM DO AUTOR
                  </span>
                  <p className="text-sm">
                    A escolha de adjetivos 'malditos' indica tom crítico. O uso
                    de superlativos positivos indica tom elogioso ou
                    institucional.
                  </p>
                </div>
              }
            />
          </div>

          <div className="space-y-6 mt-10">
            <h4 className="text-xl font-bold text-blue-600 flex items-center gap-2">
              <LuTarget className="w-5 h-5" /> Foco na Finalidade
            </h4>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>Dica de Ouro:</strong> Procure pelo verbo de ação na
                conclusão. Se o autor termina com solicitações ou visões de
                futuro, a intenção é <strong>propositiva</strong>. Se termina
                apenas com dados, é <strong>expositiva</strong>.
              </p>
            </div>
          </div>
        </section>

        <TextAnalysisLab
          index={8}
          titulo="Laboratório de Tom"
          subtitulo="Identifique se o autor está sendo irônico, sério ou apenas relatando."
          legenda={[{ cor: "bg-blue-500", label: "Marca de Intencionalidade" }]}
          texto={
            <>
              "É{" "}
              <span className="bg-blue-500/20 px-1 rounded border border-blue-500/30 font-bold italic text-blue-700">
                curioso
              </span>{" "}
              que, após anos de silêncio, o setor subitamente redescobriu a
              ética." (Tom: Irônico/Crítico).
            </>
          }
        />

        {/* Consolidação M8 (Antes do Quiz) */}
        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={2}
            title="Consolidação e Resumo"
            variant="blue"
            description="O Tom do Autor em foco."
          />
          <LessonTabs
            variant="blue"
            tabs={[
              {
                id: "resumo",
                label: "Resumo Técnico",
                icon: LuBookOpen,
                content: (
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground p-4">
                    <li>
                      <strong>Informativo:</strong> Neutro, focado em fatos.
                    </li>
                    <li>
                      <strong>Persuasivo:</strong> Quer convencer, defende tese.
                    </li>
                    <li>
                      <strong>Crítico/Irônico:</strong> Usa adjetivos e aspas
                      para ironizar.
                    </li>
                  </ul>
                ),
              },
              {
                id: "mapas",
                label: "Mapas Mentais",
                icon: LuBrain,
                content: (
                  <ModuleSummaryCarouselNew
                    moduloNome="Intenção Autoral"
                    tituloAula="Interpretação de Texto"
                    materia="Língua Portuguesa"
                    images={[
                      {
                        title: "Mapa 1: Espectro de Tons",
                        type: "Diagrama",
                        placeholderColor: "bg-blue-100",
                        imageUrl: "/temp-img.png",
                      },
                      {
                        title: "Mapa 2: Marcadores de Opinião",
                        type: "Infográfico",
                        placeholderColor: "bg-sky-100",
                        imageUrl: "/temp-img.png",
                      },
                      {
                        title: "Mapa 3: Finalidades do Texto",
                        type: "Tático",
                        placeholderColor: "bg-indigo-100",
                        imageUrl: "/temp-img.png",
                      },
                    ]}
                  />
                ),
              },
              {
                id: "multimidia",
                label: "Multimídia",
                icon: LuPlayCircle,
                content: (
                  <VideoModal
                    videoId="dQw4w9WgXcQ"
                    title="Decifrando a Intenção"
                    duration="04:50"
                  />
                ),
              },
              {
                id: "pratica",
                label: "Dicas de Elite",
                icon: LuTarget,
                content: (
                  <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/10 text-sm">
                    <strong>Check:</strong> Se o autor usa 'supostamente' ou
                    'curioso', ele está indicando um tom distanciado ou crítico.
                  </div>
                ),
              },
            ]}
          />
        </section>

        <QuizInterativo
          questoes={quizM8}
          titulo="Desafio de Intencionalidade"
          icone="🎯"
          numero={8}
          variant="blue"
          onComplete={(score) => handleModuleComplete("modulo-8", score)}
        />
      </TabsContent>

      {/* ─── MÓDULO 9: A LÓGICA CESGRANRIO (DOSSIÊ PREMIUM) ─── */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <ModuleBanner
          numero={9}
          titulo="A Lógica Cesgranrio"
          descricao="O DNA das questões. Mapeamento de sinônimos técnicos e eixos temáticos repetitivos."
          gradiente="bg-gradient-to-br from-blue-700 via-indigo-600 to-violet-500"
        />

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={1}
            title="Padrões de Substituição"
            variant="blue"
            description="Como a banca troca palavras para testar seu domínio do vocabulário industrial."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <FlipCard
              frente="Sinônimos Técnicos"
              verso={
                <div className="space-y-2">
                  <span className="font-bold text-blue-500 block">
                    VOCABULÁRIO
                  </span>
                  <p className="text-sm">
                    A banca troca 'fomentar' por 'estimular', 'negligenciar' por
                    'omitir'. Domine a lista de 50 verbos recorrentes da
                    Cesgranrio.
                  </p>
                </div>
              }
            />
            <FlipCard
              frente="Eixos Temáticos"
              verso={
                <div className="space-y-2">
                  <span className="font-bold text-indigo-500 block">
                    RECORRÊNCIA
                  </span>
                  <p className="text-sm">
                    90% dos textos giram em torno de: Transição Energética,
                    Sustentabilidade e Inovação Tecnológica na Indústria.
                  </p>
                </div>
              }
            />
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-800">
            <h4 className="font-bold text-indigo-700 dark:text-indigo-400 mb-2 flex items-center gap-2">
              <LuSearch className="w-5 h-5" /> Radar de Questão
            </h4>
            <p className="text-sm">
              Sempre que aparecer um termo entre aspas no texto, a Cesgranrio
              perguntará sobre a <strong>ressignificação</strong> ou o{" "}
              <strong>efeito de sentido</strong> desse termo no contexto.
            </p>
          </div>
        </section>

        <TextAnalysisLab
          index={9}
          titulo="Scanner de Sinônimos"
          subtitulo="Mapeie as trocas permitidas pela banca."
          legenda={[{ cor: "bg-blue-500", label: "Equivalência Semântica" }]}
          texto={
            <>
              Texto: "A gestão{" "}
              <span className="bg-blue-500/20 px-1 rounded border border-blue-500/30 font-bold italic text-blue-700">
                viabilizou
              </span>{" "}
              o projeto." <br />A banca aceitará: "A gestão{" "}
              <span className="underline underline-offset-4 decoration-blue-500">
                tornou possível
              </span>
              ..."
            </>
          }
        />

        {/* Consolidação M9 (Antes do Quiz) */}
        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={2}
            title="Consolidação e Resumo"
            variant="blue"
            description="O Filtro Cesgranrio."
          />
          <LessonTabs
            variant="blue"
            tabs={[
              {
                id: "resumo",
                label: "Resumo Técnico",
                icon: LuBookOpen,
                content: (
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground p-4">
                    <li>
                      <strong>Eixos:</strong> Sustentabilidade, Transição,
                      Tecnologia.
                    </li>
                    <li>
                      <strong>Sinônimos:</strong> 'Fomentar' = 'Estimular'.
                    </li>
                    <li>
                      <strong>Aspas:</strong> Indicam ressignificação ou ironia.
                    </li>
                  </ul>
                ),
              },
              {
                id: "mapas",
                label: "Mapas Mentais",
                icon: LuBrain,
                content: (
                  <ModuleSummaryCarouselNew
                    moduloNome="Lógica Cesgranrio"
                    tituloAula="Interpretação de Texto"
                    materia="Língua Portuguesa"
                    images={[
                      {
                        title: "Mapa 1: Dicionário da Banca",
                        type: "Diagrama",
                        placeholderColor: "bg-blue-100",
                        imageUrl: "/temp-img.png",
                      },
                      {
                        title: "Mapa 2: Temas Recorrentes",
                        type: "Infográfico",
                        placeholderColor: "bg-sky-100",
                        imageUrl: "/temp-img.png",
                      },
                      {
                        title: "Mapa 3: Efeito das Pontuações",
                        type: "Tático",
                        placeholderColor: "bg-indigo-100",
                        imageUrl: "/temp-img.png",
                      },
                    ]}
                  />
                ),
              },
              {
                id: "multimidia",
                label: "Multimídia",
                icon: LuPlayCircle,
                content: (
                  <VideoModal
                    videoId="dQw4w9WgXcQ"
                    title="O Jeito Cesgranrio"
                    duration="06:15"
                  />
                ),
              },
              {
                id: "pratica",
                label: "Dicas de Elite",
                icon: LuTarget,
                content: (
                  <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/10 text-sm">
                    <strong>Radar:</strong> Se a questão pergunta qual a palavra
                    substitui 'X' sem alteração de sentido, ela quer saber se
                    você conhece os sinônimos técnicos da área.
                  </div>
                ),
              },
            ]}
          />
        </section>

        <QuizInterativo
          questoes={quizM9}
          titulo="Desafio de Lógica"
          icone="🧠"
          numero={9}
          variant="blue"
          onComplete={(score) => handleModuleComplete("modulo-9", score)}
        />
      </TabsContent>

      {/* ─── MÓDULO 10: ARENA DE ELITE (DOSSIÊ PREMIUM) ─── */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <ModuleBanner
          numero={10}
          titulo="Arena de Elite"
          descricao="A prova final. O Checklist de Blindagem antes do grande desafio."
          gradiente="bg-gradient-to-br from-amber-600 via-orange-500 to-yellow-400"
        />

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={1}
            title="Checklist de Blindagem Final"
            variant="amber"
            description="Revise os 5 mandamentos da interpretação Cesgranrio antes de começar."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FlipCard
              frente="1. Olhar de Raio-X"
              verso={
                <p className="text-[10px]">
                  Identifique se a questão pede o sentido global ou localizado.
                </p>
              }
            />
            <FlipCard
              frente="2. Filtro Anti-Achismo"
              verso={
                <p className="text-[10px]">
                  Corte toda informação que não está escrita, mesmo que seja
                  verdade no mundo real.
                </p>
              }
            />
            <FlipCard
              frente="3. Radar de Sinônimos"
              verso={
                <p className="text-[10px]">
                  Fique atento à troca de verbos técnicos que alteram a
                  intensidade da frase.
                </p>
              }
            />
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-6 border border-orange-200 dark:border-orange-800">
            <h4 className="font-bold text-orange-700 dark:text-orange-400 mb-3">
              Mensagem Final
            </h4>
            <p className="text-sm italic">
              "A interpretação na Petrobras não é sobre adivinhação, é sobre
              mapeamento. Se você seguiu este dossiê, você tem o mapa. Boa sorte
              na Arena." - Professor IA.
            </p>
          </div>
        </section>

        {/* Consolidação M10 (Antes do Quiz Final) */}
        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={2}
            title="Consolidação e Resumo"
            variant="amber"
            description="Checklist Final de Elite."
          />
          <LessonTabs
            variant="amber"
            tabs={[
              {
                id: "resumo",
                label: "Resumo Técnico",
                icon: LuBookOpen,
                content: (
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground p-4">
                    <li>
                      <strong>Global:</strong> Ideia central do texto.
                    </li>
                    <li>
                      <strong>Localizado:</strong> Sentido de uma frase
                      específica.
                    </li>
                    <li>
                      <strong>Checklist:</strong> Sem Reduzir, sem Extrapolar,
                      sem Contradizer.
                    </li>
                  </ul>
                ),
              },
              {
                id: "mapas",
                label: "Mapas Mentais",
                icon: LuBrain,
                content: (
                  <ModuleSummaryCarouselNew
                    moduloNome="Reta Final"
                    tituloAula="Interpretação de Texto"
                    materia="Língua Portuguesa"
                    images={[
                      {
                        title: "Mapa 1: Fluxograma de Resposta",
                        type: "Diagrama",
                        placeholderColor: "bg-amber-100",
                        imageUrl: "/temp-img.png",
                      },
                      {
                        title: "Mapa 2: Filtro de Eliminação",
                        type: "Tático",
                        placeholderColor: "bg-orange-100",
                        imageUrl: "/temp-img.png",
                      },
                      {
                        title: "Mapa 3: Checklist de Ouro",
                        type: "Infográfico",
                        placeholderColor: "bg-yellow-100",
                        imageUrl: "/temp-img.png",
                      },
                    ]}
                  />
                ),
              },
              {
                id: "multimidia",
                label: "Multimídia",
                icon: LuPlayCircle,
                content: (
                  <VideoModal
                    videoId="dQw4w9WgXcQ"
                    title="O Último Checklist"
                    duration="05:30"
                  />
                ),
              },
              {
                id: "pratica",
                label: "Dicas de Elite",
                icon: LuTarget,
                content: (
                  <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/10 text-sm">
                    <strong>Foco:</strong> Na Arena Final, aplique todas as
                    técnicas do Dossiê. Não deixe nenhuma marca gramatical
                    passar despercebida.
                  </div>
                ),
              },
            ]}
          />
        </section>

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
