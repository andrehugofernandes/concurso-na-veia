import { QuizQuestion } from "../../shared";

export const MARKETING_QUIZZES = {
  "modulo-1": [
    {
      id: "mkt-m1-q1",
      pergunta: "Qual é o framework fundamental de marketing conhecido como 4 Ps?",
      opcoes: {
        A: "Pesquisa, Preço, Praça, Promoção",
        B: "Produto, Preço, Praça, Promoção",
        C: "Publicidade, Pesquisa, Preço, Promoção",
        D: "Produto, Posicionamento, Praça, Publicidade",
      },
      correta: "B",
      explicacao:
        "4 Ps: Produto (características), Preço (estratégia), Praça (distribuição), Promoção (comunicação). Framework clássico de marketing.",
    },
    {
      id: "mkt-m1-q2",
      pergunta: "Como a Petrobras aplica o 'Produto' no combustível?",
      opcoes: {
        A: "Apenas cobrar preço baixo",
        B: "Gasolina/Diesel com aditivos, qualidade ISO, conformidade regulatória",
        C: "Vender em qualquer loja",
        D: "Sem diferencial específico",
      },
      correta: "B",
      explicacao:
        "Produto Petrobras: combustíveis com pureza ISO 6728, aditivos detergentes para limpeza de motor, qualidade garantida.",
    },
    {
      id: "mkt-m1-q3",
      pergunta: "Por que o 'Preço' em marketing vai além do custo?",
      opcoes: {
        A: "Sem razão específica",
        B: "Preço reflete posicionamento, valor percebido, elasticidade de demanda, estratégia competitiva",
        C: "Apenas para maximizar ganho",
        D: "É igual ao custo",
      },
      correta: "B",
      explicacao:
        "Preço estratégico: nem sempre correlato ao custo. Produto inelástico (lubrificantes) permite premium. Commodity (combustível) requer competição inteligente.",
    },
    {
      id: "mkt-m1-q4",
      pergunta: "O que representa 'Praça' no 4 Ps?",
      opcoes: {
        A: "Apenas localização física",
        B: "Canais de distribuição (postos, distribuidoras, e-commerce)",
        C: "Apenas vendas online",
        D: "Localização de fabrica",
      },
      correta: "B",
      explicacao:
        "Praça: estratégia de distribuição. Petrobras usa postos próprios (direto), franchisados (seletiva), distribuidoras regionais (intensiva).",
    },
    {
      id: "mkt-m1-q5",
      pergunta: "Na Petrobras, qual é a estratégia de 'Promoção' para combustível?",
      opcoes: {
        A: "Sem promoção",
        B: "App Estação (pontos fidelização), publicidade TV, programa de descontos",
        C: "Apenas publicidade",
        D: "Apenas descontos de preço",
      },
      correta: "B",
      explicacao:
        "Promoção integrada: app Estação cria lealdade, TV constrói brand awareness, descontos pontuais estimulam trial.",
    },
    {
      id: "mkt-m1-q6",
      pergunta: "Qual é o complemento moderno ao 4 Ps para serviços?",
      opcoes: {
        A: "Não há complemento",
        B: "3 Ps: Pessoas, Processo, Physical Evidence",
        C: "Apenas 4 Ps basta",
        D: "Marketing costuma ignorar serviço",
      },
      correta: "B",
      explicacao:
        "Para serviços (inclui elementos de postos Petrobras): Pessoas (treinamento frentista), Processo (abastecimento rápido), Physical (postos modernos).",
    },
    {
      id: "mkt-m1-q7",
      pergunta: "Por que combustível é considerado commodity em marketing?",
      opcoes: {
        A: "Sem razão especial",
        B: "Difícil diferenciar por produto puro, requer diferenciação via marca/serviço",
        C: "Porque é barato",
        D: "Sem competição",
      },
      correta: "B",
      explicacao:
        "Commodity: gasolina é gasolina, difícil diferenciação por atributos físicos. Solução: marca Petrobras (confiança), postos modernos (experiência).",
    },
    {
      id: "mkt-m1-q8",
      pergunta: "Qual é o resultado esperado de aplicação correta do 4 Ps?",
      opcoes: {
        A: "Sem resultado esperado",
        B: "Posicionamento claro, valor percebido, lealdade de cliente, margem saudável",
        C: "Apenas volume de vendas",
        D: "Menor preço que concorrentes",
      },
      correta: "B",
      explicacao:
        "4 Ps bem aplicados criam valor integrado: clientes entendem diferencial, pagam premium (se merecido), retornam (lealdade).",
    },
    {
      id: "mkt-m1-q9",
      pergunta: "Na Petrobras, como 'Promoção' de Lubrax difere de combustível?",
      opcoes: {
        A: "Sem diferença",
        B: "Combustível: massa (TV), Lubrax: especializado (RP técnica, venda pessoal)",
        C: "Lubrax não tem promoção",
        D: "Ambas usam TV igualmente",
      },
      correta: "B",
      explicacao:
        "Promoção segmentada: combustível B2C requer publicidade massa (TV). Lubrax B2B requer RP técnica + vendedores especializados.",
    },
    {
      id: "mkt-m1-q10",
      pergunta: "Qual é a principal lição do 4 Ps para decisões de marketing?",
      opcoes: {
        A: "Sem lição específica",
        B: "Decisões integradas: mudança em um P afeta outros (ex: preço premium requer produto superior + distribuição seletiva)",
        C: "Cada P é independente",
        D: "Preço é o único P importante",
      },
      correta: "B",
      explicacao:
        "Integração 4 Ps: aumentar preço (premium) requer melhoria de produto + distribuição seletiva + promoção educativa, não isolado.",
    },
  ],
  "modulo-2": [
    {
      id: "mkt-m2-q1",
      pergunta: "O que é 'Segmentação' em marketing?",
      opcoes: {
        A: "Dividir empresa em departamentos",
        B: "Dividir mercado em grupos homogêneos com necessidades/características similares",
        C: "Apenas divisão geográfica",
        D: "Não existe segmentação",
      },
      correta: "B",
      explicacao:
        "Segmentação: identificar grupos de clientes com características similares (demográfica, psicográfica, comportamental, geográfica).",
    },
    {
      id: "mkt-m2-q2",
      pergunta: "Qual é a diferença entre 'Targeting' e 'Segmentação'?",
      opcoes: {
        A: "Não há diferença",
        B: "Segmentação: dividir mercado; Targeting: escolher quais segmentos servir",
        C: "Apenas nomes diferentes",
        D: "Não existem ambos",
      },
      correta: "B",
      explicacao:
        "Segmentação = análise (dividir). Targeting = decisão (qual segmento? qual o alvo? o que priorizar?).",
    },
    {
      id: "mkt-m2-q3",
      pergunta: "Na Petrobras, qual é um segmento demográfico de combustível?",
      opcoes: {
        A: "Apenas homens",
        B: "Motoristas 25-65 anos, classe B/C, renda média-alta",
        C: "Apenas mulheres idosas",
        D: "Sem segmentação",
      },
      correta: "B",
      explicacao:
        "Segmentação demográfica combustível: motoristas adultos-médios (25-65), renda que permite ter carro (classe B/C).",
    },
    {
      id: "mkt-m2-q4",
      pergunta: "O que é 'Posicionamento' no STP framework?",
      opcoes: {
        A: "Localização física",
        B: "Como marca é percebida na mente do consumidor vs. concorrentes (diferencial)",
        C: "Apenas slogan",
        D: "Sem definição clara",
      },
      correta: "B",
      explicacao:
        "Posicionamento: imagem mental que cliente tem de marca. Petrobras = confiança + qualidade vs. Shell = multinacional vs. Ipiranga = genérica.",
    },
    {
      id: "mkt-m2-q5",
      pergunta: "Qual critério valida se um segmento é viável?",
      opcoes: {
        A: "Não há critério",
        B: "MALD: Mensurável, Acessível, Lucrativo, Defensável",
        C: "Apenas tamanho",
        D: "Apenas lucro",
      },
      correta: "B",
      explicacao:
        "MALD: Mensurável (tamanho quantificável?), Acessível (consigo atingir?), Lucrativo (margem?), Defensável (consigo competir?).",
    },
    {
      id: "mkt-m2-q6",
      pergunta: "Na Petrobras, qual segmentação é considerada eficiente?",
      opcoes: {
        A: "Sem limite de segmentos",
        B: "3-5 segmentos principais de tamanho crítico (combustível, GLP, lubrificantes, renováveis)",
        C: "Apenas 1 segmento",
        D: "100+ micro-segmentos",
      },
      correta: "B",
      explicacao:
        "Eficiência vs. granularidade: Petrobras escolhe 3-5 segmentos principais com tamanho crítico, evita 100s micro-segmentos ineficientes.",
    },
    {
      id: "mkt-m2-q7",
      pergunta: "Qual tipo de segmentação usa 'estilo de vida'?",
      opcoes: {
        A: "Demográfica",
        B: "Psicográfica",
        C: "Comportamental",
        D: "Geográfica",
      },
      correta: "B",
      explicacao:
        "Psicográfica: valores, lifestyle, personalidade. Ex: eco-conscious (quer renováveis) vs. performance-seekers (quer premium).",
    },
    {
      id: "mkt-m2-q8",
      pergunta: "Como Petrobras diferencia lubrificantes de combustível em segmentação?",
      opcoes: {
        A: "Mesma segmentação",
        B: "Combustível: B2C motoristas; Lubrificantes: B2B engenheiros/operadores (maior renda, foco qualidade)",
        C: "Não há diferença",
        D: "Apenas preço difere",
      },
      correta: "B",
      explicacao:
        "Segmentação diferenciada: Lubrax ataca segmento B2B (profissionais), não motoristas. Critérios: expertise, sensibilidade qualidade, negociação contrato.",
    },
    {
      id: "mkt-m2-q9",
      pergunta: "Qual é o risco de micro-segmentação excessiva?",
      opcoes: {
        A: "Sem risco",
        B: "Tamanho mercado muito pequeno, custo atendimento desproporcional, ineficácia",
        C: "Mais eficiência",
        D: "Sem consequência",
      },
      correta: "B",
      explicacao:
        "Micro-segmento excessivo (ex: 'motoristas 60+ que trocam carro a cada 5 anos em SP') é tão pequeno que não justifica investimento.",
    },
    {
      id: "mkt-m2-q10",
      pergunta: "Qual é a sequência lógica correta: Segmentação → Targeting → Posicionamento?",
      opcoes: {
        A: "Posicionamento antes de segmentação",
        B: "Análise (segmentos) → Escolha (qual target) → Diferenciação (como se posiciona)",
        C: "Sem sequência lógica",
        D: "Apenas segmentação importa",
      },
      correta: "B",
      explicacao:
        "Sequência lógica STP: (1) Dividir mercado em grupos (2) Escolher qual grupo servir (3) Definir como diferenciar para aquele grupo.",
    },
  ],
  "modulo-3": [
    {
      id: "mkt-m3-q1",
      pergunta: "Qual é a estratégia de preço 'Penetração'?",
      opcoes: {
        A: "Preço muito alto",
        B: "Preço baixo inicial para ganhar volume rápido e market share",
        C: "Preço aleatório",
        D: "Sem estratégia",
      },
      correta: "B",
      explicacao:
        "Penetração: preço baixo no lançamento para atrair muitos clientes rápido, ganhar volume e mercado. Exemplo: GLP Petrobras (acessibilidade).",
    },
    {
      id: "mkt-m3-q2",
      pergunta: "O que é estratégia de preço 'Skimming' ou 'Desnatação'?",
      opcoes: {
        A: "Preço sempre igual ao concorrente",
        B: "Preço alto inicial (desnatação de early adopters), depois reduz ao longo do tempo",
        C: "Preço aleatório",
        D: "Sem estratégia definida",
      },
      correta: "B",
      explicacao:
        "Skimming: maximiza receita de early adopters dispostos a pagar premium. Depois reduz para atrair mercado de massa. Exemplo: Lubrax premium inicial.",
    },
    {
      id: "mkt-m3-q3",
      pergunta: "Qual estratégia de preço a Petrobras usa para combustível comum?",
      opcoes: {
        A: "Penetração agressiva",
        B: "Skimming premium",
        C: "Competitiva (alinhada ao mercado) + diferenciação não-preço",
        D: "Sem estratégia",
      },
      correta: "C",
      explicacao:
        "Combustível commodity: preço competitivo vs. Shell/Ipiranga (não tenta vencer em preço isolado), diferencia via marca + postos + programa Estação.",
    },
    {
      id: "mkt-m3-q4",
      pergunta: "O que é 'Elasticidade de Demanda' em preço?",
      opcoes: {
        A: "Sem significado",
        B: "Sensibilidade: como mudança de preço afeta quantidade demandada",
        C: "Apenas custo",
        D: "Sem impacto em marketing",
      },
      correta: "B",
      explicacao:
        "Elasticidade: Elástica (sensível a preço, ex: combustível -15% volume se +10% preço). Inelástica (insensível, ex: lubrificantes -2% volume se +10% preço).",
    },
    {
      id: "mkt-m3-q5",
      pergunta: "Por que Lubrax custa +20% vs. genéricos apesar de ser commodity?",
      opcoes: {
        A: "Sem razão especial",
        B: "Demanda inelástica: qualidade/performance crítica justifica premium, cliente não negocia",
        C: "Porque Petrobras cobra caro",
        D: "Sem diferença",
      },
      correta: "B",
      explicacao:
        "Lubrificantes B2B: demanda inelástica. Engenheiro paga premium por qualidade garantida, performance certa, não troca por preço.",
    },
    {
      id: "mkt-m3-q6",
      pergunta: "Qual é o risco da 'Guerra de Preço'?",
      opcoes: {
        A: "Sem risco",
        B: "Todos reduzem preço, margem cai para todos, sustentabilidade desaparece",
        C: "Beneficia consumidor",
        D: "Sem impacto",
      },
      correta: "B",
      explicacao:
        "Guerra de preço: race to bottom. Todos reduzem, ninguém se beneficia por muito tempo. Petrobras evita, compet em valor.",
    },
    {
      id: "mkt-m3-q7",
      pergunta: "Como Petrobras diferencia preço de Diesel S-500 premium?",
      opcoes: {
        A: "Diesel puro é igual, sem diferencial",
        B: "Diesel S-500: qualidade superior (+aditivos), menos enxofre = melhor performance + sustentabilidade, justifica +2-3% preço",
        C: "Sem diferenciação",
        D: "Apenas publicidade",
      },
      correta: "B",
      explicacao:
        "Diesel S-500: regulação ambiental + aditivos detergentes + performance melhorada. Custo real maior justifica preço premium vs. Diesel comum.",
    },
    {
      id: "mkt-m3-q8",
      pergunta: "Qual é a fórmula para calcular elasticidade-preço?",
      opcoes: {
        A: "Sem fórmula",
        B: "E = (% Mudança Quantidade / % Mudança Preço). Se |E| > 1 = Elástica; < 1 = Inelástica",
        C: "Apenas observação",
        D: "Sem cálculo",
      },
      correta: "B",
      explicacao:
        "Elasticidade-preço da demanda = % mudança quantidade / % mudança preço. |E| > 1 (elástico, sensível), < 1 (inelástico, insensível).",
    },
    {
      id: "mkt-m3-q9",
      pergunta: "Na prática Petrobras, qual segmento tem demanda mais elástica?",
      opcoes: {
        A: "Combustível",
        B: "Lubrificantes",
        C: "GLP",
        D: "Nenhum",
      },
      correta: "A",
      explicacao:
        "Combustível: commodity, muitos substitutos próximos (Shell, Ipiranga, Ale), cliente muda por +1% preço (elástico). Lubrificantes: especializado, menos substitutos (inelástico).",
    },
    {
      id: "mkt-m3-q10",
      pergunta: "Qual é a principal lição sobre preço em marketing?",
      opcoes: {
        A: "Sempre cobrar o máximo possível",
        B: "Preço é ferramenta estratégica que reflete posicionamento + elasticidade + contexto competitivo",
        C: "Preço não importa",
        D: "Sempre igualar concorrente",
      },
      correta: "B",
      explicacao:
        "Preço estratégico: integra posicionamento (commodity vs. premium), elasticidade (sensibilidade cliente), concorrência, ciclo produto.",
    },
  ],
  "modulo-4": [
    {
      id: "mkt-m4-q1",
      pergunta: "Qual é a diferença entre canal 'Direto' e 'Indireto'?",
      opcoes: {
        A: "Não há diferença",
        B: "Direto: Fabricante→Consumidor; Indireto: Fabricante→Distribuidor→Consumidor",
        C: "Ambos são iguais",
        D: "Apenas nome",
      },
      correta: "B",
      explicacao:
        "Direto: Petrobras vende combustível em postos próprios (controle total, margem alta). Indireto: Petrobras vende via distribuidoras (alcance maior, margem menor).",
    },
    {
      id: "mkt-m4-q2",
      pergunta: "Qual é a vantagem principal de canal 'Direto'?",
      opcoes: {
        A: "Sem vantagem",
        B: "Margem total + controle completo da experiência do cliente",
        C: "Apenas alcance",
        D: "Custo baixo",
      },
      correta: "B",
      explicacao:
        "Direto: 100% da margem fica com empresa, controle sobre qualidade/marca/preço. Desvantagem: custo investimento alto (postos, pessoal).",
    },
    {
      id: "mkt-m4-q3",
      pergunta: "O que significa distribuição 'Intensiva'?",
      opcoes: {
        A: "Sem distribuidores",
        B: "Muitos intermediários (cobertura máxima, postos ubíquos)",
        C: "Apenas grandes cidades",
        D: "Sem distribuição",
      },
      correta: "B",
      explicacao:
        "Intensiva: maximiza cobertura. Combustível em cada bairro (8000+ postos). Objetivo: conveniência (cliente não dirige longe).",
    },
    {
      id: "mkt-m4-q4",
      pergunta: "Qual é a característica de distribuição 'Seletiva'?",
      opcoes: {
        A: "Sem seleção",
        B: "Alguns intermediários (balanço entre controle e alcance)",
        C: "Apenas um intermediário",
        D: "Muitos intermediários",
      },
      correta: "B",
      explicacao:
        "Seletiva: escolhe intermediários que combinam com brand. GLP em distribuidoras regionais selecionadas. Lubrificantes em oficinas especializadas.",
    },
    {
      id: "mkt-m4-q5",
      pergunta: "O que é distribuição 'Exclusiva'?",
      opcoes: {
        A: "Muito aberta",
        B: "Poucos/um intermediário (relacionamento aprofundado)",
        C: "Sem exclusividade",
        D: "Muitos canais",
      },
      correta: "B",
      explicacao:
        "Exclusiva: relacionamento único com distribuidor (ex: GLP tem distribuidor exclusivo por região). Profundo, contratual, colaborativo.",
    },
    {
      id: "mkt-m4-q6",
      pergunta: "Qual é o trade-off entre margem e cobertura em canais?",
      opcoes: {
        A: "Sem trade-off",
        B: "Direto: margem alta mas cobertura limitada; Indireto: margem baixa mas cobertura ampla",
        C: "Ambos têm margem alta",
        D: "Não existe relação",
      },
      correta: "B",
      explicacao:
        "Trade-off fundamental: Direto requer investimento (caro), cobre menos. Indireto terceiriza (barato), cobre tudo. Petrobras escolhe por produto.",
    },
    {
      id: "mkt-m4-q7",
      pergunta: "O que é 'Conflito de Canal' em distribuição?",
      opcoes: {
        A: "Sem conflito possível",
        B: "Quando vendedor direto compete com distribuidor, distribuidor sente 'traição', muda para concorrente",
        C: "Apenas conflito verbal",
        D: "Sem consequência",
      },
      correta: "B",
      explicacao:
        "Conflito real: vendedor direto em mesma região de distribuidor cria concorrência interna. Solução: territórios claros, margens justas, transparência.",
    },
    {
      id: "mkt-m4-q8",
      pergunta: "Como Petrobras evita conflito entre canais direto e indireto?",
      opcoes: {
        A: "Sem medida",
        B: "Define territórios (distribuidor em região X, vendedor em Y), comunicação clara, margens alinhadas",
        C: "Ignora conflito",
        D: "Apenas preço",
      },
      correta: "B",
      explicacao:
        "Governance de canal: Petrobras define geograficamente (distribuidor =  classe C/interior, vendedor = B2B/offshore), evita overlap.",
    },
    {
      id: "mkt-m4-q9",
      pergunta: "Qual canal Petrobras usa para Lubrificantes B2B?",
      opcoes: {
        A: "Apenas direto",
        B: "Combinação: vendedor direto (consultivo), distribuidor especializado (cobertura), e-commerce (oficinas)",
        C: "Apenas indireto",
        D: "Sem estratégia clara",
      },
      correta: "B",
      explicacao:
        "Lubrax multi-canal: vendedores diretos em indústrias/offshore (consultoria), distribuidoras (cobertura), e-commerce (oficinas pequenas/SOHO).",
    },
    {
      id: "mkt-m4-q10",
      pergunta: "Por que E-commerce é considerado canal emergente para Petrobras?",
      opcoes: {
        A: "Sem relevância",
        B: "Permite venda direto (DTC), reduz intermediários, atinge pequenas oficinas e SOHO que não visitam distribuidoras",
        C: "Apenas modismo",
        D: "Sem futuro",
      },
      correta: "B",
      explicacao:
        "E-commerce Lubrax: segmento não-atendido (oficinas pequenas) acessa online, compra sem salesman. Novo canal complementar.",
    },
  ],
  "modulo-5": [
    {
      id: "mkt-m5-q1",
      pergunta: "O que é IMC (Integrated Marketing Communications)?",
      opcoes: {
        A: "Sem significado",
        B: "Coordenação coerente de Publicidade, RP, Promoção e Venda Pessoal em mensagem única",
        C: "Apenas publicidade",
        D: "Sem integração",
      },
      correta: "B",
      explicacao:
        "IMC: todos os canais (TV, RP, promoção, vendas) dizem a mesma coisa. Exemplo: 'Energia para Crescer' em publicidade + RP + app + vendedor.",
    },
    {
      id: "mkt-m5-q2",
      pergunta: "Qual é a diferença entre 'Publicidade' e 'Relações Públicas'?",
      opcoes: {
        A: "Não há diferença",
        B: "Publicidade: paga/controlada; RP: earned/credibilidade via mídia independente",
        C: "Ambas são pagas",
        D: "Sem diferença relevante",
      },
      correta: "B",
      explicacao:
        "Publicidade: empresa paga por espaço (TV, rádio, digital). RP: press release obtém cobertura de jornalista (earned = gratuito + credibilidade).",
    },
    {
      id: "mkt-m5-q3",
      pergunta: "Como Petrobras usa 'Promoção de Vendas' para combustível?",
      opcoes: {
        A: "Sem promoção",
        B: "App Estação (pontos fidelização), sorteios, descontos pontuais",
        C: "Apenas preço reduzido",
        D: "Sem incentivos",
      },
      correta: "B",
      explicacao:
        "Promoção Estação: acumula pontos em combustível, resgate em café/alimentação. Objetivo: frequência, retenção, diferenciação vs. concorrentes.",
    },
    {
      id: "mkt-m5-q4",
      pergunta: "Qual canal de comunicação é mais importante para lubrificantes B2B?",
      opcoes: {
        A: "TV em massa",
        B: "Venda Pessoal (consultores) + RP técnica (seminários, revistas especializadas)",
        C: "Apenas publicidade",
        D: "Sem comunicação estruturada",
      },
      correta: "B",
      explicacao:
        "B2B lubrificantes: decisão complexa (engenheiro), requer consultoria (vendedor) + educação (RP técnica). TV massa = ineficaz.",
    },
    {
      id: "mkt-m5-q5",
      pergunta: "O que é 'Venda Pessoal' em marketing?",
      opcoes: {
        A: "Conversação amiga",
        B: "Contato direto vendedor-cliente para negociação, consultoria, relacionamento",
        C: "Apenas transação",
        D: "Sem estrutura",
      },
      correta: "B",
      explicacao:
        "Venda Pessoal: Lubrax consultores em indústrias explicam benefícios, especificações, negociam contrato, pós-venda. Alto valor agregado.",
    },
    {
      id: "mkt-m5-q6",
      pergunta: "Como se calcula orçamento de comunicação em IMC?",
      opcoes: {
        A: "Sem método",
        B: "Reflete onde cliente toma decisão + segmento: B2C (publicidade), B2B (venda pessoal)",
        C: "Igual para todos canais",
        D: "Sem alocação",
      },
      correta: "B",
      explicacao:
        "Alocação estratégica: combustível B2C (50% publicidade, 20% promoção); Lubrax B2B (50% venda pessoal, 20% RP técnica).",
    },
    {
      id: "mkt-m5-q7",
      pergunta: "Qual é o risco de desalinhamento em IMC?",
      opcoes: {
        A: "Sem risco",
        B: "Publicidade promete (ex: 'postos premium') mas realidade não entrega = confiança destruída",
        C: "Apenas problema cosmético",
        D: "Sem consequência",
      },
      correta: "B",
      explicacao:
        "Desalinhamento IMC: promessa (publicidade) ≠ realidade (experiência) = dano reputacional. Petrobras moderniza postos antes de campanhas.",
    },
    {
      id: "mkt-m5-q8",
      pergunta: "Na Petrobras, qual é o objetivo da campanha 'Energia para Crescer'?",
      opcoes: {
        A: "Sem objetivo claro",
        B: "Mensagem integrada: combustível (volume), lubrificantes (técnico), renováveis (futuro), GLP (acessibilidade)",
        C: "Apenas publicidade",
        D: "Sem estratégia",
      },
      correta: "B",
      explicacao:
        "Campanha integrada 'Energia para Crescer': unifica todos segmentos sob guarda-chuva estratégico único (energia que transforma).",
    },
    {
      id: "mkt-m5-q9",
      pergunta: "Qual é o impacto de comunicação incoerente em marca?",
      opcoes: {
        A: "Sem impacto",
        B: "Confunde cliente, reduz confiança, enfraquece brand equity, aumenta churn",
        C: "Beneficia marca",
        D: "Sem consequência",
      },
      correta: "B",
      explicacao:
        "Comunicação incoerente: 'Somos sustentáveis' vs. 'Investimos bilhões em óleo' = desconexão credibilidade = marca enfraquecida.",
    },
    {
      id: "mkt-m5-q10",
      pergunta: "Qual é a principal lição de IMC?",
      opcoes: {
        A: "Cada canal isolado",
        B: "Todos canais devem trabalhar juntos em mensagem coerente, amplificando efeito e reforçando posicionamento",
        C: "Apenas um canal importa",
        D: "Sem lição estruturada",
      },
      correta: "B",
      explicacao:
        "Sinergia IMC: TV cria awareness, app cria lealdade, RP cria credibilidade, vendedor cria conversão. Juntos = efeito > soma partes.",
    },
  ],
  "modulo-6": [
    {
      id: "mkt-m6-q1",
      pergunta: "O que é 'SEO' em marketing digital?",
      opcoes: {
        A: "Sem significado",
        B: "Search Engine Optimization: otimização orgânica para aparecer em buscadores (Google) sem pagar",
        C: "Apenas anúncios",
        D: "Sem técnica",
      },
      correta: "B",
      explicacao:
        "SEO: conteúdo otimizado, palavras-chave, links = ranking alto em Google orgânico. Exemplo: 'Posto Petrobras perto de mim' em Google Maps.",
    },
    {
      id: "mkt-m6-q2",
      pergunta: "Qual é a diferença entre SEO e SEM?",
      opcoes: {
        A: "Sem diferença",
        B: "SEO: orgânico (não-pago); SEM: anúncios pagos em buscadores (Google Ads)",
        C: "Apenas nomes diferentes",
        D: "Ambos são pagos",
      },
      correta: "B",
      explicacao:
        "SEO = tráfego orgânico (custou SEO work). SEM = tráfego pago imediato (Google Ads). SEM é mais rápido mas cara por clique.",
    },
    {
      id: "mkt-m6-q3",
      pergunta: "O que é 'Omnichannel' em marketing digital?",
      opcoes: {
        A: "Sem significado",
        B: "Integração de múltiplos canais (online + offline) em jornada contínua do cliente",
        C: "Apenas online",
        D: "Sem integração",
      },
      correta: "B",
      explicacao:
        "Omnichannel: cliente vê anúncio (SEM) → visita site (SEO) → downla app → abastece em posto → recebe email personalizado. Touchpoints integrados.",
    },
    {
      id: "mkt-m6-q4",
      pergunta: "Qual é a importância de 'Analytics' em marketing digital?",
      opcoes: {
        A: "Sem importância",
        B: "Rastreia conversão, ROI, CAC (Customer Acquisition Cost) para otimizar investimento",
        C: "Apenas relatório",
        D: "Sem uso prático",
      },
      correta: "B",
      explicacao:
        "Analytics: dados concretos de eficácia. Qual canal converte melhor? Quanto custa adquirir cliente? Onde otimizar próxima vez?",
    },
    {
      id: "mkt-m6-q5",
      pergunta: "Na Petrobras, qual é o uso de 'E-commerce'?",
      opcoes: {
        A: "Sem e-commerce",
        B: "Lubrax.com.br (venda direto), aditivos Petrobras (conveniência)",
        C: "Apenas informação",
        D: "Sem relevância",
      },
      correta: "B",
      explicacao:
        "E-commerce Petrobras: Lubrax vende direto para oficinas (SOHO), aditivos online para entusiastas. Novo canal DTC (direct-to-consumer).",
    },
    {
      id: "mkt-m6-q6",
      pergunta: "O que é 'Retargeting' em digital?",
      opcoes: {
        A: "Sem significado",
        B: "Reaproach de cliente que visitou site mas não comprou (anúncios Facebook/Google)",
        C: "Apenas email",
        D: "Sem técnica",
      },
      correta: "B",
      explicacao:
        "Retargeting: cliente vê Lubrax no Google, visita site, sai sem comprar. Semanas depois, vê anúncio Lubrax no Facebook = reminder.",
    },
    {
      id: "mkt-m6-q7",
      pergunta: "Qual é o impacto de LGPD em marketing digital Petrobras?",
      opcoes: {
        A: "Sem impacto",
        B: "Requer consentimento explícito para email/SMS, penalidade até 2% faturamento se violar",
        C: "Não afeta Petrobras",
        D: "Sem regulação",
      },
      correta: "B",
      explicacao:
        "LGPD Brasil: Petrobras coleta consentimento no app Estação antes de enviar ofertas. Violação = multa bilionária. Privacy by design obrigatório.",
    },
    {
      id: "mkt-m6-q8",
      pergunta: "O que é 'Conversion Rate' em marketing digital?",
      opcoes: {
        A: "Sem significado",
        B: "(Visitantes que compram / Total visitantes) × 100% = indicador de eficácia de site",
        C: "Apenas tráfego",
        D: "Sem métrica",
      },
      correta: "B",
      explicacao:
        "Conversion Rate: 1000 visitantes Lubrax.com, 100 compram = 10% CR. Boa CR combustível é 2-3%; premium pode ser < 1%.",
    },
    {
      id: "mkt-m6-q9",
      pergunta: "Como Petrobras usa 'Email' como canal digital?",
      opcoes: {
        A: "Sem uso",
        B: "Newsletter Estação, ofertas personalizadas conforme histórico (CRM), retenção e upsell",
        C: "Apenas spam",
        D: "Sem estratégia",
      },
      correta: "B",
      explicacao:
        "Email marketing Petrobras: segmentação (cliente X recebe oferta combustível, cliente Y recebe Lubrax), personalização via CRM, medição open rate.",
    },
    {
      id: "mkt-m6-q10",
      pergunta: "Qual é a principal vantagem de digital vs. tradicional?",
      opcoes: {
        A: "Sem vantagem especial",
        B: "Medição precisa (quem visitou, clicou, comprou), retargeting, personalização, custo variável",
        C: "Apenas alcance",
        D: "Sem diferença",
      },
      correta: "B",
      explicacao:
        "Digital vantagem: rastreabilidade completa (sabe exatamente ROI), retargeting (aproveita interesse), personalização (AI), pagamento por resultado.",
    },
  ],
  "modulo-7": [
    {
      id: "mkt-m7-q1",
      pergunta: "O que é 'Brand Positioning'?",
      opcoes: {
        A: "Sem significado",
        B: "Como marca é percebida na mente do consumidor vs. concorrentes (diferencial único)",
        C: "Apenas localização",
        D: "Sem posicionamento",
      },
      correta: "B",
      explicacao:
        "Posicionamento Petrobras: 'confiança + qualidade' (histórico) vs. Shell 'multinacional moderna' vs. Ipiranga 'genérica barata'.",
    },
    {
      id: "mkt-m7-q2",
      pergunta: "Qual é a diferença entre 'Brand Awareness' e 'Brand Equity'?",
      opcoes: {
        A: "Não há diferença",
        B: "Awareness: reconhecimento (lembra marca?); Equity: valor (cobra premium, gera lealdade?)",
        C: "Ambos são iguais",
        D: "Sem diferença",
      },
      correta: "B",
      explicacao:
        "Awareness Petrobras: 95% do público reconhece logo. Equity Petrobras: cobra +3% vs. Ipiranga, clientes leais (70% repeat).",
    },
    {
      id: "mkt-m7-q3",
      pergunta: "O que é 'Brand Extension'?",
      opcoes: {
        A: "Sem significado",
        B: "Usar equity de marca existente para entrar em nova categoria (ex: Petrobras combustível → GLP → renováveis)",
        C: "Apenas novo logo",
        D: "Sem expansão",
      },
      correta: "B",
      explicacao:
        "Extension bem-sucedida: Petrobras (confiança combustível) estende para GLP (confiança energia doméstica) + Lubrax (confiança performance). Funciona quando categoria relacionada.",
    },
    {
      id: "mkt-m7-q4",
      pergunta: "Qual é o risco de 'Brand Dilution'?",
      opcoes: {
        A: "Sem risco",
        B: "Extension em categoria não-relacionada enfraquece equity (ex: Petrobras Alimentos)",
        C: "Beneficia marca",
        D: "Sem consequência",
      },
      correta: "B",
      explicacao:
        "Dilution: Petrobras tentasse vender alimentos = confunde cliente, enfraquece associação (energia), perde foco. Disciplina mantém equity.",
    },
    {
      id: "mkt-m7-q5",
      pergunta: "O que é 'Brand Identity'?",
      opcoes: {
        A: "Sem significado",
        B: "Elementos visuais/verbais (logo, cores, slogan, tone-of-voice)",
        C: "Apenas logo",
        D: "Sem identidade",
      },
      correta: "B",
      explicacao:
        "Brand Identity Petrobras: logo amarelo/vermelho, slogan 'Energia para Crescer', tone corporativo-acessível, brand guideline rigorosa.",
    },
    {
      id: "mkt-m7-q6",
      pergunta: "Por que Petrobras reformulou logo em 2021?",
      opcoes: {
        A: "Sem razão específica",
        B: "Modernização: reposicionar como 'empresa de energia contemporânea' vs. 'estatal tradicional'",
        C: "Apenas mudança cosmética",
        D: "Sem impacto",
      },
      correta: "B",
      explicacao:
        "Rebranding 2021: novo logo mais moderno, reduz 'estatal pesada', comunica dinamismo, alinha com transição energética, atrai novos talentos/investidores.",
    },
    {
      id: "mkt-m7-q7",
      pergunta: "Como medir 'Brand Awareness'?",
      opcoes: {
        A: "Sem medição",
        B: "Pesquisa: 'Qual marca lembra?' (recall), 'Reconhece logo?' (recognition), top-of-mind",
        C: "Apenas intuição",
        D: "Sem método",
      },
      correta: "B",
      explicacao:
        "Medição Awareness Petrobras: recall (lembra sem dica), recognition (com dica), top-of-mind (primeira marca pensada). Petrobras 95% awareness.",
    },
    {
      id: "mkt-m7-q8",
      pergunta: "Qual é a relação entre 'Posicionamento' e 'Alocação de Orçamento'?",
      opcoes: {
        A: "Sem relação",
        B: "Posicionamento premium requer investimento em publicidade/brand (não apenas volume)",
        C: "Sem dependência",
        D: "Não afeta orçamento",
      },
      correta: "B",
      explicacao:
        "Posicionamento premium (Lubrax) requer 60% budget em publicidade/RP para manter percepção qualidade. Posicionamento volume (combustível) requer distribuição (postos).",
    },
    {
      id: "mkt-m7-q9",
      pergunta: "O que significa 'Top-of-Mind' para brand?",
      opcoes: {
        A: "Sem significado",
        B: "Primeira marca que cliente pensa (sem dica) quando pensa na categoria",
        C: "Apenas alto preço",
        D: "Sem relação",
      },
      correta: "B",
      explicacao:
        "Top-of-mind Petrobras em combustível: cliente pensa 'combustível' → pensa 'Petrobras' (antes Shell/Ipiranga). Objetivo chegar a 60%+ top-of-mind.",
    },
    {
      id: "mkt-m7-q10",
      pergunta: "Qual é a importância de consistência em Brand Identity?",
      opcoes: {
        A: "Sem importância",
        B: "Repetição de logo/cores/slogan constrói reconhecimento automático (neural habit)",
        C: "Apenas cosmética",
        D: "Sem impacto",
      },
      correta: "B",
      explicacao:
        "Consistência: cliente vê amarelo/vermelho repetidamente = associação automática Petrobras. Falta de consistência = confusão, perda equity.",
    },
  ],
  "modulo-8": [
    {
      id: "mkt-m8-q1",
      pergunta: "Qual é a diferença entre pesquisa 'Quantitativa' e 'Qualitativa'?",
      opcoes: {
        A: "Não há diferença",
        B: "Quantitativa: números (survey n=1000+); Qualitativa: exploração (focus n=8-12)",
        C: "Ambas são iguais",
        D: "Sem diferença relevante",
      },
      correta: "B",
      explicacao:
        "Quantitativa: generalizável, estatístico (67% clientes satisfeitos). Qualitativa: profundo, exploratório ('Por quê satisfeito?' = discussão 2h).",
    },
    {
      id: "mkt-m8-q2",
      pergunta: "O que é 'CSAT' em pesquisa de satisfação?",
      opcoes: {
        A: "Sem significado",
        B: "Customer Satisfaction: escala 1-10 de satisfação (ex: Petrobras combustível CSAT 8.2)",
        C: "Apenas número",
        D: "Sem métrica",
      },
      correta: "B",
      explicacao:
        "CSAT Petrobras combustível: pergunta 'Qual sua satisfação combustível?' escala 1-10. CSAT 8.2 = boa, alvo é 8.5+.",
    },
    {
      id: "mkt-m8-q3",
      pergunta: "O que é 'NPS' (Net Promoter Score)?",
      opcoes: {
        A: "Sem significado",
        B: "Pergunta 'Recomendaria para amigo?' escala 0-10. NPS = promotores (9-10) - detratores (0-6). Range -100 a +100",
        C: "Apenas número",
        D: "Sem uso",
      },
      correta: "B",
      explicacao:
        "NPS Petrobras: 45 (bom = promotores 55% - detratores 10%). NPS > 50 = excelente, 0-30 = aceitável, < 0 = crítico.",
    },
    {
      id: "mkt-m8-q4",
      pergunta: "Qual é o objetivo de 'Focus Group'?",
      opcoes: {
        A: "Sem objetivo claro",
        B: "Discussão com 8-12 pessoas (exploração profunda, 'por quê', ideação)",
        C: "Apenas conversação",
        D: "Sem estrutura",
      },
      correta: "B",
      explicacao:
        "Focus group Petrobras 'Barreiras Combustível Premium': 10 motoristas, 2h discussão. 'Por que não usa premium?' = insights (percebem diferença? preço?)",
    },
    {
      id: "mkt-m8-q5",
      pergunta: "O que é 'Briefing' em pesquisa de mercado?",
      opcoes: {
        A: "Sem significado",
        B: "Documento pré-pesquisa: objetivo, método, amostra, timeline, orçamento, usos",
        C: "Apenas encontro",
        D: "Sem necessidade",
      },
      correta: "B",
      explicacao:
        "Briefing Petrobras: 'Entender barreiras combustível premium' (objetivo), survey 1500 + focus 10 (método), classe B/C (amostra), 4 semanas (timeline).",
    },
    {
      id: "mkt-m8-q6",
      pergunta: "Qual é o risco de 'Viés de Seleção' em pesquisa?",
      opcoes: {
        A: "Sem risco",
        B: "Amostra não-aleatória (apenas clientes satisfeitos) invalida resultado, não representa população",
        C: "Sem consequência",
        D: "Beneficia pesquisa",
      },
      correta: "B",
      explicacao:
        "Viés seleção: Petrobras coleta feedback apenas em postos (clientes satisfeitos vão). Faltam insatisfeitos (que foram para Shell). Resultado enviesado.",
    },
    {
      id: "mkt-m8-q7",
      pergunta: "O que é 'Viés de Pergunta' em pesquisa?",
      opcoes: {
        A: "Sem risco",
        B: "Pergunta tendenciosa ('Você não acha Shell caro?' = leva resposta afirmativa)",
        C: "Apenas terminologia",
        D: "Sem impacto",
      },
      correta: "B",
      explicacao:
        "Pergunta com viés: tendencia resposta desejada. Correta: 'Compare preço Petrobras vs. concorrentes' (neutro, deixa responder livremente).",
    },
    {
      id: "mkt-m8-q8",
      pergunta: "Qual é a importância de 'Amostra Aleatória'?",
      opcoes: {
        A: "Sem importância",
        B: "Garante representatividade: cada elemento população tem chance igual de ser selecionado",
        C: "Apenas formalidade",
        D: "Sem necessidade",
      },
      correta: "B",
      explicacao:
        "Amostra aleatória Petrobras: 1500 motoristas selecionados aleatoriamente (não apenas SP), garante resultado generalizável para Brasil.",
    },
    {
      id: "mkt-m8-q9",
      pergunta: "Como Petrobras combina pesquisa Quantitativa + Qualitativa?",
      opcoes: {
        A: "Apenas uma",
        B: "Quant revela 'o quê' (2000 motoristas insatisfeitos); Qual revela 'por quê' (10 focus groups exploram raízes)",
        C: "Sem integração",
        D: "Ambas isoladas",
      },
      correta: "B",
      explicacao:
        "Combinação: survey CSAT descobre 'Insatisfação com fila em postos 27%'. Focus grupos exploram 'Como melhorar experiência fila?'",
    },
    {
      id: "mkt-m8-q10",
      pergunta: "Qual é a principal lição sobre pesquisa de mercado?",
      opcoes: {
        A: "Sem lição específica",
        B: "Pesquisa rigorosa (amostra aleatória, perguntas neutras, análise independente) converte dados em insight acionável",
        C: "Apenas gasto sem valor",
        D: "Sem importância",
      },
      correta: "B",
      explicacao:
        "Pesquisa de valor: método rigoroso (evita viés) → dados confiáveis → decisão segura → implementação eficaz. Petrobras investe em pesquisadora independente.",
    },
  ],
  "modulo-9": [
    {
      id: "mkt-m9-q1",
      pergunta: "Qual é o principal desafio de marketing de combustível na Petrobras?",
      opcoes: {
        A: "Sem desafio",
        B: "Commodity: difícil diferenciar produto puro, requer diferenciação via marca/serviço",
        C: "Apenas preço",
        D: "Sem competição",
      },
      correta: "B",
      explicacao:
        "Desafio commodity: gasolina Shell = gasolina Petrobras (quimicamente). Diferenciação: marca Petrobras (confiança histórica) + postos modernos + app Estação.",
    },
    {
      id: "mkt-m9-q2",
      pergunta: "Como a transição energética afeta marketing Petrobras?",
      opcoes: {
        A: "Sem efeito",
        B: "Reposicionamento: 'empresa de energia integrada' (óleo + renováveis), atrai eco-conscious e investidores ESG",
        C: "Apenas marketing tradicional",
        D: "Sem mudança",
      },
      correta: "B",
      explicacao:
        "Transição marketing: Petrobras passa de 'empresa de óleo' para 'empresa de energia diversificada' (biocombustíveis, solar, eólica, hidrogênio).",
    },
    {
      id: "mkt-m9-q3",
      pergunta: "Qual é a estratégia de marketing para GLP Petrobras?",
      opcoes: {
        A: "Mesma de combustível",
        B: "Segmento diferente: penetração (preço acessível classe C/D), distribuição seletiva, comunicação rádio regional",
        C: "Sem estratégia específica",
        D: "Apenas Volume",
      },
      correta: "B",
      explicacao:
        "GLP estratégia: preço baixo (acessibilidade), distribuidoras regionais (relacionamento), publicidade local (rádio = classe C ouve rádio).",
    },
    {
      id: "mkt-m9-q4",
      pergunta: "Como Lubrax (lubrificantes Petrobras) diferencia marketing vs. combustível?",
      opcoes: {
        A: "Mesmo marketing",
        B: "Lubrax premium: B2B (engenheiros), venda pessoal consultiva, RP técnica, preço +20% (qualidade justifica)",
        C: "Sem diferenciação",
        D: "Apenas preço",
      },
      correta: "B",
      explicacao:
        "Lubrax B2B: decisão complexa (especialista), requer educação (venda pessoal explica viscosidade, performance), não responde a publicidade massa.",
    },
    {
      id: "mkt-m9-q5",
      pergunta: "Qual é o objetivo de marketing para renováveis Petrobras?",
      opcoes: {
        A: "Sem objetivo claro",
        B: "Crescimento novo mercado, diferenciação (vs. Shell/Ipiranga), atração ESG investidores",
        C: "Apenas volume",
        D: "Sem relevância",
      },
      correta: "B",
      explicacao:
        "Renováveis: novo mercado em crescimento, permite Petrobras diferenciarse como inovadora (não só commodity), atrai capital ESG, novo público.",
    },
    {
      id: "mkt-m9-q6",
      pergunta: "O que significa 'Greenwashing' em contexto Petrobras?",
      opcoes: {
        A: "Sem significado",
        B: "Comunicar 'sustentabilidade' enquanto ações contraditórias (ex: publicidade 'energia limpa' + investimento óleo massivo) = perda credibilidade",
        C: "Apenas limpeza ambiental",
        D: "Sem risco",
      },
      correta: "B",
      explicacao:
        "Greenwashing risco: se Petrobras disser 'energia limpa' mas investir 85% em óleo, ativistas acusam (midstream reputação). Solução: honestidade 'transição gradual'.",
    },
    {
      id: "mkt-m9-q7",
      pergunta: "Como Petrobras comunica transição energética sem parecer hipócrita?",
      opcoes: {
        A: "Sem solução",
        B: "Honestidade: óleo + renováveis convivem (transição é gradual), metas claras 2050 (carbono neutro), ações reais (investimento renováveis)",
        C: "Esconda óleo",
        D: "Sem comunicação",
      },
      correta: "B",
      explicacao:
        "Comunicação credível Petrobras: '2050 carbono neutro' (meta clara), 'Pré-sal tecnologia limpa' (ação), 'Biocombustível Brasil' (diferencial), não perfeccionista.",
    },
    {
      id: "mkt-m9-q8",
      pergunta: "Qual é a vantagem competitiva de Petrobras vs. Shell em renováveis?",
      opcoes: {
        A: "Sem vantagem",
        B: "Biocombustível (etanol, biodiesel) = expertise Brasil (cana), solar + eólica diversificação, hidrogênio futuro",
        C: "Apenas óleo",
        D: "Sem diferencial",
      },
      correta: "B",
      explicacao:
        "Vantagem Petrobras: acesso cana-de-açúcar (biocombustível), expertise renewables (parcerias), portfólio integrado (óleo + renováveis). Shell sai do renováveis.",
    },
    {
      id: "mkt-m9-q9",
      pergunta: "Como Petrobras atrai 'eco-conscious' como novo segmento?",
      opcoes: {
        A: "Sem foco",
        B: "Publicidade sustentabilidade, RP inovação renováveis, B2B energia verde, posicionamento 'empresa de energia moderna'",
        C: "Sem estratégia",
        D: "Apenas tradição",
      },
      correta: "B",
      explicacao:
        "Eco-conscious atração: 'Energia vem da natureza' (publicidade), press release investimento renováveis (RP), programa solar B2B (B2B), reposicionamento marca.",
    },
    {
      id: "mkt-m9-q10",
      pergunta: "Qual é a principal lição de marketing na Petrobras?",
      opcoes: {
        A: "Sem lição",
        B: "Marketing segmentado (combustível ≠ lubrificantes ≠ renováveis) + reposicionamento credível (transição) = adaptação futuro",
        C: "Uma estratégia serve tudo",
        D: "Sem importância",
      },
      correta: "B",
      explicacao:
        "Petrobras lição: não existe marketing único. Cada segmento (combustível volume, Lubrax premium, renováveis crescimento) requer estratégia diferenciada.",
    },
  ],
  "modulo-10": [
    {
      id: "mkt-m10-q1",
      pergunta: "Um novo combustível premium (synfuel) será lançado. Qual é o STP apropriado?",
      opcoes: {
        A: "Segmento: todos",
        B: "Segmento: motoristas classe A (performance), Target: proprietários esportivos, Posicionamento: 'Performance + Sustentabilidade'",
        C: "Sem segmentação",
        D: "Apenas preço",
      },
      correta: "B",
      explicacao:
        "STP Synfuel: nicho premium (classe A), aspiracional (esportivos), diferencial (octanagem + biodegradável). Não é para mercado de massa.",
    },
    {
      id: "mkt-m10-q2",
      pergunta: "Qual preço é apropriado para synfuel premium?",
      opcoes: {
        A: "Igual combustível comum",
        B: "Premium: +25% vs. Diesel S-500 (R$ 7.50 vs. R$ 6.00), justificado por performance + sustentabilidade",
        C: "Mais barato",
        D: "Sem estratégia",
      },
      correta: "B",
      explicacao:
        "Preço synfuel: demanda inelástica (performance-seekers não negociam qualidade), preço premium sustenta margem inovação, não concorre em volume.",
    },
    {
      id: "mkt-m10-q3",
      pergunta: "Qual é a distribuição apropriada para synfuel?",
      opcoes: {
        A: "Intensiva (todos postos)",
        B: "Seletiva (200 postos premium em locais alta renda, tráfego motor-sport)",
        C: "Exclusiva",
        D: "Sem distribuição",
      },
      correta: "B",
      explicacao:
        "Distribuição seletiva synfuel: postos em SP (Ibirapuera, Vila Madalena), RJ (Zona Sul), Brasília (Asa Sul), custo investimento limitado, mantém exclusividade.",
    },
    {
      id: "mkt-m10-q4",
      pergunta: "Como comunicar (IMC) synfuel premium?",
      opcoes: {
        A: "Apenas publicidade",
        B: "Integrada: YouTube/Instagram (motor content), RP 'inovação combustível', promoção 'trial 10L grátis', vendedor em 200 postos demo",
        C: "Sem comunicação",
        D: "Apenas vendas",
      },
      correta: "B",
      explicacao:
        "IMC synfuel: digital (visual performance), RP (credibilidade inovação), promoção (trial = experiência), venda pessoal (explicação técnica).",
    },
    {
      id: "mkt-m10-q5",
      pergunta: "Qual pesquisa validaria lançamento synfuel?",
      opcoes: {
        A: "Sem pesquisa",
        B: "Quant: 500 motoristas premium (aceitação preço, disposição trial); Qual: focus 3 grupos (early adopters, técnicos, eco-conscious)",
        C: "Apenas opinião",
        D: "Sem validação",
      },
      correta: "B",
      explicacao:
        "Pesquisa synfuel: descobre 'aceitaria +25% preço?' (quant), 'qual benefício mais relevante?' (qual). Input para refinamento mensagem.",
    },
    {
      id: "mkt-m10-q6",
      pergunta: "Qual seria a métrica de sucesso para synfuel no primeiro ano?",
      opcoes: {
        A: "Sem métrica",
        B: "Trial rate 15% base premium (alto), repeat rate 40% (produto bom), market share 3% segmento premium",
        C: "Apenas volume absoluto",
        D: "Sem medição",
      },
      correta: "B",
      explicacao:
        "KPIs synfuel: trial (experimentam) > 15%, repeat (compram novamente) > 40%, market share > 3%. Indica sucesso nicho premium.",
    },
    {
      id: "mkt-m10-q7",
      pergunta: "Qual é o erro mais comum em marketing Petrobras em prova?",
      opcoes: {
        A: "Ser muito detalhista",
        B: "Ignorar contexto Petrobras (commodity, transição, marca). Resposta genérica de marketing não funciona.",
        C: "Falta de números",
        D: "Sem erro específico",
      },
      correta: "B",
      explicacao:
        "Pegadilha: resposta 'marketing genérico' ignora que Petrobras enfrenta desafios únicos (commodity combustível, transição energética, reputação estatal).",
    },
    {
      id: "mkt-m10-q8",
      pergunta: "Como integrar renováveis em comunicação de marca Petrobras?",
      opcoes: {
        A: "Completamente separado",
        B: "Guarda-chuva estratégico único: 'Energia para Crescer' cobre combustível + GLP + lubrificantes + renováveis",
        C: "Sem integração",
        D: "Confundo mensagens",
      },
      correta: "B",
      explicacao:
        "Integração marca: não diz 'renováveis são novo' (confunde). Diz 'Petrobras = energia integrada' (óleo + renováveis, posicionamento coerente).",
    },
    {
      id: "mkt-m10-q9",
      pergunta: "Qual é o papel de pesquisa em decisão de marketing na Petrobras?",
      opcoes: {
        A: "Nenhum papel",
        B: "Valida hipótese antes de lançar: descobrir aceitação (preço/mensagem), refinar estratégia, reduzir risco",
        C: "Apenas gasto",
        D: "Sem importância",
      },
      correta: "B",
      explicacao:
        "Pesquisa Petrobras: validação prévia (não lança no escuro). Synfuel pesquisa descobre 'trial rate vai ser 15%?' antes de investimento R$20M.",
    },
    {
      id: "mkt-m10-q10",
      pergunta: "Qual é a síntese final de marketing gerencial para Petrobras?",
      opcoes: {
        A: "Sem síntese",
        B: "STP estratégico + 4 Ps diferenciado + IMC integrada + Digital omnichannel + Brand credível + Pesquisa = adaptação futuro",
        C: "Apenas vendas",
        D: "Sem conclusão",
      },
      correta: "B",
      explicacao:
        "Síntese final: marketing não é genérico. Petrobras integra estratégia (STP), execução (4Ps), comunicação (IMC), medição (pesquisa), reposicionamento (renováveis).",
    },
  ],
};
