"use client";

import { useState, useCallback, useEffect } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  LuCheck,
  LuCirclePlay as LuPlayCircle,
  LuBrain,
  LuMusic,
  LuZap,
  LuBookOpen,
  LuShield,
  LuMessageCircle,
  LuTriangleAlert,
  LuArrowRight,
  LuEye,
  LuFileText,
  LuTarget,
  LuLightbulb,
  LuTrophy,
  LuCircleCheck,
  LuCircleX,
  LuLayers,
} from "react-icons/lu";
import {
  QuizQuestion,
  getRandomQuestions,
  AlertBox,
  FlipCard,
  QuizInterativo,
  TimelineItem,
  ModuleBanner,
  CardCarousel,
  StickyModuleNav,
  ModuleSectionHeader,
  ContentAccordion,
  LessonTabs,
  ModuleSummaryCarouselNew,
  MusicPlayerCard,
  ProgressIndicator,
  AulaProps,
  VideoModal,
  AulaTemplate,
  Comparison,
} from "../shared";

import {
  QUIZ_M1_PONTUACAO,
  QUIZ_M2_PONTUACAO,
  QUIZ_M3_PONTUACAO,
  QUIZ_M4_PONTUACAO,
  QUIZ_M5_PONTUACAO,
  QUIZ_M6_PONTUACAO,
  QUIZ_M7_PONTUACAO,
  QUIZ_M8_PONTUACAO,
  QUIZ_M9_PONTUACAO,
  QUIZ_FINAL_PONTUACAO,
} from "./data/pontuacao-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Visão Geral e Funções" },
  { id: "modulo-2", label: "Módulo 2", title: "Vírgula: Proibições Fatais" },
  { id: "modulo-3", label: "Módulo 3", title: "Vírgula: Termos Essenciais" },
  { id: "modulo-4", label: "Módulo 4", title: "Vírgula: Aposto e Vocativo" },
  { id: "modulo-5", label: "Módulo 5", title: "Vírgula: Adjuntos Deslocados" },
  { id: "modulo-6", label: "Módulo 6", title: "Vírgula: Orações Coordenadas" },
  { id: "modulo-7", label: "Módulo 7", title: "Vírgula: Orações Subordinadas" },
  { id: "modulo-8", label: "Módulo 8", title: "Ponto e Ponto e Vírgula" },
  { id: "modulo-9", label: "Módulo 9", title: "Sinais Complementares" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Final" },
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
  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(),
  );
  const [hasSyncedInitial, setHasSyncedInitial] = useState(false);
  const [showCompletionBadge, setShowCompletionBadge] = useState(false);

  const totalModulos = MODULE_DEFS.length;

  useEffect(() => {
    if (
      currentProgress &&
      currentProgress > 0 &&
      !hasSyncedInitial &&
      !loading
    ) {
      const count = Math.floor((currentProgress / 100) * totalModulos);
      const s = new Set<string>();
      for (let i = 0; i < count; i++) {
        s.add(MODULE_DEFS[i].id);
      }
      setCompletedModules(s);
      if (count < totalModulos) {
        setActiveTab(MODULE_DEFS[count].id);
      } else {
        setActiveTab(MODULE_DEFS[totalModulos - 1].id);
      }
      setHasSyncedInitial(true);
    }
  }, [currentProgress, hasSyncedInitial, loading, totalModulos]);

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) {
      setCompletedModules((prev) => {
        const n = new Set(prev);
        n.add(moduleId);
        return n;
      });

      const idx = MODULE_DEFS.findIndex((m) => m.id === moduleId);
      onUpdateProgress?.(Math.round(((idx + 1) / totalModulos) * 100));

      if (idx < totalModulos - 1) {
        setTimeout(() => setActiveTab(MODULE_DEFS[idx + 1].id), 1500);
      } else {
        setShowCompletionBadge(true);
        if (onComplete) onComplete();
      }
    }
  };

  const isModuleUnlocked = (index: number) => {
    if (index === 0) return true;
    return completedModules.has(MODULE_DEFS[index - 1].id) || isCompleted;
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
      isCompleted={isCompleted}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
      currentProgress={Math.round((completedModules.size / totalModulos) * 100)}
      onComplete={onComplete}
      loading={loading}
      xpGanho={xpGanho}
    >
      {/* Módulo 1: Visão Geral */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={1}
            titulo="Visão Geral e Funções"
            descricao="Pontuar não é apenas pausar para respirar; é garantir a clareza e a coesão do texto técnico."
            gradiente="bg-gradient-to-br from-blue-700 to-indigo-900"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="As Finalidades da Pontuação"
              variant="blue"
            />
            <CardCarousel
              cards={[
                {
                  icone: "🔍",
                  title: "Clareza",
                  descricao:
                    "Garantir que o leitor entenda exatamente onde termina uma ideia e começa outra.",
                },
                {
                  icone: "🤝",
                  title: "Coesão",
                  descricao:
                    "Sinalizar os limites das estruturas sintáticas e seus nexos lógicos.",
                },
                {
                  icone: "🎭",
                  title: "Sentido",
                  descricao:
                    "Alterar a ênfase e o significado conforme o posicionamento dos sinais.",
                },
                {
                  icone: "📋",
                  title: "Hierarquia",
                  descricao:
                    "Indicar a importância relativa de cada informação e organizar níveis de subordinação no texto.",
                },
                {
                  icone: "✍️",
                  title: "Estilo",
                  descricao:
                    "Refletir o estilo do autor: pausas dramáticas, enumerações exaustivas, falas diretas.",
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Os Sinais e Suas Funções"
              variant="blue"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "A Vírgula (,)",
                  icone: <LuFileText />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        A vírgula é o sinal mais versátil e mais cobrado em
                        provas. Ela separa elementos de mesma função sintática
                        (enumerações), isola termos intercalados (aposto,
                        vocativo, adjunto deslocado) e marca orações inseridas
                        dentro do período.
                      </p>
                      <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl text-sm">
                        ❌ Nunca deve separar o sujeito do verbo nem o verbo do
                        objeto direto.
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "O Ponto Final (.)",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        O ponto final encerra um período declarativo ou
                        imperativo. Marca a conclusão completa de uma ideia.
                        Também é usado em abreviações (Dr., Eng.). Em provas da
                        Cesgranrio, questões sobre ponto abordam sua função
                        delimitadora de períodos.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "O Ponto e Vírgula (;)",
                  icone: <LuLayers />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        O ponto e vírgula indica uma pausa maior que a vírgula
                        e menor que o ponto final. É usado para separar orações
                        coordenadas extensas que já contêm vírgulas internas e
                        para organizar itens de listas com subdivisões. Muito
                        comum em documentos oficiais e textos jurídicos.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Os Dois-Pontos (:)",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Os dois-pontos anunciam o que vem a seguir: uma
                        enumeração, uma citação direta, uma explicação ou uma
                        conclusão. São obrigatórios antes de discurso direto e
                        em enumerações que sumarizam o sujeito da oração.
                      </p>
                      <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl italic text-sm">
                        "Trouxe tudo: relatórios, planilhas e contratos."
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "O Travessão (—)",
                  icone: <LuArrowRight />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        O travessão isola explicações intercaladas com maior
                        destaque que o parênteses ou as vírgulas. Também marca
                        a fala de personagens em discurso direto. O travessão
                        duplo dá ênfase ao trecho intercalado.
                      </p>
                      <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl italic text-sm">
                        "O laudo — aprovado por todos — foi publicado."
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "As Reticências (...)",
                  icone: <LuMessageCircle />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        As reticências indicam suspensão do pensamento,
                        hesitação, omissão intencional de parte do texto citado,
                        ou um sentido implícito deixado para o leitor
                        interpretar. Em textos técnicos indicam supressão de
                        trecho citado.
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Pontuação Normativa × Pontuação Expressiva"
              variant="blue"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FlipCard
                frente={
                  <div className="text-center space-y-2">
                    <LuShield className="h-8 w-8 text-blue-400 mx-auto" />
                    <p className="font-bold text-lg">Pontuação Normativa</p>
                    <p className="text-xs text-muted-foreground">
                      Regras gramaticais obrigatórias
                    </p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p>✅ Segue as normas da gramática tradicional</p>
                    <p>✅ Cobrada em provas de concursos públicos</p>
                    <p>✅ Exemplo: vírgula isolando aposto e vocativo</p>
                    <p>✅ Garante a correção formal do texto técnico</p>
                  </div>
                }
              />
              <FlipCard
                frente={
                  <div className="text-center space-y-2">
                    <LuMusic className="h-8 w-8 text-purple-400 mx-auto" />
                    <p className="font-bold text-lg">Pontuação Expressiva</p>
                    <p className="text-xs text-muted-foreground">
                      Escolha estilística do autor
                    </p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p>🎨 Usada com liberdade em textos literários</p>
                    <p>🎨 Cria ritmo, ênfase e efeitos dramáticos</p>
                    <p>🎨 Exemplo: reticências para criar suspense</p>
                    <p>⚠️ Não deve ser base para questões de concurso</p>
                  </div>
                }
              />
            </div>
            <AlertBox tipo="info" titulo="Foco Cesgranrio">
              Em provas da Cesgranrio e do IBGE, o foco é sempre a pontuação
              normativa — aquela que segue regras gramaticais precisas. Não
              confunda com usos literários e expressivos que podem aparecer em
              textos de apoio mas não são cobrados como regra.
            </AlertBox>
          </section>

          <QuizInterativo
            questoes={QUIZ_M1_PONTUACAO}
            titulo="Fixação - Módulo 1"
            icone="🎯"
            numero={1}
            variant="blue"
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 2: Proibições Fatais */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={2}
            titulo="Vírgula: Proibições Fatais"
            descricao="O que NUNCA fazer se você quiser ser aprovado. Erros que zeram questões de gramática."
            gradiente="bg-gradient-to-br from-red-700 to-orange-800"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Scanner de Erros Fatais"
              variant="rose"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AlertBox tipo="danger" titulo="Não Separe o Sujeito">
                Nunca coloque vírgula isolando o sujeito de seu verbo.
                <br /> ❌ "A Petrobras, produz gás."
              </AlertBox>
              <AlertBox tipo="danger" titulo="Não Separe o Objeto">
                Nunca coloque vírgula isolando o verbo de seus objetos (Direto
                ou Indireto).
                <br /> ❌ "Compramos, os equipamentos."
              </AlertBox>
            </div>
            <Comparison
              title="A Regra de Ouro"
              left={{
                title: "Pecado Capital (❌)",
                content: "O gerente de planta, autorizou o embarque.",
                description: "Vírgula separando sujeito do verbo.",
                variant: "danger",
              }}
              right={{
                title: "Norma Culta (✅)",
                content: "O gerente de planta autorizou o embarque.",
                description: "Sujeito e verbo unidos sem interrupção.",
                variant: "success",
              }}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Catálogo Completo das Proibições"
              variant="rose"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Proibição 1: Sujeito × Verbo",
                  icone: <LuCircleX />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Jamais separe o sujeito (simples ou composto) de seu
                        predicado por vírgula. Mesmo que o sujeito seja longo,
                        a regra é categórica.
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-sm">
                          ❌ "A equipe de engenharia da plataforma P-36,
                          concluiu a inspeção."
                        </div>
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-sm">
                          ✅ "A equipe de engenharia da plataforma P-36
                          concluiu a inspeção."
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Proibição 2: Verbo × Objeto Direto",
                  icone: <LuCircleX />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        O verbo e seu objeto direto (sem preposição) formam um
                        bloco inseparável. Inserir vírgula entre eles é erro
                        grave de pontuação.
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-sm">
                          ❌ "O inspetor verificou, todos os registros de
                          pressão."
                        </div>
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-sm">
                          ✅ "O inspetor verificou todos os registros de
                          pressão."
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Proibição 3: Verbo × Objeto Indireto",
                  icone: <LuCircleX />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        O objeto indireto (com preposição obrigatória) também
                        não admite vírgula de separação do verbo que o rege.
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-sm">
                          ❌ "A diretora informou, ao conselho sobre os
                          resultados."
                        </div>
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-sm">
                          ✅ "A diretora informou ao conselho sobre os
                          resultados."
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Proibição 4: Verbo × Predicativo do Sujeito",
                  icone: <LuCircleX />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Em orações com verbos de ligação (ser, estar, ficar,
                        parecer etc.), nunca separe o verbo de ligação do
                        predicativo do sujeito por vírgula.
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-sm">
                          ❌ "O relatório final ficou, incompleto."
                        </div>
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-sm">
                          ✅ "O relatório final ficou incompleto."
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Proibição 5: Conjunção Integrante × Oração",
                  icone: <LuCircleX />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Não se usa vírgula antes das conjunções integrantes
                        "que" e "se" quando introduzem oração subordinada
                        substantiva em posição normal (depois do verbo da
                        oração principal).
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-sm">
                          ❌ "A gerência decidiu, que o projeto seria
                          aprovado."
                        </div>
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-sm">
                          ✅ "A gerência decidiu que o projeto seria aprovado."
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
            <AlertBox tipo="danger" titulo="Armadilha Cesgranrio Clássica">
              A banca costuma apresentar sujeitos muito longos (com várias
              frases preposicionais intercaladas) para induzir o candidato a
              separar o sujeito do verbo com vírgula. Independentemente do
              tamanho do sujeito, a vírgula antes do verbo é SEMPRE errada se
              não houver termo intercalado (aposto, vocativo ou adjunto
              deslocado) justificando-a.
            </AlertBox>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={4}
              title="Teste Rápido: Certo ou Errado?"
              variant="rose"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FlipCard
                frente={
                  <div className="text-center space-y-3 p-2">
                    <LuEye className="h-7 w-7 text-yellow-400 mx-auto" />
                    <p className="font-bold">Analise esta frase:</p>
                    <p className="italic text-sm">
                      "Os operadores da Petrobras, treinaram por seis meses."
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Vire para ver a resposta
                    </p>
                  </div>
                }
                verso={
                  <div className="space-y-3 text-sm">
                    <p className="font-bold text-red-400">❌ ERRADA</p>
                    <p>
                      A vírgula após "Petrobras" separa ilegalmente o sujeito
                      "Os operadores da Petrobras" do verbo "treinaram".
                    </p>
                    <p className="italic">
                      ✅ Correto: "Os operadores da Petrobras treinaram por
                      seis meses."
                    </p>
                  </div>
                }
              />
              <FlipCard
                frente={
                  <div className="text-center space-y-3 p-2">
                    <LuEye className="h-7 w-7 text-yellow-400 mx-auto" />
                    <p className="font-bold">Analise esta frase:</p>
                    <p className="italic text-sm">
                      "O coordenador solicitou, a revisão do contrato."
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Vire para ver a resposta
                    </p>
                  </div>
                }
                verso={
                  <div className="space-y-3 text-sm">
                    <p className="font-bold text-red-400">❌ ERRADA</p>
                    <p>
                      A vírgula após "solicitou" separa o verbo de seu objeto
                      direto "a revisão do contrato".
                    </p>
                    <p className="italic">
                      ✅ Correto: "O coordenador solicitou a revisão do
                      contrato."
                    </p>
                  </div>
                }
              />
            </div>
          </section>

          <QuizInterativo
            questoes={QUIZ_M2_PONTUACAO}
            titulo="Fixação - Módulo 2"
            icone="🎯"
            numero={2}
            variant="rose"
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 3: Termos Essenciais */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={3}
            titulo="Vírgula: Termos Essenciais"
            descricao="Enumerações, repetições e a organização básica da frase."
            gradiente="bg-gradient-to-br from-blue-600 to-cyan-800"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Listas e Repetições"
              variant="blue"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Enumeração",
                  icone: <LuLayers />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Usada para separar elementos de mesma função sintática
                        sem conjunção entre eles.
                      </p>
                      <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl italic">
                        "O setor adquiriu brocas, compressores, bombas e
                        geradores."
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Omissão de Verbo (Zêugma)",
                  icone: <LuZap />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        A vírgula substitui um verbo já mencionado
                        anteriormente.
                      </p>
                      <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl italic">
                        "João prefere o mar; Pedro, a terra."
                        <br />{" "}
                        <span className="text-xs opacity-60">
                          (A vírgula substitui "prefere")
                        </span>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={4}
              title="Regras SVO e Enumeração"
              variant="blue"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Estrutura SVO e a Vírgula",
                  icone: <LuLayers />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Na ordem direta (Sujeito + Verbo + Objeto), nunca há
                        vírgula separando esses termos essenciais. A vírgula só
                        aparece quando um termo intercalado (aposto, adjunto
                        deslocado, oração explicativa) rompe essa sequência.
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-sm">
                          ✅ "A Petrobras produziu petróleo." (SVO sem vírgula)
                        </div>
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-sm">
                          ✅ "A Petrobras, empresa estatal, produziu petróleo."
                          (aposto intercalado entre vírgulas)
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Enumeração sem Conjunção Final",
                  icone: <LuZap />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Quando todos os elementos de uma lista são separados por
                        vírgula, sem conjunção no final, cria-se um efeito de
                        lista exaustiva e acumulativa (assíndeto).
                      </p>
                      <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl italic text-sm">
                        "Chegou, olhou, avaliou, assinou." — ritmo acelerado,
                        ações sequenciais rápidas.
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Enumeração com Conjunção Final",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        O padrão mais comum em textos formais: vírgulas
                        separando os primeiros elementos e conjunção "e" / "ou"
                        antes do último. A vírgula antes da conjunção final
                        (serial comma) é facultativa no português brasileiro.
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl text-sm">
                          ✅ "Comprou brocas, compressores e bombas."
                        </div>
                        <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl text-sm">
                          ✅ "Comprou brocas, compressores, e bombas."
                          (facultativa)
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
            <Comparison
              title="Sujeito Simples × Sujeito Composto"
              left={{
                title: "Sujeito Simples",
                content: "O engenheiro aprovou o projeto.",
                description:
                  "Sem vírgula. Sujeito único, verbo e objeto em sequência direta.",
                variant: "success",
              }}
              right={{
                title: "Sujeito Composto",
                content: "O engenheiro e a geóloga aprovaram o projeto.",
                description:
                  "Sem vírgula entre sujeito composto e verbo. A conjunção 'e' já une os núcleos.",
                variant: "success",
              }}
            />
            <AlertBox tipo="warning" titulo="Atenção: Sujeito Composto Posposto">
              Quando o sujeito composto vem depois do verbo (ordem invertida),
              usa-se vírgula após o verbo para marcar a inversão. Ex: "Chegaram
              ao porto, o capitão e o imediato." A vírgula aqui isola o
              predicado deslocado, não separa verbo de sujeito ilegalmente.
            </AlertBox>
          </section>

          <QuizInterativo
            questoes={QUIZ_M3_PONTUACAO}
            titulo="Fixação - Módulo 3"
            icone="🎯"
            numero={3}
            variant="blue"
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 4: Aposto e Vocativo */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={4}
            titulo="Vírgula: Aposto e Vocativo"
            descricao="Isole quem você chama e explique o que você cita."
            gradiente="bg-gradient-to-br from-cyan-600 to-teal-800"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={4}
              title="Chamamento e Explicação"
              variant="cyan"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FlipCard
                frente={<div className="font-bold">VOCATIVO</div>}
                verso={
                  <div className="space-y-3 text-xs">
                    <p>
                      <strong>Conceito:</strong> Chamamento direto.
                    </p>
                    <p>
                      <strong>Regra:</strong> Sempre isolado por vírgula.
                    </p>
                    <p>✅ "Senhores, a reunião começou."</p>
                  </div>
                }
              />
              <FlipCard
                frente={<div className="font-bold">APOSTO</div>}
                verso={
                  <div className="space-y-3 text-xs">
                    <p>
                      <strong>Conceito:</strong> Explicação de um termo.
                    </p>
                    <p>
                      <strong>Regra:</strong> Vem entre vírgulas.
                    </p>
                    <p>✅ "Mário, o engenheiro-chefe, aprovou."</p>
                  </div>
                }
              />
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={5}
              title="Tipos de Aposto e Posição do Vocativo"
              variant="cyan"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Aposto Explicativo",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        O aposto explicativo retoma um termo anterior e o
                        explica ou detalha. Vem sempre entre vírgulas (ou entre
                        travessões / parênteses) quando está intercalado, ou
                        precedido de vírgula quando está no final da oração.
                      </p>
                      <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl italic text-sm">
                        "O diretor da unidade, Carlos Ferreira, assinou o
                        contrato." — aposto intercalado.
                        <br />
                        "Aprovaram o projeto, uma decisão histórica." — aposto
                        conclusivo.
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Aposto Enumerativo",
                  icone: <LuLayers />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        O aposto enumerativo detalha o termo anterior por meio
                        de uma lista. Geralmente é introduzido por dois-pontos
                        antes da enumeração.
                      </p>
                      <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl italic text-sm">
                        "Contrataram três especialistas: um geólogo, um químico
                        e um engenheiro."
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Vocativo no Início da Frase",
                  icone: <LuMessageCircle />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Quando o vocativo inicia a oração, é seguido por
                        vírgula. Quando está no meio, é isolado por duas
                        vírgulas. Quando encerra a oração, é precedido por
                        vírgula.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="p-3 bg-teal-500/10 border border-teal-500/30 rounded-xl">
                          ✅ "Senhoras e senhores, o evento está aberto."
                        </div>
                        <div className="p-3 bg-teal-500/10 border border-teal-500/30 rounded-xl">
                          ✅ "O evento, senhoras e senhores, está aberto."
                        </div>
                        <div className="p-3 bg-teal-500/10 border border-teal-500/30 rounded-xl">
                          ✅ "O evento está aberto, senhoras e senhores."
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Aposto vs Predicativo: Armadilha Cesgranrio",
                  icone: <LuTriangleAlert />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        A banca costuma confundir o candidato apresentando um
                        predicativo do sujeito e chamando-o de aposto. O
                        predicativo do sujeito é ligado ao sujeito por um verbo
                        de ligação e não admite remoção sem alterar o
                        significado. O aposto é acessório e pode ser removido.
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-sm">
                          "Ele é engenheiro." — "engenheiro" é predicativo, não
                          aposto. Sem vírgula.
                        </div>
                        <div className="p-3 bg-teal-500/10 border border-teal-500/30 rounded-xl text-sm">
                          "Ele, o engenheiro-chefe, assinou." — aposto
                          explicativo. Com vírgulas.
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
            <AlertBox tipo="danger" titulo="Armadilha CESGRANRIO: Aposto Especificativo">
              O aposto especificativo (também chamado restritivo) não é isolado
              por vírgulas. Ex: "O rei Dom Pedro II proclamou." — "Dom Pedro
              II" é aposto especificativo e não leva vírgula. A vírgula só é
              usada no aposto explicativo, que pode ser removido sem alterar o
              sentido essencial da frase.
            </AlertBox>
          </section>

          <QuizInterativo
            questoes={QUIZ_M4_PONTUACAO}
            titulo="Fixação - Módulo 4"
            icone="🎯"
            numero={4}
            variant="cyan"
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 5: Adjuntos Deslocados */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={5}
            titulo="Vírgula: Adjuntos Deslocados"
            descricao="Quando o advérbio sai do seu lugar original e exige o sinal."
            gradiente="bg-gradient-to-br from-emerald-600 to-teal-800"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={5}
              title="A Regra do Comprimento"
              variant="emerald"
            />
            <AlertBox tipo="warning" titulo="O Pulo do Gato (Cesgranrio)">
              A banca avalia se o adjunto é **Longo** (obrigatória) ou **Curto**
              (facultativa).
            </AlertBox>
            <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-muted-foreground uppercase">
                    Curto (Facultativa)
                  </span>
                  <p className="font-medium">
                    "Hoje, choveu." ou "Hoje choveu."
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-muted-foreground uppercase">
                    Longo (Obrigatória)
                  </span>
                  <p className="font-medium">
                    "Durante o treinamento de segurança, todos anotaram."
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={6}
              title="O Que É um Adjunto Adverbial Deslocado?"
              variant="emerald"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Conceito de Adjunto Adverbial",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        O adjunto adverbial é um termo acessório que modifica o
                        verbo, um adjetivo ou um advérbio, indicando
                        circunstâncias como tempo, lugar, modo, causa,
                        condição, etc. Sua posição natural é após o verbo ou no
                        final da oração.
                      </p>
                      <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl italic text-sm">
                        Posição natural: "O inspetor verificou os registros{" "}
                        <strong>no dia seguinte</strong>."
                        <br />
                        Deslocado: "<strong>No dia seguinte</strong>, o
                        inspetor verificou os registros."
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Adjunto Curto: Vírgula Facultativa",
                  icone: <LuZap />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Adjuntos de uma ou duas palavras deslocados para o
                        início da oração admitem o uso ou a omissão da vírgula.
                        Ambas as formas são consideradas corretas.
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-sm">
                          ✅ "Ontem, concluímos o relatório."
                        </div>
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-sm">
                          ✅ "Ontem concluímos o relatório."
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Adjunto Longo: Vírgula Obrigatória",
                  icone: <LuCircleCheck />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Adjuntos adverbiais longos (locuções prepositivas,
                        orações adverbiais) deslocados para o início da frase
                        exigem vírgula obrigatória após eles.
                      </p>
                      <div className="space-y-2">
                        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-sm">
                          ❌ "Durante o processo de certificação de segurança
                          operacional todos os técnicos foram convocados."
                        </div>
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-sm">
                          ✅ "Durante o processo de certificação de segurança
                          operacional, todos os técnicos foram convocados."
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Adjunto Intercalado",
                  icone: <LuArrowRight />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Quando o adjunto adverbial aparece entre o sujeito e o
                        verbo, ou entre o verbo e o objeto, ele deve
                        obrigatoriamente ser isolado por duas vírgulas.
                      </p>
                      <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl italic text-sm">
                        "A equipe, <strong>em razão do prazo</strong>,
                        trabalhou no fim de semana." — adjunto intercalado
                        isolado por vírgulas.
                      </div>
                    </div>
                  ),
                },
              ]}
            />
            <Comparison
              title="Ordem Normal × Ordem Deslocada"
              left={{
                title: "Ordem Normal (sem vírgula)",
                content:
                  "O técnico calibrou os instrumentos na manhã de segunda-feira.",
                description:
                  "Adjunto adverbial em posição final — não exige vírgula.",
                variant: "success",
              }}
              right={{
                title: "Ordem Deslocada (vírgula obrigatória)",
                content:
                  "Na manhã de segunda-feira, o técnico calibrou os instrumentos.",
                description:
                  "Adjunto longo deslocado para o início — vírgula obrigatória.",
                variant: "success",
              }}
            />
          </section>

          <QuizInterativo
            questoes={QUIZ_M5_PONTUACAO}
            titulo="Fixação - Módulo 5"
            icone="🎯"
            numero={5}
            variant="emerald"
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 6: Orações Coordenadas */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={6}
            titulo="Vírgula: Orações Coordenadas"
            descricao="O fetiche da Cesgranrio: vírgulas antes de MAS, PORÉM e o polêmico E."
            gradiente="bg-gradient-to-br from-teal-700 to-cyan-900"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={6}
              title="A Conjunção 'E'"
              variant="cyan"
            />
            <p className="text-muted-foreground text-sm">
              Geralmente o 'E' não pede vírgula, mas em 3 situações ele é seu
              melhor amigo:
            </p>
            <CardCarousel
              cards={[
                {
                  icone: "👥",
                  title: "Sujeitos Diferentes",
                  descricao: "O diretor falou, e o povo aplaudiu.",
                },
                {
                  icone: "🔄",
                  title: "Polissíndeto",
                  descricao: "E chora, e grita, e sofre.",
                },
                {
                  icone: "⚡",
                  title: "Valor Adversativo",
                  descricao: "Trabalhou muito, e não recebeu nada. (E = Mas)",
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={7}
              title="Tipos de Orações Coordenadas"
              variant="cyan"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Aditivas (e, nem, não só...mas também)",
                  icone: <LuLayers />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        As conjunções aditivas somam orações de mesmo valor.
                        Com "e" e sujeito idêntico, não se usa vírgula. Com
                        sujeitos diferentes, usa-se vírgula antes do "e".
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="p-3 bg-teal-500/10 border border-teal-500/30 rounded-xl text-sm">
                          ✅ "O analista coletou e analisou os dados." (sujeito
                          igual — sem vírgula)
                        </div>
                        <div className="p-3 bg-teal-500/10 border border-teal-500/30 rounded-xl text-sm">
                          ✅ "O analista coletou os dados, e a equipe os
                          analisou." (sujeitos diferentes — vírgula)
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Adversativas (mas, porém, contudo, todavia, entretanto)",
                  icone: <LuArrowRight />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        As conjunções adversativas indicam oposição ou contraste
                        entre as orações. A vírgula antes delas é sempre
                        obrigatória, independentemente de os sujeitos serem
                        iguais ou diferentes.
                      </p>
                      <div className="space-y-2">
                        <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-sm">
                          ✅ "Estudou muito, mas não foi aprovado."
                        </div>
                        <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-sm">
                          ✅ "Trabalhou durante anos; contudo, não foi
                          reconhecido." (com ponto e vírgula também correto)
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Conclusivas (logo, portanto, por isso, assim)",
                  icone: <LuCircleCheck />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        As conjunções conclusivas concluem a ideia da oração
                        anterior. Sempre exigem vírgula antes delas (quando
                        iniciam a segunda oração) ou após elas (quando
                        intercaladas).
                      </p>
                      <div className="space-y-2">
                        <div className="p-3 bg-teal-500/10 border border-teal-500/30 rounded-xl text-sm">
                          ✅ "Concluiu todas as etapas, logo foi promovido."
                        </div>
                        <div className="p-3 bg-teal-500/10 border border-teal-500/30 rounded-xl text-sm">
                          ✅ "Concluiu todas as etapas; portanto, foi
                          promovido." (portanto intercalado: vírgula após)
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Alternativas (ou...ou, ora...ora, seja...seja)",
                  icone: <LuZap />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        As conjunções alternativas indicam alternância de ações
                        ou situações. Nas correlativas (ou...ou, ora...ora,
                        seja...seja), usa-se vírgula antes de cada repetição da
                        conjunção a partir da segunda ocorrência.
                      </p>
                      <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl italic text-sm">
                        "Ou aprova o orçamento, ou cancela o projeto." — vírgula
                        antes do segundo "ou".
                        <br />
                        "Ora trabalha com afinco, ora não faz nada." — vírgula
                        antes do segundo "ora".
                      </div>
                    </div>
                  ),
                },
              ]}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FlipCard
                frente={
                  <div className="text-center space-y-2">
                    <LuCircleCheck className="h-8 w-8 text-emerald-400 mx-auto" />
                    <p className="font-bold">Vírgula Obrigatória</p>
                    <p className="text-xs text-muted-foreground">
                      Conjunções que sempre pedem vírgula
                    </p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p>✅ Adversativas: mas, porém, contudo, todavia</p>
                    <p>✅ Conclusivas: logo, portanto, por isso, assim</p>
                    <p>✅ Explicativas: pois, porque (= pois)</p>
                    <p>✅ "E" com sujeitos diferentes</p>
                  </div>
                }
              />
              <FlipCard
                frente={
                  <div className="text-center space-y-2">
                    <LuCircleX className="h-8 w-8 text-red-400 mx-auto" />
                    <p className="font-bold">Vírgula Proibida</p>
                    <p className="text-xs text-muted-foreground">
                      Situações que não admitem vírgula
                    </p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p>❌ "E" com sujeito idêntico nas duas orações</p>
                    <p>❌ "Ou" simples com sujeito idêntico</p>
                    <p>❌ "Nem" em primeira ocorrência</p>
                    <p>
                      ❌ Conjunção integrante "que" em posição normal
                    </p>
                  </div>
                }
              />
            </div>
            <AlertBox tipo="danger" titulo="Armadilha CESGRANRIO: O 'E' Polêmico">
              A Cesgranrio adora testar se o candidato sabe quando o "e" exige
              vírgula. Lembre: sujeito idêntico → sem vírgula; sujeito
              diferente → vírgula. Atenção especial ao "e" com valor
              adversativo (equivale a "mas"), que sempre exige vírgula antes
              dele, mesmo com sujeitos iguais. Ex: "Trabalhou muito, e não
              passou." (= "mas não passou").
            </AlertBox>
          </section>

          <QuizInterativo
            questoes={QUIZ_M6_PONTUACAO}
            titulo="Fixação - Módulo 6"
            icone="🎯"
            numero={6}
            variant="cyan"
            onComplete={(score) => handleModuleComplete("modulo-6", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 7: Orações Subordinadas */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={7}
            titulo="Vírgula: Orações Subordinadas"
            descricao="A diferença vital entre explicar para todos ou restringir para alguns."
            gradiente="bg-gradient-to-br from-amber-600 to-orange-800"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={7}
              title="Explicativa vs Restritiva"
              variant="amber"
            />
            <Comparison
              title="Impacto Semântico"
              left={{
                title: "Explicativa (Com Vírgula)",
                content: "Os técnicos, que usam EPI, estão seguros.",
                description:
                  "TODOS os técnicos usam EPI e todos estão seguros.",
                variant: "success",
              }}
              right={{
                title: "Restritiva (Sem Vírgula)",
                content: "Os técnicos que usam EPI estão seguros.",
                description:
                  "APENAS a parte dos técnicos que usa EPI é que está segura.",
                variant: "info",
              }}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={8}
              title="Tipos de Orações Subordinadas e a Vírgula"
              variant="amber"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Adverbiais Antes da Principal",
                  icone: <LuArrowRight />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Quando a oração subordinada adverbial (causal,
                        condicional, temporal, concessiva etc.) aparece antes
                        da oração principal, a vírgula é obrigatória ao final
                        dela, separando-a da principal.
                      </p>
                      <div className="space-y-2">
                        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-sm">
                          ✅ "Se houver vazamento, desligue a válvula." (cond.
                          antes da principal)
                        </div>
                        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-sm">
                          ✅ "Embora chovesse, a operação continuou." (concess.
                          antes)
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Adverbiais Depois da Principal",
                  icone: <LuZap />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Quando a oração subordinada adverbial vem após a
                        principal, a vírgula torna-se facultativa para a maioria
                        dos tipos. Para as causais e as explicativas com
                        "porque", ela é recomendada.
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-sm">
                          ✅ "Desligue a válvula se houver vazamento."
                          (facultativa)
                        </div>
                        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-sm">
                          ✅ "Não compareceu, porque estava doente." (causal —
                          recomendada)
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Relativas Explicativas × Restritivas",
                  icone: <LuLightbulb />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Esta é a distinção mais cobrada em provas sobre
                        subordinadas. A relativa explicativa (com vírgula) se
                        aplica a todos os membros do grupo referenciado. A
                        restritiva (sem vírgula) restringe o grupo a um
                        subconjunto.
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-sm">
                          ✅ "Os geólogos, que estudaram no exterior, são
                          competentes." — TODOS os geólogos estudaram fora e
                          são competentes.
                        </div>
                        <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl text-sm">
                          ✅ "Os geólogos que estudaram no exterior são
                          competentes." — Apenas os que estudaram fora.
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Substantivas em Posição Normal",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        As orações subordinadas substantivas (introduzidas por
                        "que" integrante ou "se" integrante) em posição normal
                        (após o verbo da principal) não recebem vírgula. A
                        vírgula só aparece se elas forem deslocadas para antes
                        da principal.
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-sm">
                          ❌ "Espera-se, que o projeto seja aprovado."
                        </div>
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-sm">
                          ✅ "Espera-se que o projeto seja aprovado."
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
            <AlertBox tipo="warning" titulo="Armadilha: Relativa com 'cujo'">
              O pronome relativo "cujo" (e suas flexões: cuja, cujos, cujas)
              nunca admite artigo depois de si. Errado: "o autor cujo o livro".
              Correto: "o autor cujo livro". Nas questões da Cesgranrio, essa
              regra aparece tanto em pontuação (a relativa com "cujo" pode ser
              explicativa ou restritiva) quanto em gramática geral.
            </AlertBox>
          </section>

          <QuizInterativo
            questoes={QUIZ_M7_PONTUACAO}
            titulo="Fixação - Módulo 7"
            icone="🎯"
            numero={7}
            variant="amber"
            onComplete={(score) => handleModuleComplete("modulo-7", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 8: Ponto e Ponto e Vírgula */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={8}
            titulo="Ponto e Ponto e Vírgula"
            descricao="Organização de listas e períodos extensos que já possuem vírgulas internas."
            gradiente="bg-gradient-to-br from-orange-700 to-red-900"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={8}
              title="O ponto-e-vírgula"
              variant="amber"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Hierarquia de Pausas",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        O ponto-e-vírgula é uma pausa mais longa que a vírgula e
                        mais curta que o ponto final.
                      </p>
                      <AlertBox tipo="info" titulo="Quando Usar?">
                        Em listas complexas para separar subitens.
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={9}
              title="Ponto Final, Ponto e Vírgula e Dois-Pontos"
              variant="amber"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Ponto Final: Usos e Funções",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        O ponto final é usado para encerrar períodos
                        declarativos e imperativos. Também aparece em
                        abreviações (Prof., Sr., Dr., Eng., p. ex.). Não se usa
                        ponto final em títulos isolados nem em subtítulos quando
                        seguidos de texto.
                      </p>
                      <div className="p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl text-sm">
                        ✅ "A reunião encerrou às 18h." (período declarativo)
                        <br />
                        ✅ "Assine o documento." (imperativo)
                        <br />
                        ✅ "O Sr. Alves recebeu o relatório." (abreviação)
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Ponto e Vírgula: Três Usos Principais",
                  icone: <LuLayers />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        O ponto e vírgula tem três empregos clássicos: (1)
                        separar orações coordenadas longas que já têm vírgulas
                        internas; (2) separar itens de uma lista após
                        dois-pontos; (3) marcar oposição enfática entre orações
                        (equivale a "porém/mas" sem conjunção).
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                          "Os técnicos de campo coletaram as amostras, mediram
                          a pressão e registraram a temperatura; os analistas de
                          laboratório processaram, catalogaram e publicaram os
                          resultados."
                        </div>
                        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                          "Os responsáveis foram: o coordenador de operações; o
                          gerente de segurança; e o diretor técnico."
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Dois-Pontos: Quando São Obrigatórios",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Os dois-pontos são obrigatórios: (1) antes de discurso
                        direto; (2) antes de enumeração que resume o sujeito ou
                        objeto; (3) para introduzir uma explicação ou conclusão
                        que resume o que foi dito antes.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-xl">
                          ✅ "O diretor declarou: 'O projeto está aprovado.'"
                          (discurso direto)
                        </div>
                        <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-xl">
                          ✅ "São três as etapas: coleta, análise e relatório."
                          (enumeração)
                        </div>
                        <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-xl">
                          ✅ "Trabalhou durante anos em silêncio: era um
                          perfeccionista." (explicação/conclusão)
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FlipCard
                frente={
                  <div className="text-center space-y-2">
                    <p className="text-3xl font-black text-muted-foreground">
                      .
                    </p>
                    <p className="font-bold">Ponto Final</p>
                    <p className="text-xs text-muted-foreground">
                      Encerramento total
                    </p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p>📌 Encerra período declarativo ou imperativo</p>
                    <p>📌 Usado em abreviações: Sr., Dr., Prof.</p>
                    <p>⛔ Não usar em títulos isolados</p>
                  </div>
                }
              />
              <FlipCard
                frente={
                  <div className="text-center space-y-2">
                    <p className="text-3xl font-black text-muted-foreground">
                      ;
                    </p>
                    <p className="font-bold">Ponto e Vírgula</p>
                    <p className="text-xs text-muted-foreground">
                      Pausa intermediária
                    </p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p>📌 Separa orações longas com vírgulas internas</p>
                    <p>📌 Separa itens de listas após dois-pontos</p>
                    <p>📌 Marca oposição sem conjunção adversativa</p>
                  </div>
                }
              />
              <FlipCard
                frente={
                  <div className="text-center space-y-2">
                    <p className="text-3xl font-black text-muted-foreground">
                      :
                    </p>
                    <p className="font-bold">Dois-Pontos</p>
                    <p className="text-xs text-muted-foreground">
                      Anúncio e explicação
                    </p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p>📌 Antes de discurso direto</p>
                    <p>📌 Antes de enumeração introduzida por resumo</p>
                    <p>📌 Para introduzir explicação ou conclusão</p>
                  </div>
                }
              />
            </div>
            <AlertBox tipo="info" titulo="Ponto e Vírgula em Textos Oficiais">
              Em documentos normativos, resoluções, portarias e editais, o ponto
              e vírgula é praticamente obrigatório para separar os incisos de
              um artigo. Cada inciso termina com ponto e vírgula, exceto o
              último, que termina com ponto final. Esse padrão é adotado por
              toda a legislação brasileira e é cobrado em questões sobre redação
              oficial da Cesgranrio.
            </AlertBox>
          </section>

          <QuizInterativo
            questoes={QUIZ_M8_PONTUACAO}
            titulo="Fixação - Módulo 8"
            icone="🎯"
            numero={8}
            variant="amber"
            onComplete={(score) => handleModuleComplete("modulo-8", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 9: Sinais Complementares */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={9}
            titulo="Sinais Complementares"
            descricao="Dois-pontos, Travessões e Parênteses: a estética da explicação."
            gradiente="bg-gradient-to-br from-red-800 to-black"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={9}
              title="Além da Vírgula"
              variant="rose"
            />
            <div className="grid gap-4 md:grid-cols-2">
              <FlipCard
                frente="Dois-Pontos (:)"
                verso="Indica citação, enumeração ou uma explicação que resume o anterior."
              />
              <FlipCard
                frente="Travessão (—)"
                verso="Usado para isolar falas ou para dar ênfase a explicações intercaladas."
              />
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={10}
              title="Todos os Sinais Complementares"
              variant="rose"
            />
            <CardCarousel
              cards={[
                {
                  icone: "❓",
                  title: "Ponto de Interrogação (?)",
                  descricao:
                    "Encerra orações interrogativas diretas. Não usado em interrogativas indiretas ('Perguntou se estava pronto.').",
                },
                {
                  icone: "❗",
                  title: "Ponto de Exclamação (!)",
                  descricao:
                    "Exprime emoção, ordem enfática ou interjeição. 'Cuidado!' / 'Que excelente resultado!'",
                },
                {
                  icone: "—",
                  title: "Travessão (—)",
                  descricao:
                    "Isola explicações intercaladas com ênfase e marca falas no discurso direto.",
                },
                {
                  icone: "( )",
                  title: "Parênteses",
                  descricao:
                    "Inclui explicações, comentários ou informações acessórias sem interromper o fluxo do texto.",
                },
                {
                  icone: "\" \"",
                  title: "Aspas",
                  descricao:
                    "Delimitam citações diretas, destacam palavras em sentido irônico, técnico ou estrangeiro.",
                },
                {
                  icone: "...",
                  title: "Reticências",
                  descricao:
                    "Indicam pausa, hesitação ou suspensão da ideia. Em textos técnicos, indicam supressão de trecho citado.",
                },
              ]}
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Ponto de Interrogação × Interrogativa Indireta",
                  icone: <LuMessageCircle />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        O ponto de interrogação só aparece em perguntas
                        diretas. Em perguntas indiretas (relatadas, com "se" ou
                        "qual"), usa-se ponto final, não interrogação.
                      </p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-sm">
                          ✅ "Qual é o prazo?" (interrogativa direta — usa ?)
                        </div>
                        <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-sm">
                          ✅ "Perguntou qual era o prazo." (indireta — usa .)
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Travessão × Parênteses em Textos Formais",
                  icone: <LuShield />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        O travessão dá maior destaque ao trecho intercalado;
                        os parênteses indicam informação acessória e discreta.
                        Em textos técnicos e formais, os parênteses são
                        preferidos para informações secundárias, enquanto o
                        travessão é reservado para ênfase ou citações de fala.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                          Ênfase: "O resultado — surpreendente para todos — foi
                          aprovado." (travessão)
                        </div>
                        <div className="p-3 bg-slate-500/10 border border-slate-500/30 rounded-xl">
                          Acessório: "O resultado (aprovado por unanimidade)
                          foi publicado." (parênteses)
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Aspas: Usos e Abusos",
                  icone: <LuFileText />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        As aspas têm quatro funções principais: (1) delimitar
                        citação textual direta; (2) marcar sentido irônico ou
                        inusitado; (3) destacar termos técnicos, estrangeiros ou
                        neologismos; (4) indicar título de obra menor (artigo,
                        capítulo, poema).
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl">
                          "O autor afirmou: 'A pontuação é a alma do texto.'"
                          (citação direta)
                        </div>
                        <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl">
                          "A reunião foi 'produtiva'." (ironia)
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Reticências: Três Funções",
                  icone: <LuEye />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        As reticências indicam: (1) suspensão ou incompletude
                        do pensamento; (2) hesitação ou pausa dramática; (3)
                        supressão de parte de uma citação (uso acadêmico/técnico
                        — sempre entre colchetes: [...]).
                      </p>
                      <div className="p-4 bg-zinc-500/5 border border-zinc-500/20 rounded-xl text-sm space-y-2">
                        <p>"Não sei o que dizer... é tudo tão confuso."
                        (hesitação)</p>
                        <p>"O relatório concluiu que [...] os dados confirmam
                        a hipótese." (supressão em citação)</p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
            <AlertBox tipo="warning" titulo="Travessão × Hífen × Meia-Risca">
              São três sinais distintos com funções completamente diferentes.
              O hífen (-) liga palavras compostas e indica divisão silábica. A
              meia-risca (–) é usada em intervalos numéricos (páginas 10–20).
              O travessão (—) é o sinal de pontuação propriamente dito, usado
              para intercalações e discurso direto. Em provas, a confusão entre
              esses três sinais é comum e a Cesgranrio pode exigir a
              distinção.
            </AlertBox>
          </section>

          <QuizInterativo
            questoes={QUIZ_M9_PONTUACAO}
            titulo="Fixação - Módulo 9"
            icone="🎯"
            numero={9}
            variant="rose"
            onComplete={(score) => handleModuleComplete("modulo-9", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 10: Simulado Final */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={10}
            titulo="Simulado Final"
            descricao="Teste seu domínio perante uma bateria definitiva focada em Pontuação Global Cesgranrio."
            gradiente="bg-gradient-to-br from-indigo-900 to-black"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={11}
              title="Mapa Mental: Revisão Completa"
              variant="indigo"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Mapa 1: As Proibições Absolutas",
                  icone: <LuCircleX />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        As regras de ouro que nunca mudam, independentemente do
                        contexto ou da extensão da frase:
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="p-2 bg-red-500/10 border border-red-500/30 rounded-lg">
                          ❌ Nunca separe sujeito do verbo com vírgula
                        </li>
                        <li className="p-2 bg-red-500/10 border border-red-500/30 rounded-lg">
                          ❌ Nunca separe verbo do objeto direto com vírgula
                        </li>
                        <li className="p-2 bg-red-500/10 border border-red-500/30 rounded-lg">
                          ❌ Nunca separe verbo do objeto indireto com vírgula
                        </li>
                        <li className="p-2 bg-red-500/10 border border-red-500/30 rounded-lg">
                          ❌ Nunca use vírgula antes de "que" integrante em
                          posição normal
                        </li>
                      </ul>
                    </div>
                  ),
                },
                {
                  titulo: "Mapa 2: Vírgula Obrigatória",
                  icone: <LuCircleCheck />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Situações em que a vírgula é sempre obrigatória:
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                          ✅ Aposto explicativo intercalado ou final
                        </li>
                        <li className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                          ✅ Vocativo em qualquer posição
                        </li>
                        <li className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                          ✅ Adjunto adverbial longo deslocado para o início
                        </li>
                        <li className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                          ✅ Antes de conjunções adversativas (mas, porém,
                          contudo)
                        </li>
                        <li className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                          ✅ Oração subordinada adverbial antes da principal
                        </li>
                        <li className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                          ✅ Oração relativa explicativa
                        </li>
                        <li className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                          ✅ Enumeração de termos da mesma função sintática
                        </li>
                      </ul>
                    </div>
                  ),
                },
                {
                  titulo: "Mapa 3: Ponto e Vírgula e Dois-Pontos",
                  icone: <LuLayers />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Resumo dos usos dos dois sinais frequentemente cobrados
                        em questões de redação oficial e gramática:
                      </p>
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div className="space-y-2">
                          <p className="font-bold text-amber-400">
                            Ponto e Vírgula (;)
                          </p>
                          <p className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                            Separa orações longas com vírgulas internas
                          </p>
                          <p className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                            Separa itens de lista após dois-pontos
                          </p>
                          <p className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                            Em incisos de lei (exceto o último)
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p className="font-bold text-orange-400">
                            Dois-Pontos (:)
                          </p>
                          <p className="p-2 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                            Antes de discurso direto
                          </p>
                          <p className="p-2 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                            Antes de enumeração resumidora
                          </p>
                          <p className="p-2 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                            Para introduzir explicação ou conclusão
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Mapa 4: Sinais Complementares",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Quadro-resumo dos sinais além da vírgula:
                      </p>
                      <div className="space-y-2 text-sm">
                        <p className="p-2 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                          <strong>? :</strong> Interrogativas diretas apenas
                        </p>
                        <p className="p-2 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                          <strong>! :</strong> Emoção, ordem, interjeição
                        </p>
                        <p className="p-2 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                          <strong>— :</strong> Ênfase, intercalação, discurso
                          direto
                        </p>
                        <p className="p-2 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                          <strong>( ) :</strong> Informação acessória e discreta
                        </p>
                        <p className="p-2 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                          <strong>" " :</strong> Citação, ironia, termo
                          especial
                        </p>
                        <p className="p-2 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                          <strong>... :</strong> Suspensão, hesitação, supressão
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
            <AlertBox tipo="success" titulo="Estratégia Final CESGRANRIO">
              Na hora da prova: (1) Identifique o sujeito e o verbo principal —
              nunca haverá vírgula separando-os sem um termo intercalado. (2)
              Se houver "mas", "porém", "contudo" ou "entretanto", a vírgula
              antes é obrigatória. (3) Se a oração subordinada adverbial vier
              antes da principal, vírgula é obrigatória. (4) Verifique o "que":
              se for relativo explicativo, vai entre vírgulas; se for integrante
              em posição normal, não leva vírgula. (5) Ponto e vírgula em listas
              após dois-pontos é padrão em textos oficiais — reconheça essa
              estrutura. Com essas cinco checagens, você resolve mais de 80% das
              questões de pontuação da banca.
            </AlertBox>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FlipCard
                frente={
                  <div className="text-center space-y-2">
                    <LuBrain className="h-8 w-8 text-indigo-400 mx-auto" />
                    <p className="font-bold">Checklist Pré-Prova</p>
                    <p className="text-xs text-muted-foreground">
                      5 perguntas que salvam questões
                    </p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p>1️⃣ Há vírgula entre sujeito e verbo? → Errado</p>
                    <p>2️⃣ "Mas/porém" sem vírgula antes? → Errado</p>
                    <p>3️⃣ Subordinada adverbial antes sem vírgula? → Errado</p>
                    <p>4️⃣ "Que" relativo explicativo sem vírgulas? → Errado</p>
                    <p>5️⃣ Lista oficial sem ; nos incisos? → Verificar</p>
                  </div>
                }
              />
              <FlipCard
                frente={
                  <div className="text-center space-y-2">
                    <LuTrophy className="h-8 w-8 text-yellow-400 mx-auto" />
                    <p className="font-bold">Pontuação = Aprovação</p>
                    <p className="text-xs text-muted-foreground">
                      O que fazer no dia da prova
                    </p>
                  </div>
                }
                verso={
                  <div className="space-y-2 text-sm">
                    <p>✅ Releia a frase isolando sujeito e verbo</p>
                    <p>✅ Identifique a conjunção e sua classe</p>
                    <p>✅ Verifique se há termos intercalados</p>
                    <p>✅ Confirme a posição da oração subordinada</p>
                    <p>✅ Confie na regra, não na intuição</p>
                  </div>
                }
              />
            </div>
          </section>

          {showCompletionBadge ? (
            <div className="flex flex-col items-center gap-6 py-10">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center animate-bounce">
                <LuTrophy className="w-12 h-12 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black">Mestre em Pontuação!</h3>
              <p className="text-center text-muted-foreground max-w-sm">
                Seu texto agora é blindado contra erros e ambiguidade. Pronto
                para o cargo!
              </p>
            </div>
          ) : (
            <QuizInterativo
              questoes={QUIZ_FINAL_PONTUACAO}
              titulo="Simulado de Conclusão"
              icone="🏆"
              numero={10}
              variant="indigo"
              onComplete={(score) => handleModuleComplete("modulo-10", score)}
            />
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
