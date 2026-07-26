"use client";

import { useState } from "react";
import { useAulaProgress } from "@/hooks/useAulaProgress";
import { TabsContent } from "@/components/ui/tabs";
import {
  ModuleConsolidation,
  QuizInterativo,
  ModuleBanner,
  getRandomQuestions,
  HtmlToRichSintese,
  AulaTemplate,
  ModuleSectionHeader,
  ContentAccordion,
  FlipCard,
  AulaProps,
  TextAnalysisLab,
  QuestaoResolvidaStepByStep,
} from "../shared";
import { getModuleVariant } from "@/lib/moduleColors";
import * as Icons from "react-icons/lu";
import { LuBookOpen, LuCheck } from "react-icons/lu";
import {
  QUIZ_M1,
  QUIZ_M2,
  QUIZ_M3,
  QUIZ_M4,
  QUIZ_M5,
  QUIZ_M6,
  QUIZ_M7,
  QUIZ_M8,
  QUIZ_M9,
  QUIZ_M10,
} from "./data/administracao-geral-suprimento-quizzes";
import {
  MODULE_DEFS,
  MODULE_CONTENTS,
} from "./data/administracao-geral-suprimento-content";

const mv = Array.from({ length: 11 }, (_, i) => getModuleVariant(i));

export default function AulaAdministracaoGeralSuprimento({
  onComplete,
  isCompleted,
  loading,
  xpGanho = 50,
  currentProgress,
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
  const { completedModules: completedModulesList, updateCompletedModules } = useAulaProgress();
  const completedModules = new Set(completedModulesList);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const [quizM1] = useState(() => getRandomQuestions(QUIZ_M1, 2));
  const [quizM2] = useState(() => getRandomQuestions(QUIZ_M2, 2));
  const [quizM3] = useState(() => getRandomQuestions(QUIZ_M3, 2));
  const [quizM4] = useState(() => getRandomQuestions(QUIZ_M4, 2));
  const [quizM5] = useState(() => getRandomQuestions(QUIZ_M5, 2));
  const [quizM6] = useState(() => getRandomQuestions(QUIZ_M6, 2));
  const [quizM7] = useState(() => getRandomQuestions(QUIZ_M7, 2));
  const [quizM8] = useState(() => getRandomQuestions(QUIZ_M8, 2));
  const [quizM9] = useState(() => getRandomQuestions(QUIZ_M9, 2));
  const [quizM10] = useState(() => getRandomQuestions(QUIZ_M10, 2));

  const isModuleUnlocked = (_index: number) => true;

  const handleModuleComplete = (moduleId: string, _score?: number) => {
    const nextCompleted = new Set(completedModulesList);
    nextCompleted.add(moduleId);
    updateCompletedModules(Array.from(nextCompleted));
    const modNumber = parseInt(moduleId.split("-")[1]);
    if (modNumber < 10) {
      setActiveTab(`modulo-${modNumber + 1}`);
    } else if (modNumber === 10) {
      onComplete?.();
    }
  };

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      titulo={titulo || "Administração Geral"}
      descricao={descricao || "Conteúdo completo com metodologia C.E.D.E.A, acordeões e FlipCards"}
      duracao={duracao || "60 min"}
      materiaNome={materiaNome || "Suprimentos"}
      materiaCor={materiaCor || "indigo"}
      materiaId={materiaId || "suprimento"}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
      modules={MODULE_DEFS}
      completedModules={completedModules}
      isModuleUnlocked={isModuleUnlocked}
      onComplete={() => onComplete?.()}
      isCompleted={isCompleted}
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
        const quizArray = [
          QUIZ_M1,
          QUIZ_M2,
          QUIZ_M3,
          QUIZ_M4,
          QUIZ_M5,
          QUIZ_M6,
          QUIZ_M7,
          QUIZ_M8,
          QUIZ_M9,
          QUIZ_M10,
        ][num - 1];

        const moduleContent = MODULE_CONTENTS[num];

        return (
          <TabsContent key={`mod-${num}`} value={`modulo-${num}`} className="space-y-16 outline-none">
            <ModuleBanner
              numero={num}
              titulo={MODULE_DEFS[num - 1].title}
              variant={mv[num]}
              descricao={`Aprofundamento conceitual do Módulo ${num}.`}
            />

            {/* SEÇÃO 1: INTRODUÇÃO C.E.D.E.A (LARGURA TOTAL) */}
            <section className="space-y-8">
              <ModuleSectionHeader index="INTRO" title={`Introdução ao Módulo ${num}`} variant={mv[num]} />
              <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
                {moduleContent?.introducaoCEDEA.map((paragraph, idx) => (
                  <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
              </div>
            </section>

            {/* SEÇÃO 2: ACCORDION DE TEORIA E APROFUNDAMENTO */}
            {moduleContent?.accordions && moduleContent.accordions.length > 0 && (
              <section className="space-y-8">
                <ModuleSectionHeader index={1} title="Aprofundamento Teórico" variant={mv[num]} />
                <ContentAccordion
                  mode="stacked"
                  slides={moduleContent.accordions.map((acc) => ({
                    titulo: acc.titulo,
                    conteudo: (
                      <div
                        className="text-lg leading-relaxed space-y-4"
                        dangerouslySetInnerHTML={{ __html: acc.conteudo }}
                      />
                    ),
                  }))}
                />
              </section>
            )}

            {/* SEÇÃO 3: FLIPCARDS PREMIUM */}
            {moduleContent?.flipcards && moduleContent.flipcards.length > 0 && (
              <section className="space-y-8">
                <ModuleSectionHeader index={2} title="Conceitos Essenciais" variant={mv[num]} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {moduleContent.flipcards.map((card, idx) => {
                    const IconComp = (Icons as any)[card.iconeFrente] || LuBookOpen;
                    return (
                      <FlipCard
                        key={idx}
                        categoria={card.categoria}
                        variant={mv[num]}
                        frente={
                          <div className="flex flex-col items-center justify-center p-6 gap-5 text-center h-full">
                            <div className={`p-4 bg-${mv[num]}-500/10 rounded-full shadow-inner ring-1 ring-${mv[num]}-500/20`}>
                              <IconComp className={`w-12 h-12 text-${mv[num]}-500`} />
                            </div>
                            <span className="text-lg md:text-xl font-bold uppercase tracking-tight text-foreground">
                              {card.tituloFrente}
                            </span>
                            <span className={`text-sm text-${mv[num]}-500/80 font-medium`}>
                              {card.subtituloFrente}
                            </span>
                          </div>
                        }
                        verso={
                          <div className="space-y-4 p-4 flex flex-col justify-center h-full">
                            <div className={`flex items-center gap-2 text-${mv[num]}-500 font-bold border-b border-${mv[num]}-500/10 pb-3`}>
                              <LuCheck className="w-5 h-5 shrink-0" />
                              <span className="tracking-widest uppercase text-xs">{card.tituloVerso}</span>
                            </div>
                            <p
                              className="text-sm leading-relaxed text-muted-foreground"
                              dangerouslySetInnerHTML={{ __html: card.conteudoVerso }}
                            />
                          </div>
                        }
                      />
                    );
                  })}
                </div>
              </section>
            )}

            {/* SEÇÃO 4: MESA DE REVISÃO E PODCAST (MESMO PADRÃO DA AULA DE INTERPRETAÇÃO DE TEXTO) */}
            {moduleContent && (
              <>
                <section className="space-y-12">
                  <TextAnalysisLab
                    title={`Laboratório de Texto CESGRANRIO - Módulo ${num}`}
                    text="A <strong>planejamento estratégico</strong> na administração pública deve obrigatoriamente prever a <em>participação social</em>, garantindo que as <span class='highlight-red'>decisões de alto nível</span> reflitam as necessidades coletivas e não apenas a <span class='highlight-blue'>eficiência operacional interna</span>."
                    highlights={[
                      { text: "planejamento estratégico", color: "yellow", description: "Foco no longo prazo e visão macro da organização." },
                      { text: "participação social", color: "green", description: "Princípio fundamental da governança pública contemporânea." },
                      { text: "decisões de alto nível", color: "red", description: "Características das decisões da alta cúpula." },
                      { text: "eficiência operacional interna", color: "blue", description: "Características do nível operacional/tarefas." }
                    ]}
                    variant={mv[num]}
                  />

                  <QuestaoResolvidaStepByStep
                    banca="CESGRANRIO"
                    ano="2024"
                    orgao="PETROBRAS"
                    cargo="Profissional Petrobras de Nível Superior - Administração"
                    enunciado="No contexto da administração geral, a departamentalização é a forma como a organização agrupa suas atividades. A estrutura em que os funcionários respondem simultaneamente a dois gestores diferentes, quebrando o princípio da unidade de comando, é denominada:"
                    alternativas={[
                      { letra: "A", texto: "Geográfica.", analise: "Incorreto. A geográfica divide por regiões.", isCorrect: false },
                      { letra: "B", texto: "Funcional.", analise: "Incorreto. A funcional divide por áreas de especialização.", isCorrect: false },
                      { letra: "C", texto: "Por clientes.", analise: "Incorreto. Foca em públicos específicos.", isCorrect: false },
                      { letra: "D", texto: "Matricial.", analise: "CORRETO. A matricial cria uma dupla chefia (funcional e de projeto).", isCorrect: true },
                      { letra: "E", texto: "Linear.", analise: "Incorreto. É a mais simples e respeita rigorosamente a unidade de comando.", isCorrect: false }
                    ]}
                    variant={mv[num]}
                  />
                </section>
                
                <ModuleConsolidation
                moduloNumero={num}
                index={num}
                variant={mv[num]}
                resumoVisual={{
                  moduloNome: `Módulo ${num}`,
                  tituloAula: MODULE_DEFS[num - 1].title,
                  materia: "Administração Geral (Suprimentos)",
                  images: [
                    {
                      title: `Mapa Estratégico: ${MODULE_DEFS[num - 1].title}`,
                      type: "Infográfico",
                      placeholderColor: "from-blue-500/20 to-indigo-500/20",
                      imageUrl: `/assets/images/suprimento/content/administracao-geral/modulo-${num}/m${num}-resumo.png`,
                    },
                    {
                      title: `Pontos de Atenção CESGRANRIO - Módulo ${num}`,
                      type: "Fluxograma",
                      placeholderColor: "from-indigo-500/20 to-violet-500/20",
                      imageUrl: `/assets/images/suprimento/content/administracao-geral/modulo-${num}/m${num}-pontos-chave.png`,
                    },
                  ],
                }}
                sinteseEstrategica={{
                  title: moduleContent.sinteseEstrategica.title,
                  content: <HtmlToRichSintese html={moduleContent.sinteseEstrategica.content} />
                }}
                podcast={{
                  aulaId: "administracaogeral",
                  aulaTitulo: "Administração Geral",
                  materia: "Suprimentos",
                  materiaId: "suprimento",
                  moduloNumero: num,
                  moduloTitulo: MODULE_DEFS[num - 1].title,
                  conteudoResumo: moduleContent.introducaoCEDEA.slice(0, 3).join(" ")
                }}
              />
              </>
            )}

            {/* SEÇÃO 5: QUIZ INTERATIVO */}
            <QuizInterativo
              titulo={`Prática: Módulo ${num}`}
              numero={num}
              questoes={quizArray}
              onComplete={(score) => handleModuleComplete(`modulo-${num}`, score)}
              variant={mv[num]}
            />
          </TabsContent>
        );
      })}

      {/* Lightbox Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-md cursor-zoom-out p-4 md:p-8"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img
              src={zoomedImage}
              alt="Imagem ampliada"
              className="max-w-full max-h-full object-contain rounded-2xl border border-border/40 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            />
          </div>
        </div>
      )}
    </AulaTemplate>
  );
}
