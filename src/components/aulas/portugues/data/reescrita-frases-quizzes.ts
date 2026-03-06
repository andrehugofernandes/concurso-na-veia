import { QuizQuestion } from "../../shared";

export const QUIZ_M1_REESCRITA: QuizQuestion[] = [
  {
    id: 101,
    pergunta: "Segundo a Cesgranrio, o que é essencial para que uma reescritura seja considerada correta?",
    opcoes: [
      { label: "A", valor: "Apenas a manutenção do sentido original, mesmo com erros gramaticais." },
      { label: "B", valor: "Apenas a correção gramatical, mesmo que o sentido seja alterado." },
      { label: "C", valor: "A manutenção do sentido original E a correção gramatical (norma culta)." },
      { label: "D", valor: "O uso de palavras difíceis e rebuscadas." },
    ],
    correta: "C",
    explicacao: "A reescritura exige o binômio Semântica + Gramática. Não adianta estar gramaticalmente correto se mudou o que o autor disse.",
  },
  {
    id: 102,
    pergunta: "A substituição de 'embora' por 'apesar de' exige qual ajuste na oração?",
    opcoes: [
      { label: "A", valor: "Nenhum ajuste, são sinônimos perfeitos." },
      { label: "B", valor: "O verbo deve passar do subjuntivo para o infinitivo (ou substantivação)." },
      { label: "C", valor: "O verbo deve passar para o futuro do pretérito." },
      { label: "D", valor: "A frase deve ser colocada entre aspas." },
    ],
    correta: "B",
    explicacao: "'Embora' é conjunção (pede verbo conjugado), 'apesar de' é locução prepositiva (pede infinitivo). Ex: Embora chovesse -> Apesar de chover.",
  },
];

export const QUIZ_M2_TECNICAS: QuizQuestion[] = [
  {
    id: 201,
    pergunta: "Ao passar 'O técnico avaliou os riscos' para a voz passiva, temos:",
    opcoes: [
      { label: "A", valor: "Os riscos foram avaliados pelo técnico." },
      { label: "B", valor: "Avaliaram-se os riscos pelo técnico." },
      { label: "C", valor: "O técnico fora avaliar os riscos." },
      { label: "D", valor: "Riscos são avaliados pelo técnico." },
    ],
    correta: "A",
    explicacao: "Voz ativa (passado) -> Voz passiva analítica (ser no passado + particípio). O objeto direto vira sujeito paciente.",
  },
];

export const QUIZ_M3_VOZES: QuizQuestion[] = [
  {
    id: 301,
    pergunta: "A voz passiva de 'O governo anunciará as medidas' é:",
    opcoes: [
      { label: "A", valor: "As medidas seriam anunciadas pelo governo." },
      { label: "B", valor: "As medidas serão anunciadas pelo governo." },
      { label: "C", valor: "As medidas foram anunciadas pelo governo." },
      { label: "D", valor: "Anunciaram-se as medidas pelo governo." },
    ],
    correta: "B",
    explicacao: "Futuro do presente (anunciará) deve ser mantido na passiva (serão anunciadas).",
  },
];

export const QUIZ_M4_DISCURSO: QuizQuestion[] = [
  {
    id: 401,
    pergunta: "Ao passar o discurso direto 'Eu chegarei amanhã' para o indireto, temos:",
    opcoes: [
      { label: "A", valor: "Ele disse que eu chegarei amanhã." },
      { label: "B", valor: "Ele disse que chegaria no dia seguinte." },
      { label: "C", valor: "Ele disse que chegará naquele dia." },
      { label: "D", valor: "No dia seguinte ele diria que chegou." },
    ],
    correta: "B",
    explicacao: "Futuro do presente vira futuro do pretérito, e 'amanhã' vira 'no dia seguinte'.",
  },
];

export const QUIZ_M5_NOMINALIZACAO: QuizQuestion[] = [
  {
    id: 501,
    pergunta: "A nominalização de 'É necessário que o setor público colabore' é:",
    opcoes: [
      { label: "A", valor: "É necessário o setor público colabore." },
      { label: "B", valor: "É necessária a colaboração do setor público." },
      { label: "C", valor: "O setor público deve colaborar." },
      { label: "D", valor: "A colaboração pública é o que é necessário." },
    ],
    correta: "B",
    explicacao: "Transformar o verbo 'colaborar' no substantivo 'colaboração'.",
  },
];

export const QUIZ_M6_CONECTIVOS: QuizQuestion[] = [
  {
    id: 601,
    pergunta: "A substituição de 'Portanto' por 'Conseguinte' na reescrita de uma conclusão é:",
    opcoes: [
      { label: "A", valor: "Válida se usada com a locução 'por conseguinte'." },
      { label: "B", valor: "Sempre inválida." },
      { label: "C", valor: "Válida apenas entre vírgulas." },
      { label: "D", valor: "Inválida por mudança de sentido para causa." },
    ],
    correta: "A",
    explicacao: "O conectivo conclusivo é 'por conseguinte' ou 'consequentemente'. Usar apenas 'conseguinte' é erro gramatical.",
  },
];

export const QUIZ_M7_PONTUACAO: QuizQuestion[] = [
  {
    id: 701,
    pergunta: "Ao reescrever uma oração adjetiva explicativa (com vírgulas) para restritiva (sem vírgulas), o que ocorre?",
    opcoes: [
      { label: "A", valor: "Mantém-se o sentido original." },
      { label: "B", valor: "Altera-se o sentido original (de todos para apenas alguns)." },
      { label: "C", valor: "A frase torna-se gramaticalmente incorreta." },
      { label: "D", valor: "A vírgula é facultativa no padrão Cesgranrio." },
    ],
    correta: "B",
    explicacao: "A pontuação em orações adjetivas é semântica: vírgulas GENERALIZAM (explicam), a falta delas RESTRINGE.",
  },
];

export const QUIZ_M8_PARAFRASES: QuizQuestion[] = [
  {
    id: 801,
    pergunta: "Qual dessas reescritas de 'Embora fizesse calor, ele corria' mantém a oposição?",
    opcoes: [
      { label: "A", valor: "Apesar de fazer calor, ele corria." },
      { label: "B", valor: "Visto que fazia calor, ele corria." },
      { label: "C", valor: "Caso fizesse calor, ele corria." },
      { label: "D", valor: "Conforme fazia calor, ele corria." },
    ],
    correta: "A",
    explicacao: "A oposição (concessão) é mantida pela locução 'Apesar de'.",
  },
];

export const QUIZ_M9_CESGRANRIO: QuizQuestion[] = [
  {
    id: 901,
    pergunta: "Na Cesgranrio, 'posto que' é classicamente:",
    opcoes: [
      { label: "A", valor: "Concessivo (= embora)." },
      { label: "B", valor: "Causal (= já que)." },
      { label: "C", valor: "Temporal (= logo que)." },
      { label: "D", valor: "Final (= para que)." },
    ],
    correta: "A",
    explicacao: "Na norma culta e na Cesgranrio, 'posto que' é concessivo.",
  },
];

export const QUIZ_FINAL_REESCRITA: QuizQuestion[] = [
  {
    id: 1001,
    pergunta: "A reescrita de 'Faz dez anos que trabalho aqui' para 'Há dez anos...' é:",
    opcoes: [
      { label: "A", valor: "Válida e correta." },
      { label: "B", valor: "Inválida por redundância." },
      { label: "C", valor: "Errada, pois 'há' indica apenas passado próximo." },
      { label: "D", valor: "Válida apenas na fala." },
    ],
    correta: "A",
    explicacao: "Ambos os verbos (fazer e haver) indicam tempo decorrido e são impessoais.",
  },
];
