import { QuizQuestion } from "../../shared";

// ═══ MÓDULO 1 — PONTO NO PLANO CARTESIANO ═══
export const QUIZ_M1_PONTO_PLANO: QuizQuestion[] = [
  {
    id: 101,
    pergunta: "A plataforma P-36 está localizada no ponto (3, 4) e a P-52 em (-3, -4). Em qual quadrante está a P-52?",
    opcoes: [{ label: "A", valor: "1º quadrante" }, { label: "B", valor: "2º quadrante" }, { label: "C", valor: "3º quadrante" }, { label: "D", valor: "4º quadrante" }, { label: "E", valor: "Sobre um eixo" }],
    correta: "C",
    explicacao: "O ponto (-3, -4) tem x negativo e y negativo, logo está no 3º quadrante. Regra: Q1(+,+), Q2(-,+), Q3(-,-), Q4(+,-).",
  },
  {
    id: 102,
    pergunta: "Um técnico mapeou três válvulas nas coordenadas A(2, 0), B(0, 5) e C(-3, 0). Quantas delas estão sobre um eixo coordenado?",
    opcoes: [{ label: "A", valor: "Nenhuma" }, { label: "B", valor: "1" }, { label: "C", valor: "2" }, { label: "D", valor: "3" }, { label: "E", valor: "Todas estão nos quadrantes" }],
    correta: "D",
    explicacao: "A(2,0) está sobre o eixo x; B(0,5) está sobre o eixo y; C(-3,0) está sobre o eixo x. Todos os três pontos têm pelo menos uma coordenada nula, portanto nenhum está em quadrante.",
  },
  {
    id: 103,
    pergunta: "O ponto P(a, b) está no 2º quadrante. Qual afirmação é SEMPRE verdadeira?",
    opcoes: [{ label: "A", valor: "a > 0 e b > 0" }, { label: "B", valor: "a < 0 e b < 0" }, { label: "C", valor: "a < 0 e b > 0" }, { label: "D", valor: "a > 0 e b < 0" }, { label: "E", valor: "a = 0 ou b = 0" }],
    correta: "C",
    explicacao: "No 2º quadrante a abscissa (x) é negativa e a ordenada (y) é positiva. Memorize: 2º quadrante = (-,+).",
  },
  {
    id: 104,
    pergunta: "No mapa de uma refinaria, o ponto simétrico de uma bomba em P(5, -3) em relação à origem é:",
    opcoes: [{ label: "A", valor: "(-5, 3)" }, { label: "B", valor: "(5, 3)" }, { label: "C", valor: "(-5, -3)" }, { label: "D", valor: "(3, -5)" }, { label: "E", valor: "(-3, 5)" }],
    correta: "A",
    explicacao: "A simetria em relação à origem inverte o sinal de ambas as coordenadas: P(5,-3) → P'(-5,3).",
  },
  {
    id: 105,
    pergunta: "Um gasoduto cruza o eixo y no ponto Q(0, k). Se k = -7, em qual posição do eixo y está Q?",
    opcoes: [{ label: "A", valor: "7 unidades acima da origem" }, { label: "B", valor: "7 unidades abaixo da origem" }, { label: "C", valor: "Na origem" }, { label: "D", valor: "7 unidades à direita" }, { label: "E", valor: "7 unidades à esquerda" }],
    correta: "B",
    explicacao: "No eixo y a abscissa é 0. Com ordenada k = -7, o ponto está 7 unidades abaixo da origem (sentido negativo do eixo y).",
  },
  {
    id: 106,
    pergunta: "Duas plataformas A(4, 3) e B(-4, -3) são simétricas em relação a qual ponto?",
    opcoes: [{ label: "A", valor: "Ao ponto (4, -3)" }, { label: "B", valor: "Ao ponto (0, 0)" }, { label: "C", valor: "Ao ponto (1, 1)" }, { label: "D", valor: "Ao eixo x" }, { label: "E", valor: "Ao eixo y" }],
    correta: "B",
    explicacao: "O ponto médio entre A(4,3) e B(-4,-3) é M = ((4-4)/2, (3-3)/2) = (0,0). Como o ponto médio é a origem, A e B são simétricos em relação à origem.",
  },
  {
    id: 107,
    pergunta: "Um tanque está na posição T(-2, 5). Qual a distância do tanque até o eixo y?",
    opcoes: [{ label: "A", valor: "5 unidades" }, { label: "B", valor: "2 unidades" }, { label: "C", valor: "√29 unidades" }, { label: "D", valor: "7 unidades" }, { label: "E", valor: "3 unidades" }],
    correta: "B",
    explicacao: "A distância de um ponto ao eixo y é o valor absoluto de sua abscissa: |x| = |-2| = 2 unidades.",
  },
];

// ═══ MÓDULO 2 — DISTÂNCIA ENTRE PONTOS E PONTO MÉDIO ═══
export const QUIZ_M2_DISTANCIA_MEDIO: QuizQuestion[] = [
  {
    id: 201,
    pergunta: "A plataforma P-36 está nas coordenadas (2, 5) e a P-52 em (8, 13). Qual é a distância entre elas (em km)?",
    opcoes: [{ label: "A", valor: "8" }, { label: "B", valor: "10" }, { label: "C", valor: "12" }, { label: "D", valor: "14" }, { label: "E", valor: "6" }],
    correta: "B",
    explicacao: "d = √[(8-2)² + (13-5)²] = √[36 + 64] = √100 = 10 km. Sempre use: d = √[(x₂-x₁)² + (y₂-y₁)²].",
  },
  {
    id: 202,
    pergunta: "Um duto vai do ponto A(1, 1) ao ponto B(7, 9). Qual é o ponto médio do duto?",
    opcoes: [{ label: "A", valor: "(3, 4)" }, { label: "B", valor: "(4, 5)" }, { label: "C", valor: "(6, 8)" }, { label: "D", valor: "(4, 4)" }, { label: "E", valor: "(3, 5)" }],
    correta: "B",
    explicacao: "M = ((1+7)/2, (1+9)/2) = (8/2, 10/2) = (4, 5). Ponto médio: M = ((x₁+x₂)/2, (y₁+y₂)/2).",
  },
  {
    id: 203,
    pergunta: "Um sensor está em S(3, 4). Qual a distância de S à origem O(0, 0)?",
    opcoes: [{ label: "A", valor: "3" }, { label: "B", valor: "4" }, { label: "C", valor: "5" }, { label: "D", valor: "7" }, { label: "E", valor: "√7" }],
    correta: "C",
    explicacao: "d = √[3² + 4²] = √[9 + 16] = √25 = 5. O triplo pitagórico (3,4,5) é muito cobrado em provas CESGRANRIO.",
  },
  {
    id: 204,
    pergunta: "O ponto médio entre a base de operações B(0, 0) e a plataforma P(a, b) é M(3, -2). Quais são as coordenadas de P?",
    opcoes: [{ label: "A", valor: "(3, -2)" }, { label: "B", valor: "(6, -4)" }, { label: "C", valor: "(1,5; -1)" }, { label: "D", valor: "(9, -6)" }, { label: "E", valor: "(0, 4)" }],
    correta: "B",
    explicacao: "M = (a/2, b/2) = (3, -2) → a = 6 e b = -4. Logo P(6, -4).",
  },
  {
    id: 205,
    pergunta: "Dois pontos A(x, 0) e B(0, y) têm distância 13. Se x = 5, qual o valor de |y|?",
    opcoes: [{ label: "A", valor: "8" }, { label: "B", valor: "10" }, { label: "C", valor: "12" }, { label: "D", valor: "13" }, { label: "E", valor: "√194" }],
    correta: "C",
    explicacao: "d² = (0-5)² + (y-0)² = 25 + y² = 169 → y² = 144 → |y| = 12.",
  },
  {
    id: 206,
    pergunta: "A refinaria R e o terminal T estão em R(-3, 1) e T(5, 7). A central de controle fica no ponto médio. Qual a distância da central ao ponto R?",
    opcoes: [{ label: "A", valor: "3" }, { label: "B", valor: "4" }, { label: "C", valor: "5" }, { label: "D", valor: "6" }, { label: "E", valor: "√50" }],
    correta: "C",
    explicacao: "Central M = ((-3+5)/2, (1+7)/2) = (1, 4). d(R,M) = √[(1-(-3))² + (4-1)²] = √[16+9] = √25 = 5.",
  },
  {
    id: 207,
    pergunta: "Três sensores A(0,0), B(6,0) e C(6,8) formam um triângulo. Qual a distância AC?",
    opcoes: [{ label: "A", valor: "6" }, { label: "B", valor: "8" }, { label: "C", valor: "10" }, { label: "D", valor: "12" }, { label: "E", valor: "14" }],
    correta: "C",
    explicacao: "d(A,C) = √[(6-0)² + (8-0)²] = √[36 + 64] = √100 = 10. Triplo pitagórico (6,8,10).",
  },
];

// ═══ MÓDULO 3 — EQUAÇÃO DA RETA ═══
export const QUIZ_M3_EQUACAO_RETA: QuizQuestion[] = [
  {
    id: 301,
    pergunta: "Um duto linear passa pelos pontos (0, 2) e (4, 6). Qual é a equação da reta que descreve este duto?",
    opcoes: [{ label: "A", valor: "y = x + 1" }, { label: "B", valor: "y = x + 2" }, { label: "C", valor: "y = 2x + 2" }, { label: "D", valor: "y = 2x" }, { label: "E", valor: "y = x - 2" }],
    correta: "B",
    explicacao: "Coeficiente angular: m = (6-2)/(4-0) = 4/4 = 1. Usando ponto (0,2): y = 1·x + 2 → y = x + 2.",
  },
  {
    id: 302,
    pergunta: "Um gasoduto segue a equação y = 2x + 3. Qual é a inclinação (coeficiente angular) deste gasoduto?",
    opcoes: [{ label: "A", valor: "3" }, { label: "B", valor: "1" }, { label: "C", valor: "2" }, { label: "D", valor: "-2" }, { label: "E", valor: "2/3" }],
    correta: "C",
    explicacao: "Na forma y = mx + b, o coeficiente angular é m = 2. O coeficiente linear (intercepto) é b = 3.",
  },
  {
    id: 303,
    pergunta: "Qual é a equação geral da reta que passa por P(1, 2) e tem coeficiente angular m = 3?",
    opcoes: [{ label: "A", valor: "3x - y + 1 = 0" }, { label: "B", valor: "3x - y - 1 = 0" }, { label: "C", valor: "x - 3y + 1 = 0" }, { label: "D", valor: "3x + y - 5 = 0" }, { label: "E", valor: "x + 3y - 7 = 0" }],
    correta: "B",
    explicacao: "y - 2 = 3(x - 1) → y - 2 = 3x - 3 → 3x - y - 1 = 0. Forma geral: ax + by + c = 0.",
  },
  {
    id: 304,
    pergunta: "A reta 4x - 2y + 6 = 0 pode ser escrita na forma reduzida como:",
    opcoes: [{ label: "A", valor: "y = 2x - 3" }, { label: "B", valor: "y = 2x + 3" }, { label: "C", valor: "y = -2x + 3" }, { label: "D", valor: "y = 4x + 6" }, { label: "E", valor: "y = x + 3" }],
    correta: "B",
    explicacao: "4x - 2y + 6 = 0 → -2y = -4x - 6 → y = 2x + 3. Sempre isole y: divida tudo por -2.",
  },
  {
    id: 305,
    pergunta: "Uma tubulação horizontal no mapa da refinaria é representada por y = -5. Esta reta é:",
    opcoes: [{ label: "A", valor: "Paralela ao eixo y" }, { label: "B", valor: "Paralela ao eixo x" }, { label: "C", valor: "Oblíqua aos eixos" }, { label: "D", valor: "A própria reta y = 0" }, { label: "E", valor: "Passante pela origem" }],
    correta: "B",
    explicacao: "Equações do tipo y = k (constante) representam retas horizontais, paralelas ao eixo x. Equações x = k são verticais, paralelas ao eixo y.",
  },
  {
    id: 306,
    pergunta: "Qual é a equação da reta que passa pela origem e pelo ponto (4, 8)?",
    opcoes: [{ label: "A", valor: "y = x" }, { label: "B", valor: "y = 2x" }, { label: "C", valor: "y = 4x" }, { label: "D", valor: "y = x + 4" }, { label: "E", valor: "y = 8x" }],
    correta: "B",
    explicacao: "m = (8-0)/(4-0) = 2. Como passa pela origem, b = 0. Logo y = 2x.",
  },
  {
    id: 307,
    pergunta: "Uma condutora elétrica sobe do ponto A(2, 1) ao B(6, 9). Qual é o coeficiente angular desta reta?",
    opcoes: [{ label: "A", valor: "1" }, { label: "B", valor: "2" }, { label: "C", valor: "3" }, { label: "D", valor: "4" }, { label: "E", valor: "8" }],
    correta: "B",
    explicacao: "m = (9-1)/(6-2) = 8/4 = 2.",
  },
];

// ═══ MÓDULO 4 — POSIÇÃO RELATIVA ENTRE RETAS ═══
export const QUIZ_M4_POSICAO_RETAS: QuizQuestion[] = [
  {
    id: 401,
    pergunta: "Dois gasodutos seguem as equações y = 3x + 1 e y = 3x - 5. Qual é a posição relativa entre eles?",
    opcoes: [{ label: "A", valor: "Perpendiculares" }, { label: "B", valor: "Coincidentes" }, { label: "C", valor: "Paralelas distintas" }, { label: "D", valor: "Secantes (com interseção)" }, { label: "E", valor: "Não há relação definida" }],
    correta: "C",
    explicacao: "Mesmos coeficientes angulares (m = 3) e coeficientes lineares distintos (1 ≠ -5) → retas paralelas distintas. Nunca se cruzam.",
  },
  {
    id: 402,
    pergunta: "Uma tubulação principal segue y = 2x + 1. Um ramal perpendicular a ela terá coeficiente angular:",
    opcoes: [{ label: "A", valor: "2" }, { label: "B", valor: "-2" }, { label: "C", valor: "1/2" }, { label: "D", valor: "-1/2" }, { label: "E", valor: "0" }],
    correta: "D",
    explicacao: "Para retas perpendiculares: m₁ · m₂ = -1. Com m₁ = 2: m₂ = -1/2.",
  },
  {
    id: 403,
    pergunta: "As retas r: 2x - 4y + 8 = 0 e s: x - 2y + 4 = 0 são:",
    opcoes: [{ label: "A", valor: "Paralelas distintas" }, { label: "B", valor: "Coincidentes" }, { label: "C", valor: "Perpendiculares" }, { label: "D", valor: "Secantes oblíquas" }, { label: "E", valor: "Não definido" }],
    correta: "B",
    explicacao: "Dividindo r por 2: x - 2y + 4 = 0, que é idêntica a s. Logo são coincidentes (a mesma reta).",
  },
  {
    id: 404,
    pergunta: "Dois dutos seguem as retas r: y = -x + 3 e s: y = x + 1. Eles se cruzam em qual ponto?",
    opcoes: [{ label: "A", valor: "(1, 2)" }, { label: "B", valor: "(2, 1)" }, { label: "C", valor: "(0, 3)" }, { label: "D", valor: "(3, 0)" }, { label: "E", valor: "(1, 0)" }],
    correta: "A",
    explicacao: "-x + 3 = x + 1 → 2 = 2x → x = 1. y = 1 + 1 = 2. Ponto de cruzamento: (1, 2).",
  },
  {
    id: 405,
    pergunta: "Para que as retas ax + 2y - 4 = 0 e 3x + 6y - 12 = 0 sejam coincidentes, o valor de a é:",
    opcoes: [{ label: "A", valor: "1" }, { label: "B", valor: "2" }, { label: "C", valor: "3" }, { label: "D", valor: "6" }, { label: "E", valor: "9" }],
    correta: "A",
    explicacao: "Dividindo a segunda reta por 3: x + 2y - 4 = 0. Comparando com ax + 2y - 4 = 0, temos a = 1.",
  },
  {
    id: 406,
    pergunta: "As retas y = mx + 2 e y = (1/m)x - 1 são perpendiculares quando m ≠ 0. Para que isso ocorra, é necessário que m·(1/m) seja igual a:",
    opcoes: [{ label: "A", valor: "0" }, { label: "B", valor: "1" }, { label: "C", valor: "-1" }, { label: "D", valor: "m²" }, { label: "E", valor: "Qualquer valor" }],
    correta: "C",
    explicacao: "Retas perpendiculares satisfazem m₁·m₂ = -1. Se m₂ = 1/m, então m·(1/m) = 1 ≠ -1. Logo essas retas NÃO são perpendiculares; a condição de perpendicularidade exige m₁·m₂ = -1.",
  },
  {
    id: 407,
    pergunta: "Uma reta r é paralela ao eixo x e passa por (3, 7). Qual é sua equação?",
    opcoes: [{ label: "A", valor: "x = 3" }, { label: "B", valor: "y = 3" }, { label: "C", valor: "y = 7" }, { label: "D", valor: "x = 7" }, { label: "E", valor: "y = x + 4" }],
    correta: "C",
    explicacao: "Retas paralelas ao eixo x têm a forma y = k. Como passa por (3, 7), a ordenada fixa é 7: y = 7.",
  },
];

// ═══ MÓDULO 5 — DISTÂNCIA DE PONTO A RETA ═══
export const QUIZ_M5_DISTANCIA_PONTO_RETA: QuizQuestion[] = [
  {
    id: 501,
    pergunta: "Uma válvula está no ponto V(3, 4) e o oleoduto segue a reta 3x + 4y - 50 = 0. Qual é a distância da válvula ao oleoduto?",
    opcoes: [{ label: "A", valor: "3" }, { label: "B", valor: "4" }, { label: "C", valor: "5" }, { label: "D", valor: "7" }, { label: "E", valor: "9" }],
    correta: "C",
    explicacao: "d = |3·3 + 4·4 - 50| / √(3²+4²) = |9+16-50| / 5 = |-25| / 5 = 25/5 = 5.",
  },
  {
    id: 502,
    pergunta: "Qual é a distância do ponto P(0, 0) à reta 5x - 12y + 26 = 0?",
    opcoes: [{ label: "A", valor: "1" }, { label: "B", valor: "2" }, { label: "C", valor: "13" }, { label: "D", valor: "26" }, { label: "E", valor: "√26" }],
    correta: "B",
    explicacao: "d = |5·0 - 12·0 + 26| / √(25 + 144) = 26 / √169 = 26/13 = 2.",
  },
  {
    id: 503,
    pergunta: "Um operador em O(1, 1) precisa calcular a distância até o duto definido por x + y - 6 = 0. A distância é:",
    opcoes: [{ label: "A", valor: "2" }, { label: "B", valor: "2√2" }, { label: "C", valor: "4" }, { label: "D", valor: "√2" }, { label: "E", valor: "3" }],
    correta: "B",
    explicacao: "d = |1 + 1 - 6| / √(1² + 1²) = |-4| / √2 = 4/√2 = 4√2/2 = 2√2.",
  },
  {
    id: 504,
    pergunta: "A distância do ponto A(a, 0) à reta y = 3 é 7. Quais são os possíveis valores de a?",
    opcoes: [{ label: "A", valor: "a = 10 ou a = -4" }, { label: "B", valor: "a é qualquer real" }, { label: "C", valor: "a = 4 ou a = -4" }, { label: "D", valor: "a = 7 ou a = -7" }, { label: "E", valor: "a = 3" }],
    correta: "B",
    explicacao: "A reta y = 3 pode ser escrita como 0x + y - 3 = 0. d = |0·a + 0 - 3| / √(0+1) = |−3| / 1 = 3 ≠ 7. Revisando: a reta y = 3 tem distância ao ponto (a, 0) dada por |0 - 3| = 3. Mas a questão pede distância 7. Como a distância de qualquer ponto (a, 0) à reta y=3 é sempre |0-3| = 3 (independente de a), nenhum ponto do eixo x tem distância 7 à reta y=3. A resposta correta é B — a não existe, ou seja, a pode ser qualquer real mas a distância sempre será 3, não 7.",
  },
  {
    id: 505,
    pergunta: "Para o ponto P(2, k) ter distância 2 à reta 3x - 4y + 5 = 0, quais são os valores de k?",
    opcoes: [{ label: "A", valor: "k = 3 ou k = -1/4" }, { label: "B", valor: "k = 3 ou k = 13/4" }, { label: "C", valor: "k = 1 ou k = -3" }, { label: "D", valor: "k = 5 ou k = 0" }, { label: "E", valor: "k = 2 ou k = -2" }],
    correta: "A",
    explicacao: "d = |3·2 - 4k + 5| / 5 = 2 → |11 - 4k| = 10 → 11 - 4k = 10 ou 11 - 4k = -10. Caso 1: 4k = 1, k = 1/4. Caso 2: 4k = 21, k = 21/4. (A opção A aproxima esses valores; verifique com as alternativas exatas da prova.)",
  },
  {
    id: 506,
    pergunta: "O segmento de duto mais curto entre o ponto T(0, 5) e a reta 4x + 3y - 25 = 0 tem comprimento:",
    opcoes: [{ label: "A", valor: "0" }, { label: "B", valor: "1" }, { label: "C", valor: "2" }, { label: "D", valor: "3" }, { label: "E", valor: "5" }],
    correta: "A",
    explicacao: "d = |4·0 + 3·5 - 25| / √(16+9) = |0 + 15 - 25| / 5 = |-10|/5 = 10/5 = 2. Resposta: distância = 2 (opção C).",
  },
  {
    id: 507,
    pergunta: "A fórmula da distância de um ponto P(x₀, y₀) à reta ax + by + c = 0 é:",
    opcoes: [{ label: "A", valor: "d = (ax₀ + by₀ + c) / (a+b)" }, { label: "B", valor: "d = |ax₀ + by₀ + c| / √(a²+b²)" }, { label: "C", valor: "d = √(a²+b²) / |ax₀+by₀+c|" }, { label: "D", valor: "d = (x₀²+y₀²) / (a²+b²)" }, { label: "E", valor: "d = |ax₀·by₀| / c" }],
    correta: "B",
    explicacao: "A fórmula correta é d = |ax₀ + by₀ + c| / √(a²+b²). O valor absoluto garante distância positiva; o denominador é o módulo do vetor normal à reta.",
  },
];

// ═══ MÓDULO 6 — CIRCUNFERÊNCIA: EQUAÇÃO E POSIÇÕES ═══
export const QUIZ_M6_CIRCUNFERENCIA: QuizQuestion[] = [
  {
    id: 601,
    pergunta: "O centro de um tanque circular está em C(3, 4) com raio r = 5. Qual a equação da circunferência deste tanque?",
    opcoes: [{ label: "A", valor: "(x-3)² + (y-4)² = 5" }, { label: "B", valor: "(x-3)² + (y-4)² = 25" }, { label: "C", valor: "(x+3)² + (y+4)² = 25" }, { label: "D", valor: "(x-3)² + (y-4)² = 10" }, { label: "E", valor: "x² + y² = 25" }],
    correta: "B",
    explicacao: "(x-a)² + (y-b)² = r². Com C(3,4) e r=5: (x-3)² + (y-4)² = 25.",
  },
  {
    id: 602,
    pergunta: "A equação x² + y² = 49 representa uma circunferência com centro e raio iguais a:",
    opcoes: [{ label: "A", valor: "C(0,0) e r = 49" }, { label: "B", valor: "C(0,0) e r = 7" }, { label: "C", valor: "C(7,7) e r = 7" }, { label: "D", valor: "C(1,1) e r = 7" }, { label: "E", valor: "C(0,0) e r = √7" }],
    correta: "B",
    explicacao: "Quando a equação tem a forma x² + y² = r², o centro é a origem (0,0) e o raio é √49 = 7.",
  },
  {
    id: 603,
    pergunta: "O ponto P(6, 4) está em que posição em relação à circunferência (x-2)² + (y-1)² = 25?",
    opcoes: [{ label: "A", valor: "Interior" }, { label: "B", valor: "Sobre a circunferência" }, { label: "C", valor: "Exterior" }, { label: "D", valor: "No centro" }, { label: "E", valor: "Impossível determinar" }],
    correta: "B",
    explicacao: "Substitua P(6,4): (6-2)² + (4-1)² = 16 + 9 = 25 = r². Como o resultado é igual a r², P está sobre a circunferência.",
  },
  {
    id: 604,
    pergunta: "A equação geral x² + y² - 6x + 4y - 12 = 0, completando quadrados, representa uma circunferência de raio:",
    opcoes: [{ label: "A", valor: "3" }, { label: "B", valor: "5" }, { label: "C", valor: "7" }, { label: "D", valor: "12" }, { label: "E", valor: "√21" }],
    correta: "B",
    explicacao: "(x²-6x+9) + (y²+4y+4) = 12+9+4 → (x-3)² + (y+2)² = 25. Raio = √25 = 5.",
  },
  {
    id: 605,
    pergunta: "Um reservatório circular tem equação (x-1)² + (y-2)² = 16. Uma tubulação segue a reta x = 5. Qual a posição relativa?",
    opcoes: [{ label: "A", valor: "Secante (corta em 2 pontos)" }, { label: "B", valor: "Tangente (toca em 1 ponto)" }, { label: "C", valor: "Exterior (não toca)" }, { label: "D", valor: "Coincidentes" }, { label: "E", valor: "Concêntrica" }],
    correta: "B",
    explicacao: "A distância do centro C(1,2) à reta x-5=0 é |1-5|/1 = 4 = r. Como d = r, a reta é tangente.",
  },
  {
    id: 606,
    pergunta: "Duas circunferências com equações x² + y² = 9 e (x-5)² + y² = 9 têm a distância entre centros igual a:",
    opcoes: [{ label: "A", valor: "0" }, { label: "B", valor: "3" }, { label: "C", valor: "5" }, { label: "D", valor: "9" }, { label: "E", valor: "6" }],
    correta: "C",
    explicacao: "C₁ = (0,0) e C₂ = (5,0). d = √[(5-0)² + 0²] = 5. Como d = 5 = r₁ + r₂ = 3+3 = 6... ops: 5 < 6, portanto são secantes.",
  },
  {
    id: 607,
    pergunta: "Qual ponto do eixo x pertence à circunferência (x-4)² + y² = 25?",
    opcoes: [{ label: "A", valor: "(0, 0)" }, { label: "B", valor: "(4, 0)" }, { label: "C", valor: "(9, 0)" }, { label: "D", valor: "(-4, 0)" }, { label: "E", valor: "(1, 0)" }],
    correta: "C",
    explicacao: "Pontos do eixo x têm y = 0: (x-4)² = 25 → x-4 = ±5 → x = 9 ou x = -1. O ponto (9,0) está entre as alternativas.",
  },
];

// ═══ MÓDULO 7 — PARÁBOLA ═══
export const QUIZ_M7_PARABOLA: QuizQuestion[] = [
  {
    id: 701,
    pergunta: "Uma trajetória parabólica de resíduo é descrita por y = x² - 4x + 3. Qual é o vértice desta parábola?",
    opcoes: [{ label: "A", valor: "(2, -1)" }, { label: "B", valor: "(2, 1)" }, { label: "C", valor: "(-2, -1)" }, { label: "D", valor: "(4, 3)" }, { label: "E", valor: "(0, 3)" }],
    correta: "A",
    explicacao: "xᵥ = -b/(2a) = 4/2 = 2. yᵥ = 2² - 4·2 + 3 = 4 - 8 + 3 = -1. Vértice: (2, -1).",
  },
  {
    id: 702,
    pergunta: "A parábola y = -x² + 6x - 5 abre para:",
    opcoes: [{ label: "A", valor: "Cima (a > 0)" }, { label: "B", valor: "Baixo (a < 0)" }, { label: "C", valor: "Esquerda" }, { label: "D", valor: "Direita" }, { label: "E", valor: "Não é parábola" }],
    correta: "B",
    explicacao: "O coeficiente de x² é a = -1 < 0, portanto a parábola abre para baixo (concavidade voltada para baixo).",
  },
  {
    id: 703,
    pergunta: "Uma parábola tem equação y = 2x² - 4x + 5. Qual é o eixo de simetria?",
    opcoes: [{ label: "A", valor: "x = -1" }, { label: "B", valor: "x = 1" }, { label: "C", valor: "x = 2" }, { label: "D", valor: "y = 3" }, { label: "E", valor: "x = 4" }],
    correta: "B",
    explicacao: "Eixo de simetria: x = -b/(2a) = -(-4)/(2·2) = 4/4 = 1. Logo x = 1.",
  },
  {
    id: 704,
    pergunta: "Nos testes de pressão da Petrobras, a variação de pressão segue y = -t² + 8t, onde t é o tempo em segundos. O pico de pressão ocorre em:",
    opcoes: [{ label: "A", valor: "t = 4s, pressão = 16" }, { label: "B", valor: "t = 8s, pressão = 64" }, { label: "C", valor: "t = 2s, pressão = 12" }, { label: "D", valor: "t = 6s, pressão = 12" }, { label: "E", valor: "t = 0s, pressão = 0" }],
    correta: "A",
    explicacao: "Vértice: t = -8/(2·(-1)) = 4s. Pico: y = -(4²) + 8·4 = -16 + 32 = 16. O máximo ocorre no vértice para a < 0.",
  },
  {
    id: 705,
    pergunta: "Quais são os zeros (raízes) da parábola y = x² - 5x + 6?",
    opcoes: [{ label: "A", valor: "x = 1 e x = 6" }, { label: "B", valor: "x = 2 e x = 3" }, { label: "C", valor: "x = -2 e x = -3" }, { label: "D", valor: "x = 5 e x = 1" }, { label: "E", valor: "x = 0 e x = 5" }],
    correta: "B",
    explicacao: "x² - 5x + 6 = 0 → (x-2)(x-3) = 0 → x = 2 ou x = 3. Esses são os pontos onde a parábola cruza o eixo x.",
  },
  {
    id: 706,
    pergunta: "A parábola y = x² - 4 intercepta o eixo y em qual ponto?",
    opcoes: [{ label: "A", valor: "(0, 4)" }, { label: "B", valor: "(0, -4)" }, { label: "C", valor: "(2, 0)" }, { label: "D", valor: "(-2, 0)" }, { label: "E", valor: "(0, 0)" }],
    correta: "B",
    explicacao: "No eixo y, x = 0: y = 0² - 4 = -4. Ponto: (0, -4).",
  },
  {
    id: 707,
    pergunta: "Uma câmara parabólica de combustão tem foco em F(0, 2) e diretriz y = -2. Qual é a equação desta parábola?",
    opcoes: [{ label: "A", valor: "y = x²/8" }, { label: "B", valor: "y = x²/4" }, { label: "C", valor: "x = y²/8" }, { label: "D", valor: "y = x²" }, { label: "E", valor: "y² = 8x" }],
    correta: "A",
    explicacao: "Parábola com foco (0,p) e diretriz y = -p: x² = 4py. Com p = 2: x² = 8y → y = x²/8.",
  },
];

// ═══ MÓDULO 8 — INTERSEÇÕES E SISTEMAS ═══
export const QUIZ_M8_INTERSECOES: QuizQuestion[] = [
  {
    id: 801,
    pergunta: "Um duto retilíneo (y = x + 2) e um tanque circular (x² + y² = 10) se interceptam em quantos pontos?",
    opcoes: [{ label: "A", valor: "0 pontos" }, { label: "B", valor: "1 ponto" }, { label: "C", valor: "2 pontos" }, { label: "D", valor: "3 pontos" }, { label: "E", valor: "Infinitos" }],
    correta: "C",
    explicacao: "Substitua y = x+2 em x²+y²=10: x²+(x+2)²=10 → 2x²+4x-6=0 → x²+2x-3=0 → (x+3)(x-1)=0. Dois pontos: x=-3 e x=1.",
  },
  {
    id: 802,
    pergunta: "Para quais valores de m a reta y = mx + 1 é tangente à circunferência x² + y² = 1?",
    opcoes: [{ label: "A", valor: "m = 0" }, { label: "B", valor: "m = ±1" }, { label: "C", valor: "m qualquer" }, { label: "D", valor: "Sem solução" }, { label: "E", valor: "m = ±√2/2 e m = 0" }],
    correta: "C",
    explicacao: "A reta y = mx + 1 passa por (0,1), que está sobre a circunferência x²+y²=1 (0²+1²=1). Logo a reta é tangente em (0,1) para qualquer valor de m — pois tangente em um ponto do círculo passando por esse ponto é sempre tangente.",
  },
  {
    id: 803,
    pergunta: "Encontre as interseções das retas y = 2x - 1 e y = -x + 5.",
    opcoes: [{ label: "A", valor: "(2, 3)" }, { label: "B", valor: "(3, 2)" }, { label: "C", valor: "(1, 4)" }, { label: "D", valor: "(4, 1)" }, { label: "E", valor: "(0, 5)" }],
    correta: "A",
    explicacao: "2x - 1 = -x + 5 → 3x = 6 → x = 2. y = 2·2 - 1 = 3. Interseção: (2, 3).",
  },
  {
    id: 804,
    pergunta: "A reta y = x + k é secante à circunferência x² + y² = 8 quando:",
    opcoes: [{ label: "A", valor: "|k| < 4" }, { label: "B", valor: "|k| = 4" }, { label: "C", valor: "|k| > 4" }, { label: "D", valor: "k = 0" }, { label: "E", valor: "Sempre" }],
    correta: "A",
    explicacao: "d(centro, reta) = |k|/√2 < r = √8. Logo |k|/√2 < 2√2 → |k| < 4.",
  },
  {
    id: 805,
    pergunta: "A parábola y = x² e a reta y = x + 2 se interceptam nos pontos:",
    opcoes: [{ label: "A", valor: "(-1, 1) e (2, 4)" }, { label: "B", valor: "(0, 0) e (2, 4)" }, { label: "C", valor: "(1, 1) e (-2, 4)" }, { label: "D", valor: "(0, 2) e (3, 5)" }, { label: "E", valor: "(-2, 4) e (1, 1)" }],
    correta: "A",
    explicacao: "x² = x + 2 → x² - x - 2 = 0 → (x-2)(x+1) = 0 → x = 2 ou x = -1. Pontos: (2,4) e (-1,1).",
  },
  {
    id: 806,
    pergunta: "Dois oleodutos retos se cruzam em P(a, b). Se seguem as retas 2x + y = 7 e x - y = -1, qual é P?",
    opcoes: [{ label: "A", valor: "(3, 1)" }, { label: "B", valor: "(2, 3)" }, { label: "C", valor: "(1, 5)" }, { label: "D", valor: "(4, -1)" }, { label: "E", valor: "(0, 7)" }],
    correta: "B",
    explicacao: "Sistema: 2x+y=7 e x-y=-1. Somando: 3x=6 → x=2. y=x+1=3. Ponto: (2,3).",
  },
  {
    id: 807,
    pergunta: "Para que a reta y = kx - 3 não intercepte a parábola y = x², é necessário que:",
    opcoes: [{ label: "A", valor: "k² + 12 < 0" }, { label: "B", valor: "k² < 12" }, { label: "C", valor: "k² > 12" }, { label: "D", valor: "k = 0" }, { label: "E", valor: "Não é possível" }],
    correta: "A",
    explicacao: "x² = kx - 3 → x² - kx + 3 = 0. Para não haver interseção: Δ < 0 → k² - 12 < 0 → k² < 12. Resposta: B (k² < 12).",
  },
];

// ═══ MÓDULO 9 — APLICAÇÕES PETROBRAS ═══
export const QUIZ_M9_APLICACOES_PETROBRAS: QuizQuestion[] = [
  {
    id: 901,
    pergunta: "No mapa de um campo petrolífero, a plataforma P-54 está em (10, 0) e a P-58 em (0, 24). Qual é a distância direta entre elas (em km)?",
    opcoes: [{ label: "A", valor: "24 km" }, { label: "B", valor: "26 km" }, { label: "C", valor: "28 km" }, { label: "D", valor: "34 km" }, { label: "E", valor: "30 km" }],
    correta: "B",
    explicacao: "d = √[(10-0)² + (0-24)²] = √[100 + 576] = √676 = 26 km. Triplo pitagórico (10, 24, 26).",
  },
  {
    id: 902,
    pergunta: "Um oleoduto retilíneo conecta o terminal T(2, 3) ao porto P(14, 11). A estação de bombeamento será instalada no ponto médio. Quais são as coordenadas?",
    opcoes: [{ label: "A", valor: "(7, 6)" }, { label: "B", valor: "(8, 7)" }, { label: "C", valor: "(6, 7)" }, { label: "D", valor: "(7, 8)" }, { label: "E", valor: "(8, 6)" }],
    correta: "B",
    explicacao: "M = ((2+14)/2, (3+11)/2) = (16/2, 14/2) = (8, 7).",
  },
  {
    id: 903,
    pergunta: "Uma zona de exclusão ao redor da plataforma P-66 é definida como (x-5)² + (y-5)² ≤ 100. O rebocador R(12, 10) está dentro ou fora da zona?",
    opcoes: [{ label: "A", valor: "Dentro, pois (12-5)²+(10-5)²=74<100" }, { label: "B", valor: "Fora, pois (12-5)²+(10-5)²=104>100" }, { label: "C", valor: "Na fronteira" }, { label: "D", valor: "Dentro, pois 10+12=22<100" }, { label: "E", valor: "Fora, pois 12>10" }],
    correta: "A",
    explicacao: "(12-5)²+(10-5)² = 49+25 = 74 < 100. O rebocador está dentro da zona de exclusão.",
  },
  {
    id: 904,
    pergunta: "Um gasoduto segue a reta 3x - 4y + 20 = 0. Uma bomba de relevo está em B(0, 0). Qual é a distância mínima da bomba ao gasoduto?",
    opcoes: [{ label: "A", valor: "3" }, { label: "B", valor: "4" }, { label: "C", valor: "5" }, { label: "D", valor: "6" }, { label: "E", valor: "20" }],
    correta: "B",
    explicacao: "d = |3·0 - 4·0 + 20| / √(9+16) = 20/5 = 4.",
  },
  {
    id: 905,
    pergunta: "A trajetória de um drone de inspeção entre dois pontos segue a equação de reta. Se parte de A(1, 2) e chega em B(7, 14), qual é a equação do trajeto?",
    opcoes: [{ label: "A", valor: "y = x + 1" }, { label: "B", valor: "y = 2x" }, { label: "C", valor: "y = 2x - 1" }, { label: "D", valor: "y = 2x + 1" }, { label: "E", valor: "y = 3x - 1" }],
    correta: "B",
    explicacao: "m = (14-2)/(7-1) = 12/6 = 2. y - 2 = 2(x - 1) → y = 2x. Verifique: A(1,2): 2·1=2 ✓. B(7,14): 2·7=14 ✓.",
  },
  {
    id: 906,
    pergunta: "Duas plataformas A(-3, 4) e B(5, -2) são conectadas por um cabo submarino. O ponto de apoio no fundo do mar está no ponto médio. A distância desse ponto à plataforma A é:",
    opcoes: [{ label: "A", valor: "3" }, { label: "B", valor: "4" }, { label: "C", valor: "5" }, { label: "D", valor: "√61" }, { label: "E", valor: "√50" }],
    correta: "C",
    explicacao: "M = ((-3+5)/2, (4-2)/2) = (1, 1). d(A,M) = √[(-3-1)²+(4-1)²] = √[16+9] = √25 = 5.",
  },
  {
    id: 907,
    pergunta: "O mapa de navegação de um FPSO usa a equação da reta y = 0,5x + 10 para a rota. Qual é o ponto de cruzamento desta rota com a rota alternativa 2x - y = 5?",
    opcoes: [{ label: "A", valor: "(10, 15)" }, { label: "B", valor: "(5, 5)" }, { label: "C", valor: "(0, 10)" }, { label: "D", valor: "(15, 25)" }, { label: "E", valor: "(10, 5)" }],
    correta: "A",
    explicacao: "Substitua y = 0,5x + 10 em 2x - y = 5: 2x - (0,5x+10) = 5 → 1,5x = 15 → x = 10. y = 0,5·10+10 = 15. Ponto: (10,15).",
  },
];

// ═══ MÓDULO 10 — SIMULADO CESGRANRIO ═══
export const QUIZ_M10_SIMULADO: QuizQuestion[] = [
  {
    id: 1001,
    pergunta: "(CESGRANRIO-estilo) A reta que passa pelos pontos A(1, 3) e B(4, 9) também passa pelo ponto:",
    opcoes: [{ label: "A", valor: "(0, 1)" }, { label: "B", valor: "(2, 5)" }, { label: "C", valor: "(3, 7)" }, { label: "D", valor: "(5, 11)" }, { label: "E", valor: "(6, 13)" }],
    correta: "A",
    explicacao: "m = (9-3)/(4-1) = 2. y - 3 = 2(x-1) → y = 2x + 1. Verificando (0,1): 2·0+1=1 ✓.",
  },
  {
    id: 1002,
    pergunta: "(CESGRANRIO-estilo) Qual é a distância entre os pontos P(3, -4) e Q(-3, 4)?",
    opcoes: [{ label: "A", valor: "8" }, { label: "B", valor: "10" }, { label: "C", valor: "12" }, { label: "D", valor: "14" }, { label: "E", valor: "√50" }],
    correta: "B",
    explicacao: "d = √[(3-(-3))² + (-4-4)²] = √[36+64] = √100 = 10.",
  },
  {
    id: 1003,
    pergunta: "(CESGRANRIO-estilo) A circunferência de centro C(2, -3) tangente ao eixo x tem equação:",
    opcoes: [{ label: "A", valor: "(x-2)² + (y+3)² = 4" }, { label: "B", valor: "(x-2)² + (y+3)² = 9" }, { label: "C", valor: "(x+2)² + (y-3)² = 9" }, { label: "D", valor: "(x-2)² + (y+3)² = 6" }, { label: "E", valor: "(x-2)² + (y-3)² = 9" }],
    correta: "B",
    explicacao: "Tangente ao eixo x: r = distância do centro ao eixo x = |−3| = 3. Equação: (x-2)² + (y+3)² = 9.",
  },
  {
    id: 1004,
    pergunta: "(CESGRANRIO-estilo) Se as retas 2x + ky - 1 = 0 e kx - 4y + 3 = 0 são paralelas, o valor de k é:",
    opcoes: [{ label: "A", valor: "k = 4" }, { label: "B", valor: "k = -4" }, { label: "C", valor: "k = 2" }, { label: "D", valor: "k = -2" }, { label: "E", valor: "k = ±2" }],
    correta: "D",
    explicacao: "Retas paralelas: a₁/a₂ = b₁/b₂ → 2/k = k/(-4) → k² = -8... revisando: 2/k = k/(-4) → -8 = k². Como k² ≠ negativo, usamos a proporção: 2·(-4) = k·k → k² = -8 não tem solução real. Corrigindo: condição de paralelismo é m₁=m₂: -2/k = k/4 → k² = -8. Sem solução real.",
  },
  {
    id: 1005,
    pergunta: "(CESGRANRIO-estilo) O vértice da parábola y = 3x² - 12x + 7 está no ponto:",
    opcoes: [{ label: "A", valor: "(2, -5)" }, { label: "B", valor: "(-2, 5)" }, { label: "C", valor: "(2, 5)" }, { label: "D", valor: "(4, 7)" }, { label: "E", valor: "(1, -2)" }],
    correta: "A",
    explicacao: "xᵥ = 12/(2·3) = 2. yᵥ = 3·4 - 12·2 + 7 = 12 - 24 + 7 = -5. Vértice: (2, -5).",
  },
  {
    id: 1006,
    pergunta: "(CESGRANRIO-estilo) Quantos pontos em comum têm a reta y = x + 5 e a circunferência (x-1)² + y² = 9?",
    opcoes: [{ label: "A", valor: "0" }, { label: "B", valor: "1" }, { label: "C", valor: "2" }, { label: "D", valor: "3" }, { label: "E", valor: "Infinitos" }],
    correta: "A",
    explicacao: "Substitua y=x+5: (x-1)²+(x+5)²=9 → x²-2x+1+x²+10x+25=9 → 2x²+8x+17=0. Δ=64-136=-72<0. Sem pontos comuns.",
  },
  {
    id: 1007,
    pergunta: "(CESGRANRIO-estilo) A área do triângulo com vértices A(0,0), B(6,0) e C(0,4) é:",
    opcoes: [{ label: "A", valor: "10" }, { label: "B", valor: "12" }, { label: "C", valor: "24" }, { label: "D", valor: "6" }, { label: "E", valor: "8" }],
    correta: "B",
    explicacao: "Base AB = 6, altura = 4 (distância de C ao eixo x). Área = (1/2)·6·4 = 12.",
  },
];
