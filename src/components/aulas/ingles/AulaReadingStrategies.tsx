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
  QUIZ_M5_FINAL,
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
  const [quizFinal] = useState(() => getRandomQuestions(QUIZ_M5_FINAL, 10));

  const isModuleUnlocked = (index: number) => true;

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) {
      setCompletedModules((prev) => {
        const n = new Set(prev);
        n.add(moduleId);
        return n;
      });
      const idx = ["modulo-1", "modulo-2", "modulo-3", "modulo-4", "modulo-5"].findIndex((m) => m === moduleId);
      const pct = Math.round(((idx + 1) / 5) * 100);
      onUpdateProgress?.(pct);
      if (idx < 4) setTimeout(() => setActiveTab(`modulo-${idx + 2}`), 1500);
    }
  };

  useEffect(() => {
    if (currentProgress && currentProgress > 0) {
      const count = Math.floor((currentProgress / 100) * 5);
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
    { id: "modulo-5", label: "Módulo 5", title: "Simulado Final" },
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
          variant="blue"
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
              variant="blue"
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
              variant="blue"
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
              variant="indigo"
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
              variant="indigo"
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
              variant="indigo"
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
              variant="indigo"
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
              variant="amber"
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
                variant="amber"
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
              variant="amber"
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

      {/* ═══ MÓDULO 5: SIMULADO FINAL ═══ */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="SIMULADO FINAL: CESGRANRIO MODE"
          descricao="Hora de aplicar Prediction, Skimming e Scanning em questões reais no padrão Petrobras."
          gradiente="bg-gradient-to-br from-violet-300 via-violet-500 to-violet-400"
          variant="amber"
        />
        <div className="space-y-[50px]">
          <section id="quiz-modulo-5" className="mt-16">
            <QuizInterativo
              questoes={quizFinal}
              titulo="QUIZ: Simulado Final"
              icone="🎯"
              numero={1}
              variant="amber"
              onComplete={(score) => {
                handleModuleComplete("modulo-5", score);
                if (score >= 60) onComplete?.();
              }}
            />
          </section>
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
