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
  ModuleConsolidation,
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
  LuNewspaper,
  LuFileCheck,
} from "react-icons/lu";

import { getModuleVariant } from "@/lib/moduleColors";

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
  const mv = Array.from({ length: 11 }, (_, i) => getModuleVariant(i));

  const MODULE_DEFS = [
    { id: "modulo-1", label: "Módulo 1", titulo: "A Diferença Letal" },
    { id: "modulo-2", label: "Módulo 2", titulo: "O Tópico Frasal" },
    { id: "modulo-3", label: "Módulo 3", titulo: "Coesão e Argumentação" },
    { id: "modulo-4", label: "Módulo 4", titulo: "Tipologia Textual" },
    { id: "modulo-5", label: "Módulo 5", titulo: "Coesão Referencial" },
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-lg font-bold uppercase tracking-wider">
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
                <span className="text-lg font-medium text-slate-700 dark:text-slate-300">
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
          <p className="text-lg text-slate-500 dark:text-slate-400 italic">
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
          variant={mv[1]}
        />

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={1}
            title="A Anatomia do Sentido: O Que Você Vê vs. O Que Você Pensa"
            description="Para a CESGRANRIO, o maior erro do candidato é 'viajar' para além dos limites do texto. Vamos blindar sua leitura agora."
          variant={mv[1]}
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
                    className="flex items-start gap-2 text-lg text-foreground/80"
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
                    className="flex items-start gap-2 text-lg text-foreground/80"
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
            corIndicador="bg-amber-500"
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
                    <p className="text-lg">
                      Para compreender, você deve dominar quem é quem no texto.
                      O "Ele" retoma o "Presidente" ou a "Comunicação"?
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/10">
                        <span className="font-bold text-lg block mb-1">
                          Anáfora
                        </span>
                        <p className="text-[10px]">
                          Retoma o que passou. (Segurança é vital.{" "}
                          <strong>Ela</strong> previne acidentes.)
                        </p>
                      </div>
                      <div className="p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/10">
                        <span className="font-bold text-lg block mb-1">
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
          index={2}
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
            index={3}
            title="Laboratório de Gabarito: Certo vs Errado"
            description="Teste sua percepção antes do quiz final do módulo."
          variant={mv[1]}
        />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FlipCard
              frente={
                <div className="flex flex-col items-center gap-3">
                  <LuBookOpen className="w-10 h-10 text-blue-500 opacity-50" />
                  <span className="text-xl font-black uppercase text-center">
                    O Texto conclui que parou por falta de verba?
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-red-500 font-bold border-b border-white/10 pb-2">
                    <LuShieldAlert /> <span>FALSO (CONTRADIÇÃO)</span>
                  </div>
                  <p className="text-lg">
                    O texto afirma explicitamente que "não decorreu de falta de
                    verba". A banca tenta te induzir ao erro técnico externo.
                  </p>
                </div>
              }
              categoria="Armadilhas de Prova"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center gap-3">
                  <LuTarget className="w-10 h-10 text-emerald-500 opacity-50" />
                  <span className="text-xl font-black uppercase text-center">
                    Gestão interna foi o principal gargalo?
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-emerald-500 font-bold border-b border-white/10 pb-2">
                    <LuCheck /> <span>VERDADEIRO (INFERÊNCIA)</span>
                  </div>
                  <p className="text-lg">
                    A expressão "crise de gestão logística" sustenta essa
                    interpretação como causa raiz. Resposta autorizada pelo
                    texto.
                  </p>
                </div>
              }
              categoria="Interpretação de Elite"
            />
          </div>
        </section>



        













<ModuleConsolidation
          index={4}
          video={{
            videoId: "dQw4w9WgXcQ",
            title:
              "Compreensão vs Interpretação: A Diferença que te faz Passar",
            duration: "12:30",
            thumbnail:
              "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1073&auto=format&fit=crop",
          }}
          resumoVisual={{
            moduloNome: "Módulo 1",
            tituloAula: "Interpretação de Texto",
            materia: "Língua Portuguesa",
            images: [
              {
                title: "Mapa 1: A Fronteira do Sentido",
                type: "Infográfico",
                placeholderColor: "bg-blue-900/10",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-1/infografico-compreensao.png",
              },
              {
                title: "Mapa 2: Comandos de Prova",
                type: "Fluxograma",
                placeholderColor: "bg-sky-900/10",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-1/fluxograma-leitura.png",
              },
              {
                title: "Mapa 3: Matriz de Tipos",
                type: "Tático",
                placeholderColor: "bg-indigo-900/10",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-1/mapa-mental-tipos.png",
              },
            ],
          }}
          maceteVisual={{
            title: "O Macete do 'Onde Está?'",
            content: (
              <>
                <div className="text-6xl my-6 animate-pulse">🎯 🔍</div>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                  "Se a pergunta diz <strong>'Segundo o texto'</strong>, a
                  resposta está NA SUA CARA. Se diz{" "}
                  <strong>'Depreende-se'</strong>, a resposta está NAS
                  ENTRELINHAS."
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                  <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                      Compreensão (Explícito)
                    </h4>
                    <p className="text-lg text-muted-foreground italic">
                      "O autor afirma que..."
                    </p>
                    <p className="text-[10px] mt-2 font-medium text-emerald-700 dark:text-emerald-300">
                      BUSCA: Copia e cola / Paráfrase. ✅
                    </p>
                  </div>
                  <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">
                      Interpretação (Implícito)
                    </h4>
                    <p className="text-lg text-muted-foreground italic">
                      "Infere-se que..."
                    </p>
                    <p className="text-[10px] mt-2 font-medium text-blue-700 dark:text-blue-300">
                      BUSCA: Conclusão lógica autorizada. ✅
                    </p>
                  </div>
                </div>
              </>
            ),
          }}
          audio={{
            audioUrl: "https://audio-placeholder.mp3",
            titulo: "Podcast: Decifrando o Relatório Técnico",
            artista: "Dossiê Petrobras",
            capaUrl:
              "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000",
            lyrics:
              "[Intro] - O segredo está em não projetar seus medos no texto...",
          }}
          variant={mv[1]}
        />

                <QuizInterativo
          questoes={quizM1}
          titulo="QUIZ: A Diferença Letal"
          icone="🛡️"
          numero={5}
          onComplete={(score) => handleModuleComplete("modulo-1", score)}
          variant={mv[1]}
        />
      </TabsContent>

      {/* ─── MÓDULO 2: O TÓPICO FRASAL ─── */}
      <TabsContent value="modulo-2" className="space-y-[40px]">
        <ModuleBanner
          numero={2}
          titulo="O Tópico Frasal"
          descricao="A técnica cirúrgica para encontrar a ideia central do parágrafo em segundos, ignorando o ruído visual."
          variant={mv[2]}
        />

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={1}
            title="A Engenharia do Parágrafo: A Viga Mestra"
            description="Entender o tópico frasal é como identificar a viga de sustentação de um edifício: sem ela, o resto do conteúdo desmorona."
          variant={mv[2]}
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
              corIndicador="bg-blue-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "1. Declaração Inicial (O Padrão Ouro)",
                  icone: "📌",
                  conteudo: (
                    <div className="space-y-3 text-lg text-muted-foreground">
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
                    <p className="text-lg text-muted-foreground">
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
                    <p className="text-lg text-muted-foreground">
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
            index={3}
            title="Prática de Combate: Localização"
            description="Onde está o coração do texto?"
          variant={mv[2]}
        />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FlipCard
              frente={
                <div className="flex flex-col items-center gap-3">
                  <LuSearch className="w-10 h-10 text-emerald-500 opacity-50" />
                  <span className="text-xl font-black uppercase text-center">
                    O tópico frasal está sempre na primeira frase?
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-emerald-500 font-bold border-b border-white/10 pb-2">
                    <LuCheck /> <span>PREDOMINANTEMENTE SIM</span>
                  </div>
                  <p className="text-lg">
                    Em textos técnicos da Petrobras, a eficácia manda. A ideia
                    principal abre o parágrafo (Ponto de Impacto) para facilitar
                    a decodificação rápida.
                  </p>
                </div>
              }
              categoria="Engenharia do Parágrafo"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center gap-3">
                  <LuTriangleAlert className="w-10 h-10 text-red-500 opacity-50" />
                  <span className="text-xl font-black uppercase text-center">
                    Todo parágrafo TEM um Tópico Frasal explícito?
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-red-500 font-bold border-b border-white/10 pb-2">
                    <LuShieldAlert /> <span>NÃO OBRIGATORIAMENTE</span>
                  </div>
                  <p className="text-lg">
                    Em textos narrativos ou muito densos, a ideia central pode
                    estar implícita na soma das partes. Requer síntese
                    interpretativa do candidato.
                  </p>
                </div>
              }
              categoria="Estratégia de Prova"
            />
          </div>
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



        













<ModuleConsolidation
          index={5}
          video={{
            videoId: "dQw4w9WgXcQ",
            title: "A Engenharia do Parágrafo: Dominando o Tópico Frasal",
            duration: "10:15",
            thumbnail:
              "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000",
          }}
          resumoVisual={{
            moduloNome: "Módulo 2",
            tituloAula: "Interpretação de Texto",
            materia: "Língua Portuguesa",
            images: [
              {
                title: "Mapa de Conectivos Causais",
                type: "Infográfico",
                placeholderColor: "bg-emerald-900/10",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-2/mapa-mental-causais.png",
              },
              {
                title: "Mapa de Concessivas",
                type: "Esquema",
                placeholderColor: "bg-teal-900/10",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-2/mapa-mental-concessivas.png",
              },
              {
                title: "Tabela de Conectivos",
                type: "Tático",
                placeholderColor: "bg-cyan-900/10",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-2/tabela-conectivos.png",
              },
            ],
          }}
          maceteVisual={{
            title: "O Macete da 'Viga Mestra'",
            content: (
              <>
                <div className="text-6xl my-6 animate-pulse">🏛️ 🏗️</div>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                  "O parágrafo é um edifício. O <strong>Tópico Frasal</strong> é
                  a viga mestra. Se você a encontra, o resto é apenas decoração
                  (exemplos, dados, detalhes)."
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                  <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                      Dedução (Início)
                    </h4>
                    <p className="text-lg text-muted-foreground italic truncate">
                      "A energia solar é farta..." + Provas.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">
                      Indução (Fim)
                    </h4>
                    <p className="text-lg text-muted-foreground italic truncate">
                      Provas... + "Portanto, a energia solar..."
                    </p>
                  </div>
                </div>
              </>
            ),
          }}
          audio={{
            audioUrl: "https://audio-placeholder.mp3",
            titulo: "Áudio Resumo: A Arquitetura do Parágrafo",
            artista: "Dossiê Petrobras",
            capaUrl:
              "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000",
            lyrics:
              "[Host] - Se você ler apenas a primeira frase de cada parágrafo...",
          }}
          variant={mv[2]}
        />

                <QuizInterativo
          questoes={quizM2}
          titulo="QUIZ: O Tópico Frasal"
          icone="🏗️"
          numero={6}
          onComplete={(score) => handleModuleComplete("modulo-2", score)}
          variant={mv[2]}
        />
      </TabsContent>

      {/* ─── MÓDULO 3: LEITURA ESTRATÉGICA ─── */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <ModuleBanner
          numero={3}
          titulo="Coesão e Argumentação"
          descricao="A 'Cola' que une as ideias e os 'Martelos' que as sustentam. Domine a lógica invisível preferida da Cesgranrio."
          variant={mv[3]}
        />

        {/* ★ NOVO: Rich Intro Section */}
      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-10">
        <ModuleSectionHeader index="INTRO" title="As Engrenagens do Argumento" description="Como autores costuram palavras para induzir lógicas e provar teorias." variant={mv[3]} />
        <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
          <p>
            Um texto argumentativo assemelha-se a uma rede de alta precisão lógica. Cada afirmação precisa de cabos de sustentação para não ruir, e esses cabos assumem a forma de <strong>coesão argumentativa</strong> (ou coesão sequencial), gerada de modo estruturado através de conjunções, advérbios e expressões conectivas que evidenciam qual a progressão das ideias.
          </p>
          <p>
            A compreensão de nível sênior ignora a superficialidade e vai direto à espinha dorsal do autor. O que ele está fazendo? Ele está apresentando uma consequência inevitável ("Portanto"), demonstrando uma oposição técnica ("Contudo"), introduzindo uma concessão tolerável ("Embora") ou apenas sinalizando um acréscimo ("Além disso")? Cada conectivo opera como uma "placa de trânsito" para o fluxo do raciocínio.
          </p>
          <p>
            O erro capital é ler buscando reter "somente o assunto principal". Na CESGRANRIO, o modo como as informações se entrelaçam cria a interpretação final. Uma questão clássica pedirá a reescritura de um trecho alterando as conjunções sem prejudicar a lógica global. Memorizar todos os tipos de conectivos das gramáticas tradicionais é fundamental.
          </p>
          <p>
            Pense em um manual que diga: "<strong>Dado que</strong> a corrosão aumenta, <strong>torna-se vital</strong> substituir as ligas, <strong>ainda que</strong> a operação demande atrasos". "Dado que" marca a causa. "Ainda que" prevê e quebra uma oposição pré-fabricada pelo autor (o incômodo do atraso), garantindo vitória para a ideia de substituição.
          </p>
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800 p-6 space-y-4">
            <h4 className="font-bold text-foreground flex items-center gap-2">A Tríade de Conectivos Perigosos CESGRANRIO</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mt-3">
              <div className="bg-white dark:bg-black/20 p-3 rounded-lg shadow-sm border border-border">
                <strong className="block text-indigo-600 dark:text-indigo-400">Embora / Conquanto</strong>
                <span className="text-muted-foreground">(Concessão) Permite a realidade de um obstáculo sem que este impeça o fato principal.</span>
              </div>
              <div className="bg-white dark:bg-black/20 p-3 rounded-lg shadow-sm border border-border">
                <strong className="block text-rose-600 dark:text-rose-400">Portanto / Por conseguinte</strong>
                <span className="text-muted-foreground">(Conclusão) Cimenta o peso prático do argumento preexistente.</span>
              </div>
              <div className="bg-white dark:bg-black/20 p-3 rounded-lg shadow-sm border border-border">
                <strong className="block text-emerald-600 dark:text-emerald-400">Pois / Visto que</strong>
                <span className="text-muted-foreground">(Causa/Explicação) Justificam, na base técnica e lógica, a adoção de um evento antecedente.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ContentAccordion
              mode="stacked"
              titulo="Operadores Argumentativos de Alto Impacto"
              icone={<LuHammer />}
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "1. Oposição: O 'Mas' vs O 'Embora'",
                  icone: "⚖️",
                  conteudo: (
                    <div className="space-y-4 text-lg">
                      <p>
                        <strong>Conceituação:</strong> A Cesgranrio ama o
                        contraste. Adversativos (MAS, POREM) enfatizam a SEGUNDA
                        ideia. Concessivos (EMBORA, CONQUANTO) dão peso à
                        PRIMEIRA.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                          <p className="font-bold text-amber-600 dark:text-amber-400 mb-1">
                            Foco no Destino (Mas):
                          </p>
                          <p className="italic">
                            "O pré-sal é profundo, <strong>mas</strong> a
                            tecnologia é superior."
                          </p>
                        </div>
                        <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                          <p className="font-bold text-blue-600 dark:text-blue-400 mb-1">
                            Foco no Obstáculo (Embora):
                          </p>
                          <p className="italic">
                            "<strong>Embora</strong> seja profundo, o pré-sal é
                            viável."
                          </p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Sinal de Alerta">
                        <strong>Dica de Elite:</strong> "Conquanto" é o sinônimo
                        de "Embora" que mais derruba candidatos. Decore:
                        Conquanto = Concessiva.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "2. Causa vs Consequência (A Lógica do Petróleo)",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-4 text-lg">
                      <p>
                        <strong>Capa de Causa:</strong> "Visto que", "Já que",
                        "Uma vez que".
                      </p>
                      <p className="p-3 bg-zinc-500/10 rounded-lg border border-zinc-500/20 font-mono">
                        "A produção parou <u>visto que</u> houve falha no
                        gerador."
                      </p>
                      <p>
                        <strong>Capa de Consequência:</strong> "De sorte que",
                        "De modo que", "Tão... que".
                      </p>
                      <p className="p-3 bg-zinc-500/10 rounded-lg border border-zinc-500/20 font-mono">
                        "O gerador falhou <u>de modo que</u> a produção parou."
                      </p>
                    </div>
                  ),
                },
              ]}
            />
        </section>

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={2}
            title="Dossiê de Conectivos"
            description="Memorização rápida para os termos que a Cesgranrio 'adora'."
          variant={mv[3]}
        />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FlipCard
              frente={
                <div className="flex flex-col items-center gap-3">
                  <LuLink className="w-10 h-10 text-amber-500 opacity-50" />
                  <span className="text-xl font-black uppercase">
                    Porquanto
                  </span>
                </div>
              }
              verso={
                <div className="space-y-2">
                  <p className="font-bold text-emerald-500 flex items-center gap-2">
                    <LuCheck /> CAUSAL
                  </p>
                  <p className="text-lg italic">Equivale a "Porque".</p>
                  <p className="text-[10px] bg-white/5 p-2 rounded">
                    "A plataforma parou <strong>porquanto</strong> houve
                    tempestade."
                  </p>
                </div>
              }
              categoria="Mestres da Coesão"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center gap-3">
                  <LuLink className="w-10 h-10 text-indigo-500 opacity-50" />
                  <span className="text-xl font-black uppercase">
                    Conquanto
                  </span>
                </div>
              }
              verso={
                <div className="space-y-2">
                  <p className="font-bold text-emerald-500 flex items-center gap-2">
                    <LuCheck /> CONCESSIVA
                  </p>
                  <p className="text-lg italic">Equivale a "Embora".</p>
                  <p className="text-[10px] bg-white/5 p-2 rounded">
                    "<strong>Conquanto</strong> houvesse riscos, a missão
                    seguiu."
                  </p>
                </div>
              }
              categoria="Mestres da Coesão"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center gap-3">
                  <LuLink className="w-10 h-10 text-emerald-500 opacity-50" />
                  <span className="text-xl font-black uppercase">Aliás</span>
                </div>
              }
              verso={
                <div className="space-y-2">
                  <p className="font-bold text-emerald-500 flex items-center gap-2">
                    <LuCheck /> RETIFICAÇÃO
                  </p>
                  <p className="text-lg italic">Ajusta ou reforça o dito.</p>
                  <p className="text-[10px] bg-white/5 p-2 rounded">
                    "Somos eficientes; <strong>aliás</strong>, os melhores do
                    setor."
                  </p>
                </div>
              }
              categoria="Mestres da Coesão"
            />
          </div>
        </section>

        <TextAnalysisLab
          index={2}
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
              <div className="p-3 bg-amber-500/5 dark:bg-amber-500/10 border-l-4 border-amber-500 text-lg text-amber-800 dark:text-amber-200">
                Atenção: "Esta" (pronome demonstrativo) refere-se ao elemento
                mais próximo: o <strong>comitê de ética</strong>, e não à
                subsidiária.
              </div>
            </div>
          }
        />



        













<ModuleConsolidation
          index={3}
          video={{
            videoId: "dQw4w9WgXcQ",
            title: "Operadores Lógicos: A 'Cola' do Texto Petrobras",
            duration: "11:45",
            thumbnail:
              "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1000",
          }}
          resumoVisual={{
            moduloNome: "Módulo 3",
            tituloAula: "Interpretação de Texto",
            materia: "Língua Portuguesa",
            images: [
              {
                title: "Card de Extrapolação",
                type: "Tático",
                placeholderColor: "bg-red-900/10",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-3/card-extrapolacao.png",
              },
              {
                title: "Infográfico do Cone",
                type: "Diagrama",
                placeholderColor: "bg-amber-900/10",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-3/infografico-cone.png",
              },
              {
                title: "Mapa Mental: Rota Lógica",
                type: "Esquema",
                placeholderColor: "bg-orange-900/10",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-3/mapa-mental-rota.png",
              },
            ],
          }}
          maceteVisual={{
            title: "O Macete do 'Muro de Tijolos'",
            content: (
              <>
                <div className="text-6xl my-6 animate-pulse">🔗 🧱</div>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                  "O texto é um muro. Os <strong>Conectivos</strong> são o
                  cimento. Sem eles, as frases (tijolos) caem sozinhas."
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                  <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-amber-600 dark:text-amber-400 mb-2">
                      Mas (Adversativa)
                    </h4>
                    <p className="text-lg text-muted-foreground italic truncate">
                      "Estudei muito, mas não passei." (Foco no Mas)
                    </p>
                  </div>
                  <div className="p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-orange-600 dark:text-orange-400 mb-2">
                      Embora (Concessiva)
                    </h4>
                    <p className="text-lg text-muted-foreground italic truncate">
                      "Embora não tenha passado, estudei muito."
                    </p>
                  </div>
                </div>
              </>
            ),
          }}
          audio={{
            audioUrl: "https://audio-placeholder.mp3",
            titulo: "Áudio Resumo: Conectivos de Impacto",
            artista: "Dossiê Petrobras",
            capaUrl:
              "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000",
            lyrics:
              "[Host] - Se vir um 'Embora', saiba que a ideia principal vem depois da vírgula...",
          }}
          variant={mv[3]}
        />

                <QuizInterativo
          questoes={quizM3}
          titulo="QUIZ: Coesão e Argumentação"
          icone="🧠"
          numero={4}
          onComplete={(score) => handleModuleComplete("modulo-3", score)}
          variant={mv[3]}
        />
      </TabsContent>

      {/* ─── MÓDULO 4: TIPOLOGIA TEXTUAL (DOSSIÊ PREMIUM) ─── */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner
          numero={4}
          titulo="Tipologia Textual"
          descricao="O DNA do Texto. Identifique o gênero e o tipo predominante para antecipar a intenção da Cesgranrio."
          variant={mv[4]}
        />

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={1}
            title="A Matriz de Tipos: O Filtro Petrobras"
            description="As provas focam em Dissertação e Injunção. Mas as armadilhas estão nos textos Narrativos disfarçados."
          variant={mv[4]}
        />

          <div className="space-y-8">
            <div className="p-6 bg-indigo-500/5 rounded-2xl border border-indigo-500/10">
              <h4 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 flex items-center gap-2">
                <LuLayers className="w-5 h-5" /> Tipos Base vs. Gêneros
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                O <strong>Tipo Textual</strong> é a estrutura (narrar,
                descrever, dissertar). O <strong>Gênero</strong> é o uso social
                (editorial, relatório, edital). A Cesgranrio adora perguntar: "O
                texto X apresenta marcas predominantes de...".
              </p>
            </div>

            <ContentAccordion
              mode="stacked"
              titulo="O Trio de Elite da Tipologia"
              icone={<LuBrain />}
              corIndicador="bg-rose-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "1. Dissertação-Argumentativa",
                  icone: "🖋️",
                  conteudo: (
                    <div className="space-y-4 text-lg">
                      <p>
                        <strong>Objetivo:</strong> Persuadir o leitor. O autor
                        defende uma tese com base em argumentos lógicos.
                      </p>
                      <div className="p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/20 italic">
                        "É imperativo que a Petrobras mantenha o foco no
                        Pré-Sal, <u>dado que</u> os lucros são consistentes."
                      </div>
                      <p className="text-lg text-muted-foreground">
                        MARCAS: Subjetividade controlada, conectivos de
                        causa/consequência, adjetivos valorativos.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "2. Dissertação-Expositiva",
                  icone: "📊",
                  conteudo: (
                    <div className="space-y-4 text-lg">
                      <p>
                        <strong>Objetivo:</strong> Informar. Texto neutro,
                        impessoal, repleto de dados estatísticos e definições
                        técnicas.
                      </p>
                      <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20 italic">
                        "A unidade de refino opera com 95% de capacidade,
                        processando 200 mil barris/dia."
                      </div>
                      <p className="text-lg text-muted-foreground">
                        MARCAS: Verbos no presente (valor atemporal), dados
                        numéricos, ausência de opinião.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "3. Texto Injuntivo (O Comando)",
                  icone: "⚙️",
                  conteudo: (
                    <div className="space-y-4 text-lg text-balance">
                      <p>
                        Aquele que orienta um comportamento. Comum em manuais de
                        segurança e normativos da empresa.
                      </p>
                      <AlertBox tipo="info" titulo="O Sinal do Imperativo">
                        Procure por verbos como: "Abra", "Verifique", "Evite",
                        ou infinitivos com valor de ordem ("Manter a área
                        limpa").
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </section>

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={2}
            title="Duelo de Gêneros & Tipos"
            description="Testando sua percepção tática de predominância."
          variant={mv[4]}
        />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FlipCard
              frente={
                <div className="flex flex-col items-center gap-3">
                  <LuNewspaper className="w-10 h-10 text-indigo-500 opacity-50" />
                  <span className="text-xl font-black uppercase">
                    EDITORIAL
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-emerald-500 font-bold border-b border-white/10 pb-2">
                    <LuCheck /> <span>DISSERTATIVO-ARGUMENTATIVO</span>
                  </div>
                  <p className="text-lg">
                    O editorial expressa a opinião do jornal. Se há opinião
                    defendida, há argumentação.
                  </p>
                </div>
              }
              categoria="Gêneros de Prova"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center gap-3">
                  <LuShieldAlert className="w-10 h-10 text-red-500 opacity-50" />
                  <span className="text-xl font-black uppercase">
                    MANUAL TÉCNICO
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-emerald-500 font-bold border-b border-white/10 pb-2">
                    <LuCheck /> <span>INJUNTIVO / EXPOSITIVO</span>
                  </div>
                  <p className="text-lg">
                    Instrui o operador (Injunção) e descreve o equipamento
                    (Exposição).
                  </p>
                </div>
              }
              categoria="Gêneros de Prova"
            />
          </div>
        </section>

        <TextAnalysisLab
          index={3}
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
              <div className="p-3 bg-indigo-500/5 dark:bg-indigo-500/10 border-l-4 border-indigo-500 text-lg text-indigo-800 dark:text-indigo-200">
                Análise: O texto é híbrido, mas a <strong>predominância</strong>{" "}
                é dissertativa no início (tese) e injuntiva no final (comando).
              </div>
            </div>
          }
        />



        













<ModuleConsolidation
          index={4}
          video={{
            videoId: "dQw4w9WgXcQ",
            title: "DNA do Texto: Tipologias e Gêneros de Elite",
            duration: "09:45",
            thumbnail:
              "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000",
          }}
          resumoVisual={{
            moduloNome: "Módulo 4",
            tituloAula: "Interpretação de Texto",
            materia: "Língua Portuguesa",
            images: [
              {
                title: "Matriz de Tipos",
                type: "Infográfico",
                placeholderColor: "bg-blue-900/10",
              },
            ],
          }}
          maceteVisual={{
            title: "O Macete do 'DNA Textual'",
            content: (
              <>
                <div className="text-6xl my-6 animate-pulse">🧬 📄</div>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                  "O tipo textual é o DNA. Se tem <strong>imperativo</strong>, é
                  Injunção. Se tem <strong>opinião</strong>, é Dissertação. Se{" "}
                  <strong>relata fatos</strong>, é Narração."
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                  <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">
                      Dissertação (Opinião)
                    </h4>
                    <p className="text-lg text-muted-foreground italic truncate">
                      "É fundamental que a empresa invista..."
                    </p>
                  </div>
                  <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                      Injunção (Instrução)
                    </h4>
                    <p className="text-lg text-muted-foreground italic truncate">
                      "Utilize o EPI antes de iniciar..."
                    </p>
                  </div>
                </div>
              </>
            ),
          }}
          audio={{
            audioUrl: "https://audio-placeholder.mp3",
            titulo: "DNA Textual em 3 Minutos",
            artista: "Dossiê Petrobras",
            capaUrl:
              "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1000",
            lyrics:
              "[Host] - Tipologia não é gênero. Gênero é o frasco, Tipologia é o conteúdo...",
          }}
          variant={mv[4]}
        />

                <QuizInterativo
          questoes={quizM4}
          titulo="QUIZ: Tipologia Textual"
          icone="🧬"
          numero={5}
          onComplete={(score) => handleModuleComplete("modulo-4", score)}
          variant={mv[4]}
        />
      </TabsContent>

      {/* ─── MÓDULO 5: VÍCIOS E VELOCIDADE (DOSSIÊ PREMIUM) ─── */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="Vícios e Velocidade"
          descricao="Elimine as âncoras que te impedem de ler os textos técnicos da Petrobras em tempo recorde."
          variant={mv[5]}
        />

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={1}
            title="As Âncoras do Candidato"
            description="Para ler rápido, não é preciso ler 'correndo', mas sim ler sem carregar peso desnecessário."
          variant={mv[5]}
        />
          <p className="text-muted-foreground leading-relaxed">
            Eliminar vícios de leitura é o primeiro passo para dominar os textos
            técnicos da Petrobras sem estourar o cronômetro da prova.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <FlipCard
              frente={
                <div className="flex flex-col items-center gap-3">
                  <LuBrain className="w-10 h-10 text-emerald-500 opacity-50" />
                  <span className="text-xl font-black uppercase text-center">
                    O que é a Subvocalização?
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-red-500 font-bold border-b border-white/10 pb-2">
                    <LuShieldAlert /> <span>VÍCIO DE LENTIDÃO</span>
                  </div>
                  <p className="text-lg">
                    É o hábito de "ouvir" a voz na mente enquanto lê. Isso
                    limita sua velocidade de leitura à velocidade da fala (150
                    ppm). Leitura visual pura atinge 600+ ppm.
                  </p>
                </div>
              }
              categoria="Velocidade de Elite"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center gap-3">
                  <LuTriangleAlert className="w-10 h-10 text-red-500 opacity-50" />
                  <span className="text-xl font-black uppercase text-center">
                    Por que a Regressão ocular é fatal?
                  </span>
                </div>
              }
              verso={
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-red-500 font-bold border-b border-white/10 pb-2">
                    <LuShieldAlert /> <span>DESTRUTOR DE FLUXO</span>
                  </div>
                  <p className="text-lg">
                    Voltar ao início da frase porque "não entendeu" destrói a
                    coesão mental. O cérebro entende melhor no fluxo contínuo.
                    Confie na sua primeira leitura.
                  </p>
                </div>
              }
              categoria="Velocidade de Elite"
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
              corIndicador="bg-violet-500"
              slides={[
                {
                  titulo: "1. Leitura de Reconhecimento",
                  icone: "🔍",
                  conteudo: (
                    <p className="text-lg text-muted-foreground">
                      Busca de palavras-chave. Usada após ler o enunciado.
                    </p>
                  ),
                },
                {
                  titulo: "2. Leitura de Compreensão",
                  icone: "📘",
                  conteudo: (
                    <p className="text-lg text-muted-foreground">
                      Para entender a lógica dos parágrafos e a tese do autor.
                    </p>
                  ),
                },
                {
                  titulo: "3. Leitura Analítica",
                  icone: "⚖️",
                  conteudo: (
                    <p className="text-lg text-muted-foreground">
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
          index={2}
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



        













<ModuleConsolidation
          index={5}
          video={{
            videoId: "dQw4w9WgXcQ",
            title: "Leitura de Elite: Eliminando Vícios e Ganhando Velocidade",
            duration: "07:30",
            thumbnail:
              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000",
          }}
          resumoVisual={{
            moduloNome: "Módulo 5",
            tituloAula: "Interpretação de Texto",
            materia: "Língua Portuguesa",
            images: [
              {
                title: "Card de Tese",
                type: "Tático",
                placeholderColor: "bg-emerald-900/10",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-5/card-tese.png",
              },
              {
                title: "Infográfico de Comandos",
                type: "Diagrama",
                placeholderColor: "bg-teal-900/10",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-5/infografico-comandos.png",
              },
              {
                title: "Mapa Mental: Inferência",
                type: "Esquema",
                placeholderColor: "bg-green-900/10",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-5/mapa-mental-inferencia.png",
              },
            ],
          }}
          maceteVisual={{
            title: "O Macete da 'Leitura em Blocos'",
            content: (
              <>
                <div className="text-6xl my-6 animate-pulse">⚡ 📖</div>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                  "Não leia palavras, leia <strong>sentidos</strong>. Seu
                  cérebro é capaz de captar 3 ou 4 palavras de uma vez como se
                  fosse uma foto."
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                  <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-red-600 dark:text-red-400 mb-2">
                      Subvocalização (Vício)
                    </h4>
                    <p className="text-lg text-muted-foreground italic truncate">
                      "Ler em voz alta na cabeça."
                    </p>
                  </div>
                  <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                      Visão Periférica (Elite)
                    </h4>
                    <p className="text-lg text-muted-foreground italic truncate">
                      "Captar blocos de 3+ palavras."
                    </p>
                  </div>
                </div>
              </>
            ),
          }}
          audio={{
            audioUrl: "https://audio-placeholder.mp3",
            titulo: "Áudio Resumo: Velocidade Tática",
            artista: "Dossiê Petrobras",
            capaUrl:
              "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1000",
            lyrics:
              "[Host] - Ler rápido não é correr, é saber o que ignorar...",
          }}
          variant={mv[5]}
        />

                <QuizInterativo
          questoes={quizM5}
          titulo="QUIZ: Coesão Referencial"
          icone="⚡"
          numero={6}
          onComplete={(score) => handleModuleComplete("modulo-5", score)}
          variant={mv[5]}
        />
      </TabsContent>

      {/* ─── MÓDULO 6: AS ENTRELINHAS (DOSSIÊ PREMIUM) ─── */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <ModuleBanner
          numero={6}
          titulo="As Entrelinhas (Inferência)"
          descricao="A arte de ler o que não foi escrito, mas foi 'pago' para ser entendido. Pressupostos vs Subentendidos."
          variant={mv[6]}
        />

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={1}
            title="Lógica de Detecção"
            description="Não é 'achismo'. É dedução lógica baseada em marcas gramaticais."
          variant={mv[6]}
        />
          <p className="text-muted-foreground leading-relaxed">
            A inferência na Cesgranrio não é um exercício de imaginação, mas sim
            a extração de dados contidos nas dobras da linguagem.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <FlipCard
              frente={
                <div className="flex flex-col items-center gap-4">
                  <LuSearch className="w-12 h-12 text-primary opacity-50" />
                  <div className="text-center">
                    <h6 className="text-xl font-bold uppercase">Pressuposto</h6>
                    <p className="text-lg font-medium opacity-80">
                      O que o texto "paga" para ser verdade.
                    </p>
                  </div>
                </div>
              }
              verso={
                <div className="space-y-4">
                  <p className="text-lg leading-relaxed text-zinc-100">
                    Informação que o texto não diz explicitamente, mas que é
                    **logicamente obrigatória** para o sentido da frase. Se você
                    negar o pressuposto, a frase perde o sentido.
                  </p>
                  <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 text-lg text-primary font-bold">
                    Dica de Elite: Procure por verbos como 'deixar de',
                    'continuar' ou advérbios como 'ainda' e 'já'.
                  </div>
                  <p className="text-lg italic text-zinc-400">
                    Ex: "O refino **voltou** a crescer" pressupõe que ele não
                    crescia antes.
                  </p>
                </div>
              }
              categoria="As Entrelinhas"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center gap-4">
                  <LuFileCheck className="w-12 h-12 text-primary opacity-50" />
                  <div className="text-center">
                    <h6 className="text-xl font-bold uppercase">
                      Subentendido
                    </h6>
                    <p className="text-lg font-medium opacity-80">
                      A insinuação que pode ser negada.
                    </p>
                  </div>
                </div>
              }
              verso={
                <div className="space-y-4">
                  <p className="text-lg leading-relaxed text-zinc-100">
                    Dedução que depende totalmente do **contexto** e da
                    interpretação do leitor. O autor pode negar a intenção se
                    for confrontado, pois não há marca gramatical blindada.
                  </p>
                  <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 text-lg text-primary font-bold">
                    Cuidado Cesgranrio: Insinuações são 'perigosas' em
                    interpretação técnica. Responda apenas o que o texto
                    autoriza.
                  </div>
                  <p className="text-lg italic text-zinc-400">
                    Ex: "O ar-condicionado está desligado?" subentende um pedido
                    para ligar.
                  </p>
                </div>
              }
              categoria="As Entrelinhas"
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
          index={2}
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



        













<ModuleConsolidation
          index={3}
          video={{
            videoId: "dQw4w9WgXcQ",
            title: "A Arte das Entrelinhas: Pressupostos e Subentendidos",
            duration: "08:15",
            thumbnail:
              "https://images.unsplash.com/photo-1454165833767-023023e1e2d1?q=80&w=1000",
          }}
          resumoVisual={{
            moduloNome: "Módulo 6",
            tituloAula: "Interpretação de Texto",
            materia: "Língua Portuguesa",
            images: [
              {
                title: "Mapa 1: Anatomia da Inferência",
                type: "Diagrama",
                placeholderColor: "bg-cyan-900/10",
              },
              {
                title: "Mapa 2: Gatilhos Gramaticais",
                type: "Infográfico",
                placeholderColor: "bg-sky-900/10",
              },
              {
                title: "Mapa 3: Filtro de Verdade",
                type: "Tático",
                placeholderColor: "bg-teal-900/10",
              },
            ],
          }}
          maceteVisual={{
            title: "O Macete do 'Detetive Textual'",
            content: (
              <>
                <div className="text-6xl my-6 animate-pulse">🕵️‍♂️ 🔍</div>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                  "O Pressuposto é o que está{" "}
                  <strong>escrito com tinta invisível</strong> (obrigatório). O
                  Subentendido é o que o autor quer que você{" "}
                  <strong>pense</strong> (sugestão)."
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                  <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-cyan-600 dark:text-cyan-400 mb-2">
                      Pressuposto (Gramática)
                    </h4>
                    <p className="text-lg text-muted-foreground italic">
                      "A Petrobras **voltou** a crescer."
                    </p>
                    <p className="text-[10px] mt-2 font-medium text-cyan-700 dark:text-cyan-300">
                      INDICADOR: O verbo 'voltar' garante que ela não crescia.
                      ✅
                    </p>
                  </div>
                  <div className="p-4 bg-teal-500/5 border border-teal-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-teal-600 dark:text-teal-400 mb-2">
                      Subentendido (Contexto)
                    </h4>
                    <p className="text-lg text-muted-foreground italic">
                      "Está calor aqui dentro, não acha?"
                    </p>
                    <p className="text-[10px] mt-2 font-medium text-teal-700 dark:text-teal-300">
                      INDICADOR: Sugestão de abrir a janela. Pode ser negado. ✅
                    </p>
                  </div>
                </div>
              </>
            ),
          }}
          audio={{
            audioUrl: "https://audio-placeholder.mp3",
            titulo: "Áudio Resumo: Detetive de Entrelinhas",
            artista: "Dossiê Petrobras",
            capaUrl:
              "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000",
            lyrics:
              "[Dica] - Se o autor diz que algo 'parou', pressupõe-se que ocorria antes...",
          }}
          variant={mv[6]}
        />

                <QuizInterativo
          questoes={quizM6}
          titulo="QUIZ: Pistas e Entrelinhas"
          icone="🕵️"
          numero={4}
          onComplete={(score) => handleModuleComplete("modulo-6", score)}
          variant={mv[6]}
        />
      </TabsContent>

      {/* ─── MÓDULO 7: AS AMEAÇAS TRIPLAS (DOSSIÊ PREMIUM) ─── */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <ModuleBanner
          numero={7}
          titulo="As Ameaças Triplas"
          descricao="Redução, Extrapolação e Contradição. Detecte os venenos das alternativas falsas lógicas."
          variant={mv[7]}
        />

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={1}
            title="A Trindade do Erro"
            description="As três formas clássicas que a Cesgranrio usa para invalidar uma interpretação correta."
          variant={mv[7]}
        />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FlipCard
              frente={
                <div className="flex flex-col items-center gap-3">
                  <LuShieldAlert className="w-10 h-10 text-primary opacity-50" />
                  <span className="font-bold uppercase text-lg">
                    1. Redução
                  </span>
                </div>
              }
              verso={
                <div className="space-y-3">
                  <p className="text-[11px] leading-relaxed text-zinc-100">
                    O texto é amplo, mas a alternativa foca em apenas um
                    **detalhe**, ignorando a conclusão principal. É o erro do
                    'meio-certo'.
                  </p>
                  <div className="p-2 bg-primary/10 rounded-lg border border-primary/20 text-[10px] text-primary font-bold">
                    Cuidado: A banca adora colocar algo que está no texto, mas
                    não responde à pergunta.
                  </div>
                </div>
              }
              categoria="Ameaças Triplas"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center gap-3">
                  <LuSearch className="w-10 h-10 text-primary opacity-50" />
                  <span className="font-bold uppercase text-lg">
                    2. Extrapolação
                  </span>
                </div>
              }
              verso={
                <div className="space-y-3">
                  <p className="text-[11px] leading-relaxed text-zinc-100">
                    A alternativa traz uma informação 'bonita' ou 'lógica' do
                    mundo real, mas que **NÃO consta no texto**. É o 'achismo'
                    gourmet.
                  </p>
                  <div className="p-2 bg-primary/10 rounded-lg border border-primary/20 text-[10px] text-primary font-bold">
                    Regra de Ouro: Se não está escrito, não existe para a prova.
                  </div>
                </div>
              }
              categoria="Ameaças Triplas"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center gap-3">
                  <LuTarget className="w-10 h-10 text-primary opacity-50" />
                  <span className="font-bold uppercase text-lg">
                    3. Contradição
                  </span>
                </div>
              }
              verso={
                <div className="space-y-3">
                  <p className="text-[11px] leading-relaxed text-zinc-100">
                    A alternativa diz exatamente o **oposto** do que o texto
                    afirmou, muitas vezes usando conectivos de negação
                    escondidos.
                  </p>
                  <div className="p-2 bg-primary/10 rounded-lg border border-primary/20 text-[10px] text-primary font-bold">
                    Dica: Atenção a palavras como 'exceto', 'apenas', 'nunca'.
                  </div>
                </div>
              }
              categoria="Ameaças Triplas"
            />
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6 border border-red-200 dark:border-red-800">
            <h4 className="font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
              <LuShieldAlert className="w-5 h-5" /> Regra de Ouro: A Blindagem
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
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
          index={3}
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



        













<ModuleConsolidation
          index={4}
          video={{
            videoId: "dQw4w9WgXcQ",
            title: "Campo Minado: Evitando Redução, Extrapolação e Contradição",
            duration: "09:10",
            thumbnail:
              "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=1000",
          }}
          resumoVisual={{
            moduloNome: "Módulo 7",
            tituloAula: "Interpretação de Texto",
            materia: "Língua Portuguesa",
            images: [
              {
                title: "Mapa 1: Radar de Erros",
                type: "Diagrama",
                placeholderColor: "bg-red-900/10",
              },
              {
                title: "Mapa 2: Blindagem Lógica",
                type: "Infográfico",
                placeholderColor: "bg-rose-900/10",
              },
              {
                title: "Mapa 3: Checkpoint de Questão",
                type: "Tático",
                placeholderColor: "bg-orange-900/10",
              },
            ],
          }}
          maceteVisual={{
            title: "O Macete do 'Desarmador de Bombas'",
            content: (
              <>
                <div className="text-6xl my-6 animate-pulse">🚫 💣</div>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                  "A alternativa incorreta é um campo minado. A{" "}
                  <strong>Redução</strong> esconde a carga total, a{" "}
                  <strong>Extrapolação</strong> traz reforços de fora e a{" "}
                  <strong>Contradição</strong> é fogo amigo."
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                  <div className="p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-orange-600 dark:text-orange-400 mb-2">
                      Extrapolação (Mais comum)
                    </h4>
                    <p className="text-lg text-muted-foreground italic">
                      "A energia nuclear é o futuro do Brasil." (O texto só
                      citou que é uma opção).
                    </p>
                    <p className="text-[10px] mt-2 font-medium text-orange-700 dark:text-orange-300">
                      PERIGO: Parece lógico, mas NÃO está no texto. ❌
                    </p>
                  </div>
                  <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-rose-600 dark:text-rose-400 mb-2">
                      Fidelidade (Regra de Ouro)
                    </h4>
                    <p className="text-lg text-muted-foreground italic">
                      "A energia nuclear é uma das opções citadas."
                    </p>
                    <p className="text-[10px] mt-2 font-medium text-rose-700 dark:text-rose-300">
                      INDICADOR: Limita-se ao que foi DE fato escrito. ✅
                    </p>
                  </div>
                </div>
              </>
            ),
          }}
          audio={{
            audioUrl: "https://audio-placeholder.mp3",
            titulo: "Radar de Armadilhas (Módulo 7)",
            artista: "Sertanejo de Elite",
            capaUrl:
              "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1000",
            lyrics: `[Intro]
[Verse 1]
A prova é um campo com minas no chão 
Extrapolar é a maior tentação 
Cuidado com o "Sempre" e com o "Jamais" 
Pois o autor quase nunca diz tanto assim, rapaz! 

Tem a Redução que te conta a metade 
Esconde o que falta pra ser a verdade 
E a Contradição que te diz o contrário 
Pra te confundir e te fazer de otário 

[Pre-Chorus]
Se o texto não disse, não tente inventar 
Dentro do limite você tem que ficar! 

[Chorus]
Liga o radar, olha a armadilha 
A Cesgranrio joga com a matilha 
Se é Redução, falta informação 
Se Extrapolou, viajou na diversão 

Mantenha a calma, use a blindagem 
Não caia no truque dessa miragem 
Fique no texto, siga o que foi dito 
E vença esse jogo, que hoje tá bonito!`,
          }}
          variant={mv[7]}
        />

                <QuizInterativo
          questoes={quizM7}
          titulo="QUIZ: As Ameaças Triplas"
          icone="🚫"
          numero={5}
          onComplete={(score) => handleModuleComplete("modulo-7", score)}
          variant={mv[7]}
        />
      </TabsContent>

      {/* ─── MÓDULO 8: INTENÇÃO AUTORAL (DOSSIÊ PREMIUM) ─── */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <ModuleBanner
          numero={8}
          titulo="Intenção Autoral"
          descricao="Para que o texto foi escrito? Decifre a finalidade principal e o tom do autor."
          variant={mv[8]}
        />

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={1}
            title="A Vontade por Trás das Palavras"
            description="Identificar o objetivo (informativo, persuasivo ou crítico) é 50% da questão."
          variant={mv[8]}
        />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <FlipCard
              frente={
                <div className="flex flex-col items-center gap-4">
                  <LuTarget className="w-12 h-12 text-primary opacity-50" />
                  <div className="text-center">
                    <h6 className="text-xl font-bold uppercase">
                      Informativo vs. Persuasivo
                    </h6>
                    <p className="text-lg font-medium opacity-80">
                      Qual o objetivo real do autor?
                    </p>
                  </div>
                </div>
              }
              verso={
                <div className="space-y-4">
                  <p className="text-lg leading-relaxed text-zinc-100">
                    O texto **informativo** apenas relata fatos (neutro). O
                    **persuasivo** quer mudar sua opinião ou convencer de uma
                    tese (subjetivo).
                  </p>
                  <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 text-lg text-primary font-bold">
                    Dica: Textos da Petrobras costumam ser Informativos, mas com
                    tom 'Institucional' (positivo).
                  </div>
                </div>
              }
              categoria="Intenção Autoral"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center gap-4">
                  <LuBrain className="w-12 h-12 text-primary opacity-50" />
                  <div className="text-center">
                    <h6 className="text-xl font-bold uppercase">
                      Crítico vs. Elogioso
                    </h6>
                    <p className="text-lg font-medium opacity-80">
                      O tom das palavras escolhidas.
                    </p>
                  </div>
                </div>
              }
              verso={
                <div className="space-y-4">
                  <p className="text-lg leading-relaxed text-zinc-100">
                    A escolha de adjetivos indica o tom. O uso de **aspas**
                    quase sempre indica ironia ou distanciamento crítico da
                    banca.
                  </p>
                  <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 text-lg text-primary font-bold">
                    Atenção: A Cesgranrio adora perguntar sobre o 'efeito de
                    sentido' de um termo entre aspas.
                  </div>
                </div>
              }
              categoria="Intenção Autoral"
            />
          </div>

          <div className="space-y-6 mt-10">
            <h4 className="text-xl font-bold text-blue-600 flex items-center gap-2">
              <LuTarget className="w-5 h-5" /> Foco na Finalidade
            </h4>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
              <p className="text-lg text-blue-800 dark:text-blue-300">
                <strong>Dica de Ouro:</strong> Procure pelo verbo de ação na
                conclusão. Se o autor termina com solicitações ou visões de
                futuro, a intenção é <strong>propositiva</strong>. Se termina
                apenas com dados, é <strong>expositiva</strong>.
              </p>
            </div>
          </div>
        </section>

        <TextAnalysisLab
          index={2}
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



        













<ModuleConsolidation
          index={3}
          video={{
            videoId: "dQw4w9WgXcQ",
            title: "A Vontade do Autor: Decifrando Intenção e Tons",
            duration: "06:15",
            thumbnail:
              "https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=1000",
          }}
          resumoVisual={{
            moduloNome: "Módulo 8",
            tituloAula: "Interpretação de Texto",
            materia: "Língua Portuguesa",
            images: [
              {
                title: "Mapa 1: Espectro de Tons",
                type: "Diagrama",
                placeholderColor: "bg-blue-900/10",
              },
              {
                title: "Mapa 2: Marcadores de Opinião",
                type: "Infográfico",
                placeholderColor: "bg-sky-900/10",
              },
              {
                title: "Mapa 3: Finalidades do Texto",
                type: "Tático",
                placeholderColor: "bg-indigo-900/10",
              },
            ],
          }}
          maceteVisual={{
            title: "O Macete da 'Mira Autoral'",
            content: (
              <>
                <div className="text-6xl my-6 animate-pulse">🎯 🧠</div>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                  "A intenção é o alvo do autor. Se ele usa aspas ou
                  'supostamente', o tom é <strong>irônico</strong>. Se ele só
                  usa dados, o tom é <strong>expositivo</strong>."
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                  <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">
                      Ironia (Armadilha)
                    </h4>
                    <p className="text-lg text-muted-foreground italic">
                      "O 'genial' plano resultou em prejuízo."
                    </p>
                    <p className="text-[10px] mt-2 font-medium text-blue-700 dark:text-blue-300">
                      INDICADOR: Aspas no 'genial' desmentem o elogio. ✅
                    </p>
                  </div>
                  <div className="p-4 bg-sky-500/5 border border-sky-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-sky-600 dark:text-sky-400 mb-2">
                      Informativo (Neutralidade)
                    </h4>
                    <p className="text-lg text-muted-foreground italic">
                      "A empresa registrou lucro de 10%."
                    </p>
                    <p className="text-[10px] mt-2 font-medium text-sky-700 dark:text-sky-300">
                      INDICADOR: Fatos matemáticos sem adjetivos. ✅
                    </p>
                  </div>
                </div>
              </>
            ),
          }}
          audio={{
            audioUrl: "https://audio-placeholder.mp3",
            titulo: "A Mira do Autor (Módulo 8)",
            artista: "Sertanejo de Elite",
            capaUrl:
              "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1000",
            lyrics: `[Intro]
[Verse 1]
Por trás de cada linha tem um coração 
Uma vontade louca ou uma opinião 
Se o autor quer te dar informação 
Ele limpa os adjetivos da sua visão 

Mas se ele usa aspas pra ironizar 
Ou verbos de comando pra te persuadir 
A intenção tá lá, pronta pra brilhar 
Basta você saber pra onde ela vai fugir 

[Pre-Chorus]
É um tom irônico ou é institucional? 
Mapeia o adjetivo e acerta o final! 

[Chorus]
Na mira do autor, veja o objetivo 
Pode ser irônico ou só descritivo 
Ele quer te convencer ou só te relatar? 
A intenção é a chave pra você passar 

Mira no alvo, busca a finalidade 
Entre o fato puro e a subjetividade 
Decifre o tom, ganhe a questão 
E mostre pro mundo sua superação!`,
          }}
          variant={mv[8]}
        />

                <QuizInterativo
          questoes={quizM8}
          titulo="QUIZ: A Lógica CESGRANRIO"
          icone="🎯"
          numero={4}
          onComplete={(score) => handleModuleComplete("modulo-8", score)}
          variant={mv[8]}
        />
      </TabsContent>

      {/* ─── MÓDULO 9: A LÓGICA CESGRANRIO (DOSSIÊ PREMIUM) ─── */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <ModuleBanner
          numero={9}
          titulo="A Lógica Cesgranrio"
          descricao="O DNA das questões. Mapeamento de sinônimos técnicos e eixos temáticos repetitivos."
          variant={mv[9]}
        />

        {/* ★ NOVO: Rich Intro Section */}
      <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-10">
        <ModuleSectionHeader index="INTRO" title="Algoritmo da Aprovação: Checklist Operacional" description="Passe do olhar selvagem para uma arquitetura robótica inabalável de validação analítica." variant={mv[9]} />
        <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
          <p>
            O segredo das performances extremas na leitura da CESGRANRIO se deve à automação de metodologias procedimentais, descartando fluxos de genialidade natural, adotando engrenagens matemáticas rígidas para lidar com "achismos". É fundamental possuir o próprio Framework/Protocolo validatório da alternativa correta para evitar perdas cognitivas e hesitações durante provas imersas em grandes perdas de carga de bateria metabólica de exauridos examinandos.
          </p>
          <p>
            O Procedimento se instaura logo na Leitura Diagnóstica. Não leia como ler um romance (passivo interativo agradável); realize escaneamento agressivo e utilitário, com lápis grafite a punho atacando conjunções vitais e Tópicos Frasais, traçando boxes marcadores naqueles núcleos duros que revelam, sem ressalvas, se o Autor inclina sua defesa à pauta X ou apoia a refutação por argumentação baseada em Y. O resumo parágrafo a parágrafo de três vocábulos sela tudo isso metodologicamente!
          </p>
          <p>
            Avance posteriormente na dissecação modular do Problema de Prova. Quando questionado sobre interpretações inferidoras, evite reprocessar fragmentos amplos em tela cheia na sua mente. Delimite as demarcações exatas de escopo! Refutem premissas isoladamente em cada "letra": verifique a baliza e o eixo ("Se citou evento A do texto sendo justificado pelo viés de C da Letra K" - a menção central ocorreu? Sim. O referencial temporal se confirma? Sim. A motivação declarada é espelho do texto originário? Não). Conclusão: "X" nessa assertiva sem sofrimento!
          </p>
          <p>
            Pela mecânica das grandes estatais como Petrobras e Transpetro, a disciplina técnica rege a perfeição. Ao duvidar furiosamente entre duas alternativas paradoxais, execute sempre à Lei do Tribunal Textual Evidenciatório (O lastro). O examinador o ataca com interpretações dúbias altamente possíveis... não discuta; apenas demande imediatamente a palavra "escrita" textualmente (Pista Material Base) capaz de abalizar perante um júri racional qual opção reside verdadeiramente sob um ancoradouro dissecável.
          </p>
          <div className="bg-gradient-to-br from-slate-100 to-gray-200 dark:from-slate-800/80 dark:to-gray-900/80 rounded-lg border border-slate-300 dark:border-slate-700 p-6 space-y-4">
            <h4 className="font-bold text-foreground flex items-center gap-2">Checklist das Boas Práticas Absolutas de Concurso</h4>
            <ul className="list-disc list-inside space-y-2 mt-2 font-medium">
              <li>Inspecione enunciados identificando a demanda restritiva geográfica ou tipológica ANTES.</li>
              <li>A detecção das sinalizações coesivas (conectivos causais e de transição e oposição).</li>
              <li>Vigilância máxima e total às ameaças universalistas do léxico e alternativas reducionistas.</li>
              <li>Sustentação na matriz explícita de "Tribunal Textual Base" diante do perigo inferidor difuso.</li>
            </ul>
          </div>
        </div>
      </section>

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <FlipCard
              frente="Sinônimos Técnicos"
              verso={
                <div className="space-y-2">
                  <span className="font-bold text-blue-500 block">
                    VOCABULÁRIO
                  </span>
                  <p className="text-lg">
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
                  <p className="text-lg">
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
            <p className="text-lg">
              Sempre que aparecer um termo entre aspas no texto, a Cesgranrio
              perguntará sobre a <strong>ressignificação</strong> ou o{" "}
              <strong>efeito de sentido</strong> desse termo no contexto.
            </p>
          </div>
        </section>

        <TextAnalysisLab
          index={2}
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



        













<ModuleConsolidation
          index={3}
          video={{
            videoId: "dQw4w9WgXcQ",
            title: "O Filtro Cesgranrio: Sinônimos e Eixos Temáticos",
            duration: "08:45",
            thumbnail:
              "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1000",
          }}
          resumoVisual={{
            moduloNome: "Módulo 9",
            tituloAula: "Interpretação de Texto",
            materia: "Língua Portuguesa",
            images: [
              {
                title: "Dicionário de Sinônimos da Banca",
                type: "Tático",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-5/mapa-mental-inferencia.png",
                placeholderColor: "bg-blue-900/10",
              },
              {
                title: "Temas Recorrentes na Petrobras",
                type: "Infográfico",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-5/infografico-comandos.png",
                placeholderColor: "bg-sky-900/10",
              },
              {
                title: "Eixos de Comando Textual",
                type: "Diagrama",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-5/card-tese.png",
                placeholderColor: "bg-indigo-900/10",
              },
            ],
          }}
          maceteVisual={{
            title: "O Macete da 'Troca de Peças'",
            content: (
              <>
                <div className="text-6xl my-6 animate-pulse">🧩 🔄</div>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                  "A lógica da banca é a <strong>equivalência</strong>. Se ela
                  troca 'viabilizar' por 'tornar possível', ela está testando
                  sua agilidade semântica, não sua criatividade."
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                  <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">
                      Fomentar (Cesgranrio)
                    </h4>
                    <p className="text-lg text-muted-foreground italic">
                      "É preciso fomentar o debate."
                    </p>
                    <p className="text-[10px] mt-2 font-medium text-blue-700 dark:text-blue-300">
                      EQUIVALENTE: Estimular / Promover. ✅
                    </p>
                  </div>
                  <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                      Negligenciar (Cesgranrio)
                    </h4>
                    <p className="text-lg text-muted-foreground italic">
                      "A gestão negligenciou os dados."
                    </p>
                    <p className="text-[10px] mt-2 font-medium text-indigo-700 dark:text-indigo-300">
                      EQUIVALENTE: Omitir / Desconsiderar. ✅
                    </p>
                  </div>
                </div>
              </>
            ),
          }}
          audio={{
            audioUrl: "https://audio-placeholder.mp3",
            titulo: "Troca de Peças (Módulo 9)",
            artista: "Sertanejo de Elite",
            capaUrl:
              "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1000",
            lyrics: `[Intro]
[Verse 1]
Mudar a palavra sem mudar o sentido 
É o desafio que te deixa aturdido 
"Viabilizar" é "tornar possível" 
Um vocabulário que te faz invencível 

Se o texto diz "fomentar" o debate 
É "promover" que a alternativa abate 
"Negligenciar" é "deixar de lado" 
Fique esperto pra não ser enganado! 

[Pre-Chorus]
É a semântica, o jogo das palavras 
Derrubando muros, abrindo as lavras! 

[Chorus]
Na troca de peças, o sentido se mantém 
Sinônimo técnico que te leva o bem 
Não é o que parece, é o que ele traduz 
Mapeia a troca e enxergue a luz 

A peça encaixa, o quebra-cabeça 
Faz com que a questão rápido apareça 
Mude a palavra, segure o valor 
E saia da prova como um vencedor!`,
          }}
          variant={mv[9]}
        />

                <QuizInterativo
          questoes={quizM9}
          titulo="QUIZ: Checklist Tático"
          icone="🧠"
          numero={4}
          onComplete={(score) => handleModuleComplete("modulo-9", score)}
          variant={mv[9]}
        />
      </TabsContent>

      {/* ─── MÓDULO 10: ARENA DE ELITE (DOSSIÊ PREMIUM) ─── */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <ModuleBanner
          numero={10}
          titulo="Arena de Elite"
          descricao="A prova final. O Checklist de Blindagem antes do grande desafio."
          variant={mv[10]}
        />

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader
            index={1}
            title="Checklist de Blindagem Final"
            description="Revise os 5 mandamentos da interpretação Cesgranrio antes de começar."
          variant={mv[10]}
        />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FlipCard
              frente={
                <div className="flex flex-col items-center gap-3">
                  <LuEye className="w-10 h-10 text-primary opacity-50" />
                  <span className="font-bold uppercase text-lg text-center">
                    1. Olhar de Raio-X
                  </span>
                </div>
              }
              verso={
                <div className="space-y-3">
                  <p className="text-[11px] leading-relaxed text-zinc-100">
                    Sua primeira missão é identificar se a questão pede o
                    **sentido global** (o texto todo) ou **localizado** (uma
                    linha específica).
                  </p>
                  <div className="p-2 bg-primary/10 rounded-lg border border-primary/20 text-[10px] text-primary font-bold">
                    Check: Leia o comando da questão 2x antes de ir ao texto.
                  </div>
                </div>
              }
              categoria="Arena de Elite"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center gap-3">
                  <LuShieldAlert className="w-10 h-10 text-primary opacity-50" />
                  <span className="font-bold uppercase text-lg text-center">
                    2. Filtro Anti-Achismo
                  </span>
                </div>
              }
              verso={
                <div className="space-y-3">
                  <p className="text-[11px] leading-relaxed text-zinc-100">
                    Corte toda informação que não está escrita. Se a alternativa
                    fizer sentido mas **não tiver prova no texto**, ela é
                    Extrapolação.
                  </p>
                  <div className="p-2 bg-primary/10 rounded-lg border border-primary/20 text-[10px] text-primary font-bold">
                    Regra: O texto é sua única verdade. O que você sabe de fora
                    não conta.
                  </div>
                </div>
              }
              categoria="Arena de Elite"
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center gap-3">
                  <LuTarget className="w-10 h-10 text-primary opacity-50" />
                  <span className="font-bold uppercase text-lg text-center">
                    3. Radar de Sinônimos
                  </span>
                </div>
              }
              verso={
                <div className="space-y-3">
                  <p className="text-[11px] leading-relaxed text-zinc-100">
                    Fique atento à troca de verbos técnicos. A banca substitui
                    termos para ver se você entende a **equivalência semântica**
                    no contexto industrial.
                  </p>
                  <div className="p-2 bg-primary/10 rounded-lg border border-primary/20 text-[10px] text-primary font-bold">
                    Dica: Domine verbos como 'viabilizar', 'fomentar' e
                    'negligenciar'.
                  </div>
                </div>
              }
              categoria="Arena de Elite"
            />
          </div>

          <div className="bg-orange-50 dark:bg-zinc-900/50 rounded-2xl p-6 border border-orange-200 dark:border-primary/20">
            <h4 className="font-bold text-orange-700 dark:text-primary mb-3 flex items-center gap-2">
              <LuTrophy className="w-5 h-5" /> Mensagem Especial: A Blindagem
            </h4>
            <p className="text-lg italic text-muted-foreground">
              "A interpretação na Petrobras não é sobre adivinhação, é sobre
              **mapeamento**. Se você utilizou as técnicas deste dossiê, o
              gabarito é apenas uma consequência lógica. Boa sorte na Arena." -
              Professor IA.
            </p>
          </div>
        </section>



        













<ModuleConsolidation
          index={2}
          video={{
            videoId: "dQw4w9WgXcQ",
            title: "Checklist de Elite: A Blindagem Final",
            duration: "07:30",
            thumbnail:
              "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000",
          }}
          resumoVisual={{
            moduloNome: "Módulo 10",
            tituloAula: "Interpretação de Texto",
            materia: "Língua Portuguesa",
            images: [
              {
                title: "Fluxograma de Resposta Eficiente",
                type: "Diagrama",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-5/mapa-mental-inferencia.png",
                placeholderColor: "bg-amber-900/10",
              },
              {
                title: "Filtro de Eliminação Rápida",
                type: "Tático",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-5/infografico-comandos.png",
                placeholderColor: "bg-orange-900/10",
              },
              {
                title: "Checklist de Ouro da Aprovação",
                type: "Infográfico",
                imageUrl:
                  "/assets/images/portugues/interpretacao-texto/modulo-5/card-tese.png",
                placeholderColor: "bg-yellow-900/10",
              },
            ],
          }}
          maceteVisual={{
            title: "O Macete do 'Vencedor da Arena'",
            content: (
              <>
                <div className="text-6xl my-6 animate-pulse">👑 🚀</div>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                  "Você agora é um <strong>Mestre da Exegese</strong>. A prova
                  não é sobre o que você acha, é sobre o que o texto permite.
                  Confie no Dossiê e blinde sua nota."
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                  <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-amber-600 dark:text-amber-400 mb-2">
                      A Tática do Descarte
                    </h4>
                    <p className="text-[10px] text-muted-foreground">
                      Não busque a certa, elimine as erradas por Redução,
                      Extrapolação ou Contradição. Sobrará a verdade.
                    </p>
                  </div>
                  <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl">
                    <h4 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                      Foco no Comando
                    </h4>
                    <p className="text-[10px] text-muted-foreground">
                      Responda o que o enunciado pediu, não o que o texto diz em
                      outras partes. O comando é soberano.
                    </p>
                  </div>
                </div>
              </>
            ),
          }}
          audio={{
            audioUrl: "https://audio-placeholder.mp3",
            titulo: "Gabaritando a Arena (Módulo 10)",
            artista: "Sertanejo de Elite",
            capaUrl:
              "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1000",
            lyrics: `[Intro]
[Verse 1]
Chegou a hora, o momento final 
A prova te espera, o clima é real 
Mapeou o parágrafo, achou a viga 
Agora é na Arena que a gente briga 

Lembrou dos conectivos e da coesão 
Limpou o DNA da sua visão 
Vincou as entrelinhas com precisão 
Pra não cair em nenhuma redução 

[Pre-Chorus]
A blindagem tá feita, o radar tá ligado 
O seu nome na lista já tá desenhado! 

[Chorus]
Gabaritando a Arena, com a mente de elite 
Pro seu sucesso não tem mais limite 
A Petrobras chama, o sonho é real 
Interpretação mestre, nível funcional 

Dossiê completo, missão cumprida 
Uma nova etapa na sua vida 
Confia no treino, use a estratégia 
E brilhe na prova, saia da média!`,
          }}
          variant={mv[10]}
        />

                <QuizInterativo
          questoes={quizFinal}
          titulo="QUIZ: Arena de Elite"
          icone="👑"
          numero={3}
          onComplete={(score) => handleModuleComplete("modulo-10", score)}
          variant={mv[10]}
        />
      </TabsContent>
    </AulaTemplate>
  );
}
