import { QuizQuestion } from "../../shared";

export const QUIZ_M1_PONTUACAO: QuizQuestion[] = [
  {
    id: 101,
    pergunta: "É permitido separar o Sujeito do Verbo por vírgula na ordem direta?",
    opcoes: [
      { label: "A", valor: "Sempre, para dar ênfase." },
      { label: "B", valor: "Nunca, é erro gramatical grave." },
      { label: "C", valor: "Apenas se o sujeito for longo." },
      { label: "D", valor: "Somente em textos literários." },
    ],
    correta: "B",
    explicacao: "Jamais se separa sujeito de verbo ou verbo de complemento na ordem direta com vírgulas.",
  },
  {
    id: 102,
    pergunta: "Na frase 'Estudamos, muito hoje.', a vírgula está:",
    opcoes: [
      { label: "A", valor: "Correta, pois isola o advérbio." },
      { label: "B", valor: "Incorreta, pois separa o verbo de seu adjunto adverbial curto." },
      { label: "C", valor: "Obrigatória." },
      { label: "D", valor: "Facultativa." },
    ],
    correta: "B",
    explicacao: "Não se deve separar o verbo de seus complementos ou adjuntos imediatos com uma única vírgula.",
  },
];

export const QUIZ_M2_PONTUACAO: QuizQuestion[] = [
  {
    id: 201,
    pergunta: "Qual a função da vírgula na frase: 'João, traga o relatório.'?",
    opcoes: [
      { label: "A", valor: "Isolar um Aposto." },
      { label: "B", valor: "Isolar um Vocativo (Chamamento)." },
      { label: "C", valor: "Separar itens de uma lista." },
      { label: "D", valor: "Indicar elipse do verbo." },
    ],
    correta: "B",
    explicacao: "O vocativo (chamamento) deve SEMPRE ser isolado por vírgula.",
  },
  {
    id: 202,
    pergunta: "Identifique a frase com Aposto corretamente pontuado:",
    opcoes: [
      { label: "A", valor: "O Rio de Janeiro cidade maravilhosa, recebe turistas." },
      { label: "B", valor: "O Rio de Janeiro, cidade maravilhosa recebe turistas." },
      { label: "C", valor: "O Rio de Janeiro, cidade maravilhosa, recebe turistas." },
      { label: "D", valor: "O Rio de Janeiro cidade maravilhosa recebe, turistas." },
    ],
    correta: "C",
    explicacao: "O aposto explicativo deve vir entre vírgulas.",
  },
];

export const QUIZ_M3_PONTUACAO: QuizQuestion[] = [
  {
    id: 301,
    pergunta: "A vírgula antes da conjunção 'MAS' é:",
    opcoes: [
      { label: "A", valor: "Facultativa." },
      { label: "B", valor: "Proibida." },
      { label: "C", valor: "Obrigatória (Adversativa)." },
      { label: "D", valor: "Depende do contexto." },
    ],
    correta: "C",
    explicacao: "Conjunções adversativas (mas, porém, contudo...) exigem vírgula antes.",
  },
];

export const QUIZ_M4_PONTUACAO: QuizQuestion[] = [
  {
    id: 401,
    pergunta: "Para que servem os DOIS-PONTOS (:) na frase: 'Só desejo uma coisa: paz.'?",
    opcoes: [
      { label: "A", valor: "Indicar uma pausa longa." },
      { label: "B", valor: "Introduzir um esclarecimento ou aposto enumerativo." },
      { label: "C", valor: "Substituir o ponto final." },
      { label: "D", valor: "Marcar uma pergunta." },
    ],
    correta: "B",
    explicacao: "Os dois-pontos introduzem explicações, enumerações ou falas.",
  },
];

export const QUIZ_FINAL_PONTUACAO: QuizQuestion[] = [
  {
    id: 501,
    pergunta: "Assinale a alternativa com pontuação IMPECÁVEL:",
    opcoes: [
      { label: "A", valor: "Os alunos, que estudam, passam." },
      { label: "B", valor: "Os alunos que estudam passam." },
      { label: "C", valor: "Ontem à noite, fomos ao cinema." },
      { label: "D", valor: "Todas as acima podem estar corretas dependendo da intenção." },
    ],
    correta: "D",
    explicacao: "A pontuação pode mudar o sentido (Adjetiva Explicativa vs Restritiva) ou ser facultativa (Adjunto Adverbial curto).",
  },
];
