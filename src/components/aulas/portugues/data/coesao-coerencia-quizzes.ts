import { QuizQuestion } from "../../shared";

// ============================================================================
// MÓDULO 1: O TECIDO DO TEXTO (COESÃO vs COERÊNCIA)
// ============================================================================
export const QUIZ_M1_COESAO: QuizQuestion[] = [
  {
    id: 101,
    pergunta: "Sobre a diferença entre coesão e coerência, assinale a alternativa correta:",
    opcoes: [
      { label: "A", valor: "Um texto coeso é obrigatoriamente um texto coerente." },
      { label: "B", valor: "A coesão trata da estrutura gramatical, enquanto a coerência trata da unidade de sentido." },
      { label: "C", valor: "A coerência é um recurso puramente linguístico, independente do conhecimento de mundo." },
      { label: "D", valor: "A coesão é o conteúdo e a coerência é a forma." },
    ],
    correta: "B",
    explicacao: "A coesão é a conexão material (palavras, conectivos) e a coerência é a harmonia das ideias (sentido). É possível ter coesão sem coerência, mas não o contrário em textos eficazes.",
  },
  {
    id: 102,
    pergunta: "Em um relatório técnico, a frase 'O duto apresentou vazamento, por isso a pressão aumentou' é um exemplo de:",
    opcoes: [
      { label: "A", valor: "Incoerência interna, pois vazamento diminui a pressão." },
      { label: "B", valor: "Coesão sequencial estabelecida por conjunção conclusiva." },
      { label: "C", valor: "Anáfora catafórica do termo 'pressão'." },
      { label: "D", valor: "Ausência total de elementos coesivos." },
    ],
    correta: "B",
    explicacao: "O uso de 'por isso' estabelece uma conexão lógica de conclusão/consequência entre a causa (vazamento) e o efeito (aumento de pressão - embora fisicamente pudesse ser o contrário, sintaticamente a coesão é conclusiva).",
  },
  {
    id: 103,
    pergunta: "Um texto que apresenta muitas conjunções, mas cujas ideias se contradizem, é um texto:",
    opcoes: [
        { label: "A", valor: "Coeso e coerente." },
        { label: "B", valor: "Coerente, mas não coeso." },
        { label: "C", valor: "Coeso, mas incoerente." },
        { label: "D", valor: "Nem coeso, nem coerente." },
    ],
    correta: "C",
    explicacao: "A presença de conjunções garante a coesão (conexão entre frases), mas a contradição de ideias gera incoerência (falta de sentido lógico).",
  },
  {
    id: 104,
    pergunta: "A coerência externa (pragmática) depende fundamentalmente de:",
    opcoes: [
        { label: "A", valor: "Uso correto da vírgula." },
        { label: "B", valor: "Conhecimento de mundo compartilhado entre autor e leitor." },
        { label: "C", valor: "Repetição de sinônimos." },
        { label: "D", valor: "Uso de pronomes relativos." },
    ],
    correta: "B",
    explicacao: "A coerência pragmática avalia se o texto faz sentido em relação à realidade e ao contexto em que está inserido.",
  },
  {
    id: 105,
    pergunta: "A coesão é fundamental para a fluidez do texto porque:",
    opcoes: [
        { label: "A", valor: "Evita que o leitor precise de dicionário." },
        { label: "B", valor: "Permite que as partes do texto se 'amarrem', facilitando a progressão." },
        { label: "C", valor: "Garante que o autor nunca mude de ideia." },
        { label: "D", valor: "Torna o texto mais longo e impressionante." },
    ],
    correta: "B",
    explicacao: "Sem coesão, o texto pareceria uma lista de frases soltas. Ela cria o 'fio condutor' que guia o leitor.",
  }
];

// ============================================================================
// MÓDULO 2: O PODER DO RETROVISOR (ANÁFORA)
// ============================================================================
export const QUIZ_M2_COESAO: QuizQuestion[] = [
  {
    id: 201,
    pergunta: "Na frase 'A Petrobras foca em tecnologia offshore. ESSA estratégia visa o pré-sal', o termo em destaque é:",
    opcoes: [
      { label: "A", valor: "Um termo catafórico" },
      { label: "B", valor: "Um termo anafórico" },
      { label: "C", valor: "Um elemento de oposição" },
      { label: "D", valor: "Um advérbio de tempo" },
    ],
    correta: "B",
    explicacao: "'Essa' retoma a 'tecnologia offshore' citada anteriormente (anáfora).",
  },
  {
    id: 202,
    pergunta: "O uso de 'O OURO NEGRO' para retomar 'PETRÓLEO' é um recurso de:",
    opcoes: [
      { label: "A", valor: "Catáfora pronominal." },
      { label: "B", valor: "Substituição lexical por epíteto (anáfora)." },
      { label: "C", valor: "Elipse verbal." },
      { label: "D", valor: "Ambiguidade estrutural." },
    ],
    correta: "B",
    explicacao: "Epíteto ou perífrase é o uso de uma expressão consagrada para retomar um nome, garantindo coesão sem repetição.",
  },
  {
    id: 203,
    pergunta: "Assinale a opção em que o pronome relativo 'CUJO' foi usado de acordo com a norma culta e valor anafórico:",
    opcoes: [
        { label: "A", valor: "A sonda, cuja a base quebrou, foi reparada." },
        { label: "B", valor: "O técnico, cujo o pai é engenheiro, chegou." },
        { label: "C", valor: "A refinaria, cujas instalações são novas, produz muito." },
        { label: "D", valor: "Não sei cujo é esse material." },
    ],
    correta: "C",
    explicacao: "O 'cujo' estabelece relação de posse entre dois substantivos. Não aceita artigo depois dele (erradas A e B) e deve concordar com o termo seguinte (instalações).",
  },
  {
    id: 204,
    pergunta: "A anáfora pronominal com 'O MESMO' ou 'A MESMA' é desaconselhada em textos formais porque:",
    opcoes: [
        { label: "A", valor: "É um erro gramatical gravíssimo." },
        { label: "B", valor: "Torna o texto ambíguo e empobrece o estilo." },
        { label: "C", valor: "Altera o sentido do verbo principal." },
        { label: "D", valor: "Não é reconhecida pela Cesgranrio." },
    ],
    correta: "B",
    explicacao: "O uso de 'o mesmo' como pronome pessoal é um vício de linguagem. Prefira pronomes pessoais (ele, ela) ou pronomes demonstrativos (este, esse).",
  },
  {
    id: 205,
    pergunta: "Em 'Contratei dois engenheiros; estes são experientes', o termo 'estes' retoma:",
    opcoes: [
        { label: "A", valor: "O termo mais distante (dois engenheiros)." },
        { label: "B", valor: "O termo mais próximo (dois engenheiros - anáfora de proximidade)." },
        { label: "C", valor: "Uma ideia que ainda será dita (catáfora)." },
        { label: "D", valor: "Absolutamente nada, é um expletivo." },
    ],
    correta: "B",
    explicacao: "Embora 'estes' costume ser catafórico, quando usado em pares (estes/aqueles), 'estes' retoma o mais próximo e 'aqueles' o mais distante.",
  }
];

// ============================================================================
// MÓDULO 3: O FAROL DO SENTIDO (CATÁFORA)
// ============================================================================
export const QUIZ_M3_COESAO: QuizQuestion[] = [
  {
    id: 301,
    pergunta: "Identifique a frase que apresenta CATÁFORA:",
    opcoes: [
      { label: "A", valor: "Os funcionários chegaram; eles estavam cansados." },
      { label: "B", valor: "O aviso é ESTE: usem o capacete sempre." },
      { label: "C", valor: "Estudou muito, mas não passou." },
      { label: "D", valor: "A Petrobras é nossa; preservemo-la." },
    ],
    correta: "B",
    explicacao: "O pronome 'ESTE' antecipa a informação que virá após os dois-pontos (catáfora).",
  },
  {
    id: 302,
    pergunta: "Qual pronome demonstrativo é tipicamente CATAFÓRICO em textos dissertativos?",
    opcoes: [
      { label: "A", valor: "Esse" },
      { label: "B", valor: "Aquele" },
      { label: "C", valor: "Isto" },
      { label: "D", valor: "Isso" },
    ],
    correta: "C",
    explicacao: "Pronomens com 'T' (Isto, Este, Esta) olham para frente (Catáfora). Pronomens com 'SS' (Isso, Esse, Essa) olham para trás (Anáfora).",
  },
  {
    id: 303,
    pergunta: "Em 'Só desejamos uma coisa: que a segurança seja mantida', o termo 'uma coisa' é:",
    opcoes: [
        { label: "A", valor: "Anafórico, pois resume o parágrafo anterior." },
        { label: "B", valor: "Catafórico, pois antecipa o que será desejado." },
        { label: "C", valor: "Um adjunto adverbial de modo." },
        { label: "D", valor: "Uma elipse do sujeito." },
    ],
    correta: "B",
    explicacao: "Funciona como um termo antecipador (referência prospectiva) do conteúdo da oração seguinte.",
  }
];

// ============================================================================
// MÓDULO 4: O SILÊNCIO ELOQUENTE (ELIPSE E ZÊUGMA)
// ============================================================================
export const QUIZ_M4_COESAO: QuizQuestion[] = [
  {
    id: 401,
    pergunta: "Na frase 'Eles preferem o presencial; nós, o remoto.', ocorre qual tipo de mecanismo coesivo?",
    opcoes: [
      { label: "A", valor: "Catáfora pronominal" },
      { label: "B", valor: "Zêugma (elipse de um termo já mencionado)" },
      { label: "C", valor: "Sinonímia perfeita" },
      { label: "D", valor: "Hiperonímia" },
    ],
    correta: "B",
    explicacao: "A vírgula após 'nós' indica a omissão do verbo 'preferimos', que já apareceu anteriormente na frase. Isso é um Zêugma.",
  },
  {
    id: 402,
    pergunta: "A elipse do sujeito em 'Chegamos cedo à refinaria' é identificada por:",
    opcoes: [
      { label: "A", valor: "Contexto situacional." },
      { label: "B", valor: "Desinência verbal (-mos indica 'nós')." },
      { label: "C", valor: "Uso de ponto final." },
      { label: "D", valor: "Presença de advérbio." },
    ],
    correta: "B",
    explicacao: "A elipse desinencial permite ocultar o pronome reto sem perda de coesão, pois a terminação do verbo entrega o sujeito.",
  },
  {
    id: 403,
    pergunta: "Diferencie elipse de zêugma:",
    opcoes: [
        { label: "A", valor: "A elipse é erro, o zêugma é acerto." },
        { label: "B", valor: "A elipse omite termo subentendido; o zêugma omite termo já expresso." },
        { label: "C", valor: "É tudo a mesma coisa para a Cesgranrio." },
        { label: "D", valor: "O zêugma só ocorre com substantivos." },
    ],
    correta: "B",
    explicacao: "Zêugma é uma espécie de elipse específica: a de um termo que já foi verbalizado no texto anteriormente.",
  }
];

// ============================================================================
// MÓDULO 5: SUBSTITUIÇÕES DE ELITE
// ============================================================================
export const QUIZ_M5_COESAO: QuizQuestion[] = [
  {
    id: 501,
    pergunta: "O que caracteriza a coesão por 'Nominalização'?",
    opcoes: [
      { label: "A", valor: "O uso de adjetivos explicativos." },
      { label: "B", valor: "A transformação de um processo verbal em um nome (substantivo)." },
      { label: "C", valor: "A repetição de nomes próprios." },
      { label: "D", valor: "O uso de cognomes." },
    ],
    correta: "B",
    explicacao: "Nominalização é quando usamos um substantivo para retomar uma ação verbal anterior. Ex: 'O navio atracou. A atracação foi rápida.'",
  },
  {
    id: 502,
    pergunta: "A Petrobras iniciou a extração. ESTE FATO gerou empregos. O termo em destaque é:",
    opcoes: [
      { label: "A", valor: "Catáfora textual." },
      { label: "B", valor: "Palavra-sumário ou rótulo (encapsulamento)." },
      { label: "C", valor: "Elipse do objeto." },
      { label: "D", valor: "Advérbio de intensidade." },
    ],
    correta: "B",
    explicacao: "Substantivos como 'fato', 'evento', 'situação' rotulam ideias inteiras do período anterior para garantir a progressão.",
  },
  {
    id: 503,
    pergunta: "Em 'Os operários consertaram a sonda. O concerto foi eficaz', há um problema de coesão porque:",
    opcoes: [
        { label: "A", valor: "Não há problema algum." },
        { label: "B", valor: "Houve erro de ortografia (homônimo) que prejudica a coerência (concerto vs conserto)." },
        { label: "C", valor: "Faltou usar um pronome relativo." },
        { label: "D", valor: "A frase está na voz passiva." },
    ],
    correta: "B",
    explicacao: "Embora haja tentativa de coesão por nominalização, o erro entre 'conserto' (reparo) e 'concerto' (musical) afeta a unidade de sentido.",
  }
];

// ============================================================================
// MÓDULO 6: A DANÇA DOS CONECTIVOS (SEQUENCIAL)
// ============================================================================
export const QUIZ_M6_COESAO: QuizQuestion[] = [
  {
    id: 601,
    pergunta: "Assinale a alternativa que preenche corretamente a lacuna: 'O projeto é audacioso, ______ traz riscos operacionais.'",
    opcoes: [
      { label: "A", valor: "portanto (conclusão)" },
      { label: "B", valor: "porém (oposição)" },
      { label: "C", valor: "conforme (conformidade)" },
      { label: "D", valor: "visto que (causa)" },
    ],
    correta: "B",
    explicacao: "O contexto pede um conectivo adversativo para contrastar a qualidade ('audacioso') com o defeito ('riscos').",
  },
  {
    id: 602,
    pergunta: "Qual das conjunções abaixo é EXPLICATIVA?",
    opcoes: [
      { label: "A", valor: "Contudo" },
      { label: "B", valor: "Porquanto" },
      { label: "C", valor: "Todavia" },
      { label: "D", valor: "Embora" },
    ],
    correta: "B",
    explicacao: "'Porquanto' pode ser explicativo ou causal, similar ao 'porque'. Contudo e Todavia são adversativos; Embora é concessivo.",
  },
  {
    id: 603,
    pergunta: "O conectivo 'POR CONSEGUINTE' estabelece relação de:",
    opcoes: [
        { label: "A", valor: "Causa" },
        { label: "B", valor: "Conclusão/Consequência" },
        { label: "C", valor: "Adição" },
        { label: "D", valor: "Dúvida" },
    ],
    correta: "B",
    explicacao: "É um conectivo conclusivo formal, muito apreciado pela Cesgranrio para fechar raciocínios.",
  }
];

// ============================================================================
// MÓDULO 7: CONCESSÃO & OPOSIÇÃO
// ============================================================================
export const QUIZ_M7_COESAO: QuizQuestion[] = [
  {
    id: 701,
    pergunta: "Qual a principal diferença entre MAS e EMBORA no argumento?",
    opcoes: [
      { label: "A", valor: "Nenhuma, são sinônimos." },
      { label: "B", valor: "O 'MAS' dá força à ideia que o segue; o 'EMBORA' dá força à ideia da oração principal." },
      { label: "C", valor: "O 'MAS' exige o modo subjuntivo." },
      { label: "D", valor: "O 'EMBORA' é conclusivo." },
    ],
    correta: "B",
    explicacao: "O conectivo adversativo (Mas) destaca a informação oposta. O concessivo (Embora) minimiza a oposição para destacar a principal.",
  },
  {
    id: 702,
    pergunta: "Troque 'Embora fizesse frio' por 'Fazia frio, ______'. Qual conectivo mantém o sentido?",
    opcoes: [
      { label: "A", valor: "pois" },
      { label: "B", valor: "entretanto" },
      { label: "C", valor: "logo" },
      { label: "D", valor: "conforme" },
    ],
    correta: "B",
    explicacao: "A troca de uma oração subordinada concessiva por uma coordenada adversativa mantém o contraste, mudando apenas a ênfase.",
  },
  {
    id: 703,
    pergunta: "Qual conectivo NÃO é concessivo?",
    opcoes: [
        { label: "A", valor: "Ainda que" },
        { label: "B", valor: "Conquanto" },
        { label: "C", valor: "Malgrado" },
        { label: "D", valor: "Porquanto" },
    ],
    correta: "D",
    explicacao: "Porquanto é causal/explicativo. Malgrado, Conquanto e Ainda que são concessivos (indicam contraste que não impede a ação).",
  }
];

// ============================================================================
// MÓDULO 8: ARQUITETURA DA COERÊNCIA (LÓGICA INTERNA)
// ============================================================================
export const QUIZ_M8_COESAO: QuizQuestion[] = [
  {
    id: 801,
    pergunta: "O princípio da não-contradição afirma que:",
    opcoes: [
      { label: "A", valor: "O texto pode mudar de opinião no meio se avisar." },
      { label: "B", valor: "Não se deve afirmar algo e, depois, negar o que foi dito sem lógica." },
      { label: "C", valor: "O autor deve sempre usar a primeira pessoa." },
      { label: "D", valor: "O texto deve ter exatamente 30 linhas." },
    ],
    correta: "B",
    explicacao: "A coerência exige que o texto seja um corpo único de ideias que não se anulam mutuamente.",
  },
  {
    id: 802,
    pergunta: "Falta de coerência EM RELAÇÃO AO MUNDO EXTERIOR ocorre quando:",
    opcoes: [
      { label: "A", valor: "O autor esquece de colocar o título." },
      { label: "B", valor: "O texto afirma que a água ferve a zero graus em condições normais." },
      { label: "C", valor: "Há muitos erros de digitação." },
      { label: "D", valor: "A letra é ilegível." },
    ],
    correta: "B",
    explicacao: "Trata-se de incoerência externa ou pragmática: o texto fere fatos da realidade física ou social.",
  }
];

// ============================================================================
// MÓDULO 9: PROGRESSÃO E RELEVÂNCIA
// ============================================================================
export const QUIZ_M9_COESAO: QuizQuestion[] = [
  {
    id: 901,
    pergunta: "Um texto redundante, que repete a mesma ideia várias vezes sem nada acrescentar, fere o princípio da:",
    opcoes: [
      { label: "A", valor: "Continuidade." },
      { label: "B", valor: "Progressão (Pauperismo informativo)." },
      { label: "C", valor: "Não-contradição." },
      { label: "D", valor: "Injunção." },
    ],
    correta: "B",
    explicacao: "A progressão exige que cada parágrafo traga uma 'novidade' para o desenvolvimento do raciocínio.",
  },
  {
    id: 902,
    pergunta: "A quebra do princípio da relevância ocorre em:",
    opcoes: [
      { label: "A", valor: "Inserir um assunto aleatório que não ajuda a defender a tese." },
      { label: "B", valor: "Usar muitos adjetivos." },
      { label: "C", valor: "Trocar 'porém' por 'mas'." },
      { label: "D", valor: "Escrever frases curtas." },
    ],
    correta: "A",
    explicacao: "Relevância significa que tudo no texto deve 'conspirar' a favor do sentido global e do objetivo do autor.",
  }
];

// ============================================================================
// MÓDULO 10: ARENA DE ELITE (SIMULADO FINAL)
// ============================================================================
export const QUIZ_M10_COESAO: QuizQuestion[] = [
  {
    id: 1001,
    pergunta: "Cesgranrio (Adaptada): 'Apesar de a economia estar instável, o setor de petróleo atrai capitais.' A oração destacada é:",
    opcoes: [
      { label: "A", valor: "Concessiva, indicando uma ideia que se opõe mas não impede a principal." },
      { label: "B", valor: "Causal, explicando o motivo da atração de capitais." },
      { label: "C", valor: "Consecutiva, mostrando o efeito da instabilidade." },
      { label: "D", valor: "Adversativa pura." },
    ],
    correta: "A",
    explicacao: "'Apesar de' é locução prepositiva de valor concessivo. O fato de a economia estar ruim não impediu o investimento.",
  },
  {
    id: 1002,
    pergunta: "Em 'Eles trouxeram as máquinas; nós, as ferramentas', a vírgula após 'nós' é obrigatória por:",
    opcoes: [
      { label: "A", valor: "Isolar um aposto explicativo." },
      { label: "B", valor: "Marcar a omissão do verbo (Zêugma)." },
      { label: "C", valor: "Separar um vocativo." },
      { label: "D", valor: "Marcar um adjunto adverbial deslocado." },
    ],
    correta: "B",
    explicacao: "A vírgula vicária é usada para indicar que o verbo 'trouxemos' foi omitido para evitar repetição.",
  },
  {
    id: 1003,
    pergunta: "A anáfora sinonímica ocorre em:",
    opcoes: [
        { label: "A", valor: "O diretor saiu; ele volta logo." },
        { label: "B", valor: "A Petrobras descobriu o campo. A empresa celebrou." },
        { label: "C", valor: "O aviso é este: silêncio." },
        { label: "D", valor: "Desejo isto: sua paz." },
    ],
    correta: "B",
    explicacao: "'A empresa' é sinônimo/hiperônimo de 'Petrobras' no contexto, retomando o termo sem repetir o nome próprio.",
  },
  {
    id: 1004,
    pergunta: "O elemento de coesão 'DESTAMINE' é usado para:",
    opcoes: [
        { label: "A", valor: "Fazer uma pergunta." },
        { label: "B", valor: "Concluir um raciocínio." },
        { label: "C", valor: "Opor-se a uma ideia anterior." },
        { label: "D", valor: "Este termo não existe na norma culta (é 'destarte')." },
    ],
    correta: "D",
    explicacao: "O termo correto e formal é 'destarte' ou 'dessarte' (conclusivos). 'Destamine' é um distrator.",
  },
  {
    id: 1005,
    pergunta: "A incoerência semântica impede que o texto seja um:",
    opcoes: [
        { label: "A", valor: "Poema." },
        { label: "B", valor: "Ato comunicativo eficaz." },
        { label: "C", valor: "Rascunho." },
        { label: "D", valor: "Texto longo." },
    ],
    correta: "B",
    explicacao: "Para haver comunicação, é preciso que as partes façam sentido juntas (Coerência).",
  }
];

// Fallback aliases for old code
export const QUIZ_M1_POOL = QUIZ_M1_COESAO;
export const QUIZ_M2_POOL = QUIZ_M2_COESAO;
export const QUIZ_M3_POOL = QUIZ_M3_COESAO;
export const QUIZ_M4_POOL = QUIZ_M4_COESAO;
export const QUIZ_M5_POOL = QUIZ_M5_COESAO;
export const QUIZ_M6_POOL = QUIZ_M6_COESAO;
export const QUIZ_M7_POOL = QUIZ_M7_COESAO;
export const QUIZ_M8_POOL = QUIZ_M8_COESAO;
export const QUIZ_M9_POOL = QUIZ_M9_COESAO;
export const QUIZ_M10_POOL = QUIZ_M10_COESAO;

// Compatibility with old names referenced in standard boilerplate
export const QUIZ_M1 = QUIZ_M1_COESAO;
export const QUIZ_M2 = QUIZ_M2_COESAO;
export const QUIZ_M3 = QUIZ_M3_COESAO;
export const QUIZ_M4 = QUIZ_M4_COESAO;
export const QUIZ_FINAL_SIMULADO = QUIZ_M10_COESAO;
export const QUIZ_M2_COERENCIA = QUIZ_M2_COESAO;
export const QUIZ_M3_PRATICO = QUIZ_M3_COESAO;
export const QUIZ_M4_APROFUNDAMENTO = QUIZ_M4_COESAO;
