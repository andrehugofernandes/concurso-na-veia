"use client";

import { useState, useEffect, useCallback } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
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
  SectionTitle,
  TabbedContent,
} from "./shared";
import {
  LuCheck,
  LuBookOpen,
  LuTag,
  LuActivity,
  LuLink2,
  LuNavigation,
  LuZap,
  LuHash,
  LuShield,
  LuShuffle,
  LuCirclePlay as LuPlayCircle,
  LuBrain,
  LuMusic,
  LuArrowDown,
  LuMessageCircle,
} from "react-icons/lu";

// ── Definição dos 5 Módulos ──
const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", titulo: "Verbo & Substantivo" },
  { id: "modulo-2", label: "Módulo 2", titulo: "Pronome & Adjetivo" },
  { id: "modulo-3", label: "Módulo 3", titulo: "Conjunção & Preposição" },
  { id: "modulo-4", label: "Módulo 4", titulo: "Advérbio & Artigo" },
  { id: "modulo-5", label: "Módulo 5", titulo: "Numeral & Interjeição" },
  { id: "modulo-6", label: "Módulo 6", titulo: "Simulado Final" },
] as const;

// ══════════════════════════════════════════════════════════════════════════
// VETORES ESTÁTICOS DE CONJUGAÇÃO (Para otimizar e limpar o JSX)
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
      <p className="flex gap-2">
        <span className={`text-muted-foreground ${w} text-right`}>
          {prefixo ? `(${prefixo}) ` : ""}eu
        </span>{" "}
        <span className="font-semibold text-foreground text-left">{p1}</span>
      </p>
      <p className="flex gap-2">
        <span className={`text-muted-foreground ${w} text-right`}>
          {prefixo ? `(${prefixo}) ` : ""}tu
        </span>{" "}
        <span className="font-semibold text-foreground text-left">{p2}</span>
      </p>
      <p className="flex gap-2">
        <span className={`text-muted-foreground ${w} text-right`}>
          {prefixo ? `(${prefixo}) ` : ""}ele
        </span>{" "}
        <span className="font-semibold text-foreground text-left">{p3}</span>
      </p>
      <p className="flex gap-2">
        <span className={`text-muted-foreground ${w} text-right`}>
          {prefixo ? `(${prefixo}) ` : ""}nós
        </span>{" "}
        <span className="font-semibold text-foreground text-left">{p4}</span>
      </p>
      <p className="flex gap-2">
        <span className={`text-muted-foreground ${w} text-right`}>
          {prefixo ? `(${prefixo}) ` : ""}vós
        </span>{" "}
        <span className="font-semibold text-foreground text-left">{p5}</span>
      </p>
      <p className="flex gap-2">
        <span className={`text-muted-foreground ${w} text-right`}>
          {prefixo ? `(${prefixo}) ` : ""}eles
        </span>{" "}
        <span className="font-semibold text-foreground text-left">{p6}</span>
      </p>
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
  titulo: (
    <span className="flex items-center gap-2">
      {titulo}{" "}
      {tipo === "irreg" && (
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-500 font-semibold uppercase tracking-wide border border-red-500/20">
          Irregular
        </span>
      )}
    </span>
  ) as any,
  descricao: conj,
  corFundo: tipo === "irreg" ? "bg-red-500/5 dark:bg-red-500/10" : undefined,
});

const i1 = <span className="font-black text-base text-blue-500">-ar</span>;
const i2 = <span className="font-black text-base text-emerald-500">-er</span>;
const i3 = <span className="font-black text-base text-rose-500">-ir</span>;
const iIr = <span className="font-black text-base text-amber-500">✦</span>;

const CONJ_SLIDES = [
  {
    titulo: "1. Presente do Indicativo",
    icone: "🕒",
    conteudo: (
      <CardCarousel
        titulo=""
        itemsPerView={3}
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
          criarCard(
            iIr,
            "Ir",
            renderConj("vou", "vais", "vai", "vamos", "ides", "vão"),
            "irreg",
          ),
          criarCard(
            iIr,
            "Vir",
            renderConj("venho", "vens", "vem", "vimos", "vindes", "vêm"),
            "irreg",
          ),
          criarCard(
            iIr,
            "Pôr",
            renderConj("ponho", "pões", "põe", "pomos", "pondes", "põem"),
            "irreg",
          ),
        ]}
      />
    ),
  },
  {
    titulo: "2. Pretérito Perfeito do Indicativo",
    icone: "✅",
    conteudo: (
      <CardCarousel
        titulo=""
        itemsPerView={3}
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
            "Ser/Ir",
            renderConj("fui", "foste", "foi", "fomos", "fostes", "foram"),
            "irreg",
          ),
          criarCard(
            iIr,
            "Vir",
            renderConj("vim", "vieste", "veio", "viemos", "viestes", "vieram"),
            "irreg",
          ),
          criarCard(
            iIr,
            "Pôr",
            renderConj(
              "pus",
              "puseste",
              "pôs",
              "pusemos",
              "pusestes",
              "puseram",
            ),
            "irreg",
          ),
          criarCard(
            iIr,
            "Ver",
            renderConj("vi", "viste", "viu", "vimos", "vistes", "viram"),
            "irreg",
          ),
        ]}
      />
    ),
  },
  {
    titulo: "3. Pretérito Imperfeito do Indicativo",
    icone: "🎞️",
    conteudo: (
      <CardCarousel
        titulo=""
        itemsPerView={3}
        cards={[
          criarCard(
            i1,
            "Estudar",
            renderConj(
              "estudava",
              "estudavas",
              "estudava",
              "estudávamos",
              "estudáveis",
              "estudavam",
            ),
          ),
          criarCard(
            i2,
            "Vender",
            renderConj(
              "vendia",
              "vendias",
              "vendia",
              "vendíamos",
              "vendíeis",
              "vendiam",
            ),
          ),
          criarCard(
            i3,
            "Partir",
            renderConj(
              "partia",
              "partias",
              "partia",
              "partíamos",
              "partíeis",
              "partiam",
            ),
          ),
          criarCard(
            iIr,
            "Ser",
            renderConj("era", "eras", "era", "éramos", "éreis", "eram"),
            "irreg",
          ),
          criarCard(
            iIr,
            "Vir",
            renderConj(
              "vinha",
              "vinhas",
              "vinha",
              "vínhamos",
              "vínheis",
              "vinham",
            ),
            "irreg",
          ),
          criarCard(
            iIr,
            "Pôr",
            renderConj(
              "punha",
              "punhas",
              "punha",
              "púnhamos",
              "púnheis",
              "punham",
            ),
            "irreg",
          ),
        ]}
      />
    ),
  },
  {
    titulo: "4. Pretérito Mais-Que-Perfeito do Ind.",
    icone: "🏛️",
    conteudo: (
      <CardCarousel
        titulo=""
        itemsPerView={3}
        cards={[
          criarCard(
            i1,
            "Estudar",
            renderConj(
              "estudara",
              "estudaras",
              "estudara",
              "estudáramos",
              "estudáreis",
              "estudaram",
            ),
          ),
          criarCard(
            i2,
            "Vender",
            renderConj(
              "vendera",
              "venderas",
              "vendera",
              "vendêramos",
              "vendêreis",
              "venderam",
            ),
          ),
          criarCard(
            i3,
            "Partir",
            renderConj(
              "partira",
              "partiras",
              "partira",
              "partíramos",
              "partíreis",
              "partiram",
            ),
          ),
          criarCard(
            iIr,
            "Ser/Ir",
            renderConj("fora", "foras", "fora", "fôramos", "fôreis", "foram"),
            "irreg",
          ),
          criarCard(
            iIr,
            "Vir",
            renderConj(
              "viera",
              "vieras",
              "viera",
              "viéramos",
              "viéreis",
              "vieram",
            ),
            "irreg",
          ),
          criarCard(
            iIr,
            "Pôr",
            renderConj(
              "pusera",
              "puseras",
              "pusera",
              "puséramos",
              "puséreis",
              "puseram",
            ),
            "irreg",
          ),
        ]}
      />
    ),
  },
  {
    titulo: "5. Futuro do Presente do Indicativo",
    icone: "🚀",
    conteudo: (
      <CardCarousel
        titulo=""
        itemsPerView={3}
        cards={[
          criarCard(
            i1,
            "Estudar",
            renderConj(
              "estudarei",
              "estudarás",
              "estudará",
              "estudaremos",
              "estudareis",
              "estudarão",
            ),
          ),
          criarCard(
            i2,
            "Vender",
            renderConj(
              "venderei",
              "venderás",
              "venderá",
              "venderemos",
              "vendereis",
              "venderão",
            ),
          ),
          criarCard(
            i3,
            "Partir",
            renderConj(
              "partirei",
              "partirás",
              "partirá",
              "partiremos",
              "partireis",
              "partirão",
            ),
          ),
          criarCard(
            iIr,
            "Ser",
            renderConj("serei", "serás", "será", "seremos", "sereis", "serão"),
            "irreg",
          ),
          criarCard(
            iIr,
            "Vir",
            renderConj("virei", "virás", "virá", "viremos", "vireis", "virão"),
            "irreg",
          ),
          criarCard(
            iIr,
            "Pôr",
            renderConj("porei", "porás", "porá", "poremos", "poreis", "porão"),
            "irreg",
          ),
        ]}
      />
    ),
  },
  {
    titulo: "6. Futuro do Pretérito do Indicativo",
    icone: "🤔",
    conteudo: (
      <CardCarousel
        titulo=""
        itemsPerView={3}
        cards={[
          criarCard(
            i1,
            "Estudar",
            renderConj(
              "estudaria",
              "estudarias",
              "estudaria",
              "estudaríamos",
              "estudaríeis",
              "estudariam",
            ),
          ),
          criarCard(
            i2,
            "Vender",
            renderConj(
              "venderia",
              "venderias",
              "venderia",
              "venderíamos",
              "venderíeis",
              "venderiam",
            ),
          ),
          criarCard(
            i3,
            "Partir",
            renderConj(
              "partiria",
              "partirias",
              "partiria",
              "partiríamos",
              "partiríeis",
              "partiriam",
            ),
          ),
          criarCard(
            iIr,
            "Ser",
            renderConj(
              "seria",
              "serias",
              "seria",
              "seríamos",
              "seríeis",
              "seriam",
            ),
            "irreg",
          ),
          criarCard(
            iIr,
            "Vir",
            renderConj(
              "viria",
              "virias",
              "viria",
              "viríamos",
              "viríeis",
              "viriam",
            ),
            "irreg",
          ),
          criarCard(
            iIr,
            "Pôr",
            renderConj(
              "poria",
              "porias",
              "poria",
              "poríamos",
              "poríeis",
              "poriam",
            ),
            "irreg",
          ),
        ]}
      />
    ),
  },
  {
    titulo: "7. Presente do Subjuntivo",
    icone: "💭",
    conteudo: (
      <CardCarousel
        titulo=""
        itemsPerView={3}
        cards={[
          criarCard(
            i1,
            "Estudar",
            renderConj(
              "estude",
              "estudes",
              "estude",
              "estudemos",
              "estudeis",
              "estudem",
              "que",
            ),
          ),
          criarCard(
            i2,
            "Vender",
            renderConj(
              "venda",
              "vendas",
              "venda",
              "vendamos",
              "vendais",
              "vendam",
              "que",
            ),
          ),
          criarCard(
            i3,
            "Partir",
            renderConj(
              "parta",
              "partas",
              "parta",
              "partamos",
              "partais",
              "partam",
              "que",
            ),
          ),
          criarCard(
            iIr,
            "Ser",
            renderConj(
              "seja",
              "sejas",
              "seja",
              "sejamos",
              "sejais",
              "sejam",
              "que",
            ),
            "irreg",
          ),
          criarCard(
            iIr,
            "Vir",
            renderConj(
              "venha",
              "venhas",
              "venha",
              "venhamos",
              "venhais",
              "venham",
              "que",
            ),
            "irreg",
          ),
          criarCard(
            iIr,
            "Pôr",
            renderConj(
              "ponha",
              "ponhas",
              "ponha",
              "ponhamos",
              "ponhais",
              "ponham",
              "que",
            ),
            "irreg",
          ),
          criarCard(
            iIr,
            "Ver",
            renderConj(
              "veja",
              "vejas",
              "veja",
              "vejamos",
              "vejais",
              "vejam",
              "que",
            ),
            "irreg",
          ),
        ]}
      />
    ),
  },
  {
    titulo: "8. Pretérito Imperfeito do Subjuntivo",
    icone: "🔮",
    conteudo: (
      <CardCarousel
        titulo=""
        itemsPerView={3}
        cards={[
          criarCard(
            i1,
            "Estudar",
            renderConj(
              "estudasse",
              "estudasses",
              "estudasse",
              "estudássemos",
              "estudásseis",
              "estudassem",
              "se",
            ),
          ),
          criarCard(
            i2,
            "Vender",
            renderConj(
              "vendesse",
              "vendesses",
              "vendesse",
              "vendêssemos",
              "vendêsseis",
              "vendessem",
              "se",
            ),
          ),
          criarCard(
            i3,
            "Partir",
            renderConj(
              "partisse",
              "partisses",
              "partisse",
              "partíssemos",
              "partísseis",
              "partissem",
              "se",
            ),
          ),
          criarCard(
            iIr,
            "Ser / Ir",
            renderConj(
              "fosse",
              "fosses",
              "fosse",
              "fôssemos",
              "fôsseis",
              "fossem",
              "se",
            ),
            "irreg",
          ),
          criarCard(
            iIr,
            "Vir",
            renderConj(
              "viesse",
              "viesses",
              "viesse",
              "viéssemos",
              "viésseis",
              "viessem",
              "se",
            ),
            "irreg",
          ),
          criarCard(
            iIr,
            "Pôr",
            renderConj(
              "pusesse",
              "pusesses",
              "pusesse",
              "puséssemos",
              "pusésseis",
              "pusessem",
              "se",
            ),
            "irreg",
          ),
          criarCard(
            iIr,
            "Ver",
            renderConj(
              "visse",
              "visses",
              "visse",
              "víssemos",
              "vísseis",
              "vissem",
              "se",
            ),
            "irreg",
          ),
        ]}
      />
    ),
  },
  {
    titulo: "9. Futuro do Subjuntivo",
    icone: "🎯",
    conteudo: (
      <CardCarousel
        titulo=""
        itemsPerView={3}
        cards={[
          criarCard(
            i1,
            "Estudar",
            renderConj(
              "estudar",
              "estudares",
              "estudar",
              "estudarmos",
              "estudardes",
              "estudarem",
              "quando",
            ),
          ),
          criarCard(
            i2,
            "Vender",
            renderConj(
              "vender",
              "venderes",
              "vender",
              "vendermos",
              "venderdes",
              "venderem",
              "quando",
            ),
          ),
          criarCard(
            i3,
            "Partir",
            renderConj(
              "partir",
              "partires",
              "partir",
              "partirmos",
              "partirdes",
              "partirem",
              "quando",
            ),
          ),
          criarCard(
            iIr,
            "Ser / Ir",
            renderConj(
              "for",
              "fores",
              "for",
              "formos",
              "fordes",
              "forem",
              "quando",
            ),
            "irreg",
          ),
          criarCard(
            iIr,
            "Vir",
            renderConj(
              "vier",
              "vieres",
              "vier",
              "viermos",
              "vierdes",
              "vierem",
              "quando",
            ),
            "irreg",
          ),
          criarCard(
            iIr,
            "Pôr",
            renderConj(
              "puser",
              "puseres",
              "puser",
              "pusermos",
              "puserdes",
              "puserem",
              "quando",
            ),
            "irreg",
          ),
          criarCard(
            iIr,
            "Ver",
            renderConj(
              "vir",
              "vires",
              "vir",
              "virmos",
              "virdes",
              "virem",
              "quando",
            ),
            "irreg",
          ),
        ]}
      />
    ),
  },
];

// ══════════════════════════════════════════════════════════════════════════
// QUIZ POOLS
// ══════════════════════════════════════════════════════════════════════════

const QUIZ_MOD1_POOL: QuizQuestion[] = [
  {
    id: 101,
    pergunta:
      "Em 'A broca **perfurou** o solo com sucesso', o verbo destacado está no:",
    opcoes: [
      { label: "A", valor: "Pretérito Imperfeito do Indicativo" },
      { label: "B", valor: "Pretérito Perfeito do Indicativo" },
      { label: "C", valor: "Futuro do Pretérito" },
      { label: "D", valor: "Presente do Indicativo" },
      { label: "E", valor: "Futuro do Presente" },
    ],
    correta: "B",
    explicacao:
      "A ação está totalmente concluída no passado (perfurou = fato acabado). Logo, é Pretérito Perfeito do Indicativo.",
  },
  {
    id: 102,
    pergunta:
      "Assinale a alternativa em que o verbo é IMPESSOAL e deve ficar no singular:",
    opcoes: [
      { label: "A", valor: "Existiam muitos candidatos na fila." },
      { label: "B", valor: "Havia muitos candidatos na fila." },
      { label: "C", valor: "Apareceram problemas na tubulação." },
      { label: "D", valor: "Faltam recursos para o projeto." },
    ],
    correta: "B",
    explicacao:
      "HAVER no sentido de existir é impessoal: fica SEMPRE na 3ª pessoa do singular. 'Existir', por outro lado, é pessoal e vai ao plural.",
  },
  {
    id: 103,
    pergunta:
      "Na frase '**Deve haver** vagas no concurso', a forma verbal está:",
    opcoes: [
      { label: "A", valor: "Errada — deveria ser 'Devem haver'" },
      {
        label: "B",
        valor: "Correta — o auxiliar acompanha a impessoalidade de haver",
      },
      { label: "C", valor: "Errada — deveria ser 'Devem existir'" },
      { label: "D", valor: "Correta — mas somente no registro informal" },
      {
        label: "E",
        valor: "Errada — pois o verbo principal deve ir para o plural",
      },
    ],
    correta: "B",
    explicacao:
      "Quando HAVER (impessoal) tem auxiliar, o auxiliar também fica no singular: 'Deve haver', 'Pode haver', 'Vai haver'.",
  },
  {
    id: 104,
    pergunta:
      "Em 'O **amanhecer** na plataforma é surpreendente', a palavra destacada é originalmente um:",
    opcoes: [
      { label: "A", valor: "Substantivo concreto" },
      {
        label: "B",
        valor: "Verbo que sofreu derivação imprópria (substantivação)",
      },
      { label: "C", valor: "Adjetivo substantivado" },
      { label: "D", valor: "Advérbio de tempo" },
      { label: "E", valor: "Preposição" },
    ],
    correta: "B",
    explicacao:
      "O artigo 'O' antes de 'amanhecer' transforma o verbo em substantivo. Isso se chama Derivação Imprópria.",
  },
  {
    id: 105,
    pergunta: "Qual alternativa contém um substantivo ABSTRATO?",
    opcoes: [
      { label: "A", valor: "A plataforma resistiu ao temporal." },
      { label: "B", valor: "A extração de petróleo bateu recorde." },
      { label: "C", valor: "O vento soprou forte na base." },
      { label: "D", valor: "A sereia é um ser mitológico." },
      { label: "E", valor: "A frota chegou ao porto." },
    ],
    correta: "B",
    explicacao:
      "'Extração' indica uma ação (ato de extrair) e depende de um agente. Substantivos que indicam ação, estado, qualidade ou sentimento dependente de um ser são ABSTRATOS.",
  },
  {
    id: 106,
    pergunta:
      "Na voz passiva sintética '**Vendem-se** casas', o sujeito da oração é:",
    opcoes: [
      { label: "A", valor: "Indeterminado" },
      { label: "B", valor: "O pronome 'se'" },
      { label: "C", valor: "'casas' (sujeito paciente)" },
      { label: "D", valor: "Oculto (alguém vende)" },
      { label: "E", valor: "Inexistente" },
    ],
    correta: "C",
    explicacao:
      "Com VTD + SE, temos Pronome Apassivador. 'Casas' é o sujeito paciente (casas são vendidas), por isso o verbo vai ao plural.",
  },
  {
    id: 107,
    pergunta: "Assinale a opção com flexão CORRETA do plural:",
    opcoes: [
      { label: "A", valor: "Os cidadãos votaram cedo." },
      { label: "B", valor: "Os alemãos chegaram ontem." },
      { label: "C", valor: "Trouxeram muitos limãos." },
      { label: "D", valor: "Os capitães comandaram a missão." },
      { label: "E", valor: "Os pãos estavam quentes." },
    ],
    correta: "D",
    explicacao:
      "Capitão → Capitães (oxítona em -ão faz plural em -ães). Cidadão → Cidadãos. Alemão → Alemães. Limão → Limões.",
  },
  {
    id: 108,
    pergunta: "Em 'O operador **chegava** sempre cedo', o tempo verbal indica:",
    opcoes: [
      { label: "A", valor: "Ação concluída no passado" },
      { label: "B", valor: "Ação habitual ou inacabada no passado" },
      { label: "C", valor: "Ação futura condicionada" },
      { label: "D", valor: "Ação no presente contínuo" },
      { label: "E", valor: "Desejo ou hipótese" },
    ],
    correta: "B",
    explicacao:
      "Pretérito Imperfeito ('chegava') indica ação habitual, repetida ou inacabada no passado. Compare: 'chegou' (perfeito, ação pontual) vs 'chegava' (imperfeito, ação habitual).",
  },
  {
    id: 109,
    pergunta:
      "Assinale a alternativa que apresenta a flexão correta do verbo VER no Futuro do Subjuntivo:",
    opcoes: [
      { label: "A", valor: "Quando eu ver" },
      { label: "B", valor: "Quando eu vir" },
      { label: "C", valor: "Quando eu vi" },
      { label: "D", valor: "Quando eu vesse" },
      { label: "E", valor: "Quando eu vejo" },
    ],
    correta: "B",
    explicacao:
      "O Futuro do Subjuntivo do verbo VER é 'quando eu vir, tu vires, ele vir'. 'Quando eu ver' está incorreto.",
  },
  {
    id: 110,
    pergunta:
      "Na frase 'Se ele ________ mais esforço, ________ aprovado', quais formas completam corretamente os espaços, sendo verbo PÔR e SER?",
    opcoes: [
      { label: "A", valor: "pusesse / seria" },
      { label: "B", valor: "posse / era" },
      { label: "C", valor: "puzesse / seria" },
      { label: "D", valor: "por / seria" },
      { label: "E", valor: "pusesse / fôra" },
    ],
    correta: "A",
    explicacao:
      "Pretérito Imperfeito do Subjuntivo de PÔR é 'pusesse' (com S). O Futuro do Pretérito do verbo SER é 'seria'.",
  },
];

const QUIZ_MOD2_POOL: QuizQuestion[] = [
  {
    id: 201,
    pergunta:
      "Na frase 'Aquela refinaria é mais antiga que **esta**', os pronomes destacados são:",
    opcoes: [
      { label: "A", valor: "Possessivos" },
      { label: "B", valor: "Relativos" },
      { label: "C", valor: "Demonstrativos" },
      { label: "D", valor: "Indefinidos" },
      { label: "E", valor: "Interrogativos" },
    ],
    correta: "C",
    explicacao:
      "'Aquela' e 'esta' situam os elementos no espaço e no discurso. São pronomes demonstrativos.",
  },
  {
    id: 202,
    pergunta:
      "Em 'O relatório **que** você entregou foi aprovado', a palavra 'que' é:",
    opcoes: [
      { label: "A", valor: "Conjunção integrante" },
      { label: "B", valor: "Pronome relativo (retoma 'relatório')" },
      { label: "C", valor: "Preposição" },
      { label: "D", valor: "Advérbio de modo" },
      { label: "E", valor: "Conjunção coordenativa" },
    ],
    correta: "B",
    explicacao:
      "'Que' retoma o antecedente 'relatório' e introduz uma Oração Adjetiva. Logo, é pronome relativo (= o qual).",
  },
  {
    id: 203,
    pergunta:
      "Assinale a frase em que o adjetivo muda de sentido conforme a posição:",
    opcoes: [
      { label: "A", valor: "Ele é um excelente engenheiro." },
      { label: "B", valor: "O **grande** líder vs O líder **grande**" },
      { label: "C", valor: "Mesa suja / Computador sujo" },
      { label: "D", valor: "Relatório complexo e detalhado" },
      { label: "E", valor: "A Petrobras é uma empresa estatal" },
    ],
    correta: "B",
    explicacao:
      "'Grande líder' = notável (valor subjetivo). 'Líder grande' = alto, corpulento (valor objetivo). A posição do adjetivo altera o significado.",
  },
  {
    id: 204,
    pergunta:
      "Em 'A Petrobras exige **alta** performance', o termo destacado é:",
    opcoes: [
      { label: "A", valor: "Substantivo" },
      { label: "B", valor: "Adjetivo (qualifica 'performance')" },
      { label: "C", valor: "Advérbio de intensidade" },
      { label: "D", valor: "Pronome demonstrativo" },
      { label: "E", valor: "Verbo" },
    ],
    correta: "B",
    explicacao:
      "'Alta' qualifica o substantivo 'performance', atribuindo-lhe uma característica. Logo, é adjetivo.",
  },
  {
    id: 205,
    pergunta: "Qual pronome é OBLÍQUO ÁTONO e funciona como Objeto Direto?",
    opcoes: [
      { label: "A", valor: "Eu" },
      { label: "B", valor: "Lhe" },
      { label: "C", valor: "O / A" },
      { label: "D", valor: "Nós" },
      { label: "E", valor: "Mim" },
    ],
    correta: "C",
    explicacao:
      "'O' e 'A' são oblíquos átonos que funcionam como Objeto Direto. 'Lhe' funciona como Objeto Indireto. 'Eu' e 'Nós' são retos (sujeito).",
  },
  {
    id: 206,
    pergunta: "'De pedra' em 'coração **de pedra**' equivale a qual adjetivo?",
    opcoes: [
      { label: "A", valor: "Pedregoso" },
      { label: "B", valor: "Pétreo" },
      { label: "C", valor: "Pedreiro" },
      { label: "D", valor: "Pedrento" },
      { label: "E", valor: "Pedrado" },
    ],
    correta: "B",
    explicacao:
      "'De pedra' é uma Locução Adjetiva. Seu adjetivo correspondente é 'pétreo'. Exemplo: coração pétreo = coração de pedra.",
  },
  {
    id: 207,
    pergunta: "Em 'Ela **mesma** resolveu o problema', a palavra 'mesma' é:",
    opcoes: [
      { label: "A", valor: "Advérbio (invariável)" },
      { label: "B", valor: "Pronome demonstrativo de reforço (variável)" },
      { label: "C", valor: "Adjetivo qualificativo" },
      { label: "D", valor: "Conjunção" },
      { label: "E", valor: "Preposição" },
    ],
    correta: "B",
    explicacao:
      "'Mesmo/mesma' como reforço é pronome e VARIA em gênero: 'Ela mesma', 'Ele mesmo', 'Elas mesmas'. Nunca 'Ela mesmo'.",
  },
  {
    id: 208,
    pergunta: "Na frase 'Seguem **anexas** as cópias', a concordância está:",
    opcoes: [
      { label: "A", valor: "Errada — deveria ser 'anexo'" },
      {
        label: "B",
        valor: "Correta — 'anexo' é adjetivo e concorda com 'cópias'",
      },
      { label: "C", valor: "Errada — deveria ser 'em anexo'" },
      { label: "D", valor: "Correta — mas somente no plural" },
    ],
    correta: "B",
    explicacao:
      "'Anexo' é adjetivo e CONCORDA com o substantivo: 'anexas as cópias' (feminino plural). Já 'em anexo' é locução e NÃO varia.",
  },
];

const QUIZ_MOD3_POOL: QuizQuestion[] = [
  {
    id: 301,
    pergunta: "Em 'O poço secou **porque** choveu pouco', a conjunção é:",
    opcoes: [
      { label: "A", valor: "Explicativa" },
      { label: "B", valor: "Causal" },
      { label: "C", valor: "Concessiva" },
      { label: "D", valor: "Condicional" },
      { label: "E", valor: "Conformativa" },
    ],
    correta: "B",
    explicacao:
      "'Porque' introduz a CAUSA de o poço ter secado. A oração subordinada explica o motivo do fato principal. Causal ≠ Explicativa.",
  },
  {
    id: 302,
    pergunta: "Assinale a conjunção CONCESSIVA:",
    opcoes: [
      { label: "A", valor: "Se estudar, passará." },
      { label: "B", valor: "Choveu, mas fomos trabalhar." },
      {
        label: "C",
        valor: "**Embora** estivéssemos exaustos, finalizamos o turno.",
      },
      { label: "D", valor: "Estudou tanto **que** passou." },
      { label: "E", valor: "Conforme o esperado, fomos bem" },
    ],
    correta: "C",
    explicacao:
      "'Embora' é conjunção subordinativa concessiva: expressa um obstáculo que NÃO impede a ação principal.",
  },
  {
    id: 303,
    pergunta:
      "Na frase 'Fique calado, **que** a reunião vai começar', o 'que' tem valor de:",
    opcoes: [
      { label: "A", valor: "Pronome relativo" },
      { label: "B", valor: "Conjunção coordenativa explicativa" },
      { label: "C", valor: "Conjunção subordinativa causal" },
      { label: "D", valor: "Preposição" },
      { label: "E", valor: "Conjunção integrante" },
    ],
    correta: "B",
    explicacao:
      "Após verbo no imperativo ('Fique'), o 'que' equivale a 'pois/porque', justificando a ordem dada. É conjunção explicativa.",
  },
  {
    id: 304,
    pergunta:
      "Em 'O operador foi **a** Macaé verificar a plataforma', o 'a' é:",
    opcoes: [
      { label: "A", valor: "Artigo definido" },
      { label: "B", valor: "Preposição indicando destino/lugar" },
      { label: "C", valor: "Pronome oblíquo" },
      { label: "D", valor: "Conjunção" },
      { label: "E", valor: "Pronome demonstrativo" },
    ],
    correta: "B",
    explicacao:
      "A preposição 'a' liga o verbo 'ir' ao destino 'Macaé', indicando lugar/direção.",
  },
  {
    id: 305,
    pergunta: "Na locução '**Por causa de**', encontramos:",
    opcoes: [
      { label: "A", valor: "Locução adverbial" },
      { label: "B", valor: "Locução prepositiva" },
      { label: "C", valor: "Locução conjuntiva" },
      { label: "D", valor: "Duas preposições isoladas" },
      { label: "E", valor: "Advérbio de intensidade" },
    ],
    correta: "B",
    explicacao:
      "Grupos de palavras que terminam em preposição (de, com, a) e equivalem a uma preposição simples são Locuções Prepositivas.",
  },
  {
    id: 306,
    pergunta: "Qual é a diferença entre conjunção CAUSAL e EXPLICATIVA?",
    opcoes: [
      { label: "A", valor: "Não há diferença" },
      {
        label: "B",
        valor:
          "Causal traz o motivo real; Explicativa justifica a fala do emissor",
      },
      {
        label: "C",
        valor: "Causal é coordenativa; Explicativa é subordinativa",
      },
      { label: "D", valor: "Causal usa 'porque'; Explicativa usa 'pois'" },
      { label: "E", valor: "Explicativa indica tempo; Causal indica modo" },
    ],
    correta: "B",
    explicacao:
      "CAUSAL: 'Não fui porque choveu' (motivo real). EXPLICATIVA: 'Leve o guarda-chuva, porque vai chover' (justificativa da ordem/sugestão).",
  },
  {
    id: 307,
    pergunta: "Em 'Agiram **conforme** a regra ditava', a conjunção expressa:",
    opcoes: [
      { label: "A", valor: "Condição" },
      { label: "B", valor: "Conformidade" },
      { label: "C", valor: "Causa" },
      { label: "D", valor: "Concessão" },
      { label: "E", valor: "Tempo" },
    ],
    correta: "B",
    explicacao:
      "'Conforme' estabelece concordância de ações (conformativa): a ação foi feita da maneira que a regra ditava.",
  },
  {
    id: 308,
    pergunta: "A contração 'do' (de + o) aparece em qual alternativa?",
    opcoes: [
      { label: "A", valor: "Gosto **do** café da manhã." },
      { label: "B", valor: "Ele foi **ao** mercado." },
      { label: "C", valor: "Falou **com** o gerente." },
      { label: "D", valor: "Viajou **para** Santos." },
    ],
    correta: "A",
    explicacao:
      "'Do' é a contração da preposição 'de' + artigo 'o'. Em 'ao' temos 'a + o' (combinação). 'Com' e 'para' são preposições simples.",
  },
];

const QUIZ_MOD4_POOL: QuizQuestion[] = [
  {
    id: 401,
    pergunta:
      "Em 'Ele trabalha **muito** bem', as palavras destacadas são, respectivamente:",
    opcoes: [
      { label: "A", valor: "Advérbio de intensidade e Advérbio de modo" },
      { label: "B", valor: "Advérbio de tempo e Advérbio de modo" },
      { label: "C", valor: "Adjetivo e Advérbio" },
      { label: "D", valor: "Pronome e Advérbio" },
    ],
    correta: "A",
    explicacao:
      "'Muito' intensifica o advérbio 'bem' (intensidade). 'Bem' indica a maneira como ele trabalha (modo). Advérbio modifica advérbio!",
  },
  {
    id: 402,
    pergunta: "Marque a alternativa onde '**meio**' atue como ADVÉRBIO:",
    opcoes: [
      { label: "A", valor: "Comprei **meio** litro de óleo." },
      { label: "B", valor: "Ela estava **meio** cansada do plantão." },
      { label: "C", valor: "Encontramos o **meio** do caminho." },
      { label: "D", valor: "Cortou a maçã no **meio**." },
      { label: "E", valor: "Meio mundo estava lá." },
    ],
    correta: "B",
    explicacao:
      "Como advérbio de intensidade (= um pouco), 'meio' é INVARIÁVEL. Em 'meio litro', atua como numeral fracionário.",
  },
  {
    id: 403,
    pergunta:
      "'Estudo **bastante** todos os dias' vs 'Comprei **bastantes** livros'. A classificação é:",
    opcoes: [
      {
        label: "A",
        valor: "Advérbio (invariável) e Pronome Indefinido (variável)",
      },
      { label: "B", valor: "Pronome e Adjetivo" },
      { label: "C", valor: "Adjetivo e Advérbio" },
      { label: "D", valor: "Preposição e Pronome" },
      { label: "E", valor: "Conjunção e Adjetivo" },
    ],
    correta: "A",
    explicacao:
      "Modifica verbo (estudo muito) = advérbio INVARIÁVEL. Acompanha substantivo (muitos livros) = pronome adjetivo VARIÁVEL.",
  },
  {
    id: 404,
    pergunta: "Em 'É proibido entrada', a concordância está:",
    opcoes: [
      { label: "A", valor: "Errada — deveria ser 'É proibida entrada'" },
      {
        label: "B",
        valor: "Correta — sem artigo, a expressão fica invariável",
      },
      { label: "C", valor: "Errada — deveria ser 'São proibidas entradas'" },
      { label: "D", valor: "Correta — mas somente no registro coloquial" },
      { label: "E", valor: "Errada — pois entrada é substantivo" },
    ],
    correta: "B",
    explicacao:
      "SEM artigo: 'É proibido/necessário/bom' fica invariável. COM artigo: 'É proibida A entrada' (concorda com o substantivo feminino).",
  },
  {
    id: 405,
    pergunta:
      "O artigo transforma qualquer palavra em substantivo. Isso se chama:",
    opcoes: [
      { label: "A", valor: "Derivação prefixal" },
      { label: "B", valor: "Derivação imprópria (substantivação)" },
      { label: "C", valor: "Composição por justaposição" },
      { label: "D", valor: "Derivação sufixal" },
      { label: "E", valor: "Aglutinação" },
    ],
    correta: "B",
    explicacao:
      "O artigo é o 'Rei Midas': 'O cantar' (verbo→substantivo), 'O azul' (adjetivo→substantivo), 'Um não' (advérbio→substantivo).",
  },
  {
    id: 406,
    pergunta: "Em 'Os guardas estão **alerta**', a palavra 'alerta' é:",
    opcoes: [
      { label: "A", valor: "Adjetivo (varia em número)" },
      { label: "B", valor: "Advérbio (invariável)" },
      { label: "C", valor: "Substantivo" },
      { label: "D", valor: "Pronome" },
      { label: "E", valor: "Preposição" },
    ],
    correta: "B",
    explicacao:
      "'Alerta' é advérbio e NUNCA varia. 'Os guardas estão alerta' (correto). 'Os guardas estão alertas' (ERRADO).",
  },
];

const QUIZ_LABORATORIO_POOL: QuizQuestion[] = [
  {
    id: 501,
    pergunta:
      "Assinale a alternativa em que ocorreu substantivação de um verbo:",
    opcoes: [
      { label: "A", valor: "**O amanhecer** na plataforma é surpreendente." },
      { label: "B", valor: "Os trabalhadores cantavam felizes." },
      { label: "C", valor: "Precisamos comprar novos equipamentos." },
      { label: "D", valor: "Eles vão construir uma nova sede." },
      { label: "E", valor: "A plataforma é muito segura." },
    ],
    correta: "A",
    explicacao:
      "O artigo 'O' antes de 'amanhecer' transforma o verbo em substantivo (derivação imprópria).",
  },
  {
    id: 502,
    pergunta: "Em 'Iremos **embora** amanhã', a palavra destacada é:",
    opcoes: [
      { label: "A", valor: "Conjunção concessiva" },
      { label: "B", valor: "Advérbio de negação" },
      { label: "C", valor: "Advérbio de lugar/afastamento" },
      { label: "D", valor: "Preposição" },
      { label: "E", valor: "Substantivo" },
    ],
    correta: "C",
    explicacao:
      "'Embora' originalmente vem de 'em boa hora'. Como advérbio, indica afastamento. Como conjunção (Embora chova...), indica concessão.",
  },
  {
    id: 503,
    pergunta: "Ela não é **nenhuma** especialista. A palavra destacada é:",
    opcoes: [
      { label: "A", valor: "Pronome indefinido" },
      { label: "B", valor: "Numeral" },
      { label: "C", valor: "Adjetivo" },
      { label: "D", valor: "Pronome interrogativo" },
      { label: "E", valor: "Conjunção" },
    ],
    correta: "A",
    explicacao:
      "'Nenhuma' refere-se a 'especialista' de forma vaga/negativa, sendo pronome indefinido adjetivo.",
  },
  {
    id: 504,
    pergunta: "Qual das frases tem o adjetivo mudando de sentido pela posição?",
    opcoes: [
      { label: "A", valor: "Ele é um excelente engenheiro." },
      { label: "B", valor: "O **grande** líder / O líder **grande**" },
      { label: "C", valor: "Mesa suja / Computador sujo" },
      { label: "D", valor: "Relatório complexo" },
      { label: "E", valor: "Funcionário novo" },
    ],
    correta: "B",
    explicacao:
      "'Grande líder' = notável. 'Líder grande' = alto/corpulento. A posição muda o significado.",
  },
  {
    id: 505,
    pergunta:
      "'**Porque** choveu, o poço secou' vs 'Leve guarda-chuva, **porque** vai chover'. São, respectivamente:",
    opcoes: [
      { label: "A", valor: "Causal e Explicativa" },
      { label: "B", valor: "Explicativa e Causal" },
      { label: "C", valor: "Ambas causais" },
      { label: "D", valor: "Ambas explicativas" },
      { label: "E", valor: "Causal e Temporais" },
    ],
    correta: "A",
    explicacao:
      "1ª: motivo real do fato = CAUSAL. 2ª: justificativa da sugestão = EXPLICATIVA.",
  },
  {
    id: 506,
    pergunta: "Em 'Seguem **em anexo** as cópias', 'em anexo' é:",
    opcoes: [
      { label: "A", valor: "Adjetivo (varia)" },
      { label: "B", valor: "Locução adverbial (invariável)" },
      { label: "C", valor: "Preposição" },
      { label: "D", valor: "Locução adjetiva" },
      { label: "E", valor: "Conjunção" },
    ],
    correta: "B",
    explicacao:
      "'Em anexo' é locução e NÃO varia. Diferente de 'anexo' (adjetivo) que concorda: 'Seguem anexas as cópias'.",
  },
  {
    id: 507,
    pergunta: "Na frase 'Fui eu **que fiz**', o verbo concorda com:",
    opcoes: [
      { label: "A", valor: "O pronome relativo 'que'" },
      { label: "B", valor: "O antecedente 'eu'" },
      { label: "C", valor: "O predicativo" },
      { label: "D", valor: "É invariável" },
      { label: "E", valor: "Com o objeto direto" },
    ],
    correta: "B",
    explicacao:
      "Com pronome relativo QUE, o verbo concorda com o antecedente. 'Fui eu que FIZ' / 'Fomos nós que FIZEMOS'.",
  },
  {
    id: 508,
    pergunta:
      "'**Dois terços** dos técnicos **foram** aprovados'. O verbo concordou com:",
    opcoes: [
      { label: "A", valor: "A fração" },
      { label: "B", valor: "O especificador 'dos técnicos'" },
      { label: "C", valor: "O sujeito oculto" },
      { label: "D", valor: "O predicativo 'aprovados'" },
      { label: "E", valor: "Com o artigo" },
    ],
    correta: "B",
    explicacao:
      "Com fração + especificador, o verbo concorda com o especificador: 'dos técnicos' (plural) → 'foram'.",
  },
  {
    id: 509,
    pergunta: "A palavra '**menos**' é:",
    opcoes: [
      { label: "A", valor: "Adjetivo variável (menos/menas)" },
      { label: "B", valor: "Advérbio invariável (nunca 'menas')" },
      { label: "C", valor: "Pronome indefinido" },
      { label: "D", valor: "Numeral" },
      { label: "E", valor: "Conjunção" },
    ],
    correta: "B",
    explicacao:
      "'MENOS' é advérbio e NUNCA varia. A forma 'menas' NÃO EXISTE na norma culta.",
  },
  {
    id: 510,
    pergunta: "Em 'O candidato fez uma prova **ruim**', o termo destacado é:",
    opcoes: [
      { label: "A", valor: "Substantivo" },
      { label: "B", valor: "Termo acessório" },
      { label: "C", valor: "Adjetivo" },
      { label: "D", valor: "Advérbio" },
      { label: "E", valor: "Preposição" },
    ],
    correta: "C",
    explicacao:
      "'Ruim' qualifica a prova (substantivo). Termos que qualificam nomes são Adjetivos.",
  },
  {
    id: 511,
    pergunta: "**Ambos** os candidatos foram aprovados. 'Ambos' é:",
    opcoes: [
      { label: "A", valor: "Pronome indefinido" },
      { label: "B", valor: "Numeral dual" },
      { label: "C", valor: "Adjetivo" },
      { label: "D", valor: "Advérbio" },
      { label: "E", valor: "Artigo" },
    ],
    correta: "B",
    explicacao:
      "'Ambos/ambas' é numeral dual (indica 'os dois'). Sempre concorda em gênero: ambos (masc.) / ambas (fem.).",
  },
  {
    id: 512,
    pergunta: "**Ufa!** Que calor! A interjeição expressa:",
    opcoes: [
      { label: "A", valor: "Dor" },
      { label: "B", valor: "Alívio" },
      { label: "C", valor: "Admiração" },
      { label: "D", valor: "Desejo" },
      { label: "E", valor: "Aversão" },
    ],
    correta: "B",
    explicacao:
      "'Ufa!' é interjeição de alívio. O sentido depende do contexto, mas o uso mais comum de 'Ufa' é expressar alívio por algo ter terminado.",
  },
  {
    id: 513,
    pergunta:
      "Na frase 'Ele cantava **muito** bem', os termos destacados são, respectivamente:",
    opcoes: [
      { label: "A", valor: "Pronome indefinido / advérbio" },
      { label: "B", valor: "Advérbio de intensidade / advérbio de modo" },
      { label: "C", valor: "Adjetivo / pronome" },
      { label: "D", valor: "Advérbio / adjetivo" },
      { label: "E", valor: "Verbo / substantivo" },
    ],
    correta: "B",
    explicacao:
      "'Muito' intensifica o advérbio 'bem' (modo de cantar). Ambos são invariáveis.",
  },
  {
    id: 514,
    pergunta:
      "Classifique o 'A' nesta frase: '**A** plataforma foi inspecionada passo **a** passo.'",
    opcoes: [
      { label: "A", valor: "Artigo / Artigo" },
      { label: "B", valor: "Preposição / Artigo" },
      { label: "C", valor: "Artigo / Preposição" },
      { label: "D", valor: "Preposição / Preposição" },
      { label: "E", valor: "Pronome / Verbo" },
    ],
    correta: "C",
    explicacao:
      "O primeiro 'A' acompanha 'plataforma' (Artigo definido). O segundo liga palavras repetidas (Preposição).",
  },
  {
    id: 515,
    pergunta:
      "Em 'Eles **se** cumprimentaram antes da reunião', a voz verbal é:",
    opcoes: [
      { label: "A", valor: "Ativa" },
      { label: "B", valor: "Passiva Analítica" },
      { label: "C", valor: "Passiva Sintética" },
      { label: "D", valor: "Reflexiva Recíproca" },
      { label: "E", valor: "Voz Média" },
    ],
    correta: "D",
    explicacao:
      "A ação é trocada simultaneamente entre os membros do sujeito: um cumprimenta o outro e é cumprimentado por ele.",
  },
  {
    id: 516,
    pergunta: "Assinale onde ocorreu derivação imprópria (substantivação):",
    opcoes: [
      { label: "A", valor: "O técnico chegou." },
      { label: "B", valor: "Tinha um andar bonito." },
      { label: "C", valor: "Uma linda casa foi alugada." },
      { label: "D", valor: "Falaram sobre as melhorias." },
      { label: "E", valor: "O dia está belo." },
    ],
    correta: "B",
    explicacao:
      "'Andar', originalmente verbo, é transformado em substantivo pelo artigo 'um'.",
  },
  {
    id: 517,
    pergunta:
      "Qual frase tem verbo IMPESSOAL e concorda corretamente no plural?",
    opcoes: [
      { label: "A", valor: "Haviam muitas chances de aprovação." },
      { label: "B", valor: "Fazem dez anos da descoberta do pré-sal." },
      { label: "C", valor: "Pode haver sérios riscos no mar." },
      { label: "D", valor: "Devem fazer dias frios por aqui." },
      { label: "E", valor: "Vão haver novos concursos." },
    ],
    correta: "C",
    explicacao:
      "HAVER = Existir é impessoal (singular). Se tem auxiliar, ele acompanha o singular. Portanto, 'Pode haver' é correto; as outras estão erradas ('Havia', 'Faz', 'Deve fazer').",
  },
  {
    id: 518,
    pergunta: "'O **que**' pode ser, dependendo do contexto:",
    opcoes: [
      { label: "A", valor: "Uma conjunção coordenativa apenas." },
      { label: "B", valor: "Um verbo ou um advérbio." },
      { label: "C", valor: "Um preposição ou um adjetivo." },
      { label: "D", valor: "Um pronome relativo ou conjunção integrante." },
      { label: "E", valor: "Apenas um artigo." },
    ],
    correta: "D",
    explicacao:
      "A palavra 'que' frequentemente atua como pronome relativo (o qual/a qual) ou conjunção subordinativa integrante (que as coisas melhorem).",
  },
  {
    id: 519,
    pergunta: "Sobre 'Onde' e 'Aonde', marque a opção CORRETA:",
    opcoes: [
      { label: "A", valor: "Onde você vai?" },
      { label: "B", valor: "Aonde você está?" },
      { label: "C", valor: "O documento mostra aonde fica o tesouro." },
      { label: "D", valor: "Aonde nos leva esta tubulação?" },
      { label: "E", valor: "Onde nos leva este caminho?" },
    ],
    correta: "D",
    explicacao:
      "'Aonde' indica movimento (Para onde). O verbo 'levar' pede destino ('leva a'). As demais pedem estado/lugar fixo, portanto deveriam usar 'onde'.",
  },
  {
    id: 520,
    pergunta:
      "Em 'Fique quieto, **que** a palestra já começou', o 'que' equivale a:",
    opcoes: [
      { label: "A", valor: "Conjunção Causal" },
      { label: "B", valor: "Conjunção Explicativa (pois)" },
      { label: "C", valor: "Pronome Relativo" },
      { label: "D", valor: "Preposição" },
      { label: "E", valor: "Advérbio" },
    ],
    correta: "B",
    explicacao:
      "Após verbo no imperativo ('Fique quieto'), o 'que' inicia oração coordenada explicativa, justificando a ordem.",
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
  const [showCompletionBadge, setShowCompletionBadge] = useState(false);

  const [qMod1, setQMod1] = useState<QuizQuestion[]>([]);
  const [qMod2, setQMod2] = useState<QuizQuestion[]>([]);
  const [qMod3, setQMod3] = useState<QuizQuestion[]>([]);
  const [qMod4, setQMod4] = useState<QuizQuestion[]>([]);
  const [qMod5, setQMod5] = useState<QuizQuestion[]>([]);
  const [qMod6, setQMod6] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    setQMod1(getRandomQuestions(QUIZ_MOD1_POOL, 6));
    setQMod2(getRandomQuestions(QUIZ_MOD2_POOL, 6));
    setQMod3(getRandomQuestions(QUIZ_MOD3_POOL, 6));
    setQMod4(getRandomQuestions(QUIZ_MOD4_POOL, 6));
    setQMod5(getRandomQuestions(QUIZ_LABORATORIO_POOL.slice(0, 10), 8));
    setQMod6(getRandomQuestions(QUIZ_LABORATORIO_POOL, 20));
  }, []);

  // Sincronizar progresso inicial do estado global (apenas uma vez na carga)
  const [hasSyncedInitial, setHasSyncedInitial] = useState(false);

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
    const total = MODULE_DEFS.length;
    const done = completedModules.size;
    const percent = Math.round((done / total) * 100);
    if (percent >= 100) setShowCompletionBadge(true);
  }, [completedModules]);

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 60) {
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
        setActiveTab(MODULE_DEFS[index + 1].id);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        onComplete();
      }
    }
  };

  const isModuleUnlocked = useCallback((_moduleIndex: number) => {
    return true; // TEMPORÁRIO: Desbloqueado para revisão
  }, []);

  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      modules={Array.from(MODULE_DEFS)}
      completedModules={completedModules}
      isModuleUnlocked={isModuleUnlocked}
      titulo="Classes de Palavras"
      descricao="Domine as 10 categorias morfológicas: classes variáveis e invariáveis para a Cesgranrio."
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
      {/* ══════════════════════════════════════════════
                    MÓDULO 1: VERBO & SUBSTANTIVO
                ══════════════════════════════════════════════ */}
      <TabsContent value="modulo-1" className="space-y-12 mt-12">
        <ModuleBanner
          numero={1}
          titulo="Verbo & Substantivo"
          descricao="As bases fundamentais da morfologia."
          gradiente="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-600"
        />

        {/* ── VERBO ── */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={1}
            title="O Verbo — Conceito Científico"
            variant="indigo"
          />
          <p className="text-lg text-muted-foreground text-justify leading-relaxed">
            O <strong>Verbo</strong> é a classe de palavra que exprime{" "}
            <strong>ação</strong> (correr, perfurar), <strong>estado</strong>{" "}
            (ser, estar, permanecer) ou <strong>fenômeno da natureza</strong>{" "}
            (chover, anoitecer). É a única classe que se flexiona em{" "}
            <strong>cinco categorias</strong>: pessoa, número, tempo, modo e
            voz. Por isso, é considerado o núcleo do predicado e o motor
            dinâmico de qualquer oração.
          </p>
          <AlertBox tipo="info" titulo="Por que o Verbo é o 1º?">
            Na Cesgranrio, o verbo aparece diretamente nas questões de
            Concordância Verbal (2º tema mais cobrado), Regência (3º) e Vozes
            Verbais. Dominar o verbo é dominar metade da prova.
          </AlertBox>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="Flexões Verbais"
            variant="indigo"
          />
          <p className="text-base text-muted-foreground leading-relaxed text-justify">
            Para entender como o verbo funciona nas questões da Cesgranrio, é
            essencial dominar suas <strong>cinco dimensões de variação</strong>.
            Cada uma dessas flexões altera a terminação do verbo (desinência)
            para situar a mensagem no tempo, definir a atitude do falante ou
            identificar os envolvidos no discurso. Explore abaixo cada
            categoria:
          </p>
          <ContentAccordion
            mode="stacked"
            titulo="As 5 Flexões Verbais"
            icone={<LuZap />}
            corIndicador="bg-emerald-500"
            defaultOpen={true}
            slidesPerView={1}
            slides={[
              {
                titulo: "1. Pessoa",
                icone: "👤",
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      <strong>Conceito:</strong> A flexão de{" "}
                      <strong>Pessoa</strong> indica quem participa do discurso.
                      Existem três pessoas: quem fala (1ª pessoa), com quem se
                      fala (2ª pessoa) e de quem se fala (3ª pessoa).
                    </p>
                    <div className="bg-emerald-500/10 p-5 rounded-xl border border-emerald-500/20 text-sm space-y-2">
                      <p>
                        <strong>1ª pessoa (Emissor):</strong>{" "}
                        <strong>Eu</strong> perfuro / <strong>Nós</strong>{" "}
                        perfuramos
                      </p>
                      <p>
                        <strong>2ª pessoa (Receptor):</strong>{" "}
                        <strong>Tu</strong> perfuras / <strong>Vós</strong>{" "}
                        perfurais
                      </p>
                      <p>
                        <strong>3ª pessoa (Assunto):</strong>{" "}
                        <strong>Ele</strong> perfura / <strong>Eles</strong>{" "}
                        perfuram
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "2. Número",
                icone: "🔢",
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      <strong>Conceito:</strong> A flexão de{" "}
                      <strong>Número</strong> indica a quantidade de seres que
                      praticam ou sofrem a ação, dividindo-se entre{" "}
                      <strong>Singular</strong> (um ser) e{" "}
                      <strong>Plural</strong> (mais de um ser).
                    </p>
                    <div className="bg-emerald-500/10 p-5 rounded-xl border border-emerald-500/20 text-sm space-y-2">
                      <p>
                        <strong>Singular:</strong> A plataforma{" "}
                        <strong>opera</strong> hoje.
                      </p>
                      <p>
                        <strong>Plural:</strong> As plataformas{" "}
                        <strong>operam</strong> hoje.
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "3. Tempo",
                icone: "⏳",
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      <strong>Conceito:</strong> O <strong>Tempo</strong> verbal
                      situa a ação no eixo cronológico em relação ao momento da
                      fala: Presente, Passado (Pretérito) ou Futuro.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 text-sm">
                        <strong className="text-emerald-700 dark:text-emerald-400">
                          Presente
                        </strong>
                        <p className="mt-1">Fato atual ou rotineiro.</p>
                        <p className="italic mt-1">
                          &quot;Eu <strong>estudo</strong> todos os dias.&quot;
                        </p>
                      </div>
                      <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 text-sm">
                        <strong className="text-blue-700 dark:text-blue-400">
                          Pretérito Perfeito
                        </strong>
                        <p className="mt-1">
                          Ação <strong>concluída</strong> no passado.
                        </p>
                        <p className="italic mt-1">
                          &quot;A broca <strong>perfurou</strong> o solo.&quot;
                        </p>
                      </div>
                      <div className="bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20 text-sm">
                        <strong className="text-indigo-700 dark:text-indigo-400">
                          Futuro do Pretérito
                        </strong>
                        <p className="mt-1">
                          Ação que dependeria de uma condição.
                        </p>
                        <p className="italic mt-1">
                          &quot;A Petrobras <strong>bateria</strong> o
                          recorde.&quot;
                        </p>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "4. Modo",
                icone: "🎭",
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      <strong>Conceito:</strong> O <strong>Modo</strong> indica
                      a atitude (certeza, dúvida ou ordem) que o emissor tem em
                      relação ao fato que enuncia.
                    </p>
                    <div className="bg-teal-500/10 p-5 rounded-xl border border-teal-500/20 text-sm space-y-3">
                      <p>
                        <strong>Indicativo (Certeza):</strong> &quot;Ele{" "}
                        <strong>passará</strong> no concurso da Petrobras.&quot;
                      </p>
                      <p>
                        <strong>Subjuntivo (Dúvida/Hipótese):</strong>{" "}
                        &quot;Talvez ele <strong>passe</strong> no
                        concurso.&quot;
                      </p>
                      <p>
                        <strong>Imperativo (Ordem/Pedido):</strong> &quot;
                        <strong>Passe</strong> no concurso!&quot;
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "5. Voz",
                icone: "🗣️",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-sm text-foreground/80 leading-relaxed italic">
                      A <strong>Voz Verbal</strong> indica a relação entre o
                      sujeito e a ação verbal: se ele pratica (agente), sofre
                      (paciente) ou as duas coisas simultaneamente.
                    </p>
                    <CardCarousel
                      titulo="As 5 Vozes Verbais"
                      itemsPerView={2}
                      cards={[
                        {
                          icone: <LuZap className="text-amber-500" />,
                          titulo: "ATIVA",
                          descricao:
                            '"O técnico consertou a válvula." (O sujeito pratica a ação)',
                        },
                        {
                          icone: <LuShield className="text-amber-500" />,
                          titulo: "PASSIVA ANALÍTICA",
                          descricao:
                            '"A válvula foi consertada pelo técnico." (Ser + Particípio)',
                        },
                        {
                          icone: <LuShield className="text-amber-500" />,
                          titulo: "PASSIVA SINTÉTICA",
                          descricao:
                            '"Consertaram-se as válvulas." (Verbo + pronome SE)',
                        },
                        {
                          icone: <LuActivity className="text-amber-500" />,
                          titulo: "REFLEXIVA",
                          descricao:
                            '"O trabalhador cortou-se." (Pratica e sofre a ação)',
                        },
                        {
                          icone: <LuActivity className="text-amber-500" />,
                          titulo: "REFLEXIVA RECÍPROCA",
                          descricao:
                            '"Os engenheiros cumprimentaram-se." (Ação mútua)',
                        },
                      ]}
                    />
                    <AlertBox
                      tipo="danger"
                      titulo="A Queridinha da Cesgranrio: Passiva Sintética"
                    >
                      Atenção ao pronome "SE" apassivador! Em "Vendem-se casas",
                      "casas" é o sujeito passivo. Por isso, o verbo deve
                      OBRIGATORIAMENTE ir para o plural acompanhando o alvo da
                      ação. Jamais escreva "Vende-se casas".
                    </AlertBox>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={3}
            title="Conjugação Verbal — Modos e Tempos"
            variant="indigo"
          />
          <p className="text-base text-muted-foreground leading-relaxed text-justify">
            O domínio da <strong>Conjugação Verbal</strong> é a base para a
            Correção Gramatical. A <strong>CESGRANRIO</strong> testa
            frequentemente o reconhecimento do tempo e do modo nas orações.
            Abaixo, destacamos a conjugação dos tempos mais incidentes em três
            verbos-modelo regulares: <strong>Estudar</strong> (1ª conj.),{" "}
            <strong>Vender</strong> (2ª conj.) e <strong>Partir</strong> (3ª
            conj.).
          </p>
          <ContentAccordion
            mode="stacked"
            titulo="Tempos Verbais Principais"
            icone={<LuBookOpen />}
            corIndicador="bg-blue-500"
            defaultOpen={false}
            slidesPerView={1}
            slides={CONJ_SLIDES}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={4}
            title="Verbos Impessoais — Pegadinha Máxima"
            variant="indigo"
          />
          <p className="text-base text-muted-foreground leading-relaxed text-justify">
            Existem verbos que <strong>não possuem sujeito</strong>. Como não há
            ninguém para "mandar" neles, eles assumem uma forma congelada na 3ª
            pessoa do singular. O domínio dessas regras é fundamental para
            gabaritar questões de Concordância Verbal, pois a banca
            frequentemente tenta enganar o candidato colocando um "falso
            sujeito" no plural logo após esses verbos.
          </p>
          <AlertBox tipo="danger" titulo="🚨 Cai em TODA prova Cesgranrio!">
            Os verbos HAVER (sentido de existir) e FAZER (tempo decorrido) são
            IMPESSOAIS: ficam SEMPRE na 3ª pessoa do singular, independentemente
            do contexto.
          </AlertBox>
          <CardCarousel
            titulo="Verbos Impessoais — Regras"
            subtitulo="Decore: impessoal = singular SEMPRE"
            cards={[
              {
                icone: <LuShield className="text-emerald-500" />,
                titulo: "HAVER = Existir",
                descricao: (
                  <div className="space-y-2 text-sm">
                    <p>
                      ✅ &quot;<strong>Havia</strong> muitos candidatos.&quot;
                    </p>
                    <p>❌ &quot;Haviam muitos candidatos.&quot;</p>
                    <p className="text-muted-foreground italic">
                      Macete: troque por &quot;existir&quot;. Se der certo,
                      HAVER fica no singular.
                    </p>
                  </div>
                ),
              },
              {
                icone: <LuShield className="text-blue-500" />,
                titulo: "FAZER = Tempo",
                descricao: (
                  <div className="space-y-2 text-sm">
                    <p>
                      ✅ &quot;<strong>Faz</strong> três meses que viajei.&quot;
                    </p>
                    <p>❌ &quot;Fazem três meses que viajei.&quot;</p>
                    <p className="text-muted-foreground italic">
                      Indica tempo decorrido → singular obrigatório.
                    </p>
                  </div>
                ),
              },
              {
                icone: <LuShield className="text-indigo-500" />,
                titulo: "Auxiliar + HAVER",
                descricao: (
                  <div className="space-y-2 text-sm">
                    <p>
                      ✅ &quot;<strong>Deve haver</strong> vagas.&quot;
                    </p>
                    <p>❌ &quot;Devem haver vagas.&quot;</p>
                    <p className="text-muted-foreground italic">
                      O auxiliar &quot;herda&quot; a impessoalidade.
                    </p>
                  </div>
                ),
              },
              {
                icone: <LuShield className="text-rose-500" />,
                titulo: "EXISTIR ≠ HAVER",
                descricao: (
                  <div className="space-y-2 text-sm">
                    <p>
                      ✅ &quot;<strong>Existiam</strong> muitos
                      candidatos.&quot;
                    </p>
                    <p className="text-muted-foreground italic">
                      EXISTIR é PESSOAL → vai ao plural normalmente. A
                      Cesgranrio adora misturar os dois!
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={5}
            title="Macete de Resolução — Verbo"
            variant="indigo"
          />
          <TimelineItem
            passo={1}
            titulo="Ache o verbo"
            descricao="Grife o verbo principal da oração."
          />
          <TimelineItem
            passo={2}
            titulo="Pergunte 'Quem?'"
            descricao="A resposta é o sujeito. Ele manda na concordância."
          />
          <TimelineItem
            passo={3}
            titulo="Tem 'SE'?"
            descricao="Analise: VTD + SE = Passiva (verbo concorda com paciente). VTI + SE = Indeterminação (singular)."
          />
          <TimelineItem
            passo={4}
            titulo="É impessoal?"
            descricao="Haver, fazer (tempo), chover = singular SEMPRE."
            isLast
          />
        </section>

        {/* ── SUBSTANTIVO ── */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={6}
            title="O Substantivo — Conceito Científico"
            variant="indigo"
          />
          <p className="text-lg text-muted-foreground text-justify leading-relaxed">
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
            <strong>função</strong> (Profissão da palavra). Ex:
            &quot;navio&quot; → Morfologia: substantivo concreto. Sintaxe: pode
            ser sujeito, objeto direto, etc.
          </AlertBox>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={7}
            title="Classificações dos Substantivos"
            variant="indigo"
          />
          <p className="text-base text-muted-foreground leading-relaxed text-justify">
            Os substantivos não são todos iguais. Eles são organizados em{" "}
            <strong>quatro pares de oposição</strong> que ajudam a definir a
            natureza do ser ou objeto nomeado. Dominar essas classificações é
            fundamental para entender tópicos avançados como a concordância
            nominal e a regência. Veja como eles se dividem:
          </p>
          <ContentAccordion
            mode="stacked"
            titulo="Os 4 Pares de Classificação"
            icone={<LuTag />}
            corIndicador="bg-teal-500"
            defaultOpen={true}
            slidesPerView={1}
            slides={[
              {
                titulo: "Concreto vs Abstrato",
                icone: "1️⃣",
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      <strong>Concreto:</strong> designa seres reais ou
                      imaginários que possuem existência própria (independente
                      de outro ser). <strong>Abstrato:</strong> designa ações,
                      qualidades, estados e sentimentos (dependem de outro ser
                      para existir).
                    </p>
                    <CardCarousel
                      titulo="Exemplos Práticos"
                      itemsPerView={1}
                      cards={[
                        {
                          icone: <LuTag />,
                          titulo: "Substantivo Concreto",
                          descricao:
                            "Plataforma (objeto), Macaé (lugar), Sereia (ser imaginário), Vento (fenômeno natural). Todos têm existência autônoma.",
                        },
                        {
                          icone: <LuTag />,
                          titulo: "Substantivo Abstrato",
                          descricao:
                            "Extração (ação de extrair), Rapidez (qualidade), Felicidade (sentimento), Saudade (estado). Só existem em um ser.",
                        },
                      ]}
                    />
                  </div>
                ),
              },
              {
                titulo: "Próprio vs Comum",
                icone: "2️⃣",
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      <strong>Próprio:</strong> particulariza e individualiza um
                      ser dentro de uma espécie (sempre escrito com letra
                      maiúscula). <strong>Comum:</strong> nomeia todos os seres
                      de uma mesma espécie de forma genérica.
                    </p>
                    <div className="bg-amber-500/10 p-5 rounded-xl border border-amber-500/20 text-sm">
                      <p className="mb-2">
                        🏆 <strong>Comum:</strong> empresa, funcionário, oceano,
                        país.
                      </p>
                      <p>
                        🌟 <strong>Próprio:</strong> Petrobras, André,
                        Atlântico, Brasil.
                      </p>
                      <p className="mt-4 italic">
                        Exemplo: &quot;A <strong>Petrobras</strong> (próprio)
                        atua no <strong>oceano</strong> (comum)
                        brasileiro.&quot;
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "Simples vs Composto",
                icone: "3️⃣",
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      <strong>Simples:</strong> formado por apenas um radical ou
                      palavra-base. <strong>Composto:</strong> formado por duas
                      ou mais palavras-base unidas (com ou sem hífen).
                    </p>
                    <div className="bg-indigo-500/10 p-5 rounded-xl border border-indigo-500/20 text-sm">
                      <p className="mb-2">
                        🔹 <strong>Simples:</strong> mar, sol, flor, óleo.
                      </p>
                      <p>
                        🧩 <strong>Composto:</strong> beija-flor, girassol (gira
                        + sol), petróleo (petra + oleum), guarda-chuva.
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "Primitivo vs Derivado",
                icone: "4️⃣",
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      <strong>Primitivo:</strong> é a palavra original, que não
                      provém de outra na língua. <strong>Derivado:</strong> é a
                      palavra originada de outra base através da adição de
                      afixos (prefixo ou sufixo).
                    </p>
                    <div className="bg-pink-500/10 p-5 rounded-xl border border-pink-500/20 text-sm">
                      <p>
                        🌱 <strong>Primitivo:</strong> ferro, dente, mar, rio.
                      </p>
                      <p>
                        🌿 <strong>Derivados:</strong> ferr
                        <strong>agem</strong>, dent<strong>ista</strong>, mar
                        <strong>ítimo</strong>, ri<strong>acho</strong>.
                      </p>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={8}
            title="A Derivação Imprópria — O 'Efeito Rei Midas'"
            variant="indigo"
          />
          <p className="text-lg text-muted-foreground text-justify leading-relaxed mb-4">
            Se você colocar um <strong>artigo</strong> antes de QUALQUER
            palavra, ela vira Substantivo. Isso se chama{" "}
            <strong>Derivação Imprópria</strong> (substantivação).
          </p>
          <div className="bg-amber-500/10 border-l-4 border-amber-500 p-5 rounded-xl mb-6 text-sm text-foreground">
            <p>
              <strong>Quem é o Rei Midas?</strong> Na mitologia grega, o Rei
              Midas transformava em ouro tudo o que tocava. Na Língua
              Portuguesa, o{" "}
              <strong className="text-amber-600">
                Artigo é o nosso Rei Midas
              </strong>
              : qualquer palavra da língua que venha antecedida por ele perderá
              a sua classe original e será imediatamente transformada em
              Substantivo.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                  <span className="font-bold text-3xl md:text-4xl bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent drop-shadow-sm">
                    Verbo
                  </span>
                  <LuArrowDown className="w-10 h-10 text-muted-foreground/40 animate-bounce" />
                  <span className="font-bold text-2xl md:text-3xl tracking-tight text-foreground/90">
                    Substantivo
                  </span>
                </div>
              }
              verso={
                <div className="flex flex-col justify-center h-full space-y-4 text-center text-sm md:text-base p-2">
                  <div>
                    <p>
                      <strong>O cantar</strong> dos pássaros encanta.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      (O = artigo + cantar = verbo)
                    </p>
                  </div>
                  <hr className="border-border/50" />
                  <div>
                    <p>
                      Foi um <strong>amanhecer</strong> radiante.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      (Um = artigo + amanhecer = verbo)
                    </p>
                  </div>
                  <hr className="border-border/50" />
                  <div>
                    <p>
                      Ele tem um <strong>andar</strong> esquisito.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      (Um = artigo + andar = verbo)
                    </p>
                  </div>
                </div>
              }
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                  <span className="font-bold text-3xl md:text-4xl bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent drop-shadow-sm">
                    Advérbio
                  </span>
                  <LuArrowDown className="w-10 h-10 text-muted-foreground/40 animate-bounce" />
                  <span className="font-bold text-2xl md:text-3xl tracking-tight text-foreground/90">
                    Substantivo
                  </span>
                </div>
              }
              verso={
                <div className="flex flex-col justify-center h-full space-y-4 text-center text-sm md:text-base p-2">
                  <div>
                    <p>
                      Ele recebeu um <strong>não</strong> rotundo.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      (Um = artigo + não = advérbio)
                    </p>
                  </div>
                  <hr className="border-border/50" />
                  <div>
                    <p>
                      Espero um <strong>sim</strong> da presidência.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      (Um = artigo + sim = advérbio)
                    </p>
                  </div>
                  <hr className="border-border/50" />
                  <div>
                    <p>
                      Não entendo o <strong>porquê</strong> de tudo.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      (&quot;Porquê&quot; substantivado por &quot;o&quot;)
                    </p>
                  </div>
                </div>
              }
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                  <span className="font-bold text-3xl md:text-4xl bg-gradient-to-r from-cyan-600 to-blue-500 bg-clip-text text-transparent drop-shadow-sm">
                    Adjetivo
                  </span>
                  <LuArrowDown className="w-10 h-10 text-muted-foreground/40 animate-bounce" />
                  <span className="font-bold text-2xl md:text-3xl tracking-tight text-foreground/90">
                    Substantivo
                  </span>
                </div>
              }
              verso={
                <div className="flex flex-col justify-center h-full space-y-4 text-center text-sm md:text-base p-2">
                  <div>
                    <p>
                      <strong>O azul</strong> do céu é muito intenso.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      (O = artigo + azul = adjetivo)
                    </p>
                  </div>
                  <hr className="border-border/50" />
                  <div>
                    <p>
                      Ele sempre defende os <strong>pobres</strong>.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      (Os = artigo + pobre = adjetivo)
                    </p>
                  </div>
                  <hr className="border-border/50" />
                  <div>
                    <p>
                      O <strong>bom</strong> da vida é tentar.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      (O = artigo + bom = adjetivo)
                    </p>
                  </div>
                </div>
              }
            />
          </div>
        </section>

        {/* Resumo + Quiz */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={9}
            title="Resumo e Multimídia"
            variant="indigo"
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
                        title="Resumo: Verbos e Substantivos"
                        duration="15:00"
                        thumbnail="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1074&auto=format&fit=crop"
                      />
                    </div>
                  </div>
                ),
              },
              {
                id: "resumo",
                label: "Resumo Visual",
                icon: LuBookOpen,
                content: (
                  <ModuleSummaryCarouselNew
                    images={[
                      {
                        title: "Mapa Mental: Flexões Verbais",
                        type: "Mapa Mental",
                        imageUrl:
                          "/assets/images/portugues/classes-palavras/modulo-1/mapa-mental-flexoes-verbais.png",
                        placeholderColor: "bg-emerald-100",
                      },
                      {
                        title: "Tabela: Modos e Tempos",
                        type: "Tabela",
                        imageUrl:
                          "/assets/images/portugues/classes-palavras/modulo-1/tabela-modos-tempos.png",
                        placeholderColor: "bg-teal-100",
                      },
                      {
                        title: "Infográfico: Substantivos",
                        type: "Infográfico",
                        imageUrl:
                          "/assets/images/portugues/classes-palavras/modulo-1/infografico-substantivos.png",
                        placeholderColor: "bg-amber-100",
                      },
                      {
                        title: "Card Resumo: Concreto vs Abstrato",
                        type: "Card",
                        imageUrl:
                          "/assets/images/portugues/classes-palavras/modulo-1/card-concreto-abstrato.png",
                        placeholderColor: "bg-indigo-100",
                      },
                    ]}
                  />
                ),
              },
              {
                id: "visual",
                label: "Macete Visual",
                icon: LuBrain,
                content: (
                  <div className="text-center p-8 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-2xl border border-emerald-500/10">
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      Haver vs Existir
                    </h3>
                    <div className="text-7xl my-8 animate-bounce">👤 ↔️ 👥</div>
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                      "'Haver' fica no SINGULAR | 'Existir' vai para o PLURAL!
                      Substituiu 'haver' por 'existir'? Flexione!"
                    </p>
                  </div>
                ),
              },
              {
                id: "audio",
                label: "Áudio Resumo",
                icon: LuMusic,
                content: (
                  <div className="w-full flex justify-center py-4">
                    <div className="w-full max-w-md">
                      <MusicPlayerCard
                        audioUrl="#"
                        titulo="Funk do Verbo e Substantivo"
                        artista="Prof. André"
                        capaUrl="https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=1000&auto=format&fit=crop"
                        lyrics={`(Verso 1)
Verbo flexiona em tempo, modo e pessoa
Substantivo dá nome a tudo que se sonha
Concreto pega, abstrato pensa
É a base da língua, a força imensa!

(Refrão)
Haver no singular, existir no plural
É a regra de ouro, parceiro, é fundamental!
                                                        `}
                      />
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </section>
        <section className="mt-16">
          <QuizInterativo
            questoes={qMod1}
            titulo="Quiz — Verbo & Substantivo"
            icone="📝"
            numero={10}
            variant="indigo"
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          />
        </section>
      </TabsContent>
      {/* ══════════════════════════════════════════════
                        MÓDULO 2: PRONOME & ADJETIVO
                    ══════════════════════════════════════════════ */}
      <TabsContent value="modulo-2" className="space-y-16 mt-12">
        <ModuleBanner
          numero={2}
          titulo="Pronome & Adjetivo"
          descricao="O substituto que garante a coesão e o qualificador que define a concordância nominal."
          gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
        />

        {/* ── PRONOME ── */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={1}
            title="O Pronome — Conceito Científico"
            variant="emerald"
          />
          <p className="text-lg text-muted-foreground text-justify leading-relaxed">
            O <strong>Pronome</strong> é a classe de palavra que{" "}
            <strong>substitui</strong> ou <strong>acompanha</strong> o
            substantivo, indicando as pessoas do discurso. Diferentemente do
            substantivo, ele não nomeia: apenas aponta, retoma ou refere-se a
            algo já mencionado. É fundamental para a{" "}
            <strong>coesão textual</strong>, pois evita a repetição de termos.
          </p>
          <AlertBox
            tipo="info"
            titulo="Pronome Substantivo vs Pronome Adjetivo"
          >
            <strong>Pronome Substantivo:</strong> substitui o nome → &quot;Ele
            chegou.&quot; (Ele = João). <strong>Pronome Adjetivo:</strong>{" "}
            acompanha o nome → &quot;Aquele carro chegou.&quot; (Aquele
            determina &quot;carro&quot;). Saber diferenciar é essencial para
            questões de coesão.
          </AlertBox>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="Pronomes Pessoais — Retos e Oblíquos"
            variant="emerald"
          />
          <ContentAccordion
            mode="stacked"
            slidesPerView={1}
            titulo="Tabela Completa dos Pessoais"
            icone={<LuNavigation />}
            corIndicador="bg-blue-500"
            defaultOpen={true}
            slides={[
              {
                titulo: "Retos (Sujeito) vs Oblíquos (Complemento)",
                icone: "1️⃣",
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Os <strong>Retos</strong> funcionam como sujeito. Os{" "}
                      <strong>Oblíquos Átonos</strong> como complemento verbal
                      (objeto).
                    </p>
                    <div className="bg-blue-500/10 p-5 rounded-xl border border-blue-500/20 text-sm">
                      <div className="grid grid-cols-3 gap-2 font-mono">
                        <div>
                          <strong>Reto</strong>
                        </div>
                        <div>
                          <strong>Oblíquo Átono</strong>
                        </div>
                        <div>
                          <strong>Oblíquo Tônico</strong>
                        </div>
                        <div>Eu</div>
                        <div>me</div>
                        <div>mim, comigo</div>
                        <div>Tu</div>
                        <div>te</div>
                        <div>ti, contigo</div>
                        <div>Ele/Ela</div>
                        <div>o, a, lhe, se</div>
                        <div>ele, ela, si, consigo</div>
                        <div>Nós</div>
                        <div>nos</div>
                        <div>nós, conosco</div>
                        <div>Eles/Elas</div>
                        <div>os, as, lhes, se</div>
                        <div>eles, elas, si, consigo</div>
                      </div>
                    </div>
                    <AlertBox
                      tipo="warning"
                      titulo="Pegadinha: O/A = Objeto Direto, LHE = Objeto Indireto"
                    >
                      &quot;Eu <strong>o</strong> vi&quot; (vi alguém = OD).
                      &quot;Eu <strong>lhe</strong> dei o livro&quot; (dei a
                      alguém = OI). Nunca use &quot;lhe&quot; como OD!
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "Colocação Pronominal (Próclise, Ênclise, Mesóclise)",
                icone: "2️⃣",
                conteudo: (
                  <div className="space-y-3">
                    <p className="text-muted-foreground">
                      <strong>Próclise</strong> (antes): palavras negativas,
                      advérbios, pronomes relativos atraem o pronome.{" "}
                      <strong>Ênclise</strong> (depois): início de frase, após
                      pausa. <strong>Mesóclise</strong> (no meio): só com Futuro
                      do Presente/Pretérito.
                    </p>
                    <div className="bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20 text-sm space-y-1">
                      <p>
                        ✅ &quot;Não <strong>me</strong> diga isso.&quot;
                        (Próclise — &quot;não&quot; atrai)
                      </p>
                      <p>
                        ✅ &quot;Diga-<strong>me</strong> a verdade.&quot;
                        (Ênclise — início de frase)
                      </p>
                      <p>
                        ✅ &quot;Dir-<strong>lhe</strong>-ei a verdade.&quot;
                        (Mesóclise — futuro do presente)
                      </p>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={3}
            title="Pronomes Demonstrativos e Relativos"
            variant="emerald"
          />
          <CardCarousel
            titulo="Os Grandes Astros dos Pronomes"
            subtitulo="Top 3 tipos mais cobrados na Cesgranrio"
            cards={[
              {
                icone: <LuNavigation className="text-blue-500" />,
                titulo: "Demonstrativos",
                descricao: (
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>ESTE/ESTA:</strong> perto do emissor (aqui,
                      presente, futuro).
                    </p>
                    <p>
                      <strong>ESSE/ESSA:</strong> perto do receptor (aí, passado
                      próximo).
                    </p>
                    <p>
                      <strong>AQUELE/AQUELA:</strong> longe de ambos (lá,
                      passado remoto).
                    </p>
                    <p className="text-muted-foreground italic mt-2">
                      No texto: ESTE = o que vou dizer. ESSE = o que já disse.
                    </p>
                  </div>
                ),
              },
              {
                icone: <LuNavigation className="text-indigo-500" />,
                titulo: "Relativos",
                descricao: (
                  <div className="space-y-2 text-sm">
                    <p>Iniciam Oração Adjetiva e retomam um antecedente.</p>
                    <p>
                      <strong>QUE</strong> (o mais versátil) = o qual, a qual.
                    </p>
                    <p>
                      <strong>CUJO</strong> (posse) ≠ nunca acompanhado de
                      artigo.
                    </p>
                    <p>
                      <strong>ONDE</strong> = em que (apenas para lugar físico).
                    </p>
                  </div>
                ),
              },
              {
                icone: <LuNavigation className="text-rose-500" />,
                titulo: "Indefinidos",
                descricao: (
                  <div className="space-y-2 text-sm">
                    <p>
                      Referem-se a seres de forma <strong>vaga</strong>: algum,
                      nenhum, outro, vários, certo, todo.
                    </p>
                    <p className="text-muted-foreground italic">
                      Cesgranrio testa: &quot;algum&quot; antes do nome =
                      afirmação. &quot;Algum&quot; depois = negação. Ex:
                      &quot;Motivo algum&quot; = nenhum motivo.
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        {/* ── ADJETIVO ── */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={4}
            title="O Adjetivo — Conceito Científico"
            variant="emerald"
          />
          <p className="text-lg text-muted-foreground text-justify leading-relaxed">
            O <strong>Adjetivo</strong> é a classe de palavra que{" "}
            <strong>qualifica</strong> ou <strong>caracteriza</strong> o
            substantivo, atribuindo-lhe propriedades, estados ou modos de ser. É
            classe <strong>variável</strong> (concorda em gênero e número com o
            substantivo). Segundo Bechara, o adjetivo exprime qualidade inerente
            ou transitória do ser.
          </p>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={5}
            title="A Posição do Adjetivo Muda o Sentido"
            variant="emerald"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FlipCard
              hideFooter={true}
              frente={
                <div className="flex flex-col h-full justify-between py-2">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                        <LuTag className="text-2xl text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-black text-xl tracking-tight leading-none uppercase">
                          Adjetivo POSPOSTO
                        </h4>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
                          Depois do Substantivo
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      Geralmente, quando o adjetivo vem após o substantivo, ele
                      mantém o seu sentido original, literal e objetivo (
                      <strong>sentido denotativo</strong>), descrevendo uma
                      característica física ou real do ser.
                    </p>
                    <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/10 text-[11px] text-blue-600 dark:text-blue-400/80 italic">
                      📍 Nota: Essa é a posição natural do adjetivo na Língua
                      Portuguesa.
                    </div>
                  </div>
                </div>
              }
              verso={
                <div className="space-y-6">
                  <div className="bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/20 italic text-center text-sm space-y-3">
                    <p className="font-bold text-blue-600 dark:text-blue-400 uppercase text-[10px] tracking-wider mb-2 not-italic">
                      Valor Objetivo / Real
                    </p>
                    <p>
                      &quot;Ele é um homem <strong>grande</strong>.&quot;
                    </p>
                    <div className="w-8 border-t border-emerald-500/30 mx-auto" />
                    <p className="text-muted-foreground text-[13px]">
                      (Significa alguém fisicamente alto ou corpulento)
                    </p>
                  </div>
                  <div className="pt-2 border-t border-border/40">
                    <p className="text-[11px] leading-tight text-muted-foreground">
                      <strong className="text-blue-600 dark:text-blue-400 uppercase text-[10px] mr-1">
                        Outro Exemplo:
                      </strong>
                      &quot;Um funcionário alto&quot; (tem estatura física
                      elevada).
                    </p>
                  </div>
                </div>
              }
            />
            <FlipCard
              hideFooter={true}
              frente={
                <div className="flex flex-col h-full justify-between py-2">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                        <LuZap className="text-2xl text-indigo-500" />
                      </div>
                      <div>
                        <h4 className="font-black text-xl tracking-tight leading-none uppercase">
                          Adjetivo ANTEPOSTO
                        </h4>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
                          Antes do Substantivo
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      Ao deslocar o adjetivo para antes do substantivo,
                      frequentemente alteramos o seu sentido para algo mais
                      figurado, emotivo ou subjetivo (
                      <strong>sentido conotativo</strong>).
                    </p>
                    <div className="p-3 bg-indigo-500/5 rounded-lg border border-indigo-500/10 text-[11px] text-indigo-600 dark:text-indigo-400/80 italic">
                      📍 Nota: Essa inversão estilística é um alvo clássico de
                      bancas em questões de reescrita.
                    </div>
                  </div>
                </div>
              }
              verso={
                <div className="space-y-6">
                  <div className="bg-indigo-500/5 p-4 rounded-xl border border-indigo-500/20 italic text-center text-sm space-y-3">
                    <p className="font-bold text-indigo-600 dark:text-indigo-400 uppercase text-[10px] tracking-wider mb-2 not-italic">
                      Valor Subjetivo / Figurado
                    </p>
                    <p>
                      &quot;Ele é um <strong>grande</strong> homem.&quot;
                    </p>
                    <div className="w-8 border-t border-indigo-500/30 mx-auto" />
                    <p className="text-muted-foreground text-[13px]">
                      (Significa alguém notável, importante ou bondoso,
                      independente da altura)
                    </p>
                  </div>
                  <div className="pt-2 border-t border-border/40">
                    <p className="text-[11px] leading-tight text-muted-foreground">
                      <strong className="text-indigo-600 dark:text-indigo-400 uppercase text-[10px] mr-1">
                        Outro Exemplo:
                      </strong>
                      &quot;Um alto funcionário&quot; (tem cargo ou hierarquia
                      elevada, pode ser baixo fisicamente).
                    </p>
                  </div>
                </div>
              }
            />
          </div>
          <AlertBox tipo="success" titulo="Dica para a Prova">
            Quando a Cesgranrio pedir &quot;reescreva mantendo o sentido&quot;,
            observe se o adjetivo mudou de posição. Se mudou, o sentido pode ter
            sido alterado — e a alternativa estará ERRADA.
          </AlertBox>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={6}
            title="Locução Adjetiva e Concordância Nominal"
            variant="emerald"
          />
          <ContentAccordion
            mode="stacked"
            slidesPerView={1}
            titulo="Detalhes Cruciais do Adjetivo"
            icone={<LuTag />}
            corIndicador="bg-indigo-500"
            defaultOpen={true}
            slides={[
              {
                titulo: "Locução Adjetiva (de + substantivo)",
                icone: "1️⃣",
                conteudo: (
                  <div className="space-y-3">
                    <p className="text-muted-foreground">
                      Uma Locução Adjetiva é formada por preposição +
                      substantivo, equivalendo a um adjetivo simples.
                    </p>
                    <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 text-sm space-y-1">
                      <p>
                        <strong>de pedra</strong> → pétreo |{" "}
                        <strong>de ouro</strong> → áureo |{" "}
                        <strong>de prata</strong> → argênteo
                      </p>
                      <p>
                        <strong>de chuva</strong> → pluvial |{" "}
                        <strong>de boca</strong> → bucal |{" "}
                        <strong>de olho</strong> → ocular
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "Palavras Perigosas na Concordância Nominal",
                icone: "2️⃣",
                conteudo: (
                  <div className="space-y-3">
                    <div className="bg-rose-500/10 p-4 rounded-xl border border-rose-500/20 text-sm space-y-2">
                      <p>
                        ✅ Seguem <strong>anexas</strong> as notas. (adjetivo
                        concorda)
                      </p>
                      <p>
                        ✅ Seguem <strong>em anexo</strong> as notas. (locução
                        NÃO varia)
                      </p>
                      <p>
                        ✅ Ela <strong>mesma</strong> resolveu. (pronome
                        concorda) | ❌ Ela mesmo
                      </p>
                      <p>
                        ✅ Muito <strong>obrigada</strong>. (mulher falando) |
                        ❌ Muito obrigado
                      </p>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </section>

        {/* Resumo + Quiz */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={7}
            title="Resumo e Multimídia"
            variant="emerald"
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
                        title="Resumo: Pronomes e Adjetivos"
                        duration="15:00"
                        thumbnail="https://images.unsplash.com/photo-1434030216411-0bb7c3f3dfad?q=80&w=1000&auto=format&fit=crop"
                      />
                    </div>
                  </div>
                ),
              },
              {
                id: "resumo",
                label: "Resumo Visual",
                icon: LuBookOpen,
                content: (
                  <ModuleSummaryCarouselNew
                    images={[
                      {
                        title: "Mapa Mental: Pronomes Pessoais",
                        type: "Mapa Mental",
                        imageUrl:
                          "/assets/images/portugues/classes-palavras/modulo-2/mapa-mental-pronomes-pessoais.png",
                        placeholderColor: "bg-blue-100",
                      },
                      {
                        title: "Tabela: Retos vs Oblíquos",
                        type: "Tabela",
                        placeholderColor: "bg-indigo-100 dark:bg-indigo-900/30",
                      },
                      {
                        title: "Infográfico: Colocação Pronominal",
                        type: "Infográfico",
                        placeholderColor:
                          "bg-emerald-100 dark:bg-emerald-900/30",
                      },
                      {
                        title: "Card Resumo: Adjetivos — Posição e Sentido",
                        type: "Card",
                        placeholderColor: "bg-amber-100 dark:bg-amber-900/30",
                      },
                    ]}
                  />
                ),
              },
              {
                id: "visual",
                label: "Macete Visual",
                icon: LuBrain,
                content: (
                  <div className="text-center p-8 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-2xl border border-blue-500/10">
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      Regra de Ouro: Próclise
                    </h3>
                    <div className="text-7xl my-8 animate-bounce">🧲 ⬅️ 💬</div>
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                      "Palavras negativas, advérbios e pronomes relativos são
                      ímãs de próclise: puxam o pronome para ANTES do verbo!"
                    </p>
                  </div>
                ),
              },
              {
                id: "audio",
                label: "Áudio Resumo",
                icon: LuMusic,
                content: (
                  <div className="w-full flex justify-center py-4">
                    <div className="w-full max-w-md">
                      <MusicPlayerCard
                        audioUrl="#"
                        titulo="Samba do Pronome"
                        artista="Prof. André"
                        capaUrl="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000&auto=format&fit=crop"
                        lyrics={`(Verso 1)
Pronome pessoal, reto ou oblíquo
Antes do verbo com negação, é próclise, amigo!
Adjetivo muda de acordo com o lugar
Antes do nome: sentido figurado pra brilhar!

(Refrão)
É próclise, é ênclise, é mesóclise
Na Cesgranrio não tem bobice!
                                                        `}
                      />
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </section>
        <section className="mt-16">
          <QuizInterativo
            questoes={qMod2}
            titulo="Quiz — Pronome & Adjetivo"
            icone="⚡"
            numero={8}
            variant="emerald"
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          />
        </section>
      </TabsContent>
      {/* ══════════════════════════════════════════════
                        MÓDULO 3: CONJUNÇÃO & PREPOSIÇÃO
                    ══════════════════════════════════════════════ */}
      <TabsContent value="modulo-3" className="space-y-16 mt-12">
        <ModuleBanner
          numero={3}
          titulo="Conjunção & Preposição"
          descricao="Os conectivos que unem orações e os elos que subordinam termos. Bases de coesão e regência."
          gradiente="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"
        />

        {/* ── CONJUNÇÃO ── */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={1}
            title="A Conjunção — Conceito Científico"
            variant="violet"
          />
          <p className="text-lg text-muted-foreground text-justify leading-relaxed">
            A <strong>Conjunção</strong> é a classe de palavra{" "}
            <strong>invariável</strong> que <strong>liga orações</strong> ou
            termos de mesma função sintática. Sem conjunções, o texto viraria um
            amontoado de frases soltas. Elas são o verdadeiro
            &quot;cimento&quot; da coesão textual — e por isso a Cesgranrio as
            cobra intensamente em questões de reescrita e coesão.
          </p>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="Conjunções Coordenativas"
            variant="violet"
          />
          <ContentAccordion
            mode="stacked"
            slidesPerView={1}
            titulo="Os 5 Tipos Coordenativos — Visão Completa"
            icone={<LuLink2 />}
            corIndicador="bg-amber-500"
            defaultOpen={true}
            slides={[
              {
                titulo: "1. Aditivas (Soma e Sequência)",
                icone: "➕",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground italic">
                      Ideia de adição, soma ou sucessão de fatos.
                    </p>
                    <CardCarousel
                      titulo="Exemplos por Conectivo"
                      itemsPerView={2}
                      cards={[
                        {
                          icone: <LuLink2 />,
                          titulo: "E",
                          descricao:
                            "A Petrobras investe em tecnologia E colhe resultados.",
                        },
                        {
                          icone: <LuLink2 />,
                          titulo: "NEM",
                          descricao:
                            "Não assinou o contrato NEM o termo de posse.",
                        },
                        {
                          icone: <LuLink2 />,
                          titulo: "NÃO SÓ... MAS TAMBÉM",
                          descricao:
                            "O técnico não só consertou a peça MAS TAMBÉM testou o sistema.",
                        },
                        {
                          icone: <LuLink2 />,
                          titulo: "BEM COMO",
                          descricao:
                            "Revisamos o edital BEM COMO os anexos técnicos.",
                        },
                        {
                          icone: <LuLink2 />,
                          titulo: "NÃO APENAS... COMO",
                          descricao:
                            "Não apenas estudou COMO praticou muitos exercícios.",
                        },
                      ]}
                    />
                    <AlertBox
                      tipo="info"
                      titulo="Obs: O 'E' com valor adversativo"
                    >
                      Cuidado! A Cesgranrio adora frase como: &quot;Estudou
                      muito E não passou&quot;. Aqui o{" "}
                      <strong>&quot;E&quot;</strong> equivale a{" "}
                      <strong>&quot;MAS&quot;</strong> (Adversativa).
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "2. Adversativas (Oposição e Contraste)",
                icone: "🔄",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground italic">
                      Ideia de contraste, oposição ou compensação.
                    </p>
                    <CardCarousel
                      titulo="Exemplos por Conectivo"
                      itemsPerView={2}
                      cards={[
                        {
                          icone: <LuLink2 className="text-orange-500" />,
                          titulo: "MAS",
                          descricao:
                            "A prova estava difícil, MAS a equipe estava pronta.",
                        },
                        {
                          icone: <LuLink2 className="text-orange-500" />,
                          titulo: "PORÉM",
                          descricao:
                            "Chegamos cedo à refinaria; PORÉM, o acesso estava restrito.",
                        },
                        {
                          icone: <LuLink2 className="text-orange-500" />,
                          titulo: "CONTUDO",
                          descricao:
                            "Houve greve nacional; CONTUDO, a produção não parou.",
                        },
                        {
                          icone: <LuLink2 className="text-orange-500" />,
                          titulo: "TODAVIA",
                          descricao:
                            "O projeto é caro; TODAVIA, ele economiza no longo prazo.",
                        },
                        {
                          icone: <LuLink2 className="text-orange-500" />,
                          titulo: "ENTRETANTO",
                          descricao:
                            "O óleo subiu; ENTRETANTO, o dólar caiu no mesmo dia.",
                        },
                        {
                          icone: <LuLink2 className="text-orange-500" />,
                          titulo: "NO ENTANTO",
                          descricao:
                            "O sinal tocou; NO ENTANTO, os técnicos continuaram a inspeção.",
                        },
                      ]}
                    />
                    <div className="bg-orange-500/10 p-4 rounded-xl border border-orange-500/20 text-sm">
                      <p>
                        <strong>💡 Dica de Pontuação:</strong> Com exceção do
                        MAS, as outras podem ser deslocadas no texto: &quot;O
                        óleo subiu; o dólar, <strong>entretanto</strong>,
                        caiu.&quot;
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "3. Alternativas (Escolha e Exclusão)",
                icone: "⚖️",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground italic">
                      Ideia de exclusão, alternativa ou alternância.
                    </p>
                    <CardCarousel
                      titulo="Exemplos por Conectivo"
                      itemsPerView={2}
                      cards={[
                        {
                          icone: <LuLink2 className="text-yellow-500" />,
                          titulo: "OU",
                          descricao: "Aceite o cargo OU peça exoneração.",
                        },
                        {
                          icone: <LuLink2 className="text-yellow-500" />,
                          titulo: "OU... OU",
                          descricao:
                            "OU estudamos agora, OU perderemos a vaga.",
                        },
                        {
                          icone: <LuLink2 className="text-yellow-500" />,
                          titulo: "ORA... ORA",
                          descricao:
                            "ORA chove no litoral, ORA faz sol no planalto.",
                        },
                        {
                          icone: <LuLink2 className="text-yellow-500" />,
                          titulo: "QUER... QUER",
                          descricao: "QUER aceite, QUER não, a regra mudou.",
                        },
                        {
                          icone: <LuLink2 className="text-yellow-500" />,
                          titulo: "SEJA... SEJA",
                          descricao:
                            "SEJA no Rio, SEJA em Santos, o trabalho continua.",
                        },
                      ]}
                    />
                  </div>
                ),
              },
              {
                titulo: "4. Conclusivas (Dedução)",
                icone: "🏁",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground italic">
                      Ideia de conclusão ou consequência lógica.
                    </p>
                    <CardCarousel
                      titulo="Exemplos por Conectivo"
                      itemsPerView={2}
                      cards={[
                        {
                          icone: <LuLink2 className="text-indigo-500" />,
                          titulo: "LOGO",
                          descricao:
                            "O navio atracou; LOGO, a carga será liberada.",
                        },
                        {
                          icone: <LuLink2 className="text-indigo-500" />,
                          titulo: "PORTANTO",
                          descricao:
                            "Conhecemos os riscos; PORTANTO, usaremos EPIs.",
                        },
                        {
                          icone: <LuLink2 className="text-indigo-500" />,
                          titulo: "POR ISSO",
                          descricao:
                            "O equipamento falhou; POR ISSO, chamamos o suporte.",
                        },
                        {
                          icone: <LuLink2 className="text-indigo-500" />,
                          titulo: "ASSIM",
                          descricao:
                            "A regra é nova; ASSIM, precisamos de treinamento.",
                        },
                        {
                          icone: <LuLink2 className="text-indigo-500" />,
                          titulo: "POR CONSEGUINTE",
                          descricao:
                            "O contrato venceu; POR CONSEGUINTE, o serviço parou.",
                        },
                        {
                          icone: <LuLink2 className="text-indigo-500" />,
                          titulo: "POIS (Posposto)",
                          descricao:
                            "O óleo vazou; a limpeza é, POIS, urgente.",
                        },
                      ]}
                    />
                  </div>
                ),
              },
              {
                titulo: "5. Explicativas (Justificativa)",
                icone: "🎓",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground italic">
                      Justificam ou explicam o que se disse anteriormente.
                    </p>
                    <CardCarousel
                      titulo="Exemplos por Conectivo"
                      itemsPerView={2}
                      cards={[
                        {
                          icone: <LuLink2 className="text-rose-500" />,
                          titulo: "QUE",
                          descricao: "Vá logo, QUE o navio já vai partir.",
                        },
                        {
                          icone: <LuLink2 className="text-rose-500" />,
                          titulo: "PORQUE",
                          descricao:
                            "Não se atrase, PORQUE a troca de turno é chata.",
                        },
                        {
                          icone: <LuLink2 className="text-rose-500" />,
                          titulo: "POIS (Anteposto)",
                          descricao:
                            "Não grite, POIS estamos em reunião técnica.",
                        },
                        {
                          icone: <LuLink2 className="text-rose-500" />,
                          titulo: "PORQUANTO",
                          descricao:
                            "Ele foi promovido, PORQUANTO é muito dedicado.",
                        },
                      ]}
                    />
                    <AlertBox tipo="warning" titulo="Dica para a vida">
                      A oração anterior às explicativas costuma vir com verbo no{" "}
                      <strong>Imperativo</strong> (ordem/conselho).
                    </AlertBox>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={3}
            title="Causal × Explicativa — A Armadilha Clássica"
            variant="violet"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FlipCard
              hideFooter={true}
              frente={
                <div className="flex flex-col h-full justify-between py-2">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
                        <LuZap className="text-2xl text-amber-500" />
                      </div>
                      <div>
                        <h4 className="font-black text-xl tracking-tight leading-none uppercase">
                          Causal
                        </h4>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
                          Vínculo de Realidade
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      Explica a <strong>causa física ou lógica</strong> de um
                      fato que aconteceu na oração principal. O fato é o
                      resultado direto dessa causa.
                    </p>
                    <div className="p-3 bg-amber-500/5 rounded-lg border border-amber-500/10 text-[11px] text-amber-600 dark:text-amber-400/80 italic">
                      📍 Nota: Representa um evento que ocorreu ANTES do fato
                      principal na linha do tempo.
                    </div>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-xl border border-border/50">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                      Principais Conectivos
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["porque", "visto que", "já que", "como"].map((c) => (
                        <span
                          key={c}
                          className="px-2 py-0.5 bg-amber-500/5 border border-amber-500/10 rounded text-xs font-medium text-amber-700 dark:text-amber-400"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              }
              verso={
                <div className="space-y-6">
                  <div className="bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/20 italic text-center">
                    <p className="text-base font-medium">
                      &quot;O poço secou <strong>porque</strong> choveu
                      pouco.&quot;
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-1.5 h-auto bg-amber-500 rounded-full" />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground block mb-1">
                          Análise do Nexo
                        </strong>
                        A chuva fraca é a causa real e palpável do esgotamento
                        da água. Há um vínculo de natureza física entre os
                        fatos.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-1.5 h-auto bg-blue-500 rounded-full" />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground block mb-1">
                          O Teste do 'Como'
                        </strong>
                        Toda causal pode ser iniciada pelo &quot;Como&quot;:{" "}
                        <em>&quot;Como choveu pouco, o poço secou.&quot;</em> —
                        Se funcionar, é causa!
                      </p>
                    </div>
                    <div className="pt-2 border-t border-border/40">
                      <p className="text-[11px] leading-tight text-muted-foreground">
                        <strong className="text-amber-600 dark:text-amber-400 uppercase text-[10px] mr-1">
                          Dica Cesgranrio:
                        </strong>
                        A oração causal pode ser deslocada para o início da
                        frase sem mudar o sentido. O foco é sempre o MOTIVO.
                      </p>
                    </div>
                  </div>
                </div>
              }
            />

            <FlipCard
              hideFooter={true}
              frente={
                <div className="flex flex-col h-full justify-between py-2">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-rose-500/10 rounded-xl border border-rose-500/20">
                        <LuMessageCircle className="text-2xl text-rose-500" />
                      </div>
                      <div>
                        <h4 className="font-black text-xl tracking-tight leading-none uppercase">
                          Explicativa
                        </h4>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
                          Justificativa da Fala
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      Justifica uma <strong>ordem, pedido ou suposição</strong>.
                      Não há causa física; o conectivo apenas explica o motivo
                      de eu ter dito o que disse.
                    </p>
                    <div className="p-3 bg-rose-500/5 rounded-lg border border-rose-500/10 text-[11px] text-rose-600 dark:text-rose-400/80 italic">
                      📍 Nota: Frequentemente precedida de vírgula, isolando a
                      justificativa do comando.
                    </div>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-xl border border-border/50">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                      Principais Conectivos
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["pois", "porque", "que", "porquanto"].map((c) => (
                        <span
                          key={c}
                          className="px-2 py-0.5 bg-rose-500/5 border border-rose-500/10 rounded text-xs font-medium text-rose-700 dark:text-rose-400"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              }
              verso={
                <div className="space-y-6">
                  <div className="bg-indigo-500/5 p-4 rounded-xl border border-indigo-500/20 italic text-center">
                    <p className="text-base font-medium">
                      &quot;Leve o guarda-chuva, <strong>porque</strong> vai
                      chover.&quot;
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-1.5 h-auto bg-rose-500 rounded-full" />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground block mb-1">
                          Análise do Nexo
                        </strong>
                        A oração principal traz um comando
                        (&quot;Leve...&quot;). A conjunção explica por que o
                        falante deu esse conselho.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-1.5 h-auto bg-emerald-500 rounded-full" />
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground block mb-1">
                          Gatilho do Imperativo
                        </strong>
                        Se houver verbo no <strong>Imperativo</strong> (ordem)
                        ou <strong>Futuro</strong> (tentativa de prever) antes
                        do conectivo, a chance de ser explicativa é de 99%.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-border/40">
                      <p className="text-[11px] leading-tight text-muted-foreground">
                        <strong className="text-rose-600 dark:text-rose-400 uppercase text-[10px] mr-1">
                          Dica de Ouro:
                        </strong>
                        Nas explicativas, a conjunção &quot;Pois&quot; vem
                        obrigatoriamente ANTES do verbo da oração que ela
                        introduz.
                      </p>
                    </div>
                  </div>
                </div>
              }
            />
          </div>
          <AlertBox tipo="success" titulo="Macete de Ouro">
            Se antes do &quot;porque/pois&quot; houver um verbo no IMPERATIVO ou
            uma sugestão, é EXPLICATIVA. Se for um fato real seguido de motivo,
            é CAUSAL.
          </AlertBox>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={4}
            title="Subordinativas (10 tipos)"
            variant="violet"
          />
          <ContentAccordion
            mode="stacked"
            slidesPerView={1}
            titulo="A Família das Subordinativas (9 Adverbiais + 1 Integrante)"
            icone={<LuLink2 />}
            corIndicador="bg-amber-500"
            defaultOpen={true}
            slides={[
              {
                titulo: "1. Causais",
                icone: "⚡",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-sm text-foreground/80 leading-relaxed italic">
                      Introduzem a oração que é a <strong>causa</strong>, o fato
                      gerador da oração principal. A causa sempre acontece
                      primeiro na linha do tempo.
                    </p>
                    <CardCarousel
                      titulo="Principais Causais"
                      itemsPerView={2}
                      cards={[
                        {
                          icone: <LuLink2 className="text-amber-500" />,
                          titulo: "PORQUE / COMO",
                          descricao:
                            '"Como choveu muito, a obra foi adiada." (Como = Porque)',
                        },
                        {
                          icone: <LuLink2 className="text-amber-500" />,
                          titulo: "VISTO QUE",
                          descricao:
                            '"A prova foi anulada, visto que houve vazamento."',
                        },
                        {
                          icone: <LuLink2 className="text-amber-500" />,
                          titulo: "JÁ QUE",
                          descricao:
                            '"Já que você estudou, fará uma ótima prova."',
                        },
                        {
                          icone: <LuLink2 className="text-amber-500" />,
                          titulo: "UMA VEZ QUE",
                          descricao:
                            '"Uma vez que o edital saiu, as aulas dobraram."',
                        },
                      ]}
                    />
                    <AlertBox tipo="warning" titulo="O Teste do 'COMO'">
                      Lembre-se: O &quot;como&quot; só é causal se puder ser
                      trocado por &quot;porque&quot; e vier no INÍCIO da frase
                      principal.
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "2. Concessivas",
                icone: "🛡️",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-sm text-foreground/80 leading-relaxed italic">
                      O grande 'furo de bloqueio'. Introduz um fato contrário,
                      que <strong>não tem força</strong> para impedir a ação
                      principal de acontecer.
                    </p>
                    <CardCarousel
                      titulo="Principais Concessivas"
                      itemsPerView={2}
                      cards={[
                        {
                          icone: <LuLink2 className="text-orange-500" />,
                          titulo: "EMBORA",
                          descricao:
                            '"A equipe prosseguiu, embora estivesse exausta."',
                        },
                        {
                          icone: <LuLink2 className="text-orange-500" />,
                          titulo: "CONQUANTO",
                          descricao: '"Conquanto chovesse, o navio partiu."',
                        },
                        {
                          icone: <LuLink2 className="text-orange-500" />,
                          titulo: "AINDA QUE / MESMO QUE",
                          descricao:
                            '"Ainda que seja difícil, nós passaremos."',
                        },
                        {
                          icone: <LuLink2 className="text-orange-500" />,
                          titulo: "SE BEM QUE / POSTO QUE",
                          descricao:
                            '"Posto que não concordasse, assinou o termo."',
                        },
                      ]}
                    />
                    <AlertBox tipo="info" titulo="Modo Verbal Obrigatório">
                      📍 Dica Cesgranrio: O verbo da oração concessiva fica
                      normalmente no modo <strong>subjuntivo</strong>{" "}
                      (estivesse, chova, venha).
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "3. Condicionais",
                icone: "⚖️",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-sm text-foreground/80 leading-relaxed italic">
                      Estabelecem uma hipótese ou condição necessária para que o
                      fato da oração principal se realize.
                    </p>
                    <CardCarousel
                      titulo="Principais Condicionais"
                      itemsPerView={2}
                      cards={[
                        {
                          icone: <LuLink2 className="text-yellow-600" />,
                          titulo: "SE",
                          descricao:
                            '"O alarme soará se a pressão exceder o limite."',
                        },
                        {
                          icone: <LuLink2 className="text-yellow-600" />,
                          titulo: "CASO",
                          descricao: '"Caso chova, o evento será indoor."',
                        },
                        {
                          icone: <LuLink2 className="text-yellow-600" />,
                          titulo: "CONTANTO QUE",
                          descricao:
                            '"Trabalharemos, contanto que paguem extra."',
                        },
                        {
                          icone: <LuLink2 className="text-yellow-600" />,
                          titulo: "DESDE QUE",
                          descricao:
                            '"Você pode sair, desde que termine o relatório."',
                        },
                      ]}
                    />
                  </div>
                ),
              },
              {
                titulo: "4. Consecutivas",
                icone: "🎳",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-sm text-foreground/80 leading-relaxed italic">
                      Apresentam a <strong>consequência</strong> ou o efeito do
                      fato expresso na oração principal. É o inverso da Causal.
                    </p>
                    <CardCarousel
                      titulo="Principais Consecutivas"
                      itemsPerView={2}
                      cards={[
                        {
                          icone: <LuLink2 className="text-rose-500" />,
                          titulo: "TÃO... QUE",
                          descricao:
                            '"O poço era tão profundo que exigiu novas brocas."',
                        },
                        {
                          icone: <LuLink2 className="text-rose-500" />,
                          titulo: "TAL... QUE",
                          descricao: '"Tal foi o susto que ele desmaiou."',
                        },
                        {
                          icone: <LuLink2 className="text-rose-500" />,
                          titulo: "TAMANHO... QUE",
                          descricao:
                            '"Tamanho foi o rombo que a empresa faliu."',
                        },
                        {
                          icone: <LuLink2 className="text-rose-500" />,
                          titulo: "DE SORTE QUE",
                          descricao:
                            '"Estudou muito, de sorte que foi aprovado."',
                        },
                      ]}
                    />
                    <AlertBox tipo="success" titulo="A Equação da Consecutiva">
                      Sempre teremos uma palavra intensificadora na oração
                      principal (TÃO, TAL, TANTO, TAMANHO) e o consequente
                      &quot;QUE&quot; na subordinada.
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "5. Comparativas",
                icone: "🪞",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-sm text-foreground/80 leading-relaxed italic">
                      Estabelecem uma analogia ou comparação de igualdade,
                      superioridade ou inferioridade. Muitas vezes o verbo da
                      segunda oração fica escondido (elíptico).
                    </p>
                    <CardCarousel
                      titulo="Principais Comparativas"
                      itemsPerView={2}
                      cards={[
                        {
                          icone: <LuLink2 className="text-indigo-500" />,
                          titulo: "COMO / QUAL",
                          descricao: '"Ele é ágil como um lince."',
                        },
                        {
                          icone: <LuLink2 className="text-indigo-500" />,
                          titulo: "TAL QUAL",
                          descricao: '"O filho é teimoso tal qual o pai."',
                        },
                        {
                          icone: <LuLink2 className="text-indigo-500" />,
                          titulo: "MAIS QUE / MENOS QUE",
                          descricao:
                            '"O novo sistema processa dados mais rápido do que o antigo."',
                        },
                        {
                          icone: <LuLink2 className="text-indigo-500" />,
                          titulo: "TANTO QUANTO",
                          descricao: '"Ela estudou tanto quanto o irmão."',
                        },
                      ]}
                    />
                  </div>
                ),
              },
              {
                titulo: "6. Conformativas",
                icone: "📏",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-sm text-foreground/80 leading-relaxed italic">
                      Indicam acordo, conformidade com a ideia expressa na
                      oração principal.
                    </p>
                    <CardCarousel
                      titulo="Principais Conformativas"
                      itemsPerView={2}
                      cards={[
                        {
                          icone: <LuLink2 className="text-blue-500" />,
                          titulo: "CONFORME",
                          descricao: '"Agiremos conforme manda o figurino."',
                        },
                        {
                          icone: <LuLink2 className="text-blue-500" />,
                          titulo: "SEGUNDO",
                          descricao: '"Segundo o edital, a prova é amanhã."',
                        },
                        {
                          icone: <LuLink2 className="text-blue-500" />,
                          titulo: "CONSOANTE",
                          descricao:
                            '"O equipamento foi instalado consoante o manual."',
                        },
                        {
                          icone: <LuLink2 className="text-blue-500" />,
                          titulo: "COMO",
                          descricao: '"Fiz o relatório como o chefe pediu."',
                        },
                      ]}
                    />
                    <AlertBox
                      tipo="info"
                      titulo="Cuidado com a Polissemia do 'COMO'"
                    >
                      O &quot;COMO&quot; pode ser Causal (&quot;Como
                      choveu...&quot;), Comparativo (&quot;Forte como um
                      touro&quot;) ou Conformativo (&quot;Fez como ensinou o
                      mestre&quot;).
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "7. Finais",
                icone: "🎯",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-sm text-foreground/80 leading-relaxed italic">
                      Exprimem o objetivo, o propósito ou a finalidade de algo.
                      Respondem à pergunta &quot;Para quê?&quot;.
                    </p>
                    <CardCarousel
                      titulo="Principais Finais"
                      itemsPerView={2}
                      cards={[
                        {
                          icone: <LuLink2 className="text-sky-500" />,
                          titulo: "PARA QUE",
                          descricao:
                            '"Explicou tudo devagar para que todos entendessem."',
                        },
                        {
                          icone: <LuLink2 className="text-sky-500" />,
                          titulo: "A FIM DE QUE",
                          descricao:
                            '"Eles realizaram um novo teste a fim de que eliminassem o erro."',
                        },
                        {
                          icone: <LuLink2 className="text-sky-500" />,
                          titulo: "QUE (= PARA QUE)",
                          descricao: '"Fez sinal que nos calássemos."',
                        },
                        {
                          icone: <LuLink2 className="text-sky-500" />,
                          titulo: "PARA",
                          descricao: '"Estudamos muito para passar na prova."',
                        },
                      ]}
                    />
                  </div>
                ),
              },
              {
                titulo: "8. Proporcionais",
                icone: "📈",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-sm text-foreground/80 leading-relaxed italic">
                      Indicam fatos que aumentam ou diminuem em relação de
                      proporcionalidade com outro evento. Acontecem de forma
                      simultânea.
                    </p>
                    <CardCarousel
                      titulo="Principais Proporcionais"
                      itemsPerView={2}
                      cards={[
                        {
                          icone: <LuLink2 className="text-teal-500" />,
                          titulo: "À MEDIDA QUE",
                          descricao:
                            '"À medida que se desce o poço, a temperatura aumenta."',
                        },
                        {
                          icone: <LuLink2 className="text-teal-500" />,
                          titulo: "À PROPORÇÃO QUE",
                          descricao:
                            '"O som fica abafado à proporção que mergulhamos."',
                        },
                        {
                          icone: <LuLink2 className="text-teal-500" />,
                          titulo: "AO PASSO QUE",
                          descricao:
                            '"O lucro sobe ao passo que as dívidas caem."',
                        },
                        {
                          icone: <LuLink2 className="text-teal-500" />,
                          titulo: "QUANTO MAIS/MENOS",
                          descricao: '"Quanto mais estuda, menos erra."',
                        },
                      ]}
                    />
                    <AlertBox
                      tipo="danger"
                      titulo="O Erro Fatal: 'À medida em que'"
                    >
                      🚫 Nunca escreva &quot;À medida EM que&quot; ou &quot;Na
                      medida QUE&quot;. O correto são duas expressões
                      diferentes: &quot;À medida que&quot; (proporção) ou
                      &quot;Na medida em que&quot; (causa = visto que).
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "9. Temporais",
                icone: "⏰",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-sm text-foreground/80 leading-relaxed italic">
                      Referem-se à localização no tempo (simultaneidade,
                      anterioridade ou posterioridade).
                    </p>
                    <CardCarousel
                      titulo="Principais Temporais"
                      itemsPerView={2}
                      cards={[
                        {
                          icone: <LuLink2 className="text-cyan-500" />,
                          titulo: "QUANDO / ENQUANTO",
                          descricao:
                            '"O reator desativou quando cortaram a energia."',
                        },
                        {
                          icone: <LuLink2 className="text-cyan-500" />,
                          titulo: "LOGO QUE / ASSIM QUE",
                          descricao: '"Avisem-me assim que o navio chegar."',
                        },
                        {
                          icone: <LuLink2 className="text-cyan-500" />,
                          titulo: "DESDE QUE",
                          descricao:
                            '"Nunca mais riu desde que o incidente ocorreu."',
                        },
                        {
                          icone: <LuLink2 className="text-cyan-500" />,
                          titulo: "SEMPRE QUE",
                          descricao:
                            '"Ele visita a plataforma sempre que viaja."',
                        },
                      ]}
                    />
                    <AlertBox tipo="warning" titulo="Polissemia do 'DESDE QUE'">
                      Pode ser Condicional (&quot;Passará, desde que
                      estude&quot;) ou Temporal (&quot;Mudou muito desde que
                      assumiu o cargo&quot;). O contexto decide!
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "10. Cláusula Integrante",
                icone: "🔗",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-sm text-foreground/80 leading-relaxed italic">
                      Diferente das outras 9, a conjunção integrante{" "}
                      <strong>não traz ideia de advérbio</strong>. Ela apenas
                      liga verbos a orações inteiras que funcionam como
                      substantivo.
                    </p>
                    <CardCarousel
                      titulo="As Duas Integrantes"
                      itemsPerView={2}
                      cards={[
                        {
                          icone: <LuLink2 className="text-violet-500" />,
                          titulo: "QUE",
                          descricao:
                            '"Os técnicos afirmaram QUE o vazamento foi contido."',
                        },
                        {
                          icone: <LuLink2 className="text-violet-500" />,
                          titulo: "SE",
                          descricao: '"Não sei SE ele vem hoje."',
                        },
                      ]}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-violet-500/10 p-5 rounded-2xl border border-violet-500/20 shadow-sm">
                        <h5 className="font-bold text-violet-700 dark:text-violet-400 mb-2 flex items-center gap-2">
                          <span>🧠 O Macete do &quot;ISSO&quot;</span>
                        </h5>
                        <p className="text-sm text-foreground/80 leading-relaxed">
                          O macete definitivo é substituir a oração iniciada
                          pela conjunção integrante pela palavra{" "}
                          <strong>&quot;ISSO&quot;</strong>.
                        </p>
                        <div className="mt-3 p-3 bg-card rounded-xl border border-border italic text-sm text-muted-foreground text-center">
                          &quot;Afirmaram <strong>que vazou</strong>.&quot;
                          <br />↓<br />
                          &quot;Afirmaram <strong>ISSO</strong>.&quot;
                        </div>
                      </div>
                      <div className="bg-amber-500/10 p-5 rounded-2xl border border-amber-500/20 shadow-sm">
                        <h5 className="font-bold text-amber-700 dark:text-amber-400 mb-2 flex items-center gap-2">
                          <span>🚨 Mas Cuidado!</span>
                        </h5>
                        <p className="text-sm text-foreground/80 leading-relaxed">
                          Se tentar usar &quot;ISSO&quot; na Causal (Ex: &quot;O
                          teste parou ISSO&quot; em vez de &quot;porque
                          choveu&quot;), não fará sentido lógico. Isso comprova
                          que a conjunção era Adverbial.
                        </p>
                      </div>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </section>

        {/* ── PREPOSIÇÃO ── */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={5}
            title="A Preposição — Conceito Científico"
            variant="violet"
          />
          <p className="text-lg text-muted-foreground text-justify leading-relaxed">
            A <strong>Preposição</strong> é a classe de palavra{" "}
            <strong>invariável</strong> que <strong>liga dois termos</strong>,
            estabelecendo entre eles uma relação de{" "}
            <strong>subordinação</strong> (o segundo termo completa o sentido do
            primeiro). É essencial na Regência verbal e nominal e na formação da{" "}
            <strong>crase</strong> (a + a = à).
          </p>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={6}
            title="Essenciais, Acidentais e Contrações"
            variant="violet"
          />
          <ContentAccordion
            mode="stacked"
            slidesPerView={1}
            titulo="O Mundo das Preposições — Guia Completo"
            icone={<LuLink2 />}
            corIndicador="bg-orange-500"
            defaultOpen={true}
            slides={[
              {
                titulo: "1. Preposições Essenciais",
                icone: "💎",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground italic">
                      São palavras que nasceram para ser preposições e nunca
                      mudam de classe.
                    </p>
                    <CardCarousel
                      titulo="As Essenciais em Prática"
                      itemsPerView={2}
                      cards={[
                        {
                          icone: <LuLink2 className="text-orange-500" />,
                          titulo: "A / PARA",
                          descricao:
                            "Indica destino ou direção: 'Fomos A Macaé' ou 'Para a sede'.",
                        },
                        {
                          icone: <LuLink2 className="text-orange-500" />,
                          titulo: "DE / EM",
                          descricao:
                            "Indica origem ou lugar: 'Vim DE Santos' ou 'Estou EM trânsito'.",
                        },
                        {
                          icone: <LuLink2 className="text-orange-500" />,
                          titulo: "COM / SEM",
                          descricao:
                            "Indica companhia ou ausência: 'Saiu COM a equipe' ou 'SEM o EPI'.",
                        },
                        {
                          icone: <LuLink2 className="text-orange-500" />,
                          titulo: "SOB / SOBRE",
                          descricao:
                            "Indica posição: 'SOB a mesa' (embaixo) ou 'SOBRE a mesa' (em cima).",
                        },
                        {
                          icone: <LuLink2 className="text-orange-500" />,
                          titulo: "CONTRA / PERANTE",
                          descricao:
                            "Indica oposição ou presença: 'Lutou CONTRA o tempo' ou 'PERANTE o juiz'.",
                        },
                        {
                          icone: <LuLink2 className="text-orange-500" />,
                          titulo: "ATÉ / APÓS",
                          descricao:
                            "Indica limite ou tempo: 'Trabalhou ATÉ tarde' ou 'APÓS o expediente'.",
                        },
                      ]}
                    />
                    <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/20 text-sm">
                      <p>
                        <strong>🎵 Rimo-decoração:</strong> A, ante, após, até,
                        com, contra, de, desde, em, entre, para, per, perante,
                        por, sem, sob, sobre, trás.
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "2. Combinação e Contração",
                icone: "🧩",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground italic">
                      A união da preposição com outras palavras (artigos,
                      pronomes).
                    </p>
                    <CardCarousel
                      titulo="Formação de Palavras"
                      itemsPerView={2}
                      cards={[
                        {
                          icone: <LuLink2 className="text-emerald-500" />,
                          titulo: "COMBINAÇÃO (Sem perda)",
                          descricao:
                            "A + O = AO | A + ONDE = AONDE. Não há alteração fonética.",
                        },
                        {
                          icone: <LuLink2 className="text-rose-500" />,
                          titulo: "CONTRAÇÃO (Com perda)",
                          descricao:
                            "DE + O = DO | EM + A = NA. Há fusão e perda de letras.",
                        },
                        {
                          icone: <LuLink2 className="text-blue-500" />,
                          titulo: "CRASE",
                          descricao:
                            "A (prep) + A (artigo) = À. É a contração máxima da língua.",
                        },
                        {
                          icone: <LuLink2 className="text-amber-500" />,
                          titulo: "PRONOMES",
                          descricao:
                            "DE + ESTE = DESTE | EM + AQUELE = NAQUELE. Muito comum na escrita.",
                        },
                      ]}
                    />
                  </div>
                ),
              },
              {
                titulo: "3. Relações Semânticas (Sentidos)",
                icone: "🧠",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-muted-foreground italic">
                      A preposição não tem sentido sozinha, ela ganha vida no
                      contexto.
                    </p>
                    <CardCarousel
                      titulo="Diferentes Significados"
                      itemsPerView={2}
                      cards={[
                        {
                          icone: <LuLink2 className="text-blue-500" />,
                          titulo: "LUGAR",
                          descricao: "Passeamos PELO jardim da refinaria.",
                        },
                        {
                          icone: <LuLink2 className="text-blue-500" />,
                          titulo: "TEMPO",
                          descricao: "A reunião será ÀS dez horas.",
                        },
                        {
                          icone: <LuLink2 className="text-blue-500" />,
                          titulo: "MODO",
                          descricao: "Fizeram o teste COM cuidado.",
                        },
                        {
                          icone: <LuLink2 className="text-blue-500" />,
                          titulo: "CAUSA",
                          descricao: "Tremia DE frio durante o turno.",
                        },
                        {
                          icone: <LuLink2 className="text-blue-500" />,
                          titulo: "INSTRUMENTO",
                          descricao: "Cortou a chapa COM o maçarico.",
                        },
                        {
                          icone: <LuLink2 className="text-blue-500" />,
                          titulo: "COMPANHIA",
                          descricao: "Viajou COM os técnicos da plataforma.",
                        },
                        {
                          icone: <LuLink2 className="text-blue-500" />,
                          titulo: "POSSE",
                          descricao: "Esta é a sala DO engenheiro.",
                        },
                        {
                          icone: <LuLink2 className="text-blue-500" />,
                          titulo: "MATÉRIA",
                          descricao: "Copos DE vidro são proibidos na área.",
                        },
                      ]}
                    />
                  </div>
                ),
              },
            ]}
          />
        </section>

        {/* Resumo + Quiz */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={7}
            title="Resumo e Multimídia"
            variant="violet"
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
                        title="Resumo: Conjunções e Preposições"
                        duration="15:00"
                        thumbnail="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1000&auto=format&fit=crop"
                      />
                    </div>
                  </div>
                ),
              },
              {
                id: "resumo",
                label: "Resumo Visual",
                icon: LuBookOpen,
                content: (
                  <ModuleSummaryCarouselNew
                    images={[
                      {
                        title: "Mapa Mental: Conjunções Coordenativas",
                        type: "Mapa Mental",
                        placeholderColor: "bg-amber-100 dark:bg-amber-900/30",
                      },
                      {
                        title: "Tabela: Subordinativas",
                        type: "Tabela",
                        placeholderColor: "bg-orange-100 dark:bg-orange-900/30",
                      },
                      {
                        title: "Infográfico: Preposições",
                        type: "Infográfico",
                        placeholderColor:
                          "bg-emerald-100 dark:bg-emerald-900/30",
                      },
                      {
                        title: "Card Resumo: Contrações",
                        type: "Card",
                        placeholderColor: "bg-indigo-100 dark:bg-indigo-900/30",
                      },
                    ]}
                  />
                ),
              },
              {
                id: "visual",
                label: "Macete Visual",
                icon: LuBrain,
                content: (
                  <div className="text-center p-8 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-2xl border border-amber-500/10">
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      Causal vs Explicativa
                    </h3>
                    <div className="text-7xl my-8 animate-bounce">⚖️ 💡 ❗</div>
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                      "Verbo no{" "}
                      <span className="text-amber-600 font-bold">
                        Imperativo
                      </span>{" "}
                      antes do 'que/porque'? É{" "}
                      <span className="text-amber-600 font-bold">
                        Explicativa
                      </span>
                      ! Fato já ocorrido motivando outro? É{" "}
                      <span className="text-amber-600 font-bold">Causal</span>
                      !"
                    </p>
                  </div>
                ),
              },
              {
                id: "audio",
                label: "Áudio Resumo",
                icon: LuMusic,
                content: (
                  <div className="w-full flex justify-center py-4">
                    <div className="w-full max-w-md">
                      <MusicPlayerCard
                        audioUrl="#"
                        titulo="Rap da Conjunção"
                        artista="Prof. André"
                        capaUrl="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop"
                        lyrics={`(Verso 1)
Conjunção coordena, subordina também
Aditiva soma, adversativa faz o revés
Preposição liga termos, cria relação
De, em, por, para — elos de coesão!

(Refrão)
Causal ou explicativa, presta atenção
Imperativo antes? Explicação!
                                                        `}
                      />
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </section>
        <section className="mt-16">
          <QuizInterativo
            questoes={qMod3}
            titulo="Quiz — Conjunção & Preposição"
            icone="🔗"
            numero={8}
            variant="violet"
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </section>
      </TabsContent>
      {/* ══════════════════════════════════════════════
                        MÓDULO 4: ADVÉRBIO & ARTIGO
                    ══════════════════════════════════════════════ */}
      <TabsContent value="modulo-4" className="space-y-16 mt-12">
        <ModuleBanner
          numero={4}
          titulo="Advérbio & Artigo"
          descricao="O modificador invariável que a Cesgranrio adora testar e o pequeno determinante que transforma classes."
          gradiente="bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-700"
        />

        {/* ── ADVÉRBIO ── */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={1}
            title="O Advérbio — Conceito Científico"
            variant="amber"
          />
          <p className="text-lg text-muted-foreground text-justify leading-relaxed">
            O <strong>Advérbio</strong> é a classe de palavra{" "}
            <strong>invariável</strong> que modifica o <strong>verbo</strong>{" "}
            (trabalha <em>bem</em>), o <strong>adjetivo</strong> (<em>muito</em>{" "}
            bom) ou outro <strong>advérbio</strong> (<em>muito</em> bem). Ele
            nunca modifica substantivo (se modificar, será adjetivo). Sua
            principal armadilha na Cesgranrio: certas palavras mudam de classe
            dependendo do contexto (meio, bastante, certo).
          </p>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="Classificações do Advérbio"
            variant="amber"
          />
          <p className="text-base text-muted-foreground leading-relaxed text-justify">
            Os advérbios organizam-se em categorias baseadas na{" "}
            <strong>circunstância</strong> que expressam. Essa classificação é
            idêntica à das conjunções, focando nas nuances de tempo, modo, causa
            e lugar. A correta identificação dessa circunstância é essencial
            para responder questões de interpretação e substituição de palavras.
          </p>
          <ContentAccordion
            mode="stacked"
            slidesPerView={1}
            titulo="Os Tipos de Advérbio e Onde/Aonde"
            icone={<LuActivity />}
            corIndicador="bg-rose-500"
            defaultOpen={true}
            slides={[
              {
                titulo: "1. Lugar",
                icone: "📍",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-sm text-foreground/80 leading-relaxed italic">
                      Indica a posição espacial onde a ação ocorre, modificando
                      frequentemente verbos de movimento ou estado.
                    </p>
                    <CardCarousel
                      titulo="Principais Advérbios de Lugar"
                      itemsPerView={2}
                      cards={[
                        {
                          icone: <LuActivity className="text-rose-500" />,
                          titulo: "AQUI / ALI / LÁ",
                          descricao: '"A ferramenta está aqui; a broca, lá."',
                        },
                        {
                          icone: <LuActivity className="text-rose-500" />,
                          titulo: "DENTRO / FORA",
                          descricao:
                            '"A perfuração ocorre dentro da plataforma."',
                        },
                        {
                          icone: <LuActivity className="text-rose-500" />,
                          titulo: "PERTO / LONGE",
                          descricao: '"O reservatório fica longe da costa."',
                        },
                      ]}
                    />
                  </div>
                ),
              },
              {
                titulo: "2. Tempo",
                icone: "⏳",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-sm text-foreground/80 leading-relaxed italic">
                      Situa a ação verbal no tempo (passado, presente ou
                      futuro). Essencial para a coesão temporal do texto.
                    </p>
                    <CardCarousel
                      titulo="Principais Advérbios de Tempo"
                      itemsPerView={2}
                      cards={[
                        {
                          icone: <LuActivity className="text-rose-500" />,
                          titulo: "HOJE / ONTEM / AMANHÃ",
                          descricao: '"A inspeção ocorreu ontem de manhã."',
                        },
                        {
                          icone: <LuActivity className="text-rose-500" />,
                          titulo: "AGORA / JÁ",
                          descricao: '"Desliguem os motores agora!"',
                        },
                        {
                          icone: <LuActivity className="text-rose-500" />,
                          titulo: "SEMPRE / NUNCA / JAMAIS",
                          descricao: '"O EPI deve ser usado sempre."',
                        },
                        {
                          icone: <LuActivity className="text-rose-500" />,
                          titulo: "CEDO / TARDE",
                          descricao:
                            '"O turno da noite começa cedo e termina tarde."',
                        },
                      ]}
                    />
                  </div>
                ),
              },
              {
                titulo: "3. Modo",
                icone: "⚙️",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-sm text-foreground/80 leading-relaxed italic">
                      Descreve a maneira como a ação é executada. Quase todos os
                      advérbios terminados em <em>-mente</em> pertencem a este
                      grupo.
                    </p>
                    <CardCarousel
                      titulo="Principais Advérbios de Modo"
                      itemsPerView={2}
                      cards={[
                        {
                          icone: <LuActivity className="text-rose-500" />,
                          titulo: "BEM / MAL",
                          descricao: '"O sistema operou bem durante o teste."',
                        },
                        {
                          icone: <LuActivity className="text-rose-500" />,
                          titulo: "ASSIM",
                          descricao:
                            '"Se agirmos assim, evitaremos acidentes."',
                        },
                        {
                          icone: <LuActivity className="text-rose-500" />,
                          titulo: "TERMINADOS EM -MENTE",
                          descricao: '"A válvula fechou rapidamente."',
                        },
                        {
                          icone: <LuActivity className="text-rose-500" />,
                          titulo: "DEPRESSA / DEVAGAR",
                          descricao: '"O vazamento se espalhou depressa."',
                        },
                      ]}
                    />
                    <AlertBox tipo="info" titulo="O Sufixo -mente">
                      📍 Nota: Quando vários advérbios em "-mente" aparecem
                      juntos, o sufixo costuma ir apenas no último por uma
                      questão de estilo. Ex: "Trabalhou dura e arduamente".
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "4. Intensidade",
                icone: "📈",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-sm text-foreground/80 leading-relaxed italic">
                      Altera o grau da ação, do adjetivo ou de outro advérbio. É
                      o tipo que mais se confunde com pronomes porque eles têm a
                      mesma forma visual.
                    </p>
                    <CardCarousel
                      titulo="Principais Advérbios de Intensidade"
                      itemsPerView={2}
                      cards={[
                        {
                          icone: <LuActivity className="text-rose-500" />,
                          titulo: "MUITO / POUCO",
                          descricao: '"O equipamento vibrou muito."',
                        },
                        {
                          icone: <LuActivity className="text-rose-500" />,
                          titulo: "BASTANTE / ASSAZ",
                          descricao: '"A temperatura estava bastante elevada."',
                        },
                        {
                          icone: <LuActivity className="text-rose-500" />,
                          titulo: "DEMAIS",
                          descricao: '"Ele exige proteção demais para a área."',
                        },
                        {
                          icone: <LuActivity className="text-rose-500" />,
                          titulo: "MAIS / MENOS / TÃO",
                          descricao: '"Precisamos de uma broca mais forte."',
                        },
                      ]}
                    />
                    <AlertBox tipo="danger" titulo="Advérbio x Pronome">
                      Lembre-se: O advérbio NÃO VARIA. Se a palavra pluralizar
                      para concordar com um nome ("Muitos carros"), ela é um
                      pronome indefinido, e não advérbio.
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "5. Negação",
                icone: "🚫",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-sm text-foreground/80 leading-relaxed italic">
                      Nega a ação verbal. Costuma atuar como palavra atrativa
                      para os pronomes oblíquos (fator de próclise na sintaxe).
                    </p>
                    <CardCarousel
                      titulo="Principais Advérbios de Negação"
                      itemsPerView={2}
                      cards={[
                        {
                          icone: <LuActivity className="text-rose-500" />,
                          titulo: "NÃO / NEM",
                          descricao: '"O inspetor não liberou a área."',
                        },
                        {
                          icone: <LuActivity className="text-rose-500" />,
                          titulo: "NUNCA / JAMAIS",
                          descricao: '"Jamais opere o painel sem luvas!"',
                        },
                        {
                          icone: <LuActivity className="text-rose-500" />,
                          titulo: "TAMPOUCO",
                          descricao: '"Não leu o manual, tampouco as normas."',
                        },
                        {
                          icone: <LuActivity className="text-rose-500" />,
                          titulo: "NADA / ABSOLUTAMENTE",
                          descricao: '"Absolutamente errado o que ele fez."',
                        },
                      ]}
                    />
                  </div>
                ),
              },
              {
                titulo: "6. Afirmação",
                icone: "✅",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-sm text-foreground/80 leading-relaxed italic">
                      Reforça de maneira positiva a veracidade da ação verbal,
                      eliminando dúvidas do interlocutor.
                    </p>
                    <CardCarousel
                      titulo="Principais Advérbios de Afirmação"
                      itemsPerView={2}
                      cards={[
                        {
                          icone: <LuActivity className="text-rose-500" />,
                          titulo: "SIM",
                          descricao:
                            '"Nós fomos sim os responsáveis pelo sucesso."',
                        },
                        {
                          icone: <LuActivity className="text-rose-500" />,
                          titulo: "CERTAMENTE / DECERTO",
                          descricao: '"Certamente enviaremos o relatório."',
                        },
                        {
                          icone: <LuActivity className="text-rose-500" />,
                          titulo: "REALMENTE",
                          descricao:
                            '"O novo tubo realmente suporta a pressão."',
                        },
                        {
                          icone: <LuActivity className="text-rose-500" />,
                          titulo: "INDUBITAVELMENTE",
                          descricao:
                            '"Ela é indubitavelmente a melhor técnica."',
                        },
                      ]}
                    />
                  </div>
                ),
              },
              {
                titulo: "7. Dúvida",
                icone: "🤔",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-sm text-foreground/80 leading-relaxed italic">
                      Indica incerteza ou hesitação na ocorrência da ação
                      verbal. Pode forçar o uso de verbos no Modo Subjuntivo
                      (hipótese).
                    </p>
                    <CardCarousel
                      titulo="Principais Advérbios de Dúvida"
                      itemsPerView={2}
                      cards={[
                        {
                          icone: <LuActivity className="text-rose-500" />,
                          titulo: "TALVEZ",
                          descricao:
                            '"Talvez o embarque atrase devido ao tempo."',
                        },
                        {
                          icone: <LuActivity className="text-rose-500" />,
                          titulo: "QUIÇÁ",
                          descricao:
                            '"Venceremos hoje ou, quiçá, nesta semana."',
                        },
                        {
                          icone: <LuActivity className="text-rose-500" />,
                          titulo: "POSSIVELMENTE",
                          descricao:
                            '"Essa foi, possivelmente, a maior falha técnica."',
                        },
                        {
                          icone: <LuActivity className="text-rose-500" />,
                          titulo: "PROVAVELMENTE",
                          descricao:
                            '"Provavelmente chegaremos na cota certa."',
                        },
                      ]}
                    />
                    <AlertBox tipo="info" titulo="Impacto Verbal">
                      O uso da palavra "talvez" obriga o verbo ir para o
                      subjuntivo. Não se diz "talvez ele vem", mas sim "talvez
                      ele venha".
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "8. Onde vs Aonde",
                icone: "🎯",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-sm text-foreground/80 leading-relaxed italic">
                      Embora sejam advérbios de lugar, o uso de "Onde" e "Aonde"
                      obedece a uma regra de regência estrita e é um dos erros
                      gramaticais mais explorados por bancas examinadoras.
                    </p>
                    <CardCarousel
                      titulo="Regra de Ouro"
                      itemsPerView={2}
                      cards={[
                        {
                          icone: <LuActivity className="text-rose-500" />,
                          titulo: "ONDE (Lugar Fixo)",
                          descricao:
                            '"Onde você está?" / "A plataforma onde trabalho."',
                        },
                        {
                          icone: <LuActivity className="text-rose-500" />,
                          titulo: "AONDE (Movimento)",
                          descricao:
                            '"Aonde você vai?" / "Aonde essa tubulação nos leva?"',
                        },
                        {
                          icone: <LuActivity className="text-rose-500" />,
                          titulo: "PREPOSIÇÃO 'A'",
                          descricao:
                            "A-ONDE é apenas 'Onde' somado à preposição 'A' (exigida por Ir, Chegar).",
                        },
                        {
                          icone: <LuActivity className="text-rose-500" />,
                          titulo: "DE ONDE (Origem)",
                          descricao:
                            "\"De onde você veio?\" (Verbos que pedem 'de')",
                        },
                      ]}
                    />
                    <AlertBox tipo="danger" titulo="Macete Infalível">
                      Troque por "Para onde". Se couber na frase ("Para onde
                      você vai?"), o correto é usar "Aonde". Se não couber, use
                      "Onde".
                    </AlertBox>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={3}
            title="As Palavras Camaleão — Meio, Bastante, Certo, Menos"
            variant="amber"
          />
          <p className="text-base text-muted-foreground leading-relaxed text-justify">
            Existem palavras na língua portuguesa que se comportam como
            verdadeiros camaleões: elas{" "}
            <strong>mudam de classe gramatical</strong> (e consequentemente, de
            regra de flexão) dependendo unicamente de com quem estão "andando"
            na frase. Se acompanharem um substantivo, variam. Se acompanharem um
            adjetivo ou verbo, travam na forma singular.
          </p>
          <AlertBox tipo="danger" titulo="🚨 Pegadinha Número 1 da Cesgranrio!">
            &quot;Meio&quot;, &quot;bastante&quot; e &quot;certo&quot; mudam de
            classe conforme o contexto. Advérbio = invariável.
            Adjetivo/Pronome/Numeral = variável. E &quot;menos&quot; NUNCA varia
            (&quot;menas&quot; NÃO existe).
          </AlertBox>
          <CardCarousel
            titulo="Dicionário das Palavras Perigosas"
            subtitulo="Decore essas regras para não cair na armadilha"
            cards={[
              {
                icone: <LuShield className="text-rose-500" />,
                titulo: "MEIO",
                descricao: (
                  <div className="text-sm space-y-2">
                    <p>
                      ✅ &quot;Ela estava <strong>meio</strong> cansada.&quot;
                      (Advérbio = um pouco → invariável)
                    </p>
                    <p>
                      ✅ &quot;Comprei <strong>meia</strong> dúzia.&quot;
                      (Numeral = metade → variável)
                    </p>
                    <p className="text-red-500 font-bold">
                      ❌ &quot;Ela estava meia cansada.&quot; → ERRADO!
                    </p>
                  </div>
                ),
              },
              {
                icone: <LuShield className="text-pink-500" />,
                titulo: "BASTANTE",
                descricao: (
                  <div className="text-sm space-y-2">
                    <p>
                      ✅ &quot;Estudo <strong>bastante</strong>.&quot; (Advérbio
                      = muito → invariável)
                    </p>
                    <p>
                      ✅ &quot;Comprei <strong>bastantes</strong> livros.&quot;
                      (Pronome Indefinido = muitos → variável)
                    </p>
                  </div>
                ),
              },
              {
                icone: <LuShield className="text-fuchsia-500" />,
                titulo: "MENOS",
                descricao: (
                  <div className="text-sm space-y-2">
                    <p>
                      ✅ &quot;Tinha <strong>menos</strong> gente.&quot;
                    </p>
                    <p>
                      ✅ &quot;Havia <strong>menos</strong> pessoas.&quot;
                    </p>
                    <p className="text-red-500 font-bold">
                      ❌ &quot;Havia menas pessoas.&quot; → &quot;MENAS&quot;
                      NÃO EXISTE!
                    </p>
                  </div>
                ),
              },
              {
                icone: <LuShield className="text-indigo-500" />,
                titulo: "ALERTA",
                descricao: (
                  <div className="text-sm space-y-2">
                    <p>
                      ✅ &quot;Os guardas estão <strong>alerta</strong>
                      .&quot; (Advérbio → invariável)
                    </p>
                    <p className="text-red-500 font-bold">
                      ❌ &quot;Estão alertas.&quot; → ERRADO!
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        {/* ── ARTIGO ── */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={4}
            title="O Artigo — Conceito Científico"
            variant="amber"
          />
          <p className="text-lg text-muted-foreground text-justify leading-relaxed">
            O <strong>Artigo</strong> é a classe de palavra{" "}
            <strong>variável</strong> que antecede o substantivo para{" "}
            <strong>determiná-lo</strong> (artigo definido: o, a, os, as) ou{" "}
            <strong>indeterminá-lo</strong> (artigo indefinido: um, uma, uns,
            umas). É uma classe pequena em quantidade, mas gigante em impacto:
            ele define a substantivação e influencia a concordância.
          </p>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={5}
            title="O Artigo como 'Rei Midas' e a Regra do Proibido/Necessário"
            variant="amber"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FlipCard
              hideFooter={true}
              frente={
                <div className="flex flex-col h-full justify-between py-2">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-pink-500/10 rounded-xl border border-pink-500/20">
                        <LuActivity className="text-2xl text-pink-500" />
                      </div>
                      <div>
                        <h4 className="font-black text-xl tracking-tight leading-none uppercase">
                          Derivação Imprópria
                        </h4>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
                          O Artigo Transforma Classes
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      Qualquer palavra antecedida por um artigo converte-se
                      instantaneamente em um <strong>substantivo</strong>, mesmo
                      que originalmente pertença a outra classe.
                    </p>
                    <div className="p-3 bg-pink-500/5 rounded-lg border border-pink-500/10 text-[11px] text-pink-600 dark:text-pink-400/80 italic">
                      📍 Nota: Essa mutação é o que chamamos na morfologia de
                      "Substantivação".
                    </div>
                  </div>
                </div>
              }
              verso={
                <div className="space-y-6">
                  <div className="bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/20 italic text-center text-sm space-y-3">
                    <p>
                      &quot;O <strong>cantar</strong> dos pássaros...&quot;{" "}
                      <br />
                      (verbo → substantivo)
                    </p>
                    <div className="w-8 border-t border-emerald-500/30 mx-auto" />
                    <p>
                      &quot;Preferiu o <strong>azul</strong> escuro.&quot;{" "}
                      <br />
                      (adjetivo → substantivo)
                    </p>
                    <div className="w-8 border-t border-emerald-500/30 mx-auto" />
                    <p>
                      &quot;Recebeu um <strong>não</strong> rotundo.&quot;{" "}
                      <br />
                      (advérbio → substantivo)
                    </p>
                  </div>
                  <div className="pt-2 border-t border-border/40">
                    <p className="text-[11px] leading-tight text-muted-foreground">
                      <strong className="text-pink-600 dark:text-pink-400 uppercase text-[10px] mr-1">
                        Dica Cesgranrio:
                      </strong>
                      A banca adora sublinhar uma palavra que tradicionalmente é
                      de outra classe e perguntar sua função na frase. Olhe
                      sempre o que vem antes!
                    </p>
                  </div>
                </div>
              }
            />
            <FlipCard
              hideFooter={true}
              frente={
                <div className="flex flex-col h-full justify-between py-2">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-fuchsia-500/10 rounded-xl border border-fuchsia-500/20">
                        <LuShield className="text-2xl text-fuchsia-500" />
                      </div>
                      <div>
                        <h4 className="font-black text-xl tracking-tight leading-none uppercase">
                          Regra de Concordância
                        </h4>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
                          É Proibido / É Necessário
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      Construções como &quot;é proibido&quot;, &quot;é
                      necessário&quot;, &quot;é bom&quot;,{" "}
                      <strong>só concordam</strong> com o substantivo feminino
                      se ele estiver antecedido por <strong>artigo</strong>.
                    </p>
                    <div className="p-3 bg-fuchsia-500/5 rounded-lg border border-fuchsia-500/10 text-[11px] text-fuchsia-600 dark:text-fuchsia-400/80 italic">
                      📍 Nota: Se não houver o artigo "a", a expressão permanece
                      invariável (no masculino).
                    </div>
                  </div>
                </div>
              }
              verso={
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="bg-red-500/5 p-4 rounded-xl border border-red-500/20 text-sm">
                      <p className="flex items-center gap-2">
                        <LuCheck className="text-emerald-500" /> &quot;É{" "}
                        <strong>proibido</strong> entrada.&quot;
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 ml-6">
                        O substantivo &quot;entrada&quot; está genérico (sem o
                        artigo 'a'). Logo, <em>proibido</em> não varia.
                      </p>
                    </div>
                    <div className="w-0.5 h-4 bg-border mx-auto" />
                    <div className="bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/20 text-sm">
                      <p className="flex items-center gap-2">
                        <LuCheck className="text-emerald-500" /> &quot;É{" "}
                        <strong>proibida a</strong> entrada.&quot;
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 ml-6">
                        O artigo 'a' determinou o substantivo, puxando a
                        concordância: <em>proibida</em>.
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-border/40">
                    <p className="text-[11px] leading-tight text-muted-foreground">
                      <strong className="text-fuchsia-600 dark:text-fuchsia-400 uppercase text-[10px] mr-1">
                        Dica de Ouro:
                      </strong>
                      A presença do artigo (ou pronome) é o fator determinante
                      (o 'botão de liga/desliga') da concordância nestes casos.
                    </p>
                  </div>
                </div>
              }
            />
          </div>
        </section>

        {/* Resumo + Quiz */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={6}
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
                        title="Resumo: Advérbios e Artigos"
                        duration="15:00"
                        thumbnail="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1000&auto=format&fit=crop"
                      />
                    </div>
                  </div>
                ),
              },
              {
                id: "resumo",
                label: "Resumo Visual",
                icon: LuBookOpen,
                content: (
                  <ModuleSummaryCarouselNew
                    images={[
                      {
                        title: "Mapa Mental: Classificação dos Advérbios",
                        type: "Mapa Mental",
                        placeholderColor: "bg-rose-100 dark:bg-rose-900/30",
                      },
                      {
                        title: "Tabela: Advérbio vs Adjetivo",
                        type: "Tabela",
                        placeholderColor: "bg-pink-100 dark:bg-pink-900/30",
                      },
                      {
                        title: "Infográfico: Artigos Definidos e Indefinidos",
                        type: "Infográfico",
                        placeholderColor: "bg-amber-100 dark:bg-amber-900/30",
                      },
                      {
                        title: "Card Resumo: Substantivação",
                        type: "Card",
                        placeholderColor: "bg-indigo-100 dark:bg-indigo-900/30",
                      },
                    ]}
                  />
                ),
              },
              {
                id: "visual",
                label: "Macete Visual",
                icon: LuBrain,
                content: (
                  <div className="text-center p-8 bg-gradient-to-br from-rose-500/5 to-pink-500/5 rounded-2xl border border-rose-500/10">
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      O Teste do 'Muito'
                    </h3>
                    <div className="text-7xl my-8 animate-bounce">🧐 ❓ 🎯</div>
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                      "Troque por 'muito'. Se ficar{" "}
                      <span className="text-rose-600 font-bold">
                        invariável
                      </span>
                      , é Advérbio. Se virar 'muitos/muitas', é{" "}
                      <span className="text-rose-600 font-bold">
                        Adjetivo/Pronome
                      </span>
                      !"
                    </p>
                  </div>
                ),
              },
              {
                id: "audio",
                label: "Áudio Resumo",
                icon: LuMusic,
                content: (
                  <div className="w-full flex justify-center py-4">
                    <div className="w-full max-w-md">
                      <MusicPlayerCard
                        audioUrl="#"
                        titulo="Pagode do Advérbio"
                        artista="Prof. André"
                        capaUrl="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop"
                        lyrics={`(Verso 1)
Advérbio modifica verbo, adjetivo e a si
Invariável na forma, nunca muda aqui
Artigo determina, define ou generaliza
Com ele o verbo vira nome — substantiviza!

(Refrão)
Teste do muito, parceiro, vai lá!
Se não flexiona, advérbio vai ficar!
                                                        `}
                      />
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </section>
        <section className="mt-16">
          <QuizInterativo
            questoes={qMod4}
            titulo="Quiz — Advérbio & Artigo"
            icone="🎯"
            numero={10}
            variant="amber"
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
          />
        </section>
      </TabsContent>
      {/* ══════════════════════════════════════════════
                        MÓDULO 5: NUMERAL, INTERJEIÇÃO & LABORATÓRIO
                    ══════════════════════════════════════════════ */}
      <TabsContent value="modulo-5" className="space-y-16 mt-12">
        <ModuleBanner
          numero={5}
          titulo="Numeral & Interjeição"
          descricao="Domine as últimas classes gramaticais antes do desafio final de revisão."
          gradiente="bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700"
        />

        {/* ── NUMERAL ── */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={1}
            title="O Numeral — Conceito Científico"
            variant="rose"
          />
          <p className="text-lg text-muted-foreground text-justify leading-relaxed">
            O <strong>Numeral</strong> é a classe de palavra que indica{" "}
            <strong>quantidade</strong>, <strong>ordem</strong>,{" "}
            <strong>multiplicação</strong> ou <strong>fração</strong> dos seres.
            Diferente do que parece, em provas da Cesgranrio ele aparece
            disfarçado em questões de concordância (&quot;ambos&quot;,
            &quot;meio/meia&quot;) e não como cálculo matemático.
          </p>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="Classificações e Armadilhas"
            variant="rose"
          />
          <ContentAccordion
            mode="stacked"
            slidesPerView={1}
            titulo="Os 4 Tipos de Numeral"
            icone={<LuHash />}
            corIndicador="bg-emerald-500"
            defaultOpen={true}
            slides={[
              {
                titulo: "1. Cardinal",
                icone: "1️⃣",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-sm text-foreground/80 leading-relaxed italic">
                      Indica a <strong>quantidade exata</strong> absoluta de
                      seres ou coisas. É a forma mais básica do numeral.
                    </p>
                    <CardCarousel
                      titulo="Na Prática"
                      itemsPerView={2}
                      cards={[
                        {
                          icone: <LuHash className="text-violet-500" />,
                          titulo: "UM, DOIS, TRÊS...",
                          descricao: '"Dois engenheiros assinaram o projeto."',
                        },
                        {
                          icone: <LuHash className="text-violet-500" />,
                          titulo: "CEM, MIL, MILHÃO...",
                          descricao: '"A perfuração alcançou mil metros."',
                        },
                        {
                          icone: <LuHash className="text-violet-500" />,
                          titulo: "AMBOS / AMBAS",
                          descricao:
                            "\"Ambas as bombas falharam.\" (Numeral dual, equivalente a 'os dois'/'as duas')",
                        },
                        {
                          icone: <LuHash className="text-violet-500" />,
                          titulo: "ZERO",
                          descricao: '"Houve zero acidentes este mês."',
                        },
                      ]}
                    />
                    <AlertBox
                      tipo="warning"
                      titulo="O Numeral Dual e a Concordância"
                    >
                      Atenção para "ambos/ambas". Por ser um numeral, ele varia
                      normalmente ("ambos os tubos / ambas as válvulas"). A
                      palavra subsequente geralmente exige artigo.
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "2. Ordinal",
                icone: "🥇",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-sm text-foreground/80 leading-relaxed italic">
                      Indica a <strong>ordem</strong> ou{" "}
                      <strong>posição</strong> que o ser ocupa em uma série ou
                      sequência.
                    </p>
                    <CardCarousel
                      titulo="Na Prática"
                      itemsPerView={2}
                      cards={[
                        {
                          icone: <LuHash className="text-violet-500" />,
                          titulo: "PRIMEIRO, SEGUNDO...",
                          descricao: '"Esta é a primeira plataforma pre-sal."',
                        },
                        {
                          icone: <LuHash className="text-violet-500" />,
                          titulo: "DÉCIMO, MILÉSIMO...",
                          descricao: '"Ele foi o décimo colocado no concurso."',
                        },
                        {
                          icone: <LuHash className="text-violet-500" />,
                          titulo: "ÚLTIMO / PENÚLTIMO",
                          descricao: '"Acessei a última versão do laudo."',
                        },
                      ]}
                    />
                    <AlertBox tipo="info" titulo="Numeral ou Adjetivo?">
                      Assim como as outras classes que orbitam o substantivo,
                      numerais ordinais ajudam a diferenciá-lo. "O primeiro
                      candidato" é diferente do "segundo candidato".
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "3. Multiplicativo",
                icone: "✖️",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-sm text-foreground/80 leading-relaxed italic">
                      Expressa <strong>multiplicação</strong> das quantidades,
                      indicando que um valor foi dobrado, triplicado, etc.
                    </p>
                    <CardCarousel
                      titulo="Na Prática"
                      itemsPerView={2}
                      cards={[
                        {
                          icone: <LuHash className="text-violet-500" />,
                          titulo: "DOBRO / DUPLO",
                          descricao: '"O risco no local é duplo."',
                        },
                        {
                          icone: <LuHash className="text-violet-500" />,
                          titulo: "TRIPLO / QUÁDRUPLO",
                          descricao: '"Tivemos um aumento triplo na produção."',
                        },
                        {
                          icone: <LuHash className="text-violet-500" />,
                          titulo: "CÊNTUPLO",
                          descricao: '"A recompensa será cêntupla."',
                        },
                      ]}
                    />
                  </div>
                ),
              },
              {
                titulo: "4. Fracionário",
                icone: "➗",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-sm text-foreground/80 leading-relaxed italic">
                      Indica a <strong>divisão</strong>, uma parte de um todo,
                      proporções ou frações.
                    </p>
                    <CardCarousel
                      titulo="Na Prática"
                      itemsPerView={2}
                      cards={[
                        {
                          icone: <LuHash className="text-violet-500" />,
                          titulo: "MEIO / METADE",
                          descricao: '"Vazou meia tonelada de óleo."',
                        },
                        {
                          icone: <LuHash className="text-violet-500" />,
                          titulo: "TERÇO / QUINTO",
                          descricao: '"Apenas um terço da equipe compareceu."',
                        },
                        {
                          icone: <LuHash className="text-violet-500" />,
                          titulo: "DÉCIMO / CENTÉSIMO",
                          descricao: '"A chance é de um centésimo."',
                        },
                      ]}
                    />
                    <AlertBox tipo="danger" titulo="A Pegadinha do Meio/Meia">
                      Se houver ideia de fracionário (metade), é numeral e
                      flexiona: "Comi meia pizza" (metade da pizza). Se for
                      intensificador de adjetivo, é Advérbio e não flexiona:
                      "Ela estava meio gripada" (um pouco gripada).
                    </AlertBox>
                  </div>
                ),
              },
            ]}
          />
        </section>

        {/* ── INTERJEIÇÃO ── */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={3}
            title="A Interjeição — Emoções e Pontuação"
            variant="rose"
          />
          <p className="text-base text-muted-foreground leading-relaxed text-justify">
            A <strong>Interjeição</strong> é a classe de palavra{" "}
            <strong>invariável</strong> que expressa <strong>emoções</strong> ou{" "}
            <strong>reações</strong> súbitas do falante. Na Cesgranrio, o foco
            cai quase exclusivamente em interpretação textual (o tom da
            mensagem) e na <strong>pontuação</strong> associada às repetições.
          </p>

          <ContentAccordion
            mode="stacked"
            slidesPerView={1}
            titulo="Como Expressar e Pontuar a Emoção"
            icone={<LuZap />}
            corIndicador="bg-emerald-500"
            defaultOpen={true}
            slides={[
              {
                titulo: "1. Regras de Ouro",
                icone: "🎯",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-sm text-foreground/80 leading-relaxed italic">
                      A interjeição é uma &quot;palavra-frase&quot;. Sozinhas,
                      conseguem transmitir uma mensagem completa de emoção. A
                      pontuação é a chave!
                    </p>
                    <CardCarousel
                      titulo="Na Prática"
                      itemsPerView={2}
                      cards={[
                        {
                          icone: <LuZap className="text-violet-500" />,
                          titulo: "ISOLADA",
                          descricao: '"Silêncio! Estamos iniciando o teste."',
                        },
                        {
                          icone: <LuZap className="text-violet-500" />,
                          titulo: "COM VÍRGULA",
                          descricao:
                            '"Ah, agora entendi como a bomba funciona."',
                        },
                        {
                          icone: <LuZap className="text-violet-500" />,
                          titulo: "REPETIÇÃO",
                          descricao: '"Ui, ui, ui! Esse vazamento é perigoso."',
                        },
                        {
                          icone: <LuZap className="text-violet-500" />,
                          titulo: "NO MEIO",
                          descricao: '"Essa ferramenta é, puxa, muito pesada!"',
                        },
                      ]}
                    />
                    <AlertBox tipo="warning" titulo="A Regra da Exclamação">
                      A interjeição pode vir seguida de exclamação (!), vírgula
                      (,) ou reticências (...). Se vier seguida de vírgula, a
                      exclamação obrigatoriamente vai para o final da oração
                      principal.
                    </AlertBox>
                  </div>
                ),
              },
              {
                titulo: "2. O Mapa das Emoções",
                icone: "🎭",
                conteudo: (
                  <div className="space-y-6">
                    <p className="text-sm text-foreground/80 leading-relaxed italic">
                      A mesma interjeição pode assumir sentimentos completamente
                      diferentes dependendo do tom de voz e do contexto.
                    </p>
                    <CardCarousel
                      titulo="Tipos de Emoção Mapeados"
                      itemsPerView={2}
                      cards={[
                        {
                          icone: <LuZap className="text-green-500" />,
                          titulo: "ALEGRIA / ALÍVIO",
                          descricao:
                            '"Ah! / Ufa! / Oba!" → "Ufa! O projeto foi entregue!"',
                        },
                        {
                          icone: <LuZap className="text-red-500" />,
                          titulo: "DOR / ESPANTO",
                          descricao:
                            '"Ai! / Ui! / Puxa!" → "Nossa! A pressão subiu rápido!"',
                        },
                        {
                          icone: <LuZap className="text-amber-500" />,
                          titulo: "ADVERTÊNCIA",
                          descricao:
                            '"Cuidado! / Alerta!" → "Cuidado! Piso molhado!"',
                        },
                        {
                          icone: <LuZap className="text-blue-500" />,
                          titulo: "APELO / SILÊNCIO",
                          descricao:
                            '"Psiu! / Shh!" → "Psiu! O alarme desarmou."',
                        },
                      ]}
                    />
                    <AlertBox tipo="info" titulo="O Camaleão do 'Ah!'">
                      O &quot;Ah!&quot; serve para quase tudo: alegria, lamento,
                      compreensão. O contexto é o rei soberano!
                    </AlertBox>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={4}
            title="As Locuções Interjetivas"
            variant="rose"
          />
          <p className="text-base text-muted-foreground leading-relaxed text-justify">
            As locuções ocorrem quando{" "}
            <strong>duas ou mais palavras juntas</strong> assumem o exato papel
            e valor de uma única interjeição. São muito comuns na linguagem
            cotidiana.
          </p>
          <CardCarousel
            titulo="Locuções Mais Cobradas"
            itemsPerView={2}
            cards={[
              {
                icone: <LuZap className="text-violet-500" />,
                titulo: "SURPRESA",
                descricao: '"Meu Deus! / Virgem Maria! / Santo Deus!"',
              },
              {
                icone: <LuZap className="text-violet-500" />,
                titulo: "LAMENTO",
                descricao: '"Que pena! / Puxa vida! / Ai de mim!"',
              },
              {
                icone: <LuZap className="text-violet-500" />,
                titulo: "ALERTA",
                descricao: '"Muito bem! / Alto lá!"',
              },
              {
                icone: <LuZap className="text-violet-500" />,
                titulo: "CONCORDÂNCIA",
                descricao: '"Sem dúvida! / Com certeza! / Está bem!"',
              },
            ]}
          />
          <AlertBox tipo="danger" titulo="Não Confunda com Frase Exclamativa">
            Para ser locução interjetiva, exprime emoção rápida, mas{" "}
            <strong>não possui verbo</strong> (Ex: &quot;Que maravilha!&quot;).
            Se tiver verbo (&quot;Que coisa linda você fez!&quot;), torna-se já
            uma oração exclamativa ou frase completa.
          </AlertBox>
        </section>

        {/* ── LABORATÓRIO FINAL ── */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={5}
            title="Quadro-Resumo — As 10 Classes Gramaticais"
            variant="rose"
          />
          <AlertBox tipo="info" titulo="Hora de consolidar tudo!">
            Antes do simulado final, relembre as 10 classes. Use este resumo
            como revisão rápida antes da prova.
          </AlertBox>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                classe: "🔴 Verbo",
                def: "Expressa ação, estado ou fenômeno. Flexiona em pessoa, número, tempo, modo e voz.",
              },
              {
                classe: "🟢 Substantivo",
                def: "Nomeia seres, objetos, sentimentos, ações. Núcleo de praticamente todos os termos.",
              },
              {
                classe: "🔵 Pronome",
                def: "Substitui ou acompanha o substantivo. Essencial para a coesão textual.",
              },
              {
                classe: "🟡 Adjetivo",
                def: "Qualifica o substantivo. A posição (antes/depois) pode mudar o sentido.",
              },
              {
                classe: "🟠 Conjunção",
                def: "Liga orações ou termos de mesma função. Invariável. Coordenativas e Subordinativas.",
              },
              {
                classe: "🟤 Preposição",
                def: "Liga termos com subordinação. Invariável. Base da regência e crase.",
              },
              {
                classe: "🩷 Advérbio",
                def: "Modifica verbo, adjetivo ou outro advérbio. Invariável. Meio/bastante são armadilhas.",
              },
              {
                classe: "⚪ Artigo",
                def: "Determina ou indetermina o substantivo. Pode forçar substantivação (derivação imprópria).",
              },
              {
                classe: "🟣 Numeral",
                def: "Indica quantidade, ordem, multiplicação, fração. Ambos/meia são cobrados.",
              },
              {
                classe: "🔘 Interjeição",
                def: "Expressa emoção súbita. Invariável. Sempre com ponto de exclamação.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-muted/30 rounded-xl p-4 border border-border/50"
              >
                <p className="font-bold text-sm">{item.classe}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.def}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Resumo Visual + Simulado Final */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={6}
            title="Resumo e Multimídia"
            variant="rose"
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
                        title="Resumo: 10 Classes de Palavras"
                        duration="15:00"
                        thumbnail="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop"
                      />
                    </div>
                  </div>
                ),
              },
              {
                id: "resumo",
                label: "Resumo Visual",
                icon: LuBookOpen,
                content: (
                  <ModuleSummaryCarouselNew
                    images={[
                      {
                        title: "Mapa Mental: As 10 Classes",
                        type: "Mapa Mental",
                        placeholderColor: "bg-violet-100 dark:bg-violet-900/30",
                      },
                      {
                        title: "Tabela: Variáveis vs Invariáveis",
                        type: "Tabela",
                        placeholderColor: "bg-indigo-100 dark:bg-indigo-900/30",
                      },
                      {
                        title: "Infográfico: Relacionamentos",
                        type: "Infográfico",
                        placeholderColor:
                          "bg-emerald-100 dark:bg-emerald-900/30",
                      },
                      {
                        title: "Card Resumo: CIA P (Invariáveis)",
                        type: "Card",
                        placeholderColor: "bg-amber-100 dark:bg-amber-900/30",
                      },
                    ]}
                  />
                ),
              },
              {
                id: "visual",
                label: "Macete Visual",
                icon: LuBrain,
                content: (
                  <div className="text-center p-8 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-2xl border border-emerald-500/10">
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      O Macete Final: CIA P
                    </h3>
                    <div className="text-7xl my-8 animate-bounce">🕵️‍♂️ 🏷️ 🔒</div>
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                      "As classes{" "}
                      <span className="text-emerald-600 font-bold">
                        INVARIÁVEIS
                      </span>{" "}
                      são a{" "}
                      <span className="text-emerald-600 font-bold">CIA P</span>:{" "}
                      <strong>C</strong>onjunção, <strong>I</strong>
                      nterjeição, <strong>A</strong>dvérbio e <strong>P</strong>
                      reposição. Todo o resto varia!"
                    </p>
                  </div>
                ),
              },
              {
                id: "audio",
                label: "Áudio Resumo",
                icon: LuMusic,
                content: (
                  <div className="w-full flex justify-center py-4">
                    <div className="w-full max-w-md">
                      <MusicPlayerCard
                        audioUrl="#"
                        titulo="Hino das 10 Classes"
                        artista="Prof. André"
                        capaUrl="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1000&auto=format&fit=crop"
                        lyrics={`(Verso 1)
São dez classes gramaticais, decore já
Verbo, substantivo, pronome lá está
Adjetivo, advérbio, artigo e mais
Conjunção, preposição, numeral — demais!

(Refrão)
CIA P não varia, lembra dessa lição
Conjunção, Interjeição, Advérbio e Preposição!
                                                        `}
                      />
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="mt-16">
          <QuizInterativo
            questoes={qMod5}
            titulo="Quiz — Numeral & Interjeição"
            icone="🧠"
            numero={11}
            variant="rose"
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
          />
        </section>
      </TabsContent>

      {/* ══════════════════════════════════════════════
                        MÓDULO 6: SIMULADO FINAL
                    ══════════════════════════════════════════════ */}
      <TabsContent value="modulo-6" className="space-y-16 mt-12">
        <ModuleBanner
          numero={6}
          titulo="Simulado Final de Ouro"
          descricao="O desafio definitivo: todas as 10 classes integradas no padrão Cesgranrio."
          gradiente="bg-gradient-to-br from-cyan-600 via-teal-600 to-cyan-700"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <QuizInterativo
            questoes={qMod6}
            titulo="Simulado Final — Todas as 10 Classes"
            icone="🏆"
            numero={7}
            variant="cyan"
            onComplete={(score) => handleModuleComplete("modulo-6", score)}
          />
        </section>

        {/* CARD DE CONCLUSÃO MANUAL */}
        <section className="mt-12 mb-8">
          <div className="bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/10 dark:to-teal-900/5 border border-cyan-100 dark:border-cyan-800/30 rounded-2xl p-10 text-center space-y-6 shadow-sm max-w-4xl mx-auto">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold flex items-center justify-center gap-3 text-foreground">
                <LuBookOpen className="text-cyan-500 text-3xl" /> Conclusão da
                Aula
              </h3>
              <p className="text-muted-foreground text-lg">
                Parabéns! Você dominou as 10 classes de palavras. Clique abaixo
                para finalizar com chave de ouro.
              </p>
            </div>

            <Button
              size="lg"
              onClick={() => {
                if (onComplete) onComplete();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white border-0 font-bold text-lg px-10 py-8 rounded-full shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all"
            >
              Concluir Aula de Morfologia
            </Button>
          </div>
        </section>
      </TabsContent>
    </AulaTemplate>
  );
}
