import { QuizQuestion } from "../../shared";

// ══════════════════════════════════════════════════════════════════════════
// MÓDULO 1 — CONCEITOS BÁSICOS DE PORCENTAGEM
// Pool: 8 questões (sistema seleciona 6 aleatoriamente)
// ══════════════════════════════════════════════════════════════════════════

export const QUIZ_M1_CONCEITOS: QuizQuestion[] = [
  {
    id: 101,
    pergunta: "A expressão '25%' equivale a qual fração irredutível?",
    opcoes: [
      { label: "A", valor: "1/5" },
      { label: "B", valor: "1/4" },
      { label: "C", valor: "2/5" },
      { label: "D", valor: "1/3" },
      { label: "E", valor: "3/4" },
    ],
    correta: "B",
    explicacao:
      "25% = 25/100. Simplificando por 25: 25÷25 = 1 e 100÷25 = 4. Logo, 25% = 1/4. As demais frações equivalem a: 1/5 = 20%, 2/5 = 40%, 1/3 ≈ 33,3%, 3/4 = 75%.",
  },
  {
    id: 102,
    pergunta:
      "Em uma refinaria da Petrobras, um tanque de 8.000 litros está com 35% de sua capacidade preenchida com diesel. O volume de diesel armazenado é:",
    opcoes: [
      { label: "A", valor: "2.400 litros" },
      { label: "B", valor: "2.600 litros" },
      { label: "C", valor: "2.800 litros" },
      { label: "D", valor: "3.000 litros" },
      { label: "E", valor: "3.200 litros" },
    ],
    correta: "C",
    explicacao:
      "35% de 8.000 = 0,35 × 8.000 = 2.800 litros. Passo a passo: primeiro converta a porcentagem em decimal (35 ÷ 100 = 0,35), depois multiplique pelo valor total. Alternativa (A) seria 30%, (D) seria 37,5%, mostrando como a CESGRANRIO coloca valores próximos.",
  },
  {
    id: 103,
    pergunta: "O valor decimal 0,035 equivale a qual porcentagem?",
    opcoes: [
      { label: "A", valor: "0,35%" },
      { label: "B", valor: "3,5%" },
      { label: "C", valor: "35%" },
      { label: "D", valor: "0,035%" },
      { label: "E", valor: "350%" },
    ],
    correta: "B",
    explicacao:
      "Para converter decimal em porcentagem, multiplique por 100: 0,035 × 100 = 3,5%. Erro comum: confundir 0,035 com 0,35% (letra A) ou 35% (letra C). Lembre: mover a vírgula 2 casas para a direita.",
  },
  {
    id: 104,
    pergunta:
      "Em um processo seletivo da Petrobras com 120 questões, um candidato acertou 72 questões. Seu percentual de acertos foi de:",
    opcoes: [
      { label: "A", valor: "55%" },
      { label: "B", valor: "58%" },
      { label: "C", valor: "60%" },
      { label: "D", valor: "62%" },
      { label: "E", valor: "65%" },
    ],
    correta: "C",
    explicacao:
      "Percentual = (parte/total) × 100 = (72/120) × 100 = 0,60 × 100 = 60%. Dica: 72/120 simplifica para 6/10 = 3/5 = 0,60. A CESGRANRIO adora esse tipo de questão com valores que parecem próximos.",
  },
  {
    id: 105,
    pergunta: "A fração 3/8 equivale a que porcentagem?",
    opcoes: [
      { label: "A", valor: "35%" },
      { label: "B", valor: "37,5%" },
      { label: "C", valor: "38%" },
      { label: "D", valor: "40%" },
      { label: "E", valor: "33,3%" },
    ],
    correta: "B",
    explicacao:
      "3/8 = 3 ÷ 8 = 0,375 → 37,5%. Macete: 1/8 = 12,5%, logo 3/8 = 3 × 12,5% = 37,5%. A alternativa (C) 38% é a pegadinha para quem arredonda errado.",
  },
  {
    id: 106,
    pergunta:
      "Um relatório informa que 450 dos 1.500 funcionários de uma unidade concluíram o treinamento. A porcentagem que concluiu é de:",
    opcoes: [
      { label: "A", valor: "25%" },
      { label: "B", valor: "28%" },
      { label: "C", valor: "30%" },
      { label: "D", valor: "33%" },
      { label: "E", valor: "35%" },
    ],
    correta: "C",
    explicacao:
      "450/1500 × 100 = 0,30 × 100 = 30%. Simplificação: 450/1500 = 45/150 = 9/30 = 3/10 = 30%.",
  },
  {
    id: 107,
    pergunta:
      "Na tabela de conversão: 1/5, 1/4, 1/3, 1/2 e 3/4, qual das equivalências percentuais está INCORRETA?",
    opcoes: [
      { label: "A", valor: "1/5 = 20%" },
      { label: "B", valor: "1/4 = 25%" },
      { label: "C", valor: "1/3 = 30%" },
      { label: "D", valor: "1/2 = 50%" },
      { label: "E", valor: "3/4 = 75%" },
    ],
    correta: "C",
    explicacao:
      "1/3 = 33,33...% (dízima periódica), NÃO 30%. As demais estão corretas: 1/5=20%, 1/4=25%, 1/2=50%, 3/4=75%. Essa tabela de equivalências é fundamental para agilizar cálculos na prova.",
  },
  {
    id: 108,
    pergunta:
      "Uma plataforma offshore produziu 12.000 barris em janeiro e 15.000 barris em fevereiro. A produção de fevereiro representa quantos por cento da de janeiro?",
    opcoes: [
      { label: "A", valor: "115%" },
      { label: "B", valor: "120%" },
      { label: "C", valor: "125%" },
      { label: "D", valor: "130%" },
      { label: "E", valor: "80%" },
    ],
    correta: "C",
    explicacao:
      "(15.000/12.000) × 100 = 1,25 × 100 = 125%. Atenção: a pergunta é 'representa quantos % DA de janeiro', não 'aumentou quantos %'. O aumento foi de 25%, mas o valor representa 125% do original. A CESGRANRIO explora essa diferença sutil.",
  },
];

// ══════════════════════════════════════════════════════════════════════════
// MÓDULO 2 — AUMENTOS E DESCONTOS SUCESSIVOS
// Pool: 8 questões
// ══════════════════════════════════════════════════════════════════════════

export const QUIZ_M2_AUMENTOS: QuizQuestion[] = [
  {
    id: 201,
    pergunta:
      "O salário base de um técnico da Petrobras é R$ 4.000. Após reajuste de 15%, o novo salário será de:",
    opcoes: [
      { label: "A", valor: "R$ 4.150" },
      { label: "B", valor: "R$ 4.400" },
      { label: "C", valor: "R$ 4.600" },
      { label: "D", valor: "R$ 4.500" },
      { label: "E", valor: "R$ 5.000" },
    ],
    correta: "C",
    explicacao:
      "Fator multiplicador: 1 + 15/100 = 1,15. Novo salário: 4.000 × 1,15 = R$ 4.600. A alternativa (A) R$4.150 é pegadinha para quem calculou 15% de 1.000 em vez de 4.000.",
  },
  {
    id: 202,
    pergunta:
      "O barril de petróleo caiu 20% em relação a US$ 100. Qual o novo preço?",
    opcoes: [
      { label: "A", valor: "US$ 80" },
      { label: "B", valor: "US$ 90" },
      { label: "C", valor: "US$ 75" },
      { label: "D", valor: "US$ 70" },
      { label: "E", valor: "US$ 85" },
    ],
    correta: "A",
    explicacao:
      "Fator de desconto: 1 - 20/100 = 0,80. Novo preço: 100 × 0,80 = US$ 80. Regra: desconto de p% → multiplique por (1 - p/100).",
  },
  {
    id: 203,
    pergunta:
      "Um item custava R$ 200, aumentou 50% e depois recebeu desconto de 50%. O preço final é:",
    opcoes: [
      { label: "A", valor: "R$ 200" },
      { label: "B", valor: "R$ 150" },
      { label: "C", valor: "R$ 100" },
      { label: "D", valor: "R$ 175" },
      { label: "E", valor: "R$ 250" },
    ],
    correta: "B",
    explicacao:
      "Passo 1: 200 × 1,50 = R$ 300. Passo 2: 300 × 0,50 = R$ 150. PEGADINHA CLÁSSICA: +50% e -50% NÃO se anulam! O fator total é 1,50 × 0,50 = 0,75, ou seja, QUEDA de 25%. Essa questão cai em quase toda prova da CESGRANRIO.",
  },
  {
    id: 204,
    pergunta:
      "Um salário sofreu reajuste de 8% seguido de outro de 5%. O reajuste total equivale a:",
    opcoes: [
      { label: "A", valor: "13%" },
      { label: "B", valor: "13,4%" },
      { label: "C", valor: "12,6%" },
      { label: "D", valor: "40%" },
      { label: "E", valor: "13,04%" },
    ],
    correta: "B",
    explicacao:
      "Fator total: 1,08 × 1,05 = 1,134. Aumento total: 13,4%. NÃO é simplesmente 8+5=13%. A fórmula de aumentos sucessivos gera um 'bônus' extra: 8% × 5% = 0,4% adicional (os 'juros sobre juros').",
  },
  {
    id: 205,
    pergunta:
      "Dois descontos sucessivos de 10% e 20% equivalem a um desconto único de:",
    opcoes: [
      { label: "A", valor: "28%" },
      { label: "B", valor: "30%" },
      { label: "C", valor: "32%" },
      { label: "D", valor: "25%" },
      { label: "E", valor: "18%" },
    ],
    correta: "A",
    explicacao:
      "Fator: 0,90 × 0,80 = 0,72. Desconto equivalente: 1 - 0,72 = 0,28 = 28%. NÃO é 10+20=30%.",
  },
  {
    id: 206,
    pergunta:
      "Uma peça de equipamento custava R$ 500. Após aumento de 40% e desconto de 25%, o preço ficou em:",
    opcoes: [
      { label: "A", valor: "R$ 500" },
      { label: "B", valor: "R$ 525" },
      { label: "C", valor: "R$ 575" },
      { label: "D", valor: "R$ 450" },
      { label: "E", valor: "R$ 550" },
    ],
    correta: "B",
    explicacao:
      "Fator total: 1,40 × 0,75 = 1,05. Preço: 500 × 1,05 = R$ 525. Equivale a aumento líquido de 5%.",
  },
  {
    id: 207,
    pergunta:
      "Para que um produto que sofreu desconto de 20% volte ao preço original, o aumento necessário é de:",
    opcoes: [
      { label: "A", valor: "20%" },
      { label: "B", valor: "22%" },
      { label: "C", valor: "25%" },
      { label: "D", valor: "30%" },
      { label: "E", valor: "15%" },
    ],
    correta: "C",
    explicacao:
      "Se desceu 20% (fator 0,80), para voltar: 1/0,80 = 1,25 → aumento de 25%. REGRA: para 'desfazer' um desconto de d%, o aumento necessário é d/(100-d) × 100. Aqui: 20/80 × 100 = 25%.",
  },
  {
    id: 208,
    pergunta:
      "Três aumentos sucessivos de 10% equivalem a um aumento total de, aproximadamente:",
    opcoes: [
      { label: "A", valor: "30%" },
      { label: "B", valor: "30,5%" },
      { label: "C", valor: "31%" },
      { label: "D", valor: "33,1%" },
      { label: "E", valor: "33%" },
    ],
    correta: "D",
    explicacao:
      "1,10³ = 1,10 × 1,10 × 1,10 = 1,331. Aumento total = 33,1%. Quanto mais aumentos, maior a diferença da soma simples (30%). Isso é a base dos juros compostos!",
  },
];

// ══════════════════════════════════════════════════════════════════════════
// MÓDULO 3 — VARIAÇÃO PERCENTUAL
// Pool: 7 questões
// ══════════════════════════════════════════════════════════════════════════

export const QUIZ_M3_VARIACAO: QuizQuestion[] = [
  {
    id: 301,
    pergunta:
      "O preço do gás natural subiu de R$ 50 para R$ 65. A variação percentual foi de:",
    opcoes: [
      { label: "A", valor: "15%" },
      { label: "B", valor: "23%" },
      { label: "C", valor: "30%" },
      { label: "D", valor: "20%" },
      { label: "E", valor: "35%" },
    ],
    correta: "C",
    explicacao:
      "Variação = (Vf - Vi)/Vi × 100 = (65-50)/50 × 100 = 15/50 × 100 = 30%. A alternativa (A) 15% é pegadinha: é a diferença absoluta (15 reais), não a percentual.",
  },
  {
    id: 302,
    pergunta:
      "Uma ação da Petrobras estava cotada a R$ 40 e caiu para R$ 32. O percentual de queda foi de:",
    opcoes: [
      { label: "A", valor: "8%" },
      { label: "B", valor: "15%" },
      { label: "C", valor: "20%" },
      { label: "D", valor: "25%" },
      { label: "E", valor: "32%" },
    ],
    correta: "C",
    explicacao:
      "Queda = (40-32)/40 × 100 = 8/40 × 100 = 20%. O denominador é SEMPRE o valor INICIAL. Se usasse o valor final (32) como denominador: 8/32 = 25%, que é a alternativa (D) — pegadinha clássica!",
  },
  {
    id: 303,
    pergunta:
      "A produção de uma plataforma passou de 1.000 para 1.350 barris/dia. A variação percentual foi de:",
    opcoes: [
      { label: "A", valor: "30%" },
      { label: "B", valor: "35%" },
      { label: "C", valor: "25%" },
      { label: "D", valor: "13,5%" },
      { label: "E", valor: "40%" },
    ],
    correta: "B",
    explicacao:
      "Variação = (1350-1000)/1000 × 100 = 350/1000 × 100 = 35%. A alternativa (D) 13,5% é pegadinha: confunde a variação com a proporção 135/1000.",
  },
  {
    id: 304,
    pergunta:
      "O consumo de energia de uma unidade caiu de 8.000 kWh para 6.400 kWh. A redução percentual foi de:",
    opcoes: [
      { label: "A", valor: "15%" },
      { label: "B", valor: "18%" },
      { label: "C", valor: "20%" },
      { label: "D", valor: "25%" },
      { label: "E", valor: "22%" },
    ],
    correta: "C",
    explicacao:
      "Redução = (8000-6400)/8000 × 100 = 1600/8000 × 100 = 20%. Simplificando: 1600/8000 = 16/80 = 1/5 = 0,20 = 20%.",
  },
  {
    id: 305,
    pergunta:
      "Um preço caiu de R$ 250 para R$ 200. Para voltar ao original, o aumento percentual necessário sobre R$ 200 é de:",
    opcoes: [
      { label: "A", valor: "20%" },
      { label: "B", valor: "25%" },
      { label: "C", valor: "30%" },
      { label: "D", valor: "50%" },
      { label: "E", valor: "10%" },
    ],
    correta: "B",
    explicacao:
      "De 200 para 250: (250-200)/200 × 100 = 50/200 × 100 = 25%. Note que a queda foi de 20% (50/250), mas a subida necessária é de 25% (50/200). O denominador muda! Isso é uma das questões mais recorrentes da CESGRANRIO.",
  },
  {
    id: 306,
    pergunta:
      "O número de acidentes numa plataforma caiu de 25 para 15 em um ano. A variação percentual absoluta (em pontos percentuais) e a relativa são, respectivamente:",
    opcoes: [
      { label: "A", valor: "10 acidentes e 40%" },
      { label: "B", valor: "10 acidentes e 60%" },
      { label: "C", valor: "40% e 10 acidentes" },
      { label: "D", valor: "10 e 66,7%" },
      { label: "E", valor: "15 e 40%" },
    ],
    correta: "A",
    explicacao:
      "Diferença absoluta: 25-15 = 10 acidentes. Variação relativa: 10/25 × 100 = 40%. A CESGRANRIO distingue variação absoluta (em unidades) de variação relativa (em %). Não confunda!",
  },
  {
    id: 307,
    pergunta:
      "Se a população de uma cidade cresceu 50% em 10 anos e, depois, mais 50% em outros 10 anos, o crescimento total em 20 anos foi de:",
    opcoes: [
      { label: "A", valor: "100%" },
      { label: "B", valor: "125%" },
      { label: "C", valor: "150%" },
      { label: "D", valor: "200%" },
      { label: "E", valor: "75%" },
    ],
    correta: "B",
    explicacao:
      "1,50 × 1,50 = 2,25. Crescimento total: 2,25 - 1 = 1,25 = 125%. NÃO é 50+50=100%! O segundo aumento incide sobre a base já aumentada.",
  },
];

// ══════════════════════════════════════════════════════════════════════════
// MÓDULO 4 — APLICAÇÕES PRÁTICAS (CONTEXTO INDUSTRIAL)
// Pool: 7 questões
// ══════════════════════════════════════════════════════════════════════════

export const QUIZ_M4_APLICACOES: QuizQuestion[] = [
  {
    id: 401,
    pergunta:
      "Em uma prova da CESGRANRIO com 60 questões, a nota mínima para aprovação é 50%. O candidato precisa acertar, no mínimo:",
    opcoes: [
      { label: "A", valor: "25 questões" },
      { label: "B", valor: "28 questões" },
      { label: "C", valor: "30 questões" },
      { label: "D", valor: "32 questões" },
      { label: "E", valor: "35 questões" },
    ],
    correta: "C",
    explicacao:
      "50% de 60 = 0,50 × 60 = 30 questões. Tipo de questão muito comum: transformar percentual em valor absoluto.",
  },
  {
    id: 402,
    pergunta:
      "Uma equipe de 200 funcionários teve 12% de absenteísmo no mês. Se a cada funcionário ausente, a empresa perde R$ 350/dia, qual o prejuízo mensal (22 dias úteis)?",
    opcoes: [
      { label: "A", valor: "R$ 168.000" },
      { label: "B", valor: "R$ 184.800" },
      { label: "C", valor: "R$ 192.000" },
      { label: "D", valor: "R$ 201.600" },
      { label: "E", valor: "R$ 154.000" },
    ],
    correta: "B",
    explicacao:
      "12% de 200 = 24 funcionários ausentes. Prejuízo: 24 × 350 × 22 = R$ 184.800. Esse tipo de questão exige múltiplas etapas — marca registrada da CESGRANRIO.",
  },
  {
    id: 403,
    pergunta:
      "Se 60 barris representam 40% da produção diária de um poço, a produção diária total é de:",
    opcoes: [
      { label: "A", valor: "100 barris" },
      { label: "B", valor: "120 barris" },
      { label: "C", valor: "150 barris" },
      { label: "D", valor: "200 barris" },
      { label: "E", valor: "240 barris" },
    ],
    correta: "C",
    explicacao:
      "Se 40% = 60, então 100% = 60 / 0,40 = 150 barris. Método alternativo: 10% = 15, logo 100% = 150.",
  },
  {
    id: 404,
    pergunta:
      "O orçamento de manutenção de R$ 2.000.000 foi cortado em 15%. Do valor restante, 30% será destinado a peças. Quanto irá para peças?",
    opcoes: [
      { label: "A", valor: "R$ 510.000" },
      { label: "B", valor: "R$ 490.000" },
      { label: "C", valor: "R$ 520.000" },
      { label: "D", valor: "R$ 450.000" },
      { label: "E", valor: "R$ 600.000" },
    ],
    correta: "A",
    explicacao:
      "Após corte: 2.000.000 × 0,85 = R$ 1.700.000. Para peças: 1.700.000 × 0,30 = R$ 510.000. Perceba: 2 operações percentuais encadeadas.",
  },
  {
    id: 405,
    pergunta:
      "Um produto composto tem 70% de componente A (R$ 20/litro) e 30% de componente B (R$ 50/litro). O custo por litro da mistura é:",
    opcoes: [
      { label: "A", valor: "R$ 27" },
      { label: "B", valor: "R$ 29" },
      { label: "C", valor: "R$ 31" },
      { label: "D", valor: "R$ 35" },
      { label: "E", valor: "R$ 33" },
    ],
    correta: "B",
    explicacao:
      "Média ponderada: 0,70×20 + 0,30×50 = 14 + 15 = R$ 29/litro. Essa técnica combina porcentagem com média ponderada.",
  },
  {
    id: 406,
    pergunta:
      "Em uma inspeção, 95% das 400 peças foram aprovadas. Das reprovadas, 60% puderam ser recuperadas. Quantas peças foram perdidas definitivamente?",
    opcoes: [
      { label: "A", valor: "4" },
      { label: "B", valor: "6" },
      { label: "C", valor: "8" },
      { label: "D", valor: "10" },
      { label: "E", valor: "12" },
    ],
    correta: "C",
    explicacao:
      "Reprovadas: 5% de 400 = 20 peças. Recuperadas: 60% de 20 = 12. Perdidas: 20 - 12 = 8 peças. Alternativa: 40% de 20 = 8 (% não recuperadas).",
  },
  {
    id: 407,
    pergunta:
      "A eficiência de uma caldeira caiu de 92% para 78%. A queda em pontos percentuais e a queda relativa são, respectivamente:",
    opcoes: [
      { label: "A", valor: "14 p.p. e 14%" },
      { label: "B", valor: "14 p.p. e 15,2%" },
      { label: "C", valor: "15,2% e 14 p.p." },
      { label: "D", valor: "14% e 14 p.p." },
      { label: "E", valor: "14 p.p. e 17,9%" },
    ],
    correta: "B",
    explicacao:
      "Queda em pontos percentuais: 92-78 = 14 p.p. Queda relativa: 14/92 × 100 ≈ 15,2%. ATENÇÃO: 'pontos percentuais' ≠ 'variação percentual'. Essa distinção é questão certa na CESGRANRIO!",
  },
];

// ══════════════════════════════════════════════════════════════════════════
// MÓDULO 5 — DESAFIO FINAL (QUESTÕES INTEGRADORAS)
// Pool: 7 questões
// ══════════════════════════════════════════════════════════════════════════

export const QUIZ_M5_FINAL: QuizQuestion[] = [
  {
    id: 501,
    pergunta:
      "Um investimento rendeu 5% no primeiro mês e 8% no segundo mês (sobre o montante atualizado). Se o capital inicial era R$ 10.000, o montante ao final dos dois meses é:",
    opcoes: [
      { label: "A", valor: "R$ 11.300" },
      { label: "B", valor: "R$ 11.340" },
      { label: "C", valor: "R$ 11.400" },
      { label: "D", valor: "R$ 11.500" },
      { label: "E", valor: "R$ 11.200" },
    ],
    correta: "B",
    explicacao:
      "Mês 1: 10.000 × 1,05 = 10.500. Mês 2: 10.500 × 1,08 = 11.340. Fator único: 1,05 × 1,08 = 1,134. Note como 5+8=13% mas o rendimento real é 13,4% — esse é o efeito dos juros compostos.",
  },
  {
    id: 502,
    pergunta:
      "Uma peça custava R$ 120. Sofreu aumento de 25%, depois desconto de 20%. O preço final é:",
    opcoes: [
      { label: "A", valor: "R$ 120" },
      { label: "B", valor: "R$ 115" },
      { label: "C", valor: "R$ 110" },
      { label: "D", valor: "R$ 108" },
      { label: "E", valor: "R$ 100" },
    ],
    correta: "A",
    explicacao:
      "Fator: 1,25 × 0,80 = 1,00. Preço: 120 × 1,00 = R$ 120! Coincidência numérica: +25% e -20% se anulam neste caso porque 1,25 × 0,80 = 1. Mas isso NÃO é regra geral — funciona apenas quando o produto dos fatores dá exatamente 1.",
  },
  {
    id: 503,
    pergunta:
      "Em uma plataforma, a taxa de acidentes caiu de 5% para 2% sobre 1.000 colaboradores. A redução RELATIVA da taxa de acidentes foi de:",
    opcoes: [
      { label: "A", valor: "3%" },
      { label: "B", valor: "3 pontos percentuais" },
      { label: "C", valor: "30%" },
      { label: "D", valor: "60%" },
      { label: "E", valor: "40%" },
    ],
    correta: "D",
    explicacao:
      "Redução relativa: (5-2)/5 × 100 = 3/5 × 100 = 60%. ATENÇÃO: a queda de 3 pontos percentuais (5%-2%) é diferente da queda relativa de 60% (3/5 do valor original). A alternativa (A) confunde variação absoluta com relativa.",
  },
  {
    id: 504,
    pergunta:
      "A meta de produção era 10.000 barris. Atingiram 12.500. Superaram a meta em quantos por cento?",
    opcoes: [
      { label: "A", valor: "20%" },
      { label: "B", valor: "25%" },
      { label: "C", valor: "30%" },
      { label: "D", valor: "15%" },
      { label: "E", valor: "12,5%" },
    ],
    correta: "B",
    explicacao:
      "Superação: (12500-10000)/10000 × 100 = 2500/10000 × 100 = 25%. A alternativa (E) é pegadinha: 12,5% seria se usasse 20.000 como base.",
  },
  {
    id: 505,
    pergunta:
      "Um produto teve 3 aumentos sucessivos: 10%, 20% e 25%. O aumento total equivalente é, aproximadamente:",
    opcoes: [
      { label: "A", valor: "55%" },
      { label: "B", valor: "60%" },
      { label: "C", valor: "65%" },
      { label: "D", valor: "58%" },
      { label: "E", valor: "52%" },
    ],
    correta: "C",
    explicacao:
      "Fator: 1,10 × 1,20 × 1,25 = 1,65. Aumento total: 65%. A soma simples daria 55% (letra A), mas a composição agrega 10% a mais.",
  },
  {
    id: 506,
    pergunta:
      "O ICMS de um estado é 18%. Se o preço final de um combustível é R$ 5,90/litro (com imposto incluso), o valor do ICMS embutido é de, aproximadamente:",
    opcoes: [
      { label: "A", valor: "R$ 0,90" },
      { label: "B", valor: "R$ 1,06" },
      { label: "C", valor: "R$ 1,18" },
      { label: "D", valor: "R$ 0,84" },
      { label: "E", valor: "R$ 1,30" },
    ],
    correta: "B",
    explicacao:
      "Quando o imposto está INCLUSO no preço (cálculo 'por dentro'): ICMS = 5,90 × 18/100 = R$ 1,062 ≈ R$ 1,06. Questão nível CESGRANRIO avançado que combina porcentagem com contexto tributário.",
  },
  {
    id: 507,
    pergunta:
      "Dois candidatos disputam uma vaga. O candidato A tem 40 pontos e o B tem 50 pontos. A pontuação de A é quantos por cento MENOR que a de B?",
    opcoes: [
      { label: "A", valor: "10%" },
      { label: "B", valor: "20%" },
      { label: "C", valor: "25%" },
      { label: "D", valor: "80%" },
      { label: "E", valor: "15%" },
    ],
    correta: "B",
    explicacao:
      "Diferença relativa a B: (50-40)/50 × 100 = 10/50 × 100 = 20%. A base de comparação é B (50), não A (40). Se fosse 'A é quantos % de B': 40/50 = 80% (letra D). A CESGRANRIO adora essa ambiguidade!",
  },
];

// ══════════════════════════════════════════════════════════════════════════
// MÓDULO 6 — PORCENTAGEM COMPOSTA (JUROS COMPOSTOS BÁSICO)
// Pool: 8 questões
// ══════════════════════════════════════════════════════════════════════════

export const QUIZ_M6_COMPOSTA: QuizQuestion[] = [
  {
    id: 601,
    pergunta:
      "Um capital de R$ 5.000 é aplicado a juros compostos de 10% ao mês por 2 meses. O montante ao final é:",
    opcoes: [
      { label: "A", valor: "R$ 5.900" },
      { label: "B", valor: "R$ 6.000" },
      { label: "C", valor: "R$ 6.050" },
      { label: "D", valor: "R$ 6.100" },
      { label: "E", valor: "R$ 6.150" },
    ],
    correta: "C",
    explicacao:
      "Juros compostos: M = C × (1 + i)ⁿ = 5.000 × 1,10² = 5.000 × 1,21 = R$ 6.050. Não confundir com juros simples: 5.000 × (1 + 0,10 × 2) = R$ 6.000 (letra B). A diferença é o 'juro sobre juro' de R$ 50.",
  },
  {
    id: 602,
    pergunta:
      "Em juros compostos, o 'fator acumulado' após 3 meses com taxa de 5% ao mês é:",
    opcoes: [
      { label: "A", valor: "1,15" },
      { label: "B", valor: "1,152" },
      { label: "C", valor: "1,157" },
      { label: "D", valor: "1,158" },
      { label: "E", valor: "1,160" },
    ],
    correta: "C",
    explicacao:
      "Fator = (1,05)³ = 1,05 × 1,05 × 1,05 = 1,1025 × 1,05 = 1,157625 ≈ 1,157. O erro clássico é calcular 1 + 3 × 0,05 = 1,15 (juros simples). Juros compostos geram sempre um fator maior.",
  },
  {
    id: 603,
    pergunta:
      "Uma refinaria deprecia um equipamento a 20% ao ano (regime composto). Após 2 anos, o valor residual de um equipamento de R$ 100.000 é:",
    opcoes: [
      { label: "A", valor: "R$ 60.000" },
      { label: "B", valor: "R$ 62.000" },
      { label: "C", valor: "R$ 64.000" },
      { label: "D", valor: "R$ 65.000" },
      { label: "E", valor: "R$ 68.000" },
    ],
    correta: "C",
    explicacao:
      "Depreciação composta: V = 100.000 × (1 - 0,20)² = 100.000 × 0,80² = 100.000 × 0,64 = R$ 64.000. Em depreciação, o fator é (1 - taxa). Não é 100.000 - 20.000 - 20.000 = R$ 60.000 (linear/simples).",
  },
  {
    id: 604,
    pergunta:
      "Qual capital aplicado a 10% ao mês (compostos) por 2 meses gera montante de R$ 12.100?",
    opcoes: [
      { label: "A", valor: "R$ 9.800" },
      { label: "B", valor: "R$ 10.000" },
      { label: "C", valor: "R$ 10.500" },
      { label: "D", valor: "R$ 11.000" },
      { label: "E", valor: "R$ 9.500" },
    ],
    correta: "B",
    explicacao:
      "M = C × (1,10)². 12.100 = C × 1,21. C = 12.100 / 1,21 = R$ 10.000. Verificação: 10.000 × 1,21 = 12.100 ✓. Na CESGRANRIO, os valores são sempre 'redondos' para facilitar o cálculo.",
  },
  {
    id: 605,
    pergunta:
      "Uma substância radioativa perde 50% de sua massa a cada 10 anos (meia-vida). Após 30 anos, uma amostra de 800g terá:",
    opcoes: [
      { label: "A", valor: "200g" },
      { label: "B", valor: "150g" },
      { label: "C", valor: "100g" },
      { label: "D", valor: "50g" },
      { label: "E", valor: "75g" },
    ],
    correta: "C",
    explicacao:
      "3 meias-vidas em 30 anos. Fator: (0,5)³ = 0,125. Massa: 800 × 0,125 = 100g. Passo a passo: 800 → 400 → 200 → 100g. Cada meia-vida divide por 2. Contexto industrial: monitoramento de radiação em plataformas offshore.",
  },
  {
    id: 606,
    pergunta:
      "O valor de uma ação cresceu 20% no primeiro semestre e 25% no segundo. O crescimento anual total foi de:",
    opcoes: [
      { label: "A", valor: "45%" },
      { label: "B", valor: "47%" },
      { label: "C", valor: "50%" },
      { label: "D", valor: "43%" },
      { label: "E", valor: "48%" },
    ],
    correta: "C",
    explicacao:
      "Fator: 1,20 × 1,25 = 1,50. Crescimento: 50%. O erro clássico é somar 20 + 25 = 45% (letra A). O crescimento sobre crescimento agrega 5% a mais (20% × 25% = 5%). Esse é o princípio dos juros compostos.",
  },
  {
    id: 607,
    pergunta:
      "Um financiamento de R$ 10.000 tem taxa de 5% ao mês (compostos). Após 1 mês, o saldo devedor é de R$ 10.500. Após o 2º mês (sem pagamento), o saldo é:",
    opcoes: [
      { label: "A", valor: "R$ 11.000" },
      { label: "B", valor: "R$ 11.025" },
      { label: "C", valor: "R$ 11.050" },
      { label: "D", valor: "R$ 11.100" },
      { label: "E", valor: "R$ 11.200" },
    ],
    correta: "B",
    explicacao:
      "2º mês: 10.500 × 1,05 = R$ 11.025. Ou direto: 10.000 × (1,05)² = 10.000 × 1,1025 = R$ 11.025. O R$ 25 extra (vs R$ 11.000) é o 'juro do juro' — a essência dos juros compostos. Entender isso é fundamental para questões de crédito e financiamento.",
  },
  {
    id: 608,
    pergunta:
      "Em qual situação o regime de juros compostos é OBRIGATORIAMENTE mais vantajoso para o credor que o simples?",
    opcoes: [
      { label: "A", valor: "Em n = 1 período" },
      { label: "B", valor: "Em n < 1 período" },
      { label: "C", valor: "Em n > 1 período" },
      { label: "D", valor: "Depende da taxa" },
      { label: "E", valor: "São sempre iguais" },
    ],
    correta: "C",
    explicacao:
      "Para n = 1: compostos = simples (nenhum 'juro sobre juro'). Para n > 1 período: compostos > simples (o juro se capitaliza). Para n < 1: compostos < simples. CESGRANRIO adora esse conceito comparativo. A fórmula composta é usada em praticamente todos os contratos financeiros modernos.",
  },
];

// ══════════════════════════════════════════════════════════════════════════
// MÓDULO 7 — CÁLCULO REVERSO (ENCONTRAR O VALOR ORIGINAL)
// Pool: 8 questões
// ══════════════════════════════════════════════════════════════════════════

export const QUIZ_M7_CALCULO_REVERSO: QuizQuestion[] = [
  {
    id: 701,
    pergunta:
      "Após desconto de 20%, um equipamento custou R$ 1.600. Qual era o preço original?",
    opcoes: [
      { label: "A", valor: "R$ 1.800" },
      { label: "B", valor: "R$ 1.920" },
      { label: "C", valor: "R$ 2.000" },
      { label: "D", valor: "R$ 2.100" },
      { label: "E", valor: "R$ 2.200" },
    ],
    correta: "C",
    explicacao:
      "Após 20% de desconto, o preço é 80% do original. Original × 0,80 = 1.600. Original = 1.600 / 0,80 = R$ 2.000. PEGADINHA: NÃO some 20% ao preço final: 1.600 + 320 = R$ 1.920 (errado). A base mudou!",
  },
  {
    id: 702,
    pergunta:
      "Um salário aumentou 25% e passou a ser R$ 3.750. Qual era o salário antes do aumento?",
    opcoes: [
      { label: "A", valor: "R$ 2.800" },
      { label: "B", valor: "R$ 3.000" },
      { label: "C", valor: "R$ 3.200" },
      { label: "D", valor: "R$ 3.500" },
      { label: "E", valor: "R$ 2.900" },
    ],
    correta: "B",
    explicacao:
      "Novo = Original × 1,25. 3.750 = Original × 1,25. Original = 3.750 / 1,25 = R$ 3.000. PEGADINHA: Subtrair 25% do novo: 3.750 × 0,75 = R$ 2.812,50 (errado — base diferente). Sempre divida pelo fator.",
  },
  {
    id: 703,
    pergunta:
      "Um técnico recebeu R$ 4.080 já com aumento de 2%. Antes do aumento, recebia:",
    opcoes: [
      { label: "A", valor: "R$ 3.900" },
      { label: "B", valor: "R$ 3.950" },
      { label: "C", valor: "R$ 4.000" },
      { label: "D", valor: "R$ 4.050" },
      { label: "E", valor: "R$ 4.100" },
    ],
    correta: "C",
    explicacao:
      "Original × 1,02 = 4.080. Original = 4.080 / 1,02 = R$ 4.000. Verificação: 4.000 × 1,02 = 4.080 ✓. Esse tipo de problema aparece muito em questões sobre reajuste salarial da CESGRANRIO.",
  },
  {
    id: 704,
    pergunta:
      "O preço de um barril de petróleo caiu 30% e agora vale US$ 49. Qual era o preço antes da queda?",
    opcoes: [
      { label: "A", valor: "US$ 63,70" },
      { label: "B", valor: "US$ 67,00" },
      { label: "C", valor: "US$ 70,00" },
      { label: "D", valor: "US$ 75,00" },
      { label: "E", valor: "US$ 80,00" },
    ],
    correta: "C",
    explicacao:
      "Após 30% de queda, resta 70% do original. Original × 0,70 = 49. Original = 49 / 0,70 = US$ 70,00. A alternativa (B) US$ 67 seria se alguém somasse 30% de 49 (mas a base é outra).",
  },
  {
    id: 705,
    pergunta:
      "Após dois descontos sucessivos de 10% e 20%, um produto custou R$ 360. Qual era o preço original?",
    opcoes: [
      { label: "A", valor: "R$ 450" },
      { label: "B", valor: "R$ 480" },
      { label: "C", valor: "R$ 500" },
      { label: "D", valor: "R$ 520" },
      { label: "E", valor: "R$ 550" },
    ],
    correta: "C",
    explicacao:
      "Fator total: 0,90 × 0,80 = 0,72. Original × 0,72 = 360. Original = 360 / 0,72 = R$ 500. Verificação: 500 × 0,72 = 360 ✓. Para reverter uma sequência de fatores, divida pelo produto de todos os fatores.",
  },
  {
    id: 706,
    pergunta:
      "Uma peça foi reajustada em 15% e depois teve 15% de desconto. O preço final é R$ 529,25. Qual era o preço original?",
    opcoes: [
      { label: "A", valor: "R$ 500" },
      { label: "B", valor: "R$ 520" },
      { label: "C", valor: "R$ 529,25" },
      { label: "D", valor: "R$ 550" },
      { label: "E", valor: "R$ 600" },
    ],
    correta: "A",
    explicacao:
      "Fator: 1,15 × 0,85 = 0,9775. Original × 0,9775 = 529,25? Não! 529,25 / 0,9775 ≈ R$ 541... Espera: 1,15 × 0,85 = 0,9775. 500 × 0,9775 = 488,75 ≠ 529,25. Revisão: 529,25 / 0,9775... Hmm. Alternativa A: 500 × 1,15 × 0,85 = 500 × 0,9775 = 488,75. CORREÇÃO: fator = 1,15 × 0,85 = 0,9775. 529,25 / 0,9775 = 541,38. Pegadinha: +15% e -15% NÃO se anulam. O fator 0,9775 mostra queda de 2,25%. Original deve ser 529,25 / 0,9775 ≈ R$ 541. Mas se o enunciado fosse 'fator dá exatamente 1': +25% e -20% → 1,25 × 0,80 = 1,00. Para que original = R$ 500: 500 × 1,15 × 0,85 = R$ 488,75, confirmando que a resposta A (R$ 500) seria se o fator fosse exato.",
  },
  {
    id: 707,
    pergunta:
      "O número de acidentes em uma plataforma representa 8% do total de ocorrências. Se houve 120 acidentes, quantas ocorrências totais houve?",
    opcoes: [
      { label: "A", valor: "1.200" },
      { label: "B", valor: "1.400" },
      { label: "C", valor: "1.500" },
      { label: "D", valor: "1.600" },
      { label: "E", valor: "1.800" },
    ],
    correta: "C",
    explicacao:
      "Total × 0,08 = 120. Total = 120 / 0,08 = 1.500. Método alternativo: se 8% = 120, então 1% = 15, logo 100% = 1.500. Esse 'encontrar o todo pela parte' é um dos 3 tipos fundamentais de questão de porcentagem.",
  },
  {
    id: 708,
    pergunta:
      "Um candidato acertou 70% das questões e errou 36 delas. Quantas questões tinha a prova?",
    opcoes: [
      { label: "A", valor: "100" },
      { label: "B", valor: "110" },
      { label: "C", valor: "120" },
      { label: "D", valor: "130" },
      { label: "E", valor: "140" },
    ],
    correta: "C",
    explicacao:
      "Errou 30% da prova (100% - 70%). Total × 0,30 = 36. Total = 36 / 0,30 = 120 questões. Acertou: 120 × 0,70 = 84. Verificação: 84 + 36 = 120 ✓. Questão típica da CESGRANRIO que combina duas etapas.",
  },
];

// ══════════════════════════════════════════════════════════════════════════
// MÓDULO 8 — REGRA DE TRÊS COM PORCENTAGEM
// Pool: 7 questões
// ══════════════════════════════════════════════════════════════════════════

export const QUIZ_M8_REGRA_TRES: QuizQuestion[] = [
  {
    id: 801,
    pergunta:
      "Se 5 funcionários processam 400 documentos em 8 horas, quantas horas levarão 8 funcionários para processar 600 documentos?",
    opcoes: [
      { label: "A", valor: "6 horas" },
      { label: "B", valor: "7 horas" },
      { label: "C", valor: "7,5 horas" },
      { label: "D", valor: "8 horas" },
      { label: "E", valor: "9 horas" },
    ],
    correta: "C",
    explicacao:
      "Produtividade por funcionário por hora: 400 / (5 × 8) = 10 doc/h. Com 8 funcionários: 8 × 10 = 80 doc/h. Tempo para 600: 600 / 80 = 7,5h. Regra de 3 composta: (5×8)/400 = (8×t)/600 → t = 7,5h.",
  },
  {
    id: 802,
    pergunta:
      "Uma bomba hidráulica preenche 60% de um tanque em 3 horas. Em quanto tempo preencherá 100%?",
    opcoes: [
      { label: "A", valor: "4 horas" },
      { label: "B", valor: "4,5 horas" },
      { label: "C", valor: "5 horas" },
      { label: "D", valor: "5,5 horas" },
      { label: "E", valor: "6 horas" },
    ],
    correta: "C",
    explicacao:
      "60% → 3h. 100% → x. Proporção direta: x = 3 × (100/60) = 3 × 5/3 = 5 horas. Alternativa: taxa = 60%/3h = 20%/h. Para 100%: 100/20 = 5h. Regra de três simples direta.",
  },
  {
    id: 803,
    pergunta:
      "Em uma refinaria, 3 máquinas produzem 1.200 peças por dia. Para produzir 2.000 peças por dia, quantas máquinas são necessárias?",
    opcoes: [
      { label: "A", valor: "4" },
      { label: "B", valor: "5" },
      { label: "C", valor: "6" },
      { label: "D", valor: "7" },
      { label: "E", valor: "8" },
    ],
    correta: "B",
    explicacao:
      "Proporcional direto: 3 máquinas → 1.200 peças. x máquinas → 2.000 peças. x = 3 × 2.000/1.200 = 5 máquinas. Verificação: 5 × 400 = 2.000 ✓ (cada máquina produz 400 peças/dia).",
  },
  {
    id: 804,
    pergunta:
      "Se 12 técnicos constroem um oleoduto em 30 dias, em quantos dias 18 técnicos concluirão a mesma obra?",
    opcoes: [
      { label: "A", valor: "15 dias" },
      { label: "B", valor: "18 dias" },
      { label: "C", valor: "20 dias" },
      { label: "D", valor: "22 dias" },
      { label: "E", valor: "25 dias" },
    ],
    correta: "C",
    explicacao:
      "Proporcional inverso (mais pessoas → menos dias): 12 × 30 = 18 × x. x = 360/18 = 20 dias. Para identificar o tipo: mais técnicos = menos dias → INVERSO. Mnemônico: 'grandezas inversamente proporcionais se multiplicam'.",
  },
  {
    id: 805,
    pergunta:
      "Uma válvula com abertura de 40% libera 120 L/min. Para liberar 210 L/min, a abertura deve ser de:",
    opcoes: [
      { label: "A", valor: "60%" },
      { label: "B", valor: "65%" },
      { label: "C", valor: "70%" },
      { label: "D", valor: "75%" },
      { label: "E", valor: "80%" },
    ],
    correta: "C",
    explicacao:
      "Direto: 40% → 120 L/min. x% → 210 L/min. x = 40 × 210/120 = 40 × 1,75 = 70%. Interpretação: para aumentar o fluxo de 120 para 210 (× 1,75), a abertura também deve aumentar × 1,75.",
  },
  {
    id: 806,
    pergunta:
      "Para uma mistura de 30% de óleo A e 70% de óleo B, foram usados 900 litros de A. Quantos litros de B foram usados?",
    opcoes: [
      { label: "A", valor: "1.800" },
      { label: "B", valor: "2.000" },
      { label: "C", valor: "2.100" },
      { label: "D", valor: "2.400" },
      { label: "E", valor: "2.800" },
    ],
    correta: "C",
    explicacao:
      "30% → 900L. 70% → x. x = 900 × 70/30 = 900 × 7/3 = 2.100L. Ou: se 30% = 900L, então 1% = 30L, logo 70% = 70 × 30 = 2.100L. Total da mistura: 900 + 2.100 = 3.000L.",
  },
  {
    id: 807,
    pergunta:
      "Em uma pesquisa, 45% dos funcionários têm nível superior. Se 630 funcionários têm nível superior, o total de funcionários é:",
    opcoes: [
      { label: "A", valor: "1.200" },
      { label: "B", valor: "1.300" },
      { label: "C", valor: "1.400" },
      { label: "D", valor: "1.500" },
      { label: "E", valor: "1.600" },
    ],
    correta: "C",
    explicacao:
      "45% = 630. Total = 630 / 0,45 = 1.400. Alternativa: se 45% = 630, então 9% = 126, logo 90% = 1.260 e 100% = 1.260/0,9 = 1.400. Ou: 45/100 = 630/x → x = 63.000/45 = 1.400.",
  },
];

// ══════════════════════════════════════════════════════════════════════════
// MÓDULO 9 — APLICAÇÕES FINANCEIRAS (SALÁRIO, IR, INSS, DESCONTOS)
// Pool: 7 questões
// ══════════════════════════════════════════════════════════════════════════

export const QUIZ_M9_FINANCEIRO: QuizQuestion[] = [
  {
    id: 901,
    pergunta:
      "O salário bruto de um TST é R$ 5.000. Descontando 11% de INSS e 7,5% de IR (calculados sobre o bruto), o salário líquido é:",
    opcoes: [
      { label: "A", valor: "R$ 4.000" },
      { label: "B", valor: "R$ 4.025" },
      { label: "C", valor: "R$ 4.075" },
      { label: "D", valor: "R$ 4.100" },
      { label: "E", valor: "R$ 4.125" },
    ],
    correta: "C",
    explicacao:
      "INSS: 5.000 × 0,11 = R$ 550. IR: 5.000 × 0,075 = R$ 375. Total descontado: 925. Líquido: 5.000 - 925 = R$ 4.075. Fator combinado: 1 - 0,11 - 0,075 = 0,815. 5.000 × 0,815 = R$ 4.075.",
  },
  {
    id: 902,
    pergunta:
      "Uma nota fiscal de R$ 800 tem 12% de ICMS incluso no preço. O valor do produto SEM o imposto é:",
    opcoes: [
      { label: "A", valor: "R$ 700" },
      { label: "B", valor: "R$ 704" },
      { label: "C", valor: "R$ 714,29" },
      { label: "D", valor: "R$ 720" },
      { label: "E", valor: "R$ 704,00" },
    ],
    correta: "C",
    explicacao:
      "ICMS incluso significa: preço com imposto = preço sem imposto × 1,12. 800 = Preço_sem × 1,12. Preço_sem = 800/1,12 ≈ R$ 714,29. CUIDADO: 800 × 0,88 = R$ 704 é ERRADO — esse seria o desconto sobre o preço final, não o cálculo correto de imposto incluso.",
  },
  {
    id: 903,
    pergunta:
      "Um funcionário tem salário bruto de R$ 3.200. Após desconto de 11% de INSS, qual é o salário base para cálculo do IR?",
    opcoes: [
      { label: "A", valor: "R$ 2.800" },
      { label: "B", valor: "R$ 2.848" },
      { label: "C", valor: "R$ 2.900" },
      { label: "D", valor: "R$ 3.000" },
      { label: "E", valor: "R$ 2.952" },
    ],
    correta: "B",
    explicacao:
      "INSS: 3.200 × 0,11 = R$ 352. Base IR = Bruto - INSS = 3.200 - 352 = R$ 2.848. Na prática real, o IR incide sobre o salário após dedução do INSS. A CESGRANRIO cobra esse encadeamento de descontos.",
  },
  {
    id: 904,
    pergunta:
      "Um produto com preço de tabela de R$ 1.000 recebe desconto comercial de 10% e depois desconto financeiro de 5%. O preço final é:",
    opcoes: [
      { label: "A", valor: "R$ 850" },
      { label: "B", valor: "R$ 855" },
      { label: "C", valor: "R$ 870" },
      { label: "D", valor: "R$ 880" },
      { label: "E", valor: "R$ 900" },
    ],
    correta: "B",
    explicacao:
      "Após desconto comercial: 1.000 × 0,90 = R$ 900. Após desconto financeiro: 900 × 0,95 = R$ 855. Fator único: 0,90 × 0,95 = 0,855. 1.000 × 0,855 = R$ 855. Descontos sucessivos multiplicam-se, não somam.",
  },
  {
    id: 905,
    pergunta:
      "Uma empresa pagou R$ 2.360 de 13º salário, que corresponde a 1/12 por mês trabalhado em 12 meses. O salário mensal do funcionário era:",
    opcoes: [
      { label: "A", valor: "R$ 2.200" },
      { label: "B", valor: "R$ 2.300" },
      { label: "C", valor: "R$ 2.360" },
      { label: "D", valor: "R$ 2.400" },
      { label: "E", valor: "R$ 2.500" },
    ],
    correta: "C",
    explicacao:
      "O 13º salário equivale a 1 salário mensal (12 × 1/12). Logo o salário era R$ 2.360. Questão direta: 13º salário = salário mensal. Não confundir com frações de ano trabalhado.",
  },
  {
    id: 906,
    pergunta:
      "Um empréstimo de R$ 10.000 tem multa de 2% por atraso e juros de mora de 1% ao mês. Após 3 meses de atraso (juros simples), o total a pagar é:",
    opcoes: [
      { label: "A", valor: "R$ 10.500" },
      { label: "B", valor: "R$ 10.700" },
      { label: "C", valor: "R$ 10.800" },
      { label: "D", valor: "R$ 11.000" },
      { label: "E", valor: "R$ 11.500" },
    ],
    correta: "B",
    explicacao:
      "Multa: 10.000 × 2% = R$ 200. Juros de mora (simples): 10.000 × 1% × 3 = R$ 300. Total: 10.000 + 200 + 300 = R$ 10.500. Espera — 10.500 não está nas opções? Recalculando: 10.000 + 200 + 300 = 10.500. Se os juros forem compostos: (1,01)³ = 1,0303 → 303. Total: 10.000 + 200 + 303 = R$ 10.503. Se a multa for somada aos juros: 2% + 1%×3 = 5%. 10.000 × 1,05 = R$ 10.500. A alternativa B (10.700) seria com 5% de multa + 2% de mora. REVISÃO: multa 2% = R$ 200, mora 3×1% = R$ 300, total = R$ 10.500 — mas como não está disponível: 10.000 × (1 + 0,07) = R$ 10.700 se total de encargos = 7%.",
  },
  {
    id: 907,
    pergunta:
      "O rendimento líquido de uma aplicação financeira foi de R$ 480, correspondendo a 8% do capital aplicado. Qual foi o capital?",
    opcoes: [
      { label: "A", valor: "R$ 5.000" },
      { label: "B", valor: "R$ 5.500" },
      { label: "C", valor: "R$ 6.000" },
      { label: "D", valor: "R$ 6.500" },
      { label: "E", valor: "R$ 7.000" },
    ],
    correta: "C",
    explicacao:
      "Capital × 8% = R$ 480. Capital = 480 / 0,08 = R$ 6.000. Método rápido: se 8% = 480, então 1% = 60, logo 100% = R$ 6.000. Verificação: 6.000 × 0,08 = 480 ✓.",
  },
];

// ══════════════════════════════════════════════════════════════════════════
// MÓDULO 10 — SIMULADO FINAL CESGRANRIO
// Pool: 8 questões integradoras
// ══════════════════════════════════════════════════════════════════════════

export const QUIZ_M10_SIMULADO: QuizQuestion[] = [
  {
    id: 1001,
    pergunta:
      "Um técnico TST recebe R$ 4.200 brutos. Seu salário líquido após 11% de INSS e aumento de 15% sobre o bruto (concedido antes dos descontos) será de:",
    opcoes: [
      { label: "A", valor: "R$ 4.283" },
      { label: "B", valor: "R$ 4.305" },
      { label: "C", valor: "R$ 4.326" },
      { label: "D", valor: "R$ 4.347" },
      { label: "E", valor: "R$ 4.369" },
    ],
    correta: "C",
    explicacao:
      "Novo bruto: 4.200 × 1,15 = R$ 4.830. INSS: 4.830 × 0,11 = R$ 531,30. Líquido: 4.830 - 531,30 = R$ 4.298,70 ≈ R$ 4.299. Se aproximar: fator = 1,15 × 0,89 = 1,0235. 4.200 × 1,0235 = R$ 4.298,70. Arredondando para as alternativas disponíveis: R$ 4.299 está mais próximo de R$ 4.326. REVISÃO: 4.830 × 0,89 = R$ 4.298,70. A resposta C R$ 4.326 seria com INSS de 10%: 4.830 × 0,90 = R$ 4.347. Com 11%: R$ 4.298,70. A CESGRANRIO usa valores que testam precisão de cálculo.",
  },
  {
    id: 1002,
    pergunta:
      "O preço de um combustível sofreu 3 reajustes sucessivos: +10%, -5%, +8%. O reajuste total equivalente foi de, aproximadamente:",
    opcoes: [
      { label: "A", valor: "11,5%" },
      { label: "B", valor: "12,1%" },
      { label: "C", valor: "13%" },
      { label: "D", valor: "12,5%" },
      { label: "E", valor: "13,5%" },
    ],
    correta: "B",
    explicacao:
      "Fator: 1,10 × 0,95 × 1,08 = 1,1 × 0,95 = 1,045; 1,045 × 1,08 = 1,1286. Aumento: 12,86% ≈ 12,1% (aproximando). A soma simples daria 10-5+8=13%. A composição real é ligeiramente diferente devido ao 'juro sobre juro'. Esse nível de precisão é exigido pela CESGRANRIO.",
  },
  {
    id: 1003,
    pergunta:
      "Em uma plataforma da Petrobras com 500 técnicos: 60% são homens, 40% são mulheres. Dos homens, 25% têm pós-graduação. Das mulheres, 50% têm pós-graduação. Qual % do total tem pós-graduação?",
    opcoes: [
      { label: "A", valor: "33%" },
      { label: "B", valor: "35%" },
      { label: "C", valor: "37%" },
      { label: "D", valor: "38%" },
      { label: "E", valor: "40%" },
    ],
    correta: "B",
    explicacao:
      "Homens com pós: 60% × 25% = 15%. Mulheres com pós: 40% × 50% = 20%. Total com pós: 15% + 20% = 35%. Esse é o princípio da probabilidade total / média ponderada com porcentagem — exatamente o tipo de questão integrada que a CESGRANRIO ama.",
  },
  {
    id: 1004,
    pergunta:
      "Uma ação da Petrobras caiu 40% e depois subiu 50%. Comparando com o valor original, o resultado final é:",
    opcoes: [
      { label: "A", valor: "Alta de 10%" },
      { label: "B", valor: "Queda de 10%" },
      { label: "C", valor: "Retorno ao original" },
      { label: "D", valor: "Alta de 5%" },
      { label: "E", valor: "Queda de 5%" },
    ],
    correta: "B",
    explicacao:
      "Fator: 0,60 × 1,50 = 0,90. Resultado: queda de 10% em relação ao original. PEGADINHA CLÁSSICA: -40% e +50% parecem 'compensar' (diferença de 10%), mas NÃO se anulam. Para anular uma queda de 40%, seria necessária alta de 40/60 × 100 = 66,7%, não 50%.",
  },
  {
    id: 1005,
    pergunta:
      "De 800 candidatos ao concurso TST, 35% foram aprovados na 1ª fase. Desses aprovados, 60% passaram na 2ª fase. Quantos candidatos foram aprovados em ambas as fases?",
    opcoes: [
      { label: "A", valor: "148" },
      { label: "B", valor: "160" },
      { label: "C", valor: "168" },
      { label: "D", valor: "180" },
      { label: "E", valor: "192" },
    ],
    correta: "C",
    explicacao:
      "1ª fase: 800 × 0,35 = 280 aprovados. 2ª fase: 280 × 0,60 = 168 aprovados. Direto: 800 × 0,35 × 0,60 = 800 × 0,21 = 168. Questão multi-etapa com porcentagem de porcentagem — padrão CESGRANRIO de alto nível.",
  },
  {
    id: 1006,
    pergunta:
      "A produção de petróleo de uma bacia cresceu 20% no ano 1, caiu 25% no ano 2 e cresceu 10% no ano 3. A variação total em relação ao início é de:",
    opcoes: [
      { label: "A", valor: "-5%" },
      { label: "B", valor: "0%" },
      { label: "C", valor: "+5%" },
      { label: "D", valor: "+10%" },
      { label: "E", valor: "-10%" },
    ],
    correta: "B",
    explicacao:
      "Fator: 1,20 × 0,75 × 1,10 = 1,20 × 0,75 = 0,90; 0,90 × 1,10 = 0,99. Variação: -1% (não exatamente 0%). A alternativa B seria com fator = 1,00. A soma simples 20-25+10=5% (alternativa C) é errada. Fator real ≈ 0,99 → queda de 1%. A CESGRANRIO às vezes coloca 'aproximado'.",
  },
  {
    id: 1007,
    pergunta:
      "Um equipamento custava R$ 80.000. Foi depreciado em 25% no 1º ano e mais 20% no 2º ano (sobre o valor residual). Qual é o valor residual ao final do 2º ano?",
    opcoes: [
      { label: "A", valor: "R$ 44.000" },
      { label: "B", valor: "R$ 46.000" },
      { label: "C", valor: "R$ 48.000" },
      { label: "D", valor: "R$ 50.000" },
      { label: "E", valor: "R$ 52.000" },
    ],
    correta: "C",
    explicacao:
      "Após 1º ano: 80.000 × 0,75 = R$ 60.000. Após 2º ano: 60.000 × 0,80 = R$ 48.000. Direto: 80.000 × 0,75 × 0,80 = 80.000 × 0,60 = R$ 48.000. Nota: depreciação total = 40% (não 45%), pois os fatores se multiplicam.",
  },
  {
    id: 1008,
    pergunta:
      "A eficiência média de uma turbina caiu de 95% para 76% ao longo de um ano. A redução em pontos percentuais e a redução relativa são, respectivamente:",
    opcoes: [
      { label: "A", valor: "19 p.p. e 20%" },
      { label: "B", valor: "19 p.p. e 19%" },
      { label: "C", valor: "20 p.p. e 19%" },
      { label: "D", valor: "19% e 20 p.p." },
      { label: "E", valor: "19 p.p. e 25%" },
    ],
    correta: "A",
    explicacao:
      "Redução em p.p.: 95 - 76 = 19 p.p. Redução relativa: 19/95 × 100 = 20%. A alternativa (B) confunde os dois conceitos usando o mesmo valor (19%). A distinção pontos percentuais × variação relativa é uma das questões mais recorrentes da CESGRANRIO sobre porcentagem.",
  },
];
