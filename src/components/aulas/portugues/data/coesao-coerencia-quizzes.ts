import { QuizQuestion } from "../../shared";

export const QUIZ_M1_COESAO: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "Em 'O técnico examinou a plataforma. Ele percebeu uma falha.', o termo 'Ele' exerce qual função de coesão?",
    opcoes: [
      { label: "A", valor: "Coesão sequencial por conectivo." },
      { label: "B", valor: "Coesão referencial anafórica." },
      { label: "C", valor: "Coesão referencial catafórica." },
      { label: "D", valor: "Coesão por elipse." },
      { label: "E", valor: "Coerência pragmática." },
    ],
    correta: "B",
    explicacao: "'Ele' retoma um termo já mencionado ('O técnico'), caracterizando uma anáfora (referência para trás).",
  },
  {
    id: 2,
    pergunta: "Qual dos elementos abaixo é um exemplo de coesão lexical por substituição hiperonímica?",
    opcoes: [
      { label: "A", valor: "Carro / Veículo" },
      { label: "B", valor: "João / Ele" },
      { label: "C", valor: "Vender / Comprar" },
      { label: "D", valor: "Mas / Porém" },
      { label: "E", valor: "Plataforma / Plataforma" },
    ],
    correta: "A",
    explicacao: "Hiperônimo é um termo de sentido mais abrangente. 'Veículo' é o hiperônimo de 'carro'.",
  },
  {
    id: 3,
    pergunta: "Assinale a frase em que há COESÃO SEQUENCIAL estabelecida por um conectivo de oposição:",
    opcoes: [
      { label: "A", valor: "Estudou muito, portanto passou." },
      { label: "B", valor: "Estudou muito e passou." },
      { label: "C", valor: "Estudou muito, contudo não passou." },
      { label: "D", valor: "Estudou muito porque queria passar." },
      { label: "E", valor: "Estudou muito para passar." },
    ],
    correta: "C",
    explicacao: "'Contudo' é uma conjunção adversativa, indicando oposição/contraste entre o estudo e o resultado.",
  },
  {
    id: 4,
    pergunta: "O que caracteriza a coesão por elipse?",
    opcoes: [
      { label: "A", valor: "A repetição de palavras-chave." },
      { label: "B", valor: "O uso de sinônimos." },
      { label: "C", valor: "A omissão de um termo facilmente identificável pelo contexto." },
      { label: "D", valor: "A antecipação de uma ideia que será explicada." },
      { label: "E", valor: "O uso excessivo de conectivos." },
    ],
    correta: "C",
    explicacao: "Elipse é a omissão de um termo que o leitor consegue recuperar mentalmente sem prejuízo à compreensão.",
  },
];

export const QUIZ_M2_COERENCIA: QuizQuestion[] = [
  {
    id: 101,
    pergunta: "Uma frase como 'O dia está lindo, por isso peguei meu guarda-chuva para me proteger da chuva' apresenta problema de:",
    opcoes: [
      { label: "A", valor: "Coesão referencial." },
      { label: "B", valor: "Coesão sequencial." },
      { label: "C", valor: "Coerência interna (contradição)." },
      { label: "D", valor: "Sintaxe de regência." },
      { label: "E", valor: "Pontuação." },
    ],
    correta: "C",
    explicacao: "Há uma contradição lógica: se o dia está lindo (sol), não faz sentido (coerência) usar guarda-chuva para se proteger da chuva no mesmo instante.",
  },
  {
    id: 102,
    pergunta: "A coerência externa (ou pragmática) refere-se à:",
    opcoes: [
      { label: "A", valor: "Relação entre as partes do texto." },
      { label: "B", valor: "Relação entre o texto e o conhecimento de mundo do leitor." },
      { label: "C", valor: "Repetição de pronomes." },
      { label: "D", valor: "Escolha adequada de conectivos." },
      { label: "E", valor: "Correta ortografia das palavras." },
    ],
    correta: "B",
    explicacao: "A coerência externa avalia se o texto faz sentido em relação à realidade e ao contexto sócio-histórico.",
  },
  {
    id: 103,
    pergunta: "Qual princípio de coerência é ferido em: 'Fui ao mercado. O carro é azul. Gosto de batata.'?",
    opcoes: [
      { label: "A", valor: "Princípio da Não Contradição." },
      { label: "B", valor: "Princípio da Relevância (ou Relação)." },
      { label: "C", valor: "Princípio da Continuidade." },
      { label: "D", valor: "Princípio da Progressão." },
      { label: "E", valor: "Princípio da Coesão." },
    ],
    correta: "B",
    explicacao: "As frases estão soltas, sem uma relação temática que as una em um sentido global (Relevância).",
  },
  {
    id: 104,
    pergunta: "Sobre a relação entre coesão e coerência, é correto afirmar que:",
    opcoes: [
      { label: "A", valor: "Sempre que há coesão, há coerência." },
      { label: "B", valor: "Sempre que há coerência, há coesão." },
      { label: "C", valor: "Um texto pode ter elementos coesivos mas ser incoerente." },
      { label: "D", valor: "Coerência é a forma, coesão é o conteúdo." },
      { label: "E", valor: "São sinônimos perfeitos na linguística." },
    ],
    correta: "C",
    explicacao: "É possível usar conectivos (coesão) para ligar frases que não fazem sentido lógico entre si (incoerência).",
  },
];

export const QUIZ_M3_PRATICO: QuizQuestion[] = [
  {
    id: 201,
    pergunta: "Assinale a alternativa que preenche corretamente a lacuna: 'A empresa investiu em tecnologia, ______ os resultados não foram os esperados.'",
    opcoes: [
      { label: "A", valor: "portanto" },
      { label: "B", valor: "visto que" },
      { label: "C", valor: "entretanto" },
      { label: "D", valor: "conforme" },
      { label: "E", valor: "porquanto" },
    ],
    correta: "C",
    explicacao: "O contexto exige um conectivo de oposição (adversativo), pois há um contraste entre o investimento e o resultado ruim.",
  },
  {
    id: 202,
    pergunta: "Na frase 'Os aprovados devem se apresentar amanhã. ESTES deverão trazer os documentos.', o pronome em destaque é um recurso de:",
    opcoes: [
      { label: "A", valor: "Catáfora" },
      { label: "B", valor: "Anáfora" },
      { label: "C", valor: "Elipse" },
      { label: "D", valor: "Metáfora" },
      { label: "E", valor: "Pleonasmo" },
    ],
    correta: "B",
    explicacao: "O pronome 'ESTES' retoma 'Os aprovados', funcionando como um elemento anafórico.",
  },
];

export const QUIZ_M4_APROFUNDAMENTO: QuizQuestion[] = [
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
    pergunta: "Qual o valor semântico do conectivo 'CONQUANTO'?",
    opcoes: [
      { label: "A", valor: "Causa" },
      { label: "B", valor: "Consequência" },
      { label: "C", valor: "Concessão (oposição leve que não anula a principal)" },
      { label: "D", valor: "Conclusão" },
    ],
    correta: "C",
    explicacao: "'Conquanto' é uma conjunção subordinativa concessiva, equivalente a 'embora' ou 'ainda que'.",
  },
  {
    id: 403,
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
];

export const QUIZ_FINAL_SIMULADO: QuizQuestion[] = [
  {
    id: 501,
    pergunta: "Questão Cesgranrio: Em um texto, a coerência pode ser prejudicada se houver contradição entre:",
    opcoes: [
      { label: "A", valor: "O título e a imagem apenas." },
      { label: "B", valor: "O que é dito e o conhecimento de mundo do leitor (incoerência externa)." },
      { label: "C", valor: "O uso de próclise e ênclise." },
      { label: "D", valor: "A fonte do texto e a data de publicação." },
    ],
    correta: "B",
    explicacao: "A coerência externa depende da relação lógica entre as informações do texto e a realidade compartilhada.",
  },
  {
    id: 502,
    pergunta: "Na frase 'As equipes de segurança da Petrobras já iniciaram o protocolo. O procedimento é padrão.', o termo 'O procedimento' retoma a ideia anterior através de:",
    opcoes: [
      { label: "A", valor: "Substituição por Hiperônimo" },
      { label: "B", valor: "Nome Genérico / Palavra-Sumário" },
      { label: "C", valor: "Anáfora pronominal" },
      { label: "D", valor: "Catáfora textual" },
    ],
    correta: "B",
    explicacao: "A palavra 'procedimento' funciona como uma palavra-sumário que 'resume' a ação anterior (iniciar o protocolo).",
  },
];
