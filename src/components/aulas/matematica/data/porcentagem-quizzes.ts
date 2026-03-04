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
