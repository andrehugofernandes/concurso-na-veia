export const MODULE_CONTENTS: Record<number, any> = {
  1: {
    title: "O Processo de Compras nas Organizações",
    paragraphs: [
      {
        index: "INTRO",
        text: `O departamento de compras, historicamente relegado a uma função meramente burocrática e reativa (focada em preencher formulários e cobrar entregas), sofreu uma revolução copernicana nas últimas décadas. Na administração contemporânea, Compras ascendeu ao patamar de Gestão Estratégica de Suprimentos (Strategic Sourcing). Essa transformação ocorreu pela constatação matemática de que o custo dos materiais e serviços adquiridos representa frequentemente de 50% a 70% das receitas brutas de uma empresa manufatureira. Consequentemente, cada centavo economizado em compras (saving) flui direta e integralmente para o lucro líquido da empresa (bottom line), possuindo um efeito alavancagem muito superior a um aumento equivalente no volume de vendas.

O processo tradicional de compras é estruturado em um ciclo lógico e sequencial. Ele inicia-se com o reconhecimento da necessidade pela área usuária (requisição de material), passa pela definição minuciosa das especificações técnicas, seleção das fontes de suprimento (prospecção de mercado), emissão do pedido de cotação (RFQ - Request For Quotation), análise das propostas comerciais, negociação, emissão do Pedido de Compra (PO - Purchase Order), follow-up (diligenciamento para garantir a entrega no prazo), recebimento físico e fiscal, e encerra-se com a aprovação da fatura para pagamento (procure-to-pay). No setor público e em empresas de economia mista como a Petrobras, esse ciclo é rigorosamente pautado por legislações específicas (como a Lei 13.303/16), visando transparência, impessoalidade e a seleção da proposta mais vantajosa.

A banca CESGRANRIO tem forte predileção por cobrar as diferenças entre o "comprador tirador de pedido" e o "comprador estratégico". As questões frequentemente exigem que o candidato reconheça o Custo Total de Aquisição (TCO - Total Cost of Ownership) como o verdadeiro critério de decisão, rejeitando a antiga miopia de focar apenas no menor preço de face da nota fiscal. O TCO engloba o preço de compra mais os custos embutidos de frete, inspeção de qualidade, manutenção, operação e até o custo do descarte do item ao fim de sua vida útil.`
      }
    ],
    flipCards: [
      {
        id: "fc-1-1",
        front: { title: "Compras Estratégicas", icon: "Target" },
        back: { content: "Mudança do foco reativo (tirador de pedido) para a proatividade, buscando maximizar o valor e gerir parcerias." }
      },
      {
        id: "fc-1-2",
        front: { title: "Efeito Alavancagem", icon: "TrendingUp" },
        back: { content: "O impacto direto que a economia em compras (saving) tem sobre o aumento do lucro líquido da empresa." }
      },
      {
        id: "fc-1-3",
        front: { title: "Procure-to-Pay", icon: "Repeat" },
        back: { content: "O ciclo completo de compras: da requisição interna inicial até o efetivo pagamento da fatura ao fornecedor." }
      },
      {
        id: "fc-1-4",
        front: { title: "TCO", icon: "Calculator" },
        back: { content: "Total Cost of Ownership (Custo Total de Propriedade). O preço de face + frete + operação + manutenção + descarte." }
      },
      {
        id: "fc-1-5",
        front: { title: "Diligenciamento (Follow-up)", icon: "Eye" },
        back: { content: "Acompanhamento rigoroso do pedido de compra para garantir que o fornecedor entregará no prazo acordado." }
      },
      {
        id: "fc-1-6",
        front: { title: "CESGRANRIO", icon: "PenTool" },
        back: { content: "Sempre repudia a ideia de que Compras deve buscar 'apenas o menor preço isolado' sem olhar para a qualidade e TCO." }
      }
    ],
    consolidation: {
      sinteseEstrategica: "Compras não é mais o setor que carimba papéis. É a linha de frente financeira. Economizar bem é tão importante quanto vender muito.",
      videoLink: "https://www.youtube.com/embed/placeholder-compras-processo",
      audioLink: "https://open.spotify.com/embed/track/placeholder-compras-processo"
    }
  },
  2: {
    title: "Planejamento de Necessidades de Materiais",
    paragraphs: [
      {
        index: "INTRO",
        text: `Nenhuma decisão de compras pode ser desvinculada do planejamento da produção e do gerenciamento de estoques. O planejamento de necessidades de materiais orbita ao redor da questão existencial de suprimentos: "o que comprar, quanto comprar e quando comprar?". A resposta para a manufatura moderna encontra-se em sistemas lógicos como o MRP (Material Requirements Planning). O MRP difere radicalmente do sistema clássico de ponto de pedido (baseado no consumo histórico), pois ele opera com base na demanda dependente. Isto é, a necessidade de compra do pneu não é prevista isoladamente, mas sim calculada regressivamente com base no número de carros que a fábrica planeja montar no mês que vem, deduzido o estoque atual e considerando o tempo de entrega do fornecedor (lead time).

Para que o MRP e o planejamento de suprimentos funcionem com precisão, a área de Compras depende de parâmetros absolutos. O Lead Time (Tempo de Ressuprimento) deve ser negociado e cumprido rigorosamente pelo fornecedor. Se o comprador cadastra no sistema que o chassi demora 15 dias para chegar, o sistema avisará para emitir o pedido com 15 dias de antecedência. O Lote Econômico de Compra (LEC) é outra ferramenta matemática vital: ele tenta equilibrar o custo de emitir um pedido (que cai quanto mais se compra) com o custo de manter o estoque (que sobe quanto mais se guarda), apontando a quantidade exata que minimiza a soma desses dois custos.

No contexto das provas de concursos públicos e seleções da CESGRANRIO, o Lote Econômico e o MRP são frequentemente abordados conceitualmente. O aluno precisa saber que o MRP utiliza o Plano Mestre de Produção (MPS) e a Estrutura Analítica do Produto (BOM) para "explodir" as necessidades brutas em pedidos líquidos de compra. Da mesma forma, compreender que a adoção do Just-in-Time (JIT) e do sistema Kanban exige fornecedores com alto nível de maturidade, localizados estrategicamente perto da fábrica e dispostos a fazer entregas fracionadas e diárias.`
      }
    ],
    flipCards: [
      {
        id: "fc-2-1",
        front: { title: "Demanda Dependente", icon: "Link" },
        back: { content: "Demanda derivada da produção de outro item (ex: a demanda por volantes depende da produção de carros)." }
      },
      {
        id: "fc-2-2",
        front: { title: "MRP", icon: "Cpu" },
        back: { content: "Planeja as aquisições cruzando a receita do produto (BOM), o estoque disponível e a meta de produção (MPS)." }
      },
      {
        id: "fc-2-3",
        front: { title: "Lead Time", icon: "Timer" },
        back: { content: "Tempo de Espera/Ressuprimento. Intervalo entre a detecção da necessidade e a chegada efetiva do material." }
      },
      {
        id: "fc-2-4",
        front: { title: "LEC", icon: "Scale" },
        back: { content: "Lote Econômico de Compras. A quantidade perfeita de pedido que equilibra os custos de pedir e de estocar." }
      },
      {
        id: "fc-2-5",
        front: { title: "Kanban", icon: "Trello" },
        back: { content: "Ferramenta visual (cartões) do sistema Just-in-Time que puxa a produção e os suprimentos na medida exata." }
      },
      {
        id: "fc-2-6",
        front: { title: "CESGRANRIO", icon: "Target" },
        back: { content: "Foca em distinguir que Demanda Independente usa previsões de venda, e Demanda Dependente usa cálculo de MRP." }
      }
    ],
    consolidation: {
      sinteseEstrategica: "O MRP é a máquina de calcular de compras: ele diz exatamente quanto e quando comprar com base no que a fábrica vai montar.",
      videoLink: "https://www.youtube.com/embed/placeholder-mrp",
      audioLink: "https://open.spotify.com/embed/track/placeholder-mrp"
    }
  },
  3: {
    title: "Seleção e Homologação de Fornecedores",
    paragraphs: [
      {
        index: "INTRO",
        text: `O mercado fornecedor de uma empresa é a sua extensão operacional. O risco de uma paralisação, de um vazamento ambiental ou de uma quebra de qualidade que ocorra no fornecedor recairá quase integralmente sobre a marca do cliente (responsabilidade solidária e dano de imagem). Portanto, antes que o primeiro pedido de compra seja emitido, a empresa conduz o processo crítico de Seleção e Homologação. A seleção envolve a busca (sourcing) por empresas capazes de fornecer determinado escopo. A homologação é a fase de diligência devida (due diligence): uma investigação holística onde o fornecedor submete suas demonstrações contábeis (avaliação de risco financeiro), atestados de capacidade técnica e comprovações de compliance fiscal, trabalhista e ambiental (ex: certificação ISO 14001).

Dentro da homologação, corporações robustas, como a Petrobras, adotam Cadastros de Fornecedores (como o Petronect), exigindo que a empresa passe por avaliações rigorosas de SMS (Segurança, Meio Ambiente e Saúde). Uma vez homologado, o fornecedor não recebe um 'cheque em branco' definitivo. Ele passa a ser sistematicamente medido através do Índice de Qualidade do Fornecedor (IQF) ou *Supplier Performance Evaluation*. Essas métricas julgam fatores como o OTIF (entrega no prazo e na quantidade certa), o índice de rejeição de lotes pela inspeção de qualidade, e o nível de inovação proposto. Fornecedores que falham recorrentemente sofrem sanções (vendor rating ruim) ou são bloqueados para novas compras.

Na perspectiva de concursos, o candidato deve ter em mente a técnica da "Redução da Base de Fornecedores" (Single Sourcing vs Multiple Sourcing). O paradigma antigo ditava que uma empresa deveria ter dezenas de fornecedores para o mesmo item a fim de jogá-los uns contra os outros por centavos. O Supply Chain moderno, ao contrário, defende a redução dessa base, concentrando volumes em menos parceiros (Dual Sourcing ou até Single Sourcing estratégico) para fomentar a confiança, a co-engenharia, reduzir a variabilidade técnica e garantir maior alavancagem de preços através do volume aglutinado.`
      }
    ],
    flipCards: [
      {
        id: "fc-3-1",
        front: { title: "Homologação", icon: "ShieldCheck" },
        back: { content: "Processo de verificação de risco financeiro, legal e técnico antes de permitir que uma empresa venda para você." }
      },
      {
        id: "fc-3-2",
        front: { title: "Sourcing", icon: "Search" },
        back: { content: "A atividade de prospectar e mapear o mercado em busca de novos fornecedores e inovações." }
      },
      {
        id: "fc-3-3",
        front: { title: "Vendor Rating", icon: "StarHalf" },
        back: { content: "Avaliação contínua de desempenho do fornecedor (IQF), baseada em critérios como prazo, qualidade e custo." }
      },
      {
        id: "fc-3-4",
        front: { title: "Single Sourcing", icon: "UserCheck" },
        back: { content: "Estratégia de usar um único fornecedor para um item, visando máxima parceria técnica e grandes descontos de volume." }
      },
      {
        id: "fc-3-5",
        front: { title: "Risco de Fornecimento", icon: "AlertTriangle" },
        back: { content: "O risco de o single sourcing gerar dependência extrema, falência do fornecedor ou quebra da cadeia." }
      },
      {
        id: "fc-3-6",
        front: { title: "CESGRANRIO", icon: "Target" },
        back: { content: "Avalia a distinção entre compras pontuais e a homologação formal necessária (especialmente à luz da lei das estatais)." }
      }
    ],
    consolidation: {
      sinteseEstrategica: "Não se compra no escuro. A Homologação filtra o risco legal/técnico; o Vendor Rating audita a entrega no dia a dia.",
      videoLink: "https://www.youtube.com/embed/placeholder-homologacao",
      audioLink: "https://open.spotify.com/embed/track/placeholder-homologacao"
    }
  },
  4: {
    title: "Negociação em Compras e Parcerias",
    paragraphs: [
      {
        index: "INTRO",
        text: `A negociação em compras evoluiu da clássica "barganha de bazar" para um complexo processo analítico de construção de acordos de longo prazo. Na visão tradicional e obsoleta (conhecida como negociação distributiva ou de soma zero), o comprador tenta exprimir ao máximo a margem de lucro do fornecedor. Se o comprador ganha 10 reais de desconto, o fornecedor perde 10 reais. Esse modelo corrói a relação de confiança e incentiva o fornecedor a cortar qualidade ou prazos para sobreviver. A teoria moderna adota o modelo da Escola de Negociação de Harvard, focado na Negociação Integrativa (ganha-ganha). Aqui, a meta é "aumentar o bolo antes de dividi-lo", separando as pessoas do problema e focando nos interesses subjacentes, não nas posições declaradas rigidamente à mesa.

Um conceito basilar em qualquer negociação profissional de suprimentos é o BATNA (Best Alternative to a Negotiated Agreement), traduzido como MAPAN (Melhor Alternativa para um Acordo Negociado). O BATNA representa o 'plano B' do comprador fora da mesa. Se as negociações com o fornecedor A fracassarem, qual é a alternativa real? Comprar do fornecedor B? Produzir internamente (Make or Buy)? Quanto mais forte o BATNA do comprador, maior o seu poder de barganha (ZOPA - Zona de Possível Acordo). Um comprador jamais deve entrar em uma negociação complexa sem calcular perfeitamente o seu BATNA e estimar o BATNA da outra parte.

Nas questões de concurso, o domínio das posturas de negociação é essencial. A CESGRANRIO gosta de descrever cenários comportamentais e solicitar que o candidato os classifique. O aluno precisa diferenciar táticas coercitivas de táticas colaborativas, e entender o modelo de Compras baseadas em Parceria (Comakership). No Comakership, o fornecedor se torna praticamente uma extensão da fábrica do cliente, trabalhando em projetos conjuntos de engenharia, dividindo os ganhos de produtividade e conectando seus sistemas ERP.`
      }
    ],
    flipCards: [
      {
        id: "fc-4-1",
        front: { title: "Distributiva", icon: "Scissors" },
        back: { content: "Negociação Ganha-Perde. Foco em dividir um valor fixo. O ganho de um é a perda do outro (soma zero)." }
      },
      {
        id: "fc-4-2",
        front: { title: "Integrativa", icon: "Handshake" },
        back: { content: "Negociação Ganha-Ganha (Escola de Harvard). Foco em interesses e criação mútua de valor e opções." }
      },
      {
        id: "fc-4-3",
        front: { title: "BATNA / MAPAN", icon: "Signpost" },
        back: { content: "Best Alternative to a Negotiated Agreement. Seu melhor plano B caso a negociação atual vá para o buraco." }
      },
      {
        id: "fc-4-4",
        front: { title: "ZOPA", icon: "ArrowsRightLeft" },
        back: { content: "Zona de Possível Acordo. O intervalo de preços onde ambas as partes têm um resultado melhor que seus BATNAs." }
      },
      {
        id: "fc-4-5",
        front: { title: "Comakership", icon: "Users" },
        back: { content: "O nível supremo de parceria: integração de processos e co-desenvolvimento entre comprador e fornecedor." }
      },
      {
        id: "fc-4-6",
        front: { title: "CESGRANRIO", icon: "Target" },
        back: { content: "Enfatiza o método Harvard: separar as pessoas do problema e concentrar-se nos interesses, não em posições fixas." }
      }
    ],
    consolidation: {
      sinteseEstrategica: "Negociar não é esganar o fornecedor. Negociar bem é criar soluções de parceria (ganha-ganha) ancoradas num BATNA sólido.",
      videoLink: "https://www.youtube.com/embed/placeholder-negociacao",
      audioLink: "https://open.spotify.com/embed/track/placeholder-negociacao"
    }
  },
  5: {
    title: "Sourcing Estratégico (Strategic Sourcing)",
    paragraphs: [
      {
        index: "INTRO",
        text: `O Strategic Sourcing (Fornecimento Estratégico) é a metodologia mais avançada empregada pelas áreas de suprimentos para otimizar os gastos corporativos. Ao invés de tratar cada requisição de compra individualmente, o Sourcing exige que a empresa faça uma parada reflexiva e realize um 'Spend Analysis' (Análise de Gastos). Essa análise varre os dados do ERP para entender como, com quem e por que o dinheiro da empresa está sendo gasto. O objetivo é consolidar volumes fragmentados (ex: 15 filiais comprando papel de 15 fornecedores diferentes) para alavancar poder de barganha e negociar acordos-quadro com escopos globais. O Sourcing é pautado pela inteligência de mercado: o comprador deve entender a estrutura de custos de fabricação do seu fornecedor melhor do que o próprio vendedor.

A ferramenta matricial que coroa a metodologia de Strategic Sourcing é a Matriz de Kraljic (Peter Kraljic, 1983). Ela classifica os itens comprados pela empresa cruzando dois eixos: Impacto no Resultado Financeiro e Risco de Fornecimento (complexidade do mercado). A matriz divide o portfólio em quatro quadrantes. Itens Estratégicos (alto risco, alto valor) exigem parcerias de longo prazo; Itens de Alavancagem (baixo risco, alto valor) pedem leilões e disputas de preço; Itens de Gargalo (alto risco, baixo valor) requerem garantia de fornecimento a qualquer custo; e Itens Não-Críticos ou de Rotina (baixo risco, baixo valor) exigem eficiência administrativa (como o uso de e-procurement ou cartões corporativos) para não gastar tempo valioso do comprador.

Em avaliações de alto nível, os quadrantes da Matriz de Kraljic são figurinha repetida. O candidato precisa, imperativamente, saber associar um cenário hipotético ao quadrante correto e inferir a tática de suprimentos recomendada. Se uma peça for exclusiva e custar milhões, ela é 'Estratégica' (foco na parceria técnica). Se a Petrobras for comprar resmas de papel, o impacto é baixo e há muitos fornecedores, logo é um item 'De Rotina/Não-Crítico' (foco em simplificar o fluxo de pedido e usar e-commerce B2B).`
      }
    ],
    flipCards: [
      {
        id: "fc-5-1",
        front: { title: "Spend Analysis", icon: "PieChart" },
        back: { content: "Análise sistêmica dos dados de compras para identificar padrões, consolidating compras para ganhar poder de barganha." }
      },
      {
        id: "fc-5-2",
        front: { title: "Matriz Kraljic", icon: "Grid" },
        back: { content: "Classifica itens comprados cruzando Impacto Financeiro vs Risco/Complexidade de Fornecimento." }
      },
      {
        id: "fc-5-3",
        front: { title: "Estratégicos", icon: "Star" },
        back: { content: "Alto Impacto, Alto Risco. (Ex: motor exclusivo). Ação: Parceria íntima, colaboração de longo prazo." }
      },
      {
        id: "fc-5-4",
        front: { title: "Alavancagem", icon: "TrendingUp" },
        back: { content: "Alto Impacto, Baixo Risco. (Ex: aço padrão). Ação: Forçar competição, leilões reversos, disputar preço." }
      },
      {
        id: "fc-5-5",
        front: { title: "Gargalo", icon: "AlertCircle" },
        back: { content: "Baixo Impacto, Alto Risco. (Ex: peça barata, mas monopolista). Ação: Garantir volume, evitar falta a qualquer custo." }
      },
      {
        id: "fc-5-6",
        front: { title: "CESGRANRIO", icon: "Target" },
        back: { content: "Cai muito! Identificar o quadrante e aplicar a estratégia correta. Oposto: Alavancagem vs Gargalo." }
      }
    ],
    consolidation: {
      sinteseEstrategica: "Strategic Sourcing abandona o modo 'urgência diária' e usa a Matriz de Kraljic para mapear onde aplicar força bruta e onde buscar parceiros.",
      videoLink: "https://www.youtube.com/embed/placeholder-sourcing",
      audioLink: "https://open.spotify.com/embed/track/placeholder-sourcing"
    }
  },
  6: {
    title: "Gestão de Contratos de Fornecedores",
    paragraphs: [
      {
        index: "INTRO",
        text: `O fechamento de uma negociação não é o fim do ciclo de suprimentos, mas sim o início de uma relação jurídica e operacional que precisa ser gerida: o contrato. A Gestão de Contratos visa assegurar que todas as promessas, especificações técnicas, níveis de serviço (SLA - Service Level Agreement) e condições comerciais acordadas na mesa de negociação sejam rigorosamente cumpridas no dia a dia. Sem uma gestão de contratos eficiente, o chamado "vazamento de valor" (value leakage) ocorre: a empresa negocia um desconto de 20%, mas acaba pagando o preço cheio na fatura porque o sistema não foi atualizado, ou o fornecedor entrega uma qualidade inferior e ninguém cobra a multa contratual prevista.

Um contrato robusto na cadeia de suprimentos contém cláusulas vitais como: escopo detalhado, matriz de riscos (quem paga se houver um sinistro no transporte?), penalidades e bônus por performance, e cláusulas de rescisão (exit clauses). A gestão diária desse instrumento exige a figura do Fiscal do Contrato ou Gestor de Contratos. Ele é a ponte entre o fornecedor e a área técnica solicitante, responsável por auditar as entregas, aprovar boletins de medição (em contratos de prestação de serviço) e aplicar advertências caso o Service Level Agreement (SLA) não seja atingido (ex: o SLA exigia tempo de resposta de 4 horas, mas o fornecedor demorou 12 horas).

Em provas de concurso organizadas pela CESGRANRIO (notadamente para estatais), o foco recai intensamente sobre os princípios e fiscalização. É exigido o entendimento de que a fiscalização não é uma faculdade, mas um dever inalienável da Administração (ou da empresa pública). O candidato deve saber que a inércia do gestor do contrato em cobrar o cumprimento das obrigações trabalhistas e previdenciárias do fornecedor pode gerar a responsabilidade subsidiária da empresa contratante perante a Justiça do Trabalho (Súmula 331 do TST).`
      }
    ],
    flipCards: [
      {
        id: "fc-6-1",
        front: { title: "Gestão de Contratos", icon: "FileText" },
        back: { content: "Monitoramento contínuo para garantir que o combinado na negociação vire realidade na operação e faturamento." }
      },
      {
        id: "fc-6-2",
        front: { title: "Value Leakage", icon: "Droplets" },
        back: { content: "Vazamento de valor: quando a economia negociada se perde por falta de fiscalização do contrato." }
      },
      {
        id: "fc-6-3",
        front: { title: "SLA", icon: "BarChart4" },
        back: { content: "Acordo de Nível de Serviço. Métricas contratuais (ex: 98% de disponibilidade) que geram multas se não cumpridas." }
      },
      {
        id: "fc-6-4",
        front: { title: "Fiscal do Contrato", icon: "UserCheck" },
        back: { content: "O profissional designado formalmente para auditar as entregas, atestar as notas e notificar desvios." }
      },
      {
        id: "fc-6-5",
        front: { title: "Responsabilidade Subsidiária", icon: "Scale" },
        back: { content: "Se o fornecedor não pagar os funcionários, a contratante (Petrobras) pode ser obrigada a pagar, caso tenha falhado na fiscalização." }
      },
      {
        id: "fc-6-6",
        front: { title: "CESGRANRIO", icon: "Target" },
        back: { content: "Sempre cobra o papel do fiscal e o risco jurídico (Súmula 331 TST) atrelado à má gestão contratual." }
      }
    ],
    consolidation: {
      sinteseEstrategica: "O contrato é a lei entre as partes. Sem o fiscal de contrato e KPIs definidos, a negociação brilhante vira prejuízo.",
      videoLink: "https://www.youtube.com/embed/placeholder-contratos",
      audioLink: "https://open.spotify.com/embed/track/placeholder-contratos"
    }
  },
  7: {
    title: "Auditoria e Avaliação de Performance de Fornecedores",
    paragraphs: [
      {
        index: "INTRO",
        text: `A melhoria contínua da cadeia de suprimentos depende da medição incessante do desempenho de seus elos. A Avaliação de Performance de Fornecedores (Supplier Performance Evaluation) é a engrenagem que permite recompensar os bons parceiros e desenvolver (ou eliminar) os ineficientes. Essa avaliação é tangibilizada através do Índice de Qualidade do Fornecedor (IQF) ou Vendor Rating. O IQF não analisa apenas o preço; ele pondera uma cesta de métricas de acordo com o peso estratégico de cada uma. Os pilares clássicos avaliados são: Qualidade (taxa de produtos rejeitados), Entrega (OTIF - On-Time In-Full, pontualidade), Custo (competitividade e flexibilidade financeira) e Serviço (tempo de resposta, inovação, suporte técnico).

Paralelo à avaliação contínua, as empresas realizam Auditorias de Fornecedores. Enquanto o IQF avalia o resultado passado (se a peça chegou boa e no prazo), a auditoria avalia o potencial futuro e os riscos sistêmicos do fornecedor. As auditorias podem ser de Sistema de Qualidade (ex: avaliar se o fornecedor cumpre a ISO 9001), auditorias Ambientais e de Segurança (essenciais para a Petrobras, avaliando ISO 14001 e normas OHSAS/ISO 45001) e auditorias Sociais (garantindo que o fornecedor não utiliza trabalho análogo à escravidão ou infantil). Auditorias de segunda parte são aquelas feitas pela própria empresa compradora diretamente nas instalações do fornecedor.

Para exames de certificação e concursos, é vital diferenciar Homologação de Vendor Rating. A Homologação é o filtro inicial (passaporte de entrada). O Vendor Rating é a avaliação periódica e rotineira. A banca frequentemente apresenta um caso onde a empresa percebe um aumento de peças defeituosas. A ação de suprimentos correta não é romper o contrato imediatamente, mas sim abrir um Plano de Ação Corretiva (PAC) junto ao fornecedor, exigindo a análise da causa-raiz (via diagrama de Ishikawa ou 5 Porquês) para desenvolver o fornecedor, num autêntico viés de parceria.`
      }
    ],
    flipCards: [
      {
        id: "fc-7-1",
        front: { title: "Vendor Rating", icon: "Star" },
        back: { content: "Índice (Nota) contínuo do fornecedor baseado em Qualidade, Entrega e Custo." }
      },
      {
        id: "fc-7-2",
        front: { title: "Auditoria", icon: "Search" },
        back: { content: "Inspeção profunda (física e documental) para avaliar a capacidade técnica e de conformidade do fornecedor." }
      },
      {
        id: "fc-7-3",
        front: { title: "Auditoria 2ª Parte", icon: "Users" },
        back: { content: "Aquela realizada pelo próprio comprador diretamente nas dependências do seu fornecedor." }
      },
      {
        id: "fc-7-4",
        front: { title: "PAC", icon: "ClipboardList" },
        back: { content: "Plano de Ação Corretiva. Ferramenta para tratar não conformidades apontadas pelo IQF." }
      },
      {
        id: "fc-7-5",
        front: { title: "Desenvolvimento", icon: "TrendingUp" },
        back: { content: "Ajudar o fornecedor estratégico a melhorar sua qualidade e processos (ao invés de apenas demiti-lo)." }
      },
      {
        id: "fc-7-6",
        front: { title: "CESGRANRIO", icon: "Target" },
        back: { content: "Cobra a lógica de que o Vendor Rating (Avaliação) retroalimenta as decisões de futuras licitações e renovações." }
      }
    ],
    consolidation: {
      sinteseEstrategica: "Auditoria afere capacidade e risco; Vendor Rating afere a entrega na prática. Fornecedores ruins são desenvolvidos ou substituídos.",
      videoLink: "https://www.youtube.com/embed/placeholder-vendor",
      audioLink: "https://open.spotify.com/embed/track/placeholder-vendor"
    }
  },
  8: {
    title: "E-Procurement e Tecnologias de Compras",
    paragraphs: [
      {
        index: "INTRO",
        text: `A transformação digital substituiu a burocracia do papel e os telefonemas incessantes pelo rigor matemático dos sistemas eletrônicos. O E-procurement engloba a automação B2B (Business-to-Business) de todo o ciclo de compras pela internet ou por redes dedicadas (EDI - Electronic Data Interchange). Ele abrange desde a criação de catálogos eletrônicos internos (onde o requisitante escolhe o material como se estivesse em um e-commerce), passando pelo e-Sourcing (lançamento eletrônico de editais e RFQs para o mercado), até o e-Invoicing (faturamento e pagamento eletrônico). Essa revolução erradica erros de digitação, reduz drasticamente o ciclo de compras (lead time administrativo) e aumenta a transparência, mitigando os riscos de fraudes.

A ferramenta mais agressiva dentro do leque do e-procurement é o Leilão Reverso Eletrônico (e-Auction). Diferente do leilão tradicional (onde o preço sobe), no leilão reverso a empresa compradora especifica o que quer comprar e os fornecedores convidados acessam um portal online, dando lances cada vez MENORES em tempo real, disputando o pedido. O leilão reverso é excepcionalmente eficaz para 'Itens de Alavancagem' (produtos padronizados, commodities, com muitos fornecedores no mercado). Contudo, aplicá-lo em 'Itens Estratégicos' ou de alta complexidade tecnológica pode ser desastroso, pois a guerra de preços no leilão destrói parcerias e foca no custo isolado, ignorando o TCO e a qualidade intrínseca.

Para a CESGRANRIO, o aluno precisa saber em quais cenários aplicar o E-procurement e o Leilão Reverso. É fundamental lembrar que o Pregão Eletrônico, modalidade principal de compras na Administração Pública e nas Estatais (Lei 13.303/16), é juridicamente e na prática, um gigantesco Leilão Reverso. A banca testa o conhecimento sobre as vantagens do e-procurement: maior base de fornecedores alcançados, rastreabilidade total (compliance) e redução do custo transacional da equipe de suprimentos.`
      }
    ],
    flipCards: [
      {
        id: "fc-8-1",
        front: { title: "E-procurement", icon: "MonitorSmartphone" },
        back: { content: "A automação online de todo o ciclo de suprimentos (da requisição ao pagamento) em plataformas B2B." }
      },
      {
        id: "fc-8-2",
        front: { title: "Leilão Reverso", icon: "Gavel" },
        back: { content: "Fornecedores competem online dando lances decrescentes (quem dá menos leva). Ideal para itens padronizados." }
      },
      {
        id: "fc-8-3",
        front: { title: "EDI", icon: "Cable" },
        back: { content: "Electronic Data Interchange. O computador do comprador 'conversa' automaticamente com o do fornecedor." }
      },
      {
        id: "fc-8-4",
        front: { title: "Catálogo Eletrônico", icon: "ShoppingCart" },
        back: { content: "Portal interno onde funcionários compram itens de rotina pré-negociados, agilizando o fluxo de aprovação." }
      },
      {
        id: "fc-8-5",
        front: { title: "Pregão Eletrônico", icon: "Building2" },
        back: { content: "A versão pública (governamental) do Leilão Reverso, focada em bens e serviços comuns." }
      },
      {
        id: "fc-8-6",
        front: { title: "CESGRANRIO", icon: "Target" },
        back: { content: "O e-procurement reduz o Lead Time Administrativo (tempo gasto preenchendo e enviando cotações manuais)." }
      }
    ],
    consolidation: {
      sinteseEstrategica: "E-procurement traz velocidade, transparência e compliance. Leilão reverso (ou pregão) força o preço para baixo, mas exige especificações rigorosas.",
      videoLink: "https://www.youtube.com/embed/placeholder-eproc",
      audioLink: "https://open.spotify.com/embed/track/placeholder-eproc"
    }
  },
  9: {
    title: "Aspectos Fiscais e Tributários em Compras",
    paragraphs: [
      {
        index: "INTRO",
        text: `No intrincado sistema tributário brasileiro, um comprador que desconhece impostos é um risco corporativo ambulante. A análise de preços não pode ser feita comparando apenas o 'Valor Total' de duas propostas de estados diferentes. O comprador precisa 'descascar' a nota fiscal (Gross-up e Net-off) para enxergar o preço líquido da mercadoria sem os impostos recuperáveis. Impostos não cumulativos, como o ICMS (estadual), o IPI (federal) e o PIS/COFINS, geram crédito para a empresa adquirente caso ela utilize o material em seu processo produtivo ou revenda. Ou seja, se a empresa compra com ICMS destacado, ela não paga o valor do imposto do próprio bolso como 'custo'; ela guarda esse crédito para abater nos impostos das suas próprias vendas futuras.

O grande desafio reside em comparar maçãs com maçãs. A alíquota do ICMS interestadual varia dependendo do estado de origem e do estado de destino. Além disso, existe a complexa figura da Substituição Tributária (ICMS-ST), onde o governo obriga o primeiro elo da cadeia (a indústria fornecedora) a recolher antecipadamente todo o imposto que incidiria nas revendas futuras até o consumidor final. Para a área de Suprimentos, ignorar o ICMS-ST ou o Diferencial de Alíquotas (DIFAL) nas compras de Uso e Consumo significa fechar um negócio achando que obteve o menor preço, mas gerar um passivo fiscal enorme para o setor financeiro pagar no mês seguinte.

A banca CESGRANRIO explora os impactos da elisão fiscal na cadeia de suprimentos. O aluno não precisa ser um contador especialista, mas DEVE saber a diferença entre impostos cumulativos (que viram custo irrecuperável e geram efeito cascata) e não cumulativos (que geram crédito e se anulam na cadeia). E entender que o TCO (Custo Total de Aquisição) só pode ser avaliado expurgando-se os impostos recuperáveis das propostas dos fornecedores.`
      }
    ],
    flipCards: [
      {
        id: "fc-9-1",
        front: { title: "Imposto Recuperável", icon: "Undo2" },
        back: { content: "Tributo não cumulativo (gera crédito). Não deve ser somado no custo final do material para a fábrica." }
      },
      {
        id: "fc-9-2",
        front: { title: "ICMS", icon: "Map" },
        back: { content: "Imposto estadual principal. Em compras de outros estados, a alíquota varia (ex: 7% ou 12%), impactando a decisão." }
      },
      {
        id: "fc-9-3",
        front: { title: "IPI", icon: "Factory" },
        back: { content: "Imposto sobre Produtos Industrializados (federal). Importante na compra direta da fábrica." }
      },
      {
        id: "fc-9-4",
        front: { title: "DIFAL", icon: "Calculator" },
        back: { content: "Diferencial de Alíquota. O comprador paga a diferença entre a alíquota de fora e a interna em compras de consumo." }
      },
      {
        id: "fc-9-5",
        front: { title: "Substituição Tributária", icon: "HandCoins" },
        back: { content: "Pagamento antecipado de toda a cadeia tributária logo na fábrica, encarecendo a nota fiscal na entrada." }
      },
      {
        id: "fc-9-6",
        front: { title: "CESGRANRIO", icon: "Target" },
        back: { content: "Atenção: Na comparação de 2 orçamentos (fornecedor A e B), deve-se SUBTRAIR o ICMS para achar o real custo do item." }
      }
    ],
    consolidation: {
      sinteseEstrategica: "O comprador moderno é um 'equalizador' tributário. Preço bruto na nota não é custo. Custo = Preço bruto menos os créditos fiscais.",
      videoLink: "https://www.youtube.com/embed/placeholder-tributos",
      audioLink: "https://open.spotify.com/embed/track/placeholder-tributos"
    }
  },
  10: {
    title: "Ética e Compliance na Cadeia de Suprimentos",
    paragraphs: [
      {
        index: "INTRO",
        text: `O departamento de compras é o cofre da empresa e o principal ponto de contato com o mercado externo, tornando-se, por natureza, uma área de altíssimo risco e vulnerabilidade a fraudes, corrupção, conluio e favorecimentos. A blindagem corporativa contra esses riscos é chamada de Compliance (estar em conformidade). Programas de Compliance em suprimentos exigem a elaboração de Códigos de Ética rígidos e a adoção do princípio da Segregação de Funções (Separation of Duties). Esse princípio dita que quem requisita a compra não pode ser o mesmo que cota; e quem aprova o pedido não pode ser o mesmo que dá o aceite no recebimento ou autoriza o pagamento, impedindo que fraudes sistêmicas ocorram sem a conivência de múltiplas pessoas.

No contexto das Estatais (e da Petrobras em particular, profundamente marcada pelas exigências pós-Lei 13.303/16), o rigor ético é elevado à potência máxima. Práticas comuns no mercado privado, como o aceite de brindes valiosos, convites para viagens patrocinadas por fornecedores, ou jantares de negócios caros, configuram Conflito de Interesses imediato. Os compradores devem declarar parentescos e impedir a qualificação de fornecedores que possuam ligações diretas com a diretoria da estatal. Além disso, as empresas impõem a adoção de canais de denúncia anônima (Whistleblowing) para garantir que desvios éticos da própria equipe ou de parceiros comerciais sejam detectados antes de gerarem danos reputacionais.

A CESGRANRIO adora explorar cenários éticos limítrofes na área de administração. O aluno deve sempre pautar a resposta pelos Princípios da Administração Pública e de Governança Corporativa: Impessoalidade, Moralidade, Transparência (Disclosure) e Equidade. Compreender o que é um conflito de interesses (quando o interesse privado de um funcionário pode influenciar indevidamente suas obrigações corporativas) é vital para acertar as questões do último módulo de Suprimentos.`
      }
    ],
    flipCards: [
      {
        id: "fc-10-1",
        front: { title: "Compliance", icon: "ShieldAlert" },
        back: { content: "Conjunto de regras, processos e auditorias para garantir conformidade legal, ética e regulatória." }
      },
      {
        id: "fc-10-2",
        front: { title: "Segregação de Funções", icon: "SplitSquareHorizontal" },
        back: { content: "Regra de ouro: Quem compra, não paga. Quem requisita, não aprova cotação. Evita fraudes cruzadas." }
      },
      {
        id: "fc-10-3",
        front: { title: "Conflito de Interesses", icon: "Scale" },
        back: { content: "Ocorre quando relações pessoais ou vantagens financeiras comprometem a imparcialidade do comprador." }
      },
      {
        id: "fc-10-4",
        front: { title: "Whistleblowing", icon: "Megaphone" },
        back: { content: "Canais de denúncia seguros e anônimos para reportar quebras de compliance ou corrupção na rede de suprimentos." }
      },
      {
        id: "fc-10-5",
        front: { title: "Lei 13.303/16", icon: "BookOpen" },
        back: { content: "Estatuto das Estatais. Inseriu pesadas regras de governança e integridade nos procedimentos de compra e licitação." }
      },
      {
        id: "fc-10-6",
        front: { title: "CESGRANRIO", icon: "Target" },
        back: { content: "A ética não é negociável. Se a questão cita um brinde 'inocente' de alto valor, considere como infração de compliance." }
      }
    ],
    consolidation: {
      sinteseEstrategica: "Compliance é a blindagem do comprador. A Segregação de Funções é o que impede que o poder financeiro caia nas mãos de uma única pessoa.",
      videoLink: "https://www.youtube.com/embed/placeholder-compliance",
      audioLink: "https://open.spotify.com/embed/track/placeholder-compliance"
    }
  }
};
