interface Quiz {
  id?: string;
  title: string;
  moduleNumber: number;
  questions: { id: number; question: string; options: string[]; correct: number; explanation: string }[];
}

export const CONTABILIDADE_BASICA_QUIZZES: Record<string, Quiz> = {
  "modulo-1": {
    id: "contabilidade-m1-quiz",
    title: "Fundamentos de Contabilidade",
    moduleNumber: 1,
    questions: [
      {
        id: 101,
        question: "A contabilidade é definida como:",
        options: [
          "Uma arte de registrar apenas transações de caixa",
          "Uma ciência social que estuda o patrimônio das empresas",
          "Um departamento financeiro das empresas",
          "Um sistema de cobrança de impostos"
        ],
        correct: 1,
        explanation: "A contabilidade é uma ciência social que estuda o patrimônio das empresas, sua composição, variações e equilíbrio. É mais abrangente que apenas registros de caixa."
      },
      {
        id: 102,
        question: "Qual é o principal objetivo da contabilidade?",
        options: [
          "Minimizar impostos da empresa",
          "Fornecer informações para decisões gerenciais",
          "Aumentar o faturamento da empresa",
          "Controlar a assiduidade dos funcionários"
        ],
        correct: 1,
        explanation: "O objetivo principal é fornecer informações úteis, oportunas e confiáveis para que administradores, proprietários e terceiros tomem decisões econômicas racionais."
      },
      {
        id: 103,
        question: "São usuários externos da contabilidade, EXCETO:",
        options: [
          "Governo para fins tributários",
          "Bancos para análise de crédito",
          "Gerentes internos da empresa",
          "Fornecedores para avaliar solvência"
        ],
        correct: 2,
        explanation: "Gerentes internos são usuários internos. Usuários externos incluem governo, bancos, fornecedores, clientes, sindicatos e investidores externos."
      },
      {
        id: 104,
        question: "O Princípio da Competência em Contabilidade significa:",
        options: [
          "Registrar operações apenas quando há movimento de caixa",
          "Registrar despesas e receitas quando ocorrem, não quando há fluxo de caixa",
          "Competência do contador em fazer os registros",
          "Competência entre empresas rivais"
        ],
        correct: 1,
        explanation: "Princípio da Competência: receitas são registradas quando auferidas (direito) e despesas quando incorridas (obrigação), independentemente do fluxo de caixa."
      },
      {
        id: 105,
        question: "Em Petrobras, qual é uma aplicação prática de contabilidade?",
        options: [
          "Registrar apenas vendas de derivados",
          "Controlar gastos com perfuração, produção e transporte, fornecendo informações para análise de rentabilidade por campo",
          "Contabilizar apenas despesas administrativas",
          "Registrar movimentação de caixa diária sem análise"
        ],
        correct: 1,
        explanation: "Petrobras utiliza contabilidade para registrar e analisar custos de exploração (perfuração), produção e escoamento, permitindo decisões de investimento e otimização operacional."
      },
      {
        id: 106,
        question: "Qual técnica de contabilidade envolve a interpretação de dados contábeis?",
        options: [
          "Escrituração",
          "Análise",
          "Demonstrações",
          "Auditoria"
        ],
        correct: 1,
        explanation: "Análise é a técnica que interpreta e examina dados contábeis para avaliar situação financeira, rentabilidade, liquidez e outras métricas da empresa."
      },
      {
        id: 107,
        question: "Qual é a diferença fundamental entre contabilidade financeira e contabilidade gerencial?",
        options: [
          "Financeira é mais importante que gerencial",
          "Financeira segue normas obrigatórias; gerencial é interna e flexível",
          "Não há diferença entre elas",
          "Gerencial só existe em grandes empresas"
        ],
        correct: 1,
        explanation: "Contabilidade Financeira: obedece normas (IFRS, Lei das S.A.), gera demonstrações para terceiros. Gerencial: interna, flexível, voltada para decisões da administração."
      },
      {
        id: 108,
        question: "O Princípio da Continuidade presume que:",
        options: [
          "A empresa continuará operando indefinidamente",
          "As operações de caixa são contínuas",
          "Os sócios permanecerão os mesmos",
          "Os produtos serão sempre iguais"
        ],
        correct: 0,
        explanation: "Princípio da Continuidade: pressupõe que a empresa continuará operando em futuro previsível, justificando como se avalia e classifica ativos e passivos."
      },
      {
        id: 109,
        question: "Qual das seguintes atividades NÃO é uma função da contabilidade?",
        options: [
          "Registrar transações econômicas",
          "Elaborar demonstrações financeiras",
          "Gerenciar relacionamento com clientes",
          "Analisar resultados operacionais"
        ],
        correct: 2,
        explanation: "Gerenciar relacionamento com clientes é função do CRM/Marketing, não da contabilidade. A contabilidade registra, analisa e comunica informações financeiras."
      }
    ]
  },
  "modulo-2": {
    id: "contabilidade-m2-quiz",
    title: "Equação Contábil Fundamentals",
    moduleNumber: 2,
    questions: [
      {
        id: 201,
        question: "A Equação Fundamental da Contabilidade é:",
        options: [
          "Ativo = Passivo",
          "Ativo = Passivo + Patrimônio Líquido",
          "Receita = Despesa",
          "Caixa = Resultado"
        ],
        correct: 1,
        explanation: "ATIVO = PASSIVO + PATRIMÔNIO LÍQUIDO. Esta equação expressa o equilíbrio do balanço patrimonial e é a base de toda contabilidade."
      },
      {
        id: 202,
        question: "Qual alternativa representa corretamente os componentes do Ativo?",
        options: [
          "Apenas dinheiro em caixa",
          "Bens e direitos da empresa",
          "Todas as obrigações da empresa",
          "Apenas imóveis e terrenos"
        ],
        correct: 1,
        explanation: "Ativo compreende bens (caixa, estoques, máquinas, imóveis) e direitos (contas a receber, empréstimos a terceiros)."
      },
      {
        id: 203,
        question: "O Passivo de uma empresa inclui:",
        options: [
          "Máquinas e equipamentos",
          "Contas a receber de clientes",
          "Contas a pagar a fornecedores e empréstimos",
          "Estoque de produtos"
        ],
        correct: 2,
        explanation: "Passivo representa obrigações da empresa: dívidas com fornecedores, empréstimos, contas a pagar, salários a pagar, impostos a pagar."
      },
      {
        id: 204,
        question: "Se uma empresa tem Ativo de R$ 1.000.000 e Passivo de R$ 600.000, seu Patrimônio Líquido é:",
        options: [
          "R$ 600.000",
          "R$ 400.000",
          "R$ 1.600.000",
          "Não pode ser determinado"
        ],
        correct: 1,
        explanation: "Aplicando equação: PL = Ativo - Passivo = R$ 1.000.000 - R$ 600.000 = R$ 400.000"
      },
      {
        id: 205,
        question: "O Patrimônio Líquido aumenta quando:",
        options: [
          "A empresa tem dívidas",
          "A empresa gera lucro",
          "A empresa paga impostos",
          "A empresa compra estoque"
        ],
        correct: 1,
        explanation: "Patrimônio Líquido = Capital Inicial + Lucros - Prejuízos - Dividendos. Aumenta com lucros acumulados."
      },
      {
        id: 206,
        question: "Em Petrobras, os ativos principais incluem:",
        options: [
          "Apenas contas correntes bancárias",
          "Plataformas de produção, dutos, refinarias e estoques de óleo",
          "Apenas edifícios administrativos",
          "Apenas contas a receber"
        ],
        correct: 1,
        explanation: "Os principais ativos de Petrobras são infraestrutura de exploração (plataformas, dutos), refino (refinarias), armazenagem (tanques) e estoques de óleo e derivados."
      },
      {
        id: 207,
        question: "Se Patrimônio Líquido é negativo, significa:",
        options: [
          "Empresas nunca podem ter PL negativo",
          "A empresa tem mais ativos que passivos",
          "Passivo > Ativo (insolvência técnica)",
          "A empresa tem muito dinheiro"
        ],
        correct: 2,
        explanation: "PL negativo (Passivo > Ativo) indica que credores têm direitos superiores aos ativos, situação de insolvência técnica ou negócio com prejuízos acumulados."
      },
      {
        id: 208,
        question: "Qual transação aumenta apenas o lado direito da equação (sem alterar total do Ativo)?",
        options: [
          "Compra de máquina a vista",
          "Compra de máquina a prazo (aumento de passivo)",
          "Venda de máquina",
          "Recebimento de cliente"
        ],
        correct: 1,
        explanation: "Compra a prazo: Ativo aumenta (máquina), Passivo aumenta (dívida). Ativo total = R$ 100k, Passivo = R$ 60k (antes), Passivo = R$ 90k (depois). Equação continua equilibrada."
      },
      {
        id: 209,
        question: "Se empresa inicia com Capital de R$ 50.000 depositado em conta, qual é o balanço?",
        options: [
          "Ativo = R$ 0, Passivo = R$ 50.000, PL = R$ 0",
          "Ativo = R$ 50.000, Passivo = R$ 0, PL = R$ 50.000",
          "Ativo = R$ 50.000, Passivo = R$ 50.000, PL = R$ 0",
          "Ativo = R$ 100.000, Passivo = R$ 50.000, PL = R$ 50.000"
        ],
        correct: 1,
        explanation: "Capital investido é Patrimônio Líquido. Caixa (ativo) R$ 50k. Nenhuma dívida (passivo zero). PL = R$ 50k. Ativo = Passivo + PL → 50k = 0 + 50k ✓"
      }
    ]
  },
  "modulo-3": {
    id: "contabilidade-m3-quiz",
    title: "Plano de Contas",
    moduleNumber: 3,
    questions: [
      {
        id: 301,
        question: "Um Plano de Contas é:",
        options: [
          "Um gráfico de receitas e despesas",
          "Uma estrutura hierárquica de contas para registrar operações contábeis",
          "Um documento de cobrança de clientes",
          "Uma lista de fornecedores"
        ],
        correct: 1,
        explanation: "Plano de Contas é um documento que lista e codifica todas as contas que a empresa utilizará para registrar suas operações, organizado hierarquicamente."
      },
      {
        id: 302,
        question: "Em um plano de contas, a CLASSE representa:",
        options: [
          "O nível de detalhamento máximo",
          "O primeiro nível hierárquico (Ativo, Passivo, PL, Receitas, Despesas)",
          "Um tipo específico de fornecedor",
          "A codificação do produto"
        ],
        correct: 1,
        explanation: "Classe é o 1º nível hierárquico: 1-Ativo, 2-Passivo, 3-Patrimônio Líquido, 4-Receitas, 5-Despesas. Define a grande categoria."
      },
      {
        id: 303,
        question: "A codificação de conta 1.1.1.01 provavelmente corresponde a:",
        options: [
          "Uma despesa de administração",
          "Uma conta do Passivo",
          "Caixa em Reais (Ativo Circulante > Disponibilidades > Caixa)",
          "Uma receita de vendas"
        ],
        correct: 2,
        explanation: "Começa com '1' = Ativo. '1.1' = Ativo Circulante. '1.1.1' = Disponibilidades. '.01' = Caixa em Reais especificamente."
      },
      {
        id: 304,
        question: "Qual alternativa NÃO faz parte do Plano de Contas de Petrobras?",
        options: [
          "Contas de Plataformas de Produção",
          "Contas de Estoques de Óleo Bruto",
          "Contas de Contas a Receber de Clientes",
          "Contas de Receita de Vendas de Ações na Bolsa"
        ],
        correct: 3,
        explanation: "Venda de ações não é operação que aparece em contas de receita operacional. Petrobras teria conta em PL para aumento de capital, não em receita."
      },
      {
        id: 305,
        question: "O Plano de Contas é importante porque:",
        options: [
          "Determina quanto lucro a empresa terá",
          "Facilita localização de contas, padroniza registros e evita duplicações",
          "Determina quanto de imposto a empresa pagará",
          "Define o preço de venda dos produtos"
        ],
        correct: 1,
        explanation: "Plano de Contas padroniza registro de operações, evita duplicações e facilita localização de contas para lançamentos e consultas."
      },
      {
        id: 306,
        question: "Contas de Estoques em Petrobras podem incluir:",
        options: [
          "Apenas óleo bruto",
          "Estoques de Matérias-Primas, Produtos em Processo, Produtos Acabados (derivados), Combustíveis",
          "Apenas produtos acabados",
          "Nenhuma informação de estoque"
        ],
        correct: 1,
        explanation: "Estoque em Petrobras é diverso: óleo bruto (exploração), produtos em refino (processo), derivados prontos (gasolina, diesel, nafta), combustíveis para operação."
      },
      {
        id: 307,
        question: "Se empresa inclui conta 'Multas e Penalidades' no plano de contas, ela deve estar classificada em:",
        options: [
          "Ativo (porque é dinheiro)",
          "Passivo (porque é obrigação)",
          "Despesas (porque reduz resultado)",
          "Receita (porque traz informação)"
        ],
        correct: 2,
        explanation: "Multas e penalidades são despesas que reduzem o lucro. Devem estar em classe 5 (Despesas Operacionais ou Extraordinárias)."
      },
      {
        id: 308,
        question: "Um Plano de Contas bem estruturado facilita:",
        options: [
          "Apenas o cumprimento de leis",
          "Lançamentos contábeis, análises, auditoria e geração de relatórios",
          "Apenas aumentar vendas",
          "Reduzir despesas"
        ],
        correct: 1,
        explanation: "Plano bem estruturado melhora: padronização de lançamentos, rapidez na busca de informações, qualidade de análises, facilita auditoria, melhora relatórios."
      },
      {
        id: 309,
        question: "Em Petrobras, uma conta típica do Ativo Imobilizado seria:",
        options: [
          "Caixa em Reais",
          "Contas a Receber",
          "Plataformas de Produção, Dutos, Refinarias",
          "Fornecedores a Pagar"
        ],
        correct: 2,
        explanation: "Ativo Imobilizado inclui bens de longo prazo: infraestrutura de exploração (plataformas, dutos), refino (refinarias), armazenagem (tanques)."
      }
    ]
  },
  "modulo-4": {
    id: "contabilidade-m4-quiz",
    title: "Lançamentos Contábeis",
    moduleNumber: 4,
    questions: [
      {
        id: 401,
        question: "O método das Partidas Dobradas em contabilidade significa:",
        options: [
          "Registrar duas operações por dia",
          "Cada operação gera um débito e um crédito de igual valor",
          "Toda conta deve ter saldo devedor",
          "Operações devem ser registradas uma única vez"
        ],
        correct: 1,
        explanation: "Partidas Dobradas: cada operação afeta no mínimo 2 contas, mantendo a equação contábil equilibrada (débitos = créditos)."
      },
      {
        id: 402,
        question: "Para contas de ATIVO, qual afirmação é correta?",
        options: [
          "Débito diminui, crédito aumenta",
          "Débito aumenta, crédito diminui",
          "Ambos aumentam o saldo",
          "Ambos diminuem o saldo"
        ],
        correct: 1,
        explanation: "Contas de ATIVO: Débito = AUMENTA, Crédito = DIMINUI. Operação inversa das contas de Passivo."
      },
      {
        id: 403,
        question: "Empresa compra equipamento por R$ 50.000 à vista. O lançamento correto é:",
        options: [
          "Débito Caixa / Crédito Máquinas e Equipamentos",
          "Débito Máquinas e Equipamentos / Crédito Caixa",
          "Débito Caixa / Crédito Fornecedores",
          "Débito Fornecedores / Crédito Máquinas"
        ],
        correct: 1,
        explanation: "Aumenta máquinas (débito em ativo) e diminui caixa (crédito em ativo). Total ativo permanece R$ 50k a menos em caixa, mas +R$ 50k em máquinas."
      },
      {
        id: 404,
        question: "Empresa vende mercadoria por R$ 10.000 a prazo. O lançamento é:",
        options: [
          "Débito Caixa / Crédito Receita de Vendas",
          "Débito Receita de Vendas / Crédito Caixa",
          "Débito Contas a Receber / Crédito Receita de Vendas",
          "Débito Caixa / Crédito Contas a Receber"
        ],
        correct: 2,
        explanation: "A prazo gera direito (conta a receber, débito em ativo) e receita (crédito em receita que aumenta resultado). Caixa ainda não entrada."
      },
      {
        id: 405,
        question: "Qual lançamento representa pagamento de fornecedor?",
        options: [
          "Débito Fornecedores / Crédito Caixa",
          "Débito Caixa / Crédito Fornecedores",
          "Débito Despesa / Crédito Caixa",
          "Débito Caixa / Crédito Receita"
        ],
        correct: 0,
        explanation: "Pagamento diminui dívida com fornecedor (débito em passivo) e diminui caixa (crédito em ativo). Ambas são reduções."
      },
      {
        id: 406,
        question: "O termo 'escrituração' refere-se a:",
        options: [
          "Ato de escrever textos",
          "Processo de registrar lançamentos contábeis em livros ou sistemas",
          "Assinatura de documentos",
          "Arquivo de documentos fiscais"
        ],
        correct: 1,
        explanation: "Escrituração é o processo técnico de registrar operações contábeis seguindo o método das partidas dobradas em livros diários e razão."
      },
      {
        id: 407,
        question: "Petrobras paga R$ 1 milhão por combustível para operação de plataforma. O lançamento é:",
        options: [
          "Débito Caixa / Crédito Fornecedores",
          "Débito Despesa de Combustível / Crédito Caixa",
          "Débito Estoque de Combustível / Crédito Caixa",
          "Débito Receita / Crédito Caixa"
        ],
        correct: 1,
        explanation: "Se combustível será usado (consumido), é despesa operacional (débito). Se armazenado para uso, seria estoque. Como é combustível de operação, débito despesa."
      },
      {
        id: 408,
        question: "Se um lançamento tem débito de R$ 50.000, o crédito deve ser:",
        options: [
          "R$ 25.000 (metade)",
          "R$ 50.000 (igual)",
          "R$ 100.000 (dobro)",
          "Não precisa existir crédito"
        ],
        correct: 1,
        explanation: "Método das Partidas Dobradas exige que soma de débitos = soma de créditos em cada lançamento. Fundamental para equilíbrio contábil."
      },
      {
        id: 409,
        question: "Empresa recebe adiantamento de cliente R$ 20.000 para encomenda futura. O lançamento é:",
        options: [
          "Débito Caixa / Crédito Receita de Vendas",
          "Débito Caixa / Crédito Adiantamento de Clientes (Passivo)",
          "Débito Receita / Crédito Caixa",
          "Débito Despesa / Crédito Caixa"
        ],
        correct: 1,
        explanation: "Adiantamento é obrigação (passivo) até que produtos sejam entregues. Débito Caixa (ativo aumenta), Crédito Adiantamento (passivo aumenta)."
      }
    ]
  },
  "modulo-5": {
    id: "contabilidade-m5-quiz",
    title: "Balancete de Verificação",
    moduleNumber: 5,
    questions: [
      {
        id: 501,
        question: "O Balancete de Verificação é utilizado principalmente para:",
        options: [
          "Calcular lucro ou prejuízo da empresa",
          "Verificar se débitos = créditos e identificar erros de lançamento",
          "Pagar impostos ao governo",
          "Determinar preço de vendas"
        ],
        correct: 1,
        explanation: "Balancete é ferramenta de controle para verificar integridade dos registros contábeis antes de elaborar demonstrações financeiras."
      },
      {
        id: 502,
        question: "Em um balancete equilibrado:",
        options: [
          "Todas contas têm saldo positivo",
          "Total de débitos = Total de créditos",
          "Ativo = Passivo",
          "Não existem contas com saldo zero"
        ],
        correct: 1,
        explanation: "Balancete equilibrado significa soma de saldos devedores = soma de saldos credores, indicando que partidas dobradas foram respeitadas."
      },
      {
        id: 503,
        question: "Se um balancete apresenta débitos totais de R$ 1.000.000 e créditos de R$ 950.000, isso indica:",
        options: [
          "Balancete está correto",
          "Existe erro de R$ 50.000 que precisa ser localizado e corrigido",
          "A empresa tem lucro de R$ 50.000",
          "Caixa tem saldo de R$ 50.000"
        ],
        correct: 1,
        explanation: "Diferença entre débitos e créditos indica erro de lançamento. Deve-se investigar qual conta ou período foi lançado incorretamente."
      },
      {
        id: 504,
        question: "O balancete é tipicamente elaborado:",
        options: [
          "Apenas ao final do ano",
          "Mensalmente, durante e após período contábil",
          "Diariamente",
          "Nunca é necessário"
        ],
        correct: 1,
        explanation: "Balancetes são preparados periodicamente (geralmente mensais) para controle, antes de encerramento de período para elaboração de demonstrações."
      },
      {
        id: 505,
        question: "Se empresa tem 100 contas abertas no período, quantas contas aparecerão no balancete?",
        options: [
          "Exatamente 100",
          "Menos de 100 (apenas contas com saldo)",
          "Mais de 100",
          "Não é possível determinar"
        ],
        correct: 1,
        explanation: "Balancete inclui apenas contas com saldo (movimentadas ou com saldo inicial). Contas zeradas no período não aparecem no balancete."
      },
      {
        id: 506,
        question: "Que informação o balancete NÃO fornece diretamente?",
        options: [
          "Saldo de cada conta",
          "Total de débitos e créditos",
          "Lucro ou prejuízo do período",
          "Erros de lançamento duplo"
        ],
        correct: 2,
        explanation: "Balancete lista saldos de contas, não calcula resultado. Resultado (lucro/prejuízo) é calculado na DRE, elaborada após balancete."
      },
      {
        id: 507,
        question: "Em Petrobras, um balancete mensal serve para:",
        options: [
          "Apenas cumprir requisito legal",
          "Monitorar performance operacional, identificar variações anormais em custos antes do fechamento",
          "Determinar dividendos para acionistas",
          "Calcular bônus de gerentes"
        ],
        correct: 1,
        explanation: "Balancetes de Petrobras permitem acompanhamento mensal por unidade de negócio, detectando variações anormais de custos operacionais."
      },
      {
        id: 508,
        question: "Se balancete não equilibra, qual é o procedimento correto?",
        options: [
          "Ajustar números até equilibrar",
          "Ignorar a diferença",
          "Investigar lançamentos para localizar erro",
          "Publicar balancete mesmo assim"
        ],
        correct: 2,
        explanation: "Deve-se investigar qual lançamento foi feito incorretamente. Comum: invertão de débito/crédito, erro de digitação, duplicação de lançamento."
      },
      {
        id: 509,
        question: "O balancete mostra que Caixa tem saldo credor de R$ 100.000. Isso significa:",
        options: [
          "A empresa tem R$ 100.000 em caixa",
          "A empresa está com saque a descoberto de R$ 100.000",
          "Caixa foi lançado inversamente (erro provável)",
          "A empresa deve R$ 100.000"
        ],
        correct: 2,
        explanation: "Caixa (ativo) sempre deve ter saldo devedor. Se tem crédito, indica erro: ou saque a descoberto registrado incorretamente ou lançamento invertido."
      }
    ]
  },
  "modulo-6": {
    id: "contabilidade-m6-quiz",
    title: "Demonstrações Contábeis",
    moduleNumber: 6,
    questions: [
      {
        id: 601,
        question: "O Balanço Patrimonial apresenta:",
        options: [
          "Receitas e despesas do período",
          "Posição financeira em determinada data",
          "Movimentação de caixa",
          "Análise de competidores"
        ],
        correct: 1,
        explanation: "Balanço mostra Ativo (recursos), Passivo (obrigações) e Patrimônio Líquido (capital) em momento específico."
      },
      {
        id: 602,
        question: "A Demonstração de Resultado (DRE) mostra principalmente:",
        options: [
          "Posição patrimonial",
          "Resultado econômico (receitas - despesas) do período",
          "Movimentação de caixa",
          "Histórico de dividendos pagos"
        ],
        correct: 1,
        explanation: "DRE demonstra resultado: Receitas - Custos = Lucro Bruto, Lucro Bruto - Despesas = Lucro Operacional, Lucro Operacional +/- Extraordinário = Lucro Líquido."
      },
      {
        id: 603,
        question: "Fluxo de Caixa diferencia-se de DRE porque:",
        options: [
          "Ambos são idênticos",
          "Fluxo registra caixa real, DRE registra por competência (vendas a prazo, por exemplo)",
          "DRE é mais importante que Fluxo",
          "Fluxo é apenas para empresas grandes"
        ],
        correct: 1,
        explanation: "DRE segue Princípio da Competência (venda a prazo = receita). Fluxo de Caixa registra quando dinheiro entra/sai efetivamente."
      },
      {
        id: 604,
        question: "Empresa tem Receita de R$ 100.000, Custos de R$ 60.000 e Despesas de R$ 20.000. Qual é o Lucro Líquido?",
        options: [
          "R$ 100.000",
          "R$ 40.000",
          "R$ 20.000",
          "R$ 80.000"
        ],
        correct: 2,
        explanation: "Lucro Líquido = Receita - Custos - Despesas = 100k - 60k - 20k = R$ 20.000"
      },
      {
        id: 605,
        question: "A Demonstração de Mutações do Patrimônio Líquido mostra:",
        options: [
          "Apenas capital inicial",
          "Movimento de patrimônio (capital + lucros - dividendos)",
          "Apenas despesas",
          "Apenas receitas"
        ],
        correct: 1,
        explanation: "DMPL mostra: Saldo Inicial + Lucro Líquido - Dividendos - Prejuízos = Saldo Final do Patrimônio Líquido."
      },
      {
        id: 606,
        question: "As demonstrações financeiras de empresa aberta devem ser elaboradas seguindo:",
        options: [
          "Critério do contador",
          "IFRS (International Financial Reporting Standards) ou normas locais equivalentes",
          "Conforme o proprietário deseja",
          "Sem qualquer padrão específico"
        ],
        correct: 1,
        explanation: "Empresas abertas (como Petrobras) são obrigadas a seguir IFRS ou normas equivalentes de seu país para garantir comparabilidade."
      },
      {
        id: 607,
        question: "Em Petrobras, qual é a frequência de divulgação de demonstrações financeiras?",
        options: [
          "Apenas anualmente",
          "Trimestralmente (intermediárias) e anualmente",
          "Mensalmente",
          "Quando o governo solicita"
        ],
        correct: 1,
        explanation: "Petrobras divulga resultados trimestrais (demonstrações intermediárias) e relatório completo anual, conforme exigência da CVM."
      },
      {
        id: 608,
        question: "Qual demonstração é mais adequada para análise de capacidade de pagamento de dividendos?",
        options: [
          "Balanço Patrimonial",
          "DRE",
          "Fluxo de Caixa",
          "Balancete"
        ],
        correct: 2,
        explanation: "Fluxo de Caixa mostra se há caixa disponível para pagar dividendos após operações e investimentos."
      },
      {
        id: 609,
        question: "Se empresa tem lucro de R$ 50.000 em DRE mas fluxo de caixa negativo, isso significa:",
        options: [
          "A empresa está funcionando normalmente",
          "Existe erro na contabilidade",
          "Possível: vendas a prazo não recebidas ou investimentos grandes realizados",
          "A empresa é fraudulenta"
        ],
        correct: 2,
        explanation: "Possível quando: vendas a prazo geram lucro mas não entrada de caixa, ou investimentos em ativos consumem caixa mas não afetam lucro operacional."
      }
    ]
  },
  "modulo-7": {
    id: "contabilidade-m7-quiz",
    title: "Análise de Demonstrações",
    moduleNumber: 7,
    questions: [
      {
        id: 701,
        question: "Qual índice mede capacidade de empresa pagar dívidas de curto prazo?",
        options: [
          "ROE",
          "Liquidez Corrente",
          "Endividamento",
          "Giro do Ativo"
        ],
        correct: 1,
        explanation: "Liquidez Corrente = Ativo Circulante / Passivo Circulante. Acima de 1 indica capacidade de pagar débitos em até 1 ano."
      },
      {
        id: 702,
        question: "Se Liquidez Corrente de empresa é 0,8, significa:",
        options: [
          "Situação financeira excelente",
          "Risco de não conseguir pagar dívidas curto prazo (LC < 1)",
          "Capacidade ótima de pagamento",
          "Empresa não tem dívidas"
        ],
        correct: 1,
        explanation: "LC = 0,8 significa que para cada R$ 1 de dívida curto prazo, tem apenas R$ 0,80 de ativo circulante. Situação de risco."
      },
      {
        id: 703,
        question: "O índice de Endividamento mede:",
        options: [
          "Capacidade de pagar todos os débitos",
          "Percentual de ativos financiados por passivo (dívida vs total)",
          "Resultado operacional",
          "Velocidade de venda"
        ],
        correct: 1,
        explanation: "Endividamento = Passivo Total / Ativo Total. Indica proporção de recursos obtidos via dívida vs recursos próprios."
      },
      {
        id: 704,
        question: "ROE (Retorno sobre Patrimônio Líquido) de 12% significa:",
        options: [
          "A empresa perdeu 12%",
          "Para cada R$ 100 de patrimônio, gera R$ 12 de lucro ao ano",
          "Patrimônio aumentará 12%",
          "Dividendos serão 12%"
        ],
        correct: 1,
        explanation: "ROE = Lucro Líquido / Patrimônio Líquido. Mostra retorno sobre capital investido pelos sócios."
      },
      {
        id: 705,
        question: "Análise Horizontal em demonstrações financeiras compara:",
        options: [
          "Contas do mesmo período",
          "Mesma conta em períodos diferentes (2023 vs 2024)",
          "Empresa com concorrente",
          "Ativo com Passivo"
        ],
        correct: 1,
        explanation: "Análise Horizontal: evolução temporal de contas. Análise Vertical: estrutura de balanço em percentuais do período."
      },
      {
        id: 706,
        question: "Uma empresa com Margem Líquida de 5% significa:",
        options: [
          "Lucro é 50% da receita",
          "Para cada R$ 100 de receita, gera R$ 5 de lucro líquido",
          "Empresa está em prejuízo",
          "Despesas representam 5% da receita"
        ],
        correct: 1,
        explanation: "Margem Líquida = Lucro Líquido / Receita. Indica eficiência em converter vendas em lucro após todos custos e despesas."
      },
      {
        id: 707,
        question: "Em Petrobras, qual indicador é crítico para monitorar?",
        options: [
          "Apenas vendas",
          "Giro de Ativo (eficiência em usar infraestrutura para gerar receita)",
          "Apenas número de funcionários",
          "Apenas volume de óleo produzido"
        ],
        correct: 1,
        explanation: "Petrobras monitora Giro do Ativo: Receita / Ativo Total. Indica eficiência em usar bilhões em infraestrutura para gerar receita."
      },
      {
        id: 708,
        question: "Qual análise seria mais apropriada para investigar por que lucro aumentou mas caixa diminuiu?",
        options: [
          "Análise Vertical",
          "Comparação com concorrente",
          "Fluxo de Caixa e DRE",
          "Apenas Balancete"
        ],
        correct: 2,
        explanation: "Fluxo de Caixa mostra saídas (investimentos, financiamentos pagos). DRE mostra lucro por competência. Comparação explica discrepância."
      },
      {
        id: 709,
        question: "Índice de Cobertura de Juros indica:",
        options: [
          "Juro a pagar ao final do período",
          "Capacidade de empresa pagar juros de empréstimos",
          "Quantidade de clientes",
          "Taxa de juros do mercado"
        ],
        correct: 1,
        explanation: "Cobertura de Juros = Lucro Operacional / Despesa de Juros. Acima de 2,5x é considerado saudável (consegue pagar juros com folga)."
      }
    ]
  },
  "modulo-8": {
    id: "contabilidade-m8-quiz",
    title: "Contabilidade de Custos",
    moduleNumber: 8,
    questions: [
      {
        id: 801,
        question: "Qual é a diferença fundamental entre Custo e Despesa?",
        options: [
          "Não existe diferença",
          "Custo entra no produto, Despesa não entra no produto",
          "Custo é sempre maior que Despesa",
          "Despesa nunca é registrada"
        ],
        correct: 1,
        explanation: "Custo: gasto com produção de bens (está no produto, afeta estoque). Despesa: gasto que não entra no produto (afeta resultado imediatamente)."
      },
      {
        id: 802,
        question: "Em uma refinaria, qual é considerado Custo de Produção?",
        options: [
          "Salário do gerente administrativo",
          "Energia para processar óleo bruto",
          "Publicidade dos produtos",
          "Aluguel do prédio administrativo"
        ],
        correct: 1,
        explanation: "Energia é CIF (Custo Indireto de Fabricação), essencial para produção. Gerente administrativo é despesa de administração."
      },
      {
        id: 803,
        question: "O Ponto de Equilíbrio é o volume onde:",
        options: [
          "Empresa tem lucro máximo",
          "Receita Total = Custos Totais (lucro = zero)",
          "Empresa fecha as portas",
          "Custos fixos = lucro"
        ],
        correct: 1,
        explanation: "Break-Even Point: volume de vendas onde receita cobre todos custos (fixos + variáveis). Acima desse ponto = lucro."
      },
      {
        id: 804,
        question: "Se Custos Fixos = R$ 500.000, Margem de Contribuição Unitária = R$ 50/barril, qual é o break-even?",
        options: [
          "5.000 barris",
          "10.000 barris",
          "2.500 barris",
          "25.000 barris"
        ],
        correct: 1,
        explanation: "Break-Even = Custos Fixos / Margem de Contribuição = 500.000 / 50 = 10.000 barris"
      },
      {
        id: 805,
        question: "Custos Indiretos de Fabricação (CIF) incluem:",
        options: [
          "Apenas matéria-prima",
          "Aluguel fábrica, energia produção, depreciação máquinas",
          "Apenas mão-de-obra",
          "Apenas gastos administrativos"
        ],
        correct: 1,
        explanation: "CIF: gastos relacionados à produção que não são identificáveis direto no produto (rateio necessário)."
      },
      {
        id: 806,
        question: "Método de Custeio por Absorção significa:",
        options: [
          "Absorver apenas custos variáveis",
          "Absorver custos fixos + variáveis no custo do produto",
          "Não incluir custos no produto",
          "Absorver apenas despesas"
        ],
        correct: 1,
        explanation: "Custeio por Absorção: todos custos (fixos + variáveis) são incluídos no custo do produto. Método obrigatório para relatórios externos."
      },
      {
        id: 807,
        question: "Se preço de venda de barril é R$ 80, custo variável é R$ 50, qual é a Margem de Contribuição Unitária?",
        options: [
          "R$ 80",
          "R$ 50",
          "R$ 30",
          "R$ 130"
        ],
        correct: 2,
        explanation: "MC = Preço - Custo Variável = 80 - 50 = R$ 30 por barril"
      },
      {
        id: 808,
        question: "Em Petrobras, decisão de parar produção de um poço é baseada em:",
        options: [
          "Apenas volume de óleo",
          "Se preço de venda < custo variável (prejuízo por barril)",
          "Apenas política governamental",
          "Apenas demanda de mercado"
        ],
        correct: 1,
        explanation: "Se preço de venda cai abaixo de custo variável, cada barril vendido gera prejuízo. Melhor parar produção que vender com prejuízo."
      },
      {
        id: 809,
        question: "A Análise de Custo-Volume-Lucro (CVL) integra qual informação?",
        options: [
          "Apenas volume de produção",
          "Custos, Volume de Produção e Lucro Resultante",
          "Apenas lucro",
          "Apenas despesas administrativas"
        ],
        correct: 1,
        explanation: "CVL integra: Custos Fixos, Custos Variáveis Unitários, Preço de Venda e Volume de Produção para análise de viabilidade."
      }
    ]
  },
  "modulo-9": {
    id: "contabilidade-m9-quiz",
    title: "Contabilidade na Petrobras",
    moduleNumber: 9,
    questions: [
      {
        id: 901,
        question: "Petrobras é uma empresa:",
        options: [
          "Privada com ações minoritárias públicas",
          "Estatal de capital aberto",
          "Cooperativa de produtores",
          "Empresa familiar"
        ],
        correct: 1,
        explanation: "Petrobras é empresa estatal (controlada pela União) mas de capital aberto na Bolsa. Sujeita a Lei 13.303 e regulação CVM."
      },
      {
        id: 902,
        question: "IFRS em Petrobras é adotado porque:",
        options: [
          "Governo exige",
          "Facilita comparação internacional e é exigido para empresas abertas",
          "Reduz impostos",
          "É mais fácil que contabilidade brasileira"
        ],
        correct: 1,
        explanation: "IFRS (International Financial Reporting Standards) é adotado por empresas abertas para comparabilidade global e conforme exigência regulatória."
      },
      {
        id: 903,
        question: "A Lei 13.303 que rege Petrobras é:",
        options: [
          "Lei que regula explorações agrícolas",
          "Lei Federal que disciplina funcionamento de empresas estatais",
          "Lei que regulamenta apenas bancos",
          "Lei de direito civil"
        ],
        correct: 1,
        explanation: "Lei 13.303/2016 estabelece regras de governança, licitações, contratações e operação de empresas estatais como Petrobras."
      },
      {
        id: 904,
        question: "Auditoria externa em Petrobras é realizada por:",
        options: [
          "Apenas funcionários internos",
          "Big 4 ou firma de auditoria contratada, observando independência",
          "Governo federal",
          "Não faz auditoria"
        ],
        correct: 1,
        explanation: "Auditoria Externa: empresa de auditoria independente contratada para opinar sobre demonstrações financeiras. Obrigatória para empresas abertas."
      },
      {
        id: 905,
        question: "Divulgação de informações de Petrobras aos investidores é feita através de:",
        options: [
          "Apenas relatórios internos",
          "Demonstrações trimestrais/anuais, conference calls, relatório integrado",
          "Nenhuma divulgação",
          "Apenas para acionistas majoritários"
        ],
        correct: 1,
        explanation: "Petrobras divulga resultados trimestrais e anuais, realiza conference calls e publica relatório integrado com dados financeiros e não-financeiros."
      },
      {
        id: 906,
        question: "CVM (Comissão de Valores Mobiliários) fiscaliza Petrobras em:",
        options: [
          "Produção de óleo",
          "Divulgação de informações financeiras e governança corporativa",
          "Relacionamento com fornecedores",
          "Segurança do trabalho"
        ],
        correct: 1,
        explanation: "CVM é autarquia reguladora que fiscaliza divulgação de informações, conformidade com normas e governança corporativa de empresas abertas."
      },
      {
        id: 907,
        question: "Conformidade em Lei 13.303 para Petrobras inclui:",
        options: [
          "Apenas pagamento de salários",
          "Aprovações de contratações, licitações transparentes, limites de delegação",
          "Apenas produção de óleo",
          "Não existe conformidade especial"
        ],
        correct: 1,
        explanation: "Lei 13.303 exige: licitações públicas para contratos, comissões de avaliação, transparência, limites de autorização por cargo."
      },
      {
        id: 908,
        question: "ESG em relatórios de Petrobras refere-se a:",
        options: [
          "Sigla para empresa de suprimentos",
          "Environmental, Social, Governance - sustentabilidade e governança",
          "Apenas fatores econômicos",
          "Energia e gás (combustível)"
        ],
        correct: 1,
        explanation: "ESG: Environmental (impacto ambiental), Social (responsabilidade social), Governance (governança corporativa). Petrobras divulga essas métricas."
      },
      {
        id: 909,
        question: "Conselho Fiscal em Petrobras tem a função de:",
        options: [
          "Gerir operações de produção",
          "Opinar sobre demonstrações financeiras e conformidade de gestão",
          "Vender produtos",
          "Fazer auditoria operacional"
        ],
        correct: 1,
        explanation: "Conselho Fiscal é órgão que opina sobre demonstrações financeiras, conformidade e eficácia de controles internos. Independente da administração."
      }
    ]
  },
  "modulo-10": {
    id: "contabilidade-m10-quiz",
    title: "Simulado Mestre - Contabilidade",
    moduleNumber: 10,
    questions: [
      {
        id: 1001,
        question: "Empresa inicia com Capital de R$ 100.000. Compra máquina R$ 40.000 em dinheiro, compra estoque R$ 30.000 a prazo. Qual é o Patrimônio Líquido após operações?",
        options: [
          "R$ 60.000",
          "R$ 100.000",
          "R$ 70.000",
          "R$ 130.000"
        ],
        correct: 1,
        explanation: "Capital inicial = PL inicial R$ 100.000. Máquina (ativo por ativo) não altera PL. Estoque a prazo (ativo/passivo) não altera PL. PL = R$ 100.000"
      },
      {
        id: 1002,
        question: "Balancete apresenta débitos R$ 500.000 e créditos R$ 520.000. Ação correta é:",
        options: [
          "Publicar balancete mesmo assim",
          "Investigar erro de R$ 20.000 antes de prosseguir",
          "Ajustar números forçosamente",
          "Ignorar diferença"
        ],
        correct: 1,
        explanation: "Desequilíbrio indica erro de lançamento. Deve-se investigar qual conta foi lançada inversamente ou duplicada."
      },
      {
        id: 1003,
        question: "Empresa tem Receita R$ 1.000.000, Custos R$ 600.000, Despesas Operacionais R$ 250.000, Despesas Financeiras R$ 50.000. Lucro Líquido é:",
        options: [
          "R$ 1.000.000",
          "R$ 400.000",
          "R$ 100.000",
          "R$ 150.000"
        ],
        correct: 2,
        explanation: "Lucro = Receita - Custos - Despesas Operacionais - Despesas Financeiras = 1.000k - 600k - 250k - 50k = R$ 100.000"
      },
      {
        id: 1004,
        question: "Petrobras relata Lucro de R$ 50 bilhões mas Fluxo de Caixa de -R$ 10 bilhões. Causa mais provável é:",
        options: [
          "Erro contábil",
          "Vendas a prazo geram lucro mas sem entrada de caixa, ou investimentos grandes (capex) consomem caixa",
          "Fraude",
          "Contabilidade errada"
        ],
        correct: 1,
        explanation: "Diferença comum em empresas grandes: receitas de período atual mas recebimento em períodos futuros, ou investimentos em infraestrutura."
      },
      {
        id: 1005,
        question: "Técnico de Suprimento analisa proposta de fornecedor. Qual índice seria mais relevante?",
        options: [
          "ROE do fornecedor",
          "Liquidez Corrente (capacidade de cumprir prazos de pagamento)",
          "Margem Líquida",
          "Giro do Ativo"
        ],
        correct: 1,
        explanation: "Liquidez Corrente indica se fornecedor consegue cumprir prazos e não terá problemas financeiros durante contrato."
      },
      {
        id: 1006,
        question: "Qual demonstração seria mais útil para decisão de aumentar endividamento para investimento?",
        options: [
          "Balanço Patrimonial",
          "Fluxo de Caixa (para verificar capacidade de pagamento de juros e principal)",
          "Apenas DRE",
          "Balancete"
        ],
        correct: 1,
        explanation: "Fluxo de Caixa mostra se empresa gerará caixa suficiente para pagar juros e amortizações do novo endividamento."
      }
    ]
  }
};
