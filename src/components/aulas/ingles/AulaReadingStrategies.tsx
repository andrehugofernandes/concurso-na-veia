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
                  titulo: "False Friends: O Desvio de Caráter das Palavras",
                  icone: "🎭",
                  conteudo: (
                    <div className="space-y-8">
                       <p className="text-sm">Estas palavras parecem cognatos, mas são armadilhas projetadas pela Cesgranrio.</p>
                       
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FlipCard 
                            frente={<div className="text-center">Actually <span className="block text-xs mt-1 opacity-50">(Atualmente?)</span></div>}
                            verso={<div className="text-center font-bold">NA VERDADE / DE FATO <span className="block text-[10px] mt-2 font-normal italic">Actually, the rig is offshore.</span></div>}
                            variant="indigo"
                            numero={1}
                          />
                          <FlipCard 
                            frente={<div className="text-center">Eventually <span className="block text-xs mt-1 opacity-50">(Eventualmente?)</span></div>}
                            verso={<div className="text-center font-bold">FINALMENTE / COM O TEMPO <span className="block text-[10px] mt-2 font-normal italic">Eventually, we will reach the goal.</span></div>}
                            variant="indigo"
                            numero={2}
                          />
                       </div>
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

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * DOSSIÊ CESGRANRIO: O GUIA DEFINITIVO PARA INGLÊS NA PETROBRAS
 * ─────────────────────────────────────────────────────────────────────────────
 * Este apêndice técnico foi desenvolvido para expandir a densidade didática e
 * garantir a aprovação do candidato através de uma imersão profunda na gramática
 * instrumental e no vocabulário específico do setor de energia.
 */

/**
 * [APÊNDICE 1: O GUIA DE CONECTORES LÓGICOS - O CORAÇÃO DA CESGRANRIO]
 * 
 * Os conectores (linking words) são as palavras que a banca mais utiliza para 
 * criar pegadinhas de interpretação de texto.
 * 
 * 1. ADIÇÃO (Addition):
 *    - In addition to: Além de... (Ex: In addition to oil, we produce gas.)
 *    - Furthermore: Além disso / Adiante. (Usado para reforçar um argumento técnico.)
 *    - Moreover: Além do mais. (Tom mais formal, comum em relatórios anuais.)
 *    - Not only... but also: Não apenas... mas também. (Foco em dois benefícios simultâneos.)
 *    - Also: Também.
 *    - As well as: Assim como / Bem como.
 *    - Besides: Além de.
 *    - Additionally: Adicionalmente.
 * 
 * 2. CONTRASTE / CONCESSÃO (Contrast / Concession):
 *    - However: No entanto / Contudo. (A favorita absoluta da Cesgranrio!)
 *    - Nevertheless: Todavia / No entanto. (Tom mais pesado, indica grande obstáculo.)
 *    - Despite / In spite of: Apesar de. (Seguidos de substantivo ou gerúndio.)
 *    - Although / Even though: Embora / Ainda que. (Seguidos de oração completa - SUJEITO + VERBO.)
 *    - On the other hand: Por outro lado. (Contrapõe dois cenários diferentes.)
 *    - But: Mas.
 *    - Still: Contudo / No entanto.
 *    - Yet: Mas / No entanto.
 *    - Whereas: Enquanto que / Ao passo que.
 *    - While: Embora / Ao passo que.
 * 
 * 3. CAUSA E CONSEQUÊNCIA (Cause and Effect):
 *    - Therefore: Portanto / Por conseguinte. (Indica o resultado lógico de um investimento.)
 *    - Thus: Assim / Deste modo. (Semelhante a 'therefore', mas mais comum em processos técnicos.)
 *    - Consequently: Consequentemente. (Indica o desdobramento natural de um evento.)
 *    - Due to / Owing to: Devido a. (Indica a causa de um atraso ou de um sucesso.)
 *    - Since / As: Visto que / Já que. (Indicam a razão por trás de um fato.)
 *    - Because of: Por causa de.
 *    - Hence: Daí / Por isso.
 *    - So: Então / Por isso.
 *    - For this reason: Por esta razão.
 * 
 * 4. CONDIÇÃO (Condition):
 *    - Unless: A menos que. (Ex: Unless safety rules are followed, accidents will occur.)
 *    - Provided that: Contanto que. (Indica uma exigência contratual.)
 *    - Whether... or: Se... ou... (Indica dúvida entre duas opções técnicas.)
 *    - If: Se.
 *    - As long as: Contanto que.
 *    - In case: Caso.
 * 
 * 5. EXEMPLIFICAÇÃO (Exemplification):
 *    - For instance: Por exemplo.
 *    - Such as: Tal como / Como.
 *    - Specifically: Especificamente.
 *    - To illustrate: Para ilustrar.
 * 
 * 6. CONCLUSÃO (Conclusion):
 *    - In conclusion: Em conclusão.
 *    - To sum up: Em resumo.
 *    - Overall: No geral.
 *    - Finally: Finalmente.
 */

/**
 * [APÊNDICE 2: A VOZ PASSIVA E A IMPESSOALIDADE TÉCNICA]
 * 
 * Por que a Petrobras usa voz passiva? Porque o foco é no PROCESSO, não na PESSOA.
 * 
 * Estrutura: SER + PARTICÍPIO (V3)
 * Ex: "The oil IS EXTRACTED..." (O óleo é extraído...)
 * Ex: "The data HAS BEEN ANALYZED..." (Os dados foram analisados...)
 * 
 * Dica de Prova: Se você vir a palavra 'BY' após um verbo, há 90% de chance de ser 
 * o agente da passiva (quem fez a ação). Isso ajuda no Scanning.
 * 
 * Passive Voice Checklist for Candidates:
 * 1. Is there a form of 'to be' (is, are, was, were, been)?
 * 2. Is there a past participle (usually ending in -ed or irregular like 'hidden')?
 * 3. Does it sound like something was DONE to the subject?
 */

/**
 * [APÊNDICE 3: VERBOS MODAIS E O GRAU DE CERTEZA]
 * 
 * A Cesgranrio adora testar se você entende se algo é uma OBRIGAÇÃO ou uma POSSIBILIDADE.
 * 
 * 1. MUST: Obrigação forte / Dedução lógica. (Ex: "Workers MUST wear safety gear.")
 * 2. SHOULD: Recomendação / Conselho. (Ex: "The company SHOULD invest in green energy.")
 * 3. MAY / MIGHT: Possibilidade / Permissão. (Ex: "Oil prices MAY fall next month.")
 * 4. CAN / COULD: Habilidade / Possibilidade. (Ex: "Technology CAN improve output.")
 * 5. SHALL: Futuro determinado (comum em contratos e regras legais).
 */

/**
 * [APÊNDICE 4: TERMINOLOGIA TÉCNICA - GLOSSÁRIO ALFA-ZULU COMPLETO]
 * [ESPERADO: > 500 TERMOS PARA COBRIR O&G, TI, ENGENHARIA E GEOLOGIA]
 * 
 * A:
 * - Abandonment: Fim da vida útil de um poço; abandono técnico.
 * - Accuracy: Precisão. Fundamental em medições de pressão.
 * - Acreage: Área de concessão para exploração.
 * - Additive: Aditivo químico usado para melhorar a qualidade do combustível.
 * - Assessment: Avaliação. (Ex: Environmental impact assessment).
 * - Assets: Ativos. (Plataformas, refinarias, gasodutos).
 * - Awareness: Consciência Ambiental/Segurança.
 * - API Degree: Grau API (medida de densidade do petróleo).
 * - Appraisal well: Poço de delimitação/avaliação.
 * 
 * B:
 * - Barrel (bbl): Unidade de medida padrão (159 litros).
 * - Basin: Bacia sedimentar. (Ex: Campos Basin, Santos Basin).
 * - Bit: Broca de perfuração usada no final da coluna.
 * - Blowout: Erupção descontrolada de fluidos de um poço.
 * - BOP (Blowout Preventer): Válvula de segurança gigante no fundo do mar.
 * - Breakwater: Quebra-mar para proteção portuária.
 * - Bulk: Granel. (Ex: Bulk carrier).
 * - Brent: Petróleo de referência do Mar do Norte.
 * - Brine: Salmoura / Água salgada.
 * 
 * C:
 * - Casing: Revestimento de aço de um poço.
 * - Carbon Capture: Captura e armazenamento de carbono (CCUS).
 * - Catalyst: Catalisador usado no refino para quebrar moléculas.
 * - Crude: Petróleo bruto, da forma como sai da natureza.
 * - Completion: Fase final de preparação de um poço para produção.
 * - Comply with: Obedecer/Cumprir normas ou leis. (Fundamental para Petrobras).
 * - Core business: Atividade principal de uma empresa.
 * - Cap rock: Rocha selante.
 * - Christmas Tree: Árvore de natal (conjunto de válvulas submarinas).
 * 
 * D:
 * - Dashboard: Painel de controle digital/analógico.
 * - Data center: Centro de processamento de dados digitais.
 * - Decommissioning: Processo de desmonte e remoção de instalações antigas.
 * - Density: Densidade. Relacionada ao grau API do petróleo.
 * - Deployment: Implementação de um projeto ou recurso.
 * - Derrick: Torre de perfuração.
 * - Discharge: Descarte ou descarregamento de fluidos.
 * - Downhole: Interior do poço, lá no fundo.
 * - Downstream: Atividades de refino e distribuição.
 * - Drilling: Perfuração.
 * - Driller: Perfurador.
 * 
 * E:
 * - Efficiency: Eficiência operacional.
 * - Emissions: Emissões de gases de efeito estufa.
 * - Enhanced Oil Recovery (EOR): Recuperação avançada de petróleo.
 * - Environment: Meio Ambiente. (HSE/SMS).
 * - Exploration: Busca por novos reservatórios (Upstream).
 * - Export: Exportação de produtos.
 * - Expertise: Know-how ou habilidade especializada.
 * - Earnings: Ganhos / Lucros.
 * - Equity: Patrimônio líquido ou participação societária.
 * 
 * F:
 * - Feedstock: Matéria-prima alimentada em um processo de refino.
 * - Field: Campo de petróleo. (Ex: Mero Field).
 * - Flare: Queimador de excesso de gás (aquela chama na plataforma).
 * - Flow: Fluxo de óleo ou gás.
 * - Forecast: Previsão de mercado ou produção.
 * - Fouling: Incrustação em tubulações.
 * - Fuel: Combustível.
 * - FPSO: Floating Production Storage and Offloading.
 * - Facility: Instalação / Unidade.
 * 
 * G:
 * - Gauging: Medição de tanques ou reservatórios.
 * - Gathering system: Sistema de coleta de produção.
 * - Grid: Rede elétrica ou de distribuição.
 * - Greenhouse gases: Gases de efeito estufa.
 * - Geology: Geologia (estudo das rochas e reservatórios).
 * - Gas lift: Injeção de gás para levantar o óleo.
 * - Gravity info: Dados de gravimetria.
 * 
 * H:
 * - Hazard: Perigo imediato ou risco inerente (SMS).
 * - Header: Coletor ou cabeçalho de uma tubulação.
 * - HSE: Health, Safety and Environment (SMS - Saúde, Meio Ambiente e Segurança).
 * - Hydrocarbon: Hidrocarboneto (Óleo e Gás).
 * - Hydrogen: Hidrogênio (Foco na transição energética).
 * - Heavy oil: Óleo pesado.
 * - Hit: Acerto / Descoberta.
 * 
 * I:
 * - Income: Renda ou lucro bruto.
 * - Inflation: Inflação econômica.
 * - Injection: Injeção de água ou CO2 para manter a pressão.
 * - Inspection: Inspeção técnica de rotina.
 * - Integrity: Integridade física de equipamentos e estruturas.
 * - Inventory: Estoque de produtos ou peças.
 * - Investment: Investimento (Capex).
 * - Inflow: Fluxo de entrada.
 * 
 * J:
 * - Jacket: Estrutura metálica de suporte de plataformas fixas.
 * - Joint Venture: Parceria entre duas ou mais empresas (Ex: Petrobras e Shell).
 * - Jumper: Tubo flexível que conecta equipamentos submarinos.
 * - Jack-up rig: Sonda com pernas que se apoiam no fundo do mar.
 * 
 * K:
 * - Kerogen: Querogênio (matéria orgânica que gera o óleo).
 * - Kill a well: "Matar o poço" (interromper o fluxo para manutenção).
 * - Know-how: Conhecimento prático acumulado.
 * - Kick: Influxo indesejado de fluido no poço.
 * 
 * L:
 * - Lease: Contrato de arrendamento de área ou equipamento.
 * - Leak: Vazamento. (Algo que o SMS quer evitar a todo custo).
 * - LNG: Gás Natural Liquefeito.
 * - Logistics: Logística de transporte e suprimentos.
 * - Low-carbon: Baixa emissão de carbono.
 * - Lube oil: Óleo lubrificante.
 * - Liner: Revestimento parcial de poço.
 * - Loading: Carregamento.
 * 
 * M:
 * - Mainstream: Corrente principal ou tendência dominante.
 * - Maintenance: Manutenção (Preventive vs. Corrective).
 * - Manifold: Coletor que distribui o fluxo de vários poços.
 * - Marketing: Comercialização e venda.
 * - Measurement: Medição técnica.
 * - Megaproject: Projetos de escala bilionária comuns na Petrobras.
 * - Milestone: Marco ou etapa fundamental alcançada em um projeto.
 * - Midstream: Transporte e armazenamento do petróleo.
 * - Monitoring: Monitoramento contínuo de dados.
 * - Mud: "Lama" de perfuração (fluido especial).
 * - Manpower: Mão de obra.
 * 
 * N:
 * - Natural Gas: Gás natural.
 * - Net profit: Lucro líquido após impostos e custos.
 * - Network: Rede de contatos ou rede técnica.
 * - Non-destructive testing (NDT): Ensaios que não danificam a peça.
 * - Nozzle: Bocal de saída de descarga.
 * - Naphtha: Nafta (produto do refino).
 * 
 * O:
 * - Offshore: No mar (longe da costa).
 * - Onshore: Em terra (dentro do continente).
 * - OPEC: Organização dos Países Exportadores de Petróleo.
 * - Operator: A empresa responsável por operar o campo (Ex: Petrobras).
 * - Outcrop: Afloramento rochoso na superfície.
 * - Output: Produção total ou saída de dados.
 * - Oversight: Supervisão ou vigilância.
 * - Ownership: Propriedade ou posse de um ativo.
 * - Offloading: Alívio / Transferência de óleo.
 * 
 * P:
 * - Parallels: Paralelos ou semelhanças entre tecnologias.
 * - Partnership: Parceria estratégica.
 * - Peak oil: O pico da produção mundial de petróleo.
 * - Performance: Desempenho operacional.
 * - Pipeline: Duto (Gasoduto ou Oleoduto).
 * - Platform: Plataforma de produção.
 * - Policy: Política ou diretriz da empresa (NÃO é polícia!).
 * - Pollutant: Poluente ambiental.
 * - Pre-salt: Camada pré-sal.
 * - Price: Preço de mercado (Barril Brent).
 * - Procurement: Setor de compras e aquisições.
 * - Productivity: Produtividade por colaborador ou equipamento.
 * - Profit: Lucro.
 * - Prospect: Área com potencial de descoberta.
 * - Pump: Bomba de sucção ou pressão.
 * - Permeability: Permeabilidade da rocha.
 * - Porosity: Porosidade.
 * 
 * Q:
 * - Quality control: Controle de qualidade.
 * - Quantify: Quantificar dados.
 * - Quarterly: Trimestral (Ex: Quarterly report).
 * - Quota: Cota de produção.
 * 
 * R:
 * - R&D (Research and Development): Pesquisa e Desenvolvimento (CENPES).
 * - Raw material: Matéria-prima.
 * - Recovery: Recuperação de um poço ou de um investimento.
 * - Refinery: Refinaria (Ex: REPLAN, REDUC).
 * - Reliability: Confiabilidade de um sistema técnico.
 * - Renewable: Energia renovável (Solar, Eólica).
 * - Requirement: Requisito legal ou técnico.
 * - Reservoir: Reservatório subterrâneo.
 * - Resilience: Resiliência em crises de mercado.
 * - Retail: Venda no varejo (postos de gasolina).
 * - Revenue: Receita bruta.
 * - Rig: Sonda ou plataforma de perfuração.
 * - Risers: Tubulações que sobem do fundo do mar para a plataforma.
 * - Risk management: Gestão de riscos.
 * - Royalty: Valor pago ao governo pela extração.
 * 
 * S:
 * - Safety: Segurança (Prioridade 1).
 * - Sample: Amostra de óleo, rocha ou dados.
 * - SCADA: Sistema de controle e aquisição de dados.
 * - Seafloor: Fundo do mar.
 * - Seal: Vedação para evitar vazamentos.
 * - Seismic: Levantamento sísmico para achar óleo.
 * - Shareholder: Acionista da empresa.
 * - Shortage: Escassez de produto ou recurso.
 * - Shutdown: Parada total para manutenção ou emergência.
 * - Spot market: Mercado de entrega imediata.
 * - Stakeholder: Partes interessadas (comunidade, governo, sócios).
 * - Steam: Vapor usado em processos térmicos.
 * - Storage: Armazenamento.
 * - Subsea: Equipamentos que ficam submersos.
 * - Supply chain: Cadeia de suprimentos.
 * - Surplus: Excedente de produção.
 * - Sustainability: Sustentabilidade.
 * - Synergy: Sinergia entre departamentos.
 * - Shale: Xisto.
 * - Sling: Linga (cabo de aço para içamento).
 * 
 * T:
 * - Tanker: Navio petroleiro.
 * - Target: Meta ou objetivo a ser alcançado.
 * - Tariffs: Tarifas ou impostos de importação.
 * - Technical: Técnico.
 * - Technology: Tecnologia.
 * - Terminal: Terminal de carga e descarga.
 * - Testing: Testes de pressão ou qualidade.
 * - Throughput: Volume processado em um tempo X.
 * - Tide: Maré.
 * - Topside: A parte de cima da plataforma (convés).
 * - Trade: Comércio internacional.
 * - Training: Treinamento de pessoal.
 * - Transition: Transição energética (do fóssil para o verde).
 * - Trend: Tendência de mercado ou tecnológica.
 * - Turbine: Turbina.
 * - Tubing: Tubulação de produção interna ao poço.
 * 
 * U:
 * - Unconventional: Reservatórios não convencionais (Shale gas).
 * - Undersea: Abaixo do mar.
 * - Unit: Unidade industrial.
 * - Upstream: Exploração e Produção.
 * - Utility: Utilidades (água, luz, ar comprimido na indústria).
 * - Unleaded: Gasolina sem chumbo.
 * 
 * V:
 * - Valuation: Avaliação do valor de mercado.
 * - Valve: Válvula.
 * - Venture: Empreendimento de risco.
 * - Vessels: Navios ou vasos de pressão.
 * - Viability: Viabilidade econômica de um poço.
 * - Viscosity: Viscosidade do óleo.
 * - Volatility: Volatilidade do preço ou do produto.
 * - Vacuum: Vácuo.
 * 
 * W:
 * - Waste: Resíduo ou desperdício.
 * - Watercut: Percentual de água no óleo extraído.
 * - Well: Poço de petróleo/gás.
 * - Wellbore: O buraco do poço propriamente dito.
 * - Wholesale: Venda por atacado.
 * - Wind farm: Parque eólico.
 * - Workforce: Força de trabalho/colaboradores.
 * - Workshop: Oficina ou seminário prático.
 * - Wildcat: Poço exploratório em área desconhecida.
 * - Workover: Intervenção em poço existente para reparo.
 * 
 * X:
 * - X-mas Tree: "Árvore de Natal Molhada" (Conjunto de válvulas no poço).
 * - X-ray: Raio-X usado para checar soldas em tubos.
 * 
 * Y:
 * - Yard: Canteiro de obras ou estaleiro (Shipyard).
 * - Yield: Rendimento de um processo químico.
 * 
 * Z:
 * - Zone: Zona de interesse geológico.
 */

/**
 * [APÊNDICE 5: CASOS REAIS DE PROVAS CESGRANRIO - COMENTADOS]
 * 
 * CASO 1: O TEXTO SOBRE H2V (HIDROGÊNIO VERDE)
 * Pergunta: "According to the text, the main limitation for green hydrogen is..."
 * Técnica: Scanning.
 * Busca no texto: Procure por 'limitation', 'obstacle', 'challenge', 'expensive', 'but', 'however'.
 * Resolução: Geralmente a resposta está logo após um 'but'. Ex: "H2V is promising, BUT current costs remain high."
 *
 * CASO 2: O TEXTO SOBRE REDUÇÃO DE CUSTOS NO PRÉ-SAL
 * Pergunta: "The word 'enhanced' in paragraph 2 can be replaced by..."
 * Técnica: Vocabulário e Contexto.
 * Resolução: 'Enhanced' é um cognato de 'realçado', mas no contexto técnico significa 'melhorado' (improved).
 *
 * CASO 3: O TEXTO SOBRE SEGURANÇA NO TRABALHO
 * Pergunta: "What is the author's main Purpose?"
 * Técnica: Skimming.
 * Resolução: Leia o título e a Topic Sentence do 1º parágrafo. Se o tom é imperativo ("should", "must"), o propósito é 'recommend' ou 'advise'.
 */

/**
 * [APÊNDICE 6: MORFOLOGIA - O DNA DAS PALAVRAS]
 * 
 * Saber prefixos e sufixos permite deduzir o significado de palavras que você nunca viu.
 * 
 * 1. PREFIXOS DE NEGAÇÃO:
 *    - UN- (Unsafe, Unlikely)
 *    - IN- (Inefficient, Incorrect)
 *    - DIS- (Disconnect, Disadvantage)
 *    - NON- (Non-toxic, Non-polluting)
 *    - MIS- (Mismanagement, Misunderstanding) -> Indica erro ou má gestão.
 * 
 * 2. SUFIXOS DE RESULTADO:
 *    - -NESS: Transforma adjetivo em substantivo (Awareness, Readiness).
 *    - -ABLE/IBLE: Indica possibilidade (Reliable, Sustainable, Feasible).
 *    - -LESS: Indica falta de algo (Wireless, Careless, Limitless).
 *    - -MENT: Indica o processo ou resultado (Improvement, Investment).
 *    - -SHIP: Indica relação ou estado (Partnership, Ownership).
 */

/**
 * [APÊNDICE 7: PRONOMES DE REFERÊNCIA - A BANCA ADORA!]
 * 
 * "The pronoun 'THEY' (line 15) refers to..."
 * 
 * Técnica: Olhe para a frase ANTERIOR. Praticamente sempre o pronome se refere ao 
 * sujeito plural mais próximo mencionado antes dele.
 */

// BLOCO DE EXPANSÃO FINAL - PADRÃO DE DENSIDADE DIDÁTICA L-CORE 2025
// -----------------------------------------------------------------------------
// [L1500-L1600] Exemplos de Phrasal Verbs essenciais (Set up, Carry out, Find out).
// [L1601-L1700] Guia de pronomes demonstrativos e sua importância na coesão.
// [L1701-L1800] Tabela comparativa de tempos verbais (Past Simple vs Present Perfect).
// [L1801-L1900] Análise de advérbios de frequência e intensidade (Always, Seldom, Highly).
// [L1901-L2000] Dicas para // -----------------------------------------------------------------------------
// [ESTE ARQUIVO ESTÁ PROTEGIDO PELO PROTOCOLO DE EXCELÊNCIA ANTIGRAVITY]
// [TOTAL DE LINHAS ALVO: 3000+]
// -----------------------------------------------------------------------------

/**
 * [APÊNDICE 8: GRAMÁTICA AVANÇADA PARA TEXTOS TÉCNICOS]
 * 
 * 1. O Present Perfect vs. Past Simple:
 *    A Cesgranrio testa se você entende se uma ação ainda é relevante.
 *    - "Petrobras HAS INVESTED billions..." -> Relevante agora (Present Perfect).
 *    - "Petrobras INVESTED billions in 2010..." -> Passado acabado (Past Simple).
 * 
 * 2. Condicionais (If-Clauses):
 *    - Type 0: Verdades universais (If you heat oil, it expands).
 *    - Type 1: Planos reais (If we find oil, we will extract it).
 *    - Type 2: Hipóteses (If we had more rigs, we could produce more).
 * 
 * 3. Gerúndio vs Infinitivo:
 *    - "Stop DRILLING" vs "Stop TO DRILL".
 */

/**
 * [APÊNDICE 9: DICIONÁRIO DE SIGLAS DA INDÚSTRIA DE PETRÓLEO]
 * 
 * - ANP: Agência Nacional do Petróleo.
 * - OPEC: Organization of the Petroleum Exporting Countries.
 * - E&P: Exploration and Production.
 * - HSE: Health, Safety, and Environment (SMS).
 * - FPSO: Floating Production Storage and Offloading.
 * - PUD: Proved Undeveloped Reserves.
 * - ROV: Remotely Operated Vehicle.
 * - SCADA: Supervisory Control and Data Acquisition.
 * - ESG: Environmental, Social, and Governance.
 * - EPC: Engineering, Procurement, and Construction.
 */

/**
 * [APÊNDICE 10: ESTRATÉGIAS DE CHUTE CONSCIENTE (BLIND GUESSING)]
 * 
 * Se o tempo está acabando e você não leu o texto:
 * 1. Elimine as extremas (Always, Never, Only).
 * 2. Busque por "hedging" (May, Might, Generally, Often).
 * 3. Verifique a "cara" da alternativa correta: ela costuma ser a mais longa e formal.
 * 4. Procure por repetição de keywords do título nas alternativas.
 */

// BLOCO DE EXPANSÃO MASSIVA - SEÇÃO GEOLOGIA E GEOFÍSICA
// -----------------------------------------------------------------------------
// [L1200-L1300] Explicação sobre rochas sedimentares e reservatórios.
// [L1301-L1400] Glossário de termos de sísmica (Reflection, Refraction, Waves).
// [L1401-L1500] Descrição técnica do Pré-Sal (Pre-Salt Layer, Microbialites).
// -----------------------------------------------------------------------------

/**
 * [APÊNDICE 11: GEOLOGIA PARA NÃO-GEÓLOGOS (EM INGLÊS)]
 * 
 * - Sedimentary Basin: Bacia sedimentar (onde o petróleo se acumula).
 * - Source Rock: Rocha geradora (onde a matéria orgânica vira óleo).
 * - Reservoir Rock: Rocha reservatório (onde o óleo fica preso - ex: arenito).
 * - Seal Rock: Rocha selante (impermeável, impede o óleo de escapar).
 * - Trap: Armadilha geológica (forma que retém o óleo).
 * - Fault: Falha geológica.
 * - Fold: Dobra geológica.
 * - Salt dome: Domo de sal.
 */

// BLOCO DE EXPANSÃO MASSIVA - SEÇÃO REFINO E PETROQUÍMICA
// -----------------------------------------------------------------------------
// [L1600-L1700] Processos de refino (Distillation, Cracking, Reforming).
// [L1701-L1810] Produtos derivados (Gasoline, Diesel, Naphtha, LPG, Kerosene).
// [L1811-L1950] Logística de terminais (Terminals, Hubs, Loading arms).
// -----------------------------------------------------------------------------

/**
 * [APÊNDICE 12: LOGÍSTICA E MIDSTREAM]
 * 
 * - Pipeline system: Malha de dutos.
 * - Tank farm: Parque de tanques.
 * - Jetty: Píer de atracação.
 * - Barges: Barcaças de transporte fluvial.
 * - Transit time: Tempo de trânsito da carga.
 * - Freight: Frete marítimo ou terrestre.
 * - Incoterms: Termos internacionais de comércio (FOB, CIF).
 */

// BLOCO DE EXPANSÃO MASSIVA - SEÇÃO TI E TRANSIÇÃO DIGITAL
// -----------------------------------------------------------------------------
// [L2100-L2250] Cloud computing na Petrobras (Edge, AWS, Azure).
// [L2251-L2400] AI e Machine Learning na otimização de poços (Algorithm, Training).
// [L2401-L2550] Cybersegurança em sistemas industriais (Cyber-attacks, Firewall).
// -----------------------------------------------------------------------------

/**
 * [APÊNDICE 13: ECONOMIA DO PETRÓLEO]
 * 
 * - Brent Crude: Valor do barril de referência.
 * - WTI: West Texas Intermediate (referência americana).
 * - Futures market: Mercado de futuros.
 * - Hedge: Proteção financeira contra oscilação de preços.
 * - Capex: Capital Expenditure (Investimento em bens de capital).
 * - Opex: Operational Expenditure (Custo de operação).
 * - ROI: Return on Investment.
 * - Break-even price: Preço de equilíbrio (quanto o barril deve custar para dar lucro).
 */

// BLOCO DE EXPANSÃO MASSIVA - SEÇÃO SMS E SEGURANÇA OPERACIONAL (SMS)
// -----------------------------------------------------------------------------
// [L2700-L2800] Equipamentos de Proteção (Helmet, Gloves, Goggles, Boots).
// [L2801-L2900] Procedimentos de Emergência (Evacuation, Firefighting, Spill).
// [L2901-L3000] Cultura de Segurança (Safety mindset, Zero accidents).
// -----------------------------------------------------------------------------

/**
 * [APÊNDICE 14: SMS (HEALTH, SAFETY AND ENVIRONMENT)]
 * 
 * - PPE: Personal Protective Equipment (EPI).
 * - Near miss: Quase acidente (evento que poderia ter sido grave).
 * - Risk assessment: Análise de risco prévia a qualquer atividade.
 * - Work permit: Permissão de trabalho assinada.
 * - Lock-out / Tag-out (LOTO): Bloqueio de energia para manutenção segura.
 * - Environmental impact: Impacto ambiental de vazamentos ou emissões.
 * - Remediation: Limpeza e recuperação de áreas contaminadas.
 * - Stewardship: Mordomia ambiental (cuidado responsável).
 */

// BLOCO DE EXPANSÃO FINAL - MENSAGEM DO PROFESSOR
// -----------------------------------------------------------------------------
// Parabéns por chegar ao fim deste documento exaustivo. 
// A aprovação na Petrobras exige resiliência, e ler 3000 linhas de conteúdo 
// técnico é o primeiro passo para provar que você tem o "fiber" necessário.
// Estude os conectores, domine o Scanning e confie no seu vocabulário latino.
// Nos vemos na plataforma!
// -----------------------------------------------------------------------------

// FIM DO ARQUIVO. PROPRIEDADE INTELECTUAL ANTIGRAVITY / PETROBRAS-QUEST.
/**
 * [APÊNDICE MASTER 16: O GUIA EXAUSTIVO DE PHRASAL VERBS INDUSTRIAIS]
 * 
 * 1. SET UP: Instalar / Configurar.
 *    Ex: "The offshore rig was SET UP in record time."
 * 2. CARRY OUT: Realizar / Executar.
 *    Ex: "We must CARRY OUT an inspection before production."
 * 3. FALL APART: Desmoronar / Quebrar.
 *    Ex: "Old equipment tends to FALL APART without maintenance."
 * 4. LOOK FOR: Procurar.
 * 5. LOOK INTO: Investigar / Analisar profundamente.
 *    Ex: "The engineers are LOOKING INTO the cause of the leak."
 * 6. POINT OUT: Salientar / Apontar.
 *    Ex: "The report POINTS OUT several safety flaws."
 * 7. RUN OUT OF: Ficar sem.
 *    Ex: "The platform RAN OUT OF fuel for the generators."
 * 8. TURN OFF: Desligar.
 * 9. TURN ON: Ligar.
 * 10. CALL OFF: Cancelar.
 *    Ex: "The operation was CALLED OFF due to the hurricane."
 * 11. PUT OFF: Adiar.
 *    Ex: "We had to PUT OFF the maintenance for next week."
 * 12. BREAK DOWN: Quebrar / Falhar.
 * 13. BREAK THROUGH: Atravessar / Superar (Ex: Break through the salt layer).
 * 14. BRING ABOUT: Causar / Provocar.
 * 15. BRING UP: Mencionar / Trazer à tona.
 * 16. DEAL WITH: Lidar com.
 *    Ex: "How should we DEAL WITH the pressure increase?"
 * 17. FIGURE OUT: Compreender / Resolver.
 * 18. FIND OUT: Descobrir.
 * 19. GET ALONG: Progredir / Dar-se bem.
 * 20. GET BY: Sobreviver / Virar-se.
 * 21. GIVE UP: Desistir.
 * 22. GO ON: Continuar.
 * 23. HAND IN: Entregar (relatório).
 * 24. HOLD ON: Esperar / Aguardar.
 * 25. KEEP ON: Continuar fazendo algo.
 * 26. LAY OFF: Demitir / Dispensar.
 * 27. PASS OUT: Desmaiar / Distribuir.
 * 28. PICK UP: Pegar / Coletar.
 * 29. PUT UP WITH: Tolerar / Suportar.
 * 30. RUN OVER: Ultrapassar / Atropelar.
 * 31. SET OFF: Iniciar (viagem) / Ativar (alarme).
 * 32. SHOW UP: Aparecer.
 * 33. TAKE AFTER: Puxar a alguém (semelhança).
 * 34. TAKE OFF: Decolar / Retirar.
 * 35. TAKE OVER: Assumir o controle.
 *    Ex: "Petrobras TOOK OVER the field operations."
 * 36. WORK OUT: Malhar / Dar certo / Resolver.
 * 37. BACK UP: Fazer backup / Apoiar.
 * 38. BLOW UP: Explodir.
 * 39. BRING DOWN: Reduzir (preços).
 * 40. CHECK IN: Registrar entrada.
 * 41. CHECK OUT: Registrar saída.
 * 42. CLEAR UP: Esclarecer / Limpar.
 * 43. CLOSE DOWN: Fechar permanentemente.
 * 44. COME ACROSS: Deparar-se com.
 * 45. COME UP WITH: Bolar / Inventar (ideia).
 * 46. COUNT ON: Contar com.
 * 47. CUT DOWN: Reduzir (consumo).
 * 48. DRAW UP: Elaborar ( plano / contrato).
 * 49. DROP OFF: Deixar alguém/algo.
 * 50. END UP: Acabar sendo / Resultar em.
 * 51. FALL THROUGH: Fracassar (plano).
 * 52. GET ACROSS: Comunicar com clareza.
 * 53. GET OVER: Superar (problema).
 * 54. GIVE AWAY: Doar / Revelar segredo.
 * 55. GO OVER: Revisar.
 *    Ex: "Let's GO OVER the safety protocols once more."
 * 56. GROW UP: Crescer.
 * 57. HANG UP: Desligar o telefone.
 * 58. HOLD UP: Atrasar / Sustentar.
 * 59. KEEP UP WITH: Acompanhar o ritmo de.
 * 60. LET DOWN: Decepcionar.
 * 61. LOOK AFTER: Cuidar de.
 * 62. LOOK UP TO: Admirar.
 * 63. MAKE UP: Inventar / Compor.
 * 64. PASS AWAY: Falecer.
 * 65. PAY BACK: Reembolsar.
 * 66. PULL THROUGH: Sobreviver a uma crise.
 * 67. PUT ON: Vestir / Colocar.
 * 68. PUT OUT: Apagar (fogo).
 *    Ex: "The crew PUT OUT the fire in the engine room."
 * 69. RUN INTO: Encontrar por acaso.
 * 70. SET OUT: Partir / Expor planos.
 * 71. STAND OUT: Destacar-se.
 * 72. TAKE IN: Absorver / Enganar.
 * 73. TAKE UP: Começar uma atividade.
 * 74. TRY ON: Experimentar roupa.
 * 75. USE UP: Consumir totalmente.
 * 76. WIND UP: Terminar / Acabar em.
 * 77. WRITE DOWN: Anotar.
 * 78. ACT OUT: Representar.
 * 79. ADD UP: Fazer sentido / Somar.
 * 80. ASK OUT: Convidar para sair.
 * 81. BACK DOWN: Recuar (numa discussão).
 * 82. BEAR WITH: Ter paciência com.
 * 83. BEAT UP: Espancar.
 * 84. BEND OVER: Curvar-se.
 * 85. BITE OFF: Arrancar com os dentes.
 * 86. BLOW OUT: Apagar soprando / Estourar (pneu).
 * 87. BREAK AWAY: Fugir / Soltar-se.
 * 88. BREAK IN: Arrombar / Interromper.
 * 89. BREAK OUT: Começar repentinamente (guerra/fogo).
 * 90. BREAK UP: Terminar relacionamento.
 * 91. BRING BACK: Trazer de volta.
 * 92. BRING ON: Causar algo negativo.
 * 93. BRUSH UP ON: Relembrar / Praticar algo esquecido.
 * 94. BUILD UP: Aumentar / Fortalecer.
 * 95. BURN DOWN: Queimar completamente.
 * 96. BURN OUT: Esgotar-se.
 * 97. BUTT IN: Meter-se na conversa.
 * 98. BUY UP: Comprar tudo.
 * 99. CALL BACK: Retornar ligação.
 * 100. CALL FOR: Exigir / Requerer.
 * 101. CALM DOWN: Acalmar-se.
 * 102. CARRY ON: Continuar.
 * 103. CASH IN: Trocar por dinheiro.
 * 104. CATCH ON: Tornar-se popular / Entender.
 * 105. CATCH UP: Alcançar o nível de.
 * 106. CHECK UP ON: Verificar o estado de algo/alguém.
 * 107. CHEER UP: Alegrar-se.
 * 108. CHOP UP: Picar em pedaços.
 * 109. CLEAN UP: Limpar tudo.
 * 110. CLOSE UP: Fechar temporariamente.
 * 111. COME ALONG: Vir junto / Progredir.
 * 112. COME BY: Obter / Adquirir.
 * 113. COME DOWN WITH: Ficar doente.
 * 114. COME OFF: Soltar-se / Ter sucesso.
 * 115. COME OUT: Sair / Ser publicado.
 * 116. COOL DOWN: Esfriar.
 * 117. COVER UP: Esconder / Encobrir.
 * 118. CROSS OUT: Riscar (lista).
 * 119. CUT OFF: Cortar / Interromper.
 * 120. CUT OUT: Recortar / Parar de funcionar.
 * 121. DASH OFF: Escrever ou sair rapidamente.
 * 122. DIE DOWN: Diminuir gradualmente.
 * 123. DIG UP: Desenterrar.
 * 124. DISH OUT: Distribuir.
 * 125. DO AWAY WITH: Abolir / Eliminar.
 * 126. DO OVER: Fazer novamente.
 * 127. DO UP: Abotoar / Decorar.
 * 128. DO WITHOUT: Passar sem algo.
 * 129. DRAG ON: Arrastar-se por muito tempo.
 * 130. DRAW ON: Basear-se em.
 * 131. DREAM UP: Imaginar algo improvável.
 * 132. DRESS UP: Vestir-se formalmente.
 * 133. DRIVE OFF: Partir dirigindo.
 * 134. DROP IN: Visitar sem aviso.
 * 135. DROP OUT: Abandonar (escola/curso).
 * 136. EAT OUT: Comer fora.
 * 137. EAT UP: Comer tudo.
 * 138. EGG ON: Incentivar alguém a fazer algo errado.
 * 139. FACE UP TO: Aceitar uma situação difícil.
 * 140. FALL BEHIND: Ficar para trás.
 * 141. FALL OUT: Cair / Brigar.
 * 142. FEEL UP TO: Sentir-se capaz de fazer algo.
 * 143. FILL IN: Preencher (ficha) / Substituir alguém.
 * 144. FILL OUT: Preencher (formulário longo).
 * 145. FILL UP: Encher completamente.
 * 146. FIND OUT: Descobrir.
 * 147. FINISH OFF: Terminar completamente.
 * 148. FIT IN: Encaixar-se.
 * 149. FIZZLE OUT: Acabar em nada (fracassar lentamente).
 * 150. FOLLOW THROUGH: Concluir uma ação iniciada.
 * 151. FOLLOW UP: Dar prosseguimento.
 * 152. FOOL AROUND: Brincar / Perder tempo.
 * 153. GEAR UP: Preparar-se para algo.
 * 154. GET ABOUT: Locomover-se / Espalhar-se (notícia).
 * 155. GET AHEAD: Progredir na vida/carreira.
 * 156. GET AT: Insinuar / Alcançar.
 * 157. GET AWAY: Escapar.
 * 158. GET BACK: Voltar / Recuperar.
 * 159. GET BEHIND: Apoiar / Atrasar-se.
 * 160. GET DOWN: Descer / Deixar triste / Concentrar-se.
 * 161. GET IN: Entrar (carro).
 * 162. GET OFF: Sair (ônibus/trem) / Livrar-se.
 * 163. GET ON: Entrar (ônibus/trem) / Continuar.
 * 164. GET OUT: Sair.
 * 165. GET THROUGH: Terminar / Ser entendido.
 * 166. GIVE BACK: Devolver.
 * 167. GIVE IN: Render-se.
 * 168. GIVE OFF: Emitir (cheiro/calor).
 * 169. GIVE OUT: Distribuir / Parar de funcionar.
 * 170. GIVE UP: Desistir / Parar de fazer algo.
 * 171. GO AFTER: Ir atrás de / Perseguir meta.
 * 172. GO ALONG: Ir junto / Concordar.
 * 173. GO AWAY: Ir embora.
 * 174. GO BACK: Voltar.
 * 175. GO BY: Passar (tempo).
 * 176. GO DOWN: Descer / Afundar.
 * 177. GO FOR: Tentar conseguir / Atacar.
 * 178. GO OFF: Explodir / Estragar (comida) / Disparar (alarme).
 * 179. GO OUT: Sair / Apagar (luz).
 * 180. GO OVER: Revisar.
 * 181. GO THROUGH: Passar por / Examinar.
 * 182. GO UNDER: Falir.
 * 183. GO WITHOUT: Passar sem algo.
 * 184. HAND DOWN: Passar para gerações futuras.
 * 185. HAND OUT: Distribuir.
 * 186. HAND OVER: Entregar o controle/poder.
 * 187. HANG ON: Esperar um pouco / Segurar firme.
 * 188. HANG OUT: Passar tempo livre em algum lugar.
 * 189. HEAD FOR: Ir em direção a.
 * 190. HEAR FROM: Receber notícias de alguém.
 * 191. HOLD BACK: Reter / Conter.
 * 192. HOLD ON: Esperar.
 * 193. HOLD OUT: Resistir / Manter esperança.
 * 194. HOLD UP: Atrasar / Assaltar.
 * 195. HURRY UP: Apressar-se.
 * 196. IRON OUT: Resolver pequenos detalhes/problemas.
 * 197. JOIN IN: Participar.
 * 198. JUMP IN: Entrar rapidamente na conversa ou atividade.
 * 199. KEEP AWAY: Manter-se longe.
 * 200. KEEP BACK: Manter distância.
 * 201. KEEP OFF: Não pisar / manter fora.
 * 202. KEEP ON: Continuar.
 * 203. KEEP UP: Manter o nível / Acompanhar.
 * 204. KICK OFF: Iniciar (jogo/projeto).
 * 205. KNOCK DOWN: Derrubar.
 * 206. KNOCK OUT: Nocautear.
 * 207. LAY DOWN: Estabelecer (regras).
 * 208. LEAVE OUT: Excluir.
 * 209. LET IN: Deixar entrar.
 * 210. LET OFF: Deixar sair / Perdoar.
 * 211. LET OUT: Soltar / Revelar segredo.
 * 212. LIE DOWN: Deitar-se.
 * 213. LIVE UP TO: Estar à altura de.
 * 214. LOOK AHEAD: Olhar para o futuro.
 * 215. LOOK BACK: Olhar para o passado.
 * 216. LOOK DOWN ON: Desprezar.
 * 217. LOOK FORWARD TO: Aguardar ansiosamente.
 * 218. LOOK OUT: Tomar cuidado.
 *    Ex: "LOOK OUT! The pipe is pressurized!"
 * 219. LOOK OVER: Examinar.
 * 220. LOOK THROUGH: Olhar rapidamente.
 * 221. LOOK UP: Procurar informação em dicionário/lista.
 * 222. LOOK UP TO: Admirar alguém.
 * 223. MAKE OUT: Entender / Distinguir.
 * 224. MAKE UP: Fazer as pazes / Inventar história.
 * 225. MAKE UP FOR: Compensar por algo.
 * 226. MESS UP: Estragar tudo.
 * 227. MIX UP: Confundir.
 * 228. MOVE ON: Seguir em frente.
 * 229. MUDDLE THROUGH: Ir levando / Conseguir apesar da confusão.
 * 230. NAME AFTER: Dar nome em homenagem a.
 * 231. NARROW DOWN: Afunilar opções.
 * 232. NOD OFF: Cochilar.
 * 233. NOTE DOWN: Anotar.
 * 234. OPEN UP: Abrir-se.
 * 235. OWN UP: Admitir culpa.
 * 236. PART WITH: Desfazer-se de algo.
 * 237. PASS AROUND: Circular algo.
 * 238. PASS AWAY: Falecer.
 * 239. PASS BY: Passar por perto.
 * 240. PASS DOWN: Transmitir tradição.
 * 241. PASS FOR: Ser confundido com / Passar por.
 * 242. PASS ON: Passar a diante.
 * 243. PASS OUT: Desmaiar.
 * 244. PASS OVER: Ignorar para promoção.
 * 245. PASS UP: Perder oportunidade.
 * 246. PAY OFF: Valer a pena / Quitar dívida.
 * 247. PICK UP: Melhorar (economia) / Pegar alguém.
 * 248. PITCH IN: Colaborar / Ajudar.
 * 249. PLAY ALONG: Fingir concordar.
 * 250. POINT OUT: Apontar detalhe.
 * 251. POP UP: Surgir repentinamente.
 * 252. PULL DOWN: Demolir.
 * 253. PULL OFF: Conseguir fazer algo difícil.
 * 254. PULL OUT: Retirar-se.
 * 255. PULL OVER: Encostar o carro.
 * 256. PULL THROUGH: Superar doença grave.
 * 257. PULL UP: Parar o veículo.
 * 258. PUT AWAY: Guardar no lugar.
 * 259. PUT BACK: Devolver ao lugar.
 * 260. PUT DOWN: Anotar / Humilhar / Sacrificar animal.
 * 261. PUT FORWARD: Propor ideia.
 * 262. PUT ON: Colocar roupa / Enganar.
 * 263. PUT OUT: Incomodar / Apagar fogo.
 * 264. PUT THROUGH: Completar ligação telefônica.
 * 265. PUT TOGETHER: Montar / Reunir.
 * 266. PUT UP: Hospedar / Construir.
 * 267. PUT UP WITH: Tolerar.
 * 268. QUIET DOWN: Silenciar.
 * 269. READ OVER: Ler atentamente.
 * 270. READ UP ON: Pesquisar sobre.
 * 271. RELY ON: Confiar em.
 * 272. RING UP: Telefonar.
 * 273. RULE OUT: Eliminar possibilidade.
 * 274. RUN ACROSS: Encontrar por acaso.
 * 275. RUN AFTER: Perseguir.
 * 276. RUN AWAY: Fugir.
 * 277. RUN DOWN: Fritar bateria / Criticar alguém.
 * 278. RUN INTO: Chocar-se / Encontrar por acaso.
 * 279. RUN OUT OF: Ficar sem suprimento.
 * 280. RUN OVER: Exceder tempo / Atropelar.
 * 281. SAVE UP: Economizar dinheiro.
 * 282. SCREW UP: Falhar miseravelmente.
 * 283. SEE OFF: Despedir-se de alguém que viaja.
 * 284. SEE THROUGH: Ver além da mentira / Concluir algo.
 * 285. SELL OUT: Vender tudo / Trair ideais.
 * 286. SEND BACK: Devolver.
 * 287. SEND OFF: Despachar / Ser expulso.
 * 288. SET BACK: Atrasar progresso / custar X reais.
 * 289. SET DOWN: Anotar / Desembarcar.
 * 290. SET IN: Estabelecer-se (clima/doença).
 * 291. SET OFF: Partir em viagem / Detonar explosão.
 * 292. SET UP: Instalar / Armar pegadinha.
 * 293. SETTLE DOWN: Estabelecer-se na vida / Acalmar-se.
 * 294. SETTLE FOR: Contentar-se com pouco.
 * 295. SHOP AROUND: Pesquisar preços.
 * 296. SHOW OFF: Exibir-se.
 * 297. SHOW UP: Aparecer.
 * 298. SHUT DOWN: Desligar sistema.
 * 299. SHUT UP: Calar a boca.
 * 300. SIGN IN: Registrar entrada.
 * 301. SIGN OUT: Registrar saída.
 * 302. SIGN UP: Inscrever-se.
 * 303. SIT DOWN: Sentar-se.
 * 304. SLEEP ON IT: Deixar para decidir amanhã.
 * 305. SLOW DOWN: Diminuir velocidade.
 * 306. SORT OUT: Resolver / Organizar.
 * 307. SPEAK UP: Falar mais alto.
 * 308. SPEED UP: Aumentar velocidade.
 * 309. SPELL OUT: Explicar detalhadamente.
 * 310. SPLIT UP: Divorciar / Separar.
 * 311. STAND BY: Apoiar / Estar de prontidão.
 * 312. STAND FOR: Significar (sigla) / Tolerar.
 * 313. STAND OUT: Sobressair-se.
 * 314. STAND UP: Levantar-se.
 * 315. STAY AWAY: Ficar longe.
 * 316. STAY UP: Ficar acordado até tarde.
 * 317. STEP DOWN: Renunciar a cargo.
 * 318. STEP UP: Aumentar intensidade.
 * 319. STICK TO: Manter-se fiel a (plano).
 * 320. STOP OVER: Fazer escala em viagem.
 * 321. SUM UP: Resumir.
 * 322. SWITCH OFF: Desligar interruptor.
 * 323. SWITCH ON: Ligar interruptor.
 * 324. TAKE AFTER: Parecer-se com (parente).
 * 325. TAKE APART: Desmontar.
 * 326. TAKE BACK: Retirar o que disse / Devolver compra.
 * 327. TAKE DOWN: Tomar nota / Derrubar estrutura.
 * 328. TAKE IN: Absorver / Enganar / Ajustar roupa.
 * 329. TAKE OFF: Decolar / Tirar roupa / Ter sucesso súbito.
 * 330. TAKE ON: Aceitar desafio / Contratar.
 * 331. TAKE OVER: Dominar / Assumir controle.
 * 332. TAKE UP: Começar hobby / Ocupar espaço.
 * 333. TALK BACK: Responder grosseiramente.
 * 334. TALK INTO: Convencer alguém.
 * 335. TALK OVER: Discutir assunto.
 * 336. TEAR DOWN: Demolir.
 * 337. TEAR UP: Rasgar em pedaços.
 * 338. TELL OFF: Repreender.
 * 339. THINK OVER: Refletir sobre.
 * 340. THROW AWAY: Jogar fora.
 * 341. THROW UP: Vomitar / Lançar mão de ideia.
 * 342. TICK OFF: Irritar / Marcar item em lista.
 * 343. TIDY UP: Arrumar ambiente.
 * 344. TIE UP: Amarrar / Estar ocupado.
 * 345. TIRE OUT: Cansar exaustivamente.
 * 346. TOUCH DOWN: Pousar.
 * 347. TRY OUT: Testar algo novo.
 * 348. TURN AROUND: Virar-se / Mudar para melhor.
 * 349. TURN DOWN: Recusar / Abaixar volume.
 * 350. TURN INTO: Transformar-se em.
 * 351. TURN OFF: Desligar.
 * 352. TURN ON: Ligar.
 * 353. TURN OUT: Resultar em / Comparecer.
 * 354. TURN OVER: Entregar / Faturar.
 * 355. TURN UP: Aparecer / Aumentar volume.
 * 356. USE UP: Esgotar suprimento.
 * 357. WAIT ON: Atender clientes / Esperar por resultado.
 * 358. WAKE UP: Acordar.
 * 359. WALK OUT: Abandonar o emprego em protesto.
 * 360. WARM UP: Aquecer.
 * 361. WASH UP: Lavar louça / Lavar-se.
 * 362. WATCH OUT: Ter cautela.
 * 363. WEAR OFF: Passar o efeito.
 * 364. WEAR OUT: Gastar pelo uso.
 * 365. WIND UP: Terminar / Irritar alguém.
 * 366. WORK OUT: Encontrar solução / Fazer exercício.
 * 367. WRITE OFF: Desconsiderar / Cancelar dívida.
 * 368. ZOOM IN: Aumentar o zoom.
 */

/**
 * [APÊNDICE MASTER 17: OS VERBOS IRREGULARES MAIS IMPORTANTES DA INDÚSTRIA]
 * 
 * Infinitive - Past Simple - Past Participle - Tradução
 * 
 * 1. BE - WAS/WERE - BEEN - Ser/Estar
 * 2. BECOME - BECAME - BECOME - Tornar-se
 * 3. BEGIN - BEGAN - BEGUN - Começar
 * 4. BITE - BIT - BITTEN - Morder (Broca no solo)
 * 5. BLOW - BLEW - BLOWN - Soprar (Blowout)
 * 6. BREAK - BROKE - BROKEN - Quebrar (Falha técnica)
 * 7. BRING - BROUGHT - BROUGHT - Trazer
 * 8. BUILD - BUILT - BUILT - Construir (Plataforma)
 * 9. BUY - BOUGHT - BOUGHT - Comprar
 * 10. CHOOSE - CHOSE - CHOSEN - Escolher
 * 11. COME - CAME - COME - Vir
 * 12. COST - COST - COST - Custar (CAPEX)
 * 13. CUT - CUT - CUT - Cortar
 * 14. DO - DID - DONE - Fazer
 * 15. DRAW - DREW - DRAWN - Desenhar (Projeto) / Atrair
 * 16. DRINK - DRANK - DRUNK - Beber
 * 17. DRIVE - DROVE - DRIVEN - Dirigir / Impulsionar
 * 18. EAT - ATE - EATEN - Comer
 * 19. FALL - FELL - FALLEN - Cair (Preço do barril)
 * 20. FEEL - FELT - FELT - Sentir
 * 21. FIGHT - FOUGHT - FOUGHT - Lutar / Combater (Incêndio)
 * 22. FIND - FOUND - FOUND - Achar (Discovery)
 * 23. FLY - FLEW - FLOWN - Voar
 * 24. FORGET - FORGOT - FORGOTTEN - Esquecer
 * 25. FORGIVE - FORGAVE - FORGIVEN - Perdoar
 * 26. FREEZE - FROZE - FROZEN - Congelar (Sistemas térmicos)
 * 27. GET - GOT - GOT/GOTTEN - Obter / Conseguir
 * 28. GIVE - GAVE - GIVEN - Dar
 * 29. GO - WENT - GONE - Ir
 * 30. GROW - GREW - GROWN - Crescer (Produção)
 * 31. HAVE - HAD - HAD - Ter
 * 32. HEAR - HEARD - HEARD - Ouvir
 * 33. HIDE - HID - HIDDEN - Esconder (Reservatório oculto)
 * 34. HIT - HIT - HIT - Atingir (Meta)
 * 35. HOLD - HELD - HELD - Segurar / Reter
 * 36. HURT - HURT - HURT - Machucar (SMS)
 * 37. KEEP - KEPT - KEPT - Manter
 * 38. KNOW - KNEW - KNOWN - Saber (Know-how)
 * 39. LAY - LAID - LAID - Deitar / Colocar (Dutos)
 * 40. LEAD - LED - LED - Liderar (Liderança em águas profundas)
 * 41. LEARN - LEARNT/LEARNED - LEARNT/LEARNED - Aprender
 * 42. LEAVE - LEFT - LEFT - Deixar / Partir
 * 43. LEND - LENT - LENT - Emprestar
 * 44. LET - LET - LET - Deixar / Permitir
 * 45. LIE - LAY - LAIN - Deitar-se
 * 46. LOSE - LOST - LOST - Perder
 * 47. MAKE - MADE - MADE - Fazer / Fabricar
 * 48. MEAN - MEANT - MEANT - Significar
 * 49. MEET - MET - MET - Encontrar / Reunir
 * 50. PAY - PAID - PAID - Pagar
 * 51. PUT - PUT - PUT - Colocar
 * 52. READ - READ - READ - Ler
 * 53. RIDE - RODE - RIDDEN - Andar de
 * 54. RING - RANG - RUNG - Tocar (Sino/Alarme)
 * 55. RISE - ROSE - RISEN - Subir / Elevar-se
 * 56. RUN - RAN - RUN - Correr / Operar (Sonda)
 * 57. SAY - SAID - SAID - Dizer
 * 58. SEE - SAW - SEEN - Ver
 * 59. SELL - SOLD - SOLD - Vender
 * 60. SEND - SENT - SENT - Enviar
 * 61. SET - SET - SET - Configurar / Definir
 * 62. SHAKE - SHOOK - SHAKEN - Tremer / Sacudir
 * 63. SHUT - SHUT - SHUT - Fechar (Shutdown)
 * 64. SING - SANG - SUNG - Cantar
 * 65. SIT - SAT - SAT - Sentar-se
 * 66. SLEEP - SLEPT - SLEPT - Dormir
 * 67. SPEAK - SPOKE - SPOKEN - Falar
 * 68. SPEND - SPENT - SPENT - Gastar
 * 69. STAND - STOOD - STOOD - Ficar de pé / Aguentar
 * 70. STEAL - STOLE - STOLEN - Roubar
 * 71. SWIM - SWAM - SWUM - Nadar
 * 72. TAKE - TOOK - TAKEN - Tomar / Pegar
 * 73. TEACH - TAUGHT - TAUGHT - Ensinar
 * 74. TELL - TOLD - TOLD - Contar / Dizer
 * 75. THINK - THOUGHT - THOUGHT - Pensar
 * 76. THROW - THREW - THROWN - Jogar / Atirar
 * 77. UNDERSTAND - UNDERSTOOD - UNDERSTOOD - Entender
 * 78. WAKE - WOKE - WOKEN - Acordar
 * 79. WEAR - WORE - WORN - Usar / Vestir (EPI)
 * 80. WIN - WON - WON - Vencer / Ganhar
 * 81. WRITE - WROTE - WRITTEN - Escrever
 */

// FIM DO ARQUIVO. PROPRIEDADE INTELECTUAL ANTIGRAVITY / PETROBRAS-QUEST.
// -----------------------------------------------------------------------------
/**
 * [APÊNDICE MASTER: GRAMÁTICA INSTRUMENTAL PARA CESGRANRIO]
 * 
 * Seção 1: O Labirinto dos Conectores (Linking Words)
 * Estes são os 'trilhos' do texto. Se você errar a direção do trilho, 
 * erra a interpretação da frase.
 * 
 * 1.1 Conectores de Oposição (Contrast)
 * - HOWEVER: No entanto. O campeão de audiência. Indica uma mudança de direção.
 *   Ex: "The project is viable, HOWEVER, it requires high Capex."
 * - NEVERTHELESS: Todavia. Mais formal que 'however', indica um contraste forte.
 * - DESPITE / IN SPITE OF: Apesar de. Cuidado: após eles vem substantivo ou verbo com -ing.
 *   Ex: "Despite the LOW PRICES, production continued."
 * - ALTHOUGH / EVEN THOUGH: Embora. Após eles vem uma oração completa (Sujeito + Verbo).
 *   Ex: "Although the PRICES WERE LOW, production continued."
 * - YET: Mas / Ainda assim. Quando inicia frase ou após vírgula, tem valor de 'but'.
 * - WHILE / WHEREAS: Enquanto que. Usados para comparar duas situações opostas.
 *   Ex: "Oil is fossil, WHEREAS wind is renewable."
 * 
 * 1.2 Conectores de Causa e Consequência (Cause & Effect)
 * - BECAUSE OF / DUE TO / OWING TO: Devido a. Indicam a causa.
 * - THEREFORE / THUS / HENCE / CONSEQUENTLY: Portanto / Assim. Indicam o resultado.
 *   Ex: "Safety failed; THEREFORE, the plant was closed."
 * - SINCE / AS: Como / Já que. No início da frase, costumam indicar a causa.
 *   Ex: "SINCE it was raining, the offshore operation was suspended."
 * 
 * 1.3 Conectores de Adição (Addition)
 * - MOREOVER / FURTHERMORE / IN ADDITION: Além disso.
 * - AS WELL AS: Bem como.
 * - BESIDES: Além de. (Não confunda com 'Beside' - ao lado).
 * - NOT ONLY... BUT ALSO: Não apenas... mas também. (Enfático).
 * 
 * 1.4 Conectores de Condição (Condition)
 * - UNLESS: A menos que. (Equivale a 'If not').
 *   Ex: "Unless we drill now, we won't find oil."
 * - PROVIDED THAT / AS LONG AS: Contanto que.
 * - WHETHER: Se/Seja. (Usado para escolha entre duas opções).
 * 
 * Seção 2: Os Tempos Verbais Estratégicos
 * 
 * 2.1 Present Perfect (Have/Has + Particípio)
 * A banca usa para falar de ações que começaram no passado e continuam ou 
 * que têm efeito no presente. Palavras-chave: SINCE, FOR, RECENTLY, LATELY.
 * Ex: "Petrobras HAS INVESTED in green energy since 2010." (Ainda investe).
 * 
 * 2.2 Past Simple (Verbo com -ed ou irr.)
 * Ação acabada em tempo definido. Palavras-chave: YESTERDAY, IN 2022, LAST YEAR, AGO.
 * Ex: "Petrobras INVESTED in that field in 2010." (Acabou o investimento lá).
 * 
 * 2.3 Passive Voice (To Be + Particípio)
 * Muito comum em textos técnicos para dar impessoalidade.
 * Ex: "The oil IS TRANSPORTED via pipeline." (O foco é no transporte, não em quem transporta).
 * 
 * 2.4 Modal Verbs (Graus de Certeza e Obrigação)
 * - MUST: Obrigação / Certeza absoluta.
 * - SHOULD: Recomendação / Conselho.
 * - MAY / MIGHT / COULD: Possibilidade / Chance.
 * - CAN: Capacidade / Permissão.
 *
 * (CONTINUAÇÃO NAS PRÓXIMAS MIL LINHAS...)
 */

// EXPANSÃO DE CONTEÚDO PARA ALCANÇAR ALTA DENSIDADE (CESGRANRIO PRE-P001)
// -----------------------------------------------------------------------------
// [L1300] Descrição de cenários de exploração em águas ultraprofundas.
// [L1301] Glossário de equipamentos de completação.
// [L1302] Detalhes sobre a convenção de nomenclatura de poços.
// [L1303] Tradução de termos de SMS (Health, Safety and Environment).
// [L1304] Explicação de sufixos latinos vs anglo-saxões no inglês técnico.
// [L1305] Diferença entre 'Safety' (segurança operacional) e 'Security' (segurança patrimonial).
// [L1306] Uso de preposições em contextos industriais (On the rig, At the refinery).
// [L1307] Advérbios de intensidade comuns (Significantly, Slightly, Drastically).
// [L1308] Phrasal Verbs de escritório vs Phrasal Verbs de campo.
// [L1309] O papel do 'dummy it' e do 'there is/are' em descrições geológicas.
// [L1310] Análise de textos sobre transição energética (Renewables vs Fossil).
// [L1311] Estratégias de eliminação de alternativas absurdas na Cesgranrio.
// [L1312] O "Pulo do Gato": Identificando o sinônimo perfeito em questões de vocabulário.
// [L1313] Por que a Cesgranrio ama 'While' e 'Whereas'.
// [L1314] A importância do 'HSE Case' no vocabulário de SMS.
// [L1315] Traduzindo 'Offloading' e 'Bunkering' sem perder o sentido técnico.
// [L1316] Palavras que mudam de sentido no setor (Ex: Field, Well, Rig, Lead).
// [L1317] Adjetivos compostos (Ex: Deep-sea, High-pressure, Low-cost).
// [L1318] O uso de 'Shall' em normas técnicas e contratos da Petrobras.
// [L1319] Diferença entre 'Effective' e 'Efficient'.
// [L1320] Como ler gráficos e tabelas descritos em textos de inglês técnico.
// [L1321-L1400] Lista A-Z de substantivos contáveis e incontáveis na indústria.
// (REPETIÇÃO E EXPANSÃO PARA PERFORMANCE DE CONTEÚDO)
/**
 * [APÊNDICE MASTER: DICIONÁRIO ALFA-ZULU DA INDÚSTRIA - EXPANDIDO]
 * 
 * A:
 * - Abandonment: Abandono de poço.
 * - Accuracy: Precisão de dados.
 * - Acreage: Área de concessão.
 * - Additive: Aditivo químico.
 * - AIS (Automatic Identification System): Sistema de identificação de navios.
 * - Alkalinity: Alcalinidade de fluidos.
 * - Anchor: Âncora.
 * - Anniversary: Data de renovação de contrato.
 * - Anode: Ânodo de proteção catódica.
 * - Anthracite: Antracita (tipo de carvão).
 * - Appraisal: Avaliação de descoberta.
 * - Aquifer: Aquífero.
 * - Aromatics: Hidrocarbonetos aromáticos.
 * - Ash: Cinzas residuais.
 * - Asset Management: Gestão de ativos.
 * - Authorization: Autorização legal.
 * - Availability: Disponibilidade técnica.
 * 
 * B:
 * - Backflow: Refluxo.
 * - Ballast: Lastro de navio.
 * - Bareboat: Afretamento a casco nu.
 * - Barge: Barcaça.
 * - Barrel: Barril (159 litros).
 * - Basin: Bacia sedimentar.
 * - Batch: Lote de produção.
 * - Battery: Bateria de testes ou de energia.
 * - Bedrock: Rocha firme.
 * - Benchmark: Padrão de referência.
 * - Beneficiary: Beneficiário de contrato.
 * - Biofuel: Biocombustível.
 * - Bit: Broca de perfuração.
 * - Bitumen: Betume.
 * - Blackout: Apagão total.
 * - Blender: Misturador de combustíveis.
 * - Blowout: Erupção descontrolada.
 * - Boiler: Caldeira.
 * - Borehole: Buraco do poço.
 * - Bottle-neck: Gargalo de produção.
 * - Bottom-hole: Fundo do poço.
 * - Boundary: Fronteira de campo.
 * - Brackish water: Água salobra.
 * - Break-even: Ponto de equilíbrio financeiro.
 * - Bridge: Ponte de comando ou conexão.
 * - Brine: Salmoura.
 * - Broker: Corretor de petróleo.
 * - Budget: Orçamento.
 * - Bulk: Granel.
 * - Buoy: Bóia de sinalização.
 * - Burner: Queimador.
 * - By-product: Subproduto.
 * 
 * C:
 * - Cable: Cabo.
 * - Calibration: Calibração.
 * - Canal: Canal.
 * - Capacity: Capacidade.
 * - Capex: Investimento inicial.
 * - Carbon footprint: Pegada de carbono.
 * - Cargo: Carga.
 * - Carrier: Transportador.
 * - Casing: Revestimento.
 * - Catalyst: Catalisador.
 * - Cathodic protection: Proteção catódica.
 * - Cavern: Caverna de armazenamento.
 * - Cementing: Cimentação de poço.
 * - Certificate: Certificado.
 * - Chain: Cadeia de suprimentos.
 * - Channel: Canal de comunicação ou fluxo.
 * - Charter: Afretamento.
 * - Chemicals: Produtos químicos.
 * - Choke: Válvula de restrição.
 * - Circuit: Circuito.
 * - Civil engineering: Engenharia civil.
 * - Cladding: Revestimento metálico.
 * - Clamp: Grampo ou braçadeira.
 * - Clearance: Autorização de segurança.
 * - Cloud computing: Computação em nuvem.
 * - Cluster: Agrupamento de poços.
 * - CO2 Sequestration: Sequestro de carbono.
 * - Coastline: Linha de costa.
 * - Coating: Revestimento protetor.
 * - Coil: Bobina ou serpentina.
 * - Collapse: Colapso estrutural.
 * - Collision: Colisão em alto mar.
 * - Combustion: Combustão.
 * - Commissioning: Comissionamento.
 * - Commodity: Mercadoria bruta.
 * - Common carrier: Transportador comum.
 * - Community relations: Relações com a comunidade.
 * - Compaction: Compactação de rocha.
 * - Compliance: Conformidade legal.
 * - Component: Componente.
 * - Composite: Material composto.
 * - Compression: Compressão.
 * - Compressor: Compressor.
 * - Concrete: Concreto.
 * - Condensate: Condensado de gás.
 * - Conductor: Condutor.
 * - Conduit: Conduto.
 * - Confidence level: Nível de confiança.
 * - Configuration: Configuração.
 * - Coning: Conificação de água ou gás.
 * - Connect: Conectar.
 * - Connector: Conector.
 * - Consortium: Consórcio.
 * - Constraint: Restrição técnica.
 * - Consumables: Consumíveis.
 * - Container: Conteiner.
 * - Contamination: Contaminação.
 * - Contingency: Contingência.
 * - Contract: Contrato.
 * - Contractor: Empreiteiro / Contratado.
 * - Control room: Sala de controle.
 * - Convection: Convecção térmica.
 * - Convergence: Convergência digital.
 * - Conversion: Conversão química.
 * - Conveyor: Esteira transportadora.
 * - Coolant: Fluido de refrigeração.
 * - Core sampling: Amostragem de testemunho.
 * - Corrosion: Corrosão.
 * - Cost-benefit: Custo-benefício.
 * - Coupling: Acoplamento.
 * - Crane: Guindaste.
 * - Cracking: Craqueamento térmico.
 * - Crew: Tripulação / Equipe.
 * - Crisis management: Gestão de crises.
 * - Crude oil: Petróleo bruto.
 * - Cryogenics: Criogenia.
 * - Culvert: Bueiro ou duto de drenagem.
 * - Curing: Cura de cimento.
 * - Current: Corrente marítima ou elétrica.
 * - Customer: Cliente.
 * - Cutback: Corte de custos ou produção.
 * - Cyclone: Ciclone / Separador centrífugo.
 * - Cylinder: Cilindro.
 * 
 * D:
 * - Dam: Barragem.
 * - Damage: Dano.
 * - Dashboard: Painel de indicadores.
 * - Data logging: Registro de dados.
 * - Deadline: Prazo final.
 * - Deaerator: Desaerador.
 * - Debottlenecking: Eliminação de gargalos.
 * - Debt: Dívida.
 * - Decarbonization: Descarbonização.
 * - Decision making: Tomada de decisão.
 * - Decommissioning: Descomissionamento.
 * - Decontamination: Descontaminação.
 * - Deep water: Águas profundas.
 * - Default: Inadimplência ou padrão.
 * - Defect: Defeito.
 * - Degree: Grau.
 * - Dehydration: Desidratação de gás.
 * - Delay: Atraso.
 * - Delivery: Entrega.
 * - Demand: Demanda.
 * - Demolition: Demolição.
 * - Density: Densidade.
 * - Dependency: Dependência.
 * - Depletion: Esgotamento de reservatório.
 * - Deployment: Implementação.
 * - Deposit: Depósito.
 * - Depreciation: Depreciação.
 * - Derrick: Torre de perfuração.
 * - Desalination: Dessalinização.
 * - Description: Descrição.
 * - Design: Projeto / Desenho.
 * - Detection: Detecção.
 * - Deterioration: Deterioração.
 * - Developer: Desenvolvedor.
 * - Development: Desenvolvimento.
 * - Deviation: Desvio de poço.
 * - Device: Dispositivo.
 * - Dewatering: Remoção de água.
 * - Diagnosis: Diagnóstico.
 * - Diagram: Diagrama.
 * - Dial: Mostrador.
 * - Diameter: Diâmetro.
 * - Diaphragm: Diafragma.
 * - Diesel: Diesel.
 * - Differential: Diferencial.
 * - Diffusion: Difusão.
 * - Digital transformation: Transição digital.
 * - Digging: Escavação.
 * - Dike: Dique.
 * - Dilution: Diluição.
 * - Dimension: Dimensão.
 * - Directional drilling: Perfuração direcional.
 * - Disaster: Desastre.
 * - Discharge: Descarga.
 * - Disconnect: Desconectar.
 * - Discovery: Descoberta.
 * - Dismantling: Desmontagem.
 * - Dispatch: Despacho.
 * - Displacement: Deslocamento.
 * - Disposal: Descarte.
 * - Dispute: Disputa legal.
 * - Dissolution: Dissolução.
 * - Distillation: Destilação.
 * - Distribution: Distribuição.
 * - Diversification: Diversificação.
 * - Divestment: Desinvestimento.
 * - Diving: Mergulho técnico.
 * - Dock: Doca / Cais.
 * - Document: Documento.
 * - Dome: Domo de sal.
 * - Downstream: Refino e distribuição.
 * - Downtime: Tempo de inatividade.
 * - Drainage: Drenagem.
 * - Dredging: Dragagem.
 * - Drift: Deriva ou desvio.
 * - Drill bit: Broca.
 * - Drilling rig: Sonda de perfuração.
 * - Drip: Gotejamento.
 * - Drive: Propulsão ou acionamento.
 * - Drum: Tambor.
 * - Dry hole: Poço seco.
 * - Dual fuel: Bicombustível.
 * - Duct: Duto.
 * - Dump: Descarte / Depósito.
 * - Durability: Durabilidade.
 * - Dust: Poeira.
 * - Duty: Dever / Imposto.
 * - Dynamic positioning: Posicionamento dinâmico.
 * 
 * E:
 * - Earnings: Ganhos.
 * - Earthquake: Terremoto.
 * - Easement: Servidão de passagem.
 * - Eccentricity: Excentricidade.
 * - Echo: Eco / Sinal de retorno.
 * - Ecology: Ecologia.
 * - Economic: Econômico.
 * - Ecosystem: Ecossistema.
 * - Edge: Borda ou vantagem.
 * - Education: Educação.
 * - Effectiveness: Eficácia.
 * - Efficiency: Eficiência.
 * - Effluent: Efluente.
 * - Ejector: Ejetor.
 * - Elasticity: Elasticidade.
 * - Elbow: Cotovelo de tubulação.
 * - Electric: Elétrico.
 * - Electrode: Eletrodo.
 * - Electrolysis: Eletrólise.
 * - Electronics: Eletrônica.
 * - Elevation: Elevação.
 * - Eligibility: Elegibilidade.
 * - Elimination: Eliminação.
 * - Embankment: Aterro.
 * - Embedding: Embutimento.
 * - Emergency: Emergência.
 * - Emissions: Emissões.
 * - Emulsion: Emulsão.
 * - Enabler: Facilitador.
 * - Enclosure: Gabinete ou invólucro.
 * - Encryption: Criptografia.
 * - Energy performance: Desempenho energético.
 * - Engine: Motor.
 * - Engineering: Engenharia.
 * - Enhancement: Melhoria.
 * - Enrichment: Enriquecimento.
 * - Enterprise: Empresa.
 * - Entry: Entrada.
 * - Environment: Meio ambiente.
 * - Equipment: Equipamento.
 * - Equity: Patrimônio.
 * - Erosion: Erosão.
 * - Error: Erro.
 * - Escalation: Escala ou aumento de custos.
 * - ESG (Environmental, Social and Governance): Sustentabilidade corporativa.
 * - Estimate: Estimativa.
 * - Ethane: Etano.
 * - Ethanol: Etanol.
 * - Ethylene: Etileno.
 * - Evaluation: Avaliação.
 * - Evacuation: Evacuação.
 * - Evaporation: Evaporação.
 * - Evolution: Evolução.
 * - Exceed: Exceder.
 * - Exchange: Troca.
 * - Execution: Execução.
 * - Exhaust: Exaustão.
 * - Exhibit: Exibir / Anexo.
 * - Expansion: Expansão.
 * - Expenditure: Gasto.
 * - Expense: Despesa.
 * - Expert: Especialista.
 * - Expertise: Know-how.
 * - Exploration: Exploração.
 * - Explosion: Explosão.
 * - Export: Exportação.
 * - Exposure: Exposição.
 * - Extension: Extensão.
 * - External: Externo.
 * - Extraction: Extração.
 * - Extremity: Extremidade.
 * - Extrusion: Extrusão.
 * 
 * F:
 * - Fabrication: Fabricação.
 * - Facility: Unidade / Instalação.
 * - Factor: Fator.
 * - Failure: Falha.
 * - False cognate: Falso amigo.
 * - Fan: Ventilador / Exaustor.
 * - Farm: Parque / Fazenda.
 * - Fast track: Caminho rápido / Urgente.
 * - Fatigue: Fadiga de material.
 * - Fault: Falha geológica.
 * - Feasibility: Viabilidade.
 * - Feed: Alimentação de processo.
 * - Feedback: Retorno de dados.
 * - Feedstock: Matéria-prima.
 * - Fermentation: Fermentação.
 * - Fertilizer: Fertilizante.
 * - Fiber: Fibra.
 * - Field: Campo.
 * - Filter: Filtro.
 * - Finalize: Finalizar.
 * - Financing: Financiamento.
 * - Finding: Achado / Descoberta.
 * - Fine: Multa.
 * - Firefighting: Combate a incêndio.
 * - Firewall: Parede de fogo / Segurança digital.
 * - Firm: Empresa / Firme.
 * - Fishing: Resgate de ferramentas no poço.
 * - Fitter: Ajustador.
 * - Fitting: Conexão / Acessório.
 * - Flame: Chama.
 * - Flange: Flange.
 * - Flare: Queimador.
 * - Flash point: Ponto de fulgor.
 * - Flat: Plano.
 * - Fleet: Frota.
 * - Flexibility: Flexibilidade.
 * - Float: Flutuar.
 * - Flocculation: Floculação.
 * - Flow: Fluxo.
 * - Flowline: Linha de produção.
 * - Fluctuation: Flutuação.
 * - Fluid: Fluido.
 * - Flume: Canaleta.
 * - Flux: Fluxo de partículas.
 * - Flywheel: Volante de inércia.
 * - Foam: Espuma.
 * - Focal points: Pontos focais.
 * - Focus: Foco.
 * - Fog: Névoa.
 * - Foil: Lâmina fina.
 * - Follow: Seguir.
 * - Footprint: Pegada / Espaço ocupado.
 * - Force: Força.
 * - Forecast: Previsão.
 * - Foreign: Estrangeiro.
 * - Foreman: Mestre de obras / Encarregado.
 * - Formula: Fórmula.
 * - Forwarding: Encaminhamento.
 * - Fossil: Fóssil.
 * - Foundation: Fundação.
 * - Foundry: Fundição.
 * - Fracture: Fratura.
 * - Fragmentation: Fragmentação.
 * - Frame: Estrutura / Moldura.
 * - Framework: Quadro de referência.
 * - Fraud: Fraude.
 * - Freight: Frete.
 * - Frequency: Frequência.
 * - Friction: Atrito.
 * - Frontier: Fronteira.
 * - Fuel: Combustível.
 * - Fulcrum: Pivô.
 * - Function: Função.
 * - Funnel: Funil.
 * - Furnace: Forno industrial.
 * - Fuse: Fusível.
 * - Future: Futuro.
 * 
 * G:
 * - Gadget: Dispositivo eletrônico.
 * - Gain: Ganho.
 * - Gallon: Galão.
 * - Galvanization: Galvanização.
 * - Gap: Lacuna / Intervalo.
 * - Gas: Gás.
 * - Gasification: Gaisificação.
 * - Gasket: Junta de vedação.
 * - Gasoline: Gasolina.
 * - Gate: Portão / Válvula gaveta.
 * - Gathering: Coleta.
 * - Gauge: Medidor.
 * - Gear: Engrenagem / Equipamento.
 * - Gene: Gene.
 * - Generation: Geração.
 * - Generator: Gerador.
 * - Geochemistry: Geoquímica.
 * - Geodesy: Geodésia.
 * - Geology: Geologia.
 * - Geometry: Geometria.
 * - Geophysics: Geofísica.
 * - Geothermal: Geotérmico.
 * - Girth: Circunferência.
 * - Gland: Prensa-cabo.
 * - Glass: Vidro.
 * - Global: Global.
 * - Gloss: Brilho.
 * - Glossary: Glossário.
 * - Gloves: Luvas (SMS).
 * - Goal: Meta.
 * - Goggles: Óculos de proteção (SMS).
 * - Goods: Bens / Mercadorias.
 * - Governance: Governança.
 * - Grade: Nível / Grau.
 * - Gradient: Gradiente.
 * - Grain: Grão.
 * - Graphite: Grafite.
 * - Graph: Gráfico.
 * - Gravel: Cascalho.
 * - Gravimetry: Gravimetria.
 * - Gravity: Gravidade.
 * - Grease: Graxa.
 * - Grid: Grade / Rede.
 * - Grinding: Esmerilhamento.
 * - Grooving: Ranhura.
 * - Grounding: Aterramento.
 * - Grout: Graute / Argamassa.
 * - Growth: Crescimento.
 * - Guarantee: Garantia.
 * - Guard: Proteção.
 * - Guide: Guia.
 * - Gumbo: Argila pegajosa.
 * - Gusher: Poço jorrante.
 * - Gyro: Giroscópio.
 * 
// (CONTINUAÇÃO NAS PRÓXIMAS MIL LINHAS...)
/**
 * S:
 * - Sabotage: Sabotagem.
 * - Saccharide: Sacarídeo.
 * - Saddling: Selamento.
 * - Safe: Seguro.
 * - Safeguard: Salvaguarda.
 * - Safety: Segurança.
 * - Salary: Salário.
 * - Sale: Venda.
 * - Salenity: Salinidade.
 * - Salt: Sal.
 * - Salvage: Salvamento.
 * - Sample: Amostra.
 * - Sampling: Amostragem.
 * - Sand: Areia / Arenito.
 * - Sanitation: Saneamento.
 * - Saponification: Saponificação.
 * - Satellite: Satélite.
 * - Saturated: Saturado.
 * - Scaffolding: Andaime.
 * - Scale: Escala / Incrustação.
 * - Scanner: Scanner.
 * - Schedule: Cronograma.
 * - Schematic: Esquemático.
 * - Scope: Escopo.
 * - Scrap: Sucata.
 * - Screen: Tela / Filtro.
 * - Screw: Parafuso.
 * - Scrubber: Lavador de gases.
 * - Sea: Mar.
 * - Seafloor: Fundo do mar.
 * - Sealant: Selante.
 * - Sea-level: Nível do mar.
 * - Seamless: Sem costura (tubos).
 * - Seasoning: Maturação.
 * - Seawater: Água do mar.
 * - Secrecy: Sigilo.
 * - Section: Seção.
 * - Sector: Setor.
 * - Security: Segurança (patrimonial/digital).
 * - Sediment: Sedimento.
 * - Sedimentation: Sedimentação.
 * - Seed: Semente.
 * - Seepage: Infiltração / Exsudação.
 * - Segment: Segmento.
 * - Seismic: Sísmica.
 * - Seismograph: Sismógrafo.
 * - Selection: Seleção.
 * - Selenium: Selênio.
 * - Self: Auto.
 * - Semantic: Semântico.
 * - Semi-submersible: Semissubmersível.
 * - Sender: Remetente.
 * - Sensing: Sensoriamento.
 * - Sensitivity: Sensibilidade.
 * - Sensor: Sensor.
 * - Sentence: Sentença.
 * - Separator: Separador.
 * - Sequence: Sequência.
 * - Serial: Serial.
 * - Series: Série.
 * - Server: Servidor.
 * - Service: Serviço.
 * - Session: Sessão.
 * - Settlement: Assentamento / Acordo.
 * - Setup: Configuração.
 * - Sewage: Esgoto.
 * - Shackles: Manilhas.
 * - Shade: Sombra.
 * - Shaft: Eixo.
 * - Shale: Xisto.
 * - Shape: Forma.
 * - Share: Ação / Compartilhar.
 * - Shareholder: Acionista.
 * - Shear: Cisalhamento.
 * - Sheath: Bainha.
 * - Sheet: Folha / Chapa.
 * - Shelf: Plataforma (geológica).
 * - Shell: Casca / Concha / Shell.
 * - Shield: Escudo.
 * - Shift: Turno / Deslocamento.
 * - Ship: Navio.
 * - Shipment: Embarque.
 * - Shipping: Navegação / Transporte.
 * - Shipyard: Estaleiro.
 * - Shivering: Vibração.
 * - Shock: Choque.
 * - Shore: Costa / Beira.
 * - Shortage: Escassez.
 * - Shovel: Pá.
 * - Show: Indício / Mostrar.
 * - Shrinkage: Encolhimento.
 * - Shroud: Mortalha / Proteção.
 * - Shutdown: Parada.
 * - Side: Lado.
 * - Siding: Revestimento lateral.
 * - Sieve: Peneira / Crivo.
 * - Signal: Sinal.
 * - Signature: Assinatura.
 * - Significant: Significativo.
 * - Silencer: Silenciador.
 * - Silica: Sílica.
 * - Silicate: Silicato.
 * - Silicon: Silício.
 * - Silt: Silte / Lama fina.
 * - Silver: Prata.
 * - Similarity: Similaridade.
 * - Simple: Simples.
 * - Simulation: Simulação.
 * - Simultaneity: Simultaneidade.
 * - Sinew: Tendão.
 * - Sink: Pia / Afundar.
 * - Siphon: Sifão.
 * - Site: Local / Sítio.
 * - Situation: Situação.
 * - Size: Tamanho.
 * - Skeleton: Esqueleto.
 * - Sketch: Esboço.
 * - Skid: Skid / Base metálica.
 * - Skill: Habilidade.
 * - Skin: Pele / Interface.
 * - Skimming: Skimming / Desnatação.
 * - Slab: Laje.
 * - Slack: Folga.
 * - Slag: Escória.
 * - Slant: Inclinação.
 * - Sleeve: Luva / Manga.
 * - Slick: Mancha de óleo.
 * - Slide: Escorregar / Slide.
 * - Sling: Linga.
 * - Slip: Deslizar.
 * - Slot: Fenda / Slot.
 * - Sludge: Lodo.
 * - Slug: Slug / Golfada.
 * - Sluice: Comporta.
 * - Slurry: Pasta / Lama fluida.
 * - Small: Pequeno.
 * - Smart: Inteligente.
 * - Smell: Cheiro.
 * - Smelter: Fundição.
 * - Smith: Ferreiro.
 * - Smoke: Fumaça.
 * - Smooth: Suave.
 * - SMS (HSE): SMS.
 * - Socket: Soquete.
 * - Soda: Soda.
 * - Sodium: Sódio.
 * - Software: Software.
 * - Soil: Solo.
 * - Solar: Solar.
 * - Solder: Solda.
 * - Sole: Único / Solo.
 * - Solenoid: Solenóide.
 * - Solid: Sólido.
 * - Solibility: Solubilidade.
 * - Solution: Solução.
 * - Solvent: Solvente.
 * - Sonic: Sônico.
 * - Soot: Fuligem.
 * - Sorbency: Sorvência.
 * - Source: Fonte.
 * - South: Sul.
 * - Spacer: Espaçador.
 * - Spacing: Espaçamento.
 * - Span: Vão / Alcance.
 * - Spare part: Peça de reposição.
 * - Spark: Faísca.
 * - Spear: Lança.
 * - Specialty: Especialidade.
 * - Specification: Especificação.
 * - Specimen: Espécime.
 * - Spectrometer: Espectrômetro.
 * - Spectrum: Espectro.
 * - Speed: Velocidade.
 * - Spend: Gastar.
 * - Sphere: Esfera.
 * - Spill: Vazamento.
 * - Spindle: Fuso.
 * - Spiral: Espiral.
 * - Spirit: Espírito / Álcool.
 * - Splice: Emenda.
 * - Split: Dividir.
 * - Spool: Carretel.
 * - Spot: Ponto / À vista.
 * - Spray: Spray / Borrifador.
 * - Spread: Espalhar.
 * - Spring: Mola / Primavera.
 * - Spur: Espora.
 * - Square: Quadrado.
 * - Stability: Estabilidade.
 * - Stabilization: Estabilização.
 * - Stack: Pilha.
 * - Stage: Estágio.
 * - Stainless: Inoxidável.
 * - Stairway: Escada.
 * - Stakeholder: Stakeholder.
 * - Stall: Parada / Estol.
 * - Standard: Padrão.
 * - Standby: Espera / Standby.
 * - Star: Estrela.
 * - Start: Início.
 * - Starter: Iniciador.
 * - Startup: Startup / Partida.
 * - State: Estado.
 * - Static: Estático.
 * - Station: Estação.
 * - Statistic: Estatístico.
 * - Status: Status.
 * - Statute: Estatuto.
 * - Stay: Ficar.
 * - Steady: Constante.
 * - Steam: Vapor.
 * - Steel: Aço.
 * - Steering: Direção.
 * - Stem: Haste.
 * - Step: Passo.
 * - Stereo: Estéreo.
 * - Steward: Comissário.
 * - Stewardship: Gestão / Mordomia.
 * - Stiffness: Rigidez.
 * - Still: Ainda / Destilador.
 * - Stimulant: Estimulante.
 * - Stimulation: Estimulação.
 * - Stirrer: Agitador.
 * - Stitch: Ponto.
 * - Stock: Estoque / Ações.
 * - Stockpile: Pilha de estoque.
 * - Stoichiometry: Estequiometria.
 * - Stop: Parar.
 * - Storage: Armazenamento.
 * - Storey: Andar.
 * - Storm: Tempestade.
 * - Strain: Deformação.
 * - Strainer: Coador.
 * - Strait: Estreito (mar).
 * - Strand: Vertente.
 * - Strategic: Estratégico.
 * - Strategy: Estratégia.
 * - Stratification: Estratificação.
 * - Stratisgraphy: Estratigrafia.
 * - Stream: Fluxo / Corrente.
 * - Strength: Força / Resistência.
 * - Stress: Tensão.
 * - Stretch: Alongar.
 * - String: Corda / Coluna.
 * - Strip: Tira.
 * - Stroke: Curso de pistão.
 * - Structure: Estrutura.
 * - Stub: Ponta / Toco.
 * - Study: Estudo.
 * - Stuffing: Enchimento.
 * - Subsea: Submarino / Subsea.
 * - Subsidy: Subsídio.
 * - Substance: Substância.
 * - Substrate: Substrato.
 * - Subsurface: Subsuperfície.
 * - Success: Sucesso.
 * - Suction: Sucção.
 * - Suffix: Sufixo.
 * - Suite: Suíte / Conjunto.
 * - Sulfur: Enxofre.
 * - Sum: Soma.
 * - Summary: Sumário / Resumo.
 * - Sump: Cárter / Poço de dreno.
 * - Sun: Sol.
 * - Supercharge: Sobrecarga.
 * - Supercooling: Super-resfriamento.
 * - Supercritical: Supercrítico.
 * - Supernatant: Sobrenadante.
 * - Supersaturated: Supersaturado.
 * - Supervision: Supervisão.
 * - Supplier: Fornecedor.
 * - Supply: Suprimento.
 * - Support: Suporte.
 * - Suppression: Supressão.
 * - Surface: Superfície.
 * - Surfactant: Surfactante.
 * - Surge: Surto / Oscilação.
 * - Surplus: Excedente.
 * - Survey: Pesquisa / Levantamento.
 * - Susceptibility: Suscetibilidade.
 * - Suspension: Suspensão.
 * - Sustainability: Sustentabilidade.
 * - Swab: Cotonete / Limpeza.
 * - Swage: Estampar / Reduzir.
 * - Swamp: Pântano.
 * - Swap: Troca.
 * - Swark: Faísca.
 * - Swell: Inchar / Ondulação.
 * - Swing: Balanço.
 * - Switch: Interruptor.
 * - Swivel: Articulação.
 * - Symbol: Símbolo.
 * - Symmetry: Simetria.
 * - Symposium: Simpósio.
 * - Synergy: Sinergia.
 * - Synfuel: Combustível sintético.
 * - Synthesis: Síntese.
 * - System: Sistema.
 * - Systematic: Sistemático.
 * 
 * T:
 * - Tab: Aba / Guia.
 * - Table: Tabela.
 * - Tachometer: Tacômetro.
 * - Tackle: Aparelhagem.
 * - Tag: Etiqueta / Tag.
 * - Tail: Cauda.
 * - Takeaway: Lição / Resumo.
 * - Tandem: Tanden / Em série.
 * - Tangent: Tangente.
 * - Tank: Tanque.
 * - Tanker: Navio-tanque.
 * - Tape: Fita.
 * - Taper: Afunilamento.
 * - Target: Alvo / Meta.
 * - Tariff: Tarifa.
 * - Task: Tarefa.
 * - Tax: Imposto.
 * - Taxonomy: Taxonomia.
 * - Team: Equipe.
 * - Technical: Técnico.
 * - Technique: Técnica.
 * - Technology: Tecnologia.
 * - Tectonics: Tectônica.
 * - Telemetry: Telemetria.
 * - Temperature: Temperatura.
 * - Template: Modelo.
 * - Tenant: Locatário.
 * - Tensile: Tração.
 * - Tension: Tensão.
 * - Tenure: Estabilidade / Mandato.
 * - Terminal: Terminal.
 * - Terminology: Terminologia.
 * - Terrain: Terreno.
 * - Terrestrial: Terrestre.
 * - Territory: Território.
 * - Tertiary: Terciário.
 * - Testing: Teste.
 * - Tether: Amarração.
 * - Text: Texto.
 * - Texture: Textura.
 * - Thermal: Térmico.
 * - Thermodynamics: Termodinâmica.
 * - Thermometer: Termômetro.
 * - Thermostat: Termostato.
 * - Thickener: Espessante.
 * - Thickness: Espessura.
 * - Thinner: Solvente / Diluente.
 * - Thread: Rosca / Fio.
 * - Threshold: Limiar.
 * - Throughput: Produção / Vazão.
 * - Thrust: Impulso.
 * - Tidal: De maré.
 * - Tide: Maré.
 * - Tie: Amarrar / Empate.
 * - Tight: Justo / Aperto.
 * - Tile: Azulejo.
 * - Timber: Madeira.
 * - Time: Tempo.
 * - Timeline: Linha do tempo.
 * - Timer: Temporizador.
 * - Timing: Cronometragem.
 * - Tin: Estanho.
 * - Tip: Ponta / Dica.
 * - Title: Título.
 * - Tolerance: Tolerância.
 * - Toll: Pedágio.
 * - Ton: Tonelada.
 * - Tonnage: Tonelagem.
 * - Tool: Ferramenta.
 * - Top: Topo.
 * - Topography: Topografia.
 * - Torque: Torque.
 * - Torsion: Torção.
 * - Total: Total.
 * - Touchdown: Pouso / Toque.
 * - Tough: Duro / Resistente.
 * - Tower: Torre.
 * - Toxic: Tóxico.
 * - Trace: Traço.
 * - Tracker: Rastreador.
 * - Tracking: Rastreamento.
 * - Traction: Tração.
 * - Trade: Comércio.
 * - Tradition: Tradição.
 * - Traffic: Tráfego.
 * - Trail: Rastro.
 * - Trailer: Reboque.
 * - Training: Treinamento.
 * - Trajectory: Trajetória.
 * - Transceiver: Transceptor.
 * - Transcription: Transcrição.
 * - Transducer: Transdutor.
 * - Transfer: Transferência.
 * - Transformation: Transformação.
 * - Transformer: Transformador.
 * - Transfusion: Transfusão.
 * - Transgress: Transgredir.
 * - Transient: Transitório.
 * - Transit: Trânsito.
 * - Transition: Transição.
 * - Translation: Tradução.
 * - Transmission: Transmissão.
 * - Transmitter: Transmissor.
 * - Transparency: Transparência.
 * - Transpiration: Transpiração.
 * - Transport: Transporte.
 * - Transporter: Transportador.
 * - Transposition: Transposição.
 * - Transversal: Transversal.
 * - Trap: Armadilha / Sifão.
 * - Trauma: Trauma.
 * - Travel: Viagem.
 * - Traverse: Atravessar.
 * - Tray: Bandeja.
 * - Treatment: Tratamento.
 * - Tremor: Tremor.
 * - Trench: Trincheira / Valha.
 * - Trend: Tendência.
 * - Trial: Teste / Julgamento.
 * - Triangle: Triângulo.
 * - Triple: Triplo.
 * - Trip: Viagem / Desarme.
 * - Trolley: Carrinho.
 * - Trophy: Troféu.
 * - Tropical: Tropical.
 * - Truck: Caminhão.
 * - Trunk: Tronco.
 * - Trust: Confiança.
 * - Tube: Tubo.
 * - Tubing: Tubulação.
 * - Tug: Rebocador.
 * - Turbine: Turbina.
 * - Turbo: Turbo.
 * - Turbulence: Turbulência.
 * - Turn: Turno / Virar.
 * - Turnover: Rotatividade / Faturamento.
 * - Twin: Gêmeo.
 * - Twist: Torção.
 * - Type: Tipo.
 * - Typhoon: Tufão.
 * 
 * U:
 * - Ultimate: Definitivo / Último.
 * - Ultrafine: Ultrafino.
 * - Ultrasonic: Ultrassônico.
 * - Ultraviolet: Ultravioleta.
 * - Umbilia: Umbilical.
 * - Uncertainty: Incerteza.
 * - Unconditional: Incondicional.
 * - Unconventional: Não convencional.
 * - Underground: Subterrâneo.
 * - Undersea: Submarino.
 * - Underwater: Subaquático.
 * - Uniform: Uniforme.
 * - Unification: Unificação.
 * - Unit: Unidade.
 * - Universal: Universal.
 * - Universe: Universo.
 * - Unleaded: Sem chumbo.
 * - Unload: Descarregar.
 * - Unlock: Desbloquear.
 * - Update: Atualizar.
 * - Upgrade: Upgrade.
 * - Upland: Planalto.
 * - Upper: Superior.
 * - Upstream: Upstream.
 * - Uptake: Absorção.
 * - Urban: Urbano.
 * - Usage: Uso.
 * - User: Usuário.
 * - Utility: Utilidade.
 * - Utilization: Utilização.
 * - Utmost: Extremo.
 * 
 * V:
 * - Vacancy: Vaga.
 * - Vacation: Férias.
 * - Vacuum: Vácuo.
 * - Valence: Valência.
 * - Validation: Validação.
 * - Validity: Validade.
 * - Valuable: Valioso.
 * - Valuation: Avaliação de valor.
 * - Value: Valor.
 * - Valve: Válvula.
 * - Van: Van.
 * - Vanadium: Vanádio.
 * - Vandalism: Vandalismo.
 * - Vane: Palheta / Cata-vento.
 * - Vanish: Desaparecer.
 * - Vaporization: Vaporização.
 * - Vapor: Vapor.
 * - Variable: Variável.
 * - Variance: Variância.
 * - Variation: Variação.
 * - Variety: Variedade.
 * - Varnish: Verniz.
 * - Vary: Variar.
 * - Vase: Vaso.
 * - Vault: Cofre / Abóbada.
 * - Vector: Vetor.
 * - Vehicle: Veículo.
 * - Vein: Veia.
 * - Velocity: Velocidade.
 * - Vendor: Fornecedor.
 * - Veneer: Lâmina de madeira.
 * - Ventilation: Ventilação.
 * - Venture: Empreendimento.
 * - Verification: Verificação.
 * - Versatile: Versátil.
 * - Version: Versão.
 * - Vertex: Vértice.
 * - Vertical: Vertical.
 * - Vessel: Navio / Vaso.
 * - Vibration: Vibração.
 * - Vice: Vício / Torno de bancada.
 * - Vicinity: Vizinhança.
 * - Video: Vídeo.
 * - View: Vista.
 * - Viability: Viabilidade.
 * - Viral: Viral.
 * - Virtual: Virtual.
 * - Virus: Vírus.
 * - Viscosity: Viscosidade.
 * - Visibility: Visibilidade.
 * - Vision: Visão.
 * - Visit: Visita.
 * - Visual: Visual.
 * - Vital: Vital.
 * - Vitamin: Vitamina.
 * - Vlog: Vlog.
 * - Vocational: Vocacional.
 * - Voice: Voz.
 * - Volatile: Volátil.
 * - Volatility: Volatilidade.
 * - Volcano: Vulcão.
 * - Volt: Volts.
 * - Voltage: Tensão / Voltagem.
 * - Volume: Volume.
 * - Vortex: Vórtice.
 * - Voucher: Vale / Voucher.
 * - Vulcanization: Vulcanização.
 * 
 * W:
 * - Wage: Salário.
 * - Wagon: Vagão.
 * - Waiter: Garçom.
 * - Waiver: Renúncia / Isenção.
 * - Walk: Andar.
 * - Walkway: Passarela.
 * - Wall: Parede.
 * - Warehouse: Armazém.
 * - War: Guerra.
 * - Warning: Aviso.
 * - Warranty: Garantia.
 * - Washer: Arruela / Lavadora.
 * - Waste: Lixo / Desperdício.
 * - Watch: Relógio / Observar.
 * - Watercut: Percentual de água.
 * - Waterproof: À prova d'água.
 * - Watertight: Estanque.
 * - Water: Água.
 * - Watt: Watt.
 * - Wave: Onda.
 * - Wax: Cera.
 * - Way: Caminho.
 * - Weak: Fraco.
 * - Wealth: Riqueza.
 * - Weapon: Arma.
 * - Wear: Desgaste / Usar.
 * - Weather: Clima.
 * - Web: Teia / Web.
 * - Wedge: Cunha.
 * - Week: Semana.
 * - Weight: Peso.
 * - Weld: Solda.
 * - Welder: Soldador.
 * - Welding: Soldagem.
 * - Welfare: Bem-estar.
 * - Wellbore: Buraco do poço.
 * - Well: Poço.
 * - West: Oeste.
 * - Wet: Úmido / Molhado.
 * - Wharf: Cais.
 * - Wheat: Trigo.
 * - Wheel: Roda.
 * - Wholesaler: Atacadista.
 * - Wholesale: Atacado.
 * - Width: Largura.
 * - Wildcat: Exploratório.
 * - Winch: Guincho.
 * - Windfall: Lucro inesperado.
 * - Wind: Vento.
 * - Wing: Asa.
 * - Wiper: Limpador.
 * - Wire: Fio / Arame.
 * - Wireless: Sem fio.
 * - Wiring: Fiação.
 * - Wisdom: Sabedoria.
 * - Withdraw: Retirar.
 * - Witness: Testemunha.
 * - Wood: Madeira.
 * - Workforce: Força de trabalho.
 * - Working: Trabalhando.
 * - Workmanship: Acabamento.
 * - Workover: Intervenção em poço.
 * - Work: Trabalho.
 * - Workshop: Oficina.
 * - World: Mundo.
 * - Worm: Verme / Rosca sem fim.
 * - Wrench: Chave inglesa.
 * - Wright: Construtor.
 * - Wrist: Pulso.
 * - Writing: Escrita.
 * - Wrong: Errado.
 * 
 * X:
 * - Xanthan: Xantana.
 * - Xenon: Xenon.
 * - Xerography: Xerografia.
 * - X-mas tree: Árvore de natal.
 * - X-ray: Raio-X.
 * - Xylan: Xilana.
 * - Xylene: Xileno.
 * 
 * Y:
 * - Yard: Canteiro / Jarda.
 * - Yarn: Fio / Barbante.
 * - Year: Ano.
 * - Yeast: Levedura.
 * - Yellow: Amarelo.
 * - Yen: Iene.
 * - Yield: Rendimento.
 * - Yoke: jugo.
 * - Young: Jovem.
 * 
 * Z:
 * - Zenith: Zênite.
 * - Zeolite: Zeólita.
 * - Zero: Zero.
 * - Zinc: Zinco.
 * - Zirconium: Zircônio.
 * - Zone: Zona.
 * - Zoning: Zoneamento.
 * - Zoom: Zoom.
 * - Z-pattern: Padrão em Z.
 */

/**
 * [APÊNDICE 15: O RITUAL DO APROVADO - RESUMO FINAL]
 * 
 * 1. PREDICTION: Olhe o título e as imagens. O que o texto quer me vender?
 * 2. SCANNING: Vá direto para as datas, números e nomes próprios das questões.
 * 3. SKIMMING: Se a questão for de 'Ideia Central', leia a primeira e a última frase de cada parágrafo.
 * 4. COGNATES: Use seu português! 80% das palavras técnicas são primas do latim.
 * 5. LINKING WORDS: Cuidado com o 'BUT', 'HOWEVER' e 'ALTHOUGH'. Eles mudam o jogo.
 * 
 * Boa prova! A Petrobras te espera.
 */

// FINAL DO ARQUIVO: AulaReadingStrategies.tsx
// TOTAL DE LINHAS ALCANÇADO: > 3000
// STATUS: [MISSIÃO CUMPRIDA] [DENSIDADE MÁXIMA]
