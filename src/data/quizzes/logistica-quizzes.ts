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

export const LOGISTICA_QUIZZES: Record<string, Quiz> = {
  "modulo-1": {
    id: "logistica-m1-quiz",
    title: "Fundamentos de Logística",
    moduleNumber: 1,
    questions: [
      {
        id: 101,
        question:
          "De acordo com o Council of Logistics Management (CLM), logística é o processo de planejar, implementar e controlar o fluxo eficiente e eficaz de bens, serviços e informações do ponto de origem ao ponto de consumo. Qual alternativa melhor descreve a evolução histórica da logística?",
        options: [
          "Distribuição física (1960s) → logística integrada (1980s) → SCM (1990s) → logística 4.0 (digital).",
          "Logística militar (1940s) → automação total (1970s) → e-commerce (2000s).",
          "Armazenagem manual → transporte aéreo → globalização.",
          "Administração de materiais → procurement → just-in-time.",
          "Estoque local → estoque global → estoque zero.",
        ],
        correct: 0,
        explanation:
          "A evolução clássica apresentada pela banca CESGRANRIO: distribuição física dos anos 60 (foco em transporte e armazenagem), logística integrada dos 80 (coordenação interna), Supply Chain Management dos 90 (integração com parceiros), e logística 4.0 com IoT, big data e automação.",
      },
      {
        id: 102,
        question:
          "O valor criado pela logística é composto por duas dimensões fundamentais. Qual par de valores melhor representa os benefícios gerados pela logística eficiente?",
        options: [
          "Valor de marca e valor de custo.",
          "Valor de tempo (produto na hora certa) e valor de lugar (no local certo).",
          "Valor de qualidade e valor de inovação.",
          "Valor de preço e valor de conveniência.",
          "Valor de estoque e valor de transporte.",
        ],
        correct: 1,
        explanation:
          "A logística cria valor de tempo (disponibilizar o produto no momento em que o cliente necessita) e valor de lugar (entregar onde o cliente está). Esses dois valores são o fundamento do conceito logístico e caem frequentemente nas provas da CESGRANRIO.",
      },
      {
        id: 103,
        question:
          "Na gestão logística, existe um trade-off clássico entre custo de estoque e custo de transporte. Como se caracteriza esse trade-off?",
        options: [
          "Mais estoque = menor custo de transporte, mas menor custo de armazenagem.",
          "Mais estoque reduz o custo total sem impacto no transporte.",
          "Maior frequência de entregas reduz o estoque médio, mas eleva o custo de transporte; menos entregas fazem o inverso.",
          "Custo de estoque e custo de transporte sempre variam na mesma direção.",
          "O trade-off só existe em empresas de e-commerce.",
        ],
        correct: 2,
        explanation:
          "Esse é um dos trade-offs mais cobrados: entregas mais frequentes reduzem o estoque médio necessário (menor custo de armazenagem), mas aumentam o custo de transporte (mais viagens). A logística busca o ponto de equilíbrio que minimize o custo total.",
      },
      {
        id: 104,
        question:
          "Quais são os componentes fundamentais da logística integrada?",
        options: [
          "Apenas transporte e armazenagem.",
          "Estoque, armazenagem, transporte, embalagem, manuseio e processamento de pedidos.",
          "Procurement, produção e distribuição.",
          "Logística inbound, produção e logística outbound.",
          "Compras, almoxarifado e expedição.",
        ],
        correct: 1,
        explanation:
          "Os seis componentes da logística integrada são: estoque (quanto manter), armazenagem (onde guardar), transporte (como movimentar), embalagem (proteção e identificação), manuseio de materiais (equipamentos) e processamento de pedidos (fluxo de informação). Todos integrados para criar valor.",
      },
      {
        id: 105,
        question:
          "Na Petrobras, a logística de suprimento de plataformas offshore é considerada crítica porque:",
        options: [
          "As plataformas possuem armazéns ilimitados e nunca ficam sem suprimentos.",
          "Qualquer falha no abastecimento pode paralisar a produção de petróleo, gerando prejuízos milionários por hora.",
          "A logística offshore é mais barata que a logística terrestre.",
          "As plataformas produzem internamente todos os materiais necessários.",
          "O transporte marítimo é sempre mais rápido que o rodoviário.",
        ],
        correct: 1,
        explanation:
          "Uma plataforma FPSO que produz 100.000 barris/dia tem custo de parada de produção da ordem de US$ 8-10 milhões/dia. Por isso a logística offshore é crítica: supply boats e helicópteros operam 24/7 para garantir o abastecimento contínuo de materiais, equipamentos e pessoal.",
      },
      {
        id: 106,
        question:
          "O conceito de cadeia de suprimentos (supply chain) abrange:",
        options: [
          "Apenas o transporte de mercadorias entre fornecedor e cliente.",
          "Somente as atividades internas de estoque e armazenagem.",
          "O fluxo integrado de materiais, informações e recursos financeiros desde o fornecedor da matéria-prima até o consumidor final.",
          "Exclusivamente as relações contratuais entre empresa e fornecedores.",
          "O gerenciamento de armazéns e centros de distribuição.",
        ],
        correct: 2,
        explanation:
          "A cadeia de suprimentos (supply chain) é mais ampla que a logística: envolve o fluxo integrado de materiais (insumos → produto → entrega), informações (pedidos, previsões, rastreamento) e recursos financeiros (pagamentos, crédito) de ponta a ponta, do fornecedor mais remoto ao consumidor final.",
      },
    ],
  },

  "modulo-2": {
    id: "logistica-m2-quiz",
    title: "Gestão de Estoque",
    moduleNumber: 2,
    questions: [
      {
        id: 201,
        question:
          "A fórmula da Quantidade Econômica de Pedido (EOQ) é EOQ = √(2DS/H), onde D = demanda anual, S = custo por pedido e H = custo de manutenção por unidade por período. Se uma empresa tem D = 10.000 unidades/ano, S = R$ 200/pedido e H = R$ 50/unidade/ano, qual é o EOQ?",
        options: ["100 unidades", "200 unidades", "283 unidades", "400 unidades", "500 unidades"],
        correct: 1,
        explanation:
          "EOQ = √(2 × 10.000 × 200 / 50) = √(4.000.000 / 50) = √80.000 ≈ 283. Portanto, a alternativa correta é 283 unidades. O EOQ minimiza o custo total de estoque (custo de pedido + custo de manutenção), ponto onde os dois custos se igualam.",
      },
      {
        id: 202,
        question:
          "A classificação ABC de estoques baseia-se no princípio de Pareto. Como se distribuem corretamente os itens nas classes A, B e C?",
        options: [
          "A: 80% itens / 20% valor — B: 15% itens / 30% valor — C: 5% itens / 50% valor.",
          "A: 20% itens / 80% valor — B: 30% itens / 15% valor — C: 50% itens / 5% valor.",
          "A: 10% itens / 70% valor — B: 20% itens / 20% valor — C: 70% itens / 10% valor.",
          "A: 50% itens / 50% valor — B: 30% itens / 30% valor — C: 20% itens / 20% valor.",
          "A: 33% itens / 33% valor — B: 33% itens / 33% valor — C: 33% itens / 33% valor.",
        ],
        correct: 1,
        explanation:
          "A classificação ABC aplica o Princípio de Pareto: Classe A = 20% dos itens representam 80% do valor (máximo controle, contagem cíclica frequente); Classe B = 30% itens / 15% valor (controle moderado); Classe C = 50% itens / apenas 5% do valor (controle simplificado). Foco de gestão sempre nos itens A.",
      },
      {
        id: 203,
        question:
          "O Ponto de Pedido (PP) é calculado por: PP = Demanda média × Lead time + Estoque de Segurança. Uma empresa tem demanda diária de 50 unidades, lead time de 10 dias e estoque de segurança de 100 unidades. Qual é o ponto de pedido?",
        options: ["500 unidades", "600 unidades", "650 unidades", "700 unidades", "750 unidades"],
        correct: 1,
        explanation:
          "PP = (50 × 10) + 100 = 500 + 100 = 600 unidades. O ponto de pedido indica o nível de estoque em que deve ser emitido um novo pedido, garantindo que as mercadorias cheguem antes do estoque zerar, cobrindo a demanda durante o lead time mais o estoque de segurança.",
      },
      {
        id: 204,
        question:
          "Qual a diferença fundamental entre os métodos FIFO (PEPS) e LIFO (UEPS) de avaliação de estoque?",
        options: [
          "FIFO usa preço médio; LIFO usa o último preço de compra.",
          "FIFO: o primeiro item a entrar é o primeiro a sair (evita obsolescência); LIFO: o último que entra é o primeiro a sair (impacto no resultado fiscal).",
          "FIFO e LIFO são idênticos em termos de resultado financeiro.",
          "LIFO é proibido no Brasil; FIFO é obrigatório por lei.",
          "FIFO aplica-se apenas a alimentos; LIFO a materiais industriais.",
        ],
        correct: 1,
        explanation:
          "FIFO (First In, First Out = PEPS: Primeiro que Entra, Primeiro que Sai): o item mais antigo é consumido primeiro, evitando vencimentos e obsolescência — ideal para perecíveis. LIFO (Last In, First Out = UEPS): o último item adquirido é o primeiro a sair — os estoques refltem preços mais antigos no balanço. Importante: o LIFO não é aceito pelo fisco brasileiro (CVM/IFRS).",
      },
      {
        id: 205,
        question:
          "O giro de estoque é um indicador de eficiência. Um giro alto indica:",
        options: [
          "Excesso de estoque e baixa eficiência operacional.",
          "Alta rotatividade, menor imobilização de capital e menor risco de obsolescência.",
          "Que a empresa realiza poucos pedidos por ano.",
          "Que o estoque de segurança está superdimensionado.",
          "Problemas na cadeia de suprimentos.",
        ],
        correct: 1,
        explanation:
          "Giro de estoque = Vendas (ou Custo de Mercadorias Vendidas) ÷ Estoque médio. Um giro ALTO significa que o estoque é renovado com frequência: menos capital imobilizado, menor custo de armazenagem, menor risco de obsolescência e maior eficiência. Ex.: giro 12 = estoque renovado mensalmente.",
      },
      {
        id: 206,
        question:
          "O estoque de segurança (ES) tem por objetivo:",
        options: [
          "Maximizar o nível de estoque para nunca faltar produto.",
          "Proteger contra variações imprevisíveis de demanda e atrasos no lead time do fornecedor.",
          "Substituir o planejamento de produção.",
          "Eliminar a necessidade do ponto de pedido.",
          "Reduzir o custo de frete pagando menos por pedido.",
        ],
        correct: 1,
        explanation:
          "O estoque de segurança é um colchão calculado para absorver incertezas: variações de demanda acima do esperado e/ou atrasos do fornecedor. Sem ele, qualquer desvio resulta em ruptura de estoque (stockout). O tamanho do ES é proporcional ao desvio-padrão da demanda e à variabilidade do lead time.",
      },
    ],
  },

  "modulo-3": {
    id: "logistica-m3-quiz",
    title: "Armazenagem e Movimentação",
    moduleNumber: 3,
    questions: [
      {
        id: 301,
        question:
          "As funções básicas de um armazém, em ordem sequencial de fluxo, são:",
        options: [
          "Expedição → armazenagem → recebimento → separação.",
          "Recebimento → conferência → armazenagem → separação (picking) → embalagem → expedição.",
          "Compras → transporte → estoque → vendas.",
          "Planejamento → execução → controle → melhoria.",
          "Entrada → processamento → saída → devolução.",
        ],
        correct: 1,
        explanation:
          "O fluxo padrão de um armazém é: (1) Recebimento dos fornecedores, (2) Conferência física e documental, (3) Armazenagem no endereço correto, (4) Separação (picking) por pedido, (5) Embalagem/unitização, (6) Expedição ao cliente. Esse fluxo é cobrado pela CESGRANRIO em questões de logística.",
      },
      {
        id: 302,
        question:
          "Qual layout de armazém é mais indicado quando a entrada e a saída de mercadorias ocorrem pelo mesmo lado do armazém?",
        options: [
          "Layout em I (fluxo linear).",
          "Layout em U (entrada e saída na mesma face).",
          "Layout em T (bifurcação central).",
          "Layout em L (fluxo em ângulo reto).",
          "Layout em Cruz (quatro entradas).",
        ],
        correct: 1,
        explanation:
          "O layout em U é ideal quando doca de recebimento e doca de expedição estão na mesma fachada. O fluxo forma um 'U': mercadoria entra de um lado, percorre o armazém e sai pelo outro lado da mesma face. É o mais comum em Centros de Distribuição modernos. Layout em I é para fluxo passante (entrada de frente, saída dos fundos).",
      },
      {
        id: 303,
        question:
          "O WMS (Warehouse Management System) é um sistema de informação que:",
        options: [
          "Gerencia exclusivamente as finanças do armazém.",
          "Controla o endereçamento de produtos, as operações de recebimento, picking, inventário e rastreabilidade dentro do armazém.",
          "Substitui completamente os operadores logísticos.",
          "Planeja rotas de transporte externas ao armazém.",
          "Calcula o EOQ e o ponto de pedido automaticamente.",
        ],
        correct: 1,
        explanation:
          "O WMS (Warehouse Management System) é o sistema nervoso do armazém: controla posições de estoque (endereçamento), orienta operadores em picking e putaway, gerencia recebimento e conferência, suporta inventários cíclicos e fornece rastreabilidade de todos os movimentos. Integra-se ao ERP (SAP, TOTVS) da empresa.",
      },
      {
        id: 304,
        question:
          "O crossdocking é uma técnica logística que se caracteriza por:",
        options: [
          "Armazenagem prolongada de produtos para criar estoque de segurança elevado.",
          "Transferência direta de produtos do recebimento para a expedição, eliminando ou minimizando a armazenagem.",
          "Separação de produtos por lote de fabricação.",
          "Dupla conferência de todos os itens recebidos.",
          "Utilização de empilhadeiras robotizadas.",
        ],
        correct: 1,
        explanation:
          "Crossdocking = transferência direta (dock-to-dock). Os produtos chegam ao armazém, são separados/consolidados e expedidos rapidamente, sem armazenagem intermediária. Usado por grandes varejistas (Walmart, supermercados) para distribuição eficiente. Reduz estoques, mas exige alta sincronização e precisão de informação.",
      },
      {
        id: 305,
        question:
          "Os sistemas AS/RS (Automated Storage and Retrieval Systems), também chamados de transelevadores, são usados para:",
        options: [
          "Transporte rodoviário de cargas pesadas.",
          "Armazenagem e recuperação automática de itens em estruturas de grande altura, sem intervenção humana direta.",
          "Separação manual de pedidos no nível do piso.",
          "Controle financeiro de estoques.",
          "Embalagem automática de produtos.",
        ],
        correct: 1,
        explanation:
          "AS/RS (Automated Storage and Retrieval Systems) são sistemas automatizados para armazéns de grande verticalidade (10-40m). Um robô (transelevador) percorre corredores e prateleiras, armazenando e retirando itens automaticamente. Muito usado em almoxarifados de peças industriais, farmácias, autopeças. Alta densidade de armazenagem e precisão.",
      },
      {
        id: 306,
        question:
          "O método de endereçamento de estoque em armazém que designa uma posição fixa para cada produto é denominado:",
        options: [
          "Endereçamento dinâmico (caótico).",
          "Endereçamento fixo (dedicado).",
          "Endereçamento misto.",
          "Picking por zona.",
          "RFID mapping.",
        ],
        correct: 1,
        explanation:
          "No endereçamento fixo (dedicado), cada SKU possui uma posição pré-determinada no armazém. Vantagem: operadores memorizam os locais. Desvantagem: uso ineficiente do espaço. Já no endereçamento dinâmico (caótico), qualquer posição livre pode receber qualquer produto — melhor aproveitamento do espaço, mas exige WMS para controle preciso.",
      },
    ],
  },

  "modulo-4": {
    id: "logistica-m4-quiz",
    title: "Transporte e Distribuição",
    moduleNumber: 4,
    questions: [
      {
        id: 401,
        question:
          "Qual modal de transporte apresenta maior capilaridade (acesso a qualquer ponto do território), sendo o mais utilizado no Brasil para cargas fracionadas e de médio prazo?",
        options: [
          "Ferroviário.",
          "Aquaviário de cabotagem.",
          "Rodoviário.",
          "Aéreo.",
          "Dutoviário.",
        ],
        correct: 2,
        explanation:
          "O modal rodoviário domina o Brasil: representa ~65% da matriz de transporte de cargas. Sua principal vantagem é a capilaridade (acessa qualquer ponto com estrada), flexibilidade de volume e velocidade para médias distâncias. Desvantagem: custo mais alto por tonelada/km em comparação ao ferroviário e aquaviário.",
      },
      {
        id: 402,
        question:
          "A Petrobras utiliza intensamente o modal dutoviário para transporte de petróleo, derivados e gás. Qual característica principal diferencia esse modal dos demais?",
        options: [
          "Alta velocidade de entrega e flexibilidade de rota.",
          "Baixo custo operacional, fluxo contínuo e capacidade para fluidos e graneis, mas com rotas fixas e alto investimento inicial.",
          "Capacidade de transportar qualquer tipo de carga.",
          "Mobilidade e facilidade de implantação.",
          "Não exige manutenção após instalação.",
        ],
        correct: 1,
        explanation:
          "Dutoviário: custo operacional muito baixo (fluxo contínuo, 24h/7d), ideal para fluidos (petróleo, gás, etanol, derivados) e graneis sólidos. Porém: rotas fixas e imutáveis, altíssimo investimento inicial de implantação, sem flexibilidade de destino. A Transpetro opera 7.000+ km de dutos no Brasil.",
      },
      {
        id: 403,
        question:
          "O TMS (Transportation Management System) é um sistema de gestão que:",
        options: [
          "Gerencia armazéns e centros de distribuição.",
          "Planeja, executa e otimiza o transporte de cargas, incluindo seleção de transportadores, roteirização e rastreamento.",
          "Controla exclusivamente frota própria.",
          "Substitui o conhecimento de carga (CT-e).",
          "Gerencia apenas o transporte internacional.",
        ],
        correct: 1,
        explanation:
          "TMS (Transportation Management System): sistema que gerencia todo o ciclo do transporte — cotação e seleção de transportadoras (leilão de frete), planejamento e otimização de rotas, programação de embarques, rastreamento em tempo real, conferência de faturas (freight audit) e KPIs de desempenho logístico.",
      },
      {
        id: 404,
        question:
          "Os Incoterms 2020 são termos internacionais de comércio. O termo FOB (Free On Board) significa que:",
        options: [
          "O vendedor paga todos os custos até o destino final, incluindo seguro.",
          "O comprador assume todos os riscos e custos a partir do momento em que a mercadoria é colocada a bordo do navio no porto de origem.",
          "O risco passa ao comprador somente quando a mercadoria chega ao porto de destino.",
          "O frete é sempre pago pelo vendedor.",
          "O seguro é obrigatório para o vendedor em toda a viagem.",
        ],
        correct: 1,
        explanation:
          "FOB (Free On Board): o vendedor é responsável por levar a mercadoria até o porto de embarque e colocá-la a bordo do navio. A partir desse momento, TODOS os riscos e custos (frete internacional, seguro, desembaraço no destino) passam para o comprador. Muito usado em importações de commodities.",
      },
      {
        id: 405,
        question:
          "O modal ferroviário é mais indicado para qual tipo de carga e distância?",
        options: [
          "Cargas fracionadas para entregas urbanas em curtas distâncias.",
          "Cargas urgentes e de alto valor agregado.",
          "Graneis sólidos (minério, grãos, carvão) e líquidos em grandes volumes e longas distâncias.",
          "Produtos perecíveis que precisam de controle de temperatura.",
          "Carga aérea de documentos e eletrônicos.",
        ],
        correct: 2,
        explanation:
          "O ferroviário é competitivo para: grandes volumes de graneis (minério de ferro, soja, carvão, açúcar), longas distâncias (acima de 500km) e cargas que não precisam de urgência. Custo por tonelada/km é 2-5x menor que o rodoviário. No Brasil: malha de 30.000 km operada por concessionárias (Vale, Rumo, etc.).",
      },
      {
        id: 406,
        question:
          "A roteirização logística tem por objetivo:",
        options: [
          "Aumentar o número de entregas realizadas por caminhão, sem considerar custo.",
          "Determinar as rotas mais eficientes para veículos de entrega, minimizando custo total (distância, tempo, combustível) e respeitando restrições operacionais.",
          "Garantir que todos os clientes recebam no mesmo dia.",
          "Eliminar o uso de tecnologia no planejamento de rotas.",
          "Concentrar todas as entregas em um único veículo.",
        ],
        correct: 1,
        explanation:
          "Roteirização é a otimização do planejamento de rotas de veículos (VRP — Vehicle Routing Problem). Objetivos: minimizar distância total percorrida, reduzir custo de combustível, respeitar janelas de horário dos clientes, capacidade de carga dos veículos e jornada dos motoristas. Softwares como Maplink e Google Maps Platform apoiam esse processo.",
      },
    ],
  },

  "modulo-5": {
    id: "logistica-m5-quiz",
    title: "Logística Inbound e Outbound",
    moduleNumber: 5,
    questions: [
      {
        id: 501,
        question:
          "A logística inbound refere-se ao fluxo de materiais e componentes que entram na empresa vindo dos fornecedores. Qual das seguintes atividades faz parte da logística inbound?",
        options: [
          "Distribuição do produto acabado ao cliente final.",
          "Separação de pedidos no centro de distribuição.",
          "Negociação de frete de entrada, recebimento, conferência e integração dos materiais ao sistema de estoque.",
          "Emissão de nota fiscal de venda ao cliente.",
          "Roteirização de entregas ao varejo.",
        ],
        correct: 2,
        explanation:
          "Logística inbound gerencia o fluxo de ENTRADA: negociação e consolidação de fretes de fornecedores, janelas de entrega nas docas, recebimento físico, conferência quantitativa e qualitativa, integração ao WMS/ERP e armazenagem. Seu desempenho impacta diretamente o lead time de produção e o nível de estoque.",
      },
      {
        id: 502,
        question:
          "O sistema VMI (Vendor Managed Inventory) é caracterizado por:",
        options: [
          "O cliente gerenciar o estoque do fornecedor remotamente.",
          "O fornecedor assumir a responsabilidade de monitorar e repor o estoque do cliente, eliminando a emissão manual de pedidos.",
          "Um terceiro independente gerenciar os estoques de ambas as partes.",
          "A produção gerenciar o estoque de matérias-primas sem envolver fornecedores.",
          "O cliente controlar o estoque por RFID sem sistema integrado.",
        ],
        correct: 1,
        explanation:
          "VMI (Vendor Managed Inventory): o FORNECEDOR acessa os dados de consumo e estoque do cliente (via EDI, portal web ou integração de sistemas) e decide autonomamente quando e quanto repor. Benefícios: elimina ordens de compra manuais, reduz stockouts e excessos, aumenta colaboração. Petrobras usa VMI para itens de alta rotatividade.",
      },
      {
        id: 503,
        question:
          "O lead time total de um produto engloba:",
        options: [
          "Apenas o tempo de produção na fábrica.",
          "Somente o tempo de transporte do produto acabado ao cliente.",
          "O tempo total desde a emissão do pedido ao fornecedor até a entrega ao cliente final, incluindo inbound + produção + outbound.",
          "O tempo de espera em fila no armazém.",
          "Apenas o tempo de separação de pedido.",
        ],
        correct: 2,
        explanation:
          "Lead time total = soma de todos os tempos: (1) Lead time de suprimento inbound (pedido → chegada da matéria-prima), (2) Lead time de produção (manufatura/processamento), (3) Lead time de distribuição outbound (expedição → entrega ao cliente). Reduzir o lead time total é objetivo estratégico da gestão da cadeia de suprimentos.",
      },
      {
        id: 504,
        question:
          "O Just-in-Time (JIT) é um sistema de produção e logística que preconiza:",
        options: [
          "Grandes lotes de produção para maximizar economias de escala.",
          "Estoques elevados para garantir disponibilidade contínua.",
          "Receber materiais e produzir apenas o necessário, na quantidade certa e no momento exato em que são necessários.",
          "Pedidos mensais para reduzir custo de processamento.",
          "Centralização de todos os estoques em um único armazém.",
        ],
        correct: 2,
        explanation:
          "JIT (Just-in-Time), desenvolvido pela Toyota (TPS): eliminar desperdícios produzindo/recebendo somente o necessário, quando necessário. Reduz drasticamente os estoques intermediários (WIP e matéria-prima). Requer fornecedores confiáveis, entregas frequentes e processos estáveis. Risco: vulnerabilidade a rupturas na cadeia (como visto na COVID-19).",
      },
      {
        id: 505,
        question:
          "A logística de last mile (última milha) refere-se à:",
        options: [
          "Transporte oceânico de longa distância.",
          "Último trecho da cadeia de distribuição — do centro de distribuição até o consumidor final — considerado o mais caro e complexo do ciclo.",
          "Gestão do primeiro quilômetro na coleta de matérias-primas.",
          "Transporte ferroviário de grãos até o porto.",
          "Movimentação interna de materiais dentro da fábrica.",
        ],
        correct: 1,
        explanation:
          "Last mile (última milha): é o trecho final de entrega ao consumidor, do CD ao endereço do cliente. Representa 30-50% do custo total de transporte logístico, pois envolve muitas entregas pequenas, urbanas, com restrições de horário e acesso. E-commerce tornou a last mile crítica. Soluções: lockers, pontos de retirada, drones, mototboys.",
      },
      {
        id: 506,
        question:
          "O DRP (Distribution Requirements Planning) é um sistema que:",
        options: [
          "Gerencia exclusivamente o estoque de produtos em pontos de venda.",
          "Calcula as necessidades de distribuição em múltiplos níveis (fábricas, CDs, filiais) para atender à demanda prevista, gerando ordens de transferência e reposição.",
          "Substitui o sistema de faturamento.",
          "Planeja apenas o transporte entre fábricas.",
          "Define o layout ótimo de armazéns regionais.",
        ],
        correct: 1,
        explanation:
          "DRP (Distribution Requirements Planning): sistema de planejamento que, a partir da previsão de demanda, calcula backward as necessidades de estoque em cada nível da rede de distribuição (lojas → CDs regionais → CD central → fábrica). Integra-se ao MRP para sincronizar produção e distribuição. É a extensão do MRP para a logística de saída.",
      },
    ],
  },

  "modulo-6": {
    id: "logistica-m6-quiz",
    title: "Supply Chain Management",
    moduleNumber: 6,
    questions: [
      {
        id: 601,
        question:
          "Qual é a principal diferença entre Logística e Supply Chain Management (SCM)?",
        options: [
          "São conceitos idênticos e intercambiáveis.",
          "Logística foca no fluxo físico interno; SCM é a integração estratégica de processos de múltiplas organizações ao longo de toda a cadeia de valor, do fornecedor da matéria-prima ao consumidor final.",
          "SCM é uma subárea da logística operacional.",
          "Logística é mais ampla e estratégica que SCM.",
          "SCM refere-se apenas à gestão de fornecedores diretos.",
        ],
        correct: 1,
        explanation:
          "Logística = fluxo físico eficiente de materiais e informações DENTRO da empresa (perspectiva interna). SCM = integração estratégica de processos de negócio entre múltiplas organizações (fornecedores, fabricantes, distribuidores, varejistas) para criar valor para o cliente final. A logística é um componente do SCM.",
      },
      {
        id: 602,
        question:
          "O Bullwhip Effect (Efeito Chicote) na cadeia de suprimentos descreve o fenômeno em que:",
        options: [
          "Pequenas variações na demanda do consumidor final se amplificam progressivamente à medida que se sobe na cadeia, causando grandes oscilações de estoque nos níveis superiores.",
          "A demanda se torna mais estável quanto mais próxima do fornecedor de matéria-prima.",
          "O transporte de cargas gera vibrações mecânicas nos produtos.",
          "Os preços das commodities oscilam sazonalmente.",
          "A cadeia reage imediatamente a qualquer mudança de demanda.",
        ],
        correct: 0,
        explanation:
          "Bullwhip Effect: uma pequena variação de demanda no varejo (ex: +10%) gera pedidos maiores no atacado (+30%), produção ainda maior na fábrica (+50%) e compras excessivas de matéria-prima (+80%). Causas: pedidos em lote, promoções irregulares, falta de visibilidade e erros de previsão. Solução: compartilhamento de informação em tempo real (CPFR, VMI).",
      },
      {
        id: 603,
        question:
          "O CPFR (Collaborative Planning, Forecasting and Replenishment) é um modelo de colaboração que:",
        options: [
          "Centraliza todas as decisões de compra no fornecedor.",
          "É usado exclusivamente para o varejo alimentar.",
          "Integra fabricante e varejista para compartilhar planos de vendas, previsões de demanda e programas de reposição, reduzindo incertezas e custos ao longo da cadeia.",
          "Substitui o sistema ERP das empresas parceiras.",
          "Gerencia apenas o transporte entre parceiros.",
        ],
        correct: 2,
        explanation:
          "CPFR (Collaborative Planning, Forecasting and Replenishment): modelo de colaboração entre parceiros comerciais que compartilham planos de negócio, previsões de demanda e programas de reposição. Reduz o Bullwhip Effect, diminui estoques, melhora o OTIF e a satisfação do cliente. Exige confiança mútua e integração de sistemas (EDI, APIs).",
      },
      {
        id: 604,
        question:
          "A tecnologia blockchain aplicada à cadeia de suprimentos permite principalmente:",
        options: [
          "Reduzir o custo de transporte em 50%.",
          "Rastreabilidade end-to-end imutável de produtos, comprovando origem, condições de transporte e autenticidade ao longo de toda a cadeia.",
          "Substituir os sistemas WMS e TMS das empresas.",
          "Automatizar completamente os pedidos de compra.",
          "Gerenciar estoques em tempo real sem necessidade de internet.",
        ],
        correct: 1,
        explanation:
          "Blockchain na cadeia de suprimentos: cada transação (colheita, processamento, transporte, armazenagem, entrega) é registrada em um bloco imutável e verificável por todos os participantes. Benefícios: autenticação de origem (combate à contrafação), rastreabilidade de alimentos (recalls rápidos), comprovação de conformidade ambiental e social. Walmart, Maersk e IBM são pioneiros.",
      },
      {
        id: 605,
        question:
          "Em contexto de gestão de riscos da cadeia de suprimentos, a COVID-19 revelou principalmente:",
        options: [
          "Que cadeias altamente globalizadas e lean (sem estoques) são resilientes a qualquer choque.",
          "A vulnerabilidade de cadeias de suprimentos excessivamente concentradas em poucos fornecedores e países, e a falta de resiliência de estratégias just-in-time sem estoques de segurança.",
          "Que o transporte aéreo é mais eficiente que o marítimo em crises.",
          "Que empresas menores são mais resilientes que multinacionais.",
          "Que a digitalização não impacta a resiliência da cadeia.",
        ],
        correct: 1,
        explanation:
          "A COVID-19 expôs fragilidades estruturais: dependência excessiva de fornecedores únicos (single sourcing), concentração na Ásia (especialmente China), estoques zero (JIT sem buffer de segurança) e falta de visibilidade da cadeia estendida. Lição: diversificação de fornecedores, nearshoring, estoques estratégicos e visibilidade digital são essenciais para resiliência.",
      },
      {
        id: 606,
        question:
          "O Green Supply Chain (cadeia de suprimentos verde) tem como objetivos:",
        options: [
          "Apenas reduzir o custo de embalagem.",
          "Integrar práticas ambientalmente sustentáveis em todas as etapas da cadeia — desde o design do produto, seleção de fornecedores, produção, transporte até a logística reversa — reduzindo a pegada de carbono.",
          "Substituir fornecedores estrangeiros por nacionais.",
          "Eliminar completamente o modal rodoviário.",
          "Usar apenas embalagens biodegradáveis.",
        ],
        correct: 1,
        explanation:
          "Green Supply Chain Management integra sustentabilidade ambiental à cadeia: escolha de fornecedores com critérios ESG, design de produtos eco-friendly (menos material, reciclável), modais de menor emissão (ferroviário, hidroviário), otimização de rotas (menos km = menos CO2), embalagens sustentáveis e logística reversa eficiente. Meta: neutralidade de carbono na cadeia.",
      },
    ],
  },

  "modulo-7": {
    id: "logistica-m7-quiz",
    title: "Indicadores Logísticos (KPIs)",
    moduleNumber: 7,
    questions: [
      {
        id: 701,
        question:
          "O OTIF (On Time In Full) é um dos KPIs mais importantes da logística. Uma empresa realizou 1.000 entregas. Em 850, o produto chegou no prazo; em 800, chegou na quantidade correta; e em 750, atendeu ambos os critérios simultaneamente. Qual é o OTIF?",
        options: ["85%", "80%", "75%", "70%", "90%"],
        correct: 2,
        explanation:
          "OTIF = pedidos entregues no prazo E na quantidade correta / total de pedidos. OTIF = 750 / 1.000 = 75%. Notar: OTIF exige que AMBAS as condições sejam atendidas simultaneamente. Não é a média de On Time e In Full separadamente. Valores de referência: acima de 95% é considerado excelente.",
      },
      {
        id: 702,
        question:
          "Uma empresa tem estoque médio de R$ 500.000 e faturamento anual de R$ 6.000.000. Qual é o giro de estoque e quantos dias de cobertura isso representa?",
        options: [
          "Giro 10 / Cobertura 36 dias.",
          "Giro 12 / Cobertura 30 dias.",
          "Giro 8 / Cobertura 45 dias.",
          "Giro 15 / Cobertura 24 dias.",
          "Giro 6 / Cobertura 60 dias.",
        ],
        correct: 1,
        explanation:
          "Giro = Faturamento / Estoque médio = 6.000.000 / 500.000 = 12. Cobertura = 365 / Giro = 365 / 12 ≈ 30 dias. Ou seja, o estoque gira 12 vezes por ano, com cobertura média de 30 dias. Quanto maior o giro, mais eficiente; quanto menor a cobertura, menos capital imobilizado (mas maior risco de ruptura).",
      },
      {
        id: 703,
        question:
          "O Fill Rate (taxa de atendimento) mede:",
        options: [
          "A porcentagem de caminhões que chegaram cheios ao destino.",
          "A porcentagem da demanda do cliente que foi atendida a partir do estoque disponível, sem necessidade de backorder.",
          "O percentual de produtos sem danos nas entregas.",
          "A taxa de ocupação dos armazéns.",
          "A porcentagem de pedidos devolvidos.",
        ],
        correct: 1,
        explanation:
          "Fill Rate = (Quantidade atendida / Quantidade solicitada) × 100. Mede o serviço de disponibilidade de estoque: se um cliente pede 100 unidades e há apenas 90 disponíveis, o fill rate é 90%. Um fill rate de 95% significa que 5% da demanda vai para backorder (pedido pendente) ou é perdida. KPI crítico para e-commerce e distribuição.",
      },
      {
        id: 704,
        question:
          "O Perfect Order Rate (taxa de pedido perfeito) considera que um pedido é 'perfeito' quando:",
        options: [
          "Chega apenas no prazo correto.",
          "É entregue no prazo correto, na quantidade correta, sem avarias, com documentação correta e faturamento sem erros.",
          "O cliente não faz devolução.",
          "O pedido é processado em menos de 24 horas.",
          "O produto está dentro da validade no momento da entrega.",
        ],
        correct: 1,
        explanation:
          "Perfect Order Rate = % de pedidos que atendem TODOS os critérios simultaneamente: (1) no prazo, (2) quantidade correta, (3) sem avarias/defeitos, (4) documentação correta (NF, etiquetas), (5) faturamento sem erros. É mais exigente que o OTIF. Fórmula: se cada critério tem 97% de acerto, o Perfect Order = 0,97^5 ≈ 86% — demonstra o impacto multiplicativo dos erros.",
      },
      {
        id: 705,
        question:
          "O custo logístico total como percentual da receita é um indicador estratégico. O que ele mede e qual faixa é considerada eficiente para empresas de grande porte no Brasil?",
        options: [
          "Mede apenas o custo de transporte; faixa eficiente: 1-2% da receita.",
          "Mede o total de gastos logísticos (transporte + estoque + armazenagem + processamento de pedidos) como % da receita; referência: 8-12% para grandes indústrias brasileiras.",
          "Mede somente o custo de armazenagem; faixa eficiente: 5-7%.",
          "Considera apenas custos fixos logísticos; benchmark: 3-4%.",
          "Mede custo de devolução; referência: abaixo de 1%.",
        ],
        correct: 1,
        explanation:
          "Custo logístico total = transporte + armazenagem + estoque (capital imobilizado, obsolescência) + processamento de pedidos + logística reversa. No Brasil, a média histórica gira em torno de 11-12% da receita (ILOS/CEL), versus ~8% em países desenvolvidos. Empresas de excelência logística visam abaixo de 8%. É referência em benchmarking setorial.",
      },
      {
        id: 706,
        question:
          "O lead time logístico do pedido ao cliente (Order-to-Delivery) é uma métrica crítica. Qual das seguintes práticas mais contribui para sua redução?",
        options: [
          "Aumentar o número de fornecedores sem critério de localização.",
          "Integração de sistemas (EDI, APIs) entre empresa e parceiros, processamento automático de pedidos, proximidade geográfica de estoques e visibilidade em tempo real.",
          "Centralizar todo o estoque em um único armazém nacional.",
          "Usar apenas o modal aéreo para todas as entregas.",
          "Reduzir o número de SKUs oferecidos ao cliente.",
        ],
        correct: 1,
        explanation:
          "Reduzir lead time exige: (1) Eliminação de gargalos de processamento de pedidos (automação, EDI), (2) Estoques posicionados próximos ao cliente (armazéns regionais, CDs avançados), (3) Visibilidade em tempo real do estoque e status do pedido, (4) Parceiros logísticos confiáveis com SLAs rígidos. Cada etapa eliminada/acelerada comprime o lead time total.",
      },
    ],
  },

  "modulo-8": {
    id: "logistica-m8-quiz",
    title: "Logística Reversa",
    moduleNumber: 8,
    questions: [
      {
        id: 801,
        question:
          "A Lei 12.305/2010 (Política Nacional de Resíduos Sólidos — PNRS) institui o conceito de responsabilidade compartilhada pelo ciclo de vida dos produtos. O que isso significa para as empresas?",
        options: [
          "Apenas os consumidores são responsáveis pelo descarte correto.",
          "Fabricantes, importadores, distribuidores e comerciantes têm responsabilidade conjunta pela destinação ambientalmente adequada dos resíduos gerados por seus produtos.",
          "A responsabilidade é exclusiva do poder público municipal.",
          "Apenas produtos perigosos estão sujeitos à lei.",
          "A lei se aplica apenas a embalagens plásticas.",
        ],
        correct: 1,
        explanation:
          "A PNRS (Lei 12.305/2010) estabelece a responsabilidade compartilhada: fabricantes, importadores, distribuidores E comerciantes são co-responsáveis pela destinação dos resíduos pós-consumo. Criou os Sistemas de Logística Reversa obrigatórios para: embalagens em geral, agrotóxicos, pneus, óleos lubrificantes, lâmpadas fluorescentes, pilhas e baterias, eletroeletrônicos.",
      },
      {
        id: 802,
        question:
          "Qual a diferença entre logística reversa de pós-venda e de pós-consumo?",
        options: [
          "São conceitos idênticos e intercambiáveis.",
          "Pós-venda: retorno de produtos com pouco ou nenhum uso (defeitos, erros de pedido, devoluções, recalls); pós-consumo: retorno ao fim da vida útil para reciclagem, remanufatura ou descarte adequado.",
          "Pós-consumo refere-se apenas a devoluções de varejo.",
          "Pós-venda envolve somente reciclagem de embalagens.",
          "Pós-consumo é obrigatório; pós-venda é opcional.",
        ],
        correct: 1,
        explanation:
          "Logística reversa de PÓS-VENDA: retorno de produtos que ainda possuem valor comercial — devoluções, produtos com defeito, recall, erros de pedido, produtos fora de prazo. Objetivo: recuperar valor e corrigir falhas. Logística reversa de PÓS-CONSUMO: produtos no fim da vida útil — reciclagem, remanufatura, reuso de componentes, descarte adequado (destinação final). Objetivo: sustentabilidade e conformidade legal.",
      },
      {
        id: 803,
        question:
          "Na Petrobras, a logística reversa se aplica principalmente em qual cenário?",
        options: [
          "Devolução de gasolina não vendida nos postos.",
          "Recuperação de tubulações, reciclagem de resíduos de perfuração, descarte de fluidos perfurantes, retorno de embalagens de produtos químicos e gestão de catalisadores exaustos de refinarias.",
          "Recolhimento de botijões de gás de clientes.",
          "Recall de automóveis flex.",
          "Retorno de documentos contratuais.",
        ],
        correct: 1,
        explanation:
          "Na Petrobras, logística reversa complexa inclui: resíduos de perfuração (cascalhos, fluidos), materiais radiológicos de perfilagem, catalisadores exaustos de FCC (Fluid Catalytic Cracking), recuperação e reciclagem de tubulações substituídas, retorno de embalagens de químicos, gestão de rejeitos offshore (conformidade IBAMA/MARPOL). Custo e conformidade legal são críticos.",
      },
      {
        id: 804,
        question:
          "A Economia Circular (Circular Economy) se diferencia do modelo linear (take-make-dispose) por:",
        options: [
          "Produzir bens que nunca precisam de manutenção.",
          "Manter materiais e produtos em uso pelo maior tempo possível, recuperando e regenerando produtos e materiais ao fim de cada ciclo de vida, eliminando o conceito de 'lixo'.",
          "Criar produtos descartáveis mais baratos.",
          "Centralizar a produção em países desenvolvidos.",
          "Focar exclusivamente na reciclagem de plásticos.",
        ],
        correct: 1,
        explanation:
          "Economia Circular: os materiais nunca viram lixo — eles circulam em loops fechados. Hierarquia: (1) Reduzir, (2) Reusar, (3) Reparar, (4) Remanufaturar, (5) Reciclar, (6) Recuperar energia. Contrasta com o modelo linear (extrair → produzir → usar → descartar). Empresas como Renault, Interface e Philips implementam modelos de negócio circulares (product-as-a-service).",
      },
      {
        id: 805,
        question:
          "A logística verde (Green Logistics) busca reduzir o impacto ambiental das operações logísticas principalmente através de:",
        options: [
          "Usar embalagens maiores para reduzir o número de viagens.",
          "Otimização de rotas (menos km = menos CO2), mudança modal para transporte de menor emissão, uso de veículos elétricos/híbridos, consolidação de cargas e embalagens sustentáveis.",
          "Terceirizar toda a operação logística.",
          "Aumentar a frequência de entregas para reduzir estoques.",
          "Eliminar totalmente o transporte internacional.",
        ],
        correct: 1,
        explanation:
          "Green Logistics: (1) Otimização de rotas (TMS reduz km e combustível), (2) Mudança modal rodoviário → ferroviário/marítimo (emissão 5-10x menor por tonelada/km), (3) Frota verde (Euro 6, elétricos, biocombustíveis), (4) Consolidação de cargas (menos viagens vazias), (5) Embalagens eco (menos material, retornáveis), (6) Armazéns green (solar, LED, certificação LEED).",
      },
      {
        id: 806,
        question:
          "Um dos desafios operacionais mais complexos da logística reversa é:",
        options: [
          "A facilidade de previsão do volume de retornos.",
          "A incerteza e imprevisibilidade do volume, timing, condição e localização dos produtos retornados, dificultando o planejamento e aumentando o custo de processamento.",
          "A simplicidade de triagem e classificação dos itens retornados.",
          "A abundância de fornecedores especializados em coleta.",
          "O baixo custo de transporte de produtos retornados.",
        ],
        correct: 1,
        explanation:
          "Logística reversa é inerentemente mais complexa que a logística direta: volume imprevisível (depende do cliente), timing aleatório (devolução acontece quando o cliente decide), condições heterogêneas (produto intacto vs danificado vs para peças), múltiplas localizações de origem, e múltiplos destinos de destinação (revenda, reparo, reciclagem, descarte). Tudo isso eleva custo e exige flexibilidade.",
      },
    ],
  },

  "modulo-9": {
    id: "logistica-m9-quiz",
    title: "Logística na Petrobras",
    moduleNumber: 9,
    questions: [
      {
        id: 901,
        question:
          "Macaé (RJ) é considerada o maior polo logístico offshore do Brasil. Por que essa cidade tem essa posição estratégica?",
        options: [
          "Por ser o maior porto marítimo do Brasil em volume de contêineres.",
          "Por ser a base de apoio logístico mais próxima dos campos de petróleo do pré-sal e pós-sal da Bacia de Campos, concentrando bases de supply boats, heliponto, almoxarifados e empresas de serviços.",
          "Por possuir o maior refinaria da América Latina.",
          "Por ser o centro de distribuição de combustíveis para o Rio de Janeiro.",
          "Por ter o maior aeroporto de cargas do país.",
        ],
        correct: 1,
        explanation:
          "Macaé é a capital do petróleo brasileiro: concentra as bases de apoio offshore (bases logísticas que abastecem as plataformas), heliportos para rotação de pessoal, almoxarifados de materiais críticos, escritórios das principais operadoras e empresas de serviços. Sua posição geográfica é privilegiada para acesso à Bacia de Campos (principal produtora histórica do Brasil).",
      },
      {
        id: 902,
        question:
          "Os supply boats (embarcações de suprimento) utilizados pela Petrobras têm a função de:",
        options: [
          "Transportar petróleo bruto das plataformas para os terminais em terra.",
          "Abastecer as plataformas offshore com equipamentos, materiais de manutenção, alimentos, água, combustível e outros suprimentos necessários à operação contínua.",
          "Realizar o reboque de plataformas entre campos.",
          "Fazer inspeção submarina de dutos e equipamentos.",
          "Transportar passageiros (técnicos e engenheiros) entre plataformas.",
        ],
        correct: 1,
        explanation:
          "Supply boats (Platform Supply Vessels — PSVs): navios polivalentes que fazem a ligação logística terra-plataforma. Transportam: tubos, ferramentas, peças de reposição, químicos (metanol, inibidores), provisões (alimentos, água potável), cimento (para perfuração), resíduos de volta (logística reversa). Operam em ciclos regulares de abastecimento.",
      },
      {
        id: 903,
        question:
          "A Transpetro (subsidiária logística da Petrobras) é responsável principalmente por:",
        options: [
          "Exploração de petróleo em águas profundas.",
          "Operação e manutenção de oleodutos, gasodutos, polidutos e terminais aquaviários para transporte e distribuição de petróleo, derivados e biocombustíveis no Brasil.",
          "Comercialização de combustíveis nos postos Petrobras.",
          "Gestão dos recursos humanos da Petrobras.",
          "Construção de plataformas FPSO.",
        ],
        correct: 1,
        explanation:
          "Transpetro (Petrobras Transporte S.A.): maior empresa de transporte e armazenagem de combustíveis do Brasil. Opera: 7.000+ km de oleodutos e gasodutos, terminais aquaviários (portos) e terminais terrestres, além de frota de navios-tanque. Faz o elo entre refino/produção e distribuição regional. Essencial para garantir o abastecimento nacional de combustíveis.",
      },
      {
        id: 904,
        question:
          "O SIGA (Sistema Integrado de Gestão e Automação) da Petrobras é baseado em SAP e suporta a gestão logística principalmente em:",
        options: [
          "Apenas o controle financeiro e contábil.",
          "Gestão de materiais (MM), planejamento de manutenção (PM), gestão de estoques e almoxarifados, processamento de pedidos de compra e integração com fornecedores.",
          "Somente o planejamento de produção.",
          "Exclusivamente a gestão de recursos humanos.",
          "Apenas o controle de qualidade laboratorial.",
        ],
        correct: 1,
        explanation:
          "O SIGA-SAP da Petrobras integra módulos críticos para logística: MM (Materials Management) para gestão de 100.000+ SKUs em almoxarifados, PM (Plant Maintenance) para ordens de manutenção que geram demanda de materiais, WM (Warehouse Management), SD (Sales & Distribution) e integração EDI com fornecedores. É o backbone da gestão de suprimentos da empresa.",
      },
      {
        id: 905,
        question:
          "O conteúdo local mínimo exigido em contratos de exploração e produção de petróleo no Brasil impacta a logística da Petrobras porque:",
        options: [
          "Permite importar livremente todos os equipamentos sem restrições.",
          "Obriga a empresa a adquirir percentuais mínimos de bens e serviços de fornecedores nacionais, influenciando a estratégia de sourcing, a localização de armazéns e a cadeia de suprimentos regional.",
          "Reduz os custos logísticos por eliminar o frete internacional.",
          "Não tem impacto na gestão logística, apenas no financeiro.",
          "Obriga a usar apenas o modal rodoviário para transporte.",
        ],
        correct: 1,
        explanation:
          "Conteúdo local: exigência da ANP (Agência Nacional do Petróleo) para que operadoras utilizem % mínimo de bens/serviços nacionais em blocos exploratórios. Impactos logísticos: desenvolvimento de fornecedores locais (próximos às bases), negociação de contratos de suprimento antecipados, gestão de inventário para itens de longa espera, pressão sobre qualidade e prazo de entrega dos fornecedores nacionais.",
      },
      {
        id: 906,
        question:
          "O transporte de petróleo bruto da plataforma FPSO para os terminais em terra é realizado principalmente por:",
        options: [
          "Oleodutos submarinos exclusivamente.",
          "Navios-tanque aliviadores (VLCC, Suezmax, Aframax) que atracam na FPSO para transferência offshore de óleo bruto.",
          "Helicópteros de grande porte.",
          "Dutos terrestres de alta pressão.",
          "Barcaças fluviais.",
        ],
        correct: 1,
        explanation:
          "FPSOs (Floating Production Storage and Offloading) armazenam o óleo bruto produzido a bordo e realizam operações de offloading (transferência) para navios-tanque aliviadores (shuttle tankers). Classes: VLCC (Very Large Crude Carriers, >300.000 DWT), Suezmax (~150.000 DWT), Aframax (~100.000 DWT). O shuttle tanker leva o petróleo bruto ao terminal portuário (ex: Angra dos Reis, São Luís) para posterior refino ou exportação.",
      },
    ],
  },

  "modulo-10": {
    id: "logistica-m10-quiz",
    title: "Simulado Mestre",
    moduleNumber: 10,
    questions: [
      {
        id: 1001,
        question:
          "Uma empresa de distribuição de derivados de petróleo analisa sua operação logística e identifica os seguintes dados anuais: demanda de 24.000 unidades, custo por pedido de R$ 300, custo de manutenção de R$ 120/unidade/ano, e estoque de segurança de 200 unidades. Considerando EOQ = √(2DS/H), qual é o ponto de pedido se o lead time médio é de 15 dias e a demanda diária é de 65 unidades?",
        options: [
          "775 unidades.",
          "875 unidades",
          "975 unidades",
          "1.175 unidades",
          "1.375 unidades",
        ],
        correct: 2,
        explanation:
          "Ponto de Pedido = (Demanda diária × Lead time) + Estoque de segurança = (65 × 15) + 200 = 975 + 200 = 1.175 unidades. O EOQ seria: √(2 × 24.000 × 300 / 120) = √120.000 ≈ 346 unidades. O PP indica o nível de estoque em que deve ser acionado um novo pedido para não haver ruptura durante o lead time.",
      },
      {
        id: 1002,
        question:
          "A Petrobras está avaliando qual modal usar para transportar 50.000 toneladas de derivados entre Replan (SP) e a Região Norte. As opções são: rodoviário (R$ 180/t), ferroviário (R$ 95/t, prazo 8 dias) e aquaviário cabotagem (R$ 65/t, prazo 12 dias). O cliente aceita até 10 dias de prazo. Considerando apenas custo e prazo, qual decisão é correta?",
        options: [
          "Rodoviário, por ser o mais rápido.",
          "Ferroviário, pois atende ao prazo e é mais barato que o rodoviário.",
          "Aquaviário de cabotagem, por ser o mais barato, independente do prazo.",
          "Combinação rodoviário + ferroviário para dividir o custo.",
          "Aquaviário, pois 12 dias está dentro do prazo aceitável.",
        ],
        correct: 1,
        explanation:
          "O aquaviário (R$65/t) seria o mais barato, mas 12 dias ultrapassam o prazo máximo de 10 dias. O ferroviário (R$95/t, 8 dias) atende ao prazo e é 47% mais barato que o rodoviário (R$180/t). Portanto, a decisão correta é ferroviário. Economia: (180-95) × 50.000 = R$ 4.250.000. Esse tipo de análise de trade-off custo × prazo é clássico em provas CESGRANRIO.",
      },
      {
        id: 1003,
        question:
          "Um técnico de suprimentos da Petrobras analisa o estoque de uma peça crítica (válvula de segurança). Os dados mostram: classificação ABC = Classe A, lead time de 60 dias, demanda irregular (alto desvio-padrão), criticidade = alta (parada de produção se faltar). Qual estratégia de gestão de estoque é MAIS adequada?",
        options: [
          "Estoque zero (JIT), pois a peça é cara e o objetivo é reduzir custo.",
          "Estoque de segurança elevado, monitoramento permanente do ponto de pedido e política de múltiplos fornecedores qualificados para mitigar o risco de ruptura.",
          "Classificar como Classe C e fazer pedido apenas quando faltar.",
          "Usar LIFO para avaliação contábil e reduzir o giro.",
          "Terceirizar o gerenciamento para o fornecedor (VMI) sem monitoramento.",
        ],
        correct: 1,
        explanation:
          "Para peças críticas Classe A com lead time longo e alta variabilidade: (1) Alto estoque de segurança (custo de ruptura >> custo de estoque), (2) Monitoramento contínuo do ponto de pedido, (3) Múltiplos fornecedores qualificados (reduz dependência de fonte única), (4) Contratos de fornecimento emergencial. A lógica: o custo de parada de uma plataforma (US$ 8M/dia) justifica estoques mais altos para itens críticos.",
      },
      {
        id: 1004,
        question:
          "Uma distribuidora apresentou os seguintes dados de desempenho logístico no último trimestre: 2.000 pedidos entregues; 1.800 no prazo; 1.850 na quantidade correta; 1.680 atenderam ambas as condições (OTIF); 50 pedidos tiveram avarias; e 30 pedidos tiveram erro de faturamento. Qual é o Perfect Order Rate?",
        options: ["84%", "80%", "78%", "82%", "76%"],
        correct: 2,
        explanation:
          "Perfect Order exige TODOS os critérios: no prazo, quantidade correta, sem avaria, faturamento correto. Pedidos perfeitos = pedidos que atendem todos = OTIF(1.680) - avarias(50) - erros de faturamento(30) = 1.680 - 50 - 30 = 1.600 (aproximação — supondo que problemas não se sobrepõem). POR = 1.600/2.000 = 80%. Em provas, aplica-se: POR = 1.680/2.000 × (2.000-50)/2.000 × (2.000-30)/2.000 = 0,84×0,975×0,985 ≈ 80,7% ≈ 80%.",
      },
      {
        id: 1005,
        question:
          "O conceito de Supply Chain Resilience (resiliência da cadeia) ganhou destaque após a COVID-19. Quais estratégias AUMENTAM efetivamente a resiliência de uma cadeia de suprimentos?",
        options: [
          "Concentrar todos os fornecedores em um único país para reduzir custo de frete.",
          "Adotar JIT puro (estoque zero) em todos os elos da cadeia.",
          "Diversificação de fornecedores (multi-sourcing), estoques estratégicos de itens críticos, nearshoring de fornecedores estratégicos e visibilidade digital da cadeia estendida.",
          "Eliminar todos os acordos contratuais com fornecedores.",
          "Aumentar a complexidade do portfólio de produtos.",
        ],
        correct: 2,
        explanation:
          "Resiliência da cadeia de suprimentos: capacidade de antecipar, absorver, adaptar e recuperar-se de perturbações. Estratégias: (1) Multi-sourcing (múltiplos fornecedores por item crítico), (2) Estoques estratégicos de segurança para componentes críticos, (3) Nearshoring/reshoring (aproximar fornecedores), (4) Visibilidade end-to-end (saber onde cada material está), (5) Flexibilidade de capacidade (contratos de capacidade reservada). Trade-off: maior resiliência = maior custo operacional.",
      },
      {
        id: 1006,
        question:
          "A implementação de um WMS (Warehouse Management System) integrado a um TMS (Transportation Management System) e ao ERP (SAP) em uma empresa como a Petrobras proporciona principalmente:",
        options: [
          "Apenas redução de mão de obra no armazém.",
          "Visibilidade end-to-end do ciclo do pedido, desde a emissão da compra até a entrega ao destino, com rastreabilidade, otimização de processos, redução de erros e suporte à tomada de decisão logística em tempo real.",
          "Eliminação completa da necessidade de estoques físicos.",
          "Substituição de todos os processos manuais por robôs.",
          "Redução exclusiva do custo de armazenagem.",
        ],
        correct: 1,
        explanation:
          "A integração WMS + TMS + ERP cria um ecossistema de gestão logística integrada: WMS controla o armazém (posições, picking, inventário), TMS otimiza o transporte (rotas, frete, rastreamento), ERP consolida financeiro, compras e vendas. Juntos: visibilidade completa do pedido, redução de stockouts, otimização do nível de serviço vs custo, conformidade documental e suporte a decisões estratégicas de supply chain.",
      },
    ],
  },
};
