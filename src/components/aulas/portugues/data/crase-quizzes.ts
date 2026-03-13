import { QuizQuestion, CarouselCard } from "../../shared";
import { ReactNode } from "react";

export interface ConceptExample {
  id: number;
  frente: ReactNode;
  verso: ReactNode;
}

export interface Challenge {
  wrong: string;
  correct: string;
  explanation: string;
}

// ── QUIZ POOLS ──────────────────────────────────────────────────────────

export const QUIZ_M1_POOL: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "A crase é a fusão de quais elementos gramaticais?",
    opcoes: [
      { label: "A", valor: 'Preposição "a" + Artigo definido "a"' },
      { label: "B", valor: 'Preposição "a" + Pronome pessoal "ela"' },
      { label: "C", valor: 'Artigo "a" + Verbo haver' },
      { label: "D", valor: 'Preposição "para" + Artigo "a"' },
    ],
    correta: "A",
    explicacao: 'Crase é a contração da preposição "a" exigida pelo termo regente com o artigo "a" (ou pronomes demonstrativos) do termo regido.',
  },
  {
    id: 2,
    pergunta: 'Qual a "Regra de Ouro" para identificar a crase diante de palavras femininas?',
    opcoes: [
      { label: "A", valor: 'Trocar por uma palavra masculina e ver se vira "AO"' },
      { label: "B", valor: "Trocar por plural" },
      { label: "C", valor: 'Ver se a palavra termina em "a"' },
      { label: "D", valor: "Sempre usar crase antes de feminino" },
    ],
    correta: "A",
    explicacao: 'Se ao trocar a palavra feminina por uma masculina a preposição "a" virar "ao", há crase.',
  },
  {
    id: 3,
    pergunta: 'Complete: "Ele obedeceu ___ regras da empresa."',
    opcoes: [
      { label: "A", valor: "às" },
      { label: "B", valor: "as" },
      { label: "C", valor: "a" },
      { label: "D", valor: "nas" },
    ],
    correta: "A",
    explicacao: 'Quem obedece, obedece A alguma coisa. "Regras" pede artigo "as". Logo, A + AS = ÀS.',
  },
  {
    id: 4,
    pergunta: 'Na frase "Vou a Bahia", ocorre crase?',
    opcoes: [
      { label: "A", valor: "Sim, sempre" },
      { label: "B", valor: "Não, pois quem vai a Bahia, volta de Bahia" },
      { label: "C", valor: "Sim, pois Bahia é feminino" },
      { label: "D", valor: 'Sim, "Vou à Bahia" porque volto DA Bahia' },
    ],
    correta: "D",
    explicacao: 'Use o macete: "Quem vai A e volta DA, crase há!". Volto DA Bahia, logo, vou À Bahia.',
  },
  {
    id: 5,
    pergunta: "Assinale a alternativa que apresenta erro de crase:",
    opcoes: [
      { label: "A", valor: "Refiro-me à professora." },
      { label: "B", valor: "Vou à cidade." },
      { label: "C", valor: "Assisti à aula." },
      { label: "D", valor: "Fui à pé." },
    ],
    correta: "D",
    explicacao: "'Pé' é palavra masculina, portanto não admite crase (artigo feminino).",
  },
];

export const QUIZ_M2_POOL: QuizQuestion[] = [
  {
    id: 1,
    pergunta: "É PROIBIDO usar crase antes de:",
    opcoes: [
      { label: "A", valor: "Palavras femininas" },
      { label: "B", valor: "Verbos" },
      { label: "C", valor: "Locuções adverbiais" },
      { label: "D", valor: "Horas" },
    ],
    correta: "B",
    explicacao: 'Nunca ocorre crase antes de verbos (ex: a partir, a fazer), pois verbos não admitem artigo feminino "a".',
  },
  {
    id: 2,
    pergunta: "Qual frase está CORRETA quanto ao uso da crase?",
    opcoes: [
      { label: "A", valor: "Referi-me a ela com respeito." },
      { label: "B", valor: "Referi-me à ela com respeito." },
      { label: "C", valor: "Referi-me à Vossa Senhoria." },
      { label: "D", valor: "Dedico isso à você." },
    ],
    correta: "A",
    explicacao: "Não se usa crase antes de pronomes pessoais (ela, você) ou de tratamento (Vossa Senhoria), exceto Senhora e Senhorita.",
  },
  {
    id: 3,
    pergunta: 'Em "Estou disposto a ajudar a quem precisa", a frase está:',
    opcoes: [
      { label: "A", valor: "Correta, sem crase" },
      { label: "B", valor: 'Incorreta, falta crase no primeiro "a"' },
      { label: "C", valor: 'Incorreta, falta crase no segundo "a"' },
      { label: "D", valor: "Incorreta, falta crase em ambos" },
    ],
    correta: "A",
    explicacao: '"Ajudar" é verbo (sem artigo). "Quem" é pronome indefinido (geralmente rejeita artigo).',
  },
];

export const QUIZ_M3_POOL: QuizQuestion[] = [
  {
    id: 301,
    pergunta: "Antes de nomes próprios femininos, o uso da crase é:",
    opcoes: [
      { label: "A", valor: "Obrigatório" },
      { label: "B", valor: "Proibido" },
      { label: "C", valor: "Facultativo" },
      { label: "D", valor: "Obrigatório apenas no plural" },
    ],
    correta: "C",
    explicacao: "Antes de nomes próprios de pessoas (femininos), a crase é facultativa porque o uso do artigo antes do nome também é opcional.",
  },
  {
    id: 302,
    pergunta: "Em qual das frases abaixo a crase é opcional?",
    opcoes: [
      { label: "A", valor: "Entregou o livro à sua irmã." },
      { label: "B", valor: "Entregou o livro à diretora." },
      { label: "C", valor: "Vou à praia amanhã." },
      { label: "D", valor: "Chegamos às dez horas." },
    ],
    correta: "A",
    explicacao: "Antes de pronomes possessivos femininos (sua, minha, tua...), a crase é facultativa.",
  },
];

export const QUIZ_M4_POOL: QuizQuestion[] = [
  {
    id: 401,
    pergunta: "Sobre a indicação de horas, assinale a alternativa correta:",
    opcoes: [
      { label: "A", valor: "Chegaremos a uma hora da manhã." },
      { label: "B", valor: "Chegaremos às uma hora da manhã." },
      { label: "C", valor: "Chegaremos à uma hora da manhã." },
      { label: "D", valor: "Chegaremos as uma hora da manhã." },
    ],
    correta: "C",
    explicacao: "Em indicações de horas exatas, utiliza-se a crase. Como 'uma' é singular, usa-se 'à'.",
  },
  {
    id: 402,
    pergunta: "Ocorre crase na palavra 'casa' quando:",
    opcoes: [
      { label: "A", valor: "Significa lar ou residência própria." },
      { label: "B", valor: "Vem acompanhada de um adjetivo ou locução explicativa." },
      { label: "C", valor: "Sempre que for precedida de preposição." },
      { label: "D", valor: "Nunca ocorre crase com a palavra casa." },
    ],
    correta: "B",
    explicacao: "A palavra 'casa' (sentido de lar) só admite crase se estiver especificada (ex: casa da Maria).",
  },
];

export const QUIZ_FINAL_POOL: QuizQuestion[] = [
  {
    id: 501,
    pergunta: "Assinale a alternativa que exige crase:",
    opcoes: [
      { label: "A", valor: "Saímos as pressas." },
      { label: "B", valor: "Ficamos cara a cara." },
      { label: "C", valor: "Escrevi a lápis." },
      { label: "D", valor: "Andamos a cavalo." },
    ],
    correta: "A",
    explicacao: '"Às pressas" é uma locução adverbial feminina de modo. Locuções femininas levam crase.',
  },
  {
    id: 502,
    pergunta: 'Analise: "Refiro-me àquele rapaz."',
    opcoes: [
      { label: "A", valor: "Errado, aquele é masculino" },
      { label: "B", valor: 'Certo, fusão da preposição "a" + "a" inicial de "aquele"' },
      { label: "C", valor: 'Errado, deveria ser "ao aquele"' },
      { label: "D", valor: "Errado, pronomes demonstrativos nunca levam crase" },
    ],
    correta: "B",
    explicacao: 'A crase ocorre com o "a" inicial dos pronomes demonstrativos aquele(s), aquela(s), aquilo.',
  },
];

export const CHALLENGE_POOL: Challenge[] = [
  {
    wrong: "Vou a festa amanhã.",
    correct: "Vou à festa amanhã.",
    explanation: "Quem vai, vai A algum lugar. Festa é feminina e admite artigo A. A + A = À.",
  },
  {
    wrong: "Andar à pé faz bem.",
    correct: "Andar a pé faz bem.",
    explanation: "Pé é palavra masculina. Não há artigo feminino 'a' antes de masculino. Logo, apenas preposição 'a'.",
  },
  {
    wrong: "O curso começa as 19h.",
    correct: "O curso começa às 19h.",
    explanation: "Indicação de horas exatas sempre leva crase (às duas, às dez, à uma).",
  },
  {
    wrong: "Entreguei o relatório a ela.",
    correct: "Entreguei o relatório a ela.",
    explanation: "Correto! Não se usa crase antes de pronome pessoal (ela, ele, mim, ti, nós...).",
  },
  {
    wrong: "Estamos a espera de um milagre.",
    correct: "Estamos à espera de um milagre.",
    explanation: "Locução prepositiva feminina (à espera de, à procura de, à moda de) sempre leva crase.",
  },
];

// ── COMPONENT DATA ──────────────────────────────────────────────────────

export const PALAVRAS_PERIGOSAS_CARDS: CarouselCard[] = [
  {
    icone: "🚫",
    title: "Antes de Verbos",
    corFundo: "bg-red-100 dark:bg-red-900/30",
    descricao: "Nunca use crase antes de verbos! ✅ A partir de amanhã. ❌ À partir.",
  },
  {
    icone: "👨",
    title: "Palavras Masculinas",
    corFundo: "bg-blue-100 dark:bg-blue-900/30",
    descricao: "Regra geral: sem crase antes de masculino. ✅ Andar a pé. ✅ Escrever a lápis.",
  },
  {
    icone: "👩",
    title: "Nomes Próprios",
    corFundo: "bg-pink-100 dark:bg-pink-900/30",
    descricao: "Uso facultativo antes de nomes de mulheres. ✅ Entreguei a Maria. ✅ Entreguei à Maria.",
  },
  {
    icone: "🏠",
    title: "Casa e Terra",
    corFundo: "bg-amber-100 dark:bg-amber-900/30",
    descricao: "Só levam crase se vierem especificadas. ✅ Vou a casa. ✅ Vou à casa de meus pais.",
  },
];
