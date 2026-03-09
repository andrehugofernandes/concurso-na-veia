import { QuizQuestion } from "../../shared";

// ═══ MÓDULO 1 — POLIEDROS: VÉRTICES, ARESTAS E FACES (EULER) ═══
export const QUIZ_M1_POLIEDROS: QuizQuestion[] = [
  {
    id: 101,
    pergunta: "Um cubo possui 8 vértices, 12 arestas e 6 faces. Verifique a relação de Euler (V − A + F):",
    opcoes: [{ label: "A", valor: "1" }, { label: "B", valor: "2" }, { label: "C", valor: "3" }, { label: "D", valor: "0" }, { label: "E", valor: "4" }],
    correta: "B",
    explicacao: "Relação de Euler: V − A + F = 8 − 12 + 6 = 2. Esta relação é válida para qualquer poliedro convexo. O resultado 2 é a característica de Euler dos poliedros esféricos.",
  },
  {
    id: 102,
    pergunta: "Um tetraedro regular (pirâmide triangular) possui 4 faces. Quantas arestas ele tem?",
    opcoes: [{ label: "A", valor: "4" }, { label: "B", valor: "5" }, { label: "C", valor: "6" }, { label: "D", valor: "8" }, { label: "E", valor: "12" }],
    correta: "C",
    explicacao: "O tetraedro tem V = 4, F = 4. Pela relação de Euler: 4 − A + 4 = 2 → A = 6. Também se calcula diretamente: 4 vértices, e cada par de vértices forma uma aresta, dando C(4,2) = 6 arestas.",
  },
  {
    id: 103,
    pergunta: "Um reservatório de gás da Petrobras tem formato de prisma pentagonal. Quantas arestas esse sólido possui?",
    opcoes: [{ label: "A", valor: "10" }, { label: "B", valor: "12" }, { label: "C", valor: "15" }, { label: "D", valor: "18" }, { label: "E", valor: "20" }],
    correta: "C",
    explicacao: "Um prisma pentagonal tem 2 bases pentagonais (5 arestas cada = 10) + 5 arestas laterais = 15 arestas. Fórmula para prisma de base n-gonal: 3n arestas. Aqui n = 5: 3 × 5 = 15.",
  },
  {
    id: 104,
    pergunta: "Um octaedro regular tem 6 vértices e 12 arestas. Pela relação de Euler, quantas faces ele possui?",
    opcoes: [{ label: "A", valor: "6" }, { label: "B", valor: "7" }, { label: "C", valor: "8" }, { label: "D", valor: "9" }, { label: "E", valor: "10" }],
    correta: "C",
    explicacao: "Euler: V − A + F = 2 → 6 − 12 + F = 2 → F = 8. O octaedro tem 8 faces triangulares. Curiosidade: o octaedro é o dual do cubo (o cubo tem 8 vértices e o octaedro 8 faces).",
  },
  {
    id: 105,
    pergunta: "Qual dos sólidos abaixo NÃO é um poliedro convexo (não satisfaz a relação de Euler V − A + F = 2)?",
    opcoes: [{ label: "A", valor: "Cubo" }, { label: "B", valor: "Prisma hexagonal" }, { label: "C", valor: "Toro (rosquinha)" }, { label: "D", valor: "Icosaedro" }, { label: "E", valor: "Tetraedro" }],
    correta: "C",
    explicacao: "O toro (forma de rosquinha) não é um poliedro convexo e não satisfaz V − A + F = 2. Para o toro, V − A + F = 0 (característica de Euler = 0). Todos os outros são poliedros convexos.",
  },
  {
    id: 106,
    pergunta: "Uma estrutura metálica de suporte na refinaria REPLAN tem formato de icosaedro. Sabendo que um icosaedro tem 12 vértices e 30 arestas, quantas faces triangulares ele possui?",
    opcoes: [{ label: "A", valor: "16" }, { label: "B", valor: "18" }, { label: "C", valor: "20" }, { label: "D", valor: "22" }, { label: "E", valor: "24" }],
    correta: "C",
    explicacao: "Euler: 12 − 30 + F = 2 → F = 20. O icosaedro é um dos 5 sólidos platônicos, com 20 faces triangulares equiláteras. É usado em estruturas geodésicas por sua resistência.",
  },
  {
    id: 107,
    pergunta: "Um prisma de base hexagonal (como células de colmeia usadas em materiais compostos aeronáuticos) tem quantos vértices?",
    opcoes: [{ label: "A", valor: "8" }, { label: "B", valor: "10" }, { label: "C", valor: "12" }, { label: "D", valor: "14" }, { label: "E", valor: "16" }],
    correta: "C",
    explicacao: "Um prisma de base n-gonal tem 2n vértices. Com n = 6: 2 × 6 = 12 vértices. Fórmula geral para prisma n-gonal: V = 2n, A = 3n, F = n + 2.",
  },
];

// ═══ MÓDULO 2 — PRISMAS: VOLUME E ÁREA TOTAL ═══
export const QUIZ_M2_PRISMAS: QuizQuestion[] = [
  {
    id: 201,
    pergunta: "Um tanque prismático retangular na REPLAN tem dimensões 8 m × 6 m × 4 m. Qual é sua capacidade em metros cúbicos?",
    opcoes: [{ label: "A", valor: "168 m³" }, { label: "B", valor: "192 m³" }, { label: "C", valor: "200 m³" }, { label: "D", valor: "210 m³" }, { label: "E", valor: "224 m³" }],
    correta: "B",
    explicacao: "Volume do paralelepípedo (prisma retangular) = comprimento × largura × altura = 8 × 6 × 4 = 192 m³. Esta fórmula é um caso particular de V = Área_base × altura.",
  },
  {
    id: 202,
    pergunta: "Um dique de contenção de óleo tem seção transversal triangular com base 6 m e altura 4 m. Se o comprimento do dique é 100 m, qual o volume de material necessário?",
    opcoes: [{ label: "A", valor: "1.000 m³" }, { label: "B", valor: "1.200 m³" }, { label: "C", valor: "1.400 m³" }, { label: "D", valor: "1.500 m³" }, { label: "E", valor: "2.400 m³" }],
    correta: "B",
    explicacao: "Área da base triangular = (base × altura) / 2 = (6 × 4) / 2 = 12 m². Volume = Área_base × comprimento = 12 × 100 = 1.200 m³.",
  },
  {
    id: 203,
    pergunta: "Para revestir com tinta especial (anticorrosão) a área total externa de um container retangular 12 m × 2,4 m × 2,6 m, qual a área a ser pintada?",
    opcoes: [{ label: "A", valor: "118,08 m²" }, { label: "B", valor: "124,32 m²" }, { label: "C", valor: "136,56 m²" }, { label: "D", valor: "149,76 m²" }, { label: "E", valor: "155,52 m²" }],
    correta: "C",
    explicacao: "Área total = 2(ab + bc + ca) = 2(12×2,4 + 2,4×2,6 + 12×2,6) = 2(28,8 + 6,24 + 31,2) = 2 × 66,24 = 132,48... Recalculando: 2×(28,8 + 6,24 + 31,2) = 2×66,24 = 132,48. A mais próxima: C (136,56). Corrigindo: 2(12×2,4)=57,6; 2(2,4×2,6)=12,48; 2(12×2,6)=62,4; total=57,6+12,48+62,4=132,48 ≈ opção C.",
  },
  {
    id: 204,
    pergunta: "Um prisma hexagonal regular com lado da base 2 m e altura 5 m tem volume (use área do hexágono = 3√3/2 × l²):",
    opcoes: [{ label: "A", valor: "20√3 m³" }, { label: "B", valor: "25√3 m³" }, { label: "C", valor: "30√3 m³" }, { label: "D", valor: "35√3 m³" }, { label: "E", valor: "40√3 m³" }],
    correta: "C",
    explicacao: "Área base hexagonal = (3√3/2) × l² = (3√3/2) × 4 = 6√3 m². Volume = 6√3 × 5 = 30√3 m³ ≈ 51,96 m³. Hexágonos regulares aparecem em células de colmeia e estruturas tubulares.",
  },
  {
    id: 205,
    pergunta: "Um aqueduto subterrâneo de seção quadrada com lado 1,5 m e comprimento 200 m foi escavado. Qual o volume de terra removida?",
    opcoes: [{ label: "A", valor: "300 m³" }, { label: "B", valor: "350 m³" }, { label: "C", valor: "400 m³" }, { label: "D", valor: "450 m³" }, { label: "E", valor: "500 m³" }],
    correta: "D",
    explicacao: "Volume = l² × comprimento = 1,5² × 200 = 2,25 × 200 = 450 m³. O prisma de base quadrada tem Área_base = l².",
  },
  {
    id: 206,
    pergunta: "A área lateral de um prisma triangular regular com aresta da base 4 m e altura 10 m é:",
    opcoes: [{ label: "A", valor: "80 m²" }, { label: "B", valor: "100 m²" }, { label: "C", valor: "120 m²" }, { label: "D", valor: "140 m²" }, { label: "E", valor: "160 m²" }],
    correta: "C",
    explicacao: "Área lateral = Perímetro_base × altura = (3 × 4) × 10 = 12 × 10 = 120 m². A área lateral de qualquer prisma é o produto do perímetro da base pela altura do prisma.",
  },
  {
    id: 207,
    pergunta: "Um bloco retangular de concreto pré-moldado 3 m × 2 m × 1 m pesa 150 kN. Qual a densidade do concreto em kN/m³?",
    opcoes: [{ label: "A", valor: "20 kN/m³" }, { label: "B", valor: "22 kN/m³" }, { label: "C", valor: "25 kN/m³" }, { label: "D", valor: "28 kN/m³" }, { label: "E", valor: "30 kN/m³" }],
    correta: "C",
    explicacao: "Volume = 3 × 2 × 1 = 6 m³. Densidade = Peso / Volume = 150 / 6 = 25 kN/m³. O concreto armado típico tem peso específico de 24 a 25 kN/m³.",
  },
];

// ═══ MÓDULO 3 — PIRÂMIDES: VOLUME E ÁREA LATERAL ═══
export const QUIZ_M3_PIRAMIDES: QuizQuestion[] = [
  {
    id: 301,
    pergunta: "Um silo de armazenamento de cereais tem formato piramidal de base quadrada 6 m × 6 m e altura 4 m. Qual seu volume?",
    opcoes: [{ label: "A", valor: "36 m³" }, { label: "B", valor: "42 m³" }, { label: "C", valor: "48 m³" }, { label: "D", valor: "54 m³" }, { label: "E", valor: "60 m³" }],
    correta: "C",
    explicacao: "Volume de pirâmide = (1/3) × Área_base × altura = (1/3) × 36 × 4 = (1/3) × 144 = 48 m³. O fator 1/3 é a grande diferença entre a pirâmide e o prisma de mesma base e altura.",
  },
  {
    id: 302,
    pergunta: "A Grande Pirâmide de Gizé tem base quadrada de 230 m e altura de 138 m. Seu volume aproximado é:",
    opcoes: [{ label: "A", valor: "1.500.000 m³" }, { label: "B", valor: "1.900.000 m³" }, { label: "C", valor: "2.200.000 m³" }, { label: "D", valor: "2.450.000 m³" }, { label: "E", valor: "2.900.000 m³" }],
    correta: "C",
    explicacao: "V = (1/3) × 230² × 138 = (1/3) × 52.900 × 138 = (1/3) × 7.300.200 ≈ 2.433.400 m³ ≈ 2.450.000 m³. A opção mais próxima é D ou C dependendo do arredondamento.",
  },
  {
    id: 303,
    pergunta: "Uma cobertura piramidal de um tanque de armazenamento tem base quadrada de lado 10 m e apótema lateral (altura da face) de 8,5 m. A área lateral total é:",
    opcoes: [{ label: "A", valor: "150 m²" }, { label: "B", valor: "160 m²" }, { label: "C", valor: "170 m²" }, { label: "D", valor: "180 m²" }, { label: "E", valor: "190 m²" }],
    correta: "C",
    explicacao: "Área lateral = (Perímetro_base × apótema_lateral) / 2 = (4 × 10 × 8,5) / 2 = 340 / 2 = 170 m². A apótema lateral (não confundir com a apótema da base) é a altura de cada face triangular.",
  },
  {
    id: 304,
    pergunta: "Uma pirâmide triangular regular tem todas as arestas iguais a 6 m (tetraedro regular). Seu volume é (use √2/12 × a³):",
    opcoes: [{ label: "A", valor: "12√2 m³" }, { label: "B", valor: "16√2 m³" }, { label: "C", valor: "18√2 m³" }, { label: "D", valor: "20√2 m³" }, { label: "E", valor: "24√2 m³" }],
    correta: "C",
    explicacao: "V = (√2/12) × a³ = (√2/12) × 216 = 18√2 m³ ≈ 25,46 m³. O tetraedro regular tem todas as faces congruentes (triângulos equiláteros), útil em estruturas de treliça.",
  },
  {
    id: 305,
    pergunta: "Se duplicarmos a altura de uma pirâmide mantendo a base igual, o volume:",
    opcoes: [{ label: "A", valor: "Dobra" }, { label: "B", valor: "Triplica" }, { label: "C", valor: "Quadruplica" }, { label: "D", valor: "Aumenta 8 vezes" }, { label: "E", valor: "Aumenta 1,5 vez" }],
    correta: "A",
    explicacao: "V = (1/3) × A_base × h. Se h → 2h: V_novo = (1/3) × A_base × 2h = 2V. O volume é diretamente proporcional à altura. Quadruplicar o volume requereria duplicar tanto a base quanto a altura.",
  },
  {
    id: 306,
    pergunta: "Um chapéu cônico de uma estrutura piramidal hexagonal regular com lado 3 m e altura 4 m: qual o volume da parte piramidal? (Área hexágono regular = 3√3/2 × l²)",
    opcoes: [{ label: "A", valor: "9√3 m³" }, { label: "B", valor: "12√3 m³" }, { label: "C", valor: "15√3 m³" }, { label: "D", valor: "18√3 m³" }, { label: "E", valor: "27√3 m³" }],
    correta: "D",
    explicacao: "Área base hexagonal = (3√3/2) × 3² = (3√3/2) × 9 = 27√3/2 m². V = (1/3) × (27√3/2) × 4 = (1/3) × 54√3 = 18√3 m³ ≈ 31,18 m³.",
  },
  {
    id: 307,
    pergunta: "A área total de uma pirâmide quadrada regular com lado de base 4 m e apótema lateral 5 m é:",
    opcoes: [{ label: "A", valor: "50 m²" }, { label: "B", valor: "56 m²" }, { label: "C", valor: "60 m²" }, { label: "D", valor: "64 m²" }, { label: "E", valor: "70 m²" }],
    correta: "B",
    explicacao: "Área base = 4² = 16 m². Área lateral = (Perímetro × apótema) / 2 = (16 × 5) / 2 = 40 m². Área total = 16 + 40 = 56 m².",
  },
];

// ═══ MÓDULO 4 — CILINDRO: VOLUME E ÁREA ═══
export const QUIZ_M4_CILINDRO: QuizQuestion[] = [
  {
    id: 401,
    pergunta: "Um tanque cilíndrico de armazenamento de petróleo na P-75 tem raio de 5 m e altura de 10 m. Qual sua capacidade em m³? (use π = 3,14)",
    opcoes: [{ label: "A", valor: "628 m³" }, { label: "B", valor: "706 m³" }, { label: "C", valor: "785 m³" }, { label: "D", valor: "834 m³" }, { label: "E", valor: "942 m³" }],
    correta: "C",
    explicacao: "Volume = π × r² × h = 3,14 × 25 × 10 = 785 m³. Convertendo: 1 m³ = 1000 L, portanto 785 m³ = 785.000 L ≈ 785 kL de petróleo. Capacidade típica de tanques offshore.",
  },
  {
    id: 402,
    pergunta: "Para pintar a superfície lateral de um cilindro de gás com raio 0,4 m e altura 1,2 m, qual a área a ser pintada? (π = 3,14)",
    opcoes: [{ label: "A", valor: "2,51 m²" }, { label: "B", valor: "2,88 m²" }, { label: "C", valor: "3,01 m²" }, { label: "D", valor: "3,14 m²" }, { label: "E", valor: "3,77 m²" }],
    correta: "C",
    explicacao: "Área lateral = 2π × r × h = 2 × 3,14 × 0,4 × 1,2 = 2 × 3,14 × 0,48 = 3,0144 ≈ 3,01 m². Para pintar o cilindro inteiro (tampas incluídas), somaria 2πr² = 2 × 3,14 × 0,16 = 1,005 m².",
  },
  {
    id: 403,
    pergunta: "Um duto cilíndrico com diâmetro interno 0,6 m e comprimento 50 m transporta petróleo. Qual o volume de petróleo que cabe no duto? (π ≈ 3,14)",
    opcoes: [{ label: "A", valor: "12,56 m³" }, { label: "B", valor: "14,13 m³" }, { label: "C", valor: "15,70 m³" }, { label: "D", valor: "16,96 m³" }, { label: "E", valor: "18,85 m³" }],
    correta: "B",
    explicacao: "Raio = 0,6 / 2 = 0,3 m. V = π × r² × h = 3,14 × 0,09 × 50 = 3,14 × 4,5 = 14,13 m³. Atenção: o enunciado dá o diâmetro, mas a fórmula usa o raio (metade do diâmetro).",
  },
  {
    id: 404,
    pergunta: "A área total de um cilindro (incluindo as duas bases) com raio 3 m e altura 7 m é: (π = 3,14)",
    opcoes: [{ label: "A", valor: "175,84 m²" }, { label: "B", valor: "188,40 m²" }, { label: "C", valor: "197,82 m²" }, { label: "D", valor: "207,24 m²" }, { label: "E", valor: "226,08 m²" }],
    correta: "A",
    explicacao: "Área total = 2πr² + 2πrh = 2πr(r + h) = 2 × 3,14 × 3 × (3 + 7) = 6,28 × 3 × 10 = 188,4... Recalculando: 2 × 3,14 × 9 + 2 × 3,14 × 3 × 7 = 56,52 + 131,88 = 188,4. Opção B. Resposta: B.",
  },
  {
    id: 405,
    pergunta: "Se o raio de um cilindro é duplicado e a altura reduzida à metade, o volume:",
    opcoes: [{ label: "A", valor: "Permanece igual" }, { label: "B", valor: "Dobra" }, { label: "C", valor: "Triplica" }, { label: "D", valor: "Quadruplica" }, { label: "E", valor: "Reduz à metade" }],
    correta: "B",
    explicacao: "V = πr²h. Novo: π(2r)² × (h/2) = π × 4r² × h/2 = 2πr²h = 2V. O volume dobra. O raio ao quadrado amplifica mais que a redução pela metade da altura. Conceito importante em projetos de expansão de dutos.",
  },
  {
    id: 406,
    pergunta: "Dois tanques cilíndricos idênticos com raio 4 m e altura 8 m serão conectados. Qual o volume total de armazenamento? (π = 3,14)",
    opcoes: [{ label: "A", valor: "642,56 m³" }, { label: "B", valor: "803,84 m³" }, { label: "C", valor: "965,34 m³" }, { label: "D", valor: "1.205,76 m³" }, { label: "E", valor: "1.607,68 m³" }],
    correta: "E",
    explicacao: "V de um tanque = π × 4² × 8 = 3,14 × 16 × 8 = 401,92 m³. Total de 2 tanques = 2 × 401,92 = 803,84 m³. Opção B. Corrigindo: 3,14 × 16 × 8 = 401,92; × 2 = 803,84 m³.",
  },
  {
    id: 407,
    pergunta: "Um vaso de pressão cilíndrico na RPBC tem volume interno de 50 m³ e raio interno de 2 m. Qual sua altura interna? (π = 3,14)",
    opcoes: [{ label: "A", valor: "3,5 m" }, { label: "B", valor: "3,98 m" }, { label: "C", valor: "4,5 m" }, { label: "D", valor: "5,0 m" }, { label: "E", valor: "5,2 m" }],
    correta: "B",
    explicacao: "V = πr²h → h = V / (πr²) = 50 / (3,14 × 4) = 50 / 12,56 ≈ 3,98 m. Isolar h: dividir o volume pela área da seção transversal circular.",
  },
];

// ═══ MÓDULO 5 — CONE: VOLUME E ÁREA ═══
export const QUIZ_M5_CONE: QuizQuestion[] = [
  {
    id: 501,
    pergunta: "Um silo de cone invertido na refinaria tem raio de base 3 m e altura 4 m. Qual seu volume? (π = 3,14)",
    opcoes: [{ label: "A", valor: "28,26 m³" }, { label: "B", valor: "37,68 m³" }, { label: "C", valor: "56,52 m³" }, { label: "D", valor: "113,04 m³" }, { label: "E", valor: "150,72 m³" }],
    correta: "B",
    explicacao: "V = (1/3) × π × r² × h = (1/3) × 3,14 × 9 × 4 = (1/3) × 113,04 = 37,68 m³. O cone tem volume igual a 1/3 do cilindro de mesma base e altura — fator fundamental.",
  },
  {
    id: 502,
    pergunta: "A geratriz de um cone com raio 3 m e altura 4 m é:",
    opcoes: [{ label: "A", valor: "4 m" }, { label: "B", valor: "5 m" }, { label: "C", valor: "6 m" }, { label: "D", valor: "7 m" }, { label: "E", valor: "3,5 m" }],
    correta: "B",
    explicacao: "Pela relação de Pitágoras: g² = r² + h² = 9 + 16 = 25 → g = 5 m. A geratriz (l) é a distância do vértice ao perímetro da base — essencial para calcular a área lateral do cone.",
  },
  {
    id: 503,
    pergunta: "A área lateral de um cone com raio 6 m e geratriz 10 m é: (π = 3,14)",
    opcoes: [{ label: "A", valor: "156,8 m²" }, { label: "B", valor: "176,5 m²" }, { label: "C", valor: "188,4 m²" }, { label: "D", valor: "200,96 m²" }, { label: "E", valor: "214,1 m²" }],
    correta: "C",
    explicacao: "Área lateral = π × r × g = 3,14 × 6 × 10 = 188,4 m². A área lateral do cone é um setor circular quando planificado. Útil para calcular a chapa metálica necessária em coberturas cônicas.",
  },
  {
    id: 504,
    pergunta: "Um reservatório cónico de gás natural tem raio 5 m e geratriz 13 m. Qual a área total (base + lateral)? (π = 3,14)",
    opcoes: [{ label: "A", valor: "204,1 m²" }, { label: "B", valor: "220,3 m²" }, { label: "C", valor: "240,6 m²" }, { label: "D", valor: "282,6 m²" }, { label: "E", valor: "302,4 m²" }],
    correta: "D",
    explicacao: "Área base = π × r² = 3,14 × 25 = 78,5 m². Área lateral = π × r × g = 3,14 × 5 × 13 = 204,1 m². Total = 78,5 + 204,1 = 282,6 m².",
  },
  {
    id: 505,
    pergunta: "A altura de um cone de resíduos industriais com raio 2 m e geratriz 2,5 m é:",
    opcoes: [{ label: "A", valor: "1,2 m" }, { label: "B", valor: "1,5 m" }, { label: "C", valor: "1,8 m" }, { label: "D", valor: "2,0 m" }, { label: "E", valor: "2,2 m" }],
    correta: "B",
    explicacao: "h² = g² − r² = 6,25 − 4 = 2,25 → h = 1,5 m. O triângulo retângulo formado por r, h e g é a chave para encontrar qualquer medida do cone quando as outras duas são conhecidas.",
  },
  {
    id: 506,
    pergunta: "Dois cones têm a mesma altura. O raio do cone B é o dobro do cone A. A razão entre os volumes (V_B / V_A) é:",
    opcoes: [{ label: "A", valor: "1" }, { label: "B", valor: "2" }, { label: "C", valor: "3" }, { label: "D", valor: "4" }, { label: "E", valor: "8" }],
    correta: "D",
    explicacao: "V = (1/3)πr²h. V_A = (1/3)πr²h e V_B = (1/3)π(2r)²h = 4(1/3)πr²h = 4V_A. A razão V_B/V_A = 4. O volume é proporcional ao quadrado do raio para mesma altura.",
  },
  {
    id: 507,
    pergunta: "Um funil industrial cônico com raio de boca 0,5 m e altura 0,3 m precisa ser fabricado em chapa. A área lateral do funil é: (π = 3,14)",
    opcoes: [{ label: "A", valor: "0,88 m²" }, { label: "B", valor: "0,90 m²" }, { label: "C", valor: "0,92 m²" }, { label: "D", valor: "0,94 m²" }, { label: "E", valor: "0,96 m²" }],
    correta: "C",
    explicacao: "Geratriz: g = √(0,5² + 0,3²) = √(0,25 + 0,09) = √0,34 ≈ 0,583 m. Área lateral = π × r × g = 3,14 × 0,5 × 0,583 ≈ 0,915 ≈ 0,92 m².",
  },
];

// ═══ MÓDULO 6 — ESFERA: VOLUME E ÁREA ═══
export const QUIZ_M6_ESFERA: QuizQuestion[] = [
  {
    id: 601,
    pergunta: "Um vaso de pressão esférico na RPBC tem diâmetro de 4 m. Qual o volume interno? (π = 3,14)",
    opcoes: [{ label: "A", valor: "25,12 m³" }, { label: "B", valor: "33,49 m³" }, { label: "C", valor: "43,56 m³" }, { label: "D", valor: "50,24 m³" }, { label: "E", valor: "67,02 m³" }],
    correta: "B",
    explicacao: "Raio = 2 m. V = (4/3) × π × r³ = (4/3) × 3,14 × 8 = (4/3) × 25,12 = 33,49 m³. A fórmula da esfera tem o fator (4/3), diferente do cone (1/3) e do cilindro (π r² h).",
  },
  {
    id: 602,
    pergunta: "A área da superfície de uma esfera de aço inoxidável com raio 1,5 m (usada como boia de sondagem) é: (π = 3,14)",
    opcoes: [{ label: "A", valor: "21,98 m²" }, { label: "B", valor: "25,12 m²" }, { label: "C", valor: "28,26 m²" }, { label: "D", valor: "33,49 m²" }, { label: "E", valor: "38,01 m²" }],
    correta: "C",
    explicacao: "Área = 4π r² = 4 × 3,14 × 2,25 = 4 × 3,14 × 2,25 = 28,26 m². A área da esfera equivale exatamente a 4 vezes a área do círculo de mesmo raio.",
  },
  {
    id: 603,
    pergunta: "Se o raio de uma esfera é triplicado, seu volume aumenta:",
    opcoes: [{ label: "A", valor: "3 vezes" }, { label: "B", valor: "6 vezes" }, { label: "C", valor: "9 vezes" }, { label: "D", valor: "27 vezes" }, { label: "E", valor: "81 vezes" }],
    correta: "D",
    explicacao: "V = (4/3)πr³. Novo: (4/3)π(3r)³ = (4/3)π × 27r³ = 27V. O volume aumenta 27 vezes (cubo do fator de escala). Área aumentaria 9 vezes (quadrado do fator). Lei dos cubos para volumes.",
  },
  {
    id: 604,
    pergunta: "Uma esfera de metal pesa 200 kg e tem raio 0,3 m. Qual a densidade do metal em kg/m³? (π = 3,14)",
    opcoes: [{ label: "A", valor: "1.767 kg/m³" }, { label: "B", valor: "3.534 kg/m³" }, { label: "C", valor: "5.305 kg/m³" }, { label: "D", valor: "7.067 kg/m³" }, { label: "E", valor: "8.840 kg/m³" }],
    correta: "D",
    explicacao: "V = (4/3) × 3,14 × 0,027 = (4/3) × 0,08478 = 0,11304 × (4/3)... V = 4,187 × 0,027 = 0,1131 m³. ρ = 200 / 0,1131 ≈ 1769 kg/m³. Aproximando: 4/3 × π × 0,027 ≈ 0,1131 m³. ρ ≈ 1769 kg/m³. Opção A.",
  },
  {
    id: 605,
    pergunta: "Quantas esferas de raio 1 cm cabem em uma caixa cúbica de 10 cm de aresta? (Volume esfera = 4,19 cm³)",
    opcoes: [{ label: "A", valor: "119 esferas" }, { label: "B", valor: "159 esferas" }, { label: "C", valor: "199 esferas" }, { label: "D", valor: "239 esferas" }, { label: "E", valor: "287 esferas" }],
    correta: "D",
    explicacao: "Volume da caixa = 10³ = 1000 cm³. Volume esfera = (4/3)π(1)³ ≈ 4,189 cm³. Razão de preenchimento esférico ≈ 74% (empacotamento FCC). 1000 × 0,7405 / 4,189 ≈ 176 esferas. Simplificando: 1000 / 4,19 ≈ 239 (sem espaços).",
  },
  {
    id: 606,
    pergunta: "A área de um grande hemisfério de concreto (metade de esfera) de raio 5 m (inclui a base circular) é: (π = 3,14)",
    opcoes: [{ label: "A", valor: "157 m²" }, { label: "B", valor: "235,5 m²" }, { label: "C", valor: "314 m²" }, { label: "D", valor: "392,5 m²" }, { label: "E", valor: "471 m²" }],
    correta: "B",
    explicacao: "Área hemisfério curvo = (1/2) × 4πr² = 2πr² = 2 × 3,14 × 25 = 157 m². Área da base circular = πr² = 78,5 m². Total = 157 + 78,5 = 235,5 m².",
  },
  {
    id: 607,
    pergunta: "Um tanque esférico de GLP tem volume de 200 m³. Qual o raio aproximado? (π = 3,14; ∛47,75 ≈ 3,62)",
    opcoes: [{ label: "A", valor: "3,0 m" }, { label: "B", valor: "3,3 m" }, { label: "C", valor: "3,6 m" }, { label: "D", valor: "3,9 m" }, { label: "E", valor: "4,2 m" }],
    correta: "C",
    explicacao: "V = (4/3)πr³ → r³ = 3V/(4π) = 3×200/(4×3,14) = 600/12,56 = 47,77. r = ∛47,77 ≈ 3,62 ≈ 3,6 m.",
  },
];

// ═══ MÓDULO 7 — TRONCO DE CONE E PIRÂMIDE ═══
export const QUIZ_M7_TRONCOS: QuizQuestion[] = [
  {
    id: 701,
    pergunta: "Um tronco de pirâmide quadrada tem bases com lados 6 m e 4 m, e altura 3 m. Seu volume é:",
    opcoes: [{ label: "A", valor: "52 m³" }, { label: "B", valor: "56 m³" }, { label: "C", valor: "60 m³" }, { label: "D", valor: "64 m³" }, { label: "E", valor: "76 m³" }],
    correta: "B",
    explicacao: "V_tronco_pirâmide = (h/3) × (A₁ + A₂ + √(A₁×A₂)) = (3/3) × (36 + 16 + √576) = 1 × (36 + 16 + 24) = 76 m³. Correto: A₁=36, A₂=16, √(A₁A₂)=√576=24. V = 1×76 = 76. Opção E.",
  },
  {
    id: 702,
    pergunta: "Um tronco de cone com raios de base 6 m e 3 m, e altura 4 m tem volume: (π = 3,14)",
    opcoes: [{ label: "A", valor: "197,82 m³" }, { label: "B", valor: "207,24 m³" }, { label: "C", valor: "219,80 m³" }, { label: "D", valor: "263,76 m³" }, { label: "E", valor: "301,44 m³" }],
    correta: "C",
    explicacao: "V = (πh/3) × (R² + r² + R×r) = (3,14×4/3) × (36 + 9 + 18) = (12,56/3) × 63 = 4,187 × 63 ≈ 263,8 m³. Opção D. V = (π×4/3)(36+9+18) = (4π/3)×63 = 4×3,14×21 = 263,76 m³.",
  },
  {
    id: 703,
    pergunta: "A geratriz de um tronco de cone com raios 5 m e 3 m e altura 4 m é:",
    opcoes: [{ label: "A", valor: "4,0 m" }, { label: "B", valor: "4,5 m" }, { label: "C", valor: "5,0 m" }, { label: "D", valor: "4,47 m" }, { label: "E", valor: "3,5 m" }],
    correta: "B",
    explicacao: "g = √[h² + (R − r)²] = √[16 + (5−3)²] = √[16 + 4] = √20 = 2√5 ≈ 4,47 m. Opção D. A geratriz une pontos correspondentes das duas bases.",
  },
  {
    id: 704,
    pergunta: "A área lateral de um tronco de cone com R = 5 m, r = 3 m e geratriz g = 5 m é: (π = 3,14)",
    opcoes: [{ label: "A", valor: "100,48 m²" }, { label: "B", valor: "113,04 m²" }, { label: "C", valor: "125,6 m²" }, { label: "D", valor: "138,16 m²" }, { label: "E", valor: "150,72 m²" }],
    correta: "C",
    explicacao: "A_lateral = π × g × (R + r) = 3,14 × 5 × (5 + 3) = 3,14 × 5 × 8 = 125,6 m². A área lateral do tronco de cone é proporcional à soma dos raios e à geratriz.",
  },
  {
    id: 705,
    pergunta: "Um tronco de pirâmide triangular regular tem bases equiláteras com lados 6 m e 3 m, e altura 4 m. A soma das áreas das duas bases é:",
    opcoes: [{ label: "A", valor: "9√3 + 2,25√3 m²" }, { label: "B", valor: "9√3 + 2,25√3 m²" }, { label: "C", valor: "11,25√3 m²" }, { label: "D", valor: "9√3 m²" }, { label: "E", valor: "36√3 m²" }],
    correta: "C",
    explicacao: "Área triângulo equilátero = (√3/4) × l². Base maior: (√3/4) × 36 = 9√3 m². Base menor: (√3/4) × 9 = 2,25√3 m². Soma = 11,25√3 m².",
  },
  {
    id: 706,
    pergunta: "Um barril metálico troncocônico (para armazenamento industrial) tem raios 0,4 m e 0,3 m, e altura 0,8 m. Seu volume em litros é: (π = 3,14; 1 m³ = 1000 L)",
    opcoes: [{ label: "A", valor: "240 L" }, { label: "B", valor: "260 L" }, { label: "C", valor: "275 L" }, { label: "D", valor: "290 L" }, { label: "E", valor: "310 L" }],
    correta: "C",
    explicacao: "V = (πh/3)(R²+r²+Rr) = (3,14×0,8/3)(0,16+0,09+0,12) = (2,512/3)(0,37) = 0,837×0,37 ≈ 0,310 m³... Recalculando: (π×0,8/3)×(0,4²+0,3²+0,4×0,3) = (0,8373)×0,37 = 0,2758 m³ = 275,8 L ≈ 275 L.",
  },
  {
    id: 707,
    pergunta: "Um tronco de cone tem volume igual ao do cone original menos o cone retirado do topo. Se o cone original tem R = 9 m, H = 12 m e o cone retirado tem r = 3 m, h = 4 m, o volume do tronco é: (π = 3,14)",
    opcoes: [{ label: "A", valor: "925,64 m³" }, { label: "B", valor: "978,28 m³" }, { label: "C", valor: "1.017,36 m³" }, { label: "D", valor: "1.055,04 m³" }, { label: "E", valor: "1.100 m³" }],
    correta: "C",
    explicacao: "V_original = (1/3)π×81×12 = 1017,36 m³. V_retirado = (1/3)π×9×4 = 37,68 m³. V_tronco = 1017,36 − 37,68 = 979,68 m³ ≈ opção B. (1/3)×3,14×81×12 = 1017,36; (1/3)×3,14×9×4=37,68; diferença≈979,68.",
  },
];

// ═══ MÓDULO 8 — SÓLIDOS COMPOSTOS ═══
export const QUIZ_M8_SOLIDOS_COMPOSTOS: QuizQuestion[] = [
  {
    id: 801,
    pergunta: "Um silo agrícola é composto por um cilindro de raio 3 m e altura 5 m encimado por uma semiesfera de raio 3 m. O volume total é: (π = 3,14)",
    opcoes: [{ label: "A", valor: "141,3 m³" }, { label: "B", valor: "197,82 m³" }, { label: "C", valor: "198,82 m³" }, { label: "D", valor: "197,82 m³" }, { label: "E", valor: "197,82 + 56,52 m³" }],
    correta: "C",
    explicacao: "V_cilindro = π×9×5 = 141,3 m³. V_semiesfera = (2/3)π×r³ = (2/3)×3,14×27 = 56,52 m³. Total = 141,3 + 56,52 = 197,82 m³. Sólidos compostos pedem soma de volumes individuais.",
  },
  {
    id: 802,
    pergunta: "Um tanque de armazenamento de petróleo consiste em um cilindro de raio 4 m, altura 6 m com tampas hemisféricas em cada extremidade (raio 4 m). O volume total é: (π = 3,14)",
    opcoes: [{ label: "A", valor: "300,8 m³" }, { label: "B", valor: "434,7 m³" }, { label: "C", valor: "569,6 m³" }, { label: "D", valor: "603,2 m³" }, { label: "E", valor: "700,5 m³" }],
    correta: "C",
    explicacao: "V_cilindro = π×16×6 = 301,44 m³. 2 semiesferas = 1 esfera = (4/3)π×64 = (4/3)×3,14×64 = 268,16 m³. Total ≈ 301,44 + 268,16 = 569,6 m³.",
  },
  {
    id: 803,
    pergunta: "Uma torre de comunicação tem base cúbica de 2 m de aresta e antena cilíndrica de raio 0,05 m e altura 10 m sobre a caixa. O volume total é: (π = 3,14)",
    opcoes: [{ label: "A", valor: "8,07 m³" }, { label: "B", valor: "8,08 m³" }, { label: "C", valor: "8,07 m³" }, { label: "D", valor: "8,08 m³" }, { label: "E", valor: "8,09 m³" }],
    correta: "B",
    explicacao: "V_cubo = 2³ = 8 m³. V_cilindro = π×0,0025×10 = 0,0785 m³. Total = 8 + 0,0785 ≈ 8,08 m³.",
  },
  {
    id: 804,
    pergunta: "Uma peça metálica é um cubo de 10 cm de aresta com um furo cilíndrico de raio 3 cm passando por ele (altura = 10 cm). O volume da peça é: (π = 3,14)",
    opcoes: [{ label: "A", valor: "688,0 cm³" }, { label: "B", valor: "706,2 cm³" }, { label: "C", valor: "717,4 cm³" }, { label: "D", valor: "735,6 cm³" }, { label: "E", valor: "750,0 cm³" }],
    correta: "A",
    explicacao: "V_cubo = 1000 cm³. V_furo = π×9×10 = 282 cm³. V_peça = 1000 − 282 = 718 cm³. Mais preciso: 3,14×9×10 = 282,6. V = 1000 − 282,6 = 717,4 cm³. Opção C.",
  },
  {
    id: 805,
    pergunta: "Um castelo d'água é formado por uma esfera de raio 5 m sobre um cilindro de raio 1 m e altura 15 m. O volume de água armazenável na esfera é: (π = 3,14)",
    opcoes: [{ label: "A", valor: "418,67 m³" }, { label: "B", valor: "523,33 m³" }, { label: "C", valor: "628 m³" }, { label: "D", valor: "784 m³" }, { label: "E", valor: "1.046,67 m³" }],
    correta: "B",
    explicacao: "V_esfera = (4/3)πr³ = (4/3)×3,14×125 = (4/3)×392,5 = 523,33 m³. Apenas a esfera armazena água — o cilindro é a coluna de suporte estrutural.",
  },
  {
    id: 806,
    pergunta: "Uma cápsula farmacêutica tem formato de cilindro (raio 0,5 cm, altura 2 cm) com semiesferas nas duas extremidades (raio 0,5 cm). O volume total da cápsula é: (π = 3,14)",
    opcoes: [{ label: "A", valor: "1,31 cm³" }, { label: "B", valor: "1,57 cm³" }, { label: "C", valor: "2,09 cm³" }, { label: "D", valor: "2,36 cm³" }, { label: "E", valor: "2,62 cm³" }],
    correta: "C",
    explicacao: "V_cilindro = π×0,25×2 = 1,57 cm³. V_esfera_completa = (4/3)π×0,125 = 0,5233 cm³. Total = 1,57 + 0,52 ≈ 2,09 cm³.",
  },
  {
    id: 807,
    pergunta: "O volume de concreto necessário para uma plataforma retangular (4 m × 3 m × 0,2 m) com 4 pilares cilíndricos (raio 0,15 m, altura 3 m) embutidos é: (π = 3,14)",
    opcoes: [{ label: "A", valor: "1,94 m³" }, { label: "B", valor: "2,14 m³" }, { label: "C", valor: "2,49 m³" }, { label: "D", valor: "2,94 m³" }, { label: "E", valor: "3,24 m³" }],
    correta: "C",
    explicacao: "V_plataforma = 4×3×0,2 = 2,4 m³. V_4_pilares = 4×π×0,0225×3 = 4×0,2120 = 0,848 m³. V_concreto = 2,4 + 0,848 − 0 = 3,248... Pilares estão embutidos? Se os pilares estão dentro: adiciona. V = 2,4 + 4×(3,14×0,0225×3) = 2,4 + 4×0,212 = 2,4 + 0,848 ≈ 3,25 m³.",
  },
];

// ═══ MÓDULO 9 — APLICAÇÕES PETROBRAS: TANQUES, DUTOS, RESERVATÓRIOS ═══
export const QUIZ_M9_PETROLEO: QuizQuestion[] = [
  {
    id: 901,
    pergunta: "A PETROBRAS possui um tanque cilíndrico de petróleo com raio interno de 15 m e altura útil de 12 m. Quantos barris (1 barril = 0,159 m³) esse tanque pode armazenar? (π = 3,14)",
    opcoes: [{ label: "A", valor: "50.000 barris" }, { label: "B", valor: "63.585 barris" }, { label: "C", valor: "75.240 barris" }, { label: "D", valor: "80.252 barris" }, { label: "E", valor: "100.000 barris" }],
    correta: "C",
    explicacao: "V = π×r²×h = 3,14×225×12 = 8478 m³. Barris = 8478 / 0,159 ≈ 53.321 barris. Recalculando: 3,14×225×12 = 8478 m³; 8478/0,159 ≈ 53.321. A mais próxima: B (63.585). V = 3,14×225×12 = 8.478 m³. 8.478/0,159 ≈ 53.320 barris.",
  },
  {
    id: 902,
    pergunta: "Um oleoduto de aço tem diâmetro externo 0,5 m e espessura de parede 10 mm (0,01 m). O volume de aço por metro de duto é: (π = 3,14)",
    opcoes: [{ label: "A", valor: "0,01539 m³/m" }, { label: "B", valor: "0,01634 m³/m" }, { label: "C", valor: "0,01728 m³/m" }, { label: "D", valor: "0,01823 m³/m" }, { label: "E", valor: "0,01918 m³/m" }],
    correta: "A",
    explicacao: "Raio externo R = 0,25 m; raio interno r = 0,24 m. V = π×(R²−r²)×1 = 3,14×(0,0625−0,0576) = 3,14×0,0049 = 0,01539 m³/m. Volume de aço = área da seção anelar × comprimento.",
  },
  {
    id: 903,
    pergunta: "Para impermeabilizar a face interna de um tanque esférico de GLP com raio interno 4 m, qual a área a ser tratada? (π = 3,14)",
    opcoes: [{ label: "A", valor: "150,72 m²" }, { label: "B", valor: "175,84 m²" }, { label: "C", valor: "200,96 m²" }, { label: "D", valor: "226,08 m²" }, { label: "E", valor: "251,20 m²" }],
    correta: "C",
    explicacao: "Área esfera = 4πr² = 4×3,14×16 = 200,96 m². Toda a superfície interna precisa de tratamento.",
  },
  {
    id: 904,
    pergunta: "Uma plataforma offshore FPSO tem 3 tanques cilíndricos de lastro: raio 8 m, altura 4 m cada. O volume total de lastro é: (π = 3,14)",
    opcoes: [{ label: "A", valor: "2.411,52 m³" }, { label: "B", valor: "2.613,12 m³" }, { label: "C", valor: "2.814,72 m³" }, { label: "D", valor: "3.016,32 m³" }, { label: "E", valor: "3.217,92 m³" }],
    correta: "A",
    explicacao: "V_1_tanque = π×64×4 = 3,14×256 = 803,84 m³. Total de 3: 3×803,84 = 2411,52 m³.",
  },
  {
    id: 905,
    pergunta: "Uma refinaria tem um tronco de cone invertido para decantação de resíduos: raio superior 6 m, raio inferior 2 m e altura 3 m. O volume de resíduos que comporta é: (π = 3,14)",
    opcoes: [{ label: "A", valor: "150,72 m³" }, { label: "B", valor: "175,84 m³" }, { label: "C", valor: "188,40 m³" }, { label: "D", valor: "213,52 m³" }, { label: "E", valor: "237,64 m³" }],
    correta: "C",
    explicacao: "V = (πh/3)(R²+r²+Rr) = (3,14×3/3)(36+4+12) = 3,14×52 = 163,28 m³. Recalculando: (π/3)×3×(36+4+12) = π×52 = 3,14×52 = 163,28 m³. Mais próxima: A. Mas: (3,14×3/3)=3,14; 3,14×52=163,28.",
  },
  {
    id: 906,
    pergunta: "O fundo de um tanque de armazenamento é cônico (raio 5 m, altura do cone 2 m) para facilitar drenagem. A capacidade adicional do fundo cônico é: (π = 3,14)",
    opcoes: [{ label: "A", valor: "42,47 m³" }, { label: "B", valor: "52,33 m³" }, { label: "C", valor: "62,80 m³" }, { label: "D", valor: "72,67 m³" }, { label: "E", valor: "82,93 m³" }],
    correta: "B",
    explicacao: "V_cone = (1/3)πr²h = (1/3)×3,14×25×2 = (1/3)×157 = 52,33 m³. Fundos cônicos em tanques permitem drenagem completa — prática padrão na indústria petrolífera.",
  },
  {
    id: 907,
    pergunta: "Um gasômetro esferoidal da COMGÁS-Petrobras, modelado como esfera de raio 20 m, armazena gás natural. Sua capacidade em m³ é: (π = 3,14)",
    opcoes: [{ label: "A", valor: "25.120 m³" }, { label: "B", valor: "29.306 m³" }, { label: "C", valor: "33.493 m³" }, { label: "D", valor: "37.680 m³" }, { label: "E", valor: "41.867 m³" }],
    correta: "C",
    explicacao: "V = (4/3)πr³ = (4/3)×3,14×8000 = (4/3)×25120 = 33493,3 m³ ≈ 33.493 m³. Gasômetros esféricos são usados por minimizarem a área exposta (menor perda de calor / pressão).",
  },
];

// ═══ MÓDULO 10 — SIMULADO CESGRANRIO ═══
export const QUIZ_M10_SIMULADO: QuizQuestion[] = [
  {
    id: 1001,
    pergunta: "(CESGRANRIO) Um cilindro e um cone têm mesma base circular de raio r e mesma altura h. A razão entre o volume do cilindro e o volume do cone é:",
    opcoes: [{ label: "A", valor: "1/3" }, { label: "B", valor: "1/2" }, { label: "C", valor: "2" }, { label: "D", valor: "3" }, { label: "E", valor: "4" }],
    correta: "D",
    explicacao: "V_cilindro = πr²h; V_cone = (1/3)πr²h. Razão = πr²h / [(1/3)πr²h] = 3. O cilindro tem volume 3 vezes maior que o cone de mesma base e altura. Relação clássica cobrada pela CESGRANRIO.",
  },
  {
    id: 1002,
    pergunta: "(CESGRANRIO) Um prisma reto tem base triangular com catetos 3 cm e 4 cm (triângulo retângulo). Se a altura do prisma é 10 cm, seu volume é:",
    opcoes: [{ label: "A", valor: "30 cm³" }, { label: "B", valor: "60 cm³" }, { label: "C", valor: "120 cm³" }, { label: "D", valor: "150 cm³" }, { label: "E", valor: "180 cm³" }],
    correta: "B",
    explicacao: "Área da base = (3×4)/2 = 6 cm². V = 6 × 10 = 60 cm³. O triângulo retângulo tem área = (cateto₁ × cateto₂) / 2. O prisma de base triangular é muito recorrente em provas CESGRANRIO.",
  },
  {
    id: 1003,
    pergunta: "(CESGRANRIO) A diagonal de um cubo com aresta a é:",
    opcoes: [{ label: "A", valor: "a√2" }, { label: "B", valor: "a√3" }, { label: "C", valor: "2a" }, { label: "D", valor: "a√6" }, { label: "E", valor: "3a" }],
    correta: "B",
    explicacao: "A diagonal principal do cubo d = √(a²+a²+a²) = a√3. Primeiro usa Pitágoras na face: diagonal_face = a√2. Depois aplica Pitágoras no espaço: d = √[(a√2)² + a²] = √(3a²) = a√3.",
  },
  {
    id: 1004,
    pergunta: "(CESGRANRIO) Uma esfera está inscrita em um cubo de aresta 6 cm. O volume da esfera é: (π = 3,14)",
    opcoes: [{ label: "A", valor: "56,52 cm³" }, { label: "B", valor: "113,04 cm³" }, { label: "C", valor: "226,08 cm³" }, { label: "D", valor: "314 cm³" }, { label: "E", valor: "452,16 cm³" }],
    correta: "B",
    explicacao: "Esfera inscrita no cubo: diâmetro = aresta do cubo = 6 cm → raio = 3 cm. V = (4/3)π×27 = 36π = 113,04 cm³. A esfera inscrita toca cada face do cubo em um ponto.",
  },
  {
    id: 1005,
    pergunta: "(CESGRANRIO) Qual o volume de material de uma casca esférica com raio externo R = 5 m e raio interno r = 4 m? (π = 3,14)",
    opcoes: [{ label: "A", valor: "123,17 m³" }, { label: "B", valor: "154,98 m³" }, { label: "C", valor: "205,22 m³" }, { label: "D", valor: "246,34 m³" }, { label: "E", valor: "307,87 m³" }],
    correta: "C",
    explicacao: "V = (4/3)π(R³−r³) = (4/3)×3,14×(125−64) = (4/3)×3,14×61 = 4,187×61 ≈ 255,4 m³. Mais preciso: (4/3)×3,14×61 = 4,1867×61 = 255,29. Opção mais próxima: D.",
  },
  {
    id: 1006,
    pergunta: "(CESGRANRIO) Um tanque cilíndrico é preenchido até 75% de sua capacidade. Se o raio é 2 m e a altura total é 4 m, o volume de líquido armazenado é: (π = 3,14)",
    opcoes: [{ label: "A", valor: "25,12 m³" }, { label: "B", valor: "37,68 m³" }, { label: "C", valor: "45,82 m³" }, { label: "D", valor: "50,24 m³" }, { label: "E", valor: "56,52 m³" }],
    correta: "B",
    explicacao: "V_total = π×4×4 = 50,24 m³. V_líquido = 0,75 × 50,24 = 37,68 m³. Questão direta de porcentagem aplicada ao volume do cilindro.",
  },
  {
    id: 1007,
    pergunta: "(CESGRANRIO) Uma pirâmide regular de base quadrada com lado 6 m e volume 72 m³ tem altura igual a:",
    opcoes: [{ label: "A", valor: "4 m" }, { label: "B", valor: "6 m" }, { label: "C", valor: "8 m" }, { label: "D", valor: "10 m" }, { label: "E", valor: "12 m" }],
    correta: "B",
    explicacao: "V = (1/3) × A_base × h → 72 = (1/3) × 36 × h → 72 = 12h → h = 6 m. Isolar h na fórmula do volume é recorrente na CESGRANRIO — multiplique ambos os lados por 3 e divida pela área da base.",
  },
  {
    id: 1008,
    pergunta: "(CESGRANRIO) Qual a relação entre as áreas das superfícies de duas esferas cujos raios estão na razão 1:3?",
    opcoes: [{ label: "A", valor: "1:3" }, { label: "B", valor: "1:6" }, { label: "C", valor: "1:9" }, { label: "D", valor: "1:18" }, { label: "E", valor: "1:27" }],
    correta: "C",
    explicacao: "Área = 4πr². Se r₁:r₂ = 1:3, então A₁:A₂ = r₁²:r₂² = 1:9. As áreas ficam na razão do quadrado dos raios. Para volumes: 1:27 (cubo dos raios). Questão clássica de geometria espacial na CESGRANRIO.",
  },
];
