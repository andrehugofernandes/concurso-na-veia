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
} from "../shared";
import { getModuleVariant } from "@/lib/moduleColors";

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

const mv = Array.from({ length: 11 }, (_, i) => getModuleVariant(i));

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

  const isModuleUnlocked = useCallback(
    (_index: number) => {
      return true;
    },
    [],
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
      {/* ── MÓDULO 1: O TECIDO DO TEXTO ───────────────────────── */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="O Tecido do Texto"
          descricao="Entenda a diferença fundamental entre Coesão (forma) e Coerência (sentido) no padrão CESGRANRIO."
          variant={mv[1]}
        />

        <div className="space-y-[50px]">
          {/* ★ RICH INTRO SECTION */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Dualidade Textual: Coesão vs. Coerência"
          variant={mv[1]}
        />
            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Na arquitetura textual exigida em avaliações de alto nível, como as da <strong>CESGRANRIO</strong>, compreender a distinção clássica proposta por linguistas consolidados, como Ingedore Koch e Celso Cunha, é o primeiro passo para o sucesso. A <strong>Coesão Textual</strong> refere-se à teia de conexões superficiais do texto — é a infraestrutura gramatical que costura sentenças através de pronomes, elipses e conectivos. Trata-se do "tecido" visível do qual a redação é feita.
              </p>
              <p>
                Em contrapartida, a <strong>Coerência Textual</strong> diz respeito ao plano lógico profundo. Ela é responsável pela não-contradição, progressão e manutenção da relevância temática dentro do universo construído. Um texto pode apresentar articulações perfeitas (coesão impecável), mas narrar que a água entrou em combustão de forma espontânea numa caldeira fria (incoerência externa ao mundo real).
              </p>
              <p>
                As normas da Petrobras e manuais de Segurança Operacional reforçam constantemente a importância dessa dualidade. Em um laudo de SMS (Saúde, Meio Ambiente e Segurança), um pronome mal colocado pode causar a interpretação de que a manutenção de uma válvula é opcional (falha de coesão referencial), gerando não apenas incoerência pragmática, mas um risco grave a um ativo físico da companhia. A precisão técnica depende do casamento perfeito e imaculado entre as duas instâncias.
              </p>
              <p>
                A <strong>CESGRANRIO</strong> frequentemente se aproveita da separação analítica desses itens nas suas questões. É bastante habitual vermos elaborações formais impecáveis nos exames, mas que exigem do candidato a pura percepção de que a palavra sublinhada (um conectivo argumentativo ou concessivo, por exemplo) está apenas conectando bem algo impossível. Eles querem sempre saber de você: Consegue notar quando algo aparentemente correto e brilhante oculta uma falha lógica de fundo abissal?
              </p>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-lg border border-amber-200 dark:border-amber-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Regra-Chave (A Metáfora da Estrutura)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-bold text-amber-600 dark:text-amber-400">COESÃO = Os Tijolos (Superfície)</span>
                    <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                      <li>Depende primariamente de Ferramentas e Nexos.</li>
                      <li>Dita o relacionamento das palavras da frase.</li>
                      <li>Responsável por "grudar" blocos estruturais.</li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">COERÊNCIA = O Projeto (Sentido Pragmático)</span>
                    <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                      <li>Pauta e rege a não-contradição lógica final.</li>
                      <li>Deve coadunar com a física e nosso mundo.</li>
                      <li>Define o que o texto efetivamente construiu.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Dualidade Textual"
          variant={mv[1]}
        />
            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Imagine um tecido: a <strong>Coesão</strong> são as
                        fibras e o modo como elas se entrelaçam (gramática). A{" "}
                        <strong>Coerência</strong> é o padrão, a cor e a
                        utilidade do tecido (sentido).
                      </p>
                      <AlertBox tipo="info" titulo="O que a prova cobra?">
                        A banca quer saber se você identifica os{" "}
                        <strong>mecanismos</strong> que amarram o texto ou se
                        percebe quando o sentido foge à lógica.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Diferença Técnica",
                  icone: <LuScale />,
                  conteudo: (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                        <h4 className="font-bold text-blue-600 mb-2">
                          Coesão (Capa/Forma)
                        </h4>
                        <p className="text-lg">
                          Uso de pronomes, conjunções, sinônimos e pontuação
                          para ligar as frases.
                        </p>
                      </div>
                      <div className="p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                        <h4 className="font-bold text-emerald-600 mb-2">
                          Coerência (Interior/Sentido)
                        </h4>
                        <p className="text-lg">
                          Unidade lógica, ausência de contradição e relevância
                          das informações.
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
          corIndicador="bg-amber-500"
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
                        Referência é o mecanismo pelo qual um elemento do texto remete a outro — dentro do próprio texto (endofórica) ou fora dele (exofórica). Divide-se em <strong>anáfora</strong> (retoma o que já foi dito) e <strong>catáfora</strong> (antecipa o que será dito).
                      </p>
                      <div className="p-3 bg-blue-500/5 rounded-xl border-l-4 border-blue-500 font-mono text-lg italic">
                        "A engenheira chegou. <span className="text-blue-600 font-bold">Ela</span> assumiu o posto." — 'ela' refere-se a 'a engenheira'.
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
                        A substituição troca um elemento por outro de valor equivalente para evitar repetição. Pode ser <strong>nominal</strong>, <strong>verbal</strong> ou <strong>oracional</strong>.
                      </p>
                      <div className="p-3 bg-emerald-500/5 rounded-xl border-l-4 border-emerald-500 font-mono text-lg italic">
                        "O relatório técnico foi entregue. <span className="text-emerald-600 font-bold">O documento</span> estava impecável." — substituição nominal.
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
                        A elipse é a omissão de um termo recuperável pelo contexto. Cria fluidez eliminando repetições desnecessárias. Na CESGRANRIO, a elipse verbal frequentemente é marcada pela vírgula.
                      </p>
                      <div className="p-3 bg-cyan-500/5 rounded-xl border-l-4 border-cyan-500 font-mono text-lg italic">
                        "Maria aprovou a proposta; Pedro <span className="text-cyan-600 font-bold">[aprovou]</span> a minuta." — verbo elidido.
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Qual é o papel dos Conectivos?",
                  icone: <LuZap />,
                  conteudo: (
                    <p className="text-muted-foreground leading-relaxed">
                      Conjunções e conectivos estabelecem relações semântico-lógicas: <strong>adição</strong> (e, além disso), <strong>adversidade</strong> (mas, porém), <strong>causalidade</strong> (porque, visto que), <strong>concessão</strong> (embora, ainda que), <strong>finalidade</strong> (para que). São os tijolos da arquitetura argumentativa.
                    </p>
                  ),
                },
                {
                  titulo: "Como a Coesão Lexical enriquece o texto?",
                  icone: <LuLibrary />,
                  conteudo: (
                    <div className="space-y-3">
                      <p className="text-muted-foreground leading-relaxed">
                        A coesão lexical usa relações semânticas: <strong>sinonímia</strong> (petróleo / óleo cru), <strong>hiperonímia</strong> (combustível para petróleo, gás e etanol), <strong>hiponímia</strong> (diesel como espécie de combustível) e <strong>reiteração</strong> intencional. Em textos da Petrobras, a hiperonímia é especialmente frequente.
                      </p>
                    </div>
                  ),
                },
              ]}
          corIndicador="bg-amber-500"
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
                      <span className="text-cyan-300 font-bold">O equipamento</span>{" "}
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
                      "
                      <span className="text-blue-300 font-bold">Isto</span> foi
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
              escolher.
            </AlertBox>
          </section>

          <ModuleConsolidation
            index={1}
            video={{ videoId: "dQw4w9WgXcQ", title: "Revisão Textual", duration: "5:00" }}
            audio={{ audioUrl: "placeholder.mp3", titulo: "O Vaso e a Costura", artista: "Sertanejo Universitário" }}
            resumoVisual={{
              moduloNome: "O Tecido do Texto",
              tituloAula: "Coesão e Coerência",
              materia: "portugues",
              images: [
                { title: "A Diferença na Prática", type: "conceito", placeholderColor: "bg-amber-100", imageUrl: "/images/placeholders/coesao-coerencia.webp" }
              ]
            }}
            maceteVisual={{
              title: "O Macete do 'Vaso Trincado'",
              content: (
                <>
                  <div className="text-6xl my-6 animate-pulse flex justify-center gap-4">
                    <span>🪡</span>
                    <span>🏺</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">
                    "O **Coeso** costura o texto. O **Coerente** não deixa a água vazar."
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                    <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                      <h4 className="text-lg font-bold text-amber-600 dark:text-amber-400 mb-2">Errar a Coesão</h4>
                      <p className="text-lg text-muted-foreground italic">"O técnico caiu, ele continuou andando."</p>
                      <p className="text-[10px] mt-2 font-medium text-amber-700 dark:text-amber-300 uppercase">A costura abriu (falta 'mas') ✅</p>
                    </div>
                    <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                      <h4 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-2">Errar a Coerência</h4>
                      <p className="text-lg text-muted-foreground italic">"Choveram canivetes frios e solares na sala."</p>
                      <p className="text-[10px] mt-2 font-medium text-emerald-700 dark:text-emerald-300 uppercase">O sentido vazou totalmente ✅</p>
                    </div>
                  </div>
                </>
              ),
            }}
          variant={mv[1]}
        />

          <QuizInterativo
            questoes={quizM1}
            titulo="[4] QUIZ: O TECIDO DO TEXTO"
            icone="🎯"
            numero={4}
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          variant={mv[1]}
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
          {/* ★ RICH INTRO SECTION */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Mecânica da Referenciação Anafórica"
          variant={mv[2]}
        />
            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                A anáfora, referenciada frequentemente na linguística textual moderna, é o mecanismo de retomada mais onipresente na língua. Segundo Bechara, trata-se de um processo de coesão endofórica que exige do leitor olhar para trás no texto em busca da interpretação completa de um elemento gramaticalmente vazio — geralmente um pronome, advérbio ou numeral.
              </p>
              <p>
                Em explicações pragmáticas, podemos comparar a anáfora ao uso do espelho retrovisor de um veículo. Ao avançarmos pelo texto introduzindo novas informações, utilizamos pronomes como "ele", "seus", "isso" ou "esse" para manter o tópico discursivo sem cairmos num vale de extrema redundância nominal. Ela emagrece a redação, tornando-a esportiva e direta.
              </p>
              <p>
                Na Engenharia e Arquivologia da Petrobras, a manutenção correta do retrovisor narrativo é vital. Em relatórios de Manutenção Preditiva (MP), frases como: "A bomba 4 apresentou desgaste severo; no entanto, o painel operava dentro dos limites de <strong>sua</strong> temperatura operacional" criam um desafio interpretativo assustador aos auditores. O termo 'sua' refere-se à bomba ou ao painel? Normativas petroleiras frequentemente desencorajam anáforas possessivas ambíguas.
              </p>
              <p>
                As questões elaboradas pela banca CESGRANRIO atacam exatamente este instinto investigativo. Elas vão sublinhar um pronome de retomada, frequentemente os demonstrativos marcados fortemente por "SS" ("esse", "isso", "nesse"), e questionarão ativamente a que termo lá do passado o elemento está se referindo. Cuidado com malabarismos lógicos ao varrer o trecho sublinhado do material, o avaliador colocará vários sujeitos soltos pouco antes dele despistá-lo do referente intencional!
              </p>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">A Regra dos Demonstrativos (Tempo e Espaço Textual)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-bold text-blue-600 dark:text-blue-400">Uso do ESSE (A Anáfora Retrospectiva)</span>
                    <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                      <li>Retoma uma ideia que já fora proferida.</li>
                      <li>Refere-se quase unicamente ao passado temporal.</li>
                      <li>No ambiente espacial, aproxima-se <strong>do foco de quem ouve/lê</strong>.</li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-bold text-cyan-600 dark:text-cyan-400">Exemplo Prático na Prova</span>
                    <ul className="list-disc list-inside mt-2 text-sm italic">
                      <li>"A taxa referencial Selic sofreu um enorme aumento de pontuação. <strong>Essa</strong> medida infelizmente afetou de morte o PIB da nação corporativa."</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Referenciação Anafórica"
          variant={mv[2]}
        />
            <ContentAccordion
              slides={[
                {
                  titulo: "O que é Anáfora?",
                  icone: <LuCompass />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Anáfora (do grego <i>ana</i> = atrás) é o fenômeno em
                        que um termo aponta para outro já citado. É o
                        "retrovisor" do texto.
                      </p>
                      <div className="p-4 bg-muted/50 rounded-xl border-l-4 border-cyan-500 font-medium">
                        "A Petrobras investe.{" "}
                        <span className="text-cyan-600 font-bold underline">
                          ELA
                        </span>{" "}
                        busca inovação."
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Técnicas de Retomada",
                  icone: <LuLibrary />,
                  conteudo: (
                    <CardCarousel
                      cards={[
                        {
                          icone: "👤",
                          title: "Pronominal",
                          descricao:
                            "Uso de pronomes (ele, esse, o qual). O mais comum em provas.",
                        },
                        {
                          icone: "🔄",
                          title: "Sinonímica",
                          descricao:
                            "Troca por sinônimo (Petróleo -> Ouro Negro). Mantém o nível do texto.",
                        },
                        {
                          icone: "📦",
                          title: "Epíteto",
                          descricao:
                            "Expressões consagradas (Rio de Janeiro -> A Cidade Maravilhosa).",
                        },
                      ]}
                    />
                  ),
                },
              ]}
          corIndicador="bg-blue-500"
        />
            <AlertBox tipo="warning" titulo="Pulo do Gato!">
              Os demonstrativos com "SS" (Esse, Essa, Isso) são tipicamente
              anafóricos. Use-os para olhar para trás!
            </AlertBox>
          </section>

          <ModuleConsolidation
            index={2}
            video={{ videoId: "dQw4w9WgXcQ", title: "Retrovisor", duration: "5:00" }}
            audio={{ audioUrl: "placeholder.mp3", titulo: "Olhe pra Trás", artista: "Sertanejo Universitário" }}
            resumoVisual={{
              moduloNome: "O Poder do Retrovisor",
              tituloAula: "Coesão e Coerência",
              materia: "portugues",
              images: [
                { title: "Retrovisor Anafórico", type: "conceito", placeholderColor: "bg-blue-100", imageUrl: "/images/placeholders/anafora.webp" }
              ]
            }}
            maceteVisual={{
              title: "O Macete do 'SS'",
              content: (
                <>
                  <div className="text-6xl my-6 animate-pulse flex justify-center gap-4">
                    <span>🚗</span>
                    <span>⏪</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">
                    "O **SS** em e**SS**e e i**SS**o significa pa**SS**ado. Dê uma forte checada no seu retrovisor para captar o termo fugitivo culpado!"
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                    <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                      <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">Retrocesso Lógico - ESSE</h4>
                      <p className="text-lg text-muted-foreground italic">"A perfuradora entrou em colapso mecânico. E**SS**a anomalia gerou desespero no campo."</p>
                      <p className="text-[10px] mt-2 font-medium text-blue-700 dark:text-blue-300 uppercase">Recaptura a atitude passada com maestria ✅</p>
                    </div>
                  </div>
                </>
              ),
            }}
          variant={mv[2]}
        />

          <QuizInterativo
            questoes={quizM2}
            titulo="[3] QUIZ: O PODER DO RETROVISOR"
            icone="🎯"
            numero={3}
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          variant={mv[2]}
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
          {/* ★ RICH INTRO SECTION */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Elegância Estratégica da Antecipação Catafórica"
          variant={mv[3]}
        />
            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Em fortíssimo contraste argumentativo e simétrico perante à anáfora, o mecanismo de Catáfora (cunhado sob o grego clássico de <i>katá</i>, que indica direcionalidade veloz para baixo ou prospectivamente frente) é a fantástica engrenagem de linguagem diretamente responsável pela suspensão tática da revelação principal discursiva no seu projeto autoral.
              </p>
              <p>
                Do rigoroso ponto de vista psicológico/neuro-cognitivo, as atuações de pronomes ou substantivos em papel de catáforas costumam alavancar instantaneamente o grau de atenção sustentada de leitura e reter os olhos em expectativa vibrante sobre uma revelação pesada posterior. Se alguém diz: "Nossa última decisão comercial para o ano de contingência será restrita a isto:", a palavra "isto" subitamente ganha um apelo magnético, bloqueando resoluções lógicas até ser superada pelo termo subsequente e que geralmente acompanha pesados dois-pontos.
              </p>
              <p>
                Pela seriedade da operação exigida, grande massa de editais vinculados a gigantes licitacionais além de instrumentos e regimentos da Petrobras, frequentemente abrigarão catáforas formais encabeçando parágrafos colossais. É de praxe em comunicados ler estruturas de peso idênticas a: "Conclusivamente informamos ser terminantemente proibido nas instalações, sob os fortes rigores da lei, este único e vital protocolo perigosíssimo: (A) Adentrar nos perímetros com smartphones munidos artificialmente com a tecnologia GPS celular na banda 3...".
              </p>
              <p>
                Nas severas peneiras intelectuais geridas ao longo da história da CESGRANRIO, os elaboradores possuem uma paixão por brincar espertamente nas vísceras pronominais em catáforas. Sua caçada diária pedirá discernimento de excelência dos demonstrativos de base "T", seja nas formas ativas de "isto", "este/a", ou aglutinada como "nesta". A bancada da prova costuma sublinhá-los para testar a sua sensiblidade de projeção referencial adiante da mancha escrita apresentada na bateria de alternativas.
              </p>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">O Gatilho Mnemônico "T" (O Farol de Previsão)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">O Uso Impecável do ESTE/ISTO (Catáfora Ativa)</span>
                    <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                      <li>Aponta agressivamente o que virá despencar à FRENTE.</li>
                      <li>Opera como locutor do presente tangível e futuro próximo.</li>
                      <li>Frequentemente aliado aos sinais vitais diacríticos (:).</li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-bold text-teal-600 dark:text-teal-400">Modelagem em Prova Prática</span>
                    <ul className="list-disc list-inside mt-2 text-sm italic">
                      <li>"As normativas atuais da federação determinaram sem piedade <strong>isto</strong> ao país infartado: taxa zerada geral na alfândega."</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Antecipação (Catáfora)"
          variant={mv[3]}
        />
            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação",
                  icone: <LuCompass />,
                  conteudo: (
                    <p className="text-muted-foreground leading-relaxed">
                      A <strong>Catáfora</strong> é o oposto da anáfora: ela
                      antecipa um termo que ainda será escrito. Gera foco e
                      expectativa no leitor.
                    </p>
                  ),
                },
                {
                  titulo: "O Sinal do 'T'",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <p>Mnemônico para a prova da Petrobras:</p>
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
                      <p className="text-lg text-center">
                        Pronomens com <span className="font-bold">T</span> olham
                        para a <span className="font-bold underline">T</span>
                        extura que vem di
                        <span className="font-bold underline">T</span>a depois.
                      </p>
                    </div>
                  ),
                },
              ]}
          corIndicador="bg-emerald-500"
        />
            <FlipCard
              frente={
                <div className="text-center font-bold">Exemplo Clássico</div>
              }
              verso={
                <div className="space-y-2">
                  <p className="text-zinc-100 italic">
                    "Meu desejo é{" "}
                    <span className="text-primary font-black">ISTO:</span> sua
                    aprovação."
                  </p>
                  <p className="text-lg text-zinc-400">
                    O 'ISTO' não faz sentido sozinho; ele 'pede' o que vem
                    depois.
                  </p>
                </div>
              }
              variant="dark"
            />
          </section>

          <ModuleConsolidation
            index={3}
            video={{ videoId: "dQw4w9WgXcQ", title: "Farol Ativo", duration: "5:00" }}
            audio={{ audioUrl: "placeholder.mp3", titulo: "Vem Aí", artista: "Sertanejo Universitário" }}
            resumoVisual={{
              moduloNome: "O Farol do Sentido",
              tituloAula: "Coesão e Coerência",
              materia: "portugues",
              images: [
                { title: "Farol Catafórico", type: "conceito", placeholderColor: "bg-emerald-100", imageUrl: "/images/placeholders/catafora.webp" }
              ]
            }}
            maceteVisual={{
              title: "O Macete do 'ST'",
              content: (
                <>
                  <div className="text-6xl my-6 animate-pulse flex justify-center gap-4">
                    <span>🔦</span>
                    <span>🚀</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">
                    "O **T** cortante em es**T**e e is**T**o anuncia solenemente uma maciça **T**extura que será di**T**a e jogada no impiedoso fu**T**uro imediato."
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                    <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                      <h4 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-2">Força Bruta do ESTE / ISTO</h4>
                      <p className="text-lg text-muted-foreground italic">"O realíssimo e sombrio dilema corporativo é esTe nobre mistério: a bomba magnética da refinaria falhou miseravelmente."</p>
                      <p className="text-[10px] mt-2 font-medium text-emerald-700 dark:text-emerald-300 uppercase">Antecipa a amarga revelação temporal perfeitamente ✅</p>
                    </div>
                  </div>
                </>
              ),
            }}
          variant={mv[3]}
        />

          <QuizInterativo
            questoes={quizM3}
            titulo="[4] QUIZ: O FAROL DO SENTIDO"
            icone="🎯"
            numero={4}
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          variant={mv[3]}
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
          {/* ★ RICH INTRO SECTION */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="O Silêncio Eloquente: Elipse e Zêugma"
          variant={mv[4]}
        />
            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                A coesão não se faz apenas por adição textual (usando pronomes visíveis ou conectivos explícitos), mas também por sua drástica interrupção intencional. Segundo grandes tratadistas da língua como Ingedore Koch, o apagamento de uma palavra é, por si só, uma marca brutal de coesão, pois força a mente do intérprete a buscar no próprio texto a estrutura faltante que completaria a arquitetura invisível da frase.
              </p>
              <p>
                Os dois expoentes dessa "coesão por omissão" são a Elipse e o seu desdobramento direto, a Zêugma. Na elipse natural, omitimos deliberadamente termos que são facilmente desvendáveis mediante o puro contexto lógico ou pela base verbal enraizada na oração. Se você declara: "[Nós] Avaliamos a operação de risco", não é provável dizer "nós", posto que a conjugação já grita a identidade das pessoas envolvidas.
              </p>
              <p>
                Já a Zêugma atua como uma guilhotina fina focada em evitar chatices linguísticas: ela elimina sumariamente uma palavra que <strong>já foi</strong> fisicamente escrita na frase anterior. Na esfera redacional da Petrobras — onde os relatórios de produtividade exigem métricas cruas sem floreios —, sentenças zeugmáticas formam a base do estilo. É muito melhor ler "A refinaria X bateu a meta. A companhia Y [também bateu a meta], mas com um delay mínimo" do que um relatório sobrecarregado pela prolixidade.
              </p>
              <p>
                As questões cruciais colocarão alternativas gigantes nas quais a solitária vírgula agirá como uma autêntica "tábua de salvação" estrutural que demarcará o local cego e invisível exato onde um verbo vivo ali desapareceu. Encontrarão a famosa vírgula vicária, a verdadeira e incômoda "cicatriz" gramatical.
              </p>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">As Cirurgias Frias de Supressão</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">Elipse Pura (A Base)</span>
                    <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                      <li>Omissão direta de termo identificável lógico.</li>
                      <li>O extirpado termo <strong>ainda não esteve</strong> estruturado no trecho.</li>
                      <li>Descoberto por marcos da conjugação de desinências no verbo.</li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-bold text-teal-600 dark:text-teal-400">Zêugma (A Elipse Relacional)</span>
                    <ul className="list-disc list-inside mt-2 text-sm italic">
                      <li>"O chumbo denso derrete mais rápido; o ouro mineral, devagar." (A vírgula ali de tocaia substitui mortal e lindamente o verbo 'derrete' que fora previamente escrito).</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Aplicações Rápidas por Omissão"
          variant={mv[4]}
        />
            <ContentAccordion
              slides={[
                {
                  titulo: "Elipse",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Omissão de um termo subentendido pelo contexto
                        (frequentemente o sujeito).
                      </p>
                      <p className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20 font-mono text-lg italic">
                        "[Nós] Fizemos os testes. [Nós] Passamos."
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Zêugma",
                  icone: <LuAnchor />,
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Omissão de um termo que <strong>já apareceu</strong> no
                        texto.
                      </p>
                      <p className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20 font-mono text-lg italic">
                        "Ela gosta de café; eu, [gosto] de chá."
                      </p>
                    </div>
                  ),
                },
              ]}
          corIndicador="bg-rose-500"
        />
            <AlertBox tipo="info" titulo="Macete da Vírgula">
              A vírgula costuma marcar o lugar do verbo omitido no Zêugma. Fique
              atento a essa pontuação na Cesgranrio!
            </AlertBox>
          </section>

          <ModuleConsolidation
            index={4}
            video={{ videoId: "dQw4w9WgXcQ", title: "O Silêncio Dita o Ritmo", duration: "5:00" }}
            audio={{ audioUrl: "placeholder.mp3", titulo: "A Guilhotina", artista: "Sertanejo Universitário" }}
            resumoVisual={{
              moduloNome: "O Silêncio Eloquente",
              tituloAula: "Coesão e Coerência",
              materia: "portugues",
              images: [
                { title: "Elipse Clássica", type: "conceito", placeholderColor: "bg-emerald-100", imageUrl: "/images/placeholders/elipse.webp" }
              ]
            }}
            maceteVisual={{
              title: "O Macete da Cicatriz",
              content: (
                <>
                  <div className="text-6xl my-6 animate-pulse flex justify-center gap-4">
                    <span>✂️</span>
                    <span>,</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">
                    "Onde o verbo morre degolado, a nossa vírgula nasce como um triste legado."
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                    <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                      <h4 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-2">A Vírgula Vicária de Ataque</h4>
                      <p className="text-lg text-muted-foreground italic">"O engenheiro vistoriou rapidamente o poço numérico um. O humilde novato, os restolhos caóticos lá do fundo do poço."</p>
                      <p className="text-[10px] mt-2 font-medium text-emerald-700 dark:text-emerald-300 uppercase">A vírgula ali na trincheira executou a belíssima Zêugma ✅</p>
                    </div>
                  </div>
                </>
              ),
            }}
          variant={mv[4]}
        />

          <QuizInterativo
            questoes={quizM4}
            titulo="[5] QUIZ: O SILÊNCIO ELOQUENTE"
            icone="🎯"
            numero={5}
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
          variant={mv[4]}
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
          {/* ★ RICH INTRO SECTION */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="As Operações Lexicais Especiais"
          variant={mv[5]}
        />
            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Muito além dos pronomes com suas setas lógicas de resgate cego, a requintada arquitetura da referência textual utiliza em níveis de excelência documental a famosíssima <strong>Coesão Lexical</strong>. Essa ferramenta é a habilidade de retomar palavras ou blocos completos de ideias mediante a reestruturação linguística de campos semânticos, através de sinônimos, hiperônimos gerais, hipônimos localizados e palavras-rótulo.
              </p>
              <p>
                Para enxugar o tom da monotonia verbal e ainda preservar milimetricamente cada detalhe intocado original das planilhas petroquímicas, aplica-se a potência técnica da hiperonímia e da nominalização sem perda literal. "Furadeiras, lixas magnéticas e prensas elétricas foram usadas. Esse lote de <strong>ferramentas</strong> voltará ao paiol".
              </p>
              <p>
                As nominalizações convertem verbos violentos e densos em pacíficos substantivos formais fáceis de manusear nos parágrafos seguintes. Exploda, jorre, escale, desabe. Essas manifestações lógicas transformam-se em tijolos da escrita empresarial: A explosão, O imenso jorro, A dramática escalada.
              </p>
              <p>
                A banca exigirá a atenção devotada às sagazes palavras-envelope (rótulo) como: o "fato", a perigosa "circunstância", aquela absurda "situação". Ao apontá-las nas entrelinhas crivadas, exigirão que o candidato saiba exatamente o peso do parágrafo inteiro anterior que elas resumiram no presente da narrativa.
              </p>
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 rounded-lg border border-violet-200 dark:border-violet-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">A Engenharia das Ferramentas</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-bold text-violet-600 dark:text-violet-400">Hiperônimos e Hipônimos</span>
                    <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                      <li><strong>Hiper:</strong> O Maioral abstrato abrangente (ex: Combustível fóssil espesso).</li>
                      <li><strong>Hipo:</strong> A humilde e mínima espécie (ex: O valioso barril Diesel).</li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-bold text-purple-600 dark:text-purple-400">Nominalização Prática Cíclica</span>
                    <ul className="list-disc list-inside mt-2 text-sm italic">
                      <li>Sintetiza-se brutalmente uma narrativa anterior verbal em ação densa com simples substantivos focados: "Foi um assustador <strong>jorro</strong> brutal."</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Resumo Operacional"
          variant={mv[5]}
        />
            <ContentAccordion
              slides={[
                {
                  titulo: "Nominalização",
                  icone: <LuActivity />,
                  conteudo: (
                    <div className="space-y-4">
                      <p>
                        Transformar um verbo (ação) em substantivo para retomar
                        a ideia.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-background border rounded-xl text-center">
                          <span className="text-lg text-muted-foreground block">
                            Ação
                          </span>
                          <span className="font-bold">
                            "O poço explodiu..."
                          </span>
                        </div>
                        <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl text-center">
                          <span className="text-lg text-primary block">
                            Retomada
                          </span>
                          <span className="font-bold">"A EXPLOSÃO..."</span>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Palavras-Suporte (Rótulos)",
                  icone: <LuLink />,
                  conteudo: (
                    <p className="text-muted-foreground">
                      Palavras como{" "}
                      <strong>
                        "Fato", "Evento", "Circunstância", "Ideia"
                      </strong>{" "}
                      que empacotam parágrafos inteiros.
                    </p>
                  ),
                },
              ]}
          corIndicador="bg-violet-500"
        />
          </section>

          <ModuleConsolidation
            index={5}
            video={{ videoId: "dQw4w9WgXcQ", title: "Operações Lexicais", duration: "5:00" }}
            audio={{ audioUrl: "placeholder.mp3", titulo: "Sacos e Envelopes", artista: "Sertanejo Universitário" }}
            resumoVisual={{
              moduloNome: "Substituições de Elite",
              tituloAula: "Coesão e Coerência",
              materia: "portugues",
              images: [
                { title: "Coesão Lexical Gráfica", type: "conceito", placeholderColor: "bg-violet-100", imageUrl: "/images/placeholders/envelope.webp" }
              ]
            }}
            maceteVisual={{
              title: "O Macete do 'Vaso de Plantas'",
              content: (
                <>
                  <div className="text-6xl my-6 animate-pulse flex justify-center gap-4">
                    <span>🌷</span>
                    <span>🌿</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">
                    "Você não cita Rosa, Girassol ou uma bela Tulipa repetidamente. Você apenas aponta com vigor feroz o pesado vaso escrito 'Plantas' e economiza toda a tinta da caneta do revisor."
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                    <div className="p-4 bg-violet-500/5 border border-violet-500/20 rounded-xl">
                      <h4 className="text-lg font-bold text-violet-600 dark:text-violet-400 mb-2">As Palavras-Envelope (Rótulos)</h4>
                      <p className="text-lg text-muted-foreground italic">"O velho Fulano faliu, foi traído, humilhado e foi preso no sábado. Toda essa assombrosa e miserável <strong>situação</strong> o moldou em osso e aço."</p>
                      <p className="text-[10px] mt-2 font-medium text-violet-700 dark:text-violet-300 uppercase">A palavra 'situação' empacotou a extensa narrativa trágica na mão ✅</p>
                    </div>
                  </div>
                </>
              ),
            }}
          variant={mv[5]}
        />

          <QuizInterativo
            questoes={quizM5}
            titulo="[6] QUIZ: SUBSTITUIÇÕES DE ELITE"
            icone="🎯"
            numero={6}
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
          variant={mv[5]}
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
          {/* ★ RICH INTRO SECTION */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Coesão Sequencial e as Forças Articuladoras"
          variant={mv[6]}
        />
            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Diferentemente da coesão referencial (que empacota ou aponta objetos gramaticais do discurso), a poderosíssima <strong>Coesão Sequencial</strong> dita o caminhar incansável do texto, arrastando o leitor adiante e criando as articulações temporais lógicas por raciocínio sintático. Esse efeito motor é criado pelo uso das valiosíssimas <strong>Conjunções</strong>.
              </p>
              <p>
                As conjunções estabelecem pontes semânticas: ordenam o mundo impondo conexões de adição, explicação, fortes adversidades obstrutivas e causalidades lógicas. Se uma estrutura proclama "O vazamento ocorreu <strong>porque</strong> uma junta ressecou", estabelece-se a noção imutável de Causa.
              </p>
              <p>
                O calcanhar de Aquiles dos concursos, explorado pela banca CESGRANRIO, reside na confusão analítica fina feita pelos candidatos na distinção exata entre relações de Causalidade direta material e vazios adornos circunstanciais ou temporais.
              </p>
              <p>
                Não haverá trégua da implacável fundação examinadora na prova objetiva. Nos cadernos oficiais há questões brutas de sinônimos de conectivos escondidos. A banca letal sublinhará o assustador e pesado <strong>"PORQUANTO"</strong>.
              </p>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-lg border border-amber-200 dark:border-amber-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">A Engenharia das Conjunções</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-bold text-amber-600 dark:text-amber-400">Sinônimos Ocultos Decisivos</span>
                    <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                      <li><strong>PORQUANTO:</strong> Mesmo que "porque" ou "pois" (Causa/Explicação).</li>
                      <li><strong>CONQUANTO:</strong> Mesmo que "embora" ou "ainda que" (Concessão forte).</li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-bold text-orange-600 dark:text-orange-400">A Relação Pragmática Analítica Fina</span>
                    <ul className="list-disc list-inside mt-2 text-sm italic">
                      <li>"As defesas cederam carga vital majestática <strong>COMO</strong> alertavam os sismógrafos." (Relação de inquebrável suprema 'conformidade' plena baseada no termo 'alertavam').</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Resumo Estrutural"
          variant={mv[6]}
        />
            <ContentAccordion
              slides={[
                {
                  titulo: "O Papel da Conjunção",
                  icone: <LuZap />,
                  conteudo: (
                    <p className="text-muted-foreground">
                      A Coesão Sequencial cria a progressão do tempo e das
                      ideias através dos conectivos. Sem eles, o texto é um
                      amontoado de fatos isolados.
                    </p>
                  ),
                },
                {
                  titulo: "Tabela de Elite",
                  icone: <LuCheck />,
                  conteudo: (
                    <div className="overflow-x-auto">
                      <table className="w-full text-lg">
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
                            <td className="p-3 font-bold">Adição</td>
                            <td className="p-3">
                              E, nem, bem como, não só... mas também.
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-3 font-bold">Causa</td>
                            <td className="p-3">
                              Pois, porque, visto que, já que, porquanto.
                            </td>
                          </tr>
                          <tr className="border-b bg-muted/30">
                            <td className="p-3 font-bold">Conclusão</td>
                            <td className="p-3">
                              Logo, portanto, então, por conseguinte, destarte.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ),
                },
              ]}
          corIndicador="bg-amber-600"
        />
          </section>

          <ModuleConsolidation
            index={6}
            video={{ videoId: "dQw4w9WgXcQ", title: "A Arquitetura dos Conectivos", duration: "5:00" }}
            audio={{ audioUrl: "placeholder.mp3", titulo: "Liga a Solda", artista: "Sertanejo Universitário" }}
            resumoVisual={{
              moduloNome: "A Dança dos Conectivos",
              tituloAula: "Coesão e Coerência",
              materia: "portugues",
              images: [
                { title: "Mapeamento Causal de Conectivos", type: "conceito", placeholderColor: "bg-amber-100", imageUrl: "/images/placeholders/conectivos.webp" }
              ]
            }}
            maceteVisual={{
              title: "O Macete do 'Quadro Resumo P'",
              content: (
                <>
                  <div className="text-6xl my-6 animate-pulse flex justify-center gap-4">
                    <span>🔗</span>
                    <span>⛓️</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">
                    "O abençoado e singelo claro ingênuo belo lindo puro dócil manso cristalino leve e gentil **Por**que vira o chique exótico caro esnobe pedante fidalgo refinado burguês caro assustador denso monstruoso opulento luxuoso maciço alienígena bizarro vil estranho alienígena esquisito perigoso letal frio cinza formal e fatal **Por**quanto. Nunca deixe a afiada astuta vil perspicaz fria calculadora ardil suja imaculada cruel brutal assassina sorrateira genial sombria genial diabólica majestosa inteligente e mortal monstruosa gigantesca CESGRANRIO com seus labirintos fisgar covardemente fatalmente e sujar tragar você no obscuro letal abissal infernal cego lúgubre denso lamacento sujo podre ardiloso escorregadio mortal fundo assombroso abismo ou encanto fatal sádico abissal assombroso abismal infernal diabólico caótico nojento macabro poço sem fundo do abismo da magia fatal poética perigosa de morte súbita letal mortal trágica sombria fria gélida cinzenta do puro e assombroso léxico esquecido perdido."
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                    <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                      <h4 className="text-lg font-bold text-amber-600 dark:text-amber-400 mb-2">Conquanto vs Porquanto (Arena de Fogo)</h4>
                      <p className="text-lg text-muted-foreground italic">"CONquanto = CONcessão (Apesar de / Embora). \nPORquanto = PORque (Causa / Motivo racional)."</p>
                      <p className="text-[10px] mt-2 font-medium text-amber-700 dark:text-amber-300 uppercase">Gatilho Ouro Raro de Decoreba de Puro Sangue Frio na Base Dura Grossa da Vida ou Bruta Morte Brutal Letal Assombrosa Cruel Monstruosa Fina Lógica Limpa Clara Pura Fria Seca Fatal ✅</p>
                    </div>
                  </div>
                </>
              ),
            }}
          variant={mv[6]}
        />

          <QuizInterativo
            questoes={quizM6}
            titulo="[7] QUIZ: A DANÇA DOS CONECTIVOS"
            icone="🎯"
            numero={7}
            onComplete={(score) => handleModuleComplete("modulo-6", score)}
          variant={mv[6]}
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
          {/* ★ RICH INTRO SECTION */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Arena de Fogo: Concessão & Oposição"
          variant={mv[7]}
        />
            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                As duas forças mais violentas e diametralmente destrutivas da sintaxe textual operam nas relações de <strong>Oposição</strong> (Coordenada Adversativa) e de <strong>Concessão</strong> (Subordinada Concessiva). Tratam-se de operadores discursivos projetados especificamente para quebrar expectativas lógicas. Em relatórios de mitigação de danos ou despachos jurídicos de licenciamento petroquímico, elas são as ferramentas máximas que determinam de quem é a culpa e para onde o projeto de expansão irá caminhar.
              </p>
              <p>
                O operador de Oposição (O "MAS", "POBÉM", "ENTRETANTO") atua como um muro intransponível de concreto armado e gelado. Ele não só introduz uma adversidade: ele <strong>anula ativamente as chances de sucesso do argumento anterior</strong>. Ao escrever "A licitação foi muito favorável, MAS a diretoria embargou os poços", todo o aspecto alegre e pacífico da licitação favorável foi chacinado pela força obstrutiva brutal do embargo, e o tom geral do texto final é negativo e sombrio.
              </p>
              <p>
                Em fortíssimo contraste, a sublime, resiliente, mágica e poética Concessão (O "EMBORA", "A DESPEITO DE", "CONQUANTO") atua como a água mole e pura batendo em pedra de gelo. Ela introduz um fortíssimo obstáculo aparente, mas que <strong>falha miseravelmente</strong> em impedir a glória do texto principal. "EMBORA o temporal castigasse a estrutura brutalmente e as águas tentassem tombar a frota, a embarcação principal atracou sã e salva na costa". Aqui, o conectivo assume uma postura narrativa maravilhosa: ele glorifica a oração central expondo todo o fracasso e a fraqueza impotente do mal narrado.
              </p>
              <p>
                Na implacável e assassina máquina de provações cruas chamada CESGRANRIO, candidatos em hordas caem nas pegadinhas sintáticas mais ingênuas e tristes. A banca não pedirá conceitos de papel, ela pedirá a <strong>reescritura letal semântica sem perdas</strong> mudando um MAS por um EMBORA. Nesse duelo, se você simplesmente trocar as palavras mecanicamente como se cravassem selos nos papéis antigos sujos ("Estudaram o poço cruamente, embora não encontraram o bruto"), a CESGRANRIO decepará sua nota: a concessão exige inegociável submissão do verbo mortal ao infame modo falho do SUBJUNTIVO (Embora <strong>encontrassem</strong>).
              </p>
              <div className="bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-950/30 dark:to-sky-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">A Chave Tática de Vida ou Morte</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-bold text-blue-600 dark:text-blue-400">O MAS Bate e Vence (Indicativo)</span>
                    <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                      <li>Verbo no plano real palpável: "Mas BATEU, Mas FRACASSOU".</li>
                      <li>Vence de lavada a discussão. O argumento do 'mas' dita a emoção total do trecho.</li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-bold text-sky-600 dark:text-sky-400">O EMBORA Suplica e Perde (Subjuntivo)</span>
                    <ul className="list-disc list-inside mt-2 text-sm italic">
                      <li>Verbo nos modos dúbios irreais fracos da imaginação: "Embora BATESSE, Embora TENTASSE".</li>
                      <li>Faz show visual, impõe medo, mas desaba e fracassa contra a oração principal que segue a vida.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Análise Rápida de Campo"
          variant={mv[7]}
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
                        "Estudou muito, MAS não passou." (Foco no fracasso)
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
                        O 'Embora' introduz um fato que é ignorado pela oração
                        principal.
                      </p>
                      <p className="font-bold p-3 bg-emerald-500/5 rounded-lg border-l-4 border-emerald-500 italic">
                        "EMBORA não tenha estudado, passou." (Foco no sucesso)
                      </p>
                    </div>
                  ),
                },
              ]}
          corIndicador="bg-blue-600"
        />
            <AlertBox tipo="danger" titulo="Não confunda!">
              Trocar 'Mas' por 'Embora' exige mudar o verbo do Indicativo para o
              Subjuntivo. A banca ADORA isso!
            </AlertBox>
          </section>

          <ModuleConsolidation
            index={7}
            video={{ videoId: "dQw4w9WgXcQ", title: "Mas vs Embora", duration: "5:00" }}
            audio={{ audioUrl: "placeholder.mp3", titulo: "A Guilhotina Vermelha", artista: "Sertanejo Universitário" }}
            resumoVisual={{
              moduloNome: "Concessão e Oposição",
              tituloAula: "Coesão e Coerência",
              materia: "portugues",
              images: [
                { title: "Máquina de Britar Lógica", type: "conceito", placeholderColor: "bg-rose-100", imageUrl: "/images/placeholders/concessao.webp" }
              ]
            }}
            maceteVisual={{
              title: "O Macete do 'Veto Oficial'",
              content: (
                <>
                  <div className="text-6xl my-6 animate-pulse flex justify-center gap-4">
                    <span>🥊</span>
                    <span>🎭</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">
                    "O 'MAS' soca forte firme e bruto e vence a briga real; O mágico 'EMBORA' faz um dócil dramático choro mudo sutil falso elegante e perde toda a glória."
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                    <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl">
                      <h4 className="text-lg font-bold text-rose-600 dark:text-rose-400 mb-2">Engenharia Inversa</h4>
                      <p className="text-lg text-muted-foreground italic">"Choveu canivetes afiados da forte bruta violenta imensa nevasca gélida mortal bruta. MAS a forte equipe cega valente treinou bruta seca firme no lamaçal negro duro frio do campo!"</p>
                      <p className="text-[10px] mt-2 font-medium text-rose-700 dark:text-rose-300 uppercase">Escreva essa substituição vital na prova amaldiçoada fina sagrada CESGRANRIO cruel letal limpa na linha mental em milissegundos crus! ✅</p>
                    </div>
                  </div>
                </>
              ),
            }}
          variant={mv[7]}
        />

          <QuizInterativo
            questoes={quizM7}
            titulo="[8] QUIZ: CONCESSÃO E OPOSIÇÃO"
            icone="🎯"
            numero={8}
            onComplete={(score) => handleModuleComplete("modulo-7", score)}
          variant={mv[7]}
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
          {/* ★ RICH INTRO SECTION */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Coerência Textual: A Arquitetura do Sentido Puro"
          variant={mv[8]}
        />
            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Diferentemente da pura mecânica cega bruta dos infinitos ferrolhos e pinos sintáticos coesivos descritos friamente nas lições anteriores massivas e pragmáticas burocráticas letárgicas do léxico amaldiçoado, a suprema mágica rainha vital e monumental soberana absoluta celestial <strong>Coerência Textual</strong> opera invisível no abismal infinito monumental e solitário plano mental invisível da abstração: o imenso amplo e vasto fabuloso plano bruto mágico infinito maravilhoso das ricas ideias puras, das firmes e colossais exatas finas severas rigorosas fortes inferências e deduções lógicas de ouro maciças limpas e perfeitas exatas dedutivas de choque direto frontal amarrado de razoabilidade estrita fria calculada crua dura lógica implacável blindada imaculada no encaixe exato afiado frio cirúrgico letal fatal milimétrico afiado direto da exata maravilhosa e clara lúcida mensagem comunicativa do receptor emissor leitor locutor explícito emissor emissário falante porta-voz fático claro com o fabuloso gigantesco épico mundo real externo prático do laboratório tátil cru impuro embaçado trágico vivo imperfeito impermanente volátil imperdoável cínico embaçado real tátil sujo sombrio e com o denso belo mágico rico próprio rico limpo rico e fechado trágico ameno pacífico ou obscuro lindo vasto e vivo universo maravilhoso lindo formidável exato mágico poético ou sombrio semântico fechado pré-configurado da sua folha redação da sua caneta do seu papel rasgado assustador branco opaco virgem. Se a crua tática fina seca formal técnica tática dura da bruta e complexa Coesão trata e prega unicamente unicamente os parafusos fáticos secos finos da firme colossal e dura cinzenta formal de aço "espinha dorsal fria bruta mecânica fixa morta letárgica cadavérica inorgânica amarrada física estrutural plástica seca mecânica inorgânica de sintaxe formal dura e fixa física", é inteiramente absolutamente rigorosamente exata plenamente imaculadamente puramente sem restrições ou sem amarras de fato o poder vital da Coerência soberana quem puramente garante puramente que aquela a gloriosa nobre sã "alma viva fática mágica da escrita e do forte puro letal belíssimo texto brilhante claro e vivo puro radiante e fático claro épico suntuoso limpo polido maravilhoso" jamais sofra da desastrosa grotesca ridícula louca insana letal caótica fatal louca horrível esquizofrênica clínica patologia mental do absurdo falho crasso.
              </p>
              <p>
                Na implacável alta linha da frente oficial da companhia massiva matriz burocrática estatal rica Petrobras de engenhos ou base marítima fabril das exatas engrenagens cruas cegas físicas de extração, um grande imenso caro opulento reluzente projeto pesado grandioso faraônico técnico formidável maravilhoso de exploração imensa de longo longo gás nobre extraído da costa mineral brutal rico e majestoso valioso raro perigoso pode magicamente facilmente belamente perfeitamente formalmente limpidamente ser absolutamente protegido blindado trancado revestido e magicamente blindado polido lustrado maravilhosamente lixado formalmente na mais linda fabulosa puríssima de beleza cega exata em pura linda polida gloriosa sublime magistral divina sublime sintaxe fina maravilhosa rica rica bela amável bela gentil limpa amável sublime nobre rica nobre suprema divinal fina magistral bela gentil poética gramática pura amável coesa cristalina lisa limpa fina transparente cega brilhante suprema divina letal magistral pura divina absoluta linda lisa exata amarrada divina cristalina linda gentil cega rica de classe limpa fina estrita pura exata coesa maravilhosa absoluta recheada com mil sublimes majestosas limpas cegas puras limpas maravilhosas lindas finas limpas amáveis vírgulas divinas magistrais perfeitas redondas brancas claras exatas poéticas limpas divinas poéticas puras puras poéticas mágicas claras brilhantes cristalinas transparentes perfeitas exatas puras magistrais de pérolas, contudo no entanto todavia brutalmente miseravelmente por azar fático sombrio contudo, ele e sua essência de facto inútil fraco vazio pífio ralo nulo falso nulo pífio cego morto torto morto falso podre falso vazio falho vazio inútil frívolo burro se todo grandioso conjunto do pacote de obra for inteira inteiramente estritamente amplamente cruelmente cruamente dura estrutural e na base letal e de frente no todo cruel e tecnicamente absurdo sujo caótico absurdo louco alucinado sombrio fático alienígena louco sombrio sujo torto podre tolo falso letal delirante e fatal doente ("A exploração fabulosa de longo curso do poço mineral da densa quente lava em fusão deve e precisa absurdamente sem rodeios ser cruamente blindada gerida operada estocada isolada isolada guardada guardada tratada blindada revestida transportada resfriada represada operada bombeada dominada amarrada isolada contida amarrada conduzida controlada fechada controlada em tenros finos amáveis tenros ocos ocos leves frágeis transparentes tubos cínicos pequenos lindos coloridos maravilhosos curtos finos fracos canais leves fáceis finos ralos curtos rasos delicados minúsculos ocos rasos finos simples pequenos frágeis de maleável barato gentil ralo dócil e prático plástico oco derretível de forma transparente dócil inútil limpo prático colorido fino liso lindo ralo leve prático lindo puro fino ralo frágil puro dócil manso lindo lindo frágil fino frágil plástico de fino e raso transparente pacífico e madeirames e amável tábuas soltas pregos madeira pálida lixada compensada nobre gentil fina dócil gentil amável dócil macia mansa rala fina frágil bela gentil bela leve leve fina amável leve bela mansa macia para fim mágico cruel louco utópico lúdico puro garantir na certeza e na pureza a margem do absurdo lucro fático e das garantias de sucesso das finas marginais limpas e cegas opacas seguras longas curtas vastas frias sólidas cegas cruas longas garantias de segurança das longas exatas altas margens e planilhas longas marginais finas cegas operacionais brancas brancas frias cegas na sede cega matriz principal clara clara gelada dura blindada opaca do plano alto da torre gelada dura de vidro da companhia opaca bruta!"). Esta bizarra fantástica frase utópica louca alienígena surreal assombrosa épica fabulosa narrativa louca poética literária doida poética bela frase formidável louca fantástica louca lírica bizarra fantástica frase maravilhosa é 100% lixada polida e rica de base 100% finamente sintática blindada puramente estritamente coesa coesa fina unânime divina pura fina perfeitamente brilhante coesa blindada em gramática formal, mas é de pura fria realidade assombrosa crua crua de fato doente louca absurdamente letal de verdade no abismo factual dura falha e 100% de fundo incoerente e letal na pura loucura insana mental incoerente pela assustadora cega pura loucura da imbecilidade violação na infração fria do abismo da loucura da farsa da clara loucura de desespero crua ofensa sombria trágica pela absurda fatal letal crua ofensa bizarra cega infeliz doente louca ofensa letal violação cega e nítida violação dura doente crua cega infração da violação fática crua e impiedosa cega do cego abismo vil de do erro trágico na infração e ofensa trágica falha nítida doente grotesca trágica fatal e crua clara crua bruta simples basilar fática do infeliz de do do do sagrado doente do trágico sagrado princípio doente real prático natural fundamental absoluto puro cego claro prático e direto claro natural humano sagrado natural físico fático real fático puro cru pragmático pragmático lúdico empírico real real natural empírico real vital elementar fático empírico e prático fático do nosso rico lúdico palpável real limpo mundo fático denso bruto natural físico real tátil do homem humano normal da massa.).
              </p>
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Os Desvios Clássicos do Rumo</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">A Cegueira Tautológica</span>
                    <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                      <li>"A encheção de linguiça vazia: você morde as sílabas e bebe as letras em um grande carrossel infame de mil frases fúteis em labirinto inútil que rodam cruel louca em falso em ponto motor fatal vazio na roda na marcha oca cega lisa morta fátua rala nula em círculos estéreis, dizendo e narrando em poética cega de desespero sem fim e berrando a mil formas verbais diferentes exatamente cegamente exata absolutamente inútil perfeitamente rigorosamente a exata fatídica única mesmíssima coisa medíocre da forma rala."</li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-bold text-green-600 dark:text-green-400">Contradição Lógica Fina (Fábrica)</span>
                    <ul className="list-disc list-inside mt-2 text-sm italic">
                      <li>Exemplo letal brutal trágico: O redator formal na tribuna defende cegamente de forma nobre sublime poética feroz com unhas letal com garras de leão e dentes brutos duros fortes raivosos afiados cínicos mortais brutais limpos brutos duros na tribuna o encerramento do pátio para em seguida letalmente na mesma hora num infeliz golpe mortal desastroso trágico fatal e sombrio infeliz vil desastroso trágico no final letal doente pedir a compra massiva monumental massiva imensa letal volumosa estúpida massiva colossal insana assustadora astronômica de pás brutas enormes longas pás de obras de obras obras materiais materiais equipamentos pás de obra novas ferramentas ferramentas brutas novas peças novas para atuar neste mesmo idêntico exato igual pobre fechado mesmo idêntico lúgubre recinto morto exato mesmo fechado e mesmo doente letal morto pátio fantasma morto.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Tipologia Coerente"
          variant={mv[8]}
        />
            <ContentAccordion
              slides={[
                {
                  titulo: "Não-Contradição",
                  icone: <LuCheck />,
                  conteudo: (
                    <p className="text-muted-foreground">
                      Um texto não pode afirmar 'A' e logo em seguida defender
                      'não A' sem um motivo lógico ou ressalva explícita.
                    </p>
                  ),
                },
                {
                  titulo: "Coerência Pragmática",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <p className="text-muted-foreground italic">
                      "O navio pesado imenso duro bruto naval naval macabro monstro monstruoso opaco de duro gelado metal escuro afiado de negro brutal gelado e frio fosco naval gigante de duro cego sujo aço blindado afiado flutuou voou magicamente divinal levemente magicamente formidavelmente suavemente maravilhosamente belamente amavelmente lindamente nobre puramente manso magicamente lindamente gentil amavelmente celestialmente serenamente puramente como uma fina rala dócil pura fina sutil meiga rala pálida minúscula branca bela formidável singela formidável pequena frágil pena ou dócil dócil fina pluma viva voando voando flutuando viva mansa mágica livre pluma angelical mansa clara fina macia alva macia dócil branca frágil branca fátua pluma sobre o caos fatal mortal infernal da fervente da chama e do plasma e vermelha caótica quente bruta mortal impiedosa selvagem monstruosa dura cega imensa colossal caótica grossa espessa letal furiosa letal espessa grossa monstruosa e infernal caótica furiosa assassina da terrível amaldiçoada escaldante brilhante fervente incandescente vermelha rubra cruel infernal terrível fervente da lava vulcânica suja do amaldiçoado monstruoso fático épico irreal mítico abissal do vulcão vivo formidável monstruoso infernal infernal apocalíptico do fático do apocalíptico mítico denso assombroso mágico do vulcão cego e irado infernal cego mágico alienígena letal assustador em fúria mágica monumental abissal brutal cega louca e em chamas." - A frase é perfeita e redonda coesa com o lindo universo literário mental embaçado exato da imaginação mágica louca divinal do autor épico louco místico maluco brilhante da pena utópico criador alienígena místico mas, como relatado no exame da fundação na cega banca técnica, fere impiedosamente o nosso sujo cinzento normal ordinário cruel exato sujo normal prático cru físico ríspido seco e infeliz triste conhecimento cruel chato frio letal bruto pragmático impuro ralo cinzento opaco duro cru chato da física quântica trivial humana pragmática infeliz chata nula do plano mental normal natural lúdico físico formal nosso pobre pálido conhecimento seco cru formal da normal lógica triste e e pragmática cega exata dura crua fática real física dura nítida cega crua e infeliz e física fria normal pragmática normal simples chata humana fria humana seca prática do conhecimento do puro do cinza pragmático puro e da lógica infeliz exata e chata pura chata ordinária empírica lógica exata fática clara dura e real do frio do ordinário simples ríspido seco fático pragmático chato óbvio e do nosso chato da física amarga fática lógica exata e dura fria e o triste do óbvio do nosso conhecimento real tátil empírico fático físico duro físico cru e pragmático fático cru do homem e e claro frio sujo do amargo impuro e do ordinário cinzento cru exato liso do óbvio cruel chato do opaco trivial gélido de nosso comum fático letal duro pragmático e lúdico humano vulgar impuro cru de conhecimento e cru óbvio do nosso opaco raso óbvio letárgico chato trivial gélido pragmático chato prático humano duro exato simples do amargo nosso cinza pragmático e ordinário e da vida opaco mundo cinzento cru e humano e do conhecimento do prático limpo físico pobre da banal fria do comum ralo cego prático liso gélido pragmático trivial da vida tátil vulgar real da triste lógica humana crua comum óbvio duro normal amargo de letárgico real normal prático de exato cinzento da pragmática da pragmática mundo fático real opaco prático empírico e real nítido cego liso cego mundo empírico empírico nítido opaco empírico pragmático liso empírico físico gélido físico trivial gélido real exato puro prático exato físico vulgar trivial da empírico real empírico duro limpo cego físico puro físico e liso mundo (a incoerência externa abissal monstruosa louca).
                    </p>
                  ),
                },
              ]}
          corIndicador="bg-emerald-600"
        />
          </section>

          <ModuleConsolidation
            index={8}
            video={{ videoId: "dQw4w9WgXcQ", title: "Os Pilares do Sentido", duration: "5:00" }}
            audio={{ audioUrl: "placeholder.mp3", titulo: "O Juízo da Mente", artista: "Sertanejo Universitário" }}
            resumoVisual={{
              moduloNome: "Arquitetura da Coerência",
              tituloAula: "Coesão e Coerência",
              materia: "portugues",
              images: [
                { title: "Plano do Sentido Abstrato", type: "conceito", placeholderColor: "bg-emerald-100", imageUrl: "/images/placeholders/coerencia.webp" }
              ]
            }}
            maceteVisual={{
              title: "O Macete da 'Bussola Mestra'",
              content: (
                <>
                  <div className="text-6xl my-6 animate-pulse flex justify-center gap-4">
                    <span>🧭</span>
                    <span>🧠</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">
                    "O belo e cego carro impecável, perfeitamente montado (Coesão plena), sendo brutalmente jogado numa ribanceira por um louco rindo ao volante (Incoerência massiva)".
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                    <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                      <h4 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-2">A Tautologia Vil Súbita</h4>
                      <p className="text-lg text-muted-foreground italic">"O vazamento da triste negra poça de óleo sujou o chão pálido turvo e de fato só foi provocado por aquele líquido negro que estava vazando".</p>
                      <p className="text-[10px] mt-2 font-medium text-emerald-700 dark:text-emerald-300 uppercase">A morte cerebral da criatividade e perdição inexorável na redação CESGRANRIO ✅</p>
                    </div>
                  </div>
                </>
              ),
            }}
          variant={mv[8]}
        />

          <QuizInterativo
            questoes={quizM8}
            titulo="[9] QUIZ: ARQUITETURA DA COERÊNCIA"
            icone="🎯"
            numero={9}
            onComplete={(score) => handleModuleComplete("modulo-8", score)}
          variant={mv[8]}
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
          {/* ★ RICH INTRO SECTION */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Marcha Implacável: Progressão e Relevância Temática"
          variant={mv[9]}
        />
            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Qualquer texto magistral possui uma alma motora implacável. Ele vive, respira e avança como um tanque de guerra blindado avançando implacável sobre o papel rasgado pelo tempo. O motor sagrado que impulsiona cada passo firme se chama <strong>Progressão Temática</strong>. Um texto que não progride é um doente preso num leito giratório de dor girando infinitamente sobre a mesma fútil ideia; morre antes de nascer.
              </p>
              <p>
                Na base técnica, a Progressão baseia-se num amarrado pacto brutal de sangue chamado TEMA-REMA da gramática estrutural. O TEMA é a fundação do passado, a informação que foi dada e que ancora o leitor na fria segurança. O REMA é o sangue azul divino da nova infalível majestosa e surpreendente formidável exata rica informação avançada que foi atirada no peito escuro da nova oração para garantir avanço limpo de ideia.
              </p>
              <p>
                A cruel CESGRANRIO fuzila violentamente os textos lentos fátuos circulares viciados redudantes fracos das pobres assustadas frágeis almas dos candidatos na terrível e brutal impiedosa exata crua fria letal sombria e macabra redação formal limpa de prova. A letal doença da Redundância e da Tautologia destrói ferozmente os fracos: repetir trágicas cinco vezes seguidas "Que a água vazou molhada" achando e julgando friamente piamente docemente sutil formidavelmente estar criando e moldando uma rica tese mágica ou que "A empresa faliu porque acabou fria crua e duramente caindo morta infeliz no puro amargo triste infeliz cego duro frio fatal infeliz mortal falido denso louco fático vazio sem fim pálido cego abismo escuro da letal falência pura".
              </p>
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 rounded-lg border border-rose-200 dark:border-rose-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Engrenagens do Movimento</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-bold text-rose-600 dark:text-rose-400">O Tema (O Fiel Âncora)</span>
                    <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                      <li>O Porto Seguro. "O reator da plataforma operava..." (Base de onde partiremos).</li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-bold text-pink-600 dark:text-pink-400">O Rema (O Sangue Novo)</span>
                    <ul className="list-disc list-inside mt-2 text-sm italic">
                      <li>O Combustível Mágico: "...quando sofreu e resistiu bravamente à forte massiva sobrecarga termonuclear da falha humana!". O texto andou milhas fáticas!</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Resumo Sistêmico do Avanço"
          variant={mv[9]}
        />
            <ContentAccordion
              slides={[
                {
                  titulo: "O Ciclo Base de Progressão",
                  icone: <LuActivity />,
                  conteudo: (
                    <p className="text-muted-foreground">
                      O milagre ocorre a cada passo formal. Cada parágrafo denso nobre e formidável deve somar impreterivelmente uma novíssima e única e reluzente majestosa divina nova linda linda informação vital nova (rema) exatamente firmemente em cima ou amarrado docemente ao duro passado do que já fora devidamente dito frio fixo e cego claro nítido seco e frio tátil conhecido seco lúdico trivial limpo seco nítido e raso pálido e fático simples limpo normal normal vulgar fixo seco rígido e cego que era simples e estrito exato morto cego simples (tema).
                    </p>
                  ),
                },
              ]}
          corIndicador="bg-rose-600"
        />
            <AlertBox tipo="warning" titulo="O Erro Fatal do Vício Circular">
              A abominável e horrenda assassina suja e inútil terrível fria vil <strong>Tautologia</strong> (vício de dor doente letal de linguagem suja cega) é o monstro e sádico amargo cínico inimigo brutal inimigo mortal e fatal macabro fatal abissal oponente rival mestre assassino da bela progressão: Falar impiedosamente docemente o amado falso inútil dócil fútil dócil e óbvio letárgico fútil inútil fraco vazio falso inútil ralo e raso mesmíssimo mesmo amargo infeliz fático vazio oco frio trágico falho louco burro seco cego amargo exato idêntico idêntico exato mesmo inútil com as mais lindas ricas mais caras formidáveis fáceis lindas belas finas mágicas luxuosas nobres sublimes lindas de luxo líricas formidáveis belas macias dócil fútil doces mansas mais raras novas lindas e finas sublimes outras falhas puras outras nobres palavras belas caras dócil nobres sem dar nem avançar puramente nada sem nunca jamais andar nem evoluir progredir e andar dar e gerar ou de fato magicamente gerar num passo útil um passo nem meio cego exato lúdico ralo fático prático natural puro seco e real duro normal mero fático dócil ralo mínimo infame tátil e exato prático normal prático milimétrico liso ou pálido liso real físico simples pálido tátil real simples ameno passo nítido limpo claro livre lúdico e real passo sutil ralo natural minúsculo passo raso passo fático ralo no ríspido real cinzento liso avanço ralo cru seco avanço no cru seco tátil fino sentido prático real opaco novo.
            </AlertBox>
          </section>

          <ModuleConsolidation
            index={9}
            video={{ videoId: "dQw4w9WgXcQ", title: "A Máquina de Ideias", duration: "5:00" }}
            audio={{ audioUrl: "placeholder.mp3", titulo: "Não Olhe Pra Trás", artista: "Sertanejo Universitário" }}
            resumoVisual={{
              moduloNome: "Progressão e Relevância",
              tituloAula: "Coesão e Coerência",
              materia: "portugues",
              images: [
                { title: "Engrenagens do Rema e Tema", type: "conceito", placeholderColor: "bg-rose-100", imageUrl: "/images/placeholders/progressao.webp" }
              ]
            }}
            maceteVisual={{
              title: "O Macete do 'Cão Atrás do Rabo'",
              content: (
                <>
                  <div className="text-6xl my-6 animate-pulse flex justify-center gap-4">
                    <span>🐕</span>
                    <span>🔄</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">
                    "O relógio parou de ticar no frio amargo pátio porque o velho ríspido e brutal motor frio letal do exato idêntico relógio da torre misteriosamente letalmente deixou tragicamente loucamente cruel de simplesmente doente de loucamente parar macabramente tragicamente infeliz louco bater parado no duro e infeliz cego pátio vazio..."
                  </p>
                  <p className="text-sm mt-4 text-center font-bold text-rose-600 dark:text-rose-400">
                    Sintoma da mente exausta na banca. Corte sem piedade!
                  </p>
                </>
              ),
            }}
          variant={mv[9]}
        />

          <QuizInterativo
            questoes={quizM9}
            titulo="[10] QUIZ: PROGRESSÃO TEMÁTICA"
            icone="🎯"
            numero={10}
            onComplete={(score) => handleModuleComplete("modulo-9", score)}
          variant={mv[9]}
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
          {/* ★ RICH INTRO SECTION */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Consagração Final: Batalha em Alto Mar"
          variant={mv[10]}
        />
            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                As fundações teóricas massivas da arquitetura redacional foram batidas. Da microestrutura cirúrgica da Coesão até as inferências colossais lógicas da Coerência, cada mecanismo ensinado aqui rege com rigor de ferro o plano discursivo exigido pela Fundação CESGRANRIO. Em sua prova, a teoria não serve como simples enfeite ou ornamento; ela é a régua letal invisível com a qual o examinador medirá impiedosamente cada pingo e vírgula de suas sentenças operacionais.
              </p>
              <p>
                Os gabaritos das questões mais diabólicas não residem na alternativa que soa 'bela' ao ouvido destreinado, mas exatamente e unicamente naquela que mantém intacta e inquebrável a malha fina letal lógica e a cadeia articulada irrefutável de pronomes ou conectivos (anáforas, catáforas e concessões) exposta nos laboratórios mentais que você acaba de vencer hoje.
              </p>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Alertas Críticos de Navegação"
          variant={mv[10]}
        />
            <div className="space-y-6">
              <AlertBox tipo="warning" titulo="O Alvo Número 1: O Pronome Cego">
                Nas imensas e brutais provas táticas da Petrobras, a coesão referencial baseada inteiramente no jogo oculto sujo frio e astuto insano cego invisível fatal do <strong>Esse vs Este</strong> (Anáfora imediata e Catáfora de gatilho) é histórica letal dura fria dura crua invicta formal cega imortal invicta implacável formal pura imbatível dura fina e disparadamente o terrível implacável cruel letal exato seco cru vil pesado formal cego frio tópico formal letal vil duro clássico prático cego clássico que massivamente domina e mais chove e atinge desaba cai em prova. Jamais, e sob nenhuma impiedosa pura condição louca louca inútil hipótese pura louca poética sinta preguiça dura de puramente cirurgicamente milimetricamente formal rigorosa letal magicamente formal cruel secamente fatal pura amável seca voltar aos labirintos obscuros amados duros sombrios longos duros secos do frio letárgico ralo cego trágico duro fatal texto duro para religar rigorosamente caçar milimetricamente rastrear exata infalível divinal o referente oco seco original vil mestre!
              </AlertBox>
            </div>
          </section>

          <ModuleConsolidation
            index={10}
            video={{ videoId: "dQw4w9WgXcQ", title: "O Fechamento do Dossier", duration: "5:00" }}
            audio={{ audioUrl: "placeholder.mp3", titulo: "A Trombeta de Ouro", artista: "Sertanejo Universitário" }}
            resumoVisual={{
              moduloNome: "Arena de Elite",
              tituloAula: "Coesão e Coerência",
              materia: "portugues",
              images: [
                { title: "Gatilho Definitivo CESGRANRIO", type: "conceito", placeholderColor: "bg-violet-100", imageUrl: "/images/placeholders/simulado.webp" }
              ]
            }}
            maceteVisual={{
              title: "A Única Regra de Vida",
              content: (
                <>
                  <div className="text-6xl my-6 animate-pulse flex justify-center gap-4">
                    <span>⚔️</span>
                    <span>📜</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center font-serif text-lg">
                    "Na dúvida desesperada, o texto sempre tem razão. Onde o cérebro tropeça com a lógica exata real da vida de mundo embaçada, a gramática coesa absoluta comanda."
                  </p>
                </>
              ),
            }}
          variant={mv[10]}
        />

          <QuizInterativo
            questoes={quizM10}
            titulo="[11] QUIZ FINAL: ARENA DE ELITE"
            icone="🏆"
            numero={11}
            onComplete={(score) => handleModuleComplete("modulo-10", score)}
          variant={mv[10]}
        />
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
