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
  { id: "modulo-1", label: "Módulo 1", title: "A Arte da Paráfrase" },
  { id: "modulo-2", label: "Módulo 2", title: "Sinonímia e Campo Semântico" },
  { id: "modulo-3", label: "Módulo 3", title: "Vozes Verbais" },
  { id: "modulo-4", label: "Módulo 4", title: "O Discurso sob Controle" },
  {
    id: "modulo-5",
    label: "Módulo 5",
    title: "Troca de Classes (Nominalização)",
  },
  { id: "modulo-6", label: "Módulo 6", title: "Equivalência Conjutiva" },
  { id: "modulo-7", label: "Módulo 7", title: "O Duelo Concessivo" },
  { id: "modulo-8", label: "Módulo 8", title: "Pontuação e Sentido" },
  { id: "modulo-9", label: "Módulo 9", title: "Laboratório CESGRANRIO" },
  { id: "modulo-10", label: "Módulo 10", title: "Arena de Elite" },
];

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
  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(),
  );
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
      {/* ── MÓDULO 1: A ARTE DA PARÁFRASE ───────────────────────── */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="A Arte da Paráfrase"
          descricao="Entenda o binômio da reescrita perfeita: Sentido Intacto e Norma Culta Plena."
          gradiente="bg-gradient-to-br from-blue-700 to-sky-800"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="O Conceito de Reescritura"
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
                  titulo: "Exemplificação",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">
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
                  titulo: "Por que a Banca Cobra Reescrita?",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        A CESGRANRIO usa a reescrita para testar se o candidato
                        realmente <strong>compreende</strong> a língua ou apenas
                        a memoriza. Uma troca aparentemente válida de conectivo
                        pode alterar sutilmente o valor lógico da sentença —
                        por isso a banca consegue eliminar candidatos que
                        estudam só regras isoladas, sem ver o conjunto.
                      </p>
                      <AlertBox tipo="info" titulo="Estratégia de Ouro">
                        Leia sempre a frase original e a reescrita em voz alta.
                        Se o significado "soar" diferente para você, provavelmente
                        está errado.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Os Dois Pilares da Paráfrase Correta",
                  icone: <LuCheck />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Toda paráfrase examinada pela banca precisa satisfazer
                        dois critérios simultâneos:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                          <p className="font-bold text-sm mb-1">
                            1. Equivalência Semântica
                          </p>
                          <p className="text-xs text-muted-foreground">
                            O sentido completo — incluindo modalidade (certeza,
                            dúvida, possibilidade) e polaridade (afirmação,
                            negação) — deve ser preservado.
                          </p>
                        </div>
                        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                          <p className="font-bold text-sm mb-1">
                            2. Correção Gramatical
                          </p>
                          <p className="text-xs text-muted-foreground">
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
              title="Manutenção de Sentido vs Adequação de Registro"
              variant={getModuleVariant(1)}
            />
            <p className="text-muted-foreground leading-relaxed text-sm">
              Na reescrita, há dois planos independentes que podem ser alterados
              ou mantidos. Entender a diferença é fundamental para acertar as
              questões de múltipla escolha da CESGRANRIO.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FlipCard
                frente="Manutenção de Sentido"
                verso="O conteúdo informacional, a modalidade lógica e as relações causais/temporais devem permanecer idênticos na frase reescrita. Qualquer acréscimo ou restrição de informação invalida a reescrita."
              />
              <FlipCard
                frente="Adequação de Registro"
                verso="O nível de formalidade pode ser ajustado sem perda de sentido. 'Está escrito no contrato' pode virar 'Consta no instrumento contratual' — mesma informação, registro mais formal."
              />
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Tipos de Reescrita Cobrados pela Banca"
              variant={getModuleVariant(1)}
            />
            <CardCarousel
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
              variant={getModuleVariant(1)}
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
            <AlertBox tipo="info" titulo="A Reescrita Como Competência Profissional">
              Na Petrobras, a capacidade de reformular documentos técnicos com
              clareza e precisão é uma competência real exigida no dia a dia.
              A prova CESGRANRIO não avalia gramática pela gramática — avalia
              sua capacidade de comunicar com exatidão, essencial para
              engenheiros, técnicos e gestores da empresa.
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

      {/* ── MÓDULO 2: SINONÍMIA E CAMPO SEMÂNTICO ──────────────── */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <ModuleBanner
          numero={2}
          titulo="Sinonímia e Campo Semântico"
          descricao="Troque palavras mantendo a precisão técnica necessária para a indústria de energia."
          gradiente="bg-gradient-to-br from-cyan-700 to-teal-800"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Precisão das Palavras"
              variant={getModuleVariant(2)}
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Campo Semântico",
                  icone: <LuLibrary />,
                  conteudo: (
                    <p className="text-muted-foreground">
                      Um sinônimo absoluto raramente existe. O contexto define
                      se "Operar" pode ser trocado por "Trabalhar" ou
                      "Executar". Em reescrita, buscamos a{" "}
                      <strong>equivalência contextual</strong>.
                    </p>
                  ),
                },
                {
                  titulo: "Parônimos Perigosos",
                  icone: <LuTriangleAlert />,
                  conteudo: (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FlipCard
                        frente="Ratificar"
                        verso="Confirmar, validar. (O gerente RATIFICOU a decisão)."
                      />
                      <FlipCard
                        frente="Retificar"
                        verso="Corrigir, consertar. (O técnico RETIFICOU o erro)."
                      />
                    </div>
                  ),
                },
                {
                  titulo: "O Teste da Substituição Contextual",
                  icone: <LuRepeat />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Antes de aceitar um sinônimo como válido, aplique o
                        <strong> Teste da Substituição Contextual</strong>:
                        coloque o sinônimo no lugar da palavra original e verifique
                        se o sentido e o registro se mantêm. Se a frase soar
                        estranha ou mudar de nível (formal/informal), o sinônimo
                        não serve para aquele contexto.
                      </p>
                      <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-sm space-y-2">
                        <p>
                          <strong>Original:</strong> "A empresa <em>cessou</em> as
                          atividades no campo."
                        </p>
                        <p className="text-green-600 dark:text-green-400">
                          ✅ "A empresa <em>encerrou</em> as atividades no campo."
                          (registro equivalente)
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
                  titulo: "Hiperônimos, Hipônimos e Hiperonímia em Reescrita",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        A banca frequentemente troca uma palavra específica
                        (<strong>hipônimo</strong>) por uma mais genérica
                        (<strong>hiperônimo</strong>) e pergunta se o sentido
                        foi mantido. A resposta depende do contexto: se o texto
                        não restringia o sentido ao hipônimo, a troca é válida.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-muted/50 rounded-xl border border-border">
                          <p className="font-bold text-xs mb-1">Hipônimo (específico)</p>
                          <p className="text-sm">"A <em>fragata</em> foi recolhida ao porto."</p>
                        </div>
                        <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                          <p className="font-bold text-xs mb-1">Hiperônimo (genérico)</p>
                          <p className="text-sm">"A <em>embarcação</em> foi recolhida ao porto."</p>
                          <p className="text-xs text-muted-foreground mt-1">Válido se o texto não exige precisão sobre o tipo de navio.</p>
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
              variant={getModuleVariant(2)}
            />
            <Comparison
              title="Equivalência de Registro — Exemplo Prático"
              left={{
                title: "Registro Formal (Original)",
                content:
                  "O gerente solicitou que os técnicos revisassem os procedimentos de segurança.",
                description:
                  "Vocabulário formal típico de ambiente corporativo/técnico.",
                variant: "info",
              }}
              right={{
                title: "Reescrita Informal (Incorreta para provas)",
                content:
                  "O chefe pediu que o pessoal desse uma olhada nas regras de segurança.",
                description:
                  "Embora o sentido central seja próximo, o registro é inadequado — a banca marcaria como incorreto.",
                variant: "warning",
              }}
            />
            <AlertBox tipo="warning" titulo="Atenção ao Registro em Provas Petrobras">
              As questões da CESGRANRIO para a Petrobras exigem manutenção do
              registro <strong>formal e técnico</strong>. Substituições que
              informalizem o texto são consideradas incorretas, mesmo que o
              sentido central seja preservado.
            </AlertBox>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Pares de Palavras que a Banca Adora Confundir"
              variant={getModuleVariant(2)}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FlipCard
                frente="Iminente"
                verso="Que está prestes a acontecer. 'O risco iminente de explosão paralisou a plataforma.' (= prestes a ocorrer)"
              />
              <FlipCard
                frente="Eminente"
                verso="De alto grau, elevado, notável. 'O engenheiro eminente apresentou o relatório.' (= de destaque)"
              />
              <FlipCard
                frente="Infligir"
                verso="Aplicar uma pena ou castigo a alguém. 'A fiscalização infligiu multas à empresa.'"
              />
              <FlipCard
                frente="Infringir"
                verso="Violar uma lei ou norma. 'A contratada infringiu as normas de segurança.'"
              />
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={4}
              title="Léxico Técnico Petrobras — Palavras que a Banca Usa"
              variant={getModuleVariant(2)}
            />
            <p className="text-muted-foreground text-sm leading-relaxed">
              O vocabulário técnico do setor de energia tem equivalentes formais
              específicos que a CESGRANRIO usa em seus textos-base. Conhecê-los
              permite reconhecer sinônimos válidos rapidamente.
            </p>
            <CardCarousel
              cards={[
                {
                  icone: "🛢️",
                  title: "Exploração / Prospecção",
                  descricao:
                    "Ambos referem-se à busca de reservas. 'Prospecção' é mais técnico e específico para a fase inicial; 'exploração' é mais amplo e frequente em textos regulatórios.",
                },
                {
                  icone: "⚙️",
                  title: "Operar / Acionar / Acionar",
                  descricao:
                    "No contexto de equipamentos industriais, 'operar' (colocar em funcionamento contínuo) ≠ 'acionar' (iniciar uma única vez) ≠ 'manobrar' (ajustar parâmetros).",
                },
                {
                  icone: "📄",
                  title: "Contrato / Instrumento / Acordo",
                  descricao:
                    "'Instrumento contratual' é o hiperônimo formal que engloba contratos, acordos, convênios e termos aditivos. Em provas, 'contrato' pode ser substituído por 'instrumento' em sentido amplo.",
                },
                {
                  icone: "🔧",
                  title: "Manutenção / Conservação / Reparo",
                  descricao:
                    "'Manutenção' inclui preventiva e corretiva. 'Conservação' é preventiva. 'Reparo' é corretiva pontual. A troca pode ser válida ou inválida dependendo do contexto da questão.",
                },
                {
                  icone: "📊",
                  title: "Resultado / Desempenho / Performance",
                  descricao:
                    "Em textos técnicos, 'desempenho' e 'performance' são sinônimos contextuais. 'Resultado' é mais amplo — pode ser financeiro, operacional ou de segurança.",
                },
              ]}
            />
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

      {/* ── MÓDULO 3: VOZES VERBAIS ──────────────────────────── */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <ModuleBanner
          numero={3}
          titulo="Vozes Verbais"
          descricao="A travessia entre Ativa e Passiva é o tema predileto da banca. Aprenda a não perder o tempo."
          gradiente="bg-gradient-to-br from-emerald-600 to-teal-700"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Travessia (Vozes)"
              variant={getModuleVariant(3)}
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "A Regra do Tempo",
                  icone: <LuZap />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        O tempo verbal <strong>nunca</strong> muda na
                        transposição de voz.
                      </p>
                      <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                        <p className="text-sm">
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
                  titulo: "Como Converter: Voz Ativa → Passiva Analítica",
                  icone: <LuRepeat />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Siga o algoritmo de três passos para a conversão
                        perfeita:
                      </p>
                      <ol className="list-decimal pl-5 text-sm space-y-2 text-muted-foreground">
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
                      <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-sm">
                        <p><strong>Ativa:</strong> A Petrobras produziu o relatório.</p>
                        <p className="mt-1"><strong>Passiva:</strong> O relatório foi produzido pela Petrobras.</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Voz Passiva Sintética (Pronome 'se')",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        A passiva sintética usa o pronome <strong>se</strong>{" "}
                        como índice de indeterminação do sujeito (partícula
                        apassivadora). O sujeito da ativa é completamente
                        omitido — não há agente da passiva.
                      </p>
                      <div className="p-4 bg-muted/50 border border-border rounded-xl text-sm space-y-1">
                        <p><strong>Analítica:</strong> Os contratos foram assinados pela diretoria.</p>
                        <p><strong>Sintética:</strong> Assinaram-se os contratos.</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Atenção: na sintética, o verbo concorda com o sujeito
                          paciente que o segue.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "A Nominalização como Passiva Velada",
                  icone: <LuTriangleAlert />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        A banca usa nominalizações para criar "falsas passivas"
                        que confundem candidatos. Quando um verbo se torna
                        substantivo, a relação ativo/passivo some — e você
                        precisa reconstruir quem faz e quem recebe a ação.
                      </p>
                      <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl text-sm space-y-1">
                        <p><strong>Verbal (ativa):</strong> A equipe realizou a inspeção.</p>
                        <p><strong>Nominalizado:</strong> A realização da inspeção pela equipe...</p>
                        <p className="text-xs text-muted-foreground mt-2">
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
              variant={getModuleVariant(3)}
            />
            <AlertBox tipo="danger" titulo="Armadilha CESGRANRIO — Passiva Disfarçada">
              A banca frequentemente apresenta nominalizações como reescritas
              válidas de frases na voz ativa. O erro está em omitir o agente ou
              alterar quem realiza a ação. Exemplo clássico: "A empresa decidiu
              contratar" ≠ "A contratação foi decidida" — nesta última, o agente
              da decisão ficou ambíguo.
            </AlertBox>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FlipCard
                frente="VPA: Verbo Principal + Auxiliar"
                verso="Na voz passiva analítica, o auxiliar SER recebe a flexão de tempo/modo, enquanto o verbo principal fica no particípio. Ex: 'será aprovado', 'eram contratados', 'fosse revisado'."
              />
              <FlipCard
                frente="Particípio Regular vs Irregular"
                verso="Alguns verbos têm dois particípios: o regular (para tempos compostos com TER/HAVER) e o irregular (para passivas com SER/ESTAR). Ex: 'tinha aceitado' (regular) vs 'foi aceito' (irregular)."
              />
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Casos Especiais de Voz Passiva"
              variant={getModuleVariant(3)}
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Verbos que Não Admitem Passiva",
                  icone: <LuTriangleAlert />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Nem todo verbo transitivo direto pode ser passivizado.
                        Verbos de medida, peso, duração e valor geralmente ficam
                        apenas na voz ativa:
                      </p>
                      <div className="p-4 bg-muted/50 rounded-xl border border-border text-sm space-y-1">
                        <p>❌ "Dois anos foram durados pelo projeto." (errado)</p>
                        <p className="text-green-600 dark:text-green-400">✅ "O projeto durou dois anos." (correto — apenas ativa)</p>
                        <p className="mt-2">❌ "Mil metros foram medidos pelo cabo." (inadequado)</p>
                        <p className="text-green-600 dark:text-green-400">✅ "O cabo mediu mil metros." (correto)</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Voz Passiva com ESTAR + Particípio (Passiva de Estado)",
                  icone: <LuZap />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Além da passiva com SER (que indica processo), existe a
                        passiva de estado com ESTAR (que indica resultado/estado
                        permanente). A banca usa essa distinção em questões de
                        reescrita:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                          <p className="font-bold text-xs mb-1">Passiva de Processo (SER)</p>
                          <p>"O contrato <strong>foi assinado</strong> ontem."</p>
                          <p className="text-xs text-muted-foreground mt-1">Foca no momento da ação.</p>
                        </div>
                        <div className="p-4 bg-teal-500/10 border border-teal-500/20 rounded-xl">
                          <p className="font-bold text-xs mb-1">Passiva de Estado (ESTAR)</p>
                          <p>"O contrato <strong>está assinado</strong>."</p>
                          <p className="text-xs text-muted-foreground mt-1">Foca no estado resultante atual.</p>
                        </div>
                      </div>
                      <AlertBox tipo="info" titulo="Implicação para Reescrita">
                        Trocar "foi assinado" por "está assinado" altera o foco
                        temporal — pode ser inválido se a questão perguntar sobre
                        o momento da assinatura.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Tabela de Conversão: Tempos Verbais na Passiva",
                  icone: <LuRepeat />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        Referência rápida de como cada tempo ativo se converte na passiva analítica:
                      </p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs border-collapse">
                          <thead>
                            <tr className="bg-muted/70">
                              <th className="p-2 text-left border border-border">Ativa</th>
                              <th className="p-2 text-left border border-border">Passiva (SER + part.)</th>
                              <th className="p-2 text-left border border-border">Exemplo</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ["Pres. Indicativo (aprova)", "é aprovado/a", "O plano é aprovado."],
                              ["Pret. Perfeito (aprovou)", "foi aprovado/a", "O plano foi aprovado."],
                              ["Pret. Imperfeito (aprovava)", "era aprovado/a", "O plano era aprovado."],
                              ["Fut. Presente (aprovará)", "será aprovado/a", "O plano será aprovado."],
                              ["Fut. Pretérito (aprovaria)", "seria aprovado/a", "O plano seria aprovado."],
                              ["Pres. Subjuntivo (aprove)", "seja aprovado/a", "Para que o plano seja aprovado."],
                            ].map(([ativa, passiva, ex]) => (
                              <tr key={ativa} className="border-b border-border even:bg-muted/20">
                                <td className="p-2 border border-border">{ativa}</td>
                                <td className="p-2 border border-border font-medium">{passiva}</td>
                                <td className="p-2 border border-border text-muted-foreground">{ex}</td>
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

          <QuizInterativo
            questoes={quizM3}
            titulo="Fixação - Módulo 3"
            icone="🎯"
            numero={3}
            variant={getModuleVariant(3)}
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 4: O DISCURSO SOB CONTROLE ─────────────────── */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner
          numero={4}
          titulo="O Discurso sob Controle"
          descricao="Direto para Indireto: ajuste pronomes, tempos e advérbios sem titubear."
          gradiente="bg-gradient-to-br from-teal-600 to-emerald-800"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Direto & Indireto"
              variant={getModuleVariant(3)}
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "A Transposição",
                  icone: <LuMessagesSquare />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Ao passar do discurso direto (fala real) para o indireto
                        (relato), os tempos verbais "recuam" no tempo.
                      </p>
                      <ul className="list-disc pl-5 text-sm space-y-2">
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
                  titulo: "Tabela Completa de Recuo Temporal",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        Memorize a tabela abaixo — ela resolve 90% das questões
                        de discurso indireto na CESGRANRIO:
                      </p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                          <thead>
                            <tr className="bg-muted/70">
                              <th className="p-3 text-left border border-border rounded-tl-lg">Discurso Direto</th>
                              <th className="p-3 text-left border border-border rounded-tr-lg">Discurso Indireto</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-border">
                              <td className="p-3 border border-border">Presente do Indicativo</td>
                              <td className="p-3 border border-border">Pretérito Imperfeito</td>
                            </tr>
                            <tr className="border-b border-border bg-muted/20">
                              <td className="p-3 border border-border">Pretérito Perfeito</td>
                              <td className="p-3 border border-border">Pretérito Mais-que-Perfeito</td>
                            </tr>
                            <tr className="border-b border-border">
                              <td className="p-3 border border-border">Futuro do Presente</td>
                              <td className="p-3 border border-border">Futuro do Pretérito (Condicional)</td>
                            </tr>
                            <tr className="border-b border-border bg-muted/20">
                              <td className="p-3 border border-border">Imperativo</td>
                              <td className="p-3 border border-border">Infinitivo (com verbos pedir/mandar/ordenar)</td>
                            </tr>
                            <tr>
                              <td className="p-3 border border-border">Futuro do Subjuntivo</td>
                              <td className="p-3 border border-border">Pretérito Imperfeito do Subjuntivo</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Mudança de Pronomes Pessoais",
                  icone: <LuMic />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Os pronomes da 1ª e 2ª pessoa no discurso direto passam
                        para a 3ª pessoa no indireto, ajustados ao ponto de
                        vista do narrador:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-muted/50 rounded-xl border border-border text-sm space-y-1">
                          <p className="font-bold text-xs mb-2">Discurso Direto</p>
                          <p>"Eu vou resolver o problema."</p>
                          <p>"Você precisa assinar o contrato."</p>
                        </div>
                        <div className="p-4 bg-teal-500/10 rounded-xl border border-teal-500/20 text-sm space-y-1">
                          <p className="font-bold text-xs mb-2">Discurso Indireto</p>
                          <p>Ele disse que <em>ele</em> iria resolver o problema.</p>
                          <p>Ele disse que <em>ela/o interlocutor</em> precisava assinar o contrato.</p>
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
              variant={getModuleVariant(3)}
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
            <AlertBox tipo="warning" titulo="Pronomes e Advérbios de Tempo — Mudanças Obrigatórias">
              No discurso indireto, além dos tempos verbais, os advérbios de
              tempo e lugar também mudam: <strong>hoje</strong> →{" "}
              <strong>naquele dia</strong>; <strong>aqui</strong> →{" "}
              <strong>ali/lá</strong>; <strong>ontem</strong> →{" "}
              <strong>no dia anterior</strong>;{" "}
              <strong>semana passada</strong> →{" "}
              <strong>na semana anterior</strong>.
            </AlertBox>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Mapa de Advérbios Temporais"
              variant={getModuleVariant(3)}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FlipCard
                frente="hoje / agora"
                verso="Discurso indireto: 'naquele dia' / 'naquele momento'. A referência temporal é deslocada para o passado do narrador."
              />
              <FlipCard
                frente="amanhã / depois"
                verso="Discurso indireto: 'no dia seguinte' / 'no dia posterior'. O futuro do falante vira futuro do pretérito no relato."
              />
              <FlipCard
                frente="ontem"
                verso="Discurso indireto: 'no dia anterior'. O passado imediato do falante se torna passado distante no relato."
              />
              <FlipCard
                frente="aqui / cá"
                verso="Discurso indireto: 'ali' / 'lá'. O espaço de referência do falante muda para o do narrador."
              />
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={4}
              title="Verbos Introdutores de Discurso Indireto"
              variant={getModuleVariant(3)}
            />
            <p className="text-muted-foreground text-sm leading-relaxed">
              O verbo que introduz o discurso indireto determina como a
              transposição é feita. Diferentes verbos dicendi exigem diferentes
              construções sintáticas:
            </p>
            <CardCarousel
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
              são eliminados. A subordinada é introduzida diretamente pelo
              verbo dicendi + conjunção "que" (ou pronome/advérbio
              interrogativo). Reescritas que mantêm as aspas incorretamente
              são inválidas.
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

      {/* ── MÓDULO 5: NOMINALIZAÇÃO ──────────────────────────── */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="Nominalização"
          descricao="Transforme verbos em substantivos para dar densidade técnica e profissional ao seu texto."
          gradiente="bg-gradient-to-br from-amber-600 to-orange-700"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Verbo para Substantivo"
              variant={getModuleVariant(6)}
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "O que é Nominalização?",
                  icone: <LuActivity />,
                  conteudo: (
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
                  titulo: "Como Fazer a Conversão Verbo → Substantivo",
                  icone: <LuRepeat />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        Há três padrões principais de nominalização:
                      </p>
                      <div className="space-y-3">
                        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-sm">
                          <p className="font-bold mb-1">1. Verbo → Substantivo de ação</p>
                          <p>"Decidir" → "a decisão" | "Executar" → "a execução" | "Implantar" → "a implantação"</p>
                        </div>
                        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-sm">
                          <p className="font-bold mb-1">2. Verbo → Substantivo de agente</p>
                          <p>"Operar" → "o operador" | "Supervisionar" → "o supervisor"</p>
                        </div>
                        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-sm">
                          <p className="font-bold mb-1">3. Verbo → Substantivo de resultado</p>
                          <p>"Aprovar" → "a aprovação" (ação) ou "o aprovado" (resultado/agente)</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Nominalizações no Texto Oficial Petrobras",
                  icone: <LuShieldAlert />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Documentos técnicos da Petrobras — relatórios de
                        conformidade, contratos de prestação de serviço, normas
                        internas — fazem uso intenso de nominalizações. Conhecê-las
                        é essencial tanto para a prova quanto para o exercício
                        profissional.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="p-3 bg-muted/50 rounded-lg border border-border">
                          <p className="font-bold text-xs mb-1">Verbal (informal)</p>
                          <p>"A empresa decidiu contratar novos técnicos."</p>
                        </div>
                        <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                          <p className="font-bold text-xs mb-1">Nominalizado (formal/técnico)</p>
                          <p>"A decisão de contratação de novos técnicos foi tomada pela empresa."</p>
                        </div>
                      </div>
                      <AlertBox tipo="info" titulo="Por que Isso Aparece na Prova?">
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
              variant={getModuleVariant(6)}
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
              variant={getModuleVariant(6)}
            />
            <CardCarousel
              cards={[
                {
                  icone: "✏️",
                  title: "Aperfeiçoar → Aperfeiçoamento",
                  descricao:
                    "O aperfeiçoamento contínuo dos processos é exigido pelas normas ISO adotadas pela Petrobras.",
                },
                {
                  icone: "🔌",
                  title: "Conectar → Conexão",
                  descricao:
                    "A conexão adequada dos cabos submarinos deve ser verificada antes da operação.",
                },
                {
                  icone: "🚢",
                  title: "Atracar → Atracação",
                  descricao:
                    "A atracação do navio de suporte levou mais tempo que o previsto.",
                },
                {
                  icone: "🔍",
                  title: "Inspecionar → Inspeção",
                  descricao:
                    "A inspeção periódica das plataformas é obrigatória conforme regulamentação da ANP.",
                },
                {
                  icone: "📋",
                  title: "Contratar → Contratação",
                  descricao:
                    "O processo de contratação de fornecedores seguiu os critérios de compliance estabelecidos.",
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={4}
              title="Sufixos Nominalizadores — Como Identificar o Substantivo Correto"
              variant={getModuleVariant(6)}
            />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Em provas de reescrita, a banca às vezes apresenta uma
              nominalização com o sufixo errado como distrator. Conhecer os
              sufixos nominalizadores mais produtivos do português é uma
              vantagem.
            </p>
            <ContentAccordion
              slides={[
                {
                  titulo: "Sufixos de Ação (-ção, -mento, -agem)",
                  icone: <LuActivity />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                          <p className="font-bold text-xs mb-2">-ção / -são</p>
                          <p>produzir → produção</p>
                          <p>executar → execução</p>
                          <p>decidir → decisão</p>
                          <p>contratar → contratação</p>
                        </div>
                        <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                          <p className="font-bold text-xs mb-2">-mento</p>
                          <p>aperfeiçoar → aperfeiçoamento</p>
                          <p>processar → processamento</p>
                          <p>lançar → lançamento</p>
                          <p>desenvolver → desenvolvimento</p>
                        </div>
                        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                          <p className="font-bold text-xs mb-2">-agem / -ância / -ência</p>
                          <p>bloquear → blocagem</p>
                          <p>exportar → exportação / exportância (raro)</p>
                          <p>convergir → convergência</p>
                          <p>divergir → divergência</p>
                        </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Distrator Clássico">
                        A banca cria nominalizações com sufixo errado (ex:
                        "executamento" no lugar de "execução") como alternativa
                        distratora. Memorize as formas consagradas no dicionário.
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Nominalização com Agente Explícito",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Ao nominalizar, o sujeito da ação pode aparecer após
                        preposição "de" (agente do processo) ou ficar implícito.
                        A banca testa se você percebe quando o agente foi
                        indevidamente omitido ou trocado:
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="p-3 bg-muted/50 rounded-xl border border-border">
                          <p><strong>Ativa:</strong> "A ANP fiscalizou a plataforma."</p>
                        </div>
                        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                          <p className="text-green-700 dark:text-green-400"><strong>Nominalização correta:</strong> "A fiscalização da plataforma pela ANP..."</p>
                        </div>
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                          <p className="text-red-600 dark:text-red-400"><strong>Incorreta (agente trocado):</strong> "A fiscalização da plataforma pela Petrobras..." ← mudou o agente!</p>
                        </div>
                      </div>
                    </div>
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
            variant={getModuleVariant(6)}
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 6: EQUIVALÊNCIA CONJUNUTIVA ────────────────── */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <ModuleBanner
          numero={6}
          titulo="Equivalência Conjutiva"
          descricao="Domine os conectivos causais, temporais e condicionais. A alma da reescrita sequencial."
          gradiente="bg-gradient-to-br from-orange-600 to-amber-700"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Nexos Equivalentes"
              variant={getModuleVariant(6)}
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Condicionais",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/50 rounded-xl">
                        <p className="font-bold">
                          SE = CASO = DESDE QUE = CONTANTO QUE
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Nota: 'Desde que' pode ser temporal ou condicional —
                          o contexto determina o valor.
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <strong>Exemplo:</strong> "Se o equipamento falhar,
                        acione o alarme." = "Caso o equipamento venha a falhar,
                        acione o alarme."
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Causais — O Grupo Mais Cobrado",
                  icone: <LuLink />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        As conjunções causais são as mais trocadas em questões
                        de reescrita. Todas as opções abaixo expressam causa,
                        mas diferem em registro e posição na frase:
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                        {[
                          { conj: "porque", nota: "registro neutro/informal" },
                          { conj: "pois", nota: "posição pós-verbal; mais formal" },
                          { conj: "já que", nota: "causa conhecida/óbvia" },
                          { conj: "uma vez que", nota: "formal; causa admitida" },
                          { conj: "visto que", nota: "formal; muito usado em contratos" },
                          { conj: "porquanto", nota: "arcaico; raro em provas modernas" },
                        ].map((item) => (
                          <div
                            key={item.conj}
                            className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl text-center"
                          >
                            <p className="font-bold">{item.conj}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {item.nota}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Conclusivas e Explicativas",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="p-4 bg-muted/50 rounded-xl border border-border">
                          <p className="font-bold text-xs mb-2">Conclusivas</p>
                          <p>
                            portanto = logo = por isso = por conseguinte =
                            assim = dessa forma = destarte
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Indicam consequência lógica da oração anterior.
                          </p>
                        </div>
                        <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                          <p className="font-bold text-xs mb-2">Explicativas</p>
                          <p>
                            pois (anteposto) = que = porque (pós-imperativo)
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Explicam ou justificam a afirmação anterior — não
                            introduzem causa real.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Temporais — Armadilha do 'Desde que'",
                  icone: <LuTriangleAlert />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox tipo="danger" titulo="Bifuncionalidade do 'Desde que'">
                        "Desde que" pode ser <strong>temporal</strong> (=
                        desde quando) ou <strong>condicional</strong> (= contanto que /
                        caso). A diferença está no contexto: se indica um ponto
                        de partida no tempo, é temporal; se indica condição, é
                        condicional.
                      </AlertBox>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="p-3 bg-muted/50 rounded-xl border border-border">
                          <p className="font-bold text-xs mb-1">Temporal</p>
                          <p>"Desde que entrou na empresa, o técnico se destacou."</p>
                          <p className="text-xs text-muted-foreground">(= A partir do momento em que)</p>
                        </div>
                        <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
                          <p className="font-bold text-xs mb-1">Condicional</p>
                          <p>"Aprovarei o projeto, desde que o orçamento seja respeitado."</p>
                          <p className="text-xs text-muted-foreground">(= Contanto que / desde que = condição)</p>
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
              variant={getModuleVariant(6)}
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
                frente="Conectivos Causais"
                verso="porque • pois • já que • uma vez que • visto que • tendo em vista que • porquanto — todos introduzem a causa de algo. A escolha depende do registro exigido."
              />
              <FlipCard
                frente="'Pois' Causal vs 'Pois' Explicativo"
                verso="CAUSAL: sempre após o efeito ('Ele foi demitido, pois cometeu erros graves'). EXPLICATIVO: após um imperativo ou afirmação peremptória ('Venha, pois tenho novidades'). O posicionamento na frase é a chave."
              />
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Mapa Completo de Conjunções por Valor Lógico"
              variant={getModuleVariant(6)}
            />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Em reescrita, a equivalência conjuntiva só é válida dentro do
              mesmo <strong>valor lógico</strong>. Nunca troque uma conjunção
              por outra de valor diferente, mesmo que pareça sinônima na
              língua cotidiana.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {[
                {
                  valor: "Causal",
                  cor: "bg-orange-500/10 border-orange-500/20",
                  lista: "porque • pois • já que • uma vez que • visto que • tendo em vista que • porquanto • dado que",
                },
                {
                  valor: "Condicional",
                  cor: "bg-yellow-500/10 border-yellow-500/20",
                  lista: "se • caso • desde que • contanto que • a não ser que • salvo se",
                },
                {
                  valor: "Concessiva",
                  cor: "bg-red-500/10 border-red-500/20",
                  lista: "embora • ainda que • mesmo que • posto que • conquanto • apesar de que • por mais que",
                },
                {
                  valor: "Conclusiva",
                  cor: "bg-green-500/10 border-green-500/20",
                  lista: "portanto • logo • por isso • por conseguinte • assim • destarte • dessa forma",
                },
                {
                  valor: "Adversativa",
                  cor: "bg-blue-500/10 border-blue-500/20",
                  lista: "mas • porém • contudo • todavia • no entanto • entretanto • não obstante",
                },
                {
                  valor: "Temporal",
                  cor: "bg-purple-500/10 border-purple-500/20",
                  lista: "quando • enquanto • assim que • logo que • desde que • antes que • depois que",
                },
              ].map((item) => (
                <div
                  key={item.valor}
                  className={`p-4 ${item.cor} border rounded-xl`}
                >
                  <p className="font-bold text-xs mb-2">{item.valor}</p>
                  <p className="text-muted-foreground text-xs leading-relaxed">{item.lista}</p>
                </div>
              ))}
            </div>
            <AlertBox tipo="danger" titulo="Cruzamento Proibido">
              Nunca troque uma concessiva por uma causal ou uma condicional por
              uma conclusiva. Esses cruzamentos são os distratores mais comuns
              nas questões de reescrita da CESGRANRIO.
            </AlertBox>
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

      {/* ── MÓDULO 7: O DUELO CONCESSIVO ──────────────────────── */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <ModuleBanner
          numero={7}
          titulo="O Duelo Concessivo"
          descricao="Embora vs Mas. A troca mais perigosa e frequente da banca Cesgranrio."
          gradiente="bg-gradient-to-br from-red-600 to-rose-800"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Embora x Mas — O Duelo Concessivo"
              variant="rose"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "A Mudança de Modo Verbal",
                  icone: <LuScale />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Ao trocar um conectivo adversativo (<strong>mas</strong>)
                        por um concessivo (<strong>embora / ainda que /
                        apesar de que</strong>), você muda a força da frase.
                        Enquanto o "mas" destaca a segunda ideia, o "embora"
                        preserva a força da oração principal.
                      </p>
                      <AlertBox tipo="danger" titulo="Vigilância Verbal Obrigatória">
                        "Mas produziu" (Indicativo) → "Embora produzisse"
                        (Subjuntivo Imperfeito). O modo verbal SEMPRE muda quando
                        você passa de adversativa para concessiva subordinada!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Família das Concessivas",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        Todas as conjunções/locuções abaixo introduzem oração
                        concessiva (ideia contrária que não impede o fato
                        principal):
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                        {[
                          "embora",
                          "ainda que",
                          "mesmo que",
                          "posto que",
                          "conquanto",
                          "apesar de que",
                          "por mais que",
                          "se bem que",
                          "nem que",
                        ].map((c) => (
                          <div
                            key={c}
                            className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-center font-medium"
                          >
                            {c}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Todas exigem verbo no <strong>Subjuntivo</strong> na
                        oração que introduzem (exceto "apesar de que" que admite
                        indicativo em registros mais informais).
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Adversativas vs Concessivas — Diferença de Ênfase",
                  icone: <LuZap />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        A oposição entre adversativas e concessivas é de{" "}
                        <strong>posição de ênfase</strong>:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="p-4 bg-muted/50 rounded-xl border border-border">
                          <p className="font-bold text-xs mb-2">Adversativa (MAS)</p>
                          <p>"O equipamento falhou,{" "}<strong>mas</strong>{" "}a operação continuou."</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Ênfase na segunda oração: a operação continuou
                            apesar do obstáculo.
                          </p>
                        </div>
                        <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                          <p className="font-bold text-xs mb-2">Concessiva (EMBORA)</p>
                          <p>"<strong>Embora</strong>{" "}o equipamento falhasse, a operação continuou."</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Ênfase na oração principal: "a operação continuou"
                            é a informação nuclear.
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
              title="Comparação: Adversativa vs Concessiva na Prática"
              variant="rose"
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
              variant="rose"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Expressando Concessão sem Conjunção",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        A concessão pode ser expressa sem conjunção subordinativa,
                        usando construções com gerúndio, locução prepositiva ou
                        particípio. A banca exige que você reconheça essas
                        equivalências:
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                          <p className="font-bold text-xs mb-1">Com conjunção (padrão)</p>
                          <p>"<em>Embora</em> o prazo estivesse apertado, a equipe entregou o projeto."</p>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-xl border border-border">
                          <p className="font-bold text-xs mb-1">Com locução prepositiva</p>
                          <p>"<em>Apesar de</em> o prazo estar apertado, a equipe entregou o projeto."</p>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-xl border border-border">
                          <p className="font-bold text-xs mb-1">Com gerúndio concessivo</p>
                          <p>"<em>Mesmo tendo</em> o prazo apertado, a equipe entregou o projeto."</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Todas as três versões são semanticamente equivalentes e
                        válidas na norma culta — a banca pode apresentar qualquer
                        uma como reescrita correta.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Concessiva Real vs Concessiva Hipotética",
                  icone: <LuScale />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        "Embora" e "ainda que" introduzem tipos diferentes de
                        concessão:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="p-4 bg-muted/50 rounded-xl border border-border">
                          <p className="font-bold text-xs mb-1">Concessiva Real (Embora)</p>
                          <p>"Embora o relatório <em>estivesse</em> incompleto, foi aprovado."</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Fato real — o relatório realmente estava incompleto.
                            Subjuntivo Imperfeito.
                          </p>
                        </div>
                        <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                          <p className="font-bold text-xs mb-1">Concessiva Hipotética (Mesmo que)</p>
                          <p>"Mesmo que o relatório <em>esteja</em> incompleto, será aprovado."</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Hipótese — o relatório pode ou não estar incompleto.
                            Subjuntivo Presente.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={getRandomQuestions(QUIZ_M8_PARAFRASES, 4)}
            titulo="Fixação - Módulo 7"
            icone="🎯"
            numero={7}
            variant="rose"
            onComplete={(score) => handleModuleComplete("modulo-7", score)}
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 8: PONTUAÇÃO E SENTIDO ─────────────────────── */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <ModuleBanner
          numero={8}
          titulo="Pontuação e Sentido"
          descricao="A vírgula não é apenas uma pausa; ela é o interruptor do sentido explicativo/restritivo."
          gradiente="bg-gradient-to-br from-rose-700 to-red-900"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="O Poder da Vírgula"
              variant="rose"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "A Regra das Adjetivas",
                  icone: <LuCheck />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-muted/50 rounded-xl border border-border">
                          <p className="text-xs font-bold mb-1">
                            COM Vírgula (Explicativa)
                          </p>
                          <p className="text-sm">
                            Os homens, que são racionais, lutam. (Todos os homens)
                          </p>
                        </div>
                        <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                          <p className="text-xs font-bold mb-1 text-primary">
                            SEM Vírgula (Restritiva)
                          </p>
                          <p className="text-sm">
                            Os homens que são racionais lutam. (Somente os
                            racionais)
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        A presença ou ausência da vírgula muda completamente
                        quem está incluído na afirmação — por isso a banca usa
                        essa distinção em questões de reescrita.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Vírgula antes de Conjunção — Quando é Obrigatória?",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        A vírgula antes de uma conjunção coordenativa não é
                        sempre opcional — ela é obrigatória em alguns casos e
                        proibida em outros:
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                          <p className="font-bold text-xs mb-1">Obrigatória: adversativas e conclusivas</p>
                          <p>"O técnico chegou atrasado<strong>,</strong> mas concluiu o serviço."</p>
                          <p>"Estudou bastante<strong>,</strong> portanto foi aprovado."</p>
                        </div>
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                          <p className="font-bold text-xs mb-1">Proibida (em geral): aditiva simples com sujeito igual</p>
                          <p>"O engenheiro planejou e executou o projeto." (sem vírgula)</p>
                        </div>
                        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                          <p className="font-bold text-xs mb-1">Permitida: aditiva com sujeito diferente</p>
                          <p>"A diretoria aprovou o contrato<strong>,</strong> e o jurídico o arquivou."</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Pontuação e Reescrita — Como a Banca Cobra",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        A CESGRANRIO apresenta duas versões de uma frase —
                        idênticas exceto pela pontuação — e pergunta se o
                        sentido foi mantido. As principais armadilhas:
                      </p>
                      <ul className="list-disc pl-5 text-sm space-y-2 text-muted-foreground">
                        <li>
                          Adicionar vírgula em oração restritiva transforma-a
                          em explicativa, alterando o escopo da afirmação.
                        </li>
                        <li>
                          Remover vírgula antes de "mas" é erro gramatical —
                          invalida a reescrita inteira.
                        </li>
                        <li>
                          Usar ponto-e-vírgula onde havia vírgula pode alterar
                          a relação sintática entre orações.
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
              variant="rose"
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
            <AlertBox tipo="danger" titulo="Vírgula + Conjunção Adversativa na Reescrita">
              A banca frequentemente propõe a reescrita de uma frase com "mas"
              sem vírgula antecedente. Isso é um erro gramatical — antes de "mas"
              adversativo, a vírgula é <strong>obrigatória</strong>. Reescritas
              que omitem essa vírgula devem ser marcadas como incorretas.
            </AlertBox>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Outros Sinais de Pontuação na Reescrita"
              variant="rose"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FlipCard
                frente="Dois-Pontos e Travessão"
                verso="Na reescrita, dois-pontos introdutores de discurso direto são eliminados na passagem para o indireto. O travessão de diálogo também desaparece — a fala passa a ser oração subordinada com 'que'."
              />
              <FlipCard
                frente="Ponto-e-Vírgula"
                verso="Separa itens de enumeração ou orações coordenadas de maior extensão. Na reescrita, substituir vírgula por ponto-e-vírgula entre orações coordenadas pode ser válido se não alterar a relação lógica."
              />
              <FlipCard
                frente="Parênteses e Travessão Explicativo"
                verso="Ambos isolam informações adicionais (aposto ou explicação). Na reescrita, podem ser substituídos por vírgulas — o sentido é preservado, mas o grau de destaque muda sutilmente."
              />
              <FlipCard
                frente="Ponto Final vs Reticências"
                verso="Reticências indicam suspensão, hesitação ou discurso interrompido. Substituí-las por ponto final pode alterar a modalidade do enunciado — de incerto para categórico."
              />
            </div>
            <AlertBox tipo="info" titulo="Pontuação como Recurso de Coesão">
              Em questões de reescrita, a pontuação não é apenas estética —
              ela é um marcador de relações lógicas (explicação, restrição,
              enumeração, oposição). Qualquer alteração de sinal pode mudar
              o valor semântico da frase.
            </AlertBox>
          </section>

          <QuizInterativo
            questoes={quizM7}
            titulo="Fixação - Módulo 8"
            icone="🎯"
            numero={8}
            variant="rose"
            onComplete={(score) => handleModuleComplete("modulo-8", score)}
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 9: LABORATÓRIO CESGRANRIO ───────────────────── */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <ModuleBanner
          numero={9}
          titulo="Laboratório CESGRANRIO"
          descricao="Analise as 5 trocas que a banca mais ama e que derrubam 90% dos candidatos."
          gradiente="bg-gradient-to-br from-blue-700 to-cyan-800"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Padrões de Elite — As Trocas Favoritas da Banca"
              variant={getModuleVariant(1)}
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "A Pegadinha do 'Onde'",
                  icone: <LuTriangleAlert />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        "Onde" só serve para lugares físicos concretos. Para
                        referentes abstratos (reunião, contrato, processo),
                        use "em que" ou "no qual/na qual".
                      </p>
                      <div className="p-3 bg-red-500/5 rounded-xl border border-red-500/20 text-sm space-y-1">
                        <p>❌ "Na reunião <strong>onde</strong> decidimos o orçamento..."</p>
                        <p className="text-green-600 dark:text-green-400">
                          ✅ "Na reunião <strong>em que</strong> decidimos o orçamento..."
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          "Reunião" não é lugar físico — exige pronome relativo
                          "em que" ou "na qual".
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Posto Que vs Contanto Que",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-muted rounded-lg text-center">
                          <p className="font-bold text-xs">Posto Que</p>
                          <p className="text-[10px] text-muted-foreground mt-1">Concessão (= Embora)</p>
                          <p className="text-xs mt-2 italic">"Posto que fosse difícil, foi aprovado."</p>
                        </div>
                        <div className="p-3 bg-muted rounded-lg text-center">
                          <p className="font-bold text-xs">Contanto Que</p>
                          <p className="text-[10px] text-muted-foreground mt-1">Condição (= Caso / Se)</p>
                          <p className="text-xs mt-2 italic">"Será aprovado, contanto que atenda os requisitos."</p>
                        </div>
                      </div>
                      <AlertBox tipo="danger" titulo="Erro Clássico CESGRANRIO">
                        A banca troca "embora" por "contanto que" e vice-versa
                        para testar se você sabe que concessiva ≠ condicional.
                        São valores lógicos opostos!
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Cujo — O Pronome Relativo Possessivo",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        "Cujo/cuja" é pronome relativo possessivo — indica
                        posse. Nunca aceita artigo depois dele e concorda em
                        gênero e número com o substantivo que o segue (o
                        possuído), não com o antecedente.
                      </p>
                      <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-sm space-y-1">
                        <p>❌ "O técnico cujo o relatório foi aprovado..."</p>
                        <p className="text-green-600 dark:text-green-400">
                          ✅ "O técnico cujo relatório foi aprovado..."
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Sem artigo após "cujo". O gênero (cujo/cuja) segue o
                          possuído: "relatório" (masc.) → "cujo".
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Reescrita com Voz Passiva + Nominalização",
                  icone: <LuRepeat />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        Uma questão frequente combina duas transformações:
                        passiva + nominalização. Exemplo real de prova:
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="p-3 bg-muted/50 rounded-xl border border-border">
                          <p className="font-bold text-xs mb-1">Original (ativa verbal)</p>
                          <p>"A diretoria aprovou o plano de negócios."</p>
                        </div>
                        <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                          <p className="font-bold text-xs mb-1">Reescrita (passiva)</p>
                          <p>"O plano de negócios foi aprovado pela diretoria."</p>
                        </div>
                        <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                          <p className="font-bold text-xs mb-1">Reescrita (nominalização)</p>
                          <p>"A aprovação do plano de negócios pela diretoria..."</p>
                          <p className="text-xs text-muted-foreground">(incompleta sem predicado — válida apenas em contexto nominal)</p>
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
              title="Os 5 Erros que Derrubam Candidatos"
              variant={getModuleVariant(1)}
            />
            <AlertBox tipo="danger" titulo="Armadilhas Recorrentes em Provas Petrobras">
              A CESGRANRIO repete padrões de erro em provas diferentes. Conhecê-los
              é vantagem competitiva decisiva. Estude cada um dos cinco abaixo
              até automatizá-los.
            </AlertBox>
            <CardCarousel
              cards={[
                {
                  icone: "⚠️",
                  title: "Erro 1: Modalidade Trocada",
                  descricao:
                    "Trocar 'pode' por 'deve' ou 'é possível' por 'é certo'. Possibilidade ≠ obrigação ≠ certeza. A banca conta com a leitura rápida para este erro.",
                },
                {
                  icone: "⚠️",
                  title: "Erro 2: Agente da Passiva Omitido Indevidamente",
                  descricao:
                    "Omitir o agente da passiva quando ele é essencial para o sentido. 'Foi aprovado' (sem agente) ≠ 'Foi aprovado pela diretoria' em questões que exigem precisão.",
                },
                {
                  icone: "⚠️",
                  title: "Erro 3: Concessiva ↔ Condicional",
                  descricao:
                    "Trocar 'embora' (concessão) por 'contanto que' (condição). São relações lógicas opostas — concessão admite o obstáculo, condição impõe exigência.",
                },
                {
                  icone: "⚠️",
                  title: "Erro 4: Tempo Verbal Errado na Passiva",
                  descricao:
                    "Usar 'foi aprovado' (pretérito perfeito) quando o original estava no imperfeito 'era aprovado'. O tempo do SER deve espelhar o tempo do verbo na ativa.",
                },
                {
                  icone: "⚠️",
                  title: "Erro 5: Vírgula em Relativa Restritiva",
                  descricao:
                    "Acrescentar vírgula em oração relativa restritiva na reescrita. Isso transforma a restrição em explicação, alterando o escopo da afirmação.",
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Comparação de Reescritas — Laboratório Prático"
              variant={getModuleVariant(1)}
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

          <QuizInterativo
            questoes={quizM9}
            titulo="Fixação - Módulo 9 (Laboratório CESGRANRIO)"
            icone="🎯"
            numero={9}
            variant={getModuleVariant(1)}
            onComplete={(score) => handleModuleComplete("modulo-9", score)}
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 10: ARENA DE ELITE ─────────────────────────── */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <ModuleBanner
          numero={10}
          titulo="Arena de Elite"
          descricao="Simulado Final: 10 questões de reescrita global. O teste definitivo de sua semântica."
          gradiente="bg-gradient-to-br from-slate-800 to-slate-950"
        />

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Revisão Express — Todas as Técnicas"
              variant={getModuleVariant(10)}
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Módulos 1–3: Paráfrase, Sinonímia e Vozes",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        <strong>M1 — Paráfrase:</strong> Equivalência semântica +
                        correção gramatical. Nunca extrapole nem restrinja o
                        sentido original. Verifique modalidade e polaridade.
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        <strong>M2 — Sinonímia:</strong> Teste a substituição no
                        contexto. Preserve o registro (formal/técnico em textos
                        Petrobras). Cuidado com parônimos e hiperônimos.
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        <strong>M3 — Vozes:</strong> OD ativo → sujeito passivo.
                        Verbo SER + particípio, tempo idêntico. Agente introduzido
                        por "por". Passiva sintética: "se" apassivador, verbo
                        concorda com o sujeito posposto.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Módulos 4–6: Discurso, Nominalização e Conectivos",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        <strong>M4 — Discurso Indireto:</strong> Recuo temporal
                        obrigatório (presente → imperfeito; futuro → condicional).
                        Pronomes 1ª/2ª → 3ª pessoa. Advérbios: hoje → naquele dia,
                        amanhã → no dia seguinte.
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        <strong>M5 — Nominalização:</strong> Verbo → substantivo
                        de ação. O agente pode aparecer como "por" + SN. Muito
                        frequente em documentos técnicos Petrobras.
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        <strong>M6 — Conectivos:</strong> Causais (porque, pois,
                        já que, uma vez que, visto que). Condicionais (se, caso,
                        contanto que). "Desde que" é bifuncional. Preserve o valor
                        lógico ao substituir.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Módulos 7–9: Concessiva, Pontuação e CESGRANRIO",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        <strong>M7 — Concessivas:</strong> Adversativa (mas) →
                        concessiva (embora): indicativo → subjuntivo. Família:
                        embora, ainda que, mesmo que, posto que, conquanto.
                        Ênfase muda de oração.
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        <strong>M8 — Pontuação:</strong> Vírgula em restritiva
                        → explicativa (muda escopo). Vírgula obrigatória antes
                        de "mas". Ponto-e-vírgula altera hierarquia oracional.
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        <strong>M9 — CESGRANRIO:</strong> "Onde" só para lugar
                        físico. "Cujo" sem artigo. "Posto que" ≠ "contanto que".
                        Os 5 erros: modalidade, agente, concessiva/condicional,
                        tempo passivo, vírgula em restritiva.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Checklist Final de Prova",
                  icone: <LuCheck />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        Use este roteiro mental para cada questão de reescrita:
                      </p>
                      <ol className="list-decimal pl-5 text-sm space-y-2 text-muted-foreground">
                        <li>Leia a frase original inteira sem pressa.</li>
                        <li>Identifique o <strong>tipo de reescrita</strong> pedido (voz, discurso, conectivo...).</li>
                        <li>Aplique a regra específica do tipo identificado.</li>
                        <li>Verifique: <strong>modalidade, polaridade e registro</strong> foram preservados?</li>
                        <li>Confira a <strong>gramática</strong>: concordância, regência, crase, pontuação.</li>
                        <li>Se ainda em dúvida, descarte as opções com erro gramatical evidente.</li>
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
              variant={getModuleVariant(10)}
            />
            <AlertBox tipo="info" titulo="Recapitulação Final">
              A reescrita bem-sucedida é aquela em que você leria a frase nova num
              jornal e ela passaria a mesma informação da antiga, sem erros de
              crase ou concordância.
            </AlertBox>
            <AlertBox tipo="warning" titulo="Gestão de Tempo nas Questões de Reescrita">
              Questões de reescrita exigem leitura dupla (original + opções) —
              reserve <strong>2–3 minutos por questão</strong>. Se uma opção
              parecer obviamente correta em 10 segundos, desconfie: a banca
              costuma colocar a distração "fácil" para atrair leituras rápidas
              superficiais.
            </AlertBox>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FlipCard
                frente="Dica 1: Elimine pelo Erro Gramatical"
                verso="Antes de analisar o sentido, descarte as opções com erro gramatical evidente (concordância errada, crase indevida, regência incorreta). Isso reduz o universo de escolha imediatamente."
              />
              <FlipCard
                frente="Dica 2: Leia em Voz Alta (Mental)"
                verso="Leia a paráfrase candidata em voz alta mentalmente. Se 'soar' diferente do original — mais forte, mais fraca, mais específica ou mais vaga — provavelmente há distorção semântica."
              />
              <FlipCard
                frente="Dica 3: Foque na Modalidade"
                verso="A modalidade (certeza, possibilidade, obrigação, dúvida) é o alvo preferido da banca. 'Deve', 'pode', 'é', 'talvez seja' são palavras com pesos semânticos radicalmente diferentes."
              />
              <FlipCard
                frente="Dica 4: Cuidado com Dupla Negação"
                verso="Algumas reescritas usam dupla negação para manter o sentido positivo. 'Não é impossível' = 'É possível'. Verifique se a equivalência lógica foi mantida corretamente."
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

          <QuizInterativo
            questoes={quizM10}
            titulo="Simulado de Conclusão"
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
