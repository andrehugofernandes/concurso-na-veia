interface Quiz {
  id?: string;
  title: string;
  moduleNumber: number;
  questions: {
    id: number;
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  }[];
}

export const COMPRAS_QUIZZES: Record<string, Quiz> = {
  "modulo-1": {
    id: "compras-m1-quiz",
    title: "Fundamentos de Compras",
    moduleNumber: 1,
    questions: [
      {
        id: 101,
        question:
          "A função de compras é definida como a atividade responsável por adquirir materiais, equipamentos e serviços nas condições certas. Qual dos seguintes conceitos resume os objetivos centrais da área de compras?",
        options: [
          "Os 5 Certos: qualidade certa, quantidade certa, tempo certo, preço certo, fornecedor certo.",
          "Os 4 Ps do Marketing aplicados à logística: produto, preço, praça, promoção.",
          "Os 3 Ds da Administração: demanda, distribuição e desconto.",
          "Os 6 Cs da Negociação: custo, controle, compliance, critério, contrato, cadastro.",
          "Os 2 pilares do suprimento: compra direta e compra indireta.",
        ],
        correct: 0,
        explanation:
          "Os 5 Certos (ou 5Rs: Right quality, Right quantity, Right time, Right price, Right source) sintetizam o objetivo central da função de compras: garantir que o insumo adequado, na quantidade correta, esteja disponível no momento certo, pelo menor custo total, do fornecedor mais adequado. Esse framework é amplamente cobrado pela CESGRANRIO.",
      },
      {
        id: 102,
        question:
          "A evolução histórica da função de compras passou por três grandes fases. Qual alternativa descreve corretamente essa progressão?",
        options: [
          "Departamento de pedidos (passivo) → Compras estratégicas (ativo) → Supply management (integrado).",
          "Compras centralizadas → Compras descentralizadas → Compras terceirizadas.",
          "Almoxarifado → Logística → Transporte.",
          "Manual → Informatizado → Digital.",
          "Operacional → Tático → Burocrático.",
        ],
        correct: 0,
        explanation:
          "A função de compras evoluiu de um papel passivo (apenas emitir pedidos) para um papel estratégico (desenvolver fornecedores, negociar condições) e finalmente para supply management integrado (gestão total da cadeia de suprimentos, com foco em valor e relacionamento de longo prazo).",
      },
      {
        id: 103,
        question:
          "Em empresas industriais, qual é a relevância financeira típica da área de compras em relação ao faturamento?",
        options: [
          "Representa 5 a 10% do faturamento em custos de aquisição.",
          "Representa 40 a 70% do faturamento em custos de materiais adquiridos.",
          "Representa menos de 1% dos custos totais da empresa.",
          "Representa apenas os custos administrativos do departamento.",
          "Não tem impacto direto no faturamento.",
        ],
        correct: 1,
        explanation:
          "Em empresas industriais, o custo de materiais comprados representa tipicamente 40% a 70% do faturamento total. Por isso, a área de compras tem impacto direto e significativo na margem de lucro da empresa — uma redução de 5% nos custos de compras pode equivaler a um aumento de 20-35% no lucro operacional.",
      },
      {
        id: 104,
        question:
          "Na Petrobras, a área de Suprimentos é considerada estratégica. Qual argumento melhor justifica essa classificação?",
        options: [
          "Suprimentos é um centro de custo e não gera valor.",
          "Uma parada de plataforma por falta de peça pode gerar perdas superiores a US$ 1 milhão por dia, tornando compras crítica para a continuidade operacional.",
          "O departamento de suprimentos tem o maior número de funcionários da empresa.",
          "A legislação trabalhista exige que compras seja gerida estrategicamente.",
          "Suprimentos cuida apenas de materiais de escritório.",
        ],
        correct: 1,
        explanation:
          "Na Petrobras, uma única parada não planejada de plataforma offshore pode custar mais de US$ 1 milhão por dia em produção perdida. Portanto, garantir o fornecimento contínuo e confiável de peças, equipamentos e serviços é uma questão de continuidade de negócio, não apenas de custo — o que torna compras uma função estratégica crítica.",
      },
      {
        id: 105,
        question:
          "Qual é a principal diferença entre compras centralizadas e descentralizadas?",
        options: [
          "Compras centralizadas usam tecnologia e descentralizadas são manuais.",
          "Centralizadas oferecem economia de escala e maior poder de negociação; descentralizadas oferecem agilidade e adaptação local.",
          "Descentralizadas são mais baratas e por isso são preferíveis.",
          "Centralizadas operam apenas em empresas públicas.",
          "Não há diferença prática entre os dois modelos.",
        ],
        correct: 1,
        explanation:
          "Compras centralizadas consolidam volumes e ampliam poder de negociação, reduzindo preços via economia de escala — ideal para itens padronizados e de alto volume. Compras descentralizadas permitem que cada unidade negocie diretamente, com mais agilidade e aderência às necessidades locais — adequado para itens específicos ou emergências locais. A Petrobras adota modelo híbrido.",
      },
      {
        id: 106,
        question:
          "O conceito de 'compras reativas' é criticado na administração moderna porque:",
        options: [
          "Usa apenas fornecedores nacionais.",
          "Opera somente após surgimento da necessidade, sem planejamento, resultando em custos mais altos e menor poder de negociação.",
          "É exclusivamente digital, sem contato humano.",
          "Ignora o processo de cotação.",
          "É incompatível com sistemas ERP.",
        ],
        correct: 1,
        explanation:
          "Compras reativas (ou passivas) aguardam a solicitação emergencial antes de agir, resultando em menos tempo para negociar, menos opções de fornecedores, preços mais altos e risco de desabastecimento. O modelo moderno preconiza compras proativas e planejadas, alinhadas à demanda prevista — reduzindo urgências e melhorando condições comerciais.",
      },
    ],
  },

  "modulo-2": {
    id: "compras-m2-quiz",
    title: "Processo de Compras",
    moduleNumber: 2,
    questions: [
      {
        id: 201,
        question:
          "O ciclo do pedido é a sequência formal de etapas do processo de compras. Qual é a ordem correta das etapas iniciais?",
        options: [
          "Emissão do PO → Cotação → Requisição → Aprovação.",
          "Requisição interna → Aprovação → Definição de especificação → Pesquisa de fornecedores → Solicitação de cotação (RFQ).",
          "Pagamento → Recebimento → Pedido → Negociação.",
          "Auditoria → Compliance → Pagamento → Entrega.",
          "Contrato → Especificação → Pedido → Aprovação.",
        ],
        correct: 1,
        explanation:
          "O ciclo do pedido começa com a Requisição de Compra (RC) pela área solicitante, passa pela aprovação por alçada, depois pela definição técnica do item, pesquisa de fornecedores qualificados, e por fim pela emissão da RFQ (Request for Quotation). Essa sequência garante que o processo seja planejado e aprovado antes de qualquer comprometimento financeiro.",
      },
      {
        id: 202,
        question:
          "O que é uma Requisição de Compra (RC) no contexto do processo de compras?",
        options: [
          "Um contrato formal com o fornecedor.",
          "Um documento interno que autoriza o início do processo de compra, emitido pela área solicitante.",
          "Uma nota fiscal de entrada de mercadoria.",
          "Um relatório de desempenho de fornecedor.",
          "Um documento emitido pelo fornecedor para formalizar a oferta.",
        ],
        correct: 1,
        explanation:
          "A Requisição de Compra (RC) é o documento interno gerado pela área requisitante (estoque, manutenção, projetos) que formaliza a necessidade de aquisição. Ela contém a especificação do item, quantidade, prazo necessário e justificativa. Sem a RC aprovada, o processo de compras não pode ser iniciado formalmente.",
      },
      {
        id: 203,
        question:
          "O Purchase Order (PO) difere da RFQ porque:",
        options: [
          "A RFQ é um contrato e o PO é apenas uma consulta.",
          "O PO é o contrato formal de compra emitido ao fornecedor selecionado; a RFQ é uma solicitação de proposta enviada a múltiplos fornecedores.",
          "O PO é usado apenas para serviços; a RFQ apenas para materiais.",
          "Ambos têm o mesmo peso jurídico e são intercambiáveis.",
          "A RFQ substitui o PO em compras de alto valor.",
        ],
        correct: 1,
        explanation:
          "A RFQ (Request for Quotation) é enviada a múltiplos fornecedores para obter propostas — não há comprometimento financeiro ainda. Após análise e negociação, emite-se o PO (Purchase Order) para o fornecedor vencedor, formalizando o contrato de compra com valor, prazo, especificações e condições de entrega. O PO cria obrigação legal para ambas as partes.",
      },
      {
        id: 204,
        question:
          "O que significa 'aprovação por alçada' no processo de compras?",
        options: [
          "Todos os pedidos devem ser aprovados pelo CEO.",
          "Limites de valor definidos para cada nível hierárquico autorizarem compras, garantindo controle interno proporcional ao risco.",
          "Aprovação automática para compras abaixo de R$ 100.",
          "Processo de auditoria realizado após a compra.",
          "Aprovação exclusiva do departamento jurídico.",
        ],
        correct: 1,
        explanation:
          "Alçada de aprovação define quem pode autorizar compras de acordo com o valor envolvido: analista pode aprovar até R$ 10 mil, gerente até R$ 100 mil, diretor até R$ 1 milhão, etc. Esse controle garante que decisões de maior impacto financeiro sejam revisadas por níveis mais sênior, reduzindo risco de fraude e desperdício.",
      },
      {
        id: 205,
        question:
          "Lead time de compras é o tempo entre:",
        options: [
          "A emissão da nota fiscal e o pagamento.",
          "A emissão do pedido de compra (PO) e o recebimento físico do item pelo comprador.",
          "O início da negociação e a assinatura do contrato.",
          "A solicitação de cotação e a aprovação da alçada.",
          "O recebimento e o pagamento ao fornecedor.",
        ],
        correct: 1,
        explanation:
          "O lead time de compras engloba o tempo total desde a emissão do PO até o recebimento do item: inclui o tempo de processamento do pedido pelo fornecedor, fabricação ou separação, transporte, desembaraço aduaneiro (se importação) e inspeção de recebimento. É um dado crítico para o planejamento de estoque e evitar desabastecimento.",
      },
      {
        id: 206,
        question:
          "Qual etapa do ciclo do pedido garante que o item entregue atende às especificações contratadas?",
        options: [
          "Emissão do PO.",
          "Pesquisa de fornecedores.",
          "Inspeção no recebimento (conferência quantitativa e qualitativa).",
          "Solicitação de cotação (RFQ).",
          "Aprovação por alçada.",
        ],
        correct: 2,
        explanation:
          "O recebimento não é apenas ato físico de receber a mercadoria. Inclui conferência quantitativa (verificar se a quantidade está correta), qualitativa (verificar se atende às especificações técnicas e de qualidade), e documental (nota fiscal, certificados, laudos). Somente após aprovação no recebimento o item é dado entrada no estoque e o processo de pagamento é liberado.",
      },
    ],
  },

  "modulo-3": {
    id: "compras-m3-quiz",
    title: "Seleção de Fornecedores",
    moduleNumber: 3,
    questions: [
      {
        id: 301,
        question:
          "A homologação de fornecedores é um processo formal que antecede o primeiro pedido. Qual é seu objetivo principal?",
        options: [
          "Reduzir o preço de compra ao mínimo possível.",
          "Verificar e certificar que o fornecedor atende aos requisitos técnicos, financeiros, legais e de qualidade antes de ser incluído na base de fornecedores.",
          "Substituir fornecedores nacionais por internacionais.",
          "Automatizar o processo de cotação.",
          "Garantir exclusividade de fornecimento.",
        ],
        correct: 1,
        explanation:
          "A homologação (ou qualificação) de fornecedores avalia previamente se o candidato tem capacidade técnica (equipamentos, processos, certificações), saúde financeira (para cumprir contratos), conformidade legal (certidões, regularidade fiscal) e alinhamento com os padrões de qualidade do comprador. Somente fornecedores homologados podem receber pedidos.",
      },
      {
        id: 302,
        question:
          "O scorecard QPCD para avaliação periódica de fornecedores mensura quatro dimensões. Quais são elas?",
        options: [
          "Qualidade, Preço, Conteúdo Local, Distribuição.",
          "Quality (Qualidade), Price (Preço/Custo), Cost (Custo Total), Delivery (Entrega/Prazo).",
          "Quantidade, Produto, Cotação, Duração.",
          "Qualificação, Processo, Controle, Distribuição.",
          "Qualidade, Pontualidade, Capacidade, Documentação.",
        ],
        correct: 1,
        explanation:
          "O scorecard QPCD avalia os fornecedores em quatro dimensões: Quality (índice de conformidade dos produtos/serviços entregues), Price/Cost (aderência aos preços contratados e TCO), Delivery (cumprimento de prazos e quantidades). Essas métricas compõem um rating que determina a classificação do fornecedor e pode levá-lo a programas de desenvolvimento ou descredenciamento.",
      },
      {
        id: 303,
        question:
          "Qual é a diferença entre single source e sole source no contexto de sourcing?",
        options: [
          "São termos sinônimos e intercambiáveis.",
          "Single source é uma escolha estratégica do comprador (um único fornecedor por opção); sole source ocorre quando há apenas um fornecedor disponível no mercado.",
          "Single source é usado apenas para commodities; sole source para itens exclusivos.",
          "Sole source significa múltiplos fornecedores; single source significa nenhum.",
          "Single source é exclusivo para importações; sole source para compras nacionais.",
        ],
        correct: 1,
        explanation:
          "Single source é uma decisão estratégica: o comprador opta por trabalhar com um único fornecedor mesmo havendo outros disponíveis — para obter melhores condições, parceria mais profunda ou economias de escala. Sole source ocorre quando há monopolista no mercado, sem alternativas reais. O risco do single source é maior vulnerabilidade a interrupções de fornecimento.",
      },
      {
        id: 304,
        question:
          "A decisão 'Make or Buy' (Fazer ou Comprar) na gestão de suprimentos analisa:",
        options: [
          "Se a empresa deve fabricar o produto internamente ou terceirizar para um fornecedor externo.",
          "Se o fornecedor deve fabricar ou comprar de outro fornecedor.",
          "Se o pedido deve ser feito manualmente ou via sistema ERP.",
          "Se o pagamento será à vista ou a prazo.",
          "Se a compra será nacional ou internacional.",
        ],
        correct: 0,
        explanation:
          "A análise Make or Buy avalia se é mais vantajoso produzir internamente (make) ou adquirir externamente (buy). Fatores analisados: custo comparativo, capacidade produtiva disponível, competência central da empresa, confidencialidade tecnológica, flexibilidade e risco de dependência de fornecedor. Para a Petrobras, essa decisão é crítica em manutenção industrial.",
      },
      {
        id: 305,
        question:
          "O desenvolvimento de fornecedores envolve:",
        options: [
          "Substituir periodicamente todos os fornecedores da base.",
          "Apoio técnico, treinamentos e recursos para melhorar a capacidade do fornecedor e adequá-lo aos padrões do comprador.",
          "Oferecer preços mais altos para motivar o fornecedor.",
          "Apenas monitorar o scorecard sem intervir.",
          "Transferir tecnologia proprietária a todos os fornecedores.",
        ],
        correct: 1,
        explanation:
          "Desenvolvimento de fornecedores é um investimento do comprador para elevar a capacidade técnica, de qualidade e operacional do fornecedor. Inclui: missões técnicas, treinamentos, apoio em certificações (ISO, ASME), co-investimento em equipamentos, feedbacks estruturados. A Petrobras pratica extensamente, especialmente para garantir conteúdo local em equipamentos críticos de exploração.",
      },
      {
        id: 306,
        question:
          "Quais critérios são considerados na seleção de um novo fornecedor estratégico?",
        options: [
          "Apenas o menor preço cotado.",
          "Qualidade, capacidade técnica, saúde financeira, prazo de entrega, localização, certificações e histórico de conformidade.",
          "Somente certificações ISO.",
          "Apenas a localização geográfica próxima à empresa.",
          "Exclusivamente o volume de vendas anuais do fornecedor.",
        ],
        correct: 1,
        explanation:
          "A seleção de fornecedor estratégico vai muito além do preço. Avalia-se capacidade técnica (equipamentos, processos), saúde financeira (solvência, capacidade de investimento), qualidade (certifications, histórico de defeitos), logística (prazo de entrega, localização), e compliance (regularidade fiscal, trabalhista e ambiental). O conjunto desses critérios define o risco e o potencial de parceria.",
      },
    ],
  },

  "modulo-4": {
    id: "compras-m4-quiz",
    title: "Negociação com Fornecedores",
    moduleNumber: 4,
    questions: [
      {
        id: 401,
        question:
          "O conceito de BATNA (Best Alternative to a Negotiated Agreement) na negociação de compras refere-se a:",
        options: [
          "O melhor preço obtido na última cotação realizada.",
          "A melhor alternativa que o negociador tem caso a negociação atual falhe — define o poder de barganha.",
          "O contrato padrão utilizado como referência pelo departamento jurídico.",
          "A estratégia de ancoragem inicial na negociação.",
          "O limite máximo de desconto que o fornecedor pode oferecer.",
        ],
        correct: 1,
        explanation:
          "BATNA é sua 'saída de emergência': se a negociação não chegar a um acordo satisfatório, o que você fará? Ter um BATNA forte (ex: outro fornecedor qualificado pronto para assumir) aumenta seu poder de negociação porque você pode se retirar da mesa sem prejuízo. Um BATNA fraco (sem alternativa real) enfraquece sua posição negociadora. Conhecer o BATNA do fornecedor também é estratégico.",
      },
      {
        id: 402,
        question:
          "ZOPA (Zone of Possible Agreement) representa:",
        options: [
          "O preço mínimo aceitável pelo comprador.",
          "A faixa de valores dentro da qual tanto comprador quanto fornecedor aceitariam fechar acordo.",
          "A zona geográfica preferida para fornecimento.",
          "O prazo máximo de pagamento possível.",
          "O limite de desconto autorizado pelo gestor.",
        ],
        correct: 1,
        explanation:
          "ZOPA é a sobreposição entre o preço máximo que o comprador aceita pagar e o preço mínimo que o fornecedor aceita receber. Se o comprador aceita pagar até R$ 100 e o fornecedor aceita no mínimo R$ 80, a ZOPA é R$ 80-R$ 100. Se não há sobreposição, não há zona de acordo possível e a negociação não é viável naqueles termos.",
      },
      {
        id: 403,
        question:
          "A negociação distributiva diferencia-se da integrativa porque:",
        options: [
          "A distributiva é usada apenas para serviços; a integrativa para materiais.",
          "Na distributiva, o ganho de uma parte é perda da outra (soma zero); na integrativa, as partes criam valor conjunto buscando resultados mutuamente benéficos (ganha-ganha).",
          "A integrativa é mais rápida e eficiente.",
          "A distributiva é sempre preferível por maximizar o resultado do comprador.",
          "Não há diferença prática nas negociações empresariais.",
        ],
        correct: 1,
        explanation:
          "Na negociação distributiva (competitiva), os recursos são fixos — cada centavo que um ganha, o outro perde. Na integrativa (colaborativa), as partes exploram interesses mútuos para criar valor: o fornecedor pode aceitar preço menor em troca de volume maior, prazo de pagamento mais longo, exclusividade ou apoio técnico. A abordagem integrativa é preferida em relacionamentos de longo prazo.",
      },
      {
        id: 404,
        question:
          "O TCO (Total Cost of Ownership) é superior ao preço de compra como critério de decisão porque:",
        options: [
          "É mais simples de calcular.",
          "Considera todos os custos ao longo do ciclo de vida do item: preço, frete, impostos, instalação, manutenção, treinamento, consumo energético e descarte.",
          "Favorece sempre o fornecedor de menor preço.",
          "Elimina a necessidade de negociação.",
          "É exigido apenas em compras governamentais.",
        ],
        correct: 1,
        explanation:
          "Um equipamento com preço 20% menor pode ter TCO 40% maior se necessitar de manutenção mais frequente, consumir mais energia ou exigir peças de reposição caras. TCO = Preço de compra + Frete + Impostos + Instalação + Treinamento + Manutenção ao longo da vida útil + Custo de descarte. Nas negociações da Petrobras, o TCO é central para justificar escolhas de fornecedores não necessariamente mais baratos.",
      },
      {
        id: 405,
        question:
          "A técnica de ancoragem na negociação consiste em:",
        options: [
          "Aguardar o fornecedor fazer a primeira proposta sempre.",
          "Apresentar um número de referência inicial que influencia toda a negociação subsequente — quem ancora primeiro define o ponto de partida.",
          "Fixar o preço final sem aceitar contrapropostas.",
          "Usar silêncio como pressão psicológica.",
          "Apresentar múltiplas propostas simultaneamente.",
        ],
        correct: 1,
        explanation:
          "A ancoragem é um viés cognitivo poderoso: o primeiro número apresentado na negociação serve como referência e puxa o resultado final para si. Um comprador que ancora com R$ 80 em uma negociação tende a obter melhor resultado do que um que aguarda o fornecedor ancorar com R$ 120. Por isso, compradores experientes preparam ancoragem realista mas agressiva.",
      },
      {
        id: 406,
        question:
          "Em negociações multicritério, o preço deve ser considerado:",
        options: [
          "O único critério determinante na escolha do fornecedor.",
          "Um dos vários critérios negociáveis, ao lado de prazo de pagamento, prazo de entrega, garantia, qualidade, suporte técnico e condições de reajuste.",
          "Um critério secundário, menos importante que a localização.",
          "Variável apenas para compras de alto volume.",
          "Irrelevante quando há contrato de longo prazo.",
        ],
        correct: 1,
        explanation:
          "Negociação multicritério reconhece que o valor total de um fornecimento vai além do preço unitário. Negociar prazo de pagamento (dilação reduz custo financeiro), garantia estendida (reduz TCO), suporte técnico incluído (reduz custo operacional), prazo de entrega (reduz estoque de segurança) e reajuste contratual (previsibilidade financeira) pode gerar mais valor do que focar exclusivamente no preço.",
      },
    ],
  },

  "modulo-5": {
    id: "compras-m5-quiz",
    title: "Tipos de Compras",
    moduleNumber: 5,
    questions: [
      {
        id: 501,
        question:
          "A compra emergencial difere da compra programada principalmente porque:",
        options: [
          "A compra emergencial é sempre mais barata.",
          "A compra emergencial é realizada sem planejamento prévio, em situação urgente, geralmente resultando em custos mais altos, menos fornecedores consultados e menor poder de negociação.",
          "A compra programada não exige cotação.",
          "A compra emergencial usa sempre pagamento à vista.",
          "A compra programada é exclusiva para materiais de MRO.",
        ],
        correct: 1,
        explanation:
          "Compras emergenciais (ou de urgência) ocorrem quando o planejamento falhou ou houve consumo inesperado. Como o tempo é crítico, o comprador aceita pagar mais caro, consulta menos fornecedores e tem menor poder de negociação. Uma análise da Petrobras mostrou que compras emergenciais custam em média 20-40% a mais que compras programadas equivalentes.",
      },
      {
        id: 502,
        question:
          "Na compra por consignação, o pagamento ocorre:",
        options: [
          "Antecipadamente, antes da entrega do material.",
          "Apenas pelo que foi efetivamente consumido do estoque consignado — o fornecedor mantém propriedade do material até o consumo.",
          "Em 30 dias após a entrega total do lote.",
          "No ato da entrega, sem condições especiais.",
          "Através de troca por outros materiais.",
        ],
        correct: 1,
        explanation:
          "Consignação é um modelo em que o fornecedor entrega o material e o mantém em suas contas até o consumo pelo cliente. O comprador paga apenas pelo que usar — ideal para itens de consumo irregular ou peças de reposição de baixo giro. Reduz capital imobilizado em estoque mas exige controle rigoroso de consumo e inventário periódico do estoque consignado.",
      },
      {
        id: 503,
        question:
          "A compra spot é recomendada em qual situação?",
        options: [
          "Para todos os itens de alta criticidade e alto valor.",
          "Para aquisição pontual de commodities ou materiais com demanda irregular, sem comprometimento de longo prazo — aproveita condições favoráveis de mercado.",
          "Para itens com especificações técnicas complexas.",
          "Exclusivamente para serviços de manutenção.",
          "Para substituir contratos de longo prazo vigentes.",
        ],
        correct: 1,
        explanation:
          "Compra spot é transação única no mercado à vista — sem contrato de longo prazo. É indicada para commodities (onde o preço oscila e é possível aproveitar quedas) ou demandas esporádicas não justificam contrato. Desvantagens: sem garantia de fornecimento, sem preço fixo, maior esforço de compra a cada transação. Contratos de longo prazo garantem fornecimento mas perdem flexibilidade de preço.",
      },
      {
        id: 504,
        question:
          "O sistema Kanban aplicado à gestão de compras opera com base em qual princípio?",
        options: [
          "Compras são feitas em grandes lotes mensais programados.",
          "Sistema pull: o ressuprimento é disparado automaticamente quando o estoque atinge o ponto de reposição, garantindo reposição contínua sem excesso.",
          "Compras são realizadas apenas quando o estoque atinge zero.",
          "Sistema push: o fornecedor decide quando enviar o material.",
          "Compras são baseadas exclusivamente na previsão de demanda anual.",
        ],
        correct: 1,
        explanation:
          "Kanban de compras é um sistema pull visual: quando o estoque cai ao nível do ponto de reposição (PR), um sinal (cartão, eletrônico ou sensor) dispara automaticamente o pedido ao fornecedor. O PR é calculado para cobrir o lead time de reabastecimento com estoque de segurança. Elimina a necessidade de revisão periódica e reduz risco de stockout.",
      },
      {
        id: 505,
        question:
          "Acordos-quadro (master agreements) em compras corporativas são utilizados para:",
        options: [
          "Comprar itens de baixo valor sem processo formal.",
          "Estabelecer condições comerciais e contratuais previamente negociadas que permitem emitir pedidos futuros simplificados para múltiplas unidades ou ao longo do tempo.",
          "Substituir contratos individuais em compras emergenciais.",
          "Garantir exclusividade de fornecimento para um único produto.",
          "Terceirizar completamente a função de compras.",
        ],
        correct: 1,
        explanation:
          "Acordos-quadro (framework agreements) negociam previamente preços, condições de entrega, SLAs e termos contratuais, permitindo que pedidos subsequentes sejam emitidos de forma ágil sem reabrir negociação. São ideais para materiais de consumo frequente: a Petrobras usa para uniformes, combustíveis e serviços de manutenção recorrente em diversas instalações.",
      },
      {
        id: 506,
        question:
          "A compra empenhada (ou compra com empenho) é característica de:",
        options: [
          "Empresas privadas que usam desconto bancário.",
          "Setor público, onde o empenho é ato que reserva dotação orçamentária para a despesa, comprometendo o crédito antes do pagamento.",
          "Compras internacionais que exigem carta de crédito.",
          "Compras a prazo superior a 360 dias.",
          "Contratos com cláusula de reajuste automático.",
        ],
        correct: 1,
        explanation:
          "O empenho é instrumento da gestão pública: antes de qualquer contratação, deve haver dotação orçamentária e o empenho reserva esse recurso, garantindo que a despesa está coberta. É obrigatório na administração pública direta e indireta, incluindo empresas estatais que seguem a Lei 13.303 e regulamentos específicos de orçamento público.",
      },
    ],
  },

  "modulo-6": {
    id: "compras-m6-quiz",
    title: "Gestão de Contratos de Fornecimento",
    moduleNumber: 6,
    questions: [
      {
        id: 601,
        question:
          "O SLA (Service Level Agreement) em contratos de fornecimento define:",
        options: [
          "O preço mínimo garantido ao fornecedor.",
          "As métricas de desempenho contratadas — indicadores mensuráveis de qualidade, prazo e disponibilidade que o fornecedor se compromete a cumprir.",
          "O prazo de pagamento acordado entre as partes.",
          "A cláusula de rescisão unilateral do contrato.",
          "O índice de reajuste de preços aplicável.",
        ],
        correct: 1,
        explanation:
          "O SLA é o coração do contrato de serviço: define métricas como disponibilidade do sistema (99,9%), tempo de resposta a incidentes (4h), índice de qualidade mínimo (99,5% de conformidade), prazo de entrega (95% no prazo). Sem SLA claro, é impossível mensurar desempenho e aplicar penalidades. A Petrobras inclui SLAs rigorosos em contratos de manutenção e tecnologia.",
      },
      {
        id: 602,
        question:
          "Cláusulas de multa por atraso em contratos de fornecimento têm como objetivo:",
        options: [
          "Gerar receita adicional para o comprador.",
          "Criar incentivo financeiro para o fornecedor cumprir o prazo e compensar o comprador pelos danos causados pelo atraso.",
          "Substituir a necessidade de monitoramento do contrato.",
          "Penalizar o fornecedor pelo preço cotado.",
          "Servir apenas como elemento decorativo do contrato.",
        ],
        correct: 1,
        explanation:
          "Multas contratuais têm dupla função: compensatória (indenizar o comprador pelos prejuízos do atraso, como produção parada, aluguel de equipamento substituto) e pedagógica (criar incentivo financeiro para o fornecedor cumprir prazos). Tipicamente expressas como percentual por dia de atraso sobre o valor contratado, com teto máximo (ex: 0,5% ao dia, máximo 10%).",
      },
      {
        id: 603,
        question:
          "O reajuste de preços em contratos de longo prazo é necessário porque:",
        options: [
          "Permite ao fornecedor aumentar margens indefinidamente.",
          "Preserva o equilíbrio econômico-financeiro do contrato diante da inflação, usando índices setoriais como IPCA, IGP-M ou índices específicos do setor.",
          "É exigência legal para todos os contratos acima de R$ 10 mil.",
          "Substitui a negociação inicial de preços.",
          "Beneficia exclusivamente o comprador.",
        ],
        correct: 1,
        explanation:
          "Contratos de longo prazo (12+ meses) precisam de cláusula de reajuste para manter o equilíbrio: o preço fixo original perde valor com a inflação, tornando o contrato desvantajoso ao fornecedor e eventualmente levando a renegociações ou inadimplemento. Índices comuns: IPCA (inflação ao consumidor), IGP-M (inflação geral), ou índices setoriais específicos (aço, petróleo, mão de obra especializada).",
      },
      {
        id: 604,
        question:
          "A gestão ativa de contratos de fornecimento inclui:",
        options: [
          "Apenas arquivar o contrato assinado e aguardar o término do prazo.",
          "Monitorar KPIs de desempenho, realizar reuniões de review periódicas, aplicar penalidades quando cabível e registrar não-conformidades formalmente.",
          "Renegociar preços mensalmente.",
          "Substituir o fornecedor automaticamente em qualquer atraso.",
          "Terceirizar o monitoramento para auditores externos.",
        ],
        correct: 1,
        explanation:
          "Gestão ativa de contratos é uma prática madura: o comprador mantém dashboards de desempenho (scorecard), realiza reuniões mensais ou trimestrais com o fornecedor (QBR — Quarterly Business Review), registra formalmente não-conformidades, aplica SLAs e gatilhos de penalidade. Essa postura proativa previne deterioração do relacionamento e garante que o contrato entregue o valor esperado.",
      },
      {
        id: 605,
        question:
          "Um aditivo contratual é necessário quando:",
        options: [
          "O fornecedor muda de endereço.",
          "Há alteração de escopo, prazo, valor ou condições relevantes em relação ao contrato original, exigindo formalização por termo aditivo.",
          "O índice de reajuste automático é aplicado.",
          "O comprador troca o gestor responsável pelo contrato.",
          "O fornecedor solicita pagamento antecipado.",
        ],
        correct: 1,
        explanation:
          "O aditivo contratual formaliza mudanças substanciais ao contrato original: extensão de prazo (contrato vencendo mas serviço não concluído), alteração de escopo (inclui/exclui serviços), variação de valor acima do limite previsto em cláusula de variação, ou mudança de condições relevantes. Sem aditivo, alterações são informais e geram risco jurídico para ambas as partes.",
      },
      {
        id: 606,
        question:
          "Os componentes essenciais de um contrato de fornecimento são:",
        options: [
          "Apenas preço e prazo de entrega.",
          "Objeto, partes, preço, prazo, especificações, SLA, multas, reajuste, condições de rescisão e foro.",
          "Somente a proposta comercial e assinatura.",
          "Nome do fornecedor e número do PO.",
          "Apenas cláusulas de confidencialidade e rescisão.",
        ],
        correct: 1,
        explanation:
          "Um contrato de fornecimento robusto inclui: objeto claramente definido (o que está sendo contratado), partes identificadas, preço e condições de pagamento, prazo e condições de entrega, especificações técnicas, SLAs e critérios de aceite, multas e penalidades, cláusula de reajuste, condições de rescisão (amigável, por inadimplemento, por força maior) e foro de jurisdição.",
      },
    ],
  },

  "modulo-7": {
    id: "compras-m7-quiz",
    title: "Compras Eletrônicas e e-Procurement",
    moduleNumber: 7,
    questions: [
      {
        id: 701,
        question:
          "O leilão reverso (reverse auction) eletrônico é uma modalidade em que:",
        options: [
          "O comprador aumenta o preço progressivamente para atrair fornecedores.",
          "Fornecedores concorrem em tempo real reduzindo seus preços para vencer a disputa — o menor preço ganha.",
          "A empresa leiloa seus ativos para compradores externos.",
          "O preço é fixado pelo sistema eletronicamente sem negociação.",
          "Apenas um fornecedor pode participar por rodada.",
        ],
        correct: 1,
        explanation:
          "No leilão reverso, os papéis são invertidos em relação ao leilão tradicional: os fornecedores são os que 'licitam' (oferecem preços decrescentes) e o comprador é o 'comprador'. Realizado em plataforma online, em tempo real, com duração determinada. É altamente eficaz para commodities e serviços padronizados — a concorrência transparente pode reduzir preços em 10-30% em relação à cotação tradicional.",
      },
      {
        id: 702,
        question:
          "A sigla RFx no contexto de e-Procurement engloba três modalidades. Qual alternativa as descreve corretamente?",
        options: [
          "RFQ (cotação), RFO (oferta), RFD (distribuição).",
          "RFI (pedido de informação), RFQ (pedido de cotação), RFP (pedido de proposta).",
          "RFA (análise), RFB (base), RFC (compliance).",
          "RFQ (cotação), RFS (seleção), RFT (teste).",
          "RFI (implementação), RFQ (qualificação), RFP (pagamento).",
        ],
        correct: 1,
        explanation:
          "O RFx representa as três modalidades de solicitação formal: RFI (Request for Information) — busca informações sobre capacidade e disponibilidade de fornecedores, sem comprometimento de compra; RFQ (Request for Quotation) — solicita preços para especificações definidas; RFP (Request for Proposal) — solicita propostas completas (técnica + comercial) para soluções complexas. Cada um tem nível de detalhe e comprometimento diferente.",
      },
      {
        id: 703,
        question:
          "O EDI (Electronic Data Interchange) na cadeia de suprimentos permite:",
        options: [
          "Comunicação por e-mail entre compradores e fornecedores.",
          "Troca estruturada e automatizada de documentos (pedidos, notas fiscais, confirmações) entre sistemas de empresas diferentes, sem intervenção manual.",
          "Videoconferências para negociação remota.",
          "Acesso a catálogos digitais de fornecedores.",
          "Controle de acesso a sistemas de compras.",
        ],
        correct: 1,
        explanation:
          "EDI é a troca automatizada de documentos comerciais em formatos padronizados entre sistemas ERP de diferentes empresas — sem e-mail, sem impressão, sem digitação manual. Um PO emitido no SAP do comprador aparece automaticamente no sistema do fornecedor. Reduz erros de digitação, acelera processamento (horas vs. dias), diminui custo de transação e melhora visibilidade da cadeia.",
      },
      {
        id: 704,
        question:
          "O processo P2P (Procure-to-Pay) automatizado compreende:",
        options: [
          "Apenas o pagamento eletrônico ao fornecedor.",
          "Toda a cadeia desde a requisição interna até o pagamento ao fornecedor, passando por aprovações, cotação, PO, recebimento e conciliação financeira.",
          "O processo de prosperar novos fornecedores.",
          "Somente a etapa de cotação e emissão de pedido.",
          "O processo de auditoria de contratos encerrados.",
        ],
        correct: 1,
        explanation:
          "P2P (Procure-to-Pay) é a automação de ponta a ponta: da necessidade ao pagamento. Integra: sistema de requisição → aprovação automática por alçada → cotação eletrônica → PO no ERP → confirmação do fornecedor → recebimento com three-way matching (PO x Nota Fiscal x Recebimento) → pagamento automático. Elimina trabalho manual, reduz ciclo de 30 dias para 5-7 dias e aumenta compliance.",
      },
      {
        id: 705,
        question:
          "Quais são os principais benefícios do e-Procurement em relação ao processo tradicional de compras?",
        options: [
          "Apenas a redução de papel físico nos arquivos.",
          "Redução do ciclo de compras, maior transparência do processo, histórico de preços auditável, maior compliance, menos erros manuais e melhor controle de gastos.",
          "Eliminação da necessidade de negociação.",
          "Substituição completa dos compradores por automação.",
          "Redução exclusiva de custos de frete.",
        ],
        correct: 1,
        explanation:
          "e-Procurement transforma a função: reduz ciclo de compras em 50-70%, cria trilha de auditoria completa (quem fez o quê, quando), permite análise de gastos em tempo real (spend analytics), garante que os processos seguem as políticas (compliance automático), e gera base histórica de preços para benchmark. A Petrobras usa plataformas avançadas de e-Procurement com leilão reverso integrado.",
      },
      {
        id: 706,
        question:
          "O marketplace B2B no contexto de e-Procurement é:",
        options: [
          "Uma plataforma de vendas para consumidores finais.",
          "Um ambiente digital onde empresas compradoras acessam catálogos de múltiplos fornecedores qualificados, realizam pedidos e processam pagamentos de forma integrada.",
          "Um sistema exclusivo para licitações públicas.",
          "Uma ferramenta para análise de crédito de fornecedores.",
          "Um canal de comunicação entre departamentos internos.",
        ],
        correct: 1,
        explanation:
          "Marketplaces B2B (Business-to-Business) funcionam como 'Amazon corporativo': múltiplos fornecedores expõem catálogos com preços e disponibilidade, e compradores realizam pedidos diretamente, com processos de aprovação integrados ao ERP da empresa. Exemplos: Mercado Livre Business, Amazon Business, plataformas setoriais. Reduz custo de compras de low-value e agiliza processos de pequenas aquisições.",
      },
    ],
  },

  "modulo-8": {
    id: "compras-m8-quiz",
    title: "Ética e Compliance em Compras",
    moduleNumber: 8,
    questions: [
      {
        id: 801,
        question:
          "O conflito de interesse em compras ocorre quando:",
        options: [
          "O comprador discorda do preço proposto pelo fornecedor.",
          "O responsável pela decisão de compra tem interesse pessoal (financeiro, familiar ou afetivo) no resultado que pode comprometer sua imparcialidade.",
          "Dois fornecedores apresentam preços iguais.",
          "O departamento jurídico questiona cláusulas contratuais.",
          "O comprador negocia com fornecedor estrangeiro.",
        ],
        correct: 1,
        explanation:
          "Conflito de interesse em compras ocorre quando o decisor tem relação pessoal que pode influenciar sua objetividade: familiar que é sócio do fornecedor, participação societária em empresa fornecedora, amizade que leva a favorecer um concorrente. O correto é declarar o conflito e se recusar do processo. A falta de disclosure é uma das principais causas de corrupção corporativa em compras.",
      },
      {
        id: 802,
        question:
          "A Lei 12.846/2013 (Lei Anticorrupção brasileira) impacta diretamente compras corporativas porque:",
        options: [
          "Proíbe qualquer negociação com fornecedores estrangeiros.",
          "Responsabiliza objetivamente a empresa por atos corruptos praticados em seu benefício por seus agentes — mesmo que a empresa alegue desconhecimento.",
          "Obriga empresas a realizar apenas licitações públicas.",
          "Exige que todos os contratos sejam revisados pelo TCU.",
          "Aplica-se somente a empresas públicas.",
        ],
        correct: 1,
        explanation:
          "A responsabilidade objetiva da Lei 12.846/2013 é revolucionária: basta que um agente da empresa pratique ato corrupto (pagar propina para obter contrato, manipular licitação) para que a empresa seja penalizada — independentemente de dolo ou culpa da diretoria. Multas de até 20% do faturamento e proibição de contratar com governo. Empresas sérias criam programas de integridade robustos em compras para mitigar esse risco.",
      },
      {
        id: 803,
        question:
          "A due diligence de fornecedor em compliance de compras inclui verificar:",
        options: [
          "Apenas o CNPJ ativo na Receita Federal.",
          "Antecedentes de corrupção, sanções nacionais e internacionais, presença em listas de PEPs (Pessoas Expostas Politicamente), histórico de processos e reputação no mercado.",
          "Somente o balanço financeiro dos últimos 3 anos.",
          "A data de fundação e o número de funcionários.",
          "Exclusivamente certificações de qualidade ISO.",
        ],
        correct: 1,
        explanation:
          "Due diligence em compliance vai além da qualificação técnica: verifica se o fornecedor ou seus sócios figuram em listas de sanções (OFAC, ONU), se há histórico de corrupção (FCPA, Lei Anticorrupção), se há PEPs (políticos ou familiares) com participação societária (risco de tráfico de influência), e processos judiciais relevantes. Contratar fornecedor com problemas de compliance gera risco reputacional e legal para o comprador.",
      },
      {
        id: 804,
        question:
          "O FCPA (Foreign Corrupt Practices Act) impacta empresas brasileiras quando:",
        options: [
          "Apenas quando a empresa negocia com órgãos públicos americanos.",
          "Quando a empresa tem ações listadas em bolsas americanas (ADR), filiais nos EUA ou realiza transações em dólar pelo sistema financeiro americano.",
          "Exclusivamente quando importa produtos dos Estados Unidos.",
          "Somente quando tem parceiros americanos.",
          "O FCPA não se aplica a empresas brasileiras.",
        ],
        correct: 1,
        explanation:
          "O FCPA tem alcance extraterritorial: aplica-se a qualquer empresa com ADRs na NYSE/NASDAQ, subsidiárias americanas, ou que transacione em dólar através de bancos americanos. Como a Petrobras tem ADRs listados e operações internacionais, está sujeita ao FCPA. Violações (pagar propina a funcionários públicos estrangeiros) resultam em multas bilionárias e processos criminais nos EUA.",
      },
      {
        id: 805,
        question:
          "O Código de Conduta do Fornecedor é uma ferramenta de compliance que:",
        options: [
          "Estabelece apenas as especificações técnicas dos produtos adquiridos.",
          "Define os padrões éticos, ambientais, trabalhistas e de integridade que o fornecedor deve cumprir como condição para manter o relacionamento comercial.",
          "Substitui o contrato formal de fornecimento.",
          "É exigido apenas para fornecedores internacionais.",
          "Refere-se exclusivamente ao comportamento dos compradores internos.",
        ],
        correct: 1,
        explanation:
          "O Código de Conduta do Fornecedor é um documento contratual que estende as obrigações éticas da empresa compradora para sua cadeia de suprimentos. Cobre: proibição de trabalho infantil/escravo, práticas anticorrupção, respeito ao meio ambiente, conformidade trabalhista, proteção de dados. O fornecedor assina como anexo ao contrato e pode ser auditado. É pilar do ESG na cadeia de suprimentos.",
      },
      {
        id: 806,
        question:
          "Sinais de alerta de comportamento antiético em compras incluem:",
        options: [
          "Fornecedor solicitar prazo adicional para entrega.",
          "Comprador preferir sempre um único fornecedor sem justificativa técnica, recusar comparação de propostas ou fracionar pedidos para fugir de alçadas de aprovação.",
          "Fornecedor oferecer condições melhores que os concorrentes.",
          "Comprador negociar desconto adicional após primeira proposta.",
          "Fornecedor enviar proposta fora do prazo estipulado.",
        ],
        correct: 1,
        explanation:
          "Red flags de comportamento antiético incluem: direcionamento injustificado a fornecedor específico (favorecimento), fracionamento de pedidos para evitar alçadas (burla de controles), ausência de registro formal de cotações (falta de transparência), urgências criadas artificialmente (que eliminam comparação), e recusa em seguir processos padrão de compliance. Programas de canal de denúncia devem ser acessíveis para qualquer colaborador reportar suspeitas.",
      },
    ],
  },

  "modulo-9": {
    id: "compras-m9-quiz",
    title: "Compras na Petrobras",
    moduleNumber: 9,
    questions: [
      {
        id: 901,
        question:
          "O RLCP (Regulamento de Licitações e Contratações da Petrobras) determina que:",
        options: [
          "Todas as compras devem ser realizadas exclusivamente por licitação pública aberta.",
          "Contratações acima de determinados pisos de valor devem seguir processo competitivo formal, garantindo transparência, isonomia e economicidade.",
          "A Petrobras pode contratar diretamente qualquer fornecedor sem processo competitivo.",
          "Somente fornecedores brasileiros podem participar de licitações.",
          "O processo de compras deve ser auditado mensalmente pelo TCU.",
        ],
        correct: 1,
        explanation:
          "O RLCP (Regulamento de Licitações e Contratações da Petrobras) é o instrumento normativo interno que, baseado na Lei 13.303/2016, define as regras para contratações: modalidades (convite, tomada de preços, concorrência), limites de valor para dispensa, critérios de habilitação, julgamento de propostas e gestão contratual. Garante que o processo seja competitivo, transparente e alinhado à governança corporativa.",
      },
      {
        id: 902,
        question:
          "O CADERMP (Cadastro de Fornecedores da Petrobras) é:",
        options: [
          "Um catálogo de preços de referência para compras internas.",
          "O cadastro oficial de fornecedores qualificados da Petrobras — pré-requisito para participação em licitações e recebimento de pedidos de compra.",
          "Um sistema de pagamento automático a fornecedores.",
          "Um banco de dados de materiais e especificações técnicas.",
          "O sistema de controle de estoque dos almoxarifados.",
        ],
        correct: 1,
        explanation:
          "O CADERMP é o registro central de fornecedores qualificados pela Petrobras. Para ser cadastrado, o fornecedor passa por processo de habilitação técnica, jurídica e financeira. Somente fornecedores ativos no CADERMP podem receber convites para licitações. O cadastro inclui avaliações periódicas de desempenho e pode ser suspenso por não-conformidades.",
      },
      {
        id: 903,
        question:
          "A obrigação de Conteúdo Local (CL) nas contratações da Petrobras decorre de:",
        options: [
          "Política interna voluntária da empresa.",
          "Regulamentação da ANP (Agência Nacional do Petróleo) que exige percentual mínimo de fornecedores e bens nacionais nos contratos de exploração e produção.",
          "Acordo voluntário com sindicatos de trabalhadores.",
          "Norma internacional da ISO para empresas de energia.",
          "Exigência exclusiva do Ministério das Finanças.",
        ],
        correct: 1,
        explanation:
          "Conteúdo Local é regulamentação da ANP: nas concessões de exploração e produção de petróleo, as empresas (incluindo Petrobras) devem garantir percentuais mínimos de bens, serviços e mão de obra nacionais. Essa exigência visa desenvolver a indústria nacional e foi estabelecida após a abertura do setor petrolífero nos anos 1990. Descumprimento gera multas e pode impactar renovação das concessões.",
      },
      {
        id: 904,
        question:
          "O SAP MM (Materials Management) é utilizado pela Petrobras para:",
        options: [
          "Gerenciar apenas o RH e folha de pagamento.",
          "Executar e controlar o ciclo completo de compras: requisições, cotações, pedidos de compra, recebimento de materiais e verificação de faturas.",
          "Somente controlar o estoque físico dos almoxarifados.",
          "Gerenciar apenas contratos de serviços externos.",
          "Processar exclusivamente pagamentos internacionais.",
        ],
        correct: 1,
        explanation:
          "O SAP MM é o módulo de gestão de materiais do ERP SAP, utilizado pela Petrobras para integrar toda a cadeia de compras: desde a criação da requisição de material, passando pela cotação (RFQ), emissão do PO, rastreamento da entrega, recebimento físico e verificação da nota fiscal para liberação do pagamento (three-way matching: PO x GR x NF). É a espinha dorsal digital da área de Suprimentos.",
      },
      {
        id: 905,
        question:
          "As parcerias de longo prazo (contratos plurianuais) com fornecedores estratégicos na Petrobras são motivadas por:",
        options: [
          "Redução do trabalho administrativo do departamento de compras.",
          "Garantia de fornecimento contínuo e confiável para itens críticos, desenvolvimento conjunto de soluções, estabilidade de preços e aprofundamento da relação técnica.",
          "Obrigação legal de contratar fornecedores nacionais por longos períodos.",
          "Eliminação da necessidade de processo competitivo.",
          "Redução exclusiva de custos de transporte.",
        ],
        correct: 1,
        explanation:
          "Contratos plurianuais com fornecedores estratégicos trazem: segurança de fornecimento (especialmente para equipamentos com longo lead time, como turbinas e válvulas offshore), preços estabilizados por períodos definidos, co-desenvolvimento de inovações e adaptações técnicas, e economias de escala. Em troca, o fornecedor tem previsibilidade de receita para investir em capacidade produtiva.",
      },
      {
        id: 906,
        question:
          "A Política de Responsabilidade Social da Petrobras no contexto de compras exige que:",
        options: [
          "Todos os fornecedores sejam cooperativas sociais.",
          "Fornecedores demonstrem compromisso com práticas trabalhistas dignas, respeito ao meio ambiente e vedação ao trabalho análogo à escravidão ou infantil, como condição para manutenção no CADERMP.",
          "A empresa dê preferência a fornecedores menores independentemente do preço.",
          "Contratos incluam cláusulas de doação a entidades beneficentes.",
          "Fornecedores locais sejam sempre priorizados mesmo com qualidade inferior.",
        ],
        correct: 1,
        explanation:
          "A Petrobras, como signatária do Pacto Global da ONU e com compromissos ESG públicos, exige que sua cadeia de fornecimento esteja em conformidade com práticas de trabalho decente (sem trabalho infantil ou análogo à escravidão), respeito ambiental e responsabilidade social. O descumprimento é causa de exclusão do CADERMP e rescisão contratual. Auditorias socioambientais em fornecedores de alto risco são realizadas periodicamente.",
      },
    ],
  },

  "modulo-10": {
    id: "compras-m10-quiz",
    title: "Simulado Mestre",
    moduleNumber: 10,
    questions: [
      {
        id: 1001,
        question:
          "Um Técnico de Suprimento da Petrobras recebe uma requisição emergencial para aquisição de uma válvula crítica de segurança para uma plataforma offshore. O processo padrão levaria 30 dias, mas a parada de produção está gerando prejuízo de R$ 2 milhões/dia. O técnico deve:",
        options: [
          "Aguardar o processo padrão de 30 dias para garantir compliance total.",
          "Acionar o procedimento de compra emergencial previsto no RLCP, que permite processo simplificado com prazo reduzido, documentando e justificando formalmente a urgência.",
          "Comprar diretamente do fornecedor sem qualquer documentação para agilizar.",
          "Transferir a responsabilidade para o fornecedor resolver.",
          "Cancelar a requisição e utilizar equipamento substituto sem análise técnica.",
        ],
        correct: 1,
        explanation:
          "O RLCP prevê procedimentos de compra emergencial com processo simplificado — menos fornecedores consultados, prazo de cotação reduzido, aprovação em circuito acelerado — mas ainda com documentação formal da urgência, justificativa técnica e econômica (prejuízo por parada), e registro de todas as etapas para auditoria posterior. O compliance não é eliminado na emergência; é adaptado.",
      },
      {
        id: 1002,
        question:
          "Durante análise de propostas para um contrato de manutenção de plataformas, o Técnico de Suprimentos identifica que o Fornecedor A tem preço 15% menor que o Fornecedor B, mas tem histórico de atrasos e baixo índice no scorecard QPCD. Qual análise é mais adequada?",
        options: [
          "Escolher o Fornecedor A por ser mais barato, atendendo ao objetivo de redução de custos.",
          "Calcular o TCO de ambos, considerando custos de atrasos (multas, produção parada, mobilização emergencial) e os riscos operacionais, antes de tomar a decisão.",
          "Escolher o Fornecedor B sem análise adicional.",
          "Solicitar que o Fornecedor A melhore seu scorecard antes de qualquer decisão.",
          "Desconsiderar o histórico e focar apenas no preço atual.",
        ],
        correct: 1,
        explanation:
          "A análise de TCO é fundamental: atrasos em manutenção de plataforma offshore podem custar US$ 1M+/dia. Se o Fornecedor A tem histórico de 3 dias de atraso por evento, apenas 2 ocorrências anuais podem superar em muito a economia de 15% no preço. O scorecard QPCD deve ser quantificado em valor financeiro para uma decisão informada. A CESGRANRIO cobra esse raciocínio de custo total.",
      },
      {
        id: 1003,
        question:
          "A Petrobras está contratando fornecimento de catalisadores para uma refinaria por 3 anos. Qual cláusula contratual é INDISPENSÁVEL dado o contexto inflacionário?",
        options: [
          "Cláusula de exclusividade do fornecedor.",
          "Cláusula de reajuste indexada a índice setorial adequado (ex: variação de preço do produto petroquímico base ou IGP-M), com periodicidade e fórmula de cálculo definidas.",
          "Cláusula de pagamento antecipado integral.",
          "Cláusula de transferência de tecnologia obrigatória.",
          "Cláusula de rescisão imotivada sem ônus.",
        ],
        correct: 1,
        explanation:
          "Em contratos plurianuais, a ausência de cláusula de reajuste desequilibra economicamente o contrato ao longo do tempo: o fornecedor não consegue honrar o preço original frente à inflação de insumos, levando a renegociações forçadas, inadimplemento ou deterioração da qualidade. O reajuste por índice setorial específico (não apenas IPCA geral) é mais preciso porque reflete a variação de custo do setor do fornecedor.",
      },
      {
        id: 1004,
        question:
          "Um fornecedor convida o comprador da Petrobras para um jantar de confraternização em restaurante de luxo. Segundo as diretrizes de ética e compliance, o correto é:",
        options: [
          "Aceitar, pois é uma prática comum de relacionamento comercial.",
          "Verificar a política de brindes e cortesias da Petrobras — se o valor superar o limite permitido ou se criar situação de conflito de interesse, deve recusar e registrar o ocorrido no canal apropriado.",
          "Aceitar apenas se o jantar não ocorrer durante processo de licitação.",
          "Informar o fornecedor que pode aceitar somente brindes em dinheiro.",
          "Aceitar e não informar à empresa, pois é pessoal.",
        ],
        correct: 1,
        explanation:
          "Políticas de brindes e hospitalidade (gifts & entertainment policy) estabelecem limites claros: a Petrobras define valor máximo para presentes, proíbe cortesias durante processos competitivos ativos e exige registro/aprovação superior para hospitalidade acima de limites. O objetivo é prevenir que o relacionamento comercial crie compromisso moral que possa influenciar decisões de compra — caracterizando vantagem indevida.",
      },
      {
        id: 1005,
        question:
          "Na implementação de um sistema de e-Procurement com leilão reverso, qual material é MAIS adequado para essa modalidade?",
        options: [
          "Consultoria estratégica altamente especializada.",
          "Commodities e materiais padronizados com especificação técnica clara, onde o preço é o principal diferenciador entre fornecedores qualificados.",
          "Equipamentos críticos únicos com especificação proprietária.",
          "Serviços que requerem avaliação subjetiva de qualidade.",
          "Materiais com apenas um fornecedor no mercado.",
        ],
        correct: 1,
        explanation:
          "Leilão reverso funciona melhor quando: a especificação é objetiva e padronizada (todos os fornecedores ofertam exatamente o mesmo), há múltiplos fornecedores qualificados em competição real, e preço é o principal critério de decisão. Para serviços complexos, consultoria ou materiais únicos, o leilão reverso é inadequado pois reduz tudo a preço, sacrificando qualidade, inovação e relacionamento técnico.",
      },
      {
        id: 1006,
        question:
          "O processo de compras da Petrobras para contratação de serviços técnicos especializados acima dos pisos do RLCP deve obrigatoriamente incluir:",
        options: [
          "Apenas a aprovação do diretor de área.",
          "Edital de licitação com especificações claras, prazo para propostas, critérios de habilitação e julgamento, análise técnica e comercial das propostas, e homologação do resultado.",
          "Aprovação exclusiva do jurídico sem necessidade de análise técnica.",
          "Contratação direta do fornecedor de menor preço histórico.",
          "Autorização da ANP para qualquer contratação acima de R$ 1 milhão.",
        ],
        correct: 1,
        explanation:
          "A Lei 13.303/2016 e o RLCP estabelecem processo competitivo formal para contratações acima dos limiares: edital claro com objeto, qualificações exigidas, critério de julgamento (menor preço, melhor técnica, técnica e preço), prazo para recebimento de propostas, comissão de análise, julgamento fundamentado e homologação. Todo o processo deve ser documentado para auditoria interna e externa (auditores independentes, CGU, TCU para contratos sensíveis).",
      },
    ],
  },
};
