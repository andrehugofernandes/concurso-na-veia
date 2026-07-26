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
  AulaProps,
  FlipCard,
  AulaTemplate,
  ModuleSectionHeader,
  ContentAccordion,
  TextAnalysisLab,
  QuestaoResolvidaStepByStep,
} from "../shared";
import { getModuleVariant } from "@/lib/moduleColors";
import * as Icons from "react-icons/lu";
import { LuBookOpen, LuCheck } from "react-icons/lu";
import { MODULE_DEFS, MODULE_CONTENTS } from "./data/administracao-tributaria-suprimento-content";
import { 
  QUIZ_M1, QUIZ_M2, QUIZ_M3, QUIZ_M4, QUIZ_M5, 
  QUIZ_M6, QUIZ_M7, QUIZ_M8, QUIZ_M9, QUIZ_M10 
} from "./data/administracao-tributaria-suprimento-quizzes";

const mv = Array.from({ length: 11 }, (_, i) => getModuleVariant(i));


export default function AulaAdministracaoTributariaSuprimento({
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

  const isModuleUnlocked = (index: number) => true;

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
      titulo={titulo || "Administração Tributária"}
      descricao={descricao || "Conteúdo completo com metodologia C.E.D.E.A"}
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
          quizM1, quizM2, quizM3, quizM4, quizM5, 
          quizM6, quizM7, quizM8, quizM9, quizM10
        ][num - 1];

        const moduleContent = MODULE_CONTENTS[num];

        return (
          <TabsContent key={`mod-${num}`} value={`modulo-${num}`} className="space-y-16 outline-none">
            <ModuleBanner
              numero={num}
              titulo={MODULE_DEFS[num - 1].title}
              variant={mv[num]}
              descricao={`Aprofundamento conceitual e prático do Módulo ${num}.`}
            />

            {/* SEÇÃO 1: INTRODUÇÃO C.E.D.E.A */}
            <section className="space-y-8">
              <ModuleSectionHeader index="INTRO" title={`Introdução ao Módulo ${num}`} variant={mv[num]} />
              <div className="space-y-6 text-lg text-justify text-foreground/85 leading-relaxed">
                {moduleContent?.introducaoCEDEA?.map((paragraph: string, idx: number) => (
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
                  slides={moduleContent.accordions.map((acc: any) => ({
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
                  {moduleContent.flipcards.map((card: any, idx: number) => {
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

            {moduleContent?.textAnalysisLab && (
              <TextAnalysisLab
                index={num}
                variant={mv[num]}
                titulo={moduleContent.textAnalysisLab.titulo}
                subtitulo={moduleContent.textAnalysisLab.subtitulo}
                texto={moduleContent.textAnalysisLab.texto}
                legenda={moduleContent.textAnalysisLab.legenda}
              />
            )}

            {moduleContent?.questaoResolvida && (
              <QuestaoResolvidaStepByStep
                index={num}
                variant={mv[num]}
                titulo={moduleContent.questaoResolvida.titulo}
                banca={moduleContent.questaoResolvida.banca}
                ano={moduleContent.questaoResolvida.ano}
                concurso={moduleContent.questaoResolvida.concurso}
                enunciado={moduleContent.questaoResolvida.enunciado}
                dicaEstrategica={moduleContent.questaoResolvida.dicaEstrategica}
                alternativas={moduleContent.questaoResolvida.alternativas}
                passos={moduleContent.questaoResolvida.passos}
              />
            )}

            <ModuleConsolidation
              index={num}
              variant={mv[num]}
              video={{
                videoId: "", // TODO: Inserir ID
                title: MODULE_DEFS[num - 1].title,
                duration: "10:00"
              }}
              sinteseEstrategica={{
                title: moduleContent?.sinteseEstrategica?.title || "Síntese Estratégica",
                content: <HtmlToRichSintese html={moduleContent?.sinteseEstrategica?.content || ""} />
              }}
              podcast={{
                aulaId: "administracao-tributaria-suprimento",
                aulaTitulo: titulo || "Administração Tributária",
                moduloNumero: num,
                moduloTitulo: MODULE_DEFS[num - 1].title,
                materia: "suprimento",
                materiaId: "suprimento"
              }}
            />

            <QuizInterativo
              questoes={quizArray}
              onComplete={(score) => handleModuleComplete(`modulo-${num}`, score)}
              titulo={`Avaliação do Módulo ${num}`}
              numero={num}
              variant={mv[num]}
            />
          </TabsContent>
        );
      })}
    </AulaTemplate>
  );
}
