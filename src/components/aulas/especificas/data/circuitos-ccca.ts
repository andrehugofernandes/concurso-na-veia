export interface FlipCardData {
  frenteTitle: string;
  frenteSub: string;
  versoLabel: string;
  versoText: string;
  versoCerto?: string;
  versoErrado?: string;
  color: 'blue' | 'emerald' | 'amber' | 'rose' | 'violet' | 'teal' | 'cyan' | 'indigo' | 'slate' | 'yellow' | 'lime' | 'red' | 'orange';
  categoria: string;
  iconName: string; // Nome do ícone para ser mapeado no JSX
}

export interface ModuloConteudo {
  numero: number;
  titulo: string;
  descricao: string;
  intro: {
    titulo: string;
    paragrafos: string[]; // Exatamente 10 parágrafos densos (C.E.D.E.A - 2 por letra)
    diagrama: {
      titulo: string;
      descricao: string;
      imageUrl: string;
      legenda: string;
    };
    listaCorrida?: {
      num: number;
      title: string;
      text: string;
    }[];
  };
  accordion: {
    titulo: string;
    conteudo: string;
    iconName: string;
  }[];
  flipcardsConceito: FlipCardData[];
  flipcardsPratica: FlipCardData[];
  errosDicas?: {
    erro: string;
    dica: string;
  };
  consolidation: {
    videoId: string;
    videoTitle: string;
    videoDuration: string;
    sinteseTitle: string;
    sinteseMarkdown: string; // Texto formatado para o macete
  };
}

export const CONTEUDO_CIRCUITOS: ModuloConteudo[] = [
  {
    numero: 1,
    titulo: "Introdução à Eletrodinâmica",
    descricao: "Entenda o comportamento das cargas elétricas em movimento e os parâmetros básicos de V, I, R e P.",
    intro: {
      titulo: "Fundamentos Físicos e Portadores de Carga na Indústria",
      paragrafos: [
        "A Eletrodinâmica estuda o movimento ordenado das cargas elétricas livres sob a influência de um campo elétrico estabelecido. Em instalações industriais da Petrobras, como refinarias e plataformas offshore, esse fluxo de energia é a força motriz que alimenta desde motores trifásicos de alta potência até transdutores sensíveis em malhas de controle de processos.",
        "O domínio conceitual dos portadores de carga e da velocidade de deriva de elétrons livres é crucial para resolver questões de física básica e de engenharia aplicadas a cabos condutores de cobre e alumínio, temas recorrentes nas provas elaboradas pela banca CESGRANRIO.",
        "A corrente elétrica representa o fluxo líquido de carga que atravessa uma seção transversal do condutor por unidade de tempo, dada pela relação fundamental $I = dq/dt$. Para que este fluxo se mantenha estável, é necessária a aplicação de uma diferença de potencial elétrico (tensão), medida em Volts, que fornece a energia por unidade de carga para o seu deslocamento no circuito.",
        "A resistência elétrica, por sua vez, constitui a oposição natural apresentada pela estrutura cristalina dos metais às colisões e deslocamento dos elétrons livres. A inter-relação entre estas grandezas é consolidada pela potência elétrica (P = V * I), indicando a taxa de conversão energética no bipolo por segundo.",
        "Para fixação de prova, considere o exemplo clássico de um cabo de cobre de instrumentação operando sob carga nominal em uma refinaria. Se a diferença de potencial elétrico aplicada é estável e a resistência ôhmica do cabo é conhecida, a intensidade da corrente elétrica resultante será perfeitamente previsível e linear.",
        "Contrariamente, um isolante elétrico ideal apresentará resistência teoricamente infinita, impedindo o fluxo de portadores sob tensões operacionais comuns, enquanto semicondutores e dispositivos não-lineares exibirão variações abruptas de resistência em função da temperatura ou polarização.",
        "Nas plantas de processo, a especificação inadequada de cabos condutores pode provocar quedas de tensão intoleráveis na alimentação de atuadores e transdutores de segurança. A resistividade intrínseca do material (como cobre recozido a 20°C) é a base de cálculo para mitigar perdas e garantir que a ddp útil nos terminais do equipamento cumpra a tolerância nominal.",
        "Além disso, a variação da condutibilidade dos materiais com a presença de impurezas metálicas e imperfeições estruturais é frequentemente explorada em enunciados analíticos de concursos públicos. A pureza química de ligas condutoras define a eficiência térmica global do condutor elétrico sob regime contínuo.",
        "A banca CESGRANRIO costuma elaborar questões que exigem a conversão direta de unidades e a aplicação do balanço dimensional para grandezas elétricas e magnéticas. O candidato deve dominar a relação de equivalência entre unidades do SI, como Ampère (C/s), Volt (J/C) e Watt (J/s).",
        "A análise detida de diagramas dimensionais impede que erros de digitação de constantes ou frações decimais em escalas de potência (como mili, micro ou mega) invalidem a resolução de problemas complexos de circuitos de instrumentação."
      ],
      diagrama: {
        titulo: "Diagrama das Grandezas Elétricas Fundamentais",
        descricao: "O diagrama ilustra o fluxo de elétrons livres gerado pela diferença de potencial (tensão) sob oposição da resistência física do material condutor.",
        imageUrl: "/assets/images/eletrica/circuitos-ccca/modulo-1/m1-intro.png",
        legenda: "Fig 1. Relação entre tensão, corrente e resistência."
      },
      listaCorrida: [
        { num: 1, title: "Condutores", text: "Materiais com elétrons livres fracamente ligados ao núcleo (cobre, alumínio)." },
        { num: 2, title: "Isolantes", text: "Materiais com elétrons fortemente ligados, dificultando a corrente (borracha, vidro)." }
      ]
    },
    accordion: [
      {
        titulo: "Corrente Elétrica (I)",
        conteudo: "Representada matematicamente por I = dq/dt e medida em Ampères (A). Indica a quantidade de carga (em Coulombs) que atravessa a seção transversal do condutor a cada 1 segundo (1 A = 1 C/s).",
        iconName: "LuActivity"
      },
      {
        titulo: "Tensão Elétrica (V)",
        conteudo: "Diferença de potencial (ddp) medida em Volts (V). Indica a energia (trabalho) necessária para mover uma carga unitária de 1 Coulomb entre dois pontos do circuito (1 V = 1 J/C).",
        iconName: "LuZap"
      },
      {
        titulo: "Resistência (R) e Potência (P)",
        conteudo: "A resistência se opõe ao fluxo elétrico. A potência (P = V * I) mede o trabalho executado em watts (W) pelo fluxo elétrico por unidade de tempo (1 W = 1 J/s).",
        iconName: "LuCpu"
      }
    ],
    flipcardsConceito: [
      {
        frenteTitle: "AMPÈRE",
        frenteSub: "Unidade de Corrente",
        versoLabel: "Fato de Prova",
        versoText: "Um Ampère equivale ao fluxo de 1 Coulomb de carga passando por uma seção transversal a cada 1 segundo.",
        versoCerto: "1 A = 1 C/s. Mede a taxa de movimentação líquida de carga.",
        versoErrado: "Confundir vazão de carga com velocidade de propagação de ondas.",
        color: "blue",
        categoria: "Conceitos Básicos",
        iconName: "LuActivity"
      },
      {
        frenteTitle: "VOLT",
        frenteSub: "Unidade de Tensão",
        versoLabel: "Fato de Prova",
        versoText: "Um Volt mede a energia de 1 Joule transferida a cada 1 Coulomb de carga elétrica que se desloca.",
        versoCerto: "1 V = 1 J/C. Indica a diferença de potencial de força motriz.",
        versoErrado: "Confundir ddp com fluxo de elétrons direto.",
        color: "amber",
        categoria: "Conceitos Básicos",
        iconName: "LuZap"
      },
      {
        frenteTitle: "WATT",
        frenteSub: "Unidade de Potência",
        versoLabel: "Fato de Prova",
        versoText: "Um Watt é a taxa de conversão energética equivalente a 1 Joule de energia consumida ou produzida por segundo.",
        versoCerto: "1 W = 1 J/s. Indica o consumo ou geração instantâneos de potência.",
        versoErrado: "Achar que watts mede energia acumulada no tempo (Wh).",
        color: "emerald",
        categoria: "Conceitos Básicos",
        iconName: "LuCpu"
      }
    ],
    flipcardsPratica: [
      {
        frenteTitle: "Sentido Convencional",
        frenteSub: "Movimento de Cargas",
        versoLabel: "Fato de Prova",
        versoText: "Nas análises de circuitos, a corrente flui do potencial mais alto (+) para o mais baixo (-), opondo-se ao fluxo real de elétrons.",
        versoCerto: "Adotar o sentido convencional simplifica as equações nodais.",
        versoErrado: "Achar que o sentido real altera a potência útil calculada.",
        color: "indigo",
        categoria: "Aplicações Práticas",
        iconName: "LuLayers"
      },
      {
        frenteTitle: "Medição de Corrente",
        frenteSub: "Uso do Amperímetro",
        versoLabel: "Fato de Prova",
        versoText: "Amperímetros devem ser conectados em série com o ramo para medir a corrente integral sem sofrer danos por curto-circuito.",
        versoCerto: "Resistência interna do amperímetro ideal é zero (0 Ω).",
        versoErrado: "Ligar o amperímetro em paralelo com uma fonte de tensão.",
        color: "rose",
        categoria: "Aplicações Práticas",
        iconName: "LuShieldAlert"
      },
      {
        frenteTitle: "Medição de Tensão",
        frenteSub: "Uso do Voltímetro",
        versoLabel: "Fato de Prova",
        versoText: "Voltímetros devem ser conectados em paralelo com o elemento para medir a queda de ddp nos seus terminais.",
        versoCerto: "Resistência interna do voltímetro ideal é infinita (∞ Ω).",
        versoErrado: "Ligar o voltímetro em série e interromper o ramo do circuito.",
        color: "teal",
        categoria: "Aplicações Práticas",
        iconName: "LuTrendingUp"
      }
    ],
    consolidation: {
      videoId: "tPq4FjWz_Zg",
      videoTitle: "Fundamentos de Eletrodinâmica Industrial",
      videoDuration: "09:30",
      sinteseTitle: "Simbologia e Unidades Fundamentais",
      sinteseMarkdown: "A corrente contínua (CC) mantém direção e magnitude constantes. Fórmulas cruciais: **V = R * I** e **P = V * I**. Sempre certifique-se das unidades compatíveis ao aplicar equações na prova. Lembre-se: Amperímetro ideal = 0 Ω (Série); Voltímetro ideal = ∞ Ω (Paralelo)."
    }
  },
  {
    numero: 2,
    titulo: "Leis de Ohm e Efeitos Térmicos",
    descricao: "Entenda a relação matemática de linearidade e a dissipação térmica por efeito Joule nos condutores.",
    intro: {
      titulo: "Mecanismo de Linearidade e Variação Térmica do Cobre",
      paragrafos: [
        "A resistência elétrica de condutores metálicos obedece às leis formuladas por Georg Simon Ohm no século dezenove. Compreender a constância de proporcionalidade entre a ddp aplicada e a corrente resultante fundamenta a análise de malhas elétricas lineares em qualquer planta industrial da Petrobras.",
        "A Primeira Lei de Ohm enuncia que, mantida constante a temperatura do condutor físico, a corrente elétrica é diretamente proporcional à diferença de potencial de alimentação. O fator constante de ajuste dessa proporção é a resistência do bipolo.",
        "A Segunda Lei de Ohm investiga a geometria do material metálico condutor, detalhando a influência do comprimento longitudinal e da seção reta de área. Cabos mais longos impõem maior resistência devido ao maior caminho imposto aos elétrons livres, dada por $R = \\rho \\cdot (L / A)$.",
        "A dissipação de energia que ocorre quando elétrons em movimento colidem contra a rede cristalina atômica caracteriza o Efeito Joule. Essa energia cinética transformada em calor causa a elevação térmica em condutores sob carga nominal de operação.",
        "Para fixação, se você duplicar o comprimento de um cabo mantendo a seção, a resistência dobra. Se você duplicar o diâmetro, a área quadruplica e a resistência cai para um quarto do valor inicial. Essa proporcionalidade geométrica é a base para cabos longos.",
        "Contrariamente, in dispositivos semicondutores como diodos de potência ou termistores, a resistência não é constante em relação à ddp aplicada (comportamento não-ôhmico), onde a curva característica de corrente é exponencial ou logarítmica.",
        "Nas instalações industriais da Petrobras, a resistividade ($\\rho$) do cobre varia diretamente com a temperatura de operação de acordo com o coeficiente de temperatura ($\\alpha$). Sob temperaturas elevadas típicas de refinarias ou proximidades de fornos, a resistência aumenta, gerando maiores perdas por calor.",
        "Esse fenômeno exige o cálculo de correção de ampacidade em cabos de distribuição de força de acordo com normas técnicas específicas (como a NBR 5410). Ignorar este fator resulta em perda acelerada de isolação e envelhecimento precoce dos cabos de força.",
        "A banca CESGRANRIO costuma cobrar problemas analíticos que envolvem resistividade volumétrica ajustada a 70°C ou 90°C. Entender a equação de ajuste térmico $R(T) = R_0 [1 + \\alpha(T - T_0)]$ é uma ferramenta indispensável para obter a aprovação.",
        "Outra pegadinha recorrente é a confusão entre resistividade (característica intrínseca do material) e resistência (característica geométrica e física de uma amostra específica). Fique atento para não confundir essas grandezas fundamentais."
      ],
      diagrama: {
        titulo: "Efeito da Geometria do Condutor",
        descricao: "O comportamento da resistência varia proporcionalmente com o comprimento (L) e inversamente com a área (A) da seção reta do cabo condutor.",
        imageUrl: "/assets/images/eletrica/circuitos-ccca/modulo-2/m2-intro.png",
        legenda: "Fig 2. Parâmetros da segunda lei de Ohm."
      }
    },
    accordion: [
      {
        titulo: "Primeira Lei de Ohm",
        conteudo: "V = R * I. Demonstra que a resistência elétrica R permanece constante em condutores ôhmicos ideais, mantendo uma curva característica linear (reta que passa pela origem do gráfico V-I).",
        iconName: "LuZap"
      },
      {
        titulo: "Segunda Lei de Ohm",
        conteudo: "R = ρ * (L / A). A resistência depende da resistividade (ρ) do metal, do comprimento (L) e da área de seção transversal (A). Cabos com maior seção reta dissipam menos tensão.",
        iconName: "LuCpu"
      },
      {
        titulo: "Efeito Joule e Perdas",
        conteudo: "P = R * I². A potência dissipada sob a forma de calor varia com o quadrado da corrente. Cabos subdimensionados sofrem superaquecimento e perda da isolação termoplástica.",
        iconName: "LuShieldAlert"
      }
    ],
    flipcardsConceito: [
      {
        frenteTitle: "Resistividade (ρ)",
        frenteSub: "Propriedade do Material",
        versoLabel: "Fato de Prova",
        versoText: "A resistividade mede a oposição inerente do material ao fluxo de corrente, independente de sua geometria. É expressa em Ω·m.",
        versoCerto: "A resistividade aumenta com a temperatura na maioria dos metais.",
        versoErrado: "Achar que a resistividade muda se cortarmos o cabo pela metade.",
        color: "blue",
        categoria: "Propriedades Físicas",
        iconName: "LuCpu"
      },
      {
        frenteTitle: "Condutividade (σ)",
        frenteSub: "Inverso da Resistividade",
        versoLabel: "Fato de Prova",
        versoText: "A condutividade elétrica mede a facilidade que o material oferece à passagem de corrente (σ = 1/ρ). Medida em Siemens por metro (S/m).",
        versoCerto: "Materiais como prata e cobre têm condutividade altíssima.",
        versoErrado: "Achar que condutores de diâmetro menor têm maior condutividade específica.",
        color: "teal",
        categoria: "Propriedades Físicas",
        iconName: "LuActivity"
      },
      {
        frenteTitle: "Coeficiente de Temp. (α)",
        frenteSub: "Efeito Térmico",
        versoLabel: "Fato de Prova",
        versoText: "O coeficiente de temperatura indica a taxa de variação da resistência por grau Celsius de alteração térmica.",
        versoCerto: "Cobre recozido tem α positivo (+0,00393 por °C a 20°C).",
        versoErrado: "Supor que a resistência de todos os materiais cai com o calor.",
        color: "amber",
        categoria: "Efeitos Térmicos",
        iconName: "LuZap"
      }
    ],
    flipcardsPratica: [
      {
        frenteTitle: "Queda de Tensão",
        frenteSub: "Perda Longitudinal",
        versoLabel: "Fato de Prova",
        versoText: "A ddp decai ao longo do cabo devido à sua resistência interna ($\Delta V = R \cdot I$). A norma limita essa queda em no máximo 4% ou 5%.",
        versoCerto: "Aumentar a bitola do cabo reduz a queda de tensão resultante.",
        versoErrado: "Achar que cabos longos não causam atenuação da ddp efetiva.",
        color: "rose",
        categoria: "Dimensionamento",
        iconName: "LuShieldAlert"
      },
      {
        frenteTitle: "Fusíveis e Disjuntores",
        frenteSub: "Proteção contra Sobrecarga",
        versoLabel: "Fato de Prova",
        versoText: "Dispositivos que operam baseados no Efeito Joule (fusíveis) ou no magnetismo (disjuntores) para interromper correntes anômalas.",
        versoCerto: "Fusíveis fundem-se quando a corrente nominal gera calor excessivo.",
        versoErrado: "Dimensionar a corrente do fusível abaixo da carga de trabalho normal.",
        color: "orange",
        categoria: "Proteção",
        iconName: "LuLayers"
      },
      {
        frenteTitle: "Resistência de Contato",
        frenteSub: "Gargalos de Conexão",
        versoLabel: "Fato de Prova",
        versoText: "Conexões frouxas ou oxidadas introduzem alta resistência pontual, provocando superaquecimento localizado e risco de arco elétrico.",
        versoCerto: "Reapertos periódicos evitam pontos quentes detectáveis por termografia.",
        versoErrado: "Achar que a resistência de contato não dissipa potência Joule.",
        color: "indigo",
        categoria: "Manutenção",
        iconName: "LuTrendingUp"
      }
    ],
    consolidation: {
      videoId: "vO3g-eQ6H98",
      videoTitle: "Leis de Ohm e Cálculo de Perda por Efeito Joule",
      videoDuration: "10:15",
      sinteseTitle: "Fórmulas de Resistência e Dissipação",
      sinteseMarkdown: "A resistividade ($\\rho$) do cobre comercial é de aproximadamente $1,72 \\times 10^{-8}\\ \\Omega\\cdot\\text{m}$. Fórmula térmica: **$R_t = R_0 [1 + \\alpha(T - T_0)]$**. A potência dissipada aumenta quadraticamente com a corrente: **$P = R \\cdot I^2$**. Sempre use essa relação para dimensionamento seguro contra sobrecargas."
    }
  },
  {
    numero: 3,
    titulo: "Leis de Kirchhoff (LKT e LKC)",
    descricao: "Aprenda as leis físicas de conservação de energia e carga elétrica em malhas e nós de circuitos elétricos.",
    intro: {
      titulo: "Leis de Conservação nos Nós e Malhas Industriais",
      paragrafos: [
        "A análise sistemática de circuitos elétricos de qualquer complexidade baseia-se nas duas leis fundamentais formuladas por Gustav Robert Kirchhoff em 1845. Elas constituem a expressão direta dos princípios de conservação da carga elétrica e da energia no contexto de circuitos elétricos concentrados.",
        "A aplicação dessas leis é o alecerce para desvendar fluxos de corrente e tensões nodais em subestações elétricas de refinarias da Petrobras, onde sistemas redundantes de energia operam interconectados para evitar paradas indesejadas de bombas.",
        "A Lei de Kirchhoff para Correntes (LKC), ou Lei dos Nós, enuncia que a soma algébrica das intensidades de corrente elétrica que convergem para um nó estrutural de um circuito é exatamente nula. Isso reflete a conservação de carga: a carga que entra é igual à que sai.",
        "A Lei de Kirchhoff para Tensões (LKT), ou Lei das Malhas, enuncia que a soma algébrica das diferenças de potencial elétrico (ddp) ao longo de qualquer percurso fechado (malha) de um circuito é identicamente nula. Isso reflete a conservação da energia potencial ao longo da malha.",
        "Para fixação prática, considere um nó elétrico onde convergem três ramificações condutoras em paralelo. Se a corrente de entrada pelo cabo principal é de 10 A, a soma das correntes derivadas nos outros dois ramos deve totalizar exatamente 10 A.",
        "Contrariamente, se a soma das correntes de saída fosse menor do que a entrada, haveria acúmulo líquido de carga no nó condutor, violando o princípio fundamental da conservação física da eletricidade na escala macroscópica.",
        "Nas redes de distribuição das refinarias, o método clássico de análise nodal (associado à LKC) e o método das malhas (associado à LKT) são aplicados para programar relés de proteção digital de subestações de força e instrumentação.",
        "O domínio do equacionamento matricial para determinar tensões de nó em circuitos com múltiplas fontes independentes de corrente e tensão é o divisor de águas entre o nível básico de resolução e o nível profissional esperado no exame.",
        "A banca CESGRANRIO historicamente cobra o cálculo analítico de malhas contendo fontes dependentes (controladas por corrente ou por tensão). O candidato deve atentar para a polaridade relativa das fontes controladas para não invalidar o sinal das matrizes.",
        "Uma pegadinha comum envolve a definição inadequada do percurso de integração de malha quando existem fontes ideais de corrente no ramo. O uso correto do conceito de supermalha é a estratégia ideal para contornar essa barreira."
      ],
      diagrama: {
        titulo: "Análise de Malha Fechada",
        descricao: "O diagrama exemplifica o percurso de malha com fontes de tensão e resistores onde a soma algébrica das ddp ($\Sigma V$) deve ser estritamente zero.",
        imageUrl: "/assets/images/eletrica/circuitos-ccca/modulo-3/m3-intro.png",
        legenda: "Fig 3. Conceito de malha fechada e nós em circuitos elétricos."
      }
    },
    accordion: [
      {
        titulo: "LKC (Lei dos Nós)",
        conteudo: "Σ I_entrada = Σ I_saida. Garante que o acúmulo líquido de cargas elétricas em qualquer ponto nodal do circuito seja zero. Crucial para equacionar correntes em paralelo.",
        iconName: "LuActivity"
      },
      {
        titulo: "LKT (Lei das Malhas)",
        conteudo: "Σ V = 0. Garante que ao percorrer um circuito fechado, o balanço de energia potencial das fontes e quedas nos resistores seja nulo. Essencial para circuitos série.",
        iconName: "LuZap"
      },
      {
        titulo: "Supernó e Supermalha",
        conteudo: "Conceitos avançados usados quando fontes de ddp ideal estão entre dois nós (supernó) ou quando fontes de corrente ideal estão no ramo comum entre duas malhas (supermalha).",
        iconName: "LuLayers"
      }
    ],
    flipcardsConceito: [
      {
        frenteTitle: "Definição de Nó",
        frenteSub: "Ponto de Conexão",
        versoLabel: "Fato de Prova",
        versoText: "Um nó é o ponto de conexão física onde se encontram três ou mais terminais de componentes no circuito.",
        versoCerto: "Identificar nós é o primeiro passo para aplicar o método das tensões nodais.",
        versoErrado: "Confundir um simples cabo curvado com a existência de um nó real.",
        color: "blue",
        categoria: "Nomenclatura",
        iconName: "LuActivity"
      },
      {
        frenteTitle: "Definição de Ramo",
        frenteSub: "Caminho Único",
        versoLabel: "Fato de Prova",
        versoText: "Um ramo é o trecho de circuito contendo um único bipolo (componente) que interconecta dois nós adjacentes.",
        versoCerto: "A corrente ao longo de todo o ramo é estritamente constante.",
        versoErrado: "Achar que a corrente pode variar no interior de um mesmo ramo simples.",
        color: "teal",
        categoria: "Nomenclatura",
        iconName: "LuLayers"
      },
      {
        frenteTitle: "Definição de Malha",
        frenteSub: "Caminho Fechado",
        versoLabel: "Fato de Prova",
        versoText: "Uma malha é qualquer percurso fechado em um circuito que não contém outros caminhos fechados no seu interior.",
        versoCerto: "Representa a menor subdivisão de laço fechado para equacionamento LKT.",
        versoErrado: "Usar o laço externo como malha quando há nós internos isolados.",
        color: "indigo",
        categoria: "Nomenclatura",
        iconName: "LuZap"
      }
    ],
    flipcardsPratica: [
      {
        frenteTitle: "Convenção de Sinais",
        frenteSub: "Tratamento LKT",
        versoLabel: "Fato de Prova",
        versoText: "Ao percorrer a malha, se você entra pelo polo positivo (+) do bipolo, soma-se o termo; se entra pelo (-), subtrai-se.",
        versoCerto: "Manter a consistência do sentido escolhido (horário/anti-horário).",
        versoErrado: "Alternar o critério de sinal na metade do equacionamento da malha.",
        color: "rose",
        categoria: "Equacionamento",
        iconName: "LuShieldAlert"
      },
      {
        frenteTitle: "Método de Análise Nodal",
        frenteSub: "Foco na LKC",
        versoLabel: "Fato de Prova",
        versoText: "Consiste em adotar um nó de referência (terra) e equacionar a LKC para os nós restantes em termos de tensões nodais.",
        versoCerto: "Usa a condutância (G = 1/R) para montar a matriz de equações.",
        versoErrado: "Esquecer de somar as correntes injetadas pelas fontes de corrente.",
        color: "orange",
        categoria: "Resolução",
        iconName: "LuCpu"
      },
      {
        frenteTitle: "Número de Equações",
        frenteSub: "Critério de Complexidade",
        versoLabel: "Fato de Prova",
        versoText: "O número de equações necessárias é dado por (Nó - 1) na análise nodal e (Ramo - Nós + 1) na análise de malhas.",
        versoCerto: "Escolher o método com menor número de equações economiza tempo.",
        versoErrado: "Resolver um circuito de 4 malhas e 2 nós por malhas.",
        color: "emerald",
        categoria: "Estratégia",
        iconName: "LuTrendingUp"
      }
    ],
    consolidation: {
      videoId: "3j2fK56_abc",
      videoTitle: "Método de Análise Nodal e Malhas",
      videoDuration: "11:45",
      sinteseTitle: "Resumo das Equações Matriciais",
      sinteseMarkdown: "Para LKC: **$\\Sigma I_{\\text{entram}} = \\Sigma I_{\\text{saem}}$**. Para LKT: **$\\Sigma V_{\\text{malha}} = 0$**. Lembrete rápido: na análise nodal com N nós, você precisa de exatamente **N - 1** equações independentes. Defina sempre um referencial estável (0 V) no nó com maior número de conexões físicas para simplificar a matemática."
    }
  },
  {
    numero: 4,
    titulo: "Associação de Resistores e Divisores",
    descricao: "Domine o cálculo de equivalências série, paralelo, estrela-triângulo e a aplicação de divisores de tensão e corrente.",
    intro: {
      titulo: "Associações Geométricas e Equivalentes Industriais",
      paragrafos: [
        "A simplificação de malhas de resistores constitui uma habilidade básica na engenharia de circuitos, necessária para reduzir redes complexas a um único bipolo equivalente. A compreensão matemática das associações série e paralelo fundamenta o projeto de divisores de tensão e corrente de alta precisão.",
        "Em painéis e salas de controle da Petrobras, divisores de tensão e corrente são aplicados para condicionar sinais elétricos provenientes de sensores de vazão ou termopares, adequando-os aos níveis aceitos pelas placas de entrada analógica de CLPs.",
        "Na associação em série, todos os resistores são atravessados pela mesma intensidade de corrente, e a resistência equivalente é dada pela soma direta das parcelas. Na associação em paralelo, a tensão é comum a todos os elementos, e o inverso da resistência equivalente é a soma dos inversos das partes.",
        "Em situações em que a ponte de resistores não se apresenta em série ou paralelo simples, aplica-se a transformação Estrela-Triângulo ($Y-\\Delta$). Essa equivalência matemática desfaz conexões em malha fechada, permitindo a simplificação convencional subsequente.",
        "Para fixação de cálculo, se você associar em paralelo dois resistores idênticos de 100 Ω, a resistência equivalente cai para 50 Ω. Se a associação for em série, a resistência equivalente total eleva-se para 200 Ω.",
        "Contrariamente, a associação em paralelo de resistores de valores muito distintos resultará em uma resistência equivalente que é sempre estritamente menor do que o menor resistor individual presente na associação.",
        "Nas malhas de calibração de transmissores eletrônicos de instrumentação, o divisor de tensão é amplamente usado para obter referências estáveis de ddp através da relação linear $V_{out} = V_{in} [R_2 / (R_1 + R_2)]$.",
        "A correta aplicação de divisores de corrente permite derivar sinalizações analógicas de 4 a 20 mA sem saturar os terminais de entrada de equipamentos de monitoramento contínuo em turbo-geradores de plataformas.",
        "A banca CESGRANRIO explora simetrias geométricas em grids infinitos ou cubos de resistores para testar a percepção lógica do candidato. O mapeamento de pontos equi-potenciais permite curto-circuitar ramos redundantes e simplificar o cálculo.",
        "Preste atenção especial à ponte de Wheatstone. Quando a ponte está equilibrada (produto cruzado das resistências opostas é idêntico), nenhuma corrente flui pelo galvanômetro central, permitindo eliminá-lo na simplificação."
      ],
      diagrama: {
        titulo: "Divisor de Tensão e Ponte de Wheatstone",
        descricao: "Esquema mostrando o circuito clássico de um divisor de tensão e a ponte de Wheatstone equilibrada utilizada para calibração de sensores.",
        imageUrl: "/assets/images/eletrica/circuitos-ccca/modulo-4/m4-intro.png",
        legenda: "Fig 4. Circuitos divisores e pontes de medição."
      }
    },
    accordion: [
      {
        titulo: "Associação em Série e Paralelo",
        conteudo: "Série: Req = R1 + R2 + ... + Rn (corrente comum). Paralelo: Req = (R1 * R2) / (R1 + R2) para dois resistores (tensão comum). O inverso de Req é a soma das condutâncias.",
        iconName: "LuLayers"
      },
      {
        titulo: "Transformação Estrela-Triângulo",
        conteudo: "Conversão Y-Δ. Permite transformar uma rede de 3 terminais conectada em estrela (Y) em uma equivalente em triângulo (Δ) usando fórmulas de conversão baseadas em nós.",
        iconName: "LuCpu"
      },
      {
        titulo: "Divisores de Tensão e Corrente",
        conteudo: "Divisor de Tensão: Vx = Vin * (Rx / Req). Divisor de Corrente: Ix = Itotal * (Req / Rx). Ferramentas rápidas que eliminam a necessidade de calcular a corrente total antes de obter o valor final.",
        iconName: "LuZap"
      }
    ],
    flipcardsConceito: [
      {
        frenteTitle: "Associação Série",
        frenteSub: "Balanço de Resistência",
        versoLabel: "Fato de Prova",
        versoText: "A resistência equivalente em série é sempre maior do que o maior resistor individual da associação física.",
        versoCerto: "Req = R1 + R2. A corrente encontra um único caminho para atravessar.",
        versoErrado: "Achar que a tensão em cada resistor da série é sempre a mesma se R1 ≠ R2.",
        color: "blue",
        categoria: "Associações",
        iconName: "LuLayers"
      },
      {
        frenteTitle: "Associação Paralelo",
        frenteSub: "Balanço de Resistência",
        versoLabel: "Fato de Prova",
        versoText: "A tensão é constante nos terminais de todos os resistores. A corrente se divide de forma inversamente proporcional à resistência.",
        versoCerto: "Req = 1 / (1/R1 + 1/R2). Condutâncias somam-se diretamente.",
        versoErrado: "Supor que a corrente se divide igualmente se as resistências forem desiguais.",
        color: "teal",
        categoria: "Associações",
        iconName: "LuCpu"
      },
      {
        frenteTitle: "Transformação Y-Δ",
        frenteSub: "Adequação de Redes",
        versoLabel: "Fato de Prova",
        versoText: "Permite eliminar nós internos de malhas de resistores que impedem a associação em série/paralelo tradicional.",
        versoCerto: "Para resistores idênticos (R): R_delta = 3 * R_estrela.",
        versoErrado: "Tentar associar resistores em triângulo como se estivessem em paralelo direto.",
        color: "indigo",
        categoria: "Transformação",
        iconName: "LuZap"
      }
    ],
    flipcardsPratica: [
      {
        frenteTitle: "Divisor de Tensão",
        frenteSub: "Condicionamento",
        versoLabel: "Fato de Prova",
        versoText: "A ddp sobre um resistor in série é proporcional ao seu valor relativo no somatório total das resistências da malha.",
        versoCerto: "V2 = Vin * R2 / (R1 + R2). Muito útil em malhas de sensores potenciométricos.",
        versoErrado: "Usar a fórmula do divisor sem considerar cargas em paralelo conectadas na saída.",
        color: "rose",
        categoria: "Divisores",
        iconName: "LuShieldAlert"
      },
      {
        frenteTitle: "Divisor de Corrente",
        frenteSub: "Condicionamento",
        versoLabel: "Fato de Prova",
        versoText: "A corrente desvia-se preferencialmente pelo caminho de menor oposição ôhmica da associação paralelo.",
        versoCerto: "I1 = Itotal * R2 / (R1 + R2). Note que no numerador usamos R2 (o outro ramo).",
        versoErrado: "Usar R1 no numerador ao calcular a corrente que flui por R1.",
        color: "orange",
        categoria: "Divisores",
        iconName: "LuActivity"
      },
      {
        frenteTitle: "Wheatstone Equilibrada",
        frenteSub: "Ponte de Medição",
        versoLabel: "Fato de Prova",
        versoText: "Ocorre quando o produto cruzado das resistências opostas é igual: R1 * R4 = R2 * R3. A tensão entre os nós centrais é nula.",
        versoCerto: "Usada para medir resistências desconhecidas com altíssima precisão térmica.",
        versoErrado: "Achar que a ponte equilibrada consome corrente no ramo do galvanômetro.",
        color: "emerald",
        categoria: "Pontes",
        iconName: "LuTrendingUp"
      }
    ],
    consolidation: {
      videoId: "wheatstone_v",
      videoTitle: "Divisor de Tensão e Análise da Ponte de Wheatstone",
      videoDuration: "12:10",
      sinteseTitle: "Mnemônicos de Divisão e Pontes",
      sinteseMarkdown: "Divisor de Tensão: **$V_x = V_{in} \\cdot (R_x / R_{total})$**. Divisor de Corrente: **$I_1 = I_{total} \\cdot [R_2 / (R_1 + R_2)]$**. Para Pontes equilibradas: **$R_1 R_4 = R_2 R_3$** (braços cruzados). Lembre-se: no divisor de corrente para dois ramos, no numerador vai sempre o resistor oposto ao que você está calculando!"
    }
  },
  {
    numero: 5,
    titulo: "Teoremas de Thévenin e Norton",
    descricao: "Aprenda a simplificar circuitos lineares complexos de dois terminais em equivalentes de tensão ou de corrente.",
    intro: {
      titulo: "Simplificação de Redes Ativas Lineares",
      paragrafos: [
        "A análise de grandes redes de distribuição e circuitos industriais exige o uso de teoremas de simplificação para torná-la viável. Os teoremas de Léon Charles Thévenin e Edward Lawry Norton são ferramentas matemáticas fundamentais que permitem reduzir qualquer circuito linear de dois terminais a um equivalente simples.",
        "Em sistemas de potência da Petrobras, os equivalentes de Thévenin são largamente empregados para modelar a impedância de curto-circuito de subestações de energia, permitindo dimensionar disjuntores de proteção aptos a extinguir arcos elétricos sem falhas destrutivas.",
        "O Teorema de Thévenin estabelece que qualquer rede linear contendo fontes e resistores, vista de dois terminais específicos, é eletricamente equivalente a uma única fonte ideal de tensão ($V_{th}$) em série com um único resistor ($R_{th}$).",
        "O Teorema de Norton, por sua vez, estabelece o equivalente dual de corrente: a rede é equivalente a uma única fonte ideal de corrente de curto-circuito ($I_N$) em paralelo com o mesmo resistor de Thévenin ($R_{th}$ ou $R_N$).",
        "Para fixação, a relação matemática que interconecta os dois teoremas é a lei de Ohm aplicada aos equivalentes: $V_{th} = R_{th} \\cdot I_N$. A transição de um modelo para o outro constitui uma transformação de fontes convencional.",
        "Contrariamente, estes teoremas não podem ser aplicados diretamente em redes que contêm componentes não-lineares, como lâmpadas de descarga ou transistores operando em regime saturado, sem antes realizar a linearização em torno de um ponto de operação.",
        "Para determinar a resistência de Thévenin ($R_{th}$) em redes contendo apenas fontes independentes, o procedimento padrão exige 'desativar' as fontes internas: fontes de tensão são substituídas por curto-circuitos (0 V) e fontes de corrente por circuitos abertos (0 A).",
        "Se o circuito contiver fontes dependentes, o método clássico exige a aplicação de uma fonte de teste externa ($V_o$) de 1 V ou 1 A nos terminais analisados para calcular a corrente resultante ($I_o$), onde a resistência será dada por $R_{th} = V_o / I_o$.",
        "A banca CESGRANRIO explora exaustivamente o Teorema da Máxima Transferência de Potência. Ele dita que uma carga resistiva ($R_L$) conectada aos terminais receberá a potência máxima se e somente se o seu valor for idêntico à resistência de Thévenin do circuito ($R_L = R_{th}$).",
        "Sob essa condição de casamento de impedâncias, o rendimento elétrico do sistema é de exatamente 50%. A potência máxima dissipada na carga será dada pela equação simplificada $P_{max} = V_{th}^2 / (4 \\cdot R_{th})$."
      ],
      diagrama: {
        titulo: "Modelos Equivalentes de Thévenin e Norton",
        descricao: "O diagrama ilustra os dois modelos duais de simplificação: fonte de tensão em série ($V_{th}$ e $R_{th}$) e fonte de corrente em paralelo ($I_N$ e $R_{N}$).",
        imageUrl: "/assets/images/eletrica/circuitos-ccca/modulo-5/m5-intro.png",
        legenda: "Fig 5. Equivalentes lineares de Thévenin e Norton."
      }
    },
    accordion: [
      {
        titulo: "Cálculo de Vth e IN",
        conteudo: "Vth é a ddp de circuito aberto (Vca) nos terminais analisados. IN é a corrente de curto-circuito (Icc) que flui se unirmos os terminais por um condutor ideal de 0 Ω.",
        iconName: "LuZap"
      },
      {
        titulo: "Determinação de Rth",
        conteudo: "Se não houver fontes dependentes: Rth é a resistência vista dos terminais com as fontes independentes desativadas (tensões curto-circuitadas, correntes abertas).",
        iconName: "LuCpu"
      },
      {
        titulo: "Máxima Transferência de Potência",
        conteudo: "Dita que RL = Rth para a transferência de potência de pico. O rendimento térmico do circuito sob essa condição é de 50%, com os outros 50% dissipados na Rth interna.",
        iconName: "LuLayers"
      }
    ],
    flipcardsConceito: [
      {
        frenteTitle: "Tensão de Thévenin",
        frenteSub: "DDP em Aberto",
        versoLabel: "Fato de Prova",
        versoText: "Vth é calculada como a diferença de potencial elétrico nos terminais de interesse mantidos em circuito aberto.",
        versoCerto: "Vth = Vca. Nenhuma corrente flui pela carga durante esta medição.",
        versoErrado: "Calcular Vth mantendo a resistência de carga conectada ao circuito.",
        color: "blue",
        categoria: "Thévenin",
        iconName: "LuZap"
      },
      {
        frenteTitle: "Corrente de Norton",
        frenteSub: "Corrente de Curto",
        versoLabel: "Fato de Prova",
        versoText: "IN é a corrente que atravessa os terminais de interesse quando estes são colocados em curto-circuito direto.",
        versoCerto: "IN = Icc. O curto ideal elimina a ddp nos terminais (0 V).",
        versoErrado: "Achar que a corrente de Norton depende da impedância da carga real.",
        color: "teal",
        categoria: "Norton",
        iconName: "LuActivity"
      },
      {
        frenteTitle: "Resistência Equivalente",
        frenteSub: "Resistência de Thévenin",
        versoLabel: "Fato de Prova",
        versoText: "Rth representa a resistência interna equivalente do circuito vista a partir dos terminais analisados.",
        versoCerto: "Rth = Vth / IN. Válido para qualquer rede linear contendo fontes.",
        versoErrado: "Somar resistências internas com fontes ativas no circuito.",
        color: "indigo",
        categoria: "Equivalentes",
        iconName: "LuCpu"
      }
    ],
    flipcardsPratica: [
      {
        frenteTitle: "Fontes Independentes",
        frenteSub: "Desativação de Fontes",
        versoLabel: "Fato de Prova",
        versoText: "Fontes de tensão viram curtos (fio) e fontes de corrente viram circuitos abertos (corte) ao calcular Rth.",
        versoCerto: "Desativar fontes independentes simplifica a análise de malhas passivas.",
        versoErrado: "Substituir fontes de corrente por curtos-circuitos durante o cálculo de Rth.",
        color: "rose",
        categoria: "Procedimento",
        iconName: "LuShieldAlert"
      },
      {
        frenteTitle: "Fontes Dependentes",
        frenteSub: "Método de Teste",
        versoLabel: "Fato de Prova",
        versoText: "Não podem ser desativadas. Deve-se injetar uma fonte de teste (Vo) nos terminais e calcular a corrente (Io). Rth = Vo/Io.",
        versoCerto: "As fontes dependentes respondem à fonte de teste aplicada.",
        versoErrado: "Tentar calcular Rth desativando fontes controladas de circuitos ativos.",
        color: "orange",
        categoria: "Procedimento",
        iconName: "LuLayers"
      },
      {
        frenteTitle: "Casamento de Carga",
        frenteSub: "Máxima Potência",
        versoLabel: "Fato de Prova",
        versoText: "Para transferir a potência de pico à carga resistiva RL, especifique RL exatamente igual a Rth.",
        versoCerto: "RL = Rth. Potência útil na carga: PL_max = Vth² / (4 * Rth).",
        versoErrado: "Achar que o casamento de impedância resulta em 100% de rendimento do circuito.",
        color: "emerald",
        categoria: "Casamento",
        iconName: "LuTrendingUp"
      }
    ],
    consolidation: {
      videoId: "thevenin_v",
      videoTitle: "Teoremas de Thévenin, Norton e Casamento de Carga",
      videoDuration: "14:30",
      sinteseTitle: "Mnemônicos de Thévenin e Norton",
      sinteseMarkdown: "Relação fundamental: **$V_{th} = R_{th} \\cdot I_N$**. Desativação: **Fonte de V → Fio (Curto)**; **Fonte de I → Corte (Aberto)**. Casamento de carga para potência máxima: **$R_L = R_{th}$** com rendimento elétrico de **50%**. A ddp na carga casada será exatamente **$V_{th} / 2$**."
    }
  },
  {
    numero: 6,
    titulo: "Parâmetros da Corrente Alternada",
    descricao: "Entenda os parâmetros fundamentais de sinais senoidais: amplitude, frequência, valor RMS, fase e período.",
    intro: {
      titulo: "Fundamentos Físicos da Geração de Sinais Senoidais",
      paragrafos: [
        "A Corrente Alternada (CA) constitui o padrão de geração, transmissão e distribuição de energia elétrica em todo o mundo. A variação periódica do sentido e da magnitude das grandezas elétricas decorre diretamente do movimento rotativo de geradores síncronos em campos magnéticos estáveis.",
        "Nas usinas termoelétricas e plataformas offshore da Petrobras, turbinas a gás ou vapor acionam geradores síncronos trifásicos para suprir energia elétrica na frequência de 60 Hz, alimentando compressores e bombas de processo sob elevados padrões de estabilidade.",
        "Um sinal senoidal de tensão é expresso matematicamente em função do tempo pela relação fundamental $v(t) = V_p \\cdot \\cos(\\omega t + \\phi)$, onde $V_p$ representa o valor de pico (amplitude máxima) e $\\omega$ denota a frequência angular.",
        "A frequência angular relaciona-se com a frequência cíclica ($f$) medida em Hertz através da equação $\\omega = 2\\pi f$. O período ($T$), correspondente ao tempo para completar um ciclo completo de oscilação, é dado pelo inverso da frequência cíclica ($T = 1/f$).",
        "Para fixação, na rede elétrica brasileira comercial de 60 Hz, o período temporal ($T$) de um ciclo completo da senóide é de aproximadamente 16,67 milissegundos ($1/60$ s), o que determina a velocidade de oscilação do sinal de força.",
        "Contrariamente, um sinal de Corrente Contínua (CC) ideal exibe frequência cíclica nula (0 Hz) e período infinito, mantendo uma amplitude estável e sentido constante do fluxo de portadores de carga ao longo do tempo.",
        "A medição prática de grandezas alternadas requer a definição do valor eficaz ou valor RMS (Root Mean Square). O valor RMS equivale à intensidade de uma corrente contínua estável que dissipa a mesma potência térmica em um resistor idêntico.",
        "Para sinais senoidais puros, a relação entre o valor de pico ($V_p$) e o valor eficaz ($V_{rms}$) é dada por $V_{rms} = V_p / \\sqrt{2} \\approx 0,707 \\cdot V_p$. Instrumentos True-RMS são exigidos para manter a precisão de medição em circuitos não-senoidais.",
        "A banca CESGRANRIO costuma explorar a diferença entre valor eficaz, valor médio e valor de pico a pico em exames técnicos. O valor médio de um ciclo completo de uma senóide simétrica pura é nulo, sendo o cálculo de valor médio computado sobre meio ciclo.",
        "Outra pegadinha recorrente é a conversão inadequada entre graus e radianos nos argumentos trigonométricos ao equacionar a ddp instantânea. Certifique-se de compatibilizar as unidades de ângulo na calculadora científica de prova."
      ],
      diagrama: {
        titulo: "Parâmetros Geométricos da Senóide",
        descricao: "Gráfico detalhando os parâmetros chaves de uma onda senoidal de tensão: período (T), valor de pico (Vp) e valor de pico a pico (Vpp).",
        imageUrl: "/assets/images/eletrica/circuitos-ccca/modulo-6/m6-intro.png",
        legenda: "Fig 6. Representação gráfica da tensão alternada no tempo."
      }
    },
    accordion: [
      {
        titulo: "Valor Eficaz (RMS)",
        conteudo: "Vrms = Vp / √2. O valor eficaz representa a equivalência de trabalho térmico do sinal alternado. A ddp de tomada comum no Brasil (127 V ou 220 V) é expressa em valores RMS.",
        iconName: "LuActivity"
      },
      {
        titulo: "Frequência e Período",
        conteudo: "f = 1/T e ω = 2πf. A frequência de rede no Brasil é 60 Hz, o que equivale a 60 oscilações por segundo e velocidade angular de aproximadamente 377 rad/s.",
        iconName: "LuZap"
      },
      {
        titulo: "Ângulo de Fase (ϕ)",
        conteudo: "Representa o deslocamento horizontal da onda em relação a uma referência temporal de origem (t = 0). Expressa se a onda está adiantada ou atrasada.",
        iconName: "LuLayers"
      }
    ],
    flipcardsConceito: [
      {
        frenteTitle: "Valor de Pico (Vp)",
        frenteSub: "Amplitude Máxima",
        versoLabel: "Fato de Prova",
        versoText: "Representa o valor máximo atingido pela onda senoidal em relação ao eixo horizontal neutro (0 V).",
        versoCerto: "Vp = Vrms * √2. Em 220 V RMS, a amplitude de pico é de aproximadamente 311 V.",
        versoErrado: "Achar que o valor eficaz é maior do que o valor de pico.",
        color: "blue",
        categoria: "Parâmetros",
        iconName: "LuZap"
      },
      {
        frenteTitle: "Valor Pico a Pico (Vpp)",
        frenteSub: "Amplitude Total",
        versoLabel: "Fato de Prova",
        versoText: "Mede a amplitude total da onda desde o pico positivo máximo até o pico negativo mínimo (Vpp = 2 * Vp).",
        versoCerto: "Para rede de 220 V RMS, a ddp total pico a pico é de aproximadamente 622 V.",
        versoErrado: "Confundir valor de pico a pico com a ddp eficaz RMS da rede.",
        color: "teal",
        categoria: "Parâmetros",
        iconName: "LuLayers"
      },
      {
        frenteTitle: "Frequência Angular (ω)",
        frenteSub: "Velocidade de Rotação",
        versoLabel: "Fato de Prova",
        versoText: "Expressa a velocidade de rotação fasorial do sinal alternado em radianos por segundo (rad/s).",
        versoCerto: "ω = 2πf. A 60 Hz, o valor aproximado é de 377 rad/s (ou 120π).",
        versoErrado: "Achar que a unidade de frequência angular (ω) é Hertz (Hz).",
        color: "indigo",
        categoria: "Parâmetros",
        iconName: "LuActivity"
      }
    ],
    flipcardsPratica: [
      {
        frenteTitle: "True RMS",
        frenteSub: "Precisão Instrumental",
        versoLabel: "Fato de Prova",
        versoText: "Multímetros True-RMS medem com precisão o valor eficaz mesmo em ondas distorcidas ou harmônicos severos.",
        versoCerto: "Multímetros comuns (baratos) erram medições em ondas não-senoidais.",
        versoErrado: "Supor que a relação Vp/1.414 vale para qualquer formato de onda (quadrada, triangular).",
        color: "rose",
        categoria: "Instrumentação",
        iconName: "LuShieldAlert"
      },
      {
        frenteTitle: "Fator de Forma",
        frenteSub: "Relação RMS/Médio",
        versoLabel: "Fato de Prova",
        versoText: "O fator de forma é a relação entre o valor eficaz e o valor médio retificado (F = Vrms / Vmed_ret).",
        versoCerto: "Para senóide pura, o fator de forma é de aproximadamente 1,11.",
        versoErrado: "Achar que o fator de forma é constante para qualquer formato de onda.",
        color: "orange",
        categoria: "Parâmetros",
        iconName: "LuLayers"
      },
      {
        frenteTitle: "Fase Relativa",
        frenteSub: "Balanço Fasorial",
        versoLabel: "Fato de Prova",
        versoText: "Permite determinar o atraso ou avanço angular entre duas ondas senoidais de mesma frequência.",
        versoCerto: "Diferença de fase: Δϕ = ϕ1 - ϕ2. Indica deslocamento no tempo.",
        versoErrado: "Comparar fases de ondas de frequências cíclicas distintas.",
        color: "emerald",
        categoria: "Fasores",
        iconName: "LuTrendingUp"
      }
    ],
    consolidation: {
      videoId: "ca_param_v",
      videoTitle: "Parâmetros e Valor Eficaz em Corrente Alternada",
      videoDuration: "11:20",
      sinteseTitle: "Mnemônicos de Senóides",
      sinteseMarkdown: "Fórmulas fundamentais: **$V_{rms} = V_p / \\sqrt{2}$**, **$T = 1/f$** e **$\\omega = 2\\pi f$**. Para rede de $60\\ \\text{Hz}$, **$\\omega \\approx 377\\ \\text{rad/s}$** e **$T \\approx 16,67\\ \\text{ms}$**. Lembre-se: em instrumentos de medição industrial de força, a leitura indicada é sempre o valor **eficaz RMS**."
    }
  },
  {
    numero: 7,
    titulo: "Componentes Reativos em CA",
    descricao: "Estude o comportamento de indutores e capacitores em CA, o atraso/avanço de fase e o cálculo de reatâncias.",
    intro: {
      titulo: "Física de Armazenamento de Energia e Reatância",
      paragrafos: [
        "A introdução de indutores e capacitores em circuitos excitados por corrente alternada altera profundamente a dinâmica das correntes e tensões. Diferente dos resistores puros, que dissipam energia de forma irreversível por efeito Joule, estes componentes armazenam e devolvem energia temporariamente.",
        "Em instalações elétricas de refinarias, como motores de indução e cabos subterrâneos isolados de grande extensão, o comportamento reativo desses componentes afeta diretamente a capacidade de transmissão e estabilização de tensão.",
        "O indutor opõe-se a variações abruptas de corrente elétrica, armazenando energia no seu campo magnético interno de acordo com a indutância ($L$). Em CA, essa oposição dinâmica constitui a reatância indutiva ($X_L$), dada pela equação linear $X_L = \\omega L$.",
        "O capacitor opõe-se a variações abruptas de tensão elétrica, armazenando energia no seu campo elétrico dielétrico interno de acordo com a capacitância ($C$). Em CA, essa oposição dinâmica constitui a reatância capacitiva ($X_C$), dada por $X_C = 1 / (\\omega C)$.",
        "Para fixação conceitual, considere a resposta de fase: em um indutor puro, a corrente elétrica está atrasada de exatamente 90° ($\\pi/2$ rad) em relação à tensão. Em um capacitor puro, a corrente elétrica está adiantada de exatamente 90° em relação à tensão.",
        "Contrariamente, se a frequência cíclica cair para zero (regime CC permanente), o indutor comporta-se como um curto-circuito ideal (0 Ω) e o capacitor comporta-se como um circuito aberto ideal (resistência infinita).",
        "Na análise de circuitos CA, indutores e capacitores introduzem impedâncias imaginárias no plano complexo. Usando a notação fasorial e de números complexos, a impedância do indutor é dada por $jX_L$ e a do capacitor por $-jX_C$.",
        "Esse deslocamento fasorial de fase é a causa fundamental do surgimento do fluxo de potência reativa em indústrias, provocando o baixo fator de potência que sobrecarrega condutores e transformadores de plataforma.",
        "A banca CESGRANRIO explora cálculos diretos de impedância série e paralelo sob frequências específicas (ex: calcular a reatância capacitiva a 60 Hz). Lembre-se de converter a capacitância de microfarads para farads ($10^{-6}$ F).",
        "Outra pegadinha envolve a combinação de capacitores e indutores em circuitos sintonizados, onde a reatância equivalente zera em frequências de ressonância. Fique atento às equações de cancelamento de reatâncias."
      ],
      diagrama: {
        titulo: "Relação Fasorial em Indutores e Capacitores",
        descricao: "Diagrama fasorial ilustrando o avanço de 90° da corrente no capacitor e o atraso de 90° da corrente no indutor em relação ao vetor de tensão.",
        imageUrl: "/assets/images/eletrica/circuitos-ccca/modulo-7/m7-intro.png",
        legenda: "Fig 7. Fasores de tensão e corrente nos reativos."
      }
    },
    accordion: [
      {
        titulo: "Indutores em CA",
        conteudo: "XL = ωL. A oposição ao fluxo aumenta diretamente com a frequência. O indutor causa o atraso da corrente em relação à ddp aplicada em exatamente 90 graus (CIVIL: L no final).",
        iconName: "LuActivity"
      },
      {
        titulo: "Capacitores em CA",
        conteudo: "XC = 1/(ωC). A oposição ao fluxo reduz inversamente com a frequência. O capacitor adianta a corrente em relação à ddp em exatamente 90 graus (CIVIL: C no início).",
        iconName: "LuZap"
      },
      {
        titulo: "Mnemônico CIVIL",
        conteudo: "C-I-V-I-L. No Capacitor (C), a corrente (I) vem antes da tensão (V). Na Tensão (V), a corrente (I) vem depois na Indutância (L). Ferramenta visual clássica para provas.",
        iconName: "LuLayers"
      }
    ],
    flipcardsConceito: [
      {
        frenteTitle: "Reatância Indutiva",
        frenteSub: "Oposição do Indutor",
        versoLabel: "Fato de Prova",
        versoText: "A reatância indutiva ($X_L = \\omega L$) aumenta linearmente com a frequência cíclica. Oferece alta oposição a alta frequência.",
        versoCerto: "Impede ruídos de alta frequência em filtros harmônicos.",
        versoErrado: "Achar que a reatância indutiva dissipa potência ativa real.",
        color: "blue",
        categoria: "Reativos",
        iconName: "LuActivity"
      },
      {
        frenteTitle: "Reatância Capacitiva",
        frenteSub: "Oposição do Capacitor",
        versoLabel: "Fato de Prova",
        versoText: "A reatância capacitiva ($X_C = 1 / \\omega C$) diminui de forma hiperbólica com a elevação da frequência.",
        versoCerto: "Comporta-se como um curto para altas frequências de ruídos.",
        versoErrado: "Achar que a reatância capacitiva aumenta sob frequências altas.",
        color: "teal",
        categoria: "Reativos",
        iconName: "LuZap"
      },
      {
        frenteTitle: "Notação Complexa (j)",
        frenteSub: "Representação Fasorial",
        versoLabel: "Fato de Prova",
        versoText: "O operador complexo $j = \\sqrt{-1}$ rotaciona o vetor em 90° no sentido anti-horário no plano de Argand-Gauss.",
        versoCerto: "$Z_L = jX_L$ e $Z_C = -jX_C$. O sinal negativo indica rotação horária.",
        versoErrado: "Esquecer o sinal negativo na impedância complexa do capacitor.",
        color: "indigo",
        categoria: "Notação",
        iconName: "LuCpu"
      }
    ],
    flipcardsPratica: [
      {
        frenteTitle: "Corrente Contínua (CC)",
        frenteSub: "Regime Permanente",
        versoLabel: "Fato de Prova",
        versoText: "Em CC permanente (f=0), indutores viram curto-circuito (fio) e capacitores viram circuito aberto (corte).",
        versoCerto: "Permite simplificar malhas de capacitores/indutores sob baterias.",
        versoErrado: "Calcular correntes de capacitores em regime permanente sob ddp constante.",
        color: "rose",
        categoria: "Comportamento",
        iconName: "LuShieldAlert"
      },
      {
        frenteTitle: "Armazenamento",
        frenteSub: "Fluxo Energético",
        versoLabel: "Fato de Prova",
        versoText: "Indutores armazenam energia magnética ($E_L = \\frac{1}{2} L I^2$) e capacitores armazenam energia elétrica ($E_C = \\frac{1}{2} C V^2$).",
        versoCerto: "Energias oscilam a cada meio ciclo alternado.",
        versoErrado: "Achar que resistores armazenam energia para devolução futura.",
        color: "orange",
        categoria: "Física",
        iconName: "LuLayers"
      },
      {
        frenteTitle: "Capacitor Real",
        frenteSub: "Fator de Perdas",
        versoLabel: "Fato de Prova",
        versoText: "Capacitores reais possuem resistência série equivalente (ESR) que provoca dissipação Joule residual.",
        versoCerto: "ESR de alta especificação previne superaquecimentos de capacitores.",
        versoErrado: "Assumir que qualquer capacitor real é puramente reativo sem perdas.",
        color: "emerald",
        categoria: "Componentes",
        iconName: "LuTrendingUp"
      }
    ],
    consolidation: {
      videoId: "react_comp_v",
      videoTitle: "Comportamento Reativo de Capacitores e Indutores em CA",
      videoDuration: "13:45",
      sinteseTitle: "Mnemônicos CIVIL e Reatâncias",
      sinteseMarkdown: "Mnemônico: **CIVIL** (No **C**apacitor, **I** vem antes de **V**; no Indutor **L**, **V** vem antes de **I**). Fórmulas: **$X_L = 2\\pi f L$** e **$X_C = 1 / (2\\pi f C)$**. Impedâncias complexas: **$Z_L = jX_L$** e **$Z_C = -jX_C$**."
    }
  },
  {
    numero: 8,
    titulo: "Impedância Complexa e Circuitos RLC",
    descricao: "Aprenda a calcular impedância complexa, representar fasores no plano complexo e analisar circuitos RLC série e paralelo.",
    intro: {
      titulo: "Análise Fasorial e Ressonância em Circuitos Mistos",
      paragrafos: [
        "A presença simultânea de resistores, capacitores e indutores em um mesmo circuito alternado exige o abandono de termos puramente escalares. A análise matemática coerente de circuitos RLC recorre aos números complexos, unificando os efeitos de oposição e defasagem de fase em uma única grandeza chamada Impedância Complexa.",
        "Em redes elétricas de turbo-geradores e painéis de acionamento eletrônico de motores da Petrobras, a impedância equivalente determina a resposta dinâmica a correntes de carga e a presença de correntes harmônicas destrutivas.",
        "A impedância complexa ($\\mathbf{Z}$) é expressa na forma retangular por $\\mathbf{Z} = R + jX$, onde a parte real ($R$) representa a resistência ôhmica pura e a parte imaginária ($X$) denota a reatância equivalente resultante da diferença entre indutores e capacitores ($X = X_L - X_C$).",
        "A mesma impedância pode ser expressa na forma polar por $Z \\angle \\theta$, onde $Z$ representa o módulo geométrico (magnitude da oposição, dada por $\\sqrt{R^2 + X^2}$) e $\\theta$ denota o ângulo de fase del circuito (dado por $\\arctan(X/R)$).",
        "Para fixação rápida, considere o caso de ressonância elétrica série. Ocorre quando a reatância indutiva anula exatamente a reatância capacitiva ($X_L = X_C$), fazendo com que a impedância equivalente decline para o valor da resistência pura ($Z = R$).",
        "Contrariamente, na ressonância paralela ideal, as correntes reativas internas anulam-se mutualmente nos ramos indutivo e capacitivo, fazendo com que a impedância vista de fora tenda a um valor teoricamente infinito (circuito aberto).",
        "A determinação de correntes e tensões em circuitos RLC mistos exige a conversão constante entre as representações complexas. Soma e subtração de fasores são executadas na forma retangular, enquanto multiplicações e divisões são resolvidas com muito mais agilidade na forma polar.",
        "Em circuitos RLC série, a impedância equivalente aumenta quando nos afastamos da frequência de ressonância, enquanto a corrente circulante diminui drasticamente, limitando a transferência de energia ativa.",
        "A banca CESGRANRIO cobra com frequência o cálculo da frequência de ressonância natural do circuito RLC, dada pela clássica equação de Thomson $f_0 = 1 / (2\\pi \\sqrt{LC})$. O candidato deve dominar essa equação para evitar erros básicos.",
        "Outra pegadinha é a presença de sobretensões severas sobre os terminais do capacitor ou do indutor na ressonância série. A queda de tensão nesses componentes isolados pode exceder a ddp de alimentação de entrada do circuito, exigindo isolamento robusto."
      ],
      diagrama: {
        titulo: "Triângulo de Impedâncias e Ressonância",
        descricao: "Diagrama geométrico do triângulo de impedâncias relacionando resistência (R), reatância (X) e impedância complexa (Z), junto com a curva de ressonância série.",
        imageUrl: "/assets/images/eletrica/circuitos-ccca/modulo-8/m8-intro.png",
        legenda: "Fig 8. Triângulo de impedâncias e comportamento ressonante."
      }
    },
    accordion: [
      {
        titulo: "Impedância Complexa (Z)",
        conteudo: "Z = R + j(XL - XC). Unifica a oposição ôhmica ativa e a reatância imaginária em um único vetor. Unidade de medida: Ohm (Ω).",
        iconName: "LuActivity"
      },
      {
        titulo: "Módulo e Ângulo",
        conteudo: "Módulo: |Z| = √(R² + X²). Ângulo de fase: θ = arctan(X/R). Determina se o circuito se comporta de forma majoritariamente indutiva (θ > 0) ou capacitiva (θ < 0).",
        iconName: "LuZap"
      },
      {
        titulo: "Ressonância RLC Série",
        conteudo: "Ocorre a f0 = 1/(2π√LC). XL e XC cancelam-se. A impedância é mínima e puramente resistiva, gerando a corrente máxima no circuito.",
        iconName: "LuLayers"
      }
    ],
    flipcardsConceito: [
      {
        frenteTitle: "Forma Retangular",
        frenteSub: "Componentes Ortogonais",
        versoLabel: "Fato de Prova",
        versoText: "Expressa a impedância complexa em partes reais (R) e imaginárias (X): Z = R + jX.",
        versoCerto: "Forma retangular é ideal para somar impedâncias em série.",
        versoErrado: "Tentar multiplicar impedâncias complexas diretamente nesta forma.",
        color: "blue",
        categoria: "Matemática Fasorial",
        iconName: "LuCpu"
      },
      {
        frenteTitle: "Forma Polar",
        frenteSub: "Magnitude e Direção",
        versoLabel: "Fato de Prova",
        versoText: "Expressa a impedância complexa em módulo e ângulo de fase: Z ∠ θ.",
        versoCerto: "Ideal para realizar divisões (Lei de Ohm: I = V/Z) e multiplicações.",
        versoErrado: "Somar módulos e ângulos polares diretamente sem conversão retangular.",
        color: "teal",
        categoria: "Matemática Fasorial",
        iconName: "LuZap"
      },
      {
        frenteTitle: "Admitância (Y)",
        frenteSub: "Inverso da Impedância",
        versoLabel: "Fato de Prova",
        versoText: "Admitância (Y = 1/Z) mede a facilidade que o circuito oferece à corrente. Medida em Siemens (S).",
        versoCerto: "Composta por Condutância (G) e Susceptância (B): Y = G + jB.",
        versoErrado: "Tratar a admitância de ramos em paralelo de forma idêntica à impedância série.",
        color: "indigo",
        categoria: "Conceitos",
        iconName: "LuLayers"
      }
    ],
    flipcardsPratica: [
      {
        frenteTitle: "Circuito Indutivo",
        frenteSub: "Comportamento Geral",
        versoLabel: "Fato de Prova",
        versoText: "Ocorre quando XL > XC. O ângulo de fase θ é positivo. A tensão está adiantada em relação à corrente.",
        versoCerto: "Comportamento padrão de motores de indução industriais.",
        versoErrado: "Achar que um ângulo de fase positivo indica corrente adiantada.",
        color: "rose",
        categoria: "Respostas de Fase",
        iconName: "LuShieldAlert"
      },
      {
        frenteTitle: "Circuito Capacitivo",
        frenteSub: "Comportamento Geral",
        versoLabel: "Fato de Prova",
        versoText: "Ocorre quando XC > XL. O ângulo de fase θ é negativo. A corrente está adiantada em relação à tensão.",
        versoCerto: "Comportamento típico de longas linhas subterrâneas de cabos.",
        versoErrado: "Achar que a impedância de capacitores puros tem parte imaginária positiva.",
        color: "orange",
        categoria: "Respostas de Fase",
        iconName: "LuActivity"
      },
      {
        frenteTitle: "Fator de Qualidade (Q)",
        frenteSub: "Seletividade de Banda",
        versoLabel: "Fato de Prova",
        versoText: "Mede a seletividade e a relação entre energia armazenada e dissipada (Q = ω0 L / R).",
        versoCerto: "Valores elevados de Q indicam curvas de ressonância muito estreitas.",
        versoErrado: "Achar que o fator Q não afeta as tensões internas de ressonância.",
        color: "emerald",
        categoria: "Ressonância",
        iconName: "LuTrendingUp"
      }
    ],
    consolidation: {
      videoId: "rlc_v",
      videoTitle: "Cálculo de Impedância Complexa e Ressonância RLC",
      videoDuration: "14:15",
      sinteseTitle: "Mnemônicos RLC e complexos",
      sinteseMarkdown: "Impedância complexa: **$\\mathbf{Z} = R + j(X_L - X_C)$**. Módulo: **$Z = \\sqrt{R^2 + X^2}$**. Ângulo: **$\\theta = \\arctan(X/R)$**. Frequência de ressonância natural (Thomson): **$f_0 = 1 / (2\\pi \\sqrt{LC})$**. Para divisão e multiplicação de fasores, use sempre a representação **polar**."
    }
  },
  {
    numero: 9,
    titulo: "Triângulo de Potências e FP",
    descricao: "Compreenda as potências ativa, reativa e aparente, o fator de potência e o cálculo de capacitores de correção.",
    intro: {
      titulo: "Fluxo de Energia e Correção do Fator de Potência",
      paragrafos: [
        "A análise do balanço energético em corrente alternada exige a separação entre a potência que realiza trabalho útil e a potência necessária para magnetizar indutores e polarizar capacitores. Essa inter-relação geométrica entre os fluxos de energia constitui o Triângulo de Potências.",
        "Em instalações industriais da Petrobras, o monitoramento contínuo do fator de potência é obrigatório por lei, visto que um baixo fator de potência satura transformadores e causa penalidades financeiras pesadas nas faturas de concessionárias.",
        "A Potência Ativa (P), medida em Watts, representa a energia convertida em trabalho mecânico, luz ou calor. A Potência Reativa (Q), medida em Volt-Ampère Reativo (var), representa a potência oscilante que magnetiza motores e transformadores.",
        "A Potência Aparente (S), medida em Volt-Ampère (VA), constitui a potência total fornecida pela fonte geradora e representa a soma fasorial das potências ativa e reativa, dada pela relação geométrica $S = \\sqrt{P^2 + Q^2}$.",
        "Para fixação rápida, o fator de potência (FP) é definido como a relação entre a potência ativa e a aparente, sendo numericamente equivalente ao cosseno do ângulo de fase ($FP = P/S = \\cos\\theta$). Um circuito puramente resistivo terá FP unitário (1.0).",
        "Contrariamente, se o circuito for puramente indutivo ou capacitivo puro, o fator de potência decline para zero, indicando que nenhuma energia útil está sendo de fato entregue e convertida em trabalho mecânico.",
        "A correção do fator de potência em indústrias baseia-se na instalação de bancos de capacitores paralelos próximos aos motores indutivos. O capacitor consome potência reativa adiantada ($-jQ_C$), cancelando a potência reativa indutiva atrasada ($+jQ_L$).",
        "A capacitância necessária para elevar o fator de potência de um valor original ($\\cos\\theta_1$) para um valor final ($\\cos\\theta_2$) é calculada através da relação matemática fundamental $C = P \\cdot (\\tan\\theta_1 - \\tan\\theta_2) / (\\omega V^2)$.",
        "A banca CESGRANRIO elabora problemas numéricos complexos que exigem o dimensionamento de bancos de capacitores em sistemas trifásicos. O candidato deve atentar para a conexão do banco (estrela ou triângulo) e seu impacto na ddp de operação.",
        "Uma pegadinha clássica em provas é a confusão entre o triângulo de potências e a potência aparente complexa ($\\mathbf{S} = P + jQ$). Lembre-se de que a potência aparente complexa usa o conjugado da corrente fasorial ($\\mathbf{S} = \\mathbf{V} \\cdot \\mathbf{I}^*$)."
      ],
      diagrama: {
        titulo: "Triângulo de Potências e Banco de Capacitores",
        descricao: "Geometria do triângulo de potências relacionando P, Q e S, ilustrando o efeito do capacitor na redução da potência reativa total.",
        imageUrl: "/assets/images/eletrica/circuitos-ccca/modulo-9/m9-intro.png",
        legenda: "Fig 9. Relação geométrica de potências e correção de FP."
      }
    },
    accordion: [
      {
        titulo: "Potência Ativa, Reativa e Aparente",
        conteudo: "Ativa (P): P = V * I * cosθ (Watts). Realiza trabalho. Reativa (Q): Q = V * I * senθ (var). Armazenada em campos. Aparente (S): S = V * I (VA). Potência de placa.",
        iconName: "LuActivity"
      },
      {
        titulo: "Fator de Potência (FP)",
        conteudo: "FP = P/S = cosθ. Indica a eficiência energética do circuito. No Brasil, a legislação exige que o FP mínimo de unidades consumidoras seja de 0,92 (indutivo ou capacitivo).",
        iconName: "LuZap"
      },
      {
        titulo: "Correção do Fator de Potência",
        conteudo: "Qc = P * (tanθ1 - tanθ2). Permite reduzir a corrente total circulante na linha descarregando alimentadores e reduzindo a perda por efeito Joule nos cabos.",
        iconName: "LuLayers"
      }
    ],
    flipcardsConceito: [
      {
        frenteTitle: "Potência Ativa (P)",
        frenteSub: "Trabalho Real",
        versoLabel: "Fato de Prova",
        versoText: "É a única potência convertida de fato em trabalho mecânico, térmico ou luminoso. Medida em Watts (W).",
        versoCerto: "P = VIcosθ. Medida diretamente por wattímetros industriais.",
        versoErrado: "Achar que a potência reativa realiza rotação mecânica útil em motores.",
        color: "blue",
        categoria: "Potências",
        iconName: "LuCpu"
      },
      {
        frenteTitle: "Potência Reativa (Q)",
        frenteSub: "Campos Oscilantes",
        versoLabel: "Fato de Prova",
        versoText: "Potência que oscila continuamente entre a fonte e as reatâncias sem ser de fato consumida. Medida em Volt-Ampère Reativo (var).",
        versoCerto: "Q = VIsenθ. Essencial para criar o fluxo magnético de motores.",
        versoErrado: "Tratar a potência reativa como se fosse uma perda puramente térmica.",
        color: "teal",
        categoria: "Potências",
        iconName: "LuZap"
      },
      {
        frenteTitle: "Potência Aparente (S)",
        frenteSub: "Potência Total",
        versoLabel: "Fato de Prova",
        versoText: "Magnitude total da potência transitada, obtida pelo produto direto de tensão e corrente RMS (S = V * I). Medida em Volt-Ampère (VA).",
        versoCerto: "S = √(P² + Q²). Dimensiona a isolação de geradores e cabos.",
        versoErrado: "Somar algebricamente P e Q para obter a potência de placa S.",
        color: "indigo",
        categoria: "Potências",
        iconName: "LuLayers"
      }
    ],
    flipcardsPratica: [
      {
        frenteTitle: "Baixo Fator de Potência",
        frenteSub: "Consequências",
        versoLabel: "Fato de Prova",
        versoText: "Provoca queda de tensão na linha, sobrecarrega transformadores de distribuição e gera multas da concessionária.",
        versoCerto: "Aumenta a corrente reativa desnecessariamente nos condutores.",
        versoErrado: "Achar que baixo FP aumenta a potência útil ativa faturada.",
        color: "rose",
        categoria: "Eficiência",
        iconName: "LuShieldAlert"
      },
      {
        frenteTitle: "Banco de Capacitores",
        frenteSub: "Solução de Correção",
        versoLabel: "Fato de Prova",
        versoText: "Fornece a potência reativa necessária localmente para descarregar o alimentador principal da subestação.",
        versoCerto: "Instalado próximo aos motores para máxima mitigação de perdas.",
        versoErrado: "Superdimensionar o banco de capacitores e deixar o circuito muito capacitivo.",
        color: "orange",
        categoria: "Correção",
        iconName: "LuActivity"
      },
      {
        frenteTitle: "Cálculo de Qc",
        frenteSub: "Dimensionamento",
        versoLabel: "Fato de Prova",
        versoText: "Qc = P * (tanθ1 - tanθ2). A partir de Qc, determina-se a reatância capacitiva (Xc = V² / Qc) e a capacitância.",
        versoCerto: "A ddp na fórmula da capacitância deve ser a tensão efetiva do capacitor.",
        versoErrado: "Usar o cosseno diretamente na fórmula de dimensionamento do banco.",
        color: "emerald",
        categoria: "Dimensionamento",
        iconName: "LuTrendingUp"
      }
    ],
    consolidation: {
      videoId: "pot_fp_v",
      videoTitle: "Fator de Potência e Correção de Bancos de Capacitores",
      videoDuration: "13:10",
      sinteseTitle: "Mnemônicos de Potência e FP",
      sinteseMarkdown: "Relações fundamentais: **$S = P + jQ$** (aparente complexa), **$S = \\sqrt{P^2 + Q^2}$** (módulo aparente) e **$FP = P/S = \\cos\\theta$**. Fórmula de correção: **$Q_c = P \\cdot (\\tan\\theta_1 - \\tan\\theta_2)$**. Lembre-se: banco de capacitores em **Triângulo** exige $1/3$ da capacitância da ligação **Estrela** para a mesma potência reativa."
    }
  },
  {
    numero: 10,
    titulo: "Sistemas Trifásicos Básicos e Segurança",
    descricao: "Estude sistemas trifásicos estrela-triângulo, relações de fase-linha, normas NR-10 e aterramento de segurança.",
    intro: {
      titulo: "Sistemas Trifásicos Industriais e Normas de Segurança NR-10",
      paragrafos: [
        "A operação de sistemas elétricos industriais baseia-se majoritariamente nos sistemas trifásicos balanceados. A geração trifásica permite a transmissão de potência de forma estável com condutores mais leves e gera o campo magnético giratório essencial para motores de indução.",
        "Nas plantas da Petrobras, os sistemas trifásicos alimentam as grandes máquinas de processo (compressores de gás, bombas de exportação) de média e alta tensão, sob rigorosos critérios de monitoramento de isolação e segurança elétrica.",
        "As conexões elétricas trifásicas clássicas são a Estrela (Y) e o Triângulo ($\\Delta$). Na ligação Estrela, a corrente de linha é igual à de fase ($I_L = I_f$), e a ddp de linha é $\\sqrt{3}$ vezes maior do que a de fase ($V_L = \\sqrt{3} \\cdot V_f$).",
        "Na ligação Triângulo, a ddp de linha é igual à de fase ($V_L = V_f$), e a corrente de linha é $\\sqrt{3}$ vezes maior do que a corrente de fase ($I_L = \\sqrt{3} \\cdot I_f$). A potência total em ambas as conexões é $P_{total} = \\sqrt{3} \\cdot V_L \\cdot I_L \\cdot \\cos\\theta$.",
        "Para fixação de cálculo, em uma rede trifásica de 380 V de linha conectada em estrela, a tensão de fase (ddp entre fase e neutro) é de aproximadamente 220 V ($380/\\sqrt{3}$). Essa relação define a alimentação de cargas monofásicas.",
        "Contrariamente, se a carga for desequilibrada em uma ligação Estrela sem neutro aterrado, o ponto neutro sofrerá um deslocamento de potencial (flutuação de neutro), expondo equipamentos a sobretensões destrutivas.",
        "A segurança em sistemas de eletricidade é regulamentada pela norma NR-10 do Ministério do Trabalho. Ela exige que qualquer intervenção em instalações de força seja precedida de desenergização segura através do cumprimento de etapas lógicas.",
        "O procedimento de desenergização segura exige a constatação de ausência de tensão elétrica com instrumentos adequados e a posterior instalação de aterramento temporário com equipotencialização dos condutores de fase.",
        "A banca CESGRANRIO cobra com frequência questões sobre as etapas lógicas de desenergização de acordo com a NR-10 e o uso de Equipamentos de Proteção Coletiva (EPCs). O candidato deve memorizar as etapas em ordem estrita de execução.",
        "Fique atento à sequência lógica: 1. Seccionamento; 2. Impedimento de reenergização; 3. Constatação de ausência de tensão; 4. Instalação de aterramento temporário; 5. Proteção dos elementos energizados; 6. Sinalização de segurança."
      ],
      diagrama: {
        titulo: "Conexões Estrela e Triângulo e NR-10",
        descricao: "Esquema mostrando as conexões Estrela (Y) e Triângulo (Δ) em sistemas trifásicos e o infográfico de segurança com as 6 etapas de desenergização.",
        imageUrl: "/assets/images/eletrica/circuitos-ccca/modulo-10/m10-intro.png",
        legenda: "Fig 10. Conexões trifásicas e protocolo NR-10 de segurança."
      }
    },
    accordion: [
      {
        titulo: "Conexão Estrela e Triângulo",
        conteudo: "Estrela (Y): VL = √3 * Vf e IL = If. Possui ponto neutro comum. Triângulo (Δ): VL = Vf e IL = √3 * If. Ideal para enrolamentos de motores de partida.",
        iconName: "LuActivity"
      },
      {
        titulo: "Potência Trifásica Total",
        conteudo: "P = √3 * VL * IL * cosθ. Válido tanto para conexões Estrela quanto Triângulo em sistemas trifásicos equilibrados. Permite dimensionar geradores industriais.",
        iconName: "LuZap"
      },
      {
        titulo: "Protocolo NR-10 de Desenergização",
        conteudo: "Etapas estritas: Seccionamento -> Impedimento de reenergização -> Constatação de ausência de tensão -> Aterramento temporário -> Proteção de adjacências -> Sinalização.",
        iconName: "LuLayers"
      }
    ],
    flipcardsConceito: [
      {
        frenteTitle: "Tensão de Linha (VL)",
        frenteSub: "Fase a Fase",
        versoLabel: "Fato de Prova",
        versoText: "É a diferença de potencial elétrico medida diretamente entre dois fios de fase distintos da rede trifásica.",
        versoCerto: "VL = Vf * √3 na ligação Estrela. É a ddp indicada em motores de placa.",
        versoErrado: "Medir ddp entre fase e neutro e chamar de tensão de linha.",
        color: "blue",
        categoria: "Trifásicos",
        iconName: "LuZap"
      },
      {
        frenteTitle: "Tensão de Fase (Vf)",
        frenteSub: "Fase ao Neutro",
        versoLabel: "Fato de Prova",
        versoText: "É a diferença de potencial elétrico medida entre um fio de fase e o ponto neutro comum da ligação Estrela.",
        versoCerto: "Vf = VL / √3. Usada para alimentar equipamentos monofásicos na indústria.",
        versoErrado: "Supor que a ddp de fase na ligação Triângulo é menor do que a ddp de linha.",
        color: "teal",
        categoria: "Trifásicos",
        iconName: "LuCpu"
      },
      {
        frenteTitle: "Campo Girante",
        frenteSub: "Efeito Eletromecânico",
        versoLabel: "Fato de Prova",
        versoText: "Campo magnético rotativo gerado pela defasagem de 120° das correntes no estator de motores trifásicos.",
        versoCerto: "Induz correntes no rotor de gaiola gerando torque síncrono/assíncrono.",
        versoErrado: "Achar que os sistemas monofásicos geram campo magnético giratório sem capacitor de partida.",
        color: "indigo",
        categoria: "Máquinas",
        iconName: "LuActivity"
      }
    ],
    flipcardsPratica: [
      {
        frenteTitle: "Seccionamento Seguro",
        frenteSub: "NR-10 - Etapa 1",
        versoLabel: "Fato de Prova",
        versoText: "O seccionamento é o ato de abrir fisicamente o circuito (disjuntor ou chave seccionadora) isolando a fonte de energia.",
        versoCerto: "Deve ser seguido imediatamente pelo travamento físico da chave.",
        versoErrado: "Realizar serviços assumindo que a chave aberta não pode ser fechada acidentalmente.",
        color: "rose",
        categoria: "Segurança",
        iconName: "LuShieldAlert"
      },
      {
        frenteTitle: "Aterramento Temp.",
        frenteSub: "NR-10 - Etapa 4",
        versoLabel: "Fato de Prova",
        versoText: "O aterramento temporário curto-circuita todas as fases e conecta-as à terra, garantindo ddp zero em caso de reenergização.",
        versoCerto: "Protege o operador de descargas atmosféricas ou partidas acidentais.",
        versoErrado: "Intervir em painéis de média tensão sem instalar o aterramento de segurança.",
        color: "orange",
        categoria: "Segurança",
        iconName: "LuLayers"
      },
      {
        frenteTitle: "Sinalização",
        frenteSub: "NR-10 - Etapa 6",
        versoLabel: "Fato de Prova",
        versoText: "Instalação de placas, etiquetas e barreiras que identificam impedimento de acesso e trabalho no painel.",
        versoCerto: "Alerta outras equipes sobre a manutenção em trabalho no setor.",
        versoErrado: "Retirar as sinalizações de segurança antes de restabelecer a energia de teste.",
        color: "emerald",
        categoria: "Segurança",
        iconName: "LuTrendingUp"
      }
    ],
    consolidation: {
      videoId: "trif_seg_v",
      videoTitle: "Sistemas Trifásicos e Etapas de Segurança da NR-10",
      videoDuration: "14:45",
      sinteseTitle: "Etapas Cruciais da Desenergização",
      sinteseMarkdown: "Relações trifásicas: Estrela (Y) → **$V_L = \\sqrt{3} V_f$**, **$I_L = I_f$**; Triângulo ($\\Delta$) → **$V_L = V_f$**, **$I_L = \\sqrt{3} I_f$**. NR-10: **1. Seccionamento** → **2. Travamento (Impedimento)** → **3. Constatar ausência de V** → **4. Aterramento Temporário** → **5. Proteção** → **6. Sinalização**. Lembre-se desta sequência exata!"
    }
  }
];
