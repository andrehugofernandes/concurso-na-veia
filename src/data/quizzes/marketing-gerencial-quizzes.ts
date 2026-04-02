import { QuizQuestion } from "@/components/aulas/shared";

export const QUIZ_MARKETING_GERENCIAL: Record<string, QuizQuestion[]> = {
  "modulo-1": [
    {
      id: 201,
      pergunta:
        "O Marketing Gerencial é uma disciplina que integra análise de mercado com decisões estratégicas. Qual alternativa melhor define os 4 Ps do Marketing (clássico Mix de Marketing)?",
      opcoes: [
        {
          label: "A",
          valor: "Produto, Preço, Praça e Promoção.",
        },
        {
          label: "B",
          valor: "Publicidade, Programa, Planejamento e Pesquisa.",
        },
        {
          label: "C",
          valor: "Potencial, Padrão, Parceria e Posicionamento.",
        },
        {
          label: "D",
          valor: "Pessoas, Presença, Produção e Participação.",
        },
        {
          label: "E",
          valor: "Paisagem, Padrões, Processos e Percepção.",
        },
      ],
      correta: "A",
      explicacao:
        "Os 4 Ps (Produto, Preço, Praça e Promoção) são os pilares do Mix de Marketing clássico de McCarthy. Petrobras usa esse framework para estratégias de combustíveis, lubrificantes e serviços, integrando controle de qualidade (Produto), precificação competitiva (Preço), distribuição via postos (Praça) e campanhas (Promoção).",
    },
    {
      id: 202,
      pergunta:
        "Qual conceito refere-se à divisão do mercado em grupos com características similares, permitindo abordagens de marketing diferenciadas?",
      opcoes: [
        {
          label: "A",
          valor: "Segmentação de Mercado.",
        },
        {
          label: "B",
          valor: "Posicionamento Competitivo.",
        },
        {
          label: "C",
          valor: "Diferenciação de Produto.",
        },
        {
          label: "D",
          valor: "Targeting Direto.",
        },
        {
          label: "E",
          valor: "Diversificação Estratégica.",
        },
      ],
      correta: "A",
      explicacao:
        "Segmentação de Mercado divide o mercado em grupos homogêneos (demográficos, psicográficos, comportamentais) com necessidades similares. Petrobras segmenta em: Downstream (combustíveis), Lubricantes (industrial/automotivo), GLP (residencial), cada com estratégia diferenciada.",
    },
    {
      id: 203,
      pergunta:
        "Qual das estratégias de preço abaixo consiste em entrar no mercado com preço elevado e reduzir gradualmente para capturar segmentos mais sensíveis?",
      opcoes: [
        {
          label: "A",
          valor: "Estratégia de Penetração.",
        },
        {
          label: "B",
          valor: "Estratégia de Desnatação (Skimming).",
        },
        {
          label: "C",
          valor: "Estratégia Competitiva.",
        },
        {
          label: "D",
          valor: "Estratégia de Valor.",
        },
        {
          label: "E",
          valor: "Estratégia de Bundling.",
        },
      ],
      correta: "B",
      explicacao:
        "Desnatação (Skimming) inicia com preço alto para clientes menos sensíveis (early adopters), depois reduz. Petrobras usou isso em lubrificantes premium (Petrobras Lubrax sintéticos) antes de versões de menor preço. Contrasta com Penetração (preço baixo inicial para ganhar volume).",
    },
    {
      id: 204,
      pergunta:
        "Qual componente do Mix de Marketing refere-se aos canais de distribuição e logística para colocar o produto no mercado?",
      opcoes: [
        {
          label: "A",
          valor: "Produto.",
        },
        {
          label: "B",
          valor: "Promoção.",
        },
        {
          label: "C",
          valor: "Praça (Distribuição).",
        },
        {
          label: "D",
          valor: "Preço.",
        },
        {
          label: "E",
          valor: "Processo.",
        },
      ],
      correta: "C",
      explicacao:
        "Praça refere-se aos canais de distribuição (diretos ou indiretos). Petrobras usa rede de postos próprios/franchisados (Praça direta), distribuidoras regionais, e GLP via distribuidoras autorizadas (Praça indireta). Escolha estratégica afeta margem, controle e penetração.",
    },
    {
      id: 205,
      pergunta:
        "O conceito de 'Posicionamento' em marketing refere-se a quê?",
      opcoes: [
        {
          label: "A",
          valor: "Local físico onde o produto é vendido.",
        },
        {
          label: "B",
          valor: "A percepção única do produto na mente do consumidor, diferenciando-o dos concorrentes.",
        },
        {
          label: "C",
          valor: "Estratégia de expansão territorial.",
        },
        {
          label: "D",
          valor: "Número de lojas ou pontos de venda.",
        },
        {
          label: "E",
          valor: "Classificação de ranking de mercado.",
        },
      ],
      correta: "B",
      explicacao:
        "Posicionamento é a percepção diferenciada que marca ocupa na mente do consumidor. Petrobras posiciona-se como 'Energia & Soluções Integradas' (B2B), 'Confiança & Qualidade' (combustíveis), 'Inovação em Renováveis' (estratégia 2030). Diferencia-se de Ipiranga (preço) e Shell (premium).",
    },
  ],

  "modulo-2": [
    {
      id: 206,
      pergunta:
        "Qual das alternativas melhor define segmentação demográfica?",
      opcoes: [
        {
          label: "A",
          valor: "Divisão baseada em características psicológicas (personalidade, valores, lifestyle).",
        },
        {
          label: "B",
          valor: "Divisão baseada em variáveis mensuráveis (idade, gênero, renda, educação, família).",
        },
        {
          label: "C",
          valor: "Divisão baseada em padrões de compra e frequência.",
        },
        {
          label: "D",
          valor: "Divisão baseada em preferências de canais de comunicação.",
        },
        {
          label: "E",
          valor: "Divisão baseada em velocidade de adoção de inovações.",
        },
      ],
      correta: "B",
      explicacao:
        "Segmentação demográfica usa variáveis facilmente mensuráveis: idade (jovens vs. idosos), gênero, renda (classe A/B/C/D), educação, tamanho família. Petrobras usa: Combustíveis para motoristas (25-65 anos, renda média), Lubrificantes industriais para engenheiros (B2B, high-income), GLP para famílias de renda média.",
    },
    {
      id: 207,
      pergunta:
        "Qual tipo de segmentação foca em comportamentos, valores e estilos de vida do consumidor?",
      opcoes: [
        {
          label: "A",
          valor: "Segmentação Demográfica.",
        },
        {
          label: "B",
          valor: "Segmentação Comportamental.",
        },
        {
          label: "C",
          valor: "Segmentação Psicográfica.",
        },
        {
          label: "D",
          valor: "Segmentação Geográfica.",
        },
        {
          label: "E",
          valor: "Segmentação Tecnológica.",
        },
      ],
      correta: "C",
      explicacao:
        "Psicográfica analisa personalidade, valores, atitudes, estilos de vida, interesses. Petrobras identifica: Consumidores 'eco-conscious' (renováveis, GLP), 'performance-seekers' (lubrificantes sintéticos high-end), 'value-seekers' (combustível competitivo). Diferente de demográfica (quem são) e comportamental (o que fazem).",
    },
    {
      id: 208,
      pergunta:
        "Qual alternativa descreve corretamente segmentação comportamental?",
      opcoes: [
        {
          label: "A",
          valor: "Divisão por história de compras, frequência, lealdade e sensibilidade a preço.",
        },
        {
          label: "B",
          valor: "Divisão por cores, formas e tamanhos de produtos.",
        },
        {
          label: "C",
          valor: "Divisão por regiões geográficas e clima.",
        },
        {
          label: "D",
          valor: "Divisão por educação e profissão dos clientes.",
        },
        {
          label: "E",
          valor: "Divisão por campanhas publicitárias assistidas.",
        },
      ],
      correta: "A",
      explicacao:
        "Comportamental analisa padrões reais de compra: frequência (comprador semanal vs. mensal), lealdade (sempre mesma marca), volume, sensibilidade a preço. Petrobras usa: combustível (alta frequência, baixa lealdade), lubrificantes (frequência média, alta lealdade), GLP (alta lealdade, contrato).",
    },
    {
      id: 209,
      pergunta:
        "Qual conceito refere-se à escolha de qual(is) segmento(s) de mercado a empresa vai servir?",
      opcoes: [
        {
          label: "A",
          valor: "Segmentação.",
        },
        {
          label: "B",
          valor: "Targeting (Seleção de Alvo).",
        },
        {
          label: "C",
          valor: "Posicionamento.",
        },
        {
          label: "D",
          valor: "Diferenciação.",
        },
        {
          label: "E",
          valor: "Penetração.",
        },
      ],
      correta: "B",
      explicacao:
        "Targeting é selecionar qual(is) segmento(s) terão foco estratégico. Petrobras faz targeting de: 1) Motoristas de automóveis (combustível), 2) Indústrias pesadas (lubrificantes B2B), 3) Famílias classe C/D (GLP). Decisão crítica afeta investimento em marketing, R&D, distribuição.",
    },
    {
      id: 210,
      pergunta:
        "O modelo STP em marketing refere-se a qual sequência?",
      opcoes: [
        {
          label: "A",
          valor: "Serviço, Tecnologia, Posicionamento.",
        },
        {
          label: "B",
          valor: "Segmentação, Targeting, Posicionamento.",
        },
        {
          label: "C",
          valor: "Sistematização, Tática, Plano.",
        },
        {
          label: "D",
          valor: "Sociais, Técnicos, Produtos.",
        },
        {
          label: "E",
          valor: "Setorial, Tributário, Patrimonial.",
        },
      ],
      correta: "B",
      explicacao:
        "STP é o framework clássico: 1) Segmentação (dividir mercado), 2) Targeting (escolher alvo), 3) Posicionamento (comunicar diferencial). Petrobras aplica: Segmenta combustível/lubrificantes/GLP → Targeting de motoristas/indústria/famílias → Posiciona como 'confiança' ou 'inovação renováveis'.",
    },
  ],

  "modulo-3": [
    {
      id: 211,
      pergunta:
        "Qual estratégia de preço caracteriza-se por iniciar com preço baixo para ganhar rápido market-share?",
      opcoes: [
        {
          label: "A",
          valor: "Estratégia de Desnatação (Skimming).",
        },
        {
          label: "B",
          valor: "Estratégia de Penetração.",
        },
        {
          label: "C",
          valor: "Estratégia de Valor Agregado.",
        },
        {
          label: "D",
          valor: "Estratégia de Premium.",
        },
        {
          label: "E",
          valor: "Estratégia de Sobrevivência.",
        },
      ],
      correta: "B",
      explicacao:
        "Penetração usa preço baixo inicial para ganhar volume rápido, construir lealdade e criar barreiras de entrada para concorrentes. Petrobras fez isso com GLP (preço acessível para famílias classe C), criando demanda e fidelização. Contrasta com Skimming (preço alto inicial).",
    },
    {
      id: 212,
      pergunta:
        "Qual fator é MENOS relevante para determinação de preço em uma estratégia competitiva?",
      opcoes: [
        {
          label: "A",
          valor: "Custos de produção.",
        },
        {
          label: "B",
          valor: "Preços dos concorrentes.",
        },
        {
          label: "C",
          valor: "Valor percebido pelo cliente.",
        },
        {
          label: "D",
          valor: "Cor da embalagem do produto.",
        },
        {
          label: "E",
          valor: "Elasticidade de demanda.",
        },
      ],
      correta: "D",
      explicacao:
        "Cor de embalagem afeta percepção/marca mas não preço diretamente. Pricing depende de: custos (viabilidade), concorrência (market range), valor percebido (cliente pagarão?), elasticidade (volume vs. preço). Petrobras considera custo refinação, preço Brent, concorrência Ipiranga, valor premium de lubrificantes.",
    },
    {
      id: 213,
      pergunta:
        "Em que contexto a estratégia de 'Prestige Pricing' (preço premium) é mais efetiva?",
      opcoes: [
        {
          label: "A",
          valor: "Produtos comoditizados com baixa diferenciação.",
        },
        {
          label: "B",
          valor: "Produtos com forte diferenciação, marca forte e público com alta renda.",
        },
        {
          label: "C",
          valor: "Produtos em decline no ciclo de vida.",
        },
        {
          label: "D",
          valor: "Produtos sem inovação há muitos anos.",
        },
        {
          label: "E",
          valor: "Produtos com alta oferta no mercado.",
        },
      ],
      correta: "B",
      explicacao:
        "Prestige Pricing (preço alto) funciona com marca forte, diferenciação clara e público premium. Petrobras usa com Lubrax (premium vs. genéricos), Petrobras Diesel S-500 (qualidade superior). Não funciona com commodities (ex.: GLP genérico - foco volume).",
    },
    {
      id: 214,
      pergunta:
        "Qual conceito refere-se à prática de oferecer múltiplos produtos em um único preço?",
      opcoes: [
        {
          label: "A",
          valor: "Bundle Pricing (Bundling).",
        },
        {
          label: "B",
          valor: "Dynamic Pricing.",
        },
        {
          label: "C",
          valor: "Psychological Pricing.",
        },
        {
          label: "D",
          valor: "Tiered Pricing.",
        },
        {
          label: "E",
          valor: "Loss Leader Pricing.",
        },
      ],
      correta: "A",
      explicacao:
        "Bundling combina múltiplos produtos em preço único, aumentando ticket médio e percepção de valor. Petrobras usa: combo combustível + lavagem (postos), pacotes lubrificantes para frotas, GLP + manutentora. Aumenta perceção de economia e cross-selling.",
    },
    {
      id: 215,
      pergunta:
        "Qual estratégia de preço ajusta-se dinamicamente conforme demanda, sazonalidade ou perfil do cliente (ex.: app vs. bomba)?",
      opcoes: [
        {
          label: "A",
          valor: "Prestige Pricing.",
        },
        {
          label: "B",
          valor: "Penetration Pricing.",
        },
        {
          label: "C",
          valor: "Dynamic Pricing.",
        },
        {
          label: "D",
          valor: "Cost-Plus Pricing.",
        },
        {
          label: "E",
          valor: "Value-Based Pricing.",
        },
      ],
      correta: "C",
      explicacao:
        "Dynamic Pricing ajusta preço em tempo real (dados, demanda, competição). Petrobras começa a usar: combustível + caro em horários pico, descontos app para fidelização, GLP sazonal (inverno + caro). Comum em airlines (Gol) e hospitality (Booking).",
    },
  ],

  "modulo-4": [
    {
      id: 216,
      pergunta:
        "Qual dos canais de distribuição abaixo é considerado DIRETO?",
      opcoes: [
        {
          label: "A",
          valor: "Fabricante → Distribuidor → Varejista → Consumidor.",
        },
        {
          label: "B",
          valor: "Fabricante → Consumidor.",
        },
        {
          label: "C",
          valor: "Fabricante → Broker → Distribuidor → Consumidor.",
        },
        {
          label: "D",
          valor: "Fabricante → Agente → Varejista.",
        },
        {
          label: "E",
          valor: "Fabricante → Grossista → Varejista → Consumidor.",
        },
      ],
      correta: "B",
      explicacao:
        "Canal direto elimina intermediários (Fabricante → Consumidor). Petrobras usa: Postos próprios (combustível direto), e-commerce (lubrificantes direto), GLP delivery direto. Aumenta controle e margem, mas demanda investimento logístico.",
    },
    {
      id: 217,
      pergunta:
        "Qual é a principal vantagem de um canal INDIRETO (via distribuidores) para o fabricante?",
      opcoes: [
        {
          label: "A",
          valor: "Maior margem de lucro por venda.",
        },
        {
          label: "B",
          valor: "Menor investimento inicial, maior cobertura geográfica e redução de risco.",
        },
        {
          label: "C",
          valor: "Controle total sobre preço final ao consumidor.",
        },
        {
          label: "D",
          valor: "Garantia de venda sem intermediários.",
        },
        {
          label: "E",
          valor: "Eliminação de concorrentes diretos.",
        },
      ],
      correta: "B",
      explicacao:
        "Indireto reduz risco (distribuidor absorve estoque), cobre mercados remotos (via rede distribuidor) e requer menor investimento que rede própria. Petrobras usa: distribuidoras regionais para GLP, revendedores para lubrificantes em cidades pequenas. Trade-off: menos controle de marca.",
    },
    {
      id: 218,
      pergunta:
        "Qual conceito refere-se à quantidade de intermediários no canal (muitos vs. poucos)?",
      opcoes: [
        {
          label: "A",
          valor: "Cobertura de Distribuição.",
        },
        {
          label: "B",
          valor: "Intensidade de Distribuição.",
        },
        {
          label: "C",
          valor: "Competição de Canal.",
        },
        {
          label: "D",
          valor: "Controle de Distribuição.",
        },
        {
          label: "E",
          valor: "Capacidade Logística.",
        },
      ],
      correta: "B",
      explicacao:
        "Intensidade refere-se à densidade de intermediários: Distribuição Intensiva (muitos pontos - ex.: combustível em cada bairro), Distribuição Seletiva (alguns pontos selecionados - ex.: lubrificantes premium em oficinas especializadas), Distribuição Exclusiva (poucos/um distribuidor).",
    },
    {
      id: 219,
      pergunta:
        "Qual tipo de distribuição usa MUITOS intermediários para máxima disponibilidade (ex.: refrigerante em qualquer baireco)?",
      opcoes: [
        {
          label: "A",
          valor: "Distribuição Exclusiva.",
        },
        {
          label: "B",
          valor: "Distribuição Seletiva.",
        },
        {
          label: "C",
          valor: "Distribuição Intensiva.",
        },
        {
          label: "D",
          valor: "Distribuição Restrita.",
        },
        {
          label: "E",
          valor: "Distribuição Controlada.",
        },
      ],
      correta: "C",
      explicacao:
        "Intensiva busca máxima cobertura com múltiplos pontos de venda. Petrobras usa para combustível (postos em cada rua), GLP (distribuidoras em toda cidade). Custos altos, controle baixo, mas penetração máxima. Oposto: Exclusiva (1-2 distribuidores, controle máximo).",
    },
    {
      id: 220,
      pergunta:
        "O conceito de 'Gestão de Relacionamento com Canal' refere-se principalmente a quê?",
      opcoes: [
        {
          label: "A",
          valor: "Redução de custos de transporte.",
        },
        {
          label: "B",
          valor: "Manter relacionamento colaborativo com intermediários, garantindo disponibilidade, treinamento e margens adequadas.",
        },
        {
          label: "C",
          valor: "Eliminação de todos os intermediários.",
        },
        {
          label: "D",
          valor: "Aumento exponencial de pontos de venda.",
        },
        {
          label: "E",
          valor: "Padronização de embalagens.",
        },
      ],
      correta: "B",
      explicacao:
        "Gestão de canal assegura relacionamento win-win: distribuidor recebe margem justa, treinamento de equipe, suporte marketing. Petrobras investe em relacionamento com distribuidoras GLP (programas incentivo, logística) e oficinas (material técnico de lubrificantes) para garantir espaço e qualidade.",
    },
  ],

  "modulo-5": [
    {
      id: 221,
      pergunta:
        "Qual componente do Mix de Comunicação refere-se a mensagens pagas em mídia de massa (TV, rádio, jornal, digital)?",
      opcoes: [
        {
          label: "A",
          valor: "Relações Públicas (RP).",
        },
        {
          label: "B",
          valor: "Publicidade (Advertising).",
        },
        {
          label: "C",
          valor: "Promoção de Vendas.",
        },
        {
          label: "D",
          valor: "Venda Pessoal.",
        },
        {
          label: "E",
          valor: "Marketing Direto.",
        },
      ],
      correta: "B",
      explicacao:
        "Publicidade é comunicação paga em mídia de massa. Petrobras usa: campanha TV 'A energia vem da natureza' (renováveis), rádio com spotinho combustível, digital com YouTube ads Petrobras Diesel. Mensagem controlada, alcance massivo, custo alto.",
    },
    {
      id: 222,
      pergunta:
        "Qual ferramenta refere-se à comunicação NÃO-PAGA (earned media) voltada para geração de credibilidade e reputação?",
      opcoes: [
        {
          label: "A",
          valor: "Publicidade.",
        },
        {
          label: "B",
          valor: "Promoção de Vendas.",
        },
        {
          label: "C",
          valor: "Relações Públicas (RP).",
        },
        {
          label: "D",
          valor: "Sponsorship.",
        },
        {
          label: "E",
          valor: "Direct Mail.",
        },
      ],
      correta: "C",
      explicacao:
        "RP gera mídia earned (notícias, press releases) sem custos diretos, construindo credibilidade. Petrobras usa: comunicados sobre inovação em renováveis, press releases em crises (vazamentos), relacionamento com jornalistas. Mensagem NÃO controlada (risco), credibilidade alta.",
    },
    {
      id: 223,
      pergunta:
        "Qual elemento do Mix de Comunicação foca em incentivos de curto prazo para estimular compra imediata (cupons, descontos, sorteios)?",
      opcoes: [
        {
          label: "A",
          valor: "Publicidade Institucional.",
        },
        {
          label: "B",
          valor: "Promoção de Vendas.",
        },
        {
          label: "C",
          valor: "Venda Pessoal.",
        },
        {
          label: "D",
          valor: "Merchandising.",
        },
        {
          label: "E",
          valor: "Product Placement.",
        },
      ],
      correta: "B",
      explicacao:
        "Promoção de Vendas incentiva ação imediata com cupons, descontos, sorteios, cashback. Petrobras faz: programa de pontos (Estação Petrobras), descontos em combustível via app, sorteios para GLP. Impacto rápido, custo controlado, risco de reduzir percepção de valor.",
    },
    {
      id: 224,
      pergunta:
        "Qual ferramenta de comunicação refere-se ao contato direto entre vendedor e cliente para persuadir e negociar?",
      opcoes: [
        {
          label: "A",
          valor: "Telemarketing.",
        },
        {
          label: "B",
          valor: "Venda Pessoal (Personal Selling).",
        },
        {
          label: "C",
          valor: "Marketing de Conteúdo.",
        },
        {
          label: "D",
          valor: "Social Media Marketing.",
        },
        {
          label: "E",
          valor: "E-commerce Direto.",
        },
      ],
      correta: "B",
      explicacao:
        "Venda Pessoal é contato face-a-face (ou remoto) vendedor-cliente para negociar soluções customizadas. Petrobras usa: vendedores B2B de lubrificantes em indústrias, consultores técnicos com clientes corporativos, gerentes de GLP com distribuidoras. Caro, mas persuasão alta e customização.",
    },
    {
      id: 225,
      pergunta:
        "O conceito de 'Integrated Marketing Communications' (IMC) refere-se a qual princípio?",
      opcoes: [
        {
          label: "A",
          valor: "Usar apenas um canal de comunicação para reduzir custos.",
        },
        {
          label: "B",
          valor: "Integrar todos os elementos de comunicação (publicidade, RP, promoção, venda) em mensagem consistente e coordenada.",
        },
        {
          label: "C",
          valor: "Aumentar orçamento de publicidade exponencialmente.",
        },
        {
          label: "D",
          valor: "Focar exclusivamente em digital.",
        },
        {
          label: "E",
          valor: "Eliminar RP e focar em vendas.",
        },
      ],
      correta: "B",
      explicacao:
        "IMC coordena todos os canais (publicidade + RP + promoção + venda pessoal) em mensagem unificada para máximo impacto. Petrobras exemplo: campanha 'Energia para Crescer' integra TV (publicidade), press releases (RP), programa de pontos (promoção), vendedores B2B (venda) e posts em Instagram (digital).",
    },
  ],

  "modulo-6": [
    {
      id: 226,
      pergunta:
        "Qual plataforma digital é MAIS estratégica para Petrobras atingir consumidores B2C de combustível com localização e conveniência?",
      opcoes: [
        {
          label: "A",
          valor: "LinkedIn.",
        },
        {
          label: "B",
          valor: "TikTok puro.",
        },
        {
          label: "C",
          valor: "Google Maps + Google Ads + App mobile.",
        },
        {
          label: "D",
          valor: "Telegram.",
        },
        {
          label: "E",
          valor: "Fóruns especializados.",
        },
      ],
      correta: "C",
      explicacao:
        "Maps/Ads/App garantem visibilidade para 'posto mais perto', publicidade targetizada por localização e app de programa de pontos. Petrobras investiu em 'Estação Petrobras' app (programa + pagamento), Google Ads para postos, Maps optimization. Estratégia omnichannel essencial.",
    },
    {
      id: 227,
      pergunta:
        "O termo 'SEO' em Marketing Digital refere-se a quê?",
      opcoes: [
        {
          label: "A",
          valor: "Search Engine Optimization - otimizar visibilidade em buscadores naturais (não-pago).",
        },
        {
          label: "B",
          valor: "Search Engine Overload.",
        },
        {
          label: "C",
          valor: "Social Engagement Optimization.",
        },
        {
          label: "D",
          valor: "Secure Email Operations.",
        },
        {
          label: "E",
          valor: "Strategic E-commerce Options.",
        },
      ],
      correta: "A",
      explicacao:
        "SEO otimiza conteúdo (palavras-chave, links, velocidade) para ranking em Google orgânico (não-pago). Petrobras otimiza: 'combustível próximo a mim' (maps), 'Petrobras Diesel qualidade' (blog), 'lubrificantes industriais Petrobras' (B2B). Custo baixo, ROI longo prazo.",
    },
    {
      id: 228,
      pergunta:
        "Qual ferramenta de Digital Marketing refere-se a anúncios pagos em mecanismos de busca (ex.: Google Ads)?",
      opcoes: [
        {
          label: "A",
          valor: "SEO.",
        },
        {
          label: "B",
          valor: "SEM (Search Engine Marketing).",
        },
        {
          label: "C",
          valor: "SMM (Social Media Marketing).",
        },
        {
          label: "D",
          valor: "CRM.",
        },
        {
          label: "E",
          valor: "Email Marketing.",
        },
      ],
      correta: "B",
      explicacao:
        "SEM é publicidade paga em buscadores (Google Ads principalmente). Petrobras faz: campaigns 'combustível Petrobras', 'lubrificantes sintetizados', 'postos perto de mim'. Resultado imediato, custo por clique, ideal para intenção de compra alta.",
    },
    {
      id: 229,
      pergunta:
        "O 'E-commerce' em estratégia Petrobras é mais adequado para qual categoria?",
      opcoes: [
        {
          label: "A",
          valor: "Combustível (gasolina, diesel em bomba).",
        },
        {
          label: "B",
          valor: "Lubrificantes, aditivos, produtos de manutenção.",
        },
        {
          label: "C",
          valor: "GLP em botijão.",
        },
        {
          label: "D",
          valor: "Óleo cru.",
        },
        {
          label: "E",
          valor: "Biocombustível puro.",
        },
      ],
      correta: "B",
      explicacao:
        "E-commerce funciona para lubrificantes (entrega via transportadora), aditivos, fluidos especiais. Combustível requer infraestrutura física (postos). Petrobras tem plataforma e-commerce para Lubrax, produtos de manutenção automotiva, atendendo oficinas e consumidores residenciais.",
    },
    {
      id: 230,
      pergunta:
        "Qual métrica digital mede a taxa de visitantes que realizam a ação desejada (compra, inscrição, lead)?",
      opcoes: [
        {
          label: "A",
          valor: "Engagement Rate.",
        },
        {
          label: "B",
          valor: "Conversion Rate.",
        },
        {
          label: "C",
          valor: "Click-Through Rate (CTR).",
        },
        {
          label: "D",
          valor: "Cost Per Click (CPC).",
        },
        {
          label: "E",
          valor: "Bounce Rate.",
        },
      ],
      correta: "B",
      explicacao:
        "Conversion Rate = (Ações / Visitantes) x 100%. Se 10 de 1000 visitantes baixam o app Estação, CR = 1%. Petrobras monitora: CR de 'postos mapa' (visita → check-in), CR app (download → cadastro → compra pontos), CR e-commerce (visita → compra lubrificantes).",
    },
  ],

  "modulo-7": [
    {
      id: 231,
      pergunta:
        "Qual elemento do Marketing define como consumidor percebe e diferencia a marca entre concorrentes?",
      opcoes: [
        {
          label: "A",
          valor: "Brand Awareness (Conhecimento).",
        },
        {
          label: "B",
          valor: "Brand Positioning (Posicionamento).",
        },
        {
          label: "C",
          valor: "Brand Equity (Valor de Marca).",
        },
        {
          label: "D",
          valor: "Brand Loyalty (Lealdade).",
        },
        {
          label: "E",
          valor: "Brand Extension.",
        },
      ],
      correta: "B",
      explicacao:
        "Posicionamento é como marca se posiciona na mente do consumidor. Petrobras = 'Energia confiável + Inovação em Renováveis'. Shell = 'Premium + Tecnologia'. Ipiranga = 'Preço acessível'. Diferenciação clara reduz concorrência de preço e cria valor percebido.",
    },
    {
      id: 232,
      pergunta:
        "Qual conceito refere-se ao grau de reconhecimento e lembrança da marca pelo consumidor?",
      opcoes: [
        {
          label: "A",
          valor: "Brand Positioning.",
        },
        {
          label: "B",
          valor: "Brand Awareness.",
        },
        {
          label: "C",
          valor: "Brand Loyalty.",
        },
        {
          label: "D",
          valor: "Brand Equity.",
        },
        {
          label: "E",
          valor: "Brand Architecture.",
        },
      ],
      correta: "B",
      explicacao:
        "Awareness mede: Aided Recall (mostra logo, 'já viu?') e Top-of-Mind (primeira mencionada espontaneamente). Petrobras tem alta awareness para combustível/GLP (marca forte há décadas), menor para lubrificantes vs. Mobil. Investimento contínuo em publicidade mantém awareness.",
    },
    {
      id: 233,
      pergunta:
        "O conceito 'Brand Equity' refere-se a quê em termos financeiros e estratégicos?",
      opcoes: [
        {
          label: "A",
          valor: "Preço da ação da empresa no mercado.",
        },
        {
          label: "B",
          valor: "Valor financeiro agregado da marca (capacidade de premium, lealdade, extensão).",
        },
        {
          label: "C",
          valor: "Soma de todos os ativos tangíveis.",
        },
        {
          label: "D",
          valor: "Número de pontos de venda.",
        },
        {
          label: "E",
          valor: "Total de funcionários da empresa.",
        },
      ],
      correta: "B",
      explicacao:
        "Brand Equity é valor intangível: marca forte permite cobrar premium (+3-5% vs. genérico), gera lealdade (repeat purchase), facilita extensão (novo produto). Petrobras Lubrax premium custa +15% vs. genérico = alto brand equity. Shell, Mobil competem no mesmo espaço com equity similar.",
    },
    {
      id: 234,
      pergunta:
        "Qual estratégia refere-se ao uso da marca estabelecida para lançar novos produtos?",
      opcoes: [
        {
          label: "A",
          valor: "Reposicionamento de Marca.",
        },
        {
          label: "B",
          valor: "Brand Stretch (Extensão de Marca).",
        },
        {
          label: "C",
          valor: "Co-branding.",
        },
        {
          label: "D",
          valor: "Line Extension.",
        },
        {
          label: "E",
          valor: "Revitalização de Marca.",
        },
      ],
      correta: "B",
      explicacao:
        "Brand Extension alavanca marca estabelecida para novo produto/categoria. Petrobras usa: marca Petrobras para combustível, GLP, lubrificantes, aditivos. Sucesso se categoria relacionada, fracasso se muito distante (Petrobras Alimentos seria incoerente). Reduz risco e custo vs. marca nova.",
    },
    {
      id: 235,
      pergunta:
        "Qual elemento constitui a 'Brand Identity'?",
      opcoes: [
        {
          label: "A",
          valor: "Apenas o logotipo da marca.",
        },
        {
          label: "B",
          valor: "Logos, cores, fonte, tone-of-voice, missão, valores que definem a marca.",
        },
        {
          label: "C",
          valor: "Apenas a missão e visão da empresa.",
        },
        {
          label: "D",
          valor: "Número de clientes.",
        },
        {
          label: "E",
          valor: "Quantidade de publicidade TV.",
        },
      ],
      correta: "B",
      explicacao:
        "Brand Identity é conjunto de elementos visuais e verbais: logo Petrobras (amarelo/vermelho), cores, slogan ('A energia vem da natureza'), tom (confiança + inovação), missão (energia sustainable). Consistência cria reconhecimento e credibilidade nos touchpoints.",
    },
  ],

  "modulo-8": [
    {
      id: 236,
      pergunta:
        "Qual método de pesquisa de mercado coleta dados numéricos de grande amostra para análise estatística?",
      opcoes: [
        {
          label: "A",
          valor: "Pesquisa Qualitativa.",
        },
        {
          label: "B",
          valor: "Pesquisa Quantitativa.",
        },
        {
          label: "C",
          valor: "Entrevista em Profundidade.",
        },
        {
          label: "D",
          valor: "Focus Group.",
        },
        {
          label: "E",
          valor: "Observação Etnográfica.",
        },
      ],
      correta: "B",
      explicacao:
        "Quantitativa usa surveys, questionários com escala (1-5), amostra grande (n=1000+) para estatísticas. Petrobras faz: pesquisa 'satisfação com combustível' (n=2000), 'conhecimento marca' (n=5000). Rigor estatístico, generalização, mas menos profundidade em 'por quê'.",
    },
    {
      id: 237,
      pergunta:
        "Qual método explora motivações, percepções profundas com pequenas amostras (exploratório)?",
      opcoes: [
        {
          label: "A",
          valor: "Pesquisa Quantitativa via survey.",
        },
        {
          label: "B",
          valor: "Pesquisa Qualitativa (focus groups, entrevistas em profundidade, observação).",
        },
        {
          label: "C",
          valor: "Teste A/B.",
        },
        {
          label: "D",
          valor: "Big Data Analytics.",
        },
        {
          label: "E",
          valor: "Análise de Concorrentes.",
        },
      ],
      correta: "B",
      explicacao:
        "Qualitativa explora 'por quê' consumidor escolhe marca (insights profundos) via focus groups (8-10 pessoas) ou entrevistas 1:1. Petrobras faz: focus 'por que trocou para Shell?' ou 'o que seria lubrificante ideal?'. Amostra pequena, sem generalização estatística, mas riqueza.",
    },
    {
      id: 238,
      pergunta:
        "Qual etapa de pesquisa define objetivos, variáveis e metodologia antes da coleta de dados?",
      opcoes: [
        {
          label: "A",
          valor: "Análise de Dados.",
        },
        {
          label: "B",
          valor: "Coleta de Dados.",
        },
        {
          label: "C",
          valor: "Planejamento/Design da Pesquisa (Briefing).",
        },
        {
          label: "D",
          valor: "Implementação.",
        },
        {
          label: "E",
          valor: "Disseminação de Resultados.",
        },
      ],
      correta: "C",
      explicacao:
        "Briefing/Planejamento define: pergunta de pesquisa ('qual perfil cliente GLP?'), método (qual: survey vs. focus?), amostra (quantos? qual segmento?), escopo (região? período?). Petrobras briefing típico: 'entender barreiras adoção combustível premium' → faz focus groups + survey.",
    },
    {
      id: 239,
      pergunta:
        "Qual ferramenta de pesquisa interroga respondentes via formulário estruturado com perguntas padronizadas?",
      opcoes: [
        {
          label: "A",
          valor: "Survey/Questionário.",
        },
        {
          label: "B",
          valor: "Entrevista Aberta.",
        },
        {
          label: "C",
          valor: "Focus Group.",
        },
        {
          label: "D",
          valor: "Observação Participante.",
        },
        {
          label: "E",
          valor: "Análise Documental.",
        },
      ],
      correta: "A",
      explicacao:
        "Survey/Questionário padroniza perguntas (escala Likert 1-5, múltipla escolha) para comparação entre respondentes. Petrobras usa: 'Qual é sua satisfação com combustível?' (1=muito insatisfeito, 5=muito satisfeito), 'Com que frequência abastece?' (semanal, quinzenal, mensal). Quantificável, escalável.",
    },
    {
      id: 240,
      pergunta:
        "Qual ferramenta de pesquisa reúne 8-12 consumidores em discussão moderada sobre tópico de interesse?",
      opcoes: [
        {
          label: "A",
          valor: "Survey Online.",
        },
        {
          label: "B",
          valor: "Entrevista Individual.",
        },
        {
          label: "C",
          valor: "Focus Group.",
        },
        {
          label: "D",
          valor: "Teste de Produto.",
        },
        {
          label: "E",
          valor: "Análise de Redes Sociais.",
        },
      ],
      correta: "C",
      explicacao:
        "Focus Group reúne grupo pequeno (8-12) em ambiente controlado para discutir tópico (moderador guia). Petrobras usa: 'Como seria postos Petrobras ideal?' ou 'GLP vs. gás canalizado - qual escolher?'. Interações entre participantes geram insights, dinâmica grupal enriquece data.",
    },
  ],

  "modulo-9": [
    {
      id: 241,
      pergunta:
        "Qual estratégia de marketing é mais adequada para Petrobras no contexto de sua atuação em COMBUSTÍVEIS (B2C)?",
      opcoes: [
        {
          label: "A",
          valor: "Volume + Conveniência (proximidade postos, programa pontos, preço competitivo).",
        },
        {
          label: "B",
          valor: "Premium puro (preço alto, foco luxury).",
        },
        {
          label: "C",
          valor: "Direct-to-consumer sem intermediários.",
        },
        {
          label: "D",
          valor: "Foco exclusivo em marketing de conteúdo.",
        },
        {
          label: "E",
          valor: "Retirada do mercado de combustível.",
        },
      ],
      correta: "A",
      explicacao:
        "Combustível Petrobras compete em conveniência + volume: postos ubíquos, programa Estação (pontos/benefícios), preço no range competitivo com Shell/Ipiranga. Não é premium (como Shell premium) nem ultra-budget. Estratégia: 'energia confiável + dia a dia'.",
    },
    {
      id: 242,
      pergunta:
        "Em qual segmento B2B Petrobras tem maior potencial de margem e diferenciação?",
      opcoes: [
        {
          label: "A",
          valor: "Lubrificantes industriais de alto desempenho + aditivos especializados.",
        },
        {
          label: "B",
          valor: "Combustível para frota (diesel puro, sem diferencial).",
        },
        {
          label: "C",
          valor: "Comercialização de óleo cru.",
        },
        {
          label: "D",
          valor: "Vendas atacadistas de GLP.",
        },
        {
          label: "E",
          valor: "Consultoria de transporte.",
        },
      ],
      correta: "A",
      explicacao:
        "Lubrificantes B2B (industrial, offshore, automotive de alto desempenho) oferecem margem 3x vs. combustível commodity. Petrobras Lubrax compete com Mobil, Shell Tellus em especificações técnicas, confiabilidade, soluções customizadas. ROI em venda pessoal + P&D é alto.",
    },
    {
      id: 243,
      pergunta:
        "Qual tema é MAIS crítico para posicionamento Petrobras na próxima década?",
      opcoes: [
        {
          label: "A",
          valor: "Transição Energética (renováveis, biocombustíveis, energia solar/eólica).",
        },
        {
          label: "B",
          valor: "Aumento exclusivo de preço de combustível.",
        },
        {
          label: "C",
          valor: "Eliminação total de óleo e gás.",
        },
        {
          label: "D",
          valor: "Foco em refinações apenas.",
        },
        {
          label: "E",
          valor: "Venda de ativos internacionais.",
        },
      ],
      correta: "A",
      explicacao:
        "Transição energética (Agenda 2030 Petrobras) é crítica: biocombustíveis (etanol, biodiesel), energias renováveis (solar, eólica, hidrogênio), mobilidade elétrica. Marketing posiciona Petrobras como 'empresa de energia integrada' (não apenas óleo). Diferencia de concorrentes tradicionais, atrai investidores ESG.",
    },
    {
      id: 244,
      pergunta:
        "Qual é o contexto de GLP (Gás Liquefeito de Petróleo) na estratégia Petrobras B2C?",
      opcoes: [
        {
          label: "A",
          valor: "Produto em decline, sem futuro.",
        },
        {
          label: "B",
          valor: "Estratégia de volume + acessibilidade para classe C/D, distribuidoras como canal, lealdade alta (contrato).",
        },
        {
          label: "C",
          valor: "Foco exclusivo em combustível veicular.",
        },
        {
          label: "D",
          valor: "Produto genérico sem diferenciação.",
        },
        {
          label: "E",
          valor: "Eliminação em favor de renováveis.",
        },
      ],
      correta: "B",
      explicacao:
        "GLP Petrobras segue estratégia de volume acessível: preço competitivo, distribuição via botijão/mangueira, lealdade via contrato de troca. Segmento crítico para classe C/D, complementa estratégia de combustível. Demanda estável (cozinha, água quente) com crescimento sazonal (inverno).",
    },
    {
      id: 245,
      pergunta:
        "Qual ferramenta de marketing Petrobras MAIS reforça posicionamento de 'confiança e segurança' em combustível?",
      opcoes: [
        {
          label: "A",
          valor: "Desconto agressivo em preço.",
        },
        {
          label: "B",
          valor: "Publicidade de volume em rádio barato.",
        },
        {
          label: "C",
          valor: "Certificações de qualidade (ISO, ABNT), garantias de conteúdo (aditivos, pureza), certificação técnica de postos.",
        },
        {
          label: "D",
          valor: "Eliminação de pontos de venda.",
        },
        {
          label: "E",
          valor: "Redução de investimento em logística.",
        },
      ],
      correta: "C",
      explicacao:
        "Confiança vem de certificações objetivas (ISO, ABNT), comunicação de aditivos (gasolina com detergente, diesel com anti-emulsificante), treinamento de frentistas, postos modernos. Petrobras comunica: 'combustível puro + aditivos premium + controle de qualidade' vs. genérico sem transparência.",
    },
  ],

  "modulo-10": [
    {
      id: 246,
      pergunta:
        "Em qual situação competitiva uma empresa REDUZ preço para aumentar market-share rapidamente?",
      opcoes: [
        {
          label: "A",
          valor: "Sempre, em todas as situações.",
        },
        {
          label: "B",
          valor: "Quando entra novo concorrente forte ou busca penetração em novo mercado (produto novo ou região).",
        },
        {
          label: "C",
          valor: "Nunca, mantém preço fixo.",
        },
        {
          label: "D",
          valor: "Apenas para clientes insatisfeitos.",
        },
        {
          label: "E",
          valor: "Somente durante recessão econômica.",
        },
      ],
      correta: "B",
      explicacao:
        "Penetração de preço: entra novo concorrente (ex.: Ipiranga novo em região) → reduz preço temporariamente → captura volume → constrói lealdade. Depois normaliza preço. Risco: 'guerra de preço' que reduz margem de todos. Petrobras faz isso seletivamente em regiões competitivas.",
    },
    {
      id: 247,
      pergunta:
        "Como uma marca FORTE (ex.: Petrobras) pode manter margem mesmo com concorrentes de preço baixo?",
      opcoes: [
        {
          label: "A",
          valor: "Reduzindo qualidade para equiparar preço.",
        },
        {
          label: "B",
          valor: "Comunicando diferencial (qualidade, confiança, serviço, programa pontos) e cobrando premium justificado.",
        },
        {
          label: "C",
          valor: "Eliminando todos os concorrentes.",
        },
        {
          label: "D",
          valor: "Aumentando preço constantemente.",
        },
        {
          label: "E",
          valor: "Mudando de negócio completamente.",
        },
      ],
      correta: "B",
      explicacao:
        "Brand premium permite margem: Petrobras cobra +2-3% vs. Ipiranga por percepção de 'segurança de marca', Estação (programa), seleção de postos. Shell cobra +5-8% por 'premium/tecnologia'. Sem diferencial comunicado, vira commodity e margem cai. Petrobras investe em diferencial para justificar preço.",
    },
    {
      id: 248,
      pergunta:
        "Qual ferramenta de marketing ajuda Petrobras a coletar feedback de clientes para melhorar produtos?",
      opcoes: [
        {
          label: "A",
          valor: "Focus groups + Net Promoter Score (NPS) + surveys de satisfação.",
        },
        {
          label: "B",
          valor: "Anúncios de TV em horário nobre.",
        },
        {
          label: "C",
          valor: "Redução contínua de preço.",
        },
        {
          label: "D",
          valor: "Fechamento de postos.",
        },
        {
          label: "E",
          valor: "Eliminação de programa de fidelização.",
        },
      ],
      correta: "A",
      explicacao:
        "NPS (0-10, quanto recomenda?) + satisfação geral (1-5) + feedback aberto (foco groups) = dados para melhorias. Petrobras rastreia: satisfação combustível (qualidade), serviço (filas), programa (utilidade). Scores baixos → ações corretivas (treinamento frentista, postos modernos, app Estação melhor).",
    },
    {
      id: 249,
      pergunta:
        "Como a transição energética (renovável) muda a estratégia de marketing Petrobras?",
      opcoes: [
        {
          label: "A",
          valor: "Sem impacto, continua igual.",
        },
        {
          label: "B",
          valor: "Reposiciona de 'empresa de óleo & gás' para 'empresa de energia integrada' (óleo + renováveis), atrai novo público (eco-conscious), diferencia de concorrentes.",
        },
        {
          label: "C",
          valor: "Abandona combustível completamente.",
        },
        {
          label: "D",
          valor: "Aumenta preço de combustível drasticamente.",
        },
        {
          label: "E",
          valor: "Não tem estratégia clara.",
        },
      ],
      correta: "B",
      explicacao:
        "Reposicionamento crítico: Petrobras comunica portfólio diverso (biocombustíveis, energia solar, eólica, hidrogênio) para atrair consumidores ESG, investidores, novos talentos. 'Energia para Crescer' incorpora visão integrada. Diferencia de Shell (também em transição) e Ipiranga (ainda foco óleo). ROI em imagem corporativa.",
    },
    {
      id: 250,
      pergunta:
        "Qual estratégia integra adequadamente o 'Marketing Gerencial' (decisões estratégicas) com execução tática?",
      opcoes: [
        {
          label: "A",
          valor: "Marketing estratégico define segmentação/positioning → Marketing tático executa publicidade/promoção em alinhamento.",
        },
        {
          label: "B",
          valor: "Não há relação entre estratégia e tática.",
        },
        {
          label: "C",
          valor: "Tática define estratégia (inversão).",
        },
        {
          label: "D",
          valor: "Apenas estratégia importa, tática é irrelevante.",
        },
        {
          label: "E",
          valor: "Apenas tática importa, estratégia não.",
        },
      ],
      correta: "A",
      explicacao:
        "Marketing Gerencial (estratégico): segmenta combustível/GLP/lubrificantes, posiciona vs. concorrentes, define target. Marketing Tático: publica anúncios TV/digital, executa programa Estação, treina frentistas. Coerência = impacto máximo. Desalinhamento = desperdício (ex.: postos ruins mas publicidade premium).",
    },
  ],
};
