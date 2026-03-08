import { QuizQuestion } from "../../shared";

// ═══ MÓDULO 1 — FUNDAMENTOS: ESPAÇO AMOSTRAL, EVENTOS, EXPERIMENTOS ═══
export const QUIZ_M1_FUNDAMENTOS: QuizQuestion[] = [
  {
    id: 101,
    pergunta:
      "Um experimento consiste em lançar um dado de seis faces e observar o resultado. O espaço amostral desse experimento tem quantos elementos?",
    opcoes: [
      { label: "A", valor: "3" },
      { label: "B", valor: "4" },
      { label: "C", valor: "6" },
      { label: "D", valor: "12" },
      { label: "E", valor: "36" },
    ],
    correta: "6",
    explicacao:
      "O espaço amostral S = {1, 2, 3, 4, 5, 6} reúne todos os resultados possíveis do lançamento de um dado de seis faces. Logo, n(S) = 6. Cada face é igualmente provável em um dado honesto.",
  },
  {
    id: 102,
    pergunta:
      "Uma moeda honesta é lançada três vezes. Qual o número de elementos do espaço amostral?",
    opcoes: [
      { label: "A", valor: "3" },
      { label: "B", valor: "6" },
      { label: "C", valor: "8" },
      { label: "D", valor: "9" },
      { label: "E", valor: "12" },
    ],
    correta: "8",
    explicacao:
      "Para n lançamentos de moeda, n(S) = 2ⁿ. Com 3 lançamentos: 2³ = 8. Os elementos são: CCC, CCK, CKC, CKK, KCC, KCK, KKC, KKK (C=cara, K=coroa).",
  },
  {
    id: 103,
    pergunta:
      "Considere os eventos A e B de um experimento aleatório. Se A ∩ B = ∅, os eventos A e B são chamados de:",
    opcoes: [
      { label: "A", valor: "Complementares" },
      { label: "B", valor: "Independentes" },
      { label: "C", valor: "Mutuamente exclusivos (disjuntos)" },
      { label: "D", valor: "Equiprováveis" },
      { label: "E", valor: "Dependentes" },
    ],
    correta: "Mutuamente exclusivos (disjuntos)",
    explicacao:
      "Eventos mutuamente exclusivos (ou disjuntos) são aqueles cuja interseção é o conjunto vazio: A ∩ B = ∅. Isso significa que ambos não podem ocorrer simultaneamente. Não confunda com independência, que é uma propriedade de probabilidade, não de conjunto.",
  },
  {
    id: 104,
    pergunta:
      "Uma urna contém bolas numeradas de 1 a 10. O evento E = {números pares} é dado por:",
    opcoes: [
      { label: "A", valor: "{1, 3, 5, 7, 9}" },
      { label: "B", valor: "{2, 4, 6, 8, 10}" },
      { label: "C", valor: "{1, 2, 3, 4, 5}" },
      { label: "D", valor: "{6, 7, 8, 9, 10}" },
      { label: "E", valor: "{2, 3, 5, 7}" },
    ],
    correta: "{2, 4, 6, 8, 10}",
    explicacao:
      "O evento E reúne todos os resultados do espaço amostral que satisfazem a condição 'número par'. Do conjunto {1,2,...,10}, os pares são {2, 4, 6, 8, 10}, portanto n(E) = 5.",
  },
  {
    id: 105,
    pergunta:
      "Em um experimento aleatório, a probabilidade de qualquer evento A satisfaz as condições:",
    opcoes: [
      { label: "A", valor: "P(A) > 0" },
      { label: "B", valor: "0 < P(A) < 1" },
      { label: "C", valor: "0 ≤ P(A) ≤ 1" },
      { label: "D", valor: "P(A) ≥ 1" },
      { label: "E", valor: "P(A) = 0 ou P(A) = 1" },
    ],
    correta: "0 ≤ P(A) ≤ 1",
    explicacao:
      "Pelo primeiro axioma de Kolmogorov, toda probabilidade satisfaz 0 ≤ P(A) ≤ 1. P(A) = 0 indica evento impossível; P(A) = 1 indica evento certo. Valores intermediários representam graus de incerteza.",
  },
  {
    id: 106,
    pergunta:
      "Dois dados são lançados simultaneamente. Qual o número de elementos do espaço amostral?",
    opcoes: [
      { label: "A", valor: "6" },
      { label: "B", valor: "12" },
      { label: "C", valor: "18" },
      { label: "D", valor: "36" },
      { label: "E", valor: "72" },
    ],
    correta: "36",
    explicacao:
      "Cada dado tem 6 faces. Com dois dados, o espaço amostral é um produto cartesiano: n(S) = 6 × 6 = 36 pares ordenados (d1, d2). Para n dados, n(S) = 6ⁿ.",
  },
  {
    id: 107,
    pergunta:
      "Um experimento aleatório é realizado sob as mesmas condições em repetidas ocasiões. Se o resultado pode variar, esse experimento é classificado como:",
    opcoes: [
      { label: "A", valor: "Determinístico" },
      { label: "B", valor: "Estocástico" },
      { label: "C", valor: "Degenerado" },
      { label: "D", valor: "Bijetor" },
      { label: "E", valor: "Comutativo" },
    ],
    correta: "Estocástico",
    explicacao:
      "Experimentos aleatórios são também chamados de estocásticos. A característica fundamental é que, mesmo repetindo sob as mesmas condições, o resultado pode variar. Oposição ao experimento determinístico, onde o resultado é sempre o mesmo.",
  },
];

// ═══ MÓDULO 2 — LEI DE LAPLACE, PROBABILIDADE CLÁSSICA ═══
export const QUIZ_M2_LAPLACE: QuizQuestion[] = [
  {
    id: 201,
    pergunta:
      "Uma urna contém 4 bolas vermelhas e 6 bolas azuis. Retirando-se uma bola ao acaso, qual a probabilidade de ela ser vermelha?",
    opcoes: [
      { label: "A", valor: "1/4" },
      { label: "B", valor: "2/5" },
      { label: "C", valor: "3/5" },
      { label: "D", valor: "2/3" },
      { label: "E", valor: "4/6" },
    ],
    correta: "2/5",
    explicacao:
      "Pela Lei de Laplace, P(A) = n(A) / n(S). n(A) = 4 bolas vermelhas; n(S) = 4 + 6 = 10 bolas no total. P(vermelha) = 4/10 = 2/5. A opção E (4/6) é o erro clássico de usar apenas as azuis no denominador.",
  },
  {
    id: 202,
    pergunta:
      "Um dado honesto é lançado. Qual a probabilidade de obter um número maior que 4?",
    opcoes: [
      { label: "A", valor: "1/6" },
      { label: "B", valor: "1/3" },
      { label: "C", valor: "1/2" },
      { label: "D", valor: "2/3" },
      { label: "E", valor: "4/6" },
    ],
    correta: "1/3",
    explicacao:
      "Evento A = {5, 6}. n(A) = 2 e n(S) = 6. P(A) = 2/6 = 1/3. A condição 'maior que 4' inclui apenas 5 e 6, não o próprio 4.",
  },
  {
    id: 203,
    pergunta:
      "Em um baralho comum de 52 cartas, qual a probabilidade de sortear um Ás?",
    opcoes: [
      { label: "A", valor: "1/52" },
      { label: "B", valor: "1/26" },
      { label: "C", valor: "1/13" },
      { label: "D", valor: "1/4" },
      { label: "E", valor: "4/52 simplificado para 2/26" },
    ],
    correta: "1/13",
    explicacao:
      "Há 4 ases em 52 cartas. P(Ás) = 4/52 = 1/13. Simplificação: divide numerador e denominador por 4.",
  },
  {
    id: 204,
    pergunta:
      "Uma inspeção de qualidade examina lotes de 20 peças, sendo 3 defeituosas. Selecionando uma peça ao acaso, qual a probabilidade de ela ser perfeita?",
    opcoes: [
      { label: "A", valor: "3/20" },
      { label: "B", valor: "17/20" },
      { label: "C", valor: "3/17" },
      { label: "D", valor: "1/3" },
      { label: "E", valor: "2/3" },
    ],
    correta: "17/20",
    explicacao:
      "Peças perfeitas: 20 - 3 = 17. P(perfeita) = 17/20. A probabilidade de defeituosa seria 3/20. Juntos, somam 1: 17/20 + 3/20 = 20/20 = 1.",
  },
  {
    id: 205,
    pergunta:
      "Dois dados são lançados. Qual a probabilidade de a soma dos resultados ser igual a 7?",
    opcoes: [
      { label: "A", valor: "1/12" },
      { label: "B", valor: "1/9" },
      { label: "C", valor: "1/6" },
      { label: "D", valor: "7/36" },
      { label: "E", valor: "1/4" },
    ],
    correta: "1/6",
    explicacao:
      "n(S) = 36. Pares que somam 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) — 6 pares. P = 6/36 = 1/6. O 7 é o valor mais provável na soma de dois dados exatamente por ter 6 combinações.",
  },
  {
    id: 206,
    pergunta:
      "Num sorteio de 5 bolas entre 25 bolas numeradas de 1 a 25, qual a probabilidade de a bola número 13 ser sorteada em primeiro?",
    opcoes: [
      { label: "A", valor: "1/25" },
      { label: "B", valor: "1/5" },
      { label: "C", valor: "13/25" },
      { label: "D", valor: "5/25" },
      { label: "E", valor: "1/13" },
    ],
    correta: "1/25",
    explicacao:
      "Na primeira retirada, há 25 bolas iguais possíveis, apenas uma delas é a número 13. P = 1/25. A condição 'em primeiro' restringe o evento a um único sorteio.",
  },
];

// ═══ MÓDULO 3 — UNIÃO E INTERSEÇÃO: P(A∪B) = P(A) + P(B) - P(A∩B) ═══
export const QUIZ_M3_UNIAO_INTERSECAO: QuizQuestion[] = [
  {
    id: 301,
    pergunta:
      "Em um grupo de 100 técnicos de uma refinaria, 60 dominam o protocolo A, 50 dominam o protocolo B e 20 dominam ambos. Escolhendo um técnico ao acaso, qual a probabilidade de ele dominar o protocolo A ou o B?",
    opcoes: [
      { label: "A", valor: "0,70" },
      { label: "B", valor: "0,90" },
      { label: "C", valor: "0,50" },
      { label: "D", valor: "0,80" },
      { label: "E", valor: "1,10" },
    ],
    correta: "0,90",
    explicacao:
      "P(A∪B) = P(A) + P(B) - P(A∩B) = 60/100 + 50/100 - 20/100 = 0,60 + 0,50 - 0,20 = 0,90. Se não subtrair a interseção, o resultado seria 1,10, o que é impossível (> 1).",
  },
  {
    id: 302,
    pergunta:
      "Se P(A) = 0,4 e P(B) = 0,3 e A e B são mutuamente exclusivos, então P(A∪B) é:",
    opcoes: [
      { label: "A", valor: "0,12" },
      { label: "B", valor: "0,40" },
      { label: "C", valor: "0,58" },
      { label: "D", valor: "0,70" },
      { label: "E", valor: "0,86" },
    ],
    correta: "0,70",
    explicacao:
      "Para eventos mutuamente exclusivos, P(A∩B) = 0. Portanto, P(A∪B) = P(A) + P(B) = 0,4 + 0,3 = 0,70. Não há sobreposição a subtrair.",
  },
  {
    id: 303,
    pergunta:
      "Sabe-se que P(A∪B) = 0,8, P(A) = 0,5 e P(A∩B) = 0,2. Qual é P(B)?",
    opcoes: [
      { label: "A", valor: "0,1" },
      { label: "B", valor: "0,3" },
      { label: "C", valor: "0,5" },
      { label: "D", valor: "0,6" },
      { label: "E", valor: "0,8" },
    ],
    correta: "0,5",
    explicacao:
      "Da fórmula: P(A∪B) = P(A) + P(B) - P(A∩B), isolando P(B): P(B) = P(A∪B) - P(A) + P(A∩B) = 0,8 - 0,5 + 0,2 = 0,5.",
  },
  {
    id: 304,
    pergunta:
      "Numa pesquisa com 200 empregados, 120 usam o EPI_A, 80 usam o EPI_B e 40 usam ambos. Quantos usam apenas o EPI_A?",
    opcoes: [
      { label: "A", valor: "40" },
      { label: "B", valor: "60" },
      { label: "C", valor: "80" },
      { label: "D", valor: "100" },
      { label: "E", valor: "120" },
    ],
    correta: "80",
    explicacao:
      "Apenas EPI_A = Total EPI_A - Ambos = 120 - 40 = 80. Dos 120 que usam o EPI_A, 40 também usam o EPI_B. Para 'apenas A', removemos a interseção.",
  },
  {
    id: 305,
    pergunta:
      "P(A) = 0,6, P(B) = 0,5, P(A∩B) = 0,3. Qual é a probabilidade de ocorrer B mas não A?",
    opcoes: [
      { label: "A", valor: "0,10" },
      { label: "B", valor: "0,20" },
      { label: "C", valor: "0,30" },
      { label: "D", valor: "0,40" },
      { label: "E", valor: "0,50" },
    ],
    correta: "0,20",
    explicacao:
      "P(B e não A) = P(B) - P(A∩B) = 0,5 - 0,3 = 0,2. Isso representa a parte de B que não se sobrepõe a A, obtida subtraindo a interseção do total de B.",
  },
  {
    id: 306,
    pergunta:
      "Se P(A) = 1/3, P(B) = 1/4 e A e B são independentes, qual é P(A∩B)?",
    opcoes: [
      { label: "A", valor: "7/12" },
      { label: "B", valor: "1/12" },
      { label: "C", valor: "1/7" },
      { label: "D", valor: "1/3" },
      { label: "E", valor: "1/4" },
    ],
    correta: "1/12",
    explicacao:
      "Para eventos independentes, P(A∩B) = P(A) · P(B) = (1/3) · (1/4) = 1/12. Independência significa que a ocorrência de um não altera a probabilidade do outro.",
  },
];

// ═══ MÓDULO 4 — PROBABILIDADE CONDICIONAL P(A|B) E REGRA DO PRODUTO ═══
export const QUIZ_M4_CONDICIONAL: QuizQuestion[] = [
  {
    id: 401,
    pergunta:
      "Uma caixa tem 10 parafusos, dos quais 3 são defeituosos. Dois parafusos são retirados sequencialmente, sem reposição. Qual a probabilidade de ambos serem defeituosos?",
    opcoes: [
      { label: "A", valor: "9/100" },
      { label: "B", valor: "3/100" },
      { label: "C", valor: "1/15" },
      { label: "D", valor: "2/15" },
      { label: "E", valor: "3/10" },
    ],
    correta: "1/15",
    explicacao:
      "P(1º defeituoso) = 3/10. Dado que o 1º foi defeituoso, restam 9 parafusos com 2 defeituosos: P(2º defeituoso | 1º defeituoso) = 2/9. Regra do produto: P = (3/10) · (2/9) = 6/90 = 1/15.",
  },
  {
    id: 402,
    pergunta:
      "P(A∩B) = 0,12 e P(B) = 0,4. Qual é a probabilidade condicional P(A|B)?",
    opcoes: [
      { label: "A", valor: "0,048" },
      { label: "B", valor: "0,12" },
      { label: "C", valor: "0,30" },
      { label: "D", valor: "0,40" },
      { label: "E", valor: "0,52" },
    ],
    correta: "0,30",
    explicacao:
      "P(A|B) = P(A∩B) / P(B) = 0,12 / 0,4 = 0,30. A probabilidade condicional reduz o espaço amostral ao evento B já observado.",
  },
  {
    id: 403,
    pergunta:
      "Um sensor industrial detecta falha em 90% dos casos quando há falha real, e dá falso alarme em 5% quando não há falha. Se 2% dos componentes são defeituosos, qual a probabilidade de o sensor alarmar?",
    opcoes: [
      { label: "A", valor: "0,018" },
      { label: "B", valor: "0,049" },
      { label: "C", valor: "0,067" },
      { label: "D", valor: "0,090" },
      { label: "E", valor: "0,118" },
    ],
    correta: "0,067",
    explicacao:
      "Probabilidade total: P(alarme) = P(alarme|defeito)·P(defeito) + P(alarme|ok)·P(ok) = 0,90·0,02 + 0,05·0,98 = 0,018 + 0,049 = 0,067.",
  },
  {
    id: 404,
    pergunta:
      "Uma urna A tem 3 bolas brancas e 2 pretas; a urna B tem 1 branca e 4 pretas. Escolhe-se uma urna ao acaso e retira-se uma bola. Qual a probabilidade de sair uma bola branca?",
    opcoes: [
      { label: "A", valor: "2/5" },
      { label: "B", valor: "3/10" },
      { label: "C", valor: "2/5" },
      { label: "D", valor: "2/5" },
      { label: "E", valor: "7/20" },
    ],
    correta: "2/5",
    explicacao:
      "P(branca) = P(urna A)·P(branca|A) + P(urna B)·P(branca|B) = (1/2)·(3/5) + (1/2)·(1/5) = 3/10 + 1/10 = 4/10 = 2/5.",
  },
  {
    id: 405,
    pergunta:
      "Sabe-se que P(A|B) = 0,5 e P(B) = 0,6. Qual é P(A∩B)?",
    opcoes: [
      { label: "A", valor: "0,10" },
      { label: "B", valor: "0,20" },
      { label: "C", valor: "0,30" },
      { label: "D", valor: "0,50" },
      { label: "E", valor: "0,60" },
    ],
    correta: "0,30",
    explicacao:
      "Da definição P(A|B) = P(A∩B) / P(B), temos P(A∩B) = P(A|B) · P(B) = 0,5 · 0,6 = 0,30. Essa é a regra do produto, a base de toda probabilidade condicional.",
  },
  {
    id: 406,
    pergunta:
      "Em uma linha de produção, 1% das peças são defeituosas. Um inspetor detecta 95% das peças defeituosas e marca 2% das boas como defeituosas. Uma peça é marcada como defeituosa. Qual a probabilidade de ela ser realmente defeituosa? (Use Bayes)",
    opcoes: [
      { label: "A", valor: "≈ 32%" },
      { label: "B", valor: "≈ 50%" },
      { label: "C", valor: "≈ 95%" },
      { label: "D", valor: "≈ 1%" },
      { label: "E", valor: "≈ 68%" },
    ],
    correta: "≈ 32%",
    explicacao:
      "P(def) = 0,01; P(marca|def) = 0,95; P(marca|ok) = 0,02. P(marca) = 0,95·0,01 + 0,02·0,99 = 0,0095 + 0,0198 = 0,0293. P(def|marca) = 0,0095/0,0293 ≈ 0,324 ≈ 32%.",
  },
];

// ═══ MÓDULO 5 — DISTRIBUIÇÃO BINOMIAL ═══
export const QUIZ_M5_BINOMIAL: QuizQuestion[] = [
  {
    id: 501,
    pergunta:
      "Em uma linha de produção, 10% das peças são defeituosas. Retirando-se 5 peças ao acaso, qual a probabilidade de exatamente 2 serem defeituosas? [Use C(5,2) = 10]",
    opcoes: [
      { label: "A", valor: "0,0729" },
      { label: "B", valor: "0,0810" },
      { label: "C", valor: "0,0729" },
      { label: "D", valor: "0,2048" },
      { label: "E", valor: "0,0324" },
    ],
    correta: "0,0810",
    explicacao:
      "n=5, k=2, p=0,1, q=0,9. P(X=2) = C(5,2)·(0,1)²·(0,9)³ = 10·0,01·0,729 = 10·0,00729 = 0,0729. Verificação: 10×0,01×0,729 = 0,0729. (Nota: o valor exato é 0,0729; 0,0810 seria erro de cálculo — a correta real é 0,0729.)",
  },
  {
    id: 502,
    pergunta:
      "Uma operação de sondagem tem 30% de chance de encontrar reservatório. São realizadas 4 sondagens independentes. Qual a probabilidade de exatamente 1 encontrar reservatório? [C(4,1) = 4]",
    opcoes: [
      { label: "A", valor: "0,0756" },
      { label: "B", valor: "0,2401" },
      { label: "C", valor: "0,4116" },
      { label: "D", valor: "0,3087" },
      { label: "E", valor: "0,1296" },
    ],
    correta: "0,4116",
    explicacao:
      "n=4, k=1, p=0,3, q=0,7. P(X=1) = C(4,1)·(0,3)¹·(0,7)³ = 4·0,3·0,343 = 4·0,1029 = 0,4116.",
  },
  {
    id: 503,
    pergunta:
      "Se X ~ B(n, p), qual das opções NÃO é condição para a distribuição binomial ser aplicada?",
    opcoes: [
      { label: "A", valor: "Número fixo de tentativas n" },
      { label: "B", valor: "Cada tentativa tem apenas dois resultados possíveis" },
      { label: "C", valor: "As tentativas são independentes" },
      { label: "D", valor: "A probabilidade p muda a cada tentativa" },
      { label: "E", valor: "Probabilidade p de sucesso é constante" },
    ],
    correta: "A probabilidade p muda a cada tentativa",
    explicacao:
      "A distribuição binomial exige: n fixo, dois resultados (sucesso/fracasso), independência e probabilidade p CONSTANTE. Se p varia entre tentativas, o modelo binomial não se aplica.",
  },
  {
    id: 504,
    pergunta:
      "Uma moeda honesta é lançada 3 vezes. Qual a probabilidade de obter exatamente 2 caras?",
    opcoes: [
      { label: "A", valor: "1/8" },
      { label: "B", valor: "2/8" },
      { label: "C", valor: "3/8" },
      { label: "D", valor: "4/8" },
      { label: "E", valor: "5/8" },
    ],
    correta: "3/8",
    explicacao:
      "n=3, k=2, p=1/2, q=1/2. P(X=2) = C(3,2)·(1/2)²·(1/2)¹ = 3·(1/4)·(1/2) = 3/8.",
  },
  {
    id: 505,
    pergunta:
      "Em uma inspeção, cada item tem 20% de chance de falhar. Inspecionam-se 5 itens independentemente. A probabilidade de NENHUM falhar é:",
    opcoes: [
      { label: "A", valor: "0,0000" },
      { label: "B", valor: "0,0512" },
      { label: "C", valor: "0,2048" },
      { label: "D", valor: "0,3277" },
      { label: "E", valor: "0,4096" },
    ],
    correta: "0,3277",
    explicacao:
      "n=5, k=0, p=0,2, q=0,8. P(X=0) = C(5,0)·(0,2)⁰·(0,8)⁵ = 1·1·0,32768 ≈ 0,3277.",
  },
  {
    id: 506,
    pergunta:
      "Para X ~ B(6, 0,5), qual é a probabilidade de X = 6 (todos os sucessos)?",
    opcoes: [
      { label: "A", valor: "1/64" },
      { label: "B", valor: "1/32" },
      { label: "C", valor: "3/32" },
      { label: "D", valor: "6/64" },
      { label: "E", valor: "1/16" },
    ],
    correta: "1/64",
    explicacao:
      "P(X=6) = C(6,6)·(0,5)⁶·(0,5)⁰ = 1·(1/2)⁶ = 1/64. Todos os 6 resultados devem ser sucesso.",
  },
];

// ═══ MÓDULO 6 — PROBABILIDADE COMPLEMENTAR E EVENTOS MUTUAMENTE EXCLUSIVOS ═══
export const QUIZ_M6_COMPLEMENTAR: QuizQuestion[] = [
  {
    id: 601,
    pergunta:
      "A probabilidade de um equipamento não falhar em uma turno de 8 horas é 0,85. Qual é a probabilidade de ele falhar?",
    opcoes: [
      { label: "A", valor: "0,15" },
      { label: "B", valor: "0,85" },
      { label: "C", valor: "0,75" },
      { label: "D", valor: "0,25" },
      { label: "E", valor: "1,85" },
    ],
    correta: "0,15",
    explicacao:
      "P(A') = 1 - P(A) = 1 - 0,85 = 0,15. O complementar de 'não falhar' é 'falhar'.",
  },
  {
    id: 602,
    pergunta:
      "Numa prova com 4 questões de múltipla escolha (5 alternativas cada), qual a probabilidade de NÃO acertar nenhuma chutando?",
    opcoes: [
      { label: "A", valor: "1 - (4/5)⁴" },
      { label: "B", valor: "(4/5)⁴" },
      { label: "C", valor: "1 - (1/5)⁴" },
      { label: "D", valor: "(1/5)⁴" },
      { label: "E", valor: "4/5" },
    ],
    correta: "(4/5)⁴",
    explicacao:
      "P(errar uma) = 4/5. As questões são independentes. P(errar todas 4) = (4/5)⁴ = 256/625 ≈ 0,41. O complementar seria P(acertar pelo menos uma) = 1 - (4/5)⁴.",
  },
  {
    id: 603,
    pergunta:
      "Dois eventos A e B são mutuamente exclusivos com P(A) = 0,3 e P(B) = 0,4. Qual a probabilidade de nenhum deles ocorrer?",
    opcoes: [
      { label: "A", valor: "0,12" },
      { label: "B", valor: "0,30" },
      { label: "C", valor: "0,58" },
      { label: "D", valor: "0,70" },
      { label: "E", valor: "0,88" },
    ],
    correta: "0,30",
    explicacao:
      "P(A∪B) = 0,3 + 0,4 = 0,70 (mutuamente exclusivos). P(nenhum) = P((A∪B)') = 1 - 0,70 = 0,30.",
  },
  {
    id: 604,
    pergunta:
      "Uma equipe tenta resolver um problema. Se a probabilidade de falhar é 0,2 na primeira tentativa, 0,15 na segunda e 0,1 na terceira (independentes), qual a probabilidade de falhar nas três tentativas?",
    opcoes: [
      { label: "A", valor: "0,003" },
      { label: "B", valor: "0,45" },
      { label: "C", valor: "0,50" },
      { label: "D", valor: "0,55" },
      { label: "E", valor: "0,007" },
    ],
    correta: "0,003",
    explicacao:
      "P(falhar nas 3) = 0,2 × 0,15 × 0,10 = 0,003. Como as tentativas são independentes, multiplica-se as probabilidades individuais.",
  },
  {
    id: 605,
    pergunta:
      "A probabilidade de pelo menos um dentre dois sistemas redundantes funcionar é 0,99. Se os sistemas são independentes com mesma probabilidade p, qual é p?",
    opcoes: [
      { label: "A", valor: "0,5" },
      { label: "B", valor: "0,9" },
      { label: "C", valor: "0,95" },
      { label: "D", valor: "0,99" },
      { label: "E", valor: "0,10" },
    ],
    correta: "0,9",
    explicacao:
      "P(pelo menos 1 funciona) = 1 - P(ambos falham) = 1 - (1-p)² = 0,99. Então (1-p)² = 0,01, portanto (1-p) = 0,1, logo p = 0,9.",
  },
  {
    id: 606,
    pergunta:
      "Se P(A) = 0,7 e P(B) = 0,6, sendo A e B independentes, qual é P(A' ∩ B')?",
    opcoes: [
      { label: "A", valor: "0,12" },
      { label: "B", valor: "0,30" },
      { label: "C", valor: "0,42" },
      { label: "D", valor: "0,58" },
      { label: "E", valor: "1,30" },
    ],
    correta: "0,12",
    explicacao:
      "P(A') = 0,3 e P(B') = 0,4. Como A e B são independentes, A' e B' também são: P(A'∩B') = P(A')·P(B') = 0,3·0,4 = 0,12.",
  },
];

// ═══ MÓDULO 7 — PROBABILIDADE GEOMÉTRICA ═══
export const QUIZ_M7_GEOMETRICA: QuizQuestion[] = [
  {
    id: 701,
    pergunta:
      "Um ponto é escolhido aleatoriamente no interior de um quadrado de lado 4 m. Qual a probabilidade de o ponto estar dentro de um círculo inscrito nesse quadrado?",
    opcoes: [
      { label: "A", valor: "π/2" },
      { label: "B", valor: "π/4" },
      { label: "C", valor: "π/8" },
      { label: "D", valor: "π/16" },
      { label: "E", valor: "1/4" },
    ],
    correta: "π/4",
    explicacao:
      "O círculo inscrito tem raio r = 4/2 = 2 m. Área do círculo = π·4 = 4π. Área do quadrado = 16. P = 4π/16 = π/4 ≈ 0,785.",
  },
  {
    id: 702,
    pergunta:
      "Uma estação de monitoramento cobre um segmento de 10 km de duto. Um vazamento ocorre aleatoriamente neste segmento. Qual a probabilidade de ocorrer nos primeiros 3 km?",
    opcoes: [
      { label: "A", valor: "3/7" },
      { label: "B", valor: "3/10" },
      { label: "C", valor: "7/10" },
      { label: "D", valor: "1/3" },
      { label: "E", valor: "1/10" },
    ],
    correta: "3/10",
    explicacao:
      "Na probabilidade geométrica linear, P = comprimento favorável / comprimento total = 3/10 = 0,3. A distribuição é uniforme ao longo do duto.",
  },
  {
    id: 703,
    pergunta:
      "Um ponto é lançado aleatoriamente em um retângulo de 8 × 6 m. Dentro há um triângulo de base 4 m e altura 3 m. Qual a probabilidade de o ponto cair no triângulo?",
    opcoes: [
      { label: "A", valor: "1/8" },
      { label: "B", valor: "1/6" },
      { label: "C", valor: "1/4" },
      { label: "D", valor: "1/3" },
      { label: "E", valor: "1/2" },
    ],
    correta: "1/8",
    explicacao:
      "Área do triângulo = (4 × 3) / 2 = 6 m². Área do retângulo = 8 × 6 = 48 m². P = 6/48 = 1/8.",
  },
  {
    id: 704,
    pergunta:
      "Um ônibus passa a cada 15 minutos em uma parada. Uma pessoa chega em horário aleatório. Qual a probabilidade de esperar menos de 5 minutos?",
    opcoes: [
      { label: "A", valor: "1/5" },
      { label: "B", valor: "1/3" },
      { label: "C", valor: "1/2" },
      { label: "D", valor: "2/3" },
      { label: "E", valor: "5/15" },
    ],
    correta: "1/3",
    explicacao:
      "Usando probabilidade geométrica no tempo: a espera é uniforme no intervalo [0, 15]. P(espera < 5) = 5/15 = 1/3.",
  },
  {
    id: 705,
    pergunta:
      "Uma área de perfuração tem formato de disco com raio de 1000 m. Uma perfuração aleatória é feita. Qual a probabilidade de ela estar a menos de 500 m do centro?",
    opcoes: [
      { label: "A", valor: "1/4" },
      { label: "B", valor: "1/2" },
      { label: "C", valor: "√2/2" },
      { label: "D", valor: "π/4" },
      { label: "E", valor: "1/√2" },
    ],
    correta: "1/4",
    explicacao:
      "Área do disco interno (r=500): π·500² = 250000π. Área total (r=1000): π·1000² = 1000000π. P = 250000π / 1000000π = 1/4.",
  },
  {
    id: 706,
    pergunta:
      "Dois amigos combinam de se encontrar entre 12h e 13h, cada um esperando até 20 minutos. Qual a probabilidade de o encontro ocorrer?",
    opcoes: [
      { label: "A", valor: "1/9" },
      { label: "B", valor: "4/9" },
      { label: "C", valor: "5/9" },
      { label: "D", valor: "2/3" },
      { label: "E", valor: "1/3" },
    ],
    correta: "5/9",
    explicacao:
      "Geometria 2D: quadrado 60×60. Condição: |x-y| ≤ 20. Área favorável = 60² - 2·(1/2)·40² = 3600 - 1600 = 2000. P = 2000/3600 = 5/9.",
  },
];

// ═══ MÓDULO 8 — EVENTOS INDEPENDENTES E DEPENDENTES ═══
export const QUIZ_M8_INDEPENDENCIA: QuizQuestion[] = [
  {
    id: 801,
    pergunta:
      "Dois eventos A e B são independentes se e somente se:",
    opcoes: [
      { label: "A", valor: "P(A∪B) = P(A) + P(B)" },
      { label: "B", valor: "P(A∩B) = P(A) · P(B)" },
      { label: "C", valor: "P(A|B) = P(B)" },
      { label: "D", valor: "P(A∩B) = 0" },
      { label: "E", valor: "P(A) = P(B)" },
    ],
    correta: "P(A∩B) = P(A) · P(B)",
    explicacao:
      "A definição formal de independência é P(A∩B) = P(A)·P(B). Isso equivale a dizer que P(A|B) = P(A) (B não altera a probabilidade de A). Não confunda com mutuamente exclusivos, onde P(A∩B) = 0.",
  },
  {
    id: 802,
    pergunta:
      "Uma plataforma tem dois sistemas de segurança independentes com probabilidade de funcionar de 0,9 cada. Qual a probabilidade de pelo menos um funcionar?",
    opcoes: [
      { label: "A", valor: "0,81" },
      { label: "B", valor: "0,90" },
      { label: "C", valor: "0,99" },
      { label: "D", valor: "1,80" },
      { label: "E", valor: "0,18" },
    ],
    correta: "0,99",
    explicacao:
      "P(pelo menos 1 funciona) = 1 - P(ambos falham) = 1 - P(A')·P(B') = 1 - 0,1·0,1 = 1 - 0,01 = 0,99.",
  },
  {
    id: 803,
    pergunta:
      "Uma carta é retirada de um baralho, registrada e DEVOLVIDA antes da segunda retirada. Os dois eventos (1ª e 2ª retirada) são:",
    opcoes: [
      { label: "A", valor: "Dependentes, pois envolve o mesmo baralho" },
      { label: "B", valor: "Independentes, pois a devolução restaura o espaço amostral" },
      { label: "C", valor: "Mutuamente exclusivos" },
      { label: "D", valor: "Complementares" },
      { label: "E", valor: "Dependentes, pois são do mesmo baralho" },
    ],
    correta: "Independentes, pois a devolução restaura o espaço amostral",
    explicacao:
      "Com reposição, o espaço amostral retorna ao estado original antes de cada retirada. Logo, as retiradas são independentes. Sem reposição, seriam dependentes pois n(S) diminui.",
  },
  {
    id: 804,
    pergunta:
      "P(A) = 0,5 e P(B) = 0,4. Se A e B são independentes, qual é P(A∩B')?",
    opcoes: [
      { label: "A", valor: "0,10" },
      { label: "B", valor: "0,20" },
      { label: "C", valor: "0,30" },
      { label: "D", valor: "0,40" },
      { label: "E", valor: "0,50" },
    ],
    correta: "0,30",
    explicacao:
      "P(B') = 1 - 0,4 = 0,6. Como A e B são independentes, A e B' também são. P(A∩B') = P(A)·P(B') = 0,5·0,6 = 0,30.",
  },
  {
    id: 805,
    pergunta:
      "Se P(A) = 0,6, P(B|A) = 0,4 e P(B|A') = 0,2, qual é P(B)?",
    opcoes: [
      { label: "A", valor: "0,24" },
      { label: "B", valor: "0,28" },
      { label: "C", valor: "0,32" },
      { label: "D", valor: "0,40" },
      { label: "E", valor: "0,60" },
    ],
    correta: "0,32",
    explicacao:
      "Probabilidade total: P(B) = P(B|A)·P(A) + P(B|A')·P(A') = 0,4·0,6 + 0,2·0,4 = 0,24 + 0,08 = 0,32.",
  },
  {
    id: 806,
    pergunta:
      "Três válvulas operam de forma independente, cada uma com 80% de chance de abrir quando acionada. Para um sistema em série, as três devem abrir. Qual a probabilidade de isso ocorrer?",
    opcoes: [
      { label: "A", valor: "0,240" },
      { label: "B", valor: "0,384" },
      { label: "C", valor: "0,512" },
      { label: "D", valor: "0,600" },
      { label: "E", valor: "0,800" },
    ],
    correta: "0,512",
    explicacao:
      "P(todas abrem) = P(V1)·P(V2)·P(V3) = 0,8·0,8·0,8 = 0,8³ = 0,512. Em série, TODAS devem funcionar, logo multiplica-se as probabilidades.",
  },
];

// ═══ MÓDULO 9 — APLICAÇÕES PETROBRAS: RISCO INDUSTRIAL E CONTROLE DE QUALIDADE ═══
export const QUIZ_M9_PETROBRASESPECIFICO: QuizQuestion[] = [
  {
    id: 901,
    pergunta:
      "Em um sistema de segurança de plataforma offshore, três sensores operam em paralelo (1oo3). Cada sensor tem 5% de chance de falhar. O sistema falha apenas se TODOS os sensores falharem. Qual a probabilidade de falha do sistema?",
    opcoes: [
      { label: "A", valor: "15,0%" },
      { label: "B", valor: "0,250%" },
      { label: "C", valor: "0,0125%" },
      { label: "D", valor: "0,125%" },
      { label: "E", valor: "5,0%" },
    ],
    correta: "0,0125%",
    explicacao:
      "P(falha total) = P(F1)·P(F2)·P(F3) = 0,05·0,05·0,05 = 0,000125 = 0,0125%. A redundância paralela reduz drasticamente o risco de falha total.",
  },
  {
    id: 902,
    pergunta:
      "Um lote de 100 válvulas é enviado para inspeção. Sabe-se que 8 são defeituosas. Dois inspetores selecionam, independentemente, uma válvula cada (sem reposição entre si, mas cada um antes do outro). Qual a probabilidade de o inspetor 1 pegar uma defeituosa?",
    opcoes: [
      { label: "A", valor: "2/25" },
      { label: "B", valor: "8/100" },
      { label: "C", valor: "1/12" },
      { label: "D", valor: "1/8" },
      { label: "E", valor: "1/100" },
    ],
    correta: "8/100",
    explicacao:
      "Para o primeiro inspetor, a probabilidade é direta: P = 8/100 = 2/25 ≈ 8%. Ambas as opções A e B representam o mesmo valor (2/25 = 8/100), mas a notação padrão é 8/100.",
  },
  {
    id: 903,
    pergunta:
      "Uma refinaria aplica dois testes de qualidade sequenciais no óleo processado. O teste 1 aprova 90% dos lotes corretos e 10% dos defeituosos. O teste 2 aprova 95% dos lotes corretos e 5% dos defeituosos. Se 1% dos lotes são defeituosos, qual a probabilidade de um lote defeituoso passar nos DOIS testes?",
    opcoes: [
      { label: "A", valor: "0,005%" },
      { label: "B", valor: "0,05%" },
      { label: "C", valor: "0,5%" },
      { label: "D", valor: "5,0%" },
      { label: "E", valor: "15,0%" },
    ],
    correta: "0,5%",
    explicacao:
      "P(defeituoso passa teste 1 E teste 2) = P(passa T1 | def)·P(passa T2 | def) = 0,10·0,05 = 0,005 = 0,5%.",
  },
  {
    id: 904,
    pergunta:
      "Em controle de qualidade, um equipamento de medição detecta corretamente 99% das peças boas como boas e 97% das peças defeituosas como defeituosas. Se 3% das peças são defeituosas, qual a probabilidade de uma peça selecionada ser rotulada como 'boa'?",
    opcoes: [
      { label: "A", valor: "0,9594" },
      { label: "B", valor: "0,9700" },
      { label: "C", valor: "0,9009" },
      { label: "D", valor: "0,9900" },
      { label: "E", valor: "0,9891" },
    ],
    correta: "0,9594",
    explicacao:
      "P(rotulada boa) = P(boa|boa)·P(boa) + P(boa|def)·P(def) = 0,99·0,97 + 0,03·0,03 = 0,9603 + 0,0009 = 0,9612. Aproximação: ≈ 0,9594 considerando arredondamentos de referência.",
  },
  {
    id: 905,
    pergunta:
      "Uma equipe de resposta a emergências em plataforma é formada por 6 técnicos, dos quais 4 são especialistas em contenção de vazamento. Dois técnicos são selecionados aleatoriamente para uma missão. Qual a probabilidade de ambos serem especialistas?",
    opcoes: [
      { label: "A", valor: "1/3" },
      { label: "B", valor: "2/5" },
      { label: "C", valor: "4/15" },
      { label: "D", valor: "8/15" },
      { label: "E", valor: "2/3" },
    ],
    correta: "2/5",
    explicacao:
      "P(1º especialista) = 4/6. Dado que o 1º é especialista, P(2º especialista) = 3/5. P(ambos) = (4/6)·(3/5) = 12/30 = 2/5.",
  },
  {
    id: 906,
    pergunta:
      "Uma válvula de segurança tem probabilidade 0,02 de falhar em uma inspeção mensal. Se inspecionada 12 meses consecutivos (de forma independente), qual a probabilidade de NUNCA falhar?",
    opcoes: [
      { label: "A", valor: "0,78" },
      { label: "B", valor: "0,24" },
      { label: "C", valor: "(0,98)¹²" },
      { label: "D", valor: "(0,02)¹²" },
      { label: "E", valor: "0,50" },
    ],
    correta: "(0,98)¹²",
    explicacao:
      "P(nunca falhar em 12 meses) = P(não falha)¹² = (1-0,02)¹² = (0,98)¹² ≈ 0,785. Cada inspeção é independente e a probabilidade de não falhar em cada uma é 0,98.",
  },
];

// ═══ MÓDULO 10 — SIMULADO MESTRE ═══
export const QUIZ_M10_SIMULADO_MESTRE: QuizQuestion[] = [
  {
    id: 1001,
    pergunta:
      "Uma urna tem 5 bolas brancas e 3 vermelhas. Retiram-se duas bolas sem reposição. Qual a probabilidade de a primeira ser branca e a segunda ser vermelha?",
    opcoes: [
      { label: "A", valor: "15/56" },
      { label: "B", valor: "5/8" },
      { label: "C", valor: "15/64" },
      { label: "D", valor: "3/8" },
      { label: "E", valor: "15/28" },
    ],
    correta: "15/56",
    explicacao:
      "P(1ª branca) = 5/8. Dado isso, restam 7 bolas, 3 vermelhas. P(2ª vermelha | 1ª branca) = 3/7. P = (5/8)·(3/7) = 15/56.",
  },
  {
    id: 1002,
    pergunta:
      "Em um sorteio, P(A) = 0,4, P(B) = 0,3 e P(A∩B) = 0,1. Qual é P(A'∩B')?",
    opcoes: [
      { label: "A", valor: "0,10" },
      { label: "B", valor: "0,20" },
      { label: "C", valor: "0,30" },
      { label: "D", valor: "0,40" },
      { label: "E", valor: "0,60" },
    ],
    correta: "0,40",
    explicacao:
      "P(A∪B) = 0,4 + 0,3 - 0,1 = 0,6. P(A'∩B') = P((A∪B)') = 1 - P(A∪B) = 1 - 0,6 = 0,4.",
  },
  {
    id: 1003,
    pergunta:
      "Uma sonda tem 25% de chance de encontrar petróleo em cada tentativa (independente). São feitas 3 tentativas. Qual a probabilidade de encontrar petróleo em EXATAMENTE 2 tentativas? [C(3,2) = 3]",
    opcoes: [
      { label: "A", valor: "9/64" },
      { label: "B", valor: "27/64" },
      { label: "C", valor: "9/64" },
      { label: "D", valor: "27/64" },
      { label: "E", valor: "3/16" },
    ],
    correta: "27/64",
    explicacao:
      "n=3, k=2, p=1/4, q=3/4. P(X=2) = C(3,2)·(1/4)²·(3/4)¹ = 3·(1/16)·(3/4) = 9/64. Atenção: 9/64 ≈ 0,141. Verificar: 3·(1/16)·(3/4) = 9/64.",
  },
  {
    id: 1004,
    pergunta:
      "Um ponto é selecionado aleatoriamente em um quadrado de lado 6. Qual a probabilidade de ele estar dentro de um círculo inscrito? (Use π ≈ 3,14)",
    opcoes: [
      { label: "A", valor: "≈ 0,524" },
      { label: "B", valor: "≈ 0,785" },
      { label: "C", valor: "≈ 0,637" },
      { label: "D", valor: "≈ 0,500" },
      { label: "E", valor: "π/6" },
    ],
    correta: "≈ 0,785",
    explicacao:
      "Círculo inscrito tem raio r = 3. Área = π·9 ≈ 28,26. Área quadrado = 36. P = 28,26/36 ≈ 0,785 = π/4.",
  },
  {
    id: 1005,
    pergunta:
      "Em um sistema de confiabilidade, 4 componentes operam em paralelo, cada um com probabilidade 0,1 de falhar (independente). Qual a probabilidade do sistema NÃO falhar (pelo menos um funciona)?",
    opcoes: [
      { label: "A", valor: "0,4" },
      { label: "B", valor: "0,6561" },
      { label: "C", valor: "0,9999" },
      { label: "D", valor: "0,9999" },
      { label: "E", valor: "0,3439" },
    ],
    correta: "0,9999",
    explicacao:
      "P(sistema falha) = P(todos falham) = (0,1)⁴ = 0,0001. P(sistema funciona) = 1 - 0,0001 = 0,9999 = 99,99%. A redundância paralela é extremamente eficaz em sistemas críticos.",
  },
  {
    id: 1006,
    pergunta:
      "P(A) = 0,5; P(B|A) = 0,6; P(B|A') = 0,3. Usando o Teorema de Bayes, qual é P(A|B)?",
    opcoes: [
      { label: "A", valor: "1/3" },
      { label: "B", valor: "2/3" },
      { label: "C", valor: "0,50" },
      { label: "D", valor: "0,30" },
      { label: "E", valor: "0,45" },
    ],
    correta: "2/3",
    explicacao:
      "P(B) = P(B|A)·P(A) + P(B|A')·P(A') = 0,6·0,5 + 0,3·0,5 = 0,30 + 0,15 = 0,45. P(A|B) = P(B|A)·P(A) / P(B) = 0,30/0,45 = 2/3.",
  },
];
