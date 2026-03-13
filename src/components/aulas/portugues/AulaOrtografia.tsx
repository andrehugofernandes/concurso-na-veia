"use client";

import { useState, useEffect, useCallback } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  LuBookOpen,
  LuLayers,
  LuZap,
  LuInfo,
  LuMusic,
  LuCirclePlay as LuPlayCircle,
  LuBrain,
  LuCheck,
  LuMessageCircle,
  LuTriangleAlert,
  LuSearch,
  LuTarget,
} from "react-icons/lu";
import {
  QuizQuestion,
  getRandomQuestions,
  AlertBox,
  VideoModal,
  QuizInterativo,
  ModuleBanner,
  StickyModuleNav,
  LessonTabs,
  MusicPlayerCard,
  ContentAccordion,
  ModuleDef,
  ProgressIndicator,
  ModuleSectionHeader,
  ModuleSummaryCarouselNew,
  AulaProps,
  AulaTemplate,
  FlipCard,
  CardCarousel,
} from "../shared";

import {
  QUIZ_MOD1_POOL,
  QUIZ_MOD2_POOL,
  QUIZ_MOD3_POOL,
  QUIZ_MOD4_POOL,
  QUIZ_MOD5_POOL,
  QUIZ_MOD6_POOL,
  QUIZ_MOD7_POOL,
  QUIZ_MOD8_POOL,
  QUIZ_MOD9_POOL,
  QUIZ_MOD10_POOL,
} from "./data/ortografia-quizzes";

const MODULE_DEFS: ModuleDef[] = [
  { id: "modulo-1", label: "Módulo 1", title: "Encontros Vocálicos" },
  { id: "modulo-2", label: "Módulo 2", title: "Acentuação Geral" },
  { id: "modulo-3", label: "Módulo 3", title: "Novo Acordo" },
  { id: "modulo-4", label: "Módulo 4", title: "Uso do Hífen" },
  { id: "modulo-5", label: "Módulo 5", title: "Dificuldades" },
  { id: "modulo-6", label: "Módulo 6", title: "Revisão Prática" },
  { id: "modulo-7", label: "Módulo 7", title: "Palavras Frequentes" },
  { id: "modulo-8", label: "Módulo 8", title: "Compostos e Hífen" },
  { id: "modulo-9", label: "Módulo 9", title: "Linguagem Técnica" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado Mestre" },
];

export default function AulaOrtografia({
  onComplete,
  isCompleted,
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

  // Perguntas do Quiz por módulo
  const [qMod1, setQMod1] = useState<QuizQuestion[]>([]);
  const [qMod2, setQMod2] = useState<QuizQuestion[]>([]);
  const [qMod3, setQMod3] = useState<QuizQuestion[]>([]);
  const [qMod4, setQMod4] = useState<QuizQuestion[]>([]);
  const [qMod5, setQMod5] = useState<QuizQuestion[]>([]);
  const [qMod6, setQMod6] = useState<QuizQuestion[]>([]);
  const [qMod7, setQMod7] = useState<QuizQuestion[]>([]);
  const [qMod8, setQMod8] = useState<QuizQuestion[]>([]);
  const [qMod9, setQMod9] = useState<QuizQuestion[]>([]);
  const [qMod10, setQMod10] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    setQMod1(getRandomQuestions(QUIZ_MOD1_POOL, 6));
    setQMod2(getRandomQuestions(QUIZ_MOD2_POOL, 6));
    setQMod3(getRandomQuestions(QUIZ_MOD3_POOL, 6));
    setQMod4(getRandomQuestions(QUIZ_MOD4_POOL, 6));
    setQMod5(getRandomQuestions(QUIZ_MOD5_POOL, 10));
    setQMod6(getRandomQuestions(QUIZ_MOD6_POOL, 8));
    setQMod7(getRandomQuestions(QUIZ_MOD7_POOL, 8));
    setQMod8(getRandomQuestions(QUIZ_MOD8_POOL, 8));
    setQMod9(getRandomQuestions(QUIZ_MOD9_POOL, 8));
    setQMod10(
      getRandomQuestions(
        [
          ...QUIZ_MOD1_POOL,
          ...QUIZ_MOD2_POOL,
          ...QUIZ_MOD3_POOL,
          ...QUIZ_MOD4_POOL,
          ...QUIZ_MOD5_POOL,
          ...QUIZ_MOD6_POOL,
          ...QUIZ_MOD7_POOL,
          ...QUIZ_MOD8_POOL,
          ...QUIZ_MOD9_POOL,
          ...QUIZ_MOD10_POOL,
        ],
        15,
      ),
    );
  }, []);

  const isModuleUnlocked = useCallback(
    (index: number) => {
      if (index === 0) return true;
      return completedModules.has(MODULE_DEFS[index - 1].id) || isCompleted;
    },
    [completedModules, isCompleted],
  );

  const handleModuleComplete = useCallback(
    (moduleId: string, score: number) => {
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
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          onComplete?.();
        }
      }
    },
    [completedModules, onComplete, onUpdateProgress],
  );

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
      loading={loading}
      xpGanho={xpGanho}
      currentProgress={currentProgress}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
      onComplete={onComplete}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* MÓDULO 1: ENCONTROS VOCÁLICOS */}
        <TabsContent value="modulo-1" className="space-y-[50px]">
          <ModuleBanner
            numero={1}
            titulo="Encontros Vocálicos"
            descricao="Domine a base da fonética: Ditongos, Tritongos e Hiatos na pronúncia correta."
            gradiente="bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-700"
          />

          <div className="space-y-[50px]">
            {/* Seção 1: Conceitos Fundamentais */}
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={1}
                title="Conceitos Fundamentais"
                description="Os pilares da fonética e os tipos de encontros entre sons vocálicos."
                variant="indigo"
              />

              <ContentAccordion
                titulo="🎯 Entendendo os Encontros Vocálicos"
                icone={<LuTarget className="w-6 h-6" />}
                corIndicador="bg-indigo-500"
                defaultOpen={true}
                slides={[
                  {
                    titulo: "O que são Encontros Vocálicos?",
                    icone: "🔤",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Encontros vocálicos são a reunião de duas ou mais vogais
                          (ou semivogais) na mesma palavra. Eles são essenciais para
                          entender a separação de sílabas e a colocação de acentos.
                          Na prova Cesgranrio, questões sobre encontros vocálicos
                          aparecem frequentemente em análise silábica.
                        </p>
                        <AlertBox tipo="info" titulo="Definição Chave">
                          Vogais: A, E, I, O, U | Semivogais: Y, W (ou I, U em
                          certos contextos)
                        </AlertBox>
                      </div>
                    ),
                  },
                  {
                    titulo: "Ditongo: A Dupla Inseparável",
                    icone: "👥",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Ditongo é quando uma <strong>vogal</strong> e uma
                          <strong>semivogal</strong> aparecem na mesma sílaba.
                          Eles NÃO se separam na silabação.
                        </p>
                        <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                          <p className="text-xs font-bold text-indigo-600 mb-2">
                            Ditongo Decrescente (V → SV):
                          </p>
                          <p className="text-sm">
                            Pai (pai), Lei (lei), Caixa (cai-xa)
                          </p>
                        </div>
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="text-xs font-bold text-blue-600 mb-2">
                            Ditongo Crescente (SV → V):
                          </p>
                          <p className="text-sm">
                            Glória (gló-ria), Série (sé-rie), Água (á-gua)
                          </p>
                        </div>
                      </div>
                    ),
                  },
                  {
                    titulo: "Tritongo: A Trinca Rara",
                    icone: "🎪",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Tritongo é quando <strong>semivogal + vogal + semivogal</strong>
                          aparecem na mesma sílaba. São raros, mas a Cesgranrio adora
                          cobrar!
                        </p>
                        <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20">
                          <p className="text-xs font-bold text-amber-600 mb-2">
                            Exemplos Clássicos:
                          </p>
                          <ul className="text-sm space-y-1">
                            <li>Paraguai (pa-ra-guai) → SV+V+SV</li>
                            <li>Saguão (sa-guão) → SV+V+SV</li>
                            <li>Quais (quais) → Uma única sílaba!</li>
                          </ul>
                        </div>
                      </div>
                    ),
                  },
                  {
                    titulo: "Hiato: A Separação Obrigatória",
                    icone: "⚡",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Hiato ocorre quando <strong>duas vogais</strong> aparecem
                          juntas, mas em sílabas <strong>diferentes</strong>. A
                          pronúncia deixa claro a separação.
                        </p>
                        <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/20">
                          <p className="text-xs font-bold text-rose-600 mb-2">
                            Exemplos com Acentuação:
                          </p>
                          <ul className="text-sm space-y-1">
                            <li>Saúde (sa-ú-de) → Acentua o U</li>
                            <li>Poesia (po-e-si-a) → Sem acento</li>
                            <li>Criação (cri-a-ção) → Ditongo ou Hiato?</li>
                          </ul>
                        </div>
                      </div>
                    ),
                  },
                ]}
              />
            </section>

            {/* Seção 2: FlipCard Grid dos Tipos */}
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={2}
                title="Memorização Visual"
                description="Cartões interativos para fixação dos tipos de encontros."
                variant="indigo"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <FlipCard
                  frente={
                    <div className="flex flex-col items-center justify-center text-center space-y-3 h-full">
                      <span className="text-5xl">🌊</span>
                      <h4 className="font-bold text-base">Ditongo Decrescente</h4>
                    </div>
                  }
                  verso={
                    <div className="flex flex-col justify-center h-full space-y-3 text-center p-3">
                      <p className="text-xs font-bold text-indigo-600">
                        Vogal + Semivogal
                      </p>
                      <p className="text-sm">Pai, Lei, Caixa, Pão</p>
                      <p className="text-[10px] text-muted-foreground">
                        Som vai caindo
                      </p>
                    </div>
                  }
                />
                <FlipCard
                  frente={
                    <div className="flex flex-col items-center justify-center text-center space-y-3 h-full">
                      <span className="text-5xl">📈</span>
                      <h4 className="font-bold text-base">Ditongo Crescente</h4>
                    </div>
                  }
                  verso={
                    <div className="flex flex-col justify-center h-full space-y-3 text-center p-3">
                      <p className="text-xs font-bold text-blue-600">
                        Semivogal + Vogal
                      </p>
                      <p className="text-sm">Glória, Série, Água</p>
                      <p className="text-[10px] text-muted-foreground">
                        Som vai subindo
                      </p>
                    </div>
                  }
                />
                <FlipCard
                  frente={
                    <div className="flex flex-col items-center justify-center text-center space-y-3 h-full">
                      <span className="text-5xl">🎪</span>
                      <h4 className="font-bold text-base">Tritongo</h4>
                    </div>
                  }
                  verso={
                    <div className="flex flex-col justify-center h-full space-y-3 text-center p-3">
                      <p className="text-xs font-bold text-amber-600">
                        SV + V + SV
                      </p>
                      <p className="text-sm">Paraguai, Saguão, Quais</p>
                      <p className="text-[10px] text-muted-foreground">
                        Raro, mas cai!
                      </p>
                    </div>
                  }
                />
                <FlipCard
                  frente={
                    <div className="flex flex-col items-center justify-center text-center space-y-3 h-full">
                      <span className="text-5xl">⚡</span>
                      <h4 className="font-bold text-base">Hiato</h4>
                    </div>
                  }
                  verso={
                    <div className="flex flex-col justify-center h-full space-y-3 text-center p-3">
                      <p className="text-xs font-bold text-rose-600">
                        Vogal + Vogal (separadas)
                      </p>
                      <p className="text-sm">Saúde, Poesia, Heroísmo</p>
                      <p className="text-[10px] text-muted-foreground">
                        Sílabas diferentes!
                      </p>
                    </div>
                  }
                />
              </div>
            </section>

            {/* Seção 3: Exemplos Práticos */}
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={3}
                title="Exemplos Práticos"
                description="Casos reais que aparecem em provas Cesgranrio."
                variant="indigo"
              />

              <CardCarousel
                cards={[
                  {
                    title: "Ditongo x Hiato: Dia vs. Dia",
                    descricao:
                      "Dia = ditongo (dia). Dia separado = di-a (hiato). Contexto define!",
                    icone: "🔄",
                  },
                  {
                    title: "Acentuação em Hiatos",
                    descricao:
                      "Quando I ou U é tônico em hiato: saúde, baú, criação.",
                    icone: "✍️",
                  },
                  {
                    title: "Tritongos Raríssimos",
                    descricao:
                      "Paraguai, Saguão, Enxaguei. Identifique SV+V+SV na mesma sílaba!",
                    icone: "🎯",
                  },
                  {
                    title: "Vogais Dobradas",
                    descricao:
                      "OO e EE formam HIATO agora (Voo, Leem) após Novo Acordo.",
                    icone: "📖",
                  },
                ]}
              />
            </section>

            {/* Seção 4: Pegadinha Cesgranrio */}
            <section className="space-y-4">
              <AlertBox tipo="warning" titulo="⚠️ Pegadinha Cesgranrio">
                A palavra "poesia" é <strong>po-e-sia</strong> (3 vogais, 2
                hiatos) ou <strong>po-e-si-a</strong> (4 sílabas)? Na análise
                clássica é hiato duplo! Mas em algumas regiões dialetais pode
                ser pronunciada com ditongo. A banca sempre cobrou como hiato.
              </AlertBox>

              <AlertBox tipo="info" titulo="💡 Dica: Como Não Errar">
                Pronuncie a palavra LENTAMENTE sílaba por sílaba. Se a vogal
                muda de "timbre" (som), provavelmente é hiato. Se o som é único
                e fluido, é ditongo.
              </AlertBox>
            </section>

            {/* Seção 5: Resumo Visual */}
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={4}
                title="Resumo Visual do Módulo"
                description="Consolidação visual dos encontros vocálicos."
                variant="indigo"
              />

              <LessonTabs
                tabs={[
                  {
                    id: "resumo",
                    label: "Resumo Visual",
                    icon: LuBookOpen,
                    content: (
                      <ModuleSummaryCarouselNew
                        moduloNome="Módulo 1"
                        tituloAula="Ortografia"
                        materia="Língua Portuguesa"
                        images={[
                          {
                            title: "Mapa Mental: Encontros Vocálicos",
                            type: "Mapa Mental",
                            placeholderColor:
                              "bg-indigo-100 dark:bg-indigo-900/30",
                          },
                          {
                            title: "Tabela Comparativa",
                            type: "Tabela",
                            placeholderColor: "bg-blue-100 dark:bg-blue-900/30",
                          },
                        ]}
                      />
                    ),
                  },
                ]}
              />
            </section>

            {/* Quiz do Módulo 1 */}
            <QuizInterativo
              numero={1}
              titulo="Encontros Vocálicos"
              icone="🎯"
              questoes={qMod1}
              onComplete={(score) => handleModuleComplete("modulo-1", score)}
              variant="indigo"
            />
          </div>
        </TabsContent>

        {/* MÓDULO 2: ACENTUAÇÃO GERAL */}
        <TabsContent value="modulo-2" className="space-y-[50px]">
          <ModuleBanner
            numero={2}
            titulo="Acentuação Geral"
            descricao="Domine a lógica das Oxítonas, Paroxítonas e Proparoxítonas sem decoreba."
            gradiente="bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-700"
          />

          <div className="space-y-[50px]">
            {/* Seção 1: A Regra de Ouro */}
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={1}
                title="A Regra de Ouro da Acentuação"
                description="O sistema de classificação por sílaba tônica."
                variant="indigo"
              />

              <ContentAccordion
                titulo="🎓 Classificação Tônica"
                icone={<LuBookOpen className="w-6 h-6" />}
                corIndicador="bg-indigo-500"
                defaultOpen={true}
                slides={[
                  {
                    titulo: "Oxítonas (tônica na última)",
                    icone: "🎯",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          A última sílaba é a tônica. Acentuam-se as terminadas
                          em: <strong>A, E, O, em (ém), ens</strong>.
                        </p>
                        <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                          <p className="font-bold text-sm mb-2">Exemplos:</p>
                          <ul className="text-sm space-y-1">
                            <li>Café (caf-é) ✓</li>
                            <li>Armazém (ar-ma-zém) ✓</li>
                            <li>Você (vo-cê) ✓</li>
                            <li>Também (tam-bém) ✓</li>
                          </ul>
                        </div>
                      </div>
                    ),
                  },
                  {
                    titulo: "Paroxítonas (tônica na penúltima)",
                    icone: "👑",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          A penúltima sílaba é a tônica. <strong>TODAS</strong>
                          as paroxítonas recebem acento! Não há exceção!
                        </p>
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="font-bold text-sm mb-2">Exemplos:</p>
                          <ul className="text-sm space-y-1">
                            <li>Piscina (pis-ci-na) ✓</li>
                            <li>História (his-tó-ria) ✓</li>
                            <li>Lápis (lá-pis) ✓</li>
                            <li>Médico (mé-di-co) ✓</li>
                          </ul>
                        </div>
                        <AlertBox tipo="warning" titulo="Regra de Ouro">
                          Paroxítona = SEMPRE ACENTUADA. Não perca essa!
                        </AlertBox>
                      </div>
                    ),
                  },
                  {
                    titulo: "Proparoxítonas (tônica antes da penúltima)",
                    icone: "🏆",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          A antepenúltima sílaba (ou anterior) é a tônica.
                          <strong>100% acentuadas!</strong> Sem exceção!
                        </p>
                        <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/20">
                          <p className="font-bold text-sm mb-2">Exemplos:</p>
                          <ul className="text-sm space-y-1">
                            <li>Árvore (ár-vo-re) ✓</li>
                            <li>Pássaro (pás-sa-ro) ✓</li>
                            <li>Magnífico (mag-ní-fi-co) ✓</li>
                            <li>Ínfimo (ín-fi-mo) ✓</li>
                          </ul>
                        </div>
                      </div>
                    ),
                  },
                  {
                    titulo: "Monossílabos Tônicos",
                    icone: "🔤",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Palavras com uma única sílaba que é tônica.
                          Acentuam-se os terminados em: <strong>A, E, O</strong>
                          (seguidos ou não de S).
                        </p>
                        <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20">
                          <p className="font-bold text-sm mb-2">Exemplos:</p>
                          <ul className="text-sm space-y-1">
                            <li>Pá, Pás ✓</li>
                            <li>Pé, Pés ✓</li>
                            <li>Pó, Pós ✓</li>
                            <li>Já ✓ / Mas ✗</li>
                          </ul>
                        </div>
                      </div>
                    ),
                  },
                ]}
              />
            </section>

            {/* Seção 2: FlipCard Grid */}
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={2}
                title="Memorização Prática"
                description="Classificação rápida de palavras por tonicidade."
                variant="indigo"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <FlipCard
                  frente={
                    <div className="flex flex-col items-center justify-center text-center space-y-3 h-full">
                      <span className="text-4xl">🎯</span>
                      <h4 className="font-bold text-sm">Oxítona</h4>
                    </div>
                  }
                  verso={
                    <div className="flex flex-col justify-center h-full space-y-2 text-center p-3">
                      <p className="text-xs font-bold">Última = Tônica</p>
                      <p className="text-xs">Café, Você, Também</p>
                      <p className="text-[10px] font-semibold text-indigo-600">
                        Termina em A, E, O, em, ens
                      </p>
                    </div>
                  }
                />
                <FlipCard
                  frente={
                    <div className="flex flex-col items-center justify-center text-center space-y-3 h-full">
                      <span className="text-4xl">👑</span>
                      <h4 className="font-bold text-sm">Paroxítona</h4>
                    </div>
                  }
                  verso={
                    <div className="flex flex-col justify-center h-full space-y-2 text-center p-3">
                      <p className="text-xs font-bold">Penúltima = Tônica</p>
                      <p className="text-xs">Lápis, História, Médico</p>
                      <p className="text-[10px] font-semibold text-blue-600">
                        SEMPRE ACENTUADA!
                      </p>
                    </div>
                  }
                />
                <FlipCard
                  frente={
                    <div className="flex flex-col items-center justify-center text-center space-y-3 h-full">
                      <span className="text-4xl">🏆</span>
                      <h4 className="font-bold text-sm">Proparoxítona</h4>
                    </div>
                  }
                  verso={
                    <div className="flex flex-col justify-center h-full space-y-2 text-center p-3">
                      <p className="text-xs font-bold">Antepenúltima = Tônica</p>
                      <p className="text-xs">Árvore, Pássaro, Ínfimo</p>
                      <p className="text-[10px] font-semibold text-rose-600">
                        100% ACENTUADAS!
                      </p>
                    </div>
                  }
                />
                <FlipCard
                  frente={
                    <div className="flex flex-col items-center justify-center text-center space-y-3 h-full">
                      <span className="text-4xl">1️⃣</span>
                      <h4 className="font-bold text-sm">Monossílabo</h4>
                    </div>
                  }
                  verso={
                    <div className="flex flex-col justify-center h-full space-y-2 text-center p-3">
                      <p className="text-xs font-bold">Uma Sílaba Tônica</p>
                      <p className="text-xs">Pá, Pé, Pó, Já</p>
                      <p className="text-[10px] font-semibold text-amber-600">
                        A, E, O (com/sem S)
                      </p>
                    </div>
                  }
                />
              </div>
            </section>

            {/* Seção 3: Exceções Importantes */}
            <section className="space-y-4">
              <AlertBox tipo="warning" titulo="⚠️ Acentos Diferenciais (Preservados)">
                Pôr (verbo) vs. Por (preposição) | Pôde (passado) vs. Pode
                (presente) | Côa (peneira) vs. Coa | Dêmos (subj.) vs. Demos
                (passado)
              </AlertBox>

              <AlertBox tipo="info" titulo="💡 Dica: Novo Acordo">
                Desapareceram os acentos em "oo" e "ee": Voo, Leem, Veem.
                Mas em ditongos abertos "ei" e "oi" nas paroxítonas: Ideia,
                Jiboia (sem acento agora).
              </AlertBox>
            </section>

            {/* Seção 4: Carousel com Palavras */}
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={3}
                title="Comparação de Casos"
                description="Veja palavras similares com regras diferentes."
                variant="indigo"
              />

              <CardCarousel
                cards={[
                  {
                    title: "Monosílabos vs. Oxítonas",
                    descricao:
                      "Pé (monossílabo) vs. Café (oxítona). Ambos terminam em E!",
                    icone: "🔄",
                  },
                  {
                    title: "Paroxítona: Regra Universal",
                    descricao:
                      "Independente da terminação: Lápis, Ônibus, Táxi, Bíceps.",
                    icone: "✓",
                  },
                  {
                    title: "Proparoxítona: 100%",
                    descricao:
                      "Não existe proparoxítona sem acento. Sempre acentuada!",
                    icone: "👑",
                  },
                  {
                    title: "Acentos Diferenciais",
                    descricao:
                      "Pôr vs. Por | Pôde vs. Pode. Muito cobrado!",
                    icone: "⚡",
                  },
                ]}
              />
            </section>

            {/* Quiz do Módulo 2 */}
            <QuizInterativo
              numero={2}
              titulo="Acentuação Geral"
              icone="✍️"
              questoes={qMod2}
              onComplete={(score) => handleModuleComplete("modulo-2", score)}
              variant="indigo"
            />
          </div>
        </TabsContent>

        {/* MÓDULO 3: NOVO ACORDO ORTOGRÁFICO */}
        <TabsContent value="modulo-3" className="space-y-[50px]">
          <ModuleBanner
            numero={3}
            titulo="Novo Acordo Ortográfico"
            descricao="O que caiu, o que ficou e o que a Cesgranrio adora cobrar."
            gradiente="bg-gradient-to-br from-teal-600 via-emerald-600 to-teal-700"
          />
          <div className="space-y-[50px]">
            {/* Seção 1: Mudanças Principais */}
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={1}
                title="Principais Mudanças (2009)"
                description="O que seu português perdeu e conquistou."
                variant="emerald"
              />

              <ContentAccordion
                titulo="📖 Reformas do Novo Acordo"
                icone={<LuBookOpen className="w-6 h-6" />}
                corIndicador="bg-emerald-500"
                defaultOpen={true}
                slides={[
                  {
                    titulo: "Desaparição do Trema",
                    icone: "💎",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          O trema (¨) foi completamente extinto, exceto em nomes
                          próprios estrangeiros e seus derivados.
                        </p>
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="font-bold text-sm mb-2">Antes → Depois:</p>
                          <ul className="text-sm space-y-1">
                            <li>Aüência → Auência ✗</li>
                            <li>Qüestão → Questão ✓</li>
                            <li>Lingüeta → Lingueta ✓</li>
                          </ul>
                        </div>
                        <AlertBox tipo="info" titulo="Exceção">
                          Müller (alemão) mantém o trema porque é nome estrangeiro!
                        </AlertBox>
                      </div>
                    ),
                  },
                  {
                    titulo: "Dupla OO e EE (Sem Acento)",
                    icone: "📝",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Palavras com as terminações "-OO" e "-EE" perderam o
                          acento. Agora são consideradas hiatos!
                        </p>
                        <div className="p-4 bg-teal-500/5 rounded-xl border border-teal-500/20">
                          <p className="font-bold text-sm mb-2">Antes → Depois:</p>
                          <ul className="text-sm space-y-1">
                            <li>Vôo → Voo ✓</li>
                            <li>Crêem → Creem ✓</li>
                            <li>Lêem → Leem ✓</li>
                            <li>Vêem → Veem ✓</li>
                          </ul>
                        </div>
                      </div>
                    ),
                  },
                  {
                    titulo: "Ditongos Abertos em Paroxítonas",
                    icone: "📊",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Os ditongos abertos "-EI" e "-OI" nas paroxítonas
                          perderam o acento. Oxítonas e monossílabos mantêm!
                        </p>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="font-bold text-sm mb-2">Antes → Depois:</p>
                          <ul className="text-sm space-y-1">
                            <li>Idéia → Ideia ✓</li>
                            <li>Jibóia → Jiboia ✓</li>
                            <li>Assembléia → Assembleia ✓</li>
                            <li>MAS: Herói (paroxítona, MAS proparoxítona)
                            = Heroísmo</li>
                          </ul>
                        </div>
                      </div>
                    ),
                  },
                  {
                    titulo: "Hífen: Regra dos Opostos",
                    icone: "🔗",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Se a última letra do prefixo e a primeira da palavra
                          são iguais, usa-se hífen. Se são diferentes, não usa.
                        </p>
                        <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/20">
                          <p className="font-bold text-sm mb-2">Iguais (Hífen):</p>
                          <ul className="text-sm space-y-1">
                            <li>Anti + inflamatório = Anti-inflamatório ✓</li>
                            <li>Micro + onda = Micro-onda ✓</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-green-500/5 rounded-xl border border-green-500/20">
                          <p className="font-bold text-sm mb-2">Diferentes (Junto):</p>
                          <ul className="text-sm space-y-1">
                            <li>Auto + escola = Autoescola ✓</li>
                            <li>Infra + estrutura = Infraestrutura ✓</li>
                          </ul>
                        </div>
                      </div>
                    ),
                  },
                ]}
              />
            </section>

            {/* Seção 2: FlipCard Comparativo */}
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={2}
                title="Antes vs. Depois"
                description="Visualize as mudanças lado a lado."
                variant="emerald"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FlipCard
                  frente={
                    <div className="flex flex-col items-center justify-center text-center space-y-3 h-full">
                      <span className="text-5xl">❌</span>
                      <h4 className="font-bold text-sm">Não Existe Mais</h4>
                    </div>
                  }
                  verso={
                    <div className="flex flex-col justify-center h-full space-y-2 text-center p-3">
                      <ul className="text-xs space-y-1">
                        <li>Trema (¨)</li>
                        <li>Acento em OO, EE</li>
                        <li>Acento em EI/OI paroxítonas</li>
                        <li>Alguns hífens antigos</li>
                      </ul>
                    </div>
                  }
                />
                <FlipCard
                  frente={
                    <div className="flex flex-col items-center justify-center text-center space-y-3 h-full">
                      <span className="text-5xl">✅</span>
                      <h4 className="font-bold text-sm">Sobreviveu</h4>
                    </div>
                  }
                  verso={
                    <div className="flex flex-col justify-center h-full space-y-2 text-center p-3">
                      <ul className="text-xs space-y-1">
                        <li>Acentos diferenciais</li>
                        <li>Paroxítonas (100%)</li>
                        <li>Proparoxítonas (100%)</li>
                        <li>Hífen em iguais</li>
                      </ul>
                    </div>
                  }
                />
              </div>
            </section>

            {/* Seção 3: Pegadinhas */}
            <section className="space-y-4">
              <AlertBox tipo="warning" titulo="⚠️ Pegadinha Cesgranrio">
                A banca ADORA questões de ditongos abertos em paroxítonas!
                Ideia, Jiboia, Assembleia sem acento agora. Mas se for
                proparoxítona (Heroísmo), volta o acento!
              </AlertBox>

              <AlertBox tipo="danger" titulo="❌ Erro Comum">
                Escrever "Crêem" ou "Lêem" com acento. Errado! São "Creem"
                e "Leem" agora. O EE formou hiato e perdeu o acento.
              </AlertBox>
            </section>

            {/* Quiz do Módulo 3 */}
            <QuizInterativo
              numero={3}
              titulo="Novo Acordo Ortográfico"
              icone="🆕"
              questoes={qMod3}
              onComplete={(score) => handleModuleComplete("modulo-3", score)}
              variant="emerald"
            />
          </div>
        </TabsContent>

        {/* MÓDULO 4: USO DO HÍFEN */}
        <TabsContent value="modulo-4" className="space-y-[50px]">
          <ModuleBanner
            numero={4}
            titulo="Uso do Hífen"
            descricao="A regra dos opostos: iguais repelem, diferentes atraem."
            gradiente="bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700"
          />
          <div className="space-y-[50px]">
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={1}
                title="A Regra dos Polos"
                description="Iguais usam hífen, diferentes não."
                variant="amber"
              />

              <ContentAccordion
                titulo="🔗 Regras de Hífen"
                icone={<LuBookOpen className="w-6 h-6" />}
                corIndicador="bg-amber-500"
                defaultOpen={true}
                slides={[
                  {
                    titulo: "Prefixos com Letras Iguais",
                    icone: "=",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Quando a última letra do prefixo é igual à primeira
                          da palavra, usa-se HÍFEN obrigatoriamente.
                        </p>
                        <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20">
                          <p className="font-bold text-sm mb-2">Exemplos:</p>
                          <ul className="text-sm space-y-1">
                            <li>Anti + inflamatório = Anti-inflamatório</li>
                            <li>Micro + onda = Micro-onda</li>
                            <li>Semi + irmã = Semi-irmã</li>
                            <li>Contra + almirante = Contra-almirante</li>
                          </ul>
                        </div>
                      </div>
                    ),
                  },
                  {
                    titulo: "Prefixos com Letras Diferentes",
                    icone: "≠",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Quando são diferentes, a palavra é escrita JUNTO
                          (sem hífen).
                        </p>
                        <div className="p-4 bg-orange-500/5 rounded-xl border border-orange-500/20">
                          <p className="font-bold text-sm mb-2">Exemplos:</p>
                          <ul className="text-sm space-y-1">
                            <li>Auto + escola = Autoescola</li>
                            <li>Infra + estrutura = Infraestrutura</li>
                            <li>Inter + urbano = Interurbano</li>
                            <li>Pré + acordo = Pré-acordo (MAS aguarde)</li>
                          </ul>
                        </div>
                      </div>
                    ),
                  },
                  {
                    titulo: "Exceções Importantes",
                    icone: "⚠️",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Alguns prefixos SEMPRE usam hífen, independente da
                          regra dos opostos.
                        </p>
                        <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/20">
                          <p className="font-bold text-sm mb-2">Prefixos sempre com hífen:</p>
                          <ul className="text-sm space-y-1">
                            <li><strong>Pré</strong>: Pré-escolar, Pré-histórico</li>
                            <li><strong>Pró</strong>: Pró-reitor</li>
                            <li><strong>Pós</strong>: Pós-guerra</li>
                            <li><strong>Vice</strong>: Vice-presidente</li>
                            <li><strong>Co</strong>: Co-autor (MAS as vezes junto)</li>
                          </ul>
                        </div>
                      </div>
                    ),
                  },
                  {
                    titulo: "Palavras Compostas (Sem Prefixo)",
                    icone: "🚀",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Palavras compostas tradicionais usam hífen quando
                          formam um conceito único.
                        </p>
                        <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                          <p className="font-bold text-sm mb-2">Exemplos:</p>
                          <ul className="text-sm space-y-1">
                            <li>Guarda-chuva (não é guarda + chuva separado)</li>
                            <li>Beija-flor</li>
                            <li>Tamanho-padrão</li>
                            <li>Obra-prima</li>
                          </ul>
                        </div>
                      </div>
                    ),
                  },
                ]}
              />
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AlertBox tipo="warning" titulo="⚠️ Regra de Ouro">
                <strong>Iguais = Hífen | Diferentes = Junto</strong>. Exemplo:
                Anti-inflamatório (A+I) vs. Autoescola (O+E).
              </AlertBox>
              <AlertBox tipo="info" titulo="💡 Dica">
                Se a banca der uma palavra com prefixo desconhecido, aplique a
                regra dos opostos. É infalível!
              </AlertBox>
            </div>

            <QuizInterativo
              numero={4}
              titulo="Uso do Hífen"
              icone="🔗"
              questoes={qMod4}
              onComplete={(score) => handleModuleComplete("modulo-4", score)}
              variant="amber"
            />
          </div>
        </TabsContent>

        {/* MÓDULO 5: DIFICULDADES ORTOGRÁFICAS */}
        <TabsContent value="modulo-5" className="space-y-[50px]">
          <ModuleBanner
            numero={5}
            titulo="Dificuldades Ortográficas Comuns"
            descricao="Porquês, Onde vs. Aonde, Mau vs. Mal e outros traumas ortográficos."
            gradiente="bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700"
          />
          <div className="space-y-[50px]">
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={1}
                title="Os Maiores Vilões"
                description="Palavras que confundem até falantes nativos."
                variant="rose"
              />

              <ContentAccordion
                titulo="🎯 Dúvidas Frequentes"
                icone={<LuTarget className="w-6 h-6" />}
                corIndicador="bg-rose-500"
                defaultOpen={true}
                slides={[
                  {
                    titulo: "Os Porquês",
                    icone: "❓",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Quatro formas diferentes que a banca ADORA cobrar!
                        </p>
                        <div className="p-3 bg-rose-500/5 rounded-xl border border-rose-500/20">
                          <p className="text-xs font-bold text-rose-600 mb-2">
                            1. POR QUÊ (2 palavras):
                          </p>
                          <p className="text-xs">Pronuncia "por-ké". Usa em fim de
                          frase: "Por quê?" (pergunta)</p>
                        </div>
                        <div className="p-3 bg-pink-500/5 rounded-xl border border-pink-500/20">
                          <p className="text-xs font-bold text-pink-600 mb-2">
                            2. PORQUE (junto):
                          </p>
                          <p className="text-xs">Porque é uma conjunção, usa em
                          respostas: "Fiz porque quis"</p>
                        </div>
                        <div className="p-3 bg-fuchsia-500/5 rounded-xl border border-fuchsia-500/20">
                          <p className="text-xs font-bold text-fuchsia-600 mb-2">
                            3. POR QUE (2 palavras):
                          </p>
                          <p className="text-xs">Sem acento. Usa em perguntas no meio
                          da frase: "Por que você saiu?"</p>
                        </div>
                        <div className="p-3 bg-violet-500/5 rounded-xl border border-violet-500/20">
                          <p className="text-xs font-bold text-violet-600 mb-2">
                            4. PORQUÊ (1 palavra):
                          </p>
                          <p className="text-xs">Substantivo. "Qual é o porquê?" = "Qual
                          é a razão?"</p>
                        </div>
                      </div>
                    ),
                  },
                  {
                    titulo: "Onde vs. Aonde",
                    icone: "📍",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          A diferença é semântica e muita gente erra!
                        </p>
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="font-bold text-sm mb-2">ONDE (repouso):</p>
                          <p className="text-sm">Indica localização, permanência.
                          "Onde você mora?" = "Em qual lugar?"</p>
                          <p className="text-[10px] text-muted-foreground mt-2">
                            → Não indica movimento!
                          </p>
                        </div>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="font-bold text-sm mb-2">AONDE (movimento):</p>
                          <p className="text-sm">Indica movimento, destinação.
                          "Aonde você vai?" = "Para qual lugar?"</p>
                          <p className="text-[10px] text-muted-foreground mt-2">
                            → Sempre com verbo de movimento (ir, vir, etc.)!
                          </p>
                        </div>
                        <AlertBox tipo="warning" titulo="Dica de Ouro">
                          Se cabe "lá" ou "ali" na resposta, é ONDE. Se cabe
                          "para lá", é AONDE.
                        </AlertBox>
                      </div>
                    ),
                  },
                  {
                    titulo: "Mau vs. Mal",
                    icone: "😈",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Simples: MAU é adjetivo, MAL é advérbio/substantivo.
                        </p>
                        <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/20">
                          <p className="font-bold text-sm mb-2">MAU (adjetivo):</p>
                          <ul className="text-sm space-y-1">
                            <li>Um mau professor (qualidade negativa)</li>
                            <li>Dia mau (adjetivando "dia")</li>
                            <li>Mau comportamento</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-orange-500/5 rounded-xl border border-orange-500/20">
                          <p className="font-bold text-sm mb-2">MAL (advérbio/substantivo):</p>
                          <ul className="text-sm space-y-1">
                            <li>Ele canta mal (modificando verbo = advérbio)</li>
                            <li>Sentir mal (substantivo: malefício, doença)</li>
                            <li>Mal-estar (substantivo composto)</li>
                          </ul>
                        </div>
                      </div>
                    ),
                  },
                  {
                    titulo: "A Mais vs. Demais",
                    icone: "📊",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Sutileza que a banca adora!
                        </p>
                        <div className="p-4 bg-blue-500/5 rounded-xl border border-blue-500/20">
                          <p className="font-bold text-sm mb-2">A MAIS (2 palavras):</p>
                          <p className="text-sm">Preposição A + MAIS. "Uma xícara a mais"
                          = algo adicional</p>
                        </div>
                        <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                          <p className="font-bold text-sm mb-2">DEMAIS (1 palavra):</p>
                          <p className="text-sm">Advérbio. "Você fala demais" = excessivamente</p>
                        </div>
                      </div>
                    ),
                  },
                ]}
              />
            </section>

            {/* Seção 2: FlipCard Grid com Memorização */}
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={2}
                title="Memorização Visual"
                description="Cartões interativos para fixar as diferenças."
                variant="rose"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <FlipCard
                  frente={
                    <div className="flex flex-col items-center justify-center text-center space-y-3 h-full">
                      <span className="text-4xl">❓</span>
                      <h4 className="font-bold">Por Quê?</h4>
                    </div>
                  }
                  verso={
                    <div className="flex flex-col justify-center h-full space-y-2 p-3">
                      <p className="text-xs font-bold text-rose-600">
                        FIM DE FRASE
                      </p>
                      <p className="text-[10px]">
                        "Você saiu? Por quê?"
                      </p>
                      <p className="text-[9px] text-muted-foreground">
                        Sempre com acento e separado
                      </p>
                    </div>
                  }
                />
                <FlipCard
                  frente={
                    <div className="flex flex-col items-center justify-center text-center space-y-3 h-full">
                      <span className="text-4xl">🔗</span>
                      <h4 className="font-bold">Porque</h4>
                    </div>
                  }
                  verso={
                    <div className="flex flex-col justify-center h-full space-y-2 p-3">
                      <p className="text-xs font-bold text-pink-600">
                        RESPOSTA
                      </p>
                      <p className="text-[10px]">
                        "Porque quis sair"
                      </p>
                      <p className="text-[9px] text-muted-foreground">
                        Conjunção de causa
                      </p>
                    </div>
                  }
                />
                <FlipCard
                  frente={
                    <div className="flex flex-col items-center justify-center text-center space-y-3 h-full">
                      <span className="text-4xl">📍</span>
                      <h4 className="font-bold">Onde</h4>
                    </div>
                  }
                  verso={
                    <div className="flex flex-col justify-center h-full space-y-2 p-3">
                      <p className="text-xs font-bold text-emerald-600">
                        SEM MOVIMENTO
                      </p>
                      <p className="text-[10px]">
                        "Onde você mora?"
                      </p>
                      <p className="text-[9px] text-muted-foreground">
                        Repouso, localização
                      </p>
                    </div>
                  }
                />
                <FlipCard
                  frente={
                    <div className="flex flex-col items-center justify-center text-center space-y-3 h-full">
                      <span className="text-4xl">🚀</span>
                      <h4 className="font-bold">Aonde</h4>
                    </div>
                  }
                  verso={
                    <div className="flex flex-col justify-center h-full space-y-2 p-3">
                      <p className="text-xs font-bold text-cyan-600">
                        COM MOVIMENTO
                      </p>
                      <p className="text-[10px]">
                        "Aonde você vai?"
                      </p>
                      <p className="text-[9px] text-muted-foreground">
                        Verbo de movimento
                      </p>
                    </div>
                  }
                />
              </div>
            </section>

            {/* Seção 3: Exemplos Práticos */}
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={3}
                title="Casos Reais Cesgranrio"
                description="Questões que exploram essas dificuldades."
                variant="rose"
              />

              <CardCarousel
                cards={[
                  {
                    title: "Questão Tipo: Os Porquês",
                    descricao:
                      "Complete: '____ você não veio? Porque ____ chover. Qual alternativa completa corretamente?'",
                    icone: "❓",
                  },
                  {
                    title: "Questão Tipo: Onde x Aonde",
                    descricao:
                      "'____ você foi? Para ____ os turistas viajaram?' Identifique os erros.",
                    icone: "📍",
                  },
                  {
                    title: "Questão Tipo: Mau x Mal",
                    descricao:
                      "'O ____ desempenho foi uma ____ influência para o projeto.' Preencha corretamente.",
                    icone: "😈",
                  },
                  {
                    title: "Questão Tipo: A Mais x Demais",
                    descricao:
                      "'Você pediu uma xícara ____ . Fala ____ sobre isso.' Qual está errada?",
                    icone: "📊",
                  },
                ]}
              />
            </section>

            {/* Seção 4: Pegadinha Extra */}
            <section className="space-y-4">
              <AlertBox tipo="warning" titulo="⚠️ Pegadinha Premium">
                A banca combina várias dificuldades em UMA única questão! Ex: "Por que você foi aonde? Porque tinha mau hálito..." Leia com CUIDADO cada palavra!
              </AlertBox>

              <AlertBox tipo="success" titulo="✅ Macete Ouro">
                Quando em dúvida: releia a frase com cada opção. Aquela que "soa" melhor para um falante nativo é geralmente a correta.
              </AlertBox>
            </section>

            <QuizInterativo
              numero={5}
              titulo="Dificuldades Ortográficas"
              icone="🧐"
              questoes={qMod5}
              onComplete={(score) => handleModuleComplete("modulo-5", score)}
              variant="rose"
            />
          </div>
        </TabsContent>

        {/* MÓDULO 6: REVISÃO PRÁTICA */}
        <TabsContent value="modulo-6" className="space-y-[50px]">
          <ModuleBanner
            numero={6}
            titulo="Revisão Prática"
            descricao="Consolidando os conhecimentos adquiridos nos módulos anteriores."
            gradiente="bg-gradient-to-br from-cyan-600 via-blue-500 to-blue-700"
          />
          <div className="space-y-[50px]">
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={1}
                title="Teste seus Conhecimentos"
                description="Questões que integram tudo que aprendemos."
                variant="cyan"
              />

              <AlertBox tipo="info" titulo="💡 Como Usar Este Módulo">
                Este é um módulo de fixação. As questões cobrem todos os tópicos
                anteriores (Encontros, Acentuação, Novo Acordo, Hífen, Dificuldades).
                Se errar, volte ao módulo respectivo e revise!
              </AlertBox>
            </section>

            <QuizInterativo
              numero={6}
              titulo="Revisão Interativa"
              icone="🔄"
              questoes={qMod6}
              onComplete={(score) => handleModuleComplete("modulo-6", score)}
              variant="cyan"
            />
          </div>
        </TabsContent>

        {/* MÓDULO 7: PALAVRAS FREQUENTES EM PROVAS */}
        <TabsContent value="modulo-7" className="space-y-[50px]">
          <ModuleBanner
            numero={7}
            titulo="Palavras Frequentes em Provas Cesgranrio"
            descricao="Ortografia de termos que sempre caem em concursos."
            gradiente="bg-gradient-to-br from-teal-600 via-emerald-500 to-teal-700"
          />
          <div className="space-y-[50px]">
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={1}
                title="Banco de Palavras Críticas"
                description="Termos frequentemente cobrados em provas."
                variant="teal"
              />

              <ContentAccordion
                titulo="📚 Palavras-Chave por Categoria"
                icone={<LuBookOpen className="w-6 h-6" />}
                corIndicador="bg-teal-500"
                defaultOpen={true}
                slides={[
                  {
                    titulo: "Palavras com G ou J",
                    icone: "🔤",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Muita confusão entre G e J. Aqui estão as corretas!
                        </p>
                        <div className="p-4 bg-teal-500/5 rounded-xl border border-teal-500/20">
                          <p className="font-bold text-sm mb-2">Com G:</p>
                          <ul className="text-sm space-y-1">
                            <li>Jogo, Janela, Jangada, Laranja</li>
                            <li>Página, Bagagem, Garagem</li>
                            <li>Gelo, Geral, Gitano, Gigante</li>
                            <li>Guardar, Guarda, Guia</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="font-bold text-sm mb-2">Com J:</p>
                          <ul className="text-sm space-y-1">
                            <li>Jogo, Jamais, Jazida, Jóia</li>
                            <li>Majestade, Adjetivo, Projeto</li>
                            <li>Jesuíta, Jequitibá</li>
                          </ul>
                        </div>
                      </div>
                    ),
                  },
                  {
                    titulo: "Palavras com SS, SC, SÇ ou XC",
                    icone: "✂️",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Sons "ç" ou "ss" variam de escrita!
                        </p>
                        <div className="p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                          <p className="font-bold text-sm mb-2">Palavras Comuns:</p>
                          <ul className="text-sm space-y-1">
                            <li>Acesso, Assessor, Assento, Casse</li>
                            <li>Ascensão, Fase, Análise, Síntese</li>
                            <li>Exceção, Excelente, Excesso</li>
                            <li>Consciência, Descender</li>
                          </ul>
                        </div>
                      </div>
                    ),
                  },
                  {
                    titulo: "Palavras com Z ou S",
                    icone: "⚡",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Sons semelhantes, ortografias diferentes!
                        </p>
                        <div className="p-4 bg-violet-500/5 rounded-xl border border-violet-500/20">
                          <p className="font-bold text-sm mb-2">Com Z:</p>
                          <ul className="text-sm space-y-1">
                            <li>Zonzo, Zanga, Zero, Zona, Zíper</li>
                            <li>Azar, Razão, Amazônico</li>
                            <li>Realizar, Organizar (verbos em -izar)</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-pink-500/5 rounded-xl border border-pink-500/20">
                          <p className="font-bold text-sm mb-2">Com S:</p>
                          <ul className="text-sm space-y-1">
                            <li>Sábado, Semana, Sino, Sise</li>
                            <li>Represália, Análise (nomes, não verbos)</li>
                          </ul>
                        </div>
                      </div>
                    ),
                  },
                  {
                    titulo: "Palavras Homófonas (Som igual, escrita diferente)",
                    icone: "🔊",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Armadilha de ouro da banca!
                        </p>
                        <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                          <ul className="text-sm space-y-1">
                            <li><strong>Cessão</strong> (ato de ceder) vs.
                            <strong>Secção</strong> (seção, divisão)</li>
                            <li><strong>Conserto</strong> (reparo) vs.
                            <strong>Concerto</strong> (música)</li>
                            <li><strong>Descrição</strong> (narração) vs.
                            <strong>Discrição</strong> (sigilo)</li>
                            <li><strong>Absolvição</strong> (perdão) vs.
                            <strong>Dissolução</strong> (fim)</li>
                          </ul>
                        </div>
                      </div>
                    ),
                  },
                ]}
              />
            </section>

            {/* MEMORIZAÇÃO: Flip Cards */}
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-6">
              <ModuleSectionHeader
                index={2}
                title="Memorização Rápida"
                description="Principais pegadinhas em formato flip card"
                variant="teal"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <FlipCard
                  frente={
                    <div className="flex flex-col items-center justify-center h-full gap-2">
                      <span className="text-3xl">🔤</span>
                      <h4 className="font-bold text-sm">G vs J</h4>
                    </div>
                  }
                  verso={
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-primary">G:</p>
                      <p className="text-xs">Geral, Gelo, Garagem, Página</p>
                      <p className="text-xs font-bold text-primary mt-3">J:</p>
                      <p className="text-xs">Jogo, Jamais, Majestade</p>
                    </div>
                  }
                />
                <FlipCard
                  frente={
                    <div className="flex flex-col items-center justify-center h-full gap-2">
                      <span className="text-3xl">✂️</span>
                      <h4 className="font-bold text-sm">SS vs SC</h4>
                    </div>
                  }
                  verso={
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-primary">SS:</p>
                      <p className="text-xs">Acesso, Assessor, Assento</p>
                      <p className="text-xs font-bold text-primary mt-3">SC:</p>
                      <p className="text-xs">Ascensão, Consciência, Descendente</p>
                    </div>
                  }
                />
                <FlipCard
                  frente={
                    <div className="flex flex-col items-center justify-center h-full gap-2">
                      <span className="text-3xl">⚡</span>
                      <h4 className="font-bold text-sm">Z vs S</h4>
                    </div>
                  }
                  verso={
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-primary">Z:</p>
                      <p className="text-xs">Azar, Razão, Organizar</p>
                      <p className="text-xs font-bold text-primary mt-3">S:</p>
                      <p className="text-xs">Análise, Síntese, Represália</p>
                    </div>
                  }
                />
                <FlipCard
                  frente={
                    <div className="flex flex-col items-center justify-center h-full gap-2">
                      <span className="text-3xl">🔊</span>
                      <h4 className="font-bold text-sm">Homófonas</h4>
                    </div>
                  }
                  verso={
                    <div className="space-y-2">
                      <p className="text-xs"><strong>Cessão</strong> (ceder)</p>
                      <p className="text-xs"><strong>Conserto</strong> (reparo)</p>
                      <p className="text-xs"><strong>Descrição</strong> (narração)</p>
                      <p className="text-xs"><strong>Discrição</strong> (sigilo)</p>
                    </div>
                  }
                />
              </div>
            </section>

            {/* APLICAÇÃO PRÁTICA: CardCarousel */}
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-6">
              <ModuleSectionHeader
                index={3}
                title="Questões de Prova"
                description="Cesgranrio real: como cobram essas palavras"
                variant="emerald"
              />
              <CardCarousel
                cards={[
                  {
                    titulo: "Caso 1: Acesso vs Ascensão",
                    descricao: "Qual está correta?",
                    conteudo: "❌ O operador teve **ascesso** ao sistema. ✅ O operador teve **acesso** ao sistema.",
                    bgColor: "bg-red-500/10 border-red-500/20",
                  },
                  {
                    titulo: "Caso 2: Organizar",
                    descricao: "Verbos em -izar sempre com Z",
                    conteudo: "❌ A equipe **organizou** a reunião. ✅ A equipe **organizou** a reunião. (Com Z em toda derivação)",
                    bgColor: "bg-emerald-500/10 border-emerald-500/20",
                  },
                  {
                    titulo: "Caso 3: Homófonos em contexto",
                    descricao: "Leia bem o sentido",
                    conteudo: "O engenheiro fez um **conserto** (reparo) na máquina. Ela tocou um **concerto** (música) no piano.",
                    bgColor: "bg-cyan-500/10 border-cyan-500/20",
                  },
                  {
                    titulo: "Caso 4: Pegadinha Cesgranrio",
                    descricao: "Contexto 'Petrobras'",
                    conteudo: "Na **análise** (com S!) de poços. A **síntese** (com S!) de resultados. Verbos **organizar**, **otimizar** com Z!",
                    bgColor: "bg-orange-500/10 border-orange-500/20",
                  },
                ]}
              />
              <AlertBox tipo="warning" titulo="🎯 Pegadinha Premium">
                Verbos em <strong>-izar</strong> SEMPRE com Z: organizar, otimizar, priorizar. Nomes em <strong>-ise</strong> com S: análise, síntese, empresa. Foco em contexto industrial!
              </AlertBox>
            </section>

            <QuizInterativo
              numero={7}
              titulo="Palavras Chave"
              icone="📚"
              questoes={qMod7}
              onComplete={(score) => handleModuleComplete("modulo-7", score)}
              variant="teal"
            />
          </div>
        </TabsContent>

        {/* MÓDULO 8: COMPOSTOS E HÍFEN AVANÇADO */}
        <TabsContent value="modulo-8" className="space-y-[50px]">
          <ModuleBanner
            numero={8}
            titulo="Compostos e Hífen Avançado"
            descricao="Aprofundamento nas regras de hífen em palavras compostas."
            gradiente="bg-gradient-to-br from-indigo-600 via-purple-500 to-purple-700"
          />
          <div className="space-y-[50px]">
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={1}
                title="Além da Regra dos Opostos"
                description="Casos especiais e exceções em hífen."
                variant="indigo"
              />

              <ContentAccordion
                titulo="🔗 Hífen Avançado"
                icone={<LuBookOpen className="w-6 h-6" />}
                corIndicador="bg-indigo-500"
                defaultOpen={true}
                slides={[
                  {
                    titulo: "Palavras Compostas Tradicionais",
                    icone: "🏠",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Compostos que têm vida própria e sempre usam hífen
                          para manter a identidade de cada palavra.
                        </p>
                        <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                          <p className="font-bold text-sm mb-2">Exemplos:</p>
                          <ul className="text-sm space-y-1">
                            <li>Guarda-chuva (não é guarda + chuva)</li>
                            <li>Beija-flor (não é beija + flor)</li>
                            <li>Tamanho-padrão (mede com padrão)</li>
                            <li>Obra-prima (obra feita com primácia)</li>
                            <li>Pé-de-meia (poupança)</li>
                          </ul>
                        </div>
                      </div>
                    ),
                  },
                  {
                    titulo: "Adjetivos Compostos",
                    icone: "🎨",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Adjetivos compostos usam hífen para conectar os
                          elementos que formam um conceito único.
                        </p>
                        <div className="p-4 bg-purple-500/5 rounded-xl border border-purple-500/20">
                          <p className="font-bold text-sm mb-2">Exemplos:</p>
                          <ul className="text-sm space-y-1">
                            <li>Americano-brasileiro (pessoa de ambas origens)</li>
                            <li>Sócio-econômico (sociologia + economia)</li>
                            <li>Médico-científico</li>
                            <li>Técnico-comercial</li>
                          </ul>
                        </div>
                      </div>
                    ),
                  },
                  {
                    titulo: "Prefixos Sempre com Hífen",
                    icone: "⚠️",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Alguns prefixos não seguem a regra dos opostos e
                          SEMPRE usam hífen.
                        </p>
                        <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/20">
                          <p className="font-bold text-sm mb-2">Prefixos Exceção:</p>
                          <ul className="text-sm space-y-1">
                            <li><strong>Pré</strong>: Pré-escolar, Pré-contrato</li>
                            <li><strong>Pós</strong>: Pós-guerra, Pós-moderno</li>
                            <li><strong>Pró</strong>: Pró-reitor, Pró-tempore</li>
                            <li><strong>Vice</strong>: Vice-presidente, Vice-reitor</li>
                            <li><strong>Ex</strong>: Ex-presidente (pessoa passada)</li>
                          </ul>
                        </div>
                      </div>
                    ),
                  },
                  {
                    titulo: "Sufixos e Palavras Derivadas",
                    icone: "🌳",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Derivações com sufixos geralmente NOT usam hífen
                          (junto), exceto em casos especiais.
                        </p>
                        <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                          <p className="font-bold text-sm mb-2">Exemplos:</p>
                          <ul className="text-sm space-y-1">
                            <li>Jornalismo (jornalista + -ismo) → Junto</li>
                            <li>Modernismo → Junto</li>
                            <li>Realismo → Junto</li>
                            <li>MAS: Mal-estar (substantivo) → Hífen!</li>
                          </ul>
                        </div>
                      </div>
                    ),
                  },
                ]}
              />
            </section>

            {/* MEMORIZAÇÃO: Flip Cards para Hífen */}
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-6">
              <ModuleSectionHeader
                index={2}
                title="Padrões de Hífen"
                description="Regras visuais para memorizar rapidamente"
                variant="indigo"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <FlipCard
                  frente={
                    <div className="flex flex-col items-center justify-center h-full gap-2">
                      <span className="text-3xl">🏠</span>
                      <h4 className="font-bold text-sm">Compostos</h4>
                    </div>
                  }
                  verso={
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-primary">Com Hífen:</p>
                      <p className="text-xs">Guarda-chuva, Beija-flor, Pé-de-meia, Obra-prima</p>
                      <div className="p-2 bg-primary/10 rounded text-xs mt-2">Identidade própria</div>
                    </div>
                  }
                />
                <FlipCard
                  frente={
                    <div className="flex flex-col items-center justify-center h-full gap-2">
                      <span className="text-3xl">🎨</span>
                      <h4 className="font-bold text-sm">Adjetivos</h4>
                    </div>
                  }
                  verso={
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-primary">Com Hífen:</p>
                      <p className="text-xs">Americano-brasileiro, Médico-científico, Técnico-comercial</p>
                      <div className="p-2 bg-primary/10 rounded text-xs mt-2">Conceito único</div>
                    </div>
                  }
                />
                <FlipCard
                  frente={
                    <div className="flex flex-col items-center justify-center h-full gap-2">
                      <span className="text-3xl">⚠️</span>
                      <h4 className="font-bold text-sm">Prefixos</h4>
                    </div>
                  }
                  verso={
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-primary">Sempre Hífen:</p>
                      <p className="text-xs">Pré-, Pós-, Pró-, Vice-, Ex-</p>
                      <p className="text-xs mt-2">Pré-escolar, Pós-guerra, Ex-presidente</p>
                    </div>
                  }
                />
                <FlipCard
                  frente={
                    <div className="flex flex-col items-center justify-center h-full gap-2">
                      <span className="text-3xl">🌳</span>
                      <h4 className="font-bold text-sm">Sufixos</h4>
                    </div>
                  }
                  verso={
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-primary">Geralmente SEM:</p>
                      <p className="text-xs">Jornalismo, Modernismo, Realismo</p>
                      <p className="text-xs font-bold text-primary mt-2">Exceção:</p>
                      <p className="text-xs">Mal-estar, Bem-vindo</p>
                    </div>
                  }
                />
              </div>
            </section>

            {/* APLICAÇÃO PRÁTICA: CardCarousel para Hífen */}
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-6">
              <ModuleSectionHeader
                index={3}
                title="Questões em Contexto"
                description="Como a banca cobra regras de hífen"
                variant="purple"
              />
              <CardCarousel
                cards={[
                  {
                    titulo: "Caso 1: Composto Tradicional",
                    descricao: "Guarda-chuva vs guardachuva",
                    conteudo: "❌ Peguei no **guardachuva** para proteger. ✅ Peguei no **guarda-chuva** para proteger. (Sempre com hífen)",
                    bgColor: "bg-indigo-500/10 border-indigo-500/20",
                  },
                  {
                    titulo: "Caso 2: Adjetivo Composto",
                    descricao: "Americano-brasileiro vs americanobrasileiro",
                    conteudo: "❌ Projeto **americanobrasileiro** de petróleo. ✅ Projeto **americano-brasileiro** de petróleo. (Conceito único com hífen)",
                    bgColor: "bg-purple-500/10 border-purple-500/20",
                  },
                  {
                    titulo: "Caso 3: Prefixo Ex-",
                    descricao: "Sempre com hífen",
                    conteudo: "❌ O **exdiretor** fez a reunião. ✅ O **ex-diretor** fez a reunião. (Ex- sempre com hífen)",
                    bgColor: "bg-rose-500/10 border-rose-500/20",
                  },
                  {
                    titulo: "Caso 4: Sufixo -ismo",
                    descricao: "Geralmente sem hífen",
                    conteudo: "❌ O **jornalismo-técnico** (errado). ✅ O **jornalismo técnico** (correto). (Sufixo -ismo forma palavras simples)",
                    bgColor: "bg-emerald-500/10 border-emerald-500/20",
                  },
                ]}
              />
              <AlertBox tipo="warning" titulo="🎯 Regra de Ouro do Hífen">
                **Vogais opostas** (a-e, a-o) levam hífen: antiácido, co-ocupante. **Vogais iguais** (a-a, e-e) levam hífen: contra-ataque, re-eleição. **Consoantes**: depende se forma composto novo.
              </AlertBox>
            </section>

            <QuizInterativo
              numero={8}
              titulo="Desafio Hífens"
              icone="✂️"
              questoes={qMod8}
              onComplete={(score) => handleModuleComplete("modulo-8", score)}
              variant="indigo"
            />
          </div>
        </TabsContent>

        {/* MÓDULO 9: LINGUAGEM TÉCNICA - PETROBRAS */}
        <TabsContent value="modulo-9" className="space-y-[50px]">
          <ModuleBanner
            numero={9}
            titulo="Ortografia Técnica - Contexto Petrobras"
            descricao="Terminologia e ortografia em contextos empresariais e técnicos."
            gradiente="bg-gradient-to-br from-orange-600 via-red-500 to-orange-700"
          />
          <div className="space-y-[50px]">
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={1}
                title="Terminologia Petrobras"
                description="Vocabulário técnico e ortografia em contexto corporativo."
                variant="orange"
              />

              <ContentAccordion
                titulo="🏢 Linguagem Corporativa e Técnica"
                icone={<LuBookOpen className="w-6 h-6" />}
                corIndicador="bg-orange-500"
                defaultOpen={true}
                slides={[
                  {
                    titulo: "Termos Técnicos de Produção",
                    icone: "⚙️",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Palavras específicas do setor de petróleo e energia.
                        </p>
                        <div className="p-4 bg-orange-500/5 rounded-xl border border-orange-500/20">
                          <p className="font-bold text-sm mb-2">Vocabulário Crítico:</p>
                          <ul className="text-sm space-y-1">
                            <li><strong>Exploração</strong> (não "exploramento")</li>
                            <li><strong>Produção</strong> (e seus derivados)</li>
                            <li><strong>Otimização</strong> (não "otimação")</li>
                            <li><strong>Simulação</strong> (e suas variações)</li>
                            <li><strong>Processamento</strong> de dados/óleo</li>
                            <li><strong>Compliance</strong> (palavra emprestada)</li>
                          </ul>
                        </div>
                      </div>
                    ),
                  },
                  {
                    titulo: "Palavras-Chave em Relatórios",
                    icone: "📊",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Termos que aparecem frequentemente em documentação
                          corporativa.
                        </p>
                        <div className="p-4 bg-red-500/5 rounded-xl border border-red-500/20">
                          <p className="font-bold text-sm mb-2">Documentação:</p>
                          <ul className="text-sm space-y-1">
                            <li><strong>Sustentabilidade</strong> (e variações)</li>
                            <li><strong>Implementação</strong> (de projetos)</li>
                            <li><strong>Manutenção</strong> (preventiva/corretiva)</li>
                            <li><strong>Monitoramento</strong> (de processos)</li>
                            <li><strong>Segurança</strong> (operacional)</li>
                            <li><strong>Licenciamento</strong> (ambiental)</li>
                          </ul>
                        </div>
                      </div>
                    ),
                  },
                  {
                    titulo: "Acrônimos e Siglas Corporativas",
                    icone: "🔤",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Siglas são frequentes em prova. Saiba quando escrever
                          com ou sem ponto.
                        </p>
                        <div className="p-4 bg-yellow-500/5 rounded-xl border border-yellow-500/20">
                          <p className="font-bold text-sm mb-2">Exemplos:</p>
                          <ul className="text-sm space-y-1">
                            <li>SR (Sem Responsabilidade) → Sem ponto (sigla)</li>
                            <li>Prof. (Professor) → Com ponto (abreviatura)</li>
                            <li>EIA (Estudo de Impacto Ambiental) → Sem ponto</li>
                            <li>ICMS → Imposto (sem ponto)</li>
                            <li>Sr. → Abreviação (com ponto)</li>
                          </ul>
                        </div>
                      </div>
                    ),
                  },
                  {
                    titulo: "Palavras Estrangeiras Incorporadas",
                    icone: "🌍",
                    conteudo: (
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Termos ingleses comuns em textos técnicos da Petrobras.
                        </p>
                        <div className="p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/20">
                          <p className="font-bold text-sm mb-2">Incorporadas:</p>
                          <ul className="text-sm space-y-1">
                            <li><strong>Compliance</strong> (conformidade)</li>
                            <li><strong>Outsourcing</strong> (terceirização)</li>
                            <li><strong>Pipeline</strong> (duto/encanamento)</li>
                            <li><strong>Feedback</strong> (retorno)</li>
                            <li><strong>Benchmark</strong> (referência)</li>
                          </ul>
                        </div>
                        <AlertBox tipo="warning" titulo="⚠️ Itálico em Empréstimos">
                          Palavras estrangeiras ainda não inteiramente
                          incorporadas devem estar em itálico: <em>Pipeline</em>,
                          <em>Compliance</em>.
                        </AlertBox>
                      </div>
                    ),
                  },
                ]}
              />
            </section>

            {/* MEMORIZAÇÃO: Flip Cards para Terminologia Petrobras */}
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-6">
              <ModuleSectionHeader
                index={2}
                title="Vocabulário Crítico"
                description="Termos técnicos que não podem errar"
                variant="orange"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <FlipCard
                  frente={
                    <div className="flex flex-col items-center justify-center h-full gap-2">
                      <span className="text-3xl">⚙️</span>
                      <h4 className="font-bold text-sm">Produção</h4>
                    </div>
                  }
                  verso={
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-primary">Termos Corretos:</p>
                      <p className="text-xs"><strong>Exploração</strong> (não exploramento)</p>
                      <p className="text-xs"><strong>Produção</strong> (não produção)</p>
                      <p className="text-xs"><strong>Otimização</strong> (não otimação)</p>
                    </div>
                  }
                />
                <FlipCard
                  frente={
                    <div className="flex flex-col items-center justify-center h-full gap-2">
                      <span className="text-3xl">📊</span>
                      <h4 className="font-bold text-sm">Relatórios</h4>
                    </div>
                  }
                  verso={
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-primary">Palavras-Chave:</p>
                      <p className="text-xs"><strong>Sustentabilidade</strong></p>
                      <p className="text-xs"><strong>Implementação</strong></p>
                      <p className="text-xs"><strong>Monitoramento</strong></p>
                    </div>
                  }
                />
                <FlipCard
                  frente={
                    <div className="flex flex-col items-center justify-center h-full gap-2">
                      <span className="text-3xl">🔤</span>
                      <h4 className="font-bold text-sm">Siglas</h4>
                    </div>
                  }
                  verso={
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-primary">Sem ponto:</p>
                      <p className="text-xs">EIA, ICMS, SR</p>
                      <p className="text-xs font-bold text-primary mt-2">Com ponto:</p>
                      <p className="text-xs">Prof., Sr., Dr.</p>
                    </div>
                  }
                />
                <FlipCard
                  frente={
                    <div className="flex flex-col items-center justify-center h-full gap-2">
                      <span className="text-3xl">🌍</span>
                      <h4 className="font-bold text-sm">Inglês</h4>
                    </div>
                  }
                  verso={
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-primary">Incorporadas:</p>
                      <p className="text-xs">Compliance, Outsourcing, Benchmark</p>
                      <div className="p-2 bg-primary/10 rounded text-xs mt-2">Em itálico se não incorporada</div>
                    </div>
                  }
                />
              </div>
            </section>

            {/* APLICAÇÃO PRÁTICA: CardCarousel para Petrobras */}
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-6">
              <ModuleSectionHeader
                index={3}
                title="Prática em Contexto Industrial"
                description="Situações reais da Petrobras"
                variant="red"
              />
              <CardCarousel
                cards={[
                  {
                    titulo: "Caso 1: Exploração vs Exploramento",
                    descricao: "Qual está correta?",
                    conteudo: "❌ A **exploração** de petróleo. ✅ A **exploração** (não exploramento) de petróleo. (Exploração é o termo técnico correto)",
                    bgColor: "bg-orange-500/10 border-orange-500/20",
                  },
                  {
                    titulo: "Caso 2: Otimização vs Otimação",
                    descricao: "Verbo derivado",
                    conteudo: "❌ A **otimação** dos processos. ✅ A **otimização** dos processos. (Sempre com Z em -ização)",
                    bgColor: "bg-red-500/10 border-red-500/20",
                  },
                  {
                    titulo: "Caso 3: Sigla ou Abreviatura",
                    descricao: "Saber a diferença",
                    conteudo: "✅ O EIA (Estudo de Impacto Ambiental) - sem ponto. ✅ O Sr. diretor - com ponto (abreviatura de Senhor)",
                    bgColor: "bg-yellow-500/10 border-yellow-500/20",
                  },
                  {
                    titulo: "Caso 4: Empréstimo Corporativo",
                    descricao: "Termos em inglês",
                    conteudo: "✅ **Compliance** corporativo (já incorporada). ✅ Sistema de *pipeline* (ainda em itálico se contextual). Siga o padrão do texto!",
                    bgColor: "bg-indigo-500/10 border-indigo-500/20",
                  },
                ]}
              />
              <AlertBox tipo="info" titulo="💡 Contexto Mestre">
                Prova Cesgranrio valoriza **contexto técnico-industrial**. Candidato que escreve corretamente "exploração", "otimização", "implementação" demonstra conhecimento específico do setor. Muito valioso em questões de interpretação!
              </AlertBox>
            </section>

            <QuizInterativo
              numero={9}
              titulo="Contexto Técnico"
              icone="🏢"
              questoes={qMod9}
              onComplete={(score) => handleModuleComplete("modulo-9", score)}
              variant="orange"
            />
          </div>
        </TabsContent>

        {/* MÓDULO 10: SIMULADO MESTRE */}
        <TabsContent value="modulo-10" className="space-y-[50px]">
          <ModuleBanner
            numero={10}
            titulo="Simulado Mestre de Ortografia"
            descricao="Prova final abrangente cobrindo todos os tópicos e pegadinhas."
            gradiente="bg-gradient-to-br from-rose-600 via-pink-500 to-rose-700"
          />
          <div className="space-y-[50px]">
            <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
              <ModuleSectionHeader
                index={1}
                title="Prova Final Consolidada"
                description="Integração total de todos os módulos e domínio de ortografia."
                variant="rose"
              />

              <AlertBox tipo="info" titulo="📋 Instruções do Simulado">
                Esta é uma prova com 15 questões selecionadas de todos os
                módulos anteriores. Ela avalia seu domínio geral de ortografia
                no padrão Cesgranrio. Passe com 70% para completar a aula!
              </AlertBox>

              <div className="p-6 bg-rose-500/5 rounded-2xl border border-rose-500/20 space-y-4">
                <h4 className="font-bold text-lg">Tópicos Cobertos:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <LuCheck className="w-4 h-4 text-emerald-500" />
                    <span>Encontros Vocálicos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LuCheck className="w-4 h-4 text-emerald-500" />
                    <span>Acentuação</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LuCheck className="w-4 h-4 text-emerald-500" />
                    <span>Novo Acordo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LuCheck className="w-4 h-4 text-emerald-500" />
                    <span>Hífen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LuCheck className="w-4 h-4 text-emerald-500" />
                    <span>Dificuldades</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LuCheck className="w-4 h-4 text-emerald-500" />
                    <span>Palavras Frequentes</span>
                  </div>
                </div>
              </div>
            </section>

            <QuizInterativo
              numero={10}
              titulo="Simulado Completo"
              icone="👑"
              questoes={qMod10}
              onComplete={(score) => handleModuleComplete("modulo-10", score)}
              variant="rose"
            />

            {completedModules.has("modulo-10") && (
              <div className="mt-16 p-12 bg-gradient-to-br from-rose-600 to-pink-700 rounded-[2rem] text-white text-center shadow-2xl animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-5xl mx-auto mb-6 backdrop-blur-md border border-white/30">
                  ✨
                </div>
                <h3 className="text-4xl font-black italic tracking-tighter mb-4">
                  MESTRE EM ORTOGRAFIA
                </h3>
                <p className="text-xl opacity-90 max-w-2xl mx-auto">
                  Você dominou completamente as regras ortográficas! Seus erros
                  de escrita na prova Cesgranrio foram eliminados. Parabéns!
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </AulaTemplate>
  );
}
