import { QuizQuestion } from "../../shared";

// ═══ MÓDULO 1 — CONCEITOS INICIAIS ═══
export const QUIZ_M1_CONCEITOS: QuizQuestion[] = [
  { id: 101, pergunta: "Em Estatística, o conjunto de todos os elementos que possuem uma característica comum a ser estudada é chamado de:", opcoes: [{ label: "A", valor: "Amostra" }, { label: "B", valor: "População" }, { label: "C", valor: "Rol" }, { label: "D", valor: "Frequência Relativa" }, { label: "E", valor: "Variável Qualitativa" }], correta: "B", explicacao: "População é o conjunto universo do estudo estatístico. A amostra é um subconjunto representativo dessa população." },
  { id: 102, pergunta: "A cor dos olhos dos funcionários da Petrobras é um exemplo de variável:", opcoes: [{ label: "A", valor: "Quantitativa discreta" }, { label: "B", valor: "Quantitativa contínua" }, { label: "C", valor: "Qualitativa nominal" }, { label: "D", valor: "Qualitativa ordinal" }, { label: "E", valor: "Estatística inferencial" }], correta: "C", explicacao: "Cor dos olhos é uma variável qualitativa (expressa qualidade, não número) e nominal (não existe ordem natural de classificação)." }
];

// ═══ MÓDULO 2 — DISTRIBUIÇÃO DE FREQUÊNCIAS ═══
export const QUIZ_M2_FREQUENCIA: QuizQuestion[] = [
  { id: 201, pergunta: "O que é o 'Rol' em Estatística?", opcoes: [{ label: "A", valor: "O conjunto de todos os dados" }, { label: "B", valor: "A diferença entre o maior e o menor valor" }, { label: "C", valor: "A organização dos dados brutos em ordem crescente ou decrescente" }, { label: "D", valor: "A soma de todas as frequências" }, { label: "E", valor: "A média aritmética" }], correta: "C", explicacao: "Rol é a ordenação dos dados. Fundamental antes de encontrar a Mediana." },
  { id: 202, pergunta: "A Frequência Relativa de um dado é obtida:", opcoes: [{ label: "A", valor: "Somando as frequências simples" }, { label: "B", valor: "Dividindo a frequência simples pelo total de elementos" }, { label: "C", valor: "Multiplicando a frequência simples por 100" }, { label: "D", valor: "Subtraindo o menor valor do maior valor" }, { label: "E", valor: "Extraindo a raiz quadrada da variância" }], correta: "B", explicacao: "Fr = f / n. Expressa a proporção daquele dado no total, frequentemente apresentada em percentual." }
];

// ═══ MÓDULO 3 — REPRESENTAÇÕES GRÁFICAS ═══
export const QUIZ_M3_GRAFICOS: QuizQuestion[] = [
  { id: 301, pergunta: "Qual gráfico é mais adequado para representar frequências de dados agrupados em intervalos de classes contínuas?", opcoes: [{ label: "A", valor: "Gráfico de Setores (Pizza)" }, { label: "B", valor: "Histograma" }, { label: "C", valor: "Gráfico de Linhas" }, { label: "D", valor: "Gráfico de Dispersão" }, { label: "E", valor: "Gráfico de Barras Horizontais" }], correta: "B", explicacao: "O Histograma, formado por retângulos contíguos (sem espaço), é ideal para variáveis contínuas agrupadas em classes." },
  { id: 302, pergunta: "No Gráfico de Setores (Pizza), o ângulo de cada setor é proporcional:", opcoes: [{ label: "A", valor: "À moda dos dados" }, { label: "B", valor: "À média aritmética" }, { label: "C", valor: "À frequência do dado (absoluta ou relativa)" }, { label: "D", valor: "À mediana" }, { label: "E", valor: "Ao desvio padrão" }], correta: "C", explicacao: "O ângulo central = 360° × Frequência Relativa. Logo, é proporcional à frequência." }
];

// ═══ MÓDULO 4 — MÉDIA ARITMÉTICA SIMPLES ═══
export const QUIZ_M4_MEDIA_SIMPLES: QuizQuestion[] = [
  { id: 401, pergunta: "A produção diária de petróleo em barris numa unidade foi: 10, 15, 20. Qual a média?", opcoes: [{ label: "A", valor: "10" }, { label: "B", valor: "15" }, { label: "C", valor: "20" }, { label: "D", valor: "45" }, { label: "E", valor: "12,5" }], correta: "B", explicacao: "Média = (10+15+20)/3 = 45/3 = 15 barris." },
  { id: 402, pergunta: "Se a média das notas de 5 técnicos é 7,0 e a soma de 4 dessas notas é 27, qual foi a 5ª nota?", opcoes: [{ label: "A", valor: "6,0" }, { label: "B", valor: "7,0" }, { label: "C", valor: "8,0" }, { label: "D", valor: "9,0" }, { label: "E", valor: "10,0" }], correta: "C", explicacao: "Soma total = Média × N = 7 × 5 = 35. Se 4 notas somam 27, a 5ª é 35 - 27 = 8,0." }
];

// ═══ MÓDULO 5 — MÉDIA ARITMÉTICA PONDERADA ═══
export const QUIZ_M5_MEDIA_PONDERADA: QuizQuestion[] = [
  { id: 501, pergunta: "Em um concurso da Petrobras, a prova de Conhecimentos Básicos tem peso 1 e a Específica peso 2. Se um candidato tirou 6 na Básica e 9 na Específica, qual a sua média final?", opcoes: [{ label: "A", valor: "7,5" }, { label: "B", valor: "8,0" }, { label: "C", valor: "8,5" }, { label: "D", valor: "7,0" }, { label: "E", valor: "9,0" }], correta: "B", explicacao: "Média Ponderada = [(6×1) + (9×2)] / (1+2) = (6+18)/3 = 24/3 = 8,0." },
  { id: 502, pergunta: "A soma dos pesos na fórmula da Média Aritmética Ponderada fica:", opcoes: [{ label: "A", valor: "No numerador, somando com os valores" }, { label: "B", valor: "No denominador, dividindo a soma dos produtos" }, { label: "C", valor: "Multiplicando o resultado final" }, { label: "D", valor: "Não entra na fórmula" }, { label: "E", valor: "Elevado ao quadrado" }], correta: "B", explicacao: "A fórmula é a soma de (Valor × Peso) dividida pela soma dos Pesos (Denominador)." }
];

// ═══ MÓDULO 6 — MODA ═══
export const QUIZ_M6_MODA: QuizQuestion[] = [
  { id: 601, pergunta: "Qual a Moda do conjunto de salários (em R$): {3000, 4500, 3000, 5000, 7000, 4500, 3000}?", opcoes: [{ label: "A", valor: "4500" }, { label: "B", valor: "5000" }, { label: "C", valor: "7000" }, { label: "D", valor: "3000" }, { label: "E", valor: "Amodal" }], correta: "D", explicacao: "Moda é o valor que mais se repete. 3000 aparece 3 vezes (maior frequência)." },
  { id: 602, pergunta: "Um conjunto de dados sem valores repetidos é classificado quanto à moda como:", opcoes: [{ label: "A", valor: "Bimodal" }, { label: "B", valor: "Amodal" }, { label: "C", valor: "Multimodal" }, { label: "D", valor: "Unimodal" }, { label: "E", valor: "Polimodal" }], correta: "B", explicacao: "Se não há valor que se repete mais vezes do que os outros (todos têm frequência igual), o conjunto não tem moda, logo, é Amodal." }
];

// ═══ MÓDULO 7 — MEDIANA ═══
export const QUIZ_M7_MEDIANA: QuizQuestion[] = [
  { id: 701, pergunta: "Qual a Mediana do conjunto de idades: {25, 30, 22, 28, 35}?", opcoes: [{ label: "A", valor: "22" }, { label: "B", valor: "25" }, { label: "C", valor: "28" }, { label: "D", valor: "30" }, { label: "E", valor: "35" }], correta: "C", explicacao: "Primeiro passo: organizar em Rol (crescente): 22, 25, 28, 30, 35. O valor central é o 3º termo: 28." },
  { id: 702, pergunta: "Para um conjunto com número PAR de elementos (ex: n=6), a mediana é obtida:", opcoes: [{ label: "A", valor: "Pelo valor do terceiro elemento" }, { label: "B", valor: "Pela média aritmética dos dois valores centrais após ordenação (Rol)" }, { label: "C", valor: "Pelo quarto elemento da série não ordenada" }, { label: "D", valor: "Somando o menor e o maior valor" }, { label: "E", valor: "É igual à moda" }], correta: "B", explicacao: "Se n é par, não existe um único elemento central. Tira-se a média aritmética dos dois centrais." }
];

// ═══ MÓDULO 8 — VARIÂNCIA ═══
export const QUIZ_M8_VARIANCIA: QuizQuestion[] = [
  { id: 801, pergunta: "A Variância é uma medida estatística que indica:", opcoes: [{ label: "A", valor: "O ponto médio de uma distribuição" }, { label: "B", valor: "O valor que ocorre com mais frequência" }, { label: "C", valor: "A soma de todos os dados" }, { label: "D", valor: "A dispersão dos dados em relação à média" }, { label: "E", valor: "A amplitude dos dados" }], correta: "D", explicacao: "Variância é a média dos quadrados dos desvios. Mede o quão dispersos (afastados) os dados estão da Média." },
  { id: 802, pergunta: "Se todos os elementos de um conjunto forem idênticos (ex: 5, 5, 5, 5), a Variância será:", opcoes: [{ label: "A", valor: "5" }, { label: "B", valor: "25" }, { label: "C", valor: "0" }, { label: "D", valor: "1" }, { label: "E", valor: "Infinita" }], correta: "C", explicacao: "Não há dispersão se todos os valores são iguais à média. Logo, os desvios são zero e a Variância é 0." }
];

// ═══ MÓDULO 9 — DESVIO PADRÃO ═══
export const QUIZ_M9_DESVIO_PADRAO: QuizQuestion[] = [
  { id: 901, pergunta: "O Desvio Padrão é definido matematicamente como:", opcoes: [{ label: "A", valor: "O dobro da Variância" }, { label: "B", valor: "A metade da Variância" }, { label: "C", valor: "A Variância elevada ao quadrado" }, { label: "D", valor: "A raiz quadrada positiva da Variância" }, { label: "E", valor: "A média aritmética dividida pela Moda" }], correta: "D", explicacao: "Desvio Padrão = √(Variância). Ele retorna a medida de dispersão para a mesma unidade original dos dados." },
  { id: 902, pergunta: "Se a Variância de um conjunto de notas é 16, qual é o seu Desvio Padrão?", opcoes: [{ label: "A", valor: "8" }, { label: "B", valor: "4" }, { label: "C", valor: "256" }, { label: "D", valor: "32" }, { label: "E", valor: "2" }], correta: "B", explicacao: "Sendo DP = √(Variância), DP = √16 = 4." }
];

// ═══ MÓDULO 10 — SIMULADO FINAL ═══
export const QUIZ_M10_SIMULADO: QuizQuestion[] = [
  { id: 1001, pergunta: "Em uma amostra de 5 turbinas, a variância do tempo de reparo foi calculada como 9 horas². O Desvio Padrão é de:", opcoes: [{ label: "A", valor: "81 horas" }, { label: "B", valor: "4,5 horas" }, { label: "C", valor: "18 horas" }, { label: "D", valor: "3 horas" }, { label: "E", valor: "9 horas" }], correta: "D", explicacao: "Desvio Padrão = √9 = 3 horas. Questão simples mas muito frequente na Cesgranrio." },
  { id: 1002, pergunta: "CESGRANRIO: Quando a Média, a Moda e a Mediana de um grande conjunto de dados contínuos assumem valores muito próximos, a distribuição costuma ser:", opcoes: [{ label: "A", valor: "Amodal" }, { label: "B", valor: "Simétrica (ex: Distribuição Normal)" }, { label: "C", valor: "Totalmente Assimétrica à Direita" }, { label: "D", valor: "Bimodal" }, { label: "E", valor: "Discreta Platicúrtica" }], correta: "B", explicacao: "Numa curva normal perfeita (simétrica), Média = Moda = Mediana coincidem no centro." }
];
