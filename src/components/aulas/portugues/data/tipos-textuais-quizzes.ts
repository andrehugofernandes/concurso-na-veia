import { QuizQuestion } from "../../shared";

export const QUIZ_MOD1_POOL: QuizQuestion[] = [
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
    pergunta: "Uma descrição subjetiva difere de uma objetiva porque:",
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

export const QUIZ_MOD2_POOL: QuizQuestion[] = [
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
      "Para fundamentar a informação, citou-se uma institution de renome e especialista no assunto (ANP). Isso é argumento de autoridade.",
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

export const QUIZ_MOD3_POOL: QuizQuestion[] = [
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

export const QUIZ_MOD4_POOL: QuizQuestion[] = [
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

export const QUIZ_MOD5_POOL: QuizQuestion[] = [
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
