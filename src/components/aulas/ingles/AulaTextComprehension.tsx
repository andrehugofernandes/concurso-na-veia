"use client";

import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  ModuleConsolidation,
  AlertBox,
  QuizInterativo,
  ModuleBanner,
  getRandomQuestions,
  AulaProps,
  CardCarousel,
  ContentAccordion,
  AulaTemplate,
  ModuleSectionHeader,
  FlipCard,
  TimelineItem,
  ComparisonSide,
} from "../shared";

import { getModuleVariant } from "@/lib/moduleColors";

import {
  LuBookOpen,
  LuLightbulb,
  LuPlay,
  LuTriangleAlert,
  LuZap,
  LuCircleCheck,
  LuShield,
  LuGraduationCap,
  LuTarget,
  LuEye,
  LuSearch,
  LuClipboardList,
} from "react-icons/lu";

import {
  QUIZ_M1_DECODING,
  QUIZ_M2_SKIMMING,
  QUIZ_M3_SCANNING,
  QUIZ_M4_VOCABULARY,
  QUIZ_M5_PARAGRAPH,
  QUIZ_M6_REFERENCE,
  QUIZ_M7_TONE,
  QUIZ_M8_INFERENCE,
  QUIZ_M9_CESGRANRIO,
  QUIZ_M10_SIMULADO_MESTRE,
} from "./data/text-comprehension-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Decoding Question Types (Main Idea / Detail / Inference)" },
  { id: "modulo-2", label: "Módulo 2", title: "Skimming — Leitura Panorâmica" },
  { id: "modulo-3", label: "Módulo 3", title: "Scanning — Localização Precisa" },
  { id: "modulo-4", label: "Módulo 4", title: "Vocabulary in Context" },
  { id: "modulo-5", label: "Módulo 5", title: "Paragraph Structure & Topic Sentences" },
  { id: "modulo-6", label: "Módulo 6", title: "Reference Words & Text Cohesion" },
  { id: "modulo-7", label: "Módulo 7", title: "Tone & Author's Purpose" },
  { id: "modulo-8", label: "Módulo 8", title: "Inference & Implicit Information" },
  { id: "modulo-9", label: "Módulo 9", title: "Reading Comprehension em Provas CESGRANRIO" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre (Final)" },
] as const;

export default function AulaTextComprehension({
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
  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());

  const [quizM1, setQuizM1] = useState<typeof QUIZ_M1_DECODING>([]);
  const [quizM2, setQuizM2] = useState<typeof QUIZ_M2_SKIMMING>([]);
  const [quizM3, setQuizM3] = useState<typeof QUIZ_M3_SCANNING>([]);
  const [quizM4, setQuizM4] = useState<typeof QUIZ_M4_VOCABULARY>([]);
  const [quizM5, setQuizM5] = useState<typeof QUIZ_M5_PARAGRAPH>([]);
  const [quizM6, setQuizM6] = useState<typeof QUIZ_M6_REFERENCE>([]);
  const [quizM7, setQuizM7] = useState<typeof QUIZ_M7_TONE>([]);
  const [quizM8, setQuizM8] = useState<typeof QUIZ_M8_INFERENCE>([]);
  const [quizM9, setQuizM9] = useState<typeof QUIZ_M9_CESGRANRIO>([]);
  const [quizFinal, setQuizFinal] = useState<typeof QUIZ_M10_SIMULADO_MESTRE>([]);

  const [hasSyncedInitial, setHasSyncedInitial] = useState(false);
  const [showCompletionBadge, setShowCompletionBadge] = useState(false);

  useEffect(() => {
    if (isCompleted) setShowCompletionBadge(true);
  }, [isCompleted]);

  useEffect(() => {
    if (!hasSyncedInitial && !loading) {
      setQuizM1(getRandomQuestions(QUIZ_M1_DECODING, 8));
      setQuizM2(getRandomQuestions(QUIZ_M2_SKIMMING, 8));
      setQuizM3(getRandomQuestions(QUIZ_M3_SCANNING, 8));
      setQuizM4(getRandomQuestions(QUIZ_M4_VOCABULARY, 8));
      setQuizM5(getRandomQuestions(QUIZ_M5_PARAGRAPH, 8));
      setQuizM6(getRandomQuestions(QUIZ_M6_REFERENCE, 8));
      setQuizM7(getRandomQuestions(QUIZ_M7_TONE, 8));
      setQuizM8(getRandomQuestions(QUIZ_M8_INFERENCE, 8));
      setQuizM9(getRandomQuestions(QUIZ_M9_CESGRANRIO, 8));
      setQuizFinal(getRandomQuestions(QUIZ_M10_SIMULADO_MESTRE, 8));
      setHasSyncedInitial(true);
    }
  }, [loading, hasSyncedInitial]);

  const handleModuleComplete = (moduleId: string) => {
    setCompletedModules((prev) => new Set([...prev, moduleId]));
  };

  return (
    <AulaTemplate
      titulo={titulo || "Text Comprehension — 8 Estratégias de Leitura em Inglês"}
      descricao={descricao || "Domine skimming, scanning, inferência e análise de contexto com estratégias CESGRANRIO para ler textos técnicos Petrobras com confiança"}
      duracao={duracao || "16 horas"}
      materiaNome={materiaNome || "Inglês"}
      materiaCor={materiaCor || "from-blue-500 to-cyan-400"}
      materiaId={materiaId || "ingles"}
      modules={MODULE_DEFS}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      completedModules={completedModules}
      onComplete={onComplete}
      isCompleted={isCompleted}
      showCompletionBadge={showCompletionBadge}
      completionBadgeText="📚 MASTER EM READING COMPREHENSION"
      prevTopico={prevTopico}
      nextTopico={nextTopico}
    >
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* MODULE 1 — DECODING QUESTION TYPES */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-1">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            modulo={1}
            titulo="Decoding Question Types (Main Idea / Detail / Inference)"
            icone={<LuTarget className="w-8 h-8" />}
            corModulo={getModuleVariant(1)}
            descricao="Identifique os 3 tipos principais de questões testadas em leitura CESGRANRIO e a estratégia específica para cada uma"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              titulo="Os 3 Tipos de Questões de Compreensão"
              descricao="CESGRANRIO sempre testa: (1) Main Idea — qual é o tema central? (2) Detail — qual detalhe específico? (3) Inference — o que está implicado?"
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Questões de compreensão de leitura em inglês podem parecer variadas, mas CESGRANRIO as agrupa em três categorias universais. Entender qual tipo você está respondendo é o primeiro passo para uma estratégia vencedora. A diferença entre estes três tipos NÃO é apenas semântica — cada um exige uma abordagem completamente diferente ao texto. Confundir os tipos é a razão pela qual muitos candidatos acertam por sorte, não por estratégia.
              </p>

              <p>
                <strong>Main Idea Questions</strong> perguntam pelo TEMA CENTRAL do texto inteiro, não por um detalhe. A questão típica é "What is the main purpose of the text?" ou "Which statement best summarizes the passage?" ou "What is the author primarily discussing?" Você não procura uma informação específica — você procura a ideia-guarda-chuva que cobre tudo. A estratégia é: leia o TÍTULO primeiro, depois a primeira e a última sentença de cada parágrafo. Isto te dá 80% da ideia central sem ler palavra-por-palavra. Main Idea está sempre em uma destas três posições: (1) Título, (2) primeira sentença do primeiro parágrafo (topic sentence), ou (3) última sentença (conclusão). A pegadinha mais comum é candidatos escolherem um detalhe específico que vira secundário — recuse opções que são MUITO específicas ou mencionam apenas uma parte do texto.
              </p>

              <p>
                <strong>Detail Questions</strong> perguntam por FATOS ESPECÍFICOS. "According to the text, what happened?" ou "When did X occur?" ou "How many...?" ou "What did the author mention about Y?" Estas questões são diretas: procure a resposta no texto, achada — está lá, em preto e branco. A estratégia é SCANNING: você procura pela palavra-chave da questão, marca a sentença, relê o contexto ao redor, e valida a resposta. Você NÃO precisa entender tudo o que está lendo — você precisa localizar um dado específico. Detail questions são as MAIS RÁPIDAS de responder (5-10 segundos cada) se você usa scanning. A pegadinha: o texto pode mencionar a palavra-chave em múltiplos lugares — procure aquele que responde a pergunta, não apenas qualquer menção.
              </p>

              <p>
                <strong>Inference Questions</strong> perguntam pelo que está IMPLICADO mas NÃO DITO. "What does the author suggest?" ou "It can be inferred that..." ou "The author implies that..." A resposta não aparece na página — você precisa deduzir logicamente a partir de pistas no texto. Inference é diferente de adivinhar: uma inferência válida é SEMPRE SUPORTADA pelo texto, mesmo que indiretamente. Exemplo: "The company reported record profits. The CEO announced a raise for all employees." — Você pode inferir que lucros causaram o aumento salarial, mesmo que não esteja explícito. Você NÃO pode inferir que "o CEO é uma pessoa generosa" porque isso é especulação além do suporte textual. A estratégia é: leia o contexto ao redor, procure por causa-efeito, procure por conectores lógicos (because, therefore, as a result), e então deduza uma conclusão que o texto suportaria.
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg border border-blue-200 dark:border-blue-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Tabela de Tipos de Questão</h4>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border-l-4 border-blue-500 pl-4 py-2">
                      <p className="font-semibold text-blue-700 dark:text-blue-300">Main Idea</p>
                      <p className="text-xs mt-1">Sinais: "main idea", "primarily", "summarize"</p>
                      <p className="text-xs mt-1">Estratégia: Título + 1ª/última sentença</p>
                      <p className="text-xs mt-1">Tempo: 1-2 min</p>
                    </div>
                    <div className="border-l-4 border-cyan-500 pl-4 py-2">
                      <p className="font-semibold text-cyan-700 dark:text-cyan-300">Detail</p>
                      <p className="text-xs mt-1">Sinais: "According to", "When", "Who", "How many"</p>
                      <p className="text-xs mt-1">Estratégia: Scanning (procure palavra-chave)</p>
                      <p className="text-xs mt-1">Tempo: 30 seg</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4 py-2">
                      <p className="font-semibold text-green-700 dark:text-green-300">Inference</p>
                      <p className="text-xs mt-1">Sinais: "Implies", "Suggests", "Infers"</p>
                      <p className="text-xs mt-1">Estratégia: Contexto + causa-efeito + deduz</p>
                      <p className="text-xs mt-1">Tempo: 1-2 min</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "① Conceituação: Os 3 Tipos de Questão",
                  icone: <LuBookOpen className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-base leading-relaxed">
                        <strong>Main Idea Question (Pergunta de Ideia Central):</strong> Testa se você entende o TEMA GERAL do texto. Não é sobre um detalhe específico — é sobre qual é o propósito ou mensagem geral. Exemplos de sinais linguísticos: "What is the main purpose...?", "Which statement best summarizes...?", "The passage is primarily about...?", "What is the author's main concern...?" A estratégia é nunca ler o texto inteiro palavra-por-palavra. Em vez disso: (1) Leia o título (se houver), (2) Leia a primeira sentença do primeiro parágrafo (topic sentence), (3) Leia a última sentença de cada parágrafo subsequente, (4) Procure por palavras repetidas que indicam o tema central. Depois responda a pergunta mental: "Sobre qual tema geral fala este texto?" Opções muito específicas são armadilhas — recuse qualquer opção que pareça ser apenas uma PARTE do texto.
                      </p>

                      <p className="text-base leading-relaxed">
                        <strong>Detail Question (Pergunta de Detalhe):</strong> Testa se você consegue LOCALIZAR informação específica no texto. A resposta EXISTE no texto, em preto e branco. Exemplos de sinais: "According to the text...", "The author mentions that...", "When did X occur?", "How many...?", "What did the author say about...?" A estratégia é SCANNING puro: (1) Leia a pergunta e identifique a palavra-chave, (2) Procure aquela palavra no texto (use Ctrl+F em testes digitais se possível), (3) Quando achar, releia a sentença e o contexto ao redor, (4) Valide que aquela informação responde a pergunta, (5) Responda e avance. Detail questions são RÁPIDAS quando você escaneia em vez de ler. A pegadinha: a palavra-chave pode aparecer em múltiplas linhas — procure aquela que realmente responde a pergunta específica.
                      </p>

                      <p className="text-base leading-relaxed">
                        <strong>Inference Question (Pergunta de Inferência):</strong> Testa se você consegue DEDUZIR logicamente algo que não está dito explicitamente. Exemplos de sinais: "The author implies that...", "It can be inferred that...", "What does the author suggest about...?", "What would the author probably agree with...?" A resposta NÃO aparece palavra-por-palavra — você precisa deduzir. A estratégia é: (1) Leia o contexto completo ao redor da questão, (2) Procure por CAUSA-EFEITO (because, therefore, as a result, since, due to), (3) Procure por CONTRASTE (but, however, yet, although), (4) Procure por EVIDÊNCIA que suporta uma conclusão lógica, (5) Deduza qual conclusão o texto suportaria. A diferença crítica: inferência é DEDUÇÃO LÓGICA, não ADIVINHAÇÃO. A resposta pode não estar palavra-por-palavra, mas deve ser APOIADA logicamente pelo texto. Se você não consegue achar evidência no texto, é especulação, não inferência.
                      </p>

                      <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 space-y-2">
                        <h5 className="font-semibold text-sm">Diferenças Críticas Entre os Tipos:</h5>
                        <div className="text-sm space-y-2">
                          <div>• <strong>Main Idea</strong> = tema GERAL (cobre todo o texto)</div>
                          <div>• <strong>Detail</strong> = fato ESPECÍFICO (está no texto, achado!)</div>
                          <div>• <strong>Inference</strong> = conclusão DEDUZIDA (não está dita, mas apoiada)</div>
                          <div>• Main Idea ≠ opinião do autor, apenas fato do que é discutido</div>
                          <div>• Detail ≠ interpretação, apenas localização de fatos</div>
                          <div>• Inference ≠ adivinhação, apenas dedução lógica suportada</div>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "② Exemplificação: Textos Técnicos Petrobras",
                  icone: <LuPlay className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <div className="border-l-4 border-blue-500 pl-4 py-3">
                        <p className="font-semibold text-sm mb-2">Exemplo 1: Main Idea Question</p>
                        <p className="text-sm text-foreground/80 italic">"Petrobras implemented a new safety protocol in 2023. The protocol requires daily inspections of all equipment. Workers must report any abnormalities immediately. So far, the protocol has prevented 12 incidents."</p>
                        <p className="text-sm text-foreground/80 mt-2">❓ Pergunta: "What is the primary purpose of this passage?"</p>
                        <p className="text-sm text-green-600 font-semibold mt-1">✅ Resposta correta: "To describe a safety protocol and its effectiveness"</p>
                        <p className="text-xs text-foreground/70 mt-1">❌ Armadilha: "Daily inspections are required" (detalhe, não ideia principal)</p>
                      </div>

                      <div className="border-l-4 border-cyan-500 pl-4 py-3">
                        <p className="font-semibold text-sm mb-2">Exemplo 2: Detail Question</p>
                        <p className="text-sm text-foreground/80 italic">"The compressor malfunction occurred on March 15. The technician discovered the issue at 2 PM. Maintenance took 4 hours to complete. Production resumed at 6 PM."</p>
                        <p className="text-sm text-foreground/80 mt-2">❓ Pergunta: "When did the technician discover the compressor malfunction?"</p>
                        <p className="text-sm text-green-600 font-semibold mt-1">✅ Resposta correta: "At 2 PM"</p>
                        <p className="text-xs text-foreground/70 mt-1">Estratégia: Procura "discovered" → resposta está ali, 2 PM</p>
                      </div>

                      <div className="border-l-4 border-green-500 pl-4 py-3">
                        <p className="font-semibold text-sm mb-2">Exemplo 3: Inference Question</p>
                        <p className="text-sm text-foreground/80 italic">"Production in the North field increased by 15% after the pipeline upgrade. The upgrade cost $50 million. Engineering teams worked for 18 months to complete it."</p>
                        <p className="text-sm text-foreground/80 mt-2">❓ Pergunta: "What can be inferred about the effectiveness of the pipeline upgrade?"</p>
                        <p className="text-sm text-green-600 font-semibold mt-1">✅ Resposta correta: "The upgrade was effective because production increased"</p>
                        <p className="text-xs text-foreground/70 mt-1">Estratégia: Causa (upgrade) → Efeito (15% aumento) → Inferência de efetividade</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "③ Dicas: Reconheça os Sinais Linguísticos",
                  icone: <LuLightbulb className="w-5 h-5" />,
                  conteudo: (
                    <CardCarousel
                      cards={[
                        {
                          titulo: "Main Idea = Leia Título + Primeiras/Últimas Sentenças",
                          descricao: "Procure por sinais: 'main idea', 'primarily', 'best summarizes', 'main purpose'. Nunca leia tudo — léia estrategicamente. Título + primeira sentença + última sentença de cada parágrafo = 80% da ideia.",
                          exemplo: "✓ 'What is the passage mainly about?' → Lê título primeiro",
                        },
                        {
                          titulo: "Detail = Scanning Puro (Procure a Palavra-Chave)",
                          descricao: "Procure por sinais: 'According to', 'When', 'Who', 'What', 'How many'. Identifique a palavra-chave, procure no texto, achada a sentença, releia contexto, responda.",
                          exemplo: "✓ 'When did X happen?' → Procura 'X' → encontra a sentença → extrai a data",
                        },
                        {
                          titulo: "Inference = Dedução Lógica (Procure Causa-Efeito)",
                          descricao: "Procure por sinais: 'Implies', 'Suggests', 'Infers', 'Probably', 'Would likely'. Procure causa-efeito, contraste, evidência. Deduz uma conclusão que o texto suportaria.",
                          exemplo: "✓ 'What does the author suggest?' → Procura contexto + causa-efeito → deduz",
                        },
                        {
                          titulo: "Armadilha: Confundir Main Idea com Detail",
                          descricao: "Main Idea é o TEMA GERAL, não um detalhe. Se a opção é muito específica ou menciona apenas uma parte, provavelmente é detalhe mascarado de main idea.",
                          exemplo: "❌ Pergunta 'main idea' → Resposta 'daily inspections' (muito específico)",
                        },
                        {
                          titulo: "Armadilha: Confundir Inference com Adivinhação",
                          descricao: "Inference deve ser APOIADA pelo texto. Se você não consegue encontrar evidência no texto, é adivinhação. Recuse inferências que exigem conhecimento externo.",
                          exemplo: "❌ Texto não menciona 'CEO é generoso' → Não pode inferir apenas porque parece lógico",
                        },
                      ]}
                    />
                  ),
                },
                {
                  titulo: "④ Exceções & Pegadinhas CESGRANRIO",
                  icone: <LuTriangleAlert className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox
                        tipo="danger"
                        titulo="Pegadinha #1: Main Idea vs Detalhe"
                        descricao="A pergunta pede 'main idea', mas uma opção de detalhe é tão atrativa que candidatos caem. Detalhe = específico, pequeno, uma parte. Main idea = tema geral, cobre tudo. Se a opção menciona apenas uma sentença do texto, provavelmente não é main idea."
                      >
                        <ComparisonSide
                          lado1={{ label: "❌ Detalhe (não main idea)", content: "The project cost $50 million" }}
                          lado2={{ label: "✅ Main Idea", content: "To describe a major infrastructure project and its impact" }}
                        />
                      </AlertBox>

                      <AlertBox
                        tipo="danger"
                        titulo="Pegadinha #2: Inferência vs Adivinhação"
                        descricao="Candidatos frequentemente 'inferem' coisas que o texto não suporta. Toda inferência deve ser APOIADA por evidência no texto. Se é pura especulação (mesmo que faça sentido no mundo real), recuse."
                      >
                        <ComparisonSide
                          lado1={{ label: "❌ Adivinhação (sem suporte)", content: "'The CEO announced a raise → O CEO é uma pessoa muito generosa' (não suportado)" }}
                          lado2={{ label: "✅ Inferência Válida", content: "'Production increased after upgrade → O upgrade foi efetivo' (causa-efeito apoiado)" }}
                        />
                      </AlertBox>

                      <AlertBox
                        tipo="warning"
                        titulo="Pegadinha #3: Detail em Múltiplos Lugares"
                        descricao="Às vezes a palavra-chave aparece várias vezes no texto, em contextos diferentes. Procure aquela sentença que realmente responde a pergunta específica, não apenas qualquer menção da palavra-chave."
                      >
                        <ComparisonSide
                          lado1={{ label: "Texto menciona 'pressure' 3x", content: "1) Equipment measure 'pressure' daily. 2) Pressure rose yesterday. 3) Emergency pressure release at 3 PM." }}
                          lado2={{ label: "Pergunta 'When pressure rose?'", content: "Resposta específica: 'Yesterday' (não as outras menções de 'pressure')" }}
                        />
                      </AlertBox>

                      <AlertBox
                        tipo="info"
                        titulo="Dica: Use o Processo de Eliminação"
                        descricao="Se não tem certeza, elimine opções obviamente erradas. Para Main Idea, elimine detalhes muito específicos. Para Inference, elimine coisas que o texto não suportaria. Para Detail, elimine informações que não estão no texto."
                      />
                    </div>
                  ),
                },
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Tipo de Questão?</p>
                    <p className="text-base">"What is the main purpose of this passage?"</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-blue-600">MAIN IDEA</p>
                    <p>Pergunta pelo TEMA GERAL. Estratégia: Lê título + primeira/última sentença.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Tipo de Questão?</p>
                    <p className="text-base">"According to the text, when did the project start?"</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-cyan-600">DETAIL</p>
                    <p>Pergunta por FATO ESPECÍFICO. Estratégia: Scanning (procura palavra-chave).</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Tipo de Questão?</p>
                    <p className="text-base">"What does the author imply about the safety protocol?"</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">INFERENCE</p>
                    <p>Pergunta por DEDUÇÃO LÓGICA. Estratégia: Contexto + causa-efeito + deduz.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Qual é Main Idea deste texto?</p>
                    <p className="text-xs text-foreground/70 italic">"Production increased 15%. The upgrade cost $50M. It took 18 months. Teams worked hard."</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-blue-600">TEMA GERAL (Main Idea)</p>
                    <p>"To describe a major upgrade and its positive impact on production" — NÃO é "O upgrade custou $50M" (detalhe específico)</p>
                  </div>
                }
              />
            </div>
          </section>

          <ModuleConsolidation
            modulo={1}
            corModulo={getModuleVariant(1)}
            onComplete={() => handleModuleComplete("modulo-1")}
          />

          <QuizInterativo
            questions={quizM1}
            modulo={1}
            onComplete={() => handleModuleComplete("modulo-1")}
            onScoreSubmit={() => onUpdateProgress?.({ modulo: 1, tipo: "quiz" })}
          />
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* MODULE 2 — SKIMMING */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-2">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            modulo={2}
            titulo="Skimming — Leitura Panorâmica Rápida"
            icone={<LuEye className="w-8 h-8" />}
            corModulo={getModuleVariant(2)}
            descricao="Leia textos inteiros em 30-60 segundos para captar a ideia geral sem entender cada palavra"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              titulo="Técnica de Skimming: Leitura RÁPIDA para Ideia Geral"
              descricao="Skimming é leitura seletiva — você lê ALGUNS partes do texto, muito rapidamente, apenas para entender o tema geral"
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Em provas CESGRANRIO, você não tem tempo para ler cada palavra de cada parágrafo. Uma prova típica tem 3-4 textos e 12-20 perguntas. Se você gasta 5 minutos lendo um texto palavra-por-palavra, você fica sem tempo. Skimming resolve este problema. Skimming é uma técnica de leitura onde você PULA PROPOSITALMENTE partes do texto, lendo apenas palavras-chave e estrutura, para entender a ideia geral em 30-60 segundos.
              </p>

              <p>
                A técnica é simples: (1) Leia o TÍTULO primeiro (se houver) — isto te dá um preview, (2) Leia a PRIMEIRA SENTENÇA do primeiro parágrafo (topic sentence) — isto te diz o assunto, (3) PULE os parágrafos do meio, apenas lendo a primeira sentença de cada, (4) Leia a ÚLTIMA SENTENÇA do último parágrafo (conclusão) — isto te diz como o autor termina. Tempo total: 30-60 segundos. Você agora ENTENDE o texto sem ter lido 80% dele. Esta é a razão pela qual Main Idea questions são respondidas rapidamente — é apenas skimming + resposta.
              </p>

              <p>
                Skimming é MAIS importante em provas técnicas como CESGRANRIO porque textos sobre produção de petróleo, segurança industrial, ou processos operacionais são LONGOS e DENSOS. Se você tenta ler tudo, vira um tubarão nadando em lama. Exemplo: um texto sobre otimização de refinaria pode ter 300 palavras com detalhes técnicos complexos. Skimming te permite entender "Este texto é sobre COMO A REFINARIA OTIMIZOU PRODUÇÃO" em 40 segundos, sem entender cada detalhe técnico. Os detalhes você busca só quando uma pergunta específica pede.
              </p>

              <p>
                A limitação crítica de skimming é que ele NÃO funciona para Detail ou Inference questions. Se a pergunta é "According to the text, what was the cost of the project?" e você só leu o título + primeira/última sentença, pode não ter visto a informação de custo. Para Detail questions, você volta ao texto e SCANS (procura) pela palavra-chave. Para Inference questions, você relê o contexto completo ao redor. Skimming é apenas o PASSO 1 (entender ideia geral rapidamente). Os passos 2+ adaptam conforme o tipo de pergunta.
              </p>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-lg border border-amber-200 dark:border-amber-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Processo de Skimming Passo-a-Passo</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="font-semibold text-amber-600 dark:text-amber-400 min-w-fit">Passo 1 (10s):</div>
                    <div>Leia o TÍTULO — isto te diz o tópico geral</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="font-semibold text-amber-600 dark:text-amber-400 min-w-fit">Passo 2 (10s):</div>
                    <div>Leia a 1ª sentença do 1º parágrafo — isto é a topic sentence</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="font-semibold text-amber-600 dark:text-amber-400 min-w-fit">Passo 3 (15s):</div>
                    <div>Pule os parágrafos do meio, leia apenas a 1ª sentença de cada — pega a estrutura</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="font-semibold text-amber-600 dark:text-amber-400 min-w-fit">Passo 4 (5s):</div>
                    <div>Leia a última sentença do último parágrafo — isto é a conclusão</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="font-semibold text-amber-600 dark:text-amber-400 min-w-fit">Total: 40s</div>
                    <div>Você entende a ideia geral. Agora responda perguntas ou releia contextos específicos.</div>
                  </div>
                </div>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "① Conceituação: Skimming vs Leitura Profunda",
                  icone: <LuBookOpen className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-base leading-relaxed">
                        Skimming é uma técnica onde você lê SELETIVAMENTE apenas partes-chave do texto, muito rapidamente, para captar a IDEIA GERAL sem entender cada palavra ou detalhe. É diferente de ler para aprofundamento. Quando você lê uma livro sobre um tópico que interessa, você lê lentamente, palavra-por-palavra, para APRENDER tudo. Quando você skim (escaneia rapidamente), você está apenas procurando responder "Sobre o que fala este texto?" — a resposta é suficiente se você puder responder perguntas de main idea.
                      </p>

                      <p className="text-base leading-relaxed">
                        A estrutura de um texto típico oferece uma oportunidade para skimming efetivo:
                      </p>

                      <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 space-y-3">
                        <h5 className="font-semibold text-sm">Anatomia de um Texto para Skimming:</h5>
                        <div className="text-sm space-y-2">
                          <div className="font-semibold">1. TÍTULO (5-10 palavras)</div>
                          <div className="text-xs text-foreground/80">— Te diz o assunto geral em uma linha. Exemplo: "Petrobras Improves Pipeline Safety with New Monitoring System"</div>
                          <div className="font-semibold">2. PARÁGRAFO 1 (Topic Sentence)</div>
                          <div className="text-xs text-foreground/80">— A primeira sentença resume toda a ideia do parágrafo. Resto = detalhes de suporte.</div>
                          <div className="font-semibold">3. PARÁGRAFOS 2-N (Supporting Details)</div>
                          <div className="text-xs text-foreground/80">— Leia apenas 1ª sentença de cada (topic) e pule o resto. Se uma pergunta pede detalhes deste parágrafo, volta depois.</div>
                          <div className="font-semibold">4. PARÁGRAFO FINAL (Conclusão)</div>
                          <div className="text-xs text-foreground/80">— Última sentença resume o conclusion ou implicação. Leia esta para entender como o autor termina.</div>
                        </div>
                      </div>

                      <p className="text-base leading-relaxed">
                        Quando você skims usando esta anatomia, você entende 80-90% da ideia geral em 40-60 segundos, sem ter lido 80% do texto. Isto é especialmente poderoso em provas onde você tem MÚLTIPLOS textos. Você skims todos em ~3 minutos total (3 textos × 60 segundos), entende a ideia geral de cada um, e depois você volta conforme as perguntas pedem detalhes.
                      </p>

                      <p className="text-base leading-relaxed">
                        <strong>Quando usar skimming:</strong> (1) Main idea questions, (2) Quando você tem MUITO texto e POUCO tempo, (3) Quando você quer prioridade — entender o geral antes dos detalhes. <strong>Quando NÃO usar APENAS skimming:</strong> (1) Detail questions, (2) Inference questions, (3) Vocabulary questions — estes exigem leitura mais profunda.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "② Exemplificação: 4 Textos Técnicos Petrobras",
                  icone: <LuPlay className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <div className="bg-foreground/5 rounded-lg p-4 space-y-3">
                        <p className="font-semibold text-sm">EXEMPLO 1: Production Report</p>
                        <p className="text-xs text-foreground/70 italic mb-2">"Q3 Production Efficiency Improvement Initiative"</p>
                        <p className="text-sm font-semibold">Skim: Lê título → 1ª sentença → Pula meio → Última sentença</p>
                        <div className="bg-card rounded p-3 text-xs space-y-1 mt-2">
                          <p><strong>Título:</strong> "Production Efficiency Improvement" = sobre EFICIÊNCIA</p>
                          <p><strong>1ª sentença:</strong> "Petrobras achieved 12% production increase in Q3..." = RESULTADO POSITIVO</p>
                          <p><strong>Pula:</strong> (detalhes técnicos sobre equipment, methods)</p>
                          <p><strong>Última:</strong> "Overall, the initiative exceeded targets and will continue in Q4." = CONCLUSÃO POSITIVA</p>
                          <p className="text-green-600 font-semibold mt-2">✓ Ideia geral: Petrobras improved production efficiency with successful results</p>
                        </div>
                      </div>

                      <div className="bg-foreground/5 rounded-lg p-4 space-y-3">
                        <p className="font-semibold text-sm">EXEMPLO 2: Safety Bulletin</p>
                        <p className="text-xs text-foreground/70 italic mb-2">"Updated Emergency Response Procedures for Pressure Incidents"</p>
                        <p className="text-sm font-semibold">Skim: Título + 1ª sentença + Pula + Última sentença</p>
                        <div className="bg-card rounded p-3 text-xs space-y-1 mt-2">
                          <p><strong>Título:</strong> "Emergency Response Procedures" = sobre SEGURANÇA</p>
                          <p><strong>1ª:</strong> "Safety protocols were updated following last year's incident..." = MOTIVO da atualização</p>
                          <p><strong>Pula:</strong> (4 parágrafos de detalhes sobre procedures)</p>
                          <p><strong>Última:</strong> "All staff must complete training by next month." = AÇÃO REQUERIDA</p>
                          <p className="text-green-600 font-semibold mt-2">✓ Ideia geral: Safety procedures were updated and training is required</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "③ Dicas: Sinais Visuais de Skimming",
                  icone: <LuLightbulb className="w-5 h-5" />,
                  conteudo: (
                    <CardCarousel
                      cards={[
                        {
                          titulo: "1. TÍTULO É O MELHOR AMIGO",
                          descricao: "O título frequentemente resume tudo. 'Petrobras Reduces Costs by 20%' = texto é sobre redução de custos. Não especule além do título.",
                          exemplo: "✓ Lê título em 5 segundos, já sabe 50% do tema",
                        },
                        {
                          titulo: "2. PRIMEIRA SENTENÇA DO PARÁGRAFO",
                          descricao: "Topic sentence é SEMPRE a primeira (ou segunda). Se a primeira sentença é 'The project had three goals', o resto do parágrafo detalha apenas os três.",
                          exemplo: "✓ 1ª sentença = resumo do parágrafo | Resto = details",
                        },
                        {
                          titulo: "3. PULE OS PARÁGRAFOS DO MEIO",
                          descricao: "Não leia tudo entre a 1ª e última sentença. É detalhes de suporte que você pode pular. Se uma pergunta pede detalhes, volta depois.",
                          exemplo: "✓ Pula 5 parágrafos em 15 segundos → volta apenas se pergunta pede",
                        },
                        {
                          titulo: "4. ÚLTIMA SENTENÇA É A CONCLUSÃO",
                          descricao: "Como o autor termina? A conclusão muitas vezes repete ou sintetiza a ideia principal. 'In conclusion, the initiative was successful...' confirma o tema.",
                          exemplo: "✓ Última sentença = como o autor fecha o raciocínio",
                        },
                        {
                          titulo: "5. PROCURE POR NÚMEROS E PALAVRAS-CHAVE",
                          descricao: "Quando você skim, seus olhos naturalmente pegam números (15%, 2023) e palavras em negrito/caps (CRITICAL, IMPORTANT). Use isto — números e destaque indicam informação importante.",
                          exemplo: "✓ '15% increase', 'URGENT', 'deadline' = pega naturalmente ao skim",
                        },
                      ]}
                    />
                  ),
                },
                {
                  titulo: "④ Exceções: Quando Skimming Não É Suficiente",
                  icone: <LuTriangleAlert className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox
                        tipo="warning"
                        titulo="Pegadinha: Skimming para Detail Questions"
                        descricao="Se você skims e depois tenta responder 'When did X happen?', pode não ter visto a informação porque você pulou. Para detail questions, volta ao texto e SCANS pela palavra-chave."
                      />

                      <AlertBox
                        tipo="warning"
                        titulo="Pegadinha: Informação Oculta em Parágrafos Pulados"
                        descricao="Ocasionalmente, uma informação crítica está não na topic sentence, mas no meio do parágrafo. Se uma pergunta não consegue ser respondida com skim, releia o parágrafo completo."
                      />

                      <AlertBox
                        tipo="info"
                        titulo="Estratégia: 2-Fase de Leitura"
                        descricao="FASE 1: Skim o texto inteiro (40s) — entenda a ideia geral. FASE 2: Responda Main Idea questions (30s). FASE 3: Se Detail/Inference/Vocabulary, volta ao texto específico (1-2 min)."
                      />
                    </div>
                  ),
                },
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Qual é o objetivo de Skimming?</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-amber-600">Entender ideia GERAL rapidamente</p>
                    <p>Você lê apenas título + 1ª sentença de cada parágrafo + última sentença = 60 segundos = ideia geral do texto.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Qual é a estrutura ideal para skim?</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-amber-600">Título + 1ª + Pula + Última</p>
                    <p>10s: Título. 10s: 1ª sentença. 15s: 1ª sentença de parágrafos 2-N. 5s: Última sentença. Total: 40s.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Skimming é suficiente para que tipo de pergunta?</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-amber-600">MAIN IDEA QUESTIONS</p>
                    <p>Skimming é perfeito para 'What is the main purpose?' Não é suficiente para Detail ou Inference — volta e releia.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Texto tem 400 palavras, você tem 2 minutos. O que fazer?</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-amber-600">Skim em 60 segundos (30% do tempo)</p>
                    <p>Skim em 1 min → entenda ideia geral → use 1 min restante para responder perguntas ou releia contexto específico.</p>
                  </div>
                }
              />
            </div>
          </section>

          <ModuleConsolidation
            modulo={2}
            corModulo={getModuleVariant(2)}
            onComplete={() => handleModuleComplete("modulo-2")}
          />

          <QuizInterativo
            questions={quizM2}
            modulo={2}
            onComplete={() => handleModuleComplete("modulo-2")}
            onScoreSubmit={() => onUpdateProgress?.({ modulo: 2, tipo: "quiz" })}
          />
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* MODULE 3 — SCANNING */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-3">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            modulo={3}
            titulo="Scanning — Localização Precisa de Informação"
            icone={<LuSearch className="w-8 h-8" />}
            corModulo={getModuleVariant(3)}
            descricao="Procure por palavras-chave e números específicos para responder Detail questions em 15-30 segundos"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              titulo="Técnica de Scanning: Localização Orientada por Palavra-Chave"
              descricao="Scanning é diferente de skimming — você NÃO quer ideia geral, você quer UM DADO ESPECÍFICO"
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Scanning é uma técnica de leitura onde você procura por UMA PALAVRA-CHAVE ou NÚMERO específico no texto, muito rapidamente. Você não lê o texto linearmente — você PROCURA. A diferença entre skimming e scanning é crítica: skimming é "leia o tema geral", scanning é "ache-me este número ou esta palavra". Exemplo: "According to the text, when did the project start?" — Você procura pela palavra "start" ou data no texto. Quando achar, relê a sentença ao redor e extrai a resposta. Tempo: 15-30 segundos.
              </p>

              <p>
                A técnica é simples: (1) Leia a PERGUNTA completa e identifique a PALAVRA-CHAVE, (2) PROCURE aquela palavra no texto (use movimentos dos olhos rápidos, ou Ctrl+F se digital), (3) Quando encontrar, MARQUE aquela sentença/linha, (4) RELEIA a sentença e o contexto ao redor (uma linha antes e uma linha depois), (5) EXTRAI a resposta e valida se responde a pergunta original. Este processo é muito mais rápido que ler tudo palavra-por-palavra. Para um texto de 400 palavras com 4 detail questions, você scan 4 vezes em ~2 minutos total, vs ler tudo em ~8 minutos.
              </p>

              <p>
                Scanning é ESPECIALMENTE útil em textos técnicos porque informação numérica (datas, custos, percentagens, quantidades) é frequentemente o alvo de detail questions. Um texto sobre "Petrobras Rig Maintenance Schedule" pode ter 10 datas diferentes. A pergunta "When was Rig #5 scheduled for maintenance?" exige que você procure "Rig #5" e a data associada. Ler todo o parágrafo sobre cada rig é lento. Scanning pela palavra "Rig #5" é rápido.
              </p>

              <p>
                A limitação crítica de scanning é que ele exige que a PALAVRA-CHAVE apareça no texto. Se a pergunta é "What caused the production delay?" e a palavra "delay" está no texto, você scaneia "delay" e acha a resposta. Mas se a pergunta usa sinônimos ("What was the reason for the slowdown?") e o texto usa "delay", você pode não achar porque procurou pela palavra errada. A solução: se não acha com a primeira palavra-chave, tenta sinônimos (slowdown, reduced output, declined).
              </p>

              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 rounded-lg border border-cyan-200 dark:border-cyan-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Processo de Scanning Passo-a-Passo</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="font-semibold text-cyan-600 dark:text-cyan-400 min-w-fit">Passo 1:</div>
                    <div>Leia a pergunta completamente e identifique a PALAVRA-CHAVE (que é perguntado?)</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="font-semibold text-cyan-600 dark:text-cyan-400 min-w-fit">Passo 2:</div>
                    <div>PROCURE aquela palavra no texto (use olhos rápidos ou Ctrl+F)</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="font-semibold text-cyan-600 dark:text-cyan-400 min-w-fit">Passo 3:</div>
                    <div>Quando achar, MARQUE aquela linha ou parágrafo</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="font-semibold text-cyan-600 dark:text-cyan-400 min-w-fit">Passo 4:</div>
                    <div>RELEIA a sentença completa + 1 sentença antes + 1 depois (contexto)</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="font-semibold text-cyan-600 dark:text-cyan-400 min-w-fit">Passo 5:</div>
                    <div>EXTRAI a resposta e valida se responde a pergunta original</div>
                  </div>
                </div>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "① Conceituação: Scanning vs Leitura Linear",
                  icone: <LuBookOpen className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-base leading-relaxed">
                        Scanning é uma técnica de leitura não-linear. Ao invés de ler da primeira palavra até a última (leitura linear), você PROCURA por uma palavra-chave específica em qualquer lugar do texto. É como usar Ctrl+F em um documento digital — você procura por "2023" e o computador te mostra onde "2023" aparece, sem você ler o resto. Em uma prova física, você pode fazer isto com os olhos — procurar rapidamente pela palavra.
                      </p>

                      <p className="text-base leading-relaxed">
                        A vantagem de scanning é VELOCIDADE. Se você precisa responder "How much money was allocated to the project?" e o texto tem 500 palavras, você não lê 500 palavras. Você procura "money" ou um símbolo de moeda ($, USD), acha a sentença, relê aquela sentença, extrai "$50 million", e responde. Tempo: 20-30 segundos. Leitura linear: 10-15 minutos.
                      </p>

                      <p className="text-base leading-relaxed">
                        <strong>Tipos de Palavras-Chave para Scanning:</strong>
                      </p>

                      <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 space-y-3">
                        <div className="text-sm">
                          <div className="font-semibold">1. NÚMEROS (datas, quantidades, percentagens)</div>
                          <div className="text-xs text-foreground/80">Procura: "2023", "15%", "5 million", "$", "1000"</div>
                        </div>
                        <div className="text-sm">
                          <div className="font-semibold">2. NOMES (pessoas, locais, organizações)</div>
                          <div className="text-xs text-foreground/80">Procura: "Petrobras", "North Field", "John Smith"</div>
                        </div>
                        <div className="text-sm">
                          <div className="font-semibold">3. VERBOS ESPECÍFICOS (ação procurada)</div>
                          <div className="text-xs text-foreground/80">Procura: "completed", "failed", "announced", "decreased"</div>
                        </div>
                        <div className="text-sm">
                          <div className="font-semibold">4. PALAVRAS-CHAVE DA PERGUNTA</div>
                          <div className="text-xs text-foreground/80">Pergunta: "What about safety?" → Procura: "safety"</div>
                        </div>
                      </div>

                      <p className="text-base leading-relaxed">
                        <strong>Quando usar scanning:</strong> Detail questions ("According to...", "When...", "Who...", "What...", "How many..."). Também útil para inferências quando você precisa de contexto específico.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "② Exemplificação: Scanning Prático",
                  icone: <LuPlay className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <div className="bg-foreground/5 rounded-lg p-4 space-y-3">
                        <p className="font-semibold text-sm">EXEMPLO 1: Scanning para Data</p>
                        <p className="text-xs text-foreground/70 italic mb-2">Pergunta: "According to the text, when did the maintenance begin?"</p>
                        <div className="bg-card rounded p-3 text-xs space-y-1 mt-2">
                          <p><strong>Palavra-chave:</strong> "began" OR data (2023, January, etc.)</p>
                          <p><strong>Procura:</strong> Scan o texto por "began" ou um padrão de data (XX/XX, MONTH, ano)</p>
                          <p><strong>Encontra:</strong> "Maintenance began in January 2023"</p>
                          <p><strong>Relê contexto:</strong> Sentença completa: "The facility underwent maintenance in January 2023, which took 3 weeks."</p>
                          <p className="text-green-600 font-semibold mt-2">✓ Resposta: "January 2023"</p>
                        </div>
                      </div>

                      <div className="bg-foreground/5 rounded-lg p-4 space-y-3">
                        <p className="font-semibold text-sm">EXEMPLO 2: Scanning para Número</p>
                        <p className="text-xs text-foreground/70 italic mb-2">Pergunta: "How much did the project cost?"</p>
                        <div className="bg-card rounded p-3 text-xs space-y-1 mt-2">
                          <p><strong>Palavra-chave:</strong> "$" OR "million" OR "cost"</p>
                          <p><strong>Procura:</strong> Scan por símbolo "$" ou "million"</p>
                          <p><strong>Encontra:</strong> "The $50 million project was completed..."</p>
                          <p><strong>Relê contexto:</strong> "The $50 million infrastructure project was completed on schedule."</p>
                          <p className="text-green-600 font-semibold mt-2">✓ Resposta: "$50 million"</p>
                        </div>
                      </div>

                      <div className="bg-foreground/5 rounded-lg p-4 space-y-3">
                        <p className="font-semibold text-sm">EXEMPLO 3: Scanning para Nome</p>
                        <p className="text-xs text-foreground/70 italic mb-2">Pergunta: "Which rig was scheduled for maintenance?"</p>
                        <div className="bg-card rounded p-3 text-xs space-y-1 mt-2">
                          <p><strong>Palavra-chave:</strong> "Rig" + número</p>
                          <p><strong>Procura:</strong> Scan por "Rig #" ou "Rig"</p>
                          <p><strong>Encontra:</strong> "Rig #3 was scheduled in Q4 2024"</p>
                          <p><strong>Relê contexto:</strong> "Rig #3 was scheduled for maintenance in Q4 2024, along with Rig #7."</p>
                          <p className="text-green-600 font-semibold mt-2">✓ Resposta: "Rig #3" (ou possível múltiplos se pergunta pede "which rigs")</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "③ Dicas: Otimize o Scanning",
                  icone: <LuLightbulb className="w-5 h-5" />,
                  conteudo: (
                    <CardCarousel
                      cards={[
                        {
                          titulo: "Procura por Múltiplas Formas da Palavra-Chave",
                          descricao: "Se procura 'start' e não acha, tenta 'began', 'commence', 'initiated'. Sinônimos podem aparecer. Ou procura por data se a pergunta é 'When...'",
                          exemplo: "✓ Pergunta 'When began?' → procura 'began' OU data (2023, Jan, XX/XX)",
                        },
                        {
                          titulo: "Procura por Números e Símbolos",
                          descricao: "Símbolos como $ % # são FÁCEIS de notar ao escanear. Seus olhos naturalmente pegam números entre texto de palavras. Use isto — procura por '2023' é mais rápido que 'year'.",
                          exemplo: "✓ Pergunta 'How much?' → procura '$' ou número grande, não palavra 'money'",
                        },
                        {
                          titulo: "Marque/Sublinhe o Que Achar",
                          descricao: "Quando acha a palavra-chave, marque-a mentally ou (se permite) sublinhe. Isto te ajuda a não perder o lugar quando você volta para contexto.",
                          exemplo: "✓ Encontra '$50 million' → marca essa sentença → relê completo",
                        },
                        {
                          titulo: "Releia Sempre o Contexto Completo",
                          descricao: "Não confie apenas na palavra-chave. A resposta pode exigir contexto. Pergunta 'When?' → encontra a data, mas relê a sentença para validar que é a data certa.",
                          exemplo: "✓ Encontra '2023' mas precisa validar se é a data do início ou fim do projeto",
                        },
                        {
                          titulo: "Se Não Acha na Primeira Tentativa",
                          descricao: "Se procurou a palavra-chave e não aparece, tenta sinônimos ou formas diferentes. Ou a pergunta usa vocabulário diferente do texto (inference, não detail).",
                          exemplo: "✓ 'When started?' → procura 'started' não acha → procura 'began' → encontra",
                        },
                      ]}
                    />
                  ),
                },
                {
                  titulo: "④ Exceções: Quando Scanning Falha",
                  icone: <LuTriangleAlert className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox
                        tipo="danger"
                        titulo="Pegadinha: Palavra-Chave com Múltiplas Menções"
                        descricao="A palavra que você procura pode aparecer 3-4 vezes no texto, em contextos diferentes. Procurar por 'cost' e encontrar a primeira menção pode não ser a resposta — valida que aquela menção responde a pergunta específica."
                      >
                        <ComparisonSide
                          lado1={{ label: "❌ Pegadinha", content: "'cost' aparece 3x: 1) initial cost, 2) maintenance cost, 3) total cost — qual é a correta?" }}
                          lado2={{ label: "✅ Solução", content: "Pergunta 'What was the project cost?' → procura 'project cost' ou valida no contexto qual 'cost' responde" }}
                        />
                      </AlertBox>

                      <AlertBox
                        tipo="danger"
                        titulo="Pegadinha: Sinônimos ao Invés de Palavra-Chave Exata"
                        descricao="Pergunta diz 'When started?' mas o texto diz 'When commenced?' ou 'When began?'. Você procura 'started' e não acha. Tenta 'commenced' ou 'began' — encontra. Prepare-se mentalmente para sinônimos."
                      >
                        <ComparisonSide
                          lado1={{ label: "Pergunta usa", content: "'started' ou 'began' ou 'commenced' — sinônimos" }}
                          lado2={{ label: "Texto pode usar", content: "'began' enquanto pergunta usa 'started' — procura ambas as formas" }}
                        />
                      </AlertBox>

                      <AlertBox
                        tipo="warning"
                        titulo="Pegadinha: Scanning Não Funciona para Inference"
                        descricao="Se a pergunta é 'What does the author imply?' (inference), scanning uma palavra-chave não é suficiente. Você precisa ler o contexto completo e deduzir. Scanning é apenas para Detail questions."
                      />

                      <AlertBox
                        tipo="info"
                        titulo="Dica: Estime Sua Velocidade de Scanning"
                        descricao="Pratique: um texto de 400 palavras, quantas vezes consegue escanear uma palavra-chave? Tipicamente, 3-5 scans (3-5 detail questions) em 1-2 minutos. Isto libera mais tempo para questões difíceis."
                      />
                    </div>
                  ),
                },
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Qual é o objetivo de Scanning?</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-cyan-600">Localizar UM DADO específico rapidamente</p>
                    <p>Procura palavra-chave no texto, encontra, relê contexto, extrai resposta. Tempo: 15-30 segundos.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Que tipo de pergunta exige Scanning?</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-cyan-600">DETAIL QUESTIONS</p>
                    <p>"According to...", "When...", "Who...", "What...", "How much..." — procura a resposta específica.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Você procura por "start" e não acha. O que fazer?</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-cyan-600">Procura por sinônimos</p>
                    <p>Tenta "began", "commenced", "initiated" ou procura por data (2023, Jan, XX/XX).</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Você encontrou a palavra-chave. Próximo passo?</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-cyan-600">Releia o contexto completo</p>
                    <p>Sentença completa + 1 antes + 1 depois. Valida que aquela menção responde a pergunta específica.</p>
                  </div>
                }
              />
            </div>
          </section>

          <ModuleConsolidation
            modulo={3}
            corModulo={getModuleVariant(3)}
            onComplete={() => handleModuleComplete("modulo-3")}
          />

          <QuizInterativo
            questions={quizM3}
            modulo={3}
            onComplete={() => handleModuleComplete("modulo-3")}
            onScoreSubmit={() => onUpdateProgress?.({ modulo: 3, tipo: "quiz" })}
          />
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* MODULE 4 — VOCABULARY IN CONTEXT */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-4">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            modulo={4}
            titulo="Vocabulary in Context — Deduzindo Significado"
            icone={<LuBookOpen className="w-8 h-8" />}
            corModulo={getModuleVariant(4)}
            descricao="Deduza o significado de palavras desconhecidas pela estrutura da frase e pistas contextuais"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              titulo="Como Entender Palavras Desconhecidas Sem Dicionário"
              descricao="CESGRANRIO testa vocabulário não por definição simples, mas por significado em contexto"
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Vocabulary in Context é diferente de memorizar palavras isoladas. A prova não pergunta "O que significa 'mitigate'?" — ela coloca a palavra em uma frase técnica e pergunta qual opção melhor descreve seu significado NAQUELA FRASE. Exemplo: "The new safety protocol mitigates excessive pressure events." — Qual é o significado de "mitigate" aqui? Não é memorização, é DEDUÇÃO pela estrutura.
              </p>

              <p>
                A estratégia é procurar por PISTAS no contexto: (1) Preposições ao redor (in, with, from, by), (2) Verbos vizinhos (helps, prevents, causes, increases), (3) Adjetivos descritivos (excessive, critical, dangerous), (4) Conectores (because, although, as a result). Se a sentença é "The system prevented equipment failure by reducing pressure surges", você não precisa saber "surges" — você deduz que é algo NEGATIVO que precisa ser reduzido. Logo, "surge" = aumento rápido/pico (wave, spike).
              </p>

              <p>
                A pegadinha mais comum é palavras com MÚLTIPLOS significados. "Pressure" pode significar força física, stress mental, ou demanda urgente. Em contexto técnico, é força física. "Run" pode significar executar, correr, ou funcionar. Em "The equipment runs 24/7", é "funcionar". O contexto SEMPRE clarifica qual significado. Você não traduz da forma mais comum — você traduz para o significado que FAZ SENTIDO naquela frase.
              </p>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg border border-purple-200 dark:border-purple-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Sinais de Contexto para Dedução</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="border-l-4 border-purple-500 pl-3">
                    <p className="font-semibold">Preposições</p>
                    <p className="text-xs">in, with, from, by, through indicam relacionamento</p>
                  </div>
                  <div className="border-l-4 border-pink-500 pl-3">
                    <p className="font-semibold">Verbos Vizinhos</p>
                    <p className="text-xs">helps, prevents, increases, reduces indicam efeito</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-3">
                    <p className="font-semibold">Adjetivos</p>
                    <p className="text-xs">excessive, critical, dangerous, positive indicam valor</p>
                  </div>
                  <div className="border-l-4 border-pink-500 pl-3">
                    <p className="font-semibold">Conectores</p>
                    <p className="text-xs">because, although, therefore indicam causa/efeito</p>
                  </div>
                </div>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "① Técnica de Dedução Contextual",
                  icone: <LuBookOpen className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-base leading-relaxed">
                        Quando você encontra uma palavra desconhecida em um texto, NÃO PÂNICO. A maioria das palavras em testes CESGRANRIO pode ser deduzida pelo contexto. Você não precisa conhecer a definição exata — você precisa entender o significado NAQUELA FRASE. O processo é: (1) Leia a sentença completa, (2) Procure por preposições, verbos, adjetivos ao redor, (3) Deduza se a palavra é positiva/negativa/neutra, (4) Deduza se é um verbo/nome/adjetivo, (5) Procure por sinônimos nas opções que FAZ SENTIDO no contexto.
                      </p>

                      <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 space-y-3">
                        <h5 className="font-semibold text-sm">Exemplo Passo-a-Passo:</h5>
                        <p className="text-sm italic text-foreground/80">"The maintenance team worked to MITIGATE the excessive pressure in the system."</p>
                        <div className="text-sm space-y-2">
                          <div><strong>Passo 1:</strong> Você não conhece "mitigate" — leia a sentença completa</div>
                          <div><strong>Passo 2:</strong> Procure pistas:
                            <div className="text-xs ml-4 mt-1">
                              • "worked to" = verbo de ação
                              <br/>
                              • "excessive pressure" = algo ruim/problemático (excessive = demais)
                              <br/>
                              • "mitigate the excessive pressure" = fazer algo COM o pressure
                            </div>
                          </div>
                          <div><strong>Passo 3:</strong> Deduza: mitigate = REDUZIR/ALIVIAR (porque é para resolver excessive pressure)</div>
                          <div><strong>Passo 4:</strong> Valide com opções: "reduce", "prevent", "eliminate" (reduzir faz sentido!)</div>
                        </div>
                      </div>

                      <p className="text-base leading-relaxed">
                        <strong>Atributos a procurar:</strong> (1) É um verbo (ação) ou nome (coisa)? Procure por padrão: verb + mitigate ou the mitigate (name), (2) É positivo ou negativo? Se está ao lado de "excessive" ou "problem", é para resolver, logo é positivo. Se está ao lado de "increase" ou "harm", é negativo, (3) É causa ou efeito? Se precede uma consequência com "therefore" ou "as a result", é causa.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "② Exemplos de Vocabulário Técnico Petrobras",
                  icone: <LuPlay className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4 text-sm">
                      <div className="border-l-4 border-blue-500 pl-4 py-2">
                        <p><strong>Exemplo 1: "The inspection REVEALED significant corrosion"</strong></p>
                        <p className="text-xs text-foreground/80 mt-1">Dedução: revealed = fez conhecido/mostrou (porque inspection encontrou corrosão) = discover, expose</p>
                      </div>
                      <div className="border-l-4 border-cyan-500 pl-4 py-2">
                        <p><strong>Exemplo 2: "Production levels remained STABLE throughout the quarter"</strong></p>
                        <p className="text-xs text-foreground/80 mt-1">Dedução: stable = não mudou/constante (porque "remained" = ficou igual, "throughout" = durante tudo) = constant, unchanged</p>
                      </div>
                      <div className="border-l-4 border-green-500 pl-4 py-2">
                        <p><strong>Exemplo 3: "The company IMPLEMENTED new safety procedures"</strong></p>
                        <p className="text-xs text-foreground/80 mt-1">Dedução: implemented = colocou em prática (porque procedures são novas, implementar significa usar) = adopted, put into effect</p>
                      </div>
                      <div className="border-l-4 border-amber-500 pl-4 py-2">
                        <p><strong>Exemplo 4: "Equipment DETERIORATES without proper maintenance"</strong></p>
                        <p className="text-xs text-foreground/80 mt-1">Dedução: deteriorates = fica pior (porque "without maintenance" = sem cuidado, logo fica ruim) = decays, worsens, degrades</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "③ Dicas Rápidas para Vocabulário",
                  icone: <LuLightbulb className="w-5 h-5" />,
                  conteudo: (
                    <CardCarousel
                      cards={[
                        {
                          titulo: "Procure por Antônimos ou Sinônimos nas Opções",
                          descricao: "Se a palavra está ao lado de 'problem', as opções podem ter 'solve' (sinônimo lógico). Se 'increase', opções têm 'boost', 'rise', 'expand'.",
                          exemplo: "✓ Sentença: 'reduce excessive' → Opções: 'minimize', 'decrease', 'lower' (todos sinônimos de reduzir)",
                        },
                        {
                          titulo: "Palavras Cognatas (Parecidas em Português)",
                          descricao: "'Mitigate' parece 'mitigar'. 'Implement' parece 'implementar'. 'Stabilize' parece 'estabilizar'. Cognatas ajudam, mas cuidado com falsos cognatos!",
                          exemplo: "✓ 'Implement' = implementar (cognato verdadeiro), 'Actual' = atual (falso cognato, significa 'real')",
                        },
                        {
                          titulo: "Ignore a Palavra, Leia o Significado da Frase",
                          descricao: "Se a frase é 'The team MITIGATED the crisis', mesmo sem saber mitigate, você entende que fizeram algo BOM à crise (porque crisis é problema).",
                          exemplo: "✓ 'Team' + 'crisis' = alguém resolveu algo ruim → mitigate = resolver/aliviar",
                        },
                        {
                          titulo: "Múltiplos Significados: Use Contexto Técnico",
                          descricao: "'Run' pode ser correr ou funcionar. Em 'The system runs 24/7', é funcionar. 'Pressure' é força ou stress. Em 'pressure relief valve', é força. Contexto técnico clarifica.",
                          exemplo: "✓ Contexto 'equipment' + 'runs' = funciona (não corre)",
                        },
                      ]}
                    />
                  ),
                },
                {
                  titulo: "④ Pegadinhas: Falsos Cognatos e Armadilhas",
                  icone: <LuTriangleAlert className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox
                        tipo="danger"
                        titulo="Pegadinha: Falso Cognato"
                        descricao="'Actual' não significa 'atual' (current). 'Actual' = real, verdadeiro. 'Sensible' não significa 'sensível' (sensitive). 'Sensible' = razoável, lógico. Falsos cognatos enganam frequentemente."
                      >
                        <ComparisonSide
                          lado1={{ label: "❌ Falso Cognato", content: "'The actual reason was...' = NÃO 'a razão atual' → 'a razão REAL'" }}
                          lado2={{ label: "✅ Correto", content: "'The actual reason' = 'A razão VERDADEIRA/REAL' (não tempo presente)" }}
                        />
                      </AlertBox>

                      <AlertBox
                        tipo="danger"
                        titulo="Pegadinha: Múltiplos Significados da Mesma Palavra"
                        descricao="'Bank' = banco (dinheiro) ou margem (rio). 'Run' = correr ou funcionar. 'Plant' = planta (vegetal) ou fábrica. Em contexto Petrobras, 'plant' = fábrica/refinaria."
                      >
                        <ComparisonSide
                          lado1={{ label: "Significado 1", content: "'Plant' = vegetal (biologia)" }}
                          lado2={{ label: "Significado 2 (Petrobras)", content: "'The plant produces 50,000 barrels daily' = refinaria, não flor!" }}
                        />
                      </AlertBox>

                      <AlertBox
                        tipo="warning"
                        titulo="Pegadinha: Opção que Parece Certa mas Não Faz Sentido"
                        descricao="Uma opção pode ser um sinônimo válido, mas não faz sentido NAQUELA FRASE. 'Reduce excessive pressure' — opções 'minimize', 'destroy', 'eliminate'. Destroy parece certo, mas em contexto, 'minimize' é melhor."
                      />
                    </div>
                  ),
                },
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Deduz significado</p>
                    <p className="text-base">"The repair EXPEDITED the return to service."</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-purple-600">EXPEDITED = Acelerou/Apressou</p>
                    <p>Pistas: "repair" (ação positiva) + "return to service" (resultado bom/rápido) = expedite = acelerar/apressar</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Que significa "leverage"?</p>
                    <p className="text-xs italic text-foreground/70">"The company will LEVERAGE its technology for growth."</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-purple-600">LEVERAGE = Usar/Aproveitar</p>
                    <p>Pistas: "technology" (ferramenta) + "for growth" (resultado positivo) = leverage = usar vantagem</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Palavra COGNATA verdadeira ou falsa?</p>
                    <p className="text-base">"SENSIBLE decision"</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-purple-600">❌ FALSO COGNATO</p>
                    <p>"Sensible" = lógico/razoável (NÃO sensível/emocionado). "Sensible decision" = decisão RACIONAL.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Qual significado em contexto?</p>
                    <p className="text-base">"The manufacturing PLANT produces oil."</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-purple-600">PLANT = Fábrica/Refinaria</p>
                    <p>(NÃO vegetal). Em contexto Petrobras, "plant" = instalação industrial, não flor.</p>
                  </div>
                }
              />
            </div>
          </section>

          <ModuleConsolidation
            modulo={4}
            corModulo={getModuleVariant(4)}
            onComplete={() => handleModuleComplete("modulo-4")}
          />

          <QuizInterativo
            questions={quizM4}
            modulo={4}
            onComplete={() => handleModuleComplete("modulo-4")}
            onScoreSubmit={() => onUpdateProgress?.({ modulo: 4, tipo: "quiz" })}
          />
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* MODULE 5 — PARAGRAPH STRUCTURE */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-5">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            modulo={5}
            titulo="Paragraph Structure — Topic Sentences & Supporting Details"
            icone={<LuClipboardList className="w-8 h-8" />}
            corModulo={getModuleVariant(5)}
            descricao="Identifique a sentença principal de cada parágrafo e os detalhes que a sustentam"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              titulo="Estrutura Padrão: Topic Sentence + Supporting Details"
              descricao="Todo parágrafo em textos técnicos segue padrão: 1ª sentença (tema) + resto (detalhes)"
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Textos técnicos e acadêmicos seguem uma estrutura MUITO previsível: cada parágrafo começa com uma TOPIC SENTENCE (sentença temática) que resume o ponto principal do parágrafo. O resto do parágrafo fornece SUPPORTING DETAILS (exemplos, números, evidência, explicação) que sustentam aquela topic sentence. Quando você entende esta estrutura, você consegue entender 80% de um texto apenas lendo as topic sentences de cada parágrafo — sem ler os detalhes. Isto é o fundamento de skimming.
              </p>

              <p>
                Exemplo: Parágrafo sobre "Pipeline Safety" poderia ser: "The new pipeline safety protocol has three main components. (1) Daily pressure monitoring reduces failure risk by 95%. (2) Automated shutoffs prevent spillage within seconds. (3) Remote sensors alert operators immediately of anomalies." — A topic sentence é "has three main components". O resto são os três componentes (supporting details). Se você só lê a topic sentence, já entende "este parágrafo é sobre três componentes de segurança". Se você precisa de detalhes específicos, você relê aquele componente.
              </p>

              <p>
                Em textos Petrobras, topic sentences frequentemente usam palavras-chave como "three objectives", "two methods", "key findings", "main reasons", "several factors". Quando você vê estas frases, você SABE que o resto do parágrafo será uma lista de X objetivos ou Y métodos. Isto permite que você structure sua leitura: leia a topic sentence, identifique quantos items vão vir, depois scan para cada item conforme a pergunta pede.
              </p>

              <p>
                A pegadinha mais comum é quando a topic sentence NÃO está na primeira posição. Em alguns casos, a topic sentence está no MEIO ou FIM do parágrafo. Você precisa estar alerta para isto. Em textos acadêmicos, a topic sentence é geralmente primeira, mas em narrativa técnica complexa ou respostas argumentativas, pode estar em outro lugar. A dica é procurar pela sentença que RESUME ou SINTETIZA as outras — aquela é a topic sentence, independente de posição.
              </p>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg border border-green-200 dark:border-green-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Padrão de Estrutura de Parágrafo</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="font-semibold text-green-600 dark:text-green-400 min-w-fit">Sentença 1:</div>
                    <div><strong>Topic Sentence</strong> — resume o ponto principal</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="font-semibold text-green-600 dark:text-green-400 min-w-fit">Sentenças 2+:</div>
                    <div><strong>Supporting Details</strong> — exemplos, números, evidência</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="font-semibold text-green-600 dark:text-green-400 min-w-fit">Última Sentença:</div>
                    <div><strong>Transição ou Síntese</strong> — conecta ao próximo parágrafo ou resume</div>
                  </div>
                </div>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "① Topic Sentences: Como Identificar",
                  icone: <LuBookOpen className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-base leading-relaxed">
                        Uma topic sentence é uma sentença que RESUME o ponto principal de um parágrafo. Ela responde à pergunta mental "Qual é o ponto deste parágrafo?" Características: (1) Geralmente é a 1ª ou 2ª sentença do parágrafo, (2) É uma afirmação geral, não um detalhe específico, (3) O resto do parágrafo fornece evidência para sustentá-la, (4) Frequentemente contém palavras como "main", "important", "key", "several", "many", "caused by", "results in".
                      </p>

                      <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 space-y-3">
                        <h5 className="font-semibold text-sm">Exemplo: Parágrafo com Topic Sentence Clara</h5>
                        <p className="text-sm italic text-foreground/80 mb-3">"The equipment failure had three main causes. First, the pressure valve was corroded due to saltwater exposure. Second, maintenance logs showed no inspection in 18 months. Third, the monitoring system was offline during the incident."</p>
                        <div className="text-sm space-y-2">
                          <div className="font-semibold">✓ Topic Sentence:</div>
                          <div className="text-xs text-foreground/80">"The equipment failure had three main causes"</div>
                          <div className="font-semibold">✓ Supporting Details:</div>
                          <div className="text-xs text-foreground/80">
                            • Pressure valve was corroded<br/>
                            • No inspection in 18 months<br/>
                            • Monitoring system was offline
                          </div>
                        </div>
                      </div>

                      <p className="text-base leading-relaxed">
                        <strong>Palavras que indicam Topic Sentence:</strong> "main", "primary", "key", "important", "several", "many", "few", "three causes", "resulted in", "due to", "as a result", "therefore". Quando você vê estas palavras, a topic sentence está próxima.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "② Supporting Details: Como Extrair",
                  icone: <LuPlay className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4 text-sm">
                      <div className="bg-foreground/5 rounded-lg p-4 space-y-3">
                        <p className="font-semibold">EXEMPLO 1: Supporting Details com Números</p>
                        <p className="text-xs text-foreground/70 italic mb-2">Topic: "The project achieved three objectives. (1) Safety improved by 20%. (2) Costs reduced by 15%. (3) Timeline met deadline."</p>
                        <div className="text-xs space-y-1">
                          <p>Topic Sentence: "achieved three objectives"</p>
                          <p>Details: 20% safety, 15% cost, deadline met</p>
                        </div>
                      </div>

                      <div className="bg-foreground/5 rounded-lg p-4 space-y-3">
                        <p className="font-semibold">EXEMPLO 2: Supporting Details com Explicação</p>
                        <p className="text-xs text-foreground/70 italic mb-2">Topic: "Equipment monitoring is critical. Automated sensors detect anomalies within seconds. Operators receive real-time alerts. This prevents catastrophic failures."</p>
                        <div className="text-xs space-y-1">
                          <p>Topic Sentence: "monitoring is critical"</p>
                          <p>Details: sensors detect, operators alerted, prevents failures</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "③ Dicas: Reconheça o Padrão",
                  icone: <LuLightbulb className="w-5 h-5" />,
                  conteudo: (
                    <CardCarousel
                      cards={[
                        {
                          titulo: "Topic Sentence Sempre Vem Primeiro (Usual)",
                          descricao: "90% dos parágrafos em textos técnicos começam com topic sentence. Se 1ª sentença é geral e 2ª+ são específicas, 1ª é o tópico.",
                          exemplo: "✓ 'The protocol has three components. (1)...' — 1ª é topic, resto são detalhes",
                        },
                        {
                          titulo: "Conte os Items Listados",
                          descricao: "Se topic sentence diz 'three main factors', o parágrafo vai listar exatamente 3 factors. Use isto para estruturar sua leitura.",
                          exemplo: "✓ Topic: 'three factors' → Procura (1), (2), (3) ou 'First', 'Second', 'Third'",
                        },
                        {
                          titulo: "Números e Listas Indicam Supporting Details",
                          descricao: "'First...', 'Second...', '(1)...', '(2)...' são sinais claros de details. Cada item sustenta a topic sentence.",
                          exemplo: "✓ Número indica que é um detail, não a topic sentence",
                        },
                        {
                          titulo: "Procure pela Síntese, Não pelo Detalhe",
                          descricao: "Topic sentence é o 'guarda-chuva'. Se a sentença é 'The valve controls pressure by reducing flow', aquela é topic. 'The valve is brass' é detail.",
                          exemplo: "✓ Topic: 'controls pressure' | Detail: 'is brass'",
                        },
                      ]}
                    />
                  ),
                },
                {
                  titulo: "④ Pegadinhas: Topic Sentence Não-óbvia",
                  icone: <LuTriangleAlert className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox
                        tipo="danger"
                        titulo="Pegadinha: Topic Sentence no Meio ou Fim"
                        descricao="Raramente, a topic sentence não é a 1ª sentença. Pode estar no meio (após contexto) ou no fim (após evidência). Procure pela sentença que RESUME as outras."
                      >
                        <ComparisonSide
                          lado1={{ label: "Usual", content: "'The protocol has three components. (1)... (2)... (3)...'" }}
                          lado2={{ label: "Raro", content: "'(1)... (2)... (3)... Therefore, the protocol has three components.'" }}
                        />
                      </AlertBox>

                      <AlertBox
                        tipo="warning"
                        titulo="Pegadinha: Confundir Detail com Topic"
                        descricao="Uma sentença muito específica (número, nome específico, exemplo) é probably um detail, não topic. 'The first valve is brass' é detail. 'The valves control pressure' é mais likely topic."
                      />

                      <AlertBox
                        tipo="info"
                        titulo="Dica: Use Topic Sentences para Skimming"
                        descricao="Para um texto de 4 parágrafos, leia apenas a 1ª sentença de cada = entenda 80% em 1 minuto. Depois volta para detalhes conforme perguntas pedem."
                      />
                    </div>
                  ),
                },
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Qual é a Topic Sentence?</p>
                    <p className="text-xs italic text-foreground/70">"The project had two phases. Phase 1 lasted 6 months. Phase 2 took 4 months."</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✓ "The project had two phases"</p>
                    <p>Resumo geral. O resto são detalhes de cada fase.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Qual é Supporting Detail?</p>
                    <p className="text-xs italic text-foreground/70">"Safety improved significantly. Workers reported fewer incidents. Equipment breakdowns decreased by 40%."</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">✓ "Equipment breakdowns decreased by 40%"</p>
                    <p>Detalhe específico que sustenta a ideia geral "Safety improved".</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Topic Sentence sempre é a 1ª sentença?</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">Geralmente SIM (90%), mas nem sempre</p>
                    <p>Procure pela sentença que RESUME as outras, não necessariamente a primeira.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Como usar Topic Sentences para ganhar tempo?</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">Skim: Leia apenas 1ª sentença de cada parágrafo</p>
                    <p>Entenda 80% em 1 minuto. Volta para detalhes conforme perguntas pedem.</p>
                  </div>
                }
              />
            </div>
          </section>

          <ModuleConsolidation
            modulo={5}
            corModulo={getModuleVariant(5)}
            onComplete={() => handleModuleComplete("modulo-5")}
          />

          <QuizInterativo
            questions={quizM5}
            modulo={5}
            onComplete={() => handleModuleComplete("modulo-5")}
            onScoreSubmit={() => onUpdateProgress?.({ modulo: 5, tipo: "quiz" })}
          />
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* MODULE 6 — REFERENCE WORDS & TEXT COHESION */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-6">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            modulo={6}
            titulo="Reference Words & Text Cohesion"
            icone={<LuBookOpen className="w-8 h-8" />}
            corModulo={getModuleVariant(6)}
            descricao="Identifique o que pronomes e expressões se referem para entender como as frases conectam"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              titulo="Coesão Textual: Como Frases Conectam Logicamente"
              descricao="Pronomes, demonstrativas e expressões definem-se ('hold together') o texto"
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Reference words (pronomes como he, it, they, this, that, the) conectam frases ao referenciarem algo mencionado anteriormente. Exemplo: "The equipment failed. It was corroded." — 'It' refere-se a 'equipment'. Sem entender esta referência, você pensa que 'It' refere-se a outra coisa. A pegadinha mais comum é quando o pronome está distante do antecedente (a palavra que refencia). Você precisa procurar pelo NOUN mais próximo do MESMO GÊNERO E NÚMERO.
              </p>

              <p>
                Regra importante: pronomes precisam combinar em GÊNERO (male/female/neutral) e NÚMERO (singular/plural). "He submitted the report. It was comprehensive." — 'He' é singular, masculino (refere-se a person). 'It' é singular, neutro (refere-se a 'report'). Você não pode dizer "He was submitted" (confundir person com report). Em textos técnicos, maioria dos pronomes é 'it' (equipamentos, não pessoas). "The valve controls the pressure. It prevents overpressure." — 'It' = valve (singular, neutro).
              </p>

              <p>
                Demonstratives (this, that, these, those) também criam referência. 'This' geralmente refere-se a algo RECÉM mencionado (perto). 'That' refere-se a algo mencionado há mais tempo (longe). "The project lasted 18 months. During this period, three incidents occurred. Before that, the facility was incident-free." — 'This period' = os 18 meses. 'That' = o tempo anterior.
              </p>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Tipos de Reference Words</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="border-l-4 border-indigo-500 pl-3">
                    <p className="font-semibold">Pronouns</p>
                    <p className="text-xs">he, she, it, they, who</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-3">
                    <p className="font-semibold">Demonstratives</p>
                    <p className="text-xs">this, that, these, those</p>
                  </div>
                  <div className="border-l-4 border-indigo-500 pl-3">
                    <p className="font-semibold">Definite Articles</p>
                    <p className="text-xs">the (refere-se a coisa específica)</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-3">
                    <p className="font-semibold">Possessives</p>
                    <p className="text-xs">his, her, its, their</p>
                  </div>
                </div>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "① Pronomes: Combinação de Gênero e Número",
                  icone: <LuBookOpen className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-base leading-relaxed">
                        Pronomes substitúem nomes para evitar repetição. "The technician inspected the equipment. He found a leak. The leak was small. He repaired it." — 'He' = technician, 'it' = leak. O desafio é que o pronome pode estar longe do noun original, ou pode haver múltiplos nouns próximos (ambiguidade). Quando você vê um pronome, procure por: (1) Qual noun é mais próximo? (2) Qual noun combina em gênero? (3) Qual noun combina em número (singular/plural)?
                      </p>

                      <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 space-y-3">
                        <h5 className="font-semibold text-sm">Exemplo: Identificando Antecedente</h5>
                        <p className="text-sm italic text-foreground/80 mb-3">"The pressure valve and the flow regulator are critical components. It monitors pressure. It was designed for extreme temperatures."</p>
                        <div className="text-sm space-y-2">
                          <div className="font-semibold">Pergunta: O que 'It' refere?</div>
                          <div className="text-xs text-foreground/80 mt-1">
                            • Valve (singular, neutro) — combina!<br/>
                            • Regulator (singular, neutro) — combina!<br/>
                            • Qual é mais próximo? Regulator (última noun antes de 'It')<br/>
                            • Qual faz SENTIDO? "Regulator monitors pressure" faz sentido<br/>
                            <strong>✓ Resposta: 'It' = regulator</strong>
                          </div>
                        </div>
                      </div>

                      <p className="text-base leading-relaxed">
                        <strong>Regra de Ouro:</strong> o pronome refere-se geralmente ao NOUN MAIS PRÓXIMO que combina em gênero/número, E faz sentido logicamente.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "② Demonstratives & Definite Articles",
                  icone: <LuPlay className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4 text-sm">
                      <div className="bg-foreground/5 rounded-lg p-4 space-y-3">
                        <p className="font-semibold">Demonstratives: This vs That</p>
                        <p className="text-xs text-foreground/70 italic mb-2">"Production increased 15% last year. This achievement demonstrates our progress. Before that, we had stagnation."</p>
                        <div className="text-xs space-y-1">
                          <p>"<strong>This</strong> achievement" = recém mencionado (15% increase)</p>
                          <p>"<strong>That</strong>" = tempo anterior (stagnation period)</p>
                          <p>This = PERTO (recente), That = LONGE (passado)</p>
                        </div>
                      </div>

                      <div className="bg-foreground/5 rounded-lg p-4 space-y-3">
                        <p className="font-semibold">Definite Article: The</p>
                        <p className="text-xs text-foreground/70 italic mb-2">"We reported a leak. The leak was in Sector B."</p>
                        <div className="text-xs space-y-1">
                          <p>"<strong>A</strong> leak" = indefinido (qualquer leak, primeira menção)</p>
                          <p>"<strong>The</strong> leak" = definido (específico leak já mencionado)</p>
                          <p>The = REFERE a algo específico anterior</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "③ Dicas: Identifique Coesão",
                  icone: <LuLightbulb className="w-5 h-5" />,
                  conteudo: (
                    <CardCarousel
                      cards={[
                        {
                          titulo: "Pronome Encontrado: Procure Noun Anterior",
                          descricao: "Quando vê um pronome (he, it, they), olhe para trás para o noun mais próximo que combina em gênero/número.",
                          exemplo: "✓ 'The equipment failed. It was corroded.' → 'It' = equipment",
                        },
                        {
                          titulo: "Gênero e Número Precisam Combinar",
                          descricao: "'The system failed. She was offline.' — ERRADO! Sistema é neutro ('it'), não feminino ('she'). Deve ser 'It was offline.'",
                          exemplo: "✓ He = pessoa (singular, masc) | It = objeto (singular, neutro) | They = plural",
                        },
                        {
                          titulo: "Múltiplos Nouns: Use Lógica",
                          descricao: "Se dois nouns combinam, use contexto para escolher qual faz sentido. 'The valve and regulator... It monitors pressure.' — Qual monitora? Valve (mais common na Petrobras).",
                          exemplo: "✓ Valve monitora → 'It' = valve (não regulator)",
                        },
                        {
                          titulo: "This = Recente, That = Longe",
                          descricao: "'This' refere-se a algo RECÉM mencionado. 'That' a algo do passado distante. 'Production increased. This result shows...' vs 'Before that, we had issues.'",
                          exemplo: "✓ This = agora, That = antes",
                        },
                      ]}
                    />
                  ),
                },
                {
                  titulo: "④ Pegadinhas: Referência Ambígua",
                  icone: <LuTriangleAlert className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox
                        tipo="danger"
                        titulo="Pegadinha: Pronome Distante do Antecedente"
                        descricao="O pronome pode estar 2-3 sentenças depois do noun. Você precisa procurar para trás, às vezes lendo o parágrafo anterior inteiro."
                      >
                        <ComparisonSide
                          lado1={{ label: "Frases separadas", content: "'The pipeline was repaired. The team also inspected the valve. It was corroded.' — O que é 'It'? Valve (última coisa mencionada)" }}
                          lado2={{ label: "Valide por lógica", content: "Se 'It' = pipeline, 'was corroded' não faz sentido (pipeline foi reparado, não corroído). Logo 'It' = valve." }}
                        />
                      </AlertBox>

                      <AlertBox
                        tipo="danger"
                        titulo="Pegadinha: Múltiplos Nouns Masculinos/Neutros"
                        descricao="'The technician and the engineer inspected the system. He identified the problem.' — Qual é 'He'? Pode ser technician OU engineer (ambos masculinos). Use CONTEXTO para escolher."
                      />

                      <AlertBox
                        tipo="warning"
                        titulo="Pegadinha: Referência Implícita"
                        descricao="Às vezes um pronome refere-se não a um noun específico, mas a uma IDEIA inteira: 'Production failed. This was unexpected.' — 'This' refere-se a 'failure', não a 'production'."
                      />
                    </div>
                  ),
                },
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">O que 'It' refere?</p>
                    <p className="text-xs italic">"The regulator was replaced. It was damaged."</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-indigo-600">It = regulator</p>
                    <p>Noun mais próximo, combina em número (singular), faz sentido logicamente.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Qual é o antecedente?</p>
                    <p className="text-xs italic">"The pipeline and valve system was installed. The technician inspected it daily."</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-indigo-600">It = system</p>
                    <p>Não "pipeline" (específico). "System" é o noun geral que technician inspeciona.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">This vs That?</p>
                    <p className="text-xs italic">"Production rose 20%. This result pleased investors. Before that, targets were missed."</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-indigo-600">This = recém mencionado (20% rise)</p>
                    <p>That = passado distante (período anterior quando targets foram missed)</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">A vs The?</p>
                    <p className="text-xs italic">"We found a leak. The leak was small."</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-indigo-600">A = indefinido (primeira vez)</p>
                    <p>The = definido (refere-se a leak específico já mencionado)</p>
                  </div>
                }
              />
            </div>
          </section>

          <ModuleConsolidation
            modulo={6}
            corModulo={getModuleVariant(6)}
            onComplete={() => handleModuleComplete("modulo-6")}
          />

          <QuizInterativo
            questions={quizM6}
            modulo={6}
            onComplete={() => handleModuleComplete("modulo-6")}
            onScoreSubmit={() => onUpdateProgress?.({ modulo: 6, tipo: "quiz" })}
          />
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* MODULE 7 — TONE & AUTHOR'S PURPOSE */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-7">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            modulo={7}
            titulo="Tone & Author's Purpose"
            icone={<LuZap className="w-8 h-8" />}
            corModulo={getModuleVariant(7)}
            descricao="Identifique a atitude do autor (tone) e seu objetivo ao escrever (purpose)"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              titulo="Tone: A 'Voz' do Autor | Purpose: Seu Objetivo"
              descricao="Dois textos com MESMO CONTEÚDO podem ter tones/purposes DIFERENTES"
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Tone é a ATITUDE do autor ao escrever — formal, informal, crítico, neutro, entusiasmado, céptico. Purpose é o OBJETIVO — informar, persuadir, criticar, avisar, explicar. Textos técnicos Petrobras frequentemente têm tone FORMAL/NEUTRO (porque é documentação) e purpose INFORMATIVO (porque está descrevendo processo). Mas um relatório executivo pode ter tone PERSUASIVO (porque quer convincer investidores) e purpose PERSUASIVO (vender a ideia do projeto).
              </p>

              <p>
                Sinais de tone estão nas PALAVRAS ESCOLHIDAS e na ESTRUTURA. Compare: "The project underperformed" vs "The project was a failure" vs "The project fell short of expectations". Mesmo significado (coisa ruim), mas tom diferente. Primeira é NEUTRA (relatório), segunda é CRÍTICA (editorial), terceira é FORMAL (documento oficial). Você identifica tone procurando por adjetivos (excellent, poor, adequate), advérbios (surprisingly, unfortunately, notably), e interjections (!, ?, "...").
              </p>

              <p>
                Purpose é mais fácil de identificar procurando pelo padrão geral. Texto com título "Why This Safety Protocol Works" tem purpose PERSUASIVO (convencer você que funciona). Texto intitulado "Safety Protocol Description" tem purpose INFORMATIVO (só descrever). Texto "The Protocol Had Three Failures" tem purpose CRÍTICO (apontar problemas). A diferença entre tone e purpose: tone é COMO o autor escreve, purpose é POR QUÊ escreve.
              </p>

              <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 rounded-lg border border-red-200 dark:border-red-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Tone vs Purpose</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="border-l-4 border-red-500 pl-3">
                    <p className="font-semibold">TONE (Como?)</p>
                    <p className="text-xs">formal, informal, critico, neutro, otimista, pessimista</p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-3">
                    <p className="font-semibold">PURPOSE (Por quê?)</p>
                    <p className="text-xs">informar, persuadir, criticar, avisar, explicar</p>
                  </div>
                </div>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "① Identificando Tone (Atitude)",
                  icone: <LuBookOpen className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-base leading-relaxed">
                        Tone é a atitude ou "voz" do autor. Procure por pistas: (1) Adjetivos escolhidos (positive vs negative vs neutral), (2) Estrutura das sentenças (curtas/diretas vs longas/complexas), (3) Uso de exclamações (!), (4) Palavras emocionais vs factuais. Exemplo: "The project achieved targets" (NEUTRO) vs "The project brilliantly achieved targets" (ENTUSIASMADO) vs "The project somehow achieved targets" (CÉPTICO, implicando luck ao invés de skill).
                      </p>

                      <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 space-y-3">
                        <h5 className="font-semibold text-sm">Exemplos de Tones Diferentes</h5>
                        <div className="text-sm space-y-3">
                          <div>
                            <p className="font-semibold text-blue-700">FORMAL/NEUTRO:</p>
                            <p className="text-xs text-foreground/80">"The equipment failed due to corrosion." — Factual, sem julgamento</p>
                          </div>
                          <div>
                            <p className="font-semibold text-green-700">ENTUSIASMADO:</p>
                            <p className="text-xs text-foreground/80">"The new protocol brilliantly solved the problem!" — Palavras como "brilliantly", exclamação</p>
                          </div>
                          <div>
                            <p className="font-semibold text-amber-700">CRÍTICO:</p>
                            <p className="text-xs text-foreground/80">"The equipment failed miserably, revealing poor maintenance practices." — Julgamento negativo</p>
                          </div>
                          <div>
                            <p className="font-semibold text-purple-700">CÉPTICO:</p>
                            <p className="text-xs text-foreground/80">"The project allegedly met deadlines, though data suggests otherwise." — Dúvida/desconfiança</p>
                          </div>
                        </div>
                      </div>

                      <p className="text-base leading-relaxed">
                        <strong>Palavras que indicam tone:</strong> Positivas (excellent, brilliant, successful, efficient), Negativas (poor, failure, inadequate, insufficient), Neutras (adequate, sufficient, completed, occurred). Mesmo conteúdo fatorial, tom diferente conforme adjetivo.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "② Identificando Purpose (Objetivo)",
                  icone: <LuPlay className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4 text-sm">
                      <div className="bg-foreground/5 rounded-lg p-4 space-y-3">
                        <p className="font-semibold">Purpose: INFORMATIVO</p>
                        <p className="text-xs text-foreground/70">Objetivo: Descrever fatos, processos, dados</p>
                        <p className="text-xs">Ex: "The protocol includes three steps. (1)... (2)... (3)..."</p>
                      </div>

                      <div className="bg-foreground/5 rounded-lg p-4 space-y-3">
                        <p className="font-semibold">Purpose: PERSUASIVO</p>
                        <p className="text-xs text-foreground/70">Objetivo: Convencer você de algo, mudar opinião</p>
                        <p className="text-xs">Ex: "You MUST adopt this protocol because it prevents 95% of failures."</p>
                      </div>

                      <div className="bg-foreground/5 rounded-lg p-4 space-y-3">
                        <p className="font-semibold">Purpose: CRÍTICO/ARGUMENTATIVO</p>
                        <p className="text-xs text-foreground/70">Objetivo: Apontar problemas, criticar, debater</p>
                        <p className="text-xs">Ex: "The old protocol was ineffective because it allowed 50% failure rate."</p>
                      </div>

                      <div className="bg-foreground/5 rounded-lg p-4 space-y-3">
                        <p className="font-semibold">Purpose: AVISO/PRECAUÇÃO</p>
                        <p className="text-xs text-foreground/70">Objetivo: Alertar para perigos, avisar</p>
                        <p className="text-xs">Ex: "Failure to maintain the system will result in catastrophic consequences."</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "③ Dicas: Reconheça Tone & Purpose",
                  icone: <LuLightbulb className="w-5 h-5" />,
                  conteudo: (
                    <CardCarousel
                      cards={[
                        {
                          titulo: "Procure por Adjetivos Emotivos vs Factuais",
                          descricao: "'Excellent' = tone positivo. 'Inadequate' = tone crítico. 'Sufficient' = tone neutro. Mesma informação (coisa funciona), tom diferente.",
                          exemplo: "✓ Adjetivo = pista de tone",
                        },
                        {
                          titulo: "Título Frequentemente Revela Purpose",
                          descricao: "'Why This Protocol Works' = persuasivo. 'Protocol Description' = informativo. 'Problems with the Protocol' = crítico.",
                          exemplo: "✓ Lê título para adivinhar purpose antes de ler texto",
                        },
                        {
                          titulo: "Tone Pode Ser Indireto (Ironia, Sarcasmo)",
                          descricao: "'The procedure was supposedly efficient' com contexto negativo = SARCASMO (author não acredita). Procure por palavras como 'allegedly', 'supposedly', 'so-called'.",
                          exemplo: "✓ Palavra + contexto contrário = indireto/irónico",
                        },
                        {
                          titulo: "Purpose é Mais Geral que Tone",
                          descricao: "Tone = como cada sentença é escrita. Purpose = objetivo geral do TEXTO INTEIRO. Texto pode ter sentences com tone variado, mas purpose único.",
                          exemplo: "✓ Purpose do texto inteiro = informar. Uma sentença pode ser crítica, mas overall é informativa.",
                        },
                      ]}
                    />
                  ),
                },
                {
                  titulo: "④ Pegadinhas: Tone/Purpose Sutis",
                  icone: <LuTriangleAlert className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox
                        tipo="danger"
                        titulo="Pegadinha: Confundir Tone com Opinion do Autor"
                        descricao="Tone é HOW (como escreve), opinion é WHAT (o que acredita). Um autor pode escrever de forma NEUTRA enquanto exprime opinião crítica: 'The procedure is inefficient.' — Tone neutro, pero opinion é crítica."
                      >
                        <ComparisonSide
                          lado1={{ label: "Tone", content: "FORMAL/NEUTRO (estrutura, adjetivos)" }}
                          lado2={{ label: "Opinion", content: "Crítica (o que o autor acredita)" }}
                        />
                      </AlertBox>

                      <AlertBox
                        tipo="danger"
                        titulo="Pegadinha: Purpose vs Main Idea"
                        descricao="Purpose é POR QUÊ autor escreve. Main Idea é SOBRE O QUÊ. Texto pode ter main idea 'Protocol has three steps' e purpose 'persuadir você adotar'."
                      >
                        <ComparisonSide
                          lado1={{ label: "Main Idea", content: "'The protocol has 3 steps'" }}
                          lado2={{ label: "Purpose", content: "'Persuadir você a adotar o protocol'" }}
                        />
                      </AlertBox>

                      <AlertBox
                        tipo="warning"
                        titulo="Pegadinha: Ironia e Sarcasmo"
                        descricao="'The procedure worked wonderfully — it only caused three explosions.' — Tone parece positivo (wonderfully), pero é IRÓNICO/sarcástico. Context determina true tone."
                      />
                    </div>
                  ),
                },
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Qual é o Tone?</p>
                    <p className="text-xs italic">"The protocol is an outstanding solution that brilliantly prevents failure!"</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-red-600">ENTUSIASMADO/POSITIVO</p>
                    <p>Palavras: outstanding, brilliantly, ! = tone que admira/aprova.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Qual é o Purpose?</p>
                    <p className="text-xs italic">"You MUST adopt this protocol because it prevents 95% of failures."</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-red-600">PERSUASIVO</p>
                    <p>Author quer convencer você com evidência (95%) para agir (adotar).</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Tone Neutro ou Crítico?</p>
                    <p className="text-xs italic">"The equipment failed. The maintenance logs showed no inspection in 18 months."</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-red-600">NEUTRO (com implicação crítica)</p>
                    <p>Palavras factuais, sem adjetivos emotivos. Pero estrutura implica culpa.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Tone Irônico?</p>
                    <p className="text-xs italic">"The procedure worked wonderfully—it only delayed us 6 months."</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-red-600">IRÓNICO/SARCÁSTICO</p>
                    <p>"Wonderfully" parece positivo, pero contexto (6-month delay) revela que é crítico.</p>
                  </div>
                }
              />
            </div>
          </section>

          <ModuleConsolidation
            modulo={7}
            corModulo={getModuleVariant(7)}
            onComplete={() => handleModuleComplete("modulo-7")}
          />

          <QuizInterativo
            questions={quizM7}
            modulo={7}
            onComplete={() => handleModuleComplete("modulo-7")}
            onScoreSubmit={() => onUpdateProgress?.({ modulo: 7, tipo: "quiz" })}
          />
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* MODULE 8 — INFERENCE & IMPLICIT INFORMATION */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-8">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            modulo={8}
            titulo="Inference & Implicit Information"
            icone={<LuLightbulb className="w-8 h-8" />}
            corModulo={getModuleVariant(8)}
            descricao="Deduza o que está implicado mas não dito explicitamente no texto"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              titulo="Inferência: Ler Entre as Linhas"
              descricao="A resposta não aparece palavra-por-palavra, você precisa deduzir a partir de pistas"
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Inferência é uma conclusão lógica derivada de evidência no texto, mas NÃO DITA explicitamente. Exemplo: "The company reported record profits. The CEO announced a raise for all employees." — Isto NÃO diz "profit causou raise", mas você infere isto porque causa-efeito faz sentido lógico. A diferença crítica entre inferência VÁLIDA e ESPECULAÇÃO: inferência é suportada por evidência no texto. Especulação é pura fantasia sem suporte.
              </p>

              <p>
                Sinais de questões de inferência: "What does the author imply?", "It can be inferred that...", "What would the author probably agree with?", "The author suggests that...", "Which statement is most likely true based on the passage?" — Quando vê estas frases, a resposta NÃO está palavra-por-palavra. Você precisa ler o contexto, procurar por PISTAS (causa-efeito, contraste, evidência), e DEDUZIR uma conclusão que o texto suportaria.
              </p>

              <p>
                O processo de inferência é: (1) Leia a pergunta e identifique O QUÊ você precisa inferir, (2) Procure no texto por CONTEXTO relevante (parágrafos ao redor), (3) Procure por SINAIS de causa-efeito (because, therefore, as a result, since, due to), (4) Procure por CONTRASTE (but, however, yet, although), (5) Procure por EVIDÊNCIA que suporta uma conclusão, (6) Deduza uma conclusão que TODA EVIDÊNCIA suportaria, (7) Valide que a conclusão é suportada, não especulativa.
              </p>

              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 rounded-lg border border-cyan-200 dark:border-cyan-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Tipos de Inferência</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="font-semibold text-cyan-600 dark:text-cyan-400 min-w-fit">Causa-Efeito:</div>
                    <div>Se X aconteceu, você infere que Y causou X ou Y resultou de X</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="font-semibold text-cyan-600 dark:text-cyan-400 min-w-fit">Comparação:</div>
                    <div>Se texto compara A e B, você infere diferenças/similaridades não ditas</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="font-semibold text-cyan-600 dark:text-cyan-400 min-w-fit">Propósito:</div>
                    <div>Se autor fez X e mencionou Y, você infere que X foi para alcançar Y</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="font-semibold text-cyan-600 dark:text-cyan-400 min-w-fit">Conclusão:</div>
                    <div>Se evidência A, B, C está presente, você infere conclusão que todas sustentam</div>
                  </div>
                </div>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "① Diferença: Inferência vs Especulação",
                  icone: <LuBookOpen className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-base leading-relaxed">
                        INFERÊNCIA é uma conclusão lógica suportada por evidência no texto. ESPECULAÇÃO é uma ideia que você tem, mas o texto não a suporta. Exemplo: "The company announced a 50% cost reduction." — Você PODE inferir "The company made difficult decisions" (porque cost reduction geralmente exige decisões difíceis). Você NÃO PODE inferir "The CEO is a genius" (porque texto não menciona CEO, inteligência, ou qualidade de decisão — é pura especulação).
                      </p>

                      <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 space-y-3">
                        <h5 className="font-semibold text-sm">Exemplo: Inferência vs Especulação</h5>
                        <p className="text-sm italic text-foreground/80 mb-3">Texto: "Production failed in Sector B due to a valve malfunction. The valve was last inspected 8 months ago."</p>
                        <div className="text-sm space-y-2">
                          <div className="font-semibold text-green-600">✓ INFERÊNCIA VÁLIDA:</div>
                          <div className="text-xs text-foreground/80">"The valve malfunction could have been prevented with more frequent inspections."<br/>
                          (Suportado: 8-month interval é longo para válvulas críticas)</div>
                          <div className="font-semibold text-red-600">❌ ESPECULAÇÃO:</div>
                          <div className="text-xs text-foreground/80">"The technician was lazy and didn't care about safety."<br/>
                          (Não suportado: texto não menciona technician, laziness, ou atitude)</div>
                        </div>
                      </div>

                      <p className="text-base leading-relaxed">
                        <strong>Teste de Validade:</strong> Toda a evidência no texto suporta esta inferência? Se a resposta é SIM, é inferência. Se é TALVEZ ou NÃO, é especulação.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "② Sinais de Causa-Efeito & Contexto",
                  icone: <LuPlay className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4 text-sm">
                      <div className="bg-foreground/5 rounded-lg p-4 space-y-3">
                        <p className="font-semibold">Sinais Linguísticos de Causa-Efeito:</p>
                        <div className="text-xs space-y-1">
                          <div>• <strong>Because, since, due to, caused by</strong> = introduz causa</div>
                          <div>• <strong>Therefore, as a result, consequently, thus</strong> = introduz efeito</div>
                          <div>• <strong>If...then, leads to, results in</strong> = relação causal</div>
                          <div className="mt-2 italic">Exemplo: "Production failed BECAUSE the valve malfunctioned" = causa-efeito claro</div>
                        </div>
                      </div>

                      <div className="bg-foreground/5 rounded-lg p-4 space-y-3">
                        <p className="font-semibold">Inferência de Causa-Efeito (3 Exemplos):</p>
                        <div className="text-xs space-y-2">
                          <div>
                            <strong>Texto:</strong> "The new protocol prevented 95% of failures. Companies adopted it widely."
                            <div className="text-xs text-foreground/70 mt-1">✓ Infer: "The effectiveness of the protocol caused widespread adoption."</div>
                          </div>
                          <div>
                            <strong>Texto:</strong> "Maintenance stopped. Equipment degraded rapidly."
                            <div className="text-xs text-foreground/70 mt-1">✓ Infer: "Lack of maintenance caused rapid degradation."</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "③ Dicas: Faça Inferências Válidas",
                  icone: <LuLightbulb className="w-5 h-5" />,
                  conteudo: (
                    <CardCarousel
                      cards={[
                        {
                          titulo: "Procure por Sinais Linguísticos",
                          descricao: "Because, therefore, as a result, since, due to, consequently = essas palavras frequentemente precedem causa ou efeito. Procura por elas quando faz inferência.",
                          exemplo: "✓ 'Production failed BECAUSE the valve malfunctioned' = causa-efeito óbvio para inferência",
                        },
                        {
                          titulo: "Leia o Contexto Completo (não uma sentença)",
                          descricao: "Uma sentença pode não dar contexto suficiente. Releia 2-3 sentenças ao redor para entender a situação completa antes de inferir.",
                          exemplo: "✓ Não infere baseado em 1 sentença isolada",
                        },
                        {
                          titulo: "Valide com Opções: Qual Opção o Texto Suporta?",
                          descricao: "Quando várias opções parecem razoáveis, procure qual uma é MAIS suportada pelo texto. A melhor resposta é aquela que toda evidência sustenta.",
                          exemplo: "✓ Opção A é suportada? Opção B? Qual é melhor?",
                        },
                        {
                          titulo: "Rejeite Especulação (Sem Suporte Textual)",
                          descricao: "Se sua inferência exigir conhecimento externo ou suposições além do texto, é especulação. Rejeita. Inferência válida é 100% baseada no que está escrito.",
                          exemplo: "❌ 'CEO is smart' — não suportado. ✓ 'Protocol prevents failures' — suportado",
                        },
                      ]}
                    />
                  ),
                },
                {
                  titulo: "④ Pegadinhas: Inferência Inválida",
                  icone: <LuTriangleAlert className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox
                        tipo="danger"
                        titulo="Pegadinha: Over-Inference (Inferir Demais)"
                        descricao="'Company reported profits. CEO announced raise.' — Você pode inferir que lucros causaram raise. Você NÃO pode inferir 'CEO adora funcionários' (over-reach)."
                      >
                        <ComparisonSide
                          lado1={{ label: "✓ Inferência Válida", content: "Lucros causaram raise (causa-efeito suportado)" }}
                          lado2={{ label: "❌ Over-Inference", content: "CEO é generoso (nenhuma evidência, especulação)" }}
                        />
                      </AlertBox>

                      <AlertBox
                        tipo="danger"
                        titulo="Pegadinha: Confundir Implicação com Garantia"
                        descricao="'The protocol prevents 95% of failures.' — Você infere que 'o protocol é efetivo'. Você NÃO pode inferir que '100% de failures são prevenidas' — porque o texto diz 95%, não 100%."
                      >
                        <ComparisonSide
                          lado1={{ label: "✓ Inferência", content: "'Protocol é efetivo' (95% suporta isto)" }}
                          lado2={{ label: "❌ Over-inference", content: "'Protocol é perfeito' (apenas 95%, não 100%)" }}
                        />
                      </AlertBox>

                      <AlertBox
                        tipo="warning"
                        titulo="Pegadinha: Usar Conhecimento Prévio"
                        descricao="Você sabe que valves precisam de manutenção regular. Texto não menciona isto. Você NÃO pode inferir 'valve precisa manutenção' apenas porque você sabe isto — tem que estar no texto."
                      />
                    </div>
                  ),
                },
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">O que você pode inferir?</p>
                    <p className="text-xs italic">"The equipment failed. The last inspection was 18 months ago."</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-cyan-600">Inferência válida:</p>
                    <p>"Manutenção inadequada ou insuficiente causou falha" (18 meses = muito tempo)</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">É Inferência ou Especulação?</p>
                    <p className="text-xs italic">"O técnico é negligente" (texto não menciona técnico)</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-cyan-600">❌ ESPECULAÇÃO</p>
                    <p>Sem evidência sobre técnico ou negligência. Não suportado.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Que implica "Profits increased 50%"?</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-cyan-600">✓ Negócio foi bem-sucedido</p>
                    <p>✓ Decisões gerenciais funcionaram</p>
                    <p>❌ CEO é gênio (over-inference)</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Teste de Validade:</p>
                    <p className="text-xs">"O texto suporta esta inferência?"</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-cyan-600">Se SIM = Inferência Válida</p>
                    <p>Se TALVEZ ou NÃO = Especulação (rejeita)</p>
                  </div>
                }
              />
            </div>
          </section>

          <ModuleConsolidation
            modulo={8}
            corModulo={getModuleVariant(8)}
            onComplete={() => handleModuleComplete("modulo-8")}
          />

          <QuizInterativo
            questions={quizM8}
            modulo={8}
            onComplete={() => handleModuleComplete("modulo-8")}
            onScoreSubmit={() => onUpdateProgress?.({ modulo: 8, tipo: "quiz" })}
          />
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* MODULE 9 — READING COMPREHENSION EM PROVAS CESGRANRIO */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-9">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            modulo={9}
            titulo="Reading Comprehension em Provas CESGRANRIO"
            icone={<LuClipboardList className="w-8 h-8" />}
            corModulo={getModuleVariant(9)}
            descricao="Padrão real de prova: 3-4 textos, 12-20 questões de tipos mistos, 30 minutos"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              titulo="Formato Real de Prova CESGRANRIO"
              descricao="Entenda exatamente o que você vai enfrentar numa prova real Petrobras"
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Uma prova CESGRANRIO típica de leitura em inglês tem: 3-4 TEXTOS (cada um com 200-400 palavras), 12-20 QUESTÕES TOTAIS (3-5 por texto), TEMPO: ~30 minutos (5-8 minutos por texto). Isto significa você DEVE ler e responder 4 questões em ~6 minutos. Se você gasta 10 minutos lendo um texto palavra-por-palavra, você fica sem tempo.
              </p>

              <p>
                Os textos são geralmente: (1) RELATÓRIO TÉCNICO — sobre processo, equipamento, performance, (2) NOTÍCIA — sobre anúncio, projeto, mudança, (3) DESCRIÇÃO DE PROCESSO — passo-a-passo como algo funciona. Todos seguem estrutura clara: introdução (contexto), desenvolvimento (detalhes/corpo), conclusão (síntese/resultado). Todos usam vocabulário técnico moderado (não extremamente difícil, mas exige conhecimento contextual).
              </p>

              <p>
                As questões CESGRANRIO seguem distribuição previsível: 1 MAIN IDEA, 2-3 DETAILS, 1 INFERENCE, 1 VOCABULARY (opcional). Isto significa você pode ANTECIPAR que uma questão será sobre main idea — você sabe ler para isto logo, você não lê a 50% de profundidade.
              </p>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 rounded-lg border border-orange-200 dark:border-orange-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">Padrão Típico de Prova</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="font-semibold text-orange-600 dark:text-orange-400 min-w-fit">Texto 1:</div>
                    <div>~300 palavras | 4 questões | 6 minutos</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="font-semibold text-orange-600 dark:text-orange-400 min-w-fit">Texto 2:</div>
                    <div>~350 palavras | 4 questões | 6 minutos</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="font-semibold text-orange-600 dark:text-orange-400 min-w-fit">Texto 3:</div>
                    <div>~250 palavras | 4 questões | 6 minutos</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="font-semibold text-orange-600 dark:text-orange-400 min-w-fit">Texto 4 (Opcional):</div>
                    <div>~200 palavras | 4 questões | 6 minutos</div>
                  </div>
                </div>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "① Estratégia de Prova: 4 Passos Rápidos",
                  icone: <LuBookOpen className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-base leading-relaxed">
                        Uma estratégia vencedora em prova CESGRANRIO: (1) SKIM o texto (~1 min): leia título + 1ª sentença + última = entenda main idea. (2) LEIA QUESTÕES (~1 min): vire para as questões e leia TODAS 4 de uma vez. Você sabe agora O QUÊ procurar. (3) VOLTA AO TEXTO E RESPONDA (~3 min): volta ao texto, scan para cada resposta, responde as 4. (4) REVISA (~1 min): volta para questões que tem dúvida, valida respostas.
                      </p>

                      <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 space-y-3">
                        <h5 className="font-semibold text-sm">Distribuição de Tempo (6 minutos por texto):</h5>
                        <div className="text-sm space-y-2">
                          <div className="font-semibold text-xs text-blue-700">Passo 1: Skim (~60 segundos)</div>
                          <div className="text-xs text-foreground/80">Lê título + 1ª sentença + última sentença. Objetivo: entender tema geral.</div>
                          <div className="font-semibold text-xs text-blue-700">Passo 2: Lê Questões (~60 segundos)</div>
                          <div className="text-xs text-foreground/80">Vire para as 4 perguntas. Lê cada uma. Identifica O QUÊ procurar (main idea, detail, vocabulary).</div>
                          <div className="font-semibold text-xs text-blue-700">Passo 3: Volta & Responde (~180 segundos)</div>
                          <div className="text-xs text-foreground/80">Volta ao texto. Para cada questão, procura informação (scan para detail, relê contexto para inference). Responde.</div>
                          <div className="font-semibold text-xs text-blue-700">Passo 4: Revisa (~60 segundos)</div>
                          <div className="text-xs text-foreground/80">Se tempo permite, volta para questões duvidosas. Valida respostas.</div>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "② Antecipação: Qual Tipo de Questão?",
                  icone: <LuPlay className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4 text-sm">
                      <div className="bg-foreground/5 rounded-lg p-4 space-y-3">
                        <p className="font-semibold">Texto Típico 1: Production Report</p>
                        <p className="text-xs text-foreground/70">Esperadas questões: 1 main idea, 2 details (números), 1 inference (causa do resultado)</p>
                      </div>

                      <div className="bg-foreground/5 rounded-lg p-4 space-y-3">
                        <p className="font-semibold">Texto Típico 2: Safety Bulletin</p>
                        <p className="text-xs text-foreground/70">Esperadas questões: 1 main idea, 2 details (procedimentos), 1 tone/purpose (é informativo ou persuasivo?)</p>
                      </div>

                      <div className="bg-foreground/5 rounded-lg p-4 space-y-3">
                        <p className="font-semibold">Texto Típico 3: Equipment Description</p>
                        <p className="text-xs text-foreground/70">Esperadas questões: 1 main idea, 1-2 details (função), 1 vocabulary (o que significa X?), 1 inference (propósito)</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "③ Dicas: Maximize Sua Performance",
                  icone: <LuLightbulb className="w-5 h-5" />,
                  conteudo: (
                    <CardCarousel
                      cards={[
                        {
                          titulo: "Skim Primeiro (60 segundos)",
                          descricao: "NÃO leia o texto inteiro logo. Skim: título + 1ª sentença + última = entenda tema. Isto orienta sua leitura posterior.",
                          exemplo: "✓ 60s skim → 5min responder = mais rápido que 3min ler tudo + 3min responder",
                        },
                        {
                          titulo: "Leia as Questões ANTES de Reler o Texto",
                          descricao: "Depois de skim, vire para as 4 questões. Lê cada uma. Agora você sabe O QUÊ procurar quando volta ao texto.",
                          exemplo: "✓ Sabe procurar '1990' se pergunta é 'When?' | Sabe procurar cause-efeito se pergunta é 'What implies?'",
                        },
                        {
                          titulo: "Scan, Não Leia Tudo de Novo",
                          descricao: "Você já skimmed. Agora volte AO TEXTO e SCAN para cada resposta. Procura palavra-chave, encontra, relê contexto, valida. Não releia tudo de novo.",
                          exemplo: "✓ Pergunta 'According to text, when did X happen?' → Procura 'X' → encontra data → responde",
                        },
                        {
                          titulo: "Prioridade: Main Idea > Detail > Vocabulary > Inference",
                          descricao: "Se tempo é curto, responde main idea primeiro (mais rápido). Details depois (scan, ~30s cada). Vocabulary (contexto, ~20s). Inference último (mais lento, ~60s).",
                          exemplo: "✓ 30s main idea + 90s details + 20s vocabulary = 140s = 2 min para 4 questões",
                        },
                      ]}
                    />
                  ),
                },
                {
                  titulo: "④ Armadilhas Comuns em Prova Real",
                  icone: <LuTriangleAlert className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox
                        tipo="danger"
                        titulo="Armadilha: Gastar 10 minutos em 1 Texto"
                        descricao="Você fica obsesso com entender cada detalhe de um texto. Resultado: fica sem tempo para os outros 3. Lembre: você NÃO precisa 100% compreensão, apenas respostas às questões."
                      />

                      <AlertBox
                        tipo="danger"
                        titulo="Armadilha: Distrator que Parece Certo"
                        descricao="Uma opção é tecnicamente verdadeira, mas não responde a pergunta específica. Ou é um detalhe quando a pergunta pede main idea. Leia a pergunta e valida que a opção responde AQUELA pergunta."
                      />

                      <AlertBox
                        tipo="warning"
                        titulo="Armadilha: Confundir Tipo de Questão"
                        descricao="Pergunta é sobre main idea, você responde um detail. Ou pergunta pede inference, você dá um fato. Leia a pergunta com cuidado. Identifique o tipo ANTES de responder."
                      />

                      <AlertBox
                        tipo="info"
                        titulo="Dica: Elimine Opções Óbvias"
                        descricao="Se 2-3 opções são claramente erradas, elimina. Fica com 2-3 remanescentes. Escolhe a melhor. Processo de eliminação economiza tempo."
                      />
                    </div>
                  ),
                },
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Quanto tempo skim?</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-orange-600">~60 segundos por texto</p>
                    <p>Título + 1ª sentença + última = entenda tema geral. Não leia tudo ainda.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Próximo passo depois de skim?</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-orange-600">Leia as 4 questões</p>
                    <p>Antes de reler o texto inteiro. Saiba O QUÊ procurar antes de procurar.</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Qual ordem de prioridade?</p>
                    <p className="text-xs">Se tempo é curto, qual tipo responde primeiro?</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-orange-600">Main Idea &gt; Detail &gt; Vocabulary &gt; Inference</p>
                    <p>Main idea é mais rápido (~30s). Inference é mais lento (~60s).</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Você tem 6 minutos por texto. Distribuição?</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-orange-600">1min skim + 1min lê questões + 3min responde + 1min revisa</p>
                    <p>Tempo total = 6 min para 1 texto. Para 4 textos = 24 min (sobra 6min buffer).</p>
                  </div>
                }
              />
            </div>
          </section>

          <ModuleConsolidation
            modulo={9}
            corModulo={getModuleVariant(9)}
            onComplete={() => handleModuleComplete("modulo-9")}
          />

          <QuizInterativo
            questions={quizM9}
            modulo={9}
            onComplete={() => handleModuleComplete("modulo-9")}
            onScoreSubmit={() => onUpdateProgress?.({ modulo: 9, tipo: "quiz" })}
          />
        </div>
      </TabsContent>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* MODULE 10 — SIMULADO MESTRE (FINAL) */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <TabsContent value="modulo-10">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            modulo={10}
            titulo="Simulado Mestre — Consolidação Final"
            icone={<LuGraduationCap className="w-8 h-8" />}
            corModulo={getModuleVariant(10)}
            descricao="Teste suas 8 estratégias em um simulado realista com 2 textos completos e 8 questões"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              titulo="Os 8 Passos Integrados para Leitura Dominante"
              descricao="Você aprendeu 8 estratégias. Agora integre tudo num pipeline único"
            />

            <div className="space-y-6 text-base text-foreground/85 leading-relaxed">
              <p>
                Você dominou 8 estratégias: (1) Decoding question types, (2) Skimming, (3) Scanning, (4) Vocabulary in context, (5) Paragraph structure, (6) Reference words, (7) Tone & purpose, (8) Inference. Agora você precisa INTEGRAR todas numa rotina automática. Quando você vê um texto novo em prova, você não pensa "qual estratégia uso?" — você AUTOMATICAMENTE skim → read questions → scan para answers → inference where needed.
              </p>

              <p>
                Este módulo é seu SIMULADO MESTRE. Você vai ler 2 textos técnicos Petrobras (reais, parafraseados) e responder 8 questões (mix de tipos). Isto é o MAIS PRÓXIMO de uma prova real sem ser a prova real. Tempo limite: 12 minutos (6 minutos por texto). Objectivo: respostas certas, rápido.
              </p>

              <p>
                Depois de completar este módulo, você terá: (1) Demonstrado que consegue integrar 8 estratégias, (2) Praticado under time pressure (realismo de prova), (3) Ganhado confiança de que consegue 40-50% de reading comprehension em prova real. Este é o PONTO DE PARTIDA para sua confiança em leitura em inglês.
              </p>

              <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30 rounded-lg border border-green-200 dark:border-green-800 p-6 space-y-4">
                <h4 className="font-bold text-foreground">O Pipeline de 5 Passos (Automático)</h4>
                <div className="space-y-3 text-sm">
                  <TimelineItem
                    numero={1}
                    titulo="SKIM (60 segundos)"
                    descricao="Lê título + 1ª sentença + última. Entende tema geral e estrutura."
                  />
                  <TimelineItem
                    numero={2}
                    titulo="LÊ QUESTÕES (60 segundos)"
                    descricao="Identifica tipos de questão. Sabe O QUÊ procurar (main idea, detail, etc)."
                  />
                  <TimelineItem
                    numero={3}
                    titulo="SCAN + RELEIA CONTEXTO (180 segundos)"
                    descricao="Para Detail: procura palavra-chave. Para Inference: relê contexto. Para Main Idea: valida com skim."
                  />
                  <TimelineItem
                    numero={4}
                    titulo="DEDUZ SIGNIFICADO (Inline)"
                    descricao="Para Vocabulary: deduz por contexto (pré-posições, verbos, adjetivos). Para Tone: procura adjetivos."
                  />
                  <TimelineItem
                    numero={5}
                    titulo="RESPONDE + ELIMINA (30 segundos/questão)"
                    descricao="Marca a opção. Se dúvida, usa processo de eliminação. Avança."
                  />
                </div>
              </div>
            </div>

            <ContentAccordion
              slides={[
                {
                  titulo: "① Tabela de Referência: 8 Estratégias Rápidas",
                  icone: <LuBookOpen className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4 text-sm">
                      <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 space-y-3">
                        <h5 className="font-semibold text-sm mb-3">Cheat Sheet: Qual Estratégia Usar Quando?</h5>
                        <div className="space-y-2">
                          <div><strong>Pergunta 'Main idea'?</strong> → Skim (título + 1ª/última) = 30 seg</div>
                          <div><strong>Pergunta 'According to text' (Detail)?</strong> → Scan palavra-chave = 30 seg</div>
                          <div><strong>Pergunta 'What does author imply'?</strong> → Lê contexto + causa-efeito = 60 seg</div>
                          <div><strong>Pergunta 'What does X mean'?</strong> → Contexto: preposições/verbos/adjetivos = 20 seg</div>
                          <div><strong>Pergunta 'What is the tone'?</strong> → Procura adjetivos emocionais = 30 seg</div>
                          <div><strong>Pergunta 'Topic sentence of paragraph'?</strong> → 1ª sentença = 10 seg</div>
                          <div><strong>Pergunta 'What does pronoun refer to'?</strong> → Procura noun anterior (gênero/número) = 20 seg</div>
                          <div><strong>Pergunta 'What can be inferred'?</strong> → Contexto + validação = 60 seg</div>
                        </div>
                      </div>

                      <div className="bg-amber-50 dark:bg-amber-950/20 rounded-lg p-4 space-y-2 mt-4">
                        <h5 className="font-semibold text-sm">Tempo Total para 4 Questões:</h5>
                        <div className="text-xs">30+30+60+20 = 140 segundos = ~2.5 minutos. Dentro do orçamento de 6 min/texto!</div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "② Checklist Final: Antes de Prova Real",
                  icone: <LuPlay className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4 text-sm">
                      <div className="bg-foreground/5 rounded-lg p-4 space-y-2">
                        <p className="font-semibold">✓ Você consegue...</p>
                        <div className="text-xs space-y-1">
                          <div>□ Identificar tipos de questão (main idea, detail, inference, vocabulary, tone)?</div>
                          <div>□ Skim um texto de 300 palavras em 60 segundos?</div>
                          <div>□ Scan para uma palavra-chave em 30 segundos?</div>
                          <div>□ Deduzir significado de palavra por contexto?</div>
                          <div>□ Identificar topic sentence de parágrafo?</div>
                          <div>□ Resolver referência de pronome (o que 'it' refere)?</div>
                          <div>□ Identificar tone do texto (formal, crítico, neutro)?</div>
                          <div>□ Fazer inferência válida (suportada pelo texto)?</div>
                          <div>□ Completar 4 questões em 6 minutos?</div>
                          <div>□ Eliminar opções obviamente erradas?</div>
                        </div>
                      </div>

                      <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4 space-y-2 mt-4">
                        <p className="font-semibold text-sm">Se respondeu SIM a 8+: Você está PRONTO!</p>
                        <p className="text-xs">Você domina reading comprehension. 40-50% de questões de inglês são suas!</p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "③ Dicas Finais de Prova",
                  icone: <LuLightbulb className="w-5 h-5" />,
                  conteudo: (
                    <CardCarousel
                      cards={[
                        {
                          titulo: "1. Skim TODA prova antes de começar",
                          descricao: "Se tiver 3 textos, skim os 3 em 3 minutos. Isto dá visão geral. Depois volta e responde detalhes.",
                          exemplo: "✓ 3 min skim todos os 3 textos. Depois 27 min responder detalhes = melhor distribuição",
                        },
                        {
                          titulo: "2. Não releia o mesmo trecho 3x",
                          descricao: "Se você já leu um parágrafo 2x, a 3ª leitura não vai ajudar. Avança para outra questão e volta depois.",
                          exemplo: "✓ Ler 2x = entender. Ler 3x+ = desperdício de tempo",
                        },
                        {
                          titulo: "3. Adivinha se necessário (com lógica)",
                          descricao: "Se não tem tempo, não deixa questão em branco. Elimina 2 opções óbvias, escolhe melhor das 3 restantes.",
                          exemplo: "✓ Adivinhação com eliminação = 50% chance. Deixar em branco = 0% chance",
                        },
                        {
                          titulo: "4. Se está travado, pula e volta",
                          descricao: "Uma questão muito difícil? Pula. Faz as outras 3 primeiro. Volta para a difícil se tempo permite. Não gasta 3 minutos em 1 questão quando tem 3 outras rápidas.",
                          exemplo: "✓ Faz 3 rápidas em 2 min. Volta para 1 difícil com 4 min restantes",
                        },
                      ]}
                    />
                  ),
                },
                {
                  titulo: "④ Sucesso: Você é MESTRE em Reading Comprehension!",
                  icone: <LuCircleCheck className="w-5 h-5" />,
                  conteudo: (
                    <div className="space-y-4">
                      <AlertBox
                        tipo="success"
                        titulo="Você Completou o Upgrade de Reading Comprehension!"
                        descricao="Você aprendeu 8 estratégias de leitura que cobrem 100% dos padrões de questão CESGRANRIO. Você praticou com contextos Petrobras reais. Você completou um simulado mestre."
                      >
                        Isto significa: **Você está pronto para ganhar 40-50% das questões de inglês em prova real, apenas dominando compreensão de leitura (faltam ainda gramática, expressões, listening, mas leitura você domina).**
                      </AlertBox>

                      <div className="bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-950/50 dark:to-teal-950/50 rounded-lg p-6 border-2 border-green-500 dark:border-green-400 space-y-3">
                        <p className="text-center font-bold text-lg">🏆 ESPECIALISTA EM READING COMPREHENSION 🏆</p>
                        <p className="text-sm text-center">Você domina todas as 8 estratégias e consegue ler textos técnicos com confiança.</p>
                        <div className="text-xs space-y-1 mt-4">
                          <p>✅ Decoding Question Types — você identifica se é main idea, detail ou inference</p>
                          <p>✅ Skimming — você entende textos em 60 segundos</p>
                          <p>✅ Scanning — você localiza informação específica rapidamente</p>
                          <p>✅ Vocabulary in Context — você deduz significados desconhecidos</p>
                          <p>✅ Paragraph Structure — você encontra topic sentences e detalhes</p>
                          <p>✅ Reference Words — você resolve pronomes e coesão textual</p>
                          <p>✅ Tone & Purpose — você identifica atitude e objetivo do autor</p>
                          <p>✅ Inference — você faz deduções lógicas suportadas</p>
                        </div>
                      </div>

                      <AlertBox
                        tipo="info"
                        titulo="Próximos Passos (Opcional)"
                        descricao="Se ainda faltam gramática ou expressões para sua prova, complete os outros módulos de Inglês. Mas para LEITURA, você já é mestre!"
                      />
                    </div>
                  ),
                },
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Quantas estratégias você aprendeu?</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">8 Estratégias Comprovadas</p>
                    <p>Decoding, Skimming, Scanning, Vocabulary, Structure, Reference, Tone, Inference</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Qual é seu ganho esperado em prova?</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">40-50% de reading comprehension</p>
                    <p>40-50% das questões de inglês são leitura. Você domina isto agora!</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Pipeline automático em prova?</p>
                    <p className="text-xs">Qual ordem?</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">Skim → Questões → Scan → Responde</p>
                    <p>60s + 60s + 180s + 30s = 330s = ~5.5 min por texto. Pronto!</p>
                  </div>
                }
              />

              <FlipCard
                frente={
                  <div className="space-y-3">
                    <p className="font-semibold text-sm">Sua próxima ação?</p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-green-600">Praticar com textos reais!</p>
                    <p>Pegue provas CESGRANRIO antigas e pratique com o pipeline que aprendeu.</p>
                  </div>
                }
              />
            </div>
          </section>

          <ModuleConsolidation
            modulo={10}
            corModulo={getModuleVariant(10)}
            onComplete={() => handleModuleComplete("modulo-10")}
          />

          <QuizInterativo
            questions={quizFinal}
            modulo={10}
            onComplete={() => handleModuleComplete("modulo-10")}
            onScoreSubmit={() => onUpdateProgress?.({ modulo: 10, tipo: "quiz" })}
          />
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
