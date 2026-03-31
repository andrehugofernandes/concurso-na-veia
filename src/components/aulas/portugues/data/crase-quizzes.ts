import { QuizQuestion } from "../../shared";

// ────────────────────────────────────────────────────────────────
// MÓDULO 1: CONCEITO E REGRA GERAL
// ────────────────────────────────────────────────────────────────

export const QUIZ_M1_CONCEITO: QuizQuestion[] = [
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
    explicacao:
      'Crase é a contração da preposição "a" exigida pelo termo regente com o artigo "a" (ou pronomes demonstrativos) do termo regido.',
  },
  {
    id: 2,
    pergunta: 'Qual frase exemplifica corretamente o conceito A + A = À?',
    opcoes: [
      { label: "A", valor: "Vou a Brasília" },
      { label: "B", valor: "Vou à praia" },
      { label: "C", valor: "Vou a casa" },
      { label: "D", valor: "Vou a pé" },
    ],
    correta: "B",
    explicacao:
      'Em "vou à praia": vou (verbo) + a (preposição exigida) + a praia (artigo + feminino) = à praia.',
  },
  {
    id: 3,
    pergunta:
      'Complete: "Os engenheiros se referiram ___ estratégia da empresa."',
    opcoes: [
      { label: "A", valor: "à" },
      { label: "B", valor: "a" },
      { label: "C", valor: "ha" },
      { label: "D", valor: "em" },
    ],
    correta: "A",
    explicacao:
      'Referir-se exige preposição "a". "Estratégia" é feminino com artigo "a". Logo: A + A = À.',
  },
  {
    id: 4,
    pergunta: 'Na frase "Vou a Bahia", ocorre crase?',
    opcoes: [
      { label: "A", valor: "Sim, sempre" },
      { label: "B", valor: "Não, pois quem vai a Bahia volta de Bahia" },
      { label: "C", valor: "Sim, pois Bahia é feminino" },
      { label: "D", valor: 'Sim, "Vou à Bahia" porque volto DA Bahia' },
    ],
    correta: "D",
    explicacao:
      'Macete: Quem vai A e volta DA, crase há! Volto DA Bahia, logo, vou À Bahia.',
  },
  {
    id: 5,
    pergunta:
      'A Petrobras dedicou seus recursos ___ inovação e ___ sustentabilidade.',
    opcoes: [
      { label: "A", valor: "a / a" },
      { label: "B", valor: "à / à" },
      { label: "C", valor: "a / à" },
      { label: "D", valor: "à / a" },
    ],
    correta: "B",
    explicacao:
      'Dedicar exige "a". Inovação e sustentabilidade são femininas. À inovação / À sustentabilidade.',
  },
];

export const QUIZ_M2_TESTE_MASCULINO: QuizQuestion[] = [
  {
    id: 201,
    pergunta: 'Qual é a "Regra de Ouro" para identificar crase?',
    opcoes: [
      { label: "A", valor: 'Trocar por masculino e ver se vira "AO"' },
      { label: "B", valor: "Trocar por plural" },
      { label: "C", valor: "Ver se a palavra termina em a" },
      { label: "D", valor: "Sempre usar crase antes de feminino" },
    ],
    correta: "A",
    explicacao:
      'Se vira "ao", há crase (à escola = ao colégio).',
  },
  {
    id: 202,
    pergunta: 'Em "Vou à biblioteca", trocando por masculino fica:',
    opcoes: [
      { label: "A", valor: "Vou a livro" },
      { label: "B", valor: "Vou ao museu" },
      { label: "C", valor: "Vou a prédio" },
      { label: "D", valor: "Vou nesse lugar" },
    ],
    correta: "B",
    explicacao:
      'Vou à biblioteca = Vou ao museu. O "a" virou "ao", confirmando a crase.',
  },
  {
    id: 203,
    pergunta: 'Qual alternativa mostra corretamente a substituição masculina?',
    opcoes: [
      { label: "A", valor: "Viagem à Itália = Viagem a Italia (masculino)" },
      { label: "B", valor: "Viagem à Itália = Viagem ao Itália" },
      { label: "C", valor: "Viagem à Itália = Viagem ao país" },
      { label: "D", valor: "Viagem à Itália = Viagem para Itália" },
    ],
    correta: "C",
    explicacao:
      'Quando substituímos por um substantivo masculino apropriado, obtemos "ao país", confirmando a crase.',
  },
];

export const QUIZ_M3_PROIBIDO_VERBOS: QuizQuestion[] = [
  {
    id: 301,
    pergunta: "Nunca ocorre crase antes de:",
    opcoes: [
      { label: "A", valor: "Palavras femininas" },
      { label: "B", valor: "Verbos" },
      { label: "C", valor: "Horas" },
      { label: "D", valor: "Locuções adverbiais" },
    ],
    correta: "B",
    explicacao:
      'Verbos não admitem artigo feminino, logo nunca há crase (a fazer, a partir).',
  },
  {
    id: 302,
    pergunta: 'Qual frase está incorreta quanto ao uso de crase?',
    opcoes: [
      { label: "A", valor: "Começou a chover" },
      { label: "B", valor: "Passou a trabalhar com dedicação" },
      { label: "C", valor: "Refiro-me à dificuldade" },
      { label: "D", valor: "Começou à cantar" },
    ],
    correta: "D",
    explicacao:
      'Antes de verbo infinitivo não há crase: "começou a cantar", não "à cantar".',
  },
  {
    id: 303,
    pergunta: 'Complete: "Procedeu ___ limpeza das áreas."',
    opcoes: [
      { label: "A", valor: "à limpeza" },
      { label: "B", valor: "a limpeza" },
      { label: "C", valor: "à limpar" },
      { label: "D", valor: "a limpar" },
    ],
    correta: "A",
    explicacao:
      'Proceder exige "a". "Limpeza" é substantivo feminino. Logo: à limpeza. Se fosse verbo (limpar), seria apenas "a".',
  },
];

export const QUIZ_M4_PROIBIDO_PRONOMES: QuizQuestion[] = [
  {
    id: 401,
    pergunta: "Qual frase está CORRETA quanto ao uso de crase com pronomes?",
    opcoes: [
      { label: "A", valor: "Referi-me a ela com respeito" },
      { label: "B", valor: "Referi-me à ela com respeito" },
      { label: "C", valor: "Referi-me à Vossa Senhoria" },
      { label: "D", valor: "Dedico isso à você" },
    ],
    correta: "A",
    explicacao:
      'Pronomes pessoais não recebem crase.',
  },
  {
    id: 402,
    pergunta: 'Em relação aos pronomes, a crase NÃO ocorre antes de:',
    opcoes: [
      { label: "A", valor: "Pronomes demonstrativos" },
      { label: "B", valor: "Pronomes pessoais" },
      { label: "C", valor: "Pronomes relativos" },
      { label: "D", valor: "Todas as alternativas anteriores" },
    ],
    correta: "B",
    explicacao:
      'Pronomes pessoais (me, ti, ele, ela, nós, vós, eles, elas) nunca recebem crase.',
  },
  {
    id: 403,
    pergunta: 'Qual alternativa está INCORRETA?',
    opcoes: [
      { label: "A", valor: "Entreguei o documento a ela" },
      { label: "B", valor: "Refiro-me à Senhora" },
      { label: "C", valor: "Apresentei-o a você" },
      { label: "D", valor: "Dedico isso àquele colega" },
    ],
    correta: "D",
    explicacao:
      '"Àquele" leva crase porque "aquele" é pronome demonstrativo que pode receber crase, não pessoal.',
  },
];

export const QUIZ_M5_FACULTATIVO_NOMES: QuizQuestion[] = [
  {
    id: 501,
    pergunta: "Antes de nomes próprios femininos, o uso da crase é:",
    opcoes: [
      { label: "A", valor: "Obrigatório" },
      { label: "B", valor: "Proibido" },
      { label: "C", valor: "Facultativo" },
      { label: "D", valor: "Obrigatório no plural" },
    ],
    correta: "C",
    explicacao:
      'Crase é facultativa porque o artigo também é (a Maria ou à Maria).',
  },
  {
    id: 502,
    pergunta: 'Qual das frases mostra a crase FACULTATIVA corretamente?',
    opcoes: [
      { label: "A", valor: "Entreguei a carta a Maria / Entreguei a carta à Maria" },
      { label: "B", valor: "Fui a Brasília (obrigatório)" },
      { label: "C", valor: "Estou a espera (proibido)" },
      { label: "D", valor: "Refiro-me àquele rapaz (obrigatório)" },
    ],
    correta: "A",
    explicacao:
      'Com nomes próprios femininos, ambas as formas são aceitas por ser o artigo opcional.',
  },
  {
    id: 503,
    pergunta: 'Em "Refiro-me à Maria do Carmo", a crase deixa de ser facultativa porque:',
    opcoes: [
      { label: "A", valor: "O nome virou masculino" },
      { label: "B", valor: "O nome foi especificado/determinado" },
      { label: "C", valor: "Há um verbo antes" },
      { label: "D", valor: "Não há mais facultatividade em nomes" },
    ],
    correta: "B",
    explicacao:
      'Quando o nome próprio recebe especificador (adjetivo, adjunto), o artigo torna-se obrigatório, logo a crase também.',
  },
];

export const QUIZ_M6_FACULTATIVO_POSSESSIVOS: QuizQuestion[] = [
  {
    id: 601,
    pergunta: "Antes de possessivos femininos, a crase é:",
    opcoes: [
      { label: "A", valor: "Obrigatória" },
      { label: "B", valor: "Proibida" },
      { label: "C", valor: "Facultativa" },
      { label: "D", valor: "Inexistente" },
    ],
    correta: "C",
    explicacao:
      'Como o artigo é opcional (a minha ou minha), a crase também é (a ou à minha).',
  },
  {
    id: 602,
    pergunta: 'Complete corretamente: "Referi-me ___ sua proposta."',
    opcoes: [
      { label: "A", valor: "a sua" },
      { label: "B", valor: "à sua" },
      { label: "C", valor: "a sua ou à sua" },
      { label: "D", valor: "a sva" },
    ],
    correta: "C",
    explicacao:
      'Com possessivos femininos, ambas as formas são corretas (a sua ou à sua).',
  },
  {
    id: 603,
    pergunta: 'Em "Obedeci à sua ordem e não à minha", qual é a diferença?',
    opcoes: [
      { label: "A", valor: "Nenhuma, ambos são facultativos" },
      { label: "B", valor: "O primeiro é facultativo, o segundo é obrigatório" },
      { label: "C", valor: "O primeiro é obrigatório, o segundo é facultativo" },
      { label: "D", valor: "Ambos são obrigatórios" },
    ],
    correta: "B",
    explicacao:
      'Em "à sua ordem" é facultativo (acompanha substantivo). Em "à minha" é obrigatório (substitui "ordem").',
  },
];

export const QUIZ_M7_HORAS_MEDIDAS: QuizQuestion[] = [
  {
    id: 701,
    pergunta: 'Em "A reunião é ___ 14h30", qual é a forma correta?',
    opcoes: [
      { label: "A", valor: "a 14h30" },
      { label: "B", valor: "à 14h30" },
      { label: "C", valor: "às 14h30" },
      { label: "D", valor: "em 14h30" },
    ],
    correta: "C",
    explicacao:
      'Indicação de hora: "às" (crase com artigo plural as).',
  },
  {
    id: 702,
    pergunta: 'Complete: "A aula vai ___ uma hora da tarde."',
    opcoes: [
      { label: "A", valor: "a uma" },
      { label: "B", valor: "à uma" },
      { label: "C", valor: "às uma" },
      { label: "D", valor: "numa" },
    ],
    correta: "B",
    explicacao:
      'Hora singular: "à uma" (crase com artigo singular a).',
  },
  {
    id: 703,
    pergunta: 'Qual alternativa está INCORRETA quanto a horas?',
    opcoes: [
      { label: "A", valor: "O expediente abre às 8h" },
      { label: "B", valor: "Chegue à uma hora em ponto" },
      { label: "C", valor: "Saio as três da tarde" },
      { label: "D", valor: "Marque às 15 horas" },
    ],
    correta: "C",
    explicacao:
      'Deve ser "Saio às três", não "as três" (crase obrigatória com horas).',
  },
];

export const QUIZ_M8_CASOS_ESPECIAIS: QuizQuestion[] = [
  {
    id: 801,
    pergunta: 'Em "Vou ____ casa", quando significa residência própria:',
    opcoes: [
      { label: "A", valor: "Vou à casa (com crase)" },
      { label: "B", valor: "Vou a casa (sem crase)" },
      { label: "C", valor: "Vou casa (sem preposição)" },
      { label: "D", valor: "Vou na casa (preposição diferente)" },
    ],
    correta: "B",
    explicacao:
      'Casa genérica não recebe artigo (vou a casa).',
  },
  {
    id: 802,
    pergunta: 'Complete: "Fui ____ casa da vovó buscar o bolo."',
    opcoes: [
      { label: "A", valor: "a casa" },
      { label: "B", valor: "à casa" },
      { label: "C", valor: "casa" },
      { label: "D", valor: "na casa" },
    ],
    correta: "B",
    explicacao:
      'Casa especificada ("da vovó") recebe artigo e crase: à casa.',
  },
  {
    id: 803,
    pergunta: 'Em relação à palavra "terra", qual alternativa é INCORRETA?',
    opcoes: [
      { label: "A", valor: "Os marinheiros desceram à terra" },
      { label: "B", valor: "Voltamos à Terra (planeta)" },
      { label: "C", valor: "Os navegadores desembarcaram a terra" },
      { label: "D", valor: "Ficava distante à terra firme" },
    ],
    correta: "C",
    explicacao:
      'Quando "terra" = oposto de mar/bordo, sem especificador, não há crase: desceram a terra.',
  },
];

export const QUIZ_M9_DEMONSTRATIVOS: QuizQuestion[] = [
  {
    id: 901,
    pergunta: 'Complete: "Refiro-me ____ aquela proposta que você mencionou."',
    opcoes: [
      { label: "A", valor: "a aquela" },
      { label: "B", valor: "àquela" },
      { label: "C", valor: "à aquela" },
      { label: "D", valor: "em aquela" },
    ],
    correta: "B",
    explicacao:
      '"Àquela" = A + AQUELA (demonstrativo com crase).',
  },
  {
    id: 902,
    pergunta: 'Qual alternativa está CORRETA com pronomes demonstrativos?',
    opcoes: [
      { label: "A", valor: "Aludi àquilo que você disse" },
      { label: "B", valor: "Aludi àquele documento" },
      { label: "C", valor: "Aludi àqueles rapazes" },
      { label: "D", valor: "Todas as alternativas estão corretas" },
    ],
    correta: "D",
    explicacao:
      'Pronomes demonstrativos (aquele, aquela, aquilo, etc.) recebem crase quando há preposição "a".',
  },
  {
    id: 903,
    pergunta: 'Em "Entreguei a carta àqueles colegas", o uso da crase é:',
    opcoes: [
      { label: "A", valor: "Obrigatório" },
      { label: "B", valor: "Proibido" },
      { label: "C", valor: "Facultativo" },
      { label: "D", valor: "Depende do contexto" },
    ],
    correta: "A",
    explicacao:
      'Demonstrativos plurais também recebem crase quando há preposição: àqueles, àquelas.',
  },
];

export const QUIZ_M10_SIMULADO: QuizQuestion[] = [
  {
    id: 1001,
    pergunta:
      'Em "A Petrobras dedica-se ____ inovação e ____ desenvolvimento", qual é correto?',
    opcoes: [
      { label: "A", valor: "a / a" },
      { label: "B", valor: "à / à" },
      { label: "C", valor: "a / à" },
      { label: "D", valor: "à / a" },
    ],
    correta: "C",
    explicacao:
      'Inovação é feminino (à inovação). Desenvolvimento é masculino (a desenvolvimento).',
  },
  {
    id: 1002,
    pergunta: 'Complete a sequência: "A empresa se refere ____ qualidade, ____ excelência e ____ inovação."',
    opcoes: [
      { label: "A", valor: "à / à / à" },
      { label: "B", valor: "a / a / a" },
      { label: "C", valor: "à / a / à" },
      { label: "D", valor: "a / à / a" },
    ],
    correta: "A",
    explicacao:
      'Todas as palavras são femininas: qualidade, excelência, inovação. Logo: à qualidade, à excelência, à inovação.',
  },
  {
    id: 1003,
    pergunta: 'Qual frase está COMPLETAMENTE CORRETA?',
    opcoes: [
      { label: "A", valor: "Refiro-me àquele documento e à Maria" },
      { label: "B", valor: "Chegarei às 14h e estarei a sua disposição" },
      { label: "C", valor: "Fui à casa da vovó para aprender a cozinhar" },
      { label: "D", valor: "Vou à Brasília e faço visita à minha terra" },
    ],
    correta: "A",
    explicacao:
      'Àquele é correto (demonstrativo), à Maria é correto (nome próprio especificado). As outras têm erros.',
  },
  {
    id: 1004,
    pergunta: 'Em "A aula vai da uma ____ cinco da tarde", qual preenchimento está correto?',
    opcoes: [
      { label: "A", valor: "a cinco" },
      { label: "B", valor: "até cinco" },
      { label: "C", valor: "à cinco" },
      { label: "D", valor: "às cinco" },
    ],
    correta: "D",
    explicacao:
      'Com horas: "da uma às cinco" (DAS...ÀS mantém o paralelismo sintático).',
  },
];
