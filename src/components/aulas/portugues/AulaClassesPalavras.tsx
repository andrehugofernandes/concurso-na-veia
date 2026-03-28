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
    <div className="text-lg space-y-2 font-mono">
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

const i1 = <span className="font-black text-lg text-blue-500">-AR</span>;
const i2 = <span className="font-black text-lg text-emerald-500">-ER</span>;
const i3 = <span className="font-black text-lg text-rose-500">-IR</span>;
const iIr = <span className="font-black text-lg text-amber-500">✦</span>;

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
          gradiente="bg-gradient-to-br from-amber-300 via-amber-500 to-amber-400"
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
          <p className="text-lg text-muted-foreground leading-relaxed text-justify">
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
              {
                titulo: "Próprio vs Comum",
                icone: "2️⃣",
                conteudo:
                  "O substantivo Próprio denomina um ser específico, individualizado, e é escrito com letra maiúscula (Petrobras, Rio de Janeiro). O substantivo Comum designa qualquer elemento de uma classe de seres, escrito com letra minúscula (empresa, cidade).",
              },
              {
                titulo: "Simples vs Composto",
                icone: "3️⃣",
                conteudo:
                  "Simples é formado por um único radical: 'mar', 'flor'. Composto é formado pela junção de dois ou mais radicais: 'guarda-chuva', 'passatempo'. Atenção: a pluralização do substantivo composto é uma armadilha clássica da Cesgranrio.",
              },
              {
                titulo: "Primitivo vs Derivado",
                icone: "4️⃣",
                conteudo:
                  "Primitivo não deriva de outra palavra da língua portuguesa: 'pedra', 'ferro'. Derivado origina-se de outra palavra: 'pedreira' (de pedra), 'ferreiro' (de ferro). A derivação é o principal processo de formação de palavras cobrado em prova.",
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={3}
            title="Substantivos Coletivos — Atenção Máxima"
            variant="blue"
          />
          <p className="text-lg text-muted-foreground leading-relaxed text-justify">
            O substantivo <strong>coletivo</strong> designa, no singular, um conjunto de seres da mesma espécie. A Cesgranrio adora cobrar os coletivos menos óbvios. Vire o card para ver o coletivo correspondente.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                  <span className="text-5xl">🐟</span>
                  <span className="font-bold text-xl text-foreground">Cardume</span>
                  <p className="text-lg text-muted-foreground">Qual é o ser?</p>
                </div>
              }
              verso={
                <div className="flex flex-col justify-center h-full space-y-3 text-center text-lg p-2">
                  <p className="font-black text-blue-400 text-lg">Peixes</p>
                  <hr className="border-border/50" />
                  <p className="text-muted-foreground text-lg">
                    "Um <strong>cardume</strong> de sardinhas bloqueou o sonar."
                  </p>
                </div>
              }
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                  <span className="text-5xl">🌳</span>
                  <span className="font-bold text-xl text-foreground">Arvoredo</span>
                  <p className="text-lg text-muted-foreground">Qual é o ser?</p>
                </div>
              }
              verso={
                <div className="flex flex-col justify-center h-full space-y-3 text-center text-lg p-2">
                  <p className="font-black text-emerald-400 text-lg">Árvores</p>
                  <hr className="border-border/50" />
                  <p className="text-muted-foreground text-lg">
                    "O <strong>arvoredo</strong> às margens do rio foi preservado."
                  </p>
                </div>
              }
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                  <span className="text-5xl">⭐</span>
                  <span className="font-bold text-xl text-foreground">Constelação</span>
                  <p className="text-lg text-muted-foreground">Qual é o ser?</p>
                </div>
              }
              verso={
                <div className="flex flex-col justify-center h-full space-y-3 text-center text-lg p-2">
                  <p className="font-black text-amber-400 text-lg">Estrelas</p>
                  <hr className="border-border/50" />
                  <p className="text-muted-foreground text-lg">
                    "A <strong>constelação</strong> de Órion guia navegadores há séculos."
                  </p>
                </div>
              }
            />
          </div>
          <AlertBox tipo="info" titulo="Dica Cesgranrio: Concordância com Coletivos">
            O substantivo coletivo está no singular, mas o verbo pode concordar com ele (singular) ou com o núcleo implícito (plural). Ex: "A maioria dos funcionários <strong>votou</strong>" (singular, concordância com 'maioria') — forma preferida pela norma culta. Fuja do erro!{" "}
            Outros coletivos importantes: frota (navios/carros), manada (bovinos), alcateia (lobos), enxame (abelhas), penca (bananas), vara (porcos).
          </AlertBox>
        </section>

        {/* Resumo + Multimídia M1 */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={4}
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
            index={5}
            title="Derivação Imprópria — O 'Efeito Rei Midas'"
            variant="blue"
          />
          <div className="bg-amber-500/10 border-l-4 border-amber-500 p-5 rounded-xl mb-6 text-lg text-foreground">
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
                <div className="flex flex-col justify-center h-full space-y-4 text-center text-lg p-2">
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
                <div className="flex flex-col justify-center h-full space-y-4 text-center text-lg p-2">
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
                <div className="flex flex-col justify-center h-full space-y-4 text-center text-lg p-2">
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

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={6}
            title="Gênero dos Substantivos — Os Heterônimos"
            variant="blue"
          />
          <p className="text-lg text-muted-foreground leading-relaxed text-justify">
            Os <strong>heterônimos</strong> são substantivos que formam o feminino através de palavras completamente diferentes (radicais distintos). São fontes frequentes de pegadinhas em prova de ortografia e concordância.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              ["bode", "cabra"],
              ["boi", "vaca"],
              ["carneiro", "ovelha"],
              ["cavalo", "égua"],
              ["frade", "freira"],
              ["genro", "nora"],
              ["homem", "mulher"],
              ["padrinho", "madrinha"],
            ].map(([m, f], i) => (
              <div key={i} className="p-3 bg-muted/30 rounded-xl border border-border text-center text-lg">
                <span className="font-bold text-blue-500">{m}</span>
                <span className="mx-2 text-muted-foreground">/</span>
                <span className="font-bold text-rose-400">{f}</span>
              </div>
            ))}
          </div>
          <AlertBox tipo="info" titulo="Substantivos de Gênero Duvidoso — Cesgranrio Cobra!">
            Alguns substantivos têm gênero que causa dúvida: são MASCULINOS: o personagem, o dó (nota musical), o tapa, o êxtase, o estratagema, o tema, o poema, o dilema, o plasma. São FEMININOS: a alface, a personagem (em gramáticas tradicionais), a cal, a dinamite, a pane, a gênese. Em caso de dúvida em prova, lembre-se: consultar o gênero canônico na gramática Normativa Bechara é o critério da Cesgranrio.
          </AlertBox>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={7}
            title="Plural dos Substantivos Compostos"
            variant="blue"
          />
          <ContentAccordion
            mode="stacked"
            titulo="Regras de Pluralização"
            icone={<LuHash />}
            corIndicador="bg-blue-500"
            slides={[
              {
                titulo: "Substantivo + Substantivo (sem hífen ou com)",
                icone: "📚",
                conteudo:
                  "Ambos os elementos variam: 'couve-flor' → 'couves-flores'; 'pombo-correio' → 'pombos-correio' (segundo é invariável quando indica função). Regra geral: se ambos forem substantivos de igual valor, os dois variam. Exceção: quando o segundo funciona como determinante do primeiro, só o primeiro varia.",
              },
              {
                titulo: "Substantivo + Adjetivo / Adjetivo + Substantivo",
                icone: "🔤",
                conteudo:
                  "Ambos os elementos variam: 'amor-perfeito' → 'amores-perfeitos'; 'gentil-homem' → 'gentis-homens'; 'alto-relevo' → 'altos-relevos'. Quando o adjetivo 'grão' ou 'grã' aparece, só o segundo elemento varia: 'grão-mestre' → 'grão-mestres'.",
              },
              {
                titulo: "Verbo + Substantivo / Verbo + Advérbio",
                icone: "⚙️",
                conteudo:
                  "Só o substantivo varia (o verbo fica invariável): 'guarda-chuva' → 'guarda-chuvas'; 'porta-mala' → 'porta-malas'; 'beija-flor' → 'beija-flores'. Com verbo + advérbio: ambos ficam invariáveis: 'bota-fora' → 'bota-foras' (o 's' vai para o final, indicando o plural do conjunto).",
              },
              {
                titulo: "Palavras Repetidas / Onomatopeias",
                icone: "🔁",
                conteudo:
                  "Só o último elemento varia: 'pingue-pongue' → 'pingue-pongues'; 'reco-reco' → 'reco-recos'. Para as formas com elemento invariável (bem, mal, além, aquém): 'bem-estar' → 'bens-estares'; 'mal-entendido' → 'mal-entendidos'. Atenção: 'mal' antes de vogal não leva hífen: 'malentendido' (novo acordo ortográfico).",
              },
            ]}
          />
          <AlertBox tipo="warning" titulo="Novo Acordo Ortográfico — O que mudou no hífen">
            O Acordo Ortográfico de 1990 modificou diversas regras do hífen em compostos. Não se usa mais hífen: entre prefixo terminado em vogal e segundo elemento começado por vogal diferente (coabitação), entre prefixo e R ou S (antessala, ultrassom). Usa-se hífen: entre prefixo e segundo elemento com H (anti-higiênico), entre prefixo terminado em vogal e segundo com mesma vogal (micro-ondas), e com 'sub' antes de vogal (sub-humano). A Cesgranrio tem cobrado esse tema!
          </AlertBox>
          <AlertBox tipo="success" titulo="Estratégia de Prova — Plural de Compostos">
            Quando em dúvida sobre o plural de um composto, pergunte: "O segundo elemento é uma preposição, advérbio invariável ou numeral?" → Se sim, só o primeiro varia: guarda-POR-vida → guardas-por-vida. "É verbo?" → Fica invariável. "São dois substantivos de igual hierarquia?" → Os dois variam. Essa lógica cobre 90% das questões de concurso sobre plural de compostos.{" "}
            <strong>Exemplos extras:</strong> segunda-feira → segundas-feiras; pé-de-moleque → pés-de-moleque; mata-borrão → mata-borrões; amor-perfeito → amores-perfeitos; salvo-conduto → salvos-condutos.
          </AlertBox>
        </section>

        <section className="mt-16">
          <QuizInterativo
            questoes={qMod1}
            titulo="QUIZ: Substantivo: O Nomeador"
            icone="🎯"
            numero={8}
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
          gradiente="bg-gradient-to-br from-blue-300 via-blue-500 to-blue-400"
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
                  <p className="text-lg text-muted-foreground uppercase tracking-widest">
                    Depois do Substantivo
                  </p>
                  <p className="text-lg">
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
                  <p className="text-muted-foreground text-lg">
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
                  <p className="text-lg text-muted-foreground uppercase tracking-widest">
                    Antes do Substantivo
                  </p>
                  <p className="text-lg">
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
                  <p className="text-muted-foreground text-lg">
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

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={3}
            title="Adjetivo Composto e Locução Adjetiva"
            variant="emerald"
          />
          <ContentAccordion
            mode="stacked"
            titulo="Tópicos Avançados"
            icone={<LuTag />}
            corIndicador="bg-emerald-500"
            slides={[
              {
                titulo: "Adjetivo Composto (Plurimodificador)",
                icone: "🔗",
                conteudo:
                  "O adjetivo composto é formado por dois ou mais radicais unidos por hífen. Na pluralização, apenas o ÚLTIMO elemento varia: 'camisas verde-escuras', 'acordos luso-brasileiros'. Exceção: quando o segundo elemento é substantivo, fica invariável: 'camisas verde-musgo', 'olhos castanho-claro'.",
              },
              {
                titulo: "Locução Adjetiva",
                icone: "📌",
                conteudo:
                  "É um conjunto de palavras (geralmente preposição + substantivo) que exerce a função de adjetivo. Exemplos: 'amor de mãe' = amor materno; 'casca de árvore' = casca arbórea; 'leite de vaca' = leite bovino. A prova pode pedir a substituição de uma locução pelo adjetivo equivalente.",
              },
              {
                titulo: "Grau do Adjetivo",
                icone: "📊",
                conteudo:
                  "Comparativo: de superioridade (mais alto do que), de igualdade (tão alto quanto), de inferioridade (menos alto do que). Superlativo absoluto analítico (muito alto) ou sintético (altíssimo). Superlativo relativo de superioridade (o mais alto de) e de inferioridade (o menos alto de). Formas sintéticas irregulares: bom→ótimo, mau→péssimo, grande→máximo, pequeno→mínimo.",
              },
            ]}
          />
          <AlertBox tipo="danger" titulo="Armadilha: Adjetivo Pátrio">
            Adjetivos pátrios derivados de gentílicos podem ser cobrados na Cesgranrio como adjetivos ou substantivos. Ex: "técnica <strong>brasileira</strong>" (adjetivo) vs "o <strong>brasileiro</strong> trabalha muito" (substantivo por derivação imprópria). Lembre-se: adjetivos pátrios compostos só variam no último elemento — "acordos <strong>ítalo-brasileiros</strong>", nunca "ítalo-brasileira" no masculino plural.
          </AlertBox>
        </section>

        {/* Resumo + Multimídia M2 */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={4}
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
            titulo="QUIZ: Adjetivo: O Qualificador"
            icone="✨"
            numero={5}
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
          gradiente="bg-gradient-to-br from-emerald-300 via-emerald-500 to-emerald-400"
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
                  <p className="text-lg">Fica invariável (masculino).</p>
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
                  <p className="text-muted-foreground text-lg">
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
                  <p className="text-lg">Ocorre a concordância.</p>
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
                  <p className="text-muted-foreground text-lg">
                    (Aquela entrada específica)
                  </p>
                </div>
              }
            />
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={3}
            title="Usos Especiais do Artigo"
            variant="amber"
          />
          <ContentAccordion
            mode="stacked"
            titulo="Casos Avançados"
            icone={<LuBookOpen />}
            corIndicador="bg-amber-500"
            slides={[
              {
                titulo: "Artigo Definido — Quando usar",
                icone: "🎯",
                conteudo:
                  "Use o artigo definido (o, a, os, as) para referir-se a um ser já conhecido ou único: 'O presidente assinou o contrato' (aquele presidente específico). Obrigatório após o numeral ordinal em títulos: 'D. Pedro II', 'Henrique VIII'. Exige combinação com preposição: DE + O = DO, EM + A = NA, POR + O = PELO.",
              },
              {
                titulo: "Artigo Indefinido — Quando usar",
                icone: "❓",
                conteudo:
                  "Use o artigo indefinido (um, uma, uns, umas) para referir-se a um ser não identificado: 'Um funcionário ligou' (não sabemos quem). Pode indicar aproximação: 'Eram umas três horas.' Curiosidade: 'uns' e 'umas' são formas de plural que frequentemente indicam quantidade aproximada em linguagem coloquial.",
              },
              {
                titulo: "Artigo Zero (Ausência de Artigo)",
                icone: "⭕",
                conteudo:
                  "A ausência de artigo é chamada de 'artigo zero' e também carrega significado. 'Cão late' (qualquer cão, generalização) vs 'O cão late' (cão específico). Em avisos e placas, a ausência do artigo é padrão: 'Proibido entrada', 'Silêncio'. Essa distinção é cobrada em questões de reescrita.",
              },
              {
                titulo: "Artigo como Substantivador",
                icone: "✨",
                conteudo:
                  "O artigo é o principal substantivador da língua ('Efeito Rei Midas'). Qualquer classe de palavra antecedida por artigo torna-se substantivo: 'O sim que esperávamos chegou' (advérbio 'sim' → substantivo); 'O belo me atrai' (adjetivo 'belo' → substantivo). Esse fenômeno chama-se derivação imprópria.",
              },
            ]}
          />
          <AlertBox tipo="warning" titulo="Artigo com Nomes Próprios — Cesgranrio Adora!">
            Alguns nomes de países pedem artigo (o Brasil, a França, os Estados Unidos) e outros não (Portugal, Moçambique, Cuba). Nomes de pessoas famosas podem receber artigo em registro informal: "A Petrobras anunciou..." — neste caso, o artigo é parte do nome. Em provas de reescrita, remover ou acrescentar artigo pode alterar o registro do texto.
          </AlertBox>
        </section>

        {/* Resumo + Multimídia M3 */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={4}
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

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={5}
            title="Artigo e Concordância — Casos Especiais Cesgranrio"
            variant="amber"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                  <span className="text-5xl">🇧🇷</span>
                  <span className="font-black text-xl text-amber-500">O Brasil vs Portugal</span>
                  <p className="text-lg text-muted-foreground">Como fica o artigo?</p>
                </div>
              }
              verso={
                <div className="flex flex-col justify-center h-full space-y-2 p-2 text-lg">
                  <p className="text-emerald-400 font-bold">✅ Fui AO Brasil. (artigo obrigatório)</p>
                  <p className="text-emerald-400 font-bold">✅ Fui a Portugal. (sem artigo)</p>
                  <hr className="border-border/50" />
                  <p className="text-lg text-muted-foreground">Países que pedem artigo: Brasil, EUA, Argentina, França, China, Japão, Alemanha. Países sem artigo: Portugal, Cuba, Moçambique, Angola, Israel.</p>
                </div>
              }
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                  <span className="text-5xl">🏢</span>
                  <span className="font-black text-xl text-amber-500">A Petrobras</span>
                  <p className="text-lg text-muted-foreground">Artigo e concordância</p>
                </div>
              }
              verso={
                <div className="flex flex-col justify-center h-full space-y-2 p-2 text-lg">
                  <p className="text-emerald-400 font-bold">✅ "A Petrobras anunciou seus resultados."</p>
                  <p className="text-blue-400 text-lg">O artigo é parte do nome próprio da empresa e exige concordância feminina.</p>
                  <hr className="border-border/50" />
                  <p className="text-red-400 font-bold">❌ "O Petrobras anunciou" — artigo masculino com substantivo feminino.</p>
                </div>
              }
            />
          </div>
          <ContentAccordion
            mode="stacked"
            titulo="Artigo com Nomes Próprios e Títulos"
            icone={<LuBookOpen />}
            corIndicador="bg-amber-500"
            slides={[
              {
                titulo: "Artigo com Nomes de Pessoas",
                icone: "👤",
                conteudo:
                  "Na norma culta escrita, evita-se o artigo diante de nomes próprios de pessoas: 'Pedro chegou' (formal). Na linguagem oral informal do Brasil, o artigo é comum: 'O Pedro chegou'. Em provas de concurso, o contexto do registro é determinante — textos formais pedem ausência de artigo diante de nomes próprios de pessoas.",
              },
              {
                titulo: "Artigo com Nomes Geográficos",
                icone: "🗺️",
                conteudo:
                  "Cidades geralmente não pedem artigo: 'Fui a Brasília', 'Venho de Manaus'. Exceção: cidades com artigo incorporado ao nome: 'O Cairo', 'A Haia', 'O Rio de Janeiro'. Estados e países variam (ver regras acima). Prova: 'Trabalhei __ Petrobras no Rio de Janeiro' → NA Petrobras (em + a, crase do artigo).",
              },
            ]}
          />
        </section>

        <section className="mt-16">
          <QuizInterativo
            questoes={qMod3}
            titulo="QUIZ: Artigo: O Determinante"
            icone="🏷️"
            numero={6}
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
          gradiente="bg-gradient-to-br from-rose-300 via-rose-500 to-rose-400"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={1}
            title="Pessoais: Reto vs Oblíquo"
            variant="violet"
          />
          <div className="overflow-hidden rounded-xl border border-border bg-muted/30">
            <table className="w-full text-lg text-left">
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
              <p className="text-lg text-muted-foreground italic">
                Antes do verbo
              </p>
              <p className="text-lg">
                "Não <strong>me</strong> diga!"
              </p>
              <div className="text-[11px] bg-white dark:bg-black/20 p-2 rounded">
                Fatores: palavras negativas, advérbios, pronomes relativos.
              </div>
            </div>
            <div className="p-6 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-4">
              <h4 className="font-bold text-emerald-600 text-lg">Ênclise</h4>
              <p className="text-lg text-muted-foreground italic">
                Depois do verbo
              </p>
              <p className="text-lg">
                "Diga-<strong>me</strong> a verdade."
              </p>
              <div className="text-[11px] bg-white dark:bg-black/20 p-2 rounded">
                Padrão quando a frase começa com verbo ou no imperativo.
              </div>
            </div>
            <div className="p-6 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-4">
              <h4 className="font-bold text-amber-600 text-lg">Mesóclise</h4>
              <p className="text-lg text-muted-foreground italic">
                No meio do verbo
              </p>
              <p className="text-lg">
                "Dir-<strong>te</strong>-ei tudo."
              </p>
              <div className="text-[11px] bg-white dark:bg-black/20 p-2 rounded">
                Exclusiva para Futuro do Presente e do Pretérito (se não houver
                próclise).
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={3}
            title="Pronomes Possessivos, Demonstrativos e Relativos"
            variant="violet"
          />
          <ContentAccordion
            mode="stacked"
            titulo="Subclasses Essenciais"
            icone={<LuShield />}
            corIndicador="bg-violet-500"
            slides={[
              {
                titulo: "Pronomes Possessivos",
                icone: "🏠",
                conteudo:
                  "Indicam posse: meu/minha, teu/tua, seu/sua, nosso/nossa, vosso/vossa. Atenção: 'seu/sua' pode ser ambíguo (2ª ou 3ª pessoa). Em textos formais, prefira 'dele/dela' para evitar ambiguidade: 'O gerente entregou o relatório a seu superior' → qual 'seu'? Resolva com: 'entregou o relatório ao superior DELE'.",
              },
              {
                titulo: "Pronomes Demonstrativos",
                icone: "👉",
                conteudo:
                  "Este/esta/isto (perto de quem fala — 1ª pessoa); esse/essa/isso (perto de quem ouve — 2ª pessoa, ou já mencionado no texto); aquele/aquela/aquilo (longe de ambos — 3ª pessoa, ou mencionado antes). Em textos escritos: 'este' refere-se ao que vem a seguir (catáfora); 'esse' refere-se ao que veio antes (anáfora).",
              },
              {
                titulo: "Pronomes Indefinidos",
                icone: "🌫️",
                conteudo:
                  "Referem-se ao substantivo de modo vago: alguém, ninguém, tudo, nada, qualquer, todo, cada, muito, pouco, certo, vário. Cuidado: 'todo' com artigo = totalidade ('todo o documento' = o documento inteiro); sem artigo = qualquer ('todo documento deve ser assinado' = qualquer documento).",
              },
              {
                titulo: "Pronomes Relativos",
                icone: "🔄",
                conteudo:
                  "Retomam um termo anterior (antecedente) e iniciam uma oração adjetiva: que (mais usado), o qual/a qual/os quais/as quais (mais formal), quem (para pessoas), cujo/cuja (posse), onde (lugar). O pronome relativo 'que' substitui qualquer antecedente. 'O qual' é usado após preposições de duas ou mais sílabas: 'mediante o qual', 'durante o qual'.",
              },
            ]}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                  <LuBookOpen className="h-10 w-10 text-violet-400" />
                  <span className="font-black text-2xl text-violet-400">CUJO</span>
                  <p className="text-lg text-muted-foreground">A armadilha mais perigosa da prova</p>
                </div>
              }
              verso={
                <div className="flex flex-col justify-center h-full space-y-3 p-2 text-lg">
                  <p className="text-emerald-400 font-bold">✅ "O relatório CUJAS conclusões foram aprovadas"</p>
                  <hr className="border-border/50" />
                  <p className="text-red-400 font-bold">❌ "cujas AS conclusões" — artigo proibido após cujo!</p>
                  <hr className="border-border/50" />
                  <p className="text-blue-400 text-lg">Concorda em gênero/número com o POSSUÍDO, não com o possuidor.</p>
                </div>
              }
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                  <LuNavigation className="h-10 w-10 text-amber-400" />
                  <span className="font-black text-2xl text-amber-400">ONDE</span>
                  <p className="text-lg text-muted-foreground">Pronome relativo de lugar</p>
                </div>
              }
              verso={
                <div className="flex flex-col justify-center h-full space-y-3 p-2 text-lg">
                  <p className="text-emerald-400 font-bold">✅ "A empresa onde trabalho é sólida."</p>
                  <hr className="border-border/50" />
                  <p className="text-red-400 font-bold">❌ "onde" para antecedente não-lugar: "A situação onde me encontro..." → use "em que".</p>
                  <hr className="border-border/50" />
                  <p className="text-blue-400 text-lg">'Onde' exige antecedente com ideia de LUGAR.</p>
                </div>
              }
            />
          </div>
          <AlertBox tipo="danger" titulo="Oblíquo Tônico — Erro Fatal Cesgranrio">
            Pronomes oblíquos tônicos (mim, ti, si, ele com preposição) são precedidos de preposição: "para mim", "consigo", "entre nós". O erro "entre eu e tu" é gravíssimo na norma culta. Correto: "entre mim e ti". A CESGRANRIO frequentemente apresenta reescritas que trocam "mim" por "eu" para testar o candidato.
          </AlertBox>
        </section>

        {/* Resumo + Multimídia M4 */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={4}
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

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={5}
            title="Pronomes de Tratamento — A Armadilha do Concurso"
            variant="violet"
          />
          <p className="text-lg text-muted-foreground leading-relaxed text-justify">
            Os pronomes de tratamento são formas especiais de se referir a pessoas de forma respeitosa ou protocolar. São a fonte de uma das pegadinhas mais clássicas da Cesgranrio: apesar de se referirem à <strong>2ª pessoa</strong> (o interlocutor), exigem o verbo e os pronomes na <strong>3ª pessoa do singular</strong>.
          </p>
          <div className="overflow-hidden rounded-xl border border-border bg-muted/30">
            <table className="w-full text-lg text-left">
              <thead className="bg-muted text-foreground font-bold uppercase text-[10px] tracking-widest">
                <tr>
                  <th className="p-4">Pronome</th>
                  <th className="p-4">Abreviatura</th>
                  <th className="p-4">Uso</th>
                  <th className="p-4">Possessivo Correto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-lg">
                {[
                  ["Vossa Excelência", "V. Exa.", "Presidente, Ministro, Governador, Senador", "de V. Exa."],
                  ["Vossa Senhoria", "V. Sa.", "Pessoas de destaque, autoridades em geral", "de V. Sa."],
                  ["Vossa Magnificência", "V. Mag.", "Reitores de universidades", "de V. Mag."],
                  ["Vossa Santidade", "V. S.", "Papa", "de V. S."],
                  ["Vossa Majestade", "V. M.", "Reis e Rainhas", "de V. M."],
                ].map(([p, abr, uso, pos], i) => (
                  <tr key={i} className="hover:bg-muted/50 transition-colors">
                    <td className="p-4 font-bold text-violet-600">{p}</td>
                    <td className="p-4 text-muted-foreground">{abr}</td>
                    <td className="p-4 text-muted-foreground">{uso}</td>
                    <td className="p-4 font-medium text-emerald-600">{pos}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <AlertBox tipo="danger" titulo="Concordância com Pronome de Tratamento — Questão Clássica">
            "Vossa Excelência está cansado?" — ERRADO! O correto é: "Vossa Excelência está cansad<strong>a</strong>?" se a pessoa for mulher, ou "Vossa Excelência está cansad<strong>o</strong>?" se homem. O verbo vai para a 3ª pessoa: "V. Exa. <strong>assinou</strong> o contrato" (não 'assinastes'). Os pronomes possessivos e oblíquos correspondentes também ficam na 3ª pessoa: "Trouxemos <strong>sua</strong> pasta, Vossa Excelência."
          </AlertBox>
        </section>

        <section className="mt-16">
          <QuizInterativo
            questoes={qMod4}
            titulo="QUIZ: Pronome: O Substituto"
            icone="👤"
            numero={6}
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
          gradiente="bg-gradient-to-br from-violet-300 via-violet-500 to-violet-400"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12 text-justify leading-relaxed">
          <ModuleSectionHeader
            index={1}
            title="Conceito e Classificação dos Verbos"
            variant="rose"
          />
          <p className="text-lg text-muted-foreground">
            O <strong>Verbo</strong> é a classe de palavra que exprime{" "}
            <strong>ação, estado, fenômeno natural ou processo</strong>, situando
            o fato no <strong>tempo</strong>. É a classe mais flexionada da
            língua (modo, tempo, número, pessoa e voz).
          </p>
          <ContentAccordion
            mode="stacked"
            titulo="Tipos de Verbos"
            icone={<LuActivity />}
            corIndicador="bg-rose-500"
            slides={[
              {
                titulo: "Regulares",
                icone: "✅",
                conteudo:
                  "Verbos regulares mantêm o radical inalterado e seguem o modelo de conjugação de sua classe (-AR, -ER, -IR). Exemplos: amar, vender, partir. São a maioria dos verbos da língua e o ponto de partida para entender os irregulares.",
              },
              {
                titulo: "Irregulares",
                icone: "⚠️",
                conteudo:
                  "Verbos irregulares sofrem alterações no radical ou nas desinências que não seguem o modelo padrão. Exemplos: ser (sou, és, é...), ir (vou, vais, vai...), ter (tenho, tens, tem...), fazer (faço, faz...), poder (posso, podes...). São os mais cobrados na Cesgranrio!",
              },
              {
                titulo: "Defectivos",
                icone: "🚫",
                conteudo:
                  "Verbos defectivos são aqueles que não possuem conjugação completa — faltam formas em determinados tempos ou pessoas. Os mais cobrados: ABOLIR e COLORIR (não têm 1ª pessoa do singular do presente: não se diz 'eu abolo'); PRECAVER (conjugado como 'vir'); verbos de fenômenos naturais como CHOVER, NEVAR, VENTAR (impessoais, usados apenas na 3ª pessoa do singular).",
              },
              {
                titulo: "Abundantes",
                icone: "🔀",
                conteudo:
                  "Verbos abundantes possuem duas ou mais formas equivalentes para uma mesma conjugação. O caso mais cobrado é o do particípio passado: aceitar → aceitado (regular) / aceito (irregular); entregar → entregado / entregue; matar → matado / morto; pagar → pagado / pago. Regra prática: com auxiliar TER/HAVER → particípio regular; com auxiliar SER/ESTAR → particípio irregular.",
              },
              {
                titulo: "Formas Nominais",
                icone: "📝",
                conteudo:
                  "O verbo possui três formas nominais que exercem funções de outras classes: INFINITIVO (amar, vender, partir) = função de substantivo; GERÚNDIO (amando, vendendo, partindo) = função de advérbio ou adjetivo; PARTICÍPIO (amado, vendido, partido) = função de adjetivo. O gerúndio é frequentemente cobrado em questões de reescrita — cuidado com o 'gerundismo' (estar fazendo ao invés de fazer).",
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="Vozes Verbais e Passiva Pronominal"
            variant="rose"
          />
          <Comparison
            title="Ativa vs Passiva Analítica vs Passiva Sintética"
            left={{
              title: "Voz Ativa",
              content: "Sujeito pratica a ação\n\"A Petrobras extraiu o petróleo.\"\nSujeito = Petrobras (agente)\nObjeto Direto = o petróleo",
              description: "Forma direta",
              variant: "success",
            }}
            right={{
              title: "Voz Passiva",
              content: "Sujeito recebe a ação\n\"O petróleo foi extraído pela Petrobras.\"\nSujeito = petróleo (paciente)\nAgente da passiva = pela Petrobras",
              description: "Forma transformada",
              variant: "info",
            }}
          />
          <AlertBox tipo="warning" titulo="Passiva Pronominal — A Pegadinha">
            A passiva pronominal usa o pronome SE como partícula apassivadora: "Extrai-se petróleo em Campos." (= O petróleo é extraído). O verbo concorda com o sujeito paciente: "Extraem-se plataformas novas." Confundir SE apassivador com SE indeterminador é um erro clássico de prova.
          </AlertBox>
        </section>

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
            index={4}
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
                  <p className="text-lg">
                    Sentido de <strong>EXISTIR</strong> ou{" "}
                    <strong>OCORRER</strong>.
                  </p>
                </li>
                <li className="flex gap-3">
                  <LuCheck className="text-emerald-500 shrink-0 mt-1" />
                  <p className="text-lg">
                    Fica sempre no <strong>SINGULAR</strong> (3ª pessoa).
                  </p>
                </li>
              </ul>
              <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-lg italic">
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
                  <p className="text-lg">
                    Indicando <strong>TEMPO DECORRIDO</strong>.
                  </p>
                </li>
                <li className="flex gap-3">
                  <LuCheck className="text-emerald-500 shrink-0 mt-1" />
                  <p className="text-lg">
                    Fica sempre no <strong>SINGULAR</strong>.
                  </p>
                </li>
              </ul>
              <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-lg italic">
                ✅ "Faz dez anos." (Certo) <br />❌ "Fazem dez anos." (Errado)
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={5}
            title="Modos Verbais — Indicativo, Subjuntivo e Imperativo"
            variant="rose"
          />
          <ContentAccordion
            mode="stacked"
            titulo="Os Três Modos"
            icone={<LuZap />}
            corIndicador="bg-rose-500"
            slides={[
              {
                titulo: "Modo Indicativo",
                icone: "🔵",
                conteudo:
                  "Expressa fatos reais, certos ou tidos como certos. É o modo da afirmação e da certeza. Tempos: Presente ('trabalha'), Pretérito Perfeito ('trabalhou'), Pretérito Imperfeito ('trabalhava'), Pretérito Mais-que-Perfeito ('trabalhara'), Futuro do Presente ('trabalhará'), Futuro do Pretérito ('trabalharia'). O Futuro do Pretérito (condicional) é usado em suposições e pedidos formais: 'Poderia me ajudar?'",
              },
              {
                titulo: "Modo Subjuntivo",
                icone: "🟡",
                conteudo:
                  "Expressa fatos incertos, duvidosos, desejados ou subordinados. É o modo da hipótese e da subordinação. Tempos: Presente ('que trabalhe'), Pretérito Imperfeito ('se trabalhasse'), Futuro ('quando trabalhar'). O Subjuntivo Presente é obrigatório após conjunções como EMBORA, PARA QUE, A FIM DE QUE, OXALÁ, TALVEZ: 'Embora trabalhe muito, não avança' (não 'trabalha').",
              },
              {
                titulo: "Modo Imperativo",
                icone: "🔴",
                conteudo:
                  "Expressa ordem, pedido, conselho ou proibição. Afirmativo: usa o presente do indicativo para 2ª pessoa (tu/vós) e o presente do subjuntivo para as demais: 'Trabalha tu!' / 'Trabalhe você!' Negativo: usa o presente do subjuntivo para todas as pessoas: 'Não trabalhes tu!' / 'Não trabalhe você!' Esta distinção é frequentemente cobrada em questões de uso formal da língua.",
              },
            ]}
          />
          <AlertBox tipo="warning" titulo="Correlação dos Tempos Verbais — Cesgranrio Cobra!">
            A correlação entre tempos é essencial em reescrita: Se o verbo da principal está no FUTURO DO PRESENTE → o verbo da subordinada vai para o FUTURO DO SUBJUNTIVO: "Avisarei quando <strong>chegar</strong>." Se está no FUTURO DO PRETÉRITO → vai para o PRETÉRITO IMPERFEITO DO SUBJUNTIVO: "Avisaria quando <strong>chegasse</strong>." Errar essa correlação invalida a reescrita.
          </AlertBox>
        </section>

        <section className="mt-16">
          <QuizInterativo
            questoes={qMod5}
            titulo="QUIZ: Verbo: O Motor da Oração"
            icone="⚡"
            numero={6}
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
          gradiente="bg-gradient-to-br from-amber-900 via-amber-500 to-amber-800"
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
              <p className="text-lg italic">
                "Ela está <strong>meio</strong> cansada." (Um pouco)
              </p>
            </div>
            <div className="p-4 bg-muted/30 rounded-xl border border-border">
              <p className="font-bold text-blue-500">MEIO (Numeral)</p>
              <p className="text-lg italic">
                "Comeu <strong>meia</strong> pizza." (Metade)
              </p>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={3}
            title="Locuções Adverbiais e Classificação"
            variant="amber"
          />
          <ContentAccordion
            mode="stacked"
            titulo="Advérbios em Detalhe"
            icone={<LuNavigation />}
            corIndicador="bg-amber-500"
            slides={[
              {
                titulo: "Locuções Adverbiais",
                icone: "🔗",
                conteudo:
                  "São grupos de palavras que funcionam como advérbio: 'de repente' (modo), 'de vez em quando' (frequência), 'com certeza' (afirmação), 'à noite' (tempo), 'por acaso' (dúvida), 'em vão' (modo). São invariáveis e exercem a mesma função do advérbio simples. Em prova, podem aparecer em questões pedindo substituição por um advérbio simples equivalente.",
              },
              {
                titulo: "Grau do Advérbio",
                icone: "📊",
                conteudo:
                  "O advérbio admite grau comparativo e superlativo, mas NUNCA flexiona em gênero ou número. Comparativo de superioridade: 'trabalha MAIS rapidamente'; de igualdade: 'trabalha TÃO rapidamente quanto'; de inferioridade: 'trabalha MENOS rapidamente'. Superlativo: 'trabalha muitíssimo rapidamente' ou 'trabalha muito, muito rapidamente'. O superlativo sintético (rapidíssimo) é correto quando modifica adjetivo.",
              },
              {
                titulo: "Advérbio vs Adjetivo — A Diferença Fatal",
                icone: "⚔️",
                conteudo:
                  "O advérbio modifica VERBO, ADJETIVO ou outro ADVÉRBIO e é invariável. O adjetivo modifica SUBSTANTIVO e concorda em gênero e número. 'Os funcionários trabalham RÁPIDO' → rápido = advérbio (invariável). 'Os funcionários são RÁPIDOS' → rápidos = adjetivo (flexiona). 'Falaram CLARO' vs 'Tom CLARO'. Use o teste do 'muito' para diferenciar: se troca por 'muito' sem virar 'muitos', é advérbio.",
              },
              {
                titulo: "Advérbios Interrogativos",
                icone: "❓",
                conteudo:
                  "São advérbios que introduzem perguntas ou orações subordinadas adverbiais: ONDE (lugar), QUANDO (tempo), COMO (modo), POR QUE (causa — separado, com acento na interrogativa direta e indireta). Atenção: PORQUE (junto, sem acento) = conjunção causal/explicativa; POR QUE (separado) = advérbio interrogativo; PORQUÊ (junto, com acento) = substantivo; POR QUÊ (separado, com acento) = final de frase.",
              },
            ]}
          />
          <Comparison
            title="BOM vs BEM — MAU vs MAL: A Pegadinha da Cesgranrio"
            left={{
              title: "BOM / MAU (Adjetivos)",
              content: "Modificam SUBSTANTIVO\nConcordam em gênero e número\n\"É um BOM relatório\"\n\"Foi uma MÁ decisão\"\n\"São bons analistas\"",
              description: "Classes adjetivas",
              variant: "success",
            }}
            right={{
              title: "BEM / MAL (Advérbios)",
              content: "Modificam VERBO ou ADJETIVO\nSão invariáveis — nunca flexionam\n\"Ele trabalha BEM\"\n\"Ela se saiu MAL na prova\"\n\"Está BEM preparado\" (modifica adjetivo)",
              description: "Classes adverbiais",
              variant: "info",
            }}
          />
          <AlertBox tipo="danger" titulo="Erro Clássico: 'Ele é bem o funcionário certo'">
            Neste exemplo, BEM modifica o adjetivo 'certo' — correto! Mas "Ele é bom o funcionário" está errado, pois 'bom' não pode modificar 'funcionário' sem ser predicativo. Questões de reescrita da Cesgranrio frequentemente propõem trocar BEM por BOM (ou vice-versa) para testar se o candidato percebe a mudança de classe gramatical.
          </AlertBox>
        </section>

        {/* Resumo + Multimídia M6 */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={4}
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
            titulo="QUIZ: Advérbio: A Circunstância"
            icone="🏃"
            numero={5}
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
          gradiente="bg-gradient-to-br from-blue-900 via-blue-500 to-blue-800"
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

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="Preposições Essenciais vs Acidentais"
            variant="slate"
          />
          <ContentAccordion
            mode="stacked"
            titulo="Classificação das Preposições"
            icone={<LuLink2 />}
            corIndicador="bg-slate-500"
            slides={[
              {
                titulo: "Preposições Essenciais",
                icone: "🔑",
                conteudo:
                  "São palavras que funcionam EXCLUSIVAMENTE como preposição: a, ante, após, até, com, contra, de, desde, em, entre, para, perante, por, sem, sob, sobre, trás. Memorize: 'A ANTE APÓS ATÉ CON(TRA) DE(SDE) EM ENTRE PARA PERANTE POR SEM SOB SOBRE TRÁS'.",
              },
              {
                titulo: "Preposições Acidentais",
                icone: "🎭",
                conteudo:
                  "São palavras de outra classe que eventualmente exercem função de preposição: COMO (modo/comparação), CONFORME, SEGUNDO, DURANTE, EXCETO, FORA, SALVO, MENOS, VISTO (preposição composta), MEDIANTE, CONSOANTE. Ex: 'Agiu CONFORME o regulamento' — 'conforme' é preposição acidental.",
              },
              {
                titulo: "Valores Semânticos das Preposições",
                icone: "🌐",
                conteudo:
                  "As preposições carregam significados distintos: DE (origem, posse, matéria, causa): 'vou DE São Paulo'; PARA (destino, finalidade, beneficiário): 'trabalha PARA a Petrobras'; POR (causa, meio, preço, agente da passiva): 'foi aprovado PELO candidato'; COM (companhia, instrumento, modo): 'assinou COM caneta'; A (destino, distância, modo, tempo): 'chego A tempo'.",
              },
              {
                titulo: "Preposição e Crase",
                icone: "⚡",
                conteudo:
                  "A crase (à) ocorre quando há fusão da preposição A com o artigo feminino A ou com o pronome demonstrativo A. Regra básica: substitua a palavra feminina por uma masculina — se aparecer 'ao', há crase. 'Fui À Petrobras' → 'Fui AO Porto' (há crase). 'Fui A São Paulo' → 'Fui A Porto Alegre' (não há crase — cidades sem artigo).",
              },
            ]}
          />
          <AlertBox tipo="info" titulo="Locução Prepositiva — Diferença Importante">
            Locução prepositiva é um grupo de palavras com valor de preposição, terminando sempre em preposição simples: 'em vez de', 'a fim de', 'por causa de', 'apesar de', 'ao lado de', 'de acordo com'. A preposição final exige que o próximo termo seja seu complemento. Não confunda 'a fim de' (locução prepositiva = para) com 'afim' (adjetivo = semelhante, com a mesma finalidade).
          </AlertBox>
        </section>

        {/* Resumo + Multimídia M7 */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={3}
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

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={4}
            title="Preposição e Regência — Os Verbos Mais Cobrados"
            variant="slate"
          />
          <p className="text-lg text-muted-foreground leading-relaxed text-justify">
            A <strong>regência verbal</strong> define qual preposição o verbo exige para ligar seu complemento. Errar a preposição na regência é um dos erros mais cobrados na Cesgranrio em questões de correção e reescrita.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { verbo: "ASSISTIR", prep: "A", ex: "Assisti AO relatório." },
              { verbo: "ASPIRAR (desejar)", prep: "A", ex: "Aspiro AO cargo." },
              { verbo: "OBEDECER", prep: "A", ex: "Obedeceu ÀS normas." },
              { verbo: "VISAR (almejar)", prep: "A", ex: "Visa AO lucro." },
              { verbo: "PREFERIR", prep: "A", ex: "Prefiro café AO chá." },
              { verbo: "AGRADAR (satisfazer)", prep: "A", ex: "Agradou AO diretor." },
              { verbo: "IMPLICAR (trazer)", prep: "EM", ex: "Implica EM risco." },
              { verbo: "RESIDIR", prep: "EM", ex: "Reside EM Brasília." },
            ].map(({ verbo, prep, ex }, i) => (
              <div key={i} className="p-4 bg-muted/30 rounded-xl border border-border flex flex-col gap-1">
                <span className="font-black text-slate-600 dark:text-slate-300 text-lg">{verbo} + <span className="text-amber-500">{prep}</span></span>
                <span className="text-lg text-muted-foreground italic">{ex}</span>
              </div>
            ))}
          </div>
          <AlertBox tipo="danger" titulo="Regência do Verbo ASSISTIR — Questão Clássica">
            ASSISTIR com sentido de 'ver/presenciar' é INDIRETO: exige preposição A: "Assisti AO acidente" (nunca "assisti o acidente"). ASSISTIR com sentido de 'prestar assistência' também é indireto: "O médico assistiu AO paciente". Apenas no sentido de 'morar' é intransitivo: "Assiste em São Paulo". A Cesgranrio frequentemente propõe reescritas que suprimem a preposição para verificar o conhecimento de regência.{" "}
            Outros verbos de regência clássica: AGRADAR (satisfazer) + A; IMPLICAR (envolver) + EM; PROCEDER (originar) + DE; PROCEDER (agir) = intransitivo.
          </AlertBox>
        </section>

        <section className="mt-16">
          <QuizInterativo
            questoes={qMod7}
            titulo="QUIZ: Preposição: O Elo de Ligação"
            icone="🔗"
            numero={5}
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
          gradiente="bg-gradient-to-br from-emerald-900 via-emerald-500 to-emerald-800"
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
              <p className="text-lg text-muted-foreground italic">
                Adição, Oposição, Alternância, Conclusão, Explicação.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-emerald-500">Subordinativas</h4>
              <p className="text-lg text-muted-foreground italic">
                Causa, Concessão, Condição, Finalidade, Tempo, etc.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="Conjunções Coordenativas em Detalhe"
            variant="indigo"
          />
          <ContentAccordion
            mode="stacked"
            titulo="Os 5 Tipos Coordenativos"
            icone={<LuLink2 />}
            corIndicador="bg-indigo-500"
            slides={[
              {
                titulo: "Aditivas (Adição)",
                icone: "➕",
                conteudo:
                  "Ligam orações com sentido de adição: E, NEM (= e não), TAMPOUCO, NÃO SÓ... MAS TAMBÉM, BEM COMO. Atenção: quando 'e' une sujeito simples na 3ª pessoa, o verbo vai para o plural: 'O gerente e o analista CHEGARAM'. Com sujeitos sinônimos, pode ficar no singular.",
              },
              {
                titulo: "Adversativas (Oposição)",
                icone: "⚔️",
                conteudo:
                  "Ligam orações com sentido de oposição ou contraste: MAS, PORÉM, CONTUDO, TODAVIA, ENTRETANTO, NO ENTANTO, SEM EMBARGO. Macete: todas as adversativas (exceto MAS) podem vir no meio da oração: 'Estudou muito; não passou, porém.' A vírgula antes dessas conjunções é obrigatória.",
              },
              {
                titulo: "Alternativas (Alternância)",
                icone: "🔀",
                conteudo:
                  "Indicam alternância, escolha ou exclusão: OU, ORA...ORA, QUER...QUER, SEJA...SEJA, JÁ...JÁ. Com 'ou' de sentido excludente, o verbo concorda com o sujeito mais próximo: 'O gerente ou os técnicos DECIDIRÃO'. Com sentido de adição (ou = e), o verbo vai para o plural.",
              },
              {
                titulo: "Conclusivas (Conclusão)",
                icone: "✅",
                conteudo:
                  "Introduzem conclusão: LOGO, PORTANTO, POIS (posposto ao verbo), POR ISSO, POR CONSEGUINTE, ASSIM, ENTÃO (posposto). Atenção fundamental: 'POIS' como conjunção conclusiva vem DEPOIS do verbo: 'Estudou muito; passou, POIS.' Como causal/explicativa, vem ANTES: 'POIS estudou muito, passou.'",
              },
              {
                titulo: "Explicativas (Explicação)",
                icone: "💡",
                conteudo:
                  "Ligam a explicação de um fato: POIS (anteposto), PORQUE, QUE, PORQUANTO. Diferença crucial cobrada em prova: conjunção CAUSAL (subordinativa) indica a causa real de algo ('Passou PORQUE estudou' = a causa do êxito é o estudo); conjunção EXPLICATIVA (coordenativa) justifica um fato ('Estude, PORQUE a prova está próxima' = argumento de convencimento).",
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={3}
            title="Conjunções Subordinativas — O Mapa Semântico"
            variant="indigo"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                  <LuZap className="h-10 w-10 text-indigo-400" />
                  <span className="font-black text-xl text-indigo-400">EMBORA / APESAR DE</span>
                  <p className="text-lg text-muted-foreground">Que tipo de relação indicam?</p>
                </div>
              }
              verso={
                <div className="flex flex-col justify-center h-full space-y-3 p-2 text-lg">
                  <p className="text-indigo-400 font-black text-lg">CONCESSÃO</p>
                  <hr className="border-border/50" />
                  <p>Admite a hipótese adversa mas não cede: "Embora cansado, concluiu o relatório."</p>
                  <hr className="border-border/50" />
                  <p className="text-lg text-muted-foreground">Modo Subjuntivo obrigatório com EMBORA.</p>
                </div>
              }
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                  <LuZap className="h-10 w-10 text-emerald-400" />
                  <span className="font-black text-xl text-emerald-400">SE / CASO / DESDE QUE</span>
                  <p className="text-lg text-muted-foreground">Que tipo de relação indicam?</p>
                </div>
              }
              verso={
                <div className="flex flex-col justify-center h-full space-y-3 p-2 text-lg">
                  <p className="text-emerald-400 font-black text-lg">CONDICIONAL</p>
                  <hr className="border-border/50" />
                  <p>Estabelece condição para o fato principal: "Se a meta for atingida, haverá bônus."</p>
                  <hr className="border-border/50" />
                  <p className="text-lg text-muted-foreground">CASO e DESDE QUE também pedem subjuntivo.</p>
                </div>
              }
            />
          </div>
          <AlertBox tipo="warning" titulo="Pontuação com Conjunções — Regra de Ouro">
            Conjunções COORDENATIVAS adversativas e conclusivas EXIGEM vírgula antes: "Estudou muito, mas não passou." Conjunções SUBORDINATIVAS adverbiais antecipadas (antes da principal) também EXIGEM vírgula: "Porque estudou muito, foi aprovado." Quando a subordinada vem após a principal, a vírgula é opcional: "Foi aprovado porque estudou." A Cesgranrio cobra essa distinção em questões de pontuação e reescrita.
          </AlertBox>
        </section>

        {/* Resumo + Multimídia M8 */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={4}
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
            titulo="QUIZ: Conjunção: O Cimento do Texto"
            icone="⚙️"
            numero={5}
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
          gradiente="bg-gradient-to-br from-rose-900 via-rose-500 to-rose-800"
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
              <p className="text-lg">
                Pode indicar alegria, dor, ironia ou compreensão. O contexto é
                rei.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-blue-500/5 border border-blue-500/20">
              <h4 className="font-bold text-blue-600">Regra de Pontuação</h4>
              <p className="text-lg">
                "Ah! Que bom." (Exclamação na interjeição) vs "Ah, que bom!"
                (Exclamação no final).
              </p>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="Classificação por Sentimento e Locuções Interjetivas"
            variant="rose"
          />
          <ContentAccordion
            mode="stacked"
            titulo="Tipos de Interjeição"
            icone={<LuMusic />}
            corIndicador="bg-pink-500"
            slides={[
              {
                titulo: "Interjeições de Alegria / Satisfação",
                icone: "😄",
                conteudo:
                  "Expressam contentamento e euforia: OH!, AH!, UHU!, ÓTIMO!, BRAVO!, VIVA!, HURRA!, OBA!. São geralmente seguidas de ponto de exclamação. Em textos formais, raramente aparecem; em títulos jornalísticos de opinião, podem surgir para marcar tom emocional.",
              },
              {
                titulo: "Interjeições de Dor / Lamento",
                icone: "😢",
                conteudo:
                  "Expressam sofrimento, pesar ou arrependimento: AI!, UI!, AH!, OH!, COITADO!, INFELIZMENTE!. Note que 'AH!' pode ser de alegria OU dor — o contexto determina o sentido. Em questões de interpretação, o contexto é fundamental para identificar o valor semântico.",
              },
              {
                titulo: "Interjeições de Ordem / Apelo",
                icone: "📢",
                conteudo:
                  "Expressam chamada, ordem ou pedido: PSIU!, ALÔ!, EI!, OLÁ!, TCHAU!, SILÊNCIO!, SHHH!. São interjeições com função apelativa (conativa). Em textos instrucionais ou de comunicação corporativa, o uso de interjeições é inadequado — isso pode ser cobrado em questões de adequação de registro.",
              },
              {
                titulo: "Locuções Interjetivas",
                icone: "🔗",
                conteudo:
                  "São grupos de palavras com valor de interjeição: 'Meu Deus!', 'Que pena!', 'Ora bolas!', 'Graças a Deus!', 'Puxa vida!', 'Nossa Senhora!'. Funcionam como unidades — mesmo sendo frases, expressam emoção de forma unitária. Importante: a locução interjetiva é invariável e indivisível em contexto.",
              },
            ]}
          />
          <AlertBox tipo="info" titulo="Interjeição vs Substantivo Abstrato — Diferença Sutil">
            'Silêncio!' como interjeição indica uma ordem imediata (função apelativa). 'O silêncio da sala era absoluto' — aqui, 'silêncio' é substantivo abstrato (função referencial). A mesma palavra, dependendo do contexto e da função, pertence a classes diferentes. Em prova, identifique sempre a função que a palavra exerce na frase.
          </AlertBox>
        </section>

        {/* Resumo + Multimídia M9 */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={3}
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

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={4}
            title="Interjeição no Texto — Análise de Efeitos de Sentido"
            variant="rose"
          />
          <p className="text-lg text-muted-foreground leading-relaxed text-justify">
            Na Cesgranrio, a interjeição aparece principalmente em questões de <strong>interpretação de texto</strong> e <strong>análise de efeitos de sentido</strong>. O examinador quer saber qual emoção ou intenção comunicativa a interjeição expressa no contexto específico.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
              <h4 className="font-bold text-emerald-600 text-lg">Função Expressiva (Emotiva)</h4>
              <p className="text-lg text-muted-foreground">A interjeição exprime o estado emocional do falante.</p>
              <p className="text-lg italic">"Ah! Que relatório brilhante!" → alegria/satisfação</p>
              <p className="text-lg italic">"Ai! Que resultado terrível." → dor/lamento</p>
            </div>
            <div className="p-6 rounded-xl bg-blue-500/5 border border-blue-500/20 space-y-3">
              <h4 className="font-bold text-blue-600 text-lg">Função Apelativa (Conativa)</h4>
              <p className="text-lg text-muted-foreground">A interjeição provoca uma ação no interlocutor.</p>
              <p className="text-lg italic">"Psiu! Não interrompa." → ordem de silêncio</p>
              <p className="text-lg italic">"Olá! Pode entrar." → chamamento/saudação</p>
            </div>
          </div>
          <AlertBox tipo="success" titulo="Dica de Prova — Interjeição em Questões de Efeito de Sentido">
            Quando a questão pede o "efeito de sentido" de uma interjeição, identifique: (1) o contexto emocional da cena; (2) a relação entre falante e interlocutor (hierarquia? intimidade?); (3) a pontuação usada (! para emoção intensa, , para emoção suave). Nunca responda pela forma da palavra em isolamento — o sentido está no contexto.
          </AlertBox>
        </section>

        <section className="mt-16">
          <QuizInterativo
            questoes={qMod9}
            titulo="QUIZ: Interjeição: A Emoção"
            icone="⚡"
            numero={5}
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
          gradiente="bg-gradient-to-br from-violet-900 via-violet-500 to-violet-800"
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
              <p className="text-lg">Um, dois, três... mil.</p>
            </div>
            <div className="p-6 bg-muted/30 rounded-xl">
              <p className="font-bold">Ordinais (Ordem)</p>
              <p className="text-lg">Primeiro, décimo, centésimo.</p>
            </div>
          </div>
          <AlertBox tipo="warning" titulo="Numeral Dual">
            "Ambos/Ambas" são numerais duais e exigem o artigo: "Ambos os
            funcionários saíram."
          </AlertBox>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="Multiplicativos, Fracionários e Coletivos"
            variant="emerald"
          />
          <ContentAccordion
            mode="stacked"
            titulo="Todos os Tipos de Numeral"
            icone={<LuHash />}
            corIndicador="bg-emerald-500"
            slides={[
              {
                titulo: "Multiplicativos",
                icone: "✖️",
                conteudo:
                  "Indicam multiplicação ou proporção: simples (dobro, triplo, quádruplo) e compostos (décuplo, cêntuplo). Em contextos formais, use as formas multiplicativas: 'A produção foi o dobro do esperado.' Curiosidade: 'duplo' e 'dupla' são formas concorrentes de 'dobro' — ambas corretas.",
              },
              {
                titulo: "Fracionários",
                icone: "➗",
                conteudo:
                  "Indicam fração, parte de um todo: metade, terço, quarto, quinto... décimo, centésimo, milésimo. Para frações maiores que 2, usa-se o ordinal como denominador: '2/3' = dois terços; '3/4' = três quartos. 'Metade' é substantivo, não numeral fracionário estrito, mas tem valor fracionário.",
              },
              {
                titulo: "Numerais Coletivos",
                icone: "👥",
                conteudo:
                  "Indicam quantidade determinada de seres: par (2), trio (3), quarteto (4), quinteto (5), dezena (10), dúzia (12), vintena (20), centena (100), milhar (1000). São substantivos coletivos com valor numérico. 'Uma dúzia de relatórios' — o numeral coletivo é o núcleo e o verbo concorda com ele: 'Uma dúzia de relatórios FOI entregue'.",
              },
              {
                titulo: "Concordância dos Ordinais com Títulos",
                icone: "👑",
                conteudo:
                  "Até décimo, usa-se o ordinal antes do nome: 'o nono andar', 'o quinto parágrafo'. A partir de 11º, pode-se usar cardinal depois do nome: 'o capítulo 11' ou 'o décimo primeiro capítulo'. Com títulos de reis e papas: 'Dom Pedro II' (lê-se 'Dom Pedro Segundo'), 'João Paulo II' (lê-se 'João Paulo Segundo'). A CESGRANRIO pode pedir essa distinção em questões de uso da língua.",
              },
            ]}
          />
          <Comparison
            title="Numeral vs Pronome Indefinido vs Artigo Indefinido"
            left={{
              title: "Numeral Cardinal",
              content: "Quantidade exata e determinada\n\"Há TRÊS candidatos aprovados\"\n\"Comprei DOIS relatórios\"\nPode ser substituído por algarismo",
              description: "Numerais precisos",
              variant: "success",
            }}
            right={{
              title: "Pronome Indefinido",
              content: "Quantidade vaga, imprecisa\n\"ALGUNS candidatos foram aprovados\"\n\"MUITOS relatórios chegaram\"\nNão pode ser substituído por algarismo",
              description: "Quantidades vagas",
              variant: "warning",
            }}
          />
          <AlertBox tipo="danger" titulo="Concordância: Numeral + Substantivo Feminino">
            Os numerais 'um/uma' e 'dois/duas' concordam em gênero com o substantivo: 'DUAS plataformas', 'UM campo de extração'. Os demais cardinais são invariáveis: 'TRÊS plataformas', 'CINCO campos'. Erros de concordância com 'dois/duas' são frequentes em provas: "as DUAS propostas" (correto) vs "os DOIS propostas" (erro gravíssimo).
          </AlertBox>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={3}
            title="Revisão Express — As 10 Classes de Palavras"
            variant="emerald"
          />
          <ContentAccordion
            mode="stacked"
            titulo="Consolidação Final"
            icone={<LuBrain />}
            corIndicador="bg-emerald-500"
            slides={[
              {
                titulo: "Classes Variáveis (flexionam)",
                icone: "🔄",
                conteudo:
                  "SUBSTANTIVO: nomeia seres (gênero, número, grau). ADJETIVO: qualifica substantivos (gênero, número, grau). ARTIGO: determina o substantivo (gênero e número). PRONOME: substitui ou acompanha substantivo (gênero, número, caso, pessoa). VERBO: exprime ação/estado (modo, tempo, número, pessoa, voz). NUMERAL: quantifica (gênero e número nos ordinais e em um/dois).",
              },
              {
                titulo: "Classes Invariáveis (não flexionam)",
                icone: "🔒",
                conteudo:
                  "ADVÉRBIO: modifica verbo, adjetivo ou advérbio. PREPOSIÇÃO: conecta termos em relação de subordinação. CONJUNÇÃO: conecta orações ou termos de valor equivalente. INTERJEIÇÃO: exprime emoção ou apelo. Macete: CIA P = Conjunção, Interjeição, Advérbio, Preposição — as quatro invariáveis.",
              },
              {
                titulo: "Questões de Prova: O que a Cesgranrio mais cobra",
                icone: "🎯",
                conteudo:
                  "1) Derivação imprópria (substantivação pelo artigo). 2) Advérbio vs adjetivo (BEM vs BOM). 3) Pronome oblíquo tônico (para mim, entre nós). 4) Colocação pronominal (próclise, mesóclise, ênclise). 5) Pronome relativo cujo (sem artigo depois). 6) Concordância com verbos impessoais (haver=existir → singular). 7) Participio passado abundante (aceito/aceitado). 8) Conjunção adversativa vs concessiva. 9) Preposição e crase. 10) Pronome de tratamento (Vossa Excelência → concordância 3ª pessoa).",
              },
            ]}
          />
          <AlertBox tipo="success" titulo="Dicas de Prova — Cesgranrio">
            Na morfologia da Cesgranrio, sempre pergunte: (1) Qual a CLASSE da palavra no contexto? (2) Qual a FUNÇÃO sintática? Uma mesma forma pode ser substantivo, adjetivo ou advérbio dependendo do contexto. O artigo, quando presente, "congela" qualquer palavra na classe substantivo. Verbos impessoais (haver existencial, fazer temporal, chover, nevar) ficam sempre na 3ª pessoa do singular. Reescrita que muda a classe da palavra muda o significado — classifique antes de responder!{" "}
            Bons estudos e boa prova! Você está preparado para dominar a morfologia da Cesgranrio.
          </AlertBox>
        </section>

        {/* Resumo + Multimídia M10 */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={4}
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
            titulo="QUIZ: Numeral: A Quantidade"
            icone="🔢"
            numero={5}
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
              <span className="text-lg font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Premium Content
              </span>
              <div className="w-1 h-1 bg-slate-300 rounded-full" />
              <span className="text-lg font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                LMS Quest AI
              </span>
              <div className="w-1 h-1 bg-slate-300 rounded-full" />
              <span className="text-lg font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Padrao Cesgranrio
              </span>
            </div>
          </div>
        </section>
      </TabsContent>
    </AulaTemplate>
  );
}
