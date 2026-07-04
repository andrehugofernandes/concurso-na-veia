"use client";

/**
 * AulaMarketingGerencial - PREMIUM UPGRADE
 *
 * Marketing estratégico, posicionamento e comunicação integrada
 * 10 módulos premium com foco em casos Petrobras
 *
 * Status: PREMIUM - 100% content + 60 questões
 */

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AulaProps, ModuleBanner, ModuleSectionHeader, ContentAccordion, CardCarousel, ModuleConsolidation, QuizInterativo } from "../shared";
import { getModuleVariant } from "@/lib/moduleColors";
import { MARKETING_QUIZZES } from "./data/marketing-quizzes";
import { Target, Users, DollarSign, ShoppingCart, Megaphone, TrendingUp, Lightbulb, Compass, BarChart3, Trophy } from "lucide-react";

const MODULE_DEFS = [
  {
    id: "modulo-1",
    label: "Módulo 1",
    title: "Fundamentos de Marketing e 4 Ps",
    icon: Target,
  },
  {
    id: "modulo-2",
    label: "Módulo 2",
    title: "Segmentação, Targeting e Posicionamento",
    icon: Users,
  },
  {
    id: "modulo-3",
    label: "Módulo 3",
    title: "Estratégia de Preço e Elasticidade",
    icon: DollarSign,
  },
  {
    id: "modulo-4",
    label: "Módulo 4",
    title: "Canais de Distribuição",
    icon: ShoppingCart,
  },
  {
    id: "modulo-5",
    label: "Módulo 5",
    title: "Mix de Comunicação Integrada",
    icon: Megaphone,
  },
  {
    id: "modulo-6",
    label: "Módulo 6",
    title: "Marketing Digital e Omnichannel",
    icon: TrendingUp,
  },
  {
    id: "modulo-7",
    label: "Módulo 7",
    title: "Gestão de Marca e Brand Equity",
    icon: Lightbulb,
  },
  {
    id: "modulo-8",
    label: "Módulo 8",
    title: "Pesquisa de Mercado",
    icon: BarChart3,
  },
  {
    id: "modulo-9",
    label: "Módulo 9",
    title: "Marketing Petrobras: Contexto e Transição",
    icon: Compass,
  },
  {
    id: "modulo-10",
    label: "Módulo 10",
    title: "Simulado Geral - Marketing Integrado",
    icon: Trophy,
  },
] as const;

const MODULE_CONTENTS = {
  "modulo-1": {
    slides: [
      {
        label: "Conceito",
        content: `**Marketing Mix (4 Ps)** é framework clássico:

- **Produto**: Características, qualidade, variedade, embalagem, marca
- **Preço**: Estratégia de pricing, elasticidade, posicionamento
- **Praça**: Canais de distribuição, logística, localização
- **Promoção**: Publicidade, vendas, relações públicas, comunicação

**Contexto Petrobras**:
- Produto: combustíveis, GLP, lubrificantes, renováveis
- Preço: competitivo, com prêmio em produtos diferenciados
- Praça: rede de postos ubíquos, distribuidoras regionais, e-commerce
- Promoção: programa Estação, publicidade 'Energia para Crescer'`
      },
      {
        label: "Exemplo",
        content: `**Combustível Petrobras - Aplicação 4 Ps**:

- **Produto**: Gasolina/Diesel puro (ISO 6728) com aditivos detergentes
- **Preço**: R$ 5,50/litro (competitivo vs. Shell R$ 5,65, Ipiranga R$ 5,40)
- **Praça**: 8.000+ postos próprios/franchisados, distribuição 24/7
- **Promoção**: App Estação (acumula pontos), TV 'Energia vem da natureza', programa de fidelização

**Resultado**: Market share 35% combustíveis (líder), CSAT 8.2/10`
      },
      {
        label: "Dica",
        content: `🎯 **Complemento ao 4 Ps: 3 Ps Expandidos** (Serviços):
- **Pessoas**: Treinamento de frentistas (cortesia, conhecimento)
- **Processo**: Experiência de abastecimento (rápido, limpo, seguro)
- **Physical Evidence**: Postos modernos (2023+), limpeza, ATM, lojas

Na Petrobras: investimento em postos de 4ª geração diferencia da concorrência.`
      },
      {
        label: "Exceção",
        content: `**⚠️ Produtos Commodity**:
- Combustível puro é commodity (gasolina = gasolina, dificuldade de diferenciar por produto)
- Solução: Diferenciar via marca (confiança), serviço (postos), programa (Estação)
- Risco: Guerra de preço (todos cobram menos) destrói margem

Petrobras evita compete principalmente em preço, mantendo equilíbrio valor-preço.`
      },
    ],
    consolidation: {
      video: "Marketing Mix: 4 Ps Aplicados",
      audio: "Framework 4 Ps como base de estratégia de marketing",
      summary: "4 Ps (Produto, Preço, Praça, Promoção) formam base de marketing. Petrobras integra além com 3 Ps de serviço.",
      mnemonic: "4Ps: Produto, Preço, Praça, Promoção; +3Ps: Pessoas, Processo, Physical"
    }
  },
  "modulo-2": {
    slides: [
      {
        label: "Conceito",
        content: `**STP Framework** define estratégia de mercado:

**Segmentação**: Dividir mercado em grupos homogêneos
- Demográfica: Idade, gênero, renda, educação, classe social
- Psicográfica: Valores, lifestyle, personalidade, aspirações
- Comportamental: Frequência de compra, lealdade, volume de consumo
- Geográfica: Região, urbanização, clima

**Targeting**: Escolher segmento(s) alvo
- Atratividade: Tamanho de mercado, margem, crescimento
- Capacidade: Consigo servir bem?

**Posicionamento**: Diferencial na mente do consumidor
- Como somos percebidos vs. concorrentes?
- Valor percebido, atributos-chave`
      },
      {
        label: "Exemplo",
        content: `**Segmentação Petrobras**:

**Combustível**:
- Demográfico: Motoristas 25-65, renda média-alta (classe B/C)
- Psicográfico: Praticidade, qualidade, marca (não apenas preço)
- Comportamental: Abastecimento 1-2x/semana, lealdade média

**Lubrificantes (Lubrax)**:
- Demográfico: Engenheiros, mecânicos, operadores (B2B), renda alta
- Psicográfico: Performance, confiabilidade, expertise técnica
- Comportamental: Compra planejada, lealdade alta (qualidade crítica)

**GLP**:
- Demográfico: Famílias classe C/D, renda baixa-média
- Psicográfico: Acessibilidade, confiança, economicidade
- Comportamental: Compra mensal, sensível a preço`
      },
      {
        label: "Dica",
        content: `✅ **Validação de Segmento** (MALD):
- **M**ensurável: Tamanho quantificável? (ex: 50M motoristas Brasil)
- **A**cessível: Consigo atingir? (ex: postos ubíquos = sim)
- **L**ucrativo: Margem adequada? (ex: combustível 5-7%, lubrificantes 20-30%)
- **D**efensável: Consigo competir? (ex: marca Petrobras forte = sim)

Petrobras valida segmentos antes de investir.`
      },
      {
        label: "Exceção",
        content: `**⚠️ Micro-Segmentação Excessiva**:
- Exemplo: 'Motoristas acima de 60 anos em São Paulo que trocam carro a cada 5 anos e preferem Diesel'
- Problema: Tamanho mercado muito pequeno, custo de atender desproporcional
- Solução: Focar 3-5 segmentos principais com tamanho crítico

Petrobras: combustível, GLP, lubrificantes, renováveis = 4 segmentos principais.`
      },
    ],
    consolidation: {
      video: "STP: Segmentação, Targeting e Posicionamento",
      audio: "Como dividir mercado, escolher alvo e diferenciarse",
      summary: "STP divide mercado (segmentação), escolhe alvo (targeting) e diferencia (posicionamento) - decisão crítica antes de tática.",
      mnemonic: "STP: Segmentar, Targeting, Posicionar; MALD: Mensurável, Acessível, Lucrativo, Defensável"
    }
  },
  "modulo-3": {
    slides: [
      {
        label: "Conceito",
        content: `**Estratégias de Preço** definem posicionamento:

**Penetração**: Preço baixo inicial para ganhar volume rápido
- Objetivo: Crescimento de market share
- Exemplo: GLP Petrobras (acessibilidade classe C/D)

**Skimming/Desnatação**: Preço alto inicial, reduz ao longo do tempo
- Objetivo: Maximizar valor de early adopters, depois volume
- Exemplo: Combustível premium, Lubrax premium

**Valor**: Preço baseado em valor percebido, não custo
- Objetivo: Diferencial de qualidade justifica premium
- Exemplo: Combustível Diesel S-500, lubrificantes especializados

**Competitiva**: Preço alinhado ao mercado, compete em não-preço
- Objetivo: Competir por diferencial (marca, serviço)
- Exemplo: Combustível comum (commodity + marca + serviço)`
      },
      {
        label: "Exemplo",
        content: `**Estratégias Petrobras por Produto**:

**GLP**: Penetração
- Preço R$ 38/botijão (competitivo/baixo vs. rival R$ 40)
- Objetivo: Crescimento volume, acessibilidade
- Margem: aceitável via volume

**Combustível**: Competitiva + Valor
- Gasolina comum: R$ 5,50 (alinhado Shell/Ipiranga)
- Diesel S-500: R$ 5,80 (+2% premium, qualidade justifica)
- Diferenciação: marca + postos + Estação programa

**Lubrax Premium**: Skimming
- Preço R$ 45/litro (+20% vs. genéricos R$ 37)
- Justificativa: Performance, durabilidade, assistência técnica
- Target: Engenheiros, operadores que não negociam qualidade`
      },
      {
        label: "Dica",
        content: `📊 **Elasticidade de Demanda** define sensibilidade a preço:

**Elástica** (Demanda sensível a preço):
- Combustível comum: +10% preço = -15% volume (concorrência)
- Estratégia: Compete em preço/marca/serviço, não isolado

**Inelástica** (Demanda pouco sensível a preço):
- Lubrificantes B2B: +10% preço = -2% volume (qualidade crítica)
- Estratégia: Cobra premium por diferencial, justifica valor

Questão clássica: "Por que Lubrax custa mais?" → Inelasticidade (cliente paga por qualidade).`
      },
      {
        label: "Exceção",
        content: `**⚠️ Guerra de Preço (Armadilha)**:
- Todos reduzem preço para ganhar volume
- Problema: Margem cai para todos, sustentabilidade desaparece
- Resultado histórico: Preço volta para cima (coordenação implícita) ou vencedor leva tudo

Petrobras evita guerra de preço, diferencia via marca + serviço. Shell também cobra premium, coexistem.`
      },
    ],
    consolidation: {
      video: "Estratégias de Preço: Do Operacional ao Estratégico",
      audio: "Como definir preço alinhado a posicionamento e elasticidade",
      summary: "Penetração, Skimming, Valor e Competitiva são estratégias. Elasticidade define sensibilidade. Petrobras combina conforme segmento.",
      mnemonic: "Estratégias: Penetração (volume), Skimming (premium), Valor (diferencial), Competitiva (mercado)"
    }
  },
  "modulo-4": {
    slides: [
      {
        label: "Conceito",
        content: `**Canais de Distribuição** conectam fabricante ao consumidor:

**Direto**: Fabricante → Consumidor (sem intermediário)
- Vantagem: Margem total, controle total
- Desvantagem: Custo alto, cobertura limitada
- Exemplo: Petrobras postos próprios, e-commerce Lubrax

**Indireto**: Fabricante → Distribuidor/Varejo → Consumidor
- Intensiva: Muitos intermediários (cobertura máxima)
  - Exemplo: Combustível em cada bairro (postos franchisados)
- Seletiva: Alguns intermediários (controle)
  - Exemplo: Lubrificantes em oficinas especializadas
- Exclusiva: Um intermediário (relacionamento)
  - Exemplo: Distribuidor regional único GLP`
      },
      {
        label: "Exemplo",
        content: `**Canais Petrobras Multi-Estratégia**:

**Combustível**: Intensiva + Direto
- Postos próprios Petrobras (direto, margem alta)
- Postos franchisados (semi-direto, controle brand)
- Objetivo: Cobertura ubíqua + brand control

**GLP**: Seletiva
- Distribuidoras regionais (relacionamento)
- Revendedoras autorizadas (treinamento)
- Objetivo: Margem balanceada + suporte técnico

**Lubrificantes**: Seletiva + Exclusiva B2B
- Vendedores diretos em indústrias/offshore (consultivo)
- Distribuidoras especializadas (cobertura)
- E-commerce direto para oficinas (conveniência)

**Renováveis**: Direto
- B2B contrato direto (negociação)
- E-commerce solar (DTC emerging)`
      },
      {
        label: "Dica",
        content: `⚖️ **Trade-off Canal**:
- **Direto**: 100% margem, mas custo investimento + cobertura limitada
- **Indireto intensiva**: Margem 30-40%, mas cobertura máxima + baixo custo
- **Indireto seletiva**: Margem 50%, cobertura média + controle

Petrobras escolhe por produto: direto combustível (core, volume) + indireto GLP (alcance classe C).`
      },
      {
        label: "Exceção",
        content: `**⚠️ Conflito de Canal**:
- Vendedor direto entra em concorrência com distribuidor
- Problema: Distribuidor sente-se 'traído', muda para concorrente
- Solução: (1) Territórios claros (2) Comunicação transparente (3) Margens justas (4) Suporte bem definido

Petrobras evita: Define regiões para distribuidoras, vendedores diretos apenas em B2B/offshore.`
      },
    ],
    consolidation: {
      video: "Canais de Distribuição: Escolha e Conflito",
      audio: "Como integrar direto e indireto sem conflito de canal",
      summary: "Direto (margem/controle), intensiva (cobertura), seletiva (balanço), exclusiva (relacionamento). Petrobras combina por segmento.",
      mnemonic: "Canais: Direto (margem), Intensiva (cobertura), Seletiva (balanço), Exclusiva (relacionamento)"
    }
  },
  "modulo-5": {
    slides: [
      {
        label: "Conceito",
        content: `**Mix de Comunicação Integrada (IMC)** coordena todas as mensagens:

**Publicidade**: Mensagem paga em mídia massa
- TV, rádio, print, digital, out-of-home
- Objetivo: Awareness, recall

**Relações Públicas**: Earned media (não pago)
- Press releases, notícias, eventos
- Objetivo: Credibilidade, confiança

**Promoção de Vendas**: Incentivos curto prazo
- Cupons, descontos, sorteios, brindes
- Objetivo: Trial, compra imediata

**Venda Pessoal**: Contato direto vendedor-cliente
- Negociação, consultoria, relacionamento
- Objetivo: Conversão, lealdade

**IMC**: Integração coerente de todos os elementos em mensagem unificada`
      },
      {
        label: "Exemplo",
        content: `**Campanha Integrada Petrobras "Energia para Crescer"**:

**Publicidade**: Comercial TV 60s (mãe, filho, crescimento)
- Mensagem: Petrobras energia sustentável que impulsiona sonhos

**Relações Públicas**: Comunicado imprensa
- 'Petrobras investe R$100B em renováveis até 2030'
- Diálogo com jornalistas, podcast energia

**Promoção de Vendas**: App Estação
- 'Acumule pontos em combustível, resgate em café/alimentação'
- Objetivo: App downloads, frequência de compra

**Venda Pessoal**: Consultores B2B
- Engenheiros vendem Lubrax + GLP para indústrias
- Negociação contrato, pós-venda, renovação

**IMC**: Mensagem 'energia que transforma' coerente em todos os canais`
      },
      {
        label: "Dica",
        content: `💰 **Alocação de Orçamento por Canal** reflete estratégia:

**Combustível B2C**:
- 50% Publicidade (TV, digital, rádio)
- 20% Promoção de Vendas (app Estação)
- 20% Venda Pessoal (franchisados)
- 10% RP (comunicação marca)

**Lubrificantes B2B**:
- 50% Venda Pessoal (consultores)
- 20% RP técnica (revistas, seminários)
- 20% Publicidade (trade publications)
- 10% Promoção (seminários, brindes)

Alocação não é igual: reflete onde o cliente toma decisão.`
      },
      {
        label: "Exceção",
        content: `**⚠️ Desalinhamento de Mensagem**:
- Publicidade promete 'postos premium 2023' mas postos são antigos
- Resultado: Confiança destruída, cliente sente-se enganado
- Solução: (1) Cumprir promessas (2) Modernizar postos antes de campanha (3) Treinar frentistas (4) Monitorar CSAT

Petrobras: modernizou 2000+ postos antes de campanha 'Postos 4ª Geração'.`
      },
    ],
    consolidation: {
      video: "IMC: Comunicação Integrada e Eficaz",
      audio: "Como coordenar todos os canais em mensagem coerente",
      summary: "IMC integra Publicidade, RP, Promoção, Venda Pessoal em mensagem unificada. Alocação reflete onde decisão ocorre.",
      mnemonic: "IMC: Integração (coerência), Mensagem (unificada), Coordenação (canais)"
    }
  },
  "modulo-6": {
    slides: [
      {
        label: "Conceito",
        content: `**Marketing Digital e Omnichannel** integra físico + online:

**SEO** (Search Engine Optimization): Otimização orgânica
- 'Posto Petrobras perto de mim' em Google Maps
- Objetivo: Tráfego orgânico, reduz custo de aquisição

**SEM** (Search Engine Marketing): Anúncios pagos em buscadores
- Google Ads 'Combustível Petrobras' + geolocalização
- Objetivo: Tráfego pago imediato, conversão

**Social Media**: Facebook, Instagram, LinkedIn, TikTok
- Instagram: Conteúdo sustentabilidade, stories postos
- LinkedIn: B2B Lubrificantes, vagas recrutamento
- Objetivo: Engagement, comunidade, brand awareness

**E-commerce**: Venda online direta
- Lubrax.com.br, Aditivos Petrobras
- Objetivo: Conveniência, DTC (direct-to-consumer)

**Email**: Comunicação direta, CRM
- Newsletter Estação, ofertas personalizadas
- Objetivo: Retenção, upsell, reactivation

**Analytics**: Medição de tudo
- Conversion Rate, ROI, CAC (Customer Acquisition Cost)
- Objetivo: Dados para otimização contínua`
      },
      {
        label: "Exemplo",
        content: `**Stack Digital Petrobras Completo**:

**Jornada do Cliente**:
1. **Awareness**: Vê anúncio SEM 'Lubrificante Petrobras' no Google (SEM)
2. **Consideration**: Visita site Lubrax.com.br, lê avaliações (SEO)
3. **Conversion**: Baixa app Estação, faz primeira compra (E-commerce)
4. **Engagement**: Recebe email 'Oferece 15% próxima compra' (Email)
5. **Loyalty**: Segue Instagram @Petrobras, vê conteúdo sustentabilidade (Social)

**Medição**: Rastreia cada touchpoint em CRM, retargeting em Facebook, email segmentado.

**Resultado**: CAC reduzido 30%, retention aumentada, vida do cliente +2 anos`
      },
      {
        label: "Dica",
        content: `🔄 **Omnichannel Integration** = Cliente em múltiplos canais:

- Anúncio Google (SEM) → Click → Site Petrobras (SEO)
- Visita site → Downla app Estação → Abastece em posto → Acumula pontos
- Acessa email → Oferta personalizada → Compra Lubrax online
- Compartilha no Instagram → Amigo vê → Novo cliente (referral)

Petrobras integra: dados em CRM unificado, personalizações baseadas em histórico, touchpoint coherente.`
      },
      {
        label: "Exceção",
        content: `**⚠️ LGPD: Privacidade e Consentimento**:
- Petrobras quer enviar email, SMS personalizado = precisa consentimento explícito LGPD
- Coleta: Caixa 'quero receber ofertas' no app Estação
- Violação: Multa até 2% faturamento anual (Petrobras = bilhões)
- Balanço: Máxima personalização respeitando privacidade

Petrobras implementou Privacy by Design em plataformas digitais.`
      },
    ],
    consolidation: {
      video: "Omnichannel: Digital + Físico Integrado",
      audio: "Como usar SEO, SEM, social, e-commerce em sinergia",
      summary: "Digital não é separado: SEO + SEM + Social + Email + E-commerce integrados em jornada omnichannel, medidos em analytics.",
      mnemonic: "Digital: SEO (orgânico), SEM (pago), Social, E-commerce, Email, Analytics"
    }
  },
  "modulo-7": {
    slides: [
      {
        label: "Conceito",
        content: `**Gestão de Marca** cria diferencial intangível:

**Brand Positioning**: Como marca diferencia na mente
- Petrobras histórico: 'confiança + qualidade'
- Petrobras atual: 'energia integrada + inovação sustentável'

**Brand Awareness**: Grau de reconhecimento
- Top-of-mind: Qual marca você lembra primeiro? (Petrobras líder combustível)
- Brand Recall: Sem dica, lembra a marca? (75% público)
- Brand Recognition: Com dica, identifica? (95% público)

**Brand Equity**: Valor intangível
- Pode cobrar premium? (combustível +3% vs. Ipiranga genérica)
- Gera lealdade? (cliente muda de bairro mas vai para posto Petrobras)
- Permite extensão? (combustível → GLP → lubrificantes → renováveis = sucesso)

**Brand Identity**: Elementos visuais/verbais
- Logo: Amarelo + vermelho Petrobras (marca registrada)
- Slogan: 'A energia vem da natureza' (2023+)
- Cores: Brand guideline RGB exato
- Tone-of-voice: Corporativo mas acessível`
      },
      {
        label: "Exemplo",
        content: `**Evolução Petrobras Brand**:

**Fase 1 (1953-2000)**: 'Responsável pelos combustíveis Brasil'
- Monopolista, brand reconhecida por default
- Equity: Confiança absoluta (único fornecedor)

**Fase 2 (2000-2020)**: 'Energia que transforma'
- Desinvestimento, concorrência (Shell, Ipiranga)
- Equity: Mantém liderança por história + postos
- Risco: Percebida como 'estatal lenta'

**Fase 3 (2020+)**: 'Energia para crescer' / 'Energia integrada'
- Reposicionamento como 'empresa de energia moderna'
- Comunicação: Renováveis, sustentabilidade, inovação
- Equity: Reconstrói confiança + atrai ESG investidores
- Extensão bem-sucedida: GLP (acessibilidade), Lubrax (performance), Renováveis (futuro)`
      },
      {
        label: "Dica",
        content: `💎 **Componentes de Brand Equity**:

1. **Brand Awareness**: Lembrar/reconhecer (Petrobras 95% público)
2. **Perceived Quality**: Qualidade percebida (Petrobras 8.5/10 em combustível)
3. **Brand Associations**: Associações positivas (Petrobras = confiança, energia, Brasil)
4. **Brand Loyalty**: Lealdade (repeat purchase 70% Petrobras)

Cliente: 'Por que pago mais em Petrobras?' Resposta: Confiança histórica + qualidade + marca.`
      },
      {
        label: "Exceção",
        content: `**⚠️ Brand Dilution (Riscos de Extensão)**:
- Extensão muito distante: Petrobras Alimentos? Moda? (não fez, certo)
- Dilui brand equity em nova categoria não-relacionada
- Solução: Manter foco em energia (óleo, gás, renováveis, biocombustíveis)
- Resultado: Equity mantido, confiança não confunde

Petrobras disciplinado: não tenta ser tudo, foca setor energia.`
      },
    ],
    consolidation: {
      video: "Brand Equity: Construindo Ativo Intangível",
      audio: "Como criar, medir e proteger valor de marca",
      summary: "Brand equity = capacidade de cobrar premium, gerar lealdade, permitir extensão. Petrobras reposiciona como 'energia moderna'.",
      mnemonic: "Brand Equity: Awareness (lembrar), Perceived Quality (qualidade), Associations (associações), Loyalty (lealdade)"
    }
  },
  "modulo-8": {
    slides: [
      {
        label: "Conceito",
        content: `**Pesquisa de Mercado** coleta inteligência para decisões:

**Quantitativa**: Survey com n grande
- Amostra: n=1000+ respondentes (estatisticamente significante)
- Método: Questionário estruturado, escala Likert
- Análise: Estatística descritiva/inferencial, significância
- Vantagem: Generalizável, representativo
- Desvantagem: Superficial, não explora 'por quê'
- Exemplo: CSAT combustível (satisfação 8.2/10)

**Qualitativa**: Focus groups ou entrevistas profundas
- Amostra: n=8-12 respondentes (proposital)
- Método: Discussão aberta, roteiro temático
- Análise: Codificação, temas emergentes
- Vantagem: Profundidade, 'por quê' revelado
- Desvantagem: Não generalizável, viés facilitador
- Exemplo: 'Por que trocou para Shell?' (discussão 2h)`
      },
      {
        label: "Exemplo",
        content: `**Pesquisa Petrobras Multi-Método**:

**Pesquisa Quantitativa**: 'Satisfação Combustível 2024'
- Amostra: 2.000 motoristas por categoria (comum, premium, diesel)
- Método: App survey + SMS follow-up
- Perguntas: CSAT (1-10), NPS (0-10), atributos importância
- Resultado: CSAT 8.2, NPS 45 (bom), maior queixa = fila (27%)

**Pesquisa Qualitativa**: 'Barreiras Combustível Premium'
- Amostra: 10 motoristas classe B que não usam premium
- Método: Focus group 120min, 4 themes (preço, benefício, confiança, hábito)
- Resultado: Não veem diferença de qualidade vs. comum, preço +15% desestimula trial

**Ação**: Campanhas educativas 'Benefícios Diesel S-500', desconto trial 5%`
      },
      {
        label: "Dica",
        content: `📋 **Design de Pesquisa: Briefing Crítico**

Antes de executar, definir:
1. **Objetivo**: O que quer saber? (ex: 'Por que clientes saem?')
2. **Método**: Quantitativa, qualitativa ou ambas?
3. **Amostra**: Tamanho? Segmento? (ex: n=1500, classe B/C)
4. **Instrumentos**: Survey, focus, entrevista, observação?
5. **Timeline**: Prazo coleta + análise? (ex: 4 semanas)
6. **Orçamento**: Quanto gastar? (ex: R$ 80k)
7. **Usos**: Quem toma decisão com resultado? (ex: Diretoria Marketing)

Petrobras detalhado: briefing 5 páginas antes de contratar pesquisadora.`
      },
      {
        label: "Exceção",
        content: `**⚠️ Viés de Pesquisa (Invalida Resultado)**:

**Viés de Seleção**: Amostra não-aleatória
- Apenas clientes satisfeitos respondendo (faltam insatisfeitos)
- Solução: Amostra aleatória, inclui não-respondentes

**Viés de Pergunta**: Pergunta tendenciosa
- 'Você não acha Shell caro?' = leva resposta afirmativa
- Solução: Perguntas neutras, resposta aberta antes de escala

**Viés de Respondente**: Social desirability
- 'Você se importa com sustentabilidade?' = responde 'sim' por pressão social
- Solução: Perguntas indiretas, comportamento vs. atitude

Petrobras usa pesquisadora independente para rigor.`
      },
    ],
    consolidation: {
      video: "Pesquisa de Mercado: Do Briefing à Ação",
      audio: "Como desenhar pesquisa rigorosa e converter em decisão",
      summary: "Pesquisa quantitativa (survey, generalizável) + qualitativa (focus, profundo). Briefing robusto evita viés. Petrobras combina ambas.",
      mnemonic: "Pesquisa: Quant (grande amostra, números), Qual (pequena amostra, insight); BINGO: Briefing, Instrumento, n (amostra), Geração dados, Ação"
    }
  },
  "modulo-9": {
    slides: [
      {
        label: "Conceito",
        content: `**Marketing Petrobras** enfrenta contexto único:

**Desafios Específicos**:
- **Commodity**: Combustível puro é commodity (difícil diferenciar produto)
- **Pressão política**: Estatal, cortes orçamentários, privatização debate
- **Concorrência**: Shell (multinacional, brand forte), Ipiranga (genérica/volume)
- **Transição energética**: Petróleo destino? Ou energia integrada futuro?
- **Sindicalismo**: Greves afetam operação (2023 exemplo)

**Estratégia Multi-Segmento**:
- **Combustível B2C**: Volume + conveniência (motoristas)
- **GLP B2C**: Acessibilidade + confiança (famílias classe C/D)
- **Lubrificantes B2B**: Margem + expertise (indústria, offshore)
- **Renováveis B2B**: Crescimento + diferenciação (futuro sustentável)`
      },
      {
        label: "Exemplo",
        content: `**Estratégia Diferenciada por Segmento**:

**Combustível**:
- Preço: Competitivo (alguns centavos vs. concorrentes)
- Distribuição: Intensiva (8000+ postos, ubiquidade)
- Comunicação: TV (massa awareness), app Estação (loyalty)
- Diferencial: Marca + postos modernos + Estação programa
- Resultado: 35% market share (líder), CSAT 8.2

**GLP**:
- Preço: Penetração (acessível classe C/D)
- Distribuição: Seletiva (distribuidoras regionais)
- Comunicação: Rádio regional (acessível), relacionamento distribuidoras
- Diferencial: Acessibilidade, segurança (ABNT)
- Resultado: 12% market share

**Lubrax Lubrificantes**:
- Preço: Premium (20-30% vs. genéricos)
- Distribuição: Seletiva (distribuidoras, vendedores diretos)
- Comunicação: RP técnica (seminários), venda pessoal consultiva
- Diferencial: Qualidade, performance, assistência técnica
- Resultado: 8% market share, alto CSAT B2B

**Renováveis**:
- Preço: Valor (atratividade projeto, economia de energia)
- Distribuição: Direto B2B (contrato)
- Comunicação: RP inovação, publicidade massa 'Energia para Crescer'
- Diferencial: Portfólio único (solar + eólica + biocombustível), expertise Petrobras
- Resultado: Crescimento 30% a.a. (novo market)`
      },
      {
        label: "Dica",
        content: `🌍 **Transição Energética em Marketing**:

**Repositionamento**:
- Antes: 'Petrobras = Óleo & Gás' (identificação commodity)
- Agora: 'Petrobras = Empresa de Energia' (diversificação)

**Comunicação**:
- Biocombustíveis (etanol, biodiesel) = energia renovável do Brasil
- Solar + Eólica = complemento ao portfólio
- Hidrogênio = futuro pós-carbono
- Mensagem: 'Energia para Crescer' = transição progressiva

**Público-alvo novo**:
- Eco-conscious (sustentabilidade importa)
- Investidores ESG (governança + social + environment)
- Novos talentos tech (Pré-sal como modelo de inovação)

**Risco**: Comunicar 'energia limpa' enquanto investe massivamente em óleo & gás (credibilidade = crítica)`
      },
      {
        label: "Exceção",
        content: `**⚠️ Conflito Interno: Óleo vs. Renováveis**:

**Tensão**: Publicidade 'Energia limpa' vs. aumento investimento óleo/gás
- Stakeholders: Acionistas querem lucro (óleo continua 85% receita)
- Stakeholders: Ambientalistas querem transição (renováveis devem crescer)
- Comunicação errada = 'greenwashing' acusação

**Solução Petrobras**:
1. **Honestidade**: Comunicar transição é gradual (óleo + renováveis convivem)
2. **Investimento real**: Plano 2050 anuncia neutralidade carbono (crível)
3. **Metas claras**: 10% renováveis 2025, 50% 2050 (roadmap)
4. **Ações práticas**: Diveste de ativos poluentes, investe em Pré-sal limpo (tecnologia)

Mensagem: 'Energia responsável em transição' (não perfeccionista, mas comprometida).`
      },
    ],
    consolidation: {
      video: "Marketing em Transição: Petrobras Repositionada",
      audio: "Como comunicar credibilidade em contexto de mudança energética",
      summary: "Petrobras combina segmentos (combustível volume, GLP acessibilidade, Lubrax premium, renováveis crescimento). Transição em comunicação é crítica.",
      mnemonic: "Petrobras: Combustível (volume), GLP (classe C), Lubrax (premium), Renováveis (futuro); Mensagem: Energia integrada responsável"
    }
  },
  "modulo-10": {
    slides: [
      {
        label: "Conceito",
        content: `**Simulado Geral - Integração Marketing Gerencial**

Revisão dos 9 módulos anteriores:

1. **4 Ps**: Produto, Preço, Praça, Promoção (fundação tática)
2. **STP**: Segmentação, Targeting, Posicionamento (estratégia)
3. **Preço**: Penetração, Skimming, Valor, Competitiva + Elasticidade
4. **Canais**: Direto, Intensiva, Seletiva, Exclusiva + Trade-off
5. **Comunicação**: Publicidade, RP, Promoção, Venda Pessoal + IMC
6. **Digital**: SEO, SEM, Social, E-commerce, Email + Omnichannel
7. **Brand**: Positioning, Awareness, Equity, Identity
8. **Pesquisa**: Quantitativa, Qualitativa + Briefing rigoroso
9. **Petrobras**: Multi-segmento, transição energética, credibilidade

Este módulo consolida aprendizado através de questões integradas e cenários.`
      },
      {
        label: "Exemplo",
        content: `**Estudo de Caso Integrado**:

"Petrobras quer lançar novo combustível premium (synfuel) em 2025. Qual estratégia marketing integrada?"

**Resposta Esperada**:

1. **STP**:
   - Segmento: Motoristas classe A, performance-driven
   - Target: Proprietários de carros esportivos/premium (BMW, Mercedes)
   - Posicionamento: 'Performance + Sustentabilidade'

2. **4 Ps**:
   - Produto: Synfuel 98 octanas (bio-baseado)
   - Preço: R$ 7.50/L (+25% vs. Diesel S-500, justificado)
   - Praça: Seletiva (postos premium, 200 locais de tráfego alto)
   - Promoção: 'Prove synfuel, resgate 10 litros grátis' (trial)

3. **Comunicação (IMC)**:
   - Publicidade: YouTube/Instagram (motores, performance)
   - RP: Entrevista CEO 'Inovação combustível', press release
   - Promoção: Desconto trial 5%, sorteio carro premium
   - Venda Pessoal: Consultores em 200 postos, demo técnica

4. **Digital**:
   - SEO: 'Melhor combustível premium Brasil'
   - SEM: Campanhas 'Synfuel Petrobras', retargeting
   - Social: Instagram tech/performance, TikTok inovação
   - E-commerce: Reserva online 10L, retira em posto

5. **Pesquisa**:
   - Quant: Survey 500 motoristas premium (CSAT, NPS)
   - Qual: Focus 3 grupos (early adopters, techies, eco-conscious)
   - Ação: Ajusta messaging conforme feedback

6. **Brand**:
   - Posicionamento: 'Petrobras Inovação' (não só commodity)
   - Messaging: 'Energia que leva além'
   - Equity: Transmite confiança + inovação

7. **Timeline**:
   - Pesquisa: 4 semanas
   - Campanha: 8 semanas (pré-lançamento)
   - Lançamento: Oficial em evento (postos selecionados)

**Métricas Sucesso**:
   - Trial rate: 15% da base premium (alto)
   - Repeat rate: 40% (produto bom)
   - Market share: 3% segmento premium em 6 meses`
      },
      {
        label: "Dica",
        content: `🎯 **Padrão de Resposta Petrobras (Cesgranrio)**:

Questões de marketing Petrobras seguem padrão:
1. **Situação**: 'A Petrobras quer...' (lançamento, reposicionamento)
2. **Desafio**: 'Como...' (estratégia, comunicação)
3. **Resposta estruturada**:
   - Diagnóstico: Análise situação (SWOT, mercado)
   - Estratégia: STP claro (qual segmento, posicionamento)
   - Tática: 4 Ps, Comunicação IMC, Digital
   - Medição: KPIs, pesquisa
   - Timeline: Cronograma realista

4. **Diferencial**: Sempre menciona 'Petrobras' contexto (transição, marca, desafios)

Exemplo ruim: Resposta genérica de marketing (sem contexto Petrobras)
Exemplo bom: Resposta que integra 'Petrobras = commodity + transição + credibilidade'`
      },
      {
        label: "Exceção",
        content: `**Pegadilhas em Prova Petrobras**:

1. **Confundir Marketing com Vendas**:
   - Marketing: Estratégia longo prazo (marca, posicionamento)
   - Vendas: Execução curto prazo (volume, conversão)
   - Resposta errada: 'Aumentar vendas' (tático)
   - Correta: 'Reposicionar brand + comunicação integrada' (estratégico)

2. **Ignorar Contexto Petrobras**:
   - Questão pode ser genérica, mas resposta deve mencionar empresa/setor
   - Ex: 'Commodity = difícil diferenciar, solução é marca + serviço'

3. **Esquecer Integração (IMC)**:
   - Não listar canais isolados
   - Sempre mostrar como trabalham juntos

4. **Viés de Preço**:
   - Não achar que reduzir preço resolve tudo (guerra de preço armadilha)
   - Petrobras compete em valor, não preço agressivo

5. **Não Medir**:
   - Sempre incluir pesquisa, KPIs, validação de resultado
   - Marketing sem medição é adivinhação`
      },
    ],
    consolidation: {
      video: "Integração Marketing: Caso Prático Petrobras",
      audio: "Como sintetizar todos os conceitos em estratégia coerente",
      summary: "Marketing integrado = STP (estratégia) + 4 Ps + IMC + Digital + Brand + Pesquisa. Petrobras exige contexto específico em resposta.",
      mnemonic: "GASPAR: Gestão (STP), Ações (4Ps), Segmentos, Pesquisa, Análise, Resultado (medição)"
    }
  },
};

export default function AulaMarketingGerencial(props: AulaProps) {
    const STORAGE_KEY_PREFIX = "petrobras_quest_aula_marketing_gerencial_";

  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}active_tab`);
      return saved || "modulo-1";
    }
    return "modulo-1";
  });

  const [unlockedModules, setUnlockedModules] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}unlocked_modules`);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return ["modulo-1"];
        }
      }
    }
    return ["modulo-1"];
  });

  const [completedModules, setCompletedModules] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}completed_modules`);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return [];
        }
      }
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}active_tab`, activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        `${STORAGE_KEY_PREFIX}unlocked_modules`,
        JSON.stringify(unlockedModules)
      );
    }
  }, [unlockedModules]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        `${STORAGE_KEY_PREFIX}completed_modules`,
        JSON.stringify(completedModules)
      );
    }
  }, [completedModules]);

  const handleModuleComplete = (moduleId: string) => {
    setCompletedModules([...completedModules, moduleId]);
    const nextIndex = MODULE_DEFS.findIndex((m) => m.id === moduleId) + 1;
    if (nextIndex < MODULE_DEFS.length) {
      const nextModuleId = MODULE_DEFS[nextIndex].id;
      if (!unlockedModules.includes(nextModuleId)) {
        setUnlockedModules([...unlockedModules, nextModuleId]);
      }
    }
  };

  const mapQuizQuestions = (modId: string) => {
    const quiz = MARKETING_QUIZZES[modId as keyof typeof MARKETING_QUIZZES];
    if (!quiz) return [];
    return quiz.map((q: any) => ({
      id: q.id,
      pergunta: q.pergunta,
      opcoes: Object.entries(q.opcoes).map(([key, value]) => ({
        label: key,
        valor: value as React.ReactNode,
      })),
      correta: q.correta,
      explicacao: q.explicacao,
    }));
  };

  const currentModule = MODULE_DEFS.find((m) => m.id === activeTab);
  const moduleContent = MODULE_CONTENTS[activeTab as keyof typeof MODULE_CONTENTS];
  const isCompleted = completedModules.includes(activeTab);
  const variant = getModuleVariant(
    MODULE_DEFS.findIndex((m) => m.id === activeTab) + 1
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-4xl font-bold text-foreground">
            Marketing Gerencial
          </h1>
          <p className="text-muted-foreground mt-2">
            Estratégia de marketing, segmentação, preço e comunicação integrada com foco em casos Petrobras
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 lg:grid-cols-10 w-full gap-2">
          {MODULE_DEFS.map((mod, idx) => (
            <TabsTrigger
              key={mod.id}
              value={mod.id}
              disabled={!unlockedModules.includes(mod.id)}
              className="text-lg text-foreground/85 leading-relaxed"
            >
              <div className="flex flex-col items-center gap-1">
                <span>{idx + 1}</span>
                {completedModules.includes(mod.id) && (
                  <Badge className="h-2 w-2 rounded-full" />
                )}
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {MODULE_DEFS.map((mod) => (
          activeTab === mod.id && (
            <TabsContent key={mod.id} value={mod.id} className="space-y-6">
            <ModuleBanner
              numero={MODULE_DEFS.findIndex((m) => m.id === mod.id) + 1}
              titulo={mod.title}
              descricao={`Módulo ${MODULE_DEFS.findIndex((m) => m.id === mod.id) + 1} de 10 - Marketing Gerencial`}
              variant={variant}
            />

            <ModuleSectionHeader
              index={MODULE_DEFS.findIndex((m) => m.id === mod.id) + 1}
              title={mod.title}
              variant={variant}
            />

            {moduleContent && (
              <>
                <ContentAccordion slides={moduleContent.slides} mode="stacked" />

                <CardCarousel
                  cards={[
                    {
                      titulo: "Conceito-Chave",
                      descricao: moduleContent.consolidation.summary,
                      icone: "💡",
                    },
                    {
                      titulo: "Aplicação Prática",
                      descricao: `Implementar em sua área: ${moduleContent.consolidation.mnemonic}`,
                      icone: "🎯",
                    },
                  ]}
                />

                {/* 
                <ModuleConsolidation
                  videoTitle={moduleContent.consolidation.video}
                  audioTitle={moduleContent.consolidation.audio}
                  summary={moduleContent.consolidation.summary}
                  mnemonic={moduleContent.consolidation.mnemonic}
                  variant={variant}
                podcast={{
            aulaId: "marketinggerencial",
            aulaTitulo: "Marketing Gerencial",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 1,
            moduloTitulo: "Módulo 1",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />
                */}

                <QuizInterativo
                  questoes={mapQuizQuestions(activeTab)}
                  titulo={`Quiz: ${mod.title}`}
                  onComplete={() => handleModuleComplete(activeTab)}
                  variant={variant}
                />
              </>
            )}
          </TabsContent>
          )
        ))}
      </Tabs>

      {completedModules.length === MODULE_DEFS.length && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-2 border-purple-400 dark:border-purple-600 rounded-xl p-6 text-center">
          <h2 className="text-3xl font-bold text-purple-900 dark:text-purple-100">
            👑 ESPECIALISTA EM MARKETING GERENCIAL
          </h2>
          <p className="text-purple-800 dark:text-purple-200 mt-2">
            Parabéns! Você completou todos os 10 módulos e domina marketing estratégico para a Petrobras.
          </p>
        </div>
      )}
    </div>
  );
}
