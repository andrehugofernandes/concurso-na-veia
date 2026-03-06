import { Questao } from "../../shared";

export const QUIZ_M1_CONCEITOS: Questao[] = [
  {
    id: 801,
    pergunta: "Em um laboratório da refinaria, a fórmula para calcular o pH de uma solução é dada por pH = -log[H+]. Se a concentração de íons hidrogênio [H+] aumentar em 10 vezes, o que acontece com o valor do pH?",
    opcoes: [
      { label: "A", valor: "Aumenta em 10" },
      { label: "B", valor: "Aumenta em 1" },
      { label: "C", valor: "Diminui em 10" },
      { label: "D", valor: "Diminui em 1" },
      { label: "E", valor: "Permanece o mesmo" }
    ],
    correta: "D",
    explicacao: "O pH é uma escala logarítmica na base 10 e possui sinal negativo na fórmula: pH = -log[H+]. Se a concentração [H+] é multiplicada por 10, de acordo com a propriedade do logaritmo: -log(10*[H+]) = -(log 10 + log [H+]) = -(1 + log[H+]) = -1 - log[H+]. Ou seja, o pH original diminui em exata 1 unidade. É uma pegadinha clássica em provas de bancas como a CESGRANRIO focar na propriedade inversa da escala logarítmica do pH."
  },
  {
    id: 802,
    pergunta: "A CESGRANRIO adora testar o conceito fundamental de logaritmo. Se log₂ 32 = x, isso significa matematicamente que:",
    opcoes: [
      { label: "A", valor: "2 multiplicado por x é igual a 32" },
      { label: "B", valor: "2 elevado à potência x é igual a 32" },
      { label: "C", valor: "x elevado à potência 2 é igual a 32" },
      { label: "D", valor: "32 dividido por 2 é igual a x" },
      { label: "E", valor: "A base ejetou o logaritmando para o outro lado" }
    ],
    correta: "B",
    explicacao: "O conceito primário de logaritmo é: 'a que expoente (x) devo elevar a base (2) para que o resultado seja o logaritmando (32)?'. Em notação exponencial: 2ˣ = 32. Como 32 é 2⁵, x = 5."
  },
  {
    id: 803,
    pergunta: "Qual a condição de existência (CE) para que a expressão log₍ₓ₋₃₎ (10 - x) seja um número real legítimo?",
    opcoes: [
      { label: "A", valor: "x > 3 e x < 10" },
      { label: "B", valor: "x > 3, x ≠ 4 e x < 10" },
      { label: "C", valor: "x > 3 e x ≠ 4" },
      { label: "D", valor: "x < 10 e x ≠ 4" },
      { label: "E", valor: "x > 10 e x ≠ 3" }
    ],
    correta: "B",
    explicacao: "As Condições de Existência do logaritmo (Base e Logaritmando) são rigorosas! Logaritmando: (10 - x) > 0 → x < 10. Base: (x - 3) > 0 → x > 3 E a base deve ser diferente de 1: (x - 3) ≠ 1 → x ≠ 4. Portanto, a C.E. completa é 3 < x < 10, com x ≠ 4. A banca elimina sumariamente quem esquece do 'diferente de 1'."
  },
  {
    id: 804,
    pergunta: "Cálculo mental: Se log 2 ≈ 0,30, o valor log 20 é:",
    opcoes: [
      { label: "A", valor: "1,30" },
      { label: "B", valor: "3,00" },
      { label: "C", valor: "20,30" },
      { label: "D", valor: "0,60" },
      { label: "E", valor: "2,30" }
    ],
    correta: "A",
    explicacao: "Usamos a propriedade do logaritmo de um produto: log 20 = log (2 × 10). Isso se torna log 2 + log 10. Como a base oculta é 10, log 10 = 1. E log 2 é 0,30. Portanto, 1 + 0,30 = 1,30."
  },
  {
    id: 805,
    pergunta: "A escala Richter, que mede magnitude de terremotos perto de poços de petróleo, obedece à fórmula M = (2/3) × log(E/E₀). Isso implica que um terremoto de magnitude 6 em comparação a um de magnitude 4 libera uma energia:",
    opcoes: [
      { label: "A", valor: "2 vezes maior" },
      { label: "B", valor: "10 vezes maior" },
      { label: "C", valor: "100 vezes maior" },
      { label: "D", valor: "1000 vezes maior" },
      { label: "E", valor: "10.000 vezes maior" }
    ],
    correta: "D",
    explicacao: "Para cada aumento de 1 ponto na escala Richter, a energia E é multiplicada por 10^(1,5) (devido ao fator 2/3). Um aumento de 2 pontos (de 4 para 6) significa que a energia é multiplicada por (10^(1,5))², ou seja, 10³ = 1000 vezes maior. Um equívoco clássico (pegadinha) é achar que é linear."
  }
];

export const QUIZ_M2_PROPRIEDADES: Questao[] = [
  {
    id: 806,
    pergunta: "Se log a = 5 e log b = 3, qual é o valor de log(a² / b)?",
    opcoes: [
      { label: "A", valor: "7" },
      { label: "B", valor: "2" },
      { label: "C", valor: "13" },
      { label: "D", valor: "25/3" },
      { label: "E", valor: "10" }
    ],
    correta: "A",
    explicacao: "Aplicando as propriedades: log(a² / b) = log(a²) - log(b). Depois, a regra do tombo no a²: 2×log(a) - log(b). Substituindo: 2×(5) - 3 = 10 - 3 = 7."
  },
  {
    id: 807,
    pergunta: "O engenheiro precisa resolver a seguinte expressão: log₁₀ 1 + log₁₀ 10 + log₁₀ 100 + log₁₀ 1000. O resultado final é:",
    opcoes: [
      { label: "A", valor: "1111" },
      { label: "B", valor: "4" },
      { label: "C", valor: "6" },
      { label: "D", valor: "10" },
      { label: "E", valor: "0" }
    ],
    correta: "C",
    explicacao: "O logaritmo de 1 em qualquer base é 0. O logaritmo de 10 na base 10 é 1. O log de 100 é 2 e o log de 1000 é 3. Somando tudo: 0 + 1 + 2 + 3 = 6."
  },
  {
    id: 808,
    pergunta: "Mudança de Base: Como reescrever log₅ 7 de forma a ser calculado em uma calculadora padrão que só processa logaritmos na base 10?",
    opcoes: [
      { label: "A", valor: "log 5 / log 7" },
      { label: "B", valor: "log 7 / log 5" },
      { label: "C", valor: "log(7/5)" },
      { label: "D", valor: "log 7 - log 5" },
      { label: "E", valor: "log 35" }
    ],
    correta: "B",
    explicacao: "A fórmula de mudança de base afirma que log_b(a) = log_c(a) / log_c(b). Escolhendo a nova base 'c' como sendo 10 (base da calculadora), log₅ 7 transforma-se na divisão log₁₀ 7 / log₁₀ 5. É uma das habilidades técnicas mais exigidas por bancas pesadas."
  },
  {
    id: 809,
    pergunta: "Se log 5 = x e log 3 = y, qual é o valor de log 15?",
    opcoes: [
      { label: "A", valor: "x * y" },
      { label: "B", valor: "x + y" },
      { label: "C", valor: "x / y" },
      { label: "D", valor: "x² + y²" },
      { label: "E", valor: "x - y" }
    ],
    correta: "B",
    explicacao: "O número 15 é o produto de 5 por 3. Pela propriedade do Produto de Logaritmos, log(A × B) = log A + log B. Então log(5 × 3) = log 5 + log 3 = x + y."
  },
  {
    id: 810,
    pergunta: "A famosa 'Regra do Tombo' diz que log (xⁿ) = n × log x. Isso é vital para calcular capital ao longo dos anos. Se tivermos log (100³) na base 10, o resultado direto utilizando a regra é:",
    opcoes: [
      { label: "A", valor: "100" },
      { label: "B", valor: "8" },
      { label: "C", valor: "30" },
      { label: "D", valor: "6" },
      { label: "E", valor: "9" }
    ],
    correta: "D",
    explicacao: "Pela regra do tombo, log (100³) = 3 × log 100. Como a base implícita é 10 e log₁₀(100) = 2, o resultado é 3 × 2 = 6."
  }
];

export const QUIZ_M3_EQUACOES: Questao[] = [
  {
    id: 811,
    pergunta: "A resolução da equação logarítmica log₃(x) + log₃(x - 8) = 2 tem como conjunto verdade:",
    opcoes: [
      { label: "A", valor: "x = 9 e x = -1" },
      { label: "B", valor: "x = 9" },
      { label: "C", valor: "x = -1" },
      { label: "D", valor: "x = 8" },
      { label: "E", valor: "Nenhuma solução" }
    ],
    correta: "B",
    explicacao: "Primeiro usa a propriedade do produto: log₃[x(x - 8)] = 2. Aplicando a definição de log: x(x - 8) = 3². x² - 8x - 9 = 0. Raízes: 9 e -1. Porém, devemos testar as raízes na condição original. O logaritmo não aceita números nulos ou negativos. Como log₃(-1) não existe, -1 é descartado. Apenas x = 9 serve! Pegadinha brutal da CESGRANRIO."
  },
  {
    id: 812,
    pergunta: "Na equação log(x+1) + log(x-1) = log 3, o valor correto de x é:",
    opcoes: [
      { label: "A", valor: "2" },
      { label: "B", valor: "2 e -2" },
      { label: "C", valor: "4" },
      { label: "D", valor: "-2" },
      { label: "E", valor: "1" }
    ],
    correta: "A",
    explicacao: "Propriedade da soma de bases iguais: log[(x+1)(x-1)] = log 3. O produto notável (x+1)(x-1) = x² - 1. Como os logs têm a mesma base (10) em ambos os lados e são injetores, podemos igualar os logaritmandos: x² - 1 = 3 → x² = 4. Raízes são 2 e -2. Como log(x-1) para x=-2 daria log(-3) [proibido], apenas o +2 serve!"
  },
  {
    id: 813,
    pergunta: "A equação log₂(x) = 5 - log₂(x-4) gera uma função do 2º grau cujas raízes são:",
    opcoes: [
      { label: "A", valor: "4 e 8" },
      { label: "B", valor: "-4 e 8" },
      { label: "C", valor: "8" },
      { label: "D", valor: "2 e 16" },
      { label: "E", valor: "16" }
    ],
    correta: "C",
    explicacao: "Passa o log para a esquerda: log₂(x) + log₂(x-4) = 5. Usa a soma transformando em produto: log₂[x(x-4)] = 5. Remove o log elevando a base: x(x-4) = 2⁵. Fica x² - 4x = 32 → x² - 4x - 32 = 0. As raízes (soma 4, produto -32) são 8 e -4. x não pode ser negativo no log original, resto é descartado. Só x=8 serve."
  },
  {
    id: 814,
    pergunta: "O 'macete' da mudança de variável. Como iniciar a resolução da equação [log₃(x)]² - 2×log₃(x) - 3 = 0?",
    opcoes: [
      { label: "A", valor: "Passar o 3 para o outro lado e tirar a raiz" },
      { label: "B", valor: "Definir que o termo log₃(x) vale y (ou k), gerando y² - 2y - 3 = 0" },
      { label: "C", valor: "Aplicar a regra do tombo no [log₃(x)]², passando o 2 para a frente" },
      { label: "D", valor: "Dividir tudo por x" },
      { label: "E", valor: "Elevar tudo à base 10" }
    ],
    correta: "B",
    explicacao: "Sempre que uma equação modular/exponencial/logarítmica aparece com um termo complexo elevado ao quadrado E também multiplicado sozinho, a tática ouro de bancas difíceis é substituir esse termo inteiro por uma letra (y, por exemplo). Assim você descobre os valores de Y, e BEM NO FIM volta para x achando y = log₃(x)."
  },
  {
    id: 815,
    pergunta: "Uma equação de igualdade dupla de bases, como log₄(x) = log₂(5). Qual a técnica para resolver?",
    opcoes: [
      { label: "A", valor: "Ignorar as bases diferentes e igualar x a 5" },
      { label: "B", valor: "Multiplicar as bases (4x2 = 8)" },
      { label: "C", valor: "Mudar tudo para a mesma base. Fazer a mudança de base de log₄(x) para base 2." },
      { label: "D", valor: "Elevar ao quadrado o número 5" },
      { label: "E", valor: "Assumir que a equação não tem raiz real." }
    ],
    correta: "C",
    explicacao: "Jamais iguale logaritmandos se as bases forem diferentes! A tática é converter todos para a base conveniente. log₄(x) na base 2 vira: log₂(x) / log₂(4). Sabemos que log₂(4) = 2. Então a equação vira: (log₂(x))/2 = log₂(5) → log₂(x) = 2×log₂(5). Usando a regra do tombo inversa, o 2 sobe de expoente: log₂(x) = log₂(5²) = log₂(25). Resultado x = 25."
  }
];

export const QUIZ_M4_GRAFICOS: Questao[] = [
  {
    id: 816,
    pergunta: "A função y = log_{1/2}(x), por ter base fracionária entre 0 e 1, tem qual característica principal em seu gráfico?",
    opcoes: [
      { label: "A", valor: "É totalmente crescente e intercepta o eixo Y." },
      { label: "B", valor: "É decrescente e intercepta o eixo X no ponto x=1." },
      { label: "C", valor: "É uma linha reta inclinada para baixo." },
      { label: "D", valor: "Forma uma parábola com concavidade voltada para cima." },
      { label: "E", valor: "Apenas toca a origem (0,0)." }
    ],
    correta: "B",
    explicacao: "Se a base b é 0 < b < 1, a função logarítmica é DECRESCENTE e o gráfico 'escorrega' do alto em direção ao infinito positivo de x, cruzando o eixo x SEMPRE no ponto (1, 0) caso não possua deslocamentos, já que log_b(1) = 0 independentemente da base. Ela nunca toca o eixo Y (x=0)."
  },
  {
    id: 817,
    pergunta: "Por que a função logarítmica f(x) = log(x) é dita a função inversa da função exponencial g(x) = 10ˣ?",
    opcoes: [
      { label: "A", valor: "Porque ambas nunca se tocam no plano cartesiano." },
      { label: "B", valor: "Porque uma é o negativo da outra." },
      { label: "C", valor: "Porque os gráficos são simétricos em relação à reta identidade (y = x)." },
      { label: "D", valor: "Porque ambas tocam a base 10 e se anulam." },
      { label: "E", valor: "Porque formam um círculo no plano de Argand-Gauss." }
    ],
    correta: "C",
    explicacao: "Funções inversas trocam os eixos x e y entre si. Visualmente, se você plotar o gráfico de y = 10ˣ e y = log₁₀(x), notará que eles são espelhos perfeitos caso coloquemos um espelho diagonal bem na linha onde y=x. Uma reflete a outra!"
  },
  {
    id: 818,
    pergunta: "Domínio e Imagem: Para a função básica f(x) = ln(x) (logaritmo neperiano), qual é a sua Imagem (valores que Y assume)?",
    opcoes: [
      { label: "A", valor: "Apenas valores positivos" },
      { label: "B", valor: "Apenas valores negativos" },
      { label: "C", valor: "Todo o conjunto dos Números Reais (positivo, negativo, 0)" },
      { label: "D", valor: "De 0 até 10" },
      { label: "E", valor: "Impossível determinar" }
    ],
    correta: "C",
    explicacao: "O Domínio (quais x entram) do logaritmo é estritamente x > 0 (apenas reais positivos). Contudo, a IMAGEM (quais Y saem) pode resultar em valores negativos gigantescos, zero (quando x=1) e valores positivos gigantescos. O logaritmo cobre todos os números reais no eixo vertical Y!"
  },
  {
    id: 819,
    pergunta: "A assíntota vertical do gráfico de f(x) = log(x - 5) + 3 ocorre exatamente onde o logaritmando foca em zero. Onde o gráfico apresenta a parede invisível?",
    opcoes: [
      { label: "A", valor: "x = 0" },
      { label: "B", valor: "x = 3" },
      { label: "C", valor: "x = -5" },
      { label: "D", valor: "x = 5" },
      { label: "E", valor: "y = 3" }
    ],
    correta: "D",
    explicacao: "A assíntota vertical é o 'limite' impenetrável onde a função explode para o infinito (negativo). Ocorre quando o logaritmando (dentro do parênteses) zera! Como temos log(x - 5), o zero ocorre em x - 5 = 0 → x = 5. O gráfico espreme na reta x = 5, mas nunca toca."
  },
  {
    id: 820,
    pergunta: "Se aplicarmos um módulo na função: f(x) = |log(x)|, como ficará o comportamento do gráfico na parte inferior (onde Y é negativo)?",
    opcoes: [
      { label: "A", valor: "A parte inferior sumirá, se tornará invisível." },
      { label: "B", valor: "A parte inferior será transportada como espelho para a parte superior (valores em Y ficam positivos)." },
      { label: "C", valor: "O gráfico vira uma reta constante onde Y=0." },
      { label: "D", valor: "O eixo X será inteiramente limpo." },
      { label: "E", valor: "O gráfico dará uma volta completa nela mesma." }
    ],
    correta: "B",
    explicacao: "A propriedade do valor absoluto (módulo) faz com que resultados de f(x) que davam, por exemplo, -5, virem +5. Todos os 'rabos' negativos de funções que caem para baixo do eixo X rebatem para cima e formam o formato de uma gaviota. Cesgranrio é cruel e exige visualização algébrico/geométrica."
  }
];

export const QUIZ_M5_FINAL: Questao[] = [
  {
    id: 821,
    pergunta: "[DESAFIO CESGRANRIO SIMULADO] A intensidade do som (N) percebida pelo ouvido, em decibéis, usa N = 10 × log₁₀ (I / I₀). Uma máquina industrial emite 80 dB. Se um técnico comprar um abafador que reduz a intensidade I (energia por metro quadrado) para 1% do original, quantos decibéis o técnico vai ouvir?",
    opcoes: [
      { label: "A", valor: "8 dB" },
      { label: "B", valor: "50 dB" },
      { label: "C", valor: "60 dB" },
      { label: "D", valor: "20 dB" },
      { label: "E", valor: "78 dB" }
    ],
    correta: "C",
    explicacao: "Pegadinha bruta! 80 dB = 10 × log(I / I₀) -> log(I/I₀) = 8. Com o EPI, a nova intensidade (I_nova) é 0,01×I, ou (10⁻²)×I. Na fórmula, N_novo = 10 × log((10⁻²×I)/I₀). Aplicando propriedade do produto modular: N_novo = 10 × [log(10⁻²) + log(I/I₀)]. O primeiro log vale -2. O segundo sabíamos que vale 8. Então o somatório interno fica: -2 + 8 = 6. O resultado final é 10 × 6 = 60 dB. Caiu em todas as últimas provas do BNDES."
  },
  {
    id: 822,
    pergunta: "Para a equação 2^(x+1) + 2^(x-2) = 18, o uso correto de artifícios numéricos a reduz para:",
    opcoes: [
      { label: "A", valor: "Exigência de logaritmos complexos e aproximação decimal." },
      { label: "B", valor: "Fatoração de potências comuns, usando 2ˣ(2¹ + 2⁻²) = 18, em que a resposta de x resulta num número inteiro." },
      { label: "C", valor: "Corte das bases 2 de todo o sistema ellevando 18 a 2." },
      { label: "D", valor: "Troca da base 2 pela base 18." },
      { label: "E", valor: "Isolamento da variável x pela remoção do fator comum." }
    ],
    correta: "B",
    explicacao: "As expressões 2^(x+1) e 2^(x-2) possuem o 2ˣ oculto. (2ˣ × 2¹) + (2ˣ × 1/4) = 18. Coloque o 2ˣ em evidência: 2ˣ × (2 + 0.25) = 18. Ou 2ˣ × 2,25 = 18. Fazendo 18 / 2,25 = 8. Como 2ˣ = 8, sabemos que 8 = 2³. x = 3, inteiro!"
  },
  {
    id: 823,
    pergunta: "Inequação logarítmica: A solução para ln(x) < 2 possui uma armadilha crítica de domínio e sua resposta real é:",
    opcoes: [
      { label: "A", valor: "x < e²" },
      { label: "B", valor: "0 < x < e²" },
      { label: "C", valor: "x > 0" },
      { label: "D", valor: "x = e²" },
      { label: "E", valor: "Qualquer x inferior a 100." }
    ],
    correta: "B",
    explicacao: "Como a base natural 'e' é maior do que 1 (aproximadamente 2.71), mante-se o sentido ao converter a base para o lado de lá: x < e². MAS o candidato incauto para por aí e esquece a regra matriz do Logaritmo: o logaritmando obrigatoriamente tem que ser positivo (x > 0). Cruzando a regra de ouro com o resultado, fica 0 < x < e²."
  },
  {
    id: 824,
    pergunta: "Se log₍₃₎ (x) = α e log₍₂₎ (x) = β, e sendo x ≠ 1, uma equivalência absoluta que correlaciona α e β é dada por:",
    opcoes: [
      { label: "A", valor: "α = β × log₃(2)" },
      { label: "B", valor: "α = β / log₃(2)" },
      { label: "C", valor: "α = β × log₂(3)" },
      { label: "D", valor: "α = β" },
      { label: "E", valor: "Impossível correlação direta por divergência de bases." }
    ],
    correta: "A",
    explicacao: "Basta fazermos uma mudança de base. Vamos colocar o log₃(x) para a base 2. log₃(x) vira (log₂(x)) / (log₂(3)). Sabemos que log₃(x) é α e log₂(x) é β. Então α = β / log₂(3). Esse resultado não está claramente nas opções. Contudo, 1 / log₂(3) é exatamente igual a log₃(2). Logo, α = β × log₃(2). É maldade de banca fiscal para derrubar concurseiros aprofundados."
  },
  {
    id: 825,
    pergunta: "Num modelo de diluição química, a concentração de uma substância C decai por C(t) = C₀ × (10⁻⁰’²ᵗ). Após quanto tempo t a concentração cai para um centésimo (1/100) do valor inicial?",
    opcoes: [
      { label: "A", valor: "1 minuto" },
      { label: "B", valor: "10 minutos" },
      { label: "C", valor: "20 minutos" },
      { label: "D", valor: "5 minutos" },
      { label: "E", valor: "12 minutos" }
    ],
    correta: "B",
    explicacao: "Queremos descobrir t onde C(t) = 0.01 × C₀. Substituindo: 0.01 × C₀ = C₀ × 10^(-0,2×t). Cortamos C₀ dos dois lados: 0.01 = 10^(-0,2×t). Sabemos que 0.01 (um centésimo) equivale a 10⁻². Como as bases agora são ambas 10, basta igualar os expoentes: -2 = -0,2 × t. Removendo as negações: 2 = 0.2 × t. t = 2 / 0.2. A resolução dá C(t) final = 10. Tempo é 10."
  }
];
