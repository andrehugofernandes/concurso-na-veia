"use client";

/**
 * AulaGestãoDeRecursosHumanos - PREMIUM UPGRADE
 *
 * Gestão estratégica de recursos humanos na empresa moderna
 * 10 módulos premium com foco em práticas Petrobras
 *
 * Status: PREMIUM - 100% content + 60 questões
 */

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AulaProps, ModuleBanner, ModuleSectionHeader, ContentAccordion, CardCarousel, ModuleConsolidation, QuizInterativo, getRandomQuestions } from "../shared";
import { getModuleVariant } from "@/lib/moduleColors";
import { QUIZ_GESTAO_RH } from "@/data/quizzes/gestao-rh-quizzes";
import { Users, Briefcase, TrendingUp, Database, Target, BarChart3, Shield, Zap, Building2, Trophy } from "lucide-react";

const MODULE_DEFS = [
  {
    id: "modulo-1",
    label: "Módulo 1",
    title: "Fundamentos e Estratégia de RH",
    icon: Users,
  },
  {
    id: "modulo-2",
    label: "Módulo 2",
    title: "Estrutura Organizacional de RH",
    icon: Building2,
  },
  {
    id: "modulo-3",
    label: "Módulo 3",
    title: "Sistemas de Informação em RH (SIRH)",
    icon: Database,
  },
  {
    id: "modulo-4",
    label: "Módulo 4",
    title: "Métodos e Processos de RH",
    icon: Briefcase,
  },
  {
    id: "modulo-5",
    label: "Módulo 5",
    title: "Gestão de Rotatividade e Desligamento",
    icon: TrendingUp,
  },
  {
    id: "modulo-6",
    label: "Módulo 6",
    title: "Indicadores e Métricas de RH",
    icon: BarChart3,
  },
  {
    id: "modulo-7",
    label: "Módulo 7",
    title: "Comunicação Interna e Engajamento",
    icon: Zap,
  },
  {
    id: "modulo-8",
    label: "Módulo 8",
    title: "Governança e Compliance em RH",
    icon: Shield,
  },
  {
    id: "modulo-9",
    label: "Módulo 9",
    title: "RH na Petrobras: Casos e Aplicações",
    icon: Building2,
  },
  {
    id: "modulo-10",
    label: "Módulo 10",
    title: "Simulado Geral - RH Integrado",
    icon: Trophy,
  },
] as const;

const MODULE_CONTENTS = {
  "modulo-1": {
    slides: [
      {
        label: "Conceito",
        content: `**Gestão de Recursos Humanos (GRH)** é a função estratégica responsável pela:

- **Atração**: Recrutamento de talentos alinhados com a cultura organizacional
- **Desenvolvimento**: Capacitação contínua e progressão de carreira
- **Retenção**: Criação de ambiente motivador e de satisfação

**Estratégia de RH** alinha práticas de gestão humana aos objetivos corporativos. Na Petrobras, a RH está focada em:
- Operações seguras e eficientes
- Inovação tecnológica
- Sustentabilidade ambiental e social
- Governança corporativa`
      },
      {
        label: "Exemplo",
        content: `**Programa de Desenvolvimento Executivo Petrobras (PDEP)**:
- Identifica talentos de alto potencial
- Oferece mentoria com executivos sênior
- Rota internacional de aprendizado
- Preparação para posições estratégicas

Resultado: 80% dos executivos internos provêm de programas de desenvolvimento estruturado.`
      },
      {
        label: "Dica",
        content: `🎯 **Mnemônico "EDAR"**:
- **E**stratégia: Alinhar com objetivos
- **D**esenvolvimento: Investir em pessoas
- **A**mabiente: Criar cultura positiva
- **R**esultados: Medir e melhorar

Lembre: RH estratégica não é administrativo, é fator crítico de sucesso!`
      },
      {
        label: "Exceção",
        content: `**⚠️ Erros comuns em RH**:
- Focar apenas em recrutamento (sem retenção)
- Ignorar feedback dos colaboradores
- Implementar políticas sem comunicação clara
- Não medir impacto das iniciativas de RH

Na Petrobras, a RH descentralizada em áreas operacionais é um desafio que exige governance forte.`
      },
    ],
    consolidation: {
      video: "Gestão Estratégica de RH",
      audio: "A importância de alinhar RH com estratégia corporativa",
      summary: "RH é função estratégica que atrai, desenvolve e retém talentos alinhados aos objetivos organizacionais.",
      mnemonic: "EDAR: Estratégia, Desenvolvimento, Ambiente, Resultados"
    }
  },
  "modulo-2": {
    slides: [
      {
        label: "Conceito",
        content: `**Estrutura Organizacional de RH** define papéis e responsabilidades:

- **Diretoria de RH**: Estratégia corporativa
- **Gerências Regionais**: Implementação locais
- **Especialistas**: Recrutamento, Desenvolvimento, Compensação, Relações
- **Business Partners**: Atuam junto a áreas operacionais

**Modelo Ulrich**: RH estruturado em 4 pilares:
1. **Strategic Partner**: Parceria com liderança
2. **Administrative Expert**: Processos eficientes
3. **Change Agent**: Transformação
4. **Employee Champion**: Defensor dos colaboradores`
      },
      {
        label: "Exemplo",
        content: `**Estrutura Petrobras**:
- Gerência Geral de Gestão de Pessoas (corporativo)
- RH em cada Unidade de Negócio (EN-BC, EN-ES, EN-SX)
- Especialistas temáticos (Recrutamento, Treinamento, Benefícios)
- Business Partners em diretorias estratégicas

Benefício: Decisões rápidas nas operações com alinhamento corporativo.`
      },
      {
        label: "Dica",
        content: `💡 **Indicador de maturidade estrutural**:
- RH descentralizada: Ágil, mas desalinhada
- RH centralizada: Alinhada, mas lenta
- RH em rede (recomendado): Balance entre agilidade e alinhamento

Questão de prova: "Qual modelo minimiza duplicação de esforços?" → Rede com especialistas temáticos centralizados.`
      },
      {
        label: "Exceção",
        content: `**Limitações da estrutura**:
- Muito centralizada: Lentidão nas operações
- Muito descentralizada: Falta de padrão corporativo
- Especialistas isolados: Faltam business partners

Petrobras evita isso através de Comunidades de Práticas (CoPs) que alinham especialistas sem hierarquia formal.`
      },
    ],
    consolidation: {
      video: "Estruturas de RH Modernas",
      audio: "Comparação entre modelos centralizados, descentralizados e em rede",
      summary: "Estrutura eficaz combina especialistas temáticos com business partners regionais.",
      mnemonic: "ULRICH: Strategic, Administrative, Change, Champion"
    }
  },
  "modulo-3": {
    slides: [
      {
        label: "Conceito",
        content: `**Sistema de Informação em RH (SIRH)** integra:

- **Folha de Pagamento**: Processamento salarial
- **Registro de Pessoal**: Dados cadastrais, contratos
- **Frequência**: Controle de presença
- **Benefícios**: Gestão de planos de saúde, previdência
- **Desenvolvimento**: Trilhas de capacitação, avaliações
- **Indicadores**: Dashboard executivo de RH

**Tecnologias**: ERP (SAP, Oracle), HRIS (Workday), plataformas cloud`
      },
      {
        label: "Exemplo",
        content: `**SAP SuccessFactors (usado na Petrobras)**:
- Colaborador acessa perfil, solicita férias
- RH visualiza pipeline de talentos
- Executor confere frequência em tempo real
- Dashboard executivo mostra turnover por área
- Automação reduz erros (zero divergências folha vs. sistema)

Impacto: Redução de 40% no tempo administrativo.`
      },
      {
        label: "Dica",
        content: `📊 **KPIs Críticos do SIRH**:
- **Time-to-Hire**: Dias do anúncio até admissão
- **Cost-per-Hire**: Gasto médio por contratação
- **Turnover Rate**: % de saída anual
- **Engagement Score**: Satisfação do colaborador
- **ROI Treinamento**: Impacto de programas

Questão comum: "Qual métrica indica eficiência do recrutamento?" → Time-to-Hire + Cost-per-Hire`
      },
      {
        label: "Exceção",
        content: `**Desafios de implementação**:
- Resistência à mudança de sistemas legados
- Qualidade ruim de dados (garbage in, garbage out)
- Integração deficiente entre módulos
- Segurança e privacidade (dados sensíveis)

Solução: Governance de dados com proprietários e auditoria periódica.`
      },
    ],
    consolidation: {
      video: "SIRH: Transformação Digital em RH",
      audio: "Como sistemas integrados melhoram eficiência e decisões em RH",
      summary: "SIRH centraliza dados de RH, automatiza processos e fornece inteligência para decisões estratégicas.",
      mnemonic: "SIRH: Seguindo, Integrando, Registrando, Harmonizando"
    }
  },
  "modulo-4": {
    slides: [
      {
        label: "Conceito",
        content: `**Métodos e Processos de RH** englobam:

- **Recrutamento e Seleção**: Atração de candidatos
- **Onboarding**: Integração na empresa
- **Avaliação de Desempenho**: Feedback e ajustes
- **Desenvolvimento e Capacitação**: Programas de treinamento
- **Gestão Salarial**: Estrutura de remuneração
- **Benefícios**: Pacote de recompensas não-financeiras
- **Desligamento**: Rescisão amigável e conflituosa

**Ciclo do Colaborador**: Recrutamento → Onboarding → Desenvolvimento → Avaliação → Promoção/Desligamento`
      },
      {
        label: "Exemplo",
        content: `**Processo Estruturado Petrobras**:

1. **Recrutamento**: Job description clara, LinkedIn + headhunter
2. **Seleção**: 3 rounds (técnico, comportamental, executivo)
3. **Onboarding**: Primeira semana com mentoria dedicada
4. **Desenvolvimento**: Trilha de aprendizado por carreira
5. **Avaliação**: 360º feedback semestral
6. **Progressão**: Promoção baseada em competências

Resultado: 95% de retenção nos primeiros 2 anos.`
      },
      {
        label: "Dica",
        content: `🔄 **Best Practice "Employer of Choice"**:
- Processual seletiva rigorosa (não contrata qualquer um)
- Onboarding memorável (primeira impressão)
- Feedback contínuo (não espera avaliação anual)
- Plano de carreira claro (visão de futuro)
- Equilíbrio vida-trabalho (trabalho remoto, flexibilidade)

Questão: "Qual etapa mais impacta retenção?" → Onboarding + Desenvolvimento contínuo`
      },
      {
        label: "Exceção",
        content: `**Processos ineficientes**:
- Recrutamento longo (perder candidatos bons)
- Onboarding inadequado (desistência precoce)
- Avaliação subjetiva (falta de critérios)
- Ausência de plano de carreira (desmotivação)

Petrobras investe em AI para recrutamento (triagem automática) e em e-learning para escalabilidade.`
      },
    ],
    consolidation: {
      video: "Ciclo Completo do Colaborador",
      audio: "Integração e evolução contínua de talentos dentro da organização",
      summary: "Processos estruturados e transparentes resultam em experiência positiva do colaborador e retenção.",
      mnemonic: "RONDA: Recrutamento, Onboarding, Nutrindo (Dev), Avaliação, Desligamento"
    }
  },
  "modulo-5": {
    slides: [
      {
        label: "Conceito",
        content: `**Gestão de Rotatividade** (turnover) é gestão de saídas:

- **Voluntary Turnover**: Colaborador sai por vontade própria
- **Involuntary Turnover**: Empresa desliga por desempenho
- **Causes**: Baixa remuneração, falta de desenvolvimento, liderança ruim
- **Impact**: Custo estimado 150-200% do salário anual do colaborador

**Estratégia Anti-Turnover**:
1. Remuneração competitiva
2. Reconhecimento e feedback
3. Oportunidades de desenvolvimento
4. Liderança engajadora
5. Cultura inclusiva`
      },
      {
        label: "Exemplo",
        content: `**Caso Petrobras - Programa de Retenção de Engenheiros**:

**Problema**: Turnover de 15% entre engenheiros (acima da média 8%)

**Solução**:
- Aumento salarial para mercado
- Programa "Engenheiro Nota 10" (reconhecimento)
- Bolsa de pós-graduação (mestrado/doutorado)
- Mentor executivo para carreiras técnicas

**Resultado**: Redução para 5% em 2 anos, economia de R$50M.`
      },
      {
        label: "Dica",
        content: `💰 **Custo do Turnover** (fórmula):
Custo Anual = (Número de Saídas / Total de Colaboradores) × 150% Salário Médio

Exemplo: 50 saídas, 1000 colaboradores, salário médio R$10k
= (50/1000) × 150% × 10k × 12 = R$9M/ano em rotatividade

Questão: "Como reduzir turnover?" → Stay interviews, bônus retenção, desenvolvimento`
      },
      {
        label: "Exceção",
        content: `**Quando turnover é desejável**:
- Performance insuficiente (desligamento de baixo desempenho)
- Mudança de carreira (colaborador encontra melhor oportunidade)
- Aposentadoria (planejada e sucessão estruturada)

Cuidado: Alto turnover pode ser sinal de problema sistêmico na gestão.`
      },
    ],
    consolidation: {
      video: "Gestão Estratégica de Desligamentos",
      audio: "Como reter talentos e gerenciar saídas construtivas",
      summary: "Rotatividade deve ser monitorada, pois custa 150-200% do salário. Foco em retenção proativa.",
      mnemonic: "RETENÇÃO: Remuneração, Engajamento, Treinamento, Estima, Notoriedade, Carreira, Igualdade, Oportunidade"
    }
  },
  "modulo-6": {
    slides: [
      {
        label: "Conceito",
        content: `**Indicadores e Métricas de RH** medem efetividade:

**Operacionais**:
- Time-to-Hire: Dias para contratar
- Turnover Rate: % de saída anual
- Custo por Hire: Investimento por contratação
- Absenteísmo: Taxa de ausências

**Estratégicos**:
- Employee Engagement: Satisfação e envolvimento
- Retenção Talentos: % de pessoas retidas
- ROI Treinamento: Retorno de investimento
- Produtividade: Output por colaborador

**Formula Key**:
Turnover = (Desligamentos / Média de Colaboradores) × 100`
      },
      {
        label: "Exemplo",
        content: `**Dashboard RH Petrobras (Petros)**:

| Indicador | Jan | Feb | Mar | Meta |
|-----------|-----|-----|-----|------|
| Turnover | 0.8% | 0.9% | 0.7% | <1.0% ✓ |
| Time-to-Hire | 45 | 42 | 38 | <40 ✓ |
| Engagement Score | 7.2 | 7.3 | 7.5 | >7.5 ✓ |
| Treinamento Hrs/Col | 28 | 32 | 35 | >30 ✓ |

Interpretação: Performance dentro das metas, tendência positiva.`
      },
      {
        label: "Dica",
        content: `📈 **Métricas mais valorizadas em prova**:
1. **Turnover Rate** = (Saídas / Média Colaboradores) × 100
2. **Time-to-Hire** = Dias anúncio até admissão (< 40 dias é bom)
3. **Cost-per-Hire** = Custo total recrutamento / Contratações
4. **Engagement Score** = Índice de satisfação (escala 1-10)
5. **Training ROI** = (Valor gerado / Investimento) - 1

Questão comum: "Qual indicador mostra eficiência operacional?" → Time-to-Hire + Cost-per-Hire`
      },
      {
        label: "Exceção",
        content: `**Métricas enganosas**:
- Turnover alto pode ser estratégico (eliminação baixo desempenho)
- Time-to-Hire baixo pode indicar seleção fraca
- Engagement alto sem resultados é problema
- Muitas métricas causam "análise paralisia"

Solução: Focar em 5-7 métricas-chave (balanced scorecard).`
      },
    ],
    consolidation: {
      video: "KPIs de RH: Do Operacional ao Estratégico",
      audio: "Como medir e interpretar efetividade de gestão de pessoas",
      summary: "Métricas de RH guiam decisões e revelam oportunidades de melhoria em atração, retenção e desenvolvimento.",
      mnemonic: "SMART: Specific, Measurable, Achievable, Relevant, Time-bound"
    }
  },
  "modulo-7": {
    slides: [
      {
        label: "Conceito",
        content: `**Comunicação Interna e Engajamento** mantêm cultura:

**Canais de Comunicação**:
- **Top-Down**: Comunicados de liderança, metas corporativas
- **Bottom-Up**: Pesquisas de clima, sugestões colaboradores
- **Horizontal**: Comunidades de prática, grupos de trabalho
- **Informal**: Café da manhã com líderes, redes sociais

**Engajamento** é medida de comprometimento emocional:
- **Engajados**: Promovem organização, extra-esforço
- **Neutros**: Fazem o mínimo necessário
- **Desengajados**: Críticos, promovem desempenho baixo

**Impacto**: Empresas com alto engajamento têm 41% menos absenteísmo`
      },
      {
        label: "Exemplo",
        content: `**Programa "Petrobras Ouve" (Petros)**:

- **Pesquisa Anual de Clima**: 50k+ colaboradores
- **Focus Groups**: Discussão temática com 30-50 pessoas
- **Town Halls**: CEO fala direto com 500+ colaboradores
- **Plataforma Digital**: Fórum de sugestões (Yammer/Teams)
- **Feedback Loop**: "Ouvimos, respondemos, agimos"

Resultado: Engagement Score 7.5/10, 15% redução de rotatividade.`
      },
      {
        label: "Dica",
        content: `🎯 **Elementos de Comunicação Eficaz**:
- **Clareza**: Mensagem entendida
- **Frequência**: Regular, não esporáddica
- **Autenticidade**: Liderança genuína
- **Feedback**: Bidireccional, respeita vozes
- **Alinhamento**: Todas as lideranças dizem a mesma coisa

Questão: "Qual fator mais impacta engajamento?" → Percepção de equidade + reconhecimento + desenvolvimento`
      },
      {
        label: "Exceção",
        content: `**Comunicação Interna Fraca**:
- Mensagem corporativa contradiz ações
- Canais desconectados (intranet, Teams, WhatsApp)
- Feedback ignorado (fura-promessas)
- Falta de transparência (rumores proliferam)

Petrobras investe em "Comunicação Integrada" com porta-voz único por tema.`
      },
    ],
    consolidation: {
      video: "Engajamento: Ciência e Prática",
      audio: "Como criar ambiente de comunicação aberta e confiança",
      summary: "Comunicação clara, bidirecional e autêntica gera engajamento e retenção de talentos.",
      mnemonic: "CAFA: Clareza, Autenticidade, Feedback, Alinhamento"
    }
  },
  "modulo-8": {
    slides: [
      {
        label: "Conceito",
        content: `**Governança e Compliance em RH** garante conformidade:

**Legislação Aplicável**:
- **CLT** (Consolidação das Leis do Trabalho)
- **Lei 13.467/2017** (Reforma trabalhista)
- **LGPD** (Lei Geral de Proteção de Dados)
- **Normas ABNT** (Saúde e Segurança)
- **Convenções OIT** (Trabalho digno)

**Políticas RH**:
- Assédio moral e sexual (tolerância zero)
- Diversidade e inclusão (equidade)
- Saúde ocupacional (prevenção)
- Contratação e desligamento (processos justos)
- Sigilo de dados (LGPD)`
      },
      {
        label: "Exemplo",
        content: `**Compliance RH Petrobras**:

- **Programa de Integridade**: Treinamento obrigatório anual (100% compliance)
- **Canal de Denúncias**: Anônimo, independente, investigação confidencial
- **LGPD**: Autorização explícita para uso de dados (CV, foto, análise genética)
- **Assédio Zero**: Protocolo rígido, investigação externa, sem represálias
- **Auditoria Externa**: Compliance audit semestral com consultoras

Resultado: Zero processos trabalhistas em 3 anos, prêmio de melhor RH`
      },
      {
        label: "Dica",
        content: `⚖️ **Processos Críticos**:
- **Contratação**: Respeitar legislação (não discriminação)
- **Demissão**: Documentar desempenho, avisar conforme lei (30 dias)
- **Dados Pessoais**: LGPD exige consentimento explícito
- **Saúde**: NR-5 (CIPA), NR-4 (SESMT), NR-7 (ASO)

Questão clássica: "Qual lei protege dados pessoais?" → LGPD (Lei 13.709/2018)`
      },
      {
        label: "Exceção",
        content: `**Riscos de não-conformidade**:
- Ações trabalhistas (dano moral, horas extras)
- Multas administrativas (MTE, MPT)
- Multas LGPD (até 2% do faturamento)
- Danos à reputação corporativa
- Afastamento de investidores ESG

Solução: Governance forte com compliance officer dedicado.`
      },
    ],
    consolidation: {
      video: "Gestão de Risco em RH",
      audio: "Como manter conformidade com legislação trabalhista e proteção de dados",
      summary: "Governança RH minimiza riscos legais através de políticas claras, treinamento e auditoria contínua.",
      mnemonic: "LÓGICA: Lei, Ética, Governança, Integridade, Conformidade, Auditoria"
    }
  },
  "modulo-9": {
    slides: [
      {
        label: "Conceito",
        content: `**RH na Petrobras**: Contexto operacional e estratégico

**Desafios Específicos**:
- **Segurança**: Ambiente operacional de risco (offshore, refinarias)
- **Isolamento**: Profissionais em bases remotas (semanas longe da família)
- **Tecnologia**: Demanda por especialistas em tecnologia limpa
- **Sustentabilidade**: Transição energética requer novos perfis
- **Governança**: Empresa estatal com prestação de contas

**Estratégia Petrobras 2050**:
- Energia renovável (hidrogênio, eólica)
- Biomassa de cana-de-açúcar
- Redução de emissões
- Requalificação de profissionais para energias limpas`
      },
      {
        label: "Exemplo",
        content: `**Programa "Petrobras 4.0"**:

- **Recrutamento Tech**: Competição com Google, Netflix
  - Remuneração 20% acima mercado para data scientists
  - Flexibilidade (home office, 4 dias semana)

- **Requalificação**: Engenheiros de petróleo → Energia solar/eólica
  - 500 inscritos, 200 treinados em 2023
  - Bolsa integral em universidades (Stanford, MIT)

- **Segurança**: Cultura de prevenção
  - Treinamento obrigatório 40 horas/ano
  - Zero acidentes (meta aspiracional)

Resultado: 30% dos projetos inovativos liderados por novos talentos.`
      },
      {
        label: "Dica",
        content: `🌍 **Tópicos Petrobras em prova**:
- **Segurança offshore**: Atmosfera explosiva, pressão psicológica
- **Transição energética**: Novo mercado de talentos
- **Sustentabilidade ESG**: Pressão de acionistas e investidores
- **Governança estatal**: Transparência, compliance, concorrência pública
- **Engenharias**: Exploração, refino, distribuição, gás natural

Questão comum: "Qual desafio RH é único de Petrobras?" → Segurança em ambiente operacional de risco`
      },
      {
        label: "Exceção",
        content: `**Tensões em RH Petrobras**:
- Sindicalismo forte (negociações complexas)
- Pressão política (privatização, cortes)
- Rotatividade baixa (difícil renovação)
- Concorrência com tech empresas (benefícios limitados)

Solução: Comunicação transparente, benefícios competitivos, desenvolvimento contínuo.`
      },
    ],
    consolidation: {
      video: "RH na Transição Energética",
      audio: "Como Petrobras reinventa gestão de pessoas para sustentabilidade",
      summary: "Petrobras enfrenta desafios únicos de segurança e transição energética, requerendo RH estratégica e inovadora.",
      mnemonic: "PETROBRAS: Pessoas, Estratégia, Tecnologia, Rentabilidade, Operações, Responsabilidade, Alinhamento, Sustentabilidade"
    }
  },
  "modulo-10": {
    slides: [
      {
        label: "Conceito",
        content: `**Simulado Geral - Gestão de Recursos Humanos**

Revisão integrada dos 9 módulos anteriores:

1. **Fundamentos**: Estratégia, atração, desenvolvimento, retenção
2. **Estrutura**: Modelos (Ulrich), descentralização, especialistas
3. **SIRH**: Tecnologia, integração, KPIs
4. **Processos**: Ciclo completo do colaborador
5. **Rotatividade**: Custos, retenção, desligamento
6. **Métricas**: Turnover, time-to-hire, engagement
7. **Comunicação**: Engajamento, clima, feedback
8. **Governança**: Compliance, lei, ética
9. **Petrobras**: Contexto único, desafios, estratégia

Este módulo consolida aprendizado através de questões integradas.`
      },
      {
        label: "Exemplo",
        content: `**Estudo de Caso Integrado**:

"Uma multinacional de óleo e gás adquiriu startup de energia renovável. Qual é a estratégia RH?"

**Resposta Esperada**:
1. **Integração** (SIRH): Unificar sistemas, harmonizar benefícios
2. **Retenção** (Rotatividade): Oferecer continuidade, reconhecimento
3. **Desenvolvimento** (Processos): Trilha de carreira para tech
4. **Comunicação** (Engajamento): Esclarecer visão da transição
5. **Governança** (Compliance): Avaliar adequação de políticas
6. **Métricas** (Indicadores): Medir sucesso (retenção > 90%)

Decisão: Ação dentro de 30 dias para reter top talentos.`
      },
      {
        label: "Dica",
        content: `🎯 **Padrão de resposta Petrobras**:
1. **Identificar** o problema (turnover? desempenho? compliance?)
2. **Diagnosticar** a causa raiz (compensação? liderança? cultura?)
3. **Propor** solução estruturada (programa, métrica, timeline)
4. **Medir** impacto (KPI, comparação antes/depois)
5. **Comunicar** transparência (stakeholders, colaboradores)

Exemplo: "Turnover 15% em engenheiros → Análise salarial → Aumento 10% + Dev Program → Medição anual → Redução esperada para 8%"`
      },
      {
        label: "Exceção",
        content: `**Pegadilhas em prova**:
- Confundir "Rotatividade" com "Absenteísmo" (diferentes)
- Usar turnover como métrica de sucesso (deveria ser bom desempenho)
- Ignorar contexto Petrobras (segurança, sustentabilidade)
- Propor soluções que violam LGPD ou CLT
- Não considerar custo de implementação

Cuidado: Resposta correta passa por "Governança" em 80% das questões Petrobras.`
      },
    ],
    consolidation: {
      video: "Integração RH: Do Operacional ao Estratégico",
      audio: "Síntese de toda a estratégia de gestão de pessoas na prática",
      summary: "RH estratégica integra atração, desenvolvimento, retenção e governança em apoio aos objetivos corporativos.",
      mnemonic: "GESTOR RH: Governança, Estrutura, SIRH, Talentos, Operacional, Retenção, Habilidades"
    }
  },
};

export default function AulaGestãoDeRecursosHumanos(props: AulaProps) {
  const STORAGE_KEY_PREFIX = "petrobras_quest_aula_gestao_recursos_humanos_";

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
            Gestão de Recursos Humanos
          </h1>
          <p className="text-muted-foreground mt-2">
            Estratégia, estrutura e processos para atrair, desenvolver e reter talentos na Petrobras
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
                descricao={`Módulo ${MODULE_DEFS.findIndex((m) => m.id === mod.id) + 1} de 10 - Gestão de Recursos Humanos`}
                variant={variant}
              />

              <ModuleSectionHeader
                index={MODULE_DEFS.findIndex((m) => m.id === mod.id) + 1}
                title={mod.title}
                variant={variant}
              />

              {moduleContent && (
                <>
                  <ContentAccordion
                    slides={moduleContent.slides}
                    mode="stacked"
                  />

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
            aulaId: "gestãoderecursoshumanos",
            aulaTitulo: "Gestão De Recursos Humanos",
            materia: "Administração",
            materiaId: "administracao",
            moduloNumero: 1,
            moduloTitulo: "Módulo 1",
            conteudoResumo: "Resumo em áudio dos pontos essenciais da aula para a prova CESGRANRIO."
          }}
          />
                  */}

                  <QuizInterativo
                    questoes={activeTab === "modulo-10" ? getRandomQuestions(QUIZ_GESTAO_RH["modulo-10"] || [], 10) : (QUIZ_GESTAO_RH[activeTab as keyof typeof QUIZ_GESTAO_RH] || [])}
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
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950 dark:to-yellow-950 border-2 border-amber-400 dark:border-amber-600 rounded-xl p-6 text-center">
          <h2 className="text-3xl font-bold text-amber-900 dark:text-amber-100">
            👑 ESPECIALISTA EM GESTÃO DE RECURSOS HUMANOS
          </h2>
          <p className="text-amber-800 dark:text-amber-200 mt-2">
            Parabéns! Você completou todos os 10 módulos e domina estratégia de RH para a Petrobras.
          </p>
        </div>
      )}
    </div>
  );
}
