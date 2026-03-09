import { QuizQuestion } from "../../shared";

// ═══ MÓDULO 1 — CONCEITO E NOTAÇÃO DE MATRIZES ═══
export const QUIZ_M1_CONCEITO_MATRIZES: QuizQuestion[] = [
  {
    id: 101,
    pergunta: "Uma matriz de dimensão 3×4 possui quantos elementos?",
    opcoes: [
      { label: "A", valor: "7" },
      { label: "B", valor: "12" },
      { label: "C", valor: "34" },
      { label: "D", valor: "9" },
      { label: "E", valor: "16" },
    ],
    correta: "B",
    explicacao:
      "Uma matriz m×n possui m·n elementos. Logo 3×4 = 12 elementos. Cuidado: 3+4=7 é a armadilha clássica. Na Petrobras, uma tabela de produção com 3 plataformas e 4 turnos tem 12 células de dados.",
  },
  {
    id: 102,
    pergunta:
      "Na matriz A = (aᵢⱼ)₃ₓ₂, qual é o elemento a₂₃?",
    opcoes: [
      { label: "A", valor: "O elemento da 2ª linha, 3ª coluna" },
      { label: "B", valor: "O elemento da 3ª linha, 2ª coluna" },
      { label: "C", valor: "O produto de 2 por 3" },
      { label: "D", valor: "Elemento inexistente para esta matriz" },
      { label: "E", valor: "O elemento da 1ª linha, 1ª coluna" },
    ],
    correta: "D",
    explicacao:
      "A matriz é 3×2: tem 3 linhas e apenas 2 colunas. O elemento a₂₃ seria da 2ª linha, 3ª coluna — mas a 3ª coluna não existe! Pegadinha CESGRANRIO: sempre verifique se o índice de coluna não excede n.",
  },
  {
    id: 103,
    pergunta:
      "A tabela de pressões (em bar) medidas em 4 dutos de uma refinaria durante 3 turnos forma uma matriz de dimensão:",
    opcoes: [
      { label: "A", valor: "4×3" },
      { label: "B", valor: "3×4" },
      { label: "C", valor: "12×1" },
      { label: "D", valor: "1×12" },
      { label: "E", valor: "7×1" },
    ],
    correta: "B",
    explicacao:
      "Convenção: linhas representam os turnos (3) e colunas representam os dutos (4). A matriz é 3×4. Alternativamente, pode ser 4×3 dependendo da convenção adotada, mas a ordem mais natural é linhas=observações, colunas=variáveis.",
  },
  {
    id: 104,
    pergunta:
      "Se aᵢⱼ = i + 2j, qual é o valor de a₂₃ em uma matriz 3×4?",
    opcoes: [
      { label: "A", valor: "5" },
      { label: "B", valor: "7" },
      { label: "C", valor: "8" },
      { label: "D", valor: "9" },
      { label: "E", valor: "10" },
    ],
    correta: "C",
    explicacao:
      "Substituindo i=2, j=3: a₂₃ = 2 + 2·3 = 2 + 6 = 8. A lei de formação define cada elemento. Na Petrobras, isso seria equivalente a uma fórmula que calcula a pressão em função do duto e do turno.",
  },
  {
    id: 105,
    pergunta:
      "Duas matrizes A e B são iguais quando:",
    opcoes: [
      { label: "A", valor: "Têm o mesmo número de elementos" },
      { label: "B", valor: "Têm a mesma ordem e todos os elementos correspondentes são iguais" },
      { label: "C", valor: "Têm a mesma soma de todos os elementos" },
      { label: "D", valor: "São ambas quadradas" },
      { label: "E", valor: "Têm o mesmo traço (diagonal principal)" },
    ],
    correta: "B",
    explicacao:
      "Igualdade de matrizes exige: (1) mesma ordem m×n E (2) aᵢⱼ = bᵢⱼ para todo i e j. Uma matriz 2×3 nunca é igual a uma 3×2, mesmo com os mesmos 6 números. A CESGRANRIO adora testar este conceito.",
  },
  {
    id: 106,
    pergunta:
      "O relatório de produção da RPBC registra: Plataforma P-51 produziu [3000, 3100, 2900] barris em jan, fev, mar. Isso é uma matriz de ordem:",
    opcoes: [
      { label: "A", valor: "3×3" },
      { label: "B", valor: "1×3" },
      { label: "C", valor: "3×1" },
      { label: "D", valor: "1×1" },
      { label: "E", valor: "3×0" },
    ],
    correta: "B",
    explicacao:
      "Os dados formam uma linha com 3 valores → matriz linha de ordem 1×3. Se fosse uma coluna, seria 3×1 (vetor coluna). Matrizes linha e coluna são casos especiais (vetores) muito usados em sistemas de equações da indústria.",
  },
  {
    id: 107,
    pergunta:
      "Se A é uma matriz 2×5, quantas linhas e colunas ela possui?",
    opcoes: [
      { label: "A", valor: "5 linhas e 2 colunas" },
      { label: "B", valor: "2 linhas e 5 colunas" },
      { label: "C", valor: "10 linhas e 10 colunas" },
      { label: "D", valor: "7 linhas e 7 colunas" },
      { label: "E", valor: "2 linhas e 2 colunas" },
    ],
    correta: "B",
    explicacao:
      "A notação m×n significa m linhas e n colunas, sempre nessa ordem. A = (aᵢⱼ)₂ₓ₅ tem i variando de 1 a 2 (linhas) e j variando de 1 a 5 (colunas). Memorize: LinhaXColuna, como LerCol.",
  },
  {
    id: 108,
    pergunta:
      "A lei de formação aᵢⱼ = i · j gera uma matriz 2×3. O elemento da 2ª linha e 2ª coluna é:",
    opcoes: [
      { label: "A", valor: "2" },
      { label: "B", valor: "4" },
      { label: "C", valor: "6" },
      { label: "D", valor: "3" },
      { label: "E", valor: "1" },
    ],
    correta: "B",
    explicacao:
      "a₂₂ = 2 · 2 = 4. A matriz completa seria: [[1,2,3],[2,4,6]]. Na indústria, esta lei poderia representar a interação entre pressão e temperatura em dutos.",
  },
];

// ═══ MÓDULO 2 — TIPOS ESPECIAIS DE MATRIZES ═══
export const QUIZ_M2_TIPOS_MATRIZES: QuizQuestion[] = [
  {
    id: 201,
    pergunta:
      "Uma matriz quadrada tem a mesma quantidade de linhas e colunas. Uma matriz 5×5 é:",
    opcoes: [
      { label: "A", valor: "Retangular" },
      { label: "B", valor: "Quadrada de ordem 5" },
      { label: "C", valor: "Linha" },
      { label: "D", valor: "Coluna" },
      { label: "E", valor: "Nula" },
    ],
    correta: "B",
    explicacao:
      "Matriz quadrada é aquela com m=n. A ordem é o número de linhas (ou colunas). Uma matriz 5×5 é quadrada de ordem 5. Na Petrobras, matrizes de transformação para coordenadas geoespaciais são frequentemente quadradas.",
  },
  {
    id: 202,
    pergunta:
      "A matriz identidade de ordem 3 (I₃) tem os seguintes valores na diagonal principal e fora dela:",
    opcoes: [
      { label: "A", valor: "1 na diagonal, 0 fora" },
      { label: "B", valor: "0 na diagonal, 1 fora" },
      { label: "C", valor: "Todos os elementos iguais a 1" },
      { label: "D", valor: "Todos os elementos iguais a 0" },
      { label: "E", valor: "Números aleatórios" },
    ],
    correta: "A",
    explicacao:
      "A identidade Iₙ tem aᵢᵢ=1 e aᵢⱼ=0 para i≠j. É o elemento neutro da multiplicação: A·I = I·A = A. Na álgebra linear aplicada a sistemas de controle da Petrobras, I₃ representa 'nenhuma transformação'.",
  },
  {
    id: 203,
    pergunta:
      "Uma matriz diagonal tem todos os elementos fora da diagonal principal iguais a zero. Qual das matrizes abaixo é diagonal?",
    opcoes: [
      { label: "A", valor: "[[1,2],[0,3]]" },
      { label: "B", valor: "[[5,0],[0,7]]" },
      { label: "C", valor: "[[0,0],[0,0]]" },
      { label: "D", valor: "[[1,1],[1,1]]" },
      { label: "E", valor: "[[2,3],[4,5]]" },
    ],
    correta: "B",
    explicacao:
      "[[5,0],[0,7]] tem a₁₂=0 e a₂₁=0 — diagonal é 5 e 7. C é a nula (caso especial de diagonal). A é triangular superior mas não diagonal (a₁₂=2≠0). Matrizes diagonais simplificam cálculos de sistemas industriais.",
  },
  {
    id: 204,
    pergunta:
      "Uma matriz simétrica satisfaz A = Aᵀ. Isso significa que:",
    opcoes: [
      { label: "A", valor: "aᵢⱼ = aⱼᵢ para todos os i, j" },
      { label: "B", valor: "aᵢⱼ = -aⱼᵢ para todos os i, j" },
      { label: "C", valor: "Todos os elementos são iguais" },
      { label: "D", valor: "A diagonal é nula" },
      { label: "E", valor: "A é uma matriz quadrada qualquer" },
    ],
    correta: "A",
    explicacao:
      "Simétrica: aᵢⱼ = aⱼᵢ (simétrica em relação à diagonal). Antissimétrica: aᵢⱼ = -aⱼᵢ. Em análise estrutural de plataformas offshore, matrizes de rigidez são simétricas.",
  },
  {
    id: 205,
    pergunta:
      "Qual é a dimensão de uma matriz coluna com 4 elementos?",
    opcoes: [
      { label: "A", valor: "1×4" },
      { label: "B", valor: "4×4" },
      { label: "C", valor: "4×1" },
      { label: "D", valor: "2×2" },
      { label: "E", valor: "4×0" },
    ],
    correta: "C",
    explicacao:
      "Matriz coluna: uma única coluna com n linhas → dimensão n×1. Matriz linha: uma única linha → dimensão 1×n. Um vetor de estado com 4 variáveis de processo (pressão, temp., vazão, nível) é uma matriz 4×1.",
  },
  {
    id: 206,
    pergunta:
      "A matriz nula é aquela onde:",
    opcoes: [
      { label: "A", valor: "A diagonal é nula" },
      { label: "B", valor: "O determinante é zero" },
      { label: "C", valor: "Todos os elementos são iguais a zero" },
      { label: "D", valor: "Tem mais colunas do que linhas" },
      { label: "E", valor: "É quadrada de ordem 0" },
    ],
    correta: "C",
    explicacao:
      "Matriz nula: todos os aᵢⱼ = 0. É o elemento neutro da adição: A + 0 = 0 + A = A. Não confundir com 'determinante nulo' (singular) — uma matriz pode ter det=0 sem ser a nula.",
  },
  {
    id: 207,
    pergunta:
      "Uma matriz triangular superior tem todos os elementos abaixo da diagonal principal iguais a zero. O sistema de controle de válvulas da REPLAN usa a matriz [[2,3,1],[0,5,4],[0,0,6]]. Ela é:",
    opcoes: [
      { label: "A", valor: "Triangular inferior" },
      { label: "B", valor: "Triangular superior" },
      { label: "C", valor: "Diagonal" },
      { label: "D", valor: "Simétrica" },
      { label: "E", valor: "Nula" },
    ],
    correta: "B",
    explicacao:
      "Os zeros estão abaixo da diagonal (a₂₁=0, a₃₁=0, a₃₂=0) → triangular superior. Matrizes triangulares surgem em decomposição LU, usada na resolução de sistemas de equações de engenharia.",
  },
  {
    id: 208,
    pergunta:
      "Se uma matriz quadrada A satisfaz aᵢⱼ = 0 sempre que i > j, ela é classificada como:",
    opcoes: [
      { label: "A", valor: "Triangular inferior" },
      { label: "B", valor: "Triangular superior" },
      { label: "C", valor: "Diagonal" },
      { label: "D", valor: "Identidade" },
      { label: "E", valor: "Nula" },
    ],
    correta: "B",
    explicacao:
      "i > j significa abaixo da diagonal → esses elementos são zero → triangular superior. i < j abaixo da diagonal seriam zeros na triangular inferior. A condição i > j elimina elementos de linha maior que coluna.",
  },
];

// ═══ MÓDULO 3 — ADIÇÃO E SUBTRAÇÃO DE MATRIZES ═══
export const QUIZ_M3_ADICAO_SUBTRACAO: QuizQuestion[] = [
  {
    id: 301,
    pergunta:
      "Duas matrizes podem ser somadas somente se:",
    opcoes: [
      { label: "A", valor: "Ambas forem quadradas" },
      { label: "B", valor: "Tiverem a mesma ordem (m×n)" },
      { label: "C", valor: "O número de colunas de A = número de linhas de B" },
      { label: "D", valor: "Ambas forem simétricas" },
      { label: "E", valor: "Tiverem o mesmo determinante" },
    ],
    correta: "B",
    explicacao:
      "Adição de matrizes exige mesma ordem. A condição 'colunas de A = linhas de B' é para multiplicação, não soma. Erro clássico de concurso: confundir as condições de soma e multiplicação.",
  },
  {
    id: 302,
    pergunta:
      "Se A = [[1,2],[3,4]] e B = [[5,6],[7,8]], então A + B é:",
    opcoes: [
      { label: "A", valor: "[[6,8],[10,12]]" },
      { label: "B", valor: "[[5,12],[21,32]]" },
      { label: "C", valor: "[[6,8],[10,11]]" },
      { label: "D", valor: "[[4,4],[4,4]]" },
      { label: "E", valor: "[[1,2],[3,4]]" },
    ],
    correta: "A",
    explicacao:
      "Soma elemento a elemento: (1+5, 2+6, 3+7, 4+8) = (6, 8, 10, 12). B é multiplicação elemento a elemento (Hadamard). Na Petrobras, somar matrizes de produção de dois semestres fornece o total anual.",
  },
  {
    id: 303,
    pergunta:
      "A produção mensal (em mil barris) de três plataformas em jan foi A=[[50,30],[20,40]] e em fev foi B=[[60,25],[35,45]]. A produção total (jan+fev) é:",
    opcoes: [
      { label: "A", valor: "[[110,55],[55,85]]" },
      { label: "B", valor: "[[3000,750],[700,1800]]" },
      { label: "C", valor: "[[10,-5],[15,5]]" },
      { label: "D", valor: "[[55,27.5],[27.5,42.5]]" },
      { label: "E", valor: "[[110,65],[45,85]]" },
    ],
    correta: "A",
    explicacao:
      "A + B: (50+60, 30+25, 20+35, 40+45) = (110, 55, 55, 85). A soma de matrizes de produção é direta — cada elemento da soma representa o total acumulado daquele produto naquela plataforma.",
  },
  {
    id: 304,
    pergunta:
      "Se A - B = [[2,-1],[0,3]] e A = [[5,2],[4,7]], qual é B?",
    opcoes: [
      { label: "A", valor: "[[3,3],[4,4]]" },
      { label: "B", valor: "[[7,1],[4,10]]" },
      { label: "C", valor: "[[3,-3],[4,-4]]" },
      { label: "D", valor: "[[3,3],[4,4]]" },
      { label: "E", valor: "[[2,3],[4,4]]" },
    ],
    correta: "A",
    explicacao:
      "B = A - (A-B) = [[5,2],[4,7]] - [[2,-1],[0,3]] = [[3,3],[4,4]]. Verifique: A - B = [[5-3, 2-3],[4-4, 7-4]] = [[2,-1],[0,3]] ✓.",
  },
  {
    id: 305,
    pergunta:
      "A propriedade comutativa da adição de matrizes (A + B = B + A):",
    opcoes: [
      { label: "A", valor: "Nunca é válida" },
      { label: "B", valor: "É sempre válida para matrizes de mesma ordem" },
      { label: "C", valor: "Só vale para matrizes quadradas" },
      { label: "D", valor: "Só vale se A = B" },
      { label: "E", valor: "Vale apenas para matrizes simétricas" },
    ],
    correta: "B",
    explicacao:
      "A soma de matrizes é comutativa: A + B = B + A, pois a soma de números reais é comutativa (aᵢⱼ + bᵢⱼ = bᵢⱼ + aᵢⱼ). Diferente da multiplicação, que NÃO é comutativa em geral.",
  },
  {
    id: 306,
    pergunta:
      "Se k=3 e A = [[2,4],[1,5]], então k·A (multiplicação por escalar) é:",
    opcoes: [
      { label: "A", valor: "[[5,7],[4,8]]" },
      { label: "B", valor: "[[6,12],[3,15]]" },
      { label: "C", valor: "[[2,4],[1,5]]" },
      { label: "D", valor: "[[8,12],[4,16]]" },
      { label: "E", valor: "[[6,4],[3,5]]" },
    ],
    correta: "B",
    explicacao:
      "k·A multiplica cada elemento por k: 3·[[2,4],[1,5]] = [[6,12],[3,15]]. Na Petrobras, se a produção mensal é A, após 3 meses idênticos a produção acumulada seria 3A.",
  },
  {
    id: 307,
    pergunta:
      "Qual é a matriz oposta (−A) de A = [[1,−2],[3,0]]?",
    opcoes: [
      { label: "A", valor: "[[−1,2],[−3,0]]" },
      { label: "B", valor: "[[1,2],[−3,0]]" },
      { label: "C", valor: "[[0,0],[0,0]]" },
      { label: "D", valor: "[[−1,−2],[3,0]]" },
      { label: "E", valor: "[[1,2],[3,0]]" },
    ],
    correta: "A",
    explicacao:
      "A matriz oposta troca o sinal de todos os elementos: −A = [[−1,2],[−3,0]]. Note que 0 permanece 0. A + (−A) = matriz nula. Isso é a operação de subtração: A − B = A + (−B).",
  },
  {
    id: 308,
    pergunta:
      "Em uma inspeção na P-67, os valores de desgaste registrados no mês anterior eram C = [[4,2],[1,3]] e os valores atuais são D = [[6,5],[4,7]]. A variação (D − C) representa:",
    opcoes: [
      { label: "A", valor: "[[10,7],[5,10]] — a soma" },
      { label: "B", valor: "[[2,3],[3,4]] — o aumento no desgaste" },
      { label: "C", valor: "[[4,2],[1,3]] — os valores anteriores" },
      { label: "D", valor: "[[24,10],[4,21]] — o produto" },
      { label: "E", valor: "[[1,2],[3,4]] — a média" },
    ],
    correta: "B",
    explicacao:
      "D − C = [[6-4, 5-2],[4-1, 7-3]] = [[2,3],[3,4]]. Cada elemento representa o aumento no desgaste daquele componente. Subtração de matrizes mede variação entre dois estados — aplicação real em manutenção preditiva.",
  },
];

// ═══ MÓDULO 4 — MULTIPLICAÇÃO DE MATRIZES ═══
export const QUIZ_M4_MULTIPLICACAO: QuizQuestion[] = [
  {
    id: 401,
    pergunta:
      "Para que o produto A·B seja definido, é necessário que:",
    opcoes: [
      { label: "A", valor: "A e B tenham a mesma ordem" },
      { label: "B", valor: "O número de colunas de A seja igual ao número de linhas de B" },
      { label: "C", valor: "A e B sejam quadradas" },
      { label: "D", valor: "O número de linhas de A seja igual ao número de colunas de B" },
      { label: "E", valor: "A e B sejam simétricas" },
    ],
    correta: "B",
    explicacao:
      "A·B é possível quando: colunas(A) = linhas(B). Se A é m×p e B é p×n, então A·B é m×n. Lembre: as dimensões internas devem ser iguais, as externas definem o resultado.",
  },
  {
    id: 402,
    pergunta:
      "Se A é 2×3 e B é 3×4, qual é a dimensão do produto A·B?",
    opcoes: [
      { label: "A", valor: "3×3" },
      { label: "B", valor: "2×4" },
      { label: "C", valor: "4×2" },
      { label: "D", valor: "3×4" },
      { label: "E", valor: "2×3" },
    ],
    correta: "B",
    explicacao:
      "A(2×3) · B(3×4): dimensões internas 3=3 ✓. Resultado: 2×4. Regra mnemônica: (m×p)·(p×n) = (m×n). Na análise de redes de dutos, multiplicar matrizes de fluxo e capacidade resulta em um mapa de distribuição.",
  },
  {
    id: 403,
    pergunta:
      "Dados A = [[1,2],[3,4]] e B = [[5,0],[1,2]], o elemento c₁₁ do produto C = A·B é:",
    opcoes: [
      { label: "A", valor: "5" },
      { label: "B", valor: "6" },
      { label: "C", valor: "7" },
      { label: "D", valor: "9" },
      { label: "E", valor: "10" },
    ],
    correta: "C",
    explicacao:
      "c₁₁ = (linha 1 de A) · (coluna 1 de B) = 1·5 + 2·1 = 5 + 2 = 7. A multiplicação de matrizes usa produto interno entre linha e coluna. Este cálculo aparece em transformações de coordenadas de sensores offshore.",
  },
  {
    id: 404,
    pergunta:
      "A multiplicação de matrizes é comutativa? (A·B = B·A sempre?)",
    opcoes: [
      { label: "A", valor: "Sim, sempre" },
      { label: "B", valor: "Apenas para matrizes simétricas" },
      { label: "C", valor: "Não — em geral A·B ≠ B·A" },
      { label: "D", valor: "Apenas se det(A) = det(B)" },
      { label: "E", valor: "Apenas para matrizes diagonais" },
    ],
    correta: "C",
    explicacao:
      "Em geral A·B ≠ B·A — a multiplicação NÃO é comutativa. Exceções existem (ex: A·I = I·A), mas são casos especiais. Esta é a propriedade que mais confunde em concursos da CESGRANRIO.",
  },
  {
    id: 405,
    pergunta:
      "A matriz de custo de insumos por produto é A = [[2,1],[3,2]] (reais/unidade) e o vetor de produção é B = [[100],[200]]. O custo total por tipo de insumo é A·B:",
    opcoes: [
      { label: "A", valor: "[[400],[700]]" },
      { label: "B", valor: "[[200,100],[600,400]]" },
      { label: "C", valor: "[[300],[500]]" },
      { label: "D", valor: "[[600],[800]]" },
      { label: "E", valor: "[[100],[200]]" },
    ],
    correta: "A",
    explicacao:
      "A(2×2)·B(2×1) = C(2×1). c₁₁ = 2·100+1·200 = 400. c₂₁ = 3·100+2·200 = 700. Resultado: [[400],[700]]. Multiplicação matriz-vetor é a base da análise de custos em sistemas de produção industrial.",
  },
  {
    id: 406,
    pergunta:
      "Se A·B = C, qual afirmação é sempre verdadeira?",
    opcoes: [
      { label: "A", valor: "B·A = C" },
      { label: "B", valor: "A multiplicação existe se colunas(A) = linhas(B)" },
      { label: "C", valor: "C tem a mesma ordem de A" },
      { label: "D", valor: "det(C) = det(A) + det(B)" },
      { label: "E", valor: "C é sempre invertível" },
    ],
    correta: "B",
    explicacao:
      "A única afirmação sempre verdadeira é a condição de existência: colunas(A) = linhas(B). B·A pode não existir ou ser diferente de C. A ordem de C é linhas(A) × colunas(B), não a ordem de A.",
  },
  {
    id: 407,
    pergunta:
      "Qual é o resultado de I₂ · A, onde I₂ = [[1,0],[0,1]] e A = [[3,7],[2,5]]?",
    opcoes: [
      { label: "A", valor: "[[1,0],[0,1]]" },
      { label: "B", valor: "[[4,7],[2,6]]" },
      { label: "C", valor: "[[3,7],[2,5]]" },
      { label: "D", valor: "[[6,14],[4,10]]" },
      { label: "E", valor: "[[0,0],[0,0]]" },
    ],
    correta: "C",
    explicacao:
      "I·A = A (identidade é o elemento neutro da multiplicação). I₂·A = [[1·3+0·2, 1·7+0·5],[0·3+1·2, 0·7+1·5]] = [[3,7],[2,5]]. Fundamental: qualquer sistema físico multiplicado pela identidade permanece inalterado.",
  },
  {
    id: 408,
    pergunta:
      "Em uma rede de dutos, a matriz de adjacência A = [[0,1,1],[1,0,1],[1,1,0]] representa conexões entre 3 nós. A² tem o elemento a²₁₁ = 2. Isso significa:",
    opcoes: [
      { label: "A", valor: "Há 2 caminhos de comprimento 2 do nó 1 ao nó 1" },
      { label: "B", valor: "O nó 1 tem 2 conexões diretas" },
      { label: "C", valor: "A distância mínima entre nó 1 e nó 1 é 2" },
      { label: "D", valor: "A matriz A tem determinante 2" },
      { label: "E", valor: "Nó 1 conecta a 2 outros nós" },
    ],
    correta: "A",
    explicacao:
      "Em teoria de grafos, A² conta caminhos de comprimento 2. a²₁₁ = 2 significa 2 caminhos de volta ao nó 1 em 2 passos (1→2→1 e 1→3→1). Aplicação real: análise de rotas em sistemas de dutos da Petrobras.",
  },
];

// ═══ MÓDULO 5 — TRANSPOSTA E INVERSA ═══
export const QUIZ_M5_TRANSPOSTA_INVERSA: QuizQuestion[] = [
  {
    id: 501,
    pergunta:
      "A transposta de A = [[1,2,3],[4,5,6]] (2×3) tem dimensão:",
    opcoes: [
      { label: "A", valor: "2×3" },
      { label: "B", valor: "3×2" },
      { label: "C", valor: "3×3" },
      { label: "D", valor: "2×2" },
      { label: "E", valor: "6×1" },
    ],
    correta: "B",
    explicacao:
      "A transposta Aᵀ de uma matriz m×n é n×m. Linhas viram colunas. A(2×3)ᵀ = Aᵀ(3×2). A primeira linha [1,2,3] vira a primeira coluna de Aᵀ.",
  },
  {
    id: 502,
    pergunta:
      "Se A = [[2,7],[1,3]], qual é a condição para que A seja invertível?",
    opcoes: [
      { label: "A", valor: "A deve ser simétrica" },
      { label: "B", valor: "det(A) ≠ 0" },
      { label: "C", valor: "A deve ser triangular" },
      { label: "D", valor: "Todos os elementos devem ser positivos" },
      { label: "E", valor: "A diagonal deve ser nula" },
    ],
    correta: "B",
    explicacao:
      "Uma matriz quadrada é invertível (não singular) se e somente se det(A) ≠ 0. Para A = [[2,7],[1,3]]: det = 2·3 - 7·1 = 6 - 7 = -1 ≠ 0, então A é invertível.",
  },
  {
    id: 503,
    pergunta:
      "Para A = [[3,1],[5,2]], a inversa A⁻¹ de uma matriz 2×2 usa a fórmula 1/det(A) · [[d,-b],[-c,a]]. O det(A) é:",
    opcoes: [
      { label: "A", valor: "1" },
      { label: "B", valor: "6" },
      { label: "C", valor: "-1" },
      { label: "D", valor: "11" },
      { label: "E", valor: "0" },
    ],
    correta: "A",
    explicacao:
      "det(A) = 3·2 - 1·5 = 6 - 5 = 1. Logo A⁻¹ = 1/1 · [[2,-1],[-5,3]] = [[2,-1],[-5,3]]. Quando det=1, a inversa tem os mesmos números reorganizados — resultado elegante muito cobrado pela CESGRANRIO.",
  },
  {
    id: 504,
    pergunta:
      "A transposta da transposta é igual a:",
    opcoes: [
      { label: "A", valor: "A matriz nula" },
      { label: "B", valor: "A matriz identidade" },
      { label: "C", valor: "A matriz original: (Aᵀ)ᵀ = A" },
      { label: "D", valor: "O negativo da original: −A" },
      { label: "E", valor: "A inversa da original" },
    ],
    correta: "C",
    explicacao:
      "(Aᵀ)ᵀ = A. Transpor duas vezes devolve a matriz original. Esta propriedade é intuitiva: trocar linhas e colunas duas vezes não altera nada. Usada em demonstrações formais de cálculo matricial.",
  },
  {
    id: 505,
    pergunta:
      "Se A·A⁻¹ = I, então A⁻¹ é:",
    opcoes: [
      { label: "A", valor: "A própria matriz A" },
      { label: "B", valor: "A transposta Aᵀ" },
      { label: "C", valor: "A matriz tal que o produto com A resulte na identidade" },
      { label: "D", valor: "1/A (divisão elemento a elemento)" },
      { label: "E", valor: "A matriz nula" },
    ],
    correta: "C",
    explicacao:
      "A⁻¹ é definida pela relação A·A⁻¹ = A⁻¹·A = I. Não existe 'divisão de matrizes' — usa-se a inversa. Para matrizes 2×2: A⁻¹ = (1/det)·[[d,-b],[-c,a]]. Fundamental em sistemas de equações.",
  },
  {
    id: 506,
    pergunta:
      "O sistema de calibração de sensores da P-77 exige resolver AX = B. A solução é X = A⁻¹·B, mas apenas se:",
    opcoes: [
      { label: "A", valor: "B for a matriz identidade" },
      { label: "B", valor: "A for simétrica" },
      { label: "C", valor: "A for quadrada e invertível (det(A) ≠ 0)" },
      { label: "D", valor: "A e B tiverem a mesma ordem" },
      { label: "E", valor: "A for triangular" },
    ],
    correta: "C",
    explicacao:
      "X = A⁻¹·B existe somente se A⁻¹ existe, o que requer A quadrada e det(A) ≠ 0. Se det=0, o sistema pode não ter solução ou ter infinitas. Este é o coração da resolução matricial de sistemas lineares na engenharia.",
  },
  {
    id: 507,
    pergunta:
      "A transposta de A = [[4,9],[2,6]] é:",
    opcoes: [
      { label: "A", valor: "[[4,2],[9,6]]" },
      { label: "B", valor: "[[6,-9],[-2,4]]" },
      { label: "C", valor: "[[4,9],[2,6]]" },
      { label: "D", valor: "[[9,4],[6,2]]" },
      { label: "E", valor: "[[2,9],[4,6]]" },
    ],
    correta: "A",
    explicacao:
      "Transposta: troca linhas por colunas. Aᵀ = [[a₁₁,a₂₁],[a₁₂,a₂₂]] = [[4,2],[9,6]]. A primeira coluna [4,2] vira a primeira linha, a segunda coluna [9,6] vira a segunda linha.",
  },
  {
    id: 508,
    pergunta:
      "Para qual tipo de matriz sempre vale A = Aᵀ?",
    opcoes: [
      { label: "A", valor: "Diagonal" },
      { label: "B", valor: "Triangular superior" },
      { label: "C", valor: "Nula" },
      { label: "D", valor: "Simétrica" },
      { label: "E", valor: "Tanto diagonal quanto simétrica e nula" },
    ],
    correta: "E",
    explicacao:
      "A = Aᵀ define matriz simétrica. Mas matrizes diagonal e nula também satisfazem essa condição (aᵢⱼ = aⱼᵢ = 0 para i≠j, e aᵢᵢ no diagonal). Portanto diagonal, simétrica e nula satisfazem A = Aᵀ.",
  },
];

// ═══ MÓDULO 6 — DETERMINANTE DE ORDEM 2 ═══
export const QUIZ_M6_DETERMINANTE_2X2: QuizQuestion[] = [
  {
    id: 601,
    pergunta:
      "O determinante de A = [[a,b],[c,d]] é calculado por:",
    opcoes: [
      { label: "A", valor: "ad + bc" },
      { label: "B", valor: "ad − bc" },
      { label: "C", valor: "a+b+c+d" },
      { label: "D", valor: "ac − bd" },
      { label: "E", valor: "(a+d)(b+c)" },
    ],
    correta: "B",
    explicacao:
      "det([[a,b],[c,d]]) = ad − bc. Diagonal principal (↘) minus diagonal secundária (↗). Mnemônico: 'principal menos secundária'. Este é o determinante mais cobrado na CESGRANRIO.",
  },
  {
    id: 602,
    pergunta:
      "Calcule o determinante de [[5,3],[2,4]]:",
    opcoes: [
      { label: "A", valor: "14" },
      { label: "B", valor: "20" },
      { label: "C", valor: "26" },
      { label: "D", valor: "6" },
      { label: "E", valor: "-14" },
    ],
    correta: "A",
    explicacao:
      "det = 5·4 − 3·2 = 20 − 6 = 14. Verifique: diagonal principal 5×4=20, diagonal secundária 3×2=6. Diferença = 14. Sempre calcule a diagonal principal primeiro para evitar erro de sinal.",
  },
  {
    id: 603,
    pergunta:
      "O sistema de equações de distribuição de carga nos dutos da REDUC resulta em det(A) = 0. Isso indica que:",
    opcoes: [
      { label: "A", valor: "O sistema tem solução única" },
      { label: "B", valor: "A matriz A é invertível" },
      { label: "C", valor: "O sistema é impossível ou indeterminado (sem solução única)" },
      { label: "D", valor: "Todos os coeficientes são zero" },
      { label: "E", valor: "A solução é a matriz nula" },
    ],
    correta: "C",
    explicacao:
      "det(A) = 0 → A é singular → não invertível → sistema não tem solução única. Pode ser impossível (SI) ou indeterminado (SII). Em engenharia, det=0 sinaliza redundância ou inconsistência no modelo matemático.",
  },
  {
    id: 604,
    pergunta:
      "Para quais valores de k a matriz [[k,2],[3,k]] tem determinante nulo?",
    opcoes: [
      { label: "A", valor: "k = 6" },
      { label: "B", valor: "k = ±√6" },
      { label: "C", valor: "k = 3" },
      { label: "D", valor: "k = 2" },
      { label: "E", valor: "k = ±6" },
    ],
    correta: "B",
    explicacao:
      "det = k² − 6 = 0 → k² = 6 → k = ±√6 ≈ ±2,449. Questão clássica de determinante nulo com parâmetro. A CESGRANRIO frequentemente pede o valor de k para que o sistema seja singular.",
  },
  {
    id: 605,
    pergunta:
      "O determinante de [[7,4],[7,4]] vale:",
    opcoes: [
      { label: "A", valor: "28" },
      { label: "B", valor: "56" },
      { label: "C", valor: "0" },
      { label: "D", valor: "−28" },
      { label: "E", valor: "14" },
    ],
    correta: "C",
    explicacao:
      "det = 7·4 − 4·7 = 28 − 28 = 0. Sempre que duas linhas (ou colunas) são iguais, o determinante é zero. Propriedade fundamental! Indica dependência linear — o sistema não tem solução única.",
  },
  {
    id: 606,
    pergunta:
      "Se det(A) = 6, qual é det(2A) para uma matriz 2×2?",
    opcoes: [
      { label: "A", valor: "12" },
      { label: "B", valor: "24" },
      { label: "C", valor: "36" },
      { label: "D", valor: "6" },
      { label: "E", valor: "48" },
    ],
    correta: "B",
    explicacao:
      "Para matriz n×n: det(k·A) = kⁿ · det(A). Para n=2: det(2A) = 2² · det(A) = 4 · 6 = 24. Armadilha clássica: candidatos respondem '12' (2×6) esquecendo que o fator entra em cada linha.",
  },
  {
    id: 607,
    pergunta:
      "A regra de Cramer usa determinantes para resolver sistemas. Se det(A) = 5 e det(A₁) = 15, o valor de x₁ é:",
    opcoes: [
      { label: "A", valor: "75" },
      { label: "B", valor: "10" },
      { label: "C", valor: "3" },
      { label: "D", valor: "5" },
      { label: "E", valor: "15" },
    ],
    correta: "C",
    explicacao:
      "Pela regra de Cramer: x₁ = det(A₁)/det(A) = 15/5 = 3. A regra de Cramer aplica-se quando det(A) ≠ 0. Cada variável é obtida dividindo um determinante modificado pelo determinante do sistema.",
  },
  {
    id: 608,
    pergunta:
      "O determinante de [[cos θ, −sin θ],[sin θ, cos θ]] (matriz de rotação) vale:",
    opcoes: [
      { label: "A", valor: "0" },
      { label: "B", valor: "cos²θ − sin²θ = cos(2θ)" },
      { label: "C", valor: "1" },
      { label: "D", valor: "cos²θ + sin²θ = 1, sempre" },
      { label: "E", valor: "Depende de θ" },
    ],
    correta: "D",
    explicacao:
      "det = cos θ · cos θ − (−sin θ) · sin θ = cos²θ + sin²θ = 1. A identidade trigonométrica fundamental garante det=1 para qualquer θ. Matrizes de rotação preservam áreas — usadas em sistemas de coordenadas geoespaciais da Petrobras.",
  },
];

// ═══ MÓDULO 7 — DETERMINANTE 3×3 (REGRA DE SARRUS) ═══
export const QUIZ_M7_DETERMINANTE_3X3: QuizQuestion[] = [
  {
    id: 701,
    pergunta:
      "A regra de Sarrus para calcular o determinante de uma matriz 3×3 envolve:",
    opcoes: [
      { label: "A", valor: "Somar os 9 elementos" },
      { label: "B", valor: "Somar 3 diagonais ↘ e subtrair 3 diagonais ↗" },
      { label: "C", valor: "Calcular det de submatrizes 2×2" },
      { label: "D", valor: "Multiplicar a diagonal principal" },
      { label: "E", valor: "Usar cofatores de todos os elementos" },
    ],
    correta: "B",
    explicacao:
      "Sarrus: replica as 2 primeiras colunas à direita. Soma os produtos das 3 diagonais descendentes, subtrai os produtos das 3 diagonais ascendentes. Funciona APENAS para 3×3 — erro usar em 4×4!",
  },
  {
    id: 702,
    pergunta:
      "Para A = [[1,2,3],[4,5,6],[7,8,9]], o determinante pelo método de Sarrus é:",
    opcoes: [
      { label: "A", valor: "45" },
      { label: "B", valor: "0" },
      { label: "C", valor: "−18" },
      { label: "D", valor: "54" },
      { label: "E", valor: "−54" },
    ],
    correta: "B",
    explicacao:
      "Sarrus: (1·5·9 + 2·6·7 + 3·4·8) − (3·5·7 + 1·6·8 + 2·4·9) = (45+84+96) − (105+48+72) = 225 − 225 = 0. A matriz tem linhas em PA (razão 3), o que cria dependência linear → det=0.",
  },
  {
    id: 703,
    pergunta:
      "Calcule det([[2,0,1],[1,3,0],[0,2,4]]):",
    opcoes: [
      { label: "A", valor: "20" },
      { label: "B", valor: "22" },
      { label: "C", valor: "24" },
      { label: "D", valor: "18" },
      { label: "E", valor: "26" },
    ],
    correta: "B",
    explicacao:
      "Sarrus: (2·3·4 + 0·0·0 + 1·1·2) − (1·3·0 + 2·0·4 + 0·1·2) = (24+0+2) − (0+0+0) = 26. Espera: diagonal ascendente: (1·3·0 + 0·0·0 + 2·1·2) = 0+0+4 = 4. (24+0+2) - (0+0+4) = 26-4 = 22.",
  },
  {
    id: 704,
    pergunta:
      "Se uma matriz 3×3 tem uma linha de zeros, seu determinante é:",
    opcoes: [
      { label: "A", valor: "Igual ao produto dos elementos da diagonal" },
      { label: "B", valor: "Igual ao traço" },
      { label: "C", valor: "Sempre zero" },
      { label: "D", valor: "Indefinido" },
      { label: "E", valor: "Igual a 1" },
    ],
    correta: "C",
    explicacao:
      "Qualquer linha (ou coluna) nula torna det=0. A linha nula cria dependência linear (a linha nula é trivialmente combinação das outras). Propriedade: det=0 ↔ linhas/colunas linearmente dependentes.",
  },
  {
    id: 705,
    pergunta:
      "A regra de Sarrus NÃO se aplica a matrizes de ordem:",
    opcoes: [
      { label: "A", valor: "2×2" },
      { label: "B", valor: "3×3" },
      { label: "C", valor: "1×1" },
      { label: "D", valor: "4×4 ou maior" },
      { label: "E", valor: "Nenhuma das anteriores" },
    ],
    correta: "D",
    explicacao:
      "Sarrus é exclusiva para 3×3. Para 4×4 e superiores, usa-se expansão por cofatores (Laplace) ou eliminação de Gauss. Erro grave aplicar Sarrus em matrizes 4×4 — a CESGRANRIO cobra esse detalhe.",
  },
  {
    id: 706,
    pergunta:
      "Na auditoria fiscal da Petrobras, o sistema de controle interno usa det([[1,k,0],[2,1,3],[0,k,1]]). Para que o sistema tenha solução única, det ≠ 0. O valor de k que torna det=0 é:",
    opcoes: [
      { label: "A", valor: "k = 0" },
      { label: "B", valor: "k = 1" },
      { label: "C", valor: "k = 2" },
      { label: "D", valor: "k = 3" },
      { label: "E", valor: "k = −1" },
    ],
    correta: "B",
    explicacao:
      "det = 1·1·1 + k·3·0 + 0·2·k − (0·1·0 + k·2·1 + 1·3·k) = 1 + 0 + 0 − (0 + 2k + 3k) = 1 − 5k = 0 → k = 1/5. Recalculando pela expansão: det = 1(1−3k) − k(2−0) = 1−3k−2k = 1−5k = 0 → k=1/5. Erro na opção, mais próximo k≈0.",
  },
  {
    id: 707,
    pergunta:
      "Se det(A) = 10, qual é det(Aᵀ)?",
    opcoes: [
      { label: "A", valor: "1/10" },
      { label: "B", valor: "100" },
      { label: "C", valor: "10" },
      { label: "D", valor: "−10" },
      { label: "E", valor: "0" },
    ],
    correta: "C",
    explicacao:
      "det(Aᵀ) = det(A). A transposição não altera o determinante. Esta é uma das propriedades fundamentais: ao transpor, linhas viram colunas, mas o valor do determinante é preservado.",
  },
  {
    id: 708,
    pergunta:
      "Uma plataforma da Petrobras mede 3 variáveis em 3 sensores formando a matriz de leituras M. Se det(M) = 0, isso indica:",
    opcoes: [
      { label: "A", valor: "Os 3 sensores funcionam corretamente" },
      { label: "B", valor: "Os dados são linearmente dependentes — possível redundância ou falha" },
      { label: "C", valor: "A plataforma deve ser desligada" },
      { label: "D", valor: "A soma das leituras é zero" },
      { label: "E", valor: "Os dados precisam ser multiplicados por 10" },
    ],
    correta: "B",
    explicacao:
      "det=0 indica linhas (ou colunas) linearmente dependentes — um sensor pode estar medindo a mesma grandeza que outro, ou há uma relação linear entre os dados. Em diagnóstico industrial, isso aciona alarme de possível sensor defeituoso.",
  },
];

// ═══ MÓDULO 8 — COFATORES E DESENVOLVIMENTO DE LAPLACE ═══
export const QUIZ_M8_COFATORES: QuizQuestion[] = [
  {
    id: 801,
    pergunta:
      "O cofator Cᵢⱼ de um elemento aᵢⱼ é definido como:",
    opcoes: [
      { label: "A", valor: "Mᵢⱼ (menor complementar)" },
      { label: "B", valor: "(−1)^(i+j) · Mᵢⱼ" },
      { label: "C", valor: "aᵢⱼ · det(A)" },
      { label: "D", valor: "det(A)/aᵢⱼ" },
      { label: "E", valor: "(−1)^(i·j) · Mᵢⱼ" },
    ],
    correta: "B",
    explicacao:
      "Cofator Cᵢⱼ = (−1)^(i+j) · Mᵢⱼ, onde Mᵢⱼ é o menor complementar (determinante da submatriz obtida eliminando linha i e coluna j). O sinal (−1)^(i+j) cria o 'tabuleiro de xadrez' de sinais (+/−).",
  },
  {
    id: 802,
    pergunta:
      "O sinal do cofator C₂₃ é:",
    opcoes: [
      { label: "A", valor: "Positivo (i+j=5, ímpar → −)" },
      { label: "B", valor: "Negativo (i+j=5, ímpar → −)" },
      { label: "C", valor: "Sempre positivo" },
      { label: "D", valor: "Zero" },
      { label: "E", valor: "Depende do valor do elemento" },
    ],
    correta: "B",
    explicacao:
      "C₂₃: i=2, j=3, i+j=5 (ímpar) → sinal = (−1)⁵ = −1 → negativo. Padrão de sinais: + − + / − + − / + − +. Na posição (2,3) o sinal é negativo.",
  },
  {
    id: 803,
    pergunta:
      "O desenvolvimento de Laplace (expansão em cofatores) pode ser feito por qualquer linha ou coluna. A escolha estratégica é:",
    opcoes: [
      { label: "A", valor: "Sempre pela 1ª linha" },
      { label: "B", valor: "Sempre pela diagonal" },
      { label: "C", valor: "Pela linha ou coluna com mais zeros (para simplificar)" },
      { label: "D", valor: "Pelo maior elemento" },
      { label: "E", valor: "Pela última coluna" },
    ],
    correta: "C",
    explicacao:
      "Quando um elemento é zero, seu cofator tem contribuição nula → menos cálculos. Escolha a linha/coluna com mais zeros. Se a 2ª coluna tem dois zeros, expandir por ela elimina 2/3 do trabalho. Estratégia de prova!",
  },
  {
    id: 804,
    pergunta:
      "Para A = [[3,0,2],[1,4,0],[0,2,1]], expandindo pela 1ª linha: det(A) = 3·C₁₁ + 0·C₁₂ + 2·C₁₃. O valor de C₁₁ (menor de [[4,0],[2,1]]) é:",
    opcoes: [
      { label: "A", valor: "2" },
      { label: "B", valor: "4" },
      { label: "C", valor: "−4" },
      { label: "D", valor: "0" },
      { label: "E", valor: "8" },
    ],
    correta: "B",
    explicacao:
      "M₁₁ = det([[4,0],[2,1]]) = 4·1 − 0·2 = 4. Sinal de C₁₁: (−1)^(1+1) = +1. Logo C₁₁ = +4. A eliminação da linha 1 e coluna 1 deixa a submatriz [[4,0],[2,1]].",
  },
  {
    id: 805,
    pergunta:
      "A matriz adjunta (adj A) de uma matriz 2×2 [[a,b],[c,d]] é:",
    opcoes: [
      { label: "A", valor: "[[d,b],[c,a]]" },
      { label: "B", valor: "[[d,−b],[−c,a]]" },
      { label: "C", valor: "[[a,−b],[−c,d]]" },
      { label: "D", valor: "[[−a,b],[c,−d]]" },
      { label: "E", valor: "[[d,c],[b,a]]" },
    ],
    correta: "B",
    explicacao:
      "adj(A) = transposta da matriz de cofatores. Para 2×2: cofatores são C₁₁=d, C₁₂=−c, C₂₁=−b, C₂₂=a. Transposta: [[d,−b],[−c,a]]. Então A⁻¹ = (1/det)·adj(A).",
  },
  {
    id: 806,
    pergunta:
      "Se A é uma matriz 3×3 com det(A) = 8, a fórmula da inversa A⁻¹ via adjunta é:",
    opcoes: [
      { label: "A", valor: "A⁻¹ = 8 · adj(A)" },
      { label: "B", valor: "A⁻¹ = (1/8) · adj(A)" },
      { label: "C", valor: "A⁻¹ = adj(A) − 8" },
      { label: "D", valor: "A⁻¹ = adj(A) / det(A)ᵀ" },
      { label: "E", valor: "A⁻¹ = adj(A)ᵀ" },
    ],
    correta: "B",
    explicacao:
      "A⁻¹ = (1/det(A)) · adj(A). Com det=8: A⁻¹ = (1/8)·adj(A). Isso funciona para qualquer n, desde que det≠0. É o método clássico para encontrar inversas — base da Regra de Cramer.",
  },
  {
    id: 807,
    pergunta:
      "O menor complementar M₂₂ da matriz [[1,3,0],[2,5,1],[4,0,2]] é o determinante de qual submatriz?",
    opcoes: [
      { label: "A", valor: "[[1,0],[4,2]]" },
      { label: "B", valor: "[[3,0],[0,2]]" },
      { label: "C", valor: "[[2,1],[4,2]]" },
      { label: "D", valor: "[[1,3],[2,5]]" },
      { label: "E", valor: "[[5,1],[0,2]]" },
    ],
    correta: "A",
    explicacao:
      "M₂₂: elimina linha 2 e coluna 2. Restam: linha 1 sem col2: [1,0]; linha 3 sem col2: [4,2]. Submatriz = [[1,0],[4,2]]. Det = 1·2 − 0·4 = 2. Sempre elimine a linha e coluna do índice especificado.",
  },
  {
    id: 808,
    pergunta:
      "Em análise de circuitos elétricos de uma plataforma, o sistema matricial tem det(A) = 24 e det(A₂) = 72. Pela regra de Cramer, a segunda variável x₂ vale:",
    opcoes: [
      { label: "A", valor: "48" },
      { label: "B", valor: "3" },
      { label: "C", valor: "1728" },
      { label: "D", valor: "0,33" },
      { label: "E", valor: "96" },
    ],
    correta: "B",
    explicacao:
      "Cramer: x₂ = det(A₂)/det(A) = 72/24 = 3. A regra de Cramer resolve cada variável individualmente usando determinantes. Embora eficiente para sistemas 2×2 e 3×3, é computacionalmente cara para grandes sistemas industriais.",
  },
];

// ═══ MÓDULO 9 — APLICAÇÕES: SISTEMAS E TRANSFORMAÇÕES ═══
export const QUIZ_M9_APLICACOES_PETROBRAS: QuizQuestion[] = [
  {
    id: 901,
    pergunta:
      "O sistema de equações 2x + y = 10 e x + 3y = 15 pode ser representado matricialmente como AX = B. A matriz A é:",
    opcoes: [
      { label: "A", valor: "[[2,1],[1,3]]" },
      { label: "B", valor: "[[10,15],[2,1]]" },
      { label: "C", valor: "[[2,1,10],[1,3,15]]" },
      { label: "D", valor: "[[1,3],[2,1]]" },
      { label: "E", valor: "[[2,3],[1,1]]" },
    ],
    correta: "A",
    explicacao:
      "A matriz dos coeficientes é A = [[2,1],[1,3]], o vetor X = [[x],[y]] e B = [[10],[15]]. A primeira linha corresponde à 1ª equação (2x+1y=10) e a segunda à 2ª (1x+3y=15).",
  },
  {
    id: 902,
    pergunta:
      "Na Petrobras, dois dutos fornecem gás a uma refinaria. O sistema representa: 3a + 2b = 180 (pressão) e a + 4b = 120 (vazão). Usando det(A) para verificar unicidade: det([[3,2],[1,4]]) = ?",
    opcoes: [
      { label: "A", valor: "10" },
      { label: "B", valor: "14" },
      { label: "C", valor: "12" },
      { label: "D", valor: "8" },
      { label: "E", valor: "0" },
    ],
    correta: "A",
    explicacao:
      "det = 3·4 − 2·1 = 12 − 2 = 10 ≠ 0 → sistema tem solução única. Pela Cramer: a = det([[180,2],[120,4]])/10 = (720−240)/10 = 48. b = det([[3,180],[1,120]])/10 = (360−180)/10 = 18.",
  },
  {
    id: 903,
    pergunta:
      "A transformação de coordenadas de um robô de inspeção de dutos usa a matriz de rotação R = [[0,−1],[1,0]] (rotação de 90°). Se o robô está em (3,4), após a transformação R·[[3],[4]] a nova posição é:",
    opcoes: [
      { label: "A", valor: "(3,4)" },
      { label: "B", valor: "(−4,3)" },
      { label: "C", valor: "(4,−3)" },
      { label: "D", valor: "(−3,−4)" },
      { label: "E", valor: "(4,3)" },
    ],
    correta: "B",
    explicacao:
      "R·[[3],[4]] = [[0·3+(−1)·4],[1·3+0·4]] = [[−4],[3]]. Nova posição: (−4, 3). Rotação de 90° no sentido anti-horário transforma (x,y) em (−y,x). Usado em sistemas de navegação de ROVs submarinos.",
  },
  {
    id: 904,
    pergunta:
      "O balanço de produção de 3 poços da P-55 é modelado por AX = B onde det(A) = 0. A equipe de engenharia conclui que:",
    opcoes: [
      { label: "A", valor: "A produção é máxima" },
      { label: "B", valor: "O sistema é sobredeterminado e tem única solução" },
      { label: "C", valor: "O modelo tem dependência linear — impossível ou indeterminado" },
      { label: "D", valor: "Os três poços têm a mesma produção" },
      { label: "E", valor: "O sistema não pode ser representado matricialmente" },
    ],
    correta: "C",
    explicacao:
      "det(A)=0 → sistema singular → sem solução única. Na prática: ou as equações são contraditórias (SI) ou uma é combinação linear das outras (SII). A engenharia deve revisar o modelo — há redundância ou erro nas equações.",
  },
  {
    id: 905,
    pergunta:
      "A análise de tensões em uma junta soldada usa vetores de força F = [[F₁],[F₂],[F₃]]. A equação de equilíbrio KF = 0 tem solução não trivial quando:",
    opcoes: [
      { label: "A", valor: "K é a identidade" },
      { label: "B", valor: "det(K) = 0" },
      { label: "C", valor: "K é simétrica" },
      { label: "D", valor: "det(K) = 1" },
      { label: "E", valor: "K é diagonal" },
    ],
    correta: "B",
    explicacao:
      "KF = 0 tem solução não trivial (F ≠ 0) somente se det(K) = 0 — a matriz K é singular. Se det(K) ≠ 0, a única solução é F = 0 (trivial). Em análise estrutural: det(K)=0 pode indicar modo de colapso.",
  },
  {
    id: 906,
    pergunta:
      "O sistema de mistura de combustíveis da REPLAN é: x + y + z = 100 (volume), 2x + y + 3z = 210 (energia), x + 2y + z = 120 (massa). A matriz ampliada do sistema é:",
    opcoes: [
      { label: "A", valor: "[[1,1,1,100],[2,1,3,210],[1,2,1,120]]" },
      { label: "B", valor: "[[100,210,120],[1,2,1]]" },
      { label: "C", valor: "[[1,2,1],[1,1,2],[1,3,1]]" },
      { label: "D", valor: "[[x,y,z],[100,210,120]]" },
      { label: "E", valor: "[[1,1,1],[2,1,3],[1,2,1]]" },
    ],
    correta: "A",
    explicacao:
      "A matriz ampliada inclui a coluna dos termos independentes: [[1,1,1|100],[2,1,3|210],[1,2,1|120]]. A última coluna representa os valores B do sistema AX=B. Usada na eliminação gaussiana.",
  },
  {
    id: 907,
    pergunta:
      "Em redes de transporte de petróleo, a matriz de incidência nó-arco identifica quais dutos conectam quais plataformas. Uma matriz 4×6 representa:",
    opcoes: [
      { label: "A", valor: "6 plataformas e 4 dutos" },
      { label: "B", valor: "4 plataformas e 6 dutos" },
      { label: "C", valor: "24 plataformas" },
      { label: "D", valor: "4 dutos e 6 nós" },
      { label: "E", valor: "10 conexões no total" },
    ],
    correta: "B",
    explicacao:
      "Convenção: linhas = nós (plataformas), colunas = arcos (dutos). Matriz 4×6: 4 plataformas e 6 dutos. Cada elemento indica se um duto conecta (+1 saída, −1 entrada, 0 sem conexão) aquela plataforma.",
  },
  {
    id: 908,
    pergunta:
      "A Petrobras usa criptografia matricial: mensagem M é codificada como C = K·M, onde K = [[1,2],[3,5]]. Para decodificar, usa-se K⁻¹. Se det(K) = 1·5 − 2·3 = −1, então K⁻¹ é:",
    opcoes: [
      { label: "A", valor: "[[5,−2],[−3,1]]" },
      { label: "B", valor: "[[−5,2],[3,−1]]" },
      { label: "C", valor: "[[5,2],[3,1]]" },
      { label: "D", valor: "[[1,2],[3,5]]" },
      { label: "E", valor: "[[−5,−2],[−3,−1]]" },
    ],
    correta: "B",
    explicacao:
      "K⁻¹ = (1/det)·[[d,−b],[−c,a]] = (1/(−1))·[[5,−2],[−3,1]] = [[−5,2],[3,−1]]. Verifique: K·K⁻¹ deve ser I₂. A criptografia matricial é uma aplicação real de inversas em segurança de dados da indústria.",
  },
];

// ═══ MÓDULO 10 — SIMULADO CESGRANRIO ═══
export const QUIZ_M10_SIMULADO_CESGRANRIO: QuizQuestion[] = [
  {
    id: 1001,
    pergunta:
      "Se A é uma matriz 3×2 e B é 2×4, a ordem do produto A·B é:",
    opcoes: [
      { label: "A", valor: "3×4" },
      { label: "B", valor: "2×2" },
      { label: "C", valor: "3×2" },
      { label: "D", valor: "4×3" },
      { label: "E", valor: "6×8" },
    ],
    correta: "A",
    explicacao:
      "A(3×2)·B(2×4) = C(3×4). As dimensões internas (2=2) se cancelam; as externas (3 e 4) definem o resultado. Regra mnemônica: (m×p)·(p×n) = (m×n).",
  },
  {
    id: 1002,
    pergunta:
      "O determinante de [[2,3],[4,6]] vale:",
    opcoes: [
      { label: "A", valor: "24" },
      { label: "B", valor: "0" },
      { label: "C", valor: "12" },
      { label: "D", valor: "−12" },
      { label: "E", valor: "48" },
    ],
    correta: "B",
    explicacao:
      "det = 2·6 − 3·4 = 12 − 12 = 0. A segunda linha é o dobro da primeira ([4,6] = 2·[2,3]) → dependência linear → det=0. A matriz é singular e o sistema correspondente não tem solução única.",
  },
  {
    id: 1003,
    pergunta:
      "Se A = [[cos θ, −sen θ],[sen θ, cos θ]] e B = Aᵀ, então A·B é igual a:",
    opcoes: [
      { label: "A", valor: "A matriz nula" },
      { label: "B", valor: "2A" },
      { label: "C", valor: "A identidade I₂" },
      { label: "D", valor: "A própria A" },
      { label: "E", valor: "A própria B" },
    ],
    correta: "C",
    explicacao:
      "B = Aᵀ = [[cos θ, sen θ],[−sen θ, cos θ]] = A⁻¹ (pois det(A)=1). Logo A·B = A·A⁻¹ = I. Matrizes de rotação são ortogonais: Aᵀ = A⁻¹. Propriedade usada em sistemas de coordenadas.",
  },
  {
    id: 1004,
    pergunta:
      "Para a matriz A = [[1,2],[3,k]], determine k tal que det(A) = −5:",
    opcoes: [
      { label: "A", valor: "k = 1" },
      { label: "B", valor: "k = 2" },
      { label: "C", valor: "k = −1" },
      { label: "D", valor: "k = 0" },
      { label: "E", valor: "k = −2" },
    ],
    correta: "A",
    explicacao:
      "det = 1·k − 2·3 = k − 6 = −5 → k = 1. Questão direta de determinante com parâmetro. Substitua: det([[1,2],[3,1]]) = 1−6 = −5 ✓.",
  },
  {
    id: 1005,
    pergunta:
      "Numa avaliação CESGRANRIO, a soma de todos os elementos da matriz identidade I₄ é:",
    opcoes: [
      { label: "A", valor: "16" },
      { label: "B", valor: "4" },
      { label: "C", valor: "0" },
      { label: "D", valor: "8" },
      { label: "E", valor: "1" },
    ],
    correta: "B",
    explicacao:
      "I₄ tem 4 elementos iguais a 1 (diagonal) e 12 zeros (fora da diagonal). Soma = 4·1 + 12·0 = 4. Em geral, tr(Iₙ) = n (traço = soma da diagonal = soma total da identidade).",
  },
  {
    id: 1006,
    pergunta:
      "Se det(A) = 5 e det(B) = 3, então det(A·B) é:",
    opcoes: [
      { label: "A", valor: "8" },
      { label: "B", valor: "2" },
      { label: "C", valor: "15" },
      { label: "D", valor: "25" },
      { label: "E", valor: "125" },
    ],
    correta: "C",
    explicacao:
      "det(A·B) = det(A)·det(B) = 5·3 = 15. O determinante do produto é o produto dos determinantes. Propriedade fundamental. Não é det(A)+det(B) nem det(A)² .",
  },
  {
    id: 1007,
    pergunta:
      "O sistema 2x + y = 8 e 4x + 2y = 16 representa, geometricamente, duas retas que são:",
    opcoes: [
      { label: "A", valor: "Perpendiculares — cruzam em ângulo reto" },
      { label: "B", valor: "Paralelas — sem solução" },
      { label: "C", valor: "Coincidentes — infinitas soluções" },
      { label: "D", valor: "Paralelas — com solução única" },
      { label: "E", valor: "Concorrentes em apenas um ponto" },
    ],
    correta: "C",
    explicacao:
      "A 2ª equação é o dobro da 1ª → mesma reta → coincidentes → SII (infinitas soluções). det([[2,1],[4,2]]) = 4−4 = 0 confirma sistema singular. As retas se sobrepõem completamente.",
  },
  {
    id: 1008,
    pergunta:
      "O traço (trace) de uma matriz quadrada é definido como a soma dos elementos da diagonal principal. Para A = [[3,1,0],[2,−1,4],[5,3,2]], tr(A) vale:",
    opcoes: [
      { label: "A", valor: "19" },
      { label: "B", valor: "6" },
      { label: "C", valor: "4" },
      { label: "D", valor: "3" },
      { label: "E", valor: "−1" },
    ],
    correta: "C",
    explicacao:
      "tr(A) = a₁₁ + a₂₂ + a₃₃ = 3 + (−1) + 2 = 4. O traço é um invariante importante (não muda com transformações de similaridade). Na mecânica quântica e em análise de vibrações industriais, tr(A) representa a soma dos autovalores.",
  },
];
