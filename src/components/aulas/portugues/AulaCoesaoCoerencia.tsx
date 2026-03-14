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
      {/* ── MÓDULO 1: O TECIDO DO TEXTO ───────────────────────── */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="O Tecido do Texto"
          descricao="Entenda a diferença fundamental entre Coesão (forma) e Coerência (sentido) no padrão CESGRANRIO."
          gradiente="bg-gradient-to-br from-blue-700 to-sky-800"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Dualidade Textual"
              variant={getModuleVariant(1)}
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
                        <p className="text-sm">
                          Uso de pronomes, conjunções, sinônimos e pontuação
                          para ligar as frases.
                        </p>
                      </div>
                      <div className="p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                        <h4 className="font-bold text-emerald-600 mb-2">
                          Coerência (Interior/Sentido)
                        </h4>
                        <p className="text-sm">
                          Unidade lógica, ausência de contradição e relevância
                          das informações.
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
              variant={getModuleVariant(1)}
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
                      <div className="p-3 bg-blue-500/5 rounded-xl border-l-4 border-blue-500 font-mono text-sm italic">
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
                      <div className="p-3 bg-emerald-500/5 rounded-xl border-l-4 border-emerald-500 font-mono text-sm italic">
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
                      <div className="p-3 bg-cyan-500/5 rounded-xl border-l-4 border-cyan-500 font-mono text-sm italic">
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
            />

            <FlipCard
              frente={
                <div className="text-center space-y-3">
                  <div className="text-4xl">🔄</div>
                  <div className="font-bold text-lg">Anáfora vs. Catáfora</div>
                  <div className="text-sm text-muted-foreground">
                    Clique para ver a diferença essencial
                  </div>
                </div>
              }
              verso={
                <div className="space-y-4 text-sm">
                  <div className="p-3 bg-cyan-500/20 rounded-xl border border-cyan-500/30">
                    <p className="font-bold text-cyan-300 mb-1">
                      ANÁFORA — Retrovisor
                    </p>
                    <p className="text-zinc-200 italic">
                      "A turbina falhou.{" "}
                      <span className="text-cyan-300 font-bold">O equipamento</span>{" "}
                      foi substituído."
                    </p>
                    <p className="text-zinc-400 text-xs mt-1">
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
                    <p className="text-zinc-400 text-xs mt-1">
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
              variant={getModuleVariant(1)}
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

          <QuizInterativo
            questoes={quizM1}
            titulo="Fixação - Módulo 1"
            icone="🎯"
            numero={1}
            variant={getModuleVariant(1)}
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
          gradiente="bg-gradient-to-br from-cyan-700 to-teal-800"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Referenciação Anafórica"
              variant={getModuleVariant(2)}
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
            />
            <AlertBox tipo="warning" titulo="Pulo do Gato!">
              Os demonstrativos com "SS" (Esse, Essa, Isso) são tipicamente
              anafóricos. Use-os para olhar para trás!
            </AlertBox>
          </section>

          <QuizInterativo
            questoes={quizM2}
            titulo="Fixação - Módulo 2"
            icone="🎯"
            numero={2}
            variant={getModuleVariant(2)}
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
          gradiente="bg-gradient-to-br from-blue-600 to-cyan-700"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Antecipação (Catáfora)"
              variant={getModuleVariant(1)}
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
                <div className="text-center font-bold">Exemplo Clássico</div>
              }
              verso={
                <div className="space-y-2">
                  <p className="text-zinc-100 italic">
                    "Meu desejo é{" "}
                    <span className="text-primary font-black">ISTO:</span> sua
                    aprovação."
                  </p>
                  <p className="text-xs text-zinc-400">
                    O 'ISTO' não faz sentido sozinho; ele 'pede' o que vem
                    depois.
                  </p>
                </div>
              }
              variant="dark"
            />
          </section>

          <QuizInterativo
            questoes={quizM3}
            titulo="Fixação - Módulo 3"
            icone="🎯"
            numero={3}
            variant={getModuleVariant(1)}
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
          gradiente="bg-gradient-to-br from-teal-600 to-emerald-700"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={4}
              title="Coesão por Omissão"
              variant={getModuleVariant(3)}
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
                      <p className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20 font-mono text-sm italic">
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
                      <p className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20 font-mono text-sm italic">
                        "Ela gosta de café; eu, [gosto] de chá."
                      </p>
                    </div>
                  ),
                },
              ]}
            />
            <AlertBox tipo="info" titulo="Macete da Vírgula">
              A vírgula costuma marcar o lugar do verbo omitido no Zêugma. Fique
              atento a essa pontuação na Cesgranrio!
            </AlertBox>
          </section>

          <QuizInterativo
            questoes={quizM4}
            titulo="Fixação - Módulo 4"
            icone="🎯"
            numero={4}
            variant={getModuleVariant(3)}
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
          gradiente="bg-gradient-to-br from-blue-700 to-sky-800"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={5}
              title="Coesão Lexical"
              variant={getModuleVariant(1)}
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
                          <span className="text-xs text-muted-foreground block">
                            Ação
                          </span>
                          <span className="font-bold">
                            "O poço explodiu..."
                          </span>
                        </div>
                        <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl text-center">
                          <span className="text-xs text-primary block">
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
            />
          </section>

          <QuizInterativo
            questoes={quizM5}
            titulo="Fixação - Módulo 5"
            icone="🎯"
            numero={5}
            variant={getModuleVariant(1)}
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
          gradiente="bg-gradient-to-br from-orange-600 to-amber-700"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={6}
              title="Coesão Sequencial"
              variant={getModuleVariant(6)}
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
            />
          </section>

          <QuizInterativo
            questoes={quizM6}
            titulo="Fixação - Módulo 6"
            icone="🎯"
            numero={6}
            variant={getModuleVariant(6)}
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
            />
            <AlertBox tipo="danger" titulo="Não confunda!">
              Trocar 'Mas' por 'Embora' exige mudar o verbo do Indicativo para o
              Subjuntivo. A banca ADORA isso!
            </AlertBox>
          </section>

          <QuizInterativo
            questoes={quizM7}
            titulo="Fixação - Módulo 7"
            icone="🎯"
            numero={7}
            variant="rose"
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
          gradiente="bg-gradient-to-br from-emerald-600 to-teal-800"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={8}
              title="Lógica Interna"
              variant={getModuleVariant(3)}
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
                      "O navio de aço flutuou levemente como uma pluma sobre a
                      lava do vulcão." - A frase pode ser coesa, mas fere o
                      nosso conhecimento de mundo (incoerência externa).
                    </p>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM8}
            titulo="Fixação - Módulo 8"
            icone="🎯"
            numero={8}
            variant={getModuleVariant(3)}
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
          gradiente="bg-gradient-to-br from-teal-600 to-cyan-800"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={9}
              title="O Movimento do Texto"
              variant={getModuleVariant(3)}
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Progressão",
                  icone: <LuActivity />,
                  conteudo: (
                    <p className="text-muted-foreground">
                      O texto deve caminhar. Cada parágrafo deve somar uma
                      informação nova (rema) ao que já era conhecido (tema).
                    </p>
                  ),
                },
              ]}
            />
            <AlertBox tipo="warning" titulo="O Erro do Círculo">
              A <strong>Tautologia</strong> (vício de linguagem) é o inimigo da
              progressão: falar o mesmo com outras palavras sem avançar no
              sentido.
            </AlertBox>
          </section>

          <QuizInterativo
            questoes={quizM9}
            titulo="Fixação - Módulo 9"
            icone="🎯"
            numero={9}
            variant={getModuleVariant(3)}
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
          gradiente="bg-gradient-to-br from-slate-800 to-slate-950"
        />

        <div className="space-y-[50px]">
          <AlertBox tipo="warning" titulo="Dica Final">
            Nas provas da Petrobras, a coesão referencial (Anáfora/Catáfora) é o
            tópico que mais cai. Revise bem os pronomes demonstrativos!
          </AlertBox>

          <QuizInterativo
            questoes={quizM10}
            titulo="Simulado Final"
            icone="🏆"
            numero={10}
            variant={getModuleVariant(10)}
            onComplete={(score) => handleModuleComplete("modulo-10", score)}
          />
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
