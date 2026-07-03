"use client";

import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { getModuleVariant } from "@/lib/moduleColors";
import { useAulaProgress } from "@/hooks/useAulaProgress";
import { LuBookOpen, LuBrain, LuWorkflow, LuPenTool, LuFolderHeart } from "react-icons/lu";

import {
  ModuleConsolidation,
  QuizInterativo,
  ModuleBanner,
  QuizQuestion,
  AulaProps,
  AulaTemplate,
  RichIntro,
  QuestaoResolvidaStepByStep,
  FlipCard,
  AlertBox,
  Comparison,
  TimelineItem
} from "../shared";

interface ScoreLessonRendererProps extends Omit<AulaProps, "onComplete"> {
  onComplete: () => void;
  conteudoJson: {
    sintetizar?: {
      descricao?: string;
      flashcards?: Array<{ front: string; back: string }>;
      alertas?: Array<{ type: 'warning' | 'info' | 'success'; title: string; content: string }>;
    };
    compreender?: {
      descricao?: string;
      teoria?: Array<{ subtitulo: string; texto: string }>;
    };
    organizar?: {
      descricao?: string;
      comparativo?: Array<{ titulo: string; itemA: string; conteudoA: string; itemB: string; conteudoB: string }>;
      linha_tempo?: Array<{ titulo: string; conteudo: string }>;
    };
    resolver?: {
      descricao?: string;
      questoes?: Array<{
        banca?: string;
        ano?: string;
        concurso?: string;
        enunciado: string;
        alternativas: Array<{ letra: string; texto: string; correta: boolean }>;
        dicaEstrategica?: string;
        passos?: Array<{ titulo: string; conteudo: string }>;
      }>;
      quiz?: Array<{
        enunciado: string;
        alternativas: Array<{ letra: string; texto: string; correta: boolean }>;
        explicacao?: string;
      }>;
    };
    estruturar?: {
      descricao?: string;
      resumos?: Array<string>;
      video?: { videoId: string; title: string; duration: string };
      audio?: { audioUrl: string; titulo: string; artista: string };
    };
  };
}

const MODULE_DEFS = [
  { id: "sintetizar", label: "S - Sintetizar", title: "Sintetizar com Flashcards" },
  { id: "compreender", label: "C - Compreender", title: "Compreender a Teoria" },
  { id: "organizar", label: "O - Organizar", title: "Organizar com Mapas & Linhas do Tempo" },
  { id: "resolver", label: "R - Resolver", title: "Resolver Exercícios Comentados" },
  { id: "estruturar", label: "E - Estruturar", title: "Estruturar com Resumo e Áudio" },
] as const;

export default function ScoreLessonRenderer({
  onComplete,
  isCompleted,
  loading,
  xpGanho = 50,
  titulo,
  descricao,
  duracao,
  materiaNome,
  materiaCor,
  materiaId,
  prevTopico,
  nextTopico,
  conteudoJson,
}: ScoreLessonRendererProps) {
  const STORAGE_KEY_PREFIX = `dynamic_score_aula_${materiaId}_${titulo.replace(/\s+/g, '_').toLowerCase()}_`;

  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}active_tab`);
      return saved || "sintetizar";
    }
    return "sintetizar";
  });

  const { completedModules: completedModulesList, updateCompletedModules } = useAulaProgress();
  const completedModules = new Set(completedModulesList);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}active_tab`, activeTab);
    }
  }, [activeTab]);

  const [quizQuestões, setQuizQuestões] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    if (conteudoJson?.resolver?.quiz) {
      const mapped = conteudoJson.resolver.quiz.map((q, idx) => {
        const correctIndex = q.alternativas.findIndex(alt => alt.correta);
        const correctLetter = correctIndex !== -1 ? q.alternativas[correctIndex].letra : "A";
        
        return {
          id: idx + 1,
          pergunta: q.enunciado,
          opcoes: q.alternativas.map(alt => ({
            label: alt.letra,
            valor: alt.texto
          })),
          correta: correctLetter,
          explicacao: q.explicacao || "Alternativa correta baseada no gabarito."
        };
      });
      setQuizQuestões(mapped);
    }
  }, [conteudoJson]);

  const handleModuleComplete = (moduleId: string) => {
    const nextCompleted = new Set(completedModules);
    nextCompleted.add(moduleId);
    updateCompletedModules(Array.from(nextCompleted));
  };

  const mv = {
    sintetizar: getModuleVariant(1),
    compreender: getModuleVariant(2),
    organizar: getModuleVariant(3),
    resolver: getModuleVariant(4),
    estruturar: getModuleVariant(5),
  };

  return (
    <AulaTemplate
      canComplete={completedModules.size >= MODULE_DEFS.length}
      lockMessage="Você precisa interagir e responder aos quizzes em todos os módulos desta aula SCORE para finalizá-la."
      titulo={titulo}
      descricao={descricao}
      duracao={duracao}
      materiaNome={materiaNome}
      materiaCor={materiaCor}
      materiaId={materiaId}
      modules={MODULE_DEFS}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      completedModules={completedModules}
      onComplete={() => onComplete?.()}
      isCompleted={isCompleted}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
    >
      {/* ========================================================================= */}
      {/* S - SINTETIZAR */}
      {/* ========================================================================= */}
      <TabsContent value="sintetizar">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={1}
            titulo={MODULE_DEFS[0].title}
            variant={mv.sintetizar}
            descricao={conteudoJson?.sintetizar?.descricao || "Sintetize os conceitos essenciais desta aula com flashcards rápidos de fixação ativa."}
          />

          {conteudoJson?.sintetizar?.alertas && conteudoJson.sintetizar.alertas.length > 0 && (
            <div className="space-y-4">
              {conteudoJson.sintetizar.alertas.map((alerta, idx) => (
                <AlertBox 
                  key={idx} 
                  tipo={alerta.type === "success" ? "success" : alerta.type === "warning" ? "warning" : "info"} 
                  titulo={alerta.title}
                >
                  <p className="text-sm">{alerta.content}</p>
                </AlertBox>
              ))}
            </div>
          )}

          {conteudoJson?.sintetizar?.flashcards && conteudoJson.sintetizar.flashcards.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <LuBrain className="w-5 h-5 text-indigo-500 animate-pulse" />
                Flashcards de Memorização Ativa
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {conteudoJson.sintetizar.flashcards.map((card, idx) => (
                  <FlipCard
                    key={idx}
                    numero={idx + 1}
                    frente={card.front}
                    verso={card.back}
                    categoria={materiaNome}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-center pt-6">
            <button
              onClick={() => handleModuleComplete("sintetizar")}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition"
            >
              Marcar Etapa S como Concluída
            </button>
          </div>
        </div>
      </TabsContent>

      {/* ========================================================================= */}
      {/* C - COMPREENDER */}
      {/* ========================================================================= */}
      <TabsContent value="compreender">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={2}
            titulo={MODULE_DEFS[1].title}
            variant={mv.compreender}
            descricao={conteudoJson?.compreender?.descricao || "Leia a teoria com foco no que realmente cai nas provas."}
          />

          {conteudoJson?.compreender?.teoria && conteudoJson.compreender.teoria.map((sec, idx) => (
            <RichIntro key={idx}>
              <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
                <p className="text-xl font-bold text-slate-900 dark:text-white border-l-4 border-blue-500 pl-4 mb-2">
                  {sec.subtitulo}
                </p>
                <p className="whitespace-pre-line">{sec.texto}</p>
              </div>
            </RichIntro>
          ))}

          <div className="flex justify-center pt-6">
            <button
              onClick={() => handleModuleComplete("compreender")}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition"
            >
              Marcar Etapa C como Concluída
            </button>
          </div>
        </div>
      </TabsContent>

      {/* ========================================================================= */}
      {/* O - ORGANIZAR */}
      {/* ========================================================================= */}
      <TabsContent value="organizar">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={3}
            titulo={MODULE_DEFS[2].title}
            variant={mv.organizar}
            descricao={conteudoJson?.organizar?.descricao || "Organize visualmente os padrões e fluxos do edital."}
          />

          {conteudoJson?.organizar?.comparativo && conteudoJson.organizar.comparativo.map((comp, idx) => (
            <div key={idx} className="space-y-6">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <LuWorkflow className="w-5 h-5 text-green-500" />
                {comp.titulo}
              </h3>
              <Comparison
                title={comp.titulo}
                left={{
                  title: comp.itemA,
                  content: comp.conteudoA,
                  description: "Modelo A",
                  variant: "info"
                }}
                right={{
                  title: comp.itemB,
                  content: comp.conteudoB,
                  description: "Modelo B",
                  variant: "warning"
                }}
              />
            </div>
          ))}

          {conteudoJson?.organizar?.linha_tempo && conteudoJson.organizar.linha_tempo.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <LuWorkflow className="w-5 h-5 text-green-500" />
                Linha do Tempo de Processos
              </h3>
              <div className="relative border-l-2 border-slate-700 dark:border-slate-800 ml-4 space-y-8">
                {conteudoJson.organizar.linha_tempo.map((item, idx) => (
                  <TimelineItem
                    key={idx}
                    passo={idx + 1}
                    titulo={item.titulo}
                    descricao={item.conteudo}
                    isLast={idx === conteudoJson.organizar!.linha_tempo!.length - 1}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-center pt-6">
            <button
              onClick={() => handleModuleComplete("organizar")}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition"
            >
              Marcar Etapa O como Concluída
            </button>
          </div>
        </div>
      </TabsContent>

      {/* ========================================================================= */}
      {/* R - RESOLVER */}
      {/* ========================================================================= */}
      <TabsContent value="resolver">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={4}
            titulo={MODULE_DEFS[3].title}
            variant={mv.resolver}
            descricao={conteudoJson?.resolver?.descricao || "Fixe os conceitos respondendo a questões estruturadas da banca."}
          />

          {conteudoJson?.resolver?.questoes && conteudoJson.resolver.questoes.map((q, idx) => (
            <QuestaoResolvidaStepByStep
              key={idx}
              index={idx + 1}
              titulo={`Questão Resolvida Passo a Passo`}
              variant={mv.resolver}
              banca={q.banca || "CESGRANRIO"}
              ano={q.ano || "2026"}
              concurso={q.concurso || "Concurso"}
              enunciado={q.enunciado}
              alternativas={q.alternativas}
              dicaEstrategica={q.dicaEstrategica}
              passos={q.passos || []}
            />
          ))}

          {quizQuestões.length > 0 && (
            <QuizInterativo
              titulo="Simulado Rápido de Fixação"
              questoes={quizQuestões}
              variant={mv.resolver}
              onComplete={() => handleModuleComplete("resolver")}
            />
          )}
        </div>
      </TabsContent>

      {/* ========================================================================= */}
      {/* E - ESTRUTURAR */}
      {/* ========================================================================= */}
      <TabsContent value="estruturar">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={5}
            titulo={MODULE_DEFS[4].title}
            variant={mv.estruturar}
            descricao={conteudoJson?.estruturar?.descricao || "Revise e consolide os pontos chaves da aula por meio de mapas e áudios de síntese."}
          />

          <ModuleConsolidation
            index={5}
            variant={mv.estruturar}
            video={conteudoJson?.estruturar?.video}
            resumoVisual={{
              moduloNome: "Revisão",
              tituloAula: titulo,
              materia: materiaNome,
              images: [{ title: "Ficha de Resumo", type: "infographic", placeholderColor: "purple" }]
            }}
            sinteseEstrategica={{
              title: "Ficha de Síntese",
              content: conteudoJson?.estruturar?.resumos?.join("\n\n") || "Leia o resumo para consolidar seu aprendizado."
            }}
            audio={conteudoJson?.estruturar?.audio}
          />

          <div className="flex justify-center pt-6">
            <button
              onClick={() => handleModuleComplete("estruturar")}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition"
            >
              Marcar Etapa E como Concluída
            </button>
          </div>
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
