import { QuizQuestion } from "@/components/aulas/shared";

export const QUIZ_GESTAO_RH: Record<string, QuizQuestion[]> = {
  "modulo-1": [
    {
      id: 1001,
      pergunta:
        "A Gestão de Recursos Humanos (RH) é um campo de estudo que se ocupa com a gestão de pessoas nas organizações. Qual das alternativas melhor define a evolução conceitual de RH em relação à Administração de Pessoal (AP)?",
      opcoes: [
        {
          label: "A",
          valor:
            "AP focava em questões administrativas (folha de pagamento, documentação); RH estratégico visa à integração de pessoas como parceiras da estratégia organizacional.",
        },
        {
          label: "B",
          valor:
            "AP e RH são sinônimos; a mudança é apenas terminológica.",
        },
        {
          label: "C",
          valor:
            "RH substituiu completamente AP e eliminou todas as funções administrativas.",
        },
        { label: "D", valor: "AP é superior a RH em organizações modernas." },
        { label: "E", valor: "A diferença é apenas no tamanho do departamento." },
      ],
      correta: "A",
      explicacao:
        "A evolução marca a transição de foco exclusivamente administrativo para uma visão integrada onde pessoas são vistas como capital humano estratégico. RH participa de decisões de negócio, desenvolvimento organizacional e transformação.",
    },
    {
      id: 1002,
      pergunta:
        "Qual é a principal diferença entre a abordagem mecanicista de RH e a abordagem humanista?",
      opcoes: [
        {
          label: "A",
          valor:
            "Mecanicista: pessoas como recursos intercambiáveis; Humanista: pessoas como parceiros com potencial de desenvolvimento.",
        },
        {
          label: "B",
          valor:
            "Mecanicista: alta tecnologia; Humanista: sem tecnologia.",
        },
        {
          label: "C",
          valor: "Não existe diferença prática entre as abordagens.",
        },
        { label: "D", valor: "Mecanicista é mais moderna que humanista." },
        { label: "E", valor: "Humanista ignora resultados de negócio." },
      ],
      correta: "A",
      explicacao:
        "A abordagem mecanicista trata pessoas como insumos de produção (inputs); humanista reconhece potencial criativo, necessidade de desenvolvimento e motivação intrínseca. Organizações modernas integram ambas as perspectivas.",
    },
    {
      id: 1003,
      pergunta:
        "Qual é o objetivo primário da Gestão de Recursos Humanos em uma organização?",
      opcoes: [
        { label: "A", valor: "Reduzir custos com folha de pagamento." },
        {
          label: "B",
          valor:
            "Atrair, desenvolver, motivar e reter talentos alinhados aos objetivos estratégicos.",
        },
        { label: "C", valor: "Eliminar conflitos trabalhistas." },
        { label: "D", valor: "Implementar sistemas de punição eficazes." },
        { label: "E", valor: "Aumentar a quantidade de colaboradores rapidamente." },
      ],
      correta: "B",
      explicacao:
        "O objetivo é garantir que a organização tenha os talentos certos, desenvolvidos adequadamente e motivados para contribuir à estratégia. Custos e conflitos são considerações, não objetivos primários.",
    },
    {
      id: 1004,
      pergunta:
        "Em Chiavenato, qual é o conceito de 'contexto' que influencia a Gestão de RH?",
      opcoes: [
        {
          label: "A",
          valor:
            "O ambiente externo (econômico, político, social, tecnológico) que molda as práticas de RH.",
        },
        { label: "B", valor: "Apenas a estrutura interna da organização." },
        { label: "C", valor: "O orçamento disponível para RH." },
        { label: "D", valor: "A localização geográfica da sede." },
        { label: "E", valor: "O número de competidores no mercado." },
      ],
      correta: "A",
      explicacao:
        "Contexto é o ambiente externo que condiciona as decisões e práticas de RH. Uma organização em crise econômica, por exemplo, enfrenta diferentes desafios de retenção e recrutamento que uma em expansão.",
    },
    {
      id: 1005,
      pergunta:
        "Qual dimensão de análise da Gestão de RH foca no comportamento dos indivíduos dentro da organização?",
      opcoes: [
        { label: "A", valor: "Dimensão macroscópica." },
        { label: "B", valor: "Dimensão microscópica." },
        { label: "C", valor: "Dimensão financeira." },
        { label: "D", valor: "Dimensão administrativa." },
        { label: "E", valor: "Dimensão estratégica." },
      ],
      correta: "B",
      explicacao:
        "Dimensão microscópica analisa comportamentos individuais, motivação, satisfação, desempenho de pessoas. Dimensão macroscópica analisa estruturas, processos e políticas organizacionais.",
    },
    {
      id: 1006,
      pergunta:
        "Qual é a importância da Gestão de Recursos Humanos para a competitividade organizacional?",
      opcoes: [
        { label: "A", valor: "RH é uma função de suporte, sem impacto estratégico." },
        {
          label: "B",
          valor:
            "Capital humano diferenciado é fonte primária de vantagem competitiva sustentável em mercados dinâmicos.",
        },
        { label: "C", valor: "RH impacta apenas a redução de custos." },
        { label: "D", valor: "RH é relevante apenas em grandes corporações." },
        { label: "E", valor: "Tecnologia substitui completamente o papel de RH." },
      ],
      correta: "B",
      explicacao:
        "Em economia do conhecimento, talentos são ativos inimitáveis. Organizações que atraem, desenvolvem e retêm melhores profissionais conquistam vantagem competitiva durável. Tecnologia e máquinas são replicáveis; pessoas talentosas não.",
    },
  ],
  "modulo-2": [
    {
      id: 2001,
      pergunta:
        "Uma estratégia de Gestão de RH alinhada com a estratégia organizacional caracteriza-se por qual elemento crítico?",
      opcoes: [
        {
          label: "A",
          valor:
            "Políticas e práticas de RH derivadas dos objetivos estratégicos da organização.",
        },
        { label: "B", valor: "RH operando independentemente da estratégia." },
        {
          label: "C",
          valor: "RH focado apenas em redução de custos.",
        },
        { label: "D", valor: "Ausência de planejamento de RH." },
        { label: "E", valor: "RH reativo a demandas operacionais." },
      ],
      correta: "A",
      explicacao:
        "Alinhamento estratégico significa que recrutamento, treinamento, remuneração e avaliação são desenhados para apoiar os objetivos estratégicos. Em Petrobras, por exemplo, estratégia de transição energética exige estratégia paralela de RH.",
    },
    {
      id: 2002,
      pergunta:
        "O conceito de RH como 'Parceiro Estratégico' implica qual mudança fundamental na estrutura e atuação?",
      opcoes: [
        {
          label: "A",
          valor:
            "RH participa de decisões de negócio, estrutura organizacional e transformação, não apenas executa políticas.",
        },
        { label: "B", valor: "RH abandona funções administrativas completamente." },
        { label: "C", valor: "RH tem poder absoluto nas decisões estratégicas." },
        {
          label: "D",
          valor: "RH deixa de responsabilidade por resultados operacionais.",
        },
        { label: "E", valor: "RH se torna departamento de comunicação." },
      ],
      correta: "A",
      explicacao:
        "Parceiro estratégico significa que CHRO e líderes de RH sentam à mesa com executivos, contribuem com perspectiva de capital humano em decisões de M&A, expansão, transformação digital e estrutura organizacional.",
    },
    {
      id: 2003,
      pergunta:
        "Qual é o papel dos gestores (líderes de linha) em relação à Gestão de Recursos Humanos?",
      opcoes: [
        {
          label: "A",
          valor:
            "RH é exclusivamente responsabilidade do departamento de RH; gestores apenas executam.",
        },
        {
          label: "B",
          valor:
            "Gestores são os verdadeiros 'gestores de pessoas' no dia a dia; RH fornece consultoria e ferramentas.",
        },
        { label: "C", valor: "Gestores não têm responsabilidade com pessoas." },
        { label: "D", valor: "RH e gestores competem pelo controle." },
        { label: "E", valor: "Papel varia segundo tamanho da empresa." },
      ],
      correta: "B",
      explicacao:
        "Estudos mostram que satisfação e desenvolvimento do colaborador dependem mais de gestores diretos do que de políticas corporativas. RH é staff (consultoria), enquanto linha (gestores) é quem executa.",
    },
    {
      id: 2004,
      pergunta:
        "Como uma organização identifica seus desafios estratégicos de RH?",
      opcoes: [
        { label: "A", valor: "Apenas observando competidores." },
        {
          label: "B",
          valor:
            "Através de análise integrada: objetivos estratégicos, lacunas de competências, indicadores de turnover, clima organizacional e ambiente externo.",
        },
        { label: "C", valor: "Esperando problema ocorrer." },
        { label: "D", valor: "Consultando sindicatos apenas." },
        { label: "E", valor: "Seguindo modelos prontos de outras empresas." },
      ],
      correta: "B",
      explicacao:
        "Diagnóstico estratégico de RH envolve análise de gap: onde queremos chegar (estratégia), onde estamos (competências, estrutura) e quais ações fecham o gap. Sem diagnóstico, RH é reativo.",
    },
    {
      id: 2005,
      pergunta:
        "Em contexto de transformação digital/energética, qual é a estratégia crítica de RH?",
      opcoes: [
        { label: "A", valor: "Congelar contratações." },
        {
          label: "B",
          valor:
            "Reskilling em massa de colaboradores existentes, atração de novos talentos em competências emergentes, retenção de especialistas críticos.",
        },
        { label: "C", valor: "Aumentar descontos em benefícios." },
        { label: "D", valor: "Reduzir investimento em treinamento." },
        { label: "E", valor: "Manter status quo." },
      ],
      correta: "B",
      explicacao:
        "Transformação estratégica exige mudança paralela em talentos. Não é apenas contratar novo; é desenvolver colaboradores atuais (reskilling), atrair especializações faltantes e reter pessoas críticas durante mudança.",
    },
    {
      id: 2006,
      pergunta:
        "Qual métrica é MAIS indicativa de uma estratégia de RH bem-sucedida?",
      opcoes: [
        { label: "A", valor: "Apenas redução de custos com folha." },
        {
          label: "B",
          valor:
            "Conjunto integrado: turnover controlado, retenção de high performers > 80%, engagement score > 70, pipeline de lideranças pronto, alinhamento com objetivos estratégicos.",
        },
        { label: "C", valor: "Número de treinamentos oferecidos." },
        { label: "D", valor: "Quantidade de contratações realizadas." },
        { label: "E", valor: "Redução de reclamações trabalhistas." },
      ],
      correta: "B",
      explicacao:
        "Sucesso é multidimensional: não é apenas custo ou volume, mas qualidade de talentos, alinhamento estratégico e capacidade de sustentação. Uma organização com 10% turnover e high performers desmotivados está fracassando.",
    },
  ],
  "modulo-3": [
    {
      id: 3001,
      pergunta:
        "Qual é a estrutura organizacional típica de um departamento de Gestão de Recursos Humanos em uma grande organização?",
      opcoes: [
        {
          label: "A",
          valor:
            "Uma estrutura integrada com funções: recrutamento, treinamento, remuneração, relações trabalhistas, desenvolvimento organizacional.",
        },
        { label: "B", valor: "Apenas um gerente de RH generalist." },
        {
          label: "C",
          valor: "Estrutura centralizada apenas na matriz corporativa.",
        },
        { label: "D", valor: "RH distribuído sem qualquer coordenação." },
        { label: "E", valor: "Externalizados completamente para terceiros." },
      ],
      correta: "A",
      explicacao:
        "RH estruturado integra: recrutamento/seleção, treinamento/desenvolvimento, gestão de carreira, remuneração/benefícios, relações trabalhistas, segurança, clima/cultura e desenvolvimento organizacional. Cada função tem especialistas.",
    },
    {
      id: 3002,
      pergunta:
        "Em organizações multinacionais, qual é o desafio primário na estruturação de RH?",
      opcoes: [
        { label: "A", valor: "Apenas reduzir custos globalmente." },
        {
          label: "B",
          valor:
            "Balancear padronização de políticas globais com flexibilidade e adaptação a contextos locais (legislação, cultura).",
        },
        {
          label: "C",
          valor: "Centralizar todas as decisões na matriz.",
        },
        { label: "D", valor: "Cada país opera independentemente sem sinergia." },
        { label: "E", valor: "RH não é relevante em multinacionais." },
      ],
      correta: "B",
      explicacao:
        "Multinacionais enfrentam tensão: precisam de 'glocalização'. Algumas políticas devem ser globais (código de ética, segurança), outras devem adaptar a legislação, negociação coletiva e cultura locais.",
    },
    {
      id: 3003,
      pergunta:
        "O que diferencia uma empresa que terceiriza funções de RH versus uma que mantém internamente?",
      opcoes: [
        {
          label: "A",
          valor:
            "Terceirização é melhor sempre; afeta custo, conhecimento e risco de dependência de fornecedor.",
        },
        {
          label: "B",
          valor:
            "A escolha depende de que funções: operacionais (folha, legal) podem ser terceirizadas; estratégicas (planejamento, desenvolvimento) devem ser internas.",
        },
        { label: "C", valor: "Nunca terceirizar RH." },
        { label: "D", valor: "Sempre terceirizar RH completamente." },
        { label: "E", valor: "A decisão é apenas financeira." },
      ],
      correta: "B",
      explicacao:
        "Modelo integrado recomendado: funções operacionais (processamento de folha, documentação, administrativo) podem ser terceirizadas ou outsourced; funções estratégicas e consultivas devem ficar internas para manter knowledge e alinhamento estratégico.",
    },
    {
      id: 3004,
      pergunta:
        "Em Petrobras (empresa estatal), qual é a particularidade estrutural de RH comparada a privadas?",
      opcoes: [
        { label: "A", valor: "RH em estatal é idêntico a privada." },
        {
          label: "B",
          valor:
            "Estatal enfrenta restrições legais (direito administrativo, Lei 13.303), sindicalismo forte, política de governo, transparência pública e planos de carreira estruturados.",
        },
        { label: "C", valor: "RH em estatal pode ignorar legislação." },
        { label: "D", valor: "Estatal não tem desafios de RH." },
        { label: "E", valor: "RH em estatal é apenas operacional." },
      ],
      correta: "B",
      explicacao:
        "Estatal tem dinâmica particular: Lei 13.303 (Lei de Governança), direito administrativo (estabilidade relativa, concurso público), políticas de governo, sindicalismo forte, transparência e prestação de contas. RH estratégico em estatal equilibra estas restrições com competitividade.",
    },
    {
      id: 3005,
      pergunta:
        "Qual é o papel de RH em uma organização de rápida expansão (startup ou growth stage)?",
      opcoes: [
        { label: "A", valor: "RH não é prioridade em startups." },
        {
          label: "B",
          valor:
            "RH é crítico: atração urgente de talentos, criação de cultura, processos operacionais, retenção de early employees, preparação para escala.",
        },
        { label: "C", valor: "Apenas processos legais são necessários." },
        { label: "D", valor: "Apenas reduzir custos." },
        { label: "E", valor: "RH vem após lucro garantido." },
      ],
      correta: "B",
      explicacao:
        "Empresas em growth stage enfrentam desafio crítico: atração competitiva contra gigantes, cultura enquanto crescem, processos que escalam. RH é fator crítico de sucesso; negligencie e fracasse na retenção.",
    },
    {
      id: 3006,
      pergunta:
        "Como RH se estrutura em organização matricial versus funcional?",
      opcoes: [
        { label: "A", valor: "A estrutura não afeta RH." },
        {
          label: "B",
          valor:
            "Funcional: RH centralizado por especialidade; Matricial: RH distribui business partners para cada unidade, aumentando coordenação e complexidade.",
        },
        { label: "C", valor: "RH é idêntico em qualquer estrutura." },
        { label: "D", valor: "Apenas estrutura funcional tem RH." },
        { label: "E", valor: "A estrutura é irrelevante para RH." },
      ],
      correta: "B",
      explicacao:
        "Organização matricial exige business partners de RH mais próximos das unidades de negócio (para agilidade), mas coordenação central (para consistência). Organização funcional permite centralização de especialistas.",
    },
  ],
  "modulo-4": [
    {
      id: 4001,
      pergunta:
        "O que é um SIRH (Sistema de Informação de Recursos Humanos)?",
      opcoes: [
        {
          label: "A",
          valor:
            "Um conjunto integrado de tecnologia, processos e dados que suporta todas as funções de RH (recrutamento, folha, desenvolvimento).",
        },
        { label: "B", valor: "Apenas um software de folha de pagamento." },
        {
          label: "C",
          valor: "Um sistema que substitui completamente a atuação humana.",
        },
        { label: "D", valor: "Um banco de dados desconexo de políticas." },
        { label: "E", valor: "Um sistema de comunicação interna." },
      ],
      correta: "A",
      explicacao:
        "SIRH integra: gestão de pessoal (cadastro, documentação), folha de pagamento, recrutamento, avaliação de desempenho, treinamento, sucessão, benefícios e relatórios analíticos. É espinha dorsal de RH moderno.",
    },
    {
      id: 4002,
      pergunta:
        "Qual é a importância de Business Intelligence (BI) integrado ao SIRH?",
      opcoes: [
        { label: "A", valor: "BI é dispensável em RH." },
        {
          label: "B",
          valor:
            "BI permite análise preditiva de turnover, identificação de talentos críticos, alinhamento de força de trabalho com estratégia e tomada de decisão baseada em dados.",
        },
        { label: "C", valor: "BI é apenas para gerar relatórios visuais." },
        { label: "D", valor: "BI reduz a necessidade de gestores." },
        { label: "E", valor: "BI não influencia decisões de RH." },
      ],
      correta: "B",
      explicacao:
        "BI em RH transforma dados em inteligência: previne turnover de talentos críticos, identifica gaps de habilidades, otimiza alocação, mede efetividade de programas. RH sem BI é cego.",
    },
    {
      id: 4003,
      pergunta:
        "Qual é o desafio principal na implementação de um novo SIRH em grande organização?",
      opcoes: [
        { label: "A", valor: "Apenas o custo de tecnologia." },
        {
          label: "B",
          valor:
            "Mudança de processos, treinamento de usuários, migração de dados legados, resistência organizacional e alinhamento com políticas.",
        },
        { label: "C", valor: "Escolher o vendor mais caro garante sucesso." },
        { label: "D", valor: "Não há desafios reais, apenas técnicos." },
        { label: "E", valor: "Implementação é responsabilidade apenas de TI." },
      ],
      correta: "B",
      explicacao:
        "Implementação de SIRH é tão organizacional quanto técnica. Falhas ocorrem por falta de mudança de processos, treinamento insuficiente, dados sujos e resistência. Projeto bem-executado envolve RH, TI, gestores e usuários.",
    },
    {
      id: 4004,
      pergunta:
        "Em contexto de Petrobras, qual é um exemplo de aplicação de SIRH estratégico?",
      opcoes: [
        {
          label: "A",
          valor: "Apenas processar folha de pagamento mensalmente.",
        },
        {
          label: "B",
          valor:
            "Planejar força de trabalho para transição energética: identificar talentos em óleo & gás que podem ser requalificados em renováveis, mapear lacunas de competências em solar/eólica, prever aposentadorias por área.",
        },
        {
          label: "C",
          valor: "Reduzir custos com treinamento.",
        },
        {
          label: "D",
          valor: "Apenas avaliar desempenho anualmente.",
        },
        { label: "E", valor: "Comunicação interna apenas." },
      ],
      correta: "B",
      explicacao:
        "SIRH estratégico em Petrobras permite planejamento de força de trabalho para transição energética: análise de competências atuais, identificação de requalificação possível, antecipação de lacunas e recrutamento estratégico.",
    },
    {
      id: 4005,
      pergunta:
        "Qual tipo de informação NO SIRH é crítico para decisões estratégicas de RH?",
      opcoes: [
        {
          label: "A",
          valor:
            "Apenas dados de folha de pagamento.",
        },
        {
          label: "B",
          valor:
            "Dados integrados: competências (mapeamento de habilidades), performance (avaliações, feedback), sucessão (potencial, desenvolvimento), clima (pesquisas, engagement), mercado (benchmarks externos).",
        },
        {
          label: "C",
          valor: "Dados de presença apenas.",
        },
        { label: "D", valor: "Apenas informações legais." },
        { label: "E", valor: "Dados de comunicação interna." },
      ],
      correta: "B",
      explicacao:
        "SIRH estratégico consolida múltiplas perspectivas: competências (o que sabem), performance (como fazem), potencial (o que podem ser), clima (como se sentem) e mercado (como competimos). Dados silos impedem decisões integradas.",
    },
    {
      id: 4006,
      pergunta:
        "Qual é o papel da segurança de dados em um SIRH moderno?",
      opcoes: [
        { label: "A", valor: "Segurança é responsabilidade apenas de TI." },
        {
          label: "B",
          valor:
            "Crítico: SIRH contém dados sensíveis (salários, desempenho, saúde). Exige criptografia, controle de acesso e conformidade com LGPD.",
        },
        { label: "C", valor: "Segurança não afeta RH." },
        { label: "D", valor: "Dados de RH não são sensíveis." },
        {
          label: "E",
          valor: "Segurança reduz a usabilidade do sistema.",
        },
      ],
      correta: "B",
      explicacao:
        "SIRH é repositório de dados altamente sensíveis (salários, avaliações, saúde). Vazamento prejudica confiança, pode violar LGPD e expor a organização a litígios. Segurança é não-negociável.",
    },
  ],
  "modulo-5": [
    {
      id: 5001,
      pergunta:
        "Qual é a sequência lógica de um processo de Recrutamento e Seleção bem-estruturado?",
      opcoes: [
        {
          label: "A",
          valor:
            "Planejamento de força de trabalho → Análise de cargo → Recrutamento (fonte interna/externa) → Seleção → Contratação → Integração.",
        },
        {
          label: "B",
          valor: "Apenas colocar anúncio e contratar rapidamente.",
        },
        { label: "C", valor: "Seleção antes do recrutamento." },
        { label: "D", valor: "Integração não faz parte do processo." },
        { label: "E", valor: "Planejamento é dispensável." },
      ],
      correta: "A",
      explicacao:
        "Processo eficiente começa com planejamento (quando/quantos/que perfil), análise detalhada do cargo, recrutamento (atração de candidatos), seleção (avaliação), contratação e integração (onboarding). Cada etapa alimenta a próxima.",
    },
    {
      id: 5002,
      pergunta:
        "Qual é a diferença estratégica entre recrutamento interno versus externo?",
      opcoes: [
        {
          label: "A",
          valor:
            "Interno: desenvolvimento de talentos existentes, retenção, custo menor; Externo: trazer expertise nova, perspectiva fresca, desafios de integração.",
        },
        { label: "B", valor: "Interno é sempre melhor." },
        { label: "C", valor: "Externo é sempre mais rápido." },
        { label: "D", valor: "Não há diferença estratégica." },
        { label: "E", valor: "Recrutamento não é estratégico." },
      ],
      correta: "A",
      explicacao:
        "Estratégia integrada combina ambos: interno para retenção de talento e cultura, externo para trazerdiversidade de pensamento e competências novas. Proporção varia segundo contexto.",
    },
    {
      id: 5003,
      pergunta:
        "Em um processo de onboarding (integração) bem-estruturado, qual é o foco principal nos primeiros 30 dias?",
      opcoes: [
        { label: "A", valor: "Apenas documentação legal e folha." },
        {
          label: "B",
          valor:
            "Contexto organizacional, apresentação de pessoas, clareza de papel/objetivos, ferramentas e início do relacionamento com gestor.",
        },
        { label: "C", valor: "Apenas treinamento técnico." },
        { label: "D", valor: "Onboarding é responsabilidade apenas de TI." },
        { label: "E", valor: "Não há foco, deixa por conta do colaborador." },
      ],
      correta: "B",
      explicacao:
        "Onboarding estratégico nos primeiros 30 dias cria senso de pertencimento: conhecer organizações, histórico, pessoas, gestão, valores e papel específico. Colaboradores que têm bom onboarding tendem a ficar mais tempo e contribuir melhor.",
    },
    {
      id: 5004,
      pergunta:
        "Qual método de seleção é MAIS preditivo de desempenho futuro?",
      opcoes: [
        { label: "A", valor: "Apenas entrevista não-estruturada." },
        {
          label: "B",
          valor:
            "Combinação de métodos: entrevista estruturada, avaliações de competências, testes técnicos, casos práticos e referências verificadas.",
        },
        { label: "C", valor: "Apenas currículo." },
        { label: "D", valor: "Apenas teste de inteligência geral." },
        { label: "E", valor: "Nenhum método é realmente preditivo." },
      ],
      correta: "B",
      explicacao:
        "Pesquisa indica que combinação de métodos é mais preditiva que qualquer um isoladamente. Entrevista estruturada + testes técnicos + case prático + referências reduz viés e aumenta acurácia de seleção.",
    },
    {
      id: 5005,
      pergunta:
        "Como a Lei 13.303 (Lei de Governança de Estatal) impacta o processo de recrutamento em Petrobras?",
      opcoes: [
        { label: "A", valor: "Não há impacto." },
        {
          label: "B",
          valor:
            "Exige concurso público ou processo seletivo transparente, publicado, critérios objetivos e possibilidade de recurso. Restringe contratação discricionária.",
        },
        { label: "C", valor: "Facilita contratação discricionária." },
        {
          label: "D",
          valor: "Permite contratações sem processo de seleção.",
        },
        { label: "E", valor: "Lei é apenas administrativa, não operacional." },
      ],
      correta: "B",
      explicacao:
        "Lei 13.303 fortifica transparência e mérito em seleção estatal: processos públicos, critérios objetivos, não-discricionariedade. Pode ralentificar, mas aumenta confiança e legitimidade.",
    },
    {
      id: 5006,
      pergunta:
        "Qual é o impacto da diversidade no processo de recrutamento?",
      opcoes: [
        {
          label: "A",
          valor: "Diversidade é apenas compliance; não afeta resultados.",
        },
        {
          label: "B",
          valor:
            "Diversidade melhora inovação, decisões e reputação. Exige recrutamento intencional e eliminação de viés (inconsciente).",
        },
        { label: "C", valor: "Diversidade reduz qualidade." },
        {
          label: "D",
          valor: "Recruitar apenas por competência técnica garante diversidade.",
        },
        { label: "E", valor: "Diversidade não é prioridade em estatal." },
      ],
      correta: "B",
      explicacao:
        "Pesquisa mostra que times diversos inovam mais e decidem melhor. Petrobras, com compromisso de diversidade (mulheres em liderança, LGBTQ+, afrodescendentes), deve recrutar intencionalmente e eliminar viés inconsciente.",
    },
  ],
  "modulo-6": [
    {
      id: 6001,
      pergunta:
        "O que é Turnover (Rotatividade) em RH e qual seu impacto?",
      opcoes: [
        {
          label: "A",
          valor:
            "Taxa de saída de colaboradores. Impacto: custos de seleção/integração, perda de conhecimento, efeito moral em equipe, descontinuidade em projetos.",
        },
        { label: "B", valor: "Apenas número de contratações." },
        {
          label: "C",
          valor: "Turnover não tem impacto estratégico.",
        },
        { label: "D", valor: "Turnover é sempre desejável." },
        { label: "E", valor: "Turnover é responsabilidade apenas de RH." },
      ],
      correta: "A",
      explicacao:
        "Turnover elevado é custoso: recrutamento/seleção/integração, perda de know-how, impacto em cliente/projetos, clima. Turnover zero também é problemático (estagnação). Gestão busca turnover saudável (5-15% conforme setor).",
    },
    {
      id: 6002,
      pergunta:
        "Qual é a principal causa de saída de colaboradores e qual ação de retenção é MAIS eficaz?",
      opcoes: [
        {
          label: "A",
          valor: "Causa: falta de oportunidade de desenvolvimento; Ação: desenvolvimento de carreira e desafios.",
        },
        { label: "B", valor: "Causa: vizinhos melhor pagos; Ação: aumentar todos." },
        {
          label: "C",
          valor: "Causa: trabalho em si; Ação: apenas mudança de cargo.",
        },
        { label: "D", valor: "Retenção é responsabilidade apenas de RH." },
        { label: "E", valor: "Não há ação eficaz de retenção." },
      ],
      correta: "A",
      explicacao:
        "Pesquisas (ex: LinkedIn, Glassdoor) mostram que principal motivo é falta de desenvolvimento de carreira, não apenas salário. Ações de retenção eficazes: desenvolvimento claro de carreira, desafios, mentoring, gestor que reconhece.",
    },
    {
      id: 6003,
      pergunta:
        "O que é 'Talent Retention' em contexto de transição estratégica (ex: Petrobras em transição energética)?",
      opcoes: [
        { label: "A", valor: "Apenas manter salários iguais." },
        {
          label: "B",
          valor:
            "Reter talentos críticos durante mudança: comunicação clara de estratégia, oportunidades em novas áreas (renováveis), visão de carreira adaptada, reconhecimento.",
        },
        {
          label: "C",
          valor: "Congelar qualquer mudança.",
        },
        { label: "D", valor: "Retenção é contra-produtiva em transformação." },
        { label: "E", valor: "Transição não afeta retenção." },
      ],
      correta: "B",
      explicacao:
        "Transição estratégica gera incerteza e atrai headhunters. Retenção é crítica: clareza de visão, oportunidades em novo negócio, segurança relativa. Petrobras precisa reter especialistas em óleo & gás e atrair em renováveis.",
    },
    {
      id: 6004,
      pergunta:
        "Qual é a diferença entre 'turnover voluntário' e 'turnover involuntário'?",
      opcoes: [
        {
          label: "A",
          valor:
            "Voluntário: saída iniciada por colaborador (busca novo emprego); Involuntário: desligamento por iniciativa da organização (demissão, aposentadoria).",
        },
        { label: "B", valor: "Não há diferença prática." },
        {
          label: "C",
          valor: "Voluntário é sempre bom; involuntário é sempre ruim.",
        },
        { label: "D", valor: "Apenas voluntário importa." },
        { label: "E", valor: "Ambos têm causas idênticas." },
      ],
      correta: "A",
      explicacao:
        "Distinção importa: turnover voluntário alto indica problemas de retenção (foco em desenvolvimento); involuntário alto pode indicar falta de performance management ou oportunidades. Controle requer ações diferentes.",
    },
    {
      id: 6005,
      pergunta:
        "Como medir a efetividade de um programa de retenção?",
      opcoes: [
        { label: "A", valor: "Apenas contar quantos saem." },
        {
          label: "B",
          valor:
            "Métricas integradas: taxa de turnover por grupo (high performers vs. outros), tempo na organização, taxa de promoção interna, engajamento de retentores potenciais, custo de retenção vs. benefício.",
        },
        { label: "C", valor: "Pesquisa de satisfação genérica." },
        {
          label: "D",
          valor: "Nenhuma métrica real pode ser usada.",
        },
        { label: "E", valor: "Apenas feedback anedótico." },
      ],
      correta: "B",
      explicacao:
        "Medição eficaz requer análise segmentada: turnover de quem (high performers? talentos críticos?) e comparação custo-benefício. Um programa que retém gerentes mas perde técnicos pode estar falhando.",
    },
    {
      id: 6006,
      pergunta:
        "Em Petrobras, qual é a estratégia crítica de retenção em ambientes críticos (plataformas offshore)?",
      opcoes: [
        { label: "A", valor: "Pagar apenas mais que mercado." },
        {
          label: "B",
          valor:
            "Ambiente crítico requer: compensação competitiva + benefícios de isolamento (rotina menos desgastante) + segurança psicossocial + desenvolvimento de carreira alternativa + reconhecimento de sacrifício.",
        },
        {
          label: "C",
          valor: "Forçar colaboradores a ficar.",
        },
        { label: "D", valor: "Retenção não é importante em operação." },
        { label: "E", valor: "Apenas reduzir custos de operação." },
      ],
      correta: "B",
      explicacao:
        "Plataformas offshore apresentam desafios únicos: isolamento, risco, afastamento familiar. Retenção requer: compensação justa, benefícios de saúde mental, rodízios humanos, carreira alternativa em terra e reconhecimento explícito do sacrifício.",
    },
  ],
  "modulo-7": [
    {
      id: 7001,
      pergunta:
        "O que é um 'Indicador de Recursos Humanos' e qual é sua importância?",
      opcoes: [
        {
          label: "A",
          valor:
            "Métrica quantificável (ex: turnover, absenteísmo, produtividade) que permite medir efetividade de práticas de RH e apoiar decisões.",
        },
        { label: "B", valor: "Apenas um número mensal de folha." },
        { label: "C", valor: "Indicadores não são importantes em RH." },
        { label: "D", valor: "Apenas contagem de pessoas." },
        { label: "E", valor: "Indicadores são apenas para compliance." },
      ],
      correta: "A",
      explicacao:
        "Indicadores transformam RH de função administrativa para estratégica. Permitem: diagnosticar problemas (alto turnover em área X), medir impacto de programas (treinamento melhorou performance?), comparar com mercado (benchmarking).",
    },
    {
      id: 7002,
      pergunta:
        "Qual destes indicadores é MAIS crítico para avaliar saúde de uma organização?",
      opcoes: [
        { label: "A", valor: "Apenas número de contratações." },
        {
          label: "B",
          valor:
            "Combinação integrada: turnover (quem sai), engagement (satisfação), absenteísmo (saúde), custo per capita (eficiência), produtividade (resultado).",
        },
        { label: "C", valor: "Apenas horas de treinamento." },
        { label: "D", valor: "Apenas cumprimento de legislação." },
        { label: "E", valor: "Nenhum indicador é realmente útil." },
      ],
      correta: "B",
      explicacao:
        "Saúde organizacional é multidimensional: uma organização com alto turnover mas ótima produtividade pode estar em risco; com baixo turnover mas baixo engagement está estagnada. Análise integrada é necessária.",
    },
    {
      id: 7003,
      pergunta:
        "Como interpretar um 'Custo por Contratação' elevado?",
      opcoes: [
        { label: "A", valor: "Sempre indica desperdício." },
        {
          label: "B",
          valor:
            "Pode ser válido se associado a seleção de qualidade, retenção melhor e produtividade maior. Contexto importa: posição estratégica justifica custo?",
        },
        { label: "C", valor: "Nunca deve investir em seleção." },
        { label: "D", valor: "Custo alto sempre deve ser reduzido." },
        { label: "E", valor: "Indicador não é interpretável." },
      ],
      correta: "B",
      explicacao:
        "Alto custo de contratação para posição crítica é investimento, não gasto. Se resultado é talento retido, produtivo e alinhado, o custo foi bem empregado. Contexto estratégico importa.",
    },
    {
      id: 7004,
      pergunta:
        "O que mede 'Absenteísmo' e qual é seu impacto?",
      opcoes: [
        {
          label: "A",
          valor:
            "Taxa de faltas (não comparecimento). Impacto: reduz produtividade, aumenta custo (remuneração sem produção), sinal de desengajamento ou problema de saúde.",
        },
        { label: "B", valor: "Apenas férias programadas." },
        {
          label: "C",
          valor: "Absenteísmo não tem impacto em negócio.",
        },
        { label: "D", valor: "Todos os ausentes são preguiçosos." },
        { label: "E", valor: "Indicador não é mensurável." },
      ],
      correta: "A",
      explicacao:
        "Absenteísmo elevado é sinal de alerta: problema de saúde, desengajamento, clima ruim ou gestão inadequada. Requer investigação (por área, por pessoa, padrão) e ação (saúde ocupacional, gestão, desenvolvimento).",
    },
    {
      id: 7005,
      pergunta:
        "Em Petrobras, qual indicador seria MAIS relevante para medir sucesso da transição energética?",
      opcoes: [
        { label: "A", valor: "Apenas lucro corporativo." },
        {
          label: "B",
          valor:
            "Indicadores de RH específicos: taxa de colaboradores requalificados em renováveis, contratações de talentos em nova área, retenção de especialistas críticos, engajamento com mudança estratégica.",
        },
        { label: "C", valor: "Apenas número de demissões." },
        {
          label: "D",
          valor: "Transição não é medida por RH.",
        },
        { label: "E", valor: "Indicadores não refletem transformação." },
      ],
      correta: "B",
      explicacao:
        "Sucesso de transformação em Petrobras depende de talentos: quantos foram requalificados? Quantos novos talentos em renováveis? Quantos saíram por incerteza? RH é métrica estratégica, não apenas operacional.",
    },
    {
      id: 7006,
      pergunta:
        "Como usar 'Benchmarking' de indicadores de RH para melhorar prática?",
      opcoes: [
        { label: "A", valor: "Benchmarking é irrelevante em RH." },
        {
          label: "B",
          valor:
            "Comparar indicadores internos com concorrentes e mercado: se turnover está acima de média, pode indicar problema de retenção; se treinamento abaixo, oportunidade de desenvolvimento.",
        },
        {
          label: "C",
          valor: "Copiar exatamente o que concorrente faz.",
        },
        { label: "D", valor: "Apenas comparar com pares internos." },
        { label: "E", valor: "Contexto não importa em benchmark." },
      ],
      correta: "B",
      explicacao:
        "Benchmarking oferece perspectiva: 'Turnover de 18% é bom ou ruim?' Depende: setor tech tem 20-25%, indústria tem 10-15%. Comparação com pares ajuda diagnosticar. Mas contexto (tamanho, localização, setor) deve ser considerado.",
    },
  ],
  "modulo-8": [
    {
      id: 8001,
      pergunta:
        "Qual é o papel da Comunicação em um processo de mudança organizacional?",
      opcoes: [
        {
          label: "A",
          valor:
            "Crítico: comunicação clara de 'por quê', objetivos, impactos reduz resistência e aumenta engagement com mudança.",
        },
        { label: "B", valor: "Comunicação não influencia mudança." },
        {
          label: "C",
          valor: "Apenas comunicar depois que mudança está pronta.",
        },
        { label: "D", valor: "Comunicação compete com execução de mudança." },
        { label: "E", valor: "Mudança bem-executada se vende sozinha." },
      ],
      correta: "A",
      explicacao:
        "Comunicação é 50% do sucesso de mudança. Falta de clareza gera rumor, resistência, perda de produtividade. Comunicação eficaz ('Por quê', 'Como', 'Quando', 'Para quem') acelera aceitação e adoção.",
    },
    {
      id: 8002,
      pergunta:
        "Em contexto de transição energética em Petrobras, qual é a estratégia de comunicação recomendada?",
      opcoes: [
        {
          label: "A",
          valor:
            "Comunicação transparente contínua: visão clara de transição, oportunidades em novas áreas, timeline realista, reconhecimento de desafios, roadmap de carreira adaptado.",
        },
        { label: "B", valor: "Comunicação mínima, deixar especular." },
        {
          label: "C",
          valor: "Comunicar apenas quando decisão está final.",
        },
        { label: "D", valor: "Comunicação corporativa; não é papel de RH." },
        { label: "E", valor: "Comunicação reduz produtividade." },
      ],
      correta: "A",
      explicacao:
        "Petrobras enfrenta desafio comunicacional: transição energética gera incerteza. Comunicação estratégica transparente (visão, oportunidades, timeline) retém talentos e acelera transformação. Silêncio alimenta rumor.",
    },
    {
      id: 8003,
      pergunta:
        "Qual é a importância de 'feedback' em processos de RH?",
      opcoes: [
        {
          label: "A",
          valor:
            "Fundamental: feedback contínuo de desempenho, desenvolvimento, clima permite ajustes rápidos e engajamento.",
        },
        { label: "B", valor: "Feedback é optional em RH." },
        {
          label: "C",
          valor: "Apenas feedback negativo importa.",
        },
        { label: "D", valor: "Feedback deve ser apenas anual." },
        { label: "E", valor: "Feedback reduz motivação." },
      ],
      correta: "A",
      explicacao:
        "Pesquisa em psicologia organizacional mostra que feedback contínuo aumenta engajamento e desenvolvimento. Falta de feedback deixa colaboradores sem direção; feedback excessivamente crítico desengaja. Balanço é chave.",
    },
    {
      id: 8004,
      pergunta:
        "Como RH comunica políticas estratégicas para garantir alinhamento?",
      opcoes: [
        {
          label: "A",
          valor:
            "Via múltiplos canais: comunicados corporativos, town halls, gestores como embaixadores, documentação acessível, FAQ e follow-up.",
        },
        { label: "B", valor: "Apenas email corporativo." },
        { label: "C", valor: "Publicar no intranet e esperar que leiam." },
        { label: "D", valor: "Comunicação não é responsabilidade de RH." },
        { label: "E", valor: "Uma comunicação basta." },
      ],
      correta: "A",
      explicacao:
        "Comunicação eficaz é multi-canal: nem todos leem email, alguns aprendem visualmente, outros oralmente. Town halls, gestores como embaixadores e documentação acessível garantem que mensagem alcança maioria.",
    },
    {
      id: 8005,
      pergunta:
        "Qual é o desafio comunicacional único em empresas estatais como Petrobras?",
      opcoes: [
        {
          label: "A",
          valor: "Não há desafios especiais em estatal.",
        },
        {
          label: "B",
          valor:
            "Transparência pública exigida por lei, sindicato forte que questiona mudanças, política de governo que pode mudar a estratégia, mídia crítica observando movimentos de RH.",
        },
        { label: "C", valor: "Comunicação em privada é idêntica." },
        { label: "D", valor: "Estatal não precisa comunicar com transparência." },
        { label: "E", valor: "Comunicação é irrelevante em estatal." },
      ],
      correta: "B",
      explicacao:
        "Estatal enfrenta dinâmica única: toda comunicação é potencialmente pública (requisição de informação, liberdade de informação), sindicato forte questiona decisões, governo pode mudar prioridades. Transparência é não-negociável.",
    },
    {
      id: 8006,
      pergunta:
        "Como medir efetividade de comunicação de RH?",
      opcoes: [
        { label: "A", valor: "Apenas contar quantas pessoas abriram email." },
        {
          label: "B",
          valor:
            "Surveys de compreensão, análise de perguntas recebidas, mudança de comportamento pós-comunicação, engajamento com políticas, clima organizacional.",
        },
        { label: "C", valor: "Comunicação não é mensurável." },
        { label: "D", valor: "Apenas feedback anedótico." },
        { label: "E", valor: "Efetividade é subjetiva." },
      ],
      correta: "B",
      explicacao:
        "Medição de comunicação requer múltiplas perspectivas: As pessoas entenderam? Mudaram comportamento? Reduziram dúvidas? Engajaram com programa? Surveys e análise de interação permitem ajuste contínuo.",
    },
  ],
  "modulo-9": [
    {
      id: 9001,
      pergunta:
        "Quais são os principais desafios de Gestão de RH específicos da Petrobras?",
      opcoes: [
        {
          label: "A",
          valor:
            "Transição energética (reskilling massivo), retenção de talentos em ambiente de incerteza, diversidade em cultura tradicionalmente masculina, legislação estatal (Lei 13.303), sindicalismo forte.",
        },
        { label: "B", valor: "Petrobras não tem desafios especiais." },
        {
          label: "C",
          valor: "Apenas competição de mercado.",
        },
        { label: "D", valor: "Desafios são apenas operacionais." },
        { label: "E", valor: "RH em estatal é mais fácil que em privada." },
      ],
      correta: "A",
      explicacao:
        "Petrobras enfrenta pressões únicas: mudança de modelo de negócio (óleo → renováveis), retenção em contexto de incerteza estratégica, Lei 13.303 que limita flexibilidade, sindicalismo forte, comprometimento com diversidade.",
    },
    {
      id: 9002,
      pergunta:
        "Como a Petrobras pode atrair talentos em área de renováveis competindo com privadas?",
      opcoes: [
        { label: "A", valor: "Apenas aumentar salários." },
        {
          label: "B",
          valor:
            "Proposta de valor integrada: marca de inovação/transição, estabilidade de estatal, benefícios superiores, desenvolvimento de carreira em setor de futuro, impacto ambiental positivo.",
        },
        { label: "C", valor: "Não consegue competir com privadas." },
        { label: "D", valor: "Atração não é estratégica em estatal." },
        { label: "E", valor: "Apenas copiar estratégia de Tech." },
      ],
      correta: "B",
      explicacao:
        "Atração de talentos em renováveis requer proposta de valor diferenciada: Petrobras como protagonista da transição energética, escala de investimento massivo, impacto ambiental, estabilidade de estatal e benefícios. Não é apenas salário.",
    },
    {
      id: 9003,
      pergunta:
        "Qual é o papel da diversidade em estratégia de RH de Petrobras?",
      opcoes: [
        {
          label: "A",
          valor: "Apenas compliance com legislação.",
        },
        {
          label: "B",
          valor:
            "Estratégico: inovação em transição energética requer perspectivas diversas, mercado de renováveis valoriza inclusão, reputação corporativa e atração de talentos dependem de compromisso real com diversidade.",
        },
        { label: "C", valor: "Diversidade reduz performance." },
        { label: "D", valor: "Petrobras não se importa com diversidade." },
        { label: "E", valor: "Diversidade compete com meritocracia." },
      ],
      correta: "B",
      explicacao:
        "Diversidade em Petrobras é estratégia de inovação e reputação, não apenas compliance. Mulheres, LGBTQ+, afrodescendentes trazem perspectivas que aprimoram decisão em transição energética. Reputação como empresa inclusiva atrai talentos.",
    },
    {
      id: 9004,
      pergunta:
        "Como RH em Petrobras lida com sindicalismo forte?",
      opcoes: [
        { label: "A", valor: "Ignorar sindicato." },
        {
          label: "B",
          valor:
            "Diálogo contínuo: comunicação transparente de estratégia, envolvimento em decisões que afetam empregados, negociação baseada em dados, construir confiança mútua.",
        },
        { label: "C", valor: "Conflito permanente com sindicato." },
        {
          label: "D",
          valor: "Sindicato impede qualquer mudança.",
        },
        { label: "E", valor: "RH não negocia com sindicato." },
      ],
      correta: "B",
      explicacao:
        "Sindicalismo forte em Petrobras é realidade. RH estratégica envolve sindicato: transparência de mudanças planejadas, dados que justificam decisões, envolvimento em soluções. Conflito gera resistência; diálogo constrói legitimidade.",
    },
    {
      id: 9005,
      pergunta:
        "Em Petrobras, como RH contribui para retenção de talentos em ambientes críticos (plataformas offshore)?",
      opcoes: [
        { label: "A", valor: "Apenas pagando mais." },
        {
          label: "B",
          valor:
            "Estratégia integrada: benefícios de isolamento apropriados, rotina humanizada, desenvolvimento de carreira em terra (pós-operação), bem-estar psicossocial, reconhecimento de sacrifício, comunidade de offshore.",
        },
        { label: "C", valor: "Ambiente crítico não afeta retenção." },
        { label: "D", valor: "Oferecer apenas compensação financeira." },
        { label: "E", valor: "Retenção em offshore é impossível." },
      ],
      correta: "B",
      explicacao:
        "Plataformas offshore de Petrobras apresentam desafio único de retenção: isolamento, risco, afastamento familiar, rotina desgastante. RH estratégica oferece: compensação justa, bem-estar psicossocial, carreira alternativa em terra, comunidade de pares.",
    },
    {
      id: 9006,
      pergunta:
        "Qual é a contribuição de RH para sucesso da transição energética de Petrobras?",
      opcoes: [
        { label: "A", valor: "RH não contribui para transição." },
        {
          label: "B",
          valor:
            "Crítica: diagnóstico de competências atuais vs. futuras, planejamento de força de trabalho, reskilling em massa, atração de talentos em novas áreas, retenção de especialistas críticos, comunicação estratégica que mantenha engajamento.",
        },
        { label: "C", valor: "RH apenas executa decisões de negócio." },
        { label: "D", valor: "Transição é responsabilidade apenas de Operações." },
        { label: "E", valor: "RH compete com objetivos de transição." },
      ],
      correta: "B",
      explicacao:
        "RH é fator crítico de sucesso da transição energética de Petrobras. Sem diagnóstico de competências, reskilling, atração e retenção estratégica, transição fracassa tecnicamente. RH não é suporte; é enabler da transformação.",
    },
  ],
  "modulo-10": [
    {
      id: 10001,
      pergunta:
        "Qual é a definição abrangente de Gestão de Recursos Humanos integrada?",
      opcoes: [
        {
          label: "A",
          valor:
            "Sistema que alinha atração, desenvolvimento, retenção e engajamento de talentos com objetivos estratégicos, incluindo estrutura organizacional, processos, tecnologia e cultura.",
        },
        { label: "B", valor: "Apenas um departamento administrativo." },
        {
          label: "C",
          valor: "Conjunto de políticas desconexas.",
        },
        { label: "D", valor: "RH é responsabilidade apenas de executivos." },
        { label: "E", valor: "RH não pode ser integrado a negócio." },
      ],
      correta: "A",
      explicacao:
        "RH estratégico integra todas as dimensões: atração (recrutamento), desenvolvimento (treinamento, carreira), retenção (engajamento, compensação), estrutura (desenho organizacional), processos (eficiência) e cultura (alinhamento de valores).",
    },
    {
      id: 10002,
      pergunta:
        "Em qual contexto a Gestão de RH é MAIS crítica para o sucesso organizacional?",
      opcoes: [
        { label: "A", valor: "RH é sempre importante igualmente." },
        {
          label: "B",
          valor:
            "RH é crítica em contexto de transformação estratégica (mudança de modelo de negócio, expansão rápida, transição de mercado) onde atração, desenvolvimento e retenção de talentos são diferencial.",
        },
        {
          label: "C",
          valor: "RH é menos importante em grandes empresas.",
        },
        { label: "D", valor: "RH é apenas de suporte em startups." },
        { label: "E", valor: "RH não afeta sucesso organizacional." },
      ],
      correta: "B",
      explicacao:
        "RH é decisiva em transformação: talentos cerrados, bem-desenvolvidos e retidos são a diferença entre sucesso e fracasso. Exemplos: Petrobras em transição energética, empresa em M&A, startup em escala rápida.",
    },
    {
      id: 10003,
      pergunta:
        "Qual é o futuro de Gestão de RH com avanços em inteligência artificial e automação?",
      opcoes: [
        {
          label: "A",
          valor: "IA substituirá completamente RH.",
        },
        {
          label: "B",
          valor:
            "IA automatiza processos operacionais (folha, recrutamento inicial, análise de dados); RH humana foca em consultoria estratégica, desenvolvimento de liderança, cultura e relacionamentos críticos.",
        },
        { label: "C", valor: "IA não afeta RH." },
        { label: "D", valor: "RH não deve usar IA." },
        { label: "E", valor: "IA compete com RH ao invés de complementar." },
      ],
      correta: "B",
      explicacao:
        "Futuro de RH com IA é complementar: máquinas processam dados em escala (SIRH, BI, matching de candidatos), humanos (profissionais de RH) focam em consultoria estratégica, liderança, cultura e decisões que exigem julgamento. RH fica mais estratégica.",
    },
    {
      id: 10004,
      pergunta:
        "Qual é a principal lição aprendida da Gestão de RH estratégica em empresas que transformam com sucesso?",
      opcoes: [
        { label: "A", valor: "RH não importa em transformação." },
        {
          label: "B",
          valor:
            "RH deve ser parceira estratégica desde o início de mudança, não apenas executor. Diagnóstico de talentos, comunicação clara, desenvolvimento de lideranças que conduzam transformação, retenção de críticos são diferenciais.",
        },
        {
          label: "C",
          valor: "Transformação é apenas de tecnologia.",
        },
        { label: "D", valor: "RH implementa mudança sem participação no planejamento." },
        { label: "E", valor: "Talentos se adaptam automaticamente." },
      ],
      correta: "B",
      explicacao:
        "Pesquisas de transformação organizacional mostram que fracassos frequentes decorrem de negligência de talentos. Sucessos têm RH como parceira desde o início: diagnosticando gaps, comunicando, desenvolvendo lideranças e retendo críticos.",
    },
    {
      id: 10005,
      pergunta:
        "Para Petrobras especificamente, qual é o desafio de RH mais crítico para os próximos 10 anos?",
      opcoes: [
        { label: "A", valor: "Apenas aumentar lucros." },
        {
          label: "B",
          valor:
            "Gestar transição energética em massa: reskilling de dezenas de milhares de colaboradores, atração de talentos em renováveis, retenção de especialistas em óleo & gás durante incerteza, desenvolvimento de lideranças que inspirem transformação.",
        },
        { label: "C", valor: "RH não enfrenta desafios em Petrobras." },
        { label: "D", valor: "Apenas reduzir custos de pessoal." },
        { label: "E", valor: "Transição é desafio de Negócio, não de RH." },
      ],
      correta: "B",
      explicacao:
        "Petrobras enfrenta desafio monumental: transição energética de 15.000+ colaboradores em óleo & gás requer reskilling massivo. Fracasso aqui pode desestabilizar a empresa politicamente e organizacionalmente. RH é crítico para sucesso.",
    },
    {
      id: 10006,
      pergunta:
        "Como um profissional de RH pode preparar-se para ser parceiro estratégico em transformações futuras?",
      opcoes: [
        {
          label: "A",
          valor:
            "Apenas operações de RH clássicas.",
        },
        {
          label: "B",
          valor:
            "Desenvolver: compreensão de estratégia de negócio, data literacy (interpretar métricas), comunicação executiva, liderança de mudança, psicologia organizacional, pensamento sistêmico.",
        },
        { label: "C", valor: "RH não precisa preparar-se para mudança." },
        { label: "D", valor: "Apenas conhecimento técnico de RH basta." },
        { label: "E", valor: "Transformação não afeta RH." },
      ],
      correta: "B",
      explicacao:
        "Profissional de RH estratégico combina: conhecimento técnico (recrutamento, remuneração) + negócio (entender resultado, concorrência, estratégia) + comunicação (executiva) + liderança (influenciar sem autoridade) + psicologia (entender dinâmica humana).",
    },
  ],
};
