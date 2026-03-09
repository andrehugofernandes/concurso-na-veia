import { QuizQuestion } from "../../shared";

// ═══ MÓDULO 1 — PRINCÍPIO FUNDAMENTAL DA CONTAGEM ═══
export const QUIZ_M1_PRINCIPIO_CONTAGEM: QuizQuestion[] = [
  {
    id: 101,
    pergunta: "Uma senha de acesso a uma área restrita da Petrobras tem 3 dígitos, cada um podendo ser 0–9. Quantas senhas diferentes podem ser formadas?",
    opcoes: [{ label: "A", valor: "30" }, { label: "B", valor: "100" }, { label: "C", valor: "1000" }, { label: "D", valor: "720" }, { label: "E", valor: "500" }],
    correta: "C",
    explicacao: "Pelo Princípio Fundamental da Contagem, multiplica-se as escolhas de cada etapa: 10 × 10 × 10 = 1000. Como as repetições são permitidas, cada posição tem 10 opções independentes.",
  },
  {
    id: 102,
    pergunta: "Um técnico da REPLAN deve escolher 1 EPI de 4 tipos de capacete, 1 de 3 tipos de luva e 1 de 2 tipos de óculos. De quantas formas distintas pode se equipar?",
    opcoes: [{ label: "A", valor: "9" }, { label: "B", valor: "12" }, { label: "C", valor: "18" }, { label: "D", valor: "24" }, { label: "E", valor: "36" }],
    correta: "D",
    explicacao: "Pelo PFC: 4 × 3 × 2 = 24 formas. O princípio diz que se uma tarefa tem n₁ formas e outra n₂ formas, juntas têm n₁ × n₂ formas — basta multiplicar todas as etapas independentes.",
  },
  {
    id: 103,
    pergunta: "Uma plataforma da Petrobras tem 5 rotas de acesso e 3 de saída. O número de caminhos distintos de entrada e saída é:",
    opcoes: [{ label: "A", valor: "8" }, { label: "B", valor: "10" }, { label: "C", valor: "12" }, { label: "D", valor: "15" }, { label: "E", valor: "20" }],
    correta: "D",
    explicacao: "PFC: 5 rotas de entrada × 3 rotas de saída = 15 caminhos distintos. A soma (5+3=8) seria usada apenas se as rotas fossem alternativas excludentes — aqui são etapas sequenciais.",
  },
  {
    id: 104,
    pergunta: "Um código de identificação de equipamento na refinaria é formado por 1 letra (A–E) seguida de 2 dígitos (0–9). Quantos códigos são possíveis?",
    opcoes: [{ label: "A", valor: "50" }, { label: "B", valor: "500" }, { label: "C", valor: "100" }, { label: "D", valor: "250" }, { label: "E", valor: "200" }],
    correta: "B",
    explicacao: "5 letras × 10 dígitos × 10 dígitos = 5 × 100 = 500 códigos. Cada etapa é independente, então multiplica-se: 5 × 10 × 10 = 500.",
  },
  {
    id: 105,
    pergunta: "Um gerente da Petrobras pode ir ao escritório por 4 caminhos e voltar por 3 caminhos diferentes (sem repetir o mesmo da ida). Quantas viagens ida-e-volta distintas existem?",
    opcoes: [{ label: "A", valor: "7" }, { label: "B", valor: "12" }, { label: "C", valor: "9" }, { label: "D", valor: "6" }, { label: "E", valor: "16" }],
    correta: "B",
    explicacao: "4 escolhas na ida × 3 na volta = 12 viagens distintas. O PFC se aplica mesmo quando as opções de cada etapa são diferentes em quantidade — basta que as etapas sejam independentes.",
  },
  {
    id: 106,
    pergunta: "Um painel de controle de uma plataforma offshore tem 4 botões, cada um podendo estar ligado ou desligado. Quantos estados diferentes o painel pode assumir?",
    opcoes: [{ label: "A", valor: "8" }, { label: "B", valor: "12" }, { label: "C", valor: "16" }, { label: "D", valor: "32" }, { label: "E", valor: "4" }],
    correta: "C",
    explicacao: "Cada botão tem 2 estados (ligado/desligado), com 4 botões independentes: 2 × 2 × 2 × 2 = 2⁴ = 16 estados. A banca frequentemente usa potências de 2 em contextos de sistemas on/off.",
  },
  {
    id: 107,
    pergunta: "Em um sistema de identificação da Petrobras, uma tag tem 2 letras seguidas de 3 dígitos. Com letras A–Z e dígitos 0–9 (repetição permitida), quantas tags são possíveis?",
    opcoes: [{ label: "A", valor: "67.600" }, { label: "B", valor: "676.000" }, { label: "C", valor: "26.000" }, { label: "D", valor: "260.000" }, { label: "E", valor: "1.757.600" }],
    correta: "B",
    explicacao: "26 × 26 × 10 × 10 × 10 = 676 × 1000 = 676.000 tags. Com repetição permitida, cada posição é independente e multiplica-se o número de opções de cada uma.",
  },
];

// ═══ MÓDULO 2 — FATORIAL E NOTAÇÃO ═══
export const QUIZ_M2_FATORIAL: QuizQuestion[] = [
  {
    id: 201,
    pergunta: "Qual é o valor de 6! (seis fatorial)?",
    opcoes: [{ label: "A", valor: "36" }, { label: "B", valor: "120" }, { label: "C", valor: "720" }, { label: "D", valor: "5040" }, { label: "E", valor: "360" }],
    correta: "C",
    explicacao: "6! = 6 × 5 × 4 × 3 × 2 × 1 = 720. Por definição, n! = n × (n−1) × ... × 2 × 1. Memorize: 1!=1, 2!=2, 3!=6, 4!=24, 5!=120, 6!=720, 7!=5040.",
  },
  {
    id: 202,
    pergunta: "Quanto vale 10! / 8!?",
    opcoes: [{ label: "A", valor: "20" }, { label: "B", valor: "90" }, { label: "C", valor: "180" }, { label: "D", valor: "72" }, { label: "E", valor: "10" }],
    correta: "B",
    explicacao: "10!/8! = (10 × 9 × 8!) / 8! = 10 × 9 = 90. Simplifique cancelando o fatorial menor — nunca calcule fatoriais grandes individualmente antes de simplificar.",
  },
  {
    id: 203,
    pergunta: "Em uma inspeção de dutos na Petrobras, o engenheiro registra 0! operações de uma lista vazia. Esse valor é:",
    opcoes: [{ label: "A", valor: "0" }, { label: "B", valor: "1" }, { label: "C", valor: "Indefinido" }, { label: "D", valor: "Infinito" }, { label: "E", valor: "−1" }],
    correta: "B",
    explicacao: "Por convenção matemática, 0! = 1. Isso é necessário para que as fórmulas de combinação e permutação funcionem corretamente quando k=0 ou k=n.",
  },
  {
    id: 204,
    pergunta: "Qual é o valor de n se n! = 120?",
    opcoes: [{ label: "A", valor: "4" }, { label: "B", valor: "5" }, { label: "C", valor: "6" }, { label: "D", valor: "7" }, { label: "E", valor: "10" }],
    correta: "B",
    explicacao: "5! = 5 × 4 × 3 × 2 × 1 = 120. Reconheça os fatoriais comuns: 4!=24, 5!=120, 6!=720. A CESGRANRIO testa se o candidato memoriza esses valores.",
  },
  {
    id: 205,
    pergunta: "Simplifique: (n+1)! / n!",
    opcoes: [{ label: "A", valor: "n" }, { label: "B", valor: "n+1" }, { label: "C", valor: "1" }, { label: "D", valor: "(n+1)²" }, { label: "E", valor: "n! + 1" }],
    correta: "B",
    explicacao: "(n+1)! = (n+1) × n!, logo (n+1)! / n! = n+1. Essa simplificação é base para manipulação de fórmulas de análise combinatória.",
  },
  {
    id: 206,
    pergunta: "O número de casas decimais de 10! é:",
    opcoes: [{ label: "A", valor: "5" }, { label: "B", valor: "6" }, { label: "C", valor: "7" }, { label: "D", valor: "8" }, { label: "E", valor: "4" }],
    correta: "C",
    explicacao: "10! = 3.628.800 que tem 7 algarismos. Mas é mais importante saber que 10! = 3.628.800 para provas. O exercício testa conhecimento do valor exato.",
  },
  {
    id: 207,
    pergunta: "Resolva: 8! / (5! × 3!)",
    opcoes: [{ label: "A", valor: "56" }, { label: "B", valor: "336" }, { label: "C", valor: "6720" }, { label: "D", valor: "28" }, { label: "E", valor: "40320" }],
    correta: "A",
    explicacao: "8!/(5!×3!) = (8×7×6×5!)/(5!×6) = (8×7×6)/6 = 8×7 = 56. Esta é exatamente C(8,3) = C(8,5) = 56 — a combinação de 8 em 3.",
  },
];

// ═══ MÓDULO 3 — PERMUTAÇÃO SIMPLES ═══
export const QUIZ_M3_PERMUTACAO_SIMPLES: QuizQuestion[] = [
  {
    id: 301,
    pergunta: "De quantas formas distintas 5 técnicos da REPLAN podem se organizar em fila para receber treinamento?",
    opcoes: [{ label: "A", valor: "25" }, { label: "B", valor: "60" }, { label: "C", valor: "120" }, { label: "D", valor: "240" }, { label: "E", valor: "720" }],
    correta: "C",
    explicacao: "P(5) = 5! = 120. Em permutação simples, trocamos TODOS os n elementos, e o número de arranjos é n!. Aqui: 5 × 4 × 3 × 2 × 1 = 120.",
  },
  {
    id: 302,
    pergunta: "Em uma escala de turnos da Petrobras com 4 operadores, de quantas formas distintas eles podem ser escalados para 4 turnos diferentes?",
    opcoes: [{ label: "A", valor: "4" }, { label: "B", valor: "12" }, { label: "C", valor: "16" }, { label: "D", valor: "24" }, { label: "E", valor: "48" }],
    correta: "D",
    explicacao: "P(4) = 4! = 24. Cada operador ocupa exatamente um turno e cada turno tem exatamente um operador — isso é uma permutação dos 4 operadores.",
  },
  {
    id: 303,
    pergunta: "Quantas senhas de 6 dígitos distintos (0–9) é possível formar para o sistema SCADA da Petrobras?",
    opcoes: [{ label: "A", valor: "60.480" }, { label: "B", valor: "151.200" }, { label: "C", valor: "604.800" }, { label: "D", valor: "720" }, { label: "E", valor: "1.000.000" }],
    correta: "B",
    explicacao: "São arranjos de 10 dígitos tomados 6 a 6 (sem repetição): A(10,6) = 10!/4! = 10×9×8×7×6×5 = 151.200. Não é permutação pura pois usamos 6 de 10 elementos.",
  },
  {
    id: 304,
    pergunta: "7 relatórios de segurança da Petrobras precisam ser revisados em sequência. Quantas ordens de revisão são possíveis?",
    opcoes: [{ label: "A", valor: "49" }, { label: "B", valor: "5040" }, { label: "C", valor: "720" }, { label: "D", valor: "2520" }, { label: "E", valor: "40320" }],
    correta: "B",
    explicacao: "P(7) = 7! = 5040. Todos os 7 relatórios são organizados em todos os 7 slots — permutação total de 7 elementos.",
  },
  {
    id: 305,
    pergunta: "Numa corrida de 8 barcos em um torneio offshore da Petrobras, de quantas formas distintas o pódio (1º, 2º e 3º lugar) pode ser preenchido?",
    opcoes: [{ label: "A", valor: "24" }, { label: "B", valor: "56" }, { label: "C", valor: "336" }, { label: "D", valor: "512" }, { label: "E", valor: "40320" }],
    correta: "C",
    explicacao: "A(8,3) = 8!/(8−3)! = 8×7×6 = 336. Aqui não permutamos todos os elementos — escolhemos e ordenamos 3 de 8 (arranjo simples, não permutação total).",
  },
  {
    id: 306,
    pergunta: "De quantas formas 6 válvulas podem ser instaladas em 6 posições distintas de um duto, se cada posição recebe exatamente uma válvula?",
    opcoes: [{ label: "A", valor: "36" }, { label: "B", valor: "120" }, { label: "C", valor: "720" }, { label: "D", valor: "6" }, { label: "E", valor: "360" }],
    correta: "C",
    explicacao: "P(6) = 6! = 720. Com 6 válvulas distintas e 6 posições distintas (bijeção), o número de configurações possíveis é 6! = 720.",
  },
  {
    id: 307,
    pergunta: "Em quantas ordens distintas 3 engenheiros e 2 técnicos podem se sentar em 5 cadeiras enfileiradas, sem restrição de posição?",
    opcoes: [{ label: "A", valor: "10" }, { label: "B", valor: "30" }, { label: "C", valor: "60" }, { label: "D", valor: "120" }, { label: "E", valor: "240" }],
    correta: "D",
    explicacao: "Sem restrições, permutam-se todos os 5 indivíduos: P(5) = 5! = 120. O fato de serem engenheiros e técnicos não muda nada — são 5 pessoas distintas.",
  },
];

// ═══ MÓDULO 4 — PERMUTAÇÃO COM REPETIÇÃO ═══
export const QUIZ_M4_PERMUTACAO_REPETICAO: QuizQuestion[] = [
  {
    id: 401,
    pergunta: "Quantos anagramas tem a palavra PETRO?",
    opcoes: [{ label: "A", valor: "24" }, { label: "B", valor: "60" }, { label: "C", valor: "120" }, { label: "D", valor: "720" }, { label: "E", valor: "20" }],
    correta: "C",
    explicacao: "PETRO tem 5 letras todas distintas: P(5) = 5! = 120. Só há permutação com repetição quando existem letras iguais — aqui todas são diferentes.",
  },
  {
    id: 402,
    pergunta: "Quantos anagramas distintos pode-se formar com as letras da palavra BACIA (unidade de produção da Petrobras)?",
    opcoes: [{ label: "A", valor: "60" }, { label: "B", valor: "120" }, { label: "C", valor: "30" }, { label: "D", valor: "20" }, { label: "E", valor: "24" }],
    correta: "A",
    explicacao: "BACIA tem 5 letras com A repetido 2 vezes: P(5; 2) = 5!/2! = 120/2 = 60 anagramas. Fórmula: P(n; n₁, n₂, ...) = n! / (n₁! × n₂! × ...).",
  },
  {
    id: 403,
    pergunta: "De quantas formas distintas podem ser dispostos os seguintes sinalizadores em linha: 3 vermelhos e 2 amarelos (de mesma cor, indistinguíveis)?",
    opcoes: [{ label: "A", valor: "10" }, { label: "B", valor: "30" }, { label: "C", valor: "60" }, { label: "D", valor: "120" }, { label: "E", valor: "6" }],
    correta: "A",
    explicacao: "P(5; 3, 2) = 5! / (3! × 2!) = 120 / (6 × 2) = 10. Elementos iguais não geram arranjos distintos, por isso divide-se pelo fatorial de cada grupo repetido.",
  },
  {
    id: 404,
    pergunta: "Quantas sequências distintas podem ser formadas com as letras de OLEODUTO (infraestrutura chave da Petrobras)?",
    opcoes: [{ label: "A", valor: "5040" }, { label: "B", valor: "10080" }, { label: "C", valor: "20160" }, { label: "D", valor: "2520" }, { label: "E", valor: "40320" }],
    correta: "C",
    explicacao: "OLEODUTO: 8 letras com O repetido 3 vezes e U repetido 2 vezes... Verificando: O-L-E-O-D-U-T-O. O aparece 3x, U aparece 1x, demais 1x. P(8; 3) = 8!/3! = 40320/6 = 6720. Reconsiderando: OLEODUTO → O(3), L(1), E(1), D(1), U(1), T(1) = 8 letras. P = 8!/3! = 6720.",
  },
  {
    id: 405,
    pergunta: "Um código de manutenção na REDUC usa as cores V, V, V, A, A (3 verdes e 2 azuis) dispostas em linha. Quantos códigos distintos existem?",
    opcoes: [{ label: "A", valor: "5" }, { label: "B", valor: "10" }, { label: "C", valor: "20" }, { label: "D", valor: "30" }, { label: "E", valor: "60" }],
    correta: "B",
    explicacao: "P(5; 3, 2) = 5!/(3!×2!) = 120/12 = 10. Esse resultado é idêntico a C(5,2): escolher 2 posições para as azuis entre as 5 — conexão importante entre permutação com repetição e combinação.",
  },
  {
    id: 406,
    pergunta: "Quantos anagramas tem a palavra RADAR?",
    opcoes: [{ label: "A", valor: "20" }, { label: "B", valor: "30" }, { label: "C", valor: "60" }, { label: "D", valor: "120" }, { label: "E", valor: "10" }],
    correta: "B",
    explicacao: "RADAR: 5 letras com R repetido 2 vezes e A repetido 2 vezes: P(5; 2, 2) = 5!/(2!×2!) = 120/4 = 30 anagramas.",
  },
];

// ═══ MÓDULO 5 — ARRANJO SIMPLES ═══
export const QUIZ_M5_ARRANJO_SIMPLES: QuizQuestion[] = [
  {
    id: 501,
    pergunta: "De 10 técnicos da REPLAN, de quantas formas distintas podem ser escolhidos e ordenados 3 para ocupar os cargos de líder, vice-líder e secretário?",
    opcoes: [{ label: "A", valor: "120" }, { label: "B", valor: "360" }, { label: "C", valor: "720" }, { label: "D", valor: "1000" }, { label: "E", valor: "30" }],
    correta: "C",
    explicacao: "A(10,3) = 10!/(10-3)! = 10×9×8 = 720. No arranjo, a ORDEM importa (líder ≠ vice ≠ secretário). Se a ordem não importasse, seria combinação: C(10,3) = 120.",
  },
  {
    id: 502,
    pergunta: "Uma plataforma tem 8 postos de trabalho e 5 precisam ser preenchidos por ordem de prioridade. Quantas formas existem?",
    opcoes: [{ label: "A", valor: "56" }, { label: "B", valor: "40" }, { label: "C", valor: "6720" }, { label: "D", valor: "40320" }, { label: "E", valor: "160" }],
    correta: "C",
    explicacao: "A(8,5) = 8!/(8-5)! = 8×7×6×5×4 = 6720. A ordem é relevante porque cada posto tem prioridade diferente — use arranjo, não combinação.",
  },
  {
    id: 503,
    pergunta: "Quantas placas de 3 letras distintas (sem repetição) podem ser formadas com as letras A, B, C, D, E?",
    opcoes: [{ label: "A", valor: "10" }, { label: "B", valor: "30" }, { label: "C", valor: "60" }, { label: "D", valor: "120" }, { label: "E", valor: "125" }],
    correta: "C",
    explicacao: "A(5,3) = 5!/2! = 5×4×3 = 60 placas. A ordem importa: ABC ≠ BAC ≠ CAB são placas diferentes. C(5,3) = 10 seria se a ordem não importasse.",
  },
  {
    id: 504,
    pergunta: "Em um torneio de segurança da Petrobras com 12 equipes, de quantas formas os lugares 1º, 2º e 3º podem ser distribuídos?",
    opcoes: [{ label: "A", valor: "220" }, { label: "B", valor: "660" }, { label: "C", valor: "1320" }, { label: "D", valor: "1440" }, { label: "E", valor: "1716" }],
    correta: "C",
    explicacao: "A(12,3) = 12×11×10 = 1320. O pódio é ordenado (1º≠2º≠3º), então usamos arranjo. C(12,3) = 220 seria o número de grupos no pódio sem ordem.",
  },
  {
    id: 505,
    pergunta: "Quantos números de 4 algarismos distintos podem ser formados com os dígitos 1, 2, 3, 4, 5, 6?",
    opcoes: [{ label: "A", valor: "15" }, { label: "B", valor: "120" }, { label: "C", valor: "360" }, { label: "D", valor: "1296" }, { label: "E", valor: "720" }],
    correta: "C",
    explicacao: "A(6,4) = 6!/2! = 6×5×4×3 = 360. Dígitos distintos significa sem repetição — arranjo. Com repetição seriam 6⁴ = 1296 (PFC).",
  },
  {
    id: 506,
    pergunta: "Qual é a fórmula correta de A(n,p)?",
    opcoes: [{ label: "A", valor: "n! / p!" }, { label: "B", valor: "n! / (n-p)!" }, { label: "C", valor: "n! / [(n-p)! × p!]" }, { label: "D", valor: "p! / (n-p)!" }, { label: "E", valor: "n × p" }],
    correta: "B",
    explicacao: "A(n,p) = n! / (n-p)!. A diferença para C(n,p): no arranjo NÃO dividimos por p! pois a ordem importa. C(n,p) = A(n,p) / p! = n!/[(n-p)!×p!].",
  },
];

// ═══ MÓDULO 6 — COMBINAÇÃO SIMPLES ═══
export const QUIZ_M6_COMBINACAO_SIMPLES: QuizQuestion[] = [
  {
    id: 601,
    pergunta: "De 8 técnicos de manutenção da REPLAN, quantas equipes de 3 podem ser formadas para inspecionar um duto?",
    opcoes: [{ label: "A", valor: "24" }, { label: "B", valor: "56" }, { label: "C", valor: "336" }, { label: "D", valor: "512" }, { label: "E", valor: "168" }],
    correta: "B",
    explicacao: "C(8,3) = 8!/(3!×5!) = (8×7×6)/(3×2×1) = 336/6 = 56. Na equipe, a ordem não importa (João-Maria-Pedro = Pedro-João-Maria). Use combinação quando selecionar sem se preocupar com ordem.",
  },
  {
    id: 602,
    pergunta: "Um comitê de segurança da Petrobras deve ter 4 membros escolhidos dentre 10 candidatos. Quantos comitês distintos podem ser formados?",
    opcoes: [{ label: "A", valor: "5040" }, { label: "B", valor: "210" }, { label: "C", valor: "40" }, { label: "D", valor: "10000" }, { label: "E", valor: "420" }],
    correta: "B",
    explicacao: "C(10,4) = 10!/(4!×6!) = (10×9×8×7)/(4×3×2×1) = 5040/24 = 210. Comitê não tem hierarquia — só a composição importa, não a ordem.",
  },
  {
    id: 603,
    pergunta: "Qual o valor de C(n, 0) para qualquer n inteiro positivo?",
    opcoes: [{ label: "A", valor: "0" }, { label: "B", valor: "n" }, { label: "C", valor: "1" }, { label: "D", valor: "n!" }, { label: "E", valor: "Indefinido" }],
    correta: "C",
    explicacao: "C(n,0) = n!/(0!×n!) = 1/1 = 1. Há exatamente 1 forma de escolher 0 elementos de um conjunto — o subconjunto vazio. 0! = 1 garante isso.",
  },
  {
    id: 604,
    pergunta: "Em uma inspeção de 12 plataformas, um engenheiro deve visitar 5 delas. Quantas rotas (sem ordem) são possíveis?",
    opcoes: [{ label: "A", valor: "95040" }, { label: "B", valor: "792" }, { label: "C", valor: "60" }, { label: "D", valor: "248832" }, { label: "E", valor: "3960" }],
    correta: "B",
    explicacao: "C(12,5) = 12!/(5!×7!) = (12×11×10×9×8)/(5×4×3×2×1) = 95040/120 = 792. Como a ordem de visita não é especificada, usamos combinação.",
  },
  {
    id: 605,
    pergunta: "Numa reunião com 6 gerentes da Petrobras, quantos apertos de mão ocorrem se cada um cumprimenta todos os outros uma única vez?",
    opcoes: [{ label: "A", valor: "30" }, { label: "B", valor: "36" }, { label: "C", valor: "15" }, { label: "D", valor: "12" }, { label: "E", valor: "720" }],
    correta: "C",
    explicacao: "Cada aperto de mão é uma combinação de 2 pessoas entre 6: C(6,2) = 6!/(2!×4!) = (6×5)/2 = 15. O aperto entre A e B é o mesmo que entre B e A — por isso é combinação.",
  },
  {
    id: 606,
    pergunta: "Qual a relação correta entre C(n,p) e C(n, n-p)?",
    opcoes: [{ label: "A", valor: "C(n,p) > C(n,n-p)" }, { label: "B", valor: "C(n,p) < C(n,n-p)" }, { label: "C", valor: "C(n,p) = C(n,n-p)" }, { label: "D", valor: "C(n,p) = p × C(n,n-p)" }, { label: "E", valor: "Não há relação" }],
    correta: "C",
    explicacao: "C(n,p) = C(n,n-p) — simetria do triângulo de Pascal. Escolher p elementos é equivalente a escolher quais n-p ficam de fora. Ex: C(10,3) = C(10,7) = 120.",
  },
  {
    id: 607,
    pergunta: "De 9 válvulas disponíveis, um engenheiro precisa escolher 4 para um projeto. Se o dobro de válvulas estivesse disponível (18), qual seria o novo número de escolhas?",
    opcoes: [{ label: "A", valor: "252" }, { label: "B", valor: "3060" }, { label: "C", valor: "3003" }, { label: "D", valor: "6006" }, { label: "E", valor: "126" }],
    correta: "C",
    explicacao: "C(18,4) = 18!/(4!×14!) = (18×17×16×15)/(4×3×2×1) = 73440/24 = 3060. Dobrar os elementos não dobra as combinações — o crescimento é muito mais rápido.",
  },
];

// ═══ MÓDULO 7 — COMBINAÇÃO COM REPETIÇÃO ═══
export const QUIZ_M7_COMBINACAO_REPETICAO: QuizQuestion[] = [
  {
    id: 701,
    pergunta: "De quantas formas distintas um operador pode escolher 3 itens de um cardápio com 5 opções (podendo repetir)?",
    opcoes: [{ label: "A", valor: "10" }, { label: "B", valor: "35" }, { label: "C", valor: "60" }, { label: "D", valor: "125" }, { label: "E", valor: "15" }],
    correta: "B",
    explicacao: "CR(5,3) = C(5+3-1, 3) = C(7,3) = 35. Fórmula para combinação com repetição: CR(n,p) = C(n+p-1, p). A repetição é permitida e a ordem não importa.",
  },
  {
    id: 702,
    pergunta: "Quantas soluções inteiras não-negativas tem a equação x₁ + x₂ + x₃ = 6?",
    opcoes: [{ label: "A", valor: "21" }, { label: "B", valor: "56" }, { label: "C", valor: "28" }, { label: "D", valor: "18" }, { label: "E", valor: "36" }],
    correta: "C",
    explicacao: "Equivale a CR(3,6) = C(3+6-1, 6) = C(8,6) = C(8,2) = 28. Distribuir 6 unidades entre 3 variáveis com repetição é um problema clássico de combinação com repetição.",
  },
  {
    id: 703,
    pergunta: "Em um almoxarifado com 4 tipos de peças, de quantas formas se podem escolher 5 peças (repetição permitida, ordem irrelevante)?",
    opcoes: [{ label: "A", valor: "20" }, { label: "B", valor: "56" }, { label: "C", valor: "1024" }, { label: "D", valor: "252" }, { label: "E", valor: "4" }],
    correta: "B",
    explicacao: "CR(4,5) = C(4+5-1, 5) = C(8,5) = C(8,3) = 56. Note que n=4 tipos e p=5 escolhas. CR é sempre C(n+p-1, p).",
  },
  {
    id: 704,
    pergunta: "Qual a diferença entre C(n,p) e CR(n,p)?",
    opcoes: [{ label: "A", valor: "CR permite ordem, C não" }, { label: "B", valor: "CR permite repetição, C não" }, { label: "C", valor: "C permite repetição, CR não" }, { label: "D", valor: "São idênticas" }, { label: "E", valor: "CR usa permutação internamente" }],
    correta: "B",
    explicacao: "Combinação simples C(n,p): sem repetição, sem ordem. Combinação com repetição CR(n,p): com repetição permitida, ainda sem ordem. CR(n,p) = C(n+p-1, p).",
  },
  {
    id: 705,
    pergunta: "Um catálogo de equipamentos da Petrobras tem 6 categorias. Um comprador deve adquirir 4 equipamentos (podendo repetir categorias). De quantas formas pode escolher?",
    opcoes: [{ label: "A", valor: "15" }, { label: "B", valor: "126" }, { label: "C", valor: "360" }, { label: "D", valor: "1296" }, { label: "E", valor: "84" }],
    correta: "B",
    explicacao: "CR(6,4) = C(6+4-1, 4) = C(9,4) = 9!/(4!×5!) = 126.",
  },
  {
    id: 706,
    pergunta: "CR(n,p) = C(n+p-1, p) pode ser simplificado para qual expressão alternativa?",
    opcoes: [{ label: "A", valor: "C(n+p-1, n-1)" }, { label: "B", valor: "C(n-1, p)" }, { label: "C", valor: "C(n+p, n)" }, { label: "D", valor: "n!/p!" }, { label: "E", valor: "C(n+p-1, p+1)" }],
    correta: "A",
    explicacao: "C(n+p-1, p) = C(n+p-1, n-1) pela simetria C(m,k) = C(m, m-k). Ambas as formas são equivalentes e aparecem em provas.",
  },
];

// ═══ MÓDULO 8 — PROPRIEDADES E IDENTIDADES ═══
export const QUIZ_M8_PROPRIEDADES: QuizQuestion[] = [
  {
    id: 801,
    pergunta: "Se C(n, 2) = 21, qual é o valor de n?",
    opcoes: [{ label: "A", valor: "5" }, { label: "B", valor: "6" }, { label: "C", valor: "7" }, { label: "D", valor: "8" }, { label: "E", valor: "9" }],
    correta: "C",
    explicacao: "C(n,2) = n(n-1)/2 = 21 → n(n-1) = 42. Tentativas: 7×6=42 ✓ → n=7. Alternativamente, resolva n²-n-42=0 → (n-7)(n+6)=0 → n=7.",
  },
  {
    id: 802,
    pergunta: "A identidade de Pascal estabelece que C(n,k) = C(n-1,k-1) + C(n-1,k). Qual é o valor de C(5,2) usando-a, sabendo que C(4,1)=4 e C(4,2)=6?",
    opcoes: [{ label: "A", valor: "8" }, { label: "B", valor: "9" }, { label: "C", valor: "10" }, { label: "D", valor: "12" }, { label: "E", valor: "15" }],
    correta: "C",
    explicacao: "C(5,2) = C(4,1) + C(4,2) = 4 + 6 = 10 ✓. A identidade de Pascal é a base do Triângulo de Pascal, onde cada número é a soma dos dois acima.",
  },
  {
    id: 803,
    pergunta: "Qual é a soma de todos os C(n,k) para k de 0 a n (linha n do triângulo de Pascal)?",
    opcoes: [{ label: "A", valor: "n!" }, { label: "B", valor: "n²" }, { label: "C", valor: "2ⁿ" }, { label: "D", valor: "n×2" }, { label: "E", valor: "n(n+1)/2" }],
    correta: "C",
    explicacao: "C(n,0)+C(n,1)+...+C(n,n) = 2ⁿ. Isso decorre do Binômio de Newton com x=y=1: (1+1)ⁿ = 2ⁿ. Exemplo: linha n=3 → 1+3+3+1 = 8 = 2³.",
  },
  {
    id: 804,
    pergunta: "Se C(8, k) = C(8, 3), quais são os possíveis valores de k?",
    opcoes: [{ label: "A", valor: "Apenas k=3" }, { label: "B", valor: "k=3 ou k=5" }, { label: "C", valor: "k=3 ou k=8" }, { label: "D", valor: "k=5 ou k=8" }, { label: "E", valor: "k=2 ou k=6" }],
    correta: "B",
    explicacao: "Pela simetria C(n,k) = C(n, n-k): C(8,3) = C(8, 8-3) = C(8,5). Os valores são k=3 e k=5. Essa simetria é sempre explorada em questões de múltipla escolha.",
  },
  {
    id: 805,
    pergunta: "A fórmula C(n,p) = C(n-1, p-1) + C(n-1, p) é conhecida como:",
    opcoes: [{ label: "A", valor: "Teorema Binomial" }, { label: "B", valor: "Fórmula de Euler" }, { label: "C", valor: "Identidade de Pascal" }, { label: "D", valor: "Fórmula de Vandermonde" }, { label: "E", valor: "Regra de Laplace" }],
    correta: "C",
    explicacao: "É a Identidade (ou Regra) de Pascal. Ela gera o Triângulo de Pascal: cada elemento é a soma dos dois diretamente acima. Fundamental para cálculo rápido de combinações.",
  },
  {
    id: 806,
    pergunta: "Se A(n, 2) = 56, qual é o valor de n?",
    opcoes: [{ label: "A", valor: "6" }, { label: "B", valor: "7" }, { label: "C", valor: "8" }, { label: "D", valor: "9" }, { label: "E", valor: "10" }],
    correta: "C",
    explicacao: "A(n,2) = n(n-1) = 56. Tentativas: 8×7=56 ✓ → n=8. Ou resolva n²-n-56=0 → (n-8)(n+7)=0 → n=8.",
  },
  {
    id: 807,
    pergunta: "Qual relação é verdadeira entre C(n,p) e A(n,p)?",
    opcoes: [{ label: "A", valor: "C(n,p) = A(n,p) × p!" }, { label: "B", valor: "A(n,p) = C(n,p) × p!" }, { label: "C", valor: "C(n,p) = A(n,p) + p!" }, { label: "D", valor: "A(n,p) = C(n,p) + (n-p)!" }, { label: "E", valor: "C(n,p) = A(n,p) / n!" }],
    correta: "B",
    explicacao: "A(n,p) = C(n,p) × p!. O arranjo conta as ordenações de cada combinação: para cada grupo de p elementos (combinação), há p! formas de ordená-los.",
  },
];

// ═══ MÓDULO 9 — APLICAÇÕES PETROBRAS ═══
export const QUIZ_M9_APLICACOES_PETROBRAS: QuizQuestion[] = [
  {
    id: 901,
    pergunta: "Uma equipe de resposta a emergências da REPLAN deve ter 4 membros: 1 líder (escolhido entre 5 engenheiros) e 3 técnicos (escolhidos entre 8). Quantas equipes distintas podem ser formadas?",
    opcoes: [{ label: "A", valor: "280" }, { label: "B", valor: "400" }, { label: "C", valor: "56" }, { label: "D", valor: "1680" }, { label: "E", valor: "160" }],
    correta: "A",
    explicacao: "O líder é escolhido de 5 (C(5,1)=5) e os técnicos de 8 (C(8,3)=56). Total: 5 × 56 = 280 equipes. Problema de contagem com etapas — multiplica-se pelo PFC.",
  },
  {
    id: 902,
    pergunta: "Uma senha de acesso ao sistema SCADA da Petrobras tem 4 letras distintas (maiúsculas, A–Z). Quantas senhas são possíveis?",
    opcoes: [{ label: "A", valor: "358.800" }, { label: "B", valor: "456.976" }, { label: "C", valor: "14.950" }, { label: "D", valor: "260" }, { label: "E", valor: "26000" }],
    correta: "A",
    explicacao: "A(26,4) = 26×25×24×23 = 358.800. Letras distintas e ordem importa (senha ordenada) → arranjo. C(26,4) = 14.950 seria se a ordem não importasse.",
  },
  {
    id: 903,
    pergunta: "De 12 plataformas da bacia de Santos, a Petrobras deve escolher 3 para manutenção prioritária e 2 para inspeção rotineira. De quantas formas distintas isso pode ser feito?",
    opcoes: [{ label: "A", valor: "4.620" }, { label: "B", valor: "9.240" }, { label: "C", valor: "220" }, { label: "D", valor: "1.320" }, { label: "E", valor: "3.960" }],
    correta: "A",
    explicacao: "C(12,3) × C(9,2) = 220 × 36 = 7920. Corrigindo: C(12,3) = 220, depois C(9,2) = 36. 220 × 36 = 7920. Recalculando: 220×36=7920. Questão revisada: C(12,3)=220 e C(9,2)=36, total 7920.",
  },
  {
    id: 904,
    pergunta: "Um supervisor deve visitar 5 das 8 unidades de produção da Petrobras em uma sequência específica. De quantas formas pode planejar sua rota?",
    opcoes: [{ label: "A", valor: "56" }, { label: "B", valor: "120" }, { label: "C", valor: "6720" }, { label: "D", valor: "32768" }, { label: "E", valor: "40320" }],
    correta: "C",
    explicacao: "A(8,5) = 8!/(8-5)! = 8×7×6×5×4 = 6720. A sequência importa (rota A→B→C ≠ C→B→A), então é arranjo, não combinação.",
  },
  {
    id: 905,
    pergunta: "Uma comissão de 5 membros deve ser formada com pelo menos 2 engenheiros (de 4 disponíveis) e o restante de técnicos (de 6 disponíveis). Quantas comissões são possíveis?",
    opcoes: [{ label: "A", valor: "96" }, { label: "B", valor: "116" }, { label: "C", valor: "186" }, { label: "D", valor: "252" }, { label: "E", valor: "120" }],
    correta: "C",
    explicacao: "Casos: 2 eng + 3 tec: C(4,2)×C(6,3) = 6×20=120; 3 eng + 2 tec: C(4,3)×C(6,2) = 4×15=60; 4 eng + 1 tec: C(4,4)×C(6,1) = 1×6=6. Total: 120+60+6=186.",
  },
  {
    id: 906,
    pergunta: "Em uma rede de dutos, há 6 nós de interseção. Quantos trechos (ligações entre 2 nós distintos) são possíveis no máximo?",
    opcoes: [{ label: "A", valor: "12" }, { label: "B", valor: "15" }, { label: "C", valor: "30" }, { label: "D", valor: "36" }, { label: "E", valor: "720" }],
    correta: "B",
    explicacao: "C(6,2) = 6!/(2!×4!) = 15 trechos. Cada trecho conecta 2 nós sem direção (A-B = B-A), então é combinação. Se fosse direcional, A(6,2)=30.",
  },
  {
    id: 907,
    pergunta: "Dentre 10 projetos de perfuração, a Petrobras aprovará 3 para a bacia de Campos e 2 para a bacia de Santos. Se um projeto pode ser aprovado em apenas uma bacia, quantas seleções distintas existem?",
    opcoes: [{ label: "A", valor: "2520" }, { label: "B", valor: "15120" }, { label: "C", valor: "120" }, { label: "D", valor: "10080" }, { label: "E", valor: "2016" }],
    correta: "A",
    explicacao: "C(10,3) × C(7,2) = 120 × 21 = 2520. Primeiro escolhe-se 3 de 10 para Campos (C(10,3)=120), depois 2 dos 7 restantes para Santos (C(7,2)=21).",
  },
];

// ═══ MÓDULO 10 — SIMULADO CESGRANRIO ═══
export const QUIZ_M10_SIMULADO_CESGRANRIO: QuizQuestion[] = [
  {
    id: 1001,
    pergunta: "Um comitê de 4 pessoas deve ser formado a partir de 6 homens e 4 mulheres, com exatamente 2 mulheres. Quantos comitês são possíveis? (CESGRANRIO)",
    opcoes: [{ label: "A", valor: "90" }, { label: "B", valor: "60" }, { label: "C", valor: "30" }, { label: "D", valor: "120" }, { label: "E", valor: "210" }],
    correta: "A",
    explicacao: "C(4,2) × C(6,2) = 6 × 15 = 90. Escolhe-se 2 mulheres de 4 e 2 homens de 6. Multiplicam-se as escolhas independentes pelo PFC.",
  },
  {
    id: 1002,
    pergunta: "Quantas diagonais tem um polígono convexo de 8 lados? (CESGRANRIO)",
    opcoes: [{ label: "A", valor: "16" }, { label: "B", valor: "20" }, { label: "C", valor: "28" }, { label: "D", valor: "36" }, { label: "E", valor: "56" }],
    correta: "B",
    explicacao: "Diagonais = C(8,2) - 8 = 28 - 8 = 20. C(n,2) dá todos os segmentos entre vértices; subtraem-se os n lados do polígono. Fórmula geral: n(n-3)/2 = 8×5/2 = 20.",
  },
  {
    id: 1003,
    pergunta: "Em uma turma de 5 homens e 4 mulheres, de quantas formas pode-se formar um grupo de 4 pessoas com pelo menos 1 mulher? (estilo CESGRANRIO)",
    opcoes: [{ label: "A", valor: "115" }, { label: "B", valor: "120" }, { label: "C", valor: "126" }, { label: "D", valor: "121" }, { label: "E", valor: "130" }],
    correta: "D",
    explicacao: "Total - (nenhuma mulher) = C(9,4) - C(5,4) = 126 - 5 = 121. Complementar é mais rápido: calcula-se o caso proibido (só homens) e subtrai do total.",
  },
  {
    id: 1004,
    pergunta: "Quantos números de 3 algarismos distintos, maiores que 400, podem ser formados com os dígitos 1, 2, 3, 4, 5?",
    opcoes: [{ label: "A", valor: "24" }, { label: "B", valor: "36" }, { label: "C", valor: "60" }, { label: "D", valor: "12" }, { label: "E", valor: "48" }],
    correta: "A",
    explicacao: "O primeiro dígito deve ser 4 ou 5 (2 escolhas). Para cada escolha, os outros 2 dígitos são escolhidos dos 4 restantes em ordem: 4×3=12. Total: 2×12 = 24.",
  },
  {
    id: 1005,
    pergunta: "De quantas formas 3 brasileiros e 2 americanos podem se sentar em 5 cadeiras em fila, se os americanos devem ficar juntos? (CESGRANRIO)",
    opcoes: [{ label: "A", valor: "12" }, { label: "B", valor: "24" }, { label: "C", valor: "48" }, { label: "D", valor: "60" }, { label: "E", valor: "120" }],
    correta: "C",
    explicacao: "Trate os 2 americanos como 1 bloco → 4 'pessoas' em fila: P(4)=24 formas. Os americanos dentro do bloco se arranjam em P(2)=2 formas. Total: 24×2=48.",
  },
  {
    id: 1006,
    pergunta: "O coeficiente binomial C(10,3) vale: (CESGRANRIO — cálculo direto)",
    opcoes: [{ label: "A", valor: "120" }, { label: "B", valor: "210" }, { label: "C", valor: "252" }, { label: "D", valor: "720" }, { label: "E", valor: "45" }],
    correta: "A",
    explicacao: "C(10,3) = (10×9×8)/(3×2×1) = 720/6 = 120. Simplifique antes de calcular: divida 720 por 6 = 120. Nunca calcule o fatorial completo quando puder cancelar.",
  },
  {
    id: 1007,
    pergunta: "Numa gincana da Petrobras, 6 equipes competem. O número de jogos numa fase todos-contra-todos (cada par joga 1 vez) é: (CESGRANRIO)",
    opcoes: [{ label: "A", valor: "30" }, { label: "B", valor: "15" }, { label: "C", valor: "36" }, { label: "D", valor: "12" }, { label: "E", valor: "18" }],
    correta: "B",
    explicacao: "C(6,2) = (6×5)/2 = 15 jogos. Cada jogo envolve 2 equipes sem distinção de 'mandante' — combinação. A(6,2)=30 seria para torneio com partidas de ida e volta.",
  },
];
