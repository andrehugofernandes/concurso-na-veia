"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import {
  ModuleConsolidation,
  AlertBox,
  QuizInterativo,
  ModuleBanner,
  getRandomQuestions,
  AulaProps,
  ContentAccordion,
  LessonTabs,
  AulaTemplate,
  ModuleSectionHeader,
  FlipCard,
  CardCarousel,
  Comparison,
  ComparisonSide,
  TimelineItem,
  RichIntro,
} from "../shared";
import { getModuleVariant } from "@/lib/moduleColors";
import { LuBookOpen, LuMusic, LuSearch, LuEye, LuFastForward, LuGlobe, LuShieldCheck, LuTriangle, LuZap, LuForward, LuFlaskConical, LuSettings, LuHardHat, LuWind, LuDroplets, LuCheck, LuCircle, LuTrophy, LuLayers, LuActivity } from "react-icons/lu";
import {
  QUIZ_M1_PREDICTION,
  QUIZ_M2_SKIMMING,
  QUIZ_M3_SCANNING,
  QUIZ_M4_VOCABULARY,
  QUIZ_M5_INFERENCING,
  QUIZ_M6_MAIN_IDEA,
  QUIZ_M7_TONE,
  QUIZ_M8_STRUCTURE,
  QUIZ_M9_PETROBRAS,
  QUIZ_M10_SIMULADO_MESTRE,
} from "./data/reading-strategies-quizzes";

export default function AulaReadingStrategies({
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

  const [quizPrediction] = useState(() => getRandomQuestions(QUIZ_M1_PREDICTION, 8));
  const [quizSkimming] = useState(() => getRandomQuestions(QUIZ_M2_SKIMMING, 8));
  const [quizScanning] = useState(() => getRandomQuestions(QUIZ_M3_SCANNING, 8));
  const [quizVocabulary] = useState(() => getRandomQuestions(QUIZ_M4_VOCABULARY, 8));
  const [quizInferencing] = useState(() => getRandomQuestions(QUIZ_M5_INFERENCING, 8));
  const [quizMainIdea] = useState(() => getRandomQuestions(QUIZ_M6_MAIN_IDEA, 8));
  const [quizTone] = useState(() => getRandomQuestions(QUIZ_M7_TONE, 8));
  const [quizStructure] = useState(() => getRandomQuestions(QUIZ_M8_STRUCTURE, 8));
  const [quizPetrobras] = useState(() => getRandomQuestions(QUIZ_M9_PETROBRAS, 8));
  const [quizSimuladoMestre] = useState(() => getRandomQuestions(QUIZ_M10_SIMULADO_MESTRE, 10));

  const isModuleUnlocked = (index: number) => true;

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) {
      setCompletedModules((prev) => {
        const n = new Set(prev);
        n.add(moduleId);
        return n;
      });
      const idx = ["modulo-1", "modulo-2", "modulo-3", "modulo-4", "modulo-5", "modulo-6", "modulo-7", "modulo-8", "modulo-9", "modulo-10"].findIndex((m) => m === moduleId);
      const pct = Math.round(((idx + 1) / 10) * 100);
      onUpdateProgress?.(pct);
      if (idx < 9) setTimeout(() => setActiveTab(`modulo-${idx + 2}`), 1500);
    }
  };

  useEffect(() => {
    if (currentProgress && currentProgress > 0) {
      const count = Math.floor((currentProgress / 100) * 10);
      const s = new Set<string>();
      for (let i = 1; i <= count; i++) s.add(`modulo-${i}`);
      setCompletedModules(s);
    }
  }, [currentProgress]);

  const MODULE_DEFS = [
    { id: "modulo-1", label: "Módulo 1", title: "Prediction & Context" },
    { id: "modulo-2", label: "Módulo 2", title: "Skimming (The Gist)" },
    { id: "modulo-3", label: "Módulo 3", title: "Scanning (The Details)" },
    { id: "modulo-4", label: "Módulo 4", title: "Vocabulary & Cognates" },
    { id: "modulo-5", label: "Módulo 5", title: "Inferencing from Context" },
    { id: "modulo-6", label: "Módulo 6", title: "Main Idea & Details" },
    { id: "modulo-7", label: "Módulo 7", title: "Critical Reading & Tone" },
    { id: "modulo-8", label: "Módulo 8", title: "Text Structure" },
    { id: "modulo-9", label: "Módulo 9", title: "Petrobras Context" },
    { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
  ];

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
      isCompleted={isCompleted}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
      currentProgress={currentProgress}
      onComplete={onComplete}
      loading={loading}
      xpGanho={xpGanho}
    >
      {/* ═══ MÓDULO 1: PREDICTION & CONTEXT ═══ */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        {/* Banner Petro-Lingo Bonus */}
        <AlertBox 
          tipo="success" 
          titulo="🚀 PETRO-LINGO LIBERADO!" 
          className="bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/20 border-2"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 p-2">
            <div className="flex-1 space-y-3 text-center md:text-left">
              <h4 className="text-emerald-700 dark:text-emerald-400 font-black text-xl tracking-tight">
                Pratique a construção de frases técnicas agora!
              </h4>
              <p className="text-sm text-foreground/80 font-medium max-w-lg">
                Seu novo modo gamificado focado no padrão Cesgranrio. Treine conectores, voz passiva e vocabulário industrial enquanto constrói frases reais.
              </p>
              <div className="pt-2">
                <Link href="/aulas/ingles/petrolingo">
                  <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl px-8 h-14 shadow-lg shadow-emerald-500/20 flex items-center gap-3 group transition-all hover:scale-105 active:scale-95">
                    <LuZap className="w-5 h-5 fill-white group-hover:animate-bounce" />
                    ACESSAR PETRO-LINGO
                  </Button>
                </Link>
              </div>
            </div>
            <div className="w-28 h-28 relative hidden lg:block select-none rotate-6">
              <div className="absolute inset-0 bg-emerald-400/30 rounded-full blur-2xl animate-pulse" />
              <div className="relative w-full h-full rounded-[2rem] bg-emerald-500 border-4 border-white dark:border-slate-800 flex items-center justify-center text-4xl shadow-2xl flex-col gap-1">
                <LuTrophy className="text-white w-12 h-12" />
                <span className="text-[10px] font-black text-emerald-950 uppercase tracking-widest">Premium</span>
              </div>
            </div>
          </div>
        </AlertBox>

        <ModuleBanner
          numero={1}
          titulo="PREDICTION & CONTEXT"
          descricao="O primeiro contato com o texto técnico: como antecipar o conteúdo e ativar o seu conhecimento de mundo."
          gradiente="bg-gradient-to-br from-amber-300 via-amber-500 to-amber-400"
          variant={getModuleVariant(1)}
        />

        <RichIntro>
          <p>
            A leitura de um texto técnico em inglês, especialmente no contexto altamente especializado da **Indústria de Óleo e Gás**, não começa com a decifração da primeira palavra da primeira frase. Ela começa muito antes, com a ativação estratégica do seu **Schema** (conhecimento prévio) e a análise do ambiente tipográfico que envolve o texto.
          </p>
          <p>
            Imagine-se diante de um relatório anual da Petrobras ou de um artigo especializado da ANP (Agência Nacional do Petróleo). Antes de ler o primeiro substantivo, seu cérebro já deve estar processando: "Este é um texto sobre exploração em águas ultraprofundas?", "Quais são as siglas recorrentes neste setor?" ou "Como o contexto global de transição energética (Energy Transition) influencia os termos usados aqui?". Esta é a essência da **Prediction**.
          </p>
          <p>
            Para a **Cesgranrio**, a habilidade de "ler sem ler tudo" é o que separa os candidatos aprovados dos que perdem tempo precioso. A banca frequentemente foca em sua capacidade de identificar o tópico central (Main Topic) através de elementos não-lineares, como títulos, subtítulos (subheadings), logos de empresas e referências bibliográficas. Se a fonte indica um portal de notícias econômicas como a *Bloomberg* ou o *The Economist*, você já preverá um vocabulário focado em **Upstream costs**, **Shareholder value** e **Market trends**.
          </p>
          <p>
            Além disso, a antecipação permite desarmar armadilhas de vocabulário. Quando você sabe que o texto trata de geologia e perfuração, a palavra *"Well"* deixa de ser o "Bem" (advérbio) para se tornar "Poço" (substantivo técnico). A predição não é um "chute", mas uma **inferência baseada em dados observáveis**, agindo como o GPS que guia seu olhar para os pontos de maior densidade informativa do texto.
          </p>
          <p>
            Neste módulo, aprenderemos a dominar as trilhas tipográficas — negritos, itálicos, notas de rodapé e imagens — como ferramentas de aceleração. Veremos como o uso de **Cognatos** (palavras parecidas com o português) pode ser seu maior aliado se você souber filtrar o contexto, e como evitar os **False Friends** que a Cesgranrio adora plantar nos enunciados para confundir o candidato que não fez uma predição adequada do tema.
          </p>
        </RichIntro>
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="A Arte da Predição (Pre-Reading)"
              description="Transformando um texto desconhecido em território familiar em 30 segundos."
              variant={getModuleVariant(1)}
              className="mb-6"
            />
            
            <ContentAccordion
              titulo="Deep Dive: O Método Prediction"
              icone="🔮"
              corIndicador="bg-blue-500"
              slides={[
                {
                  titulo: "O que é Prediction?",
                  icone: "🧠",
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-lg leading-relaxed">
                        A **Predição** é a inferência baseada em dados observáveis. No Inglês Instrumental, ela serve como o "GPS" da sua leitura. Ao olhar para o título, as imagens e a fonte, seu cérebro já começa a "baixar" os arquivos de conhecimento relacionados.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/10">
                            <h6 className="font-bold text-blue-600">Schema (Conhecimento Prévio)</h6>
                            <p className="text-xs opacity-80 leading-relaxed italic">
                              "Se o texto é sobre 'Pre-salt', você já ativa conceitos de geologia, exploração offshore e recordes de produção da Petrobras."
                            </p>
                         </div>
                         <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/10">
                            <h6 className="font-bold text-indigo-600">Pistas Tipográficas</h6>
                            <p className="text-xs opacity-80 leading-relaxed italic">
                              "Negritos, itálicos, imagens e siglas (OPEC, ANP, ESG) organizam o texto hierarquicamente antes mesmo da primeira frase ser lida."
                            </p>
                         </div>
                      </div>
                    </div>
                  )
                },
                {
                  titulo: "Checklist: Os 5 Pilares da Antecipação",
                  icone: "🏗️",
                  conteudo: (
                    <div className="space-y-4">
                       <TimelineItem passo={1} titulo="Fonte e Data" descricao="Relatórios técnicos vs. Notícias de jornal." />
                       <TimelineItem passo={2} titulo="Título Principal" descricao="Identifique o 'Main Topic' e o sujeito central." />
                       <TimelineItem passo={3} titulo="Imagens e Legendas" descricao="Gráficos mostram tendências e dados comparativos." />
                       <TimelineItem passo={4} titulo="Leading Paragraph" descricao="A primeira frase costuma conter a tese central." />
                       <TimelineItem passo={5} titulo="Keywords em Destaque" descricao="Circule mentalmente negritos e itálicos." isLast={true} />
                    </div>
                  )
                },
                {
                  titulo: "Exemplo Prático: Analisando um Título",
                  icone: "🧪",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="p-6 bg-slate-900 text-slate-100 rounded-xl font-mono text-sm border-l-4 border-blue-500">
                        "PETROBRAS REACHES RECORD PRODUCTION IN PRE-SALT FIELDS"
                      </div>
                      <RichIntro className="text-base mb-0">
                        <p>
                          **O que prevemos aqui?**
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                          <li>**Sujeito:** Petrobras.</li>
                          <li>**Ação:** Reach record production (atingir recorde).</li>
                          <li>**Local:** Pre-salt (Pré-sal).</li>
                        </ul>
                        <p className="mt-4 text-sm italic opacity-80">
                          Sem ler o texto, você já sabe que encontrará números de barris, nomes de campos e possivelmente datas de comparação.
                        </p>
                      </RichIntro>
                    </div>
                  )
                }
              ]}
            />
          </section>

          <section id="quiz-modulo-1" className="mt-16">
            
<ModuleConsolidation
              index={1}
              variant={getModuleVariant(1)}
              video={{
                videoId: "kOunF5Z0vWA",
                title: "Prediction Techniques for Exams",
                duration: "6:15"
              }}
              resumoVisual={{
                moduloNome: "Módulo 1",
                tituloAula: "Inglês Instrumental",
                materia: "Língua Inglesa",
                images: [
                  { title: "Mapa Mental: Prediction", type: "Mapa Mental", placeholderColor: "bg-blue-500/20" },
                  { title: "Exemplos de Fontes", type: "Esquema", placeholderColor: "bg-indigo-500/20" },
                  { title: "Checklist Pre-Reading", type: "Fórmula", placeholderColor: "bg-violet-500/20" }
                ]
              }}
              maceteVisual={{
                title: "A Senha P.T.I.",
                content: (
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <p className="font-bold text-blue-600">P.T.I. Strategy</p>
                    <ul className="text-xs space-y-1 mt-2">
                      <li>**P** - Source</li>
                      <li>**T** - Title</li>
                      <li>**I** - Image</li>
                    </ul>
                  </div>
                )
              }}
              audio={{
                audioUrl: "#",
                titulo: "Sinfonia da Predição",
                artista: "Prof. Douglas"
              }}
            />

                        <QuizInterativo
              questoes={quizPrediction}
              titulo="QUIZ: Prediction & Context"
              icone="🧠"
              numero={2}
              variant="blue"
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
            />
          </section>
        </div>
      </TabsContent>

      <TabsContent value="modulo-2" className="space-y-[50px]">
        <ModuleBanner
          numero={2}
          titulo="SKIMMING: THE GIST"
          descricao="A técnica para obter a visão geral de textos densos em segundos, sem focar em gramática ou detalhes."
          gradiente="bg-gradient-to-br from-blue-300 via-blue-500 to-blue-400"
          variant="indigo"
        />

        <RichIntro>
          <p>
            O **Skimming** é a tecnologia de "carregamento rápido" do cérebro humano. Em uma prova da Cesgranrio, onde o tempo é o seu recurso mais escasso, tentar ler cada palavra de um artigo técnico sobre os desafios da transição para o **Net Zero** é uma estratégia de alto risco. O Skimmer profissional não lê; ele "escaneia a essência", buscando o que chamamos de **Gist** (a ideia central).
          </p>
          <p>
             A técnica baseia-se na hierarquia da informação. Em textos acadêmicos e técnicos, os autores tendem a seguir uma estrutura lógica rígida: a tese é apresentada na introdução, desenvolvida nos parágrafos centrais e reafirmada na conclusão. Dentro de cada parágrafo, a **Topic Sentence** (geralmente a primeira frase) funciona como um micro-resumo. Ao ler apenas as primeiras e últimas frases de cada bloco, você já terá capturado cerca de 80% do sentido pretendido pelo autor.
          </p>
          <p>
            Para aplicar o Skimming com precisão no contexto da Petrobras, você deve estar atento às **Signal Words** (Palavras de Sinalização). Elas são os semáforos do texto. Termos como *"However"* ou *"Nevertheless"* indicam que o autor está prestes a apresentar um contraponto ou uma dificuldade operacional. Já indicadores como *"Therefore"* ou *"Consequently"* sinalizam que uma conclusão ou resultado de investimento está sendo apresentado. Ignorar os detalhes numéricos e focar nestes conectores permite que você responda perguntas de compreensão global em tempo recorde.
          </p>
          <p>
            Lembre-se da **Regra 80/20**: em textos informativos, a vasta maioria dos detalhes (dados estatísticos, exemplos adjacentes, citações) serve para dar suporte a um pequeno núcleo de ideias fundamentais. O Skimming permite que você identifique este núcleo rapidamente, deixando os detalhes para a fase de **Scanning**, que veremos a seguir. Se a questão pede a "intenção do autor" ou o "assunto principal", o Skimming é sua única ferramenta necessária.
          </p>
          <p>
            Neste módulo, treinaremos seu olhar para ignorar as "nuvens" de vocabulário acessório e focar no "sol" da informação central. Desenvolveremos a confiança necessária para pular parágrafos inteiros de descrição técnica pura, sabendo exatamente onde a mensagem principal está escondida nos relatórios de sustentabilidade e segurança da Petrobras.
          </p>
        </RichIntro>
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={2}
              title="A Arte do Voo Rasante"
              description="Como ler 1000 palavras em 1 minuto e entender a tese central."
              variant={getModuleVariant(2)}
              className="mb-6"
            />
            
            <ContentAccordion
              titulo="Conceituação do Gist"
              icone="🏃"
              corIndicador="bg-indigo-500"
              slides={[
                {
                  titulo: "O que é Skimming?",
                  icone: "💨",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-lg leading-relaxed">
                        **Skimming** é a leitura rápida para obter a essência do texto. Você busca os picos de informação e ignora os vales de detalhes.
                      </p>
                      <AlertBox tipo="success" titulo="A Meta do Skimmer">
                         Ao final do skimming, você deve saber: **O que o autor defende?** e **Qual o assunto principal?**.
                      </AlertBox>
                    </div>
                  )
                },
                {
                  titulo: "Eagle Eye Strategy",
                  icone: "🦅",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm font-bold">Onde focar:</p>
                      <ul className="list-decimal pl-5 space-y-1 text-xs">
                        <li>**Topic Sentences**: Primeira e última frase de cada parágrafo.</li>
                        <li>**Signal Words**: Conectores de contraste ou conclusão.</li>
                        <li>**Nouns**: Substantivos repetidos indicam o tema.</li>
                      </ul>
                    </div>
                  )
                },
                {
                  titulo: "Exemplo: O Pulo do Gato",
                  icone: "🐈",
                  conteudo: (
                    <div className="space-y-4">
                      <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl italic text-sm">
                        "Despite the global challenges, the company's investment in renewable energy increased significantly last year. This trend reflects a commitment to sustainability."
                      </div>
                      <p className="text-xs">
                        **Skimming Result:** Ao ler apenas *"Despite... renewable energy increased... sustainability"*, você captura o **Gist**: A empresa está investindo em energia limpa apesar dos problemas. Você não precisou traduzir *"significantly"* ou *"reflects"* para entender a mensagem principal.
                      </p>
                    </div>
                  )
                }
              ]}
            />
          </section>

          <section id="quiz-modulo-2" className="mt-16">
            
<ModuleConsolidation
              index={2}
              variant={getModuleVariant(2)}
              video={{
                videoId: "h3S9XW1WzIk",
                title: "Skimming Mastery",
                duration: "7:40"
              }}
              resumoVisual={{
                moduloNome: "Módulo 2",
                tituloAula: "Inglês Instrumental",
                materia: "Língua Inglesa",
                images: [
                  { title: "Topic Sentence Radar", type: "Esquema", placeholderColor: "bg-indigo-500/20" },
                  { title: "The 'Z' Eye Path", type: "Mapa Mental", placeholderColor: "bg-blue-500/20" }
                ]
              }}
              maceteVisual={{
                title: "O Salto do Gato",
                content: (
                  <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                    <p className="font-bold text-indigo-600">80/20 Rule</p>
                    <p className="text-[10px] leading-tight text-muted-foreground mt-2">
                       80% do sentido está em 20% das palavras (substantivos e verbos). Ignore preposições no skimming!
                    </p>
                  </div>
                )
              }}
              audio={{
                audioUrl: "#",
                titulo: "Voo Rasante",
                artista: "Prof. Douglas"
              }}
            />

                        <QuizInterativo
              questoes={quizSkimming}
              titulo="Quiz 2 - Skimming"
              icone="🏃"
              numero={2}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 3: SCANNING ═══ */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <ModuleBanner
          numero={3}
          titulo="SCANNING: PRECISION DATA SEARCH"
          descricao="O 'Ctrl+F' do seu cérebro: localize datas, números, nomes próprios e termos técnicos instantaneamente."
          gradiente="bg-gradient-to-br from-emerald-300 via-emerald-500 to-emerald-400"
          variant="indigo"
        />

        <RichIntro>
          <p>
            O **Scanning** é a estratégia do "Sniper". Diferente do Skimming (que busca a visão aérea), o Scanning é uma incursão terrestre de alta precisão. Na prova da Petrobras, você usará esta técnica para responder perguntas que exigem dados factuais: "Em que ano a produção recorde foi atingida?", "Qual a porcentagem de investimento em fontes renováveis?" ou "Quais siglas definem o novo protocolo de segurança?".
          </p>
          <p>
            A chave para um Scanning bem-sucedido reside na preparação. Você nunca deve começar a escanear o texto sem antes ter extraído a **Keyword** (palavra-chave) do enunciado da questão. Identifique se o que você busca é um número (formado por dígitos ou por extenso), um nome próprio (iniciado por letra maiúscula) ou um símbolo específico (como $, % ou siglas em caixa alta como **FPSO**, **P-78** ou **HSE**). Ao visualizar mentalmente a "forma gráfica" do que procura, seu cérebro ignora automaticamente todo o ruído textual ao redor.
          </p>
          <p>
            Durante a varredura, seus olhos devem se mover de forma não-linear. Técnicas como o **Z-Pattern** (movimento em "Z" pela página) ou a varredura em espiral permitem que você cubra grandes áreas de texto sem ler uma única frase completa. Imagine que você está usando a função *Find (Ctrl+F)* do seu navegador; você não está interessado no sentido das palavras vizinhas, apenas na correspondência exata do seu alvo visual.
          </p>
          <p>
            Um erro comum é continuar lendo o texto após encontrar a palavra-chave. O protocolo correto é o **Stop & Read**: assim que o seu "radar visual" detectar o alvo, PARE. Somente neste momento você muda para a leitura intensiva (Intensive Reading), analisando a frase imediatamente anterior e posterior ao termo encontrado para validar se aquela é, de fato, a resposta à pergunta. Isso evita que você caia em "distratores" (opções erradas que usam a mesma palavra apenas para confundir).
          </p>
          <p>
            Neste módulo, transformaremos seus olhos em sensores de alta performance. Aprenderemos a detectar padrões de dados operacionais e financeiros típicos dos relatórios da Petrobras e a navegar por siglas complexas do setor de energia com a agilidade de um tradutor simultâneo. O Scanning é a ferramenta que garante os pontos das questões de "True or False" e de localização de dados específicos.
          </p>
        </RichIntro>
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="Scanning: O Sniper da Leitura"
              description="Como encontrar informações específicas sem ler o texto completo."
              variant={getModuleVariant(3)}
              className="mb-6"
            />
            
            <ContentAccordion
              titulo="O Protocolo de Busca"
              icone="🎯"
              corIndicador="bg-emerald-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "O que é Scanning na Realidade?",
                  icone: "🔍",
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-lg leading-relaxed">
                        **Scanning** é uma busca dirigida por uma palavra-chave ou dado específico. É a técnica que você usa quando procura um nome em uma lista telefônica. Você SABE o que está procurando; o texto é apenas o reservatório.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                         <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10 text-center">
                            <h6 className="text-[10px] font-black uppercase text-emerald-600">NÚMEROS</h6>
                            <p className="text-xs font-mono font-bold">2024, 45%, $1.2B</p>
                         </div>
                         <div className="p-4 bg-teal-500/5 rounded-xl border border-teal-500/10 text-center">
                            <h6 className="text-[10px] font-black uppercase text-teal-600">NOMES PRÓPRIOS</h6>
                            <p className="text-xs font-mono font-bold">Petrobras, OPEC, ANP</p>
                         </div>
                         <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/10 text-center">
                            <h6 className="text-[10px] font-black uppercase text-cyan-600">SIGLAS (Acronyms)</h6>
                            <p className="text-xs font-mono font-bold">FPSO, SCADA, ESG</p>
                         </div>
                      </div>
                      <AlertBox tipo="warning" titulo="Nunca escanie sem Keyword">
                         Vá para o texto APENAS com a palavra-alvo (keyword) da questão na mente. Escanear sem alvo é apenas ler rápido e cansar os olhos.
                      </AlertBox>
                    </div>
                  )
                },
                {
                  titulo: "Z-Pattern Scan & Visual Viz",
                  icone: "👀",
                  conteudo: (
                    <div className="space-y-6">
                       <p className="text-sm">Técnicas de varredura ocular:</p>
                       <div className="space-y-4">
                          <TimelineItem 
                            passo={1}
                            titulo="Mental Visualization"
                            descricao="Feche os olhos por 1 segundo e visualize o formato da palavra (ex: ela começa com Maiúscula? Tem o símbolo %?)."
                          />
                          <TimelineItem 
                            passo={2}
                            titulo="The Z Move"
                            descricao="Mova os olhos em forma de 'Z' ou caracol pela página, sem ler as frases. Busque a 'imagem' da palavra."
                          />
                          <TimelineItem 
                            passo={3}
                            titulo="The Stop & Read"
                            descricao="Ao encontrar a palavra, pare! Agora sim, mude para o modo 'Intensive Reading' e leia a frase completa para confirmar a resposta."
                            isLast={true}
                          />
                       </div>
                    </div>
                  )
                },
                {
                  titulo: "Exemplo: Sniper em Ação",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-4">
                      <RichIntro className="text-base mb-0">
                        <p>**Questão:** What was the percentage of production increase in the P-71 field during 2023?</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                          <li>**Keywords:** P-71, 2023, %.</li>
                        </ul>
                        <p className="mt-4 text-xs italic opacity-80">
                          Ao escanear, você ignora palavras como "investment", "safety" ou "oil", e busca apenas a forma visual de "P-71" e o símbolo "%". Ao achar, você lê a frase ao redor para achar "2023".
                        </p>
                      </RichIntro>
                    </div>
                  )
                }
              ]}
            />
          </section>

          <section id="quiz-modulo-3" className="mt-16">
            
<ModuleConsolidation
              index={3}
              variant={getModuleVariant(3)}
              video={{
                videoId: "8kGv8C_R91A",
                title: "Scanning Drills for Competitive Exams",
                duration: "8:15"
              }}
              resumoVisual={{
                moduloNome: "Módulo 3",
                tituloAula: "Inglês Instrumental",
                materia: "Língua Inglesa",
                images: [
                  { title: "Keywords Sniper Radar", type: "Esquema", placeholderColor: "bg-emerald-500/20" },
                  { title: "Visual Patterns Guide", type: "Mapa Mental", placeholderColor: "bg-teal-500/20" },
                  { title: "Data Extraction Workflow", type: "Fórmula", placeholderColor: "bg-cyan-500/20" }
                ]
              }}
              maceteVisual={{
                title: "Ctrl+F Ocular",
                content: (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <p className="font-bold text-emerald-600">The Target Secret</p>
                    <p className="text-[10px] leading-tight text-muted-foreground mt-2">
                       A pergunta da Cesgranrio contém a sua Keyword. Localize-a no enunciado, memorize sua 'forma visual' e busque no texto como se fosse um filtro de imagem.
                    </p>
                  </div>
                )
              }}
              audio={{
                audioUrl: "#",
                titulo: "Foco no Alvo: Scanning",
                artista: "Prof. Douglas"
              }}
            />

                        <QuizInterativo
              questoes={quizScanning}
              titulo="QUIZ: Scanning (The Details)"
              icone="🎯"
              numero={4}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 4: VOCABULARY & GLOSSARIES ═══ */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner
          numero={4}
          titulo="VOCABULARY & DEEP GLOSSARIES"
          descricao="Domine o vocabulário técnico da Petrobras e desarme as armadilhas de tradução da Cesgranrio."
          gradiente="bg-gradient-to-br from-rose-300 via-rose-500 to-rose-400"
          variant="amber"
        />

        <RichIntro>
          <p>
            O vocabulário é o "combustível" que alimenta as suas estratégias de leitura. Sem um léxico mínimo, Prediction e Skimming perdem tração. No entanto, o segredo para o sucesso na Petrobras não é decorar dicionários, mas sim entender a **Morfologia** e a herança latina do inglês técnico. Mais de **80% do vocabulário industrial** compartilha raízes com o português, o que coloca você como falante de língua latina em uma vantagem estratégica natural.
          </p>
          <p>
            Esta vantagem é visível na facilidade de identificar termos como *"Exploration"*, *"Refining"*, *"Sustainability"* ou *"Technological development"*. Contudo, a **Cesgranrio** conhece bem esse atalho e planta armadilhas conhecidas como **False Cognates** (ou False Friends). Palavras como *"Actually"* (Na verdade), *"Eventually"* (Finalmente) e *"Intends"* (Pretender) são projetadas para fazer o candidato apressado escolher a tradução mais óbvia e errada. Dominar esses "falsos amigos" é o que diferencia o especialista do amador.
          </p>
          <p>
            Além das armadilhas linguísticas, o candidato deve estar imerso no ecossistema do setor de óleo e gás. Entender as divisões de negócio da Petrobras — **Upstream** (Exploração e Produção), **Midstream** (Transporte e Logística) e **Downstream** (Refino e Comercialização) — é fundamental para prever o sentido de parágrafos inteiros. Saber que uma *"Rig"* pode ser uma sonda de perfuração e que *"Environmentally-friendly"* é um termo-chave em relatórios de ESG (Environmental, Social, and Governance) permite uma conexão imediata com os temas contemporâneos da banca.
          </p>
          <p>
            Outro pilar deste módulo é o estudo dos **Conectores Lógicos** (Linking Words). Eles são como a "cola" que une as ideias técnicas. Sem entender que *"However"* indica um contraste e *"Therefore"* indica uma conclusão, o sentido do texto pode se perder, mesmo que você conheça todos os substantivos. Nesta aula, integraremos o glossário técnico da indústria de energia com os operadores lógicos que a Cesgranrio mais utiliza em suas questões de reescrita e interpretação.
          </p>
          <p>
            Nesta etapa final de conteúdo, consolidaremos seu dicionário mental com termos de segurança do trabalho (**HSE**), manutenção industrial e finanças corporativas. O objetivo é que, ao abrir a prova, você não veja "uma língua estrangeira", mas sim um conjunto familiar de conceitos técnicos fundamentais expressos em um código que você agora domina com precisão e confiança.
          </p>
        </RichIntro>
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={1}
              title="O Poder dos Cognatos"
              description="A sua maior vantagem competitiva como falante de língua latina."
              variant={getModuleVariant(4)}
              className="mb-6"
            />
            
            <ContentAccordion
              titulo="Cognatos: O Atalho Mental"
              icone="🧠"
              corIndicador="bg-amber-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "A Regra dos 80%",
                  icone: "📊",
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-lg leading-relaxed">
                        Mais de **80% do vocabulário técnico e acadêmico** em inglês tem raiz latina. Isso significa que você já possui um léxico imenso para textos da Petrobras.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                         {[
                            { en: "Exploration", pt: "Exploração" },
                            { en: "Production", pt: "Produção" },
                            { en: "Sustainability", pt: "Sustentabilidade" },
                            { en: "Investment", pt: "Investimento" },
                            { en: "Technology", pt: "Tecnologia" },
                            { en: "Safety", pt: "Segurança" },
                            { en: "Refinery", pt: "Refinaria" },
                            { en: "Logistics", pt: "Logística" }
                         ].map((item, i) => (
                            <div key={i} className="p-3 bg-amber-500/5 rounded-xl border border-amber-500/20 text-center">
                               <p className="text-xs font-black text-amber-700">{item.en}</p>
                               <p className="text-[10px] text-muted-foreground">{item.pt}</p>
                            </div>
                         ))}
                      </div>
                    </div>
                  )
                },
                {
                  titulo: "O Coração da Cesgranrio: Linking Words",
                  icone: "🔗",
                  conteudo: (
                    <div className="space-y-6">
                      <p className="text-sm">As palavras-chave que conectam o raciocínio técnico. Memorize por categoria:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
                          <h6 className="font-bold text-emerald-600 text-xs">Contraste / Concessão</h6>
                          <p className="text-[10px] opacity-80 mt-1">**However, Nevertheless, Despite, Although, Yet.**</p>
                        </div>
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/10">
                          <h6 className="font-bold text-blue-600 text-xs">Causa / Consequência</h6>
                          <p className="text-[10px] opacity-80 mt-1">**Therefore, Thus, Consequently, Due to, Since.**</p>
                        </div>
                        <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/10">
                          <h6 className="font-bold text-amber-600 text-xs">Adição</h6>
                          <p className="text-[10px] opacity-80 mt-1">**Furthermore, Moreover, In addition to, Besides.**</p>
                        </div>
                        <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/10">
                          <h6 className="font-bold text-rose-600 text-xs">Condição</h6>
                          <p className="text-[10px] opacity-80 mt-1">**Unless (a menos que), Provided that, Whether.**</p>
                        </div>
                      </div>
                    </div>
                  )
                },
                {
                  titulo: "A Impessoalidade: Voz Passiva",
                  icone: "⚙️",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm">No inglês técnico da Petrobras, o foco é no **processo**, não no executor.</p>
                      <div className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs">
                        <p className="text-blue-400">Ativa: "Engineers inspected the platform."</p>
                        <p className="text-emerald-400 mt-2 text-sm font-bold">Passiva: "The platform WAS INSPECTED (by engineers)."</p>
                      </div>
                      <p className="text-[10px] italic">A Cesgranrio costuma pedir para identificar quem realizou a ação ou o estado do objeto.</p>
                    </div>
                  )
                }
              ]}
            />

            <div className="pt-12 space-y-8">
              <ModuleSectionHeader
                index={2}
                title="Industrial Flashcards: Vocabulário Petrobras"
                description="Clique nos cards para revelar o significado técnico e exemplos práticos de termos fundamentais da indústria."
                variant={getModuleVariant(4)}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <FlipCard 
                  key="crude"
                  frente={<div className="text-center text-2xl font-black">Crude Oil</div>}
                  verso={<div className="space-y-4">
                    <p className="font-bold text-amber-600 uppercase tracking-tight">Petróleo Bruto</p>
                    <p className="text-xs leading-relaxed">Em seu estado natural, antes de passar por refino.</p>
                    <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20 italic text-[10px]">
                      "The crude oil was transported via pipeline."
                    </div>
                  </div>}
                />
                <FlipCard 
                  key="offshore"
                  frente={<div className="text-center text-2xl font-black">Offshore</div>}
                  verso={<div className="space-y-4">
                    <p className="font-bold text-blue-600 uppercase tracking-tight">Em alto mar</p>
                    <p className="text-xs leading-relaxed">Atividades realizadas em mar aberto (plataformas, navios).</p>
                    <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20 italic text-[10px]">
                      "Petrobras is a world leader in offshore drilling."
                    </div>
                  </div>}
                />
                <FlipCard 
                  key="well"
                  frente={<div className="text-center text-2xl font-black">Well / Drill</div>}
                  verso={<div className="space-y-4">
                    <p className="font-bold text-slate-600 uppercase tracking-tight">Poço / Perfurar</p>
                    <p className="text-xs leading-relaxed">Infraestrutura e ação central na fase de exploração.</p>
                    <div className="p-3 bg-slate-500/10 rounded-lg border border-slate-500/20 italic text-[10px]">
                      "The company plans to drill three new wells."
                    </div>
                  </div>}
                />
                <FlipCard 
                  key="refinery"
                  frente={<div className="text-center text-2xl font-black">Refinery</div>}
                  verso={<div className="space-y-4">
                    <p className="font-bold text-purple-600 uppercase tracking-tight">Refinaria</p>
                    <p className="text-xs leading-relaxed">Onde o petróleo é transformado em derivados (gasolina, diesel).</p>
                    <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20 italic text-[10px]">
                      "The modern refinery operates 24/7."
                    </div>
                  </div>}
                />
                <FlipCard 
                  key="rig"
                  frente={<div className="text-center text-2xl font-black">Rig</div>}
                  verso={<div className="space-y-4">
                    <p className="font-bold text-emerald-600 uppercase tracking-tight">Sonda / Plataforma</p>
                    <p className="text-xs leading-relaxed">Equipamento de perfuração ou unidade de produção.</p>
                    <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20 italic text-[10px]">
                      "The oil rig is located 200km from the coast."
                    </div>
                  </div>}
                />
              </div>
            </div>
          </section>

          <section id="quiz-modulo-4" className="mt-16">
            
<ModuleConsolidation
              index={4}
              variant={getModuleVariant(4)}
              video={{
                videoId: "kOunF5Z0vWA",
                title: "Vocabulary Strategies for Petrobras",
                duration: "10:15"
              }}
              resumoVisual={{
                moduloNome: "Módulo 4",
                tituloAula: titulo,
                materia: materiaNome,
                images: [
                  { title: "Technical Glossary", type: "Mapa Mental", placeholderColor: "bg-amber-500/20" },
                  { title: "False Friends Radar", type: "Esquema", placeholderColor: "bg-rose-500/20" },
                  { title: "Morfology Table", type: "Fórmula", placeholderColor: "bg-orange-500/20" }
                ]
              }}
              maceteVisual={{
                title: "O Pulo do Gato: Raiz Latina",
                content: (
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                    <p className="font-bold text-amber-600">The Latin Hook</p>
                    <p className="text-[10px] leading-tight text-muted-foreground mt-2">
                       Se uma palavra técnica parece português, em 90% das vezes ela é o que parece. Desconfie de 'Actually'.
                    </p>
                  </div>
                )
              }}
              audio={{
                audioUrl: "#",
                titulo: "Vocabulário Produtivo",
                artista: "Prof. Douglas"
              }}
            />

                        <QuizInterativo
              questoes={quizVocabulary}
              titulo="Quiz 4 - Vocabulary & Cognates"
              icone="🎭"
              numero={4}
              variant="amber"
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 5: INFERENCING FROM CONTEXT ═══ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="INFERENCING FROM CONTEXT"
          descricao="Adivinhe significados de palavras desconhecidas usando pistas do contexto sem dicionário."
          gradiente="bg-gradient-to-br from-rose-300 via-rose-500 to-rose-400"
          variant="rose"
        />

        <RichIntro>
          <p>
            **Inferencing** é a arte de deduzir significados sem tradução direta. Em uma prova de Cesgranrio, você certamente encontrará vocabulário técnico desconhecido — palavras como "permeability", "mitigating" ou "inherently" — que não aparecem em nenhuma lista de vocabulário padrão. A solução não é ter memorizado cada palavra, mas saber **ler as pistas** que o próprio texto oferece.
          </p>
          <p>
            O contexto oferece várias estratégias de inferência: **sinônimos explicativos** (quando a palavra é seguida por uma explicação em aposto), **exemplos em cadeia** (que mostram como a palavra é usada), **definições implícitas** (em uma frase longa que descreve o conceito), e **pistas causais** (quando a conjunção "because" ou "so" revela a relação semântica).
          </p>
          <p>
            Para Petrobras especificamente, dominar a inferência significa que você pode ler documentos técnicos em inglês sem parar a cada palavra desconhecida. Se o documento menciona "reservoir's permeability is crucial for extraction; without it, fluid cannot flow", você **não precisa conhecer "permeability"** — o texto já o definiu implicitamente: é a capacidade do fluido fluir.
          </p>
          <p>
            Neste módulo, aprenderemos a reconhecer os **padrões de pista** mais comuns: as pontuações que isolam definições (vírgulas em aposto, parênteses, travessões), as transições que indicam causalidade, e como a estrutura da frase revela a intenção semântica do autor.
          </p>
        </RichIntro>

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={5}
              title="Context Clues Mastery"
              description="Desvendando significados através de pistas contextuais."
              variant={getModuleVariant(5)}
              className="mb-6"
            />

            <ContentAccordion
              titulo="Os Padrões de Pista"
              icone="🔍"
              corIndicador="bg-rose-500"
              slides={[
                {
                  titulo: "Appositive Clues (Definições em Aposto)",
                  icone: "📌",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm italic">
                        "The FPSO vessel, a floating production and storage unit, operates offshore."
                      </p>
                      <p className="text-xs">O texto define FPSO entre vírgulas. Você não precisa saber a sigla — a explicação é fornecida.</p>
                    </div>
                  )
                },
                {
                  titulo: "Cause & Effect Clues (Pistas Causais)",
                  icone: "⚡",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm italic">
                        "The platform was severely damaged; consequently, operations were suspended."
                      </p>
                      <p className="text-xs">'Suspended' = parado/interrompido. O "so" (consequently) revela a relação: dano → parada.</p>
                    </div>
                  )
                },
                {
                  titulo: "Example Clues (Pistas por Exemplo)",
                  icone: "📋",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm italic">
                        "Stringent protocols mandate compliance. For instance, all employees must follow HSE guidelines."
                      </p>
                      <p className="text-xs">'Stringent' = rigoroso. O exemplo mostra exigências rigorosas.</p>
                    </div>
                  )
                }
              ]}
            />
          </section>

          <section id="quiz-modulo-5" className="mt-16">

<ModuleConsolidation
              index={5}
              variant={getModuleVariant(5)}
              video={{
                videoId: "kOunF5Z0vWA",
                title: "Context Clues & Inference",
                duration: "8:45"
              }}
              resumoVisual={{
                moduloNome: "Módulo 5",
                tituloAula: titulo,
                materia: materiaNome,
                images: [
                  { title: "Padrões de Pista", type: "Mapa Mental", placeholderColor: "bg-rose-500/20" },
                  { title: "Palavras Técnicas Deduzidas", type: "Esquema", placeholderColor: "bg-pink-500/20" },
                  { title: "Conexões Contextuais", type: "Fórmula", placeholderColor: "bg-red-500/20" }
                ]
              }}
              maceteVisual={{
                title: "O Segredo: Procure a Pista",
                content: (
                  <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                    <p className="font-bold text-rose-600">Context Clue Hunt</p>
                    <ul className="text-[10px] leading-tight text-muted-foreground mt-2 space-y-1">
                      <li>• Vírgulas e parênteses isolam explicações</li>
                      <li>• Conectores (so, because, therefore) mostram relações</li>
                      <li>• Exemplos ilustram o conceito</li>
                    </ul>
                  </div>
                )
              }}
              audio={{
                audioUrl: "#",
                titulo: "Inferência Contextual",
                artista: "Prof. Douglas"
              }}
            />

                        <QuizInterativo
              questoes={quizInferencing}
              titulo="Quiz 5 - Inferencing from Context"
              icone="🔍"
              numero={5}
              variant="rose"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 6: MAIN IDEA & SUPPORTING DETAILS ═══ */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <ModuleBanner
          numero={6}
          titulo="MAIN IDEA & SUPPORTING DETAILS"
          descricao="Separe a tese central dos exemplos e detalhes que a sustentam."
          gradiente="bg-gradient-to-br from-cyan-300 via-cyan-500 to-cyan-400"
          variant="cyan"
        />

        <RichIntro>
          <p>
            A maioria dos leitores iniciantes em inglês técnico comete o erro de **tratar todas as informações com igual importância**. Se um parágrafo menciona que "Petrobras invested 50 billion, drilled 15 wells, increased production 30%, and implemented environmental standards", muitos tentam memorizar todos os números. Mas a Cesgranrio raramente pergunta sobre números isolados — ela pergunta sobre o **quadro geral**: qual é o significado desses investimentos?
          </p>
          <p>
            A estrutura de texto obedece a uma hierarquia rigorosa: uma **ideia principal** (main idea) que encapsula o conceito central, e **detalhes de suporte** que a sustentam com números, exemplos, definições e explicações. Identificar essa hierarquia é a chave para responder perguntas sobre "main purpose", "best title", "which statement summarizes..."
          </p>
          <p>
            O **Topic Sentence** — geralmente a primeira ou segunda frase de um parágrafo — funciona como a síntese condensada. Tudo que vem depois são justificativas, exemplos ou aplicações daquele tópico. Em textos sobre Petrobras (relatórios de sustentabilidade, prospectos técnicos), essa estrutura é extremamente previsível.
          </p>
          <p>
            Neste módulo, aprenderemos a usar a **hierarchical reading** para fazer scans eficientes, responder perguntas sobre "main idea" em segundos, e distinguir informações essenciais de detalhes acessórios que podem confundir durante uma prova cronometrada.
          </p>
        </RichIntro>

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={6}
              title="Hierarquia da Informação"
              description="Mapeando a estrutura lógica de textos técnicos."
              variant={getModuleVariant(6)}
              className="mb-6"
            />

            <ContentAccordion
              titulo="Identificando Ideia Principal vs. Detalhes"
              icone="🎯"
              corIndicador="bg-cyan-500"
              slides={[
                {
                  titulo: "O Topic Sentence",
                  icone: "📍",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm font-bold">Primeira ou segunda frase do parágrafo, contém a ideia-chave.</p>
                      <p className="text-xs italic">"The blowout preventer (BOP) is a critical safety device."</p>
                      <p className="text-xs">Tudo que segue explica ou exemplifica o BOP.</p>
                    </div>
                  )
                },
                {
                  titulo: "Supporting Details",
                  icone: "📊",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm font-bold">Números, exemplos, definições que sustentam a tese.</p>
                      <ul className="text-xs space-y-1 list-disc pl-4">
                        <li>Estatísticas (36 refineries)</li>
                        <li>Exemplos (pre-salt fields)</li>
                        <li>Explicações de mecanismo</li>
                      </ul>
                    </div>
                  )
                },
                {
                  titulo: "Multi-paragraph Main Idea",
                  icone: "🔗",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm font-bold">Sintetize as ideias principais de cada parágrafo.</p>
                      <p className="text-xs">Se os parágrafos discutem: investimento + produção + segurança + sustentabilidade, a ideia geral é "Petrobras' comprehensive modernization strategy".</p>
                    </div>
                  )
                }
              ]}
            />
          </section>

          <section id="quiz-modulo-6" className="mt-16">

<ModuleConsolidation
              index={6}
              variant={getModuleVariant(6)}
              video={{
                videoId: "kOunF5Z0vWA",
                title: "Main Idea & Text Organization",
                duration: "9:20"
              }}
              resumoVisual={{
                moduloNome: "Módulo 6",
                tituloAula: titulo,
                materia: materiaNome,
                images: [
                  { title: "Estrutura Hierárquica", type: "Mapa Mental", placeholderColor: "bg-cyan-500/20" },
                  { title: "Topic Sentence Radar", type: "Esquema", placeholderColor: "bg-blue-500/20" },
                  { title: "Supporting Evidence Grid", type: "Fórmula", placeholderColor: "bg-sky-500/20" }
                ]
              }}
              maceteVisual={{
                title: "A Pirâmide Invertida",
                content: (
                  <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                    <p className="font-bold text-cyan-600">Hierarchy of Info</p>
                    <p className="text-[10px] leading-tight text-muted-foreground mt-2">
                       Main Idea (Topo) → Supporting Points → Details (Base)
                    </p>
                  </div>
                )
              }}
              audio={{
                audioUrl: "#",
                titulo: "Arquitetura de Texto",
                artista: "Prof. Douglas"
              }}
            />

                        <QuizInterativo
              questoes={quizMainIdea}
              titulo="Quiz 6 - Main Idea & Details"
              icone="🎯"
              numero={6}
              variant="cyan"
              onComplete={(score) => handleModuleComplete("modulo-6", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 7: CRITICAL READING & TONE ═══ */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <ModuleBanner
          numero={7}
          titulo="CRITICAL READING & TONE"
          descricao="Identifique intenção do autor, tom, atitude e implicações implícitas."
          gradiente="bg-gradient-to-br from-lime-300 via-lime-500 to-lime-400"
          variant="lime"
        />

        <RichIntro>
          <p>
            Um texto técnico não é neutro como parece. Por trás de cada frase há uma **intenção** (intent), um **tom** (tone) e uma **atitude** (stance) do autor — pistas que revelam credibilidade, viés, urgência ou ceticismo. A Cesgranrio frequentemente pergunta: "What is the author's purpose?" ou "The author's tone can be best described as..."
          </p>
          <p>
            Em um documento de sustentabilidade de Petrobras, a escolha de palavras "Petrobras is leading energy transition" (léxico positivo) versus "Petrobras claims commitment to sustainability while expanding fossil fuels" (léxico crítico/cético) revela uma diferença monumental de intenção. A leitura crítica exige que você **leia além das palavras**: reconheça o vocabulário carregado, as transições que indicam contraste, e as implicações lógicas entre ideias.
          </p>
          <p>
            O **tone** é mais sutil que a intenção. Pode ser urgente, formal, irônico, pessimista, entusiasmado ou cauteloso. Um manual de segurança que diz "Non-compliance WILL result in termination" tem tom firme e obrigatório; já um relatório que diz "We suggest exploring renewable options" tem tom sugestivo e não-vinculante.
          </p>
          <p>
            Neste módulo, aprenderemos a captar o **tone implícito** através de seleção vocabular, a identificar quando o autor **implica** algo sem dizer explicitamente, e a reconhecer o **viés** e a **credibilidade** do texto — habilidades críticas para textos de verdade/falsidade e interpretação.
          </p>
        </RichIntro>

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={7}
              title="Desvendando Intenção e Atitude"
              description="Leitura crítica além das palavras superficiais."
              variant={getModuleVariant(7)}
              className="mb-6"
            />

            <ContentAccordion
              titulo="Ferramentas de Análise Crítica"
              icone="🔎"
              corIndicador="bg-lime-500"
              slides={[
                {
                  titulo: "Loaded Vocabulary (Vocabulário Carregado)",
                  icone: "⚡",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm font-bold">Palavras com conotação positiva ou negativa revelam atitude.</p>
                      <p className="text-xs"><span className="font-bold">Positivo:</span> "innovative", "leader", "committed"</p>
                      <p className="text-xs"><span className="font-bold">Negativo:</span> "alarming", "lapses", "contradicts"</p>
                    </div>
                  )
                },
                {
                  titulo: "Author's Purpose (Objetivo do Autor)",
                  icone: "🎯",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm font-bold">Diferenciar: informar, persuadir, criticar, alertar.</p>
                      <ul className="text-xs space-y-1 list-disc pl-4">
                        <li>Informar = linguagem neutra, fatos</li>
                        <li>Persuadir = argumentos, evidência carregada</li>
                        <li>Criticar = tom cético, contradições</li>
                      </ul>
                    </div>
                  )
                },
                {
                  titulo: "Fact vs. Opinion (Fato vs. Opinião)",
                  icone: "📋",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm font-bold">Fatos são verificáveis; opiniões são juízos de valor.</p>
                      <p className="text-xs italic">"Petrobras produces 3M barrels/day" = fato</p>
                      <p className="text-xs italic">"Petrobras is inadequate in sustainability" = opinião</p>
                    </div>
                  )
                }
              ]}
            />
          </section>

          <section id="quiz-modulo-7" className="mt-16">

<ModuleConsolidation
              index={7}
              variant={getModuleVariant(7)}
              video={{
                videoId: "kOunF5Z0vWA",
                title: "Tone, Bias & Critical Reading",
                duration: "10:05"
              }}
              resumoVisual={{
                moduloNome: "Módulo 7",
                tituloAula: titulo,
                materia: materiaNome,
                images: [
                  { title: "Vocabulário Carregado", type: "Mapa Mental", placeholderColor: "bg-lime-500/20" },
                  { title: "Intenção do Autor", type: "Esquema", placeholderColor: "bg-green-500/20" },
                  { title: "Análise de Tom", type: "Fórmula", placeholderColor: "bg-emerald-500/20" }
                ]
              }}
              maceteVisual={{
                title: "O Detector de Intenção",
                content: (
                  <div className="p-4 bg-lime-500/10 border border-lime-500/20 rounded-xl">
                    <p className="font-bold text-lime-600">3 Perguntas-Chave</p>
                    <ul className="text-[10px] leading-tight text-muted-foreground mt-2 space-y-1">
                      <li>1. Qual é o tom? (Urgente, formal, crítico?)</li>
                      <li>2. Qual é a intenção? (Informar, persuadir?)</li>
                      <li>3. O que é implícito? (O que não é dito?)</li>
                    </ul>
                  </div>
                )
              }}
              audio={{
                audioUrl: "#",
                titulo: "Leitura Crítica",
                artista: "Prof. Douglas"
              }}
            />

                        <QuizInterativo
              questoes={quizTone}
              titulo="Quiz 7 - Critical Reading & Tone"
              icone="🔎"
              numero={7}
              variant="lime"
              onComplete={(score) => handleModuleComplete("modulo-7", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 8: TEXT STRUCTURE & ORGANIZATION ═══ */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <ModuleBanner
          numero={8}
          titulo="TEXT STRUCTURE & ORGANIZATION"
          descricao="Recognize padrões de organização textual: causa-efeito, comparação, cronologia, problema-solução."
          gradiente="bg-gradient-to-br from-teal-300 via-teal-500 to-teal-400"
          variant="teal"
        />

        <RichIntro>
          <p>
            Um texto não é uma sequência aleatória de frases — é uma **arquitetura lógica** onde cada parágrafo se conecta ao próximo através de padrões estruturais reconhecíveis. Documentos sobre exploração de petróleo frequentemente usam **causa-efeito** ("Deep wells require advanced technology; therefore, costs are high"). Comparativas entre pré-sal e onshore usam **comparison-contrast** ("While pre-salt is deep, onshore is shallow"). Procedimentos de perfuração usam **chronological/sequential** ordering ("First, drill... Next, test pressure... Finally, establish production").
          </p>
          <p>
            A Cesgranrio pergunta sobre essas estruturas implicitamente. Se uma questão pede que você identifique "What caused the production decline?" ou "How do the two fields differ?", você precisará navegar através de estruturas causa-efeito e comparativas. Palavras de transição — **signal words** — como "However", "Therefore", "Similarly", "First", "Eventually" — funcionam como sinais de trânsito, indicando qual padrão estrutural você está lendo.
          </p>
          <p>
            Dominar essas estruturas acelera dramaticdamente sua leitura, pois você já **sabe de antemão** para onde o texto está indo. Se lê "Although pre-salt is technically complex...", você já antecipa que virá um "but" ou "however" introduzindo os benefícios ou uma perspectiva alternativa.
          </p>
          <p>
            Neste módulo, aprenderemos a reconhecer os **cinco padrões principais** e as **transition words** que os sinalam, e a usá-los como GPS para navegar textos densos sem se perder em detalhes.
          </p>
        </RichIntro>

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={8}
              title="Os 5 Padrões Principais"
              description="Mapeando arquitetura lógica textual."
              variant={getModuleVariant(8)}
              className="mb-6"
            />

            <ContentAccordion
              titulo="Padrões de Organização Textual"
              icone="🏗️"
              corIndicador="bg-teal-500"
              slides={[
                {
                  titulo: "Chronological / Sequential (Ordem Temporal)",
                  icone: "⏱️",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm font-bold">Passos em ordem: First → Next → Finally</p>
                      <p className="text-xs italic">"To drill: first assemble equipment, next position rig, finally initiate drilling."</p>
                      <p className="text-xs">Signal words: First, Second, Then, Finally, Eventually, While, When</p>
                    </div>
                  )
                },
                {
                  titulo: "Cause & Effect (Causa → Consequência)",
                  icone: "⚡",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm font-bold">Um evento provoca outro: Because X → Therefore Y</p>
                      <p className="text-xs italic">"Equipment malfunctions caused delays; consequently, production targets were missed."</p>
                      <p className="text-xs">Signal words: Because, Since, Therefore, Consequently, As a result, Led to</p>
                    </div>
                  )
                },
                {
                  titulo: "Comparison & Contrast (Similaridade vs. Diferença)",
                  icone: "⚖️",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm font-bold">Mostrar semelhanças ou diferenças entre ideias</p>
                      <p className="text-xs italic">"While pre-salt is deep, onshore fields are shallow. Both require advanced technology."</p>
                      <p className="text-xs">Signal words: However, But, Although, Similarly, Unlike, In contrast</p>
                    </div>
                  )
                },
                {
                  titulo: "Problem & Solution (Problema → Solução)",
                  icone: "🔧",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm font-bold">Identificar um desafio e uma resposta</p>
                      <p className="text-xs italic">"Corrosion threatens pipelines; therefore, AI monitoring systems were implemented."</p>
                      <p className="text-xs">Signal words: Problem, Challenge, Solution, Solved by, Addressed through</p>
                    </div>
                  )
                },
                {
                  titulo: "Definition & Example (Definir e Ilustrar)",
                  icone: "📚",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm font-bold">Explicar termo seguido de exemplos</p>
                      <p className="text-xs italic">"Permeability — the ability of fluid to flow through rock — is essential for extraction."</p>
                      <p className="text-xs">Signal words: For instance, Such as, Including, Like, For example</p>
                    </div>
                  )
                }
              ]}
            />
          </section>

          <section id="quiz-modulo-8" className="mt-16">

<ModuleConsolidation
              index={8}
              variant={getModuleVariant(8)}
              video={{
                videoId: "kOunF5Z0vWA",
                title: "Text Structure Signals",
                duration: "9:50"
              }}
              resumoVisual={{
                moduloNome: "Módulo 8",
                tituloAula: titulo,
                materia: materiaNome,
                images: [
                  { title: "5 Padrões Estruturais", type: "Mapa Mental", placeholderColor: "bg-teal-500/20" },
                  { title: "Signal Words Chart", type: "Esquema", placeholderColor: "bg-cyan-500/20" },
                  { title: "Pattern Recognition Grid", type: "Fórmula", placeholderColor: "bg-blue-500/20" }
                ]
              }}
              maceteVisual={{
                title: "O Radar de Transição",
                content: (
                  <div className="p-4 bg-teal-500/10 border border-teal-500/20 rounded-xl">
                    <p className="font-bold text-teal-600">Signal Words = Mapa</p>
                    <p className="text-[10px] leading-tight text-muted-foreground mt-2">
                       Therefore = efeito próximo | But = contraste vindo | First = sequência iniciada
                    </p>
                  </div>
                )
              }}
              audio={{
                audioUrl: "#",
                titulo: "Arquitetura Textual",
                artista: "Prof. Douglas"
              }}
            />

                        <QuizInterativo
              questoes={quizStructure}
              titulo="Quiz 8 - Text Structure"
              icone="🏗️"
              numero={8}
              variant="teal"
              onComplete={(score) => handleModuleComplete("modulo-8", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 9: READING IN PETROBRAS CONTEXT ═══ */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <ModuleBanner
          numero={9}
          titulo="READING COMPREHENSION: PETROBRAS CONTEXT"
          descricao="Integre todas as estratégias: textos autênticos com vocabulário e temas Petrobras reais."
          gradiente="bg-gradient-to-br from-blue-300 via-blue-500 to-blue-400"
          variant="blue"
        />

        <RichIntro>
          <p>
            Você dominou **Prediction**, **Skimming**, **Scanning**, **Inferencing**, **Main Idea**, **Tone** e **Structure**. Agora é hora de **integrar tudo** em textos autênticos de Petrobras: relatórios anuais, documentos de sustentabilidade, press releases técnicos, e prospetos de exploração. Este módulo abandona questões isoladas e abraça **passagens de 300-400 palavras** — exatamente como aparecem na Cesgranrio.
          </p>
          <p>
            As questões variam: algumas perguntam sobre **main purpose** (skimming + main idea), outras sobre **specific data** (scanning), outras sobre **implied meaning** (inferencing + critical reading), e ainda outras sobre **passage structure** (organization). Você precisará escolher qual ferramenta usar para cada pergunta, desenvolvendo a **flexibilidade estratégica** que distingue candidatos aprovados de reprovados.
          </p>
          <p>
            Petrobras textos apresentam desafios específicos: vocabulário técnico denso (downstream, pre-salt, FPSO, HSE, EBITDA), múltiplas abreviaturas e siglas (ANP, BOP, ROV), contexto industrial complexo (geologia, engenharia, regulação), e frequentemente um **tom corporativo/marketing** que mistura fato com persuasão ("Petrobras is committed to..." pode ser fato genuíno ou retórica corporativa — você precisa reconhecer a diferença).
          </p>
          <p>
            Neste módulo, trabalharemos com **passagens de comprimento Cesgranrio**, desenvolvendo a stamina e a confiança necessárias para manter a concentração durante uma prova cronometrada enquanto aplica múltiplas estratégias simultaneamente.
          </p>
        </RichIntro>

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={9}
              title="Integração de Estratégias"
              description="Textos autênticos Petrobras: 300-400 palavras com 8 questões."
              variant={getModuleVariant(9)}
              className="mb-6"
            />

            <ContentAccordion
              titulo="Aplicação Estratégica Integrada"
              icone="🧠"
              corIndicador="bg-blue-500"
              slides={[
                {
                  titulo: "Step 1: Prediction (30 segundos)",
                  icone: "🔮",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm font-bold">Leia título, subtítulos, primeira frase, último parágrafo.</p>
                      <p className="text-xs">Ative seu conhecimento: pré-sal, Petrobras, sustentabilidade, exploração, regulação?</p>
                    </div>
                  )
                },
                {
                  titulo: "Step 2: Leia as Questões (1 minuto)",
                  icone: "📋",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm font-bold">Identifique que tipo de informação cada questão busca.</p>
                      <p className="text-xs">"Main purpose?" = Skimming | "According to para 3?" = Scanning | "Implied?" = Inferencing</p>
                    </div>
                  )
                },
                {
                  titulo: "Step 3: Skim Estratégico (1-2 minutos)",
                  icone: "🏃",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm font-bold">Leia topic sentences para captar a estrutura geral.</p>
                      <p className="text-xs">Identifique transições, conectores, padrão (causa-efeito? problema-solução?).</p>
                    </div>
                  )
                },
                {
                  titulo: "Step 4: Scan por Palavra-Chave (3-4 minutos)",
                  icone: "🔍",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm font-bold">Para cada questão, busque os dados específicos localizando palavras-chave.</p>
                      <p className="text-xs">"2023 production?" → busque números. "What caused delays?" → busque causa.</p>
                    </div>
                  )
                },
                {
                  titulo: "Step 5: Infer & Synthesize (2-3 minutos)",
                  icone: "⚡",
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm font-bold">Para questões implícitas, use pistas contextuais e lógica causal.</p>
                      <p className="text-xs">"Author's tone?" → olhe vocabulário carregado, estrutura argumentativa.</p>
                    </div>
                  )
                }
              ]}
            />
          </section>

          <section id="quiz-modulo-9" className="mt-16">

<ModuleConsolidation
              index={9}
              variant={getModuleVariant(9)}
              video={{
                videoId: "kOunF5Z0vWA",
                title: "Integrated Strategies in Action",
                duration: "11:30"
              }}
              resumoVisual={{
                moduloNome: "Módulo 9",
                tituloAula: titulo,
                materia: materiaNome,
                images: [
                  { title: "5-Step Strategy Map", type: "Mapa Mental", placeholderColor: "bg-blue-500/20" },
                  { title: "Petrobras Vocabulary", type: "Esquema", placeholderColor: "bg-cyan-500/20" },
                  { title: "300-400 Word Passage Flow", type: "Fórmula", placeholderColor: "bg-indigo-500/20" }
                ]
              }}
              maceteVisual={{
                title: "O Fluxo de Leitura",
                content: (
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <p className="font-bold text-blue-600">P-Q-S-C-I</p>
                    <p className="text-[10px] leading-tight text-muted-foreground mt-2">
                       Predict → Questions → Skim → Context-scan → Infer
                    </p>
                  </div>
                )
              }}
              audio={{
                audioUrl: "#",
                titulo: "Leitura Integrada",
                artista: "Prof. Douglas"
              }}
            />

                        <QuizInterativo
              questoes={quizPetrobras}
              titulo="Quiz 9 - Petrobras Context"
              icone="🌎"
              numero={9}
              variant="blue"
              onComplete={(score) => handleModuleComplete("modulo-9", score)}
            />
          </section>
        </div>
      </TabsContent>

      {/* ═══ MÓDULO 10: SIMULADO MESTRE ═══ */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <ModuleBanner
          numero={10}
          titulo="SIMULADO MESTRE: CESGRANRIO MASTER EXAM"
          descricao="Teste final: integração completa de todas as 9 estratégias em um simulado autêntico."
          gradiente="bg-gradient-to-br from-purple-300 via-purple-500 to-purple-400"
          variant="purple"
        />

        <RichIntro>
          <p>
            Este é o desafio final — o **Simulado Mestre**. Você terá acesso a um conjunto de **10 questões** que integram todas as competências dos módulos anteriores: **Prediction** (antecipar temas), **Skimming** (identificar propósito geral), **Scanning** (localizar dados específicos), **Inferencing** (deduzir significados), **Main Idea** (sintetizar argumentação), **Critical Reading** (reconhecer tom e intenção), **Text Structure** (navegar organização lógica), e **Petrobras Domain Knowledge** (aplicar contexto real).
          </p>
          <p>
            Não há atalhos aqui — apenas aplicação. Cada questão pode exigir uma combinação diferente de estratégias. Algumas serão diretas (skimming simples), outras sutis (exigindo inferência cuidadosa). O tempo é limitado — em uma prova Cesgranrio real, você teria ~3 minutos por questão. Use essa limitação para treinar **velocidade sob pressão**, a habilidade que mais importa no exame real.
          </p>
          <p>
            Uma pontuação ≥ 70% neste simulado indica que você está **pronto para Cesgranrio**. Abaixo disso, retorne aos módulos onde teve dificuldade e reforce as estratégias específicas. Acima de 85%, você está no **nível de proficiência máxima** esperado para este tipo de prova.
          </p>
          <p>
            Boa sorte. Você treinou o máximo possível. Agora é hora de demonstrar domínio.
          </p>
        </RichIntro>

        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-6">
            <ModuleSectionHeader
              index={10}
              title="Avaliação Final Integrada"
              description="10 questões: teste completo de leitura em inglês instrumental."
              variant={getModuleVariant(10)}
              className="mb-6"
            />

            <AlertBox tipo="info" titulo="📊 Critério de Aprovação">
              Score ≥ 70% (7/10 corretas) = Módulo completo + Aula completa 🎯
              <br/>
              Score 60-69% (6/10 corretas) = Módulo completo, continue a próxima aula
              <br/>
              Score &lt; 60% (5 ou menos corretas) = Revise os módulos anteriores
            </AlertBox>
          </section>

          <section id="quiz-modulo-10" className="mt-16">

<ModuleConsolidation
              index={10}
              variant={getModuleVariant(10)}
              video={{
                videoId: "kOunF5Z0vWA",
                title: "Master Exam Strategies",
                duration: "12:00"
              }}
              resumoVisual={{
                moduloNome: "Módulo 10",
                tituloAula: titulo,
                materia: materiaNome,
                images: [
                  { title: "All 9 Strategies", type: "Mapa Mental", placeholderColor: "bg-purple-500/20" },
                  { title: "Cesgranrio Format", type: "Esquema", placeholderColor: "bg-violet-500/20" },
                  { title: "Performance Benchmarks", type: "Fórmula", placeholderColor: "bg-fuchsia-500/20" }
                ]
              }}
              maceteVisual={{
                title: "O Checklist Final",
                content: (
                  <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                    <p className="font-bold text-purple-600">Antes de Entregar</p>
                    <ul className="text-[10px] leading-tight text-muted-foreground mt-2 space-y-1">
                      <li>✓ Reread main idea questions</li>
                      <li>✓ Verify scanning facts in text</li>
                      <li>✓ Check inference logic twice</li>
                      <li>✓ Confirm tone vocabulary match</li>
                    </ul>
                  </div>
                )
              }}
              audio={{
                audioUrl: "#",
                titulo: "Domínio Completo",
                artista: "Prof. Douglas"
              }}
            />

                        <QuizInterativo
              questoes={quizSimuladoMestre}
              titulo="SIMULADO MESTRE: Master Exam"
              icone="👑"
              numero={10}
              variant="purple"
              onComplete={(score) => {
                handleModuleComplete("modulo-10", score);
                if (score >= 60) onComplete?.();
              }}
            />
          </section>
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
