"use client";

import { useState, useEffect } from "react";
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
  ModuleSummaryCarouselNew,
  CardCarousel,
} from "../shared";

import {
  LuBookOpen,
  LuTarget,
  LuTrophy,
  LuTriangleAlert,
  LuLink,
  LuBrain,
  LuCheck,
  LuAnchor,
  LuCompass,
  LuZap,
  LuScale,
  LuLightbulb,
} from "react-icons/lu";

// Data
import {
  QUIZ_M1_COESAO,
  QUIZ_M2_COERENCIA,
  QUIZ_M3_PRATICO,
  QUIZ_M4_APROFUNDAMENTO,
  QUIZ_FINAL_SIMULADO,
} from "./data/coesao-coerencia-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "O Tecido do Texto" },
  { id: "modulo-2", label: "Módulo 2", title: "O Poder do Retrovisor" },
  { id: "modulo-3", label: "Módulo 3", title: "O Farol do Sentido" },
  { id: "modulo-4", label: "Módulo 4", title: "O Silêncio Eloquente" },
  { id: "modulo-5", label: "Módulo 5", title: "Substituições de Elite" },
  { id: "modulo-6", label: "Módulo 6", title: "A Dança dos Conectivos" },
  { id: "modulo-7", label: "Módulo 7", title: "Concessão & Oposição" },
  { id: "modulo-8", label: "Módulo 8", title: "Arquitetura da Coerência" },
  { id: "modulo-9", label: "Módulo 9", title: "Progressão e Relevância" },
  { id: "modulo-10", label: "Módulo 10", title: "Arena de Elite" },
];

export default function AulaCoesaoCoerencia({
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
  const [quizM1, setQuizM1] = useState(QUIZ_M1_COESAO);
  const [quizM2, setQuizM2] = useState(QUIZ_M2_COERENCIA);
  const [quizM3, setQuizM3] = useState(QUIZ_M3_PRATICO);
  const [quizM4, setQuizM4] = useState(QUIZ_M4_APROFUNDAMENTO);
  const [quizFinal, setQuizFinal] = useState(QUIZ_FINAL_SIMULADO);
  const [showCompletionBadge, setShowCompletionBadge] = useState(false);

  useEffect(() => {
    setQuizM1(getRandomQuestions(QUIZ_M1_COESAO, 4));
    setQuizM2(getRandomQuestions(QUIZ_M2_COERENCIA, 4));
    setQuizM3(getRandomQuestions(QUIZ_M3_PRATICO, 2));
    setQuizM4(getRandomQuestions(QUIZ_M4_APROFUNDAMENTO, 3));
    setQuizFinal(getRandomQuestions(QUIZ_FINAL_SIMULADO, 10));

    if (isLessonCompleted) setShowCompletionBadge(true);
  }, [isLessonCompleted]);

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
      } else {
        setShowCompletionBadge(true);
        onComplete?.();
      }
    }
  };

  const isModuleUnlocked = (index: number) => {
    if (isLessonCompleted) return true;
    if (index === 0) return true;
    return completedModules.has(MODULE_DEFS[index - 1].id);
  };

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
      {/* MÓDULO 1: O TECIDO DO TEXTO */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={1}
            titulo="O Tecido do Texto"
            descricao="Entenda a diferença fundamental entre Coesão (forma) e Coerência (sentido) no padrão 2026."
            gradiente="bg-gradient-to-br from-blue-700 to-sky-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Dualidade Textual"
              variant="blue"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação",
                  icone:<LuBookOpen />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        A língua nos oferece recursos linguísticos para conectar
                        as partes do texto (<strong>Coesão</strong>), enquanto a
                        lógica garante a relação de sentido entre as ideias (
                        <strong>Coerência</strong>).
                      </p>
                      <AlertBox tipo="info" titulo="O Tecido">
                        <p className="text-sm">
                          Imagine uma teia: a Coesão são os fios (palavras,
                          pronomes). A Coerência é o formato da teia que permite
                          capturar as presas (as ideias que fazem sentido).
                        </p>
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Diferenciação (C. vs C.)",
                  icone:<LuTarget />,
                  conteudo:(
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FlipCard
                        frente="O que é Coesão?"
                        verso="Conexão física (gramatical). Uso correto de pronomes, sinônimos, preposições e conjunções."
                      />
                      <FlipCard
                        frente="O que é Coerência?"
                        verso="Harmonia Lógica (semântica). As ideias não entram em contradição e o texto tem início, meio e fim."
                      />
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM1}
            titulo="Fixação - Módulo 1"
            icone="🎯"
            numero={1}
            variant="blue"
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          />
        </div>
      </TabsContent>

      {/* MÓDULO 2: O PODER DO RETROVISOR (ANÁFORA) */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={2}
            titulo="O Poder do Retrovisor"
            descricao="Domine a Anáfora: o recurso de retomar termos anteriores para evitar a repetição cansativa."
            gradiente="bg-gradient-to-br from-cyan-700 to-teal-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Referenciação Anafórica"
              variant="cyan"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação",
                  icone:<LuBookOpen />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        A <strong>Anáfora</strong> ocorre quando um termo (o
                        termo anafórico) aponta para um termo já citado
                        anteriormente no texto (o antecedente). É o mecanismo
                        preferido da Cesgranrio para testar coesão referencial.
                      </p>
                      <AlertBox tipo="info" titulo="O Retrovisor">
                        <p className="text-sm">
                          Ana = "Atrás". Anáfora olha para o que ficou no
                          retrovisor do texto.
                        </p>
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplos Aplicados",
                  icone:<LuTarget />,
                  conteudo:(
                    <CardCarousel
                      cards={[
                        {
                          icone: "👤",
                          title: "Pronominal",
                          descricao:
                            "Uso de pronomes para retomar nomes. Ex: A Petrobras investe. ELA busca resultados.",
                        },
                        {
                          icone: "📚",
                          title: "Sinonímia",
                          descricao:
                            "Troca por palavras do mesmo campo. Ex: O petróleo subiu. O ouro negro está em alta.",
                        },
                        {
                          icone: "🏁",
                          title: "Elipse",
                          descricao:
                            "Ocultação do termo, pois o contexto já o revelou. Ex: João saiu da sala. (Ele) Voltou correndo.",
                        },
                      ]}
                    />
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM1} // Idealmente usar o quiz correspondente a anáfora
            titulo="Fixação - Módulo 2"
            icone="🎯"
            numero={2}
            variant="cyan"
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          />
        </div>
      </TabsContent>

      {/* MÓDULO 3: O FAROL DO SENTIDO (CATÁFORA) */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={3}
            titulo="O Farol do Sentido"
            descricao="A Catáfora prepara o leitor para o que virá. Aprenda a antecipar ideias com elegância."
            gradiente="bg-gradient-to-br from-blue-600 to-cyan-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Antecipação Textual (Catáfora)"
              variant="blue"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação",
                  icone:<LuCompass />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Diferente da anáfora, a <strong>Catáfora</strong> aponta
                        para frente. O vocábulo catafórico aparece antes do nome
                        que ele representa, gerando tensão literária e foco
                        imediato na informação por vir.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Análise Clássica",
                  icone:<LuTarget />,
                  conteudo:(
                    <div className="p-8 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex flex-col justify-center italic text-xl font-medium relative overflow-hidden">
                      <p className="z-10 relative">
                        "Eu só quero{" "}
                        <span className="text-cyan-600 font-bold bg-cyan-500/10 px-1 rounded">
                          ISTO
                        </span>
                        : sua{" "}
                        <span className="text-blue-600 font-bold underline decoration-wavy">
                          APROVAÇÃO
                        </span>
                        ."
                      </p>
                      <span className="text-sm mt-4 text-muted-foreground not-italic z-10 relative">
                        *A palavra ISTO (pronome) precisa da palavra APROVAÇÃO
                        (substantivo pós-fixado) para que sua existência tenha
                        lógica nessa frase.*
                      </span>
                      <LuCompass className="absolute -right-4 -bottom-4 w-32 h-32 text-blue-500/5 z-0" />
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM1}
            titulo="Fixação - Módulo 3"
            icone="🎯"
            numero={3}
            variant="blue"
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </div>
      </TabsContent>

      {/* MÓDULO 4: O SILÊNCIO ELOQUENTE (ELIPSE E ZÊUGMA) */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={4}
            titulo="O Silêncio Eloquente"
            descricao="Às vezes, não dizer nada é a melhor forma de conectar. Domine Elipse e Zêugma."
            gradiente="bg-gradient-to-br from-teal-600 to-emerald-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={4}
              title="Coesão por Omissão"
              variant="emerald"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Elipse",
                  icone:<LuBookOpen />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-lg">
                        A omissão de um termo que nunca apareceu antes no texto,
                        mas é facilmente identificado pelo contexto
                        (frequentemente o sujeito oculto).
                      </p>
                      <div className="p-6 bg-muted/50 rounded-2xl border border-border italic font-bold">
                        "[Elipse] Estaremos na refinaria amanhã." -{">"} (Nós)
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Zêugma",
                  icone:<LuAnchor />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-lg">
                        A omissão de um termo que <strong>já apareceu</strong>{" "}
                        anteriormente na frase.
                      </p>
                      <div className="p-6 bg-muted/50 rounded-2xl border border-border italic font-bold">
                        "Ela estudou Português com afinco; ele, [Zêugma]
                        Matemática." -{">"} (estudou)
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM4}
            titulo="Fixação - Módulo 4"
            icone="🎯"
            numero={4}
            variant="emerald"
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
          />
        </div>
      </TabsContent>

      {/* MÓDULO 5: SUBSTITUIÇÕES DE ELITE */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={5}
            titulo="Substituições de Elite"
            descricao="Nominalização, Hiperonímia e Palavras-Sumário: o arsenal avançado de coesão lexical."
            gradiente="bg-gradient-to-br from-blue-700 to-sky-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={5}
              title="A Coesão Lexical (Glossário)"
              variant="blue"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "A Ferramenta",
                  icone:<LuLightbulb />,
                  conteudo:(
                    <p className="text-muted-foreground leading-relaxed">
                      A referenciação anômima é substituída por palavras do
                      campo de ideias. Você usa palavras para agrupar conceitos
                      abrangentes sem cometer um erro estilístico na prova
                      (repetição de palavras seguidas).
                    </p>
                  ),
                },
                {
                  titulo: "Técnicas Clássicas",
                  icone:<LuCheck />,
                  conteudo:(
                    <CardCarousel
                      cards={[
                        {
                          icone: "📝",
                          title: "Nominalização",
                          descricao:
                            "Verbo sendo transposto a substantivo. (O poço jorrou = O jato do poço...)",
                        },
                        {
                          icone: "📦",
                          title: "Palavras-Sumário",
                          descricao:
                            "Termos guarda-chuva: Fato, Circunstância, Problema, Evento, Ideia, Ação.",
                        },
                        {
                          icone: "🦁",
                          title: "Hiperonímia",
                          descricao:
                            "Do particular para o geral. (A onça fugiu. O FELINO...) Felino é hiperônimo de onça.",
                        },
                      ]}
                    />
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM4}
            titulo="Fixação - Módulo 5"
            icone="🎯"
            numero={5}
            variant="blue"
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
          />
        </div>
      </TabsContent>

      {/* MÓDULO 6: A DANÇA DOS CONECTIVOS (COESÃO SEQUENCIAL) */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={6}
            titulo="A Dança dos Conectivos"
            descricao="Transições perfeitas: aprenda a usar conjunções e advérbios para dar ritmo e lógica ao texto."
            gradiente="bg-gradient-to-br from-orange-600 to-amber-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={6}
              title="Coesão Sequencial (O Trânsito do Texto)"
              variant="amber"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Definição",
                  icone:<LuBookOpen />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Enquanto a coesão referencial lida com o vocabulário, a{" "}
                        <strong>Coesão Sequencial</strong> lida com o roteamento
                        lógico de orações. É feita primariamente pelas amadas{" "}
                        <strong>Conjunções</strong>.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Operadores Essenciais",
                  icone:<LuTarget />,
                  conteudo:(
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-5 border border-amber-500/20 bg-amber-500/5 rounded-xl">
                        <h4 className="font-bold mb-2">Conclusão</h4>
                        <p className="text-sm">
                          Portanto, logo, então, por conseguinte, destarte.
                        </p>
                      </div>
                      <div className="p-5 border border-orange-500/20 bg-orange-500/5 rounded-xl">
                        <h4 className="font-bold mb-2">Causa</h4>
                        <p className="text-sm">
                          Pois, porque (junto), visto que, já que, porquanto.
                        </p>
                      </div>
                      <div className="p-5 border border-red-500/20 bg-red-500/5 rounded-xl">
                        <h4 className="font-bold mb-2">Condição</h4>
                        <p className="text-sm">
                          Se, caso, contanto que, desde que.
                        </p>
                      </div>
                      <div className="p-5 border border-emerald-500/20 bg-emerald-500/5 rounded-xl">
                        <h4 className="font-bold mb-2">Finalidade</h4>
                        <p className="text-sm">
                          A fim de que, para que, com o fito de.
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM1}
            titulo="Fixação - Módulo 6"
            icone="🎯"
            numero={6}
            variant="amber"
            onComplete={(score) => handleModuleComplete("modulo-6", score)}
          />
        </div>
      </TabsContent>

      {/* MÓDULO 7: CONCESSÃO & OPOSIÇÃO */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={7}
            titulo="Concessão & Oposição"
            descricao="O divisor de águas da Cesgranrio: diferencie a força do 'Mas' da resiliência do 'Embora'."
            gradiente="bg-gradient-to-br from-red-600 to-rose-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={7}
              title="A Matriz da Divergência"
              variant="rose"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Diferença Vital",
                  icone:<LuScale />,
                  conteudo:(
                    <p className="text-muted-foreground leading-relaxed">
                      Tanto a <strong>Concessão</strong> quanto a{" "}
                      <strong>Adversidade</strong> operam contrastes lógicos em
                      sentenças compostas. A gramática, no entanto, reage
                      distintamente às duas. A concessão é apenas um estorvo à
                      ideia principal, enquanto a adversidade é um freio
                      absoluto que reverte a direção do seu texto.
                    </p>
                  ),
                },
                {
                  titulo: "Adversidade (Mas)",
                  icone:<LuZap />,
                  conteudo:(
                    <div className="p-8 bg-red-500/5 border border-red-500/20 rounded-3xl">
                      <p className="text-muted-foreground">
                        A segunda lógica é OPOSTA à primeira. E a{" "}
                        <strong>segunda prevalece</strong>.
                      </p>
                      <div className="mt-4 p-4 bg-background rounded-xl italic font-bold">
                        "O candidato estudou muito,{" "}
                        <span className="text-red-500 uppercase">
                          mas não passou
                        </span>
                        ." (Foco no fracasso)
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Concessão (Embora)",
                  icone:<LuBrain />,
                  conteudo:(
                    <div className="p-8 bg-rose-500/5 border border-rose-500/20 rounded-3xl">
                      <p className="text-muted-foreground">
                        A primeira lógica gera uma exceção irrelevante perante o
                        impacto soberano da segunda. A{" "}
                        <span className="font-bold underline">
                          Concessão não impede
                        </span>{" "}
                        a ideia principal.
                      </p>
                      <div className="mt-4 p-4 bg-background rounded-xl italic font-bold">
                        "Embora estivesse muito calor,{" "}
                        <span className="text-rose-500 uppercase">
                          o motor continuou em resfriamento ótimo
                        </span>
                        ." (Foco no sucesso)
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM3}
            titulo="Fixação - Módulo 7"
            icone="🎯"
            numero={7}
            variant="rose"
            onComplete={(score) => handleModuleComplete("modulo-7", score)}
          />
        </div>
      </TabsContent>

      {/* MÓDULO 8: ARQUITETURA DA COERÊNCIA */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={8}
            titulo="Arquitetura da Coerência"
            descricao="O plano do conteúdo: entenda os princípios da Não-Contradição e da Relevância."
            gradiente="bg-gradient-to-br from-emerald-600 to-teal-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={8}
              title="A Consistência Interna"
              variant="emerald"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Princípio da Não-Contradição",
                  icone:<LuCheck />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        As ideias e informações veiculadas em um texto, sob
                        aspecto semântico, <strong>não podem</strong> ir uma de
                        encontro a outra. Um autor não pode defender um ponto no
                        primeiro parágrafo e refutá-lo acidentalmente no
                        segundo.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Princípio da Tautologia (Erro)",
                  icone:<LuTriangleAlert />,
                  conteudo:(
                    <AlertBox tipo="danger" titulo="Não seja redundante">
                      <p className="text-sm">
                        Evite o "Subir pra cima". A Tautologia é o defeito fatal
                        da coerência, em que o narrador fala exaustivamente em
                        cima do próprio argumento usando outras palavras, não
                        adicionando <strong>NADA</strong> ao corpus do texto
                        (falta de Progressão).
                      </p>
                    </AlertBox>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM2}
            titulo="Fixação - Módulo 8"
            icone="🎯"
            numero={8}
            variant="emerald"
            onComplete={(score) => handleModuleComplete("modulo-8", score)}
          />
        </div>
      </TabsContent>

      {/* MÓDULO 9: PROGRESSÃO E RELEVÂNCIA */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={9}
            titulo="Progressão e Relevância"
            descricao="Aprenda a fazer o texto caminhar (Novidade) sem perder o fio da meada (Continuidade)."
            gradiente="bg-gradient-to-br from-teal-600 to-cyan-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={9}
              title="O Motor Semântico do Texto"
              variant="emerald"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação Vital",
                  icone:<LuBookOpen />,
                  conteudo:(
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      Todo texto tem uma{" "}
                      <strong>Tese (motivo de existir)</strong>. Em todo seu
                      desenrolar, existe a necessidade da injeção de{" "}
                      <strong>Novos Fatos</strong> baseados nos{" "}
                      <strong>
                        Fatos que já foram aceitos pelo leitor ou apresentados
                        pelo autor
                      </strong>
                      . Se não há novidade, apenas estagnação. Se há muita
                      novidade, mas ela não tem relevância ou nexo, há
                      estilhaçamento. O Segredo é Inovar Continuadamente.
                    </p>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM2}
            titulo="Fixação - Módulo 9"
            icone="🎯"
            numero={9}
            variant="emerald"
            onComplete={(score) => handleModuleComplete("modulo-9", score)}
          />
        </div>
      </TabsContent>

      {/* MÓDULO 10: ARENA DE ELITE */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={10}
            titulo="Arena de Elite"
            descricao="Consolidação final: 10 questões inéditas padrão Cesgranrio 2026 para zerar a matéria."
            gradiente="bg-gradient-to-br from-blue-700 to-cyan-900"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={10}
              title="Resumo Visual Final"
              variant="blue"
            />

            <ModuleSummaryCarouselNew
              tituloAula="Coesão e Coerência"
              materia="Língua Portuguesa"
              profissao="Técnico de Operação"
              moduloNome="Premium"
              images={[
                {
                  title: "Mapa Mental: Coesão Referencial",
                  type: "Mapa Mental",
                  placeholderColor: "bg-blue-500",
                  imageUrl:
                    "/images/mapa-mental/coesao_referencial_1771465579878.png",
                },
                {
                  title: "Infográfico: Anáfora vs Catáfora",
                  type: "Infográfico",
                  placeholderColor: "bg-cyan-500",
                  imageUrl:
                    "/images/mapa-mental/anafora_catafora_1771466182917.png",
                },
                {
                  title: "Esquema: Elipse e Zêugma",
                  type: "Mapa Mental",
                  placeholderColor: "bg-teal-500",
                  imageUrl:
                    "/images/mapa-mental/elipse_zeugma_1771466156558.png",
                },
              ]}
            />
          </section>

          {showCompletionBadge ? (
            <div className="flex flex-col items-center gap-6 py-10">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center animate-bounce">
                <LuTrophy className="w-12 h-12 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black">
                Parabéns! Coesão Dominada!
              </h3>
              <p className="text-center text-muted-foreground max-w-sm">
                A tessitura do seu texto alcançou os níveis máximos requeridos
                para os Concursos Elite!
              </p>
            </div>
          ) : (
            <QuizInterativo
              questoes={quizFinal}
              titulo="Simulado de Elite"
              icone="🏆"
              numero={10}
              variant="blue"
              onComplete={(score) => handleModuleComplete("modulo-10", score)}
            />
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}













