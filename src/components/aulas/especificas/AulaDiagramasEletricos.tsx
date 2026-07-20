"use client";
import { useState, useEffect } from "react";
import {
  AulaProps,
  QuizQuestion,
  ModuleConsolidation,
  ContentAccordion,
  QuizInterativo,
  ModuleBanner,
  ModuleSectionHeader,
  AulaTemplate,
  AlertBox,
} from "../shared";
import { LuBrain, LuBookOpen, LuFileText, LuSearch, LuZap } from "react-icons/lu";
import { TabsContent } from "@/components/ui/tabs";
import { getModuleVariant } from "@/lib/moduleColors";

const QUIZ_DIAGRAMAS = {
  "modulo-1": {
    questions: [
      {
        id: 1,
        question: "Qual a função principal de um diagrama unifilar em instalações industriais?",
        options: [
          "Representar detalhadamente o posicionamento físico de todos os condutores dentro dos eletrodutos.",
          "Fornecer uma visão simplificada e geral do sistema elétrico, indicando as principais partes, quadros de distribuição e interligações.",
          "Exibir o dimensionamento mecânico dos suportes de cabos (leitos e eletrocalhas).",
          "Mostrar exclusivamente a parte de automação e controle dos motores elétricos.",
          "Indicar o fluxo de fluidos térmicos em sistemas de refrigeração e trocadores de calor.",
        ],
        correct: 1,
        explanation: "O diagrama unifilar é a representação simplificada do sistema, usando uma única linha para representar os circuitos, focando na distribuição geral, quadros e proteções.",
      },
      {
        id: 2,
        question: "Em diagramas de comando e força (multifilar), o circuito de força tem como característica principal:",
        options: [
          "Operar sempre em extra-baixa tensão (24Vcc) para segurança dos operadores.",
          "Conter os botões de acionamento, sinalizadores luminosos e relés auxiliares.",
          "Ser responsável por conduzir as correntes mais elevadas diretamente para as cargas, como os motores trifásicos.",
          "Ser desenhado utilizando apenas símbolos de portas lógicas (AND, OR, NOT).",
          "Conectar diretamente os sensores de temperatura de campo às entradas analógicas do PLC sem uso de transdutores.",
        ],
        correct: 2,
        explanation: "No diagrama multifilar, o circuito de força conduz a alta corrente necessária para acionar as cargas (como motores), enquanto o circuito de comando lida com lógicas e baixas correntes.",
      }
    ],
  },
};

function toQQ(
  raw: { questions: { id: number; question: string; options: string[]; correct: number; explanation: string }[] }
): QuizQuestion[] {
  const labels = ["A", "B", "C", "D", "E"];
  return raw.questions.map((q) => ({
    id: q.id.toString(),
    pergunta: q.question,
    opcoes: q.options.map((opt, idx) => ({
      label: labels[idx] ?? String.fromCharCode(65 + idx),
      valor: opt,
    })),
    correta: labels[q.correct] ?? "A",
    explicacao: q.explanation,
  }));
}

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Fundamentos de Diagramas Elétricos" },
] as const;

export default function AulaDiagramasEletricos(props: AulaProps) {
  const STORAGE_KEY_PREFIX = "petrobras_quest_aula_diagramas_eletricos_";

  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}active_tab`);
      if (saved && MODULE_DEFS.some((m) => m.id === saved)) return saved;
    }
    return MODULE_DEFS[0].id;
  });

  const [completedModules, setCompletedModules] = useState<Set<string>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}completed_modules`);
      if (saved) {
        try {
          return new Set(JSON.parse(saved));
        } catch (e) {}
      }
    }
    return new Set();
  });

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}active_tab`, activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem(
      `${STORAGE_KEY_PREFIX}completed_modules`,
      JSON.stringify(Array.from(completedModules))
    );
  }, [completedModules]);

  const handleQuizComplete = (moduleId: string, score: number) => {
    setCompletedModules((prev) => {
      const newSet = new Set(prev);
      newSet.add(moduleId);
      return newSet;
    });
  };

  const renderModulo1 = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ModuleBanner
        numero={1}
        variant={getModuleVariant(1)}
        titulo="Fundamentos de Diagramas Elétricos"
        descricao="Entenda a linguagem universal da eletrotécnica e as simbologias aplicadas no setor industrial."
      />

      <section className="space-y-6">
        <ModuleSectionHeader
          index={1}
          variant={getModuleVariant(1)}
          title="O que são Diagramas Elétricos?"
          description="A base para a interpretação de projetos em Manutenção Elétrica."
        />
        <div className="bg-muted/30 p-6 rounded-2xl border border-border">
          <p className="text-xl text-foreground/85 leading-relaxed mb-6">
            Em plantas industriais como refinarias e plataformas, a manutenção elétrica depende totalmente da leitura precisa de diagramas. Eles são representações gráficas dos circuitos, utilizando símbolos padronizados (como normas NBR e IEC).
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-sky-500/10 border border-sky-500/20 p-5 rounded-xl">
              <h4 className="font-bold text-sky-600 dark:text-sky-400 mb-2 text-lg flex items-center gap-2">
                <LuFileText /> Diagrama Unifilar
              </h4>
              <p className="text-foreground/80 leading-relaxed text-sm">
                Representa o sistema de forma simplificada. Usa um único traço para indicar os condutores de um circuito. É muito usado em projetos arquitetônicos e em painéis de distribuição geral (QDG).
              </p>
            </div>
            
            <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-xl">
              <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-2 text-lg flex items-center gap-2">
                <LuZap /> Diagrama Multifilar
              </h4>
              <p className="text-foreground/80 leading-relaxed text-sm">
                Mostra cada condutor detalhadamente (fases, neutro, terra). Essencial para a montagem e manutenção de quadros de comando de motores (CCM).
              </p>
            </div>
          </div>
        </div>
      </section>

      <ModuleConsolidation moduloNumero={1}
        index={1}
        variant={getModuleVariant(1)}
        resumoVisual={{
          moduloNome: "Módulo 1",
          tituloAula: "Diagramas Unifilares vs Multifilares",
          materia: "Específicas - Elétrica",
          images: [],
        }}
        sinteseEstrategica={{
          title: "Simbologia Normatizada",
          content: (
            <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto text-center">
              A norma ABNT NBR 5444 (embora cancelada, ainda base para muitas apostilas) e as normas IEC definem os símbolos de interruptores, tomadas, contatores e disjuntores. O domínio destes símbolos é fundamental para a prova.
            </p>
          ),
        }}
      podcast={{
            aulaId: "diagramaseletricos",
            aulaTitulo: "Diagramas Eletricos",
            materia: "Específicas",
            materiaId: "especificas",
            moduloNumero: 1,
            moduloTitulo: "Módulo 1",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />

      <div className="space-y-6">
        <ModuleSectionHeader
          index={1}
          variant={getModuleVariant(1)}
          title="Raio-X: Circuitos de Comando e Força"
          description="Aplicações práticas e esquemas."
        />
        <ContentAccordion
          mode="stacked"
          slides={[
            {
              titulo: "Circuito de Força (Potência)",
              icone: <LuZap />,
              conteudo: (
                <div className="space-y-4 text-gray-700">
                  <p>
                    Lida com altas correntes e tensões elevadas (ex: 380V, 440V, 4160V). Seus componentes incluem fusíveis principais, disjuntores motor, contatos principais dos contatores e relés térmicos, terminando no motor elétrico.
                  </p>
                </div>
              ),
            },
            {
              titulo: "Circuito de Comando (Controle)",
              icone: <LuBrain />,
              conteudo: (
                <div className="space-y-4 text-gray-700">
                  <p>
                    Lida com baixas correntes e lógicas de acionamento. Operam geralmente em tensões menores (24Vcc ou 110/220Vca). É aqui que se encontram botões (NA/NF), fim de curso, bobinas de contatores, temporizadores e sinaleiros.
                  </p>
                </div>
              ),
            },
          ]}
        />
        <QuizInterativo
          titulo="Fundamentos de Diagramas Elétricos"
          numero={1}
          variant={getModuleVariant(1)}
          questoes={toQQ(QUIZ_DIAGRAMAS["modulo-1"])}
          onComplete={(score: number) => handleQuizComplete("modulo-1", score)}
        />
      </div>
    </div>
  );

  return (
    <AulaTemplate
      {...props}
      modules={MODULE_DEFS}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      completedModules={completedModules}
      canComplete={completedModules.size >= MODULE_DEFS.length}
      lockMessage="Você precisa responder a todos os quizzes desta aula para finalizá-la.">
      <TabsContent value="modulo-1" className="mt-0">
        {renderModulo1()}
      </TabsContent>
    </AulaTemplate>
  );
}
