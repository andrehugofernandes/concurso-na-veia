export const QUIZ_MODULES: Record<number, any[]> = {
  1: [
    {
      question: "Sobre o conceito de Cadeia de Suprimentos (Supply Chain), é correto afirmar que:",
      options: [
        "A) Limita-se ao transporte físico e armazenagem de produtos acabados.",
        "B) Envolve a coordenação e integração de todos os fluxos (materiais, financeiros e de informações) desde a extração da matéria-prima até o consumidor final.",
        "C) É sinônimo de Logística Inbound, focando apenas na relação empresa-fornecedor.",
        "D) Aplica-se exclusivamente às empresas industriais, excluindo o setor de serviços.",
        "E) Consiste na automação de processos produtivos sem envolver parceiros externos."
      ],
      correctAnswer: "B) Envolve a coordenação e integração de todos os fluxos (materiais, financeiros e de informações) desde a extração da matéria-prima até o consumidor final.",
      explanation: "A Cadeia de Suprimentos é mais abrangente que a logística tradicional, envolvendo a coordenação de fluxos de ponta a ponta (fornecedores de fornecedores até os clientes dos clientes)."
    },
    {
      question: "Qual das alternativas melhor descreve o principal objetivo estratégico da Gestão da Cadeia de Suprimentos?",
      options: [
        "A) Reduzir os estoques a zero em todas as etapas da cadeia.",
        "B) Maximizar o valor total gerado, otimizando o equilíbrio entre o custo da cadeia e o nível de serviço oferecido ao cliente.",
        "C) Garantir que todos os fornecedores operem no mesmo país para reduzir o tempo de trânsito.",
        "D) Terceirizar completamente todas as operações produtivas.",
        "E) Eliminar o fluxo de informações, focando apenas na movimentação de bens físicos."
      ],
      correctAnswer: "B) Maximizar o valor total gerado, otimizando o equilíbrio entre o custo da cadeia e o nível de serviço oferecido ao cliente.",
      explanation: "O objetivo da SCM é maximizar o superávit da cadeia de suprimentos, garantindo o melhor serviço com o menor custo total possível através da colaboração."
    }
  ],
  2: [
    {
      question: "O processo que envolve o recebimento, o controle, a movimentação interna e o armazenamento de mercadorias que chegam à empresa é conhecido como:",
      options: [
        "A) Logística Outbound.",
        "B) Logística Inbound (ou Logística de Suprimentos).",
        "C) Logística Reversa.",
        "D) Distribuição Física.",
        "E) E-procurement."
      ],
      correctAnswer: "B) Logística Inbound (ou Logística de Suprimentos).",
      explanation: "A Logística Inbound cuida do fluxo de materiais que entram na empresa (dos fornecedores para a organização)."
    }
  ],
  3: [
    {
      question: "O Cross-docking é uma técnica operacional utilizada em centros de distribuição e armazéns. Sua principal característica é:",
      options: [
        "A) O armazenamento prolongado de produtos de baixa rotatividade.",
        "B) A transferência direta dos produtos do veículo de recebimento para o veículo de expedição, minimizando ou eliminando o tempo de estocagem.",
        "C) A inspeção detalhada de qualidade que retém os produtos no armazém por vários dias.",
        "D) O processo exclusivo de devolução de produtos defeituosos aos fornecedores.",
        "E) O agrupamento de mercadorias no estoque de longo prazo para garantir especulação de preços."
      ],
      correctAnswer: "B) A transferência direta dos produtos do veículo de recebimento para o veículo de expedição, minimizando ou eliminando o tempo de estocagem.",
      explanation: "Cross-docking elimina a armazenagem; as docas de recebimento e expedição são operadas sincronizadamente."
    }
  ],
  4: [
    {
      question: "O modal de transporte rodoviário, muito utilizado no Brasil, apresenta como principal vantagem competitiva em relação aos demais modais:",
      options: [
        "A) A capacidade de transportar volumes massivos (como granéis líquidos) com o menor custo fixo e variável.",
        "B) A flexibilidade de rota, possibilitando a entrega porta a porta com facilidade.",
        "C) A alta eficiência energética e o baixo impacto ambiental em longas distâncias.",
        "D) A completa imunidade a roubos de carga e variações climáticas.",
        "E) Ser a opção mais rápida para transações intercontinentais."
      ],
      correctAnswer: "B) A flexibilidade de rota, possibilitando a entrega porta a porta com facilidade.",
      explanation: "O modal rodoviário destaca-se pela agilidade e serviço porta a porta, apesar dos maiores custos variáveis em longas distâncias."
    }
  ],
  5: [
    {
      question: "O processo de retorno de produtos, embalagens ou materiais, desde o ponto de consumo até o ponto de origem, com o objetivo de recuperar valor ou dar uma disposição adequada, é chamado de:",
      options: [
        "A) Logística Integrada.",
        "B) Supply Chain Management.",
        "C) Logística Reversa.",
        "D) Just-in-Time.",
        "E) E-commerce."
      ],
      correctAnswer: "C) Logística Reversa.",
      explanation: "A Política Nacional de Resíduos Sólidos impulsionou a Logística Reversa, fundamental para tratar pós-consumo e pós-venda."
    }
  ],
  6: [
    {
      question: "Os custos associados à obsolescência, deterioração e custo de oportunidade do capital empatado referem-se principalmente aos:",
      options: [
        "A) Custos de pedido.",
        "B) Custos de transporte.",
        "C) Custos de armazenagem ou manutenção de estoques.",
        "D) Custos de falta de estoque (stockout).",
        "E) Custos tributários da folha de pagamento."
      ],
      correctAnswer: "C) Custos de armazenagem ou manutenção de estoques.",
      explanation: "Manter produtos parados no armazém gera o chamado custo de posse ou manutenção do estoque, que inclui o custo do capital investido."
    }
  ],
  7: [
    {
      question: "Um sistema de gestão que controla e otimiza as operações de um armazém, desde o recebimento até a expedição, direcionando a movimentação e rastreando os locais físicos, é denominado:",
      options: [
        "A) ERP (Enterprise Resource Planning).",
        "B) CRM (Customer Relationship Management).",
        "C) WMS (Warehouse Management System).",
        "D) MRP (Material Requirements Planning).",
        "E) TMS (Transportation Management System)."
      ],
      correctAnswer: "C) WMS (Warehouse Management System).",
      explanation: "O WMS é o Sistema de Gerenciamento de Armazém, essencial para controlar endereçamentos, picking e inventários rotativos."
    }
  ],
  8: [
    {
      question: "Sobre a diferença entre ERP, WMS e TMS na logística de suprimentos, é correto afirmar:",
      options: [
        "A) O WMS cuida da emissão de notas fiscais, o TMS da contabilidade e o ERP foca exclusivamente na roteirização de caminhões.",
        "B) O ERP integra os dados globais da empresa, o WMS gerencia o fluxo de mercadorias dentro do armazém e o TMS otimiza o transporte e o frete.",
        "C) O TMS é utilizado para desenhar produtos 3D, enquanto o WMS cuida da folha de pagamento.",
        "D) Todos os três sistemas têm a mesma função, diferindo apenas na linguagem de programação utilizada.",
        "E) O ERP substitui a necessidade do TMS, mas o WMS não pode se integrar a ele."
      ],
      correctAnswer: "B) O ERP integra os dados globais da empresa, o WMS gerencia o fluxo de mercadorias dentro do armazém e o TMS otimiza o transporte e o frete.",
      explanation: "Esta é a definição clássica dos três principais sistemas que orbitam a Supply Chain."
    }
  ],
  9: [
    {
      question: "No contexto de suprimentos e estoques, o 'Estoque de Segurança' (ou Estoque Isolador) tem como finalidade principal:",
      options: [
        "A) Aproveitar descontos na compra de grandes lotes.",
        "B) Prevenir a ruptura (falta de produto) devido a incertezas na demanda ou atrasos no ressuprimento.",
        "C) Servir exclusivamente para mostruário de lojas físicas.",
        "D) Armazenar produtos obsoletos para descarte futuro.",
        "E) Substituir a adoção de estratégias como o Just-in-Time."
      ],
      correctAnswer: "B) Prevenir a ruptura (falta de produto) devido a incertezas na demanda ou atrasos no ressuprimento.",
      explanation: "O estoque de segurança absorve oscilações não planejadas, funcionando como um amortecedor contra stockouts."
    }
  ],
  10: [
    {
      question: "Um contrato de prestação de serviços logísticos onde o parceiro (Operador Logístico) assume a responsabilidade completa por armazenagem, transporte e gerenciamento de inventário de uma empresa contratante caracteriza uma operação típica de:",
      options: [
        "A) Quarterback Logistics.",
        "B) Terceirização Logística (3PL - Third-Party Logistics).",
        "C) Quarteirização (4PL - Fourth-Party Logistics).",
        "D) Primarização logística (1PL).",
        "E) Compras spot."
      ],
      correctAnswer: "B) Terceirização Logística (3PL - Third-Party Logistics).",
      explanation: "Um fornecedor 3PL executa as funções operacionais logísticas integradas. O 4PL focaria na gestão estratégica e tecnológica sem necessariamente possuir ativos físicos."
    }
  ]
};
