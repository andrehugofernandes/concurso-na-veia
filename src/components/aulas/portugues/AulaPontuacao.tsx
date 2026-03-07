"use client";

import { useState, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import {
  FlipCard,
  ContentAccordion,
  CardCarousel,
  QuizInterativo,
  ModuleBanner,
  AlertBox,
  AulaProps,
  AulaTemplate,
  getRandomQuestions,
  ModuleSectionHeader,
  ModuleSummaryCarouselNew,
} from "../shared";

import {
  LuBookOpen,
  LuTarget,
  LuTrophy,
  LuTriangleAlert,
  LuBrain,
  LuLightbulb,
  LuCheck,
  LuCircleX,
} from "react-icons/lu";

import {
  QUIZ_M1_PONTUACAO,
  QUIZ_M2_PONTUACAO,
  QUIZ_M3_PONTUACAO,
  QUIZ_M4_PONTUACAO,
  QUIZ_FINAL_PONTUACAO,
} from "./data/pontuacao-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "MÃ³dulo 1", title: "Fundamentos e ProibiÃ§Ãµes" },
  { id: "modulo-2", label: "MÃ³dulo 2", title: "VÃ­rgula: Termos da OraÃ§Ã£o" },
  {
    id: "modulo-3",
    label: "MÃ³dulo 3",
    title: "VÃ­rgula: OraÃ§Ãµes e ConjunÃ§Ãµes",
  },
  { id: "modulo-4", label: "MÃ³dulo 4", title: "PontuaÃ§Ã£o AvanÃ§ada" },
  { id: "modulo-5", label: "MÃ³dulo 5", title: "LaboratÃ³rio de Gabarito" },
] as const;

export default function AulaPontuacao({
  titulo,
  descricao,
  duracao,
  materiaNome,
  materiaCor,
  materiaId,
  prevTopico,
  nextTopico,
  onComplete,
  isCompleted,
  loading,
  xpGanho = 50,
  currentProgress,
  onUpdateProgress,
}: AulaProps) {
  const [quizM1, setQuizM1] = useState<typeof QUIZ_M1_PONTUACAO>([]);
  const [quizM2, setQuizM2] = useState<typeof QUIZ_M2_PONTUACAO>([]);
  const [quizM3, setQuizM3] = useState<typeof QUIZ_M3_PONTUACAO>([]);
  const [quizM4, setQuizM4] = useState<typeof QUIZ_M4_PONTUACAO>([]);
  const [quizFinal, setQuizFinal] = useState<typeof QUIZ_FINAL_PONTUACAO>([]);
  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(),
  );

  const [hasSyncedInitial, setHasSyncedInitial] = useState(false);
  const [showCompletionBadge, setShowCompletionBadge] = useState(false);

  useEffect(() => {
    if (isCompleted) setShowCompletionBadge(true);
  }, [isCompleted]);

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

  useEffect(() => {
    if (!loading) {
      setQuizM1(getRandomQuestions(QUIZ_M1_PONTUACAO, 4));
      setQuizM2(getRandomQuestions(QUIZ_M2_PONTUACAO, 4));
      setQuizM3(getRandomQuestions(QUIZ_M3_PONTUACAO, 4));
      setQuizM4(getRandomQuestions(QUIZ_M4_PONTUACAO, 4));
      setQuizFinal(getRandomQuestions(QUIZ_FINAL_PONTUACAO, 10));
    }
  }, [loading]);

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

      if (index === MODULE_DEFS.length - 1) {
        setShowCompletionBadge(true);
        onComplete?.();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setTimeout(() => setActiveTab(MODULE_DEFS[index + 1].id), 1500);
      }
    }
  };

  const isModuleUnlocked = (index: number) => {
    if (isCompleted || index === 0) return true;
    return completedModules.has(MODULE_DEFS[index - 1].id);
  };

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={(val) => {
        const idx = MODULE_DEFS.findIndex((m) => m.id === val);
        if (isModuleUnlocked(idx)) setActiveTab(val);
      }}
      modules={Array.from(MODULE_DEFS)}
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
      currentProgress={Math.round(
        (completedModules.size / MODULE_DEFS.length) * 100,
      )}
      onComplete={onComplete}
      loading={loading}
      xpGanho={xpGanho}
    >
      {/* === MÃ“DULO 1 === */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={1}
            titulo="Sintaxe e Fundamentos"
            descricao="A base de tudo: por que a vÃ­rgula nÃ£o Ã© um respiro?"
            gradiente="bg-gradient-to-br from-blue-700 to-sky-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Desafio Inicial: VÃ­rgula ou Pausa?"
              variant="blue"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <p className="text-lg text-foreground leading-relaxed">
                  Muitas vezes, a nossa fala nos engana. O cÃ©rebro pede uma
                  pausa onde a gramÃ¡tica <strong>proÃ­be</strong> terminantemente
                  uma vÃ­rgula.
                </p>
                <AlertBox tipo="warning" titulo="O Grande Perigo">
                  <p className="text-sm">
                    Na prova da Petrobras, a banca adora colocar sujeitos longos
                    enormes e, em seguida, uma vÃ­rgula maldosa logo antes do
                    verbo. Apenas para forÃ§ar vocÃª a querer "respirar".
                  </p>
                </AlertBox>
              </div>

              <FlipCard
                frente={
                  <div className="p-8 flex flex-col items-center justify-center text-center h-full space-y-4">
                    <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center text-2xl font-black">
                      ?
                    </div>
                    <p className="font-bold text-lg">
                      "Os novos funcionÃ¡rios da plataforma P-70, chegaram hoje."
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Esta frase estÃ¡ correta?
                    </p>
                  </div>
                }
                verso={
                  <div className="p-8 flex flex-col items-center justify-center text-center h-full space-y-4 bg-red-500/5">
                    <LuCircleX className="w-14 h-14 text-red-500" />
                    <h4 className="font-bold text-red-600 text-xl">ERRADO!</h4>
                    <p className="text-sm">
                      VocÃª sentiu vontade de colocar a vÃ­rgula por causa do
                      tamanho do sujeito, mas{" "}
                      <strong>NÃƒO SE SEPARA SUJEITO DO VERBO</strong>.
                    </p>
                  </div>
                }
              />
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="A Ordem Sagrada: S-V-C"
              variant="blue"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "A Regra de Ouro (SVC)",
                  icone:<LuBookOpen />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Em PortuguÃªs, a Ordem Direta Ã©{" "}
                        <strong>Sujeito + Verbo + Complemento</strong>. Entre
                        essas peÃ§as, a vÃ­rgula funciona como uma guilhotina que
                        decapita o sentido da frase. Essa separaÃ§Ã£o Ã© crime
                        gramatical gravÃ­ssimo.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Mitos Comuns",
                  icone:<LuLightbulb />,
                  conteudo:(
                    <CardCarousel
                      cards={[
                        {
                          icone: "ðŸ—£ï¸",
                          title: "O Mito do Respiro",
                          descricao:
                            "Falso: 'VÃ­rgula marca onde eu respiro.' Milhares de pausas na fala nÃ£o levam vÃ­rgula na escrita.",
                        },
                        {
                          icone: "ðŸ“",
                          title: "O Mito do Tamanho",
                          descricao:
                            "Falso: 'Sujeito muito longo pede vÃ­rgula'. O sujeito pode ser um parÃ¡grafo inteiro. Sem vÃ­rgula nele!",
                        },
                        {
                          icone: "âž•",
                          title: "O Mito do 'E'",
                          descricao:
                            "Falso: 'Antes de conjunÃ§Ã£o E nunca vai vÃ­rgula'. Pode ir se tiver sujeitos diferentes ou polissÃ­ndeto.",
                        },
                      ]}
                    />
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM1}
            titulo="FixaÃ§Ã£o - MÃ³dulo 1"
            numero={1}
            variant="blue"
            icone="ðŸ§ "
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          />
        </div>
      </TabsContent>

      {/* === MÃ“DULO 2 === */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={2}
            titulo="VÃ­rgula: Termos da OraÃ§Ã£o"
            descricao="Aprenda a isolar Vocativos, Apostos e separar EnumeraÃ§Ãµes corretamente."
            gradiente="bg-gradient-to-br from-emerald-600 to-teal-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Vocativo e Aposto"
              variant="emerald"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Vocativo (Chamamento)",
                  icone:<LuTarget />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Ã‰ o termo que invoca ou chama alguÃ©m. Ele nÃ£o participa
                        da estrutura base S-V-C. Ele Ã© um satÃ©lite.{" "}
                        <strong>Sempre precisa estar isolado.</strong>
                      </p>
                      <div className="p-4 bg-muted/50 rounded-xl font-medium">
                        "Doutor, traga o laudo mÃ©dico." <br />
                        "Traga o laudo mÃ©dico, Doutor." <br />
                        "Traga, Doutor, o laudo mÃ©dico."
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Aposto Explicativo",
                  icone:<LuBookOpen />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Termo de natureza nominal que explica ou detalha outro
                        nome. Como ele Ã© uma "gordura" explicativa extra no
                        texto, ele obrigatoriamente vem ladeado por vÃ­rgulas.
                      </p>
                      <div className="p-4 bg-muted/50 rounded-xl font-medium">
                        "O navio sonda, gigante de aÃ§o, operarÃ¡ no prÃ©-sal."
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM2}
            titulo="FixaÃ§Ã£o - MÃ³dulo 2"
            numero={2}
            variant="emerald"
            icone="ðŸŽ¯"
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          />
        </div>
      </TabsContent>

      {/* === MÃ“DULO 3 === */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={3}
            titulo="VÃ­rgula: OraÃ§Ãµes e ConjunÃ§Ãµes"
            descricao="A arte de separar oraÃ§Ãµes coordenadas e entender quando o 'MAS' e o 'E' aceitam vÃ­rgula."
            gradiente="bg-gradient-to-br from-amber-600 to-orange-700"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Sintaxe do PerÃ­odo Composto"
              variant="amber"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "A VÃ­rgula Antes do 'E'",
                  icone:<LuTriangleAlert />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        A regra geral Ã© nÃ£o colocar vÃ­rgula antes do "e". As{" "}
                        <strong>trÃªs exceÃ§Ãµes vitais</strong> aprovadas pela
                        GramÃ¡tica sÃ£o:
                      </p>
                      <ol className="list-decimal ml-6 space-y-2 text-foreground font-medium">
                        <li>
                          <strong>Sujeitos Diferentes:</strong> "O tÃ©cnico
                          aprovou, e a gerÃªncia assinou."
                        </li>
                        <li>
                          <strong>PolissÃ­ndeto:</strong> RepetiÃ§Ã£o estilÃ­stica
                          da conjunÃ§Ã£o. "...e pulou, e riu, e chorou."
                        </li>
                        <li>
                          <strong>Valor Adversativo:</strong> O "e" agindo como
                          falso "mas". "Trabalhou muito, e nÃ£o obteve a
                          promoÃ§Ã£o."
                        </li>
                      </ol>
                    </div>
                  ),
                },
                {
                  titulo: "A regra do MAS",
                  icone:<LuCheck />,
                  conteudo:(
                    <AlertBox tipo="info" titulo="ObrigatÃ³ria e InegociÃ¡vel">
                      <p className="text-sm">
                        Toda conjunÃ§Ã£o coordenativa adversativa (mas, porÃ©m,
                        contudo, todavia) atrai vÃ­rgula para antes de si.
                      </p>
                    </AlertBox>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM3}
            titulo="FixaÃ§Ã£o - MÃ³dulo 3"
            numero={3}
            variant="amber"
            icone="ðŸŽ¯"
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </div>
      </TabsContent>

      {/* === MÃ“DULO 4 === */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={4}
            titulo="PontuaÃ§Ã£o AvanÃ§ada"
            descricao="Dois-pontos, TravessÃµes, Ponto e VÃ­rgula e a sutil arte de controlar o ritmo literÃ¡rio do texto."
            gradiente="bg-gradient-to-br from-red-600 to-red-800"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="AlÃ©m da VÃ­rgula"
              variant="rose"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Dois-Pontos (:)",
                  icone:<LuLightbulb />,
                  conteudo:(
                    <p className="text-muted-foreground leading-relaxed">
                      Dois-pontos agem como um garÃ§om. Eles apresentam algo: uma
                      explicaÃ§Ã£o que confirma o que foi dito, uma listagem ou
                      ainda uma citaÃ§Ã£o intertextual.
                    </p>
                  ),
                },
                {
                  titulo: "Ponto e VÃ­rgula (;)",
                  icone:<LuBrain />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        O ponto e vÃ­rgula tem como grande objetivo afastar as
                        oraÃ§Ãµes mais do que a vÃ­rgula afasta, mas nÃ£o encerrar a
                        unidade de sentido como faz o ponto final.
                      </p>
                      <AlertBox tipo="warning" titulo="Uso PrimÃ¡rio">
                        <p className="text-sm">
                          Lista de itens extensos (como leis e diretrizes), ou
                          em oraÃ§Ãµes coordenadas jÃ¡ muito divididas por vÃ­rgulas
                          menores no interior de suas frases originais.
                        </p>
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={quizM4}
            titulo="FixaÃ§Ã£o - MÃ³dulo 4"
            numero={4}
            variant="rose"
            icone="ðŸŽ¯"
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
          />
        </div>
      </TabsContent>

      {/* === MÃ“DULO 5 === */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={5}
            titulo="LaboratÃ³rio de Gabarito"
            descricao="O Simulado que crava esse tema no seu subconsciente. 10 questÃµes inÃ©ditas completas."
            gradiente="bg-gradient-to-br from-slate-800 to-slate-900"
          />

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={5}
              title="Resumo Visual Final"
              variant="slate"
            />
            <ModuleSummaryCarouselNew
              tituloAula="PontuaÃ§Ã£o"
              materia="LÃ­ngua Portuguesa"
              profissao="TÃ©cnico de OperaÃ§Ã£o"
              moduloNome="Premium"
              images={[
                {
                  title: "Mapa Mental: Os nÃ£o-separÃ¡veis",
                  type: "Mapa Mental",
                  placeholderColor: "bg-slate-500",
                  imageUrl:
                    "/images/mapa-mental/coesao_referencial_1771465579878.png",
                },
                {
                  title: "InfogrÃ¡fico: Regras da OraÃ§Ã£o Subordinada",
                  type: "InfogrÃ¡fico",
                  placeholderColor: "bg-blue-500",
                  imageUrl:
                    "/images/mapa-mental/anafora_catafora_1771466182917.png",
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
                ParabÃ©ns! PontuaÃ§Ã£o Afiada!
              </h3>
              <p className="text-center text-muted-foreground max-w-sm">
                Agora vocÃª escreve e decifra textos com o poder de um maestro
                sintÃ¡tico. Letras sÃ£o notas. A pontuaÃ§Ã£o Ã© o compasso musical do
                seu sucesso em provas da Cesgranrio!
              </p>
            </div>
          ) : (
            <QuizInterativo
              questoes={quizFinal}
              titulo="Simulado de Ouro"
              numero={5}
              variant="slate"
              icone="ðŸ†"
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
            />
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}












