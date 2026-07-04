"use client";

import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { getModuleVariant } from "@/lib/moduleColors";
import { useAulaProgress } from "@/hooks/useAulaProgress";

import {
  ModuleConsolidation,
  QuizInterativo,
  ModuleBanner,
  getRandomQuestions,
  QuizQuestion,

  AulaProps,
  AulaTemplate,
  RichIntro,
  QuestaoResolvidaStepByStep
} from "../shared";

import { LuBookOpen } from "react-icons/lu";

import {
  QUIZ_M1_PETROLEO,
  QUIZ_M2_PETROLEO,
  QUIZ_M3_PETROLEO,
} from "./data/petroleo-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Introdução e Conceitos Base" },
  { id: "modulo-2", label: "Módulo 2", title: "Aprofundamento e Aplicações" },
  { id: "modulo-3", label: "Módulo 3", title: "Resolução de Questões e Simulado" },
] as const;

export default function AulaPetroleo({
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
}: AulaProps) {
  const STORAGE_KEY_PREFIX = "petrobras_quest_aula_quimica_petroleo_";

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

  const [quizM1, setQuizM1] = useState<QuizQuestion[]>([]);
  const [quizM2, setQuizM2] = useState<QuizQuestion[]>([]);
  const [quizM3, setQuizM3] = useState<QuizQuestion[]>([]);

  const [hasSyncedInitial, setHasSyncedInitial] = useState(false);

  useEffect(() => {
    if (!hasSyncedInitial && !loading) {
      setQuizM1(getRandomQuestions(QUIZ_M1_PETROLEO, 5));
      setQuizM2(getRandomQuestions(QUIZ_M2_PETROLEO, 5));
      setQuizM3(getRandomQuestions(QUIZ_M3_PETROLEO, 5));
      setHasSyncedInitial(true);
    }
  }, [loading, hasSyncedInitial]);

  const handleModuleComplete = (moduleId: string) => {
    const nextCompleted = new Set(completedModules);
    nextCompleted.add(moduleId);
    updateCompletedModules(Array.from(nextCompleted));
  };

  const mv = Object.fromEntries(
    Array.from({ length: 4 }, (_, i) => [i + 1, getModuleVariant(i + 1)])
  ) as Record<number, ReturnType<typeof getModuleVariant>>;

  return (
    <AulaTemplate
      canComplete={completedModules.size >= MODULE_DEFS.length}
      lockMessage="Você precisa responder a todos os quizzes desta aula para finalizá-la."
      titulo={titulo || "Petróleo e Derivados"}
      descricao={descricao || "Refino e produtos do petróleo"}
      duracao={duracao || "45 min"}
      materiaNome={materiaNome || "Química"}
      materiaCor={materiaCor || "from-blue-500 to-cyan-500"}
      materiaId={materiaId || "quimica"}
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
      {/* MÓDULO 1 */}
      {/* ========================================================================= */}
      <TabsContent value="modulo-1">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={1}
            titulo={MODULE_DEFS[0].title}
            variant={mv[1]}
            descricao="Neste módulo introdutório vamos entender os conceitos base para Petróleo e Derivados cobrados pela Cesgranrio."
          />

          <RichIntro>
            <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
              <p className="text-xl font-bold text-slate-900 dark:text-white border-l-4 border-blue-500 pl-4 mb-4">
                O essencial de Petróleo e Derivados que você não pode esquecer na hora da prova.
              </p>
              <p>
                Esteja preparado para identificar os padrões comuns de cobrança da banca. Foque em conceitos, fórmulas e teoria direta.
              </p>
            </div>
          </RichIntro>
          
          <QuestaoResolvidaStepByStep
            index={1}
            titulo="Na Prática: Como a Banca Cobra"
            variant={mv[1]}
            banca="CESGRANRIO"
            ano="2024"
            concurso="Petrobras"
            enunciado="Uma questão simulada de Petróleo e Derivados. Qual a resposta correta de acordo com as diretrizes e regras estudadas?"
            alternativas={[
              { letra: "A", texto: "Alternativa correta", correta: true },
              { letra: "B", texto: "Pegadinha clássica", correta: false },
              { letra: "C", texto: "Conceito invertido", correta: false },
              { letra: "D", texto: "Informação fora do edital", correta: false },
              { letra: "E", texto: "Alternativa absurda", correta: false }
            ]}
            dicaEstrategica="Sempre verifique os detalhes no enunciado. A CESGRANRIO gosta de inserir pequenos distratores."
            passos={[
              { titulo: "Passo 1: Identificar o Contexto", conteudo: "Identificar o contexto e as regras cobradas." },
              { titulo: "Passo 2: Análise das Alternativas", conteudo: "Analisar as alternativas e eliminar as absurdas." },
              { titulo: "Passo 3: Validação", conteudo: "Confirmar a alternativa A como a correta pela regra geral." }
            ]}
          />

          <ModuleConsolidation
            index={1}
            variant={mv[1]}
            resumoVisual={{
              moduloNome: "Módulo 1",
              tituloAula: "Petróleo e Derivados",
              materia: "Química",
              images: [{ title: "Esquema Básico", type: "infographic", placeholderColor: "blue" }]
            }}
            sinteseEstrategica={{ title: "Resumo", content: "Lembre-se sempre dos conceitos básicos." }}
            podcast={{
            aulaId: "petroleo",
            aulaTitulo: "Petroleo",
            materia: "Química",
            materiaId: "quimica",
            moduloNumero: 1,
            moduloTitulo: "Módulo 1",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

          <QuizInterativo titulo="QUIZ: Módulo Nº 1" questoes={quizM1} variant={mv[1]} onComplete={() => handleModuleComplete("modulo-1")} />
        </div>
      </TabsContent>

      {/* ========================================================================= */}
      {/* MÓDULO 2 */}
      {/* ========================================================================= */}
      <TabsContent value="modulo-2">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={2}
            titulo={MODULE_DEFS[1].title}
            variant={mv[2]}
            descricao="Aprofundamento com foco em pontos sensíveis e exceções da regra para Petróleo e Derivados."
          />
          
          <QuestaoResolvidaStepByStep
            index={2}
            titulo="Na Prática: Como a Banca Cobra"
            variant={mv[2]}
            banca="CESGRANRIO"
            ano="2023"
            concurso="Transpetro"
            enunciado="Sobre Petróleo e Derivados e aprofundamentos práticos, analise a situação problema e indique o comportamento esperado."
            alternativas={[
              { letra: "A", texto: "Ação baseada em senso comum", correta: false },
              { letra: "B", texto: "Aplicação de caso específico previsto", correta: true },
              { letra: "C", texto: "Ação que contraria o procedimento padrão", correta: false },
              { letra: "D", texto: "Ignorar por ser irrelevante", correta: false },
              { letra: "E", texto: "Depende de critérios não regulamentados", correta: false }
            ]}
            dicaEstrategica="Cuidado com alternativas baseadas no 'senso comum'."
            passos={[
              { titulo: "Passo 1", conteudo: "Localizar a palavra-chave no texto." },
              { titulo: "Passo 2", conteudo: "Aplicar a regra especial vista na aula." },
              { titulo: "Passo 3", conteudo: "A alternativa B é a única que reflete a regra." }
            ]}
          />

          <ModuleConsolidation
            index={2}
            variant={mv[2]}
            resumoVisual={{
              moduloNome: "Módulo 2",
              tituloAula: "Aplicações de Petróleo e Derivados",
              materia: "Química",
              images: [{ title: "Exceções e Casos", type: "table", placeholderColor: "indigo" }]
            }}
            sinteseEstrategica={{ title: "Casos Práticos", content: "Atenção às exceções, é lá que a banca faz pegadinhas." }}
          podcast={{
            aulaId: "petroleo",
            aulaTitulo: "Petroleo",
            materia: "Química",
            materiaId: "quimica",
            moduloNumero: 2,
            moduloTitulo: "Módulo 2",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

          <QuizInterativo titulo="QUIZ: Módulo Nº 2" questoes={quizM2} variant={mv[2]} onComplete={() => handleModuleComplete("modulo-2")} />
        </div>
      </TabsContent>

      {/* ========================================================================= */}
      {/* MÓDULO 3 */}
      {/* ========================================================================= */}
      <TabsContent value="modulo-3">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={3}
            titulo={MODULE_DEFS[2].title}
            variant={mv[3]}
            descricao="Consolidação final com questões desafiadoras e resumo dos principais tópicos de Petróleo e Derivados."
          />
          
          <QuestaoResolvidaStepByStep
            index={3}
            titulo="Na Prática: Como a Banca Cobra"
            variant={mv[3]}
            banca="CESGRANRIO"
            ano="2021"
            concurso="Petrobras"
            enunciado="Questão de alta dificuldade englobando todo o assunto de Petróleo e Derivados. Marque a asserção exata."
            alternativas={[
              { letra: "A", texto: "Afirmativa correta porém incompleta", correta: false },
              { letra: "B", texto: "Afirmativa totalmente equivocada", correta: false },
              { letra: "C", texto: "Afirmativa correta, precisa e completa", correta: true },
              { letra: "D", texto: "Mistura de conceitos corretos e incorretos", correta: false },
              { letra: "E", texto: "Afirmativa fora de contexto", correta: false }
            ]}
            dicaEstrategica="A alternativa correta precisa ser 100% verdadeira e responder ao que foi perguntado."
            passos={[
              { titulo: "Passo 1", conteudo: "Leia com atenção cada parte das afirmativas complexas." },
              { titulo: "Passo 2", conteudo: "Identifique erros nas afirmações A e D." },
              { titulo: "Passo 3", conteudo: "A afirmação C é perfeita em seu escopo." }
            ]}
          />

          <ModuleConsolidation
            index={3}
            variant={mv[3]}
            resumoVisual={{
              moduloNome: "Módulo 3",
              tituloAula: "Revisão Final Petróleo e Derivados",
              materia: "Química",
              images: [{ title: "Checklist de Aprovação", type: "diagram", placeholderColor: "purple" }]
            }}
            sinteseEstrategica={{ title: "Revisão", content: "A prática leva à fixação." }}
          podcast={{
            aulaId: "petroleo",
            aulaTitulo: "Petroleo",
            materia: "Química",
            materiaId: "quimica",
            moduloNumero: 3,
            moduloTitulo: "Módulo 3",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

          <QuizInterativo titulo="QUIZ: Módulo Nº 3" questoes={quizM3} variant={mv[3]} onComplete={() => handleModuleComplete("modulo-3")} />
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
