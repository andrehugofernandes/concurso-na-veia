"use client";

import { useState, useCallback, useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
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
} from "./shared";

const MODULE_DEFS = [
  { id: "modulo-1", label: "Módulo 1", titulo: "Narrativo & Descritivo" },
  { id: "modulo-2", label: "Módulo 2", titulo: "Dissertativo" },
  { id: "modulo-3", label: "Módulo 3", titulo: "Injuntivo & Dialogal" },
  { id: "modulo-4", label: "Módulo 4", titulo: "Gêneros vs. Tipos" },
  { id: "modulo-5", label: "Módulo 5", titulo: "Laboratório & Revisão" },
] as const;

// ============================================================================
// POOLS DE QUESTÕES
// ============================================================================

const QUIZ_MOD1_POOL: QuizQuestion[] = [
  {
    id: 101,
    pergunta:
      "Leia o trecho: 'A plataforma era imensa, revestida de aço pintado de amarelo desbotado pelo sol. O som constante do mar batendo nas pilastras ecoava...' Qual o tipo textual predominante?",
    opcoes: [
      { label: "A", valor: "Narrativo, pois relata as ações do mar." },
      {
        label: "B",
        valor: "Descritivo, pois caracteriza estaticamente o ambiente.",
      },
      { label: "C", valor: "Dissertativo, pois expõe o problema da maresia." },
      {
        label: "D",
        valor: "Injuntivo, pois instrui como observar a plataforma.",
      },
    ],
    correta: "B",
    explicacao:
      "A descrição pinta um 'quadro mental' com adjetivos e características simultâneas, sem progressão de ações no tempo.",
  },
  {
    id: 102,
    pergunta:
      "Para haver um texto narrativo, é estritamente necessária a presença de:",
    opcoes: [
      {
        label: "A",
        valor: "Progressão temporal de ações com personagens em um enredo.",
      },
      { label: "B", valor: "Adjetivos detalhados sobre o espaço da ação." },
      {
        label: "C",
        valor: "Argumentos que convençam o leitor sobre a moral da história.",
      },
      { label: "D", valor: "Diálogos diretos entre personagens principais." },
    ],
    correta: "A",
    explicacao:
      "A narração exige mudança de estado no tempo (ações cronológicas) envolvendo personagens dentro de um enredo.",
  },
  {
    id: 103,
    pergunta:
      "No discurso indireto livre, o que ocorre com a voz do narrador e do personagem?",
    opcoes: [
      {
        label: "A",
        valor: "O narrador introduz a fala exata do personagem com travessão.",
      },
      {
        label: "B",
        valor: "O narrador relata o que o personagem disse usando 'que'.",
      },
      {
        label: "C",
        valor:
          "As falas ou pensamentos do personagem se misturam à fala do narrador sem marcas de transição.",
      },
      {
        label: "D",
        valor:
          "O personagem assume o lugar do narrador na primeira pessoa temporalmente.",
      },
    ],
    correta: "C",
    explicacao:
      "O discurso indireto livre é uma fusão. Não há verbos de elocução ('disse que') nem travessões, o pensamento do personagem invade a narração.",
  },
  {
    id: 104,
    pergunta: "Uma descrição **subjetiva** difere de uma objetiva porque:",
    opcoes: [
      {
        label: "A",
        valor: "Usa dados técnicos, medidas exatas e vocabulário técnico.",
      },
      {
        label: "B",
        valor: "Expressa a percepção, emoção e opinião de quem descreve.",
      },
      {
        label: "C",
        valor: "Apresenta apenas fatos cronológicos de forma clara.",
      },
      {
        label: "D",
        valor: "Não utiliza adjetivos, focando apenas nos substantivos.",
      },
    ],
    correta: "B",
    explicacao:
      "A descrição subjetiva está carregada das impressões e sentimentos do observador, enquanto a objetiva busca ser exata e neutra.",
  },
  {
    id: 105,
    pergunta:
      "Em um relatório de manutenção na Petrobras, a seção 'Estado do Equipamento Antes da Pintura' exige o uso do tipo textual:",
    opcoes: [
      { label: "A", valor: "Narrativo, contando a história do desgaste." },
      {
        label: "B",
        valor: "Dissertativo, argumentando sobre a qualidade da tinta.",
      },
      {
        label: "C",
        valor: "Injuntivo, ordenando aos funcionários o que pintar.",
      },
      {
        label: "D",
        valor: "Descritivo objetivo, detalhando as características físicas.",
      },
    ],
    correta: "D",
    explicacao:
      "Para relatar o estado físico (rachaduras, ferrugem, cores), usa-se a descrição objetiva, técnica e isenta de opiniões literárias.",
  },
  {
    id: 106,
    pergunta:
      "Identifique o tipo de discurso no trecho: 'O engenheiro olhou para o duto vazando. O que faria agora? A pressão estava muito alta.'",
    opcoes: [
      { label: "A", valor: "Discurso direto" },
      { label: "B", valor: "Discurso indireto" },
      { label: "C", valor: "Discurso indireto livre" },
      { label: "D", valor: "Ausência de discurso" },
    ],
    correta: "C",
    explicacao:
      "As perguntas e pensamentos do engenheiro ('O que faria agora?') fluem misturados com a narração em terceira pessoa, sem aviso prévio.",
  },
  {
    id: 107,
    pergunta:
      "Na narração, se o narrador tudo sabe, inclusive os pensamentos dos personagens, ele é chamado de:",
    opcoes: [
      { label: "A", valor: "Narrador personagem" },
      { label: "B", valor: "Narrador observador" },
      { label: "C", valor: "Narrador onisciente" },
      { label: "D", valor: "Narrador intruso" },
    ],
    correta: "C",
    explicacao:
      "Opcional ou total, a onisciência permite ao narrador transcender o espaço físico e entrar na mente das personagens.",
  },
  {
    id: 108,
    pergunta:
      "Quando a predominância do texto é informar as características verbais ou visuais simultâneas de um objeto, sem tempo avançando, temos um(a):",
    opcoes: [
      { label: "A", valor: "Conto (Narrativa)" },
      { label: "B", valor: "Fotografia textual (Descrição)" },
      { label: "C", valor: "Manobra lógica (Dissertação)" },
      { label: "D", valor: "Comando (Injunção)" },
    ],
    correta: "B",
    explicacao:
      "A descrição paralisa o tempo. É como tirar uma fotografia textual ('A sala era fria, luz branca, cadeiras azuis').",
  },
];

const QUIZ_MOD2_POOL: QuizQuestion[] = [
  {
    id: 201,
    pergunta:
      "A principal diferença entre Dissertação Expositiva e Dissertação Argumentativa é que:",
    opcoes: [
      {
        label: "A",
        valor:
          "A expositiva apresenta fatos e a argumentativa busca convencer o leitor de uma tese.",
      },
      {
        label: "B",
        valor: "A expositiva usa 1ª pessoa e a argumentativa usa 3ª pessoa.",
      },
      {
        label: "C",
        valor:
          "A expositiva instrui a fazer algo, a argumentativa apenas descreve o tema.",
      },
      {
        label: "D",
        valor:
          "Não há diferença, ambas servem para convencer via ordem direta.",
      },
    ],
    correta: "A",
    explicacao:
      "Dissertar-expor é apenas explicar algo de modo impessoal (como este resumo). Dissertar-argumentar visa persuadir sobre um ponto de vista (tese).",
  },
  {
    id: 202,
    pergunta:
      "Leia: 'Segundo a Agência Nacional do Petróleo (ANP), o Brasil é o maior produtor de águas profundas.' Que tipo de argumento foi utilizado?",
    opcoes: [
      { label: "A", valor: "Argumento de autoridade" },
      { label: "B", valor: "Argumento por analogia" },
      { label: "C", valor: "Argumento de causa e consequência" },
      { label: "D", valor: "Argumento de exemplificação" },
    ],
    correta: "A",
    explicacao:
      "Para fundamentar a informação, citou-se uma instituição de renome e especialista no assunto (ANP). Isso é argumento de autoridade.",
  },
  {
    id: 203,
    pergunta:
      "Na estrutura da dissertação argumentativa, a 'Tese' costuma aparecer em qual parte?",
    opcoes: [
      { label: "A", valor: "No primeiro parágrafo do Desenvolvimento." },
      { label: "B", valor: "Na Conclusão, fechando o texto." },
      { label: "C", valor: "Na Introdução, apresentando o ponto de vista." },
      { label: "D", valor: "Apenas indiretamente no título." },
    ],
    correta: "C",
    explicacao:
      "A tese é o núcleo do texto e deve ser apresentada logo na Introdução. No desenvolvimento ela é defendida, e na conclusão é reafirmada.",
  },
  {
    id: 204,
    pergunta: "Um texto dissertativo expositivo tem como objetivo primordial:",
    opcoes: [
      {
        label: "A",
        valor: "Incentivar uma mudança de comportamento no leitor.",
      },
      {
        label: "B",
        valor:
          "Explicar, informar e esclarecer um assunto sem defender opiniões polêmicas.",
      },
      {
        label: "C",
        valor: "Relatar fatos com riqueza de cronologia e personagens reais.",
      },
      {
        label: "D",
        valor: "Fornecer regras de segurança para evacuação do prédio.",
      },
    ],
    correta: "B",
    explicacao:
      "O texto expositivo expõe as ideias sem polemizar ou tentar impor um juízo de valor. É comum em jornais, enciclopédias e livros didáticos.",
  },
  {
    id: 205,
    pergunta:
      "No argumento de 'Causa e Consequência', a lógica defendida baseia-se em:",
    opcoes: [
      { label: "A", valor: "Citar falas de especialistas." },
      {
        label: "B",
        valor: "Fazer comparações entre dois elementos distantes.",
      },
      {
        label: "C",
        valor:
          "Mostrar que o evento inicial A resultou, inevitavelmente, no evento B.",
      },
      {
        label: "D",
        valor:
          "Apresentar uma lista numérica de acontecimentos não relacionados.",
      },
    ],
    correta: "C",
    explicacao:
      "Estabelecer uma relação de causa e efeito fortalece a tese (Ex: 'A falta de manutenção nas sondas [causa] levou ao risco de vazamento [efeito]').",
  },
  {
    id: 206,
    pergunta: "Indique o trecho marcadamente Argumentativo:",
    opcoes: [
      { label: "A", valor: "A Petrobras foi fundada em 1953." },
      {
        label: "B",
        valor:
          "Os funcionários da área operacional vestem uniformes com faixas refletivas na cor laranja.",
      },
      {
        label: "C",
        valor:
          "É inadmissível que os cortes em P&D continuem, pois isso condenará a inovação e o futuro energético do país.",
      },
      {
        label: "D",
        valor:
          "As brocas de perfuração medem entre dez a trinta polegadas, sendo trocadas mensalmente.",
      },
    ],
    correta: "C",
    explicacao:
      "As palavras valorativas ('inadmissível', 'condenará') emitem forte opinião e julgamento sobre o impacto de um fato, buscando adesão.",
  },
];

const QUIZ_MOD3_POOL: QuizQuestion[] = [
  {
    id: 301,
    pergunta:
      "Em um Manual de Procedimento Operacional Padrão da Refinaria, prevalece a tipologia:",
    opcoes: [
      { label: "A", valor: "Descritiva passiva." },
      { label: "B", valor: "Injuntiva ou instrucional." },
      { label: "C", valor: "Dissertativa técnica." },
      { label: "D", valor: "Narrativa cronológica." },
    ],
    correta: "B",
    explicacao:
      "O texto injuntivo (ou instrucional) serve para dar ordens, instruções ou ensinar a fazer algo, como num manual, receita ou bula.",
  },
  {
    id: 302,
    pergunta: "Qual modo verbal é a marca registrada do texto injuntivo?",
    opcoes: [
      { label: "A", valor: "Indicativo (certeza)." },
      { label: "B", valor: "Subjuntivo (dúvida)." },
      { label: "C", valor: "Imperativo (ordem/conselho)." },
      { label: "D", valor: "Infinitivo impessoal (sempre)." },
    ],
    correta: "C",
    explicacao:
      "Verbos no imperativo ('aperte', 'verifique', 'feche') são a principal característica da função conativa/apelativa na injunção.",
  },
  {
    id: 303,
    pergunta:
      "Leia: 'Ligue o computador. Insira sua senha. Aguarde o sistema carregar.' Isso é um texto:",
    opcoes: [
      { label: "A", valor: "Injuntivo prescritivo." },
      { label: "B", valor: "Descrição objetiva narrada." },
      { label: "C", valor: "Narração em 2ª pessoa." },
      { label: "D", valor: "Dissertação sobre o login." },
    ],
    correta: "A",
    explicacao:
      "Há uma sequência de instruções diretas buscando modificar o comportamento ou ação do leitor.",
  },
  {
    id: 304,
    pergunta:
      "O tipo textual 'Dialogal' ou 'Conversacional' caracteriza-se por:",
    opcoes: [
      {
        label: "A",
        valor: "Longas explanações de um único emissor sem interrupções.",
      },
      {
        label: "B",
        valor: "Troca de turnos de fala entre dois ou mais interlocutores.",
      },
      {
        label: "C",
        valor: "Uso exclusivo de linguagem formal e culta na escrita.",
      },
      { label: "D", valor: "Ausência de marcas de oralidade." },
    ],
    correta: "B",
    explicacao:
      "O diálogo exige a interação. Marcas como 'né?', pausas, interrogações e respostas configuram a troca de turnos típica deste tipo.",
  },
  {
    id: 305,
    pergunta:
      "Em qual gênero abaixo o tipo textal dialogal é absolutamente essencial?",
    opcoes: [
      { label: "A", valor: "Receita de bolo." },
      { label: "B", valor: "Bula de remédio." },
      { label: "C", valor: "Roteiro de teatro." },
      { label: "D", valor: "Editorial de jornal." },
    ],
    correta: "C",
    explicacao:
      "Uma peça teatral é feita fundamentalmente de diálogos (tipo dialogal/conversacional), embora possa ter sequências narrativas nas rubricas.",
  },
  {
    id: 306,
    pergunta:
      "Em textos injuntivos como Editais de Concurso, a principal finalidade é:",
    opcoes: [
      { label: "A", valor: "Narrar a história das bancas." },
      {
        label: "B",
        valor:
          "Prescrever condutas, regras e deveres que não podem ser ignorados.",
      },
      { label: "C", valor: "Descrever detalhadamente a sala de aula." },
      { label: "D", valor: "Argumentar que a CESGRANRIO é a melhor banca." },
    ],
    correta: "B",
    explicacao:
      "O edital é injuntivo prescritivo. Ele dita regras, proibições ('não portar celular') e passos para a inscrição, exigindo cumprimento.",
  },
];

const QUIZ_MOD4_POOL: QuizQuestion[] = [
  {
    id: 401,
    pergunta:
      "Segundo a teoria linguística cobrada em provas, a diferença fundamental é que:",
    opcoes: [
      {
        label: "A",
        valor: "Gêneros são limitados a 5 categorias, Tipos são infinitos.",
      },
      {
        label: "B",
        valor:
          "Gêneros se referem à intenção social (notícia, crônica, receita), Tipos se referem à estrutura (narração, dissertação).",
      },
      { label: "C", valor: "Não há diferença, são sinônimos." },
      {
        label: "D",
        valor: "Gênero só existe na fala, Tipo só existe na escrita.",
      },
    ],
    correta: "B",
    explicacao:
      "Tipos (narração, descrição, etc.) são bases estruturais restritas. Gêneros (e-mail, tweet, artigo, receita) são as incontáveis formas que textos assumem no uso cotidiano.",
  },
  {
    id: 402,
    pergunta:
      "Uma notícia de jornal sobre um acidente na rodovia tem, predominantemente, a tipologia:",
    opcoes: [
      {
        label: "A",
        valor:
          "Narrativa, relata um acontecimento com tempo e espaço no passado.",
      },
      { label: "B", valor: "Dissertativa, critica os motoristas ruins." },
      { label: "C", valor: "Injuntiva, manda reduzir a velocidade." },
      { label: "D", valor: "Descritiva poética." },
    ],
    correta: "A",
    explicacao:
      "A notícia (gênero) costuma ter tipologia dominante Narrativa, pois relata *o que* aconteceu, *quando* e *onde* (fatos no tempo).",
  },
  {
    id: 403,
    pergunta:
      "O que significa dizer que um texto apresenta 'hibridismo tipológico'?",
    opcoes: [
      { label: "A", valor: "Ele não pertence a nenhum idioma conhecido." },
      {
        label: "B",
        valor:
          "Ele mistura estruturas de narração, descrição e argumentação em um único texto.",
      },
      { label: "C", valor: "Ele foi escrito por duas pessoas diferentes." },
      { label: "D", valor: "Ele não pode ser cobrado na CESGRANRIO." },
    ],
    correta: "B",
    explicacao:
      "É raro um texto ser 100% de um único tipo. Quase sempre há hibridismo (uma dissertação com trechos descritivos, por exemplo).",
  },
  {
    id: 404,
    pergunta:
      "Em um gênero 'Bula de Remédio', qual a sequência tipológica dominante?",
    opcoes: [
      { label: "A", valor: "Narrativa, contando a história do remédio." },
      { label: "B", valor: "Dialogal, falando com o leitor." },
      {
        label: "C",
        valor: "Injuntiva, indicando dosagens e como usar (posologia).",
      },
      { label: "D", valor: "Argumentativa, convencendo que o remédio cura." },
    ],
    correta: "C",
    explicacao:
      "A bula instrui o paciente a como tomar o remédio (injunção), ainda que traga pequenas descrições (aparência do comprimido).",
  },
  {
    id: 405,
    pergunta: "Gênero: Resenha Crítica. Tipologia dominante:",
    opcoes: [
      { label: "A", valor: "Narração de aventura." },
      { label: "B", valor: "Dissertativa-Argumentativa." },
      { label: "C", valor: "Injunção instrucional." },
      { label: "D", valor: "Descrição pura." },
    ],
    correta: "B",
    explicacao:
      "Na resenha crítica, o autor resume a obra (exposição) e emite forte julgamento de valor para convencer o leitor (argumentação).",
  },
  {
    id: 406,
    pergunta:
      "Se a CESGRANRIO perguntar 'O fragmento x constitui uma descrição...', ela está questionando sobre:",
    opcoes: [
      { label: "A", valor: "Gênero do texto principal." },
      { label: "B", valor: "Modo de organização discursiva / Tipo Textual." },
      { label: "C", valor: "A intenção do narrador secundário." },
      { label: "D", valor: "A marca de oralidade." },
    ],
    correta: "B",
    explicacao:
      "Falou em Narrativo, Descritivo, Dissertativo ou Injuntivo? A questão aborda *Tipo Textual* ou *Modo de Organização/Sequência Textual*.",
  },
];

const QUIZ_MOD5_POOL: QuizQuestion[] = [
  {
    id: 501,
    pergunta:
      "Assinale a opção em que o trecho é fundamentalmente uma INJUNÇÃO.",
    opcoes: [
      {
        label: "A",
        valor:
          "A parede de aço reluzia contra o céu acinzentado da manhã de ontem...",
      },
      {
        label: "B",
        valor:
          "Foi então que o marinheiro gritou, sem entender direito de onde vinha a voz...",
      },
      {
        label: "C",
        valor:
          "Para evitar acidentes, certifique-se de que a válvula P-14 esteja fechada, travando a alavanca em seguida.",
      },
      {
        label: "D",
        valor:
          "É evidente que os cortes em pesquisa não garantem um bom desempenho a longo prazo da empresa.",
      },
    ],
    correta: "C",
    explicacao:
      "Verbos no imperativo ('certifique-se', mandando o leitor agir) definem a injunção. A é Descrição; B é Narração; D é Argumentação.",
  },
  {
    id: 502,
    pergunta:
      "Um ensaio acadêmico defendendo a mudança para energias renováveis no Brasil seria:",
    opcoes: [
      { label: "A", valor: "Narração ficcional pura." },
      { label: "B", valor: "Gênero Ensaio; Tipo Dissertativo-Argumentativo." },
      { label: "C", valor: "Gênero Argumento; Tipo Acadêmico." },
      { label: "D", valor: "Gênero Crônica; Tipo Expositivo." },
    ],
    correta: "B",
    explicacao:
      "Ensaio (Gênero, intenção social e suporte) e Argumentativo (Tipo estrutural base, expondo e defendendo ideias).",
  },
  {
    id: 503,
    pergunta: "Qual das palavras-chave indica uma TESE numa argumentação?",
    opcoes: [
      { label: "A", valor: "'Então, a princesa disse feliz...'" },
      { label: "B", valor: "'Cerca de 25% da frota está velha...'" },
      { label: "C", valor: "'Ligue a batedeira por 5 minutos...'" },
      { label: "D", valor: "'Portanto, é inaceitável ignorarmos o risco...'" },
    ],
    correta: "D",
    explicacao:
      "Adjetivos moralizantes e opiniões formam a Tese. A palavra 'inaceitável' emite juízo de valor argumentativo.",
  },
  {
    id: 504,
    pergunta:
      "A CESGRANRIO costuma misturar tipos. Se um texto conta 'Em 2005 foi descoberto o Pré-Sal' e logo emenda 'Essa reserva profunda provou que a Petrobras domina águas profundas, sendo esse nosso maior orgulho', o autor:",
    opcoes: [
      { label: "A", valor: "Fez uma narração objetiva do início ao fim." },
      {
        label: "B",
        valor:
          "Foi de uma sequencia temporal (narração/exposição histórica) para uma opinião argumentativa.",
      },
      { label: "C", valor: "Apresenta apenas descrição." },
      { label: "D", valor: "Comete erro de coerência." },
    ],
    correta: "B",
    explicacao:
      "Primeiro relata fatos no tempo, depois emite opinião ('nosso maior orgulho', 'provou'). É o hibridismo tipológico clássico.",
  },
  {
    id: 505,
    pergunta:
      "A Crônica (gênero) tem como característica a mistura de quais Tipos Textuais geralmente?",
    opcoes: [
      { label: "A", valor: "Somente injunção e descrição." },
      {
        label: "B",
        valor:
          "Narração (conta fatos do cotidiano) e Argumentação/Reflexão (sobre esses mesmos fatos).",
      },
      {
        label: "C",
        valor: "Dissertação acadêmica misturada com manuais injuntivos.",
      },
      { label: "D", valor: "Sem características tipológicas definidas." },
    ],
    correta: "B",
    explicacao:
      "A crônica aborda um fato do dia a dia (Narração base) e então tece considerações e opiniões sobre ele (Dissertação argumentativa reflexiva).",
  },
  {
    id: 506,
    pergunta:
      "A frase: 'O Sol batia forte e a brisa era seca' pertence a qual Tipo Textual?",
    opcoes: [
      {
        label: "A",
        valor: "Descritivo, detalhando uma cena/ambiente no momento.",
      },
      {
        label: "B",
        valor: "Narrativo, contando uma sequência veloz de ações no passado.",
      },
      { label: "C", valor: "Expositivo, explicando cientificamente a seca." },
      { label: "D", valor: "Injuntivo, alertando sobre a seca." },
    ],
    correta: "A",
    explicacao:
      "Mostra características sensoriais fixas (luz e vento) configurando uma fotografia local, ou seja, descrição.",
  },
];

// ============================================================================
// DADOS ESTÁTICOS & HELPERS EXTERNIZADOS
// ============================================================================

const GENERO_VS_TIPO_FLIPS = [
  {
    frente: (
      <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
        <span className="font-bold text-3xl md:text-4xl bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
          Tipo Textual
        </span>
        <span className="font-medium text-lg text-foreground/80 mt-2">
          (Narração, Descrição...)
        </span>
      </div>
    ),
    verso: (
      <div className="flex flex-col justify-center h-full space-y-4 text-center text-sm p-4">
        <p>
          <strong>São poucos e rígidos.</strong>
        </p>
        <p className="text-muted-foreground">
          Forma estrutural profunda (como a gramática visual e lógica). Existem
          cerca de 5 ou 6 tipos.
        </p>
      </div>
    ),
  },
  {
    frente: (
      <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
        <LuArrowRight className="w-10 h-10 text-muted-foreground/40" />
      </div>
    ),
    verso: (
      <div className="flex flex-col justify-center h-full text-center text-sm p-4">
        <p className="font-bold text-amber-500">
          MÚLTIPLOS GÊNEROS DEVORAM OS TIPOS
        </p>
      </div>
    ),
  },
  {
    frente: (
      <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
        <span className="font-bold text-3xl md:text-4xl bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          Gênero Textual
        </span>
        <span className="font-medium text-lg text-foreground/80 mt-2">
          (Crônica, Notícia...)
        </span>
      </div>
    ),
    verso: (
      <div className="flex flex-col justify-center h-full space-y-4 text-center text-sm p-4">
        <p>
          <strong>São infinitos e sociais.</strong>
        </p>
        <p className="text-muted-foreground">
          Textos prontos da sociedade. Uma <strong>crônica</strong> (gênero) tem
          base na <strong>narração</strong> (tipo).
        </p>
      </div>
    ),
  },
];

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function AulaTiposTextuais({
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

  const [qMod1, setQMod1] = useState<QuizQuestion[]>([]);
  const [qMod2, setQMod2] = useState<QuizQuestion[]>([]);
  const [qMod3, setQMod3] = useState<QuizQuestion[]>([]);
  const [qMod4, setQMod4] = useState<QuizQuestion[]>([]);
  const [qLab, setQLab] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    setQMod1(getRandomQuestions(QUIZ_MOD1_POOL, 6));
    setQMod2(getRandomQuestions(QUIZ_MOD2_POOL, 6));
    setQMod3(getRandomQuestions(QUIZ_MOD3_POOL, 6));
    setQMod4(getRandomQuestions(QUIZ_MOD4_POOL, 6));
    setQLab(
      getRandomQuestions(
        [
          ...QUIZ_MOD1_POOL,
          ...QUIZ_MOD2_POOL,
          ...QUIZ_MOD3_POOL,
          ...QUIZ_MOD4_POOL,
          ...QUIZ_MOD5_POOL,
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
      {/* ─── MÓDULO 1 ─── */}
      <TabsContent value="modulo-1" className="space-y-[50px]">
        <ModuleBanner
          numero={1}
          titulo="Narrativo & Descritivo"
          descricao="Estudo sistemático da evolução temporal (ação) contraposta à observação espacial (fotografia)."
          gradiente="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-600"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={1}
            title="A Dinâmica da Narração"
            description="Entenda como a sucessão de fatos no tempo cria o enredo e a progressão narrativa."
            variant="indigo"
          />

          <ContentAccordion
            mode="stacked"
            titulo="Elementos e Estrutura Narrativas"
            icone={<LuBookOpen />}
            corIndicador="bg-emerald-500"
            defaultOpen={true}
            slidesPerView={1}
            slides={[
              {
                titulo: "1. O que é Narrar?",
                icone: "📖",
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      <strong>Conceito:</strong> Narrar é relatar uma sucessão
                      de acontecimentos num determinado <strong>espaço</strong>{" "}
                      e <strong>tempo</strong> (seja ele real ou cronológico).
                      Exige mudança de estado: algo <em>era</em> de um jeito e{" "}
                      <em>passou a ser</em> de outro.
                    </p>
                    <div className="bg-emerald-500/10 p-5 rounded-xl border border-emerald-500/20 text-sm space-y-2">
                      <p>
                        ✅{" "}
                        <em>
                          "Às 8h, o técnico apertou o botão de emergência.
                          Imediatamente a válvula fechou e a sirene tocou."
                        </em>
                      </p>
                      <p className="text-muted-foreground pt-2">
                        Temos <strong>tempo</strong> (às 8h, imediatamente),{" "}
                        <strong>personagem</strong> (técnico) e{" "}
                        <strong>ação no passado</strong> (apertou, fechou,
                        tocou), caracterizando clara mudança de estado.
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "2. Foco Narrativo",
                icone: "👀",
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      <strong>Conceito:</strong> É a perspectiva de quem conta a
                      história (o narrador). Pode ser em 1ª Pessoa ou 3ª Pessoa.
                    </p>
                    <div className="space-y-3">
                      <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 text-sm">
                        <p className="font-bold text-emerald-700 dark:text-emerald-400">
                          1ª Pessoa (Narrador Personagem)
                        </p>
                        <p>
                          Participa da história. A visão é parcia e subjetiva.
                        </p>
                        <p className="mt-2 text-muted-foreground italic">
                          "<strong>Eu notei</strong> que o manômetro tremia
                          quando <strong>me aproximei</strong>."
                        </p>
                      </div>
                      <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 text-sm">
                        <p className="font-bold text-emerald-700 dark:text-emerald-400">
                          3ª Pessoa (Narrador Observador / Onisciente)
                        </p>
                        <p>
                          Não participa. Se for 'Observador', vê de fora. Se for
                          'Onisciente', sabe até os pensamentos.
                        </p>
                        <p className="mt-2 text-muted-foreground italic">
                          "Ele notou o vazamento, mas no fundo,{" "}
                          <strong>sentia que a culpa era sua</strong>."
                          (Onisciente)
                        </p>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "3. Tipos de Discurso",
                icone: "💬",
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Como o narrador reproduz a fala ou pensamento da
                      personagem.
                    </p>
                    <ul className="space-y-4">
                      <li className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 text-sm">
                        <strong>Discurso Direto:</strong> A própria personagem
                        fala. (Usa verbo de elocução + aspas/travessão).
                        <br />
                        <span className="text-muted-foreground italic">
                          Ex: O gerente gritou: — Parem as máquinas!
                        </span>
                      </li>
                      <li className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 text-sm">
                        <strong>Discurso Indireto:</strong> O narrador conta o
                        que a personagem falou. (Usa conjunção integrante "que"
                        ou "se").
                        <br />
                        <span className="text-muted-foreground italic">
                          Ex: O gerente gritou que eles parassem as máquinas.
                        </span>
                      </li>
                      <li className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 text-sm border-l-4 border-l-emerald-500">
                        <strong>Discurso Indireto Livre:</strong> A mais
                        cobrada! A fala/pensamento da personagem se confunde com
                        a narração, sem verbo de elocução. Fundem-se narrador e
                        personagem.
                        <br />
                        <span className="text-muted-foreground italic">
                          Ex: Ele olhava o painel soando o alarme. Meu Deus, o
                          que eu faço agora? Onde está o supervisor?
                        </span>
                      </li>
                    </ul>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="O Quadro Estático: Descrição"
            description="Capture o ambiente e os personagens através de detalhes sensoriais e adjetivação precisa."
            variant="indigo"
          />

          <AlertBox tipo="info" titulo="O Conceito Central">
            Enquanto a narração é um "filme" (progressão temporal de ações), a{" "}
            <strong>descrição</strong> é uma "fotografia" (caracterização
            simultânea, sem tempo passando). Predominam verbos de estado (ser,
            estar, parecer) e muitos adjetivos.
          </AlertBox>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                  <span className="font-bold text-2xl md:text-3xl bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                    Descrição Objetiva
                  </span>
                  <span className="text-muted-foreground mt-2">
                    Foca na realidade visível.
                  </span>
                </div>
              }
              verso={
                <div className="flex flex-col justify-center h-full space-y-4 text-center text-sm p-4">
                  <p>
                    Fiel à realidade, neutra, exata. Usa palavras no sentido
                    denotativo. Muito comum em manuais técnicos.
                  </p>
                  <div className="bg-emerald-500/10 p-3 rounded text-left">
                    <p className="italic text-muted-foreground">
                      "A tubulação tem 30 polegadas de diâmetro externo,
                      revestimento epóxi cinza-escuro e apresenta duas válvulas
                      amarelas no topo."
                    </p>
                  </div>
                </div>
              }
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                  <span className="font-bold text-2xl md:text-3xl bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                    Descrição Subjetiva
                  </span>
                  <span className="text-muted-foreground mt-2">
                    Foca no "sentir" do narrador.
                  </span>
                </div>
              }
              verso={
                <div className="flex flex-col justify-center h-full space-y-4 text-center text-sm p-4">
                  <p>
                    Passa pelo "filtro" da emoção de quem descreve. Usa
                    linguagem conotativa e juízos de valor. Comum na literatura.
                  </p>
                  <div className="bg-teal-500/10 p-3 rounded text-left">
                    <p className="italic text-muted-foreground">
                      "A tubulação parecia um monstro cinzento e cansado, cujos
                      braços amarelos no topo erguiam-se como súplicas ao teto
                      opressivo."
                    </p>
                  </div>
                </div>
              }
            />
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={3}
            title="Resumo e Multimídia"
            description="Recursos visuais e auditivos para fixar os conceitos de narração e descrição."
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
                        title="Narração x Descrição"
                        duration="12:00"
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
                        title: "Mapa Mental: Narração vs Descrição",
                        type: "Mapa Mental",
                        placeholderColor:
                          "bg-emerald-100 dark:bg-emerald-900/30",
                      },
                      {
                        title: "Fluxograma: Identificando o Tipo",
                        type: "Diagrama",
                        placeholderColor: "bg-teal-100 dark:bg-teal-900/30",
                      },
                      {
                        title: "Infográfico: Tempos Verbais",
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
                icon: LuBrain,
                content: (
                  <div className="text-center p-8 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-2xl border border-emerald-500/10">
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      A Prova do Vídeo
                    </h3>
                    <div className="text-7xl my-8 animate-bounce">▶️ ⏸️ 🎬</div>
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                      "Se você aperta{" "}
                      <span className="text-emerald-600 font-bold">▶ PLAY</span>{" "}
                      (há ação), é Narração. Se aperta{" "}
                      <span className="text-emerald-600 font-bold">
                        ⏸ PAUSE
                      </span>{" "}
                      para observar detalhes, é Descrição!"
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
                        titulo="Rap da Tipologia"
                        artista="Prof. André"
                        capaUrl="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop"
                        lyrics={`(Verso 1)
Narrar é ação, o tempo avança sem parar
Pretérito perfeito vem pra comandar
Descrever é foto, o tempo congela
Imperfeito domina, verbo de ligação revela!

(Refrão)
Play ou Pause, qual vai ser?
A tipologia você vai entender!
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
            titulo="Quiz — Narrativo e Descritivo"
            icone="📝"
            numero={4}
            variant="indigo"
            onComplete={(score) => handleModuleComplete("modulo-1", score)}
          />
        </section>
      </TabsContent>

      {/* =======================================================
                        MÓDULO 2: Dissertativo
                    ======================================================= */}
      <TabsContent value="modulo-2" className="space-y-[50px]">
        <ModuleBanner
          numero={2}
          titulo="Dissertativo"
          descricao="A arte de expor a realidade e usar argumentos lógicos para convencer o leitor."
          gradiente="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={1}
            title="Expor vs. Argumentar"
            description="Diferencie a neutralidade da informação da força persuasiva da defesa de uma ideia."
            variant="emerald"
          />

          <AlertBox tipo="warning" titulo="O Ponto de Virada">
            O erro número 1 em provas de Interpretação da CESGRANRIO é confundir
            a Dissertação <strong>Expositiva</strong> (foco na isenção) com a
            Dissertação <strong>Argumentativa</strong> (foco na defesa da tese).
            A banca testará seu discernimento sobre isso.
          </AlertBox>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                  <span className="font-bold text-2xl md:text-3xl bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                    Dissertar = Expor
                  </span>
                  <span className="text-muted-foreground mt-2">
                    Apenas informar (Apresentador de Telejornal)
                  </span>
                </div>
              }
              verso={
                <div className="flex flex-col justify-center h-full space-y-4 text-center text-sm p-4">
                  <p>
                    Apresenta fatos, teorias, dados, de modo neutro e impessoal.
                    Não tenta mudar sua opinião, apenas acrescenta conhecimento.
                  </p>
                  <div className="bg-blue-500/10 p-3 rounded text-left">
                    <p className="italic text-muted-foreground">
                      "A perfuração em águas ultraprofundas começou em 2006,
                      atingindo 7 mil metros de profundidade com navios-sonda de
                      posicionamento dinâmico."
                    </p>
                  </div>
                </div>
              }
            />
            <FlipCard
              frente={
                <div className="flex flex-col items-center justify-center text-center space-y-4 h-full">
                  <span className="font-bold text-2xl md:text-3xl bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent">
                    Dissertar = Argumentar
                  </span>
                  <span className="text-muted-foreground mt-2">
                    Defender ideia (Advogado de Defesa)
                  </span>
                </div>
              }
              verso={
                <div className="flex flex-col justify-center h-full space-y-4 text-center text-sm p-4">
                  <p>
                    Apresenta um posicionamento pessoal (Tese) e tenta persuadir
                    o leitor usando provas, causas/consequências e exemplos.
                  </p>
                  <div className="bg-indigo-500/10 p-3 rounded text-left">
                    <p className="italic text-muted-foreground">
                      "É inegável que a tecnologia de águas rasas está obsoleta
                      e, portanto, investir nela atualmente é um erro
                      estratégico imenso para qualquer petroleira."
                    </p>
                  </div>
                </div>
              }
            />
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="A Estrutura do Texto Argumentativo"
            description="Do embrião da tese à solidez da conclusão: o esqueleto da persuasão."
            variant="emerald"
          />

          <ContentAccordion
            mode="stacked"
            titulo="Os Três Pilares da Persuasão"
            icone={<LuFileText />}
            corIndicador="bg-blue-500"
            defaultOpen={true}
            slidesPerView={1}
            slides={[
              {
                titulo: "1. A Tese (Introdução)",
                icone: "🎯",
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      <strong>Conceito:</strong> É a ideia central, o
                      posicionamento, a espinha dorsal de todo o discurso. Todo
                      o texto existirá apenas para provar que a Tese é
                      verdadeira.
                    </p>
                    <div className="bg-blue-500/10 p-5 rounded-xl border border-blue-500/20 text-sm space-y-2">
                      <p>
                        ✅{" "}
                        <em>
                          "A falta de investimento na reciclagem preventiva nos
                          pólos industriais{" "}
                          <strong>
                            condena a empresa a prejuízos irreversíveis
                          </strong>
                          ."
                        </em>
                      </p>
                      <p className="text-muted-foreground pt-2">
                        A expressão valorativa ("condena", "irreversíveis") não
                        é um fato matemático puro, mas uma opinião rigorosa
                        sendo plantada para debate.
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                titulo: "2. Os Argumentos (Desenvolvimento)",
                icone: "⚖️",
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      São as provas utilizadas para validar a tese. A CESGRANRIO
                      gosta de cobrar quais <strong>tipos de argumento</strong>{" "}
                      foram usados num parágrafo.
                    </p>
                    <ul className="space-y-4">
                      <li className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 text-sm">
                        <strong>Autoridade:</strong> "Como atesta o relatório do
                        IBAMA de 2025, os vazamentos..." (Citar
                        especialista/órgão).
                      </li>
                      <li className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 text-sm">
                        <strong>Exemplificação:</strong> "...isso já ocorreu
                        antes, a exemplo do desastre no terminal X ocorrido na
                        década passada..."
                      </li>
                      <li className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 text-sm">
                        <strong>Causa e Consequência:</strong> "As tubulações
                        não foram limpas (causa), culminando na pressão máxima
                        (consequência)."
                      </li>
                    </ul>
                  </div>
                ),
              },
              {
                titulo: "3. Conclusão",
                icone: "🏁",
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Não se adiciona teoria nova. O autor retoma a tese
                      inicial, amarra as ideias e geralmente faz um fechamento
                      crítico (ou apresenta uma solução/proposta de
                      intervenção).
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={3}
            title="Resumo e Multimídia"
            description="Consolide as estratégias de argumentação e exposição com ferramentas multimídia."
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
                        title="Dissertação: Expor x Argumentar"
                        duration="15:00"
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
                        title: "Mapa Mental: Expositivo vs Argumentativo",
                        type: "Mapa Mental",
                        placeholderColor: "bg-blue-100 dark:bg-blue-900/30",
                      },
                      {
                        title: "Tabela: Características Comparativas",
                        type: "Tabela",
                        placeholderColor: "bg-indigo-100 dark:bg-indigo-900/30",
                      },
                      {
                        title: "Infográfico: Estrutura Argumentativa",
                        type: "Infográfico",
                        placeholderColor:
                          "bg-emerald-100 dark:bg-emerald-900/30",
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
                      A Busca pela Culpa
                    </h3>
                    <div className="text-7xl my-8 animate-bounce">🔍 ⚖️ 📝</div>
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                      "'Houve vazamento...' ={" "}
                      <span className="text-blue-600 font-bold">FATO</span>{" "}
                      (expositivo). 'O lamentável vazamento decorreu de grave
                      negligência...' ={" "}
                      <span className="text-blue-600 font-bold">
                        JULGAMENTO
                      </span>{" "}
                      (argumentativo)."
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
                        titulo="Funk da Dissertação"
                        artista="Prof. André"
                        capaUrl="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop"
                        lyrics={`(Verso 1)
Expositivo informa, só passa o fato
Sem opinião, sem julgamento, é exato
Argumentativo defende uma tese
Adjetivo opinativo? Já se reconhece!

(Refrão)
Procura a culpa, procura a opinião
Se tem julgamento, é argumentação!
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
            titulo="Quiz — Expor x Argumentar"
            icone="⚖️"
            numero={4}
            variant="emerald"
            onComplete={(score) => handleModuleComplete("modulo-2", score)}
          />
        </section>
      </TabsContent>

      {/* =======================================================
                        MÓDULO 3: Injuntivo e Dialogal
                    ======================================================= */}
      <TabsContent
        value="modulo-3"
        className="space-y-16 mt-6 focus-visible:outline-none"
      >
        <ModuleBanner
          numero={3}
          titulo="Injuntivo & Dialogal"
          descricao="A técnica das instruções, manuais, procedimentos normativos industriais e do diálogo."
          gradiente="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={1}
            title="Tipo Injuntivo (Instrucional)"
            description="O comando para a ação: como os textos ditam normas, procedimentos e instruções."
            variant="violet"
          />

          <AlertBox
            tipo="success"
            titulo="Muito comum num ambiente operacional"
          >
            Para quem faz concurso Petrobras ou Transpetro, os textos que
            regulamentam a área (Normas NR, Procedimentos de Operação Padrão -
            POP, Manuais de Ferramentas) são predominantemente do tipo{" "}
            <strong>Injuntivo</strong>.
          </AlertBox>

          <CardCarousel
            cards={[
              {
                icone: <LuTriangleAlert className="text-indigo-500" />,
                titulo: "Objetivo Final",
                descricao: (
                  <div className="space-y-2 text-sm">
                    <p>
                      Instruir, ordenar, aconselhar ou modificar o comportamento
                      do receptor da mensagem externa.
                    </p>
                  </div>
                ),
              },
              {
                icone: <LuCheck className="text-indigo-500" />,
                titulo: "A Marca do Imperativo",
                descricao: (
                  <div className="space-y-2 text-sm">
                    <p>
                      O <strong>Verbo no Imperativo</strong> (Faça, Desligue,
                      Mantenha) é o grande rastro deste tipo. Também se aceita o
                      infinitivo impessoal (Desligar, Manter).
                    </p>
                  </div>
                ),
              },
              {
                icone: <LuBookOpen className="text-indigo-500" />,
                titulo: "Gêneros Associados",
                descricao: (
                  <div className="space-y-2 text-sm">
                    <p>
                      Manuais, Manuais de calibração, Regimentos, Receitas,
                      Editais de concurso, Bulas.
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="Tipo Dialogal (Conversacional)"
            description="A interação em turnos: a estrutura das falas, entrevistas e diálogos textuais."
            variant="violet"
          />

          <ContentAccordion
            mode="stacked"
            titulo="A Troca de Turnos"
            icone={<LuMessageCircle />}
            corIndicador="bg-indigo-500"
            defaultOpen={true}
            slidesPerView={1}
            slides={[
              {
                titulo: "A Dança da Comunicação Direta",
                icone: "🗨️",
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      O tipo <strong>dialogal</strong> baseia-se na troca
                      sucessiva de "turnos de fala" (quem fala e quem escuta
                      invertem os papéis constantemente). É a transcrição da
                      interação.
                    </p>
                    <div className="bg-indigo-500/10 p-5 rounded-xl border border-indigo-500/20 text-sm space-y-2">
                      <p>— Você isolou a válvula três?</p>
                      <p>— Sim, senhor. A pressão zerou às quatorze.</p>
                      <p>— Perfeito. Iniciaremos o expurgo.</p>
                    </div>
                    <p className="text-muted-foreground text-sm pt-2">
                      Na interpretação cesgranrio, a conversa transcrita
                      (entrevista, peça de teatro) constitui este tipo autônomo.
                      É repleto de <strong>tópicos e interrupções</strong>.
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={3}
            title="Resumo e Multimídia"
            description="Vídeos e alertas sobre o uso de manuais e diálogos em ambientes operacionais."
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
                        title="Injunção e Diálogo"
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
                        title: "Mapa Mental: Injuntivo",
                        type: "Mapa Mental",
                        placeholderColor: "bg-indigo-100 dark:bg-indigo-900/30",
                      },
                      {
                        title: "Tabela: Imperativo na Prática",
                        type: "Tabela",
                        placeholderColor: "bg-blue-100 dark:bg-blue-900/30",
                      },
                      {
                        title: "Infográfico: Dialogal em Provas",
                        type: "Infográfico",
                        placeholderColor:
                          "bg-emerald-100 dark:bg-emerald-900/30",
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
                  <div className="text-center p-8 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 rounded-2xl border border-indigo-500/10">
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      Identificando o Imperativo
                    </h3>
                    <div className="text-7xl my-8 animate-bounce">🛡️ ❗ 📋</div>
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                      "Procure verbos como '
                      <span className="text-indigo-600 font-bold">Ligue</span>
                      ', '
                      <span className="text-indigo-600 font-bold">Aplique</span>
                      ', '
                      <span className="text-indigo-600 font-bold">Cuidado</span>
                      '. Dois a três desses e já é{" "}
                      <span className="text-indigo-600 font-bold">
                        Injuntivo
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
                        titulo="Samba da Injunção"
                        artista="Prof. André"
                        capaUrl="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1000&auto=format&fit=crop"
                        lyrics={`(Verso 1)
Injuntivo manda, ordena e instrui
Imperativo forte, o texto conduz
Dialogal conversa, tem turno de fala
Discurso direto que nunca se cala!

(Refrão)
Ligue, aplique, faça agora
Imperativo na prova, injunção aflora!
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
            titulo="Quiz — Injunção"
            icone="📋"
            numero={4}
            variant="violet"
            onComplete={(score) => handleModuleComplete("modulo-3", score)}
          />
        </section>
      </TabsContent>

      {/* =======================================================
                        MÓDULO 4: Gêneros vs. Tipos
                    ======================================================= */}
      <TabsContent
        value="modulo-4"
        className="space-y-16 mt-6 focus-visible:outline-none"
      >
        <ModuleBanner
          numero={4}
          titulo="Gêneros vs. Tipos"
          descricao="A armadilha clássica da CESGRANRIO: diferenciar a base estrutural (tipo) do uso social (gênero)."
          gradiente="bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-700"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={1}
            title="A Grande Confusão"
            description="Aprenda a não confundir o gênero social com a base tipológica do texto."
            variant="amber"
          />

          <AlertBox tipo="warning" titulo="Terminologia da CESGRANRIO">
            Se a questão disser: "O texto pertence ao <strong>gênero</strong>
            ...", procure opções como Crônica, Artigo de Opinião, Reportagem,
            Ofício.
            <br />
            Se a questão disser: "O texto tem{" "}
            <strong>tipologia / sequência / modo de organização</strong>
            ...", procure opções como Narrativo, Descritivo, Dissertativo ou
            Injuntivo.
          </AlertBox>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {GENERO_VS_TIPO_FLIPS.map((flip, idx) => (
              <FlipCard
                key={`flip-genero-${idx}`}
                frente={flip.frente}
                verso={flip.verso}
              />
            ))}
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={2}
            title="A Sobreposição (Hibridismo)"
            description="Identifique como diferentes tipos textuais se fundem para formar gêneros complexos."
            variant="amber"
          />

          <ContentAccordion
            mode="stacked"
            titulo="Os Gêneros são Misturas"
            icone={<LuBookOpen />}
            corIndicador="bg-amber-500"
            defaultOpen={true}
            slidesPerView={1}
            slides={[
              {
                titulo: "Crônica (Gênero)",
                icone: "☕",
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Normalmente, uma crônica parte de um fato do cotidiano
                      (Narração) e depois o autor emite opiniões e reflexões
                      sobre esse fato (Dissertação Argumentativa). Logo, a
                      crônica é um gênero híbrido com{" "}
                      <strong>Tipo Narrativo + Dissertativo</strong>.
                    </p>
                  </div>
                ),
              },
              {
                titulo: "Relatório Técnico (Gênero)",
                icone: "📊",
                conteudo: (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Muito usado na Petrobras. Tem como base o{" "}
                      <strong>Tipo Descritivo</strong> (para caracterizar o
                      equipamento/furo) mas pode conter{" "}
                      <strong>Tipo Dissertativo-Expositivo</strong> para relatar
                      fatos técnicos, e até <strong>Injuntivo</strong> se
                      recomendar manutenções.
                    </p>
                  </div>
                ),
              },
            ]}
          />
        </section>

        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={3}
            title="Resumo e Multimídia"
            description="Ferramentas para mapear gêneros e tipos em questões da Cesgranrio."
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
                        title="Gênero x Tipo"
                        duration="8:00"
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
                        title: "Mapa Mental: Gênero vs Tipo",
                        type: "Mapa Mental",
                        placeholderColor: "bg-amber-100 dark:bg-amber-900/30",
                      },
                      {
                        title: "Tabela: Motor vs Carcaça",
                        type: "Tabela",
                        placeholderColor: "bg-orange-100 dark:bg-orange-900/30",
                      },
                      {
                        title: "Infográfico: Hibridismo Textual",
                        type: "Infográfico",
                        placeholderColor:
                          "bg-emerald-100 dark:bg-emerald-900/30",
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
                      O Guarda-Chuva
                    </h3>
                    <div className="text-7xl my-8 animate-bounce">🚗 ⚙️ ☔</div>
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                      "Gênero ={" "}
                      <span className="text-amber-600 font-bold">
                        carcaça do carro
                      </span>{" "}
                      (infinitos designs). Tipo ={" "}
                      <span className="text-amber-600 font-bold">motor</span>{" "}
                      (poucos: elétrico, combustão). A prova quer saber como o
                      motor funciona!"
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
                        titulo="Bossa do Gênero"
                        artista="Prof. André"
                        capaUrl="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000&auto=format&fit=crop"
                        lyrics={`(Verso 1)
Gênero é o formato, o design exterior
Tipo é a essência, o motor interior
Crônica narra, editorial argumenta
O tipo textual é que fundamenta!

(Refrão)
Não confunda forma com função
Gênero e tipo, essa é a lição!
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
            titulo="Quiz — Diferenciando"
            icone="🔍"
            numero={4}
            variant="amber"
            onComplete={(score) => handleModuleComplete("modulo-4", score)}
          />
        </section>
      </TabsContent>

      {/* =======================================================
                        MÓDULO 5: Laboratório Final
                    ======================================================= */}
      <TabsContent
        value="modulo-5"
        className="space-y-16 mt-6 focus-visible:outline-none"
      >
        <ModuleBanner
          numero={5}
          titulo="Laboratório CESGRANRIO"
          descricao="Revisão geral e simulado final cruzando todos os tipos textuais operacionais."
          gradiente="bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700"
        />

        <section className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm space-y-12">
          <ModuleSectionHeader
            index={1}
            title="Revisão Final Turbo"
            description="O último checklist para garantir o acerto em qualquer questão de tipologia."
            variant="rose"
          />

          <div className="space-y-6">
            <TimelineItem
              passo={1}
              titulo="Focou no passado e tem Personagem?"
              descricao="Temos Narração. Procure verbos no Pretérito Perfeito."
            />
            <TimelineItem
              passo={2}
              titulo="Paralisou a cena para detalhar objetos ou sentimentos?"
              descricao="Temos Descrição. Adjetivos reinam."
            />
            <TimelineItem
              passo={3}
              titulo="Está dando ordem com verbo imperativo (Ligue/Aperte)?"
              descricao="Temos Injunção. É o manual técnico de operação."
            />
            <TimelineItem
              passo={4}
              titulo="Sobra a Dissertação. Tem opinião (bom/ruim)?"
              descricao="Sim: Argumentativa (Tese). Não: Expositiva (Apenas informa)."
              isLast
            />
          </div>
        </section>

        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm space-y-8">
          <ModuleSectionHeader
            index={2}
            title="Resumo e Multimídia"
            description="Consolidação geral de todas as tipologias estudadas nesta unidade."
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
                        title="Revisão Turbo: 5 Tipos Textuais"
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
                        title: "Quadro Mestre: 5 Tipos",
                        type: "Mapa Mental",
                        placeholderColor: "bg-violet-100 dark:bg-violet-900/30",
                      },
                      {
                        title: "Tabela: Cesgranrio na Prática",
                        type: "Tabela",
                        placeholderColor: "bg-indigo-100 dark:bg-indigo-900/30",
                      },
                      {
                        title: "Infográfico: Petrobras e Tipologia",
                        type: "Infográfico",
                        placeholderColor:
                          "bg-emerald-100 dark:bg-emerald-900/30",
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
                  <div className="text-center p-8 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 rounded-2xl border border-violet-500/10">
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      Hora do Show
                    </h3>
                    <div className="text-7xl my-8 animate-bounce">🎤 🎯 🏆</div>
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                      "Ensina a usar EPI?{" "}
                      <span className="text-violet-600 font-bold">
                        INJUNTIVO
                      </span>
                      . Explica o Pré-Sal sem opinar?{" "}
                      <span className="text-violet-600 font-bold">
                        DISSERTATIVO-EXPOSITIVO
                      </span>
                      . A Cesgranrio AMA essa diferença!"
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
                        titulo="Hino da Tipologia"
                        artista="Prof. André"
                        capaUrl="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1000&auto=format&fit=crop"
                        lyrics={`(Verso 1)
Cinco tipos textuais, decore já
Narrar, descrever, dissertar sem parar
Injungir ordena, dialogal conversa
Na Cesgranrio essa matéria é diversa!

(Refrão)
Play ou Pause, fato ou opinião
Imperativo manda, é a tipologia em ação!
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
            questoes={qLab}
            titulo="Simulado Final — Tipologia (Cesgranrio)"
            icone="🏆"
            numero={3}
            variant="rose"
            onComplete={(score) => handleModuleComplete("modulo-5", score)}
          />
        </section>

        {/* Botão de Conclusão */}
        <section className="flex justify-center pt-8 pb-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-12 py-6 rounded-2xl text-lg font-bold shadow-xl shadow-violet-500/20 hover:shadow-2xl hover:shadow-violet-500/30 transition-all duration-300 hover:scale-105"
            onClick={onComplete}
            disabled={completedModules.size < MODULE_DEFS.length}
          >
            <LuCheck className="mr-2" /> Concluir Aula de Tipos Textuais
          </Button>
        </section>
      </TabsContent>
    </AulaTemplate>
  );
}
