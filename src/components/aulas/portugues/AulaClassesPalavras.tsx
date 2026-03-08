"use client";

import { useState, useEffect, useCallback } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  QuizQuestion,
  getRandomQuestions,
  AlertBox,
  FlipCard,
  QuizInterativo,
  ModuleBanner,
  CardCarousel,
  ModuleSectionHeader,
  ContentAccordion,
  LessonTabs,
  ModuleSummaryCarouselNew,
  AulaProps,
  VideoModal,
  AulaTemplate,
  Comparison,
} from "../shared";
import {
  QUIZ_M1_SUBSTANTIVO,
  QUIZ_M2_ADJETIVO_ARTIGO,
  QUIZ_M3_VERBO_I,
  QUIZ_M4_VERBO_II,
  QUIZ_M5_PRONOME_I,
  QUIZ_M6_PRONOME_II,
  QUIZ_M7_ADVERBIO,
  QUIZ_M8_PREPOSICAO_NUMERAL,
  QUIZ_M9_CONJUNCAO,
  QUIZ_M10_FINAL_CLASSES,
} from "./data/classes-palavras-quizzes";

import {
  LuBookOpen,
  LuTag,
  LuActivity,
  LuZap,
  LuHash,
  LuLink2,
  LuNavigation,
  LuArrowDown,
  LuShield,
  LuCirclePlay as LuPlayCircle,
  LuBrain,
  LuMusic,
  LuCheck,
  LuMessageCircle,
} from "react-icons/lu";

// ── Definição dos 10 Módulos Premium (1 Classe = 1 Módulo) ──
const MODULE_DEFS = [
  {
    id: "modulo-1",
    label: "M1: Substantivo",
    title: "Substantivo: O Nomeador",
  },
  { id: "modulo-2", label: "M2: Adjetivo", title: "Adjetivo: O Qualificador" },
  { id: "modulo-3", label: "M3: Artigo", title: "Artigo: O Determinante" },
  { id: "modulo-4", label: "M4: Pronome", title: "Pronome: O Substituto" },
  { id: "modulo-5", label: "M5: Verbo", title: "Verbo: O Motor da Oração" },
  { id: "modulo-6", label: "M6: Advérbio", title: "Advérbio: A Circunstância" },
  {
    id: "modulo-7",
    label: "M7: Preposição",
    title: "Preposição: O Elo de Ligação",
  },
  {
    id: "modulo-8",
    label: "M8: Conjunção",
    title: "Conjunção: O Cimento do Texto",
  },
  { id: "modulo-9", label: "M9: Interjeição", title: "Interjeição: A Emoção" },
  { id: "modulo-10", label: "M10: Numeral", title: "Numeral: A Quantidade" },
] as const;

// ══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS FOR CONJUGATION
// ══════════════════════════════════════════════════════════════════════════

const renderConj = (
  p1: string,
  p2: string,
  p3: string,
  p4: string,
  p5: string,
  p6: string,
  prefixo: string = "",
) => {
  const w = prefixo ? "w-16" : "w-10";
  return (
    <div className="text-base space-y-2 font-mono">
      {[p1, p2, p3, p4, p5, p6].map((p, i) => {
        const pronoun = ["eu", "tu", "ele", "nós", "vós", "eles"][i];
        return (
          <p key={i} className="flex gap-2">
            <span className={`text-muted-foreground ${w} text-right`}>
              {prefixo ? `(${prefixo}) ` : ""}
              {pronoun}
            </span>
            <span className="font-semibold text-foreground text-left">{p}</span>
          </p>
        );
      })}
    </div>
  );
};

const criarCard = (
  icone: React.ReactNode,
  titulo: string,
  conj: React.ReactNode,
  tipo: "reg" | "irreg" = "reg",
) => ({
  icone,
  title: (
    <span className="flex items-center gap-2">
      {titulo}
      {tipo === "irreg" && (
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-500 font-semibold uppercase tracking-wide border border-red-500/20">
          Irregular
        </span>
      )}
    </span>
  ) as any,
  descricao: conj,
});

const i1 = <span className="font-black text-xs text-blue-500">-AR</span>;
const i2 = <span className="font-black text-xs text-emerald-500">-ER</span>;
const i3 = <span className="font-black text-xs text-rose-500">-IR</span>;
const iIr = <span className="font-black text-base text-amber-500">✦</span>;

const CONJ_SLIDES = [
  {
    titulo: "1. Presente do Indicativo",
    icone: "🕒",
    conteudo: (
      <CardCarousel
        titulo=""
        cards={[
          criarCard(
            i1,
            "Estudar",
            renderConj(
              "estudo",
              "estudas",
              "estuda",
              "estudamos",
              "estudais",
              "estudam",
            ),
          ),
          criarCard(
            i2,
            "Vender",
            renderConj(
              "vendo",
              "vendes",
              "vende",
              "vendemos",
              "vendeis",
              "vendem",
            ),
          ),
          criarCard(
            i3,
            "Partir",
            renderConj(
              "parto",
              "partes",
              "parte",
              "partimos",
              "partis",
              "partem",
            ),
          ),
          criarCard(
            iIr,
            "Ser",
            renderConj("sou", "és", "é", "somos", "sois", "são"),
            "irreg",
          ),
        ]}
      />
    ),
  },
  {
    titulo: "2. Pretérito Perfeito",
    icone: "✅",
    conteudo: (
      <CardCarousel
        titulo=""
        cards={[
          criarCard(
            i1,
            "Estudar",
            renderConj(
              "estudei",
              "estudaste",
              "estudou",
              "estudamos",
              "estudastes",
              "estudaram",
            ),
          ),
          criarCard(
            i2,
            "Vender",
            renderConj(
              "vendi",
              "vendeste",
              "vendeu",
              "vendemos",
              "vendestes",
              "venderam",
            ),
          ),
          criarCard(
            i3,
            "Partir",
            renderConj(
              "parti",
              "partiste",
              "partiu",
              "partimos",
              "partistes",
              "partiram",
            ),
          ),
          criarCard(
            iIr,
            "Vir",
            renderConj("vim", "vieste", "veio", "viemos", "viestes", "vieram"),
            "irreg",
          ),
        ]}
      />
    ),
  },
];

// ══════════════════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ══════════════════════════════════════════════════════════════════════════

export default function AulaClassesPalavras({
  onComplete,
  isCompleted,
  loading,
  prevTopico,
  nextTopico,
  currentProgress,
  onUpdateProgress,
  materiaCor,
  materiaNome,
  materiaId,
}: AulaProps) {
  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(),
  );
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
    setQMod1(getRandomQuestions(QUIZ_M1_SUBSTANTIVO, 6));
    setQMod2(getRandomQuestions(QUIZ_M2_ADJETIVO_ARTIGO, 6));
    setQMod3(getRandomQuestions(QUIZ_M2_ADJETIVO_ARTIGO, 6));
    setQMod4(
      getRandomQuestions([...QUIZ_M5_PRONOME_I, ...QUIZ_M6_PRONOME_II], 6),
    );
    setQMod5(getRandomQuestions([...QUIZ_M3_VERBO_I, ...QUIZ_M4_VERBO_II], 6));
    setQMod6(getRandomQuestions(QUIZ_M7_ADVERBIO, 6));
    setQMod7(getRandomQuestions(QUIZ_M8_PREPOSICAO_NUMERAL, 6));
    setQMod8(getRandomQuestions(QUIZ_M9_CONJUNCAO, 6));
    setQMod9(getRandomQuestions(QUIZ_M10_FINAL_CLASSES, 6));
    setQMod10(getRandomQuestions(QUIZ_M8_PREPOSICAO_NUMERAL, 6));
  }, []);

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) {
      const newSet = new Set(completedModules).add(moduleId);
      setCompletedModules(newSet);
      if (onUpdateProgress) {
        onUpdateProgress(Math.round((newSet.size / MODULE_DEFS.length) * 100));
      }
      const index = MODULE_DEFS.findIndex((m) => m.id === moduleId);
      if (index < MODULE_DEFS.length - 1) {
        setActiveTab(MODULE_DEFS[index + 1].id);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      modules={Array.from(MODULE_DEFS)}
      completedModules={completedModules}
      isModuleUnlocked={() => true}
      titulo="Classes de Palavras"
      descricao="Domine as 10 categorias morfológicas para a Cesgranrio."
      duracao="60 min"
      materiaNome={materiaNome}
      materiaCor={materiaCor}
      materiaId={materiaId}
      isCompleted={isCompleted}
      prevTopico={prevTopico}
      nextTopico={nextTopico}
      onComplete={onComplete}
      loading={loading}
      currentProgress={Math.round(
        (completedModules.size / MODULE_DEFS.length) * 100,
      )}
    >
      {/* ── MÓDULO 1: SUBSTANTIVO ── */}
      <TabsContent value="modulo-1" className="space-y-12 mt-12">
        <ModuleBanner
          numero={1}
          titulo="O Substantivo"
          descricao="A base de toda a nomeação e o núcleo dos termos da oração."
          gradiente="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-600"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12 text-justify leading-relaxed">
          <ModuleSectionHeader
            index={1}
            title="Conceito Científico"
            variant="blue"
          />
          <p className="text-lg text-muted-foreground">
            O <strong>Substantivo</strong> é a classe de palavra que{" "}
            <strong>nomeia</strong> seres, objetos, lugares, sentimentos, ações
            e qualidades. Segundo Bechara, é a palavra que designa os seres em
            geral, reais ou imaginários. É o núcleo de praticamente todos os
            termos da oração (sujeito, objeto direto, objeto indireto,
            complemento nominal).
          </p>
          <AlertBox tipo="info" titulo="Morfologia vs Sintaxe — Relembre!">
            Na <strong>Morfologia</strong>, o substantivo é classificado pela
            forma (RG da palavra). Na <strong>Sintaxe</strong>, ele exerce uma{" "}
            <strong>função</strong> (Profissão da palavra). Ex: "navio" →
            Morfologia: substantivo concreto. Sintaxe: pode ser sujeito, objeto
            direto, etc.
          </AlertBox>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="Classificações dos Substantivos"
            variant="blue"
          />
          <p className="text-base text-muted-foreground leading-relaxed text-justify">
            Os substantivos são organizados em{" "}
            <strong>quatro pares de oposição</strong> que definem a natureza do
            ser.
          </p>
          <ContentAccordion
            mode="stacked"
            titulo="Os 4 Pares"
            icone={<LuTag />}
            corIndicador="bg-blue-500"
            slides={[
              {
                titulo: "Concreto vs Abstrato",
                icone: "1️⃣",
                conteudo:
                  "Concreto designa seres com existência própria; Abstrato designa ações, qualidades e sentimentos.",
              },
            ]}
          />
        </section>

        {/* Resumo + Multimídia M1 */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={3}
            title="Resumo e Multimídia"
            variant="blue"
          />
          <LessonTabs
            tabs={[
              {
                id: "video",
                label: "Vídeo Aula",
                icon: LuPlayCircle,
                content: (
                  <div className="w-full flex flex-col items-center py-6">
                    <VideoModal
                      videoId="dQw4w9WgXcQ"
                      title="Substantivos"
                      duration="08:45"
                    />
                  </div>
                ),
              },
              {
                id: "visual",
                label: "Visual",
                icon: LuBrain,
                content: (
                  <ModuleSummaryCarouselNew
                    tituloAula="Gramática de Elite"
                    materia="Português"
                    moduloNome="M1: Substantivo"
                    images={[
                      {
                        title: "Substantivo",
                        type: "Mapa Mental",
                        placeholderColor: "#3b82f6",
                      },
                      {
                        title: "Efeito Rei Midas",
                        type: "Macete",
                        placeholderColor: "#60a5fa",
                      },
                    ]}
                  />
                ),
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={4}
            title="Derivação Imprópria — O 'Efeito Rei Midas'"
            variant="blue"
          />
          <div className="bg-amber-500/10 border-l-4 border-amber-500 p-5 rounded-xl mb-6 text-sm text-foreground">
            <p>
              <strong>O Artigo é o nosso Rei Midas</strong>: qualquer palavra da
              língua que venha antecedida por ele perderá a sua classe original
              e será imediatamente transformada em Substantivo.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                  <span className="font-bold text-3xl bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                    Verbo
                  </span>
                  <LuArrowDown className="w-10 h-10 text-muted-foreground/40" />
                  <span className="font-bold text-2xl text-foreground/90">
                    Substantivo
                  </span>
                </div>
              }
              verso={
                <div className="flex flex-col justify-center h-full space-y-4 text-center text-sm p-2">
                  <p>
                    <strong>O cantar</strong> dos pássaros encanta.
                  </p>
                  <hr className="border-border/50" />
                  <p>
                    Foi um <strong>amanhecer</strong> radiante.
                  </p>
                </div>
              }
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                  <span className="font-bold text-3xl bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    Advérbio
                  </span>
                  <LuArrowDown className="w-10 h-10 text-muted-foreground/40" />
                  <span className="font-bold text-2xl text-foreground/90">
                    Substantivo
                  </span>
                </div>
              }
              verso={
                <div className="flex flex-col justify-center h-full space-y-4 text-center text-sm p-2">
                  <p>
                    Ele recebeu um <strong>não</strong> rotundo.
                  </p>
                  <hr className="border-border/50" />
                  <p>
                    Espero um <strong>sim</strong> da presidência.
                  </p>
                </div>
              }
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                  <span className="font-bold text-3xl bg-gradient-to-r from-cyan-600 to-blue-500 bg-clip-text text-transparent">
                    Adjetivo
                  </span>
                  <LuArrowDown className="w-10 h-10 text-muted-foreground/40" />
                  <span className="font-bold text-2xl text-foreground/90">
                    Substantivo
                  </span>
                </div>
              }
              verso={
                <div className="flex flex-col justify-center h-full space-y-4 text-center text-sm p-2">
                  <p>
                    <strong>O azul</strong> do céu é intenso.
                  </p>
                  <hr className="border-border/50" />
                  <p>
                    Ele defende os <strong>pobres</strong>.
                  </p>
                </div>
              }
            />
          </div>
        </section>

        <section className="mt-16">
          <QuizInterativo
            questoes={qMod1}
            titulo="Substantivo: O Nomeador"
            icone="🎯"
            numero={1}
            variant="blue"
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          />
        </section>
      </TabsContent>

      {/* ── MÓDULO 2: ADJETIVO ── */}
      <TabsContent value="modulo-2" className="space-y-12 mt-12">
        <ModuleBanner
          numero={2}
          titulo="O Adjetivo"
          descricao="O qualificador que define a concordância e a nuance do texto."
          gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12 text-justify leading-relaxed">
          <ModuleSectionHeader
            index={1}
            title="Conceito Científico"
            variant="emerald"
          />
          <p className="text-lg text-muted-foreground">
            O <strong>Adjetivo</strong> é a classe de palavra que{" "}
            <strong>qualifica</strong> ou <strong>caracteriza</strong> o
            substantivo, atribuindo-lhe propriedades, estados ou modos de ser. É
            classe <strong>variável</strong> (concorda em gênero e número).
          </p>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="A Posição do Adjetivo Muda o Sentido"
            variant="emerald"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FlipCard
              hideFooter={true}
              frente={
                <div className="space-y-4 py-2">
                  <h4 className="font-black text-xl uppercase">
                    Adjetivo POSPOSTO
                  </h4>
                  <p className="text-sm text-muted-foreground uppercase tracking-widest">
                    Depois do Substantivo
                  </p>
                  <p className="text-sm">
                    Mantém o sentido original, literal e objetivo (
                    <strong>denotativo</strong>).
                  </p>
                </div>
              }
              verso={
                <div className="space-y-3 text-center">
                  <p className="font-bold text-blue-600 uppercase text-[10px]">
                    Valor Objetivo
                  </p>
                  <p>
                    "Ele é um homem <strong>grande</strong>."
                  </p>
                  <p className="text-muted-foreground text-xs">
                    (Alguém fisicamente alto)
                  </p>
                </div>
              }
            />
            <FlipCard
              hideFooter={true}
              frente={
                <div className="space-y-4 py-2">
                  <h4 className="font-black text-xl uppercase">
                    Adjetivo ANTEPOSTO
                  </h4>
                  <p className="text-sm text-muted-foreground uppercase tracking-widest">
                    Antes do Substantivo
                  </p>
                  <p className="text-sm">
                    Sentido figurado, emotivo ou subjetivo (
                    <strong>conotativo</strong>).
                  </p>
                </div>
              }
              verso={
                <div className="space-y-3 text-center">
                  <p className="font-bold text-indigo-600 uppercase text-[10px]">
                    Valor Subjetivo
                  </p>
                  <p>
                    "Ele é um <strong>grande</strong> homem."
                  </p>
                  <p className="text-muted-foreground text-xs">
                    (Alguém notável ou bondoso)
                  </p>
                </div>
              }
            />
          </div>
          <AlertBox tipo="success" titulo="Dica para a Prova">
            Inverter o adjetivo pode mudar o sentido e invalidar uma reescrita
            na prova da Cesgranrio.
          </AlertBox>
        </section>

        {/* Resumo + Multimídia M2 */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={3}
            title="Resumo e Multimídia"
            variant="emerald"
          />
          <LessonTabs
            tabs={[
              {
                id: "visual",
                label: "Mapa Mental",
                icon: LuBrain,
                content: (
                  <ModuleSummaryCarouselNew
                    tituloAula="Gramática de Elite"
                    materia="Português"
                    moduloNome="M2: Adjetivo"
                    images={[
                      {
                        title: "Adjetivo",
                        type: "Qualificador",
                        placeholderColor: "#10b981",
                      },
                    ]}
                  />
                ),
              },
            ]}
          />
        </section>

        <section className="mt-16">
          <QuizInterativo
            questoes={qMod2}
            titulo="Adjetivo: O Qualificador"
            icone="✨"
            numero={2}
            variant="emerald"
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          />
        </section>
      </TabsContent>

      {/* ── MÓDULO 3: ARTIGO ── */}
      <TabsContent value="modulo-3" className="space-y-12 mt-12">
        <ModuleBanner
          numero={3}
          titulo="O Artigo"
          descricao="O determinante que define a substantivação e a concordância."
          gradiente="bg-gradient-to-br from-amber-600 via-orange-600 to-yellow-700"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12 text-justify leading-relaxed">
          <ModuleSectionHeader
            index={1}
            title="Conceito Científico"
            variant="amber"
          />
          <p className="text-lg text-muted-foreground">
            O <strong>Artigo</strong> é a classe de palavra{" "}
            <strong>variável</strong> que antecede o substantivo para{" "}
            <strong>determiná-lo</strong> (artigo definido: o, a, os, as) ou{" "}
            <strong>indeterminá-lo</strong> (artigo indefinido: um, uma, uns,
            umas).
          </p>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="Concordância: É Proibido vs É Proibida"
            variant="amber"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FlipCard
              hideFooter={true}
              frente={
                <div className="space-y-4 py-2">
                  <h4 className="font-black text-xl uppercase">Sem Artigo</h4>
                  <p className="text-sm">Fica invariável (masculino).</p>
                </div>
              }
              verso={
                <div className="space-y-3 text-center">
                  <p className="font-bold text-red-600 uppercase text-[10px]">
                    Invariável
                  </p>
                  <p>
                    "É <strong>proibido</strong> entrada."
                  </p>
                  <p className="text-muted-foreground text-xs">
                    (Entrada em geral)
                  </p>
                </div>
              }
            />
            <FlipCard
              hideFooter={true}
              frente={
                <div className="space-y-4 py-2">
                  <h4 className="font-black text-xl uppercase">Com Artigo</h4>
                  <p className="text-sm">Ocorre a concordância.</p>
                </div>
              }
              verso={
                <div className="space-y-3 text-center">
                  <p className="font-bold text-emerald-600 uppercase text-[10px]">
                    Variável
                  </p>
                  <p>
                    "É <strong>proibida a</strong> entrada."
                  </p>
                  <p className="text-muted-foreground text-xs">
                    (Aquela entrada específica)
                  </p>
                </div>
              }
            />
          </div>
        </section>

        {/* Resumo + Multimídia M3 */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={3}
            title="Resumo e Multimídia"
            variant="amber"
          />
          <LessonTabs
            tabs={[
              {
                id: "visual",
                label: "Determinantes",
                icon: LuBrain,
                content: (
                  <ModuleSummaryCarouselNew
                    tituloAula="Gramática de Elite"
                    materia="Português"
                    moduloNome="M3: Artigo"
                    images={[
                      {
                        title: "Artigo",
                        type: "Determinante",
                        placeholderColor: "#f59e0b",
                      },
                    ]}
                  />
                ),
              },
            ]}
          />
        </section>

        <section className="mt-16">
          <QuizInterativo
            questoes={qMod3}
            titulo="Artigo: O Determinante"
            icone="🏷️"
            numero={3}
            variant="amber"
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </section>
      </TabsContent>

      {/* ── MÓDULO 4: PRONOME ── */}
      <TabsContent value="modulo-4" className="space-y-12 mt-12">
        <ModuleBanner
          numero={4}
          titulo="O Pronome"
          descricao="O substituto estratégico e o mestre da coesão textual."
          gradiente="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={1}
            title="Pessoais: Reto vs Oblíquo"
            variant="violet"
          />
          <div className="overflow-hidden rounded-xl border border-border bg-muted/30">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-foreground font-bold uppercase text-[10px] tracking-widest">
                <tr>
                  <th className="p-4">Pessoa</th>
                  <th className="p-4">Reto (Sujeito)</th>
                  <th className="p-4">Oblíquo Átono</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["1ª sing.", "Eu", "me"],
                  ["2ª sing.", "Tu", "te"],
                  ["3ª sing.", "Ele/Ela", "o, a, lhe, se"],
                  ["1ª plur.", "Nós", "nos"],
                  ["2ª plur.", "Vós", "vos"],
                  ["3ª plur.", "Eles/Elas", "os, as, lhes, se"],
                ].map(([p, r, o], i) => (
                  <tr key={i} className="hover:bg-muted/50 transition-colors">
                    <td className="p-4 font-medium text-muted-foreground">
                      {p}
                    </td>
                    <td className="p-4 font-bold text-violet-600">{r}</td>
                    <td className="p-4 font-bold text-emerald-600">{o}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <AlertBox tipo="danger" titulo="Erro Fatal na Cesgranrio">
            "Vi <strong>ele</strong> no corredor." → <strong>ERRADO!</strong>{" "}
            Pronome reto (ele/ela) não pode ser objeto direto. O correto é: "Vi-
            <strong>o</strong>" ou "<strong>O</strong> vi".
          </AlertBox>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="Colocação Pronominal"
            variant="violet"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-violet-500/5 border border-violet-500/20 space-y-4">
              <h4 className="font-bold text-violet-600 text-lg">Próclise</h4>
              <p className="text-xs text-muted-foreground italic">
                Antes do verbo
              </p>
              <p className="text-sm">
                "Não <strong>me</strong> diga!"
              </p>
              <div className="text-[11px] bg-white dark:bg-black/20 p-2 rounded">
                Fatores: palavras negativas, advérbios, pronomes relativos.
              </div>
            </div>
            <div className="p-6 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-4">
              <h4 className="font-bold text-emerald-600 text-lg">Ênclise</h4>
              <p className="text-xs text-muted-foreground italic">
                Depois do verbo
              </p>
              <p className="text-sm">
                "Diga-<strong>me</strong> a verdade."
              </p>
              <div className="text-[11px] bg-white dark:bg-black/20 p-2 rounded">
                Padrão quando a frase começa com verbo ou no imperativo.
              </div>
            </div>
            <div className="p-6 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-4">
              <h4 className="font-bold text-amber-600 text-lg">Mesóclise</h4>
              <p className="text-xs text-muted-foreground italic">
                No meio do verbo
              </p>
              <p className="text-sm">
                "Dir-<strong>te</strong>-ei tudo."
              </p>
              <div className="text-[11px] bg-white dark:bg-black/20 p-2 rounded">
                Exclusiva para Futuro do Presente e do Pretérito (se não houver
                próclise).
              </div>
            </div>
          </div>
        </section>

        {/* Resumo + Multimídia M4 */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={3}
            title="Resumo e Multimídia"
            variant="violet"
          />
          <LessonTabs
            tabs={[
              {
                id: "visual",
                label: "Coesão",
                icon: LuBrain,
                content: (
                  <ModuleSummaryCarouselNew
                    tituloAula="Gramática de Elite"
                    materia="Português"
                    moduloNome="M4: Pronome"
                    images={[
                      {
                        title: "Pronome",
                        type: "Substituto",
                        placeholderColor: "#8b5cf6",
                      },
                    ]}
                  />
                ),
              },
            ]}
          />
        </section>

        <section className="mt-16">
          <QuizInterativo
            questoes={qMod4}
            titulo="Pronome: O Substituto"
            icone="👤"
            numero={4}
            variant="violet"
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
          />
        </section>
      </TabsContent>

      {/* ── MÓDULO 5: VERBO ── */}
      <TabsContent value="modulo-5" className="space-y-12 mt-12">
        <ModuleBanner
          numero={5}
          titulo="O Verbo"
          descricao="A classe mais complexa e importante da língua portuguesa."
          gradiente="bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700"
        />

        {/* Resumo + Multimídia M5 */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={3}
            title="Resumo e Multimídia"
            variant="rose"
          />
          <LessonTabs
            tabs={[
              {
                id: "laboratorio",
                label: "Laboratório",
                icon: LuActivity,
                content: (
                  <ContentAccordion
                    mode="stacked"
                    titulo=""
                    icone={<LuActivity />}
                    corIndicador="bg-rose-500"
                    defaultOpen={true}
                    slides={CONJ_SLIDES}
                  />
                ),
              },
              {
                id: "video",
                label: "Vídeo Aula",
                icon: LuPlayCircle,
                content: (
                  <div className="w-full flex flex-col items-center py-6">
                    <div className="w-full max-w-3xl">
                      <VideoModal
                        videoId="dQw4w9WgXcQ"
                        title="Verbos: O Motor da Oração"
                        duration="25:00"
                        thumbnail="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000"
                      />
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="Verbos Impessoais (Haver e Fazer)"
            variant="rose"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-slate-950 text-white space-y-6">
              <h4 className="text-2xl font-black text-rose-500 flex items-center gap-3 italic">
                HAVER
              </h4>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <LuCheck className="text-emerald-500 shrink-0 mt-1" />
                  <p className="text-sm">
                    Sentido de <strong>EXISTIR</strong> ou{" "}
                    <strong>OCORRER</strong>.
                  </p>
                </li>
                <li className="flex gap-3">
                  <LuCheck className="text-emerald-500 shrink-0 mt-1" />
                  <p className="text-sm">
                    Fica sempre no <strong>SINGULAR</strong> (3ª pessoa).
                  </p>
                </li>
              </ul>
              <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-xs italic">
                ✅ "Haverá problemas." (Certo) <br />❌ "Haverão problemas."
                (Errado)
              </div>
            </div>
            <div className="p-8 rounded-2xl bg-slate-950 text-white space-y-6">
              <h4 className="text-2xl font-black text-amber-500 flex items-center gap-3 italic">
                FAZER
              </h4>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <LuCheck className="text-emerald-500 shrink-0 mt-1" />
                  <p className="text-sm">
                    Indicando <strong>TEMPO DECORRIDO</strong>.
                  </p>
                </li>
                <li className="flex gap-3">
                  <LuCheck className="text-emerald-500 shrink-0 mt-1" />
                  <p className="text-sm">
                    Fica sempre no <strong>SINGULAR</strong>.
                  </p>
                </li>
              </ul>
              <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-xs italic">
                ✅ "Faz dez anos." (Certo) <br />❌ "Fazem dez anos." (Errado)
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <QuizInterativo
            questoes={qMod5}
            titulo="Verbo: O Motor da Oração"
            icone="⚡"
            numero={5}
            variant="rose"
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
          />
        </section>
      </TabsContent>

      {/* ── MÓDULO 6: ADVÉRBIO ── */}
      <TabsContent value="modulo-6" className="space-y-12 mt-12">
        <ModuleBanner
          numero={6}
          titulo="O Advérbio"
          descricao="O modificador invariável e as armadilhas das palavras camaleão."
          gradiente="bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-700"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12 text-justify leading-relaxed">
          <ModuleSectionHeader
            index={1}
            title="Conceito e o Teste do 'Muito'"
            variant="amber"
          />
          <p className="text-lg text-muted-foreground">
            O <strong>Advérbio</strong> é a classe <strong>invariável</strong>{" "}
            que modifica o verbo, o adjetivo ou outro advérbio.
          </p>
          <div className="text-center p-8 bg-gradient-to-br from-orange-500/5 to-amber-500/5 rounded-2xl border border-orange-500/10">
            <h3 className="text-xl font-bold mb-4">
              Macete: O Teste do 'Muito'
            </h3>
            <p className="text-muted-foreground">
              Troque a palavra por "MUITO". Se ela NÃO FLEXIONAR ("muitos"), é
              ADVÉRBIO.
            </p>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="Palavras Camaleão"
            variant="amber"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted/30 rounded-xl border border-border">
              <p className="font-bold text-amber-500">MEIO (Advérbio)</p>
              <p className="text-xs italic">
                "Ela está <strong>meio</strong> cansada." (Um pouco)
              </p>
            </div>
            <div className="p-4 bg-muted/30 rounded-xl border border-border">
              <p className="font-bold text-blue-500">MEIO (Numeral)</p>
              <p className="text-xs italic">
                "Comeu <strong>meia</strong> pizza." (Metade)
              </p>
            </div>
          </div>
        </section>

        {/* Resumo + Multimídia M6 */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={3}
            title="Resumo e Multimídia"
            variant="amber"
          />
          <LessonTabs
            tabs={[
              {
                id: "video",
                label: "Vídeo Aula",
                icon: LuPlayCircle,
                content: (
                  <div className="w-full flex flex-col items-center py-6">
                    <div className="w-full max-w-3xl">
                      <VideoModal
                        videoId="dQw4w9WgXcQ"
                        title="Resumo: Advérbios"
                        duration="12:00"
                        thumbnail="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000"
                      />
                    </div>
                  </div>
                ),
              },
              {
                id: "macete",
                label: "Macete Visual",
                icon: LuBrain,
                content: (
                  <div className="text-center p-8 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-2xl border border-amber-500/10">
                    <h3 className="text-xl font-bold mb-4">
                      O Teste do 'MUITO'
                    </h3>
                    <div className="text-7xl my-8 animate-bounce">🧐 🎯</div>
                    <p className="text-muted-foreground text-lg italic max-w-xl mx-auto">
                      "Troque por muito. Se não virar 'muitos', é Advérbio e não
                      varia!"
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="mt-16">
          <QuizInterativo
            questoes={qMod6}
            titulo="Advérbio: A Circunstância"
            icone="🏃"
            numero={6}
            variant="amber"
            onComplete={(score) => handleModuleComplete("modulo-6", score)}
          />
        </section>
      </TabsContent>

      {/* ── MÓDULO 7: PREPOSIÇÃO ── */}
      <TabsContent value="modulo-7" className="space-y-12 mt-12">
        <ModuleBanner
          numero={7}
          titulo="A Preposição"
          descricao="O elo de subordinação essencial para a regência e a crase."
          gradiente="bg-gradient-to-br from-slate-600 via-gray-600 to-slate-700"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12 text-justify leading-relaxed">
          <ModuleSectionHeader
            index={1}
            title="Conceito e Contrações"
            variant="slate"
          />
          <p className="text-lg text-muted-foreground">
            A <strong>Preposição</strong> liga dois termos, estabelecendo uma
            relação de dependência entre eles.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/30 rounded-xl text-center">
              <strong>DO</strong> (De + O)
            </div>
            <div className="p-4 bg-muted/30 rounded-xl text-center">
              <strong>NA</strong> (Em + A)
            </div>
            <div className="p-4 bg-muted/30 rounded-xl text-center">
              <strong>PELO</strong> (Per + O)
            </div>
          </div>
        </section>

        {/* Resumo + Multimídia M7 */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={2}
            title="Resumo e Multimídia"
            variant="slate"
          />
          <LessonTabs
            tabs={[
              {
                id: "visual",
                label: "Conectores",
                icon: LuBrain,
                content: (
                  <ModuleSummaryCarouselNew
                    tituloAula="Gramática de Elite"
                    materia="Português"
                    moduloNome="M7: Preposição"
                    images={[
                      {
                        title: "Preposição",
                        type: "Elo de Ligação",
                        placeholderColor: "#64748b",
                      },
                    ]}
                  />
                ),
              },
            ]}
          />
        </section>

        <section className="mt-16">
          <QuizInterativo
            questoes={qMod7}
            titulo="Preposição: O Elo"
            icone="🔗"
            numero={7}
            variant="slate"
            onComplete={(score) => handleModuleComplete("modulo-7", score)}
          />
        </section>
      </TabsContent>

      {/* ── MÓDULO 8: CONJUNÇÃO ── */}
      <TabsContent value="modulo-8" className="space-y-12 mt-12">
        <ModuleBanner
          numero={8}
          titulo="A Conjunção"
          descricao="Os conectivos que articulam as ideias e as orações."
          gradiente="bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-700"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={1}
            title="Coordenativas vs Subordinativas"
            variant="indigo"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-bold text-indigo-500">Coordenativas</h4>
              <p className="text-sm text-muted-foreground italic">
                Adição, Oposição, Alternância, Conclusão, Explicação.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-emerald-500">Subordinativas</h4>
              <p className="text-sm text-muted-foreground italic">
                Causa, Concessão, Condição, Finalidade, Tempo, etc.
              </p>
            </div>
          </div>
        </section>

        {/* Resumo + Multimídia M8 */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={2}
            title="Resumo e Multimídia"
            variant="indigo"
          />
          <LessonTabs
            tabs={[
              {
                id: "visual",
                label: "Macete CIA P",
                icon: LuBrain,
                content: (
                  <div className="text-center p-8 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 rounded-2xl border border-indigo-500/10">
                    <h3 className="text-xl font-bold mb-4">
                      Invariáveis: CIA P
                    </h3>
                    <div className="text-7xl my-8">🕵️‍♂️ 🔒</div>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto font-mono">
                      <strong>C</strong>onjunção, <strong>I</strong>nterjeição,{" "}
                      <strong>A</strong>dvérbio e <strong>P</strong>reposição.
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="mt-16">
          <QuizInterativo
            questoes={qMod8}
            titulo="Conjunção: A Engrenagem"
            icone="⚙️"
            numero={8}
            variant="indigo"
            onComplete={(score) => handleModuleComplete("modulo-8", score)}
          />
        </section>
      </TabsContent>

      {/* ── MÓDULO 9: INTERJEIÇÃO ── */}
      <TabsContent value="modulo-9" className="space-y-12 mt-12">
        <ModuleBanner
          numero={9}
          titulo="A Interjeição"
          descricao="A expressão das emoções e as regras sutis de pontuação."
          gradiente="bg-gradient-to-br from-pink-500 via-rose-500 to-red-600"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12 text-justify leading-relaxed">
          <ModuleSectionHeader
            index={1}
            title="Conceito e Pontuação"
            variant="rose"
          />
          <p className="text-lg text-muted-foreground">
            A <strong>Interjeição</strong> é a palavra invariável que exprime
            emoções, estados de espírito ou apelos.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl bg-orange-500/5 border border-orange-500/20">
              <h4 className="font-bold text-orange-600">O Camaleão "AH!"</h4>
              <p className="text-sm">
                Pode indicar alegria, dor, ironia ou compreensão. O contexto é
                rei.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-blue-500/5 border border-blue-500/20">
              <h4 className="font-bold text-blue-600">Regra de Pontuação</h4>
              <p className="text-sm">
                "Ah! Que bom." (Exclamação na interjeição) vs "Ah, que bom!"
                (Exclamação no final).
              </p>
            </div>
          </div>
        </section>

        {/* Resumo + Multimídia M9 */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={2}
            title="Resumo e Multimídia"
            variant="rose"
          />
          <LessonTabs
            tabs={[
              {
                id: "visual",
                label: "Emoção",
                icon: LuBrain,
                content: (
                  <ModuleSummaryCarouselNew
                    tituloAula="Gramática de Elite"
                    materia="Português"
                    moduloNome="M9: Interjeição"
                    images={[
                      {
                        title: "Interjeição",
                        type: "Expressão",
                        placeholderColor: "#ec4899",
                      },
                    ]}
                  />
                ),
              },
            ]}
          />
        </section>

        <section className="mt-16">
          <QuizInterativo
            questoes={qMod9}
            titulo="Interjeição: A Emoção"
            icone="⚡"
            numero={9}
            variant="rose"
            onComplete={(score) => handleModuleComplete("modulo-9", score)}
          />
        </section>
      </TabsContent>

      {/* ── MÓDULO 10: NUMERAL ── */}
      <TabsContent value="modulo-10" className="space-y-12 mt-12">
        <ModuleBanner
          numero={10}
          titulo="O Numeral"
          descricao="Quantidades, ordens e a pegadinha do numeral dual."
          gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-green-700"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={1}
            title="Cardinais vs Ordinais"
            variant="emerald"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-muted/30 rounded-xl">
              <p className="font-bold">Cardinais (Quantidade)</p>
              <p className="text-sm">Um, dois, três... mil.</p>
            </div>
            <div className="p-6 bg-muted/30 rounded-xl">
              <p className="font-bold">Ordinais (Ordem)</p>
              <p className="text-sm">Primeiro, décimo, centésimo.</p>
            </div>
          </div>
          <AlertBox tipo="warning" titulo="Numeral Dual">
            "Ambos/Ambas" são numerais duais e exigem o artigo: "Ambos os
            funcionários saíram."
          </AlertBox>
        </section>

        {/* Resumo + Multimídia M10 */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={2}
            title="Resumo e Multimídia"
            variant="emerald"
          />
          <LessonTabs
            tabs={[
              {
                id: "visual",
                label: "Atalho Numeral",
                icon: LuBrain,
                content: (
                  <ModuleSummaryCarouselNew
                    tituloAula="Gramática de Elite"
                    materia="Português"
                    moduloNome="M10: Numeral"
                    images={[
                      {
                        title: "Numeral",
                        type: "Quantificação",
                        placeholderColor: "#10b981",
                      },
                    ]}
                  />
                ),
              },
            ]}
          />
        </section>

        <section className="mt-16">
          <QuizInterativo
            questoes={qMod10}
            titulo="Numeral: A Quantidade"
            icone="🔢"
            numero={10}
            variant="emerald"
            onComplete={(score) => handleModuleComplete("modulo-10", score)}
          />
        </section>

        {/* CONCLUSÃO FINAL DA AULA */}
        <section className="mt-24 mb-12">
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/10 dark:via-indigo-900/10 dark:to-purple-900/10 border border-blue-100 dark:border-blue-800/30 rounded-3xl p-12 text-center space-y-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-blue-500/20 transition-all duration-700" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full -ml-16 -mb-16 group-hover:bg-purple-500/20 transition-all duration-700" />

            <div className="flex justify-center mb-4">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-blue-100 dark:border-blue-800 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                <LuBookOpen className="text-5xl text-blue-600 animate-pulse" />
              </div>
            </div>

            <div className="space-y-4 relative z-10">
              <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic underline decoration-blue-500 decoration-4 underline-offset-8">
                Morfologia Dominada!
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                Você concluiu a maratona das 10 classes de palavras. Agora você
                possui a base sólida para enfrentar sintaxe, regência e
                concordância na Cesgranrio!
              </p>
            </div>

            <div className="pt-8">
              <Button
                size="lg"
                onClick={() => {
                  if (onComplete) onComplete();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-800 text-white border-0 font-black text-xl px-16 py-10 rounded-2xl shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:shadow-[0_25px_60px_rgba(37,99,235,0.4)] hover:-translate-y-1 active:translate-y-0.5 transition-all duration-300 uppercase tracking-widest flex items-center gap-4 mx-auto"
              >
                Concluir Aula de Elite <LuCheck className="text-2xl" />
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 pt-8 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Premium Content
              </span>
              <div className="w-1 h-1 bg-slate-300 rounded-full" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                LMS Quest AI
              </span>
              <div className="w-1 h-1 bg-slate-300 rounded-full" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Padrao Cesgranrio
              </span>
            </div>
          </div>
        </section>
      </TabsContent>
    </AulaTemplate>
  );
}
