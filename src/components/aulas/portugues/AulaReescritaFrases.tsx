"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { TabsContent } from "@/components/ui/tabs";
import {
  LuCheck,
  LuTrophy,
  LuTarget,
  LuTriangleAlert,
  LuBookOpen,
  LuLightbulb,
} from "react-icons/lu";

import {
  AlertBox,
  CardCarousel,
  ContentAccordion,
  ModuleBanner,
  QuizInterativo,
  FlipCard,
  ModuleSectionHeader,
  AulaTemplate,
} from "../shared";

import type { AulaProps } from "../shared";

import {
  QUIZ_M1_REESCRITA,
  QUIZ_M2_TECNICAS,
  QUIZ_M3_VOZES,
  QUIZ_M4_DISCURSO,
  QUIZ_M5_NOMINALIZACAO,
  QUIZ_M6_CONECTIVOS,
  QUIZ_M7_PONTUACAO,
  QUIZ_M8_PARAFRASES,
  QUIZ_M9_CESGRANRIO,
  QUIZ_FINAL_REESCRITA,
} from "./data/reescrita-frases-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Conceitos Base" },
  { id: "modulo-2", label: "Módulo 2", title: "Técnicas de Troca" },
  { id: "modulo-3", label: "Módulo 3", title: "Vozes Verbais" },
  { id: "modulo-4", label: "Módulo 4", title: "Discurso Direto/Indireto" },
  { id: "modulo-5", label: "Módulo 5", title: "Nominalização" },
  { id: "modulo-6", label: "Módulo 6", title: "Conectivos Lógicos" },
  { id: "modulo-7", label: "Módulo 7", title: "Pontuação e Sentido" },
  { id: "modulo-8", label: "Módulo 8", title: "Paráfrases Complexas" },
  { id: "modulo-9", label: "Módulo 9", title: "Laboratório Cesgranrio" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Final" },
];

export default function AulaReescritaFrases({
  titulo,
  descricao,
  duracao,
  materiaNome,
  materiaCor,
  materiaId,
  prevTopico,
  nextTopico,
  onUpdateProgress,
  onComplete,
  isCompleted,
  loading,
  xpGanho = 50,
  currentProgress,
}: AulaProps) {
  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(),
  );
  const [showCompletionBadge, setShowCompletionBadge] = useState(false);

  const totalModulos = MODULE_DEFS.length;

  useEffect(() => {
    if ((currentProgress ?? 0) >= 100 || isCompleted)
      setShowCompletionBadge(true);
  }, [currentProgress, isCompleted]);

  const [hasSyncedInitial, setHasSyncedInitial] = useState(false);
  useEffect(() => {
    if (
      !hasSyncedInitial &&
      !loading &&
      currentProgress !== undefined &&
      currentProgress > 0
    ) {
      const doneCount = Math.floor((currentProgress / 100) * totalModulos);
      const newDone = new Set<string>();
      for (let i = 0; i < doneCount; i++) {
        newDone.add(MODULE_DEFS[i].id);
      }
      setCompletedModules(newDone);
      setHasSyncedInitial(true);
    } else if (!hasSyncedInitial && !loading && currentProgress === 0) {
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
      {/* Módulo 1: Fundamentos */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={1}
            titulo="Fundamentos da Reescritura"
            descricao="Aprenda a regra de ouro da Cesgranrio: Fidelidade ao sentido original combinada com rigorosa correção gramatical."
            gradiente="bg-gradient-to-br from-blue-700 to-sky-800"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Semântica + Gramática"
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
                        A reescritura de frases avalia sua capacidade de dizer a
                        mesma coisa de outra forma, sem perder a conformidade
                        com a <strong>Norma Culta</strong> e, acima de tudo,
                        preservando o <strong>Sentido Original</strong>.
                      </p>
                      <div className="p-5 bg-blue-500/10 rounded-xl border border-blue-500/20">
                        <h4 className="font-bold text-blue-500 flex items-center gap-2 mb-2">
                          <LuCheck /> Equação da Reescritura
                        </h4>
                        <p className="text-sm">
                          Paráfrase Válida = Sentido Intacto + Gramática Correta
                          + Mesmo Modo/Tempo.
                        </p>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação",
                  icone:<LuTarget />,
                  conteudo:(
                    <div className="space-y-6">
                      <p className="text-sm text-muted-foreground">
                        Veja como o modo do verbo altera o sentido exigido pela
                        banca:
                      </p>
                      <div className="grid gap-4 md:grid-cols-2">
                        <FlipCard
                          frente="Original: 'Talvez ele venha à reunião.'"
                          verso="❌ 'Com certeza ele virá.' (O original exprime dúvida. A reescrita mudou para certeza. Inválido!)"
                        />
                        <FlipCard
                          frente="Original: 'Sabe-se que a empresa crescerá.'"
                          verso="✅ 'É sabido que haverá crescimento da empresa.' (O sentido original de certeza e futuro foi mantido)"
                        />
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Exceções e Pegadinhas",
                  icone:<LuTriangleAlert />,
                  conteudo:(
                    <AlertBox tipo="warning" titulo="O Canto da Sereia">
                      <p className="text-sm">
                        A Cesgranrio costuma apresentar uma frase
                        maravilhosamente bem escrita e culta, mas que{" "}
                        <strong>opõe a lógica original</strong>. Não caia na
                        armadilha da "frase bonita". Semântica tem peso igual ou
                        maior que Gramática nesta prova.
                      </p>
                    </AlertBox>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={QUIZ_M1_REESCRITA}
            titulo="Fixação - Módulo 1"
            icone="🎯"
            numero={1}
            variant="blue"
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 2: Técnicas de Troca */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={2}
            titulo="Engenharia de Substituição"
            descricao="Troca de conectivos, sinônimos contextuais e adequação de registro linguístico."
            gradiente="bg-gradient-to-br from-cyan-700 to-teal-800"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Sinônimos e Registro"
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
                        A técnica mais comum é o uso de palavras que pertencem
                        ao mesmo campo semântico (sinônimos). O pulo do gato é
                        garantir que o sinônimo se encaixe na{" "}
                        <strong>regência</strong> correta e no{" "}
                        <strong>contexto</strong> correto.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Dicas de Prova",
                  icone:<LuLightbulb />,
                  conteudo:(
                    <CardCarousel
                      cards={[
                        {
                          icone: "🔄",
                          title: "Sinônimos Regidos",
                          descricao:
                            "Alegre (sem preposição) → Fiel (a algo). Cuidado ao trocar palavras e não trocar as preposições que elas exigem.",
                        },
                        {
                          icone: "⚠️",
                          title: "Contexto",
                          descricao:
                            "'Banco' (assento) vs 'Banco' (financeiro). Um sinônimo absoluto raramente existe. O contexto dita a regra.",
                        },
                        {
                          icone: "📍",
                          title: "Registro",
                          descricao:
                            "Informal vs Formal. Geralmente, reescrituras corretas mantêm a impessoalidade e formalidade do texto base.",
                        },
                      ]}
                    />
                  ),
                },
              ]}
            />
          </section>
          <QuizInterativo
            questoes={QUIZ_M2_TECNICAS}
            titulo="Fixação - Módulo 2"
            icone="🎯"
            numero={2}
            variant="cyan"
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 3: Vozes Verbais */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={3}
            titulo="Vozes Verbais"
            descricao="A arte de transpor entre as vozes (Ativa, Passiva e Reflexiva) mantendo rigorosamente o tempo verbal."
            gradiente="bg-gradient-to-br from-emerald-600 to-teal-700"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Ativa & Passiva"
              variant="emerald"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "A Regra de Ouro",
                  icone:<LuTarget />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Ao passar uma frase da Voz Ativa para a Voz Passiva (ou
                        vice-versa), o <strong>tempo verbal não muda</strong>. É
                        o verbo <em>ser/estar</em> na passiva que deve herdar o
                        tempo exato em que estava o verbo principal.
                      </p>
                      <AlertBox tipo="info" titulo="Macete Petrobras">
                        <p className="text-sm">
                          O tempo do verbo auxiliar (ser) na passiva = O tempo
                          do verbo principal na ativa.
                        </p>
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Exemplificação Prática",
                  icone:<LuBookOpen />,
                  conteudo:(
                    <div className="grid gap-4 md:grid-cols-2">
                      <FlipCard
                        frente="Ativa (Pretérito Perfeito): 'A diretoria anunciou as metas.'"
                        verso="Passiva (Pretérito Perfeito): 'As metas FORAM anunciadas pela diretoria.'"
                      />
                      <FlipCard
                        frente="Ativa (Futuro do Pretérito): 'Eles comprariam a sonda.'"
                        verso="Passiva (Futuro do Pretérito): 'A sonda SERIA comprada por eles.'"
                      />
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <QuizInterativo
            questoes={QUIZ_M3_VOZES}
            titulo="Fixação - Módulo 3"
            icone="🎯"
            numero={3}
            variant="emerald"
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 4: Discurso Direto/Indireto */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={4}
            titulo="Discurso Direto/Indireto"
            descricao="Transferência de citações textuais para a narrativa. Ajustes de pronomes e tempos necessários."
            gradiente="bg-gradient-to-br from-teal-600 to-emerald-800"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={4}
              title="Transposição de Falas"
              variant="emerald"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Conceituação",
                  icone:<LuBookOpen />,
                  conteudo:(
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Passar do discurso direto (aspas, fala de personagem com
                        "Eu/Nós") para o indireto (narrador que fofoca: "Ele
                        disse que") exige ajuste completo na régua temporal. O
                        presente vira passado, e o futuro vira futuro do
                        pretérito.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Dica: Advérbios Temporais",
                  icone:<LuLightbulb />,
                  conteudo:(
                    <AlertBox tipo="warning" titulo="Advérbios do Dia e Lugar">
                      <ul className="list-disc leading-relaxed text-sm ml-6 text-foreground/80">
                        <li>
                          Ontem → <strong>O dia anterior</strong>
                        </li>
                        <li>
                          Amanhã → <strong>O dia seguinte</strong>
                        </li>
                        <li>
                          Hoje → <strong>Aquele dia</strong>
                        </li>
                        <li>
                          Aqui → <strong>Ali / Lá</strong>
                        </li>
                        <li>
                          Este → <strong>Aquele</strong>
                        </li>
                      </ul>
                    </AlertBox>
                  ),
                },
              ]}
            />
          </section>
          <QuizInterativo
            questoes={QUIZ_M4_DISCURSO}
            titulo="Fixação - Módulo 4"
            icone="🎯"
            numero={4}
            variant="emerald"
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 5: Nominalização */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={5}
            titulo="Nominalização"
            descricao="Como transformar orações inteiras em substantivos para conferir maior concisão e formalidade ao texto."
            gradiente="bg-gradient-to-br from-amber-600 to-orange-700"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={5}
              title="Verbo → Substantivo"
              variant="amber"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Exemplificação",
                  icone:<LuTarget />,
                  conteudo:(
                    <div className="space-y-6">
                      <p className="text-sm text-muted-foreground">
                        Isso aparece massivamente para comprimir ideias nas
                        provas.
                      </p>
                      <div className="grid gap-4 md:grid-cols-2">
                        <FlipCard
                          frente="'É essencial que os tubos resistam ao sal.'"
                          verso="Reescrita: 'A resistência dos tubos ao sal é essencial.'"
                        />
                        <FlipCard
                          frente="'Precisamos que a planta colabore com as inspeções.'"
                          verso="Reescrita: 'Precisamos da colaboração da planta com as inspeções.'"
                        />
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <QuizInterativo
            questoes={QUIZ_M5_NOMINALIZACAO}
            titulo="Fixação - Módulo 5"
            icone="🎯"
            numero={5}
            variant="amber"
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 6: Conectivos */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={6}
            titulo="Conectivos Lógicos"
            descricao="Substituição válida e inválida de conjunções (Embora, Mas, Portanto, Visto que)."
            gradiente="bg-gradient-to-br from-orange-600 to-amber-700"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={6}
              title="Nexos e Sintaxe"
              variant="amber"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Exceções e Verbos",
                  icone:<LuTriangleAlert />,
                  conteudo:(
                    <div className="space-y-4">
                      <AlertBox
                        tipo="danger"
                        titulo="Mudança de Conjunção para Preposição"
                      >
                        <p className="text-sm">
                          Se você trocar <strong>Embora</strong> (Conjunção) por{" "}
                          <strong>Apesar de</strong> (Locução Prepositiva), você
                          é obrigado a mexer no tempo do verbo!
                        </p>
                      </AlertBox>
                      <p className="text-muted-foreground italic pl-4 border-l-2 border-orange-500/50">
                        Embora eu <strong>trabalhe</strong> muito... <br />
                        Apesar de eu <strong>trabalhar</strong> muito...
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <QuizInterativo
            questoes={QUIZ_M6_CONECTIVOS}
            titulo="Fixação - Módulo 6"
            icone="🎯"
            numero={6}
            variant="amber"
            onComplete={(score) => handleModuleComplete("modulo-6", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 7: Pontuação */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={7}
            titulo="Pontuação e Sentido"
            descricao="Como as amadas vírgulas explicativas e restritivas alteram a semântica da frase por completo."
            gradiente="bg-gradient-to-br from-red-600 to-rose-800"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={7}
              title="Explicativa x Restritiva"
              variant="rose"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "A Diferença Vital",
                  icone:<LuTarget />,
                  conteudo:(
                    <div className="grid gap-4 md:grid-cols-2">
                      <FlipCard
                        frente="'Os petroleiros, que são eficientes, ganharam bônus.'"
                        verso="Com Vírgula (Explicativa): TODOS os petroleiros do mundo são eficientes. TODOS ganharam o bônus."
                      />
                      <FlipCard
                        frente="'Os petroleiros que são eficientes ganharam bônus.'"
                        verso="Sem Vírgula (Restritiva): UMA PARTE exclusiva dos petroleiros é eficiente. Só eles ganharam o bônus."
                      />
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <QuizInterativo
            questoes={QUIZ_M7_PONTUACAO}
            titulo="Fixação - Módulo 7"
            icone="🎯"
            numero={7}
            variant="rose"
            onComplete={(score) => handleModuleComplete("modulo-7", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 8: Paráfrases Complexas */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={8}
            titulo="Paráfrases Complexas"
            descricao="Questões que misturam três regras de uma só vez: tempos verbais, pronomes oblíquos e conectivos em cascata."
            gradiente="bg-gradient-to-br from-rose-700 to-red-900"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={8}
              title="A Cascata de Alterações"
              variant="rose"
            />
            <p className="text-muted-foreground leading-relaxed">
              Em provas para nível Superior, a Cesgranrio demanda reflexos
              ágeis. Quase sempre, uma alteração de sujeito leva a uma
              concordância diferente, que leva a uma mudança na colocação de
              pronomes. Mantenha os olhos na sintaxe global.
            </p>
          </section>
          <QuizInterativo
            questoes={QUIZ_M8_PARAFRASES}
            titulo="Fixação - Módulo 8"
            icone="🎯"
            numero={8}
            variant="rose"
            onComplete={(score) => handleModuleComplete("modulo-8", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 9: Laboratório */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={9}
            titulo="Laboratório Cesgranrio"
            descricao="Dissecação de sentenças e pegadinhas reais exigidas pela comissão avaliadora nas provas mais recentes."
            gradiente="bg-gradient-to-br from-blue-700 to-cyan-800"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={9}
              title="Padrões Críticos"
              variant="blue"
            />
            <AlertBox tipo="danger" titulo="Inimigo Público Nº1: Posto Que">
              <p className="text-sm">
                "Posto que" ou "Conquanto". Eles enganam pelo som ("já que"),
                mas ambos são estritamente <strong>CONCESSIVOS</strong>{" "}
                (equivalem a "embora"). Errou a semântica de 'Posto que' =
                perdeu a questão.
              </p>
            </AlertBox>
          </section>
          <QuizInterativo
            questoes={QUIZ_M9_CESGRANRIO}
            titulo="Fixação - Módulo 9"
            icone="🎯"
            numero={9}
            variant="blue"
            onComplete={(score) => handleModuleComplete("modulo-9", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 10: Final */}
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={10}
            titulo="Simulado Final"
            descricao="Teste seu domínio perante uma bateria definitiva focada em Reescritura Global Cesgranrio."
            gradiente="bg-gradient-to-br from-cyan-800 to-blue-900"
          />
          {showCompletionBadge ? (
            <div className="flex flex-col items-center gap-6 py-10">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center animate-bounce">
                <LuTrophy className="w-12 h-12 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black">
                Parabéns! Reescritura Dominada!
              </h3>
              <p className="text-center text-muted-foreground max-w-sm">
                Você sabe que a semântica vem primeiro e não cai mais nas
                armadilhas da banca.
              </p>
            </div>
          ) : (
            <QuizInterativo
              questoes={QUIZ_FINAL_REESCRITA}
              titulo="Simulado de Conclusão"
              icone="🏆"
              numero={10}
              variant="cyan"
              onComplete={(score) => handleModuleComplete("modulo-10", score)}
            />
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
















