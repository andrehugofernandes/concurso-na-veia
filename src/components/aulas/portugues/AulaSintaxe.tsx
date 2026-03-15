"use client";

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
} from "../shared";
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
} from "react-icons/lu";

// ── CONFIGURAÇÃO DE MÓDULOS ──────────────────────────────────────────────
const MODULE_DEFS: ModuleDef[] = [
  { id: "modulo-1", label: "Módulo 1", title: "Termos Essenciais" },
  { id: "modulo-2", label: "Módulo 2", title: "Termos Integrantes" },
  { id: "modulo-3", label: "Módulo 3", title: "Termos Acessórios" },
  { id: "modulo-4", label: "Módulo 4", title: "Lab. Cesgranrio" },
  { id: "modulo-5", label: "Módulo 5", title: "Síntese" },
];

// ── POOL DE QUESTÕES (MÓDULO 4: LABORATÓRIO) ────────────────────────────
const QUIZ_LABORATORIO_POOL: QuizQuestion[] = [
  {
    id: 401,
    pergunta:
      "Assinale a alternativa em que o termo em destaque exerce a função de Complemento Nominal:",
    opcoes: [
      { label: "A", valor: "A confiança do mercado na Petrobras é alta." },
      { label: "B", valor: "O técnico reparou o duto de óleo." },
      { label: "C", valor: "O navio de carga partiu ontem." },
      { label: "D", valor: "A decisão do gerente foi acertada." },
    ],
    correta: "A",
    explicacao:
      "'Na Petrobras' completa o substantivo abstrato 'confiança'. Confiança em quê? Na Petrobras (sentido passivo/alvo).",
  },
  {
    id: 402,
    pergunta:
      "Observe: 'Alugam-se plataformas offshore'. O sujeito desta oração é:",
    opcoes: [
      { label: "A", valor: "Indeterminado" },
      { label: "B", valor: "Plataformas offshore" },
      { label: "C", valor: "Inexistente" },
      { label: "D", valor: "Oculto" },
    ],
    correta: "B",
    explicacao:
      "VTD (alugar) + SE (partícula apassivadora). 'Plataformas offshore' é o sujeito paciente (são alugadas).",
  },
  {
    id: 403,
    pergunta:
      "Na frase 'Construirá o poço a nova diretoria', a função sintática de 'a nova diretoria' é:",
    opcoes: [
      { label: "A", valor: "Objeto Direto" },
      { label: "B", valor: "Sujeito Simples" },
      { label: "C", valor: "Objeto Indireto" },
      { label: "D", valor: "Complemento Nominal" },
    ],
    correta: "B",
    explicacao:
      "Ordem indireta clássica da Cesgranrio. O que/Quem construirá o poço? A nova diretoria (Sujeito posposto ao verbo).",
  },
  {
    id: 404,
    pergunta:
      "Em 'Entregou o relatório ao gerente de operações', os complementos verbais são, respectivamente:",
    opcoes: [
      { label: "A", valor: "Objeto Direto e Objeto Direto Preposicionado" },
      { label: "B", valor: "Objeto Indireto e Objeto Direto" },
      { label: "C", valor: "Objeto Direto e Objeto Indireto" },
      { label: "D", valor: "Objeto Indireto e Adjunto Adverbial" },
    ],
    correta: "C",
    explicacao:
      "O verbo 'entregar' é VTDI (transitivo direto e indireto). O relatório é a coisa entregue (Objeto Direto) e o gerente é a quem se entrega (Objeto Indireto, com preposição 'a').",
  },
  {
    id: 405,
    pergunta:
      "Identifique o predicativo do sujeito em 'Os petroleiros voltaram exaustos da plataforma':",
    opcoes: [
      { label: "A", valor: "Petroleiros" },
      { label: "B", valor: "Voltaram" },
      { label: "C", valor: "Exaustos" },
      { label: "D", valor: "Da plataforma" },
    ],
    correta: "C",
    explicacao:
      "Trata-se de um Predicado Verbo-Nominal. 'Voltaram' indica ação e 'exaustos' indica o estado/característica do sujeito ('petroleiros') no momento da ação.",
  },
  {
    id: 406,
    pergunta: "Há objeto direto preposicionado na seguinte alternativa:",
    opcoes: [
      { label: "A", valor: "Acredito em você." },
      { label: "B", valor: "Mataram a cobra com o machado." },
      { label: "C", valor: "Amei a Deus sobre todas as coisas." },
      { label: "D", valor: "Lutei contra as dificuldades." },
    ],
    correta: "C",
    explicacao:
      "Quem ama, ama alguém (VTD). A inserção da preposição 'a' antes do objeto direto ('Deus') ocorre por questões estilísticas, culturais ou para evitar ambiguidade (Objeto Direto Preposicionado).",
  },
  {
    id: 407,
    pergunta:
      "Em 'A Petrobras tem orgulho **de seus funcionários**', a expressão destacada atua como:",
    opcoes: [
      { label: "A", valor: "Adjunto Adnominal" },
      { label: "B", valor: "Objeto Indireto" },
      { label: "C", valor: "Agente da Passiva" },
      { label: "D", valor: "Complemento Nominal" },
    ],
    correta: "D",
    explicacao:
      'A expressão "de seus funcionários" está completando o sentido do substantivo abstrato "orgulho" (quem tem orgulho, tem orgulho de algo). Portanto, é Complemento Nominal.',
  },
  {
    id: 408,
    pergunta: "Qual das orações abaixo NÃO apresenta sujeito indeterminado?",
    opcoes: [
      { label: "A", valor: "Precisa-se de novos recursos." },
      { label: "B", valor: "Vendem-se apartamentos mobiliados." },
      { label: "C", valor: "Falaram mal do projeto na reunião." },
      { label: "D", valor: "Vive-se melhor no interior." },
    ],
    correta: "B",
    explicacao:
      "Em 'Vendem-se apartamentos', o VTD + SE caracteriza voz passiva sintética, em que 'apartamentos mobiliados' assume o papel sintático de sujeito paciente do verbo vender.",
  },
  {
    id: 409,
    pergunta:
      "Assinale a alternativa onde o pronome oblíquo exerce função de Objeto Indireto:",
    opcoes: [
      { label: "A", valor: "O professor o chamou à sala." },
      { label: "B", valor: "Comprei-o ontem na feira." },
      { label: "C", valor: "Desejou-lhe muito sucesso." },
      { label: "D", valor: "Nós o acompanhamos até o portão." },
    ],
    correta: "C",
    explicacao:
      "O pronome 'LHE' substitui construções preposicionadas ('a ele', 'para ele'). Ele atua quase exclusivamente como Objeto Indireto. Os pronomes o, a, os, as são exclusividade do Objeto Direto.",
  },
  {
    id: 410,
    pergunta:
      "Em 'Na manhã daquela terça-feira, a sonda iniciou o processo suavemente', a palavra 'suavemente' é classificável como:",
    opcoes: [
      { label: "A", valor: "Predicativo do Sujeito" },
      { label: "B", valor: "Aposto" },
      { label: "C", valor: "Adjunto Adverbial de Modo" },
      { label: "D", valor: "Adjunto Adnominal" },
    ],
    correta: "C",
    explicacao:
      "Indica o modo, a circunstância ou a forma particular em que a ação ('iniciou') ocorreu. Todo sufixo '-mente' tende a formar advérbios de modo.",
  },
];

// ── POOL DE QUESTÕES (MÓDULO 1: ESSENCIAIS) ─────────────────────────────
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
  const [activeTab, setActiveTab] = useState("modulo-1");
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set(),
  );
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
      setCompletedModules(newDone);
      setHasSyncedInitial(true);
      if (currentProgress >= 100) setShowCompletionBadge(true);
    } else if (!hasSyncedInitial && !loading && currentProgress === 0) {
      setHasSyncedInitial(true);
    }
  }, [currentProgress, hasSyncedInitial, loading]);

  const handleModuleComplete = (moduleId: string, score: number) => {
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
          titulo="O Esqueleto da Oração"
          descricao="Dominando o Sujeito e o Predicado sob a ótica da Cesgranrio. O ponto de partida de toda análise sintática."
          gradiente="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-600"
        />
        <div className="space-y-[50px]">
          {/* 1. Fundamentação Científica */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Anatomia da Oração"
              description="Aprenda a identificar a estrutura básica da oração: o sujeito e o predicado."
              variant="indigo"
            />

            <AlertBox tipo="info" titulo="O Princípio da Dependência">
              A sintaxe (do grego <i>syntáxis</i>, ordem/arranjo) estuda as
              relações de dependência entre as palavras. Na língua portuguesa, a
              oração é um organismo vivo onde cada termo desempenha uma função
              vital.
            </AlertBox>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <LuTarget className="text-indigo-500" /> O Sujeito
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  É o termo sobre o qual se faz uma declaração e com o qual o
                  verbo <b>concorda</b>. A Cesgranrio adora sujeitos deslocados
                  (após o verbo) para induzir ao erro.
                </p>
                <div className="space-y-3">
                  <div className="bg-muted/50 p-3 rounded-lg border-l-4 border-indigo-500 text-sm">
                    <p className="font-bold">1. Simples (Deslocado):</p>
                    <p className="italic">
                      "Ocorreram <b>falhas</b> no sistema."
                    </p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg border-l-4 border-indigo-500 text-sm">
                    <p className="font-bold">2. Composto:</p>
                    <p className="italic">
                      "<b>Petróleo e gás</b> movem o país."
                    </p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg border-l-4 border-indigo-500 text-sm">
                    <p className="font-bold">3. Oculto (Desinencial):</p>
                    <p className="italic">
                      "(Nós) <b>Concluímos</b> o relatório."
                    </p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg border-l-4 border-indigo-500 text-sm">
                    <p className="font-bold">4. Indeterminado:</p>
                    <p className="italic">
                      "<b>Precisa-se</b> de técnicos."
                    </p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg border-l-4 border-indigo-500 text-sm">
                    <p className="font-bold">5. Inexistente:</p>
                    <p className="italic">
                      "<b>Há</b> muitos desafios aqui."
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <LuZap className="text-amber-500" /> O Predicado
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  É tudo aquilo que se declara sobre o sujeito. Ele pode focar
                  na <b>ação</b> (verbal), no <b>estado</b> (nominal) ou em
                  ambos (verbo-nominal).
                </p>
                <div className="space-y-3">
                  <div className="bg-muted/50 p-3 rounded-lg border-l-4 border-amber-500 text-sm">
                    <p className="font-bold">1. Verbal (Ação):</p>
                    <p className="italic">
                      "O motor <b>parou</b> de repente."
                    </p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg border-l-4 border-amber-500 text-sm">
                    <p className="font-bold">2. Nominal (Estado):</p>
                    <p className="italic">
                      "A situação <b>parece crítica</b>."
                    </p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg border-l-4 border-amber-500 text-sm">
                    <p className="font-bold">3. Verbo-Nominal (Misto):</p>
                    <p className="italic">
                      "O navio <b>partiu atrasado</b>."
                    </p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg border-l-4 border-amber-500 text-sm">
                    <p className="font-bold">4. Nominal (Substantivo):</p>
                    <p className="italic">
                      "O diretor <b>é um mestre</b>."
                    </p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg border-l-4 border-amber-500 text-sm">
                    <p className="font-bold">5. V-N (Estado do Objeto):</p>
                    <p className="italic">
                      "Julgaram o réu <b>culpado</b>."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. O Mapa do Sujeito */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={2}
              title="Tipologia do Sujeito"
              description="Explore os diferentes tipos de sujeito e como a Cesgranrio cobra a identificação do termo principal."
              variant="indigo"
            />
            <p className="text-muted-foreground">
              O mapa completo para nunca mais errar a identificação do termo
              principal da oração.
            </p>

            <div className="space-y-4">
              <ContentAccordion
                titulo="Sujeito Simples e Composto"
                icone={<LuSearch className="w-6 h-6" />}
                corIndicador="bg-blue-500"
                slides={[
                  {
                    titulo: "Sujeito Simples e Composto",
                    icone: "🎯",
                    conteudo:(
                      <div className="space-y-6">
                        <p className="text-base text-muted-foreground leading-relaxed">
                          A classificação entre sujeito simples e composto se
                          apoia unicamente na quantidade de <b>núcleos</b> que o
                          formam. O <b>núcleo</b> é a palavra base da estrutura
                          (geralmente um substantivo ou pronome sem preposição).
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-green-500/10 p-5 rounded-xl border border-green-500/30">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="w-6 h-6 bg-green-500/20 text-green-700 dark:text-green-400 rounded-md flex items-center justify-center font-bold text-sm">
                                1
                              </span>
                              <p className="font-bold text-green-800 dark:text-green-300">
                                Sujeito Simples (Único Núcleo)
                              </p>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                              Mesmo que a palavra esteja no plural, se for
                              apenas uma palavra central ditando a concordância,
                              o sujeito é simples.
                            </p>
                            <ul className="space-y-2 text-sm text-foreground">
                              <li className="flex gap-2">
                                <span className="text-green-500">✓</span> "A{" "}
                                <b>produção</b> subiu 10% hoje."
                              </li>
                              <li className="flex gap-2">
                                <span className="text-green-500">✓</span> "Os
                                velhos <b>dutos</b> rompiam com o tempo."
                                (Atenção: está no plural, mas o núcleo continua
                                único).
                              </li>
                            </ul>
                          </div>
                          <div className="bg-blue-500/10 p-5 rounded-xl border border-blue-500/30">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="w-6 h-6 bg-blue-500/20 text-blue-700 dark:text-blue-400 rounded-md flex items-center justify-center font-bold text-sm">
                                +
                              </span>
                              <p className="font-bold text-blue-800 dark:text-blue-300">
                                Sujeito Composto (2 ou mais Núcleos)
                              </p>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                              Formado por mais de um termo independente e não
                              preposicionado ligados, normalmente, por conjunção
                              (e, nem).
                            </p>
                            <ul className="space-y-2 text-sm text-foreground">
                              <li className="flex gap-2">
                                <span className="text-blue-500">✓</span> "O{" "}
                                <b>diretor</b> e o <b>gerente</b> chegaram."
                              </li>
                              <li className="flex gap-2">
                                <span className="text-blue-500">✓</span> "Nem o{" "}
                                <b>sol</b> nem a <b>chuva</b> o desanimavam."
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ),
                    exemplo:
                      "Atenção Cesgranrio: O núcleo do sujeito NUNCA vem acompanhado de preposição (a, de, em, para, com)! Termos preposicionados são anexos ou complementos, jamais as entidades que comandam o verbo.",
                  },
                ]}
              />

              <ContentAccordion
                titulo="Sujeito Inexistente (Impessoal)"
                icone={<LuSearch className="w-6 h-6" />}
                corIndicador="bg-rose-500"
                slides={[
                  {
                    titulo: "Sujeito Inexistente (Impessoal)",
                    icone: "🚫",
                    conteudo:(
                      <div className="space-y-6">
                        <p className="text-base text-muted-foreground leading-relaxed">
                          A oração sem sujeito ocorre com os{" "}
                          <b>verbos impessoais</b>. Como não há ser vivo, objeto
                          ou ideia conjugando o verbo na oração, o verbo
                          permanece inalteravelmente congelado na 3ª pessoa do
                          singular (regra de ouro para a Cesgranrio).
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-rose-500/5 p-4 rounded-xl border border-border border-l-4 border-l-rose-500">
                            <p className="font-bold text-foreground mb-2 flex items-center gap-2">
                              🔄 O Temutável Verbo Haver
                            </p>
                            <p className="text-sm text-muted-foreground mb-3">
                              Somente quando estiver empregado com sentido de{" "}
                              <b>existir</b>, <b>ocorrer</b> ou indicando{" "}
                              <b>tempo passado</b>. Ficará no singular.
                            </p>
                            <p className="text-sm font-medium italic mb-2">
                              "Houve problemas na tubulação."
                            </p>
                            <p className="text-sm font-medium italic">
                              "Há muitos anos não os vejo."
                            </p>
                          </div>
                          <div className="space-y-4">
                            <div className="bg-amber-500/5 p-4 rounded-xl border border-border border-l-4 border-l-amber-500">
                              <p className="font-bold text-foreground mb-2 flex items-center gap-2">
                                ⏱️ Verbo Fazer e Ir
                              </p>
                              <p className="text-sm text-muted-foreground mb-2">
                                Quando determinam tempo cronológico ou
                                meteorológico.
                              </p>
                              <p className="text-sm font-medium italic mb-1">
                                "Fazia dias frios." (nunca "Faziam")
                              </p>
                              <p className="text-sm font-medium italic">
                                "Vai para três anos que operamos aqui."
                              </p>
                            </div>
                            <div className="bg-purple-500/5 p-4 rounded-xl border border-border border-l-4 border-l-purple-500">
                              <p className="font-bold text-foreground mb-2 flex items-center gap-2">
                                🌩️ Fenômenos da Natureza
                              </p>
                              <p className="text-sm text-muted-foreground mb-2">
                                Sentido real denotativo. (Em sentido figurado,
                                eles têm sujeito).
                              </p>
                              <p className="text-sm font-medium italic mb-1">
                                "Ventou muito no oceano."
                              </p>
                              <p className="text-sm font-medium italic mb-1">
                                "Garoava durante o embarque."
                              </p>
                              <p className="text-sm font-medium italic">
                                "Amanheceu com muita neblina."
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ),
                    exemplo:
                      "⚠️ CUIDADO: Se o verbo 'haver' for trocado por 'existir', lembre-se: o verbo existir é NORMAL e pessoal! Portanto as trocas forçam a concordância -> 'Existiam problemas' (plural).",
                  },
                ]}
              />

              <ContentAccordion
                titulo="Sujeito Oculto (Desinencial/Elíptico)"
                icone={<LuSearch className="w-6 h-6" />}
                corIndicador="bg-orange-500"
                slides={[
                  {
                    titulo: "Sujeito Oculto (Desinencial)",
                    icone: "👻",
                    conteudo:(
                      <div className="space-y-6">
                        <p className="text-base text-muted-foreground leading-relaxed">
                          O sujeito oculto (ou desinencial/elíptico) é aquele
                          que não está escrito com todas as letras na frase, mas
                          nós conseguimos adivinhar facilmente quem ele é apenas
                          olhando para o final do verbo (a desinência).
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-orange-500/10 p-5 rounded-xl border border-orange-500/30">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="w-6 h-6 bg-orange-500/20 text-orange-700 dark:text-orange-400 rounded-md flex items-center justify-center font-bold text-sm">
                                1
                              </span>
                              <p className="font-bold text-orange-800 dark:text-orange-300">
                                Escondido pela Desinência
                              </p>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                              Acontece muito na 1ª e na 2ª pessoa (eu, tu, nós,
                              vós), pois a terminação do verbo já "grita" quem
                              está praticando a ação.
                            </p>
                            <ul className="space-y-2 text-sm text-foreground">
                              <li className="flex gap-2">
                                <span className="text-orange-500">✓</span> "Fui
                                à plataforma ontem." (
                                <span className="text-muted-foreground italic">
                                  Quem foi? Eu
                                </span>
                                )
                              </li>
                              <li className="flex gap-2">
                                <span className="text-orange-500">✓</span>{" "}
                                "Chegaremos no primeiro voo." (
                                <span className="text-muted-foreground italic">
                                  Quem chegará? Nós
                                </span>
                                )
                              </li>
                            </ul>
                          </div>
                          <div className="bg-orange-500/10 p-5 rounded-xl border border-orange-500/30">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="w-6 h-6 bg-orange-500/20 text-orange-700 dark:text-orange-400 rounded-md flex items-center justify-center font-bold text-sm">
                                2
                              </span>
                              <p className="font-bold text-orange-800 dark:text-orange-300">
                                Escondido pelo Contexto
                              </p>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                              Acontece na 3ª pessoa, quando o sujeito já foi
                              citado na frase anterior e não precisamos repetir
                              a palavra.
                            </p>
                            <ul className="space-y-2 text-sm text-foreground">
                              <li className="flex gap-2">
                                <span className="text-orange-500">✓</span> "O
                                motor falhou. Foi consertado." (
                                <span className="text-muted-foreground italic">
                                  Na 2ª oração, 'o motor' está oculto.
                                </span>
                                )
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ),
                    exemplo:
                      "Não confunda: Se o verbo estiver na 3ª pessoa do plural (ex: 'Quebraram a broca') num contexto solto sem citar o culpado antes, NÃO é oculto, e sim INDETERMINADO!",
                  },
                ]}
              />

              <ContentAccordion
                titulo="Sujeito Indeterminado"
                icone={<LuSearch className="w-6 h-6" />}
                corIndicador="bg-violet-500"
                slides={[
                  {
                    titulo: "Sujeito Indeterminado",
                    icone: "🕵️",
                    conteudo:(
                      <div className="space-y-6">
                        <p className="text-base text-muted-foreground leading-relaxed">
                          Decorre de uma estratégia sintática ou textual: existe
                          alguém que pratica a ação, mas o emissor da mensagem
                          não sabe quem é, não pode revelar ou não deseja
                          torná-lo conhecido. O verbo adota estruturas
                          mascaradas.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-muted/40 p-5 rounded-xl border border-border h-full flex flex-col justify-start">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="w-8 h-8 rounded-full bg-violet-500/10 text-violet-500 flex items-center justify-center font-bold">
                                1
                              </span>
                              <h4 className="font-bold text-foreground">
                                Verbo na 3ª P. do Plural
                              </h4>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4 border-b border-border pb-3">
                              Ocorre quando conjugamos o verbo na{" "}
                              <b>3ª pessoa do plural</b> sem que haja um termo
                              antecedente no período. Se o termo anterior foi
                              citado, o sujeito passa a ser oculto!
                            </p>
                            <div className="space-y-2 text-sm mt-auto">
                              <p className="italic text-foreground">
                                "<b>Roubaram</b> a carga durante a madrugada."
                                (Não sei quem foi)
                              </p>
                              <p className="italic text-foreground">
                                "<b>Disseram</b> que não haverá pagamento
                                amanhã."
                              </p>
                            </div>
                          </div>
                          <div className="bg-muted/40 p-5 rounded-xl border border-border h-full flex flex-col justify-start">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="w-8 h-8 rounded-full bg-violet-500/10 text-violet-500 flex items-center justify-center font-bold">
                                2
                              </span>
                              <h4 className="font-bold text-foreground">
                                Índice de Indeterminação
                              </h4>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4 border-b border-border pb-3">
                              Agrega-se a <b>partícula 'se'</b> a verbos
                              transitivos indiretos (VTI), intransitivos (VI) ou
                              de ligação (VL). O verbo congela obrigatoriamente
                              na <b>3ª pessoa do singular</b>.
                            </p>
                            <div className="space-y-2 text-sm mt-auto">
                              <p className="italic text-foreground">
                                "<b>Precisa-se</b> de técnicos." (VTI + se)
                              </p>
                              <p className="italic text-foreground">
                                "<b>Vive-se</b> bem aqui." (VI + se)
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ),
                    exemplo:
                      "Dica de Ouro: Para não confundir com Voz Passiva Sindética, preste muita atenção se há PREPOSIÇÃO após o verbo com 'Se'. Se houver preposição de objeto indireto (Ex: 'Precisa-se *de*...'), não é passiva! É indeterminação e a concordância no singular é soberana!",
                  },
                ]}
              />
            </div>
          </section>

          {/* 3. Predicado e Predicativo */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={3}
              title="Tipos de Predicado"
              description="Diferencie predicado verbal, nominal e verbo-nominal através do núcleo da declaração."
              variant="indigo"
            />
            <p className="text-muted-foreground">
              A classificação do predicado depende da natureza do seu núcleo: se
              é um verbo (ação) ou um nome (estado/qualidade).
            </p>

            <div className="space-y-4 mt-6">
              <ContentAccordion
                titulo="Predicado Verbal"
                icone={<LuLayers className="w-6 h-6" />}
                corIndicador="bg-blue-500"
                slides={[
                  {
                    titulo: "Predicado Verbal",
                    icone: "⚡",
                    conteudo:(
                      <div className="space-y-6">
                        <p className="text-base text-muted-foreground leading-relaxed">
                          O grande protagonista deste tipo de predicado é a{" "}
                          <b>ação</b>. Seu núcleo será invariavelmente um{" "}
                          <b>Verbo Nocional</b> (ação ou fenômeno da natureza),
                          e ele jamais carregará uma característica
                          (predicativo) do sujeito.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                          <div className="bg-muted/40 p-5 rounded-xl border border-border h-full flex flex-col justify-start">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
                                1
                              </span>
                              <h4 className="font-bold text-foreground">
                                Com Verbo Intransitivo
                              </h4>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4 border-b border-border pb-3">
                              O verbo já tem sentido completo por si só, não
                              precisando transitar até um objeto. Pode vir
                              acompanhado de adjuntos adverbiais de tempo,
                              lugar, etc.
                            </p>
                            <div className="space-y-2 text-sm mt-auto">
                              <p className="italic text-foreground">
                                "O motor da bomba <b>pifou</b>."
                              </p>
                              <p className="italic text-foreground">
                                "A plataforma <b>afundou</b> ontem."
                              </p>
                            </div>
                          </div>
                          <div className="bg-muted/40 p-5 rounded-xl border border-border h-full flex flex-col justify-start">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
                                2
                              </span>
                              <h4 className="font-bold text-foreground">
                                Com Verbo Transitivo
                              </h4>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4 border-b border-border pb-3">
                              A ação do verbo passa obrigatoriamente para um
                              complemento (objeto direto ou indireto). Ainda
                              assim, o verbo continua sendo o único núcleo do
                              predicado!
                            </p>
                            <div className="space-y-2 text-sm mt-auto">
                              <p className="italic text-foreground">
                                "A refinaria <b>comprou</b> (verbo){" "}
                                <b>novos equipamentos</b> (objeto)."
                              </p>
                              <p className="italic text-foreground">
                                "O conselho <b>necessita</b> (verbo){" "}
                                <b>de investimentos</b> (objeto indireto)."
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ),
                    exemplo:
                      "A refinaria opera em plena carga. (Opera = núcleo de ação intransitivo; em plena carga = adjunto adverbial de modo).",
                  },
                ]}
              />

              <ContentAccordion
                titulo="Predicado Nominal"
                icone={<LuFileText className="w-6 h-6" />}
                corIndicador="bg-amber-500"
                slides={[
                  {
                    titulo:
                      "Predicado Nominal (O Reino do Predicativo do Sujeito)",
                    icone: "🎯",
                    conteudo:(
                      <div className="space-y-6">
                        <p className="text-base text-muted-foreground leading-relaxed">
                          Aqui o protagonista não é a ação, mas o{" "}
                          <b>estado, qualidade ou condição</b> do sujeito. O{" "}
                          <b>núcleo</b> é sempre um nome (substantivo ou
                          adjetivo) chamado <b>Predicativo do Sujeito</b>. O
                          verbo é mero coadjuvante (Verbo de Ligação, um "sinal
                          de igual").
                        </p>

                        <div className="bg-amber-500/10 p-5 rounded-xl border border-amber-500/30">
                          <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-2 flex items-center gap-2">
                            ⭐ O Que é o Predicativo do Sujeito?
                          </h4>
                          <p className="text-sm text-foreground mb-4">
                            É o termo que, com o auxílio de um verbo de ligação,
                            atribui uma <b>característica ou estado</b> ao
                            sujeito. Ele é a palavra mais importante (núcleo) do
                            predicado nominal.
                          </p>
                          <ul className="space-y-2 text-sm text-foreground italic border-l-4 border-amber-500 pl-3">
                            <li>
                              "A água do mar é <b>salgada</b>." (Salgada =
                              qualidade permanente)
                            </li>
                            <li>
                              "Os técnicos parecem <b>cansados</b>." (Cansados =
                              estado passageiro)
                            </li>
                            <li>
                              "O novato virou <b>gerente</b>." (Gerente = estado
                              de mutação / nova condição)
                            </li>
                          </ul>
                        </div>

                        <div className="bg-muted border border-border p-5 rounded-xl">
                          <div className="bg-amber-500/10 p-5 rounded-xl border border-amber-500/30">
                            <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-3 flex items-center gap-2">
                              🔄 Verbos de Ligação (VL)
                            </h4>
                            <p className="text-sm text-muted-foreground mb-4">
                              Eles apenas unem o sujeito à sua qualidade.
                              Memorize o bizu das iniciais <b>SER PAC F</b>:
                            </p>
                            <ul className="space-y-1 text-sm text-foreground font-mono bg-background/50 p-3 rounded-lg border border-border">
                              <li>
                                <b>S</b>er
                              </li>
                              <li>
                                <b>E</b>star
                              </li>
                              <li>
                                <b>R</b>estar
                              </li>
                              <li>
                                <b>P</b>arecer / <b>P</b>ermanecer
                              </li>
                              <li>
                                <b>A</b>ndar (estado)
                              </li>
                              <li>
                                <b>C</b>ontinuar
                              </li>
                              <li>
                                <b>F</b>icar
                              </li>
                            </ul>
                          </div>
                          <div className="bg-muted/40 p-5 rounded-xl border border-border flex flex-col justify-start">
                            <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                              ⚠️ O Cuidado com o Verbo Andar
                            </h4>
                            <p className="text-sm text-muted-foreground mb-4 border-b border-border pb-3">
                              Um verbo pode transitar entre nocional (ação) e de
                              ligação dependendo do contexto. Avalie o peso
                              semântico!
                            </p>
                            <div className="space-y-4 text-sm mt-auto">
                              <div>
                                <p className="font-bold text-red-500 mb-1">
                                  Ação (Verbal)
                                </p>
                                <p className="italic text-foreground">
                                  "O técnico <b>andou</b> pela plataforma."
                                </p>
                              </div>
                              <div>
                                <p className="font-bold text-green-500 mb-1">
                                  Estado (Nominal)
                                </p>
                                <p className="italic text-foreground">
                                  "O técnico <b>anda</b> muito estressado."
                                  (anda = está)
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ),
                    exemplo:
                      "O combustível está [verbo de ligação] caro [núcleo = característica]. Se você tirar o verbo, a essência resiste: 'O combustível caro'.",
                  },
                ]}
              />

              <ContentAccordion
                titulo="Predicado Verbo-Nominal"
                icone={<LuZap className="w-6 h-6" />}
                corIndicador="bg-emerald-500"
                slides={[
                  {
                    titulo: "Predicado Verbo-Nominal",
                    icone: "🎭",
                    conteudo:(
                      <div className="space-y-6">
                        <p className="text-base text-muted-foreground leading-relaxed">
                          O tipo "híbrido". Informa, <b>ao mesmo tempo</b>, uma{" "}
                          <b>ação</b> praticada ou sofrida e o <b>estado</b>{" "}
                          durante ou logo após essa ação. Assim, ele possui{" "}
                          <b>dois núcleos</b> principais: um verbo nocional e um
                          predicativo.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                          <div className="bg-emerald-500/10 p-5 rounded-xl border border-emerald-500/30">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                                A
                              </span>
                              <h4 className="font-bold text-emerald-800 dark:text-emerald-300">
                                Verbo de Ação + Predicativo do Sujeito
                              </h4>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4 bg-background/50 p-3 rounded text-center font-bold">
                              [SUJEITO] + AÇÃO + [ESTADO DO SUJEITO]
                            </p>
                            <p className="text-sm text-foreground mb-2">
                              Durante ou após a ação verbal, o sujeito adquire
                              (ou demonstra) um estado/qualidade.
                            </p>
                            <div className="space-y-2 text-sm text-foreground italic border-l-4 border-emerald-500 pl-3">
                              <p>
                                "Os petroleiros <b>chegaram</b> (ação){" "}
                                <b>exaustos</b> (estado em que os petroleiros
                                chegaram)."
                              </p>
                              <p>
                                "O vento <b>soprava</b> (ação) <b>violento</b>{" "}
                                (estado do vento)."
                              </p>
                            </div>
                          </div>
                          <div className="bg-teal-500/10 p-5 rounded-xl border border-teal-500/30">
                            <div className="flex items-center gap-3 mb-3">
                              <span className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-700 dark:text-teal-400 flex items-center justify-center font-bold">
                                B
                              </span>
                              <h4 className="font-bold text-teal-800 dark:text-teal-300">
                                Verbo de Ação + Predicativo do Objeto
                              </h4>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4 bg-background/50 p-3 rounded text-center font-bold">
                              [SUJEITO] + AÇÃO + [OBJETO] + [ESTADO DO OBJETO]
                            </p>
                            <p className="text-sm text-foreground mb-2">
                              A ação do verbo recai sobre um objeto direto, e
                              este mesmo objeto recebe uma qualidade ou estado.
                            </p>
                            <div className="space-y-2 text-sm text-foreground italic border-l-4 border-teal-500 pl-3">
                              <p>
                                "O juiz <b>declarou</b> (ação) o réu (objeto){" "}
                                <b>inocente</b> (estado impresso ao réu)."
                              </p>
                              <p>
                                "O inspetor <b>achou</b> (ação) a tubulação
                                (objeto) <b>quebrada</b> (estado da tubulação)."
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ),
                    exemplo:
                      "Bizú Cesgranrio: Se a banca grifar um adjetivo ao lado de um verbo de ação, ligue o radar! Ex: A diretoria [caminhou] (ação) [preocupada] (estado da diretoria).",
                  },
                ]}
              />
            </div>
          </section>

          {/* 4. Resumo e Multimedia */}
          <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader
              index={4}
              title="Resumo e Multimídia"
              description="Consolide os termos essenciais com vídeos, resumos e áudio explicativo."
              variant="indigo"
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
                          title="Termos Essenciais: Sujeito e Predicado"
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
                      moduloNome="Termos Essenciais"
                      tituloAula="Análise Sintática"
                      materia="Língua Portuguesa"
                      images={[
                        {
                          title: "Tipos de Sujeito",
                          type: "Mapa Mental",
                          placeholderColor:
                            "bg-indigo-100 dark:bg-indigo-900/30",
                        },
                        {
                          title: "Predicado: Verbal vs Nominal",
                          type: "Diagrama",
                          placeholderColor:
                            "bg-emerald-100 dark:bg-emerald-900/30",
                        },
                        {
                          title: "Verbos Impessoais (Haver/Fazer)",
                          type: "Info",
                          placeholderColor: "bg-rose-100 dark:bg-rose-900/30",
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
                    <div className="text-center p-8 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl border border-indigo-500/10">
                      <h3 className="text-xl font-bold text-foreground mb-4">
                        A Pergunta ao Verbo
                      </h3>
                      <div className="text-7xl my-8 animate-bounce">
                        ❓ 🗣️ ❓
                      </div>
                      <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                        "Ache o verbo e pergunte: <b>QUEM é que...?</b> ou{" "}
                        <b>O QUE é que...?</b> A resposta será o seu sujeito,
                        não importa onde ele esteja escondido!"
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
                          titulo="Resumo: Essenciais"
                          artista="Prof. André"
                          capaUrl="https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000&auto=format&fit=crop"
                          lyrics={`(Verso 1)\nO sujeito manda, o verbo obedece...\nSe ele é inexistente, o singular prevalece!`}
                        />
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          {/* 5. Quiz de Fixação */}
          <QuizInterativo
            numero={5}
            titulo="Sujeito e Predicado"
            icone="🧠"
            questoes={getRandomQuestions(QUIZ_ESSENCIAIS_POOL, 8)}
            variant="indigo"
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 2: TERMOS INTEGRANTES ────────────────────────── */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <ModuleBanner
          numero={2}
          titulo="O Recheio da Oração"
          descricao="Complementos verbais, nominais e o agente da passiva. Entenda como os verbos e nomes exigem seus parceiros de sentido."
          gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
        />
        <div className="space-y-[50px]">
          {/* 1. Objetos Verbais */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Os Objetos: Direto e Indireto"
              description="O objeto é o paciente ou alvo da ação verbal. Domine a transitividade."
              variant="emerald"
            />
            <p className="text-muted-foreground italic">
              "O objeto é o paciente ou alvo da ação verbal."
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-emerald-500/5 p-6 rounded-xl border border-emerald-500/30 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🎯</span>
                  <h4 className="font-bold text-emerald-700 dark:text-emerald-400 text-lg">
                    Objeto Direto (OD)
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4 pb-4 border-b border-border">
                  Liga-se ao verbo <b>SEM preposição</b> obrigatória. Completa
                  Verbos Transitivos Diretos (VTD).
                </p>
                <div className="space-y-4 mt-auto">
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      Exemplos práticos:
                    </p>
                    <p className="italic text-foreground mb-1">
                      "A plataforma <b>produziu</b> muito óleo."
                    </p>
                    <p className="italic text-foreground mb-1">
                      "O gerente <b>assinou</b> o contrato."
                    </p>
                    <p className="italic text-foreground">
                      "Os técnicos <b>inspecionaram</b> a caldeira."
                    </p>
                  </div>
                  <div className="bg-emerald-500/10 p-4 rounded-lg">
                    <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-2">
                      A grande dica (Macete da Pergunta):
                    </p>
                    <p className="text-sm text-muted-foreground">
                      O verbo conta o segredo! Pergunte a ele:{" "}
                      <i>
                        Quem analisa, analisa <b>alguma coisa</b> (ou{" "}
                        <b>alguém</b>).
                      </i>{" "}
                      Não há exigência de preposição (de, em, por, para, com)
                      antes do alvo.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-rose-500/5 p-6 rounded-xl border border-rose-500/30 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🔗</span>
                  <h4 className="font-bold text-rose-700 dark:text-rose-400 text-lg">
                    Objeto Indireto (OI)
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4 pb-4 border-b border-border">
                  Liga-se ao verbo <b>COM preposição</b> obrigatória. Completa
                  Verbos Transitivos Indiretos (VTI).
                </p>
                <div className="space-y-4 mt-auto">
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      Exemplos práticos:
                    </p>
                    <p className="italic text-foreground mb-1">
                      "O conselho <b>necessita</b> de reforços."
                    </p>
                    <p className="italic text-foreground mb-1">
                      "O navio <b>chegou</b> ao porto."
                    </p>
                    <p className="italic text-foreground">
                      "A equipe <b>confia</b> no (em + o) novato."
                    </p>
                  </div>
                  <div className="bg-rose-500/10 p-4 rounded-lg">
                    <p className="text-sm font-bold text-rose-800 dark:text-rose-300 mb-2">
                      A grande dica (Macete da Pergunta):
                    </p>
                    <p className="text-sm text-muted-foreground">
                      O verbo escancara a preposição:{" "}
                      <i>
                        Quem necessita, necessita <b>DE</b> alguma coisa. Quem
                        obedece, obedece <b>A</b> alguém. Quem confia, confia{" "}
                        <b>EM</b> alguém.
                      </i>{" "}
                      Cuidado com o pronome 'Lhe', que é sempre OI!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Complemento Nominal vs Adjunto Adnominal */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader
              index={2}
              title="Complemento Nominal vs Adjunto Adnominal"
              description="Entenda as diferenças sutis entre o alvo da ação e o agente/possuidor."
              variant="emerald"
            />
            <p className="text-muted-foreground italic">
              "Parecem irmãos gêmeos, pois ambos vêm encabeçados por preposição
              (quase sempre 'de'), mas suas essências são opostas."
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-indigo-500/5 p-6 rounded-xl border border-indigo-500/30 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">⚡</span>
                  <h4 className="font-bold text-indigo-700 dark:text-indigo-400 text-lg">
                    Complemento Nominal (CN)
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4 pb-4 border-b border-border">
                  Tem sentido <b>passivo</b> (é o alvo, sofre a ação). Pode
                  completar o sentido de{" "}
                  <b>substantivos abstratos, adjetivos ou advérbios</b>.
                </p>
                <div className="space-y-4 mt-auto">
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      Exemplos práticos:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-sm text-foreground italic">
                      <li>
                        "Obediência <b>às leis do mar</b>" (
                        <span className="text-muted-foreground">
                          As leis são obedecidas - Alvo/Passivo
                        </span>
                        ).
                      </li>
                      <li>
                        "Estava útil <b>ao projeto</b>" (
                        <span className="text-muted-foreground">
                          Completa o adjetivo 'útil'
                        </span>
                        ).
                      </li>
                      <li>
                        "Longe <b>do navio</b>" (
                        <span className="text-muted-foreground">
                          Completa o advérbio 'longe'
                        </span>
                        ).
                      </li>
                    </ul>
                  </div>
                  <div className="bg-indigo-500/10 p-4 rounded-lg">
                    <p className="text-sm font-bold text-indigo-800 dark:text-indigo-300 mb-2">
                      O Macete Matador:
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Se a palavra prévia for <b>Adjetivo</b> ou <b>Advérbio</b>
                      , não perca tempo: é SEMPRE Complemento Nominal. O duelo
                      só existe após Substantivos Abstratos.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-amber-500/5 p-6 rounded-xl border border-amber-500/30 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🏠</span>
                  <h4 className="font-bold text-amber-700 dark:text-amber-400 text-lg">
                    Adjunto Adnominal (AA)
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4 pb-4 border-b border-border">
                  Tem sentido <b>ativo</b> (pratica a ação) ou indica relação de{" "}
                  <b>posse/origem/matéria</b>. Acompanha EXCLUSIVAMENTE{" "}
                  <b>substantivos</b>.
                </p>
                <div className="space-y-4 mt-auto">
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      Exemplos práticos:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-sm text-foreground italic">
                      <li>
                        "A crítica <b>da diretoria</b>" (
                        <span className="text-muted-foreground">
                          A diretoria criticou - Agente/Ativo
                        </span>
                        ).
                      </li>
                      <li>
                        "A plataforma <b>de aço</b>" (
                        <span className="text-muted-foreground">
                          Matéria - Posse/Origem
                        </span>
                        ).
                      </li>
                      <li>
                        "A bota <b>do sondador</b>" (
                        <span className="text-muted-foreground">
                          Posse material
                        </span>
                        ).
                      </li>
                    </ul>
                  </div>
                  <div className="bg-amber-500/10 p-4 rounded-lg">
                    <p className="text-sm font-bold text-amber-800 dark:text-amber-300 mb-2">
                      O Macete Matador:
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Na dúvida, olhe o que vem antes! Se for um substantivo{" "}
                      <b>concreto</b> (mesa, navio, bota), o termo
                      preposicionado será SEMPRE Adjunto Adnominal. Ele é apenas
                      um apêndice decorativo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Agente da Passiva */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader
              index={3}
              title="Agente da Passiva"
              description="Identifique quem pratica a ação na voz passiva, o termo fundamental da estrutura passiva."
              variant="emerald"
            />
            <p className="text-muted-foreground italic">
              "Mesmo na voz passiva, alguém precisa sujar as mãos."
            </p>

            <div className="bg-blue-500/5 p-6 rounded-xl border border-blue-500/30">
              <p className="text-sm text-foreground mb-4">
                O <b>Agente da Passiva</b> é o termo que executa a ação quando o
                verbo da oração está na <b>Voz Passiva</b>. Ele sempre aparece
                encabeçado pelas preposições <b>"por"</b> (pelo, pela) ou
                raramente <b>"de"</b>.
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-bold text-foreground">
                    Exemplo prático:
                  </p>
                  <p className="italic text-foreground">
                    "O poço de petróleo foi perfurado <b>pelos novos robôs</b>
                    ."
                  </p>
                </div>
                <div className="bg-blue-500/10 p-4 rounded-lg mt-4">
                  <p className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-2">
                    Atenção à Transformação:
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Na conversão da voz passiva para a ativa, o{" "}
                    <b>Agente da Passiva</b> vira o <b>Sujeito</b> da frase. Ex:{" "}
                    <i>"Os novos robôs perfuraram o poço."</i>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Resumo e Multimedia */}
          <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader
              index={4}
              title="Resumo e Multimedia"
              variant="emerald"
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
                          title="Termos Integrantes: O Recheio da Oração"
                          duration="10:20"
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
                      moduloNome="Termos Integrantes"
                      tituloAula="Análise Sintática"
                      materia="Língua Portuguesa"
                      images={[
                        {
                          title: "VTD vs VTI (Objetos)",
                          type: "Tabela",
                          placeholderColor:
                            "bg-emerald-100 dark:bg-emerald-900/30",
                        },
                        {
                          title: "CN vs AA: A Batalha",
                          type: "Duelo",
                          placeholderColor:
                            "bg-indigo-100 dark:bg-indigo-900/30",
                        },
                        {
                          title: "Agente da Passiva",
                          type: "Fluxo",
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
                        A Vítima do Nome
                      </h3>
                      <div className="text-7xl my-8 animate-pulse">
                        🤕 ⚖️ 📋
                      </div>
                      <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                        "Complemento Nominal é <b>PASSIVO</b> (sofre). Adjunto
                        Adnominal é <b>ATIVO</b> (pratica) ou indica POSSE. Se o
                        nome for concreto, é sempre Adjunto!"
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
                          titulo="Resumo: Integrantes"
                          artista="Prof. André"
                          capaUrl="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1000&auto=format&fit=crop"
                          lyrics={`(Refrão)\nObjeto direto não tem preposição...\nMas o indireto exige a conexão!`}
                        />
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          {/* 5. Quiz Módulo 2 */}
          <QuizInterativo
            numero={5}
            titulo="Termos Integrantes"
            icone="🧩"
            questoes={getRandomQuestions(QUIZ_INTEGRANTES_POOL, 8)}
            variant="emerald"
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 3: TERMOS ACESSÓRIOS ──────────────────────────── */}
      <TabsContent value="modulo-3" className="space-y-[50px]">
        <ModuleBanner
          numero={3}
          titulo="O Acabamento da Oração"
          descricao="Adjuntos adverbiais, adnominais, aposto e vocativo. Termos que trazem circunstância e precisão ao texto."
          gradiente="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"
        />
        <div className="space-y-[50px]">
          {/* 1. Adjunto Adverbial */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Adjunto Adverbial"
              description="O fofoqueiro da oração: entenda como os adjuntos trazem circunstâncias de tempo, lugar, modo e muito mais."
              variant="violet"
            />
            <p className="text-muted-foreground italic">
              "O fofoqueiro da oração: conta quando, onde, como e por que."
            </p>

            <div className="bg-amber-500/5 p-6 rounded-xl border border-amber-500/30">
              <p className="text-sm text-foreground mb-4">
                Modifica o verbo, adjetivo ou outro advérbio, trazendo
                circunstâncias para o fato. Existem diversos tipos, cobrados em
                interpretação e sintaxe:
              </p>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-background/50 p-4 rounded-xl border border-border">
                    <h5 className="font-bold text-amber-600 dark:text-amber-400 mb-2">
                      1. Afirmação
                    </h5>
                    <p className="text-sm italic">
                      "A sonda <b>certamente</b> suportará a pressão."
                    </p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-xl border border-border">
                    <h5 className="font-bold text-amber-600 dark:text-amber-400 mb-2">
                      2. Negação
                    </h5>
                    <p className="text-sm italic">
                      "O técnico <b>nunca</b> ignorou o alerta de segurança."
                    </p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-xl border border-border">
                    <h5 className="font-bold text-amber-600 dark:text-amber-400 mb-2">
                      3. Dúvida
                    </h5>
                    <p className="text-sm italic">
                      "Essa válvula <b>talvez</b> precise de manutenção."
                    </p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-xl border border-border">
                    <h5 className="font-bold text-amber-600 dark:text-amber-400 mb-2">
                      4. Tempo
                    </h5>
                    <p className="text-sm italic">
                      "A vistoria ocorrerá <b>amanhã de manhã</b>."
                    </p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-xl border border-border">
                    <h5 className="font-bold text-amber-600 dark:text-amber-400 mb-2">
                      5. Lugar
                    </h5>
                    <p className="text-sm italic">
                      "O helicóptero pousou <b>na plataforma</b>."
                    </p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-xl border border-border">
                    <h5 className="font-bold text-amber-600 dark:text-amber-400 mb-2">
                      6. Modo
                    </h5>
                    <p className="text-sm italic">
                      "Eles trabalharam <b>incansavelmente</b> no projeto."
                    </p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-xl border border-border">
                    <h5 className="font-bold text-amber-600 dark:text-amber-400 mb-2">
                      7. Intensidade
                    </h5>
                    <p className="text-sm italic">
                      "A broca desgastou-se <b>demais</b>."
                    </p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-xl border border-border">
                    <h5 className="font-bold text-amber-600 dark:text-amber-400 mb-2">
                      8. Causa
                    </h5>
                    <p className="text-sm italic">
                      "O duto rompeu <b>por causa da alta pressão</b>."
                    </p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-xl border border-border">
                    <h5 className="font-bold text-amber-600 dark:text-amber-400 mb-2">
                      9. Assunto
                    </h5>
                    <p className="text-sm italic">
                      "Debatemos <b>sobre as novas normas da ANP</b>."
                    </p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-xl border border-border">
                    <h5 className="font-bold text-amber-600 dark:text-amber-400 mb-2">
                      10. Companhia
                    </h5>
                    <p className="text-sm italic">
                      "Fizemos a inspeção <b>com o gerente</b>."
                    </p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-xl border border-border">
                    <h5 className="font-bold text-amber-600 dark:text-amber-400 mb-2">
                      11. Instrumento
                    </h5>
                    <p className="text-sm italic">
                      "Apertamos as juntas <b>com a chave inglesa</b>."
                    </p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-xl border border-border">
                    <h5 className="font-bold text-amber-600 dark:text-amber-400 mb-2">
                      12. Meio
                    </h5>
                    <p className="text-sm italic">
                      "Os relatórios foram enviados <b>por satélite</b>."
                    </p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-xl border border-border">
                    <h5 className="font-bold text-amber-600 dark:text-amber-400 mb-2">
                      13. Finalidade
                    </h5>
                    <p className="text-sm italic">
                      "Trabalhamos duro <b>para o alcance das metas</b>."
                    </p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-xl border border-border">
                    <h5 className="font-bold text-amber-600 dark:text-amber-400 mb-2">
                      14. Concessão
                    </h5>
                    <p className="text-sm italic">
                      "Operamos <b>apesar da forte tempestade</b>."
                    </p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-xl border border-border">
                    <h5 className="font-bold text-amber-600 dark:text-amber-400 mb-2">
                      15. Condição
                    </h5>
                    <p className="text-sm italic">
                      "<b>Sem autorização</b>, ninguém entra na área restrita."
                    </p>
                  </div>
                </div>
                <div className="bg-amber-500/10 p-4 rounded-lg mt-4">
                  <p className="text-sm font-bold text-amber-800 dark:text-amber-300 mb-2">
                    Regra de Ouro (Atenção à Vírgula):
                  </p>
                  <p className="text-sm text-muted-foreground">
                    O lugar natural do Adverbial é no final da frase. Se ele for{" "}
                    <b>deslocado para o início</b> e for <b>longo</b> (3 ou mais
                    palavras), a vírgula é OBRIGATÓRIA. Ex:{" "}
                    <i>"Na semana passada, a produção bateu recorde."</i>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Adjunto Adnominal */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader
              index={2}
              title="Adjunto Adnominal"
              description="O maquiador do substantivo: aprenda a identificar os termos que qualificam e determinam os nomes."
              variant="violet"
            />
            <p className="text-muted-foreground italic">
              "O maquiador do substantivo: qualifica, especifica e determina."
            </p>

            <div className="bg-emerald-500/5 p-6 rounded-xl border border-emerald-500/30">
              <p className="text-sm text-foreground mb-4">
                Grava isso: Ad-junto Ad-nominal = "Junto ao Nome". É o termo
                acessório que acompanha o <b>substantivo</b>. Pode ser
                representado por{" "}
                <i>artigos, adjetivos, numerais ou pronomes adjetivos</i>.
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-bold text-foreground">
                    Exemplos práticos:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-sm text-foreground mt-2">
                    <li>
                      "<b>Dois</b> engenheiros resolveram o problema." (
                      <span className="text-muted-foreground italic">
                        Numeral acompanhando substantivo
                      </span>
                      )
                    </li>
                    <li>
                      "<b>Aquelas</b> tubulações <b>novas</b> vazaram." (
                      <span className="text-muted-foreground italic">
                        Pronome e Adjetivo determinando 'tubulações'
                      </span>
                      )
                    </li>
                    <li>
                      "O crachá <b>de visitante</b> sumiu." (
                      <span className="text-muted-foreground italic">
                        Locução Adjetiva
                      </span>
                      )
                    </li>
                  </ul>
                </div>
                <div className="bg-emerald-500/10 p-4 rounded-lg mt-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <span className="text-emerald-700 dark:text-emerald-400">
                      ⚔️
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-1">
                      Cuidado com o Duelo!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Nunca se esqueça da batalha épica entre{" "}
                      <b className="text-emerald-700 dark:text-emerald-500">
                        Adjunto Adnominal
                      </b>{" "}
                      vs{" "}
                      <b className="text-rose-600 dark:text-rose-400">
                        Complemento Nominal
                      </b>{" "}
                      que vimos no módulo anterior. Se for preposicionado dando
                      ideia de ALVO/PASSIVO em cima de substantivo abstrato, é
                      Complemento!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12 mt-12">
            <ModuleSectionHeader
              index={2}
              title="Aposto e Vocativo"
              description="A legenda e o megafone da oração: domine as explicações e os chamamentos."
              variant="violet"
            />
            {/* --- APOSTO --- */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <span className="bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 p-2 rounded-lg">
                  <LuFileText />
                </span>
                Aposto
              </h3>
              <p className="text-muted-foreground italic">
                "A legenda da frase: explica, resume ou enumera outro termo."
              </p>
              <div className="bg-violet-500/5 p-6 rounded-xl border border-violet-500/30">
                <p className="text-sm text-foreground mb-4">
                  O Aposto é a explicação "embutida" numa oração. Ele detalha ou
                  esclarece o termo anterior.
                </p>
                <Tabs defaultValue="explicativo" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="explicativo">Explicativo</TabsTrigger>
                    <TabsTrigger value="enumerativo">Enumerativo</TabsTrigger>
                    <TabsTrigger value="resumitivo">Resumitivo</TabsTrigger>
                  </TabsList>
                  <TabsContent value="explicativo" className="space-y-4">
                    <div className="p-4 bg-muted/30 rounded-lg border border-border text-sm italic">
                      "Rio de Janeiro, <b>capital do petróleo</b>, sedia a
                      empresa."
                    </div>
                  </TabsContent>
                  <TabsContent value="enumerativo" className="space-y-4">
                    <div className="p-4 bg-muted/30 rounded-lg border border-border text-sm italic">
                      "O poço precisa de duas coisas:{" "}
                      <b>tecnologia e segurança</b>."
                    </div>
                  </TabsContent>
                  <TabsContent value="resumitivo" className="space-y-4">
                    <div className="p-4 bg-muted/30 rounded-lg border border-border text-sm italic">
                      "Engenheiros, técnicos e gestores, <b>todos</b>{" "}
                      aplaudiram."
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <hr className="border-border" />

            {/* --- VOCATIVO --- */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <span className="bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 p-2 rounded-lg">
                  <LuMessageCircle />
                </span>
                Vocativo
              </h3>
              <p className="text-muted-foreground italic">
                "O megafone da oração: serve EXCLUSIVAMENTE para chamar."
              </p>
              <div className="bg-pink-500/5 p-6 rounded-xl border border-pink-500/30">
                <p className="text-sm text-foreground mb-4">
                  É um termo independente: não faz parte nem do sujeito, nem do
                  predicado. **OBRIGATORIAMENTE exige vírgula**.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <ul className="list-disc list-inside space-y-2 text-sm text-foreground italic">
                    <li>
                      "<b>Turma</b>, a inspeção vai começar."
                    </li>
                    <li>
                      "Não esqueçam os EPIs, <b>técnicos</b>."
                    </li>
                    <li>
                      "Venha assinar o contrato, <b>senhora</b>."
                    </li>
                  </ul>
                  <div className="bg-pink-500/10 p-4 rounded-lg border border-pink-500/20 text-xs">
                    <p className="font-bold text-pink-800 dark:text-pink-300 mb-1">
                      🚨 Armadilha Frequente
                    </p>
                    <p className="text-muted-foreground">
                      1) <i>"O gerente aprovou o projeto."</i> (Sujeito)
                      <br />
                      2) <i>"Gerente, aprove o projeto."</i> (Vocativo)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader
              index={3}
              title="Resumo e Multimídia"
              description="Revise os termos acessórios e consolide sua percepção das circunstâncias textuais."
              variant="violet"
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
                          title="Termos Acessórios e Pontuação"
                          duration="09:15"
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
                      moduloNome="Termos Acessórios"
                      tituloAula="Análise Sintática"
                      materia="Língua Portuguesa"
                      images={[
                        {
                          title: "Tipos de Adjunto Adverbial",
                          type: "Lista",
                          placeholderColor: "bg-amber-100 dark:bg-amber-900/30",
                        },
                        {
                          title: "Aposto vs Vocativo",
                          type: "Diferença",
                          placeholderColor:
                            "bg-violet-100 dark:bg-violet-900/30",
                        },
                        {
                          title: "Regras de Vírgula",
                          type: "Guia",
                          placeholderColor: "bg-pink-100 dark:bg-pink-900/30",
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
                    <div className="text-center p-8 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-2xl border border-amber-500/10">
                      <h3 className="text-xl font-bold text-foreground mb-4">
                        O Megafone do Vocativo
                      </h3>
                      <div className="text-7xl my-8 animate-pulse">
                        📢 🗣️ ❗
                      </div>
                      <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                        "Vocativo é um <b>CHAMADO</b>. Ele é independente e{" "}
                        <b>EXIGE vírgula</b>. Se você pode tirar e a frase
                        continua inteira, ele é acessório!"
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
                          titulo="Resumo: Acessórios"
                          artista="Prof. André"
                          capaUrl="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop"
                          lyrics={`(Verso)\nAdjunto Adverbial é circunstância pura...\nNo vocativo, a vírgula é a armadura!`}
                        />
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          <QuizInterativo
            numero={4}
            titulo="Termos Acessórios e Vocativo"
            icone="🔍"
            questoes={getRandomQuestions(QUIZ_ACESSORIOS_POOL, 8)}
            variant="violet"
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </div>
      </TabsContent>

      {/* ── MÓDULO 4: LABORATÓRIO ───────────────────────────────── */}
      <TabsContent value="modulo-4" className="space-y-[50px]">
        <ModuleBanner
          numero={4}
          titulo="Laboratório de Análise Sintática"
          descricao="Desafios reais da Cesgranrio. Aplicação prática de tudo o que vimos sobre a estrutura da oração."
          gradiente="bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-8">
            <ModuleSectionHeader
              index={1}
              title="Desafio de Alto Nível"
              description="Enfrente as questões mais complexas da Cesgranrio e aprenda a não cair em pegadinhas."
              variant="amber"
            />
            <AlertBox tipo="warning" titulo="O 'Pulo do Gato' da Cesgranrio">
              A banca costuma inverter a ordem das palavras (Ordem Indireta)
              para esconder o sujeito. Sempre procure o verbo primeiro e
              pergunte: "Quem/O que pratica esta ação?"
            </AlertBox>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FlipCard
                numero={1}
                categoria="Análise Sintática"
                frente={
                  <p className="text-lg">
                    Analise a função sintática do termo em negrito: "Aos
                    funcionários <b>interessa</b> a produtividade."
                  </p>
                }
                verso={
                  <div className="space-y-3">
                    <p className="font-bold text-green-600">
                      Resposta: Verbo Transitivo Indireto!
                    </p>
                    <p className="text-sm">
                      O sujeito é "a produtividade" (O que interessa? A
                      produtividade). "Aos funcionários" é Objeto Indireto.
                    </p>
                  </div>
                }
              />
              <FlipCard
                numero={2}
                categoria="Pegadinha da Banca"
                frente={
                  <p className="text-lg">
                    Qual o sujeito da oração: "<b>Faz</b> dez anos que não a
                    vejo."?
                  </p>
                }
                verso={
                  <div className="space-y-3">
                    <p className="font-bold text-green-600">
                      Resposta: Oração Sem Sujeito!
                    </p>
                    <p className="text-sm">
                      O verbo "fazer" indicando tempo decorrido ou clima é
                      impessoal, devendo ficar sempre na 3ª pessoa do singular.
                    </p>
                  </div>
                }
              />
            </div>
          </section>

          {/* 2. Laboratório de Dissecação */}
          <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader
              index={2}
              title="Dissecando a Oração"
              description="Aplique o método passo a passo para destrinchar frases densas e complexas."
              variant="amber"
            />
            <p className="text-muted-foreground italic">
              "O método passo a passo para destrinchar frases gigantes."
            </p>

            <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800/50 dark:to-slate-900 border border-slate-300 dark:border-slate-800 p-6 rounded-xl font-mono text-center text-lg md:text-xl relative shadow-inner overflow-x-auto whitespace-nowrap">
              "Sempre os experientes engenheiros confiaram no sucesso do projeto
              audacioso."
            </div>

            {/* ACORDEON 1: Fase 1 */}
            <ContentAccordion
              titulo="🔍 Fase 1: A Base da Oração"
              icone={<LuSearch className="w-6 h-6" />}
              corIndicador="bg-amber-500"
              defaultOpen={true}
              slides={[
                {
                  titulo: "Passo 1: O Coração (Ache o Verbo)",
                  icone: "1️⃣",
                  conteudo:(
                    <div className="space-y-4">
                      {/* 1. CONCEITUAÇÃO */}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        A análise sintática <strong>NUNCA</strong> começa pelo
                        começo da frase. Ela sempre começa pelo{" "}
                        <strong>verbo</strong>, que é o pilar de qualquer oração
                        e dita as regras de concordância e regência.
                      </p>

                      {/* 2. EXEMPLO */}
                      <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20">
                        <p className="text-sm font-bold text-foreground mb-2">
                          Frase em Análise:
                        </p>
                        <p className="text-sm font-mono text-amber-700 dark:text-amber-400">
                          Sempre os experientes engenheiros{" "}
                          <span className="bg-amber-500/20 px-1 py-0.5 rounded">
                            confiaram
                          </span>{" "}
                          no sucesso do projeto audacioso.
                        </p>
                      </div>

                      {/* 3. DICA */}
                      <AlertBox tipo="info" titulo="Macete">
                        O verbo é "confiar". Pela regência, quem confia, confia{" "}
                        <strong>em</strong> algo ou alguém. Logo, ele é um{" "}
                        <strong>Verbo Transitivo Indireto (VTI)</strong> e vai
                        exigir uma preposição logo à frente!
                      </AlertBox>

                      {/* 4. EXCEÇÃO */}
                      <p className="text-xs text-muted-foreground italic mt-2">
                        Exceção: Em frases nominais (sem verbo), como "Que belo
                        dia!", não fazemos análise sintática da mesma forma,
                        pois não há oração estruturada.
                      </p>
                    </div>
                  ),
                },
                {
                  titulo: "Passo 2: O Dono do Verbo (Ache o Sujeito)",
                  icone: "2️⃣",
                  conteudo:(
                    <div className="space-y-4">
                      {/* 1. CONCEITUAÇÃO */}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Faça a <strong>pergunta mágica</strong> ("Quem confia?"
                        ou "O que confia?") ANTES DO VERBO para encontrar o
                        sujeito da oração, independente de onde ele estiver
                        escondido.
                      </p>

                      {/* 2. EXEMPLO */}
                      <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20">
                        <p className="text-sm font-bold text-foreground mb-2">
                          Pergunta: "Quem confiaram?"
                        </p>
                        <p className="text-sm font-mono text-amber-700 dark:text-amber-400">
                          Sempre{" "}
                          <span className="bg-amber-500/20 px-1 py-0.5 rounded">
                            os experientes engenheiros
                          </span>{" "}
                          confiaram...
                        </p>
                      </div>

                      {/* 3. DICA */}
                      <AlertBox tipo="warning" titulo="Dica de Ouro">
                        A banca sempre coloca adjetivos no meio para te
                        confundir. A resposta foi "Os experientes engenheiros".
                        Qual a palavra mais central que não pode ser apagada? "
                        <strong>engenheiros</strong>". Esse é o núcleo do{" "}
                        <strong>Sujeito Simples e Direto</strong>!
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />

            {/* ACORDEON 2: Fase 2 */}
            <ContentAccordion
              titulo="🧩 Fase 2: Expansão de Sentido"
              icone={<LuLayers className="w-6 h-6" />}
              corIndicador="bg-orange-500"
              defaultOpen={false}
              slides={[
                {
                  titulo: "Passo 3: A ponte para o sentido (Complementos)",
                  icone: "3️⃣",
                  conteudo:(
                    <div className="space-y-4">
                      {/* 1. CONCEITUAÇÃO */}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Como o verbo "confiar" é VTI, precisamos encontrar seu
                        alvo: o <strong>Objeto Indireto</strong>, que sempre
                        será encabeçado por sua preposição exigida (em + o =
                        no).
                      </p>

                      {/* 2. EXEMPLO */}
                      <div className="p-4 bg-orange-500/5 rounded-xl border border-orange-500/20">
                        <p className="text-sm font-mono text-orange-700 dark:text-orange-400">
                          ... confiaram{" "}
                          <span className="bg-orange-500/20 px-1 py-0.5 rounded">
                            no sucesso
                          </span>{" "}
                          do projeto audacioso.
                        </p>
                      </div>

                      {/* 3. DICA */}
                      <AlertBox tipo="info" titulo="Macete">
                        O que completou o sentido do verbo transitar? A
                        expressão "No sucesso". Este é o{" "}
                        <strong>Objeto Indireto</strong> raiz da oração. Não
                        inclua os anexos ainda ("do projeto audacioso").
                      </AlertBox>
                    </div>
                  ),
                },
                {
                  titulo: "Passo 4: As joias de pendurar (Adjuntos e CN)",
                  icone: "4️⃣",
                  conteudo:(
                    <div className="space-y-4">
                      {/* 1. CONCEITUAÇÃO */}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Restaram apenas as palavras que orbitam os núcleos
                        acompanhando, caracterizando ou indicando circunstâncias
                        extras (os acessórios e complementos menores).
                      </p>

                      {/* 2. EXEMPLO */}
                      <div className="p-4 bg-orange-500/5 rounded-xl border border-orange-500/20">
                        <p className="text-sm font-mono text-foreground mb-3 leading-relaxed">
                          <span className="text-rose-500 font-bold">
                            Sempre
                          </span>{" "}
                          <span className="text-teal-500 font-bold">
                            os experientes
                          </span>{" "}
                          engenheiros confiaram no sucesso{" "}
                          <span className="text-indigo-500 font-bold">
                            do projeto audacioso
                          </span>
                          .
                        </p>
                        <ul className="list-inside space-y-2 text-sm text-muted-foreground mt-4">
                          <li>
                            🔴 <strong className="text-rose-500">Sempre</strong>
                            : Adjunto Adverbial de Tempo (deslocado para o
                            início).
                          </li>
                          <li>
                            🟢{" "}
                            <strong className="text-teal-500">
                              Os experientes
                            </strong>
                            : Adjuntos Adnominais que vestem o sujeito
                            "engenheiros".
                          </li>
                          <li>
                            🔵{" "}
                            <strong className="text-indigo-500">
                              Do projeto
                            </strong>
                            : Complemento Nominal (o projeto sofre a ação de ter
                            sucesso).
                          </li>
                          <li>
                            🔵{" "}
                            <strong className="text-indigo-500">
                              Audacioso
                            </strong>
                            : Adjunto Adnominal de "projeto".
                          </li>
                        </ul>
                      </div>

                      {/* 3. DICA */}
                      <AlertBox tipo="success" titulo="Conclusão">
                        Aplicando esses 4 passos, nenhuma frase da banca
                        Cesgranrio conseguirá embaralhar a sua cabeça, por maior
                        que ela seja!
                      </AlertBox>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          {/* 3. Resumo e Multimedia */}
          <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader
              index={3}
              title="Resumo e Multimídia"
              description="Consolidação final do Laboratório de Análise Sintática."
              variant="amber"
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
                          title="Laboratório: Cascas de Banana"
                          duration="05:30"
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
                      moduloNome="Laboratório"
                      tituloAula="Análise Sintática"
                      materia="Língua Portuguesa"
                      images={[
                        {
                          title: "Inversão: Ordem Indireta",
                          type: "Dica",
                          placeholderColor: "bg-rose-100 dark:bg-rose-900/30",
                        },
                        {
                          title: "Pronomes: O/A vs LHE",
                          type: "Diferença",
                          placeholderColor:
                            "bg-emerald-100 dark:bg-emerald-900/30",
                        },
                        {
                          title: "Passiva Sintética vs Analítica",
                          type: "Esquema",
                          placeholderColor:
                            "bg-indigo-100 dark:bg-indigo-900/30",
                        },
                      ]}
                    />
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
                          titulo="Resumo: Laboratório"
                          artista="Prof. André"
                          capaUrl="https://images.unsplash.com/photo-1508700115892-45ecd0562c3e?q=80&w=1000&auto=format&fit=crop"
                          lyrics={`(Papo Reto)\nNa ordem inversa, o sujeito sumiu...\nAche o verbo e veja quem o pariu!`}
                        />
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </section>

          {/* 4. Quiz Módulo 4 */}
          <QuizInterativo
            numero={4}
            titulo="Laboratório Final"
            icone="🔬"
            questoes={getRandomQuestions(QUIZ_LABORATORIO_POOL, 5)}
            variant="amber"
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
          />
        </div>
      </TabsContent>

      <TabsContent value="modulo-5" className="space-y-[50px]">
        <ModuleBanner
          numero={5}
          titulo="Síntese Estratégica"
          descricao="Resumo visual, mapas mentais e ferramentas de fixação rápida para não esquecer mais."
          gradiente="bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700"
        />
        <div className="space-y-[50px]">
          <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8 mt-12">
            <ModuleSectionHeader
              index={1}
              title="Resumo e Multimídia"
              description="Visão panorâmica de toda a Sintaxe da Oração."
              variant="rose"
            />

            <div className="bg-rose-500/5 border border-rose-500/20 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-rose-800 dark:text-rose-300 mb-3 flex items-center gap-2">
                <LuInfo className="w-5 h-5" /> Como Extrair o Máximo da Síntese
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Este espaço de síntese não é apenas uma revisão passiva, mas sim
                uma{" "}
                <strong>ferramenta estratégica de fixação intermodal</strong>. A
                neurociência nos ensina que o cérebro retém mais informação
                quando ela é processada de múltiplas formas. Portanto,
                recomendamos o seguinte roteiro de estudo:
              </p>
              <ul className="space-y-3 text-sm text-foreground">
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
                    <strong>3. Macete Visual:</strong> A sacada genial ou atalho
                    ("bizu") definitivo. Ele ancora a regra complexa a uma
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
              variant="rose"
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
                  label: "Macete Visual",
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
    </AulaTemplate>
  );
}












