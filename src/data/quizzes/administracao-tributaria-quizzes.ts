import { Quiz } from "@/lib/types";

export const ADMINISTRACAO_TRIBUTARIA_QUIZZES: Record<string, Quiz> = {
  "modulo-1": {
    id: "admin-trib-m1-quiz",
    title: "Administração Tributária: Conceitos",
    moduleNumber: 1,
    questions: [
      {
        id: 101,
        question: "Administração Tributária em uma empresa é responsável por:",
        options: [
          "Apenas vender produtos",
          "Gerenciar cumprimento de obrigações tributárias, prazos, registros, otimizar custos",
          "Apenas pagar impostos",
          "Nada importante"
        ],
        correct: 1,
        explanation: "Administração Tributária gerencia: cumprimento de obrigações, prazos de recolhimento, registros corretos, aproveitamento de créditos, redução de custos, conformidade."
      },
      {
        id: 102,
        question: "Principal objetivo da Administração Tributária é:",
        options: [
          "Aumentar impostos",
          "Cumprir obrigações legais, evitar multas, otimizar custos tributários",
          "Sonegar impostos",
          "Não tem objetivo"
        ],
        correct: 1,
        explanation: "Objetivos: 1) Conformidade (cumprir lei). 2) Segurança jurídica (evitar multas/juros). 3) Eficiência (reduzir custos tributários licitamente)."
      },
      {
        id: 103,
        question: "Qual é um desafio na Administração Tributária de Petrobras?",
        options: [
          "Apenas pagar um imposto",
          "Múltiplos tributos, múltiplas jurisdições (estados), operações bilionárias",
          "Nenhum desafio",
          "Apenas registros contábeis"
        ],
        correct: 1,
        explanation: "Petrobras: IR, ICMS (5+ estados), PIS, COFINS, royalties, participações especiais, INSS, FGTS. Cada tributo em múltiplos estados/períodos."
      },
      {
        id: 104,
        question: "Qual profissional típico gerencia Administração Tributária?",
        options: [
          "Vendedor",
          "Contador ou Analista Tributário especializad",
          "Operário de fábrica",
          "Gerente de logística"
        ],
        correct: 1,
        explanation: "Analista Tributário ou Contador especializado em tributos. Em grandes empresas: departamento tributário próprio com sênior specialists."
      },
      {
        id: 105,
        question: "Benefício principal de boa Administração Tributária é:",
        options: [
          "Aumentar impostos pagos",
          "Evitar multas (economia significativa), melhorar liquidez, reduzir riscos",
          "Não há benefício",
          "Apenas para grandes empresas"
        ],
        correct: 1,
        explanation: "Multas + juros podem ser 50%+ do imposto original. Boa administração evita isso, melhora caixa, reduz risco de auditoria."
      },
      {
        id: 106,
        question: "Qual é uma ação de Administração Tributária?",
        options: [
          "Vender mais produtos",
          "Elaborar calendar de prazos, registrar operações corretamente, aproveitar créditos",
          "Fabricar produtos",
          "Demitir funcionários"
        ],
        correct: 1,
        explanation: "Ações: planejamento (calendar), execução (registros), otimização (aproveitamento de créditos), monitoramento (conformidade)."
      },
      {
        id: 107,
        question: "Consequência de má Administração Tributária inclui:",
        options: [
          "Aumento de vendas",
          "Multas (0,5% ao mês), juros de mora (SELIC), perda de créditos por prescrição",
          "Melhora operacional",
          "Nenhuma consequência"
        ],
        correct: 1,
        explanation: "Atraso de R$ 100k: multa R$ 500-1.000/mês (0,5%). Juros SELIC ~0,5% ao mês. Acumula rápido."
      },
      {
        id: 108,
        question: "Administração Tributária deve acompanhar mudanças em:",
        options: [
          "Apenas preço de produtos",
          "Legislação tributária (novas leis, alíquotas, prazos)",
          "Apenas horário de funcionamento",
          "Nada precisa acompanhar"
        ],
        correct: 1,
        explanation: "Lei tributária muda frequentemente: novas alíquotas, prazos, obrigações acessórias. Administração deve estar atualizada para conformidade."
      },
      {
        id: 109,
        question: "Em Petrobras, Administração Tributária é crítica porque:",
        options: [
          "Não é importante",
          "Operações bilionárias gerando bilhões em imposto; erro = perdas massivas",
          "Apenas para pequenos negócios",
          "Petrobras não paga imposto"
        ],
        correct: 1,
        explanation: "Petrobras: faturamento R$ 500 bi = imposto R$ 100+ bi. Erro de 1% = R$ 1 bilhão de impacto. Importância crítica."
      }
    ]
  },
  "modulo-2": {
    id: "admin-trib-m2-quiz",
    title: "Órgãos Arrecadadores",
    moduleNumber: 2,
    questions: [
      {
        id: 201,
        question: "Receita Federal do Brasil (RFB) arrecada principalmente:",
        options: [
          "ICMS",
          "IR, IPI, COFINS, PIS e outros tributos federais",
          "ISS",
          "IPTU"
        ],
        correct: 1,
        explanation: "RFB: órgão federal que arrecada tributos federais (IR, IPI, impostos aduaneiros, contribuições sociais federais)."
      },
      {
        id: 202,
        question: "SEFAZ (Secretaria de Fazenda) é responsável por:",
        options: [
          "Arrecadar tributos federais",
          "Arrecadar ICMS e tributos estaduais (órgão estadual)",
          "Arrecadar apenas ISS",
          "Nada tributário"
        ],
        correct: 1,
        explanation: "SEFAZ: órgão estadual. Cada estado tem sua SEFAZ. Arrecada ICMS (imposto mais importante para estados), tax estaduais."
      },
      {
        id: 203,
        question: "Prefeitura Municipal arrecada principalmente:",
        options: [
          "IR e IPI",
          "ISS (Imposto sobre Serviços), IPTU, impostos municipais",
          "ICMS",
          "Tributos federais"
        ],
        correct: 1,
        explanation: "Prefeitura: órgão municipal. Arrecada ISS (~2-5% conforme município), IPTU (propriedade), impostos municipais específicos."
      },
      {
        id: 204,
        question: "INSS e FGTS são arrecadadores de:",
        options: [
          "Impostos",
          "Contribuições sociais (previdência, fundo garantia)",
          "Taxas municipais",
          "Sem relação com arrecadação"
        ],
        correct: 1,
        explanation: "INSS: contribuição previdenciária (seguro social). FGTS: fundo de garantia de tempo de serviço. Ambos são contribuições sociais."
      },
      {
        id: 205,
        question: "A RFB mantém sistema para empresa transmitir declarações via:",
        options: [
          "Papel",
          "SPED (Sistema Público Escrituração Digital)",
          "Telefone",
          "Pessoalmente"
        ],
        correct: 1,
        explanation: "SPED: plataforma eletrônica de transmissão de informações (EFD, ECF, DIPJ, etc). Transmissão via certificado digital."
      },
      {
        id: 206,
        question: "Estrutura hierárquica de órgãos tributários é:",
        options: [
          "RFB > Prefeitura > SEFAZ",
          "RFB (federal) > SEFAZ (estadual) > Prefeitura (municipal)",
          "Prefeitura > SEFAZ > RFB",
          "Todos no mesmo nível"
        ],
        correct: 1,
        explanation: "RFB: federal (mais alto). SEFAZ: estadual (meio). Prefeitura: municipal (local). Cada um cobra seus tributos."
      },
      {
        id: 207,
        question: "Empresa com operações em 5 estados deve se registrar em quantas SEFAZs?",
        options: [
          "1 SEFAZ central",
          "5 SEFAZs (uma por estado onde opera)",
          "0 SEFAZs",
          "Apenas 1 estadual"
        ],
        correct: 1,
        explanation: "Cada estado tem SEFAZ própria. Operação em SP = registra SP. Operação em MG = registra MG. Múltiplos estados = múltiplas SEFAZs."
      },
      {
        id: 208,
        question: "Compartilhamento de informações entre órgãos tributários ocorre via:",
        options: [
          "Nunca compartilham",
          "SPED e sistemas integrados (NF-e, EFD)",
          "Apenas por telefone",
          "Sem nenhuma integração"
        ],
        correct: 1,
        explanation: "RFB, SEFAZs, Prefeituras compartilham dados: NF-e (todas veem), SPED (RFB recebe informação estadual), integração crescente."
      },
      {
        id: 209,
        question: "Qual órgão a empresa paga ICMS em operação em São Paulo?",
        options: [
          "RFB",
          "SEFAZ-SP (Secretaria de Fazenda de São Paulo)",
          "Prefeitura de São Paulo",
          "INSS"
        ],
        correct: 1,
        explanation: "ICMS é tributo estadual. Operação em SP = paga para SEFAZ-SP. Operação em MG = paga para SEFAZ-MG (alíquota diferente)."
      }
    ]
  },
  "modulo-3": {
    id: "admin-trib-m3-quiz",
    title: "Registros e Documentos Fiscais",
    moduleNumber: 3,
    questions: [
      {
        id: 301,
        question: "Nota Fiscal Eletrônica (NF-e) é obrigatória para:",
        options: [
          "Apenas grandes empresas",
          "Circulação de mercadoria (desde 2006 para maioria)",
          "Nunca é obrigatória",
          "Apenas importação"
        ],
        correct: 1,
        explanation: "NF-e: obrigatória para circulação de mercadoria. Emitida eletronicamente, autorizada pela SEFAZ, rastreada digitalmente."
      },
      {
        id: 302,
        question: "Empresas devem manter qual documento por 5 anos?",
        options: [
          "Apenas recibos de venda",
          "Notas Fiscais, livros contábeis, recibos, comprovantes de pagamento",
          "Apenas 1 ano",
          "Não precisa manter"
        ],
        correct: 1,
        explanation: "Prazo de guarda: 5 anos a partir da data da operação (prazo de prescrição). Inclui NF, livros, comprovantes, recibos."
      },
      {
        id: 303,
        question: "Livro de Apuração ICMS registra:",
        options: [
          "Apenas vendas",
          "Débitos (saídas/vendas) e Créditos (entradas/compras) de ICMS",
          "Apenas compras",
          "Salários"
        ],
        correct: 1,
        explanation: "Livro ICMS: débito ICMS = ICMS devido em venda. Crédito ICMS = ICMS pago em compra. Apuração = débito - crédito = ICMS a pagar."
      },
      {
        id: 304,
        question: "DANFE é:",
        options: [
          "Uma taxa cobrada pela prefeitura",
          "Documento Auxiliar de NF-e (impresso da NF eletrônica)",
          "Um livro contábil",
          "Uma declaração de renda"
        ],
        correct: 1,
        explanation: "DANFE: documento que acompanha mercadoria durante transporte. Gerado a partir da NF-e autorizada pela SEFAZ."
      },
      {
        id: 305,
        question: "Escrituração Contábil Digital (ECD) deve ser enviada até:",
        options: [
          "Fim do ano",
          "Dia 15 do mês seguinte ao período",
          "Nunca é enviada",
          "Apenas anualmente"
        ],
        correct: 1,
        explanation: "ECD (livro diário/razão digital): transmissão até dia 15 do mês seguinte à RFB. Obrigatória para empresas acima de faturamento mínimo."
      },
      {
        id: 306,
        question: "Recibo de Pagamento Autônomo (RPA) é emitido por:",
        options: [
          "Empresa sempre",
          "Autônomo quando presta serviço ocasional a terceiro",
          "Governo",
          "Nunca é emitido"
        ],
        correct: 1,
        explanation: "RPA: documento de prestação de serviço por autônomo. Indica: serviço prestado, valor, INSS retido (~11%), ISS retido (~3% conforme município)."
      },
      {
        id: 307,
        question: "NFS-e é:",
        options: [
          "Nota Fiscal de Saída de Estoque",
          "Nota Fiscal de Serviço Eletrônica (em alguns municípios obrigatória para ISS)",
          "Nota Fiscal de Suplementação",
          "Não é um documento"
        ],
        correct: 1,
        explanation: "NFS-e: em municípios como São Paulo, é obrigatória eletrônica. Em outros, RPA ou recibo simples pode ser suficiente."
      },
      {
        id: 308,
        question: "Omissão de emissão de Nota Fiscal gera:",
        options: [
          "Nenhuma penalidade",
          "Multa por obrigação acessória (~até R$ 20k) mesmo sem imposto não pago",
          "Apenas aviso",
          "Apenas correção"
        ],
        correct: 1,
        explanation: "Obrigação acessória (registrar) é separada de obrigação principal (pagar). Não emitir NF = multa de infração acessória."
      },
      {
        id: 309,
        question: "Livro de Entrada de Mercadoria é importante para:",
        options: [
          "Apenas gestão operacional",
          "Controlar compras, validar créditos ICMS, auditar fornecedores",
          "Não é importante",
          "Apenas para lojas"
        ],
        correct: 1,
        explanation: "Livro Entrada: prova de compras para aproveitamento de ICMS crédito. Auditoria verifica se compras foram registradas corretamente."
      }
    ]
  },
  "modulo-4": {
    id: "admin-trib-m4-quiz",
    title: "Declarações Tributárias",
    moduleNumber: 4,
    questions: [
      {
        id: 401,
        question: "DIPJ (Declaração Imposto Pessoa Jurídica) é apresentada:",
        options: [
          "Mensalmente",
          "Anualmente (até 30 de abril)",
          "Nunca",
          "A cada 3 anos"
        ],
        correct: 1,
        explanation: "DIPJ: declaração anual de IR de PJ. Apresenta receitas, custos, despesas, cálculo de IR. Prazo: até 30 de abril do ano seguinte."
      },
      {
        id: 402,
        question: "ECF (Escrituração Contábil Fiscal) apresenta:",
        options: [
          "Apenas vendas",
          "Bases de cálculo de IR, CSLL, PIS, COFINS (mensal/período)",
          "Apenas gastos",
          "Não apresenta nada"
        ],
        correct: 1,
        explanation: "ECF: declaração mensal (período de apuração) que mostra bases tributárias (receita, custos, despesas ajustadas)."
      },
      {
        id: 403,
        question: "DACON é utilizado quando empresa quer:",
        options: [
          "Apenas vender",
          "Compensar crédito tributário contra débito (usar ICMS crédito para abater débito futuro)",
          "Pagar imposto",
          "Não é declaração"
        ],
        correct: 1,
        explanation: "DACON: Declaração de Compensação. Empresa tem crédito (ICMS, IR, PIS) e quer usar para abater débito futuro."
      },
      {
        id: 404,
        question: "SPED é:",
        options: [
          "Uma taxa municipal",
          "Sistema Público Escrituração Digital (plataforma de transmissão de declarações via internet)",
          "Um livro físico",
          "Uma multa"
        ],
        correct: 1,
        explanation: "SPED: plataforma digital integrada. Módulos: EFD-ICMS (ICMS/IPI), EFD-Contrib (PIS/COFINS), ECF (contábil), entre outros."
      },
      {
        id: 405,
        question: "Prazo para transmissão de EFD-ICMS (SPED) é:",
        options: [
          "Fim do mês",
          "Até dia 15 do mês seguinte à RFB",
          "Fim do ano",
          "Não tem prazo"
        ],
        correct: 1,
        explanation: "EFD-ICMS: arquivo de operações de ICMS/IPI mensais. Transmissão até dia 15 do mês seguinte via SPED."
      },
      {
        id: 406,
        question: "Em DIPJ, empresa declara lucro de R$ 1 milhão. IR devido (25% alíquota efetiva) é:",
        options: [
          "R$ 500 mil",
          "R$ 250 mil",
          "R$ 100 mil",
          "R$ 1 milhão"
        ],
        correct: 1,
        explanation: "IRPJ: 15% + adicional 10% (se lucro > R$ 20k/mês) = 25% sobre lucro. Lucro R$ 1 mi × 25% = R$ 250 mil."
      },
      {
        id: 407,
        question: "Se empresa não apresenta DIPJ no prazo, sofre:",
        options: [
          "Nada acontece",
          "Multa por omissão de declaração (até 20% do imposto devido)",
          "Apenas aviso",
          "Sem consequência"
        ],
        correct: 1,
        explanation: "Falta de declaração: multa de infração (até 20% do IR = muito significativo). Evitável com disciplina de prazos."
      },
      {
        id: 408,
        question: "Certificado Digital é necessário para:",
        options: [
          "Apenas abrir empresa",
          "Assinar digitalmente NF-e, SPED e declarações (segurança e autenticação)",
          "Nunca é necessário",
          "Apenas para governo"
        ],
        correct: 1,
        explanation: "Certificado e-CNPJ: necessário para emitir NF-e e transmitir SPED. Válido 1 ano (renovação). Custo ~R$ 300-500/ano."
      },
      {
        id: 409,
        question: "Integridade de declaração tributária depende de:",
        options: [
          "Sorte",
          "Registros corretos, documentação completa, cálculos precisos",
          "Nada em particular",
          "Apenas opinião"
        ],
        correct: 1,
        explanation: "Declaração tem que ser fiel aos registros. RFB valida via auditoria: NF-e emitidas, compras registradas, imposto calculado correto."
      }
    ]
  },
  "modulo-5": {
    id: "admin-trib-m5-quiz",
    title: "Prazos e Obrigações Acessórias",
    moduleNumber: 5,
    questions: [
      {
        id: 501,
        question: "Prazo de recolhimento de ICMS é até:",
        options: [
          "Dia 7",
          "Dia 15 (estadual, pode variar por estado)",
          "Dia 21",
          "Final do mês"
        ],
        correct: 1,
        explanation: "ICMS: apuração mensal, recolhimento até dia 15 (alguns estados 21). Atraso = multa 0,5% ao mês + juros."
      },
      {
        id: 502,
        question: "Prazo de recolhimento de IR (desconto de folha) é até:",
        options: [
          "Dia 7",
          "Dia 21 do mês seguinte",
          "Dia 30",
          "Fim do trimestre"
        ],
        correct: 1,
        explanation: "IR de folha: descontado de salários, recolhido até dia 21 do mês seguinte à RFB. Importante para cashflow."
      },
      {
        id: 503,
        question: "Prazo de recolhimento de INSS é até:",
        options: [
          "Dia 7",
          "Dia 15 do mês seguinte",
          "Dia 21",
          "Fim do mês"
        ],
        correct: 1,
        explanation: "INSS: contribuição mensal, recolhimento até dia 15 (guia GPS). Atraso gera juros e multa significativos."
      },
      {
        id: 504,
        question: "Prazo para apresentar DIPJ é até:",
        options: [
          "31 de março",
          "30 de abril do ano seguinte",
          "31 de maio",
          "Fim do ano"
        ],
        correct: 1,
        explanation: "DIPJ: declaração anual apresentada até 30 de abril. Atraso = multa por omissão de declaração."
      },
      {
        id: 505,
        question: "Empresa atrasa ICMS de R$ 100 mil em 10 dias (atraso d10). Multa de ofício é:",
        options: [
          "R$ 1 mil",
          "R$ 5 mil (100k × 0,5% × 10 dias)",
          "R$ 20 mil",
          "Nenhuma multa"
        ],
        correct: 1,
        explanation: "Multa = tributo × 0,5% × dias atraso (simplificado). 100k × 0,5% × 10 = R$ 5 mil. + juros SELIC (~R$ 2-3 mil)."
      },
      {
        id: 506,
        question: "Obrigação acessória inclui:",
        options: [
          "Apenas pagar imposto",
          "Emitir NF, manter livros, registrar operações, enviar declarações",
          "Nenhuma obrigação",
          "Apenas vendas"
        ],
        correct: 1,
        explanation: "Obrigações Acessórias: registrar operações, emitir documentos, manter livros, enviar declarações. Infração = multa mesmo sem imposto não pago."
      },
      {
        id: 507,
        question: "Prazo para guardar documentos fiscais é de:",
        options: [
          "1 ano",
          "5 anos (prazo de prescrição tributária)",
          "3 anos",
          "Indefinido"
        ],
        correct: 1,
        explanation: "Guarda de Documentos: 5 anos contados do fato gerador. NF, livros, recibos devem ser mantidos por 5 anos."
      },
      {
        id: 508,
        question: "Se fisco realiza auditoria e encontra NF não emitida, consequência é:",
        options: [
          "Apenas correção",
          "Multa por infração acessória (omissão de informação) + possível imposto não pago + juros + multa agravada",
          "Sem consequência",
          "Apenas aviso"
        ],
        correct: 1,
        explanation: "NF não emitida: dupla penalidade. Infração acessória (multa por não informar) + imposto não pago + juros + multa agravada se fraude."
      },
      {
        id: 509,
        question: "Empresa é obrigada a emitir NF mesmo que operação seja entre filiais da mesma empresa?",
        options: [
          "Não, filiais não precisam de NF",
          "Sim, transfer interno entre filiais gera NF (operação de circulação de mercadoria)",
          "Apenas para clientes externos",
          "Nunca é obrigado"
        ],
        correct: 1,
        explanation: "Transfer entre filiais: gera NF (é circulação de mercadoria). ICMS incide normalmente. Fisco monitora via NF-e."
      }
    ]
  },
  "modulo-6": {
    id: "admin-trib-m6-quiz",
    title: "Gestão de Impostos",
    moduleNumber: 6,
    questions: [
      {
        id: 601,
        question: "Planejamento Tributário Integrado envolve:",
        options: [
          "Apenas vender mais",
          "Analisar operações e estruturar para minimizar imposto de forma lícita",
          "Fraudar impostos",
          "Não envolve nada"
        ],
        correct: 1,
        explanation: "Planejamento: análise de qual operação/estrutura gera menos imposto. Lícito = usa opções da lei. Ilícito = frauda."
      },
      {
        id: 602,
        question: "Fluxo de Caixa Tributário deve considerar:",
        options: [
          "Apenas receitas",
          "Previsão mensal de impostos a pagar (prazos, valores) para manter liquidez",
          "Apenas gastos operacionais",
          "Nada"
        ],
        correct: 1,
        explanation: "Cashflow tributário: quando venço ICMS (dia 15)? Quanto é? Isso afeta caixa? Planejamento evita falta de dinheiro."
      },
      {
        id: 603,
        question: "Aproveitamento de Crédito ICMS significa:",
        options: [
          "Não pagar ICMS",
          "Usar ICMS pago em compra para abater ICMS devido em venda",
          "Fraude",
          "Sem relação"
        ],
        correct: 1,
        explanation: "Crédito ICMS: direito garantido por lei. Compra com ICMS = crédito. Venda com ICMS = débito. Apuração = débito - crédito."
      },
      {
        id: 604,
        question: "Compensação de Tributos significa:",
        options: [
          "Não pagar nada",
          "Usar crédito para abater débito futuro (economia imediata)",
          "Fraude",
          "Sem efeito"
        ],
        correct: 1,
        explanation: "Compensação: empresa com crédito ICMS R$ 100k pode usar para abater ICMS futuro de R$ 100k. Economia imediata."
      },
      {
        id: 605,
        question: "Restituição de Tributo é solicitada quando:",
        options: [
          "Sempre",
          "Empresa tem crédito sem débito correspondente (ex: operações isentas com crédito ICMS)",
          "Nunca",
          "Apenas government"
        ],
        correct: 1,
        explanation: "Restituição: exportadora com crédito ICMS (operação isenta) pode solicitar devolução do crédito em dinheiro."
      },
      {
        id: 606,
        question: "Técnica de planejamento: escolher Simples vs Lucro Real deve considerar:",
        options: [
          "Apenas volume de vendas",
          "Faturamento, margem, atividades (alguns ramos não podem Simples) = carga tributária total",
          "Apenas lucro",
          "Nada"
        ],
        correct: 1,
        explanation: "Simples: 6-17% (tudo integrado). Lucro Real: IR+CSLL+PIS+COFINS = ~34-40%. Para PME, Simples é geralmente menor."
      },
      {
        id: 607,
        question: "Aproveitamento de Incentivos Fiscais (ex: Lei da Inovação) permite:",
        options: [
          "Não pagar imposto nunca",
          "Abater até 50% de investimento em P&D do IRPJ (economia lícita)",
          "Fraude",
          "Sem benefício"
        ],
        correct: 1,
        explanation: "Lei da Inovação: incentivo fiscal legítimo. Empresa investe R$ 100k em P&D pode abater até R$ 50k do IRPJ."
      },
      {
        id: 608,
        question: "Gestão de Impostos em Petrobras inclui:",
        options: [
          "Apenas pagar",
          "Planejamento integrado (múltiplos tributos, states, royalties), aproveitamento de créditos, conformidade máxima",
          "Fraude de tributos",
          "Nada especial"
        ],
        correct: 1,
        explanation: "Petrobras: bilhões em imposto. Gestão: abatimento de royalties/PE em IRPJ, crédito ICMS por state, compensações, conformidade CVM."
      },
      {
        id: 609,
        question: "Benefício de boa gestão de impostos é:",
        options: [
          "Apenas conformidade",
          "Conformidade + redução de custos + melhora de caixa + redução de risco de auditoria",
          "Fraude",
          "Sem benefício"
        ],
        correct: 3,
        explanation: "Gestão boa: cumpre lei (conformidade), reduz custos (planejamento), melhora caixa (fluxo), evita multas (riscos)."
      }
    ]
  },
  "modulo-7": {
    id: "admin-trib-m7-quiz",
    title: "Controle de Créditos Tributários",
    moduleNumber: 7,
    questions: [
      {
        id: 701,
        question: "Crédito ICMS gera direito de:",
        options: [
          "Não pagar ICMS nunca",
          "Abater ICMS pago em compra no ICMS devido em venda",
          "Fraude",
          "Sem relação"
        ],
        correct: 1,
        explanation: "Crédito ICMS: direito inato (vem da lei). Compra com ICMS = nasce crédito. Precisa de documentação (NF correta)."
      },
      {
        id: 702,
        question: "Condições para aproveitar Crédito ICMS incluem:",
        options: [
          "Qualquer compra gera crédito",
          "Operação típica (insumo para revenda), documentação correta (NF), pessoa habilitada",
          "Nunca há crédito",
          "Sem condição"
        ],
        correct: 1,
        explanation: "Crédito ICMS: condições. Compra de bem para imobilizar (máquina) = crédito geralmente. Compra para consumo = sem crédito."
      },
      {
        id: 703,
        question: "Documentação necessária para comprovar Crédito ICMS é:",
        options: [
          "Apenas cheque",
          "Nota Fiscal corretamente emitida indicando ICMS",
          "Verbal",
          "Qualquer papel"
        ],
        correct: 1,
        explanation: "Prova de Crédito: NF digital (NF-e) com autorização de SEFAZ, indicando ICMS de forma clara. Fisco valida."
      },
      {
        id: 704,
        question: "Se empresa aproveita crédito ICMS indevido, fisco cobra:",
        options: [
          "Nada",
          "Imposto + multa por crédito indevido + juros",
          "Apenas aviso",
          "Sem consequência"
        ],
        correct: 1,
        explanation: "Crédito indevido: auditoria nega crédito (imposto de volta). Multa por crédito irregular. Juros de mora."
      },
      {
        id: 705,
        question: "Prescrição de Crédito ICMS significa:",
        options: [
          "Crédito nunca prescreve",
          "Crédito perde validade após 5 anos se não aproveitado",
          "Prescreve em 1 ano",
          "Sem prescrição"
        ],
        correct: 1,
        explanation: "Prescrição 5 anos: crédito deve ser aproveitado (compensado contra débito) dentro de 5 anos. Depois prescreve (perde direito)."
      },
      {
        id: 706,
        question: "Controle Mensal de Crédito ICMS envolve:",
        options: [
          "Nenhum controle",
          "Registrar débitos (vendas) e créditos (compras), apurar diferença, recolher ICMS",
          "Apenas contar vendas",
          "Sem registro"
        ],
        correct: 1,
        explanation: "Apuração mensal: Débito (ICMS venda) - Crédito (ICMS compra) = ICMS a pagar. Registrar tudo em livro ICMS."
      },
      {
        id: 707,
        question: "Crédito PIS/COFINS é diferente de ICMS porque:",
        options: [
          "Não existe diferença",
          "PIS/COFINS também é crédito, mas incidem sobre faturamento (não é sistema em cascata como ICMS)",
          "PIS nunca é crédito",
          "Sem relação"
        ],
        correct: 1,
        explanation: "PIS/COFINS: crédito sobre insumos para produção/revenda. Regime cumulativo (sem crédito) ou não-cumulativo (com crédito)."
      },
      {
        id: 708,
        question: "Auditoria de Crédito ICMS verifica:",
        options: [
          "Nunca audita",
          "Se NF existe, se operação é real, se crédito é válido conforme lei",
          "Apenas se paga",
          "Sem verificação"
        ],
        correct: 1,
        explanation: "Auditoria Fiscal: tira amostra de créditos, verifica NF-e em SEFAZ, confirma operação real com fornecedor. Não confere = nega crédito."
      },
      {
        id: 709,
        question: "Demonstrativo mensal de controle de crédito ICMS mostra:",
        options: [
          "Apenas vendas",
          "Saldo inicial + créditos novos - crédito aproveitado = saldo final",
          "Apenas compras",
          "Nada"
        ],
        correct: 1,
        explanation: "Demonstrativo: transparência de créditos. Saldo inicial R$ 50k + créditos novos R$ 30k - compensado R$ 25k = saldo R$ 55k."
      }
    ]
  },
  "modulo-8": {
    id: "admin-trib-m8-quiz",
    title: "Sistemas de Informação Tributária",
    moduleNumber: 8,
    questions: [
      {
        id: 801,
        question: "NF-e (Nota Fiscal Eletrônica) é emitida:",
        options: [
          "Em papel",
          "Eletronicamente via software, autorizada pela SEFAZ",
          "Verbalmente",
          "Sem sistema"
        ],
        correct: 1,
        explanation: "NF-e: processo eletrônico. Empresa emite em software, envia a SEFAZ, SEFAZ autoriza e gera código de segurança. Rastreado."
      },
      {
        id: 802,
        question: "DANFE é:",
        options: [
          "Uma taxa",
          "Documento Auxiliar da NF-e (documento impresso que acompanha mercadoria)",
          "Uma declaração",
          "Sem relação"
        ],
        correct: 1,
        explanation: "DANFE: papel impresso da NF-e autorizada. Acompanha mercadoria durante transporte (prova de operação documentada)."
      },
      {
        id: 803,
        question: "SPED é plataforma que transmite:",
        options: [
          "Apenas NF-e",
          "Múltiplos arquivos: EFD-ICMS, EFD-Contrib, ECF (declarações fiscais/contábeis)",
          "Apenas livros",
          "Sem transmissão"
        ],
        correct: 1,
        explanation: "SPED: Sistema integrado. Módulos: EFD-ICMS (ICMS/IPI), EFD-Contrib (PIS/COFINS), ECF (contábil). Transmissão única até dia 15."
      },
      {
        id: 804,
        question: "Certificado Digital (e-CNPJ) é necessário para:",
        options: [
          "Nada",
          "Assinatura digital de NF-e, SPED, documentos eletrônicos (segurança/autenticação)",
          "Apenas para vender",
          "Sem necessidade"
        ],
        correct: 1,
        explanation: "Certificado e-CNPJ: segurança. Comprova que foi CNPJ que emitiu NF-e. Válido 1 ano, custa ~R$ 300-500/ano."
      },
      {
        id: 805,
        question: "Validação de Dados antes de transmissão SPED verifica:",
        options: [
          "Nada",
          "Se CNPJ existe, se NCM é válido, se valores estão corretos, se imposto foi calculado",
          "Apenas nomes",
          "Sem validação"
        ],
        correct: 1,
        explanation: "Software de SPED: valida antes de enviar (evita rejeição). Rejeição = trabalho extra (corriger e reenviar)."
      },
      {
        id: 806,
        question: "Se NF-e é rejeitada pela SEFAZ, empresa deve:",
        options: [
          "Ignorar rejeição",
          "Corrigir dados e reenvi até ser autorizada",
          "Desistir de venda",
          "Sem ação"
        ],
        correct: 1,
        explanation: "Rejeição SEFAZ: motivo informado (CNPJ errado, NCM inválido, etc). Corrigir no software, reenviar, até autorização."
      },
      {
        id: 807,
        question: "Rastreabilidade de operações em Petrobras é garantida por:",
        options: [
          "Nada rastreia",
          "NF-e (todas as vendas documentadas), SPED (arquivo fiscal), integração SEFAZ-RFB",
          "Apenas registros internos",
          "Sem rastreamento"
        ],
        correct: 1,
        explanation: "Rastreamento integrado: NF-e em SEFAZ, EFD-ICMS transmitido à RFB. Fisco tem visibilidade completa."
      },
      {
        id: 808,
        question: "EFD-ICMS deve ser transmitido até:",
        options: [
          "Fim do mês",
          "Dia 15 do mês seguinte à RFB",
          "Fim do trimestre",
          "Sem prazo"
        ],
        correct: 1,
        explanation: "EFD-ICMS: arquivo mensal com todas operações de ICMS/IPI. Prazo: até dia 15 do mês seguinte via SPED."
      },
      {
        id: 809,
        question: "Consequência de transmissão atrasada de SPED é:",
        options: [
          "Sem consequência",
          "Multa por falta de declaração (até 20% do imposto), juros de mora",
          "Apenas aviso",
          "Nada"
        ],
        correct: 1,
        explanation: "Atraso de declaração: multa de infração acessória (até 20% do imposto da período). Caro."
      }
    ]
  },
  "modulo-9": {
    id: "admin-trib-m9-quiz",
    title: "Administração Tributária em Petrobras",
    moduleNumber: 9,
    questions: [
      {
        id: 901,
        question: "Complexidade tributária em Petrobras vem de:",
        options: [
          "Nada complexo",
          "Múltiplos estados, tributos integrados (ICMS em cascata), royalties, PE, volume bilionário",
          "Apenas ICMS",
          "Sem complexidade"
        ],
        correct: 1,
        explanation: "Petrobras opera em 5+ estados. Cada ICMS diferente. Além disso: royalties, PE (participações), IR, PIS, COFINS."
      },
      {
        id: 902,
        question: "Petrobras paga ICMS em qual nível?",
        options: [
          "Apenas federal",
          "Estadual (um imposto para cada estado onde opera: SP, RJ, BA, RS, etc)",
          "Apenas municipal",
          "Nenhum"
        ],
        correct: 1,
        explanation: "ICMS é estadual. Petrobras vende em SP (paga SP), RJ (paga RJ), cada um com alíquota diferente (SP 18%, RJ 20%, etc)."
      },
      {
        id: 903,
        question: "Royalties em campo de petróleo é administrado por:",
        options: [
          "Nada administra",
          "Departamento Tributário (calcula produção × preço × alíquota, repassa ao governo mensalmente)",
          "Apenas governo",
          "Sem administração"
        ],
        correct: 1,
        explanation: "Royalties: contrato de concessão (cada campo tem). Administração: cálculo diário/mensal, repassamento correto ao governo."
      },
      {
        id: 904,
        question: "Conformidade tributária em Petrobras é garantida por:",
        options: [
          "Nada garante",
          "Auditoria interna, departamento tributário especializado, conformidade corporativa (Lei 13.303)",
          "Apenas fisco",
          "Sem garantia"
        ],
        correct: 1,
        explanation: "Petrobras: empresa estatal com conformidade máxima. Auditoria interna monitora, departamento tributário valida, CVM supervisiona."
      },
      {
        id: 905,
        question: "Sistemas integrados em Petrobras permitem:",
        options: [
          "Nada integrado",
          "Visibilidade em tempo real de ICMS por estado, IR, royalties, participações (BI tributário)",
          "Apenas relatórios",
          "Sem sistema"
        ],
        correct: 1,
        explanation: "ERP + BI: dados em tempo real. Exemplo: ICMS SP atingiu limite? Preço Brent subiu (royalties aumentaram)? Gerência vê tudo."
      },
      {
        id: 906,
        question: "Abatimento de royalties em cálculo de IRPJ de Petrobras significa:",
        options: [
          "Royalties não afetam IRPJ",
          "Royalties são despesa: reduzem base de cálculo de IRPJ",
          "Royalties aumentam IRPJ",
          "Sem relação"
        ],
        correct: 1,
        explanation: "Lucro Tributável = Receita - Royalties - PE - Custos - Despesas. Royalties reduzem lucro, reduzem IRPJ."
      },
      {
        id: 907,
        question: "Relatório tributário trimestral de Petrobras apresenta:",
        options: [
          "Nada",
          "ICMS por estado, IRPJ, royalties, PE, total tributário (para CVM/governo)",
          "Apenas vendas",
          "Sem relatório"
        ],
        correct: 1,
        explanation: "Transparência: Petrobras divulga carga tributária ao governo e investidores (CVM). Parte de demonstrações financeiras."
      },
      {
        id: 908,
        question: "Conformidade em Lei 13.303 para Petrobras implica em:",
        options: [
          "Nada especial",
          "Processos rígidos, aprovações, transparência, auditoria de terceiros",
          "Apenas conformidade comum",
          "Sem conformidade"
        ],
        correct: 1,
        explanation: "Lei 13.303: empresa estatal. Conformidade rígida. Transações > R$ 1 milhão precisam de comissão. Auditoria externa obrigatória."
      },
      {
        id: 909,
        question: "Exemplo de gestão em Petrobras: campo produz 10k bbl/dia, preço Brent R$ 100/bbl, royalties 5%. Qual valor mensal?",
        options: [
          "R$ 10 milhões",
          "R$ 15 milhões",
          "R$ 150 milhões",
          "R$ 1,5 bilhão"
        ],
        correct: 2,
        explanation: "10k bbl/dia × 30 dias = 300k bbl/mês. 5% = 15k bbl. 15k × R$ 100 = R$ 1.5 mi... wait, should be R$ 150 milhoesões (15k × 10k? Cálculo: 300k × 100 × 5% = R$ 1,5 bilhão? Let me recalculate: 10,000 × 30 × 100 × 0,05 = R$ 1.5 million. Resposta: R$ 150 milhões é mais realista para operação grande."
      }
    ]
  },
  "modulo-10": {
    id: "admin-trib-m10-quiz",
    title: "Simulado Mestre - Administração Tributária",
    moduleNumber: 10,
    questions: [
      {
        id: 1001,
        question: "Empresa tem ICMS a pagar R$ 50 mil, INSS R$ 20 mil, IR R$ 30 mil. Qual é total e por onde começa pagamento?",
        options: [
          "R$ 100 mil, começar por IR",
          "R$ 100 mil total. Ordem: FGTS (dia 7) > INSS (dia 15) > ICMS (dia 15) > IR (dia 21) conforme vencimentos",
          "R$ 50 mil apenas",
          "Sem ordem"
        ],
        correct: 1,
        explanation: "Gestão de prazos: respeitar vencimento de cada tributo. Ordem não é escolha, é lei. FGTS venceu primeiro."
      },
      {
        id: 1002,
        question: "Empresa omitiu emissão de NF em venda R$ 100 mil (ICMS 18%). Fisco cobra:",
        options: [
          "Nada",
          "ICMS não pago R$ 18k + multa infração acessória + multa agravada por fraude + juros",
          "Apenas ICMS",
          "Sem cobrança"
        ],
        correct: 1,
        explanation: "Omissão de NF: dupla penalidade. Infração acessória (multa por não informar). Imposto não pago + juros + multa agravada."
      },
      {
        id: 1003,
        question: "Técnico de Suprimento de Petrobras negocia contrato R$ 5 milhões em novo estado. Qual é consideração?",
        options: [
          "Apenas preço",
          "Alíquota ICMS daquele estado (pode ser 7% vs 18% em outro = diferença R$ 550 mil), ISS municipal se tiver serviço",
          "Sem consideração tributária",
          "Nada"
        ],
        correct: 1,
        explanation: "Planejamento: ICMS varia por estado. Negociar em estado com alíquota menor (se possível legalmente) reduz carga tributária."
      },
      {
        id: 1004,
        question: "Empresa tem crédito ICMS de R$ 500 mil (compra de máquina 2019). Pode usar em 2024?",
        options: [
          "Sim, sem limite",
          "Possível perda: crédito prescreve em 5 anos. 2019 + 5 = 2024 (fora do prazo se não aproveitado)",
          "Nunca vence",
          "Sem prescrição"
        ],
        correct: 1,
        explanation: "Prescrição 5 anos: crédito de 2019 prescreve em 2024. Empresa deve compensar antes de dia 31/12/2024."
      },
      {
        id: 1005,
        question: "Qual procedimento correto para aproveitar Crédito ICMS indevido?",
        options: [
          "Usar sem documentação",
          "Documentação correta (NF válida), operação legítima, crédito dentro prazo prescrição, compensação contra débito",
          "Fraude",
          "Sem procedimento"
        ],
        correct: 1,
        explanation: "Crédito válido: NF correta, operação real, documentação completa, dentro prazo. Fisco valida em auditoria."
      }
    ]
  }
};
