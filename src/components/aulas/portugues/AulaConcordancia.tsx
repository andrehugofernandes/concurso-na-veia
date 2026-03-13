"use client";

import { useState, useEffect, useCallback } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { LuBookOpen, LuCheck, LuBrain, LuTriangleAlert } from "react-icons/lu";

import {
  ModuleBanner,
  QuizInterativo,
  AulaProps,
  ContentAccordion,
  ModuleSummaryCarouselNew,
  AulaTemplate,
  ModuleSectionHeader,
  FlipCard,
  CardCarousel,
  getRandomQuestions,
} from "../shared";

import {
  QUIZ_VERBAL_POOL,
  QUIZ_NOMINAL_POOL,
  QUIZ_PRATICO_POOL,
  QUIZ_APROFUNDAMENTO_POOL,
  QUIZ_FINAL_POOL,
  PALAVRAS_PERIGOSAS_CARDS,
  CHALLENGE_POOL,
} from "./data/concordancia-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Concordância Verbal Básica" },
  { id: "modulo-2", label: "Módulo 2", title: "Concordância Nominal" },
  { id: "modulo-3", label: "Módulo 3", title: "Verbos Impessoais" },
  { id: "modulo-4", label: "Módulo 4", title: "Casos de Elite" },
  { id: "modulo-5", label: "Módulo 5", title: "Sujeitos Compostos" },
  { id: "modulo-6", label: "Módulo 6", title: "Expressões Distributivas" },
  { id: "modulo-7", label: "Módulo 7", title: "Concordância com Porcentagem" },
  { id: "modulo-8", label: "Módulo 8", title: "Pronomes Relativos" },
  { id: "modulo-9", label: "Módulo 9", title: "Aplicações Petrobras" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
] as const;

export default function AulaConcordancia({
  onComplete,
  isCompleted,
  loading,
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

  useEffect(() => {
    if (!loading && currentProgress !== undefined) {
      const doneCount = Math.floor(
        (currentProgress / 100) * MODULE_DEFS.length,
      );
      const newDone = new Set<string>();
      for (let i = 0; i < doneCount; i++) {
        newDone.add(MODULE_DEFS[i].id);
      }
      setCompletedModules(newDone);
    }
  }, [currentProgress, loading]);

  const isModuleUnlocked = useCallback(
    (index: number) => {
      if (index === 0) return true;
      return completedModules.has(MODULE_DEFS[index - 1].id);
    },
    [completedModules],
  );

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 70) {
      const newSet = new Set(completedModules).add(moduleId);
      setCompletedModules(newSet);
      const percent = Math.round((newSet.size / MODULE_DEFS.length) * 100);
      onUpdateProgress?.(percent);

      const index = MODULE_DEFS.findIndex((m) => m.id === moduleId);
      if (index < MODULE_DEFS.length - 1) {
        setTimeout(() => {
          setActiveTab(MODULE_DEFS[index + 1].id);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 1500);
      } else {
        onComplete?.();
      }
    }
  };

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={setActiveTab}
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
    >
      {/* MÓDULO 1: CONCORDÂNCIA VERBAL */}
      <TabsContent value="modulo-1" className="space-y-12">
        <ModuleBanner
          numero={1}
          titulo="Concordância Verbal"
          descricao="O domínio da relação entre verbo e sujeito. A regra de ouro e as armadilhas da ordem inversa."
          gradiente="bg-gradient-to-br from-blue-600 via-indigo-500 to-indigo-700"
        />

        <section className="space-y-8">
          <ModuleSectionHeader
            index="01"
            title="A Regra de Ouro"
            variant="indigo"
          />
          <ContentAccordion
            titulo="O Contrato Verbal"
            icone="📜"
            corIndicador="bg-indigo-500"
            defaultOpen={true}
            slides={[
              {
                titulo: "Definição",
                icone: "🔍",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      O verbo concorda com o <strong>núcleo do sujeito</strong>{" "}
                      em número e pessoa.
                    </p>
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 rounded-r-lg">
                      <p className="text-sm font-mono italic">
                        "A <strong>equipe</strong> de especialistas{" "}
                        <strong>chegou</strong>."
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "Exemplificação",
                icone: "💡",
                conteudo: (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                      <p className="text-xs uppercase font-bold text-slate-500">
                        Singular
                      </p>
                      <p className="text-sm font-medium">
                        O técnico <strong>aprovou</strong>.
                      </p>
                    </div>
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-800/40 rounded-lg">
                      <p className="text-xs uppercase font-bold text-indigo-500">
                        Plural
                      </p>
                      <p className="text-sm font-medium">
                        Os técnicos <strong>aprovaram</strong>.
                      </p>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section id="quiz-modulo-1" className="pt-8">
          <QuizInterativo
            questoes={QUIZ_VERBAL_POOL}
            titulo="Check-point: Verbal"
            icone="⚡"
            numero={1}
            variant="indigo"
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          />
        </section>
      </TabsContent>

      {/* MÓDULO 2: CONCORDÂNCIA NOMINAL */}
      <TabsContent value="modulo-2" className="space-y-12">
        <ModuleBanner
          numero={2}
          titulo="Concordância Nominal"
          descricao="A harmonia entre substantivos e seus adjetivos, pronomes, numerais e artigos."
          gradiente="bg-gradient-to-br from-emerald-600 via-teal-500 to-teal-700"
        />

        <section className="space-y-8">
          <ModuleSectionHeader
            index="02"
            title="Palavras Perigosas"
            variant="emerald"
          />
          <CardCarousel cards={PALAVRAS_PERIGOSAS_CARDS} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-4xl mb-4">🚫</span>
                  <h4 className="font-bold">Bastante ou Bastantes?</h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    Toque para ver o macete
                  </p>
                </div>
              }
              verso={
                <div className="p-6">
                  <p className="font-bold text-emerald-600 mb-2">
                    Troque por "Muitos"
                  </p>
                  <p className="text-sm leading-relaxed">
                    Se "muitos" couber, use "bastantes".
                    <br />
                    Ex: Havia <strong>bastantes</strong> pessoas. (Muitas
                    pessoas)
                  </p>
                </div>
              }
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-4xl mb-4">½</span>
                  <h4 className="font-bold">Meio ou Meia?</h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    Toque para ver a regra
                  </p>
                </div>
              }
              verso={
                <div className="p-6">
                  <p className="font-bold text-emerald-600 mb-2">
                    Advérbio vs Numeral
                  </p>
                  <p className="text-sm leading-relaxed">
                    "Um pouco" = Meio (Invariável).
                    <br />
                    "Metade" = Meia (Varia).
                    <br />
                    Ex: Ela está <strong>meio</strong> cansada e tomou{" "}
                    <strong>meia</strong> água.
                  </p>
                </div>
              }
            />
          </div>
        </section>

        <section id="quiz-modulo-2" className="pt-8">
          <QuizInterativo
            questoes={QUIZ_NOMINAL_POOL}
            titulo="Check-point: Nominal"
            icone="📖"
            numero={2}
            variant="emerald"
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          />
        </section>
      </TabsContent>

      {/* MÓDULO 3: PRÁTICA E SIMULADOS */}
      <TabsContent value="modulo-3" className="space-y-12">
        <ModuleBanner
          numero={3}
          titulo="Prática e Simulados"
          descricao="Treinamento intensivo com foco no perfil das questões Cesgranrio."
          gradiente="bg-gradient-to-br from-violet-600 via-purple-500 to-purple-700"
        />

        <section className="space-y-8">
          <ModuleSectionHeader
            index="03"
            title="Desafios de Correção"
            variant="violet"
          />
          <div className="grid gap-4">
            {CHALLENGE_POOL.map((ch) => (
              <div
                key={ch.id}
                className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm"
              >
                <div className="flex items-center gap-2 text-red-500 text-sm mb-1">
                  <LuTriangleAlert size={14} />{" "}
                  <span>Incorreto: {ch.wrong}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-600 text-sm font-bold mb-3">
                  <LuCheck size={14} /> <span>Correto: {ch.correct}</span>
                </div>
                <p className="text-xs text-muted-foreground bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                  {ch.explanation}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="quiz-modulo-3" className="pt-8">
          <QuizInterativo
            questoes={QUIZ_PRATICO_POOL}
            titulo="Simulado Prático"
            icone="🎯"
            numero={3}
            variant="violet"
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </section>
      </TabsContent>

      {/* MÓDULO 4: CASOS DE ELITE */}
      <TabsContent value="modulo-4" className="space-y-12">
        <ModuleBanner
          numero={4}
          titulo="Casos de Elite"
          descricao="Aquilo que separa os classificados: Porcentagens, Frações e Pronomes Relativos."
          gradiente="bg-gradient-to-br from-amber-600 via-orange-500 to-orange-700"
        />

        <section className="space-y-8">
          <ModuleSectionHeader
            index="04"
            title="Tópicos Avançados"
            variant="amber"
          />
          <div className="p-8 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-200 dark:border-amber-800/50">
            <h4 className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-xl mb-4">
              <LuBrain /> Pronomes Relativos "Que" e "Quem"
            </h4>
            <div className="space-y-4 text-sm leading-relaxed">
              <p>
                Com o <strong>QUE</strong>: O verbo concorda com o antecedente.
              </p>
              <p className="font-mono bg-white dark:bg-slate-950 p-2 rounded border border-amber-100 dark:border-slate-800">
                ✅ Fui eu <strong>que fiz</strong>. / ✅ Fomos nós{" "}
                <strong>que fizemos</strong>.
              </p>
              <div className="h-px bg-amber-200 dark:bg-amber-800/50 my-6" />
              <p>
                Com o <strong>QUEM</strong>: Duas opções de vitória.
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>
                  Concordar com o antecedente: "Fui eu quem <strong>fiz</strong>
                  ."
                </li>
                <li>
                  Ficar na 3ª pess. sing.: "Fui eu quem <strong>fez</strong>."
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="quiz-modulo-4" className="pt-8">
          <QuizInterativo
            questoes={QUIZ_APROFUNDAMENTO_POOL}
            titulo="Desafio de Elite"
            icone="🔥"
            numero={4}
            variant="amber"
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
          />
        </section>
      </TabsContent>

      {/* MÓDULO 5: LABORATÓRIO CESGRANRIO */}
      <TabsContent value="modulo-5" className="space-y-12">
        <ModuleBanner
          numero={5}
          titulo="Laboratório Cesgranrio"
          descricao="A prova real. Revisão 360 e simulado final de alta fidelidade."
          gradiente="bg-gradient-to-br from-rose-600 via-pink-500 to-rose-700"
        />

        <section className="space-y-8">
          <ModuleSectionHeader
            index="05"
            title="Resumo Visual"
            variant="rose"
          />
          <ModuleSummaryCarouselNew
            moduloNome="Laboratório Cesgranrio"
            tituloAula="Concordância"
            materia="Língua Portuguesa"
            images={[
              {
                title: "Mapa Mental: Concordância Verbal",
                type: "Mapa Mental",
                imageUrl:
                  "/assets/images/portugues/concordancia/mental-verbal.png",
                placeholderColor: "bg-blue-100 dark:bg-blue-900",
              },
              {
                title: "Tabela: Casos Especiais",
                type: "Tabela",
                imageUrl:
                  "/assets/images/portugues/concordancia/casos-especiais.png",
                placeholderColor: "bg-rose-100 dark:bg-rose-900",
              },
            ]}
          />
        </section>

        <section id="quiz-modulo-5" className="pt-8">
          <QuizInterativo
            questoes={QUIZ_FINAL_POOL}
            titulo="Simulado Final"
            icone="🏆"
            numero={5}
            variant="rose"
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
          />
        </section>

        {completedModules.has("modulo-5") && (
          <div className="mt-16 p-12 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2rem] text-white text-center shadow-2xl animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-5xl mx-auto mb-6 backdrop-blur-md border border-white/30">
              🎓
            </div>
            <h3 className="text-4xl font-black italic tracking-tighter mb-4">
              MESTRE EM CONCORDÂNCIA
            </h3>
            <p className="text-xl opacity-90 max-w-xl mx-auto">
              Você concluiu a jornada! Suas chances de errar concordância na
              prova caíram drasticamente.
            </p>
          </div>
        )}
      </TabsContent>

      {/* MÓDULO 6: EXPRESSÕES DISTRIBUTIVAS */}
      <TabsContent value="modulo-6" className="space-y-12">
        <ModuleBanner
          numero={6}
          titulo="Expressões Distributivas"
          descricao="Cada um, um ou outro, nem um nem outro: regras de concordância singular."
          gradiente="bg-gradient-to-br from-cyan-600 via-blue-500 to-blue-700"
        />

        <section className="space-y-8">
          <ModuleSectionHeader
            index="06"
            title="Singulares Enganosos"
            variant="cyan"
          />
          <ContentAccordion
            titulo="Expressões Distributivas"
            icone="🔀"
            corIndicador="bg-cyan-500"
            defaultOpen={true}
            slides={[
              {
                titulo: "Cada Um",
                icone: "1️⃣",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Exige sempre verbo no <strong>singular</strong>.
                    </p>
                    <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 border-l-4 border-cyan-500 rounded-r-lg">
                      <p className="text-sm font-mono">
                        ✅ "Cada um dos engenheiros <strong>apresentou</strong> seu projeto."
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "Um ou Outro",
                icone: "⚖️",
                conteudo: (
                  <div className="space-y-4">
                    <p>
                      Singular. Com repetição: pode ser plural.
                    </p>
                    <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 border-l-4 border-cyan-500 rounded-r-lg">
                      <p className="text-sm font-mono">
                        ✅ "Um ou outro candidato <strong>vencerá</strong>."
                        <br />✅ "Um ou outro professor <strong>discordaram</strong>." (com repetição)
                      </p>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section id="quiz-modulo-6" className="pt-8">
          <QuizInterativo
            questoes={getRandomQuestions(QUIZ_APROFUNDAMENTO_POOL, 8)}
            titulo="Desafio: Distributivas"
            icone="📊"
            numero={6}
            variant="cyan"
            onComplete={(score) => handleModuleComplete("modulo-6", score)}
          />
        </section>
      </TabsContent>

      {/* MÓDULO 7: CONCORDÂNCIA COM PORCENTAGEM */}
      <TabsContent value="modulo-7" className="space-y-12">
        <ModuleBanner
          numero={7}
          titulo="Concordância com Porcentagem"
          descricao="Regras flexíveis: concorda com o número ou com o especificador."
          gradiente="bg-gradient-to-br from-teal-600 via-emerald-500 to-teal-700"
        />

        <section className="space-y-8">
          <ModuleSectionHeader
            index="07"
            title="Matemática da Concordância"
            variant="teal"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-4xl mb-4">📊</span>
                  <h4 className="font-bold">Sem especificador</h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    Concorda com o número
                  </p>
                </div>
              }
              verso={
                <div className="p-6">
                  <p className="font-bold text-teal-600 mb-2">
                    O número é o sujeito
                  </p>
                  <p className="text-sm leading-relaxed">
                    Ex: "50% <strong>aprovaram</strong>" (50 = plural)
                    <br />
                    "1% <strong>foi</strong> aprovado" (1 = singular)
                  </p>
                </div>
              }
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-4xl mb-4">🎯</span>
                  <h4 className="font-bold">Com especificador</h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    Flexibilidade total
                  </p>
                </div>
              }
              verso={
                <div className="p-6">
                  <p className="font-bold text-teal-600 mb-2">
                    Numero OU especificador
                  </p>
                  <p className="text-sm leading-relaxed">
                    Ex: "50% dos candidatos <strong>aprovaram</strong>" ou "<strong>aprovou</strong>"
                  </p>
                </div>
              }
            />
          </div>
        </section>

        <section id="quiz-modulo-7" className="pt-8">
          <QuizInterativo
            questoes={getRandomQuestions(QUIZ_PRATICO_POOL, 8)}
            titulo="Simulado: Porcentagem"
            icone="💯"
            numero={7}
            variant="teal"
            onComplete={(score) => handleModuleComplete("modulo-7", score)}
          />
        </section>
      </TabsContent>

      {/* MÓDULO 8: PRONOMES RELATIVOS */}
      <TabsContent value="modulo-8" className="space-y-12">
        <ModuleBanner
          numero={8}
          titulo="Pronomes Relativos"
          descricao="QUE vs QUEM: duas formas, duas lógicas diferentes de concordância."
          gradiente="bg-gradient-to-br from-indigo-600 via-purple-500 to-purple-700"
        />

        <section className="space-y-8">
          <ModuleSectionHeader
            index="08"
            title="A Dualidade do Relativo"
            variant="indigo"
          />
          <div className="p-8 bg-indigo-50 dark:bg-indigo-900/10 rounded-2xl border border-indigo-200 dark:border-indigo-800/50">
            <h4 className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-xl mb-6">
              <LuBrain /> Regra Prática
            </h4>
            <div className="space-y-6">
              <div>
                <p className="font-bold text-indigo-600 mb-3">
                  Com QUE: sempre concorda com o antecedente
                </p>
                <p className="font-mono text-sm bg-white dark:bg-slate-950 p-3 rounded border border-indigo-100 dark:border-slate-800">
                  ✅ "Fui eu <strong>que fiz</strong>" / ✅ "Fomos nós <strong>que fizemos</strong>"
                </p>
              </div>
              <div className="h-px bg-indigo-200 dark:bg-indigo-800/50" />
              <div>
                <p className="font-bold text-indigo-600 mb-3">
                  Com QUEM: singular ou concorda com antecedente
                </p>
                <p className="font-mono text-sm bg-white dark:bg-slate-950 p-3 rounded border border-indigo-100 dark:border-slate-800">
                  ✅ "Fui eu quem <strong>fez</strong>" (singular padrão)
                  <br />✅ "Fui eu quem <strong>fiz</strong>" (concorda com antecedente - menos comum)
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="quiz-modulo-8" className="pt-8">
          <QuizInterativo
            questoes={getRandomQuestions(QUIZ_APROFUNDAMENTO_POOL, 8)}
            titulo="Desafio: Relativos"
            icone="🎪"
            numero={8}
            variant="indigo"
            onComplete={(score) => handleModuleComplete("modulo-8", score)}
          />
        </section>
      </TabsContent>

      {/* MÓDULO 9: APLICAÇÕES PETROBRAS */}
      <TabsContent value="modulo-9" className="space-y-12">
        <ModuleBanner
          numero={9}
          titulo="Aplicações Petrobras"
          descricao="Contextos reais das operações offshore e sistemas de segurança."
          gradiente="bg-gradient-to-br from-orange-600 via-red-500 to-orange-700"
        />

        <section className="space-y-8">
          <ModuleSectionHeader
            index="09"
            title="Linguagem Técnica"
            variant="orange"
          />
          <div className="space-y-4">
            {[
              {
                titulo: "Dados Estatísticos",
                frase: "Os dados do relatório apresentam inconsistências.",
                explicacao: "Plural (dados) = verbo plural.",
              },
              {
                titulo: "Equipes Responsáveis",
                frase: "A equipe de especialistas demonstra competência.",
                explicacao: "Singular (equipe) = verbo singular.",
              },
              {
                titulo: "Procedimentos de Segurança",
                frase: "Os procedimentos de segurança, bem como o acompanhamento regulatório, são essenciais.",
                explicacao: "'Bem como' = dois sujeitos = plural.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-4 bg-white dark:bg-slate-900 border border-orange-200 dark:border-orange-800/30 rounded-xl"
              >
                <h5 className="font-bold text-orange-600 mb-2">{item.titulo}</h5>
                <p className="text-sm font-mono mb-2 p-2 bg-orange-50 dark:bg-orange-900/10 rounded">
                  {item.frase}
                </p>
                <p className="text-xs text-muted-foreground">{item.explicacao}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="quiz-modulo-9" className="pt-8">
          <QuizInterativo
            questoes={getRandomQuestions(QUIZ_PRATICO_POOL, 8)}
            titulo="Contexto Petrobras"
            icone="🛢️"
            numero={9}
            variant="orange"
            onComplete={(score) => handleModuleComplete("modulo-9", score)}
          />
        </section>
      </TabsContent>

      {/* MÓDULO 10: SIMULADO MESTRE */}
      <TabsContent value="modulo-10" className="space-y-12">
        <ModuleBanner
          numero={10}
          titulo="Simulado Mestre"
          descricao="Prova final de alta fidelidade com todas as nuances da concordância."
          gradiente="bg-gradient-to-br from-violet-600 via-fuchsia-500 to-violet-700"
        />

        <section className="space-y-8">
          <ModuleSectionHeader
            index="10"
            title="Revisão 360°"
            variant="violet"
          />
          <ModuleSummaryCarouselNew
            moduloNome="Simulado Mestre"
            tituloAula="Concordância"
            materia="Língua Portuguesa"
            images={[
              {
                title: "Mapa Mental: Concordância Completa",
                type: "Mapa Mental",
                imageUrl:
                  "/assets/images/portugues/concordancia/mental-completa.png",
                placeholderColor: "bg-violet-100 dark:bg-violet-900",
              },
              {
                title: "Tabela: Todos os Casos",
                type: "Tabela",
                imageUrl:
                  "/assets/images/portugues/concordancia/casos-totais.png",
                placeholderColor: "bg-fuchsia-100 dark:bg-fuchsia-900",
              },
            ]}
          />
        </section>

        <section id="quiz-modulo-10" className="pt-8">
          <QuizInterativo
            questoes={getRandomQuestions(QUIZ_FINAL_POOL, 10)}
            titulo="Simulado Final Premium"
            icone="🏆"
            numero={10}
            variant="violet"
            onComplete={(score) => handleModuleComplete("modulo-10", score)}
          />
        </section>

        {completedModules.has("modulo-10") && (
          <div className="mt-16 p-12 bg-gradient-to-br from-violet-600 to-fuchsia-700 rounded-[2rem] text-white text-center shadow-2xl animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-5xl mx-auto mb-6 backdrop-blur-md border border-white/30">
              👑
            </div>
            <h3 className="text-4xl font-black italic tracking-tighter mb-4">
              ESPECIALISTA EM CONCORDÂNCIA
            </h3>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Você dominou completamente a concordância verbal e nominal! Pronto para acertar todas as questões de concordância na prova Cesgranrio.
            </p>
          </div>
        )}
      </TabsContent>
    </AulaTemplate>
  );
}
