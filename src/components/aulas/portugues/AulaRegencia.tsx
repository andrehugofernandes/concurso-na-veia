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
  LuLink,
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
  QUIZ_M1_REGENCIA,
  QUIZ_M2_REGENCIA,
  QUIZ_M3_REGENCIA,
  QUIZ_M4_REGENCIA,
  QUIZ_M5_REGENCIA,
  QUIZ_M6_REGENCIA,
  QUIZ_M7_REGENCIA,
  QUIZ_M8_REGENCIA,
  QUIZ_M9_REGENCIA,
  QUIZ_FINAL_REGENCIA,
} from "./data/regencia-quizzes";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Fundamentos e Mecânica" },
  { id: "modulo-2", label: "Módulo 2", title: "Regência Nominal: Adjetivos" },
  {
    id: "modulo-3",
    label: "Módulo 3",
    title: "Regência Nominal: Substantivos",
  },
  { id: "modulo-4", label: "Módulo 4", title: "Verbos de Elite: Parte I" },
  { id: "modulo-5", label: "Módulo 5", title: "Verbos de Elite: Parte II" },
  { id: "modulo-6", label: "Módulo 6", title: "Transitividade Bifronte" },
  { id: "modulo-7", label: "Módulo 7", title: "Movimento e Pronominais" },
  { id: "modulo-8", label: "Módulo 8", title: "Peculiaridades Cesgranrio" },
  { id: "modulo-9", label: "Módulo 9", title: "Regência e Relativos" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Final" },
] as const;

export default function AulaRegencia({
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
      {/* Módulo 1: Fundamentos */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={1}
            titulo="Fundamentos e Mecânica"
            descricao="Entenda a relação de atração entre o termo regente (imã) e o termo regido (complemento)."
            gradiente="bg-gradient-to-br from-blue-700 to-indigo-900"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="A Lógica da Regência"
              variant="blue"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "O que é Regência?",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Regência é a parte da gramática que estuda a relação
                        entre um termo de sentido incompleto (
                        <strong>Regente</strong>) e o termo que o completa (
                        <strong>Regido</strong>).
                      </p>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <h4 className="font-bold text-blue-500 mb-2 flex items-center gap-2">
                            <LuTarget className="w-4 h-4" /> Termo Regente
                          </h4>
                          <p className="text-sm">
                            É a palavra que exige um complemento para ter
                            sentido pleno. Pode ser um verbo ou um nome.
                          </p>
                        </div>
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <h4 className="font-bold text-emerald-500 mb-2 flex items-center gap-2">
                            <LuCheck className="w-4 h-4" /> Termo Regido
                          </h4>
                          <p className="text-sm">
                            É o complemento que satisfaz a exigência do regente,
                            podendo ou não vir acompanhado de preposição.
                          </p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Mecânica da Preposição",
                  icone: <LuZap />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        A preposição é o "conector" que vincula os termos. No
                        concurso, o erro mais comum é trocar ou omitir esse
                        conector.
                      </p>
                      <div className="p-5 bg-amber-500/10 rounded-xl border border-amber-500/20 italic">
                        "O povo confia **em** soluções rápidas." <br />
                        <span className="text-xs text-muted-foreground">
                          (Confia = VERBO REGENTE; EM = PREPOSIÇÃO CONECTORA;
                          Soluções = TERMO REGIDO)
                        </span>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <QuizInterativo
            questoes={QUIZ_M1_REGENCIA}
            titulo="Fixação - Módulo 1"
            icone="🎯"
            numero={1}
            variant="blue"
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 2: Regência Nominal - Adjetivos */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={2}
            titulo="Regência Nominal: Adjetivos"
            descricao="Lista crítica de adjetivos que exigem preposições fixas para não errar na prova."
            gradiente="bg-gradient-to-br from-indigo-700 to-blue-800"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Radar de Adjetivos"
              variant="indigo"
            />
            <CardCarousel
              cards={[
                {
                  icone: "📍",
                  title: "Preposição A",
                  descricao:
                    "Acessível, Apto, Atento, Avesso, Favorável, Idêntico, Nocivo, Relativo.",
                },
                {
                  icone: "🧪",
                  title: "Preposição EM",
                  descricao:
                    "Versado, Perito, Hábil, Indeciso, Morador, Incessante.",
                },
                {
                  icone: "🛡️",
                  title: "Preposição POR",
                  descricao: "Ansioso, Responsável, Apaixonado, Grato.",
                },
              ]}
            />
            <AlertBox tipo="warning" titulo="O Caso de FAVORÁVEL">
              Favorável exige sempre a preposição <strong>A</strong>. É um erro
              comum dizer "favorável com".
              <br /> ✅ "O parecer foi favorável **ao** projeto."
            </AlertBox>
          </section>
          <QuizInterativo
            questoes={QUIZ_M2_REGENCIA}
            titulo="Fixação - Módulo 2"
            icone="🎯"
            numero={2}
            variant="indigo"
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 3: Regência Nominal - Substantivos */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={3}
            titulo="Regência Nominal: Substantivos"
            descricao="A forte atração de nomes como 'Respeito', 'Amor' e 'Dúvida'."
            gradiente="bg-gradient-to-br from-indigo-800 to-slate-900"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Equilíbrio de Nomes"
              variant="indigo"
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Sinônimos de Conexão",
                  icone: <LuLink />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Diferente do que muitos pensam, alguns nomes aceitam
                        mais de uma preposição sem mudar o sentido.
                      </p>
                      <div className="grid gap-2 text-sm">
                        <div className="flex justify-between p-2 border-b">
                          <span>Respeito</span>{" "}
                          <span className="font-mono text-primary">
                            a, com, por, para com
                          </span>
                        </div>
                        <div className="flex justify-between p-2 border-b">
                          <span>Capacidade</span>{" "}
                          <span className="font-mono text-primary">
                            de, para
                          </span>
                        </div>
                        <div className="flex justify-between p-2">
                          <span>Dúvida</span>{" "}
                          <span className="font-mono text-primary">
                            sobre, acerca de, de
                          </span>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>
          <QuizInterativo
            questoes={QUIZ_M3_REGENCIA}
            titulo="Fixação - Módulo 3"
            icone="🎯"
            numero={3}
            variant="indigo"
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 4: Verbos de Elite I */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={4}
            titulo="Verbos de Elite: Parte I"
            descricao="Assistir, Aspirar e Visar: O trio que decide aprovações na Cesgranrio."
            gradiente="bg-gradient-to-br from-emerald-600 to-teal-800"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={4}
              title="A Variação de Sentido"
              variant="emerald"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FlipCard
                frente={<div className="font-bold">ASSISTIR</div>}
                verso={
                  <div className="space-y-3 text-xs">
                    <p>
                      <strong>VTI (A):</strong> Ver/Presenciar. Ex: Assisti ao
                      curso.
                    </p>
                    <p>
                      <strong>VTD:</strong> Ajudar. Ex: Assisti o paciente.
                    </p>
                    <p>
                      <strong>VTI (A):</strong> Caber. Ex: Assiste ao povo esse
                      direito.
                    </p>
                  </div>
                }
              />
              <FlipCard
                frente={<div className="font-bold">ASPIRAR</div>}
                verso={
                  <div className="space-y-3 text-xs">
                    <p>
                      <strong>VTD:</strong> Cheirar/Suggar. Ex: Aspirei o pó.
                    </p>
                    <p>
                      <strong>VTI (A):</strong> Desejar. Ex: Aspiro ao cargo.
                    </p>
                  </div>
                }
              />
              <FlipCard
                frente={<div className="font-bold">VISAR</div>}
                verso={
                  <div className="space-y-3 text-xs">
                    <p>
                      <strong>VTD:</strong> Mirar ou Rubricar. Ex: Visou o
                      documento.
                    </p>
                    <p>
                      <strong>VTI (À/AO):</strong> Objetivar. Ex: Visamos ao
                      sucesso.
                    </p>
                  </div>
                }
              />
            </div>
          </section>
          <QuizInterativo
            questoes={QUIZ_M4_REGENCIA}
            titulo="Fixação - Módulo 4"
            icone="🎯"
            numero={4}
            variant="emerald"
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 5: Verbos de Elite II */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={5}
            titulo="Verbos de Elite: Parte II"
            descricao="Custar, Proceder, Querer e Chamar: nuances que o candidato comum ignora."
            gradiente="bg-gradient-to-br from-emerald-700 to-green-900"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={5}
              title="A Lógica do Custar e Proceder"
              variant="emerald"
            />
            <Comparison
              title="O Verbo CUSTAR"
              left={{
                title: "Coloquial (Errado)",
                content: "Eu custei a entender a norma.",
                description: "Não admite pessoa como sujeito.",
                variant: "danger",
              }}
              right={{
                title: "Culto (Correto)",
                content: "Custou-me entender a norma.",
                description: "Sujeito é a ação (entender).",
                variant: "success",
              }}
            />
            <AlertBox tipo="info" titulo="Macete de PROCEDER">
              Proceder **de** (origem). Proceder **a** (iniciar ação).
              <br /> ✅ "Procederam **ao** embarque imediatamente."
            </AlertBox>
          </section>
          <QuizInterativo
            questoes={QUIZ_M5_REGENCIA}
            titulo="Fixação - Módulo 5"
            icone="🎯"
            numero={5}
            variant="emerald"
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 6: Transitividade Bifronte */}
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={6}
            titulo="Transitividade Bifronte"
            descricao="Pagar, Perdoar e Informar: Um pé na preposição, outro na liberdade."
            gradiente="bg-gradient-to-br from-teal-600 to-cyan-800"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={6}
              title="Pessoa vs Coisa"
              variant="cyan"
            />
            <div className="p-6 bg-cyan-500/5 rounded-2xl border border-cyan-500/20 space-y-4">
              <h4 className="font-black text-cyan-600 uppercase tracking-widest text-sm flex items-center gap-2">
                <LuZap className="w-5 h-5" /> Regra de Ouro (Pagar/Perdoar)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-background p-4 rounded-xl border">
                  <span className="text-xs font-bold text-muted-foreground uppercase">
                    Objeto Coisa (VTD)
                  </span>
                  <p className="mt-1 font-medium">Paguei **o boleto**.</p>
                </div>
                <div className="bg-background p-4 rounded-xl border">
                  <span className="text-xs font-bold text-muted-foreground uppercase">
                    Objeto Pessoa (VTI)
                  </span>
                  <p className="mt-1 font-medium">Paguei **ao funcionário**.</p>
                </div>
              </div>
            </div>
            <AlertBox tipo="danger" titulo="PROIBIDÃO">
              Nunca use preposição nos dois objetos do verbo INFORMAR.
              <br /> ❌ "Informamos aos clientes sobre o erro."
              <br /> ✅ "Informamos os clientes sobre o erro." (Alguém de algo)
              <br /> ✅ "Informamos aos clientes o erro." (Algo a alguém)
            </AlertBox>
          </section>
          <QuizInterativo
            questoes={QUIZ_M6_REGENCIA}
            titulo="Fixação - Módulo 6"
            icone="🎯"
            numero={6}
            variant="cyan"
            onComplete={(score) => handleModuleComplete("modulo-6", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 7: Movimento e Pronominais */}
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={7}
            titulo="Movimento e Pronominais"
            descricao="Ir, Chegar e a saga dos verbos que 'se esquecem' ou 'lembram'."
            gradiente="bg-gradient-to-br from-amber-600 to-orange-800"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={7}
              title="A Preposição 'A' no Movimento"
              variant="amber"
            />
            <AlertBox tipo="warning" titulo="O Erro do 'EM'">
              Na norma culta, quem vai, vai **A** algum lugar. O uso do **EM** é
              coloquialismo.
              <br /> ❌ "Cheguei em casa tarde."
              <br /> ✅ "Cheguei **a** casa tarde."
            </AlertBox>
            <div className="grid gap-4 md:grid-cols-2">
              <FlipCard
                frente="Lembrar algo"
                verso="✅ VTD: 'Lembrei o compromisso.' (Sem pronome, sem preposição)"
              />
              <FlipCard
                frente="Lembrar-SE de algo"
                verso="✅ VTI: 'Lembrei-me do compromisso.' (Com pronome, exige preposição!)"
              />
            </div>
          </section>
          <QuizInterativo
            questoes={QUIZ_M7_REGENCIA}
            titulo="Fixação - Módulo 7"
            icone="🎯"
            numero={7}
            variant="amber"
            onComplete={(score) => handleModuleComplete("modulo-7", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 8: Peculiaridades Cesgranrio */}
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={8}
            titulo="Peculiaridades Cesgranrio"
            descricao="Implicar, Preferir e Aludir: Detalhes técnicos que o manual do Petrobras exige."
            gradiente="bg-gradient-to-br from-orange-700 to-red-800"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={8}
              title="Dossiê IMPLICAR"
              variant="amber"
            />
            <p className="text-muted-foreground leading-relaxed">
              O verbo **IMPLICAR** é o maior gerador de erros na regência verbal
              de concursos. No sentido de "causar" ou "acarretar", ele é
              estritamente **Direto**.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                <h6 className="text-red-500 font-bold flex items-center gap-2 mb-2">
                  <LuCircleX /> Incorreto
                </h6>
                <p className="line-through opacity-60">
                  "O atraso implica em multa."
                </p>
              </div>
              <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                <h6 className="text-emerald-500 font-bold flex items-center gap-2 mb-2">
                  <LuCircleCheck /> Correto
                </h6>
                <p>"O atraso implica multa."</p>
              </div>
            </div>
            <AlertBox tipo="danger" titulo="Preferir e Aludir">
              Preferir: Não use "antes" nem "do que". Use apenas **A**.
              <br /> Aludir: Exige preposição **A**.
            </AlertBox>
          </section>
          <QuizInterativo
            questoes={QUIZ_M8_REGENCIA}
            titulo="Fixação - Módulo 8"
            icone="🎯"
            numero={8}
            variant="amber"
            onComplete={(score) => handleModuleComplete("modulo-8", score)}
          />
        </div>
      </TabsContent>

      {/* Módulo 9: Regência e Relativos */}
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <div className="space-y-12 animate-in fade-in duration-500">
          <ModuleBanner
            numero={9}
            titulo="Regência e Relativos"
            descricao="Onde a preposição viaja para antes do QUE, QUEM ou CUJO."
            gradiente="bg-gradient-to-br from-purple-700 to-indigo-900"
          />
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={9}
              title="A Preposição Viajante"
              variant="indigo"
            />
            <p className="text-muted-foreground text-sm">
              A regra é: olhe para o verbo que vem DEPOIS do pronome. Se ele
              exigir preposição, ela deve ser jogada para ANTES do pronome.
            </p>
            <Comparison
              title="O Pulo do Gato"
              left={{
                title: "Incompleto",
                content: "Estes são os poços **que** referi.",
                description: "Falta a preposição do verbo 'referir-se'.",
                variant: "danger",
              }}
              right={{
                title: "Norma Culta",
                content: "Estes são os poços **a que** me referi.",
                description: "Quem se refere, se refere A algo.",
                variant: "success",
              }}
            />
            <AlertBox tipo="info" titulo="Pronome CUJO">
              O 'Cujo' também deve herdar a preposição.
              <br /> 🏗️ "Esta é a empresa **em cujas** diretrizes confio."
              (Confio EM)
            </AlertBox>
          </section>
          <QuizInterativo
            questoes={QUIZ_M9_REGENCIA}
            titulo="Fixação - Módulo 9"
            icone="🎯"
            numero={9}
            variant="indigo"
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
            descricao="Teste seu domínio perante uma bateria definitiva focada em Regência Global Cesgranrio."
            gradiente="bg-gradient-to-br from-indigo-800 to-black"
          />
          {showCompletionBadge ? (
            <div className="flex flex-col items-center gap-6 py-10">
              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center animate-bounce">
                <LuTrophy className="w-12 h-12 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black">Mestre em Regência!</h3>
              <p className="text-center text-muted-foreground max-w-sm">
                Você agora domina tanto a regência nominal quanto a verbal e
                está pronto para gabaritar a Cesgranrio.
              </p>
            </div>
          ) : (
            <QuizInterativo
              questoes={QUIZ_FINAL_REGENCIA}
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
