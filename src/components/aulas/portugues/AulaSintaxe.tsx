import { getAllModuleVariants } from "@/lib/moduleColors";
"use client";
import { useAulaProgress } from "@/hooks/useAulaProgress";

import { useState, useEffect, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  QuizQuestion,
  getRandomQuestions,
  AlertBox,
  VideoModal,
  ImageCarousel,
  FlipCard,
  QuizInterativo,
  TimelineItem,
  ComparisonSide,
  ModuleBanner,
  CardCarousel,
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
  QuestaoResolvidaStepByStep} from "../shared";
import {
  LuCheck,
  LuBookOpen,
  LuSearch,
  LuLayers,
  LuZap,
  LuInfo,
  LuTarget,
  LuFileText,
  LuTrophy,
  LuMusic,
  LuCirclePlay as LuPlayCircle,
  LuBrain,
  LuMessageCircle,
  LuList,
  LuClock,
  LuCrown,
  LuSmile,
  LuPlus,
  LuArrowRight,
} from "react-icons/lu";

// ── CONFIGURAÇÃO DE MÓDULOS ──────────────────────────────────────────────
const MODULE_DEFS: ModuleDef[] = [
  { id: "modulo-1", label: "Módulo 1", title: "Fundamentos e Sujeito" },
  { id: "modulo-2", label: "Módulo 2", title: "Predicação Verbal" },
  { id: "modulo-3", label: "Módulo 3", title: "Predicado e Predicativo" },
  { id: "modulo-4", label: "Módulo 4", title: "Termos Integrantes I" },
  { id: "modulo-5", label: "Módulo 5", title: "Termos Integrantes II" },
  { id: "modulo-6", label: "Módulo 6", title: "Agente da Passiva" },
  { id: "modulo-7", label: "Módulo 7", title: "Termos Acessórios I" },
  { id: "modulo-8", label: "Módulo 8", title: "Termos Acessórios II" },
  { id: "modulo-9", label: "Módulo 9", title: "Aposto e Vocativo" },
  { id: "modulo-10", label: "Módulo 10", title: "Simulado de Consolidação Final" },
];

// ── POOL DE QUESTÕES (MÓDULO 4: LABORATÓRIO) ────────────────────────────
const QUIZ_MOD1_POOL: QuizQuestion[] = [
  {
    id: 101,
    pergunta: "Na frase 'Alugam-se plataformas offshore', o sujeito é:",
    opcoes: [
      { label: "A", valor: "Indeterminado" },
      { label: "B", valor: "Plataformas offshore (Sujeito Paciente)" },
      { label: "C", valor: "Inexistente" },
      { label: "D", valor: "Oculto" },
    ],
    correta: "B",
    explicacao: "VTD (alugar) + SE (partícula apassivadora). O termo 'plataformas' é o sujeito que sofre a ação.",
  },
  {
    id: 102,
    pergunta: "Na oração 'Ocorreram graves acidentes na bacia do Pré-sal', qual o sujeito?",
    opcoes: [
      { label: "A", valor: "Graves acidentes" },
      { label: "B", valor: "Indeterminado" },
      { label: "C", valor: "A bacia do Pré-sal" },
      { label: "D", valor: "Inexistente" },
    ],
    correta: "A",
    explicacao: "O verbo 'ocorrer' é pessoal. O que ocorreu? 'Graves acidentes' (Sujeito Simples pós-posto).",
  },
];

const QUIZ_MOD2_POOL: QuizQuestion[] = [
  {
    id: 201,
    pergunta: "Em 'A Petrobras acredita no potencial do Brasil', o verbo acredita é:",
    opcoes: [
      { label: "A", valor: "VTD (Transitivo Direto)" },
      { label: "B", valor: "VTI (Transitivo Indireto)" },
      { label: "C", valor: "De ligação" },
      { label: "D", valor: "Intransitivo" },
    ],
    correta: "B",
    explicacao: "Quem acredita, acredita EM algo. A preposição 'em' (no = em+o) marca a transitividade indireta.",
  },
];

const QUIZ_MOD3_POOL: QuizQuestion[] = [
  {
    id: 301,
    pergunta: "Qual o tipo de predicado em 'Os operários trabalham felizes'?",
    opcoes: [
      { label: "A", valor: "Verbal" },
      { label: "B", valor: "Nominal" },
      { label: "C", valor: "Verbo-Nominal" },
      { label: "D", valor: "Inexistente" },
    ],
    correta: "C",
    explicacao: "Tem ação (trabalham) e estado do sujeito (felizes). Portanto, Verbo-Nominal.",
  },
];

const QUIZ_MOD4_POOL: QuizQuestion[] = [
  {
    id: 401,
    pergunta: "Em 'A Petrobras comprou novos equipamentos', o termo em negrito é:",
    opcoes: [
      { label: "A", valor: "Objeto Direto" },
      { label: "B", valor: "Objeto Indireto" },
      { label: "C", valor: "Sujeito" },
      { label: "D", valor: "Adjunto" },
    ],
    correta: "A",
    explicacao: "Comprou (o quê?) -> novos equipamentos. Ligação direta sem preposição.",
  },
];

const QUIZ_MOD5_POOL: QuizQuestion[] = [
  {
    id: 501,
    pergunta: "Assinale o Complemento Nominal:",
    opcoes: [
      { label: "A", valor: "A construção do navio demorou." },
      { label: "B", valor: "O navio de aço partiu." },
      { label: "C", valor: "Vimos o navio." },
      { label: "D", valor: "O navio é grande." },
    ],
    correta: "A",
    explicacao: "O navio é o alvo da construção (sentido passivo). Completa o substantivo abstrato 'construção'.",
  },
];

const QUIZ_MOD6_POOL: QuizQuestion[] = [
  {
    id: 601,
    pergunta: "Na frase 'O poço foi selado pela equipe', o termo sublinhado é:",
    opcoes: [
      { label: "A", valor: "Objeto Indireto" },
      { label: "B", valor: "Agente da Passiva" },
      { label: "C", valor: "Adjunto Adverbial" },
      { label: "D", valor: "Sujeito" },
    ],
    correta: "B",
    explicacao: "Na voz passiva analítica, 'pela equipe' é quem executa a ação.",
  },
];

const QUIZ_MOD7_POOL: QuizQuestion[] = QUIZ_MOD5_POOL; // Placeholder para Adjunto Adnominal
const QUIZ_MOD8_POOL: QuizQuestion[] = [
  {
    id: 801,
    pergunta: "Em 'Trabalhamos muito ontem', os termos indicam respectivamente:",
    opcoes: [
      { label: "A", valor: "Intensidade e Tempo" },
      { label: "B", valor: "Modo e Lugar" },
      { label: "C", valor: "Tempo e Causa" },
      { label: "D", valor: "Negação e Dúvida" },
    ],
    correta: "A",
    explicacao: "Muito (intensidade) e Ontem (tempo).",
  },
];
const QUIZ_MOD9_POOL: QuizQuestion[] = [
  {
    id: 901,
    pergunta: "Na frase 'André, traga os relatórios', o termo André é:",
    opcoes: [
      { label: "A", valor: "Sujeito" },
      { label: "B", valor: "Vocativo" },
      { label: "C", valor: "Aposto" },
      { label: "D", valor: "Objeto" },
    ],
    correta: "B",
    explicacao: "É um chamamento independente da estrutura oracional.",
  },
];

const QUIZ_MOD10_POOL: QuizQuestion[] = [
  ...QUIZ_MOD1_POOL.slice(0, 2),
  ...QUIZ_MOD2_POOL.slice(0, 2),
  ...QUIZ_MOD3_POOL.slice(0, 2),
]; // Simulado Arena consolidado

// ── MÓDULOS ─────────────────────────────────────────────
const QUIZ_ESSENCIAIS_POOL: QuizQuestion[] = [
  {
    id: 1,
    pergunta:
      "Na frase 'Ocorreram falhas graves na plataforma', qual o sujeito?",
    opcoes: [
      { label: "A", valor: "Plataforma" },
      { label: "B", valor: "Indeterminado" },
      { label: "C", valor: "Falhas graves" },
      { label: "D", valor: "Inexistente" },
    ],
    correta: "C",
    explicacao:
      "O verbo 'ocorrer' é pessoal. O que ocorreu? 'Falhas graves' (Sujeito Simples Pós-posto).",
  },
  {
    id: 2,
    pergunta: "Qual das orações abaixo possui Sujeito Inexistente?",
    opcoes: [
      { label: "A", valor: "Choveram elogios à equipe." },
      { label: "B", valor: "Faz anos que a Petrobras opera aqui." },
      { label: "C", valor: "Alugaram-se as salas." },
      { label: "D", valor: "Precisa-se de operários." },
    ],
    correta: "B",
    explicacao:
      "O verbo 'fazer' indicando tempo decorrido é impessoal (Sujeito Inexistente).",
  },
  {
    id: 3,
    pergunta: "Em 'Vende-se esta casa', o sujeito é:",
    opcoes: [
      { label: "A", valor: "Indeterminado" },
      { label: "B", valor: "Inexistente" },
      { label: "C", valor: "Esta casa" },
      { label: "D", valor: "Oculto" },
    ],
    correta: "C",
    explicacao:
      "VTD + SE (partícula apassivadora) = Voz Passiva Sintética. 'Esta casa' é o sujeito (Esta casa é vendida).",
  },
  {
    id: 4,
    pergunta: "Identifique o predicado na frase: 'A produção continua alta'.",
    opcoes: [
      { label: "A", valor: "Verbal" },
      { label: "B", valor: "Nominal" },
      { label: "C", valor: "Verbo-nominal" },
      { label: "D", valor: "Indeterminado" },
    ],
    correta: "B",
    explicacao:
      "'Continua' é verbo de ligação e 'alta' é predicativo do sujeito. Predicado Nominal.",
  },
  {
    id: 5,
    pergunta:
      "Na oração 'Os técnicos saíram da reunião preocupados', o predicado é:",
    opcoes: [
      { label: "A", valor: "Nominal" },
      { label: "B", valor: "Verbal" },
      { label: "C", valor: "Verbo-nominal" },
      { label: "D", valor: "Inexistente" },
    ],
    correta: "C",
    explicacao:
      "Possui verbo de ação (saíram) + predicativo do sujeito (preocupados). Predicado Verbo-Nominal.",
  },
  {
    id: 6,
    pergunta: "Qual frase aponta um Sujeito Oculto (Desinencial)?",
    opcoes: [
      { label: "A", valor: "Falaram mal do gerente." },
      { label: "B", valor: "Chegaremos no primeiro voo." },
      { label: "C", valor: "Aluga-se plataforma." },
      { label: "D", valor: "Faz calor." },
    ],
    correta: "B",
    explicacao:
      "A desinência 'mos' indica claramente o sujeito (Nós), que não está escrito, mas identificável.",
  },
  {
    id: 7,
    pergunta:
      "Em 'O juiz declarou o réu inocente', o termo 'inocente' atua como:",
    opcoes: [
      { label: "A", valor: "Predicativo do Sujeito" },
      { label: "B", valor: "Adjunto Adnominal" },
      { label: "C", valor: "Objeto Direito" },
      { label: "D", valor: "Predicativo do Objeto" },
    ],
    correta: "D",
    explicacao:
      "O estado/característica recai sobre o Objeto (réu) durante a ação transitiva - Predicativo do Objeto.",
  },
  {
    id: 8,
    pergunta: "O núcleo do Predicado Nominal é:",
    opcoes: [
      { label: "A", valor: "O verbo transitivo" },
      { label: "B", valor: "O predicativo do sujeito" },
      { label: "C", valor: "O objeto direto" },
      { label: "D", valor: "O sujeito" },
    ],
    correta: "B",
    explicacao:
      "No predicado nominal, o verbo é apenas um Elo (Verbo de Ligação), o papel de núcleo fica com o nome (estado/característica do sujeito).",
  },
];

// ── POOL DE QUESTÕES (MÓDULO 2: INTEGRANTES) ────────────────────────────
const QUIZ_INTEGRANTES_POOL: QuizQuestion[] = [
  {
    id: 201,
    pergunta: (
      <>
        Em 'A Petrobras necessita{" "}
        <u className="underline decoration-indigo-500 decoration-2 font-bold">
          de investimentos
        </u>
        ', o termo sublinhado é:
      </>
    ),
    opcoes: [
      { label: "A", valor: "Objeto Direto" },
      { label: "B", valor: "Objeto Indireto" },
      { label: "C", valor: "Complemento Nominal" },
      { label: "D", valor: "Adjunto Adnominal" },
    ],
    correta: "B",
    explicacao:
      "Quem necessita, necessita DE algo. 'Necessitar' é VTI, e 'de investimentos' é o Objeto Indireto.",
  },
  {
    id: 202,
    pergunta: "Assinale a alternativa que contém um Complemento Nominal:",
    opcoes: [
      { label: "A", valor: "O técnico consertou a máquina." },
      { label: "B", valor: "A leitura do relatório foi útil." },
      { label: "C", valor: "Gostamos de desafios." },
      { label: "D", valor: "O navio partiu cedo." },
    ],
    correta: "B",
    explicacao:
      "'Relatório' é alvo da leitura (sentido passivo) e completa o substantivo abstrato 'leitura'. Complemento Nominal.",
  },
  {
    id: 203,
    pergunta: (
      <>
        Na frase 'O contrato foi assinado{" "}
        <u className="underline decoration-indigo-500 decoration-2 font-bold">
          pelo diretor
        </u>
        ', o termo sublinhado é:
      </>
    ),
    opcoes: [
      { label: "A", valor: "Objeto Direto" },
      { label: "B", valor: "Agente da Passiva" },
      { label: "C", valor: "Sujeito" },
      { label: "D", valor: "Adjunto Adverbial" },
    ],
    correta: "B",
    explicacao:
      "Na voz passiva, o Agente da Passiva é quem pratica a ação expressa pelo verbo.",
  },
  {
    id: 204,
    pergunta: "Em 'A nomeação do gerente surpreendeu', o termo 'do gerente' é:",
    opcoes: [
      { label: "A", valor: "Adjunto Adnominal" },
      { label: "B", valor: "Complemento Nominal" },
      { label: "C", valor: "Objeto Direto" },
      { label: "D", valor: "Sujeito" },
    ],
    correta: "B",
    explicacao:
      "'O gerente' é o alvo da ação de ser nomeado (sentido passivo), portanto é Complemento Nominal.",
  },
  {
    id: 205,
    pergunta: "Em 'Tenho medo do escuro', 'do escuro' sintaticamente é:",
    opcoes: [
      { label: "A", valor: "Adjunto Adnominal" },
      { label: "B", valor: "Objeto Indireto" },
      { label: "C", valor: "Complemento Nominal" },
      { label: "D", valor: "Agente da Passiva" },
    ],
    correta: "C",
    explicacao:
      "'Medo' é substantivo abstrato, e o escuro é o ALVO do medo (sentido passivo). Logo, Complemento Nominal.",
  },
  {
    id: 206,
    pergunta:
      "Na frase 'O evento foi organizado pelos novatos', o termo 'pelos novatos' é:",
    opcoes: [
      { label: "A", valor: "Objeto Indireto" },
      { label: "B", valor: "Agente da Passiva" },
      { label: "C", valor: "Sujeito Oculto" },
      { label: "D", valor: "Adjunto Adnominal" },
    ],
    correta: "B",
    explicacao:
      "Eles praticam a ação na voz passiva (o evento foi organizado por quem?). Agente da Passiva.",
  },
];

// ── POOL DE QUESTÕES (MÓDULO 3: ACESSÓRIOS) ─────────────────────────────
const QUIZ_ACESSORIOS_POOL: QuizQuestion[] = [
  {
    id: 301,
    pergunta: (
      <>
        Na oração '
        <u className="underline decoration-indigo-500 decoration-2 font-bold">
          Ontem
        </u>
        , o navio chegou{" "}
        <u className="underline decoration-indigo-500 decoration-2 font-bold">
          ao porto
        </u>
        ', os termos sublinhados são:
      </>
    ),
    opcoes: [
      { label: "A", valor: "Objetos Indiretos" },
      { label: "B", valor: "Adjuntos Adverbiais" },
      { label: "C", valor: "Complementos Nominais" },
      { label: "D", valor: "Aposto" },
    ],
    correta: "B",
    explicacao:
      "'Ontem' (tempo) e 'ao porto' (lugar) indicam circunstâncias, logo são Adjuntos Adverbiais.",
  },
  {
    id: 302,
    pergunta: (
      <>
        Em 'Petróleo,{" "}
        <u className="underline decoration-indigo-500 decoration-2 font-bold">
          ouro negro
        </u>
        , é vital', o termo sublinhado é:
      </>
    ),
    opcoes: [
      { label: "A", valor: "Vocativo" },
      { label: "B", valor: "Aposto" },
      { label: "C", valor: "Adjunto Adnominal" },
      { label: "D", valor: "Sujeito" },
    ],
    correta: "B",
    explicacao: "O aposto explicativo explica ou detalha um termo anterior.",
  },
  {
    id: 303,
    pergunta:
      "Identifique o Vocativo na frase: 'Amanhã, pessoal, teremos folga'.",
    opcoes: [
      { label: "A", valor: "Amanhã" },
      { label: "B", valor: "Pessoal" },
      { label: "C", valor: "Teremos" },
      { label: "D", valor: "Folga" },
    ],
    correta: "B",
    explicacao:
      "Vocativo é o termo usado para chamar ou interpelar o interlocutor. Vem sempre isolado por vírgula.",
  },
  {
    id: 304,
    pergunta:
      "Qual das circunstâncias abaixo não representa um Adjunto Adverbial?",
    opcoes: [
      { label: "A", valor: "Lugar e Tempo" },
      { label: "B", valor: "Modo e Intensidade" },
      { label: "C", valor: "Posse e Matéria" },
      { label: "D", valor: "Afirmação e Dúvida" },
    ],
    correta: "C",
    explicacao:
      "Posse (livro de Maria) e Matéria (copo de vidro) ligam-se a substantivos, caracterizando Adjunto Adnominal, e não circunstâncias atreladas ao verbo.",
  },
  {
    id: 305,
    pergunta:
      "Em 'Rio de Janeiro, a capital maravilhosa, continua linda', temos um exemplo de:",
    opcoes: [
      { label: "A", valor: "Vocativo" },
      { label: "B", valor: "Aposto Explicativo" },
      { label: "C", valor: "Adjunto Adverbial de Lugar" },
      { label: "D", valor: "Sujeito Composto" },
    ],
    correta: "B",
    explicacao:
      "'a capital maravilhosa' explica e detalha o termo antecedente ('Rio de Janeiro'), vindo devidamente isolado por vírgulas.",
  },
  {
    id: 306,
    pergunta:
      "Em 'Chegamos cedo à reunião devido ao trânsito livre', a expressão 'devido ao trânsito livre' atua como:",
    opcoes: [
      { label: "A", valor: "Adjunto Adnominal" },
      { label: "B", valor: "Adjunto Adverbial de Causa" },
      { label: "C", valor: "Complemento Nominal" },
      { label: "D", valor: "Aposto" },
    ],
    correta: "B",
    explicacao:
      "Indica a circunstância de causa em que a ação de 'chegar' ocorreu.",
  },
  {
    id: 307,
    pergunta:
      "Quando o Adjunto Adverbial é deslocado para o início da frase e possui longa extensão (3 ou mais palavras), a vírgula é:",
    opcoes: [
      { label: "A", valor: "Proibida" },
      { label: "B", valor: "Facultativa sempre" },
      { label: "C", valor: "Obrigatória" },
      { label: "D", valor: "Usada apenas se for de tempo" },
    ],
    correta: "C",
    explicacao:
      "Segundo a norma-padrão e os manuais de redação mais cobrados, a vírgula para adjunto adverbial longo deslocado é obrigatória.",
  },
  {
    id: 308,
    pergunta: (
      <>
        Assinale a alternativa que contém um{" "}
        <u className="underline decoration-indigo-500 decoration-2 font-bold">
          Adjunto Adnominal
        </u>
        :
      </>
    ),
    opcoes: [
      { label: "A", valor: "O candidato resolveu as questões com pressa." },
      { label: "B", valor: "As novas diretrizes foram anunciadas." },
      { label: "C", valor: "Durante a crise, as bolsas caíram." },
      { label: "D", valor: "O diretor viajou para Brasília." },
    ],
    correta: "B",
    explicacao:
      "Em 'As novas diretrizes', os termos 'As' e 'novas' orbitam o substantivo 'diretrizes', caracterizando-os sintaticamente como adjuntos adnominais.",
  },
  {
    id: 309,
    pergunta:
      "Na oração 'Camila, a engenheira chefe, aprovou o orçamento', a expressão 'a engenheira chefe' é um:",
    opcoes: [
      { label: "A", valor: "Vocativo" },
      { label: "B", valor: "Sujeito" },
      { label: "C", valor: "Aposto Explicativo" },
      { label: "D", valor: "Adjunto Adnominal" },
    ],
    correta: "C",
    explicacao:
      "A expressão explica quem é 'Camila', por isso é cercada de vírgulas e classificada como Aposto Explicativo.",
  },
  {
    id: 310,
    pergunta:
      "Analise: 'Senhores passageiros, apertem os cintos'. O termo 'Senhores passageiros' exerce função de:",
    opcoes: [
      { label: "A", valor: "Sujeito do verbo apertar" },
      { label: "B", valor: "Vocativo" },
      { label: "C", valor: "Aposto" },
      { label: "D", valor: "Objeto Direto" },
    ],
    correta: "B",
    explicacao:
      "Trata-se de um chamamento/interpelação destinado ao receptor da mensagem, não possuindo relação sintática direta com o verbo.",
  },
  {
    id: 311,
    pergunta:
      "Sobre a diferença entre Adjunto Adnominal e Complemento Nominal, é CORRETO afirmar:",
    opcoes: [
      {
        label: "A",
        valor: "O adjunto adnominal sempre possui preposição explícita.",
      },
      {
        label: "B",
        valor: "O complemento nominal sempre completa verbo transitivo.",
      },
      {
        label: "C",
        valor:
          "Se o termo preposicionado tiver caráter AGENTE, é adjunto adnominal.",
      },
      {
        label: "D",
        valor: "O adjunto adnominal só especifica substantivos abstratos.",
      },
    ],
    correta: "C",
    explicacao:
      "Quando o termo preposicionado ligado a um substantivo abstrato pratica a ação nele expressa (ex: a defesa do advogado), trata-se de um valor ATIVO/AGENTE, logo, Adjunto Adnominal.",
  },
  {
    id: 312,
    pergunta:
      "Em 'Cortou a corda com a faca', a expressão 'com a faca' corresponde a um Adjunto Adverbial de:",
    opcoes: [
      { label: "A", valor: "Companhia" },
      { label: "B", valor: "Modo" },
      { label: "C", valor: "Meio" },
      { label: "D", valor: "Instrumento" },
    ],
    correta: "D",
    explicacao:
      "A faca foi o instrumento utilizado para realizar a ação de cortar.",
  },
  {
    id: 313,
    pergunta: "O aposto enumerativo geralmente é introduzido por:",
    opcoes: [
      { label: "A", valor: "Dois-pontos ou travessão simples" },
      { label: "B", valor: "Ponto e vírgula unicamente" },
      { label: "C", valor: "Sempre sem nenhuma pontuação antes" },
      { label: "D", valor: "Reticências" },
    ],
    correta: "A",
    explicacao:
      "Para listar os elementos explicados por um termo geral, costuma-se usar dois-pontos (ex: Comprei duas frutas: maçã e pera).",
  },
  {
    id: 314,
    pergunta:
      "Identifique o termo destacado em 'Meu carro **de corrida** bateu':",
    opcoes: [
      { label: "A", valor: "Completo Nominal" },
      { label: "B", valor: "Adjunto Adnominal (Locução Adjetiva)" },
      { label: "C", valor: "Adjunto Adverbial de Fim" },
      { label: "D", valor: "Aposto" },
    ],
    correta: "B",
    explicacao:
      "'De corrida' caracteriza o substantivo concreto 'carro', exercendo o papel sintático de Adjunto Adnominal em forma de locução adjetiva.",
  },
  {
    id: 315,
    pergunta:
      "Na frase 'Talvez a reunião termine cedo', os termos 'Talvez' e 'cedo' são, respectivamente, Adjuntos Adverbiais de:",
    opcoes: [
      { label: "A", valor: "Dúvida e Tempo" },
      { label: "B", valor: "Afirmação e Modo" },
      { label: "C", valor: "Modo e Dúvida" },
      { label: "D", valor: "Intensidade e Tempo" },
    ],
    correta: "A",
    explicacao:
      "'Talvez' demonstra incerteza da ação (dúvida), e 'cedo' expressa o momento/circunstância temporal (tempo).",
  },
];

const mv = [undefined, ...getAllModuleVariants()];

export default function AulaSintaxe({
  onComplete,
  currentProgress,
  onUpdateProgress,
  isCompleted,
  loading,
  titulo,
  descricao,
  duracao,
  materiaNome,
  materiaCor,
  materiaId,
  prevTopico,
  nextTopico,
}: AulaProps) {
    const STORAGE_KEY_PREFIX = "petrobras_quest_aula_portugues_sintaxe_";

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

  
  const [showCompletionBadge, setShowCompletionBadge] = useState(false);

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
      if (currentProgress >= 100) setShowCompletionBadge(true);
    } else if (!hasSyncedInitial && !loading && currentProgress === 0) {
      setHasSyncedInitial(true);
    }
  }, [currentProgress, hasSyncedInitial, loading]);

  const handleModuleComplete = (moduleId: string, score: number) => {
    if (score >= 70) {
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
        onComplete?.();
      }
    }
  };

  const isModuleUnlocked = useCallback((_moduleIndex: number) => {
    return true; // TEMPORÁRIO: Desbloqueado para revisão
  }, []);

  return (
    <AulaTemplate
      canComplete={completedModules.size >= MODULE_DEFS.length}
      lockMessage="Você precisa responder a todos os quizzes desta aula para finalizá-la."
      onComplete={onComplete}
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
      {/* ── MÓDULO 1: TERMOS ESSENCIAIS ───────────────────────── */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="Fundamentos e Sujeito"
          descricao="Dominando o Esqueleto da Oração: aprenda a identificar quem manda no verbo, mesmo nos labirintos da Cesgranrio."
          variant={mv[1] as any}
        />

        {/* RICH INTRO */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="A Anatomia da Oração"
            description="Entenda o Sujeito não como 'quem faz a ação', mas como 'quem o verbo obedece'."
            variant={mv[1] as any}
          />
          <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-6">
            <p>
              A <strong>Sintaxe</strong> é a parte da gramática que estuda a função das palavras dentro de uma frase. Para a <strong>CESGRANRIO</strong>, não basta saber o que é um substantivo; você precisa saber se ele é o <strong>Sujeito</strong>, o <strong>Objeto</strong> ou um mero <strong>Acessório</strong>.
            </p>
            <p>
              O <strong>Sujeito</strong> é o termo primordial. Ele é a base sobre a qual se faz uma declaração. Esqueça a definição infantil de que o sujeito é 'quem pratica a ação'. No texto técnico, o sujeito muitas vezes é passivo ou inanimado: <em>"Ocorreram falhas (sujeito) na plataforma."</em>
            </p>
            <div className="bg-indigo-500/10 border-l-4 border-indigo-500 p-6 rounded-r-2xl my-6">
              <h4 className="text-indigo-700 dark:text-indigo-400 font-bold mb-2">
                A pontos de atenção Suprema: Ordem Inversa
              </h4>
              <p className="text-indigo-800 dark:text-indigo-200">
                A banca ama colocar o verbo antes do sujeito. Se você encontrar um verbo no plural iniciando a frase, pare tudo! O sujeito provavelmente vem depois. Ex: <em>"Construirão as novas unidades de refino os engenheiros contratados."</em> Quem construirá? <strong>Os engenheiros</strong> (Sujeito).
              </p>
            </div>
            <p>
              Além disso, domine os casos de <strong>Sujeito Inexistente</strong> (verbos impessoais como HAJA no sentido de existir ou FAZ indicando tempo) e o <strong>Sujeito Indeterminado</strong>. Na Petrobras, relatórios técnicos evitam personificar erros, usando muito a indeterminação ou a voz passiva sintética.
            </p>
          </div>
        </section>

        {/* COMPONENTE INTERATIVO: TIPOS DE SUJEITO */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="Laboratório de Sujeitos"
            description="Identifique as estruturas mais comuns em provas de engenharia e administração."
            variant={mv[1] as any}
          />

          <CardCarousel
            cards={[
              {
                icone: <LuSearch className="text-indigo-500" />,
                title: "Sujeito Deslocado",
                descricao: (
                  <div className="space-y-2 text-lg">
                    <p>Vem após o verbo. Típico de orações com verbos como <em>existir, ocorrer, faltar</em>.</p>
                    <p className="text-sm italic opacity-80 mt-2 text-indigo-600">Ex: "Faltaram <strong>insumos básicos</strong> no setor."</p>
                  </div>
                ),
              },
              {
                icone: <LuZap className="text-indigo-500" />,
                title: "Partícula Apassivadora",
                descricao: (
                  <div className="space-y-2 text-lg">
                    <p>VTD + SE. Transforma o que seria objeto em sujeito paciente.</p>
                    <p className="text-sm italic opacity-80 mt-2 text-indigo-600">Ex: "Consertaram-se <strong>as válvulas</strong>." (As válvulas foram consertadas).</p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="mt-16">
          {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Na frase 'Alugam-se plataformas offshore', o sujeito é:"
          alternativas={[
            { letra: "A", texto: "Indeterminado", correta: false },
                { letra: "B", texto: "Plataformas offshore (Sujeito Paciente)", correta: true },
                { letra: "C", texto: "Inexistente", correta: false },
                { letra: "D", texto: "Oculto", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "VTD (alugar) + SE (partícula apassivadora)." },
            { titulo: "Passo 2", conteudo: "O termo 'plataformas' é o sujeito que sofre a ação." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
            questoes={getRandomQuestions(QUIZ_MOD1_POOL, 2)}
            titulo="QUIZ: Fundamentos e Sujeito"
            icone="🎯"
            numero={1}
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
            variant={mv[1] as any}
          />
        </section>
      </TabsContent>

      {/* ── MÓDULO 2: PREDICAÇÃO VERBAL ────────────────────────── */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <ModuleBanner
          numero={2}
          titulo="Predicação Verbal"
          descricao="A Dinâmica do Sentido: entenda como os verbos transitam e exigem seus complementos no radar da Petrobras."
          variant={mv[2] as any}
        />

        {/* RICH INTRO */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="A Lógica da Transitividade"
            description="Não decore verbos; entenda a relação de necessidade que eles estabelecem."
            variant={mv[2] as any}
          />
          <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-6">
            <p>
              A <strong>Transitividade Verbal</strong> é a capacidade que um verbo tem de exigir (ou não) um complemento para completar seu sentido. Na gramática da <strong>CESGRANRIO</strong>, essa relação é o alicerce para a Regência e a Crase.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
              <div className="bg-emerald-500/5 p-6 rounded-xl border border-emerald-500/20">
                <h4 className="text-emerald-700 dark:text-emerald-400 font-bold mb-3 flex items-center gap-2">
                   <LuZap /> Verbos Intransitivos (VI)
                </h4>
                <p className="text-sm">Têm sentido completo. Podem vir sozinhos ou com adjuntos (circunstâncias).</p>
                <p className="italic mt-2 text-indigo-600 dark:text-indigo-400">Ex: "O lucro <strong>caiu</strong> (ontem)."</p>
              </div>
              <div className="bg-blue-500/5 p-6 rounded-xl border border-blue-500/20">
                <h4 className="text-blue-700 dark:text-blue-400 font-bold mb-3 flex items-center gap-2">
                   <LuLayers /> Verbos Transitivos (VT)
                </h4>
                <p className="text-sm">São verbos 'incompletos'. Exigem um alvo (Objeto) para fazerem sentido.</p>
                <p className="italic mt-2 text-indigo-600 dark:text-indigo-400">Ex: "A empresa <strong>comprou</strong> (o quê?) <u>novas sondas</u>."</p>
              </div>
            </div>
            <p>
              O segredo para a prova é identificar o tipo de <strong>ponte</strong>: se o verbo se liga ao objeto diretamente (sem preposição) ou se precisa de uma preposição obrigatória (indiretamente). Prepare-se para a confusão clássica com o pronome 'LHE', que a banca adora usar como Objeto Indireto.
            </p>
          </div>
        </section>

        {/* COMPONENTE INTERATIVO: MAPA DE TRANSITIVIDADE */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="Mapa da Ponte Verbal"
            description="Diferencie as três formas de transitar no texto técnico."
            variant={mv[2] as any}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FlipCard
              frente={
                <div className="text-center">
                  <h4 className="font-bold text-lg mb-2">Transitivo Direto (VTD)</h4>
                  <p className="text-sm opacity-80">Ponte sem pedágio (Sem Preposição).</p>
                </div>
              }
              verso={
                <div className="text-center p-4">
                  <p className="font-bold mb-2">Exige Objeto Direto</p>
                  <p className="text-sm italic">Ex: "Analisei o relatório". (O quê?)</p>
                </div>
              }
              variant={mv[2] as any}
            />
            <FlipCard
              frente={
                <div className="text-center">
                  <h4 className="font-bold text-lg mb-2">Transitivo Indireto (VTI)</h4>
                  <p className="text-sm opacity-80">Ponte com pedágio (Com Preposição).</p>
                </div>
              }
              verso={
                <div className="text-center p-4">
                  <p className="font-bold mb-2">Exige Objeto Indireto</p>
                  <p className="text-sm italic">Ex: "Acredito em (preposição) você".</p>
                </div>
              }
              variant={mv[2] as any}
            />
            <FlipCard
              frente={
                <div className="text-center">
                  <h4 className="font-bold text-lg mb-2">Direto e Indireto (VTDI)</h4>
                  <p className="text-sm opacity-80">Ponte Dupla.</p>
                </div>
              }
              verso={
                <div className="text-center p-4">
                  <p className="font-bold mb-2">Dois Objetos</p>
                  <p className="text-sm italic">Ex: "Entregou o projeto ao gerente".</p>
                </div>
              }
              variant={mv[2] as any}
            />
          </div>
        </section>

        <section className="mt-16">
          {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Em 'A Petrobras acredita no potencial do Brasil', o verbo acredita é:"
          alternativas={[
            { letra: "A", texto: "VTD (Transitivo Direto)", correta: false },
                { letra: "B", texto: "VTI (Transitivo Indireto)", correta: true },
                { letra: "C", texto: "De ligação", correta: false },
                { letra: "D", texto: "Intransitivo", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Quem acredita, acredita EM algo." },
            { titulo: "Passo 2", conteudo: "A preposição 'em' (no = em+o) marca a transitividade indireta." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
            questoes={getRandomQuestions(QUIZ_MOD2_POOL, 1)}
            titulo="QUIZ: Predicação Verbal"
            icone="🔗"
            numero={2}
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
            variant={mv[2] as any}
          />
        </section>
      </TabsContent>

      {/* ── MÓDULO 3: PREDICADO E PREDICATIVO ──────────────────────── */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <ModuleBanner
          numero={3}
          titulo="Predicado e Predicativo"
          descricao="A 'Alma' da Oração: Diferencie a ação do estado e domine as atribuições de qualidade."
          variant={mv[3] as any}
        />

        {/* RICH INTRO */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="O que é o Predicado?"
            description="Tudo o que se diz sobre o sujeito, ou a própria declaração sem sujeito."
            variant={mv[3] as any}
          />
          <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-6">
            <p>
              Se o Sujeito é o "personagem", o <strong>Predicado</strong> é a "cena". Ele carrega a informação principal: ou uma ação (Verbo Significativo) ou um estado/qualidade (Verbo de Ligação + Predicativo).
            </p>
            <div className="bg-amber-500/5 p-6 rounded-xl border border-amber-500/20 my-8">
              <h4 className="text-amber-700 dark:text-amber-400 font-bold mb-4 flex items-center gap-2">
                 <LuCrown /> O Duelo de Núcleos
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <p className="font-bold border-b border-amber-500/20 pb-2 mb-2">Predicado Verbal</p>
                   <p className="text-sm">O núcleo é o <strong>Verbo</strong> de ação.</p>
                   <p className="italic text-sm opacity-80 mt-1">Ex: "A Petrobras <u>bateu</u> recordes."</p>
                </div>
                <div>
                   <p className="font-bold border-b border-amber-500/20 pb-2 mb-2">Predicado Nominal</p>
                   <p className="text-sm">O núcleo é o <strong>Predicativo</strong> (a qualidade).</p>
                   <p className="italic text-sm opacity-80 mt-1">Ex: "A equipe <u>estava</u> <strong>cansada</strong>."</p>
                </div>
              </div>
            </div>
            <p className="font-semibold text-foreground">
               ⚠️ Cesgranrio Tip: O "Predicado Verbo-Nominal" ocorre quando temos Ação + Estado ao mesmo tempo. Ex: "Os técnicos chegaram (ação) exaustos (estado)".
            </p>
          </div>
        </section>

        {/* COMPONENTE INTERATIVO: TIPOS DE PREDICADO */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="Tipos de Predicado"
            description="Identifique a essência da declaração."
            variant={mv[3] as any}
          />

            {/* NOVO MODULO 3 CORRIGIDO COM ICONE CERTO */}
          <CardCarousel
            cards={[
              {
                icone: <LuZap className="text-amber-500" />,
                title: "Verbal",
                descricao: (
                  <div className="space-y-2">
                    <p>O foco é a <strong>ação</strong>. O verbo é VTD, VTI, VTDI ou VI.</p>
                    <p className="text-xs opacity-70 italic">Ex: "A sonda perfurou o poço."</p>
                  </div>
                ),
              },
              {
                icone: <LuSmile className="text-amber-500" />,
                title: "Nominal",
                descricao: (
                  <div className="space-y-2">
                    <p>O foco é o <strong>estado</strong>. O verbo é apenas uma ponte (V. Ligação).</p>
                    <p className="text-xs opacity-70 italic">Ex: "O projeto é rentável."</p>
                  </div>
                ),
              },
              {
                icone: <LuPlus className="text-amber-500" />,
                title: "Verbo-Nominal",
                descricao: (
                  <div className="space-y-2">
                    <p><strong>Ação + Estado</strong>. Tem dois núcleos: o verbo e o nome.</p>
                    <p className="text-xs opacity-70 italic">Ex: "Os funcionários saíram satisfeitos."</p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="mt-16">
          {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Qual o tipo de predicado em 'Os operários trabalham felizes'?"
          alternativas={[
            { letra: "A", texto: "Verbal", correta: false },
                { letra: "B", texto: "Nominal", correta: false },
                { letra: "C", texto: "Verbo-Nominal", correta: true },
                { letra: "D", texto: "Inexistente", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Tem ação (trabalham) e estado do sujeito (felizes)." },
            { titulo: "Passo 2", conteudo: "Portanto, Verbo-Nominal." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
            questoes={getRandomQuestions(QUIZ_MOD3_POOL, 1)}
            titulo="QUIZ: Predicado e Predicativo"
            icone="🎭"
            numero={3}
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
            variant={mv[3] as any}
          />
        </section>
      </TabsContent>

      {/* ── MÓDULO 4: TERMOS INTEGRANTES I (OBJETOS) ────────────────── */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner
          numero={4}
          titulo="Objetos: Direto e Indireto"
          descricao="Domine os complementos que 'fecham' o sentido do verbo e aprenda o que a banca esconde."
          variant={mv[4] as any}
        />

        {/* RICH INTRO */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="O que são Complementos Verbais?"
            description="Termos que integram o sentido de verbos transitivos."
            variant={mv[4] as any}
          />
          <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-6">
            <p>
              Cuidado: Nem todo termo após o verbo é objeto! O <strong>Objeto Direto</strong> completa o verbo SEM preposição obrigatória, enquanto o <strong>Objeto Indireto</strong> EXIGE a preposição (A, DE, EM, PARA, COM).
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                 <p className="font-bold text-emerald-700 dark:text-emerald-400">Objeto Direto</p>
                 <p className="text-sm">VTD + Complemento (Sem preposição)</p>
                 <p className="italic text-xs mt-2">Ex: "A Petrobras <u>alugou</u> <strong>a plataforma</strong>."</p>
              </div>
              <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20">
                 <p className="font-bold text-amber-700 dark:text-amber-400">Objeto Indireto</p>
                 <p className="text-sm">VTI + Complemento (Com preposição)</p>
                 <p className="italic text-xs mt-2">Ex: "A empresa <u>necessita</u> <strong>de técnicos</strong>."</p>
              </div>
            </div>

            <p className="text-sm font-semibold text-rose-500">
               🚨 Foco Cesgranrio: O Objeto Direto Preposicionado. Ocorre por ênfase ou clareza. Ex: "Amei <u>a</u> Deus". O verbo amar é VTD, mas a preposição é usada por respeito.
            </p>
          </div>
        </section>

        {/* FLIPCARD: CASOS ESPECIAIS */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="Duelo de Pronomes"
            description="O/A vs LHE: O pesadelo dos candidatos."
            variant={mv[4] as any}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FlipCard
              frente={
                <div className="text-center">
                   <h4 className="font-bold text-lg mb-2">Pronomes O/A/OS/AS</h4>
                   <LuTarget className="w-10 h-10 mx-auto text-emerald-500 mb-2" />
                   <p className="text-sm">Função exclusiva.</p>
                </div>
              }
              verso={
                <div className="text-center p-4">
                   <p className="font-bold mb-2">Objeto Direto</p>
                   <p className="text-sm italic">Substituem complementos sem preposição.</p>
                   <p className="text-xs font-mono mt-2 bg-muted p-2 rounded">Ex: "Vendi a sonda" &rarr; "Vendi-a".</p>
                </div>
              }
              variant={mv[4] as any}
            />
            <FlipCard
              frente={
                <div className="text-center">
                   <h4 className="font-bold text-lg mb-2">Pronome LHE/LHES</h4>
                   <LuTarget className="w-10 h-10 mx-auto text-amber-500 mb-2" />
                   <p className="text-sm">Função exclusiva.</p>
                </div>
              }
              verso={
                <div className="text-center p-4">
                   <p className="font-bold mb-2">Objeto Indireto</p>
                   <p className="text-sm italic">Substituem complementos COM preposição (geralmente 'a' ou 'para').</p>
                   <p className="text-xs font-mono mt-2 bg-muted p-2 rounded">Ex: "Obedeço ao mestre" &rarr; "Obedeço-lhe".</p>
                </div>
              }
              variant={mv[4] as any}
            />
          </div>
        </section>

        <section className="mt-16">
          {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Em 'A Petrobras comprou novos equipamentos', o termo em negrito é:"
          alternativas={[
            { letra: "A", texto: "Objeto Direto", correta: true },
                { letra: "B", texto: "Objeto Indireto", correta: false },
                { letra: "C", texto: "Sujeito", correta: false },
                { letra: "D", texto: "Adjunto", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Comprou (o quê?) -> novos equipamentos." },
            { titulo: "Passo 2", conteudo: "Ligação direta sem preposição." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
            questoes={getRandomQuestions(QUIZ_MOD4_POOL, 2)}
            titulo="QUIZ: Objetos Verbais"
            icone="🎯"
            numero={4}
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
            variant={mv[4] as any}
          />
        </section>
      </TabsContent>

      <TabsContent value="modulo-sintese" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="Síntese Estratégica"
          descricao="Resumo visual, mapas mentais e ferramentas de fixação rápida para não esquecer mais."
          variant="blue"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader
              index="INTRO"
              title="Resumo e Multimídia"
              description="Visão panorâmica de toda a Sintaxe da Oração."
          variant="blue"
        />

            <div className="bg-rose-500/5 border border-rose-500/20 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-rose-800 dark:text-rose-300 mb-3 flex items-center gap-2">
                <LuInfo className="w-5 h-5" /> Como Extrair o Máximo da Síntese
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                Este espaço de síntese não é apenas uma revisão passiva, mas sim
                uma{" "}
                <strong>ferramenta estratégica de fixação intermodal</strong>. A
                neurociência nos ensina que o cérebro retém mais informação
                quando ela é processada de múltiplas formas. Portanto,
                recomendamos o seguinte roteiro de estudo:
              </p>
              <ul className="space-y-3 text-lg text-foreground">
                <li className="flex items-start gap-3">
                  <span className="bg-rose-500/20 text-rose-600 dark:text-rose-400 p-1.5 rounded-md mt-0.5">
                    <LuPlayCircle className="w-4 h-4" />
                  </span>
                  <div>
                    <strong>1. Vídeo Aula:</strong> Assista de forma focada para
                    resgatar a intuição e a lógica do professor por trás dos
                    conceitos sintáticos, validando seu entendimento global.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-rose-500/20 text-rose-600 dark:text-rose-400 p-1.5 rounded-md mt-0.5">
                    <LuBookOpen className="w-4 h-4" />
                  </span>
                  <div>
                    <strong>2. Resumo Visual (Mapas):</strong> Ideal para
                    consultas rápidas na véspera da prova. O design visual
                    segmenta Termos Essenciais, Integrantes e Acessórios em
                    "caixas" no seu cérebro.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-rose-500/20 text-rose-600 dark:text-rose-400 p-1.5 rounded-md mt-0.5">
                    <LuBrain className="w-4 h-4" />
                  </span>
                  <div>
                    <strong>3. Síntese Estratégica:</strong> A consolidação técnica ou atalho
                    ("orientação técnica") definitivo. Ele ancora a regra complexa a uma
                    estrutura simbólica simples de memorizar.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-rose-500/20 text-rose-600 dark:text-rose-400 p-1.5 rounded-md mt-0.5">
                    <LuMusic className="w-4 h-4" />
                  </span>
                  <div>
                    <strong>4. Áudio Resumo:</strong> Use nos chamados "tempos
                    mortos" (trânsito, academia, tarefas manuais) para repetição
                    espaçada e internalização do ritmo do conhecimento abordado.
                  </div>
                </li>
              </ul>
            </div>

            <LessonTabs
              variant="blue"
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
                          title="Sintaxe da Oração: Revisão Final"
                          duration="08:45"
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
                      moduloNome="Síntese Final"
                      tituloAula="Análise Sintática"
                      materia="Língua Portuguesa"
                      images={[
                        {
                          title: "Mapa Mental: Termos Essenciais",
                          type: "Mapa Mental",
                          placeholderColor:
                            "bg-indigo-100 dark:bg-indigo-900/30",
                        },
                        {
                          title: "Fluxograma: Regência e Vozes",
                          type: "Fluxograma",
                          placeholderColor:
                            "bg-emerald-100 dark:bg-emerald-900/30",
                        },
                        {
                          title: "Infográfico: Pontuação e Acessórios",
                          type: "Infográfico",
                          placeholderColor: "bg-amber-100 dark:bg-amber-900/30",
                        },
                      ]}
                    />
                  ),
                },
                {
                  id: "visual",
                  label: "Síntese Estratégica",
                  icon:LuBrain,
                  content:(
                    <div className="text-center p-8 bg-gradient-to-br from-violet-500/5 to-purple-500/5 rounded-2xl border border-violet-500/10">
                      <h3 className="text-xl font-bold text-foreground mb-4">
                        O Esqueleto Sintático
                      </h3>
                      <div className="text-7xl my-8 animate-pulse">
                        🦴 📐 🏗️
                      </div>
                      <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                        "Ache o verbo, procure o dono (Sujeito), veja o que ele
                        faz (Objeto) e como ele faz (Adjunto)!"
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
                          titulo="Resumo Sintaxe"
                          artista="Prof. André"
                          lyrics={`(Refrão)\nSintaxe não é bicho de sete cabeças...\nBasta você saber quem manda na peça!`}
                        />
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>
        </div>
      </TabsContent>

      {/* ── MÓDULO 5: TERMOS INTEGRANTES II (C.N.) ────────────────── */}
      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="Complemento Nominal"
          descricao="O alvo da ação nominal. Aprenda a diferenciar do adjunto e pare de errar por sentido."
          variant={mv[5] as any}
        />

        {/* RICH INTRO */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="O que é o Complemento Nominal?"
            description="O termo que completa o sentido de um NOME (substantivo, adjetivo ou advérbio)."
            variant={mv[5] as any}
          />
          <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-6">
            <p>
              Diferente do Objeto (que completa o verbo), o <strong>Complemento Nominal (CN)</strong> completa o sentido de nomes que são "transitivos" por natureza. Ele sempre vem preposicionado.
            </p>
            <div className="bg-indigo-500/5 p-6 rounded-xl border border-indigo-500/20 my-8">
               <h4 className="font-bold text-indigo-700 dark:text-indigo-400 mb-4">Exemplos Cruciais:</h4>
               <ul className="list-disc list-inside space-y-2">
                  <li><strong>Substantivo:</strong> "A construção <u>do navio</u>." (CN)</li>
                  <li><strong>Adjetivo:</strong> "Ele estava consciente <u>dos riscos</u>." (CN)</li>
                  <li><strong>Advérbio:</strong> "Mora longe <u>da refinaria</u>." (CN)</li>
               </ul>
            </div>
          </div>
        </section>

        {/* COMPARISON SIDE: CN vs AA */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="A Batalha Final: CN vs Adjunto"
            description="Princípio Fundamental que resolve 90% das questões de Sintaxe."
            variant={mv[5] as any}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
             <ComparisonSide
                tipo="incorrect"
                titulo="Adjunto Adnominal (AA) - ATIVO"
                items={[
                  "A resposta do aluno (o aluno deu a resposta)",
                  "O ataque do cão (o cão atacou)",
                  "A invenção do cientista (o cientista inventou)"
                ]}
             />
             <ComparisonSide
                tipo="correct"
                titulo="Complemento Nominal (CN) - PASSIVO"
                items={[
                  "A resposta ao teste (o teste foi respondido)",
                  "O ataque à cidade (a cidade foi atacada)",
                  "A invenção da vacina (a vacina foi inventada)"
                ]}
             />
          </div>

          <AlertBox tipo="info" titulo="Estratégia 'O Som da Petrobras'">
             Se o termo for preposicionado e estiver ligado a um <strong>Adjetivo</strong> ou <strong>Advérbio</strong>, ele é SEMPRE <strong>Complemento Nominal</strong>. A dúvida só existe com Substantivos Abstratos!
          </AlertBox>
        </section>

        <section className="mt-16">
          {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Assinale o Complemento Nominal:"
          alternativas={[
            { letra: "A", texto: "A construção do navio demorou.", correta: true },
                { letra: "B", texto: "O navio de aço partiu.", correta: false },
                { letra: "C", texto: "Vimos o navio.", correta: false },
                { letra: "D", texto: "O navio é grande.", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "O navio é o alvo da construção (sentido passivo)." },
            { titulo: "Passo 2", conteudo: "Completa o substantivo abstrato 'construção'." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
            questoes={getRandomQuestions(QUIZ_MOD5_POOL, 3)}
            titulo="QUIZ: Complemento Nominal"
            icone="🧠"
            numero={5}
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
            variant={mv[5] as any}
          />
        </section>
      </TabsContent>
      <TabsContent value="modulo-6" className="space-y-[50px]">
        <ModuleBanner
          numero={6}
          titulo="Agente da Passiva"
          descricao="O praticante da ação que fica escondido na voz passiva. Saiba quem realmente manda na oração."
          variant={mv[6] as any}
        />

        {/* RICH INTRO */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="O que é o Agente da Passiva?"
            description="O termo que indica o ser que executa a ação quando o verbo está na voz passiva."
            variant={mv[6] as any}
          />
          <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-6">
            <p>
              Na Voz Passiva, o Sujeito sofre a ação. Mas quem a pratica? O <strong>Agente da Passiva</strong>! Ele geralmente é introduzido pela preposição <strong>POR</strong> (ou suas contrações: Pelo/Pela).
            </p>
            <div className="bg-emerald-500/5 p-6 rounded-xl border border-emerald-500/20 flex flex-col items-center">
               <p className="text-sm font-bold opacity-70 mb-2">Transposição Clássica:</p>
               <div className="flex flex-col md:flex-row items-center gap-4 text-center">
                  <div className="p-3 bg-card border border-border rounded-lg shadow-sm">
                     <p className="font-bold">Ativa</p>
                     <p className="text-sm italic">O técnico perfurou o poço.</p>
                  </div>
                  <LuArrowRight className="hidden md:block w-6 h-6 text-emerald-500" />
                  <div className="p-3 bg-card border border-border rounded-lg shadow-sm font-bold text-emerald-600 dark:text-emerald-400">
                     <p>Passiva</p>
                     <p className="text-sm italic font-normal">O poço foi perfurado <strong>pelo técnico</strong>.</p>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* pontos de atenção CESGRANRIO */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="A Armadilha da Banca"
            description="Nem tudo o que brilha é ouro, nem todo verbo aceita passiva."
            variant={mv[6] as any}
          />
          
          <AlertBox tipo="danger" titulo="VTI não aceita Voz Passiva!">
             A Cesgranrio ama colocar verbos como <strong>OBEDECER</strong>, <strong>ASSISTIR</strong> ou <strong>VISAR</strong> na passiva. 
             <br/><br/>
             🚫 <u>Errado:</u> "O mestre foi obedecido pelo aluno." (Pois obedecer é VTI).
             <br/>
             ✅ <u>Correto:</u> O aluno obedeceu ao mestre.
          </AlertBox>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <FlipCard
              frente={
                <div className="text-center">
                   <h4 className="font-bold text-lg mb-2">Sujeito Paciente</h4>
                   <LuTarget className="w-10 h-10 mx-auto text-rose-500 mb-2" />
                   <p className="text-sm">O que sofre a ação.</p>
                </div>
              }
              verso={
                <div className="text-center p-4">
                   <p className="font-bold mb-2">Identificação</p>
                   <p className="text-sm italic">O termo que se torna foco na voz passiva.</p>
                   <p className="text-xs font-mono mt-2 bg-muted p-2 rounded">Ex: "O relatório foi lido".</p>
                </div>
              }
              variant={mv[6] as any}
            />
            <FlipCard
              frente={
                <div className="text-center">
                   <h4 className="font-bold text-lg mb-2">Agente da Passiva</h4>
                   <LuZap className="w-10 h-10 mx-auto text-amber-500 mb-2" />
                   <p className="text-sm">O batedor da ação.</p>
                </div>
              }
              verso={
                <div className="text-center p-4">
                   <p className="font-bold mb-2">Identificação</p>
                   <p className="text-sm italic">Sempre preposicionado (POR/DE).</p>
                   <p className="text-xs font-mono mt-2 bg-muted p-2 rounded">Ex: "... lido por nós".</p>
                </div>
              }
              variant={mv[6] as any}
            />
          </div>
        </section>

        <section className="mt-16">
          {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Na frase 'O poço foi selado pela equipe', o termo sublinhado é:"
          alternativas={[
            { letra: "A", texto: "Objeto Indireto", correta: false },
                { letra: "B", texto: "Agente da Passiva", correta: true },
                { letra: "C", texto: "Adjunto Adverbial", correta: false },
                { letra: "D", texto: "Sujeito", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Na voz passiva analítica, 'pela equipe' é quem executa a ação." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
            questoes={getRandomQuestions(QUIZ_MOD6_POOL, 2)}
            titulo="QUIZ: Agente da Passiva"
            icone="🛡️"
            numero={6}
            onComplete={(score) => handleModuleComplete("modulo-6", score)}
            variant={mv[6] as any}
          />
        </section>
      </TabsContent>
      <TabsContent value="modulo-7" className="space-y-[50px]">
        <ModuleBanner
          numero={7}
          titulo="Adjunto Adnominal"
          descricao="O acessório que 'veste' o substantivo. Saiba quem são os 5 parceiros fiéis do nome."
          variant={mv[7] as any}
        />

        {/* RICH INTRO */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="O que é o Adjunto Adnominal?"
            description="O termo que caracteriza, determina ou restringe um substantivo, tendo valor ativo."
            variant={mv[7] as any}
          />
          <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-6">
             <p>
                O <strong>Adjunto Adnominal (AA)</strong> é como um adorno: se você o retirar, a frase continua tendo sentido básico, mas perde precisão. Ele está sempre GRUDADO ao substantivo.
             </p>
             <AlertBox tipo="success" titulo="Dica para a Vida">
                O AA nunca se separa do substantivo por vírgula nem por verbo de ligação. Se houver verbo de ligação, é Predicativo!
             </AlertBox>
          </div>
        </section>

        {/* CARD CAROUSEL: AS 5 CLASSES */}
        <section>
          <CardCarousel
            titulo="As 5 Classes do Adjunto"
            subtitulo="Apenas estas 5 classes de palavras podem ser Adjunto Adnominal."
            itemsPerView={3}
            cards={[
              {
                icone: "🅰️",
                titulo: "Artigo",
                descricao: "Define ou indefine o nome.",
                exemplo: "O navio partiu.",
              },
              {
                icone: "🎭",
                titulo: "Adjetivo",
                descricao: "Atribui qualidade ou estado.",
                exemplo: "Navio petroleiro.",
              },
              {
                icone: "🔗",
                titulo: "Locução Adjetiva",
                descricao: "Preposição + Substantivo com valor de adjetivo.",
                exemplo: "Navio de guerra.",
              },
              {
                icone: "🔢",
                titulo: "Numeral",
                descricao: "Indica quantidade ou ordem.",
                exemplo: "Dois navios.",
              },
              {
                icone: "👈",
                titulo: "Pronome Adjetivo",
                descricao: "Acompanha o substantivo.",
                exemplo: "Este navio.",
              },
            ]}
          />
        </section>

        <section className="mt-16">
          {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Em 'Trabalhamos muito ontem', os termos indicam respectivamente:"
          alternativas={[
            { letra: "A", texto: "Intensidade e Tempo", correta: true },
                { letra: "B", texto: "Modo e Lugar", correta: false },
                { letra: "C", texto: "Tempo e Causa", correta: false },
                { letra: "D", texto: "Negação e Dúvida", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Muito (intensidade) e Ontem (tempo)." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
            questoes={getRandomQuestions(QUIZ_MOD7_POOL, 2)}
            titulo="QUIZ: Adjunto Adnominal"
            icone="👗"
            numero={7}
            onComplete={(score) => handleModuleComplete("modulo-7", score)}
            variant={mv[7] as any}
          />
        </section>
      </TabsContent>
      <TabsContent value="modulo-8" className="space-y-[50px]">
        <ModuleBanner
          numero={8}
          titulo="Adjunto Adverbial"
          descricao="As ferramentas de contexto da frase. Domine as circunstâncias e as regras de vírgula."
          variant={mv[8] as any}
        />

        {/* RICH INTRO */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="O que é o Adjunto Adverbial?"
            description="O termo que indica circunstância, modificando verbo, adjetivo ou outro advérbio."
            variant={mv[8] as any}
          />
          <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-6">
             <p>
                O <strong>Adjunto Adverbial (Adv)</strong> é quem responde: <u>Onde</u>? <u>Quando</u>? <u>Como</u>? <u>Por que</u>? Embora acessório, ele é fundamental para situar a informação no tempo e no espaço.
             </p>
             <AlertBox tipo="warning" titulo="Sintaxe + Pontuação">
                Se o Adjunto Adverbial for <strong>curto</strong> e estiver deslocado, a vírgula é FACULTATIVA. Se for <strong>longo</strong> (geralmente 3+ palavras), a vírgula é OBRIGATÓRIA segundo a maioria dos manuais seguidos pela banca.
             </AlertBox>
          </div>
        </section>

        {/* CARD CAROUSEL: CIRCUNSTÂNCIAS */}
        <section>
          <CardCarousel
            titulo="Principais Circunstâncias"
            subtitulo="A Cesgranrio costuma perguntar o sentido do adjunto na frase."
            itemsPerView={3}
            cards={[
              {
                icone: "⏰",
                titulo: "Tempo",
                descricao: "Indica o momento da ação.",
                exemplo: "Trabalhei ontem.",
              },
              {
                icone: "📍",
                titulo: "Lugar",
                descricao: "Indica o local da ocorrência.",
                exemplo: "Moro na refinaria.",
              },
              {
                icone: "🏎️",
                titulo: "Modo",
                descricao: "Indica a maneira como se agiu.",
                exemplo: "Estudo com afinco.",
              },
              {
                icone: "🔥",
                titulo: "Intensidade",
                descricao: "Reforça o sentido do termo.",
                exemplo: "Gostei muito do curso.",
              },
              {
                icone: "❓",
                titulo: "Causa",
                descricao: "Indica o motivo.",
                exemplo: "Morreu de frio.",
              },
            ]}
          />
        </section>

        <section className="mt-16">
          {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Em 'Trabalhamos muito ontem', os termos indicam respectivamente:"
          alternativas={[
            { letra: "A", texto: "Intensidade e Tempo", correta: true },
                { letra: "B", texto: "Modo e Lugar", correta: false },
                { letra: "C", texto: "Tempo e Causa", correta: false },
                { letra: "D", texto: "Negação e Dúvida", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "Muito (intensidade) e Ontem (tempo)." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
            questoes={getRandomQuestions(QUIZ_MOD8_POOL, 2)}
            titulo="QUIZ: Adjunto Adverbial"
            icone="⌚"
            numero={8}
            onComplete={(score) => handleModuleComplete("modulo-8", score)}
            variant={mv[8] as any}
          />
        </section>
      </TabsContent>
      <TabsContent value="modulo-9" className="space-y-[50px]">
        <ModuleBanner
          numero={9}
          titulo="Aposto e Vocativo"
          descricao="Explicação versus Chamamento. Entenda quem isola quem e por que a vírgula é sua melhor amiga aqui."
          variant={mv[9] as any}
        />

        {/* RICH INTRO */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-8">
          <ModuleSectionHeader
            index="INTRO"
            title="Aposto vs Vocativo"
            description="Dois termos que adoram vírgulas, mas têm funções totalmente distintas."
            variant={mv[9] as any}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
             <div className="bg-muted/40 p-6 rounded-xl border border-border">
                <h4 className="font-bold mb-3">O Aposto (Explica)</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                   Tem relação sintática com um termo da oração. Sua função é explicar, resumir ou especificar um nome.
                </p>
                <p className="text-xs font-mono mt-4 text-emerald-600 bg-emerald-500/5 p-2 rounded">Ex: "João, <strong>o engenheiro</strong>, chegou."</p>
             </div>
             <div className="bg-muted/40 p-6 rounded-xl border border-border">
                <h4 className="font-bold mb-3">O Vocativo (Chama)</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                   Não possui relação sintática com os outros termos. É um chamamento isolado, um apelo ao interlocutor.
                </p>
                <p className="text-xs font-mono mt-4 text-rose-600 bg-rose-500/5 p-2 rounded">Ex: "<strong>Sr. Engenheiro</strong>, chegue aqui!"</p>
             </div>
          </div>
        </section>

        {/* ALERT: APOSTO ESPECIFICATIVO */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm">
           <AlertBox tipo="danger" titulo="Aposto Especificativo: O Inimigo das Vírgulas">
              Cuidado! O <strong>Aposto Especificativo</strong> NÃO vem entre vírgulas. Ele identifica o nome próprio do ser.
              <br/><br/>
              🚫 <u>Errado:</u> "A cidade, de Macaé, é polo."
              <br/>
              ✅ <u>Correto:</u> A cidade <strong>de Macaé</strong> é polo. (Macaé especifica qual cidade).
           </AlertBox>
        </section>

        <section className="mt-16">
          {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Na frase 'André, traga os relatórios', o termo André é:"
          alternativas={[
            { letra: "A", texto: "Sujeito", correta: false },
                { letra: "B", texto: "Vocativo", correta: true },
                { letra: "C", texto: "Aposto", correta: false },
                { letra: "D", texto: "Objeto", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "É um chamamento independente da estrutura oracional." },
            { titulo: "Passo 2", conteudo: "Análise da alternativa correta com base no contexto." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
            questoes={getRandomQuestions(QUIZ_MOD9_POOL, 2)}
            titulo="QUIZ: Aposto e Vocativo"
            icone="🗣️"
            numero={9}
            onComplete={(score) => handleModuleComplete("modulo-9", score)}
            variant={mv[9] as any}
          />
        </section>
      </TabsContent>
      <TabsContent value="modulo-10" className="space-y-[50px]">
        <ModuleBanner
          numero={10}
          titulo="Simulado de Consolidação Final"
          descricao="O grande teste. Questões de alto nível filtradas pela Petrobras Quest para garantir sua aprovação."
          variant={mv[2] as any} /* Usando variante 2 para destaque */
        />

        {/* ARENA INTRO */}
        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm text-center space-y-6">
           <LuCrown className="w-16 h-16 mx-auto text-amber-500 animate-bounce" />
           <h3 className="text-2xl font-bold">Você chegou ao Desafio Final!</h3>
           <p className="text-muted-foreground prose prose-lg mx-auto">
              Sintaxe é a base da Gramática. Se você domina a relação entre os termos do período simples, está pronto para encarar o período composto e a concordância verbal. Desejamos sucesso em sua avaliação!
           </p>
        </section>

        <section className="mt-16">
          {/* ★ QUESTÃO RESOLVIDA PASSO A PASSO */}
        <QuestaoResolvidaStepByStep
          index={2}
          titulo="Na Prática: Como a Banca Cobra"
          variant="blue"
          banca="CESGRANRIO"
          ano="2024"
          concurso="Processo Seletivo Petrobras"
          enunciado="Na frase 'Alugam-se plataformas offshore', o sujeito é:"
          alternativas={[
            { letra: "A", texto: "Indeterminado", correta: false },
                { letra: "B", texto: "Plataformas offshore (Sujeito Paciente)", correta: true },
                { letra: "C", texto: "Inexistente", correta: false },
                { letra: "D", texto: "Oculto", correta: false }
          ]}
          passos={[
            { titulo: "Passo 1", conteudo: "VTD (alugar) + SE (partícula apassivadora)." },
            { titulo: "Passo 2", conteudo: "O termo 'plataformas' é o sujeito que sofre a ação." },
            { titulo: "Passo 3", conteudo: "Gabarito confirmado." }
          ]}
        />
        <QuizInterativo
            questoes={getRandomQuestions(QUIZ_MOD10_POOL, 5)}
            titulo="SIMULADO DE SÍNTESE: Sintaxe Completa"
            icone="⚔️"
            numero={10}
            onComplete={(score) => handleModuleComplete("modulo-10", score)}
            variant={mv[2] as any}
          />
        </section>
      </TabsContent>
    </AulaTemplate>
  );
}








