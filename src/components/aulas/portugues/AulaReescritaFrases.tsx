"use client";

import { useAulaProgress } from "@/hooks/useAulaProgress";
import { getAllModuleVariants } from "@/lib/moduleColors";
import { useState, useEffect, useCallback } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  AlertBox,
  ModuleBanner,
  QuizInterativo,
  FlipCard,
  AulaProps,
  ModuleSectionHeader,
  AulaTemplate,
  getRandomQuestions,
  CardCarousel,
  Comparison,
  QuestaoResolvidaStepByStep} from "../shared";
import { getModuleVariant } from "@/lib/moduleColors";

import {
  LuBookOpen,
  LuTarget,
  LuTriangleAlert,
  LuBrain,
  LuCheck,
  LuZap,
  LuScale,
  LuLightbulb,
  LuActivity,
  LuLink,
  LuRepeat,
  LuMic,
  LuMessagesSquare,
  LuLibrary,
  LuShieldAlert,
  LuMedal,
  LuGavel,
  LuCircle,
  LuClock,
  LuFastForward,
  LuHistory,
  LuMapPin,
  LuQuote,
  LuList,
  LuFileText,
  LuMessageCircle,
  LuTrash2,
  LuHeadphones,
  LuShieldCheck,
  LuSearch,
} from "react-icons/lu";

// Data
import {
  QUIZ_M1_REESCRITA,
  QUIZ_M2_TECNICAS,
  QUIZ_M3_VOZES,
  QUIZ_M4_DISCURSO,
  QUIZ_M5_NOMINALIZACAO,
  QUIZ_M6_CONECTIVOS,
  QUIZ_M7_PONTUACAO,
  QUIZ_M8_PARAFRASES,
  QUIZ_M9_CESGRANRIO,
  QUIZ_FINAL_REESCRITA,
} from "./data/reescrita-frases-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Fundamentos e Princípio Fundamental" },
  { id: "modulo-2", label: "Módulo 2", title: "Sinonímia e Precisão Lexical" },
  { id: "modulo-3", label: "Módulo 3", title: "Vozes Verbais: Mecânica de Troca" },
  { id: "modulo-4", label: "Módulo 4", title: "Discurso Direto vs. Indireto" },
  { id: "modulo-5", label: "Módulo 5", title: "Nominalização: Troca de Classes" },
  { id: "modulo-6", label: "Módulo 6", title: "Equivalência de Conectivos" },
  { id: "modulo-7", label: "Módulo 7", title: "Pontuação e Deslocamentos" },
  { id: "modulo-8", label: "Módulo 8", title: "Técnicas de Paráfrase" },
  { id: "modulo-9", label: "Módulo 9", title: "Laboratório CESGRANRIO" },
  { id: "modulo-10", label: "Módulo 10", title: "Avaliação de Fixação Avançada (Desafio Final)" },
];

const mv = [undefined, ...getAllModuleVariants()];

export default function AulaReescritaFrases({
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
    const STORAGE_KEY_PREFIX = "petrobras_quest_aula_portugues_reescrita_frases_";

  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}active_tab`);
      return saved || "modulo-1";
    }
    return "modulo-1";
  });

  const { completedModules: completedModulesList, updateCompletedModules } = useAulaProgress();
  const completedModules = new Set(completedModulesList);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}active_tab`, activeTab);
    }
  }, [activeTab]);

  
  const [hasSyncedInitial, setHasSyncedInitial] = useState(false);

  // Quizzes dinâmicos (seleção aleatória do pool)
  const [quizM1, setQuizM1] = useState(QUIZ_M1_REESCRITA);
  const [quizM2, setQuizM2] = useState(QUIZ_M2_TECNICAS);
  const [quizM3, setQuizM3] = useState(QUIZ_M3_VOZES);
  const [quizM4, setQuizM4] = useState(QUIZ_M4_DISCURSO);
  const [quizM5, setQuizM5] = useState(QUIZ_M5_NOMINALIZACAO);
  const [quizM6, setQuizM6] = useState(QUIZ_M6_CONECTIVOS);
  const [quizM7, setQuizM7] = useState(QUIZ_M7_PONTUACAO);
  const [quizM8, setQuizM8] = useState(QUIZ_M8_PARAFRASES);
  const [quizM9, setQuizM9] = useState(QUIZ_M9_CESGRANRIO);
  const [quizM10, setQuizM10] = useState(QUIZ_FINAL_REESCRITA);

  useEffect(() => {
    setQuizM1(getRandomQuestions(QUIZ_M1_REESCRITA, 4));
    setQuizM2(getRandomQuestions(QUIZ_M2_TECNICAS, 4));
    setQuizM3(getRandomQuestions(QUIZ_M3_VOZES, 4));
    setQuizM4(getRandomQuestions(QUIZ_M4_DISCURSO, 4));
    setQuizM5(getRandomQuestions(QUIZ_M5_NOMINALIZACAO, 4));
    setQuizM6(getRandomQuestions(QUIZ_M6_CONECTIVOS, 4));
    setQuizM7(getRandomQuestions(QUIZ_M7_PONTUACAO, 4));
    setQuizM8(getRandomQuestions(QUIZ_M8_PARAFRASES, 4));
    setQuizM9(getRandomQuestions(QUIZ_M9_CESGRANRIO, 4));
    setQuizM10(getRandomQuestions(QUIZ_FINAL_REESCRITA, 5));
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
      updateCompletedModules(Array.from(newDone));
      setHasSyncedInitial(true);
    } else if (!hasSyncedInitial && !loading && currentProgress === 0) {
      setHasSyncedInitial(true);
    }
  }, [currentProgress, hasSyncedInitial, loading]);

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 70) {
      const newSet = new Set(completedModules).add(moduleId);
      updateCompletedModules(Array.from(newSet));

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

  const isModuleUnlocked = useCallback((_index: number) => true, []);

  return (
    <AulaTemplate
      canComplete={completedModules.size >= MODULE_DEFS.length}
      lockMessage="Você precisa responder a todos os quizzes desta aula para finalizá-la."
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
      {/* ── MÓDULO 1: A ARTE DA PARÁFRASE ───────────────────────── */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="A Arte da Paráfrase"
          descricao="Entenda o binômio da reescrita perfeita: Sentido Intacto e Norma Culta Plena."
          variant="blue"
        />

        {/* ★ RICH INTRO SECTION - Módulo 1 */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="A Fundamentação da Paráfrase"
            description="Os pilares da equivalência semântica e da manutenção do sentido original segundo a norma gramatical padrão."
            variant="blue"
          />

          <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
            {/* PARÁGRAFO 1: CONCEITO CIENTÍFICO */}
            <p>
              A paráfrase constitui-se como o processo metalinguístico de
              recriação textual que preserva integralmente o conteúdo semântico
              original mediante a transposição para uma nova estrutura
              sintática. Segundo os preceitos da gramática normativa, a paráfrase distingue-se fundamentalmente do resumo
              por manter a equivalência informativa completa, operando como um
              exercício de competência linguística que testa a capacidade do
              falante de manipular as estruturas da língua sem comprometer a
              mensagem original. A banca CESGRANRIO exige o binômio
              indissociável: Sentido Original Intacto + Norma Culta Plena.
            </p>

            {/* PARÁGRAFO 2: EXPLICAÇÃO INTUITIVA */}
            <p>
              Em outras palavras, paráfrase é como traduzir o mesmo pensamento
              para um dialeto diferente da própria língua. Imagine que você tem
              uma mensagem importante para transmitir, mas precisa dizer a mesma
              coisa usando palavras e organizações completamente diferentes — é
              exatamente isso que a paráfrase propõe. A essência permanece
              intacta, mas a "roupagem" linguística é renovada, exigindo
              profundo domínio das possibilidades expressivas do português. Não
              se trata de simplificar ou complicar, mas de recodificar mantendo
              a fidelidade semântica absoluta.
            </p>

            {/* PARÁGRAFO 3: REGRAS E TÉCNICAS */}
            <p>
              As técnicas de paráfrase fundamentam-se em três operações
              principais:
              <strong>substituição lexical</strong> (troca de sinônimos
              adequados ao contexto),
              <strong>reordenação sintática</strong> (inversão da ordem dos
              termos da oração) e <strong>mudança estrutural</strong>{" "}
              (transformação entre voz ativa/passiva, alteração de classes
              gramaticais, modificação de conectivos). Cada operação exige
              atenção especial à manutenção das relações semânticas e à
              adequação ao registro formal exigido pela banca CESGRANRIO. A
              regência verbal, particularmente, constitui-se como ponto crítico
              — verbos como "visar" exigem preposição "a" quando indicam
              finalidade, detalhe que a banca explora sistematicamente.
            </p>

            {/* PARÁGRAFO 4: CONTEXTO PETROBRAS */}
            <p>
              No contexto técnico-corporativo da Petrobras, a paráfrase
              revela-se instrumental na elaboração de relatórios de segurança,
              laudos de inspeção e comunicados operacionais. Um engenheiro pode
              necessitar reestruturar um laudo sobre "incidente devido à falha
              humana" para "o incidente foi provocado pela falha humana",
              mantendo a precisão técnica mas adequando a formalidade do
              documento. A capacidade de paráfrasear adequadamente previne
              ambiguidades que poderiam comprometer a segurança operacional ou a
              tomada de decisões estratégicas em plataformas de exploração,
              refinarias ou unidades de distribuição.
            </p>

            {/* PARÁGRAFO 5: pontos de atenção CESGRANRIO */}
            <p>
              A CESGRANRIO explora sistematicamente as fronteiras da paráfrase
              adequada através de armadilhas semânticas. As questões
              frequentemente apresentam alternativas que alteram sutilezas de
              sentido — convertendo possibilidade em certeza ("talvez" →
              "apresentará"), modificando relações de causa e efeito, ou
              substituindo conectivos concessivos ("conquanto" → "porque" ou
              "sempre que"). O maior "pecado" em reescritas técnicas é a
              extrapolação — adicionar informações não contidas no original,
              como detalhes sobre causas não mencionadas ou consequências
              implícitas. O candidato deve desenvolver sensibilidade para
              identificar quando uma suposta paráfrase constitui-se, na verdade,
              em uma interpretação ou acréscimo indevido à mensagem original.
            </p>

            {/* CAIXA DE DESTAQUE: Fórmula da Paráfrase Perfeita */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-lg border border-amber-200 dark:border-amber-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">
                A Fórmula da Paráfrase CESGRANRIO
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl mb-2">🔄</div>
                  <strong>Substituição</strong>
                  <p>Sinônimos contextuais precisos</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">⚖️</div>
                  <strong>Equivalência</strong>
                  <p>Sentido 100% preservado</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">📝</div>
                  <strong>Norma Culta</strong>
                  <p>Gramaticalmente impecável</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-amber-100 dark:bg-amber-900/30 rounded text-sm">
                <strong>Regra de Ouro:</strong> Se a frase original expressa
                dúvida, a reescrita não pode expressar certeza. Se causa, não
                pode virar consequência. Se concessão, não pode virar
                explicação.
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="O Conceito de Reescritura"
              description="A mecânica da reescritura e os limites da transformação textual sem perda informativa."
              variant="blue"
            />
            <CardCarousel
              itemsPerView={2}
              cards={[
                {
                  title: "Conceituação",
                  icone: <LuBookOpen />,
                  descricao: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Reescrever um texto é transpor sua mensagem para uma
                        nova estrutura sintática sem alterar o{" "}
                        <strong>conteúdo semântico</strong>. Para a CESGRANRIO,
                        não basta estar gramaticalmente correto; a mensagem deve
                        ser 100% fiel ao original.
                      </p>
                      <AlertBox tipo="info" titulo="O Equilíbrio">
                        Se a frase original expressa uma <strong>dúvida</strong>{" "}
                        (ex: "Talvez chova"), a reescrita não pode expressar{" "}
                        <strong>certeza</strong> (ex: "Certamente choverá").
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  title: "Exemplificação",
                  icone: <LuTarget />,
                  descricao: (
                    <div className="space-y-4">
                      <p className="text-lg">
                        Veja um caso de relatórios industriais:
                      </p>
                      <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl italic">
                        "O reparo do duto garantiu a operação." (Original){" "}
                        <br />
                        "A operação foi garantida pelo reparo do duto."
                        (Reescrita correta)
                      </div>
                    </div>
                  ),
                },
                {
                  title: "Por que a Banca Cobra Reescrita?",
                  icone: <LuBrain />,
                  descricao: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        A CESGRANRIO usa a reescrita para testar se o candidato
                        realmente <strong>compreende</strong> a língua ou apenas
                        a memoriza. Uma troca aparentemente válida de conectivo
                        pode alterar sutilmente o valor lógico da sentença — por
                        isso a banca consegue eliminar candidatos que estudam só
                        regras isoladas, sem ver o conjunto.
                      </p>
                      <AlertBox tipo="info" titulo="Estratégia de Ouro">
                        Leia sempre a frase original e a reescrita em voz alta.
                        Se o significado "soar" diferente para você,
                        provavelmente está errado.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  title: "Os Dois Pilares da Paráfrase Correta",
                  icone: <LuCheck />,
                  descricao: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Toda paráfrase examinada pela banca precisa satisfazer
                        dois critérios simultâneos:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                          <p className="font-bold text-lg mb-1">
                            1. Equivalência Semântica
                          </p>
                          <p className="text-lg text-muted-foreground">
                            O sentido completo — incluindo modalidade (certeza,
                            dúvida, possibilidade) e polaridade (afirmação,
                            negação) — deve ser preservado.
                          </p>
                        </div>
                        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                          <p className="font-bold text-lg mb-1">
                            2. Correção Gramatical
                          </p>
                          <p className="text-lg text-muted-foreground">
                            A frase resultante deve obedecer à norma culta:
                            concordância, regência, crase e pontuação corretas.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
            <AlertBox tipo="danger" titulo="Erro de Extrapolação">
              Não adicione detalhes que não estão no texto. Se o autor diz que o
              lucro subiu, você não pode reescrever dizendo que ele subiu
              "devido à boa gestão" se o texto não afirmou isso.
            </AlertBox>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Tipos de Reescrita Cobrados pela Banca"
              description="O mapeamento das operações de substituição, reordenação e mudança estrutural exigidas pela banca."
              variant="blue"
            />
            <p className="text-muted-foreground leading-relaxed text-lg">
              Na reescrita, há dois planos independentes que podem ser alterados
              ou mantidos. Entender a diferença é fundamental para acertar as
              questões de múltipla escolha da CESGRANRIO.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-emerald-500/10 rounded-full shadow-inner ring-1 ring-emerald-500/20">
                      <LuTarget className="w-12 h-12 text-emerald-500" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      Manutenção de Sentido
                    </span>
                    <span className="text-sm text-emerald-500/80 font-medium">
                      O Checklist de Identidade Semântica
                    </span>
                  </div>
                }
                verso={
                  <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-2 text-emerald-500 font-bold border-b border-emerald-500/10 pb-3">
                      <LuCheck className="w-5 h-5 shrink-0" />
                      <span className="tracking-widest uppercase text-xs">
                        Dossiê de Equivalência
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      A manutenção do sentido não é apenas "parecer igual".
                      Exige a preservação da <strong>modalidade</strong>{" "}
                      (certeza vs. possibilidade), da{" "}
                      <strong>polaridade</strong> (afirmação vs. negação) e da{" "}
                      <strong>carga semântica</strong> dos conectivos.
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Para a CESGRANRIO, qualquer alteração nas relações de
                      causa e consequência invalida a reescrita. O verso da
                      moeda é a precisão: se o autor original usou "pode", você
                      não pode reescrever com "deve" sem alterar o sentido
                      lógico da proposição.
                    </p>
                  </div>
                }
                categoria="Eixo Semântico"
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-blue-500/10 rounded-full shadow-inner ring-1 ring-blue-500/20">
                      <LuLibrary className="w-12 h-12 text-blue-500" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      Adequação de Registro
                    </span>
                    <span className="text-sm text-blue-500/80 font-medium">
                      A Camaleão da Formalidade
                    </span>
                  </div>
                }
                verso={
                  <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-2 text-blue-500 font-bold border-b border-blue-500/10 pb-3">
                      <LuCheck className="w-5 h-5 shrink-0" />
                      <span className="tracking-widest uppercase text-xs">
                        Variação Diafásica
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      A reescrita permite mudar o "tom" da conversa sem ferir o
                      conteúdo. É a transição entre o registro{" "}
                      <strong>coloquial</strong> e o{" "}
                      <strong>culto padrão</strong>. Na Petrobras, prioriza-se a
                      clareza técnica e a impessoalidade administrativa.
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Exemplo CESGRANRIO: "A gente precisa de mais óleo"
                      (Informal) → "Torna-se imperativa a ampliação da extração
                      petrolífera" (Formal). O sentido é idêntico, mas a
                      vestimenta gramatical foi elevada ao padrão exigido no
                      ambiente corporativo e em provas de concurso.
                    </p>
                  </div>
                }
                categoria="Eixo Estilístico"
              />
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index="{3}"
              title="Tipos de Reescrita Cobrados pela Banca"
              description="A taxonomia das transformações textuais que garantem a aprovação no concurso."
              variant="blue"
            />
            <CardCarousel
              itemsPerView={2}
              cards={[
                {
                  icone: "🔄",
                  title: "Paráfrase Livre",
                  descricao:
                    "Reformulação completa da estrutura sintática mantendo o sentido. Ex: trocar ordem dos termos, usar voz passiva, nominalizar.",
                },
                {
                  icone: "🗣️",
                  title: "Troca de Voz Verbal",
                  descricao:
                    "Passagem da voz ativa para passiva analítica ou sintética, com ajuste de sujeito, objeto e agente da passiva.",
                },
                {
                  icone: "📋",
                  title: "Mudança de Registro",
                  descricao:
                    "Substituição de vocabulário informal por formal (ou vice-versa) sem alterar o conteúdo semântico.",
                },
                {
                  icone: "🔗",
                  title: "Substituição de Conectivo",
                  descricao:
                    "Troca de conjunção ou locução conjuntiva por outra semanticamente equivalente no contexto dado.",
                },
                {
                  icone: "📝",
                  title: "Discurso Direto → Indireto",
                  descricao:
                    "Transformação da fala direta em relato, com mudança de pronomes, tempos verbais e advérbios de tempo.",
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={4}
              title="O Que a CESGRANRIO Realmente Avalia"
              description="Desvendando o checklist de equivalência semântica e correção gramatical usado pelos examinadores."
              variant="blue"
            />
            <Comparison
              title="Questão Mal Respondida vs Bem Respondida"
              left={{
                title: "Raciocínio Superficial",
                content:
                  "'A frase está correta, então qualquer opção que pareça diferente pode ser a resposta.'",
                description:
                  "Candidatos que não analisam modalidade e polaridade erram mesmo conhecendo gramática.",
                variant: "warning",
              }}
              right={{
                title: "Raciocínio Profundo",
                content:
                  "'Verifico: sentido idêntico? Modalidade preservada? Polaridade mantida? Gramática correta?'",
                description:
                  "O candidato que segue o checklist de equivalência semântica acerta consistentemente.",
                variant: "success",
              }}
            />
            <AlertBox
              tipo="info"
              titulo="A Reescrita Como Competência Profissional"
            >
              Na Petrobras, a capacidade de reformular documentos técnicos com
              clareza e precisão é uma competência real exigida no dia a dia. A
              prova CESGRANRIO não avalia gramática pela gramática — avalia sua
              capacidade de comunicar com exatidão, essencial para engenheiros,
              técnicos e gestores da empresa.
            </AlertBox>
          </section>

          {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Segundo o padrão Cesgranrio, o que define uma reescritura como 'correta'?"
          alternativas={[
            { letra: "A", texto: "Apenas a manutenção do sentido original, mesmo com desvios gramaticais.", correta: false },
                { letra: "B", texto: "Apenas a correção gramatical rigorosa, independentemente da semântica.", correta: false },
                { letra: "C", texto: "O binômio indissociável: Sentido Original Intacto + Norma Culta Plena.", correta: true },
                { letra: "D", texto: "A simplificação do texto para torná-lo mais acessível ao leigo.", correta: false },
                { letra: "E", texto: "O uso obrigatório de sinônimos eruditos para elevar o nível do texto.", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "A banca exige que a nova frase diga EXATAMENTE o que a original disse, sem perder um átomo de sentido, e que esteja 100% dentro das regras gramaticais." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
            questoes={quizM1}
            titulo="QUIZ: A Arte da Paráfrase"
            icone="🎯"
            numero={4}
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
            variant="blue"
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 2: SINONÍMIA E CAMPO SEMÂNTICO ──────────────── */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <ModuleBanner
          numero={2}
          titulo="Sinonímia e Campo Semântico"
          descricao="Troque palavras mantendo a precisão técnica necessária para a indústria de energia."
          variant="blue"
        />

        {/* ★ RICH INTRO SECTION - Módulo 2 */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="A Arte da Substituição Lexical"
            description="O domínio do vocabulário formal e técnico da Petrobras como ferramenta de precisão na reescrita."
            variant="blue"
          />

          <div className="space-y-6 text-base text-justify text-foreground/85 leading-relaxed">
            {/* PARÁGRAFO 1: CONCEITO CIENTÍFICO */}
            <p>
              A sinonímia constitui-se como fenômeno linguístico de equivalência
              semântica que, na prática, raramente se manifesta como
              substituição perfeita e absoluta. Segundo os preceitos da gramática normativa contemporânea, os sinônimos classificam-se
              em perfeitos, imperfeitos ou relativos, sendo estes últimos os
              mais frequentes na língua corrente. A substituição lexical em
              reescritas CESGRANRIO exige compreensão profunda do campo
              semântico — o conjunto de relações de sentido que uma palavra
              mantém com outras no léxico — para garantir que a equivalência
              contextual seja preservada sem distorções semânticas.
            </p>

            {/* PARÁGRAFO 2: EXPLICAÇÃO INTUITIVA */}
            <p>
              Em outras palavras, trocar palavras é como substituir peças em um
              motor industrial — nem toda peça compatível serve para qualquer
              função. "Operar" pode significar "trabalhar" em contexto geral,
              mas "executar" em contexto técnico específico. O campo semântico
              funciona como o manual de especificações: define exatamente onde
              cada palavra pode ser aplicada sem comprometer o funcionamento da
              "máquina" textual. A reescrita bem-sucedida depende dessa precisão
              técnica — usar o sinônimo certo no contexto certo.
            </p>

            {/* PARÁGRAFO 3: REGRAS E TÉCNICAS */}
            <p>
              As técnicas de substituição lexical fundamentam-se em três
              princípios fundamentais: <strong>equivalência denotativa</strong>{" "}
              (mesmo referente no mundo real),{" "}
              <strong>compatibilidade conotativa</strong> (mesmas implicações e
              associações) e <strong>adequação sintática</strong>
              (mesma regência e estrutura). Os parônimos constituem-se como
              armadilhas clássicas — palavras com sons similares mas sentidos
              distintos, como "ratificar" (confirmar) vs "retificar" (corrigir).
              A banca explora sistematicamente essas confusões, exigindo que o
              candidato identifique quando uma substituição altera
              fundamentalmente a mensagem original.
            </p>

            {/* PARÁGRAFO 4: CONTEXTO PETROBRAS */}
            <p>
              No ambiente técnico da Petrobras, a precisão lexical torna-se
              ainda mais crítica. Em manuais de operação, "intermitente"
              descreve equipamentos que funcionam em intervalos, nunca de forma
              contínua. "Paulatinamente" indica processos graduais essenciais
              para segurança operacional, enquanto "inexorável" pode descrever
              falhas que não admitem postponement. A troca de registro
              linguístico — de "o pessoal tá vindo" para "os colaboradores estão
              chegando" — representa não apenas adequação formal, mas respeito à
              hierarquia e profissionalismo exigidos em comunicações
              corporativas.
            </p>

            {/* PARÁGRAFO 5: pontos de atenção CESGRANRIO */}
            <p>
              A CESGRANRIO explora sistematicamente as fronteiras da sinonímia
              através de testes de substituição contextual. As questões
              frequentemente apresentam alternativas que parecem sinônimas mas
              introduzem sutis alterações de sentido — "celeremente" por
              "paulatinamente" (rápido vs lento), "contínuo" por "intermitente"
              (opostos diretos), ou antônimos disfarçados. Vícios de linguagem
              como "ao meu ver" constituem-se como alvos privilegiados — a forma
              correta "a meu ver" testa se o candidato identifica
              enriquecimentos gramaticais que mantêm o sentido. O examinando
              deve desenvolver sensibilidade para distinguir equivalência
              verdadeira de similaridade enganosa.
            </p>

            {/* CAIXA DE DESTAQUE: Guia de Substituição Segura */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">
                O Teste dos Três Filtros da Substituição
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl mb-2">🎯</div>
                  <strong>Sentido</strong>
                  <p>Mesmo referente? Mesma ideia?</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">⚙️</div>
                  <strong>Contexto</strong>
                  <p>Adequado ao registro técnico?</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🔧</div>
                  <strong>Estrutura</strong>
                  <p>Mesma regência e sintaxe?</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded text-sm">
                <strong>Alerta Parônimos:</strong> Ratificar/Retificar |
                Descrição/Discrição | Emergir/Emergir | Infligir/Infringir |
                Mandado/Mandato
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Precisão das Palavras"
              description="Como escolher o termo exato que preserva a carga semântica e a elegância do registro culto."
              variant="blue"
            />
            <CardCarousel
              itemsPerView={2}
              cards={[
                {
                  title: "Campo Semântico",
                  icone: <LuLibrary />,
                  descricao: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        Um sinônimo absoluto raramente existe. O contexto é o "soberano" que define
                        se <strong>"Operar"</strong> pode ser trocado por "Trabalhar", 
                        "Executar" ou até "Cirurgiar".
                      </p>
                      <AlertBox tipo="info" titulo="Visão da Banca">
                        A CESGRANRIO adora a <strong>Sinonímia Contextual</strong>: 
                        palavras que não são sinônimas no dicionário, mas que, 
                        dentro de um parágrafo específico, exercem o mesmo papel.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  title: "Parônimos Perigosos",
                  icone: <LuTriangleAlert />,
                  descricao: (
                    <Comparison
                      title="Contraste de Sentidos"
                      left={{
                        title: "Confirmar / Validar",
                        content: "Ratificar",
                        description: "O gerente RATIFICOU a decisão (confirmou o que já havia sido dito).",
                        variant: "info"
                      }}
                      right={{
                        title: "Corrigir / Alterar",
                        content: "Retificar",
                        description: "O técnico RETIFICOU o motor (corrigiu o erro ou consertou).",
                        variant: "warning"
                      }}
                    />
                  ),
                },
                {
                  title: "O Teste da Substituição Contextual",
                  icone: <LuRepeat />,
                  descricao: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Antes de aceitar um sinônimo como válido, aplique o
                        <strong> Teste da Substituição Contextual</strong>:
                        coloque o sinônimo no lugar da palavra original e
                        verifique se o sentido e o registro se mantêm. Se a
                        frase soar estranha ou mudar de nível (formal/informal),
                        o sinônimo não serve para aquele contexto.
                      </p>
                      <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-lg space-y-2">
                        <p>
                          <strong>Original:</strong> "A empresa <em>cessou</em>{" "}
                          as atividades no campo."
                        </p>
                        <p className="text-green-600 dark:text-green-400">
                          ✅ "A empresa <em>encerrou</em> as atividades no
                          campo." (registro equivalente)
                        </p>
                        <p className="text-red-500">
                          ❌ "A empresa <em>parou</em> as atividades no campo."
                          (registro informal — inadequado em texto técnico)
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  title: "Hiperônimos, Hipônimos e Hiperonímia em Reescrita",
                  icone: <LuBrain />,
                  descricao: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        A banca frequentemente troca uma palavra específica (
                        <strong>hipônimo</strong>) por uma mais genérica (
                        <strong>hiperônimo</strong>) e pergunta se o sentido foi
                        mantido. A resposta depende do contexto: se o texto não
                        restringia o sentido ao hipônimo, a troca é válida.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-muted/50 rounded-xl border border-border">
                          <p className="font-bold text-lg mb-1">
                            Hipônimo (específico)
                          </p>
                          <p className="text-lg">
                            "A <em>fragata</em> foi recolhida ao porto."
                          </p>
                        </div>
                        <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                          <p className="font-bold text-lg mb-1">
                            Hiperônimo (genérico)
                          </p>
                          <p className="text-lg">
                            "A <em>embarcação</em> foi recolhida ao porto."
                          </p>
                          <p className="text-lg text-muted-foreground mt-1">
                            Válido se o texto não exige precisão sobre o tipo de
                            navio.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Sinonímia: Sentido Formal vs Informal"
              description="A transposição entre registros linguísticos mantendo a integridade da mensagem técnica."
              variant="blue"
            />
            <Comparison
              title="Equivalência de Registro — Exemplo Prático"
              left={{
                title: "Registro Formal (Original)",
                content: "O gerente solicitou que os técnicos revisassem os procedimentos.",
                description: "Vocabulário formal típico de ambiente corporativo/técnico.",
                variant: "info",
              }}
              right={{
                title: "Reescrita Informal (Incorreta)",
                content: "O chefe pediu que o pessoal desse uma olhada nas regras.",
                description: "Registro inadequado para o padrão Petrobras/CESGRANRIO.",
                variant: "warning",
              }}
            />
            <AlertBox
              tipo="warning"
              titulo="Atenção ao Registro em Provas Petrobras"
            >
              As questões da CESGRANRIO para a Petrobras exigem manutenção do
              registro <strong>formal e técnico</strong>. Substituições que
              informalizem o texto são consideradas incorretas.
            </AlertBox>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Pares de Palavras que a Banca Adora Confundir"
              description="As armadilhas de paronímia que a CESGRANRIO utiliza para induzir ao erro."
              variant="blue"
            />
            <div className="space-y-12">
              <Comparison
                title="Emergência vs. Destaque"
                left={{
                  title: "Imediato / Prestes a ocorrer",
                  content: "Iminente",
                  description: "Risco iminente exige parada imediata da produção.",
                  variant: "danger"
                }}
                right={{
                  title: "Elevado / Ilustre",
                  content: "Eminente",
                  description: "Eminente geofísico destaca a autoridade do profissional.",
                  variant: "info"
                }}
              />

              <Comparison
                title="Punição vs. Violação"
                left={{
                  title: "Aplicar / Impor",
                  content: "Infligir",
                  description: "Infligir a multa contratual (aplicar a pena).",
                  variant: "warning"
                }}
                right={{
                  title: "Desrespeitar / Quebrar",
                  content: "Infringir",
                  description: "Infringir as normas de segurança (violar a regra).",
                  variant: "success"
                }}
              />
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={4}
              title="Léxico Técnico Petrobras"
              description="O vocabulário específico da indústria aplicado a questões de reescrita."
              variant="blue"
            />
            <CardCarousel
              itemsPerView={2}
              cards={[
                {
                  icone: "🛢️",
                  title: "Exploração / Prospecção",
                  descricao: "Prospecção é a fase inicial; exploração é o termo técnico regulatório.",
                },
                {
                  icone: "📄",
                  title: "Contrato / Instrumento",
                  descricao: "Instrumento contratual é o termo formal para acordos e termos aditivos.",
                },
              ]}
            />
          </section>

          {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Ao substituir 'O gerente ratificou a decisão' por 'O gerente retificou a decisão', o que ocorre?"
          alternativas={[
            { letra: "A", texto: "O sentido é preservado integralmente.", correta: false },
                { letra: "B", texto: "O sentido é invertido (confirmar vira corrigir).", correta: true },
                { letra: "C", texto: "Apenas o som da palavra muda, mas o campo semântico é o mesmo.", correta: false },
                { letra: "D", texto: "A frase torna-se agramatical.", correta: false },
                { letra: "E", texto: "A regência do verbo muda obrigatoriamente.", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Ratificar = Confirmar." },
            { titulo: "Passo 2", conteudo: "Retificar = Corrigir." },
            { titulo: "Passo 3", conteudo: "São parônimos perigosos em provas de reescrita." }
          ]}
        />
        <QuizInterativo
            questoes={quizM2}
            titulo="QUIZ: Sinonímia e Campo Semântico"
            icone="🎯"
            numero={2}
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
            variant="blue"
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 3: VOZES VERBAIS ──────────────────────────── */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <ModuleBanner
          numero={3}
          titulo="Vozes Verbais"
          descricao="A travessia entre Ativa e Passiva é o tema predileto da banca. Aprenda a não perder o tempo."
          variant="blue"
        />

        {/* ★ RICH INTRO SECTION - Módulo 3 */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="A Mecânica da Transformação Verbal"
            description="A arquitetura da transposição entre ativa e passiva, focando na concordância e no tempo verbal."
            variant="blue"
          />

          <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
            {/* PARÁGRAFO 1: CONCEITO CIENTÍFICO */}
            <p>
              A voz verbal constitui-se como categoria gramatical que indica a
              relação entre o sujeito e o processo verbal, estabelecendo quem
              pratica ou recebe a ação. Segundo os preceitos gramaticais, as vozes
              verbais em português classificam-se em ativa, passiva analítica,
              passiva pronominal e reflexiva, cada uma com características
              estruturais específicas que determinam a organização sintática da
              oração. Na voz ativa, o sujeito pratica a ação; na passiva, recebe
              a ação; na reflexiva, pratica e recebe a ação simultaneamente. A
              CESGRANRIO explora sistematicamente as transformações entre essas
              estruturas, exigindo domínio absoluto da mecânica de transposição.
            </p>

            {/* PARÁGRAFO 2: EXPLICAÇÃO INTUITIVA */}
            <p>
              Em outras palavras, transformar a voz verbal é como reorganizar o
              organograma de uma empresa — mudando quem comanda e quem executa,
              mas mantendo a mesma tarefa. Na voz ativa, "o engenheiro
              supervisiona a obra" (engenheiro = agente). Na voz passiva, "a
              obra é supervisionada pelo engenheiro" (obra = paciente,
              engenheiro = agente da passiva). É a mesma relação de poder
              invertida, como trocar as posições no organograma sem alterar a
              função original. A reescrita bem-sucedida depende dessa
              compreensão estrutural — identificar quem faz o quê e reorganizar
              sem perder as relações de autoridade.
            </p>

            {/* PARÁGRAFO 3: REGRAS E TÉCNICAS */}
            <p>
              As técnicas de transposição vocal fundamentam-se em princípios
              rigorosos: <strong>manutenção do tempo verbal</strong> (pretérito
              perfeito permanece pretérito perfeito),{" "}
              <strong>concordância adequada</strong> (na passiva pronominal, o
              verbo concorda com o sujeito paciente), e{" "}
              <strong>preservação do agente</strong>
              (quando explicitado). A voz passiva analítica utiliza o auxiliar
              "ser" + particípio, enquanto a pronominal emprega o pronome "se"
              com verbo concordante. Verbos transitivos indiretos com preposição
              não admitem voz passiva — o "se" torna-se índice de indeterminação
              do sujeito, como em "Precisa-se de técnicos" (não "Técnicos são
              precisados").
            </p>

            {/* PARÁGRAFO 4: CONTEXTO PETROBRAS */}
            <p>
              No contexto técnico da Petrobras, a escolha da voz verbal impacta
              diretamente a clareza dos relatórios operacionais. "A equipe
              realizou a inspeção" (voz ativa) enfatiza a responsabilidade da
              equipe, enquanto "A inspeção foi realizada pela equipe" (voz
              passiva) destaca o procedimento em si. Em laudos de segurança, a
              voz passiva é frequentemente preferida para objetivar:
              "Injetaram-se produtos químicos no poço" (passiva pronominal)
              indica que a ação ocorreu sem especificar o agente, focando no
              processo. A compreensão dessas nuances é essencial para elaborar
              documentos técnicos adequados aos padrões da indústria.
            </p>

            {/* PARÁGRAFO 5: pontos de atenção CESGRANRIO */}
            <p>
              A CESGRANRIO explora sistematicamente as armadilhas da
              transposição vocal. As questões frequentemente testam:
              concordância na passiva pronominal ("Injetaram-se produtos" vs
              "*Injetou-se produtos"), identificação de verbos que não admitem
              passiva (transitivos indiretos), manutenção do tempo verbal
              ("serão alcançadas" → "alcançaremos"), e distinção entre voz
              passiva e índice de indeterminação ("Precisa-se de técnicos"). O
              examinando deve desenvolver sensibilidade para identificar quando
              a transformação é gramaticalmente impossível ou quando altera
              sutilmente o sentido original, especialmente em relação à
              explicitação ou ocultação do agente da ação.
            </p>

            {/* CAIXA DE DESTAQUE: Algoritmo de Transposição */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">
                O Algoritmo das Três Etapas
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl mb-2">🔄</div>
                  <strong>Identifique</strong>
                  <p>Sujeito, verbo, objeto direto</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">⚙️</div>
                  <strong>Transponha</strong>
                  <p>Objeto → sujeito + ser + particípio</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">✅</div>
                  <strong>Verifique</strong>
                  <p>Tempo verbal e concordância</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded text-sm">
                <strong>Regra Crítica:</strong> Se o verbo na ativa está no
                futuro, a passiva usa "ser" no futuro (será feito). Se no
                pretérito perfeito, "ser" vai para o pretérito perfeito (foi
                feito).
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Travessia (Vozes)"
              description="O passo a passo para converter estruturas sem alterar o foco da ação ou a polaridade da frase."
              variant="blue"
            />
            <CardCarousel
              itemsPerView={2}
              cards={[
                {
                  title: "A Regra do Tempo",
                  icone: <LuZap />,
                  descricao: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        O tempo verbal <strong>nunca</strong> muda na
                        transposição de voz.
                      </p>
                      <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                        <p className="text-lg">
                          Se o verbo na ativa está no{" "}
                          <strong>Pretérito Imperfeito</strong> ("fazia"), o
                          verbo <i>ser</i> na passiva deve ir para o{" "}
                          <strong>Pretérito Imperfeito</strong> ("era feito").
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  title: "Como Converter: Voz Ativa → Passiva Analítica",
                  icone: <LuRepeat />,
                  descricao: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Siga o algoritmo de três passos para a conversão
                        perfeita:
                      </p>
                      <ol className="list-decimal pl-5 text-lg space-y-2 text-muted-foreground">
                        <li>
                          O <strong>objeto direto</strong> da ativa vira o
                          <strong> sujeito paciente</strong> da passiva.
                        </li>
                        <li>
                          O verbo da ativa é substituído por{" "}
                          <strong>SER (no mesmo tempo) + particípio</strong> do
                          verbo original.
                        </li>
                        <li>
                          O <strong>sujeito</strong> da ativa vira o{" "}
                          <strong>agente da passiva</strong>, introduzido pela
                          preposição <em>por</em> (ou <em>pelo/pela</em>).
                        </li>
                      </ol>
                      <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-lg">
                        <p>
                          <strong>Ativa:</strong> A Petrobras produziu o
                          relatório.
                        </p>
                        <p className="mt-1">
                          <strong>Passiva:</strong> O relatório foi produzido
                          pela Petrobras.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  title: "Voz Passiva Sintética (Pronome 'se')",
                  icone: <LuBookOpen />,
                  descricao: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        A passiva sintética usa o pronome <strong>se</strong>{" "}
                        como índice de indeterminação do sujeito (partícula
                        apassivadora). O sujeito da ativa é completamente
                        omitido — não há agente da passiva.
                      </p>
                      <div className="p-4 bg-muted/50 border border-border rounded-xl text-lg space-y-1">
                        <p>
                          <strong>Analítica:</strong> Os contratos foram
                          assinados pela diretoria.
                        </p>
                        <p>
                          <strong>Sintética:</strong> Assinaram-se os contratos.
                        </p>
                        <p className="text-lg text-muted-foreground mt-2">
                          Atenção: na sintética, o verbo concorda com o sujeito
                          paciente que o segue.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  title: "A Nominalização como Passiva Velada",
                  icone: <LuTriangleAlert />,
                  descricao: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        A banca usa nominalizações para criar "falsas passivas"
                        que confundem candidatos. Quando um verbo se torna
                        substantivo, a relação ativo/passivo some — e você
                        precisa reconstruir quem faz e quem recebe a ação.
                      </p>
                      <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl text-lg space-y-1">
                        <p>
                          <strong>Verbal (ativa):</strong> A equipe realizou a
                          inspeção.
                        </p>
                        <p>
                          <strong>Nominalizado:</strong> A realização da
                          inspeção pela equipe...
                        </p>
                        <p className="text-lg text-muted-foreground mt-2">
                          O agente "pela equipe" preserva a relação de autoria
                          da ação mesmo sem verbo conjugado.
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />

            <Comparison
              title="Voz Ativa vs. Passiva Analítica"
              left={{
                title: "Voz Ativa",
                content: "O navio transportava o óleo.",
                description: "Foco no agente (Navio). Tempo: Pret. Imperfeito.",
                variant: "info",
              }}
              right={{
                title: "Voz Passiva",
                content: "O óleo era transportado pelo navio.",
                description: "Foco no objeto. Verbo SER no Pret. Imperfeito.",
                variant: "success",
              }}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Armadilha CESGRANRIO: Passiva em Forma de Nominalização"
              description="Como a banca oculta a voz passiva em estruturas nominais para testar sua percepção sintática."
              variant="blue"
            />
            <AlertBox
              tipo="danger"
              titulo="Armadilha CESGRANRIO — Passiva Disfarçada"
            >
              A banca frequentemente apresenta nominalizações como reescritas
              válidas de frases na voz ativa. O erro está em omitir o agente ou
              alterar quem realiza a ação. Exemplo clássico: "A empresa decidiu
              contratar" ≠ "A contratação foi decidida" — nesta última, o agente
              da decisão ficou ambíguo.
            </AlertBox>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-emerald-500/10 rounded-full shadow-inner ring-1 ring-emerald-500/20">
                      <LuRepeat className="w-12 h-12 text-emerald-500" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      Estrutura da V.P.A.
                    </span>
                    <span className="text-sm text-emerald-500/80 font-medium">
                      O Verbo SER como Âncora
                    </span>
                  </div>
                }
                verso={
                  <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-2 text-emerald-500 font-bold border-b border-emerald-500/10 pb-3">
                      <LuCheck className="w-5 h-5 shrink-0" />
                      <span className="tracking-widest uppercase text-xs">
                        Mecânica Analítica
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Na voz passiva analítica, o verbo auxiliar{" "}
                      <strong>SER</strong> é quem carrega toda a
                      responsabilidade temporal. Ele deve espelhar exatamente o
                      tempo e modo do verbo original na voz ativa.
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Ex: "A banca <strong>elaborará</strong> (Futuro do
                      Presente) o edital" → "O edital <strong>será</strong>{" "}
                      (Futuro do Presente) <strong>elaborado</strong>". O verbo
                      principal entra apenas com sua carga semântica na forma de
                      particípio, perdendo sua flexão original para o auxiliar.
                    </p>
                  </div>
                }
                categoria="Morfossintaxe"
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-amber-500/10 rounded-full shadow-inner ring-1 ring-amber-500/20">
                      <LuScale className="w-12 h-12 text-amber-500" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      Particípio Abundante
                    </span>
                    <span className="text-sm text-amber-500/80 font-medium">
                      O Equilíbrio das Formas
                    </span>
                  </div>
                }
                verso={
                  <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-2 text-amber-500 font-bold border-b border-amber-500/10 pb-3">
                      <LuCheck className="w-5 h-5 shrink-0" />
                      <span className="tracking-widest uppercase text-xs">
                        Regra de Ouro: T.H.A.S.
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Muitos verbos possuem duas formas de particípio. Use o{" "}
                      <strong>Regular</strong> (-ado/-ido) com os auxiliares{" "}
                      <strong>TER</strong> ou <strong>HAVER</strong> (Tem
                      aceitado). Use o <strong>Irregular</strong> (forma curta)
                      com <strong>SER</strong> ou <strong>ESTAR</strong> (É
                      aceito).
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      A CESGRANRIO tenta induzir ao erro de eufonia: "O contrato
                      foi <i>imprimido</i>" (Errado) vs "O contrato foi{" "}
                      <strong>impresso</strong>" (Correto). Em reescritas, a
                      correção gramatical do particípio é critério eliminatório
                      imediato, independentemente da manutenção do sentido.
                    </p>
                  </div>
                }
                categoria="Morfossintaxe"
              />
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Casos Especiais de Voz Passiva"
              description="A análise de verbos que não admitem passiva e a função do 'se' como partícula apassivadora."
              variant="blue"
            />
            <CardCarousel
              itemsPerView={2}
              cards={[
                {
                  title: "Verbos que Não Admitem Passiva",
                  icone: <LuTriangleAlert />,
                  descricao: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        Nem todo verbo transitivo direto pode ser passivizado.
                        Verbos de medida, peso, duração e valor geralmente ficam
                        apenas na voz ativa:
                      </p>
                      <div className="p-4 bg-muted/50 rounded-xl border border-border text-lg space-y-1">
                        <p>
                          ❌ "Dois anos foram durados pelo projeto." (errado)
                        </p>
                        <p className="text-green-600 dark:text-green-400">
                          ✅ "O projeto durou dois anos." (correto — apenas
                          ativa)
                        </p>
                        <p className="mt-2">
                          ❌ "Mil metros foram medidos pelo cabo." (inadequado)
                        </p>
                        <p className="text-green-600 dark:text-green-400">
                          ✅ "O cabo mediu mil metros." (correto)
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  title:
                    "Voz Passiva com ESTAR + Particípio (Passiva de Estado)",
                  icone: <LuZap />,
                  descricao: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        Além da passiva com SER (que indica processo), existe a
                        passiva de estado com ESTAR (que indica resultado/estado
                        permanente). A banca usa essa distinção em questões de
                        reescrita:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                          <p className="font-bold text-lg mb-1">
                            Passiva de Processo (SER)
                          </p>
                          <p>
                            "O contrato <strong>foi assinado</strong> ontem."
                          </p>
                          <p className="text-lg text-muted-foreground mt-1">
                            Foca no momento da ação.
                          </p>
                        </div>
                        <div className="p-4 bg-teal-500/10 border border-teal-500/20 rounded-xl">
                          <p className="font-bold text-lg mb-1">
                            Passiva de Estado (ESTAR)
                          </p>
                          <p>
                            "O contrato <strong>está assinado</strong>."
                          </p>
                          <p className="text-lg text-muted-foreground mt-1">
                            Foca no estado resultante atual.
                          </p>
                        </div>
                      </div>
                      <AlertBox tipo="info" titulo="Implicação para Reescrita">
                        Trocar "foi assinado" por "está assinado" altera o foco
                        temporal — pode ser inválido se a questão perguntar
                        sobre o momento da assinatura.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  title: "Tabela de Conversão: Tempos Verbais na Passiva",
                  icone: <LuRepeat />,
                  descricao: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-lg">
                        Referência rápida de como cada tempo ativo se converte
                        na passiva analítica:
                      </p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-lg border-collapse">
                          <thead>
                            <tr className="bg-muted/70">
                              <th className="p-2 text-left border border-border">
                                Ativa
                              </th>
                              <th className="p-2 text-left border border-border">
                                Passiva (SER + part.)
                              </th>
                              <th className="p-2 text-left border border-border">
                                Exemplo
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              [
                                "Pres. Indicativo (aprova)",
                                "é aprovado/a",
                                "O plano é aprovado.",
                              ],
                              [
                                "Pret. Perfeito (aprovou)",
                                "foi aprovado/a",
                                "O plano foi aprovado.",
                              ],
                              [
                                "Pret. Imperfeito (aprovava)",
                                "era aprovado/a",
                                "O plano era aprovado.",
                              ],
                              [
                                "Fut. Presente (aprovará)",
                                "será aprovado/a",
                                "O plano será aprovado.",
                              ],
                              [
                                "Fut. Pretérito (aprovaria)",
                                "seria aprovado/a",
                                "O plano seria aprovado.",
                              ],
                              [
                                "Pres. Subjuntivo (aprove)",
                                "seja aprovado/a",
                                "Para que o plano seja aprovado.",
                              ],
                            ].map(([ativa, passiva, ex]) => (
                              <tr
                                key={ativa}
                                className="border-b border-border even:bg-muted/20"
                              >
                                <td className="p-2 border border-border">
                                  {ativa}
                                </td>
                                <td className="p-2 border border-border font-medium">
                                  {passiva}
                                </td>
                                <td className="p-2 border border-border text-muted-foreground">
                                  {ex}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Transpondo 'A equipe de manutenção realizou a inspeção' para a voz passiva, obtemos:"
          alternativas={[
            { letra: "A", texto: "A inspeção seria realizada pela equipe.", correta: false },
                { letra: "B", texto: "A inspeção foi realizada pela equipe.", correta: true },
                { letra: "C", texto: "Realizou-se a inspeção pela equipe.", correta: false },
                { letra: "D", texto: "A equipe havia realizado a inspeção.", correta: false },
                { letra: "E", texto: "Estará sendo realizada a inspeção.", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "O verbo 'realizou' está no pretérito perfeito." },
            { titulo: "Passo 2", conteudo: "A voz passiva correspondente exige o auxiliar 'ser' no pretérito perfeito (foi realizada)." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
            questoes={quizM3}
            titulo="QUIZ: Vozes Verbais"
            icone="🎯"
            numero={4}
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
            variant="blue"
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 4: O DISCURSO SOB CONTROLE ─────────────────── */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner
          numero={4}
          titulo="O Discurso sob Controle"
          descricao="Direto para Indireto: ajuste pronomes, tempos e advérbios sem titubear."
          variant="blue"
        />

        {/* ★ RICH INTRO SECTION - Módulo 4 */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="A Arte da Reportagem Verbal"
            description="A arte da reportagem verbal e o recuo temporal na transposição discursiva."
            variant="blue"
          />

          <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
            {/* PARÁGRAFO 1: CONCEITO CIENTÍFICO */}
            <p>
              O discurso reportado constitui-se como mecanismo linguístico que
              permite a transposição da fala ou pensamento alheio para a
              estrutura narrativa do enunciador. Conforme a norma culta, o discurso
              classifica-se em direto (reprodução literal com aspas ou
              travessão), indireto (integração sintática com verbo de elocução)
              e indireto livre (fusão de vozes sem marca explícita de autoria).
              Na transposição do discurso direto para o indireto, opera-se o
              fenômeno do "recuo temporal" — os tempos verbais, pronomes e
              advérbios ajustam-se à perspectiva do narrador, exigindo domínio
              da concordância de tempos e da referência deíctica.
            </p>

            {/* PARÁGRAFO 2: EXPLICAÇÃO INTUITIVA */}
            <p>
              Em outras palavras, transformar discurso direto em indireto é como
              traduzir uma conversa para a linguagem de um relatório — você não
              repete exatamente o que foi dito, mas informa o que foi dito.
              Quando alguém diz "Eu pretendo investir agora", no relatório você
              escreve "Ele disse que pretendia investir naquele momento". É a
              mesma mensagem, mas com diferentes "óculos": os óculos do narrador
              que observa e relata. A reescrita bem-sucedida depende dessa
              mudança de perspectiva — ajustar os pronomes (eu → ele), os tempos
              (pretendo → pretendia) e as referências (agora → naquele momento).
            </p>

            {/* PARÁGRAFO 3: REGRAS E TÉCNICAS */}
            <p>
              As técnicas de transposição discursiva fundamentam-se em três
              sistemas de ajuste obrigatório: <strong>tempo verbal</strong>
              (presente → pretérito imperfeito, pretérito perfeito →
              mais-que-perfeito, futuro do presente → futuro do pretérito),{" "}
              <strong>pronomes pessoais e demonstrativos</strong> (eu/você →
              ele/ela, este/esta → aquele/aquela), e{" "}
              <strong>advérbios de tempo e lugar</strong>
              (agora → naquele momento, aqui → ali, hoje → aquele dia, amanhã →
              no dia seguinte). O imperativo transforma-se em pretérito
              imperfeito do subjuntivo ("saia" → "que saíssem"). Exceção
              importante: o pretérito mais-que-perfeito mantém-se estável, pois
              já é o tempo mais recuado na linha temporal.
            </p>

            {/* PARÁGRAFO 4: CONTEXTO PETROBRAS */}
            <p>
              No ambiente corporativo da Petrobras, o discurso indireto é
              fundamental para elaboração de atas, relatórios de reuniões e
              comunicados oficiais. Quando um engenheiro declara "Precisamos
              parar a produção agora", o relatório registra "O engenheiro
              informou que era necessário parar a produção naquele momento".
              Essa formalização garante precisão documental e remove a
              subjetividade da linguagem coloquial. Em investigações de
              incidentes, o discurso indireto permite relatar depoimentos sem
              comprometer a objetividade necessária para análises técnicas e
              decisões administrativas.
            </p>

            {/* PARÁGRAFO 5: pontos de atenção CESGRANRIO */}
            <p>
              A CESGRANRIO explora sistematicamente as armadilhas da
              transposição discursiva. As questões frequentemente testam:
              manutenção do tempo verbal correto ("estaremos" → "estariam"),
              ajuste de pronomes demonstrativos ("este livro" → "aquele livro"),
              transformação de advérbios ("aqui" → "ali", "hoje" → "aquele
              dia"), e conversão do imperativo em subjuntivo ("saia" → "que
              saíssem"). O examinando deve desenvolver sensibilidade para
              identificar quando a transposição preserva integralmente o sentido
              original sem introduzir distorções temporais ou referenciais.
              Erros comuns incluem não recuar suficientemente os tempos ou
              esquecer de ajustar os elementos deícticos.
            </p>

            {/* CAIXA DE DESTAQUE: Guia de Transposição */}
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 rounded-lg border border-violet-200 dark:border-violet-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">
                O Mapa da Transposição Discursiva
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl mb-2">⏰</div>
                  <strong>Tempos</strong>
                  <p>
                    Presente → Imperfeito
                    <br />
                    Perfeito → Mais-que-perfeito
                    <br />
                    Futuro → Futuro do pretérito
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">👥</div>
                  <strong>Pronomes</strong>
                  <p>
                    Eu/Você → Ele/Ela
                    <br />
                    Este/Isto → Aquele/Aquilo
                    <br />
                    Nosso → Seu
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">📍</div>
                  <strong>Advérbios</strong>
                  <p>
                    Agora → Naquele momento
                    <br />
                    Aqui → Ali
                    <br />
                    Hoje → Aquele dia
                  </p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-violet-100 dark:bg-violet-900/30 rounded text-sm">
                <strong>Regra de Ouro:</strong> Se o verbo de elocução está no
                passado, todos os outros tempos "recuam" um degrau na linha do
                tempo, exceto o mais-que-perfeito.
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Direto & Indireto"
              description="A mecânica da transposição entre os discursos direto e indireto."
              variant="blue"
            />
            <CardCarousel
              itemsPerView={2}
              cards={[
                {
                  title: "A Transposição",
                  icone: <LuMessagesSquare />,
                  descricao: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Ao passar do discurso direto (fala real) para o indireto
                        (relato), os tempos verbais "recuam" no tempo.
                      </p>
                      <ul className="list-disc pl-5 text-lg space-y-2">
                        <li>
                          <strong>Presente</strong> vira{" "}
                          <strong>Pretérito Imperfeito</strong>.
                        </li>
                        <li>
                          <strong>Pretérito Perfeito</strong> vira{" "}
                          <strong>Pretérito Mais-que-Perfeito</strong>.
                        </li>
                        <li>
                          <strong>Amanhã</strong> vira{" "}
                          <strong>No dia seguinte</strong>.
                        </li>
                      </ul>
                    </div>
                  ),
                },
                {
                  title: "Tabela Completa de Recuo Temporal",
                  icone: <LuBookOpen />,
                  descricao: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-lg">
                        Memorize a tabela abaixo — ela resolve 90% das questões
                        de discurso indireto na CESGRANRIO:
                      </p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-lg border-collapse">
                          <thead>
                            <tr className="bg-muted/70">
                              <th className="p-3 text-left border border-border rounded-tl-lg">
                                Discurso Direto
                              </th>
                              <th className="p-3 text-left border border-border rounded-tr-lg">
                                Discurso Indireto
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-border">
                              <td className="p-3 border border-border">
                                Presente do Indicativo
                              </td>
                              <td className="p-3 border border-border">
                                Pretérito Imperfeito
                              </td>
                            </tr>
                            <tr className="border-b border-border bg-muted/20">
                              <td className="p-3 border border-border">
                                Pretérito Perfeito
                              </td>
                              <td className="p-3 border border-border">
                                Pretérito Mais-que-Perfeito
                              </td>
                            </tr>
                            <tr className="border-b border-border">
                              <td className="p-3 border border-border">
                                Futuro do Presente
                              </td>
                              <td className="p-3 border border-border">
                                Futuro do Pretérito (Condicional)
                              </td>
                            </tr>
                            <tr className="border-b border-border bg-muted/20">
                              <td className="p-3 border border-border">
                                Imperativo
                              </td>
                              <td className="p-3 border border-border">
                                Infinitivo (com verbos pedir/mandar/ordenar)
                              </td>
                            </tr>
                            <tr>
                              <td className="p-3 border border-border">
                                Futuro do Subjuntivo
                              </td>
                              <td className="p-3 border border-border">
                                Pretérito Imperfeito do Subjuntivo
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ),
                },
                {
                  title: "Mudança de Pronomes Pessoais",
                  icone: <LuMic />,
                  descricao: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Os pronomes da 1ª e 2ª pessoa no discurso direto passam
                        para a 3ª pessoa no indireto, ajustados ao ponto de
                        vista do narrador:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-muted/50 rounded-xl border border-border text-lg space-y-1">
                          <p className="font-bold text-lg mb-2">
                            Discurso Direto
                          </p>
                          <p>"Eu vou resolver o problema."</p>
                          <p>"Você precisa assinar o contrato."</p>
                        </div>
                        <div className="p-4 bg-teal-500/10 rounded-xl border border-teal-500/20 text-lg space-y-1">
                          <p className="font-bold text-lg mb-2">
                            Discurso Indireto
                          </p>
                          <p>
                            Ele disse que <em>ele</em> iria resolver o problema.
                          </p>
                          <p>
                            Ele disse que <em>ela/o interlocutor</em> precisava
                            assinar o contrato.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Exemplo Completo: Direto → Indireto"
              description="Exemplo prático de transposição e análise de equivalência semântica."
              variant="blue"
            />
            <Comparison
              title="Discurso Direto vs Indireto — Caso Real"
              left={{
                title: "Discurso Direto",
                content: "O gerente disse: 'Vou assinar o contrato amanhã.'",
                description:
                  "Fala literal reproduzida entre aspas. Verbo no presente; advérbio 'amanhã'.",
                variant: "info",
              }}
              right={{
                title: "Discurso Indireto",
                content:
                  "O gerente disse que assinaria o contrato no dia seguinte.",
                description:
                  "Verbo no futuro do pretérito; 'amanhã' → 'no dia seguinte'; aspas e dois-pontos removidos.",
                variant: "success",
              }}
            />
            <AlertBox
              tipo="warning"
              titulo="Pronomes e Advérbios de Tempo — Mudanças Obrigatórias"
            >
              No discurso indireto, além dos tempos verbais, os advérbios de
              tempo e lugar também mudam: <strong>hoje</strong> →{" "}
              <strong>naquele dia</strong>; <strong>aqui</strong> →{" "}
              <strong>ali/lá</strong>; <strong>ontem</strong> →{" "}
              <strong>no dia anterior</strong>; <strong>semana passada</strong>{" "}
              → <strong>na semana anterior</strong>.
            </AlertBox>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Mapa de Advérbios Temporais"
              description="Mapeamento dos advérbios de tempo e lugar no discurso reportado."
              variant="blue"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-emerald-500/10 rounded-full shadow-inner ring-1 ring-emerald-500/20">
                      <LuClock className="w-12 h-12 text-emerald-500" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      Hoje / Agora
                    </span>
                    <span className="text-sm text-emerald-500/80 font-medium">
                      Presente Imediato
                    </span>
                  </div>
                }
                verso={
                  <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-2 text-emerald-500 font-bold border-b border-emerald-500/10 pb-3">
                      <LuCheck className="w-5 h-5 shrink-0" />
                      <span className="tracking-widest uppercase text-xs">
                        Deslocamento Temporal
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      No discurso indireto, o <strong>Presente</strong> do
                      falante ("hoje") deve ser reportado como um ponto estático
                      no passado do narrador: <strong>Naquele dia</strong> ou{" "}
                      <strong>Naquele momento</strong>.
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      A banca CESGRANRIO invalida reescritas que mantêm "hoje"
                      no discurso indireto, pois isso cria um anacronismo lógico
                      no relato.
                    </p>
                  </div>
                }
                categoria="Eixo Temporal"
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-blue-500/10 rounded-full shadow-inner ring-1 ring-blue-500/20">
                      <LuFastForward className="w-12 h-12 text-blue-500" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      Amanhã / Depois
                    </span>
                    <span className="text-sm text-blue-500/80 font-medium">
                      Projeção Futura
                    </span>
                  </div>
                }
                verso={
                  <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-2 text-blue-500 font-bold border-b border-blue-500/10 pb-3">
                      <LuCheck className="w-5 h-5 shrink-0" />
                      <span className="tracking-widest uppercase text-xs">
                        Futuro do Relato
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      O que era futuro para quem falou ("amanhã") torna-se uma{" "}
                      <strong>projeção posterior</strong> no relato:{" "}
                      <strong>No dia seguinte</strong> ou{" "}
                      <strong>Posteriormente</strong>.
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Essa mudança é obrigatória para manter a coesão
                      cronológica. Se o autor disse "Virei amanhã", o relato
                      correto é "Ele disse que viria no dia seguinte".
                    </p>
                  </div>
                }
                categoria="Eixo Temporal"
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-amber-500/10 rounded-full shadow-inner ring-1 ring-amber-500/20">
                      <LuHistory className="w-12 h-12 text-amber-500" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      Ontem
                    </span>
                    <span className="text-sm text-amber-500/80 font-medium">
                      Passado Recente
                    </span>
                  </div>
                }
                verso={
                  <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-2 text-amber-500 font-bold border-b border-amber-500/10 pb-3">
                      <LuCheck className="w-5 h-5 shrink-0" />
                      <span className="tracking-widest uppercase text-xs">
                        Antecedência
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      O <strong>Ontem</strong> (passado em relação ao momento da
                      fala) converte-se em <strong>No dia anterior</strong> ou{" "}
                      <strong>Na véspera</strong> (passado em relação ao momento
                      do relato).
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      O uso de "ontem" no discurso indireto é um erro comum de
                      "cola" do texto original que a Petrobras costuma cobrar em
                      itens de reescrita incorreta.
                    </p>
                  </div>
                }
                categoria="Eixo Temporal"
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-purple-500/10 rounded-full shadow-inner ring-1 ring-purple-500/20">
                      <LuMapPin className="w-12 h-12 text-purple-500" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      Aqui / Cá
                    </span>
                    <span className="text-sm text-purple-500/80 font-medium">
                      Referência Espacial
                    </span>
                  </div>
                }
                verso={
                  <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-2 text-purple-500 font-bold border-b border-purple-500/10 pb-3">
                      <LuCheck className="w-5 h-5 shrink-0" />
                      <span className="tracking-widest uppercase text-xs">
                        Eixo Locativo
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Os advérbios de lugar que indicam proximidade do falante
                      ("aqui", "este") devem ser convertidos para formas de
                      distanciamento: <strong>Ali</strong>, <strong>Lá</strong>{" "}
                      ou <strong>Aquele lugar</strong>.
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      A reescrita de "Estou aqui" para "Ele disse que estava
                      aqui" só é válida se o narrador estiver no exato mesmo
                      lugar físico. Caso contrário, o correto é "Ele disse que
                      estava lá".
                    </p>
                  </div>
                }
                categoria="Eixo Espacial"
              />
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={4}
              title="Verbos Introdutores de Discurso Indireto"
              description="A função dos verbos de elocução (dicendi) na estruturação do discurso indireto."
              variant="blue"
            />
            <p className="text-muted-foreground text-lg leading-relaxed">
              O verbo que introduz o discurso indireto determina como a
              transposição é feita. Diferentes verbos dicendi exigem diferentes
              construções sintáticas:
            </p>
            <CardCarousel
              itemsPerView={2}
              cards={[
                {
                  icone: "💬",
                  title: "Dizer / Afirmar / Declarar",
                  descricao:
                    "Introduzem oração substantiva desenvolvida com 'que': 'Ele disse que aprovaria o contrato.' Verbo da subordinada no Futuro do Pretérito.",
                },
                {
                  icone: "❓",
                  title: "Perguntar / Indagar / Questionar",
                  descricao:
                    "Introduzem interrogativa indireta com 'se' (sim/não) ou pronome interrogativo: 'Ela perguntou se o relatório estava pronto.' Sem ponto de interrogação no final.",
                },
                {
                  icone: "📢",
                  title: "Ordenar / Mandar / Pedir / Solicitar",
                  descricao:
                    "Introduzem oração com verbo no infinitivo ou no subjuntivo: 'O gerente ordenou que os técnicos revisassem o procedimento.' / 'mandou revisar'.",
                },
                {
                  icone: "🤔",
                  title: "Pensar / Acreditar / Supor",
                  descricao:
                    "Introduzem oração com 'que' + subjuntivo ou indicativo dependendo da certeza expressa: 'Ele acreditava que o projeto seria aprovado.'",
                },
                {
                  icone: "⚠️",
                  title: "Advertir / Alertar / Avisar",
                  descricao:
                    "Introduzem discurso com 'que' + subjuntivo (quando há prescrição) ou indicativo: 'O supervisor alertou que o equipamento estava com defeito.'",
                },
              ]}
            />
            <AlertBox tipo="warning" titulo="Pontuação no Discurso Indireto">
              No discurso indireto, os dois-pontos e as aspas usados no direto
              são eliminados. A subordinada é introduzida diretamente pelo verbo
              dicendi + conjunção "que" (ou pronome/advérbio interrogativo).
              Reescritas que mantêm as aspas incorretamente são inválidas.
            </AlertBox>
          </section>

          {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Ao transpor 'Eu pretendo investir agora' para o discurso indireto, temos:"
          alternativas={[
            { letra: "A", texto: "Ele disse que eu pretendo investir agora.", correta: false },
                { letra: "B", texto: "Ele afirmou que pretendia investir naquele momento.", correta: true },
                { letra: "C", texto: "Ele declarou que pretende investir ontem.", correta: false },
                { letra: "D", texto: "Dizia ele que pretendia investir agora.", correta: false },
                { letra: "E", texto: "A e B são sinônimos.", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "No discurso indireto, o tempo 'presente' vira 'pretérito imperfeito' e o advérbio 'agora' vira 'naquele momento'." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
            questoes={quizM4}
            titulo="QUIZ: O Discurso sob Controle"
            icone="🎯"
            numero={5}
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
            variant="blue"
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 5: NOMINALIZAÇÃO ──────────────────────────── */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="Nominalização"
          descricao="Transforme verbos em substantivos para dar densidade técnica e profissional ao seu texto."
          variant="blue"
        />

        {/* ★ RICH INTRO SECTION - Módulo 5 */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="A Arte da Substantivação de Ações"
            description="A arte da substantivação de ações para densidade técnica e profissional."
            variant="blue"
          />

          <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
            {/* PARÁGRAFO 1: CONCEITO CIENTÍFICO */}
            <p>
              A nominalização constitui-se como processo morfossintático que
              transforma verbos ou adjetivos em substantivos, permitindo que
              ações ou qualidades sejam tratadas como entidades abstratas.
              Segundo a gramática normativa, este fenômeno linguístico opera através
              de sufixação derivacional (-ção, -mento, -ência, -ança, -ura,
              -eza) e reorganização estrutural da oração. A nominalização
              converte orações subordinadas substantivas em sintagmas nominais,
              como "que o Brasil produza" → "a produção do Brasil", conferindo
              maior densidade sintática e formalidade ao discurso. Na escrita
              técnica e acadêmica, este recurso é fundamental para objetivar
              informações e remover o foco do agente.
            </p>

            {/* PARÁGRAFO 2: EXPLICAÇÃO INTUITIVA */}
            <p>
              Em outras palavras, nominalizar é como transformar um filme em
              fotografia — você congela a ação em um quadro estático que pode
              ser analisado, arquivado e referenciado. Quando alguém "decide
              adiar a obra" (ação em movimento), a nominalização cria "a decisão
              do adiamento da obra" (fotografia da decisão). A ação dinâmica
              vira objeto estático, permitindo que você manipule essa informação
              como se fosse uma peça — pode posicioná-la em diferentes lugares
              da frase, compará-la com outras decisões, ou usá-la como sujeito
              de novas orações.
            </p>

            {/* PARÁGRAFO 3: REGRAS E TÉCNICAS */}
            <p>
              As técnicas de nominalização fundamentam-se em três padrões
              principais: <strong>verbo → substantivo de ação</strong>
              (decidir → decisão, investir → investimento),{" "}
              <strong>verbo → substantivo de agente</strong> (operar → operador,
              supervisionar → supervisor), e{" "}
              <strong>verbo → substantivo de resultado</strong> (aprovar →
              aprovação, analisar → análise). Os sufixos mais produtivos incluem
              -ção/-são (produção, expansão), -mento (investimento,
              desenvolvimento), -ência/-ância (resistência, permanência), e -ura
              (falha, ruptura). A nominalização de orações subjetivas exige
              reorganização completa: "É fundamental que produza" → "A produção
              é fundamental".
            </p>

            {/* PARÁGRAFO 4: CONTEXTO PETROBRAS */}
            <p>
              No ambiente técnico da Petrobras, a nominalização é essencial para
              elaboração de relatórios, laudos e documentos oficiais. "Ocorreram
              erros durante a perfuração" transforma-se em "A ocorrência de
              erros durante a perfuração", conferindo impessoalidade e
              objetividade ao relato. Em relatórios de produção, "A empresa
              investiu pesado" nominaliza-se para "O investimento pesado da
              empresa", permitindo que essa informação funcione como sujeito de
              novas análises. Esta prática remove o foco do agente humano e
              concentra atenção nos fatos técnicos, padrão indispensável para
              documentação corporativa e comunicação institucional.
            </p>

            {/* PARÁGRAFO 5: pontos de atenção CESGRANRIO */}
            <p>
              A CESGRANRIO explora sistematicamente as fronteiras da
              nominalização adequada. As questões frequentemente testam:
              identificação da nominalização correta (decidir → decisão, não
              decidido), reconhecimento de orações subjetivas transformadas
              ("que o Brasil produza" → "a produção"), e aplicação contextual em
              textos técnicos. O examinando deve desenvolver sensibilidade para
              distinguir nominalização verdadeira de simples adjetivação, e
              compreender quando este recurso confere objetividade ao texto sem
              perder o sentido original. Erros comuns incluem escolher sufixos
              inadequados ou manter estruturas verbais onde a nominalização
              seria mais apropriada.
            </p>

            {/* CAIXA DE DESTAQUE: Guia de Nominalização */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-lg border border-amber-200 dark:border-amber-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">
                O Laboratório de Sufixos Nominalizadores
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl mb-2">🏭</div>
                  <strong>-ção/-são</strong>
                  <p>
                    produzir → produção
                    <br />
                    expandir → expansão
                    <br />
                    decidir → decisão
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">⚙️</div>
                  <strong>-mento</strong>
                  <p>
                    investir → investimento
                    <br />
                    desenvolver → desenvolvimento
                    <br />
                    lançar → lançamento
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">💪</div>
                  <strong>-ência/-ância</strong>
                  <p>
                    resistir → resistência
                    <br />
                    permanecer → permanência
                    <br />
                    assistir → assistência
                  </p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-amber-100 dark:bg-amber-900/30 rounded text-sm">
                <strong>Regra de Ouro:</strong> Nominalização remove o agente e
                foca no fato. "Eles decidiram" (foco nos agentes) → "A decisão"
                (foco no fato).
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Verbo para Substantivo"
              description="A mecânica da conversão verbo-substantivo na linguagem técnica."
              variant="blue"
            />
            <CardCarousel
              itemsPerView={2}
              cards={[
                {
                  title: "O que é Nominalização?",
                  icone: <LuActivity />,
                  descricao: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        A nominalização permite que você trate uma ação como um
                        "objeto" fixo. Ex: "O poço produziu mil barris" {"→"} "A
                        produção do poço atingiu mil barris."
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Na linguagem técnica e oficial — como em relatórios
                        Petrobras, contratos e normas internas — a nominalização
                        é <strong>muito frequente</strong> porque cria frases
                        mais densas, impessoais e formais. A banca cobra sua
                        capacidade de converter entre as duas formas sem perda
                        de sentido.
                      </p>
                    </div>
                  ),
                },
                {
                  title: "Como Fazer a Conversão Verbo → Substantivo",
                  icone: <LuRepeat />,
                  descricao: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-lg">
                        Há três padrões principais de nominalização:
                      </p>
                      <div className="space-y-3">
                        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-lg">
                          <p className="font-bold mb-1">
                            1. Verbo → Substantivo de ação
                          </p>
                          <p>
                            "Decidir" → "a decisão" | "Executar" → "a execução"
                            | "Implantar" → "a implantação"
                          </p>
                        </div>
                        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-lg">
                          <p className="font-bold mb-1">
                            2. Verbo → Substantivo de agente
                          </p>
                          <p>
                            "Operar" → "o operador" | "Supervisionar" → "o
                            supervisor"
                          </p>
                        </div>
                        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-lg">
                          <p className="font-bold mb-1">
                            3. Verbo → Substantivo de resultado
                          </p>
                          <p>
                            "Aprovar" → "a aprovação" (ação) ou "o aprovado"
                            (resultado/agente)
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  title: "Nominalizações no Texto Oficial Petrobras",
                  icone: <LuShieldAlert />,
                  descricao: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Documentos técnicos da Petrobras — relatórios de
                        conformidade, contratos de prestação de serviço, normas
                        internas — fazem uso intenso de nominalizações.
                        Conhecê-las é essencial tanto para a prova quanto para o
                        exercício profissional.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-lg">
                        <div className="p-3 bg-muted/50 rounded-lg border border-border">
                          <p className="font-bold text-lg mb-1">
                            Verbal (informal)
                          </p>
                          <p>"A empresa decidiu contratar novos técnicos."</p>
                        </div>
                        <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                          <p className="font-bold text-lg mb-1">
                            Nominalizado (formal/técnico)
                          </p>
                          <p>
                            "A decisão de contratação de novos técnicos foi
                            tomada pela empresa."
                          </p>
                        </div>
                      </div>
                      <AlertBox
                        tipo="info"
                        titulo="Por que Isso Aparece na Prova?"
                      >
                        A CESGRANRIO usa nominalizações para testar se você
                        consegue identificar que "a decisão de X" equivale a "a
                        empresa decidiu X" — e que o agente oculto numa
                        nominalização pode ser revelado por uma preposição.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Nominalização: Antes e Depois"
              description="Análise comparativa entre estruturas verbais e nominais."
              variant="blue"
            />
            <Comparison
              title="Frase Verbal vs Frase Nominalizada"
              left={{
                title: "Estrutura Verbal",
                content: "A empresa decidiu contratar engenheiros seniores.",
                description:
                  "Sujeito + verbo conjugado + infinitivo. Linguagem direta e dinâmica.",
                variant: "info",
              }}
              right={{
                title: "Estrutura Nominalizada",
                content:
                  "A decisão de contratação de engenheiros seniores coube à empresa.",
                description:
                  "Ação convertida em substantivo. Linguagem mais densa, impessoal — típica de textos técnicos.",
                variant: "success",
              }}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Léxico de Nominalizações Frequentes"
              description="Léxico de nominalizações frequentes em documentos técnicos da Petrobras."
              variant="blue"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-blue-500/10 rounded-full shadow-inner ring-1 ring-blue-500/20">
                      <LuZap className="w-12 h-12 text-blue-500" />
                    </div>
                    <span className="text-lg font-bold uppercase tracking-tight text-foreground">
                      Aperfeiçoar → Aperfeiçoamento
                    </span>
                  </div>
                }
                verso={
                  <div className="space-y-3 p-4 flex flex-col justify-center h-full text-sm">
                    <p className="leading-relaxed text-muted-foreground">
                      <strong>Aplicação Técnica:</strong> "O{" "}
                      <em>aperfeiçoamento</em> contínuo dos processos é exigido
                      pelas normas ISO adotadas pela Petrobras."
                    </p>
                    <p className="text-xs text-blue-500/80 font-medium italic">
                      Dica: O sufixo -mento indica o processo ou o resultado da
                      ação de melhorar.
                    </p>
                  </div>
                }
                categoria="Léxico Técnico"
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-emerald-500/10 rounded-full shadow-inner ring-1 ring-emerald-500/20">
                      <LuLink className="w-12 h-12 text-emerald-500" />
                    </div>
                    <span className="text-lg font-bold uppercase tracking-tight text-foreground">
                      Conectar → Conexão
                    </span>
                  </div>
                }
                verso={
                  <div className="space-y-3 p-4 flex flex-col justify-center h-full text-sm">
                    <p className="leading-relaxed text-muted-foreground">
                      <strong>Aplicação Técnica:</strong> "A <em>conexão</em>{" "}
                      adequada dos cabos submarinos deve ser verificada antes do
                      início da operação."
                    </p>
                    <p className="text-xs text-emerald-500/80 font-medium italic">
                      Dica: Verbos terminados em -ctar geralmente geram
                      substantivos em -xão.
                    </p>
                  </div>
                }
                categoria="Léxico Técnico"
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-amber-500/10 rounded-full shadow-inner ring-1 ring-amber-500/20">
                      <LuActivity className="w-12 h-12 text-amber-500" />
                    </div>
                    <span className="text-lg font-bold uppercase tracking-tight text-foreground">
                      Atracar → Atracação
                    </span>
                  </div>
                }
                verso={
                  <div className="space-y-3 p-4 flex flex-col justify-center h-full text-sm">
                    <p className="leading-relaxed text-muted-foreground">
                      <strong>Aplicação Técnica:</strong> "A <em>atracação</em>{" "}
                      do navio de suporte em águas profundas levou mais tempo
                      que o previsto."
                    </p>
                    <p className="text-xs text-amber-500/80 font-medium italic">
                      Dica: Sufixo -ção é o mais produtivo para ações que
                      ocorrem em portos e plataformas.
                    </p>
                  </div>
                }
                categoria="Léxico Técnico"
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-purple-500/10 rounded-full shadow-inner ring-1 ring-purple-500/20">
                      <LuSearch className="w-12 h-12 text-purple-500" />
                    </div>
                    <span className="text-lg font-bold uppercase tracking-tight text-foreground">
                      Inspecionar → Inspeção
                    </span>
                  </div>
                }
                verso={
                  <div className="space-y-3 p-4 flex flex-col justify-center h-full text-sm">
                    <p className="leading-relaxed text-muted-foreground">
                      <strong>Aplicação Técnica:</strong> "A <em>inspeção</em>{" "}
                      periódica das plataformas é obrigatória conforme a
                      regulamentação da ANP."
                    </p>
                    <p className="text-xs text-purple-500/80 font-medium italic">
                      Dica: Note a perda do 'r' e a adição do sufixo. Essencial
                      para relatórios de conformidade.
                    </p>
                  </div>
                }
                categoria="Léxico Técnico"
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-indigo-500/10 rounded-full shadow-inner ring-1 ring-indigo-500/20">
                      <LuBookOpen className="w-12 h-12 text-indigo-500" />
                    </div>
                    <span className="text-lg font-bold uppercase tracking-tight text-foreground">
                      Contratar → Contratação
                    </span>
                  </div>
                }
                verso={
                  <div className="space-y-3 p-4 flex flex-col justify-center h-full text-sm">
                    <p className="leading-relaxed text-muted-foreground">
                      <strong>Aplicação Técnica:</strong> "O processo de{" "}
                      <em>contratação</em> de novos fornecedores seguiu os
                      critérios de compliance."
                    </p>
                    <p className="text-xs text-indigo-500/80 font-medium italic">
                      Dica: Nominalização muito usada para evitar mencionar quem
                      contratou, focando no processo.
                    </p>
                  </div>
                }
                categoria="Léxico Técnico"
              />
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={4}
              title="Sufixos Nominalizadores — Como Identificar o Substantivo Correto"
              description="Identificação dos sufixos nominalizadores e precisão terminológica."
              variant="blue"
            />
            <p className="text-muted-foreground text-lg leading-relaxed">
              Em provas de reescrita, a banca às vezes apresenta uma
              nominalização com o sufixo errado como distrator. Conhecer os
              sufixos nominalizadores mais produtivos do português é uma
              vantagem.
            </p>
            <CardCarousel
              itemsPerView={2}
              cards={[
                {
                  title: "Sufixos de Ação (-ção, -mento, -agem)",
                  icone: <LuActivity />,
                  descricao: (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-lg">
                        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                          <p className="font-bold text-lg mb-2">-ção / -são</p>
                          <p>produzir → produção</p>
                          <p>executar → execução</p>
                          <p>decidir → decisão</p>
                          <p>contratar → contratação</p>
                        </div>
                        <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                          <p className="font-bold text-lg mb-2">-mento</p>
                          <p>aperfeiçoar → aperfeiçoamento</p>
                          <p>processar → processamento</p>
                          <p>lançar → lançamento</p>
                          <p>desenvolver → desenvolvimento</p>
                        </div>
                        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                          <p className="font-bold text-lg mb-2">
                            -agem / -ância / -ência
                          </p>
                          <p>bloquear → blocagem</p>
                          <p>exportar → exportação / exportância (raro)</p>
                          <p>convergir → convergência</p>
                          <p>divergir → divergência</p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Distrator Clássico">
                        A banca cria nominalizações com sufixo errado (ex:
                        "executamento" no lugar de "execução") como alternativa
                        distratora. Memorize as formas consagradas no
                        dicionário.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  title: "Nominalização com Agente Explícito",
                  icone: <LuTarget />,
                  descricao: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        Ao nominalizar, o sujeito da ação pode aparecer após
                        preposição "de" (agente do processo) ou ficar implícito.
                        A banca testa se você percebe quando o agente foi
                        indevidamente omitido ou trocado:
                      </p>
                      <div className="space-y-2 text-lg">
                        <div className="p-3 bg-muted/50 rounded-xl border border-border">
                          <p>
                            <strong>Ativa:</strong> "A ANP fiscalizou a
                            plataforma."
                          </p>
                        </div>
                        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                          <p className="text-green-700 dark:text-green-400">
                            <strong>Nominalização correta:</strong> "A
                            fiscalização da plataforma pela ANP..."
                          </p>
                        </div>
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                          <p className="text-red-600 dark:text-red-400">
                            <strong>Incorreta (agente trocado):</strong> "A
                            fiscalização da plataforma pela Petrobras..." ←
                            mudou o agente!
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A frase 'É fundamental que o Brasil produza energia' vira:"
          alternativas={[
            { letra: "A", texto: "Fundamental é produzir energia no Brasil.", correta: false },
                { letra: "B", texto: "A produção de energia pelo Brasil é fundamental.", correta: true },
                { letra: "C", texto: "O Brasil deve produzir energia fundamentalmente.", correta: false },
                { letra: "D", texto: "Energia o Brasil produz fundamentalmente.", correta: false },
                { letra: "E", texto: "O Brasil produzindo energia é algo fundamental.", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "A oração subjetiva 'que o Brasil produza' foi convertida no sintagma nominal 'A produção..." },
            { titulo: "Passo 2", conteudo: "pelo Brasil'." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
            questoes={quizM5}
            titulo="QUIZ: Troca de Classes (Nominalização)"
            icone="🎯"
            numero={5}
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
            variant="blue"
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 6: EQUIVALÊNCIA CONJUNUTIVA ────────────────── */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <ModuleBanner
          numero={6}
          titulo="Equivalência Conjuntiva"
          descricao="Domine os conectivos causais, temporais e condicionais. A alma da reescrita sequencial."
          variant="blue"
        />

        {/* ★ RICH INTRO SECTION - Módulo 6 */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="A Arquitetura da Coesão Textual"
            variant="blue"
          />

          <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
            {/* PARÁGRAFO 1: CONCEITO CIENTÍFICO */}
            <p>
              A conectividade constitui-se como princípio fundamental da coesão
              textual, estabelecendo relações lógicas e semânticas entre orações
              e períodos através de conectivos e locuções conjuntivas. Segundo
              Na gramática tradicional, os conectivos classificam-se em categorias funcionais
              — causais (porque, visto que), conclusivos (logo, portanto),
              concessivos (embora, conquanto), condicionais (se, caso),
              temporais (quando, enquanto) e finais (a fim de que, para que). A
              equivalência conjuntiva permite substituição de conectivos dentro
              da mesma categoria semântica, mantendo o nexo lógico original. A
              CESGRANRIO explora sistematicamente esta capacidade de
              transposição, exigindo identificação precisa do valor semântico de
              cada conector.
            </p>

            {/* PARÁGRAFO 2: EXPLICAÇÃO INTUITIVA */}
            <p>
              Em outras palavras, os conectivos são como as articulações de um
              esqueleto textual — conectam as partes mantendo a estrutura
              coerente. "Portanto" e "por conseguinte" são como o cotovelo e o
              joelho: articulações diferentes mas mesma função (conclusão).
              "Mas" e "embora" são mais complexos — como mudar de uma
              articulação simples para uma complexa, exigindo reorganização
              muscular (mudança de modo verbal e ordem das orações). A reescrita
              bem-sucedida depende de identificar qual "articulação" lógica está
              sendo usada e encontrar um substituto equivalente que mantenha a
              mesma postura textual.
            </p>

            {/* PARÁGRAFO 3: REGRAS E TÉCNICAS */}
            <p>
              As técnicas de substituição conjuntiva fundamentam-se em
              princípios rigorosos:{" "}
              <strong>manutenção do valor semântico</strong>
              (causal permanece causal, conclusivo permanece conclusivo),
              <strong>adequação sintática</strong> (conectivos concessivos
              frequentemente exigem subjuntivo e inversão), e{" "}
              <strong>preservação da ênfase</strong> (ordem das orações pode
              precisar ajustar). Conectivos conclusivos admitem substituição
              direta (portanto → logo, por conseguinte, todavia). Causais
              oferecem múltiplas opções (porque, visto que, pois, como, uma vez
              que). Concessivos exigem cuidado: "mas" (adversativo simples) vs
              "embora" (concessivo com subjuntivo). Finais usam estruturas
              reduzidas (para que, a fim de que).
            </p>

            {/* PARÁGRAFO 4: CONTEXTO PETROBRAS */}
            <p>
              No ambiente técnico da Petrobras, a precisão conectiva é essencial
              para elaboração de relatórios sequenciais e manuais operacionais.
              "Como choveu, não fomos" pode transformar-se em "Não fomos posto
              que choveu" ou "Não fomos porquanto chovera", mantendo a relação
              causal mas adequando o registro formal. Em procedimentos de
              segurança, "Se houver vazamento, acione o alarme" equivalente a
              "Caso ocorra vazamento, acione o alarme" ou "Desde que exista
              vazamento, acione o alarme". A escolha do conectivo impacta
              diretamente a clareza instrucional e a precisão técnica dos
              documentos.
            </p>

            {/* PARÁGRAFO 5: pontos de atenção CESGRANRIO */}
            <p>
              A CESGRANRIO explora sistematicamente as armadilhas da
              equivalência conjuntiva. As questões frequentemente testam:
              identificação de categorias semânticas (conclusivo vs causal),
              reconhecimento de substituições que exigem reestruturação (mas →
              embora), e distinção entre conectivos polissêmicos (desde que pode
              ser temporal ou condicional). O examinando deve desenvolver
              sensibilidade para identificar quando a substituição é direta ou
              exige ajustes sintáticos. Erros comuns incluem misturar categorias
              (causal por conclusivo), ignorar exigência de subjuntivo, ou
              perder a ênfase original ao inverter ordem das orações.
            </p>

            {/* CAIXA DE DESTAQUE: Mapa de Conectivos */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">
                O Sistema de Equivalências Conectivas
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl mb-2">🔗</div>
                  <strong>Causais</strong>
                  <p>
                    Porque → Visto que
                    <br />
                    Como → Pois
                    <br />
                    Uma vez que → Posto que
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">⚡</div>
                  <strong>Conclusivos</strong>
                  <p>
                    Portanto → Logo
                    <br />
                    Por conseguinte → Por isso
                    <br />
                    Então → Assim
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🔄</div>
                  <strong>Concessivos</strong>
                  <p>
                    Mas → Embora
                    <br />
                    Contudo → Conquanto
                    <br />
                    Todavia → Não obstante
                  </p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded text-sm">
                <strong>Regra Crítica:</strong> "Mas" exige indicativo + orações
                independentes. "Embora" exige subjuntivo + oração subordinada. A
                troca exige reestruturação completa.
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Nexos Equivalentes"
              description="O mapeamento dos nexos lógicos e a substituição de conectivos sem perda de sentido."
              variant="blue"
            />
            <CardCarousel
              itemsPerView={2}
              cards={[
                {
                  title: "Condicionais",
                  icone: <LuLightbulb />,
                  descricao: (
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/50 rounded-xl">
                        <p className="font-bold">
                          SE = CASO = DESDE QUE = CONTANTO QUE
                        </p>
                        <p className="text-lg text-muted-foreground mt-2">
                          Nota: 'Desde que' pode ser temporal ou condicional — o
                          contexto determina o valor.
                        </p>
                      </div>
                      <p className="text-lg text-muted-foreground">
                        <strong>Exemplo:</strong> "Se o equipamento falhar,
                        acione o alarme." = "Caso o equipamento venha a falhar,
                        acione o alarme."
                      </p>
                    </div>
                  ),
                },
                {
                  title: "Causais — O Grupo Mais Cobrado",
                  icone: <LuLink />,
                  descricao: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-lg">
                        As conjunções causais são as mais trocadas em questões
                        de reescrita. Todas as opções abaixo expressam causa,
                        mas diferem em registro e posição na frase:
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-lg">
                        {[
                          { conj: "porque", nota: "registro neutro/informal" },
                          {
                            conj: "pois",
                            nota: "posição pós-verbal; mais formal",
                          },
                          { conj: "já que", nota: "causa conhecida/óbvia" },
                          {
                            conj: "uma vez que",
                            nota: "formal; causa admitida",
                          },
                          {
                            conj: "visto que",
                            nota: "formal; muito usado em contratos",
                          },
                          {
                            conj: "porquanto",
                            nota: "arcaico; raro em provas modernas",
                          },
                        ].map((item) => (
                          <div
                            key={item.conj}
                            className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl text-center"
                          >
                            <p className="font-bold">{item.conj}</p>
                            <p className="text-lg text-muted-foreground mt-1">
                              {item.nota}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
                {
                  title: "Conclusivas e Explicativas",
                  icone: <LuBookOpen />,
                  descricao: (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                        <div className="p-4 bg-muted/50 rounded-xl border border-border">
                          <p className="font-bold text-lg mb-2">Conclusivas</p>
                          <p>
                            portanto = logo = por isso = por conseguinte = assim
                            = dessa forma = destarte
                          </p>
                          <p className="text-lg text-muted-foreground mt-2">
                            Indicam consequência lógica da oração anterior.
                          </p>
                        </div>
                        <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                          <p className="font-bold text-lg mb-2">Explicativas</p>
                          <p>
                            pois (anteposto) = que = porque (pós-imperativo)
                          </p>
                          <p className="text-lg text-muted-foreground mt-2">
                            Explicam ou justificam a afirmação anterior — não
                            introduzem causa real.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  title: "Temporais — Armadilha do 'Desde que'",
                  icone: <LuTriangleAlert />,
                  descricao: (
                    <div className="space-y-4">
                      <AlertBox
                        tipo="danger"
                        titulo="Bifuncionalidade do 'Desde que'"
                      >
                        "Desde que" pode ser <strong>temporal</strong> (= desde
                        quando) ou <strong>condicional</strong> (= contanto que
                        / caso). A diferença está no contexto: se indica um
                        ponto de partida no tempo, é temporal; se indica
                        condição, é condicional.
                      </AlertBox>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                        <div className="p-3 bg-muted/50 rounded-xl border border-border">
                          <p className="font-bold text-lg mb-1">Temporal</p>
                          <p>
                            "Desde que entrou na empresa, o técnico se
                            destacou."
                          </p>
                          <p className="text-lg text-muted-foreground">
                            (= A partir do momento em que)
                          </p>
                        </div>
                        <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
                          <p className="font-bold text-lg mb-1">Condicional</p>
                          <p>
                            "Aprovarei o projeto, desde que o orçamento seja
                            respeitado."
                          </p>
                          <p className="text-lg text-muted-foreground">
                            (= Contanto que / desde que = condição)
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Conectivos Causais: Registro Informal vs Formal"
              description="A distinção de registro entre conectivos causais na linguagem formal e técnica."
              variant="blue"
            />
            <Comparison
              title="Substituição de Causal — Diferença de Registro"
              left={{
                title: "Registro Informal",
                content:
                  "O projeto foi suspenso porque o orçamento foi excedido.",
                description:
                  "'Porque' é correto e neutro, mas tem tom mais conversacional.",
                variant: "info",
              }}
              right={{
                title: "Registro Formal",
                content:
                  "O projeto foi suspenso, tendo em vista que o orçamento foi excedido.",
                description:
                  "'Tendo em vista que' é equivalente causal de registro mais elevado — preferido em documentos técnicos.",
                variant: "success",
              }}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-orange-500/10 rounded-full shadow-inner ring-1 ring-orange-500/20">
                      <LuLink className="w-12 h-12 text-orange-500" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      Conectivos Causais
                    </span>
                    <span className="text-sm text-orange-500/80 font-medium">
                      O Gatilho da Motivação
                    </span>
                  </div>
                }
                verso={
                  <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-2 text-orange-500 font-bold border-b border-orange-500/10 pb-3">
                      <LuCheck className="w-5 h-5 shrink-0" />
                      <span className="tracking-widest uppercase text-xs">
                        Arqueologia Causal
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Os conectivos causais (
                      <em>porque, uma vez que, visto que, porquanto</em>)
                      indicam o motivo que gerou a ação principal. Em
                      reescritas, a substituição por "porquanto" é a favorita da
                      banca para testar vocabulário erudito.
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Atenção: A causa sempre ocorre cronologicamente{" "}
                      <strong>antes</strong> do efeito. Se a reescrita inverter
                      essa lógica temporal, o sentido foi alterado e a opção
                      está incorreta.
                    </p>
                  </div>
                }
                categoria="Eixo Lógico"
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-blue-500/10 rounded-full shadow-inner ring-1 ring-blue-500/20">
                      <LuLightbulb className="w-12 h-12 text-blue-500" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      A Bifurcação do "Pois"
                    </span>
                    <span className="text-sm text-blue-500/80 font-medium">
                      Causal vs Explicativo
                    </span>
                  </div>
                }
                verso={
                  <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-2 text-blue-500 font-bold border-b border-blue-500/10 pb-3">
                      <LuCheck className="w-5 h-5 shrink-0" />
                      <span className="tracking-widest uppercase text-xs">
                        Diferença de Escopo
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      O <strong>Pois Causal</strong> introduz a causa real
                      ("Faltou, pois estava doente"). O{" "}
                      <strong>Pois Explicativo</strong> justifica uma ordem ou
                      suposição ("Saia, pois está tarde").
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Para a CESGRANRIO, o explicativo costuma vir após
                      imperativos. A troca de um pelo outro em reescrita pode
                      ser sutil, mas altera a natureza da relação entre as
                      orações (subordinação causal vs coordenação explicativa).
                    </p>
                  </div>
                }
                categoria="Eixo Lógico"
              />
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Mapa Completo de Conjunções por Valor Lógico"
              description="Guia completo de equivalência conjuntiva por valor lógico e semântico."
              variant="blue"
            />
            <p className="text-muted-foreground text-lg leading-relaxed">
              Em reescrita, a equivalência conjuntiva só é válida dentro do
              mesmo <strong>valor lógico</strong>. Nunca troque uma conjunção
              por outra de valor diferente, mesmo que pareça sinônima na língua
              cotidiana.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
              {[
                {
                  valor: "Causal",
                  cor: "bg-orange-500/10 border-orange-500/20",
                  lista:
                    "porque • pois • já que • uma vez que • visto que • tendo em vista que • porquanto • dado que",
                },
                {
                  valor: "Condicional",
                  cor: "bg-yellow-500/10 border-yellow-500/20",
                  lista:
                    "se • caso • desde que • contanto que • a não ser que • salvo se",
                },
                {
                  valor: "Concessiva",
                  cor: "bg-red-500/10 border-red-500/20",
                  lista:
                    "embora • ainda que • mesmo que • posto que • conquanto • apesar de que • por mais que",
                },
                {
                  valor: "Conclusiva",
                  cor: "bg-green-500/10 border-green-500/20",
                  lista:
                    "portanto • logo • por isso • por conseguinte • assim • destarte • dessa forma",
                },
                {
                  valor: "Adversativa",
                  cor: "bg-blue-500/10 border-blue-500/20",
                  lista:
                    "mas • porém • contudo • todavia • no entanto • entretanto • não obstante",
                },
                {
                  valor: "Temporal",
                  cor: "bg-purple-500/10 border-purple-500/20",
                  lista:
                    "quando • enquanto • assim que • logo que • desde que • antes que • depois que",
                },
              ].map((item) => (
                <div
                  key={item.valor}
                  className={`p-4 ${item.cor} border rounded-xl`}
                >
                  <p className="font-bold text-lg mb-2">{item.valor}</p>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {item.lista}
                  </p>
                </div>
              ))}
            </div>
            <AlertBox tipo="danger" titulo="Cruzamento Proibido">
              Nunca troque uma concessiva por uma causal ou uma condicional por
              uma conclusiva. Esses cruzamentos são os distratores mais comuns
              nas questões de reescrita da CESGRANRIO.
            </AlertBox>
          </section>

          {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A substituição de 'Portanto' por 'Por conseguinte' mantém o sentido?"
          alternativas={[
            { letra: "A", texto: "Sim, ambos são conclusivos.", correta: true },
                { letra: "B", texto: "Não, um é conclusivo e o outro causal.", correta: false },
                { letra: "C", texto: "Sim, mas um pede vírgula e o outro não.", correta: false },
                { letra: "D", texto: "Não, ", correta: false },
                { letra: "E", texto: "Varia conforme o sujeito da frase.", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "São conectivos sinônimos de valor conclusivo." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
            questoes={quizM6}
            titulo="QUIZ: Equivalência Conjuntiva"
            icone="🎯"
            numero={4}
            onComplete={(score) => handleModuleComplete("modulo-6", score)}
            variant="blue"
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 7: O DUELO CONCESSIVO ──────────────────────── */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <ModuleBanner
          numero={7}
          titulo="O Duelo Concessivo"
          descricao="Embora vs Mas. A troca mais perigosa e frequente da banca Cesgranrio."
          variant="blue"
        />

        {/* ★ RICH INTRO SECTION - Módulo 7 */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="A Arte da Concessão Estratégica"
            description="A arte da concessão estratégica e o domínio das relações de oposição atenuada."
            variant="blue"
          />

          <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
            {/* PARÁGRAFO 1: CONCEITO CIENTÍFICO */}
            <p>
              A concessão constitui-se como fenômeno sintático-semântico que
              estabelece relação de adversidade atenuada, onde uma oração
              subordinada admite um fato contrário sem invalidar a oração
              principal. Segundo a norma culta, as estruturas concessivas
              classificam-se em coordenativas adversativas ("mas", "porém",
              "contudo") e subordinativas concessivas ("embora", "ainda que",
              "apesar de que", "conquanto"). A transposição entre estas
              categorias exige mudança fundamental: as coordenativas exigem
              indicativo e orações independentes; as concessivas requerem
              subjuntivo e subordinação sintática. A CESGRANRIO explora
              sistematicamente esta complexa transformação.
            </p>

            {/* PARÁGRAFO 2: EXPLICAÇÃO INTUITIVA */}
            <p>
              Em outras palavras, a concessão é como negociar um acordo — você
              admite um ponto contrário ("embora chova") mas mantém sua posição
              principal ("vamos à praia"). O "mas" é como uma barreira rígida:
              separa completamente as ideias. O "embora" é como uma ponte
              flexível: conecta as ideias mesmo que se oponham. A diferença
              crucial está no modo verbal: "Ele trabalhou, mas não concluiu"
              (indicativo + independência) vs "Embora trabalhasse, não concluiu"
              (subjuntivo + subordinação). É a mesma situação, mas com
              diferentes estratégias argumentativas.
            </p>

            {/* PARÁGRAFO 3: REGRAS E TÉCNICAS */}
            <p>
              As técnicas de transposição concessiva fundamentam-se em
              princípios rigorosos:{" "}
              <strong>mudança obrigatória do modo verbal</strong>
              (indicativo → subjuntivo imperfeito),{" "}
              <strong>inversão da ordem das orações</strong> (frequentemente a
              concessiva antecede a principal), e{" "}
              <strong>preservação da força argumentativa</strong> (a concessão
              admite o obstáculo sem anular a conclusão). As conjunções
              coordenativas ("mas", "porém", "todavia", "contudo") mantêm
              estrutura independente. As locuções concessivas ("embora", "ainda
              que", "apesar de que", "conquanto") exigem subjuntivo e
              estabelecem hierarquia sintática clara entre oração principal e
              subordinada.
            </p>

            {/* PARÁGRAFO 4: CONTEXTO PETROBRAS */}
            <p>
              No ambiente técnico da Petrobras, a concessão é fundamental para
              elaboração de relatórios de análise de risco e comunicação de
              decisões complexas. "O equipamento apresentou anomalia, mas a
              produção continuou" (coordenativa) enfatiza a persistência
              operacional. "Embora o equipamento apresentasse anomalia, a
              produção continuou" (concessiva) admite o problema como fator
              conhecido e controlado. Em laudos de segurança, "Apesar de as
              barreiras estarem funcionando, ocorreu o incidente" demonstra
              reconhecimento de falha sistêmica sem eximir responsabilidades.
              Esta nuance comunicacional é essencial para documentação técnica
              precisa.
            </p>

            {/* PARÁGRAFO 5: pontos de atenção CESGRANRIO */}
            <p>
              A CESGRANRIO explora sistematicamente as armadilhas da
              transposição concessiva. As questões frequentemente testam:
              identificação da mudança correta do modo verbal ("trabalhou" →
              "trabalhasse"), reconhecimento de conectivos equivalentes ("mas" →
              "embora", "porém" → "ainda que"), e manutenção da lógica
              argumentativa (a concessão admite o contrário sem invalidar o
              principal). O examinando deve desenvolver sensibilidade para
              distinguir quando a transposição é gramaticalmente obrigatória e
              quando altera sutilmente a força argumentativa. Erros comuns
              incluem manter o indicativo após "embora" ou perder a relação de
              subordinação necessária.
            </p>

            {/* CAIXA DE DESTAQUE: Duelo Concessivo */}
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 rounded-lg border border-rose-200 dark:border-rose-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">O Mapa da Concessão</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl mb-2">⚔️</div>
                  <strong>Coordenativas</strong>
                  <p>
                    Mas, Porém, Contudo
                    <br />
                    Todavia, No entanto
                    <br />
                    Indicativo + Independência
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🌉</div>
                  <strong>Concessivas</strong>
                  <p>
                    Embora, Ainda que
                    <br />
                    Apesar de que, Conquanto
                    <br />
                    Subjuntivo + Subordinação
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🔄</div>
                  <strong>Transformação</strong>
                  <p>
                    "Mas produziu" →<br />
                    "Embora produzisse"
                    <br />
                    Sempre muda o modo!
                  </p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-rose-100 dark:bg-rose-900/30 rounded text-sm">
                <strong>Regra de Ouro:</strong> Coordenativa = Indicativo (fato
                certo). Concessiva = Subjuntivo (fato admitido mas incerto).
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Embora x Mas — O Duelo Concessivo"
              description="A complexa transposição entre adversidade (mas) e concessão (embora)."
              variant="blue"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-rose-500/10 rounded-full shadow-inner ring-1 ring-rose-500/20">
                      <LuRepeat className="w-12 h-12 text-rose-500" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      Mudança de Modo
                    </span>
                    <span className="text-sm text-rose-500/80 font-medium">
                      O Gatilho do Subjuntivo
                    </span>
                  </div>
                }
                verso={
                  <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-2 text-rose-500 font-bold border-b border-rose-500/10 pb-3">
                      <LuCheck className="w-5 h-5 shrink-0" />
                      <span className="tracking-widest uppercase text-xs">
                        Regra de Ouro
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Ao trocar um conectivo adversativo (<strong>mas</strong>)
                      por um concessivo (<strong>embora</strong>), a força da
                      frase muda e o modo verbal{" "}
                      <strong>obrigatoriamente</strong> migra do Indicativo para
                      o Subjuntivo.
                    </p>
                    <div className="bg-muted/50 p-2 rounded border border-border text-xs italic">
                      "Mas produziu" (Certo) → "Embora produzisse" (Hipótese
                      admitida)
                    </div>
                  </div>
                }
                categoria="Eixo Gramatical"
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-indigo-500/10 rounded-full shadow-inner ring-1 ring-indigo-500/20">
                      <LuBookOpen className="w-12 h-12 text-indigo-500" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      Arsenal Concessivo
                    </span>
                    <span className="text-sm text-indigo-500/80 font-medium">
                      Substitutos de Avançado
                    </span>
                  </div>
                }
                verso={
                  <div className="space-y-3 p-4 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-2 text-indigo-500 font-bold border-b border-indigo-500/10 pb-2">
                      <LuCheck className="w-5 h-5 shrink-0" />
                      <span className="tracking-widest uppercase text-xs">
                        Equivalências
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {[
                        "embora",
                        "conquanto",
                        "posto que",
                        "ainda que",
                        "mesmo que",
                        "malgrado",
                      ].map((c) => (
                        <span
                          key={c}
                          className="px-2 py-0.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-md text-[10px] font-bold uppercase"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                    <p className="text-[11px] leading-relaxed text-muted-foreground">
                      Todas estas formas introduzem uma oposição que não impede
                      o fato principal. <strong>Conquanto</strong> e{" "}
                      <strong>Posto que</strong> são os favoritos da CESGRANRIO
                      para confundir o candidato desatento.
                    </p>
                  </div>
                }
                categoria="Léxico"
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-orange-500/10 rounded-full shadow-inner ring-1 ring-orange-500/20">
                      <LuZap className="w-12 h-12 text-orange-500" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      O Choque de Ênfase
                    </span>
                    <span className="text-sm text-orange-500/80 font-medium">
                      Onde mora o Sentido
                    </span>
                  </div>
                }
                verso={
                  <div className="space-y-3 p-4 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-2 text-orange-500 font-bold border-b border-orange-500/10 pb-2">
                      <LuCheck className="w-5 h-5 shrink-0" />
                      <span className="tracking-widest uppercase text-xs">
                        Análise de Peso
                      </span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-muted-foreground">
                      No <strong>Mas</strong>, a segunda oração é a informação
                      principal. No <strong>Embora</strong>, a informação
                      principal está na oração que <em>não</em> tem o conectivo.
                    </p>
                    <div className="bg-orange-500/5 p-2 rounded border border-orange-500/10 text-[10px]">
                      <strong>Mas:</strong> Ênfase no obstáculo vencido.
                      <br />
                      <strong>Embora:</strong> Ênfase na ação principal
                      realizada.
                    </div>
                  </div>
                }
                categoria="Pragmática"
              />
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Comparação: Adversativa vs Concessiva na Prática"
              description="Análise prática da mudança de modo verbal e ênfase argumentativa."
              variant="blue"
            />
            <Comparison
              title="Mesma ideia — estruturas diferentes"
              left={{
                title: "Adversativa (coordenação)",
                content:
                  "O relatório estava incompleto, mas foi aprovado pela diretoria.",
                description:
                  "Oração coordenada adversativa. Verbo no Indicativo. Ênfase na aprovação.",
                variant: "info",
              }}
              right={{
                title: "Concessiva (subordinação)",
                content:
                  "Embora o relatório estivesse incompleto, foi aprovado pela diretoria.",
                description:
                  "Oração subordinada adverbial concessiva. Verbo no Subjuntivo Imperfeito. Mesma ênfase — estrutura hierárquica.",
                variant: "success",
              }}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Concessão com Gerúndio e Infinitivo"
              description="Estruturas concessivas reduzidas de gerúndio e infinitivo."
              variant="blue"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-emerald-500/10 rounded-full shadow-inner ring-1 ring-emerald-500/20">
                      <LuFileText className="w-12 h-12 text-emerald-500" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      Concessão Reduzida
                    </span>
                    <span className="text-sm text-emerald-500/80 font-medium">
                      O Poder do Gerúndio
                    </span>
                  </div>
                }
                verso={
                  <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-2 text-emerald-500 font-bold border-b border-emerald-500/10 pb-3">
                      <LuCheck className="w-5 h-5 shrink-0" />
                      <span className="tracking-widest uppercase text-xs">
                        Formas Nominais
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      A concessão pode ignorar conjunções usando gerúndio ou
                      locuções prepositivas. <strong>"Apesar de"</strong> é o
                      coringa para transformar qualquer oração em concessiva sem
                      erro.
                    </p>
                    <div className="bg-emerald-500/5 p-2 rounded border border-emerald-500/10 text-xs italic">
                      "Mesmo tendo falhado..." = "Embora tivesse falhado..."
                    </div>
                  </div>
                }
                categoria="Sintaxe Avançada"
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-amber-500/10 rounded-full shadow-inner ring-1 ring-amber-500/20">
                      <LuScale className="w-12 h-12 text-amber-500" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      Real vs Hipotético
                    </span>
                    <span className="text-sm text-amber-500/80 font-medium">
                      Embora vs Mesmo que
                    </span>
                  </div>
                }
                verso={
                  <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-2 text-amber-500 font-bold border-b border-amber-500/10 pb-3">
                      <LuCheck className="w-5 h-5 shrink-0" />
                      <span className="tracking-widest uppercase text-xs">
                        Nuance Semântica
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      <strong>Embora</strong> foca em fatos concretos (estava
                      chovendo). <strong>Mesmo que</strong> foca em
                      possibilidades (pode ser que chova). A banca testa essa
                      distinção em questões de alta complexidade.
                    </p>
                    <div className="bg-amber-500/5 p-2 rounded border border-amber-500/10 text-xs italic">
                      Embora estivesse (Real) ≠ Mesmo que esteja (Hipótese)
                    </div>
                  </div>
                }
                categoria="Semântica"
              />
            </div>
          </section>

          {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Ao remover as vírgulas de 'Os técnicos, que usam EPI, estão seguros', o sentido:"
          alternativas={[
            { letra: "A", texto: "Não muda.", correta: false },
                { letra: "B", texto: "Muda: de ", correta: true },
                { letra: "C", texto: "Muda: ", correta: false },
                { letra: "D", texto: "Torna-se gramaticalmente errado.", correta: false },
                { letra: "E", texto: "Enfatiza a segurança.", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Com vírgula = Explicativa (generaliza)." },
            { titulo: "Passo 2", conteudo: "Sem vírgula = Restritiva (especifica um grupo)." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
            questoes={getRandomQuestions(QUIZ_M7_PONTUACAO, 4)}
            titulo="QUIZ: O Duelo Concessivo"
            icone="🎯"
            numero={4}
            onComplete={(score) => handleModuleComplete("modulo-7", score)}
            variant="blue"
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 8: PONTUAÇÃO E SENTIDO ─────────────────────── */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <ModuleBanner
          numero={8}
          titulo="Pontuação e Sentido"
          descricao="A vírgula não é apenas uma pausa; ela é o interruptor do sentido explicativo/restritivo."
          variant="blue"
        />

        {/* ★ RICH INTRO SECTION - Módulo 8 */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="A Arquitetura da Pontuação Semântica"
            description="A função lógica da vírgula e o impacto semântico da pontuação na reescrita."
            variant="blue"
          />

          <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
            {/* PARÁGRAFO 1: CONCEITO CIENTÍFICO */}
            <p>
              A pontuação constitui-se como sistema de marcação gráfica que
              organiza a estrutura sintática e estabelece relações semânticas
              entre os constituintes da oração. Conforme a norma gramatical, a vírgula
              funciona como operador lógico de inclusão/exclusão, determinando
              se o adjetivo ou oração adjetiva possui caráter explicativo
              (generalizante) ou restritivo (especificador). Na estrutura
              explicativa, a vírgula indica que a característica se aplica a
              todos os elementos da classe; na restritiva, especifica apenas um
              subconjunto. A CESGRANRIO explora sistematicamente esta dualidade
              funcional, exigindo identificação precisa do impacto semântico da
              pontuação.
            </p>

            {/* PARÁGRAFO 2: EXPLICAÇÃO INTUITIVA */}
            <p>
              Em outras palavras, a vírgula é como um interruptor de luz — ela
              pode iluminar toda a sala ou apenas um canto específico. "Os
              técnicos, que usam EPI, estão seguros" (com vírgula) é como
              acender a luz geral: todos os técnicos usam EPI e estão seguros.
              "Os técnicos que usam EPI estão seguros" (sem vírgula) é como
              focar um holofote: apenas os técnicos que usam EPI estão seguros,
              os demais não. A mesma informação mas com alcance completamente
              diferente. A pontuação não é estética, é lógica — define quem
              entra ou sai da afirmação.
            </p>

            {/* PARÁGRAFO 3: REGRAS E TÉCNICAS */}
            <p>
              As técnicas de pontuação semântica fundamentam-se em princípios
              rigorosos: <strong>explicatividade</strong> (vírgula antes de
              adjetivas ou orações adjetivas que generalizam),
              <strong>restritividade</strong> (ausência de vírgula em adjetivas
              ou orações que especificam), e{" "}
              <strong>hierarquia informativa</strong> (o que é essencial vs o
              que é acessório). Vírgulas explicativas antecedem orações com
              valor universal: "Os homens, que são mortais, buscam
              imortalidade". Restritivas omitem a vírgula para especificar: "Os
              homens que buscam imortalidade são mortais". A decisão pela
              presença ou ausência da vírgula altera fundamentalmente o campo
              semântico da enunciação.
            </p>

            {/* PARÁGRAFO 4: CONTEXTO PETROBRAS */}
            <p>
              No ambiente técnico da Petrobras, a precisão pontuacional é
              crítica para elaboração de manuais de segurança e relatórios
              operacionais. "Os equipamentos, que possuem certificação, podem
              operar" (explicativa) indica que todos os equipamentos
              certificados estão autorizados. "Os equipamentos que possuem
              certificação podem operar" (restritiva) especifica que apenas os
              equipamentos certificados têm permissão operacional. Em
              procedimentos de emergência, esta distinção pode salvar vidas:
              "Válvulas, que devem ser fechadas, estão bloqueadas" (todas as
              válvulas) vs "Válvulas que devem ser fechadas estão bloqueadas"
              (apenas as válvulas críticas). A clareza semântica é questão de
              segurança operacional.
            </p>

            {/* PARÁGRAFO 5: pontos de atenção CESGRANRIO */}
            <p>
              A CESGRANRIO explora sistematicamente as armadilhas da pontuação
              semântica. As questões frequentemente testam: identificação do
              impacto da vírgula no sentido (explicativo vs restritivo),
              reconhecimento de alterações semânticas sutis, e manutenção da
              lógica inclusiva/exclusiva. O examinando deve desenvolver
              sensibilidade para identificar quando a vírgula generaliza ou
              especifica, e como isso afeta o universo de referência da
              afirmação. Erros comuns incluem tratar toda vírgula como pausa
              respiratória ou ignorar que a pontuação pode redefinir
              completamente o campo semântico da enunciação sem alterar uma
              palavra.
            </p>

            {/* CAIXA DE DESTAQUE: Guia de Pontuação Semântica */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 rounded-lg border border-cyan-200 dark:border-cyan-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">
                O Interruptor de Sentidos
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl mb-2">💡</div>
                  <strong>COM Vírgula</strong>
                  <p>
                    Explicativa
                    <br />
                    Generaliza
                    <br />
                    "Todos os elementos"
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🎯</div>
                  <strong>SEM Vírgula</strong>
                  <p>
                    Restritiva
                    <br />
                    Especifica
                    <br />
                    "Apenas alguns elementos"
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">⚠️</div>
                  <strong>Impacto</strong>
                  <p>
                    Muda o campo
                    <br />
                    semântico
                    <br />
                    sem mudar palavras
                  </p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded text-sm">
                <strong>Regra de Ouro:</strong> Vírgula = Expansão do universo.
                Sem vírgula = Restrição do universo.
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="O Poder da Vírgula"
              description="Aprofundamento prático na distinção entre explicações e restrições."
              variant="blue"
            />
            <CardCarousel
              itemsPerView={2}
              cards={[
                {
                  title: "A Regra das Adjetivas",
                  icone: <LuCheck />,
                  descricao: (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-muted/50 rounded-xl border border-border">
                          <p className="text-lg font-bold mb-1">
                            COM Vírgula (Explicativa)
                          </p>
                          <p className="text-lg">
                            Os homens, que são racionais, lutam. (Todos os
                            homens)
                          </p>
                        </div>
                        <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                          <p className="text-lg font-bold mb-1 text-primary">
                            SEM Vírgula (Restritiva)
                          </p>
                          <p className="text-lg">
                            Os homens que são racionais lutam. (Somente os
                            racionais)
                          </p>
                        </div>
                      </div>
                      <p className="text-lg text-muted-foreground">
                        A presença ou ausência da vírgula muda completamente
                        quem está incluído na afirmação — por isso a banca usa
                        essa distinção em questões de reescrita.
                      </p>
                    </div>
                  ),
                },
                {
                  title: "Vírgula antes de Conjunção — Quando é Obrigatória?",
                  icone: <LuLightbulb />,
                  descricao: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        A vírgula antes de uma conjunção coordenativa não é
                        sempre opcional — ela é obrigatória em alguns casos e
                        proibida em outros:
                      </p>
                      <div className="space-y-2 text-lg">
                        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                          <p className="font-bold text-lg mb-1">
                            Obrigatória: adversativas e conclusivas
                          </p>
                          <p>
                            "O técnico chegou atrasado<strong>,</strong> mas
                            concluiu o serviço."
                          </p>
                          <p>
                            "Estudou bastante<strong>,</strong> portanto foi
                            aprovado."
                          </p>
                        </div>
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                          <p className="font-bold text-lg mb-1">
                            Proibida (em geral): aditiva simples com sujeito
                            igual
                          </p>
                          <p>
                            "O engenheiro planejou e executou o projeto." (sem
                            vírgula)
                          </p>
                        </div>
                        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                          <p className="font-bold text-lg mb-1">
                            Permitida: aditiva com sujeito diferente
                          </p>
                          <p>
                            "A diretoria aprovou o contrato<strong>,</strong> e
                            o jurídico o arquivou."
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  title: "Pontuação e Reescrita — Como a Banca Cobra",
                  icone: <LuTarget />,
                  descricao: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        A CESGRANRIO apresenta duas versões de uma frase —
                        idênticas exceto pela pontuação — e pergunta se o
                        sentido foi mantido. As principais armadilhas:
                      </p>
                      <ul className="list-disc pl-5 text-lg space-y-2 text-muted-foreground">
                        <li>
                          Adicionar vírgula em oração restritiva transforma-a em
                          explicativa, alterando o escopo da afirmação.
                        </li>
                        <li>
                          Remover vírgula antes de "mas" é erro gramatical —
                          invalida a reescrita inteira.
                        </li>
                        <li>
                          Usar ponto-e-vírgula onde havia vírgula pode alterar a
                          relação sintática entre orações.
                        </li>
                      </ul>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Vírgula que Muda Tudo"
              description="Comparação prática entre o uso e omissão da vírgula em contextos operacionais."
              variant="blue"
            />
            <Comparison
              title="Presença vs Ausência de Vírgula — Mudança de Sentido"
              left={{
                title: "Com Vírgula (Explicativa)",
                content:
                  "Os técnicos da Petrobras, que trabalham em plataformas, recebem adicional de periculosidade.",
                description:
                  "Refere-se a TODOS os técnicos — a oração relativa é um comentário adicional.",
                variant: "info",
              }}
              right={{
                title: "Sem Vírgula (Restritiva)",
                content:
                  "Os técnicos da Petrobras que trabalham em plataformas recebem adicional de periculosidade.",
                description:
                  "Refere-se APENAS aos técnicos que trabalham em plataformas — os demais, não.",
                variant: "warning",
              }}
            />
            <AlertBox
              tipo="danger"
              titulo="Vírgula + Conjunção Adversativa na Reescrita"
            >
              A banca frequentemente propõe a reescrita de uma frase com "mas"
              sem vírgula antecedente. Isso é um erro gramatical — antes de
              "mas" adversativo, a vírgula é <strong>obrigatória</strong>.
              Reescritas que omitem essa vírgula devem ser marcadas como
              incorretas.
            </AlertBox>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Outros Sinais de Pontuação na Reescrita"
              description="O impacto semântico de outros sinais de pontuação em contextos de reescrita."
              variant="blue"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-emerald-500/10 rounded-full shadow-inner ring-1 ring-emerald-500/20">
                      <LuQuote className="w-12 h-12 text-emerald-500" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      Dois-Pontos & Travessão
                    </span>
                    <span className="text-sm text-emerald-500/80 font-medium">
                      A Voz do Relato
                    </span>
                  </div>
                }
                verso={
                  <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-2 text-emerald-500 font-bold border-b border-emerald-500/10 pb-3">
                      <LuCheck className="w-5 h-5 shrink-0" />
                      <span className="tracking-widest uppercase text-xs">
                        Mecânica do Discurso
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Na reescrita, os <strong>dois-pontos</strong> que
                      introduzem o discurso direto desaparecem na transição para
                      o indireto. O <strong>travessão</strong> de diálogo também
                      é eliminado em favor de conjunções integrantes (
                      <em>que</em>).
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground italic border-l-2 border-emerald-500/20 pl-3">
                      "Ele disse: — Irei" → "Ele disse que iria". O travessão
                      explicativo (usado como parênteses) mantém o sentido se
                      substituído por vírgulas.
                    </p>
                  </div>
                }
                categoria="Pontuação"
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-blue-500/10 rounded-full shadow-inner ring-1 ring-blue-500/20">
                      <LuList className="w-12 h-12 text-blue-500" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      Ponto-e-Vírgula
                    </span>
                    <span className="text-sm text-blue-500/80 font-medium">
                      Hierarquia e Extensão
                    </span>
                  </div>
                }
                verso={
                  <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-2 text-blue-500 font-bold border-b border-blue-500/10 pb-3">
                      <LuCheck className="w-5 h-5 shrink-0" />
                      <span className="tracking-widest uppercase text-xs">
                        Pausa Intermediária
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      O <strong>ponto-e-vírgula</strong> separa orações
                      coordenadas extensas ou itens de uma enumeração técnica.
                      Em reescritas, substituir uma vírgula por ponto-e-vírgula
                      é gramaticalmente aceitável para evitar a fragmentação do
                      texto.
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Dica de Ouro: No padrão Petrobras, o ponto-e-vírgula é
                      comum em listas de obrigações contratuais ou manuais
                      técnicos, garantindo que o fim de um item não seja
                      confundido com o fim do parágrafo.
                    </p>
                  </div>
                }
                categoria="Pontuação"
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-amber-500/10 rounded-full shadow-inner ring-1 ring-amber-500/20">
                      <LuFileText className="w-12 h-12 text-amber-500" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      Parênteses e Travessões
                    </span>
                    <span className="text-sm text-amber-500/80 font-medium">
                      O Isolamento do Aposto
                    </span>
                  </div>
                }
                verso={
                  <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-2 text-amber-500 font-bold border-b border-amber-500/10 pb-3">
                      <LuCheck className="w-5 h-5 shrink-0" />
                      <span className="tracking-widest uppercase text-xs">
                        Equivalência de Isolamento
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Na reescrita, o <strong>par de travessões</strong> é
                      semanticamente equivalente ao{" "}
                      <strong>par de parênteses</strong> ou ao{" "}
                      <strong>par de vírgulas</strong> para isolar apostos
                      explicativos.
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Atenção: A banca pode propor trocar um pelo outro. O
                      sentido se mantém, mas o <strong>ênfase</strong> muda:
                      travessões destacam a informação, parênteses a "escondem"
                      e vírgulas a neutralizam.
                    </p>
                  </div>
                }
                categoria="Pontuação"
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-purple-500/10 rounded-full shadow-inner ring-1 ring-purple-500/20">
                      <LuMessageCircle className="w-12 h-12 text-purple-500" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      Reticências & Ponto
                    </span>
                    <span className="text-sm text-purple-500/80 font-medium">
                      A Quebra da Intenção
                    </span>
                  </div>
                }
                verso={
                  <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-2 text-purple-500 font-bold border-b border-purple-500/10 pb-3">
                      <LuCheck className="w-5 h-5 shrink-0" />
                      <span className="tracking-widest uppercase text-xs">
                        Modalidade do Enunciado
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      As <strong>reticências</strong> indicam suspensão de
                      pensamento, hesitação ou ironia. Substituí-las por um{" "}
                      <strong>ponto final</strong> na reescrita altera a
                      modalidade do discurso de "subjetivo/hesitante" para
                      "objetivo/categórico".
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Para a CESGRANRIO, essa mudança invalida a manutenção do
                      sentido original, pois altera a atitude do autor perante o
                      enunciado.
                    </p>
                  </div>
                }
                categoria="Pontuação"
              />
            </div>
            <AlertBox tipo="info" titulo="Pontuação como Recurso de Coesão">
              Em questões de reescrita, a pontuação não é apenas estética — ela
              é um marcador de relações lógicas (explicação, restrição,
              enumeração, oposição). Qualquer alteração de sinal pode mudar o
              valor semântico da frase.
            </AlertBox>
          </section>

          {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Qual dessas reescritas de 'Embora fizesse calor, ele corria' mantém a oposição?"
          alternativas={[
            { letra: "A", texto: "Apesar de fazer calor, ele corria.", correta: true },
                { letra: "B", texto: "Visto que fazia calor, ele corria.", correta: false },
                { letra: "C", texto: "Caso fizesse calor, ele corria.", correta: false },
                { letra: "D", texto: "Conforme fazia calor, ele corria.", correta: false },
                { letra: "E", texto: "Pelo fato de fazer calor, ele corria.", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "A oposição (concessão) é mantida pela locução 'Apesar de'." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
            questoes={quizM8}
            titulo="QUIZ: Pontuação e Sentido"
            icone="🎯"
            numero={4}
            onComplete={(score) => handleModuleComplete("modulo-8", score)}
            variant="blue"
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 9: LABORATÓRIO CESGRANRIO ───────────────────── */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <ModuleBanner
          numero={9}
          titulo="Laboratório CESGRANRIO"
          descricao="Analise as 5 trocas que a banca mais ama e que derrubam 90% dos candidatos."
          variant="blue"
        />

        {/* ★ RICH INTRO SECTION - Módulo 9 */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="A Anatomia da pontos de atenção"
            description="A anatomia das pontos de atenção da banca e o checklist de sobrevivência do candidato."
            variant="blue"
          />

          <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
            {/* PARÁGRAFO 1: CONCEITO CIENTÍFICO */}
            <p>
              As pontos de atenção linguísticas constituem-se como fenômenos de
              interferência semântica que exploram limitações cognitivas do
              processamento textual. Segundo pesquisas em psicolinguística, a
              banca CESGRANRIO explora sistematicamente vieses de proximidade
              fonética, analogia malformada e interferência de registros. Os
              erros mais frequentes envolvem trocas paronímicas (onde/aonde),
              confusão entre conectivos polissêmicos (conquanto/contanto que), e
              violação de concordância em verbos impessoais (fazer tempo). Estas
              estratégias avaliam não apenas conhecimento gramatical, mas
              sensibilidade para distinções sutis que diferenciam candidatos
              medianos de exemplares.
            </p>

            {/* PARÁGRAFO 2: EXPLICAÇÃO INTUITIVA */}
            <p>
              Em outras palavras, as pontos de atenção são como minas terrestres
              linguísticas — parecem inofensivas mas explodem quando você menos
              espera. "Onde" vs "aonde" é como confundir "parado" com "andando"
              — um é lugar fixo, outro é movimento. "Conquanto" vs "contanto
              que" é como trocar "embora" por "se" — um admite o obstáculo,
              outro estabelece condição. "Faz anos" vs "fazem anos" é como
              pensar que o tempo tem plural — tempo é abstrato, não conta. A
              banca não testa gramática, testa atenção aos detalhes que fazem
              toda diferença entre correção e erro sutil.
            </p>

            {/* PARÁGRAFO 3: REGRAS E TÉCNICAS */}
            <p>
              As técnicas de identificação de pontos de atenção fundamentam-se em três
              princípios: <strong>análise de regência</strong> (onde exige lugar
              estático, aonde exige movimento),
              <strong>distinção semântica de conectivos</strong> (conquanto =
              concessivo, contanto que = condicional), e{" "}
              <strong>reconhecimento de impessoalidade</strong> (verbos como
              fazer, chover, nevar não têm sujeito, permanecem no singular).
              Outras armadilhas clássicas incluem substituição de "que" por "o
              qual" para evitar repetição, e identificação de "ao passo que"
              como expressão de proporcionalidade ou contraste simultâneo. O
              examinando deve desenvolver radar para estas sutilezas.
            </p>

            {/* PARÁGRAFO 4: CONTEXTO PETROBRAS */}
            <p>
              No ambiente técnico da Petrobras, estas distinções são cruciais
              para precisão documental. "A plataforma onde ocorreu o vazamento"
              (correto) vs "A plataforma aonde ocorreu o vazamento" (incorreto)
              — plataformas são lugares fixos, não se movem para lugar algum. Em
              relatórios de processo, "Conquanto as normas sejam rigorosas, os
              procedimentos devem ser seguidos" (concessão) vs "Contanto que as
              normas sejam rigorosas, os procedimentos devem ser seguidos"
              (condição). A precisão linguística reflete precisão técnica —
              pequenos erros podem indicar grandes falhas de compreensão
              operacional.
            </p>

            {/* PARÁGRAFO 5: pontos de atenção CESGRANRIO */}
            <p>
              A CESGRANRIO explora sistematicamente estas armadilhas através de
              questões que testam atenção aos detalhes. As pontos de atenção mais
              frequentes incluem: troca de "onde" por "aonde" em contextos
              estáticos, confusão entre "conquanto" (concessivo) e "contanto
              que" (condicional), tentativa de concordância com verbos
              impessoais ("fazem anos"), substituição inadequada de "que" por
              "cujo", e má interpretação de "ao passo que" como simples
              temporalidade. O candidato deve desenvolver sensibilidade para
              identificar quando uma substituição altera sutilmente o sentido ou
              viola regras gramaticais fundamentais.
            </p>

            {/* CAIXA DE DESTAQUE: Laboratório de pontos de atenção */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 rounded-lg border border-red-200 dark:border-red-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">O Arsenal da Banca</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl mb-2">📍</div>
                  <strong>Onde vs Aonde</strong>
                  <p>
                    Onde = Lugar fixo
                    <br />
                    Aonde = Movimento
                    <br />
                    "A casa onde moro"
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🔄</div>
                  <strong>Conquanto vs Contanto</strong>
                  <p>
                    Conquanto = Embora
                    <br />
                    Contanto = Se
                    <br />
                    "Conquanto chova, vou"
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">⏰</div>
                  <strong>Fazer Tempo</strong>
                  <p>
                    Sempre singular
                    <br />
                    "Faz anos", não "fazem"
                    <br />
                    Verbo impessoal
                  </p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 rounded text-sm">
                <strong>Regra de Sobrevivência:</strong> Se a troca parece fácil
                demais, provavelmente é pontos de atenção. Desconfie de substituições
                diretas sem análise.
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="As 5 Substituições Favoritas da CESGRANRIO"
              description="Os padrões de Avançado e as trocas favoritas da CESGRANRIO em provas técnicas."
              variant="blue"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-red-500/10 rounded-full shadow-inner ring-1 ring-red-500/20">
                      <LuTriangleAlert className="w-12 h-12 text-red-500" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      A Armadilha do Onde
                    </span>
                    <span className="text-sm text-red-500/80 font-medium">
                      Lugar Físico vs Abstrato
                    </span>
                  </div>
                }
                verso={
                  <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-2 text-red-500 font-bold border-b border-red-500/10 pb-3">
                      <LuCheck className="w-5 h-5 shrink-0" />
                      <span className="tracking-widest uppercase text-xs">
                        Foco no Referente
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      <strong>Onde</strong> só aceita antecedentes espaciais
                      físicos. Para reuniões, contratos ou processos, a
                      reescrita correta exige <strong>"em que"</strong> ou{" "}
                      <strong>"no qual"</strong>.
                    </p>
                    <div className="bg-red-500/5 p-2 rounded border border-red-500/10 text-[10px] italic">
                      ❌ Reunião onde...
                      <br />✅ Reunião em que decidimos...
                    </div>
                  </div>
                }
                categoria="Relativos"
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-indigo-500/10 rounded-full shadow-inner ring-1 ring-indigo-500/20">
                      <LuRepeat className="w-12 h-12 text-indigo-500" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      Posto vs Contanto
                    </span>
                    <span className="text-sm text-indigo-500/80 font-medium">
                      Concessão vs Condição
                    </span>
                  </div>
                }
                verso={
                  <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-2 text-indigo-500 font-bold border-b border-indigo-500/10 pb-3">
                      <LuCheck className="w-5 h-5 shrink-0" />
                      <span className="tracking-widest uppercase text-xs">
                        Lógica Oposta
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      <strong>Posto que</strong> é concessivo (= embora).{" "}
                      <strong>Contanto que</strong> é condicional (= se). Trocar
                      um pelo outro altera drasticamente a relação lógica do
                      texto.
                    </p>
                    <div className="bg-indigo-500/5 p-2 rounded border border-indigo-500/10 text-[10px] italic">
                      Embora (Fato admitido) ≠ Se (Condição exigida)
                    </div>
                  </div>
                }
                categoria="Conectivos"
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-amber-500/10 rounded-full shadow-inner ring-1 ring-amber-500/20">
                      <LuBrain className="w-12 h-12 text-amber-500" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      O Enigma do Cujo
                    </span>
                    <span className="text-sm text-amber-500/80 font-medium">
                      Posse e Concordância
                    </span>
                  </div>
                }
                verso={
                  <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-2 text-amber-500 font-bold border-b border-amber-500/10 pb-3">
                      <LuCheck className="w-5 h-5 shrink-0" />
                      <span className="tracking-widest uppercase text-xs">
                        Regras Rígidas
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Nunca use artigo após <strong>Cujo</strong>. Ele concorda
                      com o que vem depois (possuído), mas se refere ao que veio
                      antes (possuidor).
                    </p>
                    <div className="bg-amber-500/5 p-2 rounded border border-amber-500/10 text-[10px] italic">
                      ❌ Cujo o relatório...
                      <br />✅ Cujo relatório foi aprovado.
                    </div>
                  </div>
                }
                categoria="Relativos"
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-emerald-500/10 rounded-full shadow-inner ring-1 ring-emerald-500/20">
                      <LuZap className="w-12 h-12 text-emerald-500" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      Conteúdo Integrado
                    </span>
                    <span className="text-sm text-emerald-500/80 font-medium">
                      Passiva + Nominalização
                    </span>
                  </div>
                }
                verso={
                  <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-2 text-emerald-500 font-bold border-b border-emerald-500/10 pb-3">
                      <LuCheck className="w-5 h-5 shrink-0" />
                      <span className="tracking-widest uppercase text-xs">
                        Transformação Dupla
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      A banca ama reescrever verbos como nomes em estruturas
                      passivas. "Aprovou o plano" vira "A aprovação do plano".
                      Mantenha a clareza do agente!
                    </p>
                    <div className="bg-emerald-500/5 p-2 rounded border border-emerald-500/10 text-[10px] italic">
                      Ação (Verbo) → Estado/Evento (Nome)
                    </div>
                  </div>
                }
                categoria="Transposição"
              />
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Os 5 Erros que Derrubam Candidatos"
              description="Análise dos erros recorrentes da banca para evitar armadilhas comuns."
              variant="blue"
            />
            <AlertBox
              tipo="danger"
              titulo="Armadilhas Recorrentes em Provas Petrobras"
            >
              A CESGRANRIO repete padrões de erro em provas diferentes.
              Conhecê-los é vantagem competitiva decisiva. Estude cada um dos
              cinco abaixo até automatizá-los.
            </AlertBox>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  title: "Modalidade Trocada", 
                  desc: "Trocar 'pode' por 'deve' ou 'é possível' por 'é certo'. Possibilidade ≠ obrigação ≠ certeza.",
                  color: "rose"
                },
                { 
                  title: "Agente Omitido", 
                  desc: "Omitir o agente da passiva quando ele é essencial para o sentido original do texto.",
                  color: "orange"
                },
                { 
                  title: "Concessiva vs Condicional", 
                  desc: "Trocar 'embora' por 'contanto que'. São relações lógicas opostas que a banca adora misturar.",
                  color: "amber"
                },
                { 
                  title: "Tempo na Passiva", 
                  desc: "Mudar o tempo do verbo SER na passiva (ex: 'foi' por 'era'). O tempo deve ser idêntico ao da ativa.",
                  color: "blue"
                },
                { 
                  title: "Vírgula Restritiva", 
                  desc: "Adicionar vírgula em relativa restritiva, transformando-a em explicativa e alterando o escopo.",
                  color: "indigo"
                }
              ].map((err, i) => (
                <FlipCard
                  key={i}
                  frente={
                    <div className="flex flex-col items-center justify-center p-6 gap-4 text-center h-full">
                      <div className="p-3 bg-red-500/10 rounded-full ring-1 ring-red-500/20">
                        <LuTriangleAlert className="w-8 h-8 text-red-500" />
                      </div>
                      <span className="text-sm font-bold uppercase tracking-wider">{err.title}</span>
                    </div>
                  }
                  verso={
                    <div className="p-4 flex flex-col justify-center h-full space-y-2">
                      <div className="text-red-500 font-bold text-[10px] uppercase border-b border-red-500/10 pb-1">Armadilha #{i+1}</div>
                      <p className="text-xs leading-relaxed text-muted-foreground">{err.desc}</p>
                    </div>
                  }
                  categoria="Alerta de Erro"
                />
              ))}
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Comparação de Reescritas — Laboratório Prático"
              description="Laboratório prático de comparação de reescritas e detecção de erros sutis."
              variant="blue"
            />
            <Comparison
              title="Armadilha: Pronome Relativo 'Onde' vs 'Em que'"
              left={{
                title: "Incorreto — 'Onde' para abstrato",
                content:
                  "Este é o projeto onde todos os engenheiros trabalharam por dois anos.",
                description:
                  "'Projeto' não é lugar físico — 'onde' é inadequado aqui. Reescrita inválida.",
                variant: "warning",
              }}
              right={{
                title: "Correto — 'Em que' para abstrato",
                content:
                  "Este é o projeto em que todos os engenheiros trabalharam por dois anos.",
                description:
                  "'Em que' = pronome relativo preposicionado correto para referentes não-espaciais.",
                variant: "success",
              }}
            />
            <Comparison
              title="Armadilha: Concessiva vs Condicional"
              left={{
                title: "Concessiva (Embora) — fato adverso admitido",
                content:
                  "Embora o orçamento estivesse esgotado, o projeto foi concluído.",
                description:
                  "A escassez de orçamento é um fato real que não impediu a conclusão.",
                variant: "info",
              }}
              right={{
                title: "Condicional (Contanto que) — exigência futura",
                content:
                  "O projeto será concluído, contanto que o orçamento seja aprovado.",
                description:
                  "A aprovação do orçamento é condição necessária — sentido completamente diferente.",
                variant: "danger",
              }}
            />
          </section>

          {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A banca costuma trocar 'Onde' por 'Aonde' em frases de lugar fixo. Isso é:"
          alternativas={[
            { letra: "A", texto: "Uma reescrita válida.", correta: false },
                { letra: "B", texto: "Um erro de regência (Aonde exige movimento).", correta: true },
                { letra: "C", texto: "Apenas uma variação regional.", correta: false },
                { letra: "D", texto: "Correto se houver preposição ", correta: false },
                { letra: "E", texto: "Obrigatório no início de frases.", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Aonde = Para onde (movimento)." },
            { titulo: "Passo 2", conteudo: "Onde = Em que lugar (estático)." },
            { titulo: "Passo 3", conteudo: "A banca adora testar essa troca." }
          ]}
        />
        <QuizInterativo
            questoes={quizM9}
            titulo="QUIZ: Laboratório CESGRANRIO"
            icone="🎯"
            numero={4}
            onComplete={(score) => handleModuleComplete("modulo-9", score)}
            variant="blue"
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 10: Avaliação de Fixação Avançada ─────────────────────────── */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <ModuleBanner
          numero={10}
          titulo="Avaliação de Fixação Avançada"
          descricao="Simulado Final: 10 questões de reescrita global. O teste definitivo de sua semântica."
          variant="blue"
        />

        {/* ★ RICH INTRO SECTION - Módulo 10 */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="A Síntese da Maestria Linguística"
            description="A síntese da maestria linguística e a integração de todas as técnicas de reescrita."
            variant="blue"
          />

          <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
            {/* PARÁGRAFO 1: CONCEITO CIENTÍFICO */}
            <p>
              A maestria em reescrita constitui-se como competência
              metalinguística que integra conhecimento gramatical, sensibilidade
              semântica e capacidade de transposição estrutural. Segundo teorias
              da linguística aplicada, a reescrita eficaz exige domínio de três
              sistemas interdependentes: <strong>equivalência semântica</strong>
              (preservação do sentido nuclear),{" "}
              <strong>adequação sintática</strong> (conformidade estrutural), e
              <strong>compatibilidade pragmática</strong> (adequação ao contexto
              e registro). A avaliação final testa a capacidade de integrar
              todas as técnicas estudadas — paráfrase, sinonímia, transposição
              vocal, discurso reportado, nominalização, conectividade,
              concessão, pontuação semântica e identificação de pontos de atenção.
            </p>

            {/* PARÁGRAFO 2: EXPLICAÇÃO INTUITIVA */}
            <p>
              Em outras palavras, a Avaliação de Fixação Avançada é como o palco principal onde
              você apresenta todas as técnicas aprendidas. É como um chef mestre
              que deve dominar não apenas cortes básicos, mas também temperos,
              técnicas de cozimento, apresentação e harmonização de sabores.
              Cada questão final exige combinação de múltiplas habilidades:
              reconhecer que "malgrado a modernidade" é concessivo, que "são
              necessários" é passiva sintética, que "modernidade" é
              nominalização, e que tudo isso mantém o sentido original. Não
              basta saber as técnicas isoladamente — preciso integrá-las em
              performance coesa.
            </p>

            {/* PARÁGRAFO 3: REGRAS E TÉCNICAS */}
            <p>
              As técnicas de reescrita avançada fundamentam-se em princípios de
              integração sistemática:{" "}
              <strong>preservação do núcleo semântico</strong> (identificar o
              que é essencial e não pode ser alterado),{" "}
              <strong>domínio da transposição multimodal</strong> (combinar
              mudanças de voz, tempo, modo, e estrutura simultaneamente), e{" "}
              <strong>controle da complexidade</strong> (saber quando
              simplificar ou complexificar sem perder o sentido). As questões
              finais frequentemente exigem reescritas que combinam: concessão +
              nominalização ("malgrado a modernidade"), correlação + adição
              ("não só... mas também" → "e"), ou identificação de erros sutis
              (mudança de modo verbal que altera certeza vs hipótese).
            </p>

            {/* PARÁGRAFO 4: CONTEXTO PETROBRAS */}
            <p>
              No ambiente técnico da Petrobras, a reescrita de Avançado
              manifesta-se em elaboração de documentos complexos que integram
              múltiplas informações. Um relatório executivo pode exigir
              transformar "Embora a plataforma seja moderna, precisa de ajustes"
              em "Malgrado a modernidade da plataforma, ajustes são necessários"
              — combinando concessão, nominalização e passiva sintética. Em
              comunicados institucionais, a capacidade de reestruturar
              informações mantendo precisão técnica é essencial para clareza e
              autoridade. A maestria linguística reflete competência técnica —
              quem domina a reescrita demonstra capacidade de análise crítica e
              comunicação eficaz.
            </p>

            {/* PARÁGRAFO 5: pontos de atenção CESGRANRIO */}
            <p>
              A CESGRANRIO explora sistematicamente a capacidade de integração
              através de questões que testam múltiplas técnicas simultaneamente.
              As armadilhas finais incluem: reescritas que parecem corretas mas
              extrapolam sentido (adicionar "excelente qualidade" onde não
              existe), mudanças sutis de modo verbal que alteram certeza
              ("faria" vs "fará"), e combinações complexas que exigem 识别 de
              cada elemento transformado. O examinando deve desenvolver
              capacidade de análise multicamadas — identificar o que mudou, se a
              mudança é válida, e se o sentido original foi preservado. Erros
              comuns incluem focar em apenas um aspecto da reescrita e ignorar
              outros elementos alterados.
            </p>

            {/* CAIXA DE DESTAQUE: Arena Final */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 rounded-lg border border-purple-200 dark:border-purple-800 p-6 space-y-4">
              <h4 className="font-bold text-foreground">
                O Check-list da Maestria
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl mb-2">🎯</div>
                  <strong>Sentido Preservado?</strong>
                  <p>
                    Verifique núcleo
                    <br />
                    semântico intacto
                    <br />
                    Sem extrapolações
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">⚙️</div>
                  <strong>Estrutura Correta?</strong>
                  <p>
                    Concordância
                    <br />
                    Regência
                    <br />
                    Modo e tempo
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🏆</div>
                  <strong>Nível Avançado?</strong>
                  <p>
                    Técnicas combinadas
                    <br />
                    Complexidade controlada
                    <br />
                    Precisão técnica
                  </p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-purple-100 dark:bg-purple-900/30 rounded text-sm">
                <strong>Regra Final:</strong> Se a reescrita parece "fácil
                demais", provavelmente há pontos de atenção. Se parece "complexa
                demais", verifique se é necessária.
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Revisão Express — Todas as Técnicas"
              description="Revisão express de todas as técnicas fundamentais para o simulado final."
              variant="blue"
            />
            <CardCarousel
              itemsPerView={2}
              cards={[
                {
                  title: "Módulos 1–3: Paráfrase, Sinonímia e Vozes",
                  icone: <LuBookOpen />,
                  descricao: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        <strong>M1 — Paráfrase:</strong> Equivalência semântica
                        + correção gramatical. Nunca extrapole nem restrinja o
                        sentido original. Verifique modalidade e polaridade.
                      </p>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        <strong>M2 — Sinonímia:</strong> Teste a substituição no
                        contexto. Preserve o registro (formal/técnico em textos
                        Petrobras). Cuidado com parônimos e hiperônimos.
                      </p>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        <strong>M3 — Vozes:</strong> OD ativo → sujeito passivo.
                        Verbo SER + particípio, tempo idêntico. Agente
                        introduzido por "por". Passiva sintética: "se"
                        apassivador, verbo concorda com o sujeito posposto.
                      </p>
                    </div>
                  ),
                },
                {
                  title: "Módulos 4–6: Discurso, Nominalização e Conectivos",
                  icone: <LuBrain />,
                  descricao: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        <strong>M4 — Discurso Indireto:</strong> Recuo temporal
                        obrigatório (presente → imperfeito; futuro →
                        condicional). Pronomes 1ª/2ª → 3ª pessoa. Advérbios:
                        hoje → naquele dia, amanhã → no dia seguinte.
                      </p>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        <strong>M5 — Nominalização:</strong> Verbo → substantivo
                        de ação. O agente pode aparecer como "por" + SN. Muito
                        frequente em documentos técnicos Petrobras.
                      </p>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        <strong>M6 — Conectivos:</strong> Causais (porque, pois,
                        já que, uma vez que, visto que). Condicionais (se, caso,
                        contanto que). "Desde que" é bifuncional. Preserve o
                        valor lógico ao substituir.
                      </p>
                    </div>
                  ),
                },
                {
                  title: "Módulos 7–9: Concessiva, Pontuação e CESGRANRIO",
                  icone: <LuTarget />,
                  descricao: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        <strong>M7 — Concessivas:</strong> Adversativa (mas) →
                        concessiva (embora): indicativo → subjuntivo. Família:
                        embora, ainda que, mesmo que, posto que, conquanto.
                        Ênfase muda de oração.
                      </p>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        <strong>M8 — Pontuação:</strong> Vírgula em restritiva →
                        explicativa (muda escopo). Vírgula obrigatória antes de
                        "mas". Ponto-e-vírgula altera hierarquia oracional.
                      </p>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        <strong>M9 — CESGRANRIO:</strong> "Onde" só para lugar
                        físico. "Cujo" sem artigo. "Posto que" ≠ "contanto que".
                        Os 5 erros: modalidade, agente, concessiva/condicional,
                        tempo passivo, vírgula em restritiva.
                      </p>
                    </div>
                  ),
                },
                {
                  title: "Checklist Final de Prova",
                  icone: <LuCheck />,
                  descricao: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-lg">
                        Use este roteiro mental para cada questão de reescrita:
                      </p>
                      <ol className="list-decimal pl-5 text-lg space-y-2 text-muted-foreground">
                        <li>Leia a frase original inteira sem pressa.</li>
                        <li>
                          Identifique o <strong>tipo de reescrita</strong>{" "}
                          pedido (voz, discurso, conectivo...).
                        </li>
                        <li>
                          Aplique a regra específica do tipo identificado.
                        </li>
                        <li>
                          Verifique:{" "}
                          <strong>modalidade, polaridade e registro</strong>{" "}
                          foram preservados?
                        </li>
                        <li>
                          Confira a <strong>gramática</strong>: concordância,
                          regência, crase, pontuação.
                        </li>
                        <li>
                          Se ainda em dúvida, descarte as opções com erro
                          gramatical evidente.
                        </li>
                      </ol>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Estratégia de Prova"
              description="Conselhos táticos e gestão de tempo para o dia do concurso."
              variant="blue"
            />
            <AlertBox tipo="info" titulo="Recapitulação Final">
              A reescrita bem-sucedida é aquela em que você leria a frase nova
              num jornal e ela passaria a mesma informação da antiga, sem erros
              de crase ou concordância.
            </AlertBox>
            <AlertBox
              tipo="warning"
              titulo="Gestão de Tempo nas Questões de Reescrita"
            >
              Questões de reescrita exigem leitura dupla (original + opções) —
              reserve <strong>2–3 minutos por questão</strong>. Se uma opção
              parecer obviamente correta em 10 segundos, desconfie: a banca
              costuma colocar a distração "fácil" para atrair leituras rápidas
              superficiais.
            </AlertBox>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-red-500/10 rounded-full shadow-inner ring-1 ring-red-500/20">
                      <LuTrash2 className="w-12 h-12 text-red-500" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      Filtro Gramatical
                    </span>
                    <span className="text-sm text-red-500/80 font-medium">
                      Estratégia de Eliminação
                    </span>
                  </div>
                }
                verso={
                  <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-2 text-red-500 font-bold border-b border-red-500/10 pb-3">
                      <LuCheck className="w-5 h-5 shrink-0" />
                      <span className="tracking-widest uppercase text-xs">
                        Peneira Inicial
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Antes de gastar energia com o sentido, procure{" "}
                      <strong>erros de norma culta</strong>. A banca CESGRANRIO
                      adora colocar opções com sentido perfeito, mas com erro de
                      crase ou concordância para eliminar os desatentos.
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Regência errada invalida a opção na hora. Se você achou um
                      erro gramatical, pare a análise semântica e passe para a
                      próxima alternativa.
                    </p>
                  </div>
                }
                categoria="Tática de Prova"
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-blue-500/10 rounded-full shadow-inner ring-1 ring-blue-500/20">
                      <LuHeadphones className="w-12 h-12 text-blue-500" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      Eco Semântico
                    </span>
                    <span className="text-sm text-blue-500/80 font-medium">
                      O Teste da Voz Mental
                    </span>
                  </div>
                }
                verso={
                  <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-2 text-blue-500 font-bold border-b border-blue-500/10 pb-3">
                      <LuCheck className="w-5 h-5 shrink-0" />
                      <span className="tracking-widest uppercase text-xs">
                        Sintonia Fina
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Leia a paráfrase candidata mentalmente e sinta se ela
                      "soa" como o original. Se a versão nova parece{" "}
                      <strong>mais enfática</strong> ou{" "}
                      <strong>mais vaga</strong> que o texto base, provavelmente
                      houve distorção.
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      A reescrita perfeita não deve adicionar "sentimentos" ou
                      "opiniões" que não estavam no original. Cuidado com o uso
                      de adjetivos extras.
                    </p>
                  </div>
                }
                categoria="Tática de Prova"
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-amber-500/10 rounded-full shadow-inner ring-1 ring-amber-500/20">
                      <LuTarget className="w-12 h-12 text-amber-500" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      Rastreio de Peso
                    </span>
                    <span className="text-sm text-amber-500/80 font-medium">
                      Certeza vs Possibilidade
                    </span>
                  </div>
                }
                verso={
                  <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-2 text-amber-500 font-bold border-b border-amber-500/10 pb-3">
                      <LuCheck className="w-5 h-5 shrink-0" />
                      <span className="tracking-widest uppercase text-xs">
                        Foco na Modalidade
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      O alvo favorito da banca é a <strong>Modalidade</strong>.
                      "Ele deve vir" (Obrigação) ≠ "Ele pode vir"
                      (Possibilidade) ≠ "Ele virá" (Certeza). Essas trocas
                      invalidam qualquer reescrita técnica.
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground italic border-l-2 border-amber-500/20 pl-3">
                      Verifique sempre se o verbo auxiliar de modalidade foi
                      mantido com o mesmo peso semântico original.
                    </p>
                  </div>
                }
                categoria="Tática de Prova"
              />
              <FlipCard
                frente={
                  <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                    <div className="p-4 bg-emerald-500/10 rounded-full shadow-inner ring-1 ring-emerald-500/20">
                      <LuShieldCheck className="w-12 h-12 text-emerald-500" />
                    </div>
                    <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                      Espelhamento Lógico
                    </span>
                    <span className="text-sm text-emerald-500/80 font-medium">
                      A Matemática da Frase
                    </span>
                  </div>
                }
                verso={
                  <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-2 text-emerald-500 font-bold border-b border-emerald-500/10 pb-3">
                      <LuCheck className="w-5 h-5 shrink-0" />
                      <span className="tracking-widest uppercase text-xs">
                        Equivalência Formal
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Cuidado com a <strong>dupla negação</strong>. Em
                      reescritas, "Não é incomum" equivale a "É comum". A banca
                      usa essas voltas lógicas para cansar o candidato.
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Desenhe mentalmente a seta da causa para a consequência:
                      se na frase original a causa era X, na reescrita a causa
                      DEVE continuar sendo X. Se inverteram, está errado.
                    </p>
                  </div>
                }
                categoria="Tática de Prova"
              />
            </div>
          </section>

          <AlertBox tipo="success" titulo="Você Está Pronto Para a Prova">
            Ao chegar neste módulo, você domina as cinco grandes famílias de
            reescrita cobradas pela CESGRANRIO: vozes verbais, discurso
            direto/indireto, nominalização, equivalência conjuntiva e paráfrase.
            O simulado final consolida todos esses conhecimentos em um único
            momento de alta performance.
          </AlertBox>

          {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Qual dessas reescritas de 'Embora a refinaria seja moderna, precisa de ajustes' é a MAIS completa e correta?"
          alternativas={[
            { letra: "A", texto: "A refinaria é moderna, mas precisa de ajustes.", correta: false },
                { letra: "B", texto: "Pelo fato de ser moderna, a refinaria precisa de ajustes.", correta: false },
                { letra: "C", texto: "Malgrado a modernidade da refinaria, ajustes são necessários.", correta: true },
                { letra: "D", texto: "A refinaria precisa de ajustes pois é moderna.", correta: false },
                { letra: "E", texto: "Se a refinaria for moderna, precisará de ajustes.", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "A reescrita 'C' usa nominalização ('modernidade'), mantém a concessão ('malgrado') e a passiva ('são necessários')." },
            { titulo: "Passo 2", conteudo: "É o nível 'Elite' da banca." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
            questoes={quizM10}
            titulo="QUIZ: Avaliação de Fixação Avançada"
            icone="🏆"
            numero={3}
            onComplete={(score) => handleModuleComplete("modulo-10", score)}
            variant="blue"
          />
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
