"use client";

import { useState, useCallback, useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  LuCheck,
  LuCirclePlay as LuPlayCircle,
  LuMusic,
  LuBrain,
  LuBookOpen,
  LuZap,
  LuShield,
  LuMessageCircle,
  LuTriangleAlert,
  LuArrowRight,
  LuEye,
  LuFileText,
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
  SectionTitle,
  TabbedContent,
} from "./shared";

const MODULE_DEFS = [
  {
    id: "modulo-1",
    label: "Módulo 1",
    titulo: "Encontros Vocálicos e Sílabas",
  },
  { id: "modulo-2", label: "Módulo 2", titulo: "Fundamentos da Acentuação" },
  { id: "modulo-3", label: "Módulo 3", titulo: "O Novo Acordo" },
  { id: "modulo-4", label: "Módulo 4", titulo: "O Temido Uso do Hífen" },
  { id: "modulo-5", label: "Módulo 5", titulo: "Expressões Problemáticas" },
  { id: "modulo-6", label: "Módulo 6", titulo: "Laboratório & Revisão" },
] as const;

// ============================================================================
// POOLS DE QUESTÕES
// ============================================================================

const QUIZ_MOD1_POOL: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "A palavra 'Paraguai' apresenta qual tipo de encontro vocálico?",
    opcoes: [
      { label: "A", valor: "Ditongo crescente" },
      { label: "B", valor: "Ditongo decrescente" },
      { label: "C", valor: "Tritongo (SV + V + SV)" },
      { label: "D", valor: "Hiato" },
    ],
    correta: "C",
    explicacao:
      "No tritongo, temos uma semivogal, uma vogal e outra semivogal na mesma sílaba (Pa-ra-guai).",
  },
  {
    id: 2,
    pergunta:
      "Na separação silábica da palavra 'Saúde', as vogais A e U ficam em sílabas diferentes. Isso é um:",
    opcoes: [
      { label: "A", valor: "Ditongo oral" },
      { label: "B", valor: "Tritongo nasal" },
      { label: "C", valor: "Hiato" },
      { label: "D", valor: "Digrama vocálico" },
    ],
    correta: "C",
    explicacao:
      "Hiato ocorre quando duas vogais aparecem juntas na palavra, mas ficam em sílabas separadas na pronúncia (sa-ú-de).",
  },
  {
    id: 3,
    pergunta:
      "Em 'Pai' e 'Caixa', temos encontros vocálicos que não se separam. Eles são:",
    opcoes: [
      { label: "A", valor: "Hiatos tônicos" },
      { label: "B", valor: "Ditongos decrescentes (Vogal + Semivogal)" },
      { label: "C", valor: "Ditongos crescentes (Semivogal + Vogal)" },
      { label: "D", valor: "Tritongos orais" },
    ],
    correta: "B",
    explicacao:
      "Ditongo decrescente começa com a vogal (mais forte) e termina com a semivogal (mais fraca).",
  },
  {
    id: 4,
    pergunta: "Qual das alternativas abaixo apresenta apenas HIATOS?",
    opcoes: [
      { label: "A", valor: "Poeta, Luar, Dia" },
      { label: "B", valor: "Lei, Noite, Aula" },
      { label: "C", valor: "Uruguai, Quais, Saguão" },
      { label: "D", valor: "Glória, Série, Água" },
    ],
    correta: "A",
    explicacao:
      "Po-e-ta, Lu-ar, Di-a. Em todos os casos, as vogais se separam.",
  },
  {
    id: 5,
    pergunta: "A palavra 'Pão' apresenta um tipo de encontro vocálico chamado:",
    opcoes: [
      { label: "A", valor: "Ditongo nasal" },
      { label: "B", valor: "Ditongo oral" },
      { label: "C", valor: "Hiato nasal" },
      { label: "D", valor: "Tritongo decrescente" },
    ],
    correta: "A",
    explicacao:
      "A presença do til (~) torna o som nasal, e a junção de 'a' e 'o' na mesma sílaba forma o ditongo.",
  },
  {
    id: 6,
    pergunta:
      "Na palavra 'Espécie', o encontro final '-ie' pode ser pronunciado de duas formas, mas na separação padrão de concursos é um:",
    opcoes: [
      { label: "A", valor: "Ditongo crescente (SV + V)" },
      { label: "B", valor: "Hiato obrigatório" },
      { label: "C", valor: "Tritongo eventual" },
      { label: "D", valor: "Ditongo nasal forte" },
    ],
    correta: "A",
    explicacao:
      "Terminações em -ea, -eo, -ia, -ie, -io são ditongos crescentes (paroxítonas terminadas em ditongo).",
  },
];

const QUIZ_MOD2_POOL: QuizQuestion[] = [
  {
    id: 101,
    pergunta:
      "Assinale a alternativa em que todas as palavras são acentuadas pela mesma regra:",
    opcoes: [
      { label: "A", valor: "História, Água, Cenário" },
      { label: "B", valor: "Armazém, Café, Vintém" },
      { label: "C", valor: "Médico, Pássaro, Caju" },
      { label: "D", valor: "Aí, Baú, Jibóia" },
    ],
    correta: "A",
    explicacao:
      "História, Água e Cenário são todas paroxítonas terminadas em ditongo oral.",
  },
  {
    id: 102,
    pergunta: "Qual é a regra que justifica o acento na palavra 'Saúde'?",
    opcoes: [
      { label: "A", valor: "Paroxítona terminada em 'e'." },
      { label: "B", valor: "Proparoxítona aparente." },
      {
        label: "C",
        valor:
          "Regra do hiato (vogais 'i' ou 'u' tônicas sozinhas ou com 's').",
      },
      {
        label: "D",
        valor: "Nova Ortografia que exige acento em vogais abertas.",
      },
    ],
    correta: "C",
    explicacao:
      "A letra 'u' faz hiato com o 'a' anterior (sa-ú-de) e está sozinha na sílaba. Por isso leva acento agudo.",
  },
  {
    id: 103,
    pergunta:
      "Segundo a norma-padrão da Língua Portuguesa, as palavras proparoxítonas devem:",
    opcoes: [
      {
        label: "A",
        valor: "Ser acentuadas apenas se terminarem em L, N, R, X ou PS.",
      },
      {
        label: "B",
        valor: "Ser acentuadas obrigatoriamente, sem exceção (regra geral).",
      },
      {
        label: "C",
        valor: "Ser isentas de acento se possuírem mais de três sílabas.",
      },
      { label: "D", valor: "Perderam o acento com o Novo Acordo Ortográfico." },
    ],
    correta: "B",
    explicacao:
      "A regra de ouro da acentuação: TODAS as proparoxítonas são acentuadas graficamente.",
  },
  {
    id: 104,
    pergunta: "Qual das seguintes palavras **não** leva acento e por quê?",
    opcoes: [
      { label: "A", valor: "Cipo (Planta / oxítona terminada em O)." },
      { label: "B", valor: "Hifen (Paroxítona terminada em N, leva acento)." },
      { label: "C", valor: "Caju (Oxítona terminada em U, não leva acento)." },
      { label: "D", valor: "Vovo (Precisa de acento agudo ou circunflexo)." },
    ],
    correta: "C",
    explicacao:
      "Oxítonas terminadas em U e I (como caju, saci, tatu) não são acentuadas, a menos que formem hiato tônico.",
  },
  {
    id: 105,
    pergunta: "As palavras rubrica, pudico e avaro são, na norma-padrão:",
    opcoes: [
      { label: "A", valor: "Proparoxítonas." },
      { label: "B", valor: "Paroxítonas." },
      { label: "C", valor: "Oxítonas." },
      { label: "D", valor: "Monossílabos admitidos por derivarem de verbos." },
    ],
    correta: "B",
    explicacao:
      "Um erro muito comum de prosódia (pronúncia). A sílaba forte dessas palavras é a penúltima: ruBRIca, puDIco, aVAro. Logo, são paroxítonas.",
  },
  {
    id: 106,
    pergunta:
      "Os monossílabos tônicos são acentuados sempre que terminarem em:",
    opcoes: [
      { label: "A", valor: "Qualquer vogal." },
      { label: "B", valor: "I, U, e consoantes O, L, R." },
      { label: "C", valor: "A, E, O, seguidos ou não de S." },
      { label: "D", valor: "M, N ou ditongos nasais." },
    ],
    correta: "C",
    explicacao:
      "Acentuam-se os monossílabos tônicos quando terminados em A(s), E(s), O(s). Exemplos: Pás, Pé, Pó, Nós.",
  },
  {
    id: 107,
    pergunta: "A palavra 'órfão' leva acento agudo porque é uma:",
    opcoes: [
      { label: "A", valor: "Proparoxítona que foge à regra do hiato." },
      { label: "B", valor: "Paroxítona terminada em ditongo 'ão'." },
      { label: "C", valor: "Oxítona de três sílabas terminada em til." },
      { label: "D", valor: "Exceção à Nova Ortografia." },
    ],
    correta: "B",
    explicacao:
      "O acento agudo se justifica por ser paroxítona terminada em '-ão'. O til (~) não é considerado um acento gráfico de tonicidade na primeira sílaba, mas uma marca de nasalização da última.",
  },
  {
    id: 108,
    pergunta:
      "No contexto da Petrobras, a palavra 'petróleo' é acentuada por que regra?",
    opcoes: [
      {
        label: "A",
        valor: "Paroxítona terminada em um ditongo crescente 'eo'.",
      },
      { label: "B", valor: "Oxítona seguida de vogal tônica 'o'." },
      { label: "C", valor: "Monossílabo tônico ligado ao radical." },
      { label: "D", valor: "Proparoxítona com acento diferencial." },
    ],
    correta: "A",
    explicacao:
      "Pe-tró-leo é uma paroxítona (sílaba tônica 'tró') terminada no ditongo oral 'eo'. Muitos autores a classificam também como 'proparoxítona aparente ou eventual'.",
  },
];

const QUIZ_MOD3_POOL: QuizQuestion[] = [
  {
    id: 201,
    pergunta:
      "A principal alteração do Novo Acordo nos ditongos abertos (EI e OI) foi:",
    opcoes: [
      {
        label: "A",
        valor: "Foram abolidos em todas as palavras (Ideia, Heroi, Ceu).",
      },
      {
        label: "B",
        valor:
          "Perderam o acento SOMENTE nas palavras paroxítonas (ex: ideia, jiboia).",
      },
      {
        label: "C",
        valor:
          "Perderam o acento SOMENTE nas palavras oxítonas (ex: papéis, herói não têm mais acento).",
      },
      { label: "D", valor: "Passaram a receber trema." },
    ],
    correta: "B",
    explicacao:
      "Atenção CESGRANRIO: Ditongos abertos EI e OI perderam o acento NAS PAROXÍTONAS (i-dei-a, ji-boi-a, pla-tei-a). Nas oxítonas e monossílabos, continua (pa-péIS, he-rói, dói).",
  },
  {
    id: 202,
    pergunta: "Com a Nova Ortografia, o trema (¨) ainda existe?",
    opcoes: [
      {
        label: "A",
        valor: "Foi 100% abolido da Língua Portuguesa sem nenhuma exceção.",
      },
      {
        label: "B",
        valor:
          "Existe apenas em palavras estranjeiras e seus derivados (Müller, mülleriano).",
      },
      {
        label: "C",
        valor: "Foi mantido para palavras agudas terminadas em u (agüentar).",
      },
      {
        label: "D",
        valor:
          "Existe em textos jurídicos antes do Acordo que são revalidados.",
      },
    ],
    correta: "B",
    explicacao:
      "O trema caiu totalmente para palavras brasileiras e aportuguesadas (aguentar, cinquenta, bilíngue). Porém, foi mantido para nomes próprios estrangeiros e derivados.",
  },
  {
    id: 203,
    pergunta:
      "Uma regra de hiato mudou. Assinale a palavra que GRAFA corretamente (sem acento) pelo Acordo:",
    opcoes: [
      { label: "A", valor: "Saúde." },
      { label: "B", valor: "Juíza." },
      { label: "C", valor: "Feiura." },
      { label: "D", valor: "Egoísta." },
    ],
    correta: "C",
    explicacao:
      "As vogais 'i/u' nos hiatos que vêm APOŚ DITONGO nas PAROXÍTONAS perderam o acento. Fei-u-ra, bo-cai-u-va, bai-u-ca. Note que Saúde e Juíza continuam normais porque não vêm de um ditongo imediatamente anterior.",
  },
  {
    id: 204,
    pergunta: "E sobre o hiato 'OO' e 'EE'?",
    opcoes: [
      { label: "A", valor: "Ganharam acento agudo (Vôo -> Vóo)." },
      { label: "B", valor: "Não se acentuam mais (Vôo -> Voo; Lêem -> Leem)." },
      { label: "C", valor: "Continuam com o circunflexo (Vôo, Enjôo, Dêem)." },
      { label: "D", valor: "Foram trocados por I e U (Vou, Leim)." },
    ],
    correta: "B",
    explicacao:
      "Macete: as letras duplas perderam o chapéu! Voo, enjoo, perdoo, leem, deem, creem, veem.",
  },
  {
    id: 205,
    pergunta:
      "Os acentos diferenciais. Qual par abaixo AINDA mantém o acento diferencial para distinguir palavras?",
    opcoes: [
      { label: "A", valor: "Para (verbo) x Para (preposição)." },
      { label: "B", valor: "Pêlo (cabelo) x Pelo (por + o)." },
      { label: "C", valor: "Pôde (pretérito) x Pode (presente)." },
      { label: "D", valor: "Pólo (extremidade) x Polo (jogo)." },
    ],
    correta: "C",
    explicacao:
      "O acento em 'pôde' (passado de poder, 3ª pes. sing.) continua para não confundir com 'pode'. O acento diferencial também continua em: Pôr x Por, Têm x Tem (plural e singular), Vêm x Vem (plural e singular).",
  },
  {
    id: 206,
    pergunta:
      "A palavra 'Bocaiuva' não leva acento por causa da mesma regra aplicada em qual outra palavra?",
    opcoes: [
      { label: "A", valor: "Jiboia (ditongo aberto nas paraxítonas)." },
      { label: "B", valor: "Voo (hiato de mesma letra nas paroxítonas)." },
      { label: "C", valor: "Guaíba (hiato após ditongo em oxítona)." },
      {
        label: "D",
        valor:
          "Baiuca (u/i tônico fazendo hiato após ditongo nas paroxítonas).",
      },
    ],
    correta: "D",
    explicacao:
      "Baiuca e Bocaiuva sofrem da mesma regra: i e u precedidos de ditongo na penúltima sílaba (paroxítonas) perderam o acento.",
  },
];
const QUIZ_MOD4_POOL: QuizQuestion[] = [
  {
    id: 301,
    pergunta:
      "A regra principal para uso do hífen com prefixos é a dos opostos. Assinale a alternativa correta:",
    opcoes: [
      {
        label: "A",
        valor:
          "Vogais iguais se juntam (microondas). Vogais diferentes se separam com hífen (auto-escola).",
      },
      {
        label: "B",
        valor:
          "Vogais iguais se separam com hífen (micro-ondas). Vogais diferentes se juntam (autoescola).",
      },
      {
        label: "C",
        valor: "Todas as vogais repetidas são aglutinadas (antiinflamatório).",
      },
      { label: "D", valor: "Nenhuma alternativa está correta." },
    ],
    correta: "B",
    explicacao:
      "Os opostos se atraem e os iguais se repelem. Vogais IGUAIS = separa com hífen (micro-ondas, anti-inflamatório). Vogais DIFERENTES = junta tudo (autoescola, infraestrutura).",
  },
  {
    id: 302,
    pergunta:
      "Como se escreve o prefixo terminado em vogal quando a próxima palavra começa por 'R' ou 'S'?",
    opcoes: [
      { label: "A", valor: "Com hífen. Ex: mini-saia, ultra-som." },
      {
        label: "B",
        valor: "Sem hífen, mas dobra-se o R ou S. Ex: minissaia, ultrassom.",
      },
      { label: "C", valor: "Sem hífen e sem dobrar. Ex: minisaia, ultrasom." },
      { label: "D", valor: "Com hífen e dobra-se o R ou S. Ex: mini-ssaia." },
    ],
    correta: "B",
    explicacao:
      "Se o prefixo terminar em VOGAL e a segunda palavra começar com R/S, não tem hífen, junta-se e dobra-se a consoante. Ex: minissaia, antissocial, macrorregião.",
  },
  {
    id: 303,
    pergunta:
      "Palavras compostas que PERDERAM a noção de composition pelo uso consagrado devem ser separadas por hífen?",
    opcoes: [
      {
        label: "A",
        valor: "Sempre, porque a história da palavra dita a regra.",
      },
      { label: "B", valor: "Não, perdem o hífen e aglutinam-se." },
      { label: "C", valor: "Apenas se tiverem mais de 3 sílabas." },
      {
        label: "D",
        valor: "Apenas palavras ligadas por preposição, como 'pé-de-moleque'.",
      },
    ],
    correta: "B",
    explicacao:
      "Se a palavra já é vista como uma só (Ex: girassol, mandachuva, passatempo, pontapé, paraquedas), ela perdeu o hífen pelo Acordo Ortográfico.",
  },
  {
    id: 304,
    pergunta:
      "Sobre as palavras ligadas por elementos de ligação (ex: prep. 'de'), marca a ERRADA segundo a nova regra:",
    opcoes: [
      { label: "A", valor: "Pé de moleque (sem hífen)." },
      { label: "B", valor: "Cara de pau (sem hífen)." },
      { label: "C", valor: "Dia a dia (sem hífen)." },
      { label: "D", valor: "Mão-de-obra (com hífen)." },
    ],
    correta: "D",
    explicacao:
      "A regra diz: Caiu o hífen em palavras compostas com elemento de ligação (de, a, do). O correto é MÃO DE OBRA, PÉ DE MOLEQUE, DIA A DIA. Exceções clássicas são nomes de plantas/animais (bico-de-papagaio) e palavras consagradas (água-de-colônia, arco-da-velha, mais-que-perfeito, cor-de-rosa).",
  },
  {
    id: 305,
    pergunta: "A palavra 'sub-reino' usa hífen porque:",
    opcoes: [
      {
        label: "A",
        valor: "Prefixos SUB ou SOB seguidos de R mantêm o hífen.",
      },
      {
        label: "B",
        valor:
          "Todo prefixo tem hífen obrigatoriamente quando não dobra a letra.",
      },
      { label: "C", valor: "Foi padronizado pela literatura." },
      { label: "D", valor: "O hífen substituiu o acento." },
    ],
    correta: "A",
    explicacao:
      "Os prefixos SUB e SOB exigem hífen se a segunda palavra começar com R (sub-raça, sub-região) ou B (sob-base). Ah, e SUB-HUMANO também ganha o hífen se mantivermos o H, mas 'subumano' (sem H e junto) também é aceito.",
  },
  {
    id: 306,
    pergunta:
      "Prefixos como 'ex', 'vice', 'aquém', 'além' e 'recém' seguem que regra para o hífen?",
    opcoes: [
      { label: "A", valor: "Sem hífen." },
      { label: "B", valor: "Apenas com vogais oponentes." },
      { label: "C", valor: "SEMPRE têm hífen." },
      { label: "D", valor: "Somente com nomes próprios." },
    ],
    correta: "C",
    explicacao:
      "Famosa 'Regra do Ex e do Vice'. Com 'ex', 'vice' (no sentido de posição anterior ou substituta), 'além', 'aquém' e 'recém', o hífen é sempre obrigatório. Ex: ex-namorado, vice-presidente, recém-casado.",
  },
];

const QUIZ_MOD5_POOL: QuizQuestion[] = [
  {
    id: 401,
    pergunta:
      "A frase: 'Não sei _____ tudo deu errado. Você concorda _____?' Os pronomes correspondentes são:",
    opcoes: [
      { label: "A", valor: "por que / porquê" },
      { label: "B", valor: "por que / com o por que" },
      { label: "C", valor: "porque / porque" },
      { label: "D", valor: "porquê / por quê" },
    ],
    correta: "A",
    explicacao:
      "A primeira frase usa 'por que' (separado e sem acento) como equivalente a 'por qual motivo'. A segunda, no final da pergunta ('Você concorda por quê?'), é separado e COM acento pois precede ponto de interrogação.",
  },
  {
    id: 402,
    pergunta: "Marque a opção onde ONDE / AONDE estão usados corretamente:",
    opcoes: [
      { label: "A", valor: "Aonde você mora agora?" },
      { label: "B", valor: "Onde vamos na sexta-feira?" },
      { label: "C", valor: "Não sei aonde você quer chegar." },
      { label: "D", valor: "Aonde estávamos mesmo?" },
    ],
    correta: "C",
    explicacao:
      "ONDE é lugar fixo, ideia de permanência (Onde você mora?). AONDE indica movimento/destino, equivale a 'para onde' e acompanha verbos como Ir, Chegar. (Aonde = para onde você quer chegar).",
  },
  {
    id: 403,
    pergunta:
      "Preencha a lacuna: 'O navio estava a _____ de 5 quilômetros do cais.'",
    opcoes: [
      { label: "A", valor: "cerca" },
      { label: "B", valor: "acerca" },
      { label: "C", valor: "ha cerca" },
      { label: "D", valor: "a cerca" },
    ],
    correta: "A",
    explicacao:
      "A expressão é 'Cerca de' (que indica aproximadamente). Ex: Estava a cerca de 5 km. Já 'Acerca de' significa 'sobre/a respeito de' (Ex: Falamos ACERCA DE política). E 'Há cerca de' indica tempo passado.",
  },
  {
    id: 404,
    pergunta:
      "Marque a certa. 'Ele é um _____ profissional; foi muito _____ no teste.'",
    opcoes: [
      { label: "A", valor: "mau / mal" },
      { label: "B", valor: "mau / mau" },
      { label: "C", valor: "mal / mau" },
      { label: "D", valor: "mal / mal" },
    ],
    correta: "A",
    explicacao:
      "Macete: MAU é o oposto de BOM. MAL é o oposto de BEM. Ele é um BOM profissional (então é MAU). Ele foi muito BEM no teste (então foi MAL).",
  },
  {
    id: 405,
    pergunta: "A expressão SENÃO é usada toda junta quando:",
    opcoes: [
      { label: "A", valor: "Puder ser substituída por 'caso não'." },
      {
        label: "B",
        valor:
          "Puder ser substituída por 'a não ser', 'do contrário', 'mas sim' ou significar um 'defeito'.",
      },
      { label: "C", valor: "Vem depois da palavra 'estudo'." },
      {
        label: "D",
        valor: "Estiver acompanhada do pronome ELA. (só se não...)",
      },
    ],
    correta: "B",
    explicacao:
      "Junto: Senão (a não ser, mas sim, caso contrário, defeito). Separado: Se não (condição -> caso não chova, iremos).",
  },
  {
    id: 406,
    pergunta:
      "Em frases declarativas afirmativas (respostas justiticativas), usa-se qual tipo de por quê?",
    opcoes: [
      { label: "A", valor: "Por que (separado e s/ acento)" },
      { label: "B", valor: "Porque (junto e s/ acento)" },
      { label: "C", valor: "Porquê (junto e c/ acento)" },
      { label: "D", valor: "Por quê (separado e c/ acento)" },
    ],
    correta: "B",
    explicacao:
      "Respostas = PORQUE (junto e sem acento), tem valor de 'pois'. Quando o 'porquê' vier acompanhado de artigo (O porquê), será um substantivo, junto COM acento.",
  },
];
const QUIZ_MOD6_POOL: QuizQuestion[] = [
  {
    id: 501,
    pergunta:
      "Em relação ao Acordo Ortográfico vigente, observe as palavras: I. Pinguim; II. Voos; III. Boia. Assinale a correta:",
    opcoes: [
      { label: "A", valor: "Todas perderam o acento gráfico/trema." },
      {
        label: "B",
        valor:
          "Pinguim (trema), Voos (acento no hiato) e Boia (ditongo de oxítona) perderam seus sinais.",
      },
      { label: "C", valor: "Apenas 'Boia' perdeu o acento." },
      { label: "D", valor: "Voos mantém o acento pois é exceção." },
    ],
    correta: "A",
    explicacao:
      "PINGUIM perdeu o trema (ü). VOOS (hiato oo) perdeu o circunflexo. E BÓIA virou BOIA porque o ditongo aberto OI em palavras paroxítonas perdeu o acento.",
  },
  {
    id: 502,
    pergunta:
      "A palavra 'micro-ondas' tem hífen pela mesma regra que obriga o hífen em:",
    opcoes: [
      { label: "A", valor: "Microcomputador" },
      { label: "B", valor: "Anti-inflamatório" },
      { label: "C", valor: "Autossustentável" },
      { label: "D", valor: "Inter-regional" },
    ],
    correta: "B",
    explicacao:
      "Micro-ondas tem hífen pois a vogal final do prefixo (o) é igual à inicial da segunda palavra (o). O mesmo ocorre em anti-inflamatório (i-i).",
  },
  {
    id: 503,
    pergunta: "Identifique a frase correta quanto ao uso dos porquês:",
    opcoes: [
      { label: "A", valor: "Não sei por que a sonda falhou." },
      { label: "B", valor: "Ele chorou porque?" },
      { label: "C", valor: "Eis o por que da demora." },
      { label: "D", valor: "Porquê você não veio trabalhar?" },
    ],
    correta: "A",
    explicacao:
      "Em A, equivale a 'por qual motivo' (separado e sem acento). B: 'por quê' (interrogação). C: 'o porquê' (substantivado, tem acento). D: 'Por que' (início de pergunta, não tem acento).",
  },
  {
    id: 504,
    pergunta: "Qual dupla está 100% correta no uso de acentuação?",
    opcoes: [
      { label: "A", valor: "Eles pôdem vir amanhã / O vôo atrasou" },
      { label: "B", valor: "Eles vêm cedo / Ele intervém sempre" },
      { label: "C", valor: "Ideía brilhante / Heroi fraco" },
      { label: "D", valor: "Pêlo do cão / Péra madura" },
    ],
    correta: "B",
    explicacao:
      "Vêm (plural de vir recebe circunflexo); Intervém (derivado de terceira pessoa do singular, recebe acento agudo, virando paroxítona terminada em 'em' oxítona). O plural seria intervêm.",
  },
  {
    id: 505,
    pergunta:
      "A conjugação 'Eles creem' e 'Ele cre' (verbo crer) estão grafadas corretamente?",
    opcoes: [
      { label: "A", valor: "Sim, faltou acento apenas na plural." },
      { label: "B", valor: "O correto é crêem e crê." },
      { label: "C", valor: "O correto é creem e crê." },
      { label: "D", valor: "Nenhuma das anteriores." },
    ],
    correta: "C",
    explicacao:
      "'Creem' (hiato 'ee' perdeu acento com o Novo Acordo). Já 'crê' (monossílabo tônico finalizado em E ganha circunflexo, independentemente do acordo).",
  },
  {
    id: 506,
    pergunta:
      "Complete corretamente: 'Os técnicos agiram _____ e por isso o equipamento sofreu um _____ irreparável.'",
    opcoes: [
      { label: "A", valor: "mau / mau" },
      { label: "B", valor: "mal / mal" },
      { label: "C", valor: "mau / mal" },
      { label: "D", valor: "mal / mal" },
      { label: "E", valor: "mal / mau" },
    ],
    correta: "D",
    explicacao:
      "Eles agiram BEM (oposto de MAL na ação adverbial). O equipamento sofreu um BOM defeito(?) Não, oposto de BOM é MAU (adjetivo qualificando o substantivo irreparável). Logo MAL / MAU.",
  },
];

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function AulaOrtografia({
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

  useEffect(() => {
    setQMod1(getRandomQuestions(QUIZ_MOD1_POOL, 6));
    setQMod2(getRandomQuestions(QUIZ_MOD2_POOL, 6));
    setQMod3(getRandomQuestions(QUIZ_MOD3_POOL, 6));
    setQMod4(getRandomQuestions(QUIZ_MOD4_POOL, 6));
    setQMod5(getRandomQuestions(QUIZ_MOD5_POOL, 6));
    setQMod6(
      getRandomQuestions(
        [
          ...QUIZ_MOD1_POOL,
          ...QUIZ_MOD2_POOL,
          ...QUIZ_MOD3_POOL,
          ...QUIZ_MOD4_POOL,
          ...QUIZ_MOD5_POOL,
          ...QUIZ_MOD6_POOL,
        ],
        20,
      ),
    );
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
  }, [completedModules]);

  const isModuleUnlocked = useCallback((_moduleIndex: number) => {
    return true; // TEMPORÁRIO: Desbloqueado para revisão
  }, []);

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
  return (
    <AulaTemplate
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      modules={Array.from(MODULE_DEFS)}
      completedModules={completedModules}
      isModuleUnlocked={isModuleUnlocked}
      titulo="Ortografia e Acentuação"
      descricao="Domine grafia, fonética e as novas regras de acentuação para gabaritar."
      duracao="45 min"
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
      {/* MÓDULO 1: ACENTUAÇÃO GRÁFICA */}
      {/* =======================================================
                        MÓDULO 1: Encontros Vocálicos e Sílabas
                    ======================================================= */}
      <TabsContent
        value="modulo-1"
        className="space-y-12 mt-12 focus-visible:outline-none"
      >
        <ModuleBanner
          numero={1}
          titulo="Encontros Vocálicos e Sílabas"
          descricao="A base da fonética: entenda ditongos, tritongos, hiatos e como separar as sílabas corretamente."
          gradiente="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-600"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={1}
            title="Encontros Vocálicos"
            description="A fundação da fonética: compreenda a união e a separação de sons vocálicos nas palavras."
            variant="indigo"
          />

          <AlertBox tipo="info" titulo="O que são?">
            São agrupamentos de vogais e semivogais em uma mesma palavra. É o
            primeiro passo para entender a acentuação gráfica.
          </AlertBox>

          <ContentAccordion
            mode="stacked"
            titulo="Tipos de Encontros"
            icone={<LuBookOpen />}
            corIndicador="bg-blue-500"
            defaultOpen={true}
            slides={[
              {
                titulo: "1. Ditongo",
                icone: "👥",
                conteudo: (
                  <CardCarousel
                    titulo=""
                    itemsPerView={2}
                    cards={[
                      {
                        icone: <LuZap />,
                        titulo: "Conceito",
                        descricao:
                          "Vogal + Semivogal (ou vice-versa) na mesma sílaba. Ex: PAI, CAI-XA.",
                      },
                      {
                        icone: <LuCheck className="text-emerald-500" />,
                        titulo: "Crescente vs Decrescente",
                        descricao:
                          "Crescente: SV + V (Ex: Gló-ria). Decrescente: V + SV (Ex: Le-ite).",
                        corFundo: "bg-emerald-500/10",
                      },
                    ]}
                  />
                ),
              },
              {
                titulo: "2. Tritongo",
                icone: "👥👥",
                conteudo: (
                  <div className="p-4 bg-muted/50 rounded-xl border border-border flex items-center gap-4">
                    <div className="p-3 bg-amber-500/20 text-amber-600 rounded-lg">
                      <LuZap size={24} />
                    </div>
                    <div>
                      <p className="font-bold">SV + V + SV na mesma sílaba</p>
                      <p className="text-sm opacity-80 italic">
                        Exemplos: Pa-ra-guai, Sa-guão, En-xaguei.
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "3. Hiato",
                icone: "↔️",
                conteudo: (
                  <AlertBox tipo="warning" titulo="Não se engane!">
                    No hiato, as vogais estão juntas na palavra, mas pertencem a
                    sílabas DIFERENTES.
                    <div className="mt-2 font-mono text-sm">
                      Ex: Sa-ú-de, Co-e-lho, Ba-ú.
                    </div>
                  </AlertBox>
                ),
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={2}
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
                        title="Encontros Vocálicos"
                        duration="12:00"
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
                        title: "Mapa Mental: Ditongo vs Hiato",
                        type: "Mapa Mental",
                        placeholderColor: "bg-blue-100 dark:bg-blue-900/30",
                      },
                      {
                        title: "Fluxograma: Classificação Vocálica",
                        type: "Diagrama",
                        placeholderColor:
                          "bg-emerald-100 dark:bg-emerald-900/30",
                      },
                      {
                        title: "Infográfico: Tritongo na Prática",
                        type: "Infográfico",
                        placeholderColor: "bg-amber-100 dark:bg-amber-900/30",
                      },
                      {
                        title: "Card Resumo: Separação Silábica",
                        type: "Card",
                        placeholderColor: "bg-purple-100 dark:bg-purple-900/30",
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
                      O Segredo da Sílaba
                    </h3>
                    <div className="text-7xl my-8 animate-bounce">🎵 👄 🎵</div>
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                      "Os iguais se separam (hiato), os diferentes se unem
                      (ditongo). Semivogal é apenas apoio!"
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
                        titulo="O Samba do Encontro"
                        artista="Prof. André"
                        capaUrl="https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=1000&auto=format&fit=crop"
                        lyrics={`(Verso 1)
Se a vogal tá sozinha, é hiato meu irmão
Se ela traz a semivogal, é ditongo na mão
SV + V + SV, o tritongo apareceu
Na prova da Petrobras, quem acerta sou eu!

(Refrão)
Encontro vocálico, não tem confusão
Ditongo é junto, hiato é separação!
                                                        `}
                      />
                    </div>
                  </div>
                ),
              },
            ]}
          />

          <QuizInterativo
            questoes={qMod1}
            titulo="Quiz — Encontros Vocálicos"
            icone="🎯"
            numero={2}
            variant="indigo"
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          />
        </section>
      </TabsContent>

      {/* =======================================================
                        MÓDULO 2: Fundamentos da Acentuação
                    ======================================================= */}
      <TabsContent
        value="modulo-2"
        className="space-y-12 mt-12 focus-visible:outline-none"
      >
        <ModuleBanner
          numero={2}
          titulo="Fundamentos da Acentuação"
          descricao="As 4 regras de ouro para dominar oxítonas, paroxítonas, proparoxítonas e monossílabos."
          gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={1}
            title="Classificação da Sílaba Tônica"
            description="Aprenda a identificar o coração sonoro das palavras para aplicar as regras de acento."
            variant="emerald"
          />

          <AlertBox tipo="info" titulo="O que é a Sílaba Tônica?">
            É a sílaba pronunciada com maior intensidade na palavra. Dependendo
            da posição dessa sílaba (contando sempre do final para o início),
            aplicamos regras de acentuação diferentes.
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-md text-sm mt-3">
              <strong>Oxítona:</strong> Ja-ca-<strong>RÉ</strong> (última
              forte).
              <br />
              <strong>Paroxítona:</strong> <strong>LÁ</strong>-pis (penúltima
              forte).
              <br />
              <strong>Proparoxítona:</strong> <strong>MÉ</strong>-di-co
              (antepenúltima forte).
            </div>
          </AlertBox>

          <ContentAccordion
            mode="stacked"
            titulo="Regra Geral de Acentuação"
            icone={<LuBookOpen />}
            corIndicador="bg-emerald-500"
            defaultOpen={true}
            slides={[
              {
                titulo: "1. Proparoxítonas (A Regra Imbatível)",
                icone: "👑",
                conteudo: (
                  <CardCarousel
                    titulo=""
                    itemsPerView={2}
                    cards={[
                      {
                        icone: <LuBookOpen />,
                        titulo: "Conceito",
                        descricao:
                          "Sílaba forte na antepenúltima. Esta é a regra mais fácil de todas, pois não possui exceções.",
                      },
                      {
                        icone: <LuZap className="text-emerald-500" />,
                        titulo: "A Regra",
                        descricao: (
                          <div className="text-center font-bold text-emerald-700 dark:text-emerald-400 mt-2">
                            TODAS SÃO ACENTUADAS
                          </div>
                        ),
                        corFundo: "bg-emerald-500/10",
                      },
                      {
                        icone: <LuCheck className="text-blue-500" />,
                        titulo: "Exemplos",
                        descricao:
                          "MÁ-gi-co, RÚ-sti-co, ÍN-te-rim, PÉS-si-mo, Ár-vo-re.",
                        corFundo: "bg-blue-500/10",
                      },
                    ]}
                  />
                ),
              },
              {
                titulo: "2. Paroxítonas (A Regra Longa)",
                icone: "📜",
                conteudo: (
                  <CardCarousel
                    titulo=""
                    itemsPerView={2}
                    cards={[
                      {
                        icone: <LuBookOpen />,
                        titulo: "Conceito",
                        descricao:
                          "Sílaba forte na penúltima. A maioria das palavras em português são paroxítonas. Por isso, a regra geral é NÃO acentuar, exceto terminações específicas.",
                      },
                      {
                        icone: <LuTriangleAlert className="text-amber-500" />,
                        titulo: "A Regra Clássica",
                        descricao:
                          "Recebem acento as terminadas em L, N, R, X, PS (TúneL, PóleN, RevólveR, DúreX, FórcePS) e I(s), U(s), UM(uns), Ã(s), ÃO(s).",
                        corFundo: "bg-amber-500/10",
                      },
                      {
                        icone: <LuZap className="text-emerald-500" />,
                        titulo: "A Regra de Ouro (Ditongos)",
                        descricao: (
                          <div className="text-center font-bold text-emerald-700 dark:text-emerald-400 mt-2">
                            TODAS as terminadas em DITONGO ORAL ganham acento
                          </div>
                        ),
                        corFundo: "bg-emerald-500/10",
                      },
                      {
                        icone: <LuCheck className="text-blue-500" />,
                        titulo: "Exemplos (Ditongos)",
                        descricao: "Históri-A, Águ-A, Cárie-S, Vácu-O.",
                        corFundo: "bg-blue-500/10",
                      },
                    ]}
                  />
                ),
              },
              {
                titulo: "3. Oxítonas & Monossílabos Tônicos",
                icone: "🔚",
                conteudo: (
                  <CardCarousel
                    titulo=""
                    itemsPerView={2}
                    cards={[
                      {
                        icone: <LuBookOpen />,
                        titulo: "Conceito: Oxítonas",
                        descricao:
                          "A última sílaba é a forte. Acentuam-se em A, E, O e a nasal EM/ENS.",
                      },
                      {
                        icone: <LuCheck className="text-emerald-500" />,
                        titulo: "Exemplos: Oxítonas",
                        descricao: "CafÉ, PaletÓ, ArmazÉM, ParabÉNS.",
                        corFundo: "bg-emerald-500/10",
                      },
                      {
                        icone: <LuZap className="text-amber-500" />,
                        titulo: "Monossílabos Tônicos",
                        descricao:
                          "Acentuam-se as mesmas das oxítonas, EXCETO a terminação EM/ENS. Ex: MÁ(s), PÉ(s), PÓ(s).",
                        corFundo: "bg-amber-500/10",
                      },
                    ]}
                  />
                ),
              },
              {
                titulo: "4. A Regra do Hiato",
                icone: "🪓",
                conteudo: (
                  <CardCarousel
                    titulo=""
                    itemsPerView={2}
                    cards={[
                      {
                        icone: <LuBookOpen />,
                        titulo: "Conceituação",
                        descricao:
                          'O hiato ocorre quando duas vogais ficam em sílabas vizinhas na divisão silábica. Sempre acentue as vogais "I" e "U" dos hiatos se forem tônicas (fortes) e ficarem SOZINHAS na sílaba (ou acompanhadas de "S").',
                      },
                      {
                        icone: <LuTriangleAlert className="text-amber-500" />,
                        titulo: "Exceções Clássicas",
                        descricao:
                          'Não recebem acento se forem seguidas de "NH", e nem se formarem um ditongo decrescente na sílaba anterior (Nova Regra).',
                        corFundo: "bg-amber-500/10",
                      },
                      {
                        icone: <LuCheck className="text-emerald-500" />,
                        titulo: "Exemplos COM Acento",
                        descricao:
                          "Sa-ú-de (sozinha), E-go-ís-ta (com S), Ba-ú.",
                        corFundo: "bg-emerald-500/10",
                      },
                      {
                        icone: <LuShield className="text-red-500" />,
                        titulo: "Exemplos SEM Acento",
                        descricao:
                          "Ra-i-nha (tem NH logo depois), Ju-iz (acompanhada por Z e não S).",
                        corFundo: "bg-red-500/10",
                      },
                    ]}
                  />
                ),
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={2}
            title="Resumo e Multimídia"
            description="Ferramentas práticas para memorizar as 4 regras de ouro da acentuação."
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
                        title="Guia Definitivo Acentuação"
                        duration="10:00"
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
                        title: "Mapa Mental: Oxítonas vs Paroxítonas",
                        type: "Mapa Mental",
                        placeholderColor:
                          "bg-emerald-100 dark:bg-emerald-900/30",
                      },
                      {
                        title: "Fluxograma: Regras de Acentuação",
                        type: "Diagrama",
                        placeholderColor: "bg-teal-100 dark:bg-teal-900/30",
                      },
                      {
                        title: "Infográfico: Proparoxítonas",
                        type: "Infográfico",
                        placeholderColor: "bg-amber-100 dark:bg-amber-900/30",
                      },
                      {
                        title: "Card Resumo: Monossílabos Tônicos",
                        type: "Card",
                        placeholderColor: "bg-blue-100 dark:bg-blue-900/30",
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
                      Rouxinol sem H
                    </h3>
                    <div className="text-7xl my-8 animate-bounce">🐦 ✨ 🎯</div>
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                      As consoantes R-OU-X-I-N-O-L (+ PS, UM e ditongos)
                      acentuam as Paroxítonas. Memorize como "ROUXINOL"!
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
                        titulo="O Funk da Acentuação"
                        artista="Prof. André"
                        capaUrl="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000&auto=format&fit=crop"
                        lyrics={`(Verso 1)
Oxítona com A, E, O, EM — acento nela!
Paroxítona com essas, não leva, irmão, é a regra.
Proparoxítona? Todas acentuadas, sem exceção!

(Refrão)
Rouxinol sem H, é o mnemônico sagrado
R-OU-X-I-N-O-L, deixa o concurseiro preparado!
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
            titulo="Quiz — Regras da Acentuação"
            icone="🎓"
            numero={1}
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          />
        </section>
      </TabsContent>
      {/* =======================================================
                        MÓDULO 3: O Novo Acordo
                    ======================================================= */}
      <TabsContent
        value="modulo-3"
        className="space-y-12 mt-12 focus-visible:outline-none"
      >
        <ModuleBanner
          numero={3}
          titulo="O Novo Acordo"
          descricao="Aprenda o que caiu, o que mudou e o que a Cesgranrio mais cobra sobre a Nova Ortografia."
          gradiente="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={1}
            title="As Três Grandes Baixas"
            description="Foco total no que mudou: ditongos abertos, tremas e as novas regras de hiato."
            variant="violet"
          />

          <AlertBox tipo="warning" titulo="O Alvo da Banca">
            As bancas amam cobrar as palavras que **perderam** o acento no Novo
            Acordo. A regra de ouro é: Palavras paroxítonas sofreram as maiores
            mudanças. As oxítonas quase não foram tocadas.
          </AlertBox>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                  <span className="font-bold text-xl md:text-2xl bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                    Adeus, Trema (¨)
                  </span>
                </div>
              }
              verso={
                <div className="flex flex-col justify-center h-full space-y-4 text-center text-sm p-4">
                  <p>Abolido totalmente em palavras em português.</p>
                  <div className="bg-blue-500/10 p-3 rounded">
                    <p className="line-through text-red-400">
                      Cinqüenta, Lingüiça
                    </p>
                    <p className="text-green-500 font-bold">
                      Cinquenta, Linguiça
                    </p>
                  </div>
                </div>
              }
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                  <span className="font-bold text-xl md:text-2xl bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                    Ditongos Abertos (Paroxítonas)
                  </span>
                </div>
              }
              verso={
                <div className="flex flex-col justify-center h-full space-y-4 text-center text-sm p-4">
                  <p>
                    ÉI e ÓI perderam o acento APENAS em palavras paroxítonas.
                  </p>
                  <div className="bg-indigo-500/10 p-3 rounded">
                    <p className="line-through text-red-400">Idéia, Jibóia</p>
                    <p className="text-green-500 font-bold">Ideia, Jiboia</p>
                  </div>
                </div>
              }
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                  <span className="font-bold text-xl md:text-2xl bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                    Hiato de vogais duplas
                  </span>
                </div>
              }
              verso={
                <div className="flex flex-col justify-center h-full space-y-4 text-center text-sm p-4">
                  <p>
                    Vogais repetidas (OO, EE) não têm mais acento circunflexo.
                  </p>
                  <div className="bg-sky-500/10 p-3 rounded">
                    <p className="line-through text-red-400">
                      Vôo, Lêem, Crêem
                    </p>
                    <p className="text-green-500 font-bold">Voo, Leem, Creem</p>
                  </div>
                </div>
              }
            />
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12 mt-12">
          <ModuleSectionHeader
            index={2}
            title="O Hiato Revoltado"
            description="Desvende a pegadinha suprema dos hiatos após ditongos em todas as suas nuances."
            variant="violet"
          />

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-6">
              <h3 className="text-2xl font-bold">
                Feiura não tem mais acento!
              </h3>
              <p className="text-muted-foreground text-lg text-justify">
                Uma regra muito específica mudou: as letras <strong>I</strong> e{" "}
                <strong>U</strong> tônicas (hiato) perderam o acento se vierem
                logo <strong>após um ditongo</strong> em palavras{" "}
                <strong>paroxítonas</strong>.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-xl">
                  <LuCheck className="text-green-500 w-6 h-6 shrink-0" />
                  <div className="space-y-1">
                    <p className="font-semibold text-lg">Feiura</p>
                    <p className="text-muted-foreground text-sm">
                      Fei(ditongo)-u(hiato)-ra = O "U" vem depois de ditongo
                      "ei". Perde o acento.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-xl">
                  <LuCheck className="text-green-500 w-6 h-6 shrink-0" />
                  <div className="space-y-1">
                    <p className="font-semibold text-lg">Bocaiuva</p>
                    <p className="text-muted-foreground text-sm">
                      Bo-cai(ditongo)-u(hiato)-va = Sem acento.
                    </p>
                  </div>
                </div>
              </div>
              <AlertBox tipo="warning" titulo="A Pegadinha Suprema">
                Essa regra só vale para as PAROXÍTONAS. Se for OXÍTONA, o acento
                continua! Exemplo: <strong>Piauí</strong> (Pi-au-í) e{" "}
                <strong>Tuiuiú</strong> continuam acentuadas.
              </AlertBox>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={3}
            title="Resumo e Multimídia"
            description="Recursos visuais e auditivos para fixar a base fonética e ortográfica."
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
                        title="Guia Definitivo Acordo"
                        duration="11:00"
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
                        title: "Mapa Mental: Trema e Acento Diferencial",
                        type: "Mapa Mental",
                        placeholderColor: "bg-blue-100 dark:bg-blue-900/30",
                      },
                      {
                        title: "Tabela: Acentos que Morreram vs Sobreviveram",
                        type: "Tabela",
                        placeholderColor: "bg-indigo-100 dark:bg-indigo-900/30",
                      },
                      {
                        title: "Infográfico: Mudanças do Acordo",
                        type: "Infográfico",
                        placeholderColor:
                          "bg-emerald-100 dark:bg-emerald-900/30",
                      },
                      {
                        title: "Card Resumo: Pôde vs Pode",
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
                      Os Sobreviventes do Acordo
                    </h3>
                    <div className="text-7xl my-8 animate-pulse">😭 ➡️ 🦸‍♂️</div>
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                      "Se for oxítona, o acento continua. Se for paroxítona,
                      tchau acento! Pôde, Pôr e Têm/Vêm sobreviveram."
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
                        titulo="Rap do Novo Acordo"
                        artista="Prof. André"
                        capaUrl="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000&auto=format&fit=crop"
                        lyrics={`(Verso 1)
O trema morreu, descanse em paz
Pelo, polo, pera — sem acento, é demais!
Mas pôde e pôr, esses são guerreiros
Têm e vêm no plural, firmes e verdadeiros!

(Refrão)
Novo acordo, nova lei, nova era
Mas na prova a banca te espera!
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
            titulo="Quiz — O Novo Acordo"
            icone="✅"
            numero={3}
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </section>
      </TabsContent>

      {/* =======================================================
                        MÓDULO 4: O Temido Uso do Hífen
                    ======================================================= */}
      <TabsContent
        value="modulo-4"
        className="space-y-12 mt-12 focus-visible:outline-none"
      >
        <ModuleBanner
          numero={4}
          titulo="O Temido Uso do Hífen"
          descricao="Compreenda a lógica magnética dos prefixos para nunca mais errar uso de hífen."
          gradiente="bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-700"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={1}
            title="A Lei Magnética dos Opostos"
            variant="amber"
          />

          <AlertBox tipo="info" titulo="O Princípio Magnético do Hífen">
            O uso do hífen com prefixos é governado por uma lógica simples que
            lembra a física dos ímãs: opostos se atraem (juntam sem hífen) e
            iguais se repelem (separam com hífen). Entender essa lógica evita a
            decoreba infinita de regras.
            <div className="bg-indigo-500/10 border border-indigo-500/20 p-3 rounded-md text-sm mt-3">
              <strong>Exemplo Prático:</strong> Em "Autoescola", o prefixo
              termina em "O", e a palavra começa com "E" (vogais
              opostas/diferentes). Portanto, elas <strong>se atraem</strong> e
              perdem o hífen!
            </div>
          </AlertBox>

          <div className="flex flex-col md:flex-row gap-8 items-center mt-6">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="w-48 h-48 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center border-4 border-indigo-500 border-dashed">
                <div className="text-center">
                  <p className="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                    Opostos
                  </p>
                  <p className="text-sm text-muted-foreground font-medium mt-2">
                    SE ATRAEM (Juntam)
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <h3 className="text-2xl font-bold">Vogais Diferentes = Junta!</h3>
              <p className="text-muted-foreground text-lg text-justify">
                Se a última letra do prefixo for uma vogal, e a letra inicial da
                palavra seguinte for uma vogal diferente, abandone o hífen e
                junte as duas!
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-xl">
                  <LuCheck className="text-green-500 w-6 h-6 shrink-0" />
                  <div className="space-y-1">
                    <p className="font-semibold text-lg">
                      Autoescola (e não auto-escola)
                    </p>
                    <p className="text-muted-foreground text-sm">
                      O terminando, E começando. Opostos atraem.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-xl">
                  <LuCheck className="text-green-500 w-6 h-6 shrink-0" />
                  <div className="space-y-1">
                    <p className="font-semibold text-lg">Infraestrutura</p>
                    <p className="text-muted-foreground text-sm">
                      A terminando, E começando. Opostos atraem.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse gap-8 items-center mt-12 pt-12 border-t border-border">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="w-48 h-48 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center border-4 border-red-500 border-dashed">
                <div className="text-center">
                  <p className="text-4xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                    Iguais
                  </p>
                  <p className="text-sm text-muted-foreground font-medium mt-2">
                    SE REPELEM (Separam)
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <h3 className="text-2xl font-bold">Vogais Iguais = Hífen!</h3>
              <p className="text-muted-foreground text-lg text-justify">
                Se a última letra do prefixo for igual à primeira letra da
                palavra seguinte, elas brigam. Use o hífen para separá-las.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-xl border border-red-500/20">
                  <LuTriangleAlert className="text-red-500 w-6 h-6 shrink-0" />
                  <div className="space-y-1">
                    <p className="font-semibold text-lg">Micro-ondas</p>
                    <p className="text-muted-foreground text-sm">
                      O de micro + O de ondas. Iguais separam.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-xl border border-red-500/20">
                  <LuTriangleAlert className="text-red-500 w-6 h-6 shrink-0" />
                  <div className="space-y-1">
                    <p className="font-semibold text-lg">Anti-inflamatório</p>
                    <p className="text-muted-foreground text-sm">
                      I com I. Hífen no meio.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="A Regra da Dobradinha (R e S)"
            description="Entenda o fenômeno da duplicação consonantal após prefixos terminados em vogal."
            variant="amber"
          />

          <AlertBox tipo="info" titulo="O R e o S multiplicam-se">
            Quando a primeira palavra terminar em **Vogal** e a segunda palavra
            começar com **R** ou **S**, você não usa hífen: junta tudo e **dobra
            a letra**.
          </AlertBox>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-indigo-500/5 p-6 rounded-2xl border border-indigo-500/10 shadow-sm space-y-6">
              <h4 className="font-bold flex items-center gap-2">
                <LuCheck className="text-emerald-500" /> Vogal + R/S = Dobra
              </h4>
              <div className="space-y-3 font-mono text-sm">
                <p className="flex justify-between border-b pb-1">
                  <span>Mini + Saia</span>{" "}
                  <strong className="text-indigo-500">Minissaia</strong>
                </p>
                <p className="flex justify-between border-b pb-1">
                  <span>Anti + Social</span>{" "}
                  <strong className="text-indigo-500">Antissocial</strong>
                </p>
                <p className="flex justify-between border-b pb-1">
                  <span>Contra + Regra</span>{" "}
                  <strong className="text-indigo-500">Contrarregra</strong>
                </p>
                <p className="flex justify-between pb-1">
                  <span>Ultra + Som</span>{" "}
                  <strong className="text-indigo-500">Ultrassom</strong>
                </p>
              </div>
            </div>
            <div className="bg-amber-500/5 p-6 rounded-2xl border border-amber-500/10 shadow-sm space-y-6">
              <h4 className="font-bold flex items-center gap-2">
                <LuTriangleAlert className="text-amber-500" /> Consoante Igual =
                Hífen
              </h4>
              <div className="space-y-3 font-mono text-sm">
                <p className="flex justify-between border-b pb-1">
                  <span>Inter + Regional</span>{" "}
                  <strong className="text-amber-600">Inter-regional</strong>
                </p>
                <p className="flex justify-between border-b pb-1">
                  <span>Super + Resistente</span>{" "}
                  <strong className="text-amber-600">Super-resistente</strong>
                </p>
                <p className="flex justify-between border-b pb-1">
                  <span>Sub + Bibliotecário</span>{" "}
                  <strong className="text-amber-600">Sub-bibliotecário</strong>
                </p>
                <p className="flex justify-between pb-1">
                  <span>Hiper + Realista</span>{" "}
                  <strong className="text-amber-600">Hiper-realista</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={3}
            title="Resumo e Multimídia"
            description="Vídeos e mapas mentais para consolidar a mecânica do hífen."
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
                        title="Tudo Sobre Hífen"
                        duration="14:00"
                        thumbnail="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000&auto=format&fit=crop"
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
                        title: "Mapa Mental: Regras do Hífen",
                        type: "Mapa Mental",
                        placeholderColor: "bg-indigo-100 dark:bg-indigo-900/30",
                      },
                      {
                        title: "Tabela: Sempre Com Hífen",
                        type: "Tabela",
                        placeholderColor: "bg-red-100 dark:bg-red-900/30",
                      },
                      {
                        title: "Fluxograma: Iguais vs Diferentes",
                        type: "Diagrama",
                        placeholderColor:
                          "bg-emerald-100 dark:bg-emerald-900/30",
                      },
                      {
                        title: "Card Resumo: Exceções Perigosas",
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
                  <div className="text-center p-8 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl border border-indigo-500/10">
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      O Ímã da Concordância
                    </h3>
                    <div className="text-7xl my-8 animate-bounce">🧲 ❌ 🧲</div>
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                      "Os iguais se repelem (hífen), os diferentes se amam!"
                      Vale para quase todas as vogais e consoantes.
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
                        titulo="Pagode do Hífen"
                        artista="Prof. André"
                        capaUrl="https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1000&auto=format&fit=crop"
                        lyrics={`(Verso 1)
Ex e vice, sempre com hífen, parceiro
Pré, pró e pós, são os verdadeiros guerreiros
Pan e circum com vogal? Hífen na veia!
H no começo? Hífen sem meia!

(Refrão)
Iguais se repelem, diferentes se amam
É a lei do ímã que nunca engana!
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
            titulo="Quiz — O Desafio do Hífen"
            icone="➖"
            numero={4}
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
          />
        </section>
      </TabsContent>
      {/* =======================================================
                        MÓDULO 5: Expressões Problemáticas
                    ======================================================= */}
      <TabsContent
        value="modulo-5"
        className="space-y-12 mt-12 focus-visible:outline-none"
      >
        <ModuleBanner
          numero={5}
          titulo="Problemas Frequentes"
          descricao="Os maiores tropeços da língua testados exaustivamente em provas."
          gradiente="bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={1}
            title="Sessão de Terapia Ortográfica"
            description="Aprenda a aplicar cada um dos quatro tipos de porquê com precisão absoluta."
            variant="rose"
          />

          <AlertBox tipo="info" titulo="A Natureza dos Quatro Porquês">
            Na língua portuguesa, a escrita da palavra "porque" varia de acordo
            com o papel semântico e sintático que ela exerce na frase.
          </AlertBox>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-amber-500/10 p-6 rounded-2xl border-l-4 border-amber-500 space-y-4">
              <h4 className="text-xl font-bold text-amber-600 dark:text-amber-400">
                Por que (Separado, Sem Acento)
              </h4>
              <p className="text-muted-foreground text-sm">
                Perguntas (diretas ou indiretas) ou "pelo qual".
              </p>
              <div className="bg-card p-3 rounded-lg border border-border mt-2 font-mono text-xs">
                "Não sabemos <strong>por que</strong> o sistema caiu."
              </div>
            </div>

            <div className="bg-amber-500/10 p-6 rounded-2xl border-l-4 border-amber-500 space-y-4">
              <h4 className="text-xl font-bold text-amber-600 dark:text-amber-400">
                Porque (Junto, Sem Acento)
              </h4>
              <p className="text-muted-foreground text-sm">
                Respostas e justificativas. Equivale a <strong>"pois"</strong>.
              </p>
              <div className="bg-card p-3 rounded-lg border border-border mt-2 font-mono text-xs">
                "Caiu <strong>porque</strong> houve pico de uso."
              </div>
            </div>

            <div className="bg-orange-500/10 p-6 rounded-2xl border-l-4 border-orange-500 space-y-4">
              <h4 className="text-xl font-bold text-orange-600 dark:text-orange-400">
                Por quê (Separado, Com Acento)
              </h4>
              <p className="text-muted-foreground text-sm">
                Final de frases (antes de pontuação).
              </p>
              <div className="bg-card p-3 rounded-lg border border-border mt-2 font-mono text-xs">
                "Você não veio ontem <strong>por quê</strong>?"
              </div>
            </div>

            <div className="bg-orange-500/10 p-6 rounded-2xl border-l-4 border-orange-500 space-y-4">
              <h4 className="text-xl font-bold text-orange-600 dark:text-orange-400">
                Porquê (Junto, Com Acento)
              </h4>
              <p className="text-muted-foreground text-sm">
                Substantivo (o motivo). Geralmente com artigo.
              </p>
              <div className="bg-card p-3 rounded-lg border border-border mt-2 font-mono text-xs">
                "Gostaria de entender <strong>o porquê</strong>."
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="Opostos Que Confundem"
            description="Diferencie mal/mau e onde/aonde através da lógica gramatical simples."
            variant="rose"
          />
          <CardCarousel
            itemsPerView={2}
            titulo="Principais Confusões"
            cards={[
              {
                titulo: "MAU vs MAL",
                descricao: (
                  <div className="space-y-4 text-sm text-center mt-4">
                    <p>
                      <strong>MAU</strong> (Adjetivo) &lt;-&gt; BOM
                    </p>
                    <p>
                      <strong>MAL</strong> (Advérbio) &lt;-&gt; BEM
                    </p>
                  </div>
                ),
                icone: <LuShield />,
              },
              {
                titulo: "ONDE vs AONDE",
                descricao: (
                  <div className="space-y-4 text-sm text-center mt-4">
                    <p>
                      <strong>ONDE</strong> = Estático.
                    </p>
                    <p>
                      <strong>AONDE</strong> = Movimento (Para onde).
                    </p>
                  </div>
                ),
                icone: <LuArrowRight />,
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={3}
            title="Resumo e Multimídia"
            description="Macetes mnemônicos para nunca mais confundir os porquês, mal/mau e onde/aonde."
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
                        title="Expressões Problemáticas"
                        duration="12:00"
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
                        title: "Mapa Mental: Por que / Porque",
                        type: "Mapa Mental",
                        placeholderColor: "bg-amber-100 dark:bg-amber-900/30",
                      },
                      {
                        title: "Tabela: Mal vs Mau",
                        type: "Tabela",
                        placeholderColor: "bg-orange-100 dark:bg-orange-900/30",
                      },
                      {
                        title: "Infográfico: Onde vs Aonde",
                        type: "Infográfico",
                        placeholderColor:
                          "bg-emerald-100 dark:bg-emerald-900/30",
                      },
                      {
                        title: "Card Resumo: A fim vs Afim",
                        type: "Card",
                        placeholderColor: "bg-blue-100 dark:bg-blue-900/30",
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
                      Mal do Bem
                    </h3>
                    <div className="text-7xl my-8 animate-bounce">😈 ↔️ 😇</div>
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                      "Mal tem L como o rabo do Bem. Mau tem U como a barriga do
                      Bom. Onde eu fico. Aonde eu vou!"
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
                        titulo="Forró das Expressões"
                        artista="Prof. André"
                        capaUrl="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop"
                        lyrics={`(Verso 1)
Mal com L é oposto de Bem
Mau com U é oposto de Bom, tá?
Onde eu fico, aonde eu vou
Na prova da Petrobras não vou errar, não!

(Refrão)
Expressão que confunde, eu já decorei
Por que separado? Porque eu estudei!
                                                        `}
                      />
                    </div>
                  </div>
                ),
              },
            ]}
          />

          <QuizInterativo
            questoes={qMod5}
            titulo="Quiz — Expressões Problemáticas"
            icone="🧐"
            numero={5}
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
          />
        </section>
      </TabsContent>

      {/* =======================================================
                        MÓDULO 6: Laboratório & Revisão Integrada
                    ======================================================= */}
      <TabsContent
        value="modulo-6"
        className="space-y-12 mt-12 focus-visible:outline-none"
      >
        <ModuleBanner
          numero={6}
          titulo="Laboratório & Revisão Integrada"
          descricao="Treinamento intensivo nível Cesgranrio para a prova da Petrobras."
          gradiente="bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={1}
            title="Revisão Final (Mind Map)"
            description="Um panorama completo de toda a ortografia e acentuação em um fluxo lógico."
            variant="cyan"
          />

          <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
            <TimelineItem
              passo={1}
              titulo="Encontros Vocálicos"
              descricao="Ditongo, Tritongo e Hiato. Vogal e Semivogal."
            />
            <TimelineItem
              passo={2}
              titulo="Acentuação Base"
              descricao="Oxítonas (A,E,O,EM), Paroxítonas (R,X,N,L,PS,DITONGO) e Proparoxítonas (Todas)."
            />
            <TimelineItem
              passo={3}
              titulo="Novo Acordo"
              descricao="Adeus ao trema. Paroxítonas sem acento no EI/OI e no hiato após ditongo."
            />
            <TimelineItem
              passo={4}
              titulo="Hífen dos Opostos"
              descricao="Iguais se repelem (hífen), opostos se atraem (juntam)."
            />
            <TimelineItem
              passo={5}
              titulo="Porquês e Afins"
              descricao="Uso correto de mal/mau, onde/aonde e os porquês."
              isLast={true}
            />
          </div>

          <AlertBox tipo="success" titulo="Preparado(a) para a Prova!">
            A Ortografia e a Acentuação exigem leitura atenta e não apenas
            decoreba de regras. No simulador final abaixo, as questões misturam
            todas as regras que aprendemos nesta jornada. Boa sorte!
          </AlertBox>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="Simulado Padrão Cesgranrio"
            description="Teste seus conhecimentos com questões reais focadas na banca Petrobras."
            variant="cyan"
          />
          <QuizInterativo
            questoes={qMod6}
            titulo="Simulador Final — A Vaga é Minha"
            icone="🏆"
            numero={6}
            onComplete={(score) => handleModuleComplete("modulo-6", score)}
          />
        </section>
      </TabsContent>
    </AulaTemplate>
  );
}

// EOF
