import { QuizQuestion } from "../../shared";

export const QUIZ_ESSENCIAIS_POOL: QuizQuestion[] = [
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

export const QUIZ_INTEGRANTES_POOL: QuizQuestion[] = [
  {
    id: 201,
    pergunta: "Em 'A Petrobras necessita de investimentos', o termo em destaque é:",
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
    pergunta: "Na frase 'O contrato foi assinado pelo diretor', o termo em destaque é:",
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

export const QUIZ_ACESSORIOS_POOL: QuizQuestion[] = [
  {
    id: 301,
    pergunta: "Na oração 'Ontem, o navio chegou ao porto', os termos em destaque são:",
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
    pergunta: "Em 'Petróleo, ouro negro, é vital', o termo em destaque é:",
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
    pergunta: "Assinale a alternativa que contém um Adjunto Adnominal:",
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
      "Identifique o termo destacado em 'Meu carro de corrida bateu':",
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

export const QUIZ_LABORATORIO_POOL: QuizQuestion[] = [
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
      "Em 'A Petrobras tem orgulho de seus funcionários', a expressão em destaque atua como:",
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
