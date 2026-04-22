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
  ModuleConsolidation,
  LessonTabs,
  ModuleSummaryCarouselNew,
  TextAnalysisLab,
  RichIntro,
  MusicPlayerCard,
  QuizDiagnostic,
} from "../shared";

import {
  LuBookOpen,
  LuTarget,
  LuTriangleAlert,
  LuShieldAlert,
  LuBrain,
  LuCheck,
  LuAnchor,
  LuCompass,
  LuZap,
  LuScale,
  LuLightbulb,
  LuLink,
  LuActivity,
  LuSearch,
  LuLibrary,
  LuTrophy,
  LuPlay,
  LuImage,
  LuVolume2,
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
} from "./data/coesao-coerencia-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "O Tecido do Texto" },
  { id: "modulo-2", label: "Módulo 2", title: "O Poder do Retrovisor" },
  { id: "modulo-3", label: "Módulo 3", title: "O Farol do Sentido" },
  { id: "modulo-4", label: "Módulo 4", title: "O Silêncio Eloquente" },
  { id: "modulo-5", label: "Módulo 5", title: "Substituições de Elite" },
  { id: "modulo-6", label: "Módulo 6", title: "A Dança dos Conectivos" },
  { id: "modulo-7", label: "Módulo 7", title: "Concessão & Oposição" },
  { id: "modulo-8", label: "Módulo 8", title: "Arquitetura da Coerência" },
  { id: "modulo-9", label: "Módulo 9", title: "Progressão e Relevância" },
  { id: "modulo-10", label: "Módulo 10", title: "Arena de Elite" },
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
  const mv = Array.from({ length: 11 }, (_, i) => getModuleVariant(i));

  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(),
  );
  const [hasSyncedInitial, setHasSyncedInitial] = useState(false);

  // Quizzes dinâmicos (seleção aleatória do pool)
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

  const isModuleUnlocked = useCallback((index: number) => {
    return true; // Liberado para estudo contínuo
  }, []);

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
      {/* ── MÓDULO 1: O TECIDO DO TEXTO ───────────────────────── */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="O Tecido do Texto"
          descricao="Entenda a diferença fundamental entre Coesão (forma) e Coerência (sentido) no padrão CESGRANRIO."
          variant={mv[1]}
        />

        <div className="space-y-[50px]">
          {/* ★ RICH INTRO: Engajamento inicial */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index="INTRO"
              title="A Matemática do Sentido"
              description="Domine a engenharia de superfície e a mecânica de profundidade para antecipar armadilhas da CESGRANRIO."
              variant={mv[1]}
            />
            <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
              <p>
                Para <strong>Evanildo Bechara</strong>, o texto não é um amontoado de frases
                soltas, mas um <strong>organismo vivo</strong> em que cada parte depende das
                demais para produzir sentido. Na sua <em>Moderna Gramática Portuguesa</em>,
                Bechara distingue dois planos de organização textual que a CESGRANRIO cobra
                com frequência: a <strong>coesão</strong>, que opera na superfície
                linguística — o terreno dos pronomes, das conjunções, das elipses e das
                repetições controladas —, e a <strong>coerência</strong>, que habita o
                subsolo lógico do texto, garantindo que as ideias não se contradigam e que a
                progressão temática faça sentido para o leitor. Entender essa dualidade é o
                primeiro passo para decifrar qualquer questão de Língua Portuguesa no
                concurso da Petrobras.
              </p>

              <p>
                A <strong>coesão</strong>, segundo Bechara, funciona como a argamassa entre
                os tijolos de uma construção: sem ela, as paredes (frases) até podem estar
                de pé individualmente, mas o edifício (texto) desmorona. Essa argamassa se
                manifesta por dois grandes mecanismos.{" "}
                O primeiro é a <strong>coesão referencial</strong> (ou remissiva), que
                conecta termos dentro do texto por meio de anáforas, catáforas, pronomes
                demonstrativos, relativos e possessivos. O segundo é a{" "}
                <strong>coesão sequencial</strong>, que encadeia as ideias por meio de
                conectivos — conjunções coordenativas e subordinativas, advérbios de
                ligação e expressões de transição. Nos relatórios técnicos da Petrobras,
                ambos os mecanismos são indispensáveis para garantir clareza e evitar
                ambiguidade em procedimentos de segurança operacional.
              </p>

              <p>
                Já a <strong>coerência</strong> não reside nas palavras em si, mas na
                relação lógica entre o que o texto diz e o <strong>conhecimento de
                mundo</strong> do leitor. Bechara adverte que um texto pode ser
                perfeitamente coeso — com todos os pronomes retomando os referentes
                corretos e todos os conectivos bem empregados — e, ainda assim, ser
                completamente <strong>incoerente</strong>. O exemplo clássico é a frase
                {" "}<em>&quot;O técnico de segurança inspecionou a válvula, portanto o navio
                voou para Marte&quot;</em>: coesa na superfície (o &quot;portanto&quot; conecta as
                orações), mas absurda no plano lógico. A CESGRANRIO explora exatamente essa
                armadilha, apresentando textos com coesão impecável mas com rupturas de
                coerência pragmática escondidas nas entrelinhas.
              </p>

              <p>
                No contexto da <strong>Petrobras</strong>, essa distinção assume dimensão
                crítica. Um boletim de ocorrência que diga{" "}
                <em>&quot;A pressão do duto aumentou 30%. Dessa forma, a equipe manteve o
                mesmo procedimento&quot;</em> apresenta uma incoerência pragmática grave: o
                conectivo conclusivo &quot;dessa forma&quot; liga um fato (aumento de pressão) a
                uma conclusão ilógica (manutenção do mesmo procedimento), quando o
                esperado seria a adoção de medidas corretivas. Nos editais recentes da
                CESGRANRIO para a Petrobras, questões desse tipo — em que a coesão
                superficial mascara uma falha de coerência — representam cerca de 15% das
                questões de interpretação e gramática.
              </p>

              <p>
                A principal <strong>pegadinha</strong> que a banca aplica neste tema é
                afirmar que um texto é incoerente apenas porque lhe falta um conectivo
                explícito. Bechara ensina que pode haver coerência sem coesão explícita:
                frases como <em>&quot;Choveu. O jogo foi cancelado&quot;</em> são perfeitamente
                coerentes — o leitor infere a relação causal pelo contexto —, embora não
                haja nenhum conectivo unindo as orações. A CESGRANRIO frequentemente
                oferece alternativas que confundem <strong>ausência de conectivo</strong>{" "}
                com <strong>ausência de coerência</strong>, e o candidato preparado sabe
                que são fenômenos independentes.
              </p>

              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground flex items-center gap-2">
                  🛡️ Protocolo N.E.X.O. de Elite
                </h4>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li><strong>N</strong>avegar — Rastreie o antecedente (anáfora) ou o referente futuro (catáfora) com precisão cirúrgica.</li>
                  <li><strong>E</strong>xaminar — Valide a função lógica do conectivo: ele indica causa, oposição, concessão ou conclusão?</li>
                  <li><strong>X</strong>eretar — Substitua o nexo por um equivalente e verifique se a lógica e a correção gramatical permanecem intactas.</li>
                  <li><strong>O</strong>mitir — Identifique o silêncio estratégico (elipse/zeugma) e confirme se o termo omitido é recuperável pelo contexto.</li>
                </ul>
              </div>
            </div>

            <QuizDiagnostic
              title="Diagnóstico de Entrada: O Falso Brilho"
              description="Teste sua percepção inicial sobre a força dos conectivos adversativos."
              question="Na frase: 'O projeto é ambicioso, **contudo** exige alto investimento', a substituição de 'contudo' por 'embora' manteria a correção gramatical?"
              options={[
                "Sim, pois ambos indicam oposição.",
                "Não, pois a mudança exige ajuste no modo verbal.",
                "Sim, desde que a pontuação seja mantida.",
                "Sim, pois são sinônimos perfeitos no Padrão Bechara.",
              ]}
              correctAnswer={1}
              explanation="Excelente! Como ensina Bechara, a conjunção 'contudo' (adversativa) acompanha o modo indicativo, enquanto 'embora' (concessiva) exige o modo subjuntivo."
              variant={mv[1]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Dualidade Textual"
              variant={mv[1]}
            />
            <ContentAccordion
              mode="stacked"
              slides={[
                {
                  titulo: "O Microscópio de Bechara: A Dualidade",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed text-justify">
                        Para o gramático <strong>Evanildo Bechara</strong>, o
                        texto é uma unidade sociocomunicativa intrincada. A{" "}
                        <strong>Coesão</strong> atua como a rede neural
                        (elementos de amarração, preposições, sintaxe), enquanto
                        a <strong>Coerência</strong> é a consciência do texto
                        (não contradição, relevância e encadeamento lógico).
                      </p>
                      <AlertBox tipo="info" titulo="O que a CESGRANRIO cobra?">
                        A banca raramente pedirá conceitos isolados. Ela exigirá
                        que você identifique os <strong>mecanismos</strong> que
                        amarram o texto e denuncie quando o sentido lógico for
                        quebrado por um conectivo mal empregado.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Anatomia da Estrutura",
                  icone: <LuScale />,
                  conteudo: (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-xl space-y-3">
                        <h4 className="font-bold text-blue-600 flex items-center gap-2">
                          <LuLink /> Coesão (Capa/Forma)
                        </h4>
                        <p className="text-muted-foreground text-sm md:text-base">
                          A engenharia de superfície. Utiliza pronomes,
                          conjunções, sinônimos e pontuação estrutural para
                          impedir que as frases "desabem" umas sobre as outras.
                        </p>
                      </div>
                      <div className="p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-xl space-y-3">
                        <h4 className="font-bold text-emerald-600 flex items-center gap-2">
                          <LuBrain /> Coerência (Interior/Sentido)
                        </h4>
                        <p className="text-muted-foreground text-sm md:text-base">
                          A engenharia de profundidade. Garante a ausência total
                          de contradição, a continuidade temática e a relevância
                          sistêmica da informação.
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <Comparison
              title="A Importância do Nexo"
              left={{
                title: "Texto Incoerente",
                content:
                  "O técnico consertou a turbina. O navio voou para o espaço sideral.",
                description:
                  "As frases estão ligadas, mas o conteúdo é ilógico (coeso mas incoerente).",
                variant: "danger",
              }}
              right={{
                title: "Texto Coeso e Coerente",
                content:
                  "O técnico consertou a turbina. Graças a isso, a embarcação voltou a operar.",
                description:
                  "Há nexo gramatical (Graças a isso) e lógico (operação retomada).",
                variant: "success",
              }}
            />
          </section>

          {/* ── SEÇÃO EXTRA M1: Mecanismos de Coesão ─── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Os 5 Grandes Mecanismos de Coesão"
              variant={mv[1]}
            />
            <ContentAccordion
              mode="stacked"
              slides={[
                {
                  titulo: "O que é Referência?",
                  icone: <LuLink />,
                  conteudo: (
                    <div className="space-y-3">
                      <p className="text-muted-foreground leading-relaxed">
                        Referência é o mecanismo pelo qual um elemento do texto
                        remete a outro — dentro do próprio texto (endofórica) ou
                        fora dele (exofórica). Divide-se em{" "}
                        <strong>anáfora</strong> (retoma o que já foi dito) e{" "}
                        <strong>catáfora</strong> (antecipa o que será dito).
                      </p>
                      <div className="p-3 bg-blue-500/5 rounded-xl border-l-4 border-blue-500 font-mono text-lg italic">
                        "A engenheira chegou.{" "}
                        <span className="text-blue-600 font-bold">Ela</span>{" "}
                        assumiu o posto." — 'ela' refere-se a 'a engenheira'.
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Como funciona a Substituição?",
                  icone: <LuActivity />,
                  conteudo: (
                    <div className="space-y-3">
                      <p className="text-muted-foreground leading-relaxed">
                        A substituição troca um elemento por outro de valor
                        equivalente para evitar repetição. Pode ser{" "}
                        <strong>nominal</strong>, <strong>verbal</strong> ou{" "}
                        <strong>oracional</strong>.
                      </p>
                      <div className="p-3 bg-emerald-500/5 rounded-xl border-l-4 border-emerald-500 font-mono text-lg italic">
                        "O relatório técnico foi entregue.{" "}
                        <span className="text-emerald-600 font-bold">
                          O documento
                        </span>{" "}
                        estava impecável." — substituição nominal.
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "O que é Elipse e por que cria fluidez?",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-3">
                      <p className="text-muted-foreground leading-relaxed">
                        A elipse é a omissão de um termo recuperável pelo
                        contexto. Cria fluidez eliminando repetições
                        desnecessárias. Na CESGRANRIO, a elipse verbal
                        frequentemente é marcada pela vírgula.
                      </p>
                      <div className="p-3 bg-cyan-500/5 rounded-xl border-l-4 border-cyan-500 font-mono text-lg italic">
                        "Maria aprovou a proposta; Pedro{" "}
                        <span className="text-cyan-600 font-bold">
                          [aprovou]
                        </span>{" "}
                        a minuta." — verbo elidido.
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Qual é o papel dos Conectivos?",
                  icone: <LuZap />,
                  conteudo: (
                    <p className="text-muted-foreground leading-relaxed">
                      Conjunções e conectivos estabelecem relações
                      semântico-lógicas: <strong>adição</strong> (e, além
                      disso), <strong>adversidade</strong> (mas, porém),{" "}
                      <strong>causalidade</strong> (porque, visto que),{" "}
                      <strong>concessão</strong> (embora, ainda que),{" "}
                      <strong>finalidade</strong> (para que). São os tijolos da
                      arquitetura argumentativa.
                    </p>
                  ),
                },
                {
                  titulo: "Como a Coesão Lexical enriquece o texto?",
                  icone: <LuLibrary />,
                  conteudo: (
                    <div className="space-y-3">
                      <p className="text-muted-foreground leading-relaxed">
                        A coesão lexical usa relações semânticas:{" "}
                        <strong>sinonímia</strong> (petróleo / óleo cru),{" "}
                        <strong>hiperonímia</strong> (combustível para petróleo,
                        gás e etanol), <strong>hiponímia</strong> (diesel como
                        espécie de combustível) e <strong>reiteração</strong>{" "}
                        intencional. Em textos da Petrobras, a hiperonímia é
                        especialmente frequente.
                      </p>
                    </div>
                  ),
                },
              ]}
            />

            <FlipCard
              frente={
                <div className="text-center space-y-3">
                  <div className="text-4xl">🔄</div>
                  <div className="font-bold text-lg">Anáfora vs. Catáfora</div>
                  <div className="text-lg text-muted-foreground">
                    Clique para ver a diferença essencial
                  </div>
                </div>
              }
              verso={
                <div className="space-y-4 text-lg">
                  <div className="p-3 bg-cyan-500/20 rounded-xl border border-cyan-500/30">
                    <p className="font-bold text-cyan-300 mb-1">
                      ANÁFORA — Retrovisor
                    </p>
                    <p className="text-zinc-200 italic">
                      "A turbina falhou.{" "}
                      <span className="text-cyan-300 font-bold">
                        O equipamento
                      </span>{" "}
                      foi substituído."
                    </p>
                    <p className="text-zinc-400 text-lg mt-1">
                      ← 'O equipamento' retoma 'a turbina' (passado)
                    </p>
                  </div>
                  <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
                    <p className="font-bold text-blue-300 mb-1">
                      CATÁFORA — Farol
                    </p>
                    <p className="text-zinc-200 italic">
                      "<span className="text-blue-300 font-bold">Isto</span> foi
                      anunciado: nova perfuração no pré-sal."
                    </p>
                    <p className="text-zinc-400 text-lg mt-1">
                      → 'Isto' antecipa 'nova perfuração no pré-sal' (futuro)
                    </p>
                  </div>
                </div>
              }
              variant="dark"
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Coesão e Coerência no Contexto Petrobras"
              variant={mv[1]}
            />
            <CardCarousel
              cards={[
                {
                  icone: "📄",
                  title: "Relatórios Técnicos",
                  descricao:
                    "Documentos como relatórios de segurança operacional exigem coesão referencial precisa — pronomes e conectivos ambíguos podem gerar falhas na interpretação de procedimentos críticos.",
                },
                {
                  icone: "📋",
                  title: "Normas e Regulamentos",
                  descricao:
                    "Textos normativos usam elipse e substituição para evitar repetições do sujeito institucional, mantendo a objetividade sem comprometer a clareza das obrigações.",
                },
                {
                  icone: "🗞️",
                  title: "Comunicados Oficiais",
                  descricao:
                    "Comunicados ao mercado e notas à imprensa dependem de coerência temática rigorosa: cada parágrafo deve progredir logicamente sem contradizer informações anteriores.",
                },
                {
                  icone: "📊",
                  title: "Editais de Concurso",
                  descricao:
                    "Os próprios editais da CESGRANRIO/Petrobras exemplificam o uso correto de catáfora em artigos como: 'Os candidatos deverão observar o seguinte: [lista de regras]'.",
                },
                {
                  icone: "🔬",
                  title: "Artigos Científicos",
                  descricao:
                    "A coesão lexical por hiperonímia é especialmente valorizada em textos de engenharia: 'equipamentos', 'sistemas', 'dispositivos' como hiperônimos de itens específicos.",
                },
              ]}
            />
            <AlertBox tipo="info" titulo="Estratégia CESGRANRIO">
              Questões de coesão na CESGRANRIO frequentemente apresentam um
              trecho e pedem qual pronome ou conectivo pode ser{" "}
              <strong>substituído sem alterar o sentido</strong>. Identifique
              sempre a relação semântica (retomada, oposição, causa) antes de
              escolher a alternativa.
            </AlertBox>
          </section>

          {/* ── CONSOLIDAÇÃO M1: LESSON TABS ── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
            <ModuleSectionHeader
              index={4}
              title="Consolidação: O Tecido do Texto"
              description="Sintetize os conceitos fundamentais antes do teste prático."
              variant={mv[1]}
            />

            <LessonTabs
              tabs={[
                {
                  id: "video",
                  label: "Vídeo Aula",
                  icone: LuPlay,
                  conteudo: (
                    <div className="aspect-video bg-zinc-900 rounded-xl flex flex-col items-center justify-center border border-zinc-800 relative overflow-hidden group cursor-pointer shadow-lg w-full max-w-3xl mx-auto">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-700"></div>
                      <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply"></div>
                      <div className="w-16 h-16 rounded-full bg-blue-600/90 flex items-center justify-center text-white backdrop-blur-sm group-hover:scale-110 group-hover:bg-blue-500 transition-all duration-300 shadow-xl shadow-blue-500/20 z-10 mb-4">
                        <LuPlay className="w-8 h-8 ml-1" />
                      </div>
                      <p className="text-blue-100 font-medium z-10 text-lg">
                        Assistir: Diferença Crítica na CESGRANRIO
                      </p>
                      <p className="text-blue-300/80 text-sm z-10 mt-1">
                        11:45 • Revisão Turbo
                      </p>
                    </div>
                  ),
                },
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icone: LuImage,
                  conteudo: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          type: "Conceito",
                          title: "Coesão vs Coerência",
                          placeholderColor: "bg-blue-500/20",
                        },
                        {
                          type: "Mecanismo",
                          title: "Retrovisor e Farol",
                          placeholderColor: "bg-cyan-500/20",
                        },
                        {
                          type: "Mecanismo",
                          title: "Substituição Lexical",
                          placeholderColor: "bg-emerald-500/20",
                        },
                      ]}
                    />
                  ),
                },
                {
                  id: "macetes",
                  label: "Macetes",
                  icone: LuZap,
                  conteudo: (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-blue-900 to-indigo-900 p-6 rounded-2xl shadow-lg border border-blue-700/50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                          <LuActivity className="w-24 h-24 text-white" />
                        </div>
                        <h3 className="text-blue-100 font-bold mb-4 flex items-center gap-2">
                          <LuZap className="text-amber-400" /> Macete: O Caminho
                          da Referência
                        </h3>
                        <ul className="space-y-3 text-blue-50/90 text-sm md:text-base relative z-10">
                          <li className="flex items-start gap-2">
                            <span className="text-amber-400 mt-1">✓</span>
                            <span>
                              Se a seta aponta para{" "}
                              <strong className="text-white">Trás</strong>:
                              Anáfora (Retrovisor).
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-400 mt-1">✓</span>
                            <span>
                              Se a seta aponta para{" "}
                              <strong className="text-white">Frente</strong>:
                              Catáfora (Farol).
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-400 mt-1">✓</span>
                            <span>
                              Se a seta aponta para{" "}
                              <strong className="text-white">Fora</strong>:
                              Exófora (Contexto Múndi).
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-card border border-border p-6 rounded-2xl flex flex-col justify-center items-center text-center space-y-4 shadow-sm">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center">
                          <LuLightbulb className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <p className="font-medium text-foreground">
                          A Regra de Ouro das Alternativas
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Nas questões de coesão, nunca busque apenas a palavra
                          semelhante. Substitua no texto e{" "}
                          <strong>leia o período inteiro</strong> para
                          certificar se o sentido lógico (coerência) sobreviveu
                          à troca (coesão).
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  id: "audio",
                  label: "Áudio",
                  icone: LuVolume2,
                  conteudo: (
                    <MusicPlayerCard
                      audioUrl="/audio/coesao-m1.mp3"
                      capaUrl="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=320&auto=format&fit=crop"
                      titulo="Podcast: O Fio Condutor"
                      artista="Prof. Fernando"
                      lyrics="Você abre o cadernão de gabaritos e lá vem ela.\nA primeira questão interpretativa...\nO candidato incauto procura o que parece bonito.\nNós, porém, procuramos o que a anáfora conectou."
                    />
                  ),
                },
              ]}
              variant={mv[1]}
            />
          </section>

          <QuizInterativo
            questoes={quizM1}
            titulo="QUIZ: O Tecido do Texto"
            icone="🎯"
            numero={5}
            variant={mv[1]}
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 2: O PODER DO RETROVISOR ──────────────────── */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <ModuleBanner
          numero={2}
          titulo="O Poder do Retrovisor"
          descricao="Domine a Anáfora: o recurso de retomar termos anteriores para evitar a repetição cansativa."
          variant={mv[2]}
        />

        <div className="space-y-[50px]">
          {/* ★ RICH INTRO: O Poder do Retrovisor */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-10">
            <ModuleSectionHeader
              index="INTRO"
              title="O Labirinto das Retomadas"
              description="Entenda como a anáfora economiza recursos cognitivos e evita a estagnação nos manuais técnicos da Petrobras."
              variant={mv[2]}
            />
            <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
              <p>
                Na <em>Moderna Gramática Portuguesa</em>,{" "}
                <strong>Evanildo Bechara</strong> define a anáfora como o mecanismo
                pelo qual um termo do texto <strong>remete a outro já mencionado
                anteriormente</strong>, criando uma cadeia de referência que economiza
                recursos cognitivos do leitor e evita a repetição mecânica. Funciona como
                o retrovisor de um veículo: permite olhar para trás sem perder o rumo da
                estrada à frente. Sem a anáfora, cada frase teria de repetir
                integralmente o substantivo ao qual se refere, tornando o texto técnico —
                tão comum nos relatórios da Petrobras — praticamente ilegível.
              </p>

              <p>
                Bechara classifica a retomada anafórica em três grandes tipos que a
                CESGRANRIO cobra sistematicamente. A{" "}
                <strong>anáfora pronominal</strong> é a mais frequente: pronomes pessoais
                (<em>ele, ela, eles</em>), demonstrativos (<em>esse, essa, isso</em>) e
                relativos (<em>que, o qual, cujo</em>) retomam o referente anterior sem
                repeti-lo. A <strong>anáfora sinonímica</strong> substitui o termo
                original por um sinônimo ou expressão equivalente — &quot;plataforma de
                extração&quot; retomada como &quot;unidade offshore&quot;. Já a{" "}
                <strong>anáfora epitética</strong> usa uma expressão caracterizadora no
                lugar do nome próprio: &quot;Rio de Janeiro&quot; vira &quot;a Cidade Maravilhosa&quot;,
                &quot;Petrobras&quot; vira &quot;a estatal brasileira de energia&quot;.
              </p>

              <p>
                O ponto crucial que Bechara destaca — e que a CESGRANRIO transforma em
                armadilha — é a <strong>concordância entre o pronome anafórico e seu
                antecedente</strong>. Quando o texto diz{" "}
                <em>&quot;As plataformas foram vistoriadas. Ela apresentou falhas&quot;</em>, há uma
                quebra de coerência referencial: o pronome &quot;ela&quot; (singular) não pode
                retomar &quot;plataformas&quot; (plural). A banca insere esse tipo de
                inconsistência nas alternativas de reescrita, esperando que o candidato
                desatento valide a troca sem perceber a ruptura numérica. Além disso, os
                pronomes demonstrativos seguem uma regra de ouro que Bechara sistematiza:
                {" "}<strong>&quot;ESSE/ESSA/ISSO&quot;</strong> são tipicamente anafóricos (olham para
                trás), enquanto <strong>&quot;ESTE/ESTA/ISTO&quot;</strong> tendem a ser catafóricos
                (preparam o que virá).
              </p>

              <p>
                No universo da <strong>Petrobras</strong>, a anáfora é a espinha dorsal da
                comunicação técnica. Um relatório de incidentes que diga{" "}
                <em>&quot;O equipamento de perfuração apresentou desgaste. O dispositivo foi
                recolhido para manutenção&quot;</em> usa anáfora sinonímica com precisão
                cirúrgica: &quot;o dispositivo&quot; retoma &quot;o equipamento de perfuração&quot; sem
                saturar o canal de comunicação. Nos boletins de segurança da estatal,
                onde a clareza pode salvar vidas, o domínio desse recurso é vital. A
                CESGRANRIO costuma extrair trechos reais de relatórios de inspeção,
                contratos de licitação e documentos regulatórios para testar se o
                candidato consegue identificar a cadeia referencial completa.
              </p>

              <p>
                A <strong>pegadinha clássica</strong> da banca neste tema envolve a{" "}
                <strong>ambiguidade referencial</strong>: quando há dois ou mais
                substantivos possíveis como antecedente, o pronome anafórico gera
                dúvida sobre a quem se refere. Na frase{" "}
                <em>&quot;O engenheiro informou ao gerente que ele seria transferido&quot;</em>,
                quem será transferido — o engenheiro ou o gerente? Bechara ensina que a
                solução passa pela reestruturação sintática, e a CESGRANRIO explora
                exatamente esse fenômeno ao pedir reescritas que eliminem a ambiguidade
                sem alterar o sentido original.
              </p>

              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 rounded-lg border border-cyan-200 dark:border-cyan-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground flex items-center gap-2">
                  🔄 Mapa Anafórico — Tipos e Sinais
                </h4>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li><strong>Pronominal</strong> — &quot;ele&quot;, &quot;essa&quot;, &quot;o qual&quot; → retomam o substantivo anterior diretamente.</li>
                  <li><strong>Sinonímica</strong> — substitui por sinônimo ou equivalente: &quot;petróleo&quot; → &quot;o hidrocarboneto&quot;.</li>
                  <li><strong>Epitética</strong> — usa expressão caracterizadora: &quot;Petrobras&quot; → &quot;a estatal brasileira&quot;.</li>
                  <li><strong>Regra ESSE vs ESTE</strong> — &quot;Esse/Isso&quot; = olha para trás (anáfora). &quot;Este/Isto&quot; = olha para frente (catáfora).</li>
                </ul>
              </div>
            </div>

            <QuizDiagnostic
              title="Teste de Antecedência"
              question="Ao ler: 'A refinaria foi inspecionada. **Ela** apresentou falhas', o pronome 'Ela' exerce qual função segundo no Padrão Bechara?"
              options={[
                "Catáfora, pois aponta para o que será dito.",
                "Anáfora, pois retoma um substantivo já mencionado.",
                "Elipse, pois o sujeito foi omitido parcialmente.",
                "Deixe de lado, pois não há conexão clara.",
              ]}
              correctAnswer={1}
              explanation="Correto! 'Ela' é um elemento anafórico que retoma 'A refinaria', evitando a repetição e mantendo a coesão referencial."
              variant={mv[2]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Mecânica da Anáfora (Retrovisor)"
              description="A arte de fazer o texto avançar enquanto olha para trás."
              variant={mv[2]}
            />
            <ContentAccordion
              mode="stacked"
              slides={[
                {
                  titulo: "O Conceito de Retomada",
                  icone: <LuCompass />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed text-justify">
                        Anáfora (do grego <i>ana</i> = atrás) é o fenômeno em
                        que um termo aponta para outro já citado (o
                        antecedente). Funciona como a memória de curto prazo do
                        leitor. Segundo a preceptiva de Bechara, a anáfora
                        economiza caracteres e acelera a leitura.
                      </p>
                      <div className="p-4 bg-cyan-500/10 rounded-xl border-l-4 border-cyan-500 font-medium">
                        "A plataforma{" "}
                        <strong className="text-cyan-700 dark:text-cyan-400">
                          P-70
                        </strong>{" "}
                        começou a operar.{" "}
                        <strong className="text-cyan-700 dark:text-cyan-400 underline">
                          ELA
                        </strong>{" "}
                        adicionará 150 mil barris ao dia."
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Táticas Lexicais vs Pronominais",
                  icone: <LuLibrary />,
                  conteudo: (
                    <CardCarousel
                      cards={[
                        {
                          icone: "👤",
                          title: "Retomada Pronominal",
                          descricao:
                            "O uso clássico de pronomes (ele, o qual, esse). A CESGRANRIO gosta de perguntar qual substantivo o 'que' ou 'o qual' está retomando.",
                        },
                        {
                          icone: "🔄",
                          title: "Retomada Sinonímica",
                          descricao:
                            "Substituição por sinônimos para evitar repetição (Petróleo -> Óleo Cru). Garante coesão elevando o padrão vocabular.",
                        },
                        {
                          icone: "📦",
                          title: "O Uso de Termos-Síntese",
                          descricao:
                            "Palavras superordenadas que encapsulam a ideia anterior inteira (Ex: 'Todo esse processo...', 'Com esta medida...').",
                        },
                      ]}
                    />
                  ),
                },
              ]}
            />
            <AlertBox
              tipo="warning"
              titulo="Armadilha CESGRANRIO: Esse vs Este"
            >
              A gramática normativa afirma que <strong>ESSE</strong> (com ss)
              olha para trás (é{" "}
              <strong className="text-destructive">Anáforo</strong>) retomando o
              que você acabou de escrever, enquanto <strong>ESTE</strong> (com
              st) aponta para frente ou para algo imediato. Domine o uso dos SS!
            </AlertBox>
          </section>

          {/* ── CONSOLIDAÇÃO M2: LESSON TABS ── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
            <ModuleSectionHeader
              index={2}
              title="Consolidação: O Poder do Retrovisor"
              description="Acesse o resumo visual e o macete de anáfora."
              variant={mv[2]}
            />

            <LessonTabs
              tabs={[
                {
                  id: "video",
                  label: "Vídeo Aula",
                  icone: LuPlay,
                  conteudo: (
                    <div className="aspect-video bg-zinc-900 rounded-xl flex flex-col items-center justify-center border border-zinc-800 relative overflow-hidden group cursor-pointer shadow-lg w-full max-w-3xl mx-auto">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579227114347-15d08fc37cae?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-700"></div>
                      <div className="absolute inset-0 bg-cyan-900/40 mix-blend-multiply"></div>
                      <div className="w-16 h-16 rounded-full bg-cyan-600/90 flex items-center justify-center text-white backdrop-blur-sm group-hover:scale-110 group-hover:bg-cyan-500 transition-all duration-300 shadow-xl shadow-cyan-500/20 z-10 mb-4">
                        <LuPlay className="w-8 h-8 ml-1" />
                      </div>
                      <p className="text-cyan-100 font-medium z-10 text-lg">
                        Assistir: Identificando o Referente
                      </p>
                    </div>
                  ),
                },
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icone: LuImage,
                  conteudo: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          type: "Conceito",
                          title: "Retomada Anafórica",
                          placeholderColor: "bg-cyan-500/20",
                        },
                        {
                          type: "Atenção",
                          title: "Regra do SS",
                          placeholderColor: "bg-blue-500/20",
                        },
                      ]}
                    />
                  ),
                },
                {
                  id: "macetes",
                  label: "Macetes",
                  icone: LuZap,
                  conteudo: (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-cyan-900 to-slate-900 p-6 rounded-2xl shadow-lg border border-cyan-700/50">
                        <h3 className="text-cyan-100 font-bold mb-4">
                          E<strong className="text-white">SS</strong>E = PA
                          <strong className="text-white">SS</strong>ADO
                        </h3>
                        <p className="text-cyan-50/90 text-sm">
                          Na leitura de textos complexos, se encontrar algo como
                          'desse', 'nesses' ou 'isso', volte as linhas. O
                          elemento citado reside no passado da leitura.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  id: "audio",
                  label: "Áudio",
                  icone: LuVolume2,
                  conteudo: (
                    <MusicPlayerCard
                      audioUrl="/audio/coesao-m2.mp3"
                      titulo="Pílula: Voltando no Tempo"
                      artista="Prof. Fernando"
                      lyrics="A anáfora salva o texto da repetição crônica. Mas pode gerar ambiguidade se mal amarrada."
                    />
                  ),
                },
              ]}
              variant="cyan"
            />
          </section>

          <QuizInterativo
            questoes={quizM2}
            titulo="QUIZ: O Poder do Retrovisor"
            icone="🎯"
            numero={3}
            variant={mv[2]}
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 3: O FAROL DO SENTIDO ─────────────────────── */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <ModuleBanner
          numero={3}
          titulo="O Farol do Sentido"
          descricao="A Catáfora prepara o leitor para o que virá. Aprenda a antecipar ideias com elegância."
          variant={mv[3]}
        />

        <div className="space-y-[50px]">
          {/* ★ RICH INTRO: O Farol do Sentido */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-10">
            <ModuleSectionHeader
              index="INTRO"
              title="A Iluminação Catafórica: O Farol do Texto"
              description="Domine o mecanismo de antecipação que Evanildo Bechara classifica como a remissão 'para diante', essencial na clareza de informativos técnicos."
              variant={mv[3]}
            />
            <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
              <p>
                Se a anáfora é o retrovisor do texto, a <strong>catáfora</strong> é o
                farol alto de uma embarcação em alto-mar: ela projeta luz sobre o que
                ainda não foi dito, criando um <strong>vácuo semântico
                proposital</strong> que força o leitor a avançar para preencher o
                significado. <strong>Evanildo Bechara</strong>, na{" "}
                <em>Moderna Gramática Portuguesa</em>, classifica a catáfora como a{" "}
                <strong>remissão &quot;para diante&quot;</strong> — um recurso coesivo em que o
                termo referente aparece <em>depois</em> do elemento que o anuncia. Essa
                inversão da ordem natural (primeiro o referente, depois a retomada)
                produz um efeito de suspense controlado que a CESGRANRIO explora
                intensamente nas provas da Petrobras.
              </p>

              <p>
                O mecanismo catafórico mais frequente na língua portuguesa — e o mais
                cobrado pela banca — é o uso dos <strong>pronomes demonstrativos
                &quot;ESTE&quot;, &quot;ESTA&quot; e &quot;ISTO&quot;</strong> seguidos de dois-pontos. Bechara
                sistematiza essa regra com clareza: enquanto &quot;esse/essa/isso&quot; olham para
                trás (função anafórica), &quot;este/esta/isto&quot; olham para frente (função
                catafórica). Na frase <em>&quot;O candidato deverá observar{" "}
                <strong>isto</strong>: as normas de segurança da Petrobras são
                inegociáveis&quot;</em>, o pronome &quot;isto&quot; antecipa a regra que será
                enunciada após os dois-pontos. Esse padrão{" "}
                <strong>pronome demonstrativo + dois-pontos + conteúdo</strong> é a
                estrutura catafórica canônica que aparece em 80% das questões da
                CESGRANRIO sobre o tema.
              </p>

              <p>
                Além dos pronomes demonstrativos, Bechara identifica outros{" "}
                <strong>marcadores catafóricos</strong> que a banca utiliza. Expressões
                como <em>&quot;a seguinte medida&quot;</em>,{" "}
                <em>&quot;os pontos abaixo enumerados&quot;</em> e{" "}
                <em>&quot;tal procedimento&quot;</em> (quando &quot;tal&quot; antecipa algo que será
                detalhado) funcionam como sinalizadores de que a informação essencial
                virá logo adiante. Nos textos da Petrobras, esse recurso é
                especialmente útil em normas técnicas e comunicados internos, onde a
                clareza na enumeração de procedimentos é questão de segurança
                operacional. Um manual que diga <em>&quot;Observe as{" "}
                <strong>seguintes</strong> precauções: (1) verificar a pressão do duto;
                (2) inspecionar as válvulas de segurança&quot;</em> emprega catáfora para
                organizar a informação de forma hierárquica e inequívoca.
              </p>

              <p>
                No contexto dos concursos da <strong>Petrobras</strong>, a catáfora
                aparece com frequência em textos de editais, contratos de licitação e
                relatórios de compliance. A CESGRANRIO costuma apresentar um trecho
                oficial da estatal e perguntar qual o referente de um pronome
                demonstrativo catafórico, ou pedir a reescrita de uma passagem
                substituindo a catáfora por uma construção direta. O candidato precisa
                entender que, ao eliminar a catáfora, o texto perde o efeito de{" "}
                <strong>suspense organizacional</strong> — a informação chega sem
                preparação prévia —, mas ganha em objetividade. Saber avaliar essa
                troca é competência testada nas questões de equivalência semântica.
              </p>

              <p>
                A <strong>pegadinha clássica</strong> da banca envolve a confusão entre
                catáfora e anáfora em frases com &quot;aquele... este&quot;. Na construção{" "}
                <em>&quot;Pedro e Paulo chegaram; <strong>aquele</strong>, cansado;{" "}
                <strong>este</strong>, animado&quot;</em>, muitos candidatos marcam &quot;este&quot;
                como catafórico. No entanto, Bechara explica que, nesse caso, tanto
                &quot;aquele&quot; quanto &quot;este&quot; são <strong>anafóricos</strong>: ambos retomam
                termos já mencionados (&quot;Pedro&quot; e &quot;Paulo&quot;). A catáfora legítima exige
                que o referente ainda <strong>não tenha sido apresentado</strong> — essa
                é a distinção que separa os candidatos comuns dos aprovados.
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-950/30 dark:to-sky-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground flex items-center gap-2">
                  🔦 Detector Catafórico — Checklist Rápido
                </h4>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li><strong>ESTE/ESTA/ISTO + dois-pontos</strong> → catáfora canônica. O referente vem DEPOIS.</li>
                  <li><strong>&quot;o seguinte&quot;, &quot;tais medidas&quot;</strong> → marcadores catafóricos em textos normativos.</li>
                  <li><strong>&quot;aquele... este&quot;</strong> em sequência → AMBOS são anafóricos (retomam termos já citados).</li>
                  <li><strong>Teste de eliminação</strong> — Se remover o pronome e antecipar o conteúdo, o sentido se mantém? Então era catáfora.</li>
                </ul>
              </div>
            </div>

            <QuizDiagnostic
              title="Diagnóstico de Antecipação"
              question="Em qual das sentenças abaixo ocorre um processo legítimo de catáfora?"
              options={[
                "A sonda parou; ela precisa de manutenção.",
                "O plano é este: dobrar a produção de gás no pré-sal.",
                "Pedro e Paulo chegaram; aquele, cansado; este, animado.",
                "A Petrobras, embora gigante, foca na sustentabilidade.",
              ]}
              correctAnswer={1}
              explanation="Excelente! 'Este' é um pronome catafórico típico, pois aponta para a informação que ainda será apresentada (dobrar a produção)."
              variant={mv[3]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Mecânica da Catáfora (Farol)"
              description="A arte de criar expectativa apontando para o que ainda será dito."
              variant={mv[3]}
            />
            <ContentAccordion
              mode="stacked"
              slides={[
                {
                  titulo: "O Sentido de Antecipação",
                  icone: <LuCompass />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base text-justify">
                        A <strong>Catáfora</strong> (do grego <i>kata</i> = para
                        a frente) é o farol do texto. Segundo a moderna
                        gramática de Bechara, é a remissão para diante. Ela cria
                        um vácuo de sentido proposital que obriga o leitor a
                        avançar na leitura para encontrar a resolução.
                      </p>
                      <div className="p-4 bg-blue-500/10 rounded-xl border-l-4 border-blue-500 font-medium">
                        "Meu objetivo na Petrobras é{" "}
                        <strong className="text-blue-700 dark:text-blue-400 underline">
                          ESTE
                        </strong>
                        :{" "}
                        <span className="text-foreground">
                          garantir a segurança das operações
                        </span>
                        ."
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "O Sinal do 'T' e os Dois Pontos",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm md:text-base text-muted-foreground text-justify">
                        Na sintaxe, a catáfora frequentemente 'pede' um sinal de
                        pontuação delimitativo. A banca adora explorar a
                        justificativa para o uso de dois-pontos logo após um
                        pronome catafórico.
                      </p>
                      <div className="p-6 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-center italic text-xl font-bold flex flex-col gap-2">
                        <span>
                          Es
                          <strong className="text-emerald-600 dark:text-emerald-400 underline text-2xl">
                            T
                          </strong>
                          e
                        </span>
                        <span>
                          Es
                          <strong className="text-emerald-600 dark:text-emerald-400 underline text-2xl">
                            T
                          </strong>
                          a
                        </span>
                        <span>
                          Is
                          <strong className="text-emerald-600 dark:text-emerald-400 underline text-2xl">
                            T
                          </strong>
                          o
                        </span>
                      </div>
                      <p className="text-base md:text-lg text-center pt-2 text-foreground/90 font-medium">
                        O "T" aponta para a <strong>T</strong>extura que vem
                        logo à frent
                        <strong className="text-emerald-600">T</strong>e.
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          {/* ── CONSOLIDAÇÃO M3: LESSON TABS ── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
            <ModuleSectionHeader
              index={2}
              title="Consolidação: O Farol do Sentido"
              description="Acesse o resumo visual e os macetes de antecipação catafórica."
              variant="emerald"
            />

            <LessonTabs
              tabs={[
                {
                  id: "video",
                  label: "Vídeo Aula",
                  icone: LuPlay,
                  conteudo: (
                    <div className="aspect-video bg-zinc-900 rounded-xl flex flex-col items-center justify-center border border-zinc-800 relative overflow-hidden group cursor-pointer shadow-lg w-full max-w-3xl mx-auto">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-700"></div>
                      <div className="absolute inset-0 bg-emerald-900/40 mix-blend-multiply"></div>
                      <div className="w-16 h-16 rounded-full bg-emerald-600/90 flex items-center justify-center text-white backdrop-blur-sm group-hover:scale-110 group-hover:bg-emerald-500 transition-all duration-300 shadow-xl shadow-emerald-500/20 z-10 mb-4">
                        <LuPlay className="w-8 h-8 ml-1" />
                      </div>
                      <p className="text-emerald-100 font-medium z-10 text-lg">
                        Assistir: Catáfora e Pontuação
                      </p>
                    </div>
                  ),
                },
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icone: LuImage,
                  conteudo: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          type: "Conceito",
                          title: "Mecanismo Farol (Catáfora)",
                          placeholderColor: "bg-emerald-500/20",
                        },
                        {
                          type: "Aplicação",
                          title: "Sintaxe dos Dois-Pontos",
                          placeholderColor: "bg-teal-500/20",
                        },
                      ]}
                    />
                  ),
                },
                {
                  id: "macetes",
                  label: "Macetes",
                  icone: LuZap,
                  conteudo: (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-emerald-900 to-slate-900 p-6 rounded-2xl shadow-lg border border-emerald-700/50">
                        <h3 className="text-emerald-100 font-bold mb-4">
                          E<strong className="text-white">ST</strong>E = O QUE E
                          <strong className="text-white">ST</strong>Á POR VIR
                        </h3>
                        <p className="text-emerald-50/90 text-sm">
                          Use o ST para ligar ao FU
                          <strong className="text-emerald-400">T</strong>URO. A
                          Catáfora gera tensão no parágrafo, pois o leitor
                          precisa da informação complementar.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  id: "audio",
                  label: "Áudio",
                  icone: LuVolume2,
                  conteudo: (
                    <MusicPlayerCard
                      audioUrl="/audio/coesao-m3.mp3"
                      titulo="Pílula: Sussurrando o Futuro"
                      artista="Prof. Fernando"
                      lyrics="A catáfora é como um trailer de filme: ela te prende exigindo que você veja o que vai acontecer."
                    />
                  ),
                },
              ]}
              variant="emerald"
            />
          </section>

          <QuizInterativo
            questoes={quizM3}
            titulo="QUIZ: O Farol do Sentido"
            icone="🎯"
            numero={3}
            variant={mv[3]}
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 4: O SILÊNCIO ELOQUENTE ────────────────────── */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner
          numero={4}
          titulo="O Silêncio Eloquente"
          descricao="Às vezes, não dizer nada é a melhor forma de conectar. Domine Elipse e Zêugma."
          variant={mv[4]}
        />

        <div className="space-y-[50px]">
          {/* ★ RICH INTRO: O Silêncio Eloquente */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-10">
            <ModuleSectionHeader
              index="INTRO"
              title="O Silêncio Eloquente: Elipse e Zêugma"
              description="Descubra como a omissão estratégica de termos pode tornar o texto mais fluido e elegante, sem comprometer o rigor do Padrão Bechara."
              variant={mv[4]}
            />
            <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
              <p>
                Na tradição gramatical brasileira sistematizada por{" "}
                <strong>Evanildo Bechara</strong>, a <strong>elipse</strong> é definida
                como a <strong>omissão de um termo que pode ser facilmente
                recuperado</strong> pelo contexto sintático ou semântico. Diferente do
                erro de construção — em que a falta de um elemento gera ambiguidade ou
                incompreensão —, a elipse é uma estratégia deliberada de economia
                textual que torna o discurso mais fluido e elegante. É a lei do menor
                esforço aplicada à máxima eficácia comunicativa: o autor confia na
                inteligência do leitor para preencher o vazio, e o leitor aceita esse
                pacto implícito porque o contexto fornece todas as pistas necessárias.
              </p>

              <p>
                Bechara distingue a elipse geral — omissão de qualquer termo recuperável
                (sujeito, verbo, complemento) — de uma forma específica e sofisticada: o{" "}
                <strong>zeugma</strong>. No zeugma, o termo omitido é exatamente aquele
                que <strong>já apareceu em uma oração anterior</strong>. Na frase{" "}
                <em>&quot;A sonda Sigma perfurou a camada de sal; a sonda Beta, a de
                petróleo&quot;</em>, o verbo &quot;perfurou&quot; foi omitido na segunda oração porque
                já foi expresso na primeira — isso é zeugma. Se o termo omitido nunca
                tivesse aparecido antes no texto, seria apenas elipse simples. Essa
                distinção é fundamental porque a CESGRANRIO cobra a nomenclatura com
                precisão: trocar &quot;zeugma&quot; por &quot;elipse&quot; (ou vice-versa) pode significar a
                diferença entre o acerto e o erro na questão.
              </p>

              <p>
                O maior <strong>sinal gráfico</strong> de que um zeugma está em ação é
                a chamada <strong>vírgula vicária</strong> — a vírgula que substitui o
                verbo omitido. Bechara a classifica como um recurso estilístico de alta
                elegância na norma culta. Quando o texto diz{" "}
                <em>&quot;A Petrobras foca em inovação; as operadoras privadas<strong>
                ,</strong> em lucro imediato&quot;</em>, a vírgula após &quot;privadas&quot; ocupa o
                lugar do verbo &quot;foca&quot;, que já apareceu na primeira oração. Nos editais
                da CESGRANRIO para a Petrobras, esse padrão é testado sob a rubrica
                &quot;pontuação e coesão&quot; — o candidato deve entender que remover essa
                vírgula cria um erro de construção, e que sua presença é obrigatória
                para sinalizar a omissão do verbo.
              </p>

              <p>
                No universo da <strong>Petrobras</strong>, a elipse e o zeugma
                aparecem com frequência em relatórios de perfuração, laudos de
                inspeção e comunicados de segurança. Um documento técnico que diga{" "}
                <em>&quot;A equipe A inspecionou o duto principal; a equipe B, os
                ramais secundários; a equipe C, as válvulas de segurança&quot;</em> emprega
                zeugma triplo para evitar a repetição cansativa do verbo
                &quot;inspecionou&quot;, criando um parágrafo dinâmico e profissional. A
                CESGRANRIO costuma extrair trechos exatamente assim — com estruturas
                paralelas e verbos omitidos — e perguntar qual o recurso coesivo
                empregado, ou pedir a reescrita explicitando todos os termos suprimidos.
              </p>

              <p>
                A <strong>pegadinha mais perigosa</strong> da banca neste tema é
                confundir <strong>elipse legítima</strong> com{" "}
                <strong>erro de construção</strong>. Bechara adverte que a elipse só é
                válida quando o termo omitido é <em>inequivocamente</em> recuperável. Se
                a frase <em>&quot;Foram inspecionados os dutos e as válvulas. Apresentaram
                corrosão&quot;</em> gera dúvida sobre o sujeito de &quot;apresentaram&quot; (os dutos?
                as válvulas? ambos?), não se trata de elipse estratégica, mas de{" "}
                <strong>ambiguidade sintática</strong> — um defeito textual que a
                CESGRANRIO classifica como incoerência referencial. O candidato de elite
                sabe diferenciar o silêncio eloquente do silêncio confuso.
              </p>

              <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 rounded-lg border border-rose-200 dark:border-rose-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground flex items-center gap-2">
                  ☁️ Elipse vs Zeugma — Guia de Identificação
                </h4>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li><strong>Elipse</strong> — Omissão de qualquer termo recuperável pelo contexto (sujeito, verbo, complemento).</li>
                  <li><strong>Zeugma</strong> — Omissão específica de um termo que <em>já apareceu antes</em> no texto.</li>
                  <li><strong>Vírgula vicária</strong> — A vírgula que substitui o verbo omitido é o sinal gráfico do zeugma.</li>
                  <li><strong>Teste de validade</strong> — Se recolocar o termo omitido e o sentido não muda, a elipse é legítima. Se gera ambiguidade, é erro.</li>
                </ul>
              </div>
            </div>

            <QuizDiagnostic
              title="Desafio do Termo Invisível"
              question="Analise: 'A Petrobras foca em inovação; as operadoras privadas, em lucro imediato.' Qual figura de coesão ocorre na segunda oração?"
              options={[
                "Elipse, pois o sujeito foi mantido.",
                "Zêugma, pois o verbo 'foca' foi omitido após já ter aparecido.",
                "Anáfora, pois o termo 'Petrobras' é retomado.",
                "Catáfora, pois antecipa o lucro privado.",
              ]}
              correctAnswer={1}
              explanation="Perfeito! O Zêugma é uma forma de elipse que omite um termo já expresso anteriormente ('foca')."
              variant={mv[4]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Coesão por Omissão (Elipse e Zêugma)"
              description="A elegância sintática de não repetir. A força do silêncio estrutural."
              variant={mv[4]}
            />
            <ContentAccordion
              mode="stacked"
              slides={[
                {
                  titulo: "O Poder Sintático da Elipse",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm md:text-base text-justify leading-relaxed">
                        A elipse (do grego <i>élleipsis</i>, falta) é o
                        apagamento intencional de um termo dedutível pelo
                        contexto. Na engenharia do texto da CESGRANRIO, a
                        supressão do sujeito explícito ("nós", "eu") força as
                        terminações verbais a conectarem o sentido.
                      </p>
                      <p className="p-4 bg-rose-500/10 rounded-xl border-l-4 border-rose-500 font-mono text-sm md:text-base italic text-foreground">
                        "
                        <strong className="text-rose-600 dark:text-rose-400 opacity-50">
                          [Nós]
                        </strong>{" "}
                        Operamos a sonda ontem e{" "}
                        <strong className="text-rose-600 dark:text-rose-400 opacity-50">
                          [Nós]
                        </strong>{" "}
                        atingimos a cota."
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "A Precisão do Zêugma",
                  icone: <LuAnchor />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm md:text-base text-justify leading-relaxed">
                        Enquanto a elipse omite um termo subentendido, o{" "}
                        <strong>Zêugma</strong> omite um termo que{" "}
                        <strong>já foi grafado anteriormente</strong> no texto.
                        Ele é a ponte invisível ("cola estrutural") que evita
                        repetições monótonas em sentenças coordenadas.
                      </p>
                      <p className="p-4 bg-rose-500/10 rounded-xl border-l-4 border-rose-500 font-mono text-sm md:text-base italic text-foreground">
                        "O setor de extração{" "}
                        <strong className="text-rose-600 dark:text-rose-400">
                          cresceu
                        </strong>{" "}
                        10%; o de refino,{" "}
                        <strong className="text-rose-600 dark:text-rose-400 opacity-50">
                          [cresceu]
                        </strong>{" "}
                        5%."
                      </p>
                    </div>
                  ),
                },
              ]}
            />
            <AlertBox
              tipo="warning"
              titulo="Vírgula Vicária (O fantasma do verbo)"
            >
              A CESGRANRIO quase sempre cruza Coesão e Pontuação em questões de
              Zêugma. O termo omitido costuma ser marcado por uma{" "}
              <strong className="text-destructive font-black">
                vírgula vicária
              </strong>{" "}
              (substituta). A ausência dessa vírgula na retomada gera erro fatal
              nas provas objetivas!
            </AlertBox>
          </section>

          {/* ── CONSOLIDAÇÃO M4: LESSON TABS ── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
            <ModuleSectionHeader
              index={2}
              title="Consolidação: O Silêncio Eloquente"
              description="Acesse o resumo visual e os macetes de elipse e zêugma."
              variant="rose"
            />

            <LessonTabs
              tabs={[
                {
                  id: "video",
                  label: "Vídeo Aula",
                  icone: LuPlay,
                  conteudo: (
                    <div className="aspect-video bg-zinc-900 rounded-xl flex flex-col items-center justify-center border border-zinc-800 relative overflow-hidden group cursor-pointer shadow-lg w-full max-w-3xl mx-auto">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518330752174-a03be8159b9e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-700"></div>
                      <div className="absolute inset-0 bg-rose-900/40 mix-blend-multiply"></div>
                      <div className="w-16 h-16 rounded-full bg-rose-600/90 flex items-center justify-center text-white backdrop-blur-sm group-hover:scale-110 group-hover:bg-rose-500 transition-all duration-300 shadow-xl shadow-rose-500/20 z-10 mb-4">
                        <LuPlay className="w-8 h-8 ml-1" />
                      </div>
                      <p className="text-rose-100 font-medium z-10 text-lg">
                        Assistir: Identificando a Omissão
                      </p>
                    </div>
                  ),
                },
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icone: LuImage,
                  conteudo: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          type: "Conceito",
                          title: "Elipse vs Zêugma",
                          placeholderColor: "bg-rose-500/20",
                        },
                        {
                          type: "Atenção",
                          title: "Vírgula Vicária",
                          placeholderColor: "bg-pink-500/20",
                        },
                      ]}
                    />
                  ),
                },
                {
                  id: "macetes",
                  label: "Macetes",
                  icone: LuZap,
                  conteudo: (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-rose-900 to-slate-900 p-6 rounded-2xl shadow-lg border border-rose-700/50">
                        <h3 className="text-rose-100 font-bold mb-4">
                          E<strong className="text-white">L/Z</strong> =
                          Escondido, mas Óbvio
                        </h3>
                        <p className="text-rose-50/90 text-sm">
                          Elipse = Termo Inédito mas implícito (ex: sujeito
                          oculto). Zêugma = Termo Reciclado (já apareceu antes).
                          Ambas constroem uma trama textual elegante que escapa
                          do leitor inexperiente.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  id: "audio",
                  label: "Áudio",
                  icone: LuVolume2,
                  conteudo: (
                    <MusicPlayerCard
                      audioUrl="/audio/coesao-m4.mp3"
                      titulo="Pílula: O Silêncio Concha"
                      artista="Prof. Fernando"
                      lyrics="Quando retiramos o que sobra, destacamos o que importa. A vírgula conta a história do verbo extinto."
                    />
                  ),
                },
              ]}
              variant="rose"
            />
          </section>

          <QuizInterativo
            questoes={quizM4}
            titulo="QUIZ: O Silêncio Eloquente"
            icone="🎯"
            numero={3}
            variant={mv[4]}
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 5: SUBSTITUIÇÕES DE ELITE ───────────────────── */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="Substituições de Elite"
          descricao="Nominalização, Hiperonímia e Palavras-Sumário: o arsenal avançado de coesão lexical."
          variant={mv[5]}
        />

        <div className="space-y-[50px]">
          {/* ★ RICH INTRO: Substituições de Elite */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-10">
            <ModuleSectionHeader
              index="INTRO"
              title="Substituições de Elite: A Engenharia Lexical"
              description="Aprenda a elevar o nível do seu texto usando a 'reiteração por hiperonímia' e as 'palavras-sumário', recursos de prestígio no Padrão Bechara."
              variant={mv[5]}
            />
            <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
              <p>
                <strong>Evanildo Bechara</strong> ensina que a{" "}
                <strong>coesão lexical</strong> é o recurso pelo qual o autor substitui
                um termo já mencionado por outro de campo semântico equivalente, evitando
                a repetição mecânica sem sacrificar a clareza referencial. Diferente da
                coesão referencial (pronomes e demonstrativos), a coesão lexical opera no
                plano do <strong>vocabulário</strong>: trocar palavras por sinônimos,
                hiperônimos, hipônimos ou expressões nominalizadas. Para Bechara, esse
                mecanismo é um indicador de <strong>maturidade intelectual</strong> do
                autor, pois exige domínio amplo do léxico e sensibilidade ao contexto. Na
                escrita técnica da Petrobras, onde a precisão terminológica é
                inegociável, a coesão lexical é ferramenta de trabalho diária.
              </p>

              <p>
                O recurso mais sofisticado dentro da coesão lexical é a{" "}
                <strong>hiperonímia</strong> — a substituição de um termo específico
                (hipônimo) por um termo genérico (hiperônimo). Nos relatórios da
                Petrobras, em vez de repetir &quot;plataforma de extração de petróleo&quot; dez
                vezes, o redator técnico emprega termos como &quot;unidade offshore&quot;, &quot;ativo
                de produção&quot; ou simplesmente &quot;a instalação&quot;. Bechara adverte, porém, que
                a troca só é legítima quando o hiperônimo <strong>preserva o sentido
                original</strong> sem gerar ambiguidade. Trocar &quot;petróleo&quot; por
                &quot;combustível fóssil&quot; é hiperonímia válida; trocar &quot;petróleo&quot; por
                &quot;recurso natural&quot; já amplia demais o campo semântico e pode incluir
                água, minérios ou madeira — gerando imprecisão inadmissível em contexto
                técnico.
              </p>

              <p>
                Outro pilar da coesão lexical que Bechara destaca é a{" "}
                <strong>nominalização</strong>: a transformação de um verbo ou adjetivo em
                substantivo para retomar a ação descrita. Na frase{" "}
                <em>&quot;A plataforma operou bem. A <strong>operação</strong> garantiu o
                recorde de produção&quot;</em>, o substantivo &quot;operação&quot; retoma o verbo
                &quot;operou&quot; de forma elegante e coesa. A CESGRANRIO testa esse recurso
                pedindo que o candidato identifique a relação entre o verbo e o
                substantivo derivado, ou que avalie se a nominalização manteve a
                equivalência semântica. Há também as{" "}
                <strong>palavras-sumário</strong> — termos que condensam uma ideia
                inteira expressa anteriormente: &quot;essa situação&quot;, &quot;tal cenário&quot;, &quot;o
                referido problema&quot; são exemplos frequentes em textos da estatal.
              </p>

              <p>
                No contexto da <strong>Petrobras</strong>, a coesão lexical é
                especialmente crítica em documentos que passam por múltiplos revisores e
                setores. Um contrato de licitação que se refira ao mesmo equipamento como
                &quot;a sonda&quot;, &quot;o equipamento de perfuração&quot;, &quot;o dispositivo&quot; e &quot;a
                máquina&quot; ao longo de suas páginas está empregando coesão lexical
                variada — mas precisa garantir que todos esses termos remetam
                inequivocamente ao mesmo referente. A CESGRANRIO costuma apresentar
                trechos assim e perguntar se a substituição lexical <strong>preservou
                ou alterou</strong> o sentido do texto, testando a capacidade do
                candidato de avaliar equivalência semântica em contexto.
              </p>

              <p>
                A <strong>pegadinha refinada</strong> que a banca aplica envolve a{" "}
                <strong>falsa sinonímia</strong>. Trocar &quot;plataforma continental&quot; por
                &quot;plataforma de petróleo&quot; pode parecer uma substituição válida, mas
                Bechara alerta que são conceitos completamente distintos: a primeira é um
                acidente geográfico, a segunda é uma estrutura industrial. A CESGRANRIO
                insere alternativas com trocas lexicais aparentemente inofensivas que, na
                verdade, alteram o referente ou o campo semântico. O candidato de elite
                sabe que <strong>nem todo hiperônimo é válido</strong> — a substituição
                precisa respeitar o contexto pragmático do texto original.
              </p>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-lg border border-amber-200 dark:border-amber-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground flex items-center gap-2">
                  🔍 Arsenal Lexical — Mecanismos de Substituição
                </h4>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li><strong>Hiperonímia</strong> — Específico → Genérico: &quot;gasolina&quot; → &quot;combustível&quot;.</li>
                  <li><strong>Hiponímia</strong> — Genérico → Específico: &quot;embarcação&quot; → &quot;navio-sonda&quot;.</li>
                  <li><strong>Nominalização</strong> — Verbo → Substantivo: &quot;extraíram&quot; → &quot;a extração&quot;.</li>
                  <li><strong>Palavras-sumário</strong> — Condensam ideia anterior: &quot;esse cenário&quot;, &quot;tal problema&quot;.</li>
                  <li><strong>Teste de validade</strong> — Substituiu e o referente mudou? Então NÃO é coesão — é erro.</li>
                </ul>
              </div>
            </div>

            <QuizDiagnostic
              title="Diagnóstico Lexical"
              question="Ao trocar 'petróleo' por 'combustível fóssil', qual processo de coesão está sendo aplicado prioritariamente?"
              options={[
                "Catáfora, pois o petróleo é o futuro.",
                "Sinonímia perfeita, sem mudança de categoria.",
                "Hiperonímia, pois o novo termo é mais abrangente.",
                "Elipse, pois houve supressão do termo original.",
              ]}
              correctAnswer={2}
              explanation="Exato! 'Combustível fóssil' é um hiperônimo de 'petróleo', englobando-o em uma categoria superior e mantendo a coesão por reiteração."
              variant={mv[5]}
            />
          </section>
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Matriz da Coesão Lexical"
              description="A arte de manter o tema orbitando através de sinônimos, nomes genéricos e nominalizações."
              variant={mv[5]}
            />
            <ContentAccordion
              mode="stacked"
              slides={[
                {
                  titulo: "Nominalização: A Engenharia do Verbo que Vira Nome",
                  icone: <LuActivity />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base text-justify">
                        Na densidade textual dos relatórios técnicos,
                        transformar verbos em substantivos abstratos cognatos
                        permite compactar informações de sentenças inteiras em
                        uma única palavra. É o ápice da coesão erudita.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-violet-500/10 border border-violet-500/20 rounded-xl">
                          <p className="text-xs font-bold opacity-70 uppercase tracking-widest text-violet-600 dark:text-violet-400 mb-1">
                            Ação Dispersa
                          </p>
                          <p className="text-base md:text-lg italic text-foreground">
                            "O poço de Libra{" "}
                            <strong className="text-violet-600 dark:text-violet-400">
                              EXPLODIU
                            </strong>{" "}
                            na costa."
                          </p>
                        </div>
                        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                          <p className="text-xs font-bold opacity-70 uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1">
                            Retomada Nominalizada
                          </p>
                          <p className="text-base md:text-lg italic text-foreground">
                            "A{" "}
                            <strong className="text-emerald-600 dark:text-emerald-400">
                              EXPLOSÃO
                            </strong>{" "}
                            marítima causou..."
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "O Elevador da Hiperonímia",
                  icone: <LuAnchor />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base text-justify">
                        Substituir não é apenas trocar seis por meia dúzia. A
                        Hiperonímia sobe o nível categórico (do específico para
                        o genérico), abraçando o termo anterior sem repeti-lo.
                        Essencial para parágrafos extensos.
                      </p>
                      <p className="p-4 bg-violet-500/10 rounded-xl font-mono text-sm md:text-base italic text-foreground border-l-4 border-violet-500">
                        "O{" "}
                        <strong className="text-violet-600 dark:text-violet-400">
                          petróleo
                        </strong>{" "}
                        bruto atingiu $80. A alta desse{" "}
                        <strong className="text-emerald-600 dark:text-emerald-400">
                          combustível fóssil
                        </strong>{" "}
                        afeta o PIB global."
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <TextAnalysisLab
            index={5.1}
            variant="violet"
            titulo="Laboratório Lexical: Micro e Macro"
            subtitulo="Identifique a retomada abstrata (Hiperonímia) e a retomada específica (Hiponímia)."
            legenda={[
              { cor: "bg-blue-400", label: "Termo Original (Hipônimo)" },
              {
                cor: "bg-violet-500",
                label: "Elevador Categórico (Hiperônimo)",
              },
            ]}
            texto={
              <div className="space-y-4 text-sm md:text-base leading-loose">
                <p>
                  "A{" "}
                  <span className="bg-blue-400/30 dark:bg-blue-500/40 px-2 py-0.5 rounded font-medium border border-blue-400/50">
                    broca de perfuração
                  </span>{" "}
                  encontrou rocha salina." O desgaste deste{" "}
                  <span className="bg-violet-500/30 dark:bg-violet-500/40 px-2 py-0.5 rounded font-medium border border-violet-500/50">
                    equipamento
                  </span>{" "}
                  pode atrasar o cronograma.
                </p>
              </div>
            }
          />

          {/* ── CONSOLIDAÇÃO M5: LESSON TABS ── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-violet-500"></div>
            <ModuleSectionHeader
              index={5.2}
              title="Consolidação: A Matriz Lexical"
              description="Acesse o resumo visual e os macetes de classificação vocabular."
              variant="violet"
            />

            <LessonTabs
              tabs={[
                {
                  id: "video",
                  label: "Vídeo Aula",
                  icone: LuPlay,
                  conteudo: (
                    <div className="aspect-video bg-zinc-900 rounded-xl flex flex-col items-center justify-center border border-zinc-800 relative overflow-hidden group cursor-pointer shadow-lg w-full max-w-3xl mx-auto">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544652478-6653e09f18a2?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-700"></div>
                      <div className="absolute inset-0 bg-violet-900/40 mix-blend-multiply"></div>
                      <div className="w-16 h-16 rounded-full bg-violet-600/90 flex items-center justify-center text-white backdrop-blur-sm group-hover:scale-110 group-hover:bg-violet-500 transition-all duration-300 shadow-xl shadow-violet-500/20 z-10 mb-4">
                        <LuPlay className="w-8 h-8 ml-1" />
                      </div>
                      <p className="text-violet-100 font-medium z-10 text-lg">
                        Assistir: Hiperonímia na Prova
                      </p>
                    </div>
                  ),
                },
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icone: LuImage,
                  conteudo: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          type: "Hierarquia",
                          title: "Hipônimo (Micro) vs Hiperônimo (Macro)",
                          placeholderColor: "bg-violet-500/20",
                        },
                        {
                          type: "Processo",
                          title: "A Nominalização em Ação",
                          placeholderColor: "bg-purple-500/20",
                        },
                      ]}
                    />
                  ),
                },
                {
                  id: "macetes",
                  label: "Macetes",
                  icone: LuZap,
                  conteudo: (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-violet-900 to-slate-900 p-6 rounded-2xl shadow-lg border border-violet-700/50">
                        <h3 className="text-violet-100 font-bold mb-4">
                          HIPER = GIGANTE
                        </h3>
                        <p className="text-violet-50/90 text-sm">
                          Lembre do supermercado. Um Hipermercado é gigante. Um
                          Hiperônimo é uma palavra "gigante" (Móvel) que engloba
                          as pequenas (Cadeira, Mesa - Hipônimos).
                        </p>
                      </div>
                      <div className="bg-card border border-border p-6 rounded-2xl flex flex-col justify-center items-center text-center space-y-4 shadow-sm">
                        <div className="w-14 h-14 bg-violet-100 dark:bg-violet-900/40 rounded-full flex items-center justify-center">
                          <LuActivity className="w-7 h-7 text-violet-600 dark:text-violet-400" />
                        </div>
                        <p className="font-medium text-foreground">
                          O Troque-Tudo
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Termos como "problema", "fato", "situação" e "este"
                          formam o cinturão de segurança da coesão. São
                          palavras-sumário que compactam o que foi dito.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  id: "audio",
                  label: "Áudio",
                  icone: LuVolume2,
                  conteudo: (
                    <MusicPlayerCard
                      audioUrl="/audio/coesao-m5.mp3"
                      titulo="Pílula: O Caleidoscópio Léxico"
                      artista="Prof. Fernando"
                      lyrics="Repetir palavras na CESGRANRIO é como desafiar as boas práticas de engenharia: funciona, mas há muito atrito. Use a hiperonímia e lubrifique o texto."
                    />
                  ),
                },
              ]}
              variant="violet"
            />
          </section>

          <QuizInterativo
            questoes={quizM5}
            titulo="QUIZ: Substituições de Elite"
            icone="🎯"
            numero={6}
            variant="blue"
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 6: A DANÇA DOS CONECTIVOS ──────────────────── */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <ModuleBanner
          numero={6}
          titulo="A Dança dos Conectivos"
          descricao="Transições perfeitas: aprenda a usar conjunções para dar ritmo e lógica ao seu texto."
          variant={mv[6]}
        />

        <div className="space-y-[50px]">
          {/* ★ RICH INTRO: A Dança dos Conectivos */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-10">
            <ModuleSectionHeader
              index="INTRO"
              title="A Dança dos Conectivos: Engenharia de Fluxo"
              description="Transforme seu texto de um amontoado de frases em um organismo vivo por meio da coesão sequencial e dos nexos lógicos do Padrão Bechara."
              variant={mv[6]}
            />
            <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
              <p>
                <strong>Evanildo Bechara</strong> define a{" "}
                <strong>coesão sequencial</strong> como o mecanismo que encadeia as
                orações e parágrafos de um texto por meio de{" "}
                <strong>conectivos</strong> — conjunções coordenativas, subordinativas,
                advérbios de ligação e expressões de transição. Se a coesão referencial
                (anáfora, catáfora, elipse) conecta <em>termos</em> dentro do texto, a
                coesão sequencial conecta <em>ideias</em>, estabelecendo relações
                lógicas de causa, consequência, oposição, concessão, adição, alternância
                e conclusão. Conectar frases sem essa precisão é como soldar tubulações
                submarinas no pré-sal com material inadequado: a pressão das ideias rompe
                a lógica argumentativa e o texto colapsa.
              </p>

              <p>
                Bechara classifica os conectivos em dois grandes grupos. As{" "}
                <strong>conjunções coordenativas</strong> ligam orações de mesma
                hierarquia sintática e se dividem em cinco tipos: <strong>aditivas</strong>{" "}
                (e, nem, tampouco), <strong>adversativas</strong> (mas, porém, contudo,
                todavia, entretanto, no entanto), <strong>alternativas</strong> (ou... ou,
                ora... ora, quer... quer), <strong>conclusivas</strong> (logo, portanto,
                por conseguinte, destarte) e <strong>explicativas</strong> (pois [antes
                do verbo], porquanto, porque). Já as{" "}
                <strong>conjunções subordinativas</strong> estabelecem relação de
                dependência entre as orações: causais, concessivas, condicionais,
                temporais, comparativas, consecutivas, conformativas, proporcionais,
                finais e integrantes. A CESGRANRIO testa sistematicamente a capacidade
                do candidato de <strong>classificar</strong> o conectivo e, mais
                importante, de identificar seu <strong>valor semântico</strong> no
                contexto.
              </p>

              <p>
                O ponto mais sofisticado que Bechara destaca — e que constitui a
                principal armadilha da banca — é a diferença entre{" "}
                <strong>classificação gramatical</strong> e{" "}
                <strong>valor semântico</strong> de um conectivo. O &quot;e&quot; é gramaticalmente
                aditivo, mas em <em>&quot;Estudou muito <strong>e</strong> foi
                reprovado&quot;</em> assume valor adversativo (equivalente a &quot;mas&quot;). O &quot;como&quot;
                pode ser causal (<em>&quot;Como choveu, o jogo parou&quot;</em>), comparativo
                (<em>&quot;Corre como um atleta&quot;</em>) ou conformativo
                (<em>&quot;Como previsto, a meta foi atingida&quot;</em>). A CESGRANRIO explora essa
                polissemia pedindo que o candidato identifique o valor real do conectivo
                no contexto dado, não sua classificação de dicionário. É nessa
                distinção que a maioria dos candidatos tropeça.
              </p>

              <p>
                No universo da <strong>Petrobras</strong>, os conectivos são a espinha
                dorsal dos relatórios técnicos, pareceres jurídicos e comunicados de
                segurança. Um documento que diga{" "}
                <em>&quot;A produção aumentou 12%, <strong>portanto</strong> as metas
                foram superadas&quot;</em> usa um conectivo conclusivo com precisão. Porém,
                se o mesmo documento disser{" "}
                <em>&quot;A produção aumentou 12%, <strong>porquanto</strong> as metas
                foram superadas&quot;</em>, o sentido muda radicalmente: &quot;porquanto&quot; é
                causal, não conclusivo. Nos editais da CESGRANRIO, questões de
                reescrita frequentemente pedem a substituição de um conectivo por outro,
                e o candidato precisa avaliar se a troca <strong>preserva</strong> ou{" "}
                <strong>altera</strong> a relação lógica entre as orações.
              </p>

              <p>
                A <strong>pegadinha clássica</strong> envolve pares de conectivos
                foneticamente similares mas semanticamente opostos. O trio{" "}
                <strong>&quot;porquanto&quot;</strong> (causal) vs.{" "}
                <strong>&quot;portanto&quot;</strong> (conclusivo) vs.{" "}
                <strong>&quot;porquê&quot;</strong> (substantivo) é o mais cobrado pela banca.
                Bechara adverte que a troca acidental entre eles pode inverter
                completamente o argumento do texto. Outra armadilha recorrente é o{" "}
                <strong>&quot;pois&quot;</strong> flutuante: antes do verbo, é explicativo
                (<em>&quot;Estude, pois a prova é difícil&quot;</em>); depois do verbo, é
                conclusivo (<em>&quot;A prova é difícil; estude, pois&quot;</em>). A posição
                no período altera o valor semântico — e a CESGRANRIO adora testar
                exatamente isso.
              </p>

              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 rounded-lg border border-amber-200 dark:border-amber-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground flex items-center gap-2">
                  ⚡ Mapa dos Conectivos — Armadilhas Clássicas
                </h4>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li><strong>&quot;porquanto&quot;</strong> = causal (≈ porque). <strong>&quot;portanto&quot;</strong> = conclusivo (≈ logo). NÃO são sinônimos!</li>
                  <li><strong>&quot;pois&quot;</strong> antes do verbo = explicativo. Depois do verbo = conclusivo.</li>
                  <li><strong>&quot;e&quot; adversativo</strong> — &quot;Estudou <em>e</em> foi reprovado&quot; = valor de &quot;mas&quot;.</li>
                  <li><strong>&quot;como&quot; polissêmico</strong> — Pode ser causal, comparativo ou conformativo conforme o contexto.</li>
                </ul>
              </div>
            </div>

            <QuizDiagnostic
              title="Desafio Conectivo"
              question="Qual o valor semântico do conectivo 'porquanto' em uma sentença técnica da Petrobras?"
              options={[
                "Concessão, equivalente a 'embora'.",
                "Conclusão, equivalente a 'portanto'.",
                "Causa ou Explicação, equivalente a 'porque'.",
                "Adição, equivalente a 'além disso'.",
              ]}
              correctAnswer={2}
              explanation="Exatamente! 'Porquanto' é um conectivo de valor causal ou explicativo. Não confunda com 'portanto', que é conclusivo."
              variant={mv[6]}
            />
          </section>
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Sintaxe de Nexos (Coesão Sequencial)"
              description="A articulação matemática das ideias através do tempo e da lógica oracional."
              variant={mv[6]}
            />
            <ContentAccordion
              mode="stacked"
              slides={[
                {
                  titulo: "A Engenharia da Progressão",
                  icone: <LuZap />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base text-justify">
                        Enquanto a coesão referencial mantém o tema vivo
                        (olhando pelo retrovisor), a{" "}
                        <strong>Coesão Sequencial</strong> é o motor de
                        arranque. Segundo os gramáticos, o papel primário das
                        conjunções não é apenas somar letras, mas estabelecer e
                        forçar relações lógico-discursivas precisas (causa,
                        condição, finalidade).
                      </p>
                      <div className="p-4 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-xl">
                        <p className="italic text-base md:text-lg text-foreground">
                          "A viabilidade térmica foi comprovada,{" "}
                          <strong className="text-amber-600 dark:text-amber-400">
                            logo
                          </strong>
                          , o conselho aprovou a perfuração."
                        </p>
                        <p className="text-sm mt-2 font-bold text-amber-700/80 dark:text-amber-400/80">
                          (O conectivo 'logo' não é enfeite; ele estabelece um
                          corolário/conclusão).
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "O Arsenal Conectivo da CESGRANRIO",
                  icone: <LuLibrary />,
                  conteudo: (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm md:text-base border-collapse">
                        <thead>
                          <tr className="border-b bg-muted/20">
                            <th className="p-4 text-left">Nexo Lógico</th>
                            <th className="p-4 text-left">
                              Conectivos de Alto Calibre
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b transition-colors hover:bg-muted/10">
                            <td className="p-4 font-bold text-amber-600 dark:text-amber-400">
                              Conclusão
                            </td>
                            <td className="p-4 text-foreground/90">
                              Logo, portanto, por conseguinte, destarte,
                              dessarte.
                            </td>
                          </tr>
                          <tr className="border-b transition-colors hover:bg-muted/10">
                            <td className="p-4 font-bold text-amber-600 dark:text-amber-400">
                              Causa Primária
                            </td>
                            <td className="p-4 text-foreground/90">
                              Visto que, na medida em que, porquanto (igual a
                              porque).
                            </td>
                          </tr>
                          <tr className="border-b transition-colors hover:bg-muted/10">
                            <td className="p-4 font-bold text-amber-600 dark:text-amber-400">
                              Finalidade
                            </td>
                            <td className="p-4 text-foreground/90">
                              Com o fito de, com o escopo de, a fim de que.
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

          <TextAnalysisLab
            index={2}
            variant={mv[6]}
            titulo="Laboratório de Nexos: Causa e Efeito"
            subtitulo="A mecânica da CESGRANRIO inverte frequentemente a ordem temporal e sintática."
            legenda={[
              { cor: "bg-amber-400", label: "Causa (Ação Originária)" },
              {
                cor: "bg-blue-400",
                label: "Consequência (O Resultado Empírico)",
              },
            ]}
            texto={
              <div className="space-y-4 text-sm md:text-base leading-loose">
                <p>
                  "
                  <span className="bg-amber-400/30 px-1 rounded font-medium border border-amber-400/50">
                    Na medida em que a demanda asiática cresceu 15%
                  </span>
                  , a gerência recalibrou os navios-sonda,{" "}
                  <span className="bg-blue-400/30 px-1 rounded font-medium border border-blue-400/50">
                    de modo que nenhum país aliado enfrentasse desabastecimento
                  </span>
                  ."
                </p>
              </div>
            }
          />

          {/* ── CONSOLIDAÇÃO M6: LESSON TABS ── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
            <ModuleSectionHeader
              index={3}
              title="Consolidação: As Pontes de Sentido"
              description="Acesse o resumo visual e acerte a guerra letal entre Porquanto e Portanto."
              variant={mv[6]}
            />

            <LessonTabs
              tabs={[
                {
                  id: "video",
                  label: "Vídeo Aula",
                  icone: LuPlay,
                  conteudo: (
                    <div className="aspect-video bg-zinc-900 rounded-xl flex flex-col items-center justify-center border border-zinc-800 relative overflow-hidden group cursor-pointer shadow-lg w-full max-w-3xl mx-auto">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-700"></div>
                      <div className="absolute inset-0 bg-amber-900/40 mix-blend-multiply"></div>
                      <div className="w-16 h-16 rounded-full bg-amber-600/90 flex items-center justify-center text-white backdrop-blur-sm group-hover:scale-110 group-hover:bg-amber-500 transition-all duration-300 shadow-xl shadow-amber-500/20 z-10 mb-4">
                        <LuPlay className="w-8 h-8 ml-1" />
                      </div>
                      <p className="text-amber-100 font-medium z-10 text-lg">
                        Assistir: Pegadinhas Conectivas
                      </p>
                    </div>
                  ),
                },
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icone: LuImage,
                  conteudo: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          type: "Esquema",
                          title: "Causa vs Consequência",
                          placeholderColor: "bg-amber-500/20",
                        },
                        {
                          type: "Alerta Red",
                          title: "Substituição Proibida!",
                          placeholderColor: "bg-red-500/20",
                        },
                      ]}
                    />
                  ),
                },
                {
                  id: "macetes",
                  label: "Macetes",
                  icone: LuZap,
                  conteudo: (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-red-900 to-slate-900 p-6 rounded-2xl shadow-lg border border-red-700/50">
                        <h3 className="text-red-100 font-bold mb-4">
                          PORQUANTO vs PORTANTO
                        </h3>
                        <p className="text-red-50/90 text-sm">
                          Eles se parecem, mas são inimigos mortais na lógica.
                          <br />
                          <br />
                          <strong>PORQUANTO</strong> = Porque (Dá a Causa).
                          <br />
                          <strong>PORTANTO</strong> = Logo (Dá a Conclusão).
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  id: "audio",
                  label: "Áudio",
                  icone: LuVolume2,
                  conteudo: (
                    <MusicPlayerCard
                      audioUrl="/audio/coesao-m6.mp3"
                      titulo="Pílula: O Cimento da Oração"
                      artista="Prof. Fernando"
                      lyrics="Conectivo errado é prédio que cai. Na dúvida, troque o nexo pedante pelo básico até ter certeza da relação estabelecida."
                    />
                  ),
                },
              ]}
              variant={mv[6]}
            />
          </section>

          <QuizInterativo
            questoes={quizM6}
            titulo="QUIZ: A Dança dos Conectivos"
            icone="🎯"
            numero={4}
            variant={mv[6]}
            onComplete={(score) => handleModuleComplete("modulo-6", score)}
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 7: CONCESSÃO & OPOSIÇÃO ───────────────────── */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <ModuleBanner
          numero={7}
          titulo="Concessão & Oposição"
          descricao="O divisor de águas da Cesgranrio: diferencie a força do 'Mas' da resiliência do 'Embora'."
          variant={mv[7]}
        />

        <div className="space-y-[50px]">
          {/* ★ RICH INTRO: Concessão & Oposição */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-10">
            <ModuleSectionHeader
              index="INTRO"
              title="A Concessão de Elite: A Arte de Contornar"
              description="Aprenda a distinguir a força bruta da oposição (Adversidade) da elegância estratégica da Concessão, um dos temas preferidos da CESGRANRIO."
              variant={mv[7]}
            />
            <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
              <p>
                <strong>Evanildo Bechara</strong> dedica atenção especial à distinção
                entre <strong>adversidade</strong> e <strong>concessão</strong> na{" "}
                <em>Moderna Gramática Portuguesa</em>, pois essa é uma das confusões
                mais exploradas pela CESGRANRIO. Ambas expressam ideias de contraste,
                mas operam de maneiras fundamentalmente diferentes. A conjunção{" "}
                <strong>adversativa</strong> (mas, porém, contudo, todavia, entretanto)
                introduz o argumento que <strong>&quot;vence&quot;</strong> o embate: em{" "}
                <em>&quot;O projeto é ambicioso, <strong>mas</strong> exige alto
                investimento&quot;</em>, o foco recai sobre o alto investimento — é ele que
                prevalece no raciocínio. Já a conjunção{" "}
                <strong>concessiva</strong> (embora, conquanto, ainda que, mesmo que)
                introduz um obstáculo que{" "}
                <strong>não consegue anular</strong> a ideia principal: em{" "}
                <em>&quot;<strong>Embora</strong> exija alto investimento, o projeto é
                ambicioso&quot;</em>, o foco se mantém na ambição do projeto — o
                investimento é apenas um contraponto insuficiente.
              </p>

              <p>
                A diferença prática mais crítica que Bechara destaca — e que a
                CESGRANRIO cobra em praticamente todas as provas — é a{" "}
                <strong>mudança obrigatória de modo verbal</strong>. As adversativas
                acompanham o modo <strong>indicativo</strong> (fato real): &quot;O projeto{" "}
                <em>é</em> ambicioso, contudo <em>exige</em> investimento&quot;. As
                concessivas exigem o modo <strong>subjuntivo</strong> (hipótese,
                concessão): &quot;Embora <em>exija</em> investimento, o projeto{" "}
                <em>é</em> ambicioso&quot;. Trocar &quot;contudo&quot; por &quot;embora&quot; sem ajustar o
                verbo do indicativo para o subjuntivo gera um{" "}
                <strong>erro gramatical grave</strong> que a banca classifica como
                inadequação de reescrita. Essa é a armadilha número um nos concursos da
                Petrobras.
              </p>

              <p>
                Bechara também sistematiza os{" "}
                <strong>pares concessivos-adversativos</strong> que o candidato precisa
                dominar para as questões de equivalência. &quot;Mas&quot; ↔ &quot;embora&quot;, &quot;porém&quot; ↔
                &quot;conquanto&quot;, &quot;contudo&quot; ↔ &quot;ainda que&quot;, &quot;todavia&quot; ↔ &quot;mesmo que&quot;, &quot;no
                entanto&quot; ↔ &quot;se bem que&quot;. A troca entre eles é possível, mas exige três
                ajustes simultâneos: (1) mudança do modo verbal (indicativo →
                subjuntivo), (2) inversão da ordem das orações (a concessiva
                geralmente antecede a principal) e (3) eliminação da vírgula antes da
                adversativa e adição de vírgula após a concessiva. Ignorar qualquer um
                desses três passos invalida a reescrita.
              </p>

              <p>
                No contexto da <strong>Petrobras</strong>, a concessão é ferramenta
                retórica fundamental em relatórios de segurança e pareceres técnicos.
                Um comunicado que diga{" "}
                <em>&quot;<strong>Ainda que</strong> o mar estivesse em categoria 5, a
                operação de resgate foi concluída com sucesso&quot;</em> usa a concessão
                para reconhecer a dificuldade operacional sem diminuir a conquista da
                equipe. A adversativa, por outro lado, daria peso ao obstáculo:{" "}
                <em>&quot;A operação de resgate foi concluída, <strong>mas</strong> o mar
                estava em categoria 5&quot;</em>. A escolha entre uma e outra reflete a{" "}
                <strong>intencionalidade argumentativa</strong> do autor — e a
                CESGRANRIO testa exatamente essa sensibilidade.
              </p>

              <p>
                A <strong>pegadinha mais frequente</strong> da banca envolve a
                substituição sem ajuste modal. A questão apresenta uma frase com
                adversativa no indicativo e pede a reescrita com concessiva. Três das
                cinco alternativas mantêm o verbo no indicativo — e o candidato
                desatento marca uma delas. Bechara é categórico:{" "}
                <strong>&quot;embora&quot; + indicativo é erro</strong>. Não existe &quot;Embora o
                projeto <em>é</em> bom&quot;; o correto é &quot;Embora o projeto{" "}
                <em>seja</em> bom&quot;. Outra armadilha é o uso de &quot;conquanto&quot;, conjunção
                rara que muitos candidatos desconhecem: ela é 100% concessiva e exige
                subjuntivo, funcionando como sinônimo erudito de &quot;embora&quot;.
              </p>

              <div className="bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-950/30 dark:to-red-950/30 rounded-lg border border-rose-200 dark:border-rose-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground flex items-center gap-2">
                  ⚔️ Adversativa vs Concessiva — Guia de Conversão
                </h4>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li><strong>Adversativa</strong> (mas, porém, contudo) → Indicativo. O argumento adversativo &quot;vence&quot;.</li>
                  <li><strong>Concessiva</strong> (embora, conquanto, ainda que) → Subjuntivo. O obstáculo &quot;perde&quot;.</li>
                  <li><strong>Ao trocar</strong>: ajustar modo verbal + inverter ordem + corrigir pontuação.</li>
                  <li><strong>Erro fatal</strong>: &quot;Embora&quot; + Indicativo = INVÁLIDO. Sempre Subjuntivo.</li>
                </ul>
              </div>
            </div>

            <QuizDiagnostic
              title="Desafio de Contraste"
              question="Se trocarmos o 'Mas' por 'Embora' em uma frase, o que acontece obrigatoriamente com o verbo segundo o Padrão Bechara?"
              options={[
                "Nada, o verbo permanece no Indicativo.",
                "O verbo deve ir para o Futuro do Pretérito.",
                "O verbo deve ser deslocado para o Subjuntivo.",
                "O verbo deve ser omitido (Elipse).",
              ]}
              correctAnswer={2}
              explanation="Perfeito! As conjunções concessivas (embora, conquanto) exigem o modo subjuntivo para sinalizar a natureza da relação lógica."
              variant={mv[7]}
            />
          </section>
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="O Grande Duelo Sintático"
              description="Adversativas vs. Concessivas: o divisor de águas entre a lógica imperativa e a argumentação sofisticada."
              variant={mv[7]}
            />
            <ContentAccordion
              mode="stacked"
              slides={[
                {
                  titulo: "Mas (Adversativo): A Rota de Colisão",
                  icone: <LuZap />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base text-justify">
                        Na gramática de Bechara, as conjunções adversativas
                        (mas, porém, contudo, todavia) introduzem o argumento{" "}
                        <strong>mais forte</strong>. Elas literalmente tratoram
                        a informação anterior, deixando claro que o que vem após
                        o 'mas' é a verdadeira intenção do autor.
                      </p>
                      <div className="p-4 bg-red-500/10 border-l-4 border-red-500 rounded-r-xl italic text-base md:text-lg text-foreground">
                        "O navio-plataforma era antigo,{" "}
                        <strong className="text-red-600 dark:text-red-400">
                          mas
                        </strong>{" "}
                        a manutenção estava em dia."
                        <span className="block text-sm mt-2 font-bold text-red-700/80 dark:text-red-400/80 not-italic">
                          (O foco da comunicação: A PLATAFORMA PODE OPERAR. O
                          'mas' empodera a manutenção e anula a idade).
                        </span>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Embora (Concessivo): A Quebra Elegante",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base text-justify">
                        As concessivas (embora, conquanto, ainda que)
                        representam a resiliência. Elas introduzem um obstáculo
                        válido e inegável, contudo <strong>insuficiente</strong>{" "}
                        para barrar a oração principal. É a arte de conceder
                        razão ao oponente antes de vencê-lo.
                      </p>
                      <div className="p-4 bg-emerald-500/10 border-l-4 border-emerald-500 rounded-r-xl italic text-base md:text-lg text-foreground">
                        "
                        <strong className="text-emerald-600 dark:text-emerald-400">
                          Embora
                        </strong>{" "}
                        o mar estivesse categoria 5, o resgate foi concluído com
                        sucesso."
                        <span className="block text-sm mt-2 font-bold text-emerald-700/80 dark:text-emerald-400/80 not-italic">
                          (O foco da comunicação: O RESGATE FOI UM SUCESSO. O
                          'embora' rebaixa a tempestade a um mero detalhe
                          superado).
                        </span>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
            <AlertBox tipo="danger" titulo="A Armadilha do Modo Verbal">
              A CESGRANRIO pune quem não cruza Sintaxe com Morfologia. Trocar
              'Mas' por 'Embora' <strong>obriga</strong> a mudança de modo
              verbal. Concessivas exigem o <strong>Subjuntivo</strong> (campo do
              hipotético/concedido), nunca o Indicativo (campo do real):
              <div className="mt-4 p-4 bg-background border border-red-500/20 rounded-lg font-mono text-sm space-y-2">
                <p className="text-red-600/90 dark:text-red-400/90">
                  ❌ <strong>Mas</strong> o mar ESTAVA revolto... (Indicativo
                  OBRIGA a ser Adversativa)
                </p>
                <p className="text-emerald-600/90 dark:text-emerald-400/90">
                  ✅ <strong>Embora</strong> o mar ESTIVESSE revolto...
                  (Subjuntivo OBRIGA a ser Concessiva)
                </p>
              </div>
            </AlertBox>
          </section>

          <TextAnalysisLab
            index={2}
            variant={mv[7]}
            titulo="Laboratório de Contrastes"
            subtitulo="Analise a força argumentativa (Oposição vs Concessão) em um cenário de crise operacional."
            legenda={[
              { cor: "bg-rose-400", label: "Oposição (Argumento Forte)" },
              {
                cor: "bg-emerald-400",
                label: "Concessão (Obstáculo Superado)",
              },
            ]}
            texto={
              <div className="space-y-4 text-sm md:text-base leading-loose">
                <p>
                  "Houve um vazamento superficial de fluidos,{" "}
                  <span className="bg-rose-400/30 px-1 rounded font-medium border border-rose-400/50">
                    contudo a resposta da equipe de contenção foi imediata
                    (Oposição)
                  </span>
                  .{" "}
                  <span className="bg-emerald-400/30 px-1 rounded font-medium border border-emerald-400/50">
                    Ainda que a imprensa divulgue cenários alarmistas
                    (Concessão)
                  </span>
                  , a integridade do reservatório principal está mantida."
                </p>
              </div>
            }
          />

          {/* ── CONSOLIDAÇÃO M7: LESSON TABS ── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
            <ModuleSectionHeader
              index={3}
              title="Consolidação: O Jogo de Forças"
              description="Domine a inversão de polaridade entre Indicativo Subjuntivo."
              variant={mv[7]}
            />

            <LessonTabs
              tabs={[
                {
                  id: "video",
                  label: "Vídeo Aula",
                  icone: LuPlay,
                  conteudo: (
                    <div className="aspect-video bg-zinc-900 rounded-xl flex flex-col items-center justify-center border border-zinc-800 relative overflow-hidden group cursor-pointer shadow-lg w-full max-w-3xl mx-auto">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512418490979-92798cec1380?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-700"></div>
                      <div className="absolute inset-0 bg-rose-900/40 mix-blend-multiply"></div>
                      <div className="w-16 h-16 rounded-full bg-rose-600/90 flex items-center justify-center text-white backdrop-blur-sm group-hover:scale-110 group-hover:bg-rose-500 transition-all duration-300 shadow-xl shadow-rose-500/20 z-10 mb-4">
                        <LuPlay className="w-8 h-8 ml-1" />
                      </div>
                      <p className="text-rose-100 font-medium z-10 text-lg">
                        Assistir: Mas vs Embora
                      </p>
                    </div>
                  ),
                },
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icone: LuImage,
                  conteudo: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          type: "A Oposição",
                          title: "MAS: A Marreta",
                          placeholderColor: "bg-red-500/20",
                        },
                        {
                          type: "A Concessão",
                          title: "EMBORA: A Água Contornando a Pedra",
                          placeholderColor: "bg-emerald-500/20",
                        },
                      ]}
                    />
                  ),
                },
                {
                  id: "macetes",
                  label: "Macetes",
                  icone: LuZap,
                  conteudo: (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-rose-900 to-slate-900 p-6 rounded-2xl shadow-lg border border-rose-700/50">
                        <h3 className="text-rose-100 font-bold mb-4">
                          A REGRA DE OURO BIFURCADA
                        </h3>
                        <p className="text-rose-50/90 text-sm">
                          Acese a luz de alerta verbal quando essas conjunções
                          aparecerem:
                          <br />
                          <br />
                          <strong>MAS/PORÉM</strong> = Sempre acompanham verbos
                          no <strong>Indicativo</strong> (mundo real).
                          <br />
                          <br />
                          <strong>EMBORA/CONQUANTO</strong> = Exigem verbos no{" "}
                          <strong>Subjuntivo</strong> (quebra de expectativa).
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  id: "audio",
                  label: "Áudio",
                  icone: LuVolume2,
                  conteudo: (
                    <MusicPlayerCard
                      audioUrl="/audio/coesao-m7.mp3"
                      titulo="Pílula: Concessão Tática"
                      artista="Prof. Fernando"
                      lyrics="Na CESGRANRIO, o 'conquanto' é a veste de gala do 'embora'. Vista-o, mas certifique-se de usar o subjuntivo no pé."
                    />
                  ),
                },
              ]}
              variant="rose"
            />
          </section>

          <QuizInterativo
            questoes={quizM7}
            titulo="QUIZ: Concessão & Oposição"
            icone="🎯"
            numero={4}
            variant={mv[7]}
            onComplete={(score) => handleModuleComplete("modulo-7", score)}
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 8: ARQUITETURA DA COERÊNCIA ───────────────── */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <ModuleBanner
          numero={8}
          titulo="Arquitetura da Coerência"
          descricao="A harmonia lógica: entenda o Princípio da Não-Contradição e a Consistência Pragmática."
          variant={mv[8]}
        />

        <div className="space-y-[50px]">
          {/* ★ RICH INTRO: Arquitetura da Coerência */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-10">
            <ModuleSectionHeader
              index="INTRO"
              title="Arquitetura da Coerência: A Viga Mestra"
              description="Vá além da gramática e entenda como o Princípio da Não-Contradição sustenta a engenharia de sentido dos textos da Petrobras."
              variant={mv[8]}
            />
            <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
              <p>
                <strong>Evanildo Bechara</strong> adverte que a{" "}
                <strong>coerência</strong> não é um elemento visível na superfície do
                texto como a coesão, mas o <strong>resultado da interação entre o
                texto e o conhecimento de mundo do leitor</strong>. Um texto pode ter
                100% de coesão — pronomes retomando referentes corretos, conectivos
                impecavelmente empregados, elipses legitimamente recuperáveis — e,
                ainda assim, ser completamente absurdo se suas ideias se contradisserem
                ou violarem a lógica do mundo real. A coerência é a consciência do
                texto, o prumo que impede o desabamento lógico. Para o concurso da
                Petrobras, entender essa dimensão profunda é decisivo: a CESGRANRIO
                constrói questões inteiras sobre a distinção entre forma (coesão) e
                substância (coerência).
              </p>

              <p>
                O pilar fundamental da coerência que Bechara sistematiza é o{" "}
                <strong>Princípio da Não-Contradição</strong>: um texto coerente não
                pode afirmar e negar a mesma proposição simultaneamente sem
                justificativa explícita. Se um relatório da Petrobras declara que{" "}
                <em>&quot;O lucro operacional cresceu 15% no trimestre&quot;</em> e, dois
                parágrafos depois, afirma que <em>&quot;a receita total caiu no mesmo
                período sem fatores extraordinários&quot;</em>, há uma ruptura de
                coerência: lucro crescente com receita declinante, sem explicação
                intermediária (como redução de custos), gera uma contradição lógica.
                A CESGRANRIO apresenta textos com esse tipo de inconsistência e
                pergunta se o trecho é coerente — testando a capacidade analítica do
                candidato.
              </p>

              <p>
                Além da não-contradição, Bechara identifica outros princípios de
                coerência que a banca explora: a <strong>relevância</strong> (cada
                informação deve contribuir para o tema central), a{" "}
                <strong>continuidade temática</strong> (o texto não pode saltar
                abruptamente de um assunto para outro sem transição) e a{" "}
                <strong>coerência pragmática</strong> (adequação ao mundo real). Este
                último princípio é especialmente crítico nos textos da Petrobras: um
                manual técnico que diga <em>&quot;Em caso de vazamento, espere a pressão
                estabilizar naturalmente&quot;</em> pode ser gramaticalmente perfeito, mas
                é pragmaticamente incoerente — na indústria de petróleo, vazamentos
                exigem intervenção imediata, não espera passiva.
              </p>

              <p>
                No contexto dos concursos da <strong>Petrobras</strong>, a coerência
                aparece predominantemente em questões de interpretação de texto, onde
                a banca apresenta trechos longos (editoriais, relatórios, artigos) e
                pede que o candidato identifique se determinada conclusão é{" "}
                <strong>coerente com o conjunto</strong> de informações apresentadas.
                O candidato precisa avaliar não apenas o que está explícito, mas
                também as <strong>inferências lógicas</strong> que o texto autoriza.
                Se o texto diz que &quot;a produção caiu&quot; e &quot;o mercado estava aquecido&quot;,
                a inferência de que &quot;fatores internos causaram a queda&quot; é coerente;
                a inferência de que &quot;o mercado causou a queda&quot; é incoerente com os
                dados apresentados.
              </p>

              <p>
                A <strong>pegadinha mais sofisticada</strong> da CESGRANRIO neste
                tema é o texto com <strong>coesão impecável e coerência
                quebrada</strong>. A banca constrói trechos em que todos os conectivos
                estão corretos, os pronomes retomam os referentes certos e a
                pontuação é perfeita — mas uma premissa contradiz outra, ou uma
                conclusão não se sustenta logicamente pelas evidências apresentadas.
                Bechara ensina que o candidato de elite deve ler o texto em{" "}
                <strong>duas camadas</strong>: primeiro a superfície gramatical
                (coesão), depois o subsolo lógico (coerência). Só quando ambas as
                camadas estão íntegras é que o texto pode ser considerado bem
                construído.
              </p>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground flex items-center gap-2">
                  🧠 Pilares da Coerência — Checklist de Validação
                </h4>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li><strong>Não-contradição</strong> — O texto afirma e nega a mesma coisa sem justificativa?</li>
                  <li><strong>Relevância</strong> — Toda informação contribui para o tema central?</li>
                  <li><strong>Continuidade</strong> — Há saltos abruptos de assunto sem transição?</li>
                  <li><strong>Coerência pragmática</strong> — O conteúdo faz sentido no mundo real (especialmente em contexto industrial)?</li>
                </ul>
              </div>
            </div>

            <QuizDiagnostic
              title="Dossiê de Coerência"
              question="Segundo Bechara, qual a diferença primordial entre coesão e coerência?"
              options={[
                "Coesão é o sentido; Coerência é a gramática.",
                "Coesão é a superfície (forma); Coerência é a base (lógica).",
                "São sinônimos perfeitos na linguística moderna.",
                "Coerência só existe em textos literários.",
              ]}
              correctAnswer={1}
              explanation="Correto! Enquanto a coesão cuida dos elos gramaticais, a coerência garante que a unidade de sentido seja mantida."
              variant={mv[8]}
            />
          </section>
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Viga Mestra do Sentido"
              description="A Coerência Pragmática e Semântica: a diferença brutal entre um texto perfeitamente amarrado (coeso) e um texto que de fato faz sentido (coerente)."
              variant={mv[8]}
            />
            <ContentAccordion
              mode="stacked"
              slides={[
                {
                  titulo: "O Princípio da Não-Contradição",
                  icone: <LuCheck />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base text-justify">
                        Na lógica dialética, um texto não pode postular 'A' e,
                        no período seguinte, postular 'não A' sem uma ponte
                        concessiva clara. A coerência interna exige que as
                        informações orbitando o mesmo referente corroborem a
                        mesma tese, sob pena de ruir toda a arquitetura
                        discursiva.
                      </p>
                      <div className="p-4 bg-red-500/10 border-l-4 border-red-500 rounded-r-xl">
                        <p className="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-400 mb-1">
                          A Incoerência Fatal (Falta Lógica)
                        </p>
                        <p className="italic text-base md:text-lg text-foreground">
                          "A empresa defende a segurança total em alto mar, mas
                          flexibiliza o uso de EPIs em áreas de risco grave."
                        </p>
                        <p className="text-sm mt-2 text-muted-foreground">
                          (Sintaticamente coeso, mas logicamente insano).
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Coerência Pragmática (O Chão de Fábrica)",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base text-justify">
                        Não basta fazer sentido internamente; o texto precisa
                        pertencer ao mundo real. A Coerência Pragmática é o
                        choque do texto com o 'Conhecimento de Mundo' partilhado
                        entre autor e leitor.
                      </p>
                      <div className="p-4 bg-emerald-500/10 border-l-4 border-emerald-500 rounded-r-xl italic text-base md:text-lg text-foreground">
                        "Enviamos três submarinos atômicos para perfurar o
                        núcleo do Sol."
                        <span className="block text-sm mt-2 font-bold text-emerald-700/80 dark:text-emerald-400/80 not-italic">
                          (Coesão gramatical: Nota 10. Coerência pragmática:
                          Absoluto zero. O texto não resiste à gravidade do
                          mundo real).
                        </span>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <TextAnalysisLab
            index={2}
            variant="emerald"
            titulo="Laboratório de Sanidade Discursiva"
            subtitulo="Valide se a premissa suporta logicamente a conclusão imposta."
            legenda={[
              { cor: "bg-emerald-400", label: "A Premissa Material" },
              { cor: "bg-amber-400", label: "O Corolário Lógico" },
            ]}
            texto={
              <div className="space-y-4 text-sm md:text-base leading-loose">
                <p>
                  "
                  <span className="bg-emerald-400/30 px-1 rounded font-medium border border-emerald-400/50">
                    Sendo imperativo que falhas na sonda custam milhões
                  </span>
                  , a interrupção preventiva de dois dias foi a{" "}
                  <span className="bg-amber-400/30 px-1 rounded font-medium border border-amber-400/50">
                    decisão racional validada por ambas as diretorias
                  </span>
                  ."
                </p>
              </div>
            }
          />

          {/* ── CONSOLIDAÇÃO M8: LESSON TABS ── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
            <ModuleSectionHeader
              index={3}
              title="Consolidação: As Leis da Coerência"
              description="Acesse o resumo visual sobre não-contradição e ancoragem na realidade."
              variant={mv[8]}
            />

            <LessonTabs
              tabs={[
                {
                  id: "video",
                  label: "Vídeo Aula",
                  icone: LuPlay,
                  conteudo: (
                    <div className="aspect-video bg-zinc-900 rounded-xl flex flex-col items-center justify-center border border-zinc-800 relative overflow-hidden group cursor-pointer shadow-lg w-full max-w-3xl mx-auto">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-700"></div>
                      <div className="absolute inset-0 bg-emerald-900/40 mix-blend-multiply"></div>
                      <div className="w-16 h-16 rounded-full bg-emerald-600/90 flex items-center justify-center text-white backdrop-blur-sm group-hover:scale-110 group-hover:bg-emerald-500 transition-all duration-300 shadow-xl shadow-emerald-500/20 z-10 mb-4">
                        <LuPlay className="w-8 h-8 ml-1" />
                      </div>
                      <p className="text-emerald-100 font-medium z-10 text-lg">
                        Assistir: O Teste de Realidade
                      </p>
                    </div>
                  ),
                },
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icone: LuImage,
                  conteudo: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          type: "A Lógica",
                          title: "Princípio da Não-Contradição",
                          placeholderColor: "bg-emerald-500/20",
                        },
                        {
                          type: "O Mundo Real",
                          title: "Coerência Pragmática vs Fantasia",
                          placeholderColor: "bg-teal-500/20",
                        },
                      ]}
                    />
                  ),
                },
                {
                  id: "macetes",
                  label: "Macetes",
                  icone: LuZap,
                  conteudo: (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-emerald-900 to-slate-900 p-6 rounded-2xl shadow-lg border border-emerald-700/50">
                        <h3 className="text-emerald-100 font-bold mb-4">
                          A METÁFORA DO EDIFÍCIO
                        </h3>
                        <p className="text-emerald-50/90 text-sm">
                          A <strong>Coesão</strong> é o cimento, o ferro e o
                          tijolo (os elementos gramaticais visíveis). A{" "}
                          <strong>Coerência</strong> é a prumo, o nível e a
                          planta (a ordem lógica invisível). Você pode ter uma
                          pilha perfeitamente cimentada de tijolos que não forma
                          uma casa.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  id: "audio",
                  label: "Áudio",
                  icone: LuVolume2,
                  conteudo: (
                    <MusicPlayerCard
                      audioUrl="/audio/coesao-m8.mp3"
                      titulo="Pílula: O Crivo da Razão"
                      artista="Prof. Fernando"
                      lyrics="Na prova de intelecção da CESGRANRIO, a alternativa falsa nem sempre mente sobre o texto, às vezes ela quebra o Princípio da Não-Contradição."
                    />
                  ),
                },
              ]}
              variant="emerald"
            />
          </section>

          <QuizInterativo
            questoes={quizM8}
            titulo="QUIZ: Arquitetura da Coerência"
            icone="🎯"
            numero={4}
            variant={mv[8]}
            onComplete={(score) => handleModuleComplete("modulo-8", score)}
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 9: PROGRESSÃO E RELEVÂNCIA ────────────────── */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <ModuleBanner
          numero={9}
          titulo="Progressão e Relevância"
          descricao="Evite o texto circular: aprenda a evoluir ideias sem perder a conexão temática."
          variant={mv[9]}
        />

        <div className="space-y-[50px]">
          {/* ★ RICH INTRO: Progressão e Relevância */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-10">
            <ModuleSectionHeader
              index="INTRO"
              title="Progressão Temática: O Motor do Texto"
              description="Aprenda a evitar o 'texto circular' (Tautologia) e domine o equilíbrio entre a informação dada (Tema) e a informação nova (Rema) segundo Bechara."
              variant={mv[9]}
            />
            <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
              <p>
                <strong>Evanildo Bechara</strong> ensina que um texto coerente não
                apenas conecta ideias (coesão) e respeita a lógica (coerência), mas
                também precisa <strong>avançar</strong> — cada frase deve acrescentar
                informação nova ao que já foi dito. Esse avanço controlado é a{" "}
                <strong>progressão temática</strong>, o motor que mantém o leitor
                engajado do primeiro ao último parágrafo. Um texto que apenas repete a
                mesma ideia com palavras diferentes — sem de fato informar nada novo —
                comete o que Bechara classifica como{" "}
                <strong>tautologia textual</strong>, um dos defeitos mais graves na
                redação técnica e um dos mais cobrados pela CESGRANRIO nos concursos
                da Petrobras.
              </p>

              <p>
                A estrutura da progressão temática se baseia no par conceitual{" "}
                <strong>Tema</strong> (a informação já conhecida, o ponto de partida)
                e <strong>Rema</strong> (a informação nova, o comentário inovador).
                Bechara explica que cada frase parte de um Tema (dado) e acrescenta
                um Rema (novo), e esse Rema se transforma no Tema da frase seguinte,
                criando uma <strong>cadeia de progressão</strong>. No relatório{" "}
                <em>&quot;A produção de petróleo no pré-sal [Tema] atingiu recorde
                histórico [Rema]. Esse recorde [Tema → antigo Rema] foi impulsionado
                pela entrada de novas plataformas [Rema novo].&quot;</em> — cada frase
                avança sobre a anterior, construindo conhecimento cumulativo.
              </p>

              <p>
                Bechara identifica três padrões clássicos de progressão que a
                CESGRANRIO cobra. A <strong>progressão linear</strong> (o Rema de
                cada frase vira o Tema da próxima) é a mais comum e direta. A{" "}
                <strong>progressão com tema constante</strong> mantém o mesmo sujeito
                ao longo de várias frases, acrescentando novos predicados:{" "}
                <em>&quot;A Petrobras investiu em tecnologia. A Petrobras reduziu
                custos. A Petrobras atingiu a meta.&quot;</em> Já a{" "}
                <strong>progressão derivada</strong> (ou com tema subdividido) parte
                de um hipertema que se ramifica em subtemas:{" "}
                <em>&quot;A empresa enfrenta três desafios: [1] a regulação, [2] a
                concorrência e [3] a transição energética.&quot;</em> O candidato precisa
                reconhecer qual padrão está em uso para avaliar se o texto está
                progredindo adequadamente.
              </p>

              <p>
                No contexto da <strong>Petrobras</strong>, a progressão temática é
                vital em documentos que precisam construir argumentos complexos:{" "}
                pareceres jurídicos, relatórios de viabilidade e comunicados ao
                mercado. Um relatório de exploração que diga{" "}
                <em>&quot;O campo de Búzios é promissor. O campo de Búzios tem grande
                potencial. Búzios pode gerar resultados positivos.&quot;</em> apresenta
                tautologia — três frases dizendo essencialmente a mesma coisa sem{" "}
                acrescentar dados concretos (volume estimado, prazo de operação,
                investimento necessário). A CESGRANRIO apresenta trechos assim e
                pergunta qual é o defeito textual, oferecendo alternativas que
                incluem &quot;incoerência&quot;, &quot;falta de coesão&quot; e &quot;falta de progressão&quot; —
                e só a última é correta.
              </p>

              <p>
                A <strong>pegadinha clássica</strong> da banca envolve textos que{" "}
                <strong>parecem</strong> progredir porque usam vocabulário variado,
                mas que na essência repetem a mesma ideia central sem avançar. É o
                chamado <strong>texto circular</strong>: ele gira em torno de um
                ponto sem jamais introduzir um dado novo. Bechara adverte que a mera
                substituição lexical (trocar &quot;importante&quot; por &quot;relevante&quot; por
                &quot;significativo&quot;) não constitui progressão — é apenas coesão lexical
                a serviço da repetição. A progressão real exige{" "}
                <strong>informação genuinamente nova</strong> a cada período. Nos
                concursos da Petrobras, dominar essa distinção é o que separa a
                análise superficial da compreensão profunda.
              </p>

              <div className="bg-gradient-to-br from-fuchsia-50 to-pink-50 dark:from-fuchsia-950/30 dark:to-pink-950/30 rounded-lg border border-fuchsia-200 dark:border-fuchsia-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground flex items-center gap-2">
                  📈 Padrões de Progressão — Diagnóstico Rápido
                </h4>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li><strong>Linear</strong> — Rema da frase 1 → Tema da frase 2. Cadeia progressiva.</li>
                  <li><strong>Tema constante</strong> — Mesmo sujeito, novos predicados a cada frase.</li>
                  <li><strong>Derivada</strong> — Um hipertema se ramifica em subtemas organizados.</li>
                  <li><strong>Tautologia</strong> — Defeito! Mesmo conteúdo com palavras diferentes = SEM progressão.</li>
                </ul>
              </div>
            </div>

            <QuizDiagnostic
              title="Diagnóstico de Fluxo"
              question="Qual o nome técnico dado por Bechara à informação 'nova' que faz o texto progredir a partir de um tema conhecido?"
              options={[
                "Catáfora, pois aponta para frente.",
                "Rema, que é o comentário inovador sobre o tema.",
                "Elipse, pois omite o que já foi dito.",
                "Silepse, por concordância ideológica.",
              ]}
              correctAnswer={1}
              explanation="Exato! O 'Rema' é a informação nova que é adicionada ao 'Tema' (informação velha), garantindo a progressão do sentido."
              variant={mv[9]}
            />
          </section>
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="O Movimento do Texto"
              description="A dinâmica de informar: como o texto caminha do conhecido para o novo sem estagnar."
              variant={mv[9]}
            />
            <ContentAccordion
              mode="stacked"
              slides={[
                {
                  titulo: "Tema vs Rema (A Teoria de Bechara)",
                  icone: <LuActivity />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base text-justify">
                        Todo texto é uma travessia contínua entre o porto seguro
                        e o mar aberto. <strong>Tema</strong> (tópico) é a
                        informação velha, a âncora que o leitor já conhece.{" "}
                        <strong>Rema</strong> (comentário) é a engrenagem nova
                        que faz o texto progredir.
                      </p>
                      <div className="p-4 bg-fuchsia-500/10 border-l-4 border-fuchsia-500 rounded-r-xl">
                        <p className="italic text-base md:text-lg text-foreground">
                          "O navio-sonda (Tema) atingiu o pré-sal (Rema 1)."
                        </p>
                        <p className="italic mt-2 text-base md:text-lg text-foreground">
                          "O pré-sal (Novo Tema) demandará novas brocas de
                          perfuração (Rema 2)."
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Tautologia: O Círculo Vicioso",
                  icone: <LuTriangleAlert />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base text-justify">
                        Oposto da progressão! A Tautologia é a estagnação
                        discursiva. É o ato criminoso de falar em círculos,
                        mascarando a repetição do <strong>Tema</strong> sob
                        novas palavras sem jamais introduzir um{" "}
                        <strong>Rema</strong> autêntico.
                      </p>
                      <p className="p-4 bg-red-500/10 border-l-4 border-red-500 rounded-r-xl italic text-base md:text-lg text-foreground">
                        "O viés de confirmação ocorre porque os funcionários
                        confirmam repetidamente as próprias suspeitas
                        enviesadas."
                        <span className="block text-sm mt-2 font-bold text-red-700/80 dark:text-red-400/80 not-italic">
                          (Rodou, rodou e não saiu do lugar. Incoerência por
                          falta de progressão).
                        </span>
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <TextAnalysisLab
            index={2}
            variant={mv[9]}
            titulo="Dossiê de Evolução"
            subtitulo="Acompanhe a progressão de ideias em um parágrafo técnico impecável."
            legenda={[
              { cor: "bg-blue-400", label: "A Âncora (Tema)" },
              { cor: "bg-fuchsia-400", label: "O Avanço (Rema)" },
            ]}
            texto={
              <div className="space-y-4 text-sm md:text-base leading-loose">
                <p>
                  "
                  <span className="bg-blue-400/30 px-1 rounded font-medium border border-blue-400/50">
                    O novo sistema de despressurização
                  </span>{" "}
                  <span className="bg-fuchsia-400/30 px-1 rounded font-medium border border-fuchsia-400/50">
                    injetou dados em tempo real na sala de controle
                  </span>
                  . Essa{" "}
                  <span className="bg-blue-400/30 px-1 rounded font-medium border border-blue-400/50">
                    agilidade de leitura
                  </span>{" "}
                  <span className="bg-fuchsia-400/30 px-1 rounded font-medium border border-fuchsia-400/50">
                    foi a responsável por evitar o colapso nas válvulas
                  </span>
                  ."
                </p>
              </div>
            }
          />

          {/* ── CONSOLIDAÇÃO M9: LESSON TABS ── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mt-12 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-fuchsia-500"></div>
            <ModuleSectionHeader
              index={3}
              title="Consolidação: A Esteira do Sentido"
              description="Acesse o resumo visual sobre Tema e Rema."
              variant={mv[9]}
            />

            <LessonTabs
              tabs={[
                {
                  id: "video",
                  label: "Vídeo Aula",
                  icone: LuPlay,
                  conteudo: (
                    <div className="aspect-video bg-zinc-900 rounded-xl flex flex-col items-center justify-center border border-zinc-800 relative overflow-hidden group cursor-pointer shadow-lg w-full max-w-3xl mx-auto">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-700"></div>
                      <div className="absolute inset-0 bg-fuchsia-900/40 mix-blend-multiply"></div>
                      <div className="w-16 h-16 rounded-full bg-fuchsia-600/90 flex items-center justify-center text-white backdrop-blur-sm group-hover:scale-110 group-hover:bg-fuchsia-500 transition-all duration-300 shadow-xl shadow-fuchsia-500/20 z-10 mb-4">
                        <LuPlay className="w-8 h-8 ml-1" />
                      </div>
                      <p className="text-fuchsia-100 font-medium z-10 text-lg">
                        Assistir: Progressão de Ideias
                      </p>
                    </div>
                  ),
                },
                {
                  id: "resumo",
                  label: "Resumo Visual",
                  icone: LuImage,
                  conteudo: (
                    <ModuleSummaryCarouselNew
                      images={[
                        {
                          type: "Dinâmica",
                          title: "Fluxo Tema-Rema",
                          placeholderColor: "bg-fuchsia-500/20",
                        },
                        {
                          type: "A Armadilha",
                          title: "Identificando a Tautologia",
                          placeholderColor: "bg-pink-500/20",
                        },
                      ]}
                    />
                  ),
                },
                {
                  id: "macetes",
                  label: "Macetes",
                  icone: LuZap,
                  conteudo: (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-fuchsia-900 to-slate-900 p-6 rounded-2xl shadow-lg border border-fuchsia-700/50">
                        <h3 className="text-fuchsia-100 font-bold mb-4">
                          A ESCADA DO TEXTO
                        </h3>
                        <p className="text-fuchsia-50/90 text-sm">
                          Na leitura, busque sempre o verbo principal da oração.
                          Aquilo que vem antes é quase sempre a retomada (Tema)
                          e aquilo que se afirma como novidade é o (Rema). Sem
                          Rema, não há progressão, apenas eco.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  id: "audio",
                  label: "Áudio",
                  icone: LuVolume2,
                  conteudo: (
                    <MusicPlayerCard
                      audioUrl="/audio/coesao-m9.mp3"
                      titulo="Pílula: O Roteiro do Texto"
                      artista="Prof. Fernando"
                      lyrics="Parágrafo de desenvolvimento que não avança é areia movediça. A Cesgranrio penaliza quem confunde repetição elegante com Tautologia estéril."
                    />
                  ),
                },
              ]}
              variant={mv[9]}
            />
          </section>

          <QuizInterativo
            questoes={quizM9}
            titulo="QUIZ: Progressão e Relevância"
            icone="🎯"
            numero={4}
            variant={mv[9]}
            onComplete={(score) => handleModuleComplete("modulo-9", score)}
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 10: ARENA DE ELITE ────────────────────────── */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <ModuleBanner
          numero={10}
          titulo="Arena de Elite"
          descricao="Simulado Final: Teste seus conhecimentos em questões de alto nível da CESGRANRIO."
          variant={mv[10]}
        />

        <div className="space-y-[50px]">
          {/* ★ RICH INTRO: Arena de Elite */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8 mb-10">
            <ModuleSectionHeader
              index="INTRO"
              title="Arena de Elite: O Crivo da Aprovação"
              description="Bem-vindo ao Lab de Questões. Aqui, a teoria de Bechara encontra a pressão da CESGRANRIO em um simulado final de alta periculosidade."
              variant={mv[10]}
            />
            <div className="space-y-6 text-lg text-foreground/85 leading-relaxed text-justify">
              <p>
                A jornada pelos nove módulos anteriores construiu, peça a peça, o
                arsenal teórico que <strong>Evanildo Bechara</strong> sistematizou ao
                longo de décadas na <em>Moderna Gramática Portuguesa</em>. Você
                dominou a coesão referencial (anáfora, catáfora, elipse, zeugma), a
                coesão lexical (hiperonímia, nominalização, palavras-sumário), a coesão
                sequencial (conectivos e seus valores semânticos reais), a distinção
                concessão vs. adversidade com ajuste modal obrigatório, os pilares da
                coerência (não-contradição, relevância, pragmática) e a progressão
                temática (Tema/Rema, tautologia). Nesta <strong>Arena de
                Elite</strong>, todo esse conhecimento será testado simultaneamente —
                exatamente como a CESGRANRIO faz na prova real da Petrobras.
              </p>

              <p>
                A banca CESGRANRIO se destaca das demais organizadoras por construir
                questões que <strong>cruzam dois ou mais mecanismos</strong> em uma
                única alternativa. Uma questão pode pedir a reescrita de um trecho
                usando concessiva (Módulo 7) e, ao mesmo tempo, exigir que o candidato
                avalie se a nova redação mantém a hiperonímia (Módulo 5) e a
                progressão temática (Módulo 9) do original. Isso significa que
                resolver uma questão isolando apenas um mecanismo é insuficiente — o
                candidato de elite precisa analisar a alternativa em{" "}
                <strong>múltiplas camadas simultâneas</strong>, verificando coesão,
                coerência e progressão de uma só vez.
              </p>

              <p>
                Bechara oferece uma estratégia de resolução que pode ser adaptada para
                a prova: ler o texto em <strong>três passagens</strong>. Na primeira,
                identificar o <strong>tema central</strong> e a{" "}
                <strong>tese do autor</strong> (coerência macro). Na segunda, mapear os{" "}
                <strong>mecanismos de coesão</strong> empregados — quais pronomes
                retomam quais referentes, quais conectivos ligam quais orações, onde há
                elipses e zeugmas. Na terceira, avaliar a{" "}
                <strong>progressão temática</strong> — o texto avança ou gira em
                círculos? Cada informação nova contribui para a argumentação? Essa
                abordagem em camadas é o que diferencia a leitura técnica da leitura
                casual, e é exatamente a competência que a CESGRANRIO mede.
              </p>

              <p>
                No universo da <strong>Petrobras</strong>, as questões de Língua
                Portuguesa da CESGRANRIO frequentemente usam textos extraídos de
                publicações reais da estatal — relatórios de sustentabilidade,
                comunicados ao mercado, artigos do blog corporativo. Isso significa
                que o candidato que estudou o vocabulário técnico do setor de
                petróleo e gás tem uma vantagem estratégica: ele reconhece os
                referentes mais rapidamente, identifica as relações de hiperonímia
                setoriais (sonda → equipamento → ativo) e compreende a coerência
                pragmática do texto sem precisar recorrer ao conhecimento geral. A
                Arena de Elite é o espaço para treinar essa leitura especializada sob
                pressão de tempo.
              </p>

              <p>
                A <strong>mentalidade vencedora</strong> nesta fase final exige
                disciplina de atleta: cada questão errada deve ser{" "}
                <strong>dissecada</strong>, não apenas revisada. Identifique{" "}
                <em>qual mecanismo</em> você não reconheceu, <em>por que</em> a
                alternativa errada parecia correta e <em>qual regra de Bechara</em>{" "}
                teria impedido o erro. Nos concursos da Petrobras, a diferença entre
                aprovação e reprovação frequentemente se resume a 2-3 questões de
                Língua Portuguesa — e são justamente as questões de coesão e
                coerência que mais eliminam candidatos tecnicamente competentes mas
                linguisticamente desatentos. Você é a elite. Prove.
              </p>

              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 rounded-lg border border-amber-200 dark:border-amber-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground flex items-center gap-2">
                  🏆 Protocolo de Resolução — 3 Camadas
                </h4>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li><strong>1ª Leitura</strong> — Tema central + tese do autor (coerência macro).</li>
                  <li><strong>2ª Leitura</strong> — Mapeamento de coesão: referentes, conectivos, elipses.</li>
                  <li><strong>3ª Leitura</strong> — Progressão temática: o texto avança ou é circular?</li>
                  <li><strong>Na dúvida</strong> — Volte à regra de Bechara. Se a alternativa viola qualquer princípio, elimine-a.</li>
                </ul>
              </div>
            </div>

            <QuizDiagnostic
              title="Mentalidade de Atleta"
              question="Qual o erro mais comum cometido pelos candidatos nas questões de Coesão Sequencial da Petrobras?"
              options={[
                "Achar que o 'conquanto' é conclusivo.",
                "Ignorar a mudança do modo verbal ao trocar o conectivo.",
                "Confundir Coesão com Coerência.",
                "Todas as alternativas anteriores.",
              ]}
              correctAnswer={3}
              explanation="Infelizmente, todas essas são falhas recorrentes. Nesta Arena, vamos treinar seu olhar para que você nunca mais caia nessas armadilhas."
              variant={mv[10]}
            />
          </section>
          <AlertBox tipo="warning" titulo="Dossie Final: O olhar do Examinador">
            Nas provas da Petrobras, a <strong>Coesão Referencial</strong>{" "}
            (Anáfora/Catáfora) é o tópico que mais cai. Revise bem os pronomes
            demonstrativos e a diferença entre o foco argumentativo do 'Mas' e
            do 'Embora'.
          </AlertBox>

          <QuizInterativo
            questoes={quizM10}
            titulo="Simulado Final de Coesão"
            icone="🏆"
            numero={1}
            variant={mv[10]}
            onComplete={(score) => handleModuleComplete("modulo-10", score)}
          />

          {/* CARD DE CONCLUSÃO MANUAL (Item final obrigatório) */}
          <section className="mt-12 mb-8">
            <div className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-900/10 dark:to-indigo-900/5 border border-violet-100 dark:border-violet-800/30 rounded-2xl p-10 text-center space-y-6 shadow-sm max-w-4xl mx-auto">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold flex items-center justify-center gap-3 text-foreground">
                  <LuTrophy className="text-violet-500 text-3xl" /> Missão
                  Cumprida!
                </h3>
                <p className="text-muted-foreground text-lg">
                  Você dominou os tecidos da Coesão e as engrenagens da
                  Coerência.
                </p>
              </div>
              <p className="text-sm opacity-70">
                Certifique-se de ter concluído todos os quizzes para garantir
                seu XP total.
              </p>
            </div>
          </section>
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
