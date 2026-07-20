export const MODULE_CONTENTS: Record<number, any> = {
  1: {
    title: "Introdução à Logística e Cadeia de Suprimentos",
    paragraphs: [
      {
        index: "INTRO",
        text: `A logística contemporânea transcendeu sua função clássica de mero transporte e armazenagem para se consolidar como o eixo nevrálgico da vantagem competitiva corporativa. Historicamente, a logística originou-se no contexto militar (movimentação de tropas e suprimentos) e evoluiu para o ambiente empresarial no pós-Segunda Guerra Mundial, impulsionada pela necessidade de otimizar custos e maximizar a eficiência produtiva. No paradigma moderno, a logística é definida como o processo de planejamento, implementação e controle eficiente e eficaz do fluxo e armazenagem de bens, serviços e informações relacionadas, desde o ponto de origem até o ponto de consumo. Esse fluxo bidirecional e sistêmico visa, primordialmente, atender aos rigorosos requisitos dos clientes com o menor custo total possível, operando num delicado equilíbrio conhecido como trade-off logístico.

Aprofundando a visão estratégica, emerge o conceito de Gestão da Cadeia de Suprimentos (Supply Chain Management - SCM). Enquanto a logística tradicional possui um enfoque mais intraorganizacional (gerenciando estoques e frotas dentro das fronteiras da empresa), a Cadeia de Suprimentos abrange uma rede interconectada e interdependente de negócios. Ela engloba todas as atividades associadas ao fluxo de transformação de mercadorias, partindo dos fornecedores primários (extração da matéria-prima) até o usuário final, incluindo também o gerenciamento dos fluxos de informações e financeiros associados. A coordenação sistêmica desses fluxos entre parceiros comerciais rompe os tradicionais silos departamentais e corporativos, substituindo a competição isolada entre empresas isoladas pela competição global entre cadeias de suprimentos inteiras.

Na perspectiva da banca CESGRANRIO, e especialmente em certames como o da Petrobras, é fundamental distinguir com precisão a abrangência da Logística frente à Cadeia de Suprimentos. A logística é sistematicamente cobrada como uma "parte" integrante e operacional do gerenciamento da cadeia de suprimentos. O foco recai sobre a integração de processos logísticos chave: a logística Inbound (suprimentos), a logística interna (manufatura) e a logística Outbound (distribuição física). O candidato deve dominar a ideia de que o sucesso da cadeia não se mede pela otimização isolada de um elo (ex: minimizar custos de frete da fábrica), mas pela maximização do "superávit" total da cadeia (a diferença entre a receita gerada pelo cliente e os custos incorridos ao longo de toda a rede).`
      }
    ],
    flipCards: [
      {
        id: "fc-1-1",
        front: { title: "Logística", icon: "Truck" },
        back: { content: "Planejamento e controle do fluxo e armazenagem (bens e informações) do ponto de origem ao consumo." }
      },
      {
        id: "fc-1-2",
        front: { title: "Supply Chain", icon: "Network" },
        back: { content: "Rede interconectada que engloba toda a cadeia, de fornecedores de matéria-prima até o cliente final." }
      },
      {
        id: "fc-1-3",
        front: { title: "Inbound", icon: "ArrowDownToLine" },
        back: { content: "Logística de Suprimentos: foco na recepção, armazenagem provisória e abastecimento da produção." }
      },
      {
        id: "fc-1-4",
        front: { title: "Outbound", icon: "ArrowUpFromLine" },
        back: { content: "Distribuição Física: fluxo do produto acabado da fábrica/CD até o cliente final." }
      },
      {
        id: "fc-1-5",
        front: { title: "Trade-off", icon: "Scale" },
        back: { content: "O equilíbrio compensatório entre redução de custos logísticos e melhoria do nível de serviço." }
      },
      {
        id: "fc-1-6",
        front: { title: "CESGRANRIO", icon: "Target" },
        back: { content: "Foca na distinção: Logística é PARTE (operacional) do SCM (estratégico)." }
      }
    ],
    consolidation: {
      sinteseEstrategica: "A logística é a engrenagem interna de fluxo; a Supply Chain é a rede inteira. Dominar essa hierarquia é crucial para provas de suprimento.",
      videoLink: "https://www.youtube.com/embed/placeholder-logistica",
      audioLink: "https://open.spotify.com/embed/track/placeholder-logistica"
    }
  },
  2: {
    title: "Gestão da Cadeia de Suprimentos (SCM)",
    paragraphs: [
      {
        index: "INTRO",
        text: `A Gestão da Cadeia de Suprimentos (SCM - Supply Chain Management) representa a evolução holística da administração de materiais e da logística. O SCM propõe que as empresas não operem mais em ambientes fechados (sistema isolado), mas atuem de forma colaborativa com seus fornecedores, distribuidores, varejistas e até mesmos provedores de serviços logísticos (3PL). A premissa central é o compartilhamento contínuo de informações estratégicas (como previsões de demanda, níveis de estoque em tempo real e gargalos de capacidade). Esse nível de integração tem o poder de mitigar o devastador 'Efeito Chicote' (Bullwhip Effect), um fenômeno onde pequenas variações na demanda do consumidor final geram enormes distorções e acúmulos excessivos de estoque nos elos mais a montante da cadeia (fabricantes e fornecedores de matéria-prima).

Do ponto de vista estrutural, a SCM envolve três fluxos principais que ocorrem simultaneamente, mas não necessariamente na mesma direção. O fluxo de Produtos (materiais) segue predominantemente a jusante (downstream), do fornecedor para o consumidor final, com exceção da logística reversa. O fluxo de Informações é bidirecional, vital para coordenar pedidos, atualizar status de entregas e retroalimentar as previsões. Por fim, o fluxo Financeiro move-se a montante (upstream), fluindo dos consumidores em direção aos fornecedores na forma de pagamentos, financiamentos e faturamentos. O sucesso da implementação de uma estratégia SCM depende visceralmente da sincronia harmônica desses três fluxos, frequentemente viabilizada por sistemas robustos como o ERP (Enterprise Resource Planning).

No estilo da CESGRANRIO, as provas exigem a capacidade de identificar ferramentas e estratégias que aprimoram a integração da SCM. Conceitos como VMI (Vendor Managed Inventory - Estoque Gerenciado pelo Fornecedor), onde o fornecedor tem acesso aos dados de venda e decide quando e quanto repor, são figuras carimbadas. O aluno deve assimilar que a integração máxima da cadeia de suprimentos busca romper as barreiras burocráticas entre organizações parceiras, convertendo redes fragmentadas num organismo único e altamente reativo às demandas do mercado.`
      }
    ],
    flipCards: [
      {
        id: "fc-2-1",
        front: { title: "Efeito Chicote", icon: "Activity" },
        back: { content: "Distorção amplificada da demanda ao longo da cadeia devido à falta de comunicação integrada." }
      },
      {
        id: "fc-2-2",
        front: { title: "Downstream", icon: "ArrowRight" },
        back: { content: "A Jusante: fluxo que segue em direção ao consumidor final (ex: produtos acabados)." }
      },
      {
        id: "fc-2-3",
        front: { title: "Upstream", icon: "ArrowLeft" },
        back: { content: "A Montante: fluxo que segue em direção aos fornecedores originais (ex: fluxo financeiro)." }
      },
      {
        id: "fc-2-4",
        front: { title: "VMI", icon: "PackageCheck" },
        back: { content: "Estoque Gerenciado pelo Fornecedor: o fornecedor monitora e repõe o estoque do cliente automaticamente." }
      },
      {
        id: "fc-2-5",
        front: { title: "Colaboração", icon: "Handshake" },
        back: { content: "Eixo vital da SCM. Substitui as antigas negociações agressivas por parcerias estratégicas (ganha-ganha)." }
      },
      {
        id: "fc-2-6",
        front: { title: "CESGRANRIO", icon: "Target" },
        back: { content: "Fluxo material = Downstream. Fluxo Financeiro = Upstream. Efeito chicote cai constantemente." }
      }
    ],
    consolidation: {
      sinteseEstrategica: "SCM baseia-se em Colaboração, Integração e fluxo contínuo de Materiais, Informação e Dinheiro.",
      videoLink: "https://www.youtube.com/embed/placeholder-scm",
      audioLink: "https://open.spotify.com/embed/track/placeholder-scm"
    }
  },
  3: {
    title: "Logística de Inbound e Planejamento",
    paragraphs: [
      {
        index: "INTRO",
        text: `A Logística Inbound (ou Logística de Suprimentos) abarca todas as operações atreladas ao fluxo de materiais que entram na empresa. Ela engloba a gestão do transporte de compras, a programação de recebimento nas docas, a inspeção de qualidade de recebimento, e a movimentação primária para os armazéns ou direto para a linha de produção. Uma logística inbound deficiente pode ser fatal: o atraso de um único insumo crítico tem o poder de paralisar toda a linha de montagem, gerando ociosidade, atrasos generalizados nas entregas (impactando a Logística Outbound) e prejuízos milionários. Portanto, o planejamento rigoroso das janelas de recebimento e o desenvolvimento de fornecedores localizados de forma estratégica são vitais para a saúde da operação.

Para alinhar o recebimento às necessidades reais de produção, as empresas utilizam sistemas como o MRP (Material Requirements Planning - Planejamento das Necessidades de Materiais). O MRP é a espinha dorsal do planejamento de suprimentos na manufatura: a partir de uma estrutura de produto (BOM - Bill of Materials) e do Plano Mestre de Produção (MPS), ele calcula retroativamente as quantidades exatas e os prazos ideais para que as matérias-primas e componentes cheguem na fábrica. Isso minimiza estoques intermediários e assegura que os materiais estejam disponíveis no tempo e na quantidade corretos, alinhando a filosofia da Logística Inbound ao conceito fundamental do Just-in-Time (JIT).

Para as avaliações de suprimentos, é necessário dominar a interface entre Compras e Logística Inbound. A CESGRANRIO frequentemente explora cenários onde o aluno precisa identificar de quem é a responsabilidade por determinados fretes e riscos (os famosos Incoterms, como FOB e CIF, que definem exatamente onde termina a responsabilidade do vendedor e inicia a do comprador na logística de entrada). O entendimento claro de que Inbound significa abastecimento (foco em matéria-prima, controle de fornecedores e recebimento) garante ao candidato segurança na interpretação das questões de cadeia de suprimentos.`
      }
    ],
    flipCards: [
      {
        id: "fc-3-1",
        front: { title: "Inbound", icon: "ArrowDownCircle" },
        back: { content: "Processos de transporte e recebimento de mercadorias advindas de fornecedores para a empresa." }
      },
      {
        id: "fc-3-2",
        front: { title: "MRP", icon: "Calculator" },
        back: { content: "Material Requirements Planning. Calcula quanto e quando comprar componentes baseado no plano de produção." }
      },
      {
        id: "fc-3-3",
        front: { title: "BOM", icon: "ListTree" },
        back: { content: "Bill of Materials (Estrutura do Produto). A 'receita' que lista todos os componentes de um produto final." }
      },
      {
        id: "fc-3-4",
        front: { title: "FOB vs CIF", icon: "Ship" },
        back: { content: "Incoterms clássicos. FOB (Free on Board - risco passa no embarque). CIF (Cost, Insurance, Freight - frete/seguro pagos)." }
      },
      {
        id: "fc-3-5",
        front: { title: "Just-in-Time", icon: "Clock" },
        back: { content: "Filosofia atrelada ao Inbound eficiente: receber exatamente no momento do uso, eliminando estoques." }
      },
      {
        id: "fc-3-6",
        front: { title: "CESGRANRIO", icon: "Target" },
        back: { content: "Associa sempre Inbound a Matéria-Prima, Abastecimento e MRP/JIT." }
      }
    ],
    consolidation: {
      sinteseEstrategica: "Inbound = Chegada. Envolve planejamento rigoroso (MRP) para não faltar material nem gerar estoque excessivo.",
      videoLink: "https://www.youtube.com/embed/placeholder-inbound",
      audioLink: "https://open.spotify.com/embed/track/placeholder-inbound"
    }
  },
  4: {
    title: "Armazenagem e Movimentação de Materiais",
    paragraphs: [
      {
        index: "INTRO",
        text: `A armazenagem deixou de ser concebida como um mero espaço físico para estocar materiais ociosos e passou a ser entendida como um Centro de Distribuição (CD) dinâmico, um verdadeiro amortecedor estratégico de fluxo e agregação de valor. As operações de armazenagem incluem o recebimento, a consolidação, o endereçamento, a guarda física, o picking (separação de pedidos), o packing (embalagem) e a expedição. O custo de armazenagem (cost of carry) é um dos componentes mais pesados da logística, pois engloba aluguel, energia, depreciação, seguros, obsolescência e, sobretudo, o custo de oportunidade do capital investido naqueles itens parados.

Na gestão de armazéns modernos, a otimização de layout e a escolha correta dos sistemas de movimentação são determinantes. Operações ágeis utilizam técnicas como o Cross-Docking, uma estratégia que praticamente elimina a guarda física: as mercadorias chegam na doca de recebimento e são imediatamente roteirizadas e transferidas para a doca de expedição, sem passarem por estantes de estocagem (racks). Essa prática drástica exige altíssima sincronia de informação, frequentemente viabilizada por sistemas avançados de WMS (Warehouse Management System), leitura de códigos de barras, e identificação por radiofrequência (RFID).

O padrão CESGRANRIO foca com intensidade nas políticas de rotatividade de estoque (inventário). O aluno deve ter absoluta clareza sobre os métodos PEPS (Primeiro que Entra, Primeiro que Sai - FIFO), essencial para produtos perecíveis, o UEPS (Último que Entra, Primeiro que Sai - LIFO) e a Curva ABC, técnica baseada no Princípio de Pareto para priorização de controle físico (itens A têm alto valor e baixo volume, exigindo rigor no inventário). Entender a diferença entre Armazém Geral (depósito simples) e Centro de Distribuição (CD - foco no fluxo e resposta rápida) é uma cartada certa para ganhar pontos.`
      }
    ],
    flipCards: [
      {
        id: "fc-4-1",
        front: { title: "Picking", icon: "MousePointerClick" },
        back: { content: "Separação e coleta de produtos no armazém para montagem de pedidos dos clientes." }
      },
      {
        id: "fc-4-2",
        front: { title: "Cross-Docking", icon: "ArrowLeftRight" },
        back: { content: "Transferência direta do recebimento para a expedição, sem estocagem. Exige alta sincronia." }
      },
      {
        id: "fc-4-3",
        front: { title: "PEPS (FIFO)", icon: "ListOrdered" },
        back: { content: "Primeiro a Entrar, Primeiro a Sair. Evita perda de validade em produtos perecíveis." }
      },
      {
        id: "fc-4-4",
        front: { title: "Curva ABC", icon: "TrendingUp" },
        back: { content: "Classificação baseada em valor de consumo. Classe A (poucos itens, muito valor) exige controle rigoroso." }
      },
      {
        id: "fc-4-5",
        front: { title: "WMS", icon: "Server" },
        back: { content: "Warehouse Management System: o cérebro do armazém que controla posições, rotas de picking e estoques." }
      },
      {
        id: "fc-4-6",
        front: { title: "CESGRANRIO", icon: "Target" },
        back: { content: "Pegadinhas comuns trocando o conceito de PEPS e UEPS, e confundindo CD com Depósito Tradicional." }
      }
    ],
    consolidation: {
      sinteseEstrategica: "Armazém moderno é fluxo (CD), não depósito. O Cross-docking elimina estoques, e o WMS organiza o caos.",
      videoLink: "https://www.youtube.com/embed/placeholder-armazenagem",
      audioLink: "https://open.spotify.com/embed/track/placeholder-armazenagem"
    }
  },
  5: {
    title: "Modais de Transporte e Distribuição",
    paragraphs: [
      {
        index: "INTRO",
        text: `O transporte é, indubitavelmente, a engrenagem que consome a maior parcela dos custos logísticos de uma organização, e a escolha do modal adequado (ou a composição intermodal) define diretamente a competitividade do produto no mercado global. O Brasil apresenta uma matriz de transporte fortemente concentrada no modal rodoviário, que oferece flexibilidade insuperável de rotas e entrega porta a porta (door-to-door), embora seja onerado por altos custos variáveis, dependência de combustíveis fósseis e baixa segurança nas rodovias. Para granéis sólidos (como minérios e grãos), o modal ferroviário emerge como a solução técnica ideal, com alto custo de infraestrutura fixa, mas custo variável por tonelada-quilômetro muito inferior ao rodoviário.

Para o transporte de líquidos e gases em volumes contínuos (cenário crítico para a Petrobras), o modal dutoviário reina absoluto. Os dutos oferecem a operação mais segura, confiável e com menor custo de manutenção prolongada, imune a variações climáticas, embora exijam investimentos iniciais faraônicos e inflexibilidade de traçado. Há ainda o modal marítimo (cabotagem e longo curso), campeão indiscutível em capacidade de carga para longas distâncias, e o modal aéreo, que cobra o frete mais caro do mercado em troca da urgência e segurança máxima para cargas de altíssimo valor agregado (perecíveis nobres, eletrônicos, medicamentos).

Nas questões da CESGRANRIO, a matriz de modais é um tema clássico. O candidato deve ser capaz de comparar modais sob cinco critérios fundamentais: Velocidade, Consistência (pontualidade), Capacidade de Carga, Flexibilidade e Custo. Uma cobrança comum é o conceito de Intermodalidade (uso de dois ou mais modais com documentos de transporte distintos) versus Multimodalidade (múltiplos modais sob um único documento de transporte emitido por um Operador de Transporte Multimodal - OTM). Para provas na área de suprimentos (especialmente óleo e gás), o domínio absoluto das características e vantagens do modal dutoviário e marítimo é obrigatório.`
      }
    ],
    flipCards: [
      {
        id: "fc-5-1",
        front: { title: "Rodoviário", icon: "Truck" },
        back: { content: "Alta flexibilidade e serviço porta a porta. Custo variável alto e adequado a curtas/médias distâncias." }
      },
      {
        id: "fc-5-2",
        front: { title: "Ferroviário", icon: "Train" },
        back: { content: "Ideal para granéis e grandes volumes. Custo fixo alto, variável baixo. Menos flexível." }
      },
      {
        id: "fc-5-3",
        front: { title: "Dutoviário", icon: "Pipette" },
        back: { content: "Extremamente confiável e de baixo custo operacional. Alta rigidez e investimento inicial gigante. Foco Petrobras." }
      },
      {
        id: "fc-5-4",
        front: { title: "Aéreo", icon: "Plane" },
        back: { content: "Altíssima velocidade para cargas valiosas ou urgentes, mas com o frete mais caro do mercado." }
      },
      {
        id: "fc-5-5",
        front: { title: "Multimodalidade", icon: "Briefcase" },
        back: { content: "Uso de vários modais cobertos por apenas UM único documento de transporte (OTM)." }
      },
      {
        id: "fc-5-6",
        front: { title: "CESGRANRIO", icon: "Target" },
        back: { content: "Adora cobrar comparações (ex: dutos têm menor risco de roubo; rodovias têm a maior flexibilidade)." }
      }
    ],
    consolidation: {
      sinteseEstrategica: "Escolher o modal é equilibrar Custo vs Nível de Serviço. Dutos e Navios para volume, Caminhões para flexibilidade.",
      videoLink: "https://www.youtube.com/embed/placeholder-modais",
      audioLink: "https://open.spotify.com/embed/track/placeholder-modais"
    }
  },
  6: {
    title: "Logística Reversa e Sustentabilidade",
    paragraphs: [
      {
        index: "INTRO",
        text: `A Logística Reversa deixou de ser um mero apêndice do serviço de atendimento ao consumidor para se tornar uma obrigação legal e uma vantagem competitiva sustentável. Diferente da logística direta (onde o produto flui do fabricante para o consumidor), a logística reversa gerencia o fluxo oposto: o retorno de produtos, embalagens, peças ou resíduos do ponto de consumo para os pontos de origem, com o propósito de agregar-lhes valor (reúso, remanufatura, reciclagem) ou garantir sua disposição final ambientalmente adequada. Esse tema ganhou enorme tração no Brasil após a sanção da Política Nacional de Resíduos Sólidos (PNRS), que instituiu a responsabilidade compartilhada pelo ciclo de vida dos produtos.

Existem duas modalidades primárias de logística reversa: a de Pós-Venda e a de Pós-Consumo. A logística reversa de Pós-Venda lida com produtos que não foram utilizados ou que apresentaram falhas precoces, incluindo devoluções por defeito, recall, trocas no e-commerce ou giro lento de estoque. O foco aqui é reparar ou recondicionar o bem rapidamente para que ele volte ao ciclo comercial. Já a logística reversa de Pós-Consumo lida com produtos que chegaram ao fim de sua vida útil (como pneus velhos, baterias e lixo eletrônico) ou com suas embalagens (como garrafas PET). Aqui, o foco é a reciclagem, o desmanche seguro e o retorno da matéria-prima à cadeia produtiva, fechando o conceito da Economia Circular.

Nas avaliações da CESGRANRIO (foco em gestão e Petrobras), a sustentabilidade e a pegada ambiental são temas transversais e eliminatórios. O candidato precisa entender que a implantação da logística reversa, embora agregue custos operacionais complexos no curto prazo, promove a mitigação de riscos de imagem corporativa e conformidade legal. A banca gosta de testar se o aluno sabe diferenciar o canal reverso de Pós-Venda do canal de Pós-Consumo, e enfatizar o papel da responsabilidade socioambiental na cadeia de suprimentos contemporânea.`
      }
    ],
    flipCards: [
      {
        id: "fc-6-1",
        front: { title: "Logística Reversa", icon: "RotateCcw" },
        back: { content: "Gerencia o fluxo físico de volta: do ponto de consumo até o ponto de origem." }
      },
      {
        id: "fc-6-2",
        front: { title: "Pós-Venda", icon: "RefreshCw" },
        back: { content: "Retorno de produtos com defeito, trocas, erro de emissão de pedido ou recalls comerciais." }
      },
      {
        id: "fc-6-3",
        front: { title: "Pós-Consumo", icon: "Trash2" },
        back: { content: "Retorno de bens no fim de sua vida útil ou embalagens para reciclagem/descarte adequado." }
      },
      {
        id: "fc-6-4",
        front: { title: "Economia Circular", icon: "Recycle" },
        back: { content: "Modelo que busca eliminar o lixo e o uso contínuo de recursos. A logística reversa é o seu motor." }
      },
      {
        id: "fc-6-5",
        front: { title: "PNRS", icon: "Leaf" },
        back: { content: "Política Nacional de Resíduos Sólidos. Obrigou empresas a estruturarem a logística reversa no Brasil." }
      },
      {
        id: "fc-6-6",
        front: { title: "CESGRANRIO", icon: "Target" },
        back: { content: "Gosta de testar a diferença entre Pós-Venda (troca/garantia) e Pós-Consumo (descarte ecológico)." }
      }
    ],
    consolidation: {
      sinteseEstrategica: "Logística Reversa é lei e estratégia. Pós-venda para retorno de defeitos; pós-consumo para reciclagem de fim de vida.",
      videoLink: "https://www.youtube.com/embed/placeholder-reversa",
      audioLink: "https://open.spotify.com/embed/track/placeholder-reversa"
    }
  },
  7: {
    title: "Custos Logísticos e KPIs de Desempenho",
    paragraphs: [
      {
        index: "INTRO",
        text: `O gerenciamento logístico de alto impacto é pautado pela premissa: "o que não se mede, não se gerencia". Os custos logísticos geralmente consomem a segunda maior fatia das despesas operacionais de uma empresa, perdendo apenas para o custo da mercadoria vendida. O mapeamento desses custos inclui o Custo de Transporte (frete, pedágio, combustível), o Custo de Manutenção de Estoque (capital empatado, seguro, obsolescência e furtos), o Custo de Armazenagem (aluguel do CD, pessoal, WMS) e o Custo Administrativo do Processamento de Pedidos. O objetivo gerencial não é simplesmente achatar cada custo isoladamente, mas sim balanceá-los para minimizar o Custo Total. Reduzir brutalmente os custos de transporte usando modais lentos, por exemplo, aumentará perigosamente os custos de manutenção de estoque e o risco de desabastecimento (trade-off logístico).

Para controlar e avaliar a saúde dessa complexa equação de custos e serviços, a cadeia de suprimentos baseia-se em KPIs (Key Performance Indicators). Indicadores logísticos operacionais avaliam se a empresa está entregando a promessa feita ao mercado. O KPI absoluto do sucesso logístico é o OTIF (On-Time In-Full): ele mensura o percentual de pedidos entregues exatamente no prazo combinado (On-Time) e perfeitamente completos e sem avarias (In-Full). Outro indicador crucial é o Giro de Estoques, que mede a velocidade com que o inventário é vendido e reposto ao longo de um ano. Giros altos indicam eficiência operacional e baixo capital imobilizado.

No padrão CESGRANRIO, as cobranças sobre KPIs envolvem cenários analíticos onde o aluno precisa diagnosticar um problema. Se o OTIF da empresa caiu vertiginosamente após a contratação de uma transportadora mais barata, o trade-off gerou perda de nível de serviço. O conceito do Custo de Oportunidade do Estoque é amplamente abordado: é o lucro cessante de ter capital congelado em galpões, em vez de aplicado no mercado financeiro ou em inovações de núcleo da empresa.`
      }
    ],
    flipCards: [
      {
        id: "fc-7-1",
        front: { title: "Trade-off de Custos", icon: "Scales" },
        back: { content: "A redução de um custo (ex: frete lento) pode inflar drasticamente outro (ex: manutenção de estoque elevado)." }
      },
      {
        id: "fc-7-2",
        front: { title: "Custo de Manutenção", icon: "Landmark" },
        back: { content: "Inclui juros do capital empatado, deterioração, roubo e custos de seguro do estoque parado." }
      },
      {
        id: "fc-7-3",
        front: { title: "KPI", icon: "BarChart3" },
        back: { content: "Key Performance Indicator. Métricas que avaliam a performance estratégica e operacional do processo logístico." }
      },
      {
        id: "fc-7-4",
        front: { title: "OTIF", icon: "BadgeCheck" },
        back: { content: "On-Time In-Full. A 'métrica rainha': produto entregue no prazo (On-Time) e completo/sem defeito (In-Full)." }
      },
      {
        id: "fc-7-5",
        front: { title: "Giro de Estoque", icon: "Activity" },
        back: { content: "Quantas vezes o estoque foi renovado no ano. Um giro alto é sinônimo de capital livre e produtos frescos." }
      },
      {
        id: "fc-7-6",
        front: { title: "CESGRANRIO", icon: "Target" },
        back: { content: "Destaque para o OTIF. A banca avalia se você entende que custo mínimo de transporte não compensa o OTIF baixo." }
      }
    ],
    consolidation: {
      sinteseEstrategica: "Custos formam um ecossistema delicado. Avaliamos a eficácia usando o OTIF, a métrica de ouro do nível de serviço.",
      videoLink: "https://www.youtube.com/embed/placeholder-kpis",
      audioLink: "https://open.spotify.com/embed/track/placeholder-kpis"
    }
  },
  8: {
    title: "Tecnologias na Logística (WMS, TMS, RFID)",
    paragraphs: [
      {
        index: "INTRO",
        text: `A digitalização e a rastreabilidade em tempo real são as bases da logística de classe mundial e do Supply Chain 4.0. No chão do armazém, o software soberano é o WMS (Warehouse Management System). Esse sistema gerencia de forma autônoma a complexidade do Centro de Distribuição: ele determina onde um palete que acabou de chegar deve ser guardado (endereçamento lógico), traça a rota de separação mais curta para o operador (picking) e atualiza o inventário no exato milissegundo em que o código de barras é bipado. Fora das paredes do armazém, na rodovia ou no mar, o controle passa para o TMS (Transportation Management System). O TMS é responsável por auditar fretes, montar roteirizações otimizadas de entrega (vehicle routing) e rastrear a frota via telemetria e GPS, garantindo o monitoramento do OTIF.

A evolução do código de barras bidimensional (QR Code e afins) culminou na aplicação prática do RFID (Identificação por Radiofrequência). Diferente do código de barras, que exige leitura óptica de campo visual direto e unitário, as tags (etiquetas) RFID emitem sinais de rádio contendo as informações completas do produto. Um portal RFID instalado nas docas de um armazém consegue ler, num único segundo, o conteúdo de centenas de caixas dentro de um caminhão fechado, sem nenhuma intervenção manual. Isso colapsa o tempo de recebimento logístico e eleva a acurácia dos inventários para quase 100%, reduzindo significativamente os custos invisíveis de perdas de estoque (shrinkage).

Para a CESGRANRIO e bancas correlatas, a associação funcional das siglas tecnológicas é questão certa em provas de administração e logística. O candidato deve mapear perfeitamente a tríade tecnológica: ERP (cérebro financeiro e contábil corporativo), WMS (executor focado no fluxo interno de estocagem) e TMS (gestor focado nas frotas, rotas e fretes externos). Confundir WMS com TMS é um erro fatal que a banca tenta induzir.`
      }
    ],
    flipCards: [
      {
        id: "fc-8-1",
        front: { title: "WMS", icon: "Boxes" },
        back: { content: "Sistema focado em gerir o ARMAZÉM: posições, picking, packing e acurácia interna." }
      },
      {
        id: "fc-8-2",
        front: { title: "TMS", icon: "Truck" },
        back: { content: "Sistema focado no TRANSPORTE: roteirização, rastreamento de carga e auditoria de faturas de frete." }
      },
      {
        id: "fc-8-3",
        front: { title: "ERP", icon: "Building" },
        back: { content: "O sistema de gestão central da empresa (compras, finanças, contabilidade) ao qual TMS e WMS se plugam." }
      },
      {
        id: "fc-8-4",
        front: { title: "RFID", icon: "Wifi" },
        back: { content: "Identificação por Rádiofrequência. Leitura passiva em lote, sem necessidade de contato visual com a etiqueta." }
      },
      {
        id: "fc-8-5",
        front: { title: "Telemetria", icon: "Activity" },
        back: { content: "Uso de sensores via satélite para gerenciar consumo do veículo, estilo de direção e prevenir roubos no TMS." }
      },
      {
        id: "fc-8-6",
        front: { title: "CESGRANRIO", icon: "Target" },
        back: { content: "A pegadinha eterna: o TMS otimiza transportes (fora da empresa); o WMS otimiza endereçamento (dentro da empresa)." }
      }
    ],
    consolidation: {
      sinteseEstrategica: "WMS manda dentro do depósito. TMS comanda os caminhões lá fora. RFID traz visão raio-x em tempo real.",
      videoLink: "https://www.youtube.com/embed/placeholder-tech",
      audioLink: "https://open.spotify.com/embed/track/placeholder-tech"
    }
  },
  9: {
    title: "Planejamento de Demanda e Estoque de Segurança",
    paragraphs: [
      {
        index: "INTRO",
        text: `O calcanhar de Aquiles de qualquer cadeia de suprimentos é a variabilidade imponderável da demanda e os atrasos (lead times) nos fornecimentos. A ferramenta primária para enfrentar esse caos é o Planejamento de Demanda (Forecasting). Ele utiliza algoritmos matemáticos e séries temporais baseadas no histórico de vendas (métodos quantitativos) associados à intuição e inteligência de mercado dos especialistas (métodos qualitativos, como o Painel Delphi) para prever o quanto será consumido no futuro. A qualidade da previsão dita todo o ritmo do fluxo downstream e upstream; uma previsão equivocada gera excessos de estoque indesejados (capital preso) ou ruptura brutal das prateleiras (stockouts), prejudicando o cliente final e penalizando a marca.

Contudo, nenhuma previsão é perfeitamente acurada (a Lei de Murphy é o pilar da estatística em estoques). Para absorver essas flutuações inevitáveis e manter um serviço impecável (Nível de Serviço), a logística dimensiona os Estoques de Segurança (Buffer Stocks). O dimensionamento do estoque de segurança é um cálculo estatístico requintado que leva em consideração a volatilidade (desvio padrão) da demanda diária do cliente, a volatilidade no tempo de entrega (lead time) dos fornecedores e o nível de serviço desejado pela diretoria (ex: 95% de disponibilidade garantida exige um estoque de segurança bem menor que 99% de disponibilidade, visto que o crescimento do estoque de segurança é exponencial nos limites máximos).

Nas provas da CESGRANRIO, a dicotomia fundamental é identificar quando usar estoques isoladores e o impacto dos lead times. As questões exploram o fato de que estoques são "males necessários": eles existem essencialmente para cobrir a ineficiência do lead time e a imprevisibilidade da demanda. Métodos de reposição como o Sistema Ponto de Pedido (acionado quando o estoque cai a um limite) e o Sistema de Revisão Periódica (analisado em janelas fixas de tempo) formam o núcleo das cobranças de planejamento de materiais.`
      }
    ],
    flipCards: [
      {
        id: "fc-9-1",
        front: { title: "Forecasting", icon: "LineChart" },
        back: { content: "Previsão de demanda quantitativa (dados históricos) e qualitativa (intuição do mercado)." }
      },
      {
        id: "fc-9-2",
        front: { title: "Lead Time", icon: "Hourglass" },
        back: { content: "Tempo de ressuprimento. O tempo total decorrido desde a emissão do pedido até a disponibilidade do item." }
      },
      {
        id: "fc-9-3",
        front: { title: "Estoque Segurança", icon: "ShieldCheck" },
        back: { content: "O amortecedor criado exclusivamente para cobrir falhas de lead time ou picos inesperados na demanda." }
      },
      {
        id: "fc-9-4",
        front: { title: "Ponto de Pedido", icon: "Bell" },
        back: { content: "Nível exato de estoque que, ao ser atingido, dispara o alarme para um novo pedido de compra." }
      },
      {
        id: "fc-9-5",
        front: { title: "Nível de Serviço", icon: "Star" },
        back: { content: "A probabilidade estatística de não ocorrer falta de produto no armazém (stockout)." }
      },
      {
        id: "fc-9-6",
        front: { title: "CESGRANRIO", icon: "Target" },
        back: { content: "Se o lead time do fornecedor aumenta, a empresa deve obrigatoriamente aumentar o estoque de segurança." }
      }
    ],
    consolidation: {
      sinteseEstrategica: "Previsões não são perfeitas. O Estoque de Segurança é o 'seguro de vida' do nível de serviço contra atrasos e sustos de demanda.",
      videoLink: "https://www.youtube.com/embed/placeholder-demanda",
      audioLink: "https://open.spotify.com/embed/track/placeholder-demanda"
    }
  },
  10: {
    title: "Gestão de Parcerias e Operadores Logísticos",
    paragraphs: [
      {
        index: "INTRO",
        text: `A complexidade da logística moderna empurrou as grandes organizações a um movimento estratégico inexorável: focar em seu Core Business (competência essencial e negócio principal) e delegar as complexas operações de distribuição para especialistas. Isso fomenta a contratação dos Operadores Logísticos Terceirizados (3PL - Third Party Logistics). Um operador 3PL não apenas aluga um galpão e fornece caminhões; ele integra armazéns, tecnologias WMS/TMS de ponta e capacidade de malha rodoviária. Ao terceirizar para um 3PL de classe mundial, a empresa transforma pesados custos logísticos fixos e frota (Capex) em custos variáveis atrelados à venda efetiva (Opex), ganhando robustez financeira e maleabilidade de escala.

Além do 3PL, o modelo mais avançado de integração estratégica atinge o patamar de 4PL (Fourth Party Logistics) ou Lead Logistics Provider. Ao contrário do 3PL, o 4PL muitas vezes não possui ativos físicos pesados, galpões ou caminhões. O foco do provedor 4PL é atuar como uma sofisticada torre de controle cibernética: ele desenha, constrói e opera toda a estratégia da cadeia de suprimentos do cliente. O 4PL audita, coordena e gerencia múltiplos provedores 3PLs subordinados. Essa evolução reflete a mudança de uma logística baseada puramente na musculatura dos motores para uma logística ancorada no domínio algorítmico da informação e inteligência artificial aplicadas ao Supply Chain.

Nas exigências da banca CESGRANRIO, o papel das parcerias logísticas e a quebra das barreiras dos silos corporativos são fundamentais. A banca costuma colocar situações hipotéticas exigindo distinguir entre primarização (empresa frotista gerindo seu próprio pátio) e terceirização completa (uso do 3PL). Destaca-se a importância dos KPIs atrelados aos acordos de nível de serviço (SLA - Service Level Agreements), os quais balizam os prêmios e punições no contrato entre a empresa (embarcador) e o Operador Logístico contratado.`
      }
    ],
    flipCards: [
      {
        id: "fc-10-1",
        front: { title: "3PL", icon: "Truck" },
        back: { content: "Third Party Logistics. Operador que executa armazenagem e transporte (possui os ativos físicos/galpões)." }
      },
      {
        id: "fc-10-2",
        front: { title: "4PL", icon: "TowerControl" },
        back: { content: "Gestor logístico de 4ª Parte (Torre de Controle). Fornece tecnologia e gerencia 3PLs sem deter ativos físicos pesados." }
      },
      {
        id: "fc-10-3",
        front: { title: "Core Business", icon: "Goal" },
        back: { content: "Atividade principal e geradora de valor da empresa. A terceirização logística visa focar energia nisso." }
      },
      {
        id: "fc-10-4",
        front: { title: "Capex vs Opex", icon: "TrendingDown" },
        back: { content: "Terceirizar reduz gastos altos de capital fixo (frota/Capex) e aumenta os gastos variáveis flexíveis (frete/Opex)." }
      },
      {
        id: "fc-10-5",
        front: { title: "SLA", icon: "FileSignature" },
        back: { content: "Service Level Agreement. Acordo que define obrigações e multas se o operador logístico não atingir o nível prometido." }
      },
      {
        id: "fc-10-6",
        front: { title: "CESGRANRIO", icon: "Target" },
        back: { content: "Compreender que o 4PL gerencia todo o escopo estratégico, muitas vezes coordenando vários operadores 3PL menores." }
      }
    ],
    consolidation: {
      sinteseEstrategica: "Terceirizar logística é deixar os 'motores pesados' com especialistas (3PL) ou confiar todo o 'cérebro logístico' a uma Torre de Controle (4PL).",
      videoLink: "https://www.youtube.com/embed/placeholder-operadores",
      audioLink: "https://open.spotify.com/embed/track/placeholder-operadores"
    }
  }
};
