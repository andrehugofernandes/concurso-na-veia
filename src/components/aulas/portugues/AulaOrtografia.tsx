import { getAllModuleVariants } from "@/lib/moduleColors";
"use client";
import { useAulaProgress } from "@/hooks/useAulaProgress";

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
  ModuleConsolidation,
  QuestaoResolvidaStepByStep} from "../shared";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", title: "Encontros Vocálicos e Sílabas" },
  { id: "modulo-2", label: "Módulo 2", title: "Fundamentos da Acentuação" },
  { id: "modulo-3", label: "Módulo 3", title: "O Novo Acordo" },
  { id: "modulo-4", label: "Módulo 4", title: "Grafia de Palavras (G/J, S/Z, X/CH)" },
  { id: "modulo-5", label: "Módulo 5", title: "Mal vs Mau, Onde vs Aonde, Senão" },
  { id: "modulo-6", label: "Módulo 6", title: "Uso do Porquê & Estruturas" },
  { id: "modulo-7", label: "Módulo 7", title: "Hifenização (Uso do Hífen)" },
  { id: "modulo-8", label: "Módulo 8", title: "Homônimos e Parônimos" },
  { id: "modulo-9", label: "Módulo 9", title: "Ortografia Contextual (Conectivos)" },
  { id: "modulo-10", label: "Módulo 10", title: "Lab Cesgranrio (Maratona Final)" },
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
      "Princípio Fundamental da acentuação: TODAS as proparoxítonas são acentuadas graficamente.",
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
      "Complete corretamente: 'Os técnicos agiram _____ e por isso o equipamento sofreu um _____ irreparável.'",
    opcoes: [
      { label: "A", valor: "mal / mau" },
      { label: "B", valor: "mau / mal" },
      { label: "C", valor: "mal / mal" },
      { label: "D", valor: "mau / mau" },
    ],
    correta: "A",
    explicacao:
      "Eles agiram BEM (oposto de MAL). O equipamento sofreu um BOM dano(?) Não, oposto de BOM é MAU. Logo MAL / MAU.",
  },
];

const QUIZ_MOD7_POOL: QuizQuestion[] = [
  {
    id: 701,
    pergunta: "Assinale a alternativa em que o hífen foi usado CORRETAMENTE:",
    opcoes: [
      { label: "A", valor: "Socio-econômico" },
      { label: "B", valor: "Contra-atacar" },
      { label: "C", valor: "Auto-instrução" },
      { label: "D", valor: "Micro-ondas" },
    ],
    correta: "D",
    explicacao: "Micro-ondas separa vogais iguais. Contra-atacar também. Socioeconômico e autoinstrução juntam vogais diferentes.",
  },
];

const QUIZ_MOD8_POOL: QuizQuestion[] = [
  {
    id: 801,
    pergunta: "Qual a diferença entre 'imergir' e 'emergir'?",
    opcoes: [
      { label: "A", valor: "Imergir é sair; Emergir é entrar." },
      { label: "B", valor: "Imergir é mergulhar; Emergir é vir à tona." },
      { label: "C", valor: "São sinônimos perfeitos." },
      { label: "D", valor: "Imergir é para líquidos; Emergir para gases." },
    ],
    correta: "B",
    explicacao: "Imergir (I = dentro) é mergulhar. Emergir (E = externo) é sair, vir à tona.",
  },
];

const QUIZ_MOD9_POOL: QuizQuestion[] = [
  {
    id: 901,
    pergunta: "A forma correta da locução é:",
    opcoes: [
      { label: "A", valor: "De encontro a (concordância)" },
      { label: "B", valor: "Ao encontro de (concordância)" },
      { label: "C", valor: "De encontro a (choque/oposição)" },
      { label: "D", valor: "Ao encontro de (oposição)" },
    ],
    correta: "C",
    explicacao: "De encontro a = choque, oposição. Ao encontro de = concordância, união.",
  },
];

const QUIZ_MOD10_POOL: QuizQuestion[] = [
  {
    id: 1001,
    pergunta: "Gabarito Final: Qual palavra está escrita corretamente?",
    opcoes: [
      { label: "A", valor: "Excessão" },
      { label: "B", valor: "Exceção" },
      { label: "C", valor: "Eceção" },
      { label: "D", valor: "Exseção" },
    ],
    correta: "B",
    explicacao: "Exceção se escreve com X e Ç.",
  },
];

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

const mv = [undefined, ...getAllModuleVariants()];

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
    const STORAGE_KEY_PREFIX = "petrobras_quest_aula_portugues_ortografia_";

  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}active_tab`);
      return saved || "modulo-1";
    }
    return "modulo-1";
  });

  const { completedModules: completedModulesList, updateCompletedModules } = useAulaProgress();
  const completedModules = new Set(completedModulesList);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}active_tab`, activeTab);
    }
  }, [activeTab]);

  

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
    setQMod5(getRandomQuestions(QUIZ_MOD5_POOL, 6));
    setQMod6(getRandomQuestions(QUIZ_MOD6_POOL, 6));
    setQMod7(getRandomQuestions(QUIZ_MOD7_POOL, 6));
    setQMod8(getRandomQuestions(QUIZ_MOD8_POOL, 6));
    setQMod9(getRandomQuestions(QUIZ_MOD9_POOL, 6));
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
      updateCompletedModules(Array.from(newDone));
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
      updateCompletedModules(Array.from(newSet));

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
      canComplete={completedModules.size >= MODULE_DEFS.length}
      lockMessage="Você precisa responder a todos os quizzes desta aula para finalizá-la."
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
          variant="blue"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index="INTRO"
            title="Encontros Vocálicos"
            description="A fundação da fonética: compreenda a união e a separação de sons vocálicos nas palavras."
          variant="blue"
        />

          <AlertBox tipo="info" titulo="O que são?">
            São agrupamentos de vogais e semivogais em uma mesma palavra. É o
            primeiro passo para entender a acentuação gráfica.
          </AlertBox>

          <ContentAccordion
            mode="stacked"
            titulo="Tipos de Encontros"
            icone={<LuBookOpen />}
            corIndicador="bg-amber-500"
            defaultOpen={true}
            slides={[
              {
                titulo: "1. Ditongo",
                icone: "👥",
                conteudo:(
                  <CardCarousel
                    titulo=""
                    itemsPerView={2}
                    cards={[
                      {
                        icone: <LuZap />,
                        title: "Conceito",
                        descricao:
                          "Vogal + Semivogal (ou vice-versa) na mesma sílaba. Ex: PAI, CAI-XA.",
                      },
                      {
                        icone: <LuCheck className="text-emerald-500" />,
                        title: "Crescente vs Decrescente",
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
                icone: "�",
                conteudo:(
                  <div className="p-4 bg-muted/50 rounded-xl border border-border flex items-center gap-4">
                    <div className="p-3 bg-amber-500/20 text-amber-600 rounded-lg">
                      <LuZap size={24} />
                    </div>
                    <div>
                      <p className="font-bold">SV + V + SV na mesma sílaba</p>
                      <p className="text-lg opacity-80 italic">
                        Exemplos: Pa-ra-guai, Sa-guão, En-xaguei.
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "3. Hiato",
                icone: "↔️",
                conteudo:(
                  <AlertBox tipo="warning" titulo="Não se engane!">
                    No hiato, as vogais estão juntas na palavra, mas pertencem a
                    sílabas DIFERENTES.
                    <div className="mt-2 font-mono text-lg">
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
          variant="blue"
        />
          <LessonTabs
            tabs={[
              {
                id: "video",
                label: "Vídeo Aula",
                icon:LuPlayCircle,
                content:(
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
                icon:LuBookOpen,
                content:(
                  <ModuleSummaryCarouselNew
                    moduloNome="Encontros Vocálicos"
                    tituloAula="Ortografia e Acentuação"
                    materia="Língua Portuguesa"
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
                icon:LuBrain,
                content:(
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
                icon:LuMusic,
                content:(
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
        </section>
        <section className="mt-12">
          {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A palavra 'Paraguai' apresenta qual tipo de encontro vocálico?"
          alternativas={[
            { letra: "A", texto: "Ditongo crescente", correta: false },
                { letra: "B", texto: "Ditongo decrescente", correta: false },
                { letra: "C", texto: "Tritongo (SV + V + SV)", correta: true },
                { letra: "D", texto: "Hiato", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "No tritongo, temos uma semivogal, uma vogal e outra semivogal na mesma sílaba (Pa-ra-guai)." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
            questoes={qMod1}
            titulo="QUIZ: Encontros Vocálicos e Sílabas"
            icone="🎯"
            numero={3}
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
            variant="blue"
          />
        </section>

        <ModuleConsolidation
          index={1}
          variant={mv[1] || "amber"}
          video={{
            videoId: "dQw4w9WgXcQ",
            title: "Encontros Vocálicos na Prática",
            duration: "08:00"
          }}
          resumoVisual={{
            moduloNome: "Encontros Vocálicos",
            tituloAula: "Ortografia",
            materia: "Português",
            images: [
              {
                title: "Ditongos e Hiatos",
                type: "Mapa Mental",
                placeholderColor: "bg-amber-100",
              },
              {
                title: "Tritongos e Separação",
                type: "Diagrama",
                placeholderColor: "bg-blue-100",
              },
            ],
          }}
          sinteseEstrategica={{
            title: "O Trio Parada Dura",
            content: (
              <div className="space-y-4 text-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                    <span className="text-2xl mb-2 block">🤝</span>
                    <h4 className="font-bold text-amber-700 dark:text-amber-400">Ditongo</h4>
                    <p className="text-lg text-foreground/85 leading-relaxed italic">Vogal + Semivogal (JUNTOS)</p>
                  </div>
                  <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                    <span className="text-2xl mb-2 block">✂️</span>
                    <h4 className="font-bold text-blue-700 dark:text-blue-400">Hiato</h4>
                    <p className="text-lg text-foreground/85 leading-relaxed italic">Vogal | Vogal (SEPARADOS)</p>
                  </div>
                  <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                    <span className="text-2xl mb-2 block">👨‍👩‍👦</span>
                    <h4 className="font-bold text-emerald-700 dark:text-emerald-400">Tritongo</h4>
                    <p className="text-lg text-foreground/85 leading-relaxed italic">SV + V + SV (UNIDOS)</p>
                  </div>
                </div>
                <p className="text-xl font-medium text-foreground/85 leading-relaxed">
                  Lembre-se: em divisões silábicas, <strong>HIATOS</strong> são os únicos que se separam!
                </p>
              </div>
            ),
          }}
          audio={{
            audioUrl: "#",
            titulo: "Resumo: Encontros Vocálicos",
            artista: "Prof. André",
          }}
        />
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
          variant="blue"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index="INTRO"
            title="Classificação da Sílaba Tônica"
            description="Aprenda a identificar o coração sonoro das palavras para aplicar as regras de acento."
          variant="blue"
        />

          <AlertBox tipo="info" titulo="O que é a Sílaba Tônica?">
            É a sílaba pronunciada com maior intensidade na palavra. Dependendo
            da posição dessa sílaba (contando sempre do final para o início),
            aplicamos regras de acentuação diferentes.
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-md text-lg mt-3">
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
            corIndicador="bg-blue-500"
            defaultOpen={true}
            slides={[
              {
                titulo: "1. Proparoxítonas (A Regra Imbatível)",
                icone: "👑",
                conteudo:(
                  <CardCarousel
                    titulo=""
                    itemsPerView={2}
                    cards={[
                      {
                        icone: <LuBookOpen />,
                        title: "Conceito",
                        descricao:
                          "Sílaba forte na antepenúltima. Esta é a regra mais fácil de todas, pois não possui exceções.",
                      },
                      {
                        icone: <LuZap className="text-emerald-500" />,
                        title: "A Regra",
                        descricao: (
                          <div className="text-center font-bold text-emerald-700 dark:text-emerald-400 mt-2">
                            TODAS SÃO ACENTUADAS
                          </div>
                        ),
                        corFundo: "bg-emerald-500/10",
                      },
                      {
                        icone: <LuCheck className="text-blue-500" />,
                        title: "Exemplos",
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
                conteudo:(
                  <CardCarousel
                    titulo=""
                    itemsPerView={2}
                    cards={[
                      {
                        icone: <LuBookOpen />,
                        title: "Conceito",
                        descricao:
                          "Sílaba forte na penúltima. A maioria das palavras em português são paroxítonas. Por isso, a regra geral é NÃO acentuar, exceto terminações específicas.",
                      },
                      {
                        icone: <LuTriangleAlert className="text-amber-500" />,
                        title: "A Regra Clássica",
                        descricao:
                          "Recebem acento as terminadas em L, N, R, X, PS (TúneL, PóleN, RevólveR, DúreX, FórcePS) e I(s), U(s), UM(uns), Ã(s), ÃO(s).",
                        corFundo: "bg-amber-500/10",
                      },
                      {
                        icone: <LuZap className="text-emerald-500" />,
                        title: "Princípio Fundamental (Ditongos)",
                        descricao: (
                          <div className="text-center font-bold text-emerald-700 dark:text-emerald-400 mt-2">
                            TODAS as terminadas em DITONGO ORAL ganham acento
                          </div>
                        ),
                        corFundo: "bg-emerald-500/10",
                      },
                      {
                        icone: <LuCheck className="text-blue-500" />,
                        title: "Exemplos (Ditongos)",
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
                conteudo:(
                  <CardCarousel
                    titulo=""
                    itemsPerView={2}
                    cards={[
                      {
                        icone: <LuBookOpen />,
                        title: "Conceito: Oxítonas",
                        descricao:
                          "A última sílaba é a forte. Acentuam-se em A, E, O e a nasal EM/ENS.",
                      },
                      {
                        icone: <LuCheck className="text-emerald-500" />,
                        title: "Exemplos: Oxítonas",
                        descricao: "CafÉ, PaletÓ, ArmazÉM, ParabÉNS.",
                        corFundo: "bg-emerald-500/10",
                      },
                      {
                        icone: <LuZap className="text-amber-500" />,
                        title: "Monossílabos Tônicos",
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
                conteudo:(
                  <CardCarousel
                    titulo=""
                    itemsPerView={2}
                    cards={[
                      {
                        icone: <LuBookOpen />,
                        title: "Conceituação",
                        descricao:
                          'O hiato ocorre quando duas vogais ficam em sílabas vizinhas na divisão silábica. Sempre acentue as vogais "I" e "U" dos hiatos se forem tônicas (fortes) e ficarem SOZINHAS na sílaba (ou acompanhadas de "S").',
                      },
                      {
                        icone: <LuTriangleAlert className="text-amber-500" />,
                        title: "Exceções Clássicas",
                        descricao:
                          'Não recebem acento se forem seguidas de "NH", e nem se formarem um ditongo decrescente na sílaba anterior (Nova Regra).',
                        corFundo: "bg-amber-500/10",
                      },
                      {
                        icone: <LuCheck className="text-emerald-500" />,
                        title: "Exemplos COM Acento",
                        descricao:
                          "Sa-ú-de (sozinha), E-go-ís-ta (com S), Ba-ú.",
                        corFundo: "bg-emerald-500/10",
                      },
                      {
                        icone: <LuShield className="text-red-500" />,
                        title: "Exemplos SEM Acento",
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
          variant="blue"
        />
          <LessonTabs
            tabs={[
              {
                id: "video",
                label: "Vídeo Aula",
                icon:LuPlayCircle,
                content:(
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
                icon:LuBookOpen,
                content:(
                  <ModuleSummaryCarouselNew
                    moduloNome="Fundamentos da Acentuação"
                    tituloAula="Ortografia e Acentuação"
                    materia="Língua Portuguesa"
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
                icon:LuBrain,
                content:(
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
                icon:LuMusic,
                content:(
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

        <section className="mt-12">
          {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A palavra 'Paraguai' apresenta qual tipo de encontro vocálico?"
          alternativas={[
            { letra: "A", texto: "Ditongo crescente", correta: false },
                { letra: "B", texto: "Ditongo decrescente", correta: false },
                { letra: "C", texto: "Tritongo (SV + V + SV)", correta: true },
                { letra: "D", texto: "Hiato", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "No tritongo, temos uma semivogal, uma vogal e outra semivogal na mesma sílaba (Pa-ra-guai)." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
            questoes={qMod2}
            titulo="QUIZ: Fundamentos da Acentuação"
            icone="⚡"
            numero={3}
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
            variant="blue"
          />
        </section>

        <ModuleConsolidation
          index={2}
          variant={mv[2] || "blue"}
          video={{ videoId: "dQw4w9WgXcQ", title: "Acentuação na Prática", duration: "12:00" }}
          resumoVisual={{
            moduloNome: "Acentuação", tituloAula: "Ortografia", materia: "Português",
            images: [{ title: "Mapa Mental: Acentos", type: "Mapa Mental", placeholderColor: "bg-blue-100" }]
          }}
          sinteseEstrategica={{
            title: "A Regra do Oposto",
            content: <p className="text-lg">"<strong>Paroxítonas</strong> são o oposto das <strong>Oxítonas</strong>: o que acentua uma, não acentua a outra."</p>
          }}
          audio={{ audioUrl: "#", titulo: "AudioAula: Acentuação", artista: "Prof. André" }}
        />
      </TabsContent>
      {/* ========================================================================
                        MÓDULO 3: O Novo Acordo
          ======================================================================== */}
      <TabsContent value="modulo-3" className="space-y-12 mt-12 focus-visible:outline-none">
        <ModuleBanner
          numero={3}
          titulo="O Novo Acordo"
          descricao="Aprenda o que caiu, o que mudou e o que a Cesgranrio mais cobra sobre a Nova Ortografia."
          variant={mv[3] || "blue"}
        />

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader index="INTRO" title="As Três Grandes Baixas" variant={mv[3] || "blue"} />
          <AlertBox tipo="warning" titulo="O Alvo da Banca">
            As bancas amam cobrar as palavras que <strong>perderam</strong> o acento no Novo Acordo. Palavras paroxítonas sofreram as maiores mudanças.
          </AlertBox>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FlipCard
              frente={<div className="flex flex-col items-center justify-center p-6 h-full text-center font-bold">Adeus, Trema (¨)</div>}
              verso={<div className="p-6 text-center space-y-3"><p>Abolido em português.</p><p className="line-through text-red-500">Cinquenta, Linguiça</p><p className="text-green-500 font-bold text-lg">Cinquenta, Linguiça</p></div>}
              variant={mv[3] || "blue"}
            />
            <FlipCard
              frente={<div className="flex flex-col items-center justify-center p-6 h-full text-center font-bold">Ditongos EI e OI</div>}
              verso={<div className="p-6 text-center space-y-3"><p>Perderam acento nas PAROXÍTONAS.</p><p className="line-through text-red-500">Idéia, Jibóia</p><p className="text-green-500 font-bold text-lg">Ideia, Jiboia</p></div>}
              variant={mv[3] || "blue"}
            />
            <FlipCard
              frente={<div className="flex flex-col items-center justify-center p-6 h-full text-center font-bold">Vogais Duplas</div>}
              verso={<div className="p-6 text-center space-y-3"><p>Vogais OO e EE sem acento.</p><p className="line-through text-red-500">Vôo, Lêem</p><p className="text-green-500 font-bold text-lg">Voo, Leem</p></div>}
              variant={mv[3] || "blue"}
            />
          </div>
        </section>

        <ModuleConsolidation
          index={3}
          variant={mv[3] || "blue"}
          video={{ videoId: "dQw4w9WgXcQ", title: "Novo Acordo", duration: "10:00" }}
          resumoVisual={{
            moduloNome: "Novo Acordo", tituloAula: "Ortografia", materia: "Português",
            images: [{ title: "Tabela de Mudanças", type: "Tabela", placeholderColor: "bg-blue-100" }]
          }}
          sinteseEstrategica={{
             title: "Princípio Fundamental",
             content: <p className="text-lg">"<strong>Paroxítona</strong> mudou, <strong>oxítona</strong> ficou. O trema morreu e as duplas perderam o chapéu."</p>
          }}
          audio={{ audioUrl: "#", titulo: "AudioAula: O Acordo", artista: "Prof. André" }}
        />

        <section className="mt-12">
          {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A palavra 'Paraguai' apresenta qual tipo de encontro vocálico?"
          alternativas={[
            { letra: "A", texto: "Ditongo crescente", correta: false },
                { letra: "B", texto: "Ditongo decrescente", correta: false },
                { letra: "C", texto: "Tritongo (SV + V + SV)", correta: true },
                { letra: "D", texto: "Hiato", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "No tritongo, temos uma semivogal, uma vogal e outra semivogal na mesma sílaba (Pa-ra-guai)." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
            questoes={qMod3}
            titulo="QUIZ: O Novo Acordo"
            icone="🆕"
            numero={3}
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
            variant={mv[3] || "blue"}
          />
        </section>
      </TabsContent>

      {/* ========================================================================
                        MÓDULO 4: Grafia de Palavras
          ======================================================================== */}
      <TabsContent value="modulo-4" className="space-y-12 mt-12 focus-visible:outline-none">
        <ModuleBanner
          numero={4}
          titulo="Grafia de Palavras"
          descricao="Domine de vez o uso de G/J, S/Z e X/CH. A grafia correta é a chave para a perfeição."
          variant={mv[4] || "indigo"}
        />

        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm space-y-10">
          <ModuleSectionHeader index="INTRO" title="G vs J e S vs Z" variant={mv[4] || "indigo"} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FlipCard
              frente={<div className="flex flex-col items-center justify-center p-6 h-full text-center font-bold">Verbos em -JAR</div>}
              verso={<div className="p-6 space-y-2"><p>Mantêm o J na conjugação:</p><p className="font-bold text-indigo-500">Viajar → Viajem (eles);<br/>Arranjar → Arranje;</p></div>}
              variant={mv[4] || "indigo"}
            />
            <FlipCard
              frente={<div className="flex flex-col items-center justify-center p-6 h-full text-center font-bold">Substantivos -AGEM</div>}
              verso={<div className="p-6 space-y-2"><p>Quase sempre com G:</p><p className="font-bold text-indigo-500">Viagem, Garagem, Miragem.</p><p className="text-lg text-foreground/85 leading-relaxed italic">(Exceção: Pajem)</p></div>}
              variant={mv[4] || "indigo"}
            />
          </div>
        </section>

        <ModuleConsolidation
          index={4}
          variant={mv[4] || "indigo"}
          video={{ videoId: "dQw4w9WgXcQ", title: "Grafia Visual", duration: "08:00" }}
          resumoVisual={{
            moduloNome: "Grafia", tituloAula: "Ortografia", materia: "Português",
            images: [{ title: "Mapa G vs J", type: "Mapa Mental", placeholderColor: "bg-indigo-100" }]
          }}
          sinteseEstrategica={{
            title: "Sufixos",
            content: <p className="text-lg">"Origem/Nacionalidade usa <strong>S</strong> (Holandês). Abstração/Qualidade usa <strong>Z</strong> (Rigidez)."</p>
          }}
          audio={{ audioUrl: "#", titulo: "AudioAula: Grafia", artista: "Prof. André" }}
        />

        <section className="mt-12">
          {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A palavra 'Paraguai' apresenta qual tipo de encontro vocálico?"
          alternativas={[
            { letra: "A", texto: "Ditongo crescente", correta: false },
                { letra: "B", texto: "Ditongo decrescente", correta: false },
                { letra: "C", texto: "Tritongo (SV + V + SV)", correta: true },
                { letra: "D", texto: "Hiato", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "No tritongo, temos uma semivogal, uma vogal e outra semivogal na mesma sílaba (Pa-ra-guai)." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
            questoes={qMod4}
            titulo="QUIZ: Grafia"
            icone="✍️"
            numero={4}
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
            variant={mv[4] || "indigo"}
          />
        </section>
      </TabsContent>

      <TabsContent value="modulo-5" className="space-y-12 mt-12">
        <ModuleBanner numero={5} titulo="Mal vs Mau" descricao="Opostos que derrubam candidatos." variant="blue" />
        <section className="bg-card rounded-3xl border p-8 space-y-6">
           <AlertBox tipo="warning" titulo="Mal x Mau">
              <strong>Mal:</strong> Oposto de BEM.<br/><strong>Mau:</strong> Oposto de BOM.
           </AlertBox>
        </section>
        <ModuleConsolidation 
          index={5} 
          variant="blue" 
          video={{videoId:"dQw4w9WgXcQ", title:"Opostos", duration:"05:00"}} 
          resumoVisual={{moduloNome:"Opostos", tituloAula:"Ortografia", materia:"Português", images:[{title:"Resumo", type:"Tabela", placeholderColor:"bg-rose-100"}]}}
          sinteseEstrategica={{
            title: "Macete do Lobo",
            content: <p className="text-lg">"Lobo <strong>Mau</strong> é Lobo <strong>Bom</strong> (Troque por BOM). Mal-vindo é <strong>Bem</strong>-vindo (Troque por BEM)."</p>
          }}
          audio={{ audioUrl: "#", titulo: "AudioAula: Mal vs Mau", artista: "Prof. André" }}
        />
        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A palavra 'Paraguai' apresenta qual tipo de encontro vocálico?"
          alternativas={[
            { letra: "A", texto: "Ditongo crescente", correta: false },
                { letra: "B", texto: "Ditongo decrescente", correta: false },
                { letra: "C", texto: "Tritongo (SV + V + SV)", correta: true },
                { letra: "D", texto: "Hiato", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "No tritongo, temos uma semivogal, uma vogal e outra semivogal na mesma sílaba (Pa-ra-guai)." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo questoes={qMod5} titulo="QUIZ: Opostos" icone="⚖️" numero={5} onComplete={(s) => handleModuleComplete("modulo-5", s)} variant="blue" />
      </TabsContent>

      <TabsContent value="modulo-6" className="space-y-12 mt-12">
        <ModuleBanner numero={6} titulo="Os Porquês" descricao="Regra definitiva." variant="blue" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {["Por que", "Por quê", "Porque", "Porquê"].map((p,i) => (
             <div key={i} className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center font-bold text-amber-600">{p}</div>
           ))}
        </div>
        <ModuleConsolidation 
          index={6} 
          variant="blue" 
          video={{videoId:"dQw4w9WgXcQ", title:"Os Porquês", duration:"04:00"}} 
          resumoVisual={{moduloNome:"Porquês", tituloAula:"Ortografia", materia:"Português", images:[{title:"Resumo", type:"Mapa", placeholderColor:"bg-amber-100"}]}}
          sinteseEstrategica={{
            title: "Destaque Estratégico",
            content: <div className="space-y-2"><p><strong>Por que</strong> (separado) = Pergunta.</p><p><strong>Porque</strong> (junto) = Resposta.</p></div>
          }}
          audio={{ audioUrl: "#", titulo: "AudioAula: Porquês", artista: "Prof. André" }}
        />
        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A palavra 'Paraguai' apresenta qual tipo de encontro vocálico?"
          alternativas={[
            { letra: "A", texto: "Ditongo crescente", correta: false },
                { letra: "B", texto: "Ditongo decrescente", correta: false },
                { letra: "C", texto: "Tritongo (SV + V + SV)", correta: true },
                { letra: "D", texto: "Hiato", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "No tritongo, temos uma semivogal, uma vogal e outra semivogal na mesma sílaba (Pa-ra-guai)." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo questoes={qMod6} titulo="QUIZ: Porquês" icone="❓" numero={6} onComplete={(s) => handleModuleComplete("modulo-6", s)} variant="blue" />
      </TabsContent>

      <TabsContent value="modulo-7" className="space-y-12 mt-12">
        <ModuleBanner numero={7} titulo="Uso do Hífen" descricao="Magnetismo Gráfico." variant="blue" />
        <section className="bg-card rounded-3xl border p-8 text-center space-y-4">
           <p className="text-xl font-bold">IGUAIS (-) | DIFERENTES (+)</p>
        </section>
        <ModuleConsolidation 
          index={7} 
          variant="blue" 
          video={{videoId:"dQw4w9WgXcQ", title:"Hífen", duration:"06:00"}} 
          resumoVisual={{moduloNome:"Hífen", tituloAula:"Ortografia", materia:"Português", images:[{title:"Resumo", type:"Tabela", placeholderColor:"bg-violet-100"}]}}
          sinteseEstrategica={{
            title: "Regra dos Opostos",
            content: <p className="text-lg">"Os incomuns se atraem (Sem Hífen). Os iguais se repelem (Com Hífen)."</p>
          }}
          audio={{ audioUrl: "#", titulo: "AudioAula: Hífen", artista: "Prof. André" }}
        />
        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A palavra 'Paraguai' apresenta qual tipo de encontro vocálico?"
          alternativas={[
            { letra: "A", texto: "Ditongo crescente", correta: false },
                { letra: "B", texto: "Ditongo decrescente", correta: false },
                { letra: "C", texto: "Tritongo (SV + V + SV)", correta: true },
                { letra: "D", texto: "Hiato", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "No tritongo, temos uma semivogal, uma vogal e outra semivogal na mesma sílaba (Pa-ra-guai)." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo questoes={qMod7} titulo="QUIZ: Hífen" icone="🧲" numero={7} onComplete={(s) => handleModuleComplete("modulo-7", s)} variant="blue" />
      </TabsContent>

      <TabsContent value="modulo-8" className="space-y-12 mt-12">
        <ModuleBanner numero={8} titulo="Semântica" descricao="Homônimos e Parônimos." variant="blue" />
        <ModuleConsolidation 
          index={8} 
          variant="blue" 
          video={{videoId:"dQw4w9WgXcQ", title:"Semântica", duration:"07:00"}} 
          resumoVisual={{moduloNome:"Semântica", tituloAula:"Ortografia", materia:"Português", images:[{title:"Resumo", type:"Lista", placeholderColor:"bg-emerald-100"}]}}
          sinteseEstrategica={{
            title: "Trinca da Cesgranrio",
            content: <div className="space-y-1"><p><strong>Sessão</strong> (Tempo/Cinema)</p><p><strong>Seção</strong> (Lugar/Divisão)</p><p><strong>Cessão</strong> (Dar/Ceder)</p></div>
          }}
          audio={{ audioUrl: "#", titulo: "AudioAula: Semântica", artista: "Prof. André" }}
        />
        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A palavra 'Paraguai' apresenta qual tipo de encontro vocálico?"
          alternativas={[
            { letra: "A", texto: "Ditongo crescente", correta: false },
                { letra: "B", texto: "Ditongo decrescente", correta: false },
                { letra: "C", texto: "Tritongo (SV + V + SV)", correta: true },
                { letra: "D", texto: "Hiato", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "No tritongo, temos uma semivogal, uma vogal e outra semivogal na mesma sílaba (Pa-ra-guai)." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo questoes={qMod8} titulo="QUIZ: Semântica" icone="🎭" numero={8} onComplete={(s) => handleModuleComplete("modulo-8", s)} variant="blue" />
      </TabsContent>

      <TabsContent value="modulo-9" className="space-y-12 mt-12">
        <ModuleBanner numero={9} titulo="Contexto" descricao="A fim de / Afim." variant="blue" />
        <ModuleConsolidation 
          index={9} 
          variant="blue" 
          video={{videoId:"dQw4w9WgXcQ", title:"Contexto", duration:"03:00"}} 
          resumoVisual={{moduloNome:"Contexto", tituloAula:"Ortografia", materia:"Português", images:[{title:"Resumo", type:"Card", placeholderColor:"bg-blue-100"}]}}
          sinteseEstrategica={{
            title: "A fim de",
            content: <p className="text-lg">"<strong>A fim de</strong> (separado) indica finalidade (Para). <strong>Afim</strong> (junto) indica semelhança."</p>
          }}
          audio={{ audioUrl: "#", titulo: "AudioAula: Contexto", artista: "Prof. André" }}
        />
        {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A palavra 'Paraguai' apresenta qual tipo de encontro vocálico?"
          alternativas={[
            { letra: "A", texto: "Ditongo crescente", correta: false },
                { letra: "B", texto: "Ditongo decrescente", correta: false },
                { letra: "C", texto: "Tritongo (SV + V + SV)", correta: true },
                { letra: "D", texto: "Hiato", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "No tritongo, temos uma semivogal, uma vogal e outra semivogal na mesma sílaba (Pa-ra-guai)." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo questoes={qMod9} titulo="QUIZ: Conectivos" icone="🧬" numero={9} onComplete={(s) => handleModuleComplete("modulo-9", s)} variant="blue" />
      </TabsContent>

      <TabsContent value="modulo-10" className="space-y-12 mt-12">
        <ModuleBanner numero={10} titulo="Maratona Final" descricao="Lab Cesgranrio." variant="blue" />
        <section className="mt-12">
          {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="A palavra 'Paraguai' apresenta qual tipo de encontro vocálico?"
          alternativas={[
            { letra: "A", texto: "Ditongo crescente", correta: false },
                { letra: "B", texto: "Ditongo decrescente", correta: false },
                { letra: "C", texto: "Tritongo (SV + V + SV)", correta: true },
                { letra: "D", texto: "Hiato", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "No tritongo, temos uma semivogal, uma vogal e outra semivogal na mesma sílaba (Pa-ra-guai)." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo questoes={qMod10} titulo="SIMULADO FINAL" icone="🏆" numero={10} onComplete={(s) => handleModuleComplete("modulo-10", s)} variant="blue" />
        </section>
        <ModuleConsolidation 
          index={10} 
          variant="blue" 
          video={{videoId:"dQw4w9WgXcQ", title:"Revisão", duration:"05:00"}} 
          resumoVisual={{moduloNome:"Final", tituloAula:"Ortografia", materia:"Português", images:[{title:"Checklist", type:"Card", placeholderColor:"bg-blue-200"}]}}
          sinteseEstrategica={{
            title: "Checklist de Prova",
            content: <ul className="text-left list-disc list-inside"><li>Novo Acordo?</li><li>Porquês?</li><li>Mal vs Mau?</li></ul>
          }}
          audio={{ audioUrl: "#", titulo: "AudioAula: Maratona", artista: "Prof. André" }}
        />
      </TabsContent>
    </AulaTemplate>
  );
}
