import { QuizQuestion } from "../../shared";

// Pool de Questões - Aula: Regência (Padrão 2026 Cesgranrio Petrobras)

// ----------------------------------------------------------------------------
// MÓDULO 1: FUNDAMENTOS E MECÂNICA
// ----------------------------------------------------------------------------
export const QUIZ_M1_REGENCIA: QuizQuestion[] = [
  {
    id: 101,
    pergunta: "No contexto da gramática normativa, o que define a 'Regência'?",
    opcoes: [
      { label: "A", valor: "A concordância entre o sujeito e o verbo em número e pessoa." },
      { label: "B", valor: "A maneira como um termo (regente) exige outro (regido), com ou sem preposição." },
      { label: "C", valor: "O uso obrigatório de letras maiúsculas no início de frases técnicas." },
      { label: "D", valor: "A colocação dos pronomes oblíquos antes ou depois do verbo." },
    ],
    correta: "B",
    explicacao: "Regência é a relação de subordinação entre um nome/verbo (regente) e seu complemento (regido).",
  },
  {
    id: 102,
    pergunta: "Na frase 'A Petrobras investe em tecnologia', identifique o termo regente e o regido:",
    opcoes: [
      { label: "A", valor: "Regente: Petrobras; Regido: investe." },
      { label: "B", valor: "Regente: tecnologia; Regido: investe." },
      { label: "C", valor: "Regente: investe; Regido: tecnologia (por meio da preposição 'em')." },
      { label: "D", valor: "Regente: em; Regido: tecnologia." },
    ],
    correta: "C",
    explicacao: "O verbo 'investir' atua como regente, exigindo o complemento 'tecnologia' via preposição 'em'.",
  },
  {
    id: 103,
    pergunta: "Um erro de regência verbal ocorre quando:",
    opcoes: [
      { label: "A", valor: "O verbo não concorda com o sujeito." },
      { label: "B", valor: "Usa-se uma preposição diferente da exigida pelo verbo ou omite-se uma obrigatória." },
      { label: "C", valor: "O autor usa gírias em um relatório oficial." },
      { label: "D", valor: "A frase possui mais de três substantivos abstratos." },
    ],
    correta: "B",
    explicacao: "A regência trata especificamente da ligação (com ou sem preposição) entre o regente e o regido.",
  },
  {
    id: 104,
    pergunta: "Verbos 'Transitivos Indiretos' são aqueles que:",
    opcoes: [
      { label: "A", valor: "Não possuem sentido completo e exigem preposição para se ligar ao objeto." },
      { label: "B", valor: "Possuem sentido completo e não precisam de complemento." },
      { label: "C", valor: "Exigem um objeto direto sem auxílio de preposição." },
      { label: "D", valor: "Mudam de classe gramatical conforme o sujeito." },
    ],
    correta: "A",
    explicacao: "A transitividade indireta é marcada pela necessidade de uma preposição (a, de, em, por, etc.) para conectar o verbo ao seu complemento.",
  },
  {
    id: 105,
    pergunta: "Identifique a preposição regente em: 'Estamos ávidos por resultados'.",
    opcoes: [
      { label: "A", valor: "por" },
      { label: "B", valor: "ávidos" },
      { label: "C", valor: "resultados" },
      { label: "D", valor: "estamos" },
    ],
    correta: "A",
    explicacao: "A preposição 'por' é o nexo exigido pelo adjetivo 'ávidos' para se ligar a 'resultados'.",
  },
  {
    id: 106,
    pergunta: "A Cesgranrio costuma trocar preposições em textos técnicos. Qual frase abaixo está correta?",
    opcoes: [
      { label: "A", valor: "O gerente é perito a sistemas de óleo." },
      { label: "B", valor: "O gerente é perito em sistemas de óleo." },
      { label: "C", valor: "O gerente é perito com sistemas de óleo." },
      { label: "D", valor: "O gerente é perito de sistemas de óleo." },
    ],
    correta: "B",
    explicacao: "O nome 'perito' exige a preposição 'em', indicando especialidade.",
  }
];

// ----------------------------------------------------------------------------
// MÓDULO 2: REGÊNCIA NOMINAL - ADJETIVOS
// ----------------------------------------------------------------------------
export const QUIZ_M2_REGENCIA: QuizQuestion[] = [
  {
    id: 201,
    pergunta: "O adjetivo 'acessível' exige qual preposição em sua regência normativa?",
    opcoes: [
      { label: "A", valor: "com" },
      { label: "B", valor: "a" },
      { label: "C", valor: "em" },
      { label: "D", valor: "por" },
    ],
    correta: "B",
    explicacao: "Dizemos que algo é 'acessível A' alguém ou a algum lugar.",
  },
  {
    id: 202,
    pergunta: "Indique a alternativa que completa corretamente: 'O técnico estava atento ___ sinais do monitor'.",
    opcoes: [
      { label: "A", valor: "nos" },
      { label: "B", valor: "aos" },
      { label: "C", valor: "com os" },
      { label: "D", valor: "pelos" },
    ],
    correta: "B",
    explicacao: "Atento exige a preposição 'a'. A + os = aos.",
  },
  {
    id: 203,
    pergunta: "Qual desses adjetivos rege a preposição 'EM'?",
    opcoes: [
      { label: "A", valor: "Fiel" },
      { label: "B", valor: "Inerente" },
      { label: "C", valor: "Versado" },
      { label: "D", valor: "Nocivo" },
    ],
    correta: "C",
    explicacao: "Versado (especialista, experiente) exige a preposição 'em' (ex: Versado em geofísica).",
  },
  {
    id: 204,
    pergunta: "O termo 'inerente' (que faz parte da natureza de algo) exige a preposição:",
    opcoes: [
      { label: "A", valor: "de" },
      { label: "B", valor: "a" },
      { label: "C", valor: "com" },
      { label: "D", valor: "por" },
    ],
    correta: "B",
    explicacao: "Dizemos: 'Os riscos são inerentes À atividade' (preposição A).",
  },
  {
    id: 205,
    pergunta: "A frase 'Ele é imune ___ críticas' deve ser completada com:",
    opcoes: [
      { label: "A", valor: "a" },
      { label: "B", valor: "de" },
      { label: "C", valor: "em" },
      { label: "D", valor: "com" },
    ],
    correta: "A",
    explicacao: "Imune exige a preposição 'a'.",
  },
  {
    id: 206,
    pergunta: "Qual a regência correta para o adjetivo 'favorável'?",
    opcoes: [
      { label: "A", valor: "Favorável de" },
      { label: "B", valor: "Favorável a" },
      { label: "C", valor: "Favorável com" },
      { label: "D", valor: "Favorável por" },
    ],
    correta: "B",
    explicacao: "Favorável A algo ou alguém.",
  }
];

// ----------------------------------------------------------------------------
// MÓDULO 3: REGÊNCIA NOMINAL - SUBSTANTIVOS E ADVÉRBIOS
// ----------------------------------------------------------------------------
export const QUIZ_M3_REGENCIA: QuizQuestion[] = [
  {
    id: 301,
    pergunta: "O substantivo 'aversão' pode reger quais preposições?",
    opcoes: [
      { label: "A", valor: "apenas 'a'" },
      { label: "B", valor: "apenas 'por'" },
      { label: "C", valor: "a, para com ou por" },
      { label: "D", valor: "de ou em" },
    ],
    correta: "C",
    explicacao: "'Aversão a', 'Aversão para com' e 'Aversão por' são todas formas aceitas.",
  },
  {
    id: 302,
    pergunta: "Dentre as opções, qual completa corretamente a regência do substantivo 'respeito'?",
    opcoes: [
      { label: "A", valor: "Respeito com as normas." },
      { label: "B", valor: "Respeito perante as normas." },
      { label: "C", valor: "Respeito pelas normas (ou a, ou com, ou para com)." },
      { label: "D", valor: "Respeito nas normas." },
    ],
    correta: "C",
    explicacao: "Respeito aceita as preposições a, com, para com e por.",
  },
  {
    id: 303,
    pergunta: "O advérbio 'longe', quando exige complemento, rege a preposição:",
    opcoes: [
      { label: "A", valor: "a" },
      { label: "B", valor: "de" },
      { label: "C", valor: "em" },
      { label: "D", valor: "por" },
    ],
    correta: "B",
    explicacao: "Dizemos: 'Longe DE casa'.",
  },
  {
    id: 304,
    pergunta: "Identifique o erro de regência nominal:",
    opcoes: [
      { label: "A", valor: "Ele tem obediência aos pais." },
      { label: "B", valor: "Sua dúvida é relativa de física." },
      { label: "C", valor: "O projeto é compatível com a sonda." },
      { label: "D", valor: "Estou seguro de minha decisão." },
    ],
    correta: "B",
    explicacao: "Relativo exige a preposição 'a' (Relativo A física).",
  },
  {
    id: 305,
    pergunta: "A palavra 'capacidade' rege habitualmente a preposição:",
    opcoes: [
      { label: "A", valor: "em" },
      { label: "B", valor: "de" },
      { label: "C", valor: "para" },
      { label: "D", valor: "B e C estão corretas (Capacidade de / Capacidade para)." },
    ],
    correta: "D",
    explicacao: "Ambas são admitidas: 'Capacidade de extração' ou 'Capacidade para extrair'.",
  }
];

// ----------------------------------------------------------------------------
// MÓDULO 4: REGÊNCIA VERBAL - A ELITE (FALSOS DIRETOS)
// ----------------------------------------------------------------------------
export const QUIZ_M4_REGENCIA: QuizQuestion[] = [
  {
    id: 401,
    pergunta: "Com o sentido de 'pretender, objetivar', qual o padrão de regência do verbo visar?",
    opcoes: [
      { label: "A", valor: "Visar o êxito (VTD)." },
      { label: "B", valor: "Visar ao êxito (VTI)." },
      { label: "C", valor: "Visar pelo êxito." },
      { label: "D", valor: "Visar com o êxito." },
    ],
    correta: "B",
    explicacao: "Visar = almejar exige preposição 'a'.",
  },
  {
    id: 402,
    pergunta: "Na frase 'Assistimos ___ programa de treinamento', a lacuna deve ser preenchida por:",
    opcoes: [
      { label: "A", valor: "o" },
      { label: "B", valor: "ao" },
      { label: "C", valor: "no" },
      { label: "D", valor: "pelo" },
    ],
    correta: "B",
    explicacao: "Assistir (ver/presenciar) é VTI e exige a preposição 'a'.",
  },
  {
    id: 403,
    pergunta: "O verbo 'aspirar', no sentido de 'cheirar', é:",
    opcoes: [
      { label: "A", valor: "Transitivo Direto (sem preposição)." },
      { label: "B", valor: "Transitivo Indireto (pede 'a')." },
      { label: "C", valor: "Intransitivo." },
      { label: "D", valor: "Pronominal obrigatório." },
    ],
    correta: "A",
    explicacao: "Aspirar = respirar, sorver é VTD (ex: Aspirei o gás).",
  },
  {
    id: 404,
    pergunta: "Qual alternativa respeita o sentido de 'desejar' para o verbo aspirar?",
    opcoes: [
      { label: "A", valor: "Aspiro o cargo de supervisor." },
      { label: "B", valor: "Aspiro ao cargo de supervisor." },
      { label: "C", valor: "Aspiro de supervisor." },
      { label: "D", valor: "Aspiro por supervisor." },
    ],
    correta: "B",
    explicacao: "Aspirar = desejar exige a preposição 'a'.",
  },
  {
    id: 405,
    pergunta: "O verbo 'assistir' no sentido de 'ajudar' é regido como:",
    opcoes: [
      { label: "A", valor: "VTD (ex: Assisti o acidentado)." },
      { label: "B", valor: "VTI (ex: Assisti ao acidentado)." },
      { label: "C", valor: "A e B são aceitas por gramáticos modernos, mas a Cesgranrio prefere a forma direta (VTD)." },
      { label: "D", valor: "Não existe este sentido para o verbo." },
    ],
    correta: "C",
    explicacao: "A norma padrão tradicional o classifica como VTD para 'ajudar'.",
  }
];

// ----------------------------------------------------------------------------
// MÓDULO 5: REGÊNCIA VERBAL - MUDANÇA DE SENTIDO
// ----------------------------------------------------------------------------
export const QUIZ_M5_REGENCIA: QuizQuestion[] = [
  {
    id: 501,
    pergunta: "O verbo 'custar', no sentido de 'ser penoso/difícil', deve ser usado como:",
    opcoes: [
      { label: "A", valor: "Eu custei a entender." },
      { label: "B", valor: "Custou-me entender (ou Custou-me a entender)." },
      { label: "C", valor: "Nós custamos para chegar." },
      { label: "D", valor: "Eles custaram muito a aceitar." },
    ],
    correta: "B",
    explicacao: "O sujeito deve ser a coisa (entender) e não a pessoa (Eu/Nós). O correto é 'Custou-me entender'.",
  },
  {
    id: 502,
    pergunta: "A regência de 'proceder' no sentido de 'originar-se' é:",
    opcoes: [
      { label: "A", valor: "VTD (Proceder algo)." },
      { label: "B", valor: "VTI com preposição 'de' (Proceder de algo)." },
      { label: "C", valor: "VTI com preposição 'a' (Proceder a algo)." },
      { label: "D", valor: "Intransitivo (Isso não procede)." },
    ],
    correta: "B",
    explicacao: "Ex: 'Esta informação procede DA auditoria'.",
  },
  {
    id: 303,
    pergunta: "Na frase 'Ele quer muito ___ seus pais', o sentido é de 'estima/carinho'. Complete:",
    opcoes: [
      { label: "A", valor: "os" },
      { label: "B", valor: "aos" },
      { label: "C", valor: "com os" },
      { label: "D", valor: "pelo" },
    ],
    correta: "B",
    explicacao: "Querer = ter afeto/estimar exige preposição 'a' (VTI).",
  },
  {
    id: 304,
    pergunta: "Querer no sentido de 'desejar' é:",
    opcoes: [
      { label: "A", valor: "VTD (ex: Quero o relatório agora)." },
      { label: "B", valor: "VTI (ex: Quero ao relatório agora)." },
      { label: "C", valor: "Intransitivo." },
      { label: "D", valor: "Pronominal." },
    ],
    correta: "A",
    explicacao: "Sentido de desejo não pede preposição.",
  }
];

// ----------------------------------------------------------------------------
// MÓDULO 6: REGÊNCIA VERBAL - TRANSITIVIDADE BIFRONTE
// ----------------------------------------------------------------------------
export const QUIZ_M6_REGENCIA: QuizQuestion[] = [
  {
    id: 601,
    pergunta: "Os verbos 'Pagar' e 'Perdoar' regem preposição quando:",
    opcoes: [
      { label: "A", valor: "O objeto é uma coisa." },
      { label: "B", valor: "O objeto é uma pessoa." },
      { label: "C", valor: "Sempre." },
      { label: "D", valor: "Nunca." },
    ],
    correta: "B",
    explicacao: "Pagar a alguém (pessoa = VTI); Pagar algo (coisa = VTD).",
  },
  {
    id: 602,
    pergunta: "Identifique a frase correta de acordo com a norma culta:",
    opcoes: [
      { label: "A", valor: "Paguei o funcionário ontem." },
      { label: "B", valor: "Paguei ao funcionário ontem." },
      { label: "C", valor: "Perdoei o pecador." },
      { label: "D", valor: "Perdoei as dívidas ao banco." },
    ],
    correta: "B",
    explicacao: "Funcionário é pessoa, logo exige preposição 'a'.",
  },
  {
    id: 303,
    pergunta: "A regência do verbo 'informar' permite duas construções. Qual está INCORRETA?",
    opcoes: [
      { label: "A", valor: "Informamos os clientes sobre os novos preços." },
      { label: "B", valor: "Informamos aos clientes os novos preços." },
      { label: "C", valor: "Informamos aos clientes sobre os novos preços." },
      { label: "D", valor: "Informamos os clientes dos novos preços." },
    ],
    correta: "C",
    explicacao: "Não se pode usar preposição nos dois complementos (aos... sobre). Deve ser: algo a alguém OU alguém de algo.",
  },
  {
    id: 304,
    pergunta: "O verbo 'preferir' exige a estrutura:",
    opcoes: [
      { label: "A", valor: "Preferir 'A' do que 'B'." },
      { label: "B", valor: "Preferir 'A' antes que 'B'." },
      { label: "C", valor: "Preferir 'A' a 'B'." },
      { label: "D", valor: "Preferir mais 'A' do que 'B'." },
    ],
    correta: "C",
    explicacao: "Forma única correta: Prefiro o café AO chá.",
  }
];

// ----------------------------------------------------------------------------
// MÓDULO 7: MOVIMENTO E PRONOMINAIS
// ----------------------------------------------------------------------------
export const QUIZ_M7_REGENCIA: QuizQuestion[] = [
  {
    id: 701,
    pergunta: "Na norma culta, verbos de movimento como 'Ir' ou 'Chegar' regem a preposição:",
    opcoes: [
      { label: "A", valor: "em (ex: Chegou em casa)." },
      { label: "B", valor: "a (ex: Chegou a casa)." },
      { label: "C", valor: "para (ex: Foi para o Rio)." },
      { label: "D", valor: "B e C (dependendo da duração da estadia)." },
    ],
    correta: "D",
    explicacao: "Ir/Chegar regem 'A' para destino momentâneo e 'PARA' para destino definitivo. 'EM' é coloquial.",
  },
  {
    id: 702,
    pergunta: "Qual a diferença de regência entre 'Esquecer' e 'Esquecer-se'?",
    opcoes: [
      { label: "A", valor: "Nenhuma." },
      { label: "B", valor: "Esquecer é VTD; Esquecer-se é VTI (+DE)." },
      { label: "C", valor: "Esquecer é VTI; Esquecer-se é VTD." },
      { label: "D", valor: "Ambos são intransitivos." },
    ],
    correta: "B",
    explicacao: "Se houver pronome (me, te, se, nos), deve haver preposição 'de'.",
  },
  {
    id: 303,
    pergunta: "Assinale o erro gramatical:",
    opcoes: [
      { label: "A", valor: "Esqueci o nome dela." },
      { label: "B", valor: "Esqueci-me do nome dela." },
      { label: "C", valor: "Me esqueci o nome dela." },
      { label: "D", valor: "Esqueci-me de que ela vinha." },
    ],
    correta: "C",
    explicacao: "Combinou o pronome 'me' mas omitiu a preposição 'de' (e ainda iniciou frase com pronome, erro de colocação).",
  }
];

// ----------------------------------------------------------------------------
// MÓDULO 8: PECULIARIDADES TÉCNICAS CESGRANRIO
// ----------------------------------------------------------------------------
export const QUIZ_M8_REGENCIA: QuizQuestion[] = [
  {
    id: 801,
    pergunta: "O verbo 'implicar' no sentido de 'acarretar' (consequência) rege:",
    opcoes: [
      { label: "A", valor: "preposição 'em'" },
      { label: "B", valor: "preposição 'a'" },
      { label: "C", valor: "nenhuma preposição (VTD)" },
      { label: "D", valor: "preposição 'com'" },
    ],
    correta: "C",
    explicacao: "Erro comum: 'Isso implica EM mudanças' (Errado). Correto: 'Isso implica mudanças'.",
  },
  {
    id: 802,
    pergunta: "A locução 'Haja vista' deve ser usada:",
    opcoes: [
      { label: "A", valor: "Sempre no singular (Haja vista os problemas)." },
      { label: "B", valor: "Sempre no plural (Hajam vista os problemas)." },
      { label: "C", valor: "Concordando com o termo seguinte." },
      { label: "D", valor: "Dizendo 'Haja visto'." },
    ],
    correta: "A",
    explicacao: "A forma clássica 'Haja vista' é invariável.",
  }
];

// ----------------------------------------------------------------------------
// MÓDULO 9: REGÊNCIA E PRONOMES RELATIVOS
// ----------------------------------------------------------------------------
export const QUIZ_M9_REGENCIA: QuizQuestion[] = [
  {
    id: 901,
    pergunta: "Em 'Este é o autor ___ livros gosto muito', qual a forma correta?",
    opcoes: [
      { label: "A", valor: "que os" },
      { label: "B", valor: "cujos" },
      { label: "C", valor: "de cujos" },
      { label: "D", valor: "dos quais" },
    ],
    correta: "C",
    explicacao: "Quem gosta, gosta DE. O termo 'livros' pertence ao 'autor' (cujo). Logo: 'DE CUJOS'.",
  },
  {
    id: 902,
    pergunta: "Qual das frases abaixo apresenta erro de regência com pronome relativo?",
    opcoes: [
      { label: "A", valor: "O filme a que assisti foi excelente." },
      { label: "B", valor: "A empresa onde trabalho é grande." },
      { label: "C", valor: "A meta que visamos é ambiciosa." },
      { label: "D", valor: "O documento de que necessito está aqui." },
    ],
    correta: "C",
    explicacao: "Visar (objetivar) pede preposição A. Correto: 'A meta A QUE visamos'.",
  }
];

// ----------------------------------------------------------------------------
// MÓDULO 10: SIMULADO FINAL
// ----------------------------------------------------------------------------
export const QUIZ_FINAL_REGENCIA: QuizQuestion[] = [
  {
    id: 1001,
    pergunta: "Assinale a alternativa que apresenta plena correção quanto à regência verbal:",
    opcoes: [
      { label: "A", valor: "O aluno aspirava o sucesso no concurso." },
      { label: "B", valor: "O curso visa o aprimoramento profissional." },
      { label: "C", valor: "Chegamos no laboratório às oito horas." },
      { label: "D", valor: "Assistimos aos novos episódios da série técnica." },
    ],
    correta: "D",
    explicacao: "Assistir (ver) exige 'a'. Aspirar (desejar) e Visar (objetivar) também exigem 'a'. Chegar exige 'a'.",
  },
  {
    id: 1002,
    pergunta: "Marque a opção gramaticalmente correta:",
    opcoes: [
      { label: "A", valor: "Prefiro antes morrer do que me entregar." },
      { label: "B", valor: "Perdoou o empregado pela falta." },
      { label: "C", valor: "Esqueça de tudo o que eu disse." },
      { label: "D", valor: "Não obedeço a ordens injustas." },
    ],
    correta: "D",
    explicacao: "Obedecer é VTI e exige preposição 'a'.",
  }
];
