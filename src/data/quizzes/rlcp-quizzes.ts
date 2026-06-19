/**
 * QUIZ_RLCP - Regulamento de Licitações e Contratos da Petrobras
 * 10 módulos x 6 questões = 60 questões totais
 * IDs: 101-109 (M1), 201-209 (M2), 301-309 (M3), ... 1001-1006 (M10)
 */

export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface Quiz {
  title: string;
  moduleNumber: number;
  questions: Question[];
}

export const QUIZ_RLCP: Record<string, Quiz> = {
  "modulo-1": {
    title: "Conceitos Fundamentais RLCP",
    moduleNumber: 1,
    questions: [
      {
        id: 999,
        question: "No Regulamento de Licitações e Contratos da Petrobras (RLCP), a contratação direta por dispensa de licitação para atendimento de situações de emergência ou de calamidade pública tem prazo de vigência contratual limitado a:",
        options: [
          "90 dias consecutivos, vedada a prorrogação.",
          "180 dias consecutivos, vedada a prorrogação baseada na mesma emergência.",
          "365 dias, permitida uma única prorrogação por igual período.",
          "5 anos, condicionado à aprovação anual da diretoria.",
          "120 dias, com possibilidade de prorrogação em caso de força maior."
        ],
        correct: 1,
        explanation: "A dispensa de licitação por emergência na Lei 13.303/16 (e RLCP) limita o contrato a 180 dias consecutivos e impede a sua prorrogação sob a mesma justificativa emergencial."
      },
      {
        id: 101,
        question:
          "O que significa RLCP e qual é sua relação com a Lei 13.303?",
        options: [
          "Regulamento de Licitações e Contratos da Petrobras, baseado em Lei 13.303",
          "Regulação de Lucros e Custos Petrolíferos, independente de Lei 13.303",
          "Relação de Limites de Contratos da Petrobras, não vinculado a legislação",
          "Regulação Legal de Contratos Privados, aplicável apenas a S.A. privadas",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 0,
        explanation:
          "RLCP = Regulamento de Licitações e Contratos da Petrobras. É baseado em Lei 13.303 que disciplina empresas estatais, especialmente governança e procedimentos de compras.",
      },
      {
        id: 102,
        question: "Qual é o principal objetivo do RLCP?",
        options: [
          "Maximizar lucros sem restrições regulatórias",
          "Definir procedimentos transparentes, eficientes e legais para contratações de bens e serviços",
          "Reduzir custos operacionais independentemente de qualidade",
          "Permitir compras diretas sem processo competitivo",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "RLCP garante que Petrobras realize compras de forma transparente, legal e eficiente, respeitando direitos iguais de licitantes e observando Lei 13.303.",
      },
      {
        id: 103,
        question: "Qual é um dos princípios fundamentais do RLCP?",
        options: [
          "Discricionariedade absoluta do comprador",
          "Publicidade (transparência em todos os atos)",
          "Sigilo das propostas apresentadas",
          "Preferência por fornecedores conhecidos",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "RLCP segue princípios como legalidade, publicidade, igualdade entre licitantes e eficiência. Publicidade significa transparência: editais públicos, critérios claros, divulgação de resultados.",
      },
      {
        id: 104,
        question:
          "Qual é a diferença entre licitação pública e dispensa de licitação no contexto RLCP?",
        options: [
          "Licitação pública é sempre obrigatória; dispensa é nunca permitida",
          "Licitação pública abre competição a todos; dispensa ocorre em casos específicos (emergência, fornecedor único)",
          "Dispensa de licitação é mais transparente que licitação pública",
          "Não há diferença entre os dois procedimentos",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "RLCP exige licitação pública (competição aberta). Dispensa é exceção: casos de emergência, fornecedor exclusivo, ou valor muito baixo. Mesmo em dispensa, há formalidades.",
      },
      {
        id: 105,
        question:
          "Qual é a aplicabilidade territorial e pessoal do RLCP?",
        options: [
          "Aplica-se apenas a contratos dentro do Brasil",
          "Aplica-se apenas a Petrobras e suas subsidiárias diretas",
          "Aplica-se a Petrobras em todas suas operações (Brasil e exterior) conforme Lei 13.303",
          "Aplica-se apenas a licitações acima de R$ 10 milhões",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 2,
        explanation:
          "RLCP se aplica a Petrobras como empresa estatal conforme Lei 13.303. Abrange operações no Brasil e exterior, todas as subsidiárias, e a maioria dos contratos (com poucas exceções).",
      },
      {
        id: 106,
        question: "Como RLCP garante a igualdade entre licitantes?",
        options: [
          "Oferecendo critérios iguais de julgamento para todas as propostas",
          "Permitindo que Petrobras escolha arbitrariamente qualquer licitante",
          "Impedindo empresas pequenas de participar",
          "Garantindo que todas as propostas recebam o mesmo preço",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 0,
        explanation:
          "Igualdade significa critérios claros e iguais aplicados a todas as propostas. Edital publica regras de julgamento (menor preço, melhor técnica, técnica+preço). Ninguém é privilegiado arbitrariamente.",
      },
    ],
  },

  "modulo-2": {
    title: "Modalidades de Licitação",
    moduleNumber: 2,
    questions: [
      {
        id: 201,
        question:
          "Qual é a principal diferença entre Concorrência e Tomada de Preços?",
        options: [
          "Concorrência é limitada a fornecedores pré-qualificados; Tomada de Preços é aberta",
          "Concorrência é aberta a todos os interessados; Tomada de Preços exige cadastro/qualificação prévia",
          "Não há diferença prática entre as duas",
          "Concorrência é mais barata que Tomada de Preços",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Concorrência: modalidade aberta, qualquer interessado pode participar (menor restrição). Tomada de Preços: exige que licitante esteja cadastrado ou qualificado conforme critérios de Petrobras (restrição maior).",
      },
      {
        id: 202,
        question: "Em qual situação Petrobras usa a modalidade de Convite?",
        options: [
          "Para contratos de grande vulto (acima de R$ 100 milhões)",
          "Para pequenas compras de baixo valor e fornecedores conhecidos",
          "Nunca, pois viola princípio de igualdade",
          "Apenas para contratações de consultoria internacional",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Convite é modalidade para pequenas compras. Petrobras convida no mínimo 3 fornecedores cadastrados. Aplica-se quando valor é baixo e risco é mínimo. Menos formal que Concorrência ou Tomada de Preços.",
      },
      {
        id: 203,
        question:
          "O que é uma Licitação de Melhor Técnica e quando é usada?",
        options: [
          "Julgamento por menor preço apenas",
          "Julgamento onde qualidade técnica é mais importante que preço (ex: consultoria, pesquisa, projetos complexos)",
          "Licitação restrita a empresas com mais de 20 anos",
          "Não existe essa modalidade em RLCP",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Melhor Técnica: para serviços onde qualidade é crítica. Edital define critérios técnicos (experiência, metodologia, equipe). Melhor técnica vence, mesmo se mais cara. Exemplo: projeto de plataforma de petróleo.",
      },
      {
        id: 204,
        question:
          "Qual é a diferença entre licitação de Menor Preço e Técnica+Preço?",
        options: [
          "Menor Preço considera apenas preço; Técnica+Preço combina avaliação técnica com preço",
          "Técnica+Preço é sempre mais barato",
          "Menor Preço garante melhor qualidade",
          "Não há diferença, são sinônimos",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 0,
        explanation:
          "Menor Preço: proposta mais barata vence (critério único). Técnica+Preço: proposta é julgada por score técnico e preço (combinação). Técnica+Preço reduz risco de qualidade inferior.",
      },
      {
        id: 205,
        question:
          "Em uma Tomada de Preços, qual é o requisito mínimo de licitantes a serem convidados?",
        options: [
          "Não há mínimo definido",
          "Mínimo de 3 licitantes",
          "Mínimo de 5 licitantes",
          "Todos os cadastrados devem ser convidados",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Tomada de Preços: Petrobras convida no mínimo 3 fornecedores cadastrados. Objetivo é garantir competição mesmo com restrição de pré-qualificação.",
      },
      {
        id: 206,
        question:
          "Qual modalidade é usada quando há emergência (ex: vazamento de óleo)?",
        options: [
          "Sempre Concorrência",
          "Dispensa de Licitação (por emergência/calamidade) ou Convite acelerado",
          "Nenhuma modalidade, Petrobras decide diretamente",
          "Sempre Melhor Técnica",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Em emergência, Petrobras pode dispensar licitação formal. Justifica-se por risco iminente. Documentação posterior é obrigatória. Alternativa: Convite acelerado (3 fornecedores em prazo menor).",
      },
    ],
  },

  "modulo-3": {
    title: "Procedimento Licitatório",
    moduleNumber: 3,
    questions: [
      {
        id: 301,
        question:
          "Quais são as principais fases de um procedimento licitatório em RLCP?",
        options: [
          "Apenas publicação do edital e recebimento de propostas",
          "Edital, publicidade, recebimento de propostas, julgamento, homologação, adjudicação",
          "Conversa informal com fornecedores e escolha direta",
          "Apenas lançamento do edital, sem etapas subsequentes",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Procedimento RLCP: 1) Edital (publicação e prazos), 2) Publicidade (divulgação clara), 3) Recebimento (propostas em data/hora), 4) Julgamento (análise por critério), 5) Homologação (confirmação formal), 6) Adjudicação (contrato).",
      },
      {
        id: 302,
        question:
          "Qual é o prazo mínimo para resposta em uma Concorrência RLCP?",
        options: [
          "2 dias úteis",
          "5 dias úteis (para Concorrência, prazo maior que Tomada de Preços)",
          "30 dias corridos",
          "Não há prazo mínimo definido",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Concorrência: prazo mínimo de 5 dias úteis entre publicação e recebimento. Tomada de Preços: 3 dias úteis. Convite: 1 dia útil. Prazos maiores garantem participação efetiva.",
      },
      {
        id: 303,
        question:
          "O que é a fase de 'Homologação' em um procedimento licitatório?",
        options: [
          "Anúncio do vencedor",
          "Confirmação formal pela autoridade de que o julgamento foi correto e legal",
          "Assinatura do contrato com o fornecedor",
          "Recebimento do bem ou serviço",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Homologação: revisão e confirmação de que todo o processo seguiu RLCP, critérios foram aplicados corretamente, sem vícios. Ato de autoridade superior validando o julgamento.",
      },
      {
        id: 304,
        question:
          "Qual é a diferença entre 'Julgamento' e 'Adjudicação' em RLCP?",
        options: [
          "São a mesma coisa, sinônimos",
          "Julgamento: análise das propostas e escolha do vencedor. Adjudicação: formalização legal do contrato com o vencedor",
          "Julgamento é confidencial, adjudicação é pública",
          "Adjudicação é antes de julgamento",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Julgamento: comissão analisa propostas, aplica critério (preço, técnica, etc.), identifica vencedor. Adjudicação: formalização legal da compra, contrato com vencedor. Adjudicação é consequência do julgamento.",
      },
      {
        id: 305,
        question:
          "Qual é o resultado de um procedimento licitatório após adjudicação?",
        options: [
          "Apenas anúncio do vencedor, sem contrato",
          "Celebração de contrato entre Petrobras e fornecedor vencedor",
          "Sugestão para futuro uso de fornecedor",
          "Recomendação não-vinculante",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Após adjudicação, Petrobras celebra contrato com fornecedor vencedor. Contrato especifica obrigações, prazos, qualidade, preço e condições de entrega/execução.",
      },
      {
        id: 306,
        question:
          "Em caso de erro na publicação do edital, qual é o procedimento correto?",
        options: [
          "Continuar a licitação sem correções",
          "Cancelar licitação e republicar edital corrigido com novo prazo",
          "Corrigir edital secretamente durante julgamento",
          "Penalizar licitantes por não notarem o erro",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Erro no edital: deve ser corrigido e republicado. Novo prazo deve ser concedido a todos os interessados. Transparência e igualdade exigem oportunidade igual de participação.",
      },
    ],
  },

  "modulo-4": {
    title: "Edital e Termo de Referência",
    moduleNumber: 4,
    questions: [
      {
        id: 401,
        question:
          "O que é o Termo de Referência (TR) e qual sua importância no RLCP?",
        options: [
          "Documento confidencial preparado após encerramento de licitação",
          "Documento que descreve especificações técnicas, quantidade, prazos e critérios de qualidade do bem/serviço",
          "Contrato final assinado com fornecedor",
          "Parecer jurídico do departamento legal",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Termo de Referência: documento técnico que descreve EXATAMENTE o que Petrobras precisa (especificações, padrões, prazos, requisitos). Serve como base para edital. Clareza no TR reduz disputas futuras.",
      },
      {
        id: 402,
        question: "Qual é o propósito principal de um Edital RLCP?",
        options: [
          "Ocultar informações sobre a compra",
          "Publicar regras claras, critérios de julgamento e informações de participação",
          "Favorecer fornecedores conhecidos",
          "Reduzir número de participantes",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Edital: documento público que comunica oportunidade de negócio. Contém: objeto (o que se compra), modalidade, critério de julgamento, prazos, local de entrega, contatos, TR anexado, regras de participação.",
      },
      {
        id: 403,
        question:
          "Quais informações DEVEM estar presentes em um Edital RLCP válido?",
        options: [
          "Apenas nome da empresa contratante",
          "Objeto da compra, modalidade, critério de julgamento, prazos, TR, requisitos técnicos, preço estimado",
          "Nenhuma informação específica, apenas convite informal",
          "Apenas lista de fornecedores pré-aprovados",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Edital completo inclui: 1) Objeto (descrição clara), 2) Modalidade (Concorrência, etc.), 3) Critério (menor preço, técnica, etc.), 4) Prazos (recebimento, julgamento), 5) TR e especificações técnicas, 6) Requisitos de habilitação, 7) Preço estimado (quando cabível).",
      },
      {
        id: 404,
        question:
          "O que significa 'Preço Estimado' ou 'Valor de Referência' em um Edital?",
        options: [
          "Preço que todos os fornecedores devem cobrar",
          "Estimativa de Petrobras sobre custo justo da compra (baseada em pesquisa de mercado)",
          "Preço secreto que não pode ser divulgado",
          "Preço máximo que qualquer fornecedor pode cobrar",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Preço Estimado: valor que Petrobras pesquisou no mercado como referência de custo justo. Divulgar garante transparência. Propostas abusivamente caras ou baratas podem ser desclassificadas.",
      },
      {
        id: 405,
        question:
          "Como o Termo de Referência se relaciona com o Edital?",
        options: [
          "São completamente independentes",
          "TR é anexo ao Edital e detalha especificações técnicas",
          "Edital é anexo do TR",
          "Não há relação prática",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "TR é anexo do Edital. Edital convoca a licitação; TR especifica tecnicamente o que se compra. Exemplo: Edital = convocação para compra de tubulação; TR = diâmetro, material, comprimento, padrão de qualidade.",
      },
      {
        id: 406,
        question:
          "Qual é a importância de um Termo de Referência bem elaborado?",
        options: [
          "Reduz a quantidade de licitantes",
          "Garante clareza, reduz dúvidas, evita interpretações conflitantes e facilita julgamento justo",
          "Permite Petrobras escolher fornecedor preferido",
          "Não tem importância prática",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "TR bem feito: especificações claras = propostas comparáveis. Reduz risco de receber produtos fora de especificação. Evita litígios ('você não pediu isso'). Facilita julgamento técnico justo.",
      },
    ],
  },

  "modulo-5": {
    title: "Julgamento e Adjudicação",
    moduleNumber: 5,
    questions: [
      {
        id: 501,
        question:
          "Qual é a comissão responsável pelo julgamento em uma Licitação RLCP?",
        options: [
          "Apenas o Diretor da empresa",
          "Comissão de Licitação (membros designados, multidisciplinar)",
          "Qualquer funcionário de Petrobras",
          "Uma pessoa apenas para garantir sigilo",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Comissão de Licitação: grupo multidisciplinar (engenharia, financeiro, legal, etc.) designado para julgamento. Garante: competência técnica, imparcialidade, transparência. Atas registram decisões.",
      },
      {
        id: 502,
        question:
          "Como é julgada uma licitação por 'Menor Preço'?",
        options: [
          "Proposta mais cara é escolhida",
          "Proposta com menor preço que atenda especificações técnicas é vencedora",
          "Preço é secreto e não influencia",
          "Qualquer preço é aceito",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Menor Preço: critério econômico. Proposta com MENOR preço vence, contanto que atenda especificações técnicas. Não é permitido aceitar qualidade inferior por economia.",
      },
      {
        id: 503,
        question:
          "O que significa 'Habilitação' no contexto de julgamento RLCP?",
        options: [
          "Aprovação do preço da proposta",
          "Verificação de que licitante é idôneo, tem capacidade técnica e financeira",
          "Assinatura do contrato",
          "Entrega do bem ou serviço",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Habilitação: fase anterior ao julgamento técnico/preço. Comissão verifica: inscrição em órgãos reguladores, registro de não ter dívidas, capacidade técnica comprovada, documentação fiscal em ordem.",
      },
      {
        id: 504,
        question:
          "Qual é a consequência de uma proposta ser desclassificada por não atender especificações?",
        options: [
          "Fornecedor é multado em dinheiro",
          "Proposta é eliminada; próxima proposta qualificada é analisada",
          "Fornecedor é impedido de futuras licitações",
          "Petrobras paga parcialmente pelo que não atende",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Desclassificação: proposta que não atende TR é eliminada do julgamento. Não passa para análise de preço. Outras propostas (qualificadas) continuam sendo julgadas.",
      },
      {
        id: 505,
        question:
          "O que é 'Adjudicação' e quem a realiza?",
        options: [
          "Análise técnica das propostas",
          "Formalização legal de que o vencedor é adjudicatário; realizada por autoridade de Petrobras",
          "Entrega final do produto",
          "Publicação em jornal oficial",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Adjudicação: ato formal de designar vencedor. Realizada por autoridade designada (após homologação). Adjudicação = permissão legal para celebrar contrato com vencedor.",
      },
      {
        id: 506,
        question:
          "Qual é o procedimento correto se houver empate entre duas propostas em 'Menor Preço'?",
        options: [
          "Escolher aleatoriamente uma delas",
          "Aplicar critérios de desempate estabelecidos no Edital (ex: técnica, localização, prazo)",
          "Dividir contrato entre as duas",
          "Rejeitar ambas e licitar novamente",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Empate: Edital deve prever critérios de desempate (ex: melhor prazo de entrega, melhor localização, preferência para empresa brasileira). Desempate resolvido conforme edital.",
      },
    ],
  },

  "modulo-6": {
    title: "Recursos e Impugnações",
    moduleNumber: 6,
    questions: [
      {
        id: 601,
        question:
          "Qual é a diferença entre 'Impugnação de Edital' e 'Recurso de Resultado'?",
        options: [
          "São a mesma coisa",
          "Impugnação: desafio ao Edital antes do julgamento. Recurso: desafio ao resultado após julgamento",
          "Impugnação é mais rápida que recurso",
          "Recurso não é permitido em RLCP",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Impugnação: questionamento do edital ANTES da licitação ('edital viola RLCP'). Recurso: questionamento do resultado APÓS julgamento ('resultado aplicou critério errado'). Ambos têm prazos.",
      },
      {
        id: 602,
        question:
          "Qual é o prazo para apresentar impugnação de edital em RLCP?",
        options: [
          "Até 90 dias após publicação",
          "Até 2 dias úteis antes do recebimento de propostas",
          "Não há prazo definido",
          "Apenas no dia do julgamento",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Impugnação de Edital: prazo é 2 dias úteis antes do recebimento de propostas. Objetivo: dar tempo para Petrobras corrigir edital antes da licitação prosseguir.",
      },
      {
        id: 603,
        question:
          "O que Petrobras deve fazer se receber uma impugnação válida de edital?",
        options: [
          "Ignorar a impugnação",
          "Corrigir o edital, republicar e conceder novo prazo a todos",
          "Aceitar a impugnação mas não mudar o edital",
          "Desqualificar o licitante que impugnou",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Impugnação válida: Petrobras avalia. Se procedente, DEVE corrigir edital, republicar com novo prazo. Todos têm direito de participar com edital correto. Desqualificar impugnante seria abuso.",
      },
      {
        id: 604,
        question:
          "Qual é o prazo para apresentar recurso contra resultado de julgamento?",
        options: [
          "Até 30 dias após publicação do resultado",
          "Até 2 dias úteis após publicação do resultado",
          "Nenhum prazo, recurso pode ser apresentado sempre",
          "Apenas 1 hora após resultado",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Recurso de Resultado: prazo é 2 dias úteis após publicação do resultado. Deve indicar qual decisão está errada e por quê. Exemplo: 'Vencedor não atendeu especificação X'.",
      },
      {
        id: 605,
        question:
          "O que significa 'Suspensão da Adjudicação' durante análise de recurso?",
        options: [
          "Cancelamento permanente da licitação",
          "Petrobras aguarda julgamento do recurso antes de formalizar adjudicação (contrato não é celebrado)",
          "Fornecedor vencedor recebe o contrato mesmo assim",
          "Recurso não tem efeito suspensivo em RLCP",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Efeito Suspensivo: recurso suspende a adjudicação (contrato não é celebrado) enquanto comissão analisa o recurso. Se recurso for procedente, resultado é revertido e novo vencedor é adjudicado.",
      },
      {
        id: 606,
        question:
          "Qual é a principal razão para permitir impugnações e recursos em RLCP?",
        options: [
          "Permitir que qualquer pessoa paralise uma licitação",
          "Garantir conformidade com Lei 13.303 e transparência; proteger direitos de licitantes",
          "Aumentar custos de Petrobras",
          "Favorecer empresa que perdeu a licitação",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Impugnações e recursos: mecanismos de controle. Garantem que Petrobras respeite RLCP, critérios e transparência. Licitante prejudicado tem direito de se defender. Reforça confiança no processo.",
      },
    ],
  },

  "modulo-7": {
    title: "Contratos e Execução",
    moduleNumber: 7,
    questions: [
      {
        id: 701,
        question:
          "Qual é o passo imediatamente após adjudicação em RLCP?",
        options: [
          "Fornecedor começa a trabalhar imediatamente",
          "Celebração de contrato entre Petrobras e fornecedor adjudicado",
          "Publicação em jornal, sem contrato",
          "Pagamento antecipado",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Após adjudicação: Petrobras convida fornecedor a assinar contrato. Contrato detalha: obrigações, cronograma, forma de pagamento, penalidades, garantias e rescisão.",
      },
      {
        id: 702,
        question:
          "Qual é a função do 'Termo de Recebimento Provisório' em um contrato?",
        options: [
          "Documento confidencial entre Petrobras e fornecedor",
          "Verificação inicial que bem/serviço foi entregue conforme especificações; permite período de testes",
          "Aceitação final sem direito a devolução",
          "Documento de rescisão de contrato",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Recebimento Provisório: Petrobras verifica se entrega está conforme TR. Período de testes (ex: software testado por 30 dias). Só após sucesso no teste, recebimento definitivo é formalizado.",
      },
      {
        id: 703,
        question:
          "O que significa 'Rescisão Contratual' por culpa do fornecedor?",
        options: [
          "Petrobras cancela contrato devido a atraso ou não conformidade; pode reter valores como multa",
          "Fin do contrato sempre sem consequências",
          "Fornecedor recebe bônus por rescindir",
          "Rescisão não é permitida em contratos com Petrobras",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 0,
        explanation:
          "Rescisão por Culpa do Fornecedor: contrato é cancelado se fornecedor não cumpre (atraso, qualidade ruim, etc.). Petrobras pode: reter valores já pagos, cobrar multa contratual, contratar alternativa (custo extra cobrado de fornecedor).",
      },
      {
        id: 704,
        question:
          "Qual é o propósito de uma 'Garantia de Contrato' em RLCP?",
        options: [
          "Prometer que contrato sempre terá sucesso",
          "Segurança financeira de que fornecedor cumprirá obrigações (caução, seguro, fiança)",
          "Contrato não tem garantia",
          "Apenas para contratos acima de R$ 1 bilhão",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Garantia: depósito ou aval que fornecedor oferece como segurança. Se não cumpre, Petrobras executa garantia (pega o dinheiro). Exemplo: contrato de R$ 10 milhões, fornecedor deposita R$ 500 mil como garantia.",
      },
      {
        id: 705,
        question:
          "O que é 'Cláusula Rebus Sic Stantibus' em contexto de contrato RLCP?",
        options: [
          "Cláusula que permite rescisão se circunstâncias mudam radicalmente (caso fortuito)",
          "Cláusula obrigatória em todos os contratos Petrobras",
          "Cláusula que proíbe modificações ao contrato",
          "Cláusula em latim que não existe em direito brasileiro",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 0,
        explanation:
          "Rebus Sic Stantibus: princípio de que contrato permanece válido enquanto circunstâncias não mudem radicalmente. Se muda (ex: guerra, embargo), partes podem rescindir. Exemplo: contrato de transporte suspenso por pandemia.",
      },
      {
        id: 706,
        question:
          "Qual é a responsabilidade de Petrobras após recebimento definitivo do contrato?",
        options: [
          "Sem responsabilidade, garantia expirou",
          "Responsável por vícios/defeitos descobertos (período de garantia contratual)",
          "Petrobras volta a fazer licitação imediatamente",
          "Fornecedor pode voltar e mudar o que entregou",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Garantia Contratual: após recebimento definitivo, fornecedor ainda responde por vícios/defeitos por período (ex: 12 meses). Se problema aparece, fornecedor corrige ou Petrobras cobra compensação.",
      },
    ],
  },

  "modulo-8": {
    title: "Inabilitação e Desempate",
    moduleNumber: 8,
    questions: [
      {
        id: 801,
        question:
          "Qual é a principal razão para inabilitar um licitante em RLCP?",
        options: [
          "Porque Petrobras não gostou do fornecedor",
          "Falta de documentação exigida, capacidade técnica insuficiente ou problemas legais/financeiros",
          "Porque fornecedor é pequeno demais",
          "Inabilitação não existe em RLCP",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Inabilitação: licitante não atende requisitos de habilitação (documentação, registro, solvência). Comissão verifica certificados, inscrição, regularidade fiscal. Sem habilitação, proposta não é nem analisada.",
      },
      {
        id: 802,
        question:
          "O que é 'Impedimento de Participação' em uma licitação RLCP?",
        options: [
          "Sempre é opcional, licitante pode participar mesmo impedido",
          "Situação legal que proíbe licitante de participar (ex: servidor Petrobras, sócio de gestor público, vencedor que descumpriu contrato anterior)",
          "Impedimento não existe em legislação",
          "Apenas uma sugestão de Petrobras",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Impedimento: causa legal que desqualifica licitante completamente. Exemplos: 1) Servidor/parente de decisor, 2) Empresa que foi penalizada por fraude em contrato anterior, 3) Pessoa com dívida tributária vencida, 4) Sócio que é agente público.",
      },
      {
        id: 803,
        question:
          "Qual é o procedimento correto se licitante é inabilitado durante a análise?",
        options: [
          "Retornar documento e pedir revisão após julgamento",
          "Inabilitação imediata; proposta não segue para análise de preço",
          "Inabilitação apenas após análise de preço",
          "Inabilitado pode participar da próxima licitação sem revisão",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Inabilitação é fase prévia ao julgamento técnico/preço. Se inabilitado, proposta sequer entra na análise de mérito. Inabilitado pode pedir revisão administrativamente, mas não segue normalmente.",
      },
      {
        id: 804,
        question:
          "Qual é o critério de desempate mais comum em RLCP?",
        options: [
          "Amoeda (sorteio)",
          "Critérios estabelecidos no Edital (ex: menor prazo, melhor localização, preferência por empresa pequena)",
          "Aquele com maior preço vence",
          "Não há critério, Petrobras escolhe",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Desempate: Edital define critérios antes da licitação (transparência). Exemplos: melhor prazo de entrega, empresa localizada em região prioritária, empresa brasileira vs estrangeira. Sorteio apenas como último recurso.",
      },
      {
        id: 805,
        question:
          "O que significa 'Desclassificação por Incompatibilidade Técnica'?",
        options: [
          "Proposta de preço é muito alta",
          "Proposta NÃO atende especificações técnicas do Termo de Referência",
          "Fornecedor é estrangeiro",
          "Proposta chegou 1 minuto atrasada",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Incompatibilidade Técnica: proposta oferece produto/serviço que não coincide com TR (diâmetro errado, material inadequado, prazo insuficiente). Desclassificada sem análise de preço.",
      },
      {
        id: 806,
        question:
          "Qual é a diferença entre 'Inabilitação' e 'Desclassificação'?",
        options: [
          "São a mesma coisa",
          "Inabilitação: licitante não qualificado (habilitação). Desclassificação: proposta não atende (técnica/preço)",
          "Desclassificação é mais grave",
          "Não há diferença prática entre as duas",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Inabilitação: problema com o LICITANTE (documentação, idoneidade). Desclassificação: problema com a PROPOSTA (especificação, preço abusivo). Inabilitado não participa mais. Desclassificado perde essa proposta mas pode ter outra em licitação futura.",
      },
    ],
  },

  "modulo-9": {
    title: "RLCP na Prática Petrobras",
    moduleNumber: 9,
    questions: [
      {
        id: 901,
        question:
          "Como Petrobras aplica RLCP em suas licitações internacionais?",
        options: [
          "RLCP não se aplica fora do Brasil",
          "RLCP se aplica com ajustes para legislação local; Petrobras publica editais em português e inglês",
          "Apenas Lei 6.404/76 é usada no exterior",
          "Petrobras não faz compras internacionais",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "RLCP em Exterior: Petrobras aplica princípios RLCP (transparência, igualdade, publicidade) conforme Lei 13.303. Editais são bilíngues (português/inglês) para atrair fornecedores internacionais. Critérios de julgamento respeitam legislação local quando necessário.",
      },
      {
        id: 902,
        question:
          "Qual é o principal desafio de RLCP em ambiente de preços voláteis (ex: petróleo)?",
        options: [
          "RLCP não permite ajustes de preço",
          "Edital deve prever cláusulas de reajuste indexado para proteger Petrobras e fornecedor de volatilidade",
          "Petrobras sempre rescinde contratos caros",
          "Preço não importa em RLCP",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Volatilidade: contrato de R$ 100 mi pode custar R$ 150 mi em 12 meses (petróleo sobe). Edital RLCP inclui cláusula de reajuste: preço ajustado por índice (IPCA, preço de commodity). Protege ambas as partes.",
      },
      {
        id: 903,
        question:
          "Como RLCP incentiva responsabilidade social e sustentabilidade?",
        options: [
          "RLCP não menciona sustentabilidade",
          "Edital pode exigir critérios de sustentabilidade (ex: fornecedor certificado ISO 14001) e aplicar como critério de desempate",
          "Petrobras sempre escolhe fornecedor mais barato, independente de sustentabilidade",
          "Sustentabilidade é penalizada em RLCP",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Sustentabilidade em RLCP: Edital pode exigir certificação ambiental, diversidade (mulheres, minorias), práticas responsáveis. Exemplo: Petrobras prefere tubulação de fornecedor com ISO 14001 (mesmo preço igual) como critério de desempate.",
      },
      {
        id: 904,
        question:
          "Qual é o papel da Transparência em RLCP segundo Lei 13.303?",
        options: [
          "Transparência é apenas recomendada, não obrigatória",
          "Transparência é PRINCÍPIO FUNDAMENTAL: editais públicos, critérios claros, atas de julgamento divulgadas",
          "Transparência reduz competição",
          "Petrobras pode manter editais confidenciais",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Transparência: Lei 13.303 e RLCP exigem. Petrobras publica editais em portal (site, diários oficiais). Atas de julgamento (resultado, pontuação) são públicas. Objetivo: confiança, legitimidade, reduz corrupção.",
      },
      {
        id: 905,
        question:
          "Como Petrobras documentação e registra um procedimento licitatório?",
        options: [
          "Não precisa documentar, é confidencial",
          "Mantém arquivo com edital, proposta, atas de julgamento, decisões de recurso, homologação, adjudicação",
          "Apenas preço final é registrado",
          "Documentação é destruída após 3 meses",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Documentação: RLCP exige arquivo completo de licitação (mínimo 5-10 anos). Inclui: edital publicado, cópia de propostas, atas de julgamento, pareceres, decisões de recurso, homologação, contrato assinado. Auditores (TCU, CGU) revisam.",
      },
      {
        id: 906,
        question:
          "Qual é a conexão entre RLCP e conformidade de Petrobras com Lei Anticorrupção?",
        options: [
          "RLCP não tem relação com anticorrupção",
          "RLCP garante procedimento transparente, reduz discricionariedade, previne fraude e corrupção",
          "Anticorrupção é mais importante que RLCP",
          "Transparência em licitação não previne corrupção",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "RLCP e Anticorrupção: procedimento transparente (edital público, critérios claros, julgamento por comissão, atas divulgadas) reduz oportunidade de fraude. Exemplo: não dá margem para 'escolher amigo secretamente'. Lei Anticorrupção exige conformidade RLCP.",
      },
    ],
  },

  "modulo-10": {
    title: "Simulado Mestre",
    moduleNumber: 10,
    questions: [
      {
        id: 1001,
        question:
          "Um licitante questiona o Edital alegando critério de desempate prejudicial. Qual é o procedimento correto?",
        options: [
          "Ignorar questionamento e prosseguir licitação",
          "Licitante pode impugnar edital (até 2 dias úteis antes do recebimento). Petrobras analisa e, se válida, corrige e republica edital",
          "Desqualificar licitante que impugna",
          "Criar novo edital sem informar ao licitante",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Impugnação de Edital: direito garantido por RLCP. Se licitante identifica vício (ex: 'critério de desempate é ilegal'), pode impugnar. Petrobras avalia. Se procedente, corrige e republica com novo prazo (igualdade).",
      },
      {
        id: 1002,
        question:
          "Após julgamento, fornecedor vencedor não consegue assinar contrato dentro de 5 dias. Qual é a consequência?",
        options: [
          "Petrobras aguarda indefinidamente",
          "Adjudicação pode ser cassada; Petrobras convida próximo vencedor (ou relicita)",
          "Contrato é automaticamente assinado",
          "Fornecedor é multado mas contrato segue",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Responsabilidade do Vencedor: após adjudicação, deve assinar contrato em prazo (ex: 5 dias). Se não assina, pode perder direito e Petrobras invoca garantia (caução). Próximo melhor classificado é convidado.",
      },
      {
        id: 1003,
        question:
          "Um contrato está em execução. Fornecedor atrasa entrega por 30 dias além do prazo. Qual é a ação de Petrobras?",
        options: [
          "Nada, atraso é aceitável",
          "Aplicar multa contratual por atraso; se atraso continua, rescindir contrato",
          "Solicitar aumento de preço ao fornecedor",
          "Aceitar entrega sem multa, mas descontar do próximo contrato",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Atraso em Contrato: contrato RLCP prevê multa por atraso (ex: 0,3% ao dia). Petrobras cobra multa. Se atraso é reiterado ou período contratual vence, pode rescindir contrato e contratar alternativa.",
      },
      {
        id: 1004,
        question:
          "Petrobras descobre que vencedor de licitação tem sócio que é servidor público de Petrobras. O que fazer?",
        options: [
          "Ignorar relação e celebrar contrato",
          "Anular licitação; servidor tem impedimento legal de participar indiretamente (através de sócio)",
          "Permitir contrato, mas aumentar preço",
          "Apenas avisar ao servidor",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Impedimento: Lei 13.303 proíbe servidor (ou parente próximo) ter interesse em contrato. Se sócio é servidor Petrobras, há impedimento. Licitação é anulada, devolvem-se valores (se pagos parcialmente), relicita-se.",
      },
      {
        id: 1005,
        question:
          "Uma proposta chega com preço 10x maior que estimado. Qual é o procedimento?",
        options: [
          "Aceitar proposta sem questionar",
          "Desclassificar como preço manifestamente excessivo; continuar julgando outras propostas",
          "Obrigar fornecedor a reduzir preço",
          "Pagar preço máximo que Petrobras considera justo",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Preço Excessivo: se proposta é 10x acima de estimado (sem justificativa técnica), pode ser desclassificada como preço manifestamente excessivo (fraude presumida). Outras propostas seguem sendo julgadas.",
      },
      {
        id: 1006,
        question:
          "Qual é a duração mínima de um contrato RLCP após execução completa?",
        options: [
          "Sem duração, contrato desaparece após entrega",
          "Mínimo de 5 anos: período de garantia e arquivo obrigatório de documentação",
          "Apenas 1 ano",
          "Contrato é destruído após 6 meses",
          "Nenhuma das alternativas anteriores está correta.",
        ],
        correct: 1,
        explanation:
          "Duração Contratual: RLCP exige arquivo mínimo 5 anos (para auditoria). Garantia contratual (vícios) normalmente é 12 meses. Se litígio, duração é até 10 anos conforme direito processual.",
      },
    ],
  },
};
