import { QuizQuestion } from "../../shared";

// Perguntas do Quiz para a Aula de Circuitos CC/CA
// Focado no Perfil CESGRANRIO / Petrobras
// Todas as questões possuem exatamente 5 alternativas (A-E)

export const quizM1: QuizQuestion[] = [
  {
    id: "m1-q1",
    pergunta: "A grandeza física que mede a taxa de transferência de carga elétrica através de uma seção transversal de um condutor por unidade de tempo é a:",
    opcoes: [
      { label: "A", valor: "Tensão elétrica" },
      { label: "B", valor: "Resistência elétrica" },
      { label: "C", valor: "Corrente elétrica" },
      { label: "D", valor: "Potência elétrica" },
      { label: "E", valor: "Condutância elétrica" }
    ],
    correta: "C",
    explicacao: "A corrente elétrica (I) é definida matematicamente como I = dq/dt, ou seja, a variação da quantidade de carga elétrica q que atravessa um condutor em função do tempo t."
  },
  {
    id: "m1-q2",
    pergunta: "Um cabo condutor elétrico em regime estável é percorrido por uma corrente elétrica contínua de intensidade constante igual a 5 A durante um intervalo de tempo de 2 minutos. Qual é a quantidade total de carga elétrica, em Coulombs, que atravessou a seção transversal desse condutor?",
    opcoes: [
      { label: "A", valor: "10 C" },
      { label: "B", valor: "120 C" },
      { label: "C", valor: "300 C" },
      { label: "D", valor: "600 C" },
      { label: "E", valor: "1200 C" }
    ],
    correta: "D",
    explicacao: "Como I = Q / t, a carga elétrica Q é dada por Q = I * t. Convertendo o tempo de minutos para segundos: 2 minutos = 120 segundos. Logo, Q = 5 A * 120 s = 600 C."
  },
  {
    id: "m1-q3",
    pergunta: "A velocidade de deriva (drift velocity) dos elétrons livres em um condutor metálico típico de cobre sob densidades de corrente comerciais é da ordem de grandeza de:",
    opcoes: [
      { label: "A", valor: "Frações de milímetro por segundo." },
      { label: "B", valor: "Poucos metros por segundo." },
      { label: "C", valor: "Centenas de quilômetros por hora." },
      { label: "D", valor: "Próxima da velocidade de propagação eletromagnética no cabo." },
      { label: "E", valor: "Metade da velocidade da luz no vácuo." }
    ],
    correta: "A",
    explicacao: "Embora o sinal eletromagnético se propague a velocidades próximas à da luz, a velocidade física de deriva dos elétrons livres é muito lenta (da ordem de 10⁻⁴ m/s a 10⁻³ m/s, ou seja, frações de milímetro por segundo) devido às contínuas colisões com a rede cristalina do metal."
  },
  {
    id: "m1-q4",
    pergunta: "A diferença de potencial elétrico (ddp) entre dois pontos de um campo elétrico indica o trabalho necessário por unidade de carga para movê-la entre esses dois pontos. De acordo com essa definição, a unidade Volt (V) no Sistema Internacional de Unidades equivale a:",
    opcoes: [
      { label: "A", valor: "Joule por segundo (J/s)" },
      { label: "B", valor: "Joule por Coulomb (J/C)" },
      { label: "C", valor: "Coulomb por segundo (C/s)" },
      { label: "D", valor: "Watt por segundo (W/s)" },
      { label: "E", valor: "Newton por Coulomb (N/C)" }
    ],
    correta: "B",
    explicacao: "A tensão ou diferença de potencial é definida como a quantidade de energia (trabalho em Joules) gasta para deslocar uma carga elétrica unitária (em Coulombs). Logo, 1 Volt = 1 Joule / 1 Coulomb (J/C)."
  },
  {
    id: "m1-q5",
    pergunta: "A carga elétrica acumulada que atravessa uma determinada seção transversal de um cabo de controle em função do tempo é descrita pela equação polinomial q(t) = 3t² + 2t (em Coulombs, com t em segundos). Qual é o valor da corrente elétrica instantânea que circula por esse condutor no instante t = 4 s?",
    opcoes: [
      { label: "A", valor: "14 A" },
      { label: "B", valor: "20 A" },
      { label: "C", valor: "26 A" },
      { label: "D", valor: "56 A" },
      { label: "E", valor: "80 A" }
    ],
    correta: "C",
    explicacao: "A corrente elétrica instantânea é a derivada temporal da carga: I(t) = dq(t)/dt = d(3t² + 2t)/dt = 6t + 2. No instante t = 4 s, a corrente vale I(4) = 6(4) + 2 = 26 A."
  }
];

export const quizM2: QuizQuestion[] = [
  {
    id: "m2-q1",
    pergunta: "Um fio de cobre circular de comprimento L e diâmetro D possui uma resistência elétrica R. Se duplicarmos o comprimento do fio (2L) e mantivermos a mesma massa de cobre (o que implica em reduzir seu diâmetro), qual será a nova resistência elétrica do fio?",
    opcoes: [
      { label: "A", valor: "R / 2" },
      { label: "B", valor: "R" },
      { label: "C", valor: "2 R" },
      { label: "D", valor: "4 R" },
      { label: "E", valor: "8 R" }
    ],
    correta: "D",
    explicacao: "Pela Segunda Lei de Ohm, R = ρ * L / A. Se mantivermos o volume (e a massa) constante, ao duplicar o comprimento L, a área de seção transversal A deve ser reduzida à metade (A/2) para manter o mesmo volume (V = L * A). Portanto, R' = ρ * (2L) / (A/2) = 4 * (ρ * L / A) = 4R."
  },
  {
    id: "m2-q2",
    pergunta: "Um resistor metálico de cobre possui uma resistência ôhmica de 10 Ω quando submetido a uma temperatura ambiente estável de 20 °C. Sabendo que o coeficiente de variação térmica da resistência do cobre a 20 °C vale α = 0,00393 °C⁻¹, qual será a resistência aproximada desse componente quando operar a uma temperatura de 70 °C?",
    opcoes: [
      { label: "A", valor: "8,04 Ω" },
      { label: "B", valor: "10,20 Ω" },
      { label: "C", valor: "11,97 Ω" },
      { label: "D", valor: "13,93 Ω" },
      { label: "E", valor: "19,65 Ω" }
    ],
    correta: "C",
    explicacao: "Utilizando a equação de variação térmica R(T) = R₀ * [1 + α * (T - T₀)], temos: R(70) = 10 * [1 + 0,00393 * (70 - 20)] = 10 * [1 + 0,00393 * 50] = 10 * [1 + 0,1965] = 11,965 Ω ≈ 11,97 Ω."
  },
  {
    id: "m2-q3",
    pergunta: "Um cabo de alimentação elétrica que interliga uma subestação industrial a um motor trifásico possui uma resistência interna de 0,2 Ω. Sob regime nominal, a corrente elétrica contínua que circula por esse condutor vale 50 A. Qual é o valor da potência ativa dissipada sob a forma de calor devido ao efeito Joule no condutor?",
    opcoes: [
      { label: "A", valor: "10 W" },
      { label: "B", valor: "100 W" },
      { label: "C", valor: "250 W" },
      { label: "D", valor: "500 W" },
      { label: "E", valor: "1000 W" }
    ],
    correta: "D",
    explicacao: "A potência dissipada por efeito Joule é calculada pela relação P = R * I². Substituindo os valores do pergunta: P = 0,2 Ω * (50 A)² = 0,2 * 2500 = 500 W."
  },
  {
    id: "m2-q4",
    pergunta: "A resistividade elétrica (ρ) de um determinado condutor metálico homogêneo é uma propriedade intrínseca do material. A grandeza física que representa o inverso da resistividade é a condutividade elétrica (σ), cuja unidade de medida oficial no Sistema Internacional (SI) é expressa em:",
    opcoes: [
      { label: "A", valor: "Ohm por metro (Ω/m)" },
      { label: "B", valor: "Ohm-metro (Ω·m)" },
      { label: "C", valor: "Siemens por metro (S/m)" },
      { label: "D", valor: "Siemens-metro (S·m)" },
      { label: "E", valor: "Mho por centímetro (mho/cm)" }
    ],
    correta: "C",
    explicacao: "Como a condutividade é o inverso da resistividade (σ = 1/ρ) e a unidade de resistividade é Ω·m, a unidade de condutividade no SI é (Ω·m)⁻¹ = S/m (Siemens por metro)."
  },
  {
    id: "m2-q5",
    pergunta: "Um dispositivo eletrônico não-linear apresenta uma curva característica de tensão-corrente descrita pela equação matemática I = 0,1 * V², onde a tensão V está em Volts e a corrente I em Ampères. Quando submetido a uma tensão constante de 10 V, qual é o valor da resistência estática (V/I) apresentada por esse componente?",
    opcoes: [
      { label: "A", valor: "0,1 Ω" },
      { label: "B", valor: "0,5 Ω" },
      { label: "C", valor: "1,0 Ω" },
      { label: "D", valor: "10,0 Ω" },
      { label: "E", valor: "100,0 Ω" }
    ],
    correta: "C",
    explicacao: "Primeiro determinamos a corrente I para a tensão V = 10 V: I = 0,1 * (10)² = 0,1 * 100 = 10 A. A resistência estática (R_est) é a razão direta entre a tensão aplicada e a respectiva corrente: R_est = V / I = 10 V / 10 A = 1,0 Ω."
  }
];

export const quizM3: QuizQuestion[] = [
  {
    id: "m3-q1",
    pergunta: "Em um nó de um circuito elétrico complexo, convergem quatro ramos condutores. Sabe-se que as correntes elétricas que entram no nó por três desses ramos valem 2 A, 3 A e 5 A. De acordo com a Lei de Kirchhoff para Correntes (LKC), a corrente elétrica no quarto ramo condutor deve ser de:",
    opcoes: [
      { label: "A", valor: "10 A saindo do nó" },
      { label: "B", valor: "10 A entrando no nó" },
      { label: "C", valor: "5 A saindo do nó" },
      { label: "D", valor: "0 A" },
      { label: "E", valor: "15 A entrando no nó" }
    ],
    correta: "A",
    explicacao: "A Lei de Kirchhoff para Correntes (LKC) afirma que a soma das correntes que entram em um nó deve ser igual à soma das correntes que saem dele. Como três correntes entram e somam 2 + 3 + 5 = 10 A, a corrente no quarto ramo deve ser de 10 A saindo do nó para balancear a equação."
  },
  {
    id: "m3-q2",
    pergunta: "Uma malha fechada de um circuito de instrumentação é composta por uma fonte de tensão contínua ideal de 24 V conectada em série com três resistores de resistências elétricas iguais a 2 Ω, 4 Ω e 6 Ω. Qual é a queda de tensão elétrica sobre o resistor de 4 Ω?",
    opcoes: [
      { label: "A", valor: "4 V" },
      { label: "B", valor: "8 V" },
      { label: "C", valor: "12 V" },
      { label: "D", valor: "16 V" },
      { label: "E", valor: "24 V" }
    ],
    correta: "B",
    explicacao: "A resistência equivalente série do circuito é Req = 2 + 4 + 6 = 12 Ω. A corrente elétrica na malha vale I = V / Req = 24 V / 12 Ω = 2 A. A queda de tensão sobre o resistor de 4 Ω é V_4 = R * I = 4 Ω * 2 A = 8 V."
  },
  {
    id: "m3-q3",
    pergunta: "Durante o processo de equacionamento de circuitos elétricos utilizando o método clássico de análise por malhas (ou correntes de malha), o conceito de 'supermalha' é obrigatoriamente empregado sempre que houver:",
    opcoes: [
      { label: "A", valor: "Uma fonte de tensão ideal compartilhada entre duas malhas adjacentes." },
      { label: "B", valor: "Uma fonte de corrente ideal compartilhada no ramo comum entre duas malhas adjacentes." },
      { label: "C", valor: "Três ou mais resistores em paralelo conectados à mesma fonte de força eletromotriz." },
      { label: "D", valor: "Apenas fontes dependentes cuja variável de controle esteja localizada em outra malha." },
      { label: "E", valor: "Nós contendo cinco ou mais ramificações paralelas ativas." }
    ],
    correta: "B",
    explicacao: "Uma supermalha é criada quando uma fonte de corrente ideal (dependente ou independente) está localizada em um ramo compartilhado por duas malhas. Isso ocorre porque a tensão na fonte de corrente é desconhecida a priori, impedindo a aplicação direta da LKT na malha isolada."
  },
  {
    id: "m3-q4",
    pergunta: "No contexto da análise de circuitos elétricos lineares usando o método das tensões nodais (ou análise nodal), a necessidade de utilizar o conceito de 'supernó' surge quando:",
    opcoes: [
      { label: "A", valor: "Uma fonte de tensão ideal (independente ou dependente) conecta diretamente dois nós essenciais que não são a referência." },
      { label: "B", valor: "Duas fontes de corrente ideais em paralelo injetam cargas no mesmo nó de barramento." },
      { label: "C", valor: "A resistência equivalente de Thévenin de um dos ramos torna-se nula." },
      { label: "D", valor: "A impedância mútua entre dois malhas adjacentes é puramente indutiva." },
      { label: "E", valor: "O nó de referência adotado possui mais de três resistores acoplados." }
    ],
    correta: "A",
    explicacao: "Um supernó é formado quando uma fonte de tensão (independente ou dependente) conecta dois nós de tensão desconhecida. Como a corrente pela fonte de tensão é desconhecida e não pode ser expressa por meio da Lei de Ohm direta, os dois nós são tratados como uma única superfície integrada para equacionamento da LKC."
  },
  {
    id: "m3-q5",
    pergunta: "Considere uma rede com duas malhas adjacentes (Malha 1 e Malha 2) com correntes de malha definidas no sentido horário como i1 e i2, respectivamente. Se o resistor do ramo comum que interconecta as duas malhas possui resistência de 5 Ω, qual é a expressão da queda de tensão nesse resistor ao percorrer a Malha 1 na direção horária?",
    opcoes: [
      { label: "A", valor: "5 * i1" },
      { label: "B", valor: "5 * (i1 + i2)" },
      { label: "C", valor: "5 * (i1 - i2)" },
      { label: "D", valor: "5 * (i2 - i1)" },
      { label: "E", valor: "5 * i2" }
    ],
    correta: "C",
    explicacao: "Ao percorrer a Malha 1 na direção horária, a corrente i1 percorre o resistor do ramo comum para baixo, enquanto a corrente i2 (horária) percorre o mesmo resistor para cima. Logo, a corrente líquida que flui na direção adotada de i1 é (i1 - i2). A queda de tensão associada vale R * (i1 - i2) = 5 * (i1 - i2)."
  }
];

export const quizM4: QuizQuestion[] = [
  {
    id: "m4-q1",
    pergunta: "Deseja-se obter uma resistência equivalente de 15 Ω utilizando um resistor de 20 Ω associado em paralelo com outro resistor Rx. Qual deve ser o valor nominal de Rx?",
    opcoes: [
      { label: "A", valor: "5 Ω" },
      { label: "B", valor: "15 Ω" },
      { label: "C", valor: "30 Ω" },
      { label: "D", valor: "60 Ω" },
      { label: "E", valor: "100 Ω" }
    ],
    correta: "D",
    explicacao: "A fórmula para associação em paralelo de dois resistores é Req = (R1 * R2) / (R1 + R2). Logo, 15 = (20 * Rx) / (20 + Rx) => 15(20 + Rx) = 20Rx => 300 + 15Rx = 20Rx => 5Rx = 300 => Rx = 60 Ω."
  },
  {
    id: "m4-q2",
    pergunta: "Um eletrotécnico possui três resistores idênticos de resistência nominal igual a 30 Ω cada um. Se ele associar os três resistores em paralelo e, em seguida, conectar essa associação em série com um quarto resistor de 10 Ω, qual será a resistência equivalente total (Req) do circuito?",
    opcoes: [
      { label: "A", valor: "10 Ω" },
      { label: "B", valor: "20 Ω" },
      { label: "C", valor: "40 Ω" },
      { label: "D", valor: "70 Ω" },
      { label: "E", valor: "100 Ω" }
    ],
    correta: "B",
    explicacao: "A resistência equivalente dos três resistores idênticos de 30 Ω em paralelo é R_par = 30 Ω / 3 = 10 Ω. Associando este conjunto em série com o resistor de 10 Ω, temos: Req = R_par + 10 Ω = 10 Ω + 10 Ω = 20 Ω."
  },
  {
    id: "m4-q3",
    pergunta: "Um divisor de tensão resistivo sem carga acoplada é constituído por dois resistores conectados em série, onde R1 = 3 kΩ (conectado ao terminal de entrada positivo) e R2 = 6 kΩ (conectado ao referencial/terra). Se alimentarmos a entrada com uma tensão de 12 V, qual será a tensão medida sobre o resistor R2?",
    opcoes: [
      { label: "A", valor: "4 V" },
      { label: "B", valor: "6 V" },
      { label: "C", valor: "8 V" },
      { label: "D", valor: "9 V" },
      { label: "E", valor: "12 V" }
    ],
    correta: "C",
    explicacao: "A regra do divisor de tensão estabelece que V_out = V_in * [R2 / (R1 + R2)]. Aplicando os valores do pergunta: V_out = 12 V * [6 kΩ / (3 kΩ + 6 kΩ)] = 12 * [6 / 9] = 12 * (2 / 3) = 8 V."
  },
  {
    id: "m4-q4",
    pergunta: "Uma ponte de Wheatstone utilizada para medição de resistência elétrica em laboratório possui resistores de braço com os seguintes valores: R1 = 100 Ω, R2 = 200 Ω e R3 = 300 Ω. Qual deve ser o valor nominal de Rx (o quarto resistor) para que a ponte atinja o equilíbrio?",
    opcoes: [
      { label: "A", valor: "150 Ω" },
      { label: "B", valor: "400 Ω" },
      { label: "C", valor: "600 Ω" },
      { label: "D", valor: "900 Ω" },
      { label: "E", valor: "1200 Ω" }
    ],
    correta: "C",
    explicacao: "A condição de equilíbrio de uma ponte de Wheatstone ocorre quando os produtos das resistências dos braços opostos são iguais: R1 * Rx = R2 * R3. Logo, Rx = (R2 * R3) / R1 = (200 * 300) / 100 = 60000 / 100 = 600 Ω."
  },
  {
    id: "m4-q5",
    pergunta: "Um engenheiro de instrumentação projeta um divisor de corrente para desviar 90% da corrente total de um loop de controle, de modo que apenas 10% da corrente passe por um medidor de resistência interna Rg = 90 Ω. Qual deve ser a resistência de shunt (Rs) a ser conectada em paralelo com o medidor?",
    opcoes: [
      { label: "A", valor: "9 Ω" },
      { label: "B", valor: "10 Ω" },
      { label: "C", valor: "45 Ω" },
      { label: "D", valor: "90 Ω" },
      { label: "E", valor: "810 Ω" }
    ],
    correta: "B",
    explicacao: "Pela lei do divisor de corrente, a corrente no medidor é Ig = I_total * [Rs / (Rs + Rg)]. Queremos Ig = 0,1 * I_total. Logo: 0,1 = Rs / (Rs + 90) => 0,1 * (Rs + 90) = Rs => 0,1 * Rs + 9 = Rs => 0,9 * Rs = 9 => Rs = 10 Ω."
  }
];

export const quizM5: QuizQuestion[] = [
  {
    id: "m5-q1",
    pergunta: "Ao calcular o circuito equivalente de Thévenin visto pelos terminais de uma carga, a resistência de Thévenin (Rth) é determinada por:",
    opcoes: [
      { label: "A", valor: "Substituir todas as fontes de tensão por circuitos abertos e fontes de corrente por curto-circuitos." },
      { label: "B", valor: "Substituir todas as fontes de tensão por curto-circuitos e fontes de corrente por circuitos abertos." },
      { label: "C", valor: "Medir a tensão em circuito aberto nos terminais e dividir pela corrente de curto-circuito." },
      { label: "D", valor: "Somar linearmente todas as resistências do circuito elétrico." },
      { label: "E", valor: "Multiplicar a impedância de carga pelo fator de potência do circuito." }
    ],
    correta: "B",
    explicacao: "Para encontrar a resistência equivalente de Thévenin (Rth) em circuitos com fontes independentes, desativamos as fontes: fontes de tensão ideal viram curto-circuitos (tensão zero) e fontes de corrente ideal viram circuitos abertos (corrente zero)."
  },
  {
    id: "m5-q2",
    pergunta: "Um circuito linear ativo apresenta uma tensão em circuito aberto de 20 V quando medida nos seus terminais de saída A e B. Ao aplicar um curto-circuito nestes mesmos terminais, mede-se uma corrente de curto-circuito de 4 A. A resistência equivalente de Thévenin (Rth) e a corrente de Norton (In) desse bipolo valem, respectivamente:",
    opcoes: [
      { label: "A", valor: "5 Ω e 4 A" },
      { label: "B", valor: "5 Ω e 20 A" },
      { label: "C", valor: "80 Ω e 4 A" },
      { label: "D", valor: "0,2 Ω e 4 A" },
      { label: "E", valor: "20 Ω e 4 A" }
    ],
    correta: "A",
    explicacao: "A tensão de Thévenin Vth é a tensão em circuito aberto, logo Vth = 20 V. A corrente de Norton In é a própria corrente de curto-circuito, logo In = 4 A. A resistência Rth = Vth / In = 20 V / 4 A = 5 Ω."
  },
  {
    id: "m5-q3",
    pergunta: "Considere um circuito equivalente de Thévenin constituído por uma tensão Vth = 12 V e uma resistência interna Rth = 3 Ω. Qual deve ser o valor da resistência elétrica da carga RL conectada a esse circuito para que ocorra a máxima transferência de potência ativa para a carga?",
    opcoes: [
      { label: "A", valor: "1,5 Ω" },
      { label: "B", valor: "3,0 Ω" },
      { label: "C", valor: "6,0 Ω" },
      { label: "D", valor: "12,0 Ω" },
      { label: "E", valor: "48,0 Ω" }
    ],
    correta: "B",
    explicacao: "O Teorema da Máxima Transferência de Potência estabelece que a máxima potência ativa é transferida para uma carga resistiva pura quando a resistência da carga RL é igual à resistência interna do circuito fonte (Rth). Portanto, RL = Rth = 3 Ω."
  },
  {
    id: "m5-q4",
    pergunta: "Em relação ao circuito equivalente de Thévenin da questão anterior (Vth = 12 V, Rth = 3 Ω) operando em condição de máxima transferência de potência ativa, qual é a potência máxima útil, em Watts, que é dissipada pela carga RL?",
    opcoes: [
      { label: "A", valor: "3 W" },
      { label: "B", valor: "6 W" },
      { label: "C", valor: "12 W" },
      { label: "D", valor: "24 W" },
      { label: "E", valor: "48 W" }
    ],
    correta: "C",
    explicacao: "Na condição de máxima transferência de potência, a resistência da carga RL é igual a Rth (3 Ω). A tensão na carga é a metade da de Thévenin: V_L = Vth / 2 = 12 / 2 = 6 V. A potência máxima dissipada na carga vale P_max = V_L² / RL = (6)² / 3 = 36 / 3 = 12 W. (Alternativamente, P_max = Vth² / (4*Rth) = 144 / 12 = 12 W)."
  },
  {
    id: "m5-q5",
    pergunta: "Um gerador linear industrial é modelado pelo equivalente de Norton com corrente In = 5 A em paralelo com uma resistência Rn = 10 Ω. Ao converter esse circuito para o modelo equivalente de Thévenin, a tensão Vth e a resistência Rth correspondentes valem, respectivamente:",
    opcoes: [
      { label: "A", valor: "50 V e 10 Ω" },
      { label: "B", valor: "2 V e 10 Ω" },
      { label: "C", valor: "0,5 V e 10 Ω" },
      { label: "D", valor: "50 V e 50 Ω" },
      { label: "E", valor: "5 V e 10 Ω" }
    ],
    correta: "A",
    explicacao: "A resistência de Thévenin é igual à de Norton (Rth = Rn = 10 Ω). A tensão de Thévenin é a ddp em circuito aberto gerada pela fonte de Norton: Vth = In * Rn = 5 A * 10 Ω = 50 V. Portanto, Vth = 50 V e Rth = 10 Ω."
  }
];

export const quizM6: QuizQuestion[] = [
  {
    id: "m6-q1",
    pergunta: "Uma tensão senoidal alternada monofásica é descrita pela equação v(t) = 311 sen(377t) V. Qual é o valor aproximado da tensão eficaz (RMS) e da frequência desse sinal elétrico?",
    opcoes: [
      { label: "A", valor: "311 V e 60 Hz" },
      { label: "B", valor: "220 V e 60 Hz" },
      { label: "C", valor: "127 V e 50 Hz" },
      { label: "D", valor: "220 V e 50 Hz" },
      { label: "E", valor: "110 V e 60 Hz" }
    ],
    correta: "B",
    explicacao: "O valor de pico é Vp = 311 V. O valor eficaz (RMS) é Vrms = Vp / √2 ≈ 311 / 1,414 ≈ 220 V. A frequência angular é w = 377 rad/s. A frequência f é f = w / 2π = 377 / (2 * 3,1415) ≈ 60 Hz."
  },
  {
    id: "m6-q2",
    pergunta: "Uma forma de onda alternada senoidal pura possui uma amplitude de pico a pico (Vpp) igual a 20 V quando visualizada em um osciloscópio. O valor eficaz (RMS) aproximado desse sinal elétrico é:",
    opcoes: [
      { label: "A", valor: "5,00 V" },
      { label: "B", valor: "7,07 V" },
      { label: "C", valor: "10,00 V" },
      { label: "D", valor: "14,14 V" },
      { label: "E", valor: "20,00 V" }
    ],
    correta: "B",
    explicacao: "A tensão de pico (Vp) é a metade da de pico a pico: Vp = Vpp / 2 = 20 V / 2 = 10 V. O valor eficaz (RMS) para uma senoide pura vale Vrms = Vp / √2 = 10 / 1,4142 ≈ 7,07 V."
  },
  {
    id: "m6-q3",
    pergunta: "O período (T) de um sinal de corrente alternada senoidal que oscila sob uma frequência de rede industrial de 50 Hz é igual a:",
    opcoes: [
      { label: "A", valor: "0,02 ms" },
      { label: "B", valor: "0,2 ms" },
      { label: "C", valor: "2,0 ms" },
      { label: "D", valor: "20,0 ms" },
      { label: "E", valor: "50,0 ms" }
    ],
    correta: "D",
    explicacao: "O período T é o inverso da frequência f: T = 1 / f = 1 / 50 Hz = 0,02 s. Convertendo para milissegundos: 0,02 * 1000 = 20 ms."
  },
  {
    id: "m6-q4",
    pergunta: "Duas tensões senoidais alternadas são representadas pelas funções temporais v1(t) = 100 cos(wt + 30°) V e v2(t) = 50 sen(wt + 60°) V. Qual é o ângulo de defasagem (diferença de fase) entre essas duas tensões?",
    opcoes: [
      { label: "A", valor: "0° (em fase)" },
      { label: "B", valor: "30°" },
      { label: "C", valor: "60°" },
      { label: "D", valor: "90°" },
      { label: "E", valor: "120°" }
    ],
    correta: "C",
    explicacao: "Para comparar as fases, devemos converter v2(t) de seno para cosseno: sen(x) = cos(x - 90°). Logo, v2(t) = 50 cos(wt + 60° - 90°) = 50 cos(wt - 30°). A defasagem angular entre v1 e v2 vale: Δθ = θ1 - θ2 = 30° - (-30°) = 60°."
  },
  {
    id: "m6-q5",
    pergunta: "Ao calcular o valor médio matemático de uma forma de onda de corrente alternada senoidal pura e perfeitamente simétrica ao longo de um ciclo completo (período T), obtém-se o valor de:",
    opcoes: [
      { label: "A", valor: "Zero" },
      { label: "B", valor: "0,311 * Vp" },
      { label: "C", valor: "0,637 * Vp" },
      { label: "D", valor: "0,707 * Vp" },
      { label: "E", valor: "Vp" }
    ],
    correta: "A",
    explicacao: "Uma senoide simétrica pura possui áreas idênticas acima e abaixo do eixo zero. Logo, ao integrar a senoide ao longo de um período completo T e dividir por T, a área positiva do primeiro semiciclo cancela a negativa do segundo, resultando em média matemática igual a zero."
  }
];

export const quizM7: QuizQuestion[] = [
  {
    id: "m7-q1",
    pergunta: "Um capacitor de capacitância C é conectado a uma fonte senoidal de corrente alternada de frequência f. Se a frequência da fonte for duplicada (2f), o que ocorrerá com a reatância capacitiva (Xc) do componente?",
    opcoes: [
      { label: "A", valor: "Permanecerá inalterada." },
      { label: "B", valor: "Será duplicada (2 Xc)." },
      { label: "C", valor: "Será quadruplicada (4 Xc)." },
      { label: "D", valor: "Será reduzida à metade (Xc / 2)." },
      { label: "E", valor: "Será reduzida a um quarto (Xc / 4)." }
    ],
    correta: "D",
    explicacao: "A reatância capacitiva é inversamente proporcional à frequência: Xc = 1 / (2 * pi * f * C). Se a frequência f é duplicada para 2f, a nova reatância Xc' = 1 / (2 * pi * 2f * C) = Xc / 2. Logo, a reatância cai pela metade."
  },
  {
    id: "m7-q2",
    pergunta: "Um indutor ideal de indutância nominal L = 0,1 H é alimentado por uma fonte senoidal de corrente alternada em 60 Hz. Qual é o valor aproximado da reatância indutiva (XL) apresentada pelo componente?",
    opcoes: [
      { label: "A", valor: "6,0 Ω" },
      { label: "B", valor: "18,8 Ω" },
      { label: "C", valor: "37,7 Ω" },
      { label: "D", valor: "60,0 Ω" },
      { label: "E", valor: "377,0 Ω" }
    ],
    correta: "C",
    explicacao: "A reatância indutiva é calculada por XL = 2 * π * f * L. Substituindo os dados: XL = 2 * 3,1416 * 60 Hz * 0,1 H = 377 * 0,1 = 37,7 Ω."
  },
  {
    id: "m7-q3",
    pergunta: "Um capacitor possui reatância capacitiva Xc = 100 Ω sob uma frequência de rede de 50 Hz. Se alterarmos a frequência de operação do circuito para 25 Hz, o que ocorrerá com a reatância capacitiva desse componente?",
    opcoes: [
      { label: "A", valor: "Reduzirá para 25 Ω" },
      { label: "B", valor: "Reduzirá para 50 Ω" },
      { label: "C", valor: "Permanecerá em 100 Ω" },
      { label: "D", valor: "Aumentará para 200 Ω" },
      { label: "E", valor: "Aumentará para 400 Ω" }
    ],
    correta: "D",
    explicacao: "Como Xc = 1 / (2*pi*f*C), Xc é inversamente proporcional a f. Se a frequência cai pela metade (de 50 Hz para 25 Hz), a reatância capacitiva correspondente deve dobrar de valor: Xc' = Xc * 2 = 100 Ω * 2 = 200 Ω."
  },
  {
    id: "m7-q4",
    pergunta: "Em relação ao comportamento de corrente e tensão em regime alternado senoidal permanente de um indutor puro ideal, pode-se afirmar que:",
    opcoes: [
      { label: "A", valor: "A corrente está adiantada de 90° em relação à tensão." },
      { label: "B", valor: "A corrente está atrasada de 90° em relação à tensão." },
      { label: "C", valor: "Tensão e corrente estão em fase (0°)." },
      { label: "D", valor: "A corrente e a tensão estão defasadas de 180°." },
      { label: "E", valor: "A reatância indutiva decai com a frequência angular." }
    ],
    correta: "B",
    explicacao: "Em indutores puros, a relação constitutiva é v(t) = L * di(t)/dt. Ao alimentar com corrente senoidal, a tensão resulta adiantada de 90° em relação à corrente (ou seja, a corrente está atrasada de 90° em relação à tensão)."
  },
  {
    id: "m7-q5",
    pergunta: "Para um capacitor puro ideal alimentado por uma ddp alternada senoidal permanente, a relação fasorial de fase estabelece que:",
    opcoes: [
      { label: "A", valor: "A corrente está adiantada de 90° em relação à tensão." },
      { label: "B", valor: "A corrente está atrasada de 90° em relação à tensão." },
      { label: "C", valor: "A corrente está em fase com a tensão (0°)." },
      { label: "D", valor: "A reatância cresce linearmente com a frequência." },
      { label: "E", valor: "A energia dissipada no capacitor por efeito Joule é máxima." }
    ],
    correta: "A",
    explicacao: "Em capacitores puros, i(t) = C * dv(t)/dt. Quando submetido a uma tensão senoidal, a corrente resultante está adiantada de 90° em relação à tensão."
  }
];

export const quizM8: QuizQuestion[] = [
  {
    id: "m8-q1",
    pergunta: "Em um circuito RLC série sob condição de ressonância elétrica, o comportamento da impedância equivalente do circuito é:",
    opcoes: [
      { label: "A", valor: "Puramente capacitiva e mínima." },
      { label: "B", valor: "Puramente indutiva e máxima." },
      { label: "C", valor: "Puramente resistiva e mínima, igual a R." },
      { label: "D", valor: "Infinita (circuito aberto)." },
      { label: "E", valor: "Nula (curto-circuito absoluto)." }
    ],
    correta: "C",
    explicacao: "Na ressonância em circuito série, a reatância indutiva anula a capacitiva (Xl = Xc). A impedância Z = R + j(Xl - Xc) simplifica-se para Z = R. A oposição reativa é zero, tornando a impedância puramente resistiva e mínima, resultando em corrente máxima no circuito."
  },
  {
    id: "m8-q2",
    pergunta: "Um ramo de um circuito de corrente alternada senoidal é constituído pela associação em série de um resistor de R = 3 Ω com uma reatância indutiva XL = 4 Ω. Qual é a magnitude da impedância equivalente (|Z|) e o fator de potência (FP) do ramo?",
    opcoes: [
      { label: "A", valor: "5 Ω e 0,60" },
      { label: "B", valor: "5 Ω e 0,80" },
      { label: "C", valor: "7 Ω e 0,43" },
      { label: "D", valor: "1 Ω e 1,00" },
      { label: "E", valor: "25 Ω e 0,12" }
    ],
    correta: "A",
    explicacao: "A impedância complexa é Z = R + jXL = 3 + j4 Ω. A magnitude de Z é |Z| = √(3² + 4²) = √25 = 5 Ω. O fator de potência é o cosseno do ângulo da impedância, dado por R / |Z| = 3 / 5 = 0,60."
  },
  {
    id: "m8-q3",
    pergunta: "Um circuito RLC série apresenta os seguintes parâmetros de componentes: R = 10 Ω, L = 1 mH e C = 100 nF. A frequência angular de ressonância (w₀) desse circuito série vale:",
    opcoes: [
      { label: "A", valor: "100 rad/s" },
      { label: "B", valor: "1000 rad/s" },
      { label: "C", valor: "10000 rad/s" },
      { label: "D", valor: "100000 rad/s" },
      { label: "E", valor: "1000000 rad/s" }
    ],
    correta: "D",
    explicacao: "A frequência angular de ressonância w₀ de um RLC série é dada por w₀ = 1 / √(L * C). Substituindo os valores do pergunta: L * C = 10⁻³ H * 100 * 10⁻⁹ F = 10⁻³ * 10⁻⁷ = 10⁻¹⁰. Logo, w₀ = 1 / √(10⁻¹⁰) = 1 / 10⁻⁵ = 10⁵ rad/s = 100000 rad/s."
  },
  {
    id: "m8-q4",
    pergunta: "Deseja-se converter a impedância retangular Z = 5 + j5 Ω para o seu respectivo formato polar. A representação polar equivalente aproximada de Z é:",
    opcoes: [
      { label: "A", valor: "5,00 ∠ 30° Ω" },
      { label: "B", valor: "5,00 ∠ 45° Ω" },
      { label: "C", valor: "7,07 ∠ 45° Ω" },
      { label: "D", valor: "7,07 ∠ 90° Ω" },
      { label: "E", valor: "10,0 ∠ 60° Ω" }
    ],
    correta: "C",
    explicacao: "O módulo da impedância é |Z| = √(5² + 5²) = √50 = 5 * √2 ≈ 7,07 Ω. O ângulo de fase é θ = arctan(X/R) = arctan(5/5) = arctan(1) = 45°. Portanto, Z = 7,07 ∠ 45° Ω."
  },
  {
    id: "m8-q5",
    pergunta: "Em um circuito ressonante paralelo RLC alimentado por fonte de corrente alternada senoidal ideal, na frequência de ressonância f₀, a impedância total vista pela fonte apresenta comportamento:",
    opcoes: [
      { label: "A", valor: "Puramente capacitivo e máximo." },
      { label: "B", valor: "Puramente indutivo e mínimo." },
      { label: "C", valor: "Puramente resistivo e máximo, igual a R." },
      { label: "D", valor: "Puramente resistivo e mínimo, tendendo a zero." },
      { label: "E", valor: "Infinito (reatâncias isoladas do terra)." }
    ],
    correta: "C",
    explicacao: "No circuito paralelo RLC na ressonância, a corrente reativa no capacitor anula a do indutor. O ramo LC paralelo comporta-se como circuito aberto. A impedância total é igual ao resistor R, assumindo seu valor máximo possível (diferente do RLC série, onde a impedância na ressonância assume valor mínimo)."
  }
];

export const quizM9: QuizQuestion[] = [
  {
    id: "m9-q1",
    pergunta: "Uma instalação elétrica industrial consome uma potência ativa de 160 kW com um fator de potência de 0,80 atrasado (indutivo). Qual é o valor da potência aparente total (S) fornecida a essa planta?",
    opcoes: [
      { label: "A", valor: "128 kVA" },
      { label: "B", valor: "160 kVA" },
      { label: "C", valor: "200 kVA" },
      { label: "D", valor: "250 kVA" },
      { label: "E", valor: "320 kVA" }
    ],
    correta: "C",
    explicacao: "O fator de potência (FP) relaciona a potência ativa (P) e a aparente (S) pela fórmula: FP = P / S. Logo, S = P / FP = 160 kW / 0,80 = 200 kVA."
  },
  {
    id: "m9-q2",
    pergunta: "Um gerador monofásico alimenta um motor elétrico industrial que consome potência ativa P = 8 kW e potência reativa indutiva Q = 6 kVar. Qual é a potência aparente total (S) demandada pelo motor à rede elétrica?",
    opcoes: [
      { label: "A", valor: "8 kVA" },
      { label: "B", valor: "10 kVA" },
      { label: "C", valor: "14 kVA" },
      { label: "D", valor: "48 kVA" },
      { label: "E", valor: "100 kVA" }
    ],
    correta: "B",
    explicacao: "A potência aparente S representa a magnitude do vetor de potência complexa, calculada por S = √(P² + Q²). Substituindo os valores: S = √((8)² + (6)²) = √(64 + 36) = √100 = 10 kVA."
  },
  {
    id: "m9-q3",
    pergunta: "Em relação ao motor elétrico monofásico da questão anterior (P = 8 kW e Q = 6 kVar indutivo), o fator de potência (FP) de operação desse equipamento vale:",
    opcoes: [
      { label: "A", valor: "0,50 atrasado" },
      { label: "B", valor: "0,60 adiantado" },
      { label: "C", valor: "0,80 atrasado" },
      { label: "D", valor: "0,80 adiantado" },
      { label: "E", valor: "1,00 unitário" }
    ],
    correta: "C",
    explicacao: "O fator de potência (FP) é dado por P / S. Do cálculo anterior, a potência aparente S é 10 kVA. Logo, FP = 8 kW / 10 kVA = 0,80. Como a potência reativa Q é indutiva, o fator de potência é atrasado (corrente atrasada em relação à tensão)."
  },
  {
    id: "m9-q4",
    pergunta: "Para melhorar o perfil de tensão e elevar o fator de potência industrial de uma refinaria da Petrobras, evitando cobranças de excedentes reativos, deve-se projetar a instalação de:",
    opcoes: [
      { label: "A", valor: "Resistores de amortecimento térmico em série com a linha." },
      { label: "B", valor: "Bancos de capacitores instalados em paralelo com as cargas indutivas." },
      { label: "C", valor: "Reatores de núcleo de ar em série com os barramentos de distribuição." },
      { label: "D", valor: "Geradores síncronos sobre-excitados operando como sub-excitados." },
      { label: "E", valor: "Supressores de transientes de silício nas saídas dos painéis." }
    ],
    correta: "B",
    explicacao: "A maioria das cargas industriais é indutiva (motores, transformadores), o que reduz o FP. Para compensar essa reatância indutiva, instalam-se capacitores em paralelo, pois eles fornecem a potência reativa necessária localmente, liberando a rede de transportar o reativo e elevando o FP."
  },
  {
    id: "m9-q5",
    pergunta: "Um ramal elétrico residencial consome uma potência aparente S = 10 kVA sob um fator de potência unitário (FP = 1,0). Qual é o consumo de potência reativa (Q), em kVar, desse ramal?",
    opcoes: [
      { label: "A", valor: "0 kVar" },
      { label: "B", valor: "5 kVar" },
      { label: "C", valor: "7,07 kVar" },
      { label: "D", valor: "10 kVar" },
      { label: "E", valor: "100 kVar" }
    ],
    correta: "A",
    explicacao: "Como o fator de potência é unitário, o ângulo de defasagem θ é 0°. A potência ativa P é igual à aparente S (P = S * cos θ = 10 * 1 = 10 kW). A potência reativa vale Q = S * sen θ = 10 * sen(0°) = 0 kVar. O circuito comporta-se de forma puramente resistiva."
  }
];

export const quizM10: QuizQuestion[] = [
  {
    id: "m10-q1",
    pergunta: "Em sistemas trifásicos simétricos ligados na configuração estrela (Y), qual é a relação física entre a corrente de linha (Il) e a corrente de fase (If)?",
    opcoes: [
      { label: "A", valor: "Il = If" },
      { label: "B", valor: "Il = √3 If" },
      { label: "C", valor: "Il = If / √3" },
      { label: "D", valor: "Il = 3 If" },
      { label: "E", valor: "Il = If / 3" }
    ],
    correta: "A",
    explicacao: "Na ligação estrela (Y), cada linha está conectada diretamente em série com uma das fases da carga trifásica, de modo que a corrente que transita pela linha é exatamente igual à corrente que circula pela respectiva fase (Il = If)."
  },
  {
    id: "m10-q2",
    pergunta: "Em um sistema trifásico equilibrado conectado na configuração Triângulo (delta - Δ), qual é a relação entre o módulo da tensão de linha (Vl) e da tensão de fase (Vf)?",
    opcoes: [
      { label: "A", valor: "Vl = Vf" },
      { label: "B", valor: "Vl = √3 Vf" },
      { label: "C", valor: "Vl = Vf / √3" },
      { label: "D", valor: "Vl = 3 Vf" },
      { label: "E", valor: "Vl = Vf / 3" }
    ],
    correta: "A",
    explicacao: "Na ligação em Triângulo (Δ), os condutores de linha estão conectados diretamente aos terminais de cada uma das fases da carga. Desse modo, a diferença de potencial elétrico entre duas linhas (tensão de linha Vl) é exatamente a mesma tensão presente sobre a respectiva fase (Vl = Vf)."
  },
  {
    id: "m10-q3",
    pergunta: "Um circuito alimentador de força trifásico equilibrado opera com ligação em Estrela (Y) e possui uma tensão de linha eficaz igual a 380 V. Qual é o valor aproximado da tensão de fase (Vf) equivalente?",
    opcoes: [
      { label: "A", valor: "110 V" },
      { label: "B", valor: "127 V" },
      { label: "C", valor: "220 V" },
      { label: "D", valor: "380 V" },
      { label: "E", valor: "660 V" }
    ],
    correta: "C",
    explicacao: "Na ligação estrela (Y), a relação entre a ddp de linha e fase é Vl = √3 * Vf. Portanto, Vf = Vl / √3 = 380 V / 1,732 ≈ 220 V."
  },
  {
    id: "m10-q4",
    pergunta: "Uma carga trifásica industrial equilibrada opera sob tensão de linha eficaz Vl = 220 V, corrente de linha Il = 10 A e fator de potência FP = 0,80. Qual é a potência ativa total (Pt), em kW, consumida por essa instalação?",
    opcoes: [
      { label: "A", valor: "1,76 kW" },
      { label: "B", valor: "2,20 kW" },
      { label: "C", valor: "3,05 kW" },
      { label: "D", valor: "5,28 kW" },
      { label: "E", valor: "9,15 kW" }
    ],
    correta: "C",
    explicacao: "A potência ativa total em sistemas trifásicos equilibrados é calculada pela fórmula Pt = √3 * Vl * Il * FP. Substituindo os valores: Pt = 1,732 * 220 V * 10 A * 0,80 = 3048,32 W ≈ 3,05 kW."
  },
  {
    id: "m10-q5",
    pergunta: "A norma regulamentadora NR-10 estabelece requisitos e condições mínimas de segurança em instalações elétricas. Segundo essa norma, um circuito elétrico de potência só é considerado efetivamente desenergizado para realização de trabalhos se for submetido a um protocolo de:",
    opcoes: [
      { label: "A", valor: "Apenas desligamento da chave geral do disjuntor." },
      { label: "B", valor: "Seccionamento, impedimento de reenergização, constatação de ausência de tensão, aterramento temporário e sinalização." },
      { label: "C", valor: "Uso de ferramentas isoladas e luvas de borracha classe 4 sob regime de linha viva." },
      { label: "D", valor: "Conexão de um fusível de shunt rápido em paralelo com os condutores de fase." },
      { label: "E", valor: "Bloqueio do disjuntor sem necessidade de testes de ddp física." }
    ],
    correta: "B",
    explicacao: "De acordo com o item 10.5.1 da NR-10, somente são consideradas desenergizadas as instalações elétricas liberadas para trabalho mediante a seguinte sequência de procedimentos: 1) Seccionamento; 2) Impedimento de reenergização; 3) Constatação de ausência de tensão; 4) Instalação de aterramento temporário com equipotencialização dos condutores dos circuitos; 5) Proteção dos elementos existentes sob tensão na zona de controle; 6) Instalação da sinalização de impedimento de reenergização."
  }
];
