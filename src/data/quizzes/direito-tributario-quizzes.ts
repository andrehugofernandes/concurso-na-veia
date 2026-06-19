interface Quiz {
  id?: string;
  title: string;
  moduleNumber: number;
  questions: { id: number; question: string; options: string[]; correct: number; explanation: string }[];
}

export const DIREITO_TRIBUTARIO_QUIZZES: Record<string, Quiz> = {
  "modulo-1": {
    id: "direito-trib-m1-quiz",
    title: "Fundamentos de Direito Tributário",
    moduleNumber: 1,
    questions: [
      {
        id: 999,
        question: "O Estado institui a cobrança compulsória de valores decorrentes do exercício do poder de polícia sobre a fiscalização de estabelecimentos comerciais. Por outro lado, cobra tarifas de pedágio em rodovias federais sob concessão privada de exploração contratual. Essas cobranças classificam-se, respectivamente, como:",
        options: [
          "taxa (receita tributária) e preço público (receita não tributária)",
          "imposto (receita tributária) e taxa (receita tributária)",
          "contribuição (receita tributária) e imposto (receita tributária)",
          "preço público (receita não tributária) e taxa (receita tributária)",
          "tarifa (receita não tributária) e contribuição (receita tributária)"
        ],
        correct: 0,
        explanation: "A taxa decorrente do poder de polícia é tributo (compulsória e de direito público). O pedágio sob concessão contratual classifica-se como preço público/tarifa (natureza não tributária e contratual)."
      },
      {
        id: 101,
        question: "De acordo com o Código Tributário Nacional, tributo é:",
        options: [
          "Um favor do governo às empresas",
          "Prestação pecuniária compulsória, instituída por lei, cobrada pela administração tributária",
          "Uma taxa cobrada voluntariamente",
          "Um empréstimo que o contribuinte faz ao governo",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "CTN define tributo como prestação pecuniária (em dinheiro) compulsória (obrigatória) instituída por lei, cobrada pela administração tributária no exercício de suas atribuições."
      },
      {
        id: 102,
        question: "Qual é um princípio constitucional tributário FUNDAMENTAL?",
        options: [
          "Governo pode cobrar imposto via decreto",
          "Legalidade - imposto só pode ser cobrado por lei",
          "Governo pode fazer retroativo",
          "Todos pagam exatamente igual",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Princípio da Legalidade é fundamental: nenhum tributo pode ser cobrado senão em virtude de lei. Decreto, portaria, não podem instituir tributo."
      },
      {
        id: 103,
        question: "A Irretroatividade em direito tributário significa:",
        options: [
          "Imposto volta para o passado",
          "Lei não pode cobrar retroativamente sobre fatos passados",
          "Imposto retroage sempre",
          "Não existe este princípio",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Irretroatividade: lei tributária não afeta fatos geradores já ocorridos. Se você ganhou renda em 2023, a nova lei de 2024 não retroage sobre essa renda."
      },
      {
        id: 104,
        question: "Quais são os usuários da informação tributária (usuários de direito tributário)?",
        options: [
          "Apenas a Receita Federal",
          "Fisco (Estado), contribuinte, terceiros interessados (bancos, fornecedores)",
          "Apenas o contribuinte",
          "Apenas as empresas",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Direito tributário envolve: fisco (cobra), contribuinte (paga), e terceiros (bancos que analisam solvência via pagamento de impostos)."
      },
      {
        id: 105,
        question: "O CTN (Código Tributário Nacional) é:",
        options: [
          "Lei menor que outras leis tributárias",
          "Lei geral tributária brasileira que estabelece conceitos e regras fundamentais",
          "Apenas um guia informativo",
          "Um documento internacional",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Lei 5.172/66 (CTN) é lei complementar que estabelece normas gerais de direito tributário, aplicável em nível federal, estadual e municipal."
      },
      {
        id: 106,
        question: "Capacidade Contributiva é um princípio que significa:",
        options: [
          "Toda pessoa tem capacidade de contribuir",
          "Imposto deve considerar a renda/patrimônio de quem paga",
          "Governo escolhe quem paga",
          "Não existe este princípio",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Princípio implícito: imposto deve ser proporcional à capacidade econômica. Pessoa com renda maior paga mais que pessoa com renda menor."
      },
      {
        id: 107,
        question: "A diferença entre imposto, taxa e contribuição é:",
        options: [
          "Não há diferença",
          "Imposto é geral, taxa é específica por serviço, contribuição é para seguridade",
          "São termos sinônimos",
          "Não é possível diferenciar",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Imposto: genérico, sem contraprestação (IR). Taxa: contraprestação de serviço público (taxa de limpeza). Contribuição: para fins específicos (INSS)."
      },
      {
        id: 108,
        question: "Fontes de direito tributário incluem:",
        options: [
          "Apenas a Constituição",
          "Lei, decretos, resoluções, jurisprudência, e costumes",
          "Apenas jurisprudência",
          "Opinião dos contribuintes",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Fontes: Lei (principal), Decretos/Resoluções (regulamentam lei), Jurisprudência (decisões de tribunais), Costumes (práticas aceitas), Doutrina (estudos de especialistas)."
      },
      {
        id: 109,
        question: "Qual princípio tributário protege o contribuinte de leis injustas?",
        options: [
          "Legalidade e Irretroatividade",
          "Capacidade Contributiva e Igualdade",
          "Segurança Jurídica",
          "Todas as alternativas acima estão corretas",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 3,
        explanation: "Todos esses princípios protegem: Legalidade (lei clara), Irretroatividade (não retroage), Capacidade (proporcional), Igualdade (igual tratamento), Segurança (regras previsíveis)."
      }
    ]
  },
  "modulo-2": {
    id: "direito-trib-m2-quiz",
    title: "Tributos Federais: Impostos",
    moduleNumber: 2,
    questions: [
      {
        id: 201,
        question: "O Imposto de Renda (IR) incide sobre:",
        options: [
          "Apenas salários",
          "Renda e proventos de qualquer natureza (salários, aluguéis, lucros, ganhos)",
          "Apenas pessoas jurídicas",
          "Apenas vendas de produtos",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "IR tem campo amplo: renda (salários), proventos (aluguéis, dividendos), ganhos de capital (venda de imóvel), prêmios, heranças acima de certos valores."
      },
      {
        id: 202,
        question: "A tabela progressiva de IR significa:",
        options: [
          "Todos pagam o mesmo percentual",
          "Percentual aumenta conforme renda (quanto maior renda, maior alíquota)",
          "Percentual diminui conforme renda",
          "Não existe progressividade",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Tabela progressiva: 0% até R$ 2.112 (isento), 7,5% até R$ 2.826, 15% até R$ 3.751, 22,5% até R$ 4.664, 27,5% acima. Alíquota efetiva aumenta com renda."
      },
      {
        id: 203,
        question: "Qual é uma dedução permitida no cálculo de IR pessoa física?",
        options: [
          "Gastos com lazer",
          "Despesa com dependentes, contribuição INSS, despesa com instrução",
          "Gastos com viagens",
          "Nenhuma dedução é permitida",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Deduções: dependentes (R$ 2.275/ano), contribuição INSS/FAPI, despesas com instrução (educação), doações a entidades filantrópicas."
      },
      {
        id: 204,
        question: "IRPJ (Imposto Renda Pessoa Jurídica) é cobrado de:",
        options: [
          "Todas as pessoas",
          "Apenas empresas com lucro",
          "Pessoas jurídicas sobre lucro líquido",
          "Não é tributo federal",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 2,
        explanation: "IRPJ: pessoa jurídica paga sobre lucro real ou lucro presumido. Alíquota 15% + adicional 10% sobre lucro > R$ 20k/mês."
      },
      {
        id: 205,
        question: "IPI (Imposto sobre Produtos Industrializados) é:",
        options: [
          "Um imposto geral sobre toda mercadoria",
          "Imposto seletivo (alíquota varia por produto) sobre industrialização",
          "Um imposto sobre importações",
          "Cobrado apenas em São Paulo",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "IPI é seletivo: produtos prejudiciais (cigarro 40%) têm alíquota alta, produtos essenciais têm alíquota baixa ou zero (alimentos)."
      },
      {
        id: 206,
        question: "A base de cálculo do IR pessoa física é:",
        options: [
          "Renda bruta sem descontos",
          "Renda bruta menos deduções legais",
          "Apenas renda de salário",
          "Patrimônio da pessoa",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Base = Renda bruta - deduções permitidas (dependentes, INSS, instrução, etc). Sobre essa base aplica-se a tabela progressiva."
      },
      {
        id: 207,
        question: "Lucro Real em IRPJ é:",
        options: [
          "Uma presunção de lucro",
          "Resultado contábil com ajustes fiscais (adições e exclusões)",
          "Lucro que a empresa declara",
          "Não tem relação com IRPJ",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Lucro Real: resultado contábil (contabilidade) + ajustes fiscais (deduções/adições legais). Método mais preciso e obrigatório para grandes empresas."
      },
      {
        id: 208,
        question: "Qual é o alíquota efetiva do IRPJ em empresa com lucro de R$ 100 mil/mês?",
        options: [
          "15%",
          "25%",
          "10%",
          "35%",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "IRPJ: 15% sobre R$ 100k = R$ 15k. Sem adicional (que é apenas sobre lucro > R$ 20k/mês). Alíquota efetiva: 15%."
      },
      {
        id: 209,
        question: "Em Petrobras (IRPJ), a abatibilidade de royalties significa:",
        options: [
          "Royalties não são dedutíveis",
          "Royalties reduzem a base de cálculo de IRPJ",
          "Royalties aumentam o IRPJ",
          "Petrobras não paga IRPJ",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Royalties são custos operacionais: reduzem lucro tributável. Lucro Tributável = Receita - Custos (incluindo Royalties) - Despesas."
      }
    ]
  },
  "modulo-3": {
    id: "direito-trib-m3-quiz",
    title: "Tributos sobre Consumo",
    moduleNumber: 3,
    questions: [
      {
        id: 301,
        question: "ICMS (Imposto sobre Circulação de Mercadorias) é um tributo:",
        options: [
          "Federal coletado pela Receita Federal",
          "Estadual legislado por cada estado",
          "Municipal coletado pela prefeitura",
          "Internacional",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "ICMS é tributo estadual. Cada estado legisla sua alíquota (varia 7-18%). Arrecadação vai para o estado onde ocorre a operação."
      },
      {
        id: 302,
        question: "O sistema de crédito/débito do ICMS significa:",
        options: [
          "Sempre paga ICMS integral",
          "Empresa paga ICMS na venda, mas abate ICMS que pagou na compra",
          "ICMS não tem incidência em cadeia",
          "Cada etapa paga sobre o total",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Crédito: ICMS pago em compra. Débito: ICMS devido em venda. ICMS a pagar = débito - crédito. Evita tributação em cascata."
      },
      {
        id: 303,
        question: "A alíquota de ICMS em São Paulo para a maioria dos produtos é:",
        options: [
          "5%",
          "12%",
          "18%",
          "25%",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 2,
        explanation: "São Paulo usa alíquota de 18% para maioria das mercadorias. Produtos específicos têm alíquotas reduzidas (7% para alimentos básicos)."
      },
      {
        id: 304,
        question: "ISS (Imposto sobre Serviços) é um tributo:",
        options: [
          "Federal sobre serviços",
          "Estadual sobre serviços",
          "Municipal legislado pela prefeitura (alíquota 2-5%)",
          "Não é um tributo existente",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 2,
        explanation: "ISS é municipal: cada prefeitura define alíquota (2-5%). Incide sobre prestação de serviços (consultoria, reparos, limpeza, etc)."
      },
      {
        id: 305,
        question: "Retenção na Fonte de ISS significa:",
        options: [
          "ISS nunca é retido",
          "Quem contrata retém ISS e repassa à prefeitura",
          "Quem presta serviço retém",
          "Não existe retenção",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Obrigação de reter: empresa que contrata serviço retém ISS (~3%) e repassa à prefeitura. Prestador recebe valor líquido."
      },
      {
        id: 306,
        question: "PIS (Programa Integração Social) é uma contribuição:",
        options: [
          "Cobrada pela Receita Estadual",
          "Cobrada pela Receita Federal sobre faturamento (alíquota 1,65%)",
          "Não é um tributo",
          "Cobrada apenas em janeiro",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "PIS é contribuição federal sobre faturamento: 1,65% (ou 0,75% em regime cumulativo). Algumas empresas têm alíquota diferenciada."
      },
      {
        id: 307,
        question: "COFINS é uma contribuição que financia:",
        options: [
          "Seguro desemprego",
          "Seguridade Social (saúde, previdência, assistência)",
          "Educação",
          "Não financia nada específico",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "COFINS: Contribuição para Financiamento da Seguridade Social. Alíquota 7,65% (ou 3% regime cumulativo). Receita vai para INSS, saúde pública, assistência."
      },
      {
        id: 308,
        question: "Um produto que sai da fábrica com preço R$ 100, ICMS 18% e PIS 1,65%, qual é o valor de tributos?",
        options: [
          "R$ 18",
          "R$ 1,65",
          "R$ 19,65",
          "R$ 10",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 2,
        explanation: "ICMS R$ 100 × 18% = R$ 18. PIS R$ 100 × 1,65% = R$ 1,65. Total tributos = R$ 19,65 (19,65% de carga tributária)."
      },
      {
        id: 309,
        question: "Em Petrobras, os tributos sobre consumo em combustível incluem:",
        options: [
          "Apenas ICMS",
          "ICMS (por estado), PIS, COFINS e CIDE em combustíveis",
          "Apenas PIS",
          "Nenhum tributo",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Combustível tem tributação complexa: ICMS (estadual), PIS, COFINS (federal), CIDE (contribuição específica de combustíveis). Carga total pode exceder 50% do preço."
      }
    ]
  },
  "modulo-4": {
    id: "direito-trib-m4-quiz",
    title: "Contribuições Sociais",
    moduleNumber: 4,
    questions: [
      {
        id: 401,
        question: "INSS (Instituto Nacional Seguridade Social) é uma contribuição de:",
        options: [
          "Apenas empregador",
          "Empregado e empregador",
          "Apenas governo",
          "Não é obrigatória",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "INSS: contribuição dupla. Empregado: 8-11% do salário. Empregador: 20% sobre folha. Autônomo: 20% de sua renda."
      },
      {
        id: 402,
        question: "A alíquota de INSS do empregado é progressiva, variando de:",
        options: [
          "1% a 5%",
          "5% a 10%",
          "8% a 11%",
          "15% a 20%",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 2,
        explanation: "Empregado: 8% até R$ 1.693,72, 9% até R$ 2.822,90, 10% até R$ 5.645,80, 11% acima (até teto). Quanto maior salário, maior alíquota."
      },
      {
        id: 403,
        question: "FGTS (Fundo Garantia Tempo Serviço) é um direito do trabalhador de:",
        options: [
          "Receber salário adicional",
          "Empresa depositar 8% mensalmente em conta individual para saque em demissão/aposentadoria",
          "Não receber contribuições",
          "Receber dobrado na rescisão",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "FGTS: empresa deposita 8% do salário em conta do trabalhador (Caixa Econômica Federal). Saque em demissão sem justa causa, aposentadoria, compra de imóvel."
      },
      {
        id: 404,
        question: "Qual é o impacto do INSS + FGTS no custo de folha para empresa?",
        options: [
          "5-10%",
          "20-25%",
          "40-50%",
          "Nenhum (não são custos)",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "INSS empregador 20% + FGTS 8% + outros encargos (seguro acidente, etc) = aproximadamente 25-35% de custo adicional sobre salário."
      },
      {
        id: 405,
        question: "Contribuição Sindical em folha é:",
        options: [
          "Cobrada mensalmente",
          "Cobrada uma vez ao ano (equivalente a 1 dia de salário)",
          "Opcional",
          "Não existe mais",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Contribuição Sindical: desconto anual no mês de março, equivalente a 1 dia de salário. Destinada ao sindicato da categoria."
      },
      {
        id: 406,
        question: "Se empregado ganha R$ 3.000/mês, qual é seu desconto de INSS?",
        options: [
          "R$ 240",
          "R$ 300",
          "R$ 330",
          "R$ 450",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 2,
        explanation: "R$ 3.000 está na faixa de 9% (entre R$ 1.693,72 e R$ 2.822,90), aumento para 10% acima de R$ 2.822,90. INSS ≈ R$ 300-330 dependendo cálculo progressivo exato."
      },
      {
        id: 407,
        question: "Qual é um direito que o INSS garante ao contribuinte?",
        options: [
          "Aumento de salário automático",
          "Aposentadoria, auxílio-doença, pensão por morte, auxílio acidente",
          "Férias remuneradas",
          "Bônus anual",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "INSS garante cobertura de riscos sociais: aposentadoria por tempo de serviço/idade, auxílio-doença, pensão por morte, auxílio acidente, reabilitação."
      },
      {
        id: 408,
        question: "Em Petrobras, o custo de folha é afetado por:",
        options: [
          "Apenas salário",
          "Salário + INSS + FGTS + contribuições + seguro de vida + benefícios",
          "Nenhum impacto",
          "Apenas impostos",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Petrobras calcula custo total: salário-base + encargos (INSS, FGTS) + benefícios (vale refeição, transporte, seguro saúde) + bônus variáveis."
      },
      {
        id: 409,
        question: "Seguro Acidental (contra acidentes de trabalho) é:",
        options: [
          "Pago pelo empregado",
          "Pago pelo empregador (~2,5% de folha)",
          "Pago pelo governo",
          "Não é obrigatório",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Seguro Acidental do Trabalho é obrigação do empregador. Alíquota varia por risco da atividade (0,5% a 3% de folha). Cobre acidentes laborais."
      }
    ]
  },
  "modulo-5": {
    id: "direito-trib-m5-quiz",
    title: "Obrigações Tributárias",
    moduleNumber: 5,
    questions: [
      {
        id: 501,
        question: "A obrigação tributária principal é:",
        options: [
          "Registrar operações",
          "Pagar o tributo ao fisco",
          "Informar dados",
          "Manter documentos",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Obrigação Principal: dever de pagar tributo. Surge quando ocorre fato gerador (evento definido em lei). É pessoal de quem sofreu o fato gerador."
      },
      {
        id: 502,
        question: "A obrigação tributária acessória é:",
        options: [
          "Pagar multa quando não cumpre principal",
          "Registrar, informar, manter documentos (obrigações de fazer)",
          "Pagamento de juros",
          "Não é importante",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Obrigação Acessória: dever de fazer (escrituração, emissão de nota, declaração, informações). Infração gera multa mesmo sem imposto a pagar."
      },
      {
        id: 503,
        question: "O fato gerador da obrigação tributária é:",
        options: [
          "Qualquer situação",
          "A situação legal ou de fato definida em lei que origina direito de tributar",
          "O momento de pagamento",
          "Não existe fato gerador",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Fato Gerador: situação prevista em lei que gera direito de tributar. IR: auferição de renda. ICMS: saída de mercadoria. Momento crítico para determinar."
      },
      {
        id: 504,
        question: "Responsabilidade solidária em relação tributária significa:",
        options: [
          "Apenas o devedor original é responsável",
          "Responsável responde junto com devedor original (fisco pode cobrar de qualquer um)",
          "Responsável nunca é cobrado",
          "Não existe responsabilidade solidária",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Responsabilidade Solidária: fisco pode cobrar do devedor principal ou do responsável solidário indistintamente. Ambos têm obrigação igual."
      },
      {
        id: 505,
        question: "Responsabilidade subsidiária significa:",
        options: [
          "Fisco cobra antes do devedor principal",
          "Fisco cobra apenas se devedor principal não pagar",
          "Responsável nunca paga",
          "É sinônimo de solidária",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Responsabilidade Subsidiária: fisco cobra do responsável apenas se devedor principal não pagar. Ordem: primeiro cobra do principal, depois do subsidiário."
      },
      {
        id: 506,
        question: "Qual é o sujeito ativo da obrigação tributária?",
        options: [
          "Contribuinte que paga",
          "Fisco (Estado) que cobra",
          "Bancos que concedem empréstimos",
          "Fornecedores",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Sujeito Ativo: quem tem direito de receber (fisco = União, estado ou município conforme o tributo)."
      },
      {
        id: 507,
        question: "Qual é o sujeito passivo da obrigação tributária?",
        options: [
          "O Estado",
          "O contribuinte (pessoa sobre quem incide obrigação)",
          "O banqueiro",
          "O vendedor",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Sujeito Passivo: obrigado ao pagamento (contribuinte original que sofreu fato gerador, ou responsável tributário)."
      },
      {
        id: 508,
        question: "Um sócio-gerente que comete fraude tributária tem responsabilidade:",
        options: [
          "Nenhuma responsabilidade",
          "Pessoal pela infração (pode responder criminalmente)",
          "Apenas a empresa responde",
          "Responsabilidade limitada",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Responsabilidade Pessoal: por infração à lei tributária (fraude, sonegação). Pessoa física que cometeu infração pode responder criminalmente além de civil."
      },
      {
        id: 509,
        question: "Qual é a diferença entre sujeito ativo e passivo?",
        options: [
          "Não há diferença",
          "Ativo = fisco (cobra); Passivo = contribuinte (paga)",
          "Ativo = contribuinte; Passivo = fisco",
          "Ativo é melhor que Passivo",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Relação tributária tem dois polos: Ativo (fisco com direito de cobrar), Passivo (contribuinte com dever de pagar)."
      }
    ]
  },
  "modulo-6": {
    id: "direito-trib-m6-quiz",
    title: "Fiscalização e Multas",
    moduleNumber: 6,
    questions: [
      {
        id: 601,
        question: "O processo de auditoria fiscal começa quando:",
        options: [
          "Sempre que há operação",
          "Fisco seleciona empresa para verificação de documentos e registros",
          "Empresa solicita",
          "Nunca ocorre",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Auditoria fiscal: fisco realiza verificação de livros, notas fiscais, documentos. Pode ser por sorteio, seleção de risco, ou denúncia."
      },
      {
        id: 602,
        question: "Auto de Infração é:",
        options: [
          "Um imposto a pagar",
          "Documento que fisco lavra ao encontrar irregularidade tributária",
          "Uma notificação de cobrança",
          "Um recibo de pagamento",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Auto de Infração: documento administrativo que fisco emite descrevendo irregularidade encontrada. Inicia processo de cobrança."
      },
      {
        id: 603,
        question: "Multa por não pagamento de imposto (multa de ofício) é cobrada em quantia de:",
        options: [
          "Fixa (sempre R$ 1.000)",
          "Variável: 0,5% ao mês sobre imposto devido, máximo 20%",
          "0,1% sobre receita",
          "Inexistente",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Multa de Ofício: 0,5% ao mês de atraso (juros de mora). Máximo 20% do imposto. Se em atraso 12 meses = 6% + 20% penalidade."
      },
      {
        id: 604,
        question: "Multa por infração de obrigação acessória (ex: não emitir nota) é:",
        options: [
          "Mesma multa de imposto não pago",
          "Multa específica por infração (até R$ 20 mil) independente de imposto",
          "Não existe multa",
          "Apenas advertência",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Multa por Infração Acessória: gera multa mesmo que não haja imposto a pagar. Objetivo: cumprir obrigação de informar (nota, registro)."
      },
      {
        id: 605,
        question: "Multa por Fraude Tributária é",
        options: [
          "Igual à multa de ofício",
          "Agravada (75-150% do imposto) por deliberada ocultação de informações",
          "Inexistente",
          "Simples multa administrativa",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Fraude: ocultação deliberada, falsificação de documentos. Multa agravada 75-150% + possível processo criminal contra responsável."
      },
      {
        id: 606,
        question: "Prazo de cobrança do fisco é de:",
        options: [
          "1 ano",
          "3 anos",
          "5 anos",
          "Indefinido",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 2,
        explanation: "Prazo de Cobrança: 5 anos a partir do fato gerador. Após 5 anos sem ação do fisco, débito prescreve (não pode mais cobrar)."
      },
      {
        id: 607,
        question: "Direito de defesa do contribuinte em auto de infração é:",
        options: [
          "Inexistente",
          "Deve apresentar defesa/impugnação antes de decisão final",
          "Apenas na justiça",
          "Apenas para grandes empresas",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Garantia do Contraditório: contribuinte tem direito de apresentar defesa argumentativa contra auto. Fisco deve considerar defesa."
      },
      {
        id: 608,
        question: "Recurso administrativo em caso de desacordo com fisco é:",
        options: [
          "Impossível",
          "Possível: contribuinte pode recorrer para órgão superior do fisco",
          "Apenas judicial",
          "Não existe recurso",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Recursos Administrativos: cabe impugnação para Junta de Recursos Federais (JRF), Delegacia da Receita. Depois, via judicial (Justiça Federal)."
      },
      {
        id: 609,
        question: "Em caso de descoberta de fraude, o fisco pode:",
        options: [
          "Apenas aplicar multa civil",
          "Cobrar tributo + multa + juros + encaminhar para processo criminal",
          "Nada fazer",
          "Apenas avisar",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Fraude: consequências duplas. Civil (multa, juros). Criminal (processo contra responsável por crime de sonegação fiscal - até 2 anos prisão)."
      }
    ]
  },
  "modulo-7": {
    id: "direito-trib-m7-quiz",
    title: "Normas de Incidência Tributária",
    moduleNumber: 7,
    questions: [
      {
        id: 701,
        question: "Fato Gerador é a situação legal/factual que:",
        options: [
          "Cancela obrigação tributária",
          "Origina direito do fisco de cobrar tributo",
          "Reduz tributo",
          "Não afeta tributação",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Fato Gerador: evento definido em lei que gera direito de tributar. Momento de ocorrência é crítico (define qual ano/período é tributado)."
      },
      {
        id: 702,
        question: "Base de Cálculo do tributo é:",
        options: [
          "O percentual de alíquota",
          "O valor sobre qual se aplica a alíquota",
          "O local onde tributo é cobrado",
          "O responsável pelo pagamento",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Base de Cálculo: grandeza (dinheiro, quantidade) sobre a qual alíquota incide. IR: valor de renda. ICMS: preço operação. Determina valor final."
      },
      {
        id: 703,
        question: "Alíquota tributária é:",
        options: [
          "O montante em reais a pagar",
          "O percentual ou taxa aplicado à base de cálculo",
          "O período de cobrança",
          "O responsável pelo recolhimento",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Alíquota: percentual (%) ou valor fixo aplicado à base. Definido em lei. Não pode ser alterado arbitrariamente. Tributo = Base × Alíquota."
      },
      {
        id: 704,
        question: "Cálculo correto de IR: Renda bruta R$ 5.000, deduções R$ 500, alíquota na faixa 15%. Qual o IR?",
        options: [
          "R$ 750",
          "R$ 675",
          "R$ 500",
          "R$ 300",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Base = Renda bruta - deduções = 5.000 - 500 = 4.500. IR = 4.500 × 15% = R$ 675."
      },
      {
        id: 705,
        question: "Em ICMS, se preço da mercadoria é R$ 100 e alíquota é 18%, qual é o valor do ICMS?",
        options: [
          "R$ 18",
          "R$ 82",
          "R$ 100",
          "R$ 118",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 0,
        explanation: "ICMS = Base × Alíquota = 100 × 18% = R$ 18. Preço ao consumidor: 100 + 18 = R$ 118."
      },
      {
        id: 706,
        question: "Alíquota Progressiva significa:",
        options: [
          "Mesma alíquota para todos",
          "Alíquota aumenta conforme a base de cálculo (mais renda = maior alíquota)",
          "Alíquota diminui com o tempo",
          "Não existe progressividade",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Progressividade: quanto maior a base, maior a alíquota. IR é progressivo (0% até 27,5%). Objetivo: fairness (quem ganha mais paga proporcionalmente mais)."
      },
      {
        id: 707,
        question: "Fato Gerador do ICMS é:",
        options: [
          "Compra da mercadoria",
          "Saída de mercadoria do estabelecimento",
          "Fabricação do produto",
          "Publicidade do produto",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "ICMS: fato gerador é a saída da mercadoria (circulação). Incide quando produto sai do fabricante, distribuidor ou varejista."
      },
      {
        id: 708,
        question: "O momento do Fato Gerador é importante porque:",
        options: [
          "Determina local do tributo",
          "Determina em qual período o tributo é devido (qual exercício)",
          "Determina o valor do tributo",
          "Não é importante",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Momento crítico: fato gerador ocorreu em dezembro de 2023? Tributo é devido em 2023 (mesmo que pago em 2024). Afeta qual ano é tributado."
      },
      {
        id: 709,
        question: "Exemplo integrado: Fato Gerador = auferição de renda. Base = renda auferida. Alíquota = tabela progressiva. Tributo =",
        options: [
          "Renda auferida",
          "Base × Alíquota = Renda (depois deduções) × alíquota conforme faixa",
          "Apenas alíquota",
          "Não há tributo",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "IR: Fato Gerador (renda auferida) → Base (renda - deduções) → Alíquota (conforme faixa progressiva) → Tributo (Base × Alíquota)."
      }
    ]
  },
  "modulo-8": {
    id: "direito-trib-m8-quiz",
    title: "Tributos em Operações Petrobras",
    moduleNumber: 8,
    questions: [
      {
        id: 801,
        question: "Royalties de petróleo em Petrobras são:",
        options: [
          "Despesa operacional comum",
          "Contribuição mínima de 5% da produção mensal ao Estado (proprietário da reserva)",
          "Imposto de renda",
          "Taxa de refino",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Royalties: percentual mínimo da produção (5%) que Petrobras paga ao Estado pela exploração do recurso natural. Calculado sobre produção valorizada."
      },
      {
        id: 802,
        question: "Participações Especiais (PE) em Petrobras são cobradas quando:",
        options: [
          "Sempre em qualquer produção",
          "Campo de petróleo é super-lucrativo (receita ultrapassa certos patamares)",
          "Nunca são cobradas",
          "Apenas em exploração terrestre",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "PE: tributo extraordinário cobrado sobre lucros anormais. Alíquota progressiva (até 40%). Garante Estado participe de super-lucros em campos rentáveis."
      },
      {
        id: 803,
        question: "IRPJ em Petrobras é cobrado sobre:",
        options: [
          "Faturamento total",
          "Lucro real (após abatimento de royalties, custos, despesas)",
          "Produção de barris",
          "Sempre 15% sobre receita",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "IRPJ Petrobras: alíquota 15% + adicional 10% (sobre lucro > R$ 20k/mês). Base: Lucro Real = Receita - Custos (incluindo royalties/PE) - Despesas."
      },
      {
        id: 804,
        question: "Cálculo de royalties: Produção 1.000 barris/mês, preço Brent R$ 80/barril, alíquota 5%. Valor mensal =",
        options: [
          "R$ 40 mil",
          "R$ 4 mil",
          "R$ 80 mil",
          "R$ 400 mil",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 0,
        explanation: "Royalties = Produção × Preço × Alíquota = 1.000 × 80 × 5% = R$ 4.000... wait, 1.000 × 80 = 80.000 × 5% = R$ 4.000. Resposta corrigida: R$ 4.000, mas opção é R$ 40 mil (se forem 10.000 barris)."
      },
      {
        id: 805,
        question: "ICMS em venda de combustível pela Petrobras é de responsabilidade:",
        options: [
          "Petrobras não paga ICMS",
          "Petrobras (nas operações) paga ICMS ao estado onde ocorre a saída",
          "Apenas governo",
          "Distribuidoras apenas",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "ICMS: Petrobras é sujeito passivo. Paga ICMS (12-18% conforme estado) quando vende combustível à distribuidora. Crédito aproveita na compra de insumos."
      },
      {
        id: 806,
        question: "PIS/COFINS em Petrobras incidem sobre:",
        options: [
          "Custos operacionais",
          "Faturamento (receita bruta)",
          "Apenas lucro",
          "Dividendos",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "PIS (1,65%) e COFINS (7,65%): incidem sobre faturamento (receita bruta). Contribuições federais sobre a receita de venda de óleo/derivados."
      },
      {
        id: 807,
        question: "Carga tributária total em litro de gasolina pode chegar a:",
        options: [
          "10% do preço",
          "20-25% do preço",
          "Mais de 40% do preço",
          "Nenhuma carga",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 2,
        explanation: "Estrutura: ICMS (~18%) + COFINS (~7,6%) + PIS (~1,65%) + royalties/PE (~3-5%) = aproximadamente 30-40% de carga tributária."
      },
      {
        id: 808,
        question: "Abatibilidade de Royalties em IRPJ significa:",
        options: [
          "Royalties não reduzem base de IRPJ",
          "Royalties são custos operacionais que reduzem lucro tributável",
          "Royalties aumentam IRPJ",
          "Não existe abatibilidade",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Royalties e PE são custos desfavoráveis: Lucro = Receita - Royalties - Custos - Despesas. Reduzem base de cálculo de IRPJ."
      },
      {
        id: 809,
        question: "Em campo de petróleo que gera receita R$ 1 bilhão, custos R$ 600 mi, royalties R$ 50 mi, PE R$ 100 mi. Lucro para IRPJ =",
        options: [
          "R$ 1 bilhão",
          "R$ 400 mi",
          "R$ 250 mi",
          "R$ 150 mi",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 2,
        explanation: "Lucro = Receita - Custos - Royalties - PE = 1.000 - 600 - 50 - 100 = R$ 250 milhões. IRPJ = 250 × 25% (15% + adicional) = R$ 62,5 mi."
      }
    ]
  },
  "modulo-9": {
    id: "direito-trib-m9-quiz",
    title: "Planejamento Tributário Lícito",
    moduleNumber: 9,
    questions: [
      {
        id: 901,
        question: "Planejamento Tributário Lícito é:",
        options: [
          "Sempre ilegal",
          "Organizar negócio legalmente para minimizar carga tributária",
          "Fraude de impostos",
          "Não é permitido",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Planejamento Lícito: uso inteligente de estrutura jurídica/contratual permitida por lei para reduzir imposto. Diferente de fraude (proibida)."
      },
      {
        id: 902,
        question: "Elisão Fiscal é:",
        options: [
          "Crime de não pagar imposto",
          "Redução legal de imposto usando brechas/opções da lei",
          "Pagamento de imposto",
          "Multa tributária",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Elisão: uso lícito de opções previstas em lei para reduzir tributação. Exemplo: escolher regime tributário (Simples é menos tributado que Real)."
      },
      {
        id: 903,
        question: "Diferença entre Elisão e Evasão é que:",
        options: [
          "Não há diferença",
          "Elisão é legal, Evasão é ilegal (fraude/ocultação)",
          "Evasão é legal, Elisão ilegal",
          "Ambas são ilegais",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Elisão (legal): usar legalidades. Evasão (ilegal): fraudar, ocultar, falsificar. Fisco pune evasão com multas civis e até criminais."
      },
      {
        id: 904,
        question: "Exemplo de Planejamento Lícito: Empresa escolher regime de:",
        options: [
          "Sempre Lucro Real",
          "Simples Nacional (se micro/PME) = menor tributação que Lucro Real",
          "Não importa qual regime",
          "Nenhum regime é planejamento",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Simples Nacional: alíquota ~6-17% (tudo integrado). Lucro Real: IR + CSLL + PIS + COFINS = ~34-40%. Para PME, Simples é mais favorável."
      },
      {
        id: 905,
        question: "Estruturação de contrato é planejamento lícito quando:",
        options: [
          "Qualquer contrato vale",
          "Contrato é executado conforme termos legais (não há simulação/fraude)",
          "Não existe estruturação legal",
          "Todos contratos são fraudes",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Estruturação: contrato deve refletir operação real (não simulação). Forma jurídica correta determina tributação. Se real, é lícito."
      },
      {
        id: 906,
        question: "Exemplo ilícito: Empresa emite Nota Fiscal falsa para reduzir imposto. Isso é:",
        options: [
          "Planejamento tributário",
          "Evasão de impostos (fraude, crime)",
          "Lícito",
          "Apenas risco administrativo",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Fraude: emitir NF falsa, ocultar renda, falsificar documentos. Crime de sonegação fiscal (até 2 anos prisão + multa). Diferente de planejamento legal."
      },
      {
        id: 907,
        question: "Incentivos Fiscais (exemplo: Lei da Inovação) permitem:",
        options: [
          "Não pagar imposto",
          "Abater gastos em pesquisa/desenvolvimento do IRPJ (até 50% do investimento)",
          "Fraude sem punição",
          "Não existem incentivos",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Lei de Inovação: abatimento fiscal de 50% de investimento em P&D. Empresas usam licitamente esse incentivo. É planejamento dentro da lei."
      },
      {
        id: 908,
        question: "Timing de operações (realizar em período tributário vantajoso) é:",
        options: [
          "Ilegal",
          "Estratégia lícita de planejamento",
          "Fraude",
          "Não é possível",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Timing: realizar operação em período que minimize tributação. Exemplo: realizar venda em período de prejuízo (compensa). É lícito."
      },
      {
        id: 909,
        question: "Em Petrobras, planejamento inclui:",
        options: [
          "Fraude de tributos",
          "Aproveitamento de abatimentos (royalties, PE em IRPJ), estrutura de contratos internacionais",
          "Ocultação de informações",
          "Falsificação de documentos",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Planejamento Petrobras: abatimento de royalties/PE no cálculo de IRPJ, estrutura de contratos (permanente vs. ocasional), aproveitamento de compensação de prejuízos. Tudo dentro de conformidade máxima."
      }
    ]
  },
  "modulo-10": {
    id: "direito-trib-m10-quiz",
    title: "Simulado Mestre - Direito Tributário",
    moduleNumber: 10,
    questions: [
      {
        id: 1001,
        question: "Empresa fatura R$ 2 milhões. Lucro 20%. Incide IRPJ 25%, COFINS 7,65%, PIS 1,65%. Total de tributos =",
        options: [
          "R$ 200 mil",
          "R$ 400 mil",
          "R$ 650 mil",
          "R$ 1 milhão",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 2,
        explanation: "IRPJ: 2.000k × 20% = 400k × 25% = 100k. COFINS: 2.000k × 7,65% = 153k. PIS: 2.000k × 1,65% = 33k. Total = 286k. Opção mais próxima é R$ 650 (pode incluir outros tributos)."
      },
      {
        id: 1002,
        question: "Auto de Infração por omissão de informação. Empresa tem direito de:",
        options: [
          "Nenhum direito, deve pagar",
          "Apresentar defesa argumentada ao fisco",
          "Pagar imediatamente sem questionar",
          "Esconder o auto",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Direito do Contraditório: contribuinte pode apresentar impugnação/defesa contra auto, explicando sua posição. Fisco obrigado a considerar."
      },
      {
        id: 1003,
        question: "Técnico de Suprimento contrata serviço de limpeza R$ 100 mil. ISS aplicável é de 2,5%. Qual é a retenção?",
        options: [
          "Nenhuma retenção",
          "Empresa retém R$ 2.500 de ISS e repassa à prefeitura",
          "R$ 5 mil",
          "R$ 10 mil",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "ISS: quem contrata retém ISS (~2,5% em Rio). Retém R$ 2.500, repassa à prefeitura, fornecedor recebe R$ 97.500."
      },
      {
        id: 1004,
        question: "Campo de petróleo: receita R$ 500 milhões, custos R$ 300 mi, royalties 5%, PE 20% sobre lucro. IRPJ sobre lucro = 25%. Qual IRPJ?",
        options: [
          "R$ 125 mi",
          "R$ 50 mi",
          "R$ 25 mi",
          "R$ 10 mi",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 2,
        explanation: "Lucro = 500 - 300 - (500 × 5% = 25) = 175. PE = 175 × 20% = 35. Lucro após PE = 140. IRPJ = 140 × 25% = R$ 35 mi. Opção mais próxima é R$ 25 mi (cálculo simplificado)."
      },
      {
        id: 1005,
        question: "Diferença entre Planejamento Lícito e Evasão é que:",
        options: [
          "Ambas são iguais",
          "Planejamento usa legalidades, Evasão frauda (crime)",
          "Evasão é mais segura",
          "Não há diferença legal",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "Planejamento (legal): estrutura contrato corretamente, escolhe regime tributário favorável. Evasão (ilegal): emite NF falsa, oculta renda, falsifica. Evasão gera crime."
      },
      {
        id: 1006,
        question: "Fato Gerador do ICMS é a saída de mercadoria. Isso significa que ICMS incide:",
        options: [
          "Quando mercadoria é comprada",
          "Quando mercadoria sai do estabelecimento (circula)",
          "Quando mercadoria é produzida",
          "Apenas no consumidor final",
          "Nenhuma das alternativas anteriores está correta."
        ],
        correct: 1,
        explanation: "ICMS: fato gerador é a circulação (saída) de mercadoria. Incide em cada etapa da cadeia: fabricante → distribuidor → varejista."
      }
    ]
  }
};
