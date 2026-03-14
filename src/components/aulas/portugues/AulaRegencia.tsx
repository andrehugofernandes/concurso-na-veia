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
import { getModuleVariant } from "@/lib/moduleColors";

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
              variant={getModuleVariant(1)}
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

          {/* ── CONTEÚDO RICO M1 ── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Regência Verbal vs Nominal"
              variant={getModuleVariant(1)}
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Regência Verbal: o verbo manda",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Na <strong>regência verbal</strong>, o verbo é o termo
                        regente e determina se seu complemento (objeto) vem com
                        ou sem preposição. Isso define a transitividade do verbo.
                      </p>
                      <div className="grid gap-3 md:grid-cols-3">
                        <div className="p-3 bg-blue-500/5 rounded-xl border border-blue-500/20 text-sm">
                          <span className="font-bold text-blue-500 block mb-1">
                            Intransitivo
                          </span>
                          Não exige complemento. Ex: "O sol <strong>nasce</strong>."
                        </div>
                        <div className="p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/20 text-sm">
                          <span className="font-bold text-indigo-500 block mb-1">
                            Transitivo Direto
                          </span>
                          Complemento SEM preposição. Ex: "Ela <strong>comprou</strong> o relatório."
                        </div>
                        <div className="p-3 bg-purple-500/5 rounded-xl border border-purple-500/20 text-sm">
                          <span className="font-bold text-purple-500 block mb-1">
                            Transitivo Indireto
                          </span>
                          Complemento COM preposição. Ex: "Ele <strong>gosta</strong> de café."
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Regência Nominal: o nome manda",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Na <strong>regência nominal</strong>, o termo regente é
                        um <em>nome</em>: substantivo, adjetivo ou advérbio. A
                        preposição exigida é fixa para cada palavra.
                      </p>
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/20 text-sm">
                          <span className="font-bold text-emerald-500 block mb-1">
                            Adjetivo
                          </span>
                          "Apto <strong>a</strong> trabalhar" — a preposição pertence ao adjetivo.
                        </div>
                        <div className="p-3 bg-teal-500/5 rounded-xl border border-teal-500/20 text-sm">
                          <span className="font-bold text-teal-500 block mb-1">
                            Substantivo
                          </span>
                          "Amor <strong>a/por/de</strong> alguém" — o substantivo dita a preposição.
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Por que isso cai tanto na Cesgranrio?",
                  icone: <LuShield />,
                  conteudo: (
                    <div className="space-y-3">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        A Cesgranrio cobra regência porque a língua coloquial
                        usa preposições erradas com frequência. O candidato
                        despreparado escreve como fala. Para a Petrobras, a
                        excelência linguística é exigida.
                      </p>
                      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 text-sm space-y-2">
                        <p>
                          ❌ <span className="line-through opacity-60">"Eu prefiro isso do que aquilo."</span>
                        </p>
                        <p>
                          ✅ "Eu prefiro isso <strong>a</strong> aquilo."
                        </p>
                        <p className="text-xs text-muted-foreground">
                          O verbo PREFERIR exige a preposição A, nunca "do que".
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Transitivo Direto vs Indireto"
              variant={getModuleVariant(1)}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FlipCard
                frente={<div className="font-bold text-lg">TRANSITIVO DIRETO</div>}
                verso={
                  <div className="space-y-3 text-sm">
                    <p className="font-semibold text-emerald-400">Sem preposição obrigatória</p>
                    <p>O verbo liga-se diretamente ao complemento.</p>
                    <p>✅ "A Petrobras <strong>assinou</strong> o contrato."</p>
                    <p>✅ "Ele <strong>comprou</strong> os equipamentos."</p>
                    <p className="text-xs text-muted-foreground">
                      O complemento pode ser substituído por o/a/os/as.
                    </p>
                  </div>
                }
              />
              <FlipCard
                frente={<div className="font-bold text-lg">TRANSITIVO INDIRETO</div>}
                verso={
                  <div className="space-y-3 text-sm">
                    <p className="font-semibold text-blue-400">Com preposição obrigatória</p>
                    <p>O verbo precisa da preposição para conectar o complemento.</p>
                    <p>✅ "Ele <strong>obedeceu às</strong> normas."</p>
                    <p>✅ "Aspiramos <strong>ao</strong> crescimento."</p>
                    <p className="text-xs text-muted-foreground">
                      O complemento pode ser substituído por lhe/lhes.
                    </p>
                  </div>
                }
              />
            </div>
            <AlertBox tipo="info" titulo="Macete Definitivo">
              Para testar a transitividade, substitua o complemento: se cabe
              <strong> o/a</strong> = direto (sem preposição); se cabe{" "}
              <strong>lhe/lhes</strong> = indireto (com preposição).
              <br />
              Ex: "Obedeceu às ormas" → Obedeceu <em>lhe</em> ✅ → Transitivo Indireto.
            </AlertBox>
          </section>

          <QuizInterativo
            questoes={QUIZ_M1_REGENCIA}
            titulo="Fixação - Módulo 1"
            icone="🎯"
            numero={1}
            variant={getModuleVariant(1)}
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
              index={1}
              title="Radar de Adjetivos"
              variant={getModuleVariant(10)}
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

          {/* ── CONTEÚDO RICO M2 ── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Adjetivos Críticos com Preposição COM"
              variant={getModuleVariant(10)}
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Grupo do COM: compatível, contente, satisfeito",
                  icone: <LuLink />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        Vários adjetivos muito comuns na língua formal exigem a
                        preposição <strong>COM</strong>. Errar essas preposições
                        é um dos itens mais cobrados pela Cesgranrio.
                      </p>
                      <div className="grid gap-2 text-sm">
                        {[
                          { adj: "Compatível", prep: "COM", ex: "compatível com as normas" },
                          { adj: "Contente", prep: "COM", ex: "contente com o resultado" },
                          { adj: "Satisfeito", prep: "COM", ex: "satisfeito com o desempenho" },
                          { adj: "Comprometido", prep: "COM", ex: "comprometido com a segurança" },
                          { adj: "Familiarizado", prep: "COM", ex: "familiarizado com os procedimentos" },
                        ].map((item) => (
                          <div
                            key={item.adj}
                            className="flex items-center justify-between p-3 bg-indigo-500/5 rounded-lg border border-indigo-500/10"
                          >
                            <span className="font-semibold">{item.adj}</span>
                            <span className="font-mono text-indigo-400 text-xs font-bold">
                              {item.prep}
                            </span>
                            <span className="text-muted-foreground text-xs italic">
                              {item.ex}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Armadilha: ANSIOSO por vs ANSIOSO para",
                  icone: <LuTriangleAlert />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        O adjetivo <strong>ANSIOSO</strong> admite duas
                        preposições com sentidos diferentes:
                      </p>
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20 text-sm">
                          <span className="font-bold text-blue-500 block mb-1">Ansioso POR</span>
                          Desejo intenso de algo.
                          <br />
                          ✅ "Ansioso <strong>pela</strong> aprovação."
                        </div>
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20 text-sm">
                          <span className="font-bold text-emerald-500 block mb-1">Ansioso PARA</span>
                          Pronto para fazer algo.
                          <br />
                          ✅ "Ansioso <strong>para</strong> começar o trabalho."
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Armadilhas Cesgranrio — Adjetivos"
              variant={getModuleVariant(10)}
            />
            <AlertBox tipo="danger" titulo="Os 5 Adjetivos Mais Cobrados">
              Decore estas combinações — elas aparecem diretamente nas provas da
              Petrobras e da Cesgranrio:
              <br />
              <br />
              ✅ "apto <strong>a</strong> exercer" — não "apto para"
              <br />
              ✅ "atento <strong>às</strong> normas" — não "atento nas normas"
              <br />
              ✅ "nocivo <strong>à</strong> saúde" — não "nocivo para"
              <br />
              ✅ "versado <strong>em</strong> legislação" — não "versado de"
              <br />
              ✅ "responsável <strong>pelo</strong> projeto" — não "responsável do projeto"
            </AlertBox>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FlipCard
                frente={<div className="font-bold">APTO</div>}
                verso={
                  <div className="space-y-2 text-xs">
                    <p className="font-semibold text-emerald-400">Preposição: A</p>
                    <p>✅ "Profissional apto <strong>ao</strong> cargo."</p>
                    <p>✅ "Apto <strong>a</strong> assumir a função."</p>
                    <p className="text-amber-400">⚠️ NUNCA: "apto para o cargo" (coloquial)</p>
                  </div>
                }
              />
              <FlipCard
                frente={<div className="font-bold">ATENTO</div>}
                verso={
                  <div className="space-y-2 text-xs">
                    <p className="font-semibold text-blue-400">Preposição: A</p>
                    <p>✅ "Atento <strong>às</strong> diretrizes corporativas."</p>
                    <p>✅ "Fique atento <strong>ao</strong> prazo."</p>
                    <p className="text-amber-400">⚠️ NUNCA: "atento nos detalhes"</p>
                  </div>
                }
              />
            </div>
          </section>

          <QuizInterativo
            questoes={QUIZ_M2_REGENCIA}
            titulo="Fixação - Módulo 2"
            icone="🎯"
            numero={2}
            variant={getModuleVariant(10)}
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
              index={1}
              title="Equilíbrio de Nomes"
              variant={getModuleVariant(10)}
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

          {/* ── CONTEÚDO RICO M3 ── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Substantivos e Suas Preposições Fixas"
              variant={getModuleVariant(10)}
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Amor, Ódio, Medo: preposições afetivas",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        Os substantivos de sentimento possuem preposições fixas
                        que o candidato deve memorizar:
                      </p>
                      <div className="grid gap-2 text-sm">
                        {[
                          { subst: "Amor", prep: "A / DE / POR", ex: "amor à pátria / amor de mãe / amor pelo trabalho" },
                          { subst: "Medo", prep: "DE", ex: "medo de falhar" },
                          { subst: "Ódio", prep: "A / DE", ex: "ódio ao desperdício / ódio de perder" },
                          { subst: "Saudade", prep: "DE", ex: "saudade de casa" },
                          { subst: "Orgulho", prep: "DE", ex: "orgulho do trabalho realizado" },
                        ].map((item) => (
                          <div
                            key={item.subst}
                            className="p-3 bg-indigo-500/5 rounded-lg border border-indigo-500/10 space-y-1"
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-bold">{item.subst}</span>
                              <span className="text-indigo-400 font-mono text-xs font-bold">
                                {item.prep}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground italic">
                              {item.ex}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Substantivos técnicos de prova",
                  icone: <LuFileText />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        No contexto corporativo da Petrobras, estes substantivos
                        aparecem com frequência em relatórios técnicos:
                      </p>
                      <div className="grid gap-2 text-sm">
                        {[
                          { subst: "Necessidade", prep: "DE", ex: "necessidade de treinamento" },
                          { subst: "Referência", prep: "A", ex: "referência ao protocolo" },
                          { subst: "Dependência", prep: "DE", ex: "dependência de aprovação" },
                          { subst: "Acesso", prep: "A", ex: "acesso ao sistema" },
                          { subst: "Cumprimento", prep: "DE", ex: "cumprimento das metas" },
                        ].map((item) => (
                          <div
                            key={item.subst}
                            className="flex items-center justify-between p-3 bg-slate-500/5 rounded-lg border border-slate-500/10"
                          >
                            <span className="font-semibold">{item.subst}</span>
                            <span className="text-primary font-mono text-xs font-bold">
                              {item.prep}
                            </span>
                            <span className="text-muted-foreground text-xs italic">
                              {item.ex}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Comparação: Uso Correto vs Coloquial"
              variant={getModuleVariant(10)}
            />
            <Comparison
              title="Respeito: Preposição A ou COM?"
              left={{
                title: "Uso Coloquial",
                content: "Tenho respeito por todos os colegas.",
                description: "Válido, mas há opção mais formal.",
                variant: "warning",
              }}
              right={{
                title: "Uso Formal (Petrobras)",
                content: "Tenho respeito a todos os colegas.",
                description: "Preposição A é a mais culta para este substantivo.",
                variant: "success",
              }}
            />
            <AlertBox tipo="info" titulo="DICA: Herança Verbal">
              Quando um substantivo deriva de um verbo, ele pode herdar a
              regência do verbo de origem.
              <br />
              Ex: "referir-se <strong>a</strong>" → "referência <strong>a</strong>"
              <br />
              Ex: "cuidar <strong>de</strong>" → "cuidado <strong>com</strong>" (alguns mudam levemente)
            </AlertBox>
          </section>

          <QuizInterativo
            questoes={QUIZ_M3_REGENCIA}
            titulo="Fixação - Módulo 3"
            icone="🎯"
            numero={3}
            variant={getModuleVariant(10)}
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
              index={1}
              title="A Variação de Sentido"
              variant={getModuleVariant(3)}
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

          {/* ── CONTEÚDO RICO M4 ── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Armadilhas Cesgranrio — Verbos Bifrontes"
              variant={getModuleVariant(3)}
            />
            <AlertBox tipo="danger" titulo="Verbos que mudam de regência conforme o sentido">
              Os verbos bifrontes são o maior desafio de regência verbal. Cada
              sentido pede uma regência diferente. Os mais cobrados:
              <br /><br />
              🎯 <strong>ASSISTIR</strong>: ver (VTI-A) / ajudar (VTD) / caber (VTI-A)
              <br />
              🎯 <strong>ASPIRAR</strong>: inalar (VTD) / desejar (VTI-A)
              <br />
              🎯 <strong>VISAR</strong>: mirar/rubricar (VTD) / objetivar (VTI-A)
              <br />
              🎯 <strong>QUERER</strong>: desejar (VTD) / estimar/gostar (VTI-A)
              <br />
              🎯 <strong>CHAMAR</strong>: convocar (VTD) / denominar (VTD ou VTI)
            </AlertBox>
            <ContentAccordion
              slides={[
                {
                  titulo: "ASSISTIR: o verbo mais cobrado da prova",
                  icone: <LuEye />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        O verbo ASSISTIR merece atenção especial porque seus
                        três sentidos têm regências completamente distintas:
                      </p>
                      <div className="space-y-3">
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20 text-sm">
                          <span className="font-bold text-emerald-500 block mb-1">
                            1. VER / PRESENCIAR → VTI (A)
                          </span>
                          <p>✅ "Assisti <strong>ao</strong> treinamento de segurança."</p>
                          <p>✅ "Os técnicos assistiram <strong>às</strong> operações."</p>
                          <p className="text-red-400 mt-1">❌ "Assisti o treinamento." (errado neste sentido)</p>
                        </div>
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20 text-sm">
                          <span className="font-bold text-blue-500 block mb-1">
                            2. AJUDAR / SOCORRER → VTD
                          </span>
                          <p>✅ "A equipe assistiu <strong>os</strong> trabalhadores acidentados."</p>
                          <p>✅ "O médico assistiu <strong>os</strong> pacientes."</p>
                        </div>
                        <div className="p-4 bg-purple-500/5 rounded-xl border border-purple-500/20 text-sm">
                          <span className="font-bold text-purple-500 block mb-1">
                            3. CABER / SER DIREITO DE → VTI (A)
                          </span>
                          <p>✅ "Assiste <strong>aos</strong> empregados o direito de recurso."</p>
                          <p>✅ "Não assiste <strong>ao</strong> gestor tal decisão."</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "ASPIRAR e VISAR: cuidados específicos",
                  icone: <LuTarget />,
                  conteudo: (
                    <div className="space-y-4">
                      <div className="p-4 bg-teal-500/5 rounded-xl border border-teal-500/20 text-sm">
                        <span className="font-bold text-teal-500 block mb-2">ASPIRAR</span>
                        <p>✅ "Os trabalhadores aspiraram <strong>o</strong> pó do ambiente." (inalar = VTD)</p>
                        <p>✅ "Os engenheiros aspiram <strong>ao</strong> cargo de gestão." (desejar = VTI-A)</p>
                        <p className="text-red-400 mt-1">❌ "Aspiro ao pó" (sentido incorreto — inalar não aceita preposição)</p>
                      </div>
                      <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20 text-sm">
                        <span className="font-bold text-cyan-500 block mb-2">VISAR</span>
                        <p>✅ "O gerente visou <strong>o</strong> documento oficial." (rubricar = VTD)</p>
                        <p>✅ "A empresa visava <strong>ao</strong> lucro sustentável." (objetivar = VTI-A)</p>
                        <p className="text-red-400 mt-1">❌ "Visa melhorar" (infinitivo sem preposição só é aceito em sentido coloquial)</p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Comparação Direta: Assistir a vs Assistir"
              variant={getModuleVariant(3)}
            />
            <Comparison
              title="O verbo ASSISTIR no contexto corporativo"
              left={{
                title: "❌ Uso Coloquial",
                content: "Todos assistiram a apresentação.",
                description: "No sentido de 'ver', falta a preposição A.",
                variant: "danger",
              }}
              right={{
                title: "✅ Norma Culta",
                content: "Todos assistiram à apresentação.",
                description: "VTI no sentido de 'ver' exige a preposição A (crase com 'a apresentação' → 'à').",
                variant: "success",
              }}
            />
          </section>

          <QuizInterativo
            questoes={QUIZ_M4_REGENCIA}
            titulo="Fixação - Módulo 4"
            icone="🎯"
            numero={4}
            variant={getModuleVariant(3)}
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
              index={1}
              title="A Lógica do Custar e Proceder"
              variant={getModuleVariant(3)}
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

          {/* ── CONTEÚDO RICO M5 ── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Top 10 Verbos Que Confundem Candidatos"
              variant={getModuleVariant(3)}
            />
            <AlertBox tipo="danger" titulo="Lista Crítica — Decore Antes da Prova">
              Os 10 verbos que mais caem em provas da Cesgranrio/Petrobras:
              <br /><br />
              1. <strong>Obedecer</strong> → VTI (A): "obedecer <strong>às</strong> normas"
              <br />
              2. <strong>Simpatizar</strong> → VTI (COM): "simpatizo <strong>com</strong> a proposta"
              <br />
              3. <strong>Antipatizar</strong> → VTI (COM): "antipatiza <strong>com</strong> o projeto"
              <br />
              4. <strong>Implicar</strong> → VTD (causar): "o erro implica <strong>penalidade</strong>"
              <br />
              5. <strong>Presidir</strong> → VTD: "presidiu <strong>a</strong> reunião"
              <br />
              6. <strong>Perdoar</strong> → pessoa=VTI(A) / coisa=VTD: "perdoei-lhe / perdoei o erro"
              <br />
              7. <strong>Agradar</strong> → satisfazer=VTD / fazer carinho=VTI(A)
              <br />
              8. <strong>Chegar</strong> / <strong>Ir</strong> → destino=VTI(A): "cheguei <strong>ao</strong> porto"
              <br />
              9. <strong>Namorar</strong> → VTD (sem preposição): "namora <strong>a</strong> colega"
              <br />
              10. <strong>Querer</strong> → desejar=VTD / estimar=VTI(A): "quero-lhe bem"
            </AlertBox>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Pares de Confusão: FlipCards"
              variant={getModuleVariant(3)}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FlipCard
                frente={<div className="font-bold">AGRADAR</div>}
                verso={
                  <div className="space-y-2 text-xs">
                    <p className="text-emerald-400 font-bold">Dois sentidos, duas regências:</p>
                    <p>✅ <strong>VTD</strong> (satisfazer): "A decisão agradou <strong>os</strong> diretores."</p>
                    <p>✅ <strong>VTI (A)</strong> (fazer carinho): "O gestor agradou <strong>aos</strong> subordinados."</p>
                    <p className="text-amber-400 mt-1">⚠️ O contexto define tudo!</p>
                  </div>
                }
              />
              <FlipCard
                frente={<div className="font-bold">CHAMAR</div>}
                verso={
                  <div className="space-y-2 text-xs">
                    <p className="text-blue-400 font-bold">Convocar vs Denominar:</p>
                    <p>✅ <strong>VTD</strong> (convocar): "Chamou <strong>o</strong> técnico."</p>
                    <p>✅ <strong>VTD ou VTI (DE/A)</strong> (denominar): "Chamou-o de herói." / "Chamou-lhe herói."</p>
                  </div>
                }
              />
              <FlipCard
                frente={<div className="font-bold">PRESIDIR</div>}
                verso={
                  <div className="space-y-2 text-xs">
                    <p className="text-teal-400 font-bold">Contexto Petrobras:</p>
                    <p>✅ <strong>VTD</strong>: "O diretor presidiu <strong>a</strong> cerimônia."</p>
                    <p>✅ <strong>VTD</strong>: "Presidiu <strong>a</strong> reunião do conselho."</p>
                    <p className="text-red-400">❌ "Presidiu à reunião" — errado!</p>
                  </div>
                }
              />
              <FlipCard
                frente={<div className="font-bold">QUERER</div>}
                verso={
                  <div className="space-y-2 text-xs">
                    <p className="text-purple-400 font-bold">Desejar vs Estimar:</p>
                    <p>✅ <strong>VTD</strong> (desejar): "Quero <strong>o</strong> relatório."</p>
                    <p>✅ <strong>VTI (A)</strong> (estimar): "Quero <strong>bem a</strong> minha equipe."</p>
                    <p className="text-xs text-muted-foreground mt-1">Quero-lhe bem = estimo você</p>
                  </div>
                }
              />
            </div>
          </section>

          <QuizInterativo
            questoes={QUIZ_M5_REGENCIA}
            titulo="Fixação - Módulo 5"
            icone="🎯"
            numero={5}
            variant={getModuleVariant(3)}
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
              index={1}
              title="Pessoa vs Coisa"
              variant={getModuleVariant(2)}
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

          {/* ── CONTEÚDO RICO M6 ── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Regra Pessoa/Coisa: Os Verbos Bifrontes Mais Cobrados"
              variant={getModuleVariant(2)}
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "PAGAR e PERDOAR: a regra da pessoa vs coisa",
                  icone: <LuZap />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        Estes dois verbos seguem a mesma lógica: quando o
                        objeto é uma <strong>coisa</strong>, é direto; quando é
                        uma <strong>pessoa</strong>, é indireto (exige A).
                      </p>
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="space-y-2">
                          <h5 className="text-teal-500 font-bold text-sm">PAGAR</h5>
                          <div className="p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/10 text-xs space-y-1">
                            <p>✅ Paguei <strong>a conta</strong> (coisa = VTD)</p>
                            <p>✅ Paguei <strong>ao fornecedor</strong> (pessoa = VTI)</p>
                            <p className="text-red-400">❌ Paguei a conta ao fornecedor</p>
                            <p className="text-emerald-400">✅ Paguei a conta para o fornecedor</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h5 className="text-cyan-500 font-bold text-sm">PERDOAR</h5>
                          <div className="p-3 bg-cyan-500/5 rounded-lg border border-cyan-500/10 text-xs space-y-1">
                            <p>✅ Perdoei <strong>o erro</strong> (coisa = VTD)</p>
                            <p>✅ Perdoei <strong>ao colega</strong> (pessoa = VTI)</p>
                            <p className="text-muted-foreground">Perdoo-lhe = perdoo a você</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "ENSINAR e PERGUNTAR: dois objetos ao mesmo tempo",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        Alguns verbos aceitam dois complementos ao mesmo
                        tempo: um direto (a coisa ensinada/perguntada) e um
                        indireto (a pessoa).
                      </p>
                      <div className="p-4 bg-teal-500/5 rounded-xl border border-teal-500/20 text-sm space-y-2">
                        <p>✅ "O supervisor ensinou <strong>os procedimentos</strong> (VTD) <strong>aos</strong> novatos (VTI)."</p>
                        <p>✅ "Perguntou <strong>o prazo</strong> (VTD) <strong>ao</strong> gerente (VTI)."</p>
                        <p className="text-muted-foreground text-xs mt-2">
                          Regra: a coisa sempre é VTD; a pessoa sempre é VTI (A).
                        </p>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Implicar em: o erro mais famoso"
              variant={getModuleVariant(2)}
            />
            <Comparison
              title="IMPLICAR no sentido de 'causar/acarretar'"
              left={{
                title: "❌ Erro Clássico",
                content: "O acidente implica em paralisação.",
                description: "\"Implicar em\" é ERRADO no sentido de acarretar.",
                variant: "danger",
              }}
              right={{
                title: "✅ Forma Correta",
                content: "O acidente implica paralisação.",
                description: "No sentido de 'acarretar/causar', IMPLICAR é VTD — sem preposição.",
                variant: "success",
              }}
            />
            <AlertBox tipo="warning" titulo="IMPLICAR tem dois sentidos — atenção!">
              <strong>Causar/Acarretar</strong>: VTD — sem preposição.
              <br />
              ✅ "O corte de verba implica atraso no projeto."
              <br /><br />
              <strong>Ter implicância/antipatia</strong>: VTI (COM) — com preposição.
              <br />
              ✅ "O fiscal implica <strong>com</strong> pequenos erros."
            </AlertBox>
          </section>

          <QuizInterativo
            questoes={QUIZ_M6_REGENCIA}
            titulo="Fixação - Módulo 6"
            icone="🎯"
            numero={6}
            variant={getModuleVariant(2)}
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
              index={1}
              title="A Preposição 'A' no Movimento"
              variant={getModuleVariant(6)}
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

          {/* ── CONTEÚDO RICO M7 ── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Ir A vs Ir PARA vs Ir EM"
              variant={getModuleVariant(6)}
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "A distinção de IR A / IR PARA",
                  icone: <LuArrowRight />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        Na norma culta, a preposição que acompanha verbos de
                        movimento (<em>ir, chegar, voltar, regressar</em>) tem
                        regras precisas:
                      </p>
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20 text-sm">
                          <span className="font-bold text-amber-500 block mb-1">IR A</span>
                          Indica movimento com intenção de retorno.
                          <br />
                          ✅ "Fui <strong>ao</strong> escritório pela manhã." (e voltei)
                          <br />
                          ✅ "Vou <strong>à</strong> reunião agora."
                        </div>
                        <div className="p-4 bg-orange-500/5 rounded-xl border border-orange-500/20 text-sm">
                          <span className="font-bold text-orange-500 block mb-1">IR PARA</span>
                          Indica movimento com intenção de permanência.
                          <br />
                          ✅ "Foi <strong>para</strong> a plataforma por 30 dias."
                          <br />
                          ✅ "Mudou-se <strong>para</strong> o Rio de Janeiro."
                        </div>
                      </div>
                      <div className="p-3 bg-red-500/5 rounded-lg border border-red-500/20 text-sm">
                        <span className="font-bold text-red-400">IR EM</span> — ERRADO na norma culta escrita!
                        <br />
                        ❌ <span className="line-through opacity-60">"Fui em São Paulo semana passada."</span>
                        <br />
                        ✅ "Fui <strong>a</strong> São Paulo semana passada."
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Verbos pronominais: regência muda com o SE",
                  icone: <LuLink />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        Quando o verbo se pronominaliza (recebe SE, ME, TE),
                        geralmente muda de transitivo direto para indireto —
                        e exige preposição:
                      </p>
                      <div className="grid gap-2 text-sm">
                        {[
                          { sem: "Lembrar (VTD)", com: "Lembrar-se DE (VTI)", ex: "Lembrou o relatório → Lembrou-se do relatório" },
                          { sem: "Esquecer (VTD)", com: "Esquecer-se DE (VTI)", ex: "Esqueceu a senha → Esqueceu-se da senha" },
                          { sem: "Queixar (raro)", com: "Queixar-se DE (VTI)", ex: "Queixou-se do barulho" },
                          { sem: "Orgulhar (raro)", com: "Orgulhar-se DE (VTI)", ex: "Orgulhou-se do resultado" },
                        ].map((item, i) => (
                          <div
                            key={i}
                            className="p-3 bg-amber-500/5 rounded-lg border border-amber-500/10"
                          >
                            <div className="flex items-center gap-2 text-xs font-bold mb-1">
                              <span className="text-muted-foreground">{item.sem}</span>
                              <LuArrowRight className="w-3 h-3" />
                              <span className="text-amber-400">{item.com}</span>
                            </div>
                            <p className="text-xs text-muted-foreground italic">{item.ex}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Comparação: Chegar A vs Chegar EM"
              variant={getModuleVariant(6)}
            />
            <Comparison
              title="Verbos de Chegada na Norma Culta"
              left={{
                title: "❌ Coloquial",
                content: "O técnico chegou em Macaé ontem.",
                description: "Uso de EM com verbo de chegada é coloquialismo.",
                variant: "danger",
              }}
              right={{
                title: "✅ Norma Culta",
                content: "O técnico chegou a Macaé ontem.",
                description: "Chegar exige A (ou À com artigo feminino) para indicar destino.",
                variant: "success",
              }}
            />
            <AlertBox tipo="info" titulo="Casa é exceção especial">
              Com o substantivo <strong>casa</strong> (sem artigo), não há
              crase e não há preposição alternativa:
              <br />
              ✅ "Cheguei <strong>a</strong> casa." (sem artigo = sem crase)
              <br />
              ✅ "Cheguei <strong>à</strong> casa de Pedro." (com artigo = com crase)
            </AlertBox>
          </section>

          <QuizInterativo
            questoes={QUIZ_M7_REGENCIA}
            titulo="Fixação - Módulo 7"
            icone="🎯"
            numero={7}
            variant={getModuleVariant(6)}
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
              index={1}
              title="Dossiê IMPLICAR"
              variant={getModuleVariant(6)}
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

          {/* ── CONTEÚDO RICO M8 ── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Peculiaridades que a Cesgranrio Adora"
              variant={getModuleVariant(6)}
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "PREFERIR: o mais maltratado",
                  icone: <LuTriangleAlert />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        O verbo <strong>PREFERIR</strong> é transitivo direto e
                        indireto. O complemento preferido é VTD; o preterido
                        vem com preposição A. Nunca use "do que" ou "antes".
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="p-3 bg-red-500/5 rounded-lg border border-red-500/10">
                          ❌ <span className="line-through opacity-70">"Prefiro café do que chá."</span>
                        </div>
                        <div className="p-3 bg-red-500/5 rounded-lg border border-red-500/10">
                          ❌ <span className="line-through opacity-70">"Prefiro muito mais café."</span>
                          <span className="text-xs text-muted-foreground ml-2">(pleonasmo vicioso)</span>
                        </div>
                        <div className="p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/10">
                          ✅ "Prefiro café <strong>a</strong> chá."
                        </div>
                        <div className="p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/10">
                          ✅ "Prefiro trabalhar <strong>a</strong> ficar ocioso."
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "ALUDIR, REFERIR-SE e REPORTAR-SE",
                  icone: <LuMessageCircle />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        Estes três verbos são muito usados em textos formais e
                        relatórios técnicos da Petrobras. Todos exigem
                        preposição <strong>A</strong>.
                      </p>
                      <div className="grid gap-2 text-sm">
                        <div className="p-3 bg-orange-500/5 rounded-lg border border-orange-500/10">
                          <span className="font-bold text-orange-400">ALUDIR A</span>
                          <br />
                          ✅ "O engenheiro aludiu <strong>ao</strong> problema estrutural."
                          <br />
                          ❌ <span className="line-through opacity-60">"Aludiu sobre o problema."</span>
                        </div>
                        <div className="p-3 bg-amber-500/5 rounded-lg border border-amber-500/10">
                          <span className="font-bold text-amber-400">REFERIR-SE A</span>
                          <br />
                          ✅ "O documento refere-se <strong>às</strong> normas ISO."
                          <br />
                          ❌ <span className="line-through opacity-60">"Refere-se sobre as normas."</span>
                        </div>
                        <div className="p-3 bg-yellow-500/5 rounded-lg border border-yellow-500/10">
                          <span className="font-bold text-yellow-400">REPORTAR-SE A</span>
                          <br />
                          ✅ "O técnico reportou-se <strong>ao</strong> supervisor imediato."
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "DE vs EM: verbos que geram dúvida",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        Alguns verbos oscilam entre DE e EM na linguagem
                        coloquial. A gramática normativa é clara:
                      </p>
                      <div className="grid gap-2 text-sm">
                        {[
                          { verbo: "Precisar", prep: "DE", ex: "precisar de aprovação", errado: "precisar em" },
                          { verbo: "Carecer", prep: "DE", ex: "carecer de recursos", errado: "carecer em" },
                          { verbo: "Necessitar", prep: "DE", ex: "necessitar de treinamento", errado: "necessitar em" },
                          { verbo: "Depender", prep: "DE", ex: "depender da diretoria", errado: "depender em" },
                          { verbo: "Gostar", prep: "DE", ex: "gostar de trabalhar", errado: "gostar em" },
                        ].map((item) => (
                          <div key={item.verbo} className="p-3 bg-amber-500/5 rounded-lg border border-amber-500/10">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold">{item.verbo}</span>
                              <span className="text-amber-400 font-mono text-xs font-bold">{item.prep}</span>
                            </div>
                            <p className="text-xs">✅ {item.ex}</p>
                            <p className="text-xs text-red-400">❌ <span className="line-through opacity-70">{item.errado}</span></p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="FlipCards: Precisar, Carecer e Necessitar"
              variant={getModuleVariant(6)}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FlipCard
                frente={<div className="font-bold">PRECISAR</div>}
                verso={
                  <div className="space-y-2 text-xs">
                    <p className="text-orange-400 font-bold">Preposição: DE</p>
                    <p>✅ "A operação precisa <strong>de</strong> autorização."</p>
                    <p>✅ "Precisamos <strong>de</strong> mais tempo."</p>
                    <p className="text-red-400">❌ "Precisa em autorização" — errado!</p>
                  </div>
                }
              />
              <FlipCard
                frente={<div className="font-bold">CARECER</div>}
                verso={
                  <div className="space-y-2 text-xs">
                    <p className="text-amber-400 font-bold">Preposição: DE</p>
                    <p>✅ "O projeto carece <strong>de</strong> revisão técnica."</p>
                    <p>✅ "A proposta carece <strong>de</strong> embasamento."</p>
                    <p className="text-muted-foreground text-xs mt-1">Sinônimo formal de "precisar"</p>
                  </div>
                }
              />
              <FlipCard
                frente={<div className="font-bold">NECESSITAR</div>}
                verso={
                  <div className="space-y-2 text-xs">
                    <p className="text-yellow-400 font-bold">Preposição: DE</p>
                    <p>✅ "A planta necessita <strong>de</strong> manutenção preventiva."</p>
                    <p>✅ "Todos necessitam <strong>de</strong> treinamento."</p>
                    <p className="text-muted-foreground text-xs mt-1">Uso formal muito frequente na Petrobras</p>
                  </div>
                }
              />
            </div>
          </section>

          <QuizInterativo
            questoes={QUIZ_M8_REGENCIA}
            titulo="Fixação - Módulo 8"
            icone="🎯"
            numero={8}
            variant={getModuleVariant(6)}
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
              index={1}
              title="A Preposição Viajante"
              variant={getModuleVariant(10)}
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

          {/* ── CONTEÚDO RICO M9 ── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Linguagem Petrobras: Verbos em Textos Técnicos"
              variant={getModuleVariant(10)}
            />
            <AlertBox tipo="info" titulo="Verbos Formais da Redação Oficial Petrobras">
              Em documentos técnicos, relatórios e atas da Petrobras, estes
              verbos aparecem com frequência — e sempre com regência específica:
              <br /><br />
              ✅ <strong>Propor</strong> algo (VTD): "propor medidas"
              <br />
              ✅ <strong>Referir-se a</strong> (VTI): "o relatório refere-se <strong>às</strong> metas"
              <br />
              ✅ <strong>Presidir</strong> algo (VTD): "presidiu <strong>a</strong> reunião"
              <br />
              ✅ <strong>Submeter-se a</strong> (VTI): "submeteu-se <strong>à</strong> auditoria"
              <br />
              ✅ <strong>Ater-se a</strong> (VTI): "atenha-se <strong>ao</strong> protocolo"
              <br />
              ✅ <strong>Opor-se a</strong> (VTI): "opôs-se <strong>à</strong> proposta"
            </AlertBox>
            <ContentAccordion
              slides={[
                {
                  titulo: "Como a Regência aparece em questões com pronome relativo",
                  icone: <LuFileText />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        A Cesgranrio gosta de inserir pronomes relativos (que,
                        quem, o qual) para verificar se o candidato mantém a
                        preposição correta do verbo:
                      </p>
                      <div className="space-y-3 text-sm">
                        <div className="p-3 bg-purple-500/5 rounded-lg border border-purple-500/10">
                          <span className="font-bold text-purple-400">Verbo CONFIAR EM</span>
                          <br />
                          ✅ "Este é o gestor <strong>em quem</strong> confio."
                          <br />
                          ❌ <span className="line-through opacity-60">"Este é o gestor que confio."</span>
                        </div>
                        <div className="p-3 bg-indigo-500/5 rounded-lg border border-indigo-500/10">
                          <span className="font-bold text-indigo-400">Verbo DEPENDER DE</span>
                          <br />
                          ✅ "Esta é a decisão <strong>de que</strong> dependo."
                          <br />
                          ❌ <span className="line-through opacity-60">"Esta é a decisão que dependo."</span>
                        </div>
                        <div className="p-3 bg-violet-500/5 rounded-lg border border-violet-500/10">
                          <span className="font-bold text-violet-400">Verbo ASPIRAR A</span>
                          <br />
                          ✅ "Este é o cargo <strong>a que</strong> aspiro."
                          <br />
                          ❌ <span className="line-through opacity-60">"Este é o cargo que aspiro."</span>
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Regência na redação técnica: armadilhas de prova",
                  icone: <LuShield />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        Em questões de reescrita e adequação de linguagem
                        técnica, a Cesgranrio verifica se o candidato sabe
                        usar a regência correta em contexto formal:
                      </p>
                      <div className="space-y-3 text-sm">
                        <div className="p-3 bg-slate-500/5 rounded-lg border border-slate-500/10">
                          <p className="text-muted-foreground text-xs mb-1">ANTES (inadequado):</p>
                          <p className="italic">"O sistema que nos referimos apresenta falhas."</p>
                          <p className="text-muted-foreground text-xs mt-2 mb-1">DEPOIS (correto):</p>
                          <p className="italic text-emerald-400">"O sistema <strong>a que</strong> nos referimos apresenta falhas."</p>
                        </div>
                        <div className="p-3 bg-slate-500/5 rounded-lg border border-slate-500/10">
                          <p className="text-muted-foreground text-xs mb-1">ANTES (inadequado):</p>
                          <p className="italic">"A norma que procedemos foi aprovada."</p>
                          <p className="text-muted-foreground text-xs mt-2 mb-1">DEPOIS (correto):</p>
                          <p className="italic text-emerald-400">"A norma <strong>a que</strong> procedemos foi aprovada."</p>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="CardCarousel: Pronomes Relativos com Preposição"
              variant={getModuleVariant(10)}
            />
            <CardCarousel
              cards={[
                {
                  icone: "🔗",
                  title: "A QUE / AO QUE",
                  descricao: "Verbo exige A: 'assisti a' → 'o filme a que assisti'.",
                },
                {
                  icone: "🔗",
                  title: "DE QUE / DO QUE",
                  descricao: "Verbo exige DE: 'precisar de' → 'o apoio de que precisamos'.",
                },
                {
                  icone: "🔗",
                  title: "EM QUE / NO QUE",
                  descricao: "Verbo exige EM: 'confiar em' → 'o gestor em quem confio'.",
                },
                {
                  icone: "🔗",
                  title: "COM QUE",
                  descricao: "Verbo exige COM: 'contar com' → 'a equipe com que contamos'.",
                },
                {
                  icone: "🔗",
                  title: "POR QUE / PELO QUE",
                  descricao: "Verbo exige POR: 'optar por' → 'a solução pela qual optamos'.",
                },
              ]}
            />
          </section>

          <QuizInterativo
            questoes={QUIZ_M9_REGENCIA}
            titulo="Fixação - Módulo 9"
            icone="🎯"
            numero={9}
            variant={getModuleVariant(10)}
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

          {/* ── CONTEÚDO RICO M10 ── */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Mapa Mental: Todas as Regras de Regência"
              variant={getModuleVariant(10)}
            />
            <ContentAccordion
              slides={[
                {
                  titulo: "Regência Verbal: resumo completo",
                  icone: <LuBrain />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        Consolide todas as regras de regência verbal em um
                        único bloco de revisão:
                      </p>
                      <div className="grid gap-2 text-xs">
                        {[
                          { verbo: "Assistir (ver)", regencia: "VTI — A", ex: "Assisti ao documentário" },
                          { verbo: "Assistir (ajudar)", regencia: "VTD", ex: "Assistiu os feridos" },
                          { verbo: "Aspirar (inalar)", regencia: "VTD", ex: "Aspirou o gás" },
                          { verbo: "Aspirar (desejar)", regencia: "VTI — A", ex: "Aspira ao cargo" },
                          { verbo: "Visar (rubricar)", regencia: "VTD", ex: "Visou o cheque" },
                          { verbo: "Visar (objetivar)", regencia: "VTI — A", ex: "Visa ao lucro" },
                          { verbo: "Implicar (causar)", regencia: "VTD", ex: "Implica multa" },
                          { verbo: "Implicar (antipatia)", regencia: "VTI — COM", ex: "Implica com tudo" },
                          { verbo: "Obedecer", regencia: "VTI — A", ex: "Obedeceu às normas" },
                          { verbo: "Pagar (coisa)", regencia: "VTD", ex: "Pagou a conta" },
                          { verbo: "Pagar (pessoa)", regencia: "VTI — A", ex: "Pagou ao funcionário" },
                          { verbo: "Preferir", regencia: "VTD + VTI — A", ex: "Prefere café a chá" },
                          { verbo: "Presidir", regencia: "VTD", ex: "Presidiu a reunião" },
                          { verbo: "Ir / Chegar", regencia: "VTI — A", ex: "Chegou ao escritório" },
                          { verbo: "Referir-se", regencia: "VTI — A", ex: "Refere-se ao projeto" },
                        ].map((item) => (
                          <div
                            key={item.verbo}
                            className="flex items-center gap-2 p-2 bg-indigo-500/5 rounded-lg border border-indigo-500/10"
                          >
                            <span className="font-bold w-36 shrink-0">{item.verbo}</span>
                            <span className="text-indigo-400 font-mono font-bold w-24 shrink-0">
                              {item.regencia}
                            </span>
                            <span className="text-muted-foreground italic">{item.ex}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Regência Nominal: resumo completo",
                  icone: <LuBookOpen />,
                  conteudo: (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        Todos os adjetivos e substantivos com preposições fixas
                        que caem na prova:
                      </p>
                      <div className="grid gap-2 md:grid-cols-2 text-xs">
                        {[
                          { nome: "Apto", prep: "A", tipo: "adj" },
                          { nome: "Atento", prep: "A", tipo: "adj" },
                          { nome: "Favorável", prep: "A", tipo: "adj" },
                          { nome: "Idêntico", prep: "A", tipo: "adj" },
                          { nome: "Nocivo", prep: "A", tipo: "adj" },
                          { nome: "Compatível", prep: "COM", tipo: "adj" },
                          { nome: "Contente", prep: "COM", tipo: "adj" },
                          { nome: "Satisfeito", prep: "COM", tipo: "adj" },
                          { nome: "Responsável", prep: "POR", tipo: "adj" },
                          { nome: "Ansioso", prep: "POR / PARA", tipo: "adj" },
                          { nome: "Versado", prep: "EM", tipo: "adj" },
                          { nome: "Perito", prep: "EM", tipo: "adj" },
                          { nome: "Amor", prep: "A / DE / POR", tipo: "subst" },
                          { nome: "Medo", prep: "DE", tipo: "subst" },
                          { nome: "Necessidade", prep: "DE", tipo: "subst" },
                          { nome: "Referência", prep: "A", tipo: "subst" },
                        ].map((item) => (
                          <div
                            key={item.nome}
                            className="flex items-center justify-between p-2 bg-slate-500/5 rounded-lg border border-slate-500/10"
                          >
                            <span className="font-bold">{item.nome}</span>
                            <span className={`text-xs px-1 rounded ${item.tipo === "adj" ? "bg-blue-500/20 text-blue-400" : "bg-emerald-500/20 text-emerald-400"}`}>
                              {item.tipo}
                            </span>
                            <span className="text-primary font-mono font-bold">{item.prep}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
                {
                  titulo: "Pronomes relativos com preposição: revisão final",
                  icone: <LuLink />,
                  conteudo: (
                    <div className="space-y-3 text-sm">
                      <p className="text-muted-foreground">
                        O mecanismo é simples: a preposição exigida pelo verbo
                        que segue o pronome relativo deve ser colocada
                        <strong> antes</strong> do pronome.
                      </p>
                      <div className="space-y-2 text-xs">
                        {[
                          { frase: "a norma a que me refiro", verb: "referir-se A" },
                          { frase: "o cargo a que aspiro", verb: "aspirar A" },
                          { frase: "o projeto de que dependo", verb: "depender DE" },
                          { frase: "a empresa em que confio", verb: "confiar EM" },
                          { frase: "a solução com que contamos", verb: "contar COM" },
                          { frase: "o gestor a quem obedecemos", verb: "obedecer A" },
                        ].map((item, i) => (
                          <div key={i} className="p-2 bg-indigo-500/5 rounded-lg border border-indigo-500/10 flex items-center justify-between">
                            <span className="italic">"{item.frase}"</span>
                            <span className="text-indigo-400 font-mono text-xs shrink-0 ml-2">({item.verb})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Estratégia Final de Prova"
              variant={getModuleVariant(10)}
            />
            <AlertBox tipo="info" titulo="Estratégia Definitiva para Gabaritar Regência">
              <strong>1. Identifique o verbo regente</strong> e pergunte:
              "Esse verbo exige preposição?"
              <br /><br />
              <strong>2. Se houver pronome relativo</strong> (que, quem, o qual),
              verifique o verbo APÓS o pronome e coloque a preposição ANTES.
              <br /><br />
              <strong>3. Para verbos bifrontes</strong> (assistir, aspirar, visar),
              identifique o SENTIDO usado antes de decidir a regência.
              <br /><br />
              <strong>4. Atenção ao IMPLICAR</strong>: no sentido de "causar",
              é sempre sem preposição (VTD).
              <br /><br />
              <strong>5. PREFERIR nunca usa "do que"</strong> — sempre
              "A": "prefiro X a Y".
            </AlertBox>
            <CardCarousel
              cards={[
                {
                  icone: "🎯",
                  title: "Passo 1: Identifique",
                  descricao: "Localize o verbo ou nome regente na frase antes de responder.",
                },
                {
                  icone: "🔍",
                  title: "Passo 2: Classifique",
                  descricao: "É transitivo direto ou indireto? O sentido muda a regência?",
                },
                {
                  icone: "⚡",
                  title: "Passo 3: Verifique o Relativo",
                  descricao: "Se houver pronome relativo, a preposição do verbo deve vir antes.",
                },
                {
                  icone: "🏆",
                  title: "Passo 4: Confirme",
                  descricao: "Substitua por lhe/o para confirmar a transitividade e marcar com segurança.",
                },
              ]}
            />
          </section>

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
              variant={getModuleVariant(10)}
              onComplete={(score) => handleModuleComplete("modulo-10", score)}
            />
          )}
        </div>
      </TabsContent>
    </AulaTemplate>
  );
}
